## 05. Objects

Object (об'єкт) — це структура даних JavaScript, яка дозволяє зберігати пов'язані дані та функції у вигляді пар `key: value`.

Object використовується для представлення сутностей:

    user
    product
    order
    car
    book
    article
    settings

Наприклад:

    const user = {
        name: "Valeriy",
        age: 56,
        isActive: true
    };

Об'єкт `user` містить властивості:

    name
    age
    isActive

JavaScript також дозволяє зберігати в object функції. Такі функції називаються methods.

### Ключові поняття

✔ object  
✔ property  
✔ key  
✔ value  
✔ key-value pair  
✔ object literal  
✔ property access  
✔ dot notation  
✔ bracket notation  
✔ method  
✔ nested object  
✔ object mutation  
✔ object reference  
✔ shallow copy  
✔ deep copy  
✔ destructuring  
✔ spread operator  
✔ `Object.keys()`  
✔ `Object.values()`  
✔ `Object.entries()`  
✔ `Object.assign()`  
✔ optional chaining  
✔ computed property  
✔ property shorthand  
✔ `this`  

### Що потрібно пам'ятати

• Object — структура для зберігання пов'язаних даних.

• Дані object зберігаються у вигляді пар `key: value`.

• `key` — ім'я властивості.

• `value` — значення властивості.

• Value може бути будь-якого типу JavaScript:
  - string
  - number
  - boolean
  - null
  - undefined
  - array
  - object
  - function
  - інші значення.

• Властивість можна отримати через dot notation:

    user.name

• Властивість можна отримати через bracket notation:

    user["name"]

• Якщо property name зберігається у змінній, потрібно використовувати bracket notation.

• Object може містити інші objects.

• Object може містити arrays.

• Function, яка належить object, називається method.

• Objects є reference types.

• Якщо дві змінні посилаються на один object, зміна через одну змінну буде видима через іншу.

• Object можна змінювати після створення.

• `const` не робить object immutable.

• `const` забороняє переприсвоїти саму змінну, але не забороняє змінювати properties object.

• Object можна скопіювати за допомогою spread operator `...`.

• Spread copy створює shallow copy.

• Для вкладених objects shallow copy не копіює всю структуру рекурсивно.

• Destructuring дозволяє отримувати properties object у змінні.

• `Object.keys()` повертає масив ключів.

• `Object.values()` повертає масив значень.

• `Object.entries()` повертає масив пар `[key, value]`.

• Optional chaining `?.` дозволяє безпечно звертатися до вкладених properties.

### Основні терміни

**Object**

Структура даних, яка зберігає дані у вигляді properties.

    const user = {
        name: "Valeriy",
        age: 56
    };

**Property**

Властивість object.

    user.name

Тут `name` — property.

**Key**

Ключ property.

    {
        name: "Valeriy"
    }

`name` — key.

**Value**

Значення property.

    {
        name: "Valeriy"
    }

`"Valeriy"` — value.

**Key-Value Pair**

Пара:

    key: value

Наприклад:

    name: "Valeriy"

**Object Literal**

Створення object за допомогою `{}`.

    const user = {
        name: "Valeriy",
        age: 56
    };

**Method**

Функція, яка є property object.

    const user = {
        name: "Valeriy",

        greet() {
            console.log("Hello!");
        }
    };

`greet()` — method.

**Nested Object**

Object всередині іншого object.

    const user = {
        name: "Valeriy",

        address: {
            city: "Vinnytsia",
            country: "Ukraine"
        }
    };

**Object Reference**

Змінна object зберігає посилання на object, а не сам object як просте значення.

    const user1 = {
        name: "Valeriy"
    };

    const user2 = user1;

Тепер:

    user1 → object
    user2 ─┘

Обидві змінні посилаються на один object.

### Створення Object

Найчастіше object створюють через object literal:

    const user = {
        name: "Valeriy",
        age: 56,
        city: "Vinnytsia"
    };

Порожній object:

    const user = {};

Властивості можна додавати після створення:

    const user = {};

    user.name = "Valeriy";
    user.age = 56;

### Object Properties

Object може містити багато properties:

    const user = {
        name: "Valeriy",
        age: 56,
        email: "user@example.com",
        isActive: true
    };

Структура:

    user
    │
    ├── name → "Valeriy"
    ├── age → 56
    ├── email → "user@example.com"
    └── isActive → true

### Property Access

Існує два основних способи доступу до properties.

Dot notation:

    user.name

Bracket notation:

    user["name"]

Результат однаковий:

    console.log(user.name);
    console.log(user["name"]);

### Dot Notation

Найчастіше використовується dot notation:

    const user = {
        name: "Valeriy",
        age: 56
    };

    console.log(user.name);
    // Valeriy

    console.log(user.age);
    // 56

### Bracket Notation

Bracket notation:

    console.log(user["name"]);

    console.log(user["age"]);

Вона особливо корисна, коли property name зберігається у змінній.

    const property = "name";

    console.log(user[property]);

Результат:

    Valeriy

Це НЕ те саме:

    console.log(user.property);

У цьому випадку JavaScript шукає property з назвою `"property"`.

### Dot vs Bracket

Dot notation:

    user.name

Bracket notation:

    user["name"]

Якщо ключ відомий:

    user.name

Якщо ключ знаходиться у змінній:

    const key = "name";

    user[key]

### Dynamic Property Access

Наприклад:

    const user = {
        name: "Valeriy",
        age: 56,
        city: "Vinnytsia"
    };

    const key = "city";

    console.log(user[key]);
    // Vinnytsia

Це дуже важливо для роботи з динамічними даними.

### Додавання Property

Property можна додати:

    const user = {
        name: "Valeriy"
    };

    user.age = 56;

Тепер:

    {
        name: "Valeriy",
        age: 56
    }

Через bracket notation:

    user["city"] = "Vinnytsia";

### Зміна Property

    const user = {
        name: "Valeriy",
        age: 56
    };

    user.age = 57;

Тепер:

    user.age
    // 57

### Видалення Property

Для видалення використовується `delete`.

    const user = {
        name: "Valeriy",
        age: 56
    };

    delete user.age;

Тепер:

    {
        name: "Valeriy"
    }

### Перевірка Property

Можна перевірити існування property через `in`.

    const user = {
        name: "Valeriy",
        age: 56
    };

    console.log("name" in user);
    // true

    console.log("email" in user);
    // false

Також можна перевірити значення:

    console.log(user.email !== undefined);

Але `in` і перевірка на `undefined` не завжди еквівалентні.

Наприклад:

    const user = {
        name: undefined
    };

    console.log("name" in user);
    // true

    console.log(user.name === undefined);
    // true

### Property Shorthand

Якщо назва змінної та property однакові, можна використовувати короткий синтаксис.

Замість:

    const name = "Valeriy";
    const age = 56;

    const user = {
        name: name,
        age: age
    };

Можна:

    const name = "Valeriy";
    const age = 56;

    const user = {
        name,
        age
    };

Це називається property shorthand.

### Computed Property Names

Property можна створювати динамічно.

    const key = "name";

    const user = {
        [key]: "Valeriy"
    };

Результат:

    {
        name: "Valeriy"
    }

Ще приклад:

    const property = "age";

    const user = {
        [property]: 56
    };

### Object Methods

Object може містити functions.

    const user = {
        name: "Valeriy",

        greet() {
            console.log("Hello!");
        }
    };

Виклик:

    user.greet();

Method може використовувати properties object.

    const user = {
        name: "Valeriy",

        greet() {
            console.log(`Hello, ${this.name}!`);
        }
    };

    user.greet();

### `this` в Object Methods

У method object `this` зазвичай посилається на object, через який викликається method.

    const user = {
        name: "Valeriy",

        greet() {
            console.log(this.name);
        }
    };

    user.greet();

Результат:

    Valeriy

На цьому етапі важливо запам'ятати:

    object
       ↓
    method
       ↓
    this
       ↓
    current object

Детальніше `this` буде розглядатися пізніше.

### Nested Objects

Object може містити інший object.

    const user = {
        name: "Valeriy",

        address: {
            city: "Vinnytsia",
            country: "Ukraine"
        }
    };

Доступ:

    console.log(user.address.city);
    // Vinnytsia

Або:

    console.log(user.address.country);
    // Ukraine

Ментальна модель:

    user
    │
    ├── name
    │
    └── address
        │
        ├── city
        └── country

### Objects та Arrays

Object може містити array:

    const user = {
        name: "Valeriy",
        skills: ["JavaScript", "React", "Node.js"]
    };

Доступ:

    console.log(user.skills[0]);
    // JavaScript

Array може містити objects:

    const users = [
        {
            name: "Valeriy",
            age: 56
        },
        {
            name: "Anna",
            age: 30
        }
    ];

Доступ:

    console.log(users[0].name);
    // Valeriy

### Object у Object у Array

У реальних applications структура часто має декілька рівнів.

    const company = {
        name: "Example",

        employees: [
            {
                name: "Valeriy",
                role: "Developer"
            },
            {
                name: "Anna",
                role: "Designer"
            }
        ]
    };

Доступ:

    company.employees[0].name;

Результат:

    Valeriy

### Destructuring

Destructuring дозволяє витягнути properties object у змінні.

Замість:

    const user = {
        name: "Valeriy",
        age: 56
    };

    const name = user.name;
    const age = user.age;

Можна:

    const { name, age } = user;

Тепер:

    console.log(name);
    console.log(age);

### Destructuring з перейменуванням

    const user = {
        name: "Valeriy"
    };

    const { name: userName } = user;

Тепер:

    console.log(userName);
    // Valeriy

### Default Value у Destructuring

    const user = {
        name: "Valeriy"
    };

    const { name, age = 18 } = user;

    console.log(age);
    // 18

### Nested Destructuring

    const user = {
        name: "Valeriy",

        address: {
            city: "Vinnytsia"
        }
    };

    const {
        address: {
            city
        }
    } = user;

    console.log(city);
    // Vinnytsia

На початковому етапі краще не зловживати надмірно глибоким destructuring.

### Rest у Destructuring

Можна отримати окрему property, а решту зібрати в object.

    const user = {
        name: "Valeriy",
        age: 56,
        city: "Vinnytsia"
    };

    const { name, ...details } = user;

Тепер:

    name
    // Valeriy

    details
    // { age: 56, city: "Vinnytsia" }

### Spread Operator

Spread operator `...` дозволяє створити новий object на основі існуючого.

    const user = {
        name: "Valeriy",
        age: 56
    };

    const copy = {
        ...user
    };

Тепер:

    copy
    // { name: "Valeriy", age: 56 }

### Додавання Properties через Spread

    const user = {
        name: "Valeriy"
    };

    const updatedUser = {
        ...user,
        age: 56
    };

Результат:

    {
        name: "Valeriy",
        age: 56
    }

### Оновлення Property через Spread

    const user = {
        name: "Valeriy",
        age: 56
    };

    const updatedUser = {
        ...user,
        age: 57
    };

Результат:

    {
        name: "Valeriy",
        age: 57
    }

Якщо property повторюється, останнє значення перемагає.

    const user = {
        name: "Valeriy",
        age: 56
    };

    const updatedUser = {
        ...user,
        age: 57
    };

### Object Reference

Objects є reference types.

    const user1 = {
        name: "Valeriy"
    };

    const user2 = user1;

    user2.name = "John";

Тепер:

    console.log(user1.name);
    // John

Чому?

Тому що:

    user1 ──┐
            ├──► object
    user2 ──┘

Обидві змінні посилаються на один object.

### Object Comparison

Два objects з однаковими даними не обов'язково рівні.

    const user1 = {
        name: "Valeriy"
    };

    const user2 = {
        name: "Valeriy"
    };

    console.log(user1 === user2);
    // false

Вони є різними objects.

Порівнюються references.

    const user1 = {
        name: "Valeriy"
    };

    const user2 = user1;

    console.log(user1 === user2);
    // true

Тут reference однаковий.

### `const` і Objects

`const` не робить object незмінним.

Можна:

    const user = {
        name: "Valeriy"
    };

    user.name = "John";

Це працює.

Але не можна:

    const user = {
        name: "Valeriy"
    };

    user = {
        name: "John"
    };

Це спроба переприсвоїти саму змінну.

### Shallow Copy

Spread створює shallow copy.

    const user = {
        name: "Valeriy",
        age: 56
    };

    const copy = {
        ...user
    };

    copy.name = "John";

    console.log(user.name);
    // Valeriy

Це незалежні objects на першому рівні.

Але з nested object:

    const user = {
        name: "Valeriy",

        address: {
            city: "Vinnytsia"
        }
    };

    const copy = {
        ...user
    };

    copy.address.city = "Kyiv";

    console.log(user.address.city);
    // Kyiv

Чому?

Тому що nested `address` залишився спільним reference.

Ментальна модель:

    user
      │
      └── address ──► object

    copy
      │
      └── address ──┘

### Object.keys()

`Object.keys()` повертає масив keys.

    const user = {
        name: "Valeriy",
        age: 56,
        city: "Vinnytsia"
    };

    console.log(Object.keys(user));

Результат:

    ["name", "age", "city"]

### Object.values()

`Object.values()` повертає масив values.

    console.log(Object.values(user));

Результат:

    ["Valeriy", 56, "Vinnytsia"]

### Object.entries()

`Object.entries()` повертає масив пар:

    [key, value]

Приклад:

    console.log(Object.entries(user));

Результат:

    [
        ["name", "Valeriy"],
        ["age", 56],
        ["city", "Vinnytsia"]
    ]

Це зручно для перебору object.

    for (const [key, value] of Object.entries(user)) {
        console.log(key, value);
    }

### Object.assign()

`Object.assign()` копіює properties з одного або декількох objects в інший.

    const user = {
        name: "Valeriy"
    };

    const details = {
        age: 56
    };

    const result = Object.assign({}, user, details);

Результат:

    {
        name: "Valeriy",
        age: 56
    }

Сучасний код часто використовує spread:

    const result = {
        ...user,
        ...details
    };

### Optional Chaining

Optional chaining `?.` дозволяє безпечно звертатися до nested properties.

Без optional chaining:

    const user = {};

    console.log(user.address.city);

Якщо `address` не існує, виникне помилка.

З optional chaining:

    console.log(user.address?.city);

Результат:

    undefined

Ще приклад:

    const city = user.address?.city;

### Nullish Coalescing

Разом із object часто використовується `??`.

    const user = {};

    const city = user.address?.city ?? "Unknown";

    console.log(city);
    // Unknown

`??` використовує праве значення, якщо ліве — `null` або `undefined`.

### Перебір Object

Object не перебирають через `for...of` безпосередньо.

Наприклад, це не працює:

    const user = {
        name: "Valeriy",
        age: 56
    };

    for (const value of user) {
        console.log(value);
    }

Для object можна використовувати `for...in`:

    for (const key in user) {
        console.log(key);
    }

Або:

    for (const key in user) {
        console.log(key, user[key]);
    }

Також:

    for (const [key, value] of Object.entries(user)) {
        console.log(key, value);
    }

### Objects і Functions

Function може приймати object як argument.

    function greet(user) {
        console.log(`Hello, ${user.name}!`);
    }

    const user = {
        name: "Valeriy"
    };

    greet(user);

Це дуже поширений патерн у JavaScript.

### Functions, які повертають Objects

Функція може створювати та повертати object.

    function createUser(name, age) {
        return {
            name,
            age
        };
    }

    const user = createUser("Valeriy", 56);

    console.log(user);

### Objects як параметри

Object дозволяє передавати багато пов'язаних значень одним argument.

Замість:

    function createUser(name, age, email, city) {
        // ...
    }

Можна:

    function createUser(user) {
        console.log(user.name);
        console.log(user.age);
        console.log(user.email);
        console.log(user.city);
    }

І виклик:

    createUser({
        name: "Valeriy",
        age: 56,
        email: "user@example.com",
        city: "Vinnytsia"
    });

Цей підхід дуже часто використовується у frontend і backend.

### Destructuring у Parameters

Можна одразу destructure object у параметрах.

    function greet({ name, age }) {
        console.log(`Hello, ${name}`);
        console.log(`Age: ${age}`);
    }

    greet({
        name: "Valeriy",
        age: 56
    });

### Object Immutability

У сучасному JavaScript часто намагаються не змінювати існуючі objects без необхідності.

Замість:

    user.age = 57;

можна створити новий object:

    const updatedUser = {
        ...user,
        age: 57
    };

Це особливо важливо в:
- React;
- Redux;
- state management;
- functional programming.

### Object.freeze()

`Object.freeze()` забороняє змінювати properties object у звичайному режимі.

    const user = {
        name: "Valeriy"
    };

    Object.freeze(user);

    user.name = "John";

У strict mode така спроба може спричинити помилку.

Важливо:

`Object.freeze()` є shallow.

Nested objects не заморожуються автоматично.

### Object і Data Modeling

Objects часто використовуються для представлення реальних сутностей.

Наприклад user:

    const user = {
        id: 1,
        name: "Valeriy",
        email: "user@example.com",
        isActive: true
    };

Product:

    const product = {
        id: 101,
        title: "Laptop",
        price: 1200,
        inStock: true
    };

Order:

    const order = {
        id: 5001,
        userId: 1,
        total: 2500,
        status: "paid"
    };

Це основа роботи з даними у frontend, backend, API та databases.

### JSON і Objects

Object дуже часто використовується разом із JSON.

JavaScript object:

    const user = {
        name: "Valeriy",
        age: 56
    };

Перетворення object у JSON:

    const json = JSON.stringify(user);

Результат:

    {"name":"Valeriy","age":56}

JSON назад у JavaScript object:

    const user = JSON.parse(json);

Це буде особливо важливо при роботі з REST API.

### Типові помилки

❌ Плутати object і JSON.

Object — структура JavaScript.

JSON — текстовий формат даних.

❌ Плутати key і value.

    {
        name: "Valeriy"
    }

`name` → key

`"Valeriy"` → value

❌ Плутати dot notation і bracket notation.

    user.name

    user["name"]

❌ Використовувати dot notation для dynamic key.

    const key = "name";

    user.key;

Це шукає property `"key"`.

Правильно:

    user[key];

❌ Вважати, що `const` робить object immutable.

    const user = {
        name: "Valeriy"
    };

    user.name = "John";

Це дозволено.

❌ Порівнювати objects за вмістом через `===`.

    { name: "John" } === { name: "John" }

Результат:

    false

❌ Забувати про reference behavior.

    const a = {};
    const b = a;

    b.name = "John";

`a.name` також стане `"John"`.

❌ Вважати spread повною deep copy.

    const copy = {
        ...user
    };

Це лише shallow copy.

❌ Занадто глибоко вкладати objects.

❌ Створювати об'єкти з незрозумілою структурою.

❌ Зберігати багато різних типів даних без чіткої моделі.

❌ Надмірно використовувати `delete`, коли краще створити новий object.

### Практичні приклади

#### 1. User Object

    const user = {
        id: 1,
        name: "Valeriy",
        age: 56,
        isActive: true
    };

    console.log(user.name);
    console.log(user.age);

#### 2. Зміна користувача

    const user = {
        name: "Valeriy",
        age: 56
    };

    user.age = 57;

    console.log(user.age);
    // 57

#### 3. Додавання property

    const user = {
        name: "Valeriy"
    };

    user.email = "user@example.com";

#### 4. Dynamic property

    const user = {
        name: "Valeriy",
        age: 56
    };

    const key = "age";

    console.log(user[key]);
    // 56

#### 5. Nested object

    const user = {
        name: "Valeriy",

        address: {
            city: "Vinnytsia",
            country: "Ukraine"
        }
    };

    console.log(user.address.city);
    // Vinnytsia

#### 6. Object method

    const user = {
        name: "Valeriy",

        greet() {
            console.log(`Hello, ${this.name}!`);
        }
    };

    user.greet();

#### 7. Destructuring

    const user = {
        name: "Valeriy",
        age: 56
    };

    const { name, age } = user;

    console.log(name);
    console.log(age);

#### 8. Object copy

    const user = {
        name: "Valeriy",
        age: 56
    };

    const copy = {
        ...user
    };

#### 9. Object update

    const user = {
        name: "Valeriy",
        age: 56
    };

    const updatedUser = {
        ...user,
        age: 57
    };

#### 10. Object keys

    const user = {
        name: "Valeriy",
        age: 56,
        city: "Vinnytsia"
    };

    console.log(Object.keys(user));

#### 11. Object values

    console.log(Object.values(user));

#### 12. Object entries

    for (const [key, value] of Object.entries(user)) {
        console.log(`${key}: ${value}`);
    }

#### 13. Array of objects

    const users = [
        {
            id: 1,
            name: "Valeriy"
        },
        {
            id: 2,
            name: "Anna"
        }
    ];

    for (const user of users) {
        console.log(user.name);
    }

#### 14. Function with object

    function getUserName(user) {
        return user.name;
    }

    const user = {
        name: "Valeriy"
    };

    console.log(getUserName(user));

#### 15. Create object with function

    function createUser(name, age) {
        return {
            name,
            age
        };
    }

    const user = createUser("Valeriy", 56);

### Як мислити про Object

Корисна ментальна модель:

    Object
       │
       ├── property
       │     ├── key
       │     └── value
       │
       ├── property
       │     ├── key
       │     └── value
       │
       └── method
             └── function

Наприклад:

    user
    │
    ├── id → 1
    ├── name → "Valeriy"
    ├── age → 56
    ├── isActive → true
    │
    └── greet()
          │
          └── function

### Object як модель реального об'єкта

Можна мислити так:

    REAL WORLD
        ↓
    ENTITY
        ↓
    JAVASCRIPT OBJECT
        ↓
    PROPERTIES + METHODS

Наприклад:

    Реальний користувач
          ↓
        User
          ↓
    {
        id,
        name,
        email,
        isActive
    }

Це фундаментальна ідея object-oriented programming.

### Object і Application

У реальному application objects використовуються всюди:

    User
    Product
    Order
    Article
    Comment
    Settings
    Configuration
    API response
    Form data
    Database record

Наприклад API може повернути:

    {
        "id": 1,
        "name": "Valeriy",
        "email": "user@example.com"
    }

JavaScript application працює з цими даними як з objects.

### Питання зі співбесіди

Що таке object у JavaScript?

Що таке property?

Що таке key?

Що таке value?

Що таке key-value pair?

Що таке object literal?

Як створити object?

Як отримати property object?

Яка різниця між dot notation і bracket notation?

Коли потрібно використовувати bracket notation?

Як додати property до object?

Як змінити property?

Як видалити property?

Що таке method?

Що таке nested object?

Як отримати значення з nested object?

Що таке object reference?

Чому:

    {} === {}

повертає `false`?

Що відбувається:

    const a = {};
    const b = a;

Чи робить `const` object immutable?

Що таке shallow copy?

Як створити shallow copy object?

Що робить spread operator?

Що таке destructuring?

Що робить `Object.keys()`?

Що робить `Object.values()`?

Що робить `Object.entries()`?

Що таке computed property?

Що таке optional chaining?

Що таке `this` в object method?

Яка різниця між object і JSON?

Що таке `Object.freeze()`?

Чому spread operator не створює deep copy?

### Шлях

🟢 **Core (обов'язково знати)**

Що таке object.

Що таке property.

Що таке key.

Що таке value.

Key-value structure.

Object literal.

Створення objects.

Доступ до properties.

Dot notation.

Bracket notation.

Додавання properties.

Зміна properties.

Видалення properties.

Nested objects.

Objects та arrays.

Methods.

Основи `this`.

Object reference.

Основи destructuring.

---

🔵 **Junior**

Property shorthand.

Computed properties.

Dynamic property access.

Destructuring objects.

Default values у destructuring.

Rest у destructuring.

Spread operator.

Shallow copy.

Object comparison.

`Object.keys()`.

`Object.values()`.

`Object.entries()`.

`Object.assign()`.

Optional chaining.

Nullish coalescing.

Objects як function arguments.

Destructuring у function parameters.

Objects у масивах.

Робота з API objects.

Object ↔ JSON.

---

🟠 **Middle**

Deep copy.

Reference semantics.

Immutability.

`Object.freeze()`.

`Object.seal()`.

Property descriptors.

Getters.

Setters.

Prototype chain.

`Object.create()`.

Constructor functions.

`this` та methods.

Binding `this`.

Object composition.

Object-based design.

Data modeling.

Objects у REST API.

Objects у state management.

Nested data structures.

Normalization data.

---

🔴 **Senior**

Prototype system.

Prototype chain internals.

Property descriptors.

`Object.defineProperty()`.

Advanced object metaprogramming.

`Proxy`.

`Reflect`.

Symbols.

WeakMap.

WeakSet.

Advanced immutability.

Deep cloning trade-offs.

Object performance.

Hidden classes / shapes.

Memory behavior.

Object-oriented design.

Composition vs inheritance.

Domain modeling.

Advanced data structures.

Object serialization.

API data modeling.

State architecture.

Trade-offs між mutable та immutable підходами.

### Міні-шпаргалка

Object:

    const user = {
        name: "Valeriy",
        age: 56
    };

Property:

    user.name

Bracket notation:

    user["name"]

Dynamic property:

    const key = "name";

    user[key]

Add:

    user.email = "user@example.com";

Update:

    user.age = 57;

Delete:

    delete user.email;

Method:

    const user = {
        greet() {
            console.log("Hello");
        }
    };

    user.greet();

Nested object:

    const user = {
        address: {
            city: "Vinnytsia"
        }
    };

Access:

    user.address.city

Destructuring:

    const { name, age } = user;

Spread:

    const copy = {
        ...user
    };

Update через spread:

    const updated = {
        ...user,
        age: 57
    };

Keys:

    Object.keys(user)

Values:

    Object.values(user)

Entries:

    Object.entries(user)

Check property:

    "name" in user

Optional chaining:

    user.address?.city

Nullish fallback:

    user.address?.city ?? "Unknown"

Object reference:

    const a = {};
    const b = a;

    a === b;
    // true

Different objects:

    const a = {};
    const b = {};

    a === b;
    // false

JSON:

    const json = JSON.stringify(user);

    const object = JSON.parse(json);

Основна модель:

    Object
    │
    ├── Properties
    │    ├── key
    │    └── value
    │
    └── Methods
         └── functions

### Головне:

• Object — основна структура для представлення сутностей та пов'язаних даних у JavaScript.

• Object складається з properties.

• Property складається з `key` та `value`.

• Value може бути будь-якого JavaScript типу.

• Доступ до properties здійснюється через dot notation або bracket notation.

• Bracket notation потрібна, коли property name динамічний або містить особливі символи.

• Function всередині object називається method.

• Object може містити nested objects та arrays.

• Objects є reference types.

• Дві змінні можуть посилатися на один object.

• `const` не робить object immutable.

• Spread operator створює shallow copy.

• Destructuring дозволяє зручно отримувати properties.

• `Object.keys()` повертає keys.

• `Object.values()` повертає values.

• `Object.entries()` повертає `[key, value]`.

• Optional chaining `?.` дозволяє безпечно працювати з nested properties.

• `??` дозволяє задавати fallback для `null` та `undefined`.

• Object часто використовується як модель реальної сутності.

• Objects є фундаментом роботи з даними у frontend, backend, API та Node.js.

• Object є однією з фундаментальних основ подальшого вивчення `classes` та `OOP`.

• Розуміння object references особливо важливе для React, Redux, state management та роботи з даними.