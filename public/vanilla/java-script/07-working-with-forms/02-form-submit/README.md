# 02. Form Submit

`Form submit` — це процес відправлення даних HTML-форми після того, як користувач натискає кнопку `Submit` або іншим способом запускає відправлення форми.

JavaScript використовується для:

- перехоплення `submit` event;
- отримання даних форми;
- запобігання стандартному перезавантаженню сторінки;
- перевірки введених даних;
- підготовки даних до відправлення;
- показу повідомлень користувачу;
- відправлення даних на backend;
- очищення форми після успішної операції.

Базова модель:

    <form>
        <input>
        <button type="submit">
    </form>

    ↓

    submit event

    ↓

    JavaScript

    ↓

    validation

    ↓

    data

    ↓

    backend / API

---

### Ключові поняття

✔ `<form>`  
✔ `<input>`  
✔ `<button>`  
✔ `type="submit"`  
✔ `submit` event  
✔ `addEventListener()`  
✔ `event`  
✔ `event.preventDefault()`  
✔ `event.target`  
✔ `form`  
✔ `form.elements`  
✔ `form.reset()`  
✔ `input.value`  
✔ `name`  
✔ `action`  
✔ `method`  
✔ GET  
✔ POST  
✔ form submission  
✔ browser default behavior  
✔ page reload  
✔ client-side validation  
✔ server-side validation  
✔ FormData  
✔ HTTP request  
✔ API  
✔ fetch  
✔ async/await  

---

### Що потрібно пам'ятати

• `<form>` об'єднує поля введення та керує їх відправленням.

• Основна подія форми:

    submit

• Для обробки submit використовується:

    form.addEventListener("submit", handler);

• `submit` event відбувається на `<form>`, а не на кнопці.

• За замовчуванням браузер намагається виконати стандартне відправлення форми.

• Стандартне відправлення може призвести до переходу на URL або перезавантаження сторінки.

• У JavaScript найчастіше потрібно перехопити submit:

    event.preventDefault();

• Після `preventDefault()` JavaScript отримує контроль над подальшою логікою.

• Дані можна отримувати через:

    input.value

або:

    FormData

• Для backend-застосунків типовий flow:

    form
      ↓
    submit
      ↓
    preventDefault()
      ↓
    get data
      ↓
    validate
      ↓
    fetch()
      ↓
    backend
      ↓
    response
      ↓
    UI

• `form.reset()` повертає поля форми до їх початкового стану.

• `name` у form controls особливо важливий для `FormData` та стандартного form submission.

• Для сучасних JavaScript-застосунків часто використовується:

    event.preventDefault()
    FormData
    fetch()
    async/await

---

# Form

HTML:

    <form id="userForm">
        <input type="text" id="name">
        <button type="submit">
            Submit
        </button>
    </form>

`form` — DOM-елемент.

JavaScript:

    const form = document.querySelector("#userForm");

---

# Submit Button

Для відправлення форми зазвичай використовується:

    <button type="submit">
        Submit
    </button>

Наприклад:

    <form>
        <input type="text">
        <button type="submit">
            Send
        </button>
    </form>

Натискання кнопки запускає:

    submit event

---

# type="submit"

`type="submit"` явно визначає кнопку як кнопку відправлення форми.

    <button type="submit">
        Submit
    </button>

Усередині `<form>` така кнопка запускає submit.

---

# Submit Event

Основна подія:

    submit

Наприклад:

    const form = document.querySelector("#userForm");

    form.addEventListener("submit", (event) => {
        console.log("Form submitted");
    });

---

# Як працює submit

Коли користувач натискає submit:

    User
      ↓
    Submit button
      ↓
    form
      ↓
    submit event
      ↓
    event handler

Наприклад:

    form.addEventListener("submit", (event) => {
        console.log("Submit!");
    });

---

# event

Обробник submit отримує event object:

    form.addEventListener("submit", (event) => {
        console.log(event);
    });

Event містить інформацію про подію.

---

# event.target

У submit handler:

    event.target

зазвичай є саме `<form>`.

Наприклад:

    form.addEventListener("submit", (event) => {
        console.log(event.target);
    });

Тобто:

    event.target === form

буде:

    true

якщо `form` — саме той елемент, на якому слухається submit.

---

# preventDefault()

Одна з найважливіших команд під час роботи з form:

    event.preventDefault();

Вона скасовує стандартну browser behavior для конкретної події.

Наприклад:

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        console.log("Form handled by JavaScript");
    });

---

# Навіщо preventDefault()

Без:

    event.preventDefault();

браузер може виконати стандартне відправлення форми.

Наприклад:

    <form action="/submit" method="POST">

Після submit браузер може перейти до:

    /submit

або перезавантажити сторінку залежно від форми та її атрибутів.

Якщо JavaScript повинен самостійно обробити форму:

    event.preventDefault();

---

# Browser Default Behavior

HTML form має стандартну поведінку браузера.

Наприклад:

    <form action="/submit" method="POST">

Після submit браузер може:

    collect form data
        ↓
    create HTTP request
        ↓
    navigate / reload

JavaScript може перехопити цей процес:

    submit
      ↓
    preventDefault()
      ↓
    JavaScript controls flow

---

# Basic Submit Pattern

Найважливіший шаблон:

    const form = document.querySelector("#form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        console.log("Form submitted");
    });

Цей патерн потрібно знати дуже добре.

---

# Get Input on Submit

HTML:

    <form id="form">
        <input type="text" id="name">
        <button type="submit">
            Submit
        </button>
    </form>

JavaScript:

    const form = document.querySelector("#form");
    const input = document.querySelector("#name");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = input.value.trim();

        console.log(name);
    });

---

# Submit Data

Типовий flow:

    submit
      ↓
    preventDefault()
      ↓
    read input
      ↓
    trim
      ↓
    validate
      ↓
    process data

Наприклад:

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = input.value.trim();

        if (!name) {
            return;
        }

        console.log(name);
    });

---

# Form with Multiple Inputs

HTML:

    <form id="form">

        <input
            type="text"
            id="name"
            name="name"
        >

        <input
            type="email"
            id="email"
            name="email"
        >

        <button type="submit">
            Submit
        </button>

    </form>

JavaScript:

    const form = document.querySelector("#form");

    const nameInput =
        document.querySelector("#name");

    const emailInput =
        document.querySelector("#email");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        console.log(name);
        console.log(email);
    });

---

# name Attribute

`name` — важливий атрибут form control.

Наприклад:

    <input
        type="text"
        name="username"
    >

`name` використовується браузером під час form submission та `FormData`.

Для form fields, які повинні входити до даних форми, `name` особливо важливий.

---

# id vs name

Наприклад:

    <input
        id="username"
        name="username"
        type="text"
    >

`id`:

    → ідентифікатор DOM-елемента

`name`:

    → ім'я поля форми

JavaScript може використовувати:

    document.querySelector("#username");

А `FormData` використовує:

    name="username"

як ключ даних.

---

# form.elements

Форма має колекцію:

    form.elements

Вона містить form controls.

Наприклад:

    const form = document.querySelector("#form");

    console.log(form.elements);

---

## Access by name

Якщо поле має:

    name="username"

можна отримати його через:

    form.elements.username

Наприклад:

    const input = form.elements.username;

    console.log(input.value);

---

# form.elements Example

HTML:

    <form id="form">

        <input
            type="text"
            name="username"
        >

        <input
            type="email"
            name="email"
        >

        <button type="submit">
            Submit
        </button>

    </form>

JavaScript:

    const form = document.querySelector("#form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const username =
            form.elements.username.value;

        const email =
            form.elements.email.value;

        console.log(username);
        console.log(email);
    });

Це зручний спосіб працювати з полями через саму форму.

---

# Form Submission with FormData

Для отримання всіх даних форми можна використовувати:

    FormData

Наприклад:

    const form = document.querySelector("#form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        console.log(formData);
    });

`FormData` буде детально розглядатися в:

    03-formdata

---

# FormData Preview

HTML:

    <form id="form">

        <input
            type="text"
            name="username"
        >

        <input
            type="email"
            name="email"
        >

        <button type="submit">
            Submit
        </button>

    </form>

JavaScript:

    const form = document.querySelector("#form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        console.log(
            formData.get("username")
        );

        console.log(
            formData.get("email")
        );
    });

---

# FormData and Object

Дані можна перетворити на object:

    const formData = new FormData(form);

    const data = Object.fromEntries(formData);

Тепер:

    data

може виглядати як:

    {
        username: "Valeriy",
        email: "user@example.com"
    }

Це зручно перед відправленням JSON на backend.

---

# GET Method

HTML form може мати:

    method="GET"

Наприклад:

    <form
        action="/search"
        method="GET"
    >
        <input
            type="search"
            name="query"
        >

        <button type="submit">
            Search
        </button>
    </form>

При стандартному submit браузер формує URL із параметрами.

Наприклад:

    /search?query=javascript

GET зазвичай використовується для отримання даних.

---

# POST Method

Форма може використовувати:

    method="POST"

Наприклад:

    <form
        action="/users"
        method="POST"
    >
        <input
            type="text"
            name="username"
        >

        <button type="submit">
            Create
        </button>
    </form>

POST зазвичай використовується для передачі даних на сервер для створення або зміни ресурсу.

---

# GET vs POST

`GET`:

    → parameters usually go into URL
    → commonly used for reading/searching data

`POST`:

    → data is sent in request body
    → commonly used for creating/submitting data

Вибір HTTP method залежить від призначення операції.

---

# action

`action` визначає URL, куди браузер відправляє форму при стандартному submission.

Наприклад:

    <form action="/users">

Якщо JavaScript перехоплює submit через:

    event.preventDefault();

можна самостійно виконати request через:

    fetch()

---

# method

`method` визначає HTTP method стандартного form submission.

Наприклад:

    <form method="GET">

або:

    <form method="POST">

---

# JavaScript Form Submission

У сучасному frontend application часто використовується:

    form
      ↓
    submit
      ↓
    preventDefault()
      ↓
    collect data
      ↓
    fetch()
      ↓
    backend

Наприклад:

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const data = Object.fromEntries(formData);

        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        console.log(response);
    });

---

# fetch()

`fetch()` використовується для HTTP requests.

Наприклад:

    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

---

# Form → JSON → Backend

Типовий full stack flow:

    HTML form
        ↓
    submit
        ↓
    preventDefault()
        ↓
    FormData
        ↓
    Object.fromEntries()
        ↓
    JSON.stringify()
        ↓
    fetch()
        ↓
    Node.js / Express / NestJS
        ↓
    PostgreSQL

Це одна з основних моделей роботи frontend + backend.

---

# Async Submit

HTTP request є asynchronous operation.

Тому часто використовується:

    async / await

Наприклад:

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const data = Object.fromEntries(formData);

        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        console.log(response);
    });

---

# response.ok

Після fetch корисно перевіряти:

    response.ok

Наприклад:

    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        console.log("Request failed");
        return;
    }

    console.log("Request successful");

---

# response.json()

Якщо backend повертає JSON:

    const result = await response.json();

Наприклад:

    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        return;
    }

    const result = await response.json();

    console.log(result);

---

# Complete Submit Flow

Повний базовий приклад:

HTML:

    <form id="form">

        <input
            type="text"
            name="name"
            required
        >

        <input
            type="email"
            name="email"
            required
        >

        <button type="submit">
            Create
        </button>

    </form>

JavaScript:

    const form = document.querySelector("#form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const data = Object.fromEntries(formData);

        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            console.log("Request failed");
            return;
        }

        const result = await response.json();

        console.log(result);
    });

---

# Validation Before Submit

Перед відправленням дані потрібно перевірити.

Наприклад:

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = form.elements.name.value.trim();

        if (!name) {
            console.log("Name is required");
            return;
        }

        console.log("Valid");
    });

Повна тема validation:

    04-validation

---

# HTML Validation

HTML дозволяє використовувати:

    required
    minlength
    maxlength
    min
    max
    pattern
    type

Наприклад:

    <input
        type="email"
        name="email"
        required
    >

Браузер може виконувати constraint validation перед стандартним submit.

---

# checkValidity()

JavaScript має метод:

    form.checkValidity()

Він повертає:

    true
    false

Наприклад:

    if (form.checkValidity()) {
        console.log("Form is valid");
    }

Або:

    if (!form.checkValidity()) {
        console.log("Form is invalid");
    }

---

# reportValidity()

Можна попросити браузер показати стандартні повідомлення validation:

    form.reportValidity();

Наприклад:

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

---

# validation flow

Типовий flow:

    submit
      ↓
    preventDefault()
      ↓
    validation
      ↓
    invalid?
      ↓
    stop

або:

    valid
      ↓
    collect data
      ↓
    fetch
      ↓
    backend

---

# Form Reset

Після успішного submit форму можна очистити:

    form.reset();

Наприклад:

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // process data

        form.reset();
    });

---

# reset()

`form.reset()` повертає form controls до їх початкових значень.

Наприклад:

    <form id="form">

        <input
            type="text"
            name="name"
            value="Default"
        >

        <button type="submit">
            Submit
        </button>

    </form>

Після:

    form.reset();

input повернеться до початкового:

    "Default"

---

# reset vs value = ""

Це не одне й те саме.

Очистити конкретний input:

    input.value = "";

Скинути всю форму:

    form.reset();

`reset()` повертає поля до їх initial values.

---

# Submit Button State

Під час HTTP request іноді кнопку submit тимчасово блокують.

Наприклад:

    submitButton.disabled = true;

Після завершення:

    submitButton.disabled = false;

Це допомагає запобігти повторному натисканню.

---

# Loading State

Приклад:

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        submitButton.disabled = true;

        try {
            // request
        } finally {
            submitButton.disabled = false;
        }
    });

Flow:

    submit
      ↓
    disable button
      ↓
    request
      ↓
    response
      ↓
    enable button

---

# try...catch

HTTP request може завершитися помилкою.

Тому часто використовується:

    try...catch

Наприклад:

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/users");

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    });

---

# Submit Error Handling

Більш практичний варіант:

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/users", {
                method: "POST"
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

            console.log("Success");
        } catch (error) {
            console.error(error);
        }
    });

---

# Success Message

Після успішної операції можна показати повідомлення:

HTML:

    <p id="message"></p>

JavaScript:

    const message =
        document.querySelector("#message");

    message.textContent =
        "User created successfully";

---

# Error Message

Наприклад:

    try {
        // request
    } catch (error) {
        message.textContent =
            "Something went wrong";
    }

---

# Practical Example — Simple Form

HTML:

    <form id="form">

        <input
            type="text"
            id="name"
            name="name"
        >

        <button type="submit">
            Submit
        </button>

    </form>

JavaScript:

    const form = document.querySelector("#form");
    const input = document.querySelector("#name");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = input.value.trim();

        console.log(name);
    });

---

# Practical Example — Required Field

HTML:

    <form id="form">

        <input
            type="text"
            name="name"
            required
        >

        <button type="submit">
            Submit
        </button>

    </form>

JavaScript:

    const form = document.querySelector("#form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name =
            form.elements.name.value.trim();

        if (!name) {
            return;
        }

        console.log(name);
    });

---

# Practical Example — Two Numbers

HTML:

    <form id="form">

        <input
            type="number"
            name="first"
        >

        <input
            type="number"
            name="second"
        >

        <button type="submit">
            Add
        </button>

    </form>

JavaScript:

    const form = document.querySelector("#form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const first =
            Number(form.elements.first.value);

        const second =
            Number(form.elements.second.value);

        const result = first + second;

        console.log(result);
    });

---

# Practical Example — FormData

    const form = document.querySelector("#form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const data = Object.fromEntries(formData);

        console.log(data);
    });

---

# Practical Example — POST JSON

    const form = document.querySelector("#form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const data = Object.fromEntries(formData);

        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            console.log("Error");
            return;
        }

        console.log("Success");
    });

---

# Practical Example — Reset Form

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        console.log(
            Object.fromEntries(formData)
        );

        form.reset();
    });

---

# Practical Example — Loading State

    const submitButton =
        form.querySelector('[type="submit"]');

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        submitButton.disabled = true;

        try {
            const response = await fetch("/api/users", {
                method: "POST"
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

            console.log("Success");
        } catch (error) {
            console.error(error);
        } finally {
            submitButton.disabled = false;
        }
    });

---

# Form Submission Architecture

У простому frontend:

    Form
      ↓
    Submit
      ↓
    Read values
      ↓
    Validate
      ↓
    Update UI

У full stack application:

    Form
      ↓
    Submit
      ↓
    preventDefault()
      ↓
    FormData
      ↓
    Validation
      ↓
    fetch()
      ↓
    HTTP
      ↓
    Node.js / Express / NestJS
      ↓
    PostgreSQL
      ↓
    Response
      ↓
    UI

---

# Form Submit and PostgreSQL

У full stack application користувач може ввести:

    name
    email

Після submit:

    Form
      ↓
    JavaScript
      ↓
    fetch()
      ↓
    Node.js
      ↓
    PostgreSQL

Наприклад:

    {
        name: "Valeriy",
        email: "user@example.com"
    }

Backend отримує дані та може виконати SQL:

    INSERT INTO users (...)

Не можна довіряти даним тільки тому, що вони пройшли frontend validation.

Backend повинен перевірити їх повторно.

---

# Client Validation vs Server Validation

Frontend:

    required
    minlength
    type
    custom validation

покращує UX.

Backend:

    validation
    authorization
    business rules
    database constraints

забезпечує правильність і безпеку серверної частини.

Основне правило:

    Frontend validation
        +
    Backend validation

---

# Standard Form Submission vs JavaScript Submission

## Standard HTML

    <form
        action="/users"
        method="POST"
    >

Браузер сам виконує submission.

---

## JavaScript

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // JavaScript controls submission
    });

JavaScript перехоплює стандартну поведінку та сам виконує request.

---

# Коли використовувати preventDefault()

Використовуй:

    event.preventDefault();

коли JavaScript повинен самостійно контролювати submit.

Наприклад:

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // custom validation
        // fetch
        // update UI
    });

Якщо потрібна стандартна browser submission, `preventDefault()` не потрібен.

---

# Типові помилки

❌ Слухати `click` кнопки замість `submit` форми як основний спосіб обробки форми.

Наприклад:

    submitButton.addEventListener("click", handler);

Це може пропустити інші способи submit, наприклад натискання Enter.

Краще:

    form.addEventListener("submit", handler);

---

❌ Забувати `event.preventDefault()` при custom submission.

    form.addEventListener("submit", async () => {
        // fetch(...)
    });

Браузер може паралельно виконати стандартний submit.

Краще:

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // fetch(...)
    });

---

❌ Використовувати `button` без правильного типу.

Усередині форми:

    <button>
        Submit
    </button>

кнопка за замовчуванням може поводитися як submit button.

Краще явно писати:

    <button type="submit">
        Submit
    </button>

Для звичайної кнопки, яка не повинна відправляти форму:

    <button type="button">
        Cancel
    </button>

---

❌ Забувати `name` у form controls.

Наприклад:

    <input
        type="text"
        id="username"
    >

При використанні `FormData` це поле не матиме потрібного form-data key.

Краще:

    <input
        type="text"
        id="username"
        name="username"
    >

---

❌ Надсилати input values без conversion.

    const first = input1.value;
    const second = input2.value;

    const result = first + second;

Якщо:

    "10"
    "20"

результат:

    "1020"

Краще:

    const first = Number(input1.value);
    const second = Number(input2.value);

---

❌ Не перевіряти `response.ok`.

Не варто припускати, що:

    fetch()

завжди означає успішний HTTP response.

Краще:

    if (!response.ok) {
        throw new Error("Request failed");
    }

---

❌ Не обробляти network errors.

Наприклад:

    try {
        const response = await fetch("/api/users");
    } catch (error) {
        console.error(error);
    }

---

❌ Не блокувати submit button під час довгого request.

Користувач може натиснути кнопку кілька разів.

Для деяких операцій корисно:

    submitButton.disabled = true;

на час request.

---

❌ Покладатися тільки на frontend validation.

Frontend:

    required

не означає, що backend може довіряти даним.

Backend повинен перевіряти отримані дані самостійно.

---

❌ Виводити user input через `innerHTML` без необхідності.

Небажано:

    message.innerHTML = input.value;

Краще для звичайного тексту:

    message.textContent = input.value;

---

❌ Не очищати форму після успішної операції, якщо UX цього вимагає.

Наприклад:

    form.reset();

Але reset потрібно виконувати тільки тоді, коли це відповідає логіці application.

---

# Form Submit Patterns

## Basic

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // process
    });

---

## Read Input

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const value = input.value.trim();
    });

---

## FormData

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const data = Object.fromEntries(formData);
    });

---

## POST

    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

---

## Check Response

    if (!response.ok) {
        throw new Error("Request failed");
    }

---

## Reset

    form.reset();

---

## Loading

    submitButton.disabled = true;

---

# Interview Questions

Що таке HTML form?

Що таке form submission?

Що таке `submit` event?

На якому елементі слухають `submit`?

Чому краще слухати `submit` форми, а не тільки `click` кнопки?

Що робить `event.preventDefault()`?

Яка стандартна поведінка браузера при submit?

Що таке `event.target` у submit handler?

Як отримати input value під час submit?

Що таке `form.elements`?

Як отримати form control через `form.elements`?

Для чого потрібен `name`?

Чим `id` відрізняється від `name`?

Що таке `action`?

Що таке `method`?

Що таке GET?

Що таке POST?

Чим GET відрізняється від POST?

Що таке `FormData`?

Як створити `FormData` із форми?

Як перетворити `FormData` на object?

Що робить `form.reset()`?

Чим `form.reset()` відрізняється від `input.value = ""`?

Що таке `fetch()`?

Як відправити form data через `fetch()`?

Як відправити JSON через `fetch()`?

Для чого потрібен:

    Content-Type: application/json

Що таке `JSON.stringify()`?

Що робить `response.json()`?

Що таке `response.ok`?

Як обробляти network error?

Навіщо використовувати `try...catch`?

Як зробити submit handler asynchronous?

Навіщо використовувати `async/await`?

Як реалізувати loading state?

Як запобігти повторному submit?

Чому frontend validation не замінює backend validation?

Як form submission пов'язаний із backend API?

Як form submission пов'язаний із PostgreSQL?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке:

    form
    input
    button
    submit

Вміти:

    знайти form
    знайти input
    обробити submit
    отримати input.value

Знати:

    form.addEventListener("submit", ...)
    event.preventDefault()
    event.target

Розуміти:

    browser default behavior
    form submission
    page reload

Вміти:

    прочитати дані форми
    перевірити порожнє поле
    очистити форму

Знати:

    form.reset()

---

🔵 Junior

Впевнено використовувати:

    submit event
    preventDefault()
    form.elements
    FormData
    fetch()
    async/await

Розуміти:

    action
    method
    GET
    POST
    name
    id

Вміти:

    отримати декілька полів
    перетворити дані
    виконати validation
    відправити POST request
    отримати JSON response
    обробити помилку
    показати success/error message
    зробити loading state
    запобігти повторному submit

Розуміти flow:

    Form
      ↓
    submit
      ↓
    preventDefault()
      ↓
    data
      ↓
    validation
      ↓
    fetch()
      ↓
    API

---

🟠 Middle

Глибше розуміння:

    form submission lifecycle
    HTML constraint validation
    FormData
    HTTP methods
    request / response
    client-side validation
    server-side validation
    error handling
    loading states
    async form submission
    API integration

Вміти проектувати:

    reusable form handlers
    form state
    validation architecture
    server error handling
    optimistic / pessimistic UI
    retry logic
    duplicate-submit prevention

Розуміти:

    frontend ↔ backend boundary
    HTTP status codes
    JSON API
    authentication forms
    authorization-related flows
    CSRF considerations
    XSS risks
    input validation

---

🔴 Senior

Глибоке розуміння:

    HTML form specification
    constraint validation API
    form submission algorithms
    browser event model
    accessibility
    keyboard submission
    autofill
    autocomplete
    complex form state
    concurrent submissions
    request cancellation
    AbortController
    race conditions
    idempotency
    distributed form submission

Архітектура:

    Form
      ↓
    UI State
      ↓
    Validation
      ↓
    Request
      ↓
    API
      ↓
    Business Logic
      ↓
    Database
      ↓
    Response
      ↓
    UI State

Розуміння trade-offs між:

    native form submission
    JavaScript submission
    FormData
    JSON API
    server-rendered forms
    SPA forms

---

# Міні-шпаргалка

## Form

    const form = document.querySelector("#form");

---

## Submit

    form.addEventListener("submit", (event) => {
        // ...
    });

---

## Prevent default

    form.addEventListener("submit", (event) => {
        event.preventDefault();
    });

---

## Input value

    const value = input.value.trim();

---

## Form element

    const input = form.elements.username;

---

## FormData

    const formData = new FormData(form);

---

## FormData → Object

    const data = Object.fromEntries(formData);

---

## POST JSON

    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

---

## Check response

    if (!response.ok) {
        throw new Error("Request failed");
    }

---

## JSON response

    const result = await response.json();

---

## Reset

    form.reset();

---

## Disable submit

    submitButton.disabled = true;

---

## Enable submit

    submitButton.disabled = false;

---

## Validation

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

---

# Основні правила

    form
        → контейнер form controls

    submit
        → подія відправлення форми

    preventDefault()
        → скасувати стандартну browser behavior

    input.value
        → отримати значення input

    form.elements
        → отримати controls форми

    FormData
        → зібрати form data

    fetch()
        → виконати HTTP request

    response.ok
        → перевірити HTTP success

    response.json()
        → отримати JSON

    form.reset()
        → повернути поля до initial values

---

# Submit Flow

    USER
      ↓
    fill form
      ↓
    submit
      ↓
    submit event
      ↓
    preventDefault()
      ↓
    collect data
      ↓
    validate
      ↓
    fetch()
      ↓
    backend
      ↓
    response
      ↓
    update UI

---

# Full Stack Flow

    HTML Form
        ↓
    JavaScript
        ↓
    submit event
        ↓
    preventDefault()
        ↓
    FormData
        ↓
    validation
        ↓
    JSON
        ↓
    fetch()
        ↓
    HTTP POST
        ↓
    Node.js / Express / NestJS
        ↓
    server validation
        ↓
    PostgreSQL
        ↓
    response
        ↓
    JavaScript
        ↓
    UI

---

# Головне:

• `<form>` об'єднує поля форми та керує їх submission.

• Основна подія форми:

    submit

• Обробляти потрібно саме:

    form.addEventListener("submit", ...)

• Це краще, ніж покладатися тільки на:

    button.addEventListener("click", ...)

оскільки форма може бути відправлена не тільки кліком по кнопці.

• Найважливіший шаблон:

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // process form
    });

• `event.preventDefault()` скасовує стандартну поведінку браузера для submit.

• `event.target` у submit handler зазвичай посилається на `<form>`.

• Значення окремого input можна отримати через:

    input.value

• Дані всієї форми можна отримати через:

    new FormData(form)

• `name` важливий для form submission та `FormData`.

• `id` використовується переважно як DOM identifier та для зв'язку з `<label>`.

• `action` визначає URL стандартного form submission.

• `method` визначає HTTP method.

• Основні methods:

    GET
    POST

• GET зазвичай використовується для отримання / пошуку даних.

• POST зазвичай використовується для передачі даних на сервер для створення або зміни ресурсу.

• Для custom JavaScript submission часто використовується:

    fetch()

• Типовий сучасний flow:

    submit
      ↓
    preventDefault()
      ↓
    FormData
      ↓
    validation
      ↓
    fetch()
      ↓
    backend

• JSON можна створити через:

    JSON.stringify(data)

• Для JSON request потрібно вказати:

    Content-Type: application/json

• Після fetch потрібно перевіряти:

    response.ok

• JSON response можна отримати через:

    response.json()

• Асинхронний submit часто пишеться через:

    async / await

• Помилки network request потрібно обробляти через:

    try...catch

• Під час request можна блокувати submit button:

    submitButton.disabled = true;

• Після успішного submit форму можна очистити:

    form.reset();

• `form.reset()` повертає поля до їх початкових значень.

• Frontend validation не замінює backend validation.

• У full stack application дані проходять:

    Form
      ↓
    JavaScript
      ↓
    API
      ↓
    Backend
      ↓
    Database

• Основна модель:

    Form
      ↓
    submit
      ↓
    preventDefault()
      ↓
    collect data
      ↓
    validate
      ↓
    send request
      ↓
    handle response
      ↓
    update UI

• `02-form-submit` — це міст між роботою з окремими input та повноцінною відправкою даних.

• Наступний важливий крок:

    03-formdata

де детальніше розглядається:

    FormData
    get()
    set()
    append()
    has()
    delete()
    entries()
    keys()
    values()
    Object.fromEntries()