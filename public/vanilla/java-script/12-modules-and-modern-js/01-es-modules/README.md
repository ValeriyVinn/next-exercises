## 01. ES Modules

ES Modules (ESM) — це стандартна система модулів JavaScript, яка дозволяє розділяти програму на окремі файли та керувати залежностями між ними.

Модулі дозволяють:

- розділяти великий код на менші частини;
- приховувати внутрішню реалізацію;
- експортувати потрібні функції, змінні, класи;
- імпортувати код з інших файлів;
- уникати глобальних змінних;
- явно описувати залежності між частинами програми;
- будувати масштабовану архітектуру застосунку.

ES Modules є стандартним модульним механізмом сучасного JavaScript.

Основні поняття:

    module
    export
    import
    named export
    default export
    module dependency
    module scope
    static import
    dynamic import
    ESM
    CommonJS

---

### Ключові поняття

✔ ES Modules  
✔ ESM  
✔ module  
✔ `export`  
✔ `import`  
✔ named export  
✔ default export  
✔ module scope  
✔ module dependency  
✔ dependency graph  
✔ module entry point  
✔ static import  
✔ dynamic import  
✔ `import()`  
✔ `export default`  
✔ `export { ... }`  
✔ `import { ... }`  
✔ `import ... from`  
✔ `import * as`  
✔ `import type`  
✔ CommonJS  
✔ `require()`  
✔ `module.exports`  

---

### Що потрібно пам'ятати

• ES Modules дозволяють розділяти JavaScript-програму на окремі файли.

• Кожен ES Module має власний module scope.

• Змінні всередині модуля не стають глобальними автоматично.

• `export` робить значення доступним для інших модулів.

• `import` отримує значення з іншого модуля.

• Модуль може експортувати кілька named exports.

• Модуль може мати один default export.

• Named export імпортується за своїм іменем.

• Default export можна імпортувати під довільним локальним іменем.

• `import` та `export` є частиною синтаксису JavaScript.

• Статичні `import` та `export` аналізуються до виконання модуля.

• `import()` дозволяє завантажувати модулі динамічно.

• ESM потрібно відрізняти від CommonJS.

• У браузері для ES Modules використовується:

    <script type="module">

• Node.js також підтримує ES Modules.

• Модулі формують dependency graph — граф залежностей між файлами.

---

# Що таке Module

Module — окремий файл JavaScript, який має власну область видимості та може експортувати значення для використання іншими модулями.

Наприклад:

    // math.js

    export const add = (a, b) => {
        return a + b;
    };

Інший файл:

    // app.js

    import { add } from "./math.js";

    console.log(add(2, 3));

Результат:

    5

У цьому прикладі:

    math.js → module
    app.js  → module

`app.js` залежить від `math.js`.

---

# Module Scope

Кожен ES Module має власний scope.

Наприклад:

    // math.js

    const secret = 42;

    export const add = (a, b) => {
        return a + b;
    };

З іншого модуля:

    // app.js

    import { add } from "./math.js";

    console.log(add(2, 3));

Не можна просто звернутися до:

    console.log(secret);

`secret` знаходиться у module scope файлу `math.js`.

Щоб зробити значення доступним іншому модулю, його потрібно експортувати.

---

# export

`export` використовується для створення public API модуля.

Наприклад:

    // math.js

    export const add = (a, b) => {
        return a + b;
    };

Тепер `add` може бути імпортована іншим модулем.

---

# Named Export

Named export — експорт значення з конкретним іменем.

Наприклад:

    // math.js

    export const add = (a, b) => {
        return a + b;
    };

    export const subtract = (a, b) => {
        return a - b;
    };

Імпорт:

    // app.js

    import { add, subtract } from "./math.js";

    console.log(add(10, 5));
    console.log(subtract(10, 5));

Результат:

    15
    5

Імена повинні відповідати exported names.

---

# Export кількох значень

Можна експортувати кілька значень:

    // math.js

    export const add = (a, b) => a + b;

    export const subtract = (a, b) => a - b;

    export const multiply = (a, b) => a * b;

    export const divide = (a, b) => a / b;

Імпорт:

    import {
        add,
        subtract,
        multiply,
        divide
    } from "./math.js";

---

# Export наприкінці файлу

Не обов'язково писати `export` перед кожним оголошенням.

Можна:

    const add = (a, b) => a + b;

    const subtract = (a, b) => a - b;

    const multiply = (a, b) => a * b;

    export {
        add,
        subtract,
        multiply
    };

Це також named exports.

---

# import

`import` використовується для отримання exported values з іншого модуля.

Наприклад:

    // math.js

    export const add = (a, b) => a + b;

    // app.js

    import { add } from "./math.js";

    console.log(add(2, 3));

---

# Import Named Export

Якщо модуль має:

    export const add = (a, b) => a + b;

можна імпортувати:

    import { add } from "./math.js";

Фігурні дужки:

    { add }

означають named import.

---

# Import кількох Named Exports

Можна імпортувати кілька значень:

    import {
        add,
        subtract,
        multiply
    } from "./math.js";

---

# Import Alias

Named export можна імпортувати під іншим локальним ім'ям через `as`.

Наприклад:

    import {
        add as sum
    } from "./math.js";

Тепер:

    sum(2, 3);

а не:

    add(2, 3);

Це корисно, якщо в поточному файлі вже є змінна з таким ім'ям або назва потребує уточнення.

---

# Export Alias

Можна змінити ім'я під час експорту:

    const add = (a, b) => a + b;

    export {
        add as sum
    };

Тоді інший модуль отримує:

    import { sum } from "./math.js";

---

# Default Export

Модуль може мати один default export.

Наприклад:

    // user.js

    const user = {
        name: "John",
        age: 25
    };

    export default user;

Імпорт:

    // app.js

    import user from "./user.js";

    console.log(user);

Default import не потребує фігурних дужок.

---

# Default Export Function

Можна експортувати функцію:

    export default function add(a, b) {
        return a + b;
    }

Імпорт:

    import add from "./math.js";

    console.log(add(2, 3));

---

# Default Export Class

Також можна експортувати class:

    export default class User {
        constructor(name) {
            this.name = name;
        }
    }

Імпорт:

    import User from "./User.js";

    const user = new User("John");

---

# Default Import Alias

Default export можна імпортувати під іншим ім'ям.

Наприклад:

    // user.js

    export default {
        name: "John"
    };

Імпорт:

    import person from "./user.js";

або:

    import user from "./user.js";

або:

    import currentUser from "./user.js";

Усі варіанти синтаксично допустимі.

Це одна з головних відмінностей від named export.

---

# Named vs Default Export

Named export:

    export const add = (a, b) => a + b;

Імпорт:

    import { add } from "./math.js";

Default export:

    export default function add(a, b) {
        return a + b;
    }

Імпорт:

    import add from "./math.js";

Головна різниця:

    named export
        ↓
    import { name }

    default export
        ↓
    import name

---

# Один Module може мати Named + Default Exports

Наприклад:

    // math.js

    export const add = (a, b) => a + b;

    export const subtract = (a, b) => a - b;

    const multiply = (a, b) => a * b;

    export default multiply;

Імпорт:

    import multiply, {
        add,
        subtract
    } from "./math.js";

---

# Важливе правило Default Export

Один модуль може мати тільки один default export.

Правильно:

    export default function add() {
        ...
    }

Не можна:

    export default add;
    export default subtract;

Але можна мати багато named exports:

    export const add = ...;
    export const subtract = ...;
    export const multiply = ...;

---

# Module Path

При імпорті модуля потрібно вказати його шлях.

Наприклад:

    import { add } from "./math.js";

`./` означає поточну директорію.

Наприклад структура:

    src/
    ├── app.js
    └── math.js

Тоді:

    import { add } from "./math.js";

---

# Parent Directory

Для переходу на рівень вище:

    ../

Наприклад:

    src/
    ├── utils/
    │   └── math.js
    └── app.js

У `math.js`:

    import { something } from "../app.js";

---

# Nested Path

Наприклад:

    src/
    ├── app.js
    └── utils/
        └── math.js

У `app.js`:

    import { add } from "./utils/math.js";

---

# File Extension

У браузерному ESM важливо правильно вказувати шлях до файлу.

Наприклад:

    import { add } from "./math.js";

а не обов'язково:

    import { add } from "./math";

Для browser ESM повний відносний URL зазвичай повинен бути коректним.

У Node.js також часто використовується:

    import { add } from "./math.js";

---

# Browser ES Modules

У браузері модуль підключається через:

    <script type="module" src="./app.js"></script>

Наприклад:

    <!DOCTYPE html>

    <html>
    <head>
        <title>Modules</title>
    </head>

    <body>
        <script type="module" src="./app.js"></script>
    </body>
    </html>

---

# type="module"

Без:

    type="module"

звичайний `<script>` не працює як ES Module.

Правильно:

    <script type="module" src="./app.js"></script>

---

# Module Example

Структура:

    project/
    ├── index.html
    ├── app.js
    └── math.js

`math.js`:

    export const add = (a, b) => {
        return a + b;
    };

`app.js`:

    import { add } from "./math.js";

    console.log(add(10, 20));

`index.html`:

    <script type="module" src="./app.js"></script>

Результат:

    30

---

# Module Dependency

Якщо:

    app.js

імпортує:

    math.js

то:

    app.js → math.js

є dependency.

Тобто:

    app.js
       ↓
    math.js

`app.js` залежить від `math.js`.

---

# Dependency Graph

У реальному застосунку залежностей може бути багато.

Наприклад:

    app.js
       ↓
    user.js
       ↓
    api.js

та:

    app.js
       ↓
    ui.js
       ↓
    helpers.js

Можна уявити:

    app
    ├── user
    │   └── api
    │
    └── ui
        └── helpers

Це dependency graph.

Модульна архітектура дозволяє будувати такий граф явно.

---

# Entry Point

Entry point — модуль, з якого починається виконання застосунку.

Наприклад:

    index.html
        ↓
    app.js
        ↓
    modules...

Тоді:

    app.js

є entry point.

У складніших застосунках entry point може бути:

    main.js
    index.js
    app.js

або іншим файлом залежно від архітектури.

---

# Module Execution

ES Modules виконуються не просто як незалежні скрипти.

Спочатку JavaScript визначає залежності:

    app.js
       ↓
    math.js
       ↓
    helpers.js

Після цього модулі завантажуються та виконуються у відповідному порядку залежностей.

Це дозволяє JavaScript побудувати dependency graph.

---

# Module Scope vs Global Scope

Звичайний script:

    <script>
        const name = "John";
    </script>

може створювати глобальний доступ залежно від способу оголошення та середовища.

Модуль:

    <script type="module">
        const name = "John";
    </script>

має власний module scope.

Інший модуль не може автоматично звернутися до:

    name

Потрібен `export` / `import`.

---

# Modules та Global Variables

Без модулів великий застосунок може створювати проблеми:

    const user = ...;
    const api = ...;
    const utils = ...;

Якщо все знаходиться в глобальному просторі, імена можуть конфліктувати.

Модулі ізолюють внутрішні змінні:

    // user.js

    const user = {
        name: "John"
    };

`user` не стає автоматично глобальною змінною.

---

# Private by Default

У модулі значення є локальними за замовчуванням.

Наприклад:

    const secret = "123";

    export const publicValue = 42;

Інші модулі бачать:

    publicValue

але не:

    secret

Це важливий принцип модульної архітектури:

    internal implementation
          ↓
       private

    public API
          ↓
       exported

---

# Public API модуля

Модуль може приховувати реалізацію та експортувати тільки необхідні значення.

Наприклад:

    const validateUser = (user) => {
        return user.name.length > 0;
    };

    const saveUser = (user) => {
        // save
    };

    export const createUser = (name) => {
        const user = { name };

        if (!validateUser(user)) {
            throw new Error("Invalid user");
        }

        saveUser(user);

        return user;
    };

Зовнішній код бачить:

    createUser

але не повинен залежати від:

    validateUser
    saveUser

Це формує public API модуля.

---

# Re-export

Можна експортувати імпортоване значення далі.

Наприклад:

    // math.js

    export const add = (a, b) => a + b;

    // index.js

    export { add } from "./math.js";

Тепер інший модуль може:

    import { add } from "./index.js";

Це називається re-export.

---

# Re-export кількох модулів

Наприклад:

    // index.js

    export { add, subtract } from "./math.js";

    export { User } from "./User.js";

    export { formatDate } from "./date.js";

`index.js` може стати центральною точкою доступу до public API.

Наприклад:

    components/
    ├── Button.js
    ├── Modal.js
    ├── Input.js
    └── index.js

`index.js`:

    export { Button } from "./Button.js";
    export { Modal } from "./Modal.js";
    export { Input } from "./Input.js";

Тепер:

    import {
        Button,
        Modal,
        Input
    } from "./components/index.js";

---

# Namespace Import

Можна імпортувати всі named exports як один namespace object.

Наприклад:

    import * as math from "./math.js";

Тепер:

    math.add(2, 3);

    math.subtract(10, 5);

Якщо `math.js` має:

    export const add = (a, b) => a + b;

    export const subtract = (a, b) => a - b;

то:

    math

містить доступ до цих exports.

---

# Namespace Object

Наприклад:

    import * as utils from "./utils.js";

Можна використовувати:

    utils.formatDate();

    utils.formatName();

    utils.validateEmail();

Це зручно, коли потрібно логічно згрупувати багато функцій.

---

# Side Effects

Модуль може виконувати код просто під час завантаження.

Наприклад:

    console.log("Module loaded");

    export const value = 42;

Якщо модуль імпортується:

    import { value } from "./module.js";

код:

    console.log("Module loaded");

буде виконаний як частина завантаження модуля.

Такий код називають side effect.

---

# Side-effect Import

Можна імпортувати модуль без отримання конкретного export.

Наприклад:

    import "./analytics.js";

Це означає:

    завантажити та виконати module

без використання його exports.

Такий підхід часто використовується для:

    initialization
    polyfills
    global setup
    styles у bundler environment
    registration

---

# Static Import

Звичайний:

    import { add } from "./math.js";

є static import.

Його структура відома до виконання коду.

Не можна просто написати:

    const path = "./math.js";

    import { add } from path;

Статичний `import` має спеціальні синтаксичні правила.

---

# Dynamic Import

Для динамічного завантаження використовується:

    import()

Наприклад:

    const module = await import("./math.js");

Після цього:

    module.add(2, 3);

`import()` повертає Promise.

Тому можна:

    const module = await import("./math.js");

або:

    import("./math.js")
        .then((module) => {
            console.log(module.add(2, 3));
        });

---

# Static vs Dynamic Import

Static:

    import { add } from "./math.js";

Відомий заздалегідь.

Dynamic:

    const module = await import("./math.js");

Завантажується під час виконання.

---

# Коли потрібен Dynamic Import

Dynamic import корисний, коли модуль потрібен не одразу.

Наприклад:

    button.addEventListener("click", async () => {
        const module = await import("./editor.js");

        module.openEditor();
    });

Тут:

    editor.js

завантажується тільки після натискання кнопки.

Це може бути корисно для:

    code splitting
    lazy loading
    великих модулів
    рідко використовуваного функціоналу

---

# ESM у Node.js

Node.js підтримує ES Modules.

Один із способів явно вказати ESM — у `package.json`:

    {
        "type": "module"
    }

Тоді `.js` файли в цьому package трактуються як ES Modules.

Наприклад:

    // package.json

    {
        "type": "module"
    }

    // math.js

    export const add = (a, b) => a + b;

    // app.js

    import { add } from "./math.js";

    console.log(add(2, 3));

---

# ESM та CommonJS

У Node.js існують дві основні модульні системи:

    ES Modules
    CommonJS

ESM:

    import
    export

CommonJS:

    require()
    module.exports
    exports

---

# ES Modules

Наприклад:

    // math.js

    export const add = (a, b) => a + b;

    // app.js

    import { add } from "./math.js";

---

# CommonJS

Традиційний CommonJS:

    // math.js

    const add = (a, b) => a + b;

    module.exports = {
        add
    };

Імпорт:

    const { add } = require("./math");

---

# ESM vs CommonJS

ES Modules:

    export
    import

CommonJS:

    module.exports
    require()

У сучасному JavaScript варто добре розуміти ESM, оскільки це стандартний модульний механізм ECMAScript.

У Node.js при роботі зі старими проєктами все ще можна зустріти CommonJS.

---

# Circular Dependency

Circular dependency — ситуація, коли модулі прямо або опосередковано залежать один від одного.

Наприклад:

    A → B
    ↑   ↓
    └───┘

Тобто:

    A imports B

і:

    B imports A

Наприклад:

    // a.js

    import { b } from "./b.js";

    // b.js

    import { a } from "./a.js";

Це може ускладнити:

    initialization
    debugging
    dependency graph
    підтримку архітектури

Тому circular dependencies краще уникати без необхідності.

---

# Module Architecture

Модулі дозволяють розділити код за відповідальністю.

Наприклад:

    src/
    ├── app.js
    ├── api/
    │   └── users.js
    ├── utils/
    │   └── format.js
    ├── components/
    │   └── button.js
    └── services/
        └── user-service.js

Кожен модуль має свою відповідальність.

---

# Separation of Concerns

Можна розділити:

    API
    UI
    validation
    business logic
    utilities
    data

Наприклад:

    user-service.js
        ↓
    user logic

    user-api.js
        ↓
    HTTP requests

    user-ui.js
        ↓
    DOM

Це робить код структурованішим.

---

# Module Responsibility

Хороший модуль зазвичай має чітку відповідальність.

Наприклад:

    math.js
        → математичні операції

    date.js
        → робота з датами

    api.js
        → API requests

    validation.js
        → validation

Замість одного:

    everything.js

---

# Small Modules

Модулі можна робити невеликими:

    // math.js

    export const add = (a, b) => a + b;

    export const subtract = (a, b) => a - b;

Переваги:

    readable
    reusable
    testable
    maintainable

Але занадто дрібне розбиття також може створювати зайву складність.

---

# Module API

Можна мислити модулем як маленьким API.

Наприклад:

    // user.js

    const validate = (user) => {
        ...
    };

    const save = (user) => {
        ...
    };

    export const createUser = (name) => {
        ...
    };

Public API:

    createUser

Internal implementation:

    validate
    save

---

# Import Order

У великому проєкті imports часто організовують логічно.

Наприклад:

    import fs from "node:fs";

    import { createUser } from "./user.js";
    import { formatDate } from "./date.js";

Тобто спочатку external / built-in dependencies, потім local modules.

Конкретний стиль залежить від проєкту та linting rules.

---

# Module Naming

Файли модулів часто називають за відповідальністю:

    user.js
    api.js
    auth.js
    validation.js
    date.js
    storage.js

Можливі також:

    user-service.js
    user-controller.js
    user-repository.js

Назва повинна допомагати зрозуміти призначення модуля.

---

# Index Module

`index.js` часто використовується як public entry point певної директорії.

Наприклад:

    components/
    ├── Button.js
    ├── Modal.js
    ├── Input.js
    └── index.js

`index.js`:

    export { Button } from "./Button.js";
    export { Modal } from "./Modal.js";
    export { Input } from "./Input.js";

Тоді:

    import {
        Button,
        Modal,
        Input
    } from "./components/index.js";

---

# Barrel Module

Файл, який збирає та re-export-ить exports з інших модулів, часто називають barrel module.

Наприклад:

    // index.js

    export { add } from "./add.js";
    export { subtract } from "./subtract.js";
    export { multiply } from "./multiply.js";

Це створює одну точку входу.

Але barrel files не потрібно використовувати автоматично всюди — вони можуть ускладнювати dependency graph у великих проєктах.

---

# Module Reusability

Модуль можна використовувати в декількох місцях.

Наприклад:

    // format.js

    export const formatPrice = (price) => {
        return `${price.toFixed(2)} $`;
    };

Використання:

    import { formatPrice } from "./format.js";

    console.log(formatPrice(19.5));

І в іншому модулі:

    import { formatPrice } from "./format.js";

    console.log(formatPrice(100));

Одна реалізація використовується в різних місцях.

---

# Module Testing

Модулі легко тестувати окремо.

Наприклад:

    // math.js

    export const add = (a, b) => a + b;

Тест може перевіряти:

    add(2, 3)

результат:

    5

Модульність допомагає ізолювати логіку.

---

# Tree Shaking

У сучасних bundlers ESM має важливу перевагу — статичні exports дозволяють аналізувати, який код реально використовується.

Наприклад:

    // math.js

    export const add = ...;
    export const subtract = ...;
    export const multiply = ...;

Якщо застосунок використовує тільки:

    import { add } from "./math.js";

bundler може видалити невикористаний код під час production build.

Цей процес називається:

    tree shaking

Tree shaking залежить від bundler та способу побудови застосунку.

---

# ESM та Tree Shaking

Статична структура:

    import
    export

дозволяє bundler краще аналізувати dependency graph.

Тому ESM добре підходить для сучасних frontend-застосунків.

---

# Strict Mode

ES Modules автоматично виконуються у strict mode.

Тобто для module:

    "use strict";

вручну додавати не потрібно.

Наприклад:

    // module.js

    x = 10;

це викличе помилку через strict mode.

---

# Top-Level await

ES Modules підтримують `await` на top level у середовищах, які підтримують цю можливість.

Наприклад:

    const response = await fetch("/api/users");

    const users = await response.json();

Це не потрібно обов'язково вкладати в:

    async function main() {
        ...
    }

Top-level `await` доступний саме в модульному контексті.

---

# Module Example with await

Наприклад:

    // users.js

    const response = await fetch("/api/users");

    export const users = await response.json();

Інший модуль:

    import { users } from "./users.js";

Модуль може очікувати завершення top-level asynchronous initialization.

---

# Modules та DOM

ES Modules зручно використовувати для розділення DOM-логіки.

Наприклад:

    // dom.js

    export const getElement = (selector) => {
        return document.querySelector(selector);
    };

І:

    // app.js

    import { getElement } from "./dom.js";

    const button = getElement("#button");

---

# Modules у Fullstack JavaScript

ES Modules використовуються не тільки у браузері.

Вони важливі для:

    browser JavaScript
    Node.js
    Express
    NestJS
    Next.js
    frontend applications
    backend applications

Тому розуміння:

    import
    export
    module scope
    dependencies

є базою для сучасного JavaScript ecosystem.

---

# Практичний приклад

Структура:

    project/
    ├── index.html
    ├── app.js
    ├── math.js
    └── format.js

`math.js`:

    export const add = (a, b) => {
        return a + b;
    };

    export const multiply = (a, b) => {
        return a * b;
    };

`format.js`:

    export const formatResult = (value) => {
        return `Result: ${value}`;
    };

`app.js`:

    import {
        add,
        multiply
    } from "./math.js";

    import {
        formatResult
    } from "./format.js";

    const sum = add(10, 20);

    const result = multiply(sum, 2);

    console.log(formatResult(result));

`index.html`:

    <script type="module" src="./app.js"></script>

Результат:

    Result: 60

---

# Практичний приклад — Default Export

`User.js`:

    export default class User {
        constructor(name) {
            this.name = name;
        }

        greet() {
            return `Hello, ${this.name}`;
        }
    }

`app.js`:

    import User from "./User.js";

    const user = new User("John");

    console.log(user.greet());

Результат:

    Hello, John

---

# Практичний приклад — Named + Default

`math.js`:

    export const add = (a, b) => a + b;

    export const subtract = (a, b) => a - b;

    const multiply = (a, b) => a * b;

    export default multiply;

`app.js`:

    import multiply, {
        add,
        subtract
    } from "./math.js";

    console.log(add(10, 5));
    console.log(subtract(10, 5));
    console.log(multiply(10, 5));

Результат:

    15
    5
    50

---

# Практичний приклад — Namespace

`math.js`:

    export const add = (a, b) => a + b;

    export const subtract = (a, b) => a - b;

    export const multiply = (a, b) => a * b;

`app.js`:

    import * as math from "./math.js";

    console.log(math.add(2, 3));
    console.log(math.subtract(10, 4));
    console.log(math.multiply(5, 2));

---

# Практичний приклад — Dynamic Import

`app.js`:

    const button = document.querySelector("#button");

    button.addEventListener("click", async () => {
        const math = await import("./math.js");

        console.log(math.add(10, 20));
    });

`math.js`:

    export const add = (a, b) => a + b;

Модуль завантажується після події.

---

# Типові помилки

❌ Забути `type="module"` у браузері.

    <script src="./app.js"></script>

Для ESM:

    <script type="module" src="./app.js"></script>

---

❌ Використати named import без `{}`.

Якщо:

    export const add = ...

неправильно:

    import add from "./math.js";

Правильно:

    import { add } from "./math.js";

---

❌ Використати `{}` для default export.

Якщо:

    export default function add() {}

правильно:

    import add from "./math.js";

---

❌ Переплутати named та default export.

    named
        ↓
    export { add }
        ↓
    import { add }

    default
        ↓
    export default add
        ↓
    import add

---

❌ Забути шлях до модуля.

    import { add } from "math.js";

У browser ESM для локального модуля потрібно:

    import { add } from "./math.js";

---

❌ Неправильно вказати relative path.

Наприклад:

    ./utils/math.js

і:

    ../utils/math.js

означають різні шляхи.

---

❌ Експортувати те, чого не існує.

    export {
        add
    };

якщо `add` не оголошено, буде помилка.

---

❌ Створити circular dependency без необхідності.

    A → B
    B → A

Це може ускладнити виконання та підтримку коду.

---

❌ Робити один величезний module.

Наприклад:

    app.js

з тисячами рядків, де знаходиться:

    UI
    API
    validation
    database logic
    utilities
    business logic

Краще розділяти відповідальності.

---

❌ Створювати надто багато маленьких модулів без логічної причини.

Модульність повинна покращувати структуру, а не створювати зайву навігацію.

---

# Типові питання зі співбесіди

Що таке ES Modules?

Навіщо потрібні модулі?

Що таке `export`?

Що таке `import`?

Що таке named export?

Що таке default export?

Яка різниця між named та default export?

Скільки default exports може бути в одному модулі?

Чи може модуль мати кілька named exports?

Як імпортувати named export?

Як імпортувати default export?

Як імпортувати кілька named exports?

Що робить `as` в import?

Що робить `import * as`?

Що таке module scope?

Чому змінні модуля не стають глобальними?

Що таке dependency між модулями?

Що таке dependency graph?

Що таке entry point?

Що таке re-export?

Що таке barrel module?

Що таке static import?

Що таке dynamic import?

Чим `import()` відрізняється від `import`?

Що повертає dynamic `import()`?

Як підключити ESM у браузері?

Для чого потрібен:

    type="module"

Що таке CommonJS?

Яка різниця між ESM та CommonJS?

Що таке:

    require()

Що таке:

    module.exports

Що таке circular dependency?

Що таке side effect?

Що таке side-effect import?

Що таке tree shaking?

Чому ESM зручний для bundlers?

Що таке module public API?

Що таке module scope?

Чому модулі допомагають уникати global namespace pollution?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке module.

Що таке ES Modules.

`export`.

`import`.

Named exports.

Named imports.

Default export.

Default import.

Module scope.

Relative module paths.

`type="module"`.

Основи module dependencies.

Основи dependency graph.

Основи ESM у браузері.

Основи ESM у Node.js.

Різниця між named та default export.

---

🔵 Junior

Named + default exports.

Import aliases.

Export aliases.

`import * as`.

Re-export.

`index.js`.

Barrel modules.

Module public API.

Private implementation.

Module responsibility.

Separation of concerns.

Static imports.

Dynamic `import()`.

Side-effect imports.

Circular dependencies.

ESM vs CommonJS.

`package.json`:

    "type": "module"

Top-level `await`.

Основи tree shaking.

Розуміння dependency graph.

---

🟠 Middle

Проєктування module architecture.

Dependency boundaries.

Public API modules.

Barrel architecture.

Circular dependency analysis.

Dynamic imports.

Lazy loading.

Code splitting.

Tree shaking.

Module initialization.

Side effects.

Top-level await.

ESM + bundlers.

ESM + Node.js.

ESM + frontend frameworks.

Розділення:

    UI
    services
    API
    utilities
    business logic

Розуміння trade-offs між великими та малими модулями.

---

🔴 Senior

Глибоке розуміння ECMAScript Modules.

Module linking.

Module instantiation.

Module evaluation.

Live bindings.

Cyclic module dependencies.

Module namespace objects.

ESM execution semantics.

Static dependency analysis.

Tree shaking limitations.

Code splitting architecture.

Lazy module loading.

Module federation concepts.

Package exports.

Package imports.

Conditional exports.

Dual ESM/CommonJS packages.

Node.js ESM resolution.

Bundler module resolution.

Side-effect analysis.

Dependency graph optimization.

Module boundaries у великих системах.

---

# Live Bindings

ES Modules використовують live bindings.

Наприклад:

    // counter.js

    export let count = 0;

    export const increment = () => {
        count++;
    };

І:

    // app.js

    import {
        count,
        increment
    } from "./counter.js";

    console.log(count);

    increment();

    console.log(count);

Імпортований `count` пов'язаний з export binding модуля.

Це не просто незалежна копія значення.

Для практичної роботи достатньо запам'ятати:

    ESM imports → live bindings

---

# Module Namespace

При:

    import * as math from "./math.js";

`math` представляє namespace модуля.

Наприклад:

    math.add
    math.subtract
    math.multiply

Namespace пов'язаний з exports відповідного модуля.

---

# Module Evaluation

Умовно можна уявити процес так:

    import
       ↓
    знайти module
       ↓
    знайти dependencies
       ↓
    побудувати dependency graph
       ↓
    link modules
       ↓
    evaluate modules
       ↓
    application code

Для повсякденної роботи достатньо розуміти:

    import
       ↓
    dependency
       ↓
    module loading
       ↓
    execution

---

# ESM як основа сучасного JavaScript

ES Modules — це не просто синтаксис:

    import
    export

Це основа організації сучасного JavaScript-коду.

Наприклад, застосунок може мати:

    app.js
       ↓
    components
       ↓
    services
       ↓
    api
       ↓
    utilities

Кожен рівень може складатися з окремих модулів.

---

# Міні-шпаргалка

## Named Export

    export const add = (a, b) => a + b;

Import:

    import { add } from "./math.js";

---

## Multiple Named Exports

    export const add = ...;
    export const subtract = ...;
    export const multiply = ...;

Import:

    import {
        add,
        subtract,
        multiply
    } from "./math.js";

---

## Default Export

    export default function add(a, b) {
        return a + b;
    }

Import:

    import add from "./math.js";

---

## Alias

    import {
        add as sum
    } from "./math.js";

---

## Namespace

    import * as math from "./math.js";

    math.add(2, 3);

---

## Re-export

    export {
        add
    } from "./math.js";

---

## Side-effect Import

    import "./analytics.js";

---

## Dynamic Import

    const module = await import("./math.js");

    module.add(2, 3);

---

## Browser Module

    <script
        type="module"
        src="./app.js"
    ></script>

---

## Node.js ESM

    {
        "type": "module"
    }

---

## CommonJS

    const math = require("./math");

    module.exports = {
        add
    };

---

## ESM

    import { add } from "./math.js";

    export { add };

---

# Основні правила

    export
        → зробити binding доступним для інших modules

    import
        → використати exported binding

    named export
        → import { name }

    default export
        → import name

    import * as
        → namespace

    import()
        → dynamic module loading

    type="module"
        → browser ESM

    module scope
        → local scope модуля

    re-export
        → export imported module API

    side-effect import
        → execute module without importing a binding

---

# Головне:

• ES Modules — стандартна система модулів JavaScript.

• Module — окремий файл JavaScript з власним module scope.

• `export` визначає, що модуль робить доступним назовні.

• `import` дозволяє використовувати exports іншого модуля.

• Named export має конкретне ім'я:

    export const add = ...

• Named import використовує `{}`:

    import { add } from "./math.js";

• Default export:

    export default add;

• Default import не використовує `{}`:

    import add from "./math.js";

• Один модуль може мати багато named exports.

• Один модуль може мати лише один default export.

• Named import можна перейменувати через:

    as

• Всі named exports можна отримати через:

    import * as module from "./module.js";

• Модуль має власний scope.

• Змінні модуля не стають глобальними автоматично.

• Модулі дозволяють приховувати implementation details та формувати public API.

• `type="module"` використовується для підключення ESM у браузері:

    <script type="module" src="./app.js"></script>

• ESM у Node.js можна використовувати через:

    "type": "module"

• ESM використовує:

    import
    export

• CommonJS використовує:

    require()
    module.exports

• Статичний `import` описує dependency заздалегідь.

• Dynamic `import()` дозволяє завантажити module під час виконання.

• `import()` повертає Promise.

• Модулі можуть re-export-ити інші модулі.

• `index.js` часто використовується як центральний public entry point для групи модулів.

• Circular dependencies виникають, коли modules прямо або опосередковано залежать один від одного.

• ES Modules автоматично працюють у strict mode.

• ES Modules підтримують top-level `await` у відповідних середовищах.

• ESM добре підходить для dependency analysis та tree shaking.

• Хороший module має зрозумілу відповідальність і чіткий public API.

• Не потрібно експортувати все — краще експортувати тільки те, що є частиною public API.

• Основна ідея модулів:

    split code
        ↓
    define dependencies
        ↓
    hide implementation
        ↓
    expose public API
        ↓
    compose application

• Модульна архітектура дозволяє поступово переходити від:

    одного великого JavaScript-файлу

до:

    app
    ├── modules
    ├── services
    ├── utilities
    ├── components
    └── api

• Для сучасного JavaScript важливо впевнено розуміти:

    import
    export
    named export
    default export
    module scope
    module dependency
    static import
    dynamic import
    re-export
    ESM vs CommonJS

• Головна модель ES Modules:

    module A
       │
       │ export
       ↓
    public API
       │
       │ import
       ↓
    module B

• А головна архітектурна ідея:

    маленькі логічні модулі
             ↓
    чіткі залежності
             ↓
    зрозумілий public API
             ↓
    масштабований JavaScript-застосунок