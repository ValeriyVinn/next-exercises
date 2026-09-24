# 03. JSON

## 📌 Визначення

**JSON (JavaScript Object Notation)** — текстовий формат для представлення та обміну структурованими даними.

JSON дуже часто використовується у JavaScript та Full Stack розробці для:

- передачі даних між frontend і backend;
- роботи з REST API;
- збереження структурованих даних;
- роботи з `localStorage` / `sessionStorage`;
- обміну даними між різними мовами програмування;
- конфігураційних файлів.

> **Головна ідея:** JSON — це текстовий формат даних, а не JavaScript-об'єкт.

---

# 1. Ключові поняття

| Поняття | Що означає |
|---|---|
| JSON | текстовий формат даних |
| Object | структура `{ key: value }` |
| Array | структура `[value1, value2]` |
| `JSON.stringify()` | JavaScript → JSON-рядок |
| `JSON.parse()` | JSON-рядок → JavaScript-значення |
| Property | властивість об'єкта |
| Value | значення властивості |
| Serialization | перетворення даних у формат для збереження/передачі |
| Deserialization | відновлення даних із серіалізованого формату |

---

# 2. JSON ≠ JavaScript Object

Це одна з найважливіших речей.

JavaScript object:

    const user = {
      name: "Valeriy",
      age: 56
    };

JSON:

    {
      "name": "Valeriy",
      "age": 56
    }

У JavaScript об'єкт існує як структура даних у пам'яті.

JSON — це **текст**.

Наприклад:

    const user = {
      name: "Valeriy",
      age: 56
    };

    console.log(typeof user);
    // "object"

А після `JSON.stringify()`:

    const json = JSON.stringify(user);

    console.log(typeof json);
    // "string"

---

# 3. JSON.stringify()

`JSON.stringify()` перетворює JavaScript-значення у JSON-рядок.

## Синтаксис

    JSON.stringify(value);

Приклад:

    const user = {
      name: "Valeriy",
      age: 56
    };

    const json = JSON.stringify(user);

    console.log(json);

Результат:

    {"name":"Valeriy","age":56}

Тип:

    console.log(typeof json);
    // "string"

---

# 4. JSON.parse()

`JSON.parse()` виконує зворотну операцію.

Він перетворює JSON-рядок у JavaScript-значення.

## Синтаксис

    JSON.parse(json);

Приклад:

    const json = '{"name":"Valeriy","age":56}';

    const user = JSON.parse(json);

    console.log(user);

Результат:

    {
      name: "Valeriy",
      age: 56
    }

Тепер це JavaScript object:

    console.log(typeof user);
    // "object"

---

# 5. Основна пара

Найважливіша схема:

    JavaScript value
          ↓
    JSON.stringify()
          ↓
      JSON string
          ↓
      JSON.parse()
          ↓
    JavaScript value

Наприклад:

    const user = {
      name: "Anna",
      age: 30
    };

    const json = JSON.stringify(user);

    const restoredUser = JSON.parse(json);

    console.log(restoredUser.name);
    // "Anna"

---

# 6. Які типи підтримує JSON

JSON має обмежений набір типів даних.

Підтримуються:

- string
- number
- boolean
- null
- object
- array

## Приклад

    {
      "name": "Anna",
      "age": 30,
      "active": true,
      "email": null,
      "skills": ["HTML", "CSS", "JavaScript"],
      "address": {
        "city": "Vinnytsia",
        "country": "Ukraine"
      }
    }

---

# 7. JSON String

JSON-рядок записується у подвійних лапках.

Правильно:

    {
      "name": "Anna"
    }

Неправильно:

    {
      'name': 'Anna'
    }

Для JSON стандартним синтаксисом є саме:

    "key": "value"

---

# 8. JSON Object

JSON object використовує фігурні дужки:

    {
      "name": "Anna",
      "age": 30
    }

Кожна властивість має:

    "key": value

Наприклад:

    {
      "name": "Anna",
      "age": 30,
      "active": true
    }

---

# 9. JSON Array

JSON array використовує квадратні дужки:

    [
      "HTML",
      "CSS",
      "JavaScript"
    ]

Можна зберігати об'єкти:

    [
      {
        "id": 1,
        "name": "Anna"
      },
      {
        "id": 2,
        "name": "John"
      }
    ]

Це дуже поширений формат відповіді API.

---

# 10. Вкладені об'єкти

JSON підтримує вкладені структури.

    {
      "name": "Anna",
      "address": {
        "city": "Vinnytsia",
        "country": "Ukraine"
      }
    }

Після `JSON.parse()`:

    const user = JSON.parse(json);

    console.log(user.address.city);
    // "Vinnytsia"

---

# 11. Масив об'єктів

Один із найпоширеніших форматів у Full Stack:

    const json = `
      [
        {
          "id": 1,
          "name": "Anna"
        },
        {
          "id": 2,
          "name": "John"
        }
      ]
    `;

    const users = JSON.parse(json);

    console.log(users[0].name);
    // "Anna"

    console.log(users[1].name);
    // "John"

Такі структури дуже часто приходять із REST API.

---

# 12. JSON і числа

JSON підтримує numbers.

    {
      "age": 56,
      "price": 199.99,
      "count": 10
    }

Після `JSON.parse()`:

    const data = JSON.parse(json);

    console.log(typeof data.age);
    // "number"

---

# 13. JSON і boolean

JSON підтримує:

    true

та

    false

Приклад:

    {
      "isActive": true,
      "isAdmin": false
    }

Після парсингу:

    const data = JSON.parse(json);

    console.log(data.isActive);
    // true

    console.log(typeof data.isActive);
    // "boolean"

---

# 14. JSON і null

JSON підтримує `null`.

    {
      "name": "Anna",
      "phone": null
    }

Після парсингу:

    const data = JSON.parse(json);

    console.log(data.phone);
    // null

---

# 15. JSON не підтримує undefined

`undefined` не є валідним JSON-значенням.

Наприклад:

    const user = {
      name: "Anna",
      age: undefined
    };

При `JSON.stringify()` властивість `age` буде пропущена:

    JSON.stringify(user);

Результат:

    {"name":"Anna"}

---

# 16. JSON не підтримує Function

Функції не можуть бути представлені як стандартні JSON-значення.

    const user = {
      name: "Anna",
      sayHello() {
        console.log("Hello");
      }
    };

    console.log(JSON.stringify(user));

Результат міститиме тільки серіалізовані властивості:

    {"name":"Anna"}

---

# 17. JSON і Date

`Date` не зберігається як спеціальний JavaScript `Date`.

Наприклад:

    const user = {
      name: "Anna",
      createdAt: new Date()
    };

    const json = JSON.stringify(user);

Дата перетворюється у строкове представлення.

Після `JSON.parse()`:

    const restored = JSON.parse(json);

    console.log(typeof restored.createdAt);
    // "string"

Тобто:

    Date
      ↓
    JSON.stringify()
      ↓
    string
      ↓
    JSON.parse()
      ↓
    string

Якщо потрібен саме `Date`, його потрібно відновити:

    const restored = JSON.parse(json);

    restored.createdAt = new Date(restored.createdAt);

---

# 18. JSON.stringify() для масиву

    const skills = [
      "HTML",
      "CSS",
      "JavaScript"
    ];

    const json = JSON.stringify(skills);

    console.log(json);

Результат:

    ["HTML","CSS","JavaScript"]

---

# 19. JSON.parse() для масиву

    const json = '["HTML","CSS","JavaScript"]';

    const skills = JSON.parse(json);

    console.log(skills);

    console.log(skills[0]);
    // "HTML"

---

# 20. JSON.stringify() для примітивів

`JSON.stringify()` може працювати не тільки з об'єктами.

    JSON.stringify("Hello");
    // '"Hello"'

    JSON.stringify(42);
    // "42"

    JSON.stringify(true);
    // "true"

    JSON.stringify(null);
    // "null"

---

# 21. JSON.parse() для примітивів

Так само `JSON.parse()` може повернути примітивне значення.

    JSON.parse('"Hello"');
    // "Hello"

    JSON.parse("42");
    // 42

    JSON.parse("true");
    // true

    JSON.parse("null");
    // null

---

# 22. Відступи при JSON.stringify()

Третій параметр `JSON.stringify()` дозволяє зробити JSON читабельним.

    const user = {
      name: "Anna",
      age: 30,
      skills: ["HTML", "CSS", "JavaScript"]
    };

    const json = JSON.stringify(user, null, 2);

    console.log(json);

Результат:

    {
      "name": "Anna",
      "age": 30,
      "skills": [
        "HTML",
        "CSS",
        "JavaScript"
      ]
    }

Це зручно для:

- debugging;
- логів;
- README;
- JSON-файлів;
- перегляду API-даних.

---

# 23. JSON.stringify(value, replacer, space)

Повний синтаксис:

    JSON.stringify(value, replacer, space);

Наприклад:

    JSON.stringify(user, null, 2);

де:

- `user` — дані;
- `null` — без спеціального `replacer`;
- `2` — кількість пробілів для форматування.

---

# 24. Replacer

Другий аргумент дозволяє контролювати, які властивості серіалізувати.

    const user = {
      name: "Anna",
      age: 30,
      password: "12345"
    };

    const json = JSON.stringify(
      user,
      ["name", "age"],
      2
    );

Результат:

    {
      "name": "Anna",
      "age": 30
    }

Це корисний механізм, але для звичайної роботи достатньо знати:

    JSON.stringify(value, null, 2);

---

# 25. JSON.parse() і помилки

`JSON.parse()` може викинути помилку, якщо рядок не є валідним JSON.

Наприклад:

    const json = "{name: 'Anna'}";

    JSON.parse(json);

Це помилка, тому що JSON вимагає:

- подвійні лапки для ключів;
- подвійні лапки для string.

Правильно:

    const json = '{"name":"Anna"}';

---

# 26. try...catch з JSON.parse()

Якщо JSON може бути ненадійним, використовуємо `try...catch`.

    try {
      const data = JSON.parse(json);

      console.log(data);
    } catch (error) {
      console.error("Invalid JSON:", error);
    }

Це особливо важливо при роботі з:

- API;
- `localStorage`;
- `sessionStorage`;
- файлами;
- зовнішніми даними.

---

# 27. JSON і localStorage

`localStorage` зберігає тільки strings.

Тому object потрібно перетворити:

    const user = {
      name: "Anna",
      age: 30
    };

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

Отримання:

    const json = localStorage.getItem("user");

    const user = JSON.parse(json);

Тобто:

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

Це одна з найважливіших практичних схем JavaScript.

---

# 28. JSON і sessionStorage

Те саме працює з `sessionStorage`.

    const settings = {
      theme: "dark",
      language: "uk"
    };

    sessionStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );

Отримання:

    const json = sessionStorage.getItem("settings");

    const settings = JSON.parse(json);

---

# 29. Безпечне читання JSON зі storage

Потрібно пам'ятати, що `getItem()` може повернути `null`.

Тому простий варіант:

    const json = localStorage.getItem("user");

    const user = json
      ? JSON.parse(json)
      : null;

Або:

    const user = JSON.parse(
      localStorage.getItem("user") || "null"
    );

Для більш надійного коду:

    function getUser() {
      const json = localStorage.getItem("user");

      if (!json) {
        return null;
      }

      try {
        return JSON.parse(json);
      } catch {
        return null;
      }
    }

---

# 30. JSON для передачі даних frontend → backend

У Full Stack розробці JSON часто використовується у HTTP-запитах.

Frontend:

    const user = {
      name: "Anna",
      age: 30
    };

    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

Тут:

    JavaScript object
          ↓
    JSON.stringify()
          ↓
    HTTP request body
          ↓
       Backend

---

# 31. JSON від backend → frontend

Backend може повернути JSON.

Frontend:

    const response = await fetch("/api/users");

    const users = await response.json();

Метод:

    response.json()

читає JSON-відповідь та перетворює її на JavaScript-значення.

Схема:

    Backend object/data
          ↓
        JSON
          ↓
    HTTP response
          ↓
    response.json()
          ↓
    JavaScript object/array

---

# 32. JSON і REST API

Типова відповідь API:

    {
      "id": 1,
      "name": "Anna",
      "email": "anna@example.com"
    }

Або список:

    [
      {
        "id": 1,
        "name": "Anna"
      },
      {
        "id": 2,
        "name": "John"
      }
    ]

На frontend:

    const response = await fetch("/api/users");

    const users = await response.json();

    users.forEach(user => {
      console.log(user.name);
    });

---

# 33. JSON-файли

JSON часто зберігається у файлах із розширенням:

    .json

Наприклад:

    users.json

Вміст:

    [
      {
        "id": 1,
        "name": "Anna"
      },
      {
        "id": 2,
        "name": "John"
      }
    ]

JSON-файли можуть використовуватися як:

- конфігурація;
- статичні дані;
- тестові дані;
- mock data;
- дані для невеликих навчальних застосунків.

---

# 34. JSON і база даних

У Full Stack застосунку JSON часто є проміжним форматом між frontend та backend.

Типова схема:

    Frontend
       ↓
    HTTP / JSON
       ↓
    Backend
       ↓
    SQL
       ↓
    PostgreSQL
       ↓
    Backend
       ↓
    JSON
       ↓
    Frontend

Важливо розуміти:

> **JSON не замінює PostgreSQL.**

JSON — це формат передачі/представлення даних.

PostgreSQL — система керування базами даних.

---

# 35. JSON і PostgreSQL

PostgreSQL також має тип `json` та `jsonb`.

Наприклад:

    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      data JSONB
    );

Але це вже окрема тема баз даних.

На рівні JavaScript потрібно розуміти головне:

    JavaScript object
        ↕
    JSON
        ↕
    Backend
        ↕
    Database

---

# 36. Глибоке копіювання через JSON

Іноді можна зустріти:

    const copy = JSON.parse(
      JSON.stringify(original)
    );

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

Але цей спосіб має обмеження.

Він не підходить для повноцінного копіювання всіх JavaScript-типів.

Наприклад, проблеми виникають з:

- `Date`;
- `undefined`;
- `Function`;
- `Map`;
- `Set`;
- `BigInt`;
- циклічними посиланнями.

Для сучасного JavaScript також існує:

    structuredClone(value);

Тому JSON-копіювання потрібно розглядати як простий прийом для простих JSON-сумісних даних, а не як універсальний deep clone.

---

# 37. Циклічні посилання

JSON не підтримує циклічні структури.

Наприклад:

    const user = {
      name: "Anna"
    };

    user.self = user;

Спроба:

    JSON.stringify(user);

призведе до помилки через циклічне посилання.

Тому структура для JSON повинна бути серіалізованою без циклів.

---

# 38. BigInt і JSON

`BigInt` стандартний `JSON.stringify()` не серіалізує.

Наприклад:

    const value = 123n;

    JSON.stringify(value);

Це призведе до помилки.

Якщо потрібно передати дуже велике число через JSON, потрібно продумати формат, наприклад зберігати його як string:

    const data = {
      value: "12345678901234567890"
    };

---

# 39. JSON — це не тип JavaScript

Немає такого типу:

    typeof json === "json"

Наприклад:

    const json = '{"name":"Anna"}';

    console.log(typeof json);
    // "string"

JSON — це формат представлення даних.

Після:

    JSON.parse(json);

отримаємо JavaScript value.

---

# 40. JSON у порівнянні з JavaScript object

| JavaScript Object | JSON |
|---|---|
| структура даних у JS | текстовий формат |
| існує в пам'яті програми | представлений як string |
| може містити function | не підтримує function |
| може містити `undefined` | не має `undefined` |
| може містити `Date` | Date перетворюється у string |
| ключі можуть бути без лапок | ключі мають бути в `"` |
| може мати методи | методи не є JSON |
| використовується всередині JS | використовується для передачі/збереження |

---

# 41. JSON.parse() vs JSON.stringify()

| Метод | Напрямок | Результат |
|---|---|---|
| `JSON.stringify()` | JS → JSON | string |
| `JSON.parse()` | JSON → JS | JavaScript value |

Запам'ятати:

    stringify → зробити string

    parse → розібрати string

---

# 42. Практичний приклад: список завдань

JavaScript:

    const tasks = [
      {
        id: 1,
        title: "Learn JavaScript",
        completed: true
      },
      {
        id: 2,
        title: "Learn PostgreSQL",
        completed: false
      }
    ];

Перетворення в JSON:

    const json = JSON.stringify(tasks);

    console.log(json);

Збереження:

    localStorage.setItem("tasks", json);

Отримання:

    const savedTasks = localStorage.getItem("tasks");

Відновлення:

    const tasksFromStorage = JSON.parse(savedTasks);

Тепер:

    console.log(tasksFromStorage[0].title);
    // "Learn JavaScript"

---

# 43. Практичний приклад: налаштування користувача

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

    const json = localStorage.getItem("settings");

    const settingsFromStorage = JSON.parse(json);

    console.log(settingsFromStorage.theme);
    // "dark"

---

# 44. Практичний приклад: форма

Припустимо, користувач заповнив форму:

    const formData = {
      name: "Valeriy",
      email: "example@email.com",
      age: 56
    };

Перетворюємо:

    const json = JSON.stringify(formData);

Зберігаємо:

    sessionStorage.setItem(
      "formData",
      json
    );

Після перезавантаження сторінки:

    const savedData = sessionStorage.getItem("formData");

    const formData = JSON.parse(savedData);

Таким способом можна відновити стан форми.

---

# 45. JSON у fetch()

Для POST-запиту:

    const user = {
      name: "Anna",
      age: 30
    };

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });

Тут важливо не плутати:

    body: user

і

    body: JSON.stringify(user)

Для JSON HTTP body зазвичай передають саме JSON-рядок.

---

# 46. Отримання JSON через fetch()

    const response = await fetch("/api/users");

    const data = await response.json();

Тут `response.json()`:

1. читає response body;
2. очікує JSON;
3. парсить JSON;
4. повертає JavaScript value.

Наприклад:

    const users = await response.json();

    console.log(users[0].name);

---

# 47. JSON.stringify() не означає "зберегти"

Важливо:

    JSON.stringify()

не зберігає дані сам по собі.

Він тільки створює string.

Наприклад:

    const json = JSON.stringify(user);

Після цього `json` існує лише як змінна.

Щоб зберегти його, потрібен механізм:

    localStorage.setItem(...)

або:

    sessionStorage.setItem(...)

або:

    fetch(...)

або:

    file / database / інший storage

---

# 48. JSON.parse() не означає "отримати з сервера"

`JSON.parse()` також нічого не завантажує.

Він лише бере вже існуючий JSON string:

    const json = '{"name":"Anna"}';

і перетворює його:

    const user = JSON.parse(json);

Для отримання JSON з HTTP використовується, наприклад:

    fetch()

а потім:

    response.json()

---

# 49. Типова помилка: подвійний parse

Неправильно:

    const data = await response.json();

    const parsed = JSON.parse(data);

`response.json()` вже виконав parsing.

Правильно:

    const data = await response.json();

---

# 50. Типова помилка: подвійний stringify

Якщо backend очікує JSON object у body, зазвичай достатньо:

    body: JSON.stringify(user)

Не потрібно робити:

    body: JSON.stringify(
      JSON.stringify(user)
    )

---

# 51. Типова помилка: забути JSON.stringify()

Неправильно:

    localStorage.setItem("user", user);

Object буде перетворений не в потрібний JSON, а в:

    [object Object]

Правильно:

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

---

# 52. Типова помилка: забути JSON.parse()

Якщо отримали JSON із storage:

    const json = localStorage.getItem("user");

`json` — це string.

Не можна одразу очікувати object:

    console.log(json.name);

Потрібно:

    const user = JSON.parse(json);

    console.log(user.name);

---

# 53. Типова помилка: JSON.parse(null)

Наприклад:

    const json = localStorage.getItem("user");

Якщо ключа немає:

    json === null

Тому краще перевіряти результат перед parsing.

    if (json) {
      const user = JSON.parse(json);
    }

---

# 54. JSON.parse() може впасти

Ніколи не припускайте, що довільний string є валідним JSON.

    try {
      const data = JSON.parse(json);
    } catch (error) {
      console.error("Invalid JSON");
    }

Особливо важливо для:

- зовнішніх даних;
- user input;
- storage;
- API;
- файлів.

---

# 55. JSON та безпека

JSON сам по собі не є механізмом безпеки.

Наприклад:

    JSON.stringify(data);

не:

- шифрує дані;
- захищає від XSS;
- перевіряє права доступу;
- робить дані приватними.

JSON — лише формат.

---

# 56. JSON та валідація

JSON може мати правильний синтаксис, але неправильні дані.

Наприклад:

    {
      "age": "hello"
    }

Це валідний JSON.

Але application може очікувати:

    {
      "age": 56
    }

Тому:

> **Valid JSON ≠ valid application data.**

Для реальних застосунків часто потрібна додаткова валідація даних.

---

# 57. JSON Schema — наступний рівень

Для складніших систем існує поняття **JSON Schema**.

Воно дозволяє описувати:

- які поля повинні існувати;
- які типи вони мають;
- які значення допустимі;
- які поля обов'язкові.

Наприклад, концептуально:

    {
      "name": "Anna",
      "age": 30
    }

можна описати схемою, яка вимагає:

    name → string
    age  → number

На junior-рівні достатньо розуміти саму ідею.

---

# 58. JSON у Full Stack архітектурі

Типовий шлях даних:

    User
      ↓
    HTML Form
      ↓
    JavaScript Object
      ↓
    JSON.stringify()
      ↓
    HTTP Request
      ↓
    Node.js / Express / NestJS
      ↓
    PostgreSQL
      ↓
    JavaScript Object
      ↓
    JSON Response
      ↓
    response.json()
      ↓
    Frontend

Це одна з фундаментальних схем Full Stack JavaScript.

---

# 59. JSON і TypeScript

У TypeScript JSON після parsing не отримує автоматично правильний тип лише тому, що JSON має певну структуру.

Наприклад:

    const data = JSON.parse(json);

Типізація результату потребує окремого підходу.

У реальних проектах використовують:

- TypeScript types/interfaces;
- runtime validation;
- schema libraries;
- API contracts.

Важлива ідея:

> TypeScript перевіряє типи під час розробки, а JSON приходить як runtime data.

---

# 60. JSON у Node.js

У Node.js JSON також використовується дуже часто.

Наприклад:

    const user = {
      name: "Anna",
      age: 30
    };

    const json = JSON.stringify(user);

    console.log(json);

У Node.js доступні ті самі глобальні методи:

    JSON.stringify()

    JSON.parse()

---

# 61. JSON у Next.js

У Next.js JSON може використовуватися:

- у API;
- у Server Components;
- у Client Components;
- при роботі з backend;
- при отриманні даних із REST API;
- для конфігурацій;
- для статичних даних.

Але потрібно розрізняти:

    JSON data

і

    JavaScript object

Між ними за потреби виконується serialization / parsing.

---

# 62. JSON як контракт між frontend і backend

У Full Stack застосунку JSON часто фактично стає форматом контракту.

Наприклад frontend відправляє:

    {
      "title": "Learn PostgreSQL",
      "completed": false
    }

Backend очікує саме таку структуру.

Backend може повернути:

    {
      "id": 15,
      "title": "Learn PostgreSQL",
      "completed": false
    }

Frontend працює вже з отриманим JavaScript object.

Тому важливо узгоджувати:

- назви полів;
- типи;
- обов'язкові поля;
- формат дат;
- формат помилок;
- структуру response.

---

# 63. Мінімальний практичний проект

## JSON Task Manager

Створіть масив:

    const tasks = [
      {
        id: 1,
        title: "Learn JavaScript",
        completed: true
      },
      {
        id: 2,
        title: "Learn JSON",
        completed: false
      }
    ];

### Крок 1

Перетворіть у JSON:

    const json = JSON.stringify(tasks, null, 2);

### Крок 2

Виведіть JSON у `<pre>`:

    document.querySelector("#output").textContent = json;

### Крок 3

Збережіть у `localStorage`:

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );

### Крок 4

Отримайте:

    const saved = localStorage.getItem("tasks");

### Крок 5

Відновіть:

    const restoredTasks = JSON.parse(saved);

### Крок 6

Виведіть завдання:

    restoredTasks.forEach(task => {
      console.log(task.title);
    });

---

# 64. Практичний алгоритм роботи з JSON

Коли потрібно відправити object:

    const data = {
      name: "Anna"
    };

    const json = JSON.stringify(data);

    // передаємо json

Коли отримали JSON string:

    const data = JSON.parse(json);

    // працюємо з data як з JavaScript value

Тобто:

    SEND:
    Object → stringify → JSON

    RECEIVE:
    JSON → parse → Object

---

# 65. Що потрібно пам'ятати

### 1. JSON — це формат

    JSON ≠ JavaScript object

### 2. Object → JSON

    JSON.stringify(object)

### 3. JSON → Object

    JSON.parse(json)

### 4. JSON — текст

    typeof json
    // "string"

### 5. JSON має обмежений набір типів

    string
    number
    boolean
    null
    object
    array

### 6. JSON не має

    undefined
    function
    BigInt
    циклічних посилань

### 7. Storage працює зі strings

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

### 8. `fetch()` має власний helper

    const data = await response.json();

### 9. JSON не шифрує дані

### 10. Valid JSON не гарантує valid application data

---

# 66. Типові помилки

## ❌ Об'єкт напряму в localStorage

    localStorage.setItem("user", user);

## ✅ Правильно

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

---

## ❌ Забути parse

    const user = localStorage.getItem("user");

    console.log(user.name);

## ✅ Правильно

    const user = JSON.parse(
      localStorage.getItem("user")
    );

---

## ❌ Одинарні лапки як JSON

    {'name': 'Anna'}

## ✅ Правильно

    {"name": "Anna"}

---

## ❌ Функція у JSON

    {
      "name": "Anna",
      "sayHello": function() {}
    }

## ✅

    {
      "name": "Anna"
    }

---

## ❌ Подвійний parse

    const data = await response.json();

    const parsed = JSON.parse(data);

## ✅

    const data = await response.json();

---

## ❌ Подвійний stringify

    JSON.stringify(
      JSON.stringify(user)
    );

## ✅

    JSON.stringify(user)

---

# 67. JSON vs JSON.stringify() vs JSON.parse()

Не плутати:

### JSON

Формат даних.

### JSON.stringify()

Метод JavaScript:

    JavaScript → JSON string

### JSON.parse()

Метод JavaScript:

    JSON string → JavaScript value

---

# 68. JSON vs localStorage vs sessionStorage

| Технологія | Призначення |
|---|---|
| JSON | формат даних |
| `JSON.stringify()` | object → string |
| `JSON.parse()` | string → object/value |
| `localStorage` | довготривале client-side storage |
| `sessionStorage` | тимчасове storage поточної browser session |
| IndexedDB | великі структуровані client-side дані |
| PostgreSQL | серверна база даних |

Важлива схема:

    JSON
      ↓
    може використовуватися з
      ↓
    localStorage
    sessionStorage
    HTTP/API
    файли
    database systems

---

# 69. Рівні знань

## 🟢 Core

Потрібно знати:

- що таке JSON;
- JSON object;
- JSON array;
- JSON string;
- `JSON.stringify()`;
- `JSON.parse()`;
- JSON types;
- різницю між JSON і JS object.

---

## 🟡 Junior

Потрібно вміти:

- серіалізувати object;
- парсити JSON;
- працювати з JSON у `localStorage`;
- працювати з JSON у `sessionStorage`;
- використовувати JSON у `fetch()`;
- працювати з масивами об'єктів;
- обробляти помилки `JSON.parse()`;
- розуміти JSON у REST API.

---

## 🟠 Middle

Потрібно розуміти:

- serialization / deserialization;
- API contracts;
- JSON validation;
- JSON Schema;
- формат дат;
- обмеження JSON;
- cyclic references;
- `replacer`;
- runtime validation;
- JSON у Node.js / NestJS;
- JSON ↔ PostgreSQL;
- помилки та edge cases.

---

## 🔴 Senior

Потрібно розуміти:

- проектування API contracts;
- versioning JSON API;
- backward compatibility;
- schema evolution;
- serialization performance;
- payload size;
- validation;
- security;
- data normalization;
- JSON vs binary protocols;
- JSON vs database-native structures;
- архітектурні наслідки формату даних.

---

# 70. Питання для співбесіди

### Базові

1. Що таке JSON?
2. Чим JSON відрізняється від JavaScript object?
3. Які типи підтримує JSON?
4. Для чого потрібен `JSON.stringify()`?
5. Для чого потрібен `JSON.parse()`?
6. Який тип повертає `JSON.stringify()`?
7. Що повертає `JSON.parse()`?
8. Чи підтримує JSON `undefined`?
9. Чи підтримує JSON function?
10. Чому ключі JSON записуються в подвійних лапках?

### Storage

11. Чому object потрібно stringify перед `localStorage.setItem()`?
12. Чому після `getItem()` потрібно робити `JSON.parse()`?
13. Що станеться, якщо `getItem()` поверне `null`?
14. Як зберегти масив об'єктів у `localStorage`?

### API

15. Для чого потрібен `Content-Type: application/json`?
16. Навіщо використовувати `JSON.stringify()` у `fetch()`?
17. Що робить `response.json()`?
18. Чим `JSON.parse()` відрізняється від `response.json()`?

### Advanced

19. Чому `Date` не відновлюється автоматично як `Date` після `JSON.parse()`?
20. Чому JSON не підтримує циклічні посилання?
21. Які обмеження має JSON для deep clone?
22. Чим serialization відрізняється від parsing?
23. Чому valid JSON не гарантує valid application data?
24. Навіщо потрібна runtime validation?

---

# 71. Міні-шпаргалка

    // Object → JSON

    const json = JSON.stringify(data);


    // JSON → Object

    const data = JSON.parse(json);


    // Pretty JSON

    const json = JSON.stringify(data, null, 2);


    // localStorage

    localStorage.setItem(
      "data",
      JSON.stringify(data)
    );


    // localStorage → object

    const data = JSON.parse(
      localStorage.getItem("data")
    );


    // sessionStorage

    sessionStorage.setItem(
      "data",
      JSON.stringify(data)
    );


    // fetch → JSON

    const response = await fetch("/api/data");

    const data = await response.json();


    // POST JSON

    await fetch("/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });


    // Safe parse

    try {
      const data = JSON.parse(json);
    } catch (error) {
      console.error("Invalid JSON");
    }

---

# 72. Головне

> **JSON — це текстовий формат структурованих даних.**

У JavaScript основна пара:

    JSON.stringify()
          ↓
    JavaScript → JSON string

і:

    JSON.parse()
          ↓
    JSON string → JavaScript value

Для Full Stack JavaScript потрібно бачити JSON як **міст між частинами системи**:

    Frontend
        ↓
    JavaScript Object
        ↓
    JSON
        ↓
    HTTP
        ↓
    Backend
        ↓
    Database
        ↓
    Backend
        ↓
    JSON
        ↓
    Frontend

Особливо важливо запам'ятати три речі:

1. **JSON — це не JavaScript object, а формат даних.**
2. **`JSON.stringify()` перетворює JavaScript value у JSON string.**
3. **`JSON.parse()` перетворює JSON string назад у JavaScript value.**

А практичний Full Stack ланцюжок:

    Object
      ↓
    JSON.stringify()
      ↓
    HTTP / Storage
      ↓
    JSON
      ↓
    JSON.parse()
      ↓
    Object

Цей механізм постійно зустрічається при роботі з:

- `localStorage`;
- `sessionStorage`;
- `fetch()`;
- REST API;
- Node.js;
- Express;
- NestJS;
- Next.js;
- PostgreSQL;
- frontend ↔ backend взаємодії.