# 02. CSS Logical Properties

CSS Logical Properties (логічні CSS-властивості) — це властивості CSS, які визначають розміри, відступи, межі та позиціонування елементів відносно напрямку письма й логічних осей, а не лише фізичних сторін екрана.

Традиційні CSS-властивості використовують фізичні напрямки:

    top
    right
    bottom
    left

Logical Properties використовують логічні напрямки:

    block-start
    block-end
    inline-start
    inline-end

Наприклад, замість:

    margin-left: 20px;

можна використовувати:

    margin-inline-start: 20px;

У звичайному горизонтальному письмі з напрямком зліва направо обидві властивості зазвичай створюють відступ зліва.

Але `margin-inline-start` адаптується до напрямку письма. У контексті, де inline direction іде справа наліво, цей відступ буде розташований справа.

Logical Properties особливо корисні для:

- багатомовних сайтів;
- підтримки мов із напрямком письма справа наліво;
- міжнародних інтерфейсів;
- адаптивних компонентів;
- reusable components;
- сучасної CSS-архітектури;
- створення інтерфейсів, незалежних від фізичної орієнтації екрана.

Основна ідея:

    Physical Properties
        → top, right, bottom, left

    Logical Properties
        → block-start, block-end,
          inline-start, inline-end

Logical Properties є важливою частиною Modern CSS, оскільки дозволяють писати більш універсальні стилі.

---

## Ключові поняття

✔ CSS Logical Properties  
✔ Physical Properties  
✔ Logical Properties  
✔ Writing Mode  
✔ `writing-mode`  
✔ `direction`  
✔ `text-orientation`  
✔ `ltr`  
✔ `rtl`  
✔ `horizontal-tb`  
✔ `vertical-rl`  
✔ `vertical-lr`  
✔ Logical Axes  
✔ Block Axis  
✔ Inline Axis  
✔ Block Direction  
✔ Inline Direction  
✔ `block-start`  
✔ `block-end`  
✔ `inline-start`  
✔ `inline-end`  
✔ `margin-inline`  
✔ `margin-block`  
✔ `padding-inline`  
✔ `padding-block`  
✔ `border-inline`  
✔ `border-block`  
✔ `inset-inline`  
✔ `inset-block`  
✔ `inline-size`  
✔ `block-size`  
✔ `min-inline-size`  
✔ `max-inline-size`  
✔ `min-block-size`  
✔ `max-block-size`  
✔ Logical Shorthands  
✔ Physical-to-Logical Mapping  
✔ Internationalization (i18n)  
✔ Bidirectional Text (bidi)  
✔ Responsive Design  
✔ CSS Cascade  
✔ CSS Box Model  

---

## Що потрібно пам'ятати

• Physical Properties прив'язані до фізичних сторін: `top`, `right`, `bottom`, `left`.

• Logical Properties прив'язані до логічних осей і напрямків письма.

• `inline` — вісь, уздовж якої зазвичай розташовуються символи в рядку.

• `block` — вісь, уздовж якої розташовуються блоки тексту.

• У стандартному горизонтальному письмі `horizontal-tb` block axis спрямована згори вниз.

• У стандартному горизонтальному письмі inline axis зазвичай спрямована зліва направо, якщо `direction: ltr`.

• `direction: rtl` змінює напрямок inline axis на протилежний у відповідному writing context.

• `writing-mode` може змінювати орієнтацію логічних осей.

• `margin-inline-start` задає відступ на початку inline axis.

• `padding-block-end` задає внутрішній відступ у кінці block axis.

• `inline-size` відповідає розміру елемента вздовж inline axis.

• `block-size` відповідає розміру елемента вздовж block axis.

• Logical Properties допомагають створювати компоненти, які працюють у різних мовах і writing modes без переписування CSS.

• Logical Properties не обов'язково замінюють усі Physical Properties. Їх потрібно обирати відповідно до задачі.

• Для міжнародних інтерфейсів Logical Properties зазвичай є кращим вибором, якщо властивість повинна залежати від напрямку письма.

---

# Physical Properties

Physical Properties — це традиційні CSS-властивості, які прив'язані до фізичних сторін елемента.

Основні приклади:

    top
    right
    bottom
    left

    margin-top
    margin-right
    margin-bottom
    margin-left

    padding-top
    padding-right
    padding-bottom
    padding-left

    border-top
    border-right
    border-bottom
    border-left

    width
    height

Наприклад:

    .card {
        margin-left: 20px;
        padding-right: 16px;
        border-bottom: 1px solid #ccc;
        width: 300px;
        height: 200px;
    }

Ці властивості описують фізичні сторони або розміри елемента.

Проблема виникає тоді, коли напрямок письма змінюється.

Наприклад:

    margin-left: 20px;

завжди задає відступ із фізичного лівого боку, незалежно від того, чи читає користувач текст зліва направо, чи справа наліво.

Якщо дизайн повинен адаптуватися до напрямку письма, Logical Properties зазвичай зручніші.

---

# Logical Properties

Logical Properties — це CSS-властивості, значення яких залежать від логічних осей і напрямку письма.

Основні логічні напрямки:

    block-start
    block-end
    inline-start
    inline-end

Наприклад:

    .card {
        margin-inline-start: 20px;
        padding-block: 16px;
        border-block-end: 1px solid #ccc;
        inline-size: 300px;
        block-size: 200px;
    }

Ці властивості описують розташування та розміри відносно логічних осей.

У звичайному горизонтальному письмі:

    block-start
        → top

    block-end
        → bottom

    inline-start
        → left, якщо direction: ltr

    inline-end
        → right, якщо direction: ltr

Якщо напрямок письма змінюється, відповідність може змінюватися.

---

# Logical Axes

Logical Axes — це логічні осі, які використовуються CSS для визначення розташування та розмірів елементів.

Основні осі:

    Block Axis
    Inline Axis

## Block Axis

Block Axis — вісь, уздовж якої розташовуються блоки в поточному writing mode.

У стандартному горизонтальному письмі:

    writing-mode: horizontal-tb;

block axis зазвичай спрямована зверху вниз.

Наприклад, звичайні блоки HTML розташовуються один під одним.

    Block 1
       ↓
    Block 2
       ↓
    Block 3

У вертикальному письмі block axis може бути горизонтальною.

## Inline Axis

Inline Axis — вісь, уздовж якої розташовуються символи в рядку.

У звичайному горизонтальному письмі inline axis є горизонтальною.

Для `direction: ltr`:

    left → right

Для `direction: rtl`:

    right → left

У вертикальному письмі inline axis може бути вертикальною.

## Важлива відмінність

    Block Axis
        → напрямок розташування блоків

    Inline Axis
        → напрямок розташування вмісту рядка

Логічні осі залежать від writing mode, а напрямок inline axis також залежить від `direction`.

---

# Writing Mode

`writing-mode` визначає напрямок розташування блоків і орієнтацію тексту.

Основні значення:

    horizontal-tb
    vertical-rl
    vertical-lr

## horizontal-tb

Стандартне значення для більшості вебсторінок.

    .text {
        writing-mode: horizontal-tb;
    }

У цьому режимі:

    block axis
        → зверху вниз

    inline axis
        → горизонтально

Це звичайний режим для української та англійської мов.

## vertical-rl

Текст розташовується вертикально, а наступні блоки — з правого боку до лівого.

    .vertical-text {
        writing-mode: vertical-rl;
    }

У цьому режимі:

    block axis
        → справа наліво

    inline axis
        → вертикально

Такий режим використовується, зокрема, в деяких типографічних традиціях Східної Азії.

## vertical-lr

Текст розташовується вертикально, а наступні блоки — зліва направо.

    .vertical-text {
        writing-mode: vertical-lr;
    }

У цьому режимі:

    block axis
        → зліва направо

    inline axis
        → вертикально

## Порівняння

    horizontal-tb
        → горизонтальний текст
        → блоки зверху вниз

    vertical-rl
        → вертикальний текст
        → блоки справа наліво

    vertical-lr
        → вертикальний текст
        → блоки зліва направо

Важливо: Logical Properties орієнтуються на writing mode, а не лише на мову сторінки.

---

# Direction

`direction` задає напрямок тексту.

Основні значення:

    ltr
    rtl

## ltr

`ltr` означає left to right.

    .text {
        direction: ltr;
    }

Текст має напрямок зліва направо.

Це стандартний напрямок для української та англійської мов.

## rtl

`rtl` означає right to left.

    .text {
        direction: rtl;
    }

Текст має напрямок справа наліво.

Цей напрямок використовується, зокрема, в арабській та івритській мовах.

## direction і Logical Properties

Наприклад:

    .card {
        margin-inline-start: 20px;
    }

У контексті:

    direction: ltr;

відступ зазвичай розташований зліва.

У контексті:

    direction: rtl;

відступ зазвичай розташований справа.

Тому:

    margin-inline-start
        → початок inline axis

а не:

    margin-left
        → фізичний лівий бік

## Важливо

Для реальних багатомовних сторінок бажано правильно задавати напрямок на рівні HTML:

    <html lang="ar" dir="rtl">

Для української сторінки:

    <html lang="uk" dir="ltr">

Не потрібно встановлювати `direction: rtl` лише для того, щоб вирівняти окремий елемент праворуч. Для звичайного вирівнювання тексту часто краще підходить `text-align`.

---

# Block-start та Block-end

`block-start` і `block-end` визначають початок і кінець block axis.

Основні властивості:

    margin-block-start
    margin-block-end

    padding-block-start
    padding-block-end

    border-block-start
    border-block-end

    inset-block-start
    inset-block-end

У стандартному горизонтальному письмі:

    block-start
        → top

    block-end
        → bottom

Наприклад:

    .card {
        margin-block-start: 20px;
        margin-block-end: 30px;
    }

У `horizontal-tb` це приблизно відповідає:

    .card {
        margin-top: 20px;
        margin-bottom: 30px;
    }

Але в іншому writing mode логічні напрямки можуть відповідати іншим фізичним сторонам.

## padding-block-start

    .card {
        padding-block-start: 24px;
    }

Задає внутрішній відступ на початку block axis.

## border-block-end

    .section {
        border-block-end: 1px solid #ccc;
    }

У звичайному горизонтальному письмі це нижня межа.

## inset-block-start

    .badge {
        position: absolute;
        inset-block-start: 10px;
    }

Задає зміщення позиціонованого елемента від початку block axis.

---

# Inline-start та Inline-end

`inline-start` і `inline-end` визначають початок і кінець inline axis.

Основні властивості:

    margin-inline-start
    margin-inline-end

    padding-inline-start
    padding-inline-end

    border-inline-start
    border-inline-end

    inset-inline-start
    inset-inline-end

У звичайному горизонтальному письмі з `direction: ltr`:

    inline-start
        → left

    inline-end
        → right

При `direction: rtl`:

    inline-start
        → right

    inline-end
        → left

## margin-inline-start

    .card {
        margin-inline-start: 20px;
    }

Задає зовнішній відступ на початку inline axis.

## padding-inline-end

    .button {
        padding-inline-end: 24px;
    }

Задає внутрішній відступ у кінці inline axis.

## border-inline-start

    .notice {
        border-inline-start: 4px solid blue;
    }

Корисно для повідомлень, цитат і декоративних ліній, які повинні залишатися біля початку текстового напрямку.

## inset-inline-end

    .close-button {
        position: absolute;
        inset-block-start: 10px;
        inset-inline-end: 10px;
    }

Кнопка розташовується біля кінця inline axis і початку block axis.

У горизонтальному письмі з `direction: ltr` це зазвичай верхній правий кут.

У контексті `rtl` це зазвичай верхній лівий кут.

---

# Logical Shorthand Properties

Shorthand Properties дозволяють задавати кілька значень однією властивістю.

Для Logical Properties існують скорочені властивості:

    margin-inline
    margin-block

    padding-inline
    padding-block

    border-inline
    border-block

    inset-inline
    inset-block

Вони допомагають зменшити кількість CSS-коду.

---

# margin-inline

`margin-inline` задає зовнішні відступи на початку та в кінці inline axis.

Синтаксис:

    margin-inline: start end;

Приклад:

    .card {
        margin-inline: 20px 40px;
    }

У звичайному горизонтальному письмі з `direction: ltr`:

    margin-left: 20px;
    margin-right: 40px;

Якщо задано одне значення:

    .card {
        margin-inline: 20px;
    }

обидві логічні сторони отримують однаковий відступ.

Приблизний фізичний еквівалент у стандартному горизонтальному письмі:

    margin-left: 20px;
    margin-right: 20px;

## Центрування елемента

`margin-inline: auto` часто використовують для горизонтального центрування блочного елемента з визначеною шириною.

    .container {
        max-width: 1200px;
        margin-inline: auto;
    }

Це логічний еквівалент:

    margin-left: auto;
    margin-right: auto;

у звичайному горизонтальному письмі.

Важливо: для центрування елемент повинен мати обмежену ширину або інші відповідні умови layout. Саме по собі `margin-inline: auto` не гарантує центрування в усіх типах компонування.

---

# margin-block

`margin-block` задає зовнішні відступи на початку та в кінці block axis.

Синтаксис:

    margin-block: start end;

Приклад:

    .section {
        margin-block: 24px 48px;
    }

У `horizontal-tb` це приблизно відповідає:

    margin-top: 24px;
    margin-bottom: 48px;

Одне значення:

    .section {
        margin-block: 24px;
    }

задає однакові відступи на обох кінцях block axis.

Корисно для:

    section spacing
    article spacing
    heading spacing
    vertical rhythm

Але в інших writing modes block axis може бути горизонтальною.

---

# padding-inline

`padding-inline` задає внутрішні відступи на початку та в кінці inline axis.

Приклад:

    .button {
        padding-inline: 24px;
    }

У стандартному горизонтальному письмі це приблизно відповідає:

    padding-left: 24px;
    padding-right: 24px;

Для різних значень:

    .button {
        padding-inline: 16px 24px;
    }

Початок inline axis отримує `16px`, кінець — `24px`.

Корисно для:

    buttons
    navigation links
    input fields
    cards
    badges

Наприклад:

    .button {
        padding-block: 12px;
        padding-inline: 24px;
    }

Це дозволяє окремо керувати відступами вздовж обох логічних осей.

---

# padding-block

`padding-block` задає внутрішні відступи на початку та в кінці block axis.

Приклад:

    .card {
        padding-block: 24px;
    }

У стандартному горизонтальному письмі:

    padding-top: 24px;
    padding-bottom: 24px;

Для різних значень:

    .card {
        padding-block: 16px 32px;
    }

Це зручно для:

    sections
    cards
    article content
    page headers
    footers

Комбінований приклад:

    .card {
        padding-block: 24px;
        padding-inline: 32px;
    }

Такий запис описує внутрішні відступи відносно логічних осей.

---

# border-inline

`border-inline` задає межі на початку та в кінці inline axis.

Приклад:

    .notice {
        border-inline: 1px solid #ccc;
    }

У горизонтальному письмі з `direction: ltr` це приблизно відповідає:

    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;

Можна використовувати окремі властивості:

    border-inline-start
    border-inline-end

Наприклад:

    .notice {
        border-inline-start: 4px solid #2563eb;
    }

Це корисно для виділення повідомлень, цитат або активного пункту меню.

---

# border-block

`border-block` задає межі на початку та в кінці block axis.

Приклад:

    .section {
        border-block: 1px solid #ddd;
    }

У стандартному горизонтальному письмі це приблизно відповідає:

    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;

Можна використовувати:

    border-block-start
    border-block-end

Наприклад:

    .article {
        border-block-end: 1px solid #ddd;
        padding-block-end: 24px;
    }

Це створює межу в кінці block axis і відступ перед нею.

---

# inset-inline та inset-block

`inset` — це група властивостей для визначення зміщення позиціонованих елементів.

Фізичні властивості:

    top
    right
    bottom
    left

Логічні властивості:

    inset-block-start
    inset-block-end
    inset-inline-start
    inset-inline-end

Також існують shorthand-властивості:

    inset-inline
    inset-block

## Приклад

    .card {
        position: relative;
    }

    .badge {
        position: absolute;
        inset-block-start: 12px;
        inset-inline-end: 12px;
    }

У стандартному горизонтальному письмі з `direction: ltr` бейдж розташовується у верхньому правому куті.

При `direction: rtl` він розташовується у верхньому лівому куті.

## inset-inline

    .element {
        position: absolute;
        inset-inline: 10px;
    }

Задає обидва зміщення вздовж inline axis.

## inset-block

    .element {
        position: absolute;
        inset-block: 10px;
    }

Задає обидва зміщення вздовж block axis.

Важливо: `inset` працює як набір зміщень позиціонування. Він не є заміною `margin` або `padding`.

---

# Logical Sizing Properties

Logical Sizing Properties визначають розміри елемента вздовж логічних осей.

Основні властивості:

    inline-size
    block-size

    min-inline-size
    max-inline-size

    min-block-size
    max-block-size

Вони є логічними аналогами фізичних властивостей:

    width
    height

    min-width
    max-width

    min-height
    max-height

Але відповідність залежить від writing mode.

---

# inline-size

`inline-size` визначає розмір елемента вздовж inline axis.

У звичайному горизонтальному письмі це відповідає ширині.

Приклад:

    .card {
        inline-size: 300px;
    }

У `horizontal-tb` це приблизно еквівалентно:

    width: 300px;

Але у вертикальному writing mode inline axis є вертикальною, тому `inline-size` відповідатиме іншому фізичному виміру.

## max-inline-size

`max-inline-size` обмежує максимальний розмір уздовж inline axis.

    .article {
        max-inline-size: 70ch;
    }

У горизонтальному письмі це обмежує ширину рядка вмісту.

`ch` — одиниця, яка приблизно відповідає ширині символу `0` у поточному шрифті. Вона часто використовується для обмеження довжини рядка, хоча фактична кількість символів залежить від шрифту та вмісту.

## min-inline-size

`min-inline-size` задає мінімальний розмір уздовж inline axis.

    .sidebar {
        min-inline-size: 250px;
    }

Це корисно, коли компонент не повинен стискатися нижче певного розміру.

---

# block-size

`block-size` визначає розмір елемента вздовж block axis.

У звичайному горизонтальному письмі це відповідає висоті.

Приклад:

    .card {
        block-size: 200px;
    }

У `horizontal-tb` це приблизно еквівалентно:

    height: 200px;

У вертикальному writing mode block axis може бути горизонтальною.

## max-block-size

    .panel {
        max-block-size: 500px;
        overflow: auto;
    }

У горизонтальному письмі це обмежує висоту панелі.

## min-block-size

    .hero {
        min-block-size: 400px;
    }

У горизонтальному письмі це приблизно відповідає:

    min-height: 400px;

---

# Logical Sizing vs Physical Sizing

Порівняння:

    width
        → фізична ширина

    height
        → фізична висота

    inline-size
        → розмір уздовж inline axis

    block-size
        → розмір уздовж block axis

У звичайному горизонтальному письмі:

    inline-size
        ≈ width

    block-size
        ≈ height

Але це не універсальна відповідність.

У вертикальному письмі логічні осі змінюють фізичну орієнтацію.

Приклад:

    .box {
        writing-mode: vertical-rl;
        inline-size: 300px;
        block-size: 200px;
    }

Тут `inline-size` відповідає розміру вздовж вертикальної inline axis, а `block-size` — уздовж горизонтальної block axis.

Тому Logical Sizing Properties особливо корисні для стилів, які повинні працювати в різних writing modes.

---

# Physical vs Logical Properties

Найважливіші відповідності для стандартного `writing-mode: horizontal-tb`:

| Physical Property | Logical Property |
|---|---|
| `margin-top` | `margin-block-start` |
| `margin-bottom` | `margin-block-end` |
| `margin-left` у `ltr` | `margin-inline-start` |
| `margin-right` у `ltr` | `margin-inline-end` |
| `padding-top` | `padding-block-start` |
| `padding-bottom` | `padding-block-end` |
| `padding-left` у `ltr` | `padding-inline-start` |
| `padding-right` у `ltr` | `padding-inline-end` |
| `border-top` | `border-block-start` |
| `border-bottom` | `border-block-end` |
| `border-left` у `ltr` | `border-inline-start` |
| `border-right` у `ltr` | `border-inline-end` |
| `top` | `inset-block-start` |
| `bottom` | `inset-block-end` |
| `left` у `ltr` | `inset-inline-start` |
| `right` у `ltr` | `inset-inline-end` |
| `width` | `inline-size` |
| `height` | `block-size` |
| `min-width` | `min-inline-size` |
| `max-width` | `max-inline-size` |
| `min-height` | `min-block-size` |
| `max-height` | `max-block-size` |

У таблиці використано стандартний горизонтальний writing mode. Для напрямків inline start/end фізичне зіставлення також залежить від `direction`.

Наприклад:

    direction: ltr;
        inline-start → left
        inline-end   → right

    direction: rtl;
        inline-start → right
        inline-end   → left

---

# Приклад — Physical CSS

Розглянемо звичайну картку:

    .card {
        width: 320px;
        margin-left: 20px;
        padding-left: 24px;
        padding-right: 24px;
        border-left: 4px solid blue;
    }

Цей CSS використовує фізичні властивості.

У стандартному горизонтальному письмі він працює очікувано.

Але якщо потрібно підтримувати `rtl`, `margin-left`, `padding-left` і `border-left` залишаються прив'язаними до фізичного лівого боку.

---

# Приклад — Logical CSS

Ту саму картку можна записати логічно:

    .card {
        inline-size: 320px;
        margin-inline-start: 20px;
        padding-inline: 24px;
        border-inline-start: 4px solid blue;
    }

Тепер:

    inline-size
        → розмір уздовж inline axis

    margin-inline-start
        → зовнішній відступ на початку inline axis

    padding-inline
        → внутрішні відступи з обох боків inline axis

    border-inline-start
        → межа на початку inline axis

У стандартному горизонтальному письмі з `direction: ltr` результат буде схожим на фізичний приклад.

Але Logical CSS краще адаптується до напрямку письма.

---

# Logical Properties для багатомовного сайту

Припустімо, сайт має українську та арабську версії.

Українська:

    <html lang="uk" dir="ltr">

Арабська:

    <html lang="ar" dir="rtl">

Використаємо спільний CSS:

    .notification {
        padding-block: 16px;
        padding-inline: 20px;
        border-inline-start: 4px solid #2563eb;
        margin-block-end: 20px;
    }

Цей CSS не потребує окремого правила для фізичного лівого чи правого боку.

У `ltr` межа буде на початку inline axis зліва.

У `rtl` межа буде на початку inline axis справа.

Це робить компоненти простішими для підтримки багатомовних інтерфейсів.

---

# Logical Properties для кнопок

Кнопки часто мають горизонтальні та вертикальні внутрішні відступи.

Замість:

    .button {
        padding-top: 12px;
        padding-bottom: 12px;
        padding-left: 24px;
        padding-right: 24px;
    }

можна написати:

    .button {
        padding-block: 12px;
        padding-inline: 24px;
    }

Це коротше та краще описує призначення відступів.

Для кнопки з іконкою:

    .button {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding-block: 0.75rem;
        padding-inline: 1.25rem;
    }

Якщо іконка має розташовуватися на початку текстового напрямку, компонування можна додатково адаптувати за допомогою Flexbox та правильного DOM-порядку.

Не варто автоматично змінювати порядок усіх елементів лише через `rtl`. Спочатку потрібно визначити бажану поведінку компонента.

---

# Logical Properties для карток

Приклад картки:

    .card {
        max-inline-size: 600px;
        margin-inline: auto;
        padding-block: 24px;
        padding-inline: 32px;
        border: 1px solid #ddd;
        border-radius: 12px;
    }

Тут:

    max-inline-size
        → обмежує розмір уздовж inline axis

    margin-inline: auto
        → автоматичні зовнішні відступи з обох боків inline axis

    padding-block
        → відступи на початку та в кінці block axis

    padding-inline
        → відступи на початку та в кінці inline axis

У стандартному горизонтальному письмі картка має максимальну ширину `600px` і центрується горизонтально, якщо умови layout дозволяють це центрування.

---

# Logical Properties для розділювачів

Розділювач між секціями можна створити через `border-block-end`.

    .section {
        padding-block-end: 24px;
        border-block-end: 1px solid #ddd;
        margin-block-end: 24px;
    }

У звичайному горизонтальному письмі:

    border-block-end
        → нижня межа

У вертикальному writing mode цей напрямок може бути фізично горизонтальним.

Тому такий код описує семантичне розташування межі, а не її конкретний бік екрана.

---

# Logical Properties для позиціонування

Приклад кнопки закриття:

    .modal {
        position: relative;
    }

    .modal-close {
        position: absolute;
        inset-block-start: 12px;
        inset-inline-end: 12px;
    }

У стандартному горизонтальному письмі з `direction: ltr` кнопка буде у верхньому правому куті.

У `rtl` вона буде у верхньому лівому куті.

Це особливо корисно для:

    modal windows
    dropdown menus
    badges
    tooltips
    notification panels
    close buttons

Якщо елемент має залишатися саме у фізичному верхньому правому куті незалежно від напрямку письма, фізичні `top` і `right` можуть бути доречнішими.

Вибір залежить від вимог дизайну.

---

# Logical Properties у Flexbox

Flexbox працює з головною та поперечною осями.

Властивості:

    flex-direction
    justify-content
    align-items

не потрібно плутати з Logical Properties.

Але логічні властивості можуть доповнювати Flexbox.

Наприклад:

    .toolbar {
        display: flex;
        gap: 1rem;
        padding-inline: 1.5rem;
        padding-block: 1rem;
    }

`padding-inline` адаптується до напрямку письма, тоді як `gap` визначає проміжок між flex items.

Для горизонтального Flexbox напрямок розташування елементів також залежить від `flex-direction` і напрямку письма.

Не слід вважати, що `justify-content: start` завжди означає фізичний лівий бік. Логічний початок залежить від осі компонування та напрямку.

---

# Logical Properties у CSS Grid

Logical Properties добре поєднуються з Grid.

Наприклад:

    .grid-container {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
        padding-inline: 2rem;
        padding-block: 1.5rem;
    }

Адаптивна ширина:

    .grid-container {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        max-inline-size: 1200px;
        margin-inline: auto;
        gap: 1rem;
    }

У стандартному горизонтальному письмі `max-inline-size` обмежує ширину контейнера.

У вертикальному writing mode він визначає максимальний розмір уздовж inline axis.

Grid також має власні логічні поняття:

    row
    column
    inline axis
    block axis

Під час роботи з Grid потрібно розрізняти логічні осі CSS та конкретні рядки й колонки сітки.

---

# Logical Properties та Responsive Design

Logical Properties можуть зробити responsive CSS універсальнішим.

Наприклад:

    .container {
        inline-size: 100%;
        max-inline-size: 1200px;
        margin-inline: auto;
        padding-inline: 1rem;
    }

    @media (min-width: 768px) {
        .container {
            padding-inline: 2rem;
        }
    }

Media Query перевіряє viewport.

Logical Properties визначають розмір і відступи відносно логічних осей.

Ці можливості доповнюють одна одну.

Переваги:

- менше дублювання CSS для `ltr` та `rtl`;
- простіша підтримка компонентів;
- зрозуміліше керування розмірами;
- краща міжнародна сумісність;
- менша залежність від фізичної орієнтації екрана.

---

# Logical Properties та CSS Custom Properties

Logical Properties можна комбінувати з CSS Custom Properties.

Наприклад:

    :root {
        --space-1: 0.5rem;
        --space-2: 1rem;
        --space-3: 1.5rem;
        --space-4: 2rem;
    }

    .card {
        padding-block: var(--space-3);
        padding-inline: var(--space-4);
        margin-block-end: var(--space-3);
    }

Це дозволяє:

    Custom Properties
        → зберігати дизайн-токени

    Logical Properties
        → застосовувати відступи до логічних осей

Такий підхід корисний для дизайн-систем і великих проєктів.

---

# Logical Properties та `auto`

Багато Logical Properties підтримують значення `auto`, якщо це дозволяє відповідна властивість.

Наприклад:

    .container {
        max-inline-size: 1200px;
        margin-inline: auto;
    }

Це типовий спосіб центрування контейнера в горизонтальному layout.

Для позиціонування:

    .element {
        position: absolute;
        inset-inline-start: auto;
        inset-inline-end: 0;
    }

Тут значення визначаються правилами позиціонування CSS.

Важливо: `auto` не означає універсальне центрування. Його поведінка залежить від конкретної властивості та алгоритму layout.

---

# CSS Logical Properties та Accessibility

Logical Properties можуть допомагати створювати доступніші багатомовні інтерфейси.

Наприклад, межа повідомлення може розташовуватися на початку текстового напрямку:

    .alert {
        border-inline-start: 4px solid #b45309;
        padding-inline-start: 1rem;
    }

Це дозволяє зберігати узгоджене оформлення в `ltr` та `rtl`.

Однак Logical Properties самі по собі не забезпечують accessibility.

Також потрібно враховувати:

    semantic HTML
    keyboard navigation
    focus styles
    color contrast
    readable typography
    correct lang attribute
    correct dir attribute

Для міжнародних сайтів напрямок тексту бажано задавати відповідно до реальної мови вмісту, а не намагатися імітувати його лише за допомогою CSS.

---

# Типові помилки

## 1. Плутати логічні та фізичні напрямки

Фізичні напрямки:

    top
    right
    bottom
    left

Логічні напрямки:

    block-start
    block-end
    inline-start
    inline-end

`inline-start` не завжди означає `left`.

`block-start` не завжди означає `top`.

Їх відповідність залежить від writing mode і напрямку письма.

---

## 2. Вважати inline-size синонімом width

❌ Неправильне припущення:

    inline-size = width завжди

У `horizontal-tb` вони зазвичай відповідають одному фізичному виміру.

Але в `vertical-rl` або `vertical-lr` inline axis є вертикальною.

Тому `inline-size` не є універсальним синонімом `width`.

---

## 3. Вважати block-size синонімом height

У стандартному горизонтальному письмі:

    block-size ≈ height

У вертикальному письмі block axis може бути горизонтальною.

Тому логічні та фізичні властивості не завжди взаємозамінні.

---

## 4. Використовувати margin-left для логічного відступу

Якщо відступ повинен розташовуватися на початку inline axis, краще:

    margin-inline-start: 20px;

а не:

    margin-left: 20px;

Але якщо дизайн вимагає відступу саме з фізичного лівого боку, `margin-left` може бути правильним вибором.

---

## 5. Плутати direction і text-align

`direction` задає напрямок тексту.

`text-align` визначає вирівнювання тексту.

Наприклад:

    .text {
        direction: rtl;
        text-align: start;
    }

Це не те саме, що:

    .text {
        text-align: right;
    }

`text-align: start` прив'язаний до початку inline direction, тоді як `text-align: right` означає фізичне вирівнювання праворуч.

---

## 6. Змінювати порядок DOM замість логічного компонування

Не потрібно автоматично змінювати HTML-структуру лише для підтримки `rtl`.

Спочатку потрібно перевірити, чи достатньо:

    Logical Properties
    Flexbox
    CSS Grid
    direction
    text-align

Порядок DOM також впливає на читання екранними читачами та клавіатурну навігацію, тому його не слід змінювати без необхідності.

---

## 7. Не враховувати CSS Cascade

Приклад:

    .card {
        margin-left: 20px;
    }

    .card {
        margin-inline-start: 30px;
    }

Обидві властивості можуть впливати на один фізичний відступ у стандартному горизонтальному письмі.

Результат залежить від правил каскаду, зокрема порядку, специфічності та важливості оголошень.

Під час переходу з Physical Properties на Logical Properties потрібно перевіряти, чи немає конфліктних оголошень.

---

## 8. Без потреби змішувати Physical і Logical Properties

Змішування допустиме, але може ускладнювати розуміння коду.

Наприклад:

    .card {
        margin-left: 20px;
        margin-inline-start: 30px;
    }

Якщо обидві властивості застосовуються до одного фізичного боку, результат може бути неочевидним.

Для нових компонентів краще дотримуватися послідовної стратегії.

---

# Практичні приклади

## Приклад 1 — Відступи картки

    .card {
        padding-block: 1.5rem;
        padding-inline: 2rem;
        margin-block-end: 1.5rem;
    }

Завдання:

    1. Створи картку.
    2. Додай заголовок і текст.
    3. Задай логічні відступи.
    4. Зміни напрямок письма.
    5. Перевір, як поводяться відступи.

---

## Приклад 2 — Центрований контейнер

    .container {
        inline-size: 100%;
        max-inline-size: 1200px;
        margin-inline: auto;
        padding-inline: 1rem;
    }

Завдання:

    1. Створи основний контейнер сторінки.
    2. Обмеж його максимальний розмір.
    3. Центруй контейнер.
    4. Додай адаптивні внутрішні відступи.
    5. Перевір поведінку в різних viewport.

---

## Приклад 3 — Багатомовне повідомлення

    .alert {
        border-inline-start: 4px solid #2563eb;
        padding-block: 1rem;
        padding-inline: 1.25rem;
        margin-block-end: 1rem;
    }

Завдання:

    1. Створи повідомлення.
    2. Додай текст.
    3. Додай межу на початку inline axis.
    4. Перевір `dir="ltr"`.
    5. Перевір `dir="rtl"`.

---

## Приклад 4 — Кнопка закриття

    .modal {
        position: relative;
        padding: 2rem;
    }

    .modal-close {
        position: absolute;
        inset-block-start: 0.75rem;
        inset-inline-end: 0.75rem;
    }

Завдання:

    1. Створи модальне вікно.
    2. Додай кнопку закриття.
    3. Розмісти її логічними властивостями.
    4. Перевір `ltr`.
    5. Перевір `rtl`.

---

## Приклад 5 — Logical Sizing

    .article {
        inline-size: 100%;
        max-inline-size: 70ch;
        margin-inline: auto;
        padding-block: 2rem;
        padding-inline: 1rem;
    }

Завдання:

    1. Створи текстову статтю.
    2. Обмеж її максимальний inline size.
    3. Центруй контейнер.
    4. Додай логічні відступи.
    5. Перевір читабельність рядків.

---

## Приклад 6 — Навігаційний елемент

    .nav-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding-block: 0.75rem;
        padding-inline: 1rem;
        border-inline-start: 3px solid transparent;
    }

    .nav-link[aria-current="page"] {
        border-inline-start-color: #2563eb;
        font-weight: 700;
    }

Завдання:

    1. Створи список посилань.
    2. Додай активний стан.
    3. Використай Logical Properties.
    4. Перевір обидва напрямки письма.
    5. Переконайся, що активний стан зрозумілий і без кольору.

---

## Приклад 7 — Відступи секції

    .section {
        padding-block: 3rem;
        padding-inline: 1.5rem;
        border-block-end: 1px solid #ddd;
    }

Завдання:

    1. Створи кілька секцій.
    2. Задай однакові логічні відступи.
    3. Додай межу в кінці block axis.
    4. Перевір структуру сторінки.
    5. Порівняй із `padding-top`, `padding-bottom` та `border-bottom`.

---

# Питання зі співбесіди

Що таке CSS Logical Properties?

Чим Logical Properties відрізняються від Physical Properties?

Що таке block axis?

Що таке inline axis?

Що таке writing mode?

Які основні значення `writing-mode` існують?

Що робить `direction`?

Чим відрізняються `ltr` та `rtl`?

Що означають `block-start` і `block-end`?

Що означають `inline-start` та `inline-end`?

Чому `inline-start` не завжди означає `left`?

Що робить `margin-inline`?

Що робить `margin-block`?

Чим `padding-inline` відрізняється від `padding-block`?

Що роблять `border-inline` та `border-block`?

Що таке `inset-inline-start`?

Що таке `inset-block-end`?

Чим `inline-size` відрізняється від `width`?

Чим `block-size` відрізняється від `height`?

Що роблять `min-inline-size` та `max-inline-size`?

Як Logical Properties допомагають створювати багатомовні сайти?

Як правильно підтримувати `ltr` та `rtl`?

Чим `text-align: start` відрізняється від `text-align: left`?

Чи потрібно повністю відмовлятися від Physical Properties?

Як Logical Properties взаємодіють із CSS Cascade?

Як Logical Properties використовуються у Flexbox?

Як Logical Properties використовуються у CSS Grid?

Як Logical Properties допомагають створювати reusable components?

Які типові помилки виникають під час використання Logical Properties?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке Logical Properties.

Різниця між Logical та Physical Properties.

Block Axis.

Inline Axis.

`writing-mode`.

`direction`.

`ltr`.

`rtl`.

`block-start`.

`block-end`.

`inline-start`.

`inline-end`.

`margin-inline`.

`margin-block`.

`padding-inline`.

`padding-block`.

`border-inline-start`.

`border-block-end`.

`inline-size`.

`block-size`.

`margin-inline: auto`.

Застосування Logical Properties у картках і кнопках.

---

## 🔵 Junior

`min-inline-size`.

`max-inline-size`.

`min-block-size`.

`max-block-size`.

`border-inline`.

`border-block`.

`inset-inline`.

`inset-block`.

`inset-inline-start`.

`inset-inline-end`.

`inset-block-start`.

`inset-block-end`.

Різниця між `horizontal-tb`, `vertical-rl` та `vertical-lr`.

Logical Properties у Flexbox.

Logical Properties у Grid.

Logical Properties у responsive layouts.

Підтримка `ltr` та `rtl`.

Використання `dir` в HTML.

Взаємодія Logical Properties із CSS Cascade.

Використання Logical Properties у дизайн-системах.

---

## 🟠 Middle

Міжнародна CSS-архітектура.

Багатомовні компоненти.

Складні сценарії `rtl`.

Logical Properties у reusable components.

Logical Properties разом із CSS Custom Properties.

Logical Properties у дизайн-системах.

Поведінка Logical Properties у вертикальних writing modes.

Логічні та фізичні осі в Grid і Flexbox.

Взаємодія `direction`, `writing-mode` та `text-align`.

Refactoring legacy CSS із Physical Properties на Logical Properties.

Виявлення конфліктів у каскаді.

Стратегія поступового переходу на Logical Properties.

---

## 🔴 Senior

Проєктування міжнародних дизайн-систем.

Архітектура компонентів для `ltr` та `rtl`.

Складні сценарії bidirectional text.

Глибоке розуміння CSS Writing Modes.

Взаємодія Logical Properties із CSS Containment.

Взаємодія Logical Properties із Cascade Layers.

Побудова універсальних layout primitives.

Масштабна міграція legacy CSS.

Управління напрямком тексту в складних компонентах.

Trade-offs між:

    Physical Properties
    Logical Properties
    Writing Modes
    Flexbox
    CSS Grid
    Internationalization
    Responsive Design

---

# Міні-шпаргалка

## Напрямки

    Physical:
        top
        right
        bottom
        left

    Logical:
        block-start
        block-end
        inline-start
        inline-end

---

## Осі

    Block Axis
        → напрямок розташування блоків

    Inline Axis
        → напрямок розташування вмісту рядка

---

## Зовнішні відступи

    margin-block
        → відступи на початку та в кінці block axis

    margin-inline
        → відступи на початку та в кінці inline axis

---

## Внутрішні відступи

    padding-block
        → відступи на початку та в кінці block axis

    padding-inline
        → відступи на початку та в кінці inline axis

---

## Межі

    border-block-start
        → межа на початку block axis

    border-block-end
        → межа в кінці block axis

    border-inline-start
        → межа на початку inline axis

    border-inline-end
        → межа в кінці inline axis

---

## Розміри

    width
        → фізична ширина

    height
        → фізична висота

    inline-size
        → розмір уздовж inline axis

    block-size
        → розмір уздовж block axis

---

## Позиціонування

    top
        → фізичний верхній бік

    inset-block-start
        → початок block axis

    inset-inline-start
        → початок inline axis

    inset-inline-end
        → кінець inline axis

---

## Writing Modes

    horizontal-tb
        → блоки зверху вниз

    vertical-rl
        → блоки справа наліво

    vertical-lr
        → блоки зліва направо

---

## Напрямок inline axis

    direction: ltr
        inline-start → left
        inline-end   → right

    direction: rtl
        inline-start → right
        inline-end   → left

Це зіставлення передбачає стандартний горизонтальний writing mode.

---

## Приклад універсального контейнера

    .container {
        inline-size: 100%;
        max-inline-size: 1200px;
        margin-inline: auto;
        padding-block: 1.5rem;
        padding-inline: 1rem;
    }

---

## Приклад універсальної картки

    .card {
        padding-block: 1.5rem;
        padding-inline: 2rem;
        border: 1px solid #ddd;
        border-radius: 12px;
        margin-block-end: 1.5rem;
    }

---

## Основні правила

    margin-inline
        → inline margins

    margin-block
        → block margins

    padding-inline
        → inline padding

    padding-block
        → block padding

    inline-size
        → inline dimension

    block-size
        → block dimension

    inset-inline
        → inline positioning offsets

    inset-block
        → block positioning offsets

---

# Головне

• Logical Properties описують CSS-властивості відносно логічних осей і напрямків письма.

• Physical Properties прив'язані до фізичних сторін елемента.

• `block-start`, `block-end`, `inline-start` та `inline-end` — основні логічні напрямки.

• Block Axis визначає напрямок розташування блоків.

• Inline Axis визначає напрямок розташування вмісту рядка.

• `writing-mode` визначає орієнтацію логічних осей.

• `direction` визначає напрямок тексту, наприклад `ltr` або `rtl`.

• `margin-inline` і `margin-block` дозволяють задавати зовнішні відступи відносно логічних осей.

• `padding-inline` і `padding-block` дозволяють задавати внутрішні відступи відносно логічних осей.

• `border-inline` і `border-block` дозволяють задавати межі відносно логічних осей.

• `inset-inline` та `inset-block` використовуються для логічного позиціонування.

• `inline-size` і `block-size` визначають розміри вздовж логічних осей.

• `inline-size` не завжди дорівнює `width`, а `block-size` не завжди дорівнює `height`.

• Logical Properties допомагають створювати універсальні компоненти для багатомовних сайтів.

• Для міжнародних інтерфейсів потрібно правильно задавати `lang` і `dir` в HTML.

• Logical Properties доповнюють Flexbox, Grid, Media Queries та CSS Custom Properties.

• Не потрібно повністю відмовлятися від Physical Properties: вони доречні, коли дизайн вимагає прив'язки до конкретного боку екрана.

• Під час переходу на Logical Properties потрібно враховувати CSS Cascade та можливі конфлікти зі старими правилами.

• Основна модель:

    Writing Mode
          ↓
    Logical Axes
          ↓
    Block / Inline Directions
          ↓
    Logical Properties
          ↓
    Universal CSS Components

• Правильне використання Logical Properties робить CSS зрозумілішим, універсальнішим і простішим для підтримки багатомовних інтерфейсів.