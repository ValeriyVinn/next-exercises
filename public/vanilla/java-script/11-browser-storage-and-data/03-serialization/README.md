# 04. Serialization

## 📌 Визначення

**Serialization (серіалізація)** — це процес перетворення даних зі структурованого вигляду у формат, який можна:

- зберегти;
- передати;
- відновити пізніше;
- відправити через мережу;
- записати у файл;
- помістити в storage.

**Deserialization (десеріалізація)** — зворотний процес: відновлення даних із серіалізованого представлення.

Головна схема:

    JavaScript data
          ↓
    Serialization
          ↓
    Serialized data
          ↓
    Deserialization
          ↓
    JavaScript data

У JavaScript найчастіше для serialization використовують JSON:

    JSON.stringify()
          ↓
    Object → JSON string

    JSON.parse()
          ↓
    JSON string → JavaScript value

---

# 1. Ключові поняття

| Поняття | Значення |
|---|---|
| Serialization | перетворення даних у формат для збереження/передачі |
| Deserialization | відновлення даних із серіалізованого представлення |
| JSON | один із найпоширеніших форматів serialization |
| `JSON.stringify()` | серіалізація JavaScript value у JSON string |
| `JSON.parse()` | десеріалізація JSON string у JavaScript value |
| Structured Clone | механізм клонування/передачі складніших JS-значень |
| Encoding | представлення даних у певному форматі |
| Transport format | формат передачі даних |
| Persistence | збереження даних |

---

# 2. Для чого потрібна serialization

JavaScript object існує як структура даних у пам'яті:

    const user = {
      name: "Anna",
      age: 30
    };

Але коли потрібно:

- записати object у файл;
- передати його через HTTP;
- зберегти у `localStorage`;
- зберегти у `sessionStorage`;
- передати між різними системами;

потрібне представлення, яке може бути передане або збережене.

Наприклад:

    const user = {
      name: "Anna",
      age: 30
    };

    const serializedUser = JSON.stringify(user);

Тепер:

    typeof serializedUser
    // "string"

---

# 3. Serialization vs Deserialization

## Serialization

Перетворення:

    JavaScript value
          ↓
    serialized representation

Наприклад:

    const user = {
      name: "Anna",
      age: 30
    };

    const json = JSON.stringify(user);

---

## Deserialization

Відновлення:

    serialized representation
          ↓
    JavaScript value

Наприклад:

    const user = JSON.parse(json);

---

# 4. Найпростіша схема

    const user = {
      name: "Anna",
      age: 30
    };

    // Serialization

    const serialized = JSON.stringify(user);


    // Deserialization

    const restored = JSON.parse(serialized);

    console.log(restored);

Результат:

    {
      name: "Anna",
      age: 30
    }

---

# 5. Serialization не означає JSON

Важливо:

> **Serialization — це процес, а JSON — лише один із форматів, який можна використати для цього процесу.**

Можна серіалізувати дані в:

- JSON;
- текст;
- CSV;
- XML;
- FormData;
- URL query parameters;
- бінарні формати;
- інші спеціалізовані формати.

У JavaScript веброзробці JSON є одним із найпоширеніших варіантів.

---

# 6. JSON як serialization format

Наприклад:

    const user = {
      id: 1,
      name: "Anna",
      active: true
    };

Серіалізація:

    const json = JSON.stringify(user);

Результат:

    {"id":1,"name":"Anna","active":true}

Це вже текстове представлення даних.

---

# 7. Чому object не можна просто передати всюди

JavaScript object — це структура в пам'яті конкретного runtime.

Наприклад:

    const user = {
      name: "Anna"
    };

Якщо потрібно передати цей object через HTTP, storage або файл, потрібно визначити його представлення.

Наприклад:

    {
      "name": "Anna"
    }

Саме тут виникає serialization.

---

# 8. Serialization у browser storage

`localStorage` і `sessionStorage` зберігають strings.

Тому:

    const user = {
      name: "Anna",
      age: 30
    };

необхідно серіалізувати:

    const serializedUser = JSON.stringify(user);

    localStorage.setItem(
      "user",
      serializedUser
    );

Потім:

    const serializedUser =
      localStorage.getItem("user");

    const user = JSON.parse(serializedUser);

Схема:

    Object
      ↓
    JSON.stringify()
      ↓
    String
      ↓
    localStorage
      ↓
    String
      ↓
    JSON.parse()
      ↓
    Object

---

# 9. Serialization у HTTP

Frontend:

    const user = {
      name: "Anna",
      age: 30
    };

Серіалізація:

    const body = JSON.stringify(user);

Відправлення:

    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body
    });

Схема:

    JavaScript Object
          ↓
    JSON.stringify()
          ↓
    JSON string
          ↓
    HTTP request
          ↓
    Backend

---

# 10. Deserialization на backend

Backend отримує serialized data.

У Node.js / Express це може бути автоматично перетворено middleware у JavaScript object.

Наприклад:

    app.use(express.json());

    app.post("/users", (req, res) => {
      console.log(req.body);
    });

Frontend відправив:

    {
      "name": "Anna",
      "age": 30
    }

Backend працює вже з JavaScript object:

    req.body.name

---

# 11. Serialization response

Backend також може серіалізувати дані.

Наприклад:

    const user = {
      id: 1,
      name: "Anna"
    };

В Express:

    res.json(user);

Фактично відбувається перетворення даних у JSON-представлення HTTP response.

Схема:

    Database
        ↓
    Backend data
        ↓
    Serialization
        ↓
    JSON
        ↓
    HTTP response
        ↓
    Frontend

---

# 12. Deserialization через response.json()

Frontend:

    const response = await fetch("/api/users");

    const user = await response.json();

`response.json()` читає response body та перетворює JSON у JavaScript value.

Тобто:

    JSON response
          ↓
    response.json()
          ↓
    JavaScript object

---

# 13. Serialization і типи даних

Не всі JavaScript типи однаково добре серіалізуються в JSON.

Прості типи:

    string
    number
    boolean
    null

підтримуються добре.

Наприклад:

    const data = {
      name: "Anna",
      age: 30,
      active: true,
      email: null
    };

    const json = JSON.stringify(data);

---

# 14. undefined

`undefined` не має прямого представлення у стандартному JSON.

Наприклад:

    const user = {
      name: "Anna",
      age: undefined
    };

    const json = JSON.stringify(user);

Результат:

    {"name":"Anna"}

Властивість `age` буде пропущена.

---

# 15. undefined у масиві

Для масиву поведінка відрізняється.

    const data = [
      "Anna",
      undefined,
      "John"
    ];

    const json = JSON.stringify(data);

Результат:

    ["Anna",null,"John"]

Тобто:

    undefined
        ↓
    null

у цьому випадку.

---

# 16. Function

Function не серіалізується як JSON-значення.

    const user = {
      name: "Anna",
      sayHello() {
        console.log("Hello");
      }
    };

    const json = JSON.stringify(user);

Результат:

    {"name":"Anna"}

Функція буде пропущена.

---

# 17. Symbol

`Symbol` також не має стандартного JSON-представлення.

Наприклад:

    const user = {
      name: "Anna",
      id: Symbol("id")
    };

При serialization така властивість не буде представлена у стандартному JSON.

---

# 18. BigInt

`BigInt` не підтримується стандартним `JSON.stringify()`.

Наприклад:

    const data = {
      value: 123n
    };

    JSON.stringify(data);

Це призведе до помилки.

Якщо потрібно передавати таке значення через JSON, можна свідомо представити його як string:

    const data = {
      value: "12345678901234567890"
    };

---

# 19. Date

`Date` є особливо важливим прикладом.

    const data = {
      createdAt: new Date()
    };

    const json = JSON.stringify(data);

Дата буде представлена як string.

Наприклад:

    {
      "createdAt": "2026-09-24T10:30:00.000Z"
    }

Після:

    const restored = JSON.parse(json);

маємо:

    typeof restored.createdAt
    // "string"

А не:

    Date

---

# 20. Відновлення Date

Якщо потрібно отримати назад `Date`:

    const restored = JSON.parse(json);

    restored.createdAt = new Date(
      restored.createdAt
    );

Тепер:

    restored.createdAt instanceof Date
    // true

Це називається **custom deserialization logic**.

---

# 21. Map

`Map` не має стандартного JSON-представлення.

Наприклад:

    const map = new Map([
      ["name", "Anna"],
      ["age", 30]
    ]);

Простий:

    JSON.stringify(map);

не збереже структуру `Map` так, як очікується.

Якщо потрібно серіалізувати `Map`, потрібно спочатку перетворити його у JSON-сумісну структуру.

Наприклад:

    const data = [...map];

    const json = JSON.stringify(data);

Відновлення:

    const entries = JSON.parse(json);

    const restoredMap = new Map(entries);

---

# 22. Set

Аналогічна ситуація з `Set`.

    const skills = new Set([
      "HTML",
      "CSS",
      "JavaScript"
    ]);

Можна перетворити його в array:

    const data = [...skills];

    const json = JSON.stringify(data);

Відновлення:

    const restoredData = JSON.parse(json);

    const restoredSkills = new Set(restoredData);

---

# 23. Cyclic references

JSON не може напряму серіалізувати циклічні посилання.

Наприклад:

    const user = {
      name: "Anna"
    };

    user.self = user;

Тут:

    user.self === user
    // true

Спроба:

    JSON.stringify(user);

призведе до помилки.

Причина:

    user
      ↓
    self
      ↓
    user
      ↓
    self
      ↓
    ...

JSON не може представити таку циклічну структуру стандартним способом.

---

# 24. Serialization і deep clone

Іноді використовують:

    const copy = JSON.parse(
      JSON.stringify(original)
    );

Це може працювати для простих JSON-сумісних даних.

Наприклад:

    const original = {
      name: "Anna",
      address: {
        city: "Vinnytsia"
      }
    };

    const copy = JSON.parse(
      JSON.stringify(original)
    );

    copy.address.city = "Kyiv";

    console.log(original.address.city);
    // "Vinnytsia"

Але це не універсальний спосіб deep clone.

---

# 25. Чому JSON не є універсальним deep clone

При JSON serialization можуть втрачатися або змінюватися:

- `undefined`;
- `Function`;
- `Symbol`;
- `Date`;
- `Map`;
- `Set`;
- `BigInt`;
- special object types;
- cyclic references.

Тому:

    JSON.parse(JSON.stringify(value))

не слід сприймати як універсальну функцію deep clone.

---

# 26. structuredClone()

Для клонування багатьох JavaScript-значень існує:

    structuredClone(value);

Наприклад:

    const original = {
      name: "Anna",
      date: new Date()
    };

    const copy = structuredClone(original);

`structuredClone()` підтримує значно більше типів, ніж JSON-підхід.

Але важливо:

> `structuredClone()` — це механізм structured cloning, а не JSON serialization.

Тобто він не створює JSON string.

---

# 27. Serialization vs structuredClone()

| JSON serialization | `structuredClone()` |
|---|---|
| створює serialized representation | створює копію |
| результат — JSON string | результат — JS value |
| зручний для API | зручний для deep clone |
| зручний для storage | не є storage format |
| має обмеження JSON | підтримує більше JS-типів |
| `JSON.stringify()` | `structuredClone()` |
| `JSON.parse()` | не потрібен для clone |

---

# 28. Replacer

`JSON.stringify()` має другий параметр:

    JSON.stringify(value, replacer)

`replacer` дозволяє контролювати serialization.

Наприклад:

    const user = {
      name: "Anna",
      age: 30,
      password: "secret"
    };

    const json = JSON.stringify(
      user,
      ["name", "age"]
    );

Результат:

    {
      "name": "Anna",
      "age": 30
    }

---

# 29. Replacer function

`replacer` також може бути функцією.

    const user = {
      name: "Anna",
      age: 30
    };

    const json = JSON.stringify(
      user,
      (key, value) => {
        if (key === "age") {
          return undefined;
        }

        return value;
      }
    );

Результат:

    {"name":"Anna"}

Це дозволяє змінювати процес serialization.

---

# 30. Важливе зауваження про sensitive data

Replacer можна використати для виключення полів:

    const user = {
      name: "Anna",
      password: "secret"
    };

    const json = JSON.stringify(
      user,
      ["name"]
    );

Але:

> **Serialization не є механізмом захисту даних.**

Якщо sensitive data вже потрапила в JavaScript object, її потрібно правильно захищати на рівні архітектури.

Не слід покладатися лише на:

    JSON.stringify()

для security.

---

# 31. Reviver

`JSON.parse()` також має другий параметр — `reviver`.

Синтаксис:

    JSON.parse(json, reviver);

Він дозволяє змінювати значення під час deserialization.

Наприклад, відновити Date:

    const json = `
      {
        "name": "Anna",
        "createdAt": "2026-09-24T10:30:00.000Z"
      }
    `;

    const user = JSON.parse(
      json,
      (key, value) => {
        if (key === "createdAt") {
          return new Date(value);
        }

        return value;
      }
    );

Тепер:

    user.createdAt instanceof Date
    // true

---

# 32. Replacer vs Reviver

| Механізм | Метод | Напрямок |
|---|---|---|
| Replacer | `JSON.stringify()` | під час serialization |
| Reviver | `JSON.parse()` | під час deserialization |

Схема:

    Object
      ↓
    stringify(replacer)
      ↓
    JSON
      ↓
    parse(reviver)
      ↓
    Object

---

# 33. Форматування serialization

Третій параметр `JSON.stringify()`:

    JSON.stringify(
      value,
      replacer,
      space
    );

Наприклад:

    const json = JSON.stringify(
      user,
      null,
      2
    );

Результат буде читабельним:

    {
      "name": "Anna",
      "age": 30
    }

Це називається pretty-printed JSON.

---

# 34. Serialization і persistence

Не потрібно плутати:

**Serialization**

    Object
      ↓
    JSON string

**Persistence**

    JSON string
      ↓
    Storage / File / Database

Наприклад:

    const json = JSON.stringify(user);

Серіалізація вже виконана.

А:

    localStorage.setItem("user", json);

це вже збереження.

Тобто:

    Serialization ≠ Storage

---

# 35. Serialization і transport

Також не потрібно плутати:

    Serialization
        ↓
    підготовка даних

    Transport
        ↓
    передача даних

Наприклад:

    Object
      ↓
    JSON.stringify()
      ↓
    JSON string
      ↓
    HTTP
      ↓
    Backend

`JSON.stringify()` виконує serialization.

`HTTP` забезпечує transport.

---

# 36. Serialization і encoding

Ці поняття також різні.

**Serialization** відповідає на питання:

> Як представити структуру даних?

**Encoding** відповідає на питання:

> Як представити ці дані у певному кодуванні/форматі для передачі?

Наприклад:

    JavaScript object
          ↓
    JSON serialization
          ↓
    UTF-8 encoded bytes
          ↓
    Network

У звичайній frontend-розробці ці рівні часто приховані браузером.

---

# 37. Serialization у Full Stack

Типовий Full Stack flow:

    User
      ↓
    Frontend
      ↓
    JavaScript Object
      ↓
    Serialization
      ↓
    JSON
      ↓
    HTTP
      ↓
    Backend
      ↓
    Deserialization
      ↓
    JavaScript Object
      ↓
    Business Logic
      ↓
    Database

Назад:

    Database
      ↓
    Backend
      ↓
    JavaScript Object
      ↓
    Serialization
      ↓
    JSON
      ↓
    HTTP
      ↓
    Frontend
      ↓
    Deserialization
      ↓
    JavaScript Object

---

# 38. Serialization і PostgreSQL

У твоєму Full Stack навчанні корисно бачити різницю між рівнями:

    JavaScript Object
          ↓
    JSON
          ↓
    HTTP
          ↓
    Node.js / NestJS
          ↓
    SQL
          ↓
    PostgreSQL

JSON не є заміною SQL.

Наприклад:

    const user = {
      name: "Anna",
      age: 30
    };

JSON може передати дані:

    {
      "name": "Anna",
      "age": 30
    }

А backend може виконати SQL:

    INSERT INTO users (name, age)
    VALUES ($1, $2);

Тобто JSON і SQL виконують різні ролі.

---

# 39. Serialization у REST API

REST API дуже часто використовує JSON як representation.

Request:

    POST /users

    {
      "name": "Anna",
      "age": 30
    }

Response:

    {
      "id": 15,
      "name": "Anna",
      "age": 30
    }

Тут JSON виступає форматом представлення даних між frontend і backend.

---

# 40. Serialization і API contract

Якщо frontend очікує:

    {
      "id": 1,
      "name": "Anna"
    }

а backend раптом починає повертати:

    {
      "user_id": 1,
      "full_name": "Anna"
    }

структура API змінилася.

Тому serialization пов'язана з поняттям:

> **API contract**

Contract визначає:

- назви полів;
- типи;
- структуру;
- обов'язковість;
- формат дат;
- формат помилок.

---

# 41. Serialization і validation

Serialization відповідає:

> Як перетворити дані у формат передачі?

Validation відповідає:

> Чи відповідають дані очікуваній структурі та правилам?

Наприклад:

    {
      "age": "hello"
    }

Це може бути валідний JSON.

Але application може очікувати:

    {
      "age": 56
    }

Отже:

    Valid JSON
        ≠
    Valid application data

---

# 42. Serialization і TypeScript

TypeScript описує очікувану структуру:

    interface User {
      id: number;
      name: string;
      age: number;
    }

А JSON:

    {
      "id": 1,
      "name": "Anna",
      "age": 30
    }

Але сам факт наявності TypeScript interface не гарантує, що runtime data дійсно відповідає цьому interface.

Наприклад:

    const user: User = JSON.parse(json);

TypeScript може прийняти це на рівні типів, але реальні runtime data можуть бути неправильними.

Тому в реальних застосунках часто потрібна runtime validation.

---

# 43. Serialization і runtime validation

Типовий production flow:

    External data
        ↓
    Deserialization
        ↓
    Validation
        ↓
    Business logic

Наприклад:

    HTTP JSON
        ↓
    JavaScript object
        ↓
    Validate
        ↓
    Use data

Це важливо для:

- API;
- user input;
- external services;
- database data;
- webhook;
- файлів.

---

# 44. Serialization у localStorage

Практичний приклад:

    const settings = {
      theme: "dark",
      language: "uk",
      fontSize: 18
    };

    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );

Відновлення:

    const json = localStorage.getItem("settings");

    const settings = json
      ? JSON.parse(json)
      : null;

Схема:

    JavaScript object
          ↓
    JSON.stringify()
          ↓
    string
          ↓
    localStorage
          ↓
    string
          ↓
    JSON.parse()
          ↓
    JavaScript object

---

# 45. Serialization у sessionStorage

Аналогічно:

    const formData = {
      name: "Valeriy",
      email: "example@email.com"
    };

    sessionStorage.setItem(
      "formData",
      JSON.stringify(formData)
    );

Отримання:

    const json = sessionStorage.getItem("formData");

    const formData = json
      ? JSON.parse(json)
      : null;

---

# 46. Serialization у cookies

Cookies також можуть містити strings.

Тому іноді JSON використовується і там.

Наприклад:

    const preferences = {
      theme: "dark",
      language: "uk"
    };

    const value = JSON.stringify(preferences);

Але cookie має додаткові обмеження:

- розмір;
- автоматична передача з HTTP requests;
- security attributes;
- `HttpOnly`;
- `Secure`;
- `SameSite`.

Тому не варто автоматично переносити підхід `localStorage` на cookies.

---

# 47. Serialization і security

Важливо розуміти:

> **Серіалізація не захищає дані.**

JSON:

- не шифрує;
- не приховує;
- не робить дані trusted;
- не запобігає XSS;
- не замінює authentication;
- не замінює authorization.

Наприклад:

    JSON.stringify({
      password: "secret"
    });

не робить password безпечним.

---

# 48. Не довіряти deserialized data

Дані після deserialization потрібно розглядати як зовнішні дані, якщо вони походять із:

- HTTP;
- localStorage;
- sessionStorage;
- файлу;
- cookie;
- URL;
- іншого користувача;
- зовнішнього сервісу.

Тому:

    deserialize
        ↓
    validate
        ↓
    use

а не:

    deserialize
        ↓
    automatically trust

---

# 49. Error handling

Serialization теж може завершитися помилкою.

Наприклад, cyclic reference:

    const data = {};

    data.self = data;

    JSON.stringify(data);

Може виникнути помилка.

Тому для ненадійних або складних даних можна використовувати:

    try {
      const json = JSON.stringify(data);

      // use json
    } catch (error) {
      console.error("Serialization failed:", error);
    }

---

# 50. Безпечний parse

Для deserialization:

    function parseJSON(json) {
      try {
        return JSON.parse(json);
      } catch {
        return null;
      }
    }

Використання:

    const data = parseJSON(json);

Але для production-коду важливо також визначити, чи `null` є коректним результатом, чи потрібно повертати/кидати помилку.

---

# 51. Serialization helper

У реальному застосунку serialization можна винести в окрему функцію.

    function serialize(data) {
      return JSON.stringify(data);
    }

    function deserialize(json) {
      return JSON.parse(json);
    }

Використання:

    const json = serialize(user);

    const user = deserialize(json);

Це простий приклад abstraction layer.

---

# 52. Storage helper

Наприклад:

    function saveData(key, data) {
      localStorage.setItem(
        key,
        JSON.stringify(data)
      );
    }

    function loadData(key) {
      const json = localStorage.getItem(key);

      if (!json) {
        return null;
      }

      return JSON.parse(json);
    }

Використання:

    saveData("user", {
      name: "Anna",
      age: 30
    });

    const user = loadData("user");

Це вже практичне поєднання:

    Storage + Serialization

---

# 53. Типова архітектура serialization layer

У невеликому застосунку:

    UI
      ↓
    Application logic
      ↓
    Storage/API
      ↓
    Serialization

Наприклад:

    UI
      ↓
    saveUser(user)
      ↓
    JSON.stringify(user)
      ↓
    localStorage

А при читанні:

    localStorage
      ↓
    JSON.parse()
      ↓
    loadUser()
      ↓
    UI

---

# 54. Serialization у навчальному Full Stack застосунку

Наприклад, у твоїй вправі frontend → backend:

    Browser
      ↓
    JavaScript object
      ↓
    JSON.stringify()
      ↓
    HTTP request
      ↓
    Node.js server
      ↓
    req.body
      ↓
    PostgreSQL
      ↓
    result
      ↓
    JSON response
      ↓
    response.json()
      ↓
    JavaScript object
      ↓
    UI

Це дуже важлива схема для розуміння Full Stack.

---

# 55. Що потрібно пам'ятати

### 1. Serialization — це процес

    Data
      ↓
    Serialized representation

### 2. Deserialization — зворотний процес

    Serialized representation
      ↓
    Data

### 3. JSON — формат, а не сам процес

    Serialization
        ↓
    JSON

### 4. У JavaScript найпоширеніша пара

    JSON.stringify()
    JSON.parse()

### 5. Storage часто потребує serialization

    Object
      ↓
    JSON.stringify()
      ↓
    localStorage/sessionStorage

### 6. HTTP API часто використовує JSON

    Object
      ↓
    JSON
      ↓
    HTTP

### 7. Не всі JavaScript типи добре представлені в JSON

Проблеми:

    undefined
    Function
    Symbol
    Date
    Map
    Set
    BigInt
    cyclic references

### 8. Serialization не є security

### 9. Serialization не є validation

### 10. Serialization не є storage

Це різні рівні системи.

---

# 56. Типові помилки

## ❌ Вважати serialization = JSON

Serialization — це процес.

JSON — формат.

---

## ❌ Вважати JSON JavaScript object

    '{"name":"Anna"}'

це:

    string

а не:

    object

Потрібно:

    JSON.parse(json);

---

## ❌ Використовувати JSON як універсальний clone

    JSON.parse(
      JSON.stringify(data)
    );

має обмеження.

Для складніших структур розглядайте:

    structuredClone(data);

---

## ❌ Очікувати, що Date відновиться автоматично

    const json = JSON.stringify({
      date: new Date()
    });

    const data = JSON.parse(json);

`data.date` буде string.

---

## ❌ Забувати про cyclic references

    object.self = object;

не можна напряму серіалізувати стандартним JSON.stringify().

---

## ❌ Вважати serialized data trusted

Після deserialization дані все одно потрібно перевіряти.

---

## ❌ Плутати serialization і persistence

    JSON.stringify()

не зберігає дані.

Воно лише створює representation.

---

# 57. Serialization vs Storage vs Transport

Ці три поняття потрібно чітко розділяти.

### Serialization

    Object
      ↓
    JSON

### Storage

    JSON
      ↓
    localStorage / file / database

### Transport

    JSON
      ↓
    HTTP / network

Повна схема:

    JavaScript Object
          ↓
      Serialization
          ↓
         JSON
        ↙    ↘
     Storage  Transport
       ↓        ↓
     Disk     Network

---

# 58. Serialization vs Encryption

Не плутати:

### Serialization

    Object
      ↓
    JSON string

### Encryption

    Data
      ↓
    encrypted data

JSON не шифрує дані.

Наприклад:

    JSON.stringify({
      password: "123456"
    });

не є шифруванням.

---

# 59. Serialization vs Compression

Також не плутати з compression.

### Serialization

    Object
      ↓
    JSON

### Compression

    Data
      ↓
    smaller representation

У мережевому застосунку вони можуть використовуватися разом:

    Object
      ↓
    JSON serialization
      ↓
    Compression
      ↓
    Network

---

# 60. Serialization vs Encoding

Можна уявити рівні:

    JavaScript Object
          ↓
    Serialization
          ↓
    JSON
          ↓
    Encoding
          ↓
    Bytes
          ↓
    Network

Кожен рівень вирішує свою задачу.

---

# 61. Міні-практика

## Завдання 1 — простий object

Створіть:

    const user = {
      name: "Valeriy",
      age: 56,
      active: true
    };

Зробіть:

    Object → JSON → Object

---

## Завдання 2 — array

Створіть:

    const skills = [
      "HTML",
      "CSS",
      "JavaScript",
      "React"
    ];

Серіалізуйте та відновіть.

---

## Завдання 3 — storage

Створіть:

    const settings = {
      theme: "dark",
      language: "uk"
    };

Збережіть у:

    localStorage

Потім відновіть.

---

## Завдання 4 — sessionStorage

Створіть:

    const form = {
      name: "Valeriy",
      email: "example@email.com"
    };

Збережіть у:

    sessionStorage

Після reload відновіть дані.

---

## Завдання 5 — Date

Створіть:

    const data = {
      createdAt: new Date()
    };

Серіалізуйте.

Перевірте:

    typeof restored.createdAt

Поясніть, чому це `string`.

---

## Завдання 6 — Map

Створіть:

    const skills = new Map([
      ["frontend", "React"],
      ["backend", "Node.js"]
    ]);

Подумайте, як перетворити його у JSON-сумісну структуру.

---

## Завдання 7 — cyclic reference

Створіть:

    const user = {};

    user.self = user;

Спробуйте:

    JSON.stringify(user);

Поясніть помилку.

---

# 62. Практичний проект

## 🟢 Temporary Form State

Створіть форму:

    Name
    Email
    Age

При введенні даних:

    Form
      ↓
    JavaScript object
      ↓
    JSON.stringify()
      ↓
    sessionStorage

Після reload:

    sessionStorage
      ↓
    JSON.parse()
      ↓
    JavaScript object
      ↓
    Form

Додайте:

- `Save`;
- `Load`;
- `Clear`.

---

# 63. Практичний Full Stack проект

## 🟡 Users API

Frontend:

    const user = {
      name: "Anna",
      age: 30
    };

Serialization:

    const body = JSON.stringify(user);

HTTP:

    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body
    });

Backend:

    request
      ↓
    JSON
      ↓
    JavaScript object
      ↓
    validation
      ↓
    PostgreSQL

Response:

    PostgreSQL
      ↓
    JavaScript object
      ↓
    JSON
      ↓
    HTTP
      ↓
    response.json()
      ↓
    Frontend object

Це вже повноцінний Full Stack data flow.

---

# 64. Рівні знань

## 🟢 Core

Потрібно знати:

- що таке serialization;
- що таке deserialization;
- JSON як serialization format;
- `JSON.stringify()`;
- `JSON.parse()`;
- storage + JSON;
- API + JSON.

---

## 🟡 Junior

Потрібно вміти:

- серіалізувати objects;
- десеріалізувати JSON;
- працювати з arrays;
- працювати з nested objects;
- зберігати JSON у storage;
- передавати JSON через `fetch()`;
- обробляти `JSON.parse()` errors;
- розуміти обмеження JSON.

---

## 🟠 Middle

Потрібно розуміти:

- serialization/deserialization pipeline;
- API contracts;
- replacer;
- reviver;
- Date serialization;
- custom serialization;
- runtime validation;
- structured cloning;
- performance;
- payload size;
- backward compatibility.

---

## 🔴 Senior

Потрібно розуміти:

- serialization architecture;
- schema evolution;
- API versioning;
- compatibility;
- serialization formats;
- binary vs text formats;
- compression;
- encoding;
- security boundaries;
- performance;
- distributed systems data exchange;
- serialization у microservices;
- trade-offs між різними форматами.

---

# 65. Питання для співбесіди

### Базові

1. Що таке serialization?
2. Що таке deserialization?
3. Чим вони відрізняються?
4. Що таке JSON?
5. Чи є JSON JavaScript object?
6. Для чого потрібен `JSON.stringify()`?
7. Для чого потрібен `JSON.parse()`?

### Browser

8. Чому `localStorage` потребує serialization для objects?
9. Чому `sessionStorage` також потребує serialization?
10. Що станеться з `undefined`?
11. Що станеться з `Date`?
12. Чому JSON не підтримує cyclic references?

### API

13. Як object передається через HTTP?
14. Для чого потрібен `Content-Type: application/json`?
15. Що робить `response.json()`?
16. Чим `response.json()` відрізняється від `JSON.parse()`?

### Advanced

17. Що таке replacer?
18. Що таке reviver?
19. Чому JSON не є універсальним deep clone?
20. Що таке `structuredClone()`?
21. Чим serialization відрізняється від encoding?
22. Чим serialization відрізняється від encryption?
23. Чим serialization відрізняється від storage?
24. Чому valid JSON не гарантує valid application data?
25. Навіщо потрібна runtime validation?

---

# 66. Міні-шпаргалка

    // Serialization

    const json = JSON.stringify(data);


    // Deserialization

    const data = JSON.parse(json);


    // Pretty JSON

    const json = JSON.stringify(
      data,
      null,
      2
    );


    // Storage

    localStorage.setItem(
      "data",
      JSON.stringify(data)
    );


    // Read storage

    const json = localStorage.getItem("data");

    const data = json
      ? JSON.parse(json)
      : null;


    // HTTP request

    await fetch("/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });


    // HTTP response

    const response = await fetch("/api/data");

    const data = await response.json();


    // Safe parse

    try {
      const data = JSON.parse(json);
    } catch (error) {
      console.error("Invalid JSON");
    }


    // Deep clone for JSON-compatible data

    const copy = JSON.parse(
      JSON.stringify(data)
    );


    // Modern structured clone

    const copy = structuredClone(data);

---

# 67. Головне

> **Serialization — це перетворення даних у представлення, яке можна зберігати або передавати.**

У JavaScript найчастіше використовується JSON:

    JavaScript value
          ↓
    JSON.stringify()
          ↓
    JSON string
          ↓
    Storage / HTTP / File
          ↓
    JSON string
          ↓
    JSON.parse()
          ↓
    JavaScript value

Але важливо бачити ширшу картину:

    Serialization
        ≠
    JSON

    Serialization
        ≠
    Storage

    Serialization
        ≠
    Transport

    Serialization
        ≠
    Encryption

    Serialization
        ≠
    Validation

JSON — лише один із форматів serialization.

Для Full Stack JavaScript найважливіша практична схема:

    Frontend object
          ↓
    JSON.stringify()
          ↓
    HTTP
          ↓
    Backend
          ↓
    Validation
          ↓
    Database
          ↓
    Backend object
          ↓
    JSON serialization
          ↓
    HTTP response
          ↓
    response.json()
          ↓
    Frontend object

Якщо ця схема зрозуміла, ти вже розумієш один із фундаментальних механізмів руху даних у Full Stack застосунку.