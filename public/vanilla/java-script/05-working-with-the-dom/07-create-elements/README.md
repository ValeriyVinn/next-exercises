# 07. Create Elements у DOM

## 📌 Що таке створення елементів у DOM?

JavaScript дозволяє не тільки знаходити та змінювати вже існуючі HTML-елементи, але й **створювати нові елементи під час виконання програми**.

Наприклад, HTML спочатку може містити:

    <div id="app"></div>

А JavaScript створює:

    <h2>Hello</h2>
    <p>This is a new paragraph.</p>
    <button>Click me</button>

і потім додає їх у DOM.

Основний метод:

    document.createElement()

Загальна модель:

    createElement()
        ↓
    налаштувати element
        ↓
    insert element у DOM

---

# 1. `document.createElement()`

Основний метод для створення HTML-елемента:

    const element = document.createElement("tag");

Наприклад:

    const paragraph = document.createElement("p");

Тепер у JavaScript існує DOM-елемент `<p>`, але він **ще не знаходиться на сторінці**.

Це важливий момент:

    document.createElement()
    
не додає елемент автоматично в DOM.

Він тільки створює DOM-вузол.

---

# 2. Створення `div`

    const div = document.createElement("div");

Тепер:

    div

є об'єктом типу `HTMLDivElement`.

Але користувач ще його не бачить.

Щоб побачити його на сторінці, потрібно додати його в DOM.

---

# 3. Створення `p`

    const paragraph = document.createElement("p");

Можна створити будь-який стандартний HTML-елемент:

    const title = document.createElement("h1");
    const paragraph = document.createElement("p");
    const button = document.createElement("button");
    const input = document.createElement("input");
    const image = document.createElement("img");
    const list = document.createElement("ul");
    const item = document.createElement("li");

---

# 4. Створений елемент ще не є частиною сторінки

Наприклад:

    const title = document.createElement("h1");

    title.textContent = "Hello";

Це створило елемент:

    <h1>Hello</h1>

але він поки що існує тільки як DOM-об'єкт у JavaScript.

На сторінці його ще немає.

Потрібно окремо виконати операцію вставки:

    parent.append(title);

---

# 5. Повна базова схема

Найважливіший патерн:

    // 1. Знайти батьківський елемент
    const container = document.querySelector("#app");

    // 2. Створити елемент
    const paragraph = document.createElement("p");

    // 3. Налаштувати елемент
    paragraph.textContent = "Hello, world!";
    paragraph.classList.add("message");

    // 4. Додати в DOM
    container.append(paragraph);

У результаті:

    <div id="app">
        <p class="message">Hello, world!</p>
    </div>

---

# 6. Створення елемента + `textContent`

Найпростіший спосіб створити текстовий елемент:

    const paragraph = document.createElement("p");

    paragraph.textContent = "Hello!";

Після вставки:

    container.append(paragraph);

Отримаємо:

    <p>Hello!</p>

---

# 7. Створення заголовка

    const title = document.createElement("h1");

    title.textContent = "My Website";

    document.body.append(title);

---

# 8. Створення декількох елементів

    const title = document.createElement("h1");
    const paragraph = document.createElement("p");
    const button = document.createElement("button");

    title.textContent = "Hello";
    paragraph.textContent = "Welcome!";
    button.textContent = "Click me";

    document.body.append(title);
    document.body.append(paragraph);
    document.body.append(button);

---

# 9. Створення елемента з класом

Після створення можна додати CSS-клас:

    const card = document.createElement("div");

    card.classList.add("card");

У результаті:

    <div class="card"></div>

Можна додати декілька класів:

    card.classList.add("card", "product-card", "active");

---

# 10. Створення елемента з `id`

    const title = document.createElement("h1");

    title.id = "main-title";

У результаті:

    <h1 id="main-title"></h1>

Також можна:

    title.setAttribute("id", "main-title");

Але для простого `id`:

    title.id = "main-title";

зазвичай достатньо.

---

# 11. Створення елемента з текстом і класом

    const message = document.createElement("p");

    message.textContent = "Operation successful.";
    message.classList.add("success");

Після вставки:

    <p class="success">
        Operation successful.
    </p>

---

# 12. Встановлення атрибутів

Створений елемент можна одразу налаштувати.

Наприклад:

    const link = document.createElement("a");

    link.href = "https://example.com";
    link.target = "_blank";
    link.textContent = "Open website";

---

# 13. Створення `img`

    const image = document.createElement("img");

    image.src = "/images/photo.jpg";
    image.alt = "A beautiful landscape";

Після вставки:

    <img
        src="/images/photo.jpg"
        alt="A beautiful landscape"
    >

---

# 14. Створення `button`

    const button = document.createElement("button");

    button.type = "button";
    button.textContent = "Click me";

Після вставки:

    <button type="button">
        Click me
    </button>

---

# 15. Створення `input`

    const input = document.createElement("input");

    input.type = "text";
    input.placeholder = "Enter your name";

У результаті:

    <input
        type="text"
        placeholder="Enter your name"
    >

---

# 16. `setAttribute()`

Для встановлення атрибутів можна використовувати:

    element.setAttribute(name, value);

Наприклад:

    const input = document.createElement("input");

    input.setAttribute("type", "email");
    input.setAttribute("placeholder", "Enter email");

---

# 17. Властивість чи `setAttribute()`?

Для стандартних властивостей часто достатньо:

    input.type = "email";

    input.placeholder = "Enter email";

Але `setAttribute()` корисний для:

- довільних атрибутів;
- `data-*`;
- `aria-*`;
- атрибутів, які зручно задавати як рядок.

Наприклад:

    element.setAttribute("data-id", "123");

---

# 18. `data-*` атрибути

Можна створити:

    const item = document.createElement("li");

    item.dataset.id = "123";
    item.dataset.category = "books";

У результаті:

    <li
        data-id="123"
        data-category="books"
    ></li>

---

# 19. Створення елемента через `dataset`

Замість:

    item.setAttribute("data-id", "123");

можна:

    item.dataset.id = "123";

Замість:

    item.setAttribute("data-user-name", "Valeriy");

можна:

    item.dataset.userName = "Valeriy";

---

# 20. Створення вкладеної структури

DOM-елементи можна створювати один за одним.

Наприклад, потрібно отримати:

    <div class="card">
        <h2>Product</h2>
        <p>Description</p>
        <button>Buy</button>
    </div>

JavaScript:

    const card = document.createElement("div");
    const title = document.createElement("h2");
    const description = document.createElement("p");
    const button = document.createElement("button");

    card.classList.add("card");

    title.textContent = "Product";
    description.textContent = "Description";
    button.textContent = "Buy";

    card.append(title);
    card.append(description);
    card.append(button);

Тепер `card` містить всю структуру.

---

# 21. Дерево DOM

У попередньому прикладі ми побудували:

    card
      │
      ├── title
      │
      ├── description
      │
      └── button

Тобто створення DOM — це фактично побудова дерева:

    parent
      ↓
    children
      ↓
    grandchildren

---

# 22. Створення списку

HTML:

    <ul id="users"></ul>

JavaScript:

    const list = document.querySelector("#users");

    const item1 = document.createElement("li");
    const item2 = document.createElement("li");
    const item3 = document.createElement("li");

    item1.textContent = "John";
    item2.textContent = "Anna";
    item3.textContent = "Peter";

    list.append(item1, item2, item3);

Результат:

    <ul id="users">
        <li>John</li>
        <li>Anna</li>
        <li>Peter</li>
    </ul>

---

# 23. Створення списку через масив

Це вже дуже важливий frontend-патерн.

Маємо дані:

    const users = [
        "John",
        "Anna",
        "Peter"
    ];

Створюємо UI:

    const list = document.querySelector("#users");

    users.forEach((user) => {
        const item = document.createElement("li");

        item.textContent = user;

        list.append(item);
    });

Модель:

    data
      ↓
    JavaScript
      ↓
    createElement()
      ↓
    DOM

Цей підхід дуже важливий для frontend-розробки.

---

# 24. Створення карток із масиву даних

Маємо:

    const products = [
        {
            name: "Laptop",
            price: 1000
        },
        {
            name: "Phone",
            price: 700
        },
        {
            name: "Tablet",
            price: 500
        }
    ];

HTML:

    <div id="products"></div>

JavaScript:

    const container = document.querySelector("#products");

    products.forEach((product) => {
        const card = document.createElement("div");
        const title = document.createElement("h2");
        const price = document.createElement("p");

        card.classList.add("card");

        title.textContent = product.name;
        price.textContent = `$${product.price}`;

        card.append(title, price);
        container.append(card);
    });

---

# 25. `append()`

Після створення елемент потрібно вставити в DOM.

Один із найзручніших методів:

    parent.append(child);

Наприклад:

    const container = document.querySelector("#app");
    const paragraph = document.createElement("p");

    paragraph.textContent = "Hello";

    container.append(paragraph);

---

# 26. `append()` може додавати декілька елементів

    const title = document.createElement("h2");
    const paragraph = document.createElement("p");
    const button = document.createElement("button");

    container.append(title, paragraph, button);

---

# 27. `append()` може додавати текст

Наприклад:

    container.append("Hello");

Або:

    container.append("Hello ", "World");

Але для створення HTML-структури краще використовувати DOM-елементи.

---

# 28. `appendChild()`

Існує старіший та широко відомий метод:

    parent.appendChild(child);

Наприклад:

    const paragraph = document.createElement("p");

    paragraph.textContent = "Hello";

    container.appendChild(paragraph);

---

# 29. `append()` vs `appendChild()`

| `append()` | `appendChild()` |
|---|---|
| Сучасний зручний API | Старіший API |
| Може приймати декілька аргументів | Приймає один вузол |
| Може додавати текст | Потрібен Node |
| Повертає `undefined` | Повертає доданий Node |

Наприклад:

    container.append(
        title,
        paragraph,
        button
    );

А через `appendChild()`:

    container.appendChild(title);
    container.appendChild(paragraph);
    container.appendChild(button);

Для сучасного коду часто зручно використовувати:

    append()

---

# 30. `prepend()`

`prepend()` додає елемент на початок.

    container.prepend(element);

Наприклад:

    const first = document.createElement("p");

    first.textContent = "First";

    container.prepend(first);

---

# 31. `append()` vs `prepend()`

    container.append(element);

додає в кінець.

    container.prepend(element);

додає на початок.

Наприклад:

    <div id="app">
        <p>Existing</p>
    </div>

Після:

    container.append(newElement);

отримаємо:

    <p>Existing</p>
    <p>New</p>

Після:

    container.prepend(newElement);

отримаємо:

    <p>New</p>
    <p>Existing</p>

---

# 32. Вставка перед конкретним елементом

Метод:

    parent.insertBefore(newElement, referenceElement);

Наприклад:

    const newItem = document.createElement("li");
    const referenceItem = document.querySelector(".second");

    list.insertBefore(newItem, referenceItem);

`newItem` буде вставлений перед `referenceItem`.

---

# 33. `before()` та `after()`

Сучасніший та зручніший синтаксис:

    referenceElement.before(newElement);

або:

    referenceElement.after(newElement);

Наприклад:

    const item = document.querySelector(".item");

    const newItem = document.createElement("li");

    newItem.textContent = "New item";

    item.before(newItem);

---

# 34. `before()` та `after()` — не обов'язково children

Це важлива різниця.

`append()`:

    parent
      └── child

`before()`:

    sibling
    reference

`after()`:

    reference
    sibling

Тобто:

    append()
        → всередину parent

    before()
        → перед element

    after()
        → після element

---

# 35. Створення Text Node

Можна створювати текстовий вузол:

    const text = document.createTextNode("Hello");

Потім:

    element.append(text);

Наприклад:

    const paragraph = document.createElement("p");

    const text = document.createTextNode("Hello!");

    paragraph.append(text);

На практиці частіше використовують:

    paragraph.textContent = "Hello!";

---

# 36. `textContent` — простий спосіб додати текст

Замість:

    const text = document.createTextNode("Hello");

    paragraph.append(text);

краще:

    paragraph.textContent = "Hello";

Для звичайного тексту це простіше та читабельніше.

---

# 37. Створення елементів без `innerHTML`

Одна з головних переваг `createElement()` — можна будувати DOM без вставки HTML-рядків.

Наприклад:

    const paragraph = document.createElement("p");

    paragraph.textContent = userName;

Це безпечніше для користувацьких даних, ніж:

    container.innerHTML = `<p>${userName}</p>`;

Якщо `userName` походить від користувача або зовнішнього джерела, вставка через `innerHTML` може створити XSS-ризик.

---

# 38. `createElement()` vs `innerHTML`

### `createElement()`

    const paragraph = document.createElement("p");

    paragraph.textContent = "Hello";

    container.append(paragraph);

Переваги:

- явна робота з DOM;
- безпечне додавання тексту через `textContent`;
- зручно для динамічної логіки;
- легко додавати event listeners;
- добре підходить для поетапної побудови DOM.

---

### `innerHTML`

    container.innerHTML = `
        <p>Hello</p>
    `;

Переваги:

- коротший код для невеликих HTML-фрагментів;
- зручно створювати статичну структуру.

Але потрібно бути обережним із неперевіреними даними.

---

# 39. `createElement()` + `addEventListener()`

Це одна з головних причин створювати елементи через DOM API.

Наприклад:

    const button = document.createElement("button");

    button.textContent = "Click";

    button.addEventListener("click", () => {
        console.log("Button clicked");
    });

    document.body.append(button);

Тепер динамічно створена кнопка має власну поведінку.

---

# 40. Створення списку з кнопкою

    const users = [
        "John",
        "Anna",
        "Peter"
    ];

    const list = document.querySelector("#users");

    users.forEach((user) => {
        const item = document.createElement("li");
        const button = document.createElement("button");

        item.textContent = user;
        button.textContent = "Delete";

        button.addEventListener("click", () => {
            item.remove();
        });

        item.append(button);
        list.append(item);
    });

Тут відбувається:

    data
      ↓
    create li
      ↓
    create button
      ↓
    add event
      ↓
    insert DOM

---

# 41. Створення складної структури

Наприклад, потрібно отримати:

    <article class="card">
        <h2>JavaScript</h2>
        <p>Programming language.</p>
        <a href="/javascript">Learn more</a>
    </article>

JavaScript:

    const article = document.createElement("article");
    const title = document.createElement("h2");
    const description = document.createElement("p");
    const link = document.createElement("a");

    article.classList.add("card");

    title.textContent = "JavaScript";

    description.textContent = "Programming language.";

    link.textContent = "Learn more";
    link.href = "/javascript";

    article.append(
        title,
        description,
        link
    );

---

# 42. Вкладені елементи

Можна будувати структуру поступово:

    const card = document.createElement("div");
    const header = document.createElement("div");
    const title = document.createElement("h2");
    const body = document.createElement("div");
    const text = document.createElement("p");

    title.textContent = "Title";
    text.textContent = "Description";

    header.append(title);
    body.append(text);

    card.append(header, body);

Структура:

    card
      │
      ├── header
      │     └── title
      │
      └── body
            └── text

---

# 43. Зручний патерн — функція створення елемента

Якщо однакова структура створюється багато разів, можна винести її в функцію.

Наприклад:

    function createUserItem(name) {
        const item = document.createElement("li");

        item.textContent = name;

        return item;
    }

Використання:

    const item = createUserItem("John");

    list.append(item);

---

# 44. Функція `createCard()`

    function createCard(product) {
        const card = document.createElement("article");
        const title = document.createElement("h2");
        const price = document.createElement("p");

        card.classList.add("card");

        title.textContent = product.name;
        price.textContent = `$${product.price}`;

        card.append(title, price);

        return card;
    }

Використання:

    products.forEach((product) => {
        const card = createCard(product);

        container.append(card);
    });

Це вже дуже близько до компонентного підходу.

---

# 45. Створення компонента

Можна мислити так:

    function createUserCard(user) {
        // create elements
        // configure elements
        // add events
        // return root element
    }

Наприклад:

    function createUserCard(user) {
        const card = document.createElement("article");
        const title = document.createElement("h2");
        const email = document.createElement("p");

        card.classList.add("user-card");

        title.textContent = user.name;
        email.textContent = user.email;

        card.append(title, email);

        return card;
    }

Потім:

    const card = createUserCard({
        name: "John",
        email: "john@example.com"
    });

    container.append(card);

---

# 46. Чому важливо повертати root element?

Функція:

    function createCard(product) {
        const card = document.createElement("article");

        // ...

        return card;
    }

повертає весь компонент.

Це дозволяє:

- вставити його в DOM;
- перемістити;
- видалити;
- змінити;
- додати event listener;
- використати в іншому компоненті.

---

# 47. `DocumentFragment`

Якщо потрібно створити багато елементів, можна використовувати:

    document.createDocumentFragment();

Наприклад:

    const fragment = document.createDocumentFragment();

    users.forEach((user) => {
        const item = document.createElement("li");

        item.textContent = user;

        fragment.append(item);
    });

    list.append(fragment);

`DocumentFragment` — це тимчасовий контейнер для DOM-вузлів.

---

# 48. Навіщо потрібен `DocumentFragment`?

Замість того щоб постійно працювати безпосередньо з DOM:

    list.append(item1);
    list.append(item2);
    list.append(item3);
    list.append(item4);

можна спочатку побудувати структуру:

    fragment
      ├── item1
      ├── item2
      ├── item3
      └── item4

а потім:

    list.append(fragment);

Це особливо корисно при масовому створенні DOM.

---

# 49. `DocumentFragment` — важлива деталь

Після:

    list.append(fragment);

сам `fragment` не залишається в DOM.

Його children переміщуються до `list`.

Тобто:

    fragment
        ↓
    children
        ↓
    list

---

# 50. Масове створення елементів

Приклад:

    const users = [
        "John",
        "Anna",
        "Peter",
        "Maria"
    ];

    const list = document.querySelector("#users");

    const fragment = document.createDocumentFragment();

    users.forEach((user) => {
        const item = document.createElement("li");

        item.textContent = user;

        fragment.append(item);
    });

    list.append(fragment);

---

# 51. Створення елемента з атрибутами, класами та подіями

Повний приклад:

    const button = document.createElement("button");

    button.type = "button";
    button.classList.add("btn");
    button.dataset.action = "save";
    button.textContent = "Save";

    button.addEventListener("click", () => {
        console.log("Saved");
    });

    document.body.append(button);

Це типовий процес:

    create
      ↓
    attributes
      ↓
    classes
      ↓
    text
      ↓
    events
      ↓
    append

---

# 52. Створення DOM із даних

Один із найважливіших frontend-патернів:

    const products = [
        {
            id: 1,
            name: "Laptop",
            price: 1000
        },
        {
            id: 2,
            name: "Phone",
            price: 700
        }
    ];

JavaScript перетворює:

    data

на:

    DOM

Тобто:

    products
        ↓
    createElement()
        ↓
    configure elements
        ↓
    append()
        ↓
    UI

Це фундаментальний принцип роботи сучасного frontend.

---

# 53. `createElement()` і React

Важливо розуміти зв'язок із React.

У vanilla JavaScript ми можемо писати:

    const title = document.createElement("h2");

    title.textContent = "Hello";

    container.append(title);

У React ми описуємо:

    <h2>Hello</h2>

React сам керує створенням та оновленням DOM.

Тому вивчення:

    createElement()
    append()
    textContent
    classList
    attributes
    events

дуже корисне для розуміння того, що відбувається під React-компонентами.

---

# 54. Створення елемента та `cloneNode()`

Іноді замість створення нового елемента можна клонувати існуючий.

Наприклад:

    const original = document.querySelector(".card");

    const copy = original.cloneNode(true);

    container.append(copy);

`true` означає:

    clone children too

---

# 55. `cloneNode(false)` vs `cloneNode(true)`

Без аргументу або з `false`:

    const copy = element.cloneNode(false);

Копіюється тільки сам елемент.

З `true`:

    const copy = element.cloneNode(true);

Копіюється елемент разом із дочірніми вузлами.

---

# 56. `createElement()` vs `cloneNode()`

### `createElement()`

Коли потрібно створити нову структуру:

    const card = document.createElement("div");

### `cloneNode()`

Коли вже існує готовий шаблон:

    const copy = template.cloneNode(true);

---

# 57. `<template>`

Для складніших структур HTML має спеціальний елемент:

    <template>

Наприклад:

    <template id="card-template">
        <article class="card">
            <h2 class="title"></h2>
            <p class="description"></p>
        </article>
    </template>

Потім JavaScript може клонувати template:

    const template = document.querySelector("#card-template");

    const clone = template.content.cloneNode(true);

    container.append(clone);

`<template>` особливо корисний для складних HTML-шаблонів.

---

# 58. `createElement()` + `style`

Після створення елемента можна встановити стилі:

    const box = document.createElement("div");

    box.style.width = "200px";
    box.style.height = "100px";
    box.style.backgroundColor = "blue";

Але для постійного дизайну краще:

    box.classList.add("box");

і описати стилі в CSS.

---

# 59. `createElement()` + `classList`

Рекомендований підхід:

    const card = document.createElement("article");

    card.classList.add("card");

    const title = document.createElement("h2");

    title.classList.add("card-title");

    title.textContent = "JavaScript";

    card.append(title);

Це підтримує розділення:

    JavaScript → структура та поведінка

    CSS → оформлення

---

# 60. `createElement()` + attributes

Наприклад, створення посилання:

    const link = document.createElement("a");

    link.href = "/about";
    link.textContent = "About";
    link.classList.add("nav-link");

    navigation.append(link);

---

# 61. Створення form elements

Наприклад:

    const label = document.createElement("label");
    const input = document.createElement("input");

    label.textContent = "Email";

    input.type = "email";
    input.name = "email";
    input.placeholder = "Enter email";

    form.append(label, input);

---

# 62. Створення checkbox

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.name = "agreement";

Можна встановити:

    checkbox.checked = true;

---

# 63. Створення `select`

    const select = document.createElement("select");

    const option1 = document.createElement("option");
    const option2 = document.createElement("option");

    option1.value = "js";
    option1.textContent = "JavaScript";

    option2.value = "ts";
    option2.textContent = "TypeScript";

    select.append(option1, option2);

---

# 64. Створення таблиці

Наприклад:

    const table = document.createElement("table");
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.textContent = "JavaScript";

    row.append(cell);
    table.append(row);

---

# 65. Важлива різниця: створити vs вставити

Це потрібно чітко розділяти.

### Створити:

    const button = document.createElement("button");

### Налаштувати:

    button.textContent = "Click";
    button.classList.add("btn");

### Вставити:

    container.append(button);

Три різні операції:

    CREATE
      ↓
    CONFIGURE
      ↓
    INSERT

---

# 66. Важлива різниця: DOM-об'єкт vs HTML

Після:

    const button = document.createElement("button");

`button` — це **DOM-об'єкт**, а не просто HTML-рядок.

Можна виконувати:

    button.textContent = "Click";

    button.classList.add("btn");

    button.addEventListener("click", handler);

    button.setAttribute("data-id", "123");

Це одна з ключових ідей DOM API.

---

# 67. Часті помилки

## ❌ Помилка 1 — забули додати елемент

    const paragraph = document.createElement("p");

    paragraph.textContent = "Hello";

Елемент створено, але він не буде видно.

Потрібно:

    container.append(paragraph);

---

## ❌ Помилка 2 — неправильний tag name

Правильно:

    document.createElement("div");

    document.createElement("button");

    document.createElement("section");

Не потрібно передавати HTML:

    document.createElement("<div>");

`createElement()` очікує назву тегу.

---

## ❌ Помилка 3 — використовують `innerHTML` для тексту

Якщо потрібно просто додати текст:

    element.textContent = userInput;

краще, ніж:

    element.innerHTML = userInput;

Особливо коли дані походять від користувача.

---

## ❌ Помилка 4 — створюють елементи всередині циклу без потреби

Для великих списків можна використовувати:

    DocumentFragment

Наприклад:

    const fragment = document.createDocumentFragment();

    items.forEach((item) => {
        const element = document.createElement("li");

        element.textContent = item;

        fragment.append(element);
    });

    list.append(fragment);

---

## ❌ Помилка 5 — змішують створення та бізнес-логіку

Погано:

    users.forEach((user) => {
        // 100 рядків логіки
        // створення DOM
        // форматування
        // API
        // database logic
    });

Краще розділяти:

    fetchData()
        ↓
    prepareData()
        ↓
    createUserElement()
        ↓
    render()

---

# 68. Практичний патерн `create → configure → append`

Запам'ятай:

    const element = document.createElement("div");

    element.classList.add("card");
    element.textContent = "Hello";

    container.append(element);

Або для складнішого компонента:

    const card = document.createElement("article");
    const title = document.createElement("h2");
    const text = document.createElement("p");

    card.classList.add("card");

    title.textContent = "Title";
    text.textContent = "Description";

    card.append(title, text);

    container.append(card);

---

# 69. Практичний патерн `data → render`

Маємо:

    const users = [
        {
            id: 1,
            name: "John"
        },
        {
            id: 2,
            name: "Anna"
        }
    ];

Створюємо функцію:

    function createUserElement(user) {
        const item = document.createElement("li");

        item.dataset.id = user.id;
        item.textContent = user.name;

        return item;
    }

Потім:

    users.forEach((user) => {
        const element = createUserElement(user);

        list.append(element);
    });

Це вже хороша основа для розуміння `render()` у frontend.

---

# 70. Практична вправа №1 — Create Paragraph

HTML:

    <div id="app"></div>

Створи через JavaScript:

    <p>Hello JavaScript!</p>

Алгоритм:

    querySelector()
        ↓
    createElement("p")
        ↓
    textContent
        ↓
    append()

---

# 71. Практична вправа №2 — Create Button

Створи кнопку:

    <button>Click me</button>

Після створення:

- додай клас `btn`;
- додай текст;
- додай `click` event;
- при натисканні виведи повідомлення в console.

---

# 72. Практична вправа №3 — Create List

Маємо:

    const languages = [
        "JavaScript",
        "TypeScript",
        "Python",
        "SQL"
    ];

Створи:

    <ul>
        <li>JavaScript</li>
        <li>TypeScript</li>
        <li>Python</li>
        <li>SQL</li>
    </ul>

через:

    createElement()
    textContent
    append()

---

# 73. Практична вправа №4 — User Cards

Маємо:

    const users = [
        {
            name: "John",
            email: "john@example.com"
        },
        {
            name: "Anna",
            email: "anna@example.com"
        }
    ];

Для кожного користувача створи:

    <article class="user-card">
        <h2>Name</h2>
        <p>Email</p>
    </article>

---

# 74. Практична вправа №5 — Delete Button

Для кожного user card додай:

    <button>Delete</button>

При натисканні картка повинна видалятися.

Підказка:

    element.remove();

---

# 75. Практична вправа №6 — Product List

Маємо:

    const products = [
        {
            name: "Laptop",
            price: 1000
        },
        {
            name: "Phone",
            price: 700
        },
        {
            name: "Tablet",
            price: 500
        }
    ];

Створи картки для кожного продукту.

Кожна картка повинна мати:

    name
    price
    Buy button

---

# 76. Практична вправа №7 — Function Component

Створи функцію:

    createProductCard(product)

Вона повинна:

    1. створити article;
    2. створити h2;
    3. створити p;
    4. створити button;
    5. налаштувати текст;
    6. додати клас;
    7. додати event listener;
    8. повернути article.

Потім:

    products.forEach((product) => {
        container.append(
            createProductCard(product)
        );
    });

---

# 77. Практична вправа №8 — DocumentFragment

Створи список із:

    100

елементів.

Використай:

    document.createDocumentFragment();

Структура:

    data
      ↓
    fragment
      ↓
    100 li
      ↓
    append(fragment)

---

# 78. Практична вправа №9 — Dynamic DOM App

Створи маленький застосунок:

    Input
    Add button
    List

Користувач вводить текст:

    Learn JavaScript

натискає:

    Add

і JavaScript створює:

    <li>
        Learn JavaScript
        <button>Delete</button>
    </li>

Це вже хороша практична вправа на:

    createElement()
    textContent
    classList
    append()
    addEventListener()
    remove()

---

# 79. Практична вправа №10 — Mini Todo

Створи Todo List.

Дані:

    const todos = [
        {
            id: 1,
            title: "Learn JavaScript",
            completed: false
        },
        {
            id: 2,
            title: "Practice DOM",
            completed: true
        }
    ];

Для кожного Todo створюй:

    <li>
        <span>Task</span>
        <button>Delete</button>
    </li>

Якщо:

    completed === true

додай:

    completed

CSS-клас.

Ця вправа поєднує:

    data
    ↓
    createElement
    ↓
    classList
    ↓
    events
    ↓
    DOM

---

# 80. Питання для співбесіди

## Junior

### 1. Для чого потрібен `document.createElement()`?

Для створення нового DOM-елемента.

---

### 2. Чи додає `createElement()` елемент автоматично на сторінку?

Ні.

Потрібно окремо вставити його в DOM:

    container.append(element);

---

### 3. Як створити `div`?

    const div = document.createElement("div");

---

### 4. Як додати текст створеному елементу?

    element.textContent = "Hello";

---

### 5. Як додати клас?

    element.classList.add("active");

---

### 6. Як додати атрибут?

    element.setAttribute("data-id", "123");

або для стандартних властивостей:

    element.id = "user";

---

### 7. Як додати створений елемент у DOM?

    parent.append(element);

---

### 8. Чим `append()` відрізняється від `prepend()`?

`append()` додає в кінець children.

`prepend()` додає на початок children.

---

## Middle

### 9. Чим `append()` відрізняється від `appendChild()`?

`append()` може приймати декілька вузлів і рядки.

`appendChild()` приймає один Node.

---

### 10. Що таке `DocumentFragment`?

Це тимчасовий контейнер для DOM-вузлів, який зручно використовувати при масовому створенні DOM.

---

### 11. Чому `textContent` часто безпечніший за `innerHTML`?

`textContent` вставляє значення як текст і не інтерпретує його як HTML.

---

### 12. Коли використовувати `createElement()`, а коли `innerHTML`?

`createElement()` зручний для програмного створення DOM, роботи з подіями та складною логікою.

`innerHTML` зручний для простих HTML-фрагментів, але з неперевіреними даними потрібно бути обережним.

---

### 13. Як створити DOM-компонент через функцію?

Наприклад:

    function createCard(data) {
        const card = document.createElement("article");

        // configure

        return card;
    }

---

### 14. Чому корисно повертати root element із `create...()` функції?

Тому що компонент можна:

- вставити;
- перемістити;
- видалити;
- змінити;
- передати іншому коду.

---

### 15. Який загальний алгоритм створення DOM?

    create
      ↓
    configure
      ↓
    append

---

# 81. Рівні володіння

## 🟢 Core

Потрібно вміти:

    document.createElement()

    textContent

    classList.add()

    setAttribute()

    append()

    prepend()

Розуміти:

    create ≠ insert

---

## 🟡 Junior

Потрібно вміти:

- створювати списки;
- створювати картки;
- створювати кнопки;
- додавати події;
- створювати DOM із масиву даних;
- використовувати `append()`;
- використовувати `before()` / `after()`;
- використовувати `remove()`.

---

## 🟠 Middle

Потрібно розуміти:

    data
      ↓
    render
      ↓
    DOM

і вміти:

- створювати DOM через функції;
- будувати reusable components;
- працювати з `DocumentFragment`;
- працювати з `<template>`;
- використовувати `dataset`;
- відокремлювати data logic від rendering logic;
- створювати динамічний UI.

---

## 🔴 Senior

Потрібно розуміти:

- DOM tree;
- rendering;
- layout;
- reflow;
- repaint;
- DOM manipulation costs;
- batching;
- `DocumentFragment`;
- event delegation;
- component architecture;
- separation of concerns;
- rendering patterns.

Вміти будувати архітектуру:

    API / Data
         ↓
    State
         ↓
    Render
         ↓
    DOM
         ↓
    Events
         ↓
    State update
         ↓
    Render

---

# 82. Міні-шпаргалка

    // CREATE
    const element = document.createElement("div");

    // TEXT
    element.textContent = "Hello";

    // CLASS
    element.classList.add("box");

    // ID
    element.id = "main";

    // ATTRIBUTE
    element.setAttribute("data-id", "123");

    // DATA ATTRIBUTE
    element.dataset.id = "123";

    // STYLE
    element.style.color = "red";

    // EVENT
    element.addEventListener("click", () => {
        console.log("Clicked");
    });

    // APPEND
    parent.append(element);

    // PREPEND
    parent.prepend(element);

    // BEFORE
    reference.before(element);

    // AFTER
    reference.after(element);

    // REMOVE
    element.remove();

    // DOCUMENT FRAGMENT
    const fragment = document.createDocumentFragment();

    fragment.append(element);

    parent.append(fragment);

    // TEXT NODE
    const text = document.createTextNode("Hello");

    // CLONE
    const copy = element.cloneNode(true);

---

# 83. Найважливіший патерн

Запам'ятай цей алгоритм:

    // 1. CREATE
    const card = document.createElement("article");

    // 2. CONFIGURE
    card.classList.add("card");

    // 3. CREATE CHILDREN
    const title = document.createElement("h2");
    const text = document.createElement("p");

    // 4. CONFIGURE CHILDREN
    title.textContent = "JavaScript";
    text.textContent = "Learn DOM";

    // 5. BUILD TREE
    card.append(title, text);

    // 6. INSERT
    container.append(card);

Це базова схема ручного створення DOM.

---

# 84. Головне

`document.createElement()` створює новий DOM-елемент.

Але створити елемент — **не означає вставити його на сторінку**.

Основний процес:

    createElement()
        ↓
    configure
        ↓
    append()
        ↓
    DOM

Для тексту:

    element.textContent = "Hello";

Для класів:

    element.classList.add("card");

Для атрибутів:

    element.setAttribute("data-id", "123");

Для подій:

    element.addEventListener("click", handler);

Для вставки:

    parent.append(element);

Для масового створення:

    DocumentFragment

Для повторюваних компонентів:

    createCard(data)
    createUser(data)
    createTodo(data)

---

# 85. Модель у голові

Найважливіше, що потрібно винести з цієї теми:

    DATA
      │
      ↓
    createElement()
      │
      ↓
    configure
      │
      ├── textContent
      ├── classList
      ├── attributes
      ├── dataset
      ├── style
      └── events
      │
      ↓
    BUILD DOM TREE
      │
      ↓
    append()
      │
      ↓
    UI

І особливо запам'ятай:

    createElement()
        → створити

    textContent
        → текст

    classList
        → CSS-стан / класи

    setAttribute()
        → атрибути

    addEventListener()
        → поведінка

    append()
        → вставити

    DocumentFragment
        → підготувати багато DOM-вузлів

    createCard(data)
        → перетворити дані на UI

Це одна з фундаментальних тем vanilla JavaScript, тому що саме тут починається перехід від простого маніпулювання готовим HTML до **програмного створення інтерфейсу з даних**.