# 04. Module Architecture

**Module Architecture** — це організація JavaScript-коду на окремі модулі з чіткими відповідальностями, залежностями та публічними API.

На попередніх темах ми розглядали:

    export
    import
    default export
    named export
    alias
    re-export

Тепер наступний рівень:

> Не просто знати, як імпортувати та експортувати код, а розуміти, **як правильно розділяти застосунок на модулі**.

Це вже перехід від синтаксису JavaScript до архітектурного мислення.

---

# Ключові поняття

| Поняття | Значення |
|---|---|
| Module | окрема одиниця коду з власною відповідальністю |
| Module API | те, що модуль відкриває назовні |
| Dependency | модуль, від якого залежить інший модуль |
| Dependency Graph | граф залежностей між модулями |
| Encapsulation | приховування внутрішньої реалізації |
| Cohesion | наскільки добре код модуля пов'язаний однією відповідальністю |
| Coupling | наскільки сильно модулі залежать один від одного |
| Module Boundary | межа між відповідальностями модулів |
| Barrel Module | модуль, який збирає exports інших модулів |
| Entry Point | точка входу в модуль / пакет / застосунок |
| Layer | архітектурний рівень |
| Feature Module | модуль, організований навколо функціональності |
| Circular Dependency | циклічна залежність |
| Public API | стабільний інтерфейс модуля для зовнішнього коду |
| Internal Implementation | внутрішня реалізація модуля |

---

# Що потрібно пам'ятати

1. Модуль повинен мати **зрозумілу відповідальність**.
2. Не потрібно робити один величезний модуль.
3. Не потрібно також створювати десятки мікромодулів без потреби.
4. Модуль повинен приховувати непотрібні зовнішньому коду деталі.
5. Через `export` формується public API.
6. Через `import` створюються залежності.
7. Чим більше модулів безпосередньо залежать один від одного, тим складніше підтримувати систему.
8. Сильна внутрішня пов'язаність коду — **high cohesion** — зазвичай корисна.
9. Надмірна залежність між модулями — **high coupling** — ускладнює систему.
10. Напрямок залежностей має бути зрозумілим.
11. Циклічних залежностей бажано уникати.
12. Структуру папок краще будувати навколо відповідальностей або features, а не тільки навколо типів файлів.
13. `index.js` може бути public API модуля, але barrel modules не потрібно використовувати бездумно.
14. Архітектура повинна допомагати змінювати код, а не просто красиво виглядати.
15. Хороша module architecture особливо важлива у великих React / Next.js / Node.js / TypeScript проєктах.

---

# 1. Що таке модуль

Модуль — це окрема одиниця програми, яка:

- містить код;
- має власний scope;
- може експортувати значення;
- може імпортувати залежності;
- має певну відповідальність.

Наприклад:

    // math.js

    export const add = (a, b) => a + b;

    export const subtract = (a, b) => a - b;

Це модуль.

Інший модуль:

    // app.js

    import {
        add,
        subtract
    } from "./math.js";

    console.log(add(2, 3));
    console.log(subtract(5, 2));

---

# 2. Модуль як окрема відповідальність

Поганий підхід:

    // app.js

    // database code
    // API code
    // validation
    // DOM manipulation
    // formatting
    // authentication
    // business logic
    // event handlers
    // configuration

Один файл поступово перетворюється на величезний центр усієї програми.

Кращий підхід:

    database.js
    api.js
    validation.js
    formatting.js
    auth.js
    user-service.js
    ui.js
    app.js

Кожен модуль має більш чітку відповідальність.

---

# 3. Single Responsibility

В архітектурі модулів важливо використовувати ідею **Single Responsibility**.

Спрощено:

> Один модуль повинен мати одну основну відповідальність.

Наприклад:

    // date-utils.js

    export const formatDate = (date) => {
        // ...
    };

    export const getStartOfDay = (date) => {
        // ...
    };

Це логічно.

А ось:

    // everything.js

    export const formatDate = () => {};
    export const connectDatabase = () => {};
    export const sendEmail = () => {};
    export const validatePassword = () => {};
    export const renderButton = () => {};

це вже ознака поганої організації.

---

# 4. Cohesion

**Cohesion** — наскільки сильно пов'язані між собою елементи одного модуля.

High cohesion:

    // user-utils.js

    export const normalizeUserName = () => {};
    export const validateUserName = () => {};
    export const formatUserName = () => {};

Функції працюють навколо однієї предметної області.

Low cohesion:

    // utils.js

    export const formatDate = () => {};
    export const calculateTax = () => {};
    export const connectDatabase = () => {};
    export const createButton = () => {};

Тут функції майже не пов'язані між собою.

---

# 5. Coupling

**Coupling** — рівень залежності одного модуля від іншого.

Наприклад:

    // A.js

    import { value } from "./B.js";

    // B.js

    import { otherValue } from "./C.js";

    // C.js

    import { anotherValue } from "./D.js";

Маємо ланцюжок:

    A
    ↓
    B
    ↓
    C
    ↓
    D

Це dependency chain.

Сам по собі ланцюжок не є помилкою.

Проблема виникає, коли залежності стають:

- надто численними;
- заплутаними;
- циклічними;
- важкими для заміни;
- важкими для тестування.

---

# 6. Cohesion vs Coupling

Запам'ятай:

    High cohesion
    ↓
    добре пов'язані елементи всередині модуля

    Low coupling
    ↓
    мінімально необхідні залежності між модулями

Архітектурна ціль:

> **High cohesion + Low coupling**

---

# 7. Module Boundary

**Module boundary** — межа між відповідальностями модулів.

Наприклад:

    users/
    ├── user-service.js
    ├── user-validation.js
    └── user-repository.js

Можна визначити:

    user-service
    ↓
    business logic

    user-validation
    ↓
    validation

    user-repository
    ↓
    data access

Це створює зрозумілі межі.

---

# 8. Public API модуля

Модуль не повинен відкривати все.

Наприклад:

    // user-service.js

    const validateUser = (user) => {
        // internal
    };

    const saveUser = (user) => {
        // internal
    };

    export const createUser = (data) => {
        validateUser(data);
        return saveUser(data);
    };

Назовні відкривається:

    createUser

А:

    validateUser
    saveUser

залишаються внутрішніми.

Це і є контроль public API.

---

# 9. Internal Implementation

Внутрішня реалізація може змінюватися без зміни зовнішнього API.

Сьогодні:

    export const createUser = (data) => {
        validateUser(data);
        return saveUser(data);
    };

Завтра:

    export const createUser = async (data) => {
        await validateUser(data);
        return repository.insert(data);
    };

Якщо зовнішній API залишився:

    createUser(data)

то інші модулі можуть не знати про внутрішні зміни.

---

# 10. Dependency

Якщо:

    // user-service.js

    import {
        validateUser
    } from "./validation.js";

то:

    user-service.js

залежить від:

    validation.js

Можна записати:

    user-service
        ↓
    validation

---

# 11. Dependency Graph

У реальному застосунку залежностей багато.

Наприклад:

    app
    ├── user-service
    │   ├── validation
    │   └── user-repository
    │       └── database
    │
    └── product-service
        ├── validation
        └── product-repository
            └── database

Це **dependency graph**.

Тобто програма фактично утворює граф:

    app
    ├── A
    │   ├── B
    │   └── C
    │
    └── D
        └── C

---

# 12. Чому Dependency Graph важливий

Якщо структура залежностей зрозуміла:

    app
    ↓
    services
    ↓
    repositories
    ↓
    database

легше зрозуміти програму.

Якщо:

    A → B
    B → C
    C → A
    D → B
    B → E
    E → D

архітектура стає значно складнішою.

---

# 13. Dependency Direction

Важливо не тільки те, що модулі залежать один від одного, а й **у якому напрямку**.

Наприклад:

    UI
     ↓
    Service
     ↓
    Repository
     ↓
    Database

Це зрозумілий напрямок:

    presentation
        ↓
    business logic
        ↓
    data access

---

# 14. Простий Layered Architecture

Для навчального full-stack застосунку можна уявляти:

    UI
     ↓
    API
     ↓
    Service
     ↓
    Repository
     ↓
    Database

Наприклад:

    Browser
       ↓
    HTTP API
       ↓
    UserService
       ↓
    UserRepository
       ↓
    PostgreSQL

Це вже основа архітектурного мислення.

---

# 15. UI Layer

UI відповідає за:

- DOM;
- React components;
- user interaction;
- rendering;
- events.

Наприклад:

    // user-form.js

    import {
        createUser
    } from "../services/user-service.js";

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const user = await createUser({
            name: input.value
        });

        renderUser(user);
    });

UI не повинен знати всі деталі роботи бази даних.

---

# 16. Service Layer

Service відповідає за business logic.

    // user-service.js

    import {
        createUserRecord
    } from "../repositories/user-repository.js";

    export const createUser = async (data) => {
        if (!data.name) {
            throw new Error("Name is required");
        }

        return createUserRecord(data);
    };

Service знає про business rules.

---

# 17. Repository Layer

Repository відповідає за роботу з даними.

    // user-repository.js

    import {
        query
    } from "../database.js";

    export const createUserRecord = async (user) => {
        return query(
            "INSERT INTO users (name) VALUES ($1)",
            [user.name]
        );
    };

Repository знає про persistence.

---

# 18. Database Layer

Database module відповідає за connection / query infrastructure.

    // database.js

    import pg from "pg";

    const pool = new pg.Pool({
        // configuration
    });

    export const query = (text, values) => {
        return pool.query(text, values);
    };

Інші модулі не повинні повторювати створення connection pool.

---

# 19. Напрямок залежностей

Добре:

    UI
     ↓
    Service
     ↓
    Repository
     ↓
    Database

Проблемніше:

    UI
     ↕
    Service
     ↕
    Repository
     ↕
    UI

Коли модулі починають залежати один від одного в обидва боки, з'являється ризик circular dependencies.

---

# 20. Circular Dependency

Циклічна залежність:

    A → B
    B → A

Наприклад:

    // user.js

    import {
        formatUser
    } from "./format.js";

    // format.js

    import {
        getUser
    } from "./user.js";

Тепер:

    user
      ↓
    format
      ↓
    user

Це circular dependency.

---

# 21. Чому Circular Dependency небажана

Вона може:

- ускладнювати розуміння коду;
- створювати проблеми під час ініціалізації;
- давати несподівану поведінку;
- ускладнювати тестування;
- робити architecture graph заплутаним.

Не кожна циклічна залежність автоматично ламає програму, але це важливий сигнал для перевірки архітектури.

---

# 22. Як позбутися Circular Dependency

Наприклад:

    A → B
    B → A

можна спробувати винести спільну логіку:

    A → C
    B → C

Наприклад:

    user.js
    format.js
    shared.js

    user → shared
    format → shared

Замість:

    user ↔ format

---

# 23. Shared Module

Якщо два модулі використовують спільну функцію:

    // shared.js

    export const normalizeName = (name) => {
        return name.trim().toLowerCase();
    };

Тоді:

    // user.js

    import {
        normalizeName
    } from "./shared.js";

і:

    // admin.js

    import {
        normalizeName
    } from "./shared.js";

Отримуємо:

    user ─────┐
              ↓
           shared
              ↑
    admin ────┘

---

# 24. Не створюй `utils.js` для всього

Типова проблема:

    utils.js

через деякий час:

    formatDate
    formatCurrency
    validateEmail
    createUser
    calculateTax
    fetchUsers
    saveProduct
    generateToken
    parseCSV
    connectDatabase

Такий файл стає "смітником".

Краще:

    date-utils.js
    currency-utils.js
    validation.js
    user-service.js
    product-service.js
    csv-parser.js

---

# 25. Feature-oriented Architecture

У маленьких проєктах часто починають з:

    components/
    services/
    utils/
    api/

Це **layer-oriented organization**.

А в більших проєктах може бути зручніше:

    users/
    products/
    orders/

Кожна feature має власні модулі.

---

# 26. Feature Module

Наприклад:

    users/
    ├── components/
    │   └── UserCard.js
    ├── user-service.js
    ├── user-api.js
    ├── user-validation.js
    └── index.js

А:

    products/
    ├── components/
    │   └── ProductCard.js
    ├── product-service.js
    ├── product-api.js
    └── index.js

Це feature-oriented organization.

---

# 27. Layer-oriented vs Feature-oriented

## Layer-oriented

    src/
    ├── components/
    ├── services/
    ├── repositories/
    ├── utils/
    └── api/

## Feature-oriented

    src/
    ├── users/
    │   ├── components/
    │   ├── service.js
    │   └── api.js
    │
    └── products/
        ├── components/
        ├── service.js
        └── api.js

Обидва підходи можуть бути правильними.

---

# 28. Коли layer-oriented підходить

Для невеликого застосунку:

    src/
    ├── components/
    ├── services/
    ├── api/
    ├── utils/
    └── main.js

це може бути цілком достатньо.

Не потрібно будувати складну enterprise architecture для маленької вправи.

---

# 29. Коли feature-oriented стає корисним

Коли feature має багато пов'язаного коду:

    users/
    products/
    orders/
    authentication/

Feature-oriented структура дозволяє зберігати пов'язаний код разом.

---

# 30. Feature Boundary

Наприклад:

    users/
    ├── user-service.js
    ├── user-api.js
    ├── user-validation.js
    └── index.js

Зовнішній код може працювати через:

    import {
        createUser
    } from "./users/index.js";

а не знати внутрішню структуру:

    users/user-service.js
    users/user-validation.js
    users/user-api.js

Це створює boundary.

---

# 31. Public API Feature

`index.js`:

    export {
        createUser,
        getUser
    } from "./user-service.js";

Зовнішній код:

    import {
        createUser
    } from "./users/index.js";

Тепер можна змінити:

    user-service.js

або:

    user-validation.js

не змінюючи зовнішній import.

---

# 32. Barrel Module

Barrel module:

    // users/index.js

    export {
        createUser,
        getUser
    } from "./user-service.js";

    export {
        validateUser
    } from "./user-validation.js";

Зовнішній код:

    import {
        createUser,
        getUser,
        validateUser
    } from "./users/index.js";

---

# 33. Перевага Barrel Module

Зовнішній код залежить від:

    users/

а не:

    users/user-service.js
    users/user-validation.js
    users/user-repository.js

Тобто внутрішня структура може бути змінена.

---

# 34. Недолік Barrel Module

Barrel modules теж можуть створювати проблеми.

Наприклад:

    export * from "./user.js";
    export * from "./admin.js";
    export * from "./permissions.js";

Якщо структура стає великою, важче зрозуміти:

- звідки прийшов export;
- які залежності реально використовуються;
- де виникла проблема;
- чи немає circular dependency.

Тому barrel — це інструмент, а не обов'язкова архітектурна вимога.

---

# 35. Entry Point

**Entry point** — файл, з якого починається використання модуля, пакета або застосунку.

Наприклад:

    src/
    ├── index.js
    ├── users/
    └── products/

`index.js`:

    import {
        createUser
    } from "./users/index.js";

    createUser("Valeriy");

Для npm package entry point може бути public API всього пакета.

---

# 36. Application Entry Point

У browser application:

    index.html
        ↓
    main.js
        ↓
    application modules

Наприклад:

    // main.js

    import {
        initApp
    } from "./app.js";

    initApp();

`main.js` — entry point застосунку.

---

# 37. Module API vs Internal Files

Feature:

    users/
    ├── index.js
    ├── service.js
    ├── validation.js
    └── repository.js

Public:

    index.js

Internal:

    service.js
    validation.js
    repository.js

Зовнішній код бажано спрямовувати через:

    users/index.js

---

# 38. Encapsulation на рівні папки

Можна мислити папку як окремий package:

    users/
    │
    ├── public API
    │      ↓
    │    index.js
    │
    └── internal
           ├── service.js
           ├── validation.js
           └── repository.js

Це допомагає контролювати boundaries.

---

# 39. Dependency Inversion — проста модель

Уявімо:

    user-service
        ↓
    PostgreSQL

Тоді service напряму залежить від конкретної database implementation.

В архітектурно складнішому варіанті:

    user-service
        ↓
    repository interface
        ↑
    PostgreSQL repository

Тоді business logic менше прив'язана до конкретної технології.

Для Junior-рівня достатньо розуміти сам принцип:

> Business logic не повинна без потреби знати деталі infrastructure.

---

# 40. Dependency Injection

Залежність можна передавати ззовні.

Наприклад:

    export const createUserService = (repository) => {
        return {
            createUser(data) {
                return repository.create(data);
            }
        };
    };

Використання:

    const userService = createUserService(userRepository);

Тепер service не створює repository сам.

Це полегшує:

- тестування;
- заміну реалізації;
- повторне використання.

---

# 41. Module Factory

Модуль може експортувати factory:

    export const createUserService = (repository) => {
        return {
            createUser(data) {
                return repository.create(data);
            }
        };
    };

Це дозволяє створювати service з різними dependencies.

---

# 42. Pure Module

Модуль може містити чисті функції:

    // math.js

    export const add = (a, b) => a + b;

    export const multiply = (a, b) => a * b;

Такий модуль:

- не має глобального стану;
- не залежить від DOM;
- не залежить від database;
- легко тестується.

---

# 43. Side Effects

Side effect — дія, яка змінює зовнішній стан.

Наприклад:

    console.log("Module loaded");

або:

    localStorage.setItem("theme", "dark");

або:

    document.body.classList.add("dark");

або:

    database.connect();

Модулі з side effects потрібно організовувати обережно.

---

# 44. Pure vs Side-effect Modules

Pure:

    // math.js

    export const add = (a, b) => a + b;

Side effect:

    // analytics.js

    initializeAnalytics();

Різниця важлива для архітектури.

Pure modules простіше:

- тестувати;
- переносити;
- повторно використовувати;
- передбачати.

---

# 45. Configuration Module

Конфігурацію можна винести:

    // config.js

    export const config = {
        apiUrl: "https://api.example.com",
        timeout: 5000
    };

І:

    import {
        config
    } from "./config.js";

Але секрети не повинні просто зберігатися в frontend source code.

Для реальних застосунків використовуються environment variables та відповідні механізми framework/runtime.

---

# 46. Domain Module

Для складніших застосунків можна виділяти domain:

    users/
    products/
    orders/

Наприклад:

    orders/
    ├── order-service.js
    ├── order-validation.js
    ├── order-repository.js
    └── index.js

Всі ці модулі працюють навколо `orders`.

---

# 47. Domain vs Infrastructure

Спрощено:

    Domain
    ↓
    Business rules

    Infrastructure
    ↓
    Database
    HTTP
    Files
    External APIs

Наприклад:

    users/
    └── user-service.js

і:

    infrastructure/
    ├── database.js
    └── user-repository.js

Це вже крок у бік більш серйозної backend architecture.

---

# 48. UI не повинен містити всю Business Logic

Погано:

    button.addEventListener("click", async () => {
        const response = await fetch("/users");

        const users = await response.json();

        if (users.length > 10) {
            // business rules
        }

        // validation
        // calculations
        // database assumptions
        // rendering
    });

Краще:

    button.addEventListener("click", async () => {
        const users = await getUsers();

        renderUsers(users);
    });

Business logic:

    // user-service.js

    export const getUsersForDisplay = async () => {
        const users = await getUsers();

        return users.filter(user => user.active);
    };

---

# 49. Модуль як контракт

Можна розглядати export як контракт.

Наприклад:

    export const createUser = (data) => {
        // ...
    };

Інші модулі знають:

    createUser(data)

але не повинні знати:

    як саме перевіряються дані
    де зберігається user
    який SQL використовується
    як створюється connection

Це і є abstraction.

---

# 50. Abstraction

Абстракція означає:

> Показати необхідний інтерфейс і приховати непотрібні деталі.

Наприклад:

    createUser(userData)

Замість того щоб зовнішній код робив:

    validateUser(userData);

    const connection = createConnection();

    const sql = "...";

    connection.query(sql);

    connection.close();

Модуль приховує ці деталі.

---

# 51. Module Contract

Наприклад:

    // user-service.js

    export const createUser = async (data) => {
        // ...
    };

Можна вважати контрактом:

    createUser(data)
        ↓
    Promise<User>

Внутрішня реалізація може змінюватися.

---

# 52. Stable API

Хороший public API бажано робити стабільним.

Наприклад:

    import {
        createUser
    } from "./users/index.js";

Якщо всередині змінюється:

    service.js
    repository.js
    validation.js

зовнішній код не повинен ламатися без необхідності.

---

# 53. Refactoring Advantage

При хорошій module architecture:

    public API
        ↓
    internal implementation

можна змінити:

    database
    ↓
    PostgreSQL

на:

    database
    ↓
    another storage

не змінюючи всю програму.

---

# 54. Погана архітектура

Наприклад:

    component
       ↓
    database
       ↓
    utility
       ↓
    component
       ↓
    API
       ↓
    database

Межі неясні.

Можна отримати:

- circular dependencies;
- дублювання;
- hidden dependencies;
- складне тестування;
- сильне coupling.

---

# 55. Краща структура

Для простого full-stack застосунку:

    Frontend
        ↓
    API
        ↓
    Service
        ↓
    Repository
        ↓
    Database

Наприклад:

    user-form.js
        ↓
    user-api.js
        ↓
    user-service.js
        ↓
    user-repository.js
        ↓
    PostgreSQL

---

# 56. Практичний приклад повної структури

    src/
    ├── app.js
    │
    ├── users/
    │   ├── user-api.js
    │   ├── user-service.js
    │   ├── user-validation.js
    │   └── index.js
    │
    ├── products/
    │   ├── product-api.js
    │   ├── product-service.js
    │   └── index.js
    │
    └── shared/
        ├── format.js
        └── constants.js

---

# 57. Приклад Users Feature

    // users/user-validation.js

    export const validateUser = (data) => {
        return Boolean(data.name);
    };

    // users/user-service.js

    import {
        validateUser
    } from "./user-validation.js";

    export const createUser = async (data) => {
        if (!validateUser(data)) {
            throw new Error("Invalid user");
        }

        // save user

        return data;
    };

    // users/index.js

    export {
        createUser
    } from "./user-service.js";

Зовнішній код:

    import {
        createUser
    } from "./users/index.js";

---

# 58. Dependency Graph цього прикладу

    app
     ↓
    users/index
     ↓
    user-service
     ↓
    user-validation

Тобто:

    app
     ↓
    users
     ↓
    service
     ↓
    validation

Це легко читати.

---

# 59. Не всі модулі повинні бути однакового розміру

Нормально мати:

    math.js

з кількома функціями.

І:

    user-service.js

з великою кількістю business logic.

Архітектура не означає:

> один файл = одна функція.

Головне — відповідальність і cohesion.

---

# 60. Не дроби код занадто сильно

Погано:

    add.js
    subtract.js
    multiply.js
    divide.js

для дуже маленького навчального модуля, якщо всі функції логічно утворюють один `math` API.

Краще:

    math.js

з:

    add
    subtract
    multiply
    divide

Архітектура повинна зменшувати складність, а не збільшувати її.

---

# 61. Module Granularity

**Granularity** — наскільки дрібними є модулі.

Занадто великий модуль:

    everything.js

Проблема:

    low cohesion
    high complexity

Занадто багато маленьких:

    add.js
    subtract.js
    multiply.js
    divide.js
    power.js
    sqrt.js

може створювати зайву складність.

Потрібно знаходити практичний баланс.

---

# 62. Dependency Locality

Бажано, щоб пов'язані залежності були легко знайти.

Наприклад:

    users/
    ├── user-service.js
    ├── user-api.js
    ├── user-validation.js
    └── user-repository.js

легше підтримувати, ніж:

    services/user-service.js
    api/user-api.js
    utils/user-validation.js
    repositories/user-repository.js

у дуже великому проєкті, якщо ці файли майже завжди змінюються разом.

---

# 63. Change Together Principle

Корисне практичне правило:

> Код, який часто змінюється разом, часто має сенс тримати поруч.

Наприклад:

    users/
    ├── user-service.js
    ├── user-validation.js
    └── user-repository.js

Якщо зміна User feature постійно потребує змін у всіх трьох файлах, feature-oriented структура може бути зручною.

---

# 64. Dependency Stability

Бажано, щоб стабільні модулі не залежали від дуже нестабільних деталей без потреби.

Наприклад:

    business logic
        ↓
    infrastructure

може бути прийнятним для простого застосунку.

У складніших системах dependency direction можна організувати так, щоб business rules були менше залежні від infrastructure.

---

# 65. Shared Code

Shared module:

    // shared/format.js

    export const formatCurrency = (value) => {
        return `${value.toFixed(2)} $`;
    };

Його можуть використовувати:

    users
    products
    orders

Але `shared` теж потрібно контролювати.

Не перетворюй:

    shared/

на:

    "сюди покладемо все, що не знаємо куди покласти".

---

# 66. Типова проблема `shared`

Спочатку:

    shared/
    └── format.js

Потім:

    shared/
    ├── format.js
    ├── api.js
    ├── database.js
    ├── user.js
    ├── product.js
    ├── validation.js
    ├── auth.js
    └── helpers.js

Якщо `shared` починає містити половину application logic, boundaries вже потрібно переглянути.

---

# 67. Модулі та тестування

Хороша module architecture полегшує тестування.

Наприклад:

    // math.js

    export const add = (a, b) => a + b;

Тест:

    add(2, 3);

    // expected:
    5

Немає:

    DOM
    database
    network
    global state

Тому тест простий.

---

# 68. Service та тестування

Якщо service отримує repository через dependency injection:

    export const createUserService = (repository) => {
        return {
            createUser(data) {
                return repository.create(data);
            }
        };
    };

можна передати fake repository:

    const fakeRepository = {
        create(data) {
            return {
                id: 1,
                ...data
            };
        }
    };

    const service = createUserService(fakeRepository);

Це значно спрощує unit testing.

---

# 69. Module Architecture у Frontend

Для vanilla JS:

    src/
    ├── main.js
    ├── api/
    ├── services/
    ├── ui/
    ├── utils/
    └── state/

Для React:

    src/
    ├── components/
    ├── features/
    ├── hooks/
    ├── services/
    ├── utils/
    └── app/

---

# 70. Module Architecture у Next.js

У Next.js можна зустріти:

    src/
    ├── app/
    ├── components/
    ├── features/
    ├── lib/
    ├── services/
    └── utils/

Наприклад:

    features/
    └── users/
        ├── components/
        ├── services/
        ├── validation/
        └── index.ts

Це вже застосування тих самих принципів у framework.

---

# 71. Module Architecture у Node.js

Backend:

    src/
    ├── main.js
    ├── modules/
    │   ├── users/
    │   │   ├── user-controller.js
    │   │   ├── user-service.js
    │   │   ├── user-repository.js
    │   │   └── index.js
    │   │
    │   └── products/
    │       ├── product-controller.js
    │       ├── product-service.js
    │       ├── product-repository.js
    │       └── index.js
    │
    └── database/
        └── database.js

Це вже дуже близько до реальної backend architecture.

---

# 72. Controller / Service / Repository

Для backend часто використовується:

    Controller
        ↓
    Service
        ↓
    Repository
        ↓
    Database

Controller:

    HTTP

Service:

    business logic

Repository:

    data access

Database:

    persistence

---

# 73. Controller не повинен містити всю логіку

Погано:

    app.post("/users", async (req, res) => {
        // validation
        // business logic
        // SQL
        // response formatting
        // everything
    });

Краще:

    app.post("/users", async (req, res) => {
        const user = await userService.createUser(req.body);

        res.json(user);
    });

А:

    userService

відповідає за business logic.

---

# 74. Architecture — не набір папок

Дуже важливо:

> Архітектура — це не просто структура директорій.

Одна й та сама структура:

    services/
    utils/
    repositories/

може бути:

- добре організованою;
- погано організованою.

Архітектура — це:

    responsibilities
    +
    dependencies
    +
    boundaries
    +
    data flow
    +
    public APIs

---

# 75. Правильне питання

Не:

> "У яку папку покласти цей файл?"

А:

> "Яка відповідальність цього коду і від чого він повинен залежати?"

Це набагато важливіше.

---

# 76. Як проектувати новий модуль

Перед створенням модуля постав питання:

### 1. Що він робить?

    User validation

### 2. Що йому потрібно?

    User data

### 3. Від чого він залежить?

    можливо від shared validation rules

### 4. Що він відкриває?

    validateUser

### 5. Що повинно залишитися внутрішнім?

    implementation details

---

# 77. Простий алгоритм проектування

Для кожного нового модуля:

    1. Визнач відповідальність.
    2. Визнач input.
    3. Визнач output.
    4. Визнач dependencies.
    5. Визнач public API.
    6. Приховай internal implementation.
    7. Перевір напрямок dependencies.
    8. Перевір, чи не створив circular dependency.

---

# 78. Приклад проектування

Потрібно створити:

    UserService

Питання:

    Responsibility:
    створення та отримання users

    Dependencies:
    UserRepository

    Public API:
    createUser()
    getUser()

    Internal:
    validation
    business rules

Отримуємо:

    user-service.js

    import {
        createUserRecord,
        getUserRecord
    } from "./user-repository.js";

    export const createUser = async (data) => {
        // business logic
    };

    export const getUser = async (id) => {
        return getUserRecord(id);
    };

---

# 79. Простий Dependency Graph

    app
     │
     ├── users
     │    │
     │    └── user-service
     │           │
     │           └── user-repository
     │                   │
     │                   └── database
     │
     └── products
          │
          └── product-service
                  │
                  └── product-repository
                          │
                          └── database

Це вже можна читати як карту програми.

---

# 80. Архітектура маленької Full-Stack вправи

Для твоїх навчальних застосунків не потрібно одразу робити складну architecture.

Наприклад:

    add-two-digit-numbers/
    ├── backend/
    │   ├── server.js
    │   ├── db.js
    │   └── package.json
    │
    └── frontend/
        ├── index.html
        ├── app.js
        └── style.css

Для маленької вправи це нормально.

---

# 81. Коли починати розділяти модулі

Якщо `server.js` стає:

    500 lines
    800 lines
    1200 lines

тоді можна розділити:

    server.js
    routes.js
    services.js
    db.js
    validation.js

Але не потрібно створювати складну архітектуру наперед.

---

# 82. YAGNI

**YAGNI**:

> You Aren't Gonna Need It.

Не створюй:

    repository/
    service/
    controller/
    factory/
    adapter/
    interface/
    container/

якщо застосунок складається з:

    3 файлів
    2 функцій
    1 endpoint

Архітектура повинна відповідати реальній складності.

---

# 83. KISS

**KISS**:

> Keep It Simple.

Якщо:

    server.js
    db.js

повністю достатньо — не потрібно створювати 15 файлів.

Спочатку:

    simple architecture

Потім:

    refactoring

коли complexity реально зростає.

---

# 84. Premature Abstraction

Погано:

    "Можливо через рік у нас буде 20 database implementations."

І тому одразу:

    AbstractRepository
    RepositoryFactory
    RepositoryProvider
    RepositoryAdapter

для маленького навчального проєкту.

Краще:

    simple repository

а abstraction додати, коли з'явиться реальна потреба.

---

# 85. Архітектура повинна служити змінам

Хороша архітектура допомагає відповісти:

> "Якщо я зміню X, що ще потрібно змінити?"

Наприклад:

    PostgreSQL
        ↓
    repository

Якщо database implementation добре ізольована, зміна database повинна зачепити обмежену кількість модулів.

---

# 86. Dependency Graph як карта

Корисно іноді намалювати:

    UI
    ↓
    API
    ↓
    Service
    ↓
    Repository
    ↓
    Database

Якщо стрілки починають утворювати:

    A → B → C → D
    ↑         ↓
    └─────────┘

потрібно перевірити architecture.

---

# 87. Практична перевірка модуля

Для кожного модуля запитай:

    Чи зрозуміло, за що він відповідає?

    Чи занадто багато він робить?

    Чи багато він імпортує?

    Чи багато інших модулів залежать від нього?

    Чи має він зайві exports?

    Чи є circular dependency?

    Чи можна його протестувати окремо?

    Чи можна змінити його internal implementation
    без зміни всього application?

---

# 88. Module Architecture Checklist

    [ ] У модуля є зрозуміла відповідальність.
    [ ] Public API мінімальний.
    [ ] Internal implementation прихована.
    [ ] Dependencies зрозумілі.
    [ ] Немає непотрібних imports.
    [ ] Немає непотрібних exports.
    [ ] Немає circular dependencies.
    [ ] Пов'язані модулі логічно згруповані.
    [ ] Business logic не змішана з UI без потреби.
    [ ] Database logic ізольована.
    [ ] Структура відповідає реальному розміру проєкту.
    [ ] Немає premature abstraction.

---

# Типові помилки

## 1. Один величезний `app.js`

    app.js

містить:

    DOM
    API
    validation
    business logic
    database
    state
    formatting

Результат:

    high complexity
    low cohesion

---

## 2. Один величезний `utils.js`

    utils.js

містить все підряд.

Краще групувати функції за відповідальністю.

---

## 3. Надмірне дроблення

    add.js
    subtract.js
    multiply.js

для трьох простих математичних функцій може бути зайвим.

---

## 4. Circular Dependencies

    A → B
    B → A

Потрібно переглянути boundaries.

---

## 5. UI напряму працює з Database

Погано:

    UI
     ↓
    PostgreSQL

Краще:

    UI
     ↓
    API
     ↓
    Service
     ↓
    Repository
     ↓
    Database

Для маленької навчальної вправи ця схема може бути спрощена, але принцип важливо розуміти.

---

## 6. Business Logic у Controller

Погано:

    controller
    ├── validation
    ├── calculations
    ├── business rules
    ├── SQL
    └── response

Краще:

    controller
        ↓
    service
        ↓
    repository

---

## 7. Public API занадто великий

Погано:

    export {
        helper1,
        helper2,
        helper3,
        internalFunction,
        internalParser,
        privateCalculation
    };

якщо зовнішньому коду потрібна тільки:

    createUser

---

## 8. Архітектура заради архітектури

Погано:

    5 файлів
    ↓
    20 абстракцій
    ↓
    10 interfaces
    ↓
    3 factories

для маленької задачі.

---

# Питання зі співбесіди

### 1. Що таке module architecture?

Це організація програми на модулі з визначеними:

- відповідальностями;
- залежностями;
- public APIs;
- boundaries.

---

### 2. Що таке cohesion?

Ступінь логічної пов'язаності коду всередині модуля.

Бажано:

    high cohesion

---

### 3. Що таке coupling?

Ступінь залежності одного модуля від іншого.

Зазвичай бажано:

    low coupling

---

### 4. Що таке module boundary?

Логічна межа між відповідальностями модулів.

---

### 5. Що таке public API модуля?

Набір exports, через які інші модулі взаємодіють з ним.

---

### 6. Чому потрібно приховувати internal implementation?

Щоб:

- зменшити coupling;
- спростити використання;
- полегшити рефакторинг;
- стабілізувати API;
- спростити тестування.

---

### 7. Що таке dependency graph?

Структура залежностей між модулями.

Наприклад:

    A → B → C

означає:

    A залежить від B
    B залежить від C

---

### 8. Що таке circular dependency?

Коли модулі прямо або через інші модулі залежать один від одного.

Наприклад:

    A → B
    B → A

---

### 9. Що таке barrel module?

Модуль, який re-export-ить API інших модулів.

---

### 10. Чи завжди потрібні barrel modules?

Ні.

Вони корисні для public API, але у великих dependency graphs можуть збільшувати складність.

---

### 11. Що таке feature-oriented architecture?

Організація коду навколо функціональних областей:

    users/
    products/
    orders/

замість лише:

    services/
    utils/
    components/

---

### 12. Чим feature-oriented відрізняється від layer-oriented?

Layer:

    components/
    services/
    repositories/

Feature:

    users/
    products/
    orders/

---

### 13. Що таке dependency injection?

Передача dependency модулю ззовні замість створення dependency безпосередньо всередині.

---

### 14. Що таке separation of concerns?

Розділення різних відповідальностей між окремими частинами системи.

Наприклад:

    UI
    Business Logic
    Data Access

---

### 15. Що важливіше: структура папок чи dependency direction?

Dependency direction та boundaries.

Папки — лише спосіб організації файлів.

---

# Шлях вивчення

## Core

Потрібно розуміти:

- що таке module;
- responsibility;
- import/export;
- public API;
- internal implementation;
- dependency;
- dependency graph;
- cohesion;
- coupling;
- module boundary.

Базова модель:

    Module
      ↓
    Public API
      ↓
    Other Modules

---

## Junior

Потрібно вміти:

- розділяти великий файл на модулі;
- виділяти responsibilities;
- використовувати named/default exports;
- створювати feature modules;
- створювати service modules;
- створювати utility modules;
- створювати прості barrel modules;
- уникати circular dependencies;
- розуміти UI → service → data flow.

Приклад:

    UI
     ↓
    Service
     ↓
    Repository
     ↓
    Database

---

## Middle

Потрібно розуміти:

- dependency direction;
- feature-oriented architecture;
- layer-oriented architecture;
- module boundaries;
- dependency injection;
- abstraction;
- stable public APIs;
- circular dependency analysis;
- тестованість модулів;
- separation of concerns;
- refactoring architecture;
- high cohesion / low coupling.

---

## Senior

Потрібно розуміти:

- architectural boundaries;
- domain boundaries;
- dependency inversion;
- package boundaries;
- public package API;
- architecture evolution;
- dependency graphs;
- large-scale module design;
- monorepo package architecture;
- ESM / CommonJS interoperability;
- tree shaking;
- module resolution;
- architecture trade-offs;
- коли НЕ потрібно застосовувати складну архітектуру.

---

# Міні-шпаргалка

    // =========================
    // MODULE
    // =========================

    // user.js

    const validateUser = (user) => {
        // internal implementation
    };

    export const createUser = (data) => {
        validateUser(data);

        return {
            id: Date.now(),
            ...data
        };
    };


    // =========================
    // IMPORT
    // =========================

    import {
        createUser
    } from "./user.js";


    // =========================
    // DEPENDENCY
    // =========================

    user-service
        ↓
    user-repository
        ↓
    database


    // =========================
    // LAYERED ARCHITECTURE
    // =========================

    UI
     ↓
    API
     ↓
    Service
     ↓
    Repository
     ↓
    Database


    // =========================
    // FEATURE ARCHITECTURE
    // =========================

    users/
    ├── components/
    ├── user-api.js
    ├── user-service.js
    ├── user-validation.js
    └── index.js


    // =========================
    // PUBLIC API
    // =========================

    // users/index.js

    export {
        createUser,
        getUser
    } from "./user-service.js";


    // =========================
    // EXTERNAL USE
    // =========================

    import {
        createUser
    } from "./users/index.js";


    // =========================
    // DEPENDENCY INJECTION
    // =========================

    export const createUserService = (repository) => {
        return {
            createUser(data) {
                return repository.create(data);
            }
        };
    };


    // =========================
    // CIRCULAR DEPENDENCY
    // =========================

    A → B
    B → A


    // =========================
    // BETTER
    // =========================

    A → C
    B → C

---

# Головна ментальна модель

Уявляй застосунок як систему модулів:

    ┌─────────────────────────────────┐
    │          Application            │
    │                                 │
    │   ┌─────────┐   ┌─────────┐     │
    │   │ Users   │   │Products │     │
    │   └────┬────┘   └────┬────┘     │
    │        │             │          │
    │        ↓             ↓          │
    │     Services      Services      │
    │        │             │          │
    │        ↓             ↓          │
    │   Repositories  Repositories    │
    │        │             │          │
    │        └──────┬──────┘          │
    │               ↓                 │
    │           Database              │
    └─────────────────────────────────┘

Кожен модуль:

    має responsibility
          ↓
    має dependencies
          ↓
    має public API
          ↓
    приховує implementation
          ↓
    взаємодіє з іншими модулями
       через чіткі boundaries

---

# Головне

1. **Module architecture — це не просто `import/export`.**

   `import/export` — механізм.

   Architecture — це спосіб організації системи за допомогою цього механізму.

2. Хороший модуль має **чітку відповідальність**.

3. Хороший модуль має **невеликий і зрозумілий public API**.

4. Внутрішня реалізація повинна бути максимально прихована від зовнішнього коду.

5. Прагни:

       High Cohesion
       +
       Low Coupling

6. Думай про залежності як про граф:

       A
       ↓
       B
       ↓
       C

7. Контролюй **напрямок dependencies**.

8. Намагайся уникати:

       A → B
       B → A

   тобто circular dependencies.

9. Для невеликих застосунків достатньо простої architecture.

10. Не потрібно створювати enterprise architecture для маленької вправи.

11. Використовуй:

       KISS
       YAGNI

12. Коли застосунок росте, можна переходити від:

       one large module

   до:

       modules
       ↓
       features
       ↓
       layers
       ↓
       clear boundaries

13. Для full-stack JavaScript дуже корисна базова модель:

       Frontend
           ↓
       API
           ↓
       Service
           ↓
       Repository
           ↓
       Database

14. Але це **модель для мислення**, а не обов'язкова структура кожного проєкту.

15. Найважливіше архітектурне питання:

> **"Яка відповідальність цього модуля, від чого він залежить і що він повинен відкривати назовні?"**

---

# Практичне завдання

Створи невеликий застосунок:

    users/

з такою структурою:

    users/
    ├── user-validation.js
    ├── user-service.js
    ├── user-repository.js
    └── index.js

### `user-validation.js`

    export const validateUser = (data) => {
        return typeof data.name === "string"
            && data.name.trim().length > 0;
    };

### `user-repository.js`

    const users = [];

    export const saveUser = (user) => {
        users.push(user);

        return user;
    };

    export const getUsers = () => {
        return [...users];
    };

### `user-service.js`

    import {
        validateUser
    } from "./user-validation.js";

    import {
        saveUser,
        getUsers
    } from "./user-repository.js";

    export const createUser = (data) => {
        if (!validateUser(data)) {
            throw new Error("Invalid user");
        }

        const user = {
            id: Date.now(),
            name: data.name.trim()
        };

        return saveUser(user);
    };

    export const getAllUsers = () => {
        return getUsers();
    };

### `index.js`

    export {
        createUser,
        getAllUsers
    } from "./user-service.js";

### `app.js`

    import {
        createUser,
        getAllUsers
    } from "./users/index.js";

    const user = createUser({
        name: "Valeriy"
    });

    console.log(user);

    console.log(getAllUsers());

---

# Що ти повинен побачити в цій вправі

    app
     ↓
    users/index
     ↓
    user-service
     ├──→ user-validation
     │
     └──→ user-repository

А зовнішній код не знає про:

    validateUser
    saveUser

Він працює через:

    createUser
    getAllUsers

Тобто:

> **`index.js` визначає public API feature, а внутрішні модулі реалізують її поведінку.**

Це вже базове архітектурне мислення, яке безпосередньо переноситься на React, Next.js, Node.js, NestJS та TypeScript.