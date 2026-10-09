# 02. Form Attributes

Form attributes — це HTML-атрибути, які визначають поведінку `<form>` та його form controls.

Вони дозволяють:

- визначити, куди відправляються дані;
- визначити HTTP-метод відправлення;
- визначити спосіб кодування даних;
- вказати, чи потрібно валідувати форму;
- визначити, як відкривати результат submission;
- зробити поле обов'язковим;
- задати початкове значення;
- обмежити введення;
- керувати доступністю поля;
- визначити мінімальні та максимальні значення;
- визначити крок числового значення;
- керувати кількістю символів;
- визначити типи файлів;
- керувати autocomplete.

Основні form attributes:

    action
    method
    enctype
    target
    autocomplete
    novalidate
    accept-charset

Основні attributes form controls:

    name
    value
    id
    type
    placeholder
    required
    disabled
    readonly
    checked
    selected
    multiple
    autofocus
    autocomplete
    minlength
    maxlength
    min
    max
    step
    pattern
    list
    accept
    form
    formaction
    formmethod
    formenctype
    formtarget
    formnovalidate

---

# Ключові поняття

✔ form attributes  
✔ control attributes  
✔ `action`  
✔ `method`  
✔ `GET`  
✔ `POST`  
✔ `enctype`  
✔ `multipart/form-data`  
✔ `application/x-www-form-urlencoded`  
✔ `text/plain`  
✔ `target`  
✔ `autocomplete`  
✔ `novalidate`  
✔ `accept-charset`  
✔ `name`  
✔ `value`  
✔ `id`  
✔ `required`  
✔ `disabled`  
✔ `readonly`  
✔ `checked`  
✔ `selected`  
✔ `multiple`  
✔ `autofocus`  
✔ `minlength`  
✔ `maxlength`  
✔ `min`  
✔ `max`  
✔ `step`  
✔ `pattern`  
✔ `accept`  
✔ `list`  
✔ `form`  
✔ `formaction`  
✔ `formmethod`  
✔ `formenctype`  
✔ `formtarget`  
✔ `formnovalidate`  
✔ form submission  
✔ form data  
✔ constraint validation  
✔ URL query parameters  
✔ request body  
✔ file upload  

---

# Що потрібно пам'ятати

• `action` визначає URL, на який відправляються form data.

• `method` визначає HTTP-метод submission.

• Найчастіше використовуються:

    GET
    POST

• `GET` передає дані через URL query string.

• `POST` передає дані в request body.

• `enctype` визначає формат кодування form data.

• Для звичайних форм зазвичай використовується:

    application/x-www-form-urlencoded

• Для upload файлів використовується:

    multipart/form-data

• `target` визначає, де відкривається результат submission.

• `autocomplete` керує використанням браузером збережених або автоматично визначених значень.

• `novalidate` вимикає браузерну constraint validation під час submit.

• `name` визначає ім'я form control у form data.

• `value` визначає значення control.

• `required` робить поле обов'язковим.

• `disabled` робить control недоступним для взаємодії та виключає його з form submission.

• `readonly` забороняє редагування, але значення може бути відправлене.

• `checked` встановлює checkbox або radio у вибраний стан.

• `selected` встановлює option як вибраний.

• `multiple` дозволяє вибрати декілька значень там, де це підтримується.

• `min`, `max`, `step` використовуються для числових та деяких інших controls.

• `minlength` та `maxlength` обмежують кількість символів.

• `pattern` задає регулярний вираз для перевірки значення.

• `accept` використовується переважно з `input type="file"`.

• `list` пов'язує input із `<datalist>`.

• `form` дозволяє пов'язати form control із `<form>`, навіть якщо control знаходиться поза form.

---

# Form

Базова структура:

    <form>
        ...
    </form>

Наприклад:

    <form
        action="/login"
        method="post"
    >
        ...
    </form>

Тут:

    action
        → куди відправити дані

    method
        → як відправити дані

---

# action

`action` визначає URL, на який браузер відправить дані форми.

Приклад:

    <form action="/login">
        ...
    </form>

Після submit браузер відправить form data на:

    /login

---

# Absolute URL

`action` може містити абсолютний URL.

    <form
        action="https://example.com/login"
    >
        ...
    </form>

---

# Relative URL

Можна використовувати relative URL.

    <form action="/login">
        ...
    </form>

Або:

    <form action="/api/users">
        ...
    </form>

---

# action та backend

Наприклад:

    <form
        action="/api/users"
        method="post"
    >
        ...
    </form>

Логіка:

    browser
       ↓
    form submit
       ↓
    POST /api/users
       ↓
    backend
       ↓
    process data

У backend endpoint:

    POST /api/users

приймає дані форми.

---

# action без значення

Можна не вказувати `action`.

    <form>
        ...
    </form>

У такому випадку браузер використовує поточний URL документа як destination.

У сучасних applications часто submission контролюється JavaScript, але HTML form semantics все одно залишаються важливими.

---

# method

`method` визначає HTTP-метод, який використовується для form submission.

Основні значення:

    get
    post

Наприклад:

    <form
        action="/search"
        method="get"
    >
        ...
    </form>

Або:

    <form
        action="/login"
        method="post"
    >
        ...
    </form>

---

# GET

`GET` використовується для отримання або пошуку даних.

Приклад:

    <form
        action="/search"
        method="get"
    >

        <label for="query">
            Search
        </label>

        <input
            type="search"
            id="query"
            name="q"
        >

        <button type="submit">
            Search
        </button>

    </form>

Якщо користувач введе:

    javascript

браузер може перейти до URL:

    /search?q=javascript

---

# GET та URL

При `GET` form data додаються до URL як query parameters.

Наприклад:

    name=John
    age=25

може перетворитися на:

    /users?name=John&age=25

Схематично:

    form
      ↓
    GET
      ↓
    URL
      ↓
    query string

---

# GET та пошук

GET особливо підходить для:

    search
    filters
    sorting
    pagination
    navigation parameters

Наприклад:

    /products?category=books&sort=price

Це корисно, тому що URL можна:

    bookmark
    copy
    share
    reload

---

# POST

`POST` використовується, коли дані потрібно передати на сервер для обробки.

Наприклад:

    <form
        action="/login"
        method="post"
    >

        <label for="email">
            Email
        </label>

        <input
            type="email"
            id="email"
            name="email"
        >

        <label for="password">
            Password
        </label>

        <input
            type="password"
            id="password"
            name="password"
        >

        <button type="submit">
            Login
        </button>

    </form>

---

# GET vs POST

    GET
        → data in URL
        → query parameters
        → suitable for retrieval/search

    POST
        → data in request body
        → suitable for sending/submitting data

Важливо:

`POST` не означає автоматично "безпечніше".

Наприклад:

    HTTPS

потрібен для захисту даних під час передачі.

---

# GET та sensitive data

Не слід передавати чутливі дані через GET, тому що вони можуть опинитися в URL.

Наприклад, не варто:

    /login?password=123456

Для login form використовується:

    method="post"

Але навіть POST не замінює:

    HTTPS
    server-side security
    authentication security

---

# Default method

Якщо `method` не вказаний, форма використовує:

    GET

Тому:

    <form action="/search">
        ...
    </form>

еквівалентно за методом:

    <form
        action="/search"
        method="get"
    >
        ...
    </form>

Але явне зазначення `method` робить код зрозумілішим.

---

# enctype

`enctype` визначає формат кодування даних форми під час submission.

Основні значення:

    application/x-www-form-urlencoded

    multipart/form-data

    text/plain

---

# application/x-www-form-urlencoded

Це стандартний тип кодування для звичайних форм.

Наприклад:

    <form
        action="/login"
        method="post"
        enctype="application/x-www-form-urlencoded"
    >
        ...
    </form>

Дані можуть виглядати приблизно так:

    username=John&email=john%40example.com

Для звичайних текстових форм це типовий формат.

---

# multipart/form-data

Використовується, коли форма містить upload файлів.

Наприклад:

    <form
        action="/upload"
        method="post"
        enctype="multipart/form-data"
    >

        <label for="avatar">
            Avatar
        </label>

        <input
            type="file"
            id="avatar"
            name="avatar"
        >

        <button type="submit">
            Upload
        </button>

    </form>

Для file upload потрібно використовувати:

    enctype="multipart/form-data"

---

# text/plain

Можна використовувати:

    enctype="text/plain"

Наприклад:

    <form
        method="post"
        enctype="text/plain"
    >
        ...
    </form>

Цей формат рідко використовується у production web forms.

Для звичайних форм:

    application/x-www-form-urlencoded

Для file upload:

    multipart/form-data

---

# Form Encoding

Основна модель:

    text fields
        ↓
    form data
        ↓
    enctype
        ↓
    HTTP request

Наприклад:

    application/x-www-form-urlencoded

або:

    multipart/form-data

---

# target

`target` визначає, де браузер відкриє результат form submission.

Основні значення:

    _self
    _blank
    _parent
    _top

---

# target="_self"

Відкриває результат у поточному browsing context.

    <form
        action="/success"
        target="_self"
    >
        ...
    </form>

Це стандартна поведінка.

---

# target="_blank"

Відкриває результат у новому browsing context.

    <form
        action="/success"
        target="_blank"
    >
        ...
    </form>

---

# target="_parent"

Використовується переважно у контексті frames.

    target="_parent"

У звичайних сучасних формах використовується рідко.

---

# target="_top"

Завантажує результат у top-level browsing context.

    target="_top"

Також переважно пов'язаний із frames / embedded contexts.

---

# autocomplete

`autocomplete` дозволяє браузеру використовувати збережені або раніше введені дані.

Наприклад:

    <form autocomplete="on">
        ...
    </form>

---

# autocomplete="off"

Можна попросити браузер не використовувати autocomplete:

    <form autocomplete="off">
        ...
    </form>

Але браузери можуть мати власну поведінку щодо окремих типів даних та безпеки.

Не варто покладатися на `autocomplete="off"` як на абсолютну заборону браузерних підказок.

---

# autocomplete для input

Autocomplete можна задавати окремо для form control.

    <input
        type="email"
        name="email"
        autocomplete="email"
    >

Корисні значення:

    name
    given-name
    family-name
    email
    username
    current-password
    new-password
    street-address
    postal-code
    country
    tel
    organization

---

# autocomplete та password

Для login:

    <input
        type="password"
        name="password"
        autocomplete="current-password"
    >

Для створення нового password:

    <input
        type="password"
        name="password"
        autocomplete="new-password"
    >

Це допомагає браузерам та password managers правильно інтерпретувати поле.

---

# autocomplete та email

    <label for="email">
        Email
    </label>

    <input
        type="email"
        id="email"
        name="email"
        autocomplete="email"
    >

---

# autocomplete та username

    <label for="username">
        Username
    </label>

    <input
        type="text"
        id="username"
        name="username"
        autocomplete="username"
    >

---

# novalidate

`novalidate` вимикає браузерну constraint validation під час form submission.

Наприклад:

    <form
        action="/register"
        method="post"
        novalidate
    >
        ...
    </form>

Тоді браузер не виконуватиме стандартну client-side validation перед submit.

---

# novalidate не означає "дані правильні"

`novalidate` лише вимикає автоматичну браузерну перевірку.

Воно не означає:

    data is valid

і не означає:

    data is safe

Server-side validation все одно потрібна.

---

# accept-charset

`accept-charset` визначає character encodings, які можуть використовуватися для submission.

Наприклад:

    <form
        accept-charset="UTF-8"
    >
        ...
    </form>

У сучасному web development практично стандартним вибором є:

    UTF-8

Цей атрибут рідко потрібно змінювати у звичайному сучасному проєкті.

---

# name

`name` визначає ім'я form control у form data.

Наприклад:

    <input
        type="text"
        name="username"
    >

Якщо користувач ввів:

    John

дані міститимуть:

    username=John

---

# name — важливий для submission

Є:

    <input
        type="email"
        id="email"
    >

Але немає:

    name="email"

Тоді control не матиме відповідного name/value entry у стандартному form submission.

Тому:

    id
        → label / DOM / CSS / JS

    name
        → form data

---

# value

`value` визначає значення form control.

Наприклад:

    <input
        type="text"
        name="username"
        value="John"
    >

Початкове значення:

    John

---

# Value у Radio

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

Якщо вибрано:

    basic

form data може містити:

    plan=basic

---

# Value у Checkbox

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

Якщо вибрані обидва:

    skills=html
    skills=css

---

# checked

`checked` встановлює початковий вибраний стан checkbox або radio.

Checkbox:

    <input
        type="checkbox"
        name="newsletter"
        checked
    >

Radio:

    <input
        type="radio"
        name="plan"
        value="basic"
        checked
    >

---

# selected

`selected` встановлює початково вибраний `<option>`.

    <select name="country">

        <option value="ua">
            Ukraine
        </option>

        <option
            value="pl"
            selected
        >
            Poland
        </option>

    </select>

Початково буде вибрано:

    Poland

---

# disabled

`disabled` робить control недоступним.

    <input
        type="text"
        name="username"
        disabled
    >

Користувач не може нормально взаємодіяти з таким control.

---

# Disabled controls та form submission

Важливо:

    disabled form controls
        → не включаються у form submission

Наприклад:

    <input
        type="text"
        name="userId"
        value="123"
        disabled
    >

`userId` не буде відправлений як звичайне form data поле.

---

# readonly

`readonly` забороняє користувачу змінювати значення поля.

    <input
        type="text"
        name="username"
        value="John"
        readonly
    >

Користувач може бачити значення, але не може редагувати його через звичайний UI.

---

# readonly vs disabled

    readonly
        → значення не можна редагувати
        → control залишається доступним
        → value може бути submitted

    disabled
        → control недоступний
        → value не включається у form submission

---

# required

`required` робить control обов'язковим.

    <input
        type="email"
        name="email"
        required
    >

Користувач повинен ввести значення перед стандартним submit.

---

# minlength

`minlength` задає мінімальну кількість символів.

    <input
        type="text"
        name="username"
        minlength="3"
    >

Значення повинно відповідати мінімальній довжині.

---

# maxlength

`maxlength` задає максимальну кількість символів.

    <input
        type="text"
        name="username"
        maxlength="20"
    >

---

# minlength + maxlength

    <input
        type="text"
        name="username"
        minlength="3"
        maxlength="20"
    >

Умова:

    3 ≤ length ≤ 20

---

# min

`min` задає мінімальне значення.

Наприклад:

    <input
        type="number"
        name="age"
        min="18"
    >

---

# max

`max` задає максимальне значення.

    <input
        type="number"
        name="age"
        max="100"
    >

---

# min + max

    <input
        type="number"
        name="age"
        min="18"
        max="100"
    >

Допустимий діапазон:

    18 ... 100

---

# step

`step` задає крок зміни значення.

Наприклад:

    <input
        type="number"
        name="price"
        min="0"
        max="100"
        step="5"
    >

Можливі значення:

    0
    5
    10
    15
    ...
    100

---

# step="0.01"

Для десяткових значень:

    <input
        type="number"
        name="price"
        min="0"
        step="0.01"
    >

Наприклад:

    10.00
    10.01
    10.02
    10.03

---

# min + max + step

Разом:

    <input
        type="number"
        name="age"
        min="18"
        max="65"
        step="1"
    >

Тут:

    min
        → 18

    max
        → 65

    step
        → 1

---

# pattern

`pattern` задає регулярний вираз, якому повинно відповідати значення.

Наприклад:

    <input
        type="text"
        name="code"
        pattern="[A-Z]{3}"
    >

Очікується:

    ABC
    XYZ
    CSS

але не:

    abc
    AB
    ABCD

---

# Pattern для простого коду

    <input
        type="text"
        name="code"
        pattern="[0-9]{4}"
    >

Очікується чотири цифри:

    1234

---

# Pattern та required

`pattern` особливо корисний разом із `required`.

    <input
        type="text"
        name="code"
        required
        pattern="[0-9]{4}"
    >

Тепер:

    поле повинно бути заповнене

і:

    значення повинно відповідати pattern

---

# Pattern не замінює server-side validation

Наприклад:

    <input
        type="text"
        pattern="[0-9]{4}"
    >

Це browser-side constraint.

Але сервер все одно повинен перевіряти отримані дані.

Користувач не повинен вважатися довіреним тільки тому, що браузер виконав validation.

---

# accept

`accept` використовується переважно з:

    <input type="file">

Наприклад:

    <input
        type="file"
        accept="image/*"
    >

Або:

    <input
        type="file"
        accept=".pdf"
    >

Або:

    <input
        type="file"
        accept=".jpg,.jpeg,.png"
    >

---

# accept не є security

`accept` допомагає користувачу вибрати потрібний файл, але не є серверним механізмом безпеки.

Сервер повинен сам перевіряти:

    file type
    file size
    file content
    file name
    file extension
    upload permissions

---

# multiple

`multiple` дозволяє вибрати декілька значень.

Для file:

    <input
        type="file"
        name="files"
        multiple
    >

Для select:

    <select
        name="languages"
        multiple
    >
        ...
    </select>

---

# autofocus

`autofocus` автоматично встановлює focus на control після завантаження сторінки.

    <input
        type="search"
        name="q"
        autofocus
    >

Використовувати обережно.

Надмірне автоматичне фокусування може погіршити UX та accessibility, особливо для користувачів screen readers або keyboard navigation.

---

# list

`list` пов'язує `<input>` з `<datalist>`.

Наприклад:

    <input
        type="text"
        name="language"
        list="languages"
    >

    <datalist id="languages">

        <option value="HTML">
        <option value="CSS">
        <option value="JavaScript">

    </datalist>

Зв'язок:

    input[list="languages"]
          ↓
    datalist[id="languages"]

---

# form

Атрибут `form` дозволяє явно пов'язати form control з `<form>`.

Наприклад:

    <form id="user-form">
        ...
    </form>

    <input
        type="text"
        name="username"
        form="user-form"
    >

Input може знаходитися поза `<form>`, але залишатися пов'язаним із нею.

---

# Form Attribute Example

    <form id="login-form">
        ...
    </form>

    <input
        type="email"
        name="email"
        form="login-form"
    >

    <button
        type="submit"
        form="login-form"
    >
        Login
    </button>

---

# formaction

`formaction` дозволяє кнопці submission змінити `action` форми.

Наприклад:

    <form
        action="/save"
        method="post"
    >

        <input
            type="text"
            name="title"
        >

        <button type="submit">
            Save
        </button>

        <button
            type="submit"
            formaction="/publish"
        >
            Publish
        </button>

    </form>

Тут:

    Save
        → /save

    Publish
        → /publish

---

# formmethod

`formmethod` дозволяє кнопці змінити HTTP method форми.

    <form
        action="/search"
        method="get"
    >

        <input
            type="search"
            name="q"
        >

        <button type="submit">
            Search
        </button>

        <button
            type="submit"
            formmethod="post"
        >
            Advanced search
        </button>

    </form>

---

# formenctype

`formenctype` дозволяє submit button змінити encoding type.

    <form
        action="/upload"
        method="post"
        enctype="multipart/form-data"
    >

        <input
            type="file"
            name="file"
        >

        <button type="submit">
            Upload
        </button>

    </form>

Для конкретної кнопки можна задати інше значення:

    <button
        type="submit"
        formenctype="multipart/form-data"
    >
        Upload
    </button>

---

# formtarget

`formtarget` дозволяє кнопці змінити target форми.

Наприклад:

    <form
        action="/preview"
        method="post"
    >

        <button type="submit">
            Preview
        </button>

        <button
            type="submit"
            formtarget="_blank"
        >
            Open preview
        </button>

    </form>

---

# formnovalidate

`formnovalidate` дозволяє конкретній submit button обійти constraint validation.

Наприклад:

    <form>

        <input
            type="email"
            name="email"
            required
        >

        <button type="submit">
            Submit
        </button>

        <button
            type="submit"
            formnovalidate
        >
            Save draft
        </button>

    </form>

Логіка:

    Submit
        → validation

    Save draft
        → без стандартної browser validation

Це корисно, коли одна форма має декілька різних submit actions.

---

# Form-Level vs Control-Level Attributes

Важливо розрізняти атрибути `<form>` і атрибути form controls.

## Form-level

    action
    method
    enctype
    target
    autocomplete
    novalidate
    accept-charset

## Control-level

    name
    value
    type
    required
    disabled
    readonly
    checked
    selected
    multiple
    autofocus
    minlength
    maxlength
    min
    max
    step
    pattern
    accept
    list

## Submit button overrides

    formaction
    formmethod
    formenctype
    formtarget
    formnovalidate

---

# Form Attribute Hierarchy

Можна уявляти так:

    <form>
        │
        ├── action
        ├── method
        ├── enctype
        ├── target
        ├── autocomplete
        └── novalidate
                │
                ↓
        form controls
                │
                ├── name
                ├── value
                ├── required
                ├── disabled
                ├── readonly
                ├── min
                ├── max
                ├── step
                └── pattern

---

# Повна форма

    <form
        action="/register"
        method="post"
        autocomplete="on"
    >

        <label for="username">
            Username
        </label>

        <input
            type="text"
            id="username"
            name="username"
            autocomplete="username"
            required
            minlength="3"
            maxlength="20"
        >

        <label for="email">
            Email
        </label>

        <input
            type="email"
            id="email"
            name="email"
            autocomplete="email"
            required
        >

        <label for="password">
            Password
        </label>

        <input
            type="password"
            id="password"
            name="password"
            autocomplete="new-password"
            required
            minlength="8"
        >

        <button type="submit">
            Create account
        </button>

    </form>

---

# Form з GET

    <form
        action="/search"
        method="get"
    >

        <label for="query">
            Search
        </label>

        <input
            type="search"
            id="query"
            name="q"
        >

        <button type="submit">
            Search
        </button>

    </form>

Якщо введено:

    css

можна отримати:

    /search?q=css

---

# Form з POST

    <form
        action="/login"
        method="post"
    >

        <label for="email">
            Email
        </label>

        <input
            type="email"
            id="email"
            name="email"
        >

        <label for="password">
            Password
        </label>

        <input
            type="password"
            id="password"
            name="password"
        >

        <button type="submit">
            Login
        </button>

    </form>

---

# Form з File Upload

    <form
        action="/upload"
        method="post"
        enctype="multipart/form-data"
    >

        <label for="avatar">
            Avatar
        </label>

        <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
        >

        <button type="submit">
            Upload
        </button>

    </form>

Ключові атрибути:

    method="post"

    enctype="multipart/form-data"

    type="file"

    accept="image/*"

---

# Form з обмеженням числа

    <label for="age">
        Age
    </label>

    <input
        type="number"
        id="age"
        name="age"
        min="18"
        max="100"
        step="1"
        required
    >

Тут:

    min
        → 18

    max
        → 100

    step
        → 1

    required
        → обов'язкове поле

---

# Form з обмеженням довжини

    <label for="username">
        Username
    </label>

    <input
        type="text"
        id="username"
        name="username"
        minlength="3"
        maxlength="20"
        required
    >

Правило:

    3 ≤ length ≤ 20

---

# Form з Pattern

    <label for="code">
        Verification code
    </label>

    <input
        type="text"
        id="code"
        name="code"
        pattern="[0-9]{6}"
        required
    >

Очікується:

    123456

---

# Form з Checkbox

    <input
        type="checkbox"
        id="terms"
        name="terms"
        value="accepted"
        required
    >

    <label for="terms">
        I agree to the terms
    </label>

Якщо checkbox не вибраний:

    required

не дозволить стандартний submit.

---

# Form з Radio

    <fieldset>

        <legend>
            Payment method
        </legend>

        <input
            type="radio"
            id="card"
            name="payment"
            value="card"
            checked
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

Початковий вибір:

    card

---

# Form з Select

    <label for="country">
        Country
    </label>

    <select
        id="country"
        name="country"
        required
    >

        <option
            value=""
            selected
            disabled
        >
            Select country
        </option>

        <option value="ua">
            Ukraine
        </option>

        <option value="pl">
            Poland
        </option>

    </select>

---

# Form з Multiple Select

    <label for="skills">
        Skills
    </label>

    <select
        id="skills"
        name="skills"
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

# Form з Datalist

    <label for="browser">
        Browser
    </label>

    <input
        type="text"
        id="browser"
        name="browser"
        list="browsers"
    >

    <datalist id="browsers">

        <option value="Chrome">
        <option value="Firefox">
        <option value="Edge">
        <option value="Safari">

    </datalist>

---

# Form з autocomplete

    <form
        action="/register"
        method="post"
        autocomplete="on"
    >

        <label for="name">
            Name
        </label>

        <input
            type="text"
            id="name"
            name="name"
            autocomplete="name"
        >

        <label for="email">
            Email
        </label>

        <input
            type="email"
            id="email"
            name="email"
            autocomplete="email"
        >

        <button type="submit">
            Register
        </button>

    </form>

---

# CSS та Form Attributes

CSS може реагувати на деякі HTML attributes через attribute selectors.

Наприклад:

    input[required] {
        border-left: 3px solid red;
    }

---

# Disabled CSS

Можна стилізувати disabled controls:

    input:disabled,
    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

---

# Readonly CSS

    input:read-only {
        background: #f5f5f5;
    }

---

# Required CSS

    input:required {
        border-left: 3px solid red;
    }

---

# Optional CSS

Можна стилізувати optional controls:

    input:optional {
        border-left: 3px solid gray;
    }

---

# Checked CSS

Для checkbox та radio:

    input:checked {
        outline: 2px solid black;
    }

---

# Valid та Invalid

Form controls можуть мати CSS states:

    :valid
    :invalid

Наприклад:

    input:valid {
        border-color: green;
    }

    input:invalid {
        border-color: red;
    }

Детальніше це буде розглядатися у:

    03-form-validation

---

# Attribute Selectors

HTML:

    <input
        type="email"
        required
    >

CSS:

    input[type="email"] {
        ...
    }

    input[required] {
        ...
    }

Можна комбінувати:

    input[type="email"][required] {
        ...
    }

---

# Типові помилки

❌ Використовувати GET для password.

    <form
        action="/login"
        method="get"
    >

Краще:

    <form
        action="/login"
        method="post"
    >

---

❌ Вважати POST автоматично безпечним.

    POST ≠ encryption

Для захисту передачі даних потрібен:

    HTTPS

---

❌ Забувати `name`.

    <input
        type="email"
        id="email"
    >

Краще:

    <input
        type="email"
        id="email"
        name="email"
    >

---

❌ Використовувати `disabled`, якщо значення повинно бути submitted.

    <input
        name="userId"
        value="123"
        disabled
    >

Таке поле не буде включене у стандартний submission.

Якщо потрібно заборонити редагування, але передати значення, часто краще:

    readonly

---

❌ Використовувати placeholder замість label.

    <input
        placeholder="Email"
    >

Краще:

    <label for="email">
        Email
    </label>

    <input
        id="email"
        name="email"
        type="email"
    >

---

❌ Використовувати `enctype="multipart/form-data"` без необхідності.

Для звичайної форми достатньо стандартного:

    application/x-www-form-urlencoded

Для upload файлів:

    multipart/form-data

---

❌ Вважати `accept` захистом від небезпечних файлів.

    accept="image/*"

це лише підказка браузеру.

Server-side validation все одно необхідна.

---

❌ Вважати `pattern` достатнім для безпеки.

    pattern="[0-9]{6}"

це client-side constraint.

Сервер повинен повторно перевірити дані.

---

❌ Надмірно використовувати `autofocus`.

Автоматичний focus може погіршувати accessibility та keyboard navigation.

---

❌ Використовувати `novalidate`, не розуміючи наслідків.

    <form novalidate>

Браузерна validation буде вимкнена.

Це не означає:

    validation is unnecessary

Server-side validation все одно потрібна.

---

# GET vs POST — коротко

    GET
        → data in URL
        → query string
        → search
        → filters
        → retrieval

    POST
        → data in request body
        → create/update/process
        → login
        → registration
        → form submission

---

# Enctype — коротко

    application/x-www-form-urlencoded
        → стандартна form encoding

    multipart/form-data
        → file upload

    text/plain
        → рідко використовується

---

# Form Attributes — Core

Обов'язково знати:

    action
    method
    GET
    POST
    enctype
    target
    autocomplete

Для controls:

    name
    value
    type
    required
    disabled
    readonly
    checked
    selected
    multiple

Для обмежень:

    min
    max
    step
    minlength
    maxlength
    pattern

---

# Form Attributes — Junior

Потрібно добре розуміти:

    action
    method
    enctype
    target
    autocomplete
    novalidate

    name
    value
    required
    disabled
    readonly

    min
    max
    step
    minlength
    maxlength
    pattern

    accept
    multiple
    autofocus
    list

Також:

    form
    formaction
    formmethod
    formenctype
    formtarget
    formnovalidate

---

# Form Attributes — Middle

Варто розуміти:

    GET vs POST
    query parameters
    request body
    form encoding
    multipart/form-data
    file uploads
    autocomplete
    password managers
    constraint validation
    native form behavior
    progressive enhancement
    server-side validation
    security implications

---

# Form Attributes — Senior

Глибше розуміти:

    HTTP semantics
    request methods
    content types
    form submission algorithm
    encoding algorithms
    browser behavior
    constraint validation
    security boundaries
    CSRF
    authentication forms
    file upload security
    privacy implications of autocomplete
    accessibility implications
    progressive enhancement
    server/client validation boundaries

---

# Питання зі співбесіди

Що робить `action`?

Що робить `method`?

Які основні методи використовує `<form>`?

Яка різниця між GET та POST?

Куди потрапляють GET form data?

Куди потрапляють POST form data?

Чому password не варто передавати через GET?

Чи є POST автоматично безпечним?

Що робить `enctype`?

Який enctype використовується за замовчуванням для звичайних форм?

Який enctype потрібен для file upload?

Що робить `target`?

Що означає `_self`?

Що означає `_blank`?

Що робить `autocomplete`?

Що означає `autocomplete="off"`?

Чи можна повністю заборонити браузеру autocomplete?

Що робить `novalidate`?

Чи вимикає `novalidate` server-side validation?

Що робить `name`?

Чим `name` відрізняється від `id`?

Для чого потрібен `value`?

Що робить `required`?

Що робить `disabled`?

Чи відправляється disabled field?

Що робить `readonly`?

Яка різниця між disabled та readonly?

Що робить `checked`?

Що робить `selected`?

Що робить `multiple`?

Що робить `min`?

Що робить `max`?

Що робить `step`?

Що робить `minlength`?

Що робить `maxlength`?

Що робить `pattern`?

Чи достатньо `pattern` для server-side security?

Що робить `accept`?

Чи є `accept` механізмом безпеки?

Що робить `list`?

Для чого потрібен `form` attribute?

Що робить `formaction`?

Що робить `formmethod`?

Що робить `formenctype`?

Що робить `formtarget`?

Що робить `formnovalidate`?

---

# Шлях

## 🟢 Core — обов'язково знати

Розуміти:

    action
    method
    GET
    POST

Розуміти:

    name
    value

Розуміти:

    required
    disabled
    readonly

Розуміти:

    checked
    selected
    multiple

Розуміти:

    min
    max
    step

Розуміти:

    minlength
    maxlength

Знати:

    enctype="multipart/form-data"

для file upload.

---

## 🔵 Junior

Добре розуміти:

    action
    method
    enctype
    target
    autocomplete
    novalidate

Знати:

    pattern
    accept
    list
    autofocus
    form

Розуміти:

    formaction
    formmethod
    formenctype
    formtarget
    formnovalidate

Розуміти різницю:

    disabled
    readonly

Розуміти:

    GET
        → URL / query string

    POST
        → request body

---

## 🟠 Middle

Розуміти:

    form submission
    HTTP methods
    form encoding
    multipart/form-data
    file uploads
    autocomplete
    browser validation
    server-side validation
    progressive enhancement

Розуміти, що:

    HTML validation
        ≠
    security validation

та:

    client validation
        +
    server validation

---

## 🔴 Senior

Глибоко розуміти:

    HTTP semantics
    form submission algorithm
    content encoding
    multipart requests
    authentication forms
    CSRF
    file upload security
    browser security
    autocomplete privacy
    accessibility
    progressive enhancement
    validation boundaries

---

# Міні-шпаргалка

## action

    <form action="/login">

        ...

    </form>

    action
        → destination URL

---

## method

    <form
        action="/search"
        method="get"
    >

        ...

    </form>

    GET
        → query string

    POST
        → request body

---

## GET

    <form
        action="/search"
        method="get"
    >

        <input
            type="search"
            name="q"
        >

        <button type="submit">
            Search
        </button>

    </form>

Може створити:

    /search?q=css

---

## POST

    <form
        action="/login"
        method="post"
    >

        ...

    </form>

Дані передаються у request body.

---

## enctype

Звичайна форма:

    application/x-www-form-urlencoded

File upload:

    multipart/form-data

---

## target

    _self
        → current context

    _blank
        → new context

    _parent
        → parent context

    _top
        → top-level context

---

## autocomplete

    <input
        autocomplete="email"
    >

Приклади:

    email
    username
    current-password
    new-password
    name
    tel

---

## novalidate

    <form novalidate>

        ...

    </form>

    → вимикає browser constraint validation

---

## name

    <input
        name="email"
    >

    name
        → form data key

---

## value

    <input
        name="email"
        value="user@example.com"
    >

    value
        → form data value

---

## required

    <input
        required
    >

    → поле обов'язкове

---

## disabled

    <input
        disabled
    >

    → control disabled
    → value не submitted

---

## readonly

    <input
        readonly
    >

    → value не можна редагувати
    → value може бути submitted

---

## checked

    <input
        type="checkbox"
        checked
    >

    → checked by default

---

## selected

    <option selected>
        Ukraine
    </option>

    → selected by default

---

## multiple

    <input
        type="file"
        multiple
    >

    → multiple files

або:

    <select multiple>

        ...

    </select>

    → multiple options

---

## min

    <input
        type="number"
        min="18"
    >

---

## max

    <input
        type="number"
        max="100"
    >

---

## step

    <input
        type="number"
        step="5"
    >

    → 0, 5, 10, 15...

---

## minlength

    <input
        minlength="3"
    >

---

## maxlength

    <input
        maxlength="20"
    >

---

## pattern

    <input
        pattern="[0-9]{4}"
    >

    → four digits

---

## accept

    <input
        type="file"
        accept="image/*"
    >

    → preferred file types

Не security mechanism.

---

## list

    <input
        list="languages"
    >

    <datalist id="languages">

        <option value="HTML">
        <option value="CSS">
        <option value="JavaScript">

    </datalist>

---

## form

    <form id="profile-form">
        ...
    </form>

    <input
        name="username"
        form="profile-form"
    >

Control може бути поза form у DOM, але пов'язаний із нею.

---

## formaction

    <button
        type="submit"
        formaction="/publish"
    >
        Publish
    </button>

    → override form action

---

## formmethod

    <button
        type="submit"
        formmethod="post"
    >
        Submit
    </button>

    → override form method

---

## formenctype

    <button
        type="submit"
        formenctype="multipart/form-data"
    >
        Upload
    </button>

    → override form enctype

---

## formtarget

    <button
        type="submit"
        formtarget="_blank"
    >
        Open
    </button>

    → override form target

---

## formnovalidate

    <button
        type="submit"
        formnovalidate
    >
        Save draft
    </button>

    → skip browser constraint validation

---

# Form Submission Flow

    <form>
          ↓
    user enters data
          ↓
    form controls
          ↓
    name + value
          ↓
    validation
          ↓
    method
          ↓
    enctype
          ↓
    action
          ↓
    HTTP request
          ↓
    server
          ↓
    response

---

# GET Flow

    form
      ↓
    method="get"
      ↓
    name=value
      ↓
    query string
      ↓
    URL
      ↓
    server

Приклад:

    /search?q=javascript&page=2

---

# POST Flow

    form
      ↓
    method="post"
      ↓
    name=value
      ↓
    request body
      ↓
    server

---

# File Upload Flow

    file input
        ↓
    method="post"
        ↓
    enctype="multipart/form-data"
        ↓
    HTTP request
        ↓
    server
        ↓
    validate file
        ↓
    process / store file

---

# Validation Flow

    user input
        ↓
    required
    min
    max
    minlength
    maxlength
    pattern
        ↓
    browser validation
        ↓
    submit
        ↓
    server-side validation
        ↓
    process data

Головне:

    browser validation
        ≠
    server validation

---

# Основні правила

• `action` визначає destination URL форми.

• `method` визначає HTTP method.

• Основні form methods:

    GET
    POST

• GET зазвичай використовується для:

    search
    filters
    retrieval

• POST використовується для:

    submission
    creation
    updates
    processing

• GET parameters потрапляють у URL.

• POST data передаються в request body.

• POST сам по собі не забезпечує encryption.

• Для захисту даних під час передачі використовується HTTPS.

• `enctype` визначає encoding form data.

• Для звичайних форм використовується:

    application/x-www-form-urlencoded

• Для file upload:

    multipart/form-data

• `target` визначає browsing context для результату submission.

• `autocomplete` допомагає браузеру правильно працювати із збереженими даними.

• `novalidate` вимикає стандартну browser constraint validation.

• `name` визначає key у form data.

• `value` визначає value у form data.

• `id` потрібен для ідентифікації елемента та зв'язку з label, але не замінює `name`.

• `required` робить поле обов'язковим.

• `disabled` робить control недоступним і виключає його зі стандартного form submission.

• `readonly` забороняє редагування, але значення може бути submitted.

• `checked` задає початковий стан checkbox або radio.

• `selected` задає початково вибраний option.

• `multiple` дозволяє вибирати декілька значень.

• `min`, `max`, `step` використовуються для обмеження значень.

• `minlength`, `maxlength` використовуються для обмеження довжини тексту.

• `pattern` задає constraint на основі regular expression.

• `accept` підказує бажані типи файлів.

• `accept` не є security mechanism.

• `list` пов'язує input із datalist.

• `form` може зв'язати control з form, навіть якщо control знаходиться поза `<form>`.

• `formaction`, `formmethod`, `formenctype`, `formtarget`, `formnovalidate` дозволяють submit button перевизначити відповідні form attributes.

• Client-side validation покращує UX, але не замінює server-side validation.

• Користувацькі дані завжди потрібно вважати недовіреними на сервері.

• Form attributes визначають не лише зовнішній вигляд, а й поведінку, семантику та спосіб передачі даних.

• Основна модель:

    form
      ↓
    controls
      ↓
    name + value
      ↓
    validation
      ↓
    method
      ↓
    enctype
      ↓
    action
      ↓
    HTTP request

• Правильне використання form attributes є основою для наступних тем:

    03-form-validation
        → browser validation та constraints

    04-focus-and-interaction
        → focus та interaction states

    05-accessibility-basics
        → accessibility foundations

    06-accessible-forms
        → побудова доступних форм