# 02. UI vs UX

UI та UX — два тісно пов'язані поняття у створенні цифрових продуктів.

    UI
    ↓
    User Interface
    ↓
    інтерфейс, з яким взаємодіє користувач

    UX
    ↓
    User Experience
    ↓
    загальний досвід користувача під час взаємодії
    з продуктом або системою

Вони пов'язані, але це не одне й те саме.

Спрощено:

    UX → how it works and feels

    UI → how the interface looks and behaves

---

# UI

UI — User Interface.

UI описує інтерфейс, через який користувач взаємодіє із системою.

UI включає:

    layout
    typography
    colors
    spacing
    buttons
    inputs
    forms
    navigation
    icons
    components
    states
    feedback
    visual hierarchy
    interaction patterns

Наприклад:

    ┌─────────────────────────────┐
    │        Create account       │
    │                             │
    │  Name                       │
    │  [_______________________]  │
    │                             │
    │  Email                      │
    │  [_______________________]  │
    │                             │
    │  Password                   │
    │  [_______________________]  │
    │                             │
    │     [ Create account ]      │
    └─────────────────────────────┘

Це UI.

---

# UX

UX — User Experience.

UX описує загальний досвід користувача під час взаємодії з продуктом.

UX включає:

    user goals
    user needs
    user flows
    usability
    information architecture
    navigation
    interaction
    accessibility
    feedback
    error handling
    efficiency
    emotions
    expectations
    overall experience

UX відповідає на питання:

    Can the user achieve the goal?

    How easy is it?

    How quickly can it be done?

    Is the process understandable?

    What happens when something goes wrong?

    Does the product meet the user's expectations?

---

# Просте порівняння

Можна запам'ятати:

    UI
    ↓
    interface

    UX
    ↓
    experience

Або:

    UI → what the user interacts with

    UX → how the whole interaction works and feels

---

# UI vs UX

| UI | UX |
|---|---|
| User Interface | User Experience |
| Інтерфейс | Досвід |
| Visual design | Overall experience |
| Components | User flows |
| Colors | Usability |
| Typography | User needs |
| Buttons | Tasks |
| Inputs | Information architecture |
| Layout | Interaction |
| States | Error handling |
| Visual hierarchy | Efficiency |
| Microcopy | Accessibility |
| Interaction details | Overall satisfaction |

Це спрощена модель.

UI та UX сильно перетинаються.

---

# Приклад

Уявімо банкомат.

Користувач хоче:

    Withdraw money

UX-питання:

    Чи зрозуміло, як почати?

    Чи легко вибрати суму?

    Чи зрозуміло, що робити далі?

    Чи правильно система обробляє помилки?

    Чи швидко користувач отримує гроші?

    Чи не можна випадково завершити операцію
    до отримання картки?

UI-питання:

    Який вигляд має екран?

    Де знаходиться кнопка "Withdraw"?

    Який розмір тексту?

    Які кольори використовуються?

    Як виглядають кнопки?

    Як показується selected amount?

UX — ширша проблема.

UI — значна частина інтерфейсу, через який ця проблема вирішується.

---

# Restaurant Analogy

Корисна аналогія — ресторан.

    UX
    ↓
    весь досвід відвідування ресторану

    UI
    ↓
    меню, кнопки термінала,
    форма замовлення тощо

UX може включати:

    finding the restaurant
    entering
    waiting
    ordering
    understanding menu
    paying
    receiving food
    leaving

UI може включати:

    menu design
    ordering interface
    payment interface
    buttons
    typography
    icons
    layout

Красиве меню не врятує поганий UX, якщо:

    страви неможливо знайти
    ціни незрозумілі
    замовлення складно оформити
    оплата не працює

---

# UI Without Good UX

Можна створити дуже красивий UI:

    beautiful colors
    modern typography
    animations
    shadows
    gradients
    illustrations

але UX може залишатися поганим.

Наприклад:

    User sees beautiful dashboard.

    Але:

    важко знайти потрібну інформацію
    ↓
    незрозуміла navigation
    ↓
    незрозумілі buttons
    ↓
    багато зайвих steps
    ↓
    user cannot complete task efficiently

Тобто:

    Beautiful UI
        ≠
    Good UX

---

# UX Without Good UI

Можлива і протилежна ситуація.

UX може бути добре продуманий:

    clear flow
    clear tasks
    good information architecture
    logical navigation
    simple process

але UI може бути поганим:

    poor typography
    weak contrast
    confusing visual hierarchy
    inconsistent components
    poor spacing
    unclear buttons

Тоді користувачеві важко взаємодіяти з добре продуманим flow.

Тобто:

    Good UX
        +
    Bad UI
        =
    weak overall product experience

---

# UI and UX Work Together

Хороший цифровий продукт потребує обох:

    UX
      ↓
    defines experience
      ↓
    UI
      ↓
    communicates and implements
    the interface
      ↓
    User

У реальному проекті межа між UI та UX не завжди чітка.

---

# UX Starts Before UI

Одна з важливих ідей:

    UX часто починається
    до створення UI.

Спочатку потрібно зрозуміти:

    Who is the user?

    What does the user want?

    What problem are they solving?

    What task must they complete?

    What information do they need?

    What can go wrong?

І тільки потім:

    What should the interface look like?

---

# UX → UI

Типовий спрощений процес:

    User
      ↓
    Need
      ↓
    Goal
      ↓
    Task
      ↓
    User Flow
      ↓
    Information Architecture
      ↓
    Wireframe
      ↓
    UI Design
      ↓
    Prototype
      ↓
    Implementation
      ↓
    Testing
      ↓
    Iteration

---

# User Need

User need — потреба користувача.

Наприклад:

    "I need to know
     whether my appointment is confirmed."

UX повинен вирішити:

    How can the product communicate
    this information clearly?

UI може реалізувати:

    Appointment confirmed

    ✓ Confirmed

    Date: October 10
    Time: 14:00

---

# User Goal

User goal — результат, якого користувач хоче досягти.

Наприклад:

    Goal:
    book an appointment

UX:

    find doctor
      ↓
    select date
      ↓
    select time
      ↓
    confirm appointment

UI:

    Doctor Card
    Calendar
    Time Slots
    Confirm Button

---

# Task

Task — конкретна дія або послідовність дій.

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

UX проектує цей flow.

UI реалізує interface для кожного кроку.

---

# User Flow

User Flow — шлях користувача через продукт.

Наприклад:

    Home
      ↓
    Search
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

UX запитує:

    Is this flow logical?

UI запитує:

    How should each step
    be represented in the interface?

---

# Information Architecture

Information Architecture — організація інформації та функцій продукту.

Наприклад:

    Website
    ├── Home
    ├── Products
    │   ├── Category
    │   ├── Product
    │   └── Product
    ├── About
    ├── Help
    └── Account

UX значною мірою працює з цією структурою.

UI показує її користувачу через:

    navigation
    menus
    links
    breadcrumbs
    headings
    pages

---

# Wireframe

Wireframe — спрощене представлення структури сторінки.

Наприклад:

    ┌─────────────────────────────┐
    │ Header                      │
    ├─────────────────────────────┤
    │                             │
    │ Page title                  │
    │                             │
    │ ┌────────┐  ┌────────┐     │
    │ │ Card   │  │ Card   │     │
    │ └────────┘  └────────┘     │
    │                             │
    │ [ Primary action ]          │
    │                             │
    └─────────────────────────────┘

Wireframe концентрується на:

    structure
    layout
    hierarchy
    content placement

а не на:

    colors
    shadows
    visual polish

---

# UI Design

Після визначення структури можна працювати над visual UI.

Наприклад:

    Wireframe
        ↓
    typography
        ↓
    colors
        ↓
    spacing
        ↓
    components
        ↓
    states
        ↓
    visual polish

---

# Prototype

Prototype — інтерактивна модель майбутнього продукту.

Наприклад:

    Click Login
        ↓
    Login form
        ↓
    Submit
        ↓
    Loading
        ↓
    Dashboard

Prototype дозволяє перевірити:

    flow
    interaction
    navigation
    usability

до повної реалізації.

---

# Usability

Usability — наскільки легко користувач може використовувати продукт для виконання своєї задачі.

Основні питання:

    Can users understand it?

    Can users learn it?

    Can users complete the task?

    Can users recover from errors?

    Can users do it efficiently?

---

# Learnability

Learnability — наскільки легко новому користувачу навчитися користуватися системою.

Наприклад:

    [ Search ]

зрозуміліше, ніж незрозумілий icon без tooltip.

Знайомі patterns можуть покращувати learnability.

---

# Efficiency

Efficiency — наскільки швидко та легко користувач може виконати задачу.

Наприклад:

    2 steps
        ↓
    task completed

краще за:

    8 unnecessary steps
        ↓
    task completed

UX намагається прибирати непотрібне friction.

---

# Friction

Friction — перешкоди або зайві труднощі під час виконання задачі.

Наприклад:

    User wants to buy product.

    Product
      ↓
    Add to cart
      ↓
    Login
      ↓
    Verify email
      ↓
    Fill profile
      ↓
    Add address
      ↓
    Confirm address
      ↓
    Payment

Якщо частина цих кроків не потрібна для задачі, UX може бути покращений шляхом їх скорочення.

---

# Cognitive Load

Cognitive Load — кількість розумових зусиль, необхідних користувачу для виконання задачі.

Поганий UI/UX може збільшувати cognitive load через:

    too many options
    unclear labels
    inconsistent controls
    poor hierarchy
    unfamiliar patterns
    unnecessary steps

Хороший UI/UX намагається:

    reduce unnecessary cognitive load

---

# Example: Checkout

Поганий UX:

    Product
      ↓
    Cart
      ↓
    Login
      ↓
    Create profile
      ↓
    Address
      ↓
    Address confirmation
      ↓
    Shipping
      ↓
    Payment
      ↓
    Review
      ↓
    Confirmation

Можливо, деякі кроки можна об'єднати.

Покращений flow:

    Cart
      ↓
    Checkout
      ↓
    Delivery
      ↓
    Payment
      ↓
    Confirmation

UI при цьому може мати:

    [ Continue ]
    [ Back ]

    Progress:
    Delivery → Payment → Confirmation

---

# UI Feedback vs UX Feedback

UI feedback — конкретна реакція interface.

Наприклад:

    Click Save
        ↓
    Button → Saving...
        ↓
    Button → Saved

UX feedback ширше:

    User understands
    that the task was completed.

UI — механізм.

UX — загальний результат для користувача.

---

# Error Handling

UX повинен передбачати помилки.

Наприклад:

    User enters invalid email.

UX питання:

    What should happen?

UI:

    Email address is invalid.

UX:

    User understands the problem
        ↓
    knows how to fix it
        ↓
    can continue

---

# Error Prevention

Ще краще — не тільки показувати помилку, а допомагати її уникнути.

Наприклад:

    Password

    Must contain at least 8 characters.

Користувач отримує інформацію до submit.

Це зменшує:

    errors
    frustration
    unnecessary actions

---

# Accessibility

Accessibility є частиною хорошого UX та UI.

UX питання:

    Can different users complete the task?

UI питання:

    Can they actually interact with
    the interface?

Наприклад:

    keyboard navigation
    focus states
    labels
    contrast
    semantic HTML
    screen reader support

---

# Responsive Design

Responsive design також стосується UI та UX.

UI:

    layout adapts to screen size

UX:

    task remains understandable
    and usable on different devices

Наприклад:

    Desktop
    ┌────────┬───────────────┐
    │ Menu   │ Content       │
    └────────┴───────────────┘

    Mobile
    ┌─────────────────────────┐
    │ Menu                    │
    ├─────────────────────────┤
    │ Content                 │
    └─────────────────────────┘

---

# Content and UX

UX значною мірою залежить від content.

Наприклад:

    ❌ Error

не дуже інформативно.

Краще:

    Email address is invalid.

Ще корисніше:

    Enter a valid email address,
    for example: name@example.com

UI показує текст.

UX визначає, наскільки цей текст допомагає користувачу.

---

# Microcopy

Microcopy — маленькі тексти інтерфейсу.

Приклади:

    button labels
    helper text
    error messages
    placeholders
    empty states
    confirmation messages
    tooltips

Наприклад:

    ❌ Submit

    ✓ Create account

Конкретний label зменшує ambiguity.

---

# Empty State

Empty state може бути одночасно UI та UX питанням.

Наприклад:

    No projects yet.

    Create your first project
    to get started.

    [ Create project ]

UI:

    text
    button
    layout

UX:

    user understands
    why there is no data
    and what to do next

---

# Loading State

UI:

    [ Saving... ]

UX:

    user understands
    that the system is processing
    the request

Без loading state:

    click
      ↓
    nothing visible
      ↓
    uncertainty

З loading state:

    click
      ↓
    Saving...
      ↓
    Saved

---

# UI vs UX Example

Уявімо кнопку:

    [ Buy now ]

UI питання:

    How does it look?

    color?
    size?
    typography?
    spacing?
    border radius?

UX питання:

    Is "Buy now" the correct action?

    Is it in the right place?

    Does the user understand
    what will happen?

    What happens after clicking?

    Can the user recover
    if payment fails?

UI та UX працюють разом.

---

# Another Example: Login

UI:

    Email
    [________________]

    Password
    [________________]

    [ Sign in ]

UX:

    Is login necessary?

    Is the flow clear?

    Can the user recover
    a forgotten password?

    What happens after login?

    What happens if credentials are wrong?

    Is the user kept informed?

---

# Another Example: Search

UI:

    [ Search products... ]

UX:

    Can the user find search?

    Does autocomplete help?

    Are results relevant?

    What happens when there are no results?

    Can the user modify the query?

    Is search fast enough?

---

# Another Example: Navigation

UI:

    Home
    Products
    Services
    About
    Contact

UX:

    Can users predict
    where each link leads?

    Can users find what they need?

    Is the navigation consistent?

    Does it work on mobile?

---

# UI Designer vs UX Designer

Умовно можна розділити ролі.

UI Designer може більше працювати з:

    visual hierarchy
    typography
    colors
    spacing
    components
    visual states
    design systems

UX Designer може більше працювати з:

    user research
    user needs
    user flows
    information architecture
    usability
    wireframes
    prototypes
    testing

Але в реальних командах ролі можуть сильно перетинатися.

---

# UX Research

UX Research — дослідження користувачів та їхніх потреб.

Може включати:

    interviews
    surveys
    usability testing
    observation
    analytics
    user feedback

Мета:

    understand users
        ↓
    understand problems
        ↓
    design better solutions

---

# Usability Testing

Usability testing — перевірка, наскільки легко користувачі виконують задачі.

Наприклад:

    Task:
    "Create a new project."

Спостерігаємо:

    Can user find Create button?

    Can user understand the form?

    Does user know what to enter?

    Can user submit?

    Does user understand success message?

Це допомагає знаходити UX problems.

---

# Analytics and UX

UX можна аналізувати не тільки через interviews.

Можна дивитися:

    conversion rate
    drop-off rate
    task completion
    time on task
    error rate
    bounce rate

Наприклад:

    100 users start checkout
            ↓
    60 complete payment

Можна досліджувати:

    Where do 40 users leave?

Це може вказувати на UX problem.

---

# UX Metrics

Приклади UX metrics:

    Task success rate
    Task completion time
    Error rate
    Conversion rate
    Abandonment rate
    Retention
    Satisfaction

Не всі metrics є суто UX metrics, але вони можуть допомагати оцінювати user experience.

---

# UI Metrics

UI безпосередньо також можна оцінювати.

Наприклад:

    interaction errors
    accessibility issues
    visual consistency
    responsive behavior
    component consistency

Але хороший UI не оцінюється тільки візуально.

---

# Design Is a Trade-off

UI/UX design майже завжди містить trade-offs.

Наприклад:

    simplicity
        vs
    functionality

    flexibility
        vs
    consistency

    visual density
        vs
    readability

    speed
        vs
    confirmation steps

    customization
        vs
    simplicity

Не існує універсального рішення для всіх продуктів.

---

# User Goal vs Business Goal

Продукт має не тільки user goals.

Є також business goals.

Наприклад:

    User:
    wants to quickly buy a product.

    Business:
    wants to increase sales.

Хороший UX намагається створити ситуацію:

    User value
        +
    Business value
        ↓
    Product value

---

# Example: Subscription

User:

    wants to start using service.

Business:

    wants a subscription.

Поганий UX:

    aggressive popups
    hidden pricing
    confusing cancellation
    unnecessary steps

Може короткостроково збільшити conversion, але погіршити trust.

Хороший UX:

    clear pricing
    clear benefits
    understandable subscription
    easy cancellation
    transparent communication

---

# UX Is Not Just "Making Users Happy"

UX — не просто:

    "зробити красиво"
    або
    "зробити приємно"

UX також включає:

    effectiveness
    efficiency
    learnability
    accessibility
    error recovery
    predictability
    clarity

Користувач може бути задоволений не тому, що UI красивий, а тому що:

    task was easy
    task was fast
    result was clear

---

# UI Is Not Just "Making Things Pretty"

UI теж не зводиться до decoration.

UI повинен:

    communicate hierarchy
    expose actions
    show state
    provide feedback
    support interaction
    maintain consistency

Тому:

    beautiful UI
        ≠
    good UI

---

# Relationship

Корисно запам'ятати так:

    UX asks:

    "What experience should the user have?"

    UI asks:

    "How do we represent and support
     that experience through the interface?"

---

# UX → UI Example

User goal:

    Book a doctor appointment.

UX:

    Search doctor
        ↓
    Select doctor
        ↓
    Select date
        ↓
    Select time
        ↓
    Confirm appointment

UI:

    Search input
    Doctor cards
    Calendar
    Time slot buttons
    Confirm button

States:

    loading
    available
    unavailable
    selected
    error
    success

Feedback:

    Appointment confirmed.

---

# The Important Distinction

Не потрібно вчити:

    UI = colors
    UX = wireframes

Це занадто спрощено.

Краще:

    UI
    ↓
    interface
    visual presentation
    interaction details
    components
    states

    UX
    ↓
    complete experience
    user goals
    tasks
    flows
    usability
    information architecture
    satisfaction

---

# UI and UX in Frontend Development

Для frontend developer ці поняття особливо важливі.

Frontend реалізує:

    UI
      ↓
    components
      ↓
    interactions
      ↓
    states
      ↓
    feedback

але frontend також сильно впливає на UX:

    loading behavior
    error handling
    navigation
    form validation
    responsive behavior
    accessibility
    performance

Тому frontend developer фактично бере участь і в UI, і в UX.

---

# React Example

У React:

    <Button>
        Save
    </Button>

Це UI component.

А його поведінка:

    default
        ↓
    click
        ↓
    loading
        ↓
    success / error

впливає на UX.

Наприклад:

    function SaveButton() {
        return (
            <button disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
            </button>
        );
    }

UI:

    button
    label
    disabled state

UX:

    user understands
    that the save operation
    is currently in progress

---

# Frontend Mental Model

Корисна модель для frontend developer:

    UX
      ↓
    user goal
      ↓
    user flow
      ↓
    UI
      ↓
    component
      ↓
    state
      ↓
    interaction
      ↓
    feedback

Наприклад:

    UX:
    user needs to create project

    ↓

    Flow:
    Dashboard → Create → Form → Success

    ↓

    UI:
    Button + Form + Message

    ↓

    React:
    Components + State + Events

---

# UI vs UX: Quick Comparison

    UI
    ↓
    Interface

    UX
    ↓
    Experience

    UI:
    What does the user see?

    UX:
    How does the whole process work?

    UI:
    How does the button look?

    UX:
    Should there be a button here?

    UI:
    What does the loading state look like?

    UX:
    Does the user understand
    that the operation is processing?

    UI:
    How does the error message look?

    UX:
    Can the user understand
    and recover from the error?

---

# Typical Mistakes

❌ Вважати UI та UX синонімами.

    UI ≠ UX

---

❌ Вважати UX тільки wireframes.

UX набагато ширший.

Він включає:

    users
    needs
    goals
    tasks
    flows
    usability
    accessibility
    overall experience

---

❌ Вважати UI тільки colors та typography.

UI також включає:

    components
    states
    interaction
    feedback
    layout
    hierarchy

---

❌ Робити красивий UI без розуміння задачі.

Спочатку:

    user goal

Потім:

    solution

Потім:

    interface

---

❌ Додавати зайві steps.

Якщо задача може бути виконана за:

    3 steps

не потрібно без причини створювати:

    8 steps

---

❌ Ігнорувати error states.

Хороший UX повинен передбачати:

    invalid input
    network error
    empty state
    failed request
    unavailable action

---

❌ Ігнорувати loading states.

Користувач повинен розуміти:

    system is working

---

❌ Думати, що "менше екранів" завжди означає кращий UX.

Іноді розділення складної задачі на кілька зрозумілих кроків краще.

Важлива не кількість screens, а:

    clarity
    efficiency
    task completion

---

❌ Думати, що "більше функцій" означає кращий UX.

Більше функцій може означати:

    more complexity
    more cognitive load
    more navigation
    more decisions

---

# Practical Checklist

Перед створенням UI запитай:

    [ ] Хто користувач?
    [ ] Яка його потреба?
    [ ] Яка його мета?
    [ ] Яку задачу він хоче виконати?
    [ ] Який user flow?
    [ ] Яка інформація потрібна?
    [ ] Які дії потрібні?
    [ ] Яка primary action?
    [ ] Які можуть бути помилки?
    [ ] Які потрібні states?
    [ ] Що відбувається під час loading?
    [ ] Що відбувається після success?
    [ ] Що відбувається при error?
    [ ] Чи зрозуміло, що робити далі?
    [ ] Чи немає зайвих steps?
    [ ] Чи доступний UI?
    [ ] Чи працює flow на mobile?
    [ ] Чи consistent interface?
    [ ] Чи відповідає UI user goal?

---

# Питання зі співбесіди

Що означає UI?

Що означає UX?

Що таке User Interface?

Що таке User Experience?

Яка різниця між UI та UX?

Чи може бути хороший UI при поганому UX?

Чи може бути хороший UX при поганому UI?

Що входить до UI?

Що входить до UX?

Що таке user goal?

Що таке user need?

Що таке task?

Що таке user flow?

Що таке information architecture?

Що таке wireframe?

Що таке prototype?

Що таке usability?

Що таке learnability?

Що таке friction?

Що таке cognitive load?

Що таке accessibility?

Що таке feedback?

Що таке loading state?

Що таке error state?

Що таке empty state?

Що таке success state?

Чому UX починається до створення UI?

Як UI впливає на UX?

Як frontend developer впливає на UX?

Чому красивий UI не гарантує хороший UX?

Як визначити хороший user flow?

Що таке usability testing?

Що таке UX research?

Які metrics можуть використовуватися для оцінки UX?

Що таке primary action?

Що таке friction у user flow?

Як зменшити cognitive load?

---

# Шлях

🟢 Core (обов'язково знати)

UI:

    User Interface

UX:

    User Experience

Різниця:

    UI → interface
    UX → experience

Розуміння:

    user
    need
    goal
    task
    flow
    interaction
    feedback
    usability

UI concepts:

    layout
    typography
    color
    spacing
    hierarchy
    components
    states

UX concepts:

    user goals
    user flows
    information architecture
    usability
    learnability
    efficiency
    accessibility
    error recovery

---

🔵 Junior

Уміння розрізняти:

    UI problems
    UX problems

Розуміння:

    user goals
    user flows
    usability
    cognitive load
    friction
    feedback
    error handling

Уміння:

    створити простий user flow
    визначити primary action
    визначити UI states
    передбачити error states
    проектувати loading states
    створити зрозумілу navigation
    оцінити простий UI з точки зору usability

Розуміння зв'язку:

    UX
      ↓
    user flow
      ↓
    UI
      ↓
    component
      ↓
    interaction
      ↓
    feedback

---

🟠 Middle

Глибше розуміння:

    UX research
    usability testing
    information architecture
    interaction design
    accessibility
    design systems
    responsive UX
    complex user flows
    error recovery
    cognitive load

Уміння:

    аналізувати UX problems
    знаходити friction
    спрощувати user flows
    проектувати complex interfaces
    балансувати usability та functionality
    працювати з design systems
    враховувати business goals
    використовувати user feedback
    оцінювати UX через metrics

---

🔴 Senior

Глибоке розуміння:

    human-centered design
    product design
    UX strategy
    information architecture
    interaction design
    design systems
    accessibility
    behavioral patterns
    product metrics
    experimentation
    usability research

Уміння:

    проектувати end-to-end experiences
    визначати product flows
    знаходити системні UX problems
    балансувати user goals та business goals
    проектувати scalable UI systems
    приймати design trade-offs
    працювати з ambiguity
    використовувати qualitative та quantitative data
    будувати consistency між великими частинами продукту

---

# Міні-шпаргалка

## UI

    UI
      ↓
    User Interface
      ↓
    interface

---

## UX

    UX
      ↓
    User Experience
      ↓
    overall experience

---

## Основна різниця

    UI
      ↓
    interface

    UX
      ↓
    experience

---

## User-centered flow

    User
      ↓
    Need
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

---

## UX

    user needs
    user goals
    tasks
    flows
    usability
    information architecture
    accessibility
    efficiency
    error recovery

---

## UI

    layout
    typography
    color
    spacing
    hierarchy
    components
    states
    interaction
    feedback

---

## UX Questions

    Can the user achieve the goal?

    Is the flow understandable?

    Is it efficient?

    Can the user recover from errors?

    Is the experience predictable?

---

## UI Questions

    Is the hierarchy clear?

    Is the button recognizable?

    Is the text readable?

    Are states visible?

    Is the interface consistent?

---

## Good UX

    clear
    usable
    efficient
    predictable
    accessible
    recoverable

---

## Good UI

    clear
    consistent
    readable
    hierarchical
    responsive
    interactive
    accessible

---

## UI + UX

    UX
      ↓
    defines user experience
      ↓
    UI
      ↓
    expresses and supports
    that experience
      ↓
    User

---

# Головне:

• UI означає User Interface.

• UX означає User Experience.

• UI та UX пов'язані, але це не одне й те саме.

• Найпростіше запам'ятати:

    UI → interface
    UX → experience

• UI більше концентрується на:

    visual design
    layout
    components
    typography
    colors
    states
    interaction
    feedback

• UX більше концентрується на:

    users
    needs
    goals
    tasks
    flows
    usability
    information architecture
    accessibility
    efficiency
    overall experience

• UX часто починається до створення UI.

• Спочатку потрібно зрозуміти:

    Who?
    ↓
    Why?
    ↓
    What?
    ↓
    How?
    ↓
    Interface

• UI може бути красивим, але UX може бути поганим.

• UX може бути добре продуманим, але слабкий UI може ускладнити взаємодію.

• Найкращий результат:

    Good UX
        +
    Good UI
        ↓
    Good product experience

• User goal важливіший за декоративні деталі.

• UI повинен допомагати користувачу:

    understand
    navigate
    interact
    complete a task
    understand the result

• UX повинен допомагати користувачу:

    achieve the goal
    efficiently
    clearly
    predictably
    with minimal unnecessary friction

• Важлива модель:

    User
      ↓
    Need
      ↓
    Goal
      ↓
    Task
      ↓
    User Flow
      ↓
    UI
      ↓
    Interaction
      ↓
    Feedback
      ↓
    Result

• Для frontend developer особливо важливо розуміти, що UI та UX безпосередньо пов'язані з:

    HTML
    CSS
    JavaScript
    React
    components
    state
    forms
    navigation
    accessibility
    responsive design

• Хороший frontend — це не просто:

    "зробити макет у коді"

а:

    understand the goal
        ↓
    understand the flow
        ↓
    build the interface
        ↓
    handle states
        ↓
    provide feedback
        ↓
    make the task easy to complete

• Головне питання UX:

    "Чи може користувач легко
     досягти своєї мети?"

• Головне питання UI:

    "Чи допомагає інтерфейс
     користувачу зрозуміти
     і виконати потрібну дію?"