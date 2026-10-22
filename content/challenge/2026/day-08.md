@cover
# 30-Day Android Challenge

Senior Android interview prep — Junior → Mid → Senior → Architect

<span class="edition">2026 Edition</span>

<div class="spacer"></div>

<p class="day">DAY 8</p>

## Jetpack Compose Fundamentals — State, Recomposition, Side Effects & Stability

---

## Why Compose is Day 8 in 2026

Compose is the default UI toolkit for new Android screens, and interviews have moved past "what is declarative UI". They probe **how Compose decides what to re-run**:

- Recomposition, skipping and **where** you read state
- `remember`, `rememberSaveable` and which state survives what
- Side-effect APIs — and the bugs you get when you misuse them
- Stability and **strong skipping mode**, on by default since Kotlin 2.0.20
- Theming, design systems and the same UI on iOS with Compose Multiplatform

| Level | Questions |
|---|---|
| Junior | Recomposition · State & remember · State hoisting |
| Mid | Side effects · Modifiers · Lazy lists & keys · derivedStateOf |
| Senior | Stability & strong skipping · Phases & performance · CompositionLocal |
| Architect | Material 3 theming · Design-system APIs · Compose at scale |

---

## Mental model: UI = f(state)

<div class="diagram" markdown="1">

```text
┌───────┐ read ┌─────────────┐   ┌────────┐   ┌─────────┐
│ State │ ───► │ Composition │ ► │ Layout │ ► │ Drawing │
└───────┘      └─────────────┘   └────────┘   └─────────┘
    ▲              what?           where?        how?
    │                                             │
    └───────── events: onClick, onValueChange ◄───┘
```

</div>

- A composable **describes** UI for the current state; it doesn't mutate views
- Writing a state object schedules work only for the scopes that **read** it
- Where you read state decides which phase re-runs: composition, layout or only drawing

:::tip The question behind every Compose answer
*"Who reads this state, and in which phase?"* — Recomposition bugs, performance issues and effect bugs all come back to it.
:::

---

@section Junior
## Junior

Recomposition · State & remember · State hoisting

---

@level Junior
## Q1. Composition and recomposition

```kotlin
@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(text = "Hello, $name", modifier = modifier)
}

@Composable
fun Counter() {
    var count by remember { mutableIntStateOf(0) }
    Button(onClick = { count++ }) {
        Text("Clicked $count times")
    }
}
```

- **Composition:** the first run builds the UI tree and stores remembered values in the *slot table*
- **Recomposition:** when `count` changes, Compose re-runs only the composables and lambdas that **read** it
- **Skipping:** a composable whose inputs haven't changed is not re-run at all

---

## Q1. What interviewers check

:::trap Interview trap
*"Recomposition redraws the whole screen."* — **No.** Compose re-runs the smallest scopes that read the changed state and skips everything whose inputs are equal.
:::

:::trap Interview trap
*"A composable runs once, top to bottom."* — It can be skipped, re-run on every animation frame, or run in any order, and a recomposition can be **cancelled** and thrown away. So the body must be fast, idempotent and free of side effects.
:::

:::followup Follow-up
*"Why does `remember` inside a `for` loop mix up state when items move?"* — `remember` is **positional**: it's keyed by its place in the call tree. Wrap each item in `key(item.id) { … }` so the state follows the item.
:::

---

## Q2. State: what survives what

| API | Survives | Use for |
|---|---|---|
| `remember { mutableStateOf() }` | Recomposition | UI element state: expanded, selected |
| `rememberSaveable { … }` | + configuration change **and** process death | Small user input: text, current tab |
| ViewModel `StateFlow` | + configuration change (**not** process death) | Screen state and business logic |
| Repository / disk | Everything | The data itself |

```kotlin
var query by rememberSaveable { mutableStateOf("") }
var expanded by remember { mutableStateOf(false) }
val selected = remember { mutableStateListOf<String>() }
val state by viewModel.uiState.collectAsStateWithLifecycle()
```

---

## Q2. State traps

:::trap Interview trap
`val count = mutableStateOf(0)` **without** `remember` — a new state object is created on every recomposition, so the value keeps resetting. Lint flags it as `UnrememberedMutableState`.
:::

:::trap Interview trap
`mutableStateOf(mutableListOf<Item>())` and then `.add(item)` — Compose only sees **writes to the state object**, not changes inside a plain list. Assign a new immutable list, or use `mutableStateListOf`.
:::

:::trap Interview trap
Putting a large list in `rememberSaveable` — it goes into the saved-state `Bundle`, which is small and can throw `TransactionTooLargeException`. Save IDs; reload the data. Custom types need `@Parcelize` or a `Saver`.
:::

---

## Q3. State hoisting: stateless composables

```kotlin
@Composable
fun SearchBar(
    query: String,
    onQueryChange: (String) -> Unit,
    modifier: Modifier = Modifier,
) {
    OutlinedTextField(
        value = query,
        onValueChange = onQueryChange,
        modifier = modifier.fillMaxWidth(),
        singleLine = true,
    )
}
```

- Hoist state to the **lowest common ancestor** that reads or writes it: value down, event lambda up
- Stateless composables are trivial to preview, test and reuse
- `modifier: Modifier = Modifier` is the **first optional parameter**, applied once to the root

---

## Q3. Where the state should live

:::trap Interview trap
Passing the `ViewModel` down into child composables. It couples every child to one screen and breaks previews. Children receive **state and lambdas**; only the screen-level route touches the ViewModel (Day 3).
:::

:::trap Interview trap
*"Hoist everything into the ViewModel."* — Pure UI element state (scroll position, an expanded card, focus) can stay in composition or in a **plain state holder** class. Business state goes to the ViewModel.
:::

:::followup Follow-up
*"What is a plain state holder?"* — A class that groups UI logic and state, created with a `rememberXState()` function — like `LazyListState` or `DrawerState`. Your own `rememberSearchState()` follows the same pattern.
:::

---

@section Mid
## Mid-Level

Side effects · Modifiers · Lazy lists & keys · derivedStateOf

---

@level Mid
## Q4. Side-effect APIs

| API | Lifetime | Use for |
|---|---|---|
| `LaunchedEffect(key)` | Coroutine starts on enter, restarts when the key changes, cancelled on leave | Suspend work tied to UI: show a snackbar, run an animation |
| `rememberCoroutineScope()` | Scope cancelled when the call site leaves composition | Launch from callbacks: `onClick` → scroll, open drawer |
| `DisposableEffect(key)` | Setup + mandatory `onDispose` | Register and unregister listeners |
| `SideEffect` | After every successful recomposition | Publish Compose state to non-Compose code |
| `rememberUpdatedState(x)` | Latest value, effect not restarted | Long-running effect calling a changing lambda |
| `produceState` | Coroutine producing a `State` | Callback or suspend source → `State` |

:::trap Interview trap
*"With `rememberCoroutineScope` you must cancel the coroutines yourself."* — **Wrong** (and v1 said it). The scope is cancelled automatically when the composable leaves the composition.
:::

---

## Q4. DisposableEffect in practice

```kotlin
@Composable
fun ScreenAnalytics(onStart: () -> Unit) {
    val lifecycleOwner = LocalLifecycleOwner.current
    val currentOnStart by rememberUpdatedState(onStart)

    DisposableEffect(lifecycleOwner) {
        val observer = LifecycleEventObserver { _, event ->
            if (event == Lifecycle.Event.ON_START) {
                currentOnStart()
            }
        }
        lifecycleOwner.lifecycle.addObserver(observer)
        onDispose {
            lifecycleOwner.lifecycle.removeObserver(observer)
        }
    }
}
```

- The key is the **lifecycle owner**: a new owner → dispose and set up again
- `rememberUpdatedState` gives the effect the newest lambda without restarting it
- Shortcut in `lifecycle-runtime-compose`: `LifecycleStartEffect` / `LifecycleResumeEffect`

:::trap Interview trap
Loading data in `LaunchedEffect(Unit)`. It re-runs whenever the screen re-enters composition — for example after every rotation. Loading belongs in the ViewModel (Day 3).
:::

---

## Q5. Modifiers: order is meaning

```kotlin
Text(
    text = "Pay",
    modifier = Modifier
        .padding(16.dp)        // outer margin, not clickable
        .clip(RoundedCornerShape(12.dp))
        .background(MaterialTheme.colorScheme.primary)
        .clickable(onClick = onPay)
        .padding(horizontal = 24.dp, vertical = 12.dp),
)
```

- Each modifier **wraps** everything after it; the chain applies from the outside in
- Order changes size, touch area, clipping and drawing: swap `clip` and `background` and the corners are gone
- Modifier chains are immutable values — cheap to build, safe to reuse

:::trap Interview trap
Writing custom modifiers with `Modifier.composed { }`. It's no longer recommended for performance reasons — implement `Modifier.Node` with a `ModifierNodeElement`, or chain existing modifiers in a plain extension function.
:::

---

## Q6. Lazy lists: keys and content types

```kotlin
LazyColumn(state = listState) {
    items(
        items = messages,
        key = { it.id },
        contentType = { it.kind },
    ) { message ->
        MessageRow(message, Modifier.animateItem())
    }
}
```

- Only visible (and prefetched) items are composed
- `key`: item state and scroll position follow the **item**, not its index — without it, the key is the position
- `contentType`: items of the same type can reuse each other's composition
- `Modifier.animateItem()` animates insertions, removals and moves — it needs keys

---

## Q6. Lazy-list traps

:::trap Interview trap
A `LazyColumn` inside a `Column` with `verticalScroll` crashes: a lazy list can't be measured with infinite height. Use **one** lazy list with several `item { }` / `items { }` sections.
:::

:::trap Interview trap
Keys must be **unique** (a duplicate key crashes) and, on Android, a type a `Bundle` can store — `String`, `Int`, `Long`. Don't use the whole data object as a key.
:::

:::trap Interview trap
Items with zero size before their data loads (e.g. empty images). The list thinks they all fit on screen and composes far too many. Give placeholders a size.
:::

:::followup Follow-up
*"Column or LazyColumn for 20 fixed rows?"* — `Column` composes and lays out all children up front; fine for small, bounded content. Unbounded or long data → lazy.
:::

---

## Q7. derivedStateOf or remember(key)?

```kotlin
val listState = rememberLazyListState()

// Recomposes whenever the first visible index changes
val showBad = listState.firstVisibleItemIndex > 0

// Recomposes only when the Boolean flips
val showScrollToTop by remember {
    derivedStateOf { listState.firstVisibleItemIndex > 0 }
}
```

| Tool | Inputs | Recalculates |
|---|---|---|
| `remember(a, b) { f(a, b) }` | Parameters or plain values | When a key changes |
| `derivedStateOf { }` | State objects that change **more often** than the result | When the result changes |

:::trap Interview trap
`remember { derivedStateOf { count > 0 } }` where `count` is a plain **parameter**, not state — it's never tracked, so the value is stale forever. Use `remember(count) { … }` or compute it directly.
:::

---

@section Senior
## Senior

Stability & strong skipping · Phases & performance · CompositionLocal

---

@level Senior
## Q8. Stability and strong skipping mode

:::new Kotlin 2.0.20+
Strong skipping mode is **on by default**. The Compose compiler now ships with Kotlin — plugin `org.jetbrains.kotlin.plugin.compose`, same version as Kotlin.
:::

| | Before strong skipping | Strong skipping (default) |
|---|---|---|
| Composable with an unstable parameter | Never skipped | Skippable |
| Unstable parameters compared by | — | Instance equality (`===`) |
| Stable parameters compared by | `equals()` | `equals()` |
| Lambdas inside composables | Remembered only if all captures are stable | Always remembered; captures act as keys |

**Stable:** primitives, `String`, function types, enums, classes whose public properties are all `val` of stable types, `@Immutable` / `@Stable` types, kotlinx immutable collections.

---

## Q8. What still goes wrong

```kotlin
// Unstable: a `var`, and List is an interface
data class CartUi(var items: List<Item>)

// Stable (if Item is stable): val + immutable collection
data class CartUi(val items: ImmutableList<Item>)
```

```kotlin
composeCompiler {
    reportsDestination = layout.buildDirectory.dir("compose")
    metricsDestination = layout.buildDirectory.dir("compose")
    stabilityConfigurationFiles.add(
        rootProject.layout.projectDirectory
            .file("stability.conf")
    )
}
```

:::trap Interview trap
*"Data classes are stable."* — v1 said it. Only if every property is a `val` of a stable type. A `var`, a `List`, or a class from a module **without** the Compose compiler makes it unstable.
:::

:::trap Interview trap
*"Strong skipping made stability irrelevant."* — Unstable parameters are compared with `===`. A new but equal `List` (every `map {}` in the ViewModel) still recomposes. And lambdas no longer need manual `remember` — v1 advice is outdated.
:::

---

## Q9. The three phases — defer state reads

<div class="diagram" markdown="1">

```text
Composition ──► Layout (measure, place) ──► Drawing
 reads here:     reads here:                 reads here:
 re-run all 3    re-run layout + draw        re-run draw
```

</div>

```kotlin
val color by animateColorAsState(target, label = "bg")
val fade by animateFloatAsState(targetAlpha, label = "a")

// Read in composition: recomposes on every animation frame
Box(Modifier.background(color))

// Read in the draw phase: no recomposition
Box(Modifier.drawBehind { drawRect(color) })

// Lambda versions defer the read to layout / draw
Box(Modifier.offset { IntOffset(0, scroll.value / 2) })
Box(Modifier.graphicsLayer { alpha = fade })
```

:::trap Interview trap
*"`graphicsLayer` never triggers recomposition."* — Only the **lambda** version, reading state inside the block. `Modifier.graphicsLayer(alpha = fade)` reads `fade` in composition, so it recomposes every frame.
:::

---

## Q9. Performance basics checklist

- Measure a **release** build with R8 and Baseline Profiles (Day 1) — debug Compose is much slower and misleading
- **Layout Inspector** shows recomposition and skip counts per composable
- **Compose compiler reports**: which composables are skippable and which parameters are unstable
- Heavy work (sorting, formatting, parsing) out of composition — ViewModel or `remember(keys)`
- Trace real jank with system tracing / Perfetto — the deep dive is Day 17

:::trap Interview trap
**Backwards writes:** writing a state object after reading it in the same composition — e.g. `count++` directly in the body. It schedules another recomposition, which writes again: an endless loop.
:::

:::trap Interview trap
*"Add `@Stable` everywhere to be safe."* — It's a **promise** to the compiler, not a check. Lie about a mutable class and Compose skips updates: stale UI that's hard to debug.
:::

---

## Q10. CompositionLocal: implicit, tree-scoped values

```kotlin
@Immutable
data class Spacing(
    val small: Dp = 4.dp,
    val medium: Dp = 8.dp,
    val large: Dp = 16.dp,
)

val LocalSpacing = staticCompositionLocalOf { Spacing() }

val roomy = Spacing(large = 24.dp)
CompositionLocalProvider(LocalSpacing provides roomy) {
    Content() // reads LocalSpacing.current.large
}
```

| | `compositionLocalOf` | `staticCompositionLocalOf` |
|---|---|---|
| Value changes | Recompose only the **readers** | Recompose the **whole** provided content |
| Best for | Values that change often | Values that rarely or never change (theme tokens) |

---

## Q10. When not to use it

- Good fits: theme tokens, `LocalContext`, `LocalDensity`, `LocalLayoutDirection` — tree-scoped, with a sensible default
- Every read is an **implicit dependency**: invisible in the signature, easy to forget in previews and tests

:::trap Interview trap
Using CompositionLocal to pass ViewModels, repositories or screen data "to avoid parameters". It hides dependencies and breaks previews. Pass explicit parameters; use DI for services (Day 7).
:::

:::trap Interview trap
`LocalContext.current as Activity` — the context can be a `ContextWrapper` (dialogs, themed wrappers), so the cast can crash. Unwrap the `baseContext` chain, or better, don't need the Activity in UI code.
:::

---

@section Architect
## Architect

Material 3 theming · Design-system APIs · Compose at scale

---

@level Architect
## Q11. Material 3 theming

```kotlin
@Composable
fun AppTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit,
) {
    val context = LocalContext.current
    val colors = when {
        dynamicColor && Build.VERSION.SDK_INT >= 31 ->
            if (darkTheme) dynamicDarkColorScheme(context)
            else dynamicLightColorScheme(context)
        darkTheme -> DarkColors
        else -> LightColors
    }
    MaterialTheme(colorScheme = colors, typography = AppTypo) {
        CompositionLocalProvider(
            LocalSpacing provides Spacing(),
            content = content,
        )
    }
}
```

- Components use color **roles** (`colorScheme.primary`, `onSurface`), the type scale and shapes — never hex values
- Dynamic color from Android 12 (API 31); brand colors as the fallback
- Tokens Material doesn't have (spacing, elevation levels) → your own CompositionLocals

---

## Q11. Theming traps

:::trap Interview trap
Hard-coded `Color(0xFF…)` inside components. Dark theme, dynamic color and high-contrast themes silently break. Only the theme file knows hex values.
:::

:::trap Interview trap
Mixing Material 2 (`androidx.compose.material`) and Material 3 components. M2 components read the **M2** `MaterialTheme`, so inside an M3 theme they fall back to default colors and typography.
:::

:::trap Interview trap
Ignoring window insets. With targetSdk 35+, edge-to-edge is enforced: content draws behind the system bars. Use the `innerPadding` from `Scaffold`, or `Modifier.safeDrawingPadding()`.
:::

---

## Q12. Design-system component APIs

```kotlin
@Composable
fun AppCard(
    title: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    actions: @Composable RowScope.() -> Unit = {},
    content: @Composable ColumnScope.() -> Unit,
) {
    val spacing = LocalSpacing.current
    Card(modifier) {
        Column(Modifier.padding(spacing.large)) {
            val style = MaterialTheme.typography.titleMedium
            ProvideTextStyle(style) { title() }
            content()
            Row(Modifier.align(Alignment.End)) { actions() }
        }
    }
}
```

- Parameter order from the Compose API guidelines: required → `modifier` → optional → trailing `content`
- **Slots** (`@Composable` lambdas) instead of strings and flags: callers decide what goes inside
- Stateless by default; previews for every state; screenshot tests in CI (Day 10)

---

## Q12. Running a component library

:::trap Interview trap
**Boolean explosion:** `AppButton(isPrimary, isOutlined, hasIcon, isLoading, …)`. Every flag doubles the states to test. Split it into `PrimaryButton` / `OutlinedButton` and use slots for icons.
:::

:::trap Interview trap
*"A shared design system across Android and iOS needs `expect`/`actual` for every component."* — v1 advice. With **Compose Multiplatform**, components live in `commonMain`; `expect`/`actual` only for the rare platform detail.
:::

:::tip Governance
Custom Lint rules (or Slack's `compose-lints`) that forbid raw `material3.Button` in feature modules keep teams on the design system. Version the library with semver and publish migration notes.
:::

---

## Q13. Compose at scale: interop

```kotlin
@Composable
fun LegacyChart(
    points: List<Point>,
    modifier: Modifier = Modifier,
) {
    AndroidView(
        factory = { context -> ChartView(context) },
        modifier = modifier,
        update = { view -> view.setPoints(points) },
        onRelease = { view -> view.clear() },
    )
}
```

- `factory` runs once; `update` runs again whenever the state it reads changes
- In lazy lists, pass `onReset` so the View can be **reused** instead of recreated
- Compose inside Fragments (`ComposeView`, `ViewCompositionStrategy`) and Fragments inside Compose (`AndroidFragment`) were Day 2
- Migrate bottom-up: theme first, then leaf components, then whole screens

:::trap Interview trap
Treating `update` as one-time setup. It re-runs whenever a state it reads changes — keep it cheap and idempotent; create listeners in `factory`, not in `update`.
:::

---

## Q13. Performance guardrails in CI

| Guardrail | Catches |
|---|---|
| Compose compiler reports / metrics diffed in CI | New unstable parameters, non-skippable composables |
| Stability configuration file | Domain types from non-Compose modules treated as unstable |
| Baseline Profiles (Day 1, Day 18) | Slow first frames and first scrolls |
| Macrobenchmark `FrameTimingMetric` | Scroll and animation jank regressions |
| Lint / `compose-lints` | Missing `modifier` parameter, unremembered state, misuse of effects |

:::tip Senior answer in one line
"Compose re-runs whatever reads the state that changed. Keep state small and hoisted, types stable, reads late, and side effects inside effect APIs — then measure in a release build."
:::

---

## Day 8 — cheat sheet

- UI = f(state). Recomposition re-runs only the scopes that **read** changed state; unchanged inputs are skipped.
- Composable bodies: fast, idempotent, no side effects — they can run often, in any order, or be cancelled.
- `remember` survives recomposition; `rememberSaveable` also rotation and process death; the ViewModel only rotation.
- Hoist state: value down, events up. `modifier` is the first optional parameter.
- Effects: `LaunchedEffect` (keys!), `DisposableEffect` + `onDispose`, `rememberCoroutineScope` for callbacks — auto-cancelled.
- Modifier order is meaning. New custom modifiers use `Modifier.Node`, not `composed`.
- Lazy lists: stable unique `key`, `contentType`, never nest same-direction scrolling.
- Strong skipping is default (Kotlin 2.0.20+): unstable params compare by `===`; data classes aren't automatically stable.
- Defer reads with lambda modifiers (`offset {}`, `graphicsLayer {}`, `drawBehind {}`); measure in release builds.
- Theme with M3 color roles and CompositionLocal tokens — never hex values in components.

**Day 9 is next → Testing, part 1.** Save this post and follow along.
