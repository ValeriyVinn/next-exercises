# 11. Event Object — Об'єкт події

## 📌 Вступ

У попередній темі ми розглянули:

    element.addEventListener("click", handler);

Тепер потрібно зрозуміти, що відбувається всередині `handler`.

Коли браузер викликає обробник події, він передає йому спеціальний об'єкт — **Event Object**.

Наприклад:

    button.addEventListener("click", (event) => {
        console.log(event);
    });

`event` містить інформацію про подію:

- який тип події стався;
- де вона сталася;
- на якому елементі;
- який елемент був фактичним target;
- які клавіші були натиснуті;
- координати миші;
- чи була скасована стандартна поведінка;
- у якій фазі знаходиться подія;
- та іншу інформацію залежно від типу події.

Ментальна модель:

    User Action
        ↓
    Event
        ↓
    Event Object
        ↓
    Handler
        ↓
    JavaScript Logic
        ↓
    DOM Update

---

# 1. Що таке Event Object?

Event Object — це об'єкт JavaScript, який браузер створює для конкретної події та передає event handler.

Наприклад:

    button.addEventListener("click", (event) => {
        console.log(event);
    });

Тут:

    event

— це Event Object.

---

# 2. Звідки береться `event`?

Ми його самі не створюємо.

Браузер викликає handler приблизно концептуально так:

    handler(event);

Тому можна написати:

    button.addEventListener("click", (event) => {
        console.log(event);
    });

Або:

    button.addEventListener("click", function (event) {
        console.log(event);
    });

Назва `event` не є обов'язковою.

Можна написати:

    button.addEventListener("click", (e) => {
        console.log(e);
    });

або:

    button.addEventListener("click", (evt) => {
        console.log(evt);
    });

Але стандартний і найбільш зрозумілий варіант:

    event

---

# 3. Event Object для різних подій

Різні події можуть мати різну додаткову інформацію.

Наприклад, для `click`:

    button.addEventListener("click", (event) => {
        console.log(event);
    });

Для клавіатури:

    document.addEventListener("keydown", (event) => {
        console.log(event.key);
    });

Для форми:

    form.addEventListener("submit", (event) => {
        event.preventDefault();
    });

Тобто:

    Event
      ↓
    конкретний тип події
      ↓
    додаткова інформація

---

# 4. `event.type`

Властивість:

    event.type

повертає тип події.

Наприклад:

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

# 5. Практичний приклад `event.type`

Можна використовувати один handler для різних подій:

    function handleEvent(event) {
        console.log(`Event: ${event.type}`);
    }

    button.addEventListener("click", handleEvent);
    button.addEventListener("mouseenter", handleEvent);
    button.addEventListener("mouseleave", handleEvent);

У консолі можуть з'являтися:

    Event: mouseenter
    Event: click
    Event: mouseleave

---

# 6. `event.target`

Одна з найважливіших властивостей:

    event.target

Вона повертає елемент, на якому **фактично відбулася подія**.

HTML:

    <button id="button">
        Click
    </button>

JavaScript:

    const button = document.querySelector("#button");

    button.addEventListener("click", (event) => {
        console.log(event.target);
    });

Результатом буде кнопка.

---

# 7. `event.target` — це DOM Element

Оскільки `event.target` — DOM-вузол, ми можемо працювати з ним як із DOM-елементом.

Наприклад:

    button.addEventListener("click", (event) => {
        event.target.classList.add("active");
    });

Або:

    button.addEventListener("click", (event) => {
        event.target.textContent = "Clicked";
    });

---

# 8. `event.target` та `querySelector()`

Замість:

    const button = document.querySelector(".button");

можна використовувати target:

    button.addEventListener("click", (event) => {
        event.target.classList.toggle("active");
    });

Особливо корисно це стає при роботі з багатьма елементами.

---

# 9. `event.currentTarget`

Ще одна дуже важлива властивість:

    event.currentTarget

Вона повертає елемент, на якому **встановлений поточний event listener**.

Наприклад:

    const button = document.querySelector("#button");

    button.addEventListener("click", (event) => {
        console.log(event.currentTarget);
    });

Тут:

    event.currentTarget === button

---

# 10. `target` vs `currentTarget`

Це одна з найважливіших відмінностей у DOM Events.

### `target`

> Де подія фактично виникла.

### `currentTarget`

> На якому елементі зараз виконується listener.

Наприклад:

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

Якщо користувач натиснув на `<span>`:

    target
      ↓
    <span>

    currentTarget
      ↓
    <button>

---

# 11. Чому `target` і `currentTarget` можуть відрізнятися?

Через **Event Bubbling**.

Подія може виникнути на дочірньому елементі:

    span

а потім поширюватися до:

    button
      ↓
    div
      ↓
    body
      ↓
    document

Якщо listener знаходиться на `button`, тоді:

    target = span
    currentTarget = button

Детально bubbling буде розглянуто в:

    12-event-bubbling

---

# 12. Практичний приклад `target` vs `currentTarget`

HTML:

    <div id="card">
        <h2>JavaScript</h2>
        <button>Delete</button>
    </div>

JavaScript:

    const card = document.querySelector("#card");

    card.addEventListener("click", (event) => {
        console.log("target:", event.target);
        console.log("currentTarget:", event.currentTarget);
    });

Якщо клікнути на `<button>`:

    target
      ↓
    button

    currentTarget
      ↓
    card

---

# 13. `event.preventDefault()`

Метод:

    event.preventDefault();

скасовує стандартну поведінку браузера для події, якщо вона скасовується.

Найвідоміший приклад — форма.

HTML:

    <form id="form">
        <input name="name">
        <button type="submit">Send</button>
    </form>

JavaScript:

    const form = document.querySelector("#form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        console.log("Custom form handling");
    });

Тепер браузер не виконує стандартну submit-поведінку.

---

# 14. `defaultPrevented`

Властивість:

    event.defaultPrevented

показує, чи була стандартна дія події скасована.

Наприклад:

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        console.log(event.defaultPrevented);
    });

Результат:

    true

До `preventDefault()`:

    false

---

# 15. `event.defaultPrevented` — перевірка

Можна перевірити:

    if (event.defaultPrevented) {
        console.log("Default action was prevented");
    }

Це може бути корисно, коли кілька частин програми працюють з однією подією.

---

# 16. `event.timeStamp`

Властивість:

    event.timeStamp

пов'язана з моментом виникнення події.

Наприклад:

    button.addEventListener("click", (event) => {
        console.log(event.timeStamp);
    });

Це числове значення, яке можна використовувати для вимірювання часу між подіями.

Для більш точних вимірювань продуктивності зазвичай використовують спеціальні Performance API, а не покладаються тільки на `event.timeStamp`.

---

# 17. `event.isTrusted`

Властивість:

    event.isTrusted

показує, чи була подія ініційована браузером/користувацькою взаємодією, а не програмно через JavaScript.

Наприклад:

    button.addEventListener("click", (event) => {
        console.log(event.isTrusted);
    });

При реальному кліку користувача зазвичай:

    true

Для програмно створеної події значення може бути:

    false

---

# 18. `event.cancelable`

Властивість:

    event.cancelable

показує, чи можна скасувати стандартну дію цієї події через:

    event.preventDefault();

Наприклад:

    element.addEventListener("click", (event) => {
        console.log(event.cancelable);
    });

Важлива ідея:

    cancelable === true
        ↓
    preventDefault() може скасувати default action

---

# 19. `event.bubbles`

Властивість:

    event.bubbles

показує, чи підтримує конкретна подія bubbling.

Наприклад:

    element.addEventListener("click", (event) => {
        console.log(event.bubbles);
    });

Для багатьох звичайних DOM-подій, включно з `click`, це:

    true

Ця властивість стане особливо важливою в темі Event Bubbling.

---

# 20. `event.eventPhase`

Властивість:

    event.eventPhase

показує фазу, у якій знаходиться подія.

Основні значення:

    0 — NONE
    1 — CAPTURING_PHASE
    2 — AT_TARGET
    3 — BUBBLING_PHASE

Ментальна модель:

    Capture
       ↓
    Target
       ↓
    Bubble

Це вже наступний рівень розуміння DOM Events.

---

# 21. `event.composed`

Властивість:

    event.composed

пов'язана з тим, чи може подія проходити через межі Shadow DOM.

Для звичайного vanilla DOM-проєкту ця властивість не є пріоритетною.

Але на Middle/Senior-рівні варто знати, що DOM Events мають більш складну модель поширення.

---

# 22. `event.cancelBubble`

Історично існує властивість:

    event.cancelBubble

Її можна встановити:

    event.cancelBubble = true;

Це зупиняє подальше bubbling.

У сучасному коді краще використовувати більш явний:

    event.stopPropagation();

Детально — у наступній темі про bubbling.

---

# 23. `event.stopPropagation()`

Метод:

    event.stopPropagation();

зупиняє подальше поширення події.

HTML:

    <div id="parent">
        <button id="button">Click</button>
    </div>

JavaScript:

    const parent = document.querySelector("#parent");
    const button = document.querySelector("#button");

    parent.addEventListener("click", () => {
        console.log("Parent");
    });

    button.addEventListener("click", (event) => {
        event.stopPropagation();

        console.log("Button");
    });

При натисканні:

    Button

А handler parent не буде викликаний через bubbling.

---

# 24. `stopPropagation()` не скасовує default action

Це дуже важливо.

`stopPropagation()`:

    зупиняє поширення події

А:

    preventDefault()

    скасовує стандартну дію браузера

Це різні речі.

---

# 25. `preventDefault()` vs `stopPropagation()`

| Метод | Що робить |
|---|---|
| `preventDefault()` | скасовує default action |
| `stopPropagation()` | зупиняє propagation |
| `stopImmediatePropagation()` | зупиняє propagation та інші listeners на поточному target |

Запам'ятай:

    preventDefault
        ↓
    Browser behavior

    stopPropagation
        ↓
    Event propagation

---

# 26. `stopImmediatePropagation()`

Метод:

    event.stopImmediatePropagation();

зупиняє:

1. подальше поширення події;
2. виконання інших listeners для цієї події на поточному елементі.

Наприклад:

    button.addEventListener("click", (event) => {
        event.stopImmediatePropagation();

        console.log("First");
    });

    button.addEventListener("click", () => {
        console.log("Second");
    });

У такому сценарії другий listener не буде виконаний.

Для Core/Junior достатньо розуміти різницю між:

    preventDefault()
    stopPropagation()

---

# 27. Mouse Event Object

Для mouse events Event Object містить додаткову інформацію.

Наприклад:

    button.addEventListener("click", (event) => {
        console.log(event.clientX);
        console.log(event.clientY);
    });

Це координати події відносно viewport.

---

# 28. `clientX` та `clientY`

    event.clientX
    event.clientY

Координати відносно viewport браузера.

Приклад:

    document.addEventListener("click", (event) => {
        console.log("X:", event.clientX);
        console.log("Y:", event.clientY);
    });

---

# 29. `pageX` та `pageY`

    event.pageX
    event.pageY

Координати відносно сторінки.

На відміну від `clientX/clientY`, вони враховують прокрутку сторінки.

    document.addEventListener("click", (event) => {
        console.log(event.pageX);
        console.log(event.pageY);
    });

---

# 30. `screenX` та `screenY`

    event.screenX
    event.screenY

Координати відносно екрана користувача.

    document.addEventListener("click", (event) => {
        console.log(event.screenX);
        console.log(event.screenY);
    });

Для більшості UI-задач частіше потрібні:

    clientX
    clientY

або:

    pageX
    pageY

---

# 31. `button` у MouseEvent

Для mouse events існує:

    event.button

Вона дозволяє визначити, яка кнопка миші була використана в події, наприклад у `mousedown` або `mouseup`.

    document.addEventListener("mousedown", (event) => {
        console.log(event.button);
    });

Типові значення:

    0 — primary button
    1 — middle button
    2 — secondary button

---

# 32. `buttons`

Властивість:

    event.buttons

може показувати, які кнопки миші зараз натиснуті.

Наприклад:

    document.addEventListener("mousemove", (event) => {
        console.log(event.buttons);
    });

Це особливо корисно для drag-and-drop та інших mouse interactions.

---

# 33. Keyboard Event Object

Для keyboard events існують спеціальні властивості.

Основні:

    event.key
    event.code
    event.ctrlKey
    event.shiftKey
    event.altKey
    event.metaKey
    event.repeat

---

# 34. `event.key`

`event.key` показує значення натиснутої клавіші.

    document.addEventListener("keydown", (event) => {
        console.log(event.key);
    });

Якщо натиснути:

    a

результат:

    a

Якщо натиснути:

    Enter

результат:

    Enter

Якщо натиснути:

    Escape

результат:

    Escape

---

# 35. `event.code`

`event.code` описує фізичну клавішу на клавіатурі.

Наприклад:

    document.addEventListener("keydown", (event) => {
        console.log(event.code);
    });

Для фізичної клавіші A:

    KeyA

Для Enter:

    Enter

Для Escape:

    Escape

---

# 36. `key` vs `code`

Це важлива різниця.

### `key`

Описує значення клавіші.

### `code`

Описує фізичну клавішу.

Наприклад:

    event.key

може залежати від розкладки клавіатури.

А:

    event.code

залишається пов'язаним із фізичною позицією клавіші.

---

# 37. Коли використовувати `key`?

Якщо тебе цікавить саме введене значення:

    if (event.key === "Enter") {
        // ...
    }

або:

    if (event.key === "Escape") {
        // ...
    }

Для команд користувача зазвичай зручно використовувати `key`.

---

# 38. Коли використовувати `code`?

Якщо логіка залежить від фізичної клавіші.

Наприклад, у грі:

    if (event.code === "KeyW") {
        moveForward();
    }

    if (event.code === "KeyA") {
        moveLeft();
    }

    if (event.code === "KeyS") {
        moveBackward();
    }

    if (event.code === "KeyD") {
        moveRight();
    }

---

# 39. `ctrlKey`

Перевіряє, чи натиснутий Ctrl.

    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey) {
            console.log("Ctrl pressed");
        }
    });

---

# 40. `shiftKey`

    document.addEventListener("keydown", (event) => {
        if (event.shiftKey) {
            console.log("Shift pressed");
        }
    });

---

# 41. `altKey`

    document.addEventListener("keydown", (event) => {
        if (event.altKey) {
            console.log("Alt pressed");
        }
    });

---

# 42. `metaKey`

`metaKey` відповідає системній modifier-клавіші.

На Windows це зазвичай Windows key.

На macOS — Command.

    document.addEventListener("keydown", (event) => {
        if (event.metaKey) {
            console.log("Meta pressed");
        }
    });

---

# 43. Комбінації клавіш

Можна комбінувати modifier keys.

Наприклад:

    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey && event.key === "s") {
            event.preventDefault();

            console.log("Save");
        }
    });

Модель:

    ctrlKey
       +
    key
       ↓
    keyboard shortcut

---

# 44. `event.repeat`

Властивість:

    event.repeat

показує, чи подія виникла через утримання клавіші.

Наприклад:

    document.addEventListener("keydown", (event) => {
        console.log(event.repeat);
    });

При першому натисканні:

    false

При повторних подіях через утримання:

    true

Це може бути корисно в іграх або keyboard controls.

---

# 45. Form Event Object

Для `submit` Event Object дозволяє контролювати стандартну поведінку.

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        console.log(event.target);
    });

Тут:

    event.target

— форма, яка була джерелом submit.

---

# 46. `event.target` у формі

HTML:

    <form id="form">
        <input name="name">
        <button type="submit">Submit</button>
    </form>

JavaScript:

    const form = document.querySelector("#form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        console.log(event.target);
    });

У цьому випадку:

    event.target === form

---

# 47. `event.currentTarget` у формі

    form.addEventListener("submit", (event) => {
        console.log(event.currentTarget);
    });

Оскільки listener встановлений на `form`:

    event.currentTarget === form

У простому випадку:

    target === currentTarget

Але при bubbling вони можуть відрізнятися.

---

# 48. `event.target.value`

Для input:

HTML:

    <input id="name">

JavaScript:

    const input = document.querySelector("#name");

    input.addEventListener("input", (event) => {
        console.log(event.target.value);
    });

Тут:

    event.target

— input.

А:

    event.target.value

— його поточне значення.

---

# 49. `event.target.checked`

Для checkbox:

HTML:

    <input id="agree" type="checkbox">

JavaScript:

    const checkbox = document.querySelector("#agree");

    checkbox.addEventListener("change", (event) => {
        console.log(event.target.checked);
    });

Результат:

    true

або:

    false

---

# 50. `event.target.files`

Для `<input type="file">` можна отримати вибрані файли:

    const input = document.querySelector("#file");

    input.addEventListener("change", (event) => {
        console.log(event.target.files);
    });

Це вже більш спеціалізований випадок Event Object.

---

# 51. Event Object та `classList`

Одна з найкорисніших практик:

    button.addEventListener("click", (event) => {
        event.target.classList.toggle("active");
    });

Тут Event Object дозволяє знайти елемент, на якому сталася подія.

---

# 52. Event Object та DOM traversal

Наприклад:

    list.addEventListener("click", (event) => {
        const item = event.target.closest(".item");

        if (!item) {
            return;
        }

        item.remove();
    });

Тут використовуються:

    event.target
        ↓
    closest()
        ↓
    remove()

Це один із базових патернів для роботи з динамічними списками.

---

# 53. Практичний приклад — Delete

HTML:

    <ul id="list">
        <li class="item">
            JavaScript
            <button class="delete">Delete</button>
        </li>

        <li class="item">
            TypeScript
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

Тут:

    event.target

визначає натиснуту кнопку.

Потім:

    closest(".item")

знаходить Todo.

Після цього:

    remove()

видаляє його.

---

# 54. Практичний приклад — визначення натиснутої кнопки

HTML:

    <div id="actions">
        <button data-action="save">Save</button>
        <button data-action="delete">Delete</button>
        <button data-action="cancel">Cancel</button>
    </div>

JavaScript:

    const actions = document.querySelector("#actions");

    actions.addEventListener("click", (event) => {
        const button = event.target.closest("button");

        if (!button) {
            return;
        }

        console.log(button.dataset.action);
    });

При натисканні:

    Save

отримаємо:

    save

Це вже основа Event Delegation.

---

# 55. Практичний приклад — keyboard shortcut

HTML:

    <input id="search">

JavaScript:

    const search = document.querySelector("#search");

    search.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            console.log("Search");
        }

        if (event.key === "Escape") {
            search.value = "";
        }
    });

Event Object дає всю необхідну інформацію про клавішу.

---

# 56. Практичний приклад — Ctrl + Enter

    textarea.addEventListener("keydown", (event) => {
        if (event.ctrlKey && event.key === "Enter") {
            console.log("Submit");
        }
    });

Комбінація:

    Ctrl
      +
    Enter
      ↓
    action

---

# 57. Практичний приклад — координати

HTML:

    <div id="area"></div>

JavaScript:

    const area = document.querySelector("#area");

    area.addEventListener("click", (event) => {
        console.log({
            x: event.clientX,
            y: event.clientY
        });
    });

При кожному click отримуємо координати.

---

# 58. Практичний приклад — визначення кнопки миші

    document.addEventListener("mousedown", (event) => {
        if (event.button === 0) {
            console.log("Primary button");
        }

        if (event.button === 2) {
            console.log("Secondary button");
        }
    });

---

# 59. Event Object і `this`

Порівняй:

    button.addEventListener("click", function (event) {
        console.log(this);
        console.log(event.currentTarget);
    });

У звичайній функції:

    this === event.currentTarget

У стрілочній функції:

    button.addEventListener("click", (event) => {
        console.log(event.currentTarget);
    });

Тому для сучасного коду часто простіше використовувати:

    event.currentTarget

замість залежності від `this`.

---

# 60. `event.target` може бути вкладеним елементом

HTML:

    <button>
        <span>
            Delete
        </span>
    </button>

Якщо клікнути на `<span>`:

    event.target

може бути:

    span

Тому цей код:

    event.target.classList.add("active");

застосує клас до `span`, а не до button.

Якщо потрібна саме кнопка:

    const button = event.target.closest("button");

Це дуже важливий практичний момент.

---

# 61. `target` не потрібно плутати з `currentTarget`

Запам'ятай:

    target
      ↓
    де подія почалася

    currentTarget
      ↓
    де зараз працює listener

При Event Delegation:

    parent
      │
      ├── button
      ├── button
      └── button

listener:

    parent.addEventListener("click", handler);

Якщо натиснуто button:

    event.target
        ↓
    button

    event.currentTarget
        ↓
    parent

---

# 62. Event Object і Event Delegation

Event Object є ключовим для delegation.

HTML:

    <ul id="list">
        <li>
            <button class="delete">Delete</button>
        </li>
        <li>
            <button class="delete">Delete</button>
        </li>
    </ul>

JavaScript:

    list.addEventListener("click", (event) => {
        if (!event.target.matches(".delete")) {
            return;
        }

        const item = event.target.closest("li");

        item.remove();
    });

Без:

    event.target

цей патерн був би значно складнішим.

---

# 63. Event Object і `preventDefault()`

Приклад посилання:

HTML:

    <a id="link" href="https://example.com">
        Open
    </a>

JavaScript:

    const link = document.querySelector("#link");

    link.addEventListener("click", (event) => {
        event.preventDefault();

        console.log("Navigation cancelled");
    });

Браузер не перейде за посиланням.

---

# 64. Event Object і `stopPropagation()`

HTML:

    <div id="parent">
        <button id="button">Click</button>
    </div>

JavaScript:

    const parent = document.querySelector("#parent");
    const button = document.querySelector("#button");

    parent.addEventListener("click", () => {
        console.log("Parent clicked");
    });

    button.addEventListener("click", (event) => {
        event.stopPropagation();

        console.log("Button clicked");
    });

Подія не буде bubbling до parent.

---

# 65. Три методи, які потрібно розрізняти

    event.preventDefault();

    event.stopPropagation();

    event.stopImmediatePropagation();

### `preventDefault()`

Зупиняє стандартну дію браузера.

### `stopPropagation()`

Зупиняє поширення події.

### `stopImmediatePropagation()`

Зупиняє поширення та інші listeners на поточному target.

---

# 66. Що потрібно пам'ятати

1. Event Object передається браузером у handler.

2. Найчастіше він записується:

       (event) => {}

3. `event.type` — тип події.

4. `event.target` — фактичний target події.

5. `event.currentTarget` — елемент, на якому працює listener.

6. `event.preventDefault()` — скасування default behavior.

7. `event.stopPropagation()` — зупинка propagation.

8. `event.defaultPrevented` — чи була default action скасована.

9. `event.bubbles` — чи підтримує подія bubbling.

10. `event.cancelable` — чи можна скасувати її default action.

11. `event.key` — значення клавіші.

12. `event.code` — фізична клавіша.

13. `event.ctrlKey`, `shiftKey`, `altKey`, `metaKey` — modifier keys.

14. `event.clientX`, `clientY` — координати відносно viewport.

15. `event.pageX`, `pageY` — координати відносно сторінки.

16. Event Object особливо важливий для Event Delegation.

---

# 67. Найважливіші властивості Event Object

| Властивість | Для чого |
|---|---|
| `event.type` | тип події |
| `event.target` | фактичний target |
| `event.currentTarget` | елемент із listener |
| `event.defaultPrevented` | чи скасовано default action |
| `event.bubbles` | чи bubbling'иться подія |
| `event.cancelable` | чи можна скасувати default action |
| `event.eventPhase` | поточна фаза |
| `event.isTrusted` | browser/user event чи scripted |
| `event.timeStamp` | час події |
| `event.clientX` | X відносно viewport |
| `event.clientY` | Y відносно viewport |
| `event.pageX` | X відносно сторінки |
| `event.pageY` | Y відносно сторінки |

---

# 68. Найважливіші Keyboard Properties

| Властивість | Значення |
|---|---|
| `event.key` | значення клавіші |
| `event.code` | фізична клавіша |
| `event.ctrlKey` | Ctrl натиснутий |
| `event.shiftKey` | Shift натиснутий |
| `event.altKey` | Alt натиснутий |
| `event.metaKey` | Meta натиснутий |
| `event.repeat` | клавіша повторюється |

---

# 69. Найважливіші Mouse Properties

| Властивість | Значення |
|---|---|
| `event.clientX` | X у viewport |
| `event.clientY` | Y у viewport |
| `event.pageX` | X у document |
| `event.pageY` | Y у document |
| `event.screenX` | X на екрані |
| `event.screenY` | Y на екрані |
| `event.button` | кнопка миші |
| `event.buttons` | натиснуті кнопки |

---

# 70. Типові помилки

## Помилка 1 — ігнорування Event Object

Можна написати:

    button.addEventListener("click", () => {
        console.log("Clicked");
    });

Це нормально.

Але для реальних UI потрібно знати:

    button.addEventListener("click", (event) => {
        console.log(event.target);
    });

Event Object дає доступ до контексту події.

---

# 71. Помилка 2 — плутати `target` і `currentTarget`

Неправильна ментальна модель:

    target === elementWithListener

Це не завжди так.

Правильно:

    target
      ↓
    де виникла подія

    currentTarget
      ↓
    де виконується listener

---

# 72. Помилка 3 — використовувати `preventDefault()` для bubbling

Неправильно думати:

    event.preventDefault();

зупиняє bubbling.

Ні.

Для bubbling:

    event.stopPropagation();

Для default browser behavior:

    event.preventDefault();

---

# 73. Помилка 4 — використовувати `stopPropagation()` замість `preventDefault()`

Наприклад, для форми:

    form.addEventListener("submit", (event) => {
        event.stopPropagation();
    });

Це не є правильним способом скасувати submit behavior.

Потрібно:

    form.addEventListener("submit", (event) => {
        event.preventDefault();
    });

---

# 74. Помилка 5 — працювати з `target`, коли потрібен parent

Наприклад:

    <button class="delete">
        <span>Delete</span>
    </button>

Якщо клік на span:

    event.target

може бути:

    span

Якщо потрібно знайти button:

    const button = event.target.closest(".delete");

---

# 75. Помилка 6 — використовувати `keyCode`

Старі приклади JavaScript часто містять:

    event.keyCode

Сучасний код краще писати через:

    event.key

або:

    event.code

Наприклад:

    if (event.key === "Enter") {
        // ...
    }

---

# 76. Практичний алгоритм роботи з Event Object

Коли виникає подія, постав собі питання:

### 1. Яка подія?

    event.type

### 2. Де вона виникла?

    event.target

### 3. Де працює listener?

    event.currentTarget

### 4. Чи потрібно скасувати default behavior?

    event.preventDefault();

### 5. Чи потрібно зупинити propagation?

    event.stopPropagation();

### 6. Чи потрібна додаткова інформація?

Для keyboard:

    event.key
    event.code

Для mouse:

    event.clientX
    event.clientY

Для form:

    event.target.value
    event.target.checked

---

# 77. Практична вправа — Event Inspector

Створи:

    <button id="button">Click me</button>

JavaScript:

    const button = document.querySelector("#button");

    button.addEventListener("click", (event) => {
        console.log("type:", event.type);
        console.log("target:", event.target);
        console.log("currentTarget:", event.currentTarget);
        console.log("bubbles:", event.bubbles);
        console.log("cancelable:", event.cancelable);
        console.log("defaultPrevented:", event.defaultPrevented);
    });

Ця вправа дозволяє побачити Event Object на практиці.

---

# 78. Практична вправа — Keyboard Inspector

Створи:

    <input id="input">

JavaScript:

    const input = document.querySelector("#input");

    input.addEventListener("keydown", (event) => {
        console.log("key:", event.key);
        console.log("code:", event.code);
        console.log("ctrl:", event.ctrlKey);
        console.log("shift:", event.shiftKey);
        console.log("alt:", event.altKey);
        console.log("meta:", event.metaKey);
        console.log("repeat:", event.repeat);
    });

Спробуй:

    A
    Enter
    Escape
    Shift + A
    Ctrl + S
    Ctrl + Enter

---

# 79. Практична вправа — Mouse Inspector

Створи:

    <div id="area">Click here</div>

JavaScript:

    const area = document.querySelector("#area");

    area.addEventListener("click", (event) => {
        console.log("client:", event.clientX, event.clientY);
        console.log("page:", event.pageX, event.pageY);
        console.log("screen:", event.screenX, event.screenY);
        console.log("button:", event.button);
    });

Переміщуй сторінку та порівнюй координати.

---

# 80. Практична вправа — `target` vs `currentTarget`

HTML:

    <div id="parent">
        <button>
            <span>Click</span>
        </button>
    </div>

JavaScript:

    const parent = document.querySelector("#parent");

    parent.addEventListener("click", (event) => {
        console.log("target:", event.target);
        console.log("currentTarget:", event.currentTarget);
    });

Клікай:

    div
    button
    span

і дивись, як змінюється `target`.

---

# 81. Практична вправа — Form Event

HTML:

    <form id="form">
        <input id="name" name="name">
        <button type="submit">Send</button>
    </form>

JavaScript:

    const form = document.querySelector("#form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        console.log("type:", event.type);
        console.log("target:", event.target);
        console.log("currentTarget:", event.currentTarget);
    });

---

# 82. Практична вправа — Delete через target

HTML:

    <ul id="list">
        <li class="item">
            JavaScript
            <button class="delete">Delete</button>
        </li>

        <li class="item">
            TypeScript
            <button class="delete">Delete</button>
        </li>
    </ul>

JavaScript:

    const list = document.querySelector("#list");

    list.addEventListener("click", (event) => {
        const button = event.target.closest(".delete");

        if (!button) {
            return;
        }

        const item = button.closest(".item");

        if (!item) {
            return;
        }

        item.remove();
    });

Ця вправа об'єднує:

    event.target
        ↓
    closest()
        ↓
    DOM traversal
        ↓
    remove()

---

# 83. Interview Questions

## Junior

### 1. Що таке Event Object?

Об'єкт, який браузер передає event handler і який містить інформацію про подію.

### 2. Як отримати тип події?

    event.type

### 3. Що таке `event.target`?

Елемент, на якому фактично виникла подія.

### 4. Що таке `event.currentTarget`?

Елемент, на якому встановлений listener, який зараз виконується.

### 5. Для чого `preventDefault()`?

Для скасування стандартної поведінки браузера.

### 6. Для чого `stopPropagation()`?

Для зупинки поширення події.

### 7. Як отримати натиснуту клавішу?

    event.key

---

## Strong Junior

### 8. У чому різниця між `target` і `currentTarget`?

`target` — джерело події.

`currentTarget` — елемент, на якому виконується listener.

### 9. У чому різниця між `key` і `code`?

`key` описує значення клавіші, а `code` — фізичну клавішу.

### 10. Як визначити Ctrl + Enter?

    if (event.ctrlKey && event.key === "Enter") {
        // ...
    }

### 11. Як отримати значення input через Event Object?

    event.target.value

### 12. Як отримати checked checkbox?

    event.target.checked

### 13. Як скасувати submit форми?

    event.preventDefault();

---

## Middle

### 14. Чому `event.target` може бути дочірнім елементом?

Через Event Bubbling.

### 15. Чому Event Object важливий для Event Delegation?

Тому що через `event.target` можна визначити, який дочірній елемент ініціював подію.

### 16. Що робить `stopPropagation()`?

Зупиняє подальше поширення події.

### 17. Чим `stopImmediatePropagation()` відрізняється від `stopPropagation()`?

Він також зупиняє інші listeners на поточному target.

### 18. Що означає `event.bubbles`?

Чи бере подія участь у bubbling.

### 19. Що означає `event.cancelable`?

Чи може default action події бути скасована через `preventDefault()`.

---

# 84. Рівні знань

## 🟢 Core

Потрібно знати:

    event
    event.type
    event.target
    event.currentTarget
    event.preventDefault()

Вміти:

- отримувати інформацію про click;
- працювати з input;
- обробляти submit;
- отримувати натиснуту клавішу.

---

## 🟡 Junior

Потрібно добре знати:

    target
    currentTarget
    key
    code
    ctrlKey
    shiftKey
    altKey
    metaKey
    clientX
    clientY

Вміти:

- створювати keyboard shortcuts;
- обробляти form events;
- працювати з checkbox;
- визначати target;
- використовувати `closest()`;
- робити Delete через delegation.

---

## 🟠 Middle

Потрібно розуміти:

    bubbles
    cancelable
    defaultPrevented
    eventPhase
    stopPropagation()
    stopImmediatePropagation()
    capture
    bubbling
    event delegation

---

## 🔴 Senior

Потрібно розуміти:

- повний lifecycle Event;
- capture phase;
- target phase;
- bubble phase;
- Shadow DOM;
- composed events;
- performance;
- event delegation;
- listener lifecycle;
- custom events;
- browser event architecture.

---

# 85. Міні-шпаргалка

    // Тип події
    event.type;

    // Джерело події
    event.target;

    // Елемент із listener
    event.currentTarget;

    // Скасувати default behavior
    event.preventDefault();

    // Чи скасовано default behavior
    event.defaultPrevented;

    // Зупинити propagation
    event.stopPropagation();

    // Зупинити propagation + інші listeners
    event.stopImmediatePropagation();

    // Чи bubbling
    event.bubbles;

    // Чи cancelable
    event.cancelable;

    // Keyboard
    event.key;
    event.code;

    // Modifier keys
    event.ctrlKey;
    event.shiftKey;
    event.altKey;
    event.metaKey;

    // Mouse coordinates
    event.clientX;
    event.clientY;
    event.pageX;
    event.pageY;

    // Mouse buttons
    event.button;
    event.buttons;

    // Input
    event.target.value;

    // Checkbox
    event.target.checked;

    // Files
    event.target.files;

---

# 86. Найважливіший шаблон

    element.addEventListener("click", (event) => {
        console.log(event.type);
        console.log(event.target);
        console.log(event.currentTarget);
    });

Потрібно навчитися автоматично розуміти:

    event.type
        ↓
    Що сталося?

    event.target
        ↓
    Де це сталося?

    event.currentTarget
        ↓
    Де працює мій listener?

---

# 87. Другий важливий шаблон

Для форми:

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const value = event.target.elements.name.value;

        console.log(value);
    });

Ментальна модель:

    submit
      ↓
    event
      ↓
    preventDefault()
      ↓
    event.target
      ↓
    read data
      ↓
    process data

---

# 88. Третій важливий шаблон

Для keyboard:

    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            // action
        }
    });

Для комбінації:

    document.addEventListener("keydown", (event) => {
        if (event.ctrlKey && event.key === "s") {
            event.preventDefault();

            // action
        }
    });

---

# 89. Четвертий важливий шаблон

Для динамічного списку:

    list.addEventListener("click", (event) => {
        const button = event.target.closest(".delete");

        if (!button) {
            return;
        }

        const item = button.closest(".item");

        if (!item) {
            return;
        }

        item.remove();
    });

Цей патерн особливо важливий для Junior frontend developer.

---

# 90. DOM Events — повна ментальна модель

Тепер можна побудувати повний ланцюжок:

    User
      ↓
    Browser
      ↓
    Event
      ↓
    Event Object
      ↓
    addEventListener()
      ↓
    Handler
      ↓
    event.target
    event.currentTarget
    event.key
    event.value
    event.clientX
    ...
      ↓
    JavaScript Logic
      ↓
    DOM Update
      ↓
    UI

Наприклад:

    User clicks Delete
            ↓
        click event
            ↓
        Event Object
            ↓
        event.target
            ↓
        closest(".item")
            ↓
        item.remove()
            ↓
        UI updated

---

# 91. Що вивчати далі

Після:

    10-events
        ↓
    11-event-object

наступний логічний крок:

    12-event-bubbling

Там потрібно детально розібрати:

    Event Propagation
          ↓
    Capture Phase
          ↓
    Target Phase
          ↓
    Bubble Phase
          ↓
    stopPropagation()
          ↓
    Event Delegation

Після цього:

    13-event-delegation

і вже тоді можна повноцінно працювати з:

    Dynamic DOM
        ↓
    Events
        ↓
    Event Object
        ↓
    Bubbling
        ↓
    Delegation
        ↓
    Interactive UI

---

# 92. Головне

Event Object — це **контекст конкретної події**.

Не просто:

    "Сталася подія."

А:

    "Сталася подія click,
     ось її target,
     ось currentTarget,
     ось координати,
     ось тип,
     ось інша інформація."

Найважливіші властивості, які потрібно знати на Junior-рівні:

    event.type
    event.target
    event.currentTarget
    event.key
    event.code
    event.ctrlKey
    event.shiftKey
    event.clientX
    event.clientY

Найважливіші методи:

    event.preventDefault()
    event.stopPropagation()

І найважливіша різниця:

    target
      ↓
    де подія виникла

    currentTarget
      ↓
    де працює listener

А для практичної роботи з UI:

    Event
      ↓
    Event Object
      ↓
    target
      ↓
    closest()
      ↓
    DOM operation

Саме Event Object перетворює звичайний event listener на інструмент, за допомогою якого JavaScript може зрозуміти **що саме зробив користувач і з яким DOM-елементом потрібно працювати**.