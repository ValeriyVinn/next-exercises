# any, unknown, never

> **Шлях:** `01-typescript-foundations/08-any-unknown-never`  
> **Рівень:** Core → Junior → Middle  
> **Тема:** `any`, `unknown`, `never` та безпечна робота з невідомими значеннями

---

## 1. Вступ

TypeScript має спеціальні типи для ситуацій, коли значення:

- може бути будь-яким;
- має невідомий тип;
- ніколи не виникає;
- ніколи не повертається;
- використовується для перевірки повноти логіки.

Три особливо важливі типи:

    any
    unknown
    never

На перший погляд вони можуть здаватися схожими, але вони мають **дуже різну семантику**.

Головна ідея:

    any
      ↓
    "Я дозволяю TypeScript не перевіряти цей тип"

    unknown
      ↓
    "Я не знаю, що це за тип, тому спочатку перевір"

    never
      ↓
    "Такого значення не може існувати"

---

# 2. Що потрібно знати

Після цієї теми потрібно розуміти:

- що таке `any`;
- чому `any` небезпечний;
- implicit `any`;
- explicit `any`;
- `unknown`;
- чому `unknown` безпечніший за `any`;
- type narrowing для `unknown`;
- `typeof` з `unknown`;
- `instanceof` з `unknown`;
- `in` з `unknown`;
- user-defined type guards;
- `never`;
- функції, які повертають `never`;
- infinite loops та `never`;
- throwing functions та `never`;
- exhaustive checking;
- discriminated unions та `never`;
- різницю між `void` і `never`;
- різницю між `any`, `unknown`, `void` та `never`;
- коли використовувати кожен тип.

---

# 3. `any`

`any` означає:

> значення може мати будь-який тип, і TypeScript практично перестає його перевіряти.

Наприклад:

    let value: any = 10;

Можна:

    value = "hello";
    value = true;
    value = [];
    value = {};
    value = null;

TypeScript це дозволить.

---

# 4. `any` вимикає Type Safety

Наприклад:

    let value: any = "hello";

Можна написати:

    value.toUpperCase();

А потім:

    value = 123;

І TypeScript все одно дозволить:

    value.toUpperCase();

Але під час виконання виникне помилка.

Тобто `any` може приховувати реальні помилки.

---

# 5. Чому `any` небезпечний

Розглянемо:

    const user: any = {
        name: "John"
    };

TypeScript дозволить:

    user.name.toUpperCase();

Але також:

    user.age.toFixed();

і навіть:

    user.someUnknownMethod();

TypeScript не зможе нормально захистити код.

---

# 6. `any` — escape hatch

`any` часто називають:

> **escape hatch**

Тобто це спосіб сказати TypeScript:

> "Не перевіряй це значення, я сам знаю, що роблю."

Наприклад:

    const data: any = getLegacyData();

Тут відповідальність за безпеку переходить до програміста.

---

# 7. Explicit `any`

Явно:

    let value: any;

Це називається:

> explicit `any`

Наприклад:

    function process(data: any) {
        console.log(data);
    }

Функція приймає абсолютно будь-яке значення.

---

# 8. Implicit `any`

Іноді `any` з'являється неявно.

Наприклад, у погано налаштованому TypeScript-проєкті:

    function greet(name) {
        return `Hello, ${name}`;
    }

Параметр `name` може отримати `any`.

Краще використовувати:

    function greet(name: string): string {
        return `Hello, ${name}`;
    }

---

# 9. `noImplicitAny`

У TypeScript існує налаштування:

    "noImplicitAny": true

Воно змушує TypeScript повідомляти про випадки, де параметр або інше значення неявно отримує `any`.

Для strict TypeScript-проєктів це дуже корисне правило.

---

# 10. `strict`

У реальному проєкті часто використовують:

    {
        "compilerOptions": {
            "strict": true
        }
    }

`strict` вмикає набір суворих перевірок.

Серед іншого це допомагає уникати небезпечного implicit `any`.

---

# 11. `any` поширюється

Одна з небезпек `any` — він може "заражати" інші частини коду.

Наприклад:

    const value: any = getValue();

    const result = value.someProperty;

`result` також може стати `any`.

Далі:

    result.foo.bar.baz();

TypeScript може не повідомити про проблему.

Тому `any` може поступово знижувати type safety у всьому ланцюжку.

---

# 12. `any` та масиви

Можна:

    const values: any[] = [
        1,
        "hello",
        true,
        {},
        []
    ];

Але тепер TypeScript не може ефективно контролювати елементи.

Наприклад:

    values[0].toUpperCase();

може призвести до runtime error.

---

# 13. `any` та функції

    function process(data: any): any {
        return data;
    }

Тут:

- параметр — `any`;
- результат — `any`.

TypeScript майже не контролює функцію.

Краще, якщо тип невідомий, використовувати `unknown`.

---

# 14. `unknown`

`unknown` означає:

> значення існує, але ми поки не знаємо, який у нього тип.

Наприклад:

    let value: unknown;

    value = 10;
    value = "hello";
    value = true;
    value = {};
    value = [];

Усі ці значення дозволені.

Але є принципова різниця з `any`.

---

# 15. Головна властивість `unknown`

TypeScript **не дозволяє використовувати `unknown` без перевірки**.

Наприклад:

    let value: unknown = "hello";

Не можна просто:

    value.toUpperCase();

TypeScript повідомить про проблему.

Чому?

Тому що TypeScript не знає, чи дійсно `value` є рядком.

---

# 16. `unknown` змушує перевіряти тип

    let value: unknown = "hello";

    if (typeof value === "string") {
        console.log(value.toUpperCase());
    }

Після перевірки TypeScript знає:

    value: string

Тому операція безпечна.

---

# 17. `unknown` — безпечний аналог `any`

Порівняй:

### any

    let value: any = "hello";

    value.toUpperCase();

TypeScript дозволяє.

### unknown

    let value: unknown = "hello";

    value.toUpperCase();

TypeScript забороняє.

Потрібно:

    if (typeof value === "string") {
        value.toUpperCase();
    }

---

# 18. `unknown` та присвоєння

`unknown` може приймати значення будь-якого типу:

    let value: unknown;

    value = 10;
    value = "hello";
    value = true;

Але `unknown` не можна без перевірки присвоїти конкретному типу.

Наприклад:

    let value: unknown = "hello";

    let text: string = value;

Це помилка.

Спочатку потрібно перевірити:

    if (typeof value === "string") {
        const text: string = value;
    }

---

# 19. `unknown` та `any`

Порівняй:

    let a: any = "hello";
    let b: unknown = "hello";

Для `any`:

    a.toUpperCase();

дозволено.

Для `unknown`:

    b.toUpperCase();

заборонено.

Це і є головна різниця.

---

# 20. `unknown` та `typeof`

`typeof` — один із найпоширеніших способів звузити `unknown`.

    function printValue(value: unknown): void {
        if (typeof value === "string") {
            console.log(value.toUpperCase());
        }

        if (typeof value === "number") {
            console.log(value.toFixed(2));
        }

        if (typeof value === "boolean") {
            console.log(value ? "yes" : "no");
        }
    }

---

# 21. `typeof` перевірки

Для primitive values використовують:

    typeof value === "string"

    typeof value === "number"

    typeof value === "boolean"

    typeof value === "bigint"

    typeof value === "symbol"

    typeof value === "function"

    typeof value === "undefined"

Але для `null` є особливість:

    typeof null

повертає:

    "object"

Тому `null` потрібно перевіряти окремо.

---

# 22. `unknown` та null

Наприклад:

    function process(value: unknown): void {
        if (value !== null && typeof value === "object") {
            console.log(value);
        }
    }

Це безпечніше, ніж просто:

    typeof value === "object"

---

# 23. `unknown` та `Array.isArray`

Можна перевірити масив:

    function process(value: unknown): void {
        if (Array.isArray(value)) {
            console.log(value.length);
        }
    }

Після перевірки TypeScript знає, що значення є масивом.

---

# 24. `unknown` та `instanceof`

Для класів:

    class User {
        constructor(
            public name: string
        ) {}
    }

    function process(value: unknown): void {
        if (value instanceof User) {
            console.log(value.name);
        }
    }

Після `instanceof` TypeScript знає, що:

    value: User

---

# 25. `unknown` та `in`

Можна перевіряти наявність властивості.

    function process(value: unknown): void {
        if (
            typeof value === "object" &&
            value !== null &&
            "name" in value
        ) {
            console.log(value.name);
        }
    }

Оператор:

    in

допомагає звужувати типи об'єктів.

---

# 26. `unknown` та Object

Наприклад:

    function printObject(value: unknown): void {
        if (
            typeof value === "object" &&
            value !== null
        ) {
            console.log(value);
        }
    }

Це дозволяє безпечно працювати з невідомими об'єктами.

---

# 27. `unknown` та JSON

Це дуже важливий практичний випадок.

JSON приходить із зовнішнього джерела:

- API;
- файл;
- localStorage;
- database;
- network;
- user input.

Наприклад:

    const data: unknown = JSON.parse(json);

Після цього не варто автоматично припускати структуру.

Потрібно перевірити дані.

---

# 28. Чому `JSON.parse` часто потребує уваги

Наприклад:

    const data = JSON.parse(json);

Якщо отримані дані використовуються без перевірки, можна припустити неправильну структуру.

Безпечніший підхід:

    const data: unknown = JSON.parse(json);

А потім:

    if (
        typeof data === "object" &&
        data !== null
    ) {
        // перевірка структури
    }

У реальних проєктах для цього часто використовують runtime validation libraries.

---

# 29. `unknown` та API

Наприклад:

    async function getData(): Promise<unknown> {
        const response = await fetch("/api/data");

        return response.json();
    }

Тепер код, який отримує дані, повинен перевірити їхню структуру.

Це значно безпечніше, ніж:

    Promise<any>

---

# 30. User-defined Type Guard

Можна створити власну функцію перевірки типу.

    type User = {
        id: number;
        name: string;
    };

    function isUser(value: unknown): value is User {
        if (
            typeof value !== "object" ||
            value === null
        ) {
            return false;
        }

        if (!("id" in value)) {
            return false;
        }

        if (!("name" in value)) {
            return false;
        }

        return (
            typeof value.id === "number" &&
            typeof value.name === "string"
        );
    }

---

# 31. Використання Type Guard

    function process(value: unknown): void {
        if (isUser(value)) {
            console.log(value.name);
            console.log(value.id);
        }
    }

Після:

    isUser(value)

TypeScript знає:

    value: User

---

# 32. Синтаксис `value is Type`

Основна форма:

    function isUser(value: unknown): value is User {
        // ...
    }

Частина:

    value is User

називається:

> type predicate

Вона повідомляє TypeScript:

> якщо функція повернула `true`, значення є `User`.

---

# 33. `unknown` у catch

У TypeScript помилки в `catch` можуть розглядатися як `unknown`.

Наприклад:

    try {
        throw new Error("Something went wrong");
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }

Це безпечніше, ніж автоматично припускати:

    error.message

---

# 34. Чому помилка може бути не Error

JavaScript дозволяє:

    throw "Something went wrong";

або:

    throw 123;

або:

    throw {
        message: "Error"
    };

Тому не можна припускати, що будь-який thrown value — це `Error`.

Безпечніше:

    if (error instanceof Error) {
        console.log(error.message);
    }

---

# 35. `unknown` та function parameters

Якщо функція повинна приймати будь-яке значення, але всередині буде перевіряти його:

    function print(value: unknown): void {
        if (typeof value === "string") {
            console.log(value);
        }
    }

Це часто краще, ніж:

    function print(value: any): void {
        console.log(value);
    }

---

# 36. `unknown` та generics

`unknown` часто використовується як безпечний default для generic API.

Наприклад:

    type ApiResponse<T = unknown> = {
        data: T;
        success: boolean;
    };

Якщо тип даних невідомий:

    const response: ApiResponse = {
        data: "something",
        success: true
    };

Тоді:

    response.data

має тип:

    unknown

і його потрібно перевірити перед використанням.

---

# 37. `never`

`never` означає:

> значення, яке **ніколи не виникає**.

Це дуже важлива концепція.

Наприклад, функція, яка завжди кидає помилку:

    function fail(message: string): never {
        throw new Error(message);
    }

Функція ніколи не повертає значення.

---

# 38. `never` та throw

    function throwError(message: string): never {
        throw new Error(message);
    }

Після виклику:

    throwError("Something went wrong");

нормального результату немає.

Тому:

    never

є правильним типом результату.

---

# 39. `never` та infinite loop

Функція, яка ніколи не завершується:

    function infiniteLoop(): never {
        while (true) {
            console.log("Running...");
        }
    }

Вона не повертає:

    undefined
    null
    void

Вона взагалі не доходить до кінця.

Тому:

    never

---

# 40. `void` vs `never`

Це дуже важлива різниця.

### void

Функція завершується, але не повертає корисного значення.

    function logMessage(message: string): void {
        console.log(message);
    }

Функція завершується.

### never

Функція ніколи нормально не завершується.

    function fail(message: string): never {
        throw new Error(message);
    }

Отже:

    void
      ↓
    функція завершилася без значення

    never
      ↓
    функція не повертається

---

# 41. `never` як неможливе значення

Наприклад:

    type Impossible = never;

Змінну типу `never` практично неможливо створити.

    let value: never;

Не можна:

    value = 10;

Не можна:

    value = "hello";

Не можна:

    value = true;

`never` означає:

> жодного можливого значення.

---

# 42. `never` та Union

Цікава властивість:

    string | never

спрощується до:

    string

А:

    number | never

стає:

    number

Тому `never` часто використовується всередині складніших type transformations.

---

# 43. `never` та Intersection

Ще одна важлива властивість:

    string & number

фактично не має можливого значення.

Тому результат часто розглядається як:

    never

Тобто:

    A & B

може стати `never`, якщо типи несумісні.

---

# 44. `never` та Exhaustiveness Checking

Одна з найважливіших практичних можливостей `never` — перевірка повноти `switch`.

Наприклад:

    type Status =
        | "pending"
        | "success"
        | "error";

    function getMessage(status: Status): string {
        switch (status) {
            case "pending":
                return "Очікування";

            case "success":
                return "Успішно";

            case "error":
                return "Помилка";

            default:
                return assertNever(status);
        }
    }

    function assertNever(value: never): never {
        throw new Error(`Unexpected value: ${value}`);
    }

Якщо додати новий статус:

    | "cancelled"

TypeScript повідомить, що `switch` потрібно оновити.

---

# 45. Чому `assertNever` працює

Після обробки всіх можливих значень:

    pending
    success
    error

не повинно залишитися жодного іншого варіанту.

Тому у `default`:

    status

повинен мати тип:

    never

Якщо він не `never`, значить ми щось пропустили.

---

# 46. Exhaustiveness з Discriminated Union

Наприклад:

    type Shape =
        | {
            kind: "circle";
            radius: number;
        }
        | {
            kind: "square";
            size: number;
        }
        | {
            kind: "rectangle";
            width: number;
            height: number;
        };

Функція:

    function getArea(shape: Shape): number {
        switch (shape.kind) {
            case "circle":
                return Math.PI * shape.radius ** 2;

            case "square":
                return shape.size ** 2;

            case "rectangle":
                return shape.width * shape.height;

            default:
                return assertNever(shape);
        }
    }

---

# 47. Якщо додати новий варіант

Наприклад:

    type Shape =
        | {
            kind: "circle";
            radius: number;
        }
        | {
            kind: "square";
            size: number;
        }
        | {
            kind: "rectangle";
            width: number;
            height: number;
        }
        | {
            kind: "triangle";
            base: number;
            height: number;
        };

Якщо не додати:

    case "triangle":

TypeScript повідомить про проблему в:

    assertNever(shape);

Це і є:

> exhaustive checking.

---

# 48. `never` як захист від майбутніх змін

Це дуже корисно у великих проєктах.

Наприклад:

    type OrderStatus =
        | "pending"
        | "paid"
        | "shipped"
        | "delivered";

Коли через кілька місяців додадуть:

    | "cancelled"

TypeScript допоможе знайти всі місця, які потрібно оновити.

---

# 49. `any`, `unknown`, `never`

Порівняй три типи.

### any

    let value: any;

Значення:

    anything

Перевірка:

    майже відсутня

---

### unknown

    let value: unknown;

Значення:

    anything

Перевірка:

    потрібна перед використанням

---

### never

    let value: never;

Значення:

    жодного

Перевірка:

    використовується для неможливих станів

---

# 50. Найважливіша таблиця

| Тип | Що означає | Можна присвоїти будь-яке значення? | Потрібна перевірка? |
|---|---|---:|---:|
| `any` | будь-що, без контролю | Так | Ні |
| `unknown` | будь-що, але невідоме | Так | Так |
| `never` | неможливе значення | Ні | — |
| `void` | немає корисного return value | — | — |

---

# 51. `any` vs `unknown`

Це одна з найважливіших пар.

### any

    function process(value: any) {
        value.foo.bar.baz();
    }

TypeScript дозволяє.

### unknown

    function process(value: unknown) {
        value.foo.bar.baz();
    }

TypeScript забороняє.

Потрібна перевірка.

Тому:

> якщо ти не знаєш тип, але хочеш зберегти type safety — використовуй `unknown`.

---

# 52. Коли використовувати `any`

`any` варто використовувати обмежено.

Можливі ситуації:

- legacy JavaScript;
- поступова міграція JavaScript → TypeScript;
- стороння бібліотека без типів;
- складна інтеграція, яку тимчасово неможливо типізувати;
- дуже специфічний escape hatch.

Але бажано ізолювати `any`.

Наприклад:

    function legacyAdapter(data: any): User {
        // адаптація старого API
    }

Далі:

    const user: User = legacyAdapter(data);

Тобто `any` залишається на межі системи.

---

# 53. Коли використовувати `unknown`

`unknown` добре підходить для:

- API data;
- JSON;
- user input;
- external libraries;
- `catch`;
- dynamic data;
- `localStorage`;
- parsing;
- network data;
- runtime validation.

Основний принцип:

    external data
          ↓
       unknown
          ↓
      validation
          ↓
      known type

---

# 54. Коли використовувати `never`

`never` використовують для:

- функцій, які завжди кидають помилку;
- нескінченних циклів;
- неможливих станів;
- exhaustive checking;
- discriminated unions;
- advanced type transformations.

---

# 55. `any` vs `unknown` vs `never` — ментальна модель

Запам'ятай:

    any
     ↓
    "Не перевіряй"

    unknown
     ↓
    "Перевір перед використанням"

    never
     ↓
    "Цього не може бути"

Це одна з найкорисніших ментальних моделей TypeScript.

---

# 56. Практика №1 — `any`

Створи:

    let value: any;

Присвой:

    number
    string
    boolean
    object
    array

Перевір, які операції TypeScript дозволяє виконувати без перевірки.

Потім поясни, чому це небезпечно.

---

# 57. Практика №2 — `unknown`

Створи:

    let value: unknown;

Присвой:

    100
    "hello"
    true

Спробуй виконати:

    value.toUpperCase();

Потім зроби безпечну перевірку:

    if (typeof value === "string") {
        console.log(value.toUpperCase());
    }

---

# 58. Практика №3 — Unknown Values

Напиши функцію:

    function printValue(value: unknown): void {
        // ...
    }

Вона повинна:

- для string виводити uppercase;
- для number виводити число з двома знаками;
- для boolean виводити `"true"` або `"false"`;
- для інших типів виводити `"Unknown value"`.

---

# 59. Практика №4 — Unknown Object

Напиши:

    function printName(value: unknown): void {
        // ...
    }

Функція повинна виводити `name`, якщо він:

- існує;
- є string.

Наприклад:

    printName({
        name: "John"
    });

повинно працювати.

А:

    printName({
        name: 123
    });

не повинно використовувати `name` як string.

---

# 60. Практика №5 — Type Guard

Створи:

    type User = {
        id: number;
        name: string;
    };

Напиши:

    function isUser(value: unknown): value is User {
        // ...
    }

Перевір:

    {
        id: 1,
        name: "John"
    }

і:

    {
        id: "1",
        name: "John"
    }

---

# 61. Практика №6 — JSON

Створи JSON:

    const json = `
        {
            "id": 1,
            "name": "John"
        }
    `;

Отримай:

    const data: unknown = JSON.parse(json);

Потім безпечно перевір його структуру.

---

# 62. Практика №7 — `never`

Напиши:

    function fail(message: string): never {
        // ...
    }

Функція повинна завжди кидати:

    Error

---

# 63. Практика №8 — Infinite Loop

Створи:

    function runForever(): never {
        while (true) {
            // ...
        }
    }

Поясни, чому тип:

    never

а не:

    void

---

# 64. Практика №9 — Exhaustive Checking

Створи:

    type Status =
        | "pending"
        | "success"
        | "error";

Напиши:

    function getMessage(status: Status): string {
        // switch
    }

Додай:

    assertNever()

Потім додай новий статус:

    "cancelled"

і перевір, де TypeScript покаже помилку.

---

# 65. Практика №10 — Shape

Створи:

    type Shape =
        | {
            kind: "circle";
            radius: number;
        }
        | {
            kind: "square";
            size: number;
        };

Напиши функцію:

    function getArea(shape: Shape): number {
        // switch
    }

Використай `never` для exhaustive checking.

---

# 66. Міні-проєкт — Safe API Response

Створи:

    type User = {
        id: number;
        name: string;
        email: string;
    };

Створи:

    function isUser(value: unknown): value is User {
        // validation
    }

Потім:

    async function getUser(): Promise<User> {
        const response = await fetch("/api/user");

        const data: unknown = await response.json();

        if (!isUser(data)) {
            throw new Error("Invalid user data");
        }

        return data;
    }

Архітектура:

    API
      ↓
    unknown
      ↓
    validation
      ↓
    User
      ↓
    application

Це дуже корисний патерн для реальних full-stack застосунків.

---

# 67. Міні-проєкт — Safe JSON Parser

Створи функцію:

    function parseJson(json: string): unknown {
        return JSON.parse(json);
    }

Потім:

    const data = parseJson(json);

Дані повинні залишатися:

    unknown

до моменту перевірки.

Створи окремі type guards для:

    User
    Product
    Order

---

# 68. Міні-проєкт — State Machine

Створи:

    type State =
        | {
            status: "idle";
        }
        | {
            status: "loading";
        }
        | {
            status: "success";
            data: string;
        }
        | {
            status: "error";
            error: string;
        };

Напиши:

    function renderState(state: State): string {
        // switch
    }

Використай:

    assertNever(state);

Це підготує тебе до складнішої типізації React state.

---

# 69. Типові помилки

## 69.1. Використовувати `any` замість `unknown`

Погано:

    function process(data: any) {
        data.foo.bar();
    }

Краще:

    function process(data: unknown) {
        // validation
    }

---

## 69.2. Вважати `unknown` таким самим як `any`

Неправильно:

> `unknown` — це просто інша назва `any`.

Насправді:

    any
      ↓
    дозволяє використання без перевірки

    unknown
      ↓
    вимагає перевірки

---

## 69.3. Повертати `any` з API

Погано:

    async function getData(): Promise<any> {
        // ...
    }

Безпечніше:

    async function getData(): Promise<unknown> {
        // ...
    }

А потім:

    validation
        ↓
    known type

---

## 69.4. Використовувати `void` замість `never`

Погано:

    function fail(): void {
        throw new Error("Error");
    }

Технічно функція може бути описана інакше залежно від контексту, але якщо семантика функції саме:

> вона ніколи не повертається нормально

то точніший тип:

    function fail(): never {
        throw new Error("Error");
    }

---

## 69.5. Не використовувати exhaustive checking

Погано:

    switch (status) {
        case "pending":
            return "...";

        case "success":
            return "...";
    }

Якщо існує:

    "error"

логіка може бути неповною.

Краще використовувати `never`.

---

# 70. `any` у TypeScript Migration

При переході великого JavaScript-проєкту на TypeScript може виникнути багато `any`.

Наприклад:

    function process(data: any) {
        // old code
    }

Не обов'язково відразу переписувати весь проєкт.

Можна поступово:

    any
      ↓
    unknown
      ↓
    validation
      ↓
    specific type

Це дозволяє мігрувати код поступово.

---

# 71. Правило для реальних проєктів

Хороше практичне правило:

> **Не використовуй `any`, якщо можеш використати конкретний тип.**

Якщо конкретний тип невідомий:

> **Використовуй `unknown`.**

Якщо значення неможливе:

> **Використовуй `never`.**

---

# 72. Порівняння з primitive types

Раніше:

    string
    number
    boolean
    null
    undefined

Тепер:

    any
    unknown
    never

Можна побудувати таку модель:

    конкретний тип
          ↓
    string / number / boolean / object
          ↓
    відомий тип

    unknown
          ↓
    тип ще невідомий

    any
          ↓
    тип навмисно не контролюється

    never
          ↓
    значення неможливе

---

# 73. `unknown` та Type Narrowing

Типовий процес:

    unknown
       ↓
    typeof
       ↓
    string

або:

    unknown
       ↓
    Array.isArray()
       ↓
    array

або:

    unknown
       ↓
    instanceof
       ↓
    class instance

або:

    unknown
       ↓
    custom type guard
       ↓
    User

Це один із фундаментальних механізмів TypeScript.

---

# 74. `unknown` → конкретний тип

Наприклад:

    function process(value: unknown) {
        if (typeof value === "string") {
            // value → string
        }

        if (typeof value === "number") {
            // value → number
        }
    }

Ментальна модель:

    unknown
       ↓
    check
       ↓
    narrow
       ↓
    safe usage

---

# 75. `never` → exhaustive logic

Ментальна модель:

    Union
      ↓
    switch
      ↓
    всі cases оброблені
      ↓
    залишок?
      ↓
    never

Якщо залишок не `never`:

> ти щось пропустив.

---

# 76. Interview Questions

### Junior

1. Що таке `any`?
2. Чому `any` небезпечний?
3. Що таке `unknown`?
4. Чим `unknown` відрізняється від `any`?
5. Чому `unknown` потребує type narrowing?
6. Як перевірити `unknown` через `typeof`?
7. Що таке `never`?
8. Коли функція повертає `never`?
9. Чим `void` відрізняється від `never`?
10. Що таке exhaustive checking?

### Middle

11. Що таке implicit `any`?
12. Що робить `noImplicitAny`?
13. Що робить `strict`?
14. Як `any` може поширюватися по коду?
15. Як використовувати `unknown` для API data?
16. Як створити user-defined type guard?
17. Що означає `value is User`?
18. Як використовувати `never` у `switch`?
19. Що таке discriminated union?
20. Чому `never` корисний для перевірки повноти union?

### Senior

21. Як поступово прибрати `any` з legacy-проєкту?
22. Коли `any` виправданий?
23. Як ізолювати `any` на межі системи?
24. Як побудувати runtime validation для `unknown`?
25. Як використовувати `unknown` для external data?
26. Як `never` допомагає підтримувати domain logic?
27. Як exhaustive checking захищає код від майбутніх змін?
28. Як поєднати `unknown` з generics?
29. Як проектувати type-safe API boundaries?
30. Як побудувати архітектуру `unknown → validation → domain type`?

---

# 77. Learning Path

## 🟢 Core

Потрібно знати:

- `any`;
- `unknown`;
- `never`;
- різницю між ними;
- `void` vs `never`;
- базовий type narrowing;
- `typeof`;
- `instanceof`.

Головне:

    any     → без контролю
    unknown → перевір перед використанням
    never   → неможливе значення

---

## 🟡 Junior

Додатково:

- implicit `any`;
- `noImplicitAny`;
- `strict`;
- user-defined type guards;
- `value is Type`;
- `unknown` + API;
- `unknown` + JSON;
- `unknown` + `catch`;
- exhaustive checking;
- `assertNever`.

---

## 🟠 Middle

Далі:

- discriminated unions;
- advanced narrowing;
- exhaustive state handling;
- runtime validation;
- API boundaries;
- generic constraints;
- `keyof`;
- conditional types;
- mapped types;
- `never` у type transformations.

---

## 🔴 Senior

На senior-рівні:

- elimination of `any`;
- legacy migration;
- type-safe external boundaries;
- runtime schema validation;
- domain modeling;
- exhaustive state machines;
- impossible states;
- advanced conditional types;
- `never` як інструмент type-level programming;
- архітектура type safety.

---

# 78. Mini Cheat Sheet

## `any`

    let value: any;

Може містити будь-що.

TypeScript майже не перевіряє використання.

---

## `unknown`

    let value: unknown;

Може містити будь-що, але потрібно перевірити перед використанням.

---

## `never`

    let value: never;

Не може мати жодного значення.

---

## `void`

    function log(): void {
        console.log("Hello");
    }

Функція завершується без корисного return value.

---

## `any` function

    function process(value: any): any {
        return value;
    }

---

## `unknown` function

    function process(value: unknown): void {
        if (typeof value === "string") {
            console.log(value.toUpperCase());
        }
    }

---

## `never` function

    function fail(message: string): never {
        throw new Error(message);
    }

---

## Type Guard

    function isUser(value: unknown): value is User {
        // validation
    }

---

## typeof

    if (typeof value === "string") {
        // string
    }

---

## instanceof

    if (value instanceof User) {
        // User
    }

---

## Array.isArray

    if (Array.isArray(value)) {
        // array
    }

---

## in

    if (
        typeof value === "object" &&
        value !== null &&
        "name" in value
    ) {
        // object with name
    }

---

## Exhaustive Check

    function assertNever(value: never): never {
        throw new Error(
            `Unexpected value: ${value}`
        );
    }

---

## Safe External Data

    external data
        ↓
    unknown
        ↓
    validation
        ↓
    domain type

---

# 79. `any` → `unknown` → конкретний тип

Це дуже важливий практичний патерн.

### Небезпечний варіант

    const data: any = getExternalData();

    console.log(data.user.name);

### Кращий варіант

    const data: unknown = getExternalData();

### Потім validation

    if (isUser(data)) {
        console.log(data.name);
    }

Тобто:

    external
       ↓
    unknown
       ↓
    validation
       ↓
    User

---

# 80. Ментальна модель всієї теми

    ┌─────────────┐
    │    any      │
    │  "будь-що"  │
    └──────┬──────┘
           │
           │ немає контролю
           ↓
      type unsafe


    ┌─────────────┐
    │  unknown    │
    │  "не знаю"  │
    └──────┬──────┘
           │
           │ перевірка
           ↓
      type narrowing
           │
           ↓
     конкретний тип


    ┌─────────────┐
    │    never    │
    │ "неможливо" │
    └──────┬──────┘
           │
           ↓
    impossible state
           │
           ↓
    exhaustive check

---

# 81. JavaScript → TypeScript

### JavaScript

    function process(data) {
        return data.name;
    }

Проблема:

    data

може бути будь-чим.

### Небезпечний TypeScript

    function process(data: any) {
        return data.name;
    }

### Безпечніший TypeScript

    function process(data: unknown) {
        if (
            typeof data === "object" &&
            data !== null &&
            "name" in data &&
            typeof data.name === "string"
        ) {
            return data.name;
        }

    }

Тепер TypeScript змушує нас подумати про реальну структуру даних.

---

# 82. Практична модель для Full Stack

У full-stack застосунку дуже корисно мислити так:

    User Input
         ↓
    unknown
         ↓
    validation
         ↓
    DTO / Domain Type
         ↓
    business logic
         ↓
    database
         ↓
    API response
         ↓
    unknown
         ↓
    validation
         ↓
    frontend type

Це допомагає розділити:

> **дані, яким ми довіряємо**

і:

> **дані, яким ми ще не повинні довіряти.**

---

# 83. Що запам'ятати найперше

### 1. `any` — вимикає type safety

    let value: any;

Використовуй обережно.

### 2. `unknown` — безпечний тип для невідомих даних

    let value: unknown;

Спочатку перевір.

### 3. `never` — неможливе значення

    function fail(): never {
        throw new Error();
    }

### 4. `unknown` потрібно narrow

    if (typeof value === "string") {
        // value → string
    }

### 5. `never` корисний для exhaustive checking

    default:
        return assertNever(value);

### 6. `void` ≠ `never`

    void
      ↓
    функція завершилась

    never
      ↓
    функція не повернулася

### 7. `any` ≠ `unknown`

    any
      ↓
    "роби що хочеш"

    unknown
      ↓
    "спочатку доведи тип"

---

# 84. Головне

> **`any`, `unknown` і `never` описують три абсолютно різні ситуації.**

Запам'ятай одну формулу:

    any
      ↓
    "Я не хочу перевіряти"

    unknown
      ↓
    "Я поки не знаю тип"

    never
      ↓
    "Такого значення не існує"

Для реального TypeScript-коду хороше правило:

    known data
        ↓
    конкретний type

    unknown external data
        ↓
    validation
        ↓
    конкретний type

    impossible state
        ↓
    never

А `any` потрібно розглядати як **escape hatch**, а не як нормальний спосіб типізації.

Особливо важливо засвоїти патерн:

    external data
          ↓
       unknown
          ↓
      type guard
          ↓
     known type
          ↓
    business logic

та:

    union
      ↓
    switch
      ↓
    exhaustive checking
      ↓
    never

Ці дві концепції — `unknown` для **безпечної роботи з невідомими даними** і `never` для **гарантування повноти логіки** — стануть дуже важливими при подальшому вивченні TypeScript, React, Next.js, Node.js та NestJS.