# 04. Flexbox

Flexbox (`Flexible Box Layout`) — CSS-модель layout, призначена для розташування елементів в одному вимірі:

- у рядок;
- у колонку;
- з вирівнюванням;
- з розподілом вільного простору;
- зі зміною порядку;
- з автоматичним перенесенням елементів.

Flexbox особливо зручний для:

- navigation;
- кнопок;
- header;
- toolbar;
- card layouts;
- списків;
- form controls;
- горизонтального та вертикального центрування;
- responsive component layout.

Основна ідея:

    flex container
        ↓
    flex items

Щоб увімкнути Flexbox:

    .container {
        display: flex;
    }

Після цього прямі діти `.container` стають flex items.


## Ключові поняття

| Поняття | Значення |
|---|---|
| Flex container | елемент з `display: flex` |
| Flex item | пряма дитина flex container |
| Main axis | головна вісь |
| Cross axis | поперечна вісь |
| `flex-direction` | напрямок main axis |
| `justify-content` | вирівнювання вздовж main axis |
| `align-items` | вирівнювання вздовж cross axis |
| `align-content` | вирівнювання рядків/ліній |
| `gap` | відстань між items |
| `flex-wrap` | перенесення items |
| `flex-flow` | скорочення `direction + wrap` |
| `flex-grow` | здатність item розширюватися |
| `flex-shrink` | здатність item стискатися |
| `flex-basis` | початковий розмір item |
| `flex` | shorthand для grow/shrink/basis |
| `align-self` | індивідуальне cross-axis вирівнювання |
| `order` | візуальний порядок item |

---

# 1. Увімкнення Flexbox

Основний запис:

    .container {
        display: flex;
    }

HTML:

    <div class="container">
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
    </div>

За замовчуванням items розташуються в рядок.

Схематично:

    ┌─────┐ ┌─────┐ ┌─────┐
    │ One │ │ Two │ │Three│
    └─────┘ └─────┘ └─────┘


# 2. Flex container

Елемент з:

    display: flex;

називається `flex container`.

Його прямі діти:

    flex items

Наприклад:

    .container {
        display: flex;
    }

    .item {
        /* flex item */
    }

Важливо:

> Flexbox безпосередньо керує прямими дітьми контейнера.

---

# 3. Flex items

Наприклад:

    <div class="container">
        <div class="item">A</div>
        <div class="item">B</div>
        <div class="item">C</div>
    </div>

Тут:

    .container
        ↓
    flex container

    .item
        ↓
    flex item

Але якщо:

    <div class="container">
        <div class="wrapper">
            <div class="item">A</div>
        </div>
    </div>

Flex item — це `.wrapper`, а не `.item`.

---

# 4. Main axis

Flexbox має дві осі:

    main axis
    cross axis

За замовчуванням:

    flex-direction: row;

Тому main axis проходить горизонтально:

    ←──────────── main axis ────────────→

    [ A ]    [ B ]    [ C ]

---

# 5. Cross axis

При:

    flex-direction: row;

cross axis проходить вертикально:

    ↑
    │
    │ cross axis
    │
    ↓

    [ A ] [ B ] [ C ]

Отже:

    row
        main axis → horizontal
        cross axis → vertical

---

# 6. flex-direction

Властивість:

    flex-direction

визначає напрямок main axis.

Основні значення:

    row
    row-reverse
    column
    column-reverse

---

# 7. flex-direction: row

Значення за замовчуванням:

    .container {
        display: flex;
        flex-direction: row;
    }

Items:

    A B C

Main axis:

    A → B → C

---

# 8. flex-direction: row-reverse

    .container {
        display: flex;
        flex-direction: row-reverse;
    }

Візуально:

    C B A

Main axis також змінює напрямок.

Важливо:

> `row-reverse` змінює візуальний порядок, але не змінює порядок елементів у HTML/DOM.

Для доступності не варто використовувати `order` або reverse-значення як заміну правильному порядку контенту в HTML.

---

# 9. flex-direction: column

    .container {
        display: flex;
        flex-direction: column;
    }

Items:

    A

    B

    C

Тепер:

    main axis → vertical
    cross axis → horizontal

---

# 10. flex-direction: column-reverse

    .container {
        display: flex;
        flex-direction: column-reverse;
    }

Візуально:

    C

    B

    A

Знову ж таки, DOM-порядок не змінюється.

---

# 11. Найважливіша схема осей

При:

    flex-direction: row;

маємо:

    main axis   →
    cross axis  ↓

При:

    flex-direction: column;

маємо:

    main axis   ↓
    cross axis  →

Тому не варто запам'ятовувати:

    justify-content = horizontal
    align-items = vertical

Правильніше:

    justify-content
        → main axis

    align-items
        → cross axis

Напрямок осей визначає `flex-direction`.

---

# 12. justify-content

`justify-content` вирівнює flex items вздовж main axis.

Наприклад:

    .container {
        display: flex;
        justify-content: center;
    }

При `row`:

    [ A ] [ B ] [ C ]

будуть відцентровані горизонтально.

---

# 13. justify-content: flex-start

    .container {
        display: flex;
        justify-content: flex-start;
    }

Items знаходяться на початку main axis:

    [ A ] [ B ] [ C ]


# 14. justify-content: flex-end

    .container {
        display: flex;
        justify-content: flex-end;
    }

Items переміщуються в кінець main axis:

                         [ A ] [ B ] [ C ]


# 15. justify-content: center

    .container {
        display: flex;
        justify-content: center;
    }

    [ A ] [ B ] [ C ]

знаходяться по центру.

---

# 16. justify-content: space-between

    .container {
        display: flex;
        justify-content: space-between;
    }

Вільний простір розподіляється між items:

    [ A ]────────[ B ]────────[ C ]

Перший item торкається початку, останній — кінця.

---

# 17. justify-content: space-around

    .container {
        display: flex;
        justify-content: space-around;
    }

Простір розподіляється навколо кожного item.

Відстань між двома сусідніми items буде приблизно вдвічі більшою за зовнішній простір біля краю.

---

# 18. justify-content: space-evenly

    .container {
        display: flex;
        justify-content: space-evenly;
    }

Відстані між:

- початком container;
- items;
- кінцем container

будуть рівними.

---

# 19. Порівняння justify-content

    flex-start

    [A][B][C]────────────


    flex-end

    ────────────[A][B][C]


    center

    ───────[A][B][C]───────


    space-between

    [A]────────[B]────────[C]


    space-around

    ──[A]────[B]────[C]──


    space-evenly

    ──[A]──[B]──[C]──

---

# 20. align-items

`align-items` вирівнює items вздовж cross axis.

Наприклад:

    .container {
        display: flex;
        align-items: center;
    }

При `row` це вертикальне вирівнювання.

---

# 21. align-items: stretch

Значення за замовчуванням:

    align-items: stretch;

Якщо cross-size item не заданий, items можуть розтягуватися вздовж cross axis.

Наприклад:

    .container {
        display: flex;
        align-items: stretch;
    }

---

# 22. align-items: flex-start

    .container {
        display: flex;
        align-items: flex-start;
    }

Items вирівнюються до початку cross axis.

---

# 23. align-items: flex-end

    .container {
        display: flex;
        align-items: flex-end;
    }

Items вирівнюються до кінця cross axis.

---

# 24. align-items: center

    .container {
        display: flex;
        align-items: center;
    }

Items вирівнюються по центру cross axis.

Це один із найпоширеніших випадків Flexbox.

---

# 25. Вертикальне центрування

Наприклад:

    .container {
        display: flex;
        align-items: center;
    }

Якщо:

    flex-direction: row;

це центрує items вертикально.

Але для повного центрування:

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

---

# 26. Повне центрування

Один із найважливіших шаблонів:

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

HTML:

    <div class="container">
        <div class="box">
            Center
        </div>
    </div>

Результат:

    ┌─────────────────────────────┐
    │                             │
    │                             │
    │          ┌───────┐          │
    │          │ Center│          │
    │          └───────┘          │
    │                             │
    └─────────────────────────────┘

---

# 27. gap

Для відстані між flex items краще використовувати:

    gap

Наприклад:

    .container {
        display: flex;
        gap: 20px;
    }

Результат:

    [ A ] 20px [ B ] 20px [ C ]

---

# 28. row-gap

Можна окремо задавати вертикальний gap:

    .container {
        row-gap: 20px;
    }

Особливо корисно при `flex-wrap`.

---

# 29. column-gap

Можна окремо задавати горизонтальний gap:

    .container {
        column-gap: 20px;
    }

---

# 30. gap: два значення

    .container {
        display: flex;
        gap: 10px 20px;
    }

Порядок:

    row-gap column-gap

Тобто:

    row-gap: 10px;
    column-gap: 20px;

---

# 31. gap vs margin

Старий підхід:

    .item {
        margin-right: 20px;
    }

Сучасний:

    .container {
        display: flex;
        gap: 20px;
    }

`gap` має важливу перевагу:

> Він описує відстань між items на рівні контейнера.

Це особливо зручно для компонентів та responsive layout.

---

# 32. flex-wrap

За замовчуванням:

    flex-wrap: nowrap;

Усі items намагаються залишитися в одному рядку.

Наприклад:

    .container {
        display: flex;
        flex-wrap: nowrap;
    }

---

# 33. flex-wrap: wrap

    .container {
        display: flex;
        flex-wrap: wrap;
    }

Якщо місця недостатньо, items переносяться на наступний рядок.

Наприклад:

    [ A ] [ B ] [ C ]
    [ D ] [ E ] [ F ]

Це дуже важливо для responsive layouts.

---

# 34. flex-wrap: wrap-reverse

    .container {
        display: flex;
        flex-wrap: wrap-reverse;
    }

Лінії переносяться у зворотному напрямку cross axis.

Використовується рідше.

---

# 35. flex-flow

`flex-flow` — shorthand для:

    flex-direction
    flex-wrap

Наприклад:

    .container {
        display: flex;
        flex-flow: row wrap;
    }

Еквівалент:

    .container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

---

# 36. Flex lines

При:

    flex-wrap: wrap;

items можуть утворювати кілька flex lines.

Наприклад:

    [ A ] [ B ] [ C ]

    [ D ] [ E ] [ F ]

Це важливо для розуміння:

    align-items

та:

    align-content

---

# 37. align-content

`align-content` працює з flex lines, коли container має кілька рядків/ліній.

Наприклад:

    .container {
        display: flex;
        flex-wrap: wrap;
        align-content: center;
    }

Воно розподіляє самі flex lines вздовж cross axis.

---

# 38. align-items vs align-content

Це дуже важлива різниця.

`align-items`:

    items всередині flex line

`align-content`:

    flex lines всередині container

Схематично:

    ┌───────────────────────────────┐
    │                               │
    │   [A] [B] [C]  ← line 1      │
    │                               │
    │   [D] [E] [F]  ← line 2      │
    │                               │
    └───────────────────────────────┘

`align-items` працює з `[A] [B] [C]`.

`align-content` працює з `line 1` та `line 2`.

---

# 39. Коли align-content не дає ефекту

Якщо всі items знаходяться в одному рядку:

    flex-wrap: nowrap;

`align-content` зазвичай не має практичного ефекту.

Він стає важливим при:

    flex-wrap: wrap;

і коли в cross axis є додатковий вільний простір.

---

# 40. align-self

`align-self` дозволяє одному item перевизначити `align-items`.

Наприклад:

    .container {
        display: flex;
        align-items: center;
    }

    .special {
        align-self: flex-start;
    }

Усі items будуть по центру, крім `.special`.

---

# 41. align-self: center

    .item {
        align-self: center;
    }

Це дозволяє індивідуально вирівняти item.

Основні значення:

    auto
    flex-start
    flex-end
    center
    stretch
    baseline

---

# 42. order

`order` змінює візуальний порядок flex items.

HTML:

    <div class="container">
        <div class="a">A</div>
        <div class="b">B</div>
        <div class="c">C</div>
    </div>

CSS:

    .c {
        order: -1;
    }

Візуально:

    C A B

---

# 43. Значення order

За замовчуванням:

    order: 0;

Менше число → раніше.

Більше число → пізніше.

Наприклад:

    .a {
        order: 2;
    }

    .b {
        order: 1;
    }

    .c {
        order: 3;
    }

Візуально:

    B A C

---

# 44. Важливе правило про order

`order` змінює:

> візуальний порядок

але не:

> DOM order.

Це може створювати проблеми для:

- keyboard navigation;
- screen readers;
- логіки взаємодії;
- accessibility.

Тому HTML-порядок повинен бути логічним навіть без CSS.

---

# 45. flex-grow

`flex-grow` визначає, наскільки item може збільшуватися, коли є вільний простір.

Наприклад:

    .item {
        flex-grow: 1;
    }

Якщо кілька items мають:

    flex-grow: 1;

вони можуть ділити доступний простір.

---

# 46. flex-grow: 0

Значення за замовчуванням:

    flex-grow: 0;

Item не буде автоматично збільшуватися для заповнення додаткового простору.

---

# 47. flex-grow: 1

Наприклад:

    .container {
        display: flex;
    }

    .item {
        flex-grow: 1;
    }

Якщо три items мають:

    flex-grow: 1;

вони отримують рівну частку додаткового простору за відповідних умов.

---

# 48. Різні значення flex-grow

Наприклад:

    .a {
        flex-grow: 1;
    }

    .b {
        flex-grow: 2;
    }

Вільний простір розподіляється у співвідношенні:

    1 : 2

`.b` отримує приблизно вдвічі більше додаткового простору, ніж `.a`, після врахування базових розмірів та інших constraints.

---

# 49. flex-shrink

`flex-shrink` визначає, наскільки item може стискатися, коли простору недостатньо.

За замовчуванням:

    flex-shrink: 1;

Наприклад:

    .item {
        flex-shrink: 1;
    }

Item може зменшуватися.

---

# 50. flex-shrink: 0

    .item {
        flex-shrink: 0;
    }

Item не буде стискатися через flex-shrink.

Це може бути корисно для:

- іконок;
- кнопок;
- sidebar;
- фіксованих controls.

Але потрібно контролювати overflow.

---

# 51. flex-basis

`flex-basis` визначає початковий розмір item вздовж main axis.

Наприклад:

    .item {
        flex-basis: 200px;
    }

При:

    flex-direction: row;

це приблизно початкова ширина.

При:

    flex-direction: column;

це приблизна початкова висота.

---

# 52. flex-basis: auto

За замовчуванням:

    flex-basis: auto;

Це означає, що flex sizing враховує основний розмір item, наприклад `width` для row layout.

---

# 53. flex-basis: 0

Наприклад:

    .item {
        flex-basis: 0;
        flex-grow: 1;
    }

Це поширений патерн для рівномірного розподілу доступного простору.

Наприклад:

    .item {
        flex: 1 1 0;
    }

---

# 54. flex shorthand

Властивість:

    flex

є shorthand для:

    flex-grow
    flex-shrink
    flex-basis

Наприклад:

    .item {
        flex: 1;
    }

У типовому випадку це означає:

    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;

---

# 55. flex: 1

Один із найпопулярніших патернів:

    .item {
        flex: 1;
    }

Наприклад:

    .container {
        display: flex;
    }

    .item {
        flex: 1;
    }

Три items можуть рівномірно розподілити доступний простір.

---

# 56. flex: 0 1 auto

Типове початкове значення `flex`:

    flex: 0 1 auto;

Тобто:

    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: auto;

Це важливо знати для розуміння поведінки flex items.

---

# 57. flex: none

    .item {
        flex: none;
    }

Еквівалент:

    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;

Item не росте і не стискається через flex sizing.

---

# 58. flex: auto

    .item {
        flex: auto;
    }

Приблизно:

    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;

На відміну від `flex: 1`, `flex-basis` тут `auto`.

---

# 59. width vs flex-basis

У flex layout важливо розуміти різницю.

Наприклад:

    .item {
        width: 200px;
    }

і:

    .item {
        flex-basis: 200px;
    }

`flex-basis` безпосередньо задає базовий розмір вздовж main axis.

Тому для flex sizing часто логічніше використовувати:

    flex-basis

---

# 60. flex-direction впливає на basis

При:

    flex-direction: row;

main axis — горизонтальний.

Тому:

    flex-basis: 200px;

впливає на базову ширину.

При:

    flex-direction: column;

main axis — вертикальний.

Тому `flex-basis` впливає на базову висоту.

---

# 61. min-width: 0

Одна з дуже важливих практичних особливостей Flexbox.

Flex item може не стискатися так, як очікується, через його мінімальний розмір.

Частий fix:

    .item {
        min-width: 0;
    }

Особливо важливо, коли всередині є:

- довгий текст;
- URL;
- code;
- `white-space: nowrap`;
- великі nested elements.

---

# 62. Приклад min-width: 0

    .layout {
        display: flex;
    }

    .sidebar {
        width: 250px;
    }

    .content {
        flex: 1;
        min-width: 0;
    }

Це допомагає `.content` реально стискатися, замість створення несподіваного горизонтального overflow.

---

# 63. min-width: auto

Для flex items початкове значення `min-width` є:

    auto

У багатьох випадках це означає, що item не може стискатися менше певного content-based minimum.

Тому:

    min-width: 0;

є дуже корисним інструментом для контролю overflow.

---

# 64. flex item і margin

Margin може використовуватися для створення спеціального розподілу простору.

Наприклад:

    .navigation {
        display: flex;
    }

    .push {
        margin-left: auto;
    }

Це дозволяє "відштовхнути" item до кінця.

---

# 65. margin-left: auto

Наприклад:

    <nav class="nav">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a class="login" href="#">Login</a>
    </nav>

CSS:

    .nav {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .login {
        margin-left: auto;
    }

Схематично:

    Home  About ───────────── Login

Це дуже корисний практичний патерн.

---

# 66. margin: auto для центрування

Flexbox дозволяє:

    .item {
        margin: auto;
    }

за певних умов розподілу вільного простору.

Наприклад:

    .container {
        display: flex;
    }

    .item {
        margin: auto;
    }

Item може опинитися по центру контейнера.

---

# 67. flex-wrap + gap

Дуже корисна комбінація:

    .cards {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

Items переносяться:

    [ A ] [ B ] [ C ]
    [ D ] [ E ] [ F ]

і між ними зберігається однакова відстань.

---

# 68. Flexbox для navigation

HTML:

    <nav class="nav">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
    </nav>

CSS:

    .nav {
        display: flex;
        align-items: center;
        gap: 24px;
    }

Це один із найпростіших та найпоширеніших випадків Flexbox.

---

# 69. Flexbox для header

HTML:

    <header class="header">
        <a class="logo" href="#">
            Logo
        </a>

        <nav class="nav">
            <a href="#">Home</a>
            <a href="#">About</a>
        </nav>

        <button class="menu">
            Menu
        </button>
    </header>

CSS:

    .header {
        display: flex;
        align-items: center;
        gap: 24px;
    }

    .nav {
        display: flex;
        gap: 16px;
    }

---

# 70. Header з елементом справа

    .header {
        display: flex;
        align-items: center;
    }

    .actions {
        margin-left: auto;
    }

Результат:

    Logo    Navigation             Actions

Це дуже корисний реальний pattern.

---

# 71. Flexbox для кнопок

    .actions {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    <div class="actions">
        <button>Cancel</button>
        <button>Save</button>
    </div>

Flexbox і `gap` добре підходять для груп кнопок.

---

# 72. Flexbox для form controls

Наприклад:

    .form-row {
        display: flex;
        align-items: center;
        gap: 12px;
    }

Це дозволяє створювати:

    [ Input                 ] [ Button ]

---

# 73. Responsive form

Наприклад:

    .form-row {
        display: flex;
        gap: 12px;
    }

На маленькому екрані:

    @media (max-width: 600px) {
        .form-row {
            flex-direction: column;
        }
    }

Тепер:

    [ Input ]
    [ Button ]

---

# 74. Flexbox і responsive cards

    .cards {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

    .card {
        flex: 1 1 250px;
    }

Це дозволяє cards:

- рости;
- стискатися;
- переноситися.

---

# 75. flex: 1 1 250px

Розберемо:

    flex: 1 1 250px;

це:

    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 250px;

Тобто item:

- починає приблизно з `250px`;
- може рости;
- може стискатися;
- може переноситися на інший рядок при `wrap`.

---

# 76. Flexbox для двох колонок

    .layout {
        display: flex;
        gap: 32px;
    }

    .sidebar {
        flex: 0 0 250px;
    }

    .content {
        flex: 1;
    }

Результат:

    ┌──────────┬─────────────────────┐
    │ sidebar  │ content             │
    │ 250px    │ flexible            │
    └──────────┴─────────────────────┘

---

# 77. Flexbox для sidebar + content

HTML:

    <div class="layout">
        <aside class="sidebar">
            Sidebar
        </aside>

        <main class="content">
            Content
        </main>
    </div>

CSS:

    .layout {
        display: flex;
        gap: 32px;
    }

    .sidebar {
        flex: 0 0 240px;
    }

    .content {
        flex: 1;
        min-width: 0;
    }

---

# 78. `flex-basis` і фіксований sidebar

    .sidebar {
        flex: 0 0 240px;
    }

Розшифровка:

    grow: 0
    shrink: 0
    basis: 240px

Sidebar:

- не росте;
- не стискається;
- має базовий розмір 240px.

---

# 79. `align-items: center` vs `align-content: center`

Це одна з найчастіших помилок.

Якщо:

    .container {
        display: flex;
        align-items: center;
    }

центруються items у flex line.

Якщо:

    .container {
        display: flex;
        flex-wrap: wrap;
        align-content: center;
    }

центруються flex lines у container.

---

# 80. `justify-content` vs `align-items`

Запам'ятай через осі:

    justify-content
        ↓
    main axis

    align-items
        ↓
    cross axis

При `row`:

    justify → horizontal
    align   → vertical

При `column`:

    justify → vertical
    align   → horizontal

---

# 81. Flexbox і `height: 100%`

Поширена помилка — очікувати, що:

    height: 100%;

завжди розтягне item.

Для percentage height батьківська висота повинна бути визначена відповідним чином.

У Flexbox часто краще спочатку перевірити:

    align-items: stretch;

або:

    align-self: stretch;

---

# 82. Flexbox і `height`

Наприклад:

    .container {
        display: flex;
        height: 300px;
        align-items: stretch;
    }

Items можуть розтягуватися по cross axis.

---

# 83. `align-self: stretch`

Наприклад:

    .container {
        display: flex;
        align-items: flex-start;
    }

    .item {
        align-self: stretch;
    }

Тільки цей item розтягується по cross axis.

---

# 84. Baseline

Flexbox підтримує:

    align-items: baseline;

Це вирівнює items за їх текстовою baseline.

Наприклад:

    .toolbar {
        display: flex;
        align-items: baseline;
    }

Це корисно, коли в одному рядку є:

- текст різних розмірів;
- heading;
- label;
- controls.

---

# 85. `display: inline-flex`

Є два основних варіанти:

    display: flex;

і:

    display: inline-flex;

`inline-flex` створює flex container, який бере участь у зовнішньому layout як inline-level box.

Наприклад:

    .button-group {
        display: inline-flex;
        gap: 8px;
    }

Всередині все одно працює Flexbox.

---

# 86. flex container vs inline-flex

### `display: flex`

Container поводиться як block-level flex container.

### `display: inline-flex`

Container поводиться як inline-level flex container.

Внутрішній layout в обох випадках — Flexbox.

---

# 87. Nested Flexbox

Flex containers можна вкладати.

Наприклад:

    .header {
        display: flex;
        align-items: center;
    }

    .nav {
        display: flex;
        gap: 20px;
    }

Це абсолютно нормально.

Схема:

    header
      ↓
    flex container
      ↓
    nav
      ↓
    another flex container

---

# 88. Flexbox не тільки для одного рівня

Наприклад:

    .page {
        display: flex;
        flex-direction: column;
    }

    .header {
        display: flex;
        justify-content: space-between;
    }

    .main {
        display: flex;
        gap: 32px;
    }

    .actions {
        display: flex;
        gap: 12px;
    }

Кожен container може мати власну flex-вісь.

---

# 89. Практичний page layout

HTML:

    <div class="page">
        <header class="header">
            <div class="logo">Logo</div>

            <nav class="nav">
                <a href="#">Home</a>
                <a href="#">About</a>
            </nav>
        </header>

        <main class="main">
            <aside class="sidebar">
                Sidebar
            </aside>

            <section class="content">
                Content
            </section>
        </main>
    </div>

CSS:

    .page {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .main {
        display: flex;
        flex: 1;
        gap: 32px;
    }

---

# 90. Sticky footer з Flexbox

Класичний layout:

    .page {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
    }

Структура:

    page
    ├── header
    ├── main ← займає вільний простір
    └── footer

Це дозволяє footer залишатися внизу при короткому контенті.

---

# 91. `flex: 1` для main

Наприклад:

    .page {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
    }

`main` займає доступний простір між header і footer.

---

# 92. `flex-grow` практичний приклад

    .page {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex-grow: 1;
    }

Це аналогічна ідея:

> віддай main доступний додатковий простір.

---

# 93. Flexbox і overflow

Flex item може несподівано створювати horizontal overflow.

Наприклад:

    .content {
        flex: 1;
        min-width: 0;
    }

Часто саме:

    min-width: 0;

вирішує проблему.

Особливо якщо всередині є:

    white-space: nowrap;

або дуже довгий текст.

---

# 94. Flexbox і довгі слова

Наприклад:

    .item {
        overflow-wrap: anywhere;
    }

Це може дозволити довгим словам/URL переноситися замість руйнування layout.

---

# 95. Flexbox і великі зображення

Щоб image не створював overflow:

    img {
        max-width: 100%;
        height: auto;
    }

Для flex layout це особливо важливо всередині вузьких колонок.

---

# 96. Flexbox і `min-height: 0`

Аналогічна проблема може виникати по вертикалі.

Наприклад:

    .page {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .main {
        flex: 1;
        min-height: 0;
        overflow: auto;
    }

`min-height: 0` може дозволити flex item реально стискатися по вертикалі.

Це особливо корисно для app layouts.

---

# 97. App layout pattern

    .app {
        display: flex;
        flex-direction: column;
        height: 100dvh;
    }

    .app__header {
        flex: 0 0 auto;
    }

    .app__main {
        flex: 1 1 auto;
        min-height: 0;
        overflow: auto;
    }

Це поширений шаблон для application UI.

---

# 98. `gap` замість негативних margin

Flexbox дозволяє уникати багатьох hacks:

    .container {
        display: flex;
        gap: 16px;
    }

замість складних:

    .item {
        margin-right: 16px;
    }

та:

    .item:last-child {
        margin-right: 0;
    }

---

# 99. Не потрібно "центрувати" через margin hacks

Замість:

    margin-left: 50%;
    margin-top: 50%;

для flex container:

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

Це простіше та адаптивніше.

---

# 100. Flexbox vs Positioning

Не варто:

    .item {
        position: absolute;
        left: 300px;
        top: 50px;
    }

для звичайного layout.

Краще:

    .container {
        display: flex;
        gap: 20px;
    }

Positioning потрібен тоді, коли елемент повинен бути:

- накладений;
- зафіксований;
- sticky;
- точно позиціонований.

---

# 101. Flexbox vs Grid

Flexbox:

> one-dimensional layout

Grid:

> two-dimensional layout

Flexbox добре підходить:

    [ A ] [ B ] [ C ]

Grid добре підходить для:

    [ A ] [ B ] [ C ]
    [ D ] [ E ] [ F ]

Але Flexbox теж може створювати кілька рядків через `flex-wrap`.

---

# 102. Коли використовувати Flexbox

Flexbox особливо хороший для:

- navigation;
- toolbar;
- button groups;
- header;
- form rows;
- horizontal lists;
- vertical stacks;
- component internals;
- alignment;
- distribution of free space.

---

# 103. Коли краще Grid

Grid часто краще для:

- page layout;
- dashboard;
- складних rows + columns;
- двовимірних сіток;
- однакових колонок;
- explicit track layout.

Наприклад:

    .dashboard {
        display: grid;
        grid-template-columns: 240px 1fr 300px;
    }

---

# 104. Flexbox і component design

Хороший компонент часто має:

    .component {
        display: flex;
        align-items: center;
        gap: 12px;
    }

Наприклад:

    .user-card {
        display: flex;
        align-items: center;
        gap: 16px;
    }

Це краще, ніж позиціонувати avatar і text через `absolute`.

---

# 105. Практичний User Card

HTML:

    <article class="user-card">
        <img
            class="user-card__avatar"
            src="avatar.jpg"
            alt="User"
        >

        <div class="user-card__info">
            <h2>Valeriy</h2>
            <p>Developer</p>
        </div>
    </article>

CSS:

    .user-card {
        display: flex;
        align-items: center;
        gap: 16px;
    }

Це простий, правильний Flexbox layout.

---

# 106. Практичний Toolbar

    .toolbar {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .toolbar__spacer {
        margin-left: auto;
    }

Структура:

    [Filter] [Search] ───────── [Save] [Delete]

---

# 107. Практичний Card Actions

    .card__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
    }

Ліва частина:

    information

Права частина:

    actions

---

# 108. Практичний Stack

Flexbox чудово підходить для вертикальних stack-компонентів:

    .stack {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

HTML:

    <div class="stack">
        <h2>Title</h2>
        <p>Description</p>
        <button>Save</button>
    </div>

Це дуже поширений pattern у сучасному frontend.

---

# 109. Stack component

Можна створити універсальний utility:

    .stack {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

Тепер:

    <div class="stack">
        ...
    </div>

створює вертикальний ритм без margin hacks.

---

# 110. Inline stack

Для горизонтального stack:

    .cluster {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
    }

Це корисно для:

- tags;
- buttons;
- navigation;
- filters.

---

# 111. Flexbox і CSS variables

Можна створити:

    :root {
        --gap-sm: 8px;
        --gap-md: 16px;
        --gap-lg: 24px;
    }

    .toolbar {
        display: flex;
        gap: var(--gap-md);
    }

Це спрощує підтримку design system.

---

# 112. Практична система layout utilities

Наприклад:

    .flex {
        display: flex;
    }

    .items-center {
        align-items: center;
    }

    .justify-between {
        justify-content: space-between;
    }

    .gap-md {
        gap: 16px;
    }

Але не варто створювати сотні utility-класів без системи.

---

# 113. Flexbox і `order`: accessibility

Погано:

HTML:

    <button>Delete</button>
    <button>Save</button>

CSS:

    .save {
        order: -1;
    }

Візуально Save буде першим, але DOM-порядок залишиться іншим.

Краще:

    <button>Save</button>
    <button>Delete</button>

і використовувати CSS для layout, а не для виправлення логічного порядку документа.

---

# 114. Flexbox і writing direction

Flexbox працює з logical direction.

Напрямок `row` пов'язаний з inline axis, а не просто з фізичним "лівим → правим".

Тому важливо враховувати:

    direction: ltr;
    direction: rtl;

та writing modes у складніших міжнародних інтерфейсах.

---

# 115. `row-reverse` і RTL

Не варто автоматично використовувати:

    row-reverse;

для підтримки RTL.

Краще розуміти:

- DOM order;
- `direction`;
- logical properties;
- writing mode.

CSS повинен адаптувати layout, а не ламати логіку документа.

---

# 116. Flexbox і `visibility`

Flexbox керує layout, але властивості видимості можуть впливати на items.

Наприклад:

    .hidden {
        visibility: hidden;
    }

Item може залишатися у layout.

На відміну від:

    display: none;

який прибирає item із layout.

---

# 117. Flexbox і `display: none`

Якщо:

    .item {
        display: none;
    }

item не бере участі у flex layout.

Наприклад:

    .container {
        display: flex;
    }

    .item {
        display: none;
    }

Flex container перераховує layout без цього item.

---

# 118. Flexbox debugging

Якщо Flexbox поводиться дивно, перевір:

1. `display: flex`;
2. `flex-direction`;
3. `justify-content`;
4. `align-items`;
5. `flex-wrap`;
6. `gap`;
7. `flex`;
8. `width`;
9. `min-width`;
10. `min-height`;
11. overflow;
12. розмір parent;
13. DOM structure.

---

# 119. DevTools Flexbox

Сучасні DevTools дозволяють:

- побачити flex container;
- побачити main/cross axis;
- переглянути items;
- перевірити `gap`;
- побачити computed flex values;
- досліджувати alignment;
- знаходити overflow.

Для навчання Flexbox DevTools дуже корисний.

---

# 120. Типові помилки

### ❌ Плутати main axis та horizontal axis

Не завжди:

    main = horizontal

Бо:

    flex-direction: column;

робить main axis вертикальною.

---

### ❌ Плутати `justify-content` та `align-items`

Не:

    justify = horizontal
    align = vertical

А:

    justify-content → main axis

    align-items → cross axis


### ❌ Використовувати margin замість gap

Не завжди потрібно:

    margin-right: 20px;

Краще:

    gap: 20px;


### ❌ Використовувати absolute для layout

Не:

    position: absolute;

для всіх елементів.

Краще:

    display: flex;


### ❌ Забути `flex-wrap`

На вузькому екрані:

    flex-wrap: wrap;

може бути необхідним.


### ❌ Забути `min-width: 0`

Для flexible content:

    .content {
        min-width: 0;
    }

може бути критично важливим.


### ❌ Зловживати `order`

Не використовуй `order` для виправлення неправильного HTML-порядку.


# Питання зі співбесіди

## 🟢 Junior

### 1. Що таке Flexbox?

Flexbox — CSS layout model для розташування елементів уздовж однієї основної осі з можливістю вирівнювання та розподілу простору.

### 2. Як увімкнути Flexbox?

    .container {
        display: flex;
    }

### 3. Що таке flex container?

Елемент із:

    display: flex;

### 4. Що таке flex item?

Пряма дитина flex container.

### 5. Що таке main axis?

Основна вісь, яку визначає `flex-direction`.

### 6. Що таке cross axis?

Вісь, перпендикулярна main axis.

### 7. Для чого `flex-direction`?

Визначає напрямок main axis.

### 8. Яке значення `flex-direction` за замовчуванням?

    row

### 9. Для чого `justify-content`?

Для вирівнювання вздовж main axis.

### 10. Для чого `align-items`?

Для вирівнювання вздовж cross axis.

### 11. Для чого `gap`?

Для задання відстані між flex items.

### 12. Для чого `flex-wrap`?

Для дозволу перенесення items на наступні flex lines.

### 13. Як відцентрувати item?

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

### 14. Що таке `flex-grow`?

Здатність item використовувати додатковий вільний простір.

### 15. Що таке `flex-shrink`?

Здатність item стискатися, коли доступного простору недостатньо.

### 16. Що таке `flex-basis`?

Початковий розмір flex item вздовж main axis.


## 🔵 Junior+

### 17. У чому різниця між `align-items` та `align-content`?

`align-items` вирівнює items у flex line.

`align-content` вирівнює flex lines у container, коли їх декілька.

### 18. Що робить `align-self`?

Дозволяє окремому item перевизначити `align-items`.

### 19. Що робить `order`?

Змінює візуальний порядок flex items.

### 20. Чому `order` потрібно використовувати обережно?

Тому що DOM-порядок не змінюється, що може впливати на accessibility та keyboard navigation.

### 21. Що означає:

    flex: 1;

Це shorthand, який дозволяє item рости та стискатися і використовувати доступний простір.

### 22. Що означає:

    flex: 0 0 250px;

Приблизно:

    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 250px;

### 23. Для чого `min-width: 0` у flex item?

Щоб дозволити item стискатися менше content-based minimum і уникати багатьох випадків небажаного overflow.

### 24. Чим `flex` відрізняється від `inline-flex`?

`flex` — block-level flex container.

`inline-flex` — inline-level flex container.

Внутрішній layout в обох випадках — Flexbox.


## 🟠 Middle

### 25. Чому `flex-basis` важливіший за `width` у деяких flex layouts?

Тому що `flex-basis` безпосередньо визначає базовий розмір уздовж main axis.

### 26. Чому `min-width: auto` може створювати overflow?

Тому що flex item за замовчуванням має content-based minimum size у багатьох ситуаціях і може відмовлятися стискатися настільки, наскільки очікується.

### 27. Чому `align-content` не працює?

Перевір:

- чи є `flex-wrap: wrap`;
- чи є кілька flex lines;
- чи є додатковий простір у cross axis.

### 28. Чому `justify-content: center` не центрує item?

Потрібно перевірити:

- main axis;
- розмір container;
- чи є вільний простір;
- `flex-direction`;
- margins;
- `flex-grow`.

### 29. Чому `align-items: center` не дає вертикального центрування?

Тому що вертикаль — cross axis тільки при:

    flex-direction: row;

При:

    flex-direction: column;

cross axis горизонтальна.

### 30. Чим Flexbox відрізняється від Grid?

Flexbox — переважно one-dimensional layout.

Grid — two-dimensional layout.


# Практичні завдання

## Завдання 1 — Navigation

Створи:

    [Logo] [Home] [About] [Contact]

Використай:

    display: flex;
    gap;
    align-items;


## Завдання 2 — Header

Створи:

    [Logo] [Navigation]────────[Login]

Використай:

    margin-left: auto;


## Завдання 3 — Center

Відцентруй блок горизонтально та вертикально.

    display: flex;
    justify-content: center;
    align-items: center;


## Завдання 4 — Cards

Створи responsive cards:

    [Card] [Card] [Card]
    [Card] [Card] [Card]

Використай:

    flex-wrap: wrap;
    gap;


## Завдання 5 — Sidebar

Створи:

    [Sidebar] [Content]

Sidebar:

    240px

Content:

    flexible

Використай:

    flex: 0 0 240px;

та:

    flex: 1;


## Завдання 6 — Toolbar

Створи:

    [Filter] [Search]────────[Save] [Delete]

Використай:

    margin-left: auto;


## Завдання 7 — Mobile layout

Desktop:

    [Input] [Button]

Mobile:

    [Input]
    [Button]

Використай:

    flex-direction;


## Завдання 8 — Stack

Створи вертикальний stack:

    Title
    Description
    Input
    Button

Використай:

    flex-direction: column;
    gap;


# Шлях

## 🟢 Core — обов'язково знати

Ти повинен впевнено знати:

- `display: flex`;
- flex container;
- flex item;
- main axis;
- cross axis;
- `flex-direction`;
- `justify-content`;
- `align-items`;
- `gap`;
- `flex-wrap`;
- `align-self`;
- `flex-grow`;
- `flex-shrink`;
- `flex-basis`;
- `flex`;
- `order`;
- `margin-left: auto`;
- horizontal centering;
- vertical centering;
- responsive flex layouts.


## 🔵 Junior

Потрібно вміти:

- створювати navigation;
- створювати header;
- створювати toolbar;
- створювати button groups;
- створювати card layouts;
- створювати sidebar + content;
- використовувати `flex-wrap`;
- використовувати `gap`;
- використовувати `flex: 1`;
- використовувати `flex: 0 0 240px`;
- розуміти `min-width: 0`;
- створювати vertical stacks;
- використовувати media queries разом із Flexbox;
- комбінувати Flexbox з `position: relative/absolute`;
- знати коли Flexbox, а коли Grid.


## 🟠 Middle

Потрібно добре розуміти:

- алгоритм flex sizing;
- free space distribution;
- `flex-grow`;
- `flex-shrink`;
- `flex-basis`;
- automatic minimum size;
- `min-width: 0`;
- `min-height: 0`;
- flex lines;
- `align-content`;
- baseline alignment;
- nested flex containers;
- intrinsic sizing;
- overflow у flex layouts;
- logical properties;
- writing direction;
- accessibility та `order`;
- складні responsive layouts.


## 🔴 Senior

Варто глибоко розуміти:

- Flexbox specification;
- flex formatting context;
- flex base size;
- hypothetical main size;
- hypothetical cross size;
- free space calculation;
- grow/shrink algorithm;
- min/max constraints;
- intrinsic sizing;
- automatic minimum size;
- baseline alignment;
- multi-line flex containers;
- interaction Flexbox + Grid;
- interaction Flexbox + absolute positioning;
- overflow propagation;
- writing modes;
- logical dimensions;
- accessibility implications;
- browser interoperability;
- layout performance;
- component-level layout architecture.


# Міні-шпаргалка

## Увімкнути Flexbox

    .container {
        display: flex;
    }


## Напрямок

    flex-direction: row;

    flex-direction: row-reverse;

    flex-direction: column;

    flex-direction: column-reverse;


## Головна вісь

    justify-content


## Поперечна вісь

    align-items


## Центрування

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }


## Простір між items

    .container {
        display: flex;
        gap: 20px;
    }


## Перенесення

    .container {
        display: flex;
        flex-wrap: wrap;
    }


## Responsive cards

    .cards {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

    .card {
        flex: 1 1 250px;
    }


## Розтягування

    .item {
        flex-grow: 1;
    }


## Стискання

    .item {
        flex-shrink: 1;
    }


## Базовий розмір

    .item {
        flex-basis: 250px;
    }


## Гнучкий item

    .item {
        flex: 1;
    }


## Фіксований sidebar

    .sidebar {
        flex: 0 0 240px;
    }


## Flexible content

    .content {
        flex: 1;
        min-width: 0;
    }


## Відсунути item вправо

    .item {
        margin-left: auto;
    }


## Індивідуальне вирівнювання

    .item {
        align-self: center;
    }


## Візуальний порядок

    .item {
        order: 1;
    }


# Головне

Запам'ятай не окремі властивості, а систему:

    display: flex
        ↓
    flex container
        ↓
    ┌─────────────────────────────┐
    │                             │
    │       flex items            │
    │                             │
    └─────────────────────────────┘


Основна вісь визначається:

    flex-direction


Вирівнювання по main axis:

    justify-content


Вирівнювання по cross axis:

    align-items


Відстань:

    gap


Перенесення:

    flex-wrap


Розмір item:

    flex-grow
    flex-shrink
    flex-basis
    flex


Індивідуальне вирівнювання:

    align-self


Візуальний порядок:

    order


Найважливіша формула мислення:

    1. Увімкни Flexbox

        display: flex;


    2. Визнач напрямок

        flex-direction: row / column;


    3. Подумай про main axis

        justify-content


    4. Подумай про cross axis

        align-items


    5. Додай відстань

        gap


    6. Якщо потрібно перенесення

        flex-wrap: wrap;


    7. Якщо items повинні ділити простір

        flex: 1;


    8. Якщо item не хоче стискатися

        min-width: 0;


    9. Якщо потрібен окремий item на краю

        margin-left: auto;


    10. Якщо потрібно накласти елемент

        position: relative;
        position: absolute;


Головний принцип:

    Flexbox
        ↓
    "Як розкласти та вирівняти елементи?"

    Positioning
        ↓
    "Як точно розташувати або накласти елемент?"

    Grid
        ↓
    "Як керувати двовимірною сіткою?"


Тому в реальній верстці вони часто працюють разом:

    .card {
        display: flex;
        align-items: center;
        gap: 16px;
        position: relative;
    }

    .card__badge {
        position: absolute;
        top: 8px;
        right: 8px;
    }

Flexbox відповідає за основний layout компонента.

Positioning відповідає за badge.

Саме так варто мислити Flexbox у реальних frontend-проєктах.