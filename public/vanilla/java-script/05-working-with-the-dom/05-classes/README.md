# 05. Classes у DOM

## 📌 Вступ

CSS-класи — один із найважливіших способів керування зовнішнім виглядом HTML-елементів.

Наприклад:

    <button class="button active">
        Save
    </button>

JavaScript може:

- перевірити, чи має елемент певний клас;
- додати клас;
- видалити клас;
- перемикати клас;
- замінити один клас іншим;
- отримати список класів;
- керувати кількома класами;
- динамічно змінювати UI через CSS-класи.

Основний інструмент:

    element.classList

Найважливіші методи:

    add()
    remove()
    toggle()
    contains()
    replace()

Також існує:

    element.className

Але для сучасної роботи з окремими класами переважно використовують:

    classList

---

# 1. Що таке CSS-клас?

CSS-клас — це значення атрибута `class`.

HTML:

    <button class="button">
        Save
    </button>

Тут:

    class="button"

означає, що елемент має клас:

    button

CSS може використовувати цей клас:

    .button {
        padding: 10px 20px;
    }

JavaScript може динамічно змінювати його:

    button.classList.add("active");

---

# 2. `className`

Клас HTML-елемента можна отримати через:

    element.className

Наприклад:

    <div class="card active"></div>

JavaScript:

    const card = document.querySelector(".card");

    console.log(card.className);

Результат:

    "card active"

---

# 3. Зміна `className`

Можна повністю замінити значення `class`:

    card.className = "card active";

Якщо було:

    <div class="card old large"></div>

після:

    card.className = "card active";

отримаємо:

    <div class="card active"></div>

Класи:

    old
    large

будуть видалені.

Тому `className` потрібно використовувати обережно.

---

# 4. Чому `classList` кращий для окремих класів

Припустимо:

    <div class="card"></div>

Потрібно додати:

    active

Через `className` довелося б працювати з усім рядком:

    card.className = "card active";

А через `classList`:

    card.classList.add("active");

Це значно безпечніше і зрозуміліше.

---

# 5. `classList`

`classList` — це DOMTokenList, який представляє список CSS-класів елемента.

Наприклад:

    <div class="card active large"></div>

JavaScript:

    const card = document.querySelector(".card");

    console.log(card.classList);

Можна отримати список:

    card
    active
    large

Основні методи:

    classList.add()
    classList.remove()
    classList.toggle()
    classList.contains()
    classList.replace()

---

# 6. `classList.add()`

Метод:

    element.classList.add("className")

додає клас до елемента.

HTML:

    <button class="button">
        Save
    </button>

JavaScript:

    const button = document.querySelector(".button");

    button.classList.add("active");

Результат:

    <button class="button active">
        Save
    </button>

---

# 7. Додавання кількох класів

`add()` може додавати кілька класів одночасно.

    element.classList.add(
        "active",
        "large",
        "primary"
    );

Було:

    <div class="card"></div>

Стане:

    <div class="card active large primary"></div>

Це зручно, коли потрібно додати кілька станів.

---

# 8. `classList.add()` не дублює клас

Якщо клас уже існує:

    <div class="card active"></div>

і виконати:

    card.classList.add("active");

другого `active` не з'явиться.

Результат залишиться:

    <div class="card active"></div>

Тому `add()` безпечний для повторного додавання того самого класу.

---

# 9. `classList.remove()`

Метод:

    element.classList.remove("className")

видаляє клас.

HTML:

    <div class="card active"></div>

JavaScript:

    card.classList.remove("active");

Результат:

    <div class="card"></div>

---

# 10. Видалення кількох класів

Можна видалити кілька класів:

    card.classList.remove(
        "active",
        "large",
        "primary"
    );

Наприклад:

    <div class="card active large primary"></div>

стане:

    <div class="card"></div>

---

# 11. `remove()` для класу, якого немає

Якщо клас відсутній:

    card.classList.remove("unknown");

помилки не буде.

Це зручно, тому що не потрібно обов'язково перевіряти:

    if (card.classList.contains("unknown")) {
        card.classList.remove("unknown");
    }

Можна просто:

    card.classList.remove("unknown");

---

# 12. `classList.contains()`

Метод:

    element.classList.contains("className")

перевіряє, чи має елемент певний клас.

Повертає:

    true

або:

    false

Наприклад:

    <button class="button active">
        Save
    </button>

JavaScript:

    const button = document.querySelector(".button");

    console.log(
        button.classList.contains("active")
    );

Результат:

    true

---

# 13. Якщо класу немає

    console.log(
        button.classList.contains("disabled")
    );

Результат:

    false

Типовий шаблон:

    if (element.classList.contains("active")) {
        console.log("Element is active");
    }

---

# 14. `classList.toggle()`

`toggle()` — один із найважливіших методів.

Він працює за принципом:

    якщо клас є
        ↓
    видалити

    якщо класу немає
        ↓
    додати

Наприклад:

    button.classList.toggle("active");

---

# 15. Простий `toggle()`

Було:

    <button class="button">
        Menu
    </button>

Виконуємо:

    button.classList.toggle("active");

Стане:

    <button class="button active">
        Menu
    </button>

Викликаємо ще раз:

    button.classList.toggle("active");

Стане:

    <button class="button">
        Menu
    </button>

Тобто:

    toggle()
    ↓
    ON / OFF

---

# 16. `toggle()` і UI

Саме `toggle()` часто використовується для:

- відкриття / закриття меню;
- показу / приховування елементів;
- dark mode;
- active state;
- selected state;
- accordion;
- mobile navigation;
- dropdown;
- modal;
- sidebar.

Наприклад:

    menu.classList.toggle("open");

---

# 17. `classList.replace()`

Метод:

    element.classList.replace(
        "oldClass",
        "newClass"
    );

замінює один клас іншим.

Наприклад:

    <button class="button primary">
        Save
    </button>

JavaScript:

    button.classList.replace(
        "primary",
        "secondary"
    );

Результат:

    <button class="button secondary">
        Save
    </button>

---

# 18. `replace()` повертає результат

`replace()` повертає:

    true

якщо клас було знайдено і замінено.

Якщо старого класу немає:

    false

Наприклад:

    const replaced = button.classList.replace(
        "primary",
        "secondary"
    );

    console.log(replaced);

---

# 19. `classList` як колекція

Для:

    <div class="card active large"></div>

можна звертатися до класів за індексом:

    card.classList[0]

Результат:

    "card"

    card.classList[1]

Результат:

    "active"

    card.classList[2]

Результат:

    "large"

Але для звичайної роботи краще використовувати:

    contains()
    add()
    remove()
    toggle()
    replace()

---

# 20. `classList.length`

Можна отримати кількість класів:

    console.log(card.classList.length);

Для:

    <div class="card active large"></div>

отримаємо:

    3

---

# 21. Перебір класів

Оскільки `classList` є колекцією, її можна перебирати.

    for (const className of card.classList) {
        console.log(className);
    }

Для:

    <div class="card active large"></div>

отримаємо:

    card
    active
    large

---

# 22. `classList` і `for...of`

Типовий приклад:

    const classes = document.querySelector(".card");

    for (const className of classes.classList) {
        console.log(className);
    }

Це може бути корисно під час debugging або аналізу DOM.

У звичайних задачах вручну перебирати всі класи потрібно рідко.

---

# 23. `className` vs `classList`

Це важливе порівняння.

### `className`

Працює з усім значенням `class` як із рядком:

    element.className

Наприклад:

    "card active large"

---

### `classList`

Працює з окремими класами:

    element.classList

Методи:

    add()
    remove()
    toggle()
    contains()
    replace()

Тому:

    className → весь рядок

    classList → окремі класи

---

# 24. Коли використовувати `className`

`className` може бути корисним, коли потрібно **повністю замінити набір класів**.

Наприклад:

    element.className = "error-message";

Було:

    <div class="message success"></div>

Стане:

    <div class="error-message"></div>

Але якщо потрібно додати тільки один клас:

    element.classList.add("error");

краще використовувати `classList`.

---

# 25. Коли використовувати `classList`

Практично завжди, коли потрібно:

- додати клас;
- видалити клас;
- перевірити клас;
- перемкнути клас;
- замінити клас.

Наприклад:

    element.classList.add("active");

    element.classList.remove("active");

    element.classList.contains("active");

    element.classList.toggle("active");

    element.classList.replace("old", "new");

---

# 26. Додавання класу

HTML:

    <div class="card"></div>

JavaScript:

    const card = document.querySelector(".card");

    card.classList.add("active");

CSS:

    .active {
        border: 2px solid black;
    }

Тепер JavaScript керує UI через CSS-клас.

---

# 27. Видалення класу

    card.classList.remove("active");

CSS перестане застосовуватися до елемента через цей клас.

Це важливий принцип:

    JavaScript
        ↓
    змінює class
        ↓
    CSS
        ↓
    змінює appearance

---

# 28. Перемикання стану

Наприклад:

    card.classList.toggle("selected");

Якщо:

    selected

немає:

    → додасться

Якщо:

    selected

є:

    → видалиться

Це один із найпоширеніших патернів DOM.

---

# 29. Перевірка стану через `contains()`

    if (card.classList.contains("selected")) {
        console.log("Selected");
    } else {
        console.log("Not selected");
    }

Це дозволяє читати UI-стан, який представлений CSS-класом.

---

# 30. Практичний приклад — active button

HTML:

    <button class="button">
        Click
    </button>

JavaScript:

    const button = document.querySelector(".button");

    button.classList.add("active");

CSS:

    .button.active {
        font-weight: bold;
    }

---

# 31. Практичний приклад — показати / приховати

HTML:

    <div class="message">
        Hello
    </div>

CSS:

    .hidden {
        display: none;
    }

JavaScript:

    const message = document.querySelector(".message");

    message.classList.add("hidden");

Елемент стане прихованим.

Показати:

    message.classList.remove("hidden");

---

# 32. Toggle для show / hide

Замість:

    if (message.classList.contains("hidden")) {
        message.classList.remove("hidden");
    } else {
        message.classList.add("hidden");
    }

можна:

    message.classList.toggle("hidden");

Це набагато коротше.

---

# 33. Практичний приклад — dark mode

HTML:

    <body>
        <button class="theme-button">
            Theme
        </button>
    </body>

CSS:

    .dark {
        background: black;
        color: white;
    }

JavaScript:

    const button = document.querySelector(".theme-button");

    button.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });

Клік:

    click
      ↓
    toggle("dark")
      ↓
    CSS змінює вигляд сторінки

---

# 34. Практичний приклад — selected item

HTML:

    <div class="item">One</div>
    <div class="item">Two</div>

JavaScript:

    const items = document.querySelectorAll(".item");

    items.forEach(item => {
        item.addEventListener("click", () => {
            item.classList.toggle("selected");
        });
    });

Тепер кожен елемент може мати стан:

    selected

або:

    not selected

---

# 35. Практичний приклад — статус

HTML:

    <div class="user"></div>

JavaScript:

    const user = document.querySelector(".user");

    user.classList.add("online");

Потім:

    user.classList.remove("online");

Або можна замінити:

    user.classList.replace(
        "online",
        "offline"
    );

---

# 36. Практичний приклад — заміна стану

HTML:

    <div class="status pending">
        Pending
    </div>

JavaScript:

    const status = document.querySelector(".status");

    status.classList.replace(
        "pending",
        "success"
    );

Тепер:

    <div class="status success">
        Pending
    </div>

---

# 37. Краще змінювати і текст, і клас

Наприклад:

    const status = document.querySelector(".status");

    status.classList.replace(
        "pending",
        "success"
    );

    status.textContent = "Completed";

Тепер:

    <div class="status success">
        Completed
    </div>

Це типовий DOM-патерн:

    change state
      ↓
    change class
      ↓
    change text

---

# 38. Практичний приклад — validation

HTML:

    <input class="email">

CSS:

    .error {
        border: 2px solid red;
    }

JavaScript:

    const input = document.querySelector(".email");

    const valid = false;

    if (!valid) {
        input.classList.add("error");
    }

Якщо значення стало правильним:

    input.classList.remove("error");

---

# 39. Практичний приклад — success / error

    if (success) {
        message.classList.remove("error");
        message.classList.add("success");
    } else {
        message.classList.remove("success");
        message.classList.add("error");
    }

Це працює, але можна зробити ще акуратніше через:

    classList.replace()

якщо ми точно знаємо, який стан зараз активний.

---

# 40. Практичний приклад — `toggle()` з перевіркою

`toggle()` може повертати boolean.

    const isActive = button.classList.toggle("active");

Після цього:

    isActive

буде:

    true

якщо клас доданий,

або:

    false

якщо клас видалений.

Це може бути дуже корисно.

---

# 41. `toggle()` з другим аргументом

У `toggle()` можна передати другий аргумент:

    element.classList.toggle(
        "active",
        condition
    );

Це означає:

    condition === true
        → клас має бути

    condition === false
        → класу не має бути

Наприклад:

    const isActive = true;

    button.classList.toggle(
        "active",
        isActive
    );

Результат:

    active

буде присутній.

---

# 42. `toggle(class, condition)` — дуже корисний патерн

Наприклад:

    const isError = true;

    input.classList.toggle(
        "error",
        isError
    );

Якщо:

    isError === true

клас:

    error

буде доданий.

Якщо:

    isError === false

клас буде видалений.

Це дозволяє синхронізувати DOM із JavaScript-станом.

---

# 43. `toggle()` без умови vs з умовою

### Без другого аргументу

    element.classList.toggle("active");

Логіка:

    є → видалити
    немає → додати

---

### З другим аргументом

    element.classList.toggle(
        "active",
        isActive
    );

Логіка:

    isActive === true
        → active є

    isActive === false
        → active немає

---

# 44. Практичний приклад — validation state

    const isValid = email.value.includes("@");

    input.classList.toggle(
        "valid",
        isValid
    );

    input.classList.toggle(
        "invalid",
        !isValid
    );

Тепер класи відповідають стану:

    valid
    або
    invalid

---

# 45. `classList.add()` і CSS

JavaScript:

    card.classList.add("highlight");

CSS:

    .highlight {
        background: yellow;
    }

JavaScript не обов'язково повинен безпосередньо змінювати стилі.

Замість:

    element.style.background = "yellow";

часто краще:

    element.classList.add("highlight");

А стиль зберігати в CSS.

Це розділяє:

    JavaScript → поведінка / стан

    CSS → presentation

---

# 46. Class-based UI

Хороший підхід:

    JavaScript
        ↓
    додає / видаляє клас
        ↓
    CSS
        ↓
    визначає вигляд

Наприклад:

    button.classList.add("loading");

CSS:

    .loading {
        opacity: 0.5;
    }

JavaScript не знає деталей оформлення.

Він лише повідомляє:

    button зараз loading

---

# 47. Стан через CSS-класи

Дуже часто клас представляє стан:

    active
    selected
    hidden
    open
    closed
    loading
    error
    success
    disabled
    completed

Наприклад:

    modal.classList.add("open");

Це означає:

    modal → open

---

# 48. Один елемент — кілька класів

HTML:

    <button
        class="button primary large active"
    >
        Save
    </button>

Можна незалежно керувати кожним:

    button.classList.add("disabled");

    button.classList.remove("large");

    button.classList.toggle("active");

Результат:

    <button
        class="button primary active disabled"
    >
        Save
    </button>

---

# 49. Не потрібно вручну створювати рядок класів

Не варто робити:

    element.className += " active";

Краще:

    element.classList.add("active");

Чому?

Тому що `classList` правильно працює зі списком класів і не створює зайвих проблем із пробілами та дублюванням.

---

# 50. Небажаний підхід

Наприклад:

    element.className += " active";

Можуть виникнути проблеми:

    "card active"

або:

    "cardactive"

якщо неправильно працювати з пробілами.

Також можна випадково отримати дублікати:

    "card active active"

`classList.add()` таких проблем не має.

---

# 51. `className` може видалити класи

Було:

    <div class="card active large"></div>

Виконуємо:

    element.className = "card";

Стане:

    <div class="card"></div>

Тому:

    className = ...

означає:

    повністю замінити class attribute

---

# 52. `classList` не замінює весь список

    element.classList.add("active");

додає тільки:

    active

Існуючі класи залишаються.

Було:

    card large

Після:

    card large active

---

# 53. `classList.remove()` не впливає на інші класи

Було:

    <div class="card active large"></div>

Виконуємо:

    element.classList.remove("active");

Отримаємо:

    <div class="card large"></div>

`card` і `large` залишаються.

---

# 54. `classList.replace()`

Якщо потрібно:

    old state
      ↓
    new state

можна:

    element.classList.replace(
        "loading",
        "success"
    );

Наприклад:

    loading
      ↓
    success

---

# 55. Практичний state machine

Можна представити UI-стан:

    pending
      ↓
    loading
      ↓
    success

або:

    pending
      ↓
    loading
      ↓
    error

JavaScript:

    element.classList.replace(
        "pending",
        "loading"
    );

потім:

    element.classList.replace(
        "loading",
        "success"
    );

Це вже наближається до реального UI-архітектурного мислення.

---

# 56. Практичний приклад — loading button

HTML:

    <button class="button">
        Save
    </button>

JavaScript:

    button.classList.add("loading");

    button.textContent = "Saving...";

Після завершення:

    button.classList.remove("loading");

    button.textContent = "Saved";

---

# 57. Практичний приклад — modal

HTML:

    <div class="modal">
        Modal content
    </div>

CSS:

    .modal {
        display: none;
    }

    .modal.open {
        display: block;
    }

JavaScript:

    const modal = document.querySelector(".modal");

    modal.classList.add("open");

Закрити:

    modal.classList.remove("open");

Або:

    modal.classList.toggle("open");

---

# 58. Практичний приклад — accordion

HTML:

    <div class="accordion">
        <button class="accordion-button">
            Details
        </button>

        <div class="accordion-content">
            Content
        </div>
    </div>

JavaScript:

    const accordion = document.querySelector(".accordion");

    accordion.classList.toggle("open");

CSS може реагувати:

    .accordion-content {
        display: none;
    }

    .accordion.open .accordion-content {
        display: block;
    }

Це дуже поширена схема:

    parent.classList.toggle("open");

---

# 59. Практичний приклад — navigation

HTML:

    <nav class="navigation">
        ...
    </nav>

JavaScript:

    const navigation = document.querySelector(".navigation");

    navigation.classList.toggle("open");

CSS:

    .navigation.open {
        display: block;
    }

---

# 60. Практичний приклад — active navigation item

    const links = document.querySelectorAll(".nav-link");

    links.forEach(link => {
        link.addEventListener("click", () => {
            links.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");
        });
    });

Тут використовується:

    querySelectorAll()
    +
    forEach()
    +
    classList.remove()
    +
    classList.add()

---

# 61. Практичний приклад — один active елемент

HTML:

    <button class="tab active">HTML</button>
    <button class="tab">CSS</button>
    <button class="tab">JavaScript</button>

JavaScript:

    const tabs = document.querySelectorAll(".tab");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(item => {
                item.classList.remove("active");
            });

            tab.classList.add("active");
        });
    });

Це фундаментальний патерн для tabs, menus, filters тощо.

---

# 62. Практична вправа №1 — додати клас

HTML:

    <div class="card"></div>

Завдання:

Додати:

    active

Рішення:

    const card = document.querySelector(".card");

    card.classList.add("active");

---

# 63. Практична вправа №2 — видалити клас

HTML:

    <div class="card active"></div>

Завдання:

Видалити:

    active

Рішення:

    card.classList.remove("active");

---

# 64. Практична вправа №3 — перевірити клас

    if (card.classList.contains("active")) {
        console.log("Active");
    }

---

# 65. Практична вправа №4 — toggle

Завдання:

Кожен виклик має перемикати `active`.

Рішення:

    card.classList.toggle("active");

---

# 66. Практична вправа №5 — replace

Було:

    <div class="status pending"></div>

Змінити:

    pending

на:

    success

Рішення:

    status.classList.replace(
        "pending",
        "success"
    );

---

# 67. Практична вправа №6 — кілька класів

Додати:

    active
    large
    primary

Рішення:

    element.classList.add(
        "active",
        "large",
        "primary"
    );

---

# 68. Практична вправа №7 — кілька класів видалити

    element.classList.remove(
        "active",
        "large",
        "primary"
    );

---

# 69. Практична вправа №8 — hidden

CSS:

    .hidden {
        display: none;
    }

JavaScript:

    element.classList.toggle("hidden");

---

# 70. Практична вправа №9 — синхронізація зі станом

    const isActive = true;

    element.classList.toggle(
        "active",
        isActive
    );

Якщо:

    isActive === true

елемент має:

    active

Якщо:

    isActive === false

елемент не має:

    active

---

# 71. Практична вправа №10 — validation

    const isValid = false;

    input.classList.toggle(
        "valid",
        isValid
    );

    input.classList.toggle(
        "invalid",
        !isValid
    );

---

# 72. Типові помилки

## ❌ Помилка 1 — використовувати `className` для додавання одного класу

Не потрібно:

    element.className = element.className + " active";

Краще:

    element.classList.add("active");

---

## ❌ Помилка 2 — повністю перезаписувати `className`

Було:

    class="card active large"

Виконуємо:

    element.className = "card";

Втрачаємо:

    active
    large

---

## ❌ Помилка 3 — використовувати `toggle()` там, де потрібен конкретний стан

Наприклад, якщо:

    isLoading = true

краще:

    element.classList.toggle(
        "loading",
        isLoading
    );

а не:

    element.classList.toggle("loading");

Бо другий варіант просто інвертує поточний стан.

---

# 73. `toggle()` — інверсія vs синхронізація

Це важливо.

### Інверсія

    element.classList.toggle("active");

означає:

    active → off
    off → active

### Синхронізація

    element.classList.toggle(
        "active",
        isActive
    );

означає:

    isActive = true
        → active

    isActive = false
        → не active

Другий варіант часто краще підходить для UI, який повинен відповідати конкретному стану JavaScript.

---

# 74. ❌ Помилка 4 — неправильний `contains()`

Не:

    element.classList.contains(".active");

А:

    element.classList.contains("active");

`classList` працює з назвою класу **без крапки**.

Селектор:

    ".active"

використовується в CSS або `querySelector()`.

Клас:

    "active"

використовується в `classList`.

---

# 75. ❌ Помилка 5 — плутати class selector і class name

Для:

    document.querySelector(".active")

потрібна крапка:

    .active

Для:

    element.classList.add("active")

крапка не потрібна.

Запам'ятати:

    CSS selector:
    ".active"

    classList:
    "active"

---

# 76. ❌ Помилка 6 — вручну маніпулювати пробілами

Не варто:

    element.className += " active";

Краще:

    element.classList.add("active");

---

# 77. ❌ Помилка 7 — використовувати `classList` до перевірки елемента

Якщо:

    const element = document.querySelector(".unknown");

повернув:

    null

то:

    element.classList.add("active");

викличе помилку.

Тому в коді потрібно враховувати можливість відсутності елемента:

    const element = document.querySelector(".unknown");

    if (element) {
        element.classList.add("active");
    }

---

# 78. ❌ Помилка 8 — змішувати стани без контролю

Наприклад:

    element.classList.add("success");
    element.classList.add("error");

Тепер елемент має два суперечливі стани.

Краще контролювати state:

    element.classList.remove(
        "success",
        "error"
    );

    element.classList.add("success");

або використовувати:

    classList.replace()

коли це доречно.

---

# 79. CSS-клас як стан

Хороший підхід:

    .modal.open
    .button.active
    .input.error
    .item.selected
    .card.loading
    .message.success

JavaScript змінює:

    open
    active
    error
    selected
    loading
    success

А CSS відповідає за зовнішній вигляд.

---

# 80. `classList` + DOM traversal

Можна комбінувати попередні теми.

HTML:

    <article class="card">
        <h2>JavaScript</h2>
        <button class="button">Select</button>
    </article>

JavaScript:

    const button = document.querySelector(".button");

    const card = button.closest(".card");

    card.classList.add("selected");

Тут працюють разом:

    element selection
    +
    DOM traversal
    +
    classList

---

# 81. `classList` + textContent

    const message = document.querySelector(".message");

    message.classList.add("success");

    message.textContent = "Saved successfully.";

Тут:

    classList → візуальний стан

    textContent → текст

---

# 82. `classList` + attributes

Наприклад:

    const button = document.querySelector(".button");

    button.disabled = true;

    button.classList.add("disabled");

Тут:

    disabled property
        +
    CSS class

Але важливо не плутати ці речі:

    disabled

реально змінює функціональний стан кнопки,

а:

    class="disabled"

сам по собі лише змінює CSS-вигляд.

---

# 83. Важливе правило

CSS-клас:

    disabled

не робить елемент реально disabled.

Наприклад:

    button.classList.add("disabled");

може лише змінити вигляд.

Щоб реально заборонити кнопку:

    button.disabled = true;

Тобто:

    class → presentation / UI state

    property → actual DOM behavior

---

# 84. Практичний приклад — disabled button

    button.disabled = true;

    button.classList.add("disabled");

CSS:

    .disabled {
        opacity: 0.5;
    }

Тепер:

    disabled property
        → кнопка реально disabled

    disabled class
        → кнопка виглядає disabled

---

# 85. `classList` і компоненти

Навіть у простому vanilla JavaScript можна мислити компонентами.

Наприклад:

    <div class="card"></div>

Стани:

    card
    card.active
    card.loading
    card.error
    card.success

JavaScript керує переходами:

    card.classList.add("loading");

    card.classList.replace(
        "loading",
        "success"
    );

Це вже хороша основа для майбутнього розуміння React state.

---

# 86. Core — що потрібно знати обов'язково

На базовому рівні потрібно впевнено знати:

- `className`;
- `classList`;
- `add()`;
- `remove()`;
- `contains()`;
- `toggle()`;
- `replace()`;
- `length`;
- різницю `className` / `classList`;
- selector `.active` vs class name `"active"`.

Мінімум:

    element.classList.add("active");

    element.classList.remove("active");

    element.classList.contains("active");

    element.classList.toggle("active");

---

# 87. Junior — що потрібно вміти

На Junior-рівні:

- керувати UI через CSS-класи;
- створювати active/selected states;
- робити show/hide через клас;
- робити dark mode;
- реалізовувати tabs;
- реалізовувати accordion;
- реалізовувати modal;
- працювати з validation classes;
- використовувати `toggle(class, condition)`;
- комбінувати `classList` з `textContent`;
- комбінувати `classList` з attributes;
- розуміти різницю між CSS-станом і реальним DOM state.

---

# 88. Middle — що варто розуміти

На Middle-рівні:

- проектувати UI states;
- не допускати суперечливих класів;
- розділяти behavior і presentation;
- розуміти state transitions;
- будувати reusable DOM-компоненти;
- працювати з великими наборами DOM-елементів;
- розуміти вплив класів на CSS cascade;
- розуміти specificity;
- правильно синхронізувати JavaScript state і DOM state;
- використовувати класи як простий state representation.

---

# 89. Senior — що варто знати

На Senior-рівні:

- state-driven UI;
- CSS architecture;
- BEM та інші методології класів;
- utility classes;
- CSS Modules;
- CSS-in-JS;
- design systems;
- Web Components;
- custom elements;
- Shadow DOM;
- class-based state vs application state;
- DOM performance;
- batching DOM updates;
- rendering pipeline;
- reconciliation у React.

Для vanilla JavaScript достатньо спочатку впевнено опанувати `classList`.

---

# 90. Питання для співбесіди

### 1. Що таке `classList`?

`classList` — це DOM API для роботи зі списком CSS-класів елемента.

---

### 2. Які основні методи `classList`?

    add()
    remove()
    contains()
    toggle()
    replace()

---

### 3. Чим `className` відрізняється від `classList`?

`className` працює з усім значенням атрибута `class` як із рядком.

`classList` дозволяє працювати з окремими класами.

---

### 4. Як додати клас?

    element.classList.add("active");

---

### 5. Як видалити клас?

    element.classList.remove("active");

---

### 6. Як перевірити клас?

    element.classList.contains("active");

---

### 7. Як перемкнути клас?

    element.classList.toggle("active");

---

### 8. Як замінити клас?

    element.classList.replace(
        "old",
        "new"
    );

---

### 9. Чи можна додати кілька класів?

Так:

    element.classList.add(
        "active",
        "large",
        "primary"
    );

---

### 10. Чи дублює `classList.add()` існуючий клас?

Ні.

Якщо клас уже існує, дубль не створюється.

---

### 11. Що робить `toggle()`?

Якщо клас є — видаляє його.

Якщо класу немає — додає його.

---

### 12. Що робить другий аргумент `toggle()`?

Наприклад:

    element.classList.toggle(
        "active",
        isActive
    );

Він дозволяє синхронізувати наявність класу з boolean-умовою.

---

### 13. Що повертає `contains()`?

    true
    або
    false

---

### 14. Чим відрізняється:

    ".active"

від:

    "active"

Для:

    querySelector()

потрібен CSS selector:

    ".active"

Для:

    classList.add()

потрібна назва класу:

    "active"

---

### 15. Чому не рекомендується:

    element.className += " active";

Краще використовувати:

    element.classList.add("active");

Тому що `classList` призначений саме для роботи зі списком класів.

---

### 16. Чи робить клас `disabled` кнопку disabled?

Ні.

    button.classList.add("disabled");

може змінити лише вигляд.

Для реального стану:

    button.disabled = true;

---

### 17. Як приховати елемент через клас?

CSS:

    .hidden {
        display: none;
    }

JavaScript:

    element.classList.add("hidden");

---

### 18. Як реалізувати toggle show/hide?

    element.classList.toggle("hidden");

---

# 91. Міні-шпаргалка

## Отримати всі класи

    element.className

## Отримати список класів

    element.classList

## Додати

    element.classList.add("active");

## Додати кілька

    element.classList.add(
        "active",
        "large"
    );

## Видалити

    element.classList.remove("active");

## Видалити кілька

    element.classList.remove(
        "active",
        "large"
    );

## Перевірити

    element.classList.contains("active");

## Toggle

    element.classList.toggle("active");

## Toggle із condition

    element.classList.toggle(
        "active",
        isActive
    );

## Замінити

    element.classList.replace(
        "old",
        "new"
    );

## Кількість класів

    element.classList.length

## Перебрати

    for (const className of element.classList) {
        console.log(className);
    }

---

# 92. Швидка таблиця

| Завдання | Інструмент |
|---|---|
| Отримати весь `class` | `className` |
| Отримати список класів | `classList` |
| Додати клас | `classList.add()` |
| Видалити клас | `classList.remove()` |
| Перевірити клас | `classList.contains()` |
| Перемкнути клас | `classList.toggle()` |
| Синхронізувати з умовою | `classList.toggle(class, condition)` |
| Замінити клас | `classList.replace()` |
| Кількість класів | `classList.length` |
| Перебрати класи | `for...of` |

---

# 93. Головне порівняння

Для:

    <button class="button primary active">
        Save
    </button>

Маємо:

    button.className
    ↓
    "button primary active"

    button.classList
    ↓
    ["button", "primary", "active"]

    button.classList.contains("active")
    ↓
    true

    button.classList.add("large")
    ↓
    button primary active large

    button.classList.remove("primary")
    ↓
    button active large

    button.classList.toggle("active")
    ↓
    button large

    button.classList.replace("large", "small")
    ↓
    button small

---

# 94. Фінальна модель

Варто бачити роботу з класами так:

    HTML ELEMENT
         │
         └── class
              │
              ├── className
              │      └── весь рядок класів
              │
              └── classList
                     │
                     ├── add()
                     ├── remove()
                     ├── contains()
                     ├── toggle()
                     └── replace()

Основна логіка:

    JavaScript
        ↓
    classList
        ↓
    змінюємо клас
        ↓
    CSS бачить новий клас
        ↓
    UI змінює вигляд

---

# 95. Типовий DOM-патерн

Наприклад:

    const button = document.querySelector(".button");

    button.addEventListener("click", () => {
        button.classList.toggle("active");
    });

Логіка:

    click
      ↓
    toggle("active")
      ↓
    class змінюється
      ↓
    CSS застосовується / перестає застосовуватися
      ↓
    UI змінюється

---

# 96. Головне

Якщо запам'ятати лише кілька правил:

    1. className
       → весь class як рядок

    2. classList
       → список окремих класів

    3. add()
       → додати

    4. remove()
       → видалити

    5. contains()
       → перевірити

    6. toggle()
       → додати / видалити

    7. replace()
       → замінити

    8. classList.add("active")
       → без крапки

    9. querySelector(".active")
       → з крапкою

    10. classList.add()
        не дублює клас

    11. className = "..."
        повністю замінює class

    12. toggle("active", condition)
        синхронізує клас зі станом

    13. CSS-клас не обов'язково означає
        реальну DOM-поведінку

    14. JavaScript → керує станом

    15. CSS → визначає вигляд

---

# 97. Зв'язок із попередніми та наступними темами

Ми вже знаємо:

    01-element-selection
        ↓
    знайти елемент

    02-dom-traversal
        ↓
    переміщатися по DOM

    03-text-html
        ↓
    працювати з текстом та HTML

    04-attributes
        ↓
    працювати з атрибутами

Тепер:

    05-classes
        ↓
    керувати CSS-класами та UI-станами

Далі:

    06-styles
        ↓
    керувати inline styles

    07-create-elements
        ↓
    створювати елементи

    08-insert-elements
        ↓
    вставляти елементи

    09-remove-elements
        ↓
    видаляти елементи

    10-events
        ↓
    реагувати на дії користувача

---

# 98. Загальна DOM-модель

На цьому етапі вже можна бачити DOM-роботу як єдиний процес:

    SELECT
      ↓
    TRAVERSE
      ↓
    READ
      ↓
    MODIFY
      │
      ├── textContent
      ├── innerHTML
      ├── attributes
      └── classList
      ↓
    CREATE
      ↓
    INSERT
      ↓
    REMOVE
      ↓
    EVENTS

А робота з класами займає особливе місце:

    JavaScript state
          ↓
      classList
          ↓
       CSS class
          ↓
       CSS rules
          ↓
        UI

Це один із фундаментальних принципів DOM-розробки:

> **JavaScript керує станом і поведінкою, CSS відповідає за presentation, а `classList` є одним із основних мостів між ними.**