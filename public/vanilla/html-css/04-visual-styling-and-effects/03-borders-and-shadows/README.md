## 03. Borders and Shadows

Borders and shadows (межі та тіні) — це CSS-механізми, які дозволяють візуально оформлювати елементи, виділяти їхні межі, створювати об'єм, глибину, розділення між блоками та декоративні ефекти.

Основні CSS-властивості цієї теми:

    border
    border-width
    border-style
    border-color
    border-radius
    border-top
    border-right
    border-bottom
    border-left
    border-block
    border-inline
    border-image

    box-shadow
    text-shadow

Також важливими є:

    outline
    outline-width
    outline-style
    outline-color
    outline-offset

Borders найчастіше використовуються для:

    меж елементів
    карток
    кнопок
    input
    таблиць
    декоративних блоків
    роздільників

Shadows найчастіше використовуються для:

    створення depth
    card elevation
    hover effects
    focus effects
    декоративних ефектів
    виділення тексту

---

### Ключові поняття

✔ border  
✔ border width  
✔ border style  
✔ border color  
✔ border radius  
✔ border side  
✔ border top  
✔ border right  
✔ border bottom  
✔ border left  
✔ border-block  
✔ border-inline  
✔ border shorthand  
✔ border-radius  
✔ rounded corners  
✔ circle  
✔ pill  
✔ border-image  
✔ box-shadow  
✔ text-shadow  
✔ inset shadow  
✔ outer shadow  
✔ blur radius  
✔ spread radius  
✔ shadow offset  
✔ multiple shadows  
✔ outline  
✔ outline-offset  
✔ border vs outline  
✔ box model  
✔ `box-sizing`  
✔ transparent border  
✔ dashed border  
✔ dotted border  
✔ double border  
✔ focus ring  
✔ elevation  
✔ depth  

---

### Що потрібно пам'ятати

• `border` створює межу навколо елемента.

• Border має три основні характеристики:

    width
    style
    color

• Найпоширеніший shorthand:

    border: 1px solid black;

• Border займає місце в box model.

• `outline` відрізняється від `border` і не займає місце в box model.

• `border-radius` заокруглює кути елемента.

• `border-radius: 50%` часто використовується для створення кола, якщо елемент квадратний.

• `box-shadow` створює тінь навколо box.

• `text-shadow` створює тінь навколо тексту.

• `box-shadow` може мати:

    offset-x
    offset-y
    blur-radius
    spread-radius
    color

• `inset` перетворює зовнішню тінь на внутрішню.

• Один елемент може мати кілька shadows.

• Shadows не змінюють розміри елемента так, як border.

• `outline` часто використовується для focus states.

• Не слід прибирати focus outline без створення доступної альтернативи.

---

# Border

`border` — це CSS-властивість для створення межі навколо елемента.

Найпростіший приклад:

    .box {
        border: 1px solid black;
    }

Тут:

    1px   → width
    solid → style
    black → color

---

# Border Width

`border-width` задає товщину межі.

    .box {
        border-width: 2px;
    }

Приклад:

    .box {
        border-width: 5px;
    }

Чим більше значення, тим товстіша межа.

---

# Border Style

`border-style` визначає тип лінії.

Основні значення:

    none
    hidden
    solid
    dashed
    dotted
    double
    groove
    ridge
    inset
    outset

Найчастіше використовуються:

    solid
    dashed
    dotted
    double
    none

---

## solid

Звичайна суцільна лінія.

    .box {
        border: 2px solid black;
    }

---

## dashed

Штрихова лінія.

    .box {
        border: 2px dashed black;
    }

---

## dotted

Крапкова лінія.

    .box {
        border: 2px dotted black;
    }

---

## double

Подвійна лінія.

    .box {
        border: 4px double black;
    }

---

## none

Межа відсутня.

    .box {
        border: none;
    }

---

# Border Color

`border-color` задає колір межі.

    .box {
        border-color: red;
    }

Можна використовувати:

    named colors
    hex
    rgb()
    rgba()
    hsl()
    hsla()
    color-mix()
    CSS variables

Наприклад:

    .box {
        border-color: #333;
    }

---

# Border Shorthand

Замість трьох властивостей:

    .box {
        border-width: 1px;
        border-style: solid;
        border-color: black;
    }

можна написати:

    .box {
        border: 1px solid black;
    }

Це стандартний і дуже поширений запис.

---

# Порядок Border Shorthand

Типовий порядок:

    border: width style color;

Наприклад:

    border: 2px solid #333;

де:

    2px   → width
    solid → style
    #333  → color

---

# Border Side

Кожна сторона елемента може мати власну межу.

Основні сторони:

    border-top
    border-right
    border-bottom
    border-left

Наприклад:

    .box {
        border-top: 2px solid red;
        border-right: 2px solid green;
        border-bottom: 2px solid blue;
        border-left: 2px solid orange;
    }

---

# border-top

Межа зверху.

    .box {
        border-top: 1px solid black;
    }

---

# border-right

Межа справа.

    .box {
        border-right: 1px solid black;
    }

---

# border-bottom

Межа знизу.

    .box {
        border-bottom: 1px solid black;
    }

---

# border-left

Межа зліва.

    .box {
        border-left: 1px solid black;
    }

---

# Border Width for Four Sides

`border-width` може приймати від 1 до 4 значень.

### Одне значення

Однакове для всіх сторін:

    .box {
        border-width: 1px;
    }

---

### Два значення

    .box {
        border-width: 1px 2px;
    }

Порядок:

    top/bottom
    left/right

Тобто:

    top    → 1px
    right  → 2px
    bottom → 1px
    left   → 2px

---

### Три значення

    .box {
        border-width: 1px 2px 3px;
    }

Порядок:

    top    → 1px
    right  → 2px
    bottom → 3px
    left   → 2px

---

### Чотири значення

    .box {
        border-width: 1px 2px 3px 4px;
    }

Порядок:

    top
    right
    bottom
    left

Це називається:

    clockwise order

або:

    TRBL

    Top
    Right
    Bottom
    Left

---

# Border Color for Four Sides

Так само можна задавати кольори:

    .box {
        border-color: red green blue orange;
    }

Порядок:

    top
    right
    bottom
    left

---

# Border Style for Four Sides

Наприклад:

    .box {
        border-style:
            solid
            dashed
            dotted
            double;
    }

Порядок:

    top
    right
    bottom
    left

---

# Logical Border Properties

CSS має logical properties для роботи з напрямком тексту та layout.

Основні:

    border-block
    border-block-start
    border-block-end

    border-inline
    border-inline-start
    border-inline-end

Наприклад:

    .box {
        border-block: 1px solid black;
    }

Це задає межі по block axis.

---

# border-block

Задає межі для block axis.

    .box {
        border-block: 1px solid black;
    }

У типовому горизонтальному writing mode це зазвичай:

    top
    bottom

---

# border-inline

Задає межі для inline axis.

    .box {
        border-inline: 1px solid black;
    }

У типовому горизонтальному writing mode це зазвичай:

    left
    right

---

# Border Box Model

Border є частиною box model.

Елемент складається з:

    content
       ↓
    padding
       ↓
    border
       ↓
    margin

Схематично:

    ┌─────────────────────────────┐
    │           margin            │
    │   ┌─────────────────────┐   │
    │   │       border        │   │
    │   │  ┌───────────────┐  │   │
    │   │  │    padding    │  │   │
    │   │  │  ┌─────────┐  │  │   │
    │   │  │  │ content │  │  │   │
    │   │  │  └─────────┘  │  │   │
    │   │  └───────────────┘  │   │
    │   └─────────────────────┘   │
    └─────────────────────────────┘

За стандартного:

    box-sizing: content-box;

ширина `width` не включає:

    padding
    border

---

# Border and box-sizing

Наприклад:

    .box {
        width: 200px;
        padding: 20px;
        border: 5px solid black;
    }

За:

    box-sizing: content-box;

фактична ширина буде:

    200
    + 40 padding
    + 10 border
    = 250px

Якщо:

    box-sizing: border-box;

то `width: 200px` включає:

    content
    padding
    border

Тому:

    .box {
        width: 200px;
        padding: 20px;
        border: 5px solid black;
        box-sizing: border-box;
    }

загальна ширина:

    200px

---

# Transparent Border

Border може бути прозорим.

    .box {
        border: 2px solid transparent;
    }

Це корисний прийом, коли потрібно:

    зберегти розмір елемента
    уникнути layout shift
    змінювати колір border при hover

Наприклад:

    .button {
        border: 2px solid transparent;
    }

    .button:hover {
        border-color: blue;
    }

Розмір border залишається стабільним.

---

# Border Radius

`border-radius` заокруглює кути елемента.

    .box {
        border-radius: 10px;
    }

Чим більше значення, тим сильніше заокруглення.

---

# Border Radius: Four Corners

Можна задавати окремо:

    border-top-left-radius
    border-top-right-radius
    border-bottom-right-radius
    border-bottom-left-radius

Наприклад:

    .box {
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

---

# Border Radius Shorthand

Можна задавати чотири кути:

    .box {
        border-radius: 10px 20px 30px 40px;
    }

Порядок:

    top-left
    top-right
    bottom-right
    bottom-left

На відміну від border width shorthand, тут порядок візуально відповідає кутам:

    TL → TR → BR → BL

---

# Border Radius: Two Values

    .box {
        border-radius: 10px 20px;
    }

Означає:

    top-left     → 10px
    top-right    → 20px
    bottom-right → 10px
    bottom-left  → 20px

---

# Border Radius: Three Values

    .box {
        border-radius: 10px 20px 30px;
    }

Означає:

    top-left     → 10px
    top-right    → 20px
    bottom-right → 30px
    bottom-left  → 20px

---

# Circle

Для квадратного елемента:

    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

Отримуємо коло.

Важливо:

    width === height

Якщо width і height різні, `border-radius: 50%` створить еліпс.

---

# Pill

Для створення pill-shaped елемента часто використовують велике значення:

    .badge {
        border-radius: 999px;
    }

Наприклад:

    .button {
        padding: 8px 20px;
        border-radius: 999px;
    }

---

# Ellipse

Еліпс можна створити:

    .ellipse {
        width: 200px;
        height: 100px;
        border-radius: 50%;
    }

---

# Border Radius and Overflow

`border-radius` часто використовується разом із:

    overflow: hidden;

Наприклад:

    .card {
        border-radius: 16px;
        overflow: hidden;
    }

Це особливо корисно, коли всередині є зображення:

    .card {
        border-radius: 16px;
        overflow: hidden;
    }

    .card img {
        width: 100%;
        display: block;
    }

---

# Border Image

`border-image` дозволяє використовувати зображення або градієнт як border.

Основні властивості:

    border-image-source
    border-image-slice
    border-image-width
    border-image-outset
    border-image-repeat

Приклад:

    .box {
        border: 10px solid transparent;
        border-image: linear-gradient(
            90deg,
            red,
            blue
        ) 1;
    }

Це дозволяє створювати декоративні градієнтні borders.

---

# Border vs Outline

`border` і `outline` схожі візуально, але мають важливу різницю.

`border`:

    є частиною box model
    займає місце
    впливає на розміри box

`outline`:

    не є частиною box model
    не займає layout space
    малюється навколо елемента

---

# Outline

`outline` використовується для створення зовнішньої лінії навколо елемента.

    .button {
        outline: 2px solid blue;
    }

---

# Outline Shorthand

Синтаксис:

    outline: width style color;

Наприклад:

    .box {
        outline: 2px solid red;
    }

---

# Outline Offset

`outline-offset` визначає відстань між outline та border edge.

    .box {
        outline: 2px solid blue;
        outline-offset: 4px;
    }

Схематично:

    element
       ↓
    border
       ↓
    offset
       ↓
    outline

---

# Focus Ring

`outline` особливо важливий для keyboard accessibility.

Наприклад:

    button:focus-visible {
        outline: 3px solid blue;
        outline-offset: 3px;
    }

Це створює видимий focus indicator.

---

# Не прибирати Focus без альтернативи

Небажано:

    button:focus {
        outline: none;
    }

Якщо прибрати outline, потрібно створити інший помітний focus state.

Наприклад:

    button:focus-visible {
        outline: 3px solid blue;
        outline-offset: 3px;
    }

---

# Box Shadow

`box-shadow` створює тінь навколо елемента.

Базовий приклад:

    .card {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

---

# Box Shadow Syntax

Типовий синтаксис:

    box-shadow:
        offset-x
        offset-y
        blur-radius
        spread-radius
        color;

Наприклад:

    .card {
        box-shadow:
            0
            4px
            12px
            0
            rgba(0, 0, 0, 0.15);
    }

---

# Shadow Offset X

Перший параметр:

    offset-x

визначає горизонтальне зміщення.

    box-shadow: 10px 0 10px rgba(0, 0, 0, 0.2);

Тінь зміщується вправо.

---

# Shadow Offset Y

Другий параметр:

    offset-y

визначає вертикальне зміщення.

    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);

Тінь зміщується вниз.

---

# Blur Radius

`blur-radius` визначає ступінь розмиття тіні.

    box-shadow:
        0
        4px
        20px
        rgba(0, 0, 0, 0.2);

Чим більше blur:

    → тим м'якша тінь

Менше blur:

    → більш чітка тінь

---

# Spread Radius

`spread-radius` змінює розмір області тіні.

    box-shadow:
        0
        4px
        10px
        5px
        rgba(0, 0, 0, 0.2);

Позитивний spread:

    → збільшує shadow

Негативний:

    → зменшує shadow

---

# Box Shadow Without Blur

Можна створити чітку тінь:

    .box {
        box-shadow:
            5px
            5px
            0
            black;
    }

Це більше схоже на зміщений декоративний шар.

---

# Negative Shadow Values

Можна використовувати від'ємні значення.

Наприклад:

    .box {
        box-shadow:
            -5px
            5px
            10px
            rgba(0, 0, 0, 0.2);
    }

Тінь зміщується:

    left
    down

---

# Inset Shadow

`inset` створює внутрішню тінь.

    .box {
        box-shadow:
            inset
            0
            4px
            8px
            rgba(0, 0, 0, 0.2);
    }

Без `inset`:

    → зовнішня тінь

З `inset`:

    → внутрішня тінь

---

# Outer Shadow

Звичайний `box-shadow`:

    .box {
        box-shadow:
            0
            4px
            12px
            rgba(0, 0, 0, 0.2);
    }

Це outer shadow.

---

# Multiple Box Shadows

Один елемент може мати кілька shadows.

    .card {
        box-shadow:
            0 2px 4px rgba(0, 0, 0, 0.1),
            0 8px 20px rgba(0, 0, 0, 0.15);
    }

Shadows розділяються комами.

---

# Layered Shadows

Multiple shadows дозволяють створювати складніші ефекти.

    .card {
        box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.08),
            0 4px 8px rgba(0, 0, 0, 0.08),
            0 12px 24px rgba(0, 0, 0, 0.12);
    }

Такий підхід часто використовується для UI cards.

---

# Shadow Color

Колір тіні можна задавати різними способами.

    box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.2);

Або:

    box-shadow:
        0 4px 12px #0003;

Або:

    box-shadow:
        0 4px 12px rgb(0 0 0 / 20%);

---

# Text Shadow

`text-shadow` створює тінь для тексту.

Синтаксис:

    text-shadow:
        offset-x
        offset-y
        blur-radius
        color;

Наприклад:

    h1 {
        text-shadow:
            2px
            2px
            4px
            rgba(0, 0, 0, 0.3);
    }

---

# Text Shadow Without Blur

    h1 {
        text-shadow:
            2px
            2px
            0
            black;
    }

Це створює чітко зміщену тінь.

---

# Multiple Text Shadows

Можна створювати декілька текстових тіней:

    h1 {
        text-shadow:
            1px 1px 2px black,
            2px 2px 4px rgba(0, 0, 0, 0.3);
    }

---

# Text Shadow Effects

Наприклад:

    .title {
        text-shadow:
            0 2px 4px rgba(0, 0, 0, 0.25);
    }

Або декоративний ефект:

    .title {
        text-shadow:
            2px 2px 0 #ccc;
    }

---

# Border + Shadow

Border і shadow часто використовуються разом.

    .card {
        border: 1px solid #ddd;
        border-radius: 12px;
        box-shadow:
            0 4px 12px rgba(0, 0, 0, 0.1);
    }

Тут:

    border
        → визначає межу

    border-radius
        → заокруглює кути

    box-shadow
        → додає depth

---

# Card

Типовий card:

    .card {
        padding: 24px;
        border: 1px solid #ddd;
        border-radius: 12px;
        background: white;
        box-shadow:
            0 4px 16px rgba(0, 0, 0, 0.08);
    }

---

# Button

Типова кнопка:

    .button {
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow:
            0 2px 4px rgba(0, 0, 0, 0.1);
    }

---

# Button Hover Shadow

Тінь можна змінювати при hover.

    .button {
        box-shadow:
            0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .button:hover {
        box-shadow:
            0 6px 12px rgba(0, 0, 0, 0.15);
    }

Для плавного переходу використовується:

    transition

Це буде детально розглядатися у розділі:

    08-transitions

---

# Border Hover

Наприклад:

    .button {
        border: 2px solid transparent;
    }

    .button:hover {
        border-color: blue;
    }

Transparent border допомагає уникнути зміни розміру елемента.

---

# Focus + Border + Outline

Для доступного input:

    input {
        border: 1px solid #aaa;
    }

    input:focus-visible {
        border-color: blue;
        outline: 2px solid blue;
        outline-offset: 2px;
    }

Тут:

    border
        → звичайний стан

    border-color
        → focus state

    outline
        → додатковий focus indicator

---

# Border as Divider

Border часто використовується як роздільник.

Наприклад:

    .item {
        border-bottom: 1px solid #ddd;
    }

Останній елемент можна виключити:

    .item:last-child {
        border-bottom: none;
    }

---

# Card List

Наприклад:

    .item {
        padding: 16px 0;
        border-bottom: 1px solid #ddd;
    }

    .item:last-child {
        border-bottom: none;
    }

---

# Border and Pseudo-classes

Borders часто змінюються за допомогою pseudo-classes.

Наприклад:

    .button:hover {
        border-color: blue;
    }

    .input:focus {
        border-color: green;
    }

    .checkbox:checked {
        border-color: red;
    }

Pseudo-classes детально розглядаються в:

    04-pseudoclasses

---

# Border and Pseudo-elements

Borders також можуть бути частиною декоративних pseudo-elements.

Наприклад:

    .title::after {
        content: "";
        display: block;
        width: 60px;
        height: 3px;
        margin-top: 8px;
        background: black;
        border-radius: 999px;
    }

Це дозволяє створювати декоративну лінію під заголовком.

Pseudo-elements детально розглядаються в:

    05-pseudoelements

---

# Dashed Border

Штрихова рамка:

    .box {
        border: 2px dashed #888;
        border-radius: 8px;
    }

Часто використовується для:

    upload areas
    placeholders
    drop zones
    decorative containers

---

# Dotted Border

    .box {
        border: 2px dotted #888;
    }

Може використовуватися для:

    декоративних блоків
    separators
    placeholders

---

# Double Border

    .box {
        border: 4px double #333;
    }

Часто використовується для:

    декоративних рамок
    certificates
    headings
    special cards

---

# Border Color and CurrentColor

`currentColor` використовує поточне значення `color`.

Наприклад:

    .link {
        color: blue;
        border-bottom: 1px solid currentColor;
    }

Якщо змінити:

    color: red;

border автоматично стане червоним.

Це корисний спосіб синхронізувати текст і border.

---

# Border as Underline

Замість:

    text-decoration

іноді можна використовувати:

    border-bottom

Наприклад:

    .link {
        border-bottom: 2px solid currentColor;
    }

Але для справжнього підкреслення тексту семантично часто краще:

    text-decoration

---

# Box Shadow and Transparent Background

Shadow може працювати незалежно від background.

    .card {
        background: transparent;
        box-shadow:
            0 4px 12px rgba(0, 0, 0, 0.2);
    }

---

# Shadow and Border Radius

Shadow автоматично враховує форму box.

    .card {
        border-radius: 20px;
        box-shadow:
            0 8px 24px rgba(0, 0, 0, 0.15);
    }

Тому rounded card отримує відповідну rounded shadow.

---

# Shadow Performance

Велика кількість складних shadows може збільшувати rendering cost.

Особливо обережно потрібно використовувати:

    дуже великі blur values
    багато layered shadows
    shadows на великій кількості елементів
    анімовані shadows

Для звичайного UI:

    1–2 прості shadows

часто достатньо.

---

# Shadow and Accessibility

Shadow не повинен бути єдиним способом передачі важливої інформації.

Наприклад, не варто робити:

    normal → no shadow
    selected → shadow

як єдиний indicator selected state.

Краще комбінувати:

    color
    border
    icon
    text
    shadow

---

# Shadow and Hover

Типовий interaction pattern:

    .card {
        box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .card:hover {
        box-shadow:
            0 8px 20px rgba(0, 0, 0, 0.15);
    }

Це створює ефект підняття card.

---

# Shadow and Active State

Можна створити ефект натискання:

    .button {
        box-shadow:
            0 4px 0 #999;
    }

    .button:active {
        box-shadow:
            0 1px 0 #999;
    }

Разом із transform:

    .button:active {
        transform: translateY(3px);
        box-shadow: none;
    }

---

# Neumorphism

Neumorphism використовує кілька shadows для створення м'якого об'ємного UI.

Наприклад:

    .box {
        background: #e0e0e0;
        box-shadow:
            8px 8px 16px rgba(0, 0, 0, 0.15),
            -8px -8px 16px rgba(255, 255, 255, 0.7);
    }

Це декоративний стиль.

Його потрібно використовувати обережно, особливо з точки зору contrast та accessibility.

---

# Inset UI

Внутрішня тінь:

    .input {
        box-shadow:
            inset
            0
            2px
            6px
            rgba(0, 0, 0, 0.12);
    }

Може створювати візуальний ефект:

    pressed
    recessed
    inset

---

# Border + Inset Shadow

    .input {
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow:
            inset
            0
            1px
            3px
            rgba(0, 0, 0, 0.1);
    }

Border створює edge.

Inset shadow створює depth.

---

# Shadow Tokens

У великих проектах shadows часто зберігаються як CSS variables.

    :root {
        --shadow-sm:
            0 1px 2px rgba(0, 0, 0, 0.08);

        --shadow-md:
            0 4px 12px rgba(0, 0, 0, 0.12);

        --shadow-lg:
            0 12px 24px rgba(0, 0, 0, 0.16);
    }

Використання:

    .card {
        box-shadow: var(--shadow-md);
    }

---

# Border Tokens

Так само можна створювати variables для borders.

    :root {
        --border-color: #ddd;
        --border-radius: 8px;
        --border-width: 1px;
    }

Використання:

    .card {
        border:
            var(--border-width)
            solid
            var(--border-color);

        border-radius:
            var(--border-radius);
    }

---

# Design System

У design system часто визначають:

    border colors
    border widths
    border radii
    shadow levels

Наприклад:

    :root {
        --border-width-sm: 1px;
        --border-width-md: 2px;

        --radius-sm: 4px;
        --radius-md: 8px;
        --radius-lg: 16px;
        --radius-full: 999px;

        --shadow-sm:
            0 1px 2px rgba(0, 0, 0, 0.08);

        --shadow-md:
            0 4px 12px rgba(0, 0, 0, 0.12);

        --shadow-lg:
            0 12px 24px rgba(0, 0, 0, 0.16);
    }

---

# Border Radius Design

Типова шкала:

    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 16px;
    --radius-xl: 24px;
    --radius-full: 999px;

Використання:

    .button {
        border-radius: var(--radius-md);
    }

    .card {
        border-radius: var(--radius-lg);
    }

    .badge {
        border-radius: var(--radius-full);
    }

---

# Practical Examples

## Приклад 1 — проста рамка

    .box {
        border: 1px solid #333;
    }

---

## Приклад 2 — rounded card

    .card {
        padding: 24px;
        border: 1px solid #ddd;
        border-radius: 12px;
    }

---

## Приклад 3 — card з тінню

    .card {
        padding: 24px;
        border: 1px solid #ddd;
        border-radius: 12px;
        box-shadow:
            0 4px 12px rgba(0, 0, 0, 0.1);
    }

---

## Приклад 4 — circle

    .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

---

## Приклад 5 — pill

    .badge {
        padding: 6px 12px;
        border-radius: 999px;
    }

---

## Приклад 6 — dashed box

    .upload {
        padding: 40px;
        border: 2px dashed #aaa;
        border-radius: 12px;
    }

---

## Приклад 7 — bottom divider

    .item {
        padding: 16px 0;
        border-bottom: 1px solid #ddd;
    }

    .item:last-child {
        border-bottom: none;
    }

---

## Приклад 8 — focus

    input:focus-visible {
        border-color: blue;
        outline: 2px solid blue;
        outline-offset: 2px;
    }

---

## Приклад 9 — hover shadow

    .card {
        box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .card:hover {
        box-shadow:
            0 8px 20px rgba(0, 0, 0, 0.15);
    }

---

## Приклад 10 — inset shadow

    .input {
        box-shadow:
            inset
            0
            2px
            6px
            rgba(0, 0, 0, 0.12);
    }

---

## Приклад 11 — multiple shadows

    .card {
        box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.08),
            0 4px 8px rgba(0, 0, 0, 0.08),
            0 12px 24px rgba(0, 0, 0, 0.12);
    }

---

## Приклад 12 — text shadow

    h1 {
        text-shadow:
            2px
            2px
            4px
            rgba(0, 0, 0, 0.25);
    }

---

## Приклад 13 — transparent border

    .button {
        border: 2px solid transparent;
    }

    .button:hover {
        border-color: blue;
    }

---

## Приклад 14 — currentColor

    .link {
        color: blue;
        border-bottom: 1px solid currentColor;
    }

---

## Приклад 15 — logical borders

    .section {
        border-block:
            1px solid #ddd;
    }

    .container {
        border-inline:
            1px solid #ddd;
    }

---

# Типові помилки

❌ Забувати `border-style`.

Наприклад:

    .box {
        border-width: 2px;
        border-color: red;
    }

Без `border-style` border за замовчуванням:

    none

Правильно:

    .box {
        border:
            2px
            solid
            red;
    }

---

❌ Не враховувати border у box model.

Наприклад:

    .box {
        width: 300px;
        border: 10px solid black;
    }

За:

    box-sizing: content-box;

border збільшує фактичний розмір box.

---

❌ Плутати border та outline.

    border
        → part of box model

    outline
        → outside box model

---

❌ Прибирати outline без альтернативи.

Погано:

    button:focus {
        outline: none;
    }

Краще:

    button:focus-visible {
        outline: 2px solid blue;
        outline-offset: 2px;
    }

---

❌ Надмірно використовувати shadows.

Наприклад:

    box-shadow:
        0 30px 80px rgba(...);

для кожного елемента сторінки може створити важкий та перевантажений UI.

---

❌ Використовувати shadow як єдиний state indicator.

Наприклад:

    normal → no shadow
    selected → shadow

Краще додати:

    border
    color
    icon
    text
    shadow

---

❌ Занадто великі blur values.

Великі blur можуть створювати:

    нечіткий UI
    надмірний glow
    зайве rendering навантаження

---

❌ Забувати про `border-radius` разом із внутрішнім контентом.

Наприклад, якщо image виходить за межі rounded card:

    .card {
        border-radius: 16px;
    }

може знадобитися:

    .card {
        border-radius: 16px;
        overflow: hidden;
    }

---

❌ Використовувати багато різних radius у одному UI.

Краще мати обмежену систему:

    small
    medium
    large
    full

---

❌ Використовувати занадто багато різних shadows.

Краще мати невелику систему:

    shadow-sm
    shadow-md
    shadow-lg

---

# Border vs Outline vs Box Shadow

| Властивість | Призначення | Box Model |
|---|---|---|
| `border` | межа елемента | входить |
| `outline` | зовнішній контур | не входить |
| `box-shadow` | тінь / depth | не займає layout space |
| `border-radius` | заокруглення | змінює форму box |

---

# Border vs Box Shadow

`border`:

    .card {
        border: 1px solid #ddd;
    }

Використовуй для:

    visible edge
    divider
    input boundary
    button boundary
    structural separation

`box-shadow`:

    .card {
        box-shadow:
            0 4px 12px rgba(0, 0, 0, 0.1);
    }

Використовуй для:

    depth
    elevation
    floating cards
    hover effect
    visual hierarchy

---

# Outline vs Border

`border`:

    займає місце
    входить у box model
    може впливати на dimensions

`outline`:

    не займає місце
    не впливає на layout
    корисний для focus

---

# Border Radius vs Clip

`border-radius` змінює форму border box.

Для обрізання внутрішнього контенту часто використовується:

    overflow: hidden;

Наприклад:

    .card {
        border-radius: 16px;
        overflow: hidden;
    }

---

# Питання зі співбесіди

Що таке `border`?

З яких частин складається border?

Що робить:

    border-width
    border-style
    border-color

Що таке border shorthand?

Який порядок значень у:

    border: 1px solid black;

Як задати border тільки зверху?

Як задати border тільки зліва?

Що означає:

    border-width: 1px 2px 3px 4px;

Що таке `border-radius`?

Як створити коло за допомогою CSS?

Як створити pill-shaped element?

Що таке `box-shadow`?

Який синтаксис `box-shadow`?

Що таке:

    offset-x
    offset-y
    blur-radius
    spread-radius

Що робить `inset` у `box-shadow`?

Чи може елемент мати кілька shadows?

Що таке `text-shadow`?

Чим `box-shadow` відрізняється від `text-shadow`?

Що таке `outline`?

Чим `outline` відрізняється від `border`?

Чи займає outline місце в box model?

Для чого потрібен `outline-offset`?

Чому не варто просто писати:

    outline: none;

для `:focus`?

Що таке transparent border?

Навіщо використовувати:

    border: 2px solid transparent;

Що таке `currentColor`?

Що таке logical border properties?

Для чого потрібні:

    border-block
    border-inline

Що таке `border-image`?

Як border впливає на box model?

Як `box-sizing: border-box` впливає на border?

Як створити card з border та shadow?

Як створити focus ring?

Як створити divider за допомогою border?

Як зробити shadow внутрішнім?

Як створити кілька shadows?

---

# Шлях

## 🟢 Core (обов'язково знати)

Що таке border.

`border`.

`border-width`.

`border-style`.

`border-color`.

Border shorthand.

Основні border styles:

    solid
    dashed
    dotted
    double
    none

Border sides:

    top
    right
    bottom
    left

`border-radius`.

Rounded corners.

Circle:

    border-radius: 50%;

Pill:

    border-radius: 999px;

Box model.

Border та `box-sizing`.

`box-shadow`.

Shadow offset.

Blur.

Spread.

Shadow color.

`inset`.

Multiple shadows.

`text-shadow`.

`outline`.

`outline-offset`.

Border vs outline.

Focus ring.

---

## 🔵 Junior

Впевнене використання:

    border
    border-radius
    box-shadow
    outline

Розуміння:

    border shorthand
    four-side syntax
    border sides
    box model
    box-sizing

Створення:

    cards
    buttons
    inputs
    badges
    avatars
    dividers

Використання:

    hover
    focus
    active

Transparent borders.

`currentColor`.

Logical properties:

    border-block
    border-inline

Multiple shadows.

Inset shadows.

Розуміння border та shadow у design systems.

CSS variables для:

    border colors
    border widths
    radii
    shadows

---

## 🟠 Middle

Глибше розуміння:

    box model
    border geometry
    border-radius
    shadow rendering
    stacking contexts

Використання:

    border-image
    multiple shadows
    complex shadow systems
    logical properties
    design tokens

Побудова системи:

    border tokens
    radius tokens
    shadow tokens

Оптимізація visual effects.

Розуміння rendering cost.

Доступні focus states.

Створення reusable UI components.

Consistent visual hierarchy.

---

## 🔴 Senior

Глибоке розуміння:

    CSS painting
    box geometry
    border rendering
    shadow rendering
    clipping
    overflow
    stacking contexts
    compositing

Оптимізація:

    complex shadows
    animated shadows
    large blur regions
    large numbers of decorated elements

Розуміння trade-offs між:

    border
    outline
    box-shadow
    pseudo-elements
    gradients

Design system architecture:

    border tokens
    radius scale
    elevation scale
    focus ring system

Accessibility:

    focus visibility
    contrast
    non-color indicators
    reduced motion

Використання CSS variables для централізованої системи visual styling.

---

# Міні-шпаргалка

## Border

    border: 1px solid black;

Структура:

    border:
        width
        style
        color

---

## Border sides

    border-top
    border-right
    border-bottom
    border-left

---

## Border width

    border-width: 1px 2px 3px 4px;

Порядок:

    top
    right
    bottom
    left

---

## Border radius

    border-radius: 12px;

---

## Circle

    width: 100px;
    height: 100px;
    border-radius: 50%;

---

## Pill

    border-radius: 999px;

---

## Box shadow

    box-shadow:
        0
        4px
        12px
        rgba(0, 0, 0, 0.15);

Структура:

    offset-x
    offset-y
    blur
    color

З `spread`:

    offset-x
    offset-y
    blur
    spread
    color

---

## Inset

    box-shadow:
        inset
        0
        2px
        6px
        rgba(0, 0, 0, 0.15);

    inset → внутрішня тінь

---

## Multiple shadows

    box-shadow:
        0 2px 4px rgba(0, 0, 0, 0.1),
        0 8px 20px rgba(0, 0, 0, 0.15);

---

## Text shadow

    text-shadow:
        2px
        2px
        4px
        rgba(0, 0, 0, 0.25);

---

## Outline

    outline: 2px solid blue;

---

## Outline offset

    outline: 2px solid blue;
    outline-offset: 3px;

---

## Focus

    button:focus-visible {
        outline: 2px solid blue;
        outline-offset: 3px;
    }

---

## Transparent border

    border: 2px solid transparent;

---

## Current color

    color: blue;
    border-color: currentColor;

---

## Logical borders

    border-block: 1px solid #ddd;
    border-inline: 1px solid #ddd;

---

## Card

    .card {
        padding: 24px;
        border: 1px solid #ddd;
        border-radius: 12px;
        box-shadow:
            0 4px 12px rgba(0, 0, 0, 0.1);
    }

---

# Основні правила

    border
        → межа елемента

    border-radius
        → заокруглення

    box-shadow
        → зовнішня/внутрішня тінь

    text-shadow
        → тінь тексту

    outline
        → зовнішній контур

    outline-offset
        → відстань outline від елемента

---

# Головне:

• `border` створює межу навколо елемента.

• Border має:

    width
    style
    color

• Типовий shorthand:

    border: 1px solid black;

• Основні border styles:

    solid
    dashed
    dotted
    double
    none

• Border може задаватися окремо для:

    top
    right
    bottom
    left

• `border-radius` заокруглює кути.

• `border-radius: 50%` може створити коло для квадратного елемента.

• Великий `border-radius`, наприклад:

    999px

часто використовується для pill-shaped елементів.

• Border є частиною box model.

• `box-sizing: border-box` включає border і padding у задані dimensions.

• `box-shadow` створює тінь навколо box.

• Основна структура shadow:

    offset-x
    offset-y
    blur
    spread
    color

• `inset` створює внутрішню тінь.

• Один елемент може мати кілька shadows.

• `text-shadow` працює з текстом.

• `outline` не займає місце в box model.

• `outline` особливо важливий для focus states.

• Не слід прибирати `outline` без створення іншого доступного focus indicator.

• `outline-offset` відсуває outline від елемента.

• Transparent border можна використовувати для стабільного layout під час hover.

• `currentColor` дозволяє синхронізувати border із поточним `color`.

• Logical properties:

    border-block
    border-inline

допомагають писати CSS незалежно від напрямку тексту.

• Для card часто використовуються разом:

    border
    border-radius
    box-shadow

• Для доступного focus часто використовуються:

    border
    outline
    outline-offset

• Для UI design system корисно централізовано визначати:

    border tokens
    radius tokens
    shadow tokens

• Не потрібно додавати shadow або border до кожного елемента — visual styling має створювати зрозумілу hierarchy.

• Простий і consistent visual system зазвичай кращий за велику кількість декоративних ефектів.

• Основна модель:

    border
        ↓
    edge

    border-radius
        ↓
    shape

    box-shadow
        ↓
    depth

    outline
        ↓
    focus / external emphasis

    text-shadow
        ↓
    text depth / decoration