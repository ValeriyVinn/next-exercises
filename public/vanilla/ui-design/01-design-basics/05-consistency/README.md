# 05. Consistency

## Що таке Consistency

**Consistency (послідовність, узгодженість)** — це принцип дизайну, за якого однакові або подібні елементи інтерфейсу мають **однаковий вигляд, поведінку та значення**.

Простими словами:

> Якщо дві речі роблять одне й те саме, користувач повинен мати можливість очікувати від них однакової поведінки.

Наприклад, якщо в одному місці:

    [ Save ]

є синьою Primary Button,

то в іншому місці кнопка:

    [ Save ]

не повинна раптом бути зеленою, круглою та мати зовсім іншу поведінку без причини.

Consistency створює відчуття:

    «Я вже знаю, як це працює».

---

# 1. Чому Consistency важлива

Користувач постійно навчається під час роботи з інтерфейсом.

Наприклад:

    побачив Button
        ↓
    зрозумів, як вона працює
        ↓
    використав її
        ↓
    зустрів таку саму Button
        ↓
    очікує таку саму поведінку

Якщо інтерфейс послідовний:

    Learning
       ↓
    Recognition
       ↓
    Predictability
       ↓
    Faster interaction
       ↓
    Lower cognitive load

Якщо інтерфейс непослідовний:

    Learn
       ↓
    Re-learn
       ↓
    Guess
       ↓
    Mistake
       ↓
    Friction

---

# 2. Основна ідея

Consistency можна представити так:

    Same meaning
         ↓
    Same appearance
         +
    Same behavior

Наприклад:

    Delete

в різних частинах застосунку повинна мати:

    однаковий semantic meaning
          +
    схожу visual representation
          +
    передбачувану behavior

---

# 3. Consistency ≠ Everything Must Look Identical

Це дуже важливий момент.

Consistency не означає:

> «Усі елементи повинні бути однаковими».

Наприклад:

    Primary button
    Secondary button
    Danger button

можуть виглядати по-різному:

    [ Save ]

    [ Cancel ]

    [ Delete ]

Але вони повинні належати до **однієї системи**.

Тобто:

    Same design language
          ↓
    Different semantic roles

---

# 4. Design Language

**Design Language** — набір візуальних та поведінкових принципів, які об'єднують інтерфейс.

Наприклад:

    Typography
    Colors
    Spacing
    Shapes
    Icons
    Buttons
    Forms
    Motion
    Interaction patterns

Усе це створює:

    Design Language
          ↓
    Product identity
          ↓
    Consistent UI

---

# 5. Види Consistency

Корисно розділяти кілька рівнів:

1. Visual Consistency
2. Functional Consistency
3. Behavioral Consistency
4. Content Consistency
5. Interaction Consistency
6. Structural Consistency
7. Platform Consistency
8. Brand Consistency
9. Accessibility Consistency
10. Responsive Consistency

---

# 6. Visual Consistency

**Visual Consistency** — однакові елементи мають узгоджений візуальний вигляд.

Це стосується:

- colors;
- typography;
- spacing;
- borders;
- border-radius;
- shadows;
- icons;
- buttons;
- inputs;
- cards;
- states.

Наприклад:

    Primary Button

    border-radius: 8px
    height: 40px
    font-weight: 600

Якщо всі Primary Buttons використовують ці правила, UI виглядає системним.

---

# 7. Functional Consistency

**Functional Consistency** означає:

> Однакові елементи виконують однакову функцію.

Наприклад:

    Search icon

у header:

    🔍

і в sidebar:

    🔍

повинна виконувати:

    Search

а не:

    Filter

в одному місці та:

    Search

в іншому.

---

# 8. Behavioral Consistency

**Behavioral Consistency** означає, що однакові елементи поводяться однаково.

Наприклад:

    Dropdown

у першій частині:

    click
      ↓
    opens menu

і в іншій:

    click
      ↓
    navigates to page

може створювати confusion, якщо візуально вони виглядають однаково.

---

# 9. Interaction Consistency

Користувач повинен розуміти:

    hover
    click
    focus
    active
    disabled
    loading

для подібних компонентів.

Наприклад:

    Button A
        ↓
    hover → darker

    Button B
        ↓
    hover → darker

Це створює predictable interaction.

---

# 10. Content Consistency

Consistency стосується не тільки visual design.

Також важлива мова інтерфейсу.

Наприклад, якщо одна кнопка називається:

    Save

інша:

    Save changes

третя:

    Store

а всі вони виконують одну дію, виникає inconsistency.

Краще вибрати terminology:

    Save

і використовувати її системно.

---

# 11. Terminology Consistency

Наприклад:

    User

не варто без причини називати:

    User
    Customer
    Client
    Account holder
    Member

якщо це фактично одна й та сама сутність.

Consistency terminology особливо важлива у:

- navigation;
- buttons;
- forms;
- documentation;
- error messages;
- notifications.

---

# 12. Structural Consistency

Схожі сторінки повинні мати схожу структуру.

Наприклад:

    Course page

    Header
    ↓
    Course title
    ↓
    Description
    ↓
    Lessons
    ↓
    Actions

Інша course page повинна використовувати ту саму логіку.

Не:

    Course A
    title → description → lessons

а:

    Course B
    lessons → image → title → unrelated actions

без причини.

---

# 13. Navigation Consistency

Navigation повинна бути передбачуваною.

Наприклад:

    Dashboard
    Courses
    Students
    Settings

Якщо sidebar використовується на всіх сторінках:

    Dashboard
        ↓
    Courses
        ↓
    Students
        ↓
    Settings

користувач знає, де шукати navigation.

---

# 14. Active State Consistency

Якщо active navigation item позначений:

    background
    +
    font-weight

то інші active states повинні використовувати аналогічну систему.

Наприклад:

    Dashboard

    Courses  ← active

    Students

Не варто на іншій сторінці робити:

    Dashboard

    Courses

    Students  ← active
                  ↑
             тільки underline

якщо немає системної причини.

---

# 15. Button Consistency

Кнопки — один із найважливіших прикладів consistency.

Наприклад:

    Primary
    Secondary
    Tertiary
    Danger

Можна визначити:

    Primary
        ↓
    main action

    Secondary
        ↓
    supporting action

    Tertiary
        ↓
    low-priority action

    Danger
        ↓
    destructive action

Ця логіка повинна працювати по всьому продукту.

---

# 16. Button Labels

Кнопки повинні мати consistent terminology.

Наприклад:

    Create
    Edit
    Save
    Cancel
    Delete

Краще не змішувати без причини:

    Create

    Add

    New

якщо всі вони означають одне й те саме.

Але якщо семантика різна:

    Add item

    Create project

це нормально.

---

# 17. Form Consistency

Усі форми повинні використовувати подібну систему:

    Label
    Input
    Helper text
    Error message

Наприклад:

    Email
    [________________]

    Password
    [________________]

    Confirm password
    [________________]

Користувач вивчає один pattern і переносить його на інші форми.

---

# 18. Label Consistency

Labels повинні бути послідовними.

Погано:

    Email address

    Password

    Confirm your password

    Your phone number

Краще:

    Email

    Password

    Confirm password

    Phone

Це не абсолютне правило, але важливо мати єдину систему.

---

# 19. Input States Consistency

Input повинен мати узгоджені states:

    Default
    Hover
    Focus
    Filled
    Disabled
    Error
    Success

Наприклад:

    Default
    ┌──────────────────┐
    │ Email            │
    └──────────────────┘

    Focus
    ┌──────────────────┐
    │ Email            │
    └──────────────────┘
             ↑
          focus

    Error
    ┌──────────────────┐
    │ wrong@email      │
    └──────────────────┘
    Please enter a valid email.

Якщо один input має один focus style, а інший — зовсім інший без причини, consistency порушена.

---

# 20. Error Message Consistency

Помилки повинні мати однакову логіку.

Наприклад:

    Email
    [ wrong ]

    Please enter a valid email address.

і:

    Password
    [ short ]

    Password must contain at least 8 characters.

Обидва мають структуру:

    Field
      ↓
    Invalid value
      ↓
    Explanation
      ↓
    How to fix

---

# 21. Success Message Consistency

Наприклад:

    ✓ Profile updated successfully.

    ✓ Password changed successfully.

    ✓ Course created successfully.

Замість:

    Great!

    Done!

    Success!

    Everything worked!

без системної логіки.

---

# 22. Icons Consistency

Іконки повинні мати:

- consistent style;
- consistent stroke width;
- consistent size;
- consistent visual weight;
- consistent meaning.

Наприклад:

    24px icons

або:

    20px icons

а не:

    14px
    23px
    17px
    31px

випадково.

---

# 23. Icon Meaning Consistency

Особливо важливо:

    🔍 = Search

    ⚙ = Settings

    ✕ = Close

    ← = Back

Якщо:

    🔍

в одному місці означає Search,

а в іншому Filter,

користувач повинен додатково вивчати контекст.

---

# 24. Typography Consistency

Typography system може виглядати так:

    Display
        ↓
    H1
        ↓
    H2
        ↓
    H3
        ↓
    Body
        ↓
    Small
        ↓
    Caption

Наприклад:

    H1 = 40px / 700
    H2 = 32px / 700
    H3 = 24px / 600
    Body = 16px / 400
    Small = 14px / 400
    Caption = 12px / 400

Тоді всі сторінки використовують одну шкалу.

---

# 25. Spacing Consistency

Відступи також повинні бути системними.

Наприклад:

    4px
    8px
    12px
    16px
    24px
    32px
    48px
    64px

Тоді замість випадкових:

    margin: 13px;

    margin: 27px;

    margin: 19px;

можна використовувати spacing scale.

---

# 26. Spacing Rhythm

Наприклад:

    Card

    Title
        ↓ 8px
    Description
        ↓ 16px
    Metadata
        ↓ 24px
    Button

Такий ритм повторюється в інших cards.

Це створює:

    Rhythm
        ↓
    Consistency
        ↓
    Visual stability

---

# 27. Color Consistency

Color system повинна мати semantic meaning.

Наприклад:

    Primary
    Secondary
    Success
    Warning
    Error
    Info
    Neutral

Тоді:

    Success → зелений
    Error   → червоний
    Warning → жовтий / orange
    Info    → blue

Але важливо:

> Колір повинен мати стабільне значення.

---

# 28. Semantic Color

Наприклад:

    --color-success
    --color-warning
    --color-error
    --color-info

У компонентах:

    success → success color
    error   → error color
    warning → warning color

Це краще, ніж:

    button1 = blue
    message2 = green
    card3 = red

без semantic meaning.

---

# 29. Border Radius Consistency

Наприклад:

    Small controls → 6px
    Buttons        → 8px
    Cards          → 12px
    Dialogs        → 16px

Це може бути системним.

Погано:

    Button → 3px
    Input  → 17px
    Card   → 5px
    Modal  → 29px

без логічної причини.

---

# 30. Shadow Consistency

Shadows також можуть мати levels:

    Elevation 1
    Elevation 2
    Elevation 3

Наприклад:

    Card
        ↓
    subtle shadow

    Dropdown
        ↓
    medium shadow

    Modal
        ↓
    stronger shadow

Так створюється consistent depth system.

---

# 31. Component Consistency

Сучасний UI часто будується з reusable components:

    Button
    Input
    Select
    Checkbox
    Card
    Modal
    Alert
    Badge
    Tooltip
    Dropdown

Якщо компонент reusable, його design behavior теж повинен бути reusable.

---

# 32. React та Consistency

У React consistency можна підтримувати через reusable components.

Наприклад:

    function Button({ variant = "primary", children }) {
        return (
            <button className={`button button-${variant}`}>
                {children}
            </button>
        );
    }

Використання:

    <Button variant="primary">
        Save
    </Button>

    <Button variant="secondary">
        Cancel
    </Button>

    <Button variant="danger">
        Delete
    </Button>

Тут одна component architecture підтримує consistent UI.

---

# 33. Single Source of Truth

Корисний принцип:

> Для одного правила бажано мати одне централізоване джерело визначення.

Наприклад:

    Button component

визначає:

    height
    padding
    radius
    typography
    states

Тоді не потрібно вручну стилізувати кожну кнопку.

---

# 34. Consistency та Component Variants

Замість:

    .save-button
    .cancel-button
    .delete-button
    .submit-button
    .edit-button

можна мати semantic variants:

    primary
    secondary
    danger
    ghost

Наприклад:

    <Button variant="primary">
        Save
    </Button>

    <Button variant="danger">
        Delete
    </Button>

Це краще масштабується.

---

# 35. Consistency та Design Tokens

Design tokens дозволяють централізувати правила.

Наприклад:

    --color-primary
    --color-error

    --space-sm
    --space-md
    --space-lg

    --radius-sm
    --radius-md
    --radius-lg

    --font-size-body
    --font-size-heading

Тоді:

    Token
      ↓
    Component
      ↓
    Pattern
      ↓
    Page

---

# 36. Consistency та Design System

Коли продукт стає великим:

    Principles
        ↓
    Design Tokens
        ↓
    Components
        ↓
    Patterns
        ↓
    Templates
        ↓
    Product

Design System допомагає підтримувати consistency між:

- pages;
- teams;
- developers;
- designers;
- products.

---

# 37. Consistency та UX

Consistency зменшує cognitive load.

Наприклад:

    User learns:

    Blue button = primary action

Потім:

    іншій page

    blue button

Користувач уже знає:

    «Це головна дія».

Йому не потрібно вчитися знову.

---

# 38. Consistency та Learnability

**Learnability** — наскільки легко користувач може навчитися користуватися системою.

Consistency допомагає:

    Learn once
       ↓
    Reuse knowledge
       ↓
    Faster learning

Наприклад, якщо користувач зрозумів один dropdown:

    [ Country ▼ ]

то інші dropdowns повинні працювати аналогічно.

---

# 39. Consistency та Predictability

Consistency створює predictability.

    Same component
          ↓
    Same behavior
          ↓
    Predictable result

Наприклад:

    [ Save ]

користувач очікує:

    save data

а не:

    open preview

---

# 40. Internal Consistency

**Internal Consistency** — consistency всередині одного продукту.

Наприклад:

    Product A

    Save → blue button
    Cancel → secondary
    Delete → danger

ця система повинна працювати в:

    Profile
    Settings
    Courses
    Orders
    Dashboard

---

# 41. External Consistency

**External Consistency** — відповідність загальноприйнятим conventions.

Наприклад:

    X

часто означає:

    Close

    ←

означає:

    Back

    🔍

означає:

    Search

    🛒

означає:

    Cart

Користувач переносить знання з інших продуктів.

---

# 42. Consistency та Familiar Patterns

Не потрібно винаходити:

    новий checkbox
    новий dropdown
    новий search
    новий close button

тільки заради originality.

Краще:

    Familiar pattern
          +
    Good execution
          =
    Better usability

---

# 43. Але Consistency не повинна бути сліпою

Іноді потрібно свідомо порушити загальну систему.

Наприклад:

    Delete account

може мати:

    red color
    warning message
    confirmation dialog

хоча інші buttons не використовують red.

Причина:

    Context
        ↓
    Destructive action
        ↓
    Special treatment

Це не погана consistency.

Це:

> **Semantic consistency.**

---

# 44. Semantic Consistency

**Semantic Consistency** означає, що однакові значення мають однакове представлення.

Наприклад:

    Error
        ↓
    error color
        +
    error icon
        +
    error message

У всьому продукті.

А:

    Success
        ↓
    success color
        +
    success icon
        +
    success message

Це сильніше, ніж просто «всі елементи однакового кольору».

---

# 45. Consistency vs Context

Правильна модель:

    Consistency
        +
    Context
        +
    Semantics
        ↓
    Design decision

Наприклад:

    Primary Button

може бути:

    blue

але:

    Delete

може бути:

    red

Тому що semantic meaning різний.

---

# 46. Consistency та Accessibility

Consistency допомагає accessibility.

Наприклад, якщо focus state завжди:

    visible outline

користувач, який працює keyboard navigation, швидко розуміє:

    «Де зараз focus?»

Якщо кожна сторінка має інший focus behavior, навігація стає складнішою.

---

# 47. Focus Consistency

Усі interactive elements повинні мати зрозумілий focus state.

Наприклад:

    Button
        ↓
    focus ring

    Input
        ↓
    focus ring

    Link
        ↓
    focus indicator

Система повинна бути послідовною.

---

# 48. Responsive Consistency

Consistency повинна зберігатися на різних екранах.

Desktop:

    Sidebar
    Content

Mobile:

    Header
    Content
    Navigation drawer

Візуальна форма може змінитися, але semantic logic залишається.

Наприклад:

    Desktop:
    Sidebar → Courses

    Mobile:
    Menu → Courses

Це:

    Responsive adaptation
        +
    Semantic consistency

---

# 49. Consistency у States

Кожен компонент повинен мати узгоджені states:

    Default
    Hover
    Focus
    Active
    Disabled
    Loading
    Error
    Success

Наприклад, Primary Button:

    Default
    [ Save ]

    Hover
    [ Save ]

    Loading
    [ Saving... ]

    Disabled
    [ Save ]

Така система повинна бути однаковою для всіх Primary Buttons.

---

# 50. Consistency та Motion

Animation теж повинна бути системною.

Наприклад:

    Button hover
        ↓
    150ms

    Dropdown
        ↓
    200ms

    Modal
        ↓
    250ms

Не потрібно:

    один компонент → 100ms
    інший → 2s
    третій → 700ms

без причини.

---

# 51. Motion Language

Можна створити:

    Motion tokens

наприклад:

    --duration-fast
    --duration-normal
    --duration-slow

і:

    --easing-standard
    --easing-emphasized

Тоді animation також стає частиною design system.

---

# 52. Content + Visual Consistency

Consistency повинна існувати між text та visual design.

Наприклад:

    Delete

повинно виглядати як destructive action:

    [ Delete ]

а не:

    [ Delete ]

у стилі звичайної neutral button.

Тобто:

    Content meaning
        ↓
    Visual meaning
        ↓
    Interaction meaning

повинні збігатися.

---

# 53. Naming Consistency

Навіть назви компонентів у codebase можуть підтримувати consistency.

Наприклад:

    Button
    Input
    Select
    Checkbox
    Modal

краще, ніж:

    MyButton
    InputBox
    SelectThing
    CheckField
    PopupWindow

якщо команда має домовлену naming convention.

---

# 54. File Structure та Consistency

Consistency стосується і frontend architecture.

Наприклад:

    components/
    ├── Button/
    ├── Input/
    ├── Modal/
    └── Card/

Кожен компонент має:

    Component.tsx
    Component.module.css
    README.md

якщо це прийнята структура проєкту.

Це полегшує navigation у codebase.

---

# 55. Consistency у CSS

Погано:

    .button1 {
        padding: 13px 21px;
    }

    .button2 {
        padding: 12px 20px;
    }

    .button3 {
        padding: 14px 22px;
    }

Краще:

    .button {
        padding: 12px 20px;
    }

А variants змінюють лише те, що справді потрібно:

    .button--primary { ... }

    .button--secondary { ... }

    .button--danger { ... }

---

# 56. Consistency та CSS Variables

Наприклад:

    :root {
        --space-sm: 8px;
        --space-md: 16px;
        --space-lg: 24px;

        --radius-sm: 6px;
        --radius-md: 8px;
        --radius-lg: 12px;
    }

Тоді:

    .card {
        padding: var(--space-lg);
        border-radius: var(--radius-lg);
    }

    .button {
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--radius-md);
    }

Це створює system-level consistency.

---

# 57. Consistency та React Props

React props можуть описувати semantic consistency.

Наприклад:

    <Button variant="primary" />
    <Button variant="secondary" />
    <Button variant="danger" />

А не:

    <BlueButton />
    <GrayButton />
    <RedButton />

Semantic naming краще пояснює:

    Why?

а не тільки:

    How does it look?

---

# 58. Consistency та Accessibility Props

Наприклад:

    <Button
        variant="danger"
        aria-label="Delete course"
    >
        Delete
    </Button>

Усі buttons можуть підтримувати однакову accessibility model.

---

# 59. Practical Example — Course Platform

Уявімо educational platform.

Маємо:

    Dashboard
    Courses
    Students
    Settings

У всіх pages:

    Header
    Sidebar
    Main content

Primary action:

    [ Create ]

Secondary action:

    Cancel

Danger action:

    Delete

Success:

    ✓ Course created successfully.

Error:

    ✕ Unable to create course.

Це consistency.

---

# 60. Що станеться без Consistency

Уявімо:

    Dashboard
    [ Create ] → blue

    Courses
    [ New course ] → green

    Students
    [ Add student ] → black

    Settings
    [ Create ] → outlined red

Функціонально все може працювати.

Але користувач повинен щоразу думати:

    «Що тут є primary action?»

Це зайвий cognitive load.

---

# 61. Consistency Audit

Можна провести спеціальний **Consistency Audit**.

Перевірити:

    Buttons
    ↓
    Inputs
    ↓
    Typography
    ↓
    Colors
    ↓
    Icons
    ↓
    Spacing
    ↓
    Navigation
    ↓
    States
    ↓
    Errors
    ↓
    Messages
    ↓
    Motion

Для кожного:

    Чи однаково?
    Чи є причина для відмінності?

---

# 62. Consistency Matrix

Для великого проєкту можна створити таблицю:

    Component       Variant       Behavior

    Button          Primary       Main action
    Button          Secondary     Supporting action
    Button          Danger        Destructive action

    Input           Default       Editable
    Input           Error         Invalid
    Input           Disabled      Not editable

    Alert           Success       Positive result
    Alert           Error         Problem
    Alert           Warning       Caution

Це допомагає бачити систему.

---

# 63. Practical Checklist

## Visual

- [ ] Typography system consistent.
- [ ] Colors have semantic meaning.
- [ ] Buttons look consistent.
- [ ] Inputs look consistent.
- [ ] Icons use consistent style.
- [ ] Border radius follows a system.
- [ ] Shadows follow a system.
- [ ] Spacing follows a scale.

## Interaction

- [ ] Similar elements behave similarly.
- [ ] Hover states are consistent.
- [ ] Focus states are consistent.
- [ ] Loading states are consistent.
- [ ] Disabled states are consistent.
- [ ] Error states are consistent.
- [ ] Success states are consistent.

## Content

- [ ] Terminology is consistent.
- [ ] Button labels follow a pattern.
- [ ] Error messages follow a pattern.
- [ ] Success messages follow a pattern.
- [ ] Navigation labels are consistent.

## Components

- [ ] Reusable components are actually reusable.
- [ ] Variants are semantic.
- [ ] Components have predictable props.
- [ ] States are standardized.
- [ ] Accessibility behavior is consistent.

## Responsive

- [ ] Semantic hierarchy stays consistent.
- [ ] Navigation behavior is predictable.
- [ ] Components adapt consistently.
- [ ] Touch targets remain usable.

---

# 64. Типові помилки

## 64.1. Random values

    margin: 13px
    padding: 19px
    radius: 7px
    font-size: 17px

без системи.

Проблема:

> UI втрачає rhythm.

---

## 64.2. Different button styles

Однакова дія:

    [ Save ]

але кожного разу виглядає по-різному.

Проблема:

> Користувач не може сформувати reliable mental model.

---

## 64.3. Different terminology

    Save
    Store
    Apply
    Confirm

для однієї й тієї самої дії.

Проблема:

> Language inconsistency.

---

## 64.4. Different error patterns

Одна форма:

    Invalid email.

Інша:

    Something went wrong.

Третя:

    ERROR!

Проблема:

> Немає єдиної communication system.

---

## 64.5. Inconsistent icons

    24px outline icon

в одному місці та:

    16px filled icon

в іншому без причини.

Проблема:

> Visual language розпадається.

---

## 64.6. Consistency заради consistency

Проблема:

> Інколи дизайнери намагаються зробити абсолютно все однаковим.

Наприклад:

    Delete

повинна виглядати як:

    Save

тільки тому, що «всі кнопки однакові».

Насправді:

    Delete
        ↓
    destructive action
        ↓
    different semantic treatment

---

# 65. Як вирішувати конфлікт

Коли два рішення відрізняються, постав питання:

    1. Вони мають однакове значення?
              ↓
         Якщо так —
         consistency бажана.

    2. Вони мають різний semantic role?
              ↓
         Якщо так —
         різниця може бути виправданою.

    3. Чи зрозуміла причина відмінності?
              ↓
         Якщо ні —
         краще уніфікувати.

---

# 66. Mental Model

Корисна модель:

    Same meaning
         ↓
    Same pattern
         ↓
    Same visual language
         ↓
    Same interaction
         ↓
    Predictable experience

Але:

    Different meaning
         ↓
    Different semantic treatment
         ↓
    Still inside the same design system

---

# 67. Consistency → Design System

Можна побачити весь процес:

    Design Principles
          ↓
    Consistency rules
          ↓
    Design Tokens
          ↓
    Components
          ↓
    Patterns
          ↓
    Templates
          ↓
    Pages
          ↓
    Product

Наприклад:

    Principle:
    Keep primary actions consistent.

          ↓

    Token:
    --color-primary

          ↓

    Component:
    Button

          ↓

    Pattern:
    Form submission

          ↓

    Product:
    All forms use the same primary action pattern.

---

# 68. Consistency → Frontend Architecture

Для frontend developer це особливо важливо.

Без component system:

    Page A
      ↓
    custom button

    Page B
      ↓
    another custom button

    Page C
      ↓
    another custom button

З component system:

    Button
      ↓
    variants
      ↓
    states
      ↓
    reusable everywhere

Таким чином:

    Design Consistency
          ↓
    Component Reusability
          ↓
    Code Consistency

---

# 69. UI Consistency та Code Consistency

Ці речі часто пов'язані.

Наприклад:

    UI:

    Primary Button
    Secondary Button
    Danger Button

може відповідати:

    Code:

    Button
      variant="primary"

    Button
      variant="secondary"

    Button
      variant="danger"

Тобто добре спроєктована UI-система може природно перетворюватися на reusable component architecture.

---

# 70. Consistency у твоїх майбутніх застосунках

Коли ти створюватимеш власні маленькі застосунки для практики UI Design, корисно не просто стилізувати кожну сторінку окремо.

Створи маленьку систему:

    ui/
    ├── Button
    ├── Input
    ├── Select
    ├── Checkbox
    ├── Card
    ├── Badge
    ├── Alert
    └── Modal

і визнач:

    Colors
    Typography
    Spacing
    Radius
    Shadows
    States

Тоді навіть невеликий hobby project почне нагадувати справжній продукт.

---

# 71. Приклад маленької UI-системи

    Colors

    primary
    secondary
    success
    warning
    error
    neutral

    Typography

    h1
    h2
    h3
    body
    small
    caption

    Spacing

    xs
    sm
    md
    lg
    xl

    Components

    Button
    Input
    Card
    Badge
    Alert

    States

    default
    hover
    focus
    active
    disabled
    loading
    error
    success

Це вже маленький Design System.

---

# 72. Типові питання на співбесіді

### Що таке Consistency?

Consistency — це принцип дизайну, за якого однакові або подібні елементи мають узгоджений вигляд, поведінку та значення, щоб користувач міг переносити вже отримані знання на інші частини інтерфейсу.

---

### Чому Consistency важлива?

Вона:

- зменшує cognitive load;
- покращує learnability;
- підвищує predictability;
- прискорює interaction;
- зменшує кількість помилок;
- створює відчуття цілісного продукту.

---

### Чим Internal Consistency відрізняється від External Consistency?

**Internal Consistency** — узгодженість усередині конкретного продукту.

**External Consistency** — відповідність patterns, які користувач уже знає з інших продуктів.

---

### Чи означає Consistency, що все повинно виглядати однаково?

Ні.

Однакові semantic roles повинні бути послідовними, але різні semantic roles можуть мати різне оформлення.

Наприклад:

    Primary
    Secondary
    Danger

мають різний visual treatment, але належать до однієї системи.

---

### Чому не можна просто зробити всі buttons однаковими?

Тому що кнопки можуть мати різну semantic importance:

    Primary
    Secondary
    Tertiary
    Danger

Consistency повинна зберігатися на рівні системи, а не обов'язково на рівні абсолютної ідентичності.

---

### Що таке semantic consistency?

Це коли однакове значення системно передається однаковими visual та interaction patterns.

Наприклад:

    Error
        ↓
    error color
    error icon
    error message

по всьому продукту.

---

### Як Consistency пов'язана з Design System?

Design System формалізує consistency через:

    Design Principles
        ↓
    Tokens
        ↓
    Components
        ↓
    Patterns
        ↓
    Guidelines

---

### Як Consistency пов'язана з React?

Reusable React components дозволяють централізувати visual та behavioral rules.

Наприклад:

    <Button variant="primary">
        Save
    </Button>

може використовуватися у всьому застосунку.

---

# 73. Рівні освоєння

## 🟢 Core

Потрібно розуміти:

- що таке Consistency;
- Visual Consistency;
- Functional Consistency;
- Behavioral Consistency;
- Internal Consistency;
- External Consistency;
- Semantic Consistency;
- terminology consistency;
- component consistency.

---

## 🔵 Junior

Потрібно вміти:

- створити consistent buttons;
- створити consistent forms;
- використовувати typography scale;
- використовувати spacing scale;
- використовувати color system;
- підтримувати consistent states;
- використовувати знайомі UI patterns;
- створювати reusable components;
- підтримувати consistency у responsive UI.

---

## 🟣 Middle

Потрібно вміти:

- створювати component systems;
- працювати з design tokens;
- будувати design systems;
- створювати semantic variants;
- проводити consistency audit;
- працювати з accessibility;
- підтримувати consistency у великих applications;
- визначати, коли consistency потрібно порушити через context.

---

## 🔴 Senior

Потрібно розуміти:

- consistency як частину product architecture;
- cross-platform consistency;
- design system governance;
- scalable component architecture;
- semantic design tokens;
- organizational consistency;
- design-development collaboration;
- migration старого UI до design system;
- trade-offs між consistency та innovation.

---

# 74. Для Frontend Developer

Consistency — одна з тих тем UI Design, яка безпосередньо переходить у frontend architecture.

Ментальна модель:

    Design Principle
          ↓
    Consistency
          ↓
    Design System
          ↓
    Component
          ↓
    Variant
          ↓
    State
          ↓
    React
          ↓
    Reusable UI

Наприклад:

    Primary action
          ↓
    Primary Button
          ↓
    Button component
          ↓
    variant="primary"
          ↓
    consistent implementation
          ↓
    entire application

---

# 75. Mini Cheat Sheet

    CONSISTENCY

    Same meaning
        ↓
    Same pattern
        ↓
    Same visual language
        ↓
    Same behavior
        ↓
    Predictable experience

    Основні види:

    Visual
    Functional
    Behavioral
    Interaction
    Content
    Structural
    Semantic
    Accessibility
    Responsive

    Основні системи:

    Typography
    Colors
    Spacing
    Radius
    Shadows
    Icons
    Components
    States
    Motion

    Основні рівні:

    Primary
    Secondary
    Tertiary
    Danger

    Design System:

    Principles
        ↓
    Tokens
        ↓
    Components
        ↓
    Patterns
        ↓
    Templates
        ↓
    Product

---

# 76. Головне

> **Consistency дозволяє користувачу навчитися один раз і використовувати це знання багато разів.**

Якщо користувач знає:

    Blue filled button
        ↓
    Primary action

він може перенести це знання на:

    Dashboard
    Courses
    Settings
    Profile
    Forms

Це зменшує cognitive load.

Тому хороша Consistency створює:

    Familiarity
        ↓
    Learnability
        ↓
    Predictability
        ↓
    Efficiency
        ↓
    Better UX

Але головне правило:

> **Consistency — це не «зробити все однаковим».**

Правильніше:

> **Однакове повинно бути послідовним, а різне — зрозуміло відрізнятися.**

Тобто:

    Same meaning
        ↓
    Same treatment

    Different meaning
        ↓
    Different treatment

    But:

    Everything
        ↓
    belongs to
        ↓
    one coherent system

І саме тут Consistency переходить від простого UI-правила до основи **Design System**:

    Design Principles
          ↓
    Consistency
          ↓
    Design Tokens
          ↓
    Components
          ↓
    Patterns
          ↓
    Reusable UI
          ↓
    Predictable UX

> **Хороший інтерфейс не змушує користувача щоразу вчитися заново.**
>
> **Він використовує вже вивчені patterns, щоб користувач міг зосередитися на своїй задачі.**