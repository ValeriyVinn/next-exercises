# 06. Web Fonts

## 📌 Що таке Web Fonts

**Web Fonts** — це шрифти, які вебсайт завантажує разом зі сторінкою та використовує для відображення тексту.

За замовчуванням браузер використовує шрифти, встановлені в операційній системі:

    body {
        font-family: Arial, sans-serif;
    }

Але якщо нам потрібен конкретний шрифт, ми можемо підключити його до сайту:

    @font-face {
        font-family: "MyFont";
        src: url("/fonts/my-font.woff2") format("woff2");
    }

    body {
        font-family: "MyFont", sans-serif;
    }

Основна модель:

    HTML
       ↓
    CSS
       ↓
    @font-face
       ↓
    файл шрифту
       ↓
    Browser
       ↓
    текст відображається потрібним шрифтом


---

# 1. Навіщо потрібні Web Fonts

Web Fonts дозволяють:

- використовувати власний дизайн шрифту;
- створювати єдину типографічну систему;
- не залежати від набору шрифтів користувача;
- використовувати корпоративні шрифти;
- створювати власний візуальний стиль;
- використовувати variable fonts;
- оптимізувати типографіку під конкретний проєкт.

Наприклад:

    body {
        font-family: "Inter", sans-serif;
    }

Без Web Fonts користувач може не мати `Inter` у своїй системі.

Тоді браузер перейде до fallback:

    "Inter" → sans-serif → системний sans-serif шрифт


---

# 2. System Fonts vs Web Fonts

## System Fonts

Це шрифти, які вже встановлені в операційній системі.

Приклади:

    Arial
    Helvetica
    Georgia
    Times New Roman
    Verdana

Переваги:

- не потрібно завантажувати файл;
- швидкий старт;
- немає додаткового мережевого запиту;
- хороша надійність.

Недоліки:

- вигляд може відрізнятися між ОС;
- немає повного контролю над дизайном;
- конкретного шрифту може не бути у користувача.

---

## Web Fonts

Шрифт зберігається на сервері та завантажується браузером.

Наприклад:

    /fonts/
        inter-regular.woff2
        inter-bold.woff2

CSS:

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter-regular.woff2") format("woff2");
        font-weight: 400;
        font-style: normal;
    }

---

# 3. Основна конструкція @font-face

`@font-face` повідомляє браузеру:

> "Ось файл шрифту, який можна використовувати в CSS".

Базовий приклад:

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter.woff2") format("woff2");
    }

Після цього:

    body {
        font-family: "Inter", sans-serif;
    }

Схема:

    @font-face
        ↓
    font-family
        ↓
    src
        ↓
    font file
        ↓
    font-family у звичайному CSS


---

# 4. font-family у @font-face

Властивість `font-family` задає внутрішнє ім'я шрифту.

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter.woff2") format("woff2");
    }

Це ім'я потім використовується:

    body {
        font-family: "Inter", sans-serif;
    }

Назва не обов'язково повинна збігатися з назвою файлу.

Наприклад:

    @font-face {
        font-family: "SiteText";
        src: url("/fonts/inter-regular.woff2") format("woff2");
    }

Тепер:

    body {
        font-family: "SiteText", sans-serif;
    }


---

# 5. src

`src` вказує, звідки браузер повинен отримати шрифт.

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter.woff2") format("woff2");
    }

`url()` — шлях до файлу.

`format()` — формат шрифту.

---

# 6. Шляхи до шрифтів

Приклад структури:

    project/
    ├── index.html
    ├── css/
    │   └── style.css
    └── fonts/
        └── inter.woff2

Якщо CSS знаходиться в `css/style.css`, шлях залежить від того, звідки браузер розраховує URL.

Наприклад:

    @font-face {
        font-family: "Inter";
        src: url("../fonts/inter.woff2") format("woff2");
    }

Якщо файл шрифту знаходиться в `public/fonts` у вебпроєкті:

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter.woff2") format("woff2");
    }

---

# 7. Формати Web Fonts

Найважливіші формати:

    WOFF2
    WOFF
    TTF
    OTF
    EOT

Сьогодні основний формат для вебу:

    WOFF2

---

# 8. WOFF2

**WOFF2** — основний сучасний формат вебшрифтів.

Переваги:

- хороше стиснення;
- невеликий розмір;
- широко підтримується сучасними браузерами;
- оптимальний для вебсайтів.

Приклад:

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter.woff2") format("woff2");
    }

У сучасному проєкті зазвичай варто починати саме з WOFF2.


---

# 9. WOFF

**WOFF** — старіший вебформат.

Він досі може використовуватися як fallback:

    @font-face {
        font-family: "Inter";
        src:
            url("/fonts/inter.woff2") format("woff2"),
            url("/fonts/inter.woff") format("woff");
    }

Сучасний браузер зазвичай використає WOFF2.


---

# 10. TTF та OTF

TTF:

    .ttf

OTF:

    .otf

Це поширені формати шрифтів, але для вебу зазвичай краще використовувати WOFF2.

Типова сучасна стратегія:

    WOFF2
       ↓
    оптимальний вебформат


---

# 11. EOT

EOT (`Embedded OpenType`) — старий формат, пов'язаний переважно зі старими версіями Internet Explorer.

Для сучасних проєктів:

    EOT → практично не потрібен


---

# 12. Рекомендований формат

Для сучасного frontend-проєкту:

    font.woff2

Цього часто достатньо.

Наприклад:

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter.woff2") format("woff2");
        font-weight: 400;
        font-style: normal;
    }


---

# 13. font-weight

`font-weight` у `@font-face` повідомляє браузеру, яку товщину має конкретний файл.

Наприклад:

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter-regular.woff2") format("woff2");
        font-weight: 400;
    }

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter-bold.woff2") format("woff2");
        font-weight: 700;
    }

Тепер:

    p {
        font-family: "Inter", sans-serif;
        font-weight: 400;
    }

    h1 {
        font-family: "Inter", sans-serif;
        font-weight: 700;
    }


---

# 14. Чому потрібно правильно вказувати font-weight

Уявімо:

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter-bold.woff2");
        font-weight: 400;
    }

Це помилка.

Ми сказали браузеру:

> файл насправді bold, але вважай його regular.

Правильно:

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter-bold.woff2") format("woff2");
        font-weight: 700;
    }

---

# 15. Основні значення font-weight

Найчастіше:

    100 → Thin
    200 → Extra Light
    300 → Light
    400 → Regular
    500 → Medium
    600 → Semi Bold
    700 → Bold
    800 → Extra Bold
    900 → Black

Але конкретний шрифт може не мати всіх цих варіантів.


---

# 16. font-style

`font-style` описує стиль:

    normal
    italic
    oblique

Наприклад:

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter-italic.woff2") format("woff2");
        font-weight: 400;
        font-style: italic;
    }

Тепер:

    em {
        font-family: "Inter", sans-serif;
        font-style: italic;
    }

Браузер знає, що для `italic` потрібно використовувати відповідний файл.


---

# 17. font-stretch

`font-stretch` описує ширину гліфів.

Наприклад:

    @font-face {
        font-family: "MyFont";
        src: url("/fonts/my-font-condensed.woff2") format("woff2");
        font-stretch: condensed;
    }

Можливі варіанти:

    ultra-condensed
    extra-condensed
    condensed
    semi-condensed
    normal
    semi-expanded
    expanded
    extra-expanded
    ultra-expanded

Особливо важливий для шрифтів із різними ширинами.


---

# 18. Повний @font-face

Типовий опис:

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter-regular.woff2") format("woff2");
        font-weight: 400;
        font-style: normal;
        font-display: swap;
    }

Це вже хороший production-приклад.


---

# 19. Кілька накреслень одного шрифту

Наприклад:

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter-regular.woff2") format("woff2");
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter-medium.woff2") format("woff2");
        font-weight: 500;
        font-style: normal;
    }

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter-bold.woff2") format("woff2");
        font-weight: 700;
        font-style: normal;
    }

Тепер можна використовувати:

    body {
        font-family: "Inter", sans-serif;
        font-weight: 400;
    }

    .label {
        font-weight: 500;
    }

    h1 {
        font-weight: 700;
    }


---

# 20. Fallback Fonts

Ніколи не варто покладатися тільки на один шрифт.

Погано:

    body {
        font-family: "Inter";
    }

Краще:

    body {
        font-family: "Inter", Arial, sans-serif;
    }

Якщо `Inter` не завантажиться:

    Inter
      ↓
    Arial
      ↓
    sans-serif


---

# 21. Font Stack

**Font stack** — список альтернативних шрифтів.

    font-family:
        "Inter",
        Arial,
        sans-serif;

Браузер перевіряє їх послідовно.

    Font 1
      ↓
    якщо недоступний
      ↓
    Font 2
      ↓
    якщо недоступний
      ↓
    Font 3


---

# 22. Generic Font Families

Основні generic families:

    serif
    sans-serif
    monospace
    cursive
    fantasy
    system-ui

Найчастіше:

    sans-serif

або:

    serif


---

# 23. system-ui

`system-ui` дозволяє використовувати системний UI-шрифт.

    body {
        font-family: system-ui, sans-serif;
    }

Переваги:

- не потрібно завантажувати Web Font;
- швидко;
- добре інтегрується з ОС;
- часто хороший варіант для інтерфейсів.


---

# 24. Web Font + system fallback

Хороший практичний варіант:

    body {
        font-family:
            "Inter",
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
    }

Це дозволяє мати власний шрифт і fallback.


---

# 25. font-display

`font-display` визначає поведінку тексту під час завантаження Web Font.

Основні значення:

    auto
    block
    swap
    fallback
    optional

Найчастіше потрібно знати:

    swap

---

# 26. font-display: swap

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter.woff2") format("woff2");
        font-display: swap;
    }

Ідея:

    сторінка
       ↓
    fallback font
       ↓
    Web Font завантажується
       ↓
    браузер замінює fallback на Web Font


Перевага:

- текст швидко стає видимим;
- менший ризик невидимого тексту під час завантаження.


---

# 27. FOIT

**FOIT — Flash of Invisible Text**

Текст тимчасово невидимий, поки браузер очікує шрифт.

Схематично:

    HTML
      ↓
    текст
      ↓
    чекаємо font
      ↓
    текст невидимий
      ↓
    font завантажився
      ↓
    текст з'явився


---

# 28. FOUT

**FOUT — Flash of Unstyled Text**

Спочатку показується fallback-шрифт, потім завантажується Web Font.

    fallback font
         ↓
    Web Font
         ↓
    заміна шрифту

Це часто краще для UX, ніж довго приховувати текст.


---

# 29. font-display: swap — типовий вибір

Наприклад:

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter.woff2") format("woff2");
        font-weight: 400;
        font-style: normal;
        font-display: swap;
    }

Для більшості звичайних текстових шрифтів це хороший старт.


---

# 30. font-display: optional

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter.woff2") format("woff2");
        font-display: optional;
    }

Браузер може вирішити не використовувати Web Font, якщо це недоцільно з точки зору продуктивності.

Це може бути корисно для некритичних шрифтів.


---

# 31. font-display: fallback

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter.woff2") format("woff2");
        font-display: fallback;
    }

Компромісний режим між швидким fallback та використанням Web Font.


---

# 32. font-display: block

    @font-face {
        font-family: "BrandFont";
        src: url("/fonts/brand.woff2") format("woff2");
        font-display: block;
    }

Браузер певний час може приховувати текст, очікуючи на шрифт.

Для звичайного тексту це часто не найкращий варіант.


---

# 33. Чому Web Fonts впливають на performance

Шрифт — це додатковий ресурс.

Наприклад:

    HTML
    CSS
    JS
    images
    fonts

Кожен ресурс може впливати на:

- швидкість завантаження;
- bandwidth;
- rendering;
- Core Web Vitals;
- layout stability.


---

# 34. Не підключай занадто багато шрифтів

Погано:

    Font A
    Font B
    Font C
    Font D

Кожен має:

    100
    200
    300
    400
    500
    600
    700
    800
    900

Це може створити багато непотрібних файлів.

Краще:

    1 основний font-family
    +
    необхідні weights


---

# 35. Вибирай тільки потрібні weights

Наприклад, якщо дизайн використовує:

    400
    600
    700

не потрібно завантажувати:

    100
    200
    300
    500
    800
    900

Без потреби.


---

# 36. Font Subsetting

**Font subsetting** — створення версії шрифту тільки з потрібними символами.

Наприклад, якщо сайт використовує:

    Latin
    Cyrillic

можна оптимізувати шрифт під ці набори символів.

Це зменшує розмір файлу.


---

# 37. unicode-range

`unicode-range` дозволяє сказати браузеру, для яких символів потрібен конкретний файл шрифту.

Наприклад:

    @font-face {
        font-family: "MyFont";
        src: url("/fonts/my-font-latin.woff2") format("woff2");
        unicode-range: U+0000-00FF;
    }

Окремо:

    @font-face {
        font-family: "MyFont";
        src: url("/fonts/my-font-cyrillic.woff2") format("woff2");
        unicode-range: U+0400-04FF;
    }

Це дозволяє розділити шрифт на subsets.


---

# 38. Навіщо unicode-range

Уявімо сайт підтримує:

    English
    Ukrainian

Замість одного великого файлу:

    300 KB

можна мати:

    Latin
      ↓
    100 KB

    Cyrillic
      ↓
    100 KB

Браузер завантажує потрібні частини залежно від тексту.


---

# 39. local()

У `src` можна вказати локальну версію шрифту.

Наприклад:

    @font-face {
        font-family: "Inter";
        src:
            local("Inter"),
            url("/fonts/inter.woff2") format("woff2");
    }

Ідея:

    якщо шрифт уже встановлений
          ↓
    можна використати local()
          ↓
    і не завантажувати файл


---

# 40. Чому local() може бути небажаним

Локальна версія шрифту може:

- мати іншу версію;
- мати інші метрики;
- відрізнятися від файлу на сайті;
- поводитися трохи інакше.

Для повністю контрольованого дизайну іноді краще використовувати саме self-hosted font.


---

# 41. Self-hosted Fonts

**Self-hosted** — шрифт знаходиться на вашому сервері.

Наприклад:

    public/
    └── fonts/
        ├── inter-regular.woff2
        ├── inter-medium.woff2
        └── inter-bold.woff2

CSS:

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter-regular.woff2") format("woff2");
        font-weight: 400;
        font-style: normal;
        font-display: swap;
    }


---

# 42. Зовнішні Font Services

Шрифт також можна отримувати із зовнішнього сервісу.

Наприклад:

    HTML
      ↓
    external font service
      ↓
    browser
      ↓
    font

Переваги:

- простіше підключення;
- великий вибір;
- часто є оптимізація.

Недоліки:

- залежність від зовнішнього сервісу;
- додаткові мережеві залежності;
- privacy/performance considerations.


---

# 43. Self-hosted vs External Font Service

| Підхід | Переваги | Недоліки |
|---|---|---|
| Self-hosted | контроль, privacy, передбачуваність | потрібно самому оптимізувати |
| External | просте підключення | залежність від стороннього сервісу |

Для production важливо розуміти обидва підходи.


---

# 44. Variable Fonts

**Variable Font** — один файл шрифту може містити багато варіантів накреслення.

Замість:

    regular.woff2
    medium.woff2
    bold.woff2

можна мати:

    variable-font.woff2

і керувати вагою:

    font-weight: 400;

    font-weight: 500;

    font-weight: 700;


---

# 45. Перевага Variable Fonts

Замість великої кількості окремих файлів:

    regular
    medium
    semibold
    bold

можна мати один variable font.

Це може спростити:

- завантаження;
- типографічну систему;
- керування вагою;
- адаптивну типографіку.


---

# 46. Підключення Variable Font

Наприклад:

    @font-face {
        font-family: "MyVariableFont";
        src: url("/fonts/my-variable-font.woff2") format("woff2");
        font-weight: 100 900;
        font-style: normal;
        font-display: swap;
    }

Тепер:

    h1 {
        font-family: "MyVariableFont", sans-serif;
        font-weight: 750;
    }

Variable Font може підтримувати значення між стандартними `400` та `700`.


---

# 47. Font Axes

Variable Fonts можуть мати axes.

Основні:

    wght → weight
    wdth → width
    opsz → optical size
    slnt → slant
    ital → italic

Наприклад:

    wght = 650
    wdth = 90
    opsz = 48


---

# 48. font-variation-settings

Для низькорівневого керування axes:

    .title {
        font-variation-settings:
            "wght" 650,
            "wdth" 90;
    }

Але якщо існує звичайна CSS-властивість:

    font-weight
    font-stretch
    font-style

краще спочатку використовувати її.


---

# 49. font-optical-sizing

Для variable fonts може використовуватися:

    body {
        font-optical-sizing: auto;
    }

Це дозволяє шрифту адаптувати оптичні характеристики залежно від розміру тексту, якщо шрифт підтримує відповідний axis.


---

# 50. font-feature-settings

Деякі шрифти підтримують OpenType features.

Наприклад:

    .text {
        font-feature-settings: "liga" 1;
    }

Але для стандартних можливостей краще використовувати спеціалізовані CSS-властивості, якщо вони доступні.


---

# 51. font-kerning

`font-kerning` керує кернінгом — оптичним регулюванням відстані між певними парами символів.

    body {
        font-kerning: normal;
    }

Наприклад, шрифт може спеціально налаштовувати пари:

    A + V
    T + o
    W + a


---

# 52. font-synthesis

Браузер може штучно створювати:

- bold;
- italic.

Наприклад, якщо немає окремого bold-файлу.

Можна контролювати це:

    body {
        font-synthesis: none;
    }

Тоді браузеру заборонено штучно синтезувати певні стилі.


---

# 53. Навіщо потрібні реальні накреслення

Уявімо, є:

    regular.woff2

але немає:

    bold.woff2

Якщо написати:

    h1 {
        font-weight: 700;
    }

браузер може синтезувати bold.

Якісний дизайн часто краще контролювати реальними файлами шрифту.


---

# 54. Font Metrics

Шрифти мають різні метрики.

Наприклад:

- ascender;
- descender;
- x-height;
- line gap;
- glyph width.

Через це два шрифти з однаковим:

    font-size: 16px;

можуть виглядати зовсім по-різному.


---

# 55. Однаковий font-size ≠ однаковий вигляд

Наприклад:

    font-family: Arial;
    font-size: 16px;

та:

    font-family: "Inter";
    font-size: 16px;

можуть мати різну:

- висоту літер;
- ширину тексту;
- висоту рядка;
- кількість рядків;
- візуальну щільність.


---

# 56. font-size-adjust

`font-size-adjust` допомагає зберігати приблизно однакову сприйману висоту малих літер між шрифтами.

Наприклад:

    body {
        font-size-adjust: 0.5;
    }

Це особливо цікаво для fallback-шрифтів.


---

# 57. Web Fonts і Layout Shift

Уявімо:

    fallback font
         ↓
    текст займає 2 рядки
         ↓
    Web Font
         ↓
    текст займає 3 рядки

Висота блоку змінюється.

Це може викликати:

    layout shift

Тому вибір fallback із близькими метриками важливий.


---

# 58. Font Metric Overrides

Сучасний CSS має можливості контролювати метрики fallback-шрифтів:

    size-adjust
    ascent-override
    descent-override
    line-gap-override

Вони можуть використовуватися для зменшення layout shift при заміні fallback-шрифту на Web Font.


---

# 59. size-adjust

Наприклад:

    @font-face {
        font-family: "Adjusted Fallback";
        src: local("Arial");
        size-adjust: 95%;
    }

Це дозволяє масштабувати метрики fallback-шрифту.


---

# 60. preload шрифтів

Для критично важливого шрифту іноді використовують preload:

    <link
        rel="preload"
        href="/fonts/inter-regular.woff2"
        as="font"
        type="font/woff2"
        crossorigin
    >

Це може прискорити завантаження критичного шрифту.

Але не потрібно preload-ити всі шрифти.


---

# 61. Чому не треба preload-ити все

Погано:

    preload font 1
    preload font 2
    preload font 3
    preload font 4
    preload font 5

Preload має пріоритет.

Якщо preload-ити занадто багато ресурсів:

- браузер витрачає bandwidth;
- важливі ресурси конкурують між собою;
- performance може погіршитися.


---

# 62. CORS і Web Fonts

Якщо шрифт завантажується з іншого origin, можуть виникнути CORS-проблеми.

Наприклад:

    site.com
        ↓
    fonts.other-site.com
        ↓
    font

Сервер шрифтів повинен правильно дозволяти такий запит.


---

# 63. MIME Type

Сервер повинен правильно віддавати файл шрифту.

Наприклад, для WOFF2 потрібен відповідний MIME type:

    font/woff2

Неправильна конфігурація сервера може призвести до того, що браузер не завантажить шрифт.


---

# 64. Як перевірити, чи завантажився шрифт

У DevTools:

    DevTools
       ↓
    Network
       ↓
    Font

Можна побачити:

- URL;
- статус;
- розмір;
- час завантаження;
- тип ресурсу.


---

# 65. Перевірка через Computed Styles

У DevTools:

    Elements
       ↓
    element
       ↓
    Computed
       ↓
    font-family

Можна перевірити, який CSS застосований.


---

# 66. Network → Font

Якщо шрифт не працює:

    DevTools
       ↓
    Network
       ↓
    Font

Перевірити:

    200 → файл знайдений

    404 → неправильний шлях

    CORS error → проблема доступу

    blocked → проблема політики/завантаження


---

# 67. Часті причини, чому Web Font не працює

### 1. Неправильний шлях

    url("/font/inter.woff2")

а файл:

    /fonts/inter.woff2

---

### 2. Неправильний font-family

    @font-face {
        font-family: "Inter";
    }

але:

    body {
        font-family: "InterWeb";
    }

---

### 3. Неправильний weight

    @font-face {
        font-weight: 400;
    }

але файл насправді bold.


---

### 4. Файл не існує

    404 Not Found


---

### 5. CORS

Шрифт завантажується з іншого origin без потрібних дозволів.


---

# 68. Мінімальний production-приклад

Структура:

    project/
    ├── index.html
    ├── css/
    │   └── style.css
    └── fonts/
        └── inter-regular.woff2

CSS:

    @font-face {
        font-family: "Inter";
        src: url("../fonts/inter-regular.woff2") format("woff2");
        font-weight: 400;
        font-style: normal;
        font-display: swap;
    }

    body {
        font-family: "Inter", system-ui, sans-serif;
        font-size: 16px;
        line-height: 1.5;
    }


---

# 69. Приклад з кількома weights

    @font-face {
        font-family: "Inter";
        src: url("../fonts/inter-regular.woff2") format("woff2");
        font-weight: 400;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: "Inter";
        src: url("../fonts/inter-semibold.woff2") format("woff2");
        font-weight: 600;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: "Inter";
        src: url("../fonts/inter-bold.woff2") format("woff2");
        font-weight: 700;
        font-style: normal;
        font-display: swap;
    }

    body {
        font-family: "Inter", system-ui, sans-serif;
        font-weight: 400;
    }

    h1,
    h2,
    h3 {
        font-weight: 700;
    }

    .label {
        font-weight: 600;
    }


---

# 70. Повний приклад HTML + CSS

HTML:

    <!DOCTYPE html>
    <html lang="uk">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Web Fonts</title>

        <link rel="stylesheet" href="css/style.css">
    </head>

    <body>

        <main>
            <h1>Web Fonts</h1>

            <p>
                Цей текст використовує власний Web Font.
            </p>

            <strong>
                Жирний текст.
            </strong>
        </main>

    </body>
    </html>

CSS:

    @font-face {
        font-family: "Inter";
        src: url("../fonts/inter-regular.woff2") format("woff2");
        font-weight: 400;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: "Inter";
        src: url("../fonts/inter-bold.woff2") format("woff2");
        font-weight: 700;
        font-style: normal;
        font-display: swap;
    }

    body {
        margin: 0;

        font-family:
            "Inter",
            system-ui,
            sans-serif;

        font-size: 16px;
        line-height: 1.5;
    }

    h1 {
        font-weight: 700;
    }


---

# 71. Web Fonts і responsive typography

Web Font — це тільки частина типографічної системи.

Наприклад:

    font-family
    font-size
    font-weight
    line-height
    letter-spacing
    max-width

можуть працювати разом.

Приклад:

    body {
        font-family: "Inter", system-ui, sans-serif;
        font-size: 1rem;
        line-height: 1.6;
    }

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
        line-height: 1.1;
        font-weight: 700;
    }


---

# 72. Web Font не замінює fallback

Навіть якщо ми використовуємо Web Font:

    font-family:
        "Inter",
        system-ui,
        sans-serif;

fallback все одно потрібний.

Причини:

- мережа може бути недоступною;
- файл може не завантажитися;
- сервер може бути недоступний;
- браузер може заблокувати ресурс;
- користувач може мати особливі налаштування.


---

# 73. Не використовуйте Web Font для всього без потреби

Не кожен елемент потребує окремого шрифту.

Наприклад, погана система:

    body → Font A
    headings → Font B
    buttons → Font C
    labels → Font D
    code → Font E

Це збільшує складність.

Краще починати:

    основний UI → один font
    code → monospace
    за необхідності → другий display font


---

# 74. Display Font

Для заголовків іноді використовується окремий display font.

Наприклад:

    body {
        font-family: "Inter", sans-serif;
    }

    h1,
    h2 {
        font-family: "Playfair Display", serif;
    }

Це дизайнерське рішення, а не технічна необхідність.


---

# 75. Monospace Font

Для коду:

    code,
    pre {
        font-family:
            "JetBrains Mono",
            monospace;
    }

Типові властивості:

- однакова ширина символів;
- зручність для коду;
- добре вирівнюються колонки.


---

# 76. Font loading strategy

Для production-сайту можна мислити так:

    Критичний текст
         ↓
    потрібний font
         ↓
    оптимальний формат
         ↓
    swap
         ↓
    fallback

Некритичні шрифти:

    optional / lazy strategy


---

# 77. Критичний і некритичний шрифт

Критичний:

    основний body font

Некритичний:

    декоративний display font
    шрифт для окремого віджета
    шрифт для модального вікна, яке відкривається рідко

Не всі Web Fonts потрібно завантажувати однаково.


---

# 78. Доступність

Шрифт не повинен погіршувати читабельність.

Потрібно враховувати:

- розмір тексту;
- line-height;
- контраст;
- довжину рядка;
- вагу;
- spacing;
- підтримку потрібних символів.

Особливо важливо перевіряти кирилицю, якщо сайт українською.


---

# 79. Перевірка кирилиці

Шрифт може підтримувати:

    Latin

але не підтримувати:

    Cyrillic

Наприклад, український текст:

    Привіт, світе!

може відображатися fallback-шрифтом, якщо потрібних гліфів немає.


---

# 80. Не всі шрифти мають однаковий набір символів

Перед використанням потрібно перевірити:

    Latin
    Latin Extended
    Cyrillic
    Cyrillic Extended
    symbols
    currency
    punctuation

Для українського сайту особливо важлива підтримка кирилиці.


---

# 81. Fallback при відсутньому glyph

Якщо Web Font не має конкретного символу, браузер може використати інший шрифт для цього символу.

Наприклад:

    Web Font
       ↓
    символ відсутній
       ↓
    fallback font

Тому іноді один рядок може містити гліфи з різних шрифтів.


---

# 82. Font Family vs Font File

Не плутати:

    font-family
        ↓
    логічне ім'я шрифту

і:

    .woff2
        ↓
    конкретний файл шрифту

Наприклад:

    "Inter"

може бути однією family:

    Inter Regular
    Inter Medium
    Inter Bold


---

# 83. Font Family як система

Правильна модель:

    Inter
      ├── 400
      ├── 500
      ├── 600
      └── 700

CSS:

    font-family: "Inter";

а weight вибирає конкретне накреслення:

    font-weight: 400;
    font-weight: 600;
    font-weight: 700;


---

# 84. Поганий підхід

Створювати окремі family:

    InterRegular
    InterMedium
    InterBold

Наприклад:

    font-family: "InterBold";

Це ускладнює типографічну систему.

Краще:

    font-family: "Inter";
    font-weight: 700;


---

# 85. Хороша система

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter-regular.woff2") format("woff2");
        font-weight: 400;
    }

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter-medium.woff2") format("woff2");
        font-weight: 500;
    }

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter-bold.woff2") format("woff2");
        font-weight: 700;
    }

Потім:

    body {
        font-family: "Inter", sans-serif;
    }

    .text {
        font-weight: 400;
    }

    .label {
        font-weight: 500;
    }

    .title {
        font-weight: 700;
    }


---

# 86. Що відбувається при font-weight: 600

При:

    font-family: "Inter";
    font-weight: 600;

браузер шукає відповідний face.

Якщо існує:

    Inter 600

використовується він.

Якщо немає точного face, браузер застосовує правила вибору найближчого доступного накреслення.


---

# 87. Font Matching

Браузер підбирає font face за такими характеристиками, як:

    font-family
    font-style
    font-weight
    font-stretch

Тому ці значення в `@font-face` повинні бути описані правильно.


---

# 88. Web Font + CSS Variables

Типографічну систему можна винести в CSS variables:

    :root {
        --font-sans: "Inter", system-ui, sans-serif;
        --font-mono: "JetBrains Mono", monospace;
    }

    body {
        font-family: var(--font-sans);
    }

    code {
        font-family: var(--font-mono);
    }

Це зручно для design system.


---

# 89. Font Tokens

Наприклад:

    :root {
        --font-family-sans:
            "Inter",
            system-ui,
            sans-serif;

        --font-family-mono:
            "JetBrains Mono",
            monospace;

        --font-weight-regular: 400;
        --font-weight-medium: 500;
        --font-weight-bold: 700;
    }

Тепер:

    .title {
        font-family: var(--font-family-sans);
        font-weight: var(--font-weight-bold);
    }


---

# 90. Web Fonts у CSS Modules

У React/Next.js-проєктах принцип залишається таким самим.

Наприклад:

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter.woff2") format("woff2");
        font-weight: 400;
        font-style: normal;
        font-display: swap;
    }

CSS Module:

    .title {
        font-family: "Inter", sans-serif;
    }

Важливо розуміти, що CSS Modules змінює імена класів, але не змінює принцип роботи `@font-face`.


---

# 91. Web Fonts у компонентній системі

У великому проєкті краще не підключати один і той самий шрифт у десятках компонентів.

Краще:

    global typography
          ↓
    @font-face
          ↓
    design tokens
          ↓
    components

Наприклад:

    app/
    ├── globals.css
    └── components/
        ├── Button/
        ├── Card/
        └── Header/


---

# 92. Один глобальний шрифт

Наприклад:

    :root {
        --font-sans:
            "Inter",
            system-ui,
            sans-serif;
    }

    body {
        font-family: var(--font-sans);
    }

Компоненти успадковують його.

    body
      ↓
    main
      ↓
    section
      ↓
    card
      ↓
    text


---

# 93. Успадкування font-family

`font-family` успадковується.

Наприклад:

    body {
        font-family: "Inter", sans-serif;
    }

    .card {
        font-size: 1rem;
    }

`.card` автоматично використовує `Inter`, якщо не перевизначити шрифт.


---

# 94. Явне перевизначення

    body {
        font-family: "Inter", sans-serif;
    }

    .code {
        font-family: "JetBrains Mono", monospace;
    }

Тепер:

    body
      ↓
    Inter

    .code
      ↓
    JetBrains Mono


---

# 95. Типова структура fonts

Для простого проєкту:

    public/
    └── fonts/
        ├── inter-regular.woff2
        ├── inter-medium.woff2
        ├── inter-semibold.woff2
        └── inter-bold.woff2

Для складнішого:

    public/
    └── fonts/
        ├── inter/
        │   ├── latin/
        │   └── cyrillic/
        └── jetbrains-mono/
            └── jetbrains-mono.woff2


---

# 96. Іменування файлів

Хороший стиль:

    inter-400.woff2
    inter-500.woff2
    inter-600.woff2
    inter-700.woff2

або:

    inter-regular.woff2
    inter-medium.woff2
    inter-semibold.woff2
    inter-bold.woff2

Головне — послідовність.


---

# 97. Що потрібно перевірити перед використанням шрифту

Checklist:

    [ ] формат WOFF2
    [ ] потрібні weights
    [ ] потрібні styles
    [ ] Cyrillic підтримується
    [ ] Latin підтримується
    [ ] правильний шлях
    [ ] правильний MIME type
    [ ] font-display
    [ ] fallback
    [ ] розмір файлів
    [ ] performance


---

# 98. Типові помилки

## Помилка 1 — неправильний шлях

    src: url("/font/inter.woff2");

Файл:

    /fonts/inter.woff2

Правильно:

    src: url("/fonts/inter.woff2");


---

## Помилка 2 — відсутній fallback

    body {
        font-family: "Inter";
    }

Краще:

    body {
        font-family: "Inter", system-ui, sans-serif;
    }


---

## Помилка 3 — завантаження всіх weights

    100
    200
    300
    400
    500
    600
    700
    800
    900

без реальної потреби.

---

## Помилка 4 — неправильний weight

    inter-bold.woff2

описаний як:

    font-weight: 400;

---

## Помилка 5 — неправильний формат

Використовувати великий TTF там, де достатньо оптимізованого WOFF2.


---

# 99. Типові помилки з performance

Не варто:

    preload every font

Не варто:

    use 5 font families

Не варто:

    load all weights

Не варто:

    load unused language subsets

Не варто:

    використовувати декоративний шрифт для всього тексту.


---

# 100. Debugging Web Fonts

Алгоритм:

    1. Перевірити CSS
         ↓
    2. Перевірити URL
         ↓
    3. DevTools → Network → Font
         ↓
    4. Перевірити HTTP status
         ↓
    5. Перевірити Console
         ↓
    6. Перевірити Computed Styles
         ↓
    7. Перевірити font-weight
         ↓
    8. Перевірити підтримку glyphs
         ↓
    9. Перевірити fallback


---

# 101. Практичний Debugging

Якщо текст виглядає не тим шрифтом:

### Крок 1

Перевірити:

    font-family

### Крок 2

Перевірити:

    @font-face

### Крок 3

Перевірити:

    src: url(...)

### Крок 4

Відкрити:

    DevTools → Network → Font

### Крок 5

Перевірити:

    404
    CORS
    blocked

### Крок 6

Перевірити:

    font-weight
    font-style

### Крок 7

Перевірити:

    fallback


---

# 102. Як думати про Web Fonts

Не потрібно запам'ятовувати всі властивості окремо.

Основна модель:

    1. Який font-family?
             ↓
    2. Де файл?
             ↓
    3. Який формат?
             ↓
    4. Який weight/style?
             ↓
    5. Як поводитися під час loading?
             ↓
    6. Який fallback?
             ↓
    7. Як оптимізувати?
             ↓
    8. Чи підтримує потрібні символи?


---

# 103. Core — що потрібно знати

На базовому рівні потрібно знати:

    @font-face

    font-family

    src

    format()

    font-weight

    font-style

    font-display

    WOFF2

    fallback fonts

    font-family


---

# 104. Junior — що потрібно вміти

Junior повинен вміти:

- підключити Web Font;
- правильно налаштувати `@font-face`;
- використовувати WOFF2;
- підключити кілька weights;
- створити fallback;
- використовувати `font-display: swap`;
- перевірити завантаження в DevTools;
- знайти проблему з `404`;
- розуміти CORS;
- перевірити підтримку кирилиці;
- не завантажувати непотрібні weights.


---

# 105. Middle — що потрібно знати

Middle повинен розуміти:

- variable fonts;
- font axes;
- `unicode-range`;
- font subsetting;
- preload;
- FOIT/FOUT;
- layout shift;
- font metrics;
- `size-adjust`;
- `font-size-adjust`;
- CORS;
- performance;
- critical fonts;
- self-hosting;
- typography tokens.


---

# 106. Senior — що потрібно розуміти

Senior повинен мислити системно:

    design
       ↓
    typography
       ↓
    font files
       ↓
    network
       ↓
    browser font loading
       ↓
    rendering
       ↓
    layout stability
       ↓
    performance
       ↓
    accessibility

Тобто Web Fonts — це не просто:

    @font-face { ... }

а частина frontend performance architecture.


---

# 107. Питання зі співбесіди

### 1. Що таке @font-face?

Правильна відповідь:

`@font-face` дозволяє описати Web Font, який браузер може завантажити та використовувати через CSS.


---

### 2. Який формат шрифту краще використовувати для сучасного Web?

Зазвичай:

    WOFF2


---

### 3. Навіщо потрібен font-weight у @font-face?

Щоб повідомити браузеру, яке накреслення відповідає конкретному файлу.


---

### 4. Що таке font-display?

Визначає поведінку браузера під час завантаження Web Font.


---

### 5. Що таке FOIT?

Flash of Invisible Text — текст тимчасово невидимий, поки браузер очікує шрифт.


---

### 6. Що таке FOUT?

Flash of Unstyled Text — спочатку відображається fallback-шрифт, потім Web Font.


---

### 7. Навіщо потрібен fallback?

Якщо Web Font недоступний або не завантажився, браузер може використати альтернативний шрифт.


---

### 8. Що таке Variable Font?

Один font file може містити широкий діапазон варіацій, наприклад weight або width.


---

### 9. Навіщо потрібен unicode-range?

Щоб обмежити font face певним набором Unicode-символів і оптимізувати завантаження.


---

### 10. Чому не потрібно завантажувати 10 weights?

Тому що кожен зайвий файл збільшує мережеве навантаження та може погіршити performance.


---

### 11. Що перевірити, якщо шрифт не працює?

    URL
    Network
    status code
    CORS
    font-family
    font-weight
    font-style
    Console


---

### 12. Чим self-hosted font відрізняється від external font service?

Self-hosted знаходиться під контролем самого проєкту, а external font service завантажується зі сторонньої інфраструктури.


---

# 108. Міні-шпаргалка

    /* 1. Підключення */

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter.woff2") format("woff2");
        font-weight: 400;
        font-style: normal;
        font-display: swap;
    }


    /* 2. Використання */

    body {
        font-family: "Inter", system-ui, sans-serif;
    }


    /* 3. Інший weight */

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter-bold.woff2") format("woff2");
        font-weight: 700;
        font-style: normal;
        font-display: swap;
    }


    /* 4. Використання */

    h1 {
        font-weight: 700;
    }


---

# 109. Найважливіші властивості

    @font-face

    font-family

    src

    format()

    font-weight

    font-style

    font-stretch

    font-display

    font-variation-settings

    font-optical-sizing

    font-feature-settings

    font-kerning

    font-synthesis

    font-size-adjust

    size-adjust


---

# 110. Найважливіші формати

    WOFF2 → основний сучасний формат

    WOFF → fallback / legacy support

    TTF → загальний формат шрифту

    OTF → загальний формат шрифту

    EOT → legacy


---

# 111. Найважливіша performance-модель

    менше font files
          ↓
    менше weights
          ↓
    WOFF2
          ↓
    subset
          ↓
    правильний font-display
          ↓
    хороший fallback
          ↓
    стабільні layout metrics


---

# 112. Найважливіша модель fallback

    Web Font
        ↓
    не завантажився?
        ↓
    system font
        ↓
    generic family


Приклад:

    font-family:
        "Inter",
        system-ui,
        sans-serif;


---

# 113. Найважливіша модель @font-face

Запам'ятати:

    @font-face {
        font-family: "Name";
        src: url("font.woff2") format("woff2");
        font-weight: 400;
        font-style: normal;
        font-display: swap;
    }

Потім:

    element {
        font-family: "Name", sans-serif;
        font-weight: 400;
    }


---

# 114. Практичний checklist для проєкту

Перед production:

    [ ] WOFF2 використовується
    [ ] непотрібні weights видалені
    [ ] fallback налаштований
    [ ] font-display продуманий
    [ ] Cyrillic підтримується
    [ ] Latin підтримується
    [ ] шрифти не надто великі
    [ ] шляхи правильні
    [ ] Network перевірений
    [ ] CORS перевірений
    [ ] layout shift перевірений
    [ ] критичні шрифти визначені
    [ ] preload використовується лише за потреби


---

# 115. Головна модель мислення

Web Fonts потрібно розглядати не тільки як дизайн.

Є чотири рівні:

    1. DESIGN
       Який шрифт потрібен?

           ↓

    2. CSS
       Як його описати через @font-face?

           ↓

    3. NETWORK
       Як швидко завантажити файл?

           ↓

    4. RENDERING
       Як зробити так, щоб текст швидко,
       стабільно та доступно відобразився?


---

# 116. Що потрібно запам'ятати

1. `@font-face` підключає Web Font до CSS.

2. Для сучасного Web зазвичай використовують `WOFF2`.

3. Один `font-family` може мати багато `font-weight`.

4. `font-weight` у `@font-face` повинен відповідати реальному накресленню.

5. Завжди бажано мати fallback.

6. `font-display: swap` — хороший базовий варіант для звичайного тексту.

7. Не потрібно завантажувати всі можливі weights.

8. Variable Fonts можуть об'єднати багато варіантів в одному файлі.

9. `unicode-range` та subsetting допомагають оптимізувати розмір шрифтів.

10. Web Fonts впливають на performance.

11. Web Fonts можуть впливати на layout stability.

12. Шрифт повинен підтримувати потрібні символи, особливо Cyrillic для українського сайту.

13. DevTools → Network → Font — один із головних інструментів debugging.

14. `font-family` — це логічне ім'я шрифту, а `.woff2` — конкретний файл.

15. Хороший Web Font setup — це баланс між дизайном, performance, accessibility та стабільністю.


---

# 117. Що потрібно вміти після цієї теми

Після вивчення `06-web-fonts` ти повинен уміти:

- пояснити, що таке Web Font;
- відрізнити system font від Web Font;
- створити `@font-face`;
- підключити WOFF2;
- правильно вказати `font-family`;
- правильно вказати `font-weight`;
- правильно вказати `font-style`;
- використовувати fallback;
- пояснити `font-display`;
- пояснити FOIT і FOUT;
- підключити кілька накреслень;
- розуміти Variable Fonts;
- розуміти `unicode-range`;
- розуміти font subsetting;
- перевірити Web Font через DevTools;
- знайти помилку `404`;
- розуміти базові CORS-проблеми;
- оптимізувати кількість font files;
- враховувати layout shift;
- враховувати accessibility;
- побудувати базову typography system для frontend-проєкту.


---

# 118. Фінальна схема

    WEB FONT
        │
        ├── @font-face
        │
        ├── font-family
        │
        ├── src
        │    └── WOFF2
        │
        ├── font-weight
        │
        ├── font-style
        │
        ├── font-display
        │
        ├── fallback
        │
        ├── Variable Fonts
        │
        ├── unicode-range
        │
        ├── subsetting
        │
        ├── performance
        │
        ├── accessibility
        │
        └── DevTools


---

# 119. Головне правило

> **Web Font — це не просто файл шрифту. Це частина системи typography + performance + accessibility.**

Правильний підхід:

    потрібний шрифт
        ↓
    потрібні weights
        ↓
    WOFF2
        ↓
    оптимальний розмір
        ↓
    @font-face
        ↓
    font-display
        ↓
    fallback
        ↓
    перевірка DevTools
        ↓
    стабільний та читабельний UI