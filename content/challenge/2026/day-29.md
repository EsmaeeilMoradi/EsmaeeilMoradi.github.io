@cover
# 30-Day Android Challenge

Senior Android interview prep — Junior → Mid → Senior → Architect

<span class="edition">2026 Edition</span>

<div class="spacer"></div>

<p class="day">DAY 29</p>

## Scalability & Global Deployment — i18n, RTL, Accessibility, Feature Flags, Rollouts & Compliance

---

## Why global deployment matters in 2026

Shipping in one language to one country is a product. Shipping to the world is an **engineering discipline**: every string, layout, number format, flag, rollout and data flow must work for people on devices, networks and laws you don't use.

- **Languages & scripts:** plurals, formats and RTL layouts are code, not just translation
- **Accessibility at scale:** built into the design system and CI — and in the EU, a legal requirement for many apps
- **Decouple deploy from release:** feature flags, experiments and staged rollouts per country
- **Policy & privacy:** Play's targetSdk bar rises every year; GDPR-style laws decide what you may collect
- **Emerging markets:** small downloads, low data use, offline-first

| Level | Questions |
|---|---|
| Junior | i18n vs l10n · RTL layouts · Plurals & formatting |
| Mid | Per-app language · Accessibility at scale · Feature flags · Experiments |
| Senior | Staged & regional rollouts · Play policies · Privacy & GDPR |
| Architect | Emerging markets · Multi-region & version skew · Global-ready platform |

---

## Mental model: one binary, three axes

<div class="diagram" markdown="1">

```text
┌──────────────────── one binary ────────────────────┐
│ resources · design system · flags · telemetry      │
└─────────┬─────────────────┬─────────────────┬──────┘
          ▼                 ▼                 ▼
       LOCALE            REGION            DEVICE
   language, RTL,    laws, policies,   size, RAM,
   plurals, formats  rollout, flags    network cost
```

</div>

- **Locale** decides words, direction, plurals and formats — resolved by Android's resource system at runtime
- **Region** decides what's legal and what's switched on — server config, flags and Play Console country targeting
- **Device** decides what you can afford — size, memory, data cost (Day 28)

:::tip Global-ready by default
If the design system handles RTL, font scaling and accessibility, every new feature is global-ready for free. If each team handles it alone, most won't.
:::

---

@section Junior
## Junior

i18n vs l10n · RTL layouts · Plurals & formatting

---

@level Junior
## Q1. i18n vs l10n — resources done right

- **i18n (internationalization):** engineering the app so it *can* adapt — no hardcoded text, locale-aware formatting, layouts that grow and mirror
- **l10n (localization):** the adaptation itself — translations, images, formats, legal text per locale

```xml
<!-- res/values/strings.xml: the complete default set -->
<resources xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2">
    <string name="app_name" translatable="false">Acme</string>
    <string name="greeting">Hello, <xliff:g id="name"
        example="Sara">%1$s</xliff:g>!</string>
</resources>

<!-- res/values-es/strings.xml: only translated strings -->
<resources>
    <string name="greeting">¡Hola, %1$s!</string>
</resources>
```

- Since Android 7.0 users can list several languages, and resolution falls back to the closest match (a Mexican-Spanish user gets `values-es`) before the default

---

## Q1. What interviewers check

:::trap Interview trap
*"Build the sentence in code: `"Hello " + name`."* — Word order differs between languages. Use one string with **positional placeholders** (`%1$s`, `%2$d`) so translators can reorder them.
:::

:::trap Interview trap
*"`drawable-fr` holds the image for France."* (last year's example) — `fr` is a **language** qualifier: French in Canada, Belgium, Senegal… For a region use `fr-rFR` or the BCP 47 form `b+fr+FR`. Language is not country.
:::

:::followup Follow-up
*"What if a string exists in `values-es` but not in the default `values/`?"* — Users whose locale has no matching folder hit `Resources.NotFoundException` — a crash. Lint flags it as `ExtraTranslation`; missing translations show up as `MissingTranslation`.
:::

---

## Q2. RTL layouts done right

```kotlin
Row(Modifier.padding(start = 16.dp, end = 8.dp)) {
    Icon(
        Icons.AutoMirrored.Filled.ArrowBack,
        contentDescription = stringResource(R.string.back),
    )
    Text(
        text = stringResource(R.string.title),
        textAlign = TextAlign.Start,
    )
}

// Rare: a side that must NOT mirror
Modifier.absolutePadding(left = 16.dp)
```

- Manifest: `android:supportsRtl="true"`. Views: `start` / `end`, never `left` / `right`
- Compose mirrors layouts from `LocalLayoutDirection`; `start` / `end` padding is relative
- Directional icons: `Icons.AutoMirrored.*` in Compose, `android:autoMirrored="true"` on vector drawables

---

## Q2. What not to mirror — and mixed text

| Mirror | Don't mirror |
|---|---|
| Back / forward arrows, chevrons | Media playback controls and media progress |
| Layout order, text alignment | Clocks, phone numbers, code |
| Navigation drawer side | Logos and brand marks |

```kotlin
// User text inside a translated sentence
val bidi = BidiFormatter.getInstance()
val msg = getString(
    R.string.sent_to, bidi.unicodeWrap(userName),
)
```

:::trap Interview trap
*"`supportsRtl` is enough."* — Only relative attributes mirror. `marginLeft`, `Gravity.LEFT`, absolute padding and hand-drawn arrows stay put. And **text** direction comes from the content: a Latin username in a Persian sentence needs isolation, or punctuation lands on the wrong side.
:::

- Test with **Force RTL layout direction** (Developer options) and the pseudolocales `ar-XB` (mirrored) and `en-XA` (accented, longer)

---

## Q3. Plurals follow the language, not English

```xml
<plurals name="items_in_cart">
    <item quantity="one">%d item</item>
    <item quantity="other">%d items</item>
</plurals>
```

```kotlin
val count = cart.items.size
val label = pluralStringResource(
    R.plurals.items_in_cart, count, count,
)
```

- Android picks the category with **CLDR plural rules**: English has `one` and `other`; Polish adds `few` and `many`; Arabic uses all six (`zero`, `one`, `two`, `few`, `many`, `other`)
- The second `count` fills the `%d` placeholder

:::trap Interview trap
*"Use `quantity="zero"` for 'No items' in English."* — English never selects `zero`; 0 maps to `other`. For an empty state, check `count == 0` in code and use a separate string.
:::

---

## Q3. Numbers, dates and money

```kotlin
val locale = LocalConfiguration.current.locales[0]

// Format comes from the locale, currency from the data
val price = NumberFormat.getCurrencyInstance(locale).apply {
    currency = Currency.getInstance(order.currencyCode)
}.format(order.amount)

val date = DateTimeFormatter
    .ofLocalizedDate(FormatStyle.MEDIUM)
    .withLocale(locale)
    .format(order.date)

// Machine formats: never the user's locale
val path = String.format(Locale.ROOT, "/orders/%d", order.id)
```

:::trap Interview trap
*"`String.format("%d", id)` for an API path."* — It uses the default locale: on Persian and some Arabic locales the digits come out as ۱۲۳ or ١٢٣ and the request breaks. Anything a **machine** reads uses `Locale.ROOT`.
:::

:::trap Interview trap
*"Take the currency from the device locale."* — A German traveler in Japan still pays in euros. Currency belongs to the **data**; the locale only decides how it's displayed. Non-Gregorian calendars (Persian, Hijri) come from ICU (`android.icu`).
:::

---

@section Mid
## Mid-Level

Per-app language · Accessibility at scale · Feature flags · Experiments

---

@level Mid
## Q4. Per-app language preferences

```kotlin
// AppCompat 1.6+: API 33+ delegates to the system;
// older versions need AppCompatActivity + autoStoreLocales
fun onLanguagePicked(tag: String) {
    AppCompatDelegate.setApplicationLocales(
        LocaleListCompat.forLanguageTags(tag)
    )
}

// Empty list = follow the system language
val current = AppCompatDelegate.getApplicationLocales()
```

```kotlin
// build.gradle.kts: generates the locale config
android {
    androidResources { generateLocaleConfig = true }
}
```

- Android 13 (API 33) added a per-app language setting in system Settings; the app declares its languages via `android:localeConfig` (generated above, with `unqualifiedResLocale` in `res/resources.properties`)
- Framework equivalent: `LocaleManager.applicationLocales` (API 33+)

---

## Q4. The traps

:::trap Interview trap
*"Override `Configuration.locale` in `attachBaseContext`."* — The old hack: deprecated APIs, lost on some screens (a WebView can reset it), and invisible to the system setting. Use the per-app language API.
:::

:::trap Interview trap
*"The picker works, but the new language shows English."* — With App Bundles, Play installs only the language splits for the device's languages. A language picked in-app may be missing: disable language splits (`bundle { language { enableSplit = false } }`) or download it with Play's SplitInstall API.
:::

:::followup Follow-up
*"Where is the choice stored below API 33?"* — AppCompat can persist it for you: declare `AppLocalesMetadataHolderService` with `autoStoreLocales` set to `true` in the manifest. On API 33+ the system stores it.
:::

---

## Q5. Accessibility at scale: the component

```kotlin
@Composable
fun OrderRow(order: Order, onOpen: () -> Unit) {
    val label = stringResource(R.string.open_order)
    Row(
        Modifier
            .fillMaxWidth()
            .clickable(onClickLabel = label, onClick = onOpen)
            .heightIn(min = 48.dp)
            .padding(horizontal = 16.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        // Decorative: the text already says it
        Icon(Icons.Default.ShoppingCart, null)
        Text(order.title, Modifier.padding(start = 16.dp))
    }
}
```

- **Semantics:** meaningful labels, `null` for decorative images, `Modifier.semantics { heading() }` for section titles
- **Touch targets** at least 48 × 48 dp · **text in `sp`**, no fixed heights — Android 14 scales fonts up to 200% · **contrast** 4.5:1 for normal text (WCAG AA)

---

## Q5. Making it scale across teams

| Layer | Mechanism |
|---|---|
| Design system | Accessible components by default: semantics, touch targets, contrast tokens |
| CI | Lint, Espresso `AccessibilityChecks`, Accessibility Test Framework in Compose tests, screenshots at 200% font |
| Release | Accessibility suggestions in the Play pre-launch report |
| People | Regular TalkBack and Switch Access passes; accessibility in the Definition of Done |

:::new European Accessibility Act
Since 28 June 2025, many consumer products and services in the EU — e-commerce, banking, transport, e-books — must meet accessibility requirements, apps included.
:::

:::trap Interview trap
*"Automated checks pass, so we're accessible."* — Tools catch missing labels and small targets, not a confusing focus order or a flow that can't be finished with TalkBack. Manual testing with assistive technology is required.
:::

---

## Q6. Feature flags: typed, safe, frozen

```kotlin
enum class Flag(val key: String, val default: Boolean) {
    NEW_CHECKOUT("new_checkout", default = false),
    FEED_PREFETCH("feed_prefetch", default = true),
}

interface FlagSource { fun bool(key: String): Boolean? }

class Flags(source: FlagSource) {
    // Frozen at session start: no UI flipping mid-flow
    private val snapshot = Flag.entries.associateWith {
        source.bool(it.key) ?: it.default
    }
    fun isOn(flag: Flag): Boolean = snapshot.getValue(flag)
}
```

- **Types:** release toggles (short-lived), experiment flags, ops kill switches (long-lived), entitlements
- **Safe defaults compiled in.** Activate cached values at startup and fetch for the next session — never block the first frame on the network (Day 1)
- Firebase Remote Config's default minimum fetch interval is 12 hours; real-time updates exist via `addOnConfigUpdateListener`

---

## Q6. Flag traps

:::trap Interview trap
*"Flags are free."* — Every flag doubles a code path to test. Give each one an **owner and an expiry date** and delete it after full rollout; stale flags are where dead code and "impossible" bugs live.
:::

:::trap Interview trap
*"Read the flag live everywhere."* — Values can change mid-session; a checkout that switches UI halfway is a bug. Snapshot per session or per flow, and log which values were active.
:::

:::followup Follow-up
*"Evaluate flags on the client or the server?"* — Server-side when the rule is sensitive (pricing, entitlements) or needs targeting logic you don't want in the APK. Client-side for UI toggles and kill switches that must work offline. Anything in the APK can be read and flipped by a determined user.
:::

---

## Q7. A/B testing without fooling yourself

- **Hypothesis + one primary metric**, decided before launch (for example, checkout conversion)
- **Guardrail metrics:** crash rate, ANR rate, startup time, uninstalls — winning conversion while losing stability is a loss
- **Randomize by user or install**, not by session, and keep the assignment stable
- **Sample size up front**, from the smallest effect you care about; run full weeks to cover weekly cycles
- **Log exposure at the point of use** — when the variant is actually shown — not at assignment

:::trap Interview trap
*"We stopped the test on day 3 — it hit significance."* — Checking repeatedly and stopping at the first significant result inflates the false-positive rate. Fix the duration up front, or use a sequential method designed for peeking.
:::

---

## Q7. Experiment pitfalls

| Pitfall | What goes wrong | Fix |
|---|---|---|
| Peeking | Early stop at p < 0.05 inflates false positives | Fixed horizon or sequential tests |
| Sample ratio mismatch | A 50/50 split shows 52/48: assignment or logging is broken | Check SRM before reading results |
| Exposure at assignment | Users who never saw the change dilute the effect | Log when the variant renders |
| Novelty effect | Early lift fades | Run long enough; watch the trend |
| Too many metrics | Something is always "significant" | One primary metric; correct for the rest |

:::tip Global twist
Effects differ by market. A win in one country can be neutral or negative in another — segment results by country, language and device tier before rolling out everywhere.
:::

---

@section Senior
## Senior

Staged & regional rollouts · Play policies · Privacy & GDPR

---

@level Senior
## Q8. Staged and regional rollouts

| Stage | Audience | Gate to move on |
|---|---|---|
| Internal testing | Team, QA | Smoke tests pass |
| Closed / open testing | Beta users | No new top crashes; vitals stable |
| Production, small % | Random users | Crash, ANR, start time vs previous version |
| Larger % → 100% | Everyone eligible | Business metrics and support tickets stable |

- Play Console lets you **halt**, resume and increase a staged rollout, and choose the countries / regions each track is available in
- **Managed publishing** lets you decide exactly when an approved release goes live
- Start a rollout when on-call is awake for the regions receiving it

---

## Q8. Deploy is not release

- **Decouple deploy from release:** ship code dark behind a flag, then ramp by country, device tier or percentage — no new binary, instant off switch
- **Adoption is slow:** many users update days or weeks later, so the server supports several app versions at once (Q12)

:::trap Interview trap
*"100% rollout means everyone runs the new version."* — It means everyone *can* get it. Adoption depends on auto-update settings, Wi-Fi and storage. For urgent fixes combine in-app updates (Day 24) with server-side flags.
:::

:::trap Interview trap
*"Launch globally on day one."* — Markets differ in devices, networks and languages. Start with a representative market, watch vitals by country, then expand.
:::

---

## Q9. Play policies that shape global releases

| Requirement | What it means | Where it bites |
|---|---|---|
| Target API level | New apps and updates must target a recent API (35+ today); the bar rises every year | Behavior changes: edge-to-edge, predictive back, FGS rules |
| 16 KB page size | Apps targeting Android 15+ that ship native code must support 16 KB pages | Old `.so` files, third-party SDKs |
| Data safety form | Declare what you collect and share — SDKs included | Must match real behavior |
| Account deletion | Apps with account creation must offer deletion in the app and on the web | Backend and UX work |
| Photo & video access | Broad media permissions only for core use; others use the photo picker | Removing `READ_MEDIA_IMAGES` |
| Foreground services | Declare types and justify them (Day 16) | Play Console declarations |

---

## Q9. Policy traps

:::new Developer verification
Google is rolling out developer verification for apps installed on certified Android devices — including apps distributed outside Play — starting in a few countries in 2026. It matters if you also ship through other stores or direct APKs.
:::

:::trap Interview trap
*"Bumping targetSdk is a one-line change."* — Each new target switches on behavior changes: edge-to-edge enforcement at 35, predictive back, stricter background and FGS rules. Budget a release cycle and test on the new OS.
:::

:::trap Interview trap
*"Policy is legal's problem."* — Most violations are engineering facts: an SDK collecting data you didn't declare, a permission you don't need, a missing deletion flow. Check SDKs in the Play SDK Index before adding them.
:::

---

## Q10. Privacy and GDPR on Android

- **Lawful basis:** GDPR has six — consent, contract, legal obligation, vital interests, public task, legitimate interests. Consent must be freely given, specific and revocable.
- **Data minimization:** collect only what the feature needs; prefer coarse location, the photo picker, on-device processing
- **User rights:** access, correction, erasure, portability — backend flows, not just a settings screen
- **Transfers:** personal data leaving the EEA needs a legal mechanism (adequacy decision, standard contractual clauses)

```xml
<!-- Analytics off until the user decides -->
<meta-data
    android:name="firebase_analytics_collection_enabled"
    android:value="false" />
```

```kotlin
class ConsentGate(
    private val consent: ConsentRepository,
    private val analytics: FirebaseAnalytics,
) {
    suspend fun apply() {
        val granted = consent.analyticsGranted.first()
        analytics.setAnalyticsCollectionEnabled(granted)
    }
}
```

---

## Q10. Two myths from last year

:::trap Interview trap
*"GDPR and CCPA both require explicit consent before collecting any data."* — GDPR allows other lawful bases (a contract covers the core service); consent is typically needed for non-essential tracking and ads (GDPR together with ePrivacy rules). CCPA/CPRA is mainly an **opt-out** model. Build a consent layer that can express both.
:::

:::trap Interview trap
*"Use GPS geo-fencing to decide which law applies."* — Requesting location just to pick a privacy regime breaks data minimization and needs a permission users will deny. Use coarse signals (account or store country, server-side IP lookup) and default to the **strictest** regime when unsure.
:::

:::tip Ads in Europe
For ads served to users in the EEA and UK, Google requires a certified consent management platform (for example Google's UMP SDK, based on IAB TCF). Other regimes to know: LGPD (Brazil), DPDP Act (India).
:::

---

@section Architect
## Architect

Emerging markets · Multi-region & version skew · Global-ready platform

---

@level Architect
## Q11. Build for emerging markets

```kotlin
fun imageQuality(cm: ConnectivityManager): Quality {
    val caps = cm.getNetworkCapabilities(cm.activeNetwork)
        ?: return Quality.LOW
    val unmetered = caps.hasCapability(
        NetworkCapabilities.NET_CAPABILITY_NOT_METERED
    )
    val saver = cm.restrictBackgroundStatus ==
        ConnectivityManager.RESTRICT_BACKGROUND_STATUS_ENABLED
    return when {
        unmetered -> Quality.HIGH
        saver -> Quality.LOW // Data Saver is on
        else -> Quality.MEDIUM
    }
}
```

- **Download size is a conversion metric:** App Bundles, R8 and resource shrinking, WebP (AVIF on API 31+), on-demand features and assets (Day 18, Day 25)
- **Data costs money:** respect Data Saver and metered networks; request images sized for the view; use HTTP caching
- **Offline-first:** read from the local database, queue writes with WorkManager (Day 14)

---

## Q11. Emerging-market traps

:::trap Interview trap
*"Wi-Fi is free, mobile data is metered."* — Hotspots and capped Wi-Fi are metered; some mobile plans aren't. Check `NET_CAPABILITY_NOT_METERED`, not the transport type.
:::

:::trap Interview trap
*"Build a separate 'lite' app for those markets."* — Two codebases drift apart. Prefer one app that adapts: device tier (Day 28), network conditions and on-demand modules.
:::

:::followup Follow-up
*"How small is small enough?"* — Track download size per release in Play Console and give it a budget in CI (Day 28). Every new dependency has to justify its bytes.
:::

- Also plan for: low storage, shared devices, intermittent connectivity and SMS-based sign-in fallbacks

---

## Q12. Multi-region backends — the client's side

- **One global hostname;** the edge (GeoDNS, anycast, CDN) routes to the nearest healthy region — no region lists hardcoded in the app
- **Data residency:** if a user's data lives in a home region, the server returns that region's endpoint after login and the client stores it
- **Failover-safe calls:** timeouts, retries with backoff **and jitter**, respect `Retry-After`, **idempotency keys** on writes

```kotlin
suspend fun <T> withRetry(
    attempts: Int = 3,
    block: suspend () -> T,
): T {
    repeat(attempts - 1) { n ->
        try {
            return block()
        } catch (e: IOException) {
            val capMs = 1_000L shl n // 1s, 2s, 4s…
            delay(Random.nextLong(capMs)) // full jitter
        }
    }
    return block()
}

// Same key on every retry of one logical operation
val key = UUID.randomUUID().toString()
withRetry { api.pay(order, idempotencyKey = key) }
```

---

## Q12. Version skew and residency myths

- **Version skew:** old app versions live for months or years. The API is a contract: version it, keep changes additive, gate features by app version on the server, and enforce a minimum supported version (in-app updates, Day 24)

:::trap Interview trap
*"Store EU users' data in the EU and GDPR is satisfied — the data never leaves."* (last year's claim) — GDPR doesn't mandate EU storage; it regulates **transfers**. And "never leaves" is rarely true: support tools, analytics and crash SDKs copy data elsewhere. Some countries do require local storage for certain data — that's data localization, a separate law per country.
:::

:::trap Interview trap
*"On failover, retry immediately."* — Millions of clients retrying in lockstep create a thundering herd that can take down the healthy region too. Jitter spreads them out; `Retry-After` lets the server steer.
:::

---

## Q13. Design a global-ready platform: strings

1. Developers add the source string **with a context note** for translators
2. A translation management system (Crowdin, Lokalise, Phrase…) syncs it to translators with a glossary and screenshots
3. Translations return as a PR; CI checks them
4. **String freeze** before the release branch is cut

```kotlin
android {
    buildTypes {
        debug { isPseudoLocalesEnabled = true } // en-XA, ar-XB
    }
    lint {
        error += setOf(
            "MissingTranslation",
            "StringFormatInvalid",
        )
    }
}
```

:::trap Interview trap
*"Lint catches hardcoded text."* — `HardcodedText` checks XML layouts. `Text("Pay now")` in Compose slips through — add a custom Lint or detekt rule.
:::

---

## Q13. The platform, not every team, owns "global"

| Concern | Platform provides | Enforced by |
|---|---|---|
| Text & layout | Design system with RTL, font scaling, semantics | Screenshot tests in RTL and at 200% font |
| Strings | TMS sync, context notes, string freeze | Lint and CI |
| Region rules | Config / flag service with country targeting | Reviewed server config |
| Privacy | Consent SDK; telemetry that respects it | Data safety review per release |
| Release | Staged rollout per country; dashboards by country and locale | Release checklist |

:::trap Interview trap
*"We'll add RTL and accessibility when we launch in that market."* — Retrofitting touches every screen. Global-ready defaults cost little on day one and a lot later.
:::

:::tip Senior answer in one line
"Build one app that adapts: locale-driven resources and formats, a design system that is RTL- and accessibility-ready by default, flags and staged rollouts per region, privacy by design — and an API that respects every client version still in the wild."
:::

---

## Day 29 — cheat sheet

- i18n = engineering for adaptation; l10n = the adaptation. Complete default `values/`, positional placeholders, no concatenation.
- `fr` is a language, `fr-rFR` a region. Language ≠ country ≠ currency.
- RTL: `supportsRtl`, start/end, auto-mirrored icons, `BidiFormatter` for mixed text — don't mirror media controls or clocks.
- Plurals follow CLDR; English never uses `zero`. Machine-readable formats use `Locale.ROOT`.
- Per-app language: API 33+, backported by AppCompat; watch App Bundle language splits.
- Accessibility at scale lives in the design system and CI — plus manual TalkBack passes.
- Flags: compiled-in defaults, session snapshots, owners and expiry dates. Experiments: guardrails, no peeking.
- Staged rollouts per country, halted on vitals; deploy ≠ release.
- Play: targetSdk bar rises yearly, 16 KB pages for native code, honest Data safety, account deletion.
- GDPR: six lawful bases, minimization, transfers — not "consent for everything", not "data must stay in the EU".

**Day 30 is next → System Design & Integration — the finale.** Save this post and follow along.
