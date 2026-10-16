# 02. Labels

Labels (мітки полів) — це текстові назви, які пояснюють призначення полів введення та інших елементів форми.

Label допомагає користувачу зрозуміти, яку інформацію потрібно ввести або яку опцію вибрати.

Наприклад:

    Email Address
    [________________________]

    Password
    [________________________]

    Phone Number
    [________________________]

У цьому прикладі:

    Email Address → label
    [___________] → input

Labels є важливою частиною UI Design, UX та accessibility, оскільки вони допомагають користувачу правильно інтерпретувати поля форми.

Labels використовуються в:

    login forms
    registration forms
    contact forms
    search forms
    checkout forms
    profile settings
    application forms
    filters
    data entry forms
    surveys
    admin dashboards

Основні теми Labels:

    Label Basics
    Label Placement
    Label Association
    Visible Labels
    Required Fields
    Optional Fields
    Label Clarity
    Label Consistency
    Labels vs Placeholders
    Labels for Different Input Types
    Accessible Labels
    Dynamic Labels
    Labels in Complex Forms

---

### Ключові поняття

✔ label
✔ form label
✔ input label
✔ visible label
✔ accessible name
✔ label association
✔ explicit label
✔ implicit label
✔ `for`
✔ `id`
✔ placeholder
✔ helper text
✔ required field
✔ optional field
✔ field identification
✔ label placement
✔ label clarity
✔ label consistency
✔ label hierarchy
✔ form usability
✔ accessibility
✔ screen reader
✔ assistive technology
✔ checkbox label
✔ radio button label
✔ select label
✔ floating label
✔ persistent label
✔ ambiguous label
✔ descriptive text
✔ `aria-label`
✔ `aria-labelledby`

---

### Що потрібно пам'ятати

• Label пояснює призначення поля форми.

• Кожне поле введення повинно мати зрозумілу доступну назву.

• Видимий label зазвичай розташовують над полем або поруч із ним.

• Label повинен бути однозначно пов'язаний із відповідним input.

• В HTML для явного зв'язку використовують `for` у `<label>` та відповідний `id` в input.

• Натискання на label, пов'язаний із текстовим полем або checkbox, дозволяє активувати відповідний елемент.

• Placeholder не повинен замінювати постійний label.

• Текст label має бути коротким, зрозумілим і конкретним.

• Labels однотипних полів повинні мати узгоджений стиль.

• Не варто використовувати різні назви для однакових за призначенням полів без потреби.

• Обов'язковість поля потрібно позначати зрозуміло та послідовно.

• Колір не повинен бути єдиним способом передавання інформації про поле.

• `aria-label` та `aria-labelledby` можуть задавати доступну назву, але не завжди замінюють потребу у видимому label.

• Checkbox і radio button зазвичай мають текстову назву, яка пояснює, що саме користувач вибирає.

• Label повинен залишатися зрозумілим при збільшенні масштабу сторінки та адаптації інтерфейсу.

---

# Label Basics

Label — це текстова назва елемента форми.

Наприклад:

    Username
    [________________]

    Email
    [________________]

    Date of Birth
    [________________]

Label відповідає на запитання:

    What information should the user enter?

Або для елементів вибору:

    What does this option mean?

Наприклад:

    ☑ Receive email notifications

Текст `Receive email notifications` пояснює призначення checkbox.

### Основні завдання label

• Ідентифікувати поле.

• Пояснювати, які дані потрібно ввести.

• Зменшувати невизначеність.

• Допомагати користувачеві орієнтуватися у формі.

• Забезпечувати зрозумілу назву для допоміжних технологій.

• Допомагати користувачеві повертатися до поля після помилки.

Label не повинен містити надмірну кількість інструкцій. Додаткові пояснення можна винести в helper text.

---

# Visible Label

Visible Label — текстова назва поля, яку користувач бачить на екрані.

Приклад:

    Email Address
    [________________________]

    Password
    [________________________]

Це стандартний і зрозумілий спосіб ідентифікації полів.

### Переваги

• Користувач постійно бачить призначення поля.

• Назва не зникає після введення даних.

• Полегшується перевірка заповненої форми.

• Користувачеві легше зрозуміти помилку.

• Інтерфейс стає передбачуванішим.

• Можна використовувати додаткові підказки поруч із полем.

### HTML-приклад

    <div class="form__field">
        <label for="email">
            Email Address
        </label>

        <input
            id="email"
            name="email"
            type="email"
        />
    </div>

Тут label завжди залишається видимим, незалежно від того, чи заповнено input.

### Коли використовувати

Visible Labels доцільні для:

    registration forms
    login forms
    contact forms
    profile forms
    checkout forms
    settings forms
    complex data entry forms

У більшості звичайних форм видимий label є надійним базовим рішенням.

---

# Label Association

Label Association — програмний зв'язок між label та відповідним полем форми.

У HTML існують два основні способи пов'язати label з input:

    Explicit Label
    Implicit Label

Обидва способи дозволені HTML, але explicit association особливо зручна для підтримки зрозумілої структури та послідовного написання коду.

---

# Explicit Label

Explicit Label — label, який пов'язаний із полем через атрибути `for` та `id`.

Приклад:

    <label for="email">
        Email Address
    </label>

    <input
        id="email"
        name="email"
        type="email"
    />

Тут:

    for="email"
        → вказує на id відповідного поля

    id="email"
        → ідентифікує input

Значення `for` та `id` повинні збігатися.

### Як це працює

    label
        ↓
    for="email"
        ↓
    input
        ↓
    id="email"

Браузер розуміє, що цей label належить конкретному input.

### Переваги

• Label можна розміщувати окремо від input у межах документа.

• Клік по label активує пов'язане поле.

• Код легко читати та підтримувати.

• Зв'язок між елементами явно видно в HTML.

### Важливо

`id` повинен бути унікальним у межах HTML-документа.

Неправильно:

    <label for="email">Email</label>
    <input id="email" type="email" />

    <label for="email">Work Email</label>
    <input id="email" type="email" />

У цьому прикладі два елементи мають однаковий `id`, що створює неоднозначність.

Правильно:

    <label for="personal-email">
        Personal Email
    </label>

    <input
        id="personal-email"
        name="personalEmail"
        type="email"
    />

    <label for="work-email">
        Work Email
    </label>

    <input
        id="work-email"
        name="workEmail"
        type="email"
    />

---

# Implicit Label

Implicit Label — спосіб пов'язати label з полем, помістивши input всередину елемента `<label>`.

Приклад:

    <label>
        Email Address

        <input
            name="email"
            type="email"
        />
    </label>

У цьому випадку явні атрибути `for` та `id` для зв'язку не потрібні.

### Переваги

• HTML-структура безпосередньо об'єднує label та input.

• Не потрібно окремо узгоджувати `for` та `id` для цього зв'язку.

### Недоліки

• Складнішу структуру форми іноді важче читати.

• Якщо потрібно гнучко розміщувати елементи, вкладена структура може бути менш зручною.

### Порівняння

Explicit:

    <label for="name">Full Name</label>
    <input id="name" name="name" type="text" />

Implicit:

    <label>
        Full Name
        <input name="name" type="text" />
    </label>

Обидва варіанти створюють зв'язок label та input.

Для навчальних проєктів і більшості типових форм зручно використовувати explicit labels, особливо коли структура містить helper text, error messages та окремі контейнерні елементи.

---

# Label Placement

Label Placement — розташування label відносно поля введення.

Основні варіанти:

    Label Above Input
    Label Beside Input
    Inline Label
    Floating Label

---

# Label Above Input

Label Above Input — label розташований над полем.

Приклад:

    Email Address
    [________________________]

    Password
    [________________________]

Це один із найпоширеніших патернів у вебформах.

### Переваги

• Добре читається.

• Підходить для довгих назв полів.

• Зручний для мобільних пристроїв.

• Дозволяє розміщувати helper text та error messages під input.

• Легко підтримувати послідовне вирівнювання.

### CSS-приклад

    .form__field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .form__field label {
        font-size: 0.875rem;
        font-weight: 600;
    }

Цей варіант є хорошою відправною точкою для більшості звичайних форм.

---

# Label Beside Input

Label Beside Input — label розташований ліворуч або праворуч від поля.

Приклад:

    Full Name     [________________________]

    Email         [________________________]

Такий варіант часто використовується в адміністративних панелях, налаштуваннях і компактних інтерфейсах.

### CSS-приклад

    .form__field--horizontal {
        display: grid;
        grid-template-columns: 10rem minmax(0, 1fr);
        align-items: start;
        gap: 1rem;
    }

HTML:

    <div class="form__field form__field--horizontal">
        <label for="display-name">
            Display Name
        </label>

        <input
            id="display-name"
            name="displayName"
            type="text"
        />
    </div>

### Недоліки

• Довгі labels можуть погіршувати вирівнювання.

• Поля можуть ставати надто вузькими.

• На мобільному екрані розташування поруч може бути незручним.

Для адаптивного інтерфейсу label можна перемістити над input за допомогою media query.

---

# Inline Label

Inline Label — назва або підпис, розташовані в одному рядку з полем або іншим елементом керування.

Наприклад:

    Search: [____________________] [Go]

Або:

    Items per page: [10 ▼]

Inline-підхід може бути корисним для коротких підписів у компактних інтерфейсах.

Однак не слід плутати звичайний inline label із placeholder.

Порівняй:

    Search:
    [____________________]

та:

    [Search products...___]

У першому прикладі `Search:` може бути окремою назвою поля.

У другому прикладі `Search products...` може бути placeholder, який зникає або стає менш помітним під час введення.

Якщо текст виконує роль label, він повинен бути реалізований як доступна назва поля, а не просто як декоративний текст.

---

# Floating Label

Floating Label — патерн, у якому label спочатку може розташовуватися всередині поля, а після фокуса або введення переміщується до верхнього краю.

Приклад початкового стану:

    ┌────────────────────────┐
    │ Email Address          │
    └────────────────────────┘

Після введення:

    Email Address
    ┌────────────────────────┐
    │ user@example.com       │
    └────────────────────────┘

Floating Labels можуть допомагати економити простір, але вимагають уважного проєктування.

### Потенційні проблеми

• Назва поля може бути малопомітною.

• Анімація може відволікати.

• Маленький текст може погіршувати читабельність.

• Під час заповнення користувач може не помічати label.

• Реалізація лише через placeholder може призвести до втрати постійної назви поля.

### Принцип

Навіть якщо label змінює положення, він повинен залишатися доступним і зрозумілим.

Не варто будувати Floating Label так, щоб після введення даних користувач більше не міг визначити призначення поля.

Floating Label — це візуальний патерн, а не окремий HTML-елемент.

---

# Labels vs Placeholders

Labels та Placeholders мають різне призначення.

Label пояснює, що це за поле.

Placeholder може показувати приклад значення або коротку підказку.

Приклад:

    Email Address
    [name@example.com]

Тут:

    Email Address
        → label

    name@example.com
        → placeholder

### Label

    відповідає на запитання:
    What is this field?

### Placeholder

    відповідає на запитання:
    What could I enter here?

### Правильний приклад

    <label for="email">
        Email Address
    </label>

    <input
        id="email"
        name="email"
        type="email"
        placeholder="name@example.com"
    />

### Неправильний підхід

    <input
        type="email"
        placeholder="Email Address"
    />

У другому прикладі немає окремого видимого label.

Placeholder не є надійною заміною label, оскільки він може зникати під час введення даних, а його контраст часто нижчий за контраст основного тексту.

Детальніше ця тема розглядатиметься в:

    03-placeholders

---

# Label Clarity

Label Clarity — зрозумілість назви поля.

Хороший label дозволяє користувачу зрозуміти призначення поля без додаткових здогадок.

Порівняй:

Нечітко:

    Data
    Type
    Value
    Info

Зрозуміліше:

    Date of Birth
    Account Type
    Product Price
    Contact Information

Конкретна назва залежить від задачі та контексту інтерфейсу.

### Принципи зрозумілого label

• Використовуй конкретні слова.

• Уникай неоднозначних скорочень.

• Не змушуй користувача здогадуватися про формат даних.

• Не використовуй внутрішні терміни системи, якщо користувач їх не знає.

• Дотримуйся звичної для продукту термінології.

• Використовуй однакові назви для однакових понять.

### Приклад

Нечітко:

    Number

Зрозуміліше:

    Phone Number

Або:

    Order Number

Або:

    Number of Participants

Назва повинна відповідати типу інформації, яку потрібно ввести.

---

# Label Length

Label Length — довжина текстової назви поля.

Надто короткий label може бути незрозумілим, а надто довгий — перевантажувати форму.

Приклади:

    Name
    Email
    Phone Number
    Delivery Address

Для складніших полів може знадобитися конкретніша назва:

    Preferred Delivery Date

Але не варто перетворювати кожен label на довгу інструкцію.

Наприклад, замість:

    Please enter the email address that you use regularly

краще:

    Email Address

Додаткове пояснення можна розмістити окремо:

    Use an email address you can access.

### Основне правило

    Label
        → коротка назва поля

    Helper Text
        → додаткове пояснення

Такий поділ покращує читабельність і спрощує повторне використання компонентів.

---

# Label Consistency

Label Consistency — послідовне використання назв, стилів та правил оформлення.

Наприклад, у межах однієї форми не варто без причини чергувати:

    Email
    Email Address
    Your Email
    E-mail

Якщо всі назви описують одне й те саме поле, краще обрати єдиний стиль.

### Візуальна узгодженість

Однотипні labels повинні мати узгоджені:

    font-family
    font-size
    font-weight
    color
    spacing
    alignment

### Узгодженість формулювань

Якщо форма використовує:

    First Name
    Last Name
    Email Address

варто дотримуватися подібного стилю в інших полях.

### CSS-приклад

    .form__field label {
        display: block;
        margin-bottom: 0.5rem;

        font-size: 0.875rem;
        font-weight: 600;
        line-height: 1.4;
    }

Це дозволяє підтримувати однаковий вигляд labels у всій формі.

У великому проєкті такі правила можуть бути частиною дизайн-системи.

---

# Label Typography

Типографіка label впливає на читабельність і візуальну ієрархію.

Зазвичай label має бути добре помітним, але не повинен конкурувати із заголовком форми.

### Основні властивості

    font-family
    font-size
    font-weight
    line-height
    color
    letter-spacing

Приклад:

    .form__field label {
        font-size: 0.875rem;
        font-weight: 600;
        line-height: 1.4;
        color: #222;
    }

Це лише один із можливих варіантів оформлення.

Не обов'язково робити кожен label жирним. Важливо, щоб текст був читабельним і чітко відрізнявся від допоміжних пояснень.

### Контраст

Текст label повинен мати достатній контраст із фоном.

Для звичайного тексту WCAG AA зазвичай вимагає коефіцієнт контрастності не менше 4.5:1.

Для великого тексту вимога становить 3:1.

Текст labels у формах часто невеликий, тому варто орієнтуватися на вимогу 4.5:1.

Не використовуй надто світло-сірий текст на білому фоні лише заради мінімалістичного вигляду.

---

# Required Field Labels

Required Field — поле, яке користувач повинен заповнити для виконання певної дії.

Приклад:

    Email *
    [________________________]

    Password *
    [________________________]

Зірочка часто використовується для позначення обов'язкових полів.

Але сама позначка повинна бути пояснена.

Наприклад:

    * Required field

Або:

    Fields marked with * are required.

### HTML-приклад

    <div class="form__field">
        <label for="email">
            Email Address
            <span aria-hidden="true">*</span>
        </label>

        <input
            id="email"
            name="email"
            type="email"
            required
        />
    </div>

Тут:

    *
        → візуальна позначка

    required
        → HTML-атрибут, який вказує, що поле обов'язкове

Важливо: позначка `*` сама по собі не робить поле обов'язковим.

Так само `required` не замінює зрозумілого візуального пояснення.

### Альтернативний підхід

Якщо більшість полів обов'язкові, можна позначати лише необов'язкові поля.

Наприклад:

    Name
    Email
    Phone (optional)

Вибір залежить від кількості полів, контексту та очікувань користувачів.

Головне — не змішувати різні правила без пояснення.

---

# Optional Field Labels

Optional Field — поле, яке можна залишити незаповненим.

Приклад:

    Company Name (optional)
    [________________________]

    Apartment Number (optional)
    [________________________]

Позначення `(optional)` допомагає користувачу зрозуміти, що поле не є обов'язковим.

### Коли використовувати

• Коли поле може бути корисним, але не є необхідним.

• Коли користувач може не мати відповідних даних.

• Коли пропуск поля не заважає виконанню основної задачі.

### Принципи

• Не позначай поле як optional, якщо воно фактично обов'язкове.

• Використовуй однаковий формат позначення.

• Не додавай необов'язкові поля без практичної потреби.

• Не змушуй користувача вводити зайві персональні дані.

---

# Labels for Text Inputs

Text Input — поле для введення текстових значень.

Приклади:

    Full Name
    Email Address
    Username
    Company Name

HTML:

    <label for="username">
        Username
    </label>

    <input
        id="username"
        name="username"
        type="text"
    />

### Принципи

• Назва має відповідати очікуваному значенню.

• Якщо існують спеціальні вимоги до формату, їх можна пояснити в helper text.

• Не використовуй загальний label `Text`, якщо можна вказати конкретне призначення.

---

# Labels for Email and Password

Email та Password — поширені поля автентифікації.

Приклад:

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

    <label for="password">
        Password
    </label>

    <input
        id="password"
        name="password"
        type="password"
        autocomplete="current-password"
        required
    />

Для реєстрації значення `autocomplete` для нового пароля зазвичай буде `new-password`.

### Принципи

• Використовуй конкретні назви полів.

• Не замінюй label текстом placeholder.

• Для password можна передбачити кнопку показу або приховування пароля.

• Якщо існують вимоги до пароля, пояснюй їх поруч із полем.

• Не приховуй важливі вимоги лише в тексті, який зникає.

---

# Labels for Checkboxes

Checkbox — елемент, який дозволяє вибрати або скасувати вибір опції.

Приклад:

    ☑ Receive email notifications

Тут текст пояснює, що саме змінює checkbox.

### HTML-приклад

    <label>
        <input
            type="checkbox"
            name="notifications"
        />

        Receive email notifications
    </label>

Або з explicit association:

    <input
        id="notifications"
        name="notifications"
        type="checkbox"
    />

    <label for="notifications">
        Receive email notifications
    </label>

### Принципи

• Label повинен описувати наслідок вибору.

• Користувач повинен розуміти, що означає встановлена позначка.

• Не використовуй надто загальні назви, наприклад `Option 1`.

• Якщо опція має важливі наслідки, поясни їх додатково.

### Приклад

Нечітко:

    ☑ Notifications

Зрозуміліше:

    ☑ Receive email notifications

Ще конкретніше, якщо це відповідає продукту:

    ☑ Receive weekly product updates by email

---

# Labels for Radio Buttons

Radio Buttons дозволяють вибрати одну опцію з групи взаємовиключних варіантів.

Приклад:

    Delivery Method

    (•) Standard Delivery
    ( ) Express Delivery
    ( ) Store Pickup

Кожна опція повинна мати власний label.

### HTML-приклад

    <fieldset>
        <legend>Delivery Method</legend>

        <label>
            <input
                type="radio"
                name="delivery"
                value="standard"
            />

            Standard Delivery
        </label>

        <label>
            <input
                type="radio"
                name="delivery"
                value="express"
            />

            Express Delivery
        </label>

        <label>
            <input
                type="radio"
                name="delivery"
                value="pickup"
            />

            Store Pickup
        </label>
    </fieldset>

Тут:

    legend
        → назва групи

    label
        → назва окремої опції

    name="delivery"
        → об'єднує radio buttons в одну групу

### Принципи

• Назва групи пояснює, що потрібно вибрати.

• Кожен варіант має зрозумілу назву.

• Опції повинні бути взаємовиключними.

• Необхідно уникати неоднозначних скорочень.

---

# Labels for Select

Select — елемент для вибору значення зі списку.

Приклад:

    Country

    [Select a country ▼]

HTML:

    <label for="country">
        Country
    </label>

    <select
        id="country"
        name="country"
    >
        <option value="">
            Select a country
        </option>

        <option value="ua">
            Ukraine
        </option>

        <option value="pl">
            Poland
        </option>
    </select>

У цьому прикладі:

    Country
        → label

    Select a country
        → текст початкової option

Текст початкової option не повинен бути єдиним способом пояснення призначення select.

### Принципи

• Label пояснює, що саме потрібно вибрати.

• Початкова option може підказувати очікувану дію.

• Назви опцій повинні бути зрозумілими.

• Не варто використовувати неоднозначні значення без контексту.

---

# Labels for Date and Number Inputs

Для дат, часу та числових значень важливо вказувати, що саме потрібно ввести.

Нечітко:

    Date
    Number
    Amount

Зрозуміліше:

    Date of Birth
    Number of Participants
    Total Amount

Приклади:

    <label for="birth-date">
        Date of Birth
    </label>

    <input
        id="birth-date"
        name="birthDate"
        type="date"
    />

    <label for="participants">
        Number of Participants
    </label>

    <input
        id="participants"
        name="participants"
        type="number"
        min="1"
    />

Якщо формат або одиниці вимірювання можуть бути незрозумілими, додай helper text.

Наприклад:

    Weight

    [________]

    Enter weight in kilograms.

Label називає поле, а helper text уточнює одиниці вимірювання.

---

# Labels for Search Fields

Search Field — поле, яке дозволяє користувачу шукати інформацію.

Приклад:

    Search Products
    [________________________]

Label повинен пояснювати, що саме можна знайти.

Залежно від контексту:

    Search Products
    Search Users
    Search Articles
    Search Orders

### HTML-приклад

    <form role="search">
        <label for="product-search">
            Search Products
        </label>

        <input
            id="product-search"
            name="query"
            type="search"
        />

        <button type="submit">
            Search
        </button>
    </form>

Для компактного інтерфейсу видимий label іноді може бути візуально прихований, якщо користувачі отримують достатньо контексту, а поле має доступну назву.

Але приховувати label лише заради економії простору без перевірки доступності не варто.

---

# Labels vs Helper Text

Label та Helper Text виконують різні функції.

Label:

    Email Address

Helper Text:

    We will send account notifications to this address.

Label називає поле.

Helper Text пояснює додаткові вимоги, контекст або наслідки.

### HTML-приклад

    <div class="form__field">
        <label for="email">
            Email Address
        </label>

        <input
            id="email"
            name="email"
            type="email"
            aria-describedby="email-help"
        />

        <p id="email-help">
            We will use this address for account notifications.
        </p>
    </div>

Тут:

    label
        → назва поля

    aria-describedby
        → пов'язує поле з додатковим описом

    id="email-help"
        → ідентифікує текст пояснення

`aria-describedby` не замінює label. Він додає до доступної інформації допоміжний опис.

---

# Accessible Labels

Accessible Label — назва поля, яку можуть визначити допоміжні технології, наприклад screen readers.

Кожне поле форми повинно мати доступну назву.

Важливо розрізняти:

    Visible Label
        → текст, який бачить користувач

    Accessible Name
        → назва, яку визначають допоміжні технології

У багатьох випадках visible label одночасно забезпечує accessible name.

Наприклад:

    <label for="email">
        Email Address
    </label>

    <input
        id="email"
        name="email"
        type="email"
    />

Це базовий і надійний підхід.

### Чому це важливо

Користувач screen reader повинен розуміти:

    яке це поле
    що потрібно ввести
    з яким полем пов'язана помилка
    які додаткові інструкції потрібно врахувати

Якщо доступна назва відсутня або незрозуміла, користувач може не зрозуміти призначення елемента.

---

# aria-label

`aria-label` — атрибут, який задає доступну назву елемента через текстове значення.

Приклад:

    <input
        type="search"
        aria-label="Search products"
    />

У цьому прикладі поле отримує доступну назву `Search products`, навіть якщо окремого видимого label немає.

### Коли може бути корисним

• Для деяких компактних елементів інтерфейсу.

• Для icon-only controls.

• Для елементів, де видимий текстовий label неможливо або недоцільно показати.

### Важливі обмеження

• `aria-label` сам по собі не створює видимого тексту.

• Користувачі, які не використовують screen reader, можуть не бачити призначення поля.

• Якщо можна використати видимий HTML `<label>`, зазвичай варто почати саме з нього.

• Не потрібно дублювати доступну назву різними способами без потреби.

Наприклад, для звичайного поля email краще:

    <label for="email">
        Email Address
    </label>

    <input
        id="email"
        name="email"
        type="email"
    />

ніж приховувати всю назву поля в `aria-label`.

---

# aria-labelledby

`aria-labelledby` — атрибут, який визначає доступну назву елемента через `id` іншого або інших елементів.

Приклад:

    <h2 id="search-heading">
        Search Products
    </h2>

    <input
        type="search"
        aria-labelledby="search-heading"
    />

У цьому випадку текст заголовка використовується як доступна назва поля.

### Відмінність

    aria-label
        → назва задається безпосередньо текстом атрибута

    aria-labelledby
        → назва береться з іншого елемента за його id

Для звичайних полів із видимим label простіше використовувати стандартний `<label>`.

ARIA потрібно застосовувати відповідно до конкретної задачі, а не додавати автоматично до кожного елемента.

---

# Visually Hidden Labels

Іноді дизайн вимагає приховати label візуально, але залишити його доступним для допоміжних технологій.

Це називається Visually Hidden Label.

Приклад:

    <label class="visually-hidden" for="site-search">
        Search the website
    </label>

    <input
        id="site-search"
        name="query"
        type="search"
    />

CSS:

    .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
        border: 0;
    }

Такий підхід приховує текст візуально, але залишає його в документі для допоміжних технологій.

### Коли використовувати

• Коли призначення поля очевидне з контексту для більшості користувачів, а окремий видимий текст суттєво заважає композиції.

• У деяких компактних пошукових інтерфейсах.

• Коли дизайн використовує іконку пошуку, але поле все одно потребує доступної назви.

### Коли не варто використовувати

• Якщо користувачам потрібна видима назва для розуміння поля.

• Якщо поле складне або вимагає додаткових пояснень.

• Якщо приховування label погіршує usability.

Visually Hidden Label — це технічний засіб доступності, а не універсальна заміна видимих labels.

---

# Labels for Icon-only Controls

Деякі інтерфейси використовують іконки замість тексту.

Наприклад:

    [🔍]
    [×]
    [☰]

Іконка може бути зрозумілою візуально, але її призначення не завжди очевидне для допоміжних технологій.

Для кнопки пошуку:

    <button
        type="button"
        aria-label="Open search"
    >
        <svg aria-hidden="true">
            ...
        </svg>
    </button>

Тут:

    aria-label
        → доступна назва кнопки

    aria-hidden="true"
        → декоративна іконка не дублює назву

Цей приклад стосується кнопки, а не label поля введення.

Для самого пошукового поля потрібно окремо забезпечити зрозумілу назву.

Не плутай назву поля з назвою кнопки, яка виконує дію.

---

# Labels for Groups of Fields

Коли кілька полів належать до однієї групи, важливо розрізняти:

    Group Label
    Individual Field Label

Приклад:

    Delivery Address

    Street
    [________________]

    City
    [________________]

    Postal Code
    [________________]

`Delivery Address` — назва групи.

`Street`, `City`, `Postal Code` — labels окремих полів.

### HTML-приклад

    <fieldset>
        <legend>Delivery Address</legend>

        <div class="form__field">
            <label for="street">
                Street
            </label>

            <input
                id="street"
                name="street"
                type="text"
            />
        </div>

        <div class="form__field">
            <label for="city">
                City
            </label>

            <input
                id="city"
                name="city"
                type="text"
            />
        </div>

        <div class="form__field">
            <label for="postal-code">
                Postal Code
            </label>

            <input
                id="postal-code"
                name="postalCode"
                type="text"
            />
        </div>
    </fieldset>

Важливо: `legend` не замінює індивідуальні labels для полів.

Користувач повинен розуміти і загальну тему групи, і призначення кожного окремого input.

---

# Dynamic Labels

Dynamic Labels — назви полів або пов'язані з ними тексти, які змінюються залежно від стану інтерфейсу чи вибору користувача.

Наприклад:

    Account Type

    (•) Personal
    ( ) Business

Якщо користувач вибирає Business, форма може показати поле:

    Company Name

Або назва поля може змінюватися залежно від вибраної одиниці чи типу даних.

### Принципи

• Зміна тексту повинна бути логічною.

• Label має залишатися зрозумілим.

• Динамічні зміни не повинні створювати неоднозначність.

• Важливі зміни потрібно робити доступними для допоміжних технологій.

• Не змінюй назву поля без причини, якщо це може заплутати користувача.

У складних формах часто краще показувати або приховувати відповідні поля, зберігаючи стабільні назви, а не постійно перейменовувати їх.

---

# Labels in Validation States

Під час валідації label повинен залишатися зрозумілим і послідовним.

Наприклад:

    Email Address
    [invalid-email____________]

    Enter a valid email address.

Назва поля не повинна зникати лише тому, що поле містить помилку.

### Основні принципи

• Не змінюй label на текст помилки.

• Розміщуй error message поруч із відповідним полем.

• Не використовуй лише колір для позначення помилки.

• Зберігай програмний зв'язок між label та input.

• Якщо потрібно, пов'язуй текст помилки з полем через `aria-describedby`.

### HTML-приклад

    <div class="form__field">
        <label for="email">
            Email Address
        </label>

        <input
            id="email"
            name="email"
            type="email"
            aria-invalid="true"
            aria-describedby="email-error"
        />

        <p id="email-error">
            Enter a valid email address.
        </p>
    </div>

Тут:

    aria-invalid="true"
        → повідомляє, що значення поля не проходить перевірку

    aria-describedby="email-error"
        → пов'язує поле з текстом помилки

Цей приклад показує структуру стану помилки. У реальному застосунку `aria-invalid` та текст помилки потрібно встановлювати відповідно до фактичного результату валідації.

Детальніше validation та error messages розглядатимуться в:

    04-validation
    05-error-messages

---

# Labels in Design Systems

У дизайн-системі Labels повинні мати спільні правила оформлення та використання.

Наприклад:

    Form Label
        ├── Typography
        ├── Color
        ├── Spacing
        ├── Required Marker
        ├── Optional Marker
        └── Accessibility Rules

### Що варто стандартизувати

• Типографіку labels.

• Відстань між label та input.

• Стиль позначення required fields.

• Стиль позначення optional fields.

• Розташування labels у стандартних формах.

• Поведінку labels на мобільних пристроях.

• Правила для checkbox та radio labels.

• Правила для helper text і error messages.

• Вимоги до доступних назв.

### Приклад CSS-змінних

    :root {
        --form-label-font-size: 0.875rem;
        --form-label-font-weight: 600;
        --form-label-line-height: 1.4;
        --form-label-color: #222;
        --form-label-gap: 0.5rem;
    }

    .form__field {
        display: flex;
        flex-direction: column;
        gap: var(--form-label-gap);
    }

    .form__field label {
        font-size: var(--form-label-font-size);
        font-weight: var(--form-label-font-weight);
        line-height: var(--form-label-line-height);
        color: var(--form-label-color);
    }

Це дозволяє змінювати стиль labels централізовано.

У React-проєктах такі правила можуть бути частиною спільного компонента FormField.

---

# Labels in React

У React принцип зв'язку label та input залишається таким самим, але JSX використовує `htmlFor` замість HTML-атрибута `for`.

Приклад:

    function EmailField() {
        return (
            <div className="form__field">
                <label htmlFor="email">
                    Email Address
                </label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                />
            </div>
        );
    }

Важливо:

    HTML:
        for="email"

    JSX:
        htmlFor="email"

У JSX потрібно використовувати `htmlFor`.

### Кілька полів

    function LoginForm() {
        return (
            <form>
                <div className="form__field">
                    <label htmlFor="email">
                        Email Address
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="form__field">
                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                    />
                </div>

                <button type="submit">
                    Sign In
                </button>
            </form>
        );
    }

У цьому прикладі:

    htmlFor
        → пов'язує label з input

    id
        → забезпечує відповідний ідентифікатор

    name
        → визначає назву поля у формі

    autoComplete
        → допомагає браузеру автоматично заповнювати дані

    required
        → вказує на обов'язковість поля

`htmlFor` не є заміною `id`: для явного зв'язку потрібні обидва атрибути з відповідними значеннями.

---

# Labels in Reusable Components

У великих застосунках часто створюють повторно використовуваний компонент FormField.

Наприклад:

    type FormFieldProps = {
        id: string;
        label: string;
        name: string;
        type?: string;
        required?: boolean;
    };

    function FormField({
        id,
        label,
        name,
        type = "text",
        required = false,
    }: FormFieldProps) {
        return (
            <div className="form__field">
                <label htmlFor={id}>
                    {label}
                    {required && (
                        <span aria-hidden="true">
                            {" "}*
                        </span>
                    )}
                </label>

                <input
                    id={id}
                    name={name}
                    type={type}
                    required={required}
                />
            </div>
        );
    }

Використання:

    <FormField
        id="full-name"
        label="Full Name"
        name="fullName"
        required
    />

    <FormField
        id="email"
        label="Email Address"
        name="email"
        type="email"
        required
    />

Переваги:

• Єдиний стиль labels.

• Повторне використання структури.

• Менше дублювання HTML/JSX.

• Простіша підтримка дизайн-системи.

• Централізована логіка оформлення required fields.

Це навчальний приклад. У реальному компоненті можуть знадобитися підтримка helper text, error messages, різних типів input, додаткових ARIA-атрибутів та інших властивостей.

---

# Common Label Mistakes

## 1. Відсутній label

Погано:

    <input
        type="email"
        placeholder="Email Address"
    />

Проблема:

Placeholder не є надійною заміною видимого label.

Краще:

    <label for="email">
        Email Address
    </label>

    <input
        id="email"
        name="email"
        type="email"
    />

---

## 2. Невідповідні `for` та `id`

Погано:

    <label for="email">
        Email Address
    </label>

    <input
        id="user-email"
        name="email"
        type="email"
    />

Тут `for="email"` не відповідає `id="user-email"`.

Правильно:

    <label for="user-email">
        Email Address
    </label>

    <input
        id="user-email"
        name="email"
        type="email"
    />

---

## 3. Повторення `id`

Погано:

    <input id="email" type="email" />
    <input id="email" type="email" />

Проблема:

`id` повинен бути унікальним у документі.

Використовуй різні значення для різних полів.

---

## 4. Незрозумілий label

Погано:

    Type
    [Select...]

Краще:

    Account Type
    [Select...]

Назва повинна пояснювати, що саме потрібно вибрати.

---

## 5. Надто довгий label

Погано:

    Please enter the email address where you want us to send all future notifications

Краще:

    Email Address

Додаткове пояснення:

    We will send account notifications to this address.

---

## 6. Непослідовні назви

Погано:

    Email
    E-mail Address
    Your Email
    Email ID

Якщо всі поля мають однакове призначення, краще використовувати узгоджену термінологію.

---

## 7. Label зникає після введення

Якщо назва поля реалізована лише через placeholder, після введення значення користувач може втратити зрозумілий орієнтир.

Краще використовувати постійний label або правильно реалізований Floating Label.

---

## 8. Label не пов'язаний із checkbox

Погано:

    <input type="checkbox" />
    Receive notifications

Текст візуально розташований поруч, але не пов'язаний із checkbox через label.

Краще:

    <label>
        <input type="checkbox" name="notifications" />
        Receive notifications
    </label>

Або використовуй explicit association через `for` та `id`.

---

## 9. Надто низький контраст

Світлий текст на світлому фоні може бути складним для читання.

Краще перевіряти контраст labels, а не вибирати колір лише за естетичними міркуваннями.

---

## 10. `aria-label` без потреби

Якщо звичайний видимий label уже забезпечує зрозумілу назву, не потрібно автоматично додавати ще один `aria-label`, який може створити іншу назву для допоміжних технологій.

Перевагу варто надавати простій семантичній HTML-структурі.

---

# Practical Example — Accessible Registration Form

## HTML

    <form class="form">
        <h1>Create Account</h1>

        <p>
            Enter your details to get started.
        </p>

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
                <span aria-hidden="true">*</span>
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
                <span aria-hidden="true">*</span>
            </label>

            <input
                id="password"
                name="password"
                type="password"
                autocomplete="new-password"
                aria-describedby="password-help"
                required
            />

            <p id="password-help">
                Use a password that meets the
                requirements of the service.
            </p>
        </div>

        <button type="submit">
            Create Account
        </button>
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

    .form h1 {
        margin: 0;
        font-size: 1.75rem;
    }

    .form > p {
        margin: -0.75rem 0 0;
        line-height: 1.5;
    }

    .form__field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .form__field label {
        font-size: 0.875rem;
        font-weight: 600;
        line-height: 1.4;
    }

    .form__field input {
        width: 100%;
        min-height: 2.75rem;
        padding: 0.75rem;

        border: 1px solid #777;
        border-radius: 0.375rem;

        font: inherit;
    }

    .form__field input:focus-visible {
        outline: 3px solid #2563eb;
        outline-offset: 2px;
    }

    .form__field p {
        margin: 0;
        font-size: 0.875rem;
        line-height: 1.5;
    }

    .form button {
        min-height: 2.75rem;
        padding: 0.75rem 1rem;

        border: 0;
        border-radius: 0.375rem;

        font: inherit;
        font-weight: 600;

        cursor: pointer;
    }

У цьому прикладі реалізовано:

    visible labels
    explicit label association
    unique ids
    required fields
    helper text
    aria-describedby
    keyboard focus
    consistent typography
    responsive form width

Важливо: це приклад структури та оформлення. Для робочої реєстрації потрібно додати відповідну обробку Submit, валідацію та повідомлення про помилки.

---

# Label Design Checklist

Перед завершенням дизайну форми перевір:

## Clarity

- [ ] Чи зрозуміло, що означає кожен label?
- [ ] Чи немає неоднозначних назв?
- [ ] Чи використовуються зрозумілі користувачеві терміни?
- [ ] Чи відокремлені назви полів від додаткових інструкцій?

## Placement

- [ ] Чи розташований label близько до свого поля?
- [ ] Чи узгоджене вирівнювання labels?
- [ ] Чи зручне розташування на мобільних пристроях?
- [ ] Чи залишається назва поля зрозумілою після введення значення?

## Consistency

- [ ] Чи однаковий стиль однотипних labels?
- [ ] Чи послідовно використовуються назви полів?
- [ ] Чи однаково позначаються required та optional fields?
- [ ] Чи узгоджені розмір шрифту, колір та відступи?

## HTML

- [ ] Чи має кожне поле доступну назву?
- [ ] Чи збігаються `for` та `id`?
- [ ] Чи унікальні значення `id`?
- [ ] Чи пов'язані labels із checkbox та radio buttons?
- [ ] Чи використано `fieldset` та `legend` для відповідних груп?

## Accessibility

- [ ] Чи достатній контраст тексту?
- [ ] Чи можна зрозуміти форму за допомогою screen reader?
- [ ] Чи не використовується placeholder як єдина назва поля?
- [ ] Чи зрозумілі required fields?
- [ ] Чи пов'язані helper text та error messages із відповідними полями, коли це потрібно?

---

# Питання зі співбесіди

Що таке Label?

Для чого потрібні labels у формах?

Чим label відрізняється від placeholder?

Що таке Visible Label?

Що таке Accessible Name?

Що таке Explicit Label?

Що таке Implicit Label?

Як пов'язати label з input в HTML?

Для чого потрібні атрибути `for` та `id`?

Чому `id` повинен бути унікальним?

Чим `for` у HTML відрізняється від `htmlFor` у React?

Де зазвичай розташовують labels?

Які переваги Label Above Input?

Що таке Horizontal Form Label?

Що таке Floating Label?

Які потенційні проблеми Floating Labels?

Чому placeholder не повинен замінювати label?

Яким повинен бути хороший label?

Як забезпечити послідовність назв полів?

Як позначати required fields?

Як позначати optional fields?

Як пов'язати label із checkbox?

Як пов'язати label із radio button?

Для чого використовуються `fieldset` та `legend`?

Що таке `aria-label`?

Що таке `aria-labelledby`?

Чим `aria-label` відрізняється від `aria-labelledby`?

Що таке `aria-describedby`?

Чим label відрізняється від helper text?

Що таке Visually Hidden Label?

Коли доцільно використовувати Visually Hidden Label?

Як забезпечити доступну назву для пошукового поля?

Чому важливо перевіряти контраст labels?

Як організувати labels у дизайн-системі?

Як створити повторно використовуваний компонент FormField у React?

Які найпоширеніші помилки виникають під час роботи з labels?

---

# Шлях

## 🟢 Core — обов'язково знати

Розуміти призначення label.

Розрізняти label та placeholder.

Знати базову HTML-структуру label та input.

Розуміти `for` та `id`.

Знати принцип Explicit Label.

Знати принцип Implicit Label.

Уміти створювати видимі labels.

Розуміти Label Above Input.

Уміти формулювати зрозумілі назви полів.

Розуміти required та optional fields.

Знати основи доступності labels.

Розуміти, чому label не повинен зникати після введення.

---

## 🔵 Junior

Уміти створювати labels для різних input types.

Уміти пов'язувати labels із checkbox та radio buttons.

Розуміти призначення `fieldset` та `legend`.

Знати відмінності між label, helper text та placeholder.

Уміти організовувати labels у складніших формах.

Розуміти Floating Labels.

Уміти підтримувати узгоджену типографіку labels.

Знати базові вимоги до контрасту.

Розуміти призначення `aria-label`.

Розуміти призначення `aria-labelledby`.

Розуміти призначення `aria-describedby`.

Уміти використовувати `htmlFor` у React.

Уміти створювати повторно використовувані FormField components.

Уміти перевіряти зв'язки між labels та inputs.

---

## 🟠 Middle

Проєктувати систему labels для складних продуктів.

Визначати правила для required та optional fields.

Розробляти стандарти назв полів.

Ураховувати локалізацію та довжину тексту.

Проєктувати labels для динамічних форм.

Забезпечувати доступні назви для складних компонентів.

Уміти оцінювати доцільність Floating Labels.

Створювати reusable form components.

Узгоджувати labels, helper text та error messages.

Перевіряти accessibility за допомогою клавіатури та screen readers.

Визначати правила labels у дизайн-системі.

---

## 🔴 Senior

Створювати масштабовану систему найменування полів.

Визначати стандарти доступності для складних форм.

Проєктувати labels для локалізованих продуктів.

Ураховувати довгі назви, різні алфавіти та особливості мов.

Визначати правила для динамічних і умовних полів.

Узгоджувати візуальну мову labels між різними продуктами.

Враховувати доступні назви в кастомних UI-компонентах.

Визначати, коли необхідні стандартні HTML labels, а коли — інші доступні механізми.

Проводити usability та accessibility audits.

Розробляти документацію та стандарти labels для дизайн-системи.

---

# Міні-шпаргалка

## Label

    <label for="email">
        Email Address
    </label>

    <input
        id="email"
        name="email"
        type="email"
    />

    → називає поле

---

## Explicit Label

    <label for="username">
        Username
    </label>

    <input id="username" name="username" />

    for = id

---

## Implicit Label

    <label>
        Username
        <input name="username" />
    </label>

    → input розміщений усередині label

---

## React

    <label htmlFor="email">
        Email Address
    </label>

    <input
        id="email"
        name="email"
        type="email"
    />

    HTML → for

    JSX → htmlFor

---

## Label vs Placeholder

    Email Address
    [name@example.com]

    Email Address
        → label

    name@example.com
        → placeholder

---

## Label vs Helper Text

    Password
    [________________]

    Use at least 12 characters.

    Password
        → label

    Use at least 12 characters.
        → helper text

---

## Required Field

    Email *

    <input required />

    * → візуальна позначка

    required → HTML-обмеження

---

## Checkbox

    <label>
        <input type="checkbox" />
        Receive notifications
    </label>

    → label пояснює призначення checkbox

---

## Radio Buttons

    <fieldset>
        <legend>Delivery Method</legend>

        <label>
            <input type="radio" name="delivery" />
            Standard
        </label>

        <label>
            <input type="radio" name="delivery" />
            Express
        </label>
    </fieldset>

    legend → назва групи

    label → назва опції

---

## aria-label

    <input
        type="search"
        aria-label="Search products"
    />

    → задає доступну назву текстом атрибута

---

## aria-labelledby

    <h2 id="search-title">
        Search Products
    </h2>

    <input
        type="search"
        aria-labelledby="search-title"
    />

    → використовує текст іншого елемента

---

## aria-describedby

    <input
        id="password"
        aria-describedby="password-help"
    />

    <p id="password-help">
        Use a strong password.
    </p>

    → пов'язує поле з додатковим описом

---

## Основні правила

    Label
        → назва поля

    Placeholder
        → приклад або коротка підказка

    Helper Text
        → додаткове пояснення

    Error Message
        → пояснення помилки

    for + id
        → явний зв'язок label та input

    htmlFor
        → JSX-атрибут label

    aria-label
        → доступна назва через текст атрибута

    aria-labelledby
        → доступна назва з іншого елемента

    aria-describedby
        → додатковий опис

---

# Головне

• Label — це назва поля, яка пояснює користувачу його призначення.

• Кожне поле повинно мати зрозумілу доступну назву.

• Видимий label зазвичай є найкращою відправною точкою для стандартної форми.

• `for` та `id` використовуються для явного зв'язку label з input.

• Значення `for` повинно збігатися з `id` відповідного елемента.

• У React для label використовується `htmlFor`.

• Implicit Label пов'язує поле з label через вкладену HTML-структуру.

• Placeholder не повинен бути єдиною назвою поля.

• Label має бути коротким, конкретним і зрозумілим.

• Helper text використовується для додаткових пояснень, а не для заміни label.

• Required та optional fields потрібно позначати послідовно.

• Checkbox та radio buttons повинні мати зрозумілі назви опцій.

• `fieldset` та `legend` допомагають групувати пов'язані елементи форми.

• `aria-label` та `aria-labelledby` можуть задавати доступну назву, коли стандартний label не підходить.

• `aria-describedby` пов'язує поле з додатковим описом або поясненням.

• Labels повинні мати достатній контраст і залишатися зрозумілими на різних екранах.

• У дизайн-системі варто стандартизувати типографіку, spacing та правила найменування labels.

• Правильний label допомагає користувачу заповнити форму, зрозуміти помилку та впевнено взаємодіяти з інтерфейсом.

Основна модель Labels:

    Field Purpose
        ↓
    Clear Label Text
        ↓
    Visible Placement
        ↓
    Label + Input Association
        ↓
    Helper Text, if needed
        ↓
    Required / Optional State
        ↓
    Validation Feedback
        ↓
    Accessibility Check

Хороший label поєднує зрозуміле формулювання, правильний зв'язок із полем, послідовний дизайн та доступність.