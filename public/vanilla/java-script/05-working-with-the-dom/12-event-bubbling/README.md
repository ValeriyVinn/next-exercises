# 12. Event Bubbling у DOM

## 📌 Що таке Event Bubbling

**Event Bubbling** — це механізм поширення DOM-події від елемента, на якому подія фактично відбулася, **вгору по DOM-дереву** до його батьківських елементів.

Наприклад, якщо структура така:

    body
      ↓
    div
      ↓
    button

і користувач натиснув `button`, подія може пройти:

    button → div → body → html → document → window

Це називається **bubbling phase** — фаза спливання події.

---

## 🎯 Навіщо потрібен Event Bubbling

Event Bubbling лежить в основі багатьох важливих можливостей JavaScript:

- обробка подій на батьківських елементах;
- Event Delegation;
- робота з динамічно створеними елементами;
- визначення елемента, який фактично отримав подію через `event.target`;
- розуміння різниці між `target` і `currentTarget`;
- керування поширенням події через `stopPropagation()`;
- побудова складних UI без встановлення listener на кожну кнопку.

---

# 1. DOM як дерево

Перш ніж розбирати bubbling, потрібно уявляти DOM як дерево.

Наприклад:

    <body>
        <div class="container">
            <button class="btn">
                Click
            </button>
        </div>
    </body>

Умовно:

    body
      │
      └── div.container
            │
            └── button.btn

Якщо натиснути `button`, подія виникає на `button`.

Але вона може поширитися на:

    button
      ↓
    div
      ↓
    body
      ↓
    html
      ↓
    document
      ↓
    window

Саме це і є **bubbling**.

---

# 2. Три фази DOM Event

У DOM Events умовно виділяють три фази:

1. Capturing phase
2. Target phase
3. Bubbling phase

Схема:

    window
      ↓
    document
      ↓
    html
      ↓
    body
      ↓
    div
      ↓
    button
      ↑
    target
      ↑
    div
      ↑
    body
      ↑
    html
      ↑
    document
      ↑
    window

Спочатку подія може рухатися **вниз** до target.

Потім досягає самого елемента.

Після цього може рухатися **вгору**.

---

# 3. Capturing vs Target vs Bubbling

## Capturing

Подія рухається:

    window → document → html → body → parent → target

Це називається **capturing phase**.

---

## Target

Подія досягає елемента, на якому вона відбулася.

Наприклад:

    button

Це **target phase**.

---

## Bubbling

Після target подія рухається вгору:

    target → parent → body → html → document → window

Це **bubbling phase**.

---

# 4. Простий приклад bubbling

HTML:

    <div id="parent">
        <button id="child">Click</button>
    </div>

JavaScript:

    const parent = document.querySelector("#parent");
    const child = document.querySelector("#child");

    parent.addEventListener("click", () => {
        console.log("parent");
    });

    child.addEventListener("click", () => {
        console.log("child");
    });

Якщо натиснути кнопку:

    child
    parent

Чому?

Тому що подія:

1. виникла на `button`;
2. обробилася на `button`;
3. спливла до `div`;
4. `div` також має `click` listener.

---

# 5. Event Bubbling — подія не копіюється

Важливо правильно розуміти механізм.

Не відбувається так:

    click button
    ↓
    створюється новий click для div
    ↓
    створюється новий click для body

Це **одна й та сама подія**, яка поширюється через DOM.

Тому в різних listener'ах можна отримати той самий об'єкт `event`.

    const parent = document.querySelector("#parent");
    const child = document.querySelector("#child");

    parent.addEventListener("click", (event) => {
        console.log(event);
    });

    child.addEventListener("click", (event) => {
        console.log(event);
    });

---

# 6. `event.target`

`event.target` — це елемент, **на якому подія фактично відбулася**.

HTML:

    <div id="parent">
        <button id="child">Click</button>
    </div>

JavaScript:

    const parent = document.querySelector("#parent");

    parent.addEventListener("click", (event) => {
        console.log(event.target);
    });

Якщо натиснути кнопку:

    <button id="child">Click</button>

то:

    event.target

буде:

    button#child

Навіть якщо listener встановлений на `div`.

---

# 7. `event.currentTarget`

`event.currentTarget` — це елемент, **на якому зараз виконується listener**.

Наприклад:

    const parent = document.querySelector("#parent");

    parent.addEventListener("click", (event) => {
        console.log(event.target);
        console.log(event.currentTarget);
    });

Якщо натиснути кнопку всередині `parent`:

    event.target
    → button

    event.currentTarget
    → div#parent

---

# 8. `target` vs `currentTarget`

Це одна з найважливіших тем Event Bubbling.

| Властивість | Що означає |
|---|---|
| `event.target` | де подія фактично виникла |
| `event.currentTarget` | де зараз виконується listener |

Приклад:

    <div id="parent">
        <button id="child">Click</button>
    </div>

    parent.addEventListener("click", (event) => {
        console.log("target:", event.target);
        console.log("currentTarget:", event.currentTarget);
    });

При натисканні кнопки:

    target:
    button#child

    currentTarget:
    div#parent

---

# 9. Чому `target` не змінюється

Уявімо:

    <body>
        <div>
            <button>
                Click
            </button>
        </div>
    </body>

Користувач натиснув кнопку.

Під час bubbling:

    button
      ↓
    div
      ↓
    body

`event.target` залишається:

    button

А `event.currentTarget` змінюється залежно від listener:

    button listener
    currentTarget → button

    div listener
    currentTarget → div

    body listener
    currentTarget → body

Тобто:

    target = початкове джерело події

    currentTarget = поточний обробник

---

# 10. Простий приклад для запам'ятовування

Уяви:

> Людина кинула камінь у воду.

`event.target`:

> де камінь впав у воду.

`event.currentTarget`:

> де зараз спостерігаємо хвилю.

Для DOM:

    target
    ↓
    "Де подія виникла?"

    currentTarget
    ↓
    "На якому елементі зараз працює listener?"

---

# 11. Bubbling працює не для всіх подій однаково

Не всі DOM-події спливають.

Для багатьох поширених подій bubbling є стандартною поведінкою:

- `click`
- `dblclick`
- `mousedown`
- `mouseup`
- `mousemove`
- `keydown`
- `keyup`
- `input`
- `change`
- `submit`

Але існують події, які не bubbling або мають особливості.

Наприклад:

    focus
    blur

не спливають звичайним способом.

Для делегування часто використовують:

    focusin
    focusout

які підтримують bubbling.

---

# 12. Перевірка bubbling через `event.bubbles`

У Event Object є властивість:

    event.bubbles

Вона показує, чи є подія такою, що може спливати.

Приклад:

    button.addEventListener("click", (event) => {
        console.log(event.bubbles);
    });

Для звичайного `click`:

    true

---

# 13. Приклад із трьома рівнями

HTML:

    <div id="grandparent">
        <div id="parent">
            <button id="child">Click</button>
        </div>
    </div>

JavaScript:

    const grandparent = document.querySelector("#grandparent");
    const parent = document.querySelector("#parent");
    const child = document.querySelector("#child");

    grandparent.addEventListener("click", () => {
        console.log("grandparent");
    });

    parent.addEventListener("click", () => {
        console.log("parent");
    });

    child.addEventListener("click", () => {
        console.log("child");
    });

Натискаємо:

    button

Результат:

    child
    parent
    grandparent

Тому що подія спливає:

    child
      ↑
    parent
      ↑
    grandparent

---

# 14. Bubbling до `body`

HTML:

    <body>
        <div id="container">
            <button id="button">Click</button>
        </div>
    </body>

JavaScript:

    document.body.addEventListener("click", (event) => {
        console.log("body");
        console.log(event.target);
    });

При натисканні кнопки listener `body` також може спрацювати.

`event.target`:

    button

---

# 15. Bubbling до `document`

Подія може поширюватися ще вище:

    button
      ↓
    div
      ↓
    body
      ↓
    html
      ↓
    document

Наприклад:

    document.addEventListener("click", (event) => {
        console.log("document");
        console.log(event.target);
    });

Це часто використовується в Event Delegation.

---

# 16. Зупинка bubbling — `stopPropagation()`

Іноді потрібно не дозволити події продовжити поширення.

Для цього:

    event.stopPropagation();

Приклад:

    const parent = document.querySelector("#parent");
    const child = document.querySelector("#child");

    parent.addEventListener("click", () => {
        console.log("parent");
    });

    child.addEventListener("click", (event) => {
        console.log("child");

        event.stopPropagation();
    });

Тепер при натисканні:

    child

отримаємо:

    child

А:

    parent

не виконається.

---

# 17. Як працює `stopPropagation()`

Без `stopPropagation()`:

    child
      ↓
    parent
      ↓
    body

З `stopPropagation()`:

    child
      X
    parent

Подія не продовжує поширюватися далі.

---

# 18. `stopPropagation()` не зупиняє інші listener'и на тому самому елементі

Це важливий момент.

HTML:

    <button id="button">
        Click
    </button>

JavaScript:

    button.addEventListener("click", (event) => {
        console.log("listener 1");

        event.stopPropagation();
    });

    button.addEventListener("click", () => {
        console.log("listener 2");
    });

При натисканні:

    listener 1
    listener 2

`stopPropagation()` зупиняє поширення між елементами, але не всі listener'и поточного елемента.

---

# 19. `stopImmediatePropagation()`

Якщо потрібно зупинити:

1. bubbling;
2. інші listener'и на поточному елементі;

використовується:

    event.stopImmediatePropagation();

Приклад:

    button.addEventListener("click", (event) => {
        console.log("listener 1");

        event.stopImmediatePropagation();
    });

    button.addEventListener("click", () => {
        console.log("listener 2");
    });

Результат:

    listener 1

`listener 2` вже не виконається.

---

# 20. `stopPropagation()` vs `stopImmediatePropagation()`

| Метод | Зупиняє bubbling | Зупиняє інші listener'и |
|---|---:|---:|
| `stopPropagation()` | ✅ | ❌ |
| `stopImmediatePropagation()` | ✅ | ✅ |

Запам'ятай:

    stopPropagation()
    → зупини поширення

    stopImmediatePropagation()
    → зупини поширення + наступні listener'и

---

# 21. Event Bubbling і вкладені кнопки

Розглянемо практичний приклад.

HTML:

    <div class="card">
        <button class="delete-btn">Delete</button>
    </div>

    <script>
        const card = document.querySelector(".card");
        const deleteButton = document.querySelector(".delete-btn");

        card.addEventListener("click", () => {
            console.log("Card clicked");
        });

        deleteButton.addEventListener("click", (event) => {
            console.log("Delete clicked");
        });
    </script>

При натисканні `Delete`:

    Delete clicked
    Card clicked

Тому що `click` спочатку обробляється кнопкою, а потім спливає до `card`.

---

# 22. Зупиняємо bubbling кнопки

Якщо не хочемо, щоб натискання `Delete` активувало `card`:

    deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();

        console.log("Delete clicked");
    });

Тепер:

    Delete clicked

А:

    Card clicked

не виконається.

---

# 23. Але `stopPropagation()` не завжди є найкращим рішенням

`stopPropagation()` корисний, але не варто використовувати його всюди.

Наприклад, якщо у великому застосунку багато компонентів покладаються на bubbling, безконтрольне використання:

    event.stopPropagation();

може ускладнити логіку.

Тому спочатку варто запитати:

> Чи справді потрібно зупиняти bubbling?

Дуже часто правильним рішенням є не зупинка події, а правильна перевірка:

    event.target

або:

    event.closest()

---

# 24. Event Bubbling → Event Delegation

Одне з найважливіших практичних застосувань bubbling — **Event Delegation**.

Замість того щоб додавати listener кожній кнопці:

    button1.addEventListener(...)
    button2.addEventListener(...)
    button3.addEventListener(...)
    button4.addEventListener(...)

можна поставити один listener на батьківський елемент:

    container.addEventListener(...)

А потім визначити, на який дочірній елемент натиснули.

---

# 25. Простий Event Delegation

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

Якщо натиснути:

    JavaScript

то:

    event.target

буде відповідний:

    <li>JavaScript</li>

Чому listener на `ul` бачить `li`?

Через bubbling.

---

# 26. Event Delegation з `matches()`

Можна перевірити:

    event.target.matches()

Приклад:

    list.addEventListener("click", (event) => {
        if (event.target.matches("li")) {
            console.log("Clicked:", event.target.textContent);
        }
    });

Тепер код реагує тільки на `li`.

---

# 27. Event Delegation з `closest()`

У реальному UI часто натискають не безпосередньо на елемент, а на його внутрішню частину.

Наприклад:

    <button class="delete-btn">
        <span>Delete</span>
    </button>

Якщо користувач натиснув `span`:

    event.target

може бути:

    span

А нам потрібна:

    button

Тоді:

    list.addEventListener("click", (event) => {
        const button = event.target.closest(".delete-btn");

        if (!button) {
            return;
        }

        console.log("Delete");
    });

`closest()` піднімається від `target` вгору по DOM і знаходить найближчого предка, який відповідає селектору.

---

# 28. Event Delegation для Todo List

HTML:

    <ul id="todo-list">
        <li>
            <span>Learn JavaScript</span>
            <button class="delete-btn">Delete</button>
        </li>

        <li>
            <span>Learn DOM</span>
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

        item.remove();
    });

Перевага:

Не потрібно створювати listener для кожної кнопки.

Один listener працює для всього списку.

---

# 29. Event Delegation і динамічні елементи

Це особливо важливо.

Уявімо:

    const list = document.querySelector("#list");

    list.addEventListener("click", (event) => {
        if (event.target.matches("li")) {
            console.log(event.target.textContent);
        }
    });

Потім JavaScript створив новий `li`:

    const li = document.createElement("li");

    li.textContent = "New item";

    list.append(li);

Новий `li` теж працюватиме.

Чому?

Тому що listener знаходиться на `list`, а подія нового `li` спливає до `list`.

---

# 30. Без Event Delegation

Наприклад:

    const buttons = document.querySelectorAll(".delete-btn");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            console.log("Delete");
        });
    });

Це працює для кнопок, які існували на момент виконання коду.

Але якщо пізніше створити нову кнопку:

    const button = document.createElement("button");

    button.classList.add("delete-btn");
    button.textContent = "Delete";

    document.body.append(button);

новий `button` не матиме listener.

---

# 31. З Event Delegation

Можна зробити:

    const container = document.querySelector("#container");

    container.addEventListener("click", (event) => {
        const button = event.target.closest(".delete-btn");

        if (!button) {
            return;
        }

        console.log("Delete");
    });

Тепер навіть нові кнопки всередині `container` працюватимуть.

---

# 32. Bubbling і динамічний DOM

Це одна з головних причин знати Event Bubbling.

Схема:

    parent
      │
      ├── child
      ├── child
      └── child

Замість:

    child.addEventListener(...)
    child.addEventListener(...)
    child.addEventListener(...)

можна:

    parent.addEventListener(...)

І використовувати:

    event.target

або:

    event.target.closest(...)

---

# 33. Важливе правило для Event Delegation

Не завжди:

    event.target

є безпосереднім дочірнім елементом, який нас цікавить.

Наприклад:

    <button class="action">
        <span>Save</span>
    </button>

При натисканні на текст:

    event.target === span

Тому часто краще:

    const button = event.target.closest(".action");

---

# 34. Перевірка меж контейнера

При використанні `closest()` потрібно переконатися, що знайдений елемент належить потрібному контейнеру.

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

Це особливо корисно у складному DOM.

---

# 35. Bubbling і `this`

Розглянемо:

    parent.addEventListener("click", function (event) {
        console.log(this);
        console.log(event.currentTarget);
    });

У звичайній function:

    this

буде елементом, на якому встановлений listener.

Тобто:

    this === event.currentTarget

У цьому випадку:

    parent

Але:

    event.target

може бути дочірнім `button`.

---

# 36. Arrow function і `this`

З arrow function:

    parent.addEventListener("click", (event) => {
        console.log(this);
    });

`this` не прив'язується до `parent`.

Тому для DOM-подій краще орієнтуватися на:

    event.currentTarget

Це більш явний і зрозумілий спосіб.

---

# 37. `event.target` може бути текстом або вкладеним елементом

Наприклад:

    <button>
        <span>Save</span>
    </button>

Користувач може натиснути:

    span

Тоді:

    event.target

буде:

    span

А не:

    button

Тому для складних елементів UI часто використовується:

    event.target.closest("button")

---

# 38. Bubbling і `currentTarget`

При bubbling `currentTarget` залежить від listener.

HTML:

    <div id="parent">
        <button id="child">Click</button>
    </div>

JavaScript:

    parent.addEventListener("click", function (event) {
        console.log("parent:", event.currentTarget);
    });

    child.addEventListener("click", function (event) {
        console.log("child:", event.currentTarget);
    });

Натискаємо `button`.

Результат:

    child:
    button

    parent:
    div

А:

    event.target

в обох випадках:

    button

---

# 39. Bubbling і `eventPhase`

Event Object має властивість:

    event.eventPhase

Вона показує фазу поширення події.

Основні значення:

    1 → CAPTURING_PHASE

    2 → AT_TARGET

    3 → BUBBLING_PHASE

Наприклад:

    parent.addEventListener("click", (event) => {
        console.log(event.eventPhase);
    });

Під час bubbling значення буде:

    3

---

# 40. Bubbling за замовчуванням

Для подій, які підтримують bubbling, звичайний:

    addEventListener("click", handler);

працює у bubbling phase.

Тобто:

    element.addEventListener(
        "click",
        handler
    );

еквівалентно за поведінкою:

    element.addEventListener(
        "click",
        handler,
        {
            capture: false
        }
    );

---

# 41. Як `capture` змінює порядок

Можна встановити:

    capture: true

Тоді listener працюватиме під час capturing phase.

HTML:

    <div id="parent">
        <button id="child">Click</button>
    </div>

JavaScript:

    parent.addEventListener(
        "click",
        () => {
            console.log("parent");
        },
        { capture: true }
    );

    child.addEventListener("click", () => {
        console.log("child");
    });

Результат:

    parent
    child

Тому що parent listener працює під час capturing.

---

# 42. Capture vs Bubble

Без `capture: true`:

    child
      ↓
    parent

Результат:

    child
    parent

З `capture: true` на parent:

    parent
      ↓
    child

Результат:

    parent
    child

---

# 43. Повна картина

HTML:

    <div id="grandparent">
        <div id="parent">
            <button id="child">
                Click
            </button>
        </div>
    </div>

Можна уявити подію так:

    CAPTURING

    window
      ↓
    document
      ↓
    html
      ↓
    body
      ↓
    grandparent
      ↓
    parent
      ↓
    child

    TARGET

    child

    BUBBLING

    child
      ↑
    parent
      ↑
    grandparent
      ↑
    body
      ↑
    html
      ↑
    document
      ↑
    window

---

# 44. `stopPropagation()` під час capturing

Зупинити подію можна і під час capturing.

Наприклад:

    parent.addEventListener(
        "click",
        (event) => {
            console.log("parent");

            event.stopPropagation();
        },
        { capture: true }
    );

Якщо подія проходить через `parent`, propagation може бути зупинена ще до досягнення target.

---

# 45. Bubbling не означає "виконання всіх батьків"

Подія не обов'язково виконає код на кожному батьківському елементі.

Listener повинен існувати.

Наприклад:

    <body>
        <div id="parent">
            <button id="child">Click</button>
        </div>
    </body>

Якщо listener є тільки на `body`:

    document.body.addEventListener("click", () => {
        console.log("body");
    });

то результат:

    body

Немає listener на `div`, тому нічого там не виконується.

---

# 46. Bubbling і `preventDefault()` — це різні речі

Дуже важливо не плутати:

    event.preventDefault();

і:

    event.stopPropagation();

`preventDefault()`:

> скасовує стандартну браузерну дію.

Наприклад:

    link.addEventListener("click", (event) => {
        event.preventDefault();
    });

`stopPropagation()`:

> зупиняє поширення події по DOM.

Вони вирішують різні задачі.

---

# 47. Порівняння трьох методів

| Метод | Що робить |
|---|---|
| `preventDefault()` | скасовує стандартну дію браузера |
| `stopPropagation()` | зупиняє поширення події |
| `stopImmediatePropagation()` | зупиняє поширення + наступні listener'и |

Наприклад:

    event.preventDefault();

не означає:

    event.stopPropagation();

І навпаки.

---

# 48. Практичний приклад: Card + Delete

HTML:

    <div class="card" data-id="10">
        <h3>JavaScript</h3>
        <button class="delete-btn">Delete</button>
    </div>

JavaScript:

    const card = document.querySelector(".card");
    const deleteButton = document.querySelector(".delete-btn");

    card.addEventListener("click", () => {
        console.log("Open card");
    });

    deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();

        console.log("Delete card");
    });

Логіка:

    click card
    → Open card

    click delete
    → Delete card

`stopPropagation()` тут не дає `click` кнопки дійти до `card`.

---

# 49. Практичний приклад: список дій

HTML:

    <ul id="users">
        <li data-id="1">
            <span>John</span>
            <button class="delete">Delete</button>
        </li>

        <li data-id="2">
            <span>Mary</span>
            <button class="delete">Delete</button>
        </li>
    </ul>

JavaScript:

    const users = document.querySelector("#users");

    users.addEventListener("click", (event) => {
        const deleteButton = event.target.closest(".delete");

        if (!deleteButton) {
            return;
        }

        const user = deleteButton.closest("li");

        console.log("Delete user:", user.dataset.id);
    });

Результат при натисканні другої кнопки:

    Delete user: 2

Це класичний Event Delegation.

---

# 50. Практичний приклад: різні кнопки

HTML:

    <div id="actions">
        <button data-action="save">Save</button>
        <button data-action="edit">Edit</button>
        <button data-action="delete">Delete</button>
    </div>

JavaScript:

    const actions = document.querySelector("#actions");

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

Один listener обробляє всі кнопки.

---

# 51. Практичний приклад: вкладені елементи

HTML:

    <div id="menu">
        <button class="menu-item">
            <span>Home</span>
        </button>

        <button class="menu-item">
            <span>About</span>
        </button>
    </div>

JavaScript:

    menu.addEventListener("click", (event) => {
        const item = event.target.closest(".menu-item");

        if (!item) {
            return;
        }

        console.log(item.textContent.trim());
    });

Якщо натиснути `span`, ми все одно отримаємо правильну кнопку.

---

# 52. Коли використовувати Event Delegation

Event Delegation особливо корисний, коли:

- багато однотипних елементів;
- елементи створюються динамічно;
- список може змінюватися;
- таблиця має багато кнопок;
- Todo List;
- меню;
- dropdown;
- список користувачів;
- кошик;
- таблиця даних;
- компоненти з action-кнопками.

---

# 53. Коли Event Delegation може бути зайвим

Не потрібно штучно використовувати delegation всюди.

Наприклад:

    const button = document.querySelector("#submit");

    button.addEventListener("click", handleSubmit);

Для однієї кнопки простий listener цілком нормальний.

Event Delegation найбільш корисний, коли є:

    багато елементів
    +
    спільний контейнер
    +
    однакова або пов'язана логіка

---

# 54. Типова помилка №1 — плутати `target` і `currentTarget`

Неправильно думати:

    event.target

завжди дорівнює елементу, на якому listener.

Ні.

При bubbling:

    event.target
    → початковий елемент

    event.currentTarget
    → елемент listener

---

# 55. Типова помилка №2 — очікувати bubbling від `focus`

Наприклад:

    parent.addEventListener("focus", handler);

Не варто автоматично очікувати, що `focus` буде bubbling як `click`.

Для делегування фокусу використовуй:

    focusin

та:

    focusout

---

# 56. Типова помилка №3 — використовувати `stopPropagation()` всюди

Не треба робити:

    button.addEventListener("click", (event) => {
        event.stopPropagation();
    });

просто "щоб подія не заважала".

Спочатку потрібно зрозуміти:

- який listener реагує;
- чому він реагує;
- чи потрібен bubbling;
- чи достатньо перевірити `target`;
- чи потрібно використовувати delegation.

---

# 57. Типова помилка №4 — Event Delegation без перевірки `target`

Наприклад:

    container.addEventListener("click", (event) => {
        event.target.remove();
    });

Це небезпечно.

Тепер можна випадково видалити:

- `span`;
- `p`;
- `img`;
- сам контейнер або інший елемент залежно від логіки.

Краще:

    container.addEventListener("click", (event) => {
        const button = event.target.closest(".delete");

        if (!button) {
            return;
        }

        button.closest(".item")?.remove();
    });

---

# 58. Типова помилка №5 — забувати про вкладені елементи

Є:

    <button class="delete">
        <span>Delete</span>
    </button>

І код:

    if (event.target.matches(".delete")) {
        // ...
    }

Якщо натиснули `span`, умова:

    event.target.matches(".delete")

буде `false`.

Часто краще:

    const button = event.target.closest(".delete");

---

# 59. Типова помилка №6 — плутати bubbling із capture

Запам'ятай:

    capture
    ↓
    зверху вниз

    target
    ↓
    конкретний елемент

    bubble
    ↓
    знизу вгору

Схема:

    window
      ↓
    parent
      ↓
    child
      ↑
    parent
      ↑
    window

---

# 60. Типова помилка №7 — думати, що bubbling створює нові події

Ні.

Це одна подія, яка поширюється через DOM.

Тому:

    event.target

зберігає початкове джерело події.

---

# 61. Як дебажити bubbling

Коли незрозуміло, чому listener спрацював, виведи:

    element.addEventListener("click", (event) => {
        console.log("type:", event.type);
        console.log("target:", event.target);
        console.log("currentTarget:", event.currentTarget);
        console.log("bubbles:", event.bubbles);
        console.log("eventPhase:", event.eventPhase);
    });

Це часто одразу показує проблему.

---

# 62. Зручний debug helper

Можна тимчасово використовувати:

    function debugEvent(event) {
        console.log({
            type: event.type,
            target: event.target,
            currentTarget: event.currentTarget,
            bubbles: event.bubbles,
            eventPhase: event.eventPhase
        });
    }

І:

    container.addEventListener("click", debugEvent);

---

# 63. Mental Model

Для кожної події постав собі п'ять запитань:

### 1. Де виникла подія?

    event.target

### 2. Де зараз працює listener?

    event.currentTarget

### 3. Чи може вона спливати?

    event.bubbles

### 4. На якій ми фазі?

    event.eventPhase

### 5. Чи потрібно зупинити поширення?

    event.stopPropagation()

---

# 64. Головний алгоритм розуміння bubbling

Коли натиснули кнопку:

    1. Подія виникла на button.

    2. Браузер проходить capturing phase.

    3. Подія досягає button.

    4. Виконуються listener'и target.

    5. Подія починає bubbling.

    6. Подія переходить до parent.

    7. Потім до наступного parent.

    8. І так далі.

    9. Якщо викликати stopPropagation(),
       поширення припиняється.

---

# 65. Bubbling → Delegation → Dynamic UI

Це дуже важливий ланцюжок для frontend-розробника:

    Event
      ↓
    Event Bubbling
      ↓
    event.target
      ↓
    Event Delegation
      ↓
    Dynamic Elements
      ↓
    Interactive UI

Саме тому Event Bubbling — не просто теоретична особливість DOM.

Він безпосередньо використовується в реальних frontend-застосунках.

---

# 66. Міні-практика №1 — три рівні

Створи:

    <div id="outer">
        <div id="middle">
            <button id="inner">
                Click
            </button>
        </div>
    </div>

Додай `click` listener на всі три елементи.

Очікуй:

    inner
    middle
    outer

---

# 67. Міні-практика №2 — target/currentTarget

Для тих самих елементів виведи:

    event.target

і:

    event.currentTarget

Порівняй результати на кожному рівні.

Очікуваний принцип:

    target
    → завжди button

    currentTarget
    → inner / middle / outer

---

# 68. Міні-практика №3 — stopPropagation

Додай:

    event.stopPropagation();

на `inner`.

Перевір:

    inner

А `middle` і `outer` більше не повинні виконувати свої listener'и.

---

# 69. Міні-практика №4 — Event Delegation

Створи:

    <ul id="list">
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

Постав один listener на `ul`.

При натисканні на `li` виводь:

    You clicked: JavaScript

Не став listener безпосередньо на `li`.

---

# 70. Міні-практика №5 — динамічний елемент

Створи `li` через JavaScript:

    const li = document.createElement("li");

    li.textContent = "React";

    list.append(li);

Перевір, що Event Delegation все одно працює для нового елемента.

---

# 71. Міні-практика №6 — Delete buttons

Створи список:

    <ul id="list">
        <li>
            HTML
            <button class="delete">Delete</button>
        </li>

        <li>
            CSS
            <button class="delete">Delete</button>
        </li>

        <li>
            JavaScript
            <button class="delete">Delete</button>
        </li>
    </ul>

Постав один listener на `ul`.

При натисканні `Delete`:

    button
      ↓
    closest("li")
      ↓
    remove()

---

# 72. Міні-практика №7 — вкладений span

Зроби:

    <button class="delete">
        <span>Delete</span>
    </button>

Перевір, що код:

    event.target.closest(".delete")

працює незалежно від того, натиснули на `button` чи `span`.

---

# 73. Міні-практика №8 — Card actions

Створи:

    <article class="card">
        <h2>JavaScript</h2>

        <button data-action="open">
            Open
        </button>

        <button data-action="delete">
            Delete
        </button>
    </article>

Використай один listener на `card`.

Залежно від:

    event.target.closest("button")?.dataset.action

виконуй різні дії.

---

# 74. Питання для співбесіди

### Junior

1. Що таке Event Bubbling?
2. У якому напрямку поширюється bubbling?
3. Що таке `event.target`?
4. Що таке `event.currentTarget`?
5. Яка різниця між `target` і `currentTarget`?
6. Що робить `stopPropagation()`?
7. Чим `stopPropagation()` відрізняється від `preventDefault()`?
8. Що таке Event Delegation?

### Middle

9. Які є фази DOM Event?
10. Що таке capturing phase?
11. Що таке target phase?
12. Що таке bubbling phase?
13. Як `capture: true` змінює порядок виконання?
14. Чому Event Delegation працює?
15. Чому delegation працює для динамічно створених елементів?
16. Чим `stopPropagation()` відрізняється від `stopImmediatePropagation()`?
17. Чому `event.target` може бути `span`, коли ми очікували `button`?
18. Для чого використовується `closest()` у delegation?

### Strong Middle / Senior

19. Які події не bubbling?
20. Чим `focus` відрізняється від `focusin`?
21. Як propagation пов'язаний з архітектурою UI?
22. Коли Event Delegation може бути недоречним?
23. Які проблеми може створити надмірне використання `stopPropagation()`?
24. Як працюють capture та bubble listener'и в одній події?
25. Як дебажити складний ланцюжок propagation?

---

# 75. Рівні знань

## 🟢 Core

Потрібно знати:

- що таке Event Bubbling;
- DOM як дерево;
- `event.target`;
- `event.currentTarget`;
- `event.bubbles`;
- bubbling для `click`;
- `stopPropagation()`.

---

## 🟡 Junior

Вміти:

- пояснити bubbling;
- розрізняти target/currentTarget;
- використовувати `stopPropagation()`;
- працювати з вкладеними елементами;
- використовувати `closest()`;
- реалізовувати простий Event Delegation;
- обробляти динамічні елементи.

---

## 🟠 Middle

Вміти:

- розуміти всі фази event propagation;
- використовувати capture;
- будувати delegation для складних UI;
- працювати з `dataset`;
- правильно обробляти вкладені елементи;
- розуміти `stopPropagation()` vs `stopImmediatePropagation()`;
- дебажити propagation;
- уникати зайвого використання `stopPropagation()`.

---

## 🔴 Senior

Розуміти:

- повний lifecycle DOM Event;
- capturing / target / bubbling;
- event delegation як архітектурний патерн;
- propagation у складному UI;
- взаємодію propagation із component architecture;
- проблеми надмірного глобального delegation;
- propagation у shadow DOM та `composed` events;
- оптимізацію event listeners у великих інтерфейсах.

---

# 76. Міні-шпаргалка

## Event Bubbling

    target
      ↑
    parent
      ↑
    grandparent
      ↑
    document
      ↑
    window

---

## Target

    event.target

Де подія виникла.

---

## Current Target

    event.currentTarget

На якому елементі зараз виконується listener.

---

## Чи bubbling?

    event.bubbles

---

## Зупинити bubbling

    event.stopPropagation();

---

## Зупинити bubbling + інші listener'и

    event.stopImmediatePropagation();

---

## Скасувати стандартну дію

    event.preventDefault();

---

## Event Delegation

    container.addEventListener("click", (event) => {
        const element = event.target.closest(".item");

        if (!element) {
            return;
        }

        // action
    });

---

## Capture

    element.addEventListener(
        "click",
        handler,
        { capture: true }
    );

---

# 77. Головне, що потрібно запам'ятати

### 1. DOM-подія може поширюватися вгору

    child
      ↑
    parent
      ↑
    grandparent

Це Event Bubbling.

---

### 2. `event.target` — джерело події

    event.target

> На якому елементі подія фактично відбулася?

---

### 3. `event.currentTarget` — поточний listener

    event.currentTarget

> На якому елементі зараз виконується listener?

---

### 4. `stopPropagation()` зупиняє поширення

    event.stopPropagation();

---

### 5. `preventDefault()` робить інше

    event.preventDefault();

Він скасовує стандартну дію браузера.

---

### 6. Bubbling дозволяє Event Delegation

Замість:

    button1 → listener
    button2 → listener
    button3 → listener

можна:

    container → один listener

і визначати:

    event.target

або:

    event.target.closest(...)

---

### 7. Event Delegation особливо корисний для динамічного UI

    container
       ↓
    dynamic children
       ↓
    bubbling
       ↓
    one listener

---

# 78. Mental Model — одна схема

Запам'ятай цю картину:

    ┌──────────────────────────────┐
    │           window             │
    └──────────────┬───────────────┘
                   ↓
              capturing
                   ↓
    ┌──────────────────────────────┐
    │          document            │
    └──────────────┬───────────────┘
                   ↓
    ┌──────────────────────────────┐
    │            body              │
    └──────────────┬───────────────┘
                   ↓
    ┌──────────────────────────────┐
    │            div               │
    └──────────────┬───────────────┘
                   ↓
    ┌──────────────────────────────┐
    │           button             │
    │            TARGET            │
    └──────────────┬───────────────┘
                   ↑
                bubbling
                   ↑
    ┌──────────────────────────────┐
    │            div               │
    └──────────────┬───────────────┘
                   ↑
    ┌──────────────────────────────┐
    │            body              │
    └──────────────┬───────────────┘
                   ↑
    ┌──────────────────────────────┐
    │          document            │
    └──────────────┬───────────────┘
                   ↑
    ┌──────────────────────────────┐
    │           window             │
    └──────────────────────────────┘

Головна ідея:

    Event
      ↓
    Capture
      ↓
    Target
      ↓
    Bubble
      ↓
    Parent
      ↓
    Parent
      ↓
    Document

А практична формула для frontend:

    Bubbling
       ↓
    event.target
       ↓
    Event Delegation
       ↓
    Dynamic UI

Саме цю частину потрібно особливо добре зрозуміти перед переходом до наступної теми.