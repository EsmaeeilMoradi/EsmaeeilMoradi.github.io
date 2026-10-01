export type Lang = "en" | "fa";
export type T = Record<Lang, string>;

export const links = {
  email: "esmaeeilmoradi700@gmail.com",
  linkedin: "https://www.linkedin.com/in/esmaeeil-moradi700/",
  github: "https://github.com/EsmaeeilMoradi",
  telegram: "https://t.me/esmaeeilmoradi",
  azma: "https://azmaapp.ir",
};

export const ui = {
  name: { en: "Esmaeeil Moradi", fa: "اسماعیل مرادی" },
  role: {
    en: "Senior Android & Kotlin Multiplatform Engineer",
    fa: "مهندس ارشد اندروید و Kotlin Multiplatform",
  },
  nav: {
    work: { en: "Work", fa: "نمونه‌کارها" },
    challenge: { en: "30-Day Challenge", fa: "چالش ۳۰ روزه" },
    about: { en: "About", fa: "درباره" },
    contact: { en: "Contact", fa: "تماس" },
    switchLang: { en: "فارسی", fa: "English" },
  },
  footer: {
    en: "Remote · Iran (UTC+3:30) · English & Persian",
    fa: "دورکاری، ایران (UTC+3:30)، فارسی و انگلیسی",
  },
} satisfies Record<string, unknown>;

export const hero = {
  title: {
    en: "I build mobile products end to end — from the first screen to the store.",
    fa: "محصول موبایل را از اولین صفحه تا انتشار در فروشگاه، کامل می‌سازم.",
  },
  lead: {
    en: "Ten years of Android, from AOSP internals to Jetpack Compose and Kotlin Multiplatform. I design the app, the backend behind it and the release pipeline — and I teach other engineers to do the same.",
    fa: "ده سال اندروید؛ از لایه‌های داخلی AOSP تا Jetpack Compose و Kotlin Multiplatform. اپ، بک‌اند پشت آن و مسیر انتشار را طراحی می‌کنم — و همین را به برنامه‌نویس‌های دیگر هم یاد می‌دهم.",
  },
  ctaPrimary: { en: "Start a project", fa: "شروع همکاری" },
  ctaSecondary: { en: "See my work", fa: "دیدن نمونه‌کارها" },
  facts: [
    { value: { en: "10 yrs", fa: "۱۰ سال" }, label: { en: "building Android apps", fa: "ساخت اپ اندروید" } },
    { value: { en: "Since 2020", fa: "از ۲۰۲۰" }, label: { en: "leading Android teams", fa: "رهبری تیم اندروید" } },
    { value: { en: "AOSP", fa: "AOSP" }, label: { en: "framework & system apps", fa: "فریم‌ورک و اپ‌های سیستمی" } },
    { value: { en: "30 days", fa: "۳۰ روز" }, label: { en: "free interview challenge", fa: "چالش رایگان مصاحبه" } },
  ],
};

export const offersIntro = {
  title: { en: "How I can help", fa: "چطور می‌توانم کمک کنم" },
  lead: {
    en: "Three focused services, each backed by work you can inspect.",
    fa: "سه خدمت مشخص، که پشت هر کدام کاری هست که می‌توانید ببینید.",
  },
  breadth: {
    en: "Also on request: Ktor backends, Telegram bots, AI integrations and AOSP customization.",
    fa: "در صورت نیاز: بک‌اند Ktor، بات تلگرام، یکپارچه‌سازی هوش مصنوعی و شخصی‌سازی AOSP.",
  },
};

export const offers = [
  {
    icon: "rocket",
    title: { en: "Mobile MVP, end to end", fa: "MVP موبایل، از صفر تا انتشار" },
    who: { en: "For startups and businesses", fa: "برای استارتاپ‌ها و کسب‌وکارها" },
    body: {
      en: "An Android or Kotlin Multiplatform app, the Ktor backend and admin panel behind it, and a store release — designed so it can grow after launch.",
      fa: "اپ اندروید یا Kotlin Multiplatform، بک‌اند Ktor و پنل ادمین پشت آن، و انتشار در فروشگاه — طوری طراحی‌شده که بعد از لانچ هم بتواند رشد کند.",
    },
    proof: { en: "Proof: Nabz", fa: "نمونه: نبض" },
    href: "/projects/nabz/",
  },
  {
    icon: "search",
    title: { en: "Android code & architecture audit", fa: "ممیزی کد و معماری اندروید" },
    who: { en: "For teams with a growing codebase", fa: "برای تیم‌هایی با کد رو به رشد" },
    body: {
      en: "Architecture and module boundaries, dead code and resources, build speed, test strategy — delivered as a prioritized, practical plan.",
      fa: "معماری و مرز ماژول‌ها، کد و ریسورس مرده، سرعت build و استراتژی تست — در قالب یک برنامهٔ عملی و اولویت‌بندی‌شده.",
    },
    proof: { en: "Proof: AndroidCodeCleaner", fa: "نمونه: AndroidCodeCleaner" },
    href: "/projects/#android-code-cleaner",
  },
  {
    icon: "mentor",
    title: { en: "Senior interview mentoring", fa: "منتورینگ مصاحبهٔ سینیور" },
    who: { en: "For Android engineers", fa: "برای برنامه‌نویس‌های اندروید" },
    body: {
      en: "Mock interviews, mobile system design and a study plan for mid, senior and lead roles — in English or Persian.",
      fa: "مصاحبهٔ آزمایشی، طراحی سیستم موبایل و برنامهٔ مطالعه برای نقش‌های مید، سینیور و لید — به فارسی یا انگلیسی.",
    },
    proof: { en: "Proof: the 30-Day Challenge", fa: "نمونه: چالش ۳۰ روزه" },
    href: "/challenge/",
  },
];

export const projects = [
  {
    id: "nabz",
    name: { en: "Nabz — patient-first health app", fa: "نبض — اپ سلامت بیمارمحور" },
    tag: { en: "Product · Kotlin Multiplatform · Ktor", fa: "محصول، Kotlin Multiplatform، Ktor" },
    summary: {
      en: "A calm companion for people going through lab tests: a test encyclopedia, preparation guides, a private results archive and medication reminders. I lead product and engineering — app, backend, admin panel and infrastructure.",
      fa: "همراهی آرام برای کسانی که آزمایش می‌دهند: دانشنامهٔ آزمایش‌ها، راهنمای آمادگی، آرشیو خصوصی نتایج و یادآور دارو. مسئول محصول و فنی‌ام — اپ، بک‌اند، پنل ادمین و زیرساخت.",
    },
    stack: ["Compose Multiplatform", "Koin", "Room KMP", "Ktor", "PostgreSQL", "FCM"],
    image: "/img/nabz/05-home.png",
    href: "/projects/nabz/",
    cta: { en: "Read the case study", fa: "خواندن case study" },
  },
  {
    id: "android-code-cleaner",
    name: { en: "AndroidCodeCleaner", fa: "AndroidCodeCleaner" },
    tag: { en: "Open source · Kotlin Script", fa: "متن‌باز، Kotlin Script" },
    summary: {
      en: "Kotlin Script tools that find unused resources and dead Kotlin/Java code. On the open-source Unstoppable Wallet they flagged 17 unused resources and 66 likely-unused declarations.",
      fa: "ابزارهای Kotlin Script برای پیدا کردن ریسورس‌های بلااستفاده و کد مردهٔ Kotlin/Java. روی پروژهٔ متن‌باز Unstoppable Wallet، ۱۷ ریسورس بلااستفاده و ۶۶ declaration احتمالاً بلااستفاده پیدا کردند.",
    },
    stack: ["Kotlin Script", "Static analysis", "CI"],
    href: "https://github.com/EsmaeeilMoradi/AndroidCodeCleaner",
    cta: { en: "View on GitHub", fa: "دیدن در گیت‌هاب" },
  },
  {
    id: "esm-wallet",
    name: { en: "ESM Wallet", fa: "ESM Wallet" },
    tag: { en: "Open source · Jetpack Compose · Web3", fa: "متن‌باز، Jetpack Compose، Web3" },
    summary: {
      en: "A non-custodial Ethereum wallet. BIP-32/44 key derivation is implemented by hand with Bouncy Castle; private keys are encrypted with keys held in the Android Keystore.",
      fa: "یک کیف پول غیرامانی اتریوم. مشتق‌سازی کلید BIP-32/44 به‌صورت دستی با Bouncy Castle پیاده شده و کلیدهای خصوصی با کلیدی در Android Keystore رمز می‌شوند.",
    },
    stack: ["Compose", "Clean Architecture", "Web3j", "Bouncy Castle", "Room"],
    href: "https://github.com/EsmaeeilMoradi/ESM-Wallet",
    cta: { en: "View on GitHub", fa: "دیدن در گیت‌هاب" },
  },
  {
    id: "aosp",
    name: { en: "AOSP system apps", fa: "اپ‌های سیستمی AOSP" },
    tag: { en: "Android framework · System apps", fa: "فریم‌ورک اندروید، اپ‌های سیستمی" },
    summary: {
      en: "Standalone Gradle builds that take AOSP system apps out of the platform tree so they can be built, debugged and studied in Android Studio — plus samples built on Settings search and custom ROM builds. The platform knowledge behind my app work.",
      fa: "buildهای Gradle مستقل که اپ‌های سیستمی AOSP را از درخت پلتفرم جدا می‌کنند تا داخل Android Studio بشود build، دیباگ و بررسی‌شان کرد — به‌علاوهٔ نمونه‌هایی روی جست‌وجوی Settings و build کردن ROM سفارشی. دانش پلتفرمی که پشت کار اپ‌هایم است.",
    },
    stack: ["AOSP", "System apps", "Gradle", "Linux"],
    repos: [
      { name: "Settings", href: "https://github.com/EsmaeeilMoradi/platform_packages_apps_Settings" },
      { name: "SettingsIntelligence", href: "https://github.com/EsmaeeilMoradi/platform_packages_apps_SettingsIntelligence" },
      { name: "Launcher3", href: "https://github.com/EsmaeeilMoradi/platform_packages_apps_launcher3" },
      { name: "Dialer", href: "https://github.com/EsmaeeilMoradi/platform_packages_apps_Dialer" },
      { name: "Messaging", href: "https://github.com/EsmaeeilMoradi/AOSP_Messaging" },
      { name: "Messaging (Android 12)", href: "https://github.com/EsmaeeilMoradi/AOSP_Messaging_android-12.0.0_r21" },
      { name: "Contacts", href: "https://github.com/EsmaeeilMoradi/AOSP_Contacts" },
      { name: "Gallery3D", href: "https://github.com/EsmaeeilMoradi/-android_packages_apps_Gallery3D" },
      { name: "AppSearchSample", href: "https://github.com/EsmaeeilMoradi/AppSearchSample" },
      { name: "SettingsIntelligenceSample", href: "https://github.com/EsmaeeilMoradi/SettingsIntelligenceSample" },
    ],
    href: "https://github.com/EsmaeeilMoradi?tab=repositories",
    cta: { en: "All repositories", fa: "همهٔ ریپوها" },
  },
];

export const experience = [
  {
    years: { en: "2024 — now", fa: "۲۰۲۴ — اکنون" },
    role: { en: "CTO, Azma — building Nabz", fa: "CTO آزما — ساخت نبض" },
    note: {
      en: "Product, Kotlin Multiplatform app, Ktor backend, infrastructure.",
      fa: "محصول، اپ Kotlin Multiplatform، بک‌اند Ktor و زیرساخت.",
    },
  },
  {
    years: { en: "2024 — now", fa: "۲۰۲۴ — اکنون" },
    role: { en: "Independent Android Consultant", fa: "مشاور مستقل اندروید" },
    note: {
      en: "Architecture, delivery and code audits for client Android apps.",
      fa: "معماری، توسعه و ممیزی کد اپ‌های اندروید برای مشتری‌ها.",
    },
  },
  {
    years: { en: "2021 — 2024", fa: "۲۰۲۱ — ۲۰۲۴" },
    role: { en: "Android Technical Team Lead, Daria", fa: "لید فنی تیم اندروید، داریا" },
    note: {
      en: "Led the team behind the pre-installed system apps on Daria smartphones — Calendar, Camera, Clock, Contacts, Files, Messages, Recorder.",
      fa: "رهبری تیم اپ‌های سیستمی پیش‌نصب گوشی‌های داریا — تقویم، دوربین، ساعت، مخاطبین، فایل، پیام‌ها و ضبط صدا.",
    },
  },
  {
    years: { en: "2020 — 2021", fa: "۲۰۲۰ — ۲۰۲۱" },
    role: { en: "Android Developer → Team Lead, BATNA", fa: "برنامه‌نویس اندروید ← لید تیم، باتنا" },
    note: {
      en: "Custom AOSP ROMs and Google-free devices with microG; upstream contributions to F-Droid and Matrix.",
      fa: "ROM سفارشی AOSP و دستگاه بدون سرویس‌های گوگل با microG؛ مشارکت در F-Droid و Matrix.",
    },
  },
  {
    years: { en: "2019 — 2020", fa: "۲۰۱۹ — ۲۰۲۰" },
    role: { en: "Android Developer, Atrin Group", fa: "برنامه‌نویس اندروید، گروه آترین" },
    note: {
      en: "Three internal apps end to end: team management, trading and inventory, and financial analytics.",
      fa: "سه اپ داخلی از صفر تا انتشار: مدیریت تیم، معاملات و انبار، و تحلیل مالی.",
    },
  },
  {
    years: { en: "2018 — 2019", fa: "۲۰۱۸ — ۲۰۱۹" },
    role: { en: "Android Developer & Linux Administrator, PIDO", fa: "برنامه‌نویس اندروید و مدیر لینوکس، پیدو" },
    note: { en: "", fa: "" },
  },
  {
    years: { en: "2016 — 2018", fa: "۲۰۱۶ — ۲۰۱۸" },
    role: { en: "Freelance Android Developer", fa: "برنامه‌نویس فریلنس اندروید" },
    note: { en: "", fa: "" },
  },
];

export const about = {
  title: { en: "About me", fa: "دربارهٔ من" },
  body: {
    en: [
      "I studied civil engineering, then taught myself programming and moved into Android in 2016. Since then I've shipped apps for companies, led Android teams, and gone deep into the platform itself — AOSP, system apps and custom ROMs.",
      "Today I build Nabz, a health product for people going through medical tests, and I publish a free 30-day Android interview challenge on LinkedIn. I care about products that make people feel safe and calm, and about code a team can still change two years later.",
    ],
    fa: [
      "مهندسی عمران خواندم، بعد برنامه‌نویسی را خودم یاد گرفتم و از ۲۰۱۶ وارد اندروید شدم. از آن موقع برای شرکت‌ها اپ ساخته‌ام، تیم اندروید را رهبری کرده‌ام و تا عمق خود پلتفرم رفته‌ام — AOSP، اپ‌های سیستمی و ROM سفارشی.",
      "الان نبض را می‌سازم، محصولی سلامت برای کسانی که آزمایش و درمان را طی می‌کنند، و یک چالش رایگان ۳۰ روزهٔ مصاحبهٔ اندروید را در لینکدین منتشر می‌کنم. برایم مهم است محصول به آدم‌ها حس امنیت و آرامش بدهد، و کدی بنویسم که تیم دو سال بعد هم بتواند تغییرش دهد.",
    ],
  },
  highlightsTitle: { en: "Selected achievements", fa: "دستاوردهای منتخب" },
  highlights: [
    {
      en: "Led an AOSP build-system migration from Make to Gradle, improving developer productivity by 20%.",
      fa: "مهاجرت سیستم build در AOSP از Make به Gradle را رهبری کردم و بهره‌وری توسعه‌دهنده‌ها ۲۰٪ بهتر شد.",
    },
    {
      en: "Architected and delivered Clean Architecture / MVVM apps from scratch, cutting initial load time by 30%.",
      fa: "اپ‌هایی با Clean Architecture و MVVM را از صفر طراحی و تحویل دادم و زمان بارگذاری اولیه ۳۰٪ کم شد.",
    },
    {
      en: "Customized and optimized core AOSP system apps — Camera, Messaging, Contacts — for embedded devices.",
      fa: "اپ‌های سیستمی اصلی AOSP مثل Camera، Messaging و Contacts را برای دستگاه‌های embedded شخصی‌سازی و بهینه کردم.",
    },
    {
      en: "Built a non-custodial Web3 wallet with hand-written key derivation and Keystore-backed encryption.",
      fa: "یک کیف پول غیرامانی Web3 ساختم، با مشتق‌سازی کلید دست‌نویس و رمزنگاری متکی به Keystore.",
    },
    {
      en: "Led and mentored Android teams since 2020, setting clean, testable coding practices.",
      fa: "از ۲۰۲۰ تیم‌های اندروید را رهبری و منتورینگ کرده‌ام و روش‌های کدنویسی تمیز و تست‌پذیر را جا انداخته‌ام.",
    },
  ],
};

export const contact = {
  title: { en: "Let's work together", fa: "بیایید با هم کار کنیم" },
  lead: {
    en: "Tell me what you're building or where you're stuck. I reply within two working days.",
    fa: "بگویید چه می‌سازید یا کجا گیر کرده‌اید. ظرف دو روز کاری جواب می‌دهم.",
  },
  emailCta: { en: "Email me", fa: "ایمیل بزنید" },
};

export const t = (v: T, lang: Lang) => v[lang];
export const href = (path: string, lang: Lang) => (lang === "fa" ? `/fa${path}` : path);
