# 01. Mobile First

Mobile First (підхід «спочатку мобільні пристрої») — це принцип проєктування інтерфейсів, за якого дизайн спочатку створюється для маленьких екранів, а потім поступово розширюється для планшетів і desktop-пристроїв.

Основна ідея Mobile First — спочатку визначити найважливіший контент і функціональність, які потрібні користувачеві, а потім використовувати додатковий простір великих екранів для покращення інтерфейсу.

Mobile First — це не просто адаптація desktop-дизайну під телефон. Це спосіб мислення, який допомагає зосередитися на пріоритетах, простоті та зручності використання.

Mobile First використовується під час:

- проєктування сайтів і вебзастосунків;
- створення responsive layouts;
- визначення пріоритетів контенту;
- проєктування навігації;
- вибору розмірів кнопок та інтерактивних елементів;
- роботи з responsive typography;
- побудови CSS media queries;
- створення інтерфейсів для різних пристроїв.

Основні поняття:

    Mobile First
    Desktop First
    Progressive Enhancement
    Content Priority
    Responsive Design
    Small Screens
    Touch Targets
    Content Hierarchy
    Responsive Breakpoints
    Flexible Layouts
    Media Queries

---

### Ключові поняття

✔ Mobile First  
✔ Desktop First  
✔ Responsive Design  
✔ Progressive Enhancement  
✔ Content Priority  
✔ Content Hierarchy  
✔ Small Screens  
✔ Viewport  
✔ Mobile Layout  
✔ Desktop Layout  
✔ Flexible Layout  
✔ Fluid Width  
✔ Responsive Breakpoints  
✔ CSS Media Queries  
✔ Minimum Viable Interface  
✔ Touch Targets  
✔ Readability  
✔ Navigation Patterns  
✔ Content Reflow  
✔ Feature Enhancement  
✔ Graceful Degradation  
✔ Mobile Usability  
✔ Responsive Images  
✔ Intrinsic Sizing  
✔ `min-width`  
✔ `max-width`  
✔ `width: 100%`  
✔ `max-width: 100%`  
✔ `box-sizing: border-box`  
✔ `@media`  
✔ `rem`  
✔ `clamp()`  

---

### Що потрібно пам'ятати

• Mobile First означає, що базовий дизайн створюється для маленьких екранів, а потім розширюється для більших.

• Mobile First — це підхід до проєктування, а не окрема CSS-технологія.

• Responsive Design — ширше поняття, яке охоплює адаптацію інтерфейсу до різних розмірів екранів та умов використання.

• Mobile First допомагає визначити найважливіший контент і не перевантажувати інтерфейс другорядними елементами.

• У Mobile First базові CSS-правила зазвичай описують мобільний вигляд, а `@media (min-width: ...)` додає зміни для більших екранів.

• Не потрібно створювати окремий сайт для кожного пристрою. Зазвичай достатньо одного інтерфейсу з гнучким layout і відповідними CSS-правилами.

• Не слід приховувати важливий контент лише тому, що екран маленький. Краще змінити його розташування, спосіб подання або пріоритет.

• Mobile First не означає, що мобільна версія завжди має бути максимально простою. Вона повинна містити все необхідне для виконання основних завдань користувача.

• Breakpoints потрібно вибирати відповідно до контенту та поведінки layout, а не лише за назвами пристроїв.

• Сучасний Mobile First спирається на Flexbox, Grid, відносні одиниці, обмеження ширини та media queries.

• Інтерфейс потрібно перевіряти не лише на телефонах і desktop, а й на проміжних ширинах.

---

# Mobile First vs Responsive Design

Ці поняття пов'язані, але не тотожні.

## Mobile First

Mobile First — стратегія проєктування.

Спочатку:

    Small Screen
         ↓
    Essential Content
         ↓
    Basic Layout
         ↓
    Larger Screens
         ↓
    Additional Enhancements

Наприклад, спочатку створюється одноколонковий каталог товарів, а на широкому екрані він перетворюється на сітку з кількома колонками.

## Responsive Design

Responsive Design — підхід до створення інтерфейсів, які пристосовуються до доступного простору.

Інтерфейс може змінювати:

    layout
    columns
    spacing
    typography
    navigation
    images
    component sizes
    content arrangement

Responsive Design можна реалізувати як Mobile First, так і Desktop First.

## Головна різниця

    Mobile First
        ↓
    З якого розміру починаємо проєктування?

    Responsive Design
        ↓
    Як інтерфейс адаптується до різних умов?

Mobile First часто використовується як стратегія реалізації Responsive Design.

---

# Desktop First

Desktop First — підхід, за якого дизайн спочатку створюється для великих екранів, а потім адаптується для менших.

Наприклад:

    Desktop Layout
         ↓
    Tablet Layout
         ↓
    Mobile Layout

Такий підхід часто використовує media queries із `max-width`.

Приклад:

    /* Desktop First */

    .container {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
    }

    @media (max-width: 768px) {
        .container {
            grid-template-columns: 1fr;
        }
    }

На широкому екрані контейнер має дві колонки.

На вузькому екрані колонки перетворюються на одну.

Desktop First може бути доречним для проєктів, у яких основний робочий процес орієнтований на великі екрани.

Наприклад:

    desktop-oriented dashboards
    complex admin panels
    desktop-first internal tools

Однак складний desktop-інтерфейс може бути важче якісно адаптувати для маленьких екранів, якщо його структура спочатку не враховувала мобільні обмеження.

---

# Чому Mobile First важливий

Маленький екран обмежує простір, доступний для контенту та керування інтерфейсом.

На мобільному пристрої потрібно особливо уважно працювати з:

    limited viewport width
    content priority
    readable typography
    touch interaction
    navigation
    vertical scrolling
    form usability
    image sizing
    layout simplicity

Mobile First змушує визначити, що користувачеві справді потрібно.

Наприклад, сторінка навчального курсу може містити:

    course title
    course description
    enrollment button
    instructor information
    course modules
    related courses
    promotional banner

На мобільному екрані найважливішими можуть бути:

    course title
    course description
    enrollment button

Інші блоки не обов'язково видаляти. Їх можна розташувати нижче, змінити компонування або показувати в компактнішому вигляді.

---

# Mobile First Workflow

Типовий процес роботи:

    1. Визначити користувацькі завдання
                ↓
    2. Визначити пріоритети контенту
                ↓
    3. Спроєктувати mobile layout
                ↓
    4. Реалізувати базові CSS-стилі
                ↓
    5. Перевірити читабельність і usability
                ↓
    6. Визначити місця, де layout потребує змін
                ↓
    7. Додати responsive breakpoints
                ↓
    8. Покращити layout для більших екранів
                ↓
    9. Перевірити проміжні розміри viewport

Важливо: не кожен компонент потребує окремого breakpoint. Якщо layout залишається зручним, його не потрібно змінювати.

---

# Content Priority

Content Priority — визначення важливості інформації та дій у межах інтерфейсу.

На маленькому екрані контент часто розташовується вертикально, тому порядок блоків безпосередньо впливає на користувацький досвід.

Наприклад, сторінка статті:

    1. Article title
    2. Author and publication date
    3. Main image
    4. Article content
    5. Related articles
    6. Additional information

Для сторінки інтернет-магазину пріоритети можуть бути іншими:

    1. Product image
    2. Product name
    3. Price
    4. Availability
    5. Add to cart button
    6. Product description
    7. Specifications
    8. Related products

Порядок потрібно визначати відповідно до мети сторінки.

## Основні принципи

• Найважливіша інформація має бути доступною без зайвих дій.

• Основна дія повинна бути помітною та зрозумілою.

• Другорядна інформація може розташовуватися нижче за основною.

• Не слід автоматично приховувати важливі функції на мобільних пристроях.

• Скорочення тексту допустиме лише тоді, коли не втрачається важлива інформація.

---

# Mobile Layout

Mobile Layout — компонування інтерфейсу, оптимізоване для вузького viewport.

Типові характеристики:

    one-column layout
    flexible container width
    vertical content flow
    readable typography
    adequate spacing
    accessible controls
    responsive images
    simplified navigation

Наприклад:

    <main class="container">
        <section class="content">
            <h1>Learning JavaScript</h1>

            <p>
                Learn programming step by step.
            </p>

            <button type="button">
                Start learning
            </button>
        </section>
    </main>

Базові стилі:

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: system-ui, sans-serif;
    }

    .container {
        width: 100%;
        padding-inline: 1rem;
        margin-inline: auto;
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

У цьому прикладі мобільний layout є базовим.

Контент займає доступну ширину, має внутрішні відступи та розташовується вертикально.

---

# Mobile First CSS

У Mobile First CSS базові стилі описують поведінку елементів на вузьких екранах.

Потім media queries із `min-width` поступово додають зміни для ширших viewport.

Загальна структура:

    /* 1. Base: mobile */

    .container {
        width: 100%;
        padding-inline: 1rem;
        margin-inline: auto;
    }

    .grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    /* 2. Wider screens */

    @media (min-width: 48rem) {
        .container {
            max-width: 45rem;
        }

        .grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    /* 3. Large screens */

    @media (min-width: 64rem) {
        .container {
            max-width: 72rem;
        }

        .grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

Логіка:

    Base Styles
         ↓
    min-width: 48rem
         ↓
    min-width: 64rem

На кожному наступному рівні додаються або змінюються правила для ширшого viewport.

Якщо умови кількох media queries виконуються одночасно, застосовуються відповідні правила з урахуванням CSS cascade, specificity та порядку оголошення.

---

# Media Queries

Media Query — CSS-механізм, який дозволяє застосовувати стилі залежно від характеристик середовища відображення.

Для responsive layout найчастіше використовуються умови ширини viewport.

Синтаксис:

    @media (min-width: 48rem) {
        /* Styles for wider viewports */
    }

Приклад:

    .navigation {
        display: none;
    }

    @media (min-width: 48rem) {
        .navigation {
            display: flex;
        }
    }

На вузькому екрані навігація прихована.

На ширшому екрані вона відображається як flex-контейнер.

У реальному інтерфейсі прихована навігація повинна мати доступну альтернативу, наприклад кнопку меню.

## min-width

`min-width` застосовує стилі, коли ширина viewport дорівнює заданому значенню або більша.

    @media (min-width: 48rem) {
        .cards {
            grid-template-columns: repeat(2, 1fr);
        }
    }

Це типовий підхід Mobile First.

## max-width

`max-width` застосовує стилі, коли ширина viewport дорівнює заданому значенню або менша.

    @media (max-width: 47.99rem) {
        .sidebar {
            display: none;
        }
    }

Це часто використовується в Desktop First.

Важливо: не потрібно автоматично застосовувати `max-width` для кожної мобільної зміни. У Mobile First бажано починати з базових стилів і додавати правила за потреби.

---

# Breakpoints у Mobile First

Breakpoint — точка, у якій layout або компонент потребує зміни, щоб залишатися зручним.

Breakpoint не обов'язково має відповідати конкретній моделі телефона чи планшета.

Його вибирають на основі:

    content width
    text wrapping
    number of columns
    navigation behavior
    component dimensions
    available space
    usability

Приклад:

    /* Mobile */

    .cards {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    /* Tablet-sized and wider */

    @media (min-width: 48rem) {
        .cards {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    /* Large viewport */

    @media (min-width: 72rem) {
        .cards {
            grid-template-columns: repeat(3, 1fr);
        }
    }

Числа `48rem` і `72rem` тут є прикладами, а не обов'язковими стандартами.

Якщо три колонки стають надто вузькими або заголовки починають ламати layout, breakpoint потрібно переглянути.

Детальніше про вибір і використання breakpoints:

    02-breakpoints

---

# Progressive Enhancement

Progressive Enhancement — принцип, за якого спочатку створюється базовий, функціональний інтерфейс, а потім додаються покращення для середовищ, які можуть їх підтримувати.

У контексті Mobile First це означає:

    Essential Content
         ↓
    Basic Usability
         ↓
    Flexible Layout
         ↓
    Additional Layout Features
         ↓
    Enhanced Experience

Наприклад, сторінка повинна залишатися зрозумілою та придатною до використання навіть тоді, коли складніше компонування або певні візуальні ефекти не застосовуються.

Progressive Enhancement не означає, що на мобільному пристрої потрібно створювати неповний інтерфейс.

Базовий рівень має забезпечувати основні можливості, а покращення повинні підвищувати зручність без необґрунтованого ускладнення.

---

# Flexible Layouts

Mobile First часто використовує гнучкі розміри замість фіксованих значень.

Наприклад:

    .container {
        width: 100%;
        max-width: 72rem;
        margin-inline: auto;
        padding-inline: 1rem;
    }

Тут:

    width: 100%
        ↓
    контейнер може займати доступну ширину

    max-width: 72rem
        ↓
    контейнер не стає надто широким

    margin-inline: auto
        ↓
    контейнер центрується за горизонталлю

    padding-inline: 1rem
        ↓
    контент має відступи від країв

Такий контейнер працює на різних розмірах viewport без необхідності створювати окремий стиль для кожного пристрою.

## Чому не варто покладатися лише на fixed width

Проблемний приклад:

    .container {
        width: 1200px;
    }

На viewport шириною `390px` такий контейнер створює горизонтальне переповнення.

Краще:

    .container {
        width: 100%;
        max-width: 75rem;
        margin-inline: auto;
        padding-inline: 1rem;
    }

Фіксовані розміри можуть бути доречними для окремих елементів, але основний layout повинен враховувати доступний простір.

---

# Fluid Typography

Fluid Typography — підхід, за якого розмір тексту плавно змінюється залежно від доступного простору або viewport.

Замість того щоб задавати лише два різні розміри через media queries, можна використати `clamp()`.

Приклад:

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

Структура:

    clamp(minimum, preferred, maximum)

Тобто:

    2rem
        ↓
    мінімальний розмір

    5vw
        ↓
    бажаний розмір, пов'язаний із viewport

    4rem
        ↓
    максимальний розмір

Браузер обчислює бажаний розмір, але не дозволяє йому вийти за встановлені межі.

`clamp()` допомагає уникати надто маленьких або надто великих заголовків.

Водночас потрібно перевіряти перенесення рядків, довжину тексту та масштабування сторінки.

Детальніше:

    05-responsive-typography

---

# Touch Targets

Touch Target — область, якої користувач торкається пальцем для виконання дії.

Приклади:

    buttons
    navigation links
    checkboxes
    icon buttons
    menu controls
    form controls

На мобільному пристрої інтерактивні елементи мають бути достатньо великими та розташованими так, щоб зменшити кількість випадкових натискань.

Приклад:

    .button {
        min-height: 2.75rem;
        padding: 0.75rem 1rem;
    }

Це створює мінімальну висоту `44px`, якщо стандартний розмір кореневого шрифту становить `16px`.

Для орієнтиру WCAG 2.2 Success Criterion 2.5.8 встановлює для багатьох цілей натискання мінімальний розмір `24 × 24 CSS px` або передбачає виконання визначених умов щодо відстані. Для критерію 2.5.5 рівня AAA використовується `44 × 44 CSS px` з передбаченими винятками.

Тому `44 × 44 CSS px` — корисний практичний орієнтир для багатьох мобільних елементів, але не універсальна вимога кожного рівня WCAG.

Також потрібно враховувати:

    spacing between controls
    visible focus
    keyboard accessibility
    accessible names
    sufficient contrast

Не слід робити кнопку візуально великою, але залишати фактичну клікабельну область маленькою.

---

# Navigation у Mobile First

Навігація часто потребує зміни компонування між мобільним і desktop-інтерфейсом.

На маленькому екрані можуть використовуватися:

    menu button
    collapsible navigation
    compact header
    vertically arranged links
    simplified navigation groups

На широкому екрані можуть використовуватися:

    horizontal navigation
    expanded menu
    multiple navigation groups
    additional visible links

Приклад базового підходу:

    .navigation {
        display: none;
    }

    .menu-button {
        display: inline-flex;
    }

    @media (min-width: 48rem) {
        .navigation {
            display: flex;
            gap: 1.5rem;
        }

        .menu-button {
            display: none;
        }
    }

Цей приклад визначає лише видимість елементів.

Щоб меню працювало правильно, потрібно також реалізувати:

    open / close behavior
    keyboard interaction
    accessible button name
    focus management when needed
    appropriate aria-expanded state

Не варто приховувати навігацію без альтернативного способу доступу до її основних функцій.

Детальніше:

    06-responsive-navigation

---

# Mobile First для карток

Картки — поширений компонент для списків товарів, курсів, статей та профілів.

На мобільному екрані картки часто розташовуються в одну колонку.

На ширших екранах можна використовувати дві або три колонки.

HTML:

    <section class="card-grid">
        <article class="card">
            <h2>HTML</h2>
            <p>Learn the structure of web pages.</p>
        </article>

        <article class="card">
            <h2>CSS</h2>
            <p>Learn layout and visual styling.</p>
        </article>

        <article class="card">
            <h2>JavaScript</h2>
            <p>Learn programming for the web.</p>
        </article>
    </section>

CSS:

    .card-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .card {
        min-width: 0;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 0.75rem;
    }

    @media (min-width: 48rem) {
        .card-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (min-width: 72rem) {
        .card-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

Поведінка:

    Mobile
        ↓
    1 column

    Medium viewport
        ↓
    2 columns

    Large viewport
        ↓
    3 columns

`minmax(0, 1fr)` дозволяє колонкам стискатися в межах доступного простору, а `min-width: 0` допомагає уникати переповнення вмістом.

Детальніше:

    07-responsive-components

---

# Mobile First та зображення

Зображення повинні пристосовуватися до доступної ширини контейнера.

Типовий CSS:

    img {
        display: block;
        max-width: 100%;
        height: auto;
    }

Тут:

    max-width: 100%
        ↓
    зображення не перевищує ширину контейнера

    height: auto
        ↓
    зберігаються пропорції

Для адаптивних зображень можна використовувати `picture` та `srcset`, якщо потрібно завантажувати різні файли залежно від ширини або щільності екрана.

Приклад:

    <img
        src="images/course-640.jpg"
        srcset="
            images/course-640.jpg 640w,
            images/course-1280.jpg 1280w
        "
        sizes="
            (min-width: 48rem) 50vw,
            100vw
        "
        alt="Students learning together"
    >

Браузер може вибрати відповідний файл з урахуванням доступних джерел, `sizes`, щільності екрана та інших умов.

Важливо: `srcset` і `sizes` не гарантують завантаження конкретного файлу на кожному пристрої. Вони надають браузеру інформацію для вибору.

---

# Mobile First та форми

Форми повинні залишатися зручними на вузьких екранах.

Рекомендації:

• Розташовувати поля вертикально, якщо горизонтальне компонування стає тісним.

• Використовувати зрозумілі labels.

• Не покладатися лише на placeholder як на назву поля.

• Забезпечувати достатню висоту полів і кнопок.

• Уникати горизонтального прокручування сторінки.

• Відображати помилки поруч із відповідними полями.

• Перевіряти форми з довгими повідомленнями та довгими значеннями.

Приклад:

    .form {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .form-field {
        display: grid;
        gap: 0.375rem;
    }

    .form-field input {
        width: 100%;
        min-width: 0;
        min-height: 2.75rem;
        padding: 0.75rem;
    }

    .form button {
        min-height: 2.75rem;
    }

Базове компонування залишається одноколонковим.

На широких екранах окремі поля можна розташувати поруч, якщо це покращує зручність заповнення.

---

# Mobile First та одиниці вимірювання

Для responsive interface використовуються різні CSS units.

## px

`px` — CSS-піксель.

    .icon {
        width: 24px;
        height: 24px;
    }

Підходить для багатьох точних розмірів, наприклад іконок та меж.

## rem

`rem` залежить від розміру шрифту кореневого елемента.

    .container {
        padding: 1rem;
    }

    h1 {
        font-size: 2rem;
    }

`rem` зручний для типографіки, відступів та розмірів, які мають узгоджено масштабуватися.

## %

Відсотки залежать від відповідного розміру батьківського контейнера або іншого контексту, визначеного конкретною CSS-властивістю.

    .container {
        width: 100%;
    }

## vw

`vw` — одиниця, пов'язана з шириною viewport.

    h1 {
        font-size: 5vw;
    }

Використання лише `vw` для шрифту може створити надто маленький текст на вузьких екранах або надто великий на широких.

Часто краще:

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

## fr

`fr` — одиниця частки доступного простору в CSS Grid.

    .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

Для рівномірних колонок, які можуть стискатися:

    .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

---

# Viewport

Viewport — область сторінки, яку браузер використовує для відображення контенту.

На мобільних пристроях важливо правильно налаштувати viewport.

У HTML зазвичай використовують:

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
    >

Цей тег повідомляє браузеру використовувати ширину пристрою як ширину layout viewport та початковий масштаб `1`.

Без правильного налаштування мобільний браузер може використовувати ширший layout viewport, через що responsive layout працюватиме не так, як очікується.

Не слід без необхідності забороняти користувачеві масштабування сторінки. Можливість збільшувати контент важлива для доступності.

---

# Mobile First та Accessibility

Mobile First не замінює Accessibility, але допомагає раніше врахувати важливі вимоги доступності.

Під час проєктування потрібно перевіряти:

    readable text
    sufficient color contrast
    keyboard navigation
    visible focus
    accessible labels
    touch target size
    meaningful heading hierarchy
    screen reader compatibility
    zoom and text resizing
    reduced motion preferences

Особливу увагу слід приділяти ситуаціям, коли:

- користувач збільшує текст;
- viewport стає дуже вузьким;
- форма містить довгі повідомлення про помилки;
- кнопки розташовані близько одна до одної;
- меню відкривається та закривається;
- довгі слова або URL не поміщаються в контейнері.

Responsive interface має залишатися придатним до використання не лише на стандартних розмірах пристроїв.

---

# Content Reflow

Content Reflow — перебудова компонування контенту відповідно до доступного простору.

Наприклад:

    Desktop
    ┌──────────────┬──────────┐
    │ Main content │ Sidebar  │
    └──────────────┴──────────┘

    Mobile
    ┌─────────────────────────┐
    │ Main content            │
    ├─────────────────────────┤
    │ Sidebar                 │
    └─────────────────────────┘

CSS:

    .page-layout {
        display: grid;
        grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
        gap: 2rem;
    }

    @media (max-width: 48rem) {
        .page-layout {
            grid-template-columns: 1fr;
        }
    }

Цей приклад використовує Desktop First для демонстрації самої перебудови.

У Mobile First той самий layout можна описати навпаки:

    .page-layout {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    @media (min-width: 48rem) {
        .page-layout {
            grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
            gap: 2rem;
        }
    }

Обидва варіанти можуть бути responsive. Різниця полягає в тому, який стан є базовим.

---

# Mobile First vs Desktop First: CSS

## Mobile First

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

    @media (min-width: 72rem) {
        .layout {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

Базовий стан:

    1 column

Потім:

    2 columns
    3 columns

## Desktop First

    .layout {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
    }

    @media (max-width: 72rem) {
        .layout {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (max-width: 48rem) {
        .layout {
            grid-template-columns: 1fr;
        }
    }

Базовий стан:

    3 columns

Потім:

    2 columns
    1 column

## Порівняння

| Характеристика | Mobile First | Desktop First |
|---|---|---|
| Початковий layout | Маленький екран | Великий екран |
| Типові media queries | `min-width` | `max-width` |
| Базові стилі | Простіший layout | Повний desktop layout |
| Основний напрям | Розширення | Спрощення |
| Пріоритет | Важливий контент і базова функціональність | Повний desktop-досвід |
| Типовий ризик | Надмірне ускладнення великих екранів | Складна адаптація desktop-компонентів |

Обидва підходи можуть створювати якісні responsive interfaces. Mobile First — корисна стратегія, але не обов'язкова вимога для кожного проєкту.

---

# Типові помилки Mobile First

## 1. Просто зменшувати desktop-дизайн

❌ Неправильний підхід:

    Desktop layout
         ↓
    Зменшити всі елементи
         ↓
    Mobile layout

Мобільний інтерфейс потребує продуманого компонування, а не лише зменшених розмірів.

✔ Краще:

    Identify priorities
         ↓
    Design for narrow viewport
         ↓
    Adapt layout to available space

---

## 2. Приховувати важливий контент

❌ Наприклад:

    @media (max-width: 48rem) {
        .important-information {
            display: none;
        }
    }

Якщо інформація важлива для виконання завдання користувача, приховування може зробити інтерфейс неповноцінним.

✔ Краще:

- змінити порядок блоків;
- розташувати інформацію вертикально;
- використовувати компактніше компонування;
- застосовувати розкривні секції, коли це доречно.

---

## 3. Використовувати фіксовану ширину для основного layout

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

Фіксована ширина основного контейнера може спричинити горизонтальне переповнення.

---

## 4. Вибирати breakpoints лише за назвами пристроїв

❌

    phone breakpoint
    tablet breakpoint
    laptop breakpoint

Ці назви не гарантують, що layout працюватиме правильно.

✔ Краще визначати breakpoint у точці, де контенту стає недостатньо місця або компонування перестає бути зручним.

---

## 5. Застосовувати забагато media queries

Якщо кожен компонент має багато вузьких діапазонів, CSS стає складнішим для підтримки.

✔ Спочатку перевіряй, чи можна використати:

    Flexbox
    CSS Grid
    minmax()
    auto-fit
    auto-fill
    max-width
    clamp()
    flexible spacing

Media queries потрібні тоді, коли поведінка layout справді повинна змінитися.

---

## 6. Використовувати лише відносні одиниці без обмежень

❌

    h1 {
        font-size: 8vw;
    }

На великому viewport заголовок може стати надмірно великим.

✔

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

`clamp()` задає мінімальну та максимальну межі.

---

## 7. Забувати про горизонтальне переповнення

Причинами можуть бути:

    fixed widths
    large images
    long URLs
    unbreakable text
    wide tables
    oversized grid items
    large margins

Корисні правила:

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

Для довгих текстових значень можна за потреби використовувати:

    .text {
        overflow-wrap: anywhere;
    }

Не варто бездумно приховувати горизонтальне переповнення через `overflow-x: hidden`, оскільки це може замаскувати проблему або обрізати важливий контент.

---

## 8. Робити touch targets занадто маленькими

Маленькі кнопки та близько розташовані посилання ускладнюють взаємодію пальцями.

✔ Перевіряй:

    target size
    spacing
    focus indicators
    accessible names
    contrast

---

## 9. Перевіряти лише два розміри екрана

Якщо сторінка працює на `390px` і `1440px`, це не гарантує правильної роботи на всіх проміжних ширинах.

✔ Перевіряй:

    narrow mobile
    typical mobile
    wide mobile
    tablet-sized viewport
    small desktop
    wide desktop

Точні ширини потрібно підбирати відповідно до компонентів і контенту.

---

## 10. Плутати Mobile First із mobile-only

Mobile First не означає, що потрібно створювати лише мобільну версію.

Мета — почати з базового інтерфейсу, а потім покращити його для більших екранів, зберігаючи логіку та зручність.

---

# Практичні приклади

## Приклад 1 — адаптивний контейнер

    .container {
        width: 100%;
        max-width: 75rem;
        margin-inline: auto;
        padding-inline: 1rem;
    }

Контейнер займає доступну ширину, але не перевищує заданий максимум.

---

## Приклад 2 — картки з автоматичним компонуванням

    .card-grid {
        display: grid;
        grid-template-columns: repeat(
            auto-fit,
            minmax(min(100%, 16rem), 1fr)
        );
        gap: 1rem;
    }

Grid автоматично розміщує стільки колонок, скільки поміщається.

`min(100%, 16rem)` допомагає не створювати колонку ширшою за контейнер, коли доступний простір менший за `16rem`.

Такий підхід зменшує потребу в окремих breakpoints для кількості колонок.

---

## Приклад 3 — адаптивний заголовок

    .page-title {
        font-size: clamp(2rem, 5vw, 4rem);
        line-height: 1.1;
        overflow-wrap: break-word;
    }

Заголовок плавно масштабується в установлених межах.

---

## Приклад 4 — дві колонки на широкому екрані

    .content-layout {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    @media (min-width: 56rem) {
        .content-layout {
            grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
            gap: 2rem;
        }
    }

На вузькому екрані контент розташовується вертикально.

На широкому екрані основна частина отримує більше простору, ніж бічна панель.

---

## Приклад 5 — адаптивна кнопка

    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 2.75rem;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
    }

    .button--full {
        width: 100%;
    }

На мобільному екрані кнопка може займати всю ширину доступної області.

На desktop вона може мати ширину відповідно до свого контенту.

Не кожна кнопка повинна бути повноширинною — це залежить від призначення компонента та структури сторінки.

---

## Приклад 6 — responsive spacing

    .section {
        padding-block: 2rem;
        padding-inline: 1rem;
    }

    @media (min-width: 48rem) {
        .section {
            padding-block: 3rem;
            padding-inline: 2rem;
        }
    }

На ширшому екрані секція отримує більше простору.

Для деяких проєктів плавні відступи можна реалізувати через `clamp()`:

    .section {
        padding-block: clamp(2rem, 5vw, 5rem);
        padding-inline: clamp(1rem, 4vw, 3rem);
    }

---

## Приклад 7 — адаптивна навігація

    .site-nav {
        display: none;
    }

    .menu-toggle {
        display: inline-flex;
    }

    @media (min-width: 48rem) {
        .site-nav {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        .menu-toggle {
            display: none;
        }
    }

Це лише CSS-частина адаптації. На мобільному пристрої кнопка повинна відкривати меню, а не залишати користувача без доступу до навігації.

---

## Приклад 8 — адаптивне зображення в картці

    .card-image {
        display: block;
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        border-radius: 0.5rem;
    }

Зображення займає ширину картки, зберігаючи задане співвідношення сторін.

`object-fit: cover` заповнює область, обрізаючи зайву частину зображення за потреби.

---

# Практичний мініпроєкт — Mobile First Landing Page

Мета — створити невелику сторінку курсу, яка починається з мобільного компонування і поступово адаптується до великих екранів.

Структура:

    landing-page/
    ├── index.html
    ├── styles.css
    └── script.js

## HTML

    <!DOCTYPE html>
    <html lang="uk">
    <head>
        <meta charset="UTF-8">
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
        >
        <meta
            name="description"
            content="Навчання веброзробки крок за кроком"
        >
        <title>Web Development Course</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <header class="site-header">
            <a class="logo" href="/">WebStart</a>

            <nav class="navigation" aria-label="Основна навігація">
                <a href="#courses">Курси</a>
                <a href="#about">Про нас</a>
                <a href="#contact">Контакти</a>
            </nav>

            <a class="header-action" href="#courses">
                Навчатися
            </a>
        </header>

        <main>
            <section class="hero">
                <div class="hero-content">
                    <p class="eyebrow">Навчання для початківців</p>

                    <h1>Створи свій перший вебпроєкт</h1>

                    <p class="hero-description">
                        Вивчай HTML, CSS та JavaScript
                        через практичні завдання.
                    </p>

                    <a class="button" href="#courses">
                        Переглянути курси
                    </a>
                </div>

                <div class="hero-image">
                    <img
                        src="images/learning.jpg"
                        alt="Робоче місце для навчання веброзробки"
                    >
                </div>
            </section>

            <section class="courses" id="courses">
                <h2>Наші курси</h2>

                <div class="course-grid">
                    <article class="course-card">
                        <h3>HTML</h3>
                        <p>
                            Структура та семантика вебсторінок.
                        </p>
                    </article>

                    <article class="course-card">
                        <h3>CSS</h3>
                        <p>
                            Стилізація та адаптивні компонування.
                        </p>
                    </article>

                    <article class="course-card">
                        <h3>JavaScript</h3>
                        <p>
                            Основи програмування для вебу.
                        </p>
                    </article>
                </div>
            </section>
        </main>

        <footer class="site-footer" id="contact">
            <p>WebStart — навчання через практику.</p>
        </footer>
    </body>
    </html>

## CSS

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
        font-family: system-ui, sans-serif;
        line-height: 1.6;
        color: #222;
    }

    img {
        display: block;
        max-width: 100%;
        height: auto;
    }

    a {
        color: inherit;
    }

    .site-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1rem;
        padding: 1rem;
    }

    .logo {
        font-size: 1.25rem;
        font-weight: 700;
        text-decoration: none;
    }

    .navigation {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .header-action {
        display: none;
    }

    .hero {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 2rem 1rem;
    }

    .hero h1 {
        max-width: 15ch;
        font-size: clamp(2rem, 7vw, 4rem);
        line-height: 1.1;
    }

    .hero-description {
        max-width: 45ch;
    }

    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 2.75rem;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        background: #174ea6;
        color: white;
        text-decoration: none;
    }

    .hero-image img {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        border-radius: 1rem;
    }

    .courses {
        padding: 2rem 1rem;
    }

    .course-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .course-card {
        min-width: 0;
        padding: 1.25rem;
        border: 1px solid #ddd;
        border-radius: 0.75rem;
    }

    .site-footer {
        padding: 1.5rem 1rem;
    }

    @media (min-width: 48rem) {
        .site-header {
            padding-inline: 2rem;
        }

        .header-action {
            display: inline-flex;
        }

        .hero {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            align-items: center;
            gap: 3rem;
            padding: 4rem 2rem;
        }

        .courses {
            padding: 3rem 2rem;
        }

        .course-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (min-width: 72rem) {
        .site-header,
        .hero,
        .courses,
        .site-footer {
            padding-inline: max(2rem, calc((100% - 72rem) / 2));
        }

        .course-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

Цей приклад показує базові принципи:

    Mobile First
        ↓
    Flexible Layout
        ↓
    Fluid Typography
        ↓
    Responsive Grid
        ↓
    Media Queries
        ↓
    Progressive Enhancement

Примітка: шлях `images/learning.jpg` — приклад. Для відображення зображення потрібно додати відповідний файл до проєкту.

---

# Як тестувати Mobile First

Перевіряй інтерфейс на різних ширинах viewport у браузерних DevTools.

Корисні перевірки:

    1. Чи немає горизонтального прокручування сторінки?
    2. Чи читаються заголовки та основний текст?
    3. Чи не виходять зображення за межі контейнерів?
    4. Чи зручно натискати кнопки?
    5. Чи доступні всі важливі функції?
    6. Чи правильно перебудовується Grid?
    7. Чи не стають рядки тексту надто довгими на desktop?
    8. Чи працюють форми на вузькому екрані?
    9. Чи не перекривають елементи один одного?
    10. Чи зберігається логічний порядок контенту?
    11. Чи можна користуватися сторінкою з клавіатури?
    12. Чи залишається сторінка придатною до використання при збільшенні тексту?

Не обмежуйся лише емуляцією пристроїв у DevTools. За можливості перевіряй сторінку на реальному телефоні.

---

# Типові запитання на співбесіді

Що таке Mobile First?

Чим Mobile First відрізняється від Desktop First?

Чим Mobile First відрізняється від Responsive Design?

Чому Mobile First допомагає визначати пріоритети контенту?

Що таке Progressive Enhancement?

Що таке Content Priority?

Що таке viewport?

Навіщо потрібен тег `meta name="viewport"`?

Чим `min-width` відрізняється від `max-width` у media queries?

Чому Mobile First зазвичай використовує `min-width`?

Чи обов'язково створювати окремі стилі для кожного пристрою?

Як визначати breakpoints?

Чому breakpoints не повинні залежати лише від популярних моделей пристроїв?

Що таке fluid layout?

Чим `width: 100%` відрізняється від `max-width: 100%`?

Для чого використовують `clamp()`?

Як зробити адаптивну сітку карток?

Чому фіксована ширина контейнера може створити проблеми на мобільному екрані?

Що таке Content Reflow?

Як Mobile First впливає на проєктування навігації?

Що таке Touch Target?

Як перевірити, чи зручні кнопки для сенсорного керування?

Чому не потрібно приховувати весь другорядний контент без аналізу його важливості?

Як уникнути горизонтального переповнення?

Як перевіряти responsive interface?

Які переваги та обмеження Mobile First?

Чи завжди Mobile First кращий за Desktop First?

Як Mobile First пов'язаний з Accessibility?

Як створити responsive layout без великої кількості media queries?

---

# Шлях вивчення

## 🟢 Core — обов'язково знати

Що таке Mobile First.

Що таке Responsive Design.

Різниця між Mobile First і Desktop First.

Content Priority.

Основи mobile layout.

Основи flexible layout.

Viewport.

Тег `meta name="viewport"`.

CSS media queries.

`min-width`.

Основи `max-width`.

Базові стилі для маленького екрана.

Додавання стилів для ширших екранів.

Основи responsive images.

Основи responsive typography.

Основи touch targets.

Перевірка горизонтального переповнення.

Перевірка інтерфейсу на різних ширинах.

## 🔵 Junior — впевнене практичне використання

Створення повноцінного Mobile First layout.

Побудова адаптивного контейнера.

Responsive Grid.

Responsive Flexbox.

Content Reflow.

Progressive Enhancement.

Fluid Typography.

Використання `clamp()`.

Використання `minmax()`.

Використання `auto-fit` та `auto-fill`.

Адаптація карток і форм.

Адаптація навігації.

Адаптивні відступи.

Вибір breakpoints на основі контенту.

Основи responsive images через `srcset` та `sizes`.

Перевірка accessibility.

Тестування на проміжних ширинах.

Усунення overflow.

Підтримка збільшення тексту.

## 🟠 Middle — поглиблене розуміння

Проєктування складних responsive interfaces.

Оптимізація layout для великої кількості компонентів.

Поєднання media queries та intrinsic layout.

Container Queries.

Responsive component architecture.

Responsive data tables.

Адаптація складних dashboards.

Адаптивна навігація для великих інформаційних архітектур.

Responsive images та art direction.

Робота з довгим контентом і динамічними даними.

Responsive behavior для складних форм.

Accessibility у складних адаптивних інтерфейсах.

Тестування крайніх розмірів viewport.

Виявлення layout regressions.

Баланс між гнучкістю CSS і кількістю breakpoints.

## 🔴 Senior — системне проєктування

Responsive Design Systems.

Responsive tokens.

Архітектура responsive components.

Вибір між viewport-based та container-based адаптацією.

Масштабування дизайн-системи для різних пристроїв.

Оптимізація складних layout.

Продуктивність responsive images.

Складні сценарії accessibility.

Тестування великої кількості responsive states.

Visual regression testing.

Responsive design governance.

Аналіз компромісів між usability, maintainability та performance.

Створення правил адаптивності для цілої дизайн-системи.

---

# Міні-шпаргалка

## Mobile First

    Small Screen
         ↓
    Essential Content
         ↓
    Basic Layout
         ↓
    Larger Screens
         ↓
    Additional Enhancements

## Базові стилі

    .container {
        width: 100%;
        padding-inline: 1rem;
        margin-inline: auto;
    }

## Responsive Container

    .container {
        width: 100%;
        max-width: 72rem;
        padding-inline: 1rem;
        margin-inline: auto;
    }

## Mobile First Media Query

    @media (min-width: 48rem) {
        /* Wider viewport */
    }

## Desktop First Media Query

    @media (max-width: 48rem) {
        /* Narrower viewport */
    }

## Responsive Grid

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

## Fluid Typography

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

## Responsive Images

    img {
        display: block;
        max-width: 100%;
        height: auto;
    }

## Touch Target

    .button {
        min-height: 2.75rem;
        padding: 0.75rem 1rem;
    }

## Viewport Meta

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
    >

## Flexible Layout

    .container {
        width: 100%;
        max-width: 75rem;
        margin-inline: auto;
    }

## Основна логіка

    Mobile First
        → почати з малого екрана

    Content Priority
        → визначити найважливіше

    Flexible Layout
        → використати доступний простір

    min-width
        → додавати зміни для ширших екранів

    Breakpoints
        → змінювати layout за потреби

    Responsive Testing
        → перевіряти різні ширини

---

# Головне

• Mobile First — стратегія проєктування інтерфейсу, яка починається з маленьких екранів.

• Responsive Design — ширший підхід до адаптації інтерфейсу до доступного простору та умов використання.

• Desktop First починається з великого екрана та адаптує layout для менших.

• Mobile First допомагає визначити пріоритети контенту та основних дій.

• Базові CSS-правила зазвичай описують мобільний стан інтерфейсу.

• `@media (min-width: ...)` дозволяє додавати зміни для ширших viewport.

• Breakpoints потрібно вибирати на основі поведінки контенту, а не лише назв пристроїв.

• Flexible layouts зменшують залежність від фіксованих розмірів.

• `max-width` допомагає обмежувати ширину контейнера.

• `minmax()` та `fr` допомагають створювати гнучкі Grid layouts.

• `clamp()` дозволяє задавати мінімальний, бажаний та максимальний розмір.

• Responsive images повинні враховувати доступну ширину та зберігати пропорції.

• Навігація, форми та кнопки мають залишатися зручними на маленьких екранах.

• Не потрібно автоматично приховувати важливий контент на мобільних пристроях.

• Mobile First не означає mobile-only і не вимагає відмови від функціональності на великих екранах.

• Необхідно перевіряти проміжні ширини, довгий контент, збільшення тексту та горизонтальне переповнення.

• Responsive Design потрібно розглядати разом з Accessibility та usability.

• Якісний Mobile First інтерфейс починається з важливих завдань користувача, а не з розмірів екрана.

• Основна модель:

    Content Priority
          ↓
    Mobile Layout
          ↓
    Flexible CSS
          ↓
    Responsive Breakpoints
          ↓
    Larger Layouts
          ↓
    Testing and Refinement

• Головна мета — не просто вмістити інтерфейс на маленькому екрані, а забезпечити зручне використання на різних розмірах viewport.