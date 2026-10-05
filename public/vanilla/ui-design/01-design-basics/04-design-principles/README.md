# 04. Design Principles

## Що таке Design Principles

**Design Principles (принципи дизайну)** — це фундаментальні правила та орієнтири, які допомагають створювати зрозумілі, послідовні, зручні та візуально збалансовані інтерфейси.

Простими словами:

> Design Principles допомагають відповісти на питання: **«Чому цей UI повинен бути саме таким?»**

Якщо Visual Hierarchy відповідає переважно на питання:

    Що користувач повинен побачити першим?

то Design Principles допомагають відповісти:

    Як зробити інтерфейс
    зрозумілим?
        ↓
    Як зробити його
    простим?
        ↓
    Як зробити його
    послідовним?
        ↓
    Як зробити його
    передбачуваним?
        ↓
    Як зробити його
    зручним?

---

# 1. Навіщо потрібні Design Principles

Без принципів дизайн легко перетворюється на набір випадкових рішень:

    цей button синій,
    бо так красиво;

    цей margin 27px,
    бо так вийшло;

    цей заголовок великий,
    бо так подобається;

    ця іконка тут,
    бо залишилося місце.

Design Principles дозволяють перейти від:

    «мені так подобається»

до:

    «це рішення допомагає користувачу
    виконати його задачу».

---

# 2. Design Principles ≠ Design Rules

Важливо розрізняти:

## Design Rule

Конкретне правило:

    Button height = 40px

    Border radius = 8px

    Heading = 32px

Це конкретне значення.

## Design Principle

Більш загальний принцип:

    Keep interfaces consistent.

або:

    Make important actions easy to find.

Принцип може реалізовуватися різними способами.

Тому:

    Principle
        ↓
    Design decision
        ↓
    Specific rule / token
        ↓
    UI implementation

---

# 3. Основні Design Principles

Для практичного UI Design особливо важливі:

1. Clarity
2. Simplicity
3. Consistency
4. Hierarchy
5. Familiarity
6. Affordance
7. Feedback
8. Visibility
9. Predictability
10. User Control
11. Error Prevention
12. Error Recovery
13. Accessibility
14. Flexibility
15. Efficiency
16. Recognition over Recall
17. Progressive Disclosure
18. Less is More
19. Proximity
20. Balance
21. Contrast
22. Alignment
23. Whitespace
24. Visual Rhythm

Не потрібно сприймати цей список як набір ізольованих правил.

Вони взаємопов'язані:

    Clarity
       ↓
    Simplicity
       ↓
    Hierarchy
       ↓
    Consistency
       ↓
    Predictability
       ↓
    Usability

---

# 4. Clarity — зрозумілість

**Clarity** означає, що користувач повинен швидко зрозуміти:

- де він знаходиться;
- що бачить;
- що може зробити;
- що відбувається;
- що станеться після дії.

Наприклад:

    [ Submit ]

може бути менш зрозумілим, ніж:

    [ Create account ]

Ще краще, якщо дія максимально відповідає контексту:

    [ Book appointment ]

замість:

    [ Submit ]

---

# 5. Clarity у тексті

Погано:

    Continue

Добре:

    Continue to payment

Ще краще, якщо контекст очевидний:

    [ Pay $49 ]

Чим точніше назва action, тим менше користувачу потрібно здогадуватися.

---

# 6. Simplicity — простота

**Simplicity** означає зменшення непотрібної складності.

Це не означає:

> «Зробити якомога менше елементів».

Правильніше:

> **Залишити все необхідне та прибрати те, що не допомагає користувачу досягти мети.**

Наприклад:

    User goal:
    create an account

Не обов'язково одразу показувати:

    First name
    Last name
    Age
    Address
    Phone
    Company
    Job title
    Website
    Social links
    Preferences
    Avatar

Якщо для першого кроку достатньо:

    Email
    Password

можна почати з них.

---

# 7. Simplicity ≠ Minimalism

Це важлива відмінність.

**Minimalism** — переважно візуальний стиль.

**Simplicity** — характеристика досвіду взаємодії.

Можна мати мінімалістичний UI:

    білий фон
    чорний текст
    одна кнопка

але складний UX.

Наприклад:

    маленька незрозуміла іконка
          ↓
    відкриває меню
          ↓
    потрібна функція захована
          ↓
    користувач не знає, що робити

Тому:

    Minimal UI
        ≠
    Simple UX

---

# 8. Consistency — послідовність

**Consistency** означає, що однакові речі повинні виглядати та поводитися однаково.

Наприклад, якщо:

    Primary button

в одному місці:

    [ Save ]

має синій filled style,

то не варто в іншому місці робити:

    [ Save ]

зеленим outlined style без причини.

Consistency стосується:

- colors;
- typography;
- spacing;
- buttons;
- forms;
- navigation;
- icons;
- interaction;
- states;
- terminology.

---

# 9. Internal Consistency

**Internal Consistency** — послідовність усередині одного продукту.

Наприклад:

    Save
    Save
    Save

повинна мати однакову логіку.

Не:

    [Save]

    [SAVE]

    [Save changes]

    [Confirm]

якщо всі кнопки виконують однакову дію.

---

# 10. External Consistency

**External Consistency** — відповідність знайомим патернам, які користувач уже знає з інших продуктів.

Наприклад:

    🔍

майже всюди асоціюється з Search.

Користувач не повинен щоразу вивчати:

    «Що означає ця іконка?»

---

# 11. Familiarity — знайомість

Користувач уже має досвід роботи з:

- websites;
- mobile apps;
- forms;
- buttons;
- menus;
- search;
- carts;
- tabs;
- checkboxes;
- radio buttons;
- navigation.

Тому хороший UI часто використовує знайомі patterns.

Наприклад:

    🔍 Search

    🛒 Cart

    ⚙ Settings

    ← Back

Не потрібно винаходити нову іконку для кожної стандартної дії.

---

# 12. Familiarity та Innovation

Інноваційний дизайн не означає:

> «Зробити все незнайомим».

Хороший підхід:

    Familiar foundation
            +
    New experience

Наприклад:

    знайомий search
          +
    новий спосіб фільтрації

або:

    знайома navigation
          +
    нова інформаційна структура

---

# 13. Affordance — можливість дії

**Affordance** — властивість елемента, яка підказує, як з ним взаємодіяти.

Наприклад:

    [ Save ]

візуально схожа на кнопку.

Користувач розуміє:

    це можна натиснути.

Інший приклад:

    [________________]

виглядає як поле введення.

---

# 14. Signifiers

**Signifier** — візуальний або текстовий сигнал, який показує можливу дію.

Наприклад:

    → стрілка
    🔍 search icon
    ⋮ menu
    ▼ dropdown
    ✕ close

Або текст:

    Click to edit

Signifier допомагає користувачу зрозуміти:

    Що тут можна зробити?

---

# 15. Feedback — зворотний зв'язок

Після дії користувач повинен отримати відповідь системи.

Наприклад:

    User clicks:

    [ Save ]

Система:

    Saving...

        ↓

    Saved successfully

Без feedback:

    [ Save ]

    ...

    ...

Користувач не знає:

    Чи натискання спрацювало?
    Чи щось завантажується?
    Чи сталася помилка?

---

# 16. Feedback Types

Feedback може бути:

## Visual

    Button changes state

## Text

    Saved successfully

## Motion

    Loading animation

## Sound

    Notification sound

## Haptic

    Vibration on mobile

Найчастіше web UI використовує:

    Visual
    +
    Text
    +
    Motion

---

# 17. Visibility — видимість

Важлива функція не повинна бути без причини прихована.

Наприклад:

    User wants to filter courses.

Якщо filter доступний лише через:

    ⋮
      ↓
    More
      ↓
    Tools
      ↓
    Filters

користувачу важко його знайти.

Якщо filtering є ключовою дією:

    [ Filter ]

може бути набагато кращим рішенням.

---

# 18. Visibility та Information Hierarchy

Visibility не означає:

> «Все повинно бути видно одночасно».

Інакше інтерфейс стане перевантаженим.

Потрібно визначити:

    Що потрібно показати зараз?
          ↓
    Що можна показати пізніше?
          ↓
    Що можна приховати?

Це приводить нас до:

    Progressive Disclosure

---

# 19. Progressive Disclosure

**Progressive Disclosure** — показувати користувачу інформацію поступово, коли вона стає потрібною.

Наприклад:

    Basic settings

    Theme
    Language

    Advanced settings
        ↓
    More options
        ↓
    API settings
    Developer options
    Debug information

Користувач не отримує всі 20 налаштувань одразу.

---

# 20. Predictability — передбачуваність

Користувач повинен приблизно розуміти:

> «Що станеться, якщо я це натисну?»

Наприклад:

    [ Delete account ]

має явно сигналізувати про наслідок.

Не:

    [ Continue ]

якщо після натискання акаунт буде видалено.

---

# 21. Predictability у Navigation

Якщо користувач натискає:

    Courses

він очікує:

    Courses page

Якщо натискає:

    Settings

очікує:

    Settings

Не варто створювати несподівану поведінку без необхідності.

---

# 22. User Control — контроль користувача

Користувач повинен відчувати, що він контролює процес.

Наприклад:

    [ Cancel ]

    [ Undo ]

    [ Back ]

    [ Edit ]

    [ Close ]

Це особливо важливо для:

- destructive actions;
- forms;
- navigation;
- dialogs;
- uploads;
- editing.

---

# 23. Undo

**Undo** — один із дуже корисних механізмів user control.

Наприклад:

    Course deleted.

    [ Undo ]

Замість:

    Course deleted permanently.

користувач отримує можливість виправити помилку.

---

# 24. Error Prevention — запобігання помилкам

Хороший дизайн не тільки повідомляє про помилки.

Він намагається:

> **не допустити помилку взагалі.**

Наприклад, замість:

    Age
    [____________]

користувач може ввести:

    abcdef

Краще:

    Age
    [____________]
       number input

або:

    Age
    [ 18 ]

---

# 25. Error Prevention у Forms

Наприклад:

    Email
    [________________]

Якщо користувач вводить:

    user@example

система може одразу показати:

    Please enter a valid email.

Але ще краще — зрозуміло пояснити:

    Email must contain @ and a domain.

---

# 26. Error Recovery

Помилки все одно будуть.

Тому UI повинен допомагати:

    Error
       ↓
    Explain
       ↓
    Show how to fix
       ↓
    Let user retry

Наприклад:

    Payment failed.

    Your card was declined.

    [ Try again ]

    [ Use another card ]

Це значно краще, ніж:

    Error 402

---

# 27. Хороше повідомлення про помилку

Погано:

    Invalid input.

Добре:

    Password must contain at least 8 characters.

Ще краще:

    Password is too short.
    Use at least 8 characters.

Принцип:

    What happened?
          ↓
    Why?
          ↓
    How to fix?

---

# 28. Recognition over Recall

**Recognition over Recall** означає:

> Краще показати користувачу можливий вибір, ніж змушувати його згадувати інформацію.

Погано:

    Enter country code:

    [________]

Користувач повинен згадувати:

    +380?

Краще:

    Country
    [ Ukraine ▼ ]

Або:

    +380 Ukraine

---

# 29. Приклад Recognition

Погано:

    Keyboard shortcut:
    [________]

Добре:

    Save
    Ctrl + S

Користувач бачить потрібну інформацію, а не повинен її пам'ятати.

---

# 30. Efficiency — ефективність

UI повинен дозволяти досвідченому користувачу виконувати повторювані задачі швидко.

Наприклад:

    Ctrl + S

    Ctrl + K

    keyboard navigation

    autocomplete

    recent items

    bulk actions

    filters

---

# 31. Efficiency vs Simplicity

Ці принципи іноді конфліктують.

Для нового користувача:

    [ Save ]

може бути достатньо.

Для power user:

    Ctrl + S

може бути швидше.

Хороший дизайн може підтримувати обидва сценарії:

    [ Save ]

    Ctrl + S

---

# 32. Flexibility — гнучкість

Різні користувачі можуть мати різні потреби.

Наприклад:

    Beginner
        ↓
    простий UI

    Advanced user
        ↓
    shortcuts
    filters
    bulk actions
    advanced settings

Гнучкий UI дозволяє різним категоріям користувачів працювати комфортно.

---

# 33. Accessibility — доступність

Accessibility означає, що UI повинен бути доступним для максимально широкого кола користувачів.

Це включає:

- keyboard navigation;
- screen readers;
- sufficient contrast;
- focus states;
- semantic HTML;
- accessible forms;
- readable text;
- alternative text;
- достатні touch targets.

Accessibility — не «додаткова функція».

Це частина якісного дизайну.

---

# 34. Don't Rely Only on Color

Погано:

    🔴 Error
    🟢 Success

якщо значення передається лише кольором.

Краще:

    ✕ Error
    ✓ Success

і додатково:

    червоний → error
    зелений → success

Тобто:

    Color
       +
    Icon
       +
    Text

---

# 35. Feedback та Accessibility

Feedback повинен бути доступним.

Наприклад, якщо є:

    зелена галочка

не варто покладатися тільки на неї.

Краще:

    ✓ Profile updated successfully.

Таку інформацію легше сприйняти різним користувачам.

---

# 36. Balance — баланс

**Balance** — візуальна рівновага між елементами.

Наприклад:

    ┌──────────────────────────────┐
    │ Text             Illustration│
    │                              │
    │ Heading                      │
    │ Description                  │
    │ [ CTA ]                      │
    └──────────────────────────────┘

Якщо ілюстрація займає 90% простору, а content 10%, композиція може відчуватися незбалансованою.

---

# 37. Symmetrical Balance

Симетричний баланс:

    ┌──────────────┬──────────────┐
    │              │              │
    │    Content   │     Image    │
    │              │              │
    └──────────────┴──────────────┘

Ліва та права частини мають приблизно однакову візуальну вагу.

---

# 38. Asymmetrical Balance

Асиметричний баланс:

    ┌──────────────────────────────┐
    │                              │
    │ BIG CONTENT      Small image │
    │                              │
    │                              │
    └──────────────────────────────┘

Елементи різного розміру можуть все одно створювати рівновагу через:

- position;
- color;
- whitespace;
- visual weight.

---

# 39. Contrast — контраст

Contrast створює відмінності:

    Large      vs Small
    Dark       vs Light
    Bold       vs Regular
    Filled     vs Outline
    Active     vs Inactive

Контраст допомагає створювати:

    hierarchy
    focus
    separation
    readability

---

# 40. Alignment — вирівнювання

Alignment створює порядок.

Наприклад:

    Product
    Description
    Price
    Button

Якщо всі елементи мають одну ліву межу:

    Product
    Description
    Price
    Button

інтерфейс відчувається структурованим.

---

# 41. Proximity — близькість

Близько розташовані елементи сприймаються як пов'язані.

Наприклад:

    Email
    [________________]

це одна група.

А:

    Email
    [________________]


    Password
    [________________]

вже дві окремі групи.

Spacing створює структуру без додаткових рамок.

---

# 42. Whitespace — порожній простір

Whitespace допомагає:

- розділяти sections;
- групувати elements;
- підкреслювати важливе;
- зменшувати cognitive load;
- покращувати readability.

Порожній простір — це не «порожнеча».

> **Whitespace є активним інструментом дизайну.**

---

# 43. Rhythm — ритм

Visual Rhythm створюється повторенням:

- spacing;
- typography;
- colors;
- component sizes;
- alignment.

Наприклад:

    Section
        ↓ 32px
    Heading
        ↓ 16px
    Text
        ↓ 24px
    Button

Якщо spacing постійно випадковий:

    13px
    29px
    17px
    41px
    8px

інтерфейс може відчуватися хаотичним.

---

# 44. Design Rhythm та Design Tokens

Замість випадкових значень можна використовувати scale:

    4px
    8px
    12px
    16px
    24px
    32px
    48px
    64px

Наприклад:

    --space-xs: 4px;
    --space-sm: 8px;
    --space-md: 16px;
    --space-lg: 24px;
    --space-xl: 32px;
    --space-2xl: 48px;

Це допомагає створити consistency.

---

# 45. Jakob's Law

**Jakob's Law**:

> Користувачі очікують, що ваш продукт буде працювати подібно до продуктів, які вони вже знають.

Наприклад:

    Search
    Cart
    Profile
    Settings
    Back
    Close

мають знайому поведінку.

Це зменшує learning curve.

---

# 46. Hick's Law

**Hick's Law**:

> Чим більше варіантів вибору має користувач, тим більше часу йому потрібно для прийняття рішення.

Наприклад:

    [A]
    [B]
    [C]
    [D]
    [E]
    [F]
    [G]
    [H]

може бути складніше, ніж:

    [Recommended]

    [Other options]

Тому іноді потрібно:

    Reduce choices
          ↓
    Reduce decision time

---

# 47. Miller's Law

Часто згадуваний принцип:

> Людська робоча пам'ять має обмежену ємність.

Для UI практичний висновок:

> Не перевантажуй користувача великою кількістю незалежних елементів одночасно.

Краще групувати:

    Personal information

    Name
    Email
    Phone

ніж створювати одну довгу безструктурну форму.

---

# 48. Fitts's Law

**Fitts's Law** пов'язує час досягнення цілі з її розміром та відстанню.

Для UI практичний висновок:

> Важливі interactive targets повинні бути достатньо великими та легко доступними.

Наприклад:

    [ Save ]

краще, ніж дуже маленька:

    [✓]

якщо користувачу складно натиснути її.

Особливо важливо для:

- mobile;
- touch interfaces;
- accessibility;
- primary actions.

---

# 49. Tesler's Law

**Tesler's Law**:

> Певна кількість складності є невід'ємною частиною системи.

Не всю складність можна прибрати.

Питання:

    Де повинна знаходитися складність?

Хороший UI намагається:

    Reduce unnecessary complexity
          ↓
    Hide complexity when possible
          ↓
    Present necessary complexity clearly

Наприклад, складну систему налаштувань можна розділити на:

    Basic settings

    Advanced settings

---

# 50. Doherty Threshold

Загальна ідея:

> Система повинна реагувати достатньо швидко, щоб користувач відчував безперервність взаємодії.

Тому важливі:

- loading states;
- skeletons;
- optimistic UI;
- progress indicators;
- immediate feedback.

Наприклад:

    [ Save ]

    Saving...

краще, ніж:

    [ Save ]

    ...

    ...

    ...

---

# 51. Pareto Principle

У UI можна використовувати як евристику:

> Невелика кількість функцій часто використовується значно частіше за інші.

Тому потрібно визначати:

    Most important actions
            ↓
    Most visible

А менш популярні:

    Secondary actions
            ↓
    Less prominent

Це допомагає уникати перевантаження.

---

# 52. Aesthetic-Usability Effect

**Aesthetic-Usability Effect** описує тенденцію користувачів сприймати візуально приємний інтерфейс як більш зручний.

Але важливе уточнення:

    Beautiful UI
        ≠
    Usable UI

Правильніше:

    Visual quality
        +
    Usability
        +
    Accessibility
        =
    Strong UI

---

# 53. Consistency vs Context

Consistency важлива, але:

> Не потрібно бути послідовним заради самої послідовності.

Наприклад:

    Delete

може мати destructive style.

Це порушує загальний стиль primary buttons, але логічно відповідає context.

Тому:

    Consistency
        +
    Context
        ↓
    Appropriate design decision

---

# 54. Principle Conflicts

Design Principles іноді конфліктують.

Наприклад:

    Simplicity
        vs
    Flexibility

або:

    Visibility
        vs
    Minimalism

або:

    Consistency
        vs
    Context

або:

    Efficiency
        vs
    Simplicity

Тому дизайн — це не механічне виконання правил.

Це:

    Principle
        ↓
    Context
        ↓
    Trade-off
        ↓
    Decision

---

# 55. Design Trade-offs

Приклад:

    Dashboard

Потрібно показати:

    20 metrics

Але користувачу важко сприймати 20 metrics одночасно.

Можливі рішення:

    Primary metrics
          ↓
    4–6 most important

    Secondary metrics
          ↓
    expandable section

Так ми балансуємо:

    Visibility
        +
    Simplicity

---

# 56. Design Principles та UX

Усе можна пов'язати:

    User Goal
        ↓
    User Needs
        ↓
    UX
        ↓
    Design Principles
        ↓
    Information Architecture
        ↓
    Visual Hierarchy
        ↓
    UI
        ↓
    Interaction
        ↓
    Feedback
        ↓
    Result

Тому Design Principles — це міст між:

    UX thinking

та

    UI implementation.

---

# 57. Design Principles у Frontend

Frontend developer повинен розуміти не тільки:

    div
    flex
    grid
    margin
    padding

але й:

    Чому цей блок тут?

    Чому ця кнопка primary?

    Чому це поле приховане?

    Чому error знаходиться саме тут?

    Чому navigation така?

    Чому цей компонент reusable?

    Чому ці два елементи мають однаковий style?

Це переводить frontend від:

    «зверстати макет»

до:

    «реалізувати interaction model».

---

# 58. Design Principles → Components

Наприклад:

    PrimaryButton
    SecondaryButton
    DangerButton

можуть бути реалізовані як:

    <Button variant="primary">
        Save
    </Button>

    <Button variant="secondary">
        Cancel
    </Button>

    <Button variant="danger">
        Delete
    </Button>

Це реалізація принципу:

    Consistency
        +
    Semantic hierarchy

---

# 59. Design Principles → Design System

Коли продукт росте, принципи перетворюються на систему.

    Design Principles
          ↓
    Design decisions
          ↓
    Design tokens
          ↓
    Components
          ↓
    Patterns
          ↓
    Design System

Наприклад:

    Principle:
    Primary action must be clear.

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

    Product UI

---

# 60. Приклад повної форми

Уявімо:

    Create account

    Email
    [________________]

    Password
    [________________]

    [ Create account ]

    Already have an account?
    Sign in

Тут працюють одразу декілька принципів:

    Clarity
        ↓
    зрозуміла назва форми

    Simplicity
        ↓
    тільки необхідні поля

    Hierarchy
        ↓
    title → fields → CTA

    Consistency
        ↓
    стандартні inputs/buttons

    Affordance
        ↓
    поля виглядають editable

    Feedback
        ↓
    validation / loading / success

    Error Prevention
        ↓
    validation

    User Control
        ↓
    можливість повернутися / скасувати

    Accessibility
        ↓
    labels + keyboard + focus

---

# 61. Приклад складного Dashboard

Уявімо:

    Analytics

    [ Last 30 days ▼ ]

    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │ 12,430   │ │ 8,421    │ │ 67.8%    │
    │ Users    │ │ Active   │ │ Growth   │
    └──────────┘ └──────────┘ └──────────┘

    Revenue

    ┌─────────────────────────────────────┐
    │                                     │
    │                Chart                │
    │                                     │
    └─────────────────────────────────────┘

    Recent activity

    User        Action          Date

Тут працюють:

    Hierarchy
    Grouping
    Alignment
    Contrast
    Whitespace
    Consistency
    Progressive Disclosure
    Recognition
    Efficiency

---

# 62. Як аналізувати існуючий UI

Коли бачиш будь-який interface, постав питання:

## Clarity

    Я одразу розумію, що це?

## Hierarchy

    Що я бачу першим?

## Simplicity

    Що можна прибрати?

## Consistency

    Чи однакові компоненти поводяться однаково?

## Affordance

    Чи зрозуміло, що можна натиснути?

## Feedback

    Що відбувається після дії?

## Visibility

    Чи легко знайти потрібну функцію?

## Predictability

    Чи зрозуміло, що станеться після натискання?

## Error Prevention

    Чи допомагає UI уникнути помилки?

## Accessibility

    Чи можна користуватися UI без миші?

---

# 63. Практичний алгоритм Design Review

Перед завершенням дизайну:

    1. Визначити user goal
                ↓
    2. Визначити primary task
                ↓
    3. Визначити primary action
                ↓
    4. Прибрати непотрібні елементи
                ↓
    5. Створити information hierarchy
                ↓
    6. Створити visual hierarchy
                ↓
    7. Перевірити consistency
                ↓
    8. Перевірити states
                ↓
    9. Перевірити accessibility
                ↓
    10. Перевірити responsive behavior
                ↓
    11. Провести usability test
                ↓
    12. Iterate

---

# 64. Типові помилки

## 64.1. Дизайн заради краси

    «Виглядає красиво»

але:

    користувач не знає,
    що робити.

Проблема:

> Aesthetic ≠ usability.

---

## 64.2. Занадто багато функцій

    Search
    Filter
    Export
    Share
    Print
    Download
    Edit
    Delete
    Duplicate
    Archive
    Move
    Copy

Усе одночасно.

Проблема:

> Cognitive overload.

---

## 64.3. Непослідовні компоненти

Одна кнопка:

    border-radius: 8px

інша:

    border-radius: 2px

третя:

    border-radius: 20px

без логічної причини.

---

## 64.4. Незрозумілі іконки

    [ ? ]

    [ ? ]

    [ ? ]

Якщо значення неочевидне, краще використовувати:

    icon + label

---

## 64.5. Відсутність feedback

    Click

    ...

    ...

Користувач не розуміє, чи система працює.

---

## 64.6. Помилки без рішення

Погано:

    Something went wrong.

Добре:

    We couldn't upload the file.

    Check the file size and try again.

    [ Try again ]

---

## 64.7. Hidden functionality

Ключова функція захована на третьому рівні меню.

Проблема:

> Visibility не відповідає importance.

---

# 65. Практичний Checklist

## Clarity

- [ ] Зрозуміло призначення сторінки.
- [ ] Зрозумілі labels.
- [ ] Зрозумілі CTA.
- [ ] Зрозумілі повідомлення.

## Simplicity

- [ ] Немає непотрібних елементів.
- [ ] Немає зайвих кроків.
- [ ] Основний task не перевантажений.

## Consistency

- [ ] Однакові компоненти виглядають однаково.
- [ ] Однакові дії мають однакові labels.
- [ ] Spacing системний.
- [ ] Typography системна.
- [ ] Colors системні.

## Hierarchy

- [ ] Видно primary content.
- [ ] Видно primary action.
- [ ] Secondary content менш помітний.
- [ ] Є достатній whitespace.

## Interaction

- [ ] Зрозуміло, що clickable.
- [ ] Є hover/focus/active states.
- [ ] Є feedback.
- [ ] Є loading states.

## Errors

- [ ] Помилки можна зрозуміти.
- [ ] Зрозуміло, як виправити проблему.
- [ ] Передбачені помилки користувача.
- [ ] Є retry / recovery.

## Accessibility

- [ ] Keyboard navigation працює.
- [ ] Focus state видно.
- [ ] Contrast достатній.
- [ ] Не використовується тільки color.
- [ ] Semantic HTML можливий.

## Responsive

- [ ] UI працює на mobile.
- [ ] UI працює на tablet.
- [ ] UI працює на desktop.
- [ ] Hierarchy зберігається.

---

# 66. Типові питання на співбесіді

### Що таке Design Principles?

Design Principles — це фундаментальні правила та орієнтири, які допомагають створювати зрозумілий, послідовний, передбачуваний та зручний UI.

---

### Чим Design Principle відрізняється від Design Rule?

Principle — загальний принцип:

    Keep the interface consistent.

Rule — конкретне рішення:

    Button radius = 8px.

---

### Чому consistency важлива?

Тому що вона зменшує learning curve та допомагає користувачу переносити вже отримані знання на інші частини продукту.

---

### Що таке Affordance?

Affordance — властивість елемента, яка підказує можливу взаємодію з ним.

Наприклад:

    button → click
    input → type
    slider → drag

---

### Що таке Feedback?

Feedback — реакція системи на дію користувача.

Наприклад:

    click
      ↓
    loading
      ↓
    success

---

### Що таке Progressive Disclosure?

Поступове розкриття складності: користувачу показується необхідна інформація зараз, а додаткова — коли вона потрібна.

---

### Що таке Recognition over Recall?

Краще показувати користувачу доступні варіанти та підказки, ніж змушувати його згадувати інформацію.

---

### Чому accessibility є Design Principle?

Тому що хороший interface повинен бути usable для максимально широкого кола користувачів, включно з людьми, які використовують keyboard navigation, screen readers або мають інші потреби доступності.

---

# 67. Рівні освоєння

## 🟢 Core

Потрібно розуміти:

- Clarity;
- Simplicity;
- Consistency;
- Hierarchy;
- Affordance;
- Feedback;
- Visibility;
- Predictability;
- Accessibility;
- Error prevention.

---

## 🔵 Junior

Потрібно вміти:

- створювати простий та зрозумілий UI;
- використовувати consistency;
- будувати primary/secondary actions;
- проектувати forms;
- створювати states;
- показувати feedback;
- проектувати error messages;
- використовувати знайомі patterns;
- враховувати accessibility;
- не перевантажувати UI.

---

## 🟣 Middle

Потрібно вміти:

- балансувати conflicting principles;
- працювати з complex interfaces;
- проектувати dashboards;
- створювати design systems;
- використовувати design tokens;
- проектувати progressive disclosure;
- враховувати різні user types;
- працювати з information density;
- проектувати складні states;
- проводити design review.

---

## 🔴 Senior

Потрібно розуміти:

- Design Principles як частину product strategy;
- UX research;
- usability;
- behavioral patterns;
- accessibility;
- design systems;
- product constraints;
- business goals;
- user goals;
- design trade-offs;
- scalability;
- cross-platform consistency.

---

# 68. Для Frontend Developer

Для frontend developer особливо важливо розуміти:

    Design Principle
          ↓
    UI Pattern
          ↓
    Component
          ↓
    Props
          ↓
    State
          ↓
    Interaction
          ↓
    Feedback

Наприклад:

    Principle:
    Keep actions consistent.

          ↓

    Pattern:
    Button variants

          ↓

    React component:

    <Button variant="primary">
        Save
    </Button>

          ↓

    State:

    idle
    loading
    success
    error
    disabled

Це вже поєднання:

    UI Design
    +
    UX
    +
    React
    +
    Frontend Architecture

---

# 69. Design Principles та твій UI Design шлях

Після:

    01. What is UI
          ↓
    02. UI vs UX
          ↓
    03. Visual Hierarchy
          ↓
    04. Design Principles

починає формуватися правильна ментальна модель:

    UI
      ↓
    UX
      ↓
    Hierarchy
      ↓
    Principles
      ↓
    Components
      ↓
    States
      ↓
    Responsive Design
      ↓
    Design System

Тобто ти поступово переходиш від:

    «Як виглядає UI?»

до:

    «Чому UI повинен працювати саме так?»

Це дуже важливий перехід.

---

# 70. Mini Cheat Sheet

    DESIGN PRINCIPLES

    Clarity
        ↓
    Зрозуміло, що відбувається

    Simplicity
        ↓
    Мінімум непотрібної складності

    Consistency
        ↓
    Однакове працює однаково

    Familiarity
        ↓
    Використовуй знайомі patterns

    Affordance
        ↓
    Зрозуміло, що можна зробити

    Feedback
        ↓
    Система відповідає на дію

    Visibility
        ↓
    Важливе легко знайти

    Predictability
        ↓
    Зрозуміло, що станеться

    User Control
        ↓
    Користувач контролює процес

    Error Prevention
        ↓
    Не допускай помилок, якщо можливо

    Error Recovery
        ↓
    Допоможи виправити помилку

    Recognition
        ↓
    Показуй замість того, щоб змушувати пам'ятати

    Progressive Disclosure
        ↓
    Показуй складність поступово

    Accessibility
        ↓
    UI доступний різним користувачам

    Efficiency
        ↓
    Дозволяй виконувати задачі швидко

---

# 71. Головне

> **Design Principles — це не набір красивих правил для дизайнерів.**

Це спосіб мислення про interface.

Хороший UI повинен бути:

    Clear
      ↓
    Simple
      ↓
    Consistent
      ↓
    Predictable
      ↓
    Accessible
      ↓
    Efficient
      ↓
    Useful

Але найважливіше:

> **Не існує принципу, який потрібно застосовувати механічно в кожній ситуації.**

Завжди потрібно дивитися на:

    User
      ↓
    Goal
      ↓
    Context
      ↓
    Task
      ↓
    Constraints
      ↓
    Design decision

Тому професійне design thinking виглядає приблизно так:

    Є проблема
          ↓
    Визначаємо user goal
          ↓
    Визначаємо constraints
          ↓
    Обираємо relevant principles
          ↓
    Створюємо design solution
          ↓
    Перевіряємо usability
          ↓
    Отримуємо feedback
          ↓
    Iterate

І головна ментальна модель:

    User Goal
        ↓
    UX
        ↓
    Design Principles
        ↓
    Information Architecture
        ↓
    Visual Hierarchy
        ↓
    UI
        ↓
    Interaction
        ↓
    Feedback
        ↓
    Result

> **Хороший дизайн — це не коли всі елементи красиві окремо.**

> **Хороший дизайн — це коли всі елементи разом допомагають користувачу легко досягти своєї мети.**