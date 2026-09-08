# 01. TypeScript Basics

TypeScript — це строго типізована надмножина JavaScript, яка додає до JavaScript систему типів та інші можливості для безпечнішої розробки.

TypeScript-код перед виконанням перетворюється на JavaScript.

Спрощена модель:

    TypeScript
        ↓
    Type checking
        ↓
    TypeScript compiler
        ↓
    JavaScript
        ↓
    JavaScript runtime
        ↓
    Application

TypeScript особливо корисний у великих проєктах, де важливо:

- контролювати типи даних;
- виявляти помилки ще під час розробки;
- отримувати кращий autocomplete;
- безпечніше працювати з об'єктами та функціями;
- покращувати читабельність коду;
- спрощувати refactoring;
- документувати структуру даних через типи.

---

### Ключові поняття

✔ TypeScript  
✔ JavaScript  
✔ superset  
✔ static type checking  
✔ type system  
✔ type  
✔ type annotation  
✔ type inference  
✔ compiler  
✔ transpilation  
✔ type checking  
✔ compile time  
✔ runtime  
✔ JavaScript output  
✔ `tsc`  
✔ `.ts`  
✔ `.tsx`  
✔ `tsconfig.json`  
✔ type safety  
✔ IDE support  
✔ autocomplete  
✔ type error  

---

### Що потрібно пам'ятати

• TypeScript є надмножиною JavaScript.

• Валідний JavaScript-код зазвичай є валідним TypeScript-кодом.

• TypeScript додає систему типів до JavaScript.

• TypeScript перевіряє типи переважно під час розробки та компіляції.

• JavaScript runtime не виконує TypeScript напряму.

• TypeScript компілюється / транспілюється у JavaScript.

• Основний TypeScript compiler називається `tsc`.

• TypeScript-файли мають розширення:

    .ts

• TypeScript-файли з JSX мають розширення:

    .tsx

• Конфігурація TypeScript зазвичай знаходиться у:

    tsconfig.json

• TypeScript допомагає виявляти багато помилок до запуску програми.

• TypeScript не замінює JavaScript runtime.

• TypeScript не робить JavaScript автоматично безпомилковим.

• Типи TypeScript переважно видаляються під час генерації JavaScript.

---

# Що таке TypeScript

TypeScript — це мова програмування, побудована поверх JavaScript.

Наприклад, JavaScript:

    const age = 56;

У TypeScript можна явно вказати тип:

    const age: number = 56;

Тут:

    age
        ↓
    variable

    number
        ↓
    type

---

# TypeScript як Superset JavaScript

TypeScript можна розглядати як:

    JavaScript
        +
    Type System
        +
    TypeScript Features

Тому JavaScript-код:

    const message = "Hello";

може використовуватися у TypeScript:

    const message = "Hello";

А TypeScript дозволяє додати інформацію про тип:

    const message: string = "Hello";

---

# JavaScript vs TypeScript

JavaScript:

    let age = 56;

TypeScript:

    let age: number = 56;

JavaScript:

    function add(a, b) {
        return a + b;
    }

TypeScript:

    function add(a: number, b: number): number {
        return a + b;
    }

TypeScript додає інформацію про типи.

---

# Type System

Type system — система правил, яка визначає:

- які значення існують;
- які типи мають значення;
- які операції дозволені;
- які значення можна передавати функціям;
- які значення може повертати функція;
- які властивості має об'єкт.

Наприклад:

    let age: number = 56;

Тут TypeScript знає:

    age → number

Тому:

    age = "56";

буде помилкою типізації.

---

# Static Type Checking

TypeScript використовує static type checking.

Це означає, що TypeScript може перевіряти багато помилок до виконання програми.

Наприклад:

    let age: number = 56;

    age = "56";

TypeScript повідомить про несумісність типів.

Модель:

    code
      ↓
    type checking
      ↓
    error / valid
      ↓
    JavaScript
      ↓
    runtime

---

# Compile Time

Compile time — етап, на якому TypeScript аналізує код і перевіряє його типи.

Наприклад:

    const age: number = "56";

TypeScript може виявити помилку ще до запуску програми.

---

# Runtime

Runtime — момент, коли JavaScript-код фактично виконується.

Наприклад:

    const result = 10 + 20;

Runtime виконує цю операцію.

Важливо:

    TypeScript → compile-time
    JavaScript  → runtime

---

# TypeScript не виконується безпосередньо в браузері

Браузер виконує JavaScript.

Тому:

    TypeScript
        ↓
    compile
        ↓
    JavaScript
        ↓
    Browser

Наприклад:

    const age: number = 56;

після компіляції може стати:

    const age = 56;

Type annotation:

    : number

не потрібна JavaScript runtime.

---

# TypeScript Compiler

Основний компілятор TypeScript:

    tsc

`tsc` означає:

    TypeScript Compiler

Встановлення:

    npm install -D typescript

Перевірка версії:

    npx tsc --version

Або, якщо TypeScript встановлений глобально:

    tsc --version

---

# TypeScript File

TypeScript-файл має розширення:

    .ts

Наприклад:

    app.ts

    user.ts

    calculator.ts

    utils.ts

---

# TSX File

Для TypeScript + JSX використовується:

    .tsx

Наприклад:

    App.tsx

    Button.tsx

    UserProfile.tsx

Це особливо актуально для React.

---

# Простий TypeScript файл

Файл:

    hello.ts

Код:

    const message: string = "Hello, TypeScript!";

    console.log(message);

---

# Компіляція TypeScript

Наприклад:

    npx tsc hello.ts

TypeScript може створити:

    hello.js

Після цього JavaScript можна виконати runtime.

Наприклад:

    node hello.js

---

# Type Annotation

Type annotation — явне зазначення типу.

Синтаксис:

    variable: type

Наприклад:

    const age: number = 56;

    const name: string = "Valeriy";

    const isActive: boolean = true;

---

# Основні primitive types

Основні типи:

    string
    number
    boolean
    bigint
    symbol

Також важливі спеціальні типи:

    null
    undefined

Приклади:

    const name: string = "John";

    const age: number = 25;

    const isAdmin: boolean = false;

---

# Type Annotation для змінних

    let username: string = "John";

    let age: number = 25;

    let isActive: boolean = true;

TypeScript контролює відповідність типів.

Наприклад:

    age = 30;

Коректно.

А:

    age = "30";

Некоректно.

---

# Type Inference

TypeScript часто може визначити тип автоматично.

Наприклад:

    const age = 56;

TypeScript розуміє:

    age → number

Не обов'язково писати:

    const age: number = 56;

Можна:

    const age = 56;

---

# Explicit Type vs Inference

Явний тип:

    const age: number = 56;

Inference:

    const age = 56;

В обох випадках:

    age → number

TypeScript може визначити тип на основі значення.

---

# String

Тип:

    string

Приклади:

    const name: string = "John";

    const city: string = "Kyiv";

    const message: string = `Hello`;

---

# Number

Тип:

    number

Приклади:

    const age: number = 56;

    const price: number = 19.99;

    const temperature: number = -5;

JavaScript використовує один основний числовий тип:

    number

для integer і floating-point values.

---

# Boolean

Тип:

    boolean

Приклади:

    const isActive: boolean = true;

    const isAdmin: boolean = false;

---

# BigInt

Для великих цілих чисел:

    bigint

Приклад:

    const bigNumber: bigint = 9007199254740991n;

`bigint` відрізняється від:

    number

---

# Symbol

Тип:

    symbol

Приклад:

    const id: symbol = Symbol("id");

---

# Array

TypeScript дозволяє типізувати масиви.

Синтаксис:

    type[]

Наприклад:

    const numbers: number[] = [1, 2, 3];

    const names: string[] = [
        "John",
        "Anna",
        "Mark"
    ];

---

### Generic syntax

Можна використовувати:

    Array<type>

Наприклад:

    const numbers: Array<number> = [1, 2, 3];

Це еквівалентно:

    const numbers: number[] = [1, 2, 3];

---

# Object

TypeScript дозволяє описувати структуру об'єкта.

Наприклад:

    const user: {
        name: string;
        age: number;
    } = {
        name: "John",
        age: 25
    };

TypeScript знає:

    user.name → string

    user.age → number

---

# Null

Тип:

    null

Приклад:

    let value: null = null;

У сучасному TypeScript поведінка `null` залежить також від налаштування:

    strictNullChecks

---

# Undefined

Тип:

    undefined

Приклад:

    let value: undefined = undefined;

---

# Any

`any` вимикає значну частину перевірки типів для конкретного значення.

Наприклад:

    let value: any = 10;

    value = "hello";

    value = true;

    value = {};

Це дозволено.

Але:

    any

зменшує type safety.

Тому `any` бажано використовувати обережно.

---

# Unknown

`unknown` — безпечніша альтернатива `any`.

Наприклад:

    let value: unknown = "hello";

Не можна без перевірки зробити:

    value.toUpperCase();

Потрібно спочатку звузити тип:

    if (typeof value === "string") {
        console.log(value.toUpperCase());
    }

---

# Never

`never` означає значення, яке не може виникнути.

Наприклад, функція, яка завжди кидає помилку:

    function fail(message: string): never {
        throw new Error(message);
    }

---

# Type Safety

Type safety — здатність системи типів запобігати несумісному використанню даних.

Наприклад:

    const age: number = 56;

    age = "56";

TypeScript виявляє проблему.

Type safety допомагає уникати багатьох помилок ще до runtime.

---

# Type Error

Type error виникає, коли код порушує правила типів.

Наприклад:

    const age: number = 56;

    age = "hello";

Проблема:

    number
       ↓
    string

Типи не сумісні.

---

# Type Checking

TypeScript аналізує код:

    const age: number = 56;

    const name: string = "John";

і знає типи:

    age  → number
    name → string

Якщо типи використовуються неправильно, TypeScript повідомляє про помилку.

---

# JavaScript Runtime Errors vs Type Errors

TypeScript може виявити деякі проблеми до runtime.

Наприклад:

    const age: number = 56;

    age.toUpperCase();

TypeScript знає, що:

    number

не має методу:

    toUpperCase()

Тому IDE може показати помилку ще до запуску.

---

# TypeScript та JavaScript Interoperability

TypeScript тісно пов'язаний із JavaScript.

JavaScript:

    const numbers = [1, 2, 3];

TypeScript:

    const numbers: number[] = [1, 2, 3];

JavaScript:

    function add(a, b) {
        return a + b;
    }

TypeScript:

    function add(a: number, b: number): number {
        return a + b;
    }

---

# TypeScript Compilation

Загальна модель:

    .ts
      ↓
    TypeScript Compiler
      ↓
    type checking
      ↓
    JavaScript output
      ↓
    runtime

Наприклад:

    hello.ts
        ↓
    tsc
        ↓
    hello.js
        ↓
    node / browser

---

# TypeScript Configuration

Для проєкту часто створюють:

    tsconfig.json

Наприклад:

    {
        "compilerOptions": {
            "target": "ES2022",
            "strict": true
        }
    }

Конфігурація визначає, як TypeScript повинен перевіряти та компілювати код.

---

# strict

Одна з найважливіших опцій:

    "strict": true

Вона вмикає набір строгих перевірок TypeScript.

Для сучасних TypeScript-проєктів:

    strict: true

зазвичай є хорошою базовою практикою.

---

# TypeScript у VS Code

VS Code має інтегровану підтримку TypeScript.

Це дозволяє отримувати:

    autocomplete
    type information
    error highlighting
    go to definition
    refactoring
    parameter hints
    documentation

Наприклад:

    const user = {
        name: "John",
        age: 25
    };

При зверненні:

    user.

IDE може показати:

    name
    age

---

# Autocomplete

TypeScript допомагає IDE знати структуру даних.

Наприклад:

    const user = {
        name: "John",
        age: 25
    };

Після:

    user.

IDE знає доступні властивості:

    name
    age

---

# Type Information

IDE може показати тип:

    const age = 56;

TypeScript визначає:

    age: number

Для:

    const name = "John";

визначається:

    name: string

---

# Function Basics

TypeScript дозволяє типізувати параметри функцій.

JavaScript:

    function add(a, b) {
        return a + b;
    }

TypeScript:

    function add(a: number, b: number) {
        return a + b;
    }

TypeScript може вивести тип результату:

    number

---

# Return Type

Можна явно вказати return type:

    function add(
        a: number,
        b: number
    ): number {
        return a + b;
    }

Структура:

    function name(
        parameter: type
    ): returnType {
        ...
    }

---

# Function Example

    function greet(name: string): string {
        return `Hello, ${name}`;
    }

Виклик:

    greet("John");

Але:

    greet(123);

буде помилкою типів.

---

# Parameters

Параметр можна типізувати:

    function square(value: number): number {
        return value * value;
    }

Тут:

    value → number

    return → number

---

# Optional Parameters

Параметр можна зробити optional:

    function greet(name?: string): string {
        return name
            ? `Hello, ${name}`
            : "Hello";
    }

`?` означає:

    parameter may be omitted

---

# Default Parameters

TypeScript підтримує JavaScript default parameters:

    function greet(
        name: string = "Guest"
    ): string {
        return `Hello, ${name}`;
    }

Виклик:

    greet();

Результат:

    Hello, Guest

---

# Union Type

Union дозволяє значенню мати один із кількох типів.

Синтаксис:

    type1 | type2

Наприклад:

    let id: string | number;

Тепер дозволено:

    id = 10;

або:

    id = "abc";

---

# Literal Types

TypeScript може обмежити значення конкретними literals.

Наприклад:

    let direction:
        "up"
        | "down"
        | "left"
        | "right";

Дозволені тільки:

    "up"
    "down"
    "left"
    "right"

---

# Type Alias

Type alias дозволяє дати ім'я типу.

Наприклад:

    type User = {
        name: string;
        age: number;
    };

Тепер:

    const user: User = {
        name: "John",
        age: 25
    };

---

# Interface

TypeScript також має:

    interface

Наприклад:

    interface User {
        name: string;
        age: number;
    }

Використання:

    const user: User = {
        name: "John",
        age: 25
    };

`interface` та `type` будуть детальніше розглядатися в окремих розділах.

---

# Type Narrowing

TypeScript може звужувати тип після перевірки.

Наприклад:

    function printId(id: string | number) {
        if (typeof id === "string") {
            console.log(id.toUpperCase());
        } else {
            console.log(id.toFixed());
        }
    }

До перевірки:

    id → string | number

Після:

    typeof id === "string"

TypeScript знає:

    id → string

В іншій гілці:

    id → number

---

# typeof

`typeof` використовується для runtime-перевірки типу.

Наприклад:

    const value: unknown = "hello";

    if (typeof value === "string") {
        console.log(value.toUpperCase());
    }

Це також допомагає TypeScript звузити тип.

---

# Type Assertion

Type assertion дозволяє повідомити TypeScript, який тип ми очікуємо.

Наприклад:

    const value: unknown = "hello";

    const message = value as string;

Тепер TypeScript трактує:

    message → string

Важливо:

    as

не перетворює значення реально.

Це лише інформація для TypeScript.

---

# Type Assertion vs Conversion

Це різні речі.

Type assertion:

    const value = input as string;

Не змінює runtime value.

Conversion:

    const value = String(input);

Реально створює / отримує string value.

Тобто:

    as string
        ↓
    type information

    String(...)
        ↓
    runtime conversion

---

# Structural Typing

TypeScript використовує structural type system.

У спрощеному вигляді:

    якщо структура сумісна,
    типи можуть бути сумісними.

Наприклад:

    type User = {
        name: string;
    };

    const person = {
        name: "John",
        age: 25
    };

    const user: User = person;

Об'єкт має необхідну структуру:

    name: string

тому він може бути сумісним із `User`.

---

# Duck Typing / Structural Typing

JavaScript часто описують через ідею:

    "If it looks like a duck
     and behaves like a duck,
     treat it like a duck."

TypeScript використовує близьку концепцію через structural typing.

Важлива структура:

    properties
    methods
    types

а не лише ім'я типу.

---

# Type Compatibility

TypeScript перевіряє, чи сумісні типи.

Наприклад:

    let x: number = 10;

    let y: number = x;

Коректно.

А:

    let x: string = "10";

    let y: number = x;

Некоректно.

---

# Compile-time vs Runtime

Дуже важлива модель.

### Compile Time

TypeScript перевіряє:

    types
    interfaces
    annotations
    compatibility
    function signatures

### Runtime

JavaScript виконує:

    variables
    functions
    objects
    loops
    conditions
    API calls

Схема:

    TypeScript
        ↓
    compile-time checking
        ↓
    JavaScript
        ↓
    runtime

---

# TypeScript Types Disappear

Більшість TypeScript type information не потрапляє у фінальний JavaScript.

Наприклад:

    const age: number = 56;

приблизно перетворюється на:

    const age = 56;

Type annotation:

    : number

видаляється.

---

# TypeScript не перевіряє Runtime Data автоматично

Це дуже важливе правило.

Наприклад:

    interface User {
        name: string;
        age: number;
    }

TypeScript перевіряє код під час розробки.

Але якщо дані приходять із:

    API
    JSON
    database
    localStorage
    user input

runtime може отримати дані, які не відповідають очікуваній структурі.

Наприклад:

    const data = await fetch("/api/user");

TypeScript type не робить HTTP response автоматично безпечним.

Для runtime validation використовуються додаткові інструменти та підходи.

---

# TypeScript та JSON

JSON:

    {
        "name": "John",
        "age": 25
    }

Можна описати:

    type User = {
        name: string;
        age: number;
    };

Але JSON сам по собі не гарантує, що runtime-дані відповідають цьому типу.

Тому важливо розділяти:

    static type checking
        vs
    runtime validation

---

# TypeScript та DOM

TypeScript може типізувати DOM API.

Наприклад:

    const button =
        document.querySelector("button");

У багатьох випадках TypeScript знає тип:

    HTMLButtonElement | null

Тому потрібно враховувати:

    null

Наприклад:

    const button =
        document.querySelector("button");

    if (button) {
        button.textContent = "Click";
    }

DOM буде детальніше розглядатися у:

    12-typescript-with-dom

---

# TypeScript та React

TypeScript використовується з React через:

    .tsx

Наприклад:

    const title: string = "Hello";

У React:

    interface Props {
        title: string;
    }

React component:

    function Title({ title }: Props) {
        return <h1>{title}</h1>;
    }

React буде детальніше розглядатися у:

    13-typescript-with-react

---

# TypeScript та Node.js

TypeScript також використовується для backend:

    Node.js
    Express
    NestJS

Наприклад:

    function add(
        a: number,
        b: number
    ): number {
        return a + b;
    }

Node.js може виконувати згенерований JavaScript.

---

# TypeScript Project

Типова структура:

    project/
    ├── src/
    │   ├── index.ts
    │   └── utils.ts
    ├── dist/
    ├── package.json
    └── tsconfig.json

Де:

    src/
        ↓
    TypeScript source

    dist/
        ↓
    generated JavaScript

---

# package.json

TypeScript часто встановлюється як development dependency.

Наприклад:

    npm install -D typescript

У `package.json`:

    {
        "devDependencies": {
            "typescript": "..."
        }
    }

---

# npm scripts

Можна додати:

    {
        "scripts": {
            "build": "tsc"
        }
    }

Тоді:

    npm run build

запустить:

    tsc

---

# Basic TypeScript Workflow

Типовий workflow:

    1. створити .ts файл
            ↓
    2. написати TypeScript
            ↓
    3. type checking
            ↓
    4. compile
            ↓
    5. отримати JavaScript
            ↓
    6. запустити JavaScript

---

# Example Workflow

Файл:

    app.ts

Код:

    const name: string = "John";

    function greet(name: string): string {
        return `Hello, ${name}`;
    }

    console.log(greet(name));

Компіляція:

    npx tsc app.ts

Отримуємо JavaScript:

    app.js

Запуск:

    node app.js

---

# TypeScript Playground

Для швидких експериментів можна використовувати TypeScript Playground.

У ньому можна:

    write TypeScript
        ↓
    inspect types
        ↓
    see JavaScript output
        ↓
    experiment

Це особливо корисно для вивчення поведінки TypeScript compiler.

---

# Common TypeScript Syntax

### Variable

    const age: number = 56;

---

### String

    const name: string = "John";

---

### Boolean

    const active: boolean = true;

---

### Array

    const numbers: number[] = [1, 2, 3];

---

### Object

    const user: {
        name: string;
        age: number;
    } = {
        name: "John",
        age: 25
    };

---

### Function

    function add(
        a: number,
        b: number
    ): number {
        return a + b;
    }

---

### Union

    let id: string | number;

---

### Type Alias

    type User = {
        name: string;
        age: number;
    };

---

### Interface

    interface User {
        name: string;
        age: number;
    }

---

# Типові помилки

❌ Вважати TypeScript окремим runtime.

TypeScript не замінює JavaScript runtime.

Правильна модель:

    TypeScript
        ↓
    JavaScript
        ↓
    runtime

---

❌ Вважати, що TypeScript перевіряє всі runtime дані.

Наприклад:

    API response
    JSON
    database data
    user input

не стають автоматично безпечними тільки через TypeScript type.

---

❌ Надмірно використовувати `any`.

Наприклад:

    const data: any = getData();

Це зменшує переваги TypeScript.

Краще використовувати:

    unknown

і виконувати необхідне narrowing / validation.

---

❌ Плутати type assertion та conversion.

    value as string

не перетворює value.

А:

    String(value)

виконує runtime conversion.

---

❌ Додавати type annotation всюди без необхідності.

Наприклад:

    const age: number = 56;

часто можна записати:

    const age = 56;

TypeScript сам виведе:

    number

---

❌ Вважати, що annotation змінює runtime.

    const age: number = 56;

`: number` не створює окремий runtime type object.

---

❌ Плутати TypeScript error та runtime error.

TypeScript може знайти проблему під час type checking.

Але runtime може мати помилки, які TypeScript не здатний гарантувати.

---

❌ Вимикати strict mode без причини.

Для навчання та сучасних проєктів корисно звикати до:

    "strict": true

---

# Що потрібно знати на Core-рівні

Потрібно розуміти:

    TypeScript
    JavaScript
    superset
    static typing
    type system
    type checking
    compile time
    runtime
    compiler
    tsc
    .ts
    .tsx
    tsconfig.json

Основні типи:

    string
    number
    boolean
    bigint
    symbol
    null
    undefined

Також:

    any
    unknown
    never

Базовий синтаксис:

    variable annotations
    arrays
    objects
    functions
    return types
    union types

Основні концепції:

    type inference
    type safety
    type compatibility
    type narrowing
    type assertion

---

# Питання зі співбесіди

Що таке TypeScript?

Чим TypeScript відрізняється від JavaScript?

Чому TypeScript називають superset JavaScript?

Чи виконується TypeScript безпосередньо браузером?

Що робить TypeScript compiler?

Що таке `tsc`?

Що таке compile time?

Що таке runtime?

Що таке type system?

Що таке static type checking?

Що таке type annotation?

Що таке type inference?

Чим annotation відрізняється від inference?

Які primitive types є в TypeScript?

Що таке `any`?

Чому `any` може бути небезпечним?

Що таке `unknown`?

Чим `unknown` відрізняється від `any`?

Що таке `never`?

Що таке type safety?

Що таке type error?

Що таке union type?

Що таке type narrowing?

Що робить `typeof` у type narrowing?

Що таке type assertion?

Чим `as string` відрізняється від `String()`?

Що таке structural typing?

Що таке type compatibility?

Що таке `tsconfig.json`?

Для чого потрібен `strict`?

Що таке `.ts`?

Що таке `.tsx`?

Як TypeScript перетворюється на JavaScript?

Чи залишаються TypeScript types у JavaScript runtime?

Чи гарантує TypeScript правильність даних з API?

Чому runtime validation може бути необхідною?

---

# Шлях

## 🟢 Core

Що таке TypeScript.

Відмінність TypeScript від JavaScript.

TypeScript як superset JavaScript.

Основи type system.

Static type checking.

Compile time.

Runtime.

TypeScript compiler.

`tsc`.

`.ts`.

`.tsx`.

`tsconfig.json`.

Type annotations.

Type inference.

Primitive types:

    string
    number
    boolean
    bigint
    symbol

Спеціальні типи:

    null
    undefined

Розуміння:

    any
    unknown
    never

Type safety.

Type errors.

Базові типи змінних.

Типізація масивів.

Типізація об'єктів.

Типізація параметрів функцій.

Return types.

Union types.

Основи type narrowing.

Основи `typeof`.

Основи type assertion.

---

## 🔵 Junior

Розуміння TypeScript compilation pipeline:

    .ts
      ↓
    type checking
      ↓
    JavaScript
      ↓
    runtime

Впевнене використання:

    type annotations
    inference
    arrays
    objects
    functions
    unions

Розуміння:

    type compatibility
    structural typing
    narrowing
    assertions
    optional parameters
    default parameters

Розуміння:

    strict mode
    tsconfig.json
    TypeScript + npm
    TypeScript + VS Code

Розуміння різниці:

    compile-time
    runtime

Розуміння обмежень TypeScript.

Розуміння, чому API / JSON data потребують runtime validation.

Основи TypeScript у:

    DOM
    React
    Node.js

---

## 🟠 Middle

Глибше розуміння:

    type system
    type inference
    structural typing
    type compatibility
    narrowing

Розуміння TypeScript compiler.

Розуміння:

    compiler options
    module system
    target
    lib
    strictness

Розуміння взаємодії:

    TypeScript
    JavaScript
    npm
    bundler
    runtime

Розуміння:

    declaration files
    type-only imports
    type-only exports

Розуміння runtime validation:

    static types
        vs
    runtime data

Інтеграція TypeScript із:

    React
    Node.js
    APIs
    databases
    testing

---

## 🔴 Senior

Глибоке розуміння TypeScript type system.

Compiler architecture.

Type checking.

Type inference algorithms.

Structural typing.

Type compatibility.

Control-flow analysis.

Advanced narrowing.

Type erasure.

JavaScript interoperability.

Declaration files.

Module resolution.

Compiler pipeline.

Advanced compiler configuration.

Type-level programming.

Conditional types.

Mapped types.

Template literal types.

Recursive types.

Generic abstractions.

Advanced inference.

Performance of type checking.

API design with TypeScript.

Library authoring.

Public type APIs.

Backward compatibility of types.

Runtime validation architecture.

Trade-offs між:

    static typing
    runtime validation
    developer experience
    type complexity
    maintainability

---

# Міні-шпаргалка

## TypeScript

    TypeScript
        =
    JavaScript
        +
    Static Type System

---

## Compiler

    .ts
      ↓
    tsc
      ↓
    type checking
      ↓
    .js
      ↓
    runtime

---

## Type Annotation

    const age: number = 56;

    const name: string = "John";

    const active: boolean = true;

---

## Type Inference

    const age = 56;

TypeScript визначає:

    age → number

---

## Array

    const numbers: number[] = [
        1,
        2,
        3
    ];

Або:

    const numbers: Array<number> = [
        1,
        2,
        3
    ];

---

## Object

    const user: {
        name: string;
        age: number;
    } = {
        name: "John",
        age: 25
    };

---

## Function

    function add(
        a: number,
        b: number
    ): number {
        return a + b;
    }

---

## Union

    let id: string | number;

    id = 10;

    id = "abc";

---

## Unknown

    let value: unknown = "hello";

Потрібно перевірити тип перед використанням:

    if (typeof value === "string") {
        value.toUpperCase();
    }

---

## Any

    let value: any = 10;

    value = "hello";

    value = true;

    any → максимальна свобода
    any → мінімум type safety

---

## Never

    function fail(message: string): never {
        throw new Error(message);
    }

---

## Type Assertion

    const value: unknown = "hello";

    const text = value as string;

    as → повідомлення TypeScript
    as → не runtime conversion

---

## Conversion

    const text = String(value);

    String() → runtime conversion

---

## Narrowing

    function print(value: string | number) {
        if (typeof value === "string") {
            console.log(value.toUpperCase());
        } else {
            console.log(value.toFixed());
        }
    }

---

## Type Alias

    type User = {
        name: string;
        age: number;
    };

---

## Interface

    interface User {
        name: string;
        age: number;
    }

---

## Strict

    {
        "compilerOptions": {
            "strict": true
        }
    }

---

# TypeScript Mental Model

    JavaScript
         +
    Type System
         ↓
    TypeScript
         ↓
    Type Checking
         ↓
    JavaScript
         ↓
    Runtime

---

# Найважливіші відмінності

    JavaScript
        ↓
    runtime language

    TypeScript
        ↓
    JavaScript + static type system

---

    annotation
        ↓
    explicit type information

    inference
        ↓
    TypeScript determines type automatically

---

    any
        ↓
    disables much of type checking

    unknown
        ↓
    safe unknown value
        ↓
    requires narrowing

---

    union
        ↓
    one of several types

    narrowing
        ↓
    reduce possible types

---

    assertion
        ↓
    tell TypeScript what type you expect

    conversion
        ↓
    actually transform runtime value

---

# Головне:

• TypeScript — надмножина JavaScript із системою типів.

• TypeScript не замінює JavaScript runtime.

• Браузер і Node.js виконують JavaScript, а не TypeScript напряму.

• TypeScript-код зазвичай проходить через compiler перед виконанням.

• Основний compiler — `tsc`.

• TypeScript-файли мають розширення:

    .ts

• TypeScript + JSX:

    .tsx

• Основна конфігурація проєкту:

    tsconfig.json

• TypeScript виконує static type checking.

• Type checking відбувається переважно під час розробки / compile time.

• Runtime виконує згенерований JavaScript.

• Type annotation дозволяє явно вказати тип:

    const age: number = 56;

• Type inference дозволяє TypeScript визначити тип автоматично:

    const age = 56;

• Основні primitive types:

    string
    number
    boolean
    bigint
    symbol

• Також потрібно знати:

    null
    undefined

• `any` дозволяє майже будь-які операції, але зменшує type safety.

• `unknown` безпечніший за `any` і вимагає перевірки типу перед використанням.

• `never` описує значення, яке не може виникнути.

• TypeScript підтримує union types:

    string | number

• Type narrowing дозволяє звузити union до конкретного типу.

• `typeof` часто використовується для narrowing.

• Type assertion:

    value as string

не змінює runtime value.

• Runtime conversion:

    String(value)

реально перетворює значення.

• TypeScript використовує structural typing.

• TypeScript може перевіряти структуру об'єктів і сумісність типів.

• TypeScript не гарантує, що зовнішні runtime-дані відповідають описаному типу.

• Дані з:

    API
    JSON
    database
    localStorage
    user input

можуть потребувати runtime validation.

• `strict: true` є важливою базою для сучасного TypeScript-проєкту.

• TypeScript особливо корисний для:

    large applications
    APIs
    React
    Node.js
    NestJS
    databases
    team projects

• Основна модель TypeScript:

    Write TypeScript
          ↓
    Type Checking
          ↓
    Compile
          ↓
    JavaScript
          ↓
    Runtime

• Головна мета TypeScript — зробити роботу з JavaScript-кодом більш передбачуваною, безпечною та зручною для розробника.