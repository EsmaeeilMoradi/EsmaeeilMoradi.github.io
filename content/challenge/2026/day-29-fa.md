@cover
# چالش ۳۰ روزهٔ اندروید

آمادگی مصاحبهٔ اندروید — جونیور ← مید ← سینیور ← آرکیتکت

<span class="edition">نسخهٔ ۲۰۲۶</span>

<div class="spacer"></div>

<p class="day">روز ۲۹</p>

## مقیاس‌پذیری و انتشار جهانی — i18n، RTL، دسترس‌پذیری، feature flag، rollout و انطباق با قوانین

---

## چرا انتشار جهانی در ۲۰۲۶ مهم است؟

انتشار به یک زبان در یک کشور، یک محصول است. انتشار برای کل دنیا یک **دیسیپلین مهندسی** است: هر رشته، layout، فرمت عدد، flag، rollout و جریان داده باید برای آدم‌هایی کار کند که دستگاه، شبکه و قوانینشان با شما فرق دارد.

- **زبان‌ها و خط‌ها:** plural، فرمت‌ها و layoutهای RTL کد هستند، نه فقط ترجمه
- **دسترس‌پذیری در مقیاس بزرگ:** در design system و CI ساخته می‌شود — و در اتحادیهٔ اروپا برای بسیاری از اپ‌ها الزام قانونی است
- **جدا کردن deploy از release:** با feature flag، آزمایش A/B و staged rollout برای هر کشور
- **سیاست‌ها و حریم خصوصی:** سطح targetSdk مورد نیاز Play هر سال بالاتر می‌رود؛ قوانینی مثل GDPR تعیین می‌کنند چه چیزی را اجازه دارید جمع کنید
- **بازارهای نوظهور:** دانلود کم‌حجم، مصرف دادهٔ کم، offline-first

| سطح | سؤال‌ها |
|---|---|
| جونیور | تفاوت i18n و l10n، layoutهای RTL، plural و فرمت‌ها |
| مید | زبان جداگانه برای هر اپ، دسترس‌پذیری در مقیاس بزرگ، feature flagها، آزمایش‌ها |
| سینیور | انتشار مرحله‌ای و منطقه‌ای، سیاست‌های Play، حریم خصوصی و GDPR |
| آرکیتکت | بازارهای نوظهور، چندمنطقه‌ای و version skew، پلتفرم آمادهٔ جهانی |

---

## مدل ذهنی: یک binary، سه محور

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

- **locale** تعیین می‌کند چه کلمه‌ای، چه جهتی، چه pluralی و چه فرمتی — سیستم resource اندروید در زمان اجرا انتخابش می‌کند
- **region** تعیین می‌کند چه چیزی قانونی است و چه چیزی روشن است — کانفیگ سرور، flagها و هدف‌گیری کشور در Play Console
- **device** تعیین می‌کند از پس چه چیزی برمی‌آیید — حجم، حافظه، هزینهٔ داده (روز ۲۸)

:::tip به‌طور پیش‌فرض آمادهٔ جهانی
اگر design system مسئول RTL، مقیاس فونت و دسترس‌پذیری باشد، هر فیچر جدید مجانی آمادهٔ جهانی است. اگر هر تیم جداگانه مسئولش باشد، بیشترشان انجامش نمی‌دهند.
:::

---

@section Junior
## جونیور

تفاوت i18n و l10n، layoutهای RTL، plural و فرمت‌ها

---

@level Junior
## سؤال ۱. تفاوت i18n و l10n — resourceها را درست بچینید

- **i18n (بین‌المللی‌سازی):** مهندسی اپ طوری که *بتواند* تطبیق پیدا کند — بدون متن hard-code، فرمت‌دهی وابسته به locale، layoutهایی که بزرگ و آینه‌ای می‌شوند
- **l10n (بومی‌سازی):** خودِ تطبیق — ترجمه، تصویر، فرمت و متن حقوقی برای هر locale

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

- از اندروید ۷٫۰ کاربر می‌تواند چند زبان را فهرست کند و اندروید قبل از رفتن سراغ پیش‌فرض، نزدیک‌ترین تطابق را انتخاب می‌کند؛ مثلاً کاربر اسپانیایی مکزیک `values-es` را می‌گیرد

---

## سؤال ۱. چیزهایی که مصاحبه‌گر چک می‌کند

:::trap تلهٔ مصاحبه
*«جمله را در کد بسازید: `"Hello " + name`.»* — ترتیب کلمات در زبان‌ها فرق دارد. از یک رشته با **placeholderهای موقعیتی** مثل `%1$s` و `%2$d` استفاده کنید تا مترجم بتواند جایشان را عوض کند.
:::

:::trap تلهٔ مصاحبه
*«پوشهٔ `drawable-fr` تصویر مخصوص فرانسه را نگه می‌دارد.»* (مثال نسخهٔ پارسال) — `fr` یک qualifier **زبان** است: فرانسوی در کانادا، بلژیک، سنگال… برای منطقه از `fr-rFR` یا شکل BCP 47 یعنی `b+fr+FR` استفاده کنید. زبان همان کشور نیست.
:::

:::followup سؤال تکمیلی
*«اگر رشته‌ای در `values-es` باشد ولی در `values/` پیش‌فرض نباشد چه می‌شود؟»* — کاربرانی که locale آن‌ها پوشهٔ متناظر ندارد به `Resources.NotFoundException` می‌خورند — یعنی crash. Lint آن را با `ExtraTranslation` علامت می‌زند؛ ترجمه‌های جاافتاده هم با `MissingTranslation` دیده می‌شوند.
:::

---

## سؤال ۲. layoutهای RTL، به روش درست

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

- در manifest مقدار `android:supportsRtl="true"`؛ در Viewها از `start` و `end` استفاده کنید، هرگز `left` و `right`
- Compose بر اساس `LocalLayoutDirection` layout را خودکار آینه‌ای می‌کند؛ padding با `start` و `end` نسبی است
- آیکون‌های جهت‌دار: در Compose از `Icons.AutoMirrored.*` و در vector drawableها از `android:autoMirrored="true"` استفاده کنید

---

## سؤال ۲. چه چیزی را آینه‌ای نکنیم — و متن مخلوط

| آینه‌ای شود | آینه‌ای نشود |
|---|---|
| فلش‌های عقب و جلو، chevronها | کنترل‌های پخش رسانه و نوار پیشرفت رسانه |
| ترتیب layout، تراز متن | ساعت، شماره تلفن، کد |
| سمت navigation drawer | لوگو و نشان‌های برند |

```kotlin
// User text inside a translated sentence
val bidi = BidiFormatter.getInstance()
val msg = getString(
    R.string.sent_to, bidi.unicodeWrap(userName),
)
```

:::trap تلهٔ مصاحبه
*«`supportsRtl` کافی است.»* — فقط attributeهای نسبی آینه‌ای می‌شوند. `marginLeft`، `Gravity.LEFT`، padding مطلق و فلش‌هایی که دستی کشیده شده‌اند سر جایشان می‌مانند. جهت **متن** هم از محتوا می‌آید: یک نام کاربری لاتین داخل یک جملهٔ فارسی باید ایزوله شود، وگرنه علامت‌گذاری سمت اشتباه می‌افتد.
:::

- با گزینهٔ **Force RTL layout direction** در Developer options و pseudolocaleهای `ar-XB` (آینه‌ای) و `en-XA` (با حروف تزئینی و طولانی‌تر) تست کنید

---

## سؤال ۳. plural از قواعد زبان پیروی می‌کند، نه انگلیسی

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

- اندروید دسته را با **قواعد plural در CLDR** انتخاب می‌کند: انگلیسی `one` و `other` دارد؛ لهستانی `few` و `many` را هم اضافه می‌کند؛ عربی هر شش دسته را دارد: `zero`، `one`، `two`، `few`، `many` و `other`
- پارامتر دوم `count`، جای `%d` را پر می‌کند

:::trap تلهٔ مصاحبه
*«برای «No items» در انگلیسی از `quantity="zero"` استفاده کنید.»* — انگلیسی هیچ‌وقت `zero` را انتخاب نمی‌کند؛ عدد ۰ به `other` می‌رود. برای حالت خالی، در کد `count == 0` را چک کنید و از یک رشتهٔ جدا استفاده کنید.
:::

---

## سؤال ۳. عدد، تاریخ و پول

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

:::trap تلهٔ مصاحبه
*«برای مسیر API از `String.format("%d", id)` استفاده کنید.»* — از locale پیش‌فرض استفاده می‌کند: روی locale فارسی و بعضی localeهای عربی رقم‌ها به شکل ۱۲۳ یا ١٢٣ درمی‌آیند و درخواست خراب می‌شود. هر چیزی که **ماشین** می‌خواند باید از `Locale.ROOT` استفاده کند.
:::

:::trap تلهٔ مصاحبه
*«واحد پول را از locale دستگاه بگیرید.»* — یک مسافر آلمانی در ژاپن هنوز با یورو پرداخت می‌کند. واحد پول مال **داده** است؛ locale فقط تعیین می‌کند چطور نمایش داده شود. تقویم‌های غیرمیلادی مثل شمسی و قمری را ICU فراهم می‌کند (`android.icu`).
:::

---

@section Mid
## مید

زبان جداگانه برای هر اپ، دسترس‌پذیری در مقیاس بزرگ، feature flagها، آزمایش‌ها

---

@level Mid
## سؤال ۴. تنظیم زبان جداگانه برای هر اپ

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

- اندروید ۱۳ (API 33) در تنظیمات سیستم امکان انتخاب زبان برای هر اپ را اضافه کرد؛ اپ زبان‌هایش را با `android:localeConfig` اعلام می‌کند که کد بالا آن را می‌سازد، همراه با `unqualifiedResLocale` در `res/resources.properties`
- معادل در framework: ویژگی `LocaleManager.applicationLocales` (از API 33)

---

## سؤال ۴. تله‌ها

:::trap تلهٔ مصاحبه
*«در `attachBaseContext` مقدار `Configuration.locale` را override کنید.»* — ترفند قدیمی: APIهای منسوخ، در بعضی صفحه‌ها از دست می‌رود (یک WebView می‌تواند ریستش کند)، و تنظیم سیستم از آن خبر ندارد. از API زبان جداگانهٔ هر اپ استفاده کنید.
:::

:::trap تلهٔ مصاحبه
*«انتخابگر زبان کار می‌کند، اما زبان جدید انگلیسی نشان داده می‌شود.»* — با App Bundle، Play فقط language splitهای مربوط به زبان‌های دستگاه را نصب می‌کند. زبانی که داخل اپ انتخاب شده ممکن است روی دستگاه نباشد: یا language split را غیرفعال کنید (`bundle { language { enableSplit = false } }`) یا آن زبان را با SplitInstall API در Play دانلود کنید.
:::

:::followup سؤال تکمیلی
*«زیر API 33 انتخاب کاربر کجا ذخیره می‌شود؟»* — AppCompat می‌تواند برایتان ذخیره‌اش کند: `AppLocalesMetadataHolderService` را با `autoStoreLocales` برابر `true` در manifest تعریف کنید. در API 33 به بالا خود سیستم ذخیره‌اش می‌کند.
:::

---

## سؤال ۵. دسترس‌پذیری در مقیاس بزرگ: خودِ کامپوننت

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

- **semantics:** برچسب معنادار، `null` برای تصویرهای تزئینی، و `Modifier.semantics { heading() }` برای عنوان بخش‌ها
- **touch target** دست‌کم ۴۸ در ۴۸ dp؛ **متن با `sp`** و بدون ارتفاع ثابت — اندروید ۱۴ فونت را تا ۲۰۰ درصد بزرگ می‌کند؛ **کنتراست** ۴٫۵ به ۱ برای متن معمولی طبق WCAG AA

---

## سؤال ۵. مقیاس دادن بین تیم‌ها

| لایه | سازوکار |
|---|---|
| design system | کامپوننت‌های دسترس‌پذیر به‌طور پیش‌فرض: semantics، touch target، توکن‌های کنتراست |
| CI | چک‌های Lint، کلاس `AccessibilityChecks` در Espresso، Accessibility Test Framework در تست‌های Compose، اسکرین‌شات با فونت ۲۰۰ درصد |
| انتشار | پیشنهادهای دسترس‌پذیری در pre-launch report در Play |
| آدم‌ها | بررسی منظم با TalkBack و Switch Access؛ دسترس‌پذیری در Definition of Done |

:::new European Accessibility Act
از ۲۸ ژوئن ۲۰۲۵، بسیاری از محصولات و خدمات مصرفی در اتحادیهٔ اروپا — تجارت الکترونیک، بانکداری، حمل‌ونقل، کتاب الکترونیک — باید الزامات دسترس‌پذیری را رعایت کنند، از جمله اپ‌ها.
:::

:::trap تلهٔ مصاحبه
*«چک‌های خودکار پاس شدند، پس دسترس‌پذیر هستیم.»* — ابزارها برچسب جاافتاده و target کوچک را می‌گیرند، نه ترتیب focus گیج‌کننده یا مسیری که با TalkBack نمی‌شود تمامش کرد. تست دستی با فناوری‌های کمکی لازم است.
:::

---

## سؤال ۶. feature flag: تایپ‌دار، امن، ثابت

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

- **انواع:** release toggle (کوتاه‌عمر)، flag آزمایش، kill switch عملیاتی (بلندعمر)، entitlement
- **پیش‌فرض امن داخل کد.** مقدارهای cache‌شده را در startup فعال کنید و برای session بعدی fetch کنید — هیچ‌وقت اولین فریم را معطل شبکه نکنید (روز ۱)
- در Firebase Remote Config، فاصلهٔ پیش‌فرض بین fetchها ۱۲ ساعت است؛ به‌روزرسانی real-time هم با `addOnConfigUpdateListener` وجود دارد

---

## سؤال ۶. تله‌های flag

:::trap تلهٔ مصاحبه
*«flagها مجانی‌اند.»* — هر flag یک مسیر کد را برای تست دو برابر می‌کند. برای هر کدام **مالک و تاریخ انقضا** بگذارید و بعد از rollout کامل حذفش کنید؛ flagهای کهنه جایی‌اند که کد مرده و باگ‌های «غیرممکن» زندگی می‌کنند.
:::

:::trap تلهٔ مصاحبه
*«flag را همه‌جا زنده بخوانید.»* — مقدارها ممکن است وسط session عوض شوند؛ صفحهٔ پرداختی که وسط کار UI را عوض کند باگ است. برای هر session یا هر flow یک snapshot بگیرید و لاگ کنید کدام مقدارها فعال بودند.
:::

:::followup سؤال تکمیلی
*«flag را سمت کلاینت ارزیابی کنیم یا سرور؟»* — سمت سرور وقتی قاعده حساس است (قیمت‌گذاری، entitlement) یا منطق هدف‌گیری‌ای دارد که نمی‌خواهید در APK باشد. سمت کلاینت برای toggleهای UI و kill switchهایی که باید آفلاین هم کار کنند. هر چیزی داخل APK باشد، کاربر مصمم می‌تواند بخواندش و عوضش کند.
:::

---

## سؤال ۷. آزمایش A/B بدون فریب دادن خودتان

- **فرضیه به‌علاوهٔ یک متریک اصلی**، که قبل از شروع تعیین شده باشد (مثلاً نرخ تبدیل پرداخت)
- **متریک‌های guardrail:** نرخ crash، نرخ ANR، زمان startup، حذف نصب — بردن در conversion و باختن در پایداری یعنی باخت
- **تصادفی‌سازی بر اساس کاربر یا نصب**، نه session، و ثابت نگه داشتن تخصیص
- **حجم نمونه از قبل**، بر اساس کوچک‌ترین اثری که برایتان مهم است؛ هفته‌های کامل اجرا کنید تا چرخه‌های هفتگی پوشش داده شوند
- **exposure را در نقطهٔ استفاده لاگ کنید** — وقتی variant واقعاً نمایش داده می‌شود — نه در لحظهٔ تخصیص

:::trap تلهٔ مصاحبه
*«آزمایش را روز سوم متوقف کردیم — معنادار شد.»* — چک کردن مکرر و توقف در اولین نتیجهٔ معنادار، نرخ مثبت کاذب را بالا می‌برد. مدت را از قبل ثابت کنید، یا از روش sequential که برای نگاه‌های مکرر طراحی شده استفاده کنید.
:::

---

## سؤال ۷. دام‌های آزمایش

| دام | چه چیزی خراب می‌شود | راه‌حل |
|---|---|---|
| نگاه زودهنگام (peeking) | توقف زودهنگام در p < 0.05 مثبت کاذب را زیاد می‌کند | افق ثابت یا تست sequential |
| عدم تطابق نسبت نمونه (SRM) | تقسیم ۵۰/۵۰ به شکل ۵۲/۴۸ درمی‌آید: تخصیص یا لاگ خراب است | قبل از خواندن نتایج، SRM را چک کنید |
| ثبت exposure در لحظهٔ تخصیص | کاربرانی که تغییر را ندیده‌اند اثر را رقیق می‌کنند | لحظهٔ رندر variant را لاگ کنید |
| اثر تازگی (novelty) | جهش اولیه محو می‌شود | به اندازهٔ کافی اجرا کنید؛ روند را ببینید |
| متریک‌های زیاد | همیشه چیزی «معنادار» است | یک متریک اصلی؛ برای بقیه تصحیح کنید |

:::tip پیچش جهانی
اثرها در بازارهای مختلف فرق دارد. بردی که در یک کشور است می‌تواند در کشور دیگر خنثی یا منفی باشد — قبل از rollout همه‌جا، نتایج را به تفکیک کشور، زبان و ردهٔ دستگاه ببینید.
:::

---

@section Senior
## سینیور

انتشار مرحله‌ای و منطقه‌ای، سیاست‌های Play، حریم خصوصی و GDPR

---

@level Senior
## سؤال ۸. انتشار مرحله‌ای و منطقه‌ای

| مرحله | مخاطب | شرط رفتن به مرحلهٔ بعد |
|---|---|---|
| تست داخلی | تیم، QA | پاس شدن smoke testها |
| تست بسته و باز | کاربران بتا | بدون crash پرتکرار جدید؛ vitals پایدار |
| انتشار با درصد کم | کاربران تصادفی | مقایسهٔ crash، ANR و زمان startup با نسخهٔ قبل |
| درصد بیشتر تا ۱۰۰ درصد | همهٔ کاربران واجد شرایط | پایداری متریک‌های بیزینسی و تیکت‌های پشتیبانی |

- در Play Console می‌توانید staged rollout را **متوقف**، ازسرگیری و بیشتر کنید، و انتخاب کنید هر track در کدام کشورها و مناطق در دسترس باشد
- با **Managed publishing** دقیقاً خودتان تعیین می‌کنید ریلیز تأییدشده کِی منتشر شود
- rollout را وقتی شروع کنید که تیم on-call برای منطقه‌های دریافت‌کننده بیدار است

---

## سؤال ۸. deploy همان release نیست

- **deploy را از release جدا کنید:** کد را پشت یک flag خاموش منتشر کنید، بعد آن را بر اساس کشور، ردهٔ دستگاه یا درصد بالا ببرید — بدون binary جدید، با امکان خاموش کردن فوری
- **پذیرش آپدیت کُند است:** خیلی از کاربران چند روز یا چند هفته بعد آپدیت می‌کنند، پس سرور هم‌زمان از چند نسخهٔ اپ پشتیبانی می‌کند (سؤال ۱۲)

:::trap تلهٔ مصاحبه
*«rollout صد درصد یعنی همه نسخهٔ جدید را اجرا می‌کنند.»* — یعنی همه *می‌توانند* آن را بگیرند. پذیرش به تنظیمات آپدیت خودکار، وای‌فای و حافظه بستگی دارد. برای رفع فوری، in-app update (روز ۲۴) را با flagهای سمت سرور ترکیب کنید.
:::

:::trap تلهٔ مصاحبه
*«روز اول، جهانی لانچ کنید.»* — بازارها در دستگاه، شبکه و زبان فرق دارند. با یک بازار نماینده شروع کنید، vitals را به تفکیک کشور ببینید، بعد گسترش دهید.
:::

---

## سؤال ۹. سیاست‌های Play که انتشار جهانی را شکل می‌دهند

| الزام | یعنی چه | کجا دردسر می‌سازد |
|---|---|---|
| سطح API هدف | اپ‌های جدید و آپدیت‌ها باید یک API جدید را هدف بگیرند (امروز 35 به بالا)؛ این سطح هر سال بالاتر می‌رود | تغییرات رفتاری: edge-to-edge، predictive back، قواعد FGS |
| اندازهٔ صفحهٔ ۱۶ کیلوبایتی | اپ‌هایی که Android 15 به بالا را هدف می‌گیرند و کد native دارند باید از صفحه‌های ۱۶ کیلوبایتی پشتیبانی کنند | فایل‌های `.so` قدیمی، SDKهای third-party |
| فرم Data safety | اعلام اینکه چه چیزی جمع و به اشتراک گذاشته می‌شود — از جمله توسط SDKها | باید با رفتار واقعی بخواند |
| حذف حساب | اپ‌هایی که امکان ساخت حساب دارند باید حذف حساب را داخل اپ و روی وب ارائه کنند | کار بک‌اند و UX |
| دسترسی به عکس و ویدیو | مجوزهای گستردهٔ رسانه فقط برای کاربرد اصلی؛ بقیه از photo picker استفاده کنند | حذف `READ_MEDIA_IMAGES` |
| سرویس‌های foreground | نوعشان را اعلام و توجیه کنید (روز ۱۶) | اعلام‌ها در Play Console |

---

## سؤال ۹. تله‌های سیاست‌ها

:::new Developer verification
گوگل در حال اجرای «تأیید هویت توسعه‌دهنده» برای اپ‌هایی است که روی دستگاه‌های اندرویدی certified نصب می‌شوند — از جمله اپ‌هایی که بیرون از Play توزیع می‌شوند — و از ۲۰۲۶ در چند کشور شروع می‌شود. اگر اپ را از فروشگاه‌های دیگر یا با APK مستقیم هم منتشر می‌کنید، برایتان مهم است.
:::

:::trap تلهٔ مصاحبه
*«بالا بردن targetSdk تغییر یک‌خطی است.»* — هر target جدید تغییرات رفتاری را روشن می‌کند: اجباری شدن edge-to-edge در 35، predictive back، قواعد سخت‌تر background و FGS. یک چرخهٔ ریلیز برایش بودجه بگذارید و روی نسخهٔ جدید OS تست کنید.
:::

:::trap تلهٔ مصاحبه
*«سیاست‌ها مشکل تیم حقوقی است.»* — بیشتر تخلف‌ها واقعیت‌های مهندسی‌اند: SDKی که داده‌ای جمع می‌کند که اعلام نکرده‌اید، مجوزی که لازم ندارید، یا نبودِ مسیر حذف حساب. قبل از اضافه کردن SDKها آن‌ها را در Play SDK Index بررسی کنید.
:::

---

## سؤال ۱۰. حریم خصوصی و GDPR در اندروید

- **مبنای قانونی:** GDPR شش مبنا دارد — رضایت، قرارداد، تکلیف قانونی، منافع حیاتی، وظیفهٔ عمومی، منافع مشروع. رضایت باید آزادانه، مشخص و قابل پس گرفتن باشد.
- **حداقل‌سازی داده:** فقط چیزی را جمع کنید که فیچر لازم دارد؛ موقعیت تقریبی، photo picker و پردازش روی دستگاه را ترجیح دهید
- **حقوق کاربر:** دسترسی، اصلاح، حذف، انتقال‌پذیری — یعنی مسیرهای بک‌اند، نه فقط یک صفحهٔ تنظیمات
- **انتقال داده:** دادهٔ شخصی‌ای که از EEA خارج می‌شود به یک سازوکار قانونی نیاز دارد (تصمیم adequacy، بندهای قراردادی استاندارد)

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

## سؤال ۱۰. دو افسانه از نسخهٔ پارسال

:::trap تلهٔ مصاحبه
*«GDPR و CCPA هر دو قبل از جمع‌آوری هر داده‌ای رضایت صریح می‌خواهند.»* — GDPR مبناهای قانونی دیگری هم دارد (قرارداد، سرویس اصلی را پوشش می‌دهد)؛ رضایت معمولاً برای tracking غیرضروری و تبلیغات لازم است (GDPR همراه با قواعد ePrivacy). قوانین CCPA و CPRA بیشتر مدل **opt-out** دارند. لایهٔ رضایتی بسازید که هر دو را بتواند بیان کند.
:::

:::trap تلهٔ مصاحبه
*«برای تعیین قانون حاکم از geo-fencing با GPS استفاده کنید.»* — درخواست موقعیت فقط برای انتخاب رژیم حریم خصوصی، اصل حداقل‌سازی را می‌شکند و مجوزی می‌خواهد که کاربر ردش می‌کند. از سیگنال‌های تقریبی استفاده کنید (کشور حساب یا فروشگاه، lookup آی‌پی سمت سرور) و وقتی مطمئن نیستید، **سخت‌گیرانه‌ترین** رژیم را پیش‌فرض بگیرید.
:::

:::tip تبلیغات در اروپا
برای تبلیغاتی که به کاربران EEA و بریتانیا نمایش داده می‌شود، گوگل یک پلتفرم مدیریت رضایت (CMP) تأییدشده می‌خواهد، مثلاً UMP SDK گوگل که بر پایهٔ IAB TCF است. رژیم‌های دیگری که باید بشناسید: LGPD در برزیل و DPDP Act در هند.
:::

---

@section Architect
## آرکیتکت

بازارهای نوظهور، چندمنطقه‌ای و version skew، پلتفرم آمادهٔ جهانی

---

@level Architect
## سؤال ۱۱. ساختن اپ برای بازارهای نوظهور

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

- **حجم دانلود یک متریک conversion است:** App Bundle، R8 و resource shrinking، فرمت WebP (و AVIF از API 31)، فیچرها و assetهای on-demand (روز ۱۸ و روز ۲۵)
- **داده پول است:** به Data Saver و شبکه‌های metered احترام بگذارید؛ تصویر را به اندازهٔ view درخواست کنید؛ از HTTP caching استفاده کنید
- **offline-first:** از دیتابیس محلی بخوانید و نوشتن‌ها را با WorkManager در صف بگذارید (روز ۱۴)

---

## سؤال ۱۱. تله‌های بازارهای نوظهور

:::trap تلهٔ مصاحبه
*«وای‌فای مجانی است، اینترنت موبایل metered.»* — hotspot و وای‌فای با سقف مصرف metered هستند؛ بعضی بسته‌های موبایل نیستند. `NET_CAPABILITY_NOT_METERED` را چک کنید، نه نوع transport را.
:::

:::trap تلهٔ مصاحبه
*«برای آن بازارها یک اپ lite جداگانه بسازید.»* — دو codebase از هم فاصله می‌گیرند. یک اپ که خودش را تطبیق می‌دهد بهتر است: ردهٔ دستگاه (روز ۲۸)، شرایط شبکه و ماژول‌های on-demand.
:::

:::followup سؤال تکمیلی
*«چقدر کوچک، کافی است؟»* — حجم دانلود را در هر ریلیز در Play Console ردیابی کنید و در CI برایش بودجه بگذارید (روز ۲۸). هر وابستگی جدید باید بایت‌هایش را توجیه کند.
:::

- این‌ها را هم در نظر بگیرید: حافظهٔ کم، دستگاه‌های مشترک، اتصال قطع‌ووصل، و ورود با SMS به‌عنوان راه جایگزین

---

## سؤال ۱۲. بک‌اند چندمنطقه‌ای — از سمت کلاینت

- **یک hostname سراسری؛** لبهٔ شبکه (GeoDNS، anycast، CDN) درخواست را به نزدیک‌ترین منطقهٔ سالم می‌فرستد — هیچ لیست منطقه‌ای در اپ hard-code نمی‌شود
- **محل نگهداری داده:** اگر دادهٔ کاربر در یک منطقهٔ اصلی نگه داشته می‌شود، سرور بعد از login آدرس آن منطقه را برمی‌گرداند و کلاینت ذخیره‌اش می‌کند
- **فراخوانی‌های امن در failover:** یعنی timeout، retry با backoff **و jitter**، احترام به `Retry-After`، و **idempotency key** برای نوشتن‌ها

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

## سؤال ۱۲. version skew و افسانه‌های محل داده

- **version skew:** نسخه‌های قدیمی اپ ماه‌ها یا سال‌ها زنده می‌مانند. API یک قرارداد است: نسخه‌گذاری‌اش کنید، تغییرات را افزایشی نگه دارید، فیچرها را سمت سرور بر اساس نسخهٔ اپ باز کنید، و حداقل نسخهٔ پشتیبانی‌شده را اجباری کنید (in-app update، روز ۲۴)

:::trap تلهٔ مصاحبه
*«دادهٔ کاربران اروپایی را در اروپا نگه دارید تا GDPR راضی شود — داده هرگز خارج نمی‌شود.»* (ادعای نسخهٔ پارسال) — GDPR ذخیره در اروپا را الزامی نمی‌کند؛ **انتقال** داده را قانون‌مند می‌کند. «هرگز خارج نمی‌شود» هم به‌ندرت درست است: ابزارهای پشتیبانی، analytics و SDKهای crash داده را جای دیگری کپی می‌کنند. بعضی کشورها واقعاً ذخیرهٔ محلی برخی داده‌ها را الزامی می‌کنند — این data localization است، قانونی جدا در هر کشور.
:::

:::trap تلهٔ مصاحبه
*«در failover فوراً retry کنید.»* — میلیون‌ها کلاینت که هم‌زمان retry می‌کنند یک thundering herd می‌سازند که می‌تواند منطقهٔ سالم را هم از پا بیندازد. jitter آن‌ها را پخش می‌کند؛ `Retry-After` به سرور اجازهٔ هدایت می‌دهد.
:::

---

## سؤال ۱۳. طراحی پلتفرم آمادهٔ جهانی: رشته‌ها

1. توسعه‌دهنده رشتهٔ مبدأ را **همراه با توضیح زمینه** برای مترجم اضافه می‌کند
2. یک سیستم مدیریت ترجمه (TMS) مثل Crowdin، Lokalise یا Phrase آن را با واژه‌نامه و اسکرین‌شات به مترجم‌ها می‌رساند
3. ترجمه‌ها به شکل یک PR برمی‌گردند و CI چکشان می‌کند
4. قبل از جدا کردن branch ریلیز، **string freeze** اعمال می‌شود

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

:::trap تلهٔ مصاحبه
*«Lint متن hard-code را می‌گیرد.»* — `HardcodedText` فقط layoutهای XML را چک می‌کند. `Text("Pay now")` در Compose از زیر دستش در می‌رود — یک قاعدهٔ سفارشی Lint یا detekt اضافه کنید.
:::

---

## سؤال ۱۳. «جهانی بودن» مال پلتفرم است، نه تک‌تک تیم‌ها

| دغدغه | پلتفرم فراهم می‌کند | با چه چیزی اعمال می‌شود |
|---|---|---|
| متن و layout | یک design system با RTL، مقیاس فونت و semantics | تست اسکرین‌شات در RTL و با فونت ۲۰۰ درصد |
| رشته‌ها | همگام‌سازی TMS، توضیح زمینه، string freeze | چک‌های Lint و CI |
| قواعد منطقه‌ای | سرویس config و flag با هدف‌گیری کشور | کانفیگ سرور بازبینی‌شده |
| حریم خصوصی | یک SDK رضایت؛ تله‌متری‌ای که به آن احترام می‌گذارد | بازبینی Data safety در هر ریلیز |
| ریلیز | انتشار مرحله‌ای برای هر کشور؛ داشبورد به تفکیک کشور و locale | چک‌لیست ریلیز |

:::trap تلهٔ مصاحبه
*«RTL و دسترس‌پذیری را وقتی به آن بازار رفتیم اضافه می‌کنیم.»* — اصلاح بعدی به همهٔ صفحه‌ها دست می‌زند. پیش‌فرض‌های آمادهٔ جهانی روز اول هزینهٔ کمی دارند و بعداً هزینهٔ زیادی.
:::

:::tip جواب سینیور در یک جمله
«یک اپ بساز که خودش را تطبیق دهد: resource و فرمت بر اساس locale، یک design system که به‌طور پیش‌فرض برای RTL و دسترس‌پذیری آماده است، flag و staged rollout برای هر منطقه، حریم خصوصی از روز اول — و یک API که به همهٔ نسخه‌های کلاینتِ هنوز فعال احترام بگذارد.»
:::

---

## روز ۲۹ — خلاصهٔ یک‌صفحه‌ای

- i18n یعنی مهندسی برای تطبیق؛ l10n خودِ تطبیق است. `values/` پیش‌فرض کامل، placeholder موقعیتی، بدون چسباندن رشته.
- `fr` یک زبان است و `fr-rFR` یک منطقه؛ زبان، کشور و واحد پول سه چیز جدا هستند.
- برای راست‌به‌چپ: `supportsRtl`، start و end، آیکون auto-mirrored، `BidiFormatter` — رسانه و ساعت آینه‌ای نشوند.
- plural طبق CLDR؛ انگلیسی `zero` ندارد. فرمت ماشینی با `Locale.ROOT`.
- زبان جداگانهٔ هر اپ: از API 33، با backport در AppCompat؛ مراقب language splitها باشید.
- دسترس‌پذیری در design system و CI — به‌علاوهٔ تست دستی با TalkBack.
- flag: پیش‌فرض داخل کد، snapshot برای هر session، مالک و تاریخ انقضا. آزمایش: guardrail، بدون peeking.
- انتشار مرحله‌ای برای هر کشور، با توقف بر اساس vitals؛ deploy همان release نیست.
- سیاست‌های Play: هر سال targetSdk بالاتر، صفحهٔ ۱۶ کیلوبایتی برای کد native، Data safety صادقانه، حذف حساب.
- در GDPR: شش مبنای قانونی، حداقل‌سازی، انتقال داده — نه «رضایت برای همه چیز»، نه «داده فقط در اروپا».

**روز ۳۰ در راه است: طراحی سیستم و یکپارچه‌سازی — قسمت پایانی.** این پست را ذخیره کنید و همراه ما باشید.
