# 01. What Is UI

UI (User Interface) — інтерфейс користувача, тобто все те, за допомогою чого людина взаємодіє з цифровим продуктом.

UI визначає:

- як виглядає інтерфейс;
- які елементи бачить користувач;
- як ці елементи організовані;
- як користувач розуміє призначення елементів;
- як користувач взаємодіє з продуктом;
- що відбувається після дії користувача;
- як система повідомляє про результат дії;
- наскільки інтерфейс зрозумілий, передбачуваний та зручний.

UI — це не просто "гарний дизайн".

Хороший UI допомагає користувачу:

    understand
        ↓
    navigate
        ↓
    interact
        ↓
    complete a task
        ↓
    understand the result

---

# User Interface

UI — скорочення від:

    User Interface

Українською:

    інтерфейс користувача

Interface — це точка взаємодії між людиною та системою.

Наприклад, у вебзастосунку такими точками взаємодії можуть бути:

    button
    input
    checkbox
    select
    navigation
    link
    card
    modal
    menu
    form
    table
    notification

Користувач взаємодіє з ними, щоб виконати певну задачу.

---

# Приклад UI

Наприклад, форма входу:

    ┌─────────────────────────────┐
    │          Login              │
    │                             │
    │  Email                      │
    │  ┌───────────────────────┐  │
    │  │ user@example.com      │  │
    │  └───────────────────────┘  │
    │                             │
    │  Password                   │
    │  ┌───────────────────────┐  │
    │  │ •••••••••             │  │
    │  └───────────────────────┘  │
    │                             │
    │       [ Sign In ]           │
    │                             │
    │       Forgot password?      │
    └─────────────────────────────┘

Це UI.

Він містить:

    text
    labels
    inputs
    button
    link
    spacing
    typography
    colors
    hierarchy
    states

Але UI — це не тільки зовнішній вигляд.

Важливо також, як інтерфейс поводиться під час взаємодії.

---

# UI як система

UI можна розглядати як систему:

    User
      ↓
    Interface
      ↓
    Action
      ↓
    System
      ↓
    Feedback
      ↓
    User

Наприклад:

    User
      ↓
    clicks "Sign In"
      ↓
    Button
      ↓
    request
      ↓
    Server
      ↓
    response
      ↓
    Success / Error
      ↓
    UI feedback

---

# UI ≠ Visual Design

UI часто асоціюють тільки з:

    colors
    fonts
    buttons
    shadows
    icons
    animations

Але UI значно ширший.

UI включає:

    visual design
    layout
    interaction
    navigation
    states
    feedback
    components
    information presentation
    accessibility
    consistency

Наприклад, кнопка — це не тільки:

    background-color
    color
    border-radius

Кнопка також має:

    purpose
    label
    position
    size
    state
    interaction
    feedback
    accessibility

---

# UI Elements

UI складається з окремих елементів.

Основні UI elements:

    text
    heading
    paragraph
    link
    button
    input
    checkbox
    radio button
    select
    textarea
    image
    icon
    avatar
    badge
    card
    tooltip
    modal
    navigation
    menu
    table
    form

---

# UI Components

Кілька UI elements можуть об'єднуватися в component.

Наприклад:

    Input
        +
    Label
        +
    Error message

можуть утворити:

    Form Field

Інший приклад:

    Avatar
        +
    Name
        +
    Email
        +
    Action button

можуть утворити:

    User Card

Component — це повторно використовуваний UI-блок із певною функцією.

---

# UI Component Example

Наприклад:

    UserCard

може містити:

    Avatar
    Name
    Email
    Role
    Button

Візуально:

    ┌──────────────────────────────┐
    │  👤  John Smith              │
    │      john@example.com        │
    │      Administrator           │
    │                              │
    │      [ View profile ]        │
    └──────────────────────────────┘

Це вже не один UI element, а композиція елементів.

---

# Interface

Interface — спосіб взаємодії користувача із системою.

Наприклад, користувач може:

    click
    tap
    type
    select
    drag
    drop
    scroll
    swipe
    hover
    focus
    submit
    navigate

UI повинен робити ці взаємодії зрозумілими.

---

# User

UI завжди існує для конкретного користувача.

Тому хороший UI починається не з питання:

    "Який красивий дизайн зробити?"

а з питання:

    "Що користувач хоче зробити?"

Наприклад:

    User goal:
    create an account

UI може містити:

    Sign Up
    Name
    Email
    Password
    Confirm Password
    Create account

---

# User Goal

User goal — задача, яку користувач хоче виконати.

Приклади:

    log in
    create account
    buy a product
    search for information
    send a message
    upload a file
    book an appointment
    edit a profile
    complete a form
    read an article

UI повинен допомагати користувачу досягнути goal.

---

# Task

Task — конкретна дія або послідовність дій, необхідних для досягнення user goal.

Наприклад:

    Goal:
    buy a product

    Tasks:
    1. Find product
    2. Open product page
    3. Select size
    4. Add to cart
    5. Open cart
    6. Enter delivery information
    7. Pay

UI повинен підтримувати цей flow.

---

# User Flow

User Flow — послідовність кроків, які користувач проходить для виконання задачі.

Наприклад:

    Home
      ↓
    Product
      ↓
    Add to cart
      ↓
    Cart
      ↓
    Checkout
      ↓
    Payment
      ↓
    Confirmation

UI повинен робити цей шлях зрозумілим.

---

# UI and Interaction

UI визначає не тільки те, що користувач бачить, але й те, як інтерфейс реагує на його дії.

Наприклад:

    User clicks button
          ↓
    button changes state
          ↓
    request starts
          ↓
    loading indicator
          ↓
    request completes
          ↓
    success message

Тому важливе поняття:

    interaction

---

# Interaction

Interaction — взаємодія користувача з інтерфейсом.

Приклади:

    click button
    type text
    select option
    open menu
    close modal
    submit form
    drag item
    scroll page
    hover element
    focus input

UI повинен показувати користувачу, що його дія була прийнята.

---

# Feedback

Feedback — реакція системи на дію користувача.

Наприклад:

    click
      ↓
    button changes
      ↓
    loading
      ↓
    success

Або:

    submit form
      ↓
    invalid data
      ↓
    error message

Feedback допомагає користувачу зрозуміти:

    What happened?
    Was my action accepted?
    Is the system working?
    Did something go wrong?
    What should I do next?

Feedback буде детальніше розглядатися в:

    08-feedback

---

# UI States

UI element може мати різні стани.

Наприклад, button:

    default
    hover
    focus
    active
    disabled
    loading

Input:

    default
    focus
    filled
    error
    success
    disabled

Наприклад:

    [ Save ]

може стати:

    [ Saving... ]

а після завершення:

    [ Saved ]

UI повинен передбачати ці стани.

---

# Visual Design

Visual Design — візуальна сторона UI.

Вона включає:

    color
    typography
    spacing
    size
    shape
    contrast
    alignment
    hierarchy
    icons
    imagery

Наприклад:

    Button

може мати:

    blue background
    white text
    8px radius
    12px horizontal padding
    8px vertical padding

Але ці характеристики повинні підтримувати usability та hierarchy, а не існувати лише заради краси.

---

# Layout

Layout — спосіб розміщення UI elements на екрані.

Наприклад:

    Header
    ─────────────────────────────

    Sidebar    Main Content
               ┌───────────────┐
               │    Content    │
               └───────────────┘

    Footer
    ─────────────────────────────

Layout визначає:

    position
    size
    spacing
    alignment
    grouping
    relationships

Детальніше:

    02-layout-and-composition

---

# Visual Hierarchy

Visual hierarchy — спосіб показати користувачу, що важливіше, а що менш важливе.

Наприклад:

    MAIN HEADING
    large and prominent

    Supporting text
    smaller and less prominent

    [ Primary action ]
    visually emphasized

    Secondary action
    visually weaker

Користувач повинен швидко зрозуміти:

    What is this?
    What is important?
    What should I do?
    What can I ignore?

Детальніше:

    03-visual-hierarchy

---

# Typography

Typography — організація та використання тексту в UI.

Включає:

    font family
    font size
    font weight
    line height
    letter spacing
    text hierarchy
    alignment

Наприклад:

    Heading
        ↓
    Subheading
        ↓
    Body text
        ↓
    Caption

Typography допомагає створити hierarchy та readability.

Детальніше:

    04-typography

---

# Color

Color використовується для:

    hierarchy
    emphasis
    grouping
    status
    feedback
    branding
    affordance

Наприклад:

    green  → success
    red    → error
    yellow → warning
    blue   → information / action

Але колір не повинен бути єдиним способом передачі важливої інформації.

---

# Spacing

Spacing — відстань між UI elements.

Наприклад:

    Heading

    paragraph


    [ Button ]

Spacing допомагає показати:

    grouping
    hierarchy
    relationships
    rhythm

Поганий spacing може зробити хороший UI складним для розуміння.

---

# Alignment

Alignment — вирівнювання елементів.

Наприклад:

    Name
    Email
    Password

замість:

    Name
       Email
    Password

Правильне вирівнювання допомагає користувачу швидше сканувати інтерфейс.

---

# Grouping

Пов'язані елементи повинні виглядати пов'язаними.

Наприклад:

    Personal information

    Name
    Email
    Phone

може бути однією групою.

А:

    Payment

    Card number
    Expiration date
    CVV

іншою.

UI використовує:

    spacing
    borders
    background
    cards
    headings

щоб показати групування.

---

# Affordance

Affordance — властивість елемента, яка підказує користувачу, як із ним взаємодіяти.

Наприклад:

    Button
        ↓
    looks clickable

    Input
        ↓
    looks editable

    Link
        ↓
    looks navigational

Користувач повинен розуміти:

    "Що я можу тут зробити?"

Детальніше:

    07-affordance

---

# Consistency

Consistency — послідовність дизайну та поведінки.

Якщо одна кнопка:

    [ Save ]

виглядає певним чином, інші кнопки тієї ж ролі повинні поводитися аналогічно.

Наприклад:

    Primary button
        → same visual language

    Secondary button
        → same visual language

Consistency зменшує cognitive load.

Детальніше:

    05-consistency

---

# Simplicity

Simplicity — прагнення зробити інтерфейс максимально зрозумілим без непотрібної складності.

Це не означає:

    remove everything

Це означає:

    keep what is necessary
    remove what is unnecessary

Наприклад, замість:

    [ Create ]
    [ Create New ]
    [ Add ]
    [ New Item ]

можна залишити один чіткий primary action:

    [ Create ]

Детальніше:

    06-simplicity

---

# Design Patterns

Design Pattern — повторюване рішення типової UI-задачі.

Приклади:

    navigation bar
    tabs
    accordion
    modal
    dropdown
    pagination
    breadcrumbs
    search
    cards
    filters
    wizard
    toast notification

Користувачі вже знайомі з багатьма patterns.

Тому використання знайомих patterns може зробити UI більш передбачуваним.

Детальніше:

    09-design-patterns

---

# UI and Information

UI повинен допомагати користувачу знайти та зрозуміти інформацію.

Наприклад, dashboard може містити:

    Page title
        ↓
    Summary
        ↓
    Important metrics
        ↓
    Filters
        ↓
    Data
        ↓
    Actions

Інформація повинна бути:

    organized
    prioritized
    readable
    scannable

---

# UI and Actions

Кожна дія в UI повинна мати зрозумілу мету.

Наприклад:

    [ Save ]
    [ Cancel ]
    [ Delete ]

Користувач повинен розуміти:

    what will happen
    before performing the action

Особливо важливо для destructive actions.

Наприклад:

    [ Delete account ]

краще, ніж абстрактна:

    [ Continue ]

коли дія незворотна.

---

# Primary and Secondary Actions

Не всі actions мають однакову важливість.

Наприклад:

    [ Save changes ]
    Cancel

`Save changes` — primary action.

`Cancel` — secondary action.

UI може показувати цю різницю візуально:

    [ Save changes ]    Cancel

або:

    [ Save changes ]    [ Cancel ]

але primary action повинен бути очевидним.

---

# UI and Content

UI тісно пов'язаний із content.

Наприклад:

    ❌ Submit

може бути менш зрозумілим, ніж:

    ✓ Create account

А:

    ❌ Error

може бути менш корисним, ніж:

    ✓ Email address is invalid

Текст у UI повинен допомагати користувачу виконати задачу.

---

# Microcopy

Microcopy — короткі тексти інтерфейсу.

Приклади:

    button labels
    placeholders
    error messages
    helper text
    tooltips
    empty states
    confirmation messages

Наприклад:

    Password

    Must contain at least 8 characters.

Це краще, ніж просто:

    Password

---

# Empty State

Empty state — стан інтерфейсу, коли дані відсутні.

Наприклад:

    No projects yet.

    Create your first project to get started.

    [ Create project ]

Хороший empty state може пояснити:

    what happened
    why there is no data
    what the user can do next

---

# Error State

Error state — стан, коли щось пішло не так.

Наприклад:

    Unable to load projects.

    Please try again.

    [ Try again ]

Хороший error state повинен:

    explain the problem
    avoid unnecessary technical details
    suggest a next action

---

# Loading State

Loading state показує, що система працює.

Наприклад:

    Loading...

або:

    [ Saving... ]

або skeleton UI.

Без loading state користувач може подумати:

    "Нічого не відбувається."

---

# Success State

Success state повідомляє про успішне завершення дії.

Наприклад:

    Profile updated successfully.

Або:

    ✓ Changes saved

Feedback повинен бути достатнім, але не надмірним.

---

# Responsive UI

Сучасний UI повинен працювати на різних розмірах екрана.

Наприклад:

    Desktop
       ↓
    Tablet
       ↓
    Mobile

Layout може змінюватися:

    Desktop:
    Sidebar + Content

    Mobile:
    Menu + Content

Responsive design буде детальніше розглядатися в:

    07-responsive-design

---

# Mobile UI

На mobile:

    screen is smaller
    touch is primary input
    content space is limited

Тому потрібно враховувати:

    touch targets
    readable text
    spacing
    navigation
    content priority
    responsive layout

---

# Accessibility

UI повинен бути доступним для якомога більшої кількості користувачів.

Accessibility включає:

    keyboard navigation
    readable text
    sufficient contrast
    labels
    focus states
    semantic HTML
    screen reader support
    alternative text

Наприклад, button повинен бути доступний з клавіатури.

Accessibility буде детальніше розглядатися в:

    13-accessibility

---

# UI and Frontend Development

Для frontend developer UI є безпосередньо пов'язаним із кодом.

Наприклад, UI design:

    ┌─────────────────────────────┐
    │  Create account             │
    │                             │
    │  Email                      │
    │  [_______________________]  │
    │                             │
    │  Password                   │
    │  [_______________________]  │
    │                             │
    │       [ Create account ]    │
    └─────────────────────────────┘

може бути реалізований через:

    HTML
    CSS
    JavaScript

або:

    React
    Next.js

---

# UI → HTML

UI elements часто мають відповідні HTML elements.

Наприклад:

    heading
        ↓
    <h1>

    paragraph
        ↓
    <p>

    link
        ↓
    <a>

    button
        ↓
    <button>

    input
        ↓
    <input>

    form
        ↓
    <form>

Хороший UI design і semantic HTML повинні працювати разом.

---

# UI → CSS

CSS відповідає за значну частину visual presentation.

Наприклад:

    color
    background
    spacing
    typography
    layout
    borders
    shadows
    responsive behavior

Наприклад:

    button {
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 16px;
    }

UI design визначає visual intent.

CSS реалізує його.

---

# UI → JavaScript

JavaScript додає behavior.

Наприклад:

    User clicks button
          ↓
    JavaScript handles event
          ↓
    state changes
          ↓
    UI updates

Наприклад:

    Button
        ↓
    click
        ↓
    open modal

Або:

    Form
        ↓
    submit
        ↓
    validation
        ↓
    error / success

---

# UI → React

У React UI часто будується з components.

Наприклад:

    App
    ├── Header
    ├── Sidebar
    ├── Main
    │   ├── PageTitle
    │   ├── Search
    │   └── UserList
    │       └── UserCard
    └── Footer

Це відповідає component-based підходу.

---

# Component Thinking

UI можна розкладати на components.

Наприклад:

    Dashboard
        ↓
    Header
        ↓
    Navigation
        ↓
    Sidebar
        ↓
    Main
        ↓
    Card
        ↓
    Button

Це допомагає:

    reuse
    consistency
    maintainability
    scalability

---

# UI as a System

У реальних застосунках UI рідко складається з випадкових окремих елементів.

Зазвичай існує система:

    Design principles
          ↓
    Design tokens
          ↓
    Components
          ↓
    Patterns
          ↓
    Pages
          ↓
    Product

Наприклад:

    Button
    Input
    Card
    Modal

можуть бути частинами одного design system.

---

# Design System

Design System — набір правил, компонентів і принципів для створення послідовного UI.

Може включати:

    colors
    typography
    spacing
    icons
    components
    states
    patterns
    guidelines

Наприклад:

    Primary color
    Secondary color
    Border radius
    Spacing scale
    Heading styles
    Button styles
    Input styles

Детальніше:

    08-design-systems

---

# UI Quality

Хороший UI можна оцінювати за різними критеріями.

### Clarity

Чи зрозуміло користувачу:

    what this is
    what to do
    what happened

### Consistency

Чи однаково працюють однакові елементи?

### Simplicity

Чи немає непотрібної складності?

### Feedback

Чи система реагує на дії користувача?

### Accessibility

Чи можуть різні користувачі взаємодіяти з UI?

### Efficiency

Чи можна швидко виконати задачу?

### Error prevention

Чи допомагає UI уникати помилок?

---

# Good UI

Хороший UI:

    communicates clearly
    supports user goals
    is predictable
    provides feedback
    is consistent
    is accessible
    reduces unnecessary cognitive load
    supports efficient interaction

---

# Bad UI

Поганий UI може:

    hide important information
    use ambiguous labels
    overload the screen
    have inconsistent controls
    provide poor feedback
    use confusing navigation
    make errors difficult to recover from
    rely only on color
    have tiny interaction targets

---

# UI ≠ Decoration

Важливий принцип:

    UI is not decoration.

UI повинен вирішувати проблему взаємодії.

Наприклад:

    красивий button
        ≠
    хороший button

Хороший button повинен:

    look interactive
    have clear label
    have appropriate size
    have states
    provide feedback
    be accessible
    perform the expected action

---

# UI and UX

UI та UX пов'язані, але це не одне й те саме.

У спрощеному вигляді:

    UX
    ↓
    overall user experience

    UI
    ↓
    interface through which
    that experience is delivered

UX ширше поняття.

UI є важливою частиною UX.

Детальніше різниця буде розглядатися в:

    02-ui-vs-ux

---

# UI Designer

UI Designer працює з:

    visual hierarchy
    layout
    typography
    colors
    components
    states
    interaction patterns
    consistency
    responsive design
    accessibility

Типові інструменти можуть включати:

    Figma
    design systems
    component libraries
    prototyping tools

---

# Frontend Developer and UI

Frontend developer не обов'язково є професійним UI Designer.

Але для frontend developer дуже корисно розуміти:

    layout
    spacing
    typography
    hierarchy
    components
    responsive design
    states
    accessibility
    design systems

Це допомагає не просто "перекладати макет у код", а розуміти, чому UI побудований саме так.

---

# UI Workflow

Типовий спрощений процес:

    1. Understand user
           ↓
    2. Understand goal
           ↓
    3. Define task
           ↓
    4. Structure information
           ↓
    5. Create layout
           ↓
    6. Define visual hierarchy
           ↓
    7. Design components
           ↓
    8. Define states
           ↓
    9. Test interaction
           ↓
    10. Implement
           ↓
    11. Iterate

---

# From Problem to UI

Не варто починати з:

    "Яку кнопку намалювати?"

Краще почати з:

    What is the user's goal?

Наприклад:

    Goal:
    user wants to create a project

Далі:

    What information is required?

    Name
    Description

Далі:

    What action is needed?

    Create project

Далі:

    What feedback is needed?

    Success
    Error
    Loading

І лише після цього:

    layout
    typography
    colors
    components
    visual details

---

# Example: Login UI

User goal:

    Sign in to the application

Required information:

    Email
    Password

Primary action:

    Sign in

Secondary action:

    Forgot password?

States:

    default
    focus
    loading
    error
    success

Flow:

    Login page
        ↓
    Enter email
        ↓
    Enter password
        ↓
    Click Sign in
        ↓
    Loading
        ↓
    Success / Error

---

# Example: Search UI

User goal:

    Find a product

UI:

    Search input
        ↓
    Search button

Possible states:

    empty
    typing
    loading
    results
    no results
    error

Наприклад:

    Search products...

Після введення:

    Search products...
    "laptop"

Після пошуку:

    Results for "laptop"

Якщо результатів немає:

    No products found.

    Try another search.

---

# Example: Delete Action

User goal:

    Delete a project

Potential UI:

    [ Delete ]

Після натискання:

    ┌──────────────────────────────┐
    │ Delete project?              │
    │                              │
    │ This action cannot be undone.│
    │                              │
    │ [ Cancel ] [ Delete ]        │
    └──────────────────────────────┘

Це приклад UI, який допомагає запобігти випадковій destructive action.

---

# UI Mental Model

Корисно мислити UI такими рівнями:

    User
      ↓
    Goal
      ↓
    Task
      ↓
    Flow
      ↓
    Information
      ↓
    Layout
      ↓
    Components
      ↓
    States
      ↓
    Visual Design
      ↓
    Interaction
      ↓
    Feedback

Це набагато корисніше, ніж мислити лише:

    "колір кнопки"

---

# UI Vocabulary

Основні терміни:

    UI
    User Interface
    interface
    user
    user goal
    task
    user flow
    interaction
    feedback
    component
    element
    layout
    hierarchy
    typography
    color
    spacing
    alignment
    affordance
    consistency
    simplicity
    design pattern
    state
    accessibility
    responsive design
    design system
    microcopy
    empty state
    error state
    loading state
    success state

---

# Що потрібно пам'ятати

• UI — це User Interface.

• UI — це спосіб взаємодії користувача з цифровою системою.

• UI — не тільки visual design.

• UI включає:

    layout
    typography
    color
    hierarchy
    components
    interaction
    states
    feedback
    navigation
    accessibility

• UI повинен допомагати користувачу виконувати його goals.

• Починати проектування краще з user goal, а не з кольорів та декоративних деталей.

• UI elements — базові елементи інтерфейсу.

• Components — композиції UI elements, які виконують певну роль.

• UI має різні states.

• Interaction описує взаємодію користувача із системою.

• Feedback повідомляє користувачу результат його дії.

• Visual hierarchy допомагає зрозуміти важливість інформації.

• Consistency робить інтерфейс передбачуваним.

• Simplicity зменшує непотрібну складність.

• Affordance допомагає зрозуміти, як взаємодіяти з елементом.

• Design patterns — повторювані рішення типових UI-задач.

• Responsive UI адаптується до різних розмірів екрана.

• Accessibility робить UI доступнішим для різних користувачів.

• Design system допомагає підтримувати consistency у великому продукті.

• Хороший UI не просто виглядає красиво.

• Хороший UI допомагає користувачу:

    understand
    navigate
    interact
    complete a task
    understand the result

---

# Типові помилки

❌ Вважати UI просто "красивою картинкою".

UI — це також:

    interaction
    states
    feedback
    accessibility
    usability

---

❌ Починати дизайн із кольорів.

Спочатку потрібно зрозуміти:

    user
    goal
    task
    information
    flow

А вже потім:

    layout
    hierarchy
    visual style

---

❌ Використовувати занадто багато UI elements.

Більше елементів не означає кращий UI.

Потрібно запитувати:

    Is this element necessary?

---

❌ Використовувати незрозумілі labels.

Наприклад:

    [ Continue ]

коли конкретніше:

    [ Create account ]

може бути зрозумілішим.

---

❌ Не проектувати states.

Наприклад, розробити тільки:

    default button

і забути:

    hover
    focus
    active
    disabled
    loading

---

❌ Не показувати feedback.

Користувач натискає:

    [ Save ]

і нічого не змінюється.

Користувач не знає:

    Did it work?
    Is it loading?
    Did something fail?

---

❌ Плутати UI та UX.

UI — інтерфейс.

UX — ширший user experience.

Вони пов'язані, але не є синонімами.

---

❌ Робити всі елементи однаково важливими.

Якщо все:

    large
    bold
    colorful
    prominent

то нічого не є справді prominent.

---

❌ Ігнорувати accessibility.

Наприклад:

    color alone → error

може бути недостатнім.

Краще:

    red border
    +
    error icon
    +
    error message

---

# Practical Checklist

Перед реалізацією UI корисно перевірити:

    [ ] Хто користувач?
    [ ] Яка його мета?
    [ ] Яку задачу він виконує?
    [ ] Який user flow?
    [ ] Яка інформація необхідна?
    [ ] Що є primary action?
    [ ] Що є secondary action?
    [ ] Яка visual hierarchy?
    [ ] Які потрібні components?
    [ ] Які UI states?
    [ ] Який feedback?
    [ ] Що відбувається при error?
    [ ] Що відбувається при loading?
    [ ] Що відбувається при success?
    [ ] Що відбувається, якщо даних немає?
    [ ] Чи працює UI на mobile?
    [ ] Чи доступний UI з клавіатури?
    [ ] Чи зрозумілі labels?
    [ ] Чи послідовний дизайн?
    [ ] Чи немає зайвої складності?

---

# Питання для співбесіди

Що таке UI?

Що означає User Interface?

Чим UI відрізняється від visual design?

Чим UI відрізняється від UX?

Що таке UI element?

Що таке UI component?

Що таке interaction?

Що таке feedback?

Що таке UI state?

Що таке visual hierarchy?

Що таке affordance?

Що таке consistency?

Що таке design pattern?

Що таке user goal?

Що таке task?

Що таке user flow?

Що таке microcopy?

Що таке empty state?

Що таке loading state?

Що таке error state?

Що таке success state?

Що таке responsive UI?

Що таке accessibility?

Що таке design system?

Чому UI — це не просто "гарний дизайн"?

Чому важливо проектувати UI states?

Навіщо потрібен feedback?

Чому consistency важлива в UI?

Що таке primary action?

Що таке secondary action?

Як UI допомагає користувачу виконати task?

Як пов'язані UI та frontend development?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке UI.

User Interface.

UI element.

UI component.

User.

User goal.

Task.

User flow.

Interaction.

Feedback.

UI state.

Layout.

Visual hierarchy.

Typography.

Color.

Spacing.

Alignment.

Consistency.

Simplicity.

Affordance.

Design pattern.

Primary action.

Secondary action.

Loading state.

Error state.

Success state.

Empty state.

Основи responsive UI.

Основи accessibility.

Основи UI та UX.

---

🔵 Junior

Розуміння:

    user goals
    tasks
    user flows
    UI elements
    components
    states
    interactions
    feedback

Уміння:

    визначити primary action
    створити visual hierarchy
    розкласти UI на components
    визначити необхідні states
    продумати loading / error / success
    створити responsive layout
    використовувати consistency
    використовувати знайомі design patterns
    писати зрозумілий UI text

Розуміння зв'язку:

    UI
      ↓
    HTML
      ↓
    CSS
      ↓
    JavaScript

та:

    UI
      ↓
    React components
      ↓
    state
      ↓
    interaction
      ↓
    feedback

---

🟠 Middle

Глибше розуміння:

    design systems
    component architecture
    design tokens
    responsive patterns
    accessibility
    interaction patterns
    complex states
    information architecture
    usability
    user flows
    forms
    data-heavy interfaces

Уміння:

    створювати reusable UI
    підтримувати consistency
    проектувати complex states
    працювати з design systems
    аналізувати usability problems
    адаптувати UI під різні devices
    працювати з accessibility
    балансувати visual quality та usability

---

🔴 Senior

Глибоке розуміння:

    design systems
    interaction design
    information architecture
    accessibility
    usability
    complex product flows
    scalable component systems
    design tokens
    cross-platform design
    product UX
    design governance

Уміння:

    проектувати масштабовані UI systems
    створювати component architecture
    визначати design principles
    аналізувати user behavior
    знаходити usability problems
    балансувати business goals та user goals
    створювати consistency між великими частинами продукту
    приймати trade-offs між simplicity, flexibility та functionality

---

# Міні-шпаргалка

## UI

    UI
      ↓
    User Interface
      ↓
    interface between
    user and system

---

## User Goal

    User
      ↓
    Goal
      ↓
    Task
      ↓
    UI
      ↓
    Result

---

## User Flow

    Start
      ↓
    Action
      ↓
    Screen
      ↓
    Action
      ↓
    Result
      ↓
    End

---

## UI Element

    button
    input
    link
    checkbox
    image
    text
    icon

---

## Component

    Component
       ↓
    multiple UI elements
       ↓
    reusable functionality

---

## Interaction

    User action
        ↓
    System response
        ↓
    Feedback

---

## States

    default
    hover
    focus
    active
    disabled
    loading
    error
    success

---

## Visual Hierarchy

    important
       ↓
    less important
       ↓
    secondary information

---

## Good UI

    clear
    consistent
    predictable
    accessible
    responsive
    efficient
    understandable

---

## UI Workflow

    User
      ↓
    Goal
      ↓
    Task
      ↓
    Flow
      ↓
    Information
      ↓
    Layout
      ↓
    Components
      ↓
    States
      ↓
    Interaction
      ↓
    Feedback

---

## UI → Frontend

    UI Design
       ↓
    HTML
       ↓
    CSS
       ↓
    JavaScript
       ↓
    React
       ↓
    Interactive UI

---

# Головне:

• UI — це User Interface.

• UI — це не просто візуальний стиль.

• UI описує те, що користувач бачить і з чим взаємодіє.

• Хороший UI допомагає користувачу досягти своєї мети.

• Починати проектування потрібно з:

    user
    goal
    task
    flow

• UI складається з:

    elements
    components
    layouts
    patterns
    states

• Візуальна частина UI включає:

    typography
    color
    spacing
    alignment
    hierarchy

• Поведінкова частина UI включає:

    interaction
    states
    feedback

• UI повинен бути:

    clear
    consistent
    predictable
    accessible
    responsive

• Користувач повинен розуміти:

    What is this?
    What can I do?
    What should I do?
    What happened?
    What should I do next?

• UI element — базовий елемент інтерфейсу.

• Component — композиція елементів, яка виконує певну функцію.

• User flow — послідовність кроків для досягнення user goal.

• Interaction — дія користувача та реакція системи.

• Feedback — повідомлення системи про результат дії.

• State — поточний стан UI element або системи.

• Visual hierarchy допомагає визначити, що важливо.

• Consistency робить UI передбачуваним.

• Simplicity зменшує непотрібну складність.

• Affordance підказує, як використовувати елемент.

• Design patterns допомагають вирішувати типові UI-задачі.

• Accessibility робить UI доступнішим.

• Responsive design дозволяє UI адаптуватися до різних екранів.

• Design system допомагає створювати масштабований та послідовний UI.

• Для frontend developer розуміння UI допомагає краще працювати з:

    HTML
    CSS
    JavaScript
    React
    Next.js
    component architecture

• Найважливіша модель для запам'ятовування:

    User
      ↓
    Goal
      ↓
    Task
      ↓
    Flow
      ↓
    UI
      ↓
    Interaction
      ↓
    Feedback
      ↓
    Result

• Головне питання UI:

    "Як зробити так,
     щоб користувач легко зрозумів,
     що він може зробити,
     як це зробити
     і що сталося після його дії?"