# 03. FormData

## 📌 Що таке FormData

`FormData` — це вбудований Web API для роботи з даними HTML-форми.

Він дозволяє:

- зібрати значення полів `<form>`;
- отримати дані окремих полів;
- додати нові дані;
- змінити існуючі значення;
- видалити значення;
- перебрати всі поля;
- передати дані на сервер через `fetch()`;
- працювати з файлами через `<input type="file">`.

`FormData` особливо важливий у full-stack JavaScript, тому що він є зручним містком:

    HTML form
        ↓
    FormData
        ↓
    fetch()
        ↓
    Node.js / Express / NestJS
        ↓
    PostgreSQL

---

# 1. Створення FormData

Найчастіше `FormData` створюють на основі `<form>`.

### HTML

    <form id="userForm">
        <input type="text" name="username">
        <input type="email" name="email">

        <button type="submit">Send</button>
    </form>

### JavaScript

    const form = document.querySelector("#userForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        console.log(formData);
    });

`new FormData(form)` автоматично збирає дані форми.

---

# 2. Важливість атрибута `name`

Для `FormData` дуже важливий атрибут `name`.

### Правильно

    <input type="text" name="username">

### Без `name`

    <input type="text" id="username">

Якщо поле не має `name`, воно не буде нормальним полем під час формування даних форми.

Тому:

    id
    ↓
    потрібен JavaScript / CSS / label

    name
    ↓
    потрібен для передачі даних форми

Наприклад:

    <input
        id="username"
        name="username"
        type="text"
    >

Тут:

    id="username"
    → ідентифікує елемент у DOM

    name="username"
    → визначає ім'я даних, які передаються

---

# 3. Як виглядають дані FormData

Уявімо:

    <form id="userForm">
        <input type="text" name="username" value="Valeriy">
        <input type="email" name="email" value="user@example.com">

        <button type="submit">Send</button>
    </form>

Після:

    const formData = new FormData(form);

Отримаємо логічно:

    username → Valeriy
    email → user@example.com

`FormData` — не звичайний об'єкт JavaScript.

Тому:

    console.log(formData);

не покаже дані так само зручно, як:

    console.log({
        username: "Valeriy",
        email: "user@example.com"
    });

Для перегляду використовують методи `FormData`.

---

# 4. `get()` — отримати значення

Метод:

    formData.get(name)

повертає значення поля.

### Приклад

    const formData = new FormData(form);

    const username = formData.get("username");

    console.log(username);

Результат:

    Valeriy

Ще один приклад:

    const email = formData.get("email");

    console.log(email);

Результат:

    user@example.com

---

# 5. `getAll()` — отримати всі значення

`get()` повертає одне значення.

`getAll()` повертає всі значення з однаковим `name`.

Це особливо корисно для:

- checkbox;
- полів із повторюваним `name`;
- множинних значень.

### HTML

    <input type="checkbox" name="skill" value="html">
    <input type="checkbox" name="skill" value="css">
    <input type="checkbox" name="skill" value="javascript">

Якщо вибрані:

    html
    javascript

то:

    const skills = formData.getAll("skill");

    console.log(skills);

Результат:

    ["html", "javascript"]

---

# 6. `has()` — перевірити наявність

Метод:

    formData.has(name)

перевіряє, чи існує поле з таким `name`.

### Приклад

    if (formData.has("username")) {
        console.log("Username exists");
    }

Результат:

    Username exists

Або:

    if (!formData.has("email")) {
        console.log("Email is missing");
    }

---

# 7. `set()` — встановити значення

Метод:

    formData.set(name, value)

встановлює значення.

### Приклад

    formData.set("username", "Alex");

Тепер:

    formData.get("username");

дасть:

    Alex

Якщо поле вже існує, `set()` замінює його значення.

---

# 8. `append()` — додати значення

Метод:

    formData.append(name, value)

додає нове значення.

### Приклад

    formData.append("skill", "javascript");

Можна додати декілька значень з однаковим `name`:

    formData.append("skill", "html");
    formData.append("skill", "css");
    formData.append("skill", "javascript");

Тоді:

    formData.getAll("skill");

Результат:

    ["html", "css", "javascript"]

---

# 9. `set()` vs `append()`

Це одна з важливих відмінностей.

### `set()`

Замінює існуюче значення.

    formData.set("username", "Alex");

### `append()`

Додає ще одне значення.

    formData.append("skill", "javascript");

Наприклад:

    formData.append("skill", "html");
    formData.append("skill", "css");

Отримаємо:

    skill → html
    skill → css

А якщо:

    formData.set("skill", "javascript");

то попередні значення будуть замінені.

---

# 10. `delete()` — видалити поле

Метод:

    formData.delete(name)

видаляє поле.

### Приклад

    formData.delete("email");

Після цього:

    formData.has("email");

дасть:

    false

---

# 11. Перебір FormData

`FormData` можна перебирати.

Найчастіше використовують:

    for...of

### Приклад

    for (const [name, value] of formData) {
        console.log(name, value);
    }

Результат:

    username Valeriy
    email user@example.com

Це дуже зручний спосіб побачити всі дані форми.

---

# 12. `entries()`

Метод:

    formData.entries()

повертає пари:

    [name, value]

### Приклад

    for (const entry of formData.entries()) {
        console.log(entry);
    }

Результат:

    ["username", "Valeriy"]
    ["email", "user@example.com"]

Те саме можна записати:

    for (const [name, value] of formData.entries()) {
        console.log(name, value);
    }

---

# 13. `keys()`

Метод:

    formData.keys()

повертає імена полів.

### Приклад

    for (const key of formData.keys()) {
        console.log(key);
    }

Результат:

    username
    email

---

# 14. `values()`

Метод:

    formData.values()

повертає значення.

### Приклад

    for (const value of formData.values()) {
        console.log(value);
    }

Результат:

    Valeriy
    user@example.com

---

# 15. Повний приклад роботи з FormData

### HTML

    <form id="userForm">
        <input
            type="text"
            name="username"
            placeholder="Username"
        >

        <input
            type="email"
            name="email"
            placeholder="Email"
        >

        <button type="submit">Send</button>
    </form>

### JavaScript

    const form = document.querySelector("#userForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        console.log("Username:", formData.get("username"));
        console.log("Email:", formData.get("email"));
    });

Якщо користувач ввів:

    Username: Valeriy
    Email: user@example.com

отримаємо:

    Username: Valeriy
    Email: user@example.com

---

# 16. FormData + submit event

Найпоширеніший шаблон:

    const form = document.querySelector("#userForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        // робота з даними
    });

Послідовність:

    1. Користувач заповнює форму
            ↓
    2. Натискає Submit
            ↓
    3. Спрацьовує submit
            ↓
    4. preventDefault()
            ↓
    5. Створюємо FormData
            ↓
    6. Обробляємо дані
            ↓
    7. За потреби відправляємо на сервер

---

# 17. FormData і `event.currentTarget`

У submit-обробнику можна використовувати саму форму.

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
    });

Тут:

    event.currentTarget

— форма, на якій зареєстрований обробник.

Це зручно, якщо обробник використовується для різних форм.

---

# 18. FormData і `event.target`

Також можна написати:

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
    });

Для звичайного `submit` події форми:

    event.target
    event.currentTarget

зазвичай посилаються на ту саму форму.

Але концептуально:

    target
    → елемент, на якому виникла подія

    currentTarget
    → елемент, на якому зараз працює обробник

---

# 19. FormData не змінює HTML-форму

Створення:

    const formData = new FormData(form);

не означає, що ми змінили значення самих `<input>`.

Наприклад:

    const formData = new FormData(form);

    formData.set("username", "Alex");

Це змінює дані всередині `formData`.

А значення `<input>` на сторінці автоматично не змінюється.

Тобто існують два різних джерела:

    input.value
          ↓
       HTML form

    FormData
          ↓
    окрема структура даних

---

# 20. FormData можна створити без `<form>`

`FormData` можна створити порожнім:

    const formData = new FormData();

Після цього додавати дані вручну:

    formData.append("username", "Valeriy");
    formData.append("email", "user@example.com");

Отримаємо:

    username → Valeriy
    email → user@example.com

Це корисно, коли дані не походять безпосередньо з HTML-форми.

---

# 21. FormData як контейнер даних

Можна уявляти `FormData` як спеціальний контейнер:

    FormData
    ├── username → Valeriy
    ├── email → user@example.com
    └── age → 56

Він призначений саме для передачі form-like даних.

Тому його часто використовують разом із:

    fetch()

---

# 22. FormData + fetch()

Це один із найважливіших практичних сценаріїв.

### Frontend

    const form = document.querySelector("#userForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const response = await fetch("/api/users", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        console.log(result);
    });

Логіка:

    HTML form
        ↓
    FormData
        ↓
    fetch()
        ↓
    POST request
        ↓
    backend

---

# 23. Важливо: не встановлювати Content-Type вручну

При передачі `FormData` через `fetch()` зазвичай не потрібно писати:

    headers: {
        "Content-Type": "multipart/form-data"
    }

Браузер сам сформує правильний `Content-Type` разом із boundary.

Правильно:

    const formData = new FormData(form);

    fetch("/api/users", {
        method: "POST",
        body: formData
    });

Не потрібно вручну додавати:

    headers: {
        "Content-Type": "multipart/form-data"
    }

Це особливо важливо при роботі з файлами.

---

# 24. FormData + URLSearchParams

Для простих текстових даних `FormData` можна перетворити на `URLSearchParams`.

### Приклад

    const formData = new FormData(form);

    const params = new URLSearchParams(formData);

Після цього можна отримати URL-параметри.

Наприклад:

    username=Valeriy&email=user%40example.com

Це корисно, коли потрібен формат:

    application/x-www-form-urlencoded

---

# 25. FormData vs звичайний об'єкт

Можна зібрати дані так:

    const data = {
        username: "Valeriy",
        email: "user@example.com"
    };

А можна:

    const formData = new FormData(form);

Це не одне й те саме.

### Звичайний об'єкт

Зручний для:

- JSON;
- JavaScript-логіки;
- API, які очікують JSON.

Наприклад:

    fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

### FormData

Зручний для:

- HTML-форм;
- `multipart/form-data`;
- файлів;
- передачі form-like даних.

Наприклад:

    fetch("/api/users", {
        method: "POST",
        body: formData
    });

---

# 26. FormData і типи даних

Значення текстових полів форми зазвичай приходять як рядки.

Наприклад:

    <input type="number" name="age" value="56">

Після:

    const age = formData.get("age");

значення концептуально:

    "56"

а не:

    56

Якщо потрібне число:

    const age = Number(formData.get("age"));

Результат:

    56

Тому потрібно пам'ятати:

    HTML input
        ↓
    FormData
        ↓
    значення часто представлене як string

---

# 27. FormData і checkbox

Checkbox має особливу поведінку.

### HTML

    <input
        type="checkbox"
        name="terms"
        value="accepted"
    >

Якщо checkbox вибраний, він потрапляє у `FormData`.

Якщо не вибраний — відповідного поля може не бути.

Тому:

    formData.has("terms")

може повернути:

    true

або:

    false

Для checkbox із кількома значеннями часто використовують:

    formData.getAll("skill");

Цю тему детальніше розглянемо в розділі:

    05-checkbox-radio-select

---

# 28. FormData і radio

Для radio-групи використовується однакова назва `name`.

### HTML

    <input
        type="radio"
        name="role"
        value="student"
    >

    <input
        type="radio"
        name="role"
        value="teacher"
    >

Якщо вибрано:

    teacher

то:

    formData.get("role");

дасть:

    teacher

---

# 29. FormData і select

### HTML

    <select name="country">
        <option value="ua">Ukraine</option>
        <option value="pl">Poland</option>
        <option value="de">Germany</option>
    </select>

Якщо вибрано:

    Ukraine

то:

    formData.get("country");

дасть:

    ua

Тобто передається `value`, а не текст:

    Ukraine

---

# 30. FormData і textarea

### HTML

    <textarea name="message"></textarea>

Після:

    const formData = new FormData(form);

можна отримати:

    const message = formData.get("message");

---

# 31. FormData і файли

Одна з головних переваг `FormData` — робота з файлами.

### HTML

    <form id="uploadForm">
        <input
            type="file"
            name="avatar"
        >

        <button type="submit">
            Upload
        </button>
    </form>

### JavaScript

    const form = document.querySelector("#uploadForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const file = formData.get("avatar");

        console.log(file);
    });

Значення буде об'єктом типу:

    File

Саме тому `FormData` дуже часто використовується для:

    file upload
    ↓
    FormData
    ↓
    fetch()
    ↓
    backend

Детальніше роботу з `<input type="file">` розглянемо окремо.

---

# 32. `FormData` і `File`

Файл, отриманий через:

    formData.get("avatar");

може бути об'єктом:

    File

У нього є властивості, наприклад:

    file.name
    file.size
    file.type

Приклад:

    const file = formData.get("avatar");

    console.log(file.name);
    console.log(file.size);
    console.log(file.type);

Наприклад:

    avatar.jpg
    245678
    image/jpeg

---

# 33. `Object.fromEntries()`

Іноді потрібно перетворити `FormData` у звичайний JavaScript-об'єкт.

Для цього можна використати:

    Object.fromEntries()

### Приклад

    const formData = new FormData(form);

    const data = Object.fromEntries(formData);

    console.log(data);

Результат приблизно:

    {
        username: "Valeriy",
        email: "user@example.com"
    }

Це дуже зручний спосіб, якщо форма містить переважно прості одиночні текстові значення.

---

# 34. FormData → Object

Типовий шаблон:

    const formData = new FormData(form);

    const data = Object.fromEntries(formData);

Тепер:

    data.username
    data.email

можна використовувати як звичайний JavaScript-об'єкт.

Наприклад:

    console.log(data.username);

---

# 35. Але `Object.fromEntries()` має обмеження

Якщо є кілька значень з однаковим `name`:

    formData.append("skill", "html");
    formData.append("skill", "css");
    formData.append("skill", "javascript");

то:

    Object.fromEntries(formData);

не збере всі значення в масив автоматично.

Для таких випадків потрібно працювати з:

    formData.getAll("skill");

Тому:

    get()
    → одне значення

    getAll()
    → всі значення

---

# 36. FormData і `name`

Запам'ятати:

    <input name="username">

означає:

    ключ → username

а:

    value="Valeriy"

означає:

    значення → Valeriy

Отже:

    username → Valeriy

У JavaScript:

    formData.get("username");

---

# 37. `name` та `value`

Наприклад:

    <input
        type="text"
        name="username"
        value="Valeriy"
    >

Логіка:

    name
    ↓
    "username"

    value
    ↓
    "Valeriy"

    FormData
    ↓
    username → Valeriy

---

# 38. Поля без `name`

Наприклад:

    <input
        id="username"
        type="text"
        value="Valeriy"
    >

У нього немає:

    name

Тому при:

    new FormData(form)

це поле не буде нормальним елементом набору даних форми.

Правило:

> Якщо значення потрібно передати як дані форми — не забувай `name`.

---

# 39. Disabled поля

Поле:

    <input
        name="username"
        value="Valeriy"
        disabled
    >

не буде включене у стандартний набір даних форми.

Тому:

    disabled

має значення не тільки для UI, а й для формування даних.

---

# 40. Readonly vs disabled

Це важлива відмінність.

### `readonly`

    <input
        name="username"
        value="Valeriy"
        readonly
    >

Значення залишається доступним для відправки.

### `disabled`

    <input
        name="username"
        value="Valeriy"
        disabled
    >

Поле не включається у стандартні дані форми.

Запам'ятати:

    readonly
    → не можна редагувати
    → дані можна передати

    disabled
    → поле неактивне
    → дані форми не включають його

---

# 41. `FormData` не виконує валідацію

`FormData` просто збирає дані.

Наприклад:

    <input
        type="email"
        name="email"
    >

`FormData` не є системою перевірки email.

Валідація — окрема тема:

    04-validation

Також важливо:

> Клієнтська валідація не замінює серверну.

Backend повинен сам перевіряти отримані дані.

---

# 42. FormData та сервер

Типовий full-stack сценарій:

    Browser
       ↓
    HTML form
       ↓
    submit
       ↓
    FormData
       ↓
    fetch()
       ↓
    HTTP request
       ↓
    Node.js / Express / NestJS
       ↓
    validation
       ↓
    PostgreSQL

Наприклад, frontend передає:

    username = Valeriy
    email = user@example.com

Backend отримує ці дані, перевіряє їх і за потреби записує в PostgreSQL.

---

# 43. FormData та JSON — не плутати

JSON:

    {
        "username": "Valeriy",
        "email": "user@example.com"
    }

FormData:

    username → Valeriy
    email → user@example.com

JSON — текстовий формат даних.

FormData — Web API / структура для роботи з form data, яка особливо корисна при `multipart/form-data` і файлах.

---

# 44. FormData та fetch: практичний шаблон

Це варто запам'ятати як базовий шаблон:

    const form = document.querySelector("#userForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const response = await fetch("/api/users", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        console.log(result);
    });

На цьому етапі важливо розуміти саму схему:

    form
    ↓
    FormData
    ↓
    fetch
    ↓
    backend

Детальніше `fetch()` і asynchronous JavaScript будуть у наступних розділах.

---

# 45. `formdata` event

Існує також спеціальна подія:

    formdata

Вона пов'язана безпосередньо з формуванням `FormData`.

Приклад:

    form.addEventListener("formdata", (event) => {
        console.log(event.formData);
    });

Тут:

    event.formData

— створений об'єкт `FormData`.

Це вже більш просунутий механізм.

Для більшості базових задач достатньо:

    submit
    ↓
    new FormData(form)

---

# 46. Submit event vs FormData

Не плутати:

    submit
    → користувач намагається відправити форму

    FormData
    → структура, яка містить дані форми

    formdata
    → подія, пов'язана зі створенням FormData під час стандартної обробки форми

Типовий початківський сценарій:

    submit
    ↓
    preventDefault()
    ↓
    new FormData(form)

---

# 47. FormData та URLSearchParams

Для простих текстових даних можна використати:

    const formData = new FormData(form);
    const params = new URLSearchParams(formData);

Але якщо форма містить файл:

    File

то `URLSearchParams` не є заміною `FormData`.

Для файлів:

    FormData
    ↓
    multipart/form-data

---

# 48. Коли використовувати FormData

`FormData` добре підходить, коли:

- працюємо з HTML `<form>`;
- потрібно швидко зібрати поля форми;
- потрібно передати файл;
- використовуємо `multipart/form-data`;
- відправляємо дані через `fetch()`.

---

# 49. Коли зручніше використовувати JSON

JSON часто зручніший для API, коли:

- немає файлів;
- frontend працює з JavaScript-об'єктами;
- backend очікує JSON;
- потрібно передати структуровані дані.

Наприклад:

    const data = {
        username: "Valeriy",
        age: 56
    };

    fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

---

# 50. Типова структура форми

### HTML

    <form id="userForm">
        <label>
            Username
            <input
                type="text"
                name="username"
            >
        </label>

        <label>
            Email
            <input
                type="email"
                name="email"
            >
        </label>

        <button type="submit">
            Send
        </button>
    </form>

### JavaScript

    const form = document.querySelector("#userForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        console.log(formData.get("username"));
        console.log(formData.get("email"));
    });

Це базовий шаблон, який варто вміти написати без підглядання.

---

# 51. Практичний приклад: реєстрація користувача

### HTML

    <form id="registerForm">
        <input
            type="text"
            name="username"
            placeholder="Username"
        >

        <input
            type="email"
            name="email"
            placeholder="Email"
        >

        <input
            type="password"
            name="password"
            placeholder="Password"
        >

        <button type="submit">
            Register
        </button>
    </form>

### JavaScript

    const form = document.querySelector("#registerForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");

        console.log(username);
        console.log(email);
        console.log(password);
    });

Логіка:

    form
    ↓
    submit
    ↓
    preventDefault()
    ↓
    FormData
    ↓
    get()
    ↓
    отримання значень

---

# 52. Практичний приклад: перетворення у Object

### HTML

    <form id="userForm">
        <input
            type="text"
            name="username"
        >

        <input
            type="email"
            name="email"
        >

        <button type="submit">
            Send
        </button>
    </form>

### JavaScript

    const form = document.querySelector("#userForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const data = Object.fromEntries(formData);

        console.log(data);
    });

Можемо отримати:

    {
        username: "Valeriy",
        email: "user@example.com"
    }

Тепер `data` — звичайний JavaScript-об'єкт.

---

# 53. Практичний приклад: додати службове поле

Іноді frontend повинен додати дані, яких немає в HTML.

Наприклад:

    const formData = new FormData(form);

    formData.append("source", "website");

Тепер:

    formData.get("source");

дасть:

    website

Або:

    formData.set("version", "1");

---

# 54. FormData для API

Наприклад, форма:

    username
    email

Після збору:

    const formData = new FormData(form);

можна відправити:

    fetch("/api/users", {
        method: "POST",
        body: formData
    });

На backend:

    request
        ↓
    form data
        ↓
    validation
        ↓
    business logic
        ↓
    database

Це вже безпосередньо пов'язує JavaScript форми з full-stack розробкою.

---

# 55. Часті помилки

## ❌ Помилка 1 — забули `name`

    <input type="text" id="username">

Потім:

    formData.get("username");

може не дати очікуваного результату.

### Правильно

    <input
        id="username"
        name="username"
        type="text"
    >

---

## ❌ Помилка 2 — думаємо, що FormData це Object

Не потрібно очікувати:

    console.log(formData.username);

Правильно:

    formData.get("username");

---

## ❌ Помилка 3 — використовуємо `get()` для кількох значень

Якщо є:

    skill → html
    skill → css
    skill → javascript

то:

    formData.get("skill");

повертає лише одне значення.

Для всіх:

    formData.getAll("skill");

---

## ❌ Помилка 4 — плутаємо `set()` та `append()`

    set()
    → встановити / замінити

    append()
    → додати

---

## ❌ Помилка 5 — забули `preventDefault()`

Якщо JavaScript повинен самостійно обробити форму:

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // власна логіка
    });

Інакше браузер може виконати стандартне відправлення форми.

---

## ❌ Помилка 6 — вручну ставимо Content-Type для FormData

Не потрібно:

    headers: {
        "Content-Type": "multipart/form-data"
    }

При передачі `FormData` через `fetch()` браузер повинен сам сформувати потрібний заголовок.

---

## ❌ Помилка 7 — думаємо, що `<input type="number">` дає Number

Наприклад:

    <input
        type="number"
        name="age"
    >

У FormData значення зазвичай буде рядком.

Тому:

    const age = Number(formData.get("age"));

---

## ❌ Помилка 8 — вважаємо FormData системою валідації

FormData:

    збирає дані

але не гарантує:

    правильність
    безпечність
    відповідність бізнес-правилам

Backend все одно повинен перевіряти отримані дані.

---

# 56. Важливі методи FormData

| Метод | Призначення |
|---|---|
| `get()` | отримати одне значення |
| `getAll()` | отримати всі значення |
| `has()` | перевірити наявність |
| `set()` | встановити / замінити |
| `append()` | додати |
| `delete()` | видалити |
| `entries()` | отримати пари ключ/значення |
| `keys()` | отримати ключі |
| `values()` | отримати значення |

---

# 57. Найважливіший мінімум

Потрібно добре знати:

    const formData = new FormData(form);

    formData.get("username");

    formData.getAll("skill");

    formData.has("email");

    formData.set("username", "Alex");

    formData.append("skill", "javascript");

    formData.delete("email");

    for (const [name, value] of formData) {
        console.log(name, value);
    }

---

# 58. FormData у повному ланцюжку

Для full-stack розробника важливо бачити не окремий API, а весь процес:

    <form>
        ↓
    submit event
        ↓
    preventDefault()
        ↓
    new FormData(form)
        ↓
    get() / getAll() / append()
        ↓
    fetch()
        ↓
    HTTP request
        ↓
    Node.js / Express / NestJS
        ↓
    validation
        ↓
    business logic
        ↓
    PostgreSQL
        ↓
    response
        ↓
    frontend
        ↓
    UI

Саме цей ланцюжок є практичним фундаментом роботи з формами у full-stack JavaScript.

---

# 59. Що потрібно запам'ятати

### 1. FormData збирає дані форми

    const formData = new FormData(form);

### 2. `name` визначає ключ

    <input name="username">

### 3. `get()` отримує значення

    formData.get("username");

### 4. `getAll()` отримує всі значення

    formData.getAll("skill");

### 5. `has()` перевіряє наявність

    formData.has("email");

### 6. `set()` замінює

    formData.set("username", "Alex");

### 7. `append()` додає

    formData.append("skill", "javascript");

### 8. `delete()` видаляє

    formData.delete("email");

### 9. FormData можна перебирати

    for (const [name, value] of formData) {
        console.log(name, value);
    }

### 10. FormData зручно передавати через fetch

    fetch("/api/users", {
        method: "POST",
        body: formData
    });

---

# 60. Питання для співбесіди

### Початковий рівень

1. Що таке `FormData`?
2. Для чого використовується `new FormData(form)`?
3. Чому атрибут `name` важливий для форми?
4. Як отримати значення з `FormData`?
5. Чим `get()` відрізняється від `getAll()`?
6. Що робить `has()`?
7. Що робить `delete()`?
8. Що робить `append()`?
9. Що робить `set()`?
10. Як перебрати всі значення `FormData`?

### Junior

11. Чим `FormData` відрізняється від звичайного JavaScript-об'єкта?
12. Як перетворити `FormData` у звичайний об'єкт?
13. Чому `Object.fromEntries(formData)` може бути недостатньо для checkbox-груп?
14. Що відбувається з checkbox, який не вибраний?
15. Що відбувається з `disabled` полями?
16. Чим `readonly` відрізняється від `disabled`?
17. Як передати `FormData` через `fetch()`?
18. Чому не потрібно вручну встановлювати `Content-Type: multipart/form-data`?
19. Як працює `FormData` з файлами?
20. Чому значення `<input type="number">` через FormData може бути рядком?

### Junior+

21. Чим `FormData` відрізняється від JSON?
22. Коли краще використовувати JSON, а коли FormData?
23. Як додати до FormData поле, якого немає у формі?
24. Чим `set()` відрізняється від `append()`?
25. Що таке `formdata` event?
26. Як перетворити FormData у `URLSearchParams`?
27. Як FormData пов'язується з `multipart/form-data`?
28. Як передати файл разом із текстовими полями?
29. Чому сервер все одно повинен валідовати FormData?
30. Який типовий ланцюжок `form → FormData → fetch → backend`?

---

# 61. Практичні вправи

## 🟢 Рівень 1 — отримати дані

Створи форму:

    username
    email

Після submit:

    1. скасувати стандартну відправку;
    2. створити FormData;
    3. отримати username;
    4. отримати email;
    5. вивести їх у console.

---

## 🟢 Рівень 2 — перебір

Створи форму з:

    username
    email
    city
    age

Збери FormData та виведи:

    username → ...
    email → ...
    city → ...
    age → ...

---

## 🟡 Рівень 3 — append / set

Створи форму з:

    username
    email

Після створення FormData:

    1. додай `source`;
    2. зміни `username`;
    3. виведи всі значення.

Очікувана структура:

    username → Alex
    email → ...
    source → website

---

## 🟡 Рівень 4 — checkbox

Створи:

    HTML
    CSS
    JavaScript
    React

як checkbox із:

    name="skill"

Після submit отримай:

    formData.getAll("skill");

та покажи вибрані навички на сторінці.

---

## 🟡 Рівень 5 — FormData → Object

Створи форму:

    username
    email
    city

Перетвори:

    FormData

у:

    Object

за допомогою:

    Object.fromEntries()

Виведи результат.

---

## 🟠 Рівень 6 — FormData + fetch

Створи форму:

    username
    email

Після submit:

    form
        ↓
    FormData
        ↓
    fetch POST
        ↓
    backend

На backend поки достатньо прийняти дані та повернути відповідь.

---

## 🔴 Рівень 7 — файл

Створи:

    username
    avatar
    submit

Після submit:

    1. створити FormData;
    2. отримати файл;
    3. перевірити його `name`;
    4. перевірити `size`;
    5. перевірити `type`;
    6. передати FormData через fetch.

---

# 62. Навчальний маршрут

### Core

Потрібно знати:

    FormData
    new FormData(form)
    get()
    getAll()
    has()
    set()
    append()
    delete()
    entries()
    keys()
    values()

---

### Junior

Додатково:

    submit + FormData
    name
    checkbox
    radio
    select
    textarea
    disabled
    readonly
    Object.fromEntries()
    FormData + fetch()
    FormData + File

---

### Middle

Розуміти:

    FormData
    ↓
    multipart/form-data
    ↓
    HTTP request
    ↓
    backend parser
    ↓
    validation
    ↓
    business logic

Також:

    formdata event
    URLSearchParams
    multiple values
    file uploads
    API design
    error handling

---

### Senior

Глибше розуміти:

    browser form submission
    HTTP encoding
    multipart boundaries
    streaming
    large file uploads
    upload progress
    security
    server-side validation
    authorization
    CSRF
    content-type handling
    API contracts
    frontend/backend architecture

---

# 63. Міні-шпаргалка

    // Отримати форму
    const form = document.querySelector("#userForm");

    // Submit
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Створити FormData
        const formData = new FormData(form);

        // Отримати значення
        const username = formData.get("username");

        // Отримати всі значення
        const skills = formData.getAll("skill");

        // Перевірити
        const hasEmail = formData.has("email");

        // Замінити
        formData.set("username", "Alex");

        // Додати
        formData.append("source", "website");

        // Видалити
        formData.delete("email");

        // Перебрати
        for (const [name, value] of formData) {
            console.log(name, value);
        }
    });

---

# 64. FormData + fetch — головний практичний шаблон

    const form = document.querySelector("#userForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const response = await fetch("/api/users", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        console.log(result);
    });

Запам'ятати:

    Form
      ↓
    FormData
      ↓
    fetch
      ↓
    Backend

---

# 65. FormData vs Form

Не плутати:

    HTMLFormElement
    ↓
    сама HTML-форма

    FormData
    ↓
    дані, зібрані з форми

Наприклад:

    const form = document.querySelector("#userForm");

    const formData = new FormData(form);

Тут:

    form
    → HTML-елемент

    formData
    → дані форми

---

# 66. FormData vs `input.value`

Для одного поля можна зробити:

    const input = document.querySelector("#username");

    console.log(input.value);

А можна через FormData:

    const formData = new FormData(form);

    console.log(formData.get("username"));

### `input.value`

Добре, коли потрібно працювати з конкретним input.

### `FormData`

Зручно, коли потрібно зібрати всю форму.

---

# 67. Головна ідея

`FormData` — це не просто ще один JavaScript API.

Це важлива частина переходу від frontend до backend:

    HTML
      ↓
    Form
      ↓
    FormData
      ↓
    HTTP
      ↓
    Backend
      ↓
    Database

Для повного stack JavaScript це один із базових механізмів передачі даних.

---

# 68. 🔑 Головне

> `FormData` — це Web API для збору та передачі даних HTML-форми.

> `new FormData(form)` створює набір даних на основі форми.

> Атрибут `name` визначає ключ поля.

> `get()` отримує одне значення.

> `getAll()` отримує всі значення з однаковим `name`.

> `has()` перевіряє наявність поля.

> `set()` встановлює або замінює значення.

> `append()` додає значення.

> `delete()` видаляє значення.

> `FormData` можна перебирати через `for...of`.

> `Object.fromEntries(formData)` дозволяє перетворити просту FormData-структуру на JavaScript-об'єкт.

> `FormData` особливо важлива для передачі файлів.

> `FormData` зручно використовувати разом із `fetch()`.

> При передачі `FormData` браузер сам формує правильний `Content-Type` для multipart-запиту.

> Дані з `FormData` не слід автоматично вважати числами, boolean або безпечними даними — типи та валідацію потрібно контролювати окремо.

> Клієнтська валідація не замінює серверну.

> Головний практичний ланцюжок:

    FORM
      ↓
    SUBMIT
      ↓
    FormData
      ↓
    FETCH
      ↓
    BACKEND
      ↓
    VALIDATION
      ↓
    DATABASE

---

# 📚 Наступний крок

Після `03-formdata` логічно перейти до:

    07-working-with-forms
    ├── 01-input-data
    ├── 02-form-submit
    ├── 03-formdata          ← зараз
    ├── 04-validation
    ├── 05-checkbox-radio-select
    ├── 06-file-input
    └── 07-form-project

Наступна тема — **04-validation**:

    HTML validation
        ↓
    JavaScript validation
        ↓
    Constraint Validation API
        ↓
    custom validation
        ↓
    frontend + backend validation