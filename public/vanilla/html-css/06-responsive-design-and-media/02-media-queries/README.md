# 02. Media Queries

Media Queries (`@media`) — це CSS-механізм, який дозволяє застосовувати різні CSS-правила залежно від характеристик viewport, device або середовища, у якому працює сторінка.

Media queries є одним із головних інструментів responsive design.

Вони дозволяють змінювати:

    layout
    columns
    width
    height
    spacing
    typography
    visibility
    positioning
    navigation
    colors
    animations
    interaction-related styles

залежно від умов.

Наприклад:

    desktop
        ↓
    2 columns

    mobile
        ↓
    1 column

За допомогою:

    @media

---

# Ключові поняття

✔ media query  
✔ `@media`  
✔ media condition  
✔ media feature  
✔ viewport  
✔ viewport width  
✔ viewport height  
✔ breakpoint  
✔ responsive design  
✔ mobile-first  
✔ desktop-first  
✔ `min-width`  
✔ `max-width`  
✔ `min-height`  
✔ `max-height`  
✔ `orientation`  
✔ `hover`  
✔ `pointer`  
✔ `any-hover`  
✔ `any-pointer`  
✔ `prefers-color-scheme`  
✔ `prefers-reduced-motion`  
✔ `prefers-contrast`  
✔ `forced-colors`  
✔ `resolution`  
✔ `aspect-ratio`  
✔ `and`  
✔ `not`  
✔ `or`  
✔ comma-separated queries  
✔ range syntax  
✔ breakpoint strategy  
✔ progressive enhancement  
✔ feature detection  
✔ print media  
✔ screen media  

---

# Що потрібно пам'ятати

• Media query дозволяє застосувати CSS лише тоді, коли задана умова виконується.

• Основний синтаксис:

    @media (condition) {
        /* CSS */
    }

• Найчастіше media queries використовують для responsive layout.

• `min-width` означає:

    viewport width >= value

• `max-width` означає:

    viewport width <= value

• Mobile-first зазвичай використовує `min-width`.

• Desktop-first часто використовує `max-width`.

• Breakpoint — це не "розмір конкретного телефону", а точка, де layout повинен змінити поведінку.

• Media queries можуть реагувати не тільки на ширину viewport.

• Вони можуть враховувати:

    width
    height
    orientation
    hover
    pointer
    color scheme
    reduced motion
    contrast
    resolution
    aspect ratio

• Не потрібно створювати media query для кожного популярного device.

• Краще створювати breakpoint там, де content перестає нормально розміщуватися.

• Media queries можна комбінувати через:

    and
    not
    or
    comma

• Сучасний CSS також підтримує range syntax.

---

# Media Query

Базовий синтаксис:

    @media (condition) {
        selector {
            property: value;
        }
    }

Наприклад:

    @media (max-width: 768px) {
        .container {
            padding-inline: 1rem;
        }
    }

Правило застосовується, коли:

    viewport width <= 768px

---

# Простий приклад

Базовий CSS:

    .box {
        width: 50%;
    }

На вузькому viewport:

    @media (max-width: 600px) {
        .box {
            width: 100%;
        }
    }

Результат:

    desktop:

    ┌───────────────┐
    │     BOX       │
    │    50%        │
    └───────────────┘


    mobile:

    ┌───────────────────────┐
    │         BOX           │
    │        100%           │
    └───────────────────────┘

---

# Media Query Structure

Media query можна умовно розділити на:

    @media
       ↓
    media condition
       ↓
    CSS rules

Наприклад:

    @media (max-width: 768px) {
        .card {
            padding: 1rem;
        }
    }

Тут:

    @media
        → media query

    max-width: 768px
        → condition

    .card { ... }
        → CSS rules

---

# Media Feature

`max-width` — це media feature.

Інші media features:

    width
    min-width
    max-width
    height
    min-height
    max-height
    orientation
    aspect-ratio
    resolution
    hover
    pointer
    any-hover
    any-pointer
    prefers-color-scheme
    prefers-reduced-motion
    prefers-contrast
    forced-colors

---

# min-width

`min-width` означає:

    viewport width >= specified value

Наприклад:

    @media (min-width: 768px) {
        .layout {
            display: grid;
        }
    }

Правило працює на:

    768px
    800px
    1000px
    1200px
    1440px
    ...

---

# max-width

`max-width` означає:

    viewport width <= specified value

Наприклад:

    @media (max-width: 767px) {
        .layout {
            display: block;
        }
    }

Правило працює на:

    767px
    600px
    480px
    375px
    320px
    ...

---

# min-width vs max-width

`min-width`:

    @media (min-width: 768px) {
        ...
    }

Логіка:

    768px і більше

`max-width`:

    @media (max-width: 767px) {
        ...
    }

Логіка:

    767px і менше

---

# Mobile-First

Mobile-first означає:

    базові стилі
        ↓
    mobile
        ↓
    min-width media queries
        ↓
    larger screens

Наприклад:

    .layout {
        display: grid;
        grid-template-columns: 1fr;
    }

    @media (min-width: 768px) {
        .layout {
            grid-template-columns:
                2fr 1fr;
        }
    }

Базовий layout:

    1 column

Починаючи з `768px`:

    2 columns

---

# Mobile-First Flow

    Base CSS
        ↓
    mobile
        ↓
    768px
        ↓
    tablet / larger
        ↓
    1024px
        ↓
    desktop
        ↓
    1440px
        ↓
    large desktop

Наприклад:

    .layout {
        grid-template-columns: 1fr;
    }

    @media (min-width: 768px) {
        .layout {
            grid-template-columns: 2fr 1fr;
        }
    }

---

# Desktop-First

Desktop-first починається з layout для широкого viewport.

    .layout {
        display: grid;
        grid-template-columns:
            2fr 1fr;
    }

Потім layout спрощується:

    @media (max-width: 768px) {
        .layout {
            grid-template-columns: 1fr;
        }
    }

---

# Mobile-First vs Desktop-First

Mobile-first:

    base
      ↓
    min-width
      ↓
    larger screens

Desktop-first:

    base
      ↓
    max-width
      ↓
    smaller screens

Сучасний responsive CSS часто використовує:

    mobile-first
        +
    min-width

---

# Breakpoint

Breakpoint — це ширина або інша умова, при якій layout змінює свою поведінку.

Наприклад:

    @media (min-width: 768px) {
        ...
    }

Тут:

    768px

є breakpoint.

Але breakpoint не обов'язково повинен бути:

    320px
    480px
    768px
    1024px
    1280px

Це лише поширені числа.

---

# Content-Based Breakpoint

Краще визначати breakpoint за content.

Наприклад:

    Logo + Navigation + Button

добре поміщаються:

    1100px

Але при:

    850px

navigation починає ламатися.

Тоді:

    breakpoint ≈ 850px

може бути логічнішим, ніж:

    768px

Головне правило:

    breakpoint визначається layout,
    а не назвою device.

---

# Breakpoint Strategy

Не потрібно:

    10px
    320px
    375px
    414px
    480px
    600px
    768px
    820px
    900px
    1024px
    1200px
    1440px
    1600px

без реальної необхідності.

Краще:

    base
       ↓
    breakpoint
       ↓
    breakpoint
       ↓
    breakpoint

тільки там, де реально змінюється layout.

---

# Один Breakpoint

Іноді достатньо одного:

    .layout {
        display: grid;
        grid-template-columns: 1fr;
    }

    @media (min-width: 800px) {
        .layout {
            grid-template-columns:
                2fr 1fr;
        }
    }

---

# Два Breakpoints

Наприклад:

    .layout {
        grid-template-columns: 1fr;
    }

    @media (min-width: 700px) {
        .layout {
            grid-template-columns:
                repeat(2, 1fr);
        }
    }

    @media (min-width: 1100px) {
        .layout {
            grid-template-columns:
                repeat(3, 1fr);
        }
    }

Отримуємо:

    < 700px
        → 1 column

    700px+
        → 2 columns

    1100px+
        → 3 columns

---

# Media Queries та Cascade

Media query не створює окремий CSS.

Правила все одно беруть участь у:

    cascade
    specificity
    source order

Наприклад:

    .box {
        color: blue;
    }

    @media (min-width: 768px) {
        .box {
            color: red;
        }
    }

На viewport:

    500px
        → blue

На viewport:

    800px
        → red

---

# Cascade всередині Media Query

Наприклад:

    .box {
        padding: 2rem;
    }

    @media (max-width: 768px) {
        .box {
            padding: 1rem;
        }
    }

На mobile:

    padding: 1rem

На desktop:

    padding: 2rem

---

# Source Order

Наприклад:

    .box {
        color: blue;
    }

    @media (min-width: 768px) {
        .box {
            color: red;
        }
    }

Пізніше правило має перевагу, якщо:

    specificity однакова

Тому source order все ще важливий.

---

# Specificity та Media Queries

Media query сама по собі не збільшує specificity.

Наприклад:

    .box {
        color: blue;
    }

    @media (min-width: 768px) {
        .box {
            color: red;
        }
    }

Обидва selectors мають:

    specificity = .box

Media query лише визначає:

    чи активне правило

---

# Media Query не "перемагає" specificity

Наприклад:

    #box {
        color: blue;
    }

    @media (min-width: 768px) {
        .box {
            color: red;
        }
    }

На desktop:

    #box

має вищу specificity.

Тому:

    blue

залишиться.

---

# Multiple Media Queries

Можна мати декілька media queries.

    .box {
        padding: 1rem;
    }

    @media (min-width: 768px) {
        .box {
            padding: 2rem;
        }
    }

    @media (min-width: 1200px) {
        .box {
            padding: 3rem;
        }
    }

Результат:

    < 768px
        → 1rem

    768px+
        → 2rem

    1200px+
        → 3rem

---

# Overlapping Media Queries

Media queries можуть одночасно бути true.

Наприклад:

    @media (min-width: 600px) {
        .box {
            color: red;
        }
    }

    @media (min-width: 800px) {
        .box {
            color: blue;
        }
    }

При:

    500px
        → базове правило

    700px
        → red

    900px
        → blue

На `900px` виконуються обидві media queries.

Оскільки друга знаходиться пізніше:

    blue

має перевагу за однакової specificity.

---

# and

`and` дозволяє поєднати умови.

Наприклад:

    @media (min-width: 768px) and (max-width: 1199px) {
        .box {
            padding: 2rem;
        }
    }

Умова:

    width >= 768px
    AND
    width <= 1199px

---

# Min + Max

Класичний діапазон:

    @media (
        min-width: 768px
    ) and (
        max-width: 1199px
    ) {
        ...
    }

Це означає:

    768px <= viewport <= 1199px

---

# Range Syntax

Сучасний CSS дозволяє писати range syntax.

Замість:

    @media (
        min-width: 768px
    ) and (
        max-width: 1199px
    ) {
        ...
    }

можна:

    @media (768px <= width <= 1199px) {
        ...
    }

Це більш математично читабельний запис.

---

# Range Syntax: min

Замість:

    @media (min-width: 768px) {
        ...
    }

можна:

    @media (width >= 768px) {
        ...
    }

---

# Range Syntax: max

Замість:

    @media (max-width: 767px) {
        ...
    }

можна:

    @media (width < 768px) {
        ...
    }

або:

    @media (width <= 767px) {
        ...
    }

---

# Range Syntax

Приклади:

    @media (width >= 768px) {
        ...
    }

    @media (width < 768px) {
        ...
    }

    @media (768px <= width < 1200px) {
        ...
    }

Range syntax особливо зручний для складніших умов.

---

# Комбінування умов

Наприклад:

    @media (
        width >= 768px
    ) and (
        orientation: landscape
    ) {
        ...
    }

Правило працює, коли:

    width >= 768px

і одночасно:

    landscape

---

# not

`not` інвертує media query.

Наприклад:

    @media not (prefers-color-scheme: dark) {
        ...
    }

Це означає:

    не dark mode

---

# or

Сучасний синтаксис дозволяє використовувати `or`.

Наприклад:

    @media (width < 600px) or (orientation: portrait) {
        ...
    }

Правило застосовується, якщо виконується хоча б одна умова.

---

# Comma-Separated Queries

Кома означає логічне:

    OR

Наприклад:

    @media (max-width: 600px),
           (orientation: portrait) {
        ...
    }

Правило працює, якщо:

    width <= 600px

АБО:

    orientation = portrait

---

# and vs comma

`and`:

    умови повинні виконуватися одночасно

Наприклад:

    @media (min-width: 768px)
        and (orientation: landscape) {
        ...
    }

Це:

    width >= 768px
    AND
    landscape

Кома:

    @media (max-width: 600px),
           (orientation: portrait) {
        ...
    }

Це:

    width <= 600px
    OR
    portrait

---

# Width

Media feature:

    width

Наприклад:

    @media (width: 768px) {
        ...
    }

Це означає exact width.

На практиці для responsive design частіше використовують:

    min-width
    max-width
    range syntax

---

# Height

Можна перевіряти viewport height.

    @media (max-height: 600px) {
        .hero {
            padding-block: 2rem;
        }
    }

Це корисно, коли проблема пов'язана саме з висотою viewport.

---

# min-height

Наприклад:

    @media (min-height: 800px) {
        .hero {
            min-height: 80vh;
        }
    }

---

# max-height

Наприклад:

    @media (max-height: 600px) {
        .hero {
            padding-block: 1rem;
        }
    }

---

# Width vs Height

Width:

    horizontal space

Height:

    vertical space

Responsive design найчастіше реагує на width, але height теж може бути важливим.

Наприклад:

    modal
    hero
    fullscreen interface
    game UI
    dashboard

---

# Orientation

`orientation` визначає орієнтацію viewport.

Можливі:

    portrait
    landscape

Наприклад:

    @media (orientation: portrait) {
        .hero {
            min-height: 60vh;
        }
    }

---

# Portrait

Portrait:

    height > width

Приклад:

    390 × 844

---

# Landscape

Landscape:

    width > height

Приклад:

    844 × 390

---

# Orientation Example

    @media (orientation: landscape) {
        .navigation {
            gap: 2rem;
        }
    }

---

# Orientation та Device

Не потрібно вважати:

    portrait = mobile
    landscape = desktop

Tablet може бути:

    portrait

Desktop monitor також має landscape.

Orientation описує геометрію viewport, а не тип пристрою.

---

# Aspect Ratio

Можна перевіряти співвідношення width/height.

Наприклад:

    @media (aspect-ratio > 1/1) {
        ...
    }

Або:

    @media (aspect-ratio: 16/9) {
        ...
    }

Це корисно у спеціалізованих layout.

---

# Resolution

Можна перевіряти display resolution.

Наприклад:

    @media (min-resolution: 2dppx) {
        ...
    }

`dppx` означає:

    dots per CSS pixel

Це може бути корисним для high-resolution displays.

---

# Retina / High-DPI

Не варто автоматично вважати:

    high DPI
        =
    mobile

Це незалежні характеристики.

High-DPI display може бути:

    smartphone
    tablet
    laptop
    desktop monitor

---

# Hover

Media query може перевірити, чи пристрій підтримує hover.

Наприклад:

    @media (hover: hover) {
        .button:hover {
            transform: translateY(-2px);
        }
    }

Це допомагає не покладатися на hover там, де його може не бути.

---

# hover: hover

Означає:

    primary input mechanism
    supports hover

Наприклад:

    @media (hover: hover) {
        .card:hover {
            box-shadow: 0 10px 30px rgb(0 0 0 / 0.15);
        }
    }

---

# hover: none

Означає:

    primary input mechanism
    does not support hover

Наприклад:

    @media (hover: none) {
        .tooltip {
            ...
        }
    }

---

# Pointer

`pointer` описує точність primary pointing device.

Можливі:

    none
    coarse
    fine

---

# pointer: fine

`fine` означає точний pointing device.

Наприклад:

    mouse
    stylus у певних сценаріях

---

# pointer: coarse

`coarse` означає менш точний pointing device.

Типовий приклад:

    finger / touch

---

# pointer: none

Немає primary pointing device.

---

# Hover + Pointer

Часто корисно комбінувати:

    @media (hover: hover) and (pointer: fine) {
        .button:hover {
            transform: scale(1.02);
        }
    }

Це означає:

    hover підтримується
    AND
    pointing device точний

---

# any-hover

`any-hover` перевіряє, чи будь-який доступний pointing mechanism підтримує hover.

Можливі:

    hover
    none

Наприклад:

    @media (any-hover: hover) {
        ...
    }

---

# any-pointer

`any-pointer` перевіряє характеристики будь-якого доступного pointing device.

Можливі:

    none
    coarse
    fine

---

# pointer vs any-pointer

`pointer`:

    primary pointing device

`any-pointer`:

    будь-який доступний pointing device

Це важливо на пристроях, які можуть мати кілька способів введення.

Наприклад:

    touchscreen
    mouse
    stylus

---

# prefers-color-scheme

Media query може визначити бажану color scheme користувача.

Можливі:

    light
    dark

Наприклад:

    @media (prefers-color-scheme: dark) {
        :root {
            color-scheme: dark;
        }

        body {
            background: #111;
            color: #fff;
        }
    }

---

# Light / Dark Mode

Базовий CSS:

    :root {
        color-scheme: light dark;
    }

Потім:

    @media (prefers-color-scheme: dark) {
        body {
            background: #111;
            color: #fff;
        }
    }

Browser/user preference може визначати активну схему.

---

# prefers-reduced-motion

Це одна з найважливіших accessibility media queries.

Вона дозволяє визначити, чи користувач просить зменшити motion.

Наприклад:

    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms;
            animation-iteration-count: 1;
            transition-duration: 0.01ms;
            scroll-behavior: auto;
        }
    }

Ідея:

    менше animation
    менше transition
    менше руху

---

# prefers-reduced-motion

Можливі значення:

    reduce
    no-preference

Наприклад:

    @media (prefers-reduced-motion: reduce) {
        .hero {
            animation: none;
        }
    }

---

# prefers-contrast

Media query може враховувати preference користувача щодо contrast.

Наприклад:

    @media (prefers-contrast: more) {
        .card {
            border-width: 2px;
        }
    }

Можливі значення та підтримка залежать від browser/platform.

---

# forced-colors

`forced-colors` дозволяє адаптувати UI до режимів, де user agent/OS примусово контролює кольори.

Наприклад:

    @media (forced-colors: active) {
        .button {
            border: 1px solid ButtonText;
        }
    }

Це особливо важливо для accessibility та системних режимів високого контрасту.

---

# print

Media queries можна використовувати для друку.

Наприклад:

    @media print {
        .navigation {
            display: none;
        }
    }

На screen:

    navigation visible

На print:

    navigation hidden

---

# Print Styles

Типовий приклад:

    @media print {
        body {
            color: black;
            background: white;
        }

        nav,
        footer {
            display: none;
        }
    }

Print CSS часто використовується для:

    articles
    invoices
    reports
    documentation
    CV
    receipts

---

# screen

Можна явно вказати screen:

    @media screen and (max-width: 768px) {
        ...
    }

Але для більшості сучасних responsive layout це не обов'язково.

Часто достатньо:

    @media (max-width: 768px) {
        ...
    }

---

# Media Type

Історично media query могла використовувати media types:

    all
    print
    screen

Наприклад:

    @media screen {
        ...
    }

    @media print {
        ...
    }

Для звичайного responsive CSS зазвичай працюють без явного `screen`.

---

# Media Features vs Media Types

Media type:

    screen
    print

Media feature:

    width
    height
    hover
    pointer
    orientation

Наприклад:

    @media screen and (min-width: 768px) {
        ...
    }

Тут:

    screen
        → media type

    min-width
        → media feature

---

# Multiple Features

Наприклад:

    @media (
        min-width: 768px
    ) and (
        orientation: landscape
    ) and (
        hover: hover
    ) {
        ...
    }

Усі три умови повинні бути true.

---

# Complex Media Query

Наприклад:

    @media (
        width >= 768px
    ) and (
        orientation: landscape
    ) and (
        hover: hover
    ) {
        .menu {
            display: flex;
        }
    }

---

# Media Query та CSS Variables

CSS variables можна використовувати всередині media query.

    :root {
        --spacing: 1rem;
    }

    @media (min-width: 768px) {
        :root {
            --spacing: 2rem;
        }
    }

Потім:

    .section {
        padding: var(--spacing);
    }

---

# Responsive Design Tokens

Наприклад:

    :root {
        --page-padding: 1rem;
        --section-spacing: 3rem;
    }

    @media (min-width: 768px) {
        :root {
            --page-padding: 2rem;
            --section-spacing: 5rem;
        }
    }

Це дозволяє централізовано змінювати design system.

---

# Media Queries та Grid

Наприклад:

    .cards {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    @media (min-width: 700px) {
        .cards {
            grid-template-columns:
                repeat(2, 1fr);
        }
    }

    @media (min-width: 1100px) {
        .cards {
            grid-template-columns:
                repeat(3, 1fr);
        }
    }

---

# Media Queries та Flexbox

Наприклад:

    .header {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    @media (min-width: 768px) {
        .header {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
    }

Mobile:

    column

Desktop:

    row

---

# Media Queries та Navigation

Наприклад:

    .navigation {
        display: none;
    }

    @media (min-width: 768px) {
        .navigation {
            display: flex;
        }
    }

Але mobile menu може потребувати JavaScript для:

    open
    close
    toggle
    focus management

Media query відповідає лише за CSS layout/visibility.

---

# Media Queries та Typography

Наприклад:

    h1 {
        font-size: 2rem;
    }

    @media (min-width: 768px) {
        h1 {
            font-size: 3rem;
        }
    }

Але часто fluid typography може бути кращою:

    h1 {
        font-size:
            clamp(2rem, 5vw, 4rem);
    }

Тобто media query не завжди необхідна.

---

# Media Queries та Spacing

Наприклад:

    .section {
        padding-block: 2rem;
    }

    @media (min-width: 768px) {
        .section {
            padding-block: 4rem;
        }
    }

Альтернатива:

    .section {
        padding-block:
            clamp(2rem, 5vw, 4rem);
    }

---

# Media Query vs clamp()

Media query:

    @media (min-width: 768px) {
        .title {
            font-size: 3rem;
        }
    }

`clamp()`:

    .title {
        font-size:
            clamp(2rem, 5vw, 3rem);
    }

Media query:

    discrete change

`clamp()`:

    fluid change

---

# Media Query vs auto-fit

Media query:

    @media (min-width: 900px) {
        .cards {
            grid-template-columns:
                repeat(3, 1fr);
        }
    }

Grid:

    grid-template-columns:
        repeat(
            auto-fit,
            minmax(250px, 1fr)
        );

Media query:

    explicit breakpoint

`auto-fit`:

    intrinsic adaptation

---

# Коли потрібна Media Query

Media query добре підходить, коли потрібно змінити:

    layout structure
    navigation mode
    sidebar position
    number of explicit columns
    component arrangement
    visibility
    major spacing
    typography scale
    interaction-related styles

---

# Коли Media Query може бути непотрібною

Не завжди потрібно:

    @media (max-width: ...)

для простого resizing.

Можна використовувати:

    flex-wrap
    auto-fit
    minmax()
    min()
    max()
    clamp()
    percentage
    rem
    vw

Наприклад:

    .cards {
        display: grid;
        grid-template-columns:
            repeat(
                auto-fit,
                minmax(250px, 1fr)
            );
    }

---

# Media Queries та Container Queries

Media query:

    @media (min-width: 800px) {
        ...
    }

реагує на:

    viewport

Container query:

    @container (min-width: 500px) {
        ...
    }

реагує на:

    container

Різниця:

    viewport
        ↓
    @media

    component container
        ↓
    @container

---

# Viewport-Based Responsive Design

Наприклад:

    @media (min-width: 768px) {
        .card {
            display: grid;
            grid-template-columns:
                200px 1fr;
        }
    }

Проблема:

    card може бути всередині
    вузького sidebar

навіть якщо viewport великий.

Container query може бути кращою для component-level responsiveness.

---

# Media Query та Accessibility

Media queries можуть покращувати accessibility.

Наприклад:

    prefers-reduced-motion

    prefers-contrast

    forced-colors

    prefers-color-scheme

Responsive design повинен враховувати не тільки screen size, а й user preferences.

---

# User Preferences

CSS може адаптуватися до preferences користувача.

Наприклад:

    dark mode
    reduced motion
    contrast
    forced colors

Це важлива частина сучасного CSS.

---

# prefers-color-scheme Example

    :root {
        --background: white;
        --text: black;
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --background: #111;
            --text: white;
        }
    }

    body {
        background: var(--background);
        color: var(--text);
    }

---

# prefers-reduced-motion Example

    .modal {
        transition:
            transform 300ms ease,
            opacity 300ms ease;
    }

    @media (prefers-reduced-motion: reduce) {
        .modal {
            transition: none;
        }
    }

---

# prefers-reduced-motion: no-preference

Можна явно перевірити:

    @media (prefers-reduced-motion: no-preference) {
        .hero {
            animation: fade-in 500ms ease;
        }
    }

Це хороший підхід для animation enhancement.

---

# Progressive Enhancement

Базовий CSS:

    .cards {
        display: block;
    }

Ширший viewport:

    @media (min-width: 768px) {
        .cards {
            display: grid;
            grid-template-columns:
                repeat(3, 1fr);
        }
    }

Ідея:

    basic functionality
        ↓
    enhanced layout

---

# Media Query та JavaScript

Media query — це CSS-механізм.

JavaScript також може перевіряти media conditions через:

    window.matchMedia()

Наприклад:

    const mediaQuery = window.matchMedia(
        "(min-width: 768px)"
    );

    console.log(mediaQuery.matches);

Результат:

    true
    або
    false

---

# matchMedia()

`matchMedia()` повертає `MediaQueryList`.

Наприклад:

    const query = window.matchMedia(
        "(max-width: 768px)"
    );

    if (query.matches) {
        console.log("Mobile layout");
    }

JavaScript може реагувати на зміни:

    query.addEventListener("change", (event) => {
        console.log(event.matches);
    });

---

# CSS vs JavaScript Media Query

CSS:

    @media (max-width: 768px) {
        .menu {
            display: none;
        }
    }

Використовуємо для:

    styling
    layout
    visual behavior

JavaScript:

    window.matchMedia(
        "(max-width: 768px)"
    );

Використовуємо, коли потрібно змінити:

    application behavior

Не потрібно використовувати JavaScript там, де достатньо CSS.

---

# Типові помилки

❌ Створювати breakpoint для кожного device.

    iPhone
    iPad
    Android
    laptop
    desktop

Краще:

    content-based breakpoints

---

❌ Використовувати тільки `max-width` для всього responsive CSS.

Mobile-first часто простіше будувати через:

    base styles
    +
    min-width

---

❌ Створювати занадто багато media queries.

Це ускладнює:

    cascade
    debugging
    maintenance

---

❌ Використовувати media query там, де краще `clamp()`.

Наприклад:

    @media (min-width: 768px) {
        h1 {
            font-size: 3rem;
        }
    }

може бути замінено:

    h1 {
        font-size:
            clamp(2rem, 5vw, 3rem);
    }

якщо потрібен саме fluid scaling.

---

❌ Використовувати media query там, де Grid може адаптуватися сам.

Замість:

    @media (max-width: 700px) {
        .cards {
            grid-template-columns: 1fr;
        }
    }

можна іноді:

    .cards {
        grid-template-columns:
            repeat(
                auto-fit,
                minmax(250px, 1fr)
            );
    }

---

❌ Вважати, що media query змінює specificity.

Не змінює.

Працюють:

    cascade
    specificity
    source order

---

❌ Забувати про overlapping queries.

Наприклад:

    @media (min-width: 600px) { ... }

    @media (min-width: 800px) { ... }

При:

    900px

обидві умови true.

---

❌ Використовувати `!important` для виправлення media query cascade.

Спочатку перевір:

    specificity
    source order
    overlapping conditions

---

❌ Вважати orientation типом device.

    portrait ≠ phone

    landscape ≠ desktop

---

❌ Використовувати hover без перевірки input capabilities.

Наприклад:

    .button:hover {
        ...
    }

Для складнішої interaction logic може бути корисно:

    @media (hover: hover) {
        .button:hover {
            ...
        }
    }

---

# Debugging Media Queries

Якщо media query не працює:

    1. Перевір condition.
        ↓
    2. Перевір viewport width.
        ↓
    3. Перевір specificity.
        ↓
    4. Перевір source order.
        ↓
    5. Перевір інші media queries.
        ↓
    6. Перевір inheritance.
        ↓
    7. Перевір DevTools.

---

# DevTools

У browser DevTools можна:

    змінювати viewport width
    змінювати viewport height
    перевіряти active CSS
    бачити crossed-out rules
    перевіряти media queries
    тестувати orientation
    тестувати responsive layout

---

# Debugging Example

CSS:

    .box {
        color: blue;
    }

    @media (min-width: 768px) {
        .box {
            color: red;
        }
    }

Viewport:

    500px

Очікуємо:

    blue

Viewport:

    800px

Очікуємо:

    red

Якщо бачимо:

    blue

на 800px, перевіряємо:

    specificity
    source order
    selector
    stylesheet loading

---

# Mobile-First Media Query Pattern

Рекомендований базовий шаблон:

    .layout {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    @media (min-width: 768px) {
        .layout {
            grid-template-columns:
                2fr 1fr;
            gap: 2rem;
        }
    }

Логіка:

    mobile
        ↓
    simple layout

    larger viewport
        ↓
    enhanced layout

---

# Three-Level Responsive Pattern

    .cards {
        display: grid;
        grid-template-columns: 1fr;
    }

    @media (min-width: 700px) {
        .cards {
            grid-template-columns:
                repeat(2, 1fr);
        }
    }

    @media (min-width: 1100px) {
        .cards {
            grid-template-columns:
                repeat(3, 1fr);
        }
    }

---

# Range-Based Pattern

    .layout {
        display: block;
    }

    @media (768px <= width < 1200px) {
        .layout {
            display: grid;
            grid-template-columns:
                2fr 1fr;
        }
    }

    @media (width >= 1200px) {
        .layout {
            display: grid;
            grid-template-columns:
                3fr 1fr;
        }
    }

---

# Responsive Navigation Example

    .nav {
        display: none;
    }

    .menu-button {
        display: block;
    }

    @media (min-width: 768px) {
        .nav {
            display: flex;
        }

        .menu-button {
            display: none;
        }
    }

Mobile:

    menu button

Desktop:

    full navigation

JavaScript може керувати:

    menu open
    menu close
    focus
    accessibility state

---

# Responsive Sidebar Example

    .layout {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    @media (min-width: 900px) {
        .layout {
            grid-template-columns:
                minmax(0, 1fr)
                300px;
        }
    }

Mobile:

    Main
    Sidebar

Desktop:

    Main | Sidebar

---

# Responsive Cards Example

    .cards {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    @media (min-width: 600px) {
        .cards {
            grid-template-columns:
                repeat(2, 1fr);
        }
    }

    @media (min-width: 1000px) {
        .cards {
            grid-template-columns:
                repeat(3, 1fr);
        }
    }

---

# Responsive Typography Example

    h1 {
        font-size: 2rem;
    }

    @media (min-width: 768px) {
        h1 {
            font-size: 3rem;
        }
    }

Або fluid:

    h1 {
        font-size:
            clamp(2rem, 5vw, 3rem);
    }

---

# Responsive Spacing Example

    .section {
        padding-block: 2rem;
    }

    @media (min-width: 768px) {
        .section {
            padding-block: 4rem;
        }
    }

Або:

    .section {
        padding-block:
            clamp(2rem, 5vw, 4rem);
    }

---

# Responsive Color Scheme

    :root {
        --background: #ffffff;
        --text: #111111;
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --background: #111111;
            --text: #ffffff;
        }
    }

    body {
        background: var(--background);
        color: var(--text);
    }

---

# Responsive Motion

    .button {
        transition:
            transform 200ms ease;
    }

    @media (prefers-reduced-motion: reduce) {
        .button {
            transition: none;
        }
    }

---

# Print Example

    @media print {
        nav,
        footer,
        .menu-button {
            display: none;
        }

        body {
            color: black;
            background: white;
        }
    }

---

# Практичний Responsive CSS

    .layout {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    @media (min-width: 768px) {
        .layout {
            grid-template-columns:
                minmax(0, 2fr)
                minmax(200px, 1fr);

            gap: 2rem;
        }
    }

    @media (min-width: 1200px) {
        .layout {
            gap: 3rem;
        }
    }

---

# Media Query Checklist

Перед створенням media query запитай себе:

    □ Чи справді layout потребує зміни?
    □ Чи можна використати Flexbox?
    □ Чи можна використати Grid?
    □ Чи можна використати flex-wrap?
    □ Чи можна використати minmax()?
    □ Чи можна використати auto-fit?
    □ Чи можна використати clamp()?
    □ Чи можна використати min()?
    □ Чи можна використати max()?
    □ Чи breakpoint визначений content?
    □ Чи потрібен mobile-first?
    □ Чи не конфліктує правило з іншою media query?
    □ Чи перевірена specificity?
    □ Чи перевірений source order?
    □ Чи врахована accessibility?

---

# Media Query Decision Tree

Потрібно адаптувати layout?

    ↓

Чи можна вирішити через normal flow?

    YES → normal flow

    NO
    ↓

Чи можна через Flexbox?

    YES → Flexbox

    NO
    ↓

Чи можна через Grid?

    YES → Grid

    NO
    ↓

Чи можна через intrinsic sizing?

    YES → minmax / auto-fit / clamp / min / max

    NO
    ↓

Чи потрібно змінити layout
на певній ширині?

    YES
    ↓

Media Query

---

# Питання зі співбесіди

Що таке media query?

Для чого використовується `@media`?

Який базовий синтаксис media query?

Що таке media feature?

Що робить `min-width`?

Що робить `max-width`?

Чим `min-width` відрізняється від `max-width`?

Що таке breakpoint?

Як визначити хороший breakpoint?

Чому breakpoint не повинен обов'язково відповідати конкретному device?

Що таке content-based breakpoint?

Що таке mobile-first?

Чому mobile-first часто використовує `min-width`?

Що таке desktop-first?

Коли використовують `max-width`?

Що робить `and` у media query?

Що означає comma між media queries?

Що робить `not`?

Що робить `or`?

Що таке range syntax?

Як записати:

    min-width: 768px

через range syntax?

Як записати:

    max-width: 767px

через range syntax?

Як перевірити viewport height?

Що таке `orientation`?

Яка різниця між:

    portrait
    landscape

Що таке `aspect-ratio` у media query?

Що таке `hover` media feature?

Що таке `pointer`?

Яка різниця між:

    pointer
    any-pointer

Яка різниця між:

    hover
    any-hover

Що таке `prefers-color-scheme`?

Що таке `prefers-reduced-motion`?

Чому `prefers-reduced-motion` важливий для accessibility?

Що таке `prefers-contrast`?

Що таке `forced-colors`?

Як створити print styles?

Що таке `@media print`?

Чи змінює media query specificity?

Як працює cascade всередині media query?

Що відбувається, коли дві media queries одночасно true?

Чому source order важливий?

Коли краще використати media query?

Коли можна обійтися без media query?

Чим media query відрізняється від `clamp()`?

Чим media query відрізняється від `auto-fit`?

Чим `@media` відрізняється від `@container`?

Що таке `window.matchMedia()`?

Коли JavaScript може використовувати `matchMedia()`?

Чому не потрібно використовувати JavaScript там, де достатньо CSS?

---

# Шлях

## 🟢 Core (обов'язково знати)

Що таке Media Query.

`@media`.

Media feature.

`min-width`.

`max-width`.

Viewport.

Breakpoint.

Responsive design.

Mobile-first.

Desktop-first.

`min-height`.

`max-height`.

`orientation`.

`and`.

Comma-separated queries.

Основи range syntax.

Cascade у media queries.

Specificity у media queries.

Source order.

Multiple media queries.

Overlapping media queries.

Responsive Grid.

Responsive Flexbox.

Media queries для:

    layout
    columns
    spacing
    typography
    navigation

`@media print`.

---

## 🔵 Junior

Комбінування media features.

Range syntax.

    width >= ...
    width < ...
    ... <= width < ...

`orientation`.

`aspect-ratio`.

`hover`.

`pointer`.

`any-hover`.

`any-pointer`.

`prefers-color-scheme`.

`prefers-reduced-motion`.

`prefers-contrast`.

`forced-colors`.

Mobile-first architecture.

Content-based breakpoints.

Breakpoint strategy.

Media query + Flexbox.

Media query + Grid.

Media query + CSS variables.

Media query + responsive typography.

Media query + responsive spacing.

Розуміння, коли media query не потрібна.

Розуміння cascade при overlapping queries.

Основи:

    window.matchMedia()

---

## 🟠 Middle

Advanced breakpoint architecture.

Content-driven responsive systems.

Container Queries.

Вибір між:

    @media
    @container
    intrinsic layout

Advanced user preference queries.

Accessibility-oriented responsive CSS.

Reduced motion strategy.

Forced colors strategy.

Contrast strategy.

Responsive design tokens.

CSS custom properties + media queries.

Fluid design + breakpoints.

Комбінація:

    clamp()
    min()
    max()
    minmax()
    auto-fit
    media queries

Complex responsive components.

Responsive navigation architecture.

Print styles.

Responsive component systems.

`matchMedia()` integration.

CSS/JS responsibility separation.

Progressive enhancement.

---

## 🔴 Senior

Design-system breakpoint architecture.

Large-scale responsive systems.

Component-level responsiveness.

Container Query architecture.

Advanced intrinsic design.

Fluid + breakpoint hybrid systems.

Responsive design tokens.

Adaptive component primitives.

Accessibility-first responsive architecture.

Complex input capability detection.

    hover
    pointer
    any-hover
    any-pointer

Advanced user preference handling.

    color scheme
    reduced motion
    contrast
    forced colors

Internationalization + responsive breakpoints.

Localization-induced layout changes.

Writing modes + responsive design.

Complex print systems.

CSS/JS responsive architecture.

Performance considerations.

Reducing media query complexity.

Avoiding breakpoint fragmentation.

Responsive design system governance.

Trade-offs між:

    mobile-first
    desktop-first
    intrinsic design
    media queries
    container queries
    JavaScript matchMedia

---

# Міні-шпаргалка

## Basic Media Query

    @media (max-width: 768px) {
        .box {
            padding: 1rem;
        }
    }

---

## Mobile-First

    .layout {
        grid-template-columns: 1fr;
    }

    @media (min-width: 768px) {
        .layout {
            grid-template-columns:
                2fr 1fr;
        }
    }

---

## Desktop-First

    .layout {
        grid-template-columns:
            2fr 1fr;
    }

    @media (max-width: 768px) {
        .layout {
            grid-template-columns: 1fr;
        }
    }

---

## and

    @media (
        min-width: 768px
    ) and (
        orientation: landscape
    ) {
        ...
    }

    → AND

---

## Comma

    @media (max-width: 600px),
           (orientation: portrait) {
        ...
    }

    → OR

---

## not

    @media not (prefers-color-scheme: dark) {
        ...
    }

    → NOT

---

## Range

    @media (width >= 768px) {
        ...
    }

    @media (width < 768px) {
        ...
    }

---

## Range Interval

    @media (768px <= width < 1200px) {
        ...
    }

---

## Height

    @media (max-height: 600px) {
        ...
    }

---

## Orientation

    @media (orientation: portrait) {
        ...
    }

    @media (orientation: landscape) {
        ...
    }

---

## Hover

    @media (hover: hover) {
        .button:hover {
            ...
        }
    }

---

## Pointer

    @media (pointer: coarse) {
        ...
    }

    @media (pointer: fine) {
        ...
    }

---

## Color Scheme

    @media (prefers-color-scheme: dark) {
        ...
    }

---

## Reduced Motion

    @media (prefers-reduced-motion: reduce) {
        ...
    }

---

## Print

    @media print {
        ...
    }

---

## Multiple Breakpoints

    .cards {
        grid-template-columns: 1fr;
    }

    @media (min-width: 700px) {
        .cards {
            grid-template-columns:
                repeat(2, 1fr);
        }
    }

    @media (min-width: 1100px) {
        .cards {
            grid-template-columns:
                repeat(3, 1fr);
        }
    }

---

## Fluid Alternative

Замість:

    @media (min-width: 768px) {
        h1 {
            font-size: 3rem;
        }
    }

можна:

    h1 {
        font-size:
            clamp(2rem, 5vw, 3rem);
    }

---

## Intrinsic Alternative

Замість:

    @media (max-width: 700px) {
        .cards {
            grid-template-columns: 1fr;
        }
    }

можна часто:

    .cards {
        display: grid;

        grid-template-columns:
            repeat(
                auto-fit,
                minmax(250px, 1fr)
            );
    }

---

## CSS vs JavaScript

CSS:

    @media (...)

    → styling
    → layout
    → visual adaptation

JavaScript:

    window.matchMedia(...)

    → behavior
    → application logic

---

# Основні правила

    @media
        → створити conditional CSS

    min-width
        → width >= value

    max-width
        → width <= value

    min-height
        → height >= value

    max-height
        → height <= value

    orientation
        → portrait / landscape

    and
        → всі умови true

    comma
        → одна з умов true

    not
        → інвертувати умову

    min-width
        → типовий mobile-first підхід

    max-width
        → типовий desktop-first підхід

    breakpoint
        → точка зміни layout

    content-based breakpoint
        → breakpoint визначається layout/content

    @media print
        → styles для друку

    prefers-color-scheme
        → light / dark preference

    prefers-reduced-motion
        → motion preference

    hover
        → primary hover capability

    pointer
        → primary pointer precision

---

# Головне

• Media Query — це механізм conditional CSS.

• Основний синтаксис:

    @media (condition) {
        ...
    }

• Найчастіше Media Queries використовуються для responsive design.

• `min-width` означає:

    width >= value

• `max-width` означає:

    width <= value

• Mobile-first зазвичай будується так:

    base styles
        +
    @media (min-width: ...)

• Desktop-first часто використовує:

    base styles
        +
    @media (max-width: ...)

• Breakpoint не повинен автоматично означати:

    phone
    tablet
    desktop

• Хороший breakpoint — це точка, де content або layout перестає працювати належним чином.

• Media query не змінює specificity.

• У media queries все одно працюють:

    cascade
    specificity
    source order

• Декілька media queries можуть бути одночасно активними.

• Якщо дві умови true, застосовуються обидва набори правил, а cascade визначає результат.

• `and` означає:

    AND

• Comma-separated media queries означають:

    OR

• `not` інвертує condition.

• Сучасний CSS підтримує range syntax:

    @media (width >= 768px) {
        ...
    }

• Можна перевіряти не тільки width:

    height
    orientation
    aspect-ratio
    hover
    pointer
    color scheme
    reduced motion
    contrast
    forced colors
    resolution

• `prefers-reduced-motion` особливо важливий для accessibility.

• `prefers-color-scheme` дозволяє адаптувати UI до light/dark preference.

• `hover` та `pointer` дозволяють враховувати можливості input device.

• `@media print` дозволяє створювати print-specific CSS.

• Не потрібно використовувати media query там, де краще працюють:

    flex-wrap
    auto-fit
    minmax()
    clamp()
    min()
    max()

• Хороший responsive CSS часто використовує комбінацію:

    fluid layout
        +
    intrinsic sizing
        +
    few meaningful breakpoints

• Media query реагує на viewport.

• Container Query реагує на container.

• CSS повинен відповідати за layout та styling.

• JavaScript `matchMedia()` потрібен тоді, коли зміна viewport/user preference повинна вплинути саме на application behavior.

• Не варто використовувати JavaScript для задач, які повністю вирішуються CSS.

• Основна модель:

    base CSS
        ↓
    responsive / fluid layout
        ↓
    content-based breakpoint
        ↓
    @media
        ↓
    larger / smaller layout
        ↓
    user preferences
        ↓
    accessibility adaptation

• Головна мета Media Queries — не створити окремий CSS для кожного пристрою, а **адаптувати interface до умов, у яких користувач переглядає та взаємодіє зі сторінкою**.