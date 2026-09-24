# 01. Local Storage

`localStorage` — це Web Storage API, який дозволяє зберігати невеликі обсяги даних у браузері у вигляді пар:

    key → value

Дані зберігаються між перезавантаженнями сторінки та навіть після закриття браузера.

`localStorage` часто використовується для:

- збереження налаштувань користувача;
- темної / світлої теми;
- мовних налаштувань;
- прапорців та простих preferences;
- стану невеликих client-side застосунків;
- збереження простих даних між сесіями;
- прототипів і навчальних застосунків.

Основний об'єкт:

    localStorage

Основні методи:

    setItem()
    getItem()
    removeItem()
    clear()

Для роботи зі складними JavaScript-даними зазвичай використовується:

    JSON.stringify()
    JSON.parse()

---

### Ключові поняття

✔ Web Storage API  
✔ `localStorage`  
✔ storage  
✔ key  
✔ value  
✔ `setItem()`  
✔ `getItem()`  
✔ `removeItem()`  
✔ `clear()`  
✔ `length`  
✔ `key()`  
✔ string values  
✔ persistence  
✔ browser storage  
✔ origin  
✔ same-origin policy  
✔ `JSON.stringify()`  
✔ `JSON.parse()`  
✔ serialization  
✔ deserialization  
✔ storage event  
✔ `sessionStorage`  
✔ client-side storage  

---

### Що потрібно пам'ятати

• `localStorage` — API браузера для збереження даних на стороні клієнта.

• Дані зберігаються у форматі:

    key → value

• Значення `localStorage` зберігаються як strings.

• Навіть якщо зберігати число:

    localStorage.setItem("age", 25);

при отриманні буде:

    "25"

• Для збереження object або array потрібно перетворити їх на JSON string:

    JSON.stringify()

• Для відновлення object або array:

    JSON.parse()

• `setItem()` створює або оновлює значення.

• `getItem()` отримує значення.

• `removeItem()` видаляє конкретний key.

• `clear()` видаляє всі дані `localStorage` для поточного origin.

• `localStorage` зберігає дані між перезавантаженнями сторінки.

• Дані також залишаються після закриття браузера.

• `localStorage` прив'язаний до origin.

• Не слід зберігати в `localStorage` паролі, access tokens або інші чутливі дані без розуміння security implications.

• `localStorage` — синхронний API.

• `localStorage` не є заміною PostgreSQL, MongoDB або іншій серверній database.

• `localStorage` зберігається у браузері конкретного користувача, а не на сервері.

---

# Web Storage API

Web Storage API надає два основні storage-об'єкти:

    localStorage
    sessionStorage

Вони мають майже однаковий API:

    setItem()
    getItem()
    removeItem()
    clear()
    key()
    length

Основна різниця — lifetime даних.

`localStorage`:

    зберігається довше сесії

`sessionStorage`:

    прив'язаний до browser tab / session

У цьому розділі основна увага:

    localStorage

`sessionStorage` буде розглянуто окремо.

---

# localStorage

`localStorage` — глобальний об'єкт браузера.

Приклад:

    localStorage

Перевірити його:

    console.log(localStorage);

---

# Storage Key / Value

Дані зберігаються як:

    key → value

Наприклад:

    theme → dark

    language → uk

    username → Valeriy

---

# setItem()

`setItem()` записує значення у `localStorage`.

Синтаксис:

    localStorage.setItem(key, value);

Наприклад:

    localStorage.setItem("username", "John");

Тепер у storage:

    username → "John"

---

### Ще один приклад

    localStorage.setItem("theme", "dark");

Зберігається:

    theme → "dark"

---

### Оновлення значення

Якщо key вже існує:

    localStorage.setItem("theme", "dark");

потім:

    localStorage.setItem("theme", "light");

значення буде оновлено:

    theme → "light"

`setItem()` не створює дублікати одного key.

---

# getItem()

`getItem()` отримує значення за key.

Синтаксис:

    localStorage.getItem(key);

Наприклад:

    localStorage.setItem("username", "John");

    const username = localStorage.getItem("username");

    console.log(username);

Результат:

    John

---

# Якщо key не існує

Якщо такого key немає:

    const value = localStorage.getItem("unknown");

Результат:

    null

Тому можна перевірити:

    const theme = localStorage.getItem("theme");

    if (theme === null) {
        console.log("Theme not found");
    }

---

# removeItem()

`removeItem()` видаляє конкретний key.

Наприклад:

    localStorage.setItem("theme", "dark");

    localStorage.removeItem("theme");

Тепер:

    localStorage.getItem("theme");

Результат:

    null

---

# clear()

`clear()` видаляє всі записи `localStorage` для поточного origin.

Наприклад:

    localStorage.setItem("theme", "dark");
    localStorage.setItem("language", "uk");
    localStorage.setItem("username", "John");

Після:

    localStorage.clear();

усі ці записи будуть видалені.

⚠️ `clear()` видаляє не один key, а весь доступний `localStorage` для цього origin.

---

# length

`localStorage.length` показує кількість збережених key.

Наприклад:

    localStorage.clear();

    localStorage.setItem("theme", "dark");
    localStorage.setItem("language", "uk");

    console.log(localStorage.length);

Результат:

    2

---

# key()

`key(index)` дозволяє отримати key за його індексом.

Наприклад:

    localStorage.setItem("theme", "dark");
    localStorage.setItem("language", "uk");

    console.log(localStorage.key(0));
    console.log(localStorage.key(1));

Порядок key не слід використовувати як логіку програми.

---

# Перебір localStorage

Оскільки `localStorage` — це Storage object, його можна перебирати.

Наприклад:

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        console.log(key);
    }

---

### Отримання key та value

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        console.log(key, value);
    }

---

# Storage Values Are Strings

Це одна з найважливіших особливостей `localStorage`.

Усі значення зберігаються як strings.

Наприклад:

    localStorage.setItem("age", 25);

Отримуємо:

    const age = localStorage.getItem("age");

    console.log(age);

Результат:

    "25"

Тип:

    typeof age

Результат:

    "string"

---

# Числа

Наприклад:

    localStorage.setItem("count", 10);

Отримання:

    const count = localStorage.getItem("count");

    console.log(typeof count);

Результат:

    string

Якщо потрібне число:

    const count = Number(localStorage.getItem("count"));

Тепер:

    typeof count

Результат:

    number

---

# Boolean

Якщо записати:

    localStorage.setItem("isLoggedIn", true);

при отриманні:

    const value = localStorage.getItem("isLoggedIn");

    console.log(value);
    console.log(typeof value);

Отримаємо:

    "true"
    "string"

Це не boolean `true`.

---

### Перетворення Boolean

Можна перевірити значення:

    const isLoggedIn =
        localStorage.getItem("isLoggedIn") === "true";

Тепер:

    isLoggedIn

має тип:

    boolean

---

# Не використовувати Boolean() бездумно

Наприклад:

    Boolean("false")

дасть:

    true

Тому це небезпечно:

    const value = Boolean(
        localStorage.getItem("isLoggedIn")
    );

Якщо storage містить:

    "false"

результат все одно буде:

    true

Краще:

    const isLoggedIn =
        localStorage.getItem("isLoggedIn") === "true";

---

# String Conversion

`setItem()` очікує значення, яке буде збережене як string.

Наприклад:

    localStorage.setItem("age", 25);

фактично зберігається:

    "25"

Так само:

    localStorage.setItem("active", true);

зберігається:

    "true"

Але для object виникає інша проблема.

---

# Object у localStorage

Не можна просто очікувати, що object буде збережений як JavaScript object.

Наприклад:

    const user = {
        name: "John",
        age: 25
    };

Якщо зробити:

    localStorage.setItem("user", user);

результат буде не JSON object.

У типовому випадку буде збережено:

    "[object Object]"

Тому для object потрібно використовувати:

    JSON.stringify()

---

# JSON.stringify()

`JSON.stringify()` перетворює JavaScript value на JSON string.

Наприклад:

    const user = {
        name: "John",
        age: 25
    };

    const json = JSON.stringify(user);

Результат:

    '{"name":"John","age":25}'

Тепер цей string можна зберегти:

    localStorage.setItem("user", json);

Або одразу:

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

---

# JSON.parse()

`JSON.parse()` робить зворотне перетворення.

Було:

    '{"name":"John","age":25}'

Після:

    JSON.parse()

отримуємо JavaScript object:

    {
        name: "John",
        age: 25
    }

Приклад:

    const json = localStorage.getItem("user");

    const user = JSON.parse(json);

    console.log(user.name);

Результат:

    John

---

# Object → localStorage → Object

Типовий workflow:

    JavaScript object
          ↓
    JSON.stringify()
          ↓
    string
          ↓
    localStorage
          ↓
    getItem()
          ↓
    JSON.parse()
          ↓
    JavaScript object

Наприклад:

    const user = {
        name: "John",
        age: 25
    };

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    const storedUser = JSON.parse(
        localStorage.getItem("user")
    );

---

# Array у localStorage

Масиви також потрібно серіалізувати.

Наприклад:

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

Зберігаємо:

    localStorage.setItem(
        "fruits",
        JSON.stringify(fruits)
    );

Отримуємо:

    const fruits = JSON.parse(
        localStorage.getItem("fruits")
    );

Результат:

    [
        "apple",
        "banana",
        "orange"
    ]

---

# Array of Objects

Типовий приклад:

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

Збереження:

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

Отримання:

    const users = JSON.parse(
        localStorage.getItem("users")
    );

Тепер можна працювати з масивом як зі звичайним JavaScript array:

    users.forEach(user => {
        console.log(user.name);
    });

---

# Перевірка існування даних

Наприклад:

    const theme = localStorage.getItem("theme");

    if (theme !== null) {
        console.log("Theme exists");
    }

---

### Короткий варіант

    const theme = localStorage.getItem("theme");

    if (theme) {
        console.log(theme);
    }

Але потрібно пам'ятати:

    ""

    "0"

    "false"

є strings і поводяться як значення відповідно до правил truthy/falsy.

Для перевірки саме наявності key надійніше:

    localStorage.getItem("theme") !== null

---

# Default Value

Частий патерн:

    const theme =
        localStorage.getItem("theme") ?? "light";

Якщо key відсутній:

    theme → "light"

---

# Збереження Theme

Один із найпоширеніших прикладів використання `localStorage`.

Наприклад:

    const theme = "dark";

    localStorage.setItem("theme", theme);

При наступному відкритті сторінки:

    const savedTheme =
        localStorage.getItem("theme");

    console.log(savedTheme);

Результат:

    dark

---

# Theme Toggle

Наприклад:

    function setTheme(theme) {
        localStorage.setItem("theme", theme);
    }

    function getTheme() {
        return localStorage.getItem("theme");
    }

Використання:

    setTheme("dark");

    console.log(getTheme());

Результат:

    dark

---

# localStorage + DOM

`localStorage` часто використовується разом із DOM.

Наприклад:

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

Коли користувач змінює тему:

    localStorage.setItem("theme", "dark");

---

# localStorage + Form

Наприклад, зберігаємо ім'я:

    const input = document.querySelector("#name");
    const button = document.querySelector("#save");

    button.addEventListener("click", () => {
        localStorage.setItem(
            "name",
            input.value
        );
    });

Після перезавантаження:

    input.value =
        localStorage.getItem("name") ?? "";

---

# localStorage + Checkbox

Наприклад:

    const checkbox =
        document.querySelector("#remember");

    checkbox.checked =
        localStorage.getItem("remember") === "true";

При зміні:

    checkbox.addEventListener("change", () => {
        localStorage.setItem(
            "remember",
            checkbox.checked
        );
    });

У storage:

    remember → "true"

або:

    remember → "false"

---

# localStorage + Counter

Простий приклад.

    let count =
        Number(localStorage.getItem("count")) || 0;

    count++;

    localStorage.setItem(
        "count",
        count
    );

Після перезавантаження значення можна відновити:

    const count =
        Number(localStorage.getItem("count")) || 0;

---

# localStorage + Array

Наприклад, список tasks.

    const tasks = [
        "Learn JavaScript",
        "Practice DOM"
    ];

Збереження:

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

Отримання:

    const tasks = JSON.parse(
        localStorage.getItem("tasks")
    );

---

# Додавання елемента до збереженого масиву

Наприклад:

    const tasks = JSON.parse(
        localStorage.getItem("tasks")
    ) ?? [];

    tasks.push("Learn localStorage");

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

Логіка:

    localStorage
         ↓
    getItem()
         ↓
    JSON.parse()
         ↓
    Array
         ↓
    push()
         ↓
    JSON.stringify()
         ↓
    setItem()
         ↓
    localStorage

---

# Видалення елемента з масиву

Наприклад:

    let tasks = JSON.parse(
        localStorage.getItem("tasks")
    ) ?? [];

    tasks = tasks.filter(
        task => task !== "Learn localStorage"
    );

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

---

# Збереження Object

Типовий шаблон:

    const user = {
        name: "John",
        age: 25,
        city: "Kyiv"
    };

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

---

# Отримання Object

    const userJson =
        localStorage.getItem("user");

    const user =
        userJson
            ? JSON.parse(userJson)
            : null;

Тепер:

    console.log(user);

---

# Безпечніше читання JSON

`JSON.parse()` може викинути error, якщо string не є valid JSON.

Тому для даних, які можуть бути пошкоджені або мати неправильний формат, можна використати `try...catch`.

    function getUser() {
        const data =
            localStorage.getItem("user");

        if (!data) {
            return null;
        }

        try {
            return JSON.parse(data);
        } catch {
            return null;
        }
    }

---

# Безпечне збереження JSON

Можна створити helper:

    function saveUser(user) {
        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );
    }

Використання:

    saveUser({
        name: "John",
        age: 25
    });

---

# Helper Functions

Для невеликого застосунку зручно винести storage-операції.

    function save(key, value) {
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );
    }

    function load(key) {
        const value =
            localStorage.getItem(key);

        return value
            ? JSON.parse(value)
            : null;
    }

Тоді:

    save("user", {
        name: "John",
        age: 25
    });

    const user = load("user");

---

# Важлива проблема Generic Helper

`JSON.stringify()` працює не з усіма JavaScript values однаково.

Наприклад, спеціальні типи можуть втрачати частину інформації.

Також:

    undefined
    functions
    Symbol

не серіалізуються як звичайні JSON values.

Тому потрібно розуміти різницю між:

    JavaScript value

та:

    JSON data

Детальніше це буде в:

    03-json
    04-serialization

---

# Origin

`localStorage` прив'язаний до origin.

У спрощеному вигляді origin визначається:

    protocol
    host
    port

Наприклад:

    https://example.com

та:

    http://example.com

не є одним origin.

Так само:

    https://example.com

та:

    https://www.example.com

є різними origins.

---

# Same-Origin

Доступ до storage контролюється same-origin policy.

Сторінка може працювати зі своїм `localStorage`, але не може просто так читати `localStorage` іншого origin.

Наприклад:

    https://site-a.com

не може напряму прочитати:

    https://site-b.com

---

# Browser DevTools

`localStorage` можна переглядати через DevTools.

У Chromium-based browsers зазвичай:

    DevTools
        ↓
    Application
        ↓
    Storage
        ↓
    Local Storage

У Firefox назви вкладок можуть трохи відрізнятися, але принцип той самий.

Там можна побачити:

    Key
    Value

Наприклад:

    theme      dark
    language   uk
    username   John

---

# Storage Inspector

Через DevTools можна:

- переглядати keys;
- переглядати values;
- додавати записи;
- редагувати записи;
- видаляти записи;
- очищати storage.

Це дуже корисно під час debugging.

---

# Storage Events

При зміні `localStorage` браузер може генерувати:

    storage

event.

Наприклад:

    window.addEventListener(
        "storage",
        event => {
            console.log(event);
        }
    );

Event містить інформацію про зміну storage.

---

# storage event

Типові властивості:

    event.key
    event.oldValue
    event.newValue
    event.storageArea
    event.url

Наприклад:

    window.addEventListener(
        "storage",
        event => {
            console.log(event.key);
            console.log(event.oldValue);
            console.log(event.newValue);
        }
    );

---

# Важлива особливість storage event

Зміна `localStorage` зазвичай викликає `storage` event в інших documents / tabs того самого origin, а не в тому самому документі, який зробив зміну.

Наприклад:

    Tab A
       ↓
    localStorage.setItem(...)
       ↓
    Tab B
       ↓
    storage event

Це дозволяє синхронізувати простий стан між вкладками.

---

# localStorage і вкладки

Наприклад, відкриті дві вкладки одного сайту:

    Tab A
    Tab B

Обидві працюють з одним origin.

Якщо Tab A змінює:

    localStorage.setItem(
        "theme",
        "dark"
    );

Tab B може отримати:

    storage

event.

---

# localStorage vs sessionStorage

Основна різниця:

    localStorage
        ↓
    зберігається між browser sessions

    sessionStorage
        ↓
    пов'язаний із поточною page session / tab

Обидва мають API:

    setItem()
    getItem()
    removeItem()
    clear()

---

# localStorage vs Cookies

`localStorage`:

    client-side storage
    JavaScript API
    не надсилається автоматично з кожним HTTP request

Cookies:

    browser storage
    можуть автоматично надсилатися серверу
    мають HTTP-related механізми
    підтримують attributes, наприклад:
        Secure
        HttpOnly
        SameSite
        Expires / Max-Age

Тому `localStorage` і cookies — не взаємозамінні технології.

---

# localStorage vs Database

`localStorage`:

    browser
       ↓
    конкретний користувач
       ↓
    client-side data

Database:

    application server
          ↓
    database
          ↓
    shared / persistent application data

Наприклад:

    localStorage
        theme = dark

це локальна preference конкретного браузера.

А:

    PostgreSQL
        users
        courses
        orders

це вже серверні дані застосунку.

---

# localStorage vs Backend

`localStorage` не замінює backend.

Наприклад:

    localStorage
        ↓
    зберігати theme

але:

    PostgreSQL
        ↓
    зберігати users

або:

    PostgreSQL
        ↓
    зберігати courses

---

# Security

`localStorage` доступний JavaScript-коду сторінки.

Тому якщо на сайті є XSS vulnerability, malicious JavaScript може потенційно прочитати дані з `localStorage`.

Тому не слід бездумно зберігати там:

    passwords
    sensitive personal data
    secrets
    long-lived authentication credentials

Особливо важливо розуміти, що:

    localStorage ≠ secure secret storage

---

# localStorage і Authentication

Не слід вивчати `localStorage` за принципом:

    "JWT завжди треба зберігати в localStorage"

Це занадто спрощене правило.

Authentication architecture залежить від:

    threat model
    application architecture
    XSS risk
    CSRF risk
    token lifetime
    cookie configuration
    server architecture

Для production authentication потрібно розуміти security implications.

---

# Capacity

`localStorage` призначений для невеликих обсягів даних.

Точний доступний обсяг залежить від браузера, платформи та storage policies.

Тому не слід проектувати application database навколо `localStorage`.

Для великих client-side datasets існують інші механізми, наприклад:

    IndexedDB

---

# localStorage — не кеш за замовчуванням

`localStorage` можна використовувати для простого client-side caching, але він не є спеціалізованим cache API.

Для сучасних web applications також існують:

    Cache API
    Service Workers
    IndexedDB

Вибір залежить від задачі.

---

# localStorage і React / Next.js

`localStorage` існує в browser environment.

Тому в середовищах із server-side rendering потрібно пам'ятати:

    localStorage

не існує на сервері.

Наприклад, код:

    const theme = localStorage.getItem("theme");

не можна бездумно виконувати під час server rendering.

У Next.js потрібно виконувати browser-only code у відповідному client-side context.

Наприклад, у Client Component:

    "use client";

    import { useEffect, useState } from "react";

    export default function Theme() {
        const [theme, setTheme] = useState("light");

        useEffect(() => {
            const savedTheme =
                localStorage.getItem("theme");

            if (savedTheme) {
                setTheme(savedTheme);
            }
        }, []);

        return <div>{theme}</div>;
    }

Це вже важливий місток від vanilla JavaScript до React / Next.js.

---

# Перевірка localStorage

У браузері:

    if (typeof localStorage !== "undefined") {
        console.log(localStorage);
    }

У browser-only коді це може бути корисним для перевірки середовища.

Але сама перевірка не вирішує всі SSR / hydration питання.

---

# localStorage та Private / Incognito Mode

Поведінка storage може відрізнятися залежно від браузера та режиму приватного перегляду.

Не слід будувати критично важливу server-side business logic на припущенні, що `localStorage` завжди доступний і завжди поводиться однаково.

---

# localStorage Error Handling

Storage operations іноді можуть завершитися помилкою через:

    browser restrictions
    storage policies
    quota limitations
    privacy settings
    security restrictions

Тому production-код для важливих сценаріїв може потребувати `try...catch`.

Наприклад:

    function saveTheme(theme) {
        try {
            localStorage.setItem(
                "theme",
                theme
            );
        } catch (error) {
            console.error(
                "Failed to save theme",
                error
            );
        }
    }

---

# Простий Storage Service

Для застосунку можна створити окремий модуль.

Наприклад:

    const storage = {
        set(key, value) {
            localStorage.setItem(
                key,
                JSON.stringify(value)
            );
        },

        get(key) {
            const value =
                localStorage.getItem(key);

            return value
                ? JSON.parse(value)
                : null;
        },

        remove(key) {
            localStorage.removeItem(key);
        },

        clear() {
            localStorage.clear();
        }
    };

Використання:

    storage.set("user", {
        name: "John"
    });

    const user =
        storage.get("user");

---

# Naming Keys

Для невеликого застосунку можна використовувати:

    theme
    language
    user
    tasks
    settings

Для більших застосунків корисно мати зрозумілу naming convention.

Наприклад:

    app:theme
    app:language
    app:settings
    app:tasks

Або:

    myapp_theme
    myapp_settings

Головна мета:

    уникати конфліктів key

---

# Namespacing

Якщо кілька частин application використовують storage, корисно групувати keys.

Наприклад:

    app:theme
    app:user
    app:settings

Замість:

    theme
    user
    settings

Це особливо корисно у великих applications.

---

# Збереження Settings Object

Замість окремих keys:

    theme
    language
    fontSize

можна зберігати один object:

    const settings = {
        theme: "dark",
        language: "uk",
        fontSize: 18
    };

    localStorage.setItem(
        "settings",
        JSON.stringify(settings)
    );

Отримання:

    const settings = JSON.parse(
        localStorage.getItem("settings")
    );

---

# Оновлення частини Object

Наприклад:

    const settings = JSON.parse(
        localStorage.getItem("settings")
    ) ?? {};

    settings.theme = "light";

    localStorage.setItem(
        "settings",
        JSON.stringify(settings)
    );

Workflow:

    get
      ↓
    parse
      ↓
    modify
      ↓
    stringify
      ↓
    set

---

# Storage Lifecycle

Типовий lifecycle:

    User action
         ↓
    JavaScript state
         ↓
    JSON.stringify()
         ↓
    localStorage.setItem()
         ↓
    Browser storage
         ↓
    Page reload
         ↓
    localStorage.getItem()
         ↓
    JSON.parse()
         ↓
    JavaScript state
         ↓
    UI

Це одна з головних моделей цього розділу.

---

# CRUD-подібна модель

З `localStorage` можна виконувати прості операції:

    Create / Update
        ↓
    setItem()

    Read
        ↓
    getItem()

    Delete one
        ↓
    removeItem()

    Delete all
        ↓
    clear()

Це нагадує CRUD, але `localStorage` не є повноцінною database.

---

# Практичний приклад — Theme

    const button =
        document.querySelector("#theme-toggle");

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme) {
        document.body.dataset.theme =
            savedTheme;
    }

    button.addEventListener("click", () => {
        const currentTheme =
            document.body.dataset.theme;

        const nextTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        document.body.dataset.theme =
            nextTheme;

        localStorage.setItem(
            "theme",
            nextTheme
        );
    });

Логіка:

    click
      ↓
    change theme
      ↓
    update DOM
      ↓
    save theme
      ↓
    reload
      ↓
    restore theme

---

# Практичний приклад — User Preferences

    const preferences = {
        language: "uk",
        theme: "dark",
        fontSize: 18
    };

    localStorage.setItem(
        "preferences",
        JSON.stringify(preferences)
    );

Отримання:

    const storedPreferences =
        localStorage.getItem("preferences");

    const preferences =
        storedPreferences
            ? JSON.parse(storedPreferences)
            : null;

---

# Практичний приклад — Todo List

    const todos = [
        {
            id: 1,
            title: "Learn JavaScript",
            completed: false
        },
        {
            id: 2,
            title: "Practice localStorage",
            completed: true
        }
    ];

Зберігаємо:

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );

Отримуємо:

    const todos = JSON.parse(
        localStorage.getItem("todos")
    ) ?? [];

---

# Todo Add

    const todos = JSON.parse(
        localStorage.getItem("todos")
    ) ?? [];

    todos.push({
        id: Date.now(),
        title: "Learn JSON",
        completed: false
    });

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );

---

# Todo Toggle

    const todos = JSON.parse(
        localStorage.getItem("todos")
    ) ?? [];

    const todo = todos.find(
        todo => todo.id === 1
    );

    if (todo) {
        todo.completed = !todo.completed;
    }

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );

---

# Todo Delete

    let todos = JSON.parse(
        localStorage.getItem("todos")
    ) ?? [];

    todos = todos.filter(
        todo => todo.id !== 1
    );

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );

---

# Типові помилки

❌ Очікувати, що `localStorage` зберігає JavaScript types.

    localStorage.setItem("age", 25);

При отриманні:

    "25"

а не:

    25

---

❌ Зберігати object без `JSON.stringify()`.

    localStorage.setItem("user", user);

Для object це призведе до небажаного string representation.

Правильно:

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

---

❌ Забувати `JSON.parse()`.

    const user =
        localStorage.getItem("user");

Це string.

Якщо потрібен object:

    const user = JSON.parse(
        localStorage.getItem("user")
    );

---

❌ Викликати `JSON.parse(null)` без розуміння результату.

Краще явно враховувати відсутність key:

    const data =
        localStorage.getItem("user");

    const user =
        data ? JSON.parse(data) : null;

---

❌ Використовувати `Boolean()` для рядків `"true"` / `"false"`.

    Boolean("false");

Результат:

    true

Краще:

    value === "true"

---

❌ Використовувати `clear()`, коли потрібно видалити один key.

Замість:

    localStorage.clear();

використовувати:

    localStorage.removeItem("theme");

---

❌ Зберігати паролі в `localStorage`.

`localStorage` доступний JavaScript-коду сторінки.

---

❌ Використовувати `localStorage` як database.

`localStorage` підходить для невеликих client-side даних, а не для серверного сховища application data.

---

❌ Очікувати, що `localStorage` доступний у Node.js.

`localStorage` — browser API.

Node.js має інше runtime environment.

---

❌ Використовувати `localStorage` безпосередньо під час SSR.

У server environment немає browser `localStorage`.

Це особливо важливо для:

    Next.js
    SSR
    Server Components

---

❌ Зберігати занадто великі обсяги даних.

Для великих client-side datasets існують інші технології:

    IndexedDB

---

❌ Припускати, що дані завжди існуватимуть.

Storage може бути очищений користувачем, браузером або політиками середовища.

---

# Питання зі співбесіди

Що таке `localStorage`?

Що таке Web Storage API?

Яка різниця між `localStorage` та `sessionStorage`?

Які основні методи `localStorage`?

Що робить `setItem()`?

Що робить `getItem()`?

Що робить `removeItem()`?

Що робить `clear()`?

Що повертає `getItem()`, якщо key не існує?

Що показує `localStorage.length`?

Для чого використовується `key()`?

У якому типі `localStorage` зберігає values?

Що станеться, якщо зберегти number?

Що станеться, якщо зберегти boolean?

Чому для object потрібен `JSON.stringify()`?

Що робить `JSON.stringify()`?

Що робить `JSON.parse()`?

Як зберегти array у `localStorage`?

Як зберегти object у `localStorage`?

Як отримати object із `localStorage`?

Як перевірити, чи існує key?

Чим `removeItem()` відрізняється від `clear()`?

Що таке origin?

Як origin впливає на `localStorage`?

Що таке same-origin policy?

Чи доступний `localStorage` у Node.js?

Чи доступний `localStorage` під час SSR?

Що таке `storage` event?

Коли виникає `storage` event?

Чи викликається `storage` event у тому самому document, який змінив storage?

Чи можна використовувати `localStorage` для authentication?

Які security risks пов'язані з `localStorage`?

Чим `localStorage` відрізняється від cookies?

Чим `localStorage` відрізняється від database?

Коли краще використовувати IndexedDB?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке Web Storage API.

Що таке `localStorage`.

Розуміти:

    key → value

Знати:

    setItem()
    getItem()
    removeItem()
    clear()

Знати:

    localStorage.length
    localStorage.key()

Розуміти:

    values → strings

Вміти зберігати:

    strings
    numbers
    booleans

Розуміти перетворення типів.

Знати:

    JSON.stringify()
    JSON.parse()

Вміти зберігати:

    objects
    arrays

Вміти отримувати збережені дані.

Вміти перевіряти відсутній key:

    null

Розуміти persistence.

---

## 🔵 Junior

Розуміти:

    localStorage
    sessionStorage

Розуміти origin.

Розуміти same-origin policy.

Вміти працювати з DevTools Storage.

Вміти будувати:

    get
    set
    remove

Вміти створювати storage helpers.

Вміти зберігати:

    user preferences
    theme
    language
    simple application state
    arrays
    objects

Розуміти:

    JSON serialization
    JSON deserialization

Знати `storage` event.

Розуміти основи security.

Знати, чому не можна бездумно зберігати secrets.

Розуміти різницю:

    browser storage
    backend storage
    database

---

## 🟠 Middle

Проектувати storage layer.

Створювати abstraction над:

    localStorage

Наприклад:

    storage.set()
    storage.get()
    storage.remove()

Обробляти:

    JSON.parse() errors
    storage errors
    quota errors

Розуміти storage lifecycle.

Розуміти synchronization між tabs.

Використовувати:

    storage event

Розуміти SSR limitations.

Працювати з:

    localStorage
    React
    Next.js

Розуміти hydration implications.

Розрізняти:

    localStorage
    sessionStorage
    cookies
    IndexedDB
    Cache API

Розуміти, яке client-side storage відповідає конкретній задачі.

---

## 🔴 Senior

Глибоке розуміння:

    Web Storage specification
    origin model
    storage partitioning
    browser privacy policies
    storage quotas
    eviction
    persistence policies

Розуміння security implications:

    XSS
    token storage
    CSRF
    cookies
    HttpOnly
    SameSite
    Secure

Порівняння:

    localStorage
    sessionStorage
    cookies
    IndexedDB
    Cache API
    server-side storage

Архітектура client-side persistence.

Storage abstraction layers.

Cross-tab synchronization.

Offline-first architecture.

Client-side caching strategies.

Data migration у browser storage.

Versioning stored data.

Backward compatibility.

Handling corrupted storage.

Storage cleanup strategies.

---

# Міні-шпаргалка

## localStorage

    localStorage

Browser storage для невеликих client-side даних.

---

## Set

    localStorage.setItem(
        "theme",
        "dark"
    );

---

## Get

    const theme =
        localStorage.getItem("theme");

---

## Remove

    localStorage.removeItem("theme");

---

## Clear

    localStorage.clear();

Видаляє всі keys для поточного origin.

---

## Length

    localStorage.length

Кількість stored keys.

---

## Key

    localStorage.key(0)

Отримати key за index.

---

## String

    localStorage.setItem("name", "John");

    const name =
        localStorage.getItem("name");

---

## Number

    localStorage.setItem("age", 25);

    const age = Number(
        localStorage.getItem("age")
    );

---

## Boolean

    localStorage.setItem(
        "active",
        true
    );

    const active =
        localStorage.getItem("active") === "true";

---

## Object

    const user = {
        name: "John",
        age: 25
    };

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

---

## Get Object

    const user = JSON.parse(
        localStorage.getItem("user")
    );

---

## Array

    const numbers = [10, 20, 30];

    localStorage.setItem(
        "numbers",
        JSON.stringify(numbers)
    );

---

## Get Array

    const numbers = JSON.parse(
        localStorage.getItem("numbers")
    );

---

## Default

    const theme =
        localStorage.getItem("theme")
        ?? "light";

---

## Check Exists

    const theme =
        localStorage.getItem("theme");

    if (theme !== null) {
        console.log(theme);
    }

---

## Object Workflow

    Object
       ↓
    JSON.stringify()
       ↓
    String
       ↓
    localStorage
       ↓
    getItem()
       ↓
    JSON.parse()
       ↓
    Object

---

## Array Workflow

    Array
       ↓
    JSON.stringify()
       ↓
    String
       ↓
    localStorage
       ↓
    getItem()
       ↓
    JSON.parse()
       ↓
    Array

---

## Основні методи

    setItem()
        → create / update

    getItem()
        → read

    removeItem()
        → delete one

    clear()
        → delete all

---

## localStorage vs sessionStorage

    localStorage
        → persists across page reloads / browser sessions

    sessionStorage
        → tied to the current page session / tab

---

## Storage values

    localStorage
        ↓
    strings

Для складних структур:

    JSON.stringify()
    JSON.parse()

---

## Security

    localStorage
        ↓
    accessible to JavaScript

Тому не слід бездумно зберігати:

    passwords
    secrets
    sensitive credentials

---

## Browser

    localStorage
        → Browser API

Не:

    Node.js API

---

## Server

    localStorage
        → client

    PostgreSQL
        → server/database

---

# Головне:

• `localStorage` — browser API для persistent client-side storage.

• Дані зберігаються у форматі:

    key → value

• Значення `localStorage` є strings.

• Основні методи:

    setItem()
    getItem()
    removeItem()
    clear()

• `setItem()` створює або оновлює key.

• `getItem()` повертає value або `null`, якщо key відсутній.

• `removeItem()` видаляє конкретний key.

• `clear()` видаляє всі записи `localStorage` поточного origin.

• `localStorage.length` показує кількість keys.

• `localStorage.key(index)` дозволяє отримати key за index.

• Numbers та booleans після збереження стають strings.

• Для object та array потрібно використовувати:

    JSON.stringify()

• Для відновлення object та array:

    JSON.parse()

• Типовий workflow:

    JS data
       ↓
    stringify
       ↓
    localStorage
       ↓
    getItem
       ↓
    parse
       ↓
    JS data

• `localStorage` зберігає дані між перезавантаженнями сторінки.

• `localStorage` також зазвичай зберігає дані між browser sessions.

• `localStorage` прив'язаний до origin.

• Різні origins не мають спільного `localStorage`.

• `localStorage` — client-side storage.

• `localStorage` не є database.

• `localStorage` не замінює PostgreSQL.

• `localStorage` не є заміною backend.

• `localStorage` доступний JavaScript-коду сторінки.

• Тому потрібно враховувати XSS та інші security risks.

• Не слід бездумно зберігати в `localStorage`:

    passwords
    secrets
    sensitive authentication data

• `localStorage` доступний у браузері, але не в Node.js.

• У SSR-середовищах потрібно пам'ятати, що browser APIs недоступні під час server rendering.

• Для React / Next.js потрібно правильно відокремлювати browser-only logic.

• `storage` event може використовуватися для реагування на зміни storage між документами одного origin.

• Для великих client-side datasets існує IndexedDB.

• Для HTTP cookies та authentication існують інші механізми та security properties.

• Найважливіша модель:

    localStorage
        ↓
    small client-side persistent data

• Типові практичні задачі:

    theme
    language
    preferences
    simple settings
    small client-side state
    simple todo data
    simple form persistence

• Головне питання перед використанням `localStorage`:

    "Ці дані справді повинні жити
     локально в браузері цього користувача?"

• Якщо дані повинні бути:

    shared
    server-controlled
    relational
    persistent on the server
    accessible from multiple devices

потрібні backend + database, а не `localStorage`.

• Якщо потрібно зберігати складні client-side data у значному обсязі, потрібно розглянути:

    IndexedDB

• `localStorage` — простий інструмент для невеликих persistent client-side даних, але його потрібно чітко відрізняти від:

    cookies
    sessionStorage
    IndexedDB
    Cache API
    backend
    database