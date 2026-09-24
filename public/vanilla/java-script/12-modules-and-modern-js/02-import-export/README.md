## 02. Import & Export

`import` та `export` — основні механізми ES Modules, які дозволяють одному JavaScript-модулю передавати значення іншим модулям і використовувати їх у своєму коді.

Модуль може експортувати:

    variables
    functions
    classes
    objects
    constants

Інший модуль може їх імпортувати:

    import

Основна модель:

    module A
        ↓
      export
        ↓
    module B
        ↓
      import

Наприклад:

    // math.js

    export const add = (a, b) => {
        return a + b;
    };

    // app.js

    import { add } from "./math.js";

    console.log(add(2, 3));

Результат:

    5

---

### Ключові поняття

✔ `export`  
✔ `import`  
✔ named export  
✔ named import  
✔ default export  
✔ default import  
✔ export list  
✔ import list  
✔ alias  
✔ `as`  
✔ `export default`  
✔ `import * as`  
✔ namespace import  
✔ re-export  
✔ module API  
✔ module scope  
✔ live binding  
✔ static import  
✔ dynamic import  
✔ `import()`  
✔ side-effect import  
✔ module dependency  
✔ dependency graph  

---

### Що потрібно пам'ятати

• `export` робить binding доступним для інших модулів.

• `import` дозволяє використовувати exported binding.

• Named export має конкретне ім'я.

• Named import використовує фігурні дужки:

    import { add } from "./math.js";

• Default export імпортується без фігурних дужок:

    import add from "./math.js";

• В одному модулі може бути багато named exports.

• В одному модулі може бути тільки один default export.

• Named export можна перейменувати через `as`.

• Default import також можна назвати довільним локальним іменем.

• `import * as` створює namespace object з exports модуля.

• `export { ... }` дозволяє експортувати вже оголошені bindings.

• `export { ... } from` дозволяє re-export значень з іншого модуля.

• `import()` використовується для dynamic import.

• Static `import` та `export` мають статичну структуру.

• Import є live binding, а не просто копією значення.

---

# export

`export` використовується для експортування binding з модуля.

Наприклад:

    // math.js

    export const add = (a, b) => {
        return a + b;
    };

Тепер `add` доступний для імпорту.

---

# Named Export

Named export — export із конкретним ім'ям.

    export const add = (a, b) => a + b;

Імпорт:

    import { add } from "./math.js";

Назва:

    add

повинна відповідати exported name.

---

# Named Export Variable

Можна експортувати змінну:

    export const tax = 0.2;

Імпорт:

    import { tax } from "./config.js";

---

# Named Export Function

Можна експортувати функцію:

    export function add(a, b) {
        return a + b;
    }

Імпорт:

    import { add } from "./math.js";

---

# Named Export Class

Можна експортувати class:

    export class User {
        constructor(name) {
            this.name = name;
        }
    }

Імпорт:

    import { User } from "./User.js";

---

# Export після оголошення

Необов'язково використовувати `export` безпосередньо перед declaration.

Можна:

    const add = (a, b) => a + b;

    const subtract = (a, b) => a - b;

    export {
        add,
        subtract
    };

Це також named exports.

---

# Export List

Можна створити список exports:

    const add = (a, b) => a + b;

    const subtract = (a, b) => a - b;

    const multiply = (a, b) => a * b;

    export {
        add,
        subtract,
        multiply
    };

Такий синтаксис називається export list.

---

# Export Alias

Можна експортувати binding під іншим ім'ям.

    const add = (a, b) => a + b;

    export {
        add as sum
    };

Тепер зовнішній модуль бачить:

    sum

Імпорт:

    import { sum } from "./math.js";

---

# Named Import

Named export:

    export const add = (a, b) => a + b;

Named import:

    import { add } from "./math.js";

Фігурні дужки означають, що ми імпортуємо named export.

---

# Import кількох Named Exports

Наприклад:

    // math.js

    export const add = (a, b) => a + b;

    export const subtract = (a, b) => a - b;

    export const multiply = (a, b) => a * b;

Імпорт:

    import {
        add,
        subtract,
        multiply
    } from "./math.js";

---

# Import Alias

Named import можна перейменувати.

Наприклад:

    import {
        add as sum
    } from "./math.js";

Тепер:

    sum(2, 3);

замість:

    add(2, 3);

---

# Навіщо потрібен Alias

Alias корисний, якщо:

- назва конфліктує з локальною змінною;
- назва недостатньо зрозуміла у поточному контексті;
- потрібно відрізнити два exports з однаковою назвою.

Наприклад:

    import {
        format as formatDate
    } from "./date.js";

    import {
        format as formatPrice
    } from "./price.js";

Тепер:

    formatDate(...);

    formatPrice(...);

---

# Default Export

Default export — спеціальний export модуля.

Наприклад:

    const add = (a, b) => a + b;

    export default add;

Або:

    export default function add(a, b) {
        return a + b;
    }

---

# Default Import

Default export імпортується без `{}`.

Наприклад:

    // math.js

    export default function add(a, b) {
        return a + b;
    }

Імпорт:

    import add from "./math.js";

---

# Default Import можна перейменувати

На відміну від named import, default import може мати будь-яке локальне ім'я.

Наприклад:

    import add from "./math.js";

або:

    import sum from "./math.js";

або:

    import calculate from "./math.js";

Усі варіанти можуть імпортувати той самий default export.

---

# Named vs Default

Named:

    export const add = (a, b) => a + b;

Import:

    import { add } from "./math.js";

Default:

    export default function add(a, b) {
        return a + b;
    }

Import:

    import add from "./math.js";

Головна відмінність:

    named
        ↓
    { name }

    default
        ↓
    name

---

# Named Export та Default Export разом

Модуль може містити named exports та один default export.

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

# Правило одного Default Export

Правильно:

    export default add;

Не можна:

    export default add;
    export default subtract;

В одному модулі повинен бути максимум один default export.

Але named exports можуть бути:

    export const add = ...;
    export const subtract = ...;
    export const multiply = ...;

---

# Import Default + Named

Можна одночасно імпортувати default та named exports.

    import multiply, {
        add,
        subtract
    } from "./math.js";

Структура:

    default
       ↓
    multiply

    named
       ↓
    add
    subtract

---

# Namespace Import

Можна імпортувати всі доступні named exports через:

    import * as math from "./math.js";

Наприклад:

    // math.js

    export const add = (a, b) => a + b;

    export const subtract = (a, b) => a - b;

    export const multiply = (a, b) => a * b;

І:

    // app.js

    import * as math from "./math.js";

    console.log(math.add(2, 3));
    console.log(math.subtract(10, 5));
    console.log(math.multiply(4, 5));

---

# Namespace Object

У:

    import * as math from "./math.js";

`math` — namespace object, через який доступні exports модуля.

Наприклад:

    math.add
    math.subtract
    math.multiply

Це дозволяє логічно згрупувати exports.

---

# Import All

Синтаксис:

    import * as utils from "./utils.js";

Якщо:

    // utils.js

    export const formatDate = ...;

    export const formatPrice = ...;

    export const validateEmail = ...;

то:

    utils.formatDate();

    utils.formatPrice();

    utils.validateEmail();

---

# Export Default vs Named Namespace

Важливо не плутати.

Якщо:

    export default function add() {}

то при:

    import * as math from "./math.js";

default export доступний як:

    math.default

Наприклад:

    import * as math from "./math.js";

    math.default(2, 3);

Для звичайного default import краще:

    import add from "./math.js";

---

# Export Object

Можна експортувати object як named export:

    const math = {
        add: (a, b) => a + b,
        subtract: (a, b) => a - b
    };

    export {
        math
    };

Імпорт:

    import { math } from "./math.js";

---

# Default Export Object

Можна зробити object default export:

    const config = {
        apiUrl: "/api",
        timeout: 5000
    };

    export default config;

Імпорт:

    import config from "./config.js";

---

# Export Constants

Наприклад:

    export const API_URL = "/api";

    export const VERSION = "1.0.0";

Імпорт:

    import {
        API_URL,
        VERSION
    } from "./config.js";

---

# Export Function

Наприклад:

    export function calculateTotal(price, quantity) {
        return price * quantity;
    }

Імпорт:

    import {
        calculateTotal
    } from "./cart.js";

---

# Export Class

Наприклад:

    export class User {
        constructor(name) {
            this.name = name;
        }
    }

Імпорт:

    import { User } from "./User.js";

---

# Export Function + Class + Constants

Модуль може експортувати різні типи значень:

    export const API_URL = "/api";

    export function createUser(name) {
        return new User(name);
    }

    export class User {
        constructor(name) {
            this.name = name;
        }
    }

Імпорт:

    import {
        API_URL,
        createUser,
        User
    } from "./user.js";

---

# Re-export

Можна імпортувати та експортувати значення окремо:

    import { add } from "./math.js";

    export { add };

Але можна скоротити:

    export {
        add
    } from "./math.js";

Це називається re-export.

---

# Re-export кількох значень

Наприклад:

    export {
        add,
        subtract
    } from "./math.js";

Інший модуль може:

    import {
        add,
        subtract
    } from "./index.js";

---

# Re-export з Alias

Можна змінити ім'я:

    export {
        add as sum
    } from "./math.js";

Тепер:

    import { sum } from "./index.js";

---

# Re-export Default

Default export також можна re-export-ити.

Наприклад:

    export {
        default
    } from "./User.js";

Або під новим ім'ям:

    export {
        default as User
    } from "./User.js";

Тепер:

    import { User } from "./index.js";

---

# Re-export Default + Named

Наприклад:

    export {
        default as User,
        validateUser
    } from "./User.js";

Тепер:

    import {
        User,
        validateUser
    } from "./index.js";

---

# Barrel Export

Можна створити `index.js`:

    // components/index.js

    export { Button } from "./Button.js";

    export { Modal } from "./Modal.js";

    export { Input } from "./Input.js";

Імпорт:

    import {
        Button,
        Modal,
        Input
    } from "./components/index.js";

Це дозволяє створити єдину точку входу.

---

# Export Everything

Можна re-export-ити всі named exports:

    export * from "./math.js";

Наприклад:

    // index.js

    export * from "./math.js";

Тепер exports `math.js` доступні через `index.js`.

---

# Export * та Default

Важливо:

    export * from "./math.js";

не re-export-ить default export.

Якщо потрібно re-export default:

    export {
        default
    } from "./math.js";

або:

    export {
        default as Math
    } from "./math.js";

---

# Export * as

Сучасний синтаксис дозволяє re-export-ити весь модуль як namespace.

Наприклад:

    export * as math from "./math.js";

Тепер можна:

    import {
        math
    } from "./index.js";

і:

    math.add(2, 3);

---

# Import Side Effect

Можна імпортувати модуль без bindings:

    import "./setup.js";

Це означає:

    load module
        ↓
    execute module

але exports безпосередньо не використовуються.

---

# Side Effect Example

`setup.js`:

    console.log("Application initialized");

`app.js`:

    import "./setup.js";

Під час завантаження `setup.js` буде виконаний його код.

---

# Static Import

Звичайний:

    import {
        add
    } from "./math.js";

є static import.

Він знаходиться на module level.

Не можна використовувати звичайний `import` всередині `if`:

    if (condition) {
        import { add } from "./math.js";
    }

Для умовного завантаження використовується dynamic import.

---

# Dynamic Import

Dynamic import має вигляд:

    import("./math.js");

Він повертає Promise.

Наприклад:

    const module = await import("./math.js");

Тепер:

    module.add(2, 3);

---

# Dynamic Import з then

Можна:

    import("./math.js")
        .then((module) => {
            console.log(module.add(2, 3));
        });

---

# Static vs Dynamic Import

Static:

    import { add } from "./math.js";

Dynamic:

    const module = await import("./math.js");

Static:

    dependency відома заздалегідь

Dynamic:

    dependency може завантажуватися під час виконання

---

# Dynamic Import з Condition

Наприклад:

    if (isAdmin) {
        const module = await import("./admin.js");

        module.openAdminPanel();
    }

Модуль:

    admin.js

завантажується тільки коли він потрібен.

---

# Import Path

Для локального модуля:

    import { add } from "./math.js";

Для parent directory:

    import { add } from "../math.js";

Для nested directory:

    import { add } from "./utils/math.js";

Важливо правильно визначати relative path.

---

# File Extension

У browser ESM локальний файл зазвичай імпортується з extension:

    import { add } from "./math.js";

Не:

    import { add } from "./math";

Потрібно враховувати правила конкретного середовища та bundler.

---

# Live Binding

ES Modules використовують live bindings.

Наприклад:

    // counter.js

    export let count = 0;

    export function increment() {
        count++;
    }

І:

    // app.js

    import {
        count,
        increment
    } from "./counter.js";

    console.log(count);

    increment();

    console.log(count);

Результат:

    0
    1

Імпортований binding пов'язаний з export binding модуля.

Це не просто незалежна копія значення.

---

# Import є Read-only Binding

Імпортований binding не можна переприсвоїти локально.

Наприклад:

    import {
        count
    } from "./counter.js";

    count = 10;

це помилка.

Змінювати binding повинен сам exporting module.

---

# Live Binding Example

`counter.js`:

    export let count = 0;

    export function increment() {
        count++;
    }

`app.js`:

    import {
        count,
        increment
    } from "./counter.js";

    console.log(count);

    increment();

    console.log(count);

Можна побачити оновлене значення через live binding.

---

# Import Binding vs Object Property

Важливо розрізняти:

    import binding

та:

    object property

Наприклад:

    import { user } from "./user.js";

Не означає, що можна:

    user = {};

Але можна змінювати властивості об'єкта, якщо сам об'єкт дозволяє це:

    user.name = "Peter";

Це вже зміна property object, а не reassignment imported binding.

---

# Export не копіює значення

ES Modules працюють через bindings.

Концептуально:

    module A
        ↓
    exported binding
        ↓
    module B

а не:

    module A
        ↓
    copy value
        ↓
    module B

Це важливо для розуміння live bindings.

---

# Import Ordering

Imports зазвичай розташовують на початку модуля.

Наприклад:

    import fs from "node:fs";

    import {
        createUser
    } from "./user.js";

    import {
        formatDate
    } from "./date.js";

Після imports:

    const user = createUser("John");

Це не лише питання стилю — static imports мають спеціальну семантику ESM.

---

# Multiple Imports from Same Module

Можна:

    import {
        add
    } from "./math.js";

    import {
        subtract
    } from "./math.js";

Але зазвичай читабельніше:

    import {
        add,
        subtract
    } from "./math.js";

---

# Import from Different Modules

Наприклад:

    import {
        add
    } from "./math.js";

    import {
        formatResult
    } from "./format.js";

    import {
        saveResult
    } from "./storage.js";

Тут `app.js` має три dependencies:

    math.js
    format.js
    storage.js

---

# Dependency Graph Example

Структура:

    app.js
    ├── math.js
    ├── format.js
    └── storage.js

Умовно:

    app
    ├── math
    ├── format
    └── storage

Це dependency graph.

---

# Module API

Модуль може експортувати тільки public API.

Наприклад:

    const validate = (user) => {
        return user.name.length > 0;
    };

    const save = (user) => {
        console.log("saved", user);
    };

    export function createUser(name) {
        const user = {
            name
        };

        if (!validate(user)) {
            throw new Error("Invalid user");
        }

        save(user);

        return user;
    }

Зовнішній код бачить:

    createUser

але не повинен напряму залежати від:

    validate
    save

---

# Import/Export Architecture

Наприклад:

    src/
    ├── app.js
    ├── api/
    │   └── users.js
    ├── services/
    │   └── user-service.js
    ├── utils/
    │   └── format.js
    └── config/
        └── index.js

`app.js`:

    import {
        createUser
    } from "./services/user-service.js";

`user-service.js`:

    import {
        createUserRequest
    } from "../api/users.js";

    import {
        formatUser
    } from "../utils/format.js";

Так формуються dependencies між modules.

---

# Practical Example — Math Module

Структура:

    project/
    ├── app.js
    └── math.js

`math.js`:

    export const add = (a, b) => {
        return a + b;
    };

    export const subtract = (a, b) => {
        return a - b;
    };

`app.js`:

    import {
        add,
        subtract
    } from "./math.js";

    console.log(add(10, 5));
    console.log(subtract(10, 5));

Результат:

    15
    5

---

# Practical Example — Default Module

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

# Practical Example — Alias

`math.js`:

    export const add = (a, b) => a + b;

`app.js`:

    import {
        add as sum
    } from "./math.js";

    console.log(sum(10, 20));

Результат:

    30

---

# Practical Example — Namespace

`math.js`:

    export const add = (a, b) => a + b;

    export const subtract = (a, b) => a - b;

    export const multiply = (a, b) => a * b;

`app.js`:

    import * as math from "./math.js";

    console.log(math.add(2, 3));
    console.log(math.subtract(10, 3));
    console.log(math.multiply(4, 5));

---

# Practical Example — Re-export

Структура:

    components/
    ├── Button.js
    ├── Modal.js
    └── index.js

`Button.js`:

    export class Button {
        render() {
            console.log("Button");
        }
    }

`Modal.js`:

    export class Modal {
        open() {
            console.log("Modal");
        }
    }

`index.js`:

    export {
        Button
    } from "./Button.js";

    export {
        Modal
    } from "./Modal.js";

Тепер:

    import {
        Button,
        Modal
    } from "./components/index.js";

---

# Practical Example — Export Everything

`index.js`:

    export * from "./math.js";
    export * from "./format.js";
    export * from "./validation.js";

Інший модуль:

    import {
        add,
        formatDate,
        validateEmail
    } from "./index.js";

---

# Practical Example — Default Re-export

`User.js`:

    export default class User {
        constructor(name) {
            this.name = name;
        }
    }

`index.js`:

    export {
        default as User
    } from "./User.js";

Тепер:

    import {
        User
    } from "./index.js";

---

# Practical Example — Side Effect

`analytics.js`:

    console.log("Analytics initialized");

`app.js`:

    import "./analytics.js";

Після запуску:

    Analytics initialized

---

# Practical Example — Dynamic Import

`app.js`:

    const button = document.querySelector("#button");

    button.addEventListener("click", async () => {
        const math = await import("./math.js");

        console.log(math.add(10, 20));
    });

`math.js`:

    export const add = (a, b) => a + b;

Модуль завантажується після click.

---

# Типові помилки

❌ Плутати named та default import.

Якщо:

    export const add = ...

потрібно:

    import { add } from "./math.js";

а не:

    import add from "./math.js";

---

❌ Використовувати `{}` для default import.

Якщо:

    export default add;

потрібно:

    import add from "./math.js";

---

❌ Забувати `export`.

Наприклад:

    // math.js

    const add = (a, b) => a + b;

    // app.js

    import { add } from "./math.js";

Якщо `add` не експортується, імпорт не працюватиме.

Правильно:

    export const add = (a, b) => a + b;

---

❌ Імпортувати неіснуюче ім'я.

Якщо:

    export const add = ...

не можна:

    import { sum } from "./math.js";

якщо `sum` не є exported binding.

---

❌ Помилково використовувати default import.

Наприклад:

    export const add = ...

і:

    import add from "./math.js";

Це різні типи export/import.

---

❌ Неправильно використовувати `export *`.

    export * from "./math.js";

не re-export-ить default export.

---

❌ Намагатися змінити imported binding.

    import { count } from "./counter.js";

    count = 10;

Це помилка.

---

❌ Забувати relative path.

Неправильно для локального модуля:

    import { add } from "math.js";

Правильніше:

    import { add } from "./math.js";

---

❌ Неправильно визначити шлях:

    ./utils/math.js

та:

    ../utils/math.js

можуть посилатися на різні файли.

---

❌ Використовувати static import всередині condition.

Неправильно:

    if (condition) {
        import { add } from "./math.js";
    }

Для цього потрібен:

    const module = await import("./math.js");

---

❌ Створювати непотрібні circular dependencies.

    A → B
    B → A

Краще переглянути межі відповідальності modules.

---

❌ Експортувати внутрішню реалізацію без необхідності.

Якщо:

    validateUser
    saveUser

є внутрішніми деталями, не обов'язково робити їх public API.

---

# Питання зі співбесіди

Що робить `export`?

Що робить `import`?

Що таке named export?

Що таке named import?

Що таке default export?

Що таке default import?

Яка різниця між:

    import { add }

та:

    import add

?

Скільки default exports може мати один модуль?

Скільки named exports може мати один модуль?

Як експортувати кілька значень?

Як імпортувати кілька named exports?

Що робить `as`?

Як перейменувати imported binding?

Як перейменувати exported binding?

Що робить:

    import * as utils

?

Що таке namespace import?

Як імпортувати default та named export одночасно?

Що таке re-export?

Що робить:

    export { add } from "./math.js";

?

Що робить:

    export * from "./math.js";

?

Чи re-export-ить `export *` default export?

Як re-export-ити default export?

Що таке barrel module?

Що таке side-effect import?

Чим static import відрізняється від dynamic import?

Що повертає:

    import()

?

Що таке live binding?

Чи можна переприсвоїти imported binding?

Що таке module API?

Що таке dependency graph?

---

# Шлях

🟢 Core (обов'язково знати)

`export`.

`import`.

Named export.

Named import.

Default export.

Default import.

Export list.

Import list.

`as`.

Import aliases.

Module paths.

Multiple imports.

Default + named imports.

Module scope.

Module dependencies.

---

🔵 Junior

`import * as`.

Namespace imports.

Re-export.

`export *`.

Default re-export.

Named re-export.

Barrel modules.

Side-effect imports.

Static imports.

Dynamic `import()`.

Live bindings.

Import read-only binding.

Module public API.

Dependency graph.

ESM vs CommonJS.

---

🟠 Middle

Module architecture.

Public API design.

Barrel architecture.

Circular dependencies.

Dynamic module loading.

Lazy loading.

Code splitting.

Tree shaking.

Side effects.

Module initialization.

Top-level `await`.

ESM + bundlers.

ESM + Node.js.

Dependency boundaries.

Module responsibility.

---

🔴 Senior

ECMAScript Module semantics.

Module linking.

Module instantiation.

Module evaluation.

Live bindings.

Module namespace objects.

Cyclic dependencies.

Static dependency analysis.

Dynamic module loading.

Tree shaking limitations.

Package exports.

Conditional exports.

ESM/CommonJS interoperability.

Module resolution.

Dependency graph optimization.

Module boundary design.

---

# Міні-шпаргалка

## Named Export

    export const add = (a, b) => a + b;

Import:

    import { add } from "./math.js";

---

## Named Export List

    const add = (a, b) => a + b;

    const subtract = (a, b) => a - b;

    export {
        add,
        subtract
    };

---

## Named Import

    import {
        add,
        subtract
    } from "./math.js";

---

## Alias

    import {
        add as sum
    } from "./math.js";

---

## Default Export

    export default function add(a, b) {
        return a + b;
    }

Import:

    import add from "./math.js";

---

## Default + Named

    import multiply, {
        add,
        subtract
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

## Re-export All

    export * from "./math.js";

---

## Re-export Default

    export {
        default as User
    } from "./User.js";

---

## Side Effect

    import "./setup.js";

---

## Dynamic Import

    const module = await import("./math.js");

    module.add(2, 3);

---

## Live Binding

    // counter.js

    export let count = 0;

    export const increment = () => {
        count++;
    };

---

## Browser

    <script
        type="module"
        src="./app.js"
    ></script>

---

# Основні правила

    export
        → зробити binding доступним

    import
        → використати binding

    named export
        → import { name }

    default export
        → import name

    as
        → alias

    import * as
        → namespace

    export { ... } from
        → re-export

    export *
        → re-export named exports

    import()
        → dynamic import

    import "./module.js"
        → side-effect import

---

# Головне:

• `export` відкриває binding для інших modules.

• `import` отримує binding з іншого module.

• Named export має конкретне ім'я.

• Named import використовує `{}`:

    import { add } from "./math.js";

• Default export імпортується без `{}`:

    import add from "./math.js";

• Один module може мати багато named exports.

• Один module може мати максимум один default export.

• Named export можна перейменувати через `as`.

• Named import можна перейменувати через `as`.

• Default import може мати довільне локальне ім'я.

• `import * as math` створює namespace object.

• `export { ... } from` використовується для re-export.

• `export * from` re-export-ить named exports, але не default export.

• Default export можна re-export-ити окремо:

    export {
        default as User
    } from "./User.js";

• Side-effect import:

    import "./setup.js";

завантажує та виконує модуль без використання конкретного binding.

• Static import:

    import { add } from "./math.js";

визначається статично.

• Dynamic import:

    import("./math.js");

повертає Promise і дозволяє завантажувати module під час виконання.

• Imported bindings є live bindings.

• Imported binding не можна переприсвоїти локально.

• Модулі можуть формувати чіткий public API.

• Не потрібно експортувати внутрішню реалізацію без необхідності.

• `index.js` часто використовується для re-export та створення єдиної точки входу.

• Основна різниця:

    named
        ↓
    export { name }
        ↓
    import { name }

    default
        ↓
    export default value
        ↓
    import value

• Основна модель:

    module A
        │
        │ export
        ↓
    binding
        │
        │ import
        ↓
    module B

• Для повсякденної роботи потрібно впевнено володіти:

    export
    import
    named export
    default export
    alias
    namespace import
    re-export
    dynamic import

• Хороший module не просто містить код — він визначає чіткий public API.

• `import` та `export` дозволяють перетворити окремі JavaScript-файли на систему взаємопов'язаних модулів:

    module
       ↓
    public API
       ↓
    import
       ↓
    dependency
       ↓
    application