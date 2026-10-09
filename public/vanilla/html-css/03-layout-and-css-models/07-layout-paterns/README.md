# 07. Layout Patterns

Layout patterns — це типові способи побудови структури веб-сторінки за допомогою CSS.

Вони допомагають перетворити окремі CSS-властивості:

    display
    flex
    grid
    position
    gap
    width
    height
    margin
    padding
    media queries

у готові практичні layout-рішення.

Layout pattern — це не окрема CSS-технологія.

Це повторюваний спосіб організації елементів.

Наприклад:

    Header
        ↓
    Navigation
        ↓
    Main content
        ↓
    Sidebar
        ↓
    Footer

можна реалізувати за допомогою:

    normal flow
    Flexbox
    Grid

---

# Основна ідея

CSS layout можна розглядати на декількох рівнях:

    Page
      ↓
    Sections
      ↓
    Components
      ↓
    Content

Наприклад:

    Page
      │
      ├── Header
      │     └── Navigation
      │
      ├── Main
      │     ├── Hero
      │     ├── Cards
      │     └── Content
      │
      └── Footer

На кожному рівні може використовуватися інша layout model.

Наприклад:

    Grid → page
    Flexbox → header
    Grid → cards
    Flexbox → card content

---

# Ключові поняття

✔ layout  
✔ layout pattern  
✔ page layout  
✔ container  
✔ wrapper  
✔ section  
✔ component  
✔ normal flow  
✔ Flexbox  
✔ Grid  
✔ positioning  
✔ header  
✔ navigation  
✔ main content  
✔ sidebar  
✔ footer  
✔ hero section  
✔ card layout  
✔ card grid  
✔ gallery  
✔ dashboard  
✔ two-column layout  
✔ three-column layout  
✔ Holy Grail layout  
✔ split layout  
✔ centered container  
✔ full-width section  
✔ responsive layout  
✔ mobile-first  
✔ max-width  
✔ fluid layout  
✔ fixed layout  
✔ sticky sidebar  
✔ responsive navigation  
✔ spacing system  
✔ layout composition  
✔ breakpoint  
✔ intrinsic sizing  
✔ content width  
✔ viewport  
✔ wrapper  
✔ stacking context  

---

# Що потрібно пам'ятати

• Layout pattern — це типовий спосіб організації елементів.

• Один layout pattern можна реалізувати різними CSS-технологіями.

• `normal flow` повинен залишатися базовою моделлю, коли спеціальне позиціонування не потрібне.

• Flexbox добре підходить для компонентів та одномірних layout-задач.

• Grid добре підходить для двовимірних layout-задач.

• `max-width` часто використовується для обмеження ширини основного контенту.

• `margin-inline: auto` часто використовується для горизонтального центрування container.

• Responsive layout повинен адаптуватися до ширини viewport.

• Mobile-first означає починати layout із малого viewport та поступово додавати можливості для більших екранів.

• Layout не повинен залежати від великої кількості "magic numbers".

• Не потрібно використовувати `position: absolute` для основного layout, якщо задачу можна вирішити normal flow, Flexbox або Grid.

• Layout та visual styling — різні задачі.

---

# Normal Flow

Normal flow — стандартний спосіб розміщення HTML-елементів без спеціального layout positioning.

Наприклад:

    <main>
        <h1>Title</h1>
        <p>Text</p>
        <p>Another text</p>
    </main>

Браузер розміщує елементи відповідно до їхнього типу та CSS.

Block elements зазвичай розташовуються один під одним:

    [Block 1]
    [Block 2]
    [Block 3]

Normal flow є фундаментом CSS layout.

---

# Не потрібно все позиціонувати

Поганий підхід:

    position: absolute;

для кожного елемента.

Краще:

    normal flow
        ↓
    Flexbox / Grid
        ↓
    position
    тільки коли справді потрібно

---

# Container Pattern

Один із найважливіших layout patterns — центральний container.

HTML:

    <main class="container">
        <h1>Page title</h1>
        <p>Content...</p>
    </main>

CSS:

    .container {
        width: 100%;
        max-width: 1200px;
        margin-inline: auto;
        padding-inline: 24px;
    }

Логіка:

    viewport
    ┌───────────────────────────────────────────┐
    │                                           │
    │       ┌───────────────────────────┐       │
    │       │         container         │       │
    │       │                           │       │
    │       │         content           │       │
    │       │                           │       │
    │       └───────────────────────────┘       │
    │                                           │
    └───────────────────────────────────────────┘

---

# max-width Container

`max-width` обмежує максимальну ширину content area.

    .container {
        width: 100%;
        max-width: 1200px;
        margin-inline: auto;
    }

На маленькому екрані:

    width: 100%

На великому:

    width ≤ 1200px

Це дозволяє уникати надто довгих рядків тексту.

---

# margin-inline: auto

Для горизонтального центрування:

    .container {
        max-width: 1200px;
        margin-inline: auto;
    }

Еквівалентна ідея для LTR/RTL-aware layout:

    margin-left: auto;
    margin-right: auto;

Але:

    margin-inline: auto;

є сучаснішим logical property.

---

# Container + Padding

Часто container має horizontal padding:

    .container {
        width: 100%;
        max-width: 1200px;
        margin-inline: auto;
        padding-inline: 24px;
    }

Це створює внутрішній простір:

    viewport
    ┌────────────────────────────────────┐
    │  ← padding →                       │
    │    ┌──────────────────────────┐    │
    │    │        content           │    │
    │    └──────────────────────────┘    │
    │                       ← padding →  │
    └────────────────────────────────────┘

---

# Box Sizing

Для передбачуваного layout часто використовують:

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

Тоді:

    width

включає:

    content
    padding
    border

Це значно спрощує розрахунок розмірів.

---

# Full Width Section + Container

Дуже поширений pattern:

    <section class="section">
        <div class="container">
            ...
        </div>
    </section>

CSS:

    .section {
        width: 100%;
    }

    .container {
        width: 100%;
        max-width: 1200px;
        margin-inline: auto;
        padding-inline: 24px;
    }

Тут:

    section
        → full width

    container
        → limited content width

Це дозволяє мати full-width background, але обмежений content.

---

# Full Width Background

Наприклад:

    .hero {
        background: #eee;
    }

    .hero__container {
        max-width: 1200px;
        margin-inline: auto;
        padding: 64px 24px;
    }

Візуально:

    ┌───────────────────────────────────────────┐
    │                 HERO                      │
    │       ┌─────────────────────────┐         │
    │       │       content           │         │
    │       └─────────────────────────┘         │
    └───────────────────────────────────────────┘

Background займає всю ширину.

Content має максимальну ширину.

---

# Header Pattern

Типовий header:

    <header class="header">
        <div class="container header__inner">
            ...
        </div>
    </header>

CSS:

    .header__inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
    }

Структура:

    [LOGO]                 [NAV] [BUTTON]

Flexbox добре підходить для header content.

---

# Navigation Pattern

HTML:

    <nav class="nav">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Blog</a>
        <a href="#">Contact</a>
    </nav>

CSS:

    .nav {
        display: flex;
        align-items: center;
        gap: 24px;
    }

Основний pattern:

    navigation
        ↓
    flex container
        ↓
    links
        ↓
    gap

---

# Navigation with Space Between

Наприклад:

    .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

Може використовуватися для:

    [LOGO]                    [NAV]

Але якщо header має складнішу структуру, краще створити окремий wrapper:

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

---

# Header with Three Areas

Наприклад:

    [LOGO]       [NAVIGATION]       [ACTIONS]

HTML:

    <header class="header">
        <a class="logo" href="/">Logo</a>

        <nav class="nav">
            ...
        </nav>

        <div class="actions">
            ...
        </div>
    </header>

CSS:

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
    }

---

# Hero Pattern

Hero — велика вступна секція сторінки.

Типова структура:

    <section class="hero">
        <div class="container hero__inner">
            <div class="hero__content">
                <h1>Title</h1>
                <p>Description</p>

                <div class="hero__actions">
                    <a href="#">Get started</a>
                    <a href="#">Learn more</a>
                </div>
            </div>

            <div class="hero__media">
                ...
            </div>
        </div>
    </section>

---

# Hero: Two Columns

Для hero з текстом та image:

    .hero__inner {
        display: grid;
        grid-template-columns:
            1fr 1fr;
        gap: 48px;
        align-items: center;
    }

Отримуємо:

    ┌──────────────────┬──────────────────┐
    │                  │                  │
    │      content     │      image       │
    │                  │                  │
    └──────────────────┴──────────────────┘

Grid добре підходить для такого двовимірного layout.

---

# Hero Responsive

Desktop:

    [CONTENT] [IMAGE]

Mobile:

    [CONTENT]
    [IMAGE]

CSS:

    .hero__inner {
        display: grid;
        grid-template-columns:
            1fr 1fr;
        gap: 40px;
    }

    @media (max-width: 768px) {
        .hero__inner {
            grid-template-columns: 1fr;
        }
    }

---

# Two Column Layout

Класичний layout:

    ┌──────────────────┬──────────────────┐
    │                  │                  │
    │     main         │     sidebar      │
    │                  │                  │
    └──────────────────┴──────────────────┘

CSS:

    .layout {
        display: grid;
        grid-template-columns:
            minmax(0, 1fr) 300px;
        gap: 32px;
    }

---

# Why minmax(0, 1fr)?

У grid layouts інколи content може бути ширшим за очікуване.

Pattern:

    grid-template-columns:
        minmax(0, 1fr) 300px;

означає:

    main:
        minimum = 0
        maximum = 1fr

    sidebar:
        300px

Це корисний pattern для content areas, де потрібно уникати overflow через довгий контент.

---

# Main + Sidebar

HTML:

    <div class="layout">
        <main class="content">
            ...
        </main>

        <aside class="sidebar">
            ...
        </aside>
    </div>

CSS:

    .layout {
        display: grid;
        grid-template-columns:
            minmax(0, 1fr) 300px;
        gap: 32px;
    }

---

# Responsive Main + Sidebar

Desktop:

    [MAIN CONTENT] [SIDEBAR]

Mobile:

    [MAIN CONTENT]
    [SIDEBAR]

CSS:

    .layout {
        display: grid;
        grid-template-columns:
            minmax(0, 1fr) 300px;
        gap: 32px;
    }

    @media (max-width: 768px) {
        .layout {
            grid-template-columns: 1fr;
        }
    }

---

# Sidebar + Main

Порядок можна змінити:

    .layout {
        display: grid;
        grid-template-columns:
            280px minmax(0, 1fr);
        gap: 32px;
    }

Отримаємо:

    [SIDEBAR] [MAIN]

Це типовий pattern для:

    admin panels
    documentation
    dashboards
    blogs
    LMS
    settings pages

---

# Three Column Layout

Наприклад:

    ┌──────────────┬──────────────────┬──────────────┐
    │   sidebar    │      main        │    aside     │
    └──────────────┴──────────────────┴──────────────┘

CSS:

    .layout {
        display: grid;
        grid-template-columns:
            240px
            minmax(0, 1fr)
            240px;
        gap: 24px;
    }

---

# Responsive Three Columns

Desktop:

    [SIDE] [MAIN] [ASIDE]

Tablet:

    [SIDE] [MAIN]

Mobile:

    [MAIN]
    [SIDE]
    [ASIDE]

Наприклад:

    .layout {
        display: grid;
        grid-template-columns:
            240px
            minmax(0, 1fr)
            240px;
        gap: 24px;
    }

    @media (max-width: 1024px) {
        .layout {
            grid-template-columns:
                200px minmax(0, 1fr);
        }
    }

    @media (max-width: 768px) {
        .layout {
            grid-template-columns: 1fr;
        }
    }

---

# Holy Grail Layout

Holy Grail layout — класичний веб-layout:

    ┌──────────────────────────────┐
    │            Header            │
    ├────────┬────────────┬────────┤
    │        │            │        │
    │ left   │    main    │ right  │
    │        │            │        │
    ├────────┴────────────┴────────┤
    │            Footer            │
    └──────────────────────────────┘

Сучасний Grid варіант:

    .page {
        display: grid;

        grid-template-columns:
            200px
            minmax(0, 1fr)
            200px;

        grid-template-rows:
            auto
            1fr
            auto;

        min-height: 100vh;
    }

---

# Holy Grail with Grid Areas

Ще зрозуміліше:

    .page {
        display: grid;

        grid-template-areas:
            "header header header"
            "left main right"
            "footer footer footer";

        grid-template-columns:
            200px
            minmax(0, 1fr)
            200px;

        grid-template-rows:
            auto
            1fr
            auto;

        min-height: 100vh;
    }

Потім:

    .header {
        grid-area: header;
    }

    .left {
        grid-area: left;
    }

    .main {
        grid-area: main;
    }

    .right {
        grid-area: right;
    }

    .footer {
        grid-area: footer;
    }

---

# Header / Main / Footer

Один із найпоширеніших patterns:

    ┌──────────────────────────┐
    │          Header          │
    ├──────────────────────────┤
    │                          │
    │           Main           │
    │                          │
    ├──────────────────────────┤
    │          Footer          │
    └──────────────────────────┘

CSS:

    .page {
        min-height: 100vh;
        display: grid;
        grid-template-rows:
            auto 1fr auto;
    }

Це дозволяє main займати доступний простір.

---

# Sticky Footer Pattern

Мета:

    Footer
        ↓
    внизу viewport,
    якщо контенту мало

Можна використати:

    .page {
        min-height: 100vh;
        display: grid;
        grid-template-rows:
            auto 1fr auto;
    }

Структура:

    Header
       ↓
    Main
       ↓
    Footer

`1fr` дає main доступний простір.

---

# Card Pattern

Типова картка:

    ┌──────────────────────┐
    │        image         │
    ├──────────────────────┤
    │ title                │
    │ description          │
    │                      │
    │ [button]             │
    └──────────────────────┘

CSS:

    .card {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 24px;
    }

---

# Card with Button at Bottom

Якщо потрібно притиснути button донизу:

    .card {
        display: flex;
        flex-direction: column;
        min-height: 100%;
    }

    .card__actions {
        margin-top: auto;
    }

Структура:

    title
       ↓
    description
       ↓
    flexible space
       ↓
    button

Це дуже корисний Flexbox pattern.

---

# Equal Height Cards

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
        height: 100%;
    }

Тоді cards у grid можуть мати однакову висоту рядка.

---

# Responsive Card Grid

Один із найкорисніших patterns:

    .cards {
        display: grid;

        grid-template-columns:
            repeat(
                auto-fit,
                minmax(250px, 1fr)
            );

        gap: 24px;
    }

Він дозволяє browser автоматично змінювати кількість колонок.

---

# Product Grid

Типовий ecommerce pattern:

    .products {
        display: grid;

        grid-template-columns:
            repeat(
                auto-fit,
                minmax(220px, 1fr)
            );

        gap: 24px;
    }

Схематично:

    Desktop:

    [1] [2] [3] [4]

    Tablet:

    [1] [2] [3]

    Mobile:

    [1] [2]

    або:

    [1]
    [2]

залежно від доступної ширини.

---

# Gallery Pattern

Gallery:

    .gallery {
        display: grid;
        grid-template-columns:
            repeat(
                auto-fit,
                minmax(200px, 1fr)
            );
        gap: 16px;
    }

---

# Gallery with Different Sizes

Grid може створювати складнішу композицію:

    .featured {
        grid-column: span 2;
        grid-row: span 2;
    }

Наприклад:

    ┌──────────────────┬───────┐
    │                  │   2   │
    │        1         ├───────┤
    │                  │   3   │
    ├────────┬─────────┴───────┤
    │   4    │       5         │
    └────────┴─────────────────┘

Це сильна сторона Grid.

---

# Dashboard Pattern

Dashboard часто будується через Grid:

    .dashboard {
        display: grid;
        grid-template-columns:
            repeat(12, 1fr);
        gap: 24px;
    }

Окремі widgets можуть займати різну кількість columns:

    .widget-large {
        grid-column: span 8;
    }

    .widget-small {
        grid-column: span 4;
    }

---

# Dashboard Responsive

Desktop:

    [        widget 1        ][widget 2]
    [widget 3][widget 4][widget 5][widget 6]

На мобільному:

    [widget 1]
    [widget 2]
    [widget 3]
    [widget 4]

Для цього можна змінювати:

    grid-template-columns

та:

    grid-column

у media queries.

---

# Sidebar Navigation Pattern

Типовий layout:

    ┌────────────┬────────────────────┐
    │            │                    │
    │  sidebar   │       main         │
    │            │                    │
    │  nav       │      content       │
    │            │                    │
    └────────────┴────────────────────┘

CSS:

    .layout {
        display: grid;
        grid-template-columns:
            240px minmax(0, 1fr);
        min-height: 100vh;
    }

---

# Sticky Sidebar

Якщо sidebar повинен залишатися видимим при scrolling:

    .sidebar {
        position: sticky;
        top: 24px;
        align-self: start;
    }

Важливо:

    position: sticky

не є заміною Grid.

Часто структура:

    Grid
        ↓
    sidebar + main

і всередині:

    position: sticky
        ↓
    sticky sidebar

---

# Split Layout

Split layout — дві великі області поруч.

Наприклад:

    [IMAGE] [CONTENT]

CSS:

    .split {
        display: grid;
        grid-template-columns:
            1fr 1fr;
        gap: 48px;
        align-items: center;
    }

Типові випадки:

    hero
    landing page
    about section
    product section
    feature section

---

# Split Layout Responsive

Desktop:

    [IMAGE] [CONTENT]

Mobile:

    [IMAGE]
    [CONTENT]

CSS:

    .split {
        display: grid;
        grid-template-columns:
            repeat(2, minmax(0, 1fr));
        gap: 40px;
    }

    @media (max-width: 768px) {
        .split {
            grid-template-columns: 1fr;
        }
    }

---

# Media + Text

Типовий section:

    <section class="feature">
        <div class="feature__media">
            ...
        </div>

        <div class="feature__content">
            <h2>Title</h2>
            <p>Text</p>
        </div>
    </section>

CSS:

    .feature {
        display: grid;
        grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 1fr);
        gap: 48px;
        align-items: center;
    }

---

# Stack Pattern

Stack — вертикальне розташування елементів із контрольованим spacing.

Flexbox:

    .stack {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

Або Grid:

    .stack {
        display: grid;
        gap: 16px;
    }

Наприклад:

    [Title]
       ↓
    [Description]
       ↓
    [Button]

---

# Cluster Pattern

Cluster — горизонтальна група елементів із wrapping.

Наприклад:

    [Tag] [Tag] [Tag] [Tag]
    [Tag] [Tag]

CSS:

    .cluster {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

Типові випадки:

    tags
    filters
    buttons
    actions
    badges

---

# Center Pattern

Повне центрування:

    .center {
        display: grid;
        place-items: center;
    }

Альтернативний Flexbox:

    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

Grid-варіант дуже короткий.

---

# place-items

`place-items` — shorthand для:

    align-items
    justify-items

Наприклад:

    .center {
        display: grid;
        place-items: center;
    }

---

# Full Screen Center

Наприклад, loading screen:

    .loading {
        min-height: 100vh;
        display: grid;
        place-items: center;
    }

Результат:

    ┌───────────────────────────┐
    │                           │
    │                           │
    │          Loading          │
    │                           │
    │                           │
    └───────────────────────────┘

---

# Form Layout

Простий form:

    .form {
        display: grid;
        gap: 16px;
    }

Наприклад:

    [Name]
    [Email]
    [Password]
    [Submit]

---

# Form Two Columns

Desktop:

    [First Name] [Last Name]
    [Email]      [Phone]

CSS:

    .form-grid {
        display: grid;
        grid-template-columns:
            repeat(2, minmax(0, 1fr));
        gap: 16px;
    }

Mobile:

    [First Name]
    [Last Name]
    [Email]
    [Phone]

---

# Responsive Form

    .form-grid {
        display: grid;
        grid-template-columns:
            repeat(2, minmax(0, 1fr));
        gap: 16px;
    }

    @media (max-width: 640px) {
        .form-grid {
            grid-template-columns: 1fr;
        }
    }

---

# Full Width Form Field

Окремий field може займати всі columns:

    .field--full {
        grid-column: 1 / -1;
    }

Наприклад:

    [First Name] [Last Name]
    [Email]      [Phone]
    [        Message        ]

---

# Table-like Layout

Grid можна використовувати для деяких UI, які візуально нагадують таблицю.

Наприклад:

    .row {
        display: grid;
        grid-template-columns:
            2fr 1fr 1fr;
        gap: 16px;
    }

Але для справжніх табличних даних потрібно використовувати семантичний:

    <table>

CSS layout не замінює правильну HTML semantics.

---

# Holy Grail vs Modern Layout

Класичний Holy Grail layout раніше часто будували складними способами.

Сьогодні:

    CSS Grid

значно спрощує задачу.

Наприклад:

    .page {
        display: grid;

        grid-template:
            "header header header" auto
            "left main right" 1fr
            "footer footer footer" auto
            / 200px minmax(0, 1fr) 200px;

        min-height: 100vh;
    }

Це дозволяє описати layout декларативно.

---

# Responsive Page Pattern

Desktop:

    ┌─────────────────────────────┐
    │           Header            │
    ├──────────┬──────────────────┤
    │ Sidebar  │      Main        │
    ├──────────┴──────────────────┤
    │           Footer            │
    └─────────────────────────────┘

Mobile:

    ┌─────────────────────────────┐
    │           Header            │
    ├─────────────────────────────┤
    │            Main             │
    ├─────────────────────────────┤
    │          Sidebar            │
    ├─────────────────────────────┤
    │           Footer            │
    └─────────────────────────────┘

Grid дозволяє змінювати структуру layout через media queries.

---

# Grid Areas Responsive Pattern

Desktop:

    .page {
        display: grid;

        grid-template-areas:
            "header header"
            "sidebar main"
            "footer footer";
    }

Mobile:

    .page {
        grid-template-areas:
            "header"
            "main"
            "sidebar"
            "footer";
    }

Тут змінюється не HTML, а CSS layout.

---

# Responsive Navigation Pattern

Desktop:

    [Logo] [Home] [About] [Blog] [Contact]

Mobile:

    [Logo]                     [Menu]

Для такого pattern часто використовуються:

    Flexbox
    media queries
    button
    navigation state

CSS відповідає за layout.

JavaScript може відповідати за:

    open / close state

---

# Content + Actions

Типовий pattern:

    ┌─────────────────────────────┐
    │ Content                     │
    │                             │
    │ Description                 │
    │                             │
    │ [Action]                    │
    └─────────────────────────────┘

Flexbox:

    .component {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

---

# Push Element to Bottom

Наприклад:

    .card {
        display: flex;
        flex-direction: column;
    }

    .card__actions {
        margin-top: auto;
    }

Це дозволяє:

    Title
    Description
    ...
    ...
    Button

навіть якщо cards мають різну кількість тексту.

---

# Content Width Pattern

Не весь контент повинен займати всю ширину viewport.

Наприклад:

    .article {
        width: 100%;
        max-width: 720px;
        margin-inline: auto;
    }

Це корисно для:

    articles
    documentation
    blog posts
    long-form text

---

# Reading Width

Для довгого тексту часто використовують обмежену ширину.

Наприклад:

    .article {
        max-width: 70ch;
        margin-inline: auto;
    }

`ch` приблизно базується на ширині символу поточного шрифту.

Це може допомогти контролювати довжину рядка.

---

# Fluid Layout

Fluid layout використовує відносні одиниці.

Наприклад:

    .container {
        width: 90%;
        max-width: 1200px;
        margin-inline: auto;
    }

Ширина змінюється разом із viewport.

---

# Fixed Layout

Приклад:

    .sidebar {
        width: 240px;
    }

Fixed size не змінюється автоматично залежно від viewport.

Часто використовується для:

    sidebar
    icons
    controls
    specific UI elements

---

# Fluid + Fixed

Дуже поширений pattern:

    grid-template-columns:
        240px minmax(0, 1fr);

Тут:

    sidebar → fixed
    main    → flexible

---

# Responsive Layout with clamp()

Для плавної зміни spacing:

    .section {
        padding-block:
            clamp(40px, 8vw, 96px);
    }

`clamp()` дозволяє задати:

    minimum
    preferred
    maximum

---

# Responsive Typography

Наприклад:

    h1 {
        font-size:
            clamp(2rem, 5vw, 4rem);
    }

Це дозволяє плавно змінювати розмір заголовка.

Layout та typography можуть працювати разом.

---

# Layout Tokens

У великому проєкті корисно мати CSS variables:

    :root {
        --container-width: 1200px;
        --space-1: 4px;
        --space-2: 8px;
        --space-3: 16px;
        --space-4: 24px;
        --space-5: 32px;
        --space-6: 48px;
    }

Потім:

    .container {
        max-width: var(--container-width);
        margin-inline: auto;
    }

    .section {
        padding-block: var(--space-6);
    }

Це покращує consistency.

---

# Layout System

Замість випадкових значень:

    margin: 13px;
    padding: 27px;
    gap: 19px;
    margin-top: 31px;

можна створити spacing system:

    4px
    8px
    16px
    24px
    32px
    48px
    64px

Це допомагає підтримувати візуальну consistency.

---

# Nested Layouts

У реальних проєктах layout часто вкладений.

Наприклад:

    Page
      ↓
    Grid
      ↓
    Main + Sidebar
      ↓
    Main
      ↓
    Grid
      ↓
    Cards
      ↓
    Card
      ↓
    Flexbox
      ↓
    Content

Не потрібно намагатися побудувати всю сторінку одним layout container.

---

# Layout Composition

Хороший layout часто складається з простих layout patterns.

Наприклад:

    Page
      │
      ├── Container
      │
      ├── Header
      │     └── Flexbox
      │
      ├── Hero
      │     └── Grid
      │
      ├── Cards
      │     └── Grid
      │           └── Card → Flexbox
      │
      └── Footer
            └── Flexbox

Це називається composition.

---

# Layout Wrapper

Wrapper — елемент, який контролює layout або ширину.

Наприклад:

    <section>
        <div class="container">
            <div class="content">
                ...
            </div>
        </div>
    </section>

Ролі:

    section
        → semantic section

    container
        → width / horizontal spacing

    content
        → local layout

Не потрібно створювати wrapper без причини.

---

# Wrapper Principle

Кожен wrapper повинен мати зрозумілу роль.

Наприклад:

    .container
        → max-width

    .grid
        → columns

    .stack
        → vertical spacing

    .cluster
        → horizontal wrapping

Це робить CSS architecture зрозумілішою.

---

# Layout Utilities

У більших проєктах можуть існувати utility classes.

Наприклад:

    .container {
        ...
    }

    .stack {
        ...
    }

    .cluster {
        ...
    }

    .grid {
        ...
    }

Але utilities повинні мати чітке призначення.

---

# Container Pattern

Можна створити універсальний:

    .container {
        width: min(
            100% - 32px,
            1200px
        );
        margin-inline: auto;
    }

Тут:

    100% - 32px

залишає horizontal space.

А:

    1200px

обмежує максимальну ширину.

---

# width: min()

Приклад:

    .container {
        width: min(
            100% - 32px,
            1200px
        );
        margin-inline: auto;
    }

Це компактний responsive container pattern.

---

# Sidebar Pattern with minmax()

    .layout {
        display: grid;

        grid-template-columns:
            minmax(200px, 280px)
            minmax(0, 1fr);

        gap: 32px;
    }

Sidebar може змінюватися:

    200px → 280px

Main отримує решту простору.

---

# Responsive Grid Without Breakpoints

Можна:

    .cards {
        display: grid;

        grid-template-columns:
            repeat(
                auto-fit,
                minmax(240px, 1fr)
            );

        gap: 24px;
    }

Це часто краще за:

    @media 1200px
    @media 992px
    @media 768px
    @media 576px

якщо layout не потребує чітких breakpoint changes.

---

# Breakpoints

Breakpoint — ширина viewport, на якій layout змінюється.

Наприклад:

    @media (max-width: 768px) {
        ...
    }

Не потрібно автоматично використовувати стандартні:

    1200
    992
    768
    576

Breakpoint повинен визначатися layout/content потребою.

---

# Content-Based Breakpoints

Краще питання:

    "Коли layout перестає працювати?"

а не:

    "Який стандартний breakpoint
     я повинен використати?"

Наприклад:

    Desktop layout:
        [logo] [navigation] [actions]

Якщо navigation більше не поміщається:

    → потрібна зміна layout

Це і є природна причина breakpoint.

---

# Mobile First

Mobile-first:

    base CSS
        ↓
    mobile layout

Потім:

    @media (min-width: ...)
        ↓
    tablet / desktop enhancements

Наприклад:

    .layout {
        display: grid;
        grid-template-columns: 1fr;
    }

    @media (min-width: 768px) {
        .layout {
            grid-template-columns:
                240px minmax(0, 1fr);
        }
    }

---

# Desktop First

Можна робити навпаки:

    desktop
        ↓
    max-width media queries
        ↓
    mobile

Але для нових проєктів mobile-first часто робить responsive logic простішою.

---

# Responsive Pattern

Типова послідовність:

    Mobile
      ↓
    Tablet
      ↓
    Desktop

Не потрібно створювати окремий HTML для кожного viewport.

Один semantic HTML:

    + CSS responsive layout

зазвичай достатній.

---

# Accessibility

Layout повинен зберігати логічну структуру документа.

HTML:

    <header>
    <nav>
    <main>
    <aside>
    <footer>

краще за:

    <div class="header">
    <div class="nav">
    <div class="main">
    <div class="sidebar">
    <div class="footer">

Semantic HTML допомагає:

    accessibility
    SEO
    maintainability

---

# DOM Order

Наприклад:

    <main>
        <h1>Title</h1>
        <p>Text</p>
        <button>Action</button>
    </main>

Візуальний layout може змінювати позицію елементів.

Але logical DOM order повинен залишатися зрозумілим.

---

# Не використовуй CSS для виправлення HTML

Якщо HTML:

    sidebar
    main
    header

а CSS намагається зробити:

    header
    main
    sidebar

краще спочатку перевірити HTML structure.

CSS повинен організовувати presentation, а HTML — semantic structure.

---

# Positioning у Layout Patterns

`position` має свої специфічні задачі.

## relative

Створює positioning context:

    .card {
        position: relative;
    }

---

## absolute

Елемент позиціонується відносно positioning ancestor:

    .badge {
        position: absolute;
        top: 16px;
        right: 16px;
    }

Типовий pattern:

    card
      ↓
    position: relative

    badge
      ↓
    position: absolute

---

# Overlay Pattern

Наприклад:

    ┌──────────────────────┐
    │ IMAGE                │
    │                 [NEW]│
    │                      │
    └──────────────────────┘

CSS:

    .card {
        position: relative;
    }

    .badge {
        position: absolute;
        top: 12px;
        right: 12px;
    }

Тут `position` використовується для overlay, а не для основного layout.

---

# Fixed Element

Наприклад:

    .cookie-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }

Типові випадки:

    modal
    floating button
    cookie banner
    fixed navigation

---

# Sticky Element

Наприклад:

    .sidebar {
        position: sticky;
        top: 24px;
    }

Типові випадки:

    sidebar
    table header
    section navigation
    filters

---

# Layout vs Positioning

Важливо розділяти:

    Layout
        ↓
    normal flow
    Flexbox
    Grid

та:

    Positioning
        ↓
    relative
    absolute
    fixed
    sticky

Наприклад:

    Grid
      ↓
    sidebar + main

    Sticky
      ↓
    sidebar remains visible

---

# Overflow

Layout patterns повинні враховувати overflow.

Потенційна проблема:

    long text
    long URL
    large image
    wide code block

Наприклад:

    .content {
        min-width: 0;
    }

Це особливо корисно для grid/flex children, які повинні дозволяти content стискатися.

---

# min-width: 0

Наприклад:

    .layout {
        display: grid;
        grid-template-columns:
            240px minmax(0, 1fr);
    }

`minmax(0, 1fr)` та:

    min-width: 0;

часто використовуються для запобігання небажаному overflow.

---

# Images in Layout

Responsive image:

    img {
        display: block;
        max-width: 100%;
        height: auto;
    }

Це допомагає зберігати image всередині container.

---

# Object Fit

Для card images:

    .card__image {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
    }

Це створює передбачуваний image area.

---

# Aspect Ratio Pattern

Наприклад:

    .media {
        aspect-ratio: 16 / 9;
    }

Browser підтримує співвідношення:

    width / height

Наприклад:

    16 / 9
    4 / 3
    1 / 1

---

# Media Card

Типовий pattern:

    .card__media {
        aspect-ratio: 16 / 9;
        overflow: hidden;
    }

    .card__media img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

---

# Layout Pattern: List

Простий список:

    .list {
        display: grid;
        gap: 16px;
    }

HTML:

    <ul class="list">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>

Grid добре підходить для вертикального spacing.

---

# Layout Pattern: Stack

    .stack {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

Наприклад:

    <section class="stack">
        <h2>Title</h2>
        <p>Description</p>
        <button>Action</button>
    </section>

---

# Layout Pattern: Cluster

    .cluster {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
    }

Типові випадки:

    buttons
    tags
    filters
    badges

---

# Layout Pattern: Sidebar

    .sidebar-layout {
        display: grid;
        grid-template-columns:
            240px minmax(0, 1fr);
        gap: 32px;
    }

---

# Layout Pattern: Split

    .split {
        display: grid;
        grid-template-columns:
            repeat(2, minmax(0, 1fr));
        gap: 48px;
    }

---

# Layout Pattern: Card Grid

    .card-grid {
        display: grid;
        grid-template-columns:
            repeat(
                auto-fit,
                minmax(240px, 1fr)
            );
        gap: 24px;
    }

---

# Layout Pattern: Center

    .center {
        display: grid;
        place-items: center;
    }

---

# Layout Pattern: Page

    .page {
        min-height: 100vh;
        display: grid;
        grid-template-rows:
            auto 1fr auto;
    }

---

# Layout Pattern: Main + Sidebar

    .main-layout {
        display: grid;
        grid-template-columns:
            minmax(0, 1fr) 300px;
        gap: 32px;
    }

---

# Layout Pattern: Sidebar + Main

    .main-layout {
        display: grid;
        grid-template-columns:
            280px minmax(0, 1fr);
        gap: 32px;
    }

---

# Layout Pattern: Full Width Section

    .section {
        width: 100%;
    }

    .section__container {
        width: min(
            100% - 32px,
            1200px
        );
        margin-inline: auto;
    }

---

# Типові помилки

❌ Використовувати `position: absolute` для всієї сторінки.

---

❌ Встановлювати фіксовану ширину:

    width: 1200px;

без врахування маленьких viewport.

Краще:

    width: 100%;
    max-width: 1200px;

---

❌ Використовувати:

    width: 100vw;

для звичайного container без потреби.

`100vw` може враховувати ширину scrollbar і створювати горизонтальний overflow.

---

❌ Створювати надто багато media queries.

Спочатку перевір:

    flex-wrap
    auto-fit
    minmax()
    fluid widths
    clamp()

---

❌ Використовувати однаковий breakpoint для всіх компонентів.

Різні компоненти можуть потребувати різних breakpoint.

---

❌ Створювати величезну кількість wrapper elements.

Wrapper повинен мати конкретну layout-роль.

---

❌ Використовувати margin для всього spacing.

Часто краще:

    gap

---

❌ Плутати padding і margin.

    padding
        → внутрішній простір

    margin
        → зовнішній простір

---

❌ Використовувати Grid там, де достатньо Flexbox.

Наприклад:

    icon + text

часто простіше через Flexbox.

---

❌ Використовувати Flexbox там, де потрібна справжня двовимірна сітка.

Наприклад:

    dashboard
    gallery
    complex page layout

часто краще через Grid.

---

❌ Змінювати DOM order через CSS без необхідності.

Це може створити проблеми з:

    accessibility
    keyboard navigation
    screen readers

---

❌ Забувати:

    min-width: 0;

для складних flex/grid layouts.

---

❌ Фіксувати висоту великих content sections без необхідності.

Наприклад:

    height: 500px;

може створити overflow.

Часто краще:

    min-height

або:

    auto

---

# Практичний Page Layout

HTML:

    <div class="page">
        <header class="header">
            <div class="container header__inner">
                <a href="/" class="logo">
                    Logo
                </a>

                <nav class="nav">
                    <a href="#">Home</a>
                    <a href="#">About</a>
                    <a href="#">Blog</a>
                </nav>
            </div>
        </header>

        <main>
            <section class="hero">
                <div class="container hero__inner">
                    <div class="hero__content">
                        <h1>Build better interfaces</h1>
                        <p>
                            Learn modern CSS layout.
                        </p>
                    </div>

                    <div class="hero__media">
                        ...
                    </div>
                </div>
            </section>

            <section class="section">
                <div class="container">
                    <div class="cards">
                        ...
                    </div>
                </div>
            </section>
        </main>

        <footer class="footer">
            <div class="container">
                Footer
            </div>
        </footer>
    </div>

CSS:

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    .page {
        min-height: 100vh;
        display: grid;
        grid-template-rows:
            auto 1fr auto;
    }

    .container {
        width: min(
            100% - 32px,
            1200px
        );
        margin-inline: auto;
    }

    .header__inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        min-height: 72px;
    }

    .nav {
        display: flex;
        gap: 24px;
    }

    .hero__inner {
        display: grid;
        grid-template-columns:
            repeat(2, minmax(0, 1fr));
        gap: 48px;
        align-items: center;
    }

    .cards {
        display: grid;
        grid-template-columns:
            repeat(
                auto-fit,
                minmax(240px, 1fr)
            );
        gap: 24px;
    }

---

# Layout Architecture Example

Великі сторінки краще будувати шарами.

    Page
      │
      ├── Header
      │     └── Flexbox
      │
      ├── Main
      │     │
      │     ├── Hero
      │     │     └── Grid
      │     │
      │     ├── Section
      │     │     └── Container
      │     │
      │     └── Cards
      │           └── Grid
      │                 └── Card
      │                       └── Flexbox
      │
      └── Footer
            └── Container

Це набагато краще масштабується, ніж один великий CSS layout.

---

# Layout Checklist

Перед написанням CSS запитай:

    1. Яка semantic structure?

    2. Яка ширина content?

    3. Чи потрібен container?

    4. Чи потрібен full-width background?

    5. Це один вимір чи два?

    6. Потрібен Flexbox чи Grid?

    7. Чи потрібен normal flow?

    8. Чи справді потрібен position?

    9. Що станеться на mobile?

    10. Що станеться з довгим текстом?

    11. Чи буде overflow?

    12. Чи збережеться logical DOM order?

    13. Чи потрібен breakpoint?

    14. Чи можна використати auto-fit / minmax()?

    15. Чи потрібен wrapper?

---

# Layout Decision Tree

    Починаємо layout
          │
          ↓
    Semantic HTML
          │
          ↓
    Normal flow достатній?
       /          \
     Так          Ні
      ↓            ↓
    normal       Flex/Grid
    flow            │
                    ↓
              Один вимір?
               /       \
             Так       Ні
              ↓         ↓
          Flexbox      Grid
              │         │
              └────┬────┘
                   ↓
             Position потрібен?
                /       \
              Так       Ні
               ↓         ↓
           position    layout
               │
               ↓
             overlay /
             sticky /
             fixed

---

# Practical Patterns Summary

## Container

    .container {
        width: min(
            100% - 32px,
            1200px
        );
        margin-inline: auto;
    }

---

## Header

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
    }

---

## Navigation

    .nav {
        display: flex;
        align-items: center;
        gap: 24px;
    }

---

## Stack

    .stack {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

---

## Cluster

    .cluster {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }

---

## Center

    .center {
        display: grid;
        place-items: center;
    }

---

## Split

    .split {
        display: grid;
        grid-template-columns:
            repeat(2, minmax(0, 1fr));
        gap: 40px;
    }

---

## Sidebar

    .layout {
        display: grid;
        grid-template-columns:
            240px minmax(0, 1fr);
        gap: 32px;
    }

---

## Three Columns

    .layout {
        display: grid;
        grid-template-columns:
            240px
            minmax(0, 1fr)
            240px;
        gap: 24px;
    }

---

## Cards

    .cards {
        display: grid;
        grid-template-columns:
            repeat(
                auto-fit,
                minmax(240px, 1fr)
            );
        gap: 24px;
    }

---

## Page

    .page {
        min-height: 100vh;
        display: grid;
        grid-template-rows:
            auto 1fr auto;
    }

---

## Sticky Sidebar

    .sidebar {
        position: sticky;
        top: 24px;
        align-self: start;
    }

---

## Overlay

    .card {
        position: relative;
    }

    .badge {
        position: absolute;
        top: 12px;
        right: 12px;
    }

---

## Full Width Section

    .section {
        width: 100%;
    }

    .section__container {
        width: min(
            100% - 32px,
            1200px
        );
        margin-inline: auto;
    }

---

# Шлях

🟢 Core (обов'язково знати)

Розуміти:

    normal flow
    layout
    container
    wrapper
    section
    component

Знати patterns:

    centered container
    full-width section
    header
    navigation
    hero
    main + sidebar
    card grid
    footer

Вміти використовувати:

    max-width
    width: 100%
    margin-inline: auto
    padding
    gap

Розуміти:

    Flexbox
    Grid
    responsive layout
    mobile-first

Вміти створити:

    Header
    Main
    Footer
    Sidebar
    Card Grid

---

🔵 Junior

Впевнено створювати:

    container
    header
    navigation
    hero
    split layout
    sidebar layout
    card grid
    gallery
    dashboard
    sticky sidebar
    responsive forms

Розуміти:

    minmax()
    repeat()
    auto-fit
    auto-fill
    1fr
    min-width: 0
    max-width
    aspect-ratio
    object-fit
    clamp()

Вміти комбінувати:

    Grid
    Flexbox
    position

Розуміти:

    DOM order
    visual order
    accessibility

Вміти будувати:

    mobile-first layouts
    responsive card grids
    page layouts
    two-column layouts

---

🟠 Middle

Глибше розуміння:

    layout composition
    layout architecture
    intrinsic sizing
    responsive patterns
    content-based breakpoints
    container queries
    logical properties

Вміти створювати reusable patterns:

    Container
    Stack
    Cluster
    Grid
    Sidebar
    Center
    Split

Розуміти:

    spacing systems
    layout tokens
    design systems
    component boundaries
    responsive architecture

Вміти мінімізувати:

    magic numbers
    unnecessary wrappers
    unnecessary breakpoints
    absolute positioning

Розуміти trade-offs між:

    normal flow
    Flexbox
    Grid
    position

---

🔴 Senior

Глибоке layout-мислення:

    semantic HTML
        ↓
    document flow
        ↓
    layout model
        ↓
    responsive behavior
        ↓
    component architecture

Розуміти:

    CSS layout algorithms
    intrinsic sizing
    grid track sizing
    flex sizing
    container queries
    subgrid
    logical properties
    writing modes
    accessibility
    source order
    responsive architecture

Вміти проектувати:

    design-system layouts
    scalable page architecture
    reusable layout primitives
    complex dashboards
    responsive application shells
    content-driven layouts

Вміти визначати:

    що повинно бути normal flow
    що повинно бути Flexbox
    що повинно бути Grid
    що повинно бути positioned
    де потрібен breakpoint
    де breakpoint взагалі не потрібен

---

# Міні-шпаргалка

## Container

    width: min(
        100% - 32px,
        1200px
    );

    margin-inline: auto;

---

## Page

    min-height: 100vh;

    display: grid;

    grid-template-rows:
        auto 1fr auto;

---

## Header

    display: flex;

    align-items: center;

    justify-content:
        space-between;

---

## Navigation

    display: flex;

    gap: 24px;

---

## Stack

    display: flex;

    flex-direction:
        column;

    gap: 16px;

---

## Cluster

    display: flex;

    flex-wrap: wrap;

    gap: 12px;

---

## Center

    display: grid;

    place-items: center;

---

## Split

    display: grid;

    grid-template-columns:
        repeat(
            2,
            minmax(0, 1fr)
        );

---

## Sidebar

    display: grid;

    grid-template-columns:
        240px
        minmax(0, 1fr);

---

## Card Grid

    display: grid;

    grid-template-columns:
        repeat(
            auto-fit,
            minmax(240px, 1fr)
        );

---

## Three Columns

    grid-template-columns:
        240px
        minmax(0, 1fr)
        240px;

---

## Sticky Sidebar

    position: sticky;

    top: 24px;

---

## Overlay

    parent:
        position: relative;

    child:
        position: absolute;

---

## Responsive

    mobile
        ↓
    tablet
        ↓
    desktop

Але breakpoint визначається потребами layout, а не лише стандартними числами.

---

# Головне

• Layout pattern — це повторюваний спосіб організації елементів.

• Layout починається з semantic HTML та normal flow.

• Не потрібно одразу використовувати `position`.

• Основні інструменти сучасного CSS layout:

    normal flow
    Flexbox
    Grid
    position

• Container pattern:

    width: min(
        100% - 32px,
        1200px
    );

    margin-inline: auto;

• Full-width section може містити обмежений container.

• Header часто використовує Flexbox.

• Navigation часто використовує Flexbox.

• Stack — вертикальне розташування елементів через Flexbox або Grid.

• Cluster — горизонтальне групування елементів із wrapping.

• Center можна легко створити через:

    display: grid;
    place-items: center;

• Split layout часто реалізується через Grid.

• Main + Sidebar часто:

    grid-template-columns:
        minmax(0, 1fr) 300px;

• Sidebar + Main часто:

    grid-template-columns:
        240px minmax(0, 1fr);

• Card grid часто:

    repeat(
        auto-fit,
        minmax(240px, 1fr)
    );

• `minmax(0, 1fr)` допомагає контролювати overflow та sizing main content.

• `min-width: 0` може бути необхідним для flex/grid children із довгим контентом.

• `aspect-ratio` допомагає створювати передбачувані media areas.

• `object-fit: cover` допомагає правильно заповнювати image container.

• `position: absolute` добре підходить для overlay, але не повинен замінювати основний layout.

• `position: sticky` корисний для sidebar та інших елементів, які повинні залишатися видимими під час scrolling.

• Responsive layout не обов'язково означає багато media queries.

• Спочатку перевір:

    flex-wrap
    auto-fit
    minmax()
    fluid sizing
    clamp()

• Breakpoint потрібно визначати за поведінкою content/layout.

• Mobile-first означає:

    mobile
        ↓
    larger screens

• Хороший layout часто складається з кількох простих patterns.

Наприклад:

    Page
      ↓
    Container
      ↓
    Grid
      ↓
    Section
      ↓
    Grid
      ↓
    Card
      ↓
    Flexbox

• Grid і Flexbox не потрібно протиставляти.

• У реальному проєкті вони часто використовуються разом.

• Semantic HTML відповідає за структуру документа.

• CSS відповідає за presentation та layout.

• Не потрібно змінювати logical DOM order лише заради visual layout.

• Accessibility потрібно враховувати під час побудови layout.

• Основна ментальна модель:

    Normal Flow
        ↓
    базове розташування

    Flexbox
        ↓
    one-dimensional layout

    Grid
        ↓
    two-dimensional layout

    Position
        ↓
    special positioning

• Хороший CSS layout — це не максимальна кількість CSS-властивостей.

• Хороший layout — це проста, зрозуміла та адаптивна структура, яка відповідає природі контенту.

• Головне питання під час побудови layout:

    "Яку структуру має мій контент
     і яка CSS layout model
     найкраще її описує?"