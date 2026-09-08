# 02. Type Annotations

Type annotation (анотація типу) — це явне зазначення типу значення у TypeScript-коді.

TypeScript дозволяє вказувати, які типи даних можуть використовувати:

    variables
    constants
    function parameters
    return values
    objects
    arrays
    class properties
    function types
    tuples
    properties

Основна ідея:

    value
      ↓
    type annotation
      ↓
    TypeScript knows expected type
      ↓
    type checking

Наприклад:

    const age: number = 56;

Тут:

    age
        ↓
    variable

    number
        ↓
    type annotation

---

### Ключові поняття

✔ type annotation  
✔ type  
✔ variable annotation  
✔ explicit typing  
✔ type declaration  
✔ primitive type  
✔ `string`  
✔ `number`  
✔ `boolean`  
✔ `bigint`  
✔ `symbol`  
✔ `null`  
✔ `undefined`  
✔ array annotation  
✔ object annotation  
✔ function parameter annotation  
✔ return type annotation  
✔ optional parameter  
✔ readonly property  
✔ union type  
✔ literal type  
✔ tuple annotation  
✔ type assertion  
✔ type inference  
✔ contextual typing  
✔ type compatibility  
✔ type safety  

---

### Що потрібно пам'ятати

• Type annotation — це явне зазначення типу.

• Основний синтаксис:

    value: type

• Наприклад:

    const age: number = 56;

• Annotation не змінює runtime value.

• Annotation використовується TypeScript для static type checking.

• Type annotation може застосовуватися до змінних, параметрів, return values, об'єктів, масивів та інших конструкцій.

• TypeScript часто може визначити тип автоматично через type inference.

• Не потрібно бездумно додавати annotation там, де TypeScript і так точно визначає тип.

• Annotation особливо корисна там, де тип неочевидний або потрібно явно визначити контракт.

---

# Основний синтаксис

Загальний синтаксис:

    const variable: type = value;

Наприклад:

    const name: string = "John";

    const age: number = 25;

    const active: boolean = true;

Структура:

    variable
        ↓
    :
        ↓
    type
        ↓
    =
        ↓
    value

---

# String Annotation

Тип:

    string

Приклад:

    const name: string = "John";

Ще приклади:

    const city: string = "Kyiv";

    const message: string = "Hello";

    const country: string = "Ukraine";

---

### String із template literal

    const name: string = "John";

    const message: string = `Hello, ${name}`;

Тип:

    message → string

---

# Number Annotation

Тип:

    number

Приклади:

    const age: number = 56;

    const price: number = 19.99;

    const temperature: number = -5;

    const score: number = 100;

JavaScript / TypeScript використовує:

    number

для:

    integers
    floating-point numbers
    positive numbers
    negative numbers
    NaN
    Infinity

---

# Boolean Annotation

Тип:

    boolean

Приклади:

    const isActive: boolean = true;

    const isAdmin: boolean = false;

    const isLoggedIn: boolean = true;

---

# BigInt Annotation

Тип:

    bigint

Приклад:

    const bigNumber: bigint = 9007199254740991n;

Важливо:

    number
        ≠
    bigint

Наприклад:

    const a: number = 10;

    const b: bigint = 10n;

---

# Symbol Annotation

Тип:

    symbol

Приклад:

    const id: symbol = Symbol("id");

---

# Null Annotation

Тип:

    null

Приклад:

    const value: null = null;

У реальному коді annotation `null` окремо використовується рідше.

Частіше `null` є частиною union:

    let user: User | null;

---

# Undefined Annotation

Тип:

    undefined

Приклад:

    let value: undefined = undefined;

Також `undefined` часто з'являється у union:

    let result: string | undefined;

---

# Variable Type Annotation

Змінна:

    let age: number = 56;

Пізніше можна змінити значення на інше число:

    age = 57;

Але:

    age = "57";

буде помилкою типів.

Причина:

    age → number

а:

    "57" → string

---

# const Type Annotation

Для `const`:

    const name: string = "John";

    const age: number = 56;

    const active: boolean = true;

`const` не дозволяє переприсвоїти змінну:

    const age: number = 56;

    age = 57;

Помилка не пов'язана з TypeScript type annotation.

Причина:

    const → cannot reassign

---

# Type Annotation vs Type Inference

Явна annotation:

    const age: number = 56;

Inference:

    const age = 56;

В обох випадках TypeScript знає:

    age → number

Тому annotation не завжди потрібна.

---

# Коли annotation корисна

Annotation особливо корисна, коли:

- тип неочевидний;
- значення буде отримано пізніше;
- потрібно описати API функції;
- потрібно обмежити допустимі значення;
- потрібно описати структуру об'єкта;
- потрібно явно задокументувати контракт;
- TypeScript не може коректно вивести потрібний тип.

Наприклад:

    let age: number;

    age = 56;

Тут тип відомий ще до присвоєння значення.

---

# Annotation без початкового значення

Можна оголосити змінну з типом:

    let username: string;

Пізніше:

    username = "John";

Але:

    username = 123;

буде помилкою.

---

# Array Type Annotation

Масив чисел:

    const numbers: number[] = [
        10,
        20,
        30
    ];

Масив рядків:

    const names: string[] = [
        "John",
        "Anna",
        "Mark"
    ];

Масив boolean:

    const flags: boolean[] = [
        true,
        false,
        true
    ];

---

# Array<T>

Інший синтаксис:

    const numbers: Array<number> = [
        1,
        2,
        3
    ];

Еквівалент:

    const numbers: number[] = [
        1,
        2,
        3
    ];

Обидва варіанти описують:

    array of numbers

---

# Multidimensional Array

Масив масивів:

    const matrix: number[][] = [
        [1, 2],
        [3, 4],
        [5, 6]
    ];

Тут:

    matrix
        ↓
    number[][]
        ↓
    array of arrays of numbers

---

# Array of Objects

Наприклад:

    const users: {
        name: string;
        age: number;
    }[] = [
        {
            name: "John",
            age: 25
        },
        {
            name: "Anna",
            age: 30
        }
    ];

Тут кожен елемент масиву повинен мати:

    name → string
    age  → number

---

# Object Type Annotation

Можна описати структуру object:

    const user: {
        name: string;
        age: number;
    } = {
        name: "John",
        age: 25
    };

Тут:

    user.name → string

    user.age → number

---

# Object Properties

Кожна властивість має свій тип:

    const product: {
        title: string;
        price: number;
        available: boolean;
    } = {
        title: "Laptop",
        price: 1000,
        available: true
    };

---

# Nested Object Annotation

Об'єкти можуть бути вкладеними:

    const user: {
        name: string;
        address: {
            city: string;
            country: string;
        };
    } = {
        name: "John",
        address: {
            city: "Kyiv",
            country: "Ukraine"
        }
    };

---

# Optional Object Property

Властивість можна зробити optional:

    const user: {
        name: string;
        age?: number;
    } = {
        name: "John"
    };

`?` означає:

    property may be absent

Також можна:

    const user: {
        name: string;
        age?: number;
    } = {
        name: "John",
        age: 25
    };

---

# Readonly Property

Властивість можна зробити readonly:

    const user: {
        readonly id: number;
        name: string;
    } = {
        id: 1,
        name: "John"
    };

Можна:

    user.name = "Anna";

Не можна:

    user.id = 2;

`readonly` забороняє змінювати властивість через цей тип.

---

# Function Parameter Annotation

Параметри функції можна типізувати:

    function greet(name: string) {
        console.log(`Hello, ${name}`);
    }

Виклик:

    greet("John");

А:

    greet(123);

буде помилкою.

---

# Multiple Parameters

    function add(
        a: number,
        b: number
    ) {
        return a + b;
    }

Параметри:

    a → number
    b → number

---

# Return Type Annotation

Return type вказується після `)`:

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

# String Return Type

    function greet(name: string): string {
        return `Hello, ${name}`;
    }

---

# Boolean Return Type

    function isAdult(age: number): boolean {
        return age >= 18;
    }

---

# Void Return Type

Функція, яка нічого не повертає:

    function logMessage(message: string): void {
        console.log(message);
    }

`void` використовується для функцій, які не повертають корисного значення.

---

# Never Return Type

Функція, яка ніколи нормально не завершується:

    function fail(message: string): never {
        throw new Error(message);
    }

Це відрізняється від:

    void

`void`:

    function виконується
        ↓
    не повертає значення

`never`:

    function не доходить до normal return

---

# Optional Function Parameter

Параметр можна зробити optional:

    function greet(name?: string): string {
        if (name) {
            return `Hello, ${name}`;
        }

        return "Hello";
    }

Тепер дозволено:

    greet();

і:

    greet("John");

Тип optional parameter фактично враховує можливість відсутності значення.

---

# Default Parameter

    function greet(
        name: string = "Guest"
    ): string {
        return `Hello, ${name}`;
    }

Можна:

    greet();

або:

    greet("John");

---

# Optional vs Default Parameter

Optional:

    function greet(name?: string) {
        ...
    }

Параметр може бути відсутнім.

Default:

    function greet(
        name: string = "Guest"
    ) {
        ...
    }

Якщо параметр відсутній, використовується:

    "Guest"

---

# Union Type Annotation

Можна вказати декілька допустимих типів:

    let id: string | number;

Тепер:

    id = 10;

і:

    id = "abc";

обидва варіанти допустимі.

---

# Union для Function Parameter

    function printId(
        id: string | number
    ): void {
        console.log(id);
    }

Допустимо:

    printId(10);

    printId("abc");

---

# Union для Variable

    let value: string | number;

    value = "hello";

    value = 100;

---

# Literal Type Annotation

Можна дозволити тільки конкретні значення:

    let direction:
        "up"
        | "down"
        | "left"
        | "right";

Дозволено:

    direction = "up";

    direction = "left";

Не дозволено:

    direction = "forward";

---

# Literal String

Наприклад:

    let status: "success" | "error";

Допустимо:

    status = "success";

    status = "error";

Не допустимо:

    status = "loading";

---

# Literal Number

Можна використовувати конкретні числа:

    let statusCode: 200 | 404 | 500;

Допустимо:

    statusCode = 200;

    statusCode = 404;

Не допустимо:

    statusCode = 201;

---

# Tuple Annotation

Tuple — масив із визначеною структурою та позиціями.

Наприклад:

    const user: [string, number] = [
        "John",
        25
    ];

Структура:

    index 0 → string
    index 1 → number

---

# Tuple Example

    const point: [number, number] = [
        10,
        20
    ];

Тут:

    point[0] → number
    point[1] → number

---

# Readonly Array

Можна описати масив, який не можна змінювати через цей тип:

    const numbers: readonly number[] = [
        1,
        2,
        3
    ];

Не можна:

    numbers.push(4);

Не можна:

    numbers[0] = 10;

---

# Readonly Tuple

    const point: readonly [
        number,
        number
    ] = [10, 20];

Не можна змінювати елементи tuple.

---

# Function Type Annotation

Можна описати тип функції.

Наприклад:

    let add: (
        a: number,
        b: number
    ) => number;

Потім:

    add = (a, b) => {
        return a + b;
    };

Тип функції:

    (number, number) => number

---

# Function Type Alias

Функціональний тип можна винести в alias:

    type MathOperation = (
        a: number,
        b: number
    ) => number;

Тепер:

    const add: MathOperation = (a, b) => {
        return a + b;
    };

---

# Callback Annotation

Функція може приймати callback:

    function process(
        value: number,
        callback: (value: number) => number
    ): number {
        return callback(value);
    }

Виклик:

    process(10, value => value * 2);

---

# Object Function Property

Об'єкт може містити функцію:

    const calculator: {
        add: (a: number, b: number) => number;
    } = {
        add(a, b) {
            return a + b;
        }
    };

---

# Method Annotation

Можна описувати методи об'єкта:

    const user: {
        name: string;
        greet: () => string;
    } = {
        name: "John",

        greet() {
            return `Hello, ${this.name}`;
        }
    };

---

# Type Alias для Annotation

Якщо object annotation стає великою, краще створити type alias:

    type User = {
        name: string;
        age: number;
        active: boolean;
    };

Потім:

    const user: User = {
        name: "John",
        age: 25,
        active: true
    };

---

# Interface для Annotation

Також можна використати interface:

    interface User {
        name: string;
        age: number;
        active: boolean;
    }

Потім:

    const user: User = {
        name: "John",
        age: 25,
        active: true
    };

---

# Annotation та Type Inference

Не завжди потрібно:

    const age: number = 56;

Часто достатньо:

    const age = 56;

TypeScript виведе:

    age → number

---

# Annotation після Declaration

Особливо корисно:

    let message: string;

    message = "Hello";

Тут TypeScript не має початкового значення, тому annotation визначає тип.

---

# Annotation для API-подібних даних

Наприклад:

    type User = {
        id: number;
        name: string;
    };

Функція:

    function getUser(): User {
        return {
            id: 1,
            name: "John"
        };
    }

Annotation:

    : User

описує очікуваний return type.

---

# Annotation для Promise

Асинхронна функція може мати return type:

    async function getUser(): Promise<User> {
        ...
    }

Тут:

    Promise<User>

означає, що Promise зрештою поверне:

    User

---

# Generic Annotation

Можна використовувати generic:

    const users: Array<User> = [];

або:

    const users: User[] = [];

Generics будуть детально розглядатися у:

    05-generics

---

# Type Annotation для DOM

Наприклад:

    const button: HTMLButtonElement =
        document.querySelector("button")!;

Але у реальному коді потрібно враховувати:

    null

Наприклад:

    const button:
        HTMLButtonElement | null =
        document.querySelector("button");

Після перевірки:

    if (button) {
        button.textContent = "Click";
    }

DOM буде детально розглядатися у:

    12-typescript-with-dom

---

# Type Annotation для React

У React можна типізувати props:

    type Props = {
        title: string;
    };

Компонент:

    function Title({ title }: Props) {
        return <h1>{title}</h1>;
    }

React + TypeScript буде детально розглядатися у:

    13-typescript-with-react

---

# Type Annotation та `any`

Можна написати:

    let value: any;

Але це фактично вимикає значну частину type checking.

Наприклад:

    let value: any = 10;

    value = "hello";

    value = true;

    value.foo.bar();

TypeScript дозволить багато операцій, які можуть бути небезпечними runtime.

Тому:

    any

краще використовувати лише тоді, коли це дійсно необхідно.

---

# Type Annotation та `unknown`

Безпечніший варіант:

    let value: unknown;

Наприклад:

    const value: unknown = "hello";

Не можна просто:

    value.toUpperCase();

Потрібно звузити тип:

    if (typeof value === "string") {
        value.toUpperCase();
    }

---

# Type Annotation та `never`

    function fail(message: string): never {
        throw new Error(message);
    }

Тут annotation:

    : never

описує поведінку функції.

---

# Type Annotation та `null`

Наприклад:

    let user: User | null = null;

Після отримання даних:

    user = {
        name: "John",
        age: 25
    };

Тепер тип залишається:

    User | null

Тому потрібно враховувати обидва варіанти.

---

# Type Annotation та `undefined`

Наприклад:

    let username: string | undefined;

Можливі:

    username = "John";

або:

    username = undefined;

---

# Strict Null Checks

При:

    "strict": true

TypeScript суворіше працює з:

    null
    undefined

Наприклад:

    let name: string = null;

у strict mode буде помилкою.

Якщо `null` справді допустимий:

    let name: string | null = null;

Це дуже важливий патерн.

---

# Contextual Typing

Іноді TypeScript визначає тип не тільки з value, але й з context.

Наприклад:

    const numbers: number[] = [1, 2, 3];

    numbers.map(number => {
        return number * 2;
    });

TypeScript знає:

    number → number

тому що `map()` працює з:

    number[]

Це називається:

    contextual typing

---

# Annotation vs Assertion

Це різні концепції.

Annotation:

    const value: string = "hello";

Тут TypeScript перевіряє, що value відповідає типу.

Assertion:

    const value =
        someValue as string;

Тут ми повідомляємо TypeScript:

    "Я вважаю, що це string."

Assertion не виконує runtime validation.

---

# Annotation vs Conversion

Annotation:

    const age: number = 56;

Не змінює значення.

Conversion:

    const age = Number("56");

Виконує runtime conversion.

Тобто:

    : number
        ↓
    static type information

    Number(...)
        ↓
    runtime conversion

---

# Annotation та Type Compatibility

TypeScript перевіряє сумісність.

Наприклад:

    let age: number;

    age = 56;

Коректно.

А:

    age = "56";

Некоректно.

---

# Structural Typing та Object Annotation

Наприклад:

    type User = {
        name: string;
    };

    const person = {
        name: "John",
        age: 25
    };

Можна:

    const user: User = person;

Тому що `person` має необхідну структуру:

    name: string

Додаткова властивість:

    age

не заважає сумісності в цьому випадку.

---

# Excess Property Checking

При безпосередньому створенні object TypeScript може виконувати додаткову перевірку властивостей.

Наприклад:

    type User = {
        name: string;
    };

    const user: User = {
        name: "John",
        age: 25
    };

TypeScript може повідомити про:

    age

як про зайву властивість у цьому object literal.

Це відрізняється від assignment вже існуючого object.

---

# Практичний приклад

    type Product = {
        id: number;
        title: string;
        price: number;
        available: boolean;
    };

    const product: Product = {
        id: 1,
        title: "Laptop",
        price: 1000,
        available: true
    };

Функція:

    function formatProduct(
        product: Product
    ): string {
        return `${product.title}: $${product.price}`;
    }

Виклик:

    console.log(formatProduct(product));

Тут TypeScript контролює:

    product.id
        → number

    product.title
        → string

    product.price
        → number

    product.available
        → boolean

---

# Практичний приклад — function contract

    function divide(
        a: number,
        b: number
    ): number {
        return a / b;
    }

Контракт:

    input:
        number
        number

    output:
        number

Type annotation робить контракт функції явним.

---

# Практичний приклад — optional value

    function getUserName(
        user: User | null
    ): string {
        if (user === null) {
            return "Unknown";
        }

        return user.name;
    }

Тут annotation:

    user: User | null

явно повідомляє:

    user може бути User
    або null

---

# Практичний приклад — array

    type User = {
        id: number;
        name: string;
    };

    const users: User[] = [
        {
            id: 1,
            name: "John"
        },
        {
            id: 2,
            name: "Anna"
        }
    ];

---

# Практичний приклад — callback

    function calculate(
        a: number,
        b: number,
        operation: (
            x: number,
            y: number
        ) => number
    ): number {
        return operation(a, b);
    }

Використання:

    const result = calculate(
        10,
        5,
        (x, y) => x + y
    );

Результат:

    15

---

# Типові помилки

❌ Писати annotation всюди без необхідності.

Наприклад:

    const name: string = "John";

це допустимо, але:

    const name = "John";

часто достатньо.

---

❌ Використовувати неправильний тип.

    const age: number = "56";

Проблема:

    number
        vs
    string

---

❌ Плутати number і string.

    const age: number = 56;

і:

    const age: string = "56";

Це різні типи.

---

❌ Плутати `null` та `undefined`.

    null
        ↓
    intentional absence of value

    undefined
        ↓
    value is absent / not assigned

У конкретній ситуації їхня семантика може відрізнятися.

---

❌ Забувати про `null` у DOM/API.

Наприклад:

    const element:
        HTMLButtonElement | null =
        document.querySelector("button");

Не можна автоматично припускати:

    HTMLButtonElement

якщо елемент може бути відсутнім.

---

❌ Використовувати `any` замість правильного типу.

    const user: any = getUser();

Це приховує багато помилок.

---

❌ Плутати annotation з conversion.

    const value: number = 10;

не перетворює значення.

---

❌ Плутати annotation з assertion.

    const value = input as string;

не перевіряє runtime, що `input` дійсно string.

---

❌ Неправильно описувати optional property.

Наприклад:

    type User = {
        name: string;
        age: number;
    };

Якщо `age` може бути відсутнім:

    type User = {
        name: string;
        age?: number;
    };

---

❌ Забувати return type у складних функціях.

TypeScript часто може його вивести, але явний return type може бути корисним для публічних функцій та API.

---

# Коли використовувати Type Annotation

### Добре використовувати

Коли тип неочевидний:

    let user: User | null = null;

Коли змінна оголошується без значення:

    let message: string;

Коли описується параметр:

    function greet(name: string) {
        ...
    }

Коли потрібно визначити return contract:

    function add(
        a: number,
        b: number
    ): number {
        ...
    }

Коли описується структура:

    const user: User = {
        ...
    };

Коли потрібно обмежити допустимі значення:

    let status:
        "loading"
        | "success"
        | "error";

---

# Коли annotation може бути зайвою

Якщо TypeScript легко визначає тип:

    const age = 56;

замість:

    const age: number = 56;

Або:

    const name = "John";

замість:

    const name: string = "John";

У таких випадках inference вже достатньо хороший.

---

# Explicit vs Inferred Types

### Explicit

    const age: number = 56;

### Inferred

    const age = 56;

---

### Explicit

    const names: string[] = [
        "John",
        "Anna"
    ];

### Inferred

    const names = [
        "John",
        "Anna"
    ];

У другому випадку TypeScript сам визначає:

    string[]

---

# Правило

Не потрібно запитувати себе:

    "Чи можу я додати annotation?"

Краще запитати:

    "Чи робить annotation код зрозумілішим
     або встановлює важливий контракт?"

Якщо TypeScript і так очевидно визначає тип, annotation часто можна не писати.

---

# Type Annotation Patterns

## Variable

    let age: number = 56;

---

## Constant

    const name: string = "John";

---

## Array

    const numbers: number[] = [
        1,
        2,
        3
    ];

---

## Object

    const user: User = {
        name: "John",
        age: 25
    };

---

## Parameter

    function greet(name: string) {
        ...
    }

---

## Return Type

    function add(
        a: number,
        b: number
    ): number {
        ...
    }

---

## Optional Parameter

    function greet(
        name?: string
    ) {
        ...
    }

---

## Union

    let id: string | number;

---

## Tuple

    const point: [number, number] = [
        10,
        20
    ];

---

## Readonly

    const values: readonly number[] = [
        1,
        2,
        3
    ];

---

## Function Type

    const add: (
        a: number,
        b: number
    ) => number = (a, b) => {
        return a + b;
    };

---

# Питання зі співбесіди

Що таке Type Annotation?

Який синтаксис type annotation?

Для чого потрібна type annotation?

Чим type annotation відрізняється від type inference?

Чи обов'язково вказувати тип кожної змінної?

Як типізувати `string`?

Як типізувати `number`?

Як типізувати `boolean`?

Як типізувати масив?

Чим відрізняються:

    number[]

та:

    Array<number>

Як типізувати object?

Як типізувати вкладений object?

Як зробити property optional?

Що означає `readonly`?

Як типізувати параметр функції?

Як типізувати return value?

Що таке `void`?

Чим `void` відрізняється від `never`?

Як типізувати optional parameter?

Як типізувати default parameter?

Що таке union annotation?

Як типізувати tuple?

Як типізувати function type?

Що таке callback annotation?

Що таке contextual typing?

Чим annotation відрізняється від assertion?

Чим annotation відрізняється від conversion?

Чи змінює type annotation runtime value?

Чи потрібна annotation, якщо TypeScript вже вивів тип?

Коли annotation корисна?

Чому `any` небажано використовувати без потреби?

Як типізувати `null`?

Як типізувати `undefined`?

Що змінює `strictNullChecks`?

Як типізувати значення, яке може бути `null`?

Як типізувати значення, яке може бути `undefined`?

Як типізувати DOM element?

Як типізувати Promise?

---

# Шлях

## 🟢 Core

Розуміти:

    type annotation
    explicit typing
    type inference

Знати синтаксис:

    value: type

Вміти типізувати:

    variables
    constants
    parameters
    return values
    arrays
    objects

Знати primitive annotations:

    string
    number
    boolean
    bigint
    symbol

Розуміти:

    null
    undefined

Вміти використовувати:

    union types
    optional parameters
    optional properties
    readonly properties

Розуміти:

    type annotation
        vs
    type inference

---

## 🔵 Junior

Впевнено використовувати:

    variable annotations
    function annotations
    object annotations
    array annotations
    tuple annotations
    union annotations
    function type annotations

Розуміти:

    void
    never
    any
    unknown

Розуміти:

    contextual typing
    type compatibility
    structural typing

Вміти типізувати:

    callbacks
    nested objects
    arrays of objects
    functions
    Promise return types
    DOM values

Розуміти:

    null
    undefined
    strictNullChecks

Вміти вибирати між:

    explicit annotation
    type inference

---

## 🟠 Middle

Глибше розуміти:

    contextual typing
    type inference
    structural typing
    function compatibility
    variance
    generic annotations

Вміти будувати типи для:

    APIs
    DTOs
    React props
    database models
    callbacks
    async functions
    DOM APIs

Розуміти:

    type annotation
        vs
    assertion
        vs
    conversion

Розуміти:

    excess property checking

Вміти використовувати:

    readonly
    unions
    tuples
    function types
    generics

Вміти проектувати зрозумілі type contracts.

---

## 🔴 Senior

Глибоке розуміння:

    TypeScript type system
    contextual typing
    inference
    structural typing
    assignability
    variance
    function compatibility

Розуміння:

    compiler behavior
    control-flow analysis
    advanced inference
    generic inference
    conditional types
    mapped types
    template literal types

Розуміння trade-offs між:

    explicit annotations
    inference
    type complexity
    readability
    maintainability

Вміти проектувати:

    public APIs
    library types
    reusable type contracts
    domain models
    generic abstractions

Розуміти вплив складних типів на:

    developer experience
    compiler performance
    maintainability

---

# Міні-шпаргалка

## Основний синтаксис

    const variable: type = value;

---

## String

    const name: string = "John";

---

## Number

    const age: number = 56;

---

## Boolean

    const active: boolean = true;

---

## BigInt

    const value: bigint = 100n;

---

## Symbol

    const id: symbol = Symbol("id");

---

## Array

    const numbers: number[] = [
        1,
        2,
        3
    ];

---

## Array Generic

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

## Optional Property

    const user: {
        name: string;
        age?: number;
    } = {
        name: "John"
    };

---

## Readonly Property

    const user: {
        readonly id: number;
    } = {
        id: 1
    };

---

## Function Parameter

    function greet(
        name: string
    ) {
        ...
    }

---

## Return Type

    function add(
        a: number,
        b: number
    ): number {
        return a + b;
    }

---

## Void

    function log(
        message: string
    ): void {
        console.log(message);
    }

---

## Never

    function fail(
        message: string
    ): never {
        throw new Error(message);
    }

---

## Optional Parameter

    function greet(
        name?: string
    ) {
        ...
    }

---

## Union

    let id: string | number;

---

## Literal Union

    let status:
        "loading"
        | "success"
        | "error";

---

## Tuple

    const point: [number, number] = [
        10,
        20
    ];

---

## Readonly Array

    const numbers:
        readonly number[] = [
            1,
            2,
            3
        ];

---

## Function Type

    const add: (
        a: number,
        b: number
    ) => number = (a, b) => {
        return a + b;
    };

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
    };

---

## Null Union

    let user: User | null = null;

---

## Undefined Union

    let value: string | undefined;

---

## Promise

    async function getUser(): Promise<User> {
        ...
    }

---

# Головне:

• Type annotation — це явне зазначення типу.

• Основний синтаксис:

    value: type

• Наприклад:

    const age: number = 56;

• Annotation використовується TypeScript для static type checking.

• Annotation не змінює runtime value.

• TypeScript часто може визначити тип автоматично:

    const age = 56;

• Тому не потрібно додавати annotation до кожного простого значення.

• Основні annotations:

    string
    number
    boolean
    bigint
    symbol

• Також важливі:

    null
    undefined

• Масив можна типізувати:

    number[]

або:

    Array<number>

• Object можна типізувати через структуру:

    {
        name: string;
        age: number;
    }

• Function parameters типізуються після імені:

    function greet(name: string) {
        ...
    }

• Return type пишеться після параметрів:

    function add(
        a: number,
        b: number
    ): number {
        ...
    }

• `void` використовується для функцій без корисного return value.

• `never` використовується для функцій, які не завершуються normal return.

• Optional parameter:

    name?: string

• Optional property:

    age?: number

• `readonly` забороняє змінювати властивість через відповідний тип.

• Union дозволяє декілька типів:

    string | number

• Literal types дозволяють обмежити конкретні значення:

    "success" | "error"

• Tuple описує тип кожної позиції:

    [string, number]

• Function type описує сигнатуру функції:

    (a: number, b: number) => number

• `any` послаблює type checking.

• `unknown` є безпечнішим способом описати невідоме значення.

• `null` та `undefined` потрібно враховувати особливо при:

    strictNullChecks

• Annotation відрізняється від assertion:

    value: string
        ↓
    annotation

    value as string
        ↓
    assertion

• Annotation відрізняється від conversion:

    const value: number = 10;
        ↓
    static type

    Number("10");
        ↓
    runtime conversion

• Type annotation не виконує runtime validation.

• Дані з:

    API
    JSON
    database
    localStorage
    user input

можуть не відповідати TypeScript type.

• Для зовнішніх даних може знадобитися runtime validation.

• Найважливіше правило:

    Use annotations where they add
    useful type information or define
    an important contract.

• Якщо TypeScript без проблем визначає тип:

    const name = "John";

annotation часто не потрібна.

• Якщо тип важливий для контракту:

    function add(
        a: number,
        b: number
    ): number {
        return a + b;
    }

явна annotation робить код зрозумілішим.

• Основна модель:

    value
      ↓
    type annotation
      ↓
    static type checking
      ↓
    type safety

• Правильне використання annotations допомагає зробити TypeScript-код передбачуваним, читабельним та безпечним, не перетворюючи код на надмірно типізований.