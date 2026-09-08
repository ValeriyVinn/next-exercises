# Primitive Types

## 1. Що таке Primitive Types

**Primitive Types** — це базові типи даних TypeScript, які описують прості одиничні значення.

До основних primitive types у TypeScript належать:

    string
    number
    boolean
    bigint
    symbol
    null
    undefined

Також у TypeScript існують спеціальні типи:

    any
    unknown
    never
    void

Але вони не є JavaScript primitive values у тому самому сенсі й розглядатимуться окремо.

---

# 2. JavaScript primitives і TypeScript types

TypeScript розширює систему типів JavaScript.

У JavaScript є такі primitive values:

    string
    number
    bigint
    boolean
    undefined
    symbol
    null

TypeScript використовує відповідні типи:

    string
    number
    bigint
    boolean
    undefined
    symbol
    null

Наприклад:

    const name: string = "John";
    const age: number = 30;
    const active: boolean = true;

---

# 3. `string`

`string` описує текстові значення.

    const name: string = "John";

    const city: string = "Vinnytsia";

    const message: string = "Hello TypeScript";

---

## Подвійні лапки

    const name: string = "John";

---

## Одинарні лапки

    const name: string = 'John';

---

## Template literals

    const name: string = "John";
    const age: number = 30;

    const message: string = `My name is ${name}. I am ${age}.`;

---

## Зміна string

    let name: string = "John";

    name = "Anna";

Це правильно.

А це помилка:

    name = 42;

TypeScript:

    Type 'number' is not assignable to type 'string'.

---

# 4. String methods

TypeScript знає, що `string` має стандартні методи.

    const name: string = "Valeriy";

    name.toUpperCase();

    name.toLowerCase();

    name.trim();

    name.includes("a");

    name.startsWith("V");

    name.endsWith("y");

    name.length;

---

## Type safety

Наприклад:

    const name: string = "John";

    name.toUpperCase();

Коректно.

А:

    name.toFixed(2);

помилка, тому що `toFixed()` належить до `number`, а не `string`.

---

# 5. `number`

`number` описує числові значення.

    const age: number = 56;

    const price: number = 199.99;

    const temperature: number = -5;

---

## Цілі числа

    const count: number = 10;

---

## Дробові числа

    const price: number = 10.5;

---

## Від'ємні числа

    const temperature: number = -10;

---

## Науковий запис

    const value: number = 1e6;

---

# 6. Важливо: TypeScript не має `int` та `float`

У TypeScript немає окремих типів:

    int
    float
    double

Усі звичайні JavaScript numbers мають тип:

    number

Наприклад:

    const integer: number = 10;

    const decimal: number = 10.5;

Обидва:

    number

---

# 7. Number methods

    const price: number = 199.99;

    price.toFixed(2);

    price.toString();

    price.toPrecision(4);

---

## Math

    const value: number = 25;

    Math.round(value);

    Math.floor(value);

    Math.ceil(value);

    Math.random();

---

# 8. `NaN`

`NaN` означає:

    Not a Number

Але в JavaScript:

    typeof NaN

дає:

    "number"

Тому в TypeScript:

    const result: number = NaN;

це допустимо.

---

# 9. `Infinity`

`Infinity` також має тип:

    number

Наприклад:

    const value: number = Infinity;

---

# 10. `boolean`

`boolean` має лише два значення:

    true
    false

Наприклад:

    const isActive: boolean = true;

    const isAdmin: boolean = false;

---

## Зміна boolean

    let isOnline: boolean = false;

    isOnline = true;

Коректно.

А:

    isOnline = "true";

помилка.

---

# 11. Boolean expressions

Результатом багатьох операцій є `boolean`.

    const age = 20;

    const isAdult = age >= 18;

TypeScript визначає:

    isAdult → boolean

---

## Comparison

    const result = 10 > 5;

Тип:

    boolean

---

## Equality

    const result = 10 === 10;

Тип:

    boolean

---

## Logical operators

    const result = true && false;

Тип:

    boolean

---

# 12. Boolean methods

У JavaScript primitive boolean не має великої кількості власних методів, але значення автоматично обгортається відповідним wrapper object у певних операціях.

У практичному TypeScript-коді найчастіше працюють саме зі значеннями:

    true

    false

---

# 13. `bigint`

`bigint` використовується для цілих чисел, які можуть бути більшими за безпечний діапазон звичайного `number`.

Наприклад:

    const bigNumber: bigint = 123456789012345678901234567890n;

Зверни увагу на:

    n

в кінці числа.

---

# 14. BigInt operations

    const a: bigint = 100n;
    const b: bigint = 200n;

    const sum = a + b;

Результат:

    bigint

---

## Не можна змішувати number і bigint

Це помилка:

    const a: number = 10;
    const b: bigint = 20n;

    const result = a + b;

`number` і `bigint` — різні типи.

Потрібно працювати з ними окремо.

---

# 15. BigInt comparison

Порівняння можливе:

    const a = 100n;
    const b = 200n;

    console.log(a < b);

Результат:

    boolean

---

# 16. `symbol`

`symbol` створює унікальне primitive value.

    const id: symbol = Symbol("id");

Кожен виклик `Symbol()` створює унікальне значення.

    const a = Symbol("id");
    const b = Symbol("id");

    console.log(a === b);

Результат:

    false

---

# 17. Навіщо потрібен `symbol`

Одна з важливих сфер використання — створення унікальних ключів об'єктів.

    const id = Symbol("id");

    const user = {
        name: "John",
        [id]: 123
    };

---

# 18. `unique symbol`

TypeScript має більш конкретний тип:

    unique symbol

Наприклад:

    const id = Symbol("id");

Для `const` TypeScript може зберігати інформацію про конкретний symbol.

Це advanced topic і зазвичай не потрібен на початковому етапі.

---

# 19. `undefined`

`undefined` — це primitive value, яке означає відсутність визначеного значення.

Наприклад:

    let value: undefined = undefined;

---

## Функція без return

    function logMessage(): undefined {
        console.log("Hello");
        return undefined;
    }

Але для функцій, які нічого не повертають, зазвичай використовується:

    void

а не:

    undefined

---

# 20. `null`

`null` — окреме primitive value, яке часто використовується для позначення:

> "значення навмисно відсутнє"

Наприклад:

    const user: null = null;

Але в реальному коді частіше використовується union:

    let user: User | null = null;

Пізніше:

    user = getUser();

---

# 21. `strictNullChecks`

Дуже важливе налаштування TypeScript:

    "strictNullChecks": true

Коли воно увімкнене:

    string

і:

    null

є різними типами.

Наприклад:

    let name: string = "John";

    name = null;

буде помилкою.

Якщо потрібно дозволити `null`:

    let name: string | null = null;

---

# 22. `undefined` та `null`

При strict mode:

    let a: undefined = undefined;

    let b: null = null;

Це різні типи.

Наприклад:

    let value: string | undefined;

і:

    let value: string | null;

означають різні речі.

---

# 23. Primitive vs Object

Дуже важливо не плутати:

    string

з:

    String

Так само:

    number
    Number

    boolean
    Boolean

У TypeScript потрібно використовувати primitive types:

    string
    number
    boolean

а не wrapper object types:

    String
    Number
    Boolean

---

# 24. Правильно і неправильно

Правильно:

    const name: string = "John";

    const age: number = 30;

    const active: boolean = true;

Не рекомендується:

    const name: String = "John";

    const age: Number = 30;

    const active: Boolean = true;

---

# 25. Чому `String`, `Number`, `Boolean` не рекомендуються

`String`, `Number` та `Boolean` — це wrapper object types, а не звичайні primitive types.

Для стандартної типізації значень використовуй:

    string
    number
    boolean

---

# 26. Primitive Type Inference

TypeScript часто сам визначає primitive type.

    const name = "John";

TypeScript:

    string

---

    const age = 56;

TypeScript:

    number

---

    const active = true;

TypeScript:

    boolean

---

    const bigNumber = 100n;

TypeScript:

    bigint

---

    const id = Symbol("id");

TypeScript:

    symbol

---

# 27. Annotation vs Inference

Annotation:

    const age: number = 56;

Inference:

    const age = 56;

Обидва дають:

    age → number

---

# 28. Primitive Literal Types

Primitive значення можуть бути не тільки загальними типами, а й literal types.

Наприклад:

    let status: "success" = "success";

Тут:

    "success"

є literal type.

---

## Union literals

    let status: "loading" | "success" | "error";

Дозволені лише:

    status = "loading";

    status = "success";

    status = "error";

А:

    status = "unknown";

буде помилкою.

---

# 29. String literals

    let direction: "up" | "down" | "left" | "right";

Це значно безпечніше, ніж:

    let direction: string;

У другому випадку дозволений будь-який текст.

---

# 30. Number literals

TypeScript може мати literal number types:

    let statusCode: 200 = 200;

Або:

    let statusCode: 200 | 404 | 500;

Тепер:

    statusCode = 200;

    statusCode = 404;

    statusCode = 500;

Але:

    statusCode = 201;

помилка.

---

# 31. Boolean literals

Можна використовувати:

    let value: true = true;

Але в більшості випадків достатньо:

    boolean

Boolean literal types частіше зустрічаються у складніших type definitions.

---

# 32. `typeof`

JavaScript operator `typeof` дозволяє перевіряти тип значення під час runtime.

Наприклад:

    const value = "hello";

    typeof value;

Результат:

    "string"

---

## Основні результати `typeof`

    typeof "hello"
    // "string"

    typeof 42
    // "number"

    typeof true
    // "boolean"

    typeof 123n
    // "bigint"

    typeof Symbol()
    // "symbol"

    typeof undefined
    // "undefined"

    typeof null
    // "object"

Останній випадок є відомою особливістю JavaScript.

---

# 33. `typeof null`

У JavaScript:

    typeof null

повертає:

    "object"

Це історична особливість мови.

Але TypeScript розглядає:

    null

як окремий тип.

Тому не потрібно думати:

    null → object

з точки зору TypeScript type system.

---

# 34. Primitive Type Narrowing

TypeScript може уточнювати primitive type після перевірки.

Наприклад:

    function printValue(value: string | number) {
        if (typeof value === "string") {
            console.log(value.toUpperCase());
        }

        if (typeof value === "number") {
            console.log(value.toFixed(2));
        }
    }

У першому `if`:

    value → string

У другому:

    value → number

Це називається **type narrowing**.

---

# 35. `typeof` як type guard

Наприклад:

    function process(value: string | number) {
        if (typeof value === "string") {
            return value.toUpperCase();
        }

        return value.toFixed(2);
    }

TypeScript використовує:

    typeof value === "string"

як type guard.

---

# 36. Truthiness і primitive types

JavaScript має поняття truthy/falsy.

Falsy values включають:

    false
    0
    -0
    0n
    ""
    null
    undefined
    NaN

Наприклад:

    const name = "";

    if (name) {
        console.log("Name exists");
    }

Оскільки `""` є falsy, блок не виконається.

---

# 37. Primitive types і `Boolean()`

Можна перетворити значення в boolean:

    Boolean(1);
    // true

    Boolean(0);
    // false

    Boolean("hello");
    // true

    Boolean("");
    // false

---

# 38. Primitive types і Number conversion

    Number("100");
    // 100

    Number("10.5");
    // 10.5

    Number(true);
    // 1

    Number(false);
    // 0

Потрібно пам'ятати, що JavaScript дозволяє багато implicit conversions.

У TypeScript типи допомагають виявляти помилки, але не скасовують поведінку JavaScript runtime.

---

# 39. Primitive types і String conversion

    String(100);
    // "100"

    String(true);
    // "true"

    String(null);
    // "null"

---

# 40. Explicit conversion

Корисно явно перетворювати типи.

    const input = "42";

    const age = Number(input);

Тепер:

    age → number

---

# 41. Не плутай TypeScript type з runtime conversion

Наприклад:

    const value: number = 42;

Це лише type information.

А:

    const value = Number("42");

це реальне runtime conversion.

Type annotation не перетворює значення.

---

# 42. Type Annotation не змінює значення

Наприклад:

    const value: number = 42;

Annotation:

    : number

не виконує conversion.

Вона лише повідомляє TypeScript:

> це значення повинно бути number.

---

# 43. Primitive types і Type Assertion

Не слід плутати:

    const value: number = 42;

з:

    const value = something as number;

Annotation задає тип змінної.

Assertion говорить TypeScript припустити певний тип.

Наприклад:

    const value = input as number;

не перетворює `input` у number під час runtime.

---

# 44. Primitive types у масивах

Primitive types часто використовуються для типізації масивів.

    const names: string[] = [
        "John",
        "Anna",
        "Mike"
    ];

    const ages: number[] = [
        20,
        30,
        40
    ];

    const flags: boolean[] = [
        true,
        false,
        true
    ];

---

# 45. Primitive types у tuple

Наприклад:

    const user: [string, number] = [
        "John",
        30
    ];

Тут:

    user[0] → string
    user[1] → number

Tuple буде детальніше розглядатися в темі `05-arrays-and-tuples`.

---

# 46. Primitive types у функціях

    function greet(name: string): string {
        return `Hello ${name}`;
    }

---

    function double(value: number): number {
        return value * 2;
    }

---

    function isAdult(age: number): boolean {
        return age >= 18;
    }

---

# 47. Primitive types у параметрах

    function calculate(
        price: number,
        quantity: number
    ): number {
        return price * quantity;
    }

---

# 48. Optional parameters і undefined

Якщо параметр optional:

    function greet(name?: string) {
        console.log(name);
    }

Фактично тип параметра включає:

    string | undefined

Тому потрібно враховувати випадок, коли аргумент не переданий.

---

# 49. Default parameters

Наприклад:

    function greet(name: string = "Guest") {
        return `Hello ${name}`;
    }

Тут `name` має тип:

    string

і отримує default value, якщо аргумент не переданий.

---

# 50. Primitive types у return values

    function getName(): string {
        return "John";
    }

    function getAge(): number {
        return 30;
    }

    function isActive(): boolean {
        return true;
    }

---

# 51. `void`

`void` використовується переважно для функцій, які не повертають корисного значення.

    function logMessage(message: string): void {
        console.log(message);
    }

Це не те саме, що:

    undefined

`void` означає:

> функція не має корисного return value.

---

# 52. `never`

`never` використовується для значень, які не можуть нормально виникнути або функцій, які ніколи не завершуються звичайним способом.

Наприклад:

    function fail(message: string): never {
        throw new Error(message);
    }

Детальніше:

    08-any-unknown-never

---

# 53. Primitive types vs special types

| Тип | Значення |
|---|---|
| `string` | текст |
| `number` | число |
| `boolean` | `true` / `false` |
| `bigint` | великі цілі числа |
| `symbol` | унікальний symbol |
| `null` | навмисна відсутність значення |
| `undefined` | значення не визначене |
| `void` | функція не повертає значення |
| `never` | значення не виникає нормально |
| `unknown` | невідомий тип |
| `any` | вимикає type checking |

---

# 54. Типові помилки

## Помилка 1 — використовувати `String` замість `string`

Погано:

    const name: String = "John";

Краще:

    const name: string = "John";

---

## Помилка 2 — використовувати `Number`

Погано:

    const age: Number = 30;

Краще:

    const age: number = 30;

---

## Помилка 3 — використовувати `Boolean`

Погано:

    const active: Boolean = true;

Краще:

    const active: boolean = true;

---

## Помилка 4 — думати, що number = integer

У TypeScript:

    const value: number = 10.5;

це повністю валідно.

---

## Помилка 5 — змішувати bigint і number

Погано:

    const a = 10;
    const b = 20n;

    const result = a + b;

`number` і `bigint` не можна безпосередньо змішувати в арифметичних операціях.

---

## Помилка 6 — думати, що annotation перетворює значення

Неправильно:

    const value: number = "42";

Annotation не перетворює string у number.

Потрібно:

    const value: number = Number("42");

---

## Помилка 7 — плутати null і undefined

Це різні значення:

    null

і:

    undefined

Особливо важливо при:

    strictNullChecks: true

---

## Помилка 8 — використовувати `any` замість правильного primitive type

Погано:

    const age: any = 56;

Краще:

    const age: number = 56;

---

# 55. Практичний приклад — User

    const name: string = "John";

    const age: number = 30;

    const active: boolean = true;

---

# 56. Практичний приклад — Product

    const title: string = "Book";

    const price: number = 500;

    const available: boolean = true;

---

# 57. Практичний приклад — Calculator

    const a: number = 10;

    const b: number = 5;

    const sum: number = a + b;

    const difference: number = a - b;

    const product: number = a * b;

    const division: number = a / b;

---

# 58. Практичний приклад — Conditions

    const age: number = 25;

    const isAdult: boolean = age >= 18;

    if (isAdult) {
        console.log("Adult");
    }

---

# 59. Практичний приклад — String processing

    const firstName: string = "John";

    const lastName: string = "Smith";

    const fullName: string =
        `${firstName} ${lastName}`;

---

# 60. Практичний приклад — Function

    function calculateAge(
        birthYear: number,
        currentYear: number
    ): number {
        return currentYear - birthYear;
    }

    const age = calculateAge(1970, 2026);

TypeScript:

    birthYear → number
    currentYear → number
    return → number
    age → number

---

# 61. Практичний приклад — Boolean function

    function isAdult(age: number): boolean {
        return age >= 18;
    }

    const result = isAdult(25);

    // result → boolean

---

# 62. Практична вправа — визнач тип

Визнач тип кожної змінної:

    const name = "John";

    const age = 30;

    const active = true;

    const price = 99.99;

    const bigNumber = 12345678901234567890n;

    const id = Symbol("id");

Очікувано:

    name → string

    age → number

    active → boolean

    price → number

    bigNumber → bigint

    id → symbol

---

# 63. Практична вправа — виправ помилки

Знайди помилки:

    let name: string = "John";

    name = 100;

    let age: number = 30;

    age = "30";

    let active: boolean = true;

    active = "true";

Виправлення:

    let name: string = "John";

    name = "Anna";

    let age: number = 30;

    age = 31;

    let active: boolean = true;

    active = false;

---

# 64. Практична вправа — number

Створи:

    const price: number = 100;
    const quantity: number = 3;

Порахуй:

    const total = price * quantity;

Визнач тип:

    total → number

---

# 65. Практична вправа — boolean

Створи:

    const age: number = 20;

Створи:

    const isAdult = age >= 18;

Визнач:

    isAdult → boolean

---

# 66. Практична вправа — string

Створи:

    const firstName: string = "John";
    const lastName: string = "Smith";

Створи:

    const fullName = `${firstName} ${lastName}`;

Визнач:

    fullName → string

---

# 67. Практична вправа — bigint

Створи два bigint:

    const a: bigint = 100n;
    const b: bigint = 200n;

Порахуй:

    const sum = a + b;

Очікувано:

    sum → bigint

Потім спробуй:

    const result = a + 10;

Проаналізуй помилку.

---

# 68. Практична вправа — symbol

Створи:

    const id = Symbol("id");

Створи:

    const user = {
        name: "John",
        [id]: 123
    };

Спробуй отримати:

    user[id]

---

# 69. Практична вправа — null

При:

    let user: string | null = null;

спочатку:

    user = null;

потім:

    user = "John";

Поясни, чому це дозволено.

---

# 70. Практична вправа — narrowing

Створи:

    function print(value: string | number) {
        if (typeof value === "string") {
            console.log(value.toUpperCase());
        } else {
            console.log(value.toFixed(2));
        }
    }

Визнач, який тип `value` бачить TypeScript у кожній гілці.

---

# 71. Interview Questions — Junior

## 1. Які основні primitive types є в TypeScript?

    string
    number
    boolean
    bigint
    symbol
    null
    undefined

---

## 2. Чим `number` відрізняється від `bigint`?

`number` використовується для звичайних чисел.

`bigint` — для великих цілих чисел.

Наприклад:

    const a: number = 100;

    const b: bigint = 100n;

---

## 3. Чи існують у TypeScript `int` і `float`?

Ні.

Обидва належать до:

    number

---

## 4. Чим `string` відрізняється від `String`?

`string` — primitive type.

`String` — wrapper object type.

У звичайному TypeScript-коді потрібно використовувати:

    string

---

## 5. Що таке boolean?

Тип, який має два значення:

    true
    false

---

## 6. Чим відрізняються `null` і `undefined`?

`undefined` зазвичай означає, що значення не було визначене.

`null` часто використовується для явного позначення відсутності значення.

---

# 72. Interview Questions — Middle

## 1. Що таке literal type?

Тип, який представляє конкретне значення.

Наприклад:

    "success"

або:

    200

---

## 2. Що таке narrowing?

Процес уточнення ширшого типу після runtime-перевірки.

Наприклад:

    function print(value: string | number) {
        if (typeof value === "string") {
            value.toUpperCase();
        }
    }

Усередині `if`:

    value → string

---

## 3. Чому `typeof null === "object"`?

Це історична особливість JavaScript.

TypeScript при цьому має окремий тип:

    null

---

## 4. Чи перетворює annotation значення?

Ні.

Наприклад:

    const value: number = 42;

не виконує conversion.

---

## 5. Чим `void` відрізняється від `undefined`?

`void` переважно використовується для опису функції, яка не повертає корисного значення.

Наприклад:

    function log(): void {
        console.log("Hello");
    }

---

# 73. Interview Questions — Senior

## 1. Як primitive types пов'язані з structural type system?

Primitive values мають свої конкретні типи, а складні типи TypeScript переважно порівнюються структурно.

Для primitive values сумісність базується на їхньому конкретному типі.

---

## 2. Як `typeof` допомагає TypeScript?

`typeof` є runtime operator JavaScript, але перевірка:

    typeof value === "string"

може одночасно працювати як type guard для TypeScript.

---

## 3. Чому `any` небезпечний?

`any` фактично вимикає значну частину статичної перевірки.

Наприклад:

    const value: any = "hello";

    value.foo.bar();

TypeScript не буде нормально контролювати подальше використання.

---

## 4. Чому `unknown` безпечніший?

`unknown` змушує спочатку перевірити тип.

    const value: unknown = "hello";

Потрібно:

    if (typeof value === "string") {
        value.toUpperCase();
    }

---

# 74. Learning Path

## 🟢 Core

Потрібно знати:

- `string`;
- `number`;
- `boolean`;
- `bigint`;
- `symbol`;
- `null`;
- `undefined`;
- primitive vs wrapper types;
- `number` не поділяється на `int`/`float`;
- базове використання `typeof`.

Приклади:

    const name: string = "John";

    const age: number = 30;

    const active: boolean = true;

---

## 🔵 Junior

Потрібно вміти:

- використовувати primitive annotations;
- розуміти inference;
- працювати з primitive arrays;
- використовувати primitive types у функціях;
- розуміти `null` та `undefined`;
- працювати з union types;
- розуміти literal types;
- використовувати `typeof` для narrowing;
- не використовувати `String`, `Number`, `Boolean` замість primitive types.

---

## 🟣 Middle

Потрібно розуміти:

- widening;
- literal inference;
- contextual typing;
- type narrowing;
- control flow analysis;
- `unknown`;
- `any`;
- `never`;
- `void`;
- generic constraints;
- primitive types у складних type expressions.

---

## 🔴 Senior

Потрібно глибоко розуміти:

- primitive type compatibility;
- literal types;
- widening та narrowing;
- control flow analysis;
- type guards;
- `unknown` vs `any`;
- `never`;
- conditional types;
- generic inference;
- structural typing;
- design type-safe APIs.

---

# 75. Mini Cheat Sheet

| Type | Приклад | Значення |
|---|---|---|
| `string` | `"hello"` | текст |
| `number` | `42` | число |
| `boolean` | `true` | логічне значення |
| `bigint` | `42n` | велике ціле число |
| `symbol` | `Symbol()` | унікальне значення |
| `null` | `null` | навмисна відсутність |
| `undefined` | `undefined` | невизначене значення |
| `void` | `function(): void` | немає корисного return |
| `never` | `throw new Error()` | нормальний return неможливий |
| `unknown` | `unknown` | невідомий тип |
| `any` | `any` | фактично вимикає type checking |

---

# 76. Основні annotations

    const name: string = "John";

    const age: number = 30;

    const active: boolean = true;

    const bigNumber: bigint = 100n;

    const id: symbol = Symbol("id");

    const empty: null = null;

    const missing: undefined = undefined;

---

# 77. Основні primitive arrays

    const names: string[] = [
        "John",
        "Anna"
    ];

    const numbers: number[] = [
        10,
        20,
        30
    ];

    const flags: boolean[] = [
        true,
        false
    ];

---

# 78. Основні primitive functions

    function greet(name: string): string {
        return `Hello ${name}`;
    }

    function double(value: number): number {
        return value * 2;
    }

    function isAdult(age: number): boolean {
        return age >= 18;
    }

    function log(message: string): void {
        console.log(message);
    }

---

# 79. Основні type checks

    typeof value === "string"

    typeof value === "number"

    typeof value === "boolean"

    typeof value === "bigint"

    typeof value === "symbol"

    typeof value === "undefined"

    value === null

---

# 80. Що потрібно запам'ятати

### 1. `string`

Для тексту:

    const name: string = "John";

### 2. `number`

Для чисел:

    const age: number = 30;

### 3. `boolean`

Для:

    true
    false

### 4. `bigint`

Для великих цілих чисел:

    const value: bigint = 100n;

### 5. `symbol`

Для унікальних primitive values:

    const id: symbol = Symbol("id");

### 6. `null`

Для явної відсутності значення:

    let user: User | null = null;

### 7. `undefined`

Для невизначеного значення:

    let value: string | undefined;

### 8. Не використовуй wrapper types

Пиши:

    string
    number
    boolean

а не:

    String
    Number
    Boolean

### 9. Type annotation не робить conversion

    const value: number = 42;

не перетворює значення.

Для conversion:

    const value = Number("42");

### 10. Primitive types — основа TypeScript

На них будуються:

    arrays
    tuples
    objects
    unions
    functions
    interfaces
    generics
    utility types

---

# 81. Головне

**Primitive Types — це фундамент типізації TypeScript.**

Потрібно впевнено знати:

    string
    number
    boolean
    bigint
    symbol
    null
    undefined

І розуміти різницю між:

    primitive type
          ↓
    type annotation
          ↓
    type inference
          ↓
    type narrowing

Найважливіша практична база:

    const name: string = "John";

    const age: number = 30;

    const active: boolean = true;

    const bigNumber: bigint = 100n;

    const id: symbol = Symbol("id");

А також:

    let user: User | null = null;

    let value: string | undefined;

Для звичайного TypeScript-коду використовуй:

    string
    number
    boolean

а не:

    String
    Number
    Boolean

І пам'ятай:

> **TypeScript primitive types описують типи значень на рівні статичної type system, але самі annotations не виконують runtime conversion і не перевіряють зовнішні дані.**

Формула для запам'ятовування:

    string   → текст
    number   → число
    boolean  → true / false
    bigint   → великі цілі числа
    symbol   → унікальне значення
    null     → свідомо немає значення
    undefined → значення не визначене

Це базовий словник TypeScript, на якому будуються всі наступні рівні type system.