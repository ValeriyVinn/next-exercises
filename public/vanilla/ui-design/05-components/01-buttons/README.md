# 01. Buttons

Buttons (кнопки) — це інтерактивні UI-компоненти, які дозволяють користувачеві виконувати дії в інтерфейсі застосунку.

Кнопки використовуються, коли потрібно:

- відправити форму;
- зберегти або видалити дані;
- створити новий запис;
- підтвердити або скасувати дію;
- відкрити модальне вікно;
- запустити процес;
- перейти до наступного кроку сценарію;
- керувати відтворенням або іншою функцією;
- виконати дію без переходу на іншу сторінку.

Buttons — одна з основних складових UI design, оскільки вони допомагають користувачеві зрозуміти, які дії доступні та як взаємодіяти із системою.

Основні типи кнопок:

    Primary button
    Secondary button
    Tertiary button
    Text button
    Icon button
    Floating action button (FAB)
    Destructive button
    Split button
    Button group

Основні характеристики кнопок:

    purpose
    visual hierarchy
    size
    shape
    color
    typography
    icon
    padding
    alignment
    interaction states
    accessibility
    responsive behavior

---

### Ключові поняття

✔ button  
✔ button component  
✔ button anatomy  
✔ primary button  
✔ secondary button  
✔ tertiary button  
✔ text button  
✔ icon button  
✔ floating action button (FAB)  
✔ destructive button  
✔ split button  
✔ button group  
✔ call to action (CTA)  
✔ visual hierarchy  
✔ affordance  
✔ signifier  
✔ button label  
✔ action-oriented text  
✔ button size  
✔ button shape  
✔ button padding  
✔ button spacing  
✔ icon placement  
✔ button alignment  
✔ button states  
✔ hover  
✔ focus  
✔ active  
✔ pressed  
✔ disabled  
✔ loading  
✔ selected  
✔ contrast  
✔ touch target  
✔ hit area  
✔ keyboard accessibility  
✔ semantic HTML  
✔ responsive button  
✔ design tokens  
✔ component variants  
✔ component consistency  

---

### Що потрібно пам'ятати

• Button — компонент для виконання дії, а не просто декоративний елемент.

• Кнопка повинна чітко пояснювати, що станеться після натискання.

• Primary button використовується для головної дії в конкретному контексті.

• Secondary button використовується для важливої, але другорядної дії.

• Tertiary button або text button підходить для менш пріоритетних дій.

• Не потрібно робити всі кнопки однаково помітними. Візуальна ієрархія допомагає користувачеві визначити головну дію.

• Label кнопки має бути коротким, зрозумілим і бажано починатися з дієслова.

• Розмір кнопки визначається не лише висотою, а й шириною, внутрішніми відступами, текстом та іконками.

• Кнопки одного призначення в межах застосунку повинні мати узгоджений дизайн.

• Hover, focus, active, disabled і loading — це різні стани компонента.

• Disabled button повинна виглядати неактивною, а її недоступність має бути зрозумілою.

• Focus state потрібен для користувачів, які працюють клавіатурою.

• Icon button повинна мати зрозуміле призначення та доступну назву.

• Не варто використовувати лише колір для передавання значення або стану.

• Кнопки повинні залишатися зручними для натискання на сенсорних екранах.

• Для переходу на іншу сторінку зазвичай краще використовувати link, а для виконання дії — button.

• У веброзробці семантичний HTML допомагає забезпечити доступність та правильну поведінку компонента.

• У design system кнопки зазвичай описують через variants, sizes, states і design tokens.

---

# Що таке Button

Button — це UI component, який представляє дію, доступну користувачеві.

Приклади:

    Save
    Create project
    Submit
    Delete
    Cancel
    Continue
    Sign in
    Add to cart

Кнопка допомагає відповісти на запитання:

    What can I do?
        ↓
    What will happen?
        ↓
    How can I perform this action?

Наприклад, у формі створення профілю:

    Name
    Email
    Password

    [Create account]

Кнопка `Create account` позначає основну дію, яка завершує заповнення форми.

---

# Button vs Link

Button і Link можуть виглядати схоже, але мають різне призначення.

## Button

Button виконує дію.

Приклади:

    Save changes
    Delete item
    Open dialog
    Submit form
    Add product
    Toggle visibility

## Link

Link переміщує користувача до іншого ресурсу або місця.

Приклади:

    Home
    About us
    View profile
    Read documentation
    Open article

Основне правило:

    button → action
    link   → navigation

У вебінтерфейсі:

    <button type="button">
        Open settings
    </button>

    <a href="/settings">
        Settings
    </a>

Перша конструкція виконує дію за допомогою JavaScript або іншого механізму взаємодії.

Друга веде до ресурсу `/settings`.

Важливо: призначення визначається поведінкою елемента, а не його зовнішнім виглядом.

---

# Button Anatomy

Button anatomy — це складові частини кнопки.

Типова кнопка може містити:

    ┌─────────────────────────────┐
    │       [icon] Save changes   │
    └─────────────────────────────┘

Основні частини:

    container
    label
    icon
    padding
    border
    background
    focus indicator

## Container

Container — область, яка формує зовнішній вигляд кнопки.

Вона визначає:

    background
    border
    border-radius
    dimensions
    interaction area

## Label

Label — текст кнопки.

Приклади:

    Save
    Cancel
    Continue
    Create project

Label повинен пояснювати дію, а не змушувати користувача здогадуватися.

## Icon

Icon — графічний символ, який допомагає передати значення дії.

Наприклад:

    [＋] Add item
    [×] Close
    [↓] Download
    [✎] Edit

Іконка може бути розташована перед текстом або після нього.

## Padding

Padding — внутрішній простір між вмістом кнопки та її межами.

    button
    ┌───────────────────────┐
    │   padding             │
    │     Save              │
    │             padding   │
    └───────────────────────┘

Padding впливає на:

    button size
    visual balance
    readability
    touch target

## Border

Border — межа кнопки.

Вона може бути:

    visible
    transparent
    absent

Secondary buttons часто використовують border для відокремлення від фону.

## Background

Background — колір або інше тло кнопки.

Наприклад:

    primary   → filled background
    secondary → subtle background
    tertiary  → transparent background

Це поширені підходи, але не універсальні правила для всіх design systems.

---

# Button Hierarchy

Button hierarchy — це візуальна ієрархія кнопок.

Вона показує, яка дія є головною, а які — другорядними.

Наприклад:

    ┌──────────────────────────────┐
    │ Create project               │
    │                              │
    │ [Create project]             │
    │ [Save draft]                 │
    │ Cancel                       │
    └──────────────────────────────┘

Тут:

    Create project → primary
    Save draft     → secondary
    Cancel         → tertiary

Візуальна ієрархія може створюватися за допомогою:

    color
    contrast
    background
    border
    typography
    size
    spacing
    position

Primary button зазвичай має найвиразніше оформлення.

Secondary button менш помітна, але залишається достатньо зрозумілою.

Tertiary button має мінімальне візуальне оформлення.

Важливо: tertiary button не обов'язково має бути текстовою. Конкретний вигляд залежить від дизайн-системи.

---

# Primary Button

Primary button — кнопка для головної дії в певному контексті.

Приклади:

    Sign in
    Create account
    Save changes
    Publish
    Continue
    Place order

Primary button допомагає користувачеві швидко знайти найважливішу дію.

Типові характеристики:

    strong visual emphasis
    clear label
    sufficient contrast
    recognizable shape
    consistent placement

Приклад:

    ┌──────────────────────────┐
    │       Save changes       │
    └──────────────────────────┘

Primary button часто використовує заповнений фон.

Наприклад:

    background: blue
    color: white

Але primary button не обов'язково повинна бути синьою.

Її колір визначається палітрою та design tokens конкретного продукту.

## Коли використовувати

    form submission
    account creation
    purchase confirmation
    saving important changes
    completing a workflow
    creating a resource

## Скільки primary buttons потрібно

На одному екрані може бути кілька primary buttons, якщо існують незалежні сценарії або окремі контексти.

Однак у межах одного компактного блоку або форми зазвичай корисно виділяти одну основну дію.

Не потрібно механічно застосовувати правило «одна primary button на всю сторінку».

---

# Secondary Button

Secondary button — кнопка для важливої, але другорядної дії.

Приклади:

    Cancel
    Save draft
    Preview
    Back
    Edit details

Типові характеристики:

    lower visual emphasis than primary
    clear label
    sufficient contrast
    consistent border or background

Приклад:

    ┌──────────────────────────┐
    │       Save draft         │
    └──────────────────────────┘

Secondary button може мати:

    outlined style
    subtle background
    neutral fill

Наприклад:

    background: transparent
    border: 1px solid gray
    color: dark

Це лише один із можливих варіантів оформлення.

## Коли використовувати

    optional actions
    alternative actions
    supporting actions
    previewing content
    saving an unfinished form

---

# Tertiary Button

Tertiary button — кнопка з мінімальним візуальним акцентом.

Часто вона не має виразного фону або видимої рамки.

Приклади:

    Cancel
    Learn more
    Skip
    Dismiss

Типовий вигляд:

    Cancel

Або:

    [Learn more]

Tertiary button підходить для дій, які не повинні конкурувати з основною дією.

Однак її текст і інтерактивний стан мають залишатися зрозумілими.

Не слід робити таку кнопку настільки непомітною, щоб користувач не міг зрозуміти, що це інтерактивний елемент.

---

# Text Button

Text button — кнопка, візуальне оформлення якої зосереджене переважно на тексті.

Наприклад:

    View details
    Cancel
    Learn more

Типові характеристики:

    no prominent filled background
    minimal border treatment
    text-based visual emphasis

Text button часто використовується:

    inside cards
    in toolbars
    in dialogs
    near form fields
    in compact action areas

Приклад:

    ┌───────────────────────────────┐
    │ Profile                       │
    │ Update your personal details. │
    │                               │
    │ Edit profile                  │
    └───────────────────────────────┘

Важливо: text button не є тим самим, що link.

Навіть якщо вони виглядають однаково, button виконує дію, а link здійснює навігацію.

---

# Icon Button

Icon button — кнопка, яка використовує іконку замість текстового підпису або разом із ним.

Приклади:

    [×] Close
    [✎] Edit
    [⌫] Delete
    [⋯] More options
    [🔍] Search

Icon buttons допомагають економити простір і роблять інтерфейс компактнішим.

Типові місця використання:

    toolbars
    tables
    cards
    navigation bars
    media controls
    modal windows

## Icon-only button

Icon-only button містить лише іконку.

    [×]

    [⋯]

    [✎]

Перевага:

    compact interface

Ризик:

    unclear meaning

Не всі іконки очевидні для користувачів.

Наприклад, три крапки можуть означати додаткові дії, але це не завжди зрозуміло без контексту.

Тому icon-only button повинна мати доступну назву.

У HTML це можна реалізувати через `aria-label`:

    <button type="button" aria-label="Close dialog">
        <svg aria-hidden="true">
            <!-- icon -->
        </svg>
    </button>

Тут:

    aria-label → accessible name
    aria-hidden → декоративна іконка не дублює назву

Цей приклад ілюструє загальний підхід. Для реальної SVG-іконки також потрібно правильно оформити сам SVG.

## Icon + label

Якщо призначення кнопки неочевидне, можна використовувати іконку разом із текстом.

    [＋] Add member

    [↓] Download report

    [✎] Edit profile

Текст робить призначення дії зрозумілішим.

---

# Floating Action Button (FAB)

Floating Action Button (FAB) — кнопка, яка візуально відокремлена від основного вмісту та розташована поверх інтерфейсу.

Часто FAB використовується для однієї головної дії.

Приклади:

    [+] Create
    [+] New message
    [+] Add note

Типове розташування:

    ┌──────────────────────────────┐
    │                              │
    │          Main content        │
    │                              │
    │                              │
    │                       [ + ]  │
    └──────────────────────────────┘

FAB може мати:

    circular shape
    elevated appearance
    strong visual emphasis
    icon
    optional text label

FAB особливо поширена в мобільних інтерфейсах, але може використовуватися і в інших продуктах.

## Коли використовувати

    creating a new item
    composing a message
    adding content
    starting a frequent primary action

Не варто використовувати FAB для кожної доступної дії.

Вона повинна позначати справді важливу або часто використовувану функцію.

---

# Destructive Button

Destructive button — кнопка, яка виконує потенційно руйнівну або небезпечну дію.

Приклади:

    Delete account
    Remove member
    Delete project
    Permanently erase data

Такі дії можуть:

    delete data
    remove access
    destroy a resource
    cause difficult-to-reverse changes

Для destructive actions часто використовують червоний або інший попереджувальний колір.

Наприклад:

    [Delete project]

Однак значення має не лише колір.

Потрібно враховувати:

    clear action label
    visual warning
    confirmation requirements
    reversibility
    user impact

## Destructive vs secondary

Destructive button визначається призначенням дії, а не лише рівнем візуальної ієрархії.

Наприклад, `Delete project` може бути другорядною за частотою дії, але все одно потребувати destructive styling.

## Підтвердження небезпечної дії

Для серйозних або незворотних операцій можна використати confirmation dialog.

    Delete project?

    This action cannot be undone.

    [Cancel] [Delete project]

Для звичайної дії підтвердження не завжди потрібне.

Рішення залежить від наслідків помилки та можливості відновлення даних.

---

# Split Button

Split button — компонент, який об'єднує основну дію та окрему кнопку для вибору додаткових варіантів.

Приклад:

    ┌──────────────────────────────┐
    │ Save                    [▼]  │
    └──────────────────────────────┘

Основна частина:

    Save

Додаткова частина:

    ▼

Можливі дії:

    Save
    Save as draft
    Save and close
    Save and publish

Split button допомагає об'єднати пов'язані команди в одному компактному компоненті.

Важливо розрізняти:

    main action
    dropdown trigger

Обидві частини повинні мати зрозумілу поведінку.

Якщо стрілка відкриває меню, ця дія має бути доступною окремо та коректно працювати з клавіатурою.

---

# Button Group

Button group — група кнопок, об'єднаних спільним контекстом або призначенням.

Приклад:

    [Day] [Week] [Month]

Інший приклад:

    [Left] [Center] [Right]

Button groups використовуються для:

    choosing a view
    selecting an alignment
    controlling a media player
    switching between related modes
    grouping related actions

## Segmented Control

Segmented control — різновид групи кнопок, у якій варіанти візуально об'єднані в один компонент.

Приклад:

    ┌──────────┬──────────┬──────────┐
    │   Day    │   Week   │  Month   │
    └──────────┴──────────┴──────────┘

Зазвичай один варіант вибраний.

Segmented control часто використовується для перемикання між невеликою кількістю взаємовиключних режимів.

Не кожна група кнопок є segmented control.

Button group може містити незалежні дії, а segmented control зазвичай представляє вибір одного режиму або значення.

## Важливо

Потрібно чітко розрізняти:

    action group
    selection group

Action group:

    кілька незалежних команд

Selection group:

    вибір одного або кількох варіантів

Якщо користувач вибирає один із взаємовиключних варіантів, потрібно правильно передати стан вибору та забезпечити доступність.

---

# Call to Action (CTA)

Call to Action (CTA) — елемент інтерфейсу, який спонукає користувача виконати конкретну дію.

Приклади:

    Start free trial
    Create account
    Book appointment
    Get started
    Subscribe
    Download guide

CTA — це не окремий технічний тип кнопки.

CTA описує роль елемента в користувацькому сценарії.

Наприклад:

    Primary button → візуальна роль
    CTA            → комунікативна роль

Одна кнопка може одночасно бути:

    primary button
    CTA
    submit button

## Хороший CTA

Хороший CTA зазвичай:

    uses a clear verb
    explains the next action
    matches the user's expectations
    avoids unnecessary wording
    fits the current context

Приклад:

    Continue

Це короткий напис, але його значення залежить від контексту.

Більш конкретний варіант:

    Continue to payment

може бути зрозумілішим у відповідному сценарії.

## Порівняння

Менш конкретно:

    Click here
    Submit
    OK

Більш конкретно:

    Download report
    Create account
    Save changes

`Submit` та `OK` не завжди є поганими написами. Вони можуть бути доречними, якщо контекст достатньо зрозумілий.

---

# Button Labels

Button label — текст, який пояснює призначення кнопки.

Він має бути:

    clear
    concise
    specific
    action-oriented
    consistent

## Використання дієслів

Приклади:

    Save
    Create
    Edit
    Delete
    Continue
    Download
    Search
    Publish

Дієслово допомагає користувачеві зрозуміти очікуваний результат.

## Конкретні назви

Менш конкретно:

    Action
    Click
    More
    OK

Більш конкретно:

    Add member
    Delete account
    View details
    Export data

## Послідовність

У межах одного продукту варто використовувати однакові назви для однакових дій.

Наприклад, якщо дія збереження всюди називається `Save`, не потрібно без причини чергувати:

    Save
    Store
    Apply
    Submit

Ці слова можуть мати різні значення, тому краще визначити узгоджену термінологію.

## Довжина label

Короткі назви зазвичай легше сканувати.

Однак не потрібно скорочувати текст настільки, що він стає незрозумілим.

Поганий приклад:

    Conf.

Кращий варіант:

    Confirm

Або, залежно від контексту:

    Confirm order

---

# Button Size

Button size — це набір розмірних характеристик компонента.

Зазвичай враховуються:

    height
    width
    padding
    font-size
    line-height
    icon-size
    gap

У дизайн-системах часто використовують такі варіанти:

    Small
    Medium
    Large

Приклад концептуальної системи:

    Small  → компактні інтерфейси
    Medium → стандартні дії
    Large  → помітні або мобільні CTA

Це приклади призначення, а не універсальні вимоги.

## Small Button

Small button підходить для компактних інтерфейсів.

Приклади:

    table actions
    dense toolbars
    compact cards

Не варто робити її настільки маленькою, щоб її було важко натиснути або прочитати.

## Medium Button

Medium button часто використовується як стандартний розмір.

Приклади:

    forms
    dialogs
    cards
    general actions

## Large Button

Large button може використовуватися для:

    prominent CTA
    mobile interfaces
    important form actions
    onboarding flows

Розмір повинен відповідати контексту, а не просто підвищувати помітність кожної дії.

---

# Button Width

Кнопки можуть мати різну ширину.

Основні варіанти:

    auto width
    fixed width
    minimum width
    full width

## Auto Width

Ширина визначається вмістом та відступами.

    ┌─────────────────┐
    │ Save            │
    └─────────────────┘

Це поширений підхід для звичайних кнопок.

## Fixed Width

Кнопка має визначену ширину.

Фіксована ширина може бути корисною, коли потрібно вирівняти кілька однакових елементів.

Але вона може створювати проблеми, якщо текст довший або інтерфейс перекладений іншою мовою.

## Full Width

Кнопка займає всю доступну ширину контейнера.

    ┌──────────────────────────────┐
    │         Sign in              │
    └──────────────────────────────┘

Full-width buttons часто використовуються в:

    mobile forms
    login screens
    onboarding
    narrow card layouts

## Основне правило

Не потрібно робити всі кнопки однакової ширини заради формальної одноманітності.

Важливіші:

    alignment
    consistency
    readability
    responsive behavior
    content fit

---

# Button Shape

Shape — форма кнопки.

Поширені варіанти:

    rectangular
    slightly rounded
    rounded
    pill-shaped
    circular

## Rectangular

    ┌──────────────┐
    │    Save      │
    └──────────────┘

Має прямокутну форму з мінімальним заокругленням або без нього.

## Rounded

    ╭──────────────╮
    │    Save      │
    ╰──────────────╯

Має заокруглені кути.

## Pill Button

    ╭────────────────╮
    │     Continue   │
    ╰────────────────╯

Має дуже заокруглені краї.

## Circular Button

    ( + )

Часто використовується для icon-only buttons або FAB.

## Consistency

Форма кнопок повинна відповідати загальній візуальній мові інтерфейсу.

Наприклад:

    cards          → rounded corners
    buttons        → matching radius
    inputs         → matching radius
    dialogs        → matching radius

Не обов'язково використовувати однаковий radius для всіх компонентів.

Головне — створити узгоджену систему.

---

# Padding and Spacing

Padding і spacing впливають на зручність, баланс та читабельність кнопок.

Padding:

    простір усередині кнопки

Spacing:

    відстань між кнопкою та іншими елементами

Наприклад:

    [Save]    [Cancel]

Відстань між кнопками повинна бути достатньою, щоб вони не виглядали одним нерозділеним елементом.

## Horizontal Padding

Відступ зліва та справа від тексту.

Він допомагає кнопці виглядати збалансовано.

## Vertical Padding

Відступ зверху та знизу.

Він впливає на висоту компонента та зручність натискання.

## Icon Gap

Якщо кнопка містить іконку та текст, між ними потрібна відповідна відстань.

    [icon]  Save

Відстань повинна бути достатньою для розділення елементів, але не настільки великою, щоб вони виглядали незалежними.

## Button Group Spacing

Для кількох кнопок потрібно враховувати:

    gap
    alignment
    order
    grouping
    wrapping

Наприклад:

    [Save changes] [Cancel]

У деяких сценаріях primary button розташовують першою, в інших — другою. Вибір залежить від платформи, користувацьких очікувань і контексту.

---

# Button Color

Колір допомагає відрізняти типи кнопок та показувати їхню важливість.

Типові ролі кольору:

    primary
    secondary
    neutral
    destructive
    success
    warning

Але не всі ці ролі обов'язково повинні бути представлені окремими стилями кнопок.

## Primary Color

Колір основної дії.

Наприклад:

    primary background
    contrasting text

## Neutral Color

Нейтральні кольори використовуються для другорядних дій.

Наприклад:

    gray background
    neutral border
    dark text

## Destructive Color

Попереджувальний колір для дій, які можуть спричинити втрату даних або інші небажані наслідки.

## Contrast

Текст і значущі елементи кнопки повинні мати достатній контраст із фоном.

Не слід покладатися лише на колір для позначення:

    selected
    disabled
    destructive
    success

Додатково можуть використовуватися:

    text
    icons
    borders
    shapes
    state indicators

---

# Button Typography

Typography визначає вигляд тексту кнопки.

Основні характеристики:

    font-family
    font-size
    font-weight
    line-height
    letter-spacing
    text-transform

## Font Size

Текст повинен залишатися читабельним у відповідному контексті.

## Font Weight

Для primary button може використовуватися більш виразна вага шрифту.

Однак надмірно жирний текст не завжди покращує читабельність.

## Line Height

Line height впливає на вертикальне вирівнювання та сприйняття тексту.

## Text Transform

Приклади:

    Save changes
    SAVE CHANGES
    Save Changes

Зазвичай sentence case добре читається в інтерфейсах:

    Save changes
    Create account
    Delete project

Але конкретне правило визначається дизайн-системою.

## Typography Consistency

Кнопки одного типу повинні мати узгоджені текстові стилі.

Наприклад:

    primary button → typography.button-primary
    secondary button → typography.button-secondary

Назви умовні. У реальному проєкті вони залежать від системи design tokens.

---

# Button States

Button states — це стани кнопки під час взаємодії або зміни доступності.

Основні стани:

    default
    hover
    focus
    active
    disabled
    loading

Також залежно від компонента можуть використовуватися:

    selected
    pressed
    expanded

Ці стани не є взаємозамінними.

Наприклад:

    hover  → pointer над елементом
    focus  → елемент отримав фокус
    active → момент активної взаємодії
    disabled → дія недоступна

Детальніше стани компонентів розглядаються в розділі:

    06-component-states

---

# Default State

Default state — стандартний стан кнопки, коли користувач ще не взаємодіє з нею.

Наприклад:

    ┌────────────────────┐
    │        Save        │
    └────────────────────┘

Потрібно визначити:

    background
    text color
    border
    radius
    typography
    padding
    dimensions

Default state є основою для інших станів компонента.

---

# Hover State

Hover state — стан, який виникає, коли вказівник миші знаходиться над кнопкою.

Наприклад:

    default → normal background
    hover   → slightly darker background

Hover може змінювати:

    background
    border-color
    text-color
    shadow
    opacity

Hover допомагає показати, що елемент інтерактивний.

Але hover не повинен бути єдиним способом повідомити про інтерактивність.

На сенсорних екранах hover може бути відсутнім або працювати інакше.

---

# Focus State

Focus state — стан, який показує, що кнопка отримала фокус.

Це особливо важливо для користувачів, які переміщуються інтерфейсом за допомогою клавіатури.

Приклад:

    ┌────────────────────┐
    │        Save        │
    └────────────────────┘
       focus outline

Focus indicator може бути реалізований через:

    outline
    border
    contrasting ring
    other visible indicator

Не варто повністю прибирати focus indicator без доступної альтернативи.

У CSS:

    button:focus-visible {
        outline: 3px solid currentColor;
        outline-offset: 3px;
    }

Це спрощений приклад. У production-дизайні потрібно перевірити контраст і видимість індикатора на різних фонах.

`focus-visible` дозволяє браузеру враховувати ситуації, коли видимий індикатор фокусу особливо потрібний, наприклад під час клавіатурної навігації.

---

# Active State

Active state — стан під час активної взаємодії, наприклад під час натискання кнопки.

Він може візуально показувати, що дія зараз активується.

Наприклад:

    default → normal
    hover   → highlighted
    active  → pressed appearance

Для active state можна використовувати:

    darker background
    subtle transform
    shadow change
    border change

Анімація повинна бути короткою та не заважати взаємодії.

---

# Disabled State

Disabled state — стан, у якому кнопка недоступна для взаємодії.

Приклад:

    ┌────────────────────┐
    │        Save        │
    └────────────────────┘
          disabled

Типові причини:

    required fields are missing
    operation is unavailable
    prerequisite is not satisfied
    action is temporarily prohibited

Disabled button часто має:

    muted colors
    reduced visual emphasis
    no normal hover response

Але сам вигляд не є достатнім поясненням причини недоступності.

Якщо це важливо для користувача, потрібно пояснити, що саме необхідно зробити.

Наприклад:

    Enter your email to continue.

## Disabled vs Loading

Disabled:

    дія зараз недоступна

Loading:

    дія виконується або очікує завершення процесу

Кнопка може бути тимчасово disabled під час loading, щоб уникнути повторного запуску.

Але ці поняття не тотожні.

---

# Loading State

Loading state — стан кнопки, який показує, що дія виконується.

Приклад:

    [◌ Saving...]

Або:

    [Spinner] Saving

Loading часто використовується під час:

    submitting a form
    saving data
    uploading a file
    processing a payment
    sending a request to a server

Можливі елементи:

    spinner
    progress indicator
    updated label
    disabled interaction

## Хороший Loading State

Користувач повинен розуміти:

    action has started
    operation is in progress
    repeated activation may be unnecessary

Приклад:

    Save changes
         ↓
    Saving...
         ↓
    Saved

Але повідомлення `Saved` може бути окремим feedback-компонентом, а не станом кнопки.

## Важливо

Не можна створювати враження, що дія успішно завершена, якщо операція ще виконується.

Під час асинхронного запиту loading state має відповідати реальному стану операції.

---

# Selected and Pressed States

Selected та pressed можуть виглядати схоже, але мають різне значення.

## Pressed

Pressed може позначати активний стан взаємодії або toggle-кнопку, яка залишається увімкненою.

## Selected

Selected позначає вибраний варіант або активний режим.

Наприклад:

    [Day] [Week] [Month]

Якщо вибрано `Week`:

    [Day] [Week ✓] [Month]

У реальному інтерфейсі вибір може позначатися фоном, рамкою, іконкою або іншим індикатором.

Для доступних toggle buttons можуть використовуватися відповідні ARIA-атрибути, наприклад `aria-pressed`, якщо їхня поведінка відповідає семантиці toggle button.

---

# Button Interaction

Interaction — це поведінка кнопки під час взаємодії з користувачем.

Основні способи:

    mouse click
    keyboard activation
    touch
    assistive technology interaction

Кнопка повинна:

    respond predictably
    provide visible feedback
    avoid accidental repeated actions
    communicate its state
    support appropriate input methods

## Mouse

Користувач наводить вказівник і натискає кнопку.

## Keyboard

Користувач переходить між елементами за допомогою `Tab` та активує кнопку клавішею `Enter` або `Space` відповідно до стандартної поведінки HTML button.

## Touch

Користувач натискає кнопку на сенсорному екрані.

Інтерактивна область повинна бути достатньою для зручного натискання.

## Feedback

Після натискання користувач повинен розуміти, що сталося.

Feedback може включати:

    visual state change
    loading indicator
    success message
    error message
    dialog
    updated content

Не кожна дія потребує окремого повідомлення, якщо результат і так очевидний.

---

# Touch Target

Touch target — область, у межах якої користувач може натиснути інтерактивний елемент.

Важливо розрізняти:

    visual size
    interactive size

Іконка може мати розмір 16 × 16 px, але її інтерактивна область може бути більшою.

Наприклад:

    small icon
        ↓
    larger clickable area

WCAG 2.2 містить критерій 2.5.8 Target Size (Minimum), рівень AA, з базовою вимогою 24 × 24 CSS px або достатнім проміжком між цілями, з передбаченими критерієм винятками.

Це не означає, що 24 × 24 px завжди є оптимальним розміром кнопки.

Для зручності використання часто обирають більші інтерактивні області, особливо на мобільних пристроях.

Наприклад, рекомендація близько 44 × 44 CSS px може бути корисною ціллю проєктування, але її не слід плутати з мінімальною вимогою WCAG 2.2 AA.

---

# Button Accessibility

Accessibility — це здатність інтерфейсу залишатися зрозумілим і придатним для використання людьми з різними можливостями.

Для кнопок важливі:

    semantic HTML
    accessible name
    keyboard support
    visible focus
    color contrast
    understandable states
    sufficient target size

## Semantic HTML

Для звичайної кнопки дії використовується елемент:

    <button type="button">
        Open settings
    </button>

Не потрібно без причини замінювати його на:

    <div>
        Open settings
    </div>

Звичайний `div` не має стандартної поведінки кнопки.

Щоб зробити його повноцінним доступним інтерактивним елементом, довелося б додатково реалізовувати семантику, фокус, клавіатурну взаємодію та інші аспекти.

Тому стандартний HTML button зазвичай є кращим вибором.

## Accessible Name

Кнопка повинна мати доступну назву, яка пояснює її призначення.

Наприклад:

    <button type="button">
        Save changes
    </button>

Для icon-only button:

    <button type="button" aria-label="Delete item">
        <svg aria-hidden="true">
            <!-- icon -->
        </svg>
    </button>

Доступна назва не обов'язково має бути видимим текстом, але повинна бути зрозумілою.

## Keyboard Accessibility

Кнопка повинна бути доступною для клавіатурної навігації.

Для стандартного HTML button браузер забезпечує базову клавіатурну поведінку.

## Focus Visibility

Користувач повинен бачити, який елемент зараз має фокус.

Не варто покладатися виключно на hover.

## Color Contrast

Текст кнопки та індикатори її станів повинні залишатися достатньо контрастними.

## Disabled Controls

Недоступний стан повинен бути зрозумілим.

Якщо причина недоступності важлива, її потрібно пояснити.

---

# Button in Forms

У формах кнопки виконують різні ролі.

Основні варіанти:

    submit button
    reset button
    regular action button

## Submit Button

Submit button відправляє форму.

    <form>
        <label for="email">
            Email
        </label>

        <input
            id="email"
            name="email"
            type="email"
            required
        />

        <button type="submit">
            Continue
        </button>
    </form>

`type="submit"` визначає, що кнопка відправляє форму.

## Reset Button

Reset button скидає поля форми до початкових значень.

    <button type="reset">
        Reset form
    </button>

Reset може бути небезпечним для користувацького досвіду, якщо людина випадково втратить введені дані.

Тому використовувати його потрібно обдумано.

## Regular Action Button

Кнопка виконує іншу дію, наприклад відкриває підказку або перемикає видимість пароля.

    <button type="button">
        Show password
    </button>

## Важливо: type

Усередині форми кнопка без явно визначеного `type` зазвичай поводиться як submit button.

Тому для звичайних дій доцільно явно вказувати:

    type="button"

Для відправлення форми:

    type="submit"

Для скидання:

    type="reset"

---

# Button and Microcopy

Microcopy — короткі текстові повідомлення в інтерфейсі, які допомагають користувачеві зрозуміти дію, стан або наслідки.

Кнопка часто працює разом із microcopy.

Наприклад:

    Delete account

    This action permanently removes your account.

    [Cancel] [Delete account]

Текст перед кнопкою пояснює наслідки дії.

Інший приклад:

    Password

    Use at least 12 characters.

    [Create account]

Microcopy особливо важлива для:

    destructive actions
    payments
    account management
    security settings
    complex forms

Не потрібно пояснювати кожну очевидну дію окремим абзацом.

Пояснення має бути пропорційним складності та ризику дії.

---

# Button Placement

Button placement — розташування кнопки в інтерфейсі.

Поширені місця:

    form footer
    card footer
    dialog footer
    page header
    toolbar
    bottom action area

## Form Footer

    Email
    Password

    [Sign in]

Головна кнопка зазвичай розташовується поруч із завершенням форми.

## Card Footer

    ┌──────────────────────────────┐
    │ Course title                 │
    │ Course description           │
    │                              │
    │ [View course]                │
    └──────────────────────────────┘

Кнопка пов'язана з вмістом картки.

## Dialog Footer

    ┌──────────────────────────────┐
    │ Delete project?              │
    │                              │
    │ [Cancel] [Delete project]    │
    └──────────────────────────────┘

Кнопки групуються в нижній частині діалогового вікна.

## Page Header

    Dashboard              [Create project]

Головна дія може розташовуватися в заголовку сторінки, якщо це відповідає основному сценарію.

## Важливо

Розташування кнопок залежить від:

    user expectations
    platform conventions
    action priority
    reading direction
    screen size
    surrounding content

Не існує одного правильного розташування для всіх ситуацій.

---

# Button Alignment

Alignment — вирівнювання кнопок відносно інших елементів.

Поширені варіанти:

    left
    center
    right
    full width
    space between

Наприклад:

    [Cancel] [Save]

Або:

    [Save] [Cancel]

Вибір залежить від контексту та усталених шаблонів конкретної платформи.

Для групи кнопок важливо:

    maintain consistent gap
    align baselines
    avoid awkward wrapping
    preserve logical order

На мобільних екранах кнопки можуть розташовуватися вертикально, якщо горизонтального простору недостатньо.

---

# Responsive Buttons

Responsive button — кнопка, яка адаптується до доступного простору та способу використання інтерфейсу.

Важливо враховувати:

    viewport width
    text length
    touch interaction
    button group wrapping
    responsive layout
    localization

## Desktop

На широкому екрані кнопки можуть розташовуватися в одному рядку.

    [Save changes] [Cancel]

## Mobile

На вузькому екрані група може переходити до вертикального розташування.

    [Save changes]

    [Cancel]

Це лише один із можливих варіантів. Інколи краще залишити кнопки в одному рядку.

## Full-width Mobile Button

    ┌──────────────────────────────┐
    │         Continue             │
    └──────────────────────────────┘

Full-width button може спростити взаємодію у вузькому інтерфейсі.

## Довгі назви

Потрібно перевіряти, як кнопка поводиться, якщо текст збільшується.

Причини:

    localization
    long labels
    user font settings
    text zoom
    narrow containers

Не варто автоматично обрізати важливий текст без продуманого рішення.

---

# Button Design Tokens

Design tokens — це повторно використовувані значення дизайну.

Для кнопок можуть використовуватися:

    color tokens
    spacing tokens
    radius tokens
    typography tokens
    size tokens
    state tokens
    shadow tokens

Наприклад:

    color.primary
    color.primary-hover
    color.text-on-primary
    spacing.button-x
    spacing.button-y
    radius.button
    typography.button
    size.button-md

Це умовні назви. Реальна структура токенів може відрізнятися.

## Навіщо потрібні tokens

Вони допомагають:

    maintain consistency
    update styles globally
    support themes
    reduce duplicated values
    simplify component maintenance

Наприклад, якщо всі primary buttons використовують один токен кольору, зміна цього токена може оновити компоненти послідовно.

---

# Button Variants

Variant — варіант зовнішнього вигляду компонента, який відповідає певній ролі.

Наприклад:

    primary
    secondary
    tertiary
    destructive
    outline
    ghost

Важливо: назви можуть описувати різні аспекти.

`Primary` та `secondary` зазвичай позначають візуальну ієрархію.

`Destructive` описує характер дії.

`Outline` та `ghost` часто описують спосіб візуального оформлення.

Тому не всі ці назви є взаємовиключними категоріями.

Наприклад, destructive button може одночасно мати outline style.

## Variant vs Size

Variant:

    Яку роль або стиль має кнопка?

Size:

    Якого розміру має бути кнопка?

Наприклад:

    primary + small
    primary + medium
    secondary + medium
    destructive + large

Комбінації залежать від правил конкретної дизайн-системи.

---

# Button Component in Design Systems

У design system кнопка зазвичай має систематизовані правила.

Приклад структури:

    Button
    ├── Variants
    │   ├── Primary
    │   ├── Secondary
    │   ├── Tertiary
    │   └── Destructive
    │
    ├── Sizes
    │   ├── Small
    │   ├── Medium
    │   └── Large
    │
    ├── States
    │   ├── Default
    │   ├── Hover
    │   ├── Focus
    │   ├── Active
    │   ├── Disabled
    │   └── Loading
    │
    └── Content
        ├── Label
        ├── Leading icon
        └── Trailing icon

Це приклад організації компонента, а не обов'язкова структура кожної системи.

## Навіщо це потрібно

Design system допомагає уникати ситуацій, коли однакові кнопки мають випадково різні:

    colors
    paddings
    radii
    fonts
    states
    interaction rules

Компонент повинен бути достатньо гнучким, але не настільки універсальним, щоб втрачати зрозумілість.

---

# Buttons in Figma

Під час створення UI-дизайну кнопки часто оформлюються як компоненти у Figma або іншому інструменті дизайну.

Для кнопки корисно передбачити:

    component
    variants
    properties
    auto layout
    padding
    spacing
    constraints
    interaction states

## Component

Базова кнопка створюється як повторно використовуваний компонент.

## Variants

Variants дозволяють організувати різні типи кнопок.

Наприклад:

    Type: Primary
    Type: Secondary
    Type: Destructive

Окрема властивість може описувати розмір:

    Size: Small
    Size: Medium
    Size: Large

## Auto Layout

Auto Layout допомагає кнопці адаптуватися до довжини тексту та наявності іконок.

Наприклад:

    [Save]

    [Save changes]

    [Save all changes]

Кнопка може зберігати визначені внутрішні відступи, а її ширина змінюватиметься залежно від вмісту.

## Interaction States

У макеті потрібно продумати не лише default state, а й інші важливі стани.

Наприклад:

    default
    hover
    focus
    pressed
    disabled
    loading

Не завжди потрібно створювати окремий візуальний екран для кожного стану.

Але правила поведінки мають бути визначені.

---

# Button Design in CSS

У веброзробці кнопки реалізуються за допомогою HTML та CSS.

## Базова кнопка

    <button type="button" class="button">
        Save changes
    </button>

CSS:

    .button {
        padding: 0.75rem 1.25rem;
        border: 1px solid transparent;
        border-radius: 0.5rem;
        font: inherit;
        cursor: pointer;
    }

Тут:

    padding → внутрішні відступи
    border → межа компонента
    border-radius → заокруглення
    font: inherit → успадкування шрифту
    cursor → вказівник миші

Важливо: `cursor: pointer` сам по собі не робить елемент доступним або інтерактивним. Семантика та поведінка забезпечуються передусім HTML та логікою компонента.

---

# Primary Button in CSS

HTML:

    <button type="button" class="button button--primary">
        Save changes
    </button>

CSS:

    .button--primary {
        background-color: #2457d6;
        color: #ffffff;
        border-color: #2457d6;
    }

Це приклад оформлення, а не універсальна рекомендація щодо конкретного кольору.

Потрібно перевірити контраст тексту, фону та станів компонента.

---

# Secondary Button in CSS

HTML:

    <button type="button" class="button button--secondary">
        Cancel
    </button>

CSS:

    .button--secondary {
        background-color: transparent;
        color: #243047;
        border-color: #aab3c2;
    }

Secondary button має інше візуальне оформлення, але повинна залишатися чітко помітною.

---

# Button Hover and Focus in CSS

CSS:

    .button--primary:hover {
        background-color: #1947b8;
    }

    .button:focus-visible {
        outline: 3px solid #6d9cff;
        outline-offset: 3px;
    }

Hover state змінює фон.

Focus state додає видимий індикатор фокусу.

У production-проєкті потрібно перевірити ці стани на всіх фонах і для всіх варіантів кнопки.

---

# Disabled Button in CSS

HTML:

    <button
        type="button"
        class="button"
        disabled
    >
        Save changes
    </button>

CSS:

    .button:disabled {
        opacity: 0.55;
        cursor: not-allowed;
    }

Атрибут `disabled` для стандартної HTML button забезпечує її недоступність для звичайної взаємодії.

CSS змінює зовнішній вигляд, але сам по собі не створює disabled behavior.

Не слід використовувати лише зменшення opacity як єдину гарантію зрозумілості стану.

---

# Button Variants in CSS

Для кількох варіантів зручно використовувати спільний клас і модифікатори.

HTML:

    <button class="button button--primary" type="button">
        Save
    </button>

    <button class="button button--secondary" type="button">
        Cancel
    </button>

    <button class="button button--destructive" type="button">
        Delete
    </button>

CSS:

    .button {
        padding: 0.75rem 1.25rem;
        border: 1px solid transparent;
        border-radius: 0.5rem;
        font: inherit;
    }

    .button--primary {
        background-color: #2457d6;
        color: #ffffff;
    }

    .button--secondary {
        background-color: transparent;
        color: #243047;
        border-color: #aab3c2;
    }

    .button--destructive {
        background-color: #b42318;
        color: #ffffff;
    }

Тут використано підхід, у якому:

    button → base component
    button--primary → primary variant
    button--secondary → secondary variant
    button--destructive → destructive variant

Це приклад naming convention, схожої на BEM.

---

# Button with Icon

HTML:

    <button type="button" class="button">
        <span aria-hidden="true">+</span>
        <span>Add item</span>
    </button>

CSS:

    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

`inline-flex` дозволяє вирівняти іконку й текст.

`align-items: center` вирівнює їх по вертикалі.

`gap` визначає відстань між елементами.

У реальному проєкті замість текстового символу можна використовувати SVG-іконку або компонент іконки.

Якщо іконка декоративна, її не потрібно повторно озвучувати скринрідером.

---

# Button Loading Example

HTML:

    <button type="button" class="button" disabled>
        <span aria-hidden="true">◌</span>
        <span>Saving...</span>
    </button>

Це статичний приклад візуального стану loading.

У справжньому застосунку потрібно пов'язати цей стан із фактичним виконанням операції.

Наприклад:

    idle
      ↓
    loading
      ↓
    success / error

Після завершення запиту кнопка може повернутися до звичайного стану, а результат операції — відображатися окремим повідомленням.

---

# Button Component in React

У React кнопка може бути повторно використовуваним компонентом.

Приклад простої реалізації:

    type ButtonProps = {
        children: React.ReactNode;
        variant?: "primary" | "secondary" | "destructive";
        type?: "button" | "submit" | "reset";
        disabled?: boolean;
        onClick?: () => void;
    };

    function Button({
        children,
        variant = "primary",
        type = "button",
        disabled = false,
        onClick,
    }: ButtonProps) {
        return (
            <button
                type={type}
                className={`button button--${variant}`}
                disabled={disabled}
                onClick={onClick}
            >
                {children}
            </button>
        );
    }

Приклад використання:

    <Button variant="primary" onClick={handleSave}>
        Save changes
    </Button>

    <Button variant="secondary" onClick={handleCancel}>
        Cancel
    </Button>

Це спрощений приклад. Для реального компонента можуть знадобитися додаткові props, наприклад:

    aria-label
    className
    loading
    size
    fullWidth

Також потрібно врахувати типи обробників, підтримку native button attributes і правила design system.

Важливо: приклад використовує `React.ReactNode`, тому відповідні типи React мають бути доступними в проєкті.

---

# Button Component API

API компонента — це набір властивостей, через які інші частини застосунку керують його поведінкою та виглядом.

Можливі props:

    variant
    size
    type
    disabled
    loading
    fullWidth
    leadingIcon
    trailingIcon
    onClick
    children

Приклад:

    <Button
        variant="primary"
        size="medium"
        type="submit"
        disabled={false}
        fullWidth={false}
    >
        Create account
    </Button>

Кожна властивість повинна мати зрозуміле призначення.

Не потрібно додавати prop лише тому, що його можна реалізувати.

API має залишатися передбачуваним і відповідати реальним потребам проєкту.

---

# Button vs Toggle Button

Button виконує дію.

Toggle button перемикає стан між двома режимами.

Приклади звичайних кнопок:

    Save
    Delete
    Download

Приклади toggle buttons:

    Bold / Not bold
    Mute / Unmute
    Favorite / Not favorite

Toggle button може залишатися в активному стані після натискання.

Наприклад:

    [B]

Якщо жирне накреслення ввімкнено, кнопка може візуально показувати selected state.

Для доступності потрібно правильно передавати поточний стан, наприклад через `aria-pressed`, коли це відповідає поведінці компонента.

Звичайна кнопка не обов'язково повинна мати постійний selected state.

---

# Button vs Checkbox vs Radio Button

Ці компоненти можуть виглядати схожими за призначенням, але виконують різні функції.

## Button

Виконує дію.

    [Save]

## Checkbox

Дозволяє незалежно ввімкнути або вимкнути параметр.

    [x] Receive notifications

## Radio Button

Дозволяє вибрати один варіант із групи взаємовиключних варіантів.

    ( ) Monthly
    (x) Yearly

Основна різниця:

    button → action
    checkbox → independent selection
    radio → single choice from a group

Не потрібно використовувати звичайні кнопки замість компонентів вибору лише заради зовнішнього вигляду.

---

# Button in UX

UX (User Experience) — це досвід користувача під час взаємодії з продуктом.

Кнопки впливають на UX через:

    clarity
    predictability
    visual hierarchy
    feedback
    accessibility
    consistency
    error prevention

## Clarity

Користувач повинен розуміти призначення кнопки.

## Predictability

Поведінка повинна відповідати очікуванням.

Наприклад, кнопка `Save` має зберігати зміни, а не несподівано видаляти дані.

## Feedback

Після дії система повинна давати достатній зворотний зв'язок.

## Error Prevention

Небезпечні дії повинні мати відповідний рівень захисту.

## Consistency

Однакові дії повинні виглядати та працювати узгоджено в різних частинах продукту.

---

# Common Button Patterns

## Save / Cancel

Використовується у формах редагування.

    [Save changes] [Cancel]

Save — зберігає зміни.

Cancel — скасовує редагування або закриває поточний сценарій відповідно до контексту.

Якщо скасування може призвести до втрати незбережених змін, іноді потрібне додаткове підтвердження.

## Create / Delete

Використовується для керування ресурсами.

    [Create project] [Delete project]

Ці дії мають різний характер і зазвичай не повинні мати однаковий візуальний акцент.

## Continue / Back

Використовується у багатокрокових сценаріях.

    [Back] [Continue]

Кнопки повинні чітко відповідати напрямку руху користувача.

## Retry

Використовується після помилки.

    Unable to load data.

    [Try again]

Retry має бути пов'язана з реальною можливістю повторити невдалу операцію.

## Empty State CTA

Коли даних ще немає, кнопка може допомогти користувачеві розпочати роботу.

    No projects yet.

    Create your first project.

    [Create project]

Така кнопка повинна відповідати наступному логічному кроку.

---

# Common Button Design Mistakes

## 1. Усі кнопки виглядають однаково

Проблема:

    [Save]
    [Cancel]
    [Delete]

Усі кнопки мають однаковий колір і візуальну вагу.

Наслідок:

    unclear hierarchy

Рішення:

    define primary action
    reduce unnecessary emphasis
    distinguish destructive actions

---

## 2. Незрозумілі labels

Погано:

    [Go]
    [Action]
    [Click]

Краще:

    [View report]
    [Create account]
    [Save changes]

Конкретний label допомагає зрозуміти результат.

---

## 3. Занадто маленька кнопка

Проблеми:

    difficult interaction
    poor touch usability
    cramped label

Рішення:

    increase padding
    review target size
    check mobile behavior

---

## 4. Відсутній focus state

Проблема:

Користувач клавіатури не бачить, яка кнопка має фокус.

Рішення:

    provide visible focus indicator
    test keyboard navigation
    avoid removing focus styles without replacement

---

## 5. Hover — єдиний індикатор взаємодії

Проблема:

Hover не є універсальним для всіх пристроїв.

Рішення:

    preserve clear default appearance
    provide keyboard focus
    ensure adequate touch interaction

---

## 6. Icon button без accessible name

Проблема:

Іконка не має текстового підпису та доступної назви.

Рішення:

    provide meaningful accessible name
    use aria-label when appropriate
    keep decorative icons hidden from assistive technology

---

## 7. Невиразний disabled state

Проблема:

Користувач не розуміє, чому кнопка недоступна.

Рішення:

    use a recognizable disabled style
    explain the prerequisite when necessary
    provide feedback at the appropriate place

---

## 8. Loading не відображається

Проблема:

Користувач повторно натискає кнопку, оскільки не розуміє, чи почалася операція.

Рішення:

    show progress feedback
    prevent unintended duplicate actions
    restore interaction when appropriate

---

## 9. Destructive action не відрізняється

Проблема:

Видалення виглядає так само, як звичайна безпечна дія.

Рішення:

    distinguish destructive styling
    use clear labels
    consider confirmation for high-impact actions

---

## 10. Кнопка обрізає текст

Проблема:

Довгий label не поміщається в задану ширину.

Рішення:

    test longer labels
    allow flexible width where appropriate
    check localization
    avoid hiding important text

---

## 11. Надмірна кількість primary buttons

Проблема:

Усі дії претендують на однакову увагу.

Рішення:

    identify the main action in each context
    distinguish supporting actions
    review the information hierarchy

---

## 12. Невідповідний тип HTML-кнопки

Проблема:

Кнопка випадково відправляє форму.

Рішення:

    use type="submit" for form submission
    use type="button" for regular actions
    use type="reset" only when reset behavior is intended

---

# Practical Example — Login Form

Розглянемо форму авторизації.

    ┌──────────────────────────────┐
    │ Sign in                      │
    │                              │
    │ Email                        │
    │ [________________________]   │
    │                              │
    │ Password                     │
    │ [________________________]   │
    │                              │
    │ [        Sign in          ]  │
    │                              │
    │ Forgot password?             │
    └──────────────────────────────┘

У цьому прикладі:

    Sign in → primary button
    Forgot password? → link

Чому?

`Sign in` відправляє форму авторизації.

`Forgot password?` веде до сценарію відновлення пароля.

Візуально ці елементи можуть мати схожий колір, але їхня поведінка різна.

---

# Practical Example — Project Dashboard

    ┌──────────────────────────────────────┐
    │ Projects             [+ Create project]
    │                                      │
    │ ┌──────────────────────────────────┐ │
    │ │ Website redesign                 │ │
    │ │ In progress                      │ │
    │ │                                  │ │
    │ │ [Open project]       [⋯]         │ │
    │ └──────────────────────────────────┘ │
    │                                      │
    │ ┌──────────────────────────────────┐ │
    │ │ Learning platform                │ │
    │ │ Draft                            │ │
    │ │                                  │ │
    │ │ [Open project]       [⋯]         │ │
    │ └──────────────────────────────────┘ │
    └──────────────────────────────────────┘

У цьому інтерфейсі:

    Create project → primary action
    Open project → navigation action
    More options → icon button

Якщо `Open project` веде на окрему сторінку, семантично доцільніше реалізувати його як link, стилізований під кнопку.

`More options` може відкривати dropdown menu.

Для кожного компонента потрібні відповідні interaction states.

---

# Practical Example — Confirmation Dialog

    ┌──────────────────────────────────┐
    │ Delete project?                  │
    │                                  │
    │ This action cannot be undone.    │
    │                                  │
    │ [Cancel] [Delete project]        │
    └──────────────────────────────────┘

Тут:

    Cancel → secondary button
    Delete project → destructive button

Важливі характеристики:

    clear title
    understandable consequences
    distinct actions
    clear destructive styling
    keyboard-accessible dialog behavior

Після відкриття діалогового вікна потрібно продумати:

    focus management
    keyboard navigation
    Escape behavior
    focus restoration
    accessible dialog name

Це вже стосується не лише кнопок, а й дизайну та реалізації modal dialog.

---

# Practical Example — Button Design Checklist

Під час проєктування кнопки перевір:

    [ ] Чи зрозуміле призначення кнопки?
    [ ] Чи відповідає label реальній дії?
    [ ] Чи визначена її візуальна ієрархія?
    [ ] Чи підходить розмір?
    [ ] Чи збалансовані padding і spacing?
    [ ] Чи відповідає форма загальній дизайн-системі?
    [ ] Чи достатній контраст?
    [ ] Чи є hover state?
    [ ] Чи є visible focus state?
    [ ] Чи продуманий active state?
    [ ] Чи зрозумілий disabled state?
    [ ] Чи передбачений loading state, якщо він потрібний?
    [ ] Чи має icon-only button доступну назву?
    [ ] Чи підтримується клавіатурна взаємодія?
    [ ] Чи зручно натискати кнопку на мобільному пристрої?
    [ ] Чи працює кнопка з довгим текстом?
    [ ] Чи правильно вибраний HTML element?
    [ ] Чи не дублює кнопка функцію link або іншого компонента?
    [ ] Чи узгоджена кнопка з іншими компонентами?
    [ ] Чи відповідає її поведінка очікуванням користувача?

---

# Button Design Workflow

Практична послідовність створення кнопки:

    1. Define purpose
           ↓
    2. Identify action priority
           ↓
    3. Write button label
           ↓
    4. Choose variant
           ↓
    5. Define size and shape
           ↓
    6. Set typography and spacing
           ↓
    7. Design interaction states
           ↓
    8. Check accessibility
           ↓
    9. Test responsive behavior
           ↓
    10. Add to component system

## Step 1 — Define Purpose

Визнач, що має робити кнопка.

Наприклад:

    Save form
    Delete record
    Open menu
    Create project

## Step 2 — Identify Priority

Визнач, чи є дія головною, другорядною або небезпечною.

## Step 3 — Write Label

Використовуй зрозумілий і конкретний текст.

## Step 4 — Choose Variant

Вибери відповідний візуальний варіант.

## Step 5 — Define Dimensions

Визнач розмір, padding, форму та мінімальну інтерактивну область.

## Step 6 — Define States

Продумай стани, які потрібні для взаємодії.

## Step 7 — Check Accessibility

Перевір семантику, доступну назву, фокус, контраст та клавіатурну поведінку.

## Step 8 — Test

Перевір компонент у реальному контексті:

    desktop
    tablet
    mobile
    long labels
    loading
    disabled
    keyboard navigation

---

# Типові помилки під час вивчення Buttons

❌ Вважати, що кнопка — це лише прямокутник із текстом.

Button — це компонент із призначенням, поведінкою, станами та правилами доступності.

---

❌ Плутати кнопку з посиланням.

    button → action
    link → navigation

---

❌ Вважати, що primary button завжди повинна бути синьою.

Primary — це роль у візуальній ієрархії, а не конкретний колір.

---

❌ Вважати, що всі кнопки повинні мати однакову ширину.

Ширина залежить від компонента, вмісту та контексту.

---

❌ Використовувати іконку без зрозумілого значення.

Якщо значення неочевидне, додай текстовий label або забезпеч доступну назву.

---

❌ Ігнорувати keyboard focus.

Кнопка повинна бути придатною для використання не лише мишкою.

---

❌ Використовувати disabled styling без реальної disabled поведінки.

Візуальний стан і фактична доступність взаємодії повинні відповідати одне одному.

---

❌ Плутати loading та success.

Loading означає, що операція ще виконується.

Success означає, що операція завершилася успішно.

---

❌ Використовувати destructive styling для звичайних дій.

Попереджувальне оформлення повинно відповідати характеру дії.

---

❌ Забувати про довгі labels і локалізацію.

Кнопка повинна залишатися зрозумілою, якщо текст змінюється або збільшується.

---

❌ Створювати окрему реалізацію кожної кнопки без системи.

Повторно використовувані компоненти та design tokens спрощують підтримку інтерфейсу.

---

# Питання для самоперевірки

Що таке button?

Яку роль кнопки відіграють у UI design?

Які основні частини має button component?

Що таке button anatomy?

Що таке primary button?

Що таке secondary button?

Що таке tertiary button?

Чим primary button відрізняється від secondary button?

Що таке text button?

Що таке icon button?

Коли доцільно використовувати icon-only button?

Що таке floating action button?

Що таке destructive button?

Коли варто використовувати confirmation dialog?

Що таке split button?

Що таке button group?

Чим button group відрізняється від segmented control?

Що таке CTA?

Чим CTA відрізняється від primary button?

Яким повинен бути хороший button label?

Чому action-oriented text часто краще за загальні написи?

Що таке button size?

Які основні характеристики визначають розмір кнопки?

Коли використовують full-width button?

Які форми кнопок існують?

Як padding впливає на зовнішній вигляд і зручність кнопки?

Що таке button hierarchy?

Яку роль відіграють колір і контраст?

Що таке button states?

Чим hover відрізняється від focus?

Чим active відрізняється від selected?

Що таке disabled state?

Чим disabled state відрізняється від loading state?

Навіщо потрібен loading indicator?

Що таке touch target?

Чим visual size відрізняється від interactive size?

Які вимоги доступності важливі для кнопок?

Чому потрібно використовувати семантичний HTML?

Навіщо icon-only button потрібен accessible name?

Чому не варто прибирати focus indicator без альтернативи?

Які типи HTML button існують?

Чим `type="button"` відрізняється від `type="submit"`?

Для чого використовується `type="reset"`?

Коли краще використати link замість button?

Як кнопки впливають на UX?

Що таке design tokens?

Що таке button variants?

Чим variant відрізняється від size?

Як організувати кнопки у Figma?

Для чого потрібен Auto Layout?

Як створити базовий Button component у React?

Які props можуть бути в Button component?

Як правильно оформити destructive action?

Як кнопки адаптуються до мобільного інтерфейсу?

Які типові помилки виникають під час проєктування кнопок?

---

# Шлях вивчення

## 🟢 Core — обов'язково знати

Що таке button.

Призначення кнопок у UI.

Button anatomy.

Button label.

Primary button.

Secondary button.

Tertiary button.

Button hierarchy.

CTA.

Button size.

Button shape.

Padding і spacing.

Основи button color.

Основи typography.

Default state.

Hover state.

Focus state.

Active state.

Disabled state.

Основи loading state.

Різниця між button та link.

Різниця між button та toggle button.

Основи icon button.

Основи button groups.

Основи responsive buttons.

Семантичний HTML.

`button`, `type="button"` і `type="submit"`.

Основи keyboard accessibility.

Основи color contrast.

---

## 🔵 Junior — практичне застосування

Проєктування primary, secondary та tertiary buttons.

Створення узгоджених button variants.

Розробка button sizes.

Робота з design tokens.

Створення компонентів у Figma.

Auto Layout для кнопок.

Іконки та текст у кнопках.

Icon-only buttons.

Destructive actions.

Loading states.

Disabled states.

Focus-visible styling.

Accessible names.

Touch targets.

Button groups.

Segmented controls.

Split buttons.

Кнопки у формах.

Кнопки в модальних вікнах.

Кнопки в картках.

Кнопки в dashboard.

Responsive button layouts.

CSS component architecture.

BEM або інша узгоджена система класів.

React Button component.

Component props.

TypeScript для props.

Використання кнопок у дизайн-системі.

Перевірка keyboard navigation.

Перевірка довгих labels.

Перевірка contrast та interaction states.

---

## 🟠 Middle — системне проєктування

Розробка масштабованої button system.

Узгодження variants і sizes.

Організація semantic design tokens.

Побудова theme-aware buttons.

Light і dark themes.

Розробка compound components.

Систематизація icon buttons.

Керування loading та disabled states.

Робота з асинхронними діями.

Запобігання повторному запуску небезпечних операцій.

Доступні dialog та menu interactions.

Сумісність із різними типами введення.

Компонентні API.

Controlled та uncontrolled interaction patterns, коли вони доречні.

Testing button behavior.

Visual regression testing.

Accessibility testing.

Storybook або аналогічний інструмент для документації компонентів.

Підтримка локалізації.

Робота з довгими текстами.

Узгодженість між Figma та реалізацією.

Документування component states.

Оцінка usability.

---

## 🔴 Senior — поглиблене опрацювання

Архітектура компонентної дизайн-системи.

Стратегії versioning компонентів.

Backward compatibility.

Design token architecture.

Semantic та primitive tokens.

Cross-platform design systems.

Advanced accessibility.

WCAG conformance.

Складні interaction patterns.

Keyboard interaction models.

Focus management.

Accessible compound components.

Component API trade-offs.

Візуальна консистентність великої системи.

Governance дизайн-системи.

Design-to-code workflows.

Automated accessibility testing.

Visual regression infrastructure.

Component adoption metrics.

Управління змінами дизайн-системи.

Баланс між гнучкістю компонентів і складністю API.

Оцінка usability на основі досліджень.

Ці теми не потрібно опановувати до початку створення власних компонентів. Вони стають актуальними в міру зростання складності продукту та дизайн-системи.

---

# Міні-шпаргалка

## Button

    button → виконує дію

    link → навігація

## Hierarchy

    primary   → головна дія
    secondary → другорядна дія
    tertiary  → мінімальний візуальний акцент

## Special Buttons

    icon button → дія через іконку
    FAB         → плаваюча кнопка головної дії
    destructive → потенційно руйнівна дія
    split       → основна дія + додаткове меню

## Labels

    Save changes
    Create account
    Delete project
    Download report

Перевага:

    clear action-oriented text

## Sizes

    small
    medium
    large

Враховуй:

    height
    width
    padding
    typography
    icon size
    touch target

## States

    default
    hover
    focus
    active
    disabled
    loading

## Accessibility

    semantic HTML
    accessible name
    keyboard support
    visible focus
    sufficient contrast
    adequate target size

## HTML

    <button type="button">
        Open settings
    </button>

    <button type="submit">
        Save changes
    </button>

## Design Tokens

    color
    spacing
    radius
    typography
    size
    state

## UX

    clear action
    predictable behavior
    visible feedback
    consistent design
    error prevention

---

# Головне

• Button — інтерактивний компонент для виконання дії.

• Link призначений переважно для навігації, а button — для дій.

• Primary button виділяє головну дію в конкретному контексті.

• Secondary та tertiary buttons допомагають організувати візуальну ієрархію.

• Destructive button позначає потенційно небезпечну дію.

• Icon button повинна мати зрозуміле призначення та доступну назву.

• CTA — це роль елемента, який спонукає до дії, а не окремий технічний тип кнопки.

• Button anatomy включає container, label, можливі іконки, padding, border і focus indicator.

• Розмір кнопки визначається не лише її висотою, а й padding, текстом, іконками та інтерактивною областю.

• Button variants описують варіанти компонента, а sizes — його розміри.

• Hover, focus, active, disabled та loading мають різні значення.

• Видимий focus indicator важливий для клавіатурної навігації.

• Loading state повинен відповідати реальному стану операції.

• Колір не повинен бути єдиним способом повідомлення про призначення або стан кнопки.

• Семантичний HTML зазвичай є найкращою основою для вебкнопок.

• У формі потрібно правильно визначати `type="button"`, `type="submit"` або `type="reset"`.

• Для icon-only buttons потрібно передбачити доступну назву.

• Розмір інтерактивної області має забезпечувати зручну взаємодію та відповідати застосовним вимогам доступності.

• Responsive button design враховує розмір екрана, довжину тексту, локалізацію та спосіб взаємодії.

• Design tokens допомагають підтримувати послідовність стилів.

• У Figma Auto Layout допомагає створювати кнопки, які адаптуються до вмісту.

• У React Button component можна повторно використовувати через props, variants і sizes.

• Хороша кнопка має бути зрозумілою, доступною, передбачуваною та візуально узгодженою з іншими компонентами.

• Основна модель проєктування кнопки:

    purpose
       ↓
    action hierarchy
       ↓
    label
       ↓
    variant + size
       ↓
    typography + spacing
       ↓
    interaction states
       ↓
    accessibility
       ↓
    responsive behavior
       ↓
    reusable component

• Button — це не лише зовнішній вигляд. Це поєднання візуальної ієрархії, зрозумілого тексту, поведінки, доступності та системного дизайну.