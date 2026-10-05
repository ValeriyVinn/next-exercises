# 07. Affordance

## Що таке Affordance

**Affordance** — це властивість елемента інтерфейсу, яка підказує користувачу, **як з ним можна взаємодіяти**.

Простіше:

> **Affordance відповідає на питання: "Що я можу зробити з цим елементом?"**

Наприклад:

    [Зберегти]

Користувач бачить кнопку і розуміє:

    це можна натиснути
            ↓
    буде виконана дія


Або:

    ┌─────────────────────────┐
    │ Перетягніть файл сюди   │
    └─────────────────────────┘

Користувач розуміє:

    сюди можна перетягнути файл.


---

# 1. Основна ідея Affordance

У фізичному світі предмети часто самі підказують спосіб використання.

Наприклад:

    дверна ручка
        ↓
    її можна взяти
        ↓
    двері можна відкрити


    кнопка
        ↓
    на неї можна натиснути


    ручка чашки
        ↓
    за неї можна взяти чашку


У UI дизайнери намагаються створити подібні підказки.

Наприклад:

    Button
        ↓
    виглядає як clickable element
        ↓
    користувач очікує click.


---

# 2. Affordance у UI

У цифровому інтерфейсі affordance може підказувати:

- click;
- tap;
- type;
- drag;
- drop;
- scroll;
- swipe;
- expand;
- collapse;
- select;
- toggle;
- resize;
- upload;
- download;
- edit;
- delete.

Наприклад:

    🔍 Search

підказує:

    тут можна шукати.


А:

    ⋮

підказує:

    тут можуть бути додаткові дії.


---

# 3. Affordance ≠ Functionality

Дуже важлива різниця.

**Functionality**:

    елемент реально можна натиснути.


**Affordance**:

    користувач розуміє,
    що елемент можна натиснути.


Можлива ситуація:

    element is clickable
            +
    user doesn't know it
            ↓
    poor affordance


Тобто:

> **Interactive ≠ obvious interactive.**

---

# 4. Signifier

У сучасному UI/UX часто використовують поняття:

**Signifier**

Signifier — це візуальний або текстовий сигнал, який повідомляє користувачу про можливу дію.

Наприклад:

    [Зберегти]


Тут:

    форма кнопки
    + текст
    + hover
    + cursor
    + visual styling

разом повідомляють:

    "це можна натиснути".


Тому корисно розрізняти:

    Affordance
        ↓
    можливість взаємодії

    Signifier
        ↓
    сигнал про цю можливість


Для практичного UI design ці поняття часто розглядають разом.

---

# 5. Physical Affordance vs Digital Affordance

## Physical

    ручка дверей
    → можна потягнути


## Digital

    button
    → можна натиснути


Але цифровий інтерфейс не має фізичних властивостей.

Тому він повинен використовувати:

- форму;
- контраст;
- текст;
- icon;
- position;
- spacing;
- cursor;
- states;
- animation;
- conventions.

щоб створити зрозумілу affordance.

---

# 6. Хороший приклад

    ┌──────────────────────────┐
    │                          │
    │     [ Створити курс ]    │
    │                          │
    └──────────────────────────┘


Користувач бачить:

    прямокутний interactive element
            ↓
    текст описує дію
            ↓
    можна натиснути
            ↓
    створиться курс


Affordance сильна.

---

# 7. Поганий приклад

Наприклад, текст:

    Створити курс


виглядає абсолютно так само, як звичайний текст:

    Ваші курси доступні нижче.


Користувач може не зрозуміти:

    "Створити курс"
            ↓
    це текст?
            ↓
    чи link?
            ↓
    чи button?


Функціонально елемент може бути clickable.

Але affordance слабка.

---

# 8. Affordance і Visual Design

Visual design допомагає повідомити:

    interactive
        vs
    non-interactive


Наприклад:

    звичайний текст

    [Button]

    [Input]

    [Select ▼]

    [Checkbox]


Кожен тип елемента має власну visual language.

Це дозволяє користувачу швидко розпізнавати їх.

---

# 9. Familiar Patterns

Один із найсильніших способів створити affordance:

> **Використовувати знайомі UI patterns.**

Користувач уже знає:

    🔍 → Search

    ⚙ → Settings

    ✕ → Close

    ← → Back

    ⋮ → More

    ▼ → Expand / Select

    ☰ → Menu

    🗑 → Delete


Не потрібно щоразу винаходити нову систему позначень.

---

# 10. Button Affordance

Кнопка повинна виглядати як кнопка.

Наприклад:

    ┌───────────────────┐
    │     Зберегти      │
    └───────────────────┘


Користувач очікує:

    click / tap
        ↓
    action


Важливі характеристики:

- достатній contrast;
- зрозумілий label;
- відповідна форма;
- достатній розмір;
- visual state;
- hover;
- active;
- focus;
- disabled.

---

# 11. Button vs Text

Порівняй:

    Зберегти


і:

    [Зберегти]


Другий варіант набагато сильніше сигналізує:

    "це interactive element".


Але link теж може бути текстом:

    Перейти до курсу


Тут affordance формується через:

- колір;
- underline;
- context;
- hover;
- знайому convention.

---

# 12. Link Affordance

Links повинні виглядати як links.

Наприклад:

    Детальніше


Якщо це link, користувач повинен мати можливість зрозуміти це.

Класичний signifier:

    underline


або інша consistent visual language.

Наприклад:

    Перейти до курсу →


Головне — consistency.

Якщо всі links у системі виглядають однаково, користувач швидко навчається.

---

# 13. Input Affordance

Input повинен показувати:

    сюди можна щось ввести.


Наприклад:

    Email

    ┌──────────────────────────┐
    │ name@example.com         │
    └──────────────────────────┘


Користувач бачить:

    rectangular field
        +
    placeholder
        +
    label
        ↓
    можна вводити текст.


---

# 14. Placeholder ≠ Label

Поширена помилка:

    ┌──────────────────────────┐
    │ Введіть email            │
    └──────────────────────────┘


Placeholder зникає після введення.

Краще:

    Email

    ┌──────────────────────────┐
    │ name@example.com         │
    └──────────────────────────┘


Label залишається видимим.

Це одночасно покращує:

- affordance;
- accessibility;
- usability.


---

# 15. Select Affordance

Select повинен виглядати як control, який можна відкрити.

Наприклад:

    Country

    ┌──────────────────────────┐
    │ Ukraine               ▼  │
    └──────────────────────────┘


Стрілка:

    ▼

є сильним signifier:

    тут є список
        ↓
    його можна відкрити.


---

# 16. Checkbox Affordance

Checkbox має бути схожим на checkbox.

Наприклад:

    ☑ Запам'ятати мене


Користувач розуміє:

    можна поставити / прибрати check.


Не потрібно використовувати абсолютно незнайомий visual pattern без причини.

---

# 17. Toggle Affordance

Toggle зазвичай означає:

    ON / OFF


Наприклад:

    Notifications

    [●────] ON


або:

    Notifications

    [────●] OFF


Користувач повинен розуміти:

    це не button "зберегти",
    а стан, який можна перемикати.


---

# 18. Slider Affordance

Slider повинен виглядати так, щоб було зрозуміло:

    його можна перетягувати.


Наприклад:

    Volume

    ────────●────────


Thumb:

    ●

є signifier для drag interaction.


---

# 19. Drag & Drop Affordance

Якщо елемент можна перетягувати, UI повинен це показувати.

Наприклад:

    ☰ Lesson 1
    ☰ Lesson 2
    ☰ Lesson 3


Або:

    ⋮⋮ Lesson 1
    ⋮⋮ Lesson 2
    ⋮⋮ Lesson 3


Це може сигналізувати:

    drag handle
        ↓
    можна перетягувати.


---

# 20. Cursor як Signifier

На desktop важливу роль відіграє cursor.

Наприклад:

    clickable element
        ↓
    pointer cursor


Але:

> Cursor не повинен бути єдиним signifier.

На touch devices курсора немає.

Тому interactive element повинен бути зрозумілим і без нього.

---

# 21. Hover State

Hover допомагає підтвердити:

    "цей елемент interactive".


Наприклад:

    Normal

    [Зберегти]


    Hover

    [Зберегти]
         ↑
    visual change


Зміна може бути:

- background;
- border;
- shadow;
- underline;
- opacity;
- color.

Але:

> Hover — це enhancement, а не єдиний спосіб показати affordance.

---

# 22. Active State

Користувач натискає кнопку.

UI може показати:

    click
      ↓
    active state
      ↓
    visual feedback


Наприклад:

    [Зберегти]
         ↓
    трохи змінюється під час press.


Це створює відчуття:

    "система отримала мою дію".


---

# 23. Focus State

**Focus** особливо важливий для keyboard users.

Наприклад:

    Email

    ┌──────────────────────────┐
    │ name@example.com         │
    └──────────────────────────┘
            ↑
         focus


Focus повинен бути видимим.

Погано:

    :focus {
        outline: none;
    }


якщо не створено альтернативний focus indicator.

Це може зруйнувати keyboard accessibility.

---

# 24. Disabled State

Disabled element повинен виглядати як недоступний.

Наприклад:

    [Зберегти]


коли форма ще не заповнена:

    [Зберегти]
         ↓
      disabled


Але важливо:

> Disabled state не повинен бути єдиним способом пояснити, чому дія недоступна.

Якщо це можливо, краще пояснити умову.

Наприклад:

    Email
    [____________]

    Password
    [____________]

    [Зберегти]

    Заповніть усі обов'язкові поля.


---

# 25. Affordance і States

Affordance пов'язана зі станами компонента:

    default
       ↓
    hover
       ↓
    active
       ↓
    focus
       ↓
    disabled
       ↓
    loading
       ↓
    success
       ↓
    error


Користувач повинен розуміти не тільки:

    "це кнопка"

але й:

    "що зараз відбувається з цією кнопкою?"


---

# 26. Loading Affordance

Наприклад:

    [Зберегти]


після click:

    [⏳ Зберігаємо...]


Тепер користувач розуміє:

    дія запущена
        ↓
    потрібно зачекати.


Без цього користувач може натиснути кнопку повторно.

---

# 27. Feedback + Affordance

Важлива формула:

    Affordance
        ↓
    "Що я можу зробити?"

    Action
        ↓
    "Я це зробив."

    Feedback
        ↓
    "Ось що сталося."


Наприклад:

    [Видалити]
         ↓
    click
         ↓
    confirmation
         ↓
    "Курс видалено"


---

# 28. Affordance і Feedback — не одне й те саме

**Affordance**:

    підказує можливу дію.


**Feedback**:

    повідомляє результат дії.


Наприклад:

    [Зберегти]

    Affordance:
    → виглядає як button.


    Після click:

    "Збережено ✓"

    Feedback:
    → дія виконана.


---

# 29. Affordance і Discoverability

**Discoverability** — наскільки легко користувач може знайти можливу функцію.

Наприклад:

    [Редагувати]


дуже discoverable.

А:

    текст без visual signal
        ↓
    прихований click handler


дуже погано discoverable.


---

# 30. Hidden Interactions

Поганий приклад:

    Користувач повинен
    натиснути на avatar,
    щоб відкрилося меню.


Але avatar нічим не показує:

    clickable
        +
    menu available.


Користувач може навіть не спробувати.

Краще:

    Avatar ▼


або:

    Avatar
       ↓
    hover
       ↓
    visual feedback


---

# 31. Affordance у Cards

Card може бути:

    informational
    або
    interactive.


Це повинно бути зрозуміло.

## Informational card

    ┌─────────────────────────┐
    │ Progress                │
    │ 72%                     │
    └─────────────────────────┘


## Clickable card

    ┌─────────────────────────┐
    │ JavaScript              │
    │ Progress: 72%           │
    │                         →│
    └─────────────────────────┘


або:

    JavaScript
    [Відкрити]


Не варто робити card clickable, якщо користувач не може цього зрозуміти.

---

# 32. Entire Card Clickable

Іноді вся card є link.

Наприклад:

    ┌──────────────────────────────┐
    │ JavaScript                   │
    │ Frontend fundamentals        │
    │ Progress: 72%                │
    │                              │
    │ → Відкрити курс              │
    └──────────────────────────────┘


Візуально потрібно дати зрозуміти:

    card
       ↓
    interactive.


Наприклад:

- hover;
- cursor;
- arrow;
- button;
- link styling;
- elevation change.

---

# 33. Affordance у Navigation

Navigation elements повинні виглядати як navigation.

Наприклад:

    Home
    Courses
    Students
    Settings


Якщо це links, користувач повинен розуміти:

    click
        ↓
    navigate.


Active page:

    Courses
    ───────


або:

    ● Courses


підказує:

    "ви зараз тут".


---

# 34. Breadcrumb Affordance

Breadcrumb:

    Home
      >
    Courses
      >
    JavaScript


Користувач може зрозуміти:

    Home
    Courses

є clickable navigation levels.

Поточна сторінка:

    JavaScript

може бути представлена як current location, а не link.


---

# 35. Back Button

Кнопка:

    ← Назад


має дуже сильну affordance.

Користувач розуміє:

    повернутися
        ↓
    на попередній рівень.


Не потрібно замінювати її незрозумілою іконкою, якщо context важливий.

---

# 36. Affordance і Icon-only Buttons

Іконка без тексту може бути зрозумілою:

    ✕

    🔍

    ⋮

    🗑


але не завжди.

Наприклад:

    [◎]


може бути незрозумілою.

Якщо action неочевидний, додай:

- tooltip;
- label;
- accessible name;
- text.

Наприклад:

    [🗑 Видалити]


або:

    [🗑]
       ↑
    tooltip:
    "Видалити"


---

# 37. Tooltip

Tooltip може допомогти пояснити незрозумілу icon.

Наприклад:

    [↗]

Hover:

    Відкрити в новому вікні


Але:

> Tooltip не повинен бути єдиним способом зрозуміти критично важливу дію.

---

# 38. Affordance і Mobile

На mobile немає:

    hover
    cursor


Тому affordance повинна бути очевидною без них.

Наприклад:

    [Додати]


краще, ніж:

    ＋


якщо користувачі можуть не знати значення icon.

Або:

    ＋ Додати


дає і icon, і текст.

---

# 39. Touch Target

Interactive element повинен мати достатній touch area.

Наприклад:

    [   Видалити   ]


краще, ніж:

    [×]


де сама зона натискання дуже маленька.

Важливо:

    visual size
        ≠
    hit area


Hit area може бути більшою за саму icon.

---

# 40. Invisible Hit Area

Наприклад:

    [  ⋮  ]


Візуально icon маленька.

Але clickable area може бути:

    ┌───────────┐
    │    ⋮      │
    └───────────┘


Це покращує usability.

---

# 41. Affordance і Spacing

Spacing також може підказувати interaction.

Наприклад:

    Save
    Cancel


Якщо вони стоять дуже близько:

    [Save][Cancel]


користувачу складніше розрізнити їх.

Краще:

    [Save]    [Cancel]


Або:

    [Save]

    Cancel


Простір створює separation між actions.

---

# 42. Grouping Interactive Elements

Наприклад:

    ┌────────────────────────────┐
    │ Course                    │
    │                            │
    │ [Edit] [Delete]            │
    └────────────────────────────┘


Групування сигналізує:

    ці елементи
        ↓
    пов'язані з card.


---

# 43. Affordance і Contrast

Interactive element повинен бути достатньо помітним.

Наприклад:

    важлива CTA
        ↓
    higher visual prominence.


Але contrast не означає:

    зробити все яскравим.


Якщо все prominent:

    nothing is prominent.


Тому:

    hierarchy
        +
    contrast
        +
    consistency


створюють зрозумілу affordance.

---

# 44. Affordance і Typography

Текст теж може сигналізувати interaction.

Наприклад:

    Heading

    Body text

    Link


Link може мати:

    underline
    або
    distinct color
    або
    інший consistent treatment.


Користувач поступово вивчає систему.

---

# 45. Affordance і Motion

Motion може підказувати relationship.

Наприклад:

    ▼
    click
    ↓
    animation
    ↓
    content expands


Користувач бачить:

    element
        ↓
    opens / closes.


Або:

    card
    ↓
    hover
    ↓
    slight elevation


Це може підсилити відчуття:

    "card interactive."


Але motion не повинен бути єдиним signifier.

---

# 46. Affordance у Accordions

Наприклад:

    Frequently Asked Questions

    What is React?                    >

    What is Next.js?                  >

    What is TypeScript?               >


Стрілка:

    >

підказує:

    section can expand.


Після відкриття:

    What is React?                    ↓

    React is a JavaScript library...


---

# 47. Affordance у Modals

Якщо modal можна закрити, користувач очікує:

    ✕


Наприклад:

    ┌─────────────────────────────┐
    │ Edit profile             ✕  │
    │                             │
    │ Name                        │
    │ [______________]            │
    │                             │
    │ [Cancel] [Save]             │
    └─────────────────────────────┘


Є кілька affordances:

    ✕
    → close

    Cancel
    → cancel

    Save
    → save


---

# 48. Affordance у Dropdown Menu

Наприклад:

    More ▼


Після click:

    More ▼

        Edit
        Duplicate
        Delete


Стрілка або інший indicator підказує:

    меню можна відкрити.


---

# 49. Affordance у Tabs

Наприклад:

    [Overview] [Lessons] [Students]


Користувач розуміє:

    tabs
        ↓
    можна перемикати content.


Active state:

    [Overview]


повинен бути візуально відмінним.

---

# 50. Affordance у Search

Пошук:

    🔍 Search...


має очевидну affordance.

Користувач знає:

    type
        ↓
    search.


Якщо search icon тільки декоративна:

    не потрібно робити її clickable.


А якщо icon є button:

    [🔍]


потрібно забезпечити:

- visual affordance;
- accessible name;
- sufficient hit area;
- feedback.

---

# 51. Affordance у Tables

Actions у таблиці:

    ┌───────────────────────────────────┐
    │ Name      Status      Actions     │
    ├───────────────────────────────────┤
    │ Anna      Active      [Edit]       │
    │ Ivan      Active      [Edit]       │
    └───────────────────────────────────┘


Користувач одразу розуміє:

    Edit
      ↓
    action for this row.


---

# 52. Affordance у Drag & Drop Interfaces

Наприклад, Kanban:

    ┌─────────────┐
    │ Todo        │
    │             │
    │ ⋮⋮ Task 1   │
    │ ⋮⋮ Task 2   │
    │ ⋮⋮ Task 3   │
    └─────────────┘


Drag handle:

    ⋮⋮


підказує:

    можна перетягнути.


Після drag:

    placeholder
        ↓
    показує можливе місце drop.


---

# 53. Affordance і Empty State

Навіть empty state повинен показувати можливу дію.

Наприклад:

    У вас ще немає курсів.

    [Створити перший курс]


Тут:

    text
    ↓
    explains state

    button
    ↓
    provides next action.


---

# 54. Affordance і Error State

Error state теж повинен підказувати:

    що робити далі.


Наприклад:

    Не вдалося завантажити курси.

    [Спробувати ще раз]


Користувач отримує:

    problem
       +
    possible action.


---

# 55. Affordance і Destructive Actions

Наприклад:

    [Видалити]


Вигляд повинен відповідати semantic meaning.

Наприклад:

    Delete
       ↓
    destructive styling
       ↓
    confirmation
       ↓
    feedback.


Але не потрібно покладатися лише на червоний колір.

Має бути зрозумілий текст:

    [Видалити курс]


---

# 56. Affordance і Accessibility

Affordance повинна бути доступною не тільки візуально.

Не можна покладатися тільки на:

    color
    hover
    icon
    animation


Потрібні також:

- semantic HTML;
- accessible names;
- keyboard support;
- focus states;
- labels;
- ARIA там, де справді потрібно;
- зрозумілий текст.

---

# 57. Semantic HTML і Affordance

Якщо це button:

    <button>
        Зберегти
    </button>


а не:

    <div onclick="save()">
        Зберегти
    </div>


`button` уже має правильну semantic meaning і keyboard behavior.

Це допомагає і accessibility, і predictable interaction.

---

# 58. React і Affordance

У React важливо правильно вибирати HTML element.

Наприклад:

    function SaveButton() {
        return (
            <button type="button">
                Зберегти
            </button>
        );
    }


Це краще, ніж:

    function SaveButton() {
        return (
            <div onClick={handleSave}>
                Зберегти
            </div>
        );
    }


Другий варіант може виглядати як button, але semantic affordance відсутня.

---

# 59. CSS і Affordance

CSS може підсилити interactive states.

Наприклад:

    .button {
        cursor: pointer;
    }

    .button:hover {
        /* visual feedback */
    }

    .button:focus-visible {
        /* visible focus */
    }

    .button:active {
        /* pressed state */
    }


Але:

> CSS повинен підсилювати semantic HTML, а не замінювати його.

---

# 60. Example — Button component

Простий React component:

    type ButtonProps = {
        children: React.ReactNode;
        variant?: "primary" | "secondary" | "danger";
        disabled?: boolean;
    };

    function Button({
        children,
        variant = "primary",
        disabled = false,
    }: ButtonProps) {
        return (
            <button
                type="button"
                className={`button button--${variant}`}
                disabled={disabled}
            >
                {children}
            </button>
        );
    }


Використання:

    <Button>
        Зберегти
    </Button>

    <Button variant="danger">
        Видалити
    </Button>


Компонент створює consistent affordance.

---

# 61. Consistency і Affordance

Якщо:

    Button
        ↓
    завжди виглядає як button


користувач навчається.

Наприклад:

    Blue filled
    → Primary action

    Outline
    → Secondary action

    Red
    → Destructive action


Це створює predictable UI language.

---

# 62. Affordance і Design System

Design System може стандартизувати:

- Button;
- Link;
- Input;
- Select;
- Checkbox;
- Radio;
- Switch;
- Tabs;
- Accordion;
- Modal;
- Tooltip;
- Dropdown.

Кожен component має:

    anatomy
    +
    variants
    +
    states
    +
    behavior
    +
    accessibility.


Це робить affordance consistent у всьому продукті.

---

# 63. Affordance Audit

Після створення UI можна пройтися по всіх interactive elements.

Для кожного запитай:

    1. Чи це interactive?
    2. Чи зрозуміло, що воно interactive?
    3. Чи зрозуміло, що станеться після click?
    4. Чи зрозуміло, як ним користуватися?
    5. Чи є feedback?
    6. Чи працює keyboard interaction?
    7. Чи зрозуміло на mobile?
    8. Чи відповідає це знайомому pattern?


---

# 64. Affordance Audit Example

Наприклад:

    "⋮"


Питання:

    Що це?
        ↓
    More actions?


Якщо так:

    tooltip:
    "Більше дій"


або:

    [⋮ Більше]


Якщо action критично важливий:

    краще не ховати його за незрозумілою icon.


---

# 65. Before / After

## Before

    JavaScript

    72%

    Continue


Проблема:

    "Continue" виглядає як звичайний текст.


## After

    JavaScript

    Progress: 72%

    [Продовжити]


Тепер:

    Button
      ↓
    clear affordance
      ↓
    obvious action.


---

# 66. Before / After — Icon

## Before

    ⋮


Користувач:

    "Що це?"


## After

    ⋮
    ↑
    tooltip: Більше дій


або:

    [Більше дій]


Особливо для нових користувачів текст може бути кращим.

---

# 67. Before / After — Select

## Before

    Ukraine


Користувач:

    "Це текст чи dropdown?"


## After

    ┌─────────────────────────┐
    │ Ukraine              ▼  │
    └─────────────────────────┘


Тепер interaction очевидніший.

---

# 68. Before / After — Upload

## Before

    Upload


## After

    ┌────────────────────────────────┐
    │                                │
    │      Перетягніть файл сюди     │
    │                                │
    │         або                    │
    │                                │
    │       [Вибрати файл]           │
    │                                │
    └────────────────────────────────┘


Тепер UI пояснює:

    що можна зробити
        +
    як це зробити.


---

# 69. Affordance і User Expectations

Хороший UI створює правильні очікування.

Наприклад:

    Button
       ↓
    click
       ↓
    action


Якщо button:

    click
       ↓
    відкриває нову сторінку


це може бути нормально, якщо це очікувана поведінка.

Але якщо:

    [Зберегти]
        ↓
    відкриває Delete modal


це порушення expectations.

Тому:

> **Affordance повинна відповідати реальній поведінці.**

---

# 70. False Affordance

**False Affordance** — коли елемент виглядає так, ніби його можна використати певним способом, але насправді це не так.

Наприклад:

    ┌────────────────────┐
    │ JavaScript         │
    └────────────────────┘


Card виглядає clickable через:

- hover;
- shadow;
- cursor;
- animation;

але натиснути її не можна.

Це створює confusion.

---

# 71. Misleading Affordance

Ще гірше:

    [Cancel]


але натискання:

    → Delete


Візуальна affordance і semantic meaning суперечать одна одній.

Правило:

> **Visual appearance, label і behavior повинні відповідати одне одному.**

---

# 72. Affordance і Predictability

Зв'язок:

    Affordance
        ↓
    User expectation
        ↓
    Predictability
        ↓
    Confidence
        ↓
    Better UX


Коли користувач розуміє:

    "Якщо я натисну сюди,
     станеться ось це"


інтерфейс стає комфортним.

---

# 73. Affordance і Simplicity

Ці два принципи дуже пов'язані.

    Simplicity
        ↓
    прибирає unnecessary complexity

    Affordance
        ↓
    пояснює available actions


Разом:

    простий UI
        +
    зрозумілі interactive elements
        ↓
    менше cognitive load.


---

# 74. Affordance і Consistency

    Consistency
        ↓
    знайомий visual pattern
        ↓
    user learns once
        ↓
    recognizes everywhere
        ↓
    stronger affordance.


Наприклад:

    усі primary actions
        ↓
    однаковий Button component.


---

# 75. Affordance і Visual Hierarchy

Не всі interactive elements однаково важливі.

Наприклад:

    [Купити]


має бути prominent.

А:

    Скасувати


може бути secondary.

Тому:

    affordance
        +
    hierarchy


показують:

    що можна зробити
        +
    що бажано зробити.


---

# 76. Affordance і Information Architecture

Information Architecture визначає:

    де знаходиться функція.


Affordance визначає:

    як користувач зрозуміє,
    що з нею можна зробити.


Наприклад:

    Settings
        ↓
    Security
        ↓
    Password


Navigation знаходить функцію.

Affordance пояснює controls на сторінці.

---

# 77. Affordance у реальному продукті

Уявімо LMS.

    Dashboard

    JavaScript
    Progress: 72%

    [Продовжити]


    Next lesson

    Arrays

    [Відкрити]


    Recent courses

    React →
    TypeScript →
    Node.js →


Тут:

    [Продовжити]
        → Button affordance

    [Відкрити]
        → Button affordance

    React →
        → Link affordance


Кожна interaction має власний visual language.

---

# 78. Practical UI Exercise

Відкрий будь-який свій mini app і знайди всі interactive elements.

Наприклад:

    Header
        Search
        Navigation
        Profile

    Main
        Cards
        Filters
        Buttons

    Footer
        Links


Для кожного запиши:

    Element
    ↓
    Possible action
    ↓
    Signifier
    ↓
    Feedback


Наприклад:

    Button
        ↓
    Save
        ↓
    filled button
        ↓
    "Saved ✓"


---

# 79. Affordance Exercise

Створи просту сторінку:

    Course

    JavaScript Fundamentals

    Progress: 72%

    [Продовжити]

    Lessons

    Lesson 1
    Lesson 2
    Lesson 3

    [Відкрити всі]


Потім перевір:

    Чи видно, що можна натискати?

    Чи відрізняються links від text?

    Чи зрозуміло, яка кнопка primary?

    Чи зрозуміло, що робить кожна action?

    Чи є hover?

    Чи є focus?

    Чи є disabled state?

    Чи зрозуміло це на mobile?


---

# 80. Practical Exercise — Affordance Review

Візьми свій existing project і зроби список:

    Interactive elements:

    1. Button
    2. Link
    3. Search
    4. Select
    5. Checkbox
    6. Card
    7. Menu
    8. Modal
    9. Tabs
    10. Accordion


Для кожного:

    Is it obvious?
    Is it consistent?
    Is it accessible?
    Is the behavior predictable?


Це дуже хороша практика для frontend developer.

---

# 81. Common Mistakes

## 1. Clickable text without signifier

    JavaScript


виглядає як звичайний текст, але є link.

---

## 2. Everything looks clickable

Якщо:

    heading
    card
    image
    text
    icon
    badge


усі мають hover effect, користувач не розуміє hierarchy.

---

## 3. Icons without meaning

    [◎]
    [◇]
    [◌]


Якщо icon неочевидна, вона створює cognitive load.

---

## 4. Hover-only affordance

На mobile hover немає.

---

## 5. Tiny click targets

Особливо на mobile.

---

## 6. Missing focus state

Keyboard users не бачать, де focus.

---

## 7. Wrong semantic element

`div` замість `button`.

---

## 8. Misleading button labels

    [Continue]

але фактично:

    Delete account


---

## 9. False affordance

Елемент виглядає interactive, але не є interactive.

---

## 10. Inconsistent patterns

    Button A
    → blue filled

    Button B
    → green text

    Button C
    → gray icon

    Button D
    → outlined red


без semantic reason.

---

# 82. Core Level

Потрібно знати:

- що таке Affordance;
- що таке Signifier;
- interactive vs non-interactive;
- button affordance;
- link affordance;
- input affordance;
- hover;
- focus;
- active;
- disabled;
- familiar patterns;
- discoverability;
- feedback;
- consistency.

---

# 83. Junior Level

Потрібно вміти:

- створювати очевидні buttons;
- використовувати semantic HTML;
- розрізняти button і link;
- створювати зрозумілі form controls;
- проектувати hover/focus/active states;
- використовувати consistent components;
- створювати зрозумілі icon buttons;
- враховувати mobile;
- забезпечувати keyboard accessibility.

---

# 84. Middle Level

Потрібно вміти:

- аналізувати affordance всього продукту;
- проектувати component states;
- працювати з design systems;
- проектувати complex interactions;
- балансувати discoverability та visual simplicity;
- визначати false affordances;
- проектувати responsive interactions;
- враховувати різні user types;
- будувати consistent interaction language.

---

# 85. Senior-level Thinking

Senior designer/developer думає:

    "Що користувач очікує побачити?"

    "Що він подумає,
     коли побачить цей елемент?"

    "Чи відповідає visual appearance
     реальній поведінці?"

    "Чи можна зрозуміти interaction
     без hover?"

    "Чи зрозуміло це keyboard user?"

    "Чи відповідає це established pattern?"

    "Чи не створює цей елемент
     false affordance?"

---

# 86. Interview Questions

## Що таке Affordance?

Affordance — властивість елемента, яка підказує користувачу можливу взаємодію з ним.

---

## Що таке Signifier?

Signifier — візуальний або інший сигнал, який повідомляє користувачу про можливу дію.

---

## Яка різниця між Affordance і Feedback?

Affordance:

    "Що я можу зробити?"


Feedback:

    "Що сталося після моєї дії?"


---

## Чому button повинен виглядати як button?

Тому що знайома visual language створює сильну affordance і зменшує cognitive load.

---

## Чи достатньо cursor: pointer?

Ні.

Cursor працює переважно на desktop і не замінює:

- visual design;
- semantic HTML;
- keyboard support;
- focus states;
- accessible labels.

---

## Чому icon-only button може бути проблемою?

Тому що значення icon може бути неочевидним.

Потрібні:

- знайома icon;
- tooltip за потреби;
- accessible name;
- достатній hit area;
- consistent usage.

---

# 87. Frontend Developer Connection

Для frontend developer Affordance означає:

    правильний HTML
        ↓
    правильний component
        ↓
    правильні states
        ↓
    зрозуміла visual language
        ↓
    predictable interaction.


Наприклад:

    <button>
        Зберегти
    </button>


має:

    semantic meaning
    +
    keyboard support
    +
    focus
    +
    hover
    +
    active
    +
    disabled
    +
    loading
    +
    feedback.


Це вже не просто "гарна кнопка".

Це правильно спроектований interactive component.

---

# 88. Mini Cheat Sheet

    AFFORDANCE

    Питання:

    "Як користувач зрозуміє,
     що з цим елементом можна зробити?"


    Основні принципи:

    1. Make interaction visible
    2. Use familiar patterns
    3. Use clear labels
    4. Use semantic HTML
    5. Show interactive states
    6. Provide feedback
    7. Keep patterns consistent
    8. Don't rely only on color
    9. Don't rely only on hover
    10. Support keyboard interaction
    11. Make touch targets large enough
    12. Avoid false affordance
    13. Match appearance with behavior
    14. Make important actions discoverable
    15. Use icons carefully


---

# 89. Mental Model

Запам'ятай:

    Element
        ↓
    What can I do?
        ↓
    Signifier
        ↓
    User understands interaction
        ↓
    Action
        ↓
    Feedback
        ↓
    User understands result


Або ще коротше:

    Affordance
        ↓
    Action
        ↓
    Feedback


---

# 90. Головне

**Affordance — це про зрозумілу можливість взаємодії.**

Користувач не повинен вгадувати:

    "Це кнопка?"

    "Це link?"

    "Це поле?"

    "Це можна перетягнути?"

    "Це меню?"

    "На це можна натиснути?"

Хороший UI відповідає на ці питання ще до того, як користувач починає експериментувати.

Найважливіша послідовність:

    Visual appearance
        ↓
    User expectation
        ↓
    Interaction
        ↓
    Feedback


І головне правило:

> **Якщо елемент можна використати, користувач повинен мати зрозумілий сигнал про те, як ним скористатися.**

А ще важливіше:

> **Візуальний сигнал, назва елемента та його реальна поведінка повинні відповідати одне одному.**

Тобто:

    Button
      ↓
    looks like Button
      ↓
    behaves like Button
      ↓
    gives Button feedback


Саме це створює:

    Predictability
        +
    Discoverability
        +
    Confidence
        ↓
    Better UX.


---

# 91. Зв'язок з попередніми темами

Попередні принципи:

    Visual Hierarchy
        ↓
    показує, що важливо

    Design Principles
        ↓
    задають загальні правила

    Consistency
        ↓
    робить patterns знайомими

    Simplicity
        ↓
    прибирає unnecessary complexity


Тепер:

    Affordance
        ↓
    пояснює,
    як взаємодіяти.


Разом:

    Hierarchy
        +
    Consistency
        +
    Simplicity
        +
    Affordance
        ↓
    Clear UI
        ↓
    Predictable Interaction
        ↓
    Lower Cognitive Load
        ↓
    Better UX