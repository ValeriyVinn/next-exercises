# 06. Flexbox vs Grid

Flexbox та CSS Grid — це дві основні сучасні CSS-технології для побудови layout.

Обидві дозволяють керувати:

- розташуванням елементів;
- напрямком елементів;
- відстанями між елементами;
- вирівнюванням;
- розмірами;
- адаптивністю;
- структурою сторінки.

Але вони вирішують різні типи layout-задач.

Головне правило:

    Flexbox → один вимір
    Grid    → два виміри

Тобто:

    Flexbox → row АБО column
    Grid    → rows І columns

---

# Ключові поняття

✔ Flexbox  
✔ CSS Grid  
✔ flex container  
✔ flex item  
✔ grid container  
✔ grid item  
✔ main axis  
✔ cross axis  
✔ row  
✔ column  
✔ one-dimensional layout  
✔ two-dimensional layout  
✔ `display: flex`  
✔ `display: grid`  
✔ `flex-direction`  
✔ `justify-content`  
✔ `align-items`  
✔ `align-content`  
✔ `flex-wrap`  
✔ `flex-grow`  
✔ `flex-shrink`  
✔ `flex-basis`  
✔ `flex`  
✔ `gap`  
✔ `grid-template-columns`  
✔ `grid-template-rows`  
✔ `grid-column`  
✔ `grid-row`  
✔ `grid-template-areas`  
✔ `minmax()`  
✔ `repeat()`  
✔ `auto-fit`  
✔ `auto-fill`  
✔ `fr`  
✔ responsive layout  
✔ intrinsic sizing  
✔ explicit grid  
✔ implicit grid  
✔ alignment  
✔ layout strategy  

---

# Що потрібно пам'ятати

• Flexbox призначений переважно для одномірного layout.

• Grid призначений для двовимірного layout.

• Flexbox зручно використовувати для:

    navigation
    buttons
    toolbars
    horizontal groups
    vertical groups
    cards inside a row
    component-level layouts

• Grid зручно використовувати для:

    page layouts
    dashboards
    galleries
    card grids
    complex two-dimensional layouts
    layouts with explicit rows and columns

• Flexbox працює навколо main axis та cross axis.

• Grid працює одночасно з rows та columns.

• `gap` працює і з Flexbox, і з Grid.

• Не потрібно вибирати одну технологію назавжди.

• Flexbox та Grid часто використовуються разом.

• Grid не є "кращим Flexbox".

• Flexbox не є "спрощеним Grid".

Вони вирішують різні layout-задачі.

---

# Flexbox

Flexbox — це CSS layout model для організації елементів уздовж однієї основної осі.

Щоб створити flex container:

    .container {
        display: flex;
    }

Дочірні елементи стають flex items:

    .container {
        display: flex;
    }

    .item {
        ...
    }

Структура:

    flex container
        │
        ├── flex item
        ├── flex item
        └── flex item

---

# Одновимірний layout

Flexbox працює з однією основною віссю.

Наприклад:

    ─────────────────────→
          main axis

Або:

    │
    │
    │
    ↓
    main axis

Залежить від:

    flex-direction

---

# Main Axis

Main axis — головна вісь Flexbox.

За замовчуванням:

    flex-direction: row;

Тому main axis іде горизонтально:

    → → → → →

Наприклад:

    .container {
        display: flex;
        flex-direction: row;
    }

---

# Cross Axis

Cross axis — вісь, перпендикулярна до main axis.

Якщо:

    flex-direction: row;

то:

    main axis   → → → →
    cross axis
        ↓
        ↓
        ↓

---

# flex-direction

Визначає напрямок main axis.

Основні значення:

    row
    row-reverse
    column
    column-reverse

---

### row

    .container {
        display: flex;
        flex-direction: row;
    }

Елементи:

    [1] [2] [3]

---

### column

    .container {
        display: flex;
        flex-direction: column;
    }

Елементи:

    [1]
    [2]
    [3]

---

# justify-content

`justify-content` вирівнює flex items уздовж main axis.

Наприклад:

    .container {
        display: flex;
        justify-content: center;
    }

Основні значення:

    flex-start
    flex-end
    center
    space-between
    space-around
    space-evenly

---

# align-items

`align-items` вирівнює flex items уздовж cross axis.

Наприклад:

    .container {
        display: flex;
        align-items: center;
    }

Типовий патерн:

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

Це центрує елемент по двох осях у flex container.

---

# gap у Flexbox

`gap` задає відстань між flex items.

    .container {
        display: flex;
        gap: 20px;
    }

Замість:

    margin-right
    margin-left

часто краще використовувати:

    gap

Наприклад:

    .navigation {
        display: flex;
        gap: 16px;
    }

---

# flex-wrap

За замовчуванням flex items намагаються залишитися в одному рядку.

    .container {
        display: flex;
        flex-wrap: nowrap;
    }

Можна дозволити перенос:

    .container {
        display: flex;
        flex-wrap: wrap;
    }

Тоді:

    [1] [2] [3] [4]
    [5] [6] [7] [8]

---

# Flexbox — типовий приклад

Navigation:

    <nav class="navigation">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Blog</a>
        <a href="#">Contact</a>
    </nav>

CSS:

    .navigation {
        display: flex;
        align-items: center;
        gap: 24px;
    }

Це типовий випадок для Flexbox.

---

# Grid

CSS Grid — це двовимірна layout system.

Щоб створити Grid container:

    .container {
        display: grid;
    }

Дочірні елементи стають grid items:

    .container {
        display: grid;
    }

Структура:

    grid container
        │
        ├── grid item
        ├── grid item
        ├── grid item
        └── grid item

---

# Двовимірний layout

Grid одночасно працює з:

    rows
    columns

Наприклад:

    column 1    column 2    column 3
        │           │           │
        ↓           ↓           ↓

    ┌──────────┬──────────┬──────────┐
    │    1     │    2     │    3     │
    ├──────────┼──────────┼──────────┤
    │    4     │    5     │    6     │
    └──────────┴──────────┴──────────┘

Це головна перевага Grid.

---

# grid-template-columns

Визначає колонки Grid.

Наприклад:

    .container {
        display: grid;
        grid-template-columns: 200px 200px 200px;
    }

Отримаємо:

    [200px] [200px] [200px]

---

# grid-template-rows

Визначає рядки.

    .container {
        display: grid;
        grid-template-rows: 100px 200px;
    }

---

# fr

`fr` означає fraction of available space.

Наприклад:

    .container {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

Отримаємо дві рівні колонки:

    [      1fr      ][      1fr      ]

---

### Три колонки

    .container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }

---

### Різні пропорції

    .container {
        display: grid;
        grid-template-columns: 1fr 2fr;
    }

Перша колонка отримує:

    1 частину

Друга:

    2 частини

Приблизно:

    [  1/3  ][     2/3     ]

---

# repeat()

`repeat()` дозволяє скоротити повторення.

Замість:

    grid-template-columns:
        1fr 1fr 1fr 1fr;

можна:

    grid-template-columns:
        repeat(4, 1fr);

---

# minmax()

`minmax()` дозволяє задати мінімальний та максимальний розмір.

Наприклад:

    grid-template-columns:
        repeat(3, minmax(200px, 1fr));

Колонка:

    мінімум → 200px
    максимум → 1fr

---

# auto-fit

`auto-fit` дозволяє Grid адаптувати кількість колонок.

Наприклад:

    .container {
        display: grid;
        grid-template-columns:
            repeat(
                auto-fit,
                minmax(200px, 1fr)
            );
    }

Це дуже корисний responsive pattern.

---

# auto-fill

Схоже на `auto-fit`:

    .container {
        display: grid;
        grid-template-columns:
            repeat(
                auto-fill,
                minmax(200px, 1fr)
            );
    }

Основна різниця проявляється, коли доступного простору більше, ніж потрібно для фактичних items.

Спрощено:

    auto-fit
        → стискає / розтягує існуючі tracks

    auto-fill
        → намагається заповнити доступний простір tracks

Для більшості простих responsive card grids часто зустрічається:

    auto-fit

---

# Grid gap

Як і Flexbox, Grid підтримує:

    gap

Наприклад:

    .grid {
        display: grid;
        gap: 24px;
    }

Можна окремо:

    row-gap: 20px;
    column-gap: 30px;

Або:

    gap: 20px 30px;

---

# Grid item placement

Grid дозволяє контролювати позицію item.

Наприклад:

    .item {
        grid-column: 1 / 3;
    }

Item займає:

    column 1
    column 2

---

# grid-column

Наприклад:

    .item {
        grid-column: 1 / 3;
    }

Схематично:

    ┌───────────────┬───────────────┬───────────────┐
    │     item      │     item      │               │
    └───────────────┴───────────────┴───────────────┘

Item займає дві колонки.

---

# grid-row

Аналогічно можна контролювати rows:

    .item {
        grid-row: 1 / 3;
    }

Item займає два grid rows.

---

# Grid Areas

Grid дозволяє описати layout через імена областей.

Наприклад:

    .page {
        display: grid;

        grid-template-areas:
            "header header"
            "sidebar main"
            "footer footer";
    }

Елементи:

    .header {
        grid-area: header;
    }

    .sidebar {
        grid-area: sidebar;
    }

    .main {
        grid-area: main;
    }

    .footer {
        grid-area: footer;
    }

Візуально:

    ┌───────────────────────────┐
    │          header           │
    ├────────────┬──────────────┤
    │  sidebar   │     main     │
    ├────────────┴──────────────┤
    │          footer           │
    └───────────────────────────┘

Це одна з найсильніших можливостей Grid.

---

# Flexbox vs Grid

Основна різниця:

    Flexbox → one-dimensional

    Grid → two-dimensional

Тобто:

    Flexbox
        → row
        або
        → column

    Grid
        → rows + columns

---

# Flexbox для компонентів

Наприклад, button group:

    .buttons {
        display: flex;
        gap: 12px;
    }

Або navigation:

    .nav {
        display: flex;
        align-items: center;
        gap: 24px;
    }

Або card content:

    .card {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

Це дуже типові Flexbox-задачі.

---

# Grid для структури

Наприклад:

    .dashboard {
        display: grid;
        grid-template-columns:
            240px 1fr;
        gap: 24px;
    }

Або:

    .gallery {
        display: grid;
        grid-template-columns:
            repeat(3, 1fr);
        gap: 16px;
    }

---

# Card Layout: Flexbox

Припустимо, є картка:

    ┌─────────────────────┐
    │       image         │
    │                     │
    ├─────────────────────┤
    │ title               │
    │ description         │
    │ button              │
    └─────────────────────┘

Можна використати Flexbox:

    .card {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

Flexbox керує вертикальним layout всередині картки.

---

# Card Layout: Grid

Сітку самих карток можна зробити через Grid:

    .cards {
        display: grid;
        grid-template-columns:
            repeat(3, 1fr);
        gap: 24px;
    }

Тобто:

    Grid
      ↓
    розташування карток

    Flexbox
      ↓
    внутрішній layout картки

Це дуже поширена комбінація.

---

# Flexbox + Grid разом

Flexbox і Grid не конкурують.

Їх можна комбінувати.

Наприклад:

    .cards {
        display: grid;
        grid-template-columns:
            repeat(3, 1fr);
        gap: 24px;
    }

    .card {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

Тут:

    Grid → layout cards

    Flexbox → layout content inside card

---

# Page Layout

Для загальної структури сторінки Grid часто дуже зручний.

Наприклад:

    .page {
        display: grid;

        grid-template-areas:
            "header header"
            "sidebar main"
            "footer footer";

        grid-template-columns:
            240px 1fr;

        grid-template-rows:
            auto 1fr auto;

        min-height: 100vh;
    }

---

# Navigation

Для navigation часто достатньо Flexbox:

    .nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

Наприклад:

    [LOGO]                 [Home] [About] [Contact]

Flexbox добре підходить, тому що головна задача — розмістити елементи уздовж одного напрямку.

---

# Header

Header також часто використовує Flexbox:

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

Наприклад:

    [LOGO]        [NAVIGATION]        [BUTTON]

---

# Dashboard

Dashboard часто краще підходить для Grid.

    .dashboard {
        display: grid;

        grid-template-columns:
            repeat(3, 1fr);

        gap: 20px;
    }

Наприклад:

    ┌──────────┬──────────┬──────────┐
    │ card 1   │ card 2   │ card 3   │
    ├──────────┼──────────┼──────────┤
    │ card 4   │ card 5   │ card 6   │
    └──────────┴──────────┴──────────┘

Grid контролює:

    columns
    rows
    spacing

---

# Gallery

Image gallery — типовий випадок Grid.

    .gallery {
        display: grid;
        grid-template-columns:
            repeat(4, 1fr);
        gap: 12px;
    }

Схематично:

    [1] [2] [3] [4]
    [5] [6] [7] [8]
    [9] [10][11][12]

---

# Flexbox для Gallery

Flexbox також може використовуватися:

    .gallery {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }

Але тоді browser не керує rows та columns як єдиною двовимірною сіткою.

Flexbox вирішує:

    → розміщення елементів уздовж main axis
    → перенос на нові lines

Grid вирішує:

    → columns
    → rows

Тому для справжньої grid-сітки Grid часто природніший.

---

# Responsive Cards

Grid дозволяє створювати дуже компактні responsive layouts.

    .cards {
        display: grid;
        grid-template-columns:
            repeat(
                auto-fit,
                minmax(250px, 1fr)
            );
        gap: 24px;
    }

На широкому екрані:

    [card] [card] [card] [card]

На меншому:

    [card] [card] [card]

На мобільному:

    [card]
    [card]
    [card]

Кількість колонок змінюється автоматично.

---

# Responsive Flexbox

Flexbox також добре підходить для responsive layouts.

Наприклад:

    .nav {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
    }

На широкому екрані:

    [Home] [About] [Blog] [Contact]

На вузькому:

    [Home] [About]
    [Blog]  [Contact]

---

# Flexbox vs Grid: Alignment

Flexbox має:

    justify-content
    align-items
    align-content
    align-self

Grid також має:

    justify-items
    align-items
    justify-items
    justify-content
    align-content
    align-self
    justify-self

Тому назви alignment-властивостей потрібно розуміти в контексті конкретної layout model.

---

# justify-content

У Flexbox:

    justify-content

вирівнює items уздовж main axis.

Наприклад:

    .container {
        display: flex;
        justify-content: center;
    }

У Grid:

    justify-content

керує розташуванням grid content уздовж inline axis, коли є вільний простір у grid container.

Це важлива відмінність.

Не варто механічно переносити значення Flexbox на Grid.

---

# align-items

У Flexbox:

    align-items

вирівнює flex items уздовж cross axis.

У Grid:

    align-items

вирівнює grid items у cross/block axis їхніх grid areas.

---

# align-self

Дозволяє окремому item мати власне вирівнювання.

Flexbox:

    .item {
        align-self: center;
    }

Grid:

    .item {
        align-self: center;
    }

Властивість існує в обох layout models, але працює відповідно до моделі.

---

# Flexbox: flex-grow

Flex item може отримувати додатковий простір.

    .item {
        flex-grow: 1;
    }

Наприклад:

    .item {
        flex: 1;
    }

часто використовується для розподілу доступного простору між items.

---

# Flexbox: flex-shrink

Визначає, наскільки item може стискатися.

    .item {
        flex-shrink: 1;
    }

Типове значення:

    1

---

# Flexbox: flex-basis

Визначає початковий main size item.

    .item {
        flex-basis: 200px;
    }

---

# flex shorthand

Можна записати:

    flex-grow
    flex-shrink
    flex-basis

однією властивістю:

    flex: 1;

Або:

    flex: 1 1 200px;

---

# Grid vs Flex: sizing

Flexbox часто починає з розміру item та розподіляє вільний простір.

Grid працює з tracks:

    columns
    rows

Наприклад:

    grid-template-columns:
        200px 1fr 200px;

Grid явно описує структуру:

    [200px] [flexible] [200px]

---

# Explicit Grid

Explicit grid — grid tracks, які явно задані.

Наприклад:

    .grid {
        display: grid;
        grid-template-columns:
            200px 1fr;
        grid-template-rows:
            auto 1fr;
    }

Тут явно визначено:

    columns
    rows

---

# Implicit Grid

Якщо items потребують більше tracks, ніж явно визначено, Grid може створити implicit tracks.

Наприклад:

    .grid {
        display: grid;
        grid-template-columns:
            repeat(2, 1fr);
    }

Якщо є багато items:

    [1] [2]
    [3] [4]
    [5] [6]

додаткові rows можуть створюватися автоматично.

---

# grid-auto-rows

Можна контролювати автоматично створені rows:

    .grid {
        display: grid;
        grid-template-columns:
            repeat(3, 1fr);

        grid-auto-rows: 200px;
    }

---

# grid-auto-columns

Аналогічно:

    .grid {
        grid-auto-columns: 200px;
    }

Використовується для implicit columns.

---

# Flexbox vs Grid: DOM order

Обидві технології працюють із DOM-порядком.

Наприклад:

    <div class="container">
        <div>1</div>
        <div>2</div>
        <div>3</div>
    </div>

Без додаткових правил:

    1 → 2 → 3

CSS може змінити visual placement, але не варто без потреби створювати layout, який суперечить логічному DOM-порядку.

Особливо це важливо для:

    accessibility
    keyboard navigation
    screen readers

---

# Accessibility

CSS layout не повинен ламати логічний порядок контенту.

Погано:

    DOM order
        1
        2
        3

Visual order
        3
        1
        2

якщо це створює незрозумілий порядок для користувача.

Важливо пам'ятати:

    DOM order
        ≠
    visual order

CSS відповідає за presentation, а HTML — за semantic structure.

---

# order у Flexbox

Flexbox дозволяє змінювати visual order:

    .item {
        order: 2;
    }

Наприклад:

    .first {
        order: 3;
    }

    .second {
        order: 1;
    }

    .third {
        order: 2;
    }

Але використовувати `order` потрібно обережно.

Не варто змінювати порядок лише для того, щоб "виправити" неправильно побудований HTML.

---

# Flexbox vs Grid: таблиця

| Характеристика | Flexbox | Grid |
|---|---|---|
| Основна модель | 1D | 2D |
| Rows | вторинні | основні |
| Columns | вторинні | основні |
| Main axis | так | немає такого поняття |
| Cross axis | так | працює через grid axes |
| Navigation | чудово | можливо |
| Toolbar | чудово | можливо |
| Component layout | чудово | чудово |
| Page layout | можливо | чудово |
| Dashboard | можливо | чудово |
| Gallery | можливо | чудово |
| Card grid | можливо | чудово |
| `gap` | так | так |
| `flex-grow` | так | ні |
| `grid-template-columns` | ні | так |
| `grid-template-areas` | ні | так |
| `fr` | ні | так |
| `minmax()` | ні | так |
| `auto-fit` | ні | так |
| `auto-fill` | ні | так |

---

# Коли використовувати Flexbox

Використовуй Flexbox, коли:

• потрібно розташувати елементи в одному напрямку;

• важливі взаємовідносини між items уздовж однієї осі;

• потрібно вирівняти items;

• потрібно розподілити вільний простір;

• створюється navigation;

• створюється toolbar;

• створюється button group;

• створюється header;

• створюється невеликий component layout;

• потрібно легко змінити row ↔ column.

Типові приклади:

    navigation
    toolbar
    button group
    header
    footer content
    card content
    form controls
    icon + text
    avatar + user info

---

# Коли використовувати Grid

Використовуй Grid, коли:

• важливі одночасно rows та columns;

• потрібно створити двовимірну структуру;

• потрібно контролювати колонки;

• потрібно контролювати rows;

• потрібен dashboard;

• потрібна gallery;

• потрібен card grid;

• потрібно описати page layout;

• потрібно використовувати named areas;

• потрібно створити складну responsive grid.

Типові приклади:

    page layout
    dashboard
    gallery
    card grid
    product grid
    admin panel
    calendar
    complex form layout

---

# Коли використовувати обидва

У реальному frontend development дуже часто використовуються обидва.

Наприклад:

    page
      ↓
    Grid
      ↓
    sections
      ↓
    Flexbox
      ↓
    components

Приклад:

    .page {
        display: grid;
        grid-template-rows:
            auto 1fr auto;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .cards {
        display: grid;
        grid-template-columns:
            repeat(
                auto-fit,
                minmax(250px, 1fr)
            );
        gap: 24px;
    }

    .card {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

Отримуємо:

    Grid
      ↓
    page layout

    Flexbox
      ↓
    header

    Grid
      ↓
    cards

    Flexbox
      ↓
    card content

Це дуже типовий реальний підхід.

---

# Layout Decision

При виборі між Flexbox та Grid можна поставити собі питання:

    1. Мені потрібен один напрямок?
            ↓
          Flexbox

    2. Мені одночасно потрібні rows + columns?
            ↓
          Grid

---

# Decision Tree

    Потрібен layout?
          │
          ↓
    Один вимір?
       /       \
     Так       Ні
      ↓         ↓
    Flexbox    Grid
      │         │
      ↓         ↓
    row/column rows/columns

---

# Якщо потрібна navigation

    display: flex;

---

# Якщо потрібен card grid

    display: grid;

---

# Якщо потрібно вирівняти icon + text

    display: flex;
    align-items: center;

---

# Якщо потрібен dashboard

    display: grid;

---

# Якщо потрібно розмістити кнопки в ряд

    display: flex;
    gap: 12px;

---

# Якщо потрібно створити page areas

    display: grid;
    grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";

---

# Якщо потрібно зробити responsive card grid

    display: grid;
    grid-template-columns:
        repeat(
            auto-fit,
            minmax(250px, 1fr)
        );

---

# Якщо потрібно вертикально розташувати елементи

Flexbox:

    .container {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

Grid також може це зробити:

    .container {
        display: grid;
        gap: 16px;
    }

Тому питання не лише:

    "Чи можна?"

а:

    "Яка layout model краще описує задачу?"

---

# Flexbox vs Grid: mindset

Flexbox mindset:

    "Як розташувати ці items
     вздовж цієї осі?"

Grid mindset:

    "Як побудувати
     rows + columns?"

Це дуже корисна ментальна модель.

---

# Практичний приклад

HTML:

    <main class="page">
        <header class="header">
            <div class="logo">Logo</div>

            <nav class="nav">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </nav>
        </header>

        <section class="cards">
            <article class="card">
                <h2>Card 1</h2>
                <p>Text</p>
                <button>Read</button>
            </article>

            <article class="card">
                <h2>Card 2</h2>
                <p>Text</p>
                <button>Read</button>
            </article>

            <article class="card">
                <h2>Card 3</h2>
                <p>Text</p>
                <button>Read</button>
            </article>
        </section>
    </main>

CSS:

    .page {
        display: grid;
        gap: 32px;
        padding: 24px;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .nav {
        display: flex;
        gap: 20px;
    }

    .cards {
        display: grid;
        grid-template-columns:
            repeat(
                auto-fit,
                minmax(250px, 1fr)
            );
        gap: 24px;
    }

    .card {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

Тут:

    Grid
        → page spacing
        → card grid

    Flexbox
        → header
        → navigation
        → card content

---

# Практичний приклад: одна задача двома способами

Потрібно розмістити три кнопки:

    [Cancel] [Save] [Delete]

Flexbox:

    .buttons {
        display: flex;
        gap: 12px;
    }

Це природний вибір.

Grid теж може:

    .buttons {
        display: grid;
        grid-template-columns:
            repeat(3, auto);
        gap: 12px;
    }

Технічно працює.

Але Flexbox краще описує задачу:

    "У мене є група items
     в одному напрямку."

---

# Інший приклад

Потрібно створити:

    ┌───────────────┬───────────────┐
    │    header     │    header     │
    ├───────────────┼───────────────┤
    │    sidebar    │     main      │
    ├───────────────┴───────────────┤
    │             footer            │
    └───────────────────────────────┘

Grid природно описує цю задачу:

    .page {
        display: grid;

        grid-template-areas:
            "header header"
            "sidebar main"
            "footer footer";
    }

Flexbox для такого layout можливий, але структура буде менш прямолінійною.

---

# Типові помилки

❌ Вважати, що Grid завжди кращий за Flexbox.

Grid не замінює Flexbox.

---

❌ Вважати, що Flexbox застарів після появи Grid.

Flexbox залишається основною layout technology для багатьох component-level задач.

---

❌ Використовувати Grid для кожного маленького компонента.

Наприклад:

    icon + text

часто простіше:

    display: flex;

---

❌ Використовувати Flexbox для складної двовимірної сітки.

Наприклад:

    dashboard
    rows + columns
    named page areas

часто краще описати через Grid.

---

❌ Використовувати `margin` замість `gap` без необхідності.

Сучасний layout часто простіше написати:

    display: flex;
    gap: 16px;

або:

    display: grid;
    gap: 16px;

---

❌ Плутати `justify-content` та `align-items`.

У Flexbox напрямок залежить від:

    flex-direction

Тому потрібно спочатку визначити:

    main axis
    cross axis

---

❌ Забувати про `flex-direction`.

Наприклад:

    display: flex;
    align-items: center;

не означає автоматично:

    "центрувати по вертикалі"

Все залежить від напрямку main axis.

---

❌ Зловживати `order`.

Visual order не повинен без необхідності суперечити DOM order.

---

❌ Будувати layout за допомогою великої кількості абсолютного позиціонування.

Замість:

    position: absolute;

часто потрібно спочатку розглянути:

    Flexbox
    Grid

---

❌ Створювати складний layout через багато `margin-left`, `margin-top`.

Спочатку перевір:

    flex
    grid
    gap
    alignment
    padding

---

# Flexbox vs Grid та position

Flexbox і Grid повинні бути основними інструментами layout.

`position` використовується для інших задач:

    relative
    absolute
    fixed
    sticky

Наприклад:

    картка
        ↓
    Grid / Flexbox

    badge поверх картинки
        ↓
    position: absolute

Тобто технології можуть працювати разом.

---

# Flexbox vs Grid та CSS Box Model

Обидві layout models працюють із CSS box model.

Кожен item має:

    content
    padding
    border
    margin

Flexbox/Grid визначають, як ці boxes розташовуються відносно один одного.

---

# Flexbox vs Grid та responsive design

Responsive layout часто будується через:

    Flexbox
    Grid
    media queries
    minmax()
    repeat()
    auto-fit
    auto-fill
    flex-wrap
    relative units

Наприклад:

    .cards {
        display: grid;
        grid-template-columns:
            repeat(
                auto-fit,
                minmax(240px, 1fr)
            );
        gap: 20px;
    }

Це може зменшити кількість необхідних media queries.

---

# Mobile First

Можна починати layout із вузького viewport.

Наприклад:

    .cards {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
    }

Потім на ширшому екрані:

    @media (min-width: 768px) {
        .cards {
            grid-template-columns:
                repeat(2, 1fr);
        }
    }

Ще ширше:

    @media (min-width: 1200px) {
        .cards {
            grid-template-columns:
                repeat(3, 1fr);
        }
    }

---

# Auto Responsive Grid

Замість великої кількості breakpoint rules можна:

    .cards {
        display: grid;
        grid-template-columns:
            repeat(
                auto-fit,
                minmax(240px, 1fr)
            );
        gap: 20px;
    }

Browser сам визначає кількість колонок залежно від доступної ширини.

---

# Flexbox Responsive Pattern

Наприклад:

    .toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }

Це дозволяє items переходити на наступний рядок при недостатній ширині.

---

# Flexbox: типові patterns

## Center

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

---

## Horizontal Navigation

    .nav {
        display: flex;
        align-items: center;
        gap: 24px;
    }

---

## Vertical Stack

    .stack {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

---

## Space Between

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

---

## Wrapping

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

---

# Grid: типові patterns

## Equal Columns

    .grid {
        display: grid;
        grid-template-columns:
            repeat(3, 1fr);
    }

---

## Responsive Columns

    .grid {
        display: grid;
        grid-template-columns:
            repeat(
                auto-fit,
                minmax(250px, 1fr)
            );
    }

---

## Sidebar + Content

    .layout {
        display: grid;
        grid-template-columns:
            240px 1fr;
    }

---

## Header / Main / Footer

    .page {
        display: grid;
        grid-template-rows:
            auto 1fr auto;
        min-height: 100vh;
    }

---

## Named Areas

    .page {
        display: grid;

        grid-template-areas:
            "header header"
            "sidebar main"
            "footer footer";
    }

---

# Порівняння на рівні мислення

Flexbox:

    container
        ↓
    main axis
        ↓
    items
        ↓
    alignment
        ↓
    free space

Grid:

    container
        ↓
    rows + columns
        ↓
    tracks
        ↓
    grid areas
        ↓
    items
        ↓
    alignment

---

# Що вибрати?

## Вибирай Flexbox, якщо:

    один напрямок
        ↓
    row / column
        ↓
    component layout
        ↓
    alignment
        ↓
    spacing

---

## Вибирай Grid, якщо:

    два виміри
        ↓
    rows + columns
        ↓
    page structure
        ↓
    dashboard / gallery
        ↓
    explicit layout

---

## Використовуй обидва, якщо:

    Grid
      ↓
    page / section
      ↓
    Flexbox
      ↓
    component
      ↓
    Grid
      ↓
    nested collection

Комбінація — нормальна і дуже поширена.

---

# Interview Questions

Що таке Flexbox?

Що таке CSS Grid?

Яка головна різниця між Flexbox та Grid?

Що означає one-dimensional layout?

Що означає two-dimensional layout?

Що таке main axis?

Що таке cross axis?

Як визначається main axis у Flexbox?

Що робить `flex-direction`?

Що робить `justify-content`?

Що робить `align-items`?

Що робить `gap`?

Що робить `flex-wrap`?

Що таке `flex-grow`?

Що таке `flex-shrink`?

Що таке `flex-basis`?

Що таке `flex: 1`?

Що таке Grid container?

Що таке grid item?

Що таке grid track?

Що таке grid row?

Що таке grid column?

Що робить `grid-template-columns`?

Що робить `grid-template-rows`?

Що означає `1fr`?

Що робить `repeat()`?

Що робить `minmax()`?

Що таке `auto-fit`?

Що таке `auto-fill`?

Яка різниця між `auto-fit` та `auto-fill`?

Що таке `grid-column`?

Що таке `grid-row`?

Що таке `grid-template-areas`?

Що таке explicit grid?

Що таке implicit grid?

Що таке `grid-auto-rows`?

Коли використовувати Flexbox?

Коли використовувати Grid?

Чи можна використовувати Flexbox та Grid разом?

Як створити responsive card grid?

Як зробити navigation через Flexbox?

Як зробити dashboard через Grid?

Як створити page layout через Grid?

Чому не потрібно використовувати Grid для всього?

Чому не потрібно використовувати Flexbox для всього?

Яка різниця між layout та positioning?

Як Flexbox і Grid пов'язані з CSS Box Model?

Як layout впливає на accessibility?

Що таке DOM order?

Чому потрібно обережно використовувати `order`?

---

# Шлях

🟢 Core (обов'язково знати)

Розуміти різницю:

    Flexbox → 1D
    Grid → 2D

Знати:

    display: flex
    display: grid

Flexbox:

    flex-direction
    justify-content
    align-items
    flex-wrap
    gap

Grid:

    grid-template-columns
    grid-template-rows
    gap
    fr
    repeat()
    minmax()

Розуміти:

    main axis
    cross axis
    row
    column
    grid item
    flex item

Вміти:

    створити navigation
    створити button group
    створити vertical stack
    створити card grid
    створити simple page layout

---

🔵 Junior

Впевнено використовувати:

    Flexbox
    Grid

Розуміти:

    flex-grow
    flex-shrink
    flex-basis
    flex

Grid:

    grid-column
    grid-row
    grid-template-areas
    grid-area
    grid-auto-rows
    grid-auto-columns

Responsive patterns:

    repeat()
    minmax()
    auto-fit
    auto-fill
    flex-wrap

Вміти комбінувати:

    Grid → page
    Flexbox → components

Розуміти:

    DOM order
    visual order
    accessibility

---

🟠 Middle

Глибше розуміння:

    intrinsic sizing
    min-content
    max-content
    auto sizing
    minmax()
    fractional sizing
    explicit grid
    implicit grid
    auto-placement

Розуміння:

    grid-auto-flow
    justify-items
    justify-content
    align-items
    align-content
    justify-self
    align-self

Вміти проектувати:

    complex dashboards
    responsive layouts
    nested layouts
    component systems

Розуміти trade-offs між:

    Flexbox
    Grid
    position

Вміти створювати layouts із мінімальною кількістю:

    media queries
    magic numbers
    unnecessary wrappers

---

🔴 Senior

Глибоке розуміння:

    CSS Grid layout algorithm
    Flexbox layout algorithm
    intrinsic sizing
    min-content
    max-content
    fit-content
    auto-placement algorithm
    track sizing
    flex base size
    free space distribution
    alignment algorithms
    subgrid
    container queries
    logical properties

Архітектурне мислення:

    page layout
        ↓
    section layout
        ↓
    component layout
        ↓
    internal layout

Оптимальний вибір між:

    Grid
    Flexbox
    position
    normal flow
    multi-column layout

Розуміння:

    accessibility
    source order
    responsive architecture
    maintainability
    design systems

---

# Міні-шпаргалка

## Flexbox

    .container {
        display: flex;
    }

Основна ідея:

    one-dimensional layout

---

## Flex Direction

    flex-direction: row;

    flex-direction: column;

---

## Main Axis

    flex-direction: row;

    main axis
        → → → → →

---

## Cross Axis

    main axis
        → → → → →

    cross axis
        ↓
        ↓
        ↓

---

## Center

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

---

## Gap

    .container {
        display: flex;
        gap: 16px;
    }

---

## Wrap

    .container {
        display: flex;
        flex-wrap: wrap;
    }

---

## Grid

    .container {
        display: grid;
    }

Основна ідея:

    two-dimensional layout

---

## Grid Columns

    .container {
        display: grid;
        grid-template-columns:
            repeat(3, 1fr);
    }

---

## Grid Rows

    .container {
        display: grid;
        grid-template-rows:
            auto 1fr auto;
    }

---

## Fraction

    1fr

означає:

    one fraction
    of available space

---

## Responsive Grid

    .container {
        display: grid;

        grid-template-columns:
            repeat(
                auto-fit,
                minmax(250px, 1fr)
            );
    }

---

## Grid Areas

    .page {
        display: grid;

        grid-template-areas:
            "header header"
            "sidebar main"
            "footer footer";
    }

---

## Flexbox vs Grid

    Flexbox
        ↓
    one dimension
        ↓
    row / column

    Grid
        ↓
    two dimensions
        ↓
    rows + columns

---

## Типові випадки

    Navigation
        → Flexbox

    Button group
        → Flexbox

    Header
        → Flexbox

    Icon + text
        → Flexbox

    Card grid
        → Grid

    Gallery
        → Grid

    Dashboard
        → Grid

    Page layout
        → Grid

    Card content
        → Flexbox

---

## Комбінація

    Page
      ↓
    Grid
      ↓
    Header
      ↓
    Flexbox
      ↓
    Cards
      ↓
    Grid
      ↓
    Card
      ↓
    Flexbox

---

# Головне

• Flexbox — одномірна CSS layout model.

• Grid — двовимірна CSS layout model.

• Flexbox мислить через:

    main axis
    cross axis

• Grid мислить через:

    rows
    columns
    tracks
    areas

• Для navigation часто підходить:

    display: flex;

• Для button group часто підходить:

    display: flex;

• Для icon + text часто підходить:

    display: flex;

• Для card grid часто підходить:

    display: grid;

• Для gallery часто підходить:

    display: grid;

• Для dashboard часто підходить:

    display: grid;

• Для page layout часто підходить:

    display: grid;

• `gap` працює і з Flexbox, і з Grid.

• Flexbox має:

    flex-direction
    justify-content
    align-items
    flex-wrap
    flex-grow
    flex-shrink
    flex-basis

• Grid має:

    grid-template-columns
    grid-template-rows
    grid-template-areas
    grid-column
    grid-row
    grid-area

• `fr` використовується Grid для розподілу доступного простору.

• `repeat()` скорочує повторення grid tracks.

• `minmax()` задає мінімальний та максимальний розмір track.

• `auto-fit` та `auto-fill` корисні для responsive Grid.

• Grid може створювати implicit rows та columns.

• Flexbox та Grid можна і потрібно комбінувати.

• Часто хороший підхід:

    Grid
        → page / section structure

    Flexbox
        → component internals

• Не потрібно вибирати "тільки Flexbox" або "тільки Grid".

• Правильне питання:

    "Яку структуру має мій layout?"

а не:

    "Яку CSS-технологію я повинен використовувати всюди?"

• Якщо задача описується як:

    "розкласти елементи в одному напрямку"

часто підходить:

    Flexbox

• Якщо задача описується як:

    "побудувати rows + columns"

часто підходить:

    Grid

• Layout technologies можна комбінувати:

    normal flow
    Flexbox
    Grid
    position
    media queries
    container queries

• Найважливіша ментальна модель:

    Flexbox
        → one dimension
        → alignment along an axis

    Grid
        → two dimensions
        → rows + columns

• У реальному frontend-проєкті Flexbox і Grid зазвичай доповнюють один одного, а не замінюють один одного.