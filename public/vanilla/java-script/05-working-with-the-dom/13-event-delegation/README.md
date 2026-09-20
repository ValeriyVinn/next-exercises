# 13. Event Delegation у DOM

## 📌 Що таке Event Delegation

**Event Delegation** — це техніка обробки подій, коли ми встановлюємо **один event listener на спільний батьківський елемент**, а не окремий listener на кожен дочірній елемент.

Вона працює завдяки **Event Bubbling**.

Наприклад, замість:

    button1.addEventListener("click", handler);
    button2.addEventListener("click", handler);
    button3.addEventListener("click", handler);

можна:

    container.addEventListener("click", (event) => {
        // визначаємо, на який елемент натиснули
    });

Схема:

    container
       │
       ├── button
       ├── button
       └── button

Один listener:

    container
        ↑
        │ bubbling
        │
    clicked button

---

# 🎯 Навіщо потрібен Event Delegation

Event Delegation особливо корисний, коли:

- на сторінці багато однотипних елементів;
- елементи створюються динамічно;
- кількість елементів змінюється;
- потрібно обробляти списки;
- потрібно обробляти таблиці;
- є багато кнопок дій;
- створюється Todo List;
- створюється меню;
- є картки товарів;
- є список користувачів;
- є динамічний UI.

Головна перевага:

> **Один listener може обробляти події від великої кількості дочірніх елементів.**

---

# 1. Передумова: Event Bubbling

Event Delegation неможливо нормально зрозуміти без Event Bubbling.

Наприклад:

    <div id="parent">
        <button id="child">Click</button>
    </div>

Listener:

    parent.addEventListener("click", () => {
        console.log("parent");
    });

При натисканні `button` listener на `parent` спрацює.

Чому?

Тому що:

    button
      ↑
    parent

Подія `click` спливає від `button` до `parent`.

---

# 2. Найпростіший Event Delegation

HTML:

    <ul id="list">
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

JavaScript:

    const list = document.querySelector("#list");

    list.addEventListener("click", (event) => {
        console.log(event.target);
    });

Тут listener встановлений тільки на:

    ul

Але реагувати можна на:

    li

---

# 3. Що відбувається під час click

Користувач натискає:

    <li>JavaScript</li>

Подія виникає на:

    li

Потім:

    li
      ↑
    ul

Listener знаходиться на `ul`.

Тому:

    event.target

буде:

    li

А:

    event.currentTarget

буде:

    ul

---

# 4. Основна формула Event Delegation

Запам'ятай:

    container.addEventListener("event", (event) => {
        const target = event.target;

        // перевірити target
        // виконати action
    });

Тобто:

    1. listener → parent/container

    2. event → bubbling

    3. event.target → визначити джерело

    4. перевірити target

    5. виконати потрібну дію

---

# 5. `event.target`

`event.target` — головний інструмент Event Delegation.

HTML:

    <ul id="list">
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

JavaScript:

    list.addEventListener("click", (event) => {
        console.log(event.target);
    });

Якщо натиснули `CSS`:

    event.target
    → <li>CSS</li>

---

# 6. `event.currentTarget`

У delegation:

    list.addEventListener("click", (event) => {
        console.log("target:", event.target);
        console.log("currentTarget:", event.currentTarget);
    });

Якщо натиснути `li`:

    target
    → li

    currentTarget
    → ul

Це фундаментальна різниця.

---

# 7. `target` vs `currentTarget`

| Властивість | Значення |
|---|---|
| `event.target` | елемент, де фактично виникла подія |
| `event.currentTarget` | елемент, на якому встановлений поточний listener |

Для Event Delegation найчастіше:

    event.target
    → child

    event.currentTarget
    → parent/container

---

# 8. Найпростіша перевірка через `matches()`

HTML:

    <ul id="list">
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

JavaScript:

    list.addEventListener("click", (event) => {
        if (!event.target.matches("li")) {
            return;
        }

        console.log(event.target.textContent);
    });

Тепер код реагує тільки на `li`.

---

# 9. Чому потрібна перевірка

Не можна бездумно робити:

    list.addEventListener("click", (event) => {
        console.log(event.target.textContent);
    });

Усередині `list` можуть бути:

    li
    span
    button
    img
    strong

Користувач може натиснути будь-який із них.

Тому потрібно визначити:

> Який саме елемент мене цікавить?

Наприклад:

    if (!event.target.matches("li")) {
        return;
    }

---

# 10. `closest()` — основний інструмент delegation

У реальному UI часто є вкладені елементи.

HTML:

    <button class="delete-btn">
        <span>Delete</span>
    </button>

Якщо натиснути на `span`:

    event.target

може бути:

    span

Але нам потрібен:

    button.delete-btn

Тоді використовуємо:

    event.target.closest(".delete-btn");

---

# 11. `matches()` vs `closest()`

### `matches()`

Перевіряє сам елемент:

    event.target.matches(".delete-btn");

### `closest()`

Шукає найближчий відповідний елемент, починаючи з самого target і рухаючись вгору:

    event.target.closest(".delete-btn");

Схема:

    span
      ↑
    button.delete-btn

    closest(".delete-btn")
      ↓
    button

---

# 12. Практичний шаблон з `closest()`

    container.addEventListener("click", (event) => {
        const button = event.target.closest(".delete-btn");

        if (!button) {
            return;
        }

        console.log("Delete");
    });

Це один із найважливіших шаблонів Event Delegation.

---

# 13. Навіщо перевіряти `if (!button)`

Якщо користувач натиснув не на `.delete-btn`:

    event.target.closest(".delete-btn")

поверне:

    null

Тому:

    if (!button) {
        return;
    }

захищає подальший код.

---

# 14. Event Delegation для кнопок

HTML:

    <div id="actions">
        <button class="save">Save</button>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    </div>

JavaScript:

    const actions = document.querySelector("#actions");

    actions.addEventListener("click", (event) => {
        const button = event.target.closest("button");

        if (!button) {
            return;
        }

        console.log(button.textContent);
    });

Один listener обробляє всі три кнопки.

---

# 15. Визначення конкретної дії

HTML:

    <div id="actions">
        <button data-action="save">Save</button>
        <button data-action="edit">Edit</button>
        <button data-action="delete">Delete</button>
    </div>

JavaScript:

    actions.addEventListener("click", (event) => {
        const button = event.target.closest("button");

        if (!button) {
            return;
        }

        const action = button.dataset.action;

        console.log(action);
    });

Можливі значення:

    save
    edit
    delete

---

# 16. Event Delegation + `dataset`

Це дуже практичний патерн.

HTML:

    <div id="actions">
        <button data-action="save">Save</button>
        <button data-action="edit">Edit</button>
        <button data-action="delete">Delete</button>
    </div>

JavaScript:

    actions.addEventListener("click", (event) => {
        const button = event.target.closest("button");

        if (!button) {
            return;
        }

        const action = button.dataset.action;

        if (action === "save") {
            console.log("Save");
        }

        if (action === "edit") {
            console.log("Edit");
        }

        if (action === "delete") {
            console.log("Delete");
        }
    });

---

# 17. Event Delegation для Todo List

HTML:

    <ul id="todo-list">
        <li data-id="1">
            <span>Learn HTML</span>
            <button class="delete-btn">Delete</button>
        </li>

        <li data-id="2">
            <span>Learn CSS</span>
            <button class="delete-btn">Delete</button>
        </li>

        <li data-id="3">
            <span>Learn JavaScript</span>
            <button class="delete-btn">Delete</button>
        </li>
    </ul>

JavaScript:

    const todoList = document.querySelector("#todo-list");

    todoList.addEventListener("click", (event) => {
        const button = event.target.closest(".delete-btn");

        if (!button) {
            return;
        }

        const item = button.closest("li");

        if (!item) {
            return;
        }

        item.remove();
    });

Тут:

    todoList
        ↓
    один listener
        ↓
    delete button
        ↓
    closest("li")
        ↓
    remove()

---

# 18. Event Delegation для динамічних елементів

Це одна з головних переваг delegation.

HTML:

    <ul id="list">
        <li>HTML</li>
        <li>CSS</li>
    </ul>

JavaScript:

    list.addEventListener("click", (event) => {
        const item = event.target.closest("li");

        if (!item) {
            return;
        }

        console.log(item.textContent);
    });

Потім створюємо новий елемент:

    const li = document.createElement("li");

    li.textContent = "JavaScript";

    list.append(li);

Новий `li` теж буде оброблятися.

Чому?

Тому що listener знаходиться на:

    list

а не на старих `li`.

---

# 19. Чому звичайний підхід не працює для нових елементів

Наприклад:

    const items = document.querySelectorAll("li");

    items.forEach((item) => {
        item.addEventListener("click", () => {
            console.log(item.textContent);
        });
    });

Пізніше:

    const newItem = document.createElement("li");

    newItem.textContent = "JavaScript";

    list.append(newItem);

Новий елемент не має listener.

Тому що listener додавався до елементів, які існували на той момент.

---

# 20. Event Delegation вирішує проблему

Замість:

    items.forEach((item) => {
        item.addEventListener("click", handler);
    });

можна:

    list.addEventListener("click", (event) => {
        const item = event.target.closest("li");

        if (!item) {
            return;
        }

        handler(item);
    });

Тепер нові `li` теж працюють.

---

# 21. Event Delegation для таблиці

HTML:

    <table id="users">
        <tbody>
            <tr data-id="1">
                <td>John</td>
                <td>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </td>
            </tr>

            <tr data-id="2">
                <td>Mary</td>
                <td>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>

JavaScript:

    const users = document.querySelector("#users");

    users.addEventListener("click", (event) => {
        const button = event.target.closest("button");

        if (!button) {
            return;
        }

        const row = button.closest("tr");

        if (!row) {
            return;
        }

        const id = row.dataset.id;

        if (button.classList.contains("edit")) {
            console.log("Edit:", id);
        }

        if (button.classList.contains("delete")) {
            console.log("Delete:", id);
        }
    });

Один listener обробляє всі рядки та всі кнопки.

---

# 22. Event Delegation для меню

HTML:

    <nav id="menu">
        <a href="/home">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
    </nav>

JavaScript:

    const menu = document.querySelector("#menu");

    menu.addEventListener("click", (event) => {
        const link = event.target.closest("a");

        if (!link) {
            return;
        }

        console.log("Clicked:", link.textContent);
    });

---

# 23. Event Delegation + `preventDefault()`

Наприклад, потрібно перехопити навігацію:

    menu.addEventListener("click", (event) => {
        const link = event.target.closest("a");

        if (!link) {
            return;
        }

        event.preventDefault();

        console.log("Navigate:", link.href);
    });

Тут:

    preventDefault()

скасовує стандартний перехід.

А delegation працює завдяки:

    bubbling

Це дві різні концепції.

---

# 24. Event Delegation для карток

HTML:

    <div id="products">
        <article class="card" data-id="101">
            <h3>Keyboard</h3>
            <button data-action="buy">
                Buy
            </button>
        </article>

        <article class="card" data-id="102">
            <h3>Mouse</h3>
            <button data-action="buy">
                Buy
            </button>
        </article>
    </div>

JavaScript:

    const products = document.querySelector("#products");

    products.addEventListener("click", (event) => {
        const button = event.target.closest("button");

        if (!button) {
            return;
        }

        const card = button.closest(".card");

        if (!card) {
            return;
        }

        const id = card.dataset.id;
        const action = button.dataset.action;

        console.log({
            id,
            action
        });
    });

---

# 25. Event Delegation для кількох action

HTML:

    <article class="card" data-id="101">
        <h3>Keyboard</h3>

        <button data-action="open">
            Open
        </button>

        <button data-action="edit">
            Edit
        </button>

        <button data-action="delete">
            Delete
        </button>
    </article>

JavaScript:

    products.addEventListener("click", (event) => {
        const button = event.target.closest("button");

        if (!button) {
            return;
        }

        const card = button.closest(".card");

        if (!card) {
            return;
        }

        const id = card.dataset.id;
        const action = button.dataset.action;

        switch (action) {
            case "open":
                console.log("Open:", id);
                break;

            case "edit":
                console.log("Edit:", id);
                break;

            case "delete":
                console.log("Delete:", id);
                break;
        }
    });

Це вже дуже близько до реальної frontend-логіки.

---

# 26. Не обов'язково використовувати `switch`

Можна використовувати об'єкт дій:

    const actions = {
        open(id) {
            console.log("Open:", id);
        },

        edit(id) {
            console.log("Edit:", id);
        },

        delete(id) {
            console.log("Delete:", id);
        }
    };

    products.addEventListener("click", (event) => {
        const button = event.target.closest("button");

        if (!button) {
            return;
        }

        const card = button.closest(".card");

        if (!card) {
            return;
        }

        const action = button.dataset.action;
        const id = card.dataset.id;

        const handler = actions[action];

        if (!handler) {
            return;
        }

        handler(id);
    });

Це вже більш масштабований підхід.

---

# 27. Event Delegation і вкладені елементи

Розглянемо:

    <button class="action">
        <span class="icon">
            ★
        </span>

        <span class="text">
            Save
        </span>
    </button>

Користувач може натиснути:

    button
    span.icon
    span.text

Тому:

    event.target

може бути різним.

А:

    event.target.closest(".action")

дозволяє знайти потрібний `button`.

---

# 28. `closest()` рухається вгору

Якщо:

    <div class="card">
        <button class="action">
            <span>Save</span>
        </button>
    </div>

і `target`:

    span

то:

    event.target.closest(".action")

шукає:

    span
      ↑
    button.action

і повертає:

    button.action

---

# 29. Перевірка меж контейнера

У складному DOM може бути важливо переконатися, що знайдений елемент належить саме потрібному контейнеру.

Наприклад:

    container.addEventListener("click", (event) => {
        const button = event.target.closest(".action");

        if (!button) {
            return;
        }

        if (!container.contains(button)) {
            return;
        }

        console.log("Action");
    });

Для звичайної простої структури це часто зайве, але принцип потрібно розуміти.

---

# 30. Event Delegation і `contains()`

`contains()` перевіряє, чи знаходиться елемент всередині іншого:

    container.contains(element)

Наприклад:

    if (!container.contains(button)) {
        return;
    }

Це:

> "Чи належить цей button нашому container?"

---

# 31. Event Delegation і `data-*`

HTML:

    <button
        data-id="42"
        data-action="delete"
    >
        Delete
    </button>

JavaScript:

    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    console.log(button.dataset.id);
    console.log(button.dataset.action);

Результат:

    42
    delete

`data-*` дуже зручний для передачі ідентифікатора або action у DOM.

---

# 32. Event Delegation + форма

Наприклад:

    <form id="form">
        <input name="email">

        <button type="submit">
            Submit
        </button>
    </form>

Listener:

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        console.log("Submit");
    });

Тут не потрібно делегувати `submit` від окремих кнопок.

Важливий принцип:

> Delegation потрібно використовувати там, де воно спрощує код.

---

# 33. Event Delegation не означає "всі listener'и повинні бути на document"

Можна зробити:

    document.addEventListener("click", handler);

Але це не означає, що `document` завжди найкращий контейнер.

Часто краще:

    list.addEventListener("click", handler);

ніж:

    document.addEventListener("click", handler);

Чому?

Тому що `list` має чіткіші межі відповідальності.

---

# 34. Порівняння container vs document

### Менший container

    list.addEventListener("click", handler);

Переваги:

- зрозуміліша область;
- менше сторонніх подій;
- простіше дебажити;
- логіка локалізована.

### `document`

    document.addEventListener("click", handler);

Може бути корисним для:

- глобальних UI-механізмів;
- закриття dropdown;
- modal;
- глобальних shortcut-механізмів;
- спеціальних delegation-сценаріїв.

Але не варто автоматично використовувати `document`.

---

# 35. Event Delegation для динамічного меню

HTML:

    <div id="menu"></div>

JavaScript:

    const menu = document.querySelector("#menu");

    menu.addEventListener("click", (event) => {
        const item = event.target.closest("[data-action]");

        if (!item) {
            return;
        }

        console.log(item.dataset.action);
    });

Потім:

    menu.innerHTML = `
        <button data-action="home">Home</button>
        <button data-action="about">About</button>
        <button data-action="settings">Settings</button>
    `;

Навіть якщо кнопки створені пізніше, delegation продовжує працювати.

---

# 36. Чому delegation особливо корисний у UI

Уявімо список:

    1 000 items

Без delegation потенційно:

    1 000 listeners

З delegation:

    1 listener

Наприклад:

    list.addEventListener("click", handler);

Це не означає, що delegation завжди автоматично "швидший".

Головна практична перевага:

> **простота керування великою кількістю динамічних елементів.**

---

# 37. Не треба перебільшувати перевагу продуктивності

Неправильно казати:

> Event Delegation завжди набагато швидший.

Правильніше:

- він може зменшити кількість listener'ів;
- спрощує роботу з динамічним DOM;
- полегшує централізовану обробку однакових дій;
- часто робить код простішим.

Але delegation теж має ціну:

- потрібно визначати target;
- потрібно виконувати `closest()` / `matches()`;
- потрібно фільтрувати події.

---

# 38. Event Delegation і memory

Якщо створити багато елементів:

    item1.addEventListener(...)
    item2.addEventListener(...)
    item3.addEventListener(...)
    ...

кількість listener'ів зростає.

При delegation:

    container.addEventListener(...);

маємо один listener.

Це може бути корисно в інтерфейсах із великою кількістю повторюваних елементів.

---

# 39. Типова помилка №1 — listener ставиться до кожного елемента

Наприклад:

    const buttons = document.querySelectorAll(".delete");

    buttons.forEach((button) => {
        button.addEventListener("click", handleDelete);
    });

Це не delegation.

Це звичайний listener на кожному елементі.

Delegation:

    container.addEventListener("click", (event) => {
        const button = event.target.closest(".delete");

        if (!button) {
            return;
        }

        handleDelete(button);
    });

---

# 40. Типова помилка №2 — забути про вкладений елемент

HTML:

    <button class="delete">
        <span>Delete</span>
    </button>

Невдалий варіант:

    if (event.target.matches(".delete")) {
        // ...
    }

Якщо натиснули `span`, умова не спрацює.

Краще:

    const button = event.target.closest(".delete");

---

# 41. Типова помилка №3 — відсутність `null` перевірки

Небезпечно:

    const button = event.target.closest(".delete");

    button.remove();

Якщо `button` не знайдений:

    button === null

і код впаде з помилкою.

Краще:

    const button = event.target.closest(".delete");

    if (!button) {
        return;
    }

    button.remove();

---

# 42. Типова помилка №4 — використовувати неправильний контейнер

Наприклад:

    document.addEventListener("click", handler);

коли вся логіка стосується лише:

    #todo-list

Краще:

    todoList.addEventListener("click", handler);

Якщо немає потреби в глобальному listener, локальний container часто зрозуміліший.

---

# 43. Типова помилка №5 — плутати `target` і `currentTarget`

При delegation:

    container.addEventListener("click", (event) => {
        console.log(event.target);
        console.log(event.currentTarget);
    });

Якщо натиснули button:

    target
    → button

    currentTarget
    → container

---

# 44. Типова помилка №6 — забути про bubbling

Event Delegation працює для подій, які поширюються до контейнера.

Якщо конкретна подія не bubbling, звичайний delegation через parent не працюватиме так само.

Наприклад, `focus` має особливості.

Для delegation фокусу часто використовують:

    focusin

та:

    focusout

---

# 45. Типова помилка №7 — зупинити bubbling занадто рано

Наприклад, всередині дочірнього компонента:

    event.stopPropagation();

Після цього parent delegation може не отримати подію.

Тому `stopPropagation()` може випадково зламати delegation.

---

# 46. Event Delegation і `stopPropagation()`

Уявімо:

    container
       ↓
    button

На button:

    button.addEventListener("click", (event) => {
        event.stopPropagation();
    });

А на container:

    container.addEventListener("click", handler);

Тепер `handler` може не виконатися.

Тому потрібно розуміти залежність:

    bubbling
       ↓
    delegation

Якщо зупинити bubbling:

    stopPropagation()
       ↓
    delegation може не спрацювати

---

# 47. Event Delegation і `preventDefault()`

Не плутати:

    event.preventDefault();

із:

    event.stopPropagation();

Наприклад:

    container.addEventListener("click", (event) => {
        const link = event.target.closest("a");

        if (!link) {
            return;
        }

        event.preventDefault();
    });

Тут подія все ще може bubbling.

Ми лише скасували стандартну дію посилання.

---

# 48. Практичний шаблон №1 — список

    const list = document.querySelector("#list");

    list.addEventListener("click", (event) => {
        const item = event.target.closest(".item");

        if (!item) {
            return;
        }

        // action
    });

---

# 49. Практичний шаблон №2 — button action

    container.addEventListener("click", (event) => {
        const button = event.target.closest("button");

        if (!button) {
            return;
        }

        // action
    });

---

# 50. Практичний шаблон №3 — data-action

    container.addEventListener("click", (event) => {
        const button = event.target.closest("[data-action]");

        if (!button) {
            return;
        }

        const action = button.dataset.action;

        // action
    });

---

# 51. Практичний шаблон №4 — item + action

    container.addEventListener("click", (event) => {
        const button = event.target.closest("[data-action]");

        if (!button) {
            return;
        }

        const item = button.closest("[data-id]");

        if (!item) {
            return;
        }

        const id = item.dataset.id;
        const action = button.dataset.action;

        console.log({
            id,
            action
        });
    });

Це дуже корисний шаблон для CRUD UI.

---

# 52. Event Delegation для CRUD

Наприклад:

    <div id="users">

        <article data-id="1">
            <span>John</span>

            <button data-action="edit">
                Edit
            </button>

            <button data-action="delete">
                Delete
            </button>
        </article>

    </div>

JavaScript:

    users.addEventListener("click", (event) => {
        const button = event.target.closest("[data-action]");

        if (!button) {
            return;
        }

        const user = button.closest("[data-id]");

        if (!user) {
            return;
        }

        const id = user.dataset.id;
        const action = button.dataset.action;

        console.log(action, id);
    });

Можливі операції:

    create
    read
    update
    delete

Delegation особливо зручний для:

    edit
    delete
    open
    archive
    restore

---

# 53. Event Delegation + функції

Краще не поміщати всю логіку всередину listener.

Наприклад:

    function deleteItem(item) {
        item.remove();
    }

    function editItem(item) {
        console.log("Edit:", item.dataset.id);
    }

    container.addEventListener("click", (event) => {
        const button = event.target.closest("[data-action]");

        if (!button) {
            return;
        }

        const item = button.closest("[data-id]");

        if (!item) {
            return;
        }

        const action = button.dataset.action;

        if (action === "delete") {
            deleteItem(item);
        }

        if (action === "edit") {
            editItem(item);
        }
    });

Так код легше тестувати та розширювати.

---

# 54. Event Delegation як патерн

Можна мислити так:

    DOM
      ↓
    Container
      ↓
    Event Listener
      ↓
    event.target
      ↓
    closest()
      ↓
    data-action
      ↓
    function
      ↓
    state / DOM / API

Це вже практичний frontend-патерн.

---

# 55. Event Delegation і сучасний frontend

Навіть якщо ти працюєш із:

- React;
- Next.js;
- Vue;
- Angular;

розуміння Event Delegation залишається корисним.

Тому що в основі браузерного UI все одно лежить:

    DOM Events

А frameworks додають свої механізми обробки подій поверх цієї моделі.

---

# 56. Event Delegation не дорівнює React Event Handling

У React ти часто пишеш:

    <button onClick={handleClick}>
        Delete
    </button>

Тобто на рівні JSX ти працюєш із декларативним API React.

Але розуміння:

    event.target
    event.currentTarget
    bubbling
    propagation
    stopPropagation()

залишається фундаментальним.

---

# 57. Практика №1 — список

Створи:

    <ul id="list">
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

Постав **один** listener на `ul`.

При натисканні на `li` виводь:

    Clicked: JavaScript

---

# 58. Практика №2 — динамічний список

Створи кнопку:

    <button id="add">
        Add item
    </button>

При натисканні створюй новий `li`.

Event Delegation має працювати і для нових елементів.

---

# 59. Практика №3 — Delete

Створи:

    <ul id="list">
        <li>
            HTML
            <button class="delete">
                Delete
            </button>
        </li>

        <li>
            CSS
            <button class="delete">
                Delete
            </button>
        </li>

        <li>
            JavaScript
            <button class="delete">
                Delete
            </button>
        </li>
    </ul>

Один listener:

    list.addEventListener("click", handler);

При натисканні Delete видаляй відповідний `li`.

---

# 60. Практика №4 — вкладений елемент

Зроби:

    <button class="delete">
        <span>Delete</span>
    </button>

Перевір, що працює:

    event.target.closest(".delete")

навіть якщо натискаєш саме на `span`.

---

# 61. Практика №5 — data-action

Створи:

    <div id="actions">
        <button data-action="save">Save</button>
        <button data-action="edit">Edit</button>
        <button data-action="delete">Delete</button>
    </div>

Один listener повинен визначати:

    event.target.closest("[data-action]")

і виконувати відповідну дію.

---

# 62. Практика №6 — картки

Створи:

    <div id="cards">
        <article class="card" data-id="1">
            <h3>HTML</h3>

            <button data-action="open">
                Open
            </button>

            <button data-action="delete">
                Delete
            </button>
        </article>

        <article class="card" data-id="2">
            <h3>JavaScript</h3>

            <button data-action="open">
                Open
            </button>

            <button data-action="delete">
                Delete
            </button>
        </article>
    </div>

Завдання:

    один listener
    +
    closest()
    +
    dataset
    +
    action

---

# 63. Практика №7 — Todo CRUD

Зроби Todo List з:

    Add
    Complete
    Edit
    Delete

Використай:

    data-id
    data-action
    closest()
    Event Delegation

Архітектура:

    todoList
        ↓
    one click listener
        ↓
    button[data-action]
        ↓
    closest("li")
        ↓
    data-id
        ↓
    action function

Це вже хороша маленька frontend-вправа.

---

# 64. Практика №8 — таблиця

Створи таблицю користувачів.

Кожен рядок:

    <tr data-id="1">

має:

    Edit
    Delete

Постав listener тільки на:

    <tbody>

При натисканні визнач:

    button
    ↓
    row
    ↓
    id
    ↓
    action

---

# 65. Питання для співбесіди

## Junior

1. Що таке Event Delegation?
2. Чому Event Delegation працює?
3. Що таке Event Bubbling?
4. Що таке `event.target`?
5. Що таке `event.currentTarget`?
6. Чому listener встановлюють на parent?
7. Як визначити, на який дочірній елемент натиснули?
8. Для чого потрібен `closest()`?
9. Для чого потрібен `matches()`?
10. Чому delegation працює для динамічних елементів?

---

## Middle

11. Яка різниця між delegation і listener на кожному елементі?
12. Коли delegation корисний?
13. Коли delegation може бути недоречним?
14. Чому `event.target` може бути `span`, а не `button`?
15. Чому `closest()` часто кращий за `matches()`?
16. Як використати `dataset` разом із delegation?
17. Як організувати CRUD через Event Delegation?
18. Що станеться з delegation після `stopPropagation()`?
19. Чому не завжди потрібно ставити listener на `document`?
20. Які події мають особливості щодо bubbling?

---

## Strong Middle / Senior

21. Які компроміси має Event Delegation?
22. Як delegation впливає на кількість event listeners?
23. Які потенційні проблеми delegation у складному DOM?
24. Як організувати delegation для великої кількості action-кнопок?
25. Як уникати конфліктів між nested components?
26. Як працювати з propagation у component architecture?
27. Як delegation пов'язаний із dynamic rendering?
28. Коли краще локальний listener, а коли delegation?
29. Як `stopPropagation()` може зламати delegation?
30. Як дебажити складну систему delegated events?

---

# 66. Рівні знань

## 🟢 Core

Потрібно знати:

- Event Bubbling;
- `event.target`;
- `event.currentTarget`;
- parent listener;
- `matches()`;
- `closest()`.

---

## 🟡 Junior

Потрібно вміти:

- створити delegation;
- обробляти список;
- працювати з кнопками;
- використовувати `closest()`;
- працювати з `data-*`;
- обробляти динамічні елементи;
- створити Todo List через delegation.

---

## 🟠 Middle

Потрібно вміти:

- будувати delegation для складного UI;
- обробляти CRUD;
- працювати з nested elements;
- правильно використовувати `closest()`;
- організовувати action-based UI;
- визначати межі delegation container;
- розуміти propagation;
- уникати конфліктів між listener'ами.

---

## 🔴 Senior

Потрібно розуміти:

- delegation як architectural pattern;
- event propagation;
- capture/bubble;
- performance trade-offs;
- dynamic rendering;
- component boundaries;
- global vs local delegation;
- складні UI event systems;
- взаємодію native DOM events із framework event systems.

---

# 67. Міні-шпаргалка

## Event Delegation

    parent.addEventListener("click", (event) => {
        // ...
    });

---

## Target

    event.target

Де подія виникла.

---

## Current Target

    event.currentTarget

Де знаходиться listener.

---

## Перевірка target

    event.target.matches(".item")

---

## Знайти parent element

    event.target.closest(".item")

---

## Перевірити існування

    const item = event.target.closest(".item");

    if (!item) {
        return;
    }

---

## Data attribute

    button.dataset.action

    item.dataset.id

---

## Базовий delegation

    container.addEventListener("click", (event) => {
        const item = event.target.closest(".item");

        if (!item) {
            return;
        }

        // action
    });

---

## Action delegation

    container.addEventListener("click", (event) => {
        const button = event.target.closest("[data-action]");

        if (!button) {
            return;
        }

        const action = button.dataset.action;

        // handle action
    });

---

## Item + Action

    container.addEventListener("click", (event) => {
        const button = event.target.closest("[data-action]");

        if (!button) {
            return;
        }

        const item = button.closest("[data-id]");

        if (!item) {
            return;
        }

        const id = item.dataset.id;
        const action = button.dataset.action;

        console.log({
            id,
            action
        });
    });

---

# 68. Event Delegation — головна схема

Запам'ятай:

    DOM
      │
      └── container
             │
             ├── item
             │    └── button
             │
             ├── item
             │    └── button
             │
             └── item
                  └── button

Замість:

    button → listener
    button → listener
    button → listener

робимо:

    container → один listener

А потім:

    click
      ↓
    bubbling
      ↓
    container listener
      ↓
    event.target
      ↓
    closest()
      ↓
    потрібний element
      ↓
    action

---

# 69. Найважливіший практичний шаблон

Для твого JavaScript frontend-практикуму я б особливо добре запам'ятав цей шаблон:

    const container = document.querySelector("#container");

    container.addEventListener("click", (event) => {
        const button = event.target.closest("[data-action]");

        if (!button) {
            return;
        }

        const item = button.closest("[data-id]");

        if (!item) {
            return;
        }

        const id = item.dataset.id;
        const action = button.dataset.action;

        console.log({
            id,
            action
        });
    });

Він поєднує одразу кілька фундаментальних концепцій:

    Event Bubbling
        ↓
    Event Delegation
        ↓
    event.target
        ↓
    closest()
        ↓
    data-*
        ↓
    action
        ↓
    application logic

---

# 70. Event Delegation у контексті твого навчання

Тема добре пов'язується з попередніми темами DOM:

    01 Element Selection
        ↓
    02 DOM Traversal
        ↓
    03 Text / HTML
        ↓
    04 Attributes
        ↓
    05 Classes
        ↓
    06 Styles
        ↓
    07 Create Elements
        ↓
    08 Insert Elements
        ↓
    09 Remove Elements
        ↓
    10 Events
        ↓
    11 Event Object
        ↓
    12 Event Bubbling
        ↓
    13 Event Delegation

Тепер DOM вже можна не просто змінювати, а будувати **динамічну інтерактивну поведінку**.

---

# 71. Що потрібно вміти після цієї теми

Після завершення `13-event-delegation` ти повинен уміти самостійно написати:

    const list = document.querySelector("#list");

    list.addEventListener("click", (event) => {
        const button = event.target.closest("[data-action]");

        if (!button) {
            return;
        }

        const item = button.closest("[data-id]");

        if (!item) {
            return;
        }

        const id = item.dataset.id;
        const action = button.dataset.action;

        if (action === "delete") {
            item.remove();
        }

        if (action === "edit") {
            console.log("Edit:", id);
        }
    });

І головне — **розуміти кожен рядок**, а не просто копіювати цей шаблон.

---

# 72. Головне

### 1. Event Delegation базується на bubbling

    child
      ↑
    parent

---

### 2. Listener ставимо на container

    container.addEventListener(...)

---

### 3. Джерело події знаходимо через `event.target`

    event.target

---

### 4. Для вкладених елементів часто використовуємо `closest()`

    event.target.closest(".button")

---

### 5. `currentTarget` — це container

    event.currentTarget

---

### 6. `dataset` зручно використовувати для action та id

    button.dataset.action

    item.dataset.id

---

### 7. Delegation чудово працює з динамічним DOM

    existing items
          +
    dynamically created items
          ↓
    one parent listener

---

### 8. Не плутай три різні речі

    preventDefault()
    → скасувати стандартну дію

    stopPropagation()
    → зупинити поширення

    Event Delegation
    → використати bubbling для обробки дочірніх елементів через parent

---

# 73. Фінальна mental model

Коли бачиш:

    <div id="list">
        <button data-action="delete">
            <span>Delete</span>
        </button>
    </div>

і потрібно обробити кнопку, думай так:

    Користувач натиснув span
              ↓
    event.target === span
              ↓
    click bubbling
              ↓
    listener на #list
              ↓
    event.target.closest("[data-action]")
              ↓
    button
              ↓
    button.dataset.action
              ↓
    "delete"
              ↓
    виконати delete

Тобто:

    Event
      ↓
    Bubbling
      ↓
    Delegation
      ↓
    target
      ↓
    closest()
      ↓
    dataset
      ↓
    action

Це одна з найважливіших схем, яку варто засвоїти перед переходом від базового DOM до реальних інтерактивних JavaScript-застосунків.