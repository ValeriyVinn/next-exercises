# 05. Grid Layout

CSS Grid Layout — двовимірна модель CSS-розмітки, призначена для побудови layout одночасно по двох осях:

- columns;
- rows.

Grid особливо зручний для:

- page layout;
- dashboard;
- card grids;
- galleries;
- forms;
- двовимірних сіток;
- sidebar + content;
- складних responsive layouts.

Основна ідея:

    grid container
        ↓
    rows + columns
        ↓
    grid cells
        ↓
    grid items

Щоб увімкнути Grid:

    .container {
        display: grid;
    }

Після цього прямі діти `.container` стають grid items.


## Ключові поняття

| Поняття | Значення |
|---|---|
| Grid container | елемент з `display: grid` |
| Grid item | пряма дитина grid container |
| Grid line | лінія сітки |
| Grid track | рядок або колонка між grid lines |
| Grid row | рядок |
| Grid column | колонка |
| Grid cell | одна комірка сітки |
| Grid area | область із однієї або кількох cells |
| `grid-template-columns` | визначає колонки |
| `grid-template-rows` | визначає рядки |
| `gap` | відстань між tracks |
| `grid-column` | позиція item по columns |
| `grid-row` | позиція item по rows |
| `grid-area` | shorthand / named area |
| `fr` | частка доступного простору |
| `repeat()` | повторення tracks |
| `minmax()` | мінімальний та максимальний розмір |
| `auto-fit` | адаптивне розміщення tracks |
| `auto-fill` | створення максимальної кількості tracks |
| `grid-auto-flow` | алгоритм автоматичного розміщення |
| implicit grid | автоматично створені tracks |
| explicit grid | явно визначені tracks |

---

# 1. Увімкнення Grid

Основний запис:

    .container {
        display: grid;
    }

HTML:

    <div class="container">
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
    </div>

Без додаткових правил items розташуються в одному стовпці.

    One
    Two
    Three

Щоб створити колонки, потрібно задати:

    grid-template-columns


# 2. Grid container

Елемент з:

    display: grid;

називається `grid container`.

Його прямі діти:

    grid items

Наприклад:

    .container {
        display: grid;
    }

    .item {
        /* grid item */
    }

Важливо:

> Grid безпосередньо керує прямими дітьми container.

---

# 3. Grid item

Наприклад:

    <div class="container">
        <div class="item">A</div>
        <div class="item">B</div>
        <div class="item">C</div>
    </div>

Тут:

    .container
        ↓
    grid container

    .item
        ↓
    grid item

Як і у Flexbox, grid item — це саме пряма дитина.

---

# 4. Дві осі Grid

На відміну від Flexbox, Grid відразу працює у двох вимірах.

Є:

    column axis
    row axis

Схематично:

          columns
       ↓       ↓       ↓

    ┌───────┬───────┬───────┐
    │       │       │       │
    │   1   │   2   │   3   │
    │       │       │       │
    ├───────┼───────┼───────┤
    │       │       │       │
    │   4   │   5   │   6   │
    │       │       │       │
    └───────┴───────┴───────┘
          rows

Тому Grid добре підходить для двовимірних layouts.

---

# 5. grid-template-columns

Основна властивість для створення колонок:

    grid-template-columns

Наприклад:

    .container {
        display: grid;
        grid-template-columns: 200px 200px 200px;
    }

Отримаємо:

    ┌──────┬──────┬──────┐
    │  A   │  B   │  C   │
    ├──────┼──────┼──────┤
    │  D   │  E   │  F   │
    └──────┴──────┴──────┘

Створено три колонки по `200px`.

---

# 6. grid-template-rows

Для явного визначення рядків:

    .container {
        display: grid;
        grid-template-rows: 100px 200px;
    }

Наприклад:

    .container {
        display: grid;
        grid-template-columns: 200px 200px;
        grid-template-rows: 100px 200px;
    }

Маємо:

    row 1 → 100px
    row 2 → 200px

---

# 7. Колонки різної ширини

Можна задати різні розміри:

    .container {
        display: grid;
        grid-template-columns: 200px 1fr 300px;
    }

Схематично:

    ┌──────┬──────────────────┬──────┐
    │ 200  │       1fr        │ 300  │
    └──────┴──────────────────┴──────┘

Це дуже поширений layout:

    sidebar | content | actions

---

# 8. `fr`

`fr` означає:

    fraction of available space

Наприклад:

    grid-template-columns: 1fr 1fr;

Дві колонки ділять доступний простір приблизно навпіл.

    ┌──────────────┬──────────────┐
    │     1fr      │     1fr      │
    └──────────────┴──────────────┘

---

# 9. Три рівні колонки

    .container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }

Отримаємо:

    ┌────────┬────────┬────────┐
    │  1fr   │  1fr   │  1fr   │
    └────────┴────────┴────────┘

Скорочений сучасний варіант:

    grid-template-columns: repeat(3, 1fr);

---

# 10. repeat()

`repeat()` дозволяє не дублювати tracks.

Замість:

    grid-template-columns: 1fr 1fr 1fr 1fr;

можна:

    grid-template-columns: repeat(4, 1fr);

Наприклад:

    .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }

---

# 11. repeat() з px

    grid-template-columns: repeat(3, 200px);

Еквівалент:

    grid-template-columns: 200px 200px 200px;

---

# 12. repeat() з різними tracks

Наприклад:

    grid-template-columns: 200px repeat(3, 1fr);

Отримаємо:

    200px | 1fr | 1fr | 1fr

Це корисно для sidebar + content.

---

# 13. `fr` і fixed values

Наприклад:

    grid-template-columns: 200px 1fr;

Перша колонка:

    200px

Друга:

    залишок доступного простору.

Схематично:

    ┌──────────┬─────────────────────────┐
    │  200px   │          1fr            │
    └──────────┴─────────────────────────┘

---

# 14. Дві `fr` з різними значеннями

    grid-template-columns: 1fr 2fr;

Вільний простір розподіляється:

    1 : 2

Тобто друга колонка отримує приблизно вдвічі більше доступного простору.

---

# 15. Чотири колонки

    .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
    }

Отримаємо:

    [ A ] [ B ] [ C ] [ D ]
    [ E ] [ F ] [ G ] [ H ]

---

# 16. gap

Для відстані між grid tracks використовується:

    gap

Наприклад:

    .grid {
        display: grid;
        gap: 20px;
    }

Маємо:

    [ A ] 20px [ B ] 20px [ C ]

`gap` не створює margin навколо зовнішнього краю grid container.

---

# 17. row-gap

Можна окремо задати відстань між rows:

    .grid {
        row-gap: 20px;
    }

---

# 18. column-gap

Для columns:

    .grid {
        column-gap: 30px;
    }

---

# 19. gap: два значення

    .grid {
        gap: 20px 30px;
    }

Еквівалент:

    row-gap: 20px;
    column-gap: 30px;

---

# 20. Grid lines

Grid має лінії, між якими знаходяться tracks.

Наприклад:

    grid-template-columns: repeat(3, 1fr);

має 4 вертикальні grid lines:

    line 1    line 2    line 3    line 4
       │         │         │         │
       ├─────────┼─────────┼─────────┤

Три колонки:

    column 1
    column 2
    column 3

Важливо:

> Кількість grid lines завжди на одну більша за кількість tracks у відповідному напрямку.

---

# 21. grid-column

Властивість:

    grid-column

дозволяє визначити, між якими grid lines буде розташований item.

Наприклад:

    .item {
        grid-column: 1 / 3;
    }

Item займає:

    column line 1 → line 3

тобто дві колонки.

---

# 22. grid-column: span

Замість номерів lines можна сказати:

    .item {
        grid-column: span 2;
    }

Це означає:

> item займає 2 колонки.

---

# 23. Приклад span

    .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
    }

    .featured {
        grid-column: span 2;
    }

Схема:

    [    featured    ] [ C ]
    [ D ] [ E ] [ F ] [ G ]

---

# 24. grid-row

Аналогічно можна керувати rows:

    .item {
        grid-row: 1 / 3;
    }

Item займає дві row tracks.

---

# 25. grid-row: span

    .item {
        grid-row: span 2;
    }

Item займає дві rows.

---

# 26. grid-column-start

Можна окремо вказати початкову line:

    .item {
        grid-column-start: 2;
    }

---

# 27. grid-column-end

І кінцеву:

    .item {
        grid-column-end: 4;
    }

Разом:

    .item {
        grid-column-start: 2;
        grid-column-end: 4;
    }

Еквівалент:

    .item {
        grid-column: 2 / 4;
    }

---

# 28. grid-row-start / grid-row-end

Аналогічно:

    .item {
        grid-row-start: 1;
        grid-row-end: 3;
    }

Еквівалент:

    .item {
        grid-row: 1 / 3;
    }

---

# 29. Від'ємні grid lines

Grid lines можна рахувати з кінця:

    .item {
        grid-column: 1 / -1;
    }

Це означає:

> від першої grid line до останньої.

Дуже корисно для full-width elements.

---

# 30. Full-width item

Наприклад:

    .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }

    .header {
        grid-column: 1 / -1;
    }

Схема:

    ┌──────────────────────────────┐
    │            HEADER            │
    ├──────┬──────┬──────┬────────┤
    │  A   │  B   │  C   │   D    │
    └──────┴──────┴──────┴────────┘

---

# 31. `span` vs line numbers

Можна:

    grid-column: 1 / 3;

або:

    grid-column: span 2;

Перше визначає конкретні lines.

Друге визначає кількість tracks.

---

# 32. Grid area

Grid area — прямокутна область, яка може складатися з декількох cells.

Наприклад:

    .item {
        grid-column: 1 / 3;
        grid-row: 1 / 3;
    }

Цей item займає:

    2 columns
    +
    2 rows

---

# 33. grid-template-areas

Grid дозволяє давати областям імена.

Наприклад:

    .layout {
        display: grid;

        grid-template-areas:
            "header header"
            "sidebar content"
            "footer footer";
    }

Це один із найчитабельніших способів опису page layout.

---

# 34. Назви areas

Потім:

    .header {
        grid-area: header;
    }

    .sidebar {
        grid-area: sidebar;
    }

    .content {
        grid-area: content;
    }

    .footer {
        grid-area: footer;
    }

---

# 35. Повний layout з areas

HTML:

    <div class="layout">
        <header class="header">
            Header
        </header>

        <aside class="sidebar">
            Sidebar
        </aside>

        <main class="content">
            Content
        </main>

        <footer class="footer">
            Footer
        </footer>
    </div>

CSS:

    .layout {
        display: grid;

        grid-template-columns: 240px 1fr;

        grid-template-areas:
            "header header"
            "sidebar content"
            "footer footer";
    }

    .header {
        grid-area: header;
    }

    .sidebar {
        grid-area: sidebar;
    }

    .content {
        grid-area: content;
    }

    .footer {
        grid-area: footer;
    }

---

# 36. Візуальна структура areas

    ┌───────────────────────────────┐
    │             header            │
    ├──────────────┬────────────────┤
    │   sidebar    │     content    │
    ├──────────────┴────────────────┤
    │             footer            │
    └───────────────────────────────┘

Це одна з найсильніших можливостей CSS Grid.

---

# 37. Grid areas для responsive layout

Desktop:

    grid-template-areas:
        "header header"
        "sidebar content"
        "footer footer";

Mobile:

    grid-template-areas:
        "header"
        "content"
        "sidebar"
        "footer";

Наприклад:

    @media (max-width: 768px) {
        .layout {
            grid-template-columns: 1fr;

            grid-template-areas:
                "header"
                "content"
                "sidebar"
                "footer";
        }
    }

Це дозволяє змінити layout без зміни HTML.

---

# 38. `grid-template-columns: 1fr`

Найпростіший responsive layout:

    .layout {
        display: grid;
        grid-template-columns: 1fr;
    }

Одна колонка займає всю доступну ширину.

---

# 39. Responsive two-column layout

Desktop:

    .layout {
        display: grid;
        grid-template-columns: 240px 1fr;
        gap: 24px;
    }

Mobile:

    @media (max-width: 768px) {
        .layout {
            grid-template-columns: 1fr;
        }
    }

---

# 40. Auto columns

Grid може автоматично створювати колонки:

    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

Це один із найкорисніших responsive patterns.

---

# 41. minmax()

`minmax()` задає:

    minimum
    maximum

Наприклад:

    minmax(250px, 1fr)

означає:

> колонка не повинна бути меншою за 250px і може рости до 1fr.

---

# 42. Responsive cards

    .cards {
        display: grid;
        grid-template-columns:
            repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }

Результат автоматично змінюється залежно від ширини container.

Наприклад:

    ┌──────┬──────┬──────┐
    │ Card │ Card │ Card │
    └──────┴──────┴──────┘

На меншій ширині:

    ┌──────────┬──────────┐
    │   Card   │   Card   │
    └──────────┴──────────┘

На ще меншій:

    ┌──────────────────────┐
    │        Card          │
    ├──────────────────────┤
    │        Card          │
    └──────────────────────┘

---

# 43. auto-fit

Наприклад:

    repeat(auto-fit, minmax(250px, 1fr))

`auto-fit` намагається розмістити стільки tracks, скільки реально поміщається, і дозволяє порожнім tracks стискатися.

Це дуже зручний pattern для responsive cards.

---

# 44. auto-fill

Можна використати:

    repeat(auto-fill, minmax(250px, 1fr))

`auto-fill` намагається зберегти максимально можливу кількість tracks, навіть якщо частина з них залишається порожньою.

У простих card layouts часто використовують:

    auto-fit

---

# 45. auto-fit vs auto-fill

Спрощено:

    auto-fit
        → порожні tracks можуть схлопуватися

    auto-fill
        → tracks можуть залишатися зарезервованими

На практиці для responsive card grid часто достатньо:

    repeat(auto-fit, minmax(250px, 1fr))

---

# 46. `minmax()` з `auto-fit`

Дуже важливий pattern:

    .grid {
        display: grid;
        grid-template-columns:
            repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
    }

Це дозволяє створити responsive grid без великої кількості media queries.

---

# 47. minmax() з різними значеннями

Наприклад:

    grid-template-columns:
        repeat(3, minmax(200px, 1fr));

Кожна з трьох колонок:

    minimum = 200px
    maximum = 1fr

---

# 48. `auto` у Grid

Можна:

    grid-template-columns: auto 1fr;

Наприклад:

    [ Sidebar ] [ Content ]

Перша колонка залежить від свого content/available sizing.

Друга займає залишок.

---

# 49. `fit-content()`

CSS Grid підтримує:

    fit-content()

Наприклад:

    grid-template-columns: fit-content(250px) 1fr;

Це дозволяє track рости за content, але з обмеженням.

Це більш advanced sizing pattern.

---

# 50. Implicit grid

Якщо створено:

    grid-template-columns: repeat(3, 1fr);

але items більше, ніж поміщається у визначені rows, Grid автоматично створює додаткові rows.

Наприклад:

    3 columns
    8 items

Результат:

    [1] [2] [3]
    [4] [5] [6]
    [7] [8]

Додаткові rows є частиною:

    implicit grid

---

# 51. Explicit grid

Grid, який ми визначили явно:

    grid-template-columns
    grid-template-rows

називається:

    explicit grid

Наприклад:

    grid-template-columns: 200px 1fr;
    grid-template-rows: 100px 200px;

---

# 52. Implicit rows

Якщо rows не визначені:

    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }

Grid автоматично створює необхідну кількість rows.

---

# 53. grid-auto-rows

Можна контролювати implicit rows:

    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 200px;
    }

Тепер автоматично створені rows мають `200px`.

---

# 54. grid-auto-columns

Аналогічно можна задати implicit columns:

    .grid {
        grid-auto-columns: 200px;
    }

Використовується рідше, але важливо знати про існування.

---

# 55. grid-auto-rows: minmax()

Наприклад:

    .grid {
        grid-auto-rows: minmax(100px, auto);
    }

Row буде:

    minimum = 100px
    maximum = auto

Це корисно для cards із різною кількістю контенту.

---

# 56. grid-auto-flow

Визначає алгоритм автоматичного розміщення items.

За замовчуванням:

    grid-auto-flow: row;

Items заповнюють rows.

---

# 57. grid-auto-flow: column

    .grid {
        grid-auto-flow: column;
    }

Items автоматично розміщуються по columns.

Використовується рідше.

---

# 58. grid-auto-flow: dense

    .grid {
        grid-auto-flow: dense;
    }

Grid може намагатися заповнити доступні "дірки" в сітці.

Це корисно для деяких gallery layouts.

Але потрібно пам'ятати:

> Візуальний порядок може не відповідати простому DOM-порядку.

Тому `dense` слід використовувати обережно для інтерактивного контенту.

---

# 59. justify-items

`justify-items` вирівнює grid items по inline axis всередині їхніх cells.

Наприклад:

    .grid {
        justify-items: center;
    }

---

# 60. align-items у Grid

`align-items` вирівнює grid items по block axis всередині їхніх cells.

Наприклад:

    .grid {
        align-items: center;
    }

---

# 61. place-items

`place-items` — shorthand для:

    align-items
    justify-items

Наприклад:

    .grid {
        place-items: center;
    }

Еквівалент:

    .grid {
        align-items: center;
        justify-items: center;
    }

---

# 62. Центрування Grid item

Наприклад:

    .grid {
        display: grid;
        place-items: center;
    }

Це дуже зручний спосіб центрування items всередині їхніх grid cells.

---

# 63. justify-content у Grid

У Grid:

    justify-content

вирівнює сам grid як ціле всередині container по inline axis, якщо є додатковий простір.

Це відрізняється від:

    justify-items

яке вирівнює items всередині cells.

---

# 64. align-content у Grid

Аналогічно:

    align-content

вирівнює сам grid по block axis всередині container, коли є додатковий простір.

---

# 65. Важливе порівняння

У Grid:

    justify-items
        → item всередині cell

    align-items
        → item всередині cell

    justify-content
        → весь grid всередині container

    align-content
        → весь grid всередині container

---

# 66. place-content

`place-content` — shorthand:

    align-content
    justify-content

Наприклад:

    .grid {
        place-content: center;
    }

---

# 67. align-self у Grid

Окремий item може перевизначити:

    align-items

Наприклад:

    .item {
        align-self: end;
    }

---

# 68. justify-self

Окремий item може перевизначити:

    justify-items

Наприклад:

    .item {
        justify-self: end;
    }

---

# 69. place-self

Shorthand для:

    align-self
    justify-self

Наприклад:

    .item {
        place-self: center;
    }

---

# 70. Grid cell

Grid cell — найменша комірка між:

    one row track
    +
    one column track

Наприклад:

    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 100px);

Створюється:

    3 × 2 = 6 cells

---

# 71. Grid area

Grid area може містити одну або багато cells.

Наприклад:

    .featured {
        grid-column: span 2;
        grid-row: span 2;
    }

Item займає:

    2 × 2 cells

---

# 72. Grid line numbering

Наприклад:

    grid-template-columns:
        repeat(4, 1fr);

Має:

    1   2   3   4   5
    │   │   │   │   │
    ├───┼───┼───┼───┤

Тобто:

    4 columns
    5 lines

---

# 73. `grid-column: 1 / -1`

Один із найкорисніших patterns:

    .item {
        grid-column: 1 / -1;
    }

Item займає всю ширину grid.

---

# 74. Nested Grid

Grid можна вкладати.

Наприклад:

    .page {
        display: grid;
        grid-template-columns: 240px 1fr;
    }

    .content {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }

Тобто:

    page grid
        ↓
    content grid
        ↓
    cards

Це нормальна практика.

---

# 75. Grid і Flexbox разом

Дуже часто вони використовуються разом.

Наприклад:

    .cards {
        display: grid;
        grid-template-columns:
            repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }

    .card {
        display: flex;
        flex-direction: column;
    }

Grid відповідає за:

    cards layout

Flexbox відповідає за:

    content всередині card

---

# 76. Grid для page layout

Наприклад:

    .page {
        display: grid;

        grid-template-columns: 240px 1fr;

        grid-template-rows: auto 1fr auto;
    }

Структура:

    ┌──────────┬─────────────────┐
    │          │                 │
    │ sidebar  │      main       │
    │          │                 │
    ├──────────┴─────────────────┤
    │           footer           │
    └────────────────────────────┘

---

# 77. Grid для dashboard

Наприклад:

    .dashboard {
        display: grid;
        grid-template-columns:
            repeat(4, 1fr);
        gap: 20px;
    }

Cards:

    [ A ] [ B ] [ C ] [ D ]
    [ E ] [ F ] [ G ] [ H ]

---

# 78. Dashboard з featured card

    .dashboard {
        display: grid;
        grid-template-columns:
            repeat(4, 1fr);
        gap: 20px;
    }

    .featured {
        grid-column: span 2;
        grid-row: span 2;
    }

---

# 79. Gallery

Grid дуже добре підходить для gallery:

    .gallery {
        display: grid;
        grid-template-columns:
            repeat(4, 1fr);
        gap: 8px;
    }

    .gallery img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

---

# 80. Gallery з великим item

    .gallery__featured {
        grid-column: span 2;
        grid-row: span 2;
    }

Можна отримати:

    ┌───────────────┬──────┬──────┐
    │               │  B   │  C   │
    │       A       ├──────┼──────┤
    │               │  D   │  E   │
    └───────────────┴──────┴──────┘

---

# 81. Grid для form

Наприклад:

    .form {
        display: grid;
        grid-template-columns:
            150px 1fr;
        gap: 16px;
    }

Структура:

    Label       Input
    Label       Input
    Label       Input

Це зручно для desktop forms.

---

# 82. Form responsive

Desktop:

    .form {
        display: grid;
        grid-template-columns: 150px 1fr;
    }

Mobile:

    @media (max-width: 600px) {
        .form {
            grid-template-columns: 1fr;
        }
    }

---

# 83. Grid і `box-sizing`

Як і в інших layout models, корисно використовувати:

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

Це робить розрахунок width/height більш передбачуваним.

---

# 84. Grid і `min-width: 0`

Grid item також може створювати небажаний overflow.

У таких випадках корисно:

    .content {
        min-width: 0;
    }

Особливо якщо всередині:

- довгі URL;
- `white-space: nowrap`;
- великі images;
- code blocks;
- nested layout.

---

# 85. `1fr` не означає "завжди без overflow"

Поширена помилка:

    grid-template-columns: 1fr 1fr;

і очікування, що все автоматично поміститься.

Дуже довгий unbreakable content може впливати на мінімальний розмір track.

У складних випадках:

    grid-template-columns:
        minmax(0, 1fr) minmax(0, 1fr);

може бути кориснішим.

---

# 86. minmax(0, 1fr)

Наприклад:

    .layout {
        display: grid;
        grid-template-columns:
            240px minmax(0, 1fr);
    }

Це означає:

    content column
        minimum = 0
        maximum = 1fr

Такий запис часто допомагає уникати overflow у складних layouts.

---

# 87. Grid і довгі слова

Можна додатково:

    .content {
        overflow-wrap: anywhere;
    }

Це дозволяє переносити довгі URL та інші unbreakable strings.

---

# 88. Grid і великі images

Для responsive images:

    img {
        max-width: 100%;
        height: auto;
    }

А в gallery часто:

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

---

# 89. `object-fit` у Grid

Grid визначає layout.

А:

    object-fit

визначає, як image вписується в задані dimensions.

Наприклад:

    .card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

---

# 90. Grid і aspect-ratio

Для однакових пропорцій:

    .card__image {
        aspect-ratio: 16 / 9;
        width: 100%;
        object-fit: cover;
    }

Це добре працює разом із Grid.

---

# 91. Responsive card grid

Практичний сучасний pattern:

    .cards {
        display: grid;
        grid-template-columns:
            repeat(auto-fit, minmax(280px, 1fr));
        gap: 24px;
    }

Це часто достатньо без media queries.

---

# 92. Grid vs Flexbox

Flexbox:

    one-dimensional

Grid:

    two-dimensional

Flexbox:

    [ A ] [ B ] [ C ]

Grid:

    [ A ] [ B ] [ C ]
    [ D ] [ E ] [ F ]

Але це не означає:

> Flexbox тільки для рядків, Grid тільки для таблиць.

Обидві моделі можуть вирішувати багато задач.

---

# 93. Коли використовувати Grid

Grid особливо хороший, коли layout має:

- rows + columns;
- fixed page regions;
- dashboard;
- card matrix;
- explicit tracks;
- named areas;
- двовимірне вирівнювання.

---

# 94. Коли використовувати Flexbox

Flexbox часто краще, коли потрібно:

- розкласти елементи в один рядок;
- створити vertical stack;
- вирівняти кнопки;
- створити toolbar;
- створити navigation;
- керувати вільним простором уздовж однієї осі.

---

# 95. Grid не замінює Flexbox

Не потрібно вибирати:

    Grid або Flexbox назавжди.

У реальному UI:

    Page
      ↓
    Grid
      ↓
    Card
      ↓
    Flexbox
      ↓
    Button group

Це нормальна і дуже поширена архітектура.

---

# 96. Практичний page layout

HTML:

    <div class="page">
        <header class="header">
            Header
        </header>

        <aside class="sidebar">
            Sidebar
        </aside>

        <main class="content">
            Content
        </main>

        <footer class="footer">
            Footer
        </footer>
    </div>

CSS:

    .page {
        display: grid;
        grid-template-columns: 240px 1fr;
        grid-template-rows: auto 1fr auto;
    }

---

# 97. Page layout з grid areas

CSS:

    .page {
        display: grid;
        grid-template-columns: 240px 1fr;

        grid-template-areas:
            "header header"
            "sidebar content"
            "footer footer";
    }

    .header {
        grid-area: header;
    }

    .sidebar {
        grid-area: sidebar;
    }

    .content {
        grid-area: content;
    }

    .footer {
        grid-area: footer;
    }

Це часто читабельніше, ніж велика кількість line numbers.

---

# 98. Responsive page layout

    .page {
        display: grid;
        grid-template-columns: 240px 1fr;

        grid-template-areas:
            "header header"
            "sidebar content"
            "footer footer";
    }

    @media (max-width: 768px) {
        .page {
            grid-template-columns: 1fr;

            grid-template-areas:
                "header"
                "content"
                "sidebar"
                "footer";
        }
    }

---

# 99. Grid і `order`

На відміну від Flexbox, для Grid краще керувати placement через:

    grid-column
    grid-row
    grid-area

а не намагатися імітувати layout через `order`.

Логічний DOM-порядок все одно повинен залишатися правильним.

---

# 100. Named lines

Grid lines можна називати.

Наприклад:

    .layout {
        display: grid;
        grid-template-columns:
            [sidebar-start] 240px
            [sidebar-end content-start] 1fr
            [content-end];
    }

Потім:

    .content {
        grid-column: content-start / content-end;
    }

Це advanced feature.

---

# 101. Named lines vs grid areas

Named lines:

    grid-column: content-start / content-end;

Named areas:

    grid-area: content;

Для складних page layouts `grid-template-areas` часто читабельніший.

Named lines корисніші в reusable design systems та складних grids.

---

# 102. Subgrid

Сучасний CSS Grid підтримує:

    subgrid

Він дозволяє дочірньому grid використовувати tracks батьківського grid.

Наприклад:

    .card {
        display: grid;
        grid-template-rows: subgrid;
    }

Це advanced можливість.

Особливо корисна, коли кілька компонентів повинні вирівнювати внутрішні елементи по спільних tracks.

---

# 103. Приклад subgrid

Наприклад, cards повинні мати однакове вирівнювання:

    .cards {
        display: grid;
        grid-template-columns:
            repeat(3, 1fr);
    }

    .card {
        display: grid;
        grid-template-rows: subgrid;
    }

Це дозволяє дочірнім cards використовувати tracks батьківського grid.

---

# 104. `display: inline-grid`

Як і Flexbox, Grid має:

    display: grid;

та:

    display: inline-grid;

`inline-grid` створює inline-level grid container.

Внутрішній layout все одно Grid.

---

# 105. Grid debugging

У DevTools можна побачити:

- grid container;
- grid lines;
- numbers;
- areas;
- tracks;
- gaps;
- placement.

Для навчання Grid DevTools особливо корисний.

---

# 106. Типові помилки

### ❌ Плутати Grid lines і columns

Якщо:

    grid-template-columns: repeat(3, 1fr);

це:

    3 columns

але:

    4 vertical grid lines.


### ❌ Використовувати `margin` замість `gap`

Краще:

    gap: 20px;


### ❌ Робити складний layout через абсолютне позиціонування

Не варто будувати звичайну grid структуру через:

    position: absolute;

Краще:

    display: grid;


### ❌ Не враховувати overflow

Проблемний layout:

    grid-template-columns: 240px 1fr;

У складному content може знадобитися:

    grid-template-columns:
        240px minmax(0, 1fr);


### ❌ Плутати `justify-items` і `justify-content`

`justify-items`:

    item всередині cell

`justify-content`:

    весь grid всередині container


### ❌ Плутати `align-items` і `align-content`

`align-items`:

    items всередині cells

`align-content`:

    весь grid всередині container.


### ❌ Зловживати fixed widths

Наприклад:

    grid-template-columns:
        400px 400px 400px;

може створити overflow на маленькому екрані.

Часто краще:

    repeat(auto-fit, minmax(250px, 1fr))


# Питання зі співбесіди

## 🟢 Junior

### 1. Що таке CSS Grid?

CSS Grid — двовимірна layout-модель CSS для роботи з rows та columns.

### 2. Як увімкнути Grid?

    .container {
        display: grid;
    }

### 3. Що таке grid container?

Елемент із:

    display: grid;

### 4. Що таке grid item?

Пряма дитина grid container.

### 5. Для чого `grid-template-columns`?

Для визначення колонок grid.

### 6. Для чого `grid-template-rows`?

Для визначення rows grid.

### 7. Що таке `fr`?

Fraction — частка доступного простору.

### 8. Що робить `repeat()`?

Дозволяє повторювати tracks.

### 9. Що робить `gap`?

Визначає відстань між rows та columns.

### 10. Що робить `grid-column`?

Визначає placement item по колонках.

### 11. Що робить `grid-row`?

Визначає placement item по rows.

### 12. Що означає:

    grid-column: 1 / -1;

Item займає grid від першої до останньої vertical line.

### 13. Що означає:

    grid-column: span 2;

Item займає дві колонки.

### 14. Що таке `grid-template-areas`?

Механізм для створення іменованих областей grid.

### 15. Що таке `minmax()`?

Функція, яка задає мінімальний та максимальний розмір track.


## 🔵 Junior+

### 16. Що таке explicit grid?

Tracks, явно задані через:

    grid-template-columns
    grid-template-rows

### 17. Що таке implicit grid?

Tracks, які Grid створює автоматично, коли наявних explicit tracks недостатньо.

### 18. Для чого `grid-auto-rows`?

Для визначення розміру автоматично створених rows.

### 19. Для чого `grid-auto-flow`?

Для керування алгоритмом автоматичного розміщення items.

### 20. Різниця між `auto-fit` та `auto-fill`?

Обидва використовуються з повторюваними tracks.

Спрощено:

    auto-fit
        → порожні tracks можуть схлопуватися

    auto-fill
        → tracks можуть залишатися зарезервованими

### 21. Як створити responsive card grid?

    .cards {
        display: grid;
        grid-template-columns:
            repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }

### 22. Різниця між `justify-items` і `justify-content`?

    justify-items
        → items всередині cells

    justify-content
        → grid всередині container

### 23. Різниця між `align-items` і `align-content`?

    align-items
        → items всередині cells

    align-content
        → grid всередині container


## 🟠 Middle

### 24. Чому `1fr` може створювати overflow?

Через intrinsic minimum sizes та великий/нерозривний content.

У складних випадках:

    minmax(0, 1fr)

може дозволити track стискатися до `0`.

### 25. Для чого:

    minmax(0, 1fr)

Це дозволяє track мати:

    minimum = 0
    maximum = 1fr

і часто допомагає контролювати overflow.

### 26. Що таке grid line?

Лінія, яка обмежує tracks.

### 27. Що таке grid track?

Окремий row або column track.

### 28. Що таке grid area?

Прямокутна область, яка може містити одну або декілька cells.

### 29. Що таке implicit track?

Track, автоматично створений Grid.

### 30. Для чого `grid-auto-flow: dense`?

Для більш щільного заповнення доступних grid cells.

### 31. Коли Grid кращий за Flexbox?

Коли layout потребує явного контролю одночасно над rows і columns.

### 32. Чи можна використовувати Grid і Flexbox разом?

Так.

Наприклад:

    .cards {
        display: grid;
    }

    .card {
        display: flex;
    }

Це дуже поширена практика.

### 33. Що таке `subgrid`?

Механізм, який дозволяє дочірньому grid використовувати tracks батьківського grid.


## 🔴 Senior

### 34. Як працює алгоритм track sizing?

Потрібно розуміти:

- intrinsic sizes;
- min/max constraints;
- base sizes;
- growth limits;
- flexible tracks;
- free space;
- `fr`;
- `minmax()`.

### 35. Що таке intrinsic sizing?

Розмір, який залежить від content та його природних обмежень.

Важливо для розуміння поведінки:

    auto
    min-content
    max-content
    fit-content()
    minmax()

### 36. Що таке `min-content`?

Приблизно найменший розмір, до якого content може бути стиснений без неприйнятного порушення правил переносу.

### 37. Що таке `max-content`?

Розмір, необхідний content для відображення без додаткового перенесення, наскільки це дозволяє контекст.

### 38. Для чого `subgrid`?

Для узгодження внутрішніх tracks дочірніх компонентів із tracks батьківського grid.

### 39. Коли використовувати named lines?

Коли потрібна точна та повторно використовувана placement-система в складному grid.

### 40. Коли використовувати named areas?

Коли важлива читабельність page layout та явна структура областей.

---

# Практичні завдання

## Завдання 1 — Три колонки

Створи:

    [ A ] [ B ] [ C ]

Використай:

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;


## Завдання 2 — Sidebar

Створи:

    [ Sidebar ] [ Content ]

Sidebar:

    240px

Content:

    flexible

Використай:

    grid-template-columns: 240px 1fr;


## Завдання 3 — Four cards

Створи:

    [ A ] [ B ] [ C ] [ D ]
    [ E ] [ F ] [ G ] [ H ]

Використай:

    grid-template-columns: repeat(4, 1fr);


## Завдання 4 — Featured card

Створи grid із 4 колонок.

Одна card повинна займати:

    2 columns
    2 rows

Використай:

    grid-column: span 2;
    grid-row: span 2;


## Завдання 5 — Full-width header

Створи 4-column grid.

Header повинен займати всю ширину.

Використай:

    grid-column: 1 / -1;


## Завдання 6 — Responsive cards

Створи grid:

    repeat(auto-fit, minmax(250px, 1fr))

Перевір його на різній ширині viewport.


## Завдання 7 — Page layout

Створи:

    ┌────────────────────────────┐
    │           Header           │
    ├──────────┬─────────────────┤
    │ Sidebar  │     Content     │
    ├──────────┴─────────────────┤
    │           Footer           │
    └────────────────────────────┘

Використай:

    grid-template-areas;


## Завдання 8 — Responsive page

Desktop:

    Header
    Sidebar | Content
    Footer

Mobile:

    Header
    Content
    Sidebar
    Footer

Зміни layout через:

    @media

і:

    grid-template-areas;


## Завдання 9 — Form

Створи:

    Label       Input
    Label       Input
    Label       Input

Використай:

    grid-template-columns: 150px 1fr;


## Завдання 10 — Gallery

Створи:

    [ A ][ B ][ C ][ D ]
    [ E ][ F ][ G ][ H ]

Зроби одну картинку великою:

    grid-column: span 2;
    grid-row: span 2;


# Grid patterns, які потрібно знати

## Pattern 1 — Equal columns

    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }


## Pattern 2 — Sidebar + content

    .layout {
        display: grid;
        grid-template-columns: 240px 1fr;
        gap: 24px;
    }


## Pattern 3 — Responsive cards

    .cards {
        display: grid;
        grid-template-columns:
            repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }


## Pattern 4 — Full width

    .item {
        grid-column: 1 / -1;
    }


## Pattern 5 — Featured item

    .featured {
        grid-column: span 2;
        grid-row: span 2;
    }


## Pattern 6 — Page areas

    .page {
        display: grid;

        grid-template-areas:
            "header header"
            "sidebar content"
            "footer footer";
    }


## Pattern 7 — Responsive areas

    .page {
        display: grid;
        grid-template-columns: 240px 1fr;

        grid-template-areas:
            "header header"
            "sidebar content"
            "footer footer";
    }

    @media (max-width: 768px) {
        .page {
            grid-template-columns: 1fr;

            grid-template-areas:
                "header"
                "content"
                "sidebar"
                "footer";
        }
    }


## Pattern 8 — Safe flexible content

    .layout {
        display: grid;
        grid-template-columns:
            240px minmax(0, 1fr);
    }


## Pattern 9 — Center items

    .grid {
        display: grid;
        place-items: center;
    }


## Pattern 10 — Flexible rows

    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: minmax(100px, auto);
    }


# Шлях

## 🟢 Core — обов'язково знати

Ти повинен впевнено знати:

- `display: grid`;
- grid container;
- grid item;
- rows;
- columns;
- grid lines;
- grid tracks;
- grid cells;
- `grid-template-columns`;
- `grid-template-rows`;
- `gap`;
- `fr`;
- `repeat()`;
- `grid-column`;
- `grid-row`;
- `span`;
- `grid-column: 1 / -1`;
- `grid-template-areas`;
- `grid-area`;
- `minmax()`;
- `auto-fit`;
- `auto-fill`;
- `justify-items`;
- `align-items`;
- `place-items`;
- Grid vs Flexbox.


## 🔵 Junior

Потрібно вміти:

- створити 2–4 колонки;
- створити sidebar + content;
- створити responsive card grid;
- використовувати `gap`;
- використовувати `fr`;
- використовувати `repeat()`;
- використовувати `minmax()`;
- використовувати `auto-fit`;
- використовувати `grid-column`;
- використовувати `grid-row`;
- використовувати `span`;
- створювати full-width items;
- використовувати `grid-template-areas`;
- будувати responsive layouts;
- комбінувати Grid і Flexbox;
- знаходити overflow у Grid;
- використовувати `minmax(0, 1fr)`.


## 🟠 Middle

Потрібно добре розуміти:

- explicit grid;
- implicit grid;
- `grid-auto-rows`;
- `grid-auto-columns`;
- `grid-auto-flow`;
- `dense`;
- intrinsic sizing;
- `min-content`;
- `max-content`;
- `fit-content()`;
- `minmax()`;
- automatic placement;
- alignment;
- named lines;
- named areas;
- Grid + Flexbox;
- Grid + absolute positioning;
- overflow;
- `min-width: 0`;
- `subgrid`;
- responsive grid architecture.


## 🔴 Senior

Варто глибоко розуміти:

- CSS Grid specification;
- track sizing algorithm;
- intrinsic sizing;
- min-content contribution;
- max-content contribution;
- flexible tracks;
- `fr` sizing;
- explicit vs implicit grid;
- auto-placement algorithm;
- dense packing;
- named lines;
- named areas;
- subgrid;
- masonry-related modern layout developments;
- writing modes;
- logical properties;
- accessibility;
- DOM order;
- interaction Grid + Flexbox;
- performance;
- browser interoperability;
- design-system grid architecture.


# Міні-шпаргалка

## Увімкнути Grid

    .grid {
        display: grid;
    }


## Три однакові колонки

    .grid {
        grid-template-columns: repeat(3, 1fr);
    }


## Sidebar + content

    .layout {
        grid-template-columns: 240px 1fr;
    }


## Дві однакові колонки

    .grid {
        grid-template-columns: 1fr 1fr;
    }


## Gap

    .grid {
        gap: 20px;
    }


## Row gap

    .grid {
        row-gap: 20px;
    }


## Column gap

    .grid {
        column-gap: 20px;
    }


## Item на всю ширину

    .item {
        grid-column: 1 / -1;
    }


## Item на дві колонки

    .item {
        grid-column: span 2;
    }


## Item на дві rows

    .item {
        grid-row: span 2;
    }


## Responsive grid

    .grid {
        display: grid;
        grid-template-columns:
            repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }


## Безпечний flexible column

    .grid {
        grid-template-columns:
            240px minmax(0, 1fr);
    }


## Center item

    .grid {
        place-items: center;
    }


## Grid areas

    .layout {
        display: grid;

        grid-template-areas:
            "header header"
            "sidebar content"
            "footer footer";
    }


## Assign areas

    .header {
        grid-area: header;
    }

    .sidebar {
        grid-area: sidebar;
    }

    .content {
        grid-area: content;
    }

    .footer {
        grid-area: footer;
    }


## Implicit rows

    .grid {
        grid-auto-rows: minmax(100px, auto);
    }


## Auto placement

    .grid {
        grid-auto-flow: row;
    }


## Dense placement

    .grid {
        grid-auto-flow: dense;
    }


# Головне

Запам'ятай не окремі властивості, а систему.

    display: grid
        ↓
    grid container
        ↓
    ┌────────┬────────┬────────┐
    │        │        │        │
    │ item   │ item   │ item   │
    │        │        │        │
    ├────────┼────────┼────────┤
    │        │        │        │
    │ item   │ item   │ item   │
    │        │        │        │
    └────────┴────────┴────────┘

Спочатку визначаємо:

    columns
    rows

через:

    grid-template-columns
    grid-template-rows

Потім визначаємо:

    gap

Для flexible sizing:

    fr

Для повторення:

    repeat()

Для responsive tracks:

    minmax()

Для автоматичного responsive grid:

    repeat(
        auto-fit,
        minmax(250px, 1fr)
    )

Для розміщення item:

    grid-column
    grid-row

Для зайняття декількох tracks:

    span

Для повної ширини:

    grid-column: 1 / -1;

Для named layout:

    grid-template-areas
    grid-area

Для автоматично створених tracks:

    grid-auto-rows
    grid-auto-columns
    grid-auto-flow

Для вирівнювання item:

    justify-items
    align-items
    place-items

Для вирівнювання всього grid:

    justify-content
    align-content
    place-content


Головна різниця:

    Flexbox
        ↓
    one-dimensional layout

    Grid
        ↓
    two-dimensional layout


Тому хороший практичний підхід:

    Page
      ↓
    Grid
      ↓
    Sections
      ↓
    Flexbox
      ↓
    Component content


Наприклад:

    .page {
        display: grid;
        grid-template-columns:
            240px minmax(0, 1fr);
        gap: 24px;
    }

    .card {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

Тут:

    Grid
        → відповідає за page layout

    Flexbox
        → відповідає за layout всередині card


Найважливіший responsive pattern:

    .cards {
        display: grid;
        grid-template-columns:
            repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }

Він дозволяє побудувати responsive card grid із мінімальною кількістю CSS.

І головне правило:

> Grid — коли тобі потрібно мислити rows + columns.

> Flexbox — коли тобі потрібно мислити однією основною віссю.

У реальному frontend-проєкті вони не конкурують.

Вони доповнюють один одного.