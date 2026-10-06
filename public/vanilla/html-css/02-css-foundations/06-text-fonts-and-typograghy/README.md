## 06. Text, Fonts and Typography

CSS typography відповідає за те, **як текст виглядає, читається та поводиться в інтерфейсі**.

За допомогою CSS можна керувати:

- шрифтом;
- розміром тексту;
- товщиною;
- накресленням;
- висотою рядка;
- міжлітерною відстанню;
- вирівнюванням;
- переносами;
- регістром;
- декораціями;
- шириною текстового блоку;
- поведінкою тексту на різних екранах;
- завантаженням web fonts;
- fallback-шрифтами;
- variable fonts;
- доступністю та читабельністю.

Типографіка — це не просто:

    font-size: 16px;

Хороша типографічна система повинна враховувати:

    font family
    font size
    font weight
    line height
    letter spacing
    text width
    contrast
    hierarchy
    responsive behavior

Головна ідея:

> **Typography — це система, яка робить текст одночасно читабельним, структурованим і візуально узгодженим.**

---

### Основні групи CSS-властивостей

**Font:**

- `font-family`
- `font-size`
- `font-weight`
- `font-style`
- `font-variant`
- `font-stretch`
- `font`
- `font-feature-settings`
- `font-variation-settings`

**Text:**

- `color`
- `text-align`
- `text-indent`
- `text-transform`
- `text-decoration`
- `text-shadow`
- `text-overflow`
- `text-wrap`
- `white-space`
- `word-break`
- `overflow-wrap`
- `hyphens`

**Spacing:**

- `line-height`
- `letter-spacing`
- `word-spacing`

**Web fonts:**

- `@font-face`
- `font-display`
- `src`
- `font-weight`
- `font-style`
- `font-stretch`

**Modern typography:**

- variable fonts;
- fluid typography;
- `clamp()`;
- `font-optical-sizing`;
- OpenType features;
- `text-wrap: balance`;
- `text-wrap: pretty`;
- logical properties;
- responsive typography.

---

---

### Ключові поняття

- `font-family` — сімейство шрифту.
- `font-size` — розмір тексту.
- `font-weight` — товщина шрифту.
- `font-style` — normal, italic, oblique.
- `line-height` — висота рядка.
- `letter-spacing` — відстань між літерами.
- `word-spacing` — відстань між словами.
- `text-align` — горизонтальне вирівнювання тексту.
- `text-transform` — зміна регістру.
- `text-decoration` — підкреслення, закреслення тощо.
- `text-indent` — відступ першого рядка.
- `text-shadow` — тінь тексту.
- `white-space` — поведінка пробілів і переносів.
- `overflow-wrap` — можливість переносити довгі слова.
- `word-break` — правила переносу частин слів.
- `hyphens` — автоматичне перенесення слів.
- `text-overflow` — поведінка переповненого тексту.
- `@font-face` — підключення web font.
- `font-display` — поведінка шрифту під час завантаження.
- `font` — shorthand для font-властивостей.
- `rem` — одиниця від root `font-size`.
- `em` — одиниця, пов'язана з поточним font-size context.
- `ch` — одиниця, пов'язана з шириною символу `0`.
- `clamp()` — fluid typography з min/preferred/max.

---

### Що потрібно пам'ятати

1. `font-family` визначає не конкретний файл, а сімейство шрифту.
2. Завжди бажано мати fallback fonts.
3. `font-size` визначає розмір тексту.
4. `font-weight` визначає товщину.
5. `font-style` відповідає за italic/oblique.
6. `line-height` критично важливий для читабельності.
7. Для body text часто добре працює unitless `line-height`.
8. `letter-spacing` не потрібно змінювати без конкретної причини.
9. `text-align: justify` може створювати великі проміжки між словами.
10. `text-transform` змінює відображення тексту, але не його HTML-значення.
11. `text-overflow: ellipsis` сам по собі не створює `...`.
12. Для класичного single-line ellipsis потрібні `overflow: hidden`, `white-space: nowrap` і `text-overflow: ellipsis`.
13. `font-weight: 500` працює лише коректно, якщо шрифт має відповідне накреслення або browser може використати найближче.
14. `@font-face` дозволяє використовувати власні web fonts.
15. `font-display: swap` допомагає уникнути довгого приховування тексту під час завантаження шрифту.
16. `rem` зручний для глобальної типографіки.
17. `em` зручний для локального масштабування компонентів.
18. `clamp()` добре підходить для responsive typography.
19. Ширина текстового рядка сильно впливає на читабельність.
20. `max-width: 65ch` або близьке значення часто добре працює для основного тексту.
21. Не варто використовувати декоративний шрифт для великих обсягів тексту.
22. Системний fallback важливий навіть при використанні Google Fonts або власних font files.
23. Variable fonts дозволяють керувати багатьма параметрами одного font file.
24. Typography повинна бути частиною design system, а не набором випадкових значень.

---

# 1. font-family

`font-family` визначає, який шрифт використовувати.

    body {
        font-family: Arial, sans-serif;
    }

Тут:

    Arial

— основний шрифт.

    sans-serif

— fallback generic family.

Якщо Arial недоступний, браузер використає інший sans-serif шрифт.

---

# 2. Font Stack

Рекомендується вказувати декілька варіантів.

    body {
        font-family:
            Arial,
            Helvetica,
            sans-serif;
    }

Браузер перевіряє шрифти зліва направо.

Якщо перший недоступний — використовується наступний.

---

# 3. Generic Font Families

Основні generic families:

    serif
    sans-serif
    monospace
    cursive
    fantasy
    system-ui

Також існують спеціалізовані generic families, наприклад:

    ui-serif
    ui-sans-serif
    ui-monospace
    ui-rounded

---

# 4. Serif

Serif-шрифти мають декоративні зарубки.

Приклад:

    body {
        font-family: Georgia, serif;
    }

Часто використовуються для:

- книг;
- статей;
- editorial design;
- long-form content.

---

# 5. Sans-serif

Sans-serif не має зарубок.

Наприклад:

    body {
        font-family: Arial, sans-serif;
    }

Часто використовується:

- у web applications;
- dashboard;
- SaaS;
- navigation;
- UI.

---

# 6. Monospace

У monospace кожен символ має однакову ширину.

Наприклад:

    code {
        font-family: monospace;
    }

Корисно для:

- коду;
- terminal output;
- technical documentation;
- номерів;
- деяких таблиць.

---

# 7. system-ui

`system-ui` дозволяє використовувати системний UI-шрифт.

Наприклад:

    body {
        font-family: system-ui, sans-serif;
    }

Це часто хороший варіант для сучасного UI.

---

# 8. System Font Stack

Можна використовувати системний stack:

    body {
        font-family:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
    }

Такі stack-и намагаються використати шрифт, який природно доступний у системі користувача.

---

# 9. Font Family з пробілами

Якщо назва шрифту містить пробіли, використовують лапки.

    body {
        font-family: "Open Sans", sans-serif;
    }

Наприклад:

    font-family: "Roboto Slab", serif;

---

# 10. font-size

`font-size` визначає розмір тексту.

    p {
        font-size: 16px;
    }

Але для сучасних проєктів часто:

    p {
        font-size: 1rem;
    }

---

# 11. font-size з rem

Наприклад:

    html {
        font-size: 16px;
    }

    body {
        font-size: 1rem;
    }

    h1 {
        font-size: 2.5rem;
    }

Тоді:

    1rem = 16px
    2.5rem = 40px

---

# 12. font-size з em

Наприклад:

    .card {
        font-size: 20px;
    }

    .card__title {
        font-size: 1.5em;
    }

Результат:

    1.5 × 20px = 30px

---

# 13. Responsive font-size

Замість:

    h1 {
        font-size: 48px;
    }

можна використовувати:

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

Тут:

    2rem

— мінімальний розмір.

    5vw

— fluid preferred value.

    4rem

— максимальний розмір.

---

# 14. font-weight

`font-weight` визначає товщину шрифту.

Наприклад:

    font-weight: 400;

або:

    font-weight: 700;

Типові значення:

    100
    200
    300
    400
    500
    600
    700
    800
    900

---

# 15. Semantic Font Weights

Часто використовують:

    400 → normal
    500 → medium
    600 → semibold
    700 → bold

Наприклад:

    body {
        font-weight: 400;
    }

    h1 {
        font-weight: 700;
    }

---

# 16. Keyword Font Weights

Можна використовувати:

    font-weight: normal;
    font-weight: bold;

`normal` зазвичай відповідає `400`.

`bold` зазвичай відповідає `700`.

Але конкретний шрифт може мати власну систему доступних weights.

---

# 17. Не кожен шрифт має всі weights

Наприклад, якщо font file містить тільки:

    400
    700

то:

    font-weight: 500;

може бути синтезований або замінений найближчим доступним weight залежно від шрифту та браузера.

Тому при підключенні web font важливо знати, які накреслення реально доступні.

---

# 18. font-style

Основні значення:

    normal
    italic
    oblique

Наприклад:

    em {
        font-style: italic;
    }

---

# 19. italic vs oblique

`italic` зазвичай використовує спеціальне italic-накреслення шрифту.

    font-style: italic;

`oblique` означає похиле накреслення.

    font-style: oblique;

Якщо спеціального накреслення немає, браузер може синтезувати похилий варіант.

---

# 20. font-stretch

`font-stretch` керує шириною glyphs, якщо шрифт підтримує відповідні варіації.

Наприклад:

    font-stretch: condensed;

або:

    font-stretch: expanded;

Це особливо цікаво для variable fonts.

---

# 21. line-height

`line-height` визначає висоту рядка.

Наприклад:

    p {
        line-height: 1.6;
    }

Для тексту це одна з найважливіших властивостей.

---

# 22. Unitless line-height

Рекомендований підхід:

    body {
        line-height: 1.5;
    }

Якщо:

    font-size: 16px;

то приблизна висота рядка:

    16 × 1.5 = 24px

Якщо font-size зміниться:

    font-size: 20px;

то line-height стане:

    20 × 1.5 = 30px

---

# 23. line-height у px

Можна задати:

    p {
        line-height: 24px;
    }

Але це менш гнучко.

Якщо font-size зміниться:

    font-size: 24px;

фіксований `24px` може бути недостатнім.

---

# 24. line-height у rem

Також можна:

    p {
        line-height: 1.5rem;
    }

Але для body text часто unitless значення є більш гнучким.

---

# 25. Типові line-height

Орієнтовно:

    headings → 1.1–1.3
    body text → 1.4–1.7
    UI labels → 1.2–1.5

Це не жорсткі правила.

Конкретне значення залежить від:

- font;
- font-size;
- weight;
- ширини рядка;
- дизайну;
- мови.

---

# 26. letter-spacing

`letter-spacing` визначає відстань між символами.

Наприклад:

    h1 {
        letter-spacing: -0.02em;
    }

Для uppercase labels:

    .label {
        letter-spacing: 0.05em;
    }

---

# 27. Не зловживати letter-spacing

Не потрібно автоматично додавати:

    letter-spacing: 2px;

до всього тексту.

Невелика зміна може бути корисною для:

- headings;
- uppercase labels;
- buttons;
- navigation.

Але надмірний spacing може погіршити читабельність.

---

# 28. word-spacing

`word-spacing` керує відстанню між словами.

    p {
        word-spacing: 0.1em;
    }

Використовується рідше, ніж `letter-spacing`.

---

# 29. text-align

Основні значення:

    left
    right
    center
    justify
    start
    end

Наприклад:

    h1 {
        text-align: center;
    }

---

# 30. Logical text alignment

Для internationalized layouts часто краще:

    text-align: start;

замість:

    text-align: left;

А:

    text-align: end;

замість:

    text-align: right;

Це краще працює з різними writing directions.

---

# 31. text-indent

`text-indent` задає відступ першого рядка.

    p {
        text-indent: 2em;
    }

Це часто зустрічається в editorial/print typography.

---

# 32. text-transform

`text-transform` змінює відображення регістру.

Основні значення:

    none
    uppercase
    lowercase
    capitalize

Приклад:

    .label {
        text-transform: uppercase;
    }

HTML:

    <span class="label">important</span>

Відображатиметься як:

    IMPORTANT

---

# 33. text-transform не змінює HTML

Важливий момент:

    text-transform: uppercase;

змінює лише візуальне представлення.

Оригінальний текст у DOM залишається тим самим.

Тому не потрібно використовувати CSS як заміну семантичному контенту.

---

# 34. text-decoration

Керує декорацією тексту.

Наприклад:

    a {
        text-decoration: underline;
    }

Можна:

    text-decoration: none;

---

# 35. Частини text-decoration

Можна керувати окремими параметрами:

    text-decoration-line
    text-decoration-color
    text-decoration-style
    text-decoration-thickness

Наприклад:

    a {
        text-decoration-line: underline;
        text-decoration-color: currentColor;
        text-decoration-style: solid;
        text-decoration-thickness: 2px;
    }

---

# 36. text-decoration-style

Можливі стилі:

    solid
    double
    dotted
    dashed
    wavy

Наприклад:

    .warning {
        text-decoration-line: underline;
        text-decoration-style: wavy;
    }

---

# 37. text-decoration-thickness

Можна задати товщину:

    a {
        text-decoration-thickness: 2px;
    }

---

# 38. text-underline-offset

Корисна сучасна властивість:

    a {
        text-underline-offset: 0.2em;
    }

Вона визначає відстань underline від тексту.

---

# 39. Не прибирати underline без причини

Погано:

    a {
        text-decoration: none;
    }

Якщо посилання більше нічим не відрізняється від звичайного тексту, користувачу може бути складно зрозуміти, що це link.

Особливо важливо зберігати зрозумілий link styling у текстовому контенті.

---

# 40. text-shadow

Додає тінь тексту.

    h1 {
        text-shadow: 2px 2px 4px rgb(0 0 0 / 30%);
    }

Синтаксис:

    text-shadow:
        offset-x
        offset-y
        blur
        color;

---

# 41. text-shadow — не для всього

Не потрібно використовувати сильну тінь на кожному тексті.

Погано:

    body {
        text-shadow: 2px 2px 5px black;
    }

Текст може стати менш читабельним.

---

# 42. white-space

`white-space` керує пробілами та переносами рядків.

Основні значення:

    normal
    nowrap
    pre
    pre-wrap
    pre-line
    break-spaces

---

# 43. white-space: nowrap

Забороняє звичайний перенос рядка.

    .button {
        white-space: nowrap;
    }

Корисно для:

- коротких кнопок;
- badges;
- navigation labels;
- компактних UI elements.

---

# 44. white-space: pre

Зберігає whitespace та перенос рядків.

    .code {
        white-space: pre;
    }

Корисно для форматованого тексту.

---

# 45. white-space: pre-wrap

Зберігає whitespace, але дозволяє переносити рядки.

    .code {
        white-space: pre-wrap;
    }

---

# 46. overflow-wrap

Дозволяє браузеру переносити довгі слова, коли вони не поміщаються.

    .content {
        overflow-wrap: break-word;
    }

Це корисно для:

- URL;
- email;
- довгих ідентифікаторів;
- user-generated content.

---

# 47. word-break

`word-break` визначає правила розриву слів.

Наприклад:

    .content {
        word-break: break-word;
    }

Але для загального тексту не потрібно використовувати агресивні режими переносу без потреби.

---

# 48. hyphens

`hyphens` дозволяє браузеру використовувати автоматичне перенесення слів.

    article {
        hyphens: auto;
    }

Результат залежить від:

- мови;
- словника браузера;
- підтримки браузером;
- `lang` в HTML.

---

# 49. lang і Typography

HTML повинен містити правильну мову:

    <html lang="uk">

Це важливо не тільки для accessibility.

Мова може впливати на:

- screen readers;
- hyphenation;
- pronunciation;
- text processing.

---

# 50. text-overflow

`text-overflow` визначає, як показувати переповнений текст.

Наприклад:

    text-overflow: ellipsis;

Але важливо:

> `text-overflow: ellipsis` сам по собі не обрізає текст.

---

# 51. Single-line Ellipsis

Класичний pattern:

    .title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

HTML:

    <h2 class="title">
        Дуже довгий заголовок, який не поміщається
    </h2>

Браузер може показати:

    Дуже довгий заголовок, який...

---

# 52. Multi-line Text Truncation

Для обмеження кількості рядків у сучасному CSS можна використовувати line clamping.

Наприклад:

    .description {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }

Для production-проєктів потрібно враховувати browser support і конкретну ціль.

---

# 53. text-wrap

Сучасний CSS має:

    text-wrap

Наприклад:

    h1 {
        text-wrap: balance;
    }

Це допомагає браузеру розподілити текст заголовка між рядками більш збалансовано.

---

# 54. text-wrap: balance

Особливо корисно для:

- headings;
- cards;
- hero titles;
- коротких заголовків.

Наприклад:

    h1 {
        max-width: 20ch;
        text-wrap: balance;
    }

---

# 55. text-wrap: pretty

Можна використовувати:

    p {
        text-wrap: pretty;
    }

Це дозволяє браузеру покращувати розподіл тексту та уникати деяких небажаних кінців рядків.

---

# 56. font shorthand

`font` — shorthand для font-властивостей.

Наприклад:

    body {
        font:
            400 1rem / 1.6
            system-ui,
            sans-serif;
    }

Тут:

    400 → font-weight
    1rem → font-size
    1.6 → line-height
    system-ui, sans-serif → font-family

---

# 57. Правильний порядок font shorthand

Типовий pattern:

    font:
        [style]
        [variant]
        [weight]
        [stretch]
        size / line-height
        family;

Наприклад:

    font:
        italic 700 1.5rem / 1.2
        Georgia,
        serif;

---

# 58. Font shorthand — важливий нюанс

Shorthand `font` скидає інші font-related properties до їх initial values, якщо вони не задані.

Тому:

    font: 1rem sans-serif;

може скинути деякі попередньо задані font properties.

У production CSS це потрібно враховувати.

---

# 59. @font-face

`@font-face` дозволяє підключити власний web font.

Наприклад:

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter.woff2") format("woff2");
        font-weight: 400;
        font-style: normal;
    }

Після цього:

    body {
        font-family: "Inter", sans-serif;
    }

---

# 60. WOFF2

Для web fonts найчастіше використовують:

    .woff2

Це сучасний та ефективний формат для web.

Наприклад:

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter.woff2") format("woff2");
    }

---

# 61. Підключення кількох weights

Наприклад:

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter-400.woff2") format("woff2");
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter-700.woff2") format("woff2");
        font-weight: 700;
        font-style: normal;
    }

Тепер:

    body {
        font-family: "Inter", sans-serif;
        font-weight: 400;
    }

    h1 {
        font-weight: 700;
    }

---

# 62. @font-face з italic

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter-italic.woff2") format("woff2");
        font-weight: 400;
        font-style: italic;
    }

---

# 63. font-display

`font-display` визначає поведінку тексту під час завантаження web font.

Основні значення:

    auto
    block
    swap
    fallback
    optional

---

# 64. font-display: swap

Дуже поширений варіант:

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter.woff2") format("woff2");
        font-display: swap;
    }

Ідея:

1. browser показує fallback;
2. web font завантажується;
3. після завантаження текст перемальовується web font.

Це допомагає користувачу швидше побачити текст.

---

# 65. Font Loading і Performance

Велика кількість font files може негативно впливати на performance.

Наприклад, не потрібно без потреби завантажувати:

    100
    200
    300
    400
    500
    600
    700
    800
    900

Якщо проєкту реально потрібні тільки:

    400
    600
    700

краще не завантажувати зайві weights.

---

# 66. font-weight і @font-face

Важливо правильно описати weight:

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter-600.woff2") format("woff2");
        font-weight: 600;
        font-style: normal;
    }

Тоді:

    .button {
        font-weight: 600;
    }

Browser знає, який font file використовувати.

---

# 67. font-style в @font-face

Для italic:

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter-italic.woff2") format("woff2");
        font-weight: 400;
        font-style: italic;
    }

Тоді:

    em {
        font-style: italic;
    }

може використовувати правильний italic font file.

---

# 68. Variable Fonts

Variable font може містити багато варіацій в одному font file.

Наприклад:

    font-weight: 100 900;

Приклад:

    @font-face {
        font-family: "InterVariable";
        src: url("/fonts/inter-variable.woff2") format("woff2");
        font-weight: 100 900;
        font-style: normal;
    }

Тепер можна:

    h1 {
        font-weight: 750;
    }

Якщо font підтримує такий weight range.

---

# 69. Variable Font Axes

Variable fonts можуть мати axes:

- `wght` — weight;
- `wdth` — width;
- `slnt` — slant;
- `ital` — italic;
- `opsz` — optical size.

---

# 70. font-variation-settings

Низькорівневий контроль variable font:

    .title {
        font-variation-settings:
            "wght" 700,
            "wdth" 90;
    }

Але якщо є стандартна CSS-властивість, краще використовувати її.

Наприклад:

    font-weight: 700;

краще, ніж:

    font-variation-settings: "wght" 700;

---

# 71. font-optical-sizing

Для variable fonts із optical size axis:

    body {
        font-optical-sizing: auto;
    }

Або:

    font-optical-sizing: none;

Це дозволяє шрифту адаптувати glyph design відповідно до розміру тексту, якщо font це підтримує.

---

# 72. font-kerning

Керує використанням kerning.

    body {
        font-kerning: normal;
    }

Kerning визначає відстань між конкретними парами символів.

Наприклад:

    A + V

можуть мати спеціально скориговану відстань.

---

# 73. font-feature-settings

Дозволяє вмикати OpenType features.

Наприклад:

    .number {
        font-feature-settings: "tnum";
    }

Це може використовувати tabular numerals, якщо шрифт підтримує feature.

---

# 74. font-variant

`font-variant` — shorthand для деяких типографічних варіантів.

Наприклад:

    font-variant: small-caps;

Або:

    font-variant-numeric: tabular-nums;

---

# 75. Tabular Numbers

Для таблиць та financial data часто корисно:

    .price {
        font-variant-numeric: tabular-nums;
    }

Цифри отримують однакову ширину.

Це допомагає вирівнювати числові колонки.

---

# 76. Font Smoothing

Іноді можна зустріти:

    -webkit-font-smoothing: antialiased;

Це browser/platform-specific властивість.

Не варто використовувати її без розуміння наслідків.

Вона не є універсальним способом "зробити шрифт красивішим".

---

# 77. Color тексту

Типографіка також включає колір:

    body {
        color: #222;
    }

Наприклад:

    .muted {
        color: #6b7280;
    }

    .error {
        color: #dc2626;
    }

---

# 78. Типографічна ієрархія

Типовий UI може мати:

    h1 → найбільший
    h2 → великий
    h3 → середній
    body → основний
    small → допоміжний

Наприклад:

    h1 {
        font-size: 2.5rem;
        line-height: 1.1;
        font-weight: 700;
    }

    h2 {
        font-size: 2rem;
        line-height: 1.2;
        font-weight: 700;
    }

    p {
        font-size: 1rem;
        line-height: 1.6;
    }

---

# 79. Не робити Typography тільки через розмір

Ієрархія може створюватися через:

- size;
- weight;
- line-height;
- color;
- spacing;
- position;
- contrast.

Наприклад:

    .meta {
        font-size: 0.875rem;
        color: #6b7280;
    }

    .title {
        font-size: 1.75rem;
        font-weight: 700;
    }

---

# 80. Заголовки та line-height

Для великих headings часто потрібен менший line-height:

    h1 {
        font-size: clamp(2rem, 6vw, 5rem);
        line-height: 1.05;
    }

Для body text:

    p {
        line-height: 1.6;
    }

Однаковий `line-height` для всього тексту — не завжди хороший підхід.

---

# 81. Ширина тексту

Розмір шрифту — не єдиний фактор читабельності.

Наприклад:

    article {
        max-width: 65ch;
    }

Якщо рядок занадто довгий, очам важче переходити до наступного рядка.

---

# 82. max-width для тексту

Практичний pattern:

    .article {
        max-width: 70ch;
        margin-inline: auto;
    }

Для заголовків може бути:

    h1 {
        max-width: 20ch;
    }

---

# 83. Typography і Responsive Design

Погано:

    h1 {
        font-size: 64px;
    }

На маленькому екрані заголовок може бути занадто великим.

Краще:

    h1 {
        font-size: clamp(2rem, 6vw, 4rem);
    }

---

# 84. Responsive Typography System

Наприклад:

    :root {
        --text-sm: 0.875rem;
        --text-base: 1rem;
        --text-lg: 1.125rem;
        --text-xl: 1.5rem;
        --text-2xl: 2rem;
        --text-3xl: 3rem;
    }

Використання:

    body {
        font-size: var(--text-base);
    }

    h1 {
        font-size: var(--text-3xl);
    }

---

# 85. Fluid Typography System

Можна зробити scale fluid:

    :root {
        --text-body: clamp(1rem, 1vw + 0.75rem, 1.25rem);
        --text-h1: clamp(2rem, 5vw, 4rem);
        --text-h2: clamp(1.5rem, 3vw, 2.5rem);
    }

---

# 86. Typography Tokens

У design system можна створити:

    :root {
        --font-body: system-ui, sans-serif;
        --font-heading: Georgia, serif;

        --text-sm: 0.875rem;
        --text-base: 1rem;
        --text-lg: 1.125rem;
        --text-xl: 1.5rem;
        --text-2xl: 2rem;

        --leading-tight: 1.2;
        --leading-normal: 1.5;
        --leading-relaxed: 1.7;
    }

---

# 87. Використання Typography Tokens

    body {
        font-family: var(--font-body);
        font-size: var(--text-base);
        line-height: var(--leading-normal);
    }

    h1,
    h2,
    h3 {
        font-family: var(--font-heading);
        line-height: var(--leading-tight);
    }

---

# 88. Serif для headings, Sans-serif для UI

Один із можливих patterns:

    :root {
        --font-body: system-ui, sans-serif;
        --font-heading: Georgia, serif;
    }

    body {
        font-family: var(--font-body);
    }

    h1,
    h2,
    h3 {
        font-family: var(--font-heading);
    }

Це не правило, а лише один із типографічних підходів.

---

# 89. Font fallback

Навіть якщо використовується custom font:

    body {
        font-family:
            "Inter",
            system-ui,
            sans-serif;
    }

Якщо `Inter` не завантажився або недоступний, використовується fallback.

Fallback повинен бути схожим за характеристиками.

---

# 90. Font Metrics

Різні шрифти можуть мати різні:

- x-height;
- ascender;
- descender;
- glyph width;
- line box behavior.

Тому:

    font-size: 16px;

не означає, що два різних шрифти виглядатимуть однаково за розміром.

Це важливо при заміні font family.

---

# 91. Font Size ≠ Visual Size

Наприклад:

    font-size: 16px;

у одного шрифту може виглядати більшим, ніж у іншого.

Причина — різні font metrics.

Тому typography потрібно оцінювати в реальному UI, а не тільки за числовим значенням.

---

# 92. Accessibility і Font Size

Не варто будувати сайт так, щоб користувач не міг збільшити текст.

Особливо важливо:

- використовувати relative units там, де це доречно;
- не блокувати масштабування сторінки;
- підтримувати responsive layout;
- перевіряти текст при збільшенні;
- забезпечувати достатній contrast.

---

# 93. Accessibility і Line Height

Занадто маленький line-height:

    line-height: 1;

може зробити текст важким для читання.

Для body text часто краще:

    line-height: 1.5;

або:

    line-height: 1.6;

---

# 94. Accessibility і Letter Spacing

Не слід створювати текст із надмірно щільним spacing:

    letter-spacing: -0.1em;

без реальної дизайнерської причини.

Так само надмірний позитивний spacing може ускладнити читання.

---

# 95. Accessibility і Links

Не варто робити всі links:

    color: inherit;
    text-decoration: none;

без альтернативного візуального сигналу.

Краще:

    a {
        color: #2563eb;
        text-decoration: underline;
        text-underline-offset: 0.2em;
    }

---

# 96. Typography та HTML Semantics

CSS не замінює семантичний HTML.

Потрібно використовувати:

    <h1>
    <h2>
    <h3>
    <p>
    <strong>
    <em>
    <small>
    <blockquote>
    <code>

а не:

    <div class="big-text">...</div>

для всього.

---

# 97. strong vs font-weight

Не потрібно використовувати:

    <span style="font-weight: 700">

для семантичного важливого тексту.

Якщо текст важливий за змістом:

    <strong>Важлива інформація</strong>

CSS відповідає за presentation.

HTML відповідає за semantics.

---

# 98. em vs font-style

`<em>` — семантичний emphasis.

CSS:

    font-style: italic;

— лише presentation.

Наприклад:

    <p>
        Це <em>дуже важливо</em>.
    </p>

Це краще, ніж просто:

    <span style="font-style: italic;">
        дуже важливо
    </span>

---

# 99. Практичний приклад: базова Typography

    :root {
        --font-body: system-ui, sans-serif;
        --font-heading: system-ui, sans-serif;

        --text-base: 1rem;
        --text-lg: 1.125rem;
        --text-xl: 1.5rem;
        --text-2xl: 2rem;
        --text-3xl: clamp(2rem, 5vw, 4rem);

        --leading-body: 1.6;
        --leading-heading: 1.1;
    }

    body {
        margin: 0;
        font-family: var(--font-body);
        font-size: var(--text-base);
        line-height: var(--leading-body);
        color: #222;
    }

    h1,
    h2,
    h3 {
        margin-block: 0;
        font-family: var(--font-heading);
        line-height: var(--leading-heading);
    }

    h1 {
        font-size: var(--text-3xl);
    }

    h2 {
        font-size: var(--text-2xl);
    }

    p {
        max-width: 65ch;
    }

---

# 100. Практичний приклад: Article

HTML:

    <article class="article">
        <h1>Основи CSS Typography</h1>

        <p class="article__lead">
            Typography визначає, наскільки зручно користувачу
            читати та сприймати інформацію.
        </p>

        <p>
            Правильно підібраний font-size, line-height та
            ширина текстового блоку значно покращують читабельність.
        </p>
    </article>

CSS:

    .article {
        width: min(100% - 2rem, 70ch);
        margin-inline: auto;
    }

    .article h1 {
        font-size: clamp(2rem, 5vw, 4rem);
        line-height: 1.05;
        text-wrap: balance;
    }

    .article__lead {
        font-size: 1.25rem;
        line-height: 1.5;
    }

    .article p {
        line-height: 1.7;
    }

---

# 101. Практичний приклад: Button Typography

    .button {
        font-family: inherit;
        font-size: 1rem;
        font-weight: 600;
        line-height: 1.2;

        padding: 0.75em 1.25em;

        color: white;
        background-color: #2563eb;

        border: 0;
        border-radius: 0.5rem;

        cursor: pointer;
    }

Тут:

    font-family: inherit;

дозволяє кнопці використовувати typography body.

---

# 102. Typography Form Controls

Browser може мати власні стилі для form controls.

Тому часто використовують:

    button,
    input,
    textarea,
    select {
        font: inherit;
    }

Це дозволяє form controls використовувати typography сторінки.

---

# 103. Практичний Reset Typography

Можна почати з:

    body {
        margin: 0;
        font-family: system-ui, sans-serif;
        line-height: 1.5;
    }

    button,
    input,
    textarea,
    select {
        font: inherit;
    }

    button {
        cursor: pointer;
    }

Це хороший базовий foundation для невеликого проєкту.

---

# 104. Не скидати всі Typography Styles без причини

Наприклад:

    * {
        font-family: Arial;
    }

може бути занадто грубим рішенням.

Краще централізувати typography:

    body {
        font-family: system-ui, sans-serif;
    }

а спеціальні компоненти перевизначати за потреби.

---

# 105. Порядок мислення при створенні Typography

Спочатку:

    font-family

Потім:

    font-size

Потім:

    line-height

Потім:

    font-weight

Потім:

    color

Після цього:

    letter-spacing
    text-transform
    text-decoration

І вже потім — декоративні ефекти.

---

# 106. Типові помилки

## 1. Вказувати тільки один font-family

Погано:

    body {
        font-family: "SomeFont";
    }

Краще:

    body {
        font-family:
            "SomeFont",
            system-ui,
            sans-serif;
    }

---

## 2. Використовувати надто багато fonts

Погано:

    font-family: Font1;
    font-family: Font2;
    font-family: Font3;

В одному проєкті зазвичай краще мати обмежену типографічну систему.

---

## 3. Використовувати px для всього

Погано:

    h1 {
        font-size: 48px;
    }

    h2 {
        font-size: 36px;
    }

    p {
        font-size: 16px;
    }

Це може бути нормально для fixed design, але для responsive system часто краще:

    rem
    clamp()
    em

---

## 4. Використовувати однаковий line-height всюди

Погано:

    * {
        line-height: 1.2;
    }

Body text може потребувати:

    line-height: 1.6;

А heading:

    line-height: 1.1;

---

## 5. Використовувати занадто маленький line-height

Погано:

    p {
        line-height: 1;
    }

Це може створити проблеми з читабельністю.

---

## 6. Надмірний letter-spacing

Погано:

    p {
        letter-spacing: 0.2em;
    }

Основний текст стане важко читати.

---

## 7. Використовувати text-transform замість правильного тексту

Наприклад:

    .title {
        text-transform: uppercase;
    }

Це presentation, а не content transformation.

Не потрібно покладатися на CSS uppercase для semantic meaning.

---

## 8. Прибирати underline у всіх links

Погано:

    a {
        text-decoration: none;
    }

без іншого visual indication.

---

## 9. Забувати fallback font

Погано:

    body {
        font-family: "Inter";
    }

Краще:

    body {
        font-family: "Inter", system-ui, sans-serif;
    }

---

## 10. Завантажувати зайві font weights

Якщо використовуються тільки:

    400
    700

не потрібно без причини завантажувати:

    100
    200
    300
    500
    600
    800
    900

---

## 11. Використовувати text-overflow без умов

Погано:

    .title {
        text-overflow: ellipsis;
    }

Самого цього недостатньо.

Для single-line ellipsis:

    .title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

---

## 12. Робити надто довгі рядки

Погано:

    article {
        width: 100%;
    }

Краще:

    article {
        max-width: 65ch;
    }

---

## 13. Використовувати декоративний шрифт для body

Декоративний шрифт може добре виглядати в:

    logo
    heading
    poster

але бути поганим для:

    paragraphs
    documentation
    forms
    navigation

---

# 107. Питання зі співбесіди

### 1. Що таке typography?

Typography — система оформлення тексту, яка визначає його:

- font;
- size;
- weight;
- spacing;
- line-height;
- alignment;
- readability.

---

### 2. Що робить font-family?

Визначає font family та fallback fonts.

---

### 3. Що таке font stack?

Послідовність шрифтів:

    font-family:
        Arial,
        Helvetica,
        sans-serif;

Browser використовує перший доступний.

---

### 4. Чим serif відрізняється від sans-serif?

Serif має зарубки.

Sans-serif — без зарубок.

---

### 5. Що таке monospace?

Шрифт, у якому символи мають однакову ширину.

Часто використовується для code.

---

### 6. Що робить font-size?

Визначає розмір тексту.

---

### 7. Що робить font-weight?

Визначає товщину glyphs.

Наприклад:

    font-weight: 700;

---

### 8. Що робить font-style?

Визначає:

    normal
    italic
    oblique

---

### 9. Що робить line-height?

Визначає висоту рядка та впливає на читабельність.

---

### 10. Чому unitless line-height часто хороший?

Тому що він масштабується разом із font-size.

Наприклад:

    line-height: 1.5;

---

### 11. Що робить letter-spacing?

Керує відстанню між символами.

---

### 12. Що робить word-spacing?

Керує відстанню між словами.

---

### 13. Що робить text-align?

Вирівнює текст.

Наприклад:

    text-align: center;

---

### 14. Що робить text-transform?

Змінює візуальний регістр:

    uppercase
    lowercase
    capitalize

---

### 15. Чи змінює text-transform HTML-текст?

Ні.

Він змінює лише presentation.

---

### 16. Що робить text-decoration?

Керує текстовими декораціями:

    underline
    line-through
    overline

---

### 17. Чим text-decoration відрізняється від border-bottom?

`text-decoration` є частиною механізму декорації тексту.

`border-bottom` — рамка елемента.

Для звичайних links зазвичай логічніше використовувати `text-decoration`.

---

### 18. Що робить white-space?

Керує whitespace та переносами рядків.

---

### 19. Що робить overflow-wrap?

Дозволяє переносити довгі слова або інші довгі неперервні фрагменти, щоб уникнути overflow.

---

### 20. Що робить text-overflow?

Визначає, як показувати текст, який переповнює доступний простір.

Для класичного ellipsis потрібні додаткові властивості.

---

### 21. Як зробити single-line ellipsis?

    .title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

---

### 22. Що таке @font-face?

Правило для підключення web fonts.

---

### 23. Що таке font-display?

Визначає поведінку тексту під час завантаження web font.

---

### 24. Для чого font-display: swap?

Щоб текст міг відображатися fallback-шрифтом, поки custom font завантажується.

---

### 25. Що таке variable font?

Font, який містить варіативні параметри в одному font file.

Наприклад:

    weight
    width
    slant
    optical size

---

### 26. Що таке @font-face font-weight: 100 900?

Це означає, що font face підтримує variable weight range від 100 до 900.

---

### 27. Чому потрібно вказувати fallback font?

Тому що custom font:

- може не завантажитися;
- може бути недоступним;
- може завантажуватися із затримкою.

---

### 28. Що таке fluid typography?

Типографіка, яка плавно масштабується залежно від доступного простору.

Наприклад:

    font-size: clamp(2rem, 5vw, 4rem);

---

### 29. Для чого max-width: 65ch?

Для обмеження ширини текстового рядка та покращення читабельності.

---

### 30. Що краще для body text — serif чи sans-serif?

Немає універсальної відповіді.

Важливі:

- конкретний font;
- розмір;
- line-height;
- contrast;
- ширина рядка;
- контекст.

---

# 108. Практичний чекліст Typography

Перед завершенням сторінки перевір:

### Font

    [ ] Чи правильно вибраний font-family?
    [ ] Чи є fallback?
    [ ] Чи потрібні всі завантажені weights?
    [ ] Чи правильно працює web font?

### Size

    [ ] Чи readable body text?
    [ ] Чи є hierarchy?
    [ ] Чи responsive headings?

### Weight

    [ ] Чи використовуються потрібні weights?
    [ ] Чи не занадто жирний body text?

### Line-height

    [ ] Чи readable paragraphs?
    [ ] Чи не занадто щільні headings?

### Width

    [ ] Чи не надто довгі рядки?
    [ ] Чи використовується max-width для article content?

### Responsive

    [ ] Чи не занадто великий h1 на mobile?
    [ ] Чи не ламаються buttons?
    [ ] Чи працює text wrapping?

### Accessibility

    [ ] Чи достатній contrast?
    [ ] Чи зрозумілі links?
    [ ] Чи не блокується масштабування?
    [ ] Чи є semantic HTML?

---

# 109. Хороший базовий Typography Foundation

Для простого проєкту можна почати так:

    :root {
        --font-body: system-ui, sans-serif;
        --font-size-base: 1rem;
        --line-height-body: 1.6;
        --line-height-heading: 1.1;
    }

    body {
        margin: 0;
        font-family: var(--font-body);
        font-size: var(--font-size-base);
        line-height: var(--line-height-body);
        color: #222;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        line-height: var(--line-height-heading);
    }

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

    p {
        max-width: 65ch;
    }

    button,
    input,
    textarea,
    select {
        font: inherit;
    }

---

# 110. Типографічна система для Junior-проєкту

    :root {
        --font-body: system-ui, sans-serif;
        --font-mono: ui-monospace, monospace;

        --text-xs: 0.75rem;
        --text-sm: 0.875rem;
        --text-base: 1rem;
        --text-lg: 1.125rem;
        --text-xl: 1.5rem;
        --text-2xl: 2rem;
        --text-3xl: clamp(2rem, 5vw, 4rem);

        --leading-tight: 1.1;
        --leading-normal: 1.5;
        --leading-relaxed: 1.7;
    }

    body {
        font-family: var(--font-body);
        font-size: var(--text-base);
        line-height: var(--leading-normal);
    }

    code,
    pre {
        font-family: var(--font-mono);
    }

    h1 {
        font-size: var(--text-3xl);
        line-height: var(--leading-tight);
    }

    p {
        max-width: 65ch;
        line-height: var(--leading-relaxed);
    }

---

# 111. Що потрібно знати на рівні Core

🟢 **Core**

Ти повинен розуміти:

- `font-family`;
- font stack;
- `serif`;
- `sans-serif`;
- `monospace`;
- `system-ui`;
- `font-size`;
- `font-weight`;
- `font-style`;
- `line-height`;
- `letter-spacing`;
- `word-spacing`;
- `text-align`;
- `text-transform`;
- `text-decoration`;
- `text-shadow`;
- `white-space`;
- `overflow-wrap`;
- `text-overflow`;
- `rem`;
- `em`;
- базовий `@font-face`.

Повинен уміти написати:

    body {
        font-family: system-ui, sans-serif;
        font-size: 1rem;
        line-height: 1.6;
        color: #222;
    }

---

# 112. Що потрібно знати на рівні Junior

🔵 **Junior**

Додатково:

- `font-display`;
- web fonts;
- WOFF2;
- fallback fonts;
- responsive typography;
- `clamp()`;
- `ch`;
- `text-wrap`;
- `white-space`;
- `overflow-wrap`;
- ellipsis;
- typography tokens;
- CSS variables;
- accessibility;
- semantic HTML;
- form control typography;
- basic variable fonts.

Повинен уміти створити:

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
        line-height: 1.05;
        text-wrap: balance;
    }

    article {
        max-width: 65ch;
        line-height: 1.7;
    }

---

# 113. Що потрібно знати на рівні Middle

🟠 **Middle**

Додатково:

- variable fonts;
- OpenType features;
- `font-variation-settings`;
- `font-optical-sizing`;
- `font-feature-settings`;
- typography tokens;
- fluid typography;
- responsive type scales;
- performance of web fonts;
- font loading;
- FOUT;
- FOIT;
- CLS;
- typography accessibility;
- multilingual typography;
- internationalization;
- logical text alignment;
- `hyphens`;
- advanced text wrapping.

---

# 114. Що потрібно знати на рівні Senior

🔴 **Senior**

Додатково:

- font architecture;
- design-system typography;
- variable font axes;
- font subsetting;
- font loading strategy;
- performance budgets;
- layout shifts;
- cross-browser font rendering;
- internationalization;
- writing modes;
- multilingual typography;
- advanced accessibility;
- OpenType;
- optical sizing;
- typography tokens;
- fluid type scales;
- component-level typography;
- responsive type systems;
- trade-offs між custom та system fonts.

Senior повинен думати не тільки:

> "Який `font-size` поставити?"

а:

> "Яку типографічну систему побудувати, щоб вона залишалася читабельною, responsive, accessible та продуктивною в усьому продукті?"

---

# 115. Міні-шпаргалка

### Font family

    font-family: Arial, sans-serif;

    font-family: system-ui, sans-serif;

---

### Font size

    font-size: 1rem;

    font-size: 1.5rem;

    font-size: clamp(2rem, 5vw, 4rem);

---

### Font weight

    font-weight: 400;

    font-weight: 500;

    font-weight: 600;

    font-weight: 700;

---

### Font style

    font-style: normal;

    font-style: italic;

    font-style: oblique;

---

### Line height

    line-height: 1.5;

    line-height: 1.6;

---

### Letter spacing

    letter-spacing: 0.05em;

    letter-spacing: -0.02em;

---

### Text alignment

    text-align: start;

    text-align: center;

    text-align: end;

    text-align: justify;

---

### Text transformation

    text-transform: uppercase;

    text-transform: lowercase;

    text-transform: capitalize;

---

### Text decoration

    text-decoration: underline;

    text-decoration: none;

    text-decoration: line-through;

    text-underline-offset: 0.2em;

---

### Wrapping

    white-space: nowrap;

    overflow-wrap: break-word;

    word-break: break-word;

    hyphens: auto;

---

### Ellipsis

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

---

### Text width

    max-width: 65ch;

---

### Web font

    @font-face {
        font-family: "Inter";
        src: url("/fonts/inter.woff2") format("woff2");
        font-weight: 400;
        font-style: normal;
        font-display: swap;
    }

---

### Form controls

    button,
    input,
    textarea,
    select {
        font: inherit;
    }

---

### Fluid typography

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

---

# 116. Головна модель мислення

Коли бачиш:

    font-family: system-ui, sans-serif;

думай:

> Який шрифт використовуємо і який fallback буде використаний?

Коли бачиш:

    font-size: 1rem;

думай:

> Який розмір root font-size?

Коли бачиш:

    font-size: 1.5em;

думай:

> Від якого font-size залежить цей елемент?

Коли бачиш:

    font-weight: 700;

думай:

> Чи має font реальний 700 weight?

Коли бачиш:

    line-height: 1.6;

думай:

> Висота рядка масштабується разом із font-size.

Коли бачиш:

    max-width: 65ch;

думай:

> Ми контролюємо довжину текстового рядка.

Коли бачиш:

    font-size: clamp(2rem, 5vw, 4rem);

думай:

> Typography плавно масштабується між min та max.

Коли бачиш:

    text-overflow: ellipsis;

думай:

> Цього недостатньо — потрібно налаштувати overflow та wrapping.

Коли бачиш:

    @font-face;

думай:

> Ми підключаємо власний web font.

Коли бачиш:

    font-display: swap;

думай:

> Fallback може показуватися, поки web font завантажується.

Коли бачиш:

    text-wrap: balance;

думай:

> Браузер намагається зробити рядки заголовка більш збалансованими.

---

# 117. Фінальний практичний приклад

    :root {
        --font-body:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

        --font-mono:
            ui-monospace,
            SFMono-Regular,
            Consolas,
            monospace;

        --color-text: #1f2937;
        --color-muted: #6b7280;
        --color-primary: #2563eb;

        --text-base: 1rem;
        --text-lg: 1.125rem;
        --text-xl: clamp(1.5rem, 3vw, 2.25rem);
        --text-hero: clamp(2.25rem, 6vw, 5rem);

        --leading-body: 1.6;
        --leading-heading: 1.05;
    }

    body {
        margin: 0;

        font-family: var(--font-body);
        font-size: var(--text-base);
        line-height: var(--leading-body);

        color: var(--color-text);
    }

    h1,
    h2,
    h3 {
        margin-block: 0;

        line-height: var(--leading-heading);
        text-wrap: balance;
    }

    h1 {
        font-size: var(--text-hero);
        font-weight: 700;
    }

    h2 {
        font-size: var(--text-xl);
        font-weight: 700;
    }

    p {
        max-width: 65ch;
    }

    .lead {
        font-size: var(--text-lg);
        color: var(--color-muted);
    }

    a {
        color: var(--color-primary);
        text-decoration: underline;
        text-underline-offset: 0.2em;
    }

    code,
    pre {
        font-family: var(--font-mono);
    }

    button,
    input,
    textarea,
    select {
        font: inherit;
    }

---

## Головне:

> **Typography — це система, а не набір окремих CSS-властивостей.**

Для хорошого тексту потрібно одночасно контролювати:

    font-family
    font-size
    font-weight
    line-height
    letter-spacing
    text width
    color
    wrapping

Базова модель:

    font-family
        ↓
    font-size
        ↓
    font-weight
        ↓
    line-height
        ↓
    text width
        ↓
    spacing
        ↓
    color / decoration
        ↓
    responsive behavior

Для більшості frontend-проєктів хорошою основою буде:

    font-family: system-ui, sans-serif;

    font-size: 1rem;

    line-height: 1.6;

    max-width: 65ch;

    font-size: clamp(...);

    color: ...;

А далі typography масштабується через:

    CSS variables
    rem
    em
    ch
    clamp()
    @font-face
    variable fonts
    responsive design
    accessibility

> **Хороша типографіка повинна бути не просто красивою — вона повинна бути читабельною, передбачуваною, responsive та доступною.**