# 08. Insert Elements у DOM

## 📌 Що таке вставка елементів у DOM?

Після створення DOM-елемента через:

    document.createElement()

його потрібно **вставити в DOM**, щоб він став частиною сторінки.

Наприклад:

    const paragraph = document.createElement("p");

    paragraph.textContent = "Hello";

Елемент створений, але ще не вставлений.

Для вставки використовуються:

    append()
    prepend()
    before()
    after()
    appendChild()
    insertBefore()

Також існують способи вставки HTML:

    insertAdjacentHTML()
    insertAdjacentElement()
    insertAdjacentText()

Основна модель:

    CREATE
      ↓
    CONFIGURE
      ↓
    INSERT
      ↓
    DOM

---

# 1. `append()`

`append()` додає вузол або текст **у кінець дочірніх елементів**.

Синтаксис:

    parent.append(child);

Наприклад:

    const container = document.querySelector("#app");

    const paragraph = document.createElement("p");

    paragraph.textContent = "Hello";

    container.append(paragraph);

Результат:

    <div id="app">
        <p>Hello</p>
    </div>

---

# 2. `append()` додає в кінець

Було:

    <div id="app">
        <p>First</p>
        <p>Second</p>
    </div>

JavaScript:

    const third = document.createElement("p");

    third.textContent = "Third";

    app.append(third);

Результат:

    <div id="app">
        <p>First</p>
        <p>Second</p>
        <p>Third</p>
    </div>

---

# 3. `append()` може додавати декілька елементів

Це одна з переваг `append()`.

    const title = document.createElement("h2");
    const paragraph = document.createElement("p");
    const button = document.createElement("button");

    title.textContent = "Title";
    paragraph.textContent = "Description";
    button.textContent = "Open";

    container.append(
        title,
        paragraph,
        button
    );

Результат:

    <div>
        <h2>Title</h2>
        <p>Description</p>
        <button>Open</button>
    </div>

---

# 4. `append()` може додавати текст

Наприклад:

    container.append("Hello");

Можна навіть декілька значень:

    container.append(
        "Hello ",
        "World"
    );

Але для створення структурованого DOM зазвичай використовують DOM-елементи:

    const paragraph = document.createElement("p");

    paragraph.textContent = "Hello";

    container.append(paragraph);

---

# 5. `append()` повертає `undefined`

Наприклад:

    const result = container.append(paragraph);

    console.log(result);
    // undefined

Якщо потрібно отримати створений елемент, краще зберігати його в змінній:

    const paragraph = document.createElement("p");

    container.append(paragraph);

    console.log(paragraph);

---

# 6. `prepend()`

`prepend()` додає елемент **на початок дочірніх елементів**.

Синтаксис:

    parent.prepend(child);

Наприклад:

    const message = document.createElement("p");

    message.textContent = "New message";

    container.prepend(message);

---

# 7. `append()` vs `prepend()`

Було:

    <div id="app">
        <p>Existing</p>
    </div>

Після:

    container.append(newElement);

отримаємо:

    <div id="app">
        <p>Existing</p>
        <p>New</p>
    </div>

Після:

    container.prepend(newElement);

отримаємо:

    <div id="app">
        <p>New</p>
        <p>Existing</p>
    </div>

Запам'ятай:

    append()
        → кінець

    prepend()
        → початок

---

# 8. `before()`

`before()` вставляє вузол **перед конкретним елементом**.

Синтаксис:

    element.before(newElement);

Наприклад:

    const current = document.querySelector(".current");

    const newElement = document.createElement("p");

    newElement.textContent = "Before";

    current.before(newElement);

Було:

    <p class="current">Current</p>

Стало:

    <p>Before</p>
    <p class="current">Current</p>

---

# 9. `after()`

`after()` вставляє вузол **після конкретного елемента**.

Синтаксис:

    element.after(newElement);

Наприклад:

    const current = document.querySelector(".current");

    const newElement = document.createElement("p");

    newElement.textContent = "After";

    current.after(newElement);

Було:

    <p class="current">Current</p>

Стало:

    <p class="current">Current</p>
    <p>After</p>

---

# 10. `before()` та `after()` можуть додавати декілька елементів

    current.before(
        element1,
        element2
    );

або:

    current.after(
        element1,
        element2
    );

---

# 11. Порівняння `append`, `prepend`, `before`, `after`

Уявімо:

    <div id="parent">
        <p id="target">Target</p>
    </div>

### `append()`

    parent.append(element);

Результат:

    <div id="parent">
        <p id="target">Target</p>
        <p>New</p>
    </div>

---

### `prepend()`

    parent.prepend(element);

Результат:

    <div id="parent">
        <p>New</p>
        <p id="target">Target</p>
    </div>

---

### `before()`

    target.before(element);

Результат:

    <div id="parent">
        <p>New</p>
        <p id="target">Target</p>
    </div>

---

### `after()`

    target.after(element);

Результат:

    <div id="parent">
        <p id="target">Target</p>
        <p>New</p>
    </div>

---

# 12. Головна різниця

`append()` і `prepend()` працюють із **children батьківського елемента**.

    parent
      ├── child
      └── child

`before()` і `after()` працюють із **позицією відносно конкретного елемента**.

    sibling
    target
    sibling

Тому:

    append()
        → всередину parent, у кінець

    prepend()
        → всередину parent, на початок

    before()
        → перед target

    after()
        → після target

---

# 13. `appendChild()`

Старіший DOM API:

    parent.appendChild(child);

Наприклад:

    const paragraph = document.createElement("p");

    paragraph.textContent = "Hello";

    container.appendChild(paragraph);

---

# 14. `append()` vs `appendChild()`

Обидва методи можуть додати DOM-вузол:

    container.append(element);

    container.appendChild(element);

Але між ними є відмінності.

| `append()` | `appendChild()` |
|---|---|
| Сучасний зручний API | Старіший DOM API |
| Може приймати декілька аргументів | Приймає один Node |
| Може додавати рядок | Приймає Node |
| Повертає `undefined` | Повертає доданий Node |

Наприклад:

    container.append(
        title,
        paragraph,
        button
    );

Через `appendChild()`:

    container.appendChild(title);
    container.appendChild(paragraph);
    container.appendChild(button);

Для нового коду часто зручно використовувати:

    append()

Але `appendChild()` потрібно добре знати, тому що він часто зустрічається у старому коді, документації та співбесідах.

---

# 15. `appendChild()` повертає елемент

Наприклад:

    const paragraph = document.createElement("p");

    const result = container.appendChild(paragraph);

    console.log(result === paragraph);
    // true

Це відрізняється від:

    container.append(paragraph);

де результат:

    undefined

---

# 16. `insertBefore()`

`insertBefore()` дозволяє вставити елемент перед конкретним child.

Синтаксис:

    parent.insertBefore(
        newElement,
        referenceElement
    );

Наприклад:

    const newItem = document.createElement("li");
    const referenceItem = document.querySelector(".second");

    newItem.textContent = "New";

    list.insertBefore(
        newItem,
        referenceItem
    );

---

# 17. `insertBefore()` — структура

Є:

    parent
      │
      ├── first
      ├── second
      └── third

Виконуємо:

    parent.insertBefore(newElement, second);

Отримаємо:

    parent
      │
      ├── first
      ├── newElement
      ├── second
      └── third

---

# 18. `insertBefore()` vs `before()`

Сучасніший і коротший варіант:

    reference.before(newElement);

Старіший DOM API:

    parent.insertBefore(
        newElement,
        reference
    );

Обидва дозволяють вставити елемент перед reference.

---

# 19. Вставка після елемента через `insertBefore()`

У `Node` немає методу:

    insertAfter()

Тому для вставки після конкретного елемента можна використати:

    reference.after(newElement);

Або старий підхід:

    parent.insertBefore(
        newElement,
        reference.nextSibling
    );

Але:

    after()

значно простіший.

---

# 20. Якщо `referenceElement` дорівнює `null`

Це важлива особливість `insertBefore()`.

Наприклад:

    parent.insertBefore(
        newElement,
        null
    );

У такому випадку елемент буде вставлений у кінець.

Фактично:

    parent.insertBefore(newElement, null);

працює подібно до:

    parent.append(newElement);

---

# 21. Вставка HTML: `insertAdjacentHTML()`

Іноді потрібно вставити не готовий DOM-елемент, а HTML-рядок.

Для цього існує:

    element.insertAdjacentHTML(
        position,
        html
    );

Наприклад:

    container.insertAdjacentHTML(
        "beforeend",
        "<p>Hello</p>"
    );

---

# 22. Позиції `insertAdjacentHTML()`

Метод має чотири основні позиції:

    "beforebegin"
    "afterbegin"
    "beforeend"
    "afterend"

Їх потрібно добре запам'ятати.

---

# 23. `beforebegin`

HTML вставляється **перед самим елементом**.

Було:

    <div id="box">
        Content
    </div>

JavaScript:

    box.insertAdjacentHTML(
        "beforebegin",
        "<p>Before</p>"
    );

Результат:

    <p>Before</p>

    <div id="box">
        Content
    </div>

---

# 24. `afterbegin`

HTML вставляється **всередину елемента, на початок**.

Було:

    <div id="box">
        Content
    </div>

JavaScript:

    box.insertAdjacentHTML(
        "afterbegin",
        "<p>First</p>"
    );

Результат:

    <div id="box">
        <p>First</p>
        Content
    </div>

---

# 25. `beforeend`

HTML вставляється **всередину елемента, в кінець**.

    box.insertAdjacentHTML(
        "beforeend",
        "<p>Last</p>"
    );

Результат:

    <div id="box">
        Content
        <p>Last</p>
    </div>

Це один із найчастіше використовуваних варіантів.

---

# 26. `afterend`

HTML вставляється **після самого елемента**.

    box.insertAdjacentHTML(
        "afterend",
        "<p>After</p>"
    );

Результат:

    <div id="box">
        Content
    </div>

    <p>After</p>

---

# 27. Візуальна схема `insertAdjacentHTML()`

Для:

    <div id="box">
        Content
    </div>

позиції:

    beforebegin

означає:

    BEFORE
    ↓
    <div>
        Content
    </div>

---

    afterbegin

означає:

    <div>
        ↓
        FIRST CHILD
        Content
    </div>

---

    beforeend

означає:

    <div>
        Content
        ↓
        LAST CHILD
    </div>

---

    afterend

означає:

    <div>
        Content
    </div>
    ↓
    AFTER

---

# 28. Найважливіша схема

Запам'ятай:

    beforebegin
        → перед element

    afterbegin
        → всередині element, початок

    beforeend
        → всередині element, кінець

    afterend
        → після element

Або коротко:

    BEFORE
    ┌───────────────────────┐
    │ afterbegin             │
    │                        │
    │      CONTENT           │
    │                        │
    │ beforeend              │
    └───────────────────────┘
    AFTER

---

# 29. `insertAdjacentElement()`

Можна вставляти не HTML-рядок, а готовий DOM-елемент.

Синтаксис:

    element.insertAdjacentElement(
        position,
        newElement
    );

Наприклад:

    const paragraph = document.createElement("p");

    paragraph.textContent = "Hello";

    box.insertAdjacentElement(
        "beforeend",
        paragraph
    );

---

# 30. `insertAdjacentText()`

Можна вставити текст:

    element.insertAdjacentText(
        position,
        text
    );

Наприклад:

    box.insertAdjacentText(
        "beforeend",
        "Hello"
    );

Але для звичайного тексту часто простіше використовувати:

    element.textContent = "Hello";

або:

    element.append("Hello");

---

# 31. `insertAdjacentHTML()` vs `createElement()`

### `createElement()`

    const paragraph = document.createElement("p");

    paragraph.textContent = "Hello";

    container.append(paragraph);

Тут ми створюємо DOM-елемент.

---

### `insertAdjacentHTML()`

    container.insertAdjacentHTML(
        "beforeend",
        "<p>Hello</p>"
    );

Тут ми вставляємо HTML-рядок.

---

# 32. Коли використовувати `insertAdjacentHTML()`?

Він зручний, коли потрібно швидко вставити невеликий HTML-фрагмент.

Наприклад:

    container.insertAdjacentHTML(
        "beforeend",
        `
            <article class="card">
                <h2>JavaScript</h2>
                <p>Programming language</p>
            </article>
        `
    );

Але потрібно пам'ятати про безпеку при роботі з неперевіреними даними.

---

# 33. Небезпечна вставка HTML

Не варто робити:

    const userName = userInput.value;

    container.insertAdjacentHTML(
        "beforeend",
        `<p>${userName}</p>`
    );

Якщо `userName` містить HTML або JavaScript-код, він може бути інтерпретований браузером як HTML.

Для звичайного користувацького тексту краще:

    const paragraph = document.createElement("p");

    paragraph.textContent = userName;

    container.append(paragraph);

---

# 34. Безпечніший варіант

    const userName = userInput.value;

    const paragraph = document.createElement("p");

    paragraph.textContent = userName;

    container.append(paragraph);

Тут значення додається як текст, а не як HTML.

---

# 35. `innerHTML` vs `insertAdjacentHTML()`

Обидва працюють із HTML-рядками.

### `innerHTML`

    container.innerHTML += `
        <p>Hello</p>
    `;

### `insertAdjacentHTML()`

    container.insertAdjacentHTML(
        "beforeend",
        "<p>Hello</p>"
    );

`insertAdjacentHTML()` зручний тим, що вставляє HTML у вказану позицію і не вимагає переприсвоювання всього `innerHTML`.

---

# 36. Важлива відмінність від `innerHTML`

При:

    container.innerHTML = "...";

вміст елемента перепризначається.

При:

    container.insertAdjacentHTML(
        "beforeend",
        "..."
    );

новий HTML вставляється в потрібну позицію, не замінюючи існуючий вміст контейнера.

---

# 37. Практичний приклад — додавання повідомлення

HTML:

    <div id="messages"></div>

JavaScript:

    const messages = document.querySelector("#messages");

    messages.insertAdjacentHTML(
        "beforeend",
        "<p>New message</p>"
    );

Кожен виклик додасть новий `<p>` в кінець.

---

# 38. Практичний приклад — додавання нового елемента списку

    const list = document.querySelector("#users");

    list.insertAdjacentHTML(
        "beforeend",
        "<li>John</li>"
    );

Потім:

    list.insertAdjacentHTML(
        "beforeend",
        "<li>Anna</li>"
    );

Результат:

    <ul id="users">
        <li>John</li>
        <li>Anna</li>
    </ul>

---

# 39. Практичний приклад — prepend через `insertAdjacentHTML()`

Замість:

    list.prepend(item);

для HTML-рядка:

    list.insertAdjacentHTML(
        "afterbegin",
        "<li>First</li>"
    );

Тобто:

    prepend()
        ≈
    insertAdjacentHTML("afterbegin", ...)

---

# 40. Практичний приклад — append через `insertAdjacentHTML()`

    list.insertAdjacentHTML(
        "beforeend",
        "<li>Last</li>"
    );

Тобто:

    append()
        ≈
    insertAdjacentHTML("beforeend", ...)

Але це не повна еквівалентність, тому що один API працює з Node, а інший — з HTML-рядком.

---

# 41. Переміщення існуючого елемента

Це дуже важлива властивість DOM.

Якщо вставити вже існуючий елемент в інше місце, він **переміститься**, а не скопіюється.

Наприклад:

    const item = document.querySelector(".item");
    const newContainer = document.querySelector(".new-container");

    newContainer.append(item);

Елемент:

    item

буде переміщений до:

    newContainer

---

# 42. DOM Node не копіюється автоматично

Було:

    <div id="first">
        <p id="item">Hello</p>
    </div>

    <div id="second"></div>

JavaScript:

    const item = document.querySelector("#item");
    const second = document.querySelector("#second");

    second.append(item);

Результат:

    <div id="first"></div>

    <div id="second">
        <p id="item">Hello</p>
    </div>

Елемент перемістився.

---

# 43. Як зробити копію?

Для копіювання:

    const copy = item.cloneNode(true);

    second.append(copy);

Тепер існують два елементи.

---

# 44. `cloneNode()`

Синтаксис:

    element.cloneNode(deep);

Наприклад:

    const copy = element.cloneNode(true);

`true` означає:

    copy children

`false`:

    copy only the element

---

# 45. `append()` + переміщення

Цей принцип часто використовується для зміни DOM-структури.

Наприклад:

    const item = document.querySelector(".item");
    const list = document.querySelector(".new-list");

    list.append(item);

Елемент переміститься.

Це дозволяє:

- сортувати елементи;
- переносити елементи між контейнерами;
- змінювати порядок;
- реалізовувати drag-and-drop логіку.

---

# 46. Створення списку та вставка

Маємо:

    const users = [
        "John",
        "Anna",
        "Peter"
    ];

Створюємо:

    const list = document.querySelector("#users");

    users.forEach((user) => {
        const item = document.createElement("li");

        item.textContent = user;

        list.append(item);
    });

Тут:

    createElement()
        ↓
    textContent
        ↓
    append()

---

# 47. Вставка на початок списку

Наприклад, нові повідомлення повинні з'являтися зверху:

    function addMessage(text) {
        const message = document.createElement("li");

        message.textContent = text;

        list.prepend(message);
    }

Тепер кожне нове повідомлення буде першим.

---

# 48. Вставка перед конкретним item

Наприклад:

    const newItem = document.createElement("li");

    newItem.textContent = "New";

    const secondItem = list.querySelector(
        ".second"
    );

    secondItem.before(newItem);

Це зручно, коли потрібно вставити елемент у конкретне місце.

---

# 49. Вставка після конкретного item

    const newItem = document.createElement("li");

    newItem.textContent = "New";

    const secondItem = list.querySelector(
        ".second"
    );

    secondItem.after(newItem);

---

# 50. Практичний приклад — Todo List

HTML:

    <input id="todoInput">
    <button id="addButton">Add</button>

    <ul id="todoList"></ul>

JavaScript:

    const input = document.querySelector("#todoInput");
    const button = document.querySelector("#addButton");
    const list = document.querySelector("#todoList");

    button.addEventListener("click", () => {
        const text = input.value.trim();

        if (!text) {
            return;
        }

        const item = document.createElement("li");

        item.textContent = text;

        list.append(item);

        input.value = "";
    });

Алгоритм:

    input
      ↓
    value
      ↓
    createElement()
      ↓
    textContent
      ↓
    append()
      ↓
    DOM

---

# 51. Todo List — додавання нових задач зверху

Якщо потрібно, щоб нова задача з'являлася першою:

    list.prepend(item);

замість:

    list.append(item);

---

# 52. Todo List — вставка перед останнім

Можна використати:

    const lastItem = list.lastElementChild;

    lastItem.before(item);

Але якщо потрібно просто додати в кінець:

    list.append(item);

буде значно простіше.

---

# 53. `DocumentFragment` + вставка

При створенні великої кількості елементів:

    const fragment = document.createDocumentFragment();

    users.forEach((user) => {
        const item = document.createElement("li");

        item.textContent = user;

        fragment.append(item);
    });

    list.append(fragment);

Тут:

    fragment

тимчасово містить створені елементи.

Після:

    list.append(fragment);

вони потрапляють у DOM.

---

# 54. Чому `DocumentFragment` зручний?

Замість:

    list.append(item1);
    list.append(item2);
    list.append(item3);
    list.append(item4);

можна:

    fragment.append(item1);
    fragment.append(item2);
    fragment.append(item3);
    fragment.append(item4);

і потім:

    list.append(fragment);

Це зручно для побудови великої DOM-структури перед її вставкою.

---

# 55. Практичний патерн `renderList()`

Можна створити функцію:

    function renderList(items) {
        const fragment = document.createDocumentFragment();

        items.forEach((item) => {
            const li = document.createElement("li");

            li.textContent = item;

            fragment.append(li);
        });

        list.append(fragment);
    }

Використання:

    renderList([
        "JavaScript",
        "TypeScript",
        "React"
    ]);

---

# 56. Повне порівняння методів вставки

| Метод | Куди вставляє | Що вставляє |
|---|---|---|
| `append()` | у кінець children | Node / text |
| `prepend()` | на початок children | Node / text |
| `before()` | перед element | Node / text |
| `after()` | після element | Node / text |
| `appendChild()` | у кінець children | Node |
| `insertBefore()` | перед child | Node |
| `insertAdjacentHTML()` | 4 позиції | HTML string |
| `insertAdjacentElement()` | 4 позиції | Element |
| `insertAdjacentText()` | 4 позиції | text |

---

# 57. Який метод вибирати?

### Потрібно додати DOM-елемент у кінець:

    parent.append(element);

---

### Потрібно додати DOM-елемент на початок:

    parent.prepend(element);

---

### Потрібно вставити перед конкретним елементом:

    element.before(newElement);

---

### Потрібно вставити після конкретного елемента:

    element.after(newElement);

---

### Потрібен старий DOM API:

    parent.appendChild(element);

---

### Потрібно вставити перед конкретним child старим способом:

    parent.insertBefore(
        newElement,
        referenceElement
    );

---

### Потрібно вставити HTML-рядок:

    element.insertAdjacentHTML(
        "beforeend",
        html
    );

---

# 58. Рекомендований сучасний стиль

Для створених DOM-елементів:

    const element = document.createElement("p");

    element.textContent = "Hello";

    container.append(element);

Для вставки відносно іншого елемента:

    target.before(element);

    target.after(element);

Для HTML-рядків:

    container.insertAdjacentHTML(
        "beforeend",
        html
    );

---

# 59. Не плутай `append()` та `appendChild()`

Запам'ятай:

    append()
        → сучасний зручний метод
        → Node або text
        → багато аргументів

    appendChild()
        → старіший DOM API
        → один Node
        → повертає доданий Node

---

# 60. Не плутай `append()` та `before()`

    parent.append(element);

означає:

    додати element всередину parent

А:

    target.before(element);

означає:

    додати element перед target

---

# 61. Не плутай `prepend()` та `before()`

Ці методи можуть дати схожий результат, але працюють на різних рівнях.

    parent.prepend(element);

означає:

    element стає першим child parent

А:

    target.before(element);

означає:

    element стає sibling перед target

---

# 62. Вкладеність DOM

Наприклад:

    <section>
        <div>
            <p>Text</p>
        </div>
    </section>

Якщо виконати:

    section.append(newElement);

новий елемент стане child `section`.

Якщо:

    paragraph.before(newElement);

новий елемент стане sibling для `paragraph`.

Тобто завжди запитуй себе:

> Куди саме відносно DOM tree я хочу вставити цей вузол?

---

# 63. Практичний патерн — створення картки

    function createCard(product) {
        const card = document.createElement("article");
        const title = document.createElement("h2");
        const price = document.createElement("p");
        const button = document.createElement("button");

        card.classList.add("card");

        title.textContent = product.name;
        price.textContent = `$${product.price}`;
        button.textContent = "Buy";

        card.append(
            title,
            price,
            button
        );

        return card;
    }

Потім:

    products.forEach((product) => {
        const card = createCard(product);

        container.append(card);
    });

---

# 64. Динамічна вставка картки на початок

Наприклад, новий продукт повинен бути першим:

    const card = createCard(product);

    container.prepend(card);

---

# 65. Динамічна вставка картки після іншої

    const newCard = createCard(product);

    const currentCard = document.querySelector(
        ".current-card"
    );

    currentCard.after(newCard);

---

# 66. Динамічне переміщення

Наприклад:

    const card = document.querySelector(".card");
    const favorites = document.querySelector("#favorites");

    favorites.append(card);

Тепер картка переміщена у favorites.

---

# 67. Вставка HTML із `insertAdjacentHTML()`

Для статичного фрагмента:

    container.insertAdjacentHTML(
        "beforeend",
        `
            <article class="card">
                <h2>JavaScript</h2>
                <p>Programming language</p>
            </article>
        `
    );

Це може бути зручним для простих шаблонів.

Але якщо структура створюється з користувацьких даних, краще використовувати:

    createElement()
    textContent
    append()

---

# 68. Часті помилки

## ❌ Помилка 1 — створили, але не вставили

    const element = document.createElement("p");

    element.textContent = "Hello";

Це ще не означає, що елемент з'явиться на сторінці.

Потрібно:

    container.append(element);

---

## ❌ Помилка 2 — переплутали `append()` та `prepend()`

    append()
        → кінець

    prepend()
        → початок

---

## ❌ Помилка 3 — переплутали `before()` та `after()`

    target.before(element);

    target.after(element);

---

## ❌ Помилка 4 — забули parent у `appendChild()`

Правильно:

    parent.appendChild(child);

Не:

    child.appendChild(parent);

якщо твоя мета — додати `child` до `parent`.

---

## ❌ Помилка 5 — використали `insertBefore()` без правильного reference

Потрібно:

    parent.insertBefore(
        newElement,
        referenceElement
    );

---

## ❌ Помилка 6 — використовують `innerHTML` для неперевірених даних

Небажано:

    container.innerHTML += `
        <p>${userInput}</p>
    `;

Краще:

    const paragraph = document.createElement("p");

    paragraph.textContent = userInput;

    container.append(paragraph);

---

## ❌ Помилка 7 — очікують копіювання при `append()`

Якщо елемент уже існує:

    container.append(element);

він буде **переміщений**.

Для копії:

    const copy = element.cloneNode(true);

---

# 69. Питання для співбесіди

## Junior

### 1. Як додати елемент у DOM?

    parent.append(element);

---

### 2. Чим `append()` відрізняється від `prepend()`?

`append()` додає в кінець children.

`prepend()` додає на початок children.

---

### 3. Як вставити елемент перед іншим?

    target.before(element);

---

### 4. Як вставити елемент після іншого?

    target.after(element);

---

### 5. Що робить `appendChild()`?

Додає один DOM-вузол у кінець дочірніх вузлів.

---

### 6. Що робить `insertBefore()`?

Вставляє DOM-вузол перед указаним child.

---

### 7. Чи копіює `append()` елемент?

Ні.

Він переміщує існуючий Node.

---

## Middle

### 8. Чим `append()` відрізняється від `appendChild()`?

`append()` може приймати декілька аргументів і текст.

`appendChild()` приймає один Node та повертає доданий Node.

---

### 9. Що таке `insertAdjacentHTML()`?

Метод для вставки HTML-рядка в одну з чотирьох позицій відносно елемента.

---

### 10. Які чотири позиції має `insertAdjacentHTML()`?

    beforebegin
    afterbegin
    beforeend
    afterend

---

### 11. Яка позиція додає HTML у кінець елемента?

    beforeend

---

### 12. Яка позиція додає HTML на початок елемента?

    afterbegin

---

### 13. Чому `insertAdjacentHTML()` може бути небезпечним?

Тому що переданий HTML-рядок інтерпретується як HTML. Неперевірені користувацькі дані можуть створити XSS-ризик.

---

### 14. Як безпечно вставити користувацький текст?

    const paragraph = document.createElement("p");

    paragraph.textContent = userInput;

    container.append(paragraph);

---

### 15. Що станеться, якщо додати вже існуючий Node в інший контейнер?

Node буде переміщений.

---

### 16. Як зробити копію Node?

    const copy = element.cloneNode(true);

---

# 70. Рівні володіння

## 🟢 Core

Потрібно знати:

    append()
    prepend()
    before()
    after()

Розуміти:

    create ≠ insert

---

## 🟡 Junior

Потрібно вміти:

    createElement()
    append()
    prepend()
    before()
    after()
    appendChild()
    insertBefore()

Створювати:

- списки;
- картки;
- Todo;
- повідомлення;
- кнопки;
- динамічний UI.

---

## 🟠 Middle

Потрібно розуміти:

    insertAdjacentHTML()
    insertAdjacentElement()
    insertAdjacentText()
    DocumentFragment
    cloneNode()

Вміти вибирати правильний спосіб вставки залежно від:

- типу даних;
- структури DOM;
- безпеки;
- продуктивності;
- архітектури компонента.

---

## 🔴 Senior

Потрібно розуміти:

- DOM tree;
- node movement;
- cloning;
- rendering;
- reflow;
- repaint;
- batching;
- DocumentFragment;
- event delegation;
- component rendering;
- DOM performance;
- XSS risks;
- separation of data and rendering.

---

# 71. Міні-шпаргалка

    // APPEND
    parent.append(element);

    // APPEND MULTIPLE
    parent.append(
        element1,
        element2,
        element3
    );

    // PREPEND
    parent.prepend(element);

    // BEFORE
    target.before(element);

    // AFTER
    target.after(element);

    // APPEND CHILD
    parent.appendChild(element);

    // INSERT BEFORE
    parent.insertBefore(
        newElement,
        referenceElement
    );

    // INSERT HTML
    element.insertAdjacentHTML(
        "beforeend",
        "<p>Hello</p>"
    );

    // INSERT ELEMENT
    element.insertAdjacentElement(
        "beforeend",
        newElement
    );

    // INSERT TEXT
    element.insertAdjacentText(
        "beforeend",
        "Hello"
    );

    // CLONE
    const copy = element.cloneNode(true);

    // MOVE
    newParent.append(element);

    // FRAGMENT
    const fragment =
        document.createDocumentFragment();

    fragment.append(element);

    parent.append(fragment);

---

# 72. Таблиця позицій

| Метод | Позиція |
|---|---|
| `parent.append()` | всередину, кінець |
| `parent.prepend()` | всередину, початок |
| `target.before()` | перед target |
| `target.after()` | після target |
| `parent.appendChild()` | всередину, кінець |
| `parent.insertBefore()` | перед reference |
| `insertAdjacentHTML("beforebegin")` | перед element |
| `insertAdjacentHTML("afterbegin")` | всередину, початок |
| `insertAdjacentHTML("beforeend")` | всередину, кінець |
| `insertAdjacentHTML("afterend")` | після element |

---

# 73. Практична вправа №1 — Append / Prepend

Створи:

    <ul id="list">
        <li>Existing</li>
    </ul>

Створи через JavaScript два елементи:

    First
    Last

Додай:

    First → prepend()
    Last → append()

---

# 74. Практична вправа №2 — Before / After

Створи:

    <p id="target">Target</p>

Додай:

    Before

перед `target`.

І:

    After

після `target`.

Використай:

    before()
    after()

---

# 75. Практична вправа №3 — Todo

Створи:

    input
    button
    ul

При натисканні кнопки:

    input value
        ↓
    createElement("li")
        ↓
    textContent
        ↓
    append()

---

# 76. Практична вправа №4 — Newest First

Зроби Todo List, у якому нові задачі додаються на початок.

Використай:

    prepend()

---

# 77. Практична вправа №5 — Insert HTML

Створи кнопку:

    Add Message

При натисканні додай:

    <li>New message</li>

через:

    insertAdjacentHTML()

Використай:

    "beforeend"

---

# 78. Практична вправа №6 — Insert Before

Створи список:

    First
    Second
    Third

Додай:

    New

перед:

    Second

Використай:

    before()

Потім реалізуй те саме через:

    insertBefore()

---

# 79. Практична вправа №7 — Move Element

Створи два контейнера:

    Container A
    Container B

У першому:

    <p id="item">Move me</p>

При натисканні кнопки перемісти елемент із A у B:

    containerB.append(item);

Поясни собі, чому елемент не копіюється.

---

# 80. Практична вправа №8 — Clone

Створи:

    <div id="card">
        <h2>JavaScript</h2>
        <p>Learn DOM</p>
    </div>

Зроби повну копію:

    cloneNode(true)

і додай її в інший контейнер.

---

# 81. Практична вправа №9 — DocumentFragment

Маємо:

    const languages = [
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "PostgreSQL"
    ];

Створи список через:

    DocumentFragment

Алгоритм:

    languages
        ↓
    create li
        ↓
    fragment.append()
        ↓
    list.append(fragment)

---

# 82. Практична вправа №10 — Mini Render Engine

Створи:

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
        },
        {
            id: 3,
            name: "Tablet",
            price: 500
        }
    ];

Створи функцію:

    createProductCard(product)

Вона повинна повертати:

    <article class="card">
        <h2>Product name</h2>
        <p>Price</p>
        <button>Buy</button>
    </article>

Потім:

    products.forEach((product) => {
        container.append(
            createProductCard(product)
        );
    });

Це важлива вправа, тому що вона тренує модель:

    DATA
      ↓
    CREATE
      ↓
    CONFIGURE
      ↓
    INSERT
      ↓
    UI

---

# 83. Найважливіший патерн

Для DOM-елементів:

    // CREATE
    const element = document.createElement("p");

    // CONFIGURE
    element.textContent = "Hello";
    element.classList.add("message");

    // INSERT
    container.append(element);

---

Для вставки перед елементом:

    target.before(element);

---

Для вставки після:

    target.after(element);

---

Для вставки на початок:

    container.prepend(element);

---

Для вставки в кінець:

    container.append(element);

---

Для HTML:

    container.insertAdjacentHTML(
        "beforeend",
        html
    );

---

# 84. Головне

Вставка елементів — це наступний крок після `createElement()`.

Базова послідовність:

    CREATE
      ↓
    CONFIGURE
      ↓
    INSERT

Основні сучасні методи:

    append()
        → всередину, кінець

    prepend()
        → всередину, початок

    before()
        → перед елементом

    after()
        → після елемента

Старіші / низькорівневі DOM API:

    appendChild()
    insertBefore()

Для HTML-рядків:

    insertAdjacentHTML()

Чотири позиції:

    beforebegin
    afterbegin
    beforeend
    afterend

---

# 85. Найважливіша модель у голові

Уявляй DOM як дерево:

    parent
      │
      ├── child 1
      ├── child 2
      └── child 3

Якщо потрібно додати в дерево:

    parent.append(new)
        ↓
    у кінець

    parent.prepend(new)
        ↓
    на початок

Якщо потрібно вставити відносно конкретного вузла:

    target.before(new)
        ↓
    перед target

    target.after(new)
        ↓
    після target

Якщо потрібно вставити HTML:

    target.insertAdjacentHTML(
        position,
        html
    )

---

# 86. Фінальна схема DOM manipulation

    DATA
      │
      ↓
    createElement()
      │
      ↓
    CONFIGURE
      │
      ├── textContent
      ├── classList
      ├── attributes
      ├── dataset
      ├── style
      └── events
      │
      ↓
    INSERT
      │
      ├── append()
      ├── prepend()
      ├── before()
      ├── after()
      ├── appendChild()
      └── insertBefore()
      │
      ↓
    DOM
      │
      ↓
    UI

Для HTML-фрагментів:

    HTML string
        ↓
    insertAdjacentHTML()
        ↓
    DOM

Для великих наборів:

    DATA
      ↓
    create elements
      ↓
    DocumentFragment
      ↓
    append(fragment)
      ↓
    DOM

### Головна формула

    append() → кінець

    prepend() → початок

    before() → перед

    after() → після

    appendChild() → кінець, один Node

    insertBefore() → перед reference

    insertAdjacentHTML() → HTML у конкретну позицію

    cloneNode() → копія

    append(existingNode) → переміщення

Ці методи утворюють основний набір інструментів для програмної побудови та зміни DOM у vanilla JavaScript.