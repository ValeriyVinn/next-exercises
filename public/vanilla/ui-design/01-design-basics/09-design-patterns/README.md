# Design Patterns

## 1. Що таке Design Patterns

**Design Pattern (патерн дизайну)** — це типовий, перевірений спосіб розв'язання повторюваної UI/UX-задачі.

Патерн — це не готовий дизайн і не конкретний компонент.

Це радше **рішення, яке можна адаптувати до різних інтерфейсів**.

Наприклад:

- користувачеві потрібно відкрити додаткову інформацію → **Accordion**
- потрібно вибрати один варіант → **Radio Group**
- потрібно вибрати декілька варіантів → **Checkbox Group**
- потрібно виконати основну дію → **Primary Button**
- потрібно показати коротке повідомлення → **Toast**
- потрібно підтвердити небезпечну дію → **Confirmation Dialog**
- потрібно перейти між основними розділами → **Navigation**
- потрібно показати багато даних → **Table**
- потрібно відфільтрувати список → **Filter Pattern**
- потрібно пройти послідовність кроків → **Stepper / Wizard**

Головна ідея:

    Повторювана задача
            ↓
    перевірений спосіб її вирішення
            ↓
    Design Pattern
            ↓
    передбачуваний UX
            ↓
    менше когнітивного навантаження

---

# 2. Pattern ≠ Component

Це одна з найважливіших відмінностей.

**Component** — конкретний UI-блок.

**Pattern** — спосіб організації взаємодії.

Наприклад:

    Button
      ↓
    Component

    Modal
      ↓
    Component

А:

    "Користувач виконує небезпечну дію
     → система просить підтвердження
     → користувач підтверджує або скасовує"
      ↓
    Confirmation Pattern

Pattern може складатися з декількох компонентів.

Наприклад:

    Search Pattern
        ↓
    Input
        +
    Search Button
        +
    Loading State
        +
    Results
        +
    Empty State
        +
    Error State

Тому:

    Component = "з чого складається UI"

    Pattern = "як UI вирішує типову задачу"

---

# 3. Навіщо потрібні Design Patterns

Без патернів кожен екран можна проектувати "з нуля".

Це призводить до:

- непослідовного UI;
- різної поведінки однакових елементів;
- зайвого cognitive load;
- складнішого навчання користувача;
- помилок у navigation;
- складнішої розробки;
- складнішого тестування;
- поганої accessibility.

Патерни дозволяють створювати інтерфейс за знайомими для користувача правилами.

    User already knows the pattern
                ↓
    interface behaves predictably
                ↓
    user spends less effort learning UI
                ↓
    better usability

---

# 4. Design Pattern як "мова інтерфейсу"

UI Patterns можна розглядати як своєрідну **мову інтерфейсу**.

Наприклад, користувач уже знає:

    🔍 → Search

    ⋮ → More options

    × → Close

    ☰ → Menu

    ← → Back

    🔽 → Expand / Select

    ✓ → Confirm / Completed

Це не означає, що іконки завжди достатні.

Але повторюваність патернів створює:

**recognition** — користувач упізнає знайому поведінку.

Замість:

    "Що це означає?"

користувач думає:

    "Я вже знаю, як це працює."

---

# 5. Основні групи Design Patterns

Для UI зручно розділяти патерни на групи.

## 5.1. Navigation Patterns

Допомагають користувачеві переміщатися системою.

Приклади:

- Header Navigation
- Sidebar
- Tabs
- Breadcrumbs
- Pagination
- Bottom Navigation
- Navigation Drawer
- Stepper
- Back Navigation

---

## 5.2. Input Patterns

Допомагають вводити або вибирати дані.

Приклади:

- Text Input
- Search
- Select
- Combobox
- Radio Group
- Checkbox Group
- Toggle
- Slider
- Date Picker
- File Upload
- Autocomplete

---

## 5.3. Information Patterns

Допомагають показувати інформацію.

Приклади:

- Card
- Table
- List
- Accordion
- Tooltip
- Popover
- Badge
- Avatar
- Data Visualization

---

## 5.4. Feedback Patterns

Допомагають повідомити користувача про стан системи.

Приклади:

- Toast
- Alert
- Inline Message
- Progress Indicator
- Spinner
- Skeleton
- Success Message
- Error Message
- Empty State

---

## 5.5. Action Patterns

Допомагають виконувати дії.

Приклади:

- Primary Action
- Secondary Action
- Split Button
- Context Menu
- Overflow Menu
- Floating Action Button
- Bulk Actions

---

## 5.6. Overlay Patterns

Показують додатковий UI поверх поточного контенту.

Приклади:

- Modal
- Dialog
- Drawer
- Popover
- Tooltip
- Dropdown Menu
- Bottom Sheet

---

## 5.7. Content Patterns

Допомагають організувати великий обсяг контенту.

Приклади:

- Cards
- Lists
- Tables
- Tabs
- Accordions
- Content Sections
- Expandable Content
- Master-Detail

---

# 6. Navigation Patterns

Navigation відповідає на питання:

> "Де я зараз і куди я можу перейти?"

---

# 7. Header Navigation

Класичне верхнє меню.

Наприклад:

    Logo

    Головна
    Курси
    Завдання
    Профіль

    [Увійти]

Добре підходить для:

- сайтів;
- landing pages;
- dashboards;
- освітніх платформ.

---

# 8. Sidebar Navigation

Бічна навігація.

    ┌──────────────┬─────────────────────┐
    │ Dashboard    │                     │
    │ Courses      │      Content        │
    │ Students     │                     │
    │ Settings     │                     │
    │              │                     │
    └──────────────┴─────────────────────┘

Особливо корисна для:

- admin panels;
- LMS;
- dashboards;
- складних web applications.

---

# 9. Tabs

Tabs використовуються для перемикання між **пов'язаними розділами одного контексту**.

Наприклад:

    [Overview] [Students] [Assignments] [Grades]

Tabs хороші, коли:

- контент належить одному об'єкту;
- користувачеві потрібно швидко перемикатися;
- всі розділи мають однаковий рівень важливості.

Не варто використовувати Tabs як заміну глобальній навігації.

---

# 10. Breadcrumbs

Breadcrumbs показують положення користувача в ієрархії.

Наприклад:

    Головна
      >
    Курси
      >
    Інформатика
      >
    8 клас
      >
    Урок 12

Корисні у:

- великих сайтах;
- документації;
- файлових системах;
- ecommerce;
- LMS.

---

# 11. Pagination

Pagination розбиває великий набір даних на сторінки.

Наприклад:

    ← Previous

    1  2  3  4  5

    Next →

Особливо корисна для:

- таблиць;
- каталогів;
- результатів пошуку;
- списків.

---

# 12. Infinite Scroll

Контент автоматично завантажується при прокручуванні.

Наприклад:

    Items
      ↓
    Items
      ↓
    Items
      ↓
    Loading...
      ↓
    More Items

Добре підходить для:

- social feeds;
- image feeds;
- content discovery.

Але може бути поганим вибором для:

- таблиць;
- задач;
- документації;
- контенту, який потрібно швидко знаходити.

---

# 13. Stepper / Wizard

Stepper показує послідовність кроків.

Наприклад:

    1. Account
       ↓
    2. Profile
       ↓
    3. Preferences
       ↓
    4. Confirmation

Корисний для:

- registration;
- checkout;
- onboarding;
- складних форм;
- налаштування системи.

Головне правило:

> Не використовувати Stepper просто для того, щоб розбити маленьку форму на багато сторінок.

---

# 14. Input Patterns

Input Patterns визначають, **як користувач вводить або вибирає дані**.

---

# 15. Text Input

Для короткого тексту:

    Name
    [________________]

Для:

- імені;
- email;
- username;
- короткої відповіді.

---

# 16. Textarea

Для довгого тексту:

    Description

    ┌─────────────────────────┐
    │                         │
    │                         │
    │                         │
    └─────────────────────────┘

Наприклад:

- коментар;
- опис;
- повідомлення;
- essay.

---

# 17. Select

Коли потрібно вибрати один варіант із списку.

    Country
    [ Ukraine       ▼ ]

Добре підходить для:

- невеликої кількості опцій;
- стандартних виборів;
- компактних форм.

---

# 18. Radio Group

Коли користувач повинен бачити всі доступні варіанти.

    Payment method

    ( ) Card
    ( ) Cash
    ( ) Bank transfer

Radio добре працює, коли:

- варіантів небагато;
- користувачеві важливо порівняти їх.

---

# 19. Checkbox

Для незалежного вибору.

    Select subjects:

    [✓] Mathematics
    [ ] Physics
    [✓] Computer Science

Checkbox означає:

> Цей пункт можна незалежно увімкнути або вимкнути.

---

# 20. Toggle / Switch

Для перемикання конкретного стану.

    Dark mode

    [ ON ]

Добре підходить для:

- settings;
- preferences;
- enable/disable.

Наприклад:

    Notifications
    [ ON ]

    Auto-save
    [ ON ]

---

# 21. Search Pattern

Search — один із найпоширеніших UI patterns.

Типова структура:

    Search Input
          ↓
    User enters query
          ↓
    Loading
          ↓
    Results
          ↓
    Empty / Error

Наприклад:

    🔍 [ Search courses... ]

    Results:

    JavaScript Basics
    React Fundamentals
    TypeScript

---

# 22. Search States

Search повинен мати різні стани.

### Idle

    [ Search courses... ]

### Loading

    [ Searching... ]

### Results

    12 results found

### Empty

    No courses found.

### Error

    Search failed.
    [Try again]

Це приклад:

    Pattern
       ↓
    Component States

---

# 23. Feedback Patterns

Feedback Pattern відповідає на питання:

> "Що сталося після моєї дії?"

---

# 24. Toast

Коротке повідомлення, яке не блокує інтерфейс.

Наприклад:

    ┌─────────────────────────────┐
    │ ✓ Course saved              │
    └─────────────────────────────┘

Добре для:

- save;
- update;
- background actions;
- коротких системних повідомлень.

Не варто використовувати Toast для критично важливої інформації, яку користувач може не побачити.

---

# 25. Alert

Alert — більш помітне повідомлення.

Наприклад:

    ┌──────────────────────────────┐
    │ ⚠ Your session will expire  │
    │   in 5 minutes.              │
    └──────────────────────────────┘

Може використовуватися для:

- warning;
- error;
- important information.

---

# 26. Empty State

Empty State показує, що даних поки немає.

Поганий варіант:

    No data.

Кращий:

    No courses yet.

    Create your first course
    to start teaching.

    [Create Course]

Хороший Empty State пояснює:

1. що сталося;
2. чому це нормально;
3. що користувач може зробити далі.

---

# 27. Error State

Error State повинен не просто повідомляти про помилку.

Погано:

    Error 500.

Краще:

    We couldn't load your courses.

    Please check your connection
    and try again.

    [Try again]

Структура:

    Problem
       ↓
    Explanation
       ↓
    Recovery Action

---

# 28. Loading Pattern

Користувач повинен розуміти, що система працює.

Варіанти:

- spinner;
- skeleton;
- progress bar;
- loading text;
- optimistic UI.

Наприклад:

    Loading...

Або:

    ┌────────────────────────┐
    │ ████████████████       │
    │ ████████               │
    │ ████████████           │
    └────────────────────────┘

---

# 29. Skeleton

Skeleton показує структуру майбутнього контенту.

Наприклад:

    ┌────────────────────────────┐
    │ ███████████████████        │
    │ ██████████                 │
    │ █████████████████          │
    └────────────────────────────┘

Skeleton часто сприймається природніше, ніж порожній екран зі Spinner.

---

# 30. Confirmation Pattern

Використовується для потенційно небезпечних або незворотних дій.

Наприклад:

    Delete course?

    This action cannot be undone.

    [Cancel]  [Delete]

Типовий flow:

    User Action
         ↓
    Confirmation
       ↙   ↘
    Cancel  Confirm
              ↓
           Action
              ↓
           Feedback

---

# 31. Confirmation чи Undo?

Не кожну дію потрібно підтверджувати.

Іноді краще:

    Delete
      ↓
    item disappears
      ↓
    Toast:
    "Course deleted"
      [Undo]

Це може бути швидше, ніж:

    Delete
      ↓
    Are you sure?
      ↓
    Confirm
      ↓
    Delete

Правило:

> Якщо дію легко скасувати — Undo часто кращий за Confirmation Dialog.

---

# 32. Modal / Dialog Pattern

Modal привертає увагу до окремої задачі.

Наприклад:

    ┌─────────────────────────────┐
    │ Create Course          [×]  │
    │                             │
    │ Name                        │
    │ [____________________]      │
    │                             │
    │ Description                 │
    │ [____________________]      │
    │                             │
    │ [Cancel]       [Create]     │
    └─────────────────────────────┘

Modal добре використовувати для:

- confirmation;
- коротких форм;
- focused tasks;
- додаткової інформації.

Не варто перетворювати весь application flow на набір Modal-вікон.

---

# 33. Drawer Pattern

Drawer відкривається збоку.

Наприклад:

    ┌───────────────────┬──────────────┐
    │                   │ Filters      │
    │     Content       │              │
    │                   │ Category     │
    │                   │ [✓] React   │
    │                   │ [ ] Vue     │
    │                   │              │
    └───────────────────┴──────────────┘

Drawer добре працює для:

- filters;
- settings;
- navigation;
- additional details.

---

# 34. Tooltip Pattern

Tooltip показує коротку підказку.

Наприклад:

    [ 🗑 ]

    ↓ hover / focus

    Delete course

Tooltip особливо корисний для:

- незрозумілих icons;
- коротких пояснень;
- secondary information.

Але tooltip не повинен бути єдиним способом доступу до критично важливої інформації.

---

# 35. Popover Pattern

Popover показує додатковий контент біля елемента.

Наприклад:

    [Filter]

          ↓

    ┌──────────────────┐
    │ Category         │
    │ [✓] React        │
    │ [ ] Vue          │
    │ [ ] Angular      │
    └──────────────────┘

Popover складніший за Tooltip і може містити interactive content.

---

# 36. Table Pattern

Table добре підходить для структурованих даних.

Наприклад:

    Student      Course        Status
    -------------------------------------
    Anna         React         Active
    Petro        JavaScript    Active
    Olena        SQL           Pending

Table особливо корисна для:

- admin panels;
- reports;
- grades;
- transactions;
- student lists.

---

# 37. Table + Actions Pattern

Таблиця часто містить actions.

    Student      Status      Actions
    --------------------------------------
    Anna         Active      Edit ⋮
    Petro        Active      Edit ⋮
    Olena        Pending     Edit ⋮

Overflow Menu:

    Edit
    View
    Archive
    Delete

Це допомагає не перевантажувати таблицю десятками кнопок.

---

# 38. Card Pattern

Card групує пов'язані дані.

Наприклад:

    ┌─────────────────────────┐
    │ React Fundamentals      │
    │                         │
    │ Learn React basics      │
    │                         │
    │ 12 lessons              │
    │                         │
    │ [Open Course]           │
    └─────────────────────────┘

Card добре працює для:

- courses;
- products;
- profiles;
- articles;
- projects.

---

# 39. Accordion Pattern

Accordion дозволяє приховувати / показувати додаткову інформацію.

    What is React?                 ▼
    --------------------------------

    How does JSX work?             ▶

    What is state?                 ▶

Корисний для:

- FAQ;
- documentation;
- settings;
- long explanations.

Не варто ховати інформацію, яку користувачеві потрібно постійно порівнювати.

---

# 40. Master-Detail Pattern

Екран розділений на:

    Master              Detail
    ┌─────────────┐     ┌─────────────────┐
    │ Course 1    │     │ Course 1        │
    │ Course 2    │     │                 │
    │ Course 3    │     │ Description     │
    │ Course 4    │     │                 │
    └─────────────┘     └─────────────────┘

Користувач вибирає об'єкт зліва і бачить деталі справа.

Добре для:

- email;
- file managers;
- admin panels;
- educational platforms.

---

# 41. Filter Pattern

Фільтрація допомагає зменшити кількість результатів.

Наприклад:

    Courses

    Category
    [ React ▼ ]

    Level
    [✓ Beginner]
    [ ] Intermediate
    [ ] Advanced

    Results: 12

Хороший Filter Pattern повинен:

- показувати активні filters;
- дозволяти їх видаляти;
- показувати результат;
- мати зрозумілий reset.

---

# 42. Sorting Pattern

Sorting змінює порядок даних.

Наприклад:

    Sort by:
    [Newest ▼]

Або:

    Name ↑
    Name ↓

Важливо показувати:

- за яким полем сортування;
- напрямок сортування;
- поточний стан.

---

# 43. Bulk Actions Pattern

Коли користувач вибирає декілька об'єктів.

    [✓] Student A
    [✓] Student B
    [ ] Student C
    [✓] Student D

Після вибору:

    3 selected

    [Archive] [Delete] [Export]

Це значно швидше за виконання дії над кожним елементом окремо.

---

# 44. Multi-Step Form Pattern

Велика форма може бути поділена на логічні кроки.

    Step 1
    Personal information
         ↓
    Step 2
    Account
         ↓
    Step 3
    Preferences
         ↓
    Step 4
    Confirmation

Перевага:

    менше полів одночасно
           ↓
    менше cognitive load
           ↓
    легше пройти форму

---

# 45. Progressive Disclosure

**Progressive Disclosure** — показувати користувачеві лише ту інформацію, яка потрібна на поточному етапі.

Замість:

    30 налаштувань одразу

показуємо:

    Основні налаштування

    [Advanced settings ▼]

Після відкриття:

    Advanced settings
        ↓
    додаткові параметри

Це один із фундаментальних UX patterns.

---

# 46. Progressive Disclosure ≠ Hiding Information

Мета не в тому, щоб приховати функціональність.

Мета:

    багато інформації
          ↓
    організація
          ↓
    головне видно одразу
          ↓
    другорядне доступне за потреби

---

# 47. Onboarding Pattern

Onboarding допомагає новому користувачеві зрозуміти систему.

Наприклад:

    Welcome!

    Let's set up your account.

    Step 1 of 3

    [Continue]

Або contextual onboarding:

    ┌────────────────────────────┐
    │ Create your first course   │
    │                    [Got it]│
    └────────────────────────────┘

Хороший onboarding:

- короткий;
- корисний;
- пропорційний складності системи;
- не блокує користувача без необхідності.

---

# 48. Empty → First Action Pattern

Особливо важливий для нових користувачів.

Наприклад:

    You don't have any courses yet.

    Create your first course
    to start teaching.

    [Create Course]

Flow:

    Empty State
         ↓
    Explanation
         ↓
    Primary Action
         ↓
    First Success

Це називають також **First-use experience**.

---

# 49. Save Pattern

Користувач змінює дані.

Можливі варіанти:

### Explicit Save

    [Save]

### Auto-save

    Saving...

    Saved ✓

### Save + Navigation

    Unsaved changes.

    [Stay] [Leave]

Вибір залежить від контексту.

---

# 50. Auto-save Pattern

Для редакторів:

    User changes content
            ↓
        Auto-save
            ↓
        Saving...
            ↓
        Saved ✓

Користувач не повинен гадати:

> "Мої зміни збереглися?"

Тому Auto-save обов'язково потребує feedback.

---

# 51. Optimistic UI Pattern

UI може показати результат одразу, не чекаючи сервера.

Наприклад:

    User clicks Like
          ↓
    ❤️ immediately
          ↓
    request → server
          ↓
    success

Якщо запит не вдався:

    ❤️
     ↓
    request failed
     ↓
    revert
     ↓
    error feedback

Optimistic UI створює відчуття швидкого інтерфейсу.

---

# 52. Undo Pattern

Замість confirmation:

    User deletes item
          ↓
    item disappears
          ↓
    Toast
          ↓
    "Item deleted"
          ↓
    [Undo]

Якщо користувач натиснув Undo:

    restore item

Це особливо добре для reversible actions.

---

# 53. Authentication Patterns

Типовий authentication flow:

    Login
      ↓
    Email
      ↓
    Password
      ↓
    Validation
      ↓
    Loading
      ↓
    Success
      ↓
    Dashboard

Потрібні стани:

    idle
    validation error
    loading
    server error
    success

---

# 54. Password Input Pattern

Password field часто має:

    Password
    [••••••••••] 👁

Користувач може:

    Show password
         ↓
    Hide password

Також можуть бути:

- password requirements;
- strength indicator;
- inline validation.

---

# 55. File Upload Pattern

Типовий flow:

    Select file
        ↓
    Upload
        ↓
    Progress
        ↓
    Success / Error

Наприклад:

    lesson.pdf

    Uploading...

    ███████████████░░░ 80%

    Upload complete ✓

Для великих файлів важливо показувати progress.

---

# 56. Drag & Drop Pattern

Наприклад:

    ┌─────────────────────────────┐
    │                             │
    │    Drag files here          │
    │          or                 │
    │      [Choose files]         │
    │                             │
    └─────────────────────────────┘

Потрібні стани:

    idle
      ↓
    drag over
      ↓
    drop
      ↓
    uploading
      ↓
    success / error

---

# 57. Responsive Patterns

Design Pattern повинен враховувати різні screen sizes.

Наприклад:

### Desktop

    Sidebar | Content

### Tablet

    Compact Sidebar | Content

### Mobile

    Header
    Content
    Bottom Navigation

Тобто responsive design — це не просто:

    desktop
       ↓
    shrink everything

А:

    same task
       ↓
    different presentation

---

# 58. Mobile Navigation Pattern

Desktop:

    Sidebar

Mobile:

    ☰ Menu

або:

    ┌─────────────────────┐
    │                     │
    │      Content        │
    │                     │
    ├─────────────────────┤
    │ Home Courses Profile│
    └─────────────────────┘

Потрібно адаптувати **interaction model**, а не тільки розміри.

---

# 59. Pattern States

Будь-який UI Pattern потрібно проектувати не тільки для happy path.

Наприклад:

    Component
       ↓
    Default
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
       ↓
    Empty

Це особливо важливо для:

- forms;
- buttons;
- tables;
- async operations;
- search;
- uploads.

---

# 60. Happy Path ≠ Complete Design

Поганий підхід:

    User enters data
        ↓
    Success

Реальний UI:

    User enters data
        ↓
    valid?
      ↙   ↘
    yes    no
     ↓      ↓
    submit  error
     ↓
    loading
     ↓
    success / server error

Тобто Design Pattern повинен враховувати **реальний interaction flow**.

---

# 61. Pattern + Feedback

Більшість хороших patterns можна описати:

    Affordance
         ↓
    Action
         ↓
    Feedback
         ↓
    Result
         ↓
    Next Action

Наприклад:

    [Save]
       ↓
    click
       ↓
    Saving...
       ↓
    Saved ✓

---

# 62. Pattern + Affordance

Патерн повинен підказувати:

> "Що тут можна зробити?"

Наприклад:

    Button
      ↓
    looks clickable

    Input
      ↓
    looks editable

    Accordion
      ↓
    looks expandable

    Link
      ↓
    looks navigational

Якщо патерн не має достатньої affordance — користувач може не зрозуміти його.

---

# 63. Pattern + Consistency

Одна й та сама задача повинна вирішуватися однаково.

Наприклад:

    Delete Course
    Delete Student
    Delete Assignment

У всіх випадках:

    Delete
       ↓
    Confirmation / Undo
       ↓
    Feedback

Не:

    Course → Modal
    Student → immediate delete
    Assignment → separate page

без UX-причини.

---

# 64. Pattern + Simplicity

Патерн не повинен додавати складність без необхідності.

Наприклад:

    просте питання
        ↓
    ❌ Full-page flow
        ↓
    ❌ Modal
        ↓
    ❌ Accordion
        ↓
    ❌ Tooltip

Можливо достатньо:

    короткого тексту

Правило:

> Використовуй найпростіший патерн, який повністю вирішує задачу.

---

# 65. Pattern Selection

Перед вибором патерну потрібно запитати:

    Що користувач хоче зробити?
            ↓
    Скільки інформації?
            ↓
    Скільки варіантів?
            ↓
    Дія reversible чи irreversible?
            ↓
    Частота використання?
            ↓
    Desktop / mobile?
            ↓
    Який рівень важливості?
            ↓
    Який feedback потрібен?

---

# 66. Приклад вибору Input Pattern

Задача:

> Користувач повинен вибрати рівень курсу.

Варіанти:

    Beginner
    Intermediate
    Advanced

Можливі patterns:

### Select

    Level
    [ Beginner ▼ ]

Добре, якщо важливий компактний UI.

### Radio

    Level

    (•) Beginner
    ( ) Intermediate
    ( ) Advanced

Добре, якщо потрібно бачити всі варіанти.

Отже:

    same data
       ↓
    different patterns
       ↓
    different UX

---

# 67. Приклад вибору Confirmation Pattern

Задача:

> Видалити курс.

Потрібно визначити:

    Чи можна Undo?
        ↓
      yes
        ↓
    Delete + Undo

    no
        ↓
    Confirmation Dialog

Тобто pattern залежить від **ризику дії**.

---

# 68. Pattern не є правилом назавжди

Design Pattern — не закон.

Він залежить від:

- context;
- user;
- device;
- content;
- frequency;
- risk;
- business requirements;
- accessibility.

Наприклад:

    Desktop Dashboard
          ↓
       Sidebar

    Mobile Dashboard
          ↓
    Bottom Navigation

Обидва можуть бути правильними.

---

# 69. Anti-Patterns

**Anti-pattern** — типове рішення, яке часто створює проблеми.

Приклади:

- занадто багато Modals;
- прихована navigation;
- кнопки без зрозумілих labels;
- icon-only controls без пояснення;
- нескінченний Infinite Scroll без альтернативи;
- auto-playing content;
- confirmation для кожної дії;
- Toast для критичних повідомлень;
- величезні dropdown menus;
- форма на 30 полів;
- різна поведінка однакових елементів.

---

# 70. Modal Hell

Поганий flow:

    Page
      ↓
    Modal
      ↓
    Modal
      ↓
    Modal
      ↓
    Modal

Користувач втрачає контекст.

Краще:

    Page
      ↓
    focused task
      ↓
    clear navigation

---

# 71. Mystery Meat Navigation

Це ситуація, коли користувач не розуміє, що означають navigation elements.

Наприклад:

    [◼] [◆] [●] [△]

без labels, tooltip або зрозумілого контексту.

Navigation повинна бути:

- predictable;
- understandable;
- discoverable.

---

# 72. Button Overload

Поганий UI:

    [Save] [Save as] [Apply] [Update] [Confirm]
    [Submit] [Finish] [Continue] [Proceed]

Користувач не розуміє:

> Яку кнопку натискати?

Краще:

    Primary Action
          +
    Secondary Action

Наприклад:

    [Save Changes]    [Cancel]

---

# 73. Pattern Reuse

Якщо в application є:

    Delete Pattern

його потрібно повторно використовувати.

Наприклад:

    Delete Course
    Delete Student
    Delete Assignment
    Delete Lesson

Можна мати один reusable pattern:

    DeleteConfirmation

У frontend:

    <DeleteConfirmation
        itemName="Course"
        onConfirm={handleDelete}
    />

Або концептуально:

    Pattern
       ↓
    reusable component
       ↓
    consistent behavior

---

# 74. Design Pattern у React

Design Pattern часто перетворюється на reusable component.

Наприклад:

    UI Pattern
        ↓
    React Component
        ↓
    Props
        ↓
    reusable behavior

Умовний приклад:

    function EmptyState({
        title,
        description,
        action,
    }) {
        return (
            <section>
                <h2>{title}</h2>
                <p>{description}</p>
                {action}
            </section>
        );
    }

Використання:

    <EmptyState
        title="No courses yet"
        description="Create your first course."
        action={<button>Create Course</button>}
    />

Це вже зв'язок:

    UI Design
       ↓
    Design Pattern
       ↓
    Component Design
       ↓
    React

---

# 75. Pattern як частина Design System

У Design System можна мати:

    Design Tokens
        ↓
    Components
        ↓
    Patterns
        ↓
    Pages

Наприклад:

    Tokens
      ↓
    Button
      ↓
    Form Pattern
      ↓
    Registration Page

Тобто Design System — не тільки набір красивих кнопок.

---

# 76. Pattern Libraries

У професійних командах можуть існувати:

- Pattern Library;
- Component Library;
- Design System;
- UX Guidelines.

Pattern documentation може описувати:

    Pattern Name
        ↓
    Purpose
        ↓
    When to use
        ↓
    When not to use
        ↓
    Anatomy
        ↓
    States
        ↓
    Behavior
        ↓
    Accessibility
        ↓
    Responsive behavior
        ↓
    Examples

---

# 77. Anatomy of a Pattern

Наприклад, Dialog:

    Dialog
      │
      ├── Overlay
      │
      ├── Header
      │     ├── Title
      │     └── Close
      │
      ├── Content
      │
      └── Actions
            ├── Cancel
            └── Confirm

Це допомагає розуміти pattern структурно.

---

# 78. Pattern Behavior

Потрібно описувати не тільки зовнішній вигляд.

Наприклад:

    Modal opens
        ↓
    focus moves into modal
        ↓
    background interaction blocked
        ↓
    Escape closes modal
        ↓
    focus returns to trigger

Це вже **behavior pattern**.

---

# 79. Accessibility у Design Patterns

Патерн повинен бути доступним.

Наприклад:

### Dialog

Потрібні:

- keyboard navigation;
- focus management;
- Escape;
- accessible name;
- screen reader support.

### Tabs

Потрібні:

- keyboard navigation;
- visible focus;
- active state;
- correct semantics.

### Form

Потрібні:

- labels;
- error messages;
- focus states;
- accessible descriptions.

Accessibility — частина pattern, а не "додаткова опція".

---

# 80. Responsive Pattern Thinking

Не запитуй:

> "Як зменшити цей desktop UI?"

Запитуй:

> "Як користувач виконає ту саму задачу на іншому пристрої?"

Наприклад:

    Desktop:
    Sidebar

    Mobile:
    Bottom navigation

Це:

    same goal
        ↓
    different interaction pattern

---

# 81. Content Pattern

Pattern залежить від кількості контенту.

Наприклад:

### 3 options

    Radio Group

### 30 options

    Select / Searchable Select

### 300 options

    Search + filtering

Отже:

    amount of content
          ↓
    appropriate pattern

---

# 82. Frequency Pattern

Частота дії теж впливає на вибір.

Наприклад:

    Frequent action
         ↓
    visible button

    Rare action
         ↓
    Overflow Menu

Тому:

    [Delete]

може бути поганим рішенням, якщо Delete використовується рідко і має високий risk.

Можливо краще:

    ⋮
     ↓
    Delete

---

# 83. Primary vs Secondary Actions

На одному екрані потрібно визначати hierarchy actions.

Наприклад:

    [Create Course]

    [Import]
    [Settings]

Primary:

    Create Course

Secondary:

    Import
    Settings

Це допомагає користувачеві зрозуміти:

> Яка дія тут головна?

---

# 84. Pattern Consistency Matrix

Корисно перевіряти повторювані задачі.

| Задача | Pattern | Behavior |
|---|---|---|
| Delete Course | Confirmation / Undo | Consistent |
| Delete Student | Confirmation / Undo | Consistent |
| Save Form | Save + Feedback | Consistent |
| Search | Search Pattern | Consistent |
| Filters | Filter Pattern | Consistent |
| Navigation | Sidebar / Mobile Nav | Consistent |

Якщо однакова задача має різну поведінку без причини — це сигнал для перегляду дизайну.

---

# 85. Pattern Audit

Під час перевірки UI запитай:

### Navigation

- Чи зрозуміло, де я?
- Чи зрозуміло, куди можна перейти?
- Чи однаково працює navigation?

### Forms

- Чи правильний input pattern?
- Чи зрозумілі labels?
- Чи є validation?
- Чи є loading / error / success?

### Actions

- Чи зрозуміла primary action?
- Чи є unnecessary confirmation?
- Чи можна використати Undo?

### Data

- Чи потрібна Table?
- Чи достатньо Card?
- Чи потрібні filters?
- Чи потрібна pagination?

### Feedback

- Чи зрозуміло, що відбулося?
- Чи бачить користувач loading?
- Чи зрозуміло, як відновитися після error?

---

# 86. Практичний приклад: LMS

Уявімо:

    "Інформатика 8 клас"

Потрібно створити UI для LMS.

### Global Navigation

    Dashboard
    Courses
    Students
    Assignments
    Grades

Pattern:

    Sidebar Navigation

---

### Course Page

    Course
      ↓
    Tabs

    [Overview]
    [Lessons]
    [Students]
    [Grades]

---

### Lesson List

    Lesson 1
    Lesson 2
    Lesson 3

Pattern:

    List

---

### Create Lesson

    Title
    Description
    Materials

Pattern:

    Form

---

### Upload Material

    Drag & Drop

Pattern:

    File Upload

---

### Save

    [Save]

Pattern:

    Explicit Save
       ↓
    Loading
       ↓
    Success Feedback

---

### Delete Lesson

    [Delete]

Pattern:

    Confirmation
    або
    Undo

---

### No Lessons

    No lessons yet.

    [Create Lesson]

Pattern:

    Empty State

---

# 87. Pattern Thinking у реальному проекті

Замість того щоб питати:

> "Який красивий компонент мені зробити?"

потрібно питати:

> "Яку задачу користувача я зараз вирішую?"

Наприклад:

    User needs to find a course
            ↓
    Search Pattern

    User needs to choose level
            ↓
    Select / Radio Pattern

    User needs to delete course
            ↓
    Confirmation / Undo Pattern

    User needs to inspect many students
            ↓
    Table Pattern

    User has no courses
            ↓
    Empty State Pattern

Це значно ближче до реального UX Design.

---

# 88. Pattern → UI → Code

Для frontend developer важливо бачити повний ланцюг:

    User Problem
         ↓
    UX Decision
         ↓
    Design Pattern
         ↓
    UI Components
         ↓
    Component States
         ↓
    React Components
         ↓
    Application Logic
         ↓
    Backend / API

Наприклад:

    "Teacher wants to upload lesson material"
                    ↓
             File Upload Pattern
                    ↓
             Dropzone Component
                    ↓
          idle / dragging / uploading
                    ↓
              React Component
                    ↓
                API request
                    ↓
               success/error

---

# 89. Типові помилки

## 89.1. Використовувати pattern тільки тому, що він модний

Наприклад:

    "Усі використовують cards"

але інформація краще читається як:

    Table

Pattern повинен відповідати задачі.

---

## 89.2. Використовувати Modal для всього

Modal:

- confirmation;
- form;
- details;
- settings;
- help;
- navigation;
- onboarding.

У результаті:

    Modal everywhere

Це створює складний UX.

---

## 89.3. Надмірне використання Dropdown

Dropdown не повинен бути універсальною відповіддю на всі вибори.

Іноді краще:

- Radio;
- Checkbox;
- Tabs;
- Buttons;
- Search.

---

## 89.4. Icon-only UI

Наприклад:

    [💾] [✎] [🗑] [↗]

без labels.

Для знайомих actions це може працювати.

Але для незрозумілих або критичних actions краще:

    [Save]
    [Edit]
    [Delete]

---

## 89.5. Відсутність Empty State

UI проектують тільки для:

    data exists

але забувають:

    no data

У результаті новий користувач бачить порожній екран.

---

## 89.6. Відсутність Error State

Проектують:

    Loading
       ↓
    Success

але не:

    Loading
       ↓
    Error

Реальний UI повинен проектувати обидва сценарії.

---

## 89.7. Неправильна ієрархія

Коли:

    Delete
    Settings
    Create
    Export
    Cancel

усі виглядають однаково.

Користувач не бачить:

    primary
    secondary
    destructive

---

# 90. Як створювати власний Design Pattern

Не потрібно вигадувати pattern без необхідності.

Процес:

    Повторювана проблема
            ↓
    Аналіз user goal
            ↓
    Аналіз context
            ↓
    Пошук existing pattern
            ↓
    Адаптація
            ↓
    Testing
            ↓
    Documentation
            ↓
    Reuse

---

# 91. Pattern Documentation

Для власного pattern можна використовувати такий шаблон:

    # Pattern Name

    ## Purpose

    Для чого потрібен pattern.

    ## When to use

    Коли його використовувати.

    ## When not to use

    Коли краще вибрати інше рішення.

    ## Anatomy

    З яких частин складається.

    ## Behavior

    Як він працює.

    ## States

    Які має стани.

    ## Accessibility

    Які accessibility requirements.

    ## Responsive

    Як поводиться на різних screen sizes.

    ## Examples

    Приклади використання.

---

# 92. Design Patterns і Design Principles

Не плутати:

    Design Principles
          ↓
    загальні правила

    Design Patterns
          ↓
    повторювані рішення

Наприклад:

    Principle:
    Keep interface simple.

          ↓

    Pattern:
    Progressive Disclosure.

---

# 93. Design Patterns і Consistency

Consistency говорить:

> Однакові речі повинні поводитися однаково.

Patterns допомагають цього досягти.

    Pattern
       ↓
    reusable solution
       ↓
    consistent behavior

Тому ці теми тісно пов'язані.

---

# 94. Design Patterns і Affordance

Affordance відповідає:

> Що тут можна зробити?

Pattern відповідає:

> Як ця дія зазвичай організована?

Наприклад:

    Button
       ↓
    "можна натиснути"

    Confirmation Pattern
       ↓
    "після натискання небезпечної дії
     потрібно підтвердити"

---

# 95. Design Patterns і Feedback

Pattern визначає interaction.

Feedback повідомляє результат.

    Pattern
       ↓
    Action
       ↓
    Feedback

Наприклад:

    File Upload
         ↓
    Upload
         ↓
    Progress
         ↓
    Success / Error

---

# 96. Design Patterns і Simplicity

Добрий pattern:

    складна задача
          ↓
    проста взаємодія

Поганий pattern:

    проста задача
          ↓
    складна взаємодія

Тому pattern повинен зменшувати, а не збільшувати cognitive load.

---

# 97. Pattern Selection Cheat Sheet

| Задача | Pattern |
|---|---|
| Глобальна навігація | Header / Sidebar |
| Перемикання розділів | Tabs |
| Ієрархія сторінок | Breadcrumbs |
| Великий список | Pagination / Infinite Scroll |
| Один вибір | Radio / Select |
| Кілька незалежних виборів | Checkbox |
| On / Off | Toggle |
| Пошук | Search |
| Фільтрація | Filter |
| Сортування | Sort |
| Довгий контент | Accordion |
| Додаткові дії | Overflow Menu |
| Коротке повідомлення | Toast |
| Важливе повідомлення | Alert |
| Небезпечна дія | Confirmation / Undo |
| Додаткова задача | Modal / Drawer |
| Відсутність даних | Empty State |
| Завантаження | Spinner / Skeleton |
| Процес із кроками | Stepper |
| Масові дії | Bulk Actions |
| Редагування об'єкта | Form |
| Завантаження файлу | File Upload |
| Багато структурованих даних | Table |
| Вибір об'єкта + деталі | Master-Detail |

---

# 98. Pattern Decision Tree

Умовна схема:

    Що хоче зробити користувач?
             │
      ┌──────┼──────┐
      ↓      ↓      ↓
   Navigate Input  Action
      │      │      │
    Tabs   Radio   Button
    Side   Select  Menu
    Bar    Search  Dialog
      │      │      │
      └──────┼──────┘
             ↓
          Feedback
             │
      ┌──────┼──────┐
      ↓      ↓      ↓
    Loading Success Error
      │      │      │
   Spinner  Toast  Alert

---

# 99. Що потрібно пам'ятати

1. **Design Pattern — це повторюване рішення UI/UX-задачі.**

2. Pattern ≠ Component.

3. Один pattern може складатися з багатьох components.

4. Patterns роблять UI передбачуваним.

5. Patterns зменшують cognitive load.

6. Не потрібно використовувати pattern тільки тому, що він популярний.

7. Завжди починай із user goal.

8. Враховуй context.

9. Враховуй frequency.

10. Враховуй risk.

11. Враховуй кількість даних.

12. Враховуй mobile / desktop.

13. Враховуй accessibility.

14. Проектуй не тільки happy path.

15. Кожен важливий pattern має states.

16. Empty State — теж pattern.

17. Error State — теж pattern.

18. Loading State — теж pattern.

19. Feedback — частина pattern.

20. Consistency робить patterns сильнішими.

21. Не всі дії потребують Confirmation.

22. Для reversible actions часто краще Undo.

23. Progressive Disclosure допомагає керувати складністю.

24. Один pattern можна повторно використовувати у всьому application.

25. Design Pattern може перейти безпосередньо у reusable React component.

---

# 100. Design Patterns для Frontend Developer

Для frontend developer особливо важливо бачити зв'язок:

    UX problem
         ↓
    Design Pattern
         ↓
    UI structure
         ↓
    Component
         ↓
    Props
         ↓
    State
         ↓
    Events
         ↓
    API
         ↓
    Feedback

Наприклад:

    Search
      ↓
    Search Pattern
      ↓
    SearchInput
      ↓
    query state
      ↓
    submit / change
      ↓
    API request
      ↓
    loading
      ↓
    results
      ↓
    empty / error

Це вже безпосередньо перетинається з React.

---

# 101. React-приклад: Search Pattern

Умовна структура:

    Search
    ├── SearchInput
    ├── SearchButton
    ├── LoadingState
    ├── Results
    ├── EmptyState
    └── ErrorState

Стан:

    idle
    loading
    success
    empty
    error

У React це можна мислити так:

    const [status, setStatus] =
        useState("idle");

    const [query, setQuery] =
        useState("");

    const [results, setResults] =
        useState([]);

Це показує важливу ідею:

> UI Pattern часто визначає структуру state machine компонента.

---

# 102. React-приклад: Modal Pattern

Структура:

    Page
      ↓
    Trigger
      ↓
    Modal
      ├── Header
      ├── Content
      └── Actions

State:

    closed
       ↓
    open
       ↓
    submitting
       ↓
    success / error
       ↓
    closed

Тобто Modal — це не просто:

    <div className="modal">

Це interaction pattern.

---

# 103. React-приклад: Empty State

Reusable component:

    function EmptyState({
        title,
        description,
        action,
    }) {
        return (
            <section>
                <h2>{title}</h2>
                <p>{description}</p>
                {action}
            </section>
        );
    }

Тепер pattern можна використовувати повторно:

    Courses → EmptyState

    Lessons → EmptyState

    Students → EmptyState

    Assignments → EmptyState

Це:

    Design Pattern
          ↓
    reusable UI abstraction
          ↓
    consistent application

---

# 104. Pattern Library для твого UI Design курсу

У майбутньому твою папку:

    ui-design/
        01-design-basics/
        02-layout-and-composition/
        03-color/
        04-typography/
        05-components/
        06-component-states/
        07-responsive-design/
        08-design-systems/
        09-forms-and-data-ui/
        10-navigation-and-information-architecture/
        11-ux-and-usability/
        12-visual-details/
        13-accessibility/
        14-modern-ui-patterns/
        15-ui-practice/
        16-ui-design-system-project/

можна сприймати як послідовне формування Design Thinking:

    Design Basics
          ↓
    Layout
          ↓
    Color
          ↓
    Typography
          ↓
    Components
          ↓
    States
          ↓
    Responsive
          ↓
    Design System
          ↓
    Forms / Data UI
          ↓
    Navigation
          ↓
    UX / Usability
          ↓
    Accessibility
          ↓
    Modern Patterns
          ↓
    Practice
          ↓
    Design System Project

---

# 105. Рівні знань

## Core

Потрібно розуміти:

- що таке Design Pattern;
- Pattern vs Component;
- Navigation Patterns;
- Input Patterns;
- Feedback Patterns;
- Modal;
- Toast;
- Tabs;
- Accordion;
- Table;
- Form;
- Empty State;
- Error State;
- Loading State.

---

## Junior

Потрібно вміти:

- вибрати правильний pattern для простої задачі;
- розуміти різницю між Radio / Checkbox / Select;
- розуміти Modal / Drawer / Popover;
- проектувати Empty / Loading / Error states;
- використовувати patterns послідовно;
- розуміти responsive behavior.

---

## Middle

Потрібно вміти:

- аналізувати user flows;
- комбінувати patterns;
- проектувати complex interactions;
- створювати reusable patterns;
- документувати patterns;
- враховувати accessibility;
- враховувати edge cases;
- будувати Pattern Library / Design System.

---

## Senior

Потрібно вміти:

- створювати interaction architecture;
- визначати patterns на рівні продукту;
- створювати Design System;
- визначати правила використання patterns;
- балансувати consistency та context;
- проектувати складні multi-step flows;
- створювати scalable UI architecture;
- узгоджувати UX, design і engineering.

---

# 106. Питання для співбесіди

### Що таке Design Pattern?

Перевірений спосіб вирішення повторюваної UI/UX-задачі.

---

### Чим Pattern відрізняється від Component?

Component — конкретний UI-блок.

Pattern — спосіб організації interaction або вирішення задачі.

---

### Коли використовувати Modal?

Коли потрібно сфокусувати увагу користувача на окремій задачі або підтвердженні.

---

### Modal чи Drawer?

Залежить від context.

Modal більше блокує основний flow.

Drawer дозволяє показати додатковий контент, часто зберігаючи зв'язок із поточним контекстом.

---

### Radio чи Select?

Radio — коли важливо бачити всі варіанти.

Select — коли потрібно зберегти місце або варіантів більше.

---

### Checkbox чи Toggle?

Checkbox — вибір у групі або незалежна опція.

Toggle — перемикання конкретного стану або налаштування.

---

### Toast чи Alert?

Toast — коротке ненав'язливе повідомлення.

Alert — більш помітна інформація, warning або error.

---

### Confirmation чи Undo?

Для irreversible / high-risk action — Confirmation.

Для reversible action часто краще Undo.

---

### Що таке Progressive Disclosure?

Показ потрібної інформації поступово, замість перевантаження користувача всім одразу.

---

### Що таке Empty State?

Стан інтерфейсу, коли очікуваних даних ще немає.

---

### Чому Error State — частина Design Pattern?

Тому що реальна interaction не закінчується лише успішним сценарієм.

---

# 107. Mini Cheat Sheet

    DESIGN PATTERNS
    │
    ├── Navigation
    │   ├── Header
    │   ├── Sidebar
    │   ├── Tabs
    │   ├── Breadcrumbs
    │   ├── Pagination
    │   └── Stepper
    │
    ├── Input
    │   ├── Input
    │   ├── Textarea
    │   ├── Select
    │   ├── Radio
    │   ├── Checkbox
    │   ├── Toggle
    │   └── Search
    │
    ├── Information
    │   ├── Card
    │   ├── List
    │   ├── Table
    │   ├── Accordion
    │   └── Master-Detail
    │
    ├── Feedback
    │   ├── Toast
    │   ├── Alert
    │   ├── Loading
    │   ├── Skeleton
    │   ├── Empty State
    │   └── Error State
    │
    ├── Actions
    │   ├── Primary Action
    │   ├── Secondary Action
    │   ├── Overflow Menu
    │   ├── Bulk Actions
    │   └── Undo
    │
    └── Overlay
        ├── Modal
        ├── Dialog
        ├── Drawer
        ├── Popover
        └── Tooltip

---

# 108. Mental Model

Запам'ятай не список патернів, а логіку:

    USER GOAL
       ↓
    What does the user want to do?
       ↓
    CONTEXT
       ↓
    What information / risk / frequency?
       ↓
    PATTERN
       ↓
    How should this interaction work?
       ↓
    COMPONENTS
       ↓
    What UI elements are needed?
       ↓
    STATES
       ↓
    What happens in every situation?
       ↓
    FEEDBACK
       ↓
    Does the user understand the result?
       ↓
    ACCESSIBILITY
       ↓
    Can everyone use it?
       ↓
    RESPONSIVE
       ↓
    How does it work on different screens?
       ↓
    CONSISTENCY
       ↓
    Does it behave like similar parts of the product?

---

# 109. Головне

**Design Pattern — це не набір готових красивих UI-блоків.**

Це спосіб мислити про повторювані задачі користувача.

Правильний підхід:

    Не:
    "Який компонент тут намалювати?"

    А:
    "Яку задачу вирішує користувач?"

            ↓

    "Який interaction тут потрібен?"

            ↓

    "Який pattern найкраще це вирішує?"

            ↓

    "Які components потрібні?"

            ↓

    "Які states можуть виникнути?"

            ↓

    "Який feedback потрібен?"

            ↓

    "Як це працюватиме на mobile?"

            ↓

    "Чи accessible це рішення?"

            ↓

    "Чи consistent воно з рештою UI?"

Це і є **Pattern Thinking**.

---

# 110. Зв'язок із попередніми темами

Твій блок `01-design-basics` поступово складається в одну систему:

    01 What is UI
          ↓
    02 UI vs UX
          ↓
    03 Visual Hierarchy
          ↓
    04 Design Principles
          ↓
    05 Consistency
          ↓
    06 Simplicity
          ↓
    07 Affordance
          ↓
    08 Feedback
          ↓
    09 Design Patterns
          ↓
    10 Design Basics Project

Особливо важливий ланцюжок:

    Visual Hierarchy
          ↓
    показує, що важливе

    Consistency
          ↓
    робить поведінку передбачуваною

    Simplicity
          ↓
    зменшує складність

    Affordance
          ↓
    показує, що можна зробити

    Feedback
          ↓
    показує, що сталося

    Design Patterns
          ↓
    дають перевірені способи
    організації цих взаємодій

Тому **Design Patterns** — це дуже логічне завершення першого блоку Design Basics.

А наступним кроком після цього вже можна переходити від загальних принципів до більш конкретних UI-інструментів: **Layout → Color → Typography → Components → States → Responsive → Design Systems**.