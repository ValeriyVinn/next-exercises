# 04. Attributes у DOM

## 📌 Вступ

HTML-елементи мають **атрибути**, які зберігають додаткову інформацію про елемент.

Наприклад:

    <input
        id="email"
        class="input"
        type="email"
        placeholder="Enter email"
    >

Тут:

    id          → "email"
    class       → "input"
    type        → "email"
    placeholder → "Enter email"

JavaScript дозволяє:

- отримувати значення атрибутів;
- змінювати атрибути;
- додавати атрибути;
- видаляти атрибути;
- перевіряти наявність атрибутів;
- працювати зі спеціальними властивостями елементів;
- працювати з `data-*` атрибутами через `dataset`.

Основні DOM API:

    getAttribute()
    setAttribute()
    hasAttribute()
    removeAttribute()

А також:

    element.id
    element.className
    element.title
    element.src
    element.href
    element.value
    element.checked
    element.disabled

і:

    element.dataset

---

# 1. Що таке HTML-атрибут?

Атрибут — це додаткова характеристика HTML-елемента.

Наприклад:

    <a href="https://example.com" target="_blank">
        Example
    </a>

Тут:

    href
    target

— атрибути.

Ще приклад:

    <input
        type="text"
        name="username"
        placeholder="Enter username"
        required
    >

Атрибути:

    type
    name
    placeholder
    required

---

# 2. Attribute vs Property

Це одна з найважливіших тем.

В HTML ми маємо:

    <input type="text" value="Hello">

`type` і `value` — HTML-атрибути.

У JavaScript DOM-елемент має властивості:

    input.type
    input.value

Тобто:

    HTML
      ↓
    attributes

    DOM object
      ↓
    properties

Вони пов'язані, але **attribute і property — не одне й те саме**.

---

# 3. Отримання атрибута — `getAttribute()`

Метод:

    element.getAttribute(name)

повертає значення атрибута.

HTML:

    <input class="input" type="email">

JavaScript:

    const input = document.querySelector(".input");

    console.log(input.getAttribute("type"));

Результат:

    email

---

# 4. Отримання `id`

HTML:

    <div id="container"></div>

JavaScript:

    const container = document.querySelector("#container");

    console.log(container.getAttribute("id"));

Результат:

    container

Але для `id` можна простіше:

    console.log(container.id);

---

# 5. `getAttribute()` для `class`

HTML:

    <div class="card active"></div>

JavaScript:

    const card = document.querySelector(".card");

    console.log(card.getAttribute("class"));

Результат:

    card active

Але:

    card.className

також поверне:

    card active

Роботу з класами краще виконувати через:

    classList

Це буде окрема тема.

---

# 6. `getAttribute()` для `href`

HTML:

    <a
        class="link"
        href="/about"
    >
        About
    </a>

JavaScript:

    const link = document.querySelector(".link");

    console.log(link.getAttribute("href"));

Результат:

    /about

Це важливо відрізняти від:

    link.href

яке є DOM-властивістю та може повертати абсолютний URL.

---

# 7. `getAttribute()` для `src`

HTML:

    <img
        class="avatar"
        src="/images/avatar.jpg"
        alt="User avatar"
    >

JavaScript:

    const image = document.querySelector(".avatar");

    console.log(image.getAttribute("src"));

Результат:

    /images/avatar.jpg

---

# 8. Якщо атрибута немає

Якщо атрибут не існує:

    element.getAttribute("unknown")

поверне:

    null

Наприклад:

    const button = document.querySelector(".button");

    console.log(button.getAttribute("title"));

Якщо `title` відсутній:

    null

Це потрібно пам'ятати при перевірках.

---

# 9. Перевірка атрибута

Для перевірки існування атрибута використовується:

    hasAttribute()

Синтаксис:

    element.hasAttribute("attributeName")

Наприклад:

    const input = document.querySelector(".input");

    console.log(input.hasAttribute("required"));

Якщо HTML:

    <input class="input" required>

Результат:

    true

---

# 10. `hasAttribute()` — якщо атрибута немає

HTML:

    <input class="input">

JavaScript:

    console.log(input.hasAttribute("required"));

Результат:

    false

Тобто:

    hasAttribute()
        ↓
    true / false

---

# 11. Додавання та зміна — `setAttribute()`

Метод:

    setAttribute(name, value)

дозволяє:

- додати атрибут;
- змінити існуючий атрибут.

Наприклад:

    const input = document.querySelector(".input");

    input.setAttribute("placeholder", "Enter your name");

HTML стане:

    <input
        class="input"
        placeholder="Enter your name"
    >

---

# 12. `setAttribute()` змінює існуючий атрибут

Було:

    <input
        class="input"
        type="text"
    >

Виконуємо:

    input.setAttribute("type", "email");

Стане:

    <input
        class="input"
        type="email"
    >

Тобто:

    setAttribute()

працює і як:

    add

і як:

    update

---

# 13. Встановлення `id`

    element.setAttribute("id", "main");

Результат:

    <div id="main"></div>

Але для простого `id` можна:

    element.id = "main";

---

# 14. Встановлення `title`

HTML:

    <button class="button">
        Save
    </button>

JavaScript:

    const button = document.querySelector(".button");

    button.setAttribute("title", "Save changes");

Тепер при наведенні браузер може показувати tooltip.

HTML:

    <button
        class="button"
        title="Save changes"
    >
        Save
    </button>

---

# 15. Видалення атрибута — `removeAttribute()`

Метод:

    removeAttribute(name)

видаляє атрибут.

Наприклад:

    input.removeAttribute("placeholder");

Було:

    <input
        placeholder="Enter name"
    >

Стане:

    <input>

---

# 16. `removeAttribute()` не викликає помилку

Якщо атрибута немає:

    element.removeAttribute("unknown");

це нормально.

Атрибут просто не буде видалений.

---

# 17. Повний цикл роботи з атрибутом

Маємо:

    <input class="input">

### Додати

    input.setAttribute("placeholder", "Enter name");

### Отримати

    input.getAttribute("placeholder");

### Перевірити

    input.hasAttribute("placeholder");

### Видалити

    input.removeAttribute("placeholder");

Таким чином:

    setAttribute()
        ↓
    getAttribute()
        ↓
    hasAttribute()
        ↓
    removeAttribute()

---

# 18. `id` як DOM-властивість

Для стандартних властивостей часто не потрібно використовувати `getAttribute()`.

HTML:

    <div id="app"></div>

JavaScript:

    const app = document.querySelector("#app");

    console.log(app.id);

Результат:

    app

Змінити:

    app.id = "main";

---

# 19. `className`

HTML:

    <div class="card active"></div>

JavaScript:

    const card = document.querySelector(".card");

    console.log(card.className);

Результат:

    card active

Можна змінити:

    card.className = "card inactive";

Але повністю замінювати `className` потрібно обережно.

Якщо було:

    <div class="card active large"></div>

і виконати:

    card.className = "card";

то:

    active
    large

будуть видалені.

Для окремої роботи з класами існує:

    classList

Це буде наступна тема.

---

# 20. `title`

HTML:

    <button title="Save changes">
        Save
    </button>

JavaScript:

    const button = document.querySelector("button");

    console.log(button.title);

Можна змінити:

    button.title = "Save the document";

---

# 21. `id`, `className`, `title` та `getAttribute()`

Наприклад:

    <div
        id="card"
        class="item active"
        title="Product"
    ></div>

Можна отримати:

    element.id

    element.className

    element.title

або:

    element.getAttribute("id")

    element.getAttribute("class")

    element.getAttribute("title")

Обидва підходи можуть бути правильними, але це не означає, що вони завжди поводяться однаково.

---

# 22. `href` як property

HTML:

    <a
        class="link"
        href="/about"
    >
        About
    </a>

JavaScript:

    const link = document.querySelector(".link");

    console.log(link.href);

Браузер може повернути абсолютний URL, наприклад:

    https://example.com/about

Тоді як:

    link.getAttribute("href");

може повернути:

    /about

Тому:

    attribute → значення атрибута в HTML

    property → значення DOM-властивості

---

# 23. `src` як property

HTML:

    <img
        class="image"
        src="/images/photo.jpg"
    >

JavaScript:

    const image = document.querySelector(".image");

    console.log(image.src);

Як і з `href`, браузер може представити URL як абсолютний.

А:

    image.getAttribute("src");

може повернути саме:

    /images/photo.jpg

---

# 24. `alt`

Для `img`:

    <img
        class="avatar"
        src="/avatar.jpg"
        alt="User avatar"
    >

Можна отримати:

    image.alt

або:

    image.getAttribute("alt")

Змінити:

    image.alt = "Profile photo";

або:

    image.setAttribute("alt", "Profile photo");

---

# 25. Атрибути `input`

HTML:

    <input
        class="email"
        type="email"
        name="email"
        placeholder="Enter email"
    >

Можна отримати:

    input.type

    input.name

    input.placeholder

Або:

    input.getAttribute("type")

    input.getAttribute("name")

    input.getAttribute("placeholder")

---

# 26. `value` — особливо важливий випадок

HTML:

    <input
        class="name"
        value="Valeriy"
    >

JavaScript:

    const input = document.querySelector(".name");

    console.log(input.value);

Тут потрібно розрізняти:

    input.getAttribute("value")

і:

    input.value

`getAttribute("value")` працює з HTML-атрибутом.

`input.value` працює з **поточним значенням DOM-поля**.

---

# 27. Attribute vs Property на `value`

HTML:

    <input
        class="name"
        value="Valeriy"
    >

Початково:

    input.getAttribute("value")
    → "Valeriy"

    input.value
    → "Valeriy"

Користувач змінює поле на:

    "John"

Тепер:

    input.value
    → "John"

А:

    input.getAttribute("value")
    → "Valeriy"

Це дуже важливий приклад різниці між:

    attribute

і:

    property

---

# 28. Початкове значення vs поточне значення

Для form elements часто можна мислити так:

    HTML attribute
        ↓
    початкова конфігурація

    DOM property
        ↓
    поточний стан

Наприклад:

    <input value="Hello">

Після зміни користувачем:

    input.value

може бути:

    "World"

але атрибут:

    value="Hello"

залишається початковим значенням.

---

# 29. `checked`

Для checkbox:

    <input
        class="agreement"
        type="checkbox"
        checked
    >

Поточний стан:

    checkbox.checked

поверне:

    true

Можна змінити:

    checkbox.checked = false;

Це змінює поточний стан checkbox.

---

# 30. `checked` attribute vs property

HTML:

    <input
        type="checkbox"
        checked
    >

Є атрибут:

    checked

і property:

    checkbox.checked

Атрибут описує початковий стан у HTML.

Property показує поточний стан елемента.

Тому для перевірки:

    if (checkbox.checked) {
        ...
    }

використовують property.

---

# 31. Boolean attributes

Деякі HTML-атрибути є boolean attributes.

Наприклад:

    disabled
    checked
    required
    readonly
    multiple
    selected
    autofocus

Їхня наявність уже має значення.

Наприклад:

    <button disabled>
        Save
    </button>

Сам факт наявності:

    disabled

означає, що кнопка disabled.

---

# 32. Boolean attribute не потребує значення

Можна написати:

    <button disabled>
        Save
    </button>

А не обов'язково:

    <button disabled="true">
        Save
    </button>

Для HTML boolean attributes важлива наявність атрибута.

---

# 33. `hasAttribute()` для boolean attribute

HTML:

    <button class="button" disabled>
        Save
    </button>

JavaScript:

    const button = document.querySelector(".button");

    console.log(button.hasAttribute("disabled"));

Результат:

    true

Видаляємо:

    button.removeAttribute("disabled");

Тепер:

    button.hasAttribute("disabled");

Результат:

    false

---

# 34. `disabled` property

Для кнопки:

    button.disabled

повертає:

    true

або:

    false

Можна змінити:

    button.disabled = true;

або:

    button.disabled = false;

Для поточного стану елемента це часто зручніше, ніж працювати з атрибутом напряму.

---

# 35. `required`

HTML:

    <input
        class="email"
        type="email"
        required
    >

Перевірити:

    input.required

або:

    input.hasAttribute("required")

Змінити:

    input.required = false;

або:

    input.removeAttribute("required");

---

# 36. `readonly`

HTML:

    <input
        class="input"
        readonly
    >

Property:

    input.readOnly

Змінити:

    input.readOnly = true;

Зняти:

    input.readOnly = false;

Або через атрибут:

    input.removeAttribute("readonly");

---

# 37. Додавання boolean attribute

Можна:

    button.setAttribute("disabled", "");

Після цього:

    button.disabled

буде:

    true

Але для поточного стану кнопки часто простіше:

    button.disabled = true;

---

# 38. `data-*` атрибути

HTML дозволяє створювати власні атрибути з префіксом:

    data-

Наприклад:

    <button
        class="product"
        data-id="42"
        data-category="books"
    >
        Open
    </button>

Це називається:

    custom data attributes

---

# 39. Отримання `data-*` через `getAttribute()`

HTML:

    <button
        class="product"
        data-id="42"
    >
        Open
    </button>

JavaScript:

    const product = document.querySelector(".product");

    console.log(product.getAttribute("data-id"));

Результат:

    42

---

# 40. `dataset`

Для `data-*` атрибутів існує спеціальна властивість:

    dataset

Наприклад:

    console.log(product.dataset.id);

Результат:

    "42"

Тобто:

    data-id

перетворюється на:

    dataset.id

---

# 41. `data-category`

HTML:

    <div
        class="product"
        data-category="books"
    ></div>

JavaScript:

    const product = document.querySelector(".product");

    console.log(product.dataset.category);

Результат:

    books

---

# 42. `data-user-id`

HTML:

    <div
        class="user"
        data-user-id="123"
    ></div>

JavaScript:

    console.log(user.dataset.userId);

Зверни увагу:

    data-user-id
        ↓
    dataset.userId

Дефіс перетворюється на camelCase.

---

# 43. `data-product-price`

HTML:

    <div
        class="product"
        data-product-price="100"
    ></div>

JavaScript:

    console.log(product.dataset.productPrice);

Результат:

    "100"

Правило:

    data-product-price
        ↓
    dataset.productPrice

---

# 44. Зміна `data-*` через `dataset`

HTML:

    <div
        class="product"
        data-id="42"
    ></div>

JavaScript:

    product.dataset.id = "100";

DOM стане:

    <div
        class="product"
        data-id="100"
    ></div>

---

# 45. Додавання `data-*`

Можна створити новий data attribute:

    product.dataset.status = "active";

DOM:

    <div
        data-status="active"
    ></div>

---

# 46. Видалення `data-*`

Можна:

    delete product.dataset.status;

Атрибут:

    data-status

буде видалений.

Також можна:

    product.removeAttribute("data-status");

---

# 47. `dataset` зберігає рядки

Це дуже важливо.

Якщо HTML:

    <div data-count="10"></div>

то:

    element.dataset.count

поверне:

    "10"

а не:

    10

Тип:

    string

Якщо потрібне число:

    const count = Number(element.dataset.count);

Тепер:

    typeof count

буде:

    "number"

---

# 48. `dataset` і boolean

Наприклад:

    <button data-active="true"></button>

Отримаємо:

    button.dataset.active

Результат:

    "true"

Це рядок, а не boolean.

Тому:

    button.dataset.active === true

буде:

    false

Потрібно перевіряти, наприклад:

    button.dataset.active === "true"

---

# 49. `dataset` як спосіб зберігати метадані

Наприклад:

    <article
        class="product"
        data-id="42"
        data-category="books"
        data-price="100"
    >
        JavaScript Book
    </article>

JavaScript:

    const product = document.querySelector(".product");

    const id = Number(product.dataset.id);
    const category = product.dataset.category;
    const price = Number(product.dataset.price);

Тепер маємо дані:

    id       → 42
    category → "books"
    price    → 100

---

# 50. Практичний приклад — product card

HTML:

    <article
        class="product"
        data-id="42"
        data-category="books"
    >
        <h2>JavaScript</h2>
    </article>

JavaScript:

    const product = document.querySelector(".product");

    const id = product.dataset.id;
    const category = product.dataset.category;

    console.log(id);
    console.log(category);

Результат:

    42
    books

---

# 51. Практичний приклад — кнопка з `data-id`

HTML:

    <button
        class="delete-button"
        data-id="42"
    >
        Delete
    </button>

JavaScript:

    const button = document.querySelector(".delete-button");

    const id = button.dataset.id;

    console.log(id);

Результат:

    42

Це дуже поширений патерн у vanilla JavaScript.

---

# 52. Практичний приклад — змінити `src`

HTML:

    <img
        class="avatar"
        src="/images/old.jpg"
        alt="Avatar"
    >

JavaScript:

    const avatar = document.querySelector(".avatar");

    avatar.src = "/images/new.jpg";

Або:

    avatar.setAttribute("src", "/images/new.jpg");

Для стандартної DOM-властивості:

    avatar.src = ...

часто простіше.

---

# 53. Практичний приклад — змінити `href`

HTML:

    <a
        class="link"
        href="/old-page"
    >
        Open
    </a>

JavaScript:

    const link = document.querySelector(".link");

    link.href = "/new-page";

Або:

    link.setAttribute("href", "/new-page");

---

# 54. Практичний приклад — додати `target`

    link.setAttribute("target", "_blank");

HTML:

    <a
        href="/about"
        target="_blank"
    >
        About
    </a>

---

# 55. Практичний приклад — змінити `alt`

    image.setAttribute(
        "alt",
        "New description"
    );

Або:

    image.alt = "New description";

---

# 56. Практичний приклад — додати `required`

HTML:

    <input class="email" type="email">

JavaScript:

    const email = document.querySelector(".email");

    email.setAttribute("required", "");

Тепер:

    email.required

поверне:

    true

---

# 57. Практичний приклад — видалити `disabled`

HTML:

    <button
        class="save-button"
        disabled
    >
        Save
    </button>

JavaScript:

    const button = document.querySelector(".save-button");

    button.removeAttribute("disabled");

Або:

    button.disabled = false;

---

# 58. `getAttribute()` vs property

Порівняй:

    element.getAttribute("id")

і:

    element.id

Для багатьох простих атрибутів результат буде схожим.

Але property може мати:

- інший тип;
- нормалізоване значення;
- поточний стан;
- поведінку DOM API.

Тому не потрібно механічно замінювати одне іншим.

---

# 59. Коли використовувати `getAttribute()`

Використовуй `getAttribute()`, коли тобі потрібно:

- отримати саме значення HTML-атрибута;
- працювати з довільним атрибутом;
- працювати з `data-*`;
- перевірити атрибут через `null`;
- отримати значення, яке може не мати прямої DOM-властивості.

Наприклад:

    const value = element.getAttribute("data-id");

---

# 60. Коли використовувати property

Для стандартних DOM-властивостей часто зручніше:

    element.id

    element.value

    element.checked

    element.disabled

    element.href

    element.src

    element.alt

    element.title

Наприклад:

    input.value = "Hello";

---

# 61. `getAttribute()` vs `dataset`

Для:

    data-user-id="42"

можна:

    element.getAttribute("data-user-id");

або:

    element.dataset.userId;

Обидва варіанти працюють.

Для `data-*` у звичайному JavaScript зазвичай зручно використовувати:

    dataset

---

# 62. `setAttribute()` vs property

Наприклад:

    input.setAttribute("value", "Hello");

і:

    input.value = "Hello";

На перший погляд вони схожі.

Але для form elements вони можуть працювати з різними аспектами стану.

Тому:

    attribute → HTML attribute

    property → поточний DOM state / property

Особливо це важливо для:

    value
    checked
    selected
    disabled

---

# 63. `value` — хороший приклад

HTML:

    <input value="Initial">

Після:

    input.value = "Current";

поточне значення:

    input.value

буде:

    Current

А HTML-атрибут:

    input.getAttribute("value")

може залишитися:

    Initial

Тому для читання того, що **зараз введено користувачем**, використовують:

    input.value

---

# 64. `checked` — хороший приклад

HTML:

    <input
        type="checkbox"
        checked
    >

Поточний стан:

    checkbox.checked

Користувач зняв галочку:

    checkbox.checked
    → false

При цьому початковий HTML-атрибут:

    checked

може все ще бути присутнім.

Тому для UI-стану:

    checkbox.checked

важливіше, ніж:

    checkbox.hasAttribute("checked")

---

# 65. Робота з довільним атрибутом

Припустимо:

    <div data-role="admin"></div>

JavaScript:

    const element = document.querySelector("div");

    const role = element.getAttribute("data-role");

    console.log(role);

Можна змінити:

    element.setAttribute("data-role", "user");

Видалити:

    element.removeAttribute("data-role");

---

# 66. Перевірка атрибута перед роботою

Іноді:

    const value = element.getAttribute("title");

може повернути:

    null

Тому:

    const title = element.getAttribute("title");

    if (title !== null) {
        console.log(title);
    }

Але якщо потрібно просто перевірити існування:

    if (element.hasAttribute("title")) {
        ...
    }

---

# 67. Не потрібно перевіряти `getAttribute()` через `if` бездумно

Наприклад:

    if (element.getAttribute("data-count")) {
        ...
    }

Це може бути проблемою, якщо значення може бути:

    ""

або:

    "0"

Краще розділяти два питання:

> Атрибут існує?

    element.hasAttribute("data-count")

> Яке його значення?

    element.getAttribute("data-count")

---

# 68. Атрибут зі значенням `""`

Наприклад:

    <input title="">

Тоді:

    input.hasAttribute("title")
    → true

а:

    input.getAttribute("title")
    → ""

Тобто:

    атрибут існує

але:

    значення порожнє

Це ще одна причина не плутати `hasAttribute()` і перевірку значення.

---

# 69. Відмінність `null` і `""`

Якщо атрибут відсутній:

    element.getAttribute("title")
    → null

Якщо атрибут є, але порожній:

    <div title=""></div>

отримаємо:

    element.getAttribute("title")
    → ""

Тобто:

    null → атрибута немає

    ""   → атрибут є, але значення порожнє

---

# 70. Практична схема роботи з атрибутами

Типовий алгоритм:

    1. Знайти елемент

    const element = document.querySelector(".element");

    2. Отримати атрибут

    const value = element.getAttribute("data-id");

    3. Перевірити

    element.hasAttribute("data-id");

    4. Змінити / додати

    element.setAttribute("data-id", "42");

    5. Видалити

    element.removeAttribute("data-id");

---

# 71. Практична вправа №1 — отримати `href`

HTML:

    <a
        class="link"
        href="/about"
    >
        About
    </a>

Завдання:

Отримати значення `href`.

Рішення:

    const link = document.querySelector(".link");

    const href = link.getAttribute("href");

    console.log(href);

---

# 72. Практична вправа №2 — змінити `href`

    link.setAttribute("href", "/contact");

Або:

    link.href = "/contact";

---

# 73. Практична вправа №3 — додати `title`

HTML:

    <button class="button">
        Save
    </button>

Завдання:

Додати:

    title="Save changes"

Рішення:

    const button = document.querySelector(".button");

    button.setAttribute("title", "Save changes");

---

# 74. Практична вправа №4 — перевірити `disabled`

HTML:

    <button
        class="button"
        disabled
    >
        Save
    </button>

Рішення:

    const button = document.querySelector(".button");

    console.log(button.hasAttribute("disabled"));

---

# 75. Практична вправа №5 — активувати кнопку

    button.disabled = false;

Або:

    button.removeAttribute("disabled");

---

# 76. Практична вправа №6 — `data-id`

HTML:

    <button
        class="delete"
        data-id="42"
    >
        Delete
    </button>

Отримати ID:

    const button = document.querySelector(".delete");

    const id = button.dataset.id;

    console.log(id);

---

# 77. Практична вправа №7 — змінити `data-status`

HTML:

    <div
        class="user"
        data-status="inactive"
    ></div>

JavaScript:

    const user = document.querySelector(".user");

    user.dataset.status = "active";

DOM:

    <div
        class="user"
        data-status="active"
    ></div>

---

# 78. Практична вправа №8 — отримати число з `data-*`

HTML:

    <div
        class="product"
        data-price="150"
    ></div>

JavaScript:

    const product = document.querySelector(".product");

    const price = Number(product.dataset.price);

    console.log(price);

Результат:

    150

---

# 79. Практична вправа №9 — змінити картинку

HTML:

    <img
        class="image"
        src="/old.jpg"
        alt="Old image"
    >

JavaScript:

    const image = document.querySelector(".image");

    image.src = "/new.jpg";

    image.alt = "New image";

---

# 80. Практична вправа №10 — керування checkbox

HTML:

    <label>
        <input
            class="agreement"
            type="checkbox"
        >
        I agree
    </label>

JavaScript:

    const checkbox = document.querySelector(".agreement");

    checkbox.checked = true;

Перевірка:

    if (checkbox.checked) {
        console.log("Accepted");
    }

---

# 81. Практична вправа №11 — форма

HTML:

    <input
        class="username"
        type="text"
        name="username"
        placeholder="Enter username"
    >

JavaScript:

    const input = document.querySelector(".username");

    console.log(input.name);
    console.log(input.type);
    console.log(input.placeholder);

---

# 82. Практична вправа №12 — додати `required`

    input.required = true;

Або:

    input.setAttribute("required", "");

Перевірка:

    console.log(input.required);

---

# 83. Практична вправа №13 — видалити `required`

    input.required = false;

Або:

    input.removeAttribute("required");

---

# 84. Практична вправа №14 — перевірити власний атрибут

HTML:

    <div
        class="card"
        data-type="article"
    ></div>

JavaScript:

    const card = document.querySelector(".card");

    if (card.hasAttribute("data-type")) {
        console.log("data-type exists");
    }

---

# 85. Практична вправа №15 — змінити кілька атрибутів

    const image = document.querySelector(".image");

    image.setAttribute("src", "/images/new.jpg");
    image.setAttribute("alt", "New photo");
    image.setAttribute("title", "New photo");

---

# 86. Практичний приклад — продукт

HTML:

    <article
        class="product"
        data-id="101"
        data-category="books"
        data-price="250"
    >
        <h2>JavaScript Book</h2>
    </article>

JavaScript:

    const product = document.querySelector(".product");

    const id = Number(product.dataset.id);
    const category = product.dataset.category;
    const price = Number(product.dataset.price);

    console.log(id);
    console.log(category);
    console.log(price);

Результат:

    101
    books
    250

---

# 87. Практичний приклад — змінити статус

    product.dataset.status = "available";

Тепер:

    product.dataset.status

поверне:

    "available"

HTML матиме:

    data-status="available"

---

# 88. Практичний приклад — кнопка дії

HTML:

    <button
        class="action"
        data-action="delete"
        data-id="42"
    >
        Delete
    </button>

JavaScript:

    const button = document.querySelector(".action");

    const action = button.dataset.action;
    const id = Number(button.dataset.id);

    console.log(action);
    console.log(id);

Результат:

    delete
    42

Це дуже корисний патерн для майбутніх тем:

    data-*
      ↓
    event
      ↓
    визначити action
      ↓
    визначити id
      ↓
    виконати операцію

---

# 89. Типові помилки

## ❌ Помилка 1 — плутати attribute і property

Не завжди:

    element.getAttribute("value")

еквівалентно:

    element.value

Особливо це важливо для form elements.

---

## ❌ Помилка 2 — використовувати `getAttribute()` для всього

Наприклад:

    checkbox.getAttribute("checked")

не є хорошим способом перевірити поточний стан checkbox.

Для поточного стану:

    checkbox.checked

---

## ❌ Помилка 3 — плутати `hasAttribute()` і значення

    element.hasAttribute("title")

повертає:

    true / false

А:

    element.getAttribute("title")

повертає:

    значення
    або
    null

---

## ❌ Помилка 4 — забути, що `dataset` повертає рядки

    element.dataset.count

якщо:

    data-count="10"

поверне:

    "10"

а не:

    10

Для числа:

    Number(element.dataset.count)

---

## ❌ Помилка 5 — очікувати boolean від `data-*`

    data-active="true"

не означає:

    true

Через `dataset` отримаємо:

    "true"

---

## ❌ Помилка 6 — неправильно записати camelCase

    data-user-id

це:

    dataset.userId

а не:

    dataset.user-id

---

## ❌ Помилка 7 — забути про `null`

    const value = element.getAttribute("title");

Якщо атрибуту немає:

    value === null

---

## ❌ Помилка 8 — вручну змінювати `class` через `setAttribute()`

Наприклад:

    element.setAttribute("class", "active");

Це може видалити інші класи.

Для класів краще використовувати:

    element.classList

---

# 90. `setAttribute("class", ...)` — обережно

Було:

    <div class="card active large"></div>

Виконуємо:

    element.setAttribute("class", "card");

Стане:

    <div class="card"></div>

Класи:

    active
    large

видалені.

Тому для окремого додавання/видалення класів використовуй:

    classList.add()
    classList.remove()
    classList.toggle()

Це буде наступна тема.

---

# 91. `setAttribute()` і типи

Значення атрибутів у HTML представлені як рядки.

Наприклад:

    element.setAttribute("data-count", 10);

У DOM це буде:

    data-count="10"

При читанні:

    element.getAttribute("data-count")

отримаємо:

    "10"

Тому:

    typeof element.getAttribute("data-count")

буде:

    "string"

---

# 92. Власні атрибути без `data-*`

Не варто створювати довільні custom attributes для зберігання JavaScript-даних.

Наприклад, замість:

    <div userId="42"></div>

краще:

    <div data-user-id="42"></div>

Для custom data:

    data-*

є стандартним підходом.

---

# 93. Атрибути та accessibility

Атрибути можуть мати важливе значення для доступності.

Наприклад:

    alt

для зображення:

    <img
        src="/avatar.jpg"
        alt="User avatar"
    >

Або:

    aria-label

для доступної назви елемента:

    <button
        aria-label="Close"
    >
        ×
    </button>

JavaScript може працювати з ними:

    button.setAttribute("aria-label", "Close dialog");

---

# 94. `aria-*` атрибути

ARIA-атрибути використовуються для accessibility.

Наприклад:

    aria-label
    aria-hidden
    aria-expanded
    aria-current

Їх можна читати:

    element.getAttribute("aria-label");

і змінювати:

    element.setAttribute("aria-expanded", "true");

Для `aria-*` не використовують `dataset`, тому що це не `data-*` атрибути.

---

# 95. Практичний приклад `aria-expanded`

HTML:

    <button
        class="menu-button"
        aria-expanded="false"
    >
        Menu
    </button>

JavaScript:

    const button = document.querySelector(".menu-button");

    button.setAttribute("aria-expanded", "true");

Це вже реальна практика при створенні accessible UI.

---

# 96. Основна модель Attribute API

Запам'ятай чотири методи:

    getAttribute()
        ↓
    отримати

    setAttribute()
        ↓
    додати / змінити

    hasAttribute()
        ↓
    перевірити

    removeAttribute()
        ↓
    видалити

---

# 97. Основні properties

Для стандартних елементів часто використовуються:

    element.id

    element.className

    element.title

    element.value

    element.checked

    element.disabled

    element.required

    element.href

    element.src

    element.alt

---

# 98. `dataset`

Для:

    data-user-id

використовуємо:

    element.dataset.userId

Для:

    data-product-name

використовуємо:

    element.dataset.productName

Для:

    data-status

використовуємо:

    element.dataset.status

---

# 99. Attribute чи Property?

Постав собі питання:

> Мені потрібен HTML-атрибут чи поточний стан DOM-елемента?

Якщо потрібен саме HTML attribute:

    getAttribute()
    setAttribute()
    hasAttribute()
    removeAttribute()

Якщо потрібен стандартний DOM state:

    element.value
    element.checked
    element.disabled
    element.selected
    element.href
    element.src

---

# 100. Core — що потрібно знати обов'язково

На базовому рівні потрібно впевнено знати:

- що таке HTML attributes;
- `getAttribute()`;
- `setAttribute()`;
- `hasAttribute()`;
- `removeAttribute()`;
- `id`;
- `className`;
- `title`;
- `href`;
- `src`;
- `alt`;
- `value`;
- `checked`;
- `disabled`;
- `required`;
- `data-*`;
- `dataset`;
- різницю attribute/property.

Мінімум:

    const element = document.querySelector(".element");

    element.getAttribute("title");

    element.setAttribute("title", "Hello");

    element.hasAttribute("title");

    element.removeAttribute("title");

---

# 101. Junior — що потрібно вміти

На Junior-рівні:

- працювати з атрибутами без підказок;
- змінювати `href`, `src`, `alt`;
- працювати з form properties;
- розуміти `value` vs `getAttribute("value")`;
- розуміти `checked` vs `getAttribute("checked")`;
- працювати з `disabled` і `required`;
- використовувати `dataset`;
- працювати з `data-id`;
- перетворювати `dataset`-значення в число;
- розуміти boolean attributes;
- не плутати `hasAttribute()` з `getAttribute()`.

---

# 102. Middle — що варто розуміти

На Middle-рівні:

- глибше розуміти attribute/property reflection;
- розуміти initial value vs current value;
- працювати з form control state;
- розуміти поведінку boolean attributes;
- працювати з `aria-*`;
- розуміти XSS при динамічній генерації HTML;
- правильно вибирати між DOM property та Attribute API;
- розуміти, як HTML parser і DOM підтримують атрибути;
- враховувати accessibility при зміні атрибутів.

---

# 103. Senior — що варто знати

На Senior-рівні:

- DOM attributes та IDL properties;
- reflection між attributes і properties;
- custom elements;
- Web Components;
- `observedAttributes`;
- `attributeChangedCallback()`;
- Shadow DOM;
- `ElementInternals`;
- accessibility API;
- ARIA states and properties;
- Trusted Types;
- XSS;
- SSR/hydration та вплив HTML attributes;
- DOM serialization.

Для звичайної vanilla JavaScript-практики більшість цих тем можна залишити на пізніше.

---

# 104. Питання для співбесіди

### 1. Що таке HTML attribute?

Додаткова характеристика HTML-елемента, задана в markup.

---

### 2. Як отримати атрибут?

    element.getAttribute("name");

---

### 3. Як змінити або додати атрибут?

    element.setAttribute("name", "value");

---

### 4. Як перевірити наявність атрибута?

    element.hasAttribute("name");

---

### 5. Як видалити атрибут?

    element.removeAttribute("name");

---

### 6. Що повертає `getAttribute()`, якщо атрибута немає?

    null

---

### 7. Чим attribute відрізняється від property?

Attribute належить HTML markup, а property — властивість DOM-об'єкта. Вони пов'язані, але можуть представляти різні значення або різні аспекти стану елемента.

---

### 8. Чим відрізняються?

    input.getAttribute("value")

і:

    input.value

`getAttribute("value")` працює з HTML-атрибутом, а `input.value` — з поточним значенням поля.

---

### 9. Чим відрізняються?

    checkbox.getAttribute("checked")

і:

    checkbox.checked

`checked` property показує поточний стан checkbox.

---

### 10. Що таке `data-*`?

Стандартний механізм HTML для зберігання власних data attributes.

---

### 11. Як отримати `data-id`?

Можна:

    element.getAttribute("data-id");

або:

    element.dataset.id;

---

### 12. Як отримати `data-user-id` через `dataset`?

    element.dataset.userId

---

### 13. Який тип має `dataset.id`?

    string

---

### 14. Як перетворити `dataset.id` на число?

    const id = Number(element.dataset.id);

---

### 15. Що таке boolean attributes?

Атрибути, де сама наявність атрибута означає true.

Наприклад:

    disabled
    checked
    required
    readonly

---

### 16. Як перевірити, чи кнопка disabled?

Для поточного стану:

    button.disabled

або:

    button.hasAttribute("disabled")

Але це відповідає різним аспектам DOM: property показує стан, а `hasAttribute()` — наявність атрибута.

---

### 17. Чому `getAttribute()` може повернути `null`?

Тому що атрибут може бути відсутній.

---

### 18. Чому `data-count="10"` через `dataset` повертає `"10"`, а не `10`?

Тому що значення `data-*` атрибутів представлені як рядки.

---

# 105. Міні-шпаргалка

## Отримати атрибут

    element.getAttribute("href");

## Встановити атрибут

    element.setAttribute("href", "/about");

## Перевірити атрибут

    element.hasAttribute("href");

## Видалити атрибут

    element.removeAttribute("href");

## ID

    element.id

## Class

    element.className

## Title

    element.title

## Input value

    input.value

## Checkbox state

    checkbox.checked

## Button state

    button.disabled

## Required state

    input.required

## Data attribute

    element.dataset.id

## `data-user-id`

    element.dataset.userId

## Число з `dataset`

    Number(element.dataset.id)

---

# 106. Швидка таблиця

| Завдання | Інструмент |
|---|---|
| Отримати attribute | `getAttribute()` |
| Додати attribute | `setAttribute()` |
| Змінити attribute | `setAttribute()` |
| Перевірити attribute | `hasAttribute()` |
| Видалити attribute | `removeAttribute()` |
| Отримати `id` | `element.id` |
| Отримати class | `element.className` |
| Поточне `input` value | `input.value` |
| Поточний checkbox state | `checkbox.checked` |
| Поточний disabled state | `element.disabled` |
| Поточний required state | `input.required` |
| `data-id` | `element.dataset.id` |
| `data-user-id` | `element.dataset.userId` |
| `data-count` як число | `Number(element.dataset.count)` |

---

# 107. Головне порівняння

Для:

    <input
        class="username"
        value="Valeriy"
        data-user-id="42"
        required
    >

Маємо:

    input.getAttribute("value")
    ↓
    "Valeriy"

    input.value
    ↓
    поточне значення поля

    input.getAttribute("data-user-id")
    ↓
    "42"

    input.dataset.userId
    ↓
    "42"

    input.hasAttribute("required")
    ↓
    true

    input.required
    ↓
    true

---

# 108. Фінальна модель

Варто бачити роботу з атрибутами так:

    HTML ELEMENT
         │
         ├── Attributes
         │      │
         │      ├── getAttribute()
         │      ├── setAttribute()
         │      ├── hasAttribute()
         │      └── removeAttribute()
         │
         ├── DOM Properties
         │      │
         │      ├── id
         │      ├── value
         │      ├── checked
         │      ├── disabled
         │      ├── href
         │      └── src
         │
         └── data-*
                │
                └── dataset

Основна логіка:

    знайти елемент
        ↓
    визначити:
        attribute чи property?
        ↓
    attribute:
        getAttribute()
        setAttribute()
        hasAttribute()
        removeAttribute()
        ↓
    data-*:
        dataset
        ↓
    form state:
        value
        checked
        disabled
        required

---

# 109. Головне

Якщо запам'ятати лише кілька правил:

    1. getAttribute()
       → отримати HTML-атрибут

    2. setAttribute()
       → додати або змінити атрибут

    3. hasAttribute()
       → перевірити наявність атрибута

    4. removeAttribute()
       → видалити атрибут

    5. element.id
       → DOM property

    6. input.value
       → поточне значення input

    7. checkbox.checked
       → поточний стан checkbox

    8. button.disabled
       → поточний стан disabled

    9. data-user-id
       → dataset.userId

    10. dataset завжди працює зі string

    11. data-count="10"
        → dataset.count === "10"

    12. Number(dataset.count)
        → 10

    13. null
        → атрибута немає

    14. ""
        → атрибут є, але значення порожнє

    15. Attribute ≠ Property

---

# 110. Зв'язок із попередніми та наступними темами

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

Тепер:

    04-attributes
        ↓
    працювати з характеристиками елемента

Далі:

    05-classes
        ↓
    керувати CSS-класами

    06-styles
        ↓
    керувати inline styles

    07-create-elements
        ↓
    створювати DOM-елементи

    08-insert-elements
        ↓
    вставляти DOM-елементи

    09-remove-elements
        ↓
    видаляти DOM-елементи

    10-events
        ↓
    реагувати на дії користувача

У результаті формується базовий DOM-цикл:

    SELECT
      ↓
    TRAVERSE
      ↓
    READ
      ↓
    MODIFY
      ↓
    CREATE
      ↓
    INSERT
      ↓
    REMOVE
      ↓
    RESPOND TO EVENTS

Це фундамент для подальшої роботи з DOM у vanilla JavaScript і для розуміння того, що відбувається всередині React та інших UI-бібліотек.