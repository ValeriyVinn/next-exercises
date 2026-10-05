# 03. Visual Hierarchy

## Що таке Visual Hierarchy

**Visual Hierarchy (візуальна ієрархія)** — це спосіб організації елементів інтерфейсу так, щоб користувач **одразу розумів, що головне, що другорядне і в якому порядку потрібно дивитися та діяти**.

Простими словами:

> Visual Hierarchy відповідає на питання: **«Що користувач повинен побачити першим, другим і третім?»**

Інтерфейс може містити ті самі елементи, але залежно від їхнього розміру, кольору, положення, контрасту та відступів користувач сприйматиме їх зовсім по-різному.

Наприклад:

    Заголовок сторінки
          ↓
    Короткий опис
          ↓
    Основна дія
          ↓
    Додаткова інформація
          ↓
    Другорядні дії

Visual Hierarchy допомагає створити саме такий порядок сприйняття.

---

# 1. Навіщо потрібна Visual Hierarchy

Користувач зазвичай не читає інтерфейс послідовно, як книгу.

Він:

- швидко сканує сторінку;
- шукає потрібну інформацію;
- помічає великі та контрастні елементи;
- групує пов'язані елементи;
- звертає увагу на знайомі патерни;
- шукає наступну дію.

Тому хороший UI повинен підказувати:

    Що це?
       ↓
    Де я?
       ↓
    Що тут важливе?
       ↓
    Що я можу зробити?
       ↓
    Що станеться після дії?

---

# 2. Основна ідея

Visual Hierarchy створює **рівні важливості**.

Наприклад, для сторінки товару:

    LEVEL 1
    Назва товару
        ↓
    LEVEL 2
    Ціна
        ↓
    LEVEL 3
    Опис
        ↓
    LEVEL 4
    Додаткові характеристики
        ↓
    LEVEL 5
    Другорядні дії

Не всі елементи повинні «кричати» однаково голосно.

Якщо:

    Заголовок
    Ціна
    Опис
    Кнопка
    Посилання
    Іконки
    Допоміжний текст

мають однаковий розмір, колір і контраст, користувачу складно визначити пріоритет.

---

# 3. Visual Hierarchy ≠ просто великий текст

Поширена помилка:

> «Щоб елемент був важливішим, потрібно зробити його більшим».

Розмір — лише **один із інструментів**.

Visual Hierarchy створюється за допомогою:

- Size
- Weight
- Color
- Contrast
- Position
- Spacing
- Alignment
- Whitespace
- Grouping
- Typography
- Shape
- Visual density
- Images
- Motion

Тому:

    Hierarchy
        =
    Size
    + Weight
    + Color
    + Contrast
    + Position
    + Spacing
    + Grouping
    + Typography
    + Whitespace
    + ...

---

# 4. Size — розмір

Розмір — один із найочевидніших способів показати важливість.

Більший елемент зазвичай сприймається як важливіший.

Наприклад:

    Dashboard

    124
    нових повідомлення

    Детальна інформація...

Заголовок:

    32px

може сприйматися важливіше, ніж:

    14px

допоміжний текст.

---

## 4.1. Приклад

Погана ієрархія:

    Мій профіль
    Редагувати профіль
    Змінити пароль
    Видалити акаунт

Усе однакового розміру.

Краща:

    Мій профіль

    Редагувати профіль
    Змінити пароль

    Видалити акаунт

Остання дія може бути візуально відокремлена, тому що вона має інший рівень важливості та потенційно небезпечна.

---

# 5. Typography — типографіка

Типографіка є одним із головних інструментів Visual Hierarchy.

Вона дозволяє створювати рівні:

    H1
      ↓
    H2
      ↓
    H3
      ↓
    Body
      ↓
    Secondary text
      ↓
    Caption

Наприклад:

    H1 — 40px / Bold

    H2 — 28px / Semibold

    H3 — 22px / Semibold

    Body — 16px / Regular

    Secondary — 14px / Regular

    Caption — 12px / Regular

Це створює візуальну структуру сторінки.

---

# 6. Font Weight — насиченість

Навіть однаковий розмір тексту може мати різну візуальну вагу.

Наприклад:

    Regular
    Medium
    Semibold
    Bold

Порівняння:

    Назва товару
    1299 грн
    Короткий опис товару

Можна зробити:

    Назва товару       → Semibold
    1299 грн            → Bold
    Короткий опис       → Regular

Таким чином користувач швидше визначає структуру.

---

# 7. Color — колір

Колір може показувати:

- важливість;
- статус;
- категорію;
- доступність;
- помилку;
- успішність;
- активний стан;
- заклик до дії.

Наприклад:

    PRIMARY ACTION
    [ Зберегти ]

    SECONDARY ACTION
    [ Скасувати ]

    DANGER ACTION
    [ Видалити ]

Необов'язково робити всі кнопки яскравими.

Якщо всі елементи яскраві:

    🔴 Save
    🔵 Cancel
    🟢 Export
    🟠 Delete
    🟣 Share

то жоден із них не має достатньої візуальної переваги.

---

# 8. Contrast — контраст

Контраст допомагає відокремити важливе від другорядного.

Контраст може бути:

- світлий ↔ темний;
- великий ↔ малий;
- жирний ↔ звичайний;
- насичений ↔ приглушений;
- кольоровий ↔ нейтральний;
- заповнений ↔ контурний.

Наприклад:

    [ Зберегти ]

    Скасувати

Кнопка `Зберегти` може бути filled button, а `Скасувати` — text button.

Таким чином:

    Primary action
          ↓
    [ Зберегти ]

    Secondary action
          ↓
    Скасувати

---

# 9. Position — положення

Положення елемента також створює ієрархію.

У багатьох культурах користувачі звикли сканувати інтерфейс:

    зліва → направо
    зверху → вниз

Тому верхня частина сторінки часто має більшу інформаційну вагу.

Наприклад:

    ┌──────────────────────────────┐
    │ Logo        Navigation       │
    ├──────────────────────────────┤
    │                              │
    │ Main heading                 │
    │ Description                  │
    │                              │
    │ [ Primary Action ]           │
    │                              │
    └──────────────────────────────┘

Заголовок розташований раніше, тому сприймається як основний елемент.

---

# 10. Above the Fold

**Above the Fold** — частина сторінки, яку користувач бачить без прокручування.

Ця область особливо важлива для:

- landing pages;
- dashboards;
- ecommerce;
- marketing pages;
- SaaS applications.

Наприклад:

    ┌──────────────────────────────┐
    │ Header                       │
    │                              │
    │ Main message                │
    │ Short explanation           │
    │                              │
    │ [ Get Started ]             │
    │                              │
    └──────────────────────────────┘
               ↑
         Above the Fold

Користувач повинен швидко зрозуміти:

    Що це?
    Для кого?
    Яка користь?
    Що робити далі?

---

# 11. Spacing — відступи

Whitespace / negative space — це **порожній простір між елементами**.

Порожній простір — не «втрата місця».

Він допомагає:

- розділяти групи;
- створювати ритм;
- зменшувати cognitive load;
- виділяти важливі елементи;
- покращувати читабельність.

Наприклад:

    User Profile
    Name
    Email
    Phone

    Security
    Password
    Two-factor authentication

Відстань між:

    Name
    Email
    Phone

менша, ніж між:

    Phone

    Security

Це показує, що `Name`, `Email`, `Phone` належать до однієї групи.

---

# 12. Grouping — групування

Пов'язані елементи повинні виглядати пов'язаними.

Наприклад:

    Personal information

    Name
    [ Valeriy ]

    Email
    [ example@email.com ]

    Phone
    [ +380... ]

Це одна логічна група.

А:

    Security

    Password
    [ ******** ]

    Two-factor authentication
    [ ON ]

це вже інша група.

Visual Hierarchy допомагає користувачу зрозуміти:

    Що належить до чого?

---

# 13. Proximity — близькість

**Proximity** — принцип, за яким близько розташовані елементи сприймаються як пов'язані.

Наприклад:

    Product name
    Short description

    $49

    [ Buy ]

`Product name` і `Short description` знаходяться близько, тому сприймаються як одна інформаційна група.

---

# 14. Whitespace як інструмент ієрархії

Розглянемо:

    Title
    Description
    Button
    Additional information

Якщо між усіма елементами однакові відступи:

    Title
       ↓
    Description
       ↓
    Button
       ↓
    Additional information

структура може бути слабкою.

Краще:

    Title
    Description

        ↓ більше простору

    [ Button ]

        ↓ більше простору

    Additional information

Так ми підкреслюємо:

    Title + Description
            ↓
        Main Action
            ↓
      Supporting content

---

# 15. Alignment — вирівнювання

Вирівнювання створює невидимі лінії.

Наприклад:

    Dashboard

    Total users
    1,284

    Active users
    923

    New users
    124

Якщо всі елементи вирівняні по одній вертикальній осі, інтерфейс стає структурованішим.

Погано:

    Dashboard

          Total users
    1,284

        Active users
             923

      New users
          124

Добре:

    Dashboard

    Total users
    1,284

    Active users
    923

    New users
    124

Alignment допомагає користувачу швидше сканувати інформацію.

---

# 16. Visual Weight

**Visual Weight** — наскільки «важким» або помітним здається елемент.

Візуальна вага може збільшуватися через:

- великий розмір;
- жирний шрифт;
- яскравий колір;
- високий контраст;
- темний фон;
- складну форму;
- зображення;
- сильну межу;
- велику площу.

Наприклад:

    [ BUY NOW ]

може мати більшу Visual Weight, ніж:

    Learn more

---

# 17. Visual Weight ≠ Importance завжди

Важливий нюанс:

> Візуально помітний елемент не обов'язково є найважливішим з точки зору користувача.

Наприклад, реклама може бути дуже яскравою, але не мати відношення до головної задачі.

Хороший UI узгоджує:

    User importance
          ↓
    Visual importance

---

# 18. Primary / Secondary / Tertiary

Один із найкорисніших способів мислення про ієрархію:

## Primary

Головна дія.

    [ Save changes ]

## Secondary

Другорядна дія.

    Cancel

## Tertiary

Додаткова дія.

    Learn more

Візуально:

    Primary
    █████████████
    Save changes

    Secondary
    ───────────
    Cancel

    Tertiary
    Learn more

Необов'язково використовувати саме такі стилі, але принцип важливий.

---

# 19. CTA — Call To Action

**CTA (Call To Action)** — дія, яку ми хочемо, щоб користувач виконав.

Наприклад:

- Sign up
- Buy now
- Start learning
- Book appointment
- Save
- Continue
- Submit
- Get started

Visual Hierarchy повинна допомагати CTA бути помітним.

Наприклад:

    Create your account

    Enter your email to continue.

    [ Create account ]

    Already have an account?
    Sign in

Основна дія:

    Create account

має бути візуально сильнішою за:

    Sign in

---

# 20. F-Pattern

**F-Pattern** — модель сканування контенту, яка часто спостерігається на текстових та інформаційних сторінках.

Умовно:

    ─────────────────────────
    ─────────────────
    ─────────────
    ───────
    ─────
    ───

Користувач може більше уваги приділяти:

- верхній частині;
- лівій частині;
- початку рядків;
- заголовкам.

Це не означає:

> «Усі сайти потрібно будувати у формі F».

Це лише корисна модель для розуміння поведінки користувача.

---

# 21. Z-Pattern

**Z-Pattern** часто застосовується до простіших сторінок із невеликою кількістю тексту.

Умовна траєкторія:

    Logo ─────────────── CTA
       \                /
        \              /
         \            /
          \          /
           \        /
            Content
               \
                \
                 CTA

Наприклад:

    Logo                 Login

            Main message

                     Learn more

Це може бути корисним для landing pages.

---

# 22. Information Density

**Information Density** — кількість інформації, яку користувач бачить одночасно.

Наприклад, dashboard:

    ┌─────┬─────┬─────┬─────┐
    │ 124 │ 982 │ 45  │ 12  │
    ├─────┴─────┴─────┴─────┤
    │                         │
    │        Chart            │
    │                         │
    ├─────────────────────────┤
    │ Table                   │
    │                         │
    └─────────────────────────┘

Якщо додати ще:

    20 charts
    15 buttons
    8 filters
    30 icons
    50 labels

користувач може перевантажитися.

Тому Visual Hierarchy допомагає керувати:

    Information Density
            ↓
      Cognitive Load

---

# 23. Cognitive Load

**Cognitive Load** — кількість розумових зусиль, необхідних для сприйняття та використання інтерфейсу.

Погана ієрархія:

    [Save] [Cancel] [Export] [Share] [Delete]
    Title
    subtitle
    text
    badge
    icon
    icon
    menu
    link
    button

Користувачу складно зрозуміти:

    Що головне?

Хороша ієрархія:

    Page title

    Short explanation

    [ Primary action ]

    Supporting information

    Secondary actions

---

# 24. Hierarchy через Components

У сучасному frontend UI часто будується з компонентів.

Наприклад:

    <Page>
        <Header />
        <Main>
            <Hero />
            <Features />
            <Testimonials />
        </Main>
        <Footer />
    </Page>

Всередині:

    <Hero>
        <Heading />
        <Description />
        <PrimaryButton />
    </Hero>

Компонентна структура може відображати інформаційну ієрархію.

---

# 25. Visual Hierarchy у React

React-компонент:

    function ProductCard() {
        return (
            <article>
                <h2>Mechanical Keyboard</h2>

                <p>
                    Wireless mechanical keyboard.
                </p>

                <strong>$99</strong>

                <button>
                    Add to cart
                </button>
            </article>
        );
    }

Тут вже є певна ієрархія:

    h2
      ↓
    description
      ↓
    price
      ↓
    CTA

А CSS робить її візуальною.

    .title {
        font-size: 24px;
        font-weight: 700;
    }

    .description {
        font-size: 16px;
    }

    .price {
        font-size: 20px;
        font-weight: 600;
    }

    .button {
        font-weight: 600;
    }

---

# 26. Visual Hierarchy у Form

Розглянемо форму:

    Create account

    Email
    [________________]

    Password
    [________________]

    [ Create account ]

    Already have an account?
    Sign in

Ієрархія:

    1. Form title
    2. Input labels
    3. Inputs
    4. Primary CTA
    5. Secondary navigation

Не потрібно робити:

    Email
    Password
    Sign in
    Create account

усі однаково помітними.

---

# 27. Visual Hierarchy у Navigation

Navigation також має рівні.

Наприклад:

    Dashboard
    Courses
    Students
    Settings

Якщо користувач знаходиться на:

    Courses

можна показати active state:

    Dashboard
    Courses       ← active
    Students
    Settings

Active item отримує більшу візуальну вагу.

---

# 28. Visual Hierarchy у Dashboard

Dashboard може мати:

    Page title
          ↓
    Filters
          ↓
    Key metrics
          ↓
    Main chart
          ↓
    Detailed table

Наприклад:

    Analytics

    [ Date range ] [ Filter ]

    ┌────────┐ ┌────────┐ ┌────────┐
    │ 1,240  │ │ 923    │ │ 74%    │
    │ Users  │ │ Active │ │ Growth │
    └────────┘ └────────┘ └────────┘

    ┌──────────────────────────────┐
    │                              │
    │            Chart             │
    │                              │
    └──────────────────────────────┘

    Recent activity

Це значно краще, ніж випадкове розміщення всіх елементів.

---

# 29. Hierarchy та UI States

Ієрархія повинна працювати не тільки у normal state.

Наприклад:

    Normal
    ↓
    Hover
    ↓
    Focus
    ↓
    Active
    ↓
    Disabled
    ↓
    Loading
    ↓
    Error
    ↓
    Success

У кожному стані користувач повинен розуміти:

    Що зараз відбувається?

---

# 30. Hierarchy та Error Messages

Помилка повинна мати правильний рівень помітності.

Наприклад:

    Email

    [ wrong@email ]

    ⚠ Please enter a valid email address.

Помилка повинна бути:

- близько до поля;
- зрозумілою;
- достатньо помітною;
- але не руйнувати всю ієрархію сторінки.

---

# 31. Hierarchy та Loading

Під час завантаження важливо показувати користувачу:

    Що завантажується?
    ↓
    Чи потрібно чекати?
    ↓
    Що можна робити?

Наприклад:

    Course

    Loading lessons...

    [ Skeleton ]

Не потрібно одночасно показувати десятки індикаторів loading.

---

# 32. Hierarchy та Empty State

Empty state теж має власну структуру:

    No courses yet

    You haven't created any courses.

    [ Create course ]

Ієрархія:

    1. What happened?
    2. Why?
    3. What should I do?

---

# 33. Hierarchy та Accessibility

Visual Hierarchy не повинна залежати лише від кольору.

Погано:

    🟢 Available
    🔴 Unavailable

Якщо користувач не розрізняє кольори, інформація може бути втрачена.

Краще:

    ✓ Available

    ✕ Unavailable

Колір + текст + icon / shape створюють надійнішу систему.

---

# 34. Не все повинно бути помітним

Це дуже важливий принцип.

> Якщо все важливе — нічого не важливе.

Наприклад:

    [ SAVE ]
    [ EXPORT ]
    [ SHARE ]
    [ DELETE ]
    [ PRINT ]
    [ DOWNLOAD ]

Якщо всі кнопки однаково яскраві, hierarchy зникає.

Краще:

    [ Save ]

    Export
    Share
    Print

    Delete

Тут:

    Save   → Primary
    Export → Secondary
    Share  → Secondary
    Print  → Tertiary
    Delete → Destructive

---

# 35. Visual Hierarchy та Design Systems

У Design System можна стандартизувати ієрархію.

Наприклад:

    Typography

    Display
    Heading 1
    Heading 2
    Heading 3
    Body
    Caption

    Buttons

    Primary
    Secondary
    Tertiary
    Destructive

    Colors

    Primary
    Secondary
    Success
    Warning
    Error
    Neutral

Таким чином hierarchy стає системною, а не випадковою.

---

# 36. Design Tokens

Visual Hierarchy може бути описана через design tokens.

Наприклад:

    --font-size-display
    --font-size-heading-1
    --font-size-heading-2
    --font-size-body
    --font-size-caption

    --font-weight-regular
    --font-weight-medium
    --font-weight-semibold
    --font-weight-bold

    --space-xs
    --space-sm
    --space-md
    --space-lg
    --space-xl

Це допомагає підтримувати consistency.

---

# 37. 5 секундний тест

Корисний практичний тест:

> Подивитися на інтерфейс приблизно 5 секунд і відвернутися.

Потім запитати:

    Що це за сторінка?

    Що тут головне?

    Яка основна дія?

    Де я повинен натиснути?

Якщо відповіді незрозумілі — hierarchy, ймовірно, слабка.

---

# 38. Squint Test

**Squint Test** — простий спосіб перевірити hierarchy.

Уявно примружити очі або сильно зменшити масштаб сторінки.

Деталі зникають, але залишаються великі візуальні маси.

Наприклад:

    ███████████████
          ███
    █████████
       ███
       ███

Якщо візуально залишається логічна структура — hierarchy, ймовірно, працює.

---

# 39. Grayscale Test

Ще один корисний тест:

> Подивитися на дизайн без кольору.

Якщо hierarchy повністю зникає після видалення кольору, можливо, вона занадто сильно залежить від color.

Хороший дизайн використовує комбінацію:

    Size
    Weight
    Contrast
    Spacing
    Position
    Grouping
    Color

---

# 40. Типові помилки

## 40.1. Все однакового розміру

    Heading
    Body
    Button
    Caption

усе 16px.

Проблема:

> Немає рівнів.

---

## 40.2. Все bold

    TITLE
    IMPORTANT TEXT
    BUTTON
    DESCRIPTION

Проблема:

> Font weight перестає бути інструментом hierarchy.

---

## 40.3. Забагато кольорів

    🔴
    🟢
    🔵
    🟠
    🟣
    🟡

Проблема:

> Колір втрачає семантичну роль.

---

## 40.4. Забагато CTA

    [Buy]
    [Subscribe]
    [Learn]
    [Share]
    [Download]
    [Contact]

Проблема:

> Користувач не знає, яка дія основна.

---

## 40.5. Немає whitespace

Елементи:

    Title
    Description
    Button
    Card
    Table
    Footer

розташовані майже впритул.

Проблема:

> Важко визначити групи.

---

## 40.6. Погане вирівнювання

Навіть хороші компоненти можуть виглядати хаотично, якщо вони не мають спільних alignment lines.

---

## 40.7. Важливе заховане

Наприклад:

    Основна дія

знаходиться далеко внизу сторінки, а другорядні посилання знаходяться зверху.

---

## 40.8. Decorative elements сильніші за content

Наприклад:

    величезна ілюстрація
    яскраві декоративні форми
    а поруч маленький важливий текст

Декор може перехопити увагу.

---

# 41. Практичний алгоритм створення Visual Hierarchy

Перед дизайном постав питання:

    1. Що користувач повинен побачити першим?
                ↓
    2. Що він повинен побачити другим?
                ↓
    3. Яка головна дія?
                ↓
    4. Яка інформація другорядна?
                ↓
    5. Що можна зробити менш помітним?
                ↓
    6. Які елементи належать до однієї групи?
                ↓
    7. Де потрібен whitespace?
                ↓
    8. Які елементи потребують contrast?
                ↓
    9. Як hierarchy працює на mobile?
                ↓
    10. Як hierarchy працює у різних states?

---

# 42. Практичний приклад

Уявімо сторінку курсу:

    Course details

    JavaScript Fundamentals

    Learn the fundamentals of JavaScript
    through practical exercises.

    12 lessons
    Beginner
    6 hours

    [ Start course ]

    Course description

    This course covers...

Правильна ієрархія:

    LEVEL 1
    JavaScript Fundamentals

        ↓

    LEVEL 2
    Learn the fundamentals...

        ↓

    LEVEL 3
    12 lessons · Beginner · 6 hours

        ↓

    LEVEL 1 ACTION
    [ Start course ]

        ↓

    LEVEL 2 CONTENT
    Course description

---

# 43. Visual Hierarchy → User Flow

Hierarchy повинна відповідати user flow.

Наприклад:

    User wants to buy product
                ↓
         Product page
                ↓
          Product name
                ↓
              Price
                ↓
        Product information
                ↓
          [ Add to cart ]
                ↓
             Checkout

Візуальна hierarchy повинна підтримувати цей flow.

Якщо:

    Reviews
    Related products
    Advertisement
    Social buttons

візуально сильніші за:

    [ Add to cart ]

hierarchy суперечить user goal.

---

# 44. Visual Hierarchy → UX

Visual Hierarchy — це UI-інструмент, але він безпосередньо впливає на UX.

Можна мислити так:

    User goal
        ↓
    User flow
        ↓
    Information hierarchy
        ↓
    Visual hierarchy
        ↓
    Interaction
        ↓
    Feedback
        ↓
    Result

Тобто Visual Hierarchy — це не просто «гарно розставити елементи».

Вона допомагає користувачу рухатися до результату.

---

# 45. Visual Hierarchy → HTML

Цікаво, що хороша visual hierarchy часто має відповідати семантичній структурі HTML.

Наприклад:

    <main>
        <h1>JavaScript Course</h1>

        <p>
            Learn JavaScript through practice.
        </p>

        <button>
            Start course
        </button>

        <section>
            <h2>Course contents</h2>
        </section>
    </main>

Тут HTML вже описує hierarchy:

    h1
      ↓
    p
      ↓
    button
      ↓
    section
      ↓
    h2

CSS потім створює візуальне представлення цієї структури.

---

# 46. Visual Hierarchy → CSS

CSS дозволяє реалізувати hierarchy:

    .page-title {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1rem;
    }

    .description {
        font-size: 1rem;
        color: #666;
        max-width: 60ch;
    }

    .primary-button {
        margin-top: 1.5rem;
        font-weight: 600;
    }

Але важливо:

> CSS не повинен компенсувати погану інформаційну структуру.

Спочатку:

    Information hierarchy

потім:

    Visual hierarchy

---

# 47. Visual Hierarchy у Responsive Design

Hierarchy повинна адаптуватися до ширини екрана.

Desktop:

    ┌───────────────┬───────────────┐
    │ Main content  │ Sidebar       │
    │               │               │
    │               │               │
    └───────────────┴───────────────┘

Mobile:

    ┌───────────────────────────────┐
    │ Main content                 │
    │                               │
    │ Sidebar content              │
    └───────────────────────────────┘

На mobile може змінитися:

- порядок елементів;
- розмір заголовка;
- spacing;
- кількість одночасно видимих елементів;
- navigation;
- розташування CTA.

---

# 48. Responsive Hierarchy

Desktop hierarchy:

    Title
    Description       Image

    Features          CTA

Mobile hierarchy:

    Title
    Description
    Image
    Features
    CTA

Тобто responsive design — це не тільки:

    width: 100%;

Це також:

> Як змінюється інформаційна та візуальна hierarchy на різних екранах?

---

# 49. Visual Hierarchy та Mobile

На маленькому екрані особливо важливо:

- зменшувати зайву інформацію;
- залишати основну дію;
- правильно використовувати spacing;
- не перевантажувати navigation;
- робити touch targets достатніми;
- підтримувати зрозумілий порядок content.

Mobile:

    Page title
        ↓
    Key information
        ↓
    Primary action
        ↓
    Supporting content
        ↓
    Secondary actions

---

# 50. Mental Model

Корисна модель для запам'ятовування:

    USER
      ↓
    Що йому потрібно?
      ↓
    USER GOAL
      ↓
    Яка дія веде до goal?
      ↓
    PRIMARY ACTION
      ↓
    Що потрібно побачити перед дією?
      ↓
    INFORMATION HIERARCHY
      ↓
    Як це зробити помітним?
      ↓
    VISUAL HIERARCHY

---

# 51. Що потрібно пам'ятати

1. **Visual Hierarchy** визначає порядок сприйняття елементів.

2. Користувач не читає UI як звичайний текст — він його сканує.

3. Розмір — лише один інструмент hierarchy.

4. Typography створює рівні інформації.

5. Font weight створює visual weight.

6. Color може показувати importance та state.

7. Contrast допомагає виділяти важливе.

8. Position впливає на порядок сприйняття.

9. Whitespace допомагає групувати інформацію.

10. Proximity показує зв'язок між елементами.

11. Alignment створює структурованість.

12. Не всі елементи повинні бути однаково помітними.

13. Primary action повинна мати вищу visual weight, ніж secondary action.

14. Якщо все яскраве — нічого не виділяється.

15. Visual hierarchy повинна підтримувати user goal.

16. Хороша hierarchy зменшує cognitive load.

17. Hierarchy повинна працювати у loading, error, empty, success та disabled states.

18. Hierarchy повинна працювати на mobile.

19. Колір не повинен бути єдиним способом передачі важливої інформації.

20. Хороша Visual Hierarchy допомагає користувачу відповісти:

    Що це?
    Що тут важливе?
    Що я повинен зробити?
    Що станеться після цього?

---

# 52. Практичний Checklist

Перед тим як вважати UI готовим, перевір:

## Content

- [ ] Чітко видно головний заголовок.
- [ ] Зрозуміло призначення сторінки.
- [ ] Основна інформація легко знаходиться.
- [ ] Другорядна інформація не конкурує з основною.

## Typography

- [ ] Є зрозуміла шкала заголовків.
- [ ] Body text легко читається.
- [ ] Font weight використовується системно.
- [ ] Caption / secondary text не надто помітний.

## Layout

- [ ] Є логічні групи.
- [ ] Використовується whitespace.
- [ ] Елементи вирівняні.
- [ ] Немає випадкової щільності.

## Actions

- [ ] Є зрозуміла primary action.
- [ ] Secondary actions не конкурують з primary.
- [ ] Destructive actions легко відрізнити.
- [ ] CTA легко знайти.

## Visual

- [ ] Контраст достатній.
- [ ] Колір використовується осмислено.
- [ ] Декоративні елементи не перетягують увагу.
- [ ] Іконки не конкурують з основним content.

## Responsive

- [ ] Hierarchy працює на desktop.
- [ ] Hierarchy працює на tablet.
- [ ] Hierarchy працює на mobile.
- [ ] Основна дія залишається доступною.

## Accessibility

- [ ] Hierarchy не залежить тільки від кольору.
- [ ] Text має достатній contrast.
- [ ] Heading structure логічна.
- [ ] Focus state помітний.
- [ ] Interactive elements зрозумілі.

---

# 53. Типові питання на співбесіді

### Що таке Visual Hierarchy?

Visual Hierarchy — це організація елементів інтерфейсу за рівнями візуальної важливості, яка допомагає користувачу швидко зрозуміти структуру сторінки та визначити наступну дію.

---

### Які інструменти створюють Visual Hierarchy?

Основні:

    Size
    Typography
    Font weight
    Color
    Contrast
    Position
    Spacing
    Whitespace
    Alignment
    Grouping
    Visual weight

---

### Чому не можна зробити всі кнопки яскравими?

Тому що тоді вони отримують приблизно однакову visual weight і користувачу складно визначити primary action.

---

### Що таке Visual Weight?

Visual Weight — це ступінь візуальної помітності елемента.

Вона залежить від:

    Size
    Color
    Contrast
    Weight
    Shape
    Position
    Area

---

### Що таке whitespace?

Whitespace — порожній простір між елементами, який допомагає створювати групи, hierarchy, ритм та читабельність.

---

### Як перевірити hierarchy?

Можна використати:

    5-second test
    Squint test
    Grayscale test
    Responsive test

---

### Чому Visual Hierarchy важлива для UX?

Тому що вона допомагає користувачу швидше:

    знайти інформацію
          ↓
    зрозуміти структуру
          ↓
    знайти потрібну дію
          ↓
    виконати задачу

---

# 54. Рівні освоєння

## 🟢 Core

Потрібно розуміти:

- що таке Visual Hierarchy;
- Size;
- Typography;
- Color;
- Contrast;
- Spacing;
- Whitespace;
- Alignment;
- Primary / Secondary actions.

---

## 🔵 Junior

Потрібно вміти:

- створити hierarchy для простого UI;
- оформити форму;
- оформити card;
- виділити CTA;
- використовувати typography scale;
- правильно використовувати whitespace;
- створити responsive hierarchy;
- відрізняти primary та secondary actions.

---

## 🟣 Middle

Потрібно вміти:

- проектувати hierarchy для складних сторінок;
- працювати з information architecture;
- створювати hierarchy для dashboard;
- працювати з information density;
- будувати design system;
- використовувати design tokens;
- враховувати accessibility;
- адаптувати hierarchy під різні viewport;
- проектувати states.

---

## 🔴 Senior

Потрібно розуміти:

- hierarchy як частину UX strategy;
- relationship між business goal та user goal;
- cognitive load;
- information architecture;
- complex dashboards;
- design systems;
- accessibility;
- responsive behavior;
- visual communication;
- hierarchy в масштабних продуктах;
- consistency між різними продуктами та платформами.

---

# 55. Для Frontend Developer

Для frontend developer Visual Hierarchy особливо важлива тому, що frontend — це місце, де:

    UX idea
        ↓
    UI design
        ↓
    HTML
        ↓
    CSS
        ↓
    React components
        ↓
    Interaction
        ↓
    User experience

Ти не обов'язково повинен бути професійним UI designer.

Але ти повинен розуміти:

    Чому цей елемент більший?
    Чому ця кнопка primary?
    Чому тут великий відступ?
    Чому цей текст muted?
    Чому цей блок знаходиться вище?
    Чому sidebar менш помітний?
    Чому CTA має більший contrast?

Тоді ти не просто «перекладаєш Figma у JSX».

Ти розумієш, **яку задачу вирішує дизайн**.

---

# 56. UI → CSS → React

Корисно бачити зв'язок:

    Visual Hierarchy
          ↓
    Design decision
          ↓
    CSS
          ↓
    Component
          ↓
    React application

Наприклад:

    Primary action
          ↓
    Button hierarchy
          ↓
    .button-primary
          ↓
    <Button variant="primary" />
          ↓
    reusable component

Це вже перехід від UI Design до frontend architecture.

---

# 57. Mini Cheat Sheet

    Visual Hierarchy
        ↓
    порядок візуального сприйняття
        ↓
    Що перше?
        ↓
    Що друге?
        ↓
    Що третє?
        ↓
    Яка головна дія?

    Основні інструменти:

    Size
    Weight
    Color
    Contrast
    Position
    Spacing
    Whitespace
    Alignment
    Grouping
    Typography

    Основні рівні:

    Primary
    Secondary
    Tertiary

    Основні тести:

    5-second test
    Squint test
    Grayscale test
    Responsive test

    Основна мета:

    User goal
        ↓
    Clear hierarchy
        ↓
    Clear action
        ↓
    Successful result

---

# 58. Головне

> **Visual Hierarchy — це не про те, щоб зробити красивий інтерфейс.**

> **Visual Hierarchy — це про те, щоб керувати увагою користувача.**

Хороший UI не змушує користувача думати:

    «Куди мені дивитися?»

Він візуально підказує:

    Подивись сюди.
          ↓
    Прочитай це.
          ↓
    Зрозумій контекст.
          ↓
    Зроби цю дію.
          ↓
    Отримай результат.

Тому корисна ментальна модель:

    User
      ↓
    Goal
      ↓
    Task
      ↓
    Information Hierarchy
      ↓
    Visual Hierarchy
      ↓
    Primary Action
      ↓
    Interaction
      ↓
    Feedback
      ↓
    Result

І головне правило:

> **Якщо все однаково помітне — нічого не має пріоритету.**

Хороша Visual Hierarchy створює **порядок, пріоритет і напрямок уваги**.

Саме тому вона є одним із фундаментальних понять UI Design.