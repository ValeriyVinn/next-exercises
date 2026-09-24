# 03. Default / Named Exports

Модулі JavaScript дозволяють розділяти код на окремі файли та керувати тим, що саме один модуль відкриває для інших.

У сучасному JavaScript основними способами експорту є:

- **Named export** — іменований експорт.
- **Default export** — експорт за замовчуванням.
- **Named import** — імпорт конкретного іменованого експорту.
- **Default import** — імпорт default-експорту.
- **Alias** — перейменування імпорту або експорту.
- Комбінація `default` та `named` exports в одному модулі.

Ця тема особливо важлива для:

- організації великих JavaScript-проєктів;
- React / Next.js;
- Node.js;
- TypeScript;
- створення власних бібліотек;
- побудови зрозумілої module architecture.

---

# Ключові поняття

| Поняття | Значення |
|---|---|
| `export` | робить значення доступним з іншого модуля |
| `export default` | головний/default експорт модуля |
| `import { ... }` | імпорт named exports |
| `import name from` | імпорт default export |
| `as` | створює alias |
| Named export | має конкретне ім'я |
| Default export | один основний експорт модуля |
| Module API | те, що модуль відкриває назовні |
| `export { ... }` | експорт уже створених значень |
| `export { ... } from` | re-export з іншого модуля |

---

# Що потрібно пам'ятати

1. `export` створює **named export**.
2. `export default` створює **default export**.
3. В одному модулі може бути багато named exports.
4. В одному модулі може бути лише один default export.
5. Named import використовує `{}`.
6. Default import не використовує `{}`.
7. Ім'я named export при імпорті повинно відповідати експортованому імені, якщо не використовується `as`.
8. Default export можна імпортувати під будь-яким локальним ім'ям.
9. Один модуль може одночасно мати `default` і named exports.
10. `default` — це не "найважливіше значення" технічно, а спеціальний тип експорту.
11. Для API модуля важливо думати не тільки про код, а й про те, **що модуль дозволяє імпортувати назовні**.
12. У великих проєктах важливо мати послідовну стратегію: де використовувати named exports, а де default exports.

---

# 1. Named Export

Named export — це експорт значення з конкретним ім'ям.

## Варіант 1 — export під час оголошення

    // math.js

    export const add = (a, b) => {
        return a + b;
    };

    export const subtract = (a, b) => {
        return a - b;
    };

Тепер модуль має два named exports:

- `add`
- `subtract`

Імпорт:

    // app.js

    import { add, subtract } from "./math.js";

    console.log(add(2, 3));
    console.log(subtract(5, 2));

---

# 2. Named Export через export { }

Можна спочатку створити значення, а потім експортувати його.

    // math.js

    const add = (a, b) => a + b;

    const subtract = (a, b) => a - b;

    export {
        add,
        subtract
    };

Це еквівалентно:

    export const add = (a, b) => a + b;
    export const subtract = (a, b) => a - b;

Такий варіант може бути зручним, коли хочеться чітко бачити API модуля в одному місці.

---

# 3. Named Import

Named exports імпортуються через `{}`.

    // math.js

    export const add = (a, b) => a + b;
    export const multiply = (a, b) => a * b;

    // app.js

    import { add, multiply } from "./math.js";

    console.log(add(2, 3));
    console.log(multiply(2, 3));

Фігурні дужки означають:

> "Візьми конкретні named exports з цього модуля".

---

# 4. Імена Named Exports мають значення

Якщо модуль експортує:

    export const add = (a, b) => a + b;

то стандартний імпорт:

    import { add } from "./math.js";

Правильно.

А:

    import { sum } from "./math.js";

не знайде `sum`, тому що такого named export немає.

---

# 5. Перейменування Named Import

За допомогою `as` можна створити локальний alias.

    // math.js

    export const add = (a, b) => a + b;

    // app.js

    import { add as sum } from "./math.js";

Тепер всередині `app.js` функція називається `sum`.

    console.log(sum(2, 3));

Але в `math.js` вона все ще називається `add`.

Тобто:

    add → export name
    sum → local name

---

# 6. Коли потрібен Alias

Alias корисний, коли:

- назви конфліктують;
- назва в конкретному файлі повинна бути зрозумілішою;
- імпортується кілька функцій з різних модулів з однаковими назвами.

Наприклад:

    // user-api.js

    export const create = () => {
        // ...
    };

    // product-api.js

    export const create = () => {
        // ...
    };

Імпорт:

    import { create as createUser } from "./user-api.js";
    import { create as createProduct } from "./product-api.js";

Тепер:

    createUser();
    createProduct();

---

# 7. Default Export

Default export — спеціальний експорт, який позначається словом `default`.

    // User.js

    export default class User {
        constructor(name) {
            this.name = name;
        }
    }

Імпорт:

    import User from "./User.js";

Тут немає `{}`.

---

# 8. Default Export Функції

    // greet.js

    export default function greet(name) {
        return `Hello, ${name}!`;
    }

Імпорт:

    import greet from "./greet.js";

    console.log(greet("Valeriy"));

---

# 9. Default Export Значення

Default export може бути не тільки функцією або класом.

    // config.js

    const config = {
        apiUrl: "https://example.com",
        timeout: 5000
    };

    export default config;

Імпорт:

    import config from "./config.js";

    console.log(config.apiUrl);

---

# 10. Default Export можна імпортувати під іншим ім'ям

Це одна з головних відмінностей default export.

Модуль:

    // calculator.js

    export default function calculate(a, b) {
        return a + b;
    }

Можна написати:

    import calculate from "./calculator.js";

Або:

    import add from "./calculator.js";

Або:

    import sum from "./calculator.js";

Усі ці імпорти звертаються до одного default export.

Тобто default export не вимагає збереження імені.

---

# 11. Named vs Default

Основна різниця:

    // Named
    export const add = () => {};

    import { add } from "./math.js";

і:

    // Default
    export default function add() {};

    import add from "./math.js";

У першому випадку ім'я `add` є частиною module API.

У другому випадку `add` — це локальне ім'я імпортованого default export.

---

# 12. Default Export та Named Export разом

Один модуль може мати одночасно:

- один default export;
- багато named exports.

Наприклад:

    // math.js

    export default function calculate(a, b) {
        return a + b;
    }

    export const add = (a, b) => a + b;

    export const subtract = (a, b) => a - b;

    export const multiply = (a, b) => a * b;

Імпорт:

    import calculate, {
        add,
        subtract,
        multiply
    } from "./math.js";

Використання:

    calculate(2, 3);

    add(2, 3);
    subtract(5, 2);
    multiply(2, 4);

---

# 13. Default Import + Named Imports

Такий синтаксис дуже поширений:

    import React, {
        useState,
        useEffect
    } from "react";

Тут:

    React → default import

    useState → named import

    useEffect → named import

Загальна форма:

    import defaultName, {
        named1,
        named2
    } from "./module.js";

---

# 14. Тільки Default Import

    import calculate from "./calculator.js";

---

# 15. Тільки Named Imports

    import {
        add,
        subtract
    } from "./math.js";

---

# 16. Default + Named

    import calculate, {
        add,
        subtract
    } from "./math.js";

---

# 17. Кілька Named Imports з Alias

    import {
        add as sum,
        subtract as difference
    } from "./math.js";

Тепер:

    sum(10, 5);
    difference(10, 5);

---

# 18. Export Alias

Alias можна створювати не тільки під час імпорту.

Наприклад:

    const add = (a, b) => a + b;

    export {
        add as sum
    };

Імпортувати потрібно вже `sum`:

    import { sum } from "./math.js";

Тут:

    add → внутрішнє ім'я

    sum → ім'я експорту

---

# 19. Default Export через export { }

Default export можна створити через спеціальний синтаксис:

    const calculate = (a, b) => a + b;

    export {
        calculate as default
    };

Це еквівалентно:

    export default calculate;

---

# 20. Named Export з кількома значеннями

Наприклад:

    const API_URL = "https://api.example.com";

    const getUsers = async () => {
        // ...
    };

    const getUser = async (id) => {
        // ...
    };

    export {
        API_URL,
        getUsers,
        getUser
    };

Імпорт:

    import {
        API_URL,
        getUsers,
        getUser
    } from "./api.js";

---

# 21. Module API

Дуже важливе поняття — **Module API**.

Module API — це набір значень, які модуль відкриває для інших модулів.

Наприклад:

    // user-service.js

    const validateUser = () => {
        // internal logic
    };

    const createUser = () => {
        // ...
    };

    const deleteUser = () => {
        // ...
    };

    export {
        createUser,
        deleteUser
    };

Тут:

    validateUser

не є частиною публічного API модуля.

А:

    createUser
    deleteUser

є частиною API.

Це дозволяє приховувати внутрішню реалізацію.

---

# 22. Public vs Internal

Можна мислити так:

    module
    │
    ├── internal code
    │
    └── public API
          ├── createUser
          └── deleteUser

Не все, що існує всередині файлу, повинно експортуватися.

Це важливий принцип модульності:

> Експортуй тільки те, що повинно бути доступним зовні.

---

# 23. Default Export як основний API модуля

Default export часто використовують, коли модуль має одну головну відповідальність.

Наприклад:

    // UserService.js

    class UserService {
        // ...
    }

    export default UserService;

Імпорт:

    import UserService from "./UserService.js";

Можна читати це як:

> Цей файл представляє один основний об'єкт — `UserService`.

---

# 24. Named Exports для набору функцій

Named exports часто зручні, коли модуль містить групу пов'язаних операцій.

Наприклад:

    // user-utils.js

    export const validateEmail = (email) => {
        // ...
    };

    export const normalizeName = (name) => {
        // ...
    };

    export const formatUserName = (user) => {
        // ...
    };

Тут немає одного очевидного "головного" значення.

Тому named exports добре описують API:

    validateEmail
    normalizeName
    formatUserName

---

# 25. Типова структура модуля

Наприклад:

    // user.js

    const validateUser = (user) => {
        return Boolean(user.name);
    };

    const createUser = (name) => {
        return {
            id: Date.now(),
            name
        };
    };

    const deleteUser = (id) => {
        console.log(`Delete user ${id}`);
    };

    export {
        createUser,
        deleteUser
    };

Зовнішній код бачить тільки:

    createUser
    deleteUser

А `validateUser` залишається внутрішньою деталлю.

---

# 26. Named Export — багато API

Приклад:

    // string-utils.js

    export const capitalize = (value) => {
        return value[0].toUpperCase() + value.slice(1);
    };

    export const reverse = (value) => {
        return [...value].reverse().join("");
    };

    export const truncate = (value, length) => {
        return value.length > length
            ? `${value.slice(0, length)}...`
            : value;
    };

Імпорт:

    import {
        capitalize,
        reverse,
        truncate
    } from "./string-utils.js";

---

# 27. Default Export — один основний API

Наприклад:

    // logger.js

    class Logger {
        info(message) {
            console.log(message);
        }

        error(message) {
            console.error(message);
        }
    }

    export default Logger;

Імпорт:

    import Logger from "./logger.js";

---

# 28. Default Export не означає "є тільки один export"

Можна мати:

    export default function createUser() {
        // ...
    }

    export const USER_ROLE = "user";

    export const ADMIN_ROLE = "admin";

Тобто:

    default → 1

    named → багато

---

# 29. Скільки default exports може бути?

В одному модулі:

    export default first;

    export default second;

Так робити не можна.

Модуль може мати тільки один default export.

Правильно:

    export default first;

А додаткові значення:

    export const second = ...;

---

# 30. Скільки Named Exports може бути?

Named exports може бути багато:

    export const one = 1;
    export const two = 2;
    export const three = 3;
    export const four = 4;

Це нормально.

---

# 31. Named і Default: синтаксична різниця

## Named

    export const value = 10;

    import { value } from "./module.js";

## Default

    export default 10;

    import value from "./module.js";

Зверни увагу:

    { value }

проти:

    value

---

# 32. Часті помилки з Named Export

## Помилка 1 — забуті `{}`

Якщо:

    export const add = (a, b) => a + b;

то неправильно:

    import add from "./math.js";

Правильно:

    import { add } from "./math.js";

---

# 33. Часті помилки з Default Export

Якщо:

    export default function calculate() {
        // ...
    }

то неправильно:

    import { calculate } from "./calculator.js";

Правильно:

    import calculate from "./calculator.js";

---

# 34. Не плутати ім'я default export з ім'ям import

Наприклад:

    export default function calculate() {
        return 10;
    }

Можна:

    import calculate from "./calculator.js";

або:

    import run from "./calculator.js";

або:

    import operation from "./calculator.js";

Усі три звертаються до одного default export.

Але для читабельності краще вибирати ім'я, яке відповідає призначенню.

---

# 35. Named Export має стабільне ім'я

Наприклад:

    export const calculate = () => {
        // ...
    };

Імпорт:

    import { calculate } from "./calculator.js";

Або:

    import { calculate as run } from "./calculator.js";

Без alias:

    calculate

З alias:

    run

---

# 36. Default vs Named — практичне порівняння

| Особливість | Named | Default |
|---|---|---|
| Кількість | багато | один |
| `{}` при import | так | ні |
| Ім'я є частиною export API | так | спеціальне `default` |
| Можна перейменувати | через `as` | локальне ім'я вибирається при import |
| Добре для набору функцій | так | не основне призначення |
| Добре для одного основного значення | можливо | так |
| Можна разом в одному модулі | так | так |

---

# 37. Коли використовувати Named Exports

Named exports особливо зручні для:

- utility functions;
- constants;
- validation functions;
- API functions;
- hooks;
- helper functions;
- наборів пов'язаних функцій.

Наприклад:

    export const formatDate = () => {};
    export const formatCurrency = () => {};
    export const formatNumber = () => {};

---

# 38. Коли використовувати Default Export

Default export зручний, коли файл представляє одну основну сутність:

- class;
- component;
- service;
- main function;
- configuration object;
- один основний об'єкт.

Наприклад:

    export default class UserService {
        // ...
    }

---

# 39. Не існує абсолютного правила

Не потрібно запам'ятовувати:

> "Default завжди правильний для класів."

або:

> "Named завжди кращий."

Це питання архітектури проєкту.

Головне:

- розуміти різницю;
- використовувати послідовний стиль;
- не створювати хаотичний API модулів.

---

# 40. Приклад реального модуля

    // user-service.js

    const users = [];

    const validateUser = (name) => {
        return typeof name === "string" && name.length > 0;
    };

    const createUser = (name) => {
        if (!validateUser(name)) {
            throw new Error("Invalid user name");
        }

        const user = {
            id: Date.now(),
            name
        };

        users.push(user);

        return user;
    };

    const getUsers = () => {
        return [...users];
    };

    const clearUsers = () => {
        users.length = 0;
    };

    export {
        createUser,
        getUsers,
        clearUsers
    };

Тут:

    validateUser

залишається внутрішньою функцією.

А назовні доступні:

    createUser
    getUsers
    clearUsers

Це хороший приклад контролю module API.

---

# 41. Default + Named у практичному модулі

    // user-service.js

    class UserService {
        create(name) {
            // ...
        }

        remove(id) {
            // ...
        }
    }

    export default UserService;

    export const USER_ROLE = "user";
    export const ADMIN_ROLE = "admin";

Імпорт:

    import UserService, {
        USER_ROLE,
        ADMIN_ROLE
    } from "./user-service.js";

---

# 42. Іменування файлів

У реальних проєктах часто зустрічаються:

    user.js
    user-service.js
    userService.js

Для компонентів:

    User.jsx
    User.tsx

Для utility-модулів:

    string-utils.js
    date-utils.js

Важливіше за конкретний стиль — **послідовність у всьому проєкті**.

---

# 43. Default Export і React

У React часто можна побачити:

    export default function UserCard() {
        return <div>User</div>;
    }

Імпорт:

    import UserCard from "./UserCard";

Також можливий named export:

    export function UserCard() {
        return <div>User</div>;
    }

Імпорт:

    import { UserCard } from "./UserCard";

Обидва підходи валідні.

---

# 44. Default Export і Next.js

У Next.js можна зустріти:

    export default function Page() {
        return <main>Home</main>;
    }

Тут default export має ще й особливе значення для framework convention.

Тобто іноді вибір `default` визначається не тільки особистим стилем, а й API конкретного framework.

---

# 45. Export Constants

Named exports дуже зручні для constants.

    // constants.js

    export const API_URL = "https://api.example.com";

    export const MAX_USERS = 100;

    export const DEFAULT_PAGE = 1;

Імпорт:

    import {
        API_URL,
        MAX_USERS,
        DEFAULT_PAGE
    } from "./constants.js";

---

# 46. Export Functions

    // calculations.js

    export const add = (a, b) => a + b;

    export const subtract = (a, b) => a - b;

    export const multiply = (a, b) => a * b;

---

# 47. Export Classes

Named:

    export class User {
        constructor(name) {
            this.name = name;
        }
    }

Імпорт:

    import { User } from "./User.js";

Default:

    export default class User {
        constructor(name) {
            this.name = name;
        }
    }

Імпорт:

    import User from "./User.js";

---

# 48. Export Object

Named:

    export const config = {
        apiUrl: "https://example.com",
        timeout: 5000
    };

Імпорт:

    import { config } from "./config.js";

Default:

    const config = {
        apiUrl: "https://example.com",
        timeout: 5000
    };

    export default config;

Імпорт:

    import config from "./config.js";

---

# 49. Re-export

Можна експортувати імпортоване значення далі.

Наприклад:

    // math.js

    export const add = (a, b) => a + b;

І:

    // index.js

    export { add } from "./math.js";

Тепер інший файл може імпортувати:

    import { add } from "./index.js";

Це основа для створення **barrel modules**.

---

# 50. Re-export з Alias

    export {
        add as sum
    } from "./math.js";

Тепер:

    import { sum } from "./index.js";

---

# 51. Re-export кількох Named Exports

    export {
        add,
        subtract,
        multiply
    } from "./math.js";

---

# 52. Re-export усіх Named Exports

    export * from "./math.js";

Це означає:

> Експортуй named exports цього модуля.

Але default export через `export *` автоматично не передається.

---

# 53. Default Re-export

Можна явно re-export default:

    export { default } from "./User.js";

Або перейменувати:

    export {
        default as User
    } from "./User.js";

---

# 54. Barrel Module

Barrel module — файл, який збирає exports з декількох модулів.

Наприклад:

    components/
    ├── Button.js
    ├── Input.js
    ├── Modal.js
    └── index.js

`index.js`:

    export { default as Button } from "./Button.js";
    export { default as Input } from "./Input.js";
    export { default as Modal } from "./Modal.js";

Тепер можна:

    import {
        Button,
        Input,
        Modal
    } from "./components/index.js";

Замість:

    import Button from "./components/Button.js";
    import Input from "./components/Input.js";
    import Modal from "./components/Modal.js";

---

# 55. Module API через index.js

Barrel може виступати як public API папки:

    components/
    │
    ├── Button.js
    ├── Input.js
    ├── Modal.js
    │
    └── index.js
           │
           └── public API

Зовнішній код працює з:

    import {
        Button,
        Input,
        Modal
    } from "./components/index.js";

А внутрішня структура папки може змінюватися.

---

# 56. Side-effect Import

Можна імпортувати модуль без конкретного значення:

    import "./styles.css";

Або:

    import "./initialize.js";

Це означає:

> Завантажити модуль і виконати його side effects.

Наприклад:

    // initialize.js

    console.log("Application initialized");

І:

    import "./initialize.js";

---

# 57. Named Export vs Default Export — спосіб мислення

Корисно думати так:

### Named

> "Ось набір конкретних речей, які я хочу відкрити."

    export {
        add,
        subtract,
        multiply
    };

### Default

> "Ось основна сутність цього модуля."

    export default UserService;

Це не жорстке правило, а корисна ментальна модель.

---

# 58. Типова структура маленького JavaScript-проєкту

    src/
    ├── api/
    │   ├── users.js
    │   └── products.js
    │
    ├── utils/
    │   ├── date.js
    │   └── format.js
    │
    ├── services/
    │   └── user-service.js
    │
    └── main.js

Наприклад:

    // utils/format.js

    export const formatCurrency = (value) => {
        return `${value.toFixed(2)} $`;
    };

    // services/user-service.js

    export default class UserService {
        // ...
    };

    // main.js

    import { formatCurrency } from "./utils/format.js";
    import UserService from "./services/user-service.js";

---

# 59. Публічний та приватний код модуля

Наприклад:

    // database.js

    const connection = createConnection();

    const validateConnection = () => {
        // internal logic
    };

    export const query = (sql) => {
        validateConnection();

        return connection.query(sql);
    };

Зовнішній код не має прямого доступу до:

    connection
    validateConnection

Це дозволяє приховувати реалізацію.

---

# 60. Важлива ідея: Encapsulation

Modules допомагають реалізувати **encapsulation**.

Модуль:

    internal implementation
            ↓
       public API
            ↓
      other modules

Інші частини програми не повинні знати всі внутрішні деталі.

---

# 61. Типові помилки

## 1. Плутати default та named import

    export default User;

    import { User } from "./User.js";

Неправильно.

Правильно:

    import User from "./User.js";

---

## 2. Забути `{}` для named export

    export const add = () => {};

    import add from "./math.js";

Неправильно.

Правильно:

    import { add } from "./math.js";

---

## 3. Використовувати неправильне ім'я named export

    export const calculate = () => {};

    import { calc } from "./math.js";

Неправильно, якщо alias не визначений.

Правильно:

    import { calculate as calc } from "./math.js";

---

## 4. Створити два default exports

    export default first;
    export default second;

Так не можна.

---

## 5. Надмірно експортувати внутрішню реалізацію

Не потрібно робити:

    export {
        validateUser,
        normalizeName,
        createUser,
        saveUser,
        deleteUser,
        internalHelper
    };

якщо частина цих функцій потрібна тільки всередині модуля.

Краще залишати public API мінімальним.

---

## 6. Хаотично змішувати стилі

Наприклад, в одному проєкті:

    export default ...
    export default ...
    export const ...
    export function ...
    module.exports = ...
    exports.foo = ...

Без зрозумілої причини це створює плутанину.

У сучасному JavaScript-проєкті бажано мати послідовну стратегію модулів.

---

# 62. ES Modules vs CommonJS

У сучасному JavaScript існують дві важливі системи модулів.

## ES Modules

    export const add = (a, b) => a + b;

    import { add } from "./math.js";

## CommonJS

    module.exports = {
        add
    };

    const {
        add
    } = require("./math");

Для сучасних frontend-проєктів:

    React
    Next.js
    Vite
    сучасний browser JavaScript

основною моделлю є **ES Modules**.

Node.js також підтримує ES Modules.

CommonJS залишається важливим для розуміння існуючих Node.js-проєктів та старішого ecosystem code.

---

# 63. `export default` не означає singleton

Наприклад:

    export default class User {}

Це не означає, що JavaScript створює один об'єкт `User`.

Це означає лише:

> клас `User` є default export цього модуля.

---

# 64. Default export — це спеціальне ім'я `default`

Концептуально можна думати про модуль як про набір exports:

    {
        default: ...,
        add: ...,
        subtract: ...
    }

Але `default` має спеціальний синтаксис.

Тому:

    import calculate from "./math.js";

можна концептуально розглядати як отримання:

    default

А:

    import { add } from "./math.js";

як отримання:

    add

---

# 65. Взаємодія з module namespace

Можна імпортувати весь module namespace:

    import * as math from "./math.js";

Якщо:

    export const add = (a, b) => a + b;
    export const subtract = (a, b) => a - b;

то:

    math.add(2, 3);
    math.subtract(5, 2);

Це буде докладніше розглядатися в темі про module namespace imports.

---

# 66. Практичний приклад: API

    // api.js

    const API_URL = "https://api.example.com";

    const request = async (url) => {
        const response = await fetch(`${API_URL}${url}`);

        if (!response.ok) {
            throw new Error("Request failed");
        }

        return response.json();
    };

    export const getUsers = () => {
        return request("/users");
    };

    export const getUser = (id) => {
        return request(`/users/${id}`);
    };

Тут:

    API_URL
    request

є внутрішніми деталями.

А:

    getUsers
    getUser

є public API.

---

# 67. Практичний приклад: utility module

    // number-utils.js

    const validateNumber = (value) => {
        return typeof value === "number" && !Number.isNaN(value);
    };

    export const double = (value) => {
        if (!validateNumber(value)) {
            throw new TypeError("Expected number");
        }

        return value * 2;
    };

    export const square = (value) => {
        if (!validateNumber(value)) {
            throw new TypeError("Expected number");
        }

        return value ** 2;
    };

Зовнішній код бачить:

    double
    square

А:

    validateNumber

залишається implementation detail.

---

# 68. Практичний приклад: Service

    // UserService.js

    class UserService {
        getUser(id) {
            // ...
        }

        createUser(data) {
            // ...
        }

        deleteUser(id) {
            // ...
        }
    }

    export default UserService;

Використання:

    import UserService from "./UserService.js";

    const userService = new UserService();

---

# 69. Практичний приклад: constants + functions

    // cart.js

    export const MAX_ITEMS = 50;

    export const addItem = (cart, item) => {
        if (cart.length >= MAX_ITEMS) {
            throw new Error("Cart is full");
        }

        return [...cart, item];
    };

    export const removeItem = (cart, itemId) => {
        return cart.filter(item => item.id !== itemId);
    };

Імпорт:

    import {
        MAX_ITEMS,
        addItem,
        removeItem
    } from "./cart.js";

---

# 70. Що важливо для TypeScript

У TypeScript ця сама модель використовується постійно:

    export interface User {
        id: number;
        name: string;
    }

    export const createUser = (name: string): User => {
        return {
            id: Date.now(),
            name
        };
    };

Імпорт:

    import {
        User,
        createUser
    } from "./user.js";

А також:

    export default class UserService {
        // ...
    }

І:

    import UserService from "./UserService.js";

Тому хороше розуміння ES Modules у JavaScript безпосередньо переноситься на TypeScript.

---

# 71. Рекомендований стиль для навчальних проєктів

Для utility-модулів:

    export const add = ...
    export const subtract = ...

Для constants:

    export const API_URL = ...
    export const MAX_USERS = ...

Для модуля з однією основною сутністю:

    export default class UserService {}

Для React-компонента:

    export default function UserCard() {}

Але головне — **послідовність у межах конкретного проєкту**.

---

# 72. Як читати import

Якщо бачиш:

    import UserService, {
        USER_ROLE,
        createUser
    } from "./user.js";

читай це так:

    UserService → default export

    USER_ROLE → named export

    createUser → named export

---

# 73. Як читати export

Якщо бачиш:

    export default UserService;

це означає:

    UserService → default API

Якщо:

    export {
        createUser,
        deleteUser
    };

це означає:

    createUser → named API
    deleteUser → named API

---

# 74. Просте правило для запам'ятовування

Запам'ятай:

    export default value;

імпортується:

    import value from "./module.js";

А:

    export const value = ...;

імпортується:

    import { value } from "./module.js";

Тобто:

    default → без {}

    named → з {}

---

# 75. Що потрібно вміти після цієї теми

Ти повинен вміти без підказки:

- створити named export;
- створити default export;
- імпортувати named export;
- імпортувати default export;
- використовувати кілька named exports;
- комбінувати default + named imports;
- використовувати `as`;
- створювати export alias;
- розуміти public module API;
- приховувати internal implementation;
- робити re-export;
- розуміти barrel module;
- відрізняти ES Modules від CommonJS.

---

# Типові питання зі співбесіди

### 1. Чим відрізняється named export від default export?

**Named export:**

    export const add = () => {};

    import { add } from "./math.js";

**Default export:**

    export default function add() {};

    import add from "./math.js";

Named exports мають імена в module API, default export є спеціальним default-значенням модуля.

---

### 2. Скільки default exports може бути в модулі?

Один.

---

### 3. Скільки named exports може бути?

Багато.

---

### 4. Чому для named import використовуються `{}`?

Тому що імпортується конкретне named export за його export-іменем.

    import { add } from "./math.js";

---

### 5. Чому default import не використовує `{}`?

Тому що імпортується спеціальний default export:

    import add from "./math.js";

---

### 6. Чи можна змінити ім'я default import?

Так.

    export default function calculate() {}

    import sum from "./calculator.js";

`sum` — локальне ім'я.

---

### 7. Чи можна змінити ім'я named import?

Так, через `as`.

    import {
        calculate as sum
    } from "./calculator.js";

---

### 8. Чи можна мати default і named exports одночасно?

Так.

    export default UserService;

    export const USER_ROLE = "user";

---

### 9. Чи є default export обов'язковим?

Ні.

Модуль може містити тільки named exports.

---

### 10. Чи може модуль не мати exports?

Так.

Такий модуль може виконувати side effects.

    console.log("Module loaded");

---

### 11. Що таке module API?

Це набір значень, які модуль відкриває через exports для інших модулів.

---

### 12. Навіщо приховувати internal implementation?

Щоб:

- зменшити зв'язність;
- спростити використання модуля;
- захистити внутрішню реалізацію;
- полегшити рефакторинг;
- зробити API зрозумілішим.

---

### 13. Що таке barrel module?

Модуль, який збирає та re-export-ить exports з інших модулів.

Наприклад:

    export { default as Button } from "./Button.js";
    export { default as Input } from "./Input.js";

---

### 14. Чи передає `export *` default export?

Ні.

`export *` передає named exports, але не default export.

---

# Шлях вивчення

## Core

Потрібно знати:

- `export`
- `export default`
- `import`
- named exports
- default exports
- `{}` у named import
- різницю між default і named
- один default vs багато named

Приклад:

    // math.js

    export const add = (a, b) => a + b;

    export default function calculate(a, b) {
        return a + b;
    }

    // app.js

    import calculate, {
        add
    } from "./math.js";

---

## Junior

Потрібно вміти:

- використовувати aliases;
- будувати module API;
- приховувати internal implementation;
- комбінувати default + named exports;
- організовувати utility modules;
- створювати constants modules;
- створювати service modules;
- використовувати re-export.

Приклад:

    import UserService, {
        USER_ROLE,
        ADMIN_ROLE
    } from "./user-service.js";

---

## Middle

Потрібно розуміти:

- module boundaries;
- public API;
- encapsulation;
- barrel modules;
- dependency graph;
- re-export architecture;
- циклічні залежності;
- вплив структури exports на підтримку проєкту;
- trade-offs default vs named exports;
- ES Modules architecture у великих проєктах.

---

## Senior

Потрібно розуміти:

- architecture boundaries;
- package public API;
- API stability;
- module coupling;
- dependency direction;
- circular dependencies;
- package entry points;
- tree shaking;
- bundler behavior;
- library design;
- compatibility між ESM та CommonJS;
- монорепозиторні package boundaries.

---

# Міні-шпаргалка

    // =========================
    // NAMED EXPORT
    // =========================

    export const add = (a, b) => a + b;

    export function subtract(a, b) {
        return a - b;
    }

    import {
        add,
        subtract
    } from "./math.js";


    // =========================
    // DEFAULT EXPORT
    // =========================

    export default function calculate(a, b) {
        return a + b;
    }

    import calculate from "./calculate.js";


    // =========================
    // DEFAULT + NAMED
    // =========================

    export default UserService;

    export const USER_ROLE = "user";
    export const ADMIN_ROLE = "admin";

    import UserService, {
        USER_ROLE,
        ADMIN_ROLE
    } from "./user-service.js";


    // =========================
    // NAMED ALIAS
    // =========================

    import {
        calculate as sum
    } from "./math.js";


    // =========================
    // EXPORT ALIAS
    // =========================

    export {
        calculate as sum
    };


    // =========================
    // RE-EXPORT
    // =========================

    export {
        add,
        subtract
    } from "./math.js";


    // =========================
    // RE-EXPORT DEFAULT
    // =========================

    export {
        default as UserService
    } from "./UserService.js";


    // =========================
    // RE-EXPORT ALL NAMED
    // =========================

    export * from "./math.js";


    // =========================
    // SIDE EFFECT IMPORT
    // =========================

    import "./initialize.js";

---

# Головна ментальна модель

Модуль можна уявляти як коробку:

    ┌─────────────────────────────┐
    │          module             │
    │                             │
    │   internal implementation   │
    │                             │
    │   ┌─────────────────────┐   │
    │   │     public API      │   │
    │   │                     │   │
    │   │  default            │   │
    │   │  named exports      │   │
    │   └─────────────────────┘   │
    │                             │
    └─────────────────────────────┘
                 │
                 ↓
             import

Головна ідея:

> **Модуль не повинен відкривати весь свій код. Він відкриває чітко визначений public API через exports.**

---

# Головне

1. **Named export** має конкретне ім'я.

2. **Default export** — спеціальний default export модуля.

3. Named import:

       import { add } from "./math.js";

4. Default import:

       import add from "./math.js";

5. Один модуль може мати:

       1 default export
       +
       багато named exports

6. Named import можна перейменувати:

       import { add as sum } from "./math.js";

7. Default import можна локально назвати будь-як:

       import calculate from "./math.js";

       import sum from "./math.js";

8. Не все всередині модуля повинно бути exported.

9. **Exports формують public API модуля.**

10. Named exports особливо зручні для набору пов'язаних функцій, constants та utilities.

11. Default export часто зручний для однієї основної сутності модуля.

12. `export { ... } from` використовується для re-export.

13. `export * from` re-export-ить named exports, але не default.

14. Розуміння `default` / `named` exports є фундаментом для:

       React
       Next.js
       Node.js
       TypeScript
       npm packages
       module architecture

15. Найважливіше правило для пам'яті:

       default → без {}

       named → з {}

       export default value;
       import value from "./module.js";

       export const value = ...;
       import { value } from "./module.js";

---

# Наступний крок

Після розуміння `default` і `named` exports логічно перейти до:

    04-module-architecture

де вже варто розглядати не окремий синтаксис `import/export`, а **як правильно будувати структуру модулів у реальному JavaScript-проєкті**:

    modules
    ↓
    public API
    ↓
    dependencies
    ↓
    module boundaries
    ↓
    barrel modules
    ↓
    application architecture