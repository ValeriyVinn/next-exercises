# 10. Events — Події в DOM

## 📌 Вступ

**Event** — це подія, яка відбувається в браузері та на яку JavaScript може відреагувати.

Наприклад:

- користувач натиснув кнопку;
- клікнув мишкою;
- навів курсор;
- натиснув клавішу;
- ввів текст;
- відправив форму;
- змінив значення `<select>`;
- прокрутив сторінку;
- завантажився документ.

JavaScript може:

1. чекати на подію;
2. визначити, яка подія сталася;
3. виконати функцію;
4. змінити DOM або стан застосунку.

Базова модель:

    Event
      ↓
    Event Listener
      ↓
    Handler Function
      ↓
    JavaScript Code
      ↓
    DOM / UI Update

Наприклад:

    button.addEventListener("click", () => {
        console.log("Button clicked");
    });

---

# 1. Що таке Event?

Event — це сигнал про те, що щось відбулося.

Наприклад:

    click
    input
    change
    submit
    keydown
    mouseenter
    mouseleave
    load

Браузер генерує ці події.

JavaScript може підписатися на них і виконати певний код.

---

# 2. Найпростіший приклад

HTML:

    <button id="button">Click me</button>

JavaScript:

    const button = document.querySelector("#button");

    button.addEventListener("click", () => {
        console.log("Button clicked");
    });

Коли користувач натисне кнопку:

    click
      ↓
    callback
      ↓
    console.log()

---

# 3. `addEventListener()`

Основний сучасний спосіб роботи з подіями:

    element.addEventListener(eventType, handler);

Наприклад:

    button.addEventListener("click", () => {
        console.log("Hello");
    });

Де:

    "click"

— тип події.

А:

    () => {
        console.log("Hello");
    }

— функція-обробник.

---

# 4. Синтаксис

Загальний синтаксис:

    element.addEventListener("event", handler);

Наприклад:

    const button = document.querySelector("button");

    button.addEventListener("click", handleClick);

    function handleClick() {
        console.log("Clicked");
    }

Можна також написати inline callback:

    button.addEventListener("click", () => {
        console.log("Clicked");
    });

---

# 5. Event Handler

**Handler** — це функція, яка виконується у відповідь на подію.

Наприклад:

    function handleClick() {
        console.log("Button clicked");
    }

Підписка:

    button.addEventListener("click", handleClick);

Важливо:

    handleClick

а не:

    handleClick()

Тобто ми передаємо функцію, а не викликаємо її одразу.

Неправильно:

    button.addEventListener("click", handleClick());

У цьому випадку `handleClick()` буде виконана одразу під час виконання цього рядка.

Правильно:

    button.addEventListener("click", handleClick);

---

# 6. `click`

Найпоширеніша подія:

    click

Вона виникає, коли користувач клікає по елементу.

HTML:

    <button id="button">Click</button>

JavaScript:

    const button = document.querySelector("#button");

    button.addEventListener("click", () => {
        console.log("Clicked");
    });

---

# 7. Зміна тексту після click

HTML:

    <button id="button">Click</button>
    <p id="message">Waiting...</p>

JavaScript:

    const button = document.querySelector("#button");
    const message = document.querySelector("#message");

    button.addEventListener("click", () => {
        message.textContent = "Button was clicked!";
    });

Алгоритм:

    click
      ↓
    find message
      ↓
    change textContent

---

# 8. Зміна класу після click

HTML:

    <button id="button">Toggle</button>
    <div id="box">Box</div>

JavaScript:

    const button = document.querySelector("#button");
    const box = document.querySelector("#box");

    button.addEventListener("click", () => {
        box.classList.toggle("active");
    });

Тут Event запускає DOM-операцію:

    click
      ↓
    classList.toggle()
      ↓
    UI changes

---

# 9. `mouseover`

Подія:

    mouseover

виникає, коли курсор потрапляє на елемент.

    const box = document.querySelector(".box");

    box.addEventListener("mouseover", () => {
        console.log("Mouse over");
    });

---

# 10. `mouseout`

Виникає, коли курсор залишає елемент.

    box.addEventListener("mouseout", () => {
        console.log("Mouse out");
    });

---

# 11. `mouseenter`

Виникає, коли курсор входить в елемент.

    box.addEventListener("mouseenter", () => {
        console.log("Mouse entered");
    });

---

# 12. `mouseleave`

Виникає, коли курсор залишає елемент.

    box.addEventListener("mouseleave", () => {
        console.log("Mouse left");
    });

---

# 13. `mouseover` vs `mouseenter`

Ці події схожі, але не однакові.

`mouseover` бере участь у bubbling.

`mouseenter` не bubbling'ить так само, як `mouseover`.

Для простих hover-сценаріїв часто зручно використовувати:

    mouseenter
    mouseleave

Наприклад:

    box.addEventListener("mouseenter", () => {
        box.classList.add("active");
    });

    box.addEventListener("mouseleave", () => {
        box.classList.remove("active");
    });

---

# 14. `keydown`

Подія:

    keydown

виникає, коли клавіша натискається.

Наприклад:

    document.addEventListener("keydown", () => {
        console.log("Key pressed");
    });

---

# 15. `keyup`

`keyup` виникає, коли клавішу відпускають.

    document.addEventListener("keyup", () => {
        console.log("Key released");
    });

---

# 16. `keydown` vs `keyup`

    keydown
       ↓
    клавішу натиснули

    keyup
       ↓
    клавішу відпустили

Наприклад:

    document.addEventListener("keydown", () => {
        console.log("keydown");
    });

    document.addEventListener("keyup", () => {
        console.log("keyup");
    });

---

# 17. `input`

Подія `input` виникає, коли користувач змінює значення поля введення.

HTML:

    <input id="name" type="text">

JavaScript:

    const input = document.querySelector("#name");

    input.addEventListener("input", () => {
        console.log("Input changed");
    });

Подія відбувається під час введення.

---

# 18. Отримання введеного значення

HTML:

    <input id="name" type="text">

JavaScript:

    const input = document.querySelector("#name");

    input.addEventListener("input", () => {
        console.log(input.value);
    });

Якщо користувач вводить:

    Valeriy

у консоль поступово можуть потрапляти:

    V
    Va
    Val
    Vale
    Valer
    Valeri
    Valeriy

---

# 19. `change`

Подія `change` використовується, коли значення елемента було змінено.

Наприклад, для `<select>`:

HTML:

    <select id="language">
        <option value="js">JavaScript</option>
        <option value="ts">TypeScript</option>
        <option value="py">Python</option>
    </select>

JavaScript:

    const select = document.querySelector("#language");

    select.addEventListener("change", () => {
        console.log(select.value);
    });

---

# 20. `input` vs `change`

Це важлива різниця.

Для text input:

    input

зазвичай реагує на зміни під час введення.

`change` зазвичай сигналізує про завершену зміну значення, наприклад після втрати фокусу.

Приклад:

    input.addEventListener("input", () => {
        console.log("Typing:", input.value);
    });

    input.addEventListener("change", () => {
        console.log("Changed:", input.value);
    });

Для live-пошуку зазвичай потрібен:

    input

---

# 21. `submit`

Для форм використовується:

    submit

HTML:

    <form id="form">
        <input type="text" name="name">
        <button type="submit">Send</button>
    </form>

JavaScript:

    const form = document.querySelector("#form");

    form.addEventListener("submit", (event) => {
        console.log("Form submitted");
    });

---

# 22. `preventDefault()`

За замовчуванням браузер виконує стандартну поведінку.

Для форми:

    submit

може призвести до навігації / перезавантаження сторінки.

Щоб скасувати стандартну поведінку:

    event.preventDefault();

Приклад:

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        console.log("Form handled by JavaScript");
    });

Це дуже важливий патерн для frontend-розробки.

---

# 23. Подія має Event Object

Коли відбувається подія, браузер передає інформацію про неї в handler.

Наприклад:

    button.addEventListener("click", (event) => {
        console.log(event);
    });

`event` — це **Event Object**.

Він містить інформацію про подію.

Наприклад:

    event.type
    event.target
    event.currentTarget

У наступній темі `11-event-object` це буде розглянуто детально.

---

# 24. `event.type`

Повертає тип події.

    button.addEventListener("click", (event) => {
        console.log(event.type);
    });

Результат:

    click

Для клавіатури:

    document.addEventListener("keydown", (event) => {
        console.log(event.type);
    });

Результат:

    keydown

---

# 25. `event.target`

`event.target` — елемент, на якому фактично відбулася подія.

HTML:

    <button id="button">
        Click me
    </button>

JavaScript:

    button.addEventListener("click", (event) => {
        console.log(event.target);
    });

`event.target` буде кнопкою.

---

# 26. `event.currentTarget`

`event.currentTarget` — елемент, на якому встановлений поточний listener.

Наприклад:

    button.addEventListener("click", (event) => {
        console.log(event.currentTarget);
    });

У цьому випадку:

    event.currentTarget === button

`target` і `currentTarget` можуть бути різними.

Це особливо важливо при Event Bubbling та Event Delegation.

---

# 27. Клік по кнопці

HTML:

    <button id="button">
        <span>Click</span>
    </button>

JavaScript:

    const button = document.querySelector("#button");

    button.addEventListener("click", (event) => {
        console.log("target:", event.target);
        console.log("currentTarget:", event.currentTarget);
    });

Якщо користувач натисне саме на `<span>`, тоді:

    event.target

може бути:

    <span>Click</span>

а:

    event.currentTarget

залишиться:

    <button id="button">...</button>

---

# 28. `this` у Event Handler

Якщо використовується звичайна функція:

    button.addEventListener("click", function () {
        console.log(this);
    });

`this` у цьому handler зазвичай посилається на елемент, на якому встановлений listener.

Тобто приблизно:

    this === button

Але зі стрілочною функцією:

    button.addEventListener("click", () => {
        console.log(this);
    });

`this` не отримує спеціального значення від event listener.

Тому для DOM-подій краще явно використовувати:

    event.currentTarget

коли потрібно звернутися до елемента, на якому встановлений listener.

---

# 29. Передача додаткових параметрів

Не потрібно писати:

    button.addEventListener("click", handleClick(10));

Тому що функція виконається одразу.

Правильно:

    button.addEventListener("click", () => {
        handleClick(10);
    });

    function handleClick(value) {
        console.log(value);
    }

---

# 30. Один елемент — кілька listeners

Можна додати кілька обробників для однієї події.

    button.addEventListener("click", () => {
        console.log("First");
    });

    button.addEventListener("click", () => {
        console.log("Second");
    });

При click обидва handler'и будуть виконані.

---

# 31. Різні події на одному елементі

Один елемент може слухати різні події.

    button.addEventListener("click", () => {
        console.log("click");
    });

    button.addEventListener("mouseenter", () => {
        console.log("mouseenter");
    });

    button.addEventListener("mouseleave", () => {
        console.log("mouseleave");
    });

---

# 32. Один handler для кількох подій

Одна й та сама функція може використовуватися для різних подій.

    function handleEvent() {
        console.log("Event occurred");
    }

    button.addEventListener("click", handleEvent);
    button.addEventListener("mouseenter", handleEvent);

Але якщо потрібно знати тип події:

    function handleEvent(event) {
        console.log(event.type);
    }

    button.addEventListener("click", handleEvent);
    button.addEventListener("mouseenter", handleEvent);

---

# 33. `removeEventListener()`

Щоб видалити listener, використовується:

    element.removeEventListener(eventType, handler);

Наприклад:

    function handleClick() {
        console.log("Clicked");
    }

    button.addEventListener("click", handleClick);

    button.removeEventListener("click", handleClick);

Після цього handler більше не буде викликатися цим listener'ом.

---

# 34. Важливо: функція повинна бути тією самою

Це не спрацює:

    button.addEventListener("click", () => {
        console.log("Clicked");
    });

    button.removeEventListener("click", () => {
        console.log("Clicked");
    });

Чому?

Тому що це дві різні функції.

Правильно:

    function handleClick() {
        console.log("Clicked");
    }

    button.addEventListener("click", handleClick);

    button.removeEventListener("click", handleClick);

---

# 35. Навіщо потрібен `removeEventListener()`?

Це потрібно, коли:

- listener більше не потрібний;
- потрібно керувати lifecycle;
- створюються/видаляються компоненти;
- потрібно уникати дублювання listeners;
- працюємо з великими застосунками;
- потрібно очищати ресурси.

---

# 36. `once`

`addEventListener()` може приймати третій аргумент — options.

Наприклад:

    button.addEventListener(
        "click",
        () => {
            console.log("Only once");
        },
        { once: true }
    );

Handler виконається тільки один раз.

Після першого click listener автоматично буде видалений.

---

# 37. `once` — практичний приклад

HTML:

    <button id="button">Start</button>

JavaScript:

    const button = document.querySelector("#button");

    button.addEventListener(
        "click",
        () => {
            console.log("Started");
        },
        { once: true }
    );

Перший click:

    Started

Другий click:

    нічого

---

# 38. `passive`

Ще одна опція:

    { passive: true }

Наприклад:

    window.addEventListener(
        "scroll",
        () => {
            console.log("Scrolling");
        },
        { passive: true }
    );

`passive` повідомляє браузеру, що handler не буде викликати:

    event.preventDefault();

Це може бути корисним для подій, пов'язаних зі scrolling/touch.

Для початкового рівня достатньо знати саму концепцію.

---

# 39. `capture`

Event listener також може працювати у capture phase.

    element.addEventListener(
        "click",
        handler,
        { capture: true }
    );

Звичайно:

    { capture: false }

або без третього аргументу.

Події мають кілька фаз:

    Capture
       ↓
    Target
       ↓
    Bubble

Детально це буде розглянуто в:

    12-event-bubbling

---

# 40. Основні Mouse Events

Корисно знати:

    click
    dblclick
    mousedown
    mouseup
    mousemove
    mouseover
    mouseout
    mouseenter
    mouseleave

---

# 41. `dblclick`

Подія подвійного кліку:

    button.addEventListener("dblclick", () => {
        console.log("Double click");
    });

---

# 42. `mousedown`

Спрацьовує, коли кнопку миші натиснуто.

    button.addEventListener("mousedown", () => {
        console.log("Mouse button down");
    });

---

# 43. `mouseup`

Спрацьовує, коли кнопку миші відпустили.

    button.addEventListener("mouseup", () => {
        console.log("Mouse button up");
    });

---

# 44. `mousemove`

Спрацьовує при русі курсора.

    document.addEventListener("mousemove", () => {
        console.log("Mouse moving");
    });

Ця подія може генеруватися дуже часто.

Тому важкі операції всередині `mousemove` можуть негативно впливати на performance.

---

# 45. Основні Keyboard Events

Найважливіші:

    keydown
    keyup

Наприклад:

    document.addEventListener("keydown", (event) => {
        console.log(event.key);
    });

---

# 46. Відстеження Enter

    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            console.log("Enter pressed");
        }
    });

---

# 47. Відстеження Escape

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            console.log("Escape pressed");
        }
    });

Це часто використовується для:

- закриття modal;
- закриття меню;
- скасування дії;
- виходу з режиму.

---

# 48. Відстеження клавіші Ctrl

У `KeyboardEvent` можна перевіряти modifier keys.

    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey) {
            console.log("Ctrl is pressed");
        }
    });

Так само існують:

    event.shiftKey
    event.altKey
    event.metaKey

---

# 49. Ctrl + S

Наприклад:

    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey && event.key === "s") {
            event.preventDefault();

            console.log("Save");
        }
    });

Тут:

    event.ctrlKey

перевіряє Ctrl.

А:

    event.key === "s"

перевіряє клавішу S.

`preventDefault()` може скасувати стандартну дію браузера.

---

# 50. Основні Form Events

Для форм важливі:

    submit
    input
    change
    focus
    blur

---

# 51. `focus`

Виникає, коли елемент отримує фокус.

HTML:

    <input id="name">

JavaScript:

    const input = document.querySelector("#name");

    input.addEventListener("focus", () => {
        console.log("Input focused");
    });

---

# 52. `blur`

Виникає, коли елемент втрачає фокус.

    input.addEventListener("blur", () => {
        console.log("Input lost focus");
    });

---

# 53. `focus` vs `blur`

    focus
      ↓
    element отримав фокус

    blur
      ↓
    element втратив фокус

Це часто використовується для:

- валідації;
- показу підказок;
- зміни стилю;
- роботи з формами.

---

# 54. Практичний приклад — live counter

HTML:

    <input id="message" maxlength="100">
    <p id="counter">0 / 100</p>

JavaScript:

    const input = document.querySelector("#message");
    const counter = document.querySelector("#counter");

    input.addEventListener("input", () => {
        counter.textContent = `${input.value.length} / 100`;
    });

Кожна зміна input:

    input
      ↓
    input.value
      ↓
    value.length
      ↓
    counter.textContent

---

# 55. Практичний приклад — показати/сховати текст

HTML:

    <button id="toggle">Show</button>
    <p id="message" hidden>
        Hidden message
    </p>

JavaScript:

    const button = document.querySelector("#toggle");
    const message = document.querySelector("#message");

    button.addEventListener("click", () => {
        message.hidden = !message.hidden;
    });

Тут event змінює DOM property:

    click
      ↓
    hidden
      ↓
    UI

---

# 56. Практичний приклад — лічильник

HTML:

    <button id="decrease">-</button>
    <span id="count">0</span>
    <button id="increase">+</button>

JavaScript:

    const decrease = document.querySelector("#decrease");
    const increase = document.querySelector("#increase");
    const countElement = document.querySelector("#count");

    let count = 0;

    increase.addEventListener("click", () => {
        count += 1;
        countElement.textContent = count;
    });

    decrease.addEventListener("click", () => {
        count -= 1;
        countElement.textContent = count;
    });

Ментальна модель:

    User action
        ↓
    Event
        ↓
    Change data
        ↓
    Update DOM

---

# 57. Практичний приклад — Delete button

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

Це поєднує:

- Event;
- `querySelector()`;
- `closest()`;
- `remove()`.

---

# 58. Практичний приклад — форма

HTML:

    <form id="form">
        <input id="name" type="text">
        <button type="submit">Submit</button>
    </form>

JavaScript:

    const form = document.querySelector("#form");
    const nameInput = document.querySelector("#name");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        console.log(nameInput.value);
    });

Алгоритм:

    submit
      ↓
    preventDefault()
      ↓
    read input
      ↓
    process data

---

# 59. Практичний приклад — зміна класу

HTML:

    <button id="button">Active</button>

JavaScript:

    const button = document.querySelector("#button");

    button.addEventListener("click", () => {
        button.classList.toggle("active");
    });

Це один із найпоширеніших патернів DOM.

---

# 60. Практичний приклад — hover

    const box = document.querySelector(".box");

    box.addEventListener("mouseenter", () => {
        box.classList.add("active");
    });

    box.addEventListener("mouseleave", () => {
        box.classList.remove("active");
    });

У реальному CSS часто краще використовувати:

    .box:hover

якщо JavaScript не потрібен.

Тобто не кожну UI-взаємодію потрібно реалізовувати через JavaScript.

---

# 61. Події на `document`

Можна слухати події на `document`.

Наприклад:

    document.addEventListener("keydown", (event) => {
        console.log(event.key);
    });

Це корисно для глобальних клавіатурних скорочень.

---

# 62. Події на `window`

Можна слухати події на `window`.

Наприклад:

    window.addEventListener("resize", () => {
        console.log(window.innerWidth);
    });

Це дозволяє реагувати на зміну розміру viewport.

---

# 63. `DOMContentLoaded`

Браузер генерує подію:

    DOMContentLoaded

коли HTML документа був завантажений і розібраний.

Наприклад:

    document.addEventListener("DOMContentLoaded", () => {
        console.log("DOM ready");
    });

Це було особливо важливо у скриптах, які завантажуються до HTML-елементів.

---

# 64. `load`

Подія:

    load

пов'язана із завершенням завантаження ресурсу/сторінки.

Наприклад:

    window.addEventListener("load", () => {
        console.log("Page fully loaded");
    });

`load` і `DOMContentLoaded` — не одне й те саме.

У багатьох DOM-сценаріях достатньо `DOMContentLoaded`.

---

# 65. `DOMContentLoaded` vs `load`

### `DOMContentLoaded`

Означає:

> HTML розібраний, DOM побудований.

### `load`

Означає:

> Сторінка та її залежні ресурси завантажені.

Ментально:

    HTML parsed
        ↓
    DOMContentLoaded

    Resources loaded
        ↓
    load

---

# 66. Подія як механізм взаємодії

Event-driven JavaScript можна уявити так:

    ┌───────────────┐
    │     User      │
    └───────┬───────┘
            │
            ↓
    ┌───────────────┐
    │     Event     │
    └───────┬───────┘
            │
            ↓
    ┌───────────────┐
    │ Event Handler  │
    └───────┬───────┘
            │
            ↓
    ┌───────────────┐
    │ JavaScript    │
    └───────┬───────┘
            │
            ↓
    ┌───────────────┐
    │ DOM / UI      │
    └───────────────┘

---

# 67. Типовий цикл інтерактивного UI

Наприклад, користувач видаляє Todo:

    User clicks Delete
            ↓
        click event
            ↓
        event handler
            ↓
        find Todo
            ↓
        remove Todo
            ↓
        DOM updated
            ↓
        UI updated

Це фундаментальна модель інтерактивного frontend.

---

# 68. Події та функції

Не потрібно дублювати код.

Замість:

    button1.addEventListener("click", () => {
        console.log("Clicked");
    });

    button2.addEventListener("click", () => {
        console.log("Clicked");
    });

можна:

    function handleClick() {
        console.log("Clicked");
    }

    button1.addEventListener("click", handleClick);
    button2.addEventListener("click", handleClick);

---

# 69. Типова помилка — виклик функції замість передачі

Неправильно:

    button.addEventListener("click", handleClick());

Правильно:

    button.addEventListener("click", handleClick);

Якщо потрібні параметри:

    button.addEventListener("click", () => {
        handleClick("hello");
    });

---

# 70. Типова помилка — listener до неіснуючого елемента

Якщо:

    const button = document.querySelector("#button");

не знайшов елемент, то:

    button === null

і:

    button.addEventListener(...)

викличе помилку.

Безпечний варіант:

    const button = document.querySelector("#button");

    if (!button) {
        return;
    }

    button.addEventListener("click", handleClick);

---

# 71. Типова помилка — неправильний event type

Неправильно:

    button.addEventListener("clicked", handleClick);

`clicked` не є стандартною DOM-подією.

Правильно:

    button.addEventListener("click", handleClick);

Інші приклади:

    "input"
    "change"
    "submit"
    "keydown"
    "keyup"
    "focus"
    "blur"

---

# 72. Типова помилка — використання `click` замість `submit`

Для форми:

    <form>
        <input>
        <button type="submit">Send</button>
    </form>

краще слухати:

    form.addEventListener("submit", handleSubmit);

а не тільки:

    button.addEventListener("click", handleSubmit);

Чому?

Тому що форма може бути відправлена не тільки кліком по кнопці, а й, наприклад, клавішею Enter.

---

# 73. Типова помилка — забути `preventDefault()`

Якщо потрібно обробити форму через JavaScript:

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // custom logic
    });

Без `preventDefault()` браузер може виконати стандартну поведінку форми.

---

# 74. Типова помилка — надмірне використання JavaScript для CSS

Не потрібно робити:

    element.addEventListener("mouseenter", () => {
        element.style.backgroundColor = "gray";
    });

    element.addEventListener("mouseleave", () => {
        element.style.backgroundColor = "";
    });

якщо задача просто створити hover-ефект.

Для цього CSS має:

    :hover

JavaScript потрібен, коли зміна поведінки справді залежить від логіки програми.

---

# 75. Типова помилка — створення сотень listeners без потреби

Наприклад, є великий список:

    item1
    item2
    item3
    ...
    item1000

Не завжди потрібно створювати окремий listener для кожної кнопки.

Можна використовувати:

    Event Delegation

Це буде окремо розглянуто в:

    13-event-delegation

---

# 76. Події та DOM

У попередніх темах:

    Select
      ↓
    Create
      ↓
    Insert
      ↓
    Remove

Тепер додається:

    Event
      ↓
    User interaction
      ↓
    DOM operation

Наприклад:

    click
      ↓
    classList.toggle()

або:

    click
      ↓
    element.remove()

або:

    submit
      ↓
    preventDefault()
      ↓
    read data
      ↓
    update UI

---

# 77. Основні події, які потрібно знати

## Mouse

    click
    dblclick
    mousedown
    mouseup
    mousemove
    mouseenter
    mouseleave

## Keyboard

    keydown
    keyup

## Forms

    input
    change
    submit
    focus
    blur

## Document / Window

    DOMContentLoaded
    load
    resize
    scroll

---

# 78. Таблиця основних Events

| Event | Коли виникає |
|---|---|
| `click` | клік |
| `dblclick` | подвійний клік |
| `mouseenter` | курсор увійшов |
| `mouseleave` | курсор вийшов |
| `mousedown` | кнопка миші натиснута |
| `mouseup` | кнопка миші відпущена |
| `mousemove` | рух миші |
| `keydown` | клавішу натиснули |
| `keyup` | клавішу відпустили |
| `input` | значення input змінюється |
| `change` | значення змінено |
| `submit` | форма відправляється |
| `focus` | елемент отримав фокус |
| `blur` | елемент втратив фокус |
| `DOMContentLoaded` | DOM побудований |
| `load` | ресурси завантажені |
| `resize` | змінився розмір viewport |
| `scroll` | відбувається прокрутка |

---

# 79. Що потрібно пам'ятати

1. Подія — це сигнал про те, що щось відбулося.

2. Основний API:

       element.addEventListener();

3. Основна структура:

       element.addEventListener("click", handler);

4. Handler — функція, яка реагує на event.

5. Не потрібно викликати handler при передачі:

       handleClick

   а не:

       handleClick()

6. Подія передає `Event Object`.

7. Основні властивості:

       event.type
       event.target
       event.currentTarget

8. `preventDefault()` скасовує стандартну браузерну поведінку.

9. `removeEventListener()` видаляє listener.

10. Для `removeEventListener()` потрібно передати ту саму функцію.

11. `once: true` дозволяє виконати handler один раз.

12. Для форм краще слухати `submit`, а не тільки click кнопки.

13. Для live-введення використовується `input`.

14. Для клавіатури найважливіші `keydown` та `keyup`.

15. Не все потрібно робити через JavaScript — частина поведінки належить CSS.

---

# 80. Interview Questions

## Junior

### 1. Що таке DOM Event?

Подія, яка сигналізує про певну дію або зміну в браузері.

### 2. Як додати event listener?

    element.addEventListener("click", handler);

### 3. Які події миші ви знаєте?

    click
    dblclick
    mousedown
    mouseup
    mousemove
    mouseenter
    mouseleave

### 4. Які keyboard events ви знаєте?

    keydown
    keyup

### 5. Які form events ви знаєте?

    input
    change
    submit
    focus
    blur

### 6. Для чого `preventDefault()`?

Щоб скасувати стандартну поведінку браузера для події.

### 7. Для чого `removeEventListener()`?

Щоб видалити раніше встановлений listener.

---

## Strong Junior

### 8. Чим `input` відрізняється від `change`?

`input` реагує на зміни значення під час введення, а `change` сигналізує про зміну значення після завершення відповідної взаємодії з елементом.

### 9. Що таке `event.target`?

Елемент, на якому фактично відбулася подія.

### 10. Що таке `event.currentTarget`?

Елемент, на якому зараз виконується listener.

### 11. Чому `event.target` і `event.currentTarget` можуть бути різними?

Через bubbling, коли подія виникла на дочірньому елементі, але обробляється listener'ом на parent.

### 12. Як виконати handler тільки один раз?

    element.addEventListener("click", handler, {
        once: true
    });

### 13. Чому це неправильно?

    button.addEventListener("click", handleClick());

Тому що `handleClick()` викликається одразу.

Правильно:

    button.addEventListener("click", handleClick);

---

## Middle

### 14. Що таке Event Bubbling?

Механізм поширення події від target вгору через його батьківські елементи.

### 15. Що таке Event Capturing?

Фаза поширення події від верхнього рівня DOM до target.

### 16. Що таке Event Delegation?

Встановлення listener на parent для обробки подій його дочірніх елементів.

### 17. Чому Event Delegation корисний?

Він дозволяє зменшити кількість listeners і добре працює з динамічно створеними елементами.

### 18. Чому `removeEventListener()` не працює з двома однаковими arrow functions?

Тому що це різні об'єкти-функції.

### 19. Що таке passive listener?

Listener, який повідомляє браузеру, що handler не викликатиме `preventDefault()`.

---

# 81. Рівні знань

## 🟢 Core

Потрібно знати:

- що таке Event;
- `addEventListener()`;
- `click`;
- `input`;
- `change`;
- `submit`;
- `keydown`;
- `keyup`;
- `focus`;
- `blur`;
- `preventDefault()`.

Вміти:

- реагувати на click;
- змінювати DOM;
- отримувати значення input;
- обробляти форму;
- реагувати на клавіатуру.

---

## 🟡 Junior

Потрібно вміти:

- працювати з Event Object;
- використовувати `target`;
- використовувати `currentTarget`;
- видаляти listeners;
- використовувати `once`;
- працювати з keyboard modifiers;
- робити Todo interactions;
- створювати interactive UI;
- використовувати delegation у простих сценаріях.

---

## 🟠 Middle

Потрібно добре розуміти:

- Event Bubbling;
- Event Capturing;
- Event Delegation;
- propagation;
- `stopPropagation()`;
- `stopImmediatePropagation()`;
- passive listeners;
- lifecycle listeners;
- performance;
- dynamic DOM.

---

## 🔴 Senior

Потрібно розуміти:

- event system браузера;
- event propagation;
- delegation;
- lifecycle;
- cleanup;
- memory management;
- performance;
- high-frequency events;
- throttling/debouncing;
- pointer/touch events;
- взаємодію DOM events із framework event systems.

---

# 82. Міні-шпаргалка

    // Додати listener
    element.addEventListener("click", handler);

    // Inline handler
    element.addEventListener("click", () => {
        console.log("Clicked");
    });

    // Event object
    element.addEventListener("click", (event) => {
        console.log(event);
    });

    // Target
    event.target

    // Current target
    event.currentTarget

    // Скасувати default behavior
    event.preventDefault();

    // Видалити listener
    element.removeEventListener("click", handler);

    // Виконати один раз
    element.addEventListener("click", handler, {
        once: true
    });

    // Keyboard
    document.addEventListener("keydown", handler);
    document.addEventListener("keyup", handler);

    // Input
    input.addEventListener("input", handler);

    // Change
    select.addEventListener("change", handler);

    // Form
    form.addEventListener("submit", handler);

    // Focus
    input.addEventListener("focus", handler);

    // Blur
    input.addEventListener("blur", handler);

---

# 83. Базовий Event Pattern

Запам'ятай цей шаблон:

    const element = document.querySelector(".element");

    element.addEventListener("event", (event) => {
        // logic
    });

Наприклад:

    const button = document.querySelector("#button");

    button.addEventListener("click", (event) => {
        console.log("Clicked");
    });

---

# 84. Event → DOM Pattern

Для інтерактивного UI найважливіший шаблон:

    User Action
        ↓
    Event
        ↓
    Handler
        ↓
    JavaScript Logic
        ↓
    DOM Update

Приклад:

    Click
      ↓
    handleClick()
      ↓
    count += 1
      ↓
    textContent = count
      ↓
    UI updated

---

# 85. Event → Data → DOM

Ще одна важлива модель для frontend:

    User
      ↓
    Event
      ↓
    Read data
      ↓
    Change state/data
      ↓
    Update DOM

Наприклад:

    input
      ↓
    input.value
      ↓
    validate data
      ↓
    update message
      ↓
    UI

Ця модель дуже важлива для переходу від vanilla JavaScript до React.

---

# 86. Практика

## Вправа 1 — Button

Створи кнопку:

    <button id="button">Click me</button>

При click виводь:

    Button clicked

---

## Вправа 2 — Text

Створи:

    <button id="button">Change</button>
    <p id="text">Old text</p>

При click зміни текст на:

    New text

---

## Вправа 3 — Counter

Створи:

    <button id="minus">-</button>
    <span id="count">0</span>
    <button id="plus">+</button>

Реалізуй:

    +1
    -1

---

## Вправа 4 — Input

Створи:

    <input id="name">
    <p id="output"></p>

Під час введення показуй значення input у `<p>`.

Використай:

    input

---

## Вправа 5 — Form

Створи форму:

    <form id="form">
        <input id="name">
        <button type="submit">Submit</button>
    </form>

При submit:

1. скасуй стандартну поведінку;
2. отримай значення;
3. виведи його в console.

---

## Вправа 6 — Delete

Створи:

    <div class="card">
        <h2>Card</h2>
        <button class="delete">Delete</button>
    </div>

При click:

    card.remove();

---

## Вправа 7 — Keyboard

Відстежуй:

    Enter
    Escape

Наприклад:

    Enter → console.log("Submit")
    Escape → console.log("Cancel")

---

# 87. Підсумковий практичний проєкт

Створи простий Todo List.

Функціональність:

    Add Todo
        ↓
    input
        ↓
    submit
        ↓
    createElement
        ↓
    append

А для видалення:

    click Delete
        ↓
    closest(".todo")
        ↓
    remove()

Для очищення:

    click Clear
        ↓
    replaceChildren()

Для введення:

    input
        ↓
    read value

Цей маленький проєкт об'єднає теми:

    Select Elements
    ↓
    Create Elements
    ↓
    Insert Elements
    ↓
    Events
    ↓
    Remove Elements

---

# 88. Головне

Якщо з усього розділу запам'ятати одну конструкцію:

    element.addEventListener("click", () => {
        // action
    });

то це буде правильна основа.

Але для Junior-рівня потрібно поступово перейти до повної моделі:

    Event
      ↓
    Event Object
      ↓
    Handler
      ↓
    Read Data
      ↓
    Change State / Data
      ↓
    DOM Update

Найважливіші події:

    click
    input
    change
    submit
    keydown
    keyup
    focus
    blur

Найважливіші методи та властивості:

    addEventListener()
    removeEventListener()
    preventDefault()
    event.target
    event.currentTarget

І найважливіша ідея:

> **DOM стає інтерактивним тоді, коли JavaScript починає реагувати на Events.**

До цього JavaScript переважно змінює DOM програмно.

Після появи Events виникає справжня взаємодія:

    User
      ↓
    Event
      ↓
    JavaScript
      ↓
    DOM
      ↓
    UI
      ↓
    User

Це фундамент усіх інтерактивних frontend-застосунків — від простого vanilla JavaScript до React/Next.js.