# Type Safety у TypeScript

## Зміст

1. [Що таке Type Safety](#що-таке-type-safety)
2. [TypeScript як система перевірки типів](#typescript-як-система-перевірки-типів)
3. [Static Typing](#static-typing)
4. [Compile-Time vs Runtime](#compile-time-vs-runtime)
5. [Type Safety ≠ Runtime Safety](#type-safety--runtime-safety)
6. [Implicit та Explicit Types](#implicit-та-explicit-types)
7. [Type Inference та Type Safety](#type-inference-та-type-safety)
8. [Strict Mode](#strict-mode)
9. [Strict Null Checks](#strict-null-checks)
10. [Типобезпечні змінні](#типобезпечні-змінні)
11. [Типобезпечні функції](#типобезпечні-функції)
12. [Типобезпечні об'єкти](#типобезпечні-обєкти)
13. [Type Narrowing](#type-narrowing)
14. [Type Guards](#type-guards)
15. [Union Types і Type Safety](#union-types-і-type-safety)
16. [Unknown vs Any](#unknown-vs-any)
17. [Type Assertions](#type-assertions)
18. [Non-null Assertion](#non-null-assertion)
19. [Exhaustive Checking](#exhaustive-checking)
20. [Типобезпечна робота з масивами](#типобезпечна-робота-з-масивами)
21. [Типобезпечна робота з API](#типобезпечна-робота-з-api)
22. [Type Safety у DOM](#type-safety-у-dom)
23. [Type Safety у React](#type-safety-у-react)
24. [Type Safety у Backend](#type-safety-у-backend)
25. [Типові способи втрати Type Safety](#типові-способи-втрати-type-safety)
26. [Практичні вправи](#практичні-вправи)
27. [Mini Projects](#mini-projects)
28. [Питання для співбесіди](#питання-для-співбесіди)
29. [Рівні володіння](#рівні-володіння)
30. [Mini Cheat Sheet](#mini-cheat-sheet)
31. [Головне](#головне)

---

# Що таке Type Safety

**Type Safety** — це властивість програми, за якої значення використовуються відповідно до своїх типів.

Наприклад:

    let age: number = 56;

Це типобезпечний код.

А:

    let age: number = "56";

TypeScript покаже помилку.

---

# Основна ідея Type Safety

TypeScript намагається гарантувати:

> Значення повинно використовуватися відповідно до типу, який для нього визначений.

Наприклад:

    const name: string = "John";

    console.log(name.toUpperCase());

Безпечно, тому що `name` — `string`.

А:

    const age: number = 30;

    age.toUpperCase();

небезпечний код.

TypeScript повідомить про проблему ще до запуску програми.

---

# TypeScript як система перевірки типів

TypeScript додає static type system поверх JavaScript.

JavaScript:

    const age = 30;

TypeScript:

    const age: number = 30;

Але TypeScript також має **type inference**:

    const age = 30;

TypeScript сам визначає:

    age: number

Тому явна анотація не завжди потрібна.

---

# Static Typing

TypeScript є мовою зі статичною перевіркою типів.

Це означає, що TypeScript аналізує код до виконання.

Наприклад:

    const age: number = 30;

    age = "thirty";

TypeScript покаже помилку.

Це дозволяє виявити багато проблем ще під час розробки.

---

# Compile-Time vs Runtime

Це одна з найважливіших концепцій.

## Compile-Time

TypeScript перевіряє:

- типи;
- сигнатури функцій;
- властивості об'єктів;
- сумісність типів;
- union types;
- generics;
- `null` / `undefined`.

Наприклад:

    const age: number = "30";

Це помилка compile-time.

---

## Runtime

Після компіляції TypeScript перетворюється на JavaScript.

Типи TypeScript у runtime не існують як система перевірки.

Наприклад:

    const age: number = 30;

після компіляції фактично стає:

    const age = 30;

Анотація `number` зникає.

---

# Type Safety ≠ Runtime Safety

Це дуже важливий момент.

TypeScript перевіряє ваш код під час розробки, але не може автоматично гарантувати, що зовнішні дані правильні.

Наприклад:

    interface User {
        id: number;
        name: string;
    }

    const user: User = JSON.parse(data);

TypeScript може повірити, що `user` — `User`.

Але `JSON.parse()` фактично повертає дані, які можуть мати будь-яку структуру.

Тому:

> TypeScript типізує код, але не перевіряє автоматично дані з реального світу.

---

# Межі Type Safety

Особливо небезпечними є зовнішні джерела даних:

    API
    JSON
    localStorage
    database
    user input
    URL parameters
    files
    environment variables

Наприклад:

    const data = await fetch("/api/users");

TypeScript не може просто "знати", що сервер справді повернув правильну структуру.

Потрібна runtime validation.

---

# Implicit та Explicit Types

## Explicit

Тип вказується явно:

    let age: number = 30;

    let name: string = "John";

---

## Implicit

TypeScript визначає тип автоматично:

    let age = 30;

    let name = "John";

TypeScript розуміє:

    age: number

    name: string

Обидва підходи можуть бути type-safe.

---

# Type Inference та Type Safety

Inference допомагає зберігати type safety без зайвого коду.

Наприклад:

    const user = {
        id: 1,
        name: "John"
    };

TypeScript визначає:

    {
        id: number;
        name: string;
    }

Тепер:

    user.id = "1";

помилка.

---

# Не потрібно типізувати все вручну

Погано:

    const name: string = "John";

    const age: number = 30;

    const active: boolean = true;

У багатьох випадках inference вже достатньо:

    const name = "John";

    const age = 30;

    const active = true;

TypeScript сам визначає типи.

---

# Коли explicit type корисний

Явний тип особливо корисний:

- у параметрах функцій;
- у return types;
- у складних об'єктах;
- у public API;
- у domain models;
- у generic abstractions;
- коли inference недостатньо зрозумілий.

Наприклад:

    function calculateTotal(
        price: number,
        quantity: number
    ): number {
        return price * quantity;
    }

---

# Strict Mode

Для максимальної Type Safety рекомендується:

    {
        "compilerOptions": {
            "strict": true
        }
    }

`strict` вмикає набір строгих перевірок TypeScript.

Серед них:

    strictNullChecks
    noImplicitAny
    strictFunctionTypes
    strictBindCallApply
    strictPropertyInitialization
    noImplicitThis
    useUnknownInCatchVariables

---

# Strict Null Checks

З `strictNullChecks` TypeScript розрізняє:

    string

та:

    string | null

Наприклад:

    let name: string = "John";

    name = null;

помилка.

Якщо `null` дійсно дозволений:

    let name: string | null = null;

Тепер код type-safe.

---

# No Implicit Any

TypeScript не повинен непомітно створювати `any`.

Наприклад:

    function print(value) {
        console.log(value);
    }

При строгій конфігурації TypeScript повідомить, що параметр не має типу.

Потрібно:

    function print(value: string) {
        console.log(value);
    }

або, якщо значення дійсно невідоме:

    function print(value: unknown) {
        console.log(value);
    }

---

# Типобезпечні змінні

Наприклад:

    let count: number = 0;

    count += 1;

Це type-safe.

А:

    count = "one";

не дозволено.

---

# `const` та Type Safety

`const` не дозволяє переприсвоїти змінну:

    const name = "John";

    name = "Anna";

Помилка.

Але це не означає, що об'єкт стає повністю immutable:

    const user = {
        name: "John"
    };

    user.name = "Anna";

Це дозволено.

Для readonly використовують:

    const user: Readonly<User> = {
        name: "John"
    };

---

# Типобезпечні функції

Функція повинна мати зрозумілий контракт.

Наприклад:

    function add(
        a: number,
        b: number
    ): number {
        return a + b;
    }

Виклик:

    add(10, 20);

type-safe.

А:

    add("10", "20");

помилка.

---

# Return Type

TypeScript може визначити return type:

    function add(a: number, b: number) {
        return a + b;
    }

TypeScript визначить:

    (a: number, b: number) => number

Але для важливих функцій явний return type може бути корисним:

    function add(
        a: number,
        b: number
    ): number {
        return a + b;
    }

---

# Типобезпечні функції та `undefined`

Наприклад:

    function findUser(
        id: number
    ): User | undefined {
        // ...
    }

Користувач може бути:

    User

або:

    undefined

TypeScript змушує обробити цей випадок.

---

# Типобезпечні об'єкти

Визначимо:

    interface User {
        id: number;
        name: string;
        age: number;
    }

Тепер:

    const user: User = {
        id: 1,
        name: "John",
        age: 30
    };

TypeScript перевіряє:

- наявність необхідних властивостей;
- тип кожної властивості;
- зайві властивості у відповідних контекстах.

---

# Помилка в об'єкті

    const user: User = {
        id: "1",
        name: "John",
        age: 30
    };

Помилка:

    id повинно бути number

---

# Відсутня властивість

    const user: User = {
        id: 1,
        name: "John"
    };

Якщо `age` обов'язкове:

    age

відсутнє.

TypeScript повідомить про помилку.

---

# Optional Property

Якщо властивість дійсно необов'язкова:

    interface User {
        id: number;
        name: string;
        age?: number;
    }

Тепер:

    const user: User = {
        id: 1,
        name: "John"
    };

type-safe.

---

# Type Narrowing

Type narrowing — один із ключових механізмів Type Safety.

Наприклад:

    function print(
        value: string | number
    ) {
        if (typeof value === "string") {
            console.log(value.toUpperCase());
        }

        if (typeof value === "number") {
            console.log(value.toFixed(2));
        }
    }

TypeScript розуміє тип у кожній гілці.

---

# Narrowing з `null`

    function printName(
        name: string | null
    ) {
        if (name === null) {
            return;
        }

        console.log(name.toUpperCase());
    }

Після перевірки:

    name: string

---

# Narrowing з `undefined`

    function printName(
        name: string | undefined
    ) {
        if (name === undefined) {
            return;
        }

        console.log(name.toUpperCase());
    }

Після перевірки:

    name: string

---

# Type Guards

Type guard дозволяє безпечно звужувати тип.

Наприклад:

    function isString(
        value: unknown
    ): value is string {
        return typeof value === "string";
    }

Використання:

    function print(value: unknown) {
        if (isString(value)) {
            console.log(value.toUpperCase());
        }
    }

---

# Union Types і Type Safety

Union type:

    type ID = string | number;

Тепер:

    let id: ID;

    id = 10;

    id = "abc";

Обидва варіанти дозволені.

А:

    id = true;

не дозволено.

---

# Union Types потребують Narrowing

Наприклад:

    function printId(id: string | number) {
        console.log(id.toUpperCase());
    }

Помилка.

Чому?

Тому що `id` може бути `number`.

Потрібно:

    function printId(id: string | number) {
        if (typeof id === "string") {
            console.log(id.toUpperCase());
        }
    }

---

# Discriminated Unions

Це один із найсильніших інструментів Type Safety.

Наприклад:

    type Result =
        | {
            status: "success";
            data: string;
        }
        | {
            status: "error";
            error: string;
        };

Тепер TypeScript може визначати структуру залежно від `status`.

---

# Discriminated Union на практиці

    function handleResult(result: Result) {
        if (result.status === "success") {
            console.log(result.data);
        } else {
            console.log(result.error);
        }
    }

У першій гілці:

    result.data

доступне.

У другій:

    result.error

доступне.

---

# Unknown vs Any

## `any`

    let value: any;

`any` фактично вимикає значну частину Type Safety.

Наприклад:

    let value: any = "hello";

    value.toUpperCase();

    value.toFixed();

    value.foo.bar.baz();

TypeScript може не повідомити про проблеми.

---

# `unknown`

`unknown` набагато безпечніший:

    let value: unknown;

Не можна просто:

    value.toUpperCase();

Спочатку потрібно перевірити тип:

    if (typeof value === "string") {
        value.toUpperCase();
    }

Тому:

    any
    ↓
    менше Type Safety

    unknown
    ↓
    Type Safety зберігається

---

# Type Assertions

Type assertion:

    value as User

означає:

> Я кажу TypeScript, що це `User`.

Наприклад:

    const user = data as User;

Проблема:

TypeScript не перевіряє, чи `data` дійсно є `User`.

---

# Небезпечна Type Assertion

    const user = {
        name: "John"
    } as User;

Якщо:

    interface User {
        id: number;
        name: string;
    }

то ми фактично змусили TypeScript повірити нам.

Але:

    user.id

реально не існує.

Тому type assertion може знижувати Type Safety.

---

# Правило Type Assertion

Використовуйте:

    as

тільки тоді, коли ви дійсно маєте підстави гарантувати тип.

Краще:

    unknown
        ↓
    validation
        ↓
    narrowed type

ніж:

    any
        ↓
    as User
        ↓
    potential runtime error

---

# Non-null Assertion

Оператор:

    !

каже TypeScript:

> Тут точно не `null` і не `undefined`.

Наприклад:

    const element =
        document.querySelector("#app")!;

Це зручно, але небезпечно.

---

# Чому `!` знижує Type Safety

Наприклад:

    const element =
        document.querySelector("#missing")!;

Насправді:

    element === null

Але TypeScript думає:

    element: Element

Runtime може завершитися помилкою.

Краще:

    const element =
        document.querySelector("#app");

    if (!element) {
        return;
    }

    element.textContent = "Hello";

---

# Exhaustive Checking

Type Safety особливо важлива для union types.

Наприклад:

    type Status =
        | "loading"
        | "success"
        | "error";

Можна перевірити всі варіанти.

    function assertNever(
        value: never
    ): never {
        throw new Error(
            `Unexpected value: ${value}`
        );
    }

---

# Exhaustive Switch

    function getMessage(status: Status): string {
        switch (status) {
            case "loading":
                return "Loading...";

            case "success":
                return "Success!";

            case "error":
                return "Error!";

            default:
                return assertNever(status);
        }
    }

Якщо додати новий статус:

    | "cancelled"

TypeScript покаже місце, де його не обробили.

Це дуже сильний механізм Type Safety.

---

# Типобезпечна робота з масивами

Наприклад:

    const users: User[] = [];

TypeScript знає тип елементів.

    users.push({
        id: 1,
        name: "John"
    });

Якщо структура не відповідає типу:

    users.push({
        id: "1",
        name: "John"
    });

TypeScript покаже помилку.

---

# Type Safety з `map`

    const names = users.map(
        user => user.name
    );

Якщо:

    users: User[]

то:

    names: string[]

TypeScript автоматично передає тип через callback.

---

# Type Safety з `filter`

Наприклад:

    const users: Array<User | null> = [];

Після:

    const validUsers = users.filter(
        (user): user is User => user !== null
    );

TypeScript знає:

    validUsers: User[]

---

# Type Safety з `reduce`

Наприклад:

    const prices: number[] = [
        10,
        20,
        30
    ];

    const total = prices.reduce(
        (sum, price) => sum + price,
        0
    );

TypeScript визначає:

    total: number

---

# Типобезпечна робота з API

Це одна з найважливіших тем для Full Stack.

Наприклад:

    interface User {
        id: number;
        name: string;
        email: string;
    }

Ми очікуємо:

    User

Але сервер може повернути що завгодно.

---

# Небезпечний API

    const response = await fetch("/api/user");

    const user = await response.json();

    console.log(user.name);

Проблема:

`response.json()` не гарантує конкретний TypeScript type.

---

# Небезпечний `as`

Можна написати:

    const user =
        await response.json() as User;

Але це лише assertion.

Ми не перевірили реальні дані.

---

# Безпечніша модель API

    const data: unknown =
        await response.json();

Тепер потрібно перевірити:

    if (isUser(data)) {
        console.log(data.name);
    }

---

# Runtime Validation

Для зовнішніх даних потрібна runtime validation.

Загальна модель:

    External Data
        ↓
    unknown
        ↓
    validation
        ↓
    trusted type
        ↓
    application

Наприклад:

    API
        ↓
    unknown
        ↓
    User validation
        ↓
    User
        ↓
    React

---

# Простий Type Guard для API

    interface User {
        id: number;
        name: string;
    }

    function isUser(
        value: unknown
    ): value is User {
        if (
            typeof value !== "object" ||
            value === null
        ) {
            return false;
        }

        const user = value as Record<string, unknown>;

        return (
            typeof user.id === "number" &&
            typeof user.name === "string"
        );
    }

---

# Type Safety у DOM

DOM API часто повертає nullable values.

Наприклад:

    const button =
        document.querySelector("#button");

Тип:

    Element | null

Тому:

    if (button) {
        button.addEventListener(
            "click",
            () => {
                console.log("Click");
            }
        );
    }

Це type-safe.

---

# Generic DOM API

Можна використовувати generic:

    const input =
        document.querySelector<HTMLInputElement>(
            "#username"
        );

Тепер:

    input?.value

має відповідний тип.

---

# Type Safety у React

У React TypeScript допомагає типізувати:

- props;
- state;
- events;
- refs;
- context;
- API responses;
- hooks.

Наприклад:

    interface UserCardProps {
        name: string;
        age: number;
    }

    function UserCard({
        name,
        age
    }: UserCardProps) {
        return (
            <div>
                {name} — {age}
            </div>
        );
    }

---

# Type-safe Props

Не можна:

    <UserCard
        name={123}
        age="30"
    />

TypeScript покаже помилки.

Потрібно:

    <UserCard
        name="John"
        age={30}
    />

---

# Type Safety у React State

Наприклад:

    const [count, setCount] =
        useState<number>(0);

Тепер:

    setCount(10);

дозволено.

А:

    setCount("10");

помилка.

---

# Nullable React State

Наприклад:

    const [user, setUser] =
        useState<User | null>(null);

На початку:

    user === null

Після завантаження:

    user = User

Потрібне narrowing:

    if (!user) {
        return <p>Loading...</p>;
    }

    return <p>{user.name}</p>;

---

# Type Safety у Backend

На backend TypeScript допомагає типізувати:

- request;
- response;
- service;
- database models;
- DTO;
- configuration;
- business logic.

Наприклад:

    interface CreateUserDto {
        name: string;
        email: string;
    }

Функція:

    function createUser(
        data: CreateUserDto
    ): User {
        // ...
    }

---

# Type Safety у Full Stack

Ідеальна модель:

    Database
        ↓
    Backend
        ↓
    API Contract
        ↓
    Frontend
        ↓
    UI

TypeScript допомагає описати контракт:

    interface User {
        id: number;
        name: string;
        email: string;
    }

Але важливо пам'ятати:

> TypeScript type ≠ автоматична runtime validation.

---

# Типові способи втрати Type Safety

## 1. `any`

    const data: any = getData();

`any` фактично вимикає багато перевірок.

---

## 2. Надмірний `as`

    const user = data as User;

Це не validation.

---

## 3. Non-null assertion

    const user = getUser()!;

Можна отримати runtime error.

---

## 4. `JSON.parse()`

    const data = JSON.parse(json);

Результат не має гарантованої структури.

Краще:

    const data: unknown = JSON.parse(json);

і потім validation.

---

## 5. Неконтрольований API

    const data = await response.json();

Не варто автоматично вважати `data` правильним типом.

---

## 6. `@ts-ignore`

    // @ts-ignore
    someCode();

Це вимикає перевірку конкретного рядка.

Використовувати тільки у виняткових ситуаціях.

---

## 7. `@ts-nocheck`

    // @ts-nocheck

Це фактично вимикає TypeScript checking для всього файлу.

Для production-коду краще уникати.

---

# `@ts-expect-error`

Це більш контрольований варіант:

    // @ts-expect-error
    someInvalidCode();

TypeScript очікує помилку.

Якщо помилки більше немає, TypeScript також повідомить про проблему.

Це корисніше для тестів та спеціальних випадків, ніж:

    @ts-ignore

---

# Type Safety та принцип "Trust Boundaries"

Дуже корисно розділяти програму на:

    Trusted Data
    ↓
    дані, які вже перевірені

та:

    Untrusted Data
    ↓
    дані ззовні

Наприклад:

    User Input
        ↓
    Untrusted
        ↓
    Validation
        ↓
    Trusted
        ↓
    Business Logic

---

# Trust Boundary

Типові trust boundaries:

    Browser
       ↓
    API

    API
       ↓
    Backend

    Backend
       ↓
    Database

    Database
       ↓
    Application

На кожній межі потрібно думати:

> Чи справді я можу довіряти цим даним?

---

# Type Safety Mental Model

Корисно мислити так:

    TYPE
      ↓
    описує допустимі значення
      ↓
    TypeScript перевіряє код
      ↓
    narrowing перевіряє умови
      ↓
    unknown захищає від невідомих даних
      ↓
    validation перевіряє runtime data
      ↓
    application працює з trusted data

---

# Практичні вправи

## Вправа 1 — Safe Function

Створіть:

    function multiply(
        a: number,
        b: number
    ): number {
        // ...
    }

Спробуйте передати:

    multiply(10, 20);

та:

    multiply("10", 20);

Поясніть, чому другий варіант не type-safe.

---

# Вправа 2 — Union

Створіть:

    type ID = string | number;

Функцію:

    function printId(id: ID): void {
        // ...
    }

Зробіть правильний narrowing через `typeof`.

---

# Вправа 3 — Nullable User

Створіть:

    interface User {
        id: number;
        name: string;
    }

    function findUser(
        id: number
    ): User | null {
        // ...
    }

Безпечно обробіть результат.

---

# Вправа 4 — Unknown

Створіть:

    function processValue(
        value: unknown
    ): void {
        // ...
    }

Функція повинна:

- працювати з `string`;
- працювати з `number`;
- відкидати інші типи.

---

# Вправа 5 — Type Guard

Створіть:

    interface Product {
        id: number;
        name: string;
        price: number;
    }

Створіть:

    function isProduct(
        value: unknown
    ): value is Product {
        // ...
    }

Перевірте різні об'єкти.

---

# Вправа 6 — Exhaustive Check

Створіть:

    type Status =
        | "idle"
        | "loading"
        | "success"
        | "error";

Створіть функцію:

    function getStatusMessage(
        status: Status
    ): string {
        // ...
    }

Забезпечте exhaustive checking через `never`.

---

# Вправа 7 — Safe API

Створіть функцію:

    async function getUser(
        id: number
    ): Promise<User | null> {
        // ...
    }

Врахуйте:

- network error;
- неправильні дані;
- відсутність користувача;
- правильний `User`.

---

# Mini Projects

## Mini Project 1 — Type-safe Calculator

Створіть калькулятор.

Модель:

    type Operation =
        | "add"
        | "subtract"
        | "multiply"
        | "divide";

Функція:

    function calculate(
        a: number,
        b: number,
        operation: Operation
    ): number {
        // ...
    }

Вимоги:

- type-safe arguments;
- union type для операції;
- exhaustive switch;
- обробка ділення на нуль.

---

# Mini Project 2 — Type-safe User Search

Створіть:

    interface User {
        id: number;
        name: string;
        email: string;
    }

Реалізуйте:

    findUser(id)
    findUsersByName(name)

Функції повинні правильно повертати:

    User | undefined

або:

    User[]

---

# Mini Project 3 — Safe API Response

Створіть модель:

    interface User {
        id: number;
        name: string;
        email: string;
    }

Створіть:

    type ApiResponse =
        | {
            status: "success";
            data: User[];
        }
        | {
            status: "error";
            message: string;
        };

Реалізуйте обробку обох станів.

---

# Mini Project 4 — Form Validation

Створіть:

    interface LoginForm {
        email: string;
        password: string;
    }

Результат validation:

    type ValidationResult =
        | {
            success: true;
            data: LoginForm;
        }
        | {
            success: false;
            errors: string[];
        };

UI повинен працювати тільки з валідними даними.

---

# Mini Project 5 — Full Stack Type Safety

Створіть невеликий flow:

    React
       ↓
    fetch()
       ↓
    API
       ↓
    Backend
       ↓
    Database

Опишіть:

    User
    CreateUserDto
    UpdateUserDto
    ApiResponse

Перевірте, де виникають trust boundaries.

---

# Питання для співбесіди

## Junior

### 1. Що таке Type Safety?

Це здатність системи типів гарантувати, що значення використовуються відповідно до визначених типів.

### 2. Чим TypeScript відрізняється від JavaScript щодо типів?

TypeScript додає статичну перевірку типів під час розробки.

### 3. Що таке Type Inference?

Автоматичне визначення типу TypeScript без явної анотації.

### 4. Що робить `strict: true`?

Вмикає строгі перевірки TypeScript.

### 5. Чому `any` небезпечний?

Тому що він значною мірою вимикає перевірку типів.

---

# Middle

### 6. Чим `unknown` кращий за `any`?

`unknown` змушує спочатку перевірити тип значення.

### 7. Що таке Type Narrowing?

Процес звуження union type до конкретного типу на основі перевірки.

### 8. Що таке Type Guard?

Перевірка, яку TypeScript використовує для narrowing.

### 9. Чи гарантує TypeScript правильність API response?

Ні.

TypeScript перевіряє статичний код, але runtime data потрібно додатково валідовувати.

### 10. Чому `as User` не є validation?

Тому що assertion тільки повідомляє TypeScript, який тип ми очікуємо. Реальні runtime-дані не перевіряються.

---

# Senior

### 11. Що таке Trust Boundary?

Межа, за якою дані можуть бути неперевіреними або зовнішніми.

### 12. Де потрібна runtime validation?

На межах системи:

    API
    database
    user input
    JSON
    localStorage
    environment variables
    files

### 13. Як побудувати type-safe API flow?

    external data
        ↓
    unknown
        ↓
    validation
        ↓
    domain type
        ↓
    business logic

### 14. Чому TypeScript не забезпечує повну Type Safety?

Тому що типи TypeScript існують переважно на етапі компіляції та не перевіряють автоматично всі runtime-дані.

### 15. Чому exhaustive checking важливий?

Він дозволяє TypeScript знаходити необроблені варіанти union type.

---

# Рівні володіння

## Core

Потрібно знати:

- що таке Type Safety;
- static typing;
- compile-time checking;
- type inference;
- basic annotations;
- union types;
- `null`;
- `undefined`;
- `strictNullChecks`.

---

## Junior

Потрібно вміти:

- писати type-safe functions;
- типізувати objects;
- використовувати union types;
- робити narrowing;
- використовувати type guards;
- уникати `any`;
- використовувати `unknown`;
- працювати зі strict mode.

---

## Middle

Потрібно розуміти:

- runtime vs compile-time;
- trust boundaries;
- API validation;
- discriminated unions;
- exhaustive checking;
- custom type guards;
- generic type guards;
- безпечну роботу з DOM;
- Type Safety у React;
- Type Safety у backend.

---

## Senior

Потрібно вміти:

- проєктувати type-safe architecture;
- визначати trust boundaries;
- моделювати domain types;
- проєктувати API contracts;
- відділяти compile-time та runtime validation;
- мінімізувати `any`;
- контролювати assertions;
- будувати end-to-end type-safe data flow;
- знаходити місця втрати Type Safety.

---

# Mini Cheat Sheet

## Basic Types

    let name: string = "John";

    let age: number = 30;

    let active: boolean = true;

---

## Inference

    const name = "John";

    const age = 30;

TypeScript автоматично визначає:

    name: string
    age: number

---

## Union

    type ID = string | number;

---

## Nullable

    let user: User | null;

---

## Undefined

    let user: User | undefined;

---

## Unknown

    let value: unknown;

Потрібен narrowing:

    if (typeof value === "string") {
        value.toUpperCase();
    }

---

## Any

    let value: any;

Намагайтеся уникати.

---

## Type Guard

    if (typeof value === "string") {
        // value: string
    }

---

## Custom Type Guard

    function isUser(
        value: unknown
    ): value is User {
        // validation
    }

---

## Assertion

    const user = data as User;

Використовувати обережно.

---

## Non-null Assertion

    const element = getElement()!;

Використовувати тільки коли гарантія справді існує.

---

## Optional Chaining

    user?.name

---

## Nullish Coalescing

    user.name ?? "Guest"

---

## Exhaustive Checking

    function assertNever(
        value: never
    ): never {
        throw new Error();
    }

---

## Strict Mode

    {
        "compilerOptions": {
            "strict": true
        }
    }

---

# Type Safety Pyramid

Можна побудувати ментальну модель:

    ┌───────────────────────────┐
    │      Application          │
    ├───────────────────────────┤
    │      Trusted Types        │
    ├───────────────────────────┤
    │    Type Narrowing         │
    ├───────────────────────────┤
    │    Runtime Validation     │
    ├───────────────────────────┤
    │        unknown            │
    ├───────────────────────────┤
    │     External Data         │
    └───────────────────────────┘

Чим нижче ми знаходимося, тим менше довіри до даних.

---

# Type Safety Flow

Для Full Stack розробника корисно мислити таким потоком:

    User Input
        ↓
    unknown / raw data
        ↓
    validation
        ↓
    typed DTO
        ↓
    business logic
        ↓
    typed database result
        ↓
    API response
        ↓
    typed frontend data
        ↓
    UI

---

# Type Safety та TypeScript

Важливо розуміти:

    TypeScript
        ↓
    перевіряє програмний код

але:

    Runtime Data
        ↓
    потребує runtime validation

Тому:

    TypeScript
        +
    Runtime Validation
        =
    значно надійніший application

---

# Головні правила Type Safety

## Правило 1

Не використовувати `any` без реальної необхідності.

---

## Правило 2

Для невідомих даних використовувати:

    unknown

а не:

    any

---

## Правило 3

Не довіряти зовнішнім даним автоматично.

---

## Правило 4

Використовувати:

    strict: true

---

## Правило 5

Використовувати narrowing замість небезпечних assertions.

---

## Правило 6

Не зловживати:

    !

та:

    as

---

## Правило 7

Моделювати стани через типи.

Наприклад:

    type State =
        | { status: "loading" }
        | { status: "success"; data: User[] }
        | { status: "error"; message: string };

Це набагато безпечніше, ніж:

    interface State {
        loading: boolean;
        error?: string;
        data?: User[];
    }

---

# Що потрібно запам'ятати

    Type Safety
        ↓
    правильне використання типів


    strict
        ↓
    більше перевірок


    inference
        ↓
    TypeScript визначає тип автоматично


    unknown
        ↓
    невідоме, але контрольоване значення


    any
        ↓
    фактичне послаблення Type Safety


    narrowing
        ↓
    звуження типу


    type guard
        ↓
    перевірка типу


    validation
        ↓
    перевірка runtime data


    assertion
        ↓
    довіра розробника


    never
        ↓
    неможливий стан / exhaustive checking

---

# Головне

> **Type Safety — це не просто написання типів. Це спосіб побудувати програму так, щоб неправильні стани було важко створити та легко виявити.**

Запам'ятайте основний принцип:

    Unknown Data
        ↓
    Validate
        ↓
    Narrow
        ↓
    Trusted Type
        ↓
    Business Logic

І головну різницю:

    TypeScript
        ↓
    compile-time safety

    Runtime validation
        ↓
    runtime safety

Для сучасного Full Stack TypeScript-коду найкраща комбінація:

    strict: true
        +
    explicit domain types
        +
    type inference
        +
    unknown
        +
    type narrowing
        +
    runtime validation
        +
    exhaustive checking

> **Хороший TypeScript-код не обходить систему типів — він використовує її як інструмент проєктування надійної архітектури.**