# 01. Element Selection

Element Selection (вибір елементів DOM) — це отримання HTML-елементів із DOM-дерева за допомогою JavaScript.

Вибір елементів — одна з базових операцій при роботі з DOM.

Після того як елемент знайдений, JavaScript може:

    змінювати текст;
    змінювати HTML;
    змінювати атрибути;
    змінювати CSS-класи;
    змінювати inline styles;
    додавати або видаляти елементи;
    встановлювати event listeners;
    читати значення form elements.

Наприклад, HTML:

    <h1 id="title">Hello</h1>

JavaScript:

    const title = document.getElementById("title");

Після цього:

    title

містить посилання на DOM element `<h1>`.

---

### Ключові поняття

✔ DOM  
✔ DOM tree  
✔ document  
✔ element  
✔ node  
✔ selector  
✔ CSS selector  
✔ element selection  
✔ `document`  
✔ `getElementById()`  
✔ `getElementsByClassName()`  
✔ `getElementsByTagName()`  
✔ `querySelector()`  
✔ `querySelectorAll()`  
✔ `NodeList`  
✔ `HTMLCollection`  
✔ element reference  
✔ multiple elements  
✔ first matching element  
✔ all matching elements  
✔ `null`  
✔ `length`  
✔ `for...of`  
✔ CSS selectors  

---

### Що потрібно пам'ятати

• DOM — це представлення HTML-документа у вигляді об'єктів, з якими JavaScript може працювати.

• `document` — головний об'єкт для роботи з поточним HTML-документом.

• Element Selection — пошук потрібного DOM element.

• `getElementById()` шукає елемент за його `id`.

• `querySelector()` повертає перший елемент, який відповідає CSS selector.

• `querySelectorAll()` повертає всі елементи, які відповідають CSS selector.

• `getElementsByClassName()` повертає колекцію елементів із певним class.

• `getElementsByTagName()` повертає колекцію елементів із певним tag name.

• `querySelector()` може використовувати практично будь-який CSS selector.

• Якщо `querySelector()` нічого не знаходить, результатом буде:

    null

• `querySelectorAll()` при відсутності збігів повертає порожній `NodeList`.

• `id` повинен бути унікальним у документі.

• Якщо потрібен один конкретний елемент, часто використовують:

    getElementById()
    querySelector()

• Якщо потрібно отримати багато елементів, часто використовують:

    querySelectorAll()

• DOM selection завжди починається від об'єкта:

    document

• Після вибору елемент можна зберегти у змінну:

    const button = document.querySelector(".button");

---

# DOM

DOM означає:

    Document Object Model

DOM — це об'єктне представлення HTML-документа.

Наприклад, HTML:

    <!DOCTYPE html>
    <html>
        <body>
            <h1>Hello</h1>
            <p>Text</p>
        </body>
    </html>

Браузер створює структуру DOM:

    document
       │
       └── html
           ├── head
           └── body
               ├── h1
               └── p

JavaScript може отримувати доступ до цих елементів через:

    document

---

# document

`document` — об'єкт, який представляє поточний HTML-документ.

Наприклад:

    console.log(document);

У браузері можна отримати:

    document.body

    document.head

    document.documentElement

---

### document.documentElement

Повертає кореневий `<html>` element.

    const html = document.documentElement;

    console.log(html);

---

### document.head

Повертає `<head>`.

    const head = document.head;

---

### document.body

Повертає `<body>`.

    const body = document.body;

---

# Element

DOM element — це об'єкт, який представляє HTML-елемент.

Наприклад:

    <h1>Hello</h1>

JavaScript:

    const title = document.querySelector("h1");

Тепер:

    title

є посиланням на DOM element.

---

# CSS Selectors

Сучасний DOM API активно використовує CSS selectors.

Наприклад:

    .button

означає:

    element with class="button"

А:

    #title

означає:

    element with id="title"

А:

    p

означає:

    all <p> elements

CSS selectors дуже важливі для:

    querySelector()
    querySelectorAll()

---

# getElementById()

`getElementById()` знаходить element за його `id`.

HTML:

    <h1 id="title">Hello</h1>

JavaScript:

    const title = document.getElementById("title");

Тепер:

    title

містить `<h1>` element.

---

### Простий приклад

HTML:

    <button id="saveButton">
        Save
    </button>

JavaScript:

    const button = document.getElementById("saveButton");

---

### Якщо element не існує

HTML:

    <h1 id="title">Hello</h1>

JavaScript:

    const button = document.getElementById("button");

Результат:

    null

Тому важливо перевіряти результат, якщо element може бути відсутнім.

---

### Перевірка

    const button = document.getElementById("button");

    if (button) {
        console.log(button);
    }

---

# ID повинен бути унікальним

HTML:

    <h1 id="title">First</h1>
    <h1 id="title">Second</h1>

Так робити не слід.

`id` повинен ідентифікувати один конкретний element у документі.

Типовий підхід:

    id → unique element

Наприклад:

    <button id="submitButton">
        Submit
    </button>

---

# querySelector()

`querySelector()` знаходить перший element, який відповідає CSS selector.

Синтаксис:

    document.querySelector(selector);

Наприклад:

    const title = document.querySelector("h1");

---

### Tag selector

HTML:

    <h1>Hello</h1>

JavaScript:

    const title = document.querySelector("h1");

---

### Class selector

HTML:

    <button class="button">
        Save
    </button>

JavaScript:

    const button = document.querySelector(".button");

---

### ID selector

HTML:

    <h1 id="title">Hello</h1>

JavaScript:

    const title = document.querySelector("#title");

---

# querySelector() повертає перший збіг

HTML:

    <p class="text">First</p>
    <p class="text">Second</p>
    <p class="text">Third</p>

JavaScript:

    const paragraph = document.querySelector(".text");

Буде вибрано:

    First

Тобто:

    querySelector()
        ↓
    first matching element

---

# querySelector() та складні selectors

Можна використовувати складні CSS selectors.

Наприклад:

    const button = document.querySelector(
        "form .button"
    );

Це означає:

    .button
        ↓
    inside form

---

### Attribute selector

HTML:

    <input type="email">

JavaScript:

    const input = document.querySelector(
        'input[type="email"]'
    );

---

### Child selector

HTML:

    <ul>
        <li>One</li>
        <li>Two</li>
    </ul>

JavaScript:

    const item = document.querySelector(
        "ul > li"
    );

Буде вибрано перший `<li>`, який є безпосередньою дитиною `<ul>`.

---

### Descendant selector

    const item = document.querySelector(
        "ul li"
    );

Шукає `<li>` всередині `<ul>`.

---

# querySelectorAll()

`querySelectorAll()` знаходить всі elements, які відповідають CSS selector.

Синтаксис:

    document.querySelectorAll(selector);

Наприклад:

    const paragraphs = document.querySelectorAll("p");

---

### Приклад

HTML:

    <p>First</p>
    <p>Second</p>
    <p>Third</p>

JavaScript:

    const paragraphs = document.querySelectorAll("p");

Результат:

    NodeList(3)

У ньому:

    paragraph 1
    paragraph 2
    paragraph 3

---

# querySelectorAll() та class

HTML:

    <button class="button">One</button>
    <button class="button">Two</button>
    <button class="button">Three</button>

JavaScript:

    const buttons = document.querySelectorAll(".button");

Тепер:

    buttons

містить усі три buttons.

---

# Перебір querySelectorAll()

`querySelectorAll()` повертає `NodeList`, який можна перебирати через `for...of`.

    const buttons = document.querySelectorAll(".button");

    for (const button of buttons) {
        console.log(button);
    }

---

### forEach()

`NodeList` також підтримує `forEach()`.

    const buttons = document.querySelectorAll(".button");

    buttons.forEach((button) => {
        console.log(button);
    });

---

### Arrow function

    buttons.forEach(button => {
        console.log(button);
    });

---

# NodeList

`NodeList` — колекція DOM nodes.

Наприклад:

    const paragraphs = document.querySelectorAll("p");

Результат:

    NodeList

NodeList може містити:

    0 elements
    1 element
    many elements

---

### length

Можна отримати кількість елементів:

    const paragraphs = document.querySelectorAll("p");

    console.log(paragraphs.length);

Наприклад:

    3

---

### Access by index

NodeList підтримує доступ за index:

    const paragraphs = document.querySelectorAll("p");

    console.log(paragraphs[0]);

    console.log(paragraphs[1]);

    console.log(paragraphs[2]);

---

### for...of

    for (const paragraph of paragraphs) {
        console.log(paragraph);
    }

---

# HTMLCollection

Старіші DOM methods можуть повертати `HTMLCollection`.

Наприклад:

    document.getElementsByClassName()

або:

    document.getElementsByTagName()

---

### Приклад

    const buttons = document.getElementsByClassName("button");

Результат:

    HTMLCollection

---

# NodeList vs HTMLCollection

Основна різниця для Core-рівня:

    querySelectorAll()
        ↓
    NodeList

    getElementsByClassName()
        ↓
    HTMLCollection

    getElementsByTagName()
        ↓
    HTMLCollection

Обидві структури містять колекцію DOM elements.

---

# getElementsByClassName()

`getElementsByClassName()` знаходить elements за class name.

HTML:

    <div class="card">One</div>
    <div class="card">Two</div>

JavaScript:

    const cards = document.getElementsByClassName("card");

Результат:

    HTMLCollection

---

### Перебір

Можна отримати element за index:

    console.log(cards[0]);

    console.log(cards[1]);

Також можна використовувати класичний `for`:

    for (let i = 0; i < cards.length; i++) {
        console.log(cards[i]);
    }

---

### for...of

У сучасних браузерах HTMLCollection є iterable:

    for (const card of cards) {
        console.log(card);
    }

---

# getElementsByTagName()

`getElementsByTagName()` знаходить elements за tag name.

Наприклад:

    const paragraphs = document.getElementsByTagName("p");

Або:

    const buttons = document.getElementsByTagName("button");

---

### Приклад

HTML:

    <button>One</button>
    <button>Two</button>

JavaScript:

    const buttons = document.getElementsByTagName("button");

---

# getElementsByClassName() vs querySelectorAll()

Наприклад:

    document.getElementsByClassName("button");

та:

    document.querySelectorAll(".button");

Обидва способи можуть знайти elements з:

    class="button"

Але результат відрізняється:

    getElementsByClassName()
        ↓
    HTMLCollection

    querySelectorAll()
        ↓
    NodeList

У сучасному коді `querySelector()` / `querySelectorAll()` часто зручніші через єдиний CSS selector API.

---

# getElementsByTagName() vs querySelectorAll()

Можна написати:

    document.getElementsByTagName("button");

або:

    document.querySelectorAll("button");

Результат:

    getElementsByTagName()
        → HTMLCollection

    querySelectorAll()
        → NodeList

---

# querySelector() vs querySelectorAll()

Це одна з найважливіших відмінностей.

`querySelector()`:

    → first matching element

`querySelectorAll()`:

    → all matching elements

Наприклад:

    const firstButton =
        document.querySelector(".button");

    const allButtons =
        document.querySelectorAll(".button");

---

# getElementById() vs querySelector()

Обидва можуть знайти element за id.

    document.getElementById("title");

та:

    document.querySelector("#title");

Але:

    getElementById()
        → спеціалізований пошук за id

    querySelector()
        → універсальний CSS selector

---

### Практичне правило

Для одного element:

    getElementById()
    querySelector()

Для багатьох:

    querySelectorAll()

---

# Selection from an Element

Не обов'язково завжди шукати від `document`.

Можна шукати всередині конкретного element.

HTML:

    <section class="products">
        <button class="button">One</button>
        <button class="button">Two</button>
    </section>

Спочатку:

    const products = document.querySelector(".products");

Потім:

    const buttons =
        products.querySelectorAll(".button");

Тобто пошук відбувається всередині:

    .products

---

### Навіщо це потрібно

Це корисно, коли сторінка має кілька незалежних областей.

Наприклад:

    const sidebar = document.querySelector(".sidebar");

    const links =
        sidebar.querySelectorAll("a");

Ми шукаємо тільки links всередині sidebar.

---

# Selection Scope

Наприклад:

    const container =
        document.querySelector(".container");

    const buttons =
        container.querySelectorAll("button");

Логіка:

    document
       ↓
    .container
       ↓
    buttons

Це дозволяє обмежити область пошуку.

---

# Checking Selection

Після selection корисно перевірити, чи element існує.

Наприклад:

    const button =
        document.querySelector(".button");

    if (button) {
        console.log("Button found");
    }

---

### Чому це важливо

Якщо element не існує:

    const button =
        document.querySelector(".button");

результат:

    null

Тому:

    button.addEventListener(...)

може викликати помилку, якщо `button === null`.

---

# null

`null` означає відсутність знайденого element у випадку:

    querySelector()
    getElementById()

Наприклад:

    const title =
        document.getElementById("missing");

    console.log(title);

Результат:

    null

---

# querySelectorAll() без результатів

На відміну від `querySelector()`:

    const element =
        document.querySelector(".missing");

Результат:

    null

А:

    const elements =
        document.querySelectorAll(".missing");

Результат:

    NodeList(0)

Тобто:

    querySelector()
        → null

    querySelectorAll()
        → empty NodeList

---

# Optional Selection Pattern

Наприклад:

    const button =
        document.querySelector(".button");

    if (!button) {
        return;
    }

    button.textContent = "Save";

Цей pattern часто використовується, щоб не працювати з відсутнім element.

---

# Multiple Classes

HTML:

    <div class="card active">
        Product
    </div>

Можна знайти:

    const card =
        document.querySelector(".card.active");

Це означає:

    element має class "card"
    AND
    element має class "active"

---

# Descendant Selection

HTML:

    <div class="card">
        <h2>Product</h2>
        <p>Description</p>
    </div>

Можна написати:

    const title =
        document.querySelector(".card h2");

Буде знайдено:

    <h2>

всередині:

    .card

---

# Direct Child Selection

HTML:

    <ul>
        <li>One</li>
        <li>Two</li>
    </ul>

Selector:

    const item =
        document.querySelector("ul > li");

`>` означає:

    direct child

---

# Attribute Selection

HTML:

    <input type="text">

Можна знайти:

    const input =
        document.querySelector('input[type="text"]');

---

### Інші приклади

    document.querySelector("[disabled]");

    document.querySelector("[data-id]");

    document.querySelector('[name="email"]');

---

# Data Attributes

HTML:

    <button data-id="25">
        Delete
    </button>

Можна знайти:

    const button =
        document.querySelector("[data-id]");

Або:

    const button =
        document.querySelector(
            '[data-id="25"]'
        );

---

# Selection by Tag

Наприклад:

    const heading =
        document.querySelector("h1");

Або всі:

    const headings =
        document.querySelectorAll("h1");

---

# Selection by Class

Один:

    const card =
        document.querySelector(".card");

Всі:

    const cards =
        document.querySelectorAll(".card");

---

# Selection by ID

    const title =
        document.querySelector("#title");

Або:

    const title =
        document.getElementById("title");

---

# Selection by Attribute

    const email =
        document.querySelector(
            'input[type="email"]'
        );

---

# Selection by Combination

HTML:

    <button
        class="button primary"
        data-action="save"
    >
        Save
    </button>

Можна:

    const button =
        document.querySelector(
            ".button.primary"
        );

Або:

    const button =
        document.querySelector(
            '[data-action="save"]'
        );

Або:

    const button =
        document.querySelector(
            ".button[data-action='save']"
        );

---

# CSS Selector Examples

## Element

    p

→ всі `<p>`.

---

## Class

    .card

→ elements з class `card`.

---

## ID

    #title

→ element з id `title`.

---

## Descendant

    .card p

→ `<p>` всередині `.card`.

---

## Child

    .card > p

→ `<p>`, який є безпосередньою дитиною `.card`.

---

## Multiple classes

    .card.active

→ element має обидва classes.

---

## Attribute

    [disabled]

→ elements з attribute `disabled`.

---

## Attribute value

    input[type="email"]

→ `<input>` з `type="email"`.

---

# Selection Workflow

Типовий workflow:

    1. Find element
    2. Save reference
    3. Check result if necessary
    4. Work with element

Наприклад:

    const button =
        document.querySelector(".button");

    if (!button) {
        return;
    }

    button.textContent = "Save";

---

# Element Reference

Коли ми пишемо:

    const button =
        document.querySelector(".button");

змінна:

    button

містить reference на DOM element.

Це дозволяє звертатися до цього element пізніше:

    button.textContent = "Save";

    button.classList.add("active");

    button.addEventListener("click", () => {
        console.log("Clicked");
    });

---

# One Element vs Many Elements

Один element:

    const button =
        document.querySelector(".button");

Багато:

    const buttons =
        document.querySelectorAll(".button");

Тобто:

    querySelector()
        → Element | null

    querySelectorAll()
        → NodeList

---

# Selection and Index

При роботі з колекцією можна звернутися до element за index.

    const buttons =
        document.querySelectorAll(".button");

    console.log(buttons[0]);

    console.log(buttons[1]);

---

### Перший element

Можна використати:

    buttons[0]

Або:

    buttons.item(0)

Але:

    buttons[0]

є найпростішим і найпоширенішим способом.

---

# length

Для колекції можна перевірити кількість elements:

    const buttons =
        document.querySelectorAll(".button");

    console.log(buttons.length);

Наприклад:

    5

означає:

    знайдено 5 elements.

---

# Перевірка на порожню колекцію

    const buttons =
        document.querySelectorAll(".button");

    if (buttons.length === 0) {
        console.log("No buttons");
    }

---

# First Element

Якщо потрібен тільки перший element:

    const button =
        document.querySelector(".button");

Якщо вже маємо NodeList:

    const buttons =
        document.querySelectorAll(".button");

    const firstButton = buttons[0];

---

# All Elements

Якщо потрібно працювати з усіма:

    const buttons =
        document.querySelectorAll(".button");

    buttons.forEach((button) => {
        console.log(button);
    });

---

# Element Selection in Practice

HTML:

    <h1 id="title">Products</h1>

    <button class="button">
        Add
    </button>

    <button class="button">
        Remove
    </button>

JavaScript:

    const title =
        document.getElementById("title");

    const buttons =
        document.querySelectorAll(".button");

---

# Selection + Text

Після вибору element можна змінити його text.

    const title =
        document.querySelector("h1");

    if (title) {
        title.textContent = "Products";
    }

Тема `textContent` буде детальніше розглядатися у:

    03-text-html

---

# Selection + Class

Після вибору можна працювати з classes.

    const button =
        document.querySelector(".button");

    if (button) {
        button.classList.add("active");
    }

Тема `classList` буде детальніше розглядатися у:

    05-classes

---

# Selection + Event

Після вибору element можна додати event listener.

    const button =
        document.querySelector(".button");

    if (button) {
        button.addEventListener("click", () => {
            console.log("Clicked");
        });
    }

Events будуть детальніше розглядатися у:

    10-events

---

# Selection + Style

Після selection можна змінювати style.

    const title =
        document.querySelector("h1");

    if (title) {
        title.style.fontSize = "32px";
    }

Styles будуть детальніше розглядатися у:

    06-styles

---

# Selection + Attribute

Після selection можна працювати з attributes.

    const image =
        document.querySelector("img");

    if (image) {
        image.setAttribute("alt", "Product");
    }

Attributes будуть детальніше розглядатися у:

    04-attributes

---

# Static NodeList

`querySelectorAll()` повертає static NodeList.

Наприклад:

    const buttons =
        document.querySelectorAll(".button");

Якщо після цього додати новий `.button` до DOM, існуючий `buttons` автоматично не оновиться.

Наприклад:

    const buttons =
        document.querySelectorAll(".button");

    // add new .button to DOM

    console.log(buttons.length);

`buttons` зберігає результат selection на момент виконання `querySelectorAll()`.

---

# Live HTMLCollection

`getElementsByClassName()` та `getElementsByTagName()` повертають live collections.

Наприклад:

    const cards =
        document.getElementsByClassName("card");

Якщо DOM змінюється, collection може автоматично відображати ці зміни.

Це одна з важливих відмінностей:

    querySelectorAll()
        → static NodeList

    getElementsByClassName()
        → live HTMLCollection

На Junior-рівні достатньо розуміти цю різницю концептуально.

---

# querySelectorAll() не повертає Array

Важливо:

    const buttons =
        document.querySelectorAll(".button");

`buttons` — це:

    NodeList

а не:

    Array

Тому не слід автоматично припускати, що всі Array methods доступні так само.

Наприклад:

    map()
    filter()
    reduce()

не є стандартними методами `NodeList`.

Для складної array-обробки можна перетворити NodeList на Array.

---

# NodeList → Array

Наприклад:

    const buttons =
        document.querySelectorAll(".button");

    const buttonArray =
        Array.from(buttons);

Тепер:

    buttonArray

є справжнім Array.

---

### Spread syntax

Також:

    const buttonArray = [...buttons];

---

### Навіщо це потрібно

Наприклад:

    const buttons =
        document.querySelectorAll(".button");

    const buttonArray = [...buttons];

    const activeButtons =
        buttonArray.filter(button =>
            button.classList.contains("active")
        );

---

# querySelector() Scope

`querySelector()` можна викликати не тільки на `document`.

Наприклад:

    const card =
        document.querySelector(".card");

    const title =
        card.querySelector("h2");

Логіка:

    document
        ↓
    .card
        ↓
    h2

---

# querySelectorAll() Scope

Так само:

    const card =
        document.querySelector(".card");

    const buttons =
        card.querySelectorAll("button");

Тепер шукаємо buttons тільки всередині card.

---

# Practical Pattern: Container

HTML:

    <section class="products">
        <article class="product">
            <h2>Phone</h2>
            <button>Buy</button>
        </article>

        <article class="product">
            <h2>Laptop</h2>
            <button>Buy</button>
        </article>
    </section>

JavaScript:

    const products =
        document.querySelector(".products");

    const productCards =
        products.querySelectorAll(".product");

---

# Practical Pattern: Search Inside Element

    const product =
        document.querySelector(".product");

    if (product) {
        const title =
            product.querySelector("h2");

        const button =
            product.querySelector("button");
    }

Це зменшує область пошуку і часто робить код зрозумілішим.

---

# DOM Selection and Page Loading

JavaScript повинен виконувати selection після того, як потрібні HTML elements вже існують у DOM.

Наприклад, якщо script знаходиться в `<head>` і виконується занадто рано:

    const title =
        document.querySelector("#title");

результат може бути:

    null

якщо `<h1 id="title">` ще не створений браузером.

---

### Script в кінці body

Один простий підхід:

    <body>

        <h1 id="title">
            Hello
        </h1>

        <script src="app.js"></script>

    </body>

На момент виконання script HTML вище вже прочитаний.

---

### defer

Сучасний підхід:

    <script
        src="app.js"
        defer
    ></script>

`defer` дозволяє завантажувати script паралельно з HTML, але виконати його після побудови DOM.

Для практичної роботи з DOM це дуже важливий атрибут `<script>`.

---

# Common Selection Patterns

## By ID

    const title =
        document.getElementById("title");

---

## By class

    const card =
        document.querySelector(".card");

---

## By tag

    const heading =
        document.querySelector("h1");

---

## All elements by class

    const cards =
        document.querySelectorAll(".card");

---

## All elements by tag

    const paragraphs =
        document.querySelectorAll("p");

---

## By attribute

    const input =
        document.querySelector(
            'input[type="email"]'
        );

---

## Inside container

    const container =
        document.querySelector(".container");

    const buttons =
        container.querySelectorAll("button");

---

# Practical Examples

### Приклад 1 — знайти heading

HTML:

    <h1 id="title">
        Hello
    </h1>

JavaScript:

    const title =
        document.getElementById("title");

---

### Приклад 2 — знайти element за class

HTML:

    <div class="card">
        Product
    </div>

JavaScript:

    const card =
        document.querySelector(".card");

---

### Приклад 3 — знайти всі cards

HTML:

    <div class="card">One</div>
    <div class="card">Two</div>
    <div class="card">Three</div>

JavaScript:

    const cards =
        document.querySelectorAll(".card");

---

### Приклад 4 — перебрати cards

    const cards =
        document.querySelectorAll(".card");

    cards.forEach((card) => {
        console.log(card);
    });

---

### Приклад 5 — знайти buttons

    const buttons =
        document.querySelectorAll("button");

---

### Приклад 6 — знайти input

HTML:

    <input
        type="email"
        name="email"
    >

JavaScript:

    const emailInput =
        document.querySelector(
            'input[type="email"]'
        );

---

### Приклад 7 — знайти element за data attribute

HTML:

    <button data-id="10">
        Delete
    </button>

JavaScript:

    const button =
        document.querySelector(
            '[data-id="10"]'
        );

---

### Приклад 8 — знайти перший item

    const items =
        document.querySelectorAll(".item");

    const firstItem = items[0];

---

### Приклад 9 — перевірити element

    const button =
        document.querySelector(".button");

    if (button) {
        console.log("Found");
    }

---

### Приклад 10 — знайти buttons всередині card

    const card =
        document.querySelector(".card");

    if (card) {
        const buttons =
            card.querySelectorAll("button");
    }

---

### Приклад 11 — кількість elements

    const cards =
        document.querySelectorAll(".card");

    console.log(cards.length);

---

### Приклад 12 — NodeList → Array

    const cards =
        document.querySelectorAll(".card");

    const cardsArray = [...cards];

---

### Приклад 13 — selection + event

    const button =
        document.querySelector(".button");

    if (button) {
        button.addEventListener("click", () => {
            console.log("Clicked");
        });
    }

---

### Приклад 14 — selection + text

    const title =
        document.querySelector("h1");

    if (title) {
        title.textContent = "New title";
    }

---

# Типові помилки

❌ Плутати `querySelector()` та `querySelectorAll()`.

    querySelector()
        → first element

    querySelectorAll()
        → all matching elements

---

❌ Забувати `.` перед class selector.

Неправильно:

    document.querySelector("button");

якщо потрібно знайти:

    class="button"

Правильно:

    document.querySelector(".button");

---

❌ Забувати `#` перед id у CSS selector.

Правильно:

    document.querySelector("#title");

Але:

    document.getElementById("title");

не потребує `#`.

---

❌ Використовувати неправильний selector.

Наприклад:

    document.querySelector("button.save");

означає:

    <button class="save">

а не:

    <button id="save">

Для id:

    button#save

---

❌ Очікувати Array від `querySelectorAll()`.

    const buttons =
        document.querySelectorAll(".button");

Це:

    NodeList

а не:

    Array

---

❌ Звертатися до `null`.

    const button =
        document.querySelector(".missing");

    button.textContent = "Hello";

Якщо element не знайдено:

    button === null

і наступна операція може викликати помилку.

Безпечніше:

    if (button) {
        button.textContent = "Hello";
    }

---

❌ Виконувати DOM selection занадто рано.

Якщо HTML element ще не створений, selection може повернути:

    null

Потрібно правильно організувати завантаження script.

---

❌ Використовувати `getElementById()` для class.

Неправильно:

    document.getElementById("card");

якщо HTML:

    <div class="card"></div>

Правильно:

    document.querySelector(".card");

---

❌ Використовувати class name без крапки.

Неправильно:

    document.querySelector("card");

Правильно:

    document.querySelector(".card");

---

❌ Використовувати id без `#` у `querySelector()`.

Неправильно:

    document.querySelector("title");

якщо:

    id="title"

Правильно:

    document.querySelector("#title");

---

❌ Плутати `HTMLCollection` та `NodeList`.

    getElementsByClassName()
        → HTMLCollection

    getElementsByTagName()
        → HTMLCollection

    querySelectorAll()
        → NodeList

---

# getElementById vs querySelector

| Method | Selector | Result |
|---|---|---|
| `getElementById()` | id | Element / `null` |
| `querySelector()` | CSS selector | first Element / `null` |
| `querySelectorAll()` | CSS selector | NodeList |

---

# Основні методи Selection

## getElementById()

    const element =
        document.getElementById("title");

Використовується для:

    id

Повертає:

    Element
    або
    null

---

## getElementsByClassName()

    const elements =
        document.getElementsByClassName("card");

Використовується для:

    class

Повертає:

    HTMLCollection

---

## getElementsByTagName()

    const elements =
        document.getElementsByTagName("p");

Використовується для:

    tag name

Повертає:

    HTMLCollection

---

## querySelector()

    const element =
        document.querySelector(".card");

Використовується для:

    CSS selector

Повертає:

    first matching Element
    або
    null

---

## querySelectorAll()

    const elements =
        document.querySelectorAll(".card");

Використовується для:

    CSS selector

Повертає:

    NodeList

---

# Selection Cheat Table

| Потрібно | Method |
|---|---|
| element by id | `getElementById()` |
| first element by CSS selector | `querySelector()` |
| all elements by CSS selector | `querySelectorAll()` |
| elements by class | `getElementsByClassName()` |
| elements by tag | `getElementsByTagName()` |

---

# Modern Practical Choice

Для сучасного vanilla JavaScript часто достатньо запам'ятати:

    document.querySelector()

та:

    document.querySelectorAll()

Наприклад:

    const title =
        document.querySelector("#title");

    const buttons =
        document.querySelectorAll(".button");

Ці два methods покривають дуже велику частину повсякденного DOM selection.

Але потрібно знати і старіші methods:

    getElementById()
    getElementsByClassName()
    getElementsByTagName()

оскільки вони зустрічаються у реальному коді та документації.

---

# Selection Patterns

## One element

    const element =
        document.querySelector(".element");

---

## Many elements

    const elements =
        document.querySelectorAll(".element");

---

## Check one element

    const element =
        document.querySelector(".element");

    if (!element) {
        return;
    }

---

## Loop through elements

    const elements =
        document.querySelectorAll(".element");

    for (const element of elements) {
        console.log(element);
    }

---

## forEach

    const elements =
        document.querySelectorAll(".element");

    elements.forEach((element) => {
        console.log(element);
    });

---

## Search inside container

    const container =
        document.querySelector(".container");

    if (container) {
        const elements =
            container.querySelectorAll(".element");
    }

---

# DOM Selection Model

Загальна модель:

    HTML
      ↓
    Browser
      ↓
    DOM
      ↓
    document
      ↓
    selector
      ↓
    element / collection
      ↓
    JavaScript manipulation

Наприклад:

    HTML
      ↓
    <button class="save">
      ↓
    DOM element
      ↓
    document.querySelector(".save")
      ↓
    button reference
      ↓
    button.textContent
    button.classList
    button.addEventListener()

---

# Element Selection vs DOM Manipulation

Element Selection — це:

    знайти element

DOM Manipulation — це:

    змінити element

Наприклад:

    const title =
        document.querySelector("h1");

Це:

    Selection

А:

    title.textContent = "Hello";

це:

    Manipulation

У цьому розділі головна увага:

    selection

Наступні розділи поступово розглянуть:

    text / HTML
    attributes
    classes
    styles
    create elements
    insert elements
    remove elements
    events

---

# Питання зі співбесіди

Що таке DOM?

Що означає DOM?

Що таке `document`?

Що таке DOM element?

Що таке CSS selector?

Як знайти element за id?

Що робить `getElementById()`?

Що повертає `getElementById()`, якщо element не знайдений?

Що робить `querySelector()`?

Що повертає `querySelector()`?

Що робить `querySelectorAll()`?

Чим `querySelector()` відрізняється від `querySelectorAll()`?

Що повертає `querySelectorAll()`?

Що таке `NodeList`?

Що таке `HTMLCollection`?

Чим `NodeList` відрізняється від `HTMLCollection`?

Що робить `getElementsByClassName()`?

Що робить `getElementsByTagName()`?

Чим `getElementById()` відрізняється від `querySelector()`?

Як знайти всі elements з певним class?

Як знайти перший element з певним class?

Як знайти element за attribute?

Як знайти element всередині іншого element?

Чи можна викликати `querySelector()` на DOM element?

Що станеться, якщо `querySelector()` нічого не знайде?

Що станеться, якщо `querySelectorAll()` нічого не знайде?

Чи є результат `querySelectorAll()` масивом?

Як перебрати `NodeList`?

Як перетворити `NodeList` на Array?

Що таке static NodeList?

Що таке live HTMLCollection?

Чому `id` повинен бути унікальним?

Що таке selector `.button`?

Що таке selector `#title`?

Що означає `button.save`?

Що означає `.card p`?

Що означає `.card > p`?

Що означає `[disabled]`?

Що означає `input[type="email"]`?

Що таке element reference?

Чому DOM selection може повернути `null`?

Чому важливо перевіряти результат selection?

Коли використовувати `querySelector()`?

Коли використовувати `querySelectorAll()`?

---

# Шлях

## 🟢 Core (обов'язково знати)

Що таке DOM.

Що таке DOM element.

Що таке `document`.

Що таке CSS selector.

`getElementById()`.

`querySelector()`.

`querySelectorAll()`.

Різниця:

    querySelector()
        → first match

    querySelectorAll()
        → all matches

CSS selectors:

    tag
    .class
    #id

Selection одного element.

Selection багатьох elements.

`null`.

`NodeList`.

`length`.

Index access.

`for...of`.

`forEach()`.

Перевірка знайденого element.

---

## 🔵 Junior

Впевнене використання:

    getElementById()
    querySelector()
    querySelectorAll()

Розуміння:

    getElementsByClassName()
    getElementsByTagName()

Розуміння:

    NodeList
    HTMLCollection

CSS selectors:

    descendant
    child
    attribute
    multiple classes

Selection всередині element:

    container.querySelector()
    container.querySelectorAll()

NodeList → Array:

    Array.from()
    spread (...)

Розуміння:

    static NodeList
    live HTMLCollection

Правильне розміщення `<script>`.

Основи `defer`.

Робота з:

    null
    length
    index

---

## 🟠 Middle

Глибше розуміння DOM tree.

Різниця між:

    Node
    Element
    HTMLElement

DOM collections.

Static vs live collections.

CSS selector performance.

Scoped selection.

DOM traversal.

Робота з:

    parentElement
    children
    firstElementChild
    lastElementChild
    nextElementSibling
    previousElementSibling

Оптимізація кількості DOM queries.

Caching DOM references.

Структурування DOM access.

Розуміння browser parsing та DOM construction.

---

## 🔴 Senior

Глибоке розуміння:

    DOM specification
    Node interface
    Element interface
    Document interface
    HTMLDocument
    DOM tree construction
    HTML parsing
    CSS selector matching
    live collections
    static collections
    DOM performance

Розуміння:

    style recalculation
    layout
    paint
    rendering pipeline

Оптимізація великої кількості DOM queries.

Розуміння:

    document fragments
    mutation observers
    shadow DOM
    custom elements

Архітектура взаємодії JavaScript з DOM.

Trade-offs між:

    direct DOM manipulation
    event delegation
    component abstractions
    framework rendering

---

# Міні-шпаргалка

## document

    document

Представляє поточний HTML-документ.

---

## getElementById()

    document.getElementById("title");

→ element за `id`.

Результат:

    Element
    або
    null

---

## querySelector()

    document.querySelector(".button");

→ перший matching element.

Результат:

    Element
    або
    null

---

## querySelectorAll()

    document.querySelectorAll(".button");

→ всі matching elements.

Результат:

    NodeList

---

## getElementsByClassName()

    document.getElementsByClassName("button");

→ elements за class.

Результат:

    HTMLCollection

---

## getElementsByTagName()

    document.getElementsByTagName("button");

→ elements за tag.

Результат:

    HTMLCollection

---

## CSS selectors

    button

→ tag

    .button

→ class

    #button

→ id

    .card button

→ descendant

    .card > button

→ direct child

    .card.active

→ multiple classes

    [disabled]

→ attribute

    input[type="email"]

→ attribute value

---

## One element

    const button =
        document.querySelector(".button");

---

## Many elements

    const buttons =
        document.querySelectorAll(".button");

---

## First element

    const firstButton = buttons[0];

---

## Count

    console.log(buttons.length);

---

## Loop

    buttons.forEach((button) => {
        console.log(button);
    });

---

## for...of

    for (const button of buttons) {
        console.log(button);
    }

---

## NodeList → Array

    const buttonsArray = [...buttons];

Або:

    const buttonsArray =
        Array.from(buttons);

---

## Search inside element

    const container =
        document.querySelector(".container");

    const buttons =
        container.querySelectorAll("button");

---

## Check

    const button =
        document.querySelector(".button");

    if (button) {
        // work with button
    }

---

# Основні правила

    getElementById()
        → one element by id

    querySelector()
        → first CSS selector match

    querySelectorAll()
        → all CSS selector matches

    getElementsByClassName()
        → HTMLCollection by class

    getElementsByTagName()
        → HTMLCollection by tag

---

    #id
        → id

    .class
        → class

    tag
        → element type

---

    querySelector()
        → Element | null

    querySelectorAll()
        → NodeList

---

    NodeList
        → collection

    HTMLCollection
        → collection

---

    buttons[0]
        → first item

    buttons.length
        → number of items

---

# Головне:

• DOM — це об'єктне представлення HTML-документа.

• `document` — головний об'єкт для роботи з поточним документом.

• Element Selection — отримання DOM elements із документа.

• `getElementById()` шукає element за `id`.

• `querySelector()` шукає перший element, який відповідає CSS selector.

• `querySelectorAll()` знаходить всі elements, які відповідають CSS selector.

• `getElementsByClassName()` знаходить elements за class і повертає `HTMLCollection`.

• `getElementsByTagName()` знаходить elements за tag і повертає `HTMLCollection`.

• `querySelectorAll()` повертає `NodeList`, а не Array.

• Якщо `querySelector()` нічого не знаходить:

    null

• Якщо `querySelectorAll()` нічого не знаходить:

    NodeList(0)

• Для одного element часто використовують:

    getElementById()
    querySelector()

• Для багатьох elements:

    querySelectorAll()

• Основні CSS selectors:

    #id
    .class
    tag

• Складніші selectors:

    .card p
    .card > p
    .card.active
    [disabled]
    input[type="email"]

• DOM selection можна виконувати не тільки від `document`, а й від іншого element:

    container.querySelector(".item");

• `id` повинен бути унікальним у документі.

• Перед роботою з element, який може бути відсутнім, варто перевірити:

    if (element) {
        ...
    }

• `querySelectorAll()` повертає static `NodeList`.

• `getElementsByClassName()` та `getElementsByTagName()` повертають live `HTMLCollection`.

• `NodeList` можна перебирати через:

    for...of

та:

    forEach()

• Якщо потрібні Array methods, можна перетворити NodeList:

    const array = [...nodeList];

або:

    const array = Array.from(nodeList);

• Типовий workflow:

    find
      ↓
    save reference
      ↓
    check
      ↓
    manipulate

• Element Selection є основою всіх наступних операцій з DOM:

    text
    HTML
    attributes
    classes
    styles
    create
    insert
    remove
    events

• Основна модель:

    HTML
      ↓
    DOM
      ↓
    document
      ↓
    selector
      ↓
    element / collection
      ↓
    JavaScript manipulation