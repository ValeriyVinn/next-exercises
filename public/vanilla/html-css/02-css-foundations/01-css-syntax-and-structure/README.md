# 01. CSS Syntax and Structure

CSS (Cascading Style Sheets) — це мова стилів, яка використовується для опису зовнішнього вигляду HTML-документів.

CSS визначає:

- кольори;
- шрифти;
- розміри;
- відступи;
- межі;
- фон;
- позиціонування;
- розташування елементів;
- адаптивність;
- візуальні ефекти;
- анімації;
- responsive behavior.

CSS працює разом з HTML:

    HTML → structure
    CSS  → presentation
    JavaScript → behavior

Наприклад:

    <h1>Hello</h1>

HTML створює елемент.

CSS визначає, як цей елемент виглядає:

    h1 {
        color: blue;
        font-size: 32px;
    }

---

### Ключові поняття

✔ CSS  
✔ CSS rule  
✔ CSS syntax  
✔ selector  
✔ declaration  
✔ declaration block  
✔ property  
✔ value  
✔ CSS declaration  
✔ semicolon  
✔ colon  
✔ curly braces  
✔ stylesheet  
✔ external CSS  
✔ internal CSS  
✔ inline CSS  
✔ `<link>`  
✔ `<style>`  
✔ `style` attribute  
✔ comment  
✔ whitespace  
✔ CSS source order  
✔ browser stylesheet  
✔ user-agent stylesheet  
✔ CSSOM  
✔ CSS parsing  
✔ valid CSS  
✔ invalid CSS  

---

### Що потрібно пам'ятати

• CSS складається з правил.

• CSS rule зазвичай має selector і declaration block.

• Selector визначає, до яких HTML-елементів застосовується правило.

• Declaration складається з property і value.

• Property визначає, яку характеристику потрібно змінити.

• Value визначає значення цієї характеристики.

• Declaration записується у форматі:

    property: value;

• Declaration block знаходиться всередині `{ }`.

• Кілька declarations розділяються `;`.

• Між property і value використовується `:`.

• CSS можна підключити як external stylesheet.

• CSS можна написати всередині `<style>`.

• CSS можна написати безпосередньо в HTML через `style=""`.

• Для реальних проєктів найчастіше використовують external CSS.

• CSS comments записуються:

    /* comment */

• Пробіли та переноси рядків зазвичай не змінюють значення CSS.

• Browser читає CSS, знаходить відповідні елементи та застосовує до них стилі.

---

# CSS Rule

Основна одиниця CSS — CSS rule.

Наприклад:

    p {
        color: blue;
        font-size: 16px;
    }

Тут:

    p
        ↓
    selector

    {
        ...
    }
        ↓
    declaration block

А всередині:

    color: blue;
        ↓
    declaration

---

# Структура CSS Rule

Загальна структура:

    selector {
        property: value;
    }

Наприклад:

    h1 {
        color: red;
    }

Структура:

    h1
      ↓
    selector

    color
      ↓
    property

    red
      ↓
    value

    color: red;
      ↓
    declaration

    {
        color: red;
    }
      ↓
    declaration block

---

# Selector

Selector визначає, які HTML-елементи повинні отримати стилі.

Наприклад:

    p {
        color: blue;
    }

`p` — selector.

Він означає:

    вибрати всі <p>

Наприклад:

    <p>Hello</p>
    <p>World</p>

CSS:

    p {
        color: blue;
    }

Обидва параграфи отримають синій колір.

---

# Declaration

Declaration — це пара:

    property: value;

Наприклад:

    color: red;

Тут:

    color → property
    red   → value

Ще приклади:

    font-size: 20px;
    margin: 10px;
    background-color: black;

---

# Property

Property визначає характеристику, яку CSS змінює.

Наприклад:

    color
    font-size
    width
    height
    margin
    padding
    background-color
    border

Приклад:

    p {
        color: blue;
    }

`color` — property.

---

# Value

Value — це значення property.

Наприклад:

    color: blue;

Тут:

    color → property
    blue  → value

Інші приклади:

    font-size: 20px;
    width: 300px;
    margin: 10px;
    opacity: 0.5;

---

# Declaration Block

Declaration block — це блок між фігурними дужками:

    {
        ...
    }

Наприклад:

    p {
        color: blue;
        font-size: 16px;
    }

Declaration block:

    {
        color: blue;
        font-size: 16px;
    }

Він може містити одну або багато declarations.

---

# CSS Declaration

CSS declaration має вигляд:

    property: value;

Наприклад:

    color: red;

Або:

    font-size: 20px;

Або:

    margin: 10px;

---

# Кілька Declarations

Одне правило може містити багато declarations.

    p {
        color: blue;
        font-size: 18px;
        line-height: 1.5;
        margin-bottom: 20px;
    }

Тут чотири declarations:

    color: blue;

    font-size: 18px;

    line-height: 1.5;

    margin-bottom: 20px;

---

# Semicolon

Крапка з комою:

    ;

використовується для завершення declaration.

Наприклад:

    p {
        color: blue;
        font-size: 18px;
    }

Зазвичай останню declaration також рекомендується завершувати `;`.

Тобто краще:

    p {
        color: blue;
        font-size: 18px;
    }

ніж:

    p {
        color: blue;
        font-size: 18px
    }

Для консистентності та форматування коду краще використовувати `;` після кожної declaration.

---

# Colon

Двокрапка:

    :

розділяє property і value.

Наприклад:

    color: blue;

Тут:

    color
      ↓
    property

    :
      ↓
    separator

    blue
      ↓
    value

---

# Curly Braces

Фігурні дужки:

    {
        ...
    }

визначають declaration block.

Наприклад:

    h1 {
        color: red;
    }

Структура:

    selector
       ↓
    h1
       ↓
    {
        declaration
    }

---

# CSS Syntax

Базовий синтаксис:

    selector {
        property: value;
    }

Наприклад:

    body {
        background-color: white;
        color: black;
    }

---

# Повний приклад

HTML:

    <h1>Hello</h1>
    <p>Welcome to CSS.</p>

CSS:

    h1 {
        color: blue;
        font-size: 32px;
    }

    p {
        color: gray;
        font-size: 18px;
    }

Тут є два CSS rules:

    h1 {
        ...
    }

    p {
        ...
    }

---

# CSS Stylesheet

Stylesheet — файл, який містить CSS-код.

Наприклад:

    styles.css

Вміст:

    body {
        font-family: Arial, sans-serif;
    }

    h1 {
        color: blue;
    }

    p {
        color: gray;
    }

HTML підключає його:

    <link rel="stylesheet" href="styles.css">

---

# External CSS

External CSS — CSS знаходиться в окремому `.css` файлі.

Наприклад:

    index.html
    styles.css

`styles.css`:

    body {
        background-color: white;
    }

`index.html`:

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>CSS</title>

        <link rel="stylesheet" href="styles.css">
    </head>

    <body>
        <h1>Hello</h1>
    </body>
    </html>

Це найпоширеніший спосіб організації CSS у проєктах.

---

# `<link>`

Для підключення external stylesheet використовується:

    <link rel="stylesheet" href="styles.css">

Основні атрибути:

    rel="stylesheet"
    href="styles.css"

`rel="stylesheet"` повідомляє браузеру, що це stylesheet.

`href` вказує шлях до CSS-файлу.

---

# Відносний шлях до CSS

Якщо структура:

    project/
    ├── index.html
    └── css/
        └── styles.css

У `index.html`:

    <link rel="stylesheet" href="./css/styles.css">

Якщо CSS знаходиться поруч:

    project/
    ├── index.html
    └── styles.css

Тоді:

    <link rel="stylesheet" href="./styles.css">

---

# Absolute vs Relative Path

Відносний шлях:

    <link rel="stylesheet" href="./css/styles.css">

Абсолютний URL:

    <link
        rel="stylesheet"
        href="https://example.com/styles.css"
    >

У власних проєктах найчастіше використовуються відносні шляхи або шляхи, які генерує framework/build system.

---

# Internal CSS

CSS можна написати безпосередньо в HTML всередині:

    <style>

Наприклад:

    <!DOCTYPE html>
    <html>
    <head>
        <style>
            h1 {
                color: blue;
            }
        </style>
    </head>

    <body>
        <h1>Hello</h1>
    </body>
    </html>

Це називається:

    internal CSS
    або
    embedded CSS

---

# Inline CSS

CSS можна записати безпосередньо в HTML-атрибуті:

    style="..."

Наприклад:

    <h1 style="color: blue;">
        Hello
    </h1>

Це:

    inline CSS

---

# Три способи підключення CSS

## External

    <link
        rel="stylesheet"
        href="styles.css"
    >

CSS:

    h1 {
        color: blue;
    }

---

## Internal

    <style>
        h1 {
            color: blue;
        }
    </style>

---

## Inline

    <h1 style="color: blue;">
        Hello
    </h1>

---

# External vs Internal vs Inline

### External CSS

    <link rel="stylesheet" href="styles.css">

Переваги:

    ✔ reusable
    ✔ окремий файл
    ✔ зручніше підтримувати
    ✔ можна використовувати на багатьох сторінках
    ✔ добре підходить для реальних проєктів

---

### Internal CSS

    <style>
        h1 {
            color: blue;
        }
    </style>

Може бути зручним:

    ✔ для невеликих сторінок
    ✔ для навчальних прикладів
    ✔ для специфічних локальних стилів

---

### Inline CSS

    <h1 style="color: blue;">
        Hello
    </h1>

Може бути корисним для:

    ✔ швидкого тестування
    ✔ динамічно згенерованих стилів у деяких сценаріях

Але надмірне використання inline styles погіршує:

    ✘ підтримуваність
    ✘ повторне використання
    ✘ читабельність
    ✘ розділення структури та presentation

---

# CSS Comments

CSS comment:

    /* comment */

Наприклад:

    /* Main heading */

    h1 {
        color: blue;
    }

Comment може бути в окремому рядку:

    /*
        Main heading
        Page title
    */

    h1 {
        color: blue;
    }

---

# Inline Comment Position

Comment можна розміщувати між CSS-кодом:

    h1 {
        color: blue;

        /* Main heading size */
        font-size: 32px;
    }

---

# Comment для секцій

У великих stylesheet comments можуть розділяти секції:

    /* =========================
       Header
       ========================= */

    .header {
        ...
    }

    /* =========================
       Main
       ========================= */

    .main {
        ...
    }

---

# Whitespace

CSS дозволяє використовувати пробіли та переноси рядків.

Наприклад:

    h1 {
        color: blue;
        font-size: 32px;
    }

Можна записати інакше:

    h1{color:blue;font-size:32px;}

Обидва варіанти можуть бути валідними.

Але перший варіант значно читабельніший.

Тому зазвичай використовують:

    selector {
        property: value;
        property: value;
    }

---

# Formatting

Рекомендується:

    h1 {
        color: blue;
        font-size: 32px;
        margin-bottom: 20px;
    }

Не рекомендується:

    h1{color:blue;font-size:32px;margin-bottom:20px}

Причина:

    readability
    maintainability
    consistency

Форматування особливо важливе у командній роботі.

---

# Case Sensitivity

Імена CSS properties зазвичай пишуться lowercase:

    background-color
    font-size
    margin-top

CSS keywords і значення мають свої правила чутливості до регістру залежно від конкретного контексту.

Для практичного коду рекомендується використовувати стандартний lowercase-стиль:

    color: red;
    background-color: white;

---

# CSS Property Naming

CSS properties використовують kebab-case.

Наприклад:

    background-color
    font-size
    border-radius
    margin-top
    padding-left
    line-height

Не:

    backgroundColor

Не:

    fontSize

Правильно:

    background-color
    font-size

---

# Vendor Prefixes

Історично браузери використовували vendor prefixes для експериментальних або специфічних властивостей.

Наприклад:

    -webkit-...
    -moz-...
    -ms-...

Приклади з історії CSS:

    -webkit-transform: ...;
    -moz-transform: ...;

Сьогодні багато таких prefix-ів більше не потрібні для стандартних властивостей.

У сучасному CSS краще спочатку використовувати стандартний синтаксис, а необхідність prefix-ів перевіряти за актуальною browser compatibility.

---

# CSS Keywords

CSS має спеціальні keyword values.

Наприклад:

    auto
    none
    inherit
    initial
    unset
    revert
    transparent

Приклад:

    margin: auto;

    display: none;

    color: inherit;

Ці значення будуть детальніше розглядатися в інших розділах CSS.

---

# CSS Values

Values можуть мати різні типи.

Наприклад:

    color: red;

    font-size: 20px;

    width: 50%;

    opacity: 0.5;

    margin: auto;

    transform: translateX(20px);

У CSS існують:

    keywords
    numbers
    dimensions
    percentages
    colors
    functions
    strings
    custom identifiers

---

# Number

Числове значення:

    opacity: 0.5;

Інші приклади:

    flex-grow: 1;

    z-index: 10;

    line-height: 1.5;

Не кожна CSS property використовує однаковий тип числового значення.

---

# Dimension

Dimension складається з числа та одиниці.

Наприклад:

    20px
    2rem
    50vw
    10vh
    5em

Приклад:

    width: 300px;

    font-size: 1.5rem;

---

# Percentage

Відсотки:

    50%

Наприклад:

    width: 50%;

Значення percentage зазвичай розраховується відносно певного reference value, який залежить від конкретної property.

---

# CSS Function

CSS підтримує functions.

Наприклад:

    rgb(255, 0, 0)

    calc(100% - 20px)

    min(100%, 500px)

    max(20px, 2vw)

    clamp(1rem, 2vw, 2rem)

Приклад:

    .container {
        width: calc(100% - 40px);
    }

CSS functions будуть детально розглядатися у:

    07-css-functions

---

# String Value

Деякі CSS values можуть бути рядками.

Наприклад:

    content: "Hello";

Особливо часто це зустрічається з pseudo-elements:

    .message::before {
        content: "→";
    }

---

# Multiple Values

Деякі properties приймають декілька values.

Наприклад:

    margin: 10px 20px;

Або:

    padding: 10px 20px 30px 40px;

Або:

    font-family: Arial, sans-serif;

Точне значення та порядок values залежать від property.

---

# Shorthand Properties

Shorthand property дозволяє записати декілька related properties коротше.

Наприклад:

    margin: 10px 20px;

Замість:

    margin-top: 10px;
    margin-right: 20px;
    margin-bottom: 10px;
    margin-left: 20px;

Інші приклади:

    padding
    margin
    border
    background
    font

---

# Longhand Properties

Longhand — окрема конкретна property.

Наприклад:

    margin-top
    margin-right
    margin-bottom
    margin-left

Приклад:

    .box {
        margin-top: 10px;
        margin-right: 20px;
        margin-bottom: 30px;
        margin-left: 40px;
    }

Shorthand:

    .box {
        margin: 10px 20px 30px 40px;
    }

---

# CSS Rule with Multiple Selectors

Можна застосувати один набір стилів до декількох selectors.

Наприклад:

    h1,
    h2,
    h3 {
        color: blue;
    }

Тут:

    h1
    h2
    h3

отримують однаковий `color`.

---

# Selector List

Коли selectors розділяються комами:

    h1,
    h2,
    h3 {
        color: blue;
    }

це selector list.

Кома означає:

    застосувати це правило до кожного selector

---

# Multiple CSS Rules

В одному stylesheet може бути багато правил:

    h1 {
        color: blue;
    }

    p {
        color: gray;
    }

    button {
        background-color: black;
        color: white;
    }

Браузер обробляє всі правила та визначає, які стилі застосовуються до конкретного елемента.

---

# Duplicate Rules

Один selector може зустрічатися декілька разів.

Наприклад:

    p {
        color: red;
    }

    p {
        font-size: 18px;
    }

Обидва правила можуть застосуватися.

Результат:

    color: red;
    font-size: 18px;

---

# Conflicting Declarations

Якщо два правила встановлюють різні значення однієї property:

    p {
        color: red;
    }

    p {
        color: blue;
    }

виникає conflict.

Яке значення переможе, залежить від CSS cascade.

У спрощеному вигляді source order може бути важливим, якщо інші фактори однакові.

У цьому випадку:

    color: blue;

буде застосовано.

Cascade та specificity будуть детально розглядатися у:

    03-specificity-and-cascade

---

# Source Order

Source order — порядок CSS rules у stylesheet.

Наприклад:

    p {
        color: red;
    }

    p {
        color: blue;
    }

За інших однакових умов пізніше правило може перемогти:

    color: blue;

Але source order — лише один із факторів cascade.

Також мають значення:

    origin
    importance
    specificity
    source order

---

# CSS Cascade

Cascade — механізм, який визначає, яке CSS declaration має бути застосоване, коли кілька declarations впливають на одну property.

Наприклад:

    p {
        color: red;
    }

    p {
        color: blue;
    }

Браузер повинен визначити:

    який color застосувати?

Це вирішується CSS cascade.

Детально:

    03-specificity-and-cascade

---

# CSS Specificity

Specificity визначає вагу selector під час cascade.

Наприклад:

    p {
        color: blue;
    }

    .text {
        color: red;
    }

Для:

    <p class="text">Hello</p>

обидва selectors підходять.

Але:

    .text

має вищу specificity, ніж:

    p

Тому:

    color: red;

має перевагу.

Specificity буде детально розглядатися у:

    03-specificity-and-cascade

---

# Inheritance

Деякі CSS properties можуть успадковуватися від parent element.

Наприклад:

    body {
        color: blue;
    }

    <body>
        <p>Hello</p>
    </body>

`p` може успадкувати:

    color: blue;

Inheritance буде детально розглядатися у:

    04-inheritance

---

# CSS Initial Value

Кожна CSS property має визначене початкове значення.

Наприклад, деякі properties мають initial values, які браузер використовує, якщо declaration не встановлена іншим способом.

Можна явно використати:

    initial

Наприклад:

    color: initial;

Це означає:

    повернути property до її initial value

---

# inherit

`inherit` змушує property успадкувати значення від parent.

Наприклад:

    .child {
        color: inherit;
    }

Це означає:

    використовувати color батьківського елемента

---

# unset

`unset` поводиться залежно від того, чи property успадковується.

Спрощено:

    inherited property
        → inherit

    non-inherited property
        → initial

Наприклад:

    color: unset;

---

# revert

`revert` повертає стилізацію до попереднього рівня cascade.

Це може бути корисно, коли потрібно повернути браузерну або іншу зовнішню стилізацію.

Наприклад:

    button {
        all: revert;
    }

`revert` відрізняється від `initial`.

---

# Browser Default Styles

Браузер має власні default styles.

Наприклад:

    h1
    p
    ul
    button
    input

можуть мати стандартні стилі.

Наприклад:

    h1 {
        display: block;
        font-size: 2em;
        margin-block-start: 0.67em;
        margin-block-end: 0.67em;
    }

Конкретні default styles залежать від браузера та user-agent stylesheet.

---

# User-Agent Stylesheet

Browser має user-agent stylesheet.

Це стандартні CSS-правила, які браузер застосовує до HTML elements до того, як авторські стилі повністю визначать їх presentation.

Наприклад, браузер може мати default styling для:

    h1
    p
    ul
    button
    input
    a

У DevTools ці правила часто видно як:

    user agent stylesheet

---

# Reset / Normalize

Щоб зменшити відмінності browser defaults, проєкти можуть використовувати:

    CSS reset
    CSS normalize
    modern reset

Наприклад:

    * {
        box-sizing: border-box;
    }

Або:

    body {
        margin: 0;
    }

Повноцінні reset/normalize підходи будуть розглядатися окремо в architecture / styling частинах курсу.

---

# CSS Parsing

Браузер отримує CSS і аналізує його.

Спрощено:

    CSS source
        ↓
    parsing
        ↓
    CSS rules
        ↓
    matching selectors
        ↓
    cascade
        ↓
    computed values
        ↓
    rendering

Не потрібно на початковому етапі запам'ятовувати всі внутрішні етапи браузера.

Важливо розуміти загальну модель:

    CSS
      ↓
    browser parses CSS
      ↓
    rules match elements
      ↓
    cascade resolves conflicts
      ↓
    styles are applied
      ↓
    browser renders page

---

# CSSOM

CSSOM — CSS Object Model.

Це структуроване представлення CSS, яке браузер створює під час обробки stylesheet.

Спрощено:

    CSS file
        ↓
    parser
        ↓
    CSSOM

Разом із DOM CSSOM використовується браузером для побудови rendering process.

Для Core CSS достатньо знати:

    DOM  → structure
    CSSOM → CSS rules

---

# DOM + CSSOM

Спрощена модель:

    HTML
      ↓
    DOM

    CSS
      ↓
    CSSOM

Потім браузер використовує інформацію про DOM і CSS для визначення стилів та rendering.

У більш глибокому вивченні:

    HTML
      ↓
    DOM

    CSS
      ↓
    CSSOM

    DOM + CSSOM
      ↓
    render-related structures
      ↓
    layout
      ↓
    paint
      ↓
    composite

---

# Valid CSS

Valid CSS — CSS, який відповідає синтаксису та правилам CSS.

Наприклад:

    p {
        color: blue;
    }

Це valid CSS.

---

# Invalid CSS

Наприклад:

    p {
        color blue;
    }

Тут відсутня `:`.

Правильно:

    p {
        color: blue;
    }

---

# Browser Error Recovery

CSS браузери намагаються обробляти навіть частково неправильний stylesheet.

Наприклад:

    p {
        color: blue;
        invalid-property: something;
        font-size: 18px;
    }

Невідома property може бути проігнорована, а інші valid declarations можуть продовжити працювати.

Тому:

    одна помилка ≠ обов'язково повністю зламаний stylesheet

Але не варто покладатися на error recovery.

Краще писати valid CSS.

---

# Unknown Property

Наприклад:

    p {
        text-color: red;
    }

`text-color` не є стандартною CSS property.

Правильно:

    p {
        color: red;
    }

Браузер проігнорує невідому declaration.

---

# Invalid Value

Наприклад:

    p {
        color: 123;
    }

Якщо значення не відповідає допустимому syntax для property, declaration може бути відхилена.

Правильно:

    p {
        color: red;
    }

---

# CSS Property + Value Compatibility

Не кожне value можна використовувати з кожною property.

Наприклад:

    color: red;

valid.

А:

    color: 100px;

не є правильним значенням для звичайного `color`.

Тому потрібно знати:

    property
        ↓
    допустимі value types

---

# CSS Declaration Parsing

Наприклад:

    margin: 10px 20px;

Браузер розбирає:

    margin
      ↓
    shorthand property

    10px 20px
      ↓
    values

Потім визначає відповідні longhand properties.

У спрощеному вигляді:

    margin: 10px 20px;

означає:

    margin-top: 10px;
    margin-right: 20px;
    margin-bottom: 10px;
    margin-left: 20px;

---

# CSS Nesting

Сучасний CSS підтримує native CSS nesting.

Наприклад:

    .card {
        color: black;

        & .title {
            font-size: 24px;
        }
    }

CSS nesting дозволяє вкладати пов'язані правила.

Але на Core-рівні важливо спочатку добре розуміти класичну структуру:

    selector {
        declaration;
    }

CSS nesting буде доречно розглядати глибше в сучасному CSS.

---

# CSS Custom Properties

CSS підтримує custom properties.

Наприклад:

    :root {
        --primary-color: blue;
    }

    button {
        color: var(--primary-color);
    }

Структура:

    --primary-color
        ↓
    custom property

    var(--primary-color)
        ↓
    використання custom property

Custom properties будуть детальніше розглядатися в сучасному CSS та architecture.

---

# CSS Naming Conventions

Для CSS selectors часто використовують зрозумілі імена.

Наприклад:

    .header
    .navigation
    .card
    .card-title
    .button
    .button-primary

Погано:

    .red-text
    .big-box
    .thing1
    .x

якщо назва описує лише поточний вигляд, а не роль елемента.

Краще:

    .button-primary

ніж:

    .blue-button

Тому що стиль може змінитися.

---

# Class Selector Preview

Клас selector записується:

    .class-name

Наприклад:

    .card {
        padding: 20px;
    }

HTML:

    <article class="card">
        ...
    </article>

Selectors будуть детально розглядатися в:

    02-selectors

---

# ID Selector Preview

ID selector:

    #header {
        ...
    }

HTML:

    <header id="header">
        ...
    </header>

На практиці для reusable styling частіше використовуються classes.

Детально:

    02-selectors

---

# Element Selector Preview

Element selector:

    p {
        color: gray;
    }

Він вибирає всі `<p>`.

Інші приклади:

    h1
    h2
    button
    input
    article
    section

---

# Universal Selector Preview

Universal selector:

    *

Наприклад:

    * {
        box-sizing: border-box;
    }

`*` означає всі елементи, до яких selector застосовується.

Детально selectors будуть розглядатися у:

    02-selectors

---

# Attribute Selector Preview

CSS також може вибирати елементи за attributes.

Наприклад:

    input[type="email"] {
        border-color: blue;
    }

Це вже selector-level concept.

Детально:

    02-selectors

---

# CSS Organization

Простий stylesheet:

    styles.css

    body {
        ...
    }

    h1 {
        ...
    }

    p {
        ...
    }

У реальному проєкті CSS може бути розділений на:

    base
    components
    layout
    utilities
    themes
    pages

Організація CSS буде детальніше розглядатися в:

    07-css-architecture-and-maintenance

---

# CSS File Structure

Для невеликого навчального проєкту:

    project/
    ├── index.html
    └── styles.css

Для більшого проєкту може бути:

    css/
    ├── base.css
    ├── layout.css
    ├── components.css
    └── utilities.css

Або інша architecture залежно від проєкту та tooling.

---

# CSS and Separation of Concerns

HTML:

    structure / content

CSS:

    presentation

JavaScript:

    behavior

Наприклад:

HTML:

    <button class="button">
        Save
    </button>

CSS:

    .button {
        padding: 10px 20px;
        background-color: blue;
        color: white;
    }

JavaScript:

    button.addEventListener("click", () => {
        ...
    });

Такий поділ допомагає підтримувати код.

---

# CSS Does Not Create HTML Structure

CSS не замінює HTML.

HTML:

    <button>
        Save
    </button>

CSS:

    button {
        background-color: blue;
    }

CSS змінює presentation.

Воно не повинно використовуватися як заміна semantic HTML.

---

# CSS vs HTML Attributes

HTML:

    <img
        src="photo.jpg"
        alt="Mountain"
    >

CSS:

    img {
        width: 300px;
        height: 200px;
    }

HTML визначає:

    content
    semantics
    attributes

CSS визначає:

    presentation
    layout
    visual appearance

---

# CSS Rule Example

Розглянемо:

    .card {
        width: 300px;
        padding: 20px;
        background-color: white;
        border: 1px solid gray;
    }

Тут:

    .card
        → selector

    {
        ...
    }
        → declaration block

    width: 300px;
        → declaration

    width
        → property

    300px
        → value

    padding: 20px;
        → declaration

    background-color: white;
        → declaration

    border: 1px solid gray;
        → declaration

---

# Reading CSS

Коли бачиш:

    .button {
        padding: 10px 20px;
        background-color: blue;
        color: white;
    }

Читай це так:

    вибрати .button
        ↓
    встановити padding
        ↓
    встановити background-color
        ↓
    встановити color

---

# CSS Mental Model

Корисно мислити CSS так:

    SELECT
       ↓
    WHICH ELEMENTS?

       ↓

    DECLARE
       ↓
    WHICH PROPERTY?

       ↓

    VALUE
       ↓
    WHICH VALUE?

Наприклад:

    .card {
        padding: 20px;
    }

    .card
        ↓
    який елемент?

    padding
        ↓
    що змінити?

    20px
        ↓
    яке значення?

---

# Практичний приклад

HTML:

    <!DOCTYPE html>
    <html lang="uk">
    <head>
        <meta charset="UTF-8">
        <title>CSS Example</title>

        <link rel="stylesheet" href="./styles.css">
    </head>

    <body>
        <main class="page">
            <h1 class="title">
                CSS Foundations
            </h1>

            <p class="description">
                Learning CSS syntax and structure.
            </p>
        </main>
    </body>
    </html>

CSS:

    .page {
        padding: 40px;
    }

    .title {
        color: navy;
        font-size: 32px;
    }

    .description {
        color: gray;
        font-size: 18px;
    }

---

# Практичний приклад — декілька properties

    .card {
        width: 300px;
        padding: 20px;
        margin: 20px;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 8px;
    }

Один selector:

    .card

має шість declarations.

---

# Практичний приклад — selector list

    h1,
    h2,
    h3 {
        font-family: Arial, sans-serif;
        color: #222;
    }

Три selectors використовують один declaration block.

---

# Практичний приклад — comments

    /* Page title */

    h1 {
        color: blue;
        font-size: 32px;
    }

    /* Page text */

    p {
        color: gray;
    }

---

# Практичний приклад — external stylesheet

Структура:

    project/
    ├── index.html
    └── styles.css

`index.html`:

    <!DOCTYPE html>
    <html lang="uk">
    <head>
        <meta charset="UTF-8">

        <link
            rel="stylesheet"
            href="./styles.css"
        >

        <title>CSS</title>
    </head>

    <body>
        <h1>Hello CSS</h1>
        <p>Learning CSS.</p>
    </body>
    </html>

`styles.css`:

    h1 {
        color: blue;
    }

    p {
        color: gray;
    }

---

# Типові помилки

❌ Забути `:` між property і value.

Неправильно:

    p {
        color blue;
    }

Правильно:

    p {
        color: blue;
    }

---

❌ Забути `{ }`.

Неправильно:

    p
        color: blue;

Правильно:

    p {
        color: blue;
    }

---

❌ Використати неправильну property.

Неправильно:

    p {
        text-color: red;
    }

Правильно:

    p {
        color: red;
    }

---

❌ Забути одиницю там, де вона потрібна.

Наприклад:

    .box {
        width: 300;
    }

Для звичайної `width` потрібно вказати одиницю або інше допустиме значення.

Наприклад:

    .box {
        width: 300px;
    }

---

❌ Плутати property і value.

У:

    color: red;

    color → property
    red   → value

---

❌ Плутати selector і property.

У:

    p {
        color: blue;
    }

    p → selector
    color → property
    blue → value

---

❌ Забути підключити stylesheet.

CSS:

    h1 {
        color: blue;
    }

Але HTML не містить:

    <link
        rel="stylesheet"
        href="./styles.css"
    >

Тоді external stylesheet не буде завантажено.

---

❌ Неправильний шлях до CSS.

Наприклад:

    <link
        rel="stylesheet"
        href="./style.css"
    >

але файл називається:

    styles.css

Потрібно:

    <link
        rel="stylesheet"
        href="./styles.css"
    >

---

❌ Писати весь CSS inline.

Наприклад:

    <h1
        style="
            color: blue;
            font-size: 32px;
            margin-bottom: 20px;
        "
    >
        Hello
    </h1>

Для великого проєкту це швидко стає складним для підтримки.

Краще:

    <h1 class="title">
        Hello
    </h1>

CSS:

    .title {
        color: blue;
        font-size: 32px;
        margin-bottom: 20px;
    }

---

❌ Плутати HTML attribute і CSS property.

HTML:

    <input type="email">

`type` — HTML attribute.

CSS:

    input {
        width: 300px;
    }

`width` — CSS property.

---

❌ Плутати `class` та `.class`.

HTML:

    <div class="card">
        ...
    </div>

CSS:

    .card {
        ...
    }

У HTML:

    class="card"

У CSS:

    .card

---

❌ Плутати `id` та `#id`.

HTML:

    <header id="header">
        ...
    </header>

CSS:

    #header {
        ...
    }

---

❌ Забувати `;`.

Наприклад:

    .box {
        color: red
        background: white;
    }

Краще:

    .box {
        color: red;
        background: white;
    }

---

❌ Неправильно вкладати CSS braces.

Неправильно:

    .card {
        color: red;
        background: white;

Правильно:

    .card {
        color: red;
        background: white;
    }

---

# Debugging CSS

Якщо CSS не працює, перевіряти варто в такому порядку:

    1. Чи підключений CSS-файл?
    2. Чи правильний шлях до CSS?
    3. Чи selector відповідає елементу?
    4. Чи правильний property?
    5. Чи правильний value?
    6. Чи немає syntax error?
    7. Чи не перекривається declaration іншим правилом?
    8. Чи не впливає specificity?
    9. Чи не впливає inheritance?
    10. Чи немає browser default style?

---

# DevTools

Browser DevTools — один із головних інструментів для роботи з CSS.

У DevTools можна:

    ✔ переглядати HTML
    ✔ переглядати CSS
    ✔ бачити applied styles
    ✔ бачити overridden styles
    ✔ бачити specificity
    ✔ редагувати CSS
    ✔ бачити box model
    ✔ перевіряти computed styles
    ✔ тестувати різні values

---

# Styles Panel

У DevTools можна побачити приблизно:

    .card {
        padding: 20px;
        color: blue;
    }

Якщо declaration перекреслена:

    color: blue;

це може означати, що інше правило має перевагу.

Наприклад:

    .card {
        color: blue;
    }

    .card {
        color: red;
    }

У DevTools:

    color: blue;  ← overridden
    color: red;   ← applied

---

# Computed Styles

Computed styles показують фінальні обчислені значення CSS properties для елемента.

Наприклад:

    color
    display
    width
    height
    margin
    padding
    font-size

Це особливо корисно, коли CSS складається з багатьох правил.

---

# CSS Workflow

Типовий workflow:

    1. Створити HTML
    2. Створити CSS
    3. Підключити stylesheet
    4. Написати selector
    5. Додати declarations
    6. Відкрити сторінку
    7. Перевірити DevTools
    8. Виправити styles
    9. Повторити

---

# CSS Development Cycle

    HTML
      ↓
    CSS
      ↓
    Browser
      ↓
    DevTools
      ↓
    inspect
      ↓
    change CSS
      ↓
    browser
      ↓
    repeat

Це один із головних циклів навчання CSS.

---

# Питання зі співбесіди

Що таке CSS?

Для чого використовується CSS?

Яка різниця між HTML і CSS?

Що таке CSS rule?

З яких частин складається CSS rule?

Що таке selector?

Що таке declaration?

Що таке declaration block?

Що таке property?

Що таке value?

Яка різниця між property і value?

Для чого потрібна `:` у CSS?

Для чого потрібна `;`?

Для чого потрібні `{ }`?

Що таке stylesheet?

Що таке external CSS?

Що таке internal CSS?

Що таке inline CSS?

Як підключити external stylesheet?

Для чого використовується `<link>`?

Що означає `rel="stylesheet"`?

Що означає `href`?

Де можна використовувати `<style>`?

Що таке CSS comment?

Як записати CSS comment?

Що таке whitespace?

Чи має значення форматування CSS?

Що таке selector list?

Чи може один selector мати багато declarations?

Чи може один property мати різні values у різних rules?

Що таке CSS cascade?

Що таке specificity?

Що таке inheritance?

Що таке user-agent stylesheet?

Що таке browser default styles?

Що таке CSSOM?

Що відбувається з CSS після завантаження браузером?

Що таке shorthand property?

Що таке longhand property?

Що таке CSS function?

Що таке CSS custom property?

Чому краще використовувати external CSS?

Як знайти CSS-помилку через DevTools?

Що означає перекреслена CSS declaration у DevTools?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке CSS.

Для чого потрібен CSS.

Різниця між:

    HTML
    CSS
    JavaScript

CSS rule.

Selector.

Declaration.

Declaration block.

Property.

Value.

Базовий синтаксис:

    selector {
        property: value;
    }

`:` між property і value.

`;` між declarations.

`{ }` для declaration block.

External CSS.

Internal CSS.

Inline CSS.

`<link rel="stylesheet">`.

`<style>`.

`style=""`.

CSS comments.

CSS whitespace.

Основи CSS values.

Основи CSS units.

Основи shorthand.

Основи source order.

---

🔵 Junior

Упевнене читання CSS rules.

Розуміння:

    selector
    declaration
    property
    value
    declaration block

Розуміння external / internal / inline CSS.

Розуміння:

    selector list

Розуміння:

    shorthand
    longhand

Розуміння CSS comments.

Розуміння browser default styles.

Розуміння user-agent stylesheet.

Основи cascade.

Основи specificity.

Основи inheritance.

Основи CSS functions.

Основи custom properties.

Уміння знаходити CSS-помилки через DevTools.

Розуміння computed styles.

Розуміння applied / overridden declarations.

Уміння організувати простий stylesheet.

---

🟠 Middle

Глибоке розуміння CSS parsing.

CSSOM.

Cascade algorithm.

Specificity.

Inheritance.

Initial values.

Computed values.

Used values.

Actual values.

CSS-wide keywords:

    initial
    inherit
    unset
    revert
    revert-layer

Shorthand expansion.

CSS nesting.

Custom properties.

CSS functions.

CSS layers:

    @layer

Advanced stylesheet architecture.

CSS modules.

Build-time CSS processing.

Autoprefixing.

PostCSS.

CSS preprocessing.

CSS tooling.

Browser compatibility.

Progressive enhancement.

---

🔴 Senior

Глибоке розуміння CSS parsing та CSSOM.

CSS cascade origins.

Cascade layers.

Specificity management.

Inheritance model.

Computed / used / actual values.

Custom property inheritance.

CSS-wide keywords.

CSS Houdini concepts.

CSS Typed OM.

CSSOM manipulation.

CSS architecture at scale.

Design tokens.

CSS performance.

Critical CSS.

Render-blocking stylesheets.

CSS loading strategy.

Code splitting CSS.

Unused CSS.

CSS optimization.

Browser rendering pipeline.

Style calculation.

Layout.

Paint.

Composite.

CSS performance debugging.

Cross-browser compatibility.

Progressive enhancement.

Graceful degradation.

---

# Міні-шпаргалка

## CSS Rule

    selector {
        property: value;
    }

---

## Selector

Визначає:

    WHICH ELEMENTS?

Наприклад:

    p {
        color: blue;
    }

    p → selector

---

## Declaration

    property: value;

Наприклад:

    color: blue;

---

## Property

Визначає:

    WHAT TO CHANGE?

Наприклад:

    color
    font-size
    margin
    padding
    width

---

## Value

Визначає:

    WHICH VALUE?

Наприклад:

    blue
    20px
    50%
    auto

---

## Declaration Block

    {
        property: value;
        property: value;
    }

---

## External CSS

    <link
        rel="stylesheet"
        href="./styles.css"
    >

---

## Internal CSS

    <style>
        p {
            color: blue;
        }
    </style>

---

## Inline CSS

    <p style="color: blue;">
        Hello
    </p>

---

## Comment

    /* comment */

---

## Multiple Declarations

    .card {
        width: 300px;
        padding: 20px;
        color: black;
    }

---

## Selector List

    h1,
    h2,
    h3 {
        color: blue;
    }

---

## Shorthand

    margin: 10px 20px;

---

## Longhand

    margin-top: 10px;
    margin-right: 20px;
    margin-bottom: 10px;
    margin-left: 20px;

---

## Class

HTML:

    <div class="card">
        ...
    </div>

CSS:

    .card {
        ...
    }

---

## ID

HTML:

    <div id="header">
        ...
    </div>

CSS:

    #header {
        ...
    }

---

## Element Selector

    p {
        color: gray;
    }

---

## Universal Selector

    * {
        box-sizing: border-box;
    }

---

## CSS Function

    width: calc(100% - 40px);

---

## Custom Property

    :root {
        --primary-color: blue;
    }

    .button {
        color: var(--primary-color);
    }

---

## Cascade

    rule
      ↓
    selector matching
      ↓
    cascade
      ↓
    winning declaration
      ↓
    applied style

---

## Inheritance

    parent
      ↓
    inherited property
      ↓
    child

---

## Browser Defaults

Браузер має:

    user-agent stylesheet

---

## DevTools

Перевіряти:

    Styles
    Computed
    Box Model
    Applied rules
    Overridden rules

---

# CSS Mental Model

    CSS
      ↓
    selector
      ↓
    find matching elements
      ↓
    declarations
      ↓
    property + value
      ↓
    cascade
      ↓
    inheritance
      ↓
    computed styles
      ↓
    browser rendering

---

# Основна модель CSS Rule

    selector
        ↓
    declaration block
        ↓
    property
        ↓
    value

Наприклад:

    .button {
        background-color: blue;
    }

    .button
        ↓
    selector

    background-color
        ↓
    property

    blue
        ↓
    value

---

# Основні правила

    selector
        → визначає елементи

    property
        → визначає характеристику

    value
        → визначає значення

    declaration
        → property + value

    declaration block
        → { declarations }

    CSS rule
        → selector + declaration block

    external CSS
        → окремий .css файл

    internal CSS
        → <style>

    inline CSS
        → style="..."

    cascade
        → визначає переможця між competing declarations

    inheritance
        → дозволяє деяким properties переходити від parent до child

---

# Головне:

• CSS — мова стилів для опису presentation веб-документа.

• HTML відповідає переважно за structure та semantics.

• CSS відповідає переважно за presentation та layout.

• JavaScript відповідає за behavior та application logic.

• Основна структура CSS:

    selector {
        property: value;
    }

• Selector визначає, які елементи вибрати.

• Property визначає, що потрібно змінити.

• Value визначає, яке значення застосувати.

• Declaration має вигляд:

    property: value;

• Declaration block знаходиться всередині:

    { }

• `:` розділяє property і value.

• `;` завершує declaration.

• CSS rule складається із selector та declaration block.

• Один CSS rule може містити багато declarations.

• Один selector може мати багато properties.

• Один stylesheet може містити багато CSS rules.

• External CSS підключається через:

    <link
        rel="stylesheet"
        href="./styles.css"
    >

• Internal CSS пишеться всередині:

    <style>
        ...
    </style>

• Inline CSS пишеться через:

    style="..."

• Для звичайних проєктів переважно використовують external CSS або інші структуровані способи організації стилів.

• CSS comments записуються:

    /* comment */

• CSS properties зазвичай пишуться у `kebab-case`:

    background-color
    font-size
    border-radius

• CSS values можуть бути:

    keywords
    numbers
    dimensions
    percentages
    colors
    functions
    strings

• Shorthand дозволяє коротше записувати групу пов'язаних properties.

• Longhand задає окрему конкретну property.

• Наприклад:

    margin: 10px 20px;

є shorthand для групи:

    margin-top
    margin-right
    margin-bottom
    margin-left

• Один selector може застосовуватися до кількох елементів.

• Один declaration може бути перекритий іншим declaration.

• При конфліктах працює CSS cascade.

• Source order — один із факторів cascade.

• Specificity — ще один важливий фактор cascade.

• Деякі properties успадковуються від parent element.

• Браузер має власні default styles.

• User-agent stylesheet містить стандартні браузерні правила.

• DevTools — основний інструмент для перевірки CSS.

• Якщо CSS не працює, спочатку перевір:

    CSS file
    path
    selector
    property
    value
    syntax
    cascade
    specificity
    inheritance
    browser defaults

• Базовий CSS workflow:

    HTML
      ↓
    CSS
      ↓
    Browser
      ↓
    DevTools
      ↓
    inspect
      ↓
    change
      ↓
    repeat

• Найважливіша формула для запам'ятовування:

    SELECT
       ↓
    PROPERTY
       ↓
    VALUE

• Повна модель:

    selector
        ↓
    declaration
        ↓
    property + value
        ↓
    cascade
        ↓
    inheritance
        ↓
    computed style
        ↓
    rendering

• Наступний логічний крок після CSS syntax and structure:

    02-selectors

де детально вивчаються:

    element selectors
    class selectors
    ID selectors
    universal selector
    attribute selectors
    combinators
    pseudo-classes
    pseudo-elements
    selector lists
    complex selectors