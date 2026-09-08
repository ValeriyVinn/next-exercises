# Null and Undefined у TypeScript

## Зміст

1. [Що таке `null` та `undefined`](#що-таке-null-та-undefined)
2. [Різниця між `null` та `undefined`](#різниця-між-null-та-undefined)
3. [Типи `null` та `undefined`](#типи-null-та-undefined)
4. [Strict Null Checks](#strict-null-checks)
5. [Nullable Types](#nullable-types)
6. [Union Types з `null` та `undefined`](#union-types-з-null-та-undefined)
7. [Перевірка на `null` та `undefined`](#перевірка-на-null-та-undefined)
8. [Optional Properties](#optional-properties)
9. [Optional Parameters](#optional-parameters)
10. [Optional Chaining](#optional-chaining)
11. [Nullish Coalescing](#nullish-coalescing)
12. [Non-null Assertion Operator](#non-null-assertion-operator)
13. [Type Narrowing](#type-narrowing)
14. [Type Guards](#type-guards)
15. [`null` та `undefined` у функціях](#null-та-undefined-у-функціях)
16. [`null` та `undefined` у масивах](#null-та-undefined-у-масивах)
17. [`null` та `undefined` в об'єктах](#null-та-undefined-в-обєктах)
18. [`null` та `undefined` у DOM](#null-та-undefined-у-dom)
19. [`null` та `undefined` в API](#null-та-undefined-в-api)
20. [Типові помилки](#типові-помилки)
21. [Практичні вправи](#практичні-вправи)
22. [Mini Projects](#mini-projects)
23. [Питання для співбесіди](#питання-для-співбесіди)
24. [Рівні володіння](#рівні-володіння)
25. [Mini Cheat Sheet](#mini-cheat-sheet)
26. [Головне](#головне)

---

# Що таке `null` та `undefined`

`null` та `undefined` — це два спеціальні значення JavaScript, які використовуються для позначення відсутності значення.

TypeScript додає до них важливу властивість:

> TypeScript може контролювати, чи допускає тип `null` або `undefined`.

Наприклад:

    let name: string = "Valeriy";

Тут `name` повинен містити `string`.

Якщо спробувати:

    name = null;

при увімкненому `strictNullChecks` TypeScript покаже помилку.

---

# Різниця між `null` та `undefined`

## `undefined`

`undefined` зазвичай означає:

> значення не було задано.

Наприклад:

    let username: string | undefined;

    console.log(username);

Результат:

    undefined

Також `undefined` повертається при зверненні до неіснуючого елемента масиву:

    const users = ["Anna", "John"];

    const user = users[10];

    console.log(user);

Результат:

    undefined

---

## `null`

`null` зазвичай означає:

> значення свідомо відсутнє.

Наприклад:

    let selectedUser: string | null = null;

Тут ми явно говоримо:

> зараз користувач не вибраний.

Пізніше:

    selectedUser = "John";

---

# Головна різниця

| Значення | Основний сенс |
|---|---|
| `undefined` | значення не було задане |
| `null` | значення навмисно відсутнє |
| `string` | є текстове значення |
| `number` | є числове значення |

Наприклад:

    let username: string | undefined;

    let selectedUser: string | null = null;

Це різні моделі стану.

---

# Типи `null` та `undefined`

У TypeScript існують окремі типи:

    let a: null = null;

    let b: undefined = undefined;

Це означає, що змінна може містити тільки відповідне значення.

Наприклад:

    let value: null = null;

    value = "hello";

Помилка.

Аналогічно:

    let result: undefined = undefined;

    result = 10;

Помилка.

---

# Strict Null Checks

Одна з найважливіших можливостей TypeScript:

    "strictNullChecks": true

Коли `strictNullChecks` увімкнено, `null` та `undefined` не входять автоматично до всіх інших типів.

Наприклад:

    let name: string = "John";

    name = null;

TypeScript:

    Type 'null' is not assignable to type 'string'.

Це дуже важливо для type safety.

---

# Без `strictNullChecks`

У старих або менш строгих конфігураціях TypeScript `null` та `undefined` можуть поводитися менш безпечно.

Наприклад:

    let name: string = null;

Це може бути дозволено.

Проблема полягає в тому, що код очікує `string`, але фактично отримує `null`.

У результаті можливі runtime errors.

---

# Рекомендація

Для сучасних TypeScript-проєктів:

    {
        "compilerOptions": {
            "strict": true
        }
    }

`strict: true` автоматично вмикає `strictNullChecks`.

---

# Nullable Types

Nullable type — це тип, який може містити `null`.

Наприклад:

    let username: string | null;

Тепер дозволені:

    username = "John";

    username = null;

Але:

    username = 123;

заборонено.

---

# `undefined` як частина типу

Аналогічно:

    let username: string | undefined;

Дозволено:

    username = "John";

    username = undefined;

Але:

    username = null;

не дозволено.

---

# `null` та `undefined` разом

Іноді значення може бути відсутнім у двох формах:

    let username: string | null | undefined;

Тепер можливі:

    username = "John";

    username = null;

    username = undefined;

---

# Коли використовувати `null`

`null` добре підходить, коли відсутність значення є частиною бізнес-логіки.

Наприклад:

    interface User {
        id: number;
        name: string;
        avatar: string | null;
    }

Користувач може не мати аватарки.

Тоді:

    const user: User = {
        id: 1,
        name: "John",
        avatar: null
    };

---

# Коли використовувати `undefined`

`undefined` часто використовується для:

- необов'язкових параметрів;
- необов'язкових властивостей;
- результатів пошуку;
- відсутності поверненого значення;
- значень, які не були задані.

Наприклад:

    interface User {
        id: number;
        name: string;
        age?: number;
    }

`age` може бути відсутнім.

---

# Union Types з `null` та `undefined`

`null` та `undefined` часто використовуються разом із union types.

Наприклад:

    function findUser(id: number): User | undefined {
        // ...
    }

Функція може повернути:

    User

або:

    undefined

Тому TypeScript змушує нас перевірити результат.

---

# Перевірка на `null` та `undefined`

## Явна перевірка

    if (value === null) {
        console.log("Value is null");
    }

Для `undefined`:

    if (value === undefined) {
        console.log("Value is undefined");
    }

---

# Перевірка через `== null`

Цікавий патерн:

    if (value == null) {
        // null або undefined
    }

При `==`:

    null == undefined

дає:

    true

Але:

    null === undefined

дає:

    false

Тому:

    value == null

можна використовувати як коротку перевірку:

> `null` або `undefined`.

---

# Перевірка через `typeof`

Для `undefined`:

    if (typeof value === "undefined") {
        console.log("Value is undefined");
    }

Це особливо корисно, коли змінна потенційно може ще не існувати.

Наприклад:

    if (typeof someVariable === "undefined") {
        console.log("Not defined");
    }

---

# Truthy / Falsy перевірка

Можна написати:

    if (!value) {
        // value може бути null або undefined
    }

Але тут є проблема.

`!value` також спрацює для:

- `""`
- `0`
- `false`
- `NaN`
- `null`
- `undefined`

Наприклад:

    const count = 0;

    if (!count) {
        console.log("No value");
    }

Тому така перевірка не завжди означає саме `null` або `undefined`.

---

# Краще робити точну перевірку

Якщо потрібно перевірити тільки `null`:

    if (value === null) {
        // ...
    }

Тільки `undefined`:

    if (value === undefined) {
        // ...
    }

Обидва:

    if (value === null || value === undefined) {
        // ...
    }

Або:

    if (value == null) {
        // null або undefined
    }

---

# Optional Properties

У TypeScript:

    interface User {
        name: string;
        age?: number;
    }

`age?` означає, що властивість необов'язкова.

Фактично при `strictNullChecks` вона поводиться приблизно як:

    age: number | undefined

Тобто:

    const user1: User = {
        name: "John"
    };

    const user2: User = {
        name: "John",
        age: 30
    };

---

# Optional Property ≠ `null`

Це важлива відмінність.

    interface User {
        age?: number;
    }

означає:

    age: number | undefined

А не:

    age: number | null

Тому:

    const user: User = {
        name: "John",
        age: null
    };

буде помилкою, якщо `null` не дозволений окремо.

Якщо потрібно дозволити `null`:

    interface User {
        age?: number | null;
    }

Тепер можливі всі три стани:

    const user1 = {};

    const user2 = {
        age: 30
    };

    const user3 = {
        age: null
    };

---

# Optional Parameters

Функція:

    function greet(name?: string) {
        console.log(name);
    }

означає:

    name: string | undefined

Тому можна:

    greet();

    greet("John");

Але не:

    greet(null);

---

# Явний `undefined`

Можна передати:

    greet(undefined);

Це допустимо.

---

# Optional Chaining

Optional chaining:

    ?.

дозволяє безпечно звертатися до властивості, яка може бути `null` або `undefined`.

Наприклад:

    interface User {
        name: string;
        address?: {
            city: string;
        };
    }

Без optional chaining:

    if (user.address) {
        console.log(user.address.city);
    }

З optional chaining:

    console.log(user.address?.city);

Якщо `address` відсутній, результат:

    undefined

замість runtime error.

---

# Optional Chaining з методами

Можна викликати метод:

    user.getName?.();

Якщо метод існує — він виконається.

Якщо ні — результат буде:

    undefined

---

# Optional Chaining з масивами

Наприклад:

    const users: User[] | undefined = getUsers();

    console.log(users?.[0]);

Якщо `users` дорівнює `undefined`, помилки не буде.

---

# Optional Chaining — важлива ідея

Без:

    user.address.city

можна отримати:

    Cannot read properties of undefined

З:

    user.address?.city

отримаємо:

    undefined

Optional chaining:

> "Продовжуй доступ тільки якщо значення існує."

---

# Nullish Coalescing

Оператор:

    ??

використовується для значень `null` та `undefined`.

Наприклад:

    const username = user.name ?? "Guest";

Якщо:

    user.name = "John";

отримаємо:

    "John"

Якщо:

    user.name = null;

отримаємо:

    "Guest"

Якщо:

    user.name = undefined;

отримаємо:

    "Guest"

---

# `??` vs `||`

Це дуже важлива різниця.

`||` перевіряє falsy values.

`??` перевіряє тільки:

    null
    undefined

Наприклад:

    const count = 0;

    const result1 = count || 10;

Результат:

    10

А:

    const result2 = count ?? 10;

Результат:

    0

Тому для default value часто краще використовувати `??`.

---

# Приклад з порожнім рядком

    const username = "";

    const result1 = username || "Guest";

Результат:

    "Guest"

А:

    const result2 = username ?? "Guest";

Результат:

    ""

Це важливо, якщо порожній рядок є валідним значенням.

---

# Non-null Assertion Operator

Оператор:

    !

повідомляє TypeScript:

> Я впевнений, що тут не `null` і не `undefined`.

Наприклад:

    const element = document.getElementById("app")!;

TypeScript тепер вважає:

    element: HTMLElement

замість:

    HTMLElement | null

---

# Небезпека `!`

Оператор `!` не перевіряє значення під час виконання.

Наприклад:

    const element = document.getElementById("missing")!;

TypeScript вважає, що елемент існує.

Але насправді:

    element === null

Якщо потім:

    element.textContent = "Hello";

можна отримати runtime error.

---

# Краще замість `!`

Безпечніше:

    const element = document.getElementById("app");

    if (element) {
        element.textContent = "Hello";
    }

Тут TypeScript бачить перевірку і звужує тип.

---

# Type Narrowing

Type narrowing — це процес, коли TypeScript звужує широкий тип до конкретнішого.

Наприклад:

    function printName(name: string | null) {
        if (name !== null) {
            console.log(name.toUpperCase());
        }
    }

До перевірки:

    string | null

Після:

    string

---

# Narrowing через `if`

    function printValue(value: string | undefined) {
        if (value !== undefined) {
            console.log(value.length);
        }
    }

Всередині `if`:

    value: string

---

# Early Return

Один із найкращих патернів:

    function printName(name: string | null) {
        if (name === null) {
            return;
        }

        console.log(name.toUpperCase());
    }

Після `return` TypeScript знає:

    name: string

---

# Type Narrowing через `!= null`

    function printName(name: string | null | undefined) {
        if (name != null) {
            console.log(name.toUpperCase());
        }
    }

Після перевірки:

    name: string

Тому `!= null` може бути дуже зручним для одночасного виключення:

    null
    undefined

---

# Type Guards

Type guard — це перевірка, яка дозволяє TypeScript зрозуміти тип значення.

Наприклад:

    function isString(value: unknown): value is string {
        return typeof value === "string";
    }

Тепер:

    function print(value: unknown) {
        if (isString(value)) {
            console.log(value.toUpperCase());
        }
    }

---

# `null` у Type Guard

Наприклад:

    function isNotNull<T>(value: T | null): value is T {
        return value !== null;
    }

Можна використовувати:

    const values = ["a", null, "b", null];

    const result = values.filter(isNotNull);

Результат має тип:

    string[]

---

# `undefined` у Type Guard

Аналогічно:

    function isDefined<T>(
        value: T | undefined
    ): value is T {
        return value !== undefined;
    }

Наприклад:

    const values = ["a", undefined, "b"];

    const result = values.filter(isDefined);

Результат:

    string[]

---

# `null` та `undefined` у функціях

Функція може явно повертати nullable type.

Наприклад:

    function findUser(id: number): User | null {
        // ...
        return null;
    }

Або:

    function findUser(id: number): User | undefined {
        // ...
        return undefined;
    }

Це дозволяє чітко описати контракт функції.

---

# `null` vs `undefined` як return value

Обидва варіанти можливі:

    function getUser(): User | null {
        // ...
    }

або:

    function getUser(): User | undefined {
        // ...
    }

Головне — бути послідовним у межах проєкту.

---

# Приклад функції пошуку

    interface User {
        id: number;
        name: string;
    }

    const users: User[] = [
        { id: 1, name: "Anna" },
        { id: 2, name: "John" }
    ];

    function findUser(id: number): User | undefined {
        return users.find(user => user.id === id);
    }

Використання:

    const user = findUser(2);

    if (user) {
        console.log(user.name);
    }

---

# `undefined` у `.find()`

Метод:

    Array.prototype.find()

повертає:

    T | undefined

Наприклад:

    const user = users.find(user => user.id === 100);

TypeScript знає:

    user: User | undefined

Тому:

    console.log(user.name);

може бути помилкою.

Потрібна перевірка:

    if (user) {
        console.log(user.name);
    }

---

# `null` та `undefined` у масивах

Можна створити масив:

    const values: (string | null)[] = [
        "hello",
        null,
        "world"
    ];

Або:

    const values: Array<string | undefined> = [
        "hello",
        undefined,
        "world"
    ];

---

# Фільтрація `null`

Наприклад:

    const values: Array<string | null> = [
        "A",
        null,
        "B",
        null,
        "C"
    ];

Потрібно отримати тільки рядки.

    const strings = values.filter(
        (value): value is string => value !== null
    );

Тепер:

    strings: string[]

---

# `null` та `undefined` в об'єктах

Наприклад:

    interface Profile {
        name: string;
        avatar: string | null;
        bio?: string;
    }

Тут:

    avatar

може бути:

    string
    null

А:

    bio

може бути:

    string
    undefined

Це різні семантики.

---

# Відсутня властивість vs `undefined`

Розглянемо:

    const user1 = {};

    const user2 = {
        name: undefined
    };

Обидва можуть поводитися схоже при:

    user.name

але концептуально це різні ситуації:

`user1`:

> властивості `name` немає.

`user2`:

> властивість `name` існує, але її значення `undefined`.

Це може мати значення при роботі з:

    Object.hasOwn()
    Object.keys()
    JSON.stringify()
    spread
    destructuring

---

# `JSON.stringify()` та `undefined`

Наприклад:

    const user = {
        name: "John",
        age: undefined
    };

    console.log(JSON.stringify(user));

Результат:

    {"name":"John"}

Властивість `age` буде пропущена.

---

# `JSON.stringify()` та `null`

Але:

    const user = {
        name: "John",
        age: null
    };

    console.log(JSON.stringify(user));

Результат:

    {"name":"John","age":null}

Це ще одна практична різниця між `undefined` та `null`.

---

# `null` та `undefined` у DOM

У DOM дуже часто зустрічається `null`.

Наприклад:

    const element = document.querySelector(".button");

Тип:

    Element | null

Чому?

Тому що елемент може не існувати.

Тому безпечний код:

    const element = document.querySelector(".button");

    if (element) {
        element.addEventListener("click", () => {
            console.log("Clicked");
        });
    }

---

# `querySelector`

TypeScript знає, що:

    document.querySelector()

може повернути:

    Element | null

Тому:

    const button = document.querySelector(".button");

    button.addEventListener("click", () => {
        console.log("Click");
    });

може викликати помилку TypeScript.

Потрібно перевірити:

    if (button) {
        button.addEventListener("click", () => {
            console.log("Click");
        });
    }

---

# `null` та `undefined` в API

При роботі з API відсутні дані можуть представлятися як:

    null

або:

    undefined

Наприклад:

    interface User {
        id: number;
        name: string;
        phone: string | null;
    }

API може повернути:

    {
        "id": 1,
        "name": "John",
        "phone": null
    }

`null` тут означає:

> користувач не має номера телефону.

---

# API Response з optional property

Інший варіант:

    interface User {
        id: number;
        name: string;
        phone?: string;
    }

Тут сервер може взагалі не передати:

    phone

Це відрізняється від:

    "phone": null

---

# Практична модель API

Наприклад:

    interface User {
        id: number;
        name: string;
        avatarUrl: string | null;
        middleName?: string;
    }

Можна трактувати:

    avatarUrl: null

як:

> поле існує, але значення відсутнє.

А:

    middleName?

як:

> поле необов'язкове.

---

# Типова проблема з nullable data

Наприклад:

    interface User {
        name: string | null;
    }

    function printUser(user: User) {
        console.log(user.name.toUpperCase());
    }

TypeScript покаже помилку.

Чому?

Тому що:

    user.name

може бути:

    string

або:

    null

---

# Виправлення через перевірку

    function printUser(user: User) {
        if (user.name === null) {
            return;
        }

        console.log(user.name.toUpperCase());
    }

---

# Виправлення через `??`

Якщо потрібне значення за замовчуванням:

    function printUser(user: User) {
        const name = user.name ?? "Unknown";

        console.log(name.toUpperCase());
    }

---

# Виправлення через Optional Chaining

Іноді:

    user.name?.toUpperCase();

Якщо `name === null` або `undefined`, результат:

    undefined

Але цей підхід підходить тільки тоді, коли `undefined` як результат нас влаштовує.

---

# Типові помилки

## 1. Ігнорування `strictNullChecks`

Погано:

    {
        "compilerOptions": {
            "strictNullChecks": false
        }
    }

Для навчання та сучасних проєктів краще працювати зі строгим режимом.

---

## 2. Надмірне використання `!`

Погано:

    const user = findUser(1)!;

Це приховує проблему.

Краще:

    const user = findUser(1);

    if (!user) {
        return;
    }

    console.log(user.name);

---

## 3. Плутати `null` та `undefined`

Не варто автоматично вважати їх повністю взаємозамінними.

Потрібно визначити семантику:

    undefined → значення не задано

    null → значення свідомо відсутнє

---

## 4. Використовувати `||` замість `??`

Потенційна проблема:

    const count = 0;

    const result = count || 10;

Отримаємо:

    10

Хоча `0` може бути валідним значенням.

Краще:

    const result = count ?? 10;

Отримаємо:

    0

---

## 5. Використовувати `if (!value)` для всіх випадків

Наприклад:

    const value = 0;

    if (!value) {
        // спрацює
    }

Але `0` не є `null` або `undefined`.

---

## 6. Робити nullable все підряд

Не потрібно писати:

    let name: string | null;

якщо `name` за логікою програми завжди повинен існувати.

Nullable types потрібно використовувати там, де відсутність значення реально можлива.

---

# Практичні вправи

## Вправа 1 — Nullable variable

Створіть:

    let username: string | null = null;

Зробіть код, який:

1. перевіряє `username`;
2. якщо є значення — виводить його у верхньому регістрі;
3. якщо `null` — виводить `"Guest"`.

---

## Вправа 2 — Optional property

Створіть:

    interface Product {
        id: number;
        name: string;
        description?: string;
    }

Створіть три об'єкти:

    const product1 = {
        id: 1,
        name: "Keyboard"
    };

    const product2 = {
        id: 2,
        name: "Mouse",
        description: "Wireless mouse"
    };

    const product3 = {
        id: 3,
        name: "Monitor",
        description: undefined
    };

---

## Вправа 3 — `null` vs `undefined`

Створіть:

    interface User {
        id: number;
        name: string;
        avatar: string | null;
        phone?: string;
    }

Створіть користувачів у таких станах:

1. avatar є, phone є;
2. avatar `null`, phone є;
3. avatar `null`, phone відсутній.

---

## Вправа 4 — `find()`

Створіть функцію:

    function findProduct(id: number): Product | undefined {
        // ...
    }

Викличте її та правильно обробіть випадок, коли продукт не знайдено.

---

## Вправа 5 — DOM

Створіть:

    const button = document.querySelector("#button");

Напишіть безпечний код, який додає `click` listener.

Не використовуйте `!`.

---

## Вправа 6 — `??`

Порівняйте:

    const a = 0 || 100;

    const b = 0 ?? 100;

Поясніть різницю.

Також перевірте:

    const a = "" || "default";

    const b = "" ?? "default";

---

## Вправа 7 — Type Guard

Створіть:

    function isDefined<T>(
        value: T | undefined
    ): value is T {
        // ...
    }

Використайте її для очищення масиву:

    const values = [
        "A",
        undefined,
        "B",
        undefined,
        "C"
    ];

Результат повинен мати тип:

    string[]

---

# Mini Projects

## Mini Project 1 — User Profile

Створіть модель:

    interface UserProfile {
        id: number;
        name: string;
        email: string;
        avatarUrl: string | null;
        bio?: string;
    }

Реалізуйте:

- відображення avatar;
- fallback avatar;
- optional bio;
- fallback для відсутнього bio;
- перевірку nullable значень.

---

# Mini Project 2 — Product Search

Створіть:

    interface Product {
        id: number;
        name: string;
        price: number;
    }

Функція:

    function findProduct(id: number): Product | undefined {
        // ...
    }

UI повинен показувати:

    Product found

або:

    Product not found

---

# Mini Project 3 — API User

Створіть тип:

    interface ApiUser {
        id: number;
        name: string;
        email: string;
        phone: string | null;
        avatar: string | null;
    }

Створіть функцію:

    function getUser(id: number): ApiUser | undefined {
        // ...
    }

Потренуйте:

- `null`;
- `undefined`;
- `??`;
- `?.`;
- type narrowing.

---

# Mini Project 4 — Form State

Створіть стан форми:

    interface FormState {
        username: string;
        email: string;
        error: string | null;
        submittedAt?: Date;
    }

Можливі стани:

    error: null

або:

    error: "Invalid email"

Після успішного submit:

    submittedAt = new Date();

---

# Mini Project 5 — DOM Safe Access

Створіть HTML:

    <input id="username" />
    <button id="submit">Submit</button>
    <p id="message"></p>

У TypeScript:

- знайдіть елементи через `querySelector`;
- врахуйте `null`;
- додайте event listener;
- отримайте значення input;
- покажіть повідомлення.

Головна умова:

> не використовувати `!`.

---

# Питання для співбесіди

## Junior

### 1. Що таке `null`?

`null` — явне значення, яке означає відсутність значення.

### 2. Що таке `undefined`?

`undefined` — значення, яке зазвичай означає, що значення не було задано.

### 3. У чому різниця між `null` та `undefined`?

    null      → значення навмисно відсутнє
    undefined → значення не задане

### 4. Що робить `strictNullChecks`?

Змушує TypeScript явно враховувати `null` та `undefined` у типах.

### 5. Що означає?

    string | null

Значення може бути:

    string

або:

    null

---

# Middle

### 6. Що означає `property?: string`?

При `strictNullChecks` властивість є необов'язковою і при читанні може мати:

    string | undefined

### 7. Чим відрізняється:

    string | null

від:

    string | undefined

Вони описують різні способи відсутності значення.

### 8. Що робить `?.`?

Безпечно продовжує доступ до властивості/методу, якщо попереднє значення не є `null` або `undefined`.

### 9. Що робить `??`?

Повертає праву частину, якщо ліва дорівнює:

    null

або:

    undefined

### 10. Чим `??` відрізняється від `||`?

`??` перевіряє тільки `null`/`undefined`.

`||` перевіряє всі falsy values.

---

# Senior

### 11. Чому `!` небезпечний?

Тому що він впливає на перевірку TypeScript, але не виконує runtime-перевірку.

### 12. Як TypeScript робить narrowing?

Через control flow analysis та перевірки:

    if
    typeof
    instanceof
    in
    ===
    !==
    == null
    custom type guards

### 13. Як правильно моделювати API?

Потрібно визначити семантику:

    field?: string

та:

    field: string | null

не завжди означають одне й те саме.

### 14. Чому важливо відрізняти missing property від `null`?

Тому що вони можуть мати різну бізнес-семантику та по-різному серіалізуватися/оброблятися API.

---

# Рівні володіння

## Core

Потрібно знати:

- `null`;
- `undefined`;
- `strictNullChecks`;
- `string | null`;
- `string | undefined`;
- перевірку через `if`;
- optional properties;
- optional parameters.

---

## Junior

Потрібно вміти:

- правильно працювати з nullable values;
- використовувати type narrowing;
- використовувати `?.`;
- використовувати `??`;
- розуміти `??` vs `||`;
- працювати з `.find()`;
- безпечно працювати з DOM API.

---

## Middle

Потрібно розуміти:

- nullable API models;
- `null` vs missing property;
- custom type guards;
- generic type guards;
- `filter()` з type predicates;
- control flow analysis;
- безпечну роботу з DOM;
- дизайн типів API.

---

## Senior

Потрібно вміти:

- правильно моделювати відсутність даних;
- визначати семантику `null` та `undefined`;
- проєктувати API contracts;
- мінімізувати nullable states;
- уникати unnecessary `!`;
- будувати type-safe data flows;
- контролювати nullability на межах системи.

---

# Mini Cheat Sheet

## Типи

    let a: null = null;

    let b: undefined = undefined;

    let c: string | null = null;

    let d: string | undefined = undefined;

    let e: string | null | undefined;

---

## Перевірки

    if (value === null) {
        // null
    }

    if (value === undefined) {
        // undefined
    }

    if (value != null) {
        // string / object / etc.
    }

---

## Optional property

    interface User {
        name: string;
        age?: number;
    }

---

## Optional parameter

    function greet(name?: string) {
        // name: string | undefined
    }

---

## Optional chaining

    user?.name

    user.address?.city

    user.getName?.()

    users?.[0]

---

## Nullish coalescing

    value ?? defaultValue

Наприклад:

    const name = user.name ?? "Guest";

---

## Non-null assertion

    value!

Використовувати обережно.

---

## Type guard

    if (value !== null) {
        // value narrowed
    }

---

## `find()`

    const user = users.find(
        user => user.id === id
    );

Тип:

    User | undefined

---

## DOM

    const button = document.querySelector("button");

Тип:

    Element | null

Безпечно:

    if (button) {
        button.addEventListener("click", handler);
    }

---

# Nullability Mental Model

Корисно мислити так:

    string
       │
       ├── значення існує
       │
       └── безпечне використання


    string | null
       │
       ├── string
       │
       └── null
             ↓
          потрібно
          перевірити


    string | undefined
       │
       ├── string
       │
       └── undefined
             ↓
          потрібно
          перевірити

---

# `null` vs `undefined` — практична модель

```text
undefined
    ↓
"значення не було задано"

null
    ↓
"значення відсутнє свідомо"

string
    ↓
"значення існує"