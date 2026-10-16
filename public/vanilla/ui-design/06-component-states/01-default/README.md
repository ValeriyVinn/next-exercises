# 01. Default State

Default state (стан за замовчуванням) — це початковий візуальний стан UI-компонента, який користувач бачить до взаємодії з ним або коли жоден спеціальний стан не активний.

Default state визначає, як компонент виглядає та поводиться у звичайних умовах.

Наприклад, коли користувач відкриває сторінку, кнопка ще не натиснута, поле форми не перебуває у фокусі, а картка не має активного чи вибраного стану.

Default state використовується для:

- визначення початкового вигляду компонентів;
- створення візуальної основи інтерфейсу;
- забезпечення узгодженості між компонентами;
- визначення стандартних кольорів, розмірів, відступів і типографіки;
- створення зрозумілого інтерфейсу до взаємодії користувача;
- забезпечення контрасту між звичайним та інтерактивними станами;
- побудови повної системи component states.

Приклади компонентів у default state:

    button
    input
    checkbox
    select
    card
    navigation link
    tab
    toggle
    dropdown
    icon button

Основні стани UI-компонентів у цьому розділі:

    default
    hover
    focus
    active
    disabled
    loading
    error
    success
    empty

---

## Ключові поняття

✔ component state  
✔ default state  
✔ initial appearance  
✔ initial state  
✔ component behavior  
✔ interactive component  
✔ visual consistency  
✔ design consistency  
✔ component anatomy  
✔ visual hierarchy  
✔ affordance  
✔ feedback  
✔ interaction  
✔ state transition  
✔ design tokens  
✔ component variants  
✔ component properties  
✔ interactive elements  
✔ enabled state  
✔ baseline styling  
✔ visual feedback  
✔ component library  
✔ design system  
✔ CSS pseudo-classes  
✔ semantic HTML  
✔ accessibility  
✔ state coverage  

---

## Що потрібно пам'ятати

• Default state — це стандартний вигляд компонента, коли на нього не впливають інші спеціальні стани.

• Default state є візуальною основою для проєктування решти станів компонента.

• Компонент має бути зрозумілим і читабельним ще до першої взаємодії користувача.

• Default state не означає, що компонент не є інтерактивним.

• Кнопка може бути інтерактивною навіть тоді, коли вона перебуває у звичайному стані.

• Default state не обов'язково означає початковий стан усього застосунку. Наприклад, форма може вже містити завантажені дані, але окреме поле все одно перебуватиме у default state.

• Вигляд default state визначають кольори, типографіка, розміри, відступи, межі, форма, іконки та інші візуальні властивості.

• Інтерактивні компоненти повинні мати достатньо зрозумілий вигляд, щоб користувач міг визначити їхнє призначення.

• Default state має бути узгодженим з іншими компонентами одного інтерфейсу.

• Стани hover, focus, active та disabled повинні відрізнятися від default state там, де це необхідно.

• Default state не повинен покладатися на hover як на єдиний спосіб показати, що елемент інтерактивний, оскільки сенсорні пристрої можуть не мати звичайного наведення курсора.

• Не кожен компонент повинен мати всі можливі стани. Їхній набір залежить від призначення та поведінки компонента.

• Default state у Figma або іншому дизайн-інструменті описує візуальне представлення. У коді початковий вигляд може залежати від HTML, CSS, JavaScript, даних і стану застосунку.

---

# Component State

Component state — це поточний стан UI-компонента, який визначає його вигляд, доступність або поведінку.

Наприклад, кнопка може бути звичайною, наведеною курсором, сфокусованою, натиснутою, заблокованою або перебувати у стані завантаження.

Приклад:

    Button
       │
       ├── Default
       ├── Hover
       ├── Focus
       ├── Active
       ├── Disabled
       └── Loading

Кожен стан повідомляє користувачу певну інформацію про компонент.

Наприклад:

    Default  → кнопка готова до взаємодії
    Hover    → курсор перебуває над кнопкою
    Focus    → кнопка отримала клавіатурний або програмний фокус
    Active   → кнопка перебуває у стані натискання
    Disabled → кнопка тимчасово недоступна
    Loading  → операція виконується

Ці стани не завжди взаємовиключні. Наприклад, компонент може одночасно мати фокус і бути наведений курсором. У дизайн-системі потрібно визначити, як такі комбінації виглядають.

---

# Default State

Default state — стандартний стан компонента, який використовується як базовий варіант для порівняння з іншими станами.

Наприклад, кнопка:

    ┌─────────────────────┐
    │      Continue       │
    └─────────────────────┘

У default state кнопка може мати:

    background color
    text color
    border
    border radius
    padding
    font size
    font weight
    minimum height
    icon
    cursor behavior

Усі ці властивості формують базовий вигляд компонента.

Важливо: конкретні значення залежать від дизайн-системи. Default state не має універсального кольору, розміру чи форми.

---

# Initial State vs Default State

Ці поняття пов'язані, але не тотожні.

## Initial State

Initial state — стан, у якому компонент або застосунок перебуває під час початкової ініціалізації.

Наприклад:

    const [isOpen, setIsOpen] = useState(false);

У цьому прикладі меню спочатку закрите.

    isOpen = false

Це початкове значення стану компонента.

## Default State

Default state — стандартне візуальне представлення компонента, коли не застосовуються інші спеціальні стани.

Наприклад, закрите меню може бути початковим станом застосунку, а кнопка відкриття меню може мати default state.

Отже:

    Initial state → з якого стану починається компонент
    Default state → як виглядає компонент у звичайному стані

У простих компонентах ці поняття можуть збігатися, але вони описують різні аспекти.

---

# Component Anatomy

Component anatomy — структура компонента, тобто його складові частини.

Щоб правильно спроєктувати default state, потрібно розуміти, з яких елементів складається компонент.

Наприклад, button може містити:

    Button
       │
       ├── Leading icon
       ├── Label
       └── Trailing icon

Не всі кнопки повинні мати іконки.

Приклад:

    ┌──────────────────────────┐
    │  →  Save changes         │
    └──────────────────────────┘

Тут:

    →             leading icon
    Save changes   label
    button         interactive container

Default state визначає, як усі ці частини виглядають у звичайних умовах.

Для input компонент може складатися з:

    Input component
       │
       ├── Label
       ├── Input field
       ├── Placeholder
       ├── Leading icon
       ├── Trailing icon
       └── Helper text

Однак label, placeholder та helper text виконують різні функції.

    Label       → називає поле
    Placeholder → підказує формат або приклад введення
    Helper text → пояснює, що потрібно ввести

Placeholder не повинен бути єдиним способом позначення призначення поля.

---

# Visual Properties

Visual properties — візуальні властивості, які визначають вигляд компонента.

Основні властивості:

    color
    background
    border
    border radius
    width
    height
    padding
    margin
    gap
    typography
    icon size
    alignment
    shadow
    opacity

## Color

Колір визначає вигляд тексту, меж, іконок і фону.

Приклад:

    background: #2563EB;
    color: #FFFFFF;

Ці значення можуть використовуватися для звичайної основної кнопки.

Колір має бути узгодженим із палітрою дизайн-системи.

## Background

Background визначає фон компонента.

Приклад:

    background: #FFFFFF;

Для звичайної картки це може бути білий фон.

## Border

Border визначає межу компонента.

Приклад:

    border: 1px solid #D1D5DB;

Межа допомагає відокремити компонент від навколишнього контенту.

## Border Radius

Border radius визначає заокруглення кутів.

    border-radius: 8px;

Значення має відповідати загальній візуальній мові інтерфейсу.

## Padding

Padding — внутрішній відступ між вмістом і межами компонента.

    padding: 12px 16px;

Він допомагає створити достатній простір для тексту та інтерактивної області.

## Typography

Typography визначає візуальні властивості тексту.

    font-family
    font-size
    font-weight
    line-height
    letter-spacing

Наприклад:

    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;

## Icon Size

Розмір іконки має бути узгодженим із розміром тексту та компонента.

Наприклад:

    icon size: 16px
    button height: 44px

Це лише приклад, а не універсальне правило.

## Shadow

Shadow може допомагати відокремлювати компонент від фону.

Однак не кожен компонент потребує тіні.

Тіні потрібно використовувати послідовно, а не додавати їх до всіх елементів без причини.

---

# Button Default State

Button — інтерактивний компонент, який запускає дію.

Приклади:

    Save
    Continue
    Submit
    Cancel
    Create account
    Delete

У default state кнопка повинна мати зрозумілий вигляд і чітко передавати своє призначення.

## Основні властивості

    background
    text color
    border
    border radius
    padding
    typography
    minimum height
    icon
    alignment

## Приклад primary button

    ┌──────────────────────┐
    │       Continue       │
    └──────────────────────┘

Primary button зазвичай використовується для головної дії в певному контексті.

Наприклад:

    Create account
    Save changes
    Continue
    Submit form

Не потрібно використовувати однакову візуальну вагу для всіх кнопок, якщо вони мають різний пріоритет.

## Приклад secondary button

    ┌──────────────────────┐
    │        Cancel        │
    └──────────────────────┘

Secondary button зазвичай має менший візуальний пріоритет.

## Приклад text button

    Learn more →

Text button має мінімальне декоративне оформлення, але все одно повинен бути помітним та інтерактивним.

## Приклад CSS

    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        min-height: 44px;
        padding: 12px 16px;

        border: 1px solid transparent;
        border-radius: 8px;

        background-color: #2563eb;
        color: #ffffff;

        font: inherit;
        font-weight: 600;

        cursor: pointer;
    }

Це базовий приклад default state.

Стани hover, focus, active та disabled потрібно визначати окремо.

---

# Input Default State

Input — компонент для введення даних користувачем.

Приклади:

    email input
    password input
    search input
    text input
    number input

У default state поле зазвичай ще не перебуває у фокусі й не має помилки валідації.

Приклад:

    Email address

    ┌──────────────────────────────┐
    │ name@example.com             │
    └──────────────────────────────┘

Типові властивості:

    background
    text color
    border
    border radius
    padding
    font size
    minimum height

Приклад CSS:

    .input {
        width: 100%;
        min-height: 44px;
        padding: 12px;

        border: 1px solid #d1d5db;
        border-radius: 8px;

        background-color: #ffffff;
        color: #111827;

        font: inherit;
    }

Важливо:

• Label має залишатися зрозумілим незалежно від placeholder.

• Поле повинно мати достатній контраст із фоном.

• Текст усередині поля має бути читабельним.

• Default state не повинен візуально нагадувати disabled state.

• Якщо поле обов'язкове, це потрібно позначити зрозумілим способом.

---

# Card Default State

Card — контейнер для групування пов'язаного контенту.

Картка може містити:

    image
    title
    description
    metadata
    price
    button
    link

Приклад:

    ┌─────────────────────────────┐
    │                             │
    │           Image             │
    │                             │
    ├─────────────────────────────┤
    │ Course title                │
    │                             │
    │ Short course description   │
    │                             │
    │             View course →   │
    └─────────────────────────────┘

У default state картка має показувати інформацію без додаткових візуальних ефектів, пов'язаних із наведенням або вибором.

Типові властивості:

    background
    border
    border radius
    padding
    image ratio
    typography
    content spacing
    shadow

Не кожна картка повинна бути інтерактивною.

Якщо картка клікабельна, це має бути зрозуміло з її оформлення, структури та поведінки.

Не потрібно додавати cursor: pointer до звичайної інформаційної картки, яка не реагує на натискання.

---

# Navigation Link Default State

Navigation link — посилання для переходу на іншу сторінку або до іншого розділу.

Приклади:

    Home
    Courses
    About
    Contacts

У default state посилання має бути читабельним і відрізнятися від звичайного тексту настільки, щоб користувач розумів його призначення.

Приклад HTML:

    <nav aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/courses">Courses</a>
        <a href="/about">About</a>
    </nav>

Приклад CSS:

    nav a {
        color: #1d4ed8;
        text-decoration: underline;
        text-underline-offset: 3px;
    }

Це один із можливих підходів.

В інших дизайн-системах посилання можуть не мати постійного підкреслення, якщо їхня інтерактивність зрозуміла з контексту та оформлення.

Важливо не покладатися лише на колір для розрізнення посилань і звичайного тексту.

---

# Checkbox Default State

Checkbox — компонент для незалежного вибору одного або кількох параметрів.

Приклад:

    ☐ Receive notifications

У default state checkbox зазвичай не вибраний і не вимкнений.

Проте default state не обов'язково означає unchecked.

Якщо користувач уже зберіг налаштування, checkbox може бути позначений, але залишатися активним.

Типові стани checkbox:

    unchecked
    checked
    indeterminate
    disabled

Ці стани описують різні аспекти поведінки компонента.

Default state для checkbox потрібно визначати з урахуванням контексту.

---

# Select Default State

Select — компонент для вибору одного значення зі списку.

Приклад:

    Choose a country

    ┌──────────────────────────────┐
    │ Select country            ▾  │
    └──────────────────────────────┘

У початковому стані може відображатися:

    placeholder
    default selected option
    previously selected value

Це залежить від призначення форми.

Важливо розрізняти:

    Closed select → список закритий
    Open select   → список відкритий
    Selected      → значення вибране

Закритий список не обов'язково є default state, якщо компонент уже має вибране значення.

---

# Tabs Default State

Tabs — компонент для перемикання між пов'язаними розділами контенту.

Приклад:

    ┌──────────┬──────────┬──────────┐
    │ Overview │ Lessons  │ Reviews  │
    └──────────┴──────────┴──────────┘

У tabs важливо розрізняти:

    selected tab
    unselected tab
    focused tab
    hovered tab
    active tab

Default appearance може включати як вибрану вкладку, так і невибрані вкладки.

Наприклад, Overview може бути вибраною вкладкою під час відкриття сторінки.

Це не означає, що всі вкладки перебувають у selected state.

Для проєктування tabs потрібно визначити:

• Яка вкладка вибрана спочатку.

• Як позначається вибрана вкладка.

• Як відрізняється невибрана вкладка.

• Як користувач перемикає вкладки.

• Як працює клавіатурна навігація.

---

# Toggle Default State

Toggle — компонент для перемикання між двома станами, наприклад увімкнено та вимкнено.

Приклад:

    Email notifications     ○────

У toggle потрібно розрізняти:

    off
    on
    disabled
    focused

Default state залежить від початкового значення налаштування.

Наприклад, якщо сповіщення вимкнені, toggle може починати з off.

Якщо налаштування збережене як увімкнене, компонент може починати з on.

Отже, default visual styling та initial value — різні характеристики.

---

# Default State and Affordance

Affordance — властивість або візуальна ознака, яка допомагає користувачу зрозуміти, як взаємодіяти з елементом.

Наприклад:

    Button         → виглядає як елемент для натискання
    Text field     → виглядає як поле введення
    Link           → виглядає як посилання
    Checkbox       → виглядає як елемент вибору
    Slider         → виглядає як елемент для зміни значення

Default state відіграє важливу роль у передачі affordance.

Якщо кнопка виглядає як звичайний текст, користувачеві може бути складніше зрозуміти, що її можна натиснути.

Якщо звичайний текст надмірно стилізований як кнопка, користувач може очікувати від нього інтерактивності.

Тому візуальне оформлення має відповідати фактичній поведінці елемента.

Важливо:

• Інтерактивність не повинна залежати тільки від тіні чи кольору.

• Семантика HTML має відповідати призначенню компонента.

• Зовнішній вигляд повинен бути послідовним у межах застосунку.

• Компонент має передбачувано реагувати на взаємодію.

---

# Default State and Visual Hierarchy

Visual hierarchy — візуальна ієрархія, яка допомагає користувачу визначати важливість елементів.

У default state ієрархія формується за допомогою:

    color
    contrast
    size
    typography
    spacing
    position
    alignment
    visual weight

Наприклад, у формі реєстрації:

    Create account

    Email
    [____________________]

    Password
    [____________________]

    [ Create account ]

    Already have an account? Sign in

Основна кнопка може мати виразніший фон, ніж другорядне посилання.

Це допомагає спрямувати увагу користувача до головної дії.

Однак не потрібно робити всі елементи максимально контрастними.

Якщо всі компоненти мають однакову візуальну вагу, інтерфейс втрачає чітку ієрархію.

---

# Default State and Design Tokens

Design tokens — повторно використовувані значення дизайну, які забезпечують узгодженість компонентів.

Наприклад:

    color-primary
    color-text
    color-border
    color-surface
    radius-small
    radius-medium
    spacing-small
    spacing-medium
    font-size-body
    font-weight-semibold

У CSS tokens часто реалізують за допомогою custom properties.

Приклад:

    :root {
        --color-primary: #2563eb;
        --color-text: #111827;
        --color-border: #d1d5db;
        --color-surface: #ffffff;

        --radius-medium: 8px;

        --spacing-small: 8px;
        --spacing-medium: 16px;

        --font-size-body: 16px;
        --font-weight-semibold: 600;
    }

Використання:

    .button {
        padding: 12px var(--spacing-medium);

        border: 1px solid transparent;
        border-radius: var(--radius-medium);

        background-color: var(--color-primary);
        color: var(--color-surface);

        font-size: var(--font-size-body);
        font-weight: var(--font-weight-semibold);
    }

Переваги:

• Компоненти використовують узгоджені значення.

• Зміна токена може оновити багато компонентів.

• Легше підтримувати дизайн-систему.

• Менше випадкових відмінностей між компонентами.

• Простіше створювати теми та варіанти оформлення.

---

# Default State and Component Variants

Component variant — варіант компонента, який має інше призначення або візуальне оформлення.

Наприклад, button може мати варіанти:

    primary
    secondary
    tertiary
    destructive
    icon-only

Ці варіанти не слід плутати зі станами компонента.

    Variant → тип або призначення компонента
    State   → поточний стан компонента

Наприклад:

    Primary button + default state
    Primary button + hover state
    Primary button + disabled state

    Secondary button + default state
    Secondary button + hover state
    Secondary button + disabled state

Кожен variant може мати власні візуальні властивості, але використовувати спільні принципи поведінки.

У Figma це часто реалізується за допомогою component properties та variants.

У React подібна структура може реалізовуватися через props.

Приклад:

    type ButtonProps = {
        variant?: "primary" | "secondary";
        children: React.ReactNode;
    };

    function Button({
        variant = "primary",
        children
    }: ButtonProps) {
        return (
            <button className={`button button--${variant}`}>
                {children}
            </button>
        );
    }

Тут:

    variant → визначає різновид кнопки
    children → визначає вміст кнопки

Цей приклад демонструє варіанти компонента, а не повну реалізацію його станів.

---

# Default State in CSS

У CSS звичайні стилі компонента зазвичай визначають базовий вигляд.

Приклад:

    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;

        min-height: 44px;
        padding: 12px 16px;

        border: 1px solid transparent;
        border-radius: 8px;

        background-color: #2563eb;
        color: #ffffff;

        font: inherit;
        font-weight: 600;

        cursor: pointer;
    }

Це базові стилі кнопки.

Спеціальні стани можна описати окремо:

    .button:hover {
        background-color: #1d4ed8;
    }

    .button:focus-visible {
        outline: 3px solid #93c5fd;
        outline-offset: 2px;
    }

    .button:active {
        background-color: #1e40af;
    }

    .button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

У цьому прикладі:

    .button              → default styling
    .button:hover        → hover state
    .button:focus-visible → keyboard-visible focus styling
    .button:active       → active state
    .button:disabled     → disabled state

Для реального проєкту потрібно перевірити контраст, видимість focus indicator і узгодженість станів.

Не варто автоматично використовувати opacity для всіх disabled-компонентів: це може погіршити читабельність.

---

# Default State in HTML

HTML визначає семантику компонента та його базову поведінку.

Наприклад, справжню кнопку потрібно реалізовувати через button:

    <button type="button">
        Continue
    </button>

Для посилання використовується a:

    <a href="/courses">
        View courses
    </a>

Для введення тексту використовується input:

    <label for="email">
        Email address
    </label>

    <input
        id="email"
        name="email"
        type="email"
        autocomplete="email"
    />

Важливо:

• Використовуй button для дій.

• Використовуй a для навігації.

• Використовуй label для позначення полів введення.

• Не замінюй інтерактивні HTML-елементи звичайними div без необхідності.

• Семантичні HTML-елементи забезпечують очікувану поведінку та допомагають доступності.

Default state не потрібно створювати окремою JavaScript-логікою, якщо базових HTML і CSS достатньо.

---

# Default State in React

У React default appearance часто визначається JSX, CSS і props компонента.

Приклад:

    type ButtonProps = {
        children: React.ReactNode;
    };

    function Button({ children }: ButtonProps) {
        return (
            <button className="button" type="button">
                {children}
            </button>
        );
    }

Використання:

    <Button>
        Save changes
    </Button>

Компонент відображається з базовими стилями.

Якщо компонент не потребує складної логіки стану, немає необхідності додавати useState тільки для того, щоб показати його default state.

Для інтерактивної логіки React state використовується тоді, коли потрібно відстежувати та змінювати стан компонента.

Наприклад:

    const [isOpen, setIsOpen] = useState(false);

Це може визначати, чи відкрите меню.

Однак стан відкриття меню — це логічний стан компонента, а не просто його візуальне оформлення.

---

# Default State and Accessibility

Accessibility — здатність інтерфейсу бути доступним для людей із різними можливостями та способами взаємодії.

Default state має враховувати:

    readable text
    sufficient contrast
    clear labels
    semantic HTML
    understandable controls
    visible interactive affordances
    keyboard accessibility
    consistent behavior

## Contrast

Текст і важливі візуальні елементи повинні мати достатній контраст.

Для звичайного тексту WCAG зазвичай вимагає контрастне співвідношення щонайменше 4.5:1.

Для великого тексту — щонайменше 3:1.

Для важливих візуальних ознак компонентів інтерфейсу, необхідних для розуміння елемента або його стану, за відповідних критеріїв WCAG 2.2 застосовується вимога 3:1 щодо контрасту з прилеглими кольорами.

Конкретний критерій залежить від типу елемента та ситуації.

## Focus

Навіть якщо default state не має видимого focus indicator, клавіатурний фокус повинен мати чітке візуальне позначення під час взаємодії.

Не потрібно видаляти outline без створення доступної альтернативи.

## Labels

Поля форми повинні мати зрозумілі назви.

Placeholder не є повноцінною заміною label.

## Color

Не використовуй лише колір для передавання важливої інформації.

Наприклад, посилання можна додатково позначати підкресленням.

---

# Default State vs Other States

| State | Призначення |
|---|---|
| Default | Звичайний вигляд компонента |
| Hover | Реакція на наведення вказівника |
| Focus | Компонент отримав фокус |
| Active | Компонент перебуває у стані натискання або активації |
| Disabled | Компонент недоступний для взаємодії |
| Loading | Виконується операція |
| Error | Потрібно повідомити про помилку |
| Success | Потрібно повідомити про успішний результат |
| Empty | Немає даних або вмісту для відображення |

Ці стани не завжди взаємовиключні.

Наприклад:

    Input + focus
    Input + error
    Button + loading
    Tab + focus + selected

Дизайн-система повинна визначати, як компоненти виглядають у важливих комбінаціях станів.

---

# State Transition

State transition — перехід компонента з одного стану в інший.

Наприклад, звичайна кнопка може змінюватися під час наведення курсора.

    Default
       ↓ hover
    Hover
       ↓ pointer down
    Active
       ↓ pointer up
    Default

Інший приклад:

    Default
       ↓ user submits form
    Loading
       ↓ request succeeds
    Success

Або:

    Default
       ↓ user submits form
    Loading
       ↓ request fails
    Error

Це спрощені приклади.

Реальні переходи залежать від поведінки компонента, взаємодії користувача та результатів операцій.

Важливо розрізняти:

    Visual state → як виглядає компонент
    Application state → які дані або логічний стан зберігає застосунок

Вони пов'язані, але не тотожні.

---

# State Coverage

State coverage — перевірка того, чи визначені та перевірені важливі стани компонента.

Наприклад, для кнопки:

    [x] Default
    [x] Hover
    [x] Focus
    [x] Active
    [x] Disabled
    [x] Loading

Для поля форми:

    [x] Default
    [x] Focus
    [x] Filled
    [x] Disabled
    [x] Error
    [x] Success

Ці списки є прикладами, а не універсальними вимогами до кожного компонента.

Під час перевірки потрібно запитати:

• Як виглядає компонент у звичайному стані?

• Чи зрозуміло, що він робить?

• Чи можна розпізнати його призначення без взаємодії?

• Чи не нагадує він disabled-компонент?

• Чи достатній контраст тексту та фону?

• Чи є необхідні відступи?

• Чи відповідає вигляд дизайн-системі?

• Чи зрозуміло, які стани доступні компоненту?

• Чи узгоджений default state з hover, focus та disabled?

---

# Practical Examples

## Приклад 1 — базова кнопка

    <button class="button" type="button">
        Save
    </button>

    .button {
        padding: 12px 16px;
        border: none;
        border-radius: 8px;

        background: #2563eb;
        color: #ffffff;

        font: inherit;
        font-weight: 600;
        cursor: pointer;
    }

Default state визначається базовим правилом `.button`.

---

## Приклад 2 — поле введення

    <label for="username">
        Username
    </label>

    <input
        id="username"
        name="username"
        type="text"
        placeholder="Enter username"
    />

    input {
        width: 100%;
        min-height: 44px;
        padding: 12px;

        border: 1px solid #d1d5db;
        border-radius: 8px;

        background: #ffffff;
        color: #111827;

        font: inherit;
    }

Поле має базовий вигляд до фокусу та введення даних.

---

## Приклад 3 — картка курсу

    <article class="course-card">
        <h2>JavaScript Basics</h2>

        <p>
            Learn the fundamentals of JavaScript.
        </p>

        <a href="/courses/javascript">
            View course
        </a>
    </article>

    .course-card {
        padding: 24px;

        border: 1px solid #e5e7eb;
        border-radius: 12px;

        background: #ffffff;
        color: #111827;
    }

Default state картки не потребує hover-ефекту, якщо картка сама по собі не є інтерактивною.

---

## Приклад 4 — checkbox

    <label>
        <input
            type="checkbox"
            name="notifications"
        />

        Receive notifications
    </label>

Браузер надає checkbox базову поведінку та стандартне оформлення.

Якщо потрібно створити власний дизайн, важливо не втратити клавіатурну доступність, семантику та видимий стан вибору.

---

## Приклад 5 — посилання навігації

    <nav aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/courses">Courses</a>
        <a href="/contacts">Contacts</a>
    </nav>

Default state посилань має забезпечувати читабельність і розпізнавання навігації.

---

## Приклад 6 — кнопка з design tokens

    :root {
        --color-primary: #2563eb;
        --color-on-primary: #ffffff;
        --radius-button: 8px;
        --spacing-button-x: 16px;
        --spacing-button-y: 12px;
    }

    .button {
        padding:
            var(--spacing-button-y)
            var(--spacing-button-x);

        border: none;
        border-radius: var(--radius-button);

        background: var(--color-primary);
        color: var(--color-on-primary);

        font: inherit;
        cursor: pointer;
    }

Цей підхід полегшує підтримку однакового default state у багатьох компонентах.

---

# Типові помилки

❌ Вважати, що default state означає повну відсутність взаємодії.

Default state — звичайний вигляд компонента, який може залишатися інтерактивним.

---

❌ Вважати, що default state завжди означає початковий стан застосунку.

Компонент може відображатися у звичайному візуальному стані навіть тоді, коли застосунок уже працює з даними.

---

❌ Плутати variant та state.

    Variant → primary, secondary, destructive
    State   → default, hover, focus, disabled

---

❌ Робити всі кнопки однаково помітними.

Це послаблює візуальну ієрархію та ускладнює визначення головної дії.

---

❌ Робити інтерактивний компонент схожим на звичайний текст.

Користувачеві буде складніше зрозуміти, що елемент можна натиснути.

---

❌ Використовувати занадто багато декоративних ефектів.

Надмірні тіні, градієнти, межі та інші ефекти можуть погіршувати читабельність і послідовність інтерфейсу.

---

❌ Ігнорувати контраст.

Навіть гарний компонент може бути складним для сприйняття, якщо текст і фон мають недостатній контраст.

---

❌ Покладатися лише на placeholder.

Placeholder не замінює повноцінного label для поля введення.

---

❌ Використовувати колір як єдиний спосіб показати інтерактивність.

У деяких ситуаціях потрібні додаткові ознаки, наприклад підкреслення посилання або видимий індикатор фокусу.

---

❌ Вважати, що кожен компонент повинен мати всі можливі стани.

Набір станів визначається призначенням компонента.

---

❌ Створювати різний default state для однакових компонентів без причини.

Це знижує візуальну узгодженість дизайн-системи.

---

❌ Використовувати disabled styling для звичайного компонента.

Якщо кнопка доступна для взаємодії, вона не повинна виглядати вимкненою.

---

❌ Додавати `cursor: pointer` до всіх елементів.

Це правило доцільне для відповідних інтерактивних елементів, а не для кожного контейнера.

---

❌ Видаляти outline без доступної альтернативи.

Користувачі клавіатури повинні бачити, який елемент має фокус.

---

❌ Додавати JavaScript там, де достатньо HTML і CSS.

Default state часто не потребує окремої логіки.

---

# Питання для самоперевірки та співбесіди

Що таке component state?

Що таке default state?

Чим default state відрізняється від initial state?

Чому default state є основою для проєктування інших станів?

Які візуальні властивості визначають default state?

Що таке component anatomy?

Що таке affordance?

Як default state допомагає користувачу зрозуміти призначення компонента?

Що таке visual hierarchy?

Як візуальна ієрархія впливає на вибір кнопок?

Яка різниця між primary та secondary button?

Які властивості зазвичай має button у default state?

Які властивості зазвичай має input у default state?

Чому placeholder не замінює label?

Чим відрізняється інтерактивна картка від інформаційної?

Що таке design tokens?

Як design tokens допомагають підтримувати узгодженість компонентів?

Що таке component variant?

Чим variant відрізняється від state?

Як CSS описує default state?

Як CSS pseudo-classes використовуються для інших станів?

Чому не потрібно використовувати JavaScript для кожного візуального стану?

Що таке state transition?

Що таке state coverage?

Чому важливо перевіряти компоненти в різних станах?

Які вимоги доступності важливі для default state?

Чому не можна покладатися лише на колір?

Чому важливо зберігати видимий focus indicator?

Чи повинні всі компоненти мати однаковий набір станів?

Як перевірити, що default state узгоджується з дизайн-системою?

---

# Шлях вивчення

## 🟢 Core — обов'язково знати

Що таке UI component.

Що таке component state.

Що таке default state.

Різниця між default state та initial state.

Основні візуальні властивості компонента.

Component anatomy.

Основи affordance.

Основи visual hierarchy.

Default state кнопки.

Default state поля введення.

Default state посилання.

Default state картки.

Розуміння інтерактивних та неінтерактивних компонентів.

Базові HTML-елементи:

    button
    a
    input
    label
    select

Основи CSS для оформлення компонентів.

Базове розуміння hover, focus, active та disabled.

Основи контрасту та читабельності.

---

## 🔵 Junior — практичне застосування

Проєктування default state для різних компонентів.

Узгодженість компонентів одного інтерфейсу.

Використання design tokens.

Розуміння component variants.

Розрізнення variant та state.

Створення повторно використовуваних компонентів.

Базова реалізація компонентів у React.

Використання props для налаштування компонентів.

Розуміння HTML-семантики.

Визначення необхідних станів компонента.

Перевірка default state на різних фонах.

Перевірка читабельності та контрасту.

Розуміння state transitions.

Основи state coverage.

Розуміння доступності інтерактивних елементів.

---

## 🟠 Middle — системний підхід

Проєктування узгодженої системи компонентів.

Визначення правил default state для кожного типу компонента.

Створення component variants.

Організація design tokens.

Побудова component API.

Розділення візуальних властивостей і бізнес-логіки.

Узгодження Figma components та React components.

Проєктування комбінацій станів.

Визначення пріоритетів візуальних станів.

Документування компонентів.

Перевірка state coverage.

Автоматизоване тестування важливих станів.

Розуміння accessibility requirements.

Підтримка дизайн-системи під час розвитку застосунку.

---

## 🔴 Senior — системне проєктування

Архітектура масштабованих дизайн-систем.

Управління токенами та семантичними кольорами.

Проєктування складних component APIs.

Стратегія сумісності компонентів.

Керування варіантами та комбінаціями станів.

Стандартизація візуальної поведінки.

Управління темами та адаптаціями компонентів.

Системний аудит доступності.

Автоматизація перевірок станів.

Документування компонентів і правил їх використання.

Управління змінами дизайн-системи.

Баланс між гнучкістю компонентів і складністю API.

---

# Практичне завдання

Мета — створити невелику колекцію компонентів із продуманим default state.

## Завдання 1 — Button

Створи три варіанти кнопки:

    Primary
    Secondary
    Destructive

Для кожної визнач:

    background
    text color
    border
    border radius
    padding
    typography
    minimum height

Переконайся, що основна дія візуально відрізняється від другорядної.

## Завдання 2 — Input

Створи поле введення email.

Додай:

    label
    input
    placeholder
    helper text

Визнач базові кольори, межі, типографіку та відступи.

## Завдання 3 — Card

Створи картку курсу з такими елементами:

    image
    title
    description
    metadata
    link

Перевір, чи зрозуміла структура картки та чи не конкурують елементи за увагу.

## Завдання 4 — Navigation

Створи просту навігацію:

    Home
    Courses
    About
    Contacts

Переконайся, що посилання легко розпізнати та прочитати.

## Завдання 5 — Component consistency

Порівняй створені компоненти.

Перевір:

    typography
    color palette
    border radius
    spacing
    alignment
    contrast
    visual hierarchy

Знайди та виправ випадкові відмінності.

## Завдання 6 — Default state inventory

Створи таблицю компонентів:

    Button
    Input
    Checkbox
    Select
    Card
    Link
    Tabs
    Toggle

Для кожного компонента опиши:

    purpose
    default appearance
    visual properties
    interactive behavior
    relevant states

Ця таблиця стане основою для наступних тем розділу `06-component-states`.

---

# Міні-шпаргалка

## Default State

    Default state
        ↓
    Standard component appearance
        ↓
    No special interaction state is active

Default state — стандартний вигляд компонента.

---

## Initial State

    Initial state
        ↓
    Initial value or condition
        ↓
    Component initialization

Initial state — стан, з якого починається робота компонента.

---

## Component State

    Component
        ↓
    State
        ↓
    Appearance + behavior

Стан може впливати на вигляд, доступність і поведінку компонента.

---

## Variant vs State

    Variant → primary / secondary / destructive

    State → default / hover / focus / disabled

Variant визначає різновид компонента.

State визначає його поточний стан.

---

## Visual Properties

    Color
    Background
    Border
    Radius
    Padding
    Typography
    Size
    Alignment
    Shadow

Ці властивості формують зовнішній вигляд компонента.

---

## Button

    <button type="button">
        Continue
    </button>

Використовуй button для дій.

---

## Link

    <a href="/courses">
        View courses
    </a>

Використовуй a для навігації.

---

## Input

    <label for="email">
        Email
    </label>

    <input
        id="email"
        name="email"
        type="email"
    />

Використовуй label для позначення поля.

---

## Design Tokens

    :root {
        --color-primary: #2563eb;
        --color-surface: #ffffff;
        --radius-medium: 8px;
    }

Токени допомагають забезпечити узгодженість дизайну.

---

## CSS States

    .button {
        /* default */
    }

    .button:hover {
        /* hover */
    }

    .button:focus-visible {
        /* focus */
    }

    .button:active {
        /* active */
    }

    .button:disabled {
        /* disabled */
    }

Базові стилі визначають default appearance, а pseudo-classes — відповідні інтерактивні стани.

---

## Accessibility

    readable text
    sufficient contrast
    semantic HTML
    clear labels
    visible focus
    understandable controls

Доступність потрібно враховувати вже під час створення default state.

---

## Основні правила

    Default state → стандартний вигляд
    Initial state → початковий стан
    Variant       → різновид компонента
    State         → поточний стан
    Design token  → повторно використовуване значення
    Affordance    → підказка щодо взаємодії
    Visual hierarchy → порядок візуальної важливості
    State coverage → перевірка важливих станів

---

# Головне

• Default state — це стандартний вигляд UI-компонента за відсутності спеціального інтерактивного стану.

• Default state формує основу для проєктування hover, focus, active, disabled та інших станів.

• Initial state та default state — різні поняття: перше стосується початкового стану, друге — звичайного представлення компонента.

• Візуальні властивості компонента включають колір, фон, межі, відступи, типографіку, розміри та вирівнювання.

• Default state має забезпечувати читабельність, зрозуміле призначення компонента та узгодженість з іншими елементами інтерфейсу.

• Variant визначає різновид компонента, а state — його поточний стан.

• Design tokens допомагають підтримувати єдині правила оформлення в межах дизайн-системи.

• Affordance допомагає користувачу зрозуміти, як взаємодіяти з елементом.

• Візуальна ієрархія допомагає відрізняти основні дії від другорядних.

• Інтерактивність компонента має відповідати його реальній поведінці.

• Семантичний HTML забезпечує передбачувану поведінку та допомагає доступності.

• Placeholder не повинен бути єдиним позначенням поля введення.

• Контраст і читабельність потрібно перевіряти вже у default state.

• Default state не повинен нагадувати disabled state, якщо компонент доступний для взаємодії.

• Не всі компоненти потребують однакового набору станів.

• Під час створення дизайн-системи потрібно визначати та документувати важливі стани компонентів.

• У CSS default state зазвичай описується базовими правилами компонента, а спеціальні стани — відповідними pseudo-classes або класами.

• У React не потрібно додавати окремий state лише для відображення базового компонента, якщо достатньо HTML і CSS.

• Головний принцип: default state має бути зрозумілим, доступним, послідовним і відповідним призначенню компонента.

---

# Наступна тема

    06-component-states/
    ├── 01-default/
    ├── 02-hover/
    ├── 03-focus/
    ├── 04-active/
    ├── 05-disabled/
    ├── 06-loading/
    ├── 07-error/
    ├── 08-success/
    ├── 09-empty/
    └── 10-states-project/

Наступна тема — `02-hover`.

У ній розглядається, як компонент змінює зовнішній вигляд, коли вказівник миші перебуває над інтерактивним елементом, і як зробити цей стан зрозумілим, послідовним та доступним.