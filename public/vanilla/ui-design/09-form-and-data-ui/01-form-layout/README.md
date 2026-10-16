# 01. Form Layout

Form Layout (розташування елементів форми) — це організація полів введення, labels, кнопок та інших елементів форми в єдину зрозумілу структуру інтерфейсу.

Правильний Form Layout допомагає користувачу:

- швидко зрозуміти призначення форми;
- послідовно заповнювати поля;
- розуміти, які дані необхідно ввести;
- бачити обов'язкові та необов'язкові поля;
- знаходити помилки та виправляти їх;
- легко завершувати дію за допомогою кнопки Submit;
- користуватися формою на мобільних і десктопних пристроях.

Form Layout використовується в:

    login forms
    registration forms
    contact forms
    search forms
    checkout forms
    profile forms
    settings forms
    feedback forms
    application forms
    data entry forms

Основні типи розташування форм:

    Single-column layout
    Multi-column layout
    Inline form
    Horizontal form
    Vertical form
    Grouped form
    Multi-step form

---

### Ключові поняття

✔ form layout
✔ form structure
✔ form container
✔ form field
✔ form group
✔ field grouping
✔ single-column layout
✔ multi-column layout
✔ vertical form
✔ horizontal form
✔ inline form
✔ form width
✔ content width
✔ alignment
✔ spacing
✔ visual hierarchy
✔ field order
✔ logical sequence
✔ label placement
✔ input placement
✔ helper text
✔ required field
✔ optional field
✔ primary action
✔ secondary action
✔ submit button
✔ form actions
✔ responsive form
✔ mobile form
✔ multi-step form
✔ progressive disclosure
✔ form usability
✔ accessibility
✔ cognitive load

---

### Що потрібно пам'ятати

• Form Layout визначає, як поля, labels, підказки та кнопки організовані на сторінці.

• Хороша форма має зрозумілу структуру та передбачуваний порядок заповнення.

• Single-column layout зазвичай є найпростішим варіантом для форм із великою кількістю полів.

• Multi-column layout доцільний для пов'язаних коротких полів, наприклад City та Postal Code.

• Label повинен бути візуально пов'язаний зі своїм полем введення.

• Однакові відступи допомагають користувачу зрозуміти, які елементи належать до однієї групи.

• Поля потрібно розташовувати в логічній послідовності.

• Обов'язкові та необов'язкові поля повинні бути зрозумілими без здогадок.

• Основна кнопка дії повинна помітно відрізнятися від другорядних дій.

• Надмірна ширина форми ускладнює сприйняття та заповнення довгих полів.

• Форма повинна адаптуватися до різних розмірів екрана.

• Візуально проста форма не повинна створювати зайвих перешкод для користувача.

• Дизайн форми має враховувати accessibility, клавіатурну навігацію та зрозумілі назви полів.

---

# Form Layout Basics

Form Layout — це не просто розташування input-елементів. Це спосіб організації взаємодії користувача з формою.

Наприклад, форма реєстрації може містити:

    Registration Form
        ↓
    Name
        ↓
    Email
        ↓
    Password
        ↓
    Confirm Password
        ↓
    Create Account

Користувач повинен розуміти:

    1. Що це за форма.
    2. Які дані потрібно ввести.
    3. У якому порядку заповнювати поля.
    4. Як завершити заповнення.
    5. Що відбудеться після Submit.

Завдання дизайнера — зробити цей процес зрозумілим і передбачуваним.

---

# Form Structure

Типова форма складається з кількох основних частин.

    Form
    ├── Heading
    ├── Description
    ├── Fields
    │   ├── Label
    │   ├── Input
    │   └── Helper Text
    ├── Feedback
    └── Actions
        ├── Submit Button
        └── Secondary Action

Наприклад:

    Create Account

    Enter your details to create an account.

    Full Name
    [________________________]

    Email Address
    [________________________]

    Password
    [________________________]

    [Create Account]

    Already have an account? Sign in

Не кожна форма потребує всіх цих елементів.

Наприклад, проста форма пошуку може містити лише input і кнопку Search.

---

# Form Container

Form Container — контейнер, який об'єднує елементи форми в єдину композицію.

Він допомагає контролювати:

    width
    padding
    alignment
    background
    border
    border-radius
    spacing

Приклад структури:

    Page
    └── Form Container
        ├── Heading
        ├── Description
        ├── Form Fields
        └── Actions

Контейнер може бути:

    centered container
    full-width container
    card container
    sidebar container
    modal container
    page-section container

### Centered Form

Форма розташована по центру сторінки.

Типове використання:

    login
    registration
    password reset
    simple contact form

### Card Form

Форма розташована всередині візуально відокремленої картки.

Типове використання:

    account settings
    checkout section
    profile editing
    application form

### Full-width Form

Форма займає доступну ширину контейнера.

Типове використання:

    admin dashboard
    data entry interface
    complex settings
    large business applications

Важливо: full-width container не означає, що кожне поле повинно бути максимально широким. Ширина має відповідати типу даних і структурі інтерфейсу.

---

# Single-column Layout

Single-column layout — форма, у якій поля розташовані одне під одним.

Наприклад:

    Create Account

    Full Name
    [________________________]

    Email
    [________________________]

    Password
    [________________________]

    Confirm Password
    [________________________]

    [Create Account]

Це один із найпоширеніших типів Form Layout.

### Переваги

• Зрозумілий напрямок заповнення — зверху вниз.

• Легко підтримувати візуальну ієрархію.

• Добре адаптується до мобільних пристроїв.

• Зменшує потребу переміщувати погляд між колонками.

• Полегшує розміщення helper text та error messages.

• Підходить для форм із великою кількістю полів.

### Коли використовувати

    login forms
    registration forms
    contact forms
    password reset forms
    feedback forms
    application forms

### HTML-приклад

    <form class="form">
        <div class="form__field">
            <label for="name">Full Name</label>
            <input
                id="name"
                name="name"
                type="text"
                autocomplete="name"
                required
            />
        </div>

        <div class="form__field">
            <label for="email">Email</label>
            <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
            />
        </div>

        <button type="submit">
            Create Account
        </button>
    </form>

### CSS-приклад

    .form {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        width: 100%;
        max-width: 28rem;
        margin-inline: auto;
    }

    .form__field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .form input {
        width: 100%;
        box-sizing: border-box;
        padding: 0.75rem;
    }

Тут:

    display: flex
        → використовуємо Flexbox

    flex-direction: column
        → розташовуємо поля вертикально

    gap
        → задаємо відстань між полями

    max-width
        → обмежуємо ширину форми

    margin-inline: auto
        → центруємо форму по горизонталі

    box-sizing: border-box
        → включаємо padding і border у задану ширину

---

# Multi-column Layout

Multi-column layout — форма, у якій частина полів розташована в кількох колонках.

Наприклад:

    First Name             Last Name
    [________________]     [________________]

    City                   Postal Code
    [________________]     [________________]

    Email
    [________________________________________]

Multi-column layout може скоротити вертикальну довжину форми.

Однак використання колонок повинно бути обґрунтованим.

### Коли використовувати

• Для коротких пов'язаних полів.

• Для First Name та Last Name.

• Для City та Postal Code.

• Для Month та Year, якщо такий формат відповідає задачі.

• Для форм із чітко визначеними групами даних.

### Коли уникати

• Для довгих складних форм без чіткої структури.

• Коли користувач повинен часто читати пояснення біля полів.

• Коли колонки створюють складний порядок проходження клавіатурою.

• Коли на мобільному екрані поля стають надто вузькими.

### CSS Grid

    .form__row {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1rem;
    }

HTML:

    <div class="form__row">
        <div class="form__field">
            <label for="first-name">
                First Name
            </label>

            <input
                id="first-name"
                name="firstName"
                type="text"
            />
        </div>

        <div class="form__field">
            <label for="last-name">
                Last Name
            </label>

            <input
                id="last-name"
                name="lastName"
                type="text"
            />
        </div>
    </div>

Тут:

    display: grid
        → створює Grid-контейнер

    repeat(2, minmax(0, 1fr))
        → створює дві гнучкі колонки

    gap: 1rem
        → задає відстань між колонками та рядками

    minmax(0, 1fr)
        → дозволяє колонкам стискатися без небажаного переповнення

---

# Responsive Form Layout

Responsive Form Layout — адаптація форми до ширини екрана та доступного простору.

Форма може мати дві колонки на десктопі та одну колонку на мобільному пристрої.

### Приклад

Desktop:

    First Name       Last Name
    [___________]    [___________]

    Email
    [___________________________]

Mobile:

    First Name
    [________________________]

    Last Name
    [________________________]

    Email
    [________________________]

### CSS-приклад

    .form__row {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1rem;
    }

    @media (max-width: 40rem) {
        .form__row {
            grid-template-columns: 1fr;
        }
    }

На широких екранах:

    2 columns

На вузьких екранах:

    1 column

Breakpoint залежить від того, коли конкретна форма перестає зручно вміщатися, а не лише від назви пристрою.

### Responsive принципи

• Поля не повинні виходити за межі контейнера.

• На вузькому екрані складні багатоколонкові групи зазвичай переходять в одну колонку.

• Кнопки повинні залишатися доступними для натискання.

• Labels та helper text не повинні обрізатися.

• Відступи можуть зменшуватися на малих екранах.

• Форма має працювати при збільшенні масштабу сторінки.

• Контент не повинен вимагати горизонтального прокручування для звичайного заповнення.

---

# Vertical Form

Vertical Form — форма, у якій label розташований над input.

Приклад:

    Email Address
    [________________________]

    Password
    [________________________]

    [Sign In]

Це поширений варіант для сучасних вебінтерфейсів.

### Переваги

• Чітка візуальна ієрархія.

• Добра читабельність.

• Зручність на мобільних пристроях.

• Просте вирівнювання полів.

• Зручне розміщення повідомлень про помилки.

### CSS-приклад

    .form__field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

Vertical Form особливо добре підходить для форм, де важливо послідовно читати label, вводити значення та переглядати підказки.

---

# Horizontal Form

Horizontal Form — форма, у якій label та input розташовані поруч.

Приклад:

    Full Name     [________________________]

    Email         [________________________]

    Phone         [________________________]

Такий підхід може бути корисним для адміністративних інтерфейсів, налаштувань і форм із повторюваною структурою.

### Переваги

• Може зменшувати вертикальну висоту форми.

• Допомагає компактно відображати прості налаштування.

• Полегшує порівняння полів у деяких інтерфейсах.

### Недоліки

• Довгі labels можуть створювати нерівномірне вирівнювання.

• Поля можуть ставати вузькими.

• На мобільних екранах розташування поруч часто незручне.

• Повідомлення про помилки потребують додаткового простору.

### CSS-приклад

    .form__field--horizontal {
        display: grid;
        grid-template-columns: 10rem minmax(0, 1fr);
        align-items: start;
        gap: 1rem;
    }

Для мобільного екрана:

    @media (max-width: 40rem) {
        .form__field--horizontal {
            grid-template-columns: 1fr;
            gap: 0.5rem;
        }
    }

Не варто вибирати Horizontal Form лише тому, що вона займає менше вертикального простору. Головний критерій — зручність заповнення.

---

# Inline Form

Inline Form — форма, у якій елементи розташовані в одному горизонтальному рядку або в компактній групі.

Наприклад:

    [Enter email address________] [Subscribe]

Інший приклад:

    [Search products____________] [Search]

### Коли використовувати

    search bars
    newsletter subscriptions
    compact filters
    quick actions
    simple data entry

### CSS-приклад

    .inline-form {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .inline-form input {
        flex: 1;
        min-width: 0;
    }

    .inline-form button {
        flex-shrink: 0;
    }

### Responsive варіант

    @media (max-width: 30rem) {
        .inline-form {
            flex-direction: column;
            align-items: stretch;
        }
    }

Inline Form добре працює для коротких задач, але зазвичай не підходить для великих реєстраційних чи анкетних форм.

---

# Form Field

Form Field — окреме поле форми разом із його супровідними елементами.

Типова структура:

    Form Field
    ├── Label
    ├── Input
    ├── Helper Text
    └── Error Message

Не всі елементи обов'язково присутні одночасно.

Наприклад:

    Email Address

    [________________________]

    We will use this email to contact you.

Або після помилки:

    Email Address

    [invalid-email____________]

    Enter a valid email address.

### Основні принципи

• Label має чітко описувати призначення поля.

• Input повинен мати зрозумілий візуальний стан.

• Helper text повинен пояснювати додаткові вимоги, якщо вони є.

• Error message повинен бути пов'язаний із відповідним полем.

• Відстань між label та input має бути меншою, ніж відстань між окремими групами полів.

---

# Form Group

Form Group — група пов'язаних полів, які стосуються однієї теми.

Наприклад, форма оформлення замовлення:

    Contact Information
        Email
        Phone

    Shipping Address
        Street
        City
        Postal Code

    Payment Information
        Cardholder Name
        Payment Method

Групування допомагає користувачу розуміти структуру довгої форми.

### Коли використовувати

• Коли форма містить багато полів.

• Коли поля можна розділити на тематичні секції.

• Коли користувачеві потрібно вводити різні категорії даних.

• Коли між частинами форми існує логічна послідовність.

### HTML-приклад

    <form>
        <fieldset>
            <legend>Contact Information</legend>

            <div class="form__field">
                <label for="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                />
            </div>

            <div class="form__field">
                <label for="phone">Phone</label>
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                />
            </div>
        </fieldset>
    </form>

Тут:

    fieldset
        → групує пов'язані елементи форми

    legend
        → задає назву групи

Для семантично пов'язаних полів `fieldset` і `legend` можуть покращувати доступність форми.

Не потрібно створювати окрему групу для кожного поля, якщо це не допомагає зрозуміти структуру.

---

# Field Order

Field Order — порядок розташування полів у формі.

Правильний порядок відповідає логіці користувача.

Наприклад, для реєстрації:

    1. Full Name
    2. Email
    3. Password
    4. Confirm Password
    5. Create Account

Для адреси:

    1. Country
    2. Street Address
    3. City
    4. Postal Code

Конкретний порядок адресних полів залежить від країни та вимог продукту.

### Принципи

• Розташовуй поля в природному порядку введення даних.

• Пов'язані поля розташовуй поруч.

• Не змушуй користувача повертатися до попередніх секцій без потреби.

• Не розділяй поля, між якими існує сильний логічний зв'язок.

• Не вимагай даних, які не потрібні для виконання задачі.

• Враховуй порядок клавіатурного переходу між полями.

---

# Visual Hierarchy in Forms

Visual Hierarchy — система візуальних акцентів, яка допомагає користувачу розрізняти важливість елементів.

У формі ієрархія може виглядати так:

    Form Heading
        ↓
    Section Heading
        ↓
    Field Label
        ↓
    Input
        ↓
    Helper Text
        ↓
    Primary Action

Це не означає, що кожна форма повинна використовувати саме таку кількість рівнів.

### Як створити ієрархію

• Використовуй розмір шрифту для розрізнення заголовків і звичайного тексту.

• Використовуй відступи для відокремлення секцій.

• Підтримуй однакове оформлення однотипних полів.

• Виділяй основну кнопку дії.

• Не роби всі елементи однаково контрастними.

• Не покладайся лише на колір для передавання важливої інформації.

### Приклад

    Create Account
    Заголовок форми

    Enter your details below.
    Короткий опис

    Email
    Назва поля

    [________________________]
    Поле введення

    [Create Account]
    Основна дія

Заголовок пояснює призначення форми, а кнопка показує, як завершити дію.

---

# Spacing in Forms

Spacing — відстані між елементами форми.

Відступи допомагають розрізняти:

    label ↔ input
    input ↔ helper text
    field ↔ field
    field group ↔ field group
    fields ↔ actions

Основна ідея:

    Related elements
        → smaller spacing

    Separate groups
        → larger spacing

Наприклад:

    Email
    [____________________]
    Helper text

        larger gap

    Password
    [____________________]

        larger gap

    [Create Account]

### CSS-приклад

    .form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .form__field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .form__helper {
        margin: 0;
        font-size: 0.875rem;
    }

    .form__actions {
        display: flex;
        gap: 0.75rem;
        margin-top: 0.5rem;
    }

Тут:

    .form gap
        → відстань між групами полів

    .form__field gap
        → відстань між label, input та іншими елементами поля

    .form__actions gap
        → відстань між кнопками

### Типова помилка

Не варто задавати випадкові відступи кожному полю окремо.

Краще створити узгоджену систему spacing, яку можна повторно використовувати.

Наприклад:

    4px   → дуже малий відступ
    8px   → малий відступ
    12px  → середній відступ
    16px  → базовий відступ
    24px  → великий відступ
    32px  → відступ між секціями

Це лише приклад шкали. Конкретні значення залежать від дизайн-системи.

---

# Form Width

Form Width — ширина форми або її контейнера.

Правильна ширина допомагає:

    improve readability
    prevent excessive stretching
    maintain alignment
    preserve visual balance
    support responsive layouts

### Вузька форма

Типове використання:

    login
    registration
    password reset

### Ширша форма

Типове використання:

    profile editing
    application forms
    address forms
    business data entry

### CSS-приклад

    .login-form {
        width: 100%;
        max-width: 28rem;
        margin-inline: auto;
    }

Для складнішої форми:

    .application-form {
        width: 100%;
        max-width: 52rem;
        margin-inline: auto;
    }

Значення `28rem` та `52rem` — приклади, а не універсальні стандарти.

### Важливо розрізняти

    width
        → задає ширину елемента

    max-width
        → обмежує максимальну ширину

    min-width
        → обмежує мінімальну ширину

    width: 100%
        → дозволяє елементу зайняти доступну ширину контейнера

Для більшості звичайних форм корисно поєднувати `width: 100%` та `max-width`.

---

# Labels and Input Alignment

Label та input повинні бути візуально пов'язані.

Приклад:

    Email Address
    [________________________]

Користувач повинен без зусиль визначати, яке поле відповідає конкретній назві.

### Основні правила

• Використовуй зрозумілий label для кожного поля.

• Розташовуй label близько до input.

• Дотримуйся однакового вирівнювання однотипних полів.

• Уникай ситуацій, коли label одного поля візуально ближчий до сусіднього input.

• Забезпечуй достатній контраст тексту.

• Не використовуй placeholder як єдину постійну назву поля.

### HTML-приклад

    <div class="form__field">
        <label for="email">Email Address</label>

        <input
            id="email"
            name="email"
            type="email"
        />
    </div>

Значення `for` у label повинно збігатися з `id` відповідного input.

Це створює програмний зв'язок між назвою та полем.

Детальніше labels розглядатимуться в темі:

    02-labels

---

# Form Actions

Form Actions — елементи, за допомогою яких користувач завершує або змінює дію у формі.

Приклади:

    Submit
    Save
    Create Account
    Send Message
    Cancel
    Reset

У формі часто є:

    Primary Action
    Secondary Action

### Primary Action

Основна дія, заради якої користувач заповнює форму.

Приклади:

    Save Changes
    Create Account
    Send Message
    Place Order

### Secondary Action

Другорядна дія, яка не є основною метою форми.

Приклади:

    Cancel
    Back
    Return to Profile

### Приклад

    Email
    [________________________]

    Password
    [________________________]

    [Sign In]

    Forgot password?

У цьому прикладі Sign In — основна дія, а Forgot password? — допоміжна навігаційна дія.

### CSS-приклад

    .form__actions {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .form__actions--end {
        justify-content: flex-end;
    }

Для мобільних пристроїв кнопки можна розташувати вертикально, якщо горизонтальний рядок стає незручним.

Не варто розміщувати кілька однаково помітних основних кнопок поруч без чіткої потреби.

---

# Required and Optional Fields

Форма повинна зрозуміло пояснювати, які поля обов'язкові.

Поширені підходи:

    Email *
    Password *

Або:

    Email
    Password

    Phone (optional)

Можна також використати коротке пояснення:

    Fields marked with * are required.

Важливо, щоб правило було послідовним.

### HTML-приклад

    <label for="email">
        Email
        <span aria-hidden="true">*</span>
    </label>

    <input
        id="email"
        name="email"
        type="email"
        required
    />

Візуальна позначка та атрибут `required` виконують різні ролі:

    visual marker
        → пояснює вимогу користувачу

    required
        → задає обмеження в HTML-формі

Позначка сама по собі не робить поле обов'язковим, а атрибут `required` не замінює зрозумілого візуального пояснення.

Якщо більшість полів обов'язкові, іноді зручніше позначати необов'язкові поля. Вибір залежить від контексту та очікувань користувачів.

---

# Helper Text and Error Placement

Helper Text — додатковий текст, який пояснює, що потрібно ввести в поле.

Error Message — повідомлення про проблему з введеними даними.

Наприклад:

    Password

    [________________________]

    Use at least 12 characters.

Після помилки:

    Password

    [short___________________]

    Password must contain at least 12 characters.

### Принципи розташування

• Helper text зазвичай розміщують близько до поля.

• Error message повинен бути пов'язаний із полем, у якому виникла помилка.

• Повідомлення не повинно перекривати інші елементи.

• Поява повідомлення не повинна ламати композицію форми.

• Якщо помилка додає новий текст, форма повинна адаптуватися до збільшеної висоти.

• Не використовуй лише червону рамку без текстового пояснення, якщо користувачу потрібно зрозуміти та виправити проблему.

Ці теми детальніше розглядатимуться в:

    03-placeholders
    04-validation
    05-error-messages

---

# Multi-step Form

Multi-step Form — форма, у якій заповнення поділено на кілька послідовних етапів.

Наприклад:

    Step 1: Personal Information
        ↓
    Step 2: Address
        ↓
    Step 3: Preferences
        ↓
    Step 4: Review
        ↓
    Submit

Multi-step Form використовується, коли форма велика або дані природно поділяються на етапи.

### Переваги

• Користувач бачить обмежену кількість полів одночасно.

• Складну задачу легше розділити на менші кроки.

• Можна організувати перевірку даних на кожному етапі.

• Користувачу легше зрозуміти поточний етап процесу.

### Недоліки

• Збільшується кількість переходів.

• Користувач може не розуміти, скільки роботи залишилося.

• Потрібно зберігати введені дані під час переходів.

• Повернення до попередніх кроків має бути передбачуваним.

### Що важливо

• Позначай поточний крок.

• Показуй зрозумілі кнопки Back та Continue.

• Не очищай введені дані без попередження.

• Перевіряй дані відповідно до правил кожного кроку.

• Якщо це доречно, показуй загальну кількість кроків.

• Перед остаточним Submit можна показати Review.

Multi-step Form не завжди краща за звичайну форму. Для кількох простих полів вона може створювати зайву складність.

---

# Progressive Disclosure

Progressive Disclosure — поступове показування додаткових полів або налаштувань у міру потреби.

Наприклад:

    Delivery Method

    (•) Standard Delivery
    ( ) Express Delivery

Якщо користувач вибирає Express Delivery, може з'явитися додаткова інформація про терміни та вартість.

Інший приклад:

    [ ] Use a different billing address

Після активації відкриваються поля платіжної адреси.

### Коли використовувати

• Коли додаткові поля потрібні лише частині користувачів.

• Коли форма містить необов'язкові розширені налаштування.

• Коли умовні поля залежать від вибору користувача.

### Важливо

• Користувач повинен розуміти, чому з'явилися нові поля.

• Поява додаткових полів не повинна порушувати порядок читання.

• Необхідно враховувати доступність динамічних змін.

• Приховані поля не повинні випадково блокувати Submit.

• Дані прихованих полів потрібно обробляти відповідно до логіки форми.

---

# Accessibility in Form Layout

Accessibility — здатність різних користувачів, включно з людьми, які користуються допоміжними технологіями, ефективно працювати з формою.

### Основні правила

• Кожне поле повинно мати доступну назву.

• Використовуй справжні HTML-елементи `label`, `input`, `button`, `fieldset` і `legend`, коли вони відповідають задачі.

• Поля повинні бути доступні за допомогою клавіатури.

• Порядок фокуса має відповідати логіці форми.

• Візуальні позначки обов'язкових полів потрібно пояснювати.

• Не передавай значення тільки кольором.

• Помилки повинні мати зрозумілі текстові пояснення.

• Фокус клавіатури повинен бути видимим.

• Не змушуй користувача заповнювати зайві поля.

• Враховуй збільшення масштабу сторінки та різні розміри екрана.

### Приклад доступного поля

    <div class="form__field">
        <label for="email">Email Address</label>

        <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
        />
    </div>

### Клавіатурна навігація

Типовий сценарій:

    Tab
        ↓
    Email
        ↓
    Password
        ↓
    Sign In

Порядок переходу повинен бути логічним і передбачуваним.

Не змінюй стандартну поведінку клавіатури без необхідності.

---

# Form Layout in UI Design

Під час проєктування форми потрібно враховувати не тільки її вигляд, а й контекст використання.

Наприклад:

### Login Form

    Email
    Password
    Sign In
    Forgot Password?

Основна мета — швидко увійти в систему.

### Registration Form

    Full Name
    Email
    Password
    Confirm Password
    Create Account

Основна мета — створити обліковий запис.

### Contact Form

    Name
    Email
    Subject
    Message
    Send Message

Основна мета — передати повідомлення.

### Search Form

    Search products...
    [Search]

Основна мета — знайти потрібні дані.

### Settings Form

    Display Name
    Email
    Language
    Notifications

    [Save Changes]

Основна мета — змінити та зберегти налаштування.

### Data Entry Form

    Customer Information
    Address
    Order Details
    Notes

    [Save Record]

Основна мета — внести дані в систему.

Однаковий шаблон не обов'язково підходить для всіх цих задач. Form Layout потрібно підбирати відповідно до призначення форми.

---

# Form Layout Patterns

## Pattern 1 — Simple Login

    Sign In

    Email
    [________________________]

    Password
    [________________________]

    [Sign In]

    Forgot password?

Особливості:

    single-column
    compact form
    clear primary action
    minimal fields

---

## Pattern 2 — Registration

    Create Account

    Full Name
    [________________________]

    Email
    [________________________]

    Password
    [________________________]

    [Create Account]

Особливості:

    single-column
    vertical labels
    logical field order
    clear submission action

---

## Pattern 3 — Address Form

    Shipping Address

    Street Address
    [________________________]

    Apartment (optional)
    [________________________]

    City                   Postal Code
    [________________]     [____________]

    [Continue]

Особливості:

    grouped fields
    mostly single-column
    selected multi-column row
    responsive layout

---

## Pattern 4 — Search

    [Search products_____________] [Search]

Особливості:

    inline form
    short interaction
    compact layout
    responsive behavior

---

## Pattern 5 — Settings

    Profile Settings

    Personal Information

    Display Name
    [________________________]

    Email
    [________________________]

    Preferences

    Language
    [Select language__________]

    [Cancel] [Save Changes]

Особливості:

    grouped sections
    clear hierarchy
    separated actions
    consistent field spacing

---

# Common Form Layout Mistakes

## 1. Занадто багато колонок

Погано:

    Name       Email       Phone
    [______]   [______]    [______]

Якщо поля вузькі, labels та значення можуть погано читатися.

Краще використовувати колонки лише тоді, коли вони покращують структуру.

---

## 2. Непослідовні відступи

Погано:

    Email
    [________________]



    Password
    [________________]

    Phone
    [________________]

Різні випадкові відстані створюють враження неорганізованої форми.

Краще використовувати узгоджену spacing scale.

---

## 3. Надмірна ширина

Погано:

    Email
    [_______________________________________________
    _______________________________________________]

Для звичайного email або короткого імені надмірно широке поле може бути непотрібним.

Ширину варто узгоджувати з контекстом і доступним простором.

---

## 4. Нечітке групування

Погано:

    Name
    [________________]

    Card Number
    [________________]

    City
    [________________]

    Expiration Date
    [________________]

Пов'язані дані розташовані без зрозумілої структури.

Краще об'єднувати поля у змістовні групи, якщо це допомагає користувачу.

---

## 5. Відсутність заголовка

Для складної форми без заголовка може бути незрозуміло, навіщо вона потрібна.

Краще:

    Update Profile

    Change your personal information.

Проте для дуже простих inline-форм окремий великий заголовок може бути зайвим.

---

## 6. Незрозумілі кнопки

Погано:

    [OK]

Краще:

    [Save Changes]

Назва кнопки повинна пояснювати результат дії.

---

## 7. Кнопки без візуальної ієрархії

Якщо всі кнопки мають однаковий акцент, користувачеві важче визначити основну дію.

Краще виділяти Primary Action, не роблячи другорядні дії недоступними.

---

## 8. Відсутність responsive layout

Форма може добре виглядати на десктопі, але виходити за межі мобільного екрана.

Краще перевіряти:

    desktop
    tablet
    mobile
    zoomed layout

---

## 9. Placeholder замість Label

Погано:

    [Enter your email_________]

Коли користувач починає введення, підказка зникає.

Краще:

    Email Address
    [Enter your email_________]

Placeholder може бути додатковою підказкою, але не повинен бути єдиною постійною назвою поля.

---

## 10. Зайві поля

Кожне додаткове поле збільшує обсяг роботи користувача.

Перед додаванням поля варто запитати:

    Чи справді потрібні ці дані?

Якщо поле не потрібне для поточної задачі, можливо, його краще прибрати або зробити необов'язковим.

---

# Practical Example — Registration Form

## HTML

    <form class="form">
        <header class="form__header">
            <h1>Create Account</h1>

            <p>
                Enter your details to get started.
            </p>
        </header>

        <div class="form__field">
            <label for="full-name">
                Full Name
            </label>

            <input
                id="full-name"
                name="fullName"
                type="text"
                autocomplete="name"
                required
            />
        </div>

        <div class="form__field">
            <label for="email">
                Email Address
            </label>

            <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
            />
        </div>

        <div class="form__field">
            <label for="password">
                Password
            </label>

            <input
                id="password"
                name="password"
                type="password"
                autocomplete="new-password"
                required
            />
        </div>

        <div class="form__actions">
            <button type="submit">
                Create Account
            </button>
        </div>
    </form>

## CSS

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 2rem 1rem;
        font-family: Arial, sans-serif;
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;

        width: 100%;
        max-width: 28rem;
        margin-inline: auto;
    }

    .form__header h1 {
        margin: 0 0 0.5rem;
        font-size: 1.75rem;
    }

    .form__header p {
        margin: 0;
        line-height: 1.5;
    }

    .form__field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .form__field label {
        font-weight: 600;
    }

    .form__field input {
        width: 100%;
        min-height: 2.75rem;
        padding: 0.75rem;

        border: 1px solid #888;
        border-radius: 0.375rem;

        font: inherit;
    }

    .form__field input:focus-visible {
        outline: 3px solid #2563eb;
        outline-offset: 2px;
    }

    .form__actions {
        margin-top: 0.25rem;
    }

    .form__actions button {
        width: 100%;
        min-height: 2.75rem;
        padding: 0.75rem 1rem;

        border: 0;
        border-radius: 0.375rem;

        font: inherit;
        font-weight: 600;

        cursor: pointer;
    }

У цьому прикладі реалізовано:

    single-column layout
    centered form
    max-width
    consistent spacing
    vertical labels
    full-width inputs
    visible keyboard focus
    primary action
    responsive container

Це приклад базового UI-рішення, а не повна реалізація реєстрації. Для робочої системи додатково потрібні обробка Submit, перевірка даних, серверна валідація та відповідні стани інтерфейсу.

---

# Form Layout Checklist

Перед завершенням дизайну форми перевір:

## Structure

- [ ] Чи зрозуміле призначення форми?
- [ ] Чи є зрозумілий заголовок, якщо він потрібний?
- [ ] Чи згруповані пов'язані поля?
- [ ] Чи розташовані поля в логічному порядку?
- [ ] Чи немає непотрібних полів?

## Layout

- [ ] Чи підходить кількість колонок?
- [ ] Чи достатня ширина полів?
- [ ] Чи узгоджені відступи?
- [ ] Чи пов'язані labels зі своїми полями?
- [ ] Чи виділена основна дія?

## Responsive Design

- [ ] Чи працює форма на мобільному екрані?
- [ ] Чи переходять колонки в одну за потреби?
- [ ] Чи не виникає горизонтального прокручування?
- [ ] Чи залишаються кнопки зручними для натискання?
- [ ] Чи не обрізається текст?

## Accessibility

- [ ] Чи має кожне поле доступну назву?
- [ ] Чи можна пройти форму клавіатурою?
- [ ] Чи помітний keyboard focus?
- [ ] Чи зрозумілі required fields?
- [ ] Чи не передається важлива інформація лише кольором?

## Feedback

- [ ] Чи передбачено місце для helper text?
- [ ] Чи можуть з'являтися error messages без руйнування layout?
- [ ] Чи зрозуміло, що відбудеться після Submit?
- [ ] Чи передбачено місце для success feedback?

---

# Питання зі співбесіди

Що таке Form Layout?

Яке основне завдання дизайну форми?

З яких частин може складатися форма?

Що таке Form Container?

Що таке Form Field?

Що таке Form Group?

Чим Form Field відрізняється від Form Group?

Що таке Single-column Layout?

Які переваги Single-column Layout?

Що таке Multi-column Layout?

Коли варто використовувати кілька колонок?

Коли краще уникати Multi-column Layout?

Чим Vertical Form відрізняється від Horizontal Form?

Що таке Inline Form?

Для яких задач підходить Inline Form?

Що таке Responsive Form Layout?

Як адаптувати двоколонкову форму до мобільного екрана?

Що таке Visual Hierarchy?

Як spacing впливає на сприйняття форми?

Чому важливо обмежувати ширину форми?

Що таке Field Order?

Як визначити логічний порядок полів?

Що таке Primary Action?

Чим Primary Action відрізняється від Secondary Action?

Як правильно позначати обов'язкові поля?

Для чого потрібні `fieldset` та `legend`?

Що таке Multi-step Form?

Коли Multi-step Form доцільніша за звичайну форму?

Що таке Progressive Disclosure?

Які помилки часто виникають у Form Layout?

Як забезпечити доступність форми?

Чому placeholder не повинен замінювати label?

Як розташовувати helper text та error messages?

Чому потрібно враховувати клавіатурну навігацію?

Які CSS-технології використовують для створення Form Layout?

Коли краще використовувати Flexbox, а коли CSS Grid?

---

# Шлях

## 🟢 Core — обов'язково знати

Розуміти призначення Form Layout.

Знати типову структуру форми.

Розрізняти Form Container та Form Field.

Розуміти Single-column Layout.

Розуміти Multi-column Layout.

Знати Vertical Form.

Знати Horizontal Form.

Знати Inline Form.

Розуміти логічний порядок полів.

Знати основні принципи spacing.

Розуміти призначення Primary Action.

Знати основи responsive layout.

Розуміти зв'язок label та input.

Знати базові принципи доступності форм.

---

## 🔵 Junior

Уміти спроєктувати login form.

Уміти спроєктувати registration form.

Уміти спроєктувати contact form.

Уміти групувати поля за призначенням.

Уміти створювати форми з Flexbox.

Уміти створювати багатоколонкові групи з CSS Grid.

Уміти адаптувати форму через media queries.

Уміти контролювати width та max-width.

Уміти створювати послідовну spacing scale.

Уміти організовувати form actions.

Уміти враховувати helper text та error messages.

Уміти використовувати `fieldset` та `legend`.

Уміти підтримувати клавіатурну навігацію.

Уміти оцінювати форму з погляду usability.

---

## 🟠 Middle

Проєктувати складні багатосекційні форми.

Визначати доцільність Single-column та Multi-column Layout.

Проєктувати Multi-step Forms.

Використовувати Progressive Disclosure.

Проєктувати conditional fields.

Враховувати довгі labels та різні обсяги тексту.

Передбачати зміну висоти форми через validation errors.

Проєктувати складні responsive layouts.

Створювати reusable form layout components.

Інтегрувати форми в дизайн-систему.

Враховувати keyboard navigation та assistive technologies.

Оцінювати cognitive load.

Оптимізувати форми на основі тестування користувачів.

---

## 🔴 Senior

Проєктувати масштабовані form systems для складних продуктів.

Визначати стандарти структури форм для різних команд.

Балансувати між щільністю інформації та зрозумілістю.

Проєктувати складні conditional workflows.

Враховувати локалізацію та різні формати даних.

Проєктувати форми для великих адміністративних систем.

Враховувати edge cases та непередбачувані обсяги контенту.

Створювати принципи доступності для всіх form patterns.

Оцінювати usability через дослідження та метрики.

Визначати, коли доцільно використовувати progressive disclosure, а коли — повністю видиму форму.

---

# Міні-шпаргалка

## Single-column

    Field 1
    [________________]

    Field 2
    [________________]

    Field 3
    [________________]

    → простий послідовний layout

---

## Multi-column

    Field 1       Field 2
    [________]    [________]

    → для пов'язаних полів, якщо достатньо простору

---

## Vertical Form

    Label
    [________________]

    → label над input

---

## Horizontal Form

    Label    [________________]

    → label поруч з input

---

## Inline Form

    [Search____________] [Search]

    → компактна горизонтальна форма

---

## Form Group

    Contact Information
        Email
        Phone

    Address
        Street
        City

    → групування за змістом

---

## Responsive Layout

    Desktop → 2 columns

    Mobile → 1 column

    → адаптація до доступної ширини

---

## Form Actions

    Primary Action
        → Save
        → Submit
        → Create Account

    Secondary Action
        → Cancel
        → Back

---

## Основні CSS-властивості

    display: flex
        → організація елементів у рядок або колонку

    flex-direction: column
        → вертикальне розташування

    display: grid
        → двовимірне розташування елементів

    grid-template-columns
        → визначення колонок

    gap
        → відстань між елементами

    width
        → ширина елемента

    max-width
        → максимальна ширина

    margin-inline: auto
        → центрування по горизонталі

    box-sizing: border-box
        → padding і border входять у задану ширину

    @media
        → адаптація до умов viewport

---

# Головне

• Form Layout визначає структуру та розташування елементів форми.

• Хороша форма має зрозуміле призначення, логічний порядок полів і помітну основну дію.

• Single-column Layout — хороший базовий варіант для багатьох форм.

• Multi-column Layout варто використовувати, коли колонки дійсно покращують композицію.

• Vertical Form зазвичай добре адаптується до мобільних пристроїв.

• Horizontal Form може бути корисною для компактних адміністративних інтерфейсів.

• Inline Form підходить для коротких задач, наприклад пошуку або підписки.

• Form Group допомагає об'єднувати поля за змістом.

• Field Order повинен відповідати логіці користувача.

• Spacing допомагає відрізняти пов'язані елементи від окремих секцій.

• Width та max-width допомагають контролювати композицію форми.

• Labels повинні бути зрозумілими та програмно пов'язаними з полями.

• Primary Action повинна чітко показувати основний наступний крок.

• Responsive Form Layout адаптується до ширини екрана.

• Multi-step Form корисна для складних процесів, але може створювати зайві переходи для простих задач.

• Progressive Disclosure дозволяє показувати додаткові поля лише тоді, коли вони потрібні.

• Accessibility потрібно враховувати вже під час проєктування структури форми.

• Flexbox зручний для вертикального розташування полів та організації кнопок.

• CSS Grid зручний для створення колонок і складніших двовимірних структур.

• Helper text та error messages потрібно враховувати в композиції заздалегідь.

• Найкращий Form Layout — не обов'язково найкомпактніший. Він має допомагати користувачу правильно, послідовно та без зайвих труднощів виконувати свою задачу.

Основна модель Form Layout:

    Form Purpose
        ↓
    Form Structure
        ↓
    Field Grouping
        ↓
    Field Order
        ↓
    Labels + Inputs
        ↓
    Spacing + Alignment
        ↓
    Responsive Layout
        ↓
    Form Actions
        ↓
    Validation + Feedback
        ↓
    Accessibility + Usability

Правильний Form Layout поєднує візуальну ієрархію, логічну структуру, адаптивність і зручність взаємодії.