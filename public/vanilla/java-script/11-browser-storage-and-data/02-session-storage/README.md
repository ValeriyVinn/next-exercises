# 02. Session Storage

`sessionStorage` — це Web Storage API, який дозволяє зберігати невеликі обсяги даних у браузері у вигляді пар:

    key → value

Головна особливість `sessionStorage` — дані прив'язані до поточної page session і зазвичай зберігаються доти, доки користувач не закриє відповідну вкладку браузера.

`sessionStorage` часто використовується для:

- тимчасового стану форми;
- стану wizard / multi-step form;
- тимчасових налаштувань;
- стану поточної вкладки;
- збереження даних під час navigation;
- тимчасового UI state;
- навчальних застосунків.

Основний об'єкт:

    sessionStorage

Основні методи:

    setItem()
    getItem()
    removeItem()
    clear()

Також доступні:

    length
    key()

Для object та array зазвичай використовуються:

    JSON.stringify()
    JSON.parse()

---

### Ключові поняття

✔ Web Storage API  
✔ `sessionStorage`  
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
✔ page session  
✔ browser tab  
✔ persistence  
✔ origin  
✔ same-origin policy  
✔ `JSON.stringify()`  
✔ `JSON.parse()`  
✔ serialization  
✔ deserialization  
✔ `storage` event  
✔ `localStorage`  
✔ client-side storage  

---

### Що потрібно пам'ятати

• `sessionStorage` — browser API для тимчасового client-side storage.

• Дані зберігаються у форматі:

    key → value

• Values зберігаються як strings.

• Якщо зберегти number:

    sessionStorage.setItem("age", 25);

при отриманні буде:

    "25"

• Для object та array потрібно використовувати:

    JSON.stringify()

• Для відновлення:

    JSON.parse()

• `setItem()` створює або оновлює value.

• `getItem()` отримує value.

• `removeItem()` видаляє конкретний key.

• `clear()` видаляє всі записи `sessionStorage` для поточного storage area.

• `sessionStorage.length` показує кількість keys.

• `sessionStorage.key(index)` повертає key за index.

• На відміну від `localStorage`, `sessionStorage` призначений для даних поточної page session.

• Закриття вкладки завершує відповідну page session.

• Відкриття нової вкладки не слід розглядати як спосіб отримати незалежний доступ до того самого session state.

• `sessionStorage` також прив'язаний до origin.

• `sessionStorage` не є database.

• `sessionStorage` не замінює PostgreSQL або backend.

• `sessionStorage` зберігається в браузері користувача.

• `sessionStorage` доступний JavaScript-коду сторінки.

• Тому для чутливих даних потрібно враховувати security risks.

---

# Web Storage API

Web Storage API надає два основні storage objects:

    localStorage
    sessionStorage

Вони мають практично однаковий API:

    setItem()
    getItem()
    removeItem()
    clear()
    key()
    length

Головна відмінність — lifetime та область дії даних.

    localStorage
        ↓
    persistent storage

    sessionStorage
        ↓
    storage поточної page session

---

# sessionStorage

`sessionStorage` доступний у browser environment:

    sessionStorage

Наприклад:

    console.log(sessionStorage);

---

# setItem()

`setItem()` записує value у `sessionStorage`.

Синтаксис:

    sessionStorage.setItem(key, value);

Наприклад:

    sessionStorage.setItem(
        "username",
        "John"
    );

Тепер:

    username → "John"

---

# Оновлення значення

Якщо key вже існує:

    sessionStorage.setItem(
        "theme",
        "dark"
    );

Потім:

    sessionStorage.setItem(
        "theme",
        "light"
    );

значення буде оновлено:

    theme → "light"

Один key відповідає одному value.

---

# getItem()

`getItem()` отримує value за key.

Наприклад:

    sessionStorage.setItem(
        "username",
        "John"
    );

    const username =
        sessionStorage.getItem(
            "username"
        );

    console.log(username);

Результат:

    John

---

# Якщо key не існує

Наприклад:

    const value =
        sessionStorage.getItem(
            "unknown"
        );

Результат:

    null

Тому можна перевірити:

    const value =
        sessionStorage.getItem(
            "unknown"
        );

    if (value === null) {
        console.log("Value not found");
    }

---

# removeItem()

`removeItem()` видаляє один key.

Наприклад:

    sessionStorage.setItem(
        "step",
        "2"
    );

    sessionStorage.removeItem(
        "step"
    );

Тепер:

    sessionStorage.getItem("step");

Результат:

    null

---

# clear()

`clear()` видаляє всі записи `sessionStorage` для відповідного storage area.

Наприклад:

    sessionStorage.setItem(
        "step",
        "2"
    );

    sessionStorage.setItem(
        "name",
        "John"
    );

    sessionStorage.clear();

Після цього записи будуть видалені.

⚠️ `clear()` видаляє всі записи цього `sessionStorage`, а не один key.

---

# length

`sessionStorage.length` показує кількість stored keys.

Наприклад:

    sessionStorage.clear();

    sessionStorage.setItem(
        "step",
        "1"
    );

    sessionStorage.setItem(
        "language",
        "uk"
    );

    console.log(
        sessionStorage.length
    );

Результат:

    2

---

# key()

`key(index)` дозволяє отримати key за index.

Наприклад:

    sessionStorage.setItem(
        "step",
        "1"
    );

    sessionStorage.setItem(
        "language",
        "uk"
    );

    console.log(
        sessionStorage.key(0)
    );

    console.log(
        sessionStorage.key(1)
    );

Не слід будувати application logic на конкретному порядку keys.

---

# Перебір sessionStorage

Можна перебрати keys через `length` та `key()`.

    for (
        let i = 0;
        i < sessionStorage.length;
        i++
    ) {
        const key =
            sessionStorage.key(i);

        console.log(key);
    }

---

# Перебір key + value

    for (
        let i = 0;
        i < sessionStorage.length;
        i++
    ) {
        const key =
            sessionStorage.key(i);

        const value =
            sessionStorage.getItem(key);

        console.log(key, value);
    }

---

# Storage Values Are Strings

Це одна з найважливіших властивостей `sessionStorage`.

Усі values зберігаються як strings.

Наприклад:

    sessionStorage.setItem(
        "age",
        25
    );

Отримання:

    const age =
        sessionStorage.getItem("age");

    console.log(age);

Результат:

    "25"

Тип:

    typeof age

Результат:

    "string"

---

# Numbers

Наприклад:

    sessionStorage.setItem(
        "count",
        10
    );

Отримання:

    const count =
        Number(
            sessionStorage.getItem(
                "count"
            )
        );

Тепер:

    typeof count

Результат:

    "number"

---

# Boolean

Якщо записати:

    sessionStorage.setItem(
        "active",
        true
    );

при отриманні:

    const active =
        sessionStorage.getItem(
            "active"
        );

Отримаємо:

    "true"

Це string, а не boolean.

---

### Перетворення Boolean

Можна зробити:

    const active =
        sessionStorage.getItem(
            "active"
        ) === "true";

Тепер:

    typeof active

Результат:

    "boolean"

---

# Не використовувати Boolean() бездумно

Наприклад:

    Boolean("false")

дає:

    true

Тому:

    const active = Boolean(
        sessionStorage.getItem(
            "active"
        )
    );

може дати неправильну логіку, якщо storage містить:

    "false"

Краще:

    const active =
        sessionStorage.getItem(
            "active"
        ) === "true";

---

# Object у sessionStorage

`sessionStorage` не зберігає JavaScript object як object.

Наприклад:

    const user = {
        name: "John",
        age: 25
    };

Не слід робити:

    sessionStorage.setItem(
        "user",
        user
    );

Для object потрібно використовувати:

    JSON.stringify()

---

# JSON.stringify()

`JSON.stringify()` перетворює JavaScript value у JSON string.

Наприклад:

    const user = {
        name: "John",
        age: 25
    };

    const json =
        JSON.stringify(user);

Результат:

    '{"name":"John","age":25}'

Тепер:

    sessionStorage.setItem(
        "user",
        json
    );

---

# JSON.parse()

`JSON.parse()` перетворює JSON string назад у JavaScript value.

Наприклад:

    const json =
        sessionStorage.getItem(
            "user"
        );

    const user =
        JSON.parse(json);

Тепер:

    console.log(user.name);

Результат:

    John

---

# Object Workflow

Типовий workflow:

    JavaScript object
          ↓
    JSON.stringify()
          ↓
    string
          ↓
    sessionStorage
          ↓
    getItem()
          ↓
    JSON.parse()
          ↓
    JavaScript object

---

# Array у sessionStorage

Масив також потрібно серіалізувати.

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

Збереження:

    sessionStorage.setItem(
        "fruits",
        JSON.stringify(fruits)
    );

Отримання:

    const fruits =
        JSON.parse(
            sessionStorage.getItem(
                "fruits"
            )
        );

---

# Array of Objects

Наприклад:

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

    sessionStorage.setItem(
        "users",
        JSON.stringify(users)
    );

Отримання:

    const users =
        JSON.parse(
            sessionStorage.getItem(
                "users"
            )
        );

Тепер:

    users.forEach(user => {
        console.log(user.name);
    });

---

# Default Value

Часто потрібно використати default value, якщо key відсутній.

Наприклад:

    const step =
        sessionStorage.getItem(
            "step"
        ) ?? "1";

Якщо key відсутній:

    step → "1"

---

# Перевірка існування

Надійний простий спосіб:

    const value =
        sessionStorage.getItem(
            "step"
        );

    if (value !== null) {
        console.log(
            "Value exists"
        );
    }

---

# sessionStorage + Form

`sessionStorage` дуже добре підходить для тимчасового збереження form state.

Наприклад:

    const input =
        document.querySelector("#name");

    input.addEventListener(
        "input",
        () => {
            sessionStorage.setItem(
                "name",
                input.value
            );
        }
    );

При завантаженні сторінки:

    input.value =
        sessionStorage.getItem(
            "name"
        ) ?? "";

---

# Навіщо зберігати Form State

Уявімо multi-step form:

    Step 1
       ↓
    Step 2
       ↓
    Step 3
       ↓
    Submit

Можна зберігати тимчасовий state:

    sessionStorage

Наприклад:

    currentStep → "2"

    name → "John"

    email → "john@example.com"

Користувач може перейти між сторінками застосунку, а дані поточної сесії залишаться доступними.

---

# Wizard / Multi-Step Form

Наприклад:

    const formState = {
        name: "John",
        age: 25,
        city: "Kyiv"
    };

    sessionStorage.setItem(
        "formState",
        JSON.stringify(formState)
    );

Відновлення:

    const formState =
        JSON.parse(
            sessionStorage.getItem(
                "formState"
            )
        );

---

# Поточний Step

Можна зберігати:

    sessionStorage.setItem(
        "currentStep",
        "2"
    );

Відновити:

    const currentStep =
        Number(
            sessionStorage.getItem(
                "currentStep"
            )
        );

---

# sessionStorage + DOM

Наприклад:

    const savedName =
        sessionStorage.getItem(
            "name"
        );

    if (savedName) {
        input.value = savedName;
    }

Таким чином DOM можна відновити зі storage.

---

# sessionStorage + UI State

Наприклад, тимчасово зберігаємо:

    selectedTab

    sessionStorage.setItem(
        "selectedTab",
        "settings"
    );

При завантаженні:

    const selectedTab =
        sessionStorage.getItem(
            "selectedTab"
        ) ?? "home";

---

# sessionStorage + Filter

Наприклад:

    sessionStorage.setItem(
        "filter",
        "completed"
    );

Після navigation можна відновити:

    const filter =
        sessionStorage.getItem(
            "filter"
        ) ?? "all";

---

# sessionStorage + Search Query

Наприклад:

    const search =
        document.querySelector(
            "#search"
        );

    search.addEventListener(
        "input",
        () => {
            sessionStorage.setItem(
                "search",
                search.value
            );
        }
    );

При відновленні:

    search.value =
        sessionStorage.getItem(
            "search"
        ) ?? "";

---

# sessionStorage + Counter

Наприклад:

    let count =
        Number(
            sessionStorage.getItem(
                "count"
            )
        ) || 0;

    count++;

    sessionStorage.setItem(
        "count",
        count
    );

Значення буде доступним протягом відповідної page session.

---

# sessionStorage + Array

Наприклад:

    const items =
        JSON.parse(
            sessionStorage.getItem(
                "items"
            )
        ) ?? [];

    items.push("new item");

    sessionStorage.setItem(
        "items",
        JSON.stringify(items)
    );

---

# sessionStorage + Object

Наприклад:

    const settings = {
        tab: "profile",
        sort: "name",
        filter: "active"
    };

Збереження:

    sessionStorage.setItem(
        "settings",
        JSON.stringify(settings)
    );

Отримання:

    const settings =
        JSON.parse(
            sessionStorage.getItem(
                "settings"
            )
        );

---

# Storage Lifecycle

Основна модель:

    User action
         ↓
    JavaScript state
         ↓
    JSON.stringify()
         ↓
    sessionStorage.setItem()
         ↓
    Page session
         ↓
    navigation / reload
         ↓
    sessionStorage.getItem()
         ↓
    JSON.parse()
         ↓
    JavaScript state
         ↓
    UI

---

# Page Session

`sessionStorage` пов'язаний із page session.

Спрощено:

    browser tab
         ↓
    page session
         ↓
    sessionStorage

Поки відповідна page session існує, дані можуть залишатися доступними.

При завершенні page session storage очищується.

Найважливіший практичний випадок:

    закриття вкладки
         ↓
    завершення page session
         ↓
    sessionStorage більше не доступний
    для нової page session

---

# Reload

При звичайному reload сторінки:

    reload
      ↓
    sessionStorage

дані можуть залишатися доступними в межах тієї самої page session.

Наприклад:

    sessionStorage.setItem(
        "name",
        "John"
    );

Після reload:

    sessionStorage.getItem(
        "name"
    );

може повернути:

    John

Це важлива відмінність від ситуації, коли page session завершується.

---

# Navigation

Під час navigation у межах відповідної session `sessionStorage` може залишатися доступним.

Наприклад:

    /step-1
       ↓
    /step-2
       ↓
    /step-3

Це дозволяє використовувати `sessionStorage` для тимчасового state wizard.

---

# New Tab

Не слід спрощувати поведінку `sessionStorage` до:

    "кожна вкладка завжди має абсолютно незалежний storage"

Поведінка створення нової вкладки та початкового стану `sessionStorage` має browser-specific нюанси, зокрема при відкритті сторінки через browsing context із наявним opener.

Для практичної роботи головна модель:

    sessionStorage
        ↓
    page session / browsing context

а не:

    global application storage

---

# localStorage vs sessionStorage

Це одна з найважливіших тем.

| Характеристика | `localStorage` | `sessionStorage` |
|---|---|---|
| API | Web Storage | Web Storage |
| `setItem()` | ✅ | ✅ |
| `getItem()` | ✅ | ✅ |
| `removeItem()` | ✅ | ✅ |
| `clear()` | ✅ | ✅ |
| Values | strings | strings |
| JSON | потрібен для object/array | потрібен для object/array |
| Persistence | довготривале | session-based |
| Основна область | origin | origin + page session |
| Reload | зберігається | зберігається в межах session |
| Закриття tab | зазвичай зберігається | page session завершується |
| Типове використання | preferences | temporary state |

---

# Просте правило вибору

Використовуй:

    localStorage

коли дані повинні пережити закриття браузера / завершення поточної session.

Наприклад:

    theme
    language
    preferences

Використовуй:

    sessionStorage

коли дані потрібні лише в межах поточної page session.

Наприклад:

    multi-step form
    current step
    temporary filters
    temporary UI state

---

# sessionStorage vs Cookies

`sessionStorage` і cookies — різні механізми.

`sessionStorage`:

    browser JavaScript API
    client-side storage
    values accessed through JavaScript
    не надсилається автоматично з кожним HTTP request

Cookies:

    browser storage
    HTTP mechanism
    можуть автоматично надсилатися серверу
    мають:
        Secure
        HttpOnly
        SameSite
        Max-Age
        Expires

Тому вони використовуються для різних задач.

---

# sessionStorage vs Database

`sessionStorage`:

    Browser
       ↓
    temporary client-side state

Database:

    Backend
       ↓
    persistent application data

Наприклад:

    sessionStorage
        currentStep = 2

це локальний стан поточної session.

А:

    PostgreSQL
        users
        courses
        lessons

це серверні application data.

---

# sessionStorage не є Backend Storage

Не слід використовувати `sessionStorage` для даних, які повинні бути:

    shared between users
    shared between devices
    controlled by server
    stored permanently
    queried relationally

Для цього потрібні:

    backend
    database

---

# Origin

`sessionStorage` прив'язаний до origin.

Origin включає:

    protocol
    host
    port

Наприклад:

    https://example.com

та:

    http://example.com

є різними origins.

Так само:

    https://example.com

та:

    https://www.example.com

є різними origins.

---

# Same-Origin Policy

Сторінка не може просто так отримати `sessionStorage` іншого origin.

Наприклад:

    https://site-a.com

не може напряму прочитати:

    https://site-b.com

Це частина browser security model.

---

# storage event

Для Web Storage існує:

    storage

event.

Наприклад:

    window.addEventListener(
        "storage",
        event => {
            console.log(event);
        }
    );

Event може містити:

    event.key
    event.oldValue
    event.newValue
    event.storageArea
    event.url

---

# storage event та sessionStorage

`storage` event має важливу особливість.

Зміни `localStorage` можуть бути доступні для синхронізації між documents одного origin.

Для `sessionStorage` scope значно вужчий, оскільки storage прив'язаний до page session / browsing context.

Тому не слід розглядати `sessionStorage` як загальний механізм синхронізації між усіма вкладками.

---

# DevTools

`sessionStorage` можна переглядати через DevTools.

У Chromium-based browsers зазвичай:

    DevTools
        ↓
    Application
        ↓
    Storage
        ↓
    Session Storage

Там можна побачити:

    Key
    Value

---

# Debugging

Наприклад:

    console.log(sessionStorage);

Або:

    console.log(
        sessionStorage.getItem(
            "currentStep"
        )
    );

Також можна очистити:

    sessionStorage.clear();

---

# Storage Helper

Для невеликого застосунку можна створити helper.

    const session = {
        set(key, value) {
            sessionStorage.setItem(
                key,
                JSON.stringify(value)
            );
        },

        get(key) {
            const value =
                sessionStorage.getItem(key);

            return value
                ? JSON.parse(value)
                : null;
        },

        remove(key) {
            sessionStorage.removeItem(key);
        },

        clear() {
            sessionStorage.clear();
        }
    };

Використання:

    session.set(
        "form",
        {
            name: "John",
            age: 25
        }
    );

Отримання:

    const form =
        session.get("form");

---

# Безпечніше читання JSON

`JSON.parse()` може викинути error, якщо storage містить invalid JSON.

Наприклад:

    const data =
        sessionStorage.getItem(
            "user"
        );

    try {
        const user =
            JSON.parse(data);

        console.log(user);
    } catch {
        console.log(
            "Invalid stored data"
        );
    }

---

# Helper з try...catch

Для production-коду можна зробити:

    function getSessionData(key) {
        const data =
            sessionStorage.getItem(key);

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

# Storage Error Handling

Storage operations можуть мати помилки через:

    browser restrictions
    privacy settings
    storage policies
    quota limitations
    security restrictions

Тому важливі операції можна обгорнути в:

    try...catch

Наприклад:

    function saveData(key, value) {
        try {
            sessionStorage.setItem(
                key,
                JSON.stringify(value)
            );
        } catch (error) {
            console.error(
                "Failed to save session data",
                error
            );
        }
    }

---

# sessionStorage і Security

`sessionStorage` доступний JavaScript-коду сторінки.

Тому не потрібно сприймати його як secure vault.

Не слід бездумно зберігати:

    passwords
    secrets
    sensitive credentials

Якщо сторінка має XSS vulnerability, malicious JavaScript може потенційно отримати доступ до доступних storage values.

---

# sessionStorage і Authentication

Не слід робити висновок:

    sessionStorage
        ↓
    secure authentication storage

Це неправильна модель.

Authentication architecture залежить від:

    XSS risk
    CSRF
    token lifetime
    cookie configuration
    server architecture
    threat model

Для authentication потрібно окремо вивчати:

    cookies
    HttpOnly
    Secure
    SameSite
    session management
    token handling

---

# sessionStorage і React

У React `sessionStorage` використовується у browser environment.

Наприклад:

    import { useEffect, useState } from "react";

    function Form() {
        const [name, setName] =
            useState("");

        useEffect(() => {
            const savedName =
                sessionStorage.getItem(
                    "name"
                );

            if (savedName) {
                setName(savedName);
            }
        }, []);

        return null;
    }

---

# sessionStorage і Next.js

У Next.js потрібно пам'ятати:

    sessionStorage

це browser API.

Server-side code не має доступу до browser storage.

Тому browser-only logic потрібно виконувати на клієнті.

Наприклад:

    "use client";

    import { useEffect, useState } from "react";

    export default function Form() {
        const [name, setName] =
            useState("");

        useEffect(() => {
            const savedName =
                sessionStorage.getItem(
                    "name"
                );

            if (savedName) {
                setName(savedName);
            }
        }, []);

        return (
            <input
                value={name}
                onChange={event => {
                    setName(event.target.value);

                    sessionStorage.setItem(
                        "name",
                        event.target.value
                    );
                }}
            />
        );
    }

---

# Browser vs Server

Важлива модель:

    Browser
        ↓
    sessionStorage
        ↓
    available

    Node.js
        ↓
    sessionStorage
        ↓
    not available by default

Тому client-side storage не слід змішувати із server-side runtime.

---

# Практичний приклад — Multi-Step Form

Уявімо:

    Step 1
        ↓
    Step 2
        ↓
    Step 3

Можемо зберігати:

    const formData = {
        name: "John",
        age: 25,
        city: "Kyiv"
    };

    sessionStorage.setItem(
        "formData",
        JSON.stringify(formData)
    );

---

# Відновлення Form State

    const savedData =
        sessionStorage.getItem(
            "formData"
        );

    const formData =
        savedData
            ? JSON.parse(savedData)
            : {
                name: "",
                age: "",
                city: ""
            };

---

# Поточний Step

    const currentStep =
        Number(
            sessionStorage.getItem(
                "currentStep"
            )
        ) || 1;

При переході:

    sessionStorage.setItem(
        "currentStep",
        2
    );

---

# Практичний приклад — Temporary Search

Користувач вводить:

    JavaScript loops

Можна зберегти:

    sessionStorage.setItem(
        "searchQuery",
        "JavaScript loops"
    );

Після navigation:

    const query =
        sessionStorage.getItem(
            "searchQuery"
        );

---

# Практичний приклад — Selected Tab

    sessionStorage.setItem(
        "activeTab",
        "profile"
    );

Після повернення:

    const activeTab =
        sessionStorage.getItem(
            "activeTab"
        ) ?? "home";

---

# Практичний приклад — Temporary Filter

    const filter = {
        status: "completed",
        sort: "date"
    };

    sessionStorage.setItem(
        "filter",
        JSON.stringify(filter)
    );

Отримання:

    const filter =
        JSON.parse(
            sessionStorage.getItem(
                "filter"
            )
        );

---

# Практичний приклад — Form Draft

    const draft = {
        title: "My lesson",
        description: "JavaScript practice"
    };

    sessionStorage.setItem(
        "draft",
        JSON.stringify(draft)
    );

При поверненні до сторінки:

    const draft =
        JSON.parse(
            sessionStorage.getItem(
                "draft"
            )
        );

Це простий client-side draft.

---

# sessionStorage vs In-Memory State

Не всі тимчасові дані потрібно зберігати.

Наприклад:

    let count = 0;

це in-memory state.

Після reload:

    count → 0

А:

    sessionStorage.setItem(
        "count",
        "10"
    );

дозволяє відновити значення після reload у межах page session.

Тобто:

    memory
        → живе лише під час виконання page

    sessionStorage
        → може пережити reload у межах session

---

# sessionStorage vs URL

Іноді тимчасовий state можна передавати через URL:

    ?page=2
    ?filter=completed

URL має переваги:

    shareable
    bookmarkable
    visible

`sessionStorage`:

    не видно в URL
    не призначений для sharing
    прив'язаний до session

Вибір залежить від задачі.

---

# sessionStorage vs Application State

У frontend application можуть існувати:

    component state
    global state
    URL state
    sessionStorage
    localStorage
    server state

Не потрібно автоматично зберігати все у `sessionStorage`.

Спочатку потрібно визначити:

    де повинен жити цей state?

---

# Коли НЕ потрібно використовувати sessionStorage

Не потрібно використовувати `sessionStorage`, якщо дані:

- повинні зберігатися роками;
- повинні бути доступними на іншому пристрої;
- повинні бути доступними іншому користувачу;
- повинні контролюватися сервером;
- є критично важливими application data;
- потребують складного querying;
- потребують relational data model.

Для таких задач потрібні:

    backend
    database

---

# Типові помилки

❌ Плутати `sessionStorage` з `localStorage`.

    localStorage
        → persistent

    sessionStorage
        → session-based

---

❌ Очікувати, що number залишиться number.

    sessionStorage.setItem(
        "count",
        10
    );

Отримаємо:

    "10"

---

❌ Зберігати object без JSON.

    sessionStorage.setItem(
        "user",
        user
    );

Правильно:

    sessionStorage.setItem(
        "user",
        JSON.stringify(user)
    );

---

❌ Забувати `JSON.parse()`.

    const user =
        sessionStorage.getItem("user");

Це string.

Правильно:

    const user =
        JSON.parse(
            sessionStorage.getItem(
                "user"
            )
        );

---

❌ Використовувати `clear()` для одного key.

Замість:

    sessionStorage.clear();

потрібно:

    sessionStorage.removeItem(
        "theme"
    );

---

❌ Вважати `sessionStorage` database.

Це browser storage, а не relational database.

---

❌ Зберігати passwords або secrets.

`sessionStorage` доступний JavaScript-коду сторінки.

---

❌ Очікувати, що `sessionStorage` доступний у Node.js.

Це browser API.

---

❌ Використовувати `sessionStorage` безпосередньо в SSR.

У server environment browser storage недоступний.

---

❌ Зберігати весь application state без необхідності.

Спочатку потрібно визначити lifetime та ownership state.

---

❌ Припускати, що `sessionStorage` — це просто "storage на одну вкладку".

Правильніше мислити через:

    origin
        +
    page session / browsing context

---

# Питання зі співбесіди

Що таке `sessionStorage`?

Що таке Web Storage API?

Яка різниця між `sessionStorage` та `localStorage`?

Які методи має `sessionStorage`?

Що робить `setItem()`?

Що робить `getItem()`?

Що робить `removeItem()`?

Що робить `clear()`?

Що показує `sessionStorage.length`?

Для чого потрібен `key()`?

У якому типі зберігаються values?

Що повертає `getItem()`, якщо key не існує?

Чи зберігається `sessionStorage` після reload?

Що відбувається із `sessionStorage` після закриття вкладки?

Чи має кожна вкладка свій `sessionStorage`?

Що таке page session?

Що таке origin?

Як origin впливає на `sessionStorage`?

Що таке same-origin policy?

Як зберігати object у `sessionStorage`?

Як зберігати array?

Для чого потрібен `JSON.stringify()`?

Для чого потрібен `JSON.parse()`?

Чому `Boolean("false")` повертає `true`?

Чим `sessionStorage` відрізняється від cookies?

Чим `sessionStorage` відрізняється від database?

Чи доступний `sessionStorage` у Node.js?

Чи доступний `sessionStorage` під час SSR?

Чи можна використовувати `sessionStorage` для authentication?

Які security risks має `sessionStorage`?

Що таке `storage` event?

Чи можна використовувати `sessionStorage` як механізм синхронізації між усіма вкладками?

Для яких задач добре підходить `sessionStorage`?

Для яких задач краще `localStorage`?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке Web Storage API.

Що таке `sessionStorage`.

Розуміти:

    key → value

Знати:

    setItem()
    getItem()
    removeItem()
    clear()

Знати:

    length
    key()

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

Розуміти page session.

Розуміти різницю:

    localStorage
    sessionStorage

---

## 🔵 Junior

Розуміти:

    sessionStorage
    localStorage

Розуміти origin.

Розуміти same-origin policy.

Вміти працювати з DevTools.

Вміти зберігати:

    form state
    current step
    temporary settings
    filters
    selected tabs
    search state
    drafts

Вміти створювати storage helpers.

Розуміти:

    JSON serialization
    JSON deserialization

Розуміти поведінку після:

    reload
    navigation
    closing tab

Розуміти `storage` event.

Розуміти базові security implications.

---

## 🟠 Middle

Проектувати client-side persistence.

Створювати abstraction:

    sessionStorage
        ↓
    storage service

Обробляти:

    JSON.parse() errors
    storage errors
    quota errors

Розуміти:

    page session
    browsing context
    origin

Працювати з:

    sessionStorage
    React
    Next.js

Розуміти SSR limitations.

Розрізняти:

    in-memory state
    URL state
    sessionStorage
    localStorage
    cookies
    IndexedDB
    server state

Вибирати правильне місце для state.

---

## 🔴 Senior

Глибоке розуміння:

    Web Storage specification
    page sessions
    browsing contexts
    origin model
    storage partitioning
    browser privacy policies
    storage quotas
    eviction

Розуміння security:

    XSS
    CSRF
    cookies
    HttpOnly
    Secure
    SameSite
    authentication architecture

Проектування:

    client-side persistence
    state ownership
    state lifetime
    storage abstraction
    cross-context communication

Розуміння trade-offs між:

    memory
    sessionStorage
    localStorage
    cookies
    IndexedDB
    Cache API
    backend storage

Проектування temporary state architecture.

Data validation.

Stored data versioning.

Migration stored data.

Handling corrupted state.

Graceful fallback when browser storage is unavailable.

---

# Міні-шпаргалка

## sessionStorage

    sessionStorage

Browser storage для даних поточної page session.

---

## Set

    sessionStorage.setItem(
        "name",
        "John"
    );

---

## Get

    const name =
        sessionStorage.getItem(
            "name"
        );

---

## Remove

    sessionStorage.removeItem(
        "name"
    );

---

## Clear

    sessionStorage.clear();

Видаляє всі записи відповідного `sessionStorage`.

---

## Length

    sessionStorage.length

Кількість stored keys.

---

## Key

    sessionStorage.key(0)

Отримати key за index.

---

## Number

    sessionStorage.setItem(
        "age",
        25
    );

    const age =
        Number(
            sessionStorage.getItem(
                "age"
            )
        );

---

## Boolean

    sessionStorage.setItem(
        "active",
        true
    );

    const active =
        sessionStorage.getItem(
            "active"
        ) === "true";

---

## Object

    const user = {
        name: "John",
        age: 25
    };

    sessionStorage.setItem(
        "user",
        JSON.stringify(user)
    );

---

## Get Object

    const user =
        JSON.parse(
            sessionStorage.getItem(
                "user"
            )
        );

---

## Array

    const items = [
        "one",
        "two",
        "three"
    ];

    sessionStorage.setItem(
        "items",
        JSON.stringify(items)
    );

---

## Get Array

    const items =
        JSON.parse(
            sessionStorage.getItem(
                "items"
            )
        );

---

## Default

    const step =
        sessionStorage.getItem(
            "step"
        ) ?? "1";

---

## Check Exists

    const value =
        sessionStorage.getItem(
            "step"
        );

    if (value !== null) {
        console.log(value);
    }

---

## Object Workflow

    Object
       ↓
    JSON.stringify()
       ↓
    String
       ↓
    sessionStorage
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
    sessionStorage
       ↓
    getItem()
       ↓
    JSON.parse()
       ↓
    Array

---

## localStorage

    localStorage
        → persistent client-side storage

---

## sessionStorage

    sessionStorage
        → page-session client-side storage

---

## Main Difference

    localStorage
        → survives browser sessions

    sessionStorage
        → tied to page session

---

## Reload

    reload
       ↓
    same page session
       ↓
    sessionStorage can remain

---

## Close Tab

    close tab
       ↓
    page session ends
       ↓
    sessionStorage is discarded

---

## Security

    sessionStorage
        ↓
    accessible to JavaScript

Тому не слід бездумно зберігати:

    passwords
    secrets
    sensitive credentials

---

## Browser

    sessionStorage
        → Browser API

Не:

    Node.js API

---

## Server

    sessionStorage
        → temporary client-side state

    PostgreSQL
        → server-side persistent data

---

# Головне:

• `sessionStorage` — Web Storage API для збереження client-side даних у межах page session.

• Дані зберігаються у форматі:

    key → value

• Values зберігаються як strings.

• Основні методи:

    setItem()
    getItem()
    removeItem()
    clear()

• `setItem()` створює або оновлює key.

• `getItem()` повертає value або `null`.

• `removeItem()` видаляє один key.

• `clear()` видаляє всі записи відповідного `sessionStorage`.

• `sessionStorage.length` показує кількість keys.

• `sessionStorage.key(index)` повертає key за index.

• Для numbers потрібно пам'ятати про перетворення:

    string → number

через:

    Number()

• Для booleans потрібно явно виконувати перетворення:

    value === "true"

• Для object та array використовується:

    JSON.stringify()

• Для відновлення:

    JSON.parse()

• Основна модель:

    JS data
       ↓
    JSON.stringify()
       ↓
    sessionStorage
       ↓
    getItem()
       ↓
    JSON.parse()
       ↓
    JS data

• `sessionStorage` може пережити reload сторінки в межах тієї самої page session.

• Завершення page session, наприклад закриття вкладки, призводить до втрати відповідних session data.

• `sessionStorage` потрібно розуміти не просто як "storage однієї вкладки", а як storage, пов'язаний з origin та page session / browsing context.

• `sessionStorage` прив'язаний до origin.

• Різні origins не мають спільного storage.

• `sessionStorage` — client-side storage.

• `sessionStorage` не є database.

• `sessionStorage` не замінює backend.

• `sessionStorage` не замінює PostgreSQL.

• Типові задачі:

    multi-step forms
    temporary form data
    current step
    temporary filters
    selected tabs
    search state
    temporary UI state
    short-lived drafts

• Якщо дані повинні переживати browser sessions, частіше потрібен:

    localStorage

• Якщо дані повинні бути доступні серверу та іншим пристроям, потрібні:

    backend
    database

• Якщо дані повинні бути shareable через URL, іноді краще використовувати:

    URL parameters

• Якщо state потрібен лише під час поточного виконання JavaScript, достатньо:

    in-memory state

• `sessionStorage` доступний JavaScript-коду, тому потрібно враховувати security risks.

• Не слід бездумно зберігати:

    passwords
    secrets
    sensitive credentials

• У Node.js `sessionStorage` не існує як стандартний browser API.

• У SSR-середовищах `sessionStorage` недоступний під час server rendering.

• У React / Next.js browser-only storage logic потрібно виконувати на клієнті.

• Найважливіше питання перед використанням `sessionStorage`:

    "Ці дані потрібні тільки протягом
     поточної page session?"

• Якщо відповідь "так", `sessionStorage` може бути природним кандидатом.

• Якщо дані повинні жити довше:

    localStorage

• Якщо дані повинні жити на сервері:

    backend + database

• Основна модель:

    In-memory state
          ↓
    sessionStorage
          ↓
    localStorage
          ↓
    backend
          ↓
    database

Це різні рівні зберігання з різним lifetime, scope та призначенням.