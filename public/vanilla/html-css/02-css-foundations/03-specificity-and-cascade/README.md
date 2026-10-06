# 03. Specificity and Cascade

CSS Specificity and Cascade — це правила, за допомогою яких браузер визначає, **яке CSS-правило буде застосоване до елемента**, якщо на один і той самий елемент впливає декілька правил.

Це одна з найважливіших тем CSS, тому що реальна проблема часто полягає не в тому, що CSS-властивість "не працює", а в тому, що:

- інше правило має вищу specificity;
- правило знаходиться пізніше в CSS;
- властивість успадковується;
- використовується `!important`;
- правило знаходиться в іншому cascade layer;
- selector не відповідає потрібному елементу;
- browser має user-agent styles.

Наприклад:

    p {
        color: blue;
    }

    p {
        color: red;
    }

Колір буде:

    red

Обидва selectors мають однакову specificity:

    p → 0-0-1

Тому перемагає правило, яке знаходиться пізніше.

---

### Ключові поняття

✔ cascade  
✔ specificity  
✔ selector specificity  
✔ origin  
✔ user-agent styles  
✔ user styles  
✔ author styles  
✔ importance  
✔ `!important`  
✔ inline styles  
✔ type selector  
✔ class selector  
✔ ID selector  
✔ attribute selector  
✔ pseudo-class  
✔ pseudo-element  
✔ universal selector  
✔ combinator  
✔ source order  
✔ inheritance  
✔ cascade layers  
✔ `@layer`  
✔ `:where()`  
✔ `:is()`  
✔ `:not()`  
✔ `:has()`  
✔ specificity conflict  
✔ CSS debugging  

---

### Що потрібно пам'ятати

• Cascade визначає, яке з конфліктуючих CSS-декларацій буде застосоване.

• Specificity — це "вага" selector-а.

• Більш специфічний selector зазвичай перемагає менш специфічний.

• Якщо specificity однакова, перемагає правило, яке знаходиться пізніше.

• ID має більшу specificity, ніж class.

• Class має більшу specificity, ніж type selector.

• Attribute selectors мають ту саму категорію specificity, що й classes.

• Pseudo-classes мають ту саму категорію specificity, що й classes.

• Pseudo-elements мають ту саму категорію specificity, що й type selectors.

• Universal selector `*` не додає specificity.

• Combinators `>`, `+`, `~`, пробіл не додають specificity.

• `!important` змінює порядок cascade і не є частиною числової specificity.

• Inline styles мають дуже високу specificity у звичайному author CSS cascade.

• `:where()` завжди має specificity `0-0-0`.

• `:is()`, `:not()` та `:has()` отримують specificity від найбільш специфічного selector-а всередині списку.

• Cascade layers (`@layer`) дозволяють явно керувати пріоритетом груп CSS-правил.

• Не варто вирішувати всі конфлікти за допомогою `!important`.

• Найкращий CSS зазвичай має невисоку та передбачувану specificity.

---

# Cascade

`Cascade` — це механізм CSS, який визначає, яке значення властивості буде використане, коли декілька CSS-декларацій застосовуються до одного елемента.

Наприклад:

    p {
        color: blue;
    }

    p {
        color: red;
    }

Обидва правила відповідають елементу:

    <p>Hello</p>

Обидва встановлюють:

    color

Але браузер повинен вибрати одне значення.

Результат:

    color: red;

Тому що:

    specificity однакова
            ↓
    перемагає пізніше правило

---

# CSS Declaration

CSS declaration складається з:

    property: value;

Наприклад:

    color: red;

Selector визначає, до яких елементів застосовується правило:

    p {
        color: red;
    }

Тут:

    p              → selector
    color          → property
    red            → value
    color: red;    → declaration

---

# Conflicting Declarations

Конфлікт виникає, коли декілька правил встановлюють різні значення однієї властивості для одного елемента.

Наприклад:

    p {
        color: blue;
    }

    .text {
        color: red;
    }

HTML:

    <p class="text">Hello</p>

Для `<p>` застосовуються:

    color: blue;
    color: red;

Браузер повинен визначити переможця.

Перемагає:

    .text

тому що:

    .text → 0-1-0
    p      → 0-0-1

---

# Що таке Specificity

`Specificity` — це алгоритм визначення ваги CSS selector-а.

Вона використовується для порівняння selectors, які застосовуються до одного елемента.

Наприклад:

    p {
        color: blue;
    }

    .text {
        color: red;
    }

Selector:

    p

має меншу specificity, ніж:

    .text

Тому:

    .text

перемагає.

---

# Specificity Score

Зручно представляти specificity як три основні категорії:

    ID - CLASS - TYPE

Наприклад:

    0-0-1

або:

    0-1-0

або:

    1-0-0

Наприклад:

    p {
        ...
    }

має:

    0-0-1

А:

    .text {
        ...
    }

має:

    0-1-0

А:

    #title {
        ...
    }

має:

    1-0-0

---

# Specificity Categories

Основні категорії:

    ID
    CLASS / ATTRIBUTE / PSEUDO-CLASS
    TYPE / PSEUDO-ELEMENT

У навчальній моделі:

    ID          → 1-0-0
    class       → 0-1-0
    attribute   → 0-1-0
    pseudo-class → 0-1-0
    type        → 0-0-1
    pseudo-element → 0-0-1

---

# Type Selector

Type selector вибирає HTML element за назвою.

Наприклад:

    p {
        color: red;
    }

Specificity:

    0-0-1

Інші приклади:

    h1
    h2
    div
    section
    button
    input

Кожен type selector додає:

    0-0-1

Наприклад:

    main p {
        color: red;
    }

Тут:

    main → 0-0-1
    p    → 0-0-1

Разом:

    0-0-2

---

# Class Selector

Class selector має більшу specificity, ніж type selector.

Наприклад:

    .button {
        color: red;
    }

Specificity:

    0-1-0

Два classes:

    .button.primary {
        color: red;
    }

Specificity:

    0-2-0

---

# ID Selector

ID selector має дуже високу specificity.

Наприклад:

    #header {
        color: red;
    }

Specificity:

    1-0-0

ID сильніший за будь-яку кількість type selectors, але для підтримуваного CSS не рекомендується будувати всю систему стилів на ID.

---

# Attribute Selector

Attribute selector має specificity class-рівня.

Наприклад:

    [type="text"] {
        border: 1px solid;
    }

Specificity:

    0-1-0

Інші приклади:

    [disabled]
    [type="email"]
    [data-theme="dark"]

Кожен attribute selector додає:

    0-1-0

---

# Pseudo-class

Pseudo-class також має specificity class-рівня.

Наприклад:

    :hover {
        ...
    }

Specificity:

    0-1-0

Приклад:

    button:hover {
        background: black;
    }

Specificity:

    button → 0-0-1
    :hover → 0-1-0

Разом:

    0-1-1

Інші pseudo-classes:

    :focus
    :active
    :checked
    :disabled
    :first-child
    :last-child
    :nth-child()
    :not()
    :is()
    :has()

Але для functional pseudo-classes існують окремі правила specificity.

---

# Pseudo-element

Pseudo-element має specificity type-рівня.

Наприклад:

    ::before {
        content: "";
    }

Specificity:

    0-0-1

Інші:

    ::after
    ::first-line
    ::first-letter
    ::selection

Приклад:

    p::first-line {
        font-weight: bold;
    }

Specificity:

    p       → 0-0-1
    ::first-line → 0-0-1

Разом:

    0-0-2

---

# Universal Selector

Universal selector:

    *

не додає specificity.

Наприклад:

    * {
        box-sizing: border-box;
    }

Specificity:

    0-0-0

Навіть якщо він використовується разом із class:

    *.card {
        ...
    }

Specificity:

    *     → 0-0-0
    .card → 0-1-0

Разом:

    0-1-0

---

# Combinators

Combinators не додають specificity.

Приклади:

    >
    +
    ~
    space

Наприклад:

    div > p

Specificity:

    div → 0-0-1
    p   → 0-0-1

Разом:

    0-0-2

`>` не додає specificity.

---

# Descendant Selector

Пробіл також не додає specificity.

Наприклад:

    .card p {
        color: red;
    }

Specificity:

    .card → 0-1-0
    p     → 0-0-1

Разом:

    0-1-1

---

# Child Combinator

`>` вибирає direct child.

Наприклад:

    .card > p {
        color: red;
    }

Specificity:

    .card → 0-1-0
    p     → 0-0-1
    >     → 0-0-0

Разом:

    0-1-1

---

# Adjacent Sibling

`+` не додає specificity.

Наприклад:

    h2 + p {
        margin-top: 0;
    }

Specificity:

    h2 → 0-0-1
    p  → 0-0-1

Разом:

    0-0-2

---

# General Sibling

`~` також не додає specificity.

    h2 ~ p {
        color: gray;
    }

Specificity:

    h2 → 0-0-1
    p  → 0-0-1

Разом:

    0-0-2

---

# Specificity Comparison

Наприклад:

    p {
        color: blue;
    }

    .text {
        color: red;
    }

Specificity:

    p       → 0-0-1
    .text   → 0-1-0

Перемагає:

    .text

---

Інший приклад:

    .text {
        color: red;
    }

    #title {
        color: blue;
    }

Specificity:

    .text  → 0-1-0
    #title → 1-0-0

Перемагає:

    #title

---

# Multiple Classes

Кілька classes збільшують specificity.

    .card.featured {
        color: red;
    }

Specificity:

    .card     → 0-1-0
    .featured → 0-1-0

Разом:

    0-2-0

---

# Multiple IDs

Технічно specificity рахується за кількістю ID selectors.

Наприклад:

    #header#main {
        ...
    }

Specificity:

    2-0-0

Але використовувати декілька ID в одному selector — дуже погана практика.

Краще будувати CSS із низькою та передбачуваною specificity.

---

# Compound Selector

Compound selector містить декілька простих selectors без combinator.

Наприклад:

    button.primary.large

Тут:

    button  → 0-0-1
    .primary → 0-1-0
    .large   → 0-1-0

Разом:

    0-2-1

---

# Complex Selector

Complex selector містить кілька compound selectors, з'єднаних combinators.

Наприклад:

    main .card > h2.title

Specificity:

    main  → 0-0-1
    .card → 0-1-0
    h2    → 0-0-1
    .title → 0-1-0

Разом:

    0-2-2

---

# Specificity Examples

## Example 1

    p

Specificity:

    0-0-1

---

## Example 2

    .text

Specificity:

    0-1-0

---

## Example 3

    #title

Specificity:

    1-0-0

---

## Example 4

    p.text

Specificity:

    0-1-1

---

## Example 5

    #title.text

Specificity:

    1-1-0

---

## Example 6

    main p.text

Specificity:

    0-1-2

---

## Example 7

    #app .card p

Specificity:

    1-1-1

---

## Example 8

    ul li a.link:hover

Specificity:

    0-2-3

Тому що:

    .link → 0-1-0
    :hover → 0-1-0
    ul → 0-0-1
    li → 0-0-1
    a → 0-0-1

Разом:

    0-2-3

---

# Як порівнювати Specificity

Порівнюємо зліва направо:

    ID
    ↓
    CLASS
    ↓
    TYPE

Наприклад:

    1-0-0

перемагає:

    0-100-100

тому що:

    1 ID > будь-яка кількість classes

У практичній моделі:

    1-0-0
        >
    0-100-100

---

І:

    0-2-0

перемагає:

    0-1-100

тому що спочатку порівнюються classes:

    2 > 1

---

А:

    0-1-2

перемагає:

    0-1-1

тому що ID однакові:

    0 = 0

classes однакові:

    1 = 1

тоді порівнюються types:

    2 > 1

---

# Specificity Is Not a Simple Sum

Не потрібно сприймати:

    1-0-0

як звичайне число:

    100

і:

    0-100-0

як:

    100

Це окремі категорії.

Правильніше думати:

    ID → найважливіша категорія
    CLASS → друга
    TYPE → третя

Порівняння відбувається лексикографічно:

    ID
    ↓
    CLASS
    ↓
    TYPE

---

# Source Order

Якщо два selectors мають однакову specificity, перемагає правило, яке знаходиться пізніше в CSS.

Наприклад:

    p {
        color: blue;
    }

    p {
        color: red;
    }

Обидва:

    0-0-1

Тому:

    red

перемагає.

---

# Source Order Example

    .text {
        color: blue;
    }

    .text {
        color: red;
    }

Обидва:

    0-1-0

Оскільки другий selector знаходиться пізніше:

    color: red;

перемагає.

---

# Specificity vs Source Order

Важливо:

    specificity

перевіряється раніше, ніж:

    source order

Наприклад:

    .text {
        color: blue;
    }

    p {
        color: red;
    }

Навіть якщо `p` знаходиться нижче, переможе:

    .text

Тому що:

    .text → 0-1-0
    p     → 0-0-1

Specificity важливіша за порядок, коли інші відповідні cascade criteria однакові.

---

# Cascade Layers

Сучасний CSS має механізм:

    @layer

Cascade layers дозволяють створювати явні рівні пріоритету CSS.

Наприклад:

    @layer reset {
        p {
            color: blue;
        }
    }

    @layer components {
        p {
            color: red;
        }
    }

За однакових інших умов порядок layers впливає на те, яке правило перемагає.

---

# @layer

Синтаксис:

    @layer base, components, utilities;

Потім:

    @layer base {
        ...
    }

    @layer components {
        ...
    }

    @layer utilities {
        ...
    }

Наприклад:

    @layer base {
        p {
            color: black;
        }
    }

    @layer components {
        .text {
            color: blue;
        }
    }

Layers дозволяють організувати CSS без постійного збільшення specificity.

---

# Навіщо потрібні Layers

Без layers великі CSS-проєкти можуть накопичувати:

    .component
    .component.special
    .page .component
    #app .component
    ...

і specificity поступово стає складною.

З layers можна організувати CSS логічно:

    reset
    base
    components
    utilities

Наприклад:

    @layer reset, base, components, utilities;

Це робить cascade більш передбачуваним.

---

# Важливе правило Layers

Для normal declarations порядок cascade layers має значення.

Наприклад:

    @layer base {
        .button {
            color: black;
        }
    }

    @layer utilities {
        .text-red {
            color: red;
        }
    }

За однакових інших умов declaration у пізнішому layer може перемогти declaration у попередньому layer.

Тому layers дозволяють контролювати пріоритет без збільшення selector specificity.

---

# Inline Styles

Inline style записується безпосередньо в HTML.

Наприклад:

    <p style="color: red;">
        Hello
    </p>

Inline style має дуже високий пріоритет у звичайному author CSS cascade.

Наприклад:

    p {
        color: blue;
    }

але:

    <p style="color: red;">
        Hello
    </p>

Результат:

    red

---

# !important

`!important` підвищує пріоритет declaration у cascade.

Наприклад:

    p {
        color: blue !important;
    }

і:

    p {
        color: red;
    }

Результат:

    blue

---

# !important Is Not Specificity

Важливо розуміти:

    !important

не додає:

    1-0-0

або:

    0-1-0

Він змінює порядок cascade за критерієм importance.

Тобто:

    !important

не є просто "дуже великою specificity".

---

# Приклад !important

    .text {
        color: blue !important;
    }

    #title {
        color: red;
    }

У звичайному порівнянні:

    #title → 1-0-0
    .text  → 0-1-0

Але перше правило має:

    !important

Тому воно може перемогти звичайну declaration.

---

# Не зловживайте !important

Погана практика:

    .button {
        color: red !important;
    }

    .button-primary {
        color: blue !important;
    }

Потім виникає необхідність додавати ще більше `!important`.

У результаті:

    !important
        ↓
    !important
        ↓
    !important
        ↓
    CSS becomes difficult to maintain

Краще спочатку перевірити:

    selector
    specificity
    source order
    cascade layer
    inheritance
    origin

---

# CSS Origin

Cascade також враховує походження стилів.

Основні джерела:

    user-agent styles
    user styles
    author styles

### User-agent styles

Це стандартні стилі браузера.

Наприклад, браузер має default styles для:

    h1
    p
    button
    input
    ul
    a

Наприклад, браузер може мати стандартний:

    margin

для заголовків та абзаців.

---

### Author styles

Це CSS, який пише розробник.

Наприклад:

    p {
        margin: 0;
    }

---

# Browser Default Styles

HTML:

    <h1>Hello</h1>

Навіть без власного CSS браузер вже застосовує стилі.

Наприклад:

    font-size
    font-weight
    margin

Це:

    user-agent stylesheet

У DevTools вони часто відображаються окремо.

---

# Inheritance and Cascade

`Inheritance` та `cascade` — різні механізми.

Inheritance означає:

    властивість може перейти від parent до child

Cascade означає:

    яке значення переможе серед declarations

Наприклад:

    body {
        color: red;
    }

    <body>
        <p>Hello</p>
    </body>

`color` може успадкуватися від `body` до `p`.

Але якщо є:

    p {
        color: blue;
    }

то власне правило `p` визначає колір.

---

# Cascade vs Inheritance

Inheritance:

    parent
       ↓
    child

Cascade:

    declaration
        ↓
    compare rules
        ↓
    winner

Наприклад:

    body {
        color: red;
    }

    p {
        color: blue;
    }

Для `p`:

    body → inherited red
    p    → declared blue

Результат:

    blue

---

# Universal Selector and Specificity

Universal selector:

    *

має:

    0-0-0

Наприклад:

    * {
        color: red;
    }

А:

    p {
        color: blue;
    }

має:

    0-0-1

Тому:

    p

перемагає.

---

# :where()

`:where()` має особливе правило:

    specificity = 0-0-0

Наприклад:

    :where(#app .card p) {
        color: red;
    }

Незважаючи на:

    #app
    .card
    p

specificity всього selector-а:

    0-0-0

Це робить `:where()` дуже корисним для написання CSS з низькою specificity.

---

# :where() Example

    :where(.card p) {
        margin: 0;
    }

Specificity:

    0-0-0

Порівняно:

    p {
        margin: 1rem;
    }

`p` має:

    0-0-1

Тому `p` може легко override-ити `:where()`.

Це одна з основних переваг `:where()`.

---

# :is()

`:is()` дозволяє групувати selectors.

Наприклад:

    :is(h1, h2, h3) {
        font-weight: bold;
    }

Specificity `:is()` визначається за найбільш специфічним selector-ом у списку.

Наприклад:

    :is(#title, .title, p)

Має specificity:

    1-0-0

тому що:

    #title → 1-0-0

є найбільш специфічним.

---

# :is() Example

    .card :is(h2, h3) {
        color: red;
    }

Specificity:

    .card → 0-1-0

та:

    :is(h2, h3)

має:

    0-0-1

Разом:

    0-1-1

---

# :not()

`:not()` також має особливе правило.

Його власна функція не додає окремої specificity.

Specificity визначається аргументом.

Наприклад:

    p:not(.special) {
        color: red;
    }

Specificity:

    p       → 0-0-1
    .special → 0-1-0

Разом:

    0-1-1

---

# :has()

`:has()` також використовує specificity своїх аргументів.

Наприклад:

    .card:has(.title) {
        ...
    }

Specificity:

    .card → 0-1-0
    .title → 0-1-0

Разом:

    0-2-0

`:has()` дуже потужний, тому при його використанні також важливо контролювати specificity.

---

# Functional Pseudo-classes

Основні правила:

    :where()
        → 0-0-0

    :is()
        → specificity найбільш специфічного аргументу

    :not()
        → specificity найбільш специфічного аргументу

    :has()
        → specificity найбільш специфічного аргументу

---

# Specificity of :where()

Наприклад:

    :where(#app .card button) {
        color: red;
    }

Звичайно:

    #app → 1-0-0
    .card → 0-1-0
    button → 0-0-1

Але через `:where()`:

    0-0-0

---

# Specificity of :is()

    :is(#app, .card, button)

Найбільш специфічний:

    #app

Тому:

    1-0-0

---

# Specificity of :not()

    button:not(.primary)

Має:

    button → 0-0-1
    .primary → 0-1-0

Разом:

    0-1-1

---

# Specificity of :has()

    article:has(#title)

Має:

    article → 0-0-1
    #title  → 1-0-0

Разом:

    1-0-1

---

# Selector Specificity Table

| Selector | Specificity |
|---|---:|
| `*` | `0-0-0` |
| `p` | `0-0-1` |
| `::before` | `0-0-1` |
| `.card` | `0-1-0` |
| `[type="text"]` | `0-1-0` |
| `:hover` | `0-1-0` |
| `#app` | `1-0-0` |
| `p.card` | `0-1-1` |
| `#app .card` | `1-1-0` |
| `#app .card p` | `1-1-1` |
| `:where(.card)` | `0-0-0` |

---

# Specificity Examples

Розглянемо:

    <div id="app" class="container">
        <p class="text">Hello</p>
    </div>

CSS:

    p {
        color: blue;
    }

    .text {
        color: green;
    }

    #app .text {
        color: red;
    }

Specificity:

    p          → 0-0-1
    .text      → 0-1-0
    #app .text → 1-1-0

Переможе:

    #app .text

Результат:

    red

---

# Another Example

HTML:

    <p class="text">Hello</p>

CSS:

    p {
        color: blue;
    }

    .text {
        color: red;
    }

    p.text {
        color: green;
    }

Specificity:

    p       → 0-0-1
    .text   → 0-1-0
    p.text  → 0-1-1

Переможе:

    p.text

Результат:

    green

---

# Source Order Example

HTML:

    <p class="text">Hello</p>

CSS:

    .text {
        color: blue;
    }

    p.text {
        color: green;
    }

    p.text {
        color: red;
    }

Останні два правила мають:

    0-1-1

Тому переможе останнє:

    color: red;

---

# Specificity Doesn't Affect All Properties

Specificity визначає переможця серед declarations, які застосовуються до однієї властивості.

Наприклад:

    .box {
        color: red;
        padding: 1rem;
    }

    #app {
        color: blue;
    }

Для `color`:

    .box → red
    #app → blue

Для `padding`:

    .box → 1rem

тому що друге правило не встановлює `padding`.

---

# Shorthand and Longhand

Cascade працює окремо для declarations.

Наприклад:

    .box {
        margin: 20px;
    }

    .box {
        margin-top: 10px;
    }

Тут shorthand:

    margin: 20px;

встановлює всі margin sides.

Потім:

    margin-top: 10px;

змінює тільки top.

Результат:

    margin-top: 10px;
    margin-right: 20px;
    margin-bottom: 20px;
    margin-left: 20px;

---

# CSS Custom Properties

Custom properties також беруть участь у cascade.

Наприклад:

    :root {
        --color: blue;
    }

    .card {
        --color: red;
    }

    .card-title {
        color: var(--color);
    }

`.card-title` успадковує custom property від `.card`.

Тому:

    color: red;

---

# Cascade and Custom Properties

Наприклад:

    :root {
        --spacing: 1rem;
    }

    .component {
        --spacing: 2rem;
    }

Якщо елемент знаходиться всередині `.component`, він може отримати:

    --spacing: 2rem

через inheritance.

Custom properties також можуть мати різні declarations, які конкурують через cascade.

---

# Cascade Debugging

Коли CSS "не працює", потрібно не одразу додавати:

    !important

Спочатку перевірити:

    1. Чи selector відповідає елементу?
    2. Яка specificity?
    3. Чи немає іншого selector-а з більшою specificity?
    4. Чи однакова specificity?
    5. Яке правило знаходиться пізніше?
    6. Чи немає cascade layer?
    7. Чи немає !important?
    8. Чи значення не успадковується?
    9. Чи не працює browser default style?

---

# DevTools

Browser DevTools показує CSS rules, які застосовуються до елемента.

Наприклад:

    Elements
        ↓
    Inspect element
        ↓
    Styles

Можна побачити:

    selector
    property
    value
    source file
    line number
    crossed-out declarations

Перекреслене правило зазвичай означає, що інша declaration перемогла в cascade.

---

# CSS Debugging Example

HTML:

    <button class="button">
        Save
    </button>

CSS:

    button {
        background: gray;
    }

    .button {
        background: blue;
    }

Якщо бачимо:

    background: gray;

перекресленим у DevTools, це означає, що:

    .button

переміг:

    button

через більшу specificity.

---

# Specificity Trap

Поганий підхід:

    .page .content .card .title {
        color: red;
    }

Specificity:

    0-4-0

Тепер щоб override-ити це правило, розробнику може знадобитися ще більш специфічний selector.

Наприклад:

    .page .content .card .featured .title {
        color: blue;
    }

Specificity:

    0-5-0

Так виникає specificity war.

---

# Specificity War

`Specificity war` — ситуація, коли selectors поступово стають дедалі специфічнішими.

Наприклад:

    .button {
        color: red;
    }

    .page .button {
        color: blue;
    }

    .page .content .button {
        color: green;
    }

    #app .page .content .button {
        color: orange;
    }

Кожне наступне правило стає складнішим для override.

Це погано для підтримки CSS.

---

# Avoid Specificity Wars

Краще використовувати:

    simple selectors
    component classes
    low specificity
    cascade layers
    predictable architecture

Наприклад:

    .button {
        color: red;
    }

    .button-primary {
        color: blue;
    }

Замість:

    #app .page .content button.primary {
        color: blue;
    }

---

# BEM and Specificity

BEM часто допомагає підтримувати низьку specificity.

Наприклад:

    .card {
        ...
    }

    .card__title {
        ...
    }

    .card--featured {
        ...
    }

Selectors залишаються простими:

    0-1-0

Це полегшує override.

---

# Utility Classes

Utility-first CSS також часто використовує selectors із низькою specificity.

Наприклад:

    .text-center {
        text-align: center;
    }

    .mt-4 {
        margin-top: 1rem;
    }

Кожен selector:

    0-1-0

Це спрощує cascade.

---

# Specificity and CSS Architecture

Добра CSS architecture намагається зробити specificity:

    low
    predictable
    consistent

Погана architecture часто призводить до:

    deep selectors
    IDs
    !important
    specificity conflicts
    difficult overrides

---

# Practical Specificity Rules

Намагайтеся:

    використовувати classes
    ↓
    уникати ID для styling
    ↓
    уникати deep selectors
    ↓
    не підвищувати specificity без необхідності
    ↓
    використовувати cascade layers для великих систем

---

# Specificity Calculator

Для швидкого аналізу можна рахувати:

    ID
    CLASS / ATTRIBUTE / PSEUDO-CLASS
    TYPE / PSEUDO-ELEMENT

Наприклад:

    #app .card button:hover::before

Рахуємо:

    #app       → 1-0-0
    .card      → 0-1-0
    button     → 0-0-1
    :hover     → 0-1-0
    ::before   → 0-0-1

Разом:

    1-2-2

---

# Example: Which Rule Wins?

HTML:

    <button id="save" class="button primary">
        Save
    </button>

CSS:

    button {
        color: black;
    }

    .button {
        color: blue;
    }

    .button.primary {
        color: green;
    }

    #save {
        color: red;
    }

Specificity:

    button         → 0-0-1
    .button        → 0-1-0
    .button.primary → 0-2-0
    #save          → 1-0-0

Перемагає:

    #save

Результат:

    red

---

# Example: Same Specificity

HTML:

    <button class="button">
        Save
    </button>

CSS:

    .button {
        color: blue;
    }

    .button {
        color: red;
    }

Обидва:

    0-1-0

Перемагає другий:

    color: red;

---

# Example: More Type Selectors

HTML:

    <main>
        <section>
            <p class="text">Hello</p>
        </section>
    </main>

CSS:

    main section p {
        color: blue;
    }

    .text {
        color: red;
    }

Specificity:

    main section p → 0-0-3
    .text          → 0-1-0

Перемагає:

    .text

Тобто один class сильніший за три type selectors.

---

# Example: Class vs Many Types

    html body main section article p {
        color: blue;
    }

Specificity:

    0-0-6

А:

    .text {
        color: red;
    }

Specificity:

    0-1-0

Перемагає:

    .text

Це важливий принцип.

Не потрібно рахувати type selectors як "звичайні бали" поруч із classes.

---

# Important Mental Model

Думайте так:

    ID
    ↓
    CLASS / ATTRIBUTE / PSEUDO-CLASS
    ↓
    TYPE / PSEUDO-ELEMENT
    ↓
    source order

Але реальний cascade має більше критеріїв, включно з:

    origin
    importance
    layers
    specificity
    scope
    source order

Тому specificity — лише одна частина cascade.

---

# Cascade — спрощена модель

Для практичного розуміння можна мислити так:

    1. Чи declaration застосовується до елемента?
            ↓
    2. Яке origin / importance?
            ↓
    3. Який cascade layer?
            ↓
    4. Яка specificity?
            ↓
    5. Яке source order?
            ↓
    WINNER

Це спрощена модель для навчання.

---

# Cascade vs Specificity

Це не одне й те саме.

### Cascade

Великий механізм вибору переможця.

### Specificity

Одна з характеристик selector-а, яка допомагає визначити переможця.

Тобто:

    Cascade
        ├── origin
        ├── importance
        ├── layers
        ├── specificity
        └── source order

---

# Cascade Order — практичне розуміння

Для звичайного author CSS корисно пам'ятати:

    важливість declaration
          ↓
    cascade layer
          ↓
    specificity
          ↓
    source order

Але повний CSS cascade складніший і також враховує origin, context та інші сучасні механізми.

На Junior-рівні головне добре розуміти:

    specificity
    source order
    !important
    inheritance
    layers

---

# !important and Layers

Cascade layers також взаємодіють з `!important`.

Це одна з причин, чому не варто намагатися запам'ятати cascade як просту таблицю:

    selector > class > id > important

Насправді CSS cascade має окремий порядок для:

    normal declarations
    important declarations

Тому `!important` має спеціальне місце в cascade.

---

# Practical Example

Структура:

    <div class="card">
        <h2 class="card__title">
            Hello
        </h2>
    </div>

CSS:

    @layer base {
        .card__title {
            color: black;
        }
    }

    @layer components {
        .card__title {
            color: blue;
        }
    }

За інших однакових умов declarations знаходяться в різних layers.

Cascade layer дозволяє визначити, який layer має вищий пріоритет для normal declarations.

Це набагато передбачуваніше, ніж створювати:

    .page .content .card .card__title

---

# Modern CSS: @layer

Типова структура:

    @layer reset, base, components, utilities;

Наприклад:

    @layer reset {
        * {
            box-sizing: border-box;
        }
    }

    @layer base {
        body {
            margin: 0;
            font-family: sans-serif;
        }
    }

    @layer components {
        .button {
            padding: 0.5rem 1rem;
        }
    }

    @layer utilities {
        .hidden {
            display: none;
        }
    }

Це дозволяє явно організувати cascade.

---

# Common Specificity Mistakes

❌ Використовувати ID для звичайного component styling.

    #button {
        ...
    }

Краще:

    .button {
        ...
    }

---

❌ Створювати надто довгі selectors.

    .page .content .section .card .header .title {
        ...
    }

Краще:

    .card-title {
        ...
    }

---

❌ Використовувати `!important` для вирішення кожного конфлікту.

    color: red !important;

Спочатку потрібно знайти причину конфлікту.

---

❌ Підвищувати specificity тільки для того, щоб override-ити попереднє правило.

    .button.primary
    .page .button.primary
    #app .page .button.primary

Краще переглянути структуру CSS.

---

❌ Плутати inheritance із cascade.

Не кожна властивість автоматично успадковується.

---

❌ Забувати про browser defaults.

Наприклад:

    h1 {
        margin-block-start: ...;
        margin-block-end: ...;
    }

може мати стилі від user-agent stylesheet.

---

# Типові помилки

❌ Думати, що останнє правило завжди перемагає.

Ні.

Спочатку важлива specificity.

---

❌ Думати, що більше selector-ів завжди означає більшу specificity.

Наприклад:

    main section article p

має:

    0-0-4

А:

    .text

має:

    0-1-0

`.text` сильніший.

---

❌ Думати, що `!important` — це specificity.

Ні.

`!important` впливає на cascade priority.

---

❌ Думати, що combinators додають specificity.

Не додають:

    >
    +
    ~
    space

---

❌ Думати, що `*` додає specificity.

Не додає.

    * → 0-0-0

---

❌ Забувати про pseudo-classes.

Наприклад:

    :hover

має:

    0-1-0

---

❌ Плутати pseudo-class та pseudo-element.

    :hover
        → pseudo-class
        → 0-1-0

    ::before
        → pseudo-element
        → 0-0-1

---

❌ Використовувати занадто високі selectors.

Наприклад:

    #app .page .content .card .title

Такі selectors складно override-ити.

---

# Debugging Checklist

Коли CSS declaration не працює:

    1. Перевір selector.
    2. Перевір, чи відповідає він елементу.
    3. Перевір property.
    4. Перевір value.
    5. Перевір specificity.
    6. Перевір source order.
    7. Перевір cascade layer.
    8. Перевір !important.
    9. Перевір inheritance.
    10. Перевір user-agent styles.
    11. Перевір DevTools.

---

# Practical Example: Debugging

HTML:

    <p class="description">
        Text
    </p>

CSS:

    p {
        color: black;
    }

    .description {
        color: gray;
    }

    .card .description {
        color: blue;
    }

HTML:

    <div class="card">
        <p class="description">
            Text
        </p>
    </div>

Specificity:

    p                  → 0-0-1
    .description       → 0-1-0
    .card .description → 0-2-0

Результат:

    blue

Якщо потрібно змінити колір на green, можна написати:

    .card .description {
        color: green;
    }

Але якщо структура дозволяє, краще уникати безкінечного збільшення specificity.

---

# Better Architecture

Замість:

    .page .content .card .header .title {
        color: red;
    }

можна:

    .card-title {
        color: red;
    }

Specificity:

    0-1-0

Це набагато простіше override-ити.

---

# Specificity and Components

Component CSS бажано будувати приблизно так:

    .card {
        ...
    }

    .card-title {
        ...
    }

    .card-description {
        ...
    }

    .card-button {
        ...
    }

Кожен selector має:

    0-1-0

Це створює передбачуваний cascade.

---

# Practical Rules for Junior Developer

Намагайтеся:

    1. Використовувати classes для styling.
    2. Не використовувати ID для component styling.
    3. Тримати selectors короткими.
    4. Не вкладати selectors надмірно глибоко.
    5. Не використовувати !important без необхідності.
    6. Розуміти source order.
    7. Розуміти inheritance.
    8. Вміти читати specificity.
    9. Використовувати DevTools.
    10. Розуміти @layer у сучасному CSS.

---

# Practical Rules for Large Projects

У великих проєктах корисно використовувати:

    CSS architecture
    component classes
    low specificity
    cascade layers
    design tokens
    utility classes
    predictable naming

Наприклад:

    @layer reset, base, components, utilities;

Це допомагає контролювати cascade на рівні всієї системи.

---

# Specificity Patterns

## Low specificity

    .button

    0-1-0

Добре.

---

## Medium specificity

    .card .button

    0-2-0

Може бути нормально, але не варто без необхідності збільшувати specificity.

---

## High specificity

    #app .page .card .button

    1-3-0

Зазвичай варто уникати.

---

## Very high specificity

    #app #page .content .card .button:hover

    2-4-1

Такий selector дуже складно override-ити.

---

# Specificity Budget

У великих проєктах можна мислити про specificity як про "budget".

Наприклад, бажане правило:

    component selector
        ↓
    0-1-0

або:

    component + state
        ↓
    0-2-0

Наприклад:

    .button {
        ...
    }

    .button:hover {
        ...
    }

Specificity:

    .button       → 0-1-0
    .button:hover → 0-2-0

Це легко контролювати.

---

# State Classes

Для component states часто використовують classes:

    .button
    .button-primary
    .button-disabled

або:

    .button
    .button.is-active

Наприклад:

    .button {
        background: gray;
    }

    .button.is-active {
        background: blue;
    }

Specificity:

    .button       → 0-1-0
    .button.is-active → 0-2-0

---

# Pseudo-class States

Також можна:

    .button:hover {
        background: blue;
    }

    .button:focus {
        outline: 2px solid;
    }

    .button:disabled {
        opacity: 0.5;
    }

Кожен pseudo-class додає class-level specificity.

---

# Cascade and Responsive CSS

Media queries також можуть створювати cascade conflicts.

Наприклад:

    .card {
        width: 100%;
    }

    @media (min-width: 768px) {
        .card {
            width: 50%;
        }
    }

За умови, що media query активна, друге правило може override-ити перше.

Specificity однакова:

    0-1-0

Тому важливим стає:

    source order

---

# Media Query Example

    .button {
        padding: 0.5rem;
    }

    @media (min-width: 768px) {
        .button {
            padding: 1rem;
        }
    }

Обидва selectors:

    0-1-0

Якщо media query активна і правило знаходиться пізніше:

    padding: 1rem;

перемагає.

---

# Cascade and CSS Files

Порядок підключення CSS також може мати значення.

Наприклад:

    <link rel="stylesheet" href="base.css">
    <link rel="stylesheet" href="components.css">

Якщо однакові selectors мають однакову specificity, правила з пізнішого stylesheet можуть перемогти.

Наприклад:

base.css:

    .button {
        color: black;
    }

components.css:

    .button {
        color: blue;
    }

Результат:

    blue

---

# CSS Import Order

Порядок CSS imports також може впливати на cascade.

Наприклад:

    @import "reset.css";
    @import "base.css";
    @import "components.css";

У великих проєктах краще мати явну структуру стилів, наприклад через:

    @layer

---

# CSS Reset and Cascade

Reset часто встановлює базові стилі:

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
    }

Потім base/component styles можуть override-ити ці правила.

Це хороший приклад організованого cascade.

---

# Practical Cascade Architecture

Можна організувати:

    @layer reset, base, components, utilities;

Потім:

    @layer reset {
        ...
    }

    @layer base {
        ...
    }

    @layer components {
        ...
    }

    @layer utilities {
        ...
    }

Це створює передбачувану структуру.

---

# Interview Questions

Що таке CSS cascade?

Що таке specificity?

Як браузер визначає, яке CSS правило переможе?

Що таке source order?

Що таке user-agent stylesheet?

Що таке author stylesheet?

Що таке inline style?

Що робить `!important`?

Чи є `!important` частиною specificity?

Яка specificity у type selector?

Яка specificity у class selector?

Яка specificity у ID selector?

Яка specificity у attribute selector?

Яка specificity у pseudo-class?

Яка specificity у pseudo-element?

Чи додає `*` specificity?

Чи додають combinators specificity?

Як порівнюються два selectors?

Чому `.text` сильніший за `p`?

Чому `#title` сильніший за `.title`?

Що станеться, якщо specificity однакова?

Що таке specificity war?

Чому не варто зловживати `!important`?

Що таке cascade layer?

Що робить `@layer`?

Що таке `:where()`?

Яка specificity у `:where()`?

Як працює specificity у `:is()`?

Як працює specificity у `:not()`?

Як працює specificity у `:has()`?

Чим cascade відрізняється від inheritance?

Як DevTools допомагає знайти CSS conflict?

Чому declaration може бути перекреслена в DevTools?

Як уникати надмірної specificity?

Чому classes часто кращі за IDs для styling?

---

# Шлях

## 🟢 Core (обов'язково знати)

Що таке cascade.

Що таке specificity.

Що таке source order.

Type selector.

Class selector.

ID selector.

Attribute selector.

Pseudo-class.

Pseudo-element.

Universal selector.

Combinators.

Основи specificity notation:

    0-0-1
    0-1-0
    1-0-0

Розуміння:

    ID > class > type

Розуміння source order.

Розуміння `!important`.

Основи inheritance.

Browser default styles.

DevTools Styles panel.

---

## 🔵 Junior

Вміти розраховувати specificity.

Порівнювати selectors.

Розуміти:

    type
    class
    ID
    attribute
    pseudo-class
    pseudo-element

Розуміти:

    > 
    +
    ~
    descendant selector

і те, що combinators не додають specificity.

Розуміти:

    inline styles

Розуміти:

    !important

Розуміти:

    user-agent styles

Розуміти:

    source order

Розуміти різницю:

    cascade
    specificity
    inheritance

Вміти знаходити conflict через DevTools.

Уникати:

    deep selectors
    unnecessary IDs
    excessive !important

Розуміти основи:

    @layer
    :where()
    :is()
    :not()
    :has()

---

## 🟠 Middle

Глибоке розуміння CSS Cascade.

Cascade layers.

    @layer

Cascade origins.

Importance.

User-agent styles.

User styles.

Author styles.

Inline styles.

Specificity management.

Specificity architecture.

Specificity conflicts.

CSS architecture.

BEM.

Utility classes.

Component CSS.

Cascade layer architecture.

Design systems.

Custom properties and cascade.

Complex selectors.

Functional pseudo-classes:

    :is()
    :where()
    :not()
    :has()

Responsive CSS and cascade.

The interaction between:

    media queries
    layers
    specificity
    source order

CSS debugging через DevTools.

---

## 🔴 Senior

Повне розуміння CSS Cascade.

Cascade origins.

Cascade context.

Importance.

Cascade layers.

Specificity.

Scoping.

Source order.

Shadow DOM та cascade.

Shadow DOM encapsulation.

CSS custom properties across boundaries.

Constructable stylesheets.

CSS architecture at scale.

Layer ordering architecture.

Design system cascade.

Third-party CSS isolation.

CSS framework interoperability.

Specificity control.

Low-specificity architecture.

Component isolation.

Cascade strategies for large applications.

CSS-in-JS cascade considerations.

Utility-first CSS architecture.

Web Components styling.

Advanced DevTools debugging.

Predictable override strategies.

---

# Міні-шпаргалка

## Cascade

    CSS declarations
          ↓
    compare cascade criteria
          ↓
    winner
          ↓
    applied value

---

## Specificity

Основна модель:

    ID
    CLASS / ATTRIBUTE / PSEUDO-CLASS
    TYPE / PSEUDO-ELEMENT

Наприклад:

    #app .card p

має:

    1-1-1

---

## Specificity

    p
        → 0-0-1

    .card
        → 0-1-0

    #app
        → 1-0-0

---

## Class

    .button

    → 0-1-0

---

## ID

    #app

    → 1-0-0

---

## Attribute

    [type="text"]

    → 0-1-0

---

## Pseudo-class

    :hover

    → 0-1-0

---

## Pseudo-element

    ::before

    → 0-0-1

---

## Universal

    *

    → 0-0-0

---

## Combinators

    >
    +
    ~
    space

    → 0-0-0

Combinators не додають specificity.

---

## :where()

    :where(#app .card)

    → 0-0-0

---

## :is()

    :is(#app, .card, p)

Specificity визначається найбільш специфічним selector-ом:

    #app
        ↓
    1-0-0

---

## :not()

    p:not(.special)

    p        → 0-0-1
    .special → 0-1-0

Разом:

    0-1-1

---

## :has()

    .card:has(.title)

    .card  → 0-1-0
    .title → 0-1-0

Разом:

    0-2-0

---

## Source Order

Якщо specificity однакова:

    earlier rule
        ↓
    later rule wins

Наприклад:

    .button {
        color: blue;
    }

    .button {
        color: red;
    }

Результат:

    red

---

## !important

    color: red !important;

`!important` змінює cascade priority.

Це не просто "більша specificity".

---

## Cascade Layer

    @layer base {
        ...
    }

    @layer components {
        ...
    }

Layers дозволяють керувати cascade без збільшення specificity.

---

## Cascade vs Specificity

    Cascade
        ↓
    великий механізм вибору переможця

    Specificity
        ↓
    одна з характеристик selector-а

---

## Inheritance vs Cascade

    inheritance
        ↓
    parent → child

    cascade
        ↓
    competing declarations → winner

---

## DevTools

Якщо CSS не працює:

    inspect element
        ↓
    Styles
        ↓
    знайти declaration
        ↓
    перевірити crossed-out rules
        ↓
    перевірити specificity
        ↓
    перевірити source order
        ↓
    перевірити !important
        ↓
    перевірити layers
        ↓
    перевірити inheritance

---

# Головне:

• CSS Cascade — це механізм, який визначає, яке значення CSS буде застосоване, коли декілька declarations конкурують.

• Specificity — це вага selector-а.

• Specificity потрібно розглядати не ізольовано, а як частину cascade.

• Основна модель specificity:

    ID
    CLASS
    TYPE

• Class selectors мають більшу specificity, ніж type selectors.

• ID selectors мають більшу specificity, ніж class selectors.

• Attribute selectors мають class-level specificity.

• Pseudo-classes мають class-level specificity.

• Pseudo-elements мають type-level specificity.

• Universal selector `*` не додає specificity.

• Combinators не додають specificity:

    >
    +
    ~
    space

• Якщо selectors мають однакову specificity, важливим стає source order.

• Останнє правило не завжди перемагає.

Наприклад:

    .button {
        color: blue;
    }

    p {
        color: red;
    }

Навіть якщо `p` знаходиться пізніше, `.button` сильніший:

    .button → 0-1-0
    p       → 0-0-1

• `!important` змінює порядок cascade і не є просто "дуже великою specificity".

• Inline styles мають дуже високий пріоритет у звичайному author CSS cascade.

• Browser має власні user-agent styles.

• Inheritance та cascade — різні механізми.

• `@layer` дозволяє явно організувати cascade.

• `:where()` має specificity:

    0-0-0

• `:is()`, `:not()` та `:has()` враховують specificity своїх аргументів.

• Не варто будувати CSS на дуже специфічних selectors.

Погано:

    #app .page .content .card .title

Краще:

    .card-title

• Не варто використовувати `!important` як універсальний спосіб виправлення CSS.

• Низька specificity робить CSS легшим для override та підтримки.

• Хороший component CSS часто виглядає приблизно так:

    .card {
        ...
    }

    .card-title {
        ...
    }

    .card-description {
        ...
    }

• Для states можна використовувати:

    .button:hover
    .button:focus
    .button.is-active

• У великих проєктах корисно організовувати cascade через:

    @layer reset, base, components, utilities;

• Коли CSS "не працює", спочатку потрібно знайти причину конфлікту, а не додавати `!important`.

• Практична модель:

    selector matches
          ↓
    cascade priority
          ↓
    layer
          ↓
    specificity
          ↓
    source order
          ↓
    winning declaration

• Головне правило для Junior:

    low specificity
        +
    predictable cascade
        +
    clear component classes
        =
    maintainable CSS

• Найважливіше, що потрібно вміти робити на практиці:

    побачити CSS conflict
            ↓
    знайти competing declarations
            ↓
    визначити specificity
            ↓
    перевірити source order
            ↓
    перевірити !important / layers
            ↓
    зрозуміти winner
            ↓
    виправити причину без unnecessary !important