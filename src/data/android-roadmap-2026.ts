import type { T } from "./site";

export type RoadmapTrack = "main" | "deep" | "legacy" | "special";

export type RoadmapTools = {
  recommended: T[];
  alternatives: T[];
};

/** One stop on a track — skill outcome, not a library dump */
export type RoadmapStage = {
  id: string;
  number: number;
  track: RoadmapTrack;
  title: T;
  subtitle: T;
  prerequisite: T;
  goal: T;
  concepts: T[];
  tools: RoadmapTools;
  exercise: T;
  passCriteria: T;
  /** Official docs — filled from stageOfficialDocs by id when packing UI */
  docs?: { label: T; url: string }[];
};

export const roadmapMeta = {
  title: { en: "Android Developer Roadmap 2026", fa: "نقشهٔ راه اندروید ۲۰۲۶" },
  lead: {
    en: "An interactive Compose-first skill map — expand stations, open topics, practice, and track progress locally. Not a library dump.",
    fa: "نقشهٔ مهارت تعاملی Compose-first — ایستگاه باز کن، موضوع را ببین، تمرین کن، پیشرفت را محلی ثبت کن. نه انبار کتابخانه.",
  },
  prerequisite: { en: "Prerequisite", fa: "پیش‌نیاز" },
  goal: { en: "Learning goal", fa: "هدف یادگیری" },
  concepts: { en: "Essential concepts", fa: "مفاهیم ضروری" },
  tools: { en: "Tools", fa: "ابزارها" },
  recommended: { en: "Recommended", fa: "پیشنهادی" },
  alternatives: { en: "Alternatives", fa: "جایگزین" },
  exercise: { en: "Practice", fa: "تمرین عملی" },
  passCriteria: { en: "Pass criteria", fa: "معیار عبور" },
  docs: { en: "Official docs", fa: "مستندات رسمی" },
  why: { en: "Why it matters", fa: "چرا مهم است" },
  tracksTitle: { en: "Four paths", fa: "چهار مسیر" },
  trackMain: { en: "Main path", fa: "مسیر اصلی" },
  trackDeep: { en: "Professional depth", fa: "تعمیق حرفه‌ای" },
  trackLegacy: { en: "Legacy & migration", fa: "نگهداری و مهاجرت" },
  trackSpecial: { en: "Specializations", fa: "تخصصی / انتخابی" },
  trackMainDesc: {
    en: "Everyone: build and ship a reliable app.",
    fa: "همه: ساخت و انتشار یک اپ قابل‌اتکا.",
  },
  trackDeepDesc: {
    en: "After you ship: testing depth, performance, scale.",
    fa: "بعد از یک محصول: عمق تست، عملکرد، مقیاس.",
  },
  trackLegacyDesc: {
    en: "Existing codebases: Views, Fragment, Java, gradual migrate.",
    fa: "پروژه‌های موجود: Views، Fragment، Java، مهاجرت تدریجی.",
  },
  trackSpecialDesc: {
    en: "By product need: media, BLE, maps, NDK, Wear, AI…",
    fa: "بر اساس نیاز محصول: رسانه، BLE، نقشه، NDK، Wear، AI…",
  },
  note: {
    en: "Official direction: Android UI development is Compose-first (Google, 2026). Legacy skills stay — on a separate track. Progress is self-reported, not a certificate.",
    fa: "جهت رسمی: UI اندروید Compose-first است (گوگل، ۲۰۲۶). لگاسی در مسیر جدا می‌ماند. تکمیل‌شده خوداظهاری است، نه مدرک.",
  },
  viewMap: { en: "Map", fa: "نقشه" },
  viewList: { en: "List", fa: "فهرست" },
  searchPlaceholder: {
    en: "Search topics (EN / FA / aliases)…",
    fa: "جست‌وجوی موضوع (فارسی / انگلیسی)…",
  },
  expandAll: { en: "Expand all", fa: "بازکردن همه" },
  collapseAll: { en: "Collapse all", fa: "بستن همه" },
  continuePath: { en: "Continue my path", fa: "ادامه مسیر من" },
  markLearning: { en: "Learning", fa: "در حال یادگیری" },
  markDone: { en: "Complete stage", fa: "تکمیل مرحله" },
  markDoneTopic: { en: "Done", fa: "انجام شد" },
  markReview: { en: "Review later", fa: "بعداً مرور" },
  markReset: { en: "Reset stage", fa: "ریست مرحله" },
  stageStatus: { en: "Stage status", fa: "وضعیت مرحله" },
  topicStatus: { en: "Concept status", fa: "وضعیت مفهوم" },
  closePanel: { en: "Close", fa: "بستن" },
  progressLabel: { en: "Main path progress", fa: "پیشرفت مسیر اصلی" },
  remainingLabel: { en: "essential left", fa: "ضروری باقی‌مانده" },
  statusNone: { en: "Not started", fa: "شروع نشده" },
  statusLearning: { en: "Learning", fa: "در حال یادگیری" },
  statusDone: { en: "Done", fa: "تکمیل شده" },
  statusReview: { en: "Needs review", fa: "نیاز به مرور" },
  checklistHint: {
    en: "Check off concepts as you cover them. Progress % counts completed stages on the main path.",
    fa: "مفاهیم را تیک بزن. درصد پیشرفت فقط مرحله‌های تکمیل‌شدهٔ مسیر اصلی را می‌شمارد.",
  },
  topicsProgress: { en: "concepts checked", fa: "مفهوم تیک‌خورده" },
  startStage: { en: "Start this stage", fa: "شروع این مرحله" },
  legendTitle: { en: "Legend", fa: "راهنما" },
  legendMain: { en: "Solid — main path", fa: "پیوسته — مسیر اصلی" },
  legendAlt: { en: "Dashed — optional / alternative", fa: "خط‌چین — اختیاری / جایگزین" },
  legendLegacy: { en: "Legacy — maintain & migrate", fa: "نگهداری — کد موجود و مهاجرت" },
  emptyDetail: {
    en: "Open a stage to see the goal, checklist, practice, and pass criteria.",
    fa: "یک مرحله را باز کن تا هدف، چک‌لیست، تمرین و معیار عبور را ببینی.",
  },
  nextAction: { en: "Next step", fa: "قدم بعد" },
  filterAll: { en: "All", fa: "همه" },
  filterOpen: { en: "Not done", fa: "ناتمام" },
  filterDone: { en: "Done", fa: "تکمیل‌شده" },
  levelEssential: { en: "Essential", fa: "ضروری" },
  levelOptional: { en: "Optional", fa: "اختیاری" },
  topicFocus: { en: "Focus topic", fa: "موضوع تمرکز" },
  ctaTitle: {
    en: "Watch the walkthrough on YouTube",
    fa: "ویدیوی مرور مسیر در یوتیوب",
  },
  ctaBody: {
    en: "This page is the living reference. The video walks the main path stop by stop.",
    fa: "این صفحه مرجع زنده است. ویدیو مسیر اصلی را ایستگاه‌به‌ایستگاه می‌رود.",
  },
  ctaBtn: { en: "Watch on YouTube", fa: "تماشا در یوتیوب" },
  /** First deep-dive: Android Roadmap 2026 Compose-first */
  youtube: "https://youtu.be/zzy0Uoc39i4",
  youtubeEmbed: "https://www.youtube.com/embed/zzy0Uoc39i4",
  channel: "https://www.youtube.com/@esmaeeilmoradi-code",
  finalProjectTitle: {
    en: "Capstone: notes & tasks app",
    fa: "پروژهٔ نهایی: یادداشت و کارها",
  },
  finalProjectBody: {
    en: "Grow one product across the path: domain → Compose → ViewModel → Nav → Room → API → offline → DI → tests → security → perf → CI → release.",
    fa: "یک محصول را در طول مسیر رشد بده: دامنه → Compose → ViewModel → Nav → Room → API → آفلاین → DI → تست → امنیت → پرف → CI → انتشار.",
  },
};

const en = (s: string): T => ({ en: s, fa: s });
const tf = (enText: string, faText: string): T => ({ en: enText, fa: faText });

export const roadmapStages: RoadmapStage[] = [
  // —— MAIN PATH ——
  {
    id: "s0-basics-git",
    number: 0,
    track: "main",
    title: tf("Stage 0 — Programming basics & tooling", "مرحله ۰ — مبانی برنامه‌نویسی و ابزار"),
    subtitle: tf("Solve small problems before Android UI", "قبل از UI اندروید، مسئلهٔ کوچک حل کن"),
    prerequisite: tf("Curiosity and a computer. No Android experience required.", "کنجکاوی و یک کامپیوتر. تجربهٔ اندروید لازم نیست."),
    goal: tf(
      "Write small programs, read compiler errors, and manage changes with Git.",
      "برنامهٔ کوچک بنویسی، خطای کامپایل را بخوانی، و تغییرات را با Git مدیریت کنی.",
    ),
    concepts: [
      tf("Variables, conditionals, loops, functions", "متغیر، شرط، حلقه، تابع"),
      tf("List / Set / Map", "List / Set / Map"),
      tf("Basic OOP & composition", "OOP پایه و ترکیب اشیا"),
      tf("Error handling basics", "مبانی مدیریت خطا"),
      tf("Git: commit, branch, merge, PR", "Git: commit، branch، merge، PR"),
      tf("Android Studio, Emulator, Logcat (hello world)", "Android Studio، Emulator، Logcat"),
    ],
    tools: {
      recommended: [tf("Git", "Git"), tf("Android Studio", "Android Studio")],
      alternatives: [tf("Any JVM IDE for console practice", "هر IDE جاوا/کاتلین برای تمرین کنسول")],
    },
    exercise: tf(
      "Console expense tracker: add, categorize, search, sum totals — commit each feature.",
      "مدیر هزینهٔ کنسولی: ثبت، دسته‌بندی، جست‌وجو، جمع — هر فیچر یک commit.",
    ),
    passCriteria: tf(
      "You can solve a small problem without UI and manage it in Git.",
      "بتوانی مسئلهٔ کوچک را بدون UI حل کنی و در Git مدیریت کنی.",
    ),
  },
  {
    id: "s1-kotlin",
    number: 1,
    track: "main",
    title: tf("Stage 1 — Kotlin (main language)", "مرحله ۱ — Kotlin (زبان مسیر اصلی)"),
    subtitle: tf("Model real problems with types — not stringly code", "مسئله را با تایپ مدل کن — نه با رشته‌های پراکنده"),
    prerequisite: tf("Stage 0 complete.", "مرحله ۰ تمام شده باشد."),
    goal: tf(
      "Express domain states safely with Kotlin idioms.",
      "وضعیت‌های دامنه را با ایدیوم کاتلین ایمن بیان کنی.",
    ),
    concepts: [
      tf("Null safety", "Null safety"),
      tf("Functions, named/default args", "توابع، named/default"),
      tf("Class, interface, visibility", "کلاس، interface، visibility"),
      tf("Data / enum / sealed", "Data / enum / sealed"),
      tf("Collections: map, filter, groupBy", "Collection: map، filter، groupBy"),
      tf("Lambda & higher-order functions", "Lambda و higher-order"),
      tf("Extensions & practical generics", "Extension و generics کاربردی"),
      tf("Immutability vs mutable state", "Immutability در برابر state قابل تغییر"),
    ],
    tools: {
      recommended: [tf("Kotlin", "Kotlin")],
      alternatives: [tf("Java — legacy track only", "Java — فقط مسیر نگهداری")],
    },
    exercise: tf(
      "Model a shop: product, cart, discount, order status (sealed), final price — with unit tests for pricing.",
      "مدل فروشگاه: محصول، سبد، تخفیف، وضعیت سفارش (sealed)، قیمت نهایی — با تست قیمت‌گذاری.",
    ),
    passCriteria: tf(
      "Order status is a typed model — not scattered \"pending\" strings.",
      "وضعیت سفارش مدل تایپ‌شده باشد — نه رشتهٔ \"pending\" پراکنده.",
    ),
  },
  {
    id: "s2-platform",
    number: 2,
    track: "main",
    title: tf("Stage 2 — Essential Android platform", "مرحله ۲ — شناخت ضروری پلتفرم اندروید"),
    subtitle: tf("Conceptual platform knowledge — not AOSP depth yet", "دانش مفهومی پلتفرم — هنوز عمق AOSP نه"),
    prerequisite: tf("Comfortable Kotlin (Stage 1).", "کاتلین مرحله ۱ را بلدی."),
    goal: tf(
      "Explain how Android launches code and why process death matters for state.",
      "توضیح بدهی اندروید چطور کد را اجرا می‌کند و چرا مرگ پروسس برای state مهم است.",
    ),
    concepts: [
      tf("Project structure, Manifest, applicationId vs namespace", "ساختار پروژه، Manifest، applicationId در برابر namespace"),
      tf("Activity & lifecycle", "Activity و lifecycle"),
      tf("Context scope", "محدودهٔ Context"),
      tf("Intent, filters, deep link", "Intent، filter، deep link"),
      tf("Four components (overview)", "چهار مؤلفه (نمای کلی)"),
      tf("Resources, permissions, sandbox", "ریسورس، مجوز، sandbox"),
      tf("Main thread & ANR", "ترد اصلی و ANR"),
      tf("Config change vs process death", "تغییر کانفیگ در برابر مرگ پروسس"),
      tf("APK vs AAB; min/target/compile Sdk", "APK/AAB؛ min/target/compile Sdk"),
    ],
    tools: {
      recommended: [tf("Android SDK / Studio", "Android SDK / Studio")],
      alternatives: [tf("Deep HAL/JNI/NDK → specialization track", "عمق HAL/JNI/NDK → مسیر تخصصی")],
    },
    exercise: tf(
      "Small app: share via Intent, open via deep link, preserve a form across recreation.",
      "اپ کوچک: اشتراک با Intent، باز شدن با deep link، حفظ فرم هنگام recreate.",
    ),
    passCriteria: tf(
      "You can answer: why is an in-memory value not durable storage?",
      "بتوانی جواب بدهی: چرا مقدار در حافظه ذخیرهٔ دائمی نیست؟",
    ),
  },
  {
    id: "s3-compose",
    number: 3,
    track: "main",
    title: tf("Stage 3 — UI with Jetpack Compose", "مرحله ۳ — UI با Jetpack Compose"),
    subtitle: tf("Compose-first — not after mastering all of XML", "Compose-first — نه بعد از تسلط کامل بر XML"),
    prerequisite: tf("Stages 1–2. Know why process death exists.", "مراحل ۱–۲. بدانی مرگ پروسس چیست."),
    goal: tf(
      "Build testable, previewable UI with clear state ownership.",
      "UI قابل Preview/تست با مالکیت واضح state بسازی.",
    ),
    concepts: [
      tf("@Composable, Preview, layout primitives", "@Composable، Preview، Column/Row/Box"),
      tf("Modifier order", "ترتیب Modifier"),
      tf("LazyColumn", "LazyColumn"),
      tf("State, recomposition, remember, rememberSaveable", "State، recomposition، remember، rememberSaveable"),
      tf("State hoisting; stateless vs stateful", "State hoisting؛ stateless/stateful"),
      tf("Loading / Content / Empty / Error", "Loading / Content / Empty / Error"),
      tf("LaunchedEffect & side-effect discipline", "LaunchedEffect و انضباط side-effect"),
      tf("Material 3, a11y, RTL, adaptive basics", "Material 3، دسترس‌پذیری، RTL، تطبیقی"),
    ],
    tools: {
      recommended: [tf("Jetpack Compose", "Jetpack Compose"), tf("Material 3", "Material 3")],
      alternatives: [tf("XML/Views → legacy track", "XML/Views → مسیر نگهداری")],
    },
    exercise: tf(
      "Todo app: add/edit/filter, empty state, light/dark, two window sizes.",
      "اپ کارها: افزودن/ویرایش/فیلتر، empty، روشن/تاریک، دو اندازه پنجره.",
    ),
    passCriteria: tf(
      "A display composable takes data + callbacks only — previewable without network/DB/VM.",
      "Composable نمایشی فقط data+callback بگیرد — بدون شبکه/DB/VM قابل Preview باشد.",
    ),
  },
  {
    id: "s4-coroutines",
    number: 4,
    track: "main",
    title: tf("Stage 4 — Coroutines & Flow", "مرحله ۴ — Coroutines و Flow"),
    subtitle: tf("Before serious network/DB — async literacy", "قبل از شبکه/DB جدی — سواد async"),
    prerequisite: tf("Compose state basics (Stage 3).", "مبانی state در Compose (مرحله ۳)."),
    goal: tf(
      "Choose suspend vs Flow vs work that outlives the screen.",
      "بین suspend، Flow، و کار پایدار بعد از صفحه درست انتخاب کنی.",
    ),
    concepts: [
      tf("Concurrency vs parallelism", "هم‌زمانی در برابر موازی‌سازی"),
      tf("suspend, scope, structured concurrency", "suspend، scope، structured concurrency"),
      tf("launch / async, dispatchers", "launch / async، dispatcher"),
      tf("Cancellation, timeout, exceptions", "Cancellation، timeout، exception"),
      tf("Flow, StateFlow, SharedFlow", "Flow، StateFlow، SharedFlow"),
      tf("map, combine, debounce, flatMapLatest", "map، combine، debounce، flatMapLatest"),
      tf("Testing async code", "تست کد async"),
    ],
    tools: {
      recommended: [tf("Kotlin Coroutines", "Kotlin Coroutines"), tf("Flow", "Flow")],
      alternatives: [tf("RxJava → legacy reading", "RxJava → خواندن لگاسی")],
    },
    exercise: tf(
      "Search-as-you-type: debounce, cancel prior work, show Loading/Error.",
      "جست‌وجوی تایپی: debounce، لغو کار قبلی، نمایش Loading/Error.",
    ),
    passCriteria: tf(
      "You can name three needs: one-shot result, observing changes, work after leaving the screen.",
      "سه نیاز را نام ببری: یک نتیجه، مشاهدهٔ تغییرات، کار بعد از ترک صفحه.",
    ),
  },
  {
    id: "s5-architecture",
    number: 5,
    track: "main",
    title: tf("Stage 5 — Architecture, ViewModel, UDF", "مرحله ۵ — معماری، ViewModel، UDF"),
    subtitle: tf("Principles first — not MVVM/MVI/MVP as equal stations", "اول اصول — نه MVVM/MVI/MVP هم‌ارزش"),
    prerequisite: tf("Compose + Coroutines/Flow.", "Compose + Coroutines/Flow."),
    goal: tf(
      "Separate UI from data; drive screens with immutable UiState.",
      "UI را از data جدا کنی؛ صفحه را با UiState غیرقابل‌تغییر برانی.",
    ),
    concepts: [
      tf("Separation of concerns; single source of truth", "جداسازی مسئولیت؛ منبع حقیقت واحد"),
      tf("UI → actions → ViewModel → Repository → sources", "UI → action → ViewModel → Repository → منبع"),
      tf("Immutable UiState + StateFlow", "UiState غیرقابل‌تغییر + StateFlow"),
      tf("collectAsStateWithLifecycle", "collectAsStateWithLifecycle"),
      tf("SavedStateHandle when needed", "SavedStateHandle در صورت نیاز"),
      tf("Domain/use case only when complexity pays off", "Domain/use case فقط وقتی پیچیدگی می‌ارزد"),
    ],
    tools: {
      recommended: [tf("ViewModel", "ViewModel"), tf("StateFlow", "StateFlow"), tf("Repository pattern", "الگوی Repository")],
      alternatives: [tf("Pattern name comparisons → deep track", "مقایسهٔ نام الگوها → مسیر تعمیق")],
    },
    exercise: tf(
      "Refactor the todo app: composable renders + sends actions; VM owns state; repository supplies data.",
      "بازتراحی todo: Composable نمایش+action؛ VM مالک state؛ Repository داده.",
    ),
    passCriteria: tf(
      "ViewModel tests pass with a fake repository — no UI required.",
      "تست ViewModel با Repository جعلی پاس شود — بدون UI.",
    ),
  },
  {
    id: "s6-navigation",
    number: 6,
    track: "main",
    title: tf("Stage 6 — Navigation & back stack", "مرحله ۶ — Navigation و Back stack"),
    subtitle: tf("Routes, deep links, back behavior", "مسیر، deep link، رفتار برگشت"),
    prerequisite: tf("Screen-level ViewModel + UiState.", "ViewModel سطح صفحه + UiState."),
    goal: tf(
      "Move between screens without hauling huge objects or losing the back stack.",
      "بین صفحات جابه‌جا شوی بدون حمل اشیای بزرگ یا از دست دادن back stack.",
    ),
    concepts: [
      tf("Destinations & routes", "مقصد و route"),
      tf("Back stack", "Back stack"),
      tf("Pass IDs, not fat parcels", "ارسال شناسه، نه شیء چاق"),
      tf("Deep links", "Deep link"),
      tf("Auth/entry flows", "فلو ورود/خروج"),
      tf("Predictive back (awareness)", "Predictive back (آگاهی)"),
      tf("Testable nav: UI requests via callbacks", "Nav قابل تست: UI با callback درخواست بدهد"),
    ],
    tools: {
      recommended: [
        tf("Compose Navigation (verify current API in docs)", "Navigation Compose (API را در مستندات چک کن)"),
      ],
      alternatives: [
        tf("Fragment Navigation → legacy/migration track", "Navigation فرگمنت → مسیر نگهداری"),
        tf("Navigation 3 — track docs date when adopting", "Navigation 3 — هنگام پذیرش تاریخ مستند را ثبت کن"),
      ],
    },
    exercise: tf(
      "List → detail → edit; deep link into detail; correct back behavior.",
      "فهرست → جزئیات → ویرایش؛ deep link به جزئیات؛ برگشت درست.",
    ),
    passCriteria: tf(
      "Display screens don’t own the NavController; they emit navigation intents.",
      "صفحهٔ نمایشی NavController نداشته باشد؛ درخواست جابه‌جایی را اعلام کند.",
    ),
  },
  {
    id: "s7-network",
    number: 7,
    track: "main",
    title: tf("Stage 7 — Networking", "مرحله ۷ — شبکه"),
    subtitle: tf("One teaching stack + named alternatives", "یک استک آموزشی + جایگزین‌های نام‌برده"),
    prerequisite: tf("Repository + coroutines.", "Repository + coroutines."),
    goal: tf(
      "Speak the app↔server contract and map failures into UI-safe errors.",
      "قرارداد اپ↔سرور را بفهمی و شکست‌ها را به خطای امن برای UI نگاشت کنی.",
    ),
    concepts: [
      tf("HTTP(S), methods, status codes", "HTTP(S)، متد، status code"),
      tf("JSON, DTO, mapping", "JSON، DTO، mapping"),
      tf("Timeouts; error taxonomy", "Timeout؛ دسته‌بندی خطا"),
      tf("Pagination, cache, retry side-effects", "Pagination، cache، پیامد retry"),
      tf("Token/refresh awareness", "آگاهی Token/refresh"),
      tf("Logging without leaking secrets", "لاگ بدون افشای سکرت"),
    ],
    tools: {
      recommended: [tf("OkHttp + Retrofit + Kotlin Serialization (or Moshi)", "OkHttp + Retrofit + Serialization (یا Moshi)")],
      alternatives: [tf("Ktor Client", "Ktor Client"), tf("GraphQL → specialization", "GraphQL → تخصصی")],
    },
    exercise: tf(
      "List from API; simulate offline, 4xx/5xx, empty, slow, expired session.",
      "فهرست از API؛ شبیه‌سازی آفلاین، 4xx/5xx، خالی، کند، نشست منقضی.",
    ),
    passCriteria: tf(
      "UI shows meaningful errors; DTO/client details don’t leak into composables.",
      "UI خطای معنادار نشان دهد؛ جزئیات DTO/کلاینت به Composable نشت نکند.",
    ),
  },
  {
    id: "s8-offline",
    number: 8,
    track: "main",
    title: tf("Stage 8 — Storage & offline-first", "مرحله ۸ — ذخیره‌سازی و offline-first"),
    subtitle: tf("Local truth, sync rules, conflict thinking", "حقیقت محلی، قواعد sync، تفکر conflict"),
    prerequisite: tf("Network layer behind a repository.", "لایهٔ شبکه پشت Repository."),
    goal: tf(
      "Decide what wins when local and remote disagree.",
      "وقتی محلی و سرور اختلاف دارند، قاعدهٔ تصمیم را بدانی.",
    ),
    concepts: [
      tf("SQL enough to be dangerous (usefully)", "SQL به‌اندازهٔ کاربردی"),
      tf("Room: entity, DAO, relation, transaction, migration", "Room: entity، DAO، relation، transaction، migration"),
      tf("DataStore for prefs", "DataStore برای تنظیمات"),
      tf("Files when needed", "فایل در صورت نیاز"),
      tf("Source of truth & invalidation", "منبع حقیقت و invalidation"),
      tf("Sync, retry, conflict policy", "Sync، retry، سیاست conflict"),
    ],
    tools: {
      recommended: [tf("Room", "Room"), tf("DataStore", "DataStore")],
      alternatives: [tf("SharedPreferences — legacy only", "SharedPreferences — فقط لگاسی")],
    },
    exercise: tf(
      "Notes app: works offline, shows sync state, retries after failure.",
      "اپ یادداشت: آفلاین کار کند، وضعیت sync نشان دهد، بعد از شکست دوباره تلاش کند.",
    ),
    passCriteria: tf(
      "You can state the rule when local ≠ server.",
      "بتوانی قاعده را وقتی local ≠ server بگویی.",
    ),
  },
  {
    id: "s9-di",
    number: 9,
    track: "main",
    title: tf("Stage 9 — Dependency injection", "مرحله ۹ — تزریق وابستگی"),
    subtitle: tf("Constructor injection first; one framework deeply", "اول constructor injection؛ یک فریم‌ورک عمیق"),
    prerequisite: tf("Multi-layer app with repositories.", "اپ چندلایه با Repository."),
    goal: tf(
      "Replace a dependency in tests without rewriting the screen.",
      "وابستگی را در تست عوض کنی بدون بازنویسی صفحه.",
    ),
    concepts: [
      tf("What a dependency is", "وابستگی چیست"),
      tf("Constructor injection", "Constructor injection"),
      tf("Manual small graphs", "گراف دستی کوچک"),
      tf("Scope & lifetime", "Scope و lifetime"),
      tf("Test doubles / fakes", "جایگزین تست / fake"),
    ],
    tools: {
      recommended: [tf("Hilt (when the graph grows)", "Hilt (وقتی گراف بزرگ شد)"), tf("Manual DI for small apps", "DI دستی برای اپ کوچک")],
      alternatives: [tf("Koin", "Koin"), tf("Dagger concepts", "مفاهیم Dagger")],
    },
    exercise: tf(
      "Swap real repository for Fake in tests; screen logic unchanged.",
      "Repository واقعی را با Fake عوض کن؛ منطق صفحه ثابت بماند.",
    ),
    passCriteria: tf(
      "You can explain app-scoped vs screen-scoped dependencies.",
      "بتوانی وابستگی سطح اپ در برابر سطح صفحه را توضیح بدهی.",
    ),
  },
  {
    id: "s10-background",
    number: 10,
    track: "main",
    title: tf("Stage 10 — Background & system interaction", "مرحله ۱۰ — پس‌زمینه و تعامل سیستم"),
    subtitle: tf("Pick the tool for the job — not every async is WorkManager", "ابزار را با مسئله انتخاب کن — هر asyncای WorkManager نیست"),
    prerequisite: tf("DI + offline sync ideas.", "DI + ایدهٔ sync آفلاین."),
    goal: tf(
      "Justify WorkManager vs screen-scoped work vs foreground service.",
      "WorkManager در برابر کار وابسته به صفحه در برابر foreground service را توجیه کنی.",
    ),
    concepts: [
      tf("Screen-bound vs durable background work", "کار وابسته به صفحه در برابر کار پایدار"),
      tf("WorkManager constraints, retry, backoff", "WorkManager: constraint، retry، backoff"),
      tf("Foreground service limits", "محدودیت foreground service"),
      tf("Notifications & channels", "اعلان و channel"),
      tf("Permissions, pickers, app links", "مجوز، picker، app link"),
      tf("Battery / background limits awareness", "آگاهی محدودیت باتری/پس‌زمینه"),
    ],
    tools: {
      recommended: [tf("WorkManager", "WorkManager")],
      alternatives: [tf("Foreground Service when user-visible ongoing work", "Foreground Service برای کار دیده‌شدهٔ کاربر")],
    },
    exercise: tf(
      "Sync or upload that survives leaving the screen; handle offline + retry.",
      "Sync یا آپلودی که با ترک صفحه زنده بماند؛ آفلاین + retry.",
    ),
    passCriteria: tf(
      "Tool choice is justified by requirements, not habit.",
      "انتخاب ابزار با نیاز مسئله باشد، نه عادت.",
    ),
  },
  // —— DEEP (professional) ——
  {
    id: "d11-testing",
    number: 11,
    track: "deep",
    title: tf("Depth — Testing strategy", "تعمیق — استراتژی تست"),
    subtitle: tf("Present from Stage 1; deepen here", "از مرحله ۱ همراه باش؛ اینجا عمیق شو"),
    prerequisite: tf("A layered feature with VM + repository.", "فیچر لایه‌بندی‌شده با VM + Repository."),
    goal: tf(
      "Regressions get caught by a test — not by users.",
      "رگرسیون را تست بگیرد — نه کاربر.",
    ),
    concepts: [
      tf("Unit / integration / UI / E2E / performance layers", "لایه‌های unit تا performance"),
      tf("Prefer fakes over heavy mocks", "ترجیح fake بر mock سنگین"),
      tf("Test ViewModel, Flows, data boundaries, navigation", "تست VM، Flow، مرز داده، ناوبری"),
      tf("Coverage of critical behaviors > vanity %", "پوشش رفتار حیاتی > درصد نمایشی"),
    ],
    tools: {
      recommended: [
        tf("JUnit", "JUnit"),
        tf("Coroutines test", "تست Coroutines"),
        tf("Compose UI Test", "Compose UI Test"),
        tf("Room tests", "تست Room"),
      ],
      alternatives: [tf("Espresso for Views", "Espresso برای Views"), tf("Macrobenchmark", "Macrobenchmark")],
    },
    exercise: tf(
      "Add a test that fails if a past bug returns.",
      "تستی بنویس که اگر باگ قبلی برگردد fail شود.",
    ),
    passCriteria: tf(
      "A known past bug would be red in CI if reintroduced.",
      "باگ شناخته‌شده اگر برگردد در CI قرمز شود.",
    ),
  },
  {
    id: "d12-security",
    number: 12,
    track: "deep",
    title: tf("Depth — Security & privacy", "تعمیق — امنیت و حریم خصوصی"),
    subtitle: tf("A real track — not an appendix", "مسیر واقعی — نه پیوست انتهایی"),
    prerequisite: tf("Auth/network/storage in your app.", "احراز/شبکه/ذخیره در اپت."),
    goal: tf(
      "Threat-model sensitive data across UI, logs, files, network, backup.",
      "برای دادهٔ حساس در UI، لاگ، فایل، شبکه، بکاپ threat model بسازی.",
    ),
    concepts: [
      tf("Least privilege permissions", "حداقل مجوز"),
      tf("Input validation; exported components; deep link safety", "اعتبارسنجی ورودی؛ exported؛ ایمنی deep link"),
      tf("TLS; no secrets in clients", "TLS؛ سکرت در کلاینت نه"),
      tf("Session/token handling", "نشست/Token"),
      tf("Keystore boundaries", "مرز Keystore"),
      tf("Credential Manager / passkeys awareness", "آگاهی Credential Manager / passkey"),
    ],
    tools: {
      recommended: [tf("Credential Manager", "Credential Manager"), tf("Network security config", "Network security config")],
      alternatives: [tf("App-specific crypto only with clear threat model", "رمزنگاری اختصاصی فقط با threat model")],
    },
    exercise: tf(
      "One-page threat model: data, flows, storage, attackers, stolen device/token.",
      "threat model یک‌صفحه‌ای: داده، مسیر، ذخیره، مهاجم، دستگاه/Token دزدیده‌شده.",
    ),
    passCriteria: tf(
      "You can show how sensitive data is handled in UI, logs, files, network, backup.",
      "نشان بدهی دادهٔ حساس در UI، لاگ، فایل، شبکه، بکاپ چطور مدیریت می‌شود.",
    ),
  },
  {
    id: "d13-performance",
    number: 13,
    track: "deep",
    title: tf("Depth — Performance & UX quality", "تعمیق — عملکرد و کیفیت UX"),
    subtitle: tf("Measure → change → measure again", "اندازه بگیر → تغییر بده → دوباره اندازه بگیر"),
    prerequisite: tf("A real user journey in your app.", "یک مسیر پرتکرار کاربر در اپ."),
    goal: tf(
      "Back “it’s faster” with before/after evidence on a device.",
      "«سریع‌تر شد» را با شاهد قبل/بعد روی دستگاه ثابت کنی.",
    ),
    concepts: [
      tf("Startup, TTID/TTFD", "Startup، TTID/TTFD"),
      tf("Jank, main-thread, ANR", "Jank، ترد اصلی، ANR"),
      tf("Memory leaks, images/lists", "نشتی حافظه، تصویر/لیست"),
      tf("R8, Baseline/Startup profiles", "R8، Baseline/Startup profile"),
      tf("Macrobenchmark on real devices", "Macrobenchmark روی دستگاه واقعی"),
    ],
    tools: {
      recommended: [tf("Android Profiler", "Android Profiler"), tf("Macrobenchmark", "Macrobenchmark"), tf("Baseline Profiles", "Baseline Profiles")],
      alternatives: [tf("Emulator numbers — treat as suspect", "اعداد Emulator — مشکوک در نظر بگیر")],
    },
    exercise: tf(
      "Path: cold start → list → detail. Measure, fix one bottleneck, remeasure, record.",
      "مسیر: استارتاپ → فهرست → جزئیات. اندازه، یک گلوگاه، دوباره اندازه، ثبت.",
    ),
    passCriteria: tf(
      "A written before/after for one optimization.",
      "یک بهینه‌سازی با قبل/بعد مکتوب.",
    ),
  },
  {
    id: "d14-build-ci",
    number: 14,
    track: "deep",
    title: tf("Depth — Build, modules, CI/CD", "تعمیق — بیلد، ماژول، CI/CD"),
    subtitle: tf("Clean machines must build your app", "ماشین تمیز باید اپت را بسازد"),
    prerequisite: tf("Multi-feature codebase.", "کدبیس چندفیچری."),
    goal: tf(
      "PR pipeline: lint/static → unit → build → artifacts → internal distribute.",
      "پایپ‌لاین PR: lint → unit → build → artifact → توزیع داخلی.",
    ),
    concepts: [
      tf("Gradle KTS, version catalogs, flavors", "Gradle KTS، version catalog، flavor"),
      tf("Signing & environments", "Signing و محیط‌ها"),
      tf("Module boundaries; no cycles", "مرز ماژول؛ بدون دور"),
      tf("CI on a clean runner", "CI روی runner تمیز"),
    ],
    tools: {
      recommended: [tf("GitHub Actions", "GitHub Actions"), tf("Gradle Kotlin DSL", "Gradle Kotlin DSL")],
      alternatives: [tf("Bitrise / Jenkins", "Bitrise / Jenkins")],
    },
    exercise: tf(
      "Green PR check on a fresh CI agent with no local secrets required for tests.",
      "چک سبز PR روی CI تازه بدون نیاز به سکرت لوکال برای تست‌ها.",
    ),
    passCriteria: tf(
      "Clone + CI instructions alone produce a build.",
      "فقط با clone + دستور CI بیلد گرفته شود.",
    ),
  },
  {
    id: "d15-release",
    number: 15,
    track: "deep",
    title: tf("Depth — Release & maintenance", "تعمیق — انتشار و نگهداری"),
    subtitle: tf("Versioning, staged rollout, crash week-one", "نسخه‌بندی، انتشار تدریجی، هفتهٔ اول کرش"),
    prerequisite: tf("CI producing release candidates.", "CI که RC می‌سازد."),
    goal: tf(
      "Ship calmly and respond when production hurts.",
      "آرام منتشر کنی و وقتی پروداکشن درد گرفت واکنش بدهی.",
    ),
    concepts: [
      tf("Release signing & key protection", "امضا و حفاظت کلید"),
      tf("Versioning; internal/testing tracks", "نسخه‌بندی؛ مسیر داخلی/آزمایشی"),
      tf("Staged rollout", "انتشار تدریجی"),
      tf("Crash/ANR monitoring", "مانیتور کرش/ANR"),
      tf("OS compatibility checklist (keep dated appendix)", "چک‌لیست سازگاری OS (پیوست تاریخ‌دار)"),
      tf("16KB page size awareness for native", "آگاهی 16KB page size برای native"),
    ],
    tools: {
      recommended: [tf("Play Console / Cafe Bazaar", "Play Console / کافه‌بازار"), tf("Crashlytics (or equivalent)", "Crashlytics (یا معادل)")],
      alternatives: [tf("Other distributors by market", "توزیع‌کنندگان دیگر بر اساس بازار")],
    },
    exercise: tf(
      "Checklist + staged release plan + first-week monitoring notes.",
      "چک‌لیست + طرح انتشار تدریجی + یادداشت مانیتور هفتهٔ اول.",
    ),
    passCriteria: tf(
      "You have a dated “store requirements” appendix separate from the roadmap body.",
      "پیوست تاریخ‌دار «الزامات فروشگاه» جدا از بدنهٔ رودمپ داشته باشی.",
    ),
  },
  // —— LEGACY ——
  {
    id: "l-views",
    number: 1,
    track: "legacy",
    title: tf("Legacy — Views, XML, Fragments", "نگهداری — Views، XML، Fragment"),
    subtitle: tf("Not worthless — parallel to Compose-first", "بی‌ارزش نیست — موازی با Compose-first"),
    prerequisite: tf("Main path through Compose basics.", "مسیر اصلی تا مبانی Compose."),
    goal: tf(
      "Read and maintain View-based screens; migrate gradually.",
      "صفحه‌های View-based را بخوانی و نگه داری؛ تدریجی مهاجرت کنی.",
    ),
    concepts: [
      tf("XML layouts, ViewBinding", "XML، ViewBinding"),
      tf("RecyclerView", "RecyclerView"),
      tf("Fragment lifecycle & Fragment Navigation", "Lifecycle فرگمنت و Navigation فرگمنت"),
      tf("Interop: Compose in Views / Views in Compose", "هم‌زیستی Compose و Views"),
      tf("LiveData / Rx reading", "خواندن LiveData / Rx"),
      tf("Java interop reading", "خواندن Java interop"),
    ],
    tools: {
      recommended: [tf("ViewBinding", "ViewBinding"), tf("Fragment Navigation while fragments remain", "Navigation فرگمنت تا وقتی فرگمنت هست")],
      alternatives: [tf("DataBinding — understand, don’t start new", "DataBinding — بفهم، پروژهٔ جدید شروع نکن")],
    },
    exercise: tf(
      "Migrate one Fragment feature to Compose without rewriting the whole app; keep tests green.",
      "یک فیچر Fragment را بدون بازنویسی کل اپ به Compose ببر؛ تست‌ها سبز بمانند.",
    ),
    passCriteria: tf(
      "Old and new UI coexist; behavior preserved.",
      "UI قدیم و جدید هم‌زیست باشند؛ رفتار حفظ شود.",
    ),
  },
  // —— SPECIAL ——
  {
    id: "x-special",
    number: 1,
    track: "special",
    title: tf("Specializations (opt-in)", "تخصصی (انتخابی)"),
    subtitle: tf("Product-driven — not a rite of passage", "بر اساس محصول — نه آیین ورود به حرفه‌ای‌شدن"),
    prerequisite: tf("Solid main path through shipping a feature end-to-end.", "مسیر اصلی تا شیب یک فیچر end-to-end."),
    goal: tf(
      "Add leverage only when the product needs it.",
      "فقط وقتی محصول لازم دارد اهرم اضافه کنی.",
    ),
    concepts: [
      tf("Kotlin Multiplatform shared logic", "منطق مشترک KMP"),
      tf("NDK / JNI", "NDK / JNI"),
      tf("Camera / media pipelines", "دوربین / پایپ‌لاین رسانه"),
      tf("BLE / maps / location", "BLE / نقشه / مکان"),
      tf("Wear / TV / Automotive", "Wear / TV / Automotive"),
      tf("Widgets, billing, on-device AI features", "ویجت، پرداخت، فیچر AI روی دستگاه"),
    ],
    tools: {
      recommended: [tf("Pick from product requirements", "از نیاز محصول انتخاب کن")],
      alternatives: [tf("Firebase / ads / GraphQL — when the product asks", "Firebase / تبلیغ / GraphQL — وقتی محصول بخواهد")],
    },
    exercise: tf(
      "Write a one-pager: why this specialty is required for your product now.",
      "یک صفحه بنویس: چرا این تخصص الان برای محصولت لازم است.",
    ),
    passCriteria: tf(
      "You can defer a specialty without guilt when it’s not needed.",
      "بتوانی تخصص غیرضروری را بدون عذاب وجدان عقب بیندازی.",
    ),
  },
];

export const mainStages = roadmapStages.filter((s) => s.track === "main");
export const deepStages = roadmapStages.filter((s) => s.track === "deep");
export const legacyStages = roadmapStages.filter((s) => s.track === "legacy");
export const specialStages = roadmapStages.filter((s) => s.track === "special");
