# 01. Form Elements

Form elements — це HTML-елементи, які використовуються для створення форм та збору даних від користувача.

Форми є основним способом взаємодії користувача з вебсторінкою, коли потрібно:

- ввести текст;
- ввести email;
- ввести пароль;
- вибрати один варіант;
- вибрати декілька варіантів;
- вибрати дату;
- вибрати файл;
- ввести число;
- залишити коментар;
- відправити дані;
- скинути введені дані.

Основний контейнер форми:

    <form>

Основні form elements:

    <form>
    <label>
    <input>
    <textarea>
    <select>
    <option>
    <button>
    <fieldset>
    <legend>
    <datalist>
    <output>

---

# Ключові поняття

✔ form  
✔ form control  
✔ form element  
✔ `<form>`  
✔ `<label>`  
✔ `<input>`  
✔ `type`  
✔ text input  
✔ email input  
✔ password input  
✔ number input  
✔ checkbox  
✔ radio button  
✔ file input  
✔ date input  
✔ time input  
✔ color input  
✔ range input  
✔ search input  
✔ URL input  
✔ telephone input  
✔ hidden input  
✔ `<textarea>`  
✔ `<select>`  
✔ `<option>`  
✔ `<optgroup>`  
✔ `<button>`  
✔ `<fieldset>`  
✔ `<legend>`  
✔ `<datalist>`  
✔ `<output>`  
✔ form submission  
✔ form control  
✔ accessible form  
✔ label association  
✔ user input  

---

# Що потрібно пам'ятати

• `<form>` — контейнер для елементів форми.

• `<label>` — текстова назва form control.

• `<input>` — універсальний елемент для введення різних типів даних.

• Тип `<input>` визначається через `type`.

• `<textarea>` використовується для багаторядкового тексту.

• `<select>` створює список для вибору.

• `<option>` визначає окремий варіант у `<select>`.

• `<button>` створює кнопку.

• `<fieldset>` групує пов'язані form controls.

• `<legend>` задає назву групи `<fieldset>`.

• `<datalist>` містить підказки для `<input>`.

• `<output>` використовується для відображення результату обчислення або дії.

• `<label>` повинен бути пов'язаний із відповідним form control.

• Для доступності форми не варто покладатися тільки на placeholder.

• Семантичні HTML-елементи форми важливі для accessibility.

• CSS відповідає переважно за зовнішній вигляд форми, а HTML — за структуру та семантику.

---

# Form

`<form>` — основний контейнер форми.

Базовий приклад:

    <form>
        <label for="name">Name</label>
        <input type="text" id="name">

        <button type="submit">
            Submit
        </button>
    </form>

Форма об'єднує:

    labels
    inputs
    buttons
    selects
    textareas
    other controls

---

# Простий приклад форми

    <form>
        <label for="name">
            Name
        </label>

        <input
            type="text"
            id="name"
            name="name"
        >

        <button type="submit">
            Send
        </button>
    </form>

Тут:

    <form>
        → контейнер форми

    <label>
        → назва поля

    <input>
        → поле введення

    <button>
        → кнопка відправлення

---

# Form Control

Form control — елемент, за допомогою якого користувач вводить або вибирає дані.

Приклади:

    <input>
    <textarea>
    <select>
    <button>

Наприклад:

    <label for="email">
        Email
    </label>

    <input
        type="email"
        id="email"
        name="email"
    >

`<input>` у цьому прикладі є form control.

---

# Label

`<label>` — текстовий підпис для form control.

Базовий приклад:

    <label for="username">
        Username
    </label>

    <input
        type="text"
        id="username"
    >

`for` у `<label>` повинен відповідати `id` елемента.

    label[for]
          ↓
        id

Наприклад:

    <label for="email">
        Email
    </label>

    <input
        id="email"
        type="email"
    >

Тут:

    for="email"

відповідає:

    id="email"

---

# Чому label важливий

Label:

- пояснює призначення поля;
- покращує accessibility;
- збільшує область натискання;
- дозволяє screen reader зрозуміти призначення поля;
- допомагає користувачу правильно заповнити форму.

Наприклад:

    <label for="email">
        Email address
    </label>

    <input
        id="email"
        type="email"
    >

Користувач може натиснути на текст:

    Email address

і браузер сфокусує відповідне поле.

---

# Explicit Label Association

Найпоширеніший спосіб зв'язати label з input:

    <label for="name">
        Name
    </label>

    <input
        type="text"
        id="name"
    >

Правило:

    label[for]
        =
    input[id]

Наприклад:

    for="username"

повинен відповідати:

    id="username"

---

# Implicit Label Association

Можна також розмістити form control всередині `<label>`.

    <label>
        Name

        <input
            type="text"
            name="name"
        >
    </label>

У такому випадку explicit `for` не потрібен.

Але в складніших формах часто зручніше використовувати явний зв'язок:

    for + id

---

# Label та Checkbox

Приклад:

    <label for="terms">
        I agree to the terms
    </label>

    <input
        type="checkbox"
        id="terms"
        name="terms"
    >

Користувач може натиснути як на checkbox, так і на текст label.

---

# Label та Radio

    <input
        type="radio"
        id="male"
        name="gender"
        value="male"
    >

    <label for="male">
        Male
    </label>

    <input
        type="radio"
        id="female"
        name="gender"
        value="female"
    >

    <label for="female">
        Female
    </label>

---

# Input

`<input>` — універсальний form control.

Базовий синтаксис:

    <input type="text">

Тип визначає поведінку input.

Наприклад:

    <input type="text">

    <input type="email">

    <input type="password">

    <input type="number">

    <input type="date">

    <input type="checkbox">

    <input type="radio">

---

# Основні типи input

Найважливіші типи:

    text
    email
    password
    number
    tel
    url
    search
    date
    time
    datetime-local
    month
    week
    color
    range
    checkbox
    radio
    file
    hidden
    submit
    reset
    button

---

# input type="text"

Звичайне однорядкове текстове поле.

    <label for="name">
        Name
    </label>

    <input
        type="text"
        id="name"
        name="name"
    >

Використовується для:

    names
    usernames
    titles
    short text

---

# input type="email"

Поле для email.

    <label for="email">
        Email
    </label>

    <input
        type="email"
        id="email"
        name="email"
    >

Браузер розуміє, що поле призначене для email.

Це також дозволяє браузеру виконувати базову валідацію формату email.

Наприклад:

    user@example.com

---

# input type="password"

Поле для пароля.

    <label for="password">
        Password
    </label>

    <input
        type="password"
        id="password"
        name="password"
    >

Введені символи зазвичай приховуються.

Наприклад:

    ••••••••

Важливо:

`type="password"` приховує символи в інтерфейсі, але сам по собі не забезпечує безпеку передачі даних.

---

# input type="number"

Поле для числового значення.

    <label for="age">
        Age
    </label>

    <input
        type="number"
        id="age"
        name="age"
    >

Можна додатково використовувати:

    min
    max
    step

Наприклад:

    <input
        type="number"
        min="1"
        max="100"
        step="1"
    >

---

# input type="tel"

Поле для номера телефону.

    <label for="phone">
        Phone
    </label>

    <input
        type="tel"
        id="phone"
        name="phone"
    >

Приклад:

    +380501234567

`tel` повідомляє браузеру та assistive technologies, що поле призначене для телефонного номера.

---

# input type="url"

Поле для URL.

    <label for="website">
        Website
    </label>

    <input
        type="url"
        id="website"
        name="website"
    >

Приклад:

    https://example.com

---

# input type="search"

Поле для пошуку.

    <label for="search">
        Search
    </label>

    <input
        type="search"
        id="search"
        name="search"
    >

Семантично повідомляє, що поле використовується для пошуку.

---

# input type="date"

Поле для вибору дати.

    <label for="birthdate">
        Date of birth
    </label>

    <input
        type="date"
        id="birthdate"
        name="birthdate"
    >

Браузер може показувати спеціальний date picker.

---

# input type="time"

Поле для вибору часу.

    <label for="time">
        Time
    </label>

    <input
        type="time"
        id="time"
        name="time"
    >

---

# input type="datetime-local"

Вибір локальної дати та часу.

    <label for="appointment">
        Appointment
    </label>

    <input
        type="datetime-local"
        id="appointment"
        name="appointment"
    >

---

# input type="month"

Вибір місяця та року.

    <label for="month">
        Month
    </label>

    <input
        type="month"
        id="month"
        name="month"
    >

---

# input type="week"

Вибір тижня.

    <label for="week">
        Week
    </label>

    <input
        type="week"
        id="week"
        name="week"
    >

---

# input type="color"

Вибір кольору.

    <label for="color">
        Color
    </label>

    <input
        type="color"
        id="color"
        name="color"
    >

Браузер може показувати color picker.

---

# input type="range"

Повзунок для вибору значення з діапазону.

    <label for="volume">
        Volume
    </label>

    <input
        type="range"
        id="volume"
        name="volume"
        min="0"
        max="100"
        value="50"
    >

Можна використовувати:

    min
    max
    step
    value

---

# Checkbox

`checkbox` дозволяє користувачу вибрати або зняти один параметр.

    <input
        type="checkbox"
        id="terms"
        name="terms"
    >

    <label for="terms">
        I agree to the terms
    </label>

Checkbox має два основні стани:

    checked
    unchecked

---

# Checked Checkbox

Checkbox можна зробити вибраним за замовчуванням.

    <input
        type="checkbox"
        id="newsletter"
        name="newsletter"
        checked
    >

    <label for="newsletter">
        Subscribe to newsletter
    </label>

---

# Multiple Checkboxes

Кілька checkbox дозволяють вибрати декілька значень.

    <fieldset>
        <legend>
            Interests
        </legend>

        <input
            type="checkbox"
            id="html"
            name="interests"
            value="html"
        >

        <label for="html">
            HTML
        </label>

        <input
            type="checkbox"
            id="css"
            name="interests"
            value="css"
        >

        <label for="css">
            CSS
        </label>

        <input
            type="checkbox"
            id="javascript"
            name="interests"
            value="javascript"
        >

        <label for="javascript">
            JavaScript
        </label>
    </fieldset>

Користувач може вибрати:

    HTML
    CSS
    JavaScript

або будь-яку їх комбінацію.

---

# Radio Button

`radio` використовується, коли користувач повинен вибрати один варіант із групи.

    <input
        type="radio"
        id="male"
        name="gender"
        value="male"
    >

    <label for="male">
        Male
    </label>

    <input
        type="radio"
        id="female"
        name="gender"
        value="female"
    >

    <label for="female">
        Female
    </label>

---

# Radio Group

Група radio buttons визначається однаковим `name`.

    <input
        type="radio"
        name="language"
        value="html"
    >

    <input
        type="radio"
        name="language"
        value="css"
    >

    <input
        type="radio"
        name="language"
        value="javascript"
    >

Оскільки `name` однаковий:

    name="language"

користувач може вибрати тільки один варіант.

---

# Checkbox vs Radio

`checkbox`:

    → можна вибрати 0
    → можна вибрати 1
    → можна вибрати декілька

`radio`:

    → зазвичай один вибір із групи

Наприклад:

    Interests
        □ HTML
        □ CSS
        □ JavaScript

Checkbox.

А:

    Gender
        ○ Male
        ○ Female

Radio.

---

# input type="file"

Дозволяє вибрати файл.

    <label for="avatar">
        Avatar
    </label>

    <input
        type="file"
        id="avatar"
        name="avatar"
    >

Браузер відкриває системний file picker.

---

# Multiple Files

Можна дозволити вибирати декілька файлів.

    <input
        type="file"
        id="files"
        name="files"
        multiple
    >

---

# Accept

`accept` дозволяє підказати браузеру, які типи файлів бажані.

Наприклад:

    <input
        type="file"
        accept="image/*"
    >

Або:

    <input
        type="file"
        accept=".pdf,.doc,.docx"
    >

Важливо:

`accept` — це підказка для вибору файлів, а не повноцінний захист або серверна валідація.

---

# Hidden Input

`type="hidden"` створює поле, яке не відображається користувачу.

    <input
        type="hidden"
        name="userId"
        value="123"
    >

Воно може використовуватися для передачі додаткових даних разом із формою.

Hidden input:

    не видно користувачу

але:

    його значення може бути відправлене разом із form data.

Не можна використовувати hidden input як механізм безпеки.

Користувач може змінити його значення через DevTools.

---

# Submit Input

Існує спеціальний тип:

    type="submit"

Наприклад:

    <input
        type="submit"
        value="Send"
    >

Але для кнопок часто зручніше використовувати:

    <button type="submit">
        Send
    </button>

---

# Button

`<button>` — універсальний елемент для кнопок.

Базовий приклад:

    <button>
        Click me
    </button>

У формі важливо вказувати `type`.

    <button type="submit">
        Submit
    </button>

---

# Button Types

Основні типи:

    submit
    reset
    button

---

# button type="submit"

Відправляє форму.

    <button type="submit">
        Submit
    </button>

Приклад:

    <form>
        <input
            type="text"
            name="name"
        >

        <button type="submit">
            Send
        </button>
    </form>

---

# button type="reset"

Скидає значення form controls до їх початкових значень.

    <button type="reset">
        Reset
    </button>

Наприклад:

    <form>
        <input
            type="text"
            value="John"
        >

        <button type="reset">
            Reset
        </button>
    </form>

Після reset поле повернеться до початкового значення.

---

# button type="button"

Звичайна кнопка без стандартної submit-поведінки.

    <button type="button">
        Open menu
    </button>

Часто використовується разом із JavaScript.

Наприклад:

    <button
        type="button"
        id="open-menu"
    >
        Open menu
    </button>

JavaScript може реагувати на click.

---

# Чому важливо вказувати type у button

Усередині `<form>`:

    <button>
        Click
    </button>

за замовчуванням може поводитися як:

    type="submit"

Тому краще явно вказувати:

    <button type="button">
        Click
    </button>

або:

    <button type="submit">
        Submit
    </button>

Це робить код зрозумілішим і запобігає випадковому submit.

---

# Textarea

`<textarea>` використовується для багаторядкового тексту.

    <label for="message">
        Message
    </label>

    <textarea
        id="message"
        name="message"
    ></textarea>

Підходить для:

    comments
    messages
    descriptions
    feedback
    addresses
    long text

---

# Textarea з початковим значенням

На відміну від `<input>`, початковий текст `<textarea>` задається між відкриваючим і закриваючим тегом.

    <textarea
        name="message"
    >Hello</textarea>

Початкове значення:

    Hello

---

# Textarea rows

`rows` задає приблизну кількість видимих рядків.

    <textarea
        name="message"
        rows="5"
    ></textarea>

---

# Textarea cols

`cols` задає приблизну кількість символів по ширині.

    <textarea
        name="message"
        cols="40"
    ></textarea>

У сучасному CSS розміри часто контролюють через:

    width
    min-height
    max-width
    resize

Наприклад:

    textarea {
        width: 100%;
        min-height: 10rem;
        resize: vertical;
    }

---

# Select

`<select>` створює список для вибору.

    <label for="country">
        Country
    </label>

    <select
        id="country"
        name="country"
    >
        <option value="ua">
            Ukraine
        </option>

        <option value="pl">
            Poland
        </option>

        <option value="de">
            Germany
        </option>
    </select>

---

# Option

`<option>` — окремий варіант у `<select>`.

    <option value="ua">
        Ukraine
    </option>

Тут:

    value="ua"

це значення, яке буде пов'язане з вибраним option.

Текст:

    Ukraine

це label, який бачить користувач.

---

# Select та value

Наприклад:

    <select name="country">
        <option value="ua">
            Ukraine
        </option>

        <option value="pl">
            Poland
        </option>
    </select>

Якщо користувач вибере:

    Ukraine

значення буде:

    ua

Якщо вибере:

    Poland

значення буде:

    pl

---

# Selected Option

Можна встановити початково вибраний option.

    <select name="country">
        <option value="ua" selected>
            Ukraine
        </option>

        <option value="pl">
            Poland
        </option>
    </select>

---

# Disabled Option

Option можна зробити недоступним.

    <option
        value=""
        disabled
        selected
    >
        Select country
    </option>

Це часто використовується як placeholder для `<select>`.

---

# Optgroup

`<optgroup>` дозволяє групувати options.

    <select name="language">

        <optgroup label="Frontend">
            <option value="html">
                HTML
            </option>

            <option value="css">
                CSS
            </option>

            <option value="javascript">
                JavaScript
            </option>
        </optgroup>

        <optgroup label="Backend">
            <option value="node">
                Node.js
            </option>

            <option value="python">
                Python
            </option>
        </optgroup>

    </select>

---

# Multiple Select

`multiple` дозволяє вибрати декілька options.

    <label for="languages">
        Languages
    </label>

    <select
        id="languages"
        name="languages"
        multiple
    >
        <option value="html">
            HTML
        </option>

        <option value="css">
            CSS
        </option>

        <option value="javascript">
            JavaScript
        </option>
    </select>

---

# Datalist

`<datalist>` містить набір рекомендованих значень для `<input>`.

    <label for="browser">
        Browser
    </label>

    <input
        list="browsers"
        id="browser"
        name="browser"
    >

    <datalist id="browsers">
        <option value="Chrome">
        <option value="Firefox">
        <option value="Edge">
        <option value="Safari">
    </datalist>

Користувач може:

    вибрати запропоноване значення

або:

    ввести власне значення

Це відрізняється від `<select>`, де користувач зазвичай вибирає значення зі списку.

---

# Select vs Datalist

`select`:

    користувач вибирає
    зі списку визначених options

`datalist`:

    користувач отримує підказки
    але може ввести власне значення

Наприклад:

    <select>
        → тільки predefined options

    <input list="...">
    <datalist>
        → suggestions + custom input

---

# Output

`<output>` використовується для відображення результату.

Наприклад:

    <form>
        <label for="price">
            Price
        </label>

        <input
            type="number"
            id="price"
            value="100"
        >

        <output>
            100
        </output>
    </form>

Особливо корисний для результатів обчислень через JavaScript.

---

# Fieldset

`<fieldset>` групує пов'язані form controls.

    <fieldset>
        <legend>
            Personal information
        </legend>

        <label for="name">
            Name
        </label>

        <input
            type="text"
            id="name"
            name="name"
        >

        <label for="email">
            Email
        </label>

        <input
            type="email"
            id="email"
            name="email"
        >
    </fieldset>

---

# Legend

`<legend>` задає заголовок `<fieldset>`.

    <fieldset>
        <legend>
            Contact information
        </legend>

        ...
    </fieldset>

`legend` особливо важливий для accessibility, коли група controls має спільний контекст.

---

# Fieldset для Radio Group

Один із найкращих прикладів використання:

    <fieldset>
        <legend>
            Choose your role
        </legend>

        <input
            type="radio"
            id="student"
            name="role"
            value="student"
        >

        <label for="student">
            Student
        </label>

        <input
            type="radio"
            id="teacher"
            name="role"
            value="teacher"
        >

        <label for="teacher">
            Teacher
        </label>
    </fieldset>

Тут:

    fieldset
        → група

    legend
        → назва групи

    radio buttons
        → окремі options

---

# Disabled Form Control

Form control можна зробити недоступним:

    <input
        type="text"
        disabled
    >

Користувач не може взаємодіяти з таким control.

Наприклад:

    <button
        type="submit"
        disabled
    >
        Submit
    </button>

---

# Readonly

`readonly` робить значення доступним для перегляду, але не дозволяє користувачу редагувати його безпосередньо.

    <input
        type="text"
        value="User ID: 123"
        readonly
    >

Важлива різниця:

    readonly
        → не можна редагувати
        → значення може бути submitted

    disabled
        → control недоступний
        → значення зазвичай не включається у form submission

---

# Input Placeholder

`placeholder` показує коротку підказку всередині поля.

    <input
        type="text"
        placeholder="Enter your name"
    >

Наприклад:

    Enter your name

Placeholder зникає, коли користувач починає вводити текст.

---

# Placeholder ≠ Label

Не слід замінювати label placeholder.

❌ Погано:

    <input
        type="email"
        placeholder="Email"
    >

Краще:

    <label for="email">
        Email
    </label>

    <input
        type="email"
        id="email"
        placeholder="you@example.com"
    >

Тут:

    label
        → назва поля

    placeholder
        → додаткова підказка

---

# Required Form Control

`required` повідомляє браузеру, що поле повинно бути заповнене.

    <label for="email">
        Email
    </label>

    <input
        type="email"
        id="email"
        name="email"
        required
    >

Якщо користувач спробує відправити форму без значення, браузер виконає базову constraint validation.

Детальніше це буде розглядатися у:

    03-form-validation

---

# Name Attribute

`name` — дуже важливий атрибут form control.

Наприклад:

    <input
        type="text"
        name="username"
    >

Під час відправлення форми саме `name` використовується як ім'я поля.

Наприклад:

    name="username"
    value="John"

може бути представлено як:

    username=John

Тому для полів, значення яких потрібно відправляти, важливо правильно задавати `name`.

---

# Value Attribute

`value` задає значення form control.

Наприклад:

    <input
        type="text"
        name="username"
        value="John"
    >

Початкове значення:

    John

Для radio:

    <input
        type="radio"
        name="role"
        value="student"
    >

`value` визначає значення, яке буде пов'язане з вибраним radio.

---

# Input та id

`id` повинен бути унікальним у межах документа.

Наприклад:

    <label for="email">
        Email
    </label>

    <input
        type="email"
        id="email"
        name="email"
    >

`id` використовується для:

    label association
    CSS selectors
    JavaScript DOM selection
    accessibility relationships

---

# Input та name

`name` не повинен плутатися з `id`.

    id
        → ідентифікація елемента в документі

    name
        → ім'я поля у form data

Наприклад:

    <input
        id="email"
        name="email"
        type="email"
    >

Тут вони мають однакове значення, але виконують різні ролі.

---

# Повна проста форма

    <form>

        <div>
            <label for="name">
                Name
            </label>

            <input
                type="text"
                id="name"
                name="name"
            >
        </div>

        <div>
            <label for="email">
                Email
            </label>

            <input
                type="email"
                id="email"
                name="email"
            >
        </div>

        <div>
            <label for="password">
                Password
            </label>

            <input
                type="password"
                id="password"
                name="password"
            >
        </div>

        <button type="submit">
            Register
        </button>

    </form>

---

# Form з різними controls

    <form>

        <div>
            <label for="name">
                Name
            </label>

            <input
                type="text"
                id="name"
                name="name"
            >
        </div>

        <div>
            <label for="email">
                Email
            </label>

            <input
                type="email"
                id="email"
                name="email"
            >
        </div>

        <div>
            <label for="message">
                Message
            </label>

            <textarea
                id="message"
                name="message"
                rows="5"
            ></textarea>
        </div>

        <div>
            <label for="country">
                Country
            </label>

            <select
                id="country"
                name="country"
            >
                <option value="ua">
                    Ukraine
                </option>

                <option value="pl">
                    Poland
                </option>
            </select>
        </div>

        <button type="submit">
            Send
        </button>

    </form>

---

# Семантична структура форми

Проста форма може мати структуру:

    form
    │
    ├── label
    ├── input
    │
    ├── label
    ├── input
    │
    ├── label
    ├── textarea
    │
    ├── label
    ├── select
    │
    └── button

Більш складна форма:

    form
    │
    ├── fieldset
    │   ├── legend
    │   ├── label
    │   ├── input
    │   └── input
    │
    ├── fieldset
    │   ├── legend
    │   ├── radio
    │   └── radio
    │
    └── button

---

# CSS для Form Elements

Form controls можна стилізувати через CSS.

Наприклад:

    input,
    textarea,
    select {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
    }

---

# Стилізація Label

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
    }

---

# Групування поля

Зручно створювати wrapper для кожного поля.

    <div class="form-field">

        <label for="email">
            Email
        </label>

        <input
            type="email"
            id="email"
            name="email"
        >

    </div>

CSS:

    .form-field {
        margin-bottom: 1rem;
    }

---

# CSS та Input Types

Можна стилізувати різні типи input окремо.

    input[type="text"] {
        ...
    }

    input[type="email"] {
        ...
    }

    input[type="password"] {
        ...
    }

    input[type="checkbox"] {
        ...
    }

    input[type="radio"] {
        ...
    }

---

# Attribute Selectors

Form controls часто стилізують через attribute selectors.

Наприклад:

    input[type="text"] {
        border: 1px solid #ccc;
    }

Або:

    input[type="email"] {
        border: 1px solid #ccc;
    }

Checkbox:

    input[type="checkbox"] {
        width: 1rem;
        height: 1rem;
    }

---

# Form Controls та Box Model

До form controls застосовуються звичайні CSS властивості:

    width
    height
    padding
    border
    margin
    box-sizing
    font
    color
    background

Наприклад:

    input,
    textarea,
    select {
        box-sizing: border-box;
        width: 100%;
        padding: 0.75rem;
        font: inherit;
    }

---

# font: inherit

Form controls можуть мати стилі шрифту, які відрізняються від батьківського елемента.

Тому часто використовують:

    button,
    input,
    select,
    textarea {
        font: inherit;
    }

Це дозволяє form controls успадковувати шрифт документа.

---

# textarea resize

За замовчуванням користувач може змінювати розмір `<textarea>`.

Можна дозволити тільки вертикальне resize:

    textarea {
        resize: vertical;
    }

Або заборонити resize:

    textarea {
        resize: none;
    }

Зазвичай:

    resize: vertical;

є більш дружнім для користувача, ніж:

    resize: none;

---

# Fieldset CSS

За замовчуванням `<fieldset>` має браузерні стилі.

Його можна стилізувати:

    fieldset {
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
    }

---

# Legend CSS

    legend {
        padding: 0 0.5rem;
        font-weight: 600;
    }

---

# Form Layout

Для layout форми можна використовувати:

    flexbox
    grid

Наприклад:

    .form {
        display: grid;
        gap: 1rem;
    }

Або:

    .form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

---

# Form Field з CSS Grid

    .form-field {
        display: grid;
        gap: 0.5rem;
    }

HTML:

    <div class="form-field">
        <label for="email">
            Email
        </label>

        <input
            type="email"
            id="email"
            name="email"
        >
    </div>

---

# Form Controls та Accessibility

Форми повинні бути доступними для:

    keyboard users
    screen readers
    users with motor limitations
    users with visual impairments
    users with cognitive limitations

Базові правила:

    label → input
    semantic HTML
    visible focus
    meaningful button text
    grouped controls
    correct input types

Детальніше accessibility буде розглядатися у:

    05-accessibility-basics
    06-accessible-forms

---

# Label + Input — базове правило accessibility

Правильно:

    <label for="email">
        Email
    </label>

    <input
        id="email"
        name="email"
        type="email"
    >

Неправильно:

    <input
        type="email"
        placeholder="Email"
    >

Без label користувач може не мати достатнього контексту про призначення поля.

---

# Radio Groups та Accessibility

Radio buttons потрібно логічно групувати.

Правильний варіант:

    <fieldset>
        <legend>
            Payment method
        </legend>

        <input
            type="radio"
            id="card"
            name="payment"
            value="card"
        >

        <label for="card">
            Card
        </label>

        <input
            type="radio"
            id="cash"
            name="payment"
            value="cash"
        >

        <label for="cash">
            Cash
        </label>
    </fieldset>

`legend` повідомляє користувачу, що об'єднує ці radio buttons.

---

# Checkbox та Accessibility

Checkbox повинен мати зрозумілий label.

Правильно:

    <input
        type="checkbox"
        id="terms"
        name="terms"
    >

    <label for="terms">
        I agree to the terms and conditions
    </label>

Не варто залишати checkbox без зрозумілого текстового опису.

---

# Button Text

Текст кнопки повинен пояснювати дію.

Краще:

    <button type="submit">
        Create account
    </button>

ніж:

    <button type="submit">
        Click
    </button>

Або:

    <button type="submit">
        Submit
    </button>

Коли можна бути конкретнішим:

    Create account
    Send message
    Save changes
    Delete account
    Search

---

# Input Type та Accessibility

Правильний `type` допомагає браузеру та assistive technologies зрозуміти призначення поля.

Наприклад:

    type="email"

краще, ніж:

    type="text"

для email.

А:

    type="tel"

краще, ніж:

    type="text"

для телефонного номера.

Правильна семантика HTML зменшує необхідність додаткового JavaScript або ARIA.

---

# Semantic HTML First

Перед використанням ARIA або складного JavaScript потрібно використовувати правильні HTML elements.

Наприклад:

    <button>

краще, ніж:

    <div onclick="...">

Для form control:

    <input>

краще, ніж:

    <div contenteditable="...">

у випадках, де достатньо стандартного input.

Основне правило:

    Use native HTML first.

---

# Native Form Controls

Стандартні HTML controls вже мають багато вбудованої поведінки.

Наприклад:

    <button>
    <input>
    <select>
    <textarea>

Вони підтримують:

    keyboard interaction
    focus
    form submission
    browser validation
    accessibility semantics

Тому не варто без необхідності замінювати їх `<div>` або `<span>`.

---

# Common Form Structure

Рекомендований базовий шаблон:

    <form>

        <div class="form-field">

            <label for="name">
                Name
            </label>

            <input
                type="text"
                id="name"
                name="name"
            >

        </div>

        <div class="form-field">

            <label for="email">
                Email
            </label>

            <input
                type="email"
                id="email"
                name="email"
            >

        </div>

        <div class="form-field">

            <label for="message">
                Message
            </label>

            <textarea
                id="message"
                name="message"
                rows="5"
            ></textarea>

        </div>

        <button type="submit">
            Send message
        </button>

    </form>

---

# Practical Example — Registration Form

    <form>

        <fieldset>

            <legend>
                Create account
            </legend>

            <div class="form-field">

                <label for="username">
                    Username
                </label>

                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                >

            </div>

            <div class="form-field">

                <label for="email">
                    Email
                </label>

                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                >

            </div>

            <div class="form-field">

                <label for="password">
                    Password
                </label>

                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                >

            </div>

            <div>

                <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                >

                <label for="terms">
                    I agree to the terms
                </label>

            </div>

            <button type="submit">
                Create account
            </button>

        </fieldset>

    </form>

---

# Practical Example — Contact Form

    <form>

        <div class="form-field">

            <label for="name">
                Name
            </label>

            <input
                type="text"
                id="name"
                name="name"
            >

        </div>

        <div class="form-field">

            <label for="email">
                Email
            </label>

            <input
                type="email"
                id="email"
                name="email"
            >

        </div>

        <div class="form-field">

            <label for="subject">
                Subject
            </label>

            <input
                type="text"
                id="subject"
                name="subject"
            >

        </div>

        <div class="form-field">

            <label for="message">
                Message
            </label>

            <textarea
                id="message"
                name="message"
                rows="6"
            ></textarea>

        </div>

        <button type="submit">
            Send message
        </button>

    </form>

---

# Practical Example — Preferences

    <form>

        <fieldset>

            <legend>
                Notification preferences
            </legend>

            <div>

                <input
                    type="checkbox"
                    id="email-notifications"
                    name="notifications"
                    value="email"
                >

                <label for="email-notifications">
                    Email notifications
                </label>

            </div>

            <div>

                <input
                    type="checkbox"
                    id="sms-notifications"
                    name="notifications"
                    value="sms"
                >

                <label for="sms-notifications">
                    SMS notifications
                </label>

            </div>

        </fieldset>

        <button type="submit">
            Save preferences
        </button>

    </form>

---

# Practical Example — Radio Group

    <form>

        <fieldset>

            <legend>
                Choose a plan
            </legend>

            <div>

                <input
                    type="radio"
                    id="basic"
                    name="plan"
                    value="basic"
                >

                <label for="basic">
                    Basic
                </label>

            </div>

            <div>

                <input
                    type="radio"
                    id="pro"
                    name="plan"
                    value="pro"
                >

                <label for="pro">
                    Pro
                </label>

            </div>

            <div>

                <input
                    type="radio"
                    id="enterprise"
                    name="plan"
                    value="enterprise"
                >

                <label for="enterprise">
                    Enterprise
                </label>

            </div>

        </fieldset>

        <button type="submit">
            Continue
        </button>

    </form>

---

# Типові помилки

❌ Використовувати placeholder замість label.

    <input
        type="email"
        placeholder="Email"
    >

Краще:

    <label for="email">
        Email
    </label>

    <input
        type="email"
        id="email"
        name="email"
        placeholder="you@example.com"
    >

---

❌ Label не пов'язаний з input.

    <label>
        Email
    </label>

    <input
        type="email"
        id="email"
    >

Краще:

    <label for="email">
        Email
    </label>

    <input
        type="email"
        id="email"
    >

---

❌ Однаковий `id` у декількох елементів.

    <input id="email">

    <input id="email">

`id` повинен бути унікальним.

---

❌ Відсутній `name`.

    <input
        type="email"
        id="email"
    >

Якщо поле повинно передаватися через form submission, потрібно:

    <input
        type="email"
        id="email"
        name="email"
    >

---

❌ Використовувати неправильний input type.

Наприклад:

    <input type="text">

для email.

Краще:

    <input type="email">

---

❌ Використовувати `<div>` замість button.

    <div class="button">
        Submit
    </div>

Краще:

    <button type="submit">
        Submit
    </button>

---

❌ Не вказувати `type` у button всередині form.

    <button>
        Open menu
    </button>

Краще:

    <button type="button">
        Open menu
    </button>

---

❌ Використовувати `for...in` для форми без розуміння його призначення.

У HTML:

    for

у `<label>` — це атрибут зв'язку label з control.

У JavaScript:

    for...in

— конструкція перебору property keys.

Це різні речі.

---

❌ Робити radio buttons з різними `name`.

Наприклад:

    <input
        type="radio"
        name="plan1"
    >

    <input
        type="radio"
        name="plan2"
    >

У такому випадку браузер може дозволити вибрати обидва.

Для однієї групи:

    <input
        type="radio"
        name="plan"
        value="basic"
    >

    <input
        type="radio"
        name="plan"
        value="pro"
    >

---

❌ Надмірно використовувати `<div>` замість semantic elements.

Погано:

    <div class="select">
        ...
    </div>

якщо достатньо:

    <select>
        ...
    </select>

---

❌ Використовувати CSS або JavaScript як заміну HTML semantics.

Спочатку:

    semantic HTML

потім:

    CSS

і лише за необхідності:

    JavaScript / ARIA

---

# Form Elements — Core

Обов'язково знати:

    <form>

    <label>

    <input>

    <textarea>

    <select>

    <option>

    <button>

    <fieldset>

    <legend>

Основні input types:

    text
    email
    password
    number
    tel
    url
    search
    date
    checkbox
    radio
    file
    hidden

---

# Form Elements — Junior

Потрібно добре розуміти:

    label + for + id

    input + name

    input + value

    checkbox

    radio

    select

    option

    textarea

    button types

    fieldset

    legend

    datalist

    output

    multiple

    checked

    selected

    disabled

    readonly

    placeholder

    required

---

# Form Elements — Middle

Варто розуміти:

    native form controls

    semantic HTML

    form control accessibility

    form control keyboard behavior

    custom form controls

    styling native controls

    appearance

    browser differences

    form UX

    accessible radio groups

    accessible checkbox groups

    complex select patterns

    custom file inputs

    progressive enhancement

    native validation

---

# Form Elements — Senior

Глибше розуміння:

    HTML form semantics

    form-associated elements

    form-associated custom elements

    constraint validation API

    accessibility tree

    native control semantics

    keyboard interaction models

    browser implementation differences

    custom control accessibility

    ARIA vs native semantics

    progressive enhancement

    form UX architecture

    internationalization of forms

    localization of form controls

---

# Питання зі співбесіди

Що таке `<form>`?

Що таке form control?

Для чого потрібен `<label>`?

Як пов'язати `<label>` з `<input>`?

Для чого потрібні `for` та `id`?

Яка різниця між `id` та `name`?

Для чого потрібен `name`?

Для чого потрібен `value`?

Які основні типи `<input>`?

Чим `text` відрізняється від `email`?

Коли використовувати `type="tel"`?

Коли використовувати `type="search"`?

Що таке checkbox?

Що таке radio button?

Чим checkbox відрізняється від radio?

Як створити групу radio buttons?

Чому radio buttons повинні мати однаковий `name`?

Для чого потрібен `<textarea>`?

Чим `<textarea>` відрізняється від `<input>`?

Для чого потрібен `<select>`?

Для чого потрібен `<option>`?

Для чого потрібен `<optgroup>`?

Що робить `multiple`?

Що таке `<datalist>`?

Чим `<datalist>` відрізняється від `<select>`?

Для чого потрібен `<button>`?

Які типи button існують?

Чому важливо вказувати `type` у `<button>`?

Що робить `type="submit"`?

Що робить `type="reset"`?

Що робить `type="button"`?

Для чого потрібен `<fieldset>`?

Для чого потрібен `<legend>`?

Чому `<fieldset>` важливий для accessibility?

Що таке `placeholder`?

Чому placeholder не повинен замінювати label?

Що робить `disabled`?

Що робить `readonly`?

Яка різниця між `disabled` та `readonly`?

Що робить `required`?

Для чого потрібен `hidden` input?

Чи є hidden input захищеним від зміни користувачем?

Для чого потрібен `accept` у file input?

Як дозволити вибрати декілька файлів?

Як стилізувати form controls?

Як стилізувати input залежно від його type?

Чому native HTML controls важливі для accessibility?

Чому краще використовувати `<button>`, а не `<div>` з click handler?

---

# Шлях

## 🟢 Core — обов'язково знати

Основна структура:

    <form>

Розуміти:

    <label>
    <input>
    <textarea>
    <select>
    <option>
    <button>

Основні input types:

    text
    email
    password
    number
    tel
    url
    search
    date
    checkbox
    radio
    file

Розуміти:

    label + for + id

    name

    value

    placeholder

    required

    disabled

    readonly

Розуміти різницю:

    checkbox
    radio

Розуміти:

    button type="submit"
    button type="button"
    button type="reset"

---

## 🔵 Junior

Розуміти:

    fieldset
    legend
    optgroup
    datalist
    output

Знати:

    multiple
    checked
    selected
    hidden
    accept

Вміти створити:

    registration form
    login form
    contact form
    search form
    preferences form
    radio group
    checkbox group
    file upload field

Розуміти:

    semantic form structure
    accessible labels
    native form controls
    basic CSS styling of forms

---

## 🟠 Middle

Розуміти:

    native form behavior
    custom form controls
    form UX
    keyboard interaction
    accessibility
    browser differences
    complex form layouts
    responsive forms

Вміти:

    стилізувати form controls
    створювати складні групи controls
    правильно групувати radio / checkbox
    створювати custom-looking controls
    зберігати native semantics
    комбінувати HTML + CSS + JavaScript

---

## 🔴 Senior

Глибоко розуміти:

    native semantics
    accessibility tree
    form-associated elements
    custom form controls
    ARIA
    constraint validation
    keyboard interaction
    progressive enhancement
    browser compatibility
    form architecture

Розуміти trade-offs між:

    native controls
    custom controls
    JavaScript widgets
    accessibility
    UX
    maintainability

---

# Міні-шпаргалка

## Form

    <form>
        ...
    </form>

Основний контейнер форми.

---

## Label

    <label for="email">
        Email
    </label>

    <input
        id="email"
        type="email"
    >

Зв'язок:

    for
      ↓
    id

---

## Input

    <input
        type="text"
        name="username"
    >

Основний універсальний form control.

---

## Textarea

    <textarea
        name="message"
        rows="5"
    ></textarea>

Багаторядковий текст.

---

## Select

    <select name="country">

        <option value="ua">
            Ukraine
        </option>

        <option value="pl">
            Poland
        </option>

    </select>

Вибір зі списку.

---

## Checkbox

    <input
        type="checkbox"
        id="terms"
        name="terms"
    >

    <label for="terms">
        I agree
    </label>

Можна вибрати декілька незалежних значень.

---

## Radio

    <input
        type="radio"
        id="basic"
        name="plan"
        value="basic"
    >

    <label for="basic">
        Basic
    </label>

Одна група:

    однаковий name

---

## Button

    <button type="submit">
        Submit
    </button>

Типи:

    submit
    reset
    button

---

## Fieldset

    <fieldset>

        <legend>
            Personal information
        </legend>

        ...

    </fieldset>

Групує пов'язані controls.

---

## Datalist

    <input
        list="languages"
    >

    <datalist id="languages">

        <option value="HTML">
        <option value="CSS">
        <option value="JavaScript">

    </datalist>

Підказки для input.

---

## File

    <input
        type="file"
        name="avatar"
    >

Multiple:

    <input
        type="file"
        multiple
    >

---

## Hidden

    <input
        type="hidden"
        name="userId"
        value="123"
    >

Не відображається користувачу.

Не є механізмом безпеки.

---

## Disabled

    <input
        type="text"
        disabled
    >

Control недоступний.

---

## Readonly

    <input
        type="text"
        readonly
        value="John"
    >

Значення не можна редагувати безпосередньо.

---

## Required

    <input
        type="email"
        required
    >

Поле повинно бути заповнене перед submit.

---

## Placeholder

    <input
        type="email"
        placeholder="you@example.com"
    >

Placeholder:

    → підказка

Не:

    → label

---

# Основна модель form

    <form>
        ↓
    form controls
        ↓
    label
    input
    textarea
    select
    button
        ↓
    user input
        ↓
    form submission

---

# Основна модель input

    <input
        type="..."
        id="..."
        name="..."
        value="..."
    >

    type
        → тип control

    id
        → ідентифікатор елемента

    name
        → ім'я form field

    value
        → значення

---

# Основна модель label

    <label for="email">
        Email
    </label>

    <input
        id="email"
    >

    label[for]
        ↓
    input[id]

---

# Основна модель radio

    <input
        type="radio"
        name="plan"
        value="basic"
    >

    <input
        type="radio"
        name="plan"
        value="pro"
    >

    same name
        ↓
    one group
        ↓
    one choice

---

# Основна модель checkbox

    <input
        type="checkbox"
        name="skills"
        value="html"
    >

    <input
        type="checkbox"
        name="skills"
        value="css"
    >

    checkbox
        ↓
    independent selection
        ↓
    multiple values possible

---

# Основна модель select

    <select name="country">

        <option value="ua">
            Ukraine
        </option>

        <option value="pl">
            Poland
        </option>

    </select>

    select
        ↓
    options
        ↓
    selected value

---

# Основна модель accessibility

    semantic HTML
          ↓
    correct form control
          ↓
    label
          ↓
    keyboard support
          ↓
    visible focus
          ↓
    accessible interaction

Головний принцип:

    Use native HTML first.

---

# Основні правила

• `<form>` — контейнер для форми.

• `<label>` — назва form control.

• Label потрібно правильно пов'язувати з control через:

    for + id

• `<input>` — універсальний form control.

• Правильний `type` допомагає браузеру зрозуміти призначення поля.

• `name` важливий для form submission.

• `id` повинен бути унікальним.

• `value` задає значення control.

• `placeholder` — підказка, а не заміна label.

• `checkbox` дозволяє незалежний вибір одного або декількох значень.

• `radio` використовується для вибору одного варіанта з групи.

• Radio group зазвичай має однаковий `name`.

• `<textarea>` використовується для багаторядкового тексту.

• `<select>` використовується для вибору зі списку.

• `<option>` визначає окремий варіант.

• `<optgroup>` групує options.

• `<datalist>` надає підказки для input.

• `<button>` має три основні типи:

    submit
    reset
    button

• Усередині form бажано явно вказувати `type` для `<button>`.

• `<fieldset>` групує пов'язані controls.

• `<legend>` описує групу controls.

• `disabled` робить control недоступним.

• `readonly` забороняє редагування, але control залишається доступним для взаємодії в інших аспектах.

• `required` позначає поле як обов'язкове.

• `type="file"` використовується для вибору файлів.

• `hidden` input не є захищеним від зміни користувачем.

• Для accessibility краще використовувати native HTML controls.

• `<button>` краще використовувати замість клікабельного `<div>`.

• `<label>` важливий для accessibility.

• Radio та checkbox групи повинні мати зрозумілий контекст.

• Для груп пов'язаних controls можна використовувати:

    fieldset
    legend

• Семантичний HTML повинен бути основою форми.

• CSS відповідає за presentation, але не повинен руйнувати native semantics та keyboard accessibility.

• Хороша форма поєднує:

    semantic HTML
    accessible labels
    correct input types
    logical grouping
    clear controls
    keyboard accessibility
    readable visual design

• Базова структура доступної форми:

    <form>

        <label for="email">
            Email
        </label>

        <input
            type="email"
            id="email"
            name="email"
        >

        <button type="submit">
            Send
        </button>

    </form>

• Основний принцип роботи з forms:

    HTML
      ↓
    semantics
      ↓
    form controls
      ↓
    user input
      ↓
    validation
      ↓
    submission

• У цьому розділі головне навчитися правильно створювати та семантично організовувати form controls.

• Наступні розділи логічно продовжують цю тему:

    02-form-attributes
        → атрибути форм та controls

    03-form-validation
        → validation

    04-focus-and-interaction
        → focus, states, interaction

    05-accessibility-basics
        → базова accessibility

    06-accessible-forms
        → побудова повністю доступних форм