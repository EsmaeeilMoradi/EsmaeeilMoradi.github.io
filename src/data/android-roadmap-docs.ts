import type { T } from "./site";

const tf = (en: string, fa: string): T => ({ en, fa });

/** Official docs linked from each roadmap stage (EN label + FA label + URL) */
export type RoadmapDoc = { label: T; url: string };

export const stageOfficialDocs: Record<string, RoadmapDoc[]> = {
  "s0-basics-git": [
    { label: tf("Kotlin basic syntax", "سینتکس پایه Kotlin"), url: "https://kotlinlang.org/docs/basic-syntax.html" },
    { label: tf("Git handbook (GitHub)", "راهنمای Git (GitHub)"), url: "https://guides.github.com/introduction/git-handbook/" },
    { label: tf("Install Android Studio", "نصب Android Studio"), url: "https://developer.android.com/studio/install" },
  ],
  "s1-kotlin": [
    { label: tf("Kotlin language docs", "مستندات زبان Kotlin"), url: "https://kotlinlang.org/docs/home.html" },
    { label: tf("Android Kotlin style", "استایل Kotlin اندروید"), url: "https://developer.android.com/kotlin/style-guide" },
    { label: tf("Android Basics with Compose", "Android Basics with Compose"), url: "https://developer.android.com/courses/android-basics-compose/course" },
  ],
  "s2-platform": [
    { label: tf("Application fundamentals", "مبانی اپلیکیشن"), url: "https://developer.android.com/guide/components/fundamentals" },
    { label: tf("Activity lifecycle", "چرخه حیات Activity"), url: "https://developer.android.com/guide/components/activities/activity-lifecycle" },
    { label: tf("Intents & intent filters", "Intent و Intent filter"), url: "https://developer.android.com/guide/components/intents-filters" },
  ],
  "s3-compose": [
    { label: tf("Compose documentation", "مستندات Compose"), url: "https://developer.android.com/develop/ui/compose/documentation" },
    { label: tf("Thinking in Compose", "Thinking in Compose"), url: "https://developer.android.com/jetpack/compose/mental-model" },
    { label: tf("Compose is first (2026)", "Compose-first (۲۰۲۶)"), url: "https://developer.android.com/blog/posts/android-ui-development-is-compose-first" },
    { label: tf("State in Compose", "State در Compose"), url: "https://developer.android.com/jetpack/compose/state" },
  ],
  "s4-coroutines": [
    { label: tf("Coroutines on Android", "Coroutines در اندروید"), url: "https://developer.android.com/kotlin/coroutines" },
    { label: tf("Coroutines best practices", "بهترین رویه‌های Coroutines"), url: "https://developer.android.com/kotlin/coroutines/coroutines-best-practices" },
    { label: tf("Kotlin Flow", "Kotlin Flow"), url: "https://developer.android.com/kotlin/flow" },
  ],
  "s5-architecture": [
    { label: tf("Guide to app architecture", "راهنمای معماری اپ"), url: "https://developer.android.com/topic/architecture" },
    { label: tf("Architecture recommendations", "توصیه‌های معماری"), url: "https://developer.android.com/topic/architecture/recommendations" },
    { label: tf("ViewModel overview", "نمای کلی ViewModel"), url: "https://developer.android.com/topic/libraries/architecture/viewmodel" },
  ],
  "s6-navigation": [
    { label: tf("Navigation", "Navigation"), url: "https://developer.android.com/guide/navigation" },
    { label: tf("Architecture recommendations", "توصیه‌های معماری"), url: "https://developer.android.com/topic/architecture/recommendations" },
    { label: tf("Compose navigation testing", "تست Navigation در Compose"), url: "https://developer.android.com/guide/navigation/testing/compose" },
  ],
  "s7-network": [
    { label: tf("Connect to the network", "اتصال به شبکه"), url: "https://developer.android.com/develop/connectivity/network-ops" },
    { label: tf("Security tips", "نکات امنیتی"), url: "https://developer.android.com/privacy-and-security/security-tips" },
  ],
  "s8-offline": [
    { label: tf("Room", "Room"), url: "https://developer.android.com/training/data-storage/room" },
    { label: tf("DataStore", "DataStore"), url: "https://developer.android.com/topic/libraries/architecture/datastore" },
    { label: tf("Offline-first guidance", "راهنمای offline-first"), url: "https://developer.android.com/topic/architecture/data-layer/offline-first" },
  ],
  "s9-di": [
    { label: tf("Dependency injection on Android", "تزریق وابستگی در اندروید"), url: "https://developer.android.com/training/dependency-injection" },
    { label: tf("Hilt", "Hilt"), url: "https://developer.android.com/training/dependency-injection/hilt-android" },
    { label: tf("Architecture recommendations", "توصیه‌های معماری"), url: "https://developer.android.com/topic/architecture/recommendations" },
  ],
  "s10-background": [
    { label: tf("Guide to background work", "راهنمای کار پس‌زمینه"), url: "https://developer.android.com/guide/background" },
    { label: tf("WorkManager", "WorkManager"), url: "https://developer.android.com/topic/libraries/architecture/workmanager" },
    { label: tf("Notifications", "اعلان‌ها"), url: "https://developer.android.com/develop/ui/views/notifications" },
  ],
  "d11-testing": [
    { label: tf("Test apps on Android", "تست اپ در اندروید"), url: "https://developer.android.com/training/testing" },
    { label: tf("Architecture recommendations (testing)", "توصیه‌های معماری — تست"), url: "https://developer.android.com/topic/architecture/recommendations" },
  ],
  "d12-security": [
    { label: tf("Security tips", "نکات امنیتی"), url: "https://developer.android.com/privacy-and-security/security-tips" },
    { label: tf("Credential Manager", "Credential Manager"), url: "https://developer.android.com/identity/sign-in/credential-manager" },
  ],
  "d13-performance": [
    { label: tf("App performance", "عملکرد اپ"), url: "https://developer.android.com/topic/performance" },
    { label: tf("Macrobenchmark", "Macrobenchmark"), url: "https://developer.android.com/topic/performance/benchmarking/macrobenchmark-overview" },
  ],
  "d14-build-ci": [
    { label: tf("Configure your build", "پیکربندی بیلد"), url: "https://developer.android.com/build" },
    { label: tf("Android Studio projects", "پروژه‌های Android Studio"), url: "https://developer.android.com/studio/projects/" },
  ],
  "d15-release": [
    { label: tf("Publish your app", "انتشار اپ"), url: "https://developer.android.com/distribute" },
    { label: tf("16 KB page sizes", "اندازه صفحه ۱۶KB"), url: "https://developer.android.com/guide/practices/page-sizes" },
  ],
  "l-views": [
    { label: tf("Compose migration strategy", "استراتژی مهاجرت به Compose"), url: "https://developer.android.com/develop/ui/compose/migrate/strategy" },
    { label: tf("View system", "سیستم View"), url: "https://developer.android.com/guide/topics/ui" },
  ],
  "x-special": [
    { label: tf("Kotlin Multiplatform", "Kotlin Multiplatform"), url: "https://www.jetbrains.com/help/kotlin-multiplatform-dev/get-started.html" },
    { label: tf("Android developers hub", "مرکز توسعه‌دهندگان اندروید"), url: "https://developer.android.com/" },
  ],
};
