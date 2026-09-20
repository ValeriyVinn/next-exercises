# 09. Remove Elements — Видалення елементів у DOM

## 📌 Вступ

JavaScript дозволяє не тільки створювати та вставляти HTML-елементи, а й **видаляти їх із DOM**.

Видалення елементів часто використовується у:

- Todo List;
- видаленні повідомлень;
- очищенні списків;
- модальних вікнах;
- фільтрації елементів;
- динамічному рендерингу;
- SPA-застосунках;
- оновленні UI без перезавантаження сторінки.

Основні способи:

- `element.remove()`
- `parent.removeChild(element)`
- `element.replaceWith()`
- `container.innerHTML = ""`
- `element.outerHTML = ""`
- `element.removeAttribute()` — видаляє атрибут, а не елемент.

---

# 1. `element.remove()`

## Синтаксис

    element.remove();

`remove()` видаляє сам елемент із DOM.

### Приклад

HTML:

    <div id="message">Hello</div>

JavaScript:

    const message = document.querySelector("#message");

    message.remove();

Після виконання:

    <body>
        <!-- div видалений -->
    </body>

---

## 1.1. Видалення кнопки

    const button = document.querySelector("button");

    button.remove();

Кнопка повністю зникає з DOM.

---

## 1.2. Видалення елемента після натискання

HTML:

    <div class="message">
        <p>Hello!</p>
        <button class="remove-btn">Remove</button>
    </div>

JavaScript:

    const message = document.querySelector(".message");
    const button = document.querySelector(".remove-btn");

    button.addEventListener("click", () => {
        message.remove();
    });

Кнопка видаляє весь блок `.message`.

---

# 2. `parent.removeChild(element)`

Старіший спосіб видалення елемента:

    parent.removeChild(element);

Спочатку потрібно отримати батьківський елемент, а потім передати йому дочірній елемент, який потрібно видалити.

### Приклад

HTML:

    <ul id="users">
        <li>Alex</li>
        <li>John</li>
        <li>Kate</li>
    </ul>

JavaScript:

    const list = document.querySelector("#users");
    const item = list.querySelector("li");

    list.removeChild(item);

Буде видалено перший `<li>`.

---

# 3. `remove()` vs `removeChild()`

Обидва способи видаляють елемент, але працюють по-різному.

### `remove()`

Елемент видаляє себе:

    element.remove();

### `removeChild()`

Батьківський елемент видаляє свого child:

    parent.removeChild(element);

---

## Порівняння

| Метод | Синтаксис | Особливість |
|---|---|---|
| `remove()` | `element.remove()` | сучасний і простий |
| `removeChild()` | `parent.removeChild(element)` | потрібно знати parent |
| `innerHTML = ""` | `container.innerHTML = ""` | очищає весь HTML контейнера |

У сучасному JavaScript для видалення конкретного елемента зазвичай використовують:

    element.remove();

---

# 4. Перевірка перед видаленням

Якщо елемент може не існувати, потрібно перевіряти результат пошуку.

Небезпечно:

    const button = document.querySelector(".button");

    button.remove();

Якщо `.button` не знайдений:

    button === null

і виникне помилка:

    Cannot read properties of null

Безпечніше:

    const button = document.querySelector(".button");

    if (button) {
        button.remove();
    }

---

# 5. Видалення першого елемента

HTML:

    <ul id="list">
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
    </ul>

JavaScript:

    const list = document.querySelector("#list");
    const firstItem = list.querySelector("li");

    firstItem.remove();

Результат:

    <ul id="list">
        <li>Two</li>
        <li>Three</li>
    </ul>

---

# 6. Видалення останнього елемента

Можна отримати останній child через `lastElementChild`.

    const list = document.querySelector("#list");

    list.lastElementChild.remove();

Було:

    <ul id="list">
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
    </ul>

Стало:

    <ul id="list">
        <li>One</li>
        <li>Two</li>
    </ul>

---

# 7. `firstElementChild` і `lastElementChild`

Для роботи з крайніми елементами часто використовуються:

    parent.firstElementChild
    parent.lastElementChild

### Приклад

    const list = document.querySelector("#list");

    list.firstElementChild.remove();

Видалить перший елемент.

    list.lastElementChild.remove();

Видалить останній елемент.

---

# 8. Видалення конкретного елемента

Наприклад, потрібно видалити `<li>` з певним класом.

HTML:

    <ul>
        <li>One</li>
        <li class="active">Two</li>
        <li>Three</li>
    </ul>

JavaScript:

    const item = document.querySelector(".active");

    item.remove();

---

# 9. Видалення всіх елементів за селектором

`querySelectorAll()` повертає `NodeList`.

Наприклад:

    const items = document.querySelectorAll(".item");

Можна перебрати всі елементи:

    items.forEach((item) => {
        item.remove();
    });

---

## Приклад

HTML:

    <div class="item">One</div>
    <div class="item">Two</div>
    <div class="item">Three</div>

JavaScript:

    const items = document.querySelectorAll(".item");

    items.forEach((item) => {
        item.remove();
    });

У результаті всі `.item` будуть видалені.

---

# 10. Очищення контейнера

Якщо потрібно видалити **весь вміст контейнера**, можна використати:

    container.innerHTML = "";

### Приклад

HTML:

    <div id="list">
        <p>One</p>
        <p>Two</p>
        <p>Three</p>
    </div>

JavaScript:

    const list = document.querySelector("#list");

    list.innerHTML = "";

Результат:

    <div id="list"></div>

Сам `#list` залишається.

Видаляється тільки його внутрішній HTML.

---

# 11. `innerHTML = ""` vs `element.remove()`

Це дуже важлива різниця.

### Видалити сам контейнер

    list.remove();

Результат:

    <!-- #list більше не існує -->

### Очистити контейнер

    list.innerHTML = "";

Результат:

    <div id="list"></div>

Тобто:

    element.remove();

видаляє **сам element**.

А:

    element.innerHTML = "";

видаляє **його дочірній HTML**.

---

# 12. Очищення через `replaceChildren()`

Сучасний спосіб очистити всі дочірні елементи:

    container.replaceChildren();

### Приклад

    const list = document.querySelector("#list");

    list.replaceChildren();

Результат:

    <ul id="list"></ul>

Контейнер залишається, але всі його children видалені.

---

## 12.1. `replaceChildren()` може не тільки очищати

Метод також може замінити весь вміст новими вузлами.

    list.replaceChildren(newItem);

У цьому випадку старі children видаляються, а `newItem` вставляється.

Тому:

    list.replaceChildren();

означає:

> Видалити всіх дочірніх елементів.

---

# 13. `innerHTML = ""` vs `replaceChildren()`

| Спосіб | Що робить |
|---|---|
| `container.innerHTML = ""` | очищає HTML |
| `container.replaceChildren()` | видаляє всі children |
| `container.remove()` | видаляє сам container |

Для простого очищення контейнера обидва перші варіанти можуть бути корисними.

Наприклад:

    list.innerHTML = "";

або:

    list.replaceChildren();

---

# 14. Видалення атрибуту — це не видалення елемента

Не плутати:

    element.remove();

і:

    element.removeAttribute("class");

Перший варіант видаляє елемент.

Другий — тільки атрибут.

### Приклад

    const button = document.querySelector("button");

    button.removeAttribute("disabled");

Кнопка залишається в DOM.

Видаляється тільки:

    disabled

---

# 15. `removeAttribute()`

Синтаксис:

    element.removeAttribute("attribute");

### Приклад

HTML:

    <button id="save" disabled class="primary">
        Save
    </button>

JavaScript:

    const button = document.querySelector("#save");

    button.removeAttribute("disabled");

Після цього:

    <button id="save" class="primary">
        Save
    </button>

Елемент не видаляється.

---

# 16. `replaceWith()`

`replaceWith()` дозволяє замінити один елемент іншим.

Синтаксис:

    element.replaceWith(newElement);

### Приклад

    const oldElement = document.querySelector(".old");
    const newElement = document.createElement("div");

    newElement.textContent = "New element";

    oldElement.replaceWith(newElement);

Старий елемент видаляється, а на його місце вставляється новий.

---

## 16.1. Заміна текстом

`replaceWith()` може приймати не тільки Node, а й текст.

    const paragraph = document.querySelector("p");

    paragraph.replaceWith("New text");

Старий `<p>` буде видалений, а замість нього з'явиться текстовий вузол.

---

# 17. `replaceWith()` як комбінація remove + insert

Концептуально:

    oldElement.remove();
    parent.append(newElement);

можна замінити на:

    oldElement.replaceWith(newElement);

Це зручно, коли потрібно замінити конкретний DOM-вузол.

---

# 18. Видалення через `outerHTML`

Технічно можна зробити:

    element.outerHTML = "";

Це видалить елемент із DOM.

### Приклад

    const message = document.querySelector(".message");

    message.outerHTML = "";

Але для звичайного видалення краще використовувати:

    message.remove();

`outerHTML = ""` менш очевидний і рідше потрібний.

---

# 19. Видалення батьківського елемента

Іноді подія відбувається на дочірньому елементі, але потрібно видалити весь блок.

HTML:

    <article class="card">
        <h2>Product</h2>
        <button class="delete">Delete</button>
    </article>

JavaScript:

    const button = document.querySelector(".delete");

    button.addEventListener("click", () => {
        button.parentElement.remove();
    });

Після натискання видаляється весь `.card`.

---

# 20. `parentElement`

Властивість:

    element.parentElement

повертає батьківський HTML-елемент.

### Приклад

    const button = document.querySelector(".delete");

    console.log(button.parentElement);

Якщо структура:

    <div class="card">
        <button class="delete">Delete</button>
    </div>

то:

    button.parentElement

буде:

    <div class="card">...</div>

---

# 21. Видалення через `closest()`

Для реальних компонентів часто краще використовувати `closest()`.

HTML:

    <article class="card">
        <h2>Product</h2>
        <button class="delete">Delete</button>
    </article>

JavaScript:

    const button = document.querySelector(".delete");

    button.addEventListener("click", () => {
        const card = button.closest(".card");

        card.remove();
    });

`closest()` шукає найближчого предка, який відповідає селектору.

Це надійніше, ніж:

    button.parentElement.remove();

якщо між кнопкою та `.card` можуть бути додаткові елементи.

---

# 22. Практичний приклад — Todo List

HTML:

    <ul id="todo-list">
        <li class="todo">
            <span>Learn JavaScript</span>
            <button class="delete">Delete</button>
        </li>

        <li class="todo">
            <span>Learn DOM</span>
            <button class="delete">Delete</button>
        </li>
    </ul>

JavaScript:

    const buttons = document.querySelectorAll(".delete");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const todo = button.closest(".todo");

            todo.remove();
        });
    });

Тепер кожна кнопка видаляє свій Todo.

---

# 23. Практичний приклад — видалення елемента після створення

HTML:

    <button id="add">Add</button>
    <div id="container"></div>

JavaScript:

    const addButton = document.querySelector("#add");
    const container = document.querySelector("#container");

    addButton.addEventListener("click", () => {
        const message = document.createElement("p");

        message.textContent = "Hello";

        container.append(message);

        setTimeout(() => {
            message.remove();
        }, 2000);
    });

Алгоритм:

    create
        ↓
    configure
        ↓
    append
        ↓
    remove

---

# 24. Практичний приклад — повідомлення з кнопкою Close

HTML:

    <div id="messages"></div>

JavaScript:

    const messages = document.querySelector("#messages");

    const message = document.createElement("div");
    const text = document.createElement("span");
    const closeButton = document.createElement("button");

    message.classList.add("message");

    text.textContent = "Operation completed";
    closeButton.textContent = "Close";

    closeButton.addEventListener("click", () => {
        message.remove();
    });

    message.append(text, closeButton);
    messages.append(message);

Тут кнопка знає конкретний DOM-вузол `message`, який потрібно видалити.

---

# 25. Видалення всіх елементів

### Варіант 1 — `forEach()`

    const items = document.querySelectorAll(".item");

    items.forEach((item) => {
        item.remove();
    });

### Варіант 2 — очистити контейнер

    const container = document.querySelector("#container");

    container.innerHTML = "";

### Варіант 3 — `replaceChildren()`

    const container = document.querySelector("#container");

    container.replaceChildren();

---

# 26. Коли використовувати який спосіб?

## Видалити один конкретний елемент

Використовуй:

    element.remove();

---

## Видалити child через parent

Використовуй:

    parent.removeChild(child);

Це особливо корисно для розуміння старого DOM API або коли робота побудована навколо parent/child.

---

## Очистити контейнер

Використовуй:

    container.replaceChildren();

або:

    container.innerHTML = "";

---

## Замінити елемент

Використовуй:

    element.replaceWith(newElement);

---

## Видалити атрибут

Використовуй:

    element.removeAttribute("class");

---

# 27. Важливий момент: видалення з DOM

Розглянемо:

    const button = document.querySelector("button");

    button.remove();

Після цього:

    button

як JavaScript-змінна все ще може посилатися на DOM-елемент.

Але цей елемент більше не знаходиться в DOM-документі.

Наприклад:

    const button = document.querySelector("button");

    button.remove();

    console.log(button);

Змінна все ще може містити посилання на Node.

Але:

    document.querySelector("button");

може повернути `null`, якщо це була єдина кнопка.

---

# 28. Видалення не дорівнює знищенню JavaScript-об'єкта

Це важлива концепція.

DOM-елемент є об'єктом JavaScript.

Коли ми робимо:

    element.remove();

ми прибираємо Node із DOM tree.

Але це не означає, що JavaScript-змінна миттєво перестає існувати.

Наприклад:

    const element = document.querySelector(".item");

    element.remove();

Змінна:

    element

ще існує.

Якщо більше немає посилань на об'єкт, JavaScript може згодом звільнити пам'ять через Garbage Collector.

---

# 29. Видалення елемента та його children

Якщо видалити батьківський елемент:

    parent.remove();

то його children також перестають бути частиною DOM tree.

Наприклад:

    <div class="parent">
        <p>One</p>
        <p>Two</p>
    </div>

Якщо:

    const parent = document.querySelector(".parent");

    parent.remove();

то весь піддеревний фрагмент:

    .parent
        ├── p
        └── p

видаляється з DOM.

---

# 30. `remove()` і Event Listeners

При роботі з динамічним DOM важливо розуміти, що видалення елемента прибирає його з DOM, але питання керування посиланнями та listener'ами складніше.

Наприклад:

    const button = document.querySelector("button");

    const handleClick = () => {
        console.log("click");
    };

    button.addEventListener("click", handleClick);

    button.remove();

Сам `<button>` більше не знаходиться в DOM.

Якщо на нього все ще існують інші JavaScript-посилання, об'єкт може залишатися доступним у пам'яті.

Тому в складних застосунках потрібно думати не тільки про DOM, а й про життєвий цикл компонентів та зовнішні посилання.

---

# 31. Видалення з масиву ≠ видалення з DOM

Це дуже важливо у фронтенді.

Припустимо:

    const users = [
        { id: 1, name: "Alex" },
        { id: 2, name: "John" }
    ];

Ми можемо видалити об'єкт із масиву:

    const newUsers = users.filter((user) => user.id !== 1);

Але це саме по собі не видалить HTML із DOM.

DOM потрібно окремо оновити.

Наприклад:

    users = users.filter((user) => user.id !== 1);

і:

    document.querySelector("#user-1").remove();

Це два різні рівні:

    Data
      ↓
    JavaScript state
      ↓
    DOM
      ↓
    UI

У сучасних фреймворках React/Next.js цей зв'язок частково автоматизований.

---

# 32. Видалення через event delegation

Для динамічних списків не обов'язково додавати listener на кожну кнопку.

HTML:

    <ul id="list">
        <li class="item">
            One
            <button class="delete">Delete</button>
        </li>

        <li class="item">
            Two
            <button class="delete">Delete</button>
        </li>
    </ul>

JavaScript:

    const list = document.querySelector("#list");

    list.addEventListener("click", (event) => {
        if (!event.target.matches(".delete")) {
            return;
        }

        const item = event.target.closest(".item");

        item.remove();
    });

Тут один listener знаходиться на `<ul>` і обробляє натискання на його дочірні кнопки.

Це називається **Event Delegation**.

---

# 33. Видалення з `NodeList`

`querySelectorAll()`:

    const items = document.querySelectorAll(".item");

повертає `NodeList`.

Можна:

    items.forEach((item) => {
        item.remove();
    });

Не потрібно вручну перетворювати його в масив тільки заради `forEach()`.

---

# 34. Чи можна видаляти елементи під час `forEach()`?

Так.

Наприклад:

    const items = document.querySelectorAll(".item");

    items.forEach((item) => {
        item.remove();
    });

Це нормально.

`querySelectorAll()` повертає статичний `NodeList`, тому набір елементів, який був отриманий під час пошуку, не змінюється через видалення.

---

# 35. `querySelectorAll()` і живі колекції

Не всі DOM-колекції поводяться однаково.

Наприклад:

    document.querySelectorAll(".item");

повертає статичний `NodeList`.

А:

    element.children

повертає `HTMLCollection`, яка є live collection.

Тому при складних операціях видалення потрібно розуміти, чи працюємо ми зі статичним набором чи live collection.

---

# 36. Небезпечна помилка — видаляти `null`

Неправильно:

    const item = document.querySelector(".item");

    item.remove();

Якщо `.item` немає:

    item === null

Безпечний варіант:

    const item = document.querySelector(".item");

    if (item) {
        item.remove();
    }

Або, якщо за логікою програми елемент гарантовано існує, можна не робити додаткову перевірку.

---

# 37. Небезпечна помилка — плутати `remove()` та `removeAttribute()`

Неправильно очікувати:

    element.removeAttribute("hidden");

що елемент зникне.

Насправді:

    element.removeAttribute("hidden");

тільки прибирає атрибут.

А:

    element.remove();

видаляє сам елемент.

---

# 38. Небезпечна помилка — очищення не того елемента

Приклад:

    const container = document.querySelector("#container");

    container.remove();

Це видалить весь контейнер.

Якщо потрібно було лише очистити його:

    container.innerHTML = "";

або:

    container.replaceChildren();

Тому перед видаленням завжди запитай себе:

> Я хочу видалити сам елемент чи його вміст?

---

# 39. Небезпечна помилка — `innerHTML = ""` замість точкового видалення

Якщо потрібно видалити один елемент:

    item.remove();

краще, ніж:

    container.innerHTML = "";

Тому що другий варіант видалить **усіх children контейнера**.

Наприклад:

    <div id="container">
        <p>One</p>
        <p>Two</p>
        <p>Three</p>
    </div>

Якщо потрібно видалити тільки `Two`, не можна просто робити:

    container.innerHTML = "";

---

# 40. Практичний алгоритм видалення

Коли потрібно видалити елемент:

### Крок 1. Знайти елемент

    const item = document.querySelector(".item");

### Крок 2. Переконатися, що він існує

    if (!item) {
        return;
    }

### Крок 3. Видалити

    item.remove();

Повний варіант:

    const item = document.querySelector(".item");

    if (!item) {
        return;
    }

    item.remove();

---

# 41. Практичний алгоритм для кнопки Delete

HTML:

    <article class="card">
        <h2>JavaScript</h2>
        <button class="delete">Delete</button>
    </article>

JavaScript:

    const button = document.querySelector(".delete");

    button.addEventListener("click", () => {
        const card = button.closest(".card");

        if (!card) {
            return;
        }

        card.remove();
    });

Ментальна модель:

    click
      ↓
    find parent component
      ↓
    remove component

---

# 42. Практичний приклад — очищення списку

HTML:

    <button id="clear">Clear</button>

    <ul id="list">
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
    </ul>

JavaScript:

    const clearButton = document.querySelector("#clear");
    const list = document.querySelector("#list");

    clearButton.addEventListener("click", () => {
        list.replaceChildren();
    });

Після натискання:

    <ul id="list"></ul>

---

# 43. Практичний приклад — Delete у списку

HTML:

    <ul id="list">
        <li class="item">
            Learn HTML
            <button class="delete">Delete</button>
        </li>

        <li class="item">
            Learn CSS
            <button class="delete">Delete</button>
        </li>

        <li class="item">
            Learn JavaScript
            <button class="delete">Delete</button>
        </li>
    </ul>

JavaScript:

    const list = document.querySelector("#list");

    list.addEventListener("click", (event) => {
        if (!event.target.matches(".delete")) {
            return;
        }

        const item = event.target.closest(".item");

        if (!item) {
            return;
        }

        item.remove();
    });

Це вже хороший практичний патерн для vanilla JavaScript.

---

# 44. DOM Tree і видалення

Уявімо DOM:

    document
      │
      └── body
          │
          └── main
              │
              └── ul
                  ├── li
                  ├── li
                  └── li

Якщо виконати:

    const list = document.querySelector("ul");

    list.children[1].remove();

DOM стане:

    document
      │
      └── body
          │
          └── main
              │
              └── ul
                  ├── li
                  └── li

Якщо:

    list.remove();

то:

    document
      │
      └── body
          │
          └── main

Сам `<ul>` і його children більше не знаходяться в DOM.

---

# 45. Видалення — частина CRUD

У багатьох застосунках DOM-операції можна розглядати як CRUD:

| CRUD | DOM |
|---|---|
| Create | `createElement()` |
| Read | `querySelector()` |
| Update | `textContent`, `classList`, `style` |
| Delete | `remove()` |

Це корисно для побудови ментальної моделі.

Наприклад:

    Create
      ↓
    createElement()

    Read
      ↓
    querySelector()

    Update
      ↓
    textContent / classList / attributes

    Delete
      ↓
    remove()

---

# 46. Що потрібно пам'ятати

1. `element.remove()` видаляє сам елемент із DOM.

2. `parent.removeChild(child)` видаляє child через parent.

3. Для сучасного коду найпростіший спосіб видалити один елемент:

       element.remove();

4. `container.innerHTML = ""` очищає вміст контейнера, але не видаляє сам контейнер.

5. `container.replaceChildren()` також очищає children.

6. `element.replaceWith(newElement)` замінює елемент.

7. `removeAttribute()` видаляє атрибут, а не елемент.

8. `closest()` дуже зручний для пошуку компонента, який потрібно видалити.

9. Якщо `querySelector()` не знайшов елемент, результатом буде `null`.

10. Видалення Node з DOM не означає автоматичне миттєве знищення JavaScript-об'єкта.

11. Видалення DOM-елемента і видалення даних із масиву — різні операції.

12. Для динамічних списків корисно знати Event Delegation.

---

# 47. Порівняльна таблиця

| Метод | Результат |
|---|---|
| `element.remove()` | видаляє element |
| `parent.removeChild(child)` | видаляє child |
| `container.innerHTML = ""` | очищає HTML усередині |
| `container.replaceChildren()` | видаляє всі children |
| `element.replaceWith(newElement)` | замінює element |
| `element.removeAttribute("class")` | видаляє атрибут |
| `element.outerHTML = ""` | технічно видаляє element |

### Основний вибір

    // Видалити один елемент
    element.remove();

    // Очистити контейнер
    container.replaceChildren();

    // Замінити елемент
    element.replaceWith(newElement);

    // Видалити атрибут
    element.removeAttribute("disabled");

---

# 48. Interview Questions

## Junior

### 1. Як видалити DOM-елемент?

    element.remove();

### 2. Що робить `removeChild()`?

Видаляє дочірній елемент через його parent.

    parent.removeChild(child);

### 3. Чим відрізняється `remove()` від `removeChild()`?

`remove()` викликається на самому елементі.

`removeChild()` викликається на parent.

### 4. Як очистити контейнер?

    container.innerHTML = "";

або:

    container.replaceChildren();

### 5. Як видалити атрибут?

    element.removeAttribute("disabled");

---

## Strong Junior

### 6. Як видалити всі елементи з певним класом?

    const items = document.querySelectorAll(".item");

    items.forEach((item) => {
        item.remove();
    });

### 7. Як видалити найближчий батьківський компонент?

    const card = button.closest(".card");

    card.remove();

### 8. Що станеться з children, якщо видалити parent?

Вони також перестануть бути частиною DOM tree, тому що знаходяться всередині видаленого піддерева.

### 9. Чи зникає JavaScript-змінна після `element.remove()`?

Ні. Посилання в змінній може залишатися.

---

## Middle

### 10. Чим відрізняються `innerHTML = ""` та `replaceChildren()`?

Обидва можуть очистити контейнер, але `replaceChildren()` працює без HTML-парсингу і безпосередньо замінює children DOM-вузлами.

### 11. Що таке Event Delegation?

Це техніка, коли один event listener встановлюється на parent і через bubbling обробляє події дочірніх елементів.

### 12. Чому `closest()` часто кращий за `parentElement`?

Тому що `closest()` шукає найближчого предка за селектором і не залежить від точної кількості вкладених елементів.

### 13. Чи видалення DOM-елемента гарантує негайне звільнення пам'яті?

Ні. Якщо на об'єкт залишилися JavaScript-посилання, він може залишатися доступним. Звільнення пам'яті контролюється Garbage Collector.

---

# 49. Рівні знань

## 🟢 Core

Потрібно знати:

- `remove()`
- `removeChild()`
- `innerHTML = ""`
- `removeAttribute()`
- `firstElementChild`
- `lastElementChild`

Вміти:

- видалити елемент;
- очистити контейнер;
- видалити атрибут;
- видалити перший/останній child.

---

## 🟡 Junior

Потрібно вміти:

- створювати елемент;
- вставляти елемент;
- видаляти елемент;
- робити Delete button;
- використовувати `closest()`;
- використовувати `querySelectorAll()`;
- очищати список;
- працювати з events.

Типовий патерн:

    click
      ↓
    find element
      ↓
    find component
      ↓
    remove()

---

## 🟠 Middle

Потрібно розуміти:

- DOM tree;
- parent/child relationships;
- static NodeList;
- live HTMLCollection;
- event bubbling;
- event delegation;
- життєвий цикл DOM-вузлів;
- references;
- Garbage Collection;
- різницю між state/data і DOM.

---

## 🔴 Senior

На більш високому рівні потрібно думати про:

- lifecycle компонентів;
- memory leaks;
- event listeners;
- references;
- event delegation;
- efficient DOM updates;
- rendering strategy;
- state → UI synchronization;
- Virtual DOM;
- reconciliation;
- component lifecycle у React;
- cleanup effects.

---

# 50. Міні-шпаргалка

    // Видалити елемент
    element.remove();

    // Видалити child через parent
    parent.removeChild(child);

    // Очистити контейнер
    container.innerHTML = "";

    // Очистити children
    container.replaceChildren();

    // Замінити елемент
    element.replaceWith(newElement);

    // Видалити атрибут
    element.removeAttribute("disabled");

    // Перший child
    parent.firstElementChild.remove();

    // Останній child
    parent.lastElementChild.remove();

    // Знайти найближчий компонент
    const card = button.closest(".card");

    // Видалити всі знайдені елементи
    document.querySelectorAll(".item").forEach((item) => {
        item.remove();
    });

---

# 51. Типовий Delete Pattern

Для практики запам'ятай цей шаблон:

    container.addEventListener("click", (event) => {
        if (!event.target.matches(".delete")) {
            return;
        }

        const item = event.target.closest(".item");

        if (!item) {
            return;
        }

        item.remove();
    });

Цей патерн зустрічається у:

- Todo List;
- списках користувачів;
- списках товарів;
- таблицях;
- повідомленнях;
- картках;
- коментарях;
- задачах.

---

# 52. Головне

Найважливіша команда цього розділу:

    element.remove();

Вона означає:

> Взяти цей DOM-елемент і прибрати його з DOM tree.

Для очищення контейнера:

    container.replaceChildren();

Для заміни:

    element.replaceWith(newElement);

Для атрибуту:

    element.removeAttribute("disabled");

А для типового UI-компонента:

    button
      ↓
    closest(".item")
      ↓
    remove()

---

# 53. Ментальна модель DOM

У попередніх темах ми розглядали:

    Select
      ↓
    Modify
      ↓
    Create
      ↓
    Insert
      ↓
    Remove

Тепер повний цикл роботи з DOM виглядає так:

    HTML / DOM
        ↓
    Select
        ↓
    Read
        ↓
    Modify
        ↓
    Create
        ↓
    Insert
        ↓
    Event
        ↓
    Remove
        ↓
    Updated DOM

Саме ця послідовність є основою роботи з DOM у vanilla JavaScript.

---

# 54. Зв'язок із наступними темами

Після `remove-elements` логічно переходити до:

    10-events

Тому що реальний сценарій видалення майже завжди виглядає так:

    User clicks Delete
            ↓
        Event
            ↓
        Find item
            ↓
        item.remove()

Тобто наступна важлива тема:

> **Events — як JavaScript реагує на дії користувача.**

Після цього:

    Event
      ↓
    Event Object
      ↓
    Bubbling
      ↓
    Event Delegation
      ↓
    Dynamic DOM
      ↓
    Delete / Update / Create

Це вже дає основу для створення повноцінних інтерактивних vanilla JavaScript застосунків.