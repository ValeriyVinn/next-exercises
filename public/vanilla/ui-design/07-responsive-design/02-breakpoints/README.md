# 02. Breakpoints

Breakpoints (контрольні точки адаптивності) — це визначені значення ширини viewport, у яких змінюється компонування, поведінка або відображення елементів інтерфейсу.

Breakpoints найчастіше використовуються в Responsive Design для адаптації інтерфейсу до різних розмірів екранів.

Наприклад, картки на вузькому екрані можуть розташовуватися в одну колонку, на середньому — у дві, а на широкому — у три.

Breakpoints зазвичай реалізуються за допомогою CSS Media Queries, але адаптивну поведінку можна створювати й без них, використовуючи Flexbox, Grid, відносні одиниці вимірювання та intrinsic sizing.

Breakpoints використовуються під час:

- проєктування responsive layouts;
- адаптації навігації;
- зміни кількості колонок у Grid;
- зміни компонування карток;
- адаптації typography;
- зміни відступів і розмірів компонентів;
- створення responsive dashboards;
- адаптації таблиць і форм;
- підтримки різних розмірів viewport;
- створення масштабованих дизайн-систем.

Основні поняття:

    breakpoint
    viewport
    media query
    min-width
    max-width
    mobile-first
    desktop-first
    content-driven breakpoints
    device-based breakpoints
    responsive layout
    fluid layout
    intrinsic sizing
    container queries
    responsive testing

---

### Ключові поняття

✔ Breakpoint
✔ Viewport
✔ Media Query
✔ Media Feature
✔ `@media`
✔ `min-width`
✔ `max-width`
✔ `width`
✔ Mobile First
✔ Desktop First
✔ Content-Driven Breakpoints
✔ Device-Based Breakpoints
✔ Responsive Layout
✔ Responsive Grid
✔ Fluid Layout
✔ Flexible Container
✔ Intrinsic Sizing
✔ `min-width: 0`
✔ `max-width: 100%`
✔ `minmax()`
✔ `auto-fit`
✔ `auto-fill`
✔ `clamp()`
✔ `rem`
✔ `px`
✔ Viewport Width
✔ Breakpoint Range
✔ Layout Transition
✔ Container Queries
✔ `@container`
✔ Responsive Testing
✔ Overflow
✔ CSS Cascade
✔ Progressive Enhancement

---

### Що потрібно пам'ятати

• Breakpoint — точка, у якій інтерфейс або його компонент потребує зміни поведінки чи компонування.

• Breakpoint не обов'язково відповідає конкретній моделі смартфона, планшета або ноутбука.

• Найкраще визначати breakpoints за потребами контенту та поведінкою layout.

• У Mobile First базові стилі описують вузький viewport, а `min-width` додає зміни для ширших екранів.

• У Desktop First базові стилі часто описують широкий viewport, а `max-width` додає зміни для вужчих екранів.

• Не кожен компонент потребує breakpoint. Flexbox і Grid можуть самостійно адаптувати компонування.

• Занадто велика кількість breakpoints ускладнює підтримку CSS.

• Один breakpoint може змінювати багато пов'язаних елементів, якщо це логічно для layout.

• Для великих сторінок часто краще поєднувати гнучкі розміри контейнерів із кількома добре обґрунтованими breakpoints.

• `min-width` і `max-width` у media queries перевіряють ширину viewport, а не ширину конкретного HTML-елемента.

• Якщо адаптивність компонента залежить від ширини його контейнера, варто розглянути CSS Container Queries.

• Потрібно перевіряти не лише значення breakpoint, а й ширини безпосередньо до та після нього.

• Breakpoint не створює плавного масштабування сам по собі. Він змінює правила, коли виконується відповідна умова.

• Для плавної зміни розмірів можна використовувати відносні одиниці, `clamp()` та інші fluid techniques.

---

# Breakpoint

Breakpoint — значення ширини viewport, за якого потрібно змінити певне правило компонування або відображення.

Наприклад:

    .card-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    @media (min-width: 48rem) {
        .card-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

Тут:

    Base Layout
        ↓
    1 column

    Viewport >= 48rem
        ↓
    2 columns

Значення `48rem` є breakpoint у цьому прикладі.

Якщо кореневий розмір шрифту становить `16px`, то:

    48rem = 768px

Однак `rem` залежить від обчисленого розміру шрифту кореневого елемента. Не варто вважати, що кожне значення `rem` завжди дорівнює фіксованій кількості пікселів незалежно від налаштувань документа.

Breakpoint не означає, що весь сайт обов'язково має змінюватися в цій точці. Він може стосуватися лише одного компонента.

Наприклад:

    navigation breakpoint
    card-grid breakpoint
    sidebar breakpoint
    typography breakpoint

Різні частини інтерфейсу можуть мати різні потреби.

---

# Viewport

Viewport — область браузера, у якій відображається вебсторінка.

У responsive web design ширина viewport часто визначає, які CSS media queries застосовуються.

Наприклад:

    @media (min-width: 40rem) {
        /* Styles for wider viewport */
    }

    @media (min-width: 64rem) {
        /* Styles for even wider viewport */
    }

Важливо розрізняти:

    viewport width
        ↓
    ширина області перегляду

    element width
        ↓
    ширина конкретного елемента

    container width
        ↓
    ширина контейнера, у якому розташований елемент

Звичайний media query із `min-width` або `max-width` перевіряє ширину viewport.

Якщо потрібно реагувати на ширину батьківського контейнера, можна використати Container Queries.

Для правильного відображення responsive layout на мобільних пристроях у HTML зазвичай додають:

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
    >

Це дозволяє браузеру використовувати ширину пристрою як ширину layout viewport і встановлює початковий масштаб `1`.

---

# Media Queries

Media Queries — механізм CSS, який дозволяє застосовувати стилі залежно від характеристик середовища відображення.

Для responsive design найчастіше використовують умови ширини viewport.

Синтаксис:

    @media (condition) {
        /* CSS rules */
    }

Наприклад:

    .container {
        padding-inline: 1rem;
    }

    @media (min-width: 48rem) {
        .container {
            padding-inline: 2rem;
        }
    }

На вузькому екрані контейнер має горизонтальні відступи `1rem`.

Починаючи з ширини `48rem`, відступи збільшуються до `2rem`.

Media queries можуть змінювати:

    grid-template-columns
    flex-direction
    gap
    padding
    margin
    font-size
    display
    visibility
    width
    max-width
    alignment
    navigation layout

Не варто використовувати media queries для кожної дрібної зміни. Якщо layout може адаптуватися автоматично, краще спочатку розглянути гнучкі CSS-механізми.

---

# min-width

`min-width` у media query означає, що правило застосовується, коли ширина viewport дорівнює вказаному значенню або перевищує його.

Синтаксис:

    @media (min-width: 48rem) {
        /* Styles */
    }

Логіка:

    viewport < 48rem
        ↓
    правило не застосовується

    viewport >= 48rem
        ↓
    правило застосовується

Це типовий підхід Mobile First.

Приклад:

    .layout {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    @media (min-width: 48rem) {
        .layout {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

На маленькому екрані — одна колонка.

На ширшому — дві.

---

# max-width

`max-width` у media query означає, що правило застосовується, коли ширина viewport дорівнює вказаному значенню або менша за нього.

Синтаксис:

    @media (max-width: 48rem) {
        /* Styles */
    }

Логіка:

    viewport <= 48rem
        ↓
    правило застосовується

    viewport > 48rem
        ↓
    правило не застосовується

Цей підхід часто використовується в Desktop First.

Приклад:

    .layout {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
    }

    @media (max-width: 48rem) {
        .layout {
            grid-template-columns: 1fr;
        }
    }

На широкому екрані — три колонки.

На viewport шириною `48rem` або менше — одна колонка.

---

# min-width vs max-width

| Характеристика | `min-width` | `max-width` |
|---|---|---|
| Значення | Мінімальна ширина | Максимальна ширина |
| Умова | Ширина не менша за значення | Ширина не більша за значення |
| Типове використання | Mobile First | Desktop First |
| Приклад | `min-width: 48rem` | `max-width: 48rem` |
| Напрям адаптації | Від малого до великого | Від великого до малого |

Приклад Mobile First:

    .grid {
        grid-template-columns: 1fr;
    }

    @media (min-width: 48rem) {
        .grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

Приклад Desktop First:

    .grid {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 48rem) {
        .grid {
            grid-template-columns: 1fr;
        }
    }

Обидва підходи можуть бути правильними. Вибір залежить від структури проєкту, базового компонування та того, як зручніше організувати стилі.

---

# Mobile First Breakpoints

Mobile First — стратегія, за якої базові стилі створюються для вузького viewport, а потім доповнюються правилами для ширших екранів.

Типова структура:

    Base Styles
         ↓
    @media (min-width: ...)
         ↓
    @media (min-width: ...)
         ↓
    @media (min-width: ...)

Приклад:

    /* Base: narrow viewport */

    .card-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    /* Medium viewport */

    @media (min-width: 48rem) {
        .card-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    /* Wide viewport */

    @media (min-width: 72rem) {
        .card-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

Поведінка:

    Narrow
      ↓
    1 column
      ↓
    Medium
      ↓
    2 columns
      ↓
    Wide
      ↓
    3 columns

У Mobile First немає потреби задавати окремий media query для найменшого екрана, якщо базові стилі вже описують його правильно.

---

# Desktop First Breakpoints

Desktop First — підхід, за якого базові стилі описують великий viewport, а media queries адаптують компонування для менших екранів.

Типова структура:

    Desktop Base Styles
         ↓
    @media (max-width: ...)
         ↓
    @media (max-width: ...)

Приклад:

    /* Base: wide viewport */

    .card-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1.5rem;
    }

    /* Medium viewport */

    @media (max-width: 72rem) {
        .card-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    /* Narrow viewport */

    @media (max-width: 48rem) {
        .card-grid {
            grid-template-columns: 1fr;
        }
    }

Поведінка:

    Wide
      ↓
    3 columns
      ↓
    Medium
      ↓
    2 columns
      ↓
    Narrow
      ↓
    1 column

Якщо використовувати Desktop First, потрібно уважно стежити за тим, як стилі для великих екранів впливають на менші.

---

# Content-Driven Breakpoints

Content-Driven Breakpoints — підхід, за якого breakpoint визначається потребами контенту та поведінкою layout.

Це один із найкорисніших принципів responsive design.

Breakpoint слід додавати тоді, коли:

- заголовок починає переноситися неприродним чином;
- навігація перестає поміщатися;
- картки стають занадто вузькими;
- текст стає важко читати;
- бічна панель забирає забагато простору;
- кнопки або поля форми розташовуються незручно;
- компоненти починають перекриватися;
- з'являється горизонтальне переповнення;
- структура перестає відповідати користувацьким завданням.

Наприклад, у навігації є п'ять посилань:

    Home
    Courses
    Resources
    About
    Contact

Якщо вони перестають поміщатися в один ряд, це може бути сигналом для зміни компонування.

Можливі рішення:

    reduce unnecessary spacing
          ↓
    allow wrapping
          ↓
    reorganize navigation
          ↓
    introduce menu button

Не потрібно чекати, доки ширина viewport досягне певного стандартного значення. Breakpoint можна визначити за реальною поведінкою компонента.

---

# Device-Based Breakpoints

Device-Based Breakpoints — підхід, за якого значення breakpoint вибираються з орієнтацією на поширені категорії пристроїв.

Наприклад:

    mobile
    tablet
    desktop
    large desktop

Це може бути зручним початковим орієнтиром, але має обмеження.

Різні пристрої можуть мати:

    different viewport widths
    different pixel densities
    portrait orientation
    landscape orientation
    browser UI variations
    split-screen layouts
    zoomed content

Крім того, користувач може змінити розмір вікна браузера на desktop.

Тому device-based значення краще розглядати як стартові гіпотези, а не як універсальні правила.

Правильний процес:

    Choose an initial value
          ↓
    Test the layout
          ↓
    Observe content behavior
          ↓
    Adjust the breakpoint
          ↓
    Test nearby widths

---

# Типові значення Breakpoints

У вебпроєктах часто використовують значення на кшталт:

| Приклад | Приблизна ширина |
|---|---:|
| Small viewport | `320px` |
| Mobile layout | `480px` |
| Medium layout | `768px` |
| Large layout | `1024px` |
| Wide layout | `1200px` |
| Extra-wide layout | `1440px` |

Це лише приклади для орієнтації, а не офіційний стандарт.

Не потрібно додавати всі ці breakpoints до кожного проєкту.

Наприклад, простому сайту може вистачити одного breakpoint, а складний dashboard може потребувати кількох точок адаптації.

Важливіше не кількість breakpoint, а те, чи зберігається зручність інтерфейсу.

---

# Breakpoints у px чи rem

Breakpoints можна задавати в різних CSS units, зокрема `px` і `rem`.

Приклад у пікселях:

    @media (min-width: 768px) {
        .layout {
            grid-template-columns: repeat(2, 1fr);
        }
    }

Приклад у rem:

    @media (min-width: 48rem) {
        .layout {
            grid-template-columns: repeat(2, 1fr);
        }
    }

За стандартного початкового розміру шрифту `16px`:

    48rem = 768px

Проте ці одиниці мають різні властивості.

## px

`px` — CSS-піксель.

Переваги:

- легко читати та порівнювати значення;
- просто співвідносити з вимірюваннями у DevTools;
- поширений формат у готових дизайн-системах.

## rem

`rem` залежить від обчисленого розміру шрифту кореневого елемента.

Переваги:

- узгоджується з системою розмірів, заснованою на типографіці;
- може краще враховувати зміну базового розміру шрифту в окремих сценаріях.

Важливий нюанс: браузери мають спеціальну поведінку для одиниць у media queries. Не слід вважати, що зміна `font-size` у CSS для `html` автоматично змінить усі пороги `rem` у media queries так само, як звичайні розміри елементів.

Вибір `px` або `rem` залежить від домовленостей проєкту та вимог до доступності. Головне — послідовно використовувати обрану систему.

---

# Breakpoint Ranges

Breakpoint Range — діапазон ширини viewport, у якому застосовується певна поведінка інтерфейсу.

Наприклад:

    Narrow:
    width < 48rem

    Medium:
    48rem <= width < 72rem

    Wide:
    width >= 72rem

У CSS це можна реалізувати так:

    /* Narrow */

    .layout {
        grid-template-columns: 1fr;
    }

    /* Medium */

    @media (min-width: 48rem) {
        .layout {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    /* Wide */

    @media (min-width: 72rem) {
        .layout {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

У цьому прикладі кожна наступна умова додає правила для ширших екранів.

Коли ширина становить `80rem`, обидва media queries виконуються. У результаті застосовується правило для трьох колонок, оскільки воно оголошене пізніше та змінює ту саму властивість за однакової специфічності.

Це звичайна поведінка CSS cascade.

---

# Overlapping Media Queries

Overlapping Media Queries виникають, коли умови декількох media queries одночасно істинні.

Приклад:

    @media (min-width: 40rem) {
        .title {
            font-size: 2rem;
        }
    }

    @media (min-width: 60rem) {
        .title {
            font-size: 3rem;
        }
    }

При ширині `70rem` обидві умови виконуються.

Однак для `.title` використовується `font-size: 3rem`, якщо специфічність однакова, а друге правило розташоване пізніше.

Це очікувана поведінка.

Важливо розуміти:

    Media Query Condition
          ↓
    CSS Rule Matches
          ↓
    CSS Cascade
          ↓
    Final Computed Style

Не варто думати, що браузер вибирає лише один media query. Кілька умов можуть бути активними одночасно.

---

# Вибір Breakpoint за шириною контенту

Припустімо, контейнер містить три картки.

Мінімальна бажана ширина кожної картки:

    16rem

Відстань між картками:

    1rem

Щоб три картки помістилися в ряд, необхідна приблизна ширина:

    3 × 16rem + 2 × 1rem = 50rem

Якщо контейнер має горизонтальні відступи, до цього потрібно додати необхідний простір для них або врахувати їх у доступній ширині контейнера.

Це допомагає визначити початкове значення breakpoint.

Проте фактична ширина залежить також від:

    card padding
    text length
    borders
    container padding
    grid gap
    intrinsic content size

Тому після розрахунку потрібно перевірити layout у браузері.

---

# Коли Breakpoints не потрібні

Не кожну зміну компонування потрібно реалізовувати через media queries.

CSS містить механізми, які дозволяють layout адаптуватися автоматично.

## 1. Flexbox

    .navigation {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }

`flex-wrap: wrap` дозволяє елементам переходити на наступний рядок, якщо для них недостатньо місця.

Це може усунути потребу в окремому breakpoint для простого перенесення елементів.

## 2. CSS Grid із auto-fit

    .card-grid {
        display: grid;
        grid-template-columns: repeat(
            auto-fit,
            minmax(min(100%, 16rem), 1fr)
        );
        gap: 1rem;
    }

Grid автоматично визначає кількість колонок, які можуть поміститися в доступному просторі.

Такий підхід добре працює для галерей і каталогів карток.

## 3. max-width

    .container {
        width: 100%;
        max-width: 72rem;
        margin-inline: auto;
    }

Контейнер займає доступну ширину, але не стає надмірно широким.

## 4. clamp()

    .title {
        font-size: clamp(2rem, 4vw, 3.5rem);
    }

Розмір заголовка плавно змінюється в заданих межах без необхідності створювати кілька окремих breakpoint для кожного розміру.

## Головне правило

    Якщо layout може адаптуватися автоматично
          ↓
    Не додавай breakpoint без потреби

    Якщо поведінка має якісно змінитися
          ↓
    Додай breakpoint

---

# Container Queries

Container Queries дозволяють змінювати стилі компонента залежно від розміру його контейнера, а не всього viewport.

Це особливо корисно для reusable components, які можуть використовуватися в різних частинах сторінки.

Наприклад, картка курсу може бути вузькою в sidebar і широкою в основному контенті.

Приклад:

    .course-card-container {
        container-type: inline-size;
    }

    .course-card {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    @container (min-width: 32rem) {
        .course-card {
            grid-template-columns: 10rem minmax(0, 1fr);
            align-items: center;
        }
    }

Тут:

    container-type: inline-size
        ↓
    визначає контейнер для запиту його inline-size

    @container (min-width: 32rem)
        ↓
    перевіряє ширину доступного контейнера

    grid-template-columns
        ↓
    змінює компонування картки

Це відрізняється від:

    @media (min-width: 48rem)

який перевіряє ширину viewport.

Container Queries не замінюють усі media queries. Вони розв'язують іншу задачу.

Media Queries підходять для адаптації сторінки в цілому.

Container Queries підходять для адаптації компонента до простору, у якому він розташований.

---

# Breakpoints у Navigation

Навігація часто потребує окремого breakpoint, оскільки кількість посилань і їхня довжина можуть змінюватися.

Приклад Mobile First:

    .site-nav {
        display: none;
    }

    .menu-button {
        display: inline-flex;
    }

    @media (min-width: 56rem) {
        .site-nav {
            display: flex;
            gap: 1.5rem;
        }

        .menu-button {
            display: none;
        }
    }

У вузькому layout використовується кнопка меню.

На ширшому екрані навігація показується горизонтально.

Але breakpoint потрібно визначати за реальною поведінкою навігації.

Якщо всі посилання поміщаються вже при `52rem`, немає необхідності чекати `64rem`.

Якщо навігація залишається тісною при `64rem`, може знадобитися інше значення.

Також потрібно реалізувати поведінку меню:

    open / close
    keyboard interaction
    accessible name
    focus behavior
    aria-expanded

Саме приховування та показ елементів через CSS не створює повноцінну інтерактивну навігацію.

---

# Breakpoints у Typography

Іноді типографіка потребує breakpoint.

Наприклад, на мобільному екрані заголовок може мати розмір `2rem`, а на широкому — `3rem`.

    .page-title {
        font-size: 2rem;
        line-height: 1.15;
    }

    @media (min-width: 64rem) {
        .page-title {
            font-size: 3rem;
        }
    }

Проте не завжди потрібно використовувати breakpoint.

Плавна альтернатива:

    .page-title {
        font-size: clamp(2rem, 4vw, 3rem);
        line-height: 1.15;
    }

Перший варіант змінює розмір у конкретній точці.

Другий варіант дозволяє розміру плавно змінюватися між заданими межами.

Вибір залежить від дизайн-рішення.

Breakpoints можуть бути потрібні, якщо змінюється не лише розмір тексту, а й структура компонента.

Наприклад:

    Mobile:
    title above description

    Desktop:
    title and description in two columns

Детальніше:

    05-responsive-typography

---

# Breakpoints у Responsive Grid

Responsive Grid часто використовує breakpoints для зміни кількості колонок.

Приклад:

    .product-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    @media (min-width: 40rem) {
        .product-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (min-width: 64rem) {
        .product-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

    @media (min-width: 80rem) {
        .product-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }
    }

Це приклад сітки з чотирма станами:

    1 column
        ↓
    2 columns
        ↓
    3 columns
        ↓
    4 columns

Альтернатива без явного визначення кількості колонок:

    .product-grid {
        display: grid;
        grid-template-columns: repeat(
            auto-fit,
            minmax(min(100%, 15rem), 1fr)
        );
        gap: 1rem;
    }

Тут браузер автоматично розміщує картки відповідно до доступного простору.

Перший підхід дає більше контролю над кількістю колонок.

Другий підхід зменшує кількість media queries.

---

# Breakpoints у Sidebar Layout

Бічна панель може бути зручною на широкому екрані, але займати забагато місця на мобільному.

Mobile First:

    .page-layout {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .sidebar {
        order: 2;
    }

    @media (min-width: 64rem) {
        .page-layout {
            grid-template-columns: minmax(0, 2fr) minmax(15rem, 1fr);
            gap: 2rem;
        }

        .sidebar {
            order: 0;
        }
    }

На вузькому екрані контент розташований в одній колонці.

На широкому екрані з'являється двоколонковий layout.

Важливо: CSS-властивість `order` змінює візуальний порядок flex- або grid-елементів, але не обов'язково змінює порядок читання для всіх допоміжних технологій або послідовність клавіатурного фокусу.

Тому логічний порядок елементів у HTML потрібно продумувати заздалегідь.

---

# Breakpoints у Forms

Форми часто починаються з однієї колонки.

На широкому екрані частину полів можна розташувати поруч.

Приклад:

    .form-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    @media (min-width: 48rem) {
        .form-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    .form-field {
        min-width: 0;
    }

Для довгих форм дві колонки не завжди кращі за одну.

Потрібно враховувати:

    field labels
    input width
    error messages
    reading order
    form completion flow
    keyboard navigation

Breakpoint має покращувати зручність заповнення, а не просто створювати більше колонок.

---

# Як правильно вибрати Breakpoint

Вибір breakpoint — це процес перевірки компонування, а не запам'ятовування набору стандартних чисел.

Практичний алгоритм:

    1. Створи базовий layout
                ↓
    2. Перевір його на вузькому viewport
                ↓
    3. Поступово збільшуй ширину
                ↓
    4. Знайди точку, де layout втрачає зручність
                ↓
    5. Визнач необхідну зміну
                ↓
    6. Додай media query
                ↓
    7. Перевір ширини до і після breakpoint
                ↓
    8. Переконайся, що немає overflow
                ↓
    9. Перевір usability та accessibility

Наприклад, якщо навігація починає ламатися при ширині `53rem`, можна спробувати breakpoint трохи вище цієї точки, щоб залишити достатньо простору.

Але остаточне значення залежить від реального layout.

---

# Responsive Testing

Responsive Testing — перевірка інтерфейсу на різних ширинах viewport та в різних умовах використання.

Перевіряй:

    narrow viewport
    typical mobile viewport
    wide mobile viewport
    tablet-sized viewport
    small desktop viewport
    wide desktop viewport
    zoomed content
    long text
    dynamic content

Особливо важливо тестувати значення безпосередньо до та після breakpoint.

Наприклад, якщо breakpoint дорівнює `48rem`, перевір:

    47rem
    48rem
    49rem

Це допомагає виявити:

- раптові зміни ширини;
- горизонтальне переповнення;
- надто вузькі колонки;
- конфлікти CSS;
- зламану навігацію;
- незручне розташування кнопок;
- текст, що перекриває інші елементи.

У DevTools можна змінювати розмір viewport і перевіряти поведінку layout.

Не обмежуйся перевіркою лише на двох крайніх розмірах.

---

# CSS Cascade та Breakpoints

Media queries працюють разом із CSS cascade.

Приклад:

    .card {
        padding: 1rem;
    }

    @media (min-width: 48rem) {
        .card {
            padding: 1.5rem;
        }
    }

    @media (min-width: 72rem) {
        .card {
            padding: 2rem;
        }
    }

На вузькому екрані:

    padding: 1rem

На viewport від `48rem` до `72rem`:

    padding: 1.5rem

На viewport від `72rem`:

    padding: 2rem

Оскільки умови вкладені за шириною, на широкому екрані активні обидва media queries. Останнє правило має пріоритет за однакової специфічності.

Якщо специфічність відрізняється, результат може бути іншим.

Тому при налагодженні breakpoint потрібно перевіряти не лише умови, а й:

    selector specificity
    source order
    inheritance
    !important declarations
    cascade layers

---

# CSS Custom Properties для Breakpoints

CSS Custom Properties зручно використовувати для значень, які повторюються в стилях.

Наприклад:

    :root {
        --container-max: 72rem;
        --space-page: 1rem;
    }

    .container {
        width: 100%;
        max-width: var(--container-max);
        margin-inline: auto;
        padding-inline: var(--space-page);
    }

    @media (min-width: 48rem) {
        :root {
            --space-page: 2rem;
        }
    }

У цьому прикладі змінна визначає відступ сторінки.

Важливо: звичайні CSS custom properties не можна підставляти безпосередньо в умови media queries.

❌ Так не працює:

    :root {
        --tablet-breakpoint: 48rem;
    }

    @media (min-width: var(--tablet-breakpoint)) {
        /* Invalid media query condition */
    }

Поріг media query потрібно вказати безпосередньо в умові або керувати генерацією CSS за допомогою відповідного інструмента, наприклад Sass.

---

# Breakpoints у Sass

Sass дозволяє зберігати значення breakpoints у змінних.

Приклад SCSS:

    $breakpoint-md: 48rem;
    $breakpoint-lg: 72rem;

    .grid {
        display: grid;
        grid-template-columns: 1fr;
    }

    @media (min-width: $breakpoint-md) {
        .grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (min-width: $breakpoint-lg) {
        .grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

Sass підставляє значення змінних під час компіляції.

Це допомагає підтримувати єдину систему breakpoint у великих проєктах.

Однак для простого проєкту можна обійтися звичайним CSS без Sass.

---

# Breakpoints у Design System

У дизайн-системі breakpoints можуть бути частиною спільних правил адаптивності.

Наприклад:

    Small
    Medium
    Large
    Extra Large

Умовна система:

    Small:      < 40rem
    Medium:     >= 40rem
    Large:      >= 64rem
    Extra Large: >= 80rem

Ці значення наведені як приклад, а не як універсальний стандарт.

Дизайн-система може визначати:

    page container widths
    grid behavior
    spacing changes
    navigation transformations
    typography adjustments
    sidebar behavior
    component variants

Важливо розрізняти:

    Design Token
        ↓
    Значення, яке система централізовано визначає

    Breakpoint
        ↓
    Поріг, на якому змінюється поведінка

    Responsive Rule
        ↓
    CSS-правило, яке реагує на цей поріг

Не кожен компонент повинен використовувати всі breakpoints дизайн-системи.

Компоненти мають адаптуватися відповідно до своєї структури та призначення.

---

# Типові помилки

## 1. Використовувати однакові breakpoints для всіх компонентів

❌ Кожен компонент має однаково змінюватися при `768px`.

Не всі компоненти мають однакові потреби.

✔ Breakpoint повинен відповідати поведінці конкретного компонента або layout.

---

## 2. Додавати забагато breakpoints

❌

    @media (min-width: 400px) { ... }
    @media (min-width: 430px) { ... }
    @media (min-width: 460px) { ... }
    @media (min-width: 490px) { ... }
    @media (min-width: 520px) { ... }

Якщо кожна невелика зміна ширини потребує окремого правила, CSS стає складним для підтримки.

✔ Спочатку використовуй fluid layouts та intrinsic sizing.

---

## 3. Вибирати breakpoint лише за популярністю пристрою

❌

    iPhone breakpoint
    iPad breakpoint
    Laptop breakpoint

Назви пристроїв не описують усіх можливих умов відображення.

✔ Орієнтуйся на доступний простір і поведінку контенту.

---

## 4. Забувати про проміжні ширини

Якщо layout перевірено лише на `390px` і `1440px`, це не гарантує, що він правильно працює на `700px` або `1000px`.

✔ Перевіряй різні ширини, особливо навколо breakpoint.

---

## 5. Плутати viewport width і container width

Media query:

    @media (min-width: 48rem) {
        /* Viewport-based rules */
    }

Container query:

    @container (min-width: 32rem) {
        /* Container-based rules */
    }

Це різні механізми.

---

## 6. Використовувати фіксовані ширини

❌

    .container {
        width: 1200px;
    }

✔

    .container {
        width: 100%;
        max-width: 75rem;
        margin-inline: auto;
        padding-inline: 1rem;
    }

---

## 7. Вважати, що media query автоматично адаптує всі елементи

Media query змінює лише ті властивості, які описані в правилах.

Якщо змінюється кількість колонок, це не означає, що автоматично зміняться всі відступи, розміри тексту чи поведінка навігації.

✔ Перевіряй компонування як єдину систему.

---

## 8. Створювати горизонтальне переповнення

Причини:

    fixed widths
    wide images
    long URLs
    oversized grid items
    large gaps
    unbreakable content

Корисні базові правила:

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    .grid-item {
        min-width: 0;
    }

Не варто автоматично маскувати проблему через `overflow-x: hidden`.

---

## 9. Надмірно змінювати DOM-порядок через CSS

CSS може змінювати візуальний порядок елементів, але це не завжди змінює логічний порядок читання або клавіатурної навігації.

✔ Плануй семантичний порядок HTML з урахуванням усіх розмірів екрана.

---

## 10. Забувати про accessibility

Breakpoint може впливати на:

    navigation
    button sizes
    text wrapping
    focus visibility
    reading order
    form layout

Перевіряй інтерфейс при збільшенні тексту та на вузькому viewport.

---

# Практичні приклади

## Приклад 1 — три стани Grid

    .grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    @media (min-width: 48rem) {
        .grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (min-width: 72rem) {
        .grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

Логіка:

    Narrow → 1 column
    Medium → 2 columns
    Wide   → 3 columns

---

## Приклад 2 — адаптивний контейнер

    .container {
        width: 100%;
        max-width: 72rem;
        margin-inline: auto;
        padding-inline: 1rem;
    }

    @media (min-width: 48rem) {
        .container {
            padding-inline: 2rem;
        }
    }

    @media (min-width: 72rem) {
        .container {
            padding-inline: 0;
        }
    }

Контейнер займає доступний простір, але не перевищує максимальну ширину.

---

## Приклад 3 — адаптивна навігація

    .navigation {
        display: none;
    }

    .menu-button {
        display: inline-flex;
    }

    @media (min-width: 56rem) {
        .navigation {
            display: flex;
            gap: 1.5rem;
        }

        .menu-button {
            display: none;
        }
    }

Breakpoint визначає, коли горизонтальна навігація має достатньо простору.

Для мобільного меню потрібно додатково реалізувати інтерактивну поведінку.

---

## Приклад 4 — Sidebar

    .page-layout {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    @media (min-width: 64rem) {
        .page-layout {
            grid-template-columns: minmax(0, 1fr) 18rem;
            gap: 2rem;
        }
    }

На вузькому екрані sidebar розташовується в потоці сторінки.

На широкому — стає окремою колонкою.

---

## Приклад 5 — fluid layout без breakpoint

    .card-grid {
        display: grid;
        grid-template-columns: repeat(
            auto-fit,
            minmax(min(100%, 17rem), 1fr)
        );
        gap: 1rem;
    }

Grid автоматично підбирає кількість колонок залежно від доступної ширини.

Це хороший приклад того, як responsive layout може працювати без явних media queries для кожної кількості колонок.

---

## Приклад 6 — типографіка з breakpoint

    .title {
        font-size: 2rem;
        line-height: 1.15;
    }

    @media (min-width: 64rem) {
        .title {
            font-size: 3.5rem;
        }
    }

Розмір заголовка змінюється в певній точці.

---

## Приклад 7 — типографіка без breakpoint

    .title {
        font-size: clamp(2rem, 5vw, 3.5rem);
        line-height: 1.15;
    }

Розмір заголовка змінюється плавно між мінімальною та максимальною межами.

---

# Практичний мініпроєкт — Responsive Breakpoints

Мета — створити сітку карток із трьома станами та перевірити поведінку layout навколо кожного breakpoint.

Структура:

    breakpoints-demo/
    ├── index.html
    └── styles.css

## HTML

    <!DOCTYPE html>
    <html lang="uk">
    <head>
        <meta charset="UTF-8">
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
        >
        <title>Responsive Breakpoints</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <main class="container">
            <header class="page-header">
                <h1>Навчальні курси</h1>
                <p>
                    Приклад адаптивної сітки з кількома breakpoints.
                </p>
            </header>

            <section class="course-grid" aria-label="Список курсів">
                <article class="course-card">
                    <h2>HTML</h2>
                    <p>
                        Вивчай структуру та семантику вебсторінок.
                    </p>
                </article>

                <article class="course-card">
                    <h2>CSS</h2>
                    <p>
                        Вивчай стилізацію, Flexbox, Grid та responsive design.
                    </p>
                </article>

                <article class="course-card">
                    <h2>JavaScript</h2>
                    <p>
                        Вивчай програмування та інтерактивність.
                    </p>
                </article>

                <article class="course-card">
                    <h2>TypeScript</h2>
                    <p>
                        Вивчай типізацію та безпечніший JavaScript.
                    </p>
                </article>

                <article class="course-card">
                    <h2>React</h2>
                    <p>
                        Вивчай компоненти та побудову UI.
                    </p>
                </article>

                <article class="course-card">
                    <h2>Node.js</h2>
                    <p>
                        Вивчай серверний JavaScript.
                    </p>
                </article>
            </section>
        </main>
    </body>
    </html>

## CSS

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: system-ui, sans-serif;
        line-height: 1.6;
        color: #222;
        background: #f7f7f7;
    }

    .container {
        width: 100%;
        max-width: 75rem;
        margin-inline: auto;
        padding: 1.5rem 1rem;
    }

    .page-header {
        margin-bottom: 2rem;
    }

    .page-header h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        line-height: 1.15;
    }

    .course-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .course-card {
        min-width: 0;
        padding: 1.25rem;
        background: white;
        border: 1px solid #ddd;
        border-radius: 0.75rem;
    }

    .course-card h2 {
        margin-top: 0;
    }

    @media (min-width: 40rem) {
        .container {
            padding-inline: 1.5rem;
        }

        .course-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (min-width: 64rem) {
        .container {
            padding-inline: 2rem;
        }

        .course-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1.5rem;
        }
    }

## Що перевірити

1. На вузькому viewport картки повинні розташовуватися в одну колонку.

2. Починаючи з `40rem`, картки повинні розташовуватися у дві колонки.

3. Починаючи з `64rem`, картки повинні розташовуватися у три колонки.

4. Перевір ширини безпосередньо до та після кожного breakpoint.

5. Переконайся, що текст не виходить за межі карток.

6. Переконайся, що немає горизонтального переповнення сторінки.

7. Перевір, чи залишається комфортною ширина тексту.

8. Спробуй змінити breakpoints і спостерігай, як змінюється компонування.

9. Спробуй реалізувати аналогічну сітку за допомогою `auto-fit` та `minmax()` без двох media queries.

10. Порівняй, який варіант легше контролювати та підтримувати.

---

# Питання зі співбесіди

Що таке breakpoint?

Що таке viewport?

Чим breakpoint відрізняється від media query?

Як працює `@media`?

Чим `min-width` відрізняється від `max-width`?

Чому Mobile First зазвичай використовує `min-width`?

Чому Desktop First часто використовує `max-width`?

Що таке Content-Driven Breakpoints?

Чим content-driven підхід відрізняється від device-based?

Чи існують універсальні стандартні breakpoints?

Як визначити breakpoint для навігації?

Як визначити breakpoint для Grid?

Як перевірити, чи потрібен новий breakpoint?

Коли responsive layout може працювати без media queries?

Як працюють `auto-fit` та `minmax()`?

Що таке Container Queries?

Чим `@container` відрізняється від `@media`?

Що відбувається, коли одночасно виконуються кілька media queries?

Як CSS cascade впливає на responsive styles?

Чому потрібно тестувати ширини навколо breakpoint?

Чим `px` відрізняється від `rem` у контексті breakpoint?

Як організувати breakpoints у дизайн-системі?

Чому надмірна кількість breakpoints ускладнює підтримку CSS?

Як перевірити responsive layout у DevTools?

Які причини горизонтального переповнення?

Як breakpoints можуть впливати на accessibility?

---

# Шлях вивчення

## 🟢 Core — обов'язково знати

Що таке breakpoint.

Що таке viewport.

Що таке media query.

Синтаксис `@media`.

`min-width`.

`max-width`.

Mobile First.

Desktop First.

Різниця між viewport width і element width.

Базові responsive layouts.

Вибір breakpoint для однієї або двох колонок.

Перевірка layout у DevTools.

Перевірка ширин до та після breakpoint.

Усунення горизонтального переповнення.

## 🔵 Junior — впевнене практичне використання

Content-Driven Breakpoints.

Вибір breakpoint на основі контенту.

Responsive Grid.

Responsive Flexbox.

Адаптація navigation.

Адаптація sidebar.

Адаптація forms.

Responsive typography.

Fluid layouts без зайвих media queries.

Використання `minmax()`.

Використання `auto-fit` та `auto-fill`.

Використання `clamp()`.

Розуміння overlapping media queries.

Розуміння CSS cascade.

Основи Container Queries.

Responsive testing.

Основи breakpoint tokens у дизайн-системі.

## 🟠 Middle — поглиблене розуміння

Проєктування системи breakpoints для складних сайтів.

Responsive component architecture.

Поєднання media queries та container queries.

Оптимізація CSS для великої кількості компонентів.

Створення гнучких layout без зайвих breakpoint.

Responsive dashboards.

Адаптація складних таблиць.

Responsive navigation systems.

Взаємодія breakpoints із CSS cascade layers.

Підтримка довгого та динамічного контенту.

Accessibility на різних ширинах viewport.

Visual regression testing.

Управління responsive tokens.

## 🔴 Senior — системне проєктування

Архітектура responsive design system.

Уніфікація breakpoint strategy.

Проєктування reusable responsive components.

Вибір між viewport-based і container-based адаптацією.

Оптимізація складних layout.

Responsive governance.

Автоматизоване тестування responsive states.

Visual regression workflows.

Аналіз компромісів між гнучкістю, складністю та підтримкою CSS.

Створення стандартів адаптивності для великих проєктів.

---

# Міні-шпаргалка

## Breakpoint

    Breakpoint
        ↓
    Точка зміни layout або поведінки компонента

## Mobile First

    .grid {
        grid-template-columns: 1fr;
    }

    @media (min-width: 48rem) {
        .grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

## Desktop First

    .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 48rem) {
        .grid {
            grid-template-columns: 1fr;
        }
    }

## Content-Driven Breakpoints

    Layout
       ↓
    Check content
       ↓
    Find usability problem
       ↓
    Choose breakpoint
       ↓
    Test again

## Breakpoint vs Container Query

    @media
        → viewport

    @container
        → container

## Flexible Grid

    .grid {
        display: grid;
        grid-template-columns: repeat(
            auto-fit,
            minmax(min(100%, 16rem), 1fr)
        );
        gap: 1rem;
    }

## Fluid Typography

    .title {
        font-size: clamp(2rem, 5vw, 3.5rem);
    }

## Основні правила

    min-width
        → правило для заданої ширини та ширше

    max-width
        → правило для заданої ширини та вужче

    Mobile First
        → базовий вузький layout

    Desktop First
        → базовий широкий layout

    Content-Driven
        → breakpoint залежить від поведінки контенту

    Container Queries
        → адаптація компонента до контейнера

    Responsive Testing
        → перевірка різних ширин

---

# Головне

• Breakpoint — точка, у якій змінюється layout або поведінка компонента.

• Media Query — CSS-механізм, який застосовує стилі за певних умов.

• `min-width` перевіряє, чи viewport не вужчий за задане значення.

• `max-width` перевіряє, чи viewport не ширший за задане значення.

• Mobile First зазвичай використовує базові стилі та `min-width`.

• Desktop First часто використовує базові desktop-стилі та `max-width`.

• Content-Driven Breakpoints визначаються потребами контенту та поведінкою layout.

• Device-Based Breakpoints можуть бути початковим орієнтиром, але не є універсальним стандартом.

• Не потрібно додавати breakpoint, якщо Flexbox, Grid або fluid sizing уже забезпечують потрібну адаптацію.

• `auto-fit`, `minmax()` і `clamp()` допомагають зменшити кількість media queries.

• `@media` реагує на характеристики viewport, а `@container` — на розмір контейнера.

• Кілька media queries можуть бути активними одночасно. Результат визначається CSS cascade.

• Значення breakpoint потрібно перевіряти в реальному layout, а не вибирати лише за популярними розмірами пристроїв.

• У дизайн-системі breakpoints мають бути послідовними, але не кожен компонент повинен використовувати кожен breakpoint.

• Перевіряй інтерфейс до та після breakpoint, а також на проміжних ширинах.

• Основна мета — зберегти читабельність, зручність, доступність і цілісність інтерфейсу.

• Основна модель:

    Layout
       ↓
    Content Requirements
       ↓
    Identify Constraint
       ↓
    Choose Breakpoint
       ↓
    Implement CSS
       ↓
    Test Around Breakpoint
       ↓
    Refine

• Головний принцип: breakpoint потрібно створювати тоді, коли його потребує інтерфейс, а не просто тому, що певний розмір екрана вважається стандартним.