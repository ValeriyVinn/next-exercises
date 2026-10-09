# 01. Responsive Layout

Responsive Layout (адаптивна верстка) — це підхід до створення веб-сторінок, за якого layout автоматично адаптується до різних розмірів екрана, орієнтацій та умов перегляду.

Responsive design потрібен для того, щоб одна веб-сторінка коректно працювала на:

    mobile
    tablet
    laptop
    desktop
    large desktop

Основна ідея:

    один HTML
        ↓
    гнучкий CSS
        ↓
    різні розміри viewport
        ↓
    адаптивний layout

Responsive layout будується переважно за допомогою:

    flexible widths
    relative units
    max-width
    min-width
    flexbox
    grid
    percentages
    min()
    max()
    clamp()
    media queries
    responsive images
    responsive typography

---

# Ключові поняття

✔ responsive design  
✔ responsive layout  
✔ viewport  
✔ viewport width  
✔ viewport height  
✔ fluid layout  
✔ fixed layout  
✔ flexible layout  
✔ adaptive layout  
✔ mobile layout  
✔ desktop layout  
✔ breakpoint  
✔ container  
✔ max-width  
✔ min-width  
✔ width: 100%  
✔ percentage  
✔ relative units  
✔ `vw`  
✔ `vh`  
✔ `rem`  
✔ `em`  
✔ Flexbox  
✔ CSS Grid  
✔ wrapping  
✔ flexible columns  
✔ fluid spacing  
✔ responsive typography  
✔ responsive images  
✔ media queries  
✔ mobile-first  
✔ desktop-first  
✔ overflow  
✔ horizontal scrolling  

---

# Що потрібно пам'ятати

• Responsive design дозволяє одному сайту адаптуватися до різних viewport.

• Не потрібно створювати окремий HTML для mobile та desktop.

• Responsive layout зазвичай будується через CSS.

• Не варто прив'язувати layout тільки до конкретних пристроїв.

• Краще будувати layout від content та available space.

• `width: 100%` дозволяє елементу займати доступну ширину батьківського контейнера.

• `max-width` обмежує максимальну ширину.

• `min-width` встановлює мінімально допустиму ширину.

• Percentage дозволяє задавати розміри відносно containing block.

• Flexbox добре підходить для одновимірних layout.

• Grid добре підходить для двовимірних layout.

• `flex-wrap` дозволяє елементам переноситися на новий рядок.

• `min()`, `max()` та `clamp()` допомагають створювати fluid layout.

• Responsive layout повинен враховувати overflow.

• Не слід будувати responsive design тільки навколо `320px`, `768px`, `1024px` тощо.

• Breakpoint краще визначати тоді, коли content перестає нормально розміщуватися.

---

# Responsive Design

Responsive design — це підхід, за якого interface змінює layout відповідно до доступного простору.

Наприклад:

    desktop

    ┌─────────────────────────────────────┐
    │              HEADER                 │
    ├───────────────┬─────────────────────┤
    │               │                     │
    │   SIDEBAR     │       CONTENT       │
    │               │                     │
    └───────────────┴─────────────────────┘

На mobile:

    ┌────────────────────┐
    │       HEADER       │
    ├────────────────────┤
    │      CONTENT       │
    │                    │
    ├────────────────────┤
    │      SIDEBAR       │
    └────────────────────┘

Тобто layout може змінити структуру розташування елементів.

---

# Fixed Layout

Fixed layout використовує фіксовані розміри.

Наприклад:

    .container {
        width: 1000px;
    }

Такий layout може добре виглядати на широкому екрані:

    viewport = 1440px
    container = 1000px

Але на вузькому екрані:

    viewport = 360px
    container = 1000px

виникне horizontal overflow.

Схематично:

    viewport
    ┌───────────────┐
    │               │
    │  ┌─────────────────────────────
    │  │       1000px container
    │  │
    └──┴─────────────────────────────

На mobile це поганий підхід.

---

# Fluid Layout

Fluid layout використовує відносні розміри.

Наприклад:

    .container {
        width: 90%;
    }

Якщо viewport:

    1000px

то:

    90% = 900px

Якщо viewport:

    500px

то:

    90% = 450px

Тобто layout автоматично змінює ширину.

---

# Fixed vs Fluid

Fixed:

    width: 1000px;

Fluid:

    width: 90%;

Responsive layout часто комбінує обидва підходи.

Наприклад:

    width: 90%;
    max-width: 1200px;

Це означає:

    width → fluid
    max-width → controlled

---

# Responsive Container

Один із найпоширеніших шаблонів:

    .container {
        width: 100%;
        max-width: 1200px;
        margin-inline: auto;
        padding-inline: 20px;
    }

На вузькому екрані:

    width: 100%

На широкому:

    max-width: 1200px

Центрування:

    margin-inline: auto;

---

# width: 100%

`width: 100%` означає:

    зайняти 100% доступної ширини

Наприклад:

    .container {
        width: 100%;
    }

Якщо parent має:

    width: 800px;

то child матиме:

    width: 800px;

Якщо parent має:

    width: 400px;

то child матиме:

    width: 400px;

---

# Percentage Width

Percentage width залежить від containing block.

Наприклад:

    .card {
        width: 50%;
    }

Якщо parent:

    width: 1000px;

то:

    card = 500px

Якщо parent:

    width: 600px;

то:

    card = 300px

---

# max-width

`max-width` встановлює верхню межу ширини.

Наприклад:

    .container {
        width: 100%;
        max-width: 1200px;
    }

При viewport:

    500px

container:

    500px

При viewport:

    1000px

container:

    1000px

При viewport:

    1600px

container:

    1200px

---

# max-width + auto margin

Типовий responsive container:

    .container {
        width: 100%;
        max-width: 1200px;
        margin-inline: auto;
    }

Логіка:

    small viewport
        ↓
    width: 100%

    large viewport
        ↓
    max-width: 1200px

    extra space
        ↓
    auto margins

---

# Padding у Container

Часто потрібно залишити простір біля країв viewport.

    .container {
        width: 100%;
        max-width: 1200px;
        margin-inline: auto;
        padding-inline: 20px;
    }

Без padding:

    ┌─────────────────────────┐
    │CONTENT                  │
    └─────────────────────────┘

З padding:

    ┌─────────────────────────┐
    │  CONTENT                │
    └─────────────────────────┘

Content не торкається країв viewport.

---

# box-sizing

Для responsive layout дуже важливо розуміти `box-sizing`.

Зазвичай корисно використовувати:

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

При:

    box-sizing: border-box;

`width` включає:

    content
    padding
    border

Наприклад:

    .box {
        width: 100%;
        padding: 20px;
        border: 2px solid;
        box-sizing: border-box;
    }

Ширина не перевищує:

    100%

через padding та border.

---

# Без border-box

За стандартного:

    box-sizing: content-box;

якщо:

    width: 100%;
    padding: 20px;

то фактична зовнішня ширина може стати більшою за parent.

Це може спричинити:

    horizontal overflow

Тому:

    box-sizing: border-box;

є дуже поширеною базою responsive CSS.

---

# Overflow

Overflow виникає, коли content не поміщається у доступний простір.

Наприклад:

    .box {
        width: 500px;
    }

але viewport:

    320px

Тоді елемент може створити horizontal overflow.

---

# Horizontal Overflow

Небезпечний приклад:

    .container {
        width: 1000px;
    }

на viewport:

    375px

Результат:

    ┌───────────────┐
    │ viewport      │
    │               │
    └───────────────┘
    └────────────────────────────
            1000px

Користувачу доводиться горизонтально прокручувати сторінку.

---

# Overflow-x

Для діагностики іноді використовують:

    body {
        overflow-x: hidden;
    }

Але важливо:

`overflow-x: hidden` не є справжнім виправленням проблеми.

Спочатку потрібно знайти елемент, який створює overflow.

Типові причини:

    fixed width
    large image
    long text
    absolute element
    transform
    negative margin
    flex item
    grid item
    wide table

---

# Responsive Width Strategy

Хороший базовий шаблон:

    width: 100%;
    max-width: 1200px;

Наприклад:

    .container {
        width: 100%;
        max-width: 1200px;
        margin-inline: auto;
        padding-inline: 1rem;
    }

Це один із найважливіших responsive patterns.

---

# Flexbox у Responsive Layout

Flexbox дозволяє створювати гнучкі layout.

Наприклад:

    .cards {
        display: flex;
        gap: 20px;
    }

Але якщо ширини недостатньо:

    .cards {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

Тепер елементи можуть переходити на новий рядок.

---

# flex-wrap

Без:

    flex-wrap

елементи намагатимуться залишитися в одному рядку.

    .cards {
        display: flex;
        flex-wrap: wrap;
    }

Схематично:

    Desktop:

    ┌──────┐ ┌──────┐ ┌──────┐
    │ Card │ │ Card │ │ Card │
    └──────┘ └──────┘ └──────┘

    Mobile:

    ┌────────┐
    │  Card  │
    └────────┘
    ┌────────┐
    │  Card  │
    └────────┘
    ┌────────┐
    │  Card  │
    └────────┘

---

# Flexible Cards

Наприклад:

    .cards {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

    .card {
        flex: 1 1 250px;
    }

Тут:

    flex-grow: 1
    flex-shrink: 1
    flex-basis: 250px

Картки можуть:

    grow
    shrink
    wrap

---

# flex-basis

`flex-basis` задає початковий розмір flex item вздовж main axis.

Наприклад:

    .card {
        flex: 1 1 300px;
    }

Початкова база:

    300px

Але item може змінювати розмір залежно від доступного простору.

---

# Responsive Flex Layout

Наприклад:

    .layout {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
    }

    .main {
        flex: 1 1 600px;
    }

    .sidebar {
        flex: 1 1 250px;
    }

На широкому екрані:

    ┌───────────────────────┬──────────┐
    │         MAIN          │ SIDEBAR  │
    └───────────────────────┴──────────┘

На вузькому:

    ┌──────────────────────────────────┐
    │              MAIN                │
    └──────────────────────────────────┘
    ┌──────────────────────────────────┐
    │             SIDEBAR              │
    └──────────────────────────────────┘

---

# CSS Grid у Responsive Layout

Grid особливо зручний для responsive card layouts.

Наприклад:

    .cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }

Desktop:

    ┌─────┐ ┌─────┐ ┌─────┐
    │  1  │ │  2  │ │  3  │
    └─────┘ └─────┘ └─────┘

---

# Grid + Media Query

Класичний варіант:

    .cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }

    @media (max-width: 768px) {
        .cards {
            grid-template-columns: 1fr;
        }
    }

Desktop:

    3 columns

Mobile:

    1 column

Цей підхід буде детальніше розглядатися у:

    02-media-queries

---

# Grid Auto-Fit

Сучасний responsive pattern:

    .cards {
        display: grid;
        grid-template-columns:
            repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }

Grid автоматично визначає кількість колонок.

Наприклад:

    wide viewport

    ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
    │  1  │ │  2  │ │  3  │ │  4  │
    └─────┘ └─────┘ └─────┘ └─────┘

Вужчий viewport:

    ┌─────┐ ┌─────┐
    │  1  │ │  2  │
    └─────┘ └─────┘
    ┌─────┐ ┌─────┐
    │  3  │ │  4  │
    └─────┘ └─────┘

Ще вужчий:

    ┌─────────┐
    │    1    │
    └─────────┘
    ┌─────────┐
    │    2    │
    └─────────┘

---

# auto-fit

`auto-fit` дозволяє Grid максимально використовувати доступний простір.

    repeat(
        auto-fit,
        minmax(250px, 1fr)
    )

Логіка:

    available space
          ↓
    скільки колонок поміщається?
          ↓
    створити відповідну кількість columns

---

# auto-fill

`auto-fill` також створює адаптивні tracks.

    repeat(
        auto-fill,
        minmax(250px, 1fr)
    )

Відмінність між:

    auto-fit
    auto-fill

полягає у поведінці порожніх tracks.

Для більшості звичайних responsive card layouts:

    auto-fit

часто є простішим вибором.

---

# minmax()

`minmax()` задає мінімальний та максимальний розмір track.

    minmax(250px, 1fr)

означає:

    minimum → 250px
    maximum → 1fr

Наприклад:

    grid-template-columns:
        repeat(auto-fit, minmax(250px, 1fr));

Це дуже потужний responsive pattern.

---

# CSS Functions

Responsive layout часто використовує:

    min()
    max()
    clamp()
    minmax()

Наприклад:

    width: min(100% - 2rem, 1200px);

---

# min()

`min()` повертає менше значення.

Наприклад:

    width: min(100%, 1200px);

Якщо viewport:

    800px

отримаємо:

    800px

Якщо viewport:

    1600px

отримаємо:

    1200px

---

# max()

`max()` повертає більше значення.

Наприклад:

    width: max(300px, 50%);

Буде використано більше з двох значень.

---

# clamp()

`clamp()` дозволяє задати:

    minimum
    preferred
    maximum

Синтаксис:

    clamp(minimum, preferred, maximum)

Наприклад:

    font-size: clamp(1rem, 2vw, 2rem);

Розмір шрифту:

    не менше 1rem
    бажано 2vw
    не більше 2rem

---

# Fluid Width

Responsive layout часто використовує fluid width.

Наприклад:

    .content {
        width: 90%;
        max-width: 1200px;
        margin-inline: auto;
    }

Width змінюється разом із viewport.

---

# Fluid Spacing

Spacing також може бути responsive.

Наприклад:

    .section {
        padding-block: clamp(
            2rem,
            5vw,
            6rem
        );
    }

На маленьких екранах:

    менший padding

На великих:

    більший padding

---

# Relative Units

Responsive layout часто використовує relative units.

Основні:

    %
    rem
    em
    vw
    vh
    vmin
    vmax

---

# Percentage

Percentage часто використовується для width.

    .container {
        width: 90%;
    }

---

# rem

`rem` залежить від root font size.

Наприклад:

    html {
        font-size: 16px;
    }

    .box {
        width: 20rem;
    }

Результат:

    20 × 16px = 320px

`rem` особливо корисний для:

    typography
    spacing
    sizing

---

# em

`em` залежить від font-size відповідного контексту.

Наприклад:

    .parent {
        font-size: 20px;
    }

    .child {
        padding: 1em;
    }

Тоді:

    1em = 20px

У responsive design `em` часто використовується у media queries.

---

# vw

`vw` означає viewport width.

    1vw = 1% viewport width

Наприклад:

    viewport = 1000px

тоді:

    1vw = 10px

---

# vh

`vh` означає viewport height.

    1vh = 1% viewport height

Наприклад:

    viewport height = 800px

тоді:

    1vh = 8px

---

# vmin

`vmin` дорівнює 1% від меншої сторони viewport.

    vmin = min(viewport width, viewport height) / 100

---

# vmax

`vmax` дорівнює 1% від більшої сторони viewport.

    vmax = max(viewport width, viewport height) / 100

---

# Responsive Layout Without Media Queries

Не кожен responsive layout потребує media queries.

Наприклад:

    .cards {
        display: grid;
        grid-template-columns:
            repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
    }

Grid самостійно адаптує кількість колонок.

Інший приклад:

    .container {
        width: 100%;
        max-width: 1200px;
        margin-inline: auto;
        padding-inline: 1rem;
    }

Ще:

    .title {
        font-size: clamp(2rem, 5vw, 4rem);
    }

Тобто responsive поведінку можна створювати не тільки через media queries.

---

# Content-Based Responsiveness

Добрий responsive layout повинен реагувати на:

    available space
    content width
    content length
    component size

а не тільки на:

    phone
    tablet
    laptop
    desktop

Наприклад, якщо navigation перестала поміщатися:

    logo + nav + buttons

це може бути сигналом для breakpoint.

---

# Breakpoint

Breakpoint — це точка, у якій layout змінює свою поведінку.

Наприклад:

    desktop:
    3 columns

    ↓ breakpoint

    mobile:
    1 column

Breakpoint реалізується через:

    @media

Наприклад:

    @media (max-width: 768px) {
        .cards {
            grid-template-columns: 1fr;
        }
    }

---

# Не прив'язуйся до пристроїв

Не варто мислити:

    320px → phone
    768px → tablet
    1024px → laptop

Краще:

    "Коли layout перестає працювати,
     тут потрібен breakpoint."

Наприклад:

    navigation поміщається
        ↓
    нічого не змінюємо

    navigation перестала поміщатися
        ↓
    змінюємо layout

---

# Mobile Layout

На вузькому екрані часто використовують:

    1 column
    full-width buttons
    stacked sections
    wrapped navigation
    smaller gaps
    smaller typography
    reduced padding

Наприклад:

    .layout {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

---

# Desktop Layout

На широкому екрані можна використовувати:

    multiple columns
    sidebar
    larger spacing
    larger typography
    wider containers

Наприклад:

    .layout {
        display: grid;
        grid-template-columns:
            1fr 300px;
        gap: 2rem;
    }

---

# Stacking

Один із найпоширеніших responsive patterns:

Desktop:

    ┌─────────────┬─────────────┐
    │    Main     │   Sidebar   │
    └─────────────┴─────────────┘

Mobile:

    ┌─────────────────────────────┐
    │            Main             │
    └─────────────────────────────┘
    ┌─────────────────────────────┐
    │           Sidebar           │
    └─────────────────────────────┘

Наприклад через Grid:

    .layout {
        display: grid;
        grid-template-columns: 1fr 300px;
    }

    @media (max-width: 768px) {
        .layout {
            grid-template-columns: 1fr;
        }
    }

---

# Navigation

Desktop navigation:

    Logo | Home | About | Services | Contact

На mobile:

    Logo | Menu

Це типовий responsive pattern.

Але важливо:

CSS відповідає за layout.

Для відкриття/закриття mobile menu зазвичай потрібні:

    HTML
    CSS
    JavaScript

---

# Responsive Header

Типовий desktop:

    ┌────────────────────────────────────────┐
    │ LOGO    HOME ABOUT SERVICES     BUTTON │
    └────────────────────────────────────────┘

Mobile:

    ┌──────────────────────────────┐
    │ LOGO                    MENU │
    └──────────────────────────────┘

Header може використовувати:

    display: flex;
    justify-content: space-between;
    align-items: center;

---

# Responsive Sidebar

Desktop:

    ┌──────────────────────┬──────────┐
    │                      │          │
    │       CONTENT        │ SIDEBAR  │
    │                      │          │
    └──────────────────────┴──────────┘

Mobile:

    ┌───────────────────────────────┐
    │           CONTENT             │
    └───────────────────────────────┘

    ┌───────────────────────────────┐
    │           SIDEBAR             │
    └───────────────────────────────┘

Sidebar може перейти під content.

---

# Responsive Cards

Desktop:

    ┌─────┐ ┌─────┐ ┌─────┐
    │  1  │ │  2  │ │  3  │
    └─────┘ └─────┘ └─────┘

Mobile:

    ┌─────────┐
    │    1    │
    └─────────┘
    ┌─────────┐
    │    2    │
    └─────────┘
    ┌─────────┐
    │    3    │
    └─────────┘

Responsive Grid:

    .cards {
        display: grid;
        grid-template-columns:
            repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
    }

---

# Responsive Columns

Flexbox:

    .columns {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .column {
        flex: 1 1 300px;
    }

Grid:

    .columns {
        display: grid;
        grid-template-columns:
            repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
    }

Обидва підходи можуть створювати responsive columns.

---

# Responsive Gap

Gap також може бути fluid.

    .layout {
        gap: clamp(1rem, 3vw, 3rem);
    }

Малий viewport:

    smaller gap

Великий viewport:

    larger gap

---

# Responsive Padding

Наприклад:

    .section {
        padding-inline:
            clamp(1rem, 5vw, 5rem);
    }

Це дозволяє уникати надмірного padding на mobile.

---

# Responsive Height

З height потрібно бути обережним.

Небажано без необхідності:

    height: 100vh;

Особливо для mobile interface, де browser UI може впливати на доступну висоту viewport.

Краще, коли можливо:

    min-height: 100vh;

або сучасні viewport units:

    svh
    lvh
    dvh

Наприклад:

    .hero {
        min-height: 100dvh;
    }

---

# Viewport Units

Сучасні viewport units:

    svh
    lvh
    dvh

Їхня ідея:

    svh → small viewport height
    lvh → large viewport height
    dvh → dynamic viewport height

Для mobile layout `dvh` часто корисний там, де потрібно врахувати динамічний стан browser UI.

---

# Responsive Text

Responsive layout стосується не тільки width.

Typography також повинна адаптуватися.

Наприклад:

    h1 {
        font-size: clamp(
            2rem,
            5vw,
            4rem
        );
    }

Це дозволяє:

    minimum
    fluid preferred size
    maximum

---

# Responsive Images

Зображення не повинні виходити за межі container.

Базове правило:

    img {
        max-width: 100%;
        height: auto;
    }

Якщо image:

    width = 1200px

а container:

    width = 400px

`max-width: 100%` дозволить image зменшитися до:

    400px

---

# Image Overflow

Небезпечний варіант:

    img {
        width: 1000px;
    }

на mobile.

Може виникнути:

    horizontal overflow

Краще:

    img {
        max-width: 100%;
        height: auto;
    }

Responsive images будуть детальніше розглядатися у:

    04-responsive-images

---

# Long Text

Довгі слова або URL можуть створювати overflow.

Наприклад:

    https://example.com/very/very/very/long/path/...

У деяких випадках потрібно:

    overflow-wrap: anywhere;

або:

    overflow-wrap: break-word;

---

# Responsive Tables

Таблиці можуть бути проблемними на mobile.

Наприклад:

    10 columns
    ↓
    narrow viewport

Один із підходів:

    .table-wrapper {
        overflow-x: auto;
    }

    .table {
        min-width: 600px;
    }

Тоді таблиця може горизонтально прокручуватися всередині wrapper.

---

# Container Query

Responsive behavior може залежати не від viewport, а від розміру container.

Це називається:

    Container Queries

Наприклад:

    .card-container {
        container-type: inline-size;
    }

Потім:

    @container (min-width: 500px) {
        .card {
            display: grid;
            grid-template-columns: 200px 1fr;
        }
    }

Це дозволяє component адаптуватися до власного контейнера.

Container Queries будуть розглядатися глибше у сучасному CSS.

---

# Viewport vs Container

Viewport:

    розмір browser viewport

Container:

    розмір конкретного parent element

Viewport media query:

    @media (...)

Container query:

    @container (...)

Різниця:

    viewport → сторінка

    container → компонент

---

# Intrinsic Layout

Intrinsic layout — layout, який значною мірою визначається самим content та доступним простором.

Наприклад:

    minmax()
    auto-fit
    auto-fill
    min-content
    max-content
    fit-content()

Цей підхід дозволяє створювати більш fluid layout.

---

# min-content

`min-content` — приблизно найменший розмір, до якого content може бути стиснутий без неприйнятного переповнення.

Наприклад:

    grid-template-columns:
        min-content 1fr;

---

# max-content

`max-content` прагне зайняти ширину, необхідну для content без переносу.

Наприклад:

    width: max-content;

Потрібно використовувати обережно, тому що великий content може створити overflow.

---

# fit-content()

`fit-content()` дозволяє обмежити розмір content певним maximum.

Наприклад:

    width: fit-content(300px);

Це частина intrinsic sizing.

---

# Responsive Layout Pattern

Один із хороших універсальних шаблонів:

    .container {
        width: min(
            100% - 2rem,
            1200px
        );

        margin-inline: auto;
    }

Тут:

    100% - 2rem
        ↓
    залишає бокові відступи

    1200px
        ↓
    обмежує максимальну ширину

---

# Що відбувається

Якщо viewport:

    500px

то приблизна ширина:

    500px - 2rem

Якщо viewport:

    1600px

то:

    1200px

Таким чином container:

    fluid на малих екранах
    constrained на великих

---

# Modern Container Pattern

Ще один варіант:

    .container {
        width: min(100% - 2rem, 1200px);
        margin-inline: auto;
    }

Цей шаблон дуже часто можна побачити у сучасних CSS-проєктах.

---

# Full-Width Section + Constrained Content

Часто section повинна займати всю ширину viewport, а content — бути обмеженим.

HTML:

    <section class="section">
        <div class="container">
            Content
        </div>
    </section>

CSS:

    .section {
        width: 100%;
    }

    .container {
        width: min(100% - 2rem, 1200px);
        margin-inline: auto;
    }

Схема:

    ┌───────────────────────────────────────┐
    │               SECTION                 │
    │   ┌───────────────────────────────┐   │
    │   │           CONTENT             │   │
    │   └───────────────────────────────┘   │
    └───────────────────────────────────────┘

---

# Responsive Layout Architecture

Типова структура сторінки:

    <body>

        <header>
            ...
        </header>

        <main>

            <section>
                <div class="container">
                    ...
                </div>
            </section>

            <section>
                <div class="container">
                    ...
                </div>
            </section>

        </main>

        <footer>
            ...
        </footer>

    </body>

CSS:

    .container {
        width: min(100% - 2rem, 1200px);
        margin-inline: auto;
    }

Це створює єдину систему horizontal layout.

---

# Responsive Layout та CSS Variables

Responsive spacing можна централізувати через CSS variables.

    :root {
        --container-max-width: 1200px;
        --page-padding: 1rem;
        --section-gap: 4rem;
    }

    .container {
        width: min(
            100% - 2 * var(--page-padding),
            var(--container-max-width)
        );

        margin-inline: auto;
    }

Перевага:

    один параметр
        ↓
    змінює весь layout

---

# Responsive Spacing Scale

Наприклад:

    :root {
        --space-1: 0.25rem;
        --space-2: 0.5rem;
        --space-3: 1rem;
        --space-4: 1.5rem;
        --space-5: 2rem;
        --space-6: 3rem;
    }

Потім:

    .section {
        padding-block: var(--space-6);
    }

У великому проєкті spacing scale допомагає підтримувати consistency.

---

# Responsive Layout та `gap`

Для Flexbox:

    .navigation {
        display: flex;
        gap: 1rem;
    }

Для Grid:

    .cards {
        display: grid;
        gap: 1rem;
    }

`gap` часто кращий за ручні:

    margin-right
    margin-bottom

для побудови відстаней між елементами layout.

---

# Responsive Alignment

Flexbox:

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

Grid:

    .layout {
        display: grid;
        place-items: center;
    }

Responsive layout не означає, що alignment повинен змінюватися на кожному breakpoint.

Часто достатньо правильно вибрати:

    flex
    grid
    gap
    alignment
    wrapping

---

# Responsive Order

Flexbox та Grid дозволяють змінювати порядок елементів.

Наприклад:

    .sidebar {
        order: 2;
    }

Але `order` потрібно використовувати обережно.

Візуальний порядок не повинен суперечити логічному порядку контенту та accessibility.

HTML source order повинен залишатися логічним.

---

# Source Order

Хороший HTML:

    <main>
        <article>
            Main content
        </article>

        <aside>
            Related content
        </aside>
    </main>

Потім CSS може розташувати їх:

    desktop → side by side
    mobile  → stacked

Це краще, ніж створювати окремі desktop/mobile copies одного content.

---

# Не дублюй HTML

Поганий підхід:

    desktop-navigation
    mobile-navigation

з однаковим контентом.

Це може призвести до:

    duplicate content
    synchronization problems
    accessibility problems
    unnecessary JavaScript

Краще:

    один HTML
        ↓
    responsive CSS

А JavaScript використовувати лише там, де потрібна поведінка.

---

# Responsive Design Principles

## 1. Flexible

Елементи повинні вміти змінювати розмір.

Наприклад:

    width: 100%;

---

## 2. Fluid

Layout повинен використовувати доступний простір.

Наприклад:

    width: min(100% - 2rem, 1200px);

---

## 3. Constrained

На великих екранах content не повинен ставати надмірно широким.

Наприклад:

    max-width: 1200px;

---

## 4. Wrapping

Елементи повинні мати можливість переноситися.

Наприклад:

    flex-wrap: wrap;

---

## 5. Content-aware

Layout повинен адаптуватися до content.

---

## 6. Accessible

Responsive layout не повинен ламати:

    keyboard navigation
    reading order
    focus
    semantics
    touch targets

---

# Responsive Layout Checklist

Перед завершенням layout перевір:

    □ чи немає fixed width без необхідності
    □ чи є max-width для великих екранів
    □ чи немає horizontal overflow
    □ чи можуть flex items wrap
    □ чи адаптується Grid
    □ чи не виходять images за межі
    □ чи читається текст на mobile
    □ чи достатній spacing
    □ чи не занадто вузький content
    □ чи зберігається логічний source order
    □ чи працює keyboard navigation
    □ чи не залежить layout від одного конкретного device

---

# Типові помилки

❌ Використовувати великі fixed widths.

    .container {
        width: 1200px;
    }

Особливо погано для mobile.

Краще:

    .container {
        width: 100%;
        max-width: 1200px;
    }

---

❌ Фіксувати height без необхідності.

    .section {
        height: 500px;
    }

Content може стати більшим і вийти за межі.

Часто краще:

    .section {
        min-height: 500px;
    }

---

❌ Встановлювати `width: 100%` разом із padding без `border-box`.

    .box {
        width: 100%;
        padding: 2rem;
    }

Без правильного `box-sizing` це може спричинити overflow.

---

❌ Виправляти overflow через:

    overflow-x: hidden;

не знайшовши причину.

Це може просто приховати проблему.

---

❌ Використовувати занадто багато breakpoints.

Наприклад:

    320px
    375px
    414px
    480px
    600px
    768px
    900px
    1024px
    1200px
    1440px

Не кожен viewport потребує окремого layout.

---

❌ Будувати layout тільки під конкретні пристрої.

Наприклад:

    phone
    tablet
    laptop

Краще:

    content
        ↓
    available space
        ↓
    breakpoint

---

❌ Дублювати HTML для mobile та desktop.

Краще:

    один semantic HTML
        +
    responsive CSS

---

❌ Занадто вузькі cards.

Наприклад:

    width: 150px;

Краще дозволити layout автоматично визначати доступну ширину:

    minmax(250px, 1fr)

---

❌ Занадто широкі рядки тексту.

Наприклад:

    width: 100%;

на дуже великому monitor.

Краще обмежувати content:

    max-width: 65ch;

---

# Readable Text Width

Для текстового content часто корисний:

    max-width: 65ch;

`ch` приблизно орієнтується на ширину символу `0`.

Наприклад:

    .article {
        max-width: 65ch;
    }

Це допомагає зробити довгі текстові рядки читабельнішими.

---

# Responsive Article

Наприклад:

    .article {
        width: min(
            100% - 2rem,
            65ch
        );

        margin-inline: auto;
    }

Тут:

    mobile
        ↓
    responsive width

    desktop
        ↓
    readable text width

---

# Responsive Hero

Наприклад:

    .hero {
        min-height: 60vh;
        display: grid;
        place-items: center;
        padding-block: 4rem;
    }

Для typography:

    .hero-title {
        font-size: clamp(
            2.5rem,
            8vw,
            6rem
        );
    }

---

# Responsive Layout Example

HTML:

    <main>
        <div class="container">

            <div class="layout">

                <article class="content">
                    Main content
                </article>

                <aside class="sidebar">
                    Sidebar
                </aside>

            </div>

        </div>
    </main>

CSS:

    .container {
        width: min(
            100% - 2rem,
            1200px
        );

        margin-inline: auto;
    }

    .layout {
        display: grid;
        grid-template-columns:
            minmax(0, 1fr)
            300px;

        gap: 2rem;
    }

    @media (max-width: 768px) {
        .layout {
            grid-template-columns: 1fr;
        }
    }

---

# Чому `minmax(0, 1fr)`

У Grid:

    1fr

не завжди достатньо для content із довгими або широкими значеннями.

Шаблон:

    minmax(0, 1fr)

дозволяє track нормально стискатися.

Наприклад:

    grid-template-columns:
        minmax(0, 1fr)
        300px;

Це хороший практичний pattern для main content + sidebar.

---

# Responsive Card Component

HTML:

    <article class="card">
        <img
            src="image.jpg"
            alt="Example"
        >

        <div class="card-content">
            <h2>Title</h2>
            <p>
                Description...
            </p>
        </div>
    </article>

CSS:

    .card {
        display: grid;
        gap: 1rem;
    }

    .card img {
        display: block;
        width: 100%;
        height: auto;
    }

---

# Responsive Card Grid

    .cards {
        display: grid;
        grid-template-columns:
            repeat(
                auto-fit,
                minmax(250px, 1fr)
            );

        gap: 1.5rem;
    }

Цей pattern дозволяє створити responsive grid без великої кількості media queries.

---

# Responsive Two-Column Layout

    .layout {
        display: grid;

        grid-template-columns:
            minmax(0, 2fr)
            minmax(200px, 1fr);

        gap: 2rem;
    }

На широкому екрані:

    ┌────────────────────┬───────────┐
    │                    │           │
    │       2fr          │    1fr    │
    │                    │           │
    └────────────────────┴───────────┘

На вузькому екрані можна перейти до:

    grid-template-columns: 1fr;

---

# Responsive Three-Column Layout

    .layout {
        display: grid;

        grid-template-columns:
            repeat(3, 1fr);

        gap: 1.5rem;
    }

При звуженні viewport:

    @media (max-width: 900px) {
        .layout {
            grid-template-columns:
                repeat(2, 1fr);
        }
    }

    @media (max-width: 600px) {
        .layout {
            grid-template-columns: 1fr;
        }
    }

Це традиційний breakpoint-based підхід.

---

# Той самий layout без breakpoint

У багатьох випадках можна:

    .layout {
        display: grid;

        grid-template-columns:
            repeat(
                auto-fit,
                minmax(250px, 1fr)
            );

        gap: 1.5rem;
    }

Перевага:

    менше CSS
    менше breakpoints
    більш fluid behavior

---

# Responsive Layout: Media Queries vs Intrinsic Layout

Media queries:

    @media (...) {
        ...
    }

Добре використовувати, коли:

    layout fundamentally changes

Наприклад:

    navigation changes
    sidebar moves
    component changes structure

Intrinsic layout:

    minmax()
    auto-fit
    clamp()
    min()
    max()

Добре використовувати, коли:

    element only needs to resize
    columns need to wrap
    spacing needs to scale

Часто найкращий результат:

    intrinsic layout
        +
    a small number of media queries

---

# Responsive Layout Strategy

Хороша послідовність:

    1. semantic HTML
        ↓
    2. normal document flow
        ↓
    3. flexible container
        ↓
    4. Flexbox / Grid
        ↓
    5. fluid sizing
        ↓
    6. wrapping
        ↓
    7. intrinsic sizing
        ↓
    8. media queries where necessary

---

# Normal Flow

Responsive design добре працює, коли layout максимально використовує normal flow.

Не потрібно позиціонувати все:

    position: absolute;

Краще:

    block flow
    flexbox
    grid

Absolute positioning залишити для:

    overlays
    decorations
    badges
    icons
    special UI elements

---

# Responsive Layout та Position

Обережно з:

    position: absolute;

Наприклад:

    .title {
        position: absolute;
        left: 500px;
    }

Такий layout легко зламається на mobile.

Краще використовувати:

    flexbox
    grid
    padding
    margin
    gap

---

# Responsive Design Hierarchy

Можна мислити layout у кілька рівнів:

    viewport
        ↓
    page container
        ↓
    section
        ↓
    layout
        ↓
    component
        ↓
    content

Наприклад:

    viewport
        │
        └── container
              │
              ├── header
              │
              ├── main
              │    ├── article
              │    └── sidebar
              │
              └── footer

Кожен рівень повинен мати логічні правила sizing.

---

# Практичний Responsive Container

Базовий шаблон, який варто запам'ятати:

    .container {
        width: min(
            100% - 2rem,
            1200px
        );

        margin-inline: auto;
    }

---

# Практичний Responsive Grid

    .grid {
        display: grid;

        grid-template-columns:
            repeat(
                auto-fit,
                minmax(250px, 1fr)
            );

        gap: 1.5rem;
    }

---

# Практичний Responsive Flex

    .flex {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .item {
        flex: 1 1 250px;
    }

---

# Практичний Responsive Typography

    h1 {
        font-size:
            clamp(2rem, 5vw, 4rem);
    }

---

# Практичний Responsive Image

    img {
        display: block;
        max-width: 100%;
        height: auto;
    }

---

# Практичний Responsive Spacing

    .section {
        padding-block:
            clamp(2rem, 6vw, 6rem);
    }

---

# Responsive Layout Recipe

Для нового проєкту можна почати так:

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html {
        scroll-behavior: smooth;
    }

    body {
        margin: 0;
    }

    img {
        display: block;
        max-width: 100%;
        height: auto;
    }

    .container {
        width: min(
            100% - 2rem,
            1200px
        );

        margin-inline: auto;
    }

    .grid {
        display: grid;

        grid-template-columns:
            repeat(
                auto-fit,
                minmax(250px, 1fr)
            );

        gap: 1.5rem;
    }

Це не універсальний шаблон для всіх проєктів, але хороший старт для responsive layout.

---

# Practical Examples

## Приклад 1 — Responsive Container

    .container {
        width: min(
            100% - 2rem,
            1200px
        );

        margin-inline: auto;
    }

---

## Приклад 2 — Responsive Cards

    .cards {
        display: grid;

        grid-template-columns:
            repeat(
                auto-fit,
                minmax(250px, 1fr)
            );

        gap: 1rem;
    }

---

## Приклад 3 — Flex Cards

    .cards {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .card {
        flex: 1 1 250px;
    }

---

## Приклад 4 — Two Columns

    .layout {
        display: grid;
        grid-template-columns:
            minmax(0, 1fr)
            300px;

        gap: 2rem;
    }

    @media (max-width: 768px) {
        .layout {
            grid-template-columns: 1fr;
        }
    }

---

## Приклад 5 — Fluid Typography

    h1 {
        font-size:
            clamp(2rem, 5vw, 4rem);
    }

---

## Приклад 6 — Fluid Spacing

    section {
        padding-block:
            clamp(2rem, 5vw, 6rem);
    }

---

## Приклад 7 — Responsive Image

    img {
        display: block;
        max-width: 100%;
        height: auto;
    }

---

## Приклад 8 — Responsive Article

    .article {
        width: min(
            100% - 2rem,
            65ch
        );

        margin-inline: auto;
    }

---

## Приклад 9 — Responsive Sidebar

    .layout {
        display: grid;
        grid-template-columns:
            minmax(0, 1fr)
            280px;

        gap: 2rem;
    }

    @media (max-width: 800px) {
        .layout {
            grid-template-columns: 1fr;
        }
    }

---

## Приклад 10 — Responsive Header

    .header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

---

# Типовий Responsive Page

HTML:

    <header class="header">
        <div class="container">
            Header
        </div>
    </header>

    <main>

        <section class="section">
            <div class="container">

                <div class="grid">
                    <article>Card 1</article>
                    <article>Card 2</article>
                    <article>Card 3</article>
                </div>

            </div>
        </section>

    </main>

    <footer>
        <div class="container">
            Footer
        </div>
    </footer>

CSS:

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
    }

    .container {
        width: min(
            100% - 2rem,
            1200px
        );

        margin-inline: auto;
    }

    .section {
        padding-block:
            clamp(2rem, 5vw, 6rem);
    }

    .grid {
        display: grid;

        grid-template-columns:
            repeat(
                auto-fit,
                minmax(250px, 1fr)
            );

        gap: 1.5rem;
    }

---

# Responsive Debugging

Якщо layout погано працює на mobile, перевір:

    1. fixed width
    2. fixed height
    3. min-width
    4. large padding
    5. large margin
    6. image dimensions
    7. long text
    8. flex items
    9. grid tracks
    10. absolute positioning
    11. transforms
    12. tables
    13. pre/code blocks

---

# Як знайти Horizontal Overflow

У DevTools:

    Elements
        ↓
    inspect layout
        ↓
    знайти елемент,
    який ширший за viewport

Перевір:

    width
    min-width
    padding
    margin
    transform
    position
    grid
    flex
    image

Не починай із:

    overflow-x: hidden;

Спочатку знайди причину.

---

# Responsive Testing

Перевіряти потрібно не тільки:

    desktop
    mobile

а різні ширини viewport.

Наприклад:

    320px
    375px
    480px
    768px
    1024px
    1280px
    1440px

Але ці числа не є обов'язковими breakpoints.

Вони лише корисні для тестування.

---

# Resize Testing

Корисно поступово змінювати ширину viewport:

    wide
      ↓
    narrower
      ↓
    mobile
      ↓
    very narrow

Потрібно спостерігати:

    де layout ламається
    де content стає занадто вузьким
    де navigation перестає поміщатися
    де cards стають незручними
    де з'являється overflow

Саме ці точки можуть підказати breakpoints.

---

# Responsive Design Workflow

Практичний порядок роботи:

    1. Створити semantic HTML
        ↓
    2. Перевірити normal flow
        ↓
    3. Створити container
        ↓
    4. Визначити основний layout
        ↓
    5. Використати Flexbox або Grid
        ↓
    6. Додати gap
        ↓
    7. Зробити widths flexible
        ↓
    8. Додати max-width
        ↓
    9. Перевірити images
        ↓
    10. Перевірити overflow
        ↓
    11. Додати intrinsic sizing
        ↓
    12. Додати media queries
          тільки якщо необхідно
        ↓
    13. Перевірити mobile
        ↓
    14. Перевірити desktop
        ↓
    15. Перевірити accessibility

---

# Mobile First та Responsive Layout

Mobile-first означає:

    спочатку базовий layout
    для вузького viewport

потім:

    @media
        ↓
    розширення layout
        ↓
    для ширших viewport

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

Mobile-first буде детально розглядатися у:

    03-mobile-first

---

# Desktop First та Responsive Layout

Desktop-first починається з широкого layout:

    .layout {
        display: grid;
        grid-template-columns:
            2fr 1fr;
    }

Потім він змінюється для smaller viewport:

    @media (max-width: 768px) {
        .layout {
            grid-template-columns: 1fr;
        }
    }

Обидва підходи працюють.

Але mobile-first часто добре узгоджується з progressive enhancement.

---

# Responsive Layout та Accessibility

Responsive design не повинен ламати accessibility.

Потрібно перевіряти:

    readable text
    sufficient spacing
    logical source order
    keyboard navigation
    focus states
    touch target size
    zoom
    text resizing

Особливо важливо:

    не приховувати важливий content
    тільки тому, що viewport маленький.

---

# Responsive Design та Zoom

Користувач може збільшувати сторінку.

Layout повинен залишатися функціональним при:

    browser zoom
    larger text
    narrow viewport

Не варто створювати layout, який працює тільки при одному exact pixel size.

---

# Responsive Design та Accessibility Tree

Візуальний порядок:

    CSS layout

не повинен без необхідності суперечити:

    DOM order

Наприклад:

    HTML:
    Main
    Sidebar

не варто без причини перетворювати через `order` на:

    Sidebar
    Main

якщо це створює плутанину для keyboard та assistive technology users.

---

# Progressive Enhancement

Хороший підхід:

    базовий HTML
        ↓
    базовий CSS
        ↓
    responsive layout
        ↓
    enhanced interactions

Сторінка повинна залишатися максимально функціональною навіть без складних layout tricks.

---

# Responsive Layout: Core Patterns

## Pattern 1 — Container

    .container {
        width: min(
            100% - 2rem,
            1200px
        );

        margin-inline: auto;
    }

---

## Pattern 2 — Flexible Grid

    .grid {
        display: grid;

        grid-template-columns:
            repeat(
                auto-fit,
                minmax(250px, 1fr)
            );
    }

---

## Pattern 3 — Flexible Flex Items

    .row {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .item {
        flex: 1 1 250px;
    }

---

## Pattern 4 — Fluid Typography

    .title {
        font-size:
            clamp(2rem, 5vw, 4rem);
    }

---

## Pattern 5 — Responsive Image

    img {
        max-width: 100%;
        height: auto;
    }

---

## Pattern 6 — Constrained Text

    .text {
        max-width: 65ch;
    }

---

## Pattern 7 — Responsive Spacing

    .section {
        padding-block:
            clamp(2rem, 5vw, 6rem);
    }

---

# Питання зі співбесіди

Що таке responsive design?

Що таке responsive layout?

Що таке viewport?

Чим fixed layout відрізняється від fluid layout?

Що таке fluid layout?

Для чого використовується `max-width`?

Для чого використовується `min-width`?

Що означає `width: 100%`?

Як працює percentage width?

Що таке responsive container?

Чому часто використовують:

    width: 100%;
    max-width: 1200px;

Для чого потрібен:

    margin-inline: auto;

Що робить:

    box-sizing: border-box;

Що таке horizontal overflow?

Які причини horizontal overflow?

Чому `overflow-x: hidden` не завжди є правильним рішенням?

Як Flexbox допомагає створити responsive layout?

Що робить `flex-wrap`?

Що означає:

    flex: 1 1 250px;

Як Grid допомагає створити responsive layout?

Що робить:

    repeat(auto-fit, minmax(250px, 1fr));

Що таке `auto-fit`?

Що таке `auto-fill`?

Чим `auto-fit` відрізняється від `auto-fill`?

Що таке `minmax()`?

Що робить `min()`?

Що робить `max()`?

Що робить `clamp()`?

Що таке fluid typography?

Що таке intrinsic sizing?

Що таке `min-content`?

Що таке `max-content`?

Що таке `fit-content()`?

Чому не варто створювати breakpoint для кожного популярного device?

Що таке content-based breakpoint?

Чим viewport media query відрізняється від container query?

Як зробити responsive image?

Як зробити responsive card grid?

Як зробити responsive sidebar?

Як зробити responsive two-column layout?

Як зробити responsive navigation?

Що таке mobile-first?

Що таке desktop-first?

Чому важливий logical source order?

Як responsive layout пов'язаний з accessibility?

---

# Шлях

## 🟢 Core (обов'язково знати)

Що таке responsive design.

Що таке responsive layout.

Що таке viewport.

Fixed vs fluid layout.

`width: 100%`.

Percentage widths.

`max-width`.

`min-width`.

Responsive container.

`margin-inline: auto`.

`box-sizing: border-box`.

Horizontal overflow.

Flexbox у responsive layout.

`flex-wrap`.

`flex`.

CSS Grid у responsive layout.

`1fr`.

`repeat()`.

`minmax()`.

`auto-fit`.

Responsive cards.

Responsive columns.

Responsive sidebar.

Responsive images.

Relative units:

    %
    rem
    em
    vw
    vh

Основи:

    min()
    max()
    clamp()

Основи media queries.

Mobile-first.

Desktop-first.

---

## 🔵 Junior

Розуміння:

    fluid layout
    fixed layout
    flexible layout
    intrinsic layout

Responsive containers.

Responsive grids.

Responsive flex layouts.

`auto-fit`.

`auto-fill`.

`minmax()`.

`min()`.

`max()`.

`clamp()`.

`min-content`.

`max-content`.

`fit-content()`.

Responsive typography.

Responsive spacing.

Responsive images.

Responsive tables.

Handling overflow.

Content-based breakpoints.

Source order.

Responsive navigation.

Responsive sidebar.

Responsive cards.

Responsive article width.

`max-width: 65ch`.

Основи viewport units:

    svh
    lvh
    dvh

Розуміння, коли layout можна зробити без media queries.

---

## 🟠 Middle

Глибоке розуміння intrinsic layout.

Комбінація:

    Flexbox
    Grid
    intrinsic sizing
    media queries

Container Queries.

`container-type`.

`@container`.

Advanced responsive components.

Fluid design systems.

Fluid spacing scales.

Fluid typography scales.

Responsive design tokens.

Complex grid layouts.

Nested responsive layouts.

Advanced overflow handling.

Responsive tables.

Responsive navigation systems.

Responsive component architecture.

Accessibility у responsive layout.

Logical source order.

Progressive enhancement.

Layout performance.

CSS architecture для responsive design.

---

## 🔴 Senior

Designing responsive systems at scale.

Intrinsic Web Design.

Advanced CSS Grid algorithms.

Advanced Flexbox behavior.

Container Query architecture.

Component-level responsiveness.

Fluid design systems.

Dynamic spacing systems.

Advanced typography systems.

Responsive design tokens.

Layout primitives.

CSS custom properties + responsive systems.

Container-based components.

Complex responsive dashboards.

Responsive data visualization.

Accessibility при complex responsive layouts.

Internationalization та responsive layout.

Long-word / localization overflow.

Writing-mode considerations.

Performance implications of complex layouts.

Progressive enhancement architecture.

Design-system-level responsive abstractions.

Trade-offs між:

    media queries
    container queries
    intrinsic layout
    Flexbox
    Grid
    absolute positioning

---

# Міні-шпаргалка

## Responsive Container

    .container {
        width: min(
            100% - 2rem,
            1200px
        );

        margin-inline: auto;
    }

---

## Width

    width: 100%;

    → зайняти доступну ширину

---

## Maximum Width

    max-width: 1200px;

    → не дозволяти container
      ставати ширшим за 1200px

---

## Flex

    .row {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }

---

## Flexible Item

    .item {
        flex: 1 1 250px;
    }

---

## Responsive Grid

    .grid {
        display: grid;

        grid-template-columns:
            repeat(
                auto-fit,
                minmax(250px, 1fr)
            );

        gap: 1rem;
    }

---

## Responsive Image

    img {
        display: block;
        max-width: 100%;
        height: auto;
    }

---

## Fluid Typography

    h1 {
        font-size:
            clamp(2rem, 5vw, 4rem);
    }

---

## Fluid Spacing

    section {
        padding-block:
            clamp(2rem, 5vw, 6rem);
    }

---

## Readable Text

    .article {
        max-width: 65ch;
    }

---

## Two Columns

    .layout {
        display: grid;
        grid-template-columns:
            minmax(0, 1fr)
            300px;

        gap: 2rem;
    }

---

## Mobile Stack

    @media (max-width: 768px) {
        .layout {
            grid-template-columns: 1fr;
        }
    }

---

## min()

    width: min(100%, 1200px);

    → взяти менше значення

---

## max()

    width: max(300px, 50%);

    → взяти більше значення

---

## clamp()

    font-size:
        clamp(1rem, 2vw, 2rem);

    → minimum
    → preferred
    → maximum

---

## minmax()

    minmax(250px, 1fr)

    → minimum: 250px
    → maximum: 1fr

---

## auto-fit

    repeat(
        auto-fit,
        minmax(250px, 1fr)
    )

    → автоматично підлаштовує
      кількість колонок

---

## Overflow

    width
    min-width
    padding
    margin
    images
    text
    flex
    grid
    absolute elements

    ↓

    можливий horizontal overflow

---

## Layout Flow

    viewport
        ↓
    container
        ↓
    section
        ↓
    layout
        ↓
    component
        ↓
    content

---

# Основні правила

    Responsive design
        → layout адаптується до available space

    Fixed layout
        → фіксовані dimensions

    Fluid layout
        → dimensions змінюються разом із viewport

    max-width
        → обмежує maximum width

    min-width
        → задає minimum width

    width: 100%
        → займає доступну ширину

    flex-wrap
        → дозволяє переносити flex items

    Grid
        → зручний для responsive columns

    auto-fit
        → автоматично підлаштовує tracks

    minmax()
        → minimum + maximum

    clamp()
        → minimum + preferred + maximum

    min()
        → minimum value

    max()
        → maximum value

    overflow
        → content не поміщається

    breakpoint
        → точка зміни layout

---

# Головне

• Responsive design — це не набір окремих layout для phone, tablet та desktop.

• Responsive design — це система, у якій layout адаптується до available space.

• Хороший responsive layout часто починається з:

    width: min(100% - 2rem, 1200px);

• `max-width` допомагає не дозволяти content ставати надмірно широким.

• `width: 100%` дозволяє елементу займати доступну ширину.

• `box-sizing: border-box` спрощує роботу з width, padding та border.

• Flexbox добре підходить для flexible one-dimensional layouts.

• `flex-wrap` дозволяє елементам переноситися на новий рядок.

• Grid добре підходить для responsive two-dimensional layouts.

• Дуже корисний Grid pattern:

    grid-template-columns:
        repeat(
            auto-fit,
            minmax(250px, 1fr)
        );

• Не кожен responsive layout потребує media queries.

• `min()`, `max()`, `clamp()` та `minmax()` дозволяють створювати fluid CSS.

• Responsive typography можна будувати через:

    clamp()

• Responsive spacing також можна будувати через:

    clamp()

• Images повинні вміти зменшуватися:

    max-width: 100%;
    height: auto;

• Horizontal overflow потрібно не приховувати, а спочатку знаходити та виправляти його причину.

• Не варто створювати десятки breakpoints для кожного конкретного device.

• Breakpoint краще визначати там, де content або layout перестає працювати.

• Responsive layout повинен зберігати логічний HTML source order.

• Не потрібно дублювати HTML для mobile та desktop без вагомої причини.

• Хороший responsive layout максимально використовує:

    normal flow
    Flexbox
    Grid
    flexible sizing
    wrapping
    intrinsic sizing

• `max-width: 65ch` може бути корисним для читабельної ширини тексту.

• Responsive layout часто будується комбінацією:

    fluid sizing
        +
    intrinsic layout
        +
    a small number of media queries

• Основна модель:

    available space
          ↓
    flexible container
          ↓
    Flexbox / Grid
          ↓
    intrinsic sizing
          ↓
    wrapping
          ↓
    media query
    only when necessary

• Головна мета responsive CSS — не зробити layout "для телефону" або "для desktop", а зробити layout, який **природно адаптується до доступного простору та content**.