# 01. Input Data

`Input` — це HTML-елемент форми, який дозволяє користувачу вводити або вибирати дані.

JavaScript використовується для:

- отримання значення `input`;
- перевірки введених даних;
- реагування на введення користувача;
- зміни значення;
- очищення поля;
- визначення типу input;
- роботи з різними типами полів;
- підготовки даних для відправлення форми;
- взаємодії з іншими елементами DOM.

Основні елементи форм:

    <input>
    <textarea>
    <select>
    <option>
    <button>
    <form>

У цьому розділі основна увага — на отриманні та обробці даних із `<input>` через JavaScript.

---

### Ключові поняття

✔ form  
✔ input  
✔ input element  
✔ `value`  
✔ `value` property  
✔ `type`  
✔ `name`  
✔ `id`  
✔ `placeholder`  
✔ `required`  
✔ `disabled`  
✔ `readonly`  
✔ `checked`  
✔ `input` event  
✔ `change` event  
✔ `focus`  
✔ `blur`  
✔ `focus()`  
✔ `blur()`  
✔ `select()`  
✔ `trim()`  
✔ `input.value`  
✔ `input.value = ...`  
✔ `input.type`  
✔ `input.name`  
✔ `input.id`  
✔ `input.checked`  
✔ `input.disabled`  
✔ `input.readOnly`  
✔ text input  
✔ number input  
✔ password input  
✔ email input  
✔ checkbox  
✔ radio  
✔ file input  

---

### Що потрібно пам'ятати

• Значення більшості `<input>` отримується через:

    input.value

• `value` — це властивість DOM-елемента, яка містить поточне значення поля.

• Значення з `input.value` зазвичай є `string`.

Наприклад:

    <input type="number" id="age">

JavaScript:

    const ageInput = document.querySelector("#age");

    console.log(ageInput.value);

Навіть якщо користувач ввів:

    25

JavaScript отримає:

    "25"

а не:

    25

• Якщо потрібне число, його потрібно явно перетворити:

    const age = Number(ageInput.value);

• `input` event спрацьовує під час зміни значення поля.

• `change` event спрацьовує після зміни значення, коли елемент втрачає focus для багатьох текстових input.

• `focus` означає, що користувач активував поле.

• `blur` означає, що поле втратило focus.

• Для checkbox основне значення читається через:

    input.checked

а не через:

    input.value

• Для radio також важливо використовувати:

    input.checked

• `placeholder` — підказка для користувача, а не значення поля.

• `name` особливо важливий під час роботи з формами та `FormData`.

• `id` зручно використовувати для зв'язку `<label>` з `<input>` та пошуку елемента через DOM.

• `disabled` робить input недоступним для взаємодії.

• `readonly` забороняє редагування, але поле залишається доступним для фокусування.

• Перед використанням текстових даних часто корисно застосовувати:

    value.trim()

щоб видалити пробіли на початку та в кінці.

---

# Input Element

HTML:

    <input type="text">

JavaScript:

    const input = document.querySelector("input");

`input` — це DOM-елемент.

Через нього можна отримувати:

    input.value
    input.type
    input.name
    input.id
    input.disabled
    input.readOnly

---

# Basic Input

Найпростіший текстовий input:

    <input type="text" id="username">

Отримання елемента:

    const usernameInput = document.querySelector("#username");

Отримання значення:

    const username = usernameInput.value;

Наприклад, користувач ввів:

    Valeriy

Тоді:

    usernameInput.value

поверне:

    "Valeriy"

---

# value

`value` — головна властивість для отримання та зміни значення input.

HTML:

    <input type="text" id="name">

JavaScript:

    const input = document.querySelector("#name");

    console.log(input.value);

---

## Зміна value

Можна встановити нове значення:

    input.value = "John";

Після цього поле міститиме:

    John

---

## Очистити input

Щоб очистити поле:

    input.value = "";

Це один із найчастіших патернів роботи з input.

---

# Read Input Value

Наприклад:

    <input type="text" id="username">
    <button id="button">Get value</button>

JavaScript:

    const input = document.querySelector("#username");
    const button = document.querySelector("#button");

    button.addEventListener("click", () => {
        console.log(input.value);
    });

Користувач вводить:

    Valeriy

Після натискання кнопки:

    "Valeriy"

---

# Input Value Is a String

Це дуже важливий момент.

Навіть якщо input має:

    type="number"

його `value` є string.

HTML:

    <input type="number" id="age">

JavaScript:

    const ageInput = document.querySelector("#age");

    console.log(ageInput.value);
    console.log(typeof ageInput.value);

Результат:

    "25"
    "string"

---

# Convert Input to Number

Якщо потрібно отримати число:

    const age = Number(ageInput.value);

Тепер:

    typeof age

буде:

    "number"

Наприклад:

    const input = document.querySelector("#number");

    const number = Number(input.value);

    console.log(number);
    console.log(typeof number);

---

# Number()

Найпростіший спосіб перетворити input value на число:

    const number = Number(input.value);

Наприклад:

    input.value = "25";

    const number = Number(input.value);

Результат:

    25

---

# parseInt()

Для цілих чисел можна використовувати:

    const age = parseInt(input.value, 10);

Наприклад:

    const input = document.querySelector("#age");

    const age = parseInt(input.value, 10);

---

# parseFloat()

Для чисел із дробовою частиною:

    const price = parseFloat(input.value);

Наприклад:

    input.value = "19.99";

    const price = parseFloat(input.value);

Результат:

    19.99

---

# Number vs parseInt vs parseFloat

Для простого input часто достатньо:

    Number(input.value)

`parseInt()`:

    parseInt(value, 10)

використовується для цілого числа.

`parseFloat()`:

    parseFloat(value)

використовується для числа з дробовою частиною.

---

# Empty Input

Якщо input порожній:

    input.value

поверне:

    ""

Наприклад:

    const input = document.querySelector("#name");

    console.log(input.value);

Якщо поле порожнє:

    ""

---

## Перевірка на порожнє значення

Можна написати:

    if (input.value === "") {
        console.log("Input is empty");
    }

Але для текстових даних часто краще:

    if (input.value.trim() === "") {
        console.log("Input is empty");
    }

---

# trim()

`trim()` видаляє пробіли на початку та в кінці string.

Наприклад:

    const value = "   Hello   ";

    console.log(value.trim());

Результат:

    "Hello"

Для input:

    const value = input.value.trim();

Це корисний патерн перед перевіркою тексту.

---

# Input Data Flow

Типовий процес роботи з input:

    user input
        ↓
    input.value
        ↓
    trim / convert
        ↓
    validation
        ↓
    use data

Наприклад:

    const value = input.value.trim();

    if (value === "") {
        console.log("Enter a value");
        return;
    }

    console.log(value);

---

# input Event

`input` event виникає щоразу, коли значення input змінюється через взаємодію користувача.

HTML:

    <input type="text" id="name">

JavaScript:

    const input = document.querySelector("#name");

    input.addEventListener("input", () => {
        console.log(input.value);
    });

Якщо користувач вводить:

    H
    He
    Hel
    Hell
    Hello

обробник буде виконуватися після кожної зміни.

---

# Reading Data on input

Наприклад:

    const input = document.querySelector("#name");

    input.addEventListener("input", () => {
        const value = input.value;

        console.log(value);
    });

Це часто використовується для:

    live validation
    character counter
    live preview
    search
    filtering
    dynamic UI

---

# Event Object

Обробник події отримує event object.

    input.addEventListener("input", (event) => {
        console.log(event);
    });

Event містить інформацію про подію.

---

# event.target

`event.target` — елемент, на якому відбулася подія.

Наприклад:

    input.addEventListener("input", (event) => {
        console.log(event.target);
    });

Для отримання value:

    input.addEventListener("input", (event) => {
        console.log(event.target.value);
    });

Це дуже важливий патерн.

---

# input.value vs event.target.value

Обидва варіанти можуть отримати значення.

Через змінну:

    const input = document.querySelector("#name");

    input.addEventListener("input", () => {
        console.log(input.value);
    });

Через event:

    input.addEventListener("input", (event) => {
        console.log(event.target.value);
    });

`event.target.value` особливо зручний, коли один handler використовується для багатьох input.

---

# change Event

`change` також використовується для відстеження зміни значення.

Наприклад:

    input.addEventListener("change", () => {
        console.log(input.value);
    });

Для текстових input `change` зазвичай спрацьовує після зміни значення та втрати focus.

Для checkbox, radio та select `change` особливо часто використовується.

---

# input vs change

`input`:

    → реагує під час введення / зміни значення

`change`:

    → реагує на підтверджену зміну значення

Наприклад:

    input.addEventListener("input", handler);

зручно для:

    live search
    live validation
    character counter

А:

    input.addEventListener("change", handler);

часто використовується для:

    select
    checkbox
    radio
    finalized field changes

---

# focus

`focus` виникає, коли input отримує focus.

    input.addEventListener("focus", () => {
        console.log("Input focused");
    });

---

# blur

`blur` виникає, коли input втрачає focus.

    input.addEventListener("blur", () => {
        console.log("Input blurred");
    });

---

# focus() Method

JavaScript може встановити focus на input:

    input.focus();

Наприклад:

    const input = document.querySelector("#name");

    input.focus();

Після виконання cursor буде встановлений у поле.

---

# blur() Method

Можна прибрати focus:

    input.blur();

---

# select()

`select()` виділяє текст усередині text input.

    input.select();

Наприклад:

    const input = document.querySelector("#name");

    input.select();

Текст у полі буде виділено.

---

# Input Type

Input може мати різні типи:

    text
    number
    password
    email
    search
    tel
    url
    date
    time
    checkbox
    radio
    file
    color
    range

Тип визначається атрибутом:

    type

Наприклад:

    <input type="email">

---

# input.type

Тип input можна отримати через JavaScript:

    const input = document.querySelector("#email");

    console.log(input.type);

Результат:

    "email"

---

# Text Input

Найпоширеніший тип:

    <input type="text">

JavaScript:

    const input = document.querySelector("input");

    console.log(input.value);

Використовується для:

    name
    city
    username
    title
    search query
    short text

---

# Password Input

HTML:

    <input type="password" id="password">

JavaScript:

    const passwordInput = document.querySelector("#password");

    const password = passwordInput.value;

Значення також є string.

Важливо:

    passwordInput.value

містить введений пароль у пам'яті JavaScript.

Не потрібно без необхідності виводити паролі в:

    console.log()

---

# Email Input

HTML:

    <input type="email" id="email">

JavaScript:

    const emailInput = document.querySelector("#email");

    const email = emailInput.value;

    console.log(email);

`type="email"` також має браузерну поведінку та базову валідацію, але повна перевірка даних розглядатиметься у:

    04-validation

---

# Search Input

HTML:

    <input type="search" id="search">

JavaScript:

    const searchInput = document.querySelector("#search");

    searchInput.addEventListener("input", () => {
        console.log(searchInput.value);
    });

Це типовий сценарій для:

    search
    filtering
    live results

---

# Number Input

HTML:

    <input type="number" id="age">

JavaScript:

    const ageInput = document.querySelector("#age");

    const age = Number(ageInput.value);

---

## min та max

HTML:

    <input
        type="number"
        min="1"
        max="100"
    >

Ці атрибути задають обмеження для input.

Вони корисні для браузерної валідації.

---

## step

Можна задати крок:

    <input
        type="number"
        min="0"
        max="100"
        step="5"
    >

Наприклад:

    0
    5
    10
    15
    ...

---

# Input Attributes

Найважливіші атрибути:

    type
    id
    name
    value
    placeholder
    required
    disabled
    readonly
    min
    max
    step
    minlength
    maxlength

---

# id

`id` унікально ідентифікує елемент.

HTML:

    <input type="text" id="username">

JavaScript:

    const input = document.querySelector("#username");

---

# name

`name` задає ім'я поля.

HTML:

    <input
        type="text"
        name="username"
    >

JavaScript:

    const input = document.querySelector(
        '[name="username"]'
    );

`name` особливо важливий під час:

    form submission
    FormData
    backend processing

---

# id vs name

`id`:

    → ідентифікатор DOM-елемента

`name`:

    → ім'я form field

Наприклад:

    <input
        id="username"
        name="username"
        type="text"
    >

Можна мати однакові значення:

    id="username"
    name="username"

але це різні поняття.

---

# placeholder

`placeholder` показує підказку, коли поле порожнє.

HTML:

    <input
        type="text"
        placeholder="Enter your name"
    >

Важливо:

`placeholder` не є value.

Якщо поле порожнє:

    input.value

буде:

    ""

навіть якщо є:

    placeholder="Enter your name"

---

# required

`required` позначає поле як обов'язкове.

HTML:

    <input
        type="text"
        required
    >

Браузер може перевірити, що поле не порожнє під час submit форми.

Повна робота з `required` та validation буде в:

    04-validation

---

# disabled

`disabled` робить input недоступним для взаємодії.

HTML:

    <input
        type="text"
        disabled
    >

JavaScript:

    input.disabled = true;

Зробити доступним:

    input.disabled = false;

---

# readOnly

`readonly` забороняє користувачу змінювати значення.

HTML:

    <input
        type="text"
        value="Hello"
        readonly
    >

JavaScript:

    input.readOnly = true;

На відміну від `disabled`, readonly field залишається доступним для взаємодії та може поводитися інакше під час відправлення форми.

---

# disabled vs readonly

`disabled`:

    → не можна редагувати
    → не можна взаємодіяти як зі звичайним input
    → disabled form controls не включаються до стандартного form submission

`readonly`:

    → не можна редагувати
    → поле залишається активним
    → значення може бути відправлене разом із формою

---

# Setting Value from JavaScript

JavaScript може встановити value:

    input.value = "Hello";

Наприклад:

    const nameInput = document.querySelector("#name");

    nameInput.value = "Valeriy";

---

# Reset Input

Очистити поле:

    input.value = "";

Наприклад:

    const input = document.querySelector("#name");

    input.value = "";

---

# Multiple Inputs

У формі може бути багато input.

HTML:

    <input type="text" id="firstName">
    <input type="text" id="lastName">
    <input type="email" id="email">

JavaScript:

    const firstNameInput =
        document.querySelector("#firstName");

    const lastNameInput =
        document.querySelector("#lastName");

    const emailInput =
        document.querySelector("#email");

Отримання значень:

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();

---

# Reading Multiple Inputs

Приклад:

    const firstNameInput =
        document.querySelector("#firstName");

    const lastNameInput =
        document.querySelector("#lastName");

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();

    console.log(firstName);
    console.log(lastName);

---

# querySelector for Input

Найчастіше input шукають через:

    document.querySelector()

Наприклад:

    const input = document.querySelector("#name");

Або:

    const input = document.querySelector(
        'input[name="username"]'
    );

---

# querySelectorAll

Якщо потрібно отримати багато input:

    const inputs = document.querySelectorAll("input");

Результат:

    NodeList

Можна перебрати:

    inputs.forEach((input) => {
        console.log(input.value);
    });

---

# Input Event and Multiple Inputs

Можна повісити один handler на всі input:

    const inputs = document.querySelectorAll("input");

    inputs.forEach((input) => {
        input.addEventListener("input", (event) => {
            console.log(event.target.value);
        });
    });

Тут:

    event.target

завжди буде конкретний input, який змінився.

---

# Data from Event Target

Це важливий універсальний патерн:

    input.addEventListener("input", (event) => {
        const value = event.target.value;

        console.log(value);
    });

Логіка:

    user types
        ↓
    input event
        ↓
    event.target
        ↓
    event.target.value
        ↓
    data

---

# Character Counter

`input` event можна використати для підрахунку символів.

HTML:

    <input type="text" id="message">
    <p id="counter">0</p>

JavaScript:

    const input = document.querySelector("#message");
    const counter = document.querySelector("#counter");

    input.addEventListener("input", () => {
        counter.textContent = input.value.length;
    });

Якщо користувач вводить:

    Hello

отримаємо:

    5

---

# Live Preview

Input можна використовувати для live preview.

HTML:

    <input type="text" id="title">
    <h2 id="preview"></h2>

JavaScript:

    const input = document.querySelector("#title");
    const preview = document.querySelector("#preview");

    input.addEventListener("input", () => {
        preview.textContent = input.value;
    });

Логіка:

    input
      ↓
    value
      ↓
    preview.textContent

---

# Simple Live Validation

Наприклад:

    const input = document.querySelector("#name");
    const message = document.querySelector("#message");

    input.addEventListener("input", () => {
        const value = input.value.trim();

        if (value === "") {
            message.textContent = "Enter your name";
            return;
        }

        message.textContent = "Looks good";
    });

Це лише проста перевірка.

Повна validation буде в:

    04-validation

---

# Input Length

Довжину введеного тексту можна отримати через:

    input.value.length

Наприклад:

    const input = document.querySelector("#name");

    console.log(input.value.length);

Якщо введено:

    John

результат:

    4

---

# Minlength and Maxlength

HTML:

    <input
        type="text"
        minlength="3"
        maxlength="20"
    >

Це HTML-обмеження довжини.

У JavaScript також можна перевірити:

    const value = input.value;

    if (value.length < 3) {
        console.log("Too short");
    }

    if (value.length > 20) {
        console.log("Too long");
    }

---

# Input Value and Boolean Conversion

Для перевірки непорожнього input можна використати:

    const value = input.value.trim();

    if (value) {
        console.log("Has value");
    }

    if (!value) {
        console.log("Empty");
    }

Оскільки:

    ""

є falsy.

А непорожній string:

    "Hello"

є truthy.

---

# Empty String

Порожній input:

    input.value === ""

Після trim:

    input.value.trim() === ""

Наприклад:

    const value = input.value.trim();

    if (!value) {
        console.log("Empty input");
    }

Це дуже поширений шаблон.

---

# Input Data Normalization

Перед обробкою даних часто потрібно привести їх до потрібного вигляду.

Наприклад:

    const value = input.value.trim();

Або:

    const email = emailInput.value
        .trim()
        .toLowerCase();

Або:

    const age = Number(ageInput.value);

Типовий flow:

    raw input
        ↓
    trim
        ↓
    normalize
        ↓
    convert
        ↓
    validate
        ↓
    use

---

# String Input

Для текстового input:

    const value = input.value.trim();

---

# Number Input

Для числового input:

    const value = Number(input.value);

---

# Email Input

Для email:

    const email = emailInput.value
        .trim()
        .toLowerCase();

---

# Password Input

Для password:

    const password = passwordInput.value;

Не потрібно:

    console.log(password);

якщо це не спеціальна локальна навчальна ситуація.

---

# Input Type Checking

Можна перевірити тип:

    if (input.type === "number") {
        console.log("Number input");
    }

Або:

    if (input.type === "email") {
        console.log("Email input");
    }

---

# Change Input Type

Тип input можна змінити через JavaScript:

    input.type = "password";

Наприклад:

    const input = document.querySelector("#value");

    input.type = "password";

Але в реальних застосунках зміну типу потрібно робити обережно, особливо для password fields.

---

# Toggle Password Visibility

Типовий приклад:

HTML:

    <input
        type="password"
        id="password"
    >

    <button id="toggle">
        Show
    </button>

JavaScript:

    const passwordInput =
        document.querySelector("#password");

    const toggleButton =
        document.querySelector("#toggle");

    toggleButton.addEventListener("click", () => {
        passwordInput.type =
            passwordInput.type === "password"
                ? "text"
                : "password";
    });

Логіка:

    password
        ↓
    text
        ↓
    password
        ↓
    ...

---

# Checkbox Preview

Checkbox має особливу властивість:

    checked

HTML:

    <input
        type="checkbox"
        id="agree"
    >

JavaScript:

    const checkbox =
        document.querySelector("#agree");

    console.log(checkbox.checked);

Результат:

    true
    false

Checkbox буде детально розглядатися у:

    05-checkbox-radio-select

---

# Radio Preview

Radio також використовує:

    checked

HTML:

    <input
        type="radio"
        name="gender"
        value="male"
    >

JavaScript:

    const radio = document.querySelector(
        'input[value="male"]'
    );

    console.log(radio.checked);

Детальніше:

    05-checkbox-radio-select

---

# File Input Preview

File input також має особливу властивість:

    files

HTML:

    <input
        type="file"
        id="file"
    >

JavaScript:

    const fileInput =
        document.querySelector("#file");

    console.log(fileInput.files);

`files` містить `FileList`.

Детальніше:

    06-file-input

---

# Input Properties

Основні властивості:

    input.value
    input.type
    input.name
    input.id
    input.checked
    input.disabled
    input.readOnly
    input.files

Не всі властивості застосовуються до всіх типів input.

---

# Input Events

Найважливіші події:

    input
    change
    focus
    blur

Наприклад:

    input.addEventListener("input", handler);

    input.addEventListener("change", handler);

    input.addEventListener("focus", handler);

    input.addEventListener("blur", handler);

---

# Practical Example — Get Name

HTML:

    <input type="text" id="name">
    <button id="button">Get name</button>

JavaScript:

    const input = document.querySelector("#name");
    const button = document.querySelector("#button");

    button.addEventListener("click", () => {
        const name = input.value.trim();

        console.log(name);
    });

---

# Practical Example — Greeting

HTML:

    <input type="text" id="name">
    <button id="button">Hello</button>
    <p id="message"></p>

JavaScript:

    const input = document.querySelector("#name");
    const button = document.querySelector("#button");
    const message = document.querySelector("#message");

    button.addEventListener("click", () => {
        const name = input.value.trim();

        message.textContent = `Hello, ${name}!`;
    });

---

# Practical Example — Check Empty Input

    const input = document.querySelector("#name");

    const value = input.value.trim();

    if (!value) {
        console.log("Input is empty");
    } else {
        console.log("Input has value");
    }

---

# Practical Example — Number Calculation

HTML:

    <input type="number" id="number">
    <button id="button">Double</button>

JavaScript:

    const input = document.querySelector("#number");
    const button = document.querySelector("#button");

    button.addEventListener("click", () => {
        const number = Number(input.value);

        const result = number * 2;

        console.log(result);
    });

Важлива частина:

    Number(input.value)

оскільки:

    input.value

є string.

---

# Practical Example — Two Inputs

HTML:

    <input type="number" id="first">
    <input type="number" id="second">

    <button id="add">Add</button>

JavaScript:

    const firstInput =
        document.querySelector("#first");

    const secondInput =
        document.querySelector("#second");

    const addButton =
        document.querySelector("#add");

    addButton.addEventListener("click", () => {
        const first = Number(firstInput.value);
        const second = Number(secondInput.value);

        const result = first + second;

        console.log(result);
    });

Flow:

    input.value
        ↓
    Number()
        ↓
    calculation
        ↓
    result

---

# Practical Example — Live Character Counter

HTML:

    <input type="text" id="message">
    <p id="counter">0</p>

JavaScript:

    const input = document.querySelector("#message");
    const counter = document.querySelector("#counter");

    input.addEventListener("input", () => {
        counter.textContent =
            input.value.length;
    });

---

# Practical Example — Live Preview

HTML:

    <input type="text" id="title">
    <p id="preview"></p>

JavaScript:

    const input = document.querySelector("#title");
    const preview = document.querySelector("#preview");

    input.addEventListener("input", () => {
        preview.textContent =
            input.value;
    });

---

# Practical Example — Normalize Text

    const input = document.querySelector("#name");

    input.addEventListener("input", () => {
        const value = input.value
            .trim()
            .toLowerCase();

        console.log(value);
    });

---

# Practical Example — Focus Input

HTML:

    <input type="text" id="name">

JavaScript:

    const input = document.querySelector("#name");

    input.focus();

---

# Practical Example — Clear Input

    const input = document.querySelector("#name");

    input.value = "";

---

# Practical Example — Select Input Text

    const input = document.querySelector("#name");

    input.select();

---

# Practical Example — Disable Input

    input.disabled = true;

---

# Practical Example — Enable Input

    input.disabled = false;

---

# Practical Example — Readonly

    input.readOnly = true;

---

# Practical Example — Remove Readonly

    input.readOnly = false;

---

# Form vs Input

`input` — окреме поле для введення даних.

`form` — контейнер, який об'єднує поля та керує відправленням даних.

Наприклад:

    <form>
        <input type="text">
        <input type="email">
        <button type="submit">
            Submit
        </button>
    </form>

У наступному розділі:

    02-form-submit

буде розглянуто:

    submit
    preventDefault()
    form submission

---

# Input Data Flow

Типовий frontend flow:

    User
      ↓
    <input>
      ↓
    input.value
      ↓
    trim()
      ↓
    type conversion
      ↓
    validation
      ↓
    application logic
      ↓
    UI / backend

Наприклад:

    const value = input.value.trim();

    if (!value) {
        return;
    }

    console.log(value);

---

# Input and Backend

У full stack application input часто є початковою точкою даних.

Наприклад:

    User
      ↓
    input
      ↓
    JavaScript
      ↓
    validation
      ↓
    request
      ↓
    Node.js / Express / NestJS
      ↓
    PostgreSQL

Саме тому розуміння:

    input.value

є базовою навичкою для frontend та full stack JavaScript.

---

# Common Input Patterns

## Text

    const value = input.value.trim();

---

## Number

    const value = Number(input.value);

---

## Email

    const value = emailInput.value
        .trim()
        .toLowerCase();

---

## Checkbox

    const checked = checkbox.checked;

---

## File

    const files = fileInput.files;

---

# Типові помилки

❌ Забувати, що `input.value` — string.

    const input = document.querySelector("#age");

    const age = input.value;

    console.log(age + 1);

Якщо:

    input.value === "25"

результат може бути:

    "251"

Правильно:

    const age = Number(input.value);

    console.log(age + 1);

Результат:

    26

---

❌ Використовувати `value` для checkbox.

Неправильно:

    if (checkbox.value) {
        ...
    }

Для перевірки стану checkbox потрібно:

    if (checkbox.checked) {
        ...
    }

---

❌ Плутати `placeholder` та `value`.

    <input
        placeholder="Enter your name"
    >

`placeholder` не є введеними даними.

Правильно отримувати дані через:

    input.value

---

❌ Не робити `trim()` для текстових даних.

Наприклад:

    "   John   "

може бути перетворено на:

    "John"

через:

    input.value.trim()

---

❌ Порівнювати number input із number без conversion.

Неправильно:

    if (input.value === 25) {
        ...
    }

Тому що:

    input.value

це:

    "25"

Правильно:

    if (Number(input.value) === 25) {
        ...
    }

---

❌ Використовувати `parseInt()` без розуміння його поведінки.

Наприклад:

    parseInt("25px", 10)

може повернути:

    25

Тому для звичайного numeric input часто зрозуміліше:

    Number(input.value)

---

❌ Не перевіряти порожній input.

    const value = input.value.trim();

    if (!value) {
        return;
    }

---

❌ Виводити password у console.

Не варто:

    console.log(passwordInput.value);

Особливо в production application.

---

❌ Зберігати дані input у HTML через `innerHTML`, якщо достатньо `textContent`.

Наприклад, для текстового preview краще:

    preview.textContent = input.value;

а не:

    preview.innerHTML = input.value;

---

❌ Забувати про `event.target`.

Наприклад:

    input.addEventListener("input", (event) => {
        console.log(event.target.value);
    });

`event.target` дозволяє працювати з конкретним елементом, який викликав подію.

---

# Input Security Note

Input від користувача не можна вважати довіреними даними.

Навіть якщо HTML має:

    required
    minlength
    maxlength
    type="email"

backend все одно повинен перевіряти отримані дані.

Важлива модель:

    frontend validation
        +
    backend validation

Frontend validation покращує UX.

Backend validation захищає application та database від некоректних даних.

---

# Input vs FormData

На цьому етапі можна отримувати дані безпосередньо:

    input.value

Наприклад:

    const name = nameInput.value;

Пізніше для всієї форми можна використовувати:

    FormData

Наприклад:

    const formData = new FormData(form);

`FormData` буде розглядатися окремо:

    03-formdata

---

# Input and submit

Не варто плутати:

    input event

та:

    submit event

`input`:

    → користувач змінює поле

`submit`:

    → користувач відправляє форму

Наприклад:

    input.addEventListener("input", () => {
        console.log("Typing...");
    });

А:

    form.addEventListener("submit", (event) => {
        console.log("Form submitted");
    });

---

# Practical Mini Pattern

Один із найкорисніших шаблонів:

    const input = document.querySelector("#input");

    input.addEventListener("input", (event) => {
        const value = event.target.value.trim();

        if (!value) {
            return;
        }

        console.log(value);
    });

Модель:

    event
      ↓
    target
      ↓
    value
      ↓
    trim
      ↓
    validation
      ↓
    logic

---

# Questions for Interview

Що таке `<input>`?

Що таке `input.value`?

Який тип має `input.value`?

Чому `input.value` для `type="number"` все одно є string?

Як перетворити input value на number?

Чим відрізняються:

    Number()
    parseInt()
    parseFloat()

Що робить `trim()`?

Що таке `input` event?

Що таке `change` event?

Чим `input` відрізняється від `change`?

Що таке `focus`?

Що таке `blur`?

Що робить `focus()`?

Що робить `blur()`?

Що робить `select()`?

Що таке `event.target`?

Як отримати value через `event.target`?

Чим `input.value` відрізняється від `event.target.value`?

Що таке `placeholder`?

Чим `placeholder` відрізняється від `value`?

Для чого потрібен `id`?

Для чого потрібен `name`?

Чим `id` відрізняється від `name`?

Що робить `required`?

Що робить `disabled`?

Що робить `readonly`?

Чим `disabled` відрізняється від `readonly`?

Як очистити input?

Як встановити значення input через JavaScript?

Як перевірити, чи input порожній?

Чому для перевірки текстового input часто використовують `trim()`?

Як отримати довжину введеного тексту?

Як відстежувати введення користувача в реальному часі?

Як отримати значення checkbox?

Що таке `checked`?

Як отримати файли з file input?

Що таке `files`?

Чим `input` відрізняється від `form`?

Що таке `FormData`?

Чому frontend validation не замінює backend validation?

---

# Шлях

🟢 Core (обов'язково знати)

Розуміння:

    <input>

    input.value

    input.type

    input.name

    input.id

Основні типи:

    text
    number
    password
    email
    search

Отримання значення:

    input.value

Очищення:

    input.value = ""

Перевірка:

    input.value.trim()

Перетворення:

    Number(input.value)

Події:

    input
    change
    focus
    blur

Event object:

    event.target
    event.target.value

Основні атрибути:

    placeholder
    required
    disabled
    readonly

---

🔵 Junior

Впевнено працювати з:

    text
    number
    password
    email
    search

Розуміти:

    value
    checked
    files

Використовувати:

    input.value
    input.value.trim()
    Number(input.value)
    input.checked
    input.files

Працювати з:

    input
    change
    focus
    blur

Розуміти:

    event.target

Вміти:

    читати input
    змінювати input
    очищати input
    фокусувати input
    визначати порожній input
    рахувати символи
    створювати live preview
    робити просту live validation

Розуміти різницю:

    input.value
    event.target.value

Розуміти різницю:

    placeholder
    value

Розуміти різницю:

    disabled
    readonly

---

🟠 Middle

Глибше розуміння:

    HTML form controls
    form control states
    browser validation
    constraint validation
    input events
    change events
    focus management
    accessibility
    input normalization
    frontend validation
    backend validation

Розуміння:

    FormData
    Form submission
    controlled inputs
    uncontrolled inputs
    custom validation
    debouncing input
    throttling input
    dynamic form fields

Оптимізація обробки:

    live search
    autocomplete
    validation
    filtering

Розуміння безпеки user input:

    sanitization
    validation
    output encoding
    XSS prevention

---

🔴 Senior

Глибоке розуміння:

    HTML form control specification
    constraint validation API
    input event model
    composition events
    IME input
    accessibility
    keyboard interaction
    browser autofill
    autocomplete
    form state management
    custom form controls
    complex form architecture

Розуміння:

    controlled vs uncontrolled architecture
    input performance
    event delegation
    debouncing
    throttling
    optimistic UI
    client/server validation boundaries
    secure input handling
    XSS
    CSRF
    authentication forms
    authorization-related form flows

Інтеграція:

    Input
        ↓
    Form
        ↓
    FormData
        ↓
    Fetch / HTTP
        ↓
    Node.js / Express / NestJS
        ↓
    PostgreSQL

---

# Міні-шпаргалка

## Get input

    const input = document.querySelector("#name");

    const value = input.value;

---

## Get trimmed value

    const value = input.value.trim();

---

## Check empty

    if (!input.value.trim()) {
        return;
    }

---

## Set value

    input.value = "Hello";

---

## Clear

    input.value = "";

---

## Number

    const number = Number(input.value);

---

## Length

    const length = input.value.length;

---

## Input event

    input.addEventListener("input", (event) => {
        console.log(event.target.value);
    });

---

## Change event

    input.addEventListener("change", () => {
        console.log(input.value);
    });

---

## Focus

    input.focus();

---

## Blur

    input.blur();

---

## Select text

    input.select();

---

## Input type

    console.log(input.type);

---

## Input name

    console.log(input.name);

---

## Checkbox

    const checked = checkbox.checked;

---

## File

    const files = fileInput.files;

---

## Disable

    input.disabled = true;

---

## Enable

    input.disabled = false;

---

## Readonly

    input.readOnly = true;

---

## Remove readonly

    input.readOnly = false;

---

# Основні правила

    input.value
        → поточне значення input

    input.value = ""
        → очистити input

    input.value.trim()
        → очистити пробіли на краях

    Number(input.value)
        → перетворити string на number

    input.addEventListener("input", ...)
        → реагувати на введення

    input.addEventListener("change", ...)
        → реагувати на зміну

    input.focus()
        → встановити focus

    input.blur()
        → прибрати focus

    input.select()
        → виділити текст

    input.checked
        → стан checkbox / radio

    input.files
        → файли file input

---

# Input Flow

    User
      ↓
    <input>
      ↓
    input.value
      ↓
    trim()
      ↓
    convert
      ↓
    validate
      ↓
    process
      ↓
    UI / API

---

# Головне:

• `<input>` — основний HTML-елемент для введення даних.

• Поточне значення input отримується через:

    input.value

• `input.value` для звичайних input є string.

• Навіть:

    <input type="number">

повертає:

    "25"

а не:

    25

• Для отримання числа:

    Number(input.value)

• Для текстових даних часто потрібно:

    input.value.trim()

• Порожній input має:

    input.value === ""

• Для перевірки непорожнього значення можна використовувати:

    if (input.value.trim()) {
        ...
    }

• `input` event дозволяє реагувати на введення користувача в реальному часі.

• `change` event використовується для відстеження зміни значення.

• `focus` виникає, коли input отримує focus.

• `blur` виникає, коли input втрачає focus.

• `event.target` — елемент, який викликав подію.

• Тому типовий патерн:

    input.addEventListener("input", (event) => {
        const value = event.target.value;
    });

• `placeholder` — лише підказка, а не введене значення.

• `id` — ідентифікатор DOM-елемента.

• `name` — ім'я form field, важливе для form submission та `FormData`.

• `required` задає обов'язкове поле.

• `disabled` робить input недоступним.

• `readonly` забороняє редагування, але не робить поле disabled.

• Для checkbox та radio потрібно перевіряти:

    input.checked

а не тільки:

    input.value

• Для file input використовується:

    input.files

• Основна модель роботи з текстовим input:

    const value = input.value.trim();

• Основна модель роботи з number input:

    const value = Number(input.value);

• Основна модель live input:

    input.addEventListener("input", (event) => {
        const value = event.target.value.trim();

        // process value
    });

• Основна модель frontend data flow:

    input
      ↓
    value
      ↓
    normalize
      ↓
    convert
      ↓
    validate
      ↓
    process

• Input — це початкова точка роботи з user data у багатьох frontend-застосунках.

• У full stack application дані часто проходять шлях:

    Input
      ↓
    JavaScript
      ↓
    Validation
      ↓
    HTTP Request
      ↓
    Backend
      ↓
    Database

• Наступний крок після роботи з окремими input — робота з цілою формою:

    02-form-submit

• Далі:

    03-formdata
    04-validation
    05-checkbox-radio-select
    06-file-input
    07-form-project