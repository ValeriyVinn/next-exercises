# 02. Navigation

Navigation (навігація) — це система елементів і взаємодій, яка допомагає користувачеві переміщатися між сторінками, розділами та функціями цифрового продукту.

Navigation використовується в:

    websites
    web applications
    mobile applications
    dashboards
    educational platforms
    e-commerce websites
    documentation websites
    content management systems

Основна мета Navigation — допомогти користувачеві зрозуміти:

    де він перебуває;
    які розділи доступні;
    як перейти до потрібної інформації;
    як повернутися до попереднього контексту;
    як дістатися до своєї мети.

Наприклад, навігація освітньої платформи:

    Dashboard
    ├── Courses
    ├── Assignments
    ├── Grades
    ├── Schedule
    └── Profile

Користувач може перейти до потрібного розділу, не знаючи внутрішньої реалізації продукту.

Navigation тісно пов'язана з:

    Information Architecture
    UX Design
    UI Design
    User Flow
    Interaction Design
    Usability
    Accessibility
    Responsive Design
    Search Design
    Content Strategy

---

## Ключові поняття

✔ Navigation

✔ Navigation Design

✔ Navigation System

✔ Primary Navigation

✔ Secondary Navigation

✔ Global Navigation

✔ Local Navigation

✔ Contextual Navigation

✔ Utility Navigation

✔ Main Menu

✔ Navigation Item

✔ Navigation Link

✔ Navigation Label

✔ Navigation Pattern

✔ Navbar

✔ Sidebar

✔ Breadcrumbs

✔ Tabs

✔ Pagination

✔ Dropdown Menu

✔ Mega Menu

✔ Hamburger Menu

✔ Mobile Navigation

✔ Footer Navigation

✔ In-page Navigation

✔ Anchor Links

✔ Back Navigation

✔ Navigation Hierarchy

✔ Active State

✔ Selected State

✔ Current Page

✔ Navigation Feedback

✔ Wayfinding

✔ Orientation

✔ Findability

✔ Discoverability

✔ Navigation Depth

✔ Navigation Breadth

✔ Navigation Consistency

✔ Navigation Accessibility

✔ Responsive Navigation

✔ Touch Target

✔ Keyboard Navigation

✔ Focus State

✔ Skip Link

✔ Search Navigation

✔ Direct Navigation

✔ Deep Linking

✔ Navigation Flow

✔ Navigation Error

✔ Dead End

✔ Navigation Testing

---

## Що потрібно пам'ятати

• Navigation — це спосіб переміщення користувача між сторінками та функціями продукту.

• Information Architecture визначає, як організована інформація, а Navigation Design визначає, як користувач переміщується між її частинами.

• Primary Navigation забезпечує доступ до найважливіших розділів продукту.

• Secondary Navigation допомагає переміщатися між підрозділами або додатковими розділами.

• Global Navigation зазвичай доступна в різних частинах продукту.

• Local Navigation допомагає орієнтуватися в межах конкретного розділу.

• Contextual Navigation надає посилання, пов'язані з поточним контентом або задачею.

• Utility Navigation забезпечує доступ до допоміжних функцій, наприклад налаштувань, профілю або довідки.

• Navigation Labels повинні бути зрозумілими та послідовними.

• Користувач повинен розуміти, де він перебуває, який розділ активний і куди приведе посилання.

• Активний пункт навігації повинен мати помітний стан, а не відрізнятися лише незначною зміною кольору.

• Навігація повинна працювати з клавіатури, сенсорного екрана та допоміжних технологій.

• На мобільних пристроях навігація може мати інше візуальне представлення, але повинна зберігати доступ до важливих функцій.

• Hamburger Menu не є автоматично найкращим рішенням для кожного мобільного інтерфейсу.

• Пошук доповнює навігацію, але не завжди може замінити її.

• Хороша навігація скорочує непотрібні переходи, зменшує невизначеність і допомагає досягати мети.

• Navigation Design потрібно перевіряти на реальних задачах користувачів.

---

# Navigation vs Information Architecture

Navigation та Information Architecture пов'язані, але мають різні завдання.

## Information Architecture

Information Architecture визначає структуру інформації:

    Які сторінки існують?
    Які розділи містять підрозділи?
    Як згрупований контент?
    Які сторінки пов'язані між собою?
    Як користувач може знайти інформацію?

Приклад:

    Courses
        └── Informatics
            └── Module 1
                └── Lesson 1

## Navigation

Navigation визначає, як користувач переходить між цими сторінками.

Наприклад:

    Sidebar
        ↓
    Courses
        ↓
    Informatics
        ↓
    Module 1
        ↓
    Lesson 1

Один і той самий ресурс може бути доступний різними шляхами:

    Sidebar → Courses → Informatics

    Search → Search Results → Informatics

    Dashboard → Recent Courses → Informatics

Отже:

    Information Architecture
        → structure of information

    Navigation
        → movement through information

Навіть добре організована IA може мати незручну навігацію. І навпаки, візуально привабливе меню не виправить погано організовану структуру контенту.

---

# Navigation System

Navigation System — сукупність навігаційних елементів і правил, які допомагають користувачеві переміщатися цифровим продуктом.

Наприклад:

    Navigation System
    ├── Primary Navigation
    ├── Secondary Navigation
    ├── Breadcrumbs
    ├── Contextual Links
    ├── Search
    └── Footer Navigation

Ці елементи можуть виконувати різні завдання, але повинні працювати узгоджено.

## Основні задачі Navigation System

    provide orientation
    expose important sections
    support movement between pages
    communicate current location
    support task completion
    reduce navigation errors
    maintain consistency

## Приклад

Освітня платформа:

    Global Navigation
        ├── Dashboard
        ├── Courses
        ├── Assignments
        └── Profile

    Local Navigation
        └── Course
            ├── Overview
            ├── Lessons
            ├── Materials
            └── Grades

    Contextual Navigation
        └── Related Lessons

Глобальна навігація допомагає переходити між основними розділами, локальна — переміщатися всередині курсу, а контекстна — знаходити пов'язані матеріали.

---

# Primary Navigation

Primary Navigation — основна навігація продукту, яка забезпечує доступ до найважливіших розділів.

Приклад:

    Home
    Courses
    Services
    About
    Contact

Для вебзастосунку:

    Dashboard
    Projects
    Tasks
    Team
    Settings

Primary Navigation зазвичай є однією з найпомітніших частин інтерфейсу.

## Коли використовувати

Primary Navigation потрібна, коли продукт має кілька основних розділів, між якими користувачі регулярно переміщуються.

## Принципи дизайну

• Включати найважливіші розділи.

• Використовувати зрозумілі назви.

• Дотримуватися послідовності між сторінками.

• Візуально відрізняти поточний розділ.

• Не перевантажувати меню другорядними посиланнями.

• Забезпечувати доступність на різних розмірах екрана.

## Приклад структури

    Primary Navigation
    ├── Dashboard
    ├── Courses
    ├── Assignments
    └── Grades

Допоміжні елементи можуть розташовуватися окремо:

    Utility Navigation
    ├── Help
    ├── Notifications
    └── Profile

Важливо: конкретний поділ залежить від продукту. Наприклад, Profile може бути основним розділом для сервісу керування персональними даними.

---

# Secondary Navigation

Secondary Navigation — додаткова навігація, яка забезпечує доступ до підрозділів або другорядних розділів.

Приклад:

    Courses
        ├── All Courses
        ├── My Courses
        ├── Completed
        └── Archived

Secondary Navigation часто використовується разом із Primary Navigation.

## Приклад

    Primary Navigation
        └── Courses

    Secondary Navigation
        ├── All Courses
        ├── My Courses
        └── Completed

Primary Navigation допомагає відкрити розділ Courses, а Secondary Navigation — вибрати потрібне представлення курсів.

## Коли використовувати

• Коли великий розділ має кілька підрозділів.

• Коли користувач регулярно переміщується між підсторінками.

• Коли потрібно зберігати контекст поточного розділу.

• Коли всі підрозділи не варто включати до головного меню.

## Типові форми

    sub-navigation menu
    secondary sidebar
    tabs
    section navigation
    local links

Secondary Navigation не повинна дублювати Primary Navigation без зрозумілої причини.

---

# Global Navigation

Global Navigation — навігація, яка доступна в різних частинах продукту та забезпечує перехід між основними розділами.

Наприклад:

    Dashboard
    Courses
    Messages
    Profile

Вона часто розташована в:

    top navbar
    main sidebar
    persistent mobile navigation

## Основні характеристики

    consistent placement
    consistent labels
    access across major sections
    predictable behavior

Наприклад, якщо Sidebar доступний у всіх основних розділах застосунку, він може виконувати роль Global Navigation.

## Переваги

• Користувач може перейти до іншого розділу без повернення на Home.

• Навігація залишається передбачуваною.

• Зменшується кількість зайвих переходів.

• Основні функції залишаються доступними.

## Важливо

Global Navigation не обов'язково повинна відображатися абсолютно однаково на кожній сторінці.

Наприклад, на мобільному пристрої вона може перетворюватися на компактне меню.

Головне — зберігати зрозумілість і послідовність поведінки.

---

# Local Navigation

Local Navigation — навігація в межах конкретного розділу або частини продукту.

Наприклад:

    Course: Informatics
        ├── Overview
        ├── Lessons
        ├── Materials
        ├── Assignments
        └── Grades

Користувач перебуває в курсі Informatics і переміщується між його підрозділами.

## Global vs Local Navigation

    Global Navigation
        → move between major sections

    Local Navigation
        → move within a section

Приклад:

    Global:
        Courses
        Teachers
        Grades

    Local, inside Courses:
        Overview
        Lessons
        Materials

## Коли використовувати Local Navigation

• Для великих розділів із власною структурою.

• Для сторінок налаштувань із кількома категоріями.

• Для профілів із підрозділами.

• Для сторінок курсів, проєктів або товарів.

• Для документації з кількома тематичними групами.

---

# Contextual Navigation

Contextual Navigation — посилання, які допомагають перейти до інформації, пов'язаної з поточним контентом або задачею.

Приклад сторінки уроку:

    Lesson: JavaScript Arrays

    Related Lessons:
        ├── Array Methods
        ├── Iteration
        └── Objects

Ці посилання не обов'язково належать до головного меню.

Вони з'являються в контексті конкретної сторінки.

## Приклади Contextual Navigation

    Related Articles
    Related Products
    Next Lesson
    Previous Lesson
    See Also
    Recommended Content
    Related Services

## Переваги

• Допомагає знаходити пов'язану інформацію.

• Підтримує природний перехід між матеріалами.

• Зменшує залежність від головного меню.

• Допомагає користувачам відкривати додатковий контент.

## Ризики

• Надмірна кількість посилань відволікає від основної задачі.

• Незрозумілі назви знижують корисність посилань.

• Нерелевантні рекомендації створюють зайві переходи.

Контекстні посилання повинні бути пов'язані з поточним завданням користувача.

---

# Utility Navigation

Utility Navigation — навігація до допоміжних функцій продукту.

Типові елементи:

    Profile
    Account Settings
    Notifications
    Help
    Language
    Sign In
    Sign Out

Вони часто розташовуються в окремій частині Navbar або в меню профілю.

## Приклад

    Main Navigation
        ├── Dashboard
        ├── Courses
        └── Assignments

    Utility Navigation
        ├── Search
        ├── Notifications
        ├── Help
        └── Profile

## Принципи дизайну

• Допоміжні функції повинні бути доступними.

• Їхнє розташування має бути передбачуваним.

• Іконки без текстових назв повинні мати доступні назви.

• Меню профілю повинно чітко показувати доступні дії.

• Не варто приховувати критично важливі функції лише тому, що вони належать до Utility Navigation.

Utility Navigation — це функціональна роль навігації, а не конкретний UI-компонент.

---

# Navigation Patterns

Navigation Pattern — типовий спосіб організації навігації в інтерфейсі.

Основні патерни:

    Navbar
    Sidebar
    Breadcrumbs
    Tabs
    Dropdown Menu
    Mega Menu
    Hamburger Menu
    Footer Navigation
    Pagination
    In-page Navigation
    Bottom Navigation

Кожен патерн підходить для певних задач.

## Navbar

Забезпечує доступ до основних розділів, часто у верхній частині сторінки.

## Sidebar

Забезпечує доступ до розділів у вертикальному списку, часто в застосунках із великою кількістю функцій.

## Breadcrumbs

Показує шлях від вищого рівня структури до поточної сторінки.

## Tabs

Перемикає між пов'язаними представленнями або підрозділами.

## Dropdown Menu

Показує додаткові пункти після активації меню.

## Mega Menu

Показує велику групу категорій і посилань, зазвичай для складної структури вебсайту.

## Hamburger Menu

Відкриває приховану навігаційну панель або меню.

## Footer Navigation

Містить додаткові посилання в нижній частині сторінки.

## Pagination

Дозволяє переміщуватися між сторінками набору результатів або контенту.

## In-page Navigation

Дозволяє переходити до певних секцій поточної сторінки.

## Bottom Navigation

Забезпечує швидкий доступ до основних розділів у нижній частині мобільного інтерфейсу.

Ці патерни детальніше розглядатимуться у відповідних підрозділах:

    03-navbar
    04-sidebar
    05-breadcrumbs
    06-tabs

---

# Navigation Labels

Navigation Labels — назви, які повідомляють користувачеві, куди веде навігаційний пункт.

Приклади:

    Home
    Courses
    Services
    Products
    About
    Contact

Labels впливають на зрозумілість навігації та швидкість пошуку інформації.

## Good Navigation Labels

Хороші labels повинні бути:

    clear
    concise
    familiar
    consistent
    descriptive

Наприклад:

    Grades

зазвичай зрозуміліше, ніж:

    Academic Performance Management

якщо розділ просто показує оцінки.

## Consistency

Якщо розділ називається Courses у головному меню, бажано використовувати цю саму назву на сторінках і в пов'язаних елементах.

Приклад непослідовності:

    Main Navigation: Courses
    Sidebar: Classes
    Breadcrumbs: Learning Resources

Якщо всі три назви позначають ту саму сутність, користувач може подумати, що це різні розділи.

## User Language

Назви мають відповідати термінології цільової аудиторії.

Наприклад:

    Grades
    Schedule
    Assignments

можуть бути зрозумілими для користувачів освітньої платформи.

Водночас назви повинні враховувати мову продукту та звичні поняття конкретної аудиторії.

## Labels vs Icons

Іконка може допомагати розпізнати пункт, але не завжди однозначно пояснює його призначення.

Наприклад:

    ⚙ → Settings
    ? → Help

У реальному інтерфейсі потрібно використовувати відповідні іконки з доступними назвами та текстовими підписами там, де це необхідно.

---

# Navigation Hierarchy

Navigation Hierarchy — організація навігаційних пунктів за рівнями важливості та підпорядкування.

Наприклад:

    Courses
        ├── All Courses
        ├── My Courses
        └── Completed

Тут Courses є батьківським розділом, а інші пункти — його підрозділами.

## Primary Level

Основні розділи:

    Dashboard
    Courses
    Assignments
    Grades

## Secondary Level

Підрозділи:

    Courses
        ├── All Courses
        ├── My Courses
        └── Archived

## Tertiary Level

Детальніші рівні:

    Courses
        └── Informatics
            └── Module 1
                └── Lesson 1

Tertiary Navigation потрібна не кожному продукту. Надмірна кількість рівнів може ускладнювати орієнтацію.

## Принципи ієрархії

• Найважливіші розділи повинні бути легко доступними.

• Підрозділи повинні логічно належати до батьківського розділу.

• Назви різних рівнів повинні бути зрозумілими.

• Глибина навігації має відповідати складності контенту.

• Користувач повинен мати можливість повернутися до вищого рівня.

• Не всі сторінки потрібно показувати в головному меню.

---

# Current Page and Active State

Користувач повинен розуміти, який розділ або сторінка відкриті зараз.

Для цього використовують Active State або інші засоби позначення поточного контексту.

Наприклад:

    Dashboard
    Courses        ← active
    Assignments
    Grades

Active State може використовувати:

    background color
    text color
    font weight
    border
    indicator
    icon variation

## Active State

Active State візуально підкреслює активний пункт або компонент.

Приклад CSS:

    .nav-link {
        color: #444;
        text-decoration: none;
    }

    .nav-link[aria-current="page"] {
        color: #0757c7;
        font-weight: 600;
        background: #eaf2ff;
    }

Приклад HTML:

    <nav aria-label="Main navigation">
        <a href="/dashboard">Dashboard</a>

        <a href="/courses" aria-current="page">
            Courses
        </a>

        <a href="/grades">Grades</a>
    </nav>

`aria-current="page"` допомагає допоміжним технологіям визначити поточну сторінку.

## Active vs Hover vs Focus

Ці стани мають різні значення.

    Active / Current
        → поточний розділ або сторінка

    Hover
        → вказівник знаходиться над елементом

    Focus
        → елемент отримав фокус клавіатури або іншим способом

Їх не слід ототожнювати.

## Важливо

• Не позначати всі пункти як активні.

• Не покладатися лише на колір.

• Зберігати видимий стан поточної сторінки.

• Перевіряти правильність `aria-current`.

• Не плутати поточну сторінку з відкритим dropdown menu.

---

# Navigation Feedback

Navigation Feedback — зворотний зв'язок, який допомагає користувачеві зрозуміти результат навігаційної дії.

Наприклад:

    click navigation link
        ↓
    page changes
        ↓
    active item updates

Інші приклади:

    dropdown opens
    sidebar expands
    selected tab changes
    current page updates
    mobile menu closes after navigation

## Навіщо потрібен Feedback

• Підтверджує, що дія спрацювала.

• Допомагає розуміти поточний стан інтерфейсу.

• Зменшує невизначеність.

• Полегшує роботу зі складними меню.

## Приклад

Користувач натискає Courses.

Очікувана поведінка:

    1. Відкривається сторінка Courses.
    2. Поточний пункт навігації стає активним.
    3. Заголовок сторінки відповідає вибраному розділу.
    4. URL змінюється відповідно до маршруту.

У SPA або App Router зміна сторінки може відбуватися без повного перезавантаження документа, але користувач усе одно повинен отримати зрозумілий результат.

---

# Wayfinding

Wayfinding — система підказок, яка допомагає користувачеві розуміти, де він перебуває, як організований простір інформації та куди можна рухатися далі.

У цифровому інтерфейсі Wayfinding підтримують:

    navigation labels
    breadcrumbs
    page titles
    active states
    section headings
    consistent layout
    navigation landmarks
    contextual links

Наприклад:

    Courses
        ↓
    Informatics
        ↓
    Module 1
        ↓
    Lesson 1

Breadcrumbs і заголовок сторінки допомагають зрозуміти поточне місце в структурі.

## Orientation

Orientation — розуміння користувачем свого поточного положення в інтерфейсі.

Користувач повинен розуміти:

    Where am I?
    What section is this?
    How did I get here?
    Where can I go next?

## Як покращити Wayfinding

• Використовувати послідовну навігацію.

• Показувати зрозумілий заголовок сторінки.

• Позначати поточний розділ.

• Додавати breadcrumbs для ієрархічних структур, де вони корисні.

• Забезпечувати очевидні шляхи повернення.

• Уникати несподіваних змін розташування меню.

• Використовувати зрозумілі посилання на пов'язаний контент.

Wayfinding особливо важливий у великих застосунках, документації та освітніх платформах.

---

# Navigation Breadth and Depth

Breadth і Depth впливають на навігаційну структуру.

## Breadth

Breadth — кількість пунктів на одному рівні навігації.

Приклад:

    Dashboard
    Courses
    Students
    Teachers
    Assignments
    Grades
    Schedule
    Settings

Тут є багато пунктів на одному рівні.

## Depth

Depth — кількість рівнів навігації.

Приклад:

    Courses
        └── Informatics
            └── Module 1
                └── Lesson 1

Це структура з кількома рівнями.

## Wide Navigation

Переваги:

    direct access
    fewer navigation levels
    quick access to major sections

Недоліки:

    visual clutter
    too many choices
    limited space on small screens

## Deep Navigation

Переваги:

    clear grouping
    fewer items at each level
    support for complex content

Недоліки:

    more navigation steps
    possible loss of context
    greater need for orientation cues

## Як обирати

Не існує одного оптимального значення breadth або depth для всіх продуктів.

Вибір залежить від:

    number of sections
    user goals
    frequency of use
    screen size
    content relationships
    user research

Важливо не просто зменшувати кількість пунктів або рівнів, а робити навігацію зрозумілою для конкретних задач.

---

# Direct Navigation

Direct Navigation — можливість перейти безпосередньо до потрібного ресурсу, не проходячи всі рівні меню.

Наприклад:

    /courses/informatics/lessons/intro

Користувач може відкрити цей URL напряму.

Інші способи прямого доступу:

    bookmark
    search result
    shared link
    notification link
    dashboard shortcut

## Переваги

• Скорочує кількість переходів.

• Допомагає швидко відкривати потрібний контент.

• Дозволяє ділитися конкретними сторінками.

• Підтримує повернення до збережених ресурсів.

## Deep Linking

Deep Linking — посилання на конкретний ресурс або глибокий рівень продукту, а не лише на головну сторінку.

Наприклад:

    https://example.com/courses/informatics/lessons/intro

Це deep link на конкретний урок.

Deep linking особливо корисний для:

    educational platforms
    documentation
    e-commerce
    content platforms
    dashboards

## Важливі правила

• Прямий URL повинен відкривати очікуваний ресурс.

• Необхідно коректно обробляти неіснуючі маршрути.

• Приватні ресурси повинні перевіряти права доступу.

• Внутрішні посилання не повинні залежати від випадкового стану інтерфейсу.

• Користувач повинен мати змогу повернутися до зрозумілого контексту.

---

# Search as Navigation

Search може бути важливою частиною навігаційної системи.

Він допомагає користувачам знаходити інформацію без необхідності знати точне розташування сторінки.

Наприклад:

    Search: React hooks

    Results:
        useState
        useEffect
        useCallback
        useMemo

## Коли потрібен Search

• Коли продукт містить багато сторінок.

• Коли користувачі часто шукають конкретні матеріали.

• Коли структура має багато категорій.

• Коли назву потрібного ресурсу легше ввести, ніж знайти в меню.

• Коли є великі каталоги, документація або бібліотеки.

## Search vs Navigation Menu

    Navigation Menu
        → browse available sections

    Search
        → locate specific information

Меню допомагає досліджувати структуру, а пошук — знаходити конкретний контент.

## Search UX

Пошукова система повинна враховувати:

    clear search input
    useful placeholder
    relevant results
    readable result titles
    meaningful descriptions
    empty state
    loading state
    error state
    keyboard accessibility

Пошук не повинен бути єдиним способом доступу до критично важливих функцій, якщо користувачі можуть не знати, що саме потрібно вводити.

---

# Navigation for Different Devices

Навігація повинна враховувати розмір екрана, спосіб введення та контекст використання.

## Desktop Navigation

На великих екранах можна використовувати:

    horizontal navbar
    sidebar
    mega menu
    secondary navigation
    persistent navigation

Переваги:

    більше доступного простору
    можливість показувати більше пунктів
    зручність роботи з мишею та клавіатурою

Потенційні проблеми:

    надто широке меню
    перевантаження посиланнями
    складні dropdown menus

## Tablet Navigation

На планшетах доступного простору менше.

Можливі рішення:

    compact navbar
    collapsible sidebar
    responsive menu
    grouped navigation items

Важливо перевіряти не лише ширину екрана, а й фактичну зручність навігації.

## Mobile Navigation

На мобільних пристроях часто використовують:

    hamburger menu
    bottom navigation
    compact navbar
    collapsible sections
    in-page navigation

Основні вимоги:

    readable labels
    sufficiently large touch targets
    clear active states
    easy back navigation
    minimal unnecessary nesting

## Responsive Navigation

Responsive Navigation — адаптація навігаційного інтерфейсу до різних розмірів екрана та умов взаємодії.

Приклад:

    Desktop:
        horizontal navbar

    Mobile:
        menu button
            ↓
        navigation drawer

При цьому структура основних розділів може залишатися однаковою.

## Важливо

• Не потрібно автоматично ховати всі пункти навігації на мобільному пристрої.

• Критично важливі дії повинні залишатися доступними.

• Відкриття меню має бути очевидним.

• Відкритий стан меню повинен бути зрозумілим.

• Потрібно перевіряти навігацію на сенсорному екрані та клавіатурі.

• Адаптивність не повинна порушувати доступність.

Детальніше адаптивні рішення розглядатимуться в розділі:

    07-responsive-design

---

# Navigation Accessibility

Navigation Accessibility — забезпечення можливості користуватися навігацією людям із різними можливостями та способами взаємодії.

Навігація повинна працювати з:

    keyboard
    screen readers
    mouse
    touch
    assistive technologies

## Semantic HTML

Для навігації використовують семантичний елемент `nav`.

Приклад:

    <nav aria-label="Main navigation">
        <ul>
            <li>
                <a href="/dashboard">Dashboard</a>
            </li>

            <li>
                <a href="/courses" aria-current="page">
                    Courses
                </a>
            </li>

            <li>
                <a href="/grades">Grades</a>
            </li>
        </ul>
    </nav>

Переваги:

    meaningful structure
    assistive technology support
    clearer navigation landmarks

## Navigation Landmark

`nav` створює навігаційний орієнтир, який допомагає користувачам допоміжних технологій знаходити навігаційні блоки.

Якщо на сторінці кілька навігаційних блоків, їм можна надати різні назви.

Приклад:

    <nav aria-label="Main navigation">
        ...
    </nav>

    <nav aria-label="Breadcrumbs">
        ...
    </nav>

Назва повинна відповідати призначенню блоку.

## Keyboard Navigation

Користувач повинен мати можливість переходити між інтерактивними елементами клавіатурою.

Зазвичай використовують:

    Tab
        → move focus forward

    Shift + Tab
        → move focus backward

    Enter
        → activate a focused link or button

    Space
        → activate a focused button
          under normal native button behavior

Для складних меню можуть знадобитися додаткові клавіатурні взаємодії, але вони мають відповідати типу компонента та очікуваній поведінці.

## Focus State

Focus State показує, який елемент зараз отримав клавіатурний фокус.

Приклад CSS:

    .nav-link:focus-visible {
        outline: 3px solid #0757c7;
        outline-offset: 3px;
    }

Не слід без заміни прибирати видимий focus indicator.

## Skip Link

Skip Link дозволяє пропустити повторювані навігаційні елементи та перейти до основного контенту.

Приклад:

    <a class="skip-link" href="#main-content">
        Skip to main content
    </a>

    <nav aria-label="Main navigation">
        ...
    </nav>

    <main id="main-content">
        <h1>Courses</h1>
        ...
    </main>

Skip Link особливо корисний на сторінках, де користувачеві доводиться щоразу проходити через великий навігаційний блок.

## Links vs Buttons

Посилання використовують для переходу до ресурсу.

    <a href="/courses">
        Courses
    </a>

Кнопки використовують для виконання дії.

    <button type="button">
        Open menu
    </button>

Не варто використовувати кнопку замість посилання, якщо основна дія — перехід на іншу сторінку.

## Touch Targets

Touch Target — область, яку користувач активує дотиком.

На мобільних пристроях важливо забезпечити достатній розмір інтерактивних областей та відстань між сусідніми елементами.

Для WCAG 2.2 критерій 2.5.8 встановлює мінімальний розмір target у 24 × 24 CSS px із визначеними винятками. Рекомендації щодо комфортної взаємодії можуть вимагати більших розмірів.

## Основні правила Accessibility

• Використовувати семантичні HTML-елементи.

• Забезпечувати навігацію клавіатурою.

• Підтримувати видимий focus indicator.

• Позначати поточну сторінку відповідними атрибутами.

• Не покладатися лише на колір.

• Використовувати зрозумілі назви посилань.

• Забезпечувати достатній розмір інтерактивних областей.

• Не використовувати інтерактивні елементи без зрозумілого призначення.

---

# Navigation Errors

Navigation Error — ситуація, коли користувач не може перейти до потрібного ресурсу, не розуміє поточного стану або потрапляє на неправильну сторінку.

Типові проблеми:

    broken link
    wrong destination
    dead end
    unclear label
    missing active state
    inaccessible menu
    unexpected redirect
    missing page
    lost context

## Broken Link

Посилання веде на ресурс, який не існує або недоступний.

Приклад:

    <a href="/coursez">
        Courses
    </a>

Якщо правильний маршрут `/courses`, таке посилання є помилковим.

## Dead End

Dead End — сторінка, з якої користувачеві складно продовжити шлях або повернутися до потрібного контексту.

Наприклад:

    Search Results
        ↓
    Article
        ↓
    No related links
    No clear return path

Не кожна сторінка повинна мати багато посилань, але важливо забезпечити очікувані способи продовження або завершення задачі.

## Wrong Destination

Назва посилання обіцяє одне, але після переходу користувач отримує інше.

Наприклад:

    Link: Course Grades

    Destination:
        General Settings

Це порушує очікування користувача.

## Як запобігти Navigation Errors

• Перевіряти внутрішні посилання.

• Використовувати послідовні URL.

• Перевіряти всі маршрути після змін IA.

• Показувати зрозумілі повідомлення про помилки.

• Забезпечувати доступні шляхи повернення.

• Тестувати сценарії користувачів.

• Перевіряти доступність меню з клавіатури.

• Не приховувати помилки за неочікуваними перенаправленнями.

---

# Navigation Testing

Navigation Testing — перевірка того, чи можуть користувачі знаходити потрібні розділи та переходити між ними.

Мета — виявити проблеми навігації до того, як вони негативно вплинуть на використання продукту.

## Що перевіряти

    findability
    clarity of labels
    current page indication
    navigation consistency
    task completion
    number of unnecessary steps
    keyboard accessibility
    mobile behavior
    error handling

## Task-Based Testing

Користувачеві дають конкретну задачу.

Наприклад:

    Find the Informatics course.

Очікуваний шлях:

    Dashboard
        ↓
    Courses
        ↓
    Informatics

Після тесту можна оцінити:

    Did the user find the course?
    Was the path understandable?
    Were there unnecessary steps?
    Did the user choose an unexpected category?

## Usability Testing

Під час Usability Testing перевіряють навігацію в контексті повноцінної взаємодії з інтерфейсом.

Наприклад:

    open a course
    navigate to a lesson
    complete an assignment
    return to the course

Це дозволяє виявити не лише проблеми структури, а й проблеми UI та поведінки компонентів.

## Tree Testing

Tree Testing перевіряє пошук у структурі без повного візуального інтерфейсу.

    Task
        ↓
    Navigate the category tree
        ↓
    Select destination
        ↓
    Analyze result

## Card Sorting

Card Sorting допомагає зрозуміти, як користувачі групують контент до створення або перегляду навігації.

Отже:

    Card Sorting
        → discover grouping patterns

    Tree Testing
        → test findability in a structure

    Usability Testing
        → evaluate interaction in the interface

---

# Navigation Metrics

Navigation Metrics — показники, які допомагають оцінити ефективність навігації.

Можливі показники:

    task completion rate
    navigation success rate
    time on task
    number of wrong turns
    backtracking frequency
    search usage
    navigation abandonment
    error rate

## Task Completion Rate

Task Completion Rate — частка користувачів, які успішно виконали задану задачу.

Формула:

    Task Completion Rate =
        Successful Tasks / Total Tasks × 100%

Приклад:

    Successful Tasks = 18
    Total Tasks = 20

    Task Completion Rate =
        18 / 20 × 100% = 90%

Це означає, що 90% виконань задачі завершилися успішно.

## Time on Task

Time on Task — час, необхідний для виконання задачі.

Наприклад:

    Task:
        Find a course.

    Time:
        25 seconds

Показник потрібно інтерпретувати разом з успішністю та контекстом. Швидкість сама по собі не означає, що навігація зручна.

## Wrong Turns

Wrong Turns — неправильні переходи під час пошуку потрібного ресурсу.

Наприклад:

    Courses
        ↓
    Settings
        ↓
    Back
        ↓
    Grades

Якщо користувач регулярно обирає неправильні розділи, це може свідчити про проблеми з labels або ієрархією.

## Backtracking

Backtracking — повернення до попередніх рівнів або сторінок через те, що користувач не знайшов потрібного контенту.

Високий рівень backtracking може вказувати на:

    unclear labels
    poor hierarchy
    unexpected destinations
    missing orientation cues

Однак повернення назад не завжди означає помилку. Користувач може навмисно порівнювати сторінки або переглядати кілька варіантів.

## Як використовувати Metrics

• Визначати конкретні задачі.

• Порівнювати результати до та після змін.

• Поєднувати кількісні дані зі спостереженнями.

• Не робити висновків лише за одним показником.

• Перевіряти, чи відповідають метрики реальним цілям користувача.

---

# Navigation Design Process

Проєктування навігації варто виконувати послідовно.

## Step 1 — Understand User Goals

Визначити, що користувачі хочуть робити найчастіше.

Наприклад:

    find a course
    open a lesson
    view grades
    manage profile

## Step 2 — Review Information Architecture

Перевірити:

    pages
    categories
    hierarchy
    relationships
    content types

Не варто проєктувати меню без розуміння структури інформації.

## Step 3 — Identify Navigation Levels

Визначити:

    primary navigation
    secondary navigation
    local navigation
    contextual navigation
    utility navigation

Не кожному продукту потрібні всі ці типи.

## Step 4 — Select Navigation Patterns

Вибрати компоненти відповідно до задач:

    navbar
    sidebar
    breadcrumbs
    tabs
    dropdown menu
    search
    footer navigation

Вибір залежить від обсягу контенту, кількості розділів та пристроїв користувачів.

## Step 5 — Define Labels

Використовувати зрозумілі та послідовні назви.

Наприклад:

    Courses
    Assignments
    Grades
    Schedule

Перевірити, чи відповідають назви очікуванням користувачів.

## Step 6 — Define Current and Interactive States

Визначити:

    default state
    hover state
    focus state
    active state
    expanded state
    disabled state, where appropriate

Не кожен елемент потребує всіх станів.

## Step 7 — Design Responsive Behavior

Визначити, як навігація працюватиме на:

    desktop
    tablet
    mobile

Перевірити доступність основних розділів і зручність взаємодії.

## Step 8 — Ensure Accessibility

Перевірити:

    semantic HTML
    keyboard navigation
    focus indicators
    current page indication
    accessible names
    touch targets

## Step 9 — Test with Users

Провести тестування на основі реальних задач.

Наприклад:

    Find a course.
    Open a lesson.
    View your grades.
    Return to the course list.

## Step 10 — Iterate

    identify problems
        ↓
    revise labels
        ↓
    adjust hierarchy
        ↓
    improve interactions
        ↓
    test again

Навігація повинна вдосконалюватися на основі реальних проблем, а не лише особистих уподобань дизайнера.

---

# Практичний приклад — Navigation для LMS

Розглянемо просту освітню платформу.

Користувач повинен мати можливість:

    переглядати курси
    відкривати уроки
    виконувати завдання
    переглядати оцінки
    керувати профілем

## 1. Визначаємо Primary Navigation

    Dashboard
    Courses
    Assignments
    Grades
    Schedule

Це основні робочі розділи.

## 2. Визначаємо Utility Navigation

    Notifications
    Help
    Profile
    Settings

Ці функції допомагають керувати обліковим записом і взаємодіяти з продуктом.

## 3. Визначаємо Local Navigation

Коли користувач відкриває курс:

    Course
        ├── Overview
        ├── Lessons
        ├── Materials
        ├── Assignments
        └── Grades

Ця навігація допомагає переміщуватися всередині конкретного курсу.

## 4. Визначаємо Contextual Navigation

На сторінці уроку:

    Previous Lesson
    Next Lesson
    Related Materials

Ці посилання підтримують навчальний процес.

## 5. Визначаємо Breadcrumbs

    Courses
        / Informatics
        / Module 1
        / Lesson 1

Breadcrumbs показують ієрархічний шлях до поточного уроку.

## 6. Визначаємо Active State

Якщо користувач перебуває на сторінці Courses:

    Dashboard
    Courses       ← active
    Assignments
    Grades
    Schedule

Якщо користувач відкриває конкретний курс, потрібно також показати активний підрозділ у локальній навігації.

## 7. Перевіряємо User Flow

Задача:

    Open the first Informatics lesson.

Шлях:

    Dashboard
        ↓
    Courses
        ↓
    Informatics
        ↓
    Lessons
        ↓
    Lesson 1

Потрібно перевірити, чи зрозумілі назви та чи немає зайвих переходів.

## 8. Перевіряємо Mobile Navigation

На мобільному пристрої основна навігація може бути представлена компактним меню.

Важливо зберегти доступ до:

    Dashboard
    Courses
    Assignments
    Grades
    Profile

Якщо деякі функції переміщуються в додаткове меню, їхні назви та розташування повинні залишатися зрозумілими.

---

# Navigation Checklist

Перед завершенням дизайну навігації перевірити такі аспекти.

## Structure

- [ ] Визначено основні розділи.
- [ ] Primary Navigation містить найважливіші пункти.
- [ ] Secondary Navigation не дублює головне меню без потреби.
- [ ] Local Navigation відповідає структурі конкретного розділу.
- [ ] Contextual Navigation містить релевантні посилання.
- [ ] Utility Navigation забезпечує доступ до допоміжних функцій.
- [ ] Навігаційна структура відповідає Information Architecture.

## Labels

- [ ] Назви зрозумілі користувачам.
- [ ] Labels короткі, але достатньо описові.
- [ ] Однакові поняття мають послідовні назви.
- [ ] Посилання відповідають своїм destination.
- [ ] Назви не залежать лише від внутрішнього жаргону команди.

## Orientation

- [ ] Користувач розуміє, де перебуває.
- [ ] Поточна сторінка має відповідний індикатор.
- [ ] Заголовок сторінки зрозумілий.
- [ ] Breadcrumbs використовуються там, де вони корисні.
- [ ] Є зрозумілий шлях повернення.
- [ ] Відкриті меню та підрозділи мають передбачувану поведінку.

## Interaction

- [ ] Посилання ведуть до правильних сторінок.
- [ ] Кнопки виконують заявлені дії.
- [ ] Dropdown menus працюють передбачувано.
- [ ] Active, Hover і Focus не плутаються.
- [ ] Навігація не створює зайвих переходів.
- [ ] Немає непотрібних dead ends.

## Responsive Design

- [ ] Навігація працює на desktop.
- [ ] Навігація працює на tablet.
- [ ] Навігація працює на mobile.
- [ ] Основні функції залишаються доступними.
- [ ] Touch targets мають достатній розмір.
- [ ] Меню не виходить за межі екрана.
- [ ] Вкладені рівні залишаються зрозумілими.

## Accessibility

- [ ] Використовується семантичний HTML.
- [ ] Навігація працює з клавіатури.
- [ ] Видимий focus indicator збережений.
- [ ] Поточна сторінка позначається відповідним способом.
- [ ] Іконки мають доступні назви, коли це потрібно.
- [ ] Skip Link доступний там, де він корисний.
- [ ] Посилання та кнопки використовуються за призначенням.

## Testing

- [ ] Перевірено основні сценарії користувачів.
- [ ] Перевірено всі внутрішні посилання.
- [ ] Перевірено поведінку на різних пристроях.
- [ ] Перевірено пошук, якщо він є.
- [ ] Виявлено проблемні labels.
- [ ] Перевірено можливість знайти ключову інформацію.
- [ ] Результати тестування використано для вдосконалення навігації.

---

# Типові помилки

## 1. Надто багато пунктів у головному меню

Наприклад:

    Dashboard
    Courses
    Lessons
    Assignments
    Grades
    Students
    Teachers
    Parents
    Messages
    Documents
    Reports
    Settings
    Help
    About
    Contact

Таке меню може бути перевантаженим.

Що робити:

    визначити основні задачі користувачів
    згрупувати пов'язані розділи
    відокремити utility navigation
    перевірити структуру на реальних користувачах

Не потрібно приховувати важливі функції лише заради меншої кількості пунктів.

---

## 2. Незрозумілі Navigation Labels

Наприклад:

    Resources
    Workspace
    Center
    Portal
    More

Ці назви можуть бути доречними, але часто не пояснюють, куди веде посилання.

Краще використовувати конкретні назви, якщо вони точніше описують вміст:

    Courses
    Documents
    Reports
    Settings

---

## 3. Відсутність Active State

Користувач відкриває Courses, але меню виглядає так само, як на інших сторінках.

Це ускладнює розуміння поточного розділу.

Рішення:

    highlight current item
    use aria-current where appropriate
    keep the page title clear

---

## 4. Плутанина між Active та Hover

Hover показує, що вказівник знаходиться над елементом.

Active або Current показує поточний стан навігації.

Якщо ці стани виглядають однаково, користувачеві може бути важко зрозуміти, який розділ відкритий.

---

## 5. Непослідовна навігація

На одній сторінці Courses розташований у Navbar, а на іншій без очевидної причини переміщується до Footer.

Це створює непередбачуваність.

Глобальні навігаційні елементи повинні мати стабільне розташування та поведінку, наскільки це дозволяє структура продукту.

---

## 6. Надмірне використання Dropdown Menus

Якщо майже кожен пункт головного меню має вкладене меню, користувачеві доводиться постійно відкривати та закривати додаткові рівні.

Можливі рішення:

    simplify hierarchy
    expose important destinations
    use local navigation
    use a sidebar for complex applications

Dropdown Menu потрібен тоді, коли він допомагає організувати пов'язані дії або розділи, а не просто приховує надлишок пунктів.

---

## 7. Hamburger Menu без очевидної потреби

Hamburger Menu може бути корисним для компактного інтерфейсу, але приховування основних пунктів додає крок до їхнього відкриття.

На мобільному пристрої іноді краще використовувати Bottom Navigation для невеликої кількості ключових розділів.

Рішення залежить від частоти використання, кількості розділів і пріоритетів користувачів.

---

## 8. Навігація працює лише з мишею

Якщо меню відкривається тільки при наведенні, користувачі клавіатури можуть не мати доступу до його пунктів.

Необхідно забезпечити:

    keyboard access
    visible focus
    predictable opening and closing
    correct semantic elements

---

## 9. Іконки без зрозумілих назв

Іконка може бути неоднозначною.

Наприклад, символ із трьома горизонтальними лініями зазвичай означає меню, але сам по собі не пояснює, які саме розділи там містяться.

Використовуй доступні назви та текстові підписи там, де вони потрібні.

---

## 10. Відсутність зручного повернення

Користувач відкриває глибоку сторінку та не розуміє, як повернутися до батьківського розділу.

Можливі рішення:

    breadcrumbs
    back link
    persistent global navigation
    contextual navigation
    clear parent section

Вибір залежить від типу продукту та очікуваного сценарію.

---

## 11. Search повністю замінює навігацію

Пошук корисний, але користувач не завжди знає точну назву ресурсу.

Для багатьох продуктів краще поєднувати:

    navigation
    search
    filters
    contextual links

---

## 12. Однакова навігація для різних задач без перевірки

Різні групи користувачів можуть мати різні потреби.

Наприклад, у LMS:

    Student
        → Courses
        → Assignments
        → Grades

    Teacher
        → Courses
        → Students
        → Grade Management

Навігація може враховувати ролі та права доступу. При цьому важливо не створювати зайвих відмінностей, якщо задачі користувачів однакові.

---

# Питання зі співбесіди

Що таке Navigation Design?

Яка головна мета навігації?

Чим Navigation відрізняється від Information Architecture?

Що таке Navigation System?

Що таке Primary Navigation?

Що таке Secondary Navigation?

Що таке Global Navigation?

Що таке Local Navigation?

Що таке Contextual Navigation?

Що таке Utility Navigation?

Яка різниця між Global і Local Navigation?

Які основні navigation patterns існують?

Що таке Navbar?

Що таке Sidebar?

Що таке Breadcrumbs?

Що таке Tabs?

Що таке Dropdown Menu?

Що таке Mega Menu?

Що таке Hamburger Menu?

Що таке Bottom Navigation?

Що таке Footer Navigation?

Що таке In-page Navigation?

Що таке Navigation Hierarchy?

Що таке Navigation Breadth і Navigation Depth?

Що таке Navigation Label?

Якими мають бути хороші labels?

Що таке Active State?

Чим Active відрізняється від Hover і Focus?

Що таке `aria-current="page"`?

Що таке Navigation Feedback?

Що таке Wayfinding?

Чому важливо показувати користувачеві його поточне місце?

Що таке Direct Navigation?

Що таке Deep Linking?

Коли потрібен Search у навігаційній системі?

Чим Search відрізняється від Navigation Menu?

Як адаптувати навігацію для мобільних пристроїв?

Коли варто використовувати Hamburger Menu?

Коли варто використовувати Bottom Navigation?

Які вимоги доступності потрібно враховувати?

Як забезпечити Keyboard Navigation?

Для чого потрібен Skip Link?

Чим посилання відрізняється від кнопки?

Що таке Navigation Error?

Що таке Dead End?

Як перевірити якість навігації?

Що таке Tree Testing?

Чим Tree Testing відрізняється від Usability Testing?

Які метрики можна використовувати для оцінювання навігації?

Як спроєктувати Navigation System для LMS?

---

# Шлях навчання

## 🟢 Core — обов'язково знати

Navigation.

Navigation System.

Navigation vs Information Architecture.

Primary Navigation.

Secondary Navigation.

Global Navigation.

Local Navigation.

Contextual Navigation.

Utility Navigation.

Navigation Labels.

Navigation Hierarchy.

Navbar.

Sidebar.

Breadcrumbs.

Tabs.

Dropdown Menu.

Active State.

Hover State.

Focus State.

Current Page.

Navigation Feedback.

Wayfinding.

Основи Responsive Navigation.

Основи Navigation Accessibility.

Links vs Buttons.

Основи Search Navigation.

---

## 🔵 Junior — практичний рівень

Проєктування Navigation System.

Побудова Primary Navigation.

Побудова Secondary Navigation.

Вибір між Navbar і Sidebar.

Проєктування Dropdown Menu.

Проєктування Mobile Navigation.

Використання Breadcrumbs.

Організація In-page Navigation.

Робота з Active State.

Використання `aria-current`.

Keyboard Navigation.

Skip Links.

Accessible Names.

Responsive Navigation.

Navigation Labels.

Navigation Breadth and Depth.

Direct Navigation.

Deep Linking.

Search Navigation.

Navigation Feedback.

Виявлення Dead Ends.

Перевірка внутрішніх посилань.

Task-Based Navigation Testing.

Основи Navigation Metrics.

---

## 🟠 Middle — поглиблений рівень

Складні Navigation Systems.

Навігація для великих вебзастосунків.

Навігація для багаторольових систем.

Navigation Governance.

Масштабування навігаційної структури.

Оптимізація Navigation Hierarchy.

Аналіз Navigation Errors.

Інтерпретація Navigation Metrics.

Navigation Usability Testing.

Responsive Navigation Patterns.

Advanced Keyboard Interaction.

Navigation для великих каталогів.

Узгодження Navigation з IA.

Search and Navigation Integration.

Cross-Section Navigation.

Contextual Navigation Optimization.

Navigation for Complex Dashboards.

---

## 🔴 Senior — стратегічний рівень

Enterprise Navigation Architecture.

Navigation Systems для великих цифрових екосистем.

Стратегічне управління Navigation Patterns.

Міжпродуктова Navigation Consistency.

Advanced Information Scent.

Navigation Analytics.

Масштабована система labels.

Управління навігацією для різних ролей.

Складні сценарії Deep Linking.

Архітектура навігації для багатомовних продуктів.

Accessibility Strategy для навігаційних систем.

Узгодження IA, Navigation та Content Strategy.

Оцінювання навігації на основі поведінкових даних.

Оптимізація навігації для складних User Flows.

---

# Міні-шпаргалка

## Navigation

    Navigation
        → move between pages and sections

## Navigation Types

    Primary
        → main sections

    Secondary
        → subsections

    Global
        → navigation across the product

    Local
        → navigation within a section

    Contextual
        → related content and actions

    Utility
        → supporting functions

## Navigation Patterns

    Navbar
        → horizontal navigation

    Sidebar
        → vertical navigation

    Breadcrumbs
        → current location in a hierarchy

    Tabs
        → switch between related views

    Dropdown
        → reveal additional options

    Mega Menu
        → show many grouped destinations

    Hamburger Menu
        → open a compact navigation menu

    Bottom Navigation
        → quick access to key mobile sections

## States

    Default
        → normal state

    Hover
        → pointer is over the element

    Focus
        → element has keyboard focus

    Active / Current
        → current page or selected section

    Expanded
        → menu or section is open

## Orientation

    Where am I?
        → current page / active state

    How did I get here?
        → breadcrumbs / navigation context

    Where can I go?
        → navigation links

    How can I return?
        → back navigation / parent link

## Accessibility

    Semantic HTML
        → meaningful structure

    Keyboard Navigation
        → keyboard access

    Focus Indicator
        → visible focus

    aria-current
        → current page indication

    Skip Link
        → skip repetitive navigation

    Touch Target
        → comfortable activation area

## Navigation Testing

    Card Sorting
        → discover grouping patterns

    Tree Testing
        → test findability in a hierarchy

    Usability Testing
        → test real interaction

    Task Completion Rate
        → percentage of successful tasks

## Navigation Workflow

    Understand User Goals
        ↓
    Review Information Architecture
        ↓
    Define Navigation Levels
        ↓
    Select Patterns
        ↓
    Define Labels
        ↓
    Design States
        ↓
    Adapt to Devices
        ↓
    Check Accessibility
        ↓
    Test with Users
        ↓
    Improve

---

# Головне

• Navigation допомагає користувачеві переміщатися між сторінками та функціями продукту.

• Information Architecture визначає структуру інформації, а Navigation Design — спосіб доступу до неї.

• Primary Navigation забезпечує доступ до головних розділів.

• Secondary Navigation допомагає переміщатися між підрозділами.

• Global Navigation працює на рівні всього продукту, а Local Navigation — у межах конкретного розділу.

• Contextual Navigation пов'язує поточний контент із релевантними ресурсами.

• Utility Navigation забезпечує доступ до допоміжних функцій.

• Navigation Labels повинні бути зрозумілими, послідовними та відповідати очікуванням користувачів.

• Active State показує поточний розділ, Hover реагує на вказівник, а Focus показує елемент, який отримав фокус.

• Wayfinding допомагає зрозуміти поточне місце, структуру та доступні напрямки руху.

• Breadcrumbs корисні для ієрархічних структур, але не потрібні абсолютно кожній сторінці.

• Search доповнює навігацію, особливо у великих продуктах.

• Responsive Navigation адаптує спосіб представлення меню до різних пристроїв, зберігаючи доступ до важливих функцій.

• Доступна навігація повинна працювати з клавіатури та допоміжних технологій.

• Для переходів використовують посилання, а для виконання дій — кнопки.

• Navigation Testing допомагає виявляти незрозумілі назви, зайві переходи, помилки та проблеми з пошуком інформації.

• Ефективність навігації потрібно оцінювати за реальними задачами користувачів, а не лише за зовнішнім виглядом меню.

• Основний принцип:

    Help users understand where they are,
    where they can go,
    and how to reach their goal.