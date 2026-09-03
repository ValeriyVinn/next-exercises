## 01. Variables and Data Types

JavaScript змінні — це іменовані посилання на значення, які використовуються для зберігання та роботи з даними.

У JavaScript змінну можна створити за допомогою:

- `let`
- `const`
- `var` — старий спосіб, у сучасному JavaScript майже не використовується.

JavaScript — dynamically typed language:
тип належить значенню, а не самій змінній.

Наприклад:

    let age = 25;
    age = "twenty five";

Одна й та сама змінна може послідовно містити значення різних типів.

---

### Ключові поняття

✔ variable  
✔ declaration  
✔ initialization  
✔ assignment  
✔ `let`  
✔ `const`  
✔ `var`  
✔ identifier  
✔ primitive  
✔ object  
✔ data type  
✔ `typeof`  
✔ `undefined`  
✔ `null`  
✔ `boolean`  
✔ `number`  
✔ `bigint`  
✔ `string`  
✔ `symbol`  
✔ dynamic typing  
✔ type conversion  
✔ type coercion  

---

### Що потрібно пам'ятати

• `let` використовується для змінних, значення яких може змінюватися.

• `const` використовується для змінних, які не повинні бути переприсвоєні.

• `var` — legacy-механізм, який має іншу поведінку щодо scope та hoisting.

• Змінна оголошується через `let`, `const` або `var`.

• Присвоєння значення виконується оператором `=`.

• JavaScript має динамічну типізацію.

• Тип визначається значенням:

    let value = 42;
    // number

    value = "hello";
    // string

• JavaScript має 7 primitive types:

    string
    number
    bigint
    boolean
    undefined
    symbol
    null

• Окремо існує `object`.

• Масиви, функції та об'єкти належать до object category.

• `typeof` дозволяє перевірити тип значення.

• `const` забороняє переприсвоєння змінної, але не робить об'єкт або масив immutable.

---

### Variable Declaration

Оголошення змінної:

    let age;

Змінна існує, але значення не було явно задане.

    console.log(age);
    // undefined

Оголошення та ініціалізація:

    let age = 25;

Тут:

    let       → declaration
    age       → identifier
    =         → assignment operator
    25        → value

---

### Initialization

Initialization — перше присвоєння значення змінній під час її створення.

    let name = "Valeriy";

    const age = 56;

У цьому випадку:

    name → variable
    "Valeriy" → initial value

---

### Assignment

Assignment — присвоєння нового значення вже існуючій змінній.

    let age = 25;

    age = 26;

`let` дозволяє переприсвоєння.

`const` — ні:

    const age = 25;

    age = 26;
    // TypeError

---

### let

`let` використовується для змінних, значення яких може змінюватися.

    let score = 0;

    score = 10;
    score = 20;

Особливості:

✔ можна переприсвоювати  
✔ block scope  
✔ не можна повторно оголосити в тому самому scope  
✔ має temporal dead zone  

Наприклад:

    let count = 1;

    count = 2;

---

### const

`const` використовується, коли змінна не повинна отримати інше значення після ініціалізації.

    const name = "John";

Не можна:

    name = "Peter";
    // TypeError

`const` потрібно ініціалізувати одразу:

    const age;
    // SyntaxError

---

### const не означає immutable

`const` забороняє змінити reference, але не забороняє змінювати вміст об'єкта.

    const user = {
        name: "John"
    };

Можна:

    user.name = "Peter";

Не можна:

    user = {
        name: "Peter"
    };

Тобто:

    const → reference cannot be reassigned
    object contents → можуть змінюватися

Те саме з масивами:

    const numbers = [1, 2, 3];

    numbers.push(4);

Це дозволено.

Але:

    numbers = [10, 20];
    // TypeError

---

### var

`var` — старий спосіб оголошення змінних.

    var age = 25;

У сучасному JavaScript зазвичай використовують:

    const
    let

замість:

    var

Основні відмінності `var`:

• function scope  
• дозволяє повторне оголошення  
• має hoisting з initial value `undefined`  
• може створювати несподівану поведінку  

Приклад:

    var name = "John";
    var name = "Peter";

Це дозволено.

З `let`:

    let name = "John";
    let name = "Peter";
    // SyntaxError

Рекомендація:

    const → за замовчуванням
    let   → якщо значення буде змінюватися
    var   → legacy code

---

# Identifiers

Identifier — ім'я змінної, функції, класу або іншої сутності в JavaScript.

    const userName = "John";

`userName` — identifier.

Правила:

✔ може містити літери  
✔ може містити цифри  
✔ може містити `_`  
✔ може містити `$`  
✔ не може починатися з цифри  
✔ case-sensitive  
✔ не може бути reserved keyword  

Приклади:

    user
    userName
    age2
    _value
    $element

Некоректно:

    2users
    let
    const
    function

---

### Naming Convention

У JavaScript найчастіше використовується camelCase:

    firstName
    lastName
    userName
    totalPrice
    isActive

Для boolean часто використовують:

    isActive
    isLoggedIn
    hasAccess
    canEdit

Константи, які представляють глобальні незмінні значення, часто записують у UPPER_SNAKE_CASE:

    const MAX_USERS = 100;
    const API_URL = "...";

---

# Data Types

JavaScript має два основних категоріальних типи:

    Primitive values
    Object values

---

## Primitive Types

До primitive types належать:

    string
    number
    bigint
    boolean
    undefined
    symbol
    null

Primitive value — просте значення, яке не є об'єктом.

---

# 1. String

`string` — текстове значення.

Можна використовувати:

    "Hello"

    'Hello'

    `Hello`

Приклади:

    const firstName = "John";
    const city = 'Kyiv';
    const message = `Hello`;

---

### String literals

Подвійні лапки:

    const name = "John";

Одинарні лапки:

    const name = 'John';

Template literals:

    const name = "John";
    const message = `Hello, ${name}!`;

Результат:

    Hello, John!

Template literals дозволяють вставляти expressions через:

    ${expression}

---

### String concatenation

Об'єднання рядків:

    const firstName = "John";
    const lastName = "Smith";

    const fullName = firstName + " " + lastName;

Результат:

    "John Smith"

Сучасніший варіант:

    const fullName = `${firstName} ${lastName}`;

---

# 2. Number

`number` використовується для чисел.

    const age = 25;
    const price = 99.99;
    const temperature = -10;

JavaScript використовує один основний тип `number` для:

    integers
    floating-point numbers

Наприклад:

    10
    10.5
    -20
    0

---

### Special Number Values

JavaScript має спеціальні числові значення:

    Infinity
    -Infinity
    NaN

Приклад:

    10 / 0;
    // Infinity

    -10 / 0;
    // -Infinity

    "hello" * 2;
    // NaN

`NaN` означає:

    Not-a-Number

Перевірити:

    Number.isNaN(value)

---

# 3. BigInt

`bigint` використовується для дуже великих цілих чисел.

Створення:

    const bigNumber = 123456789012345678901234567890n;

`n` в кінці означає BigInt.

Наприклад:

    const value = 100n;

Тип:

    typeof value;
    // "bigint"

Не можна безпосередньо змішувати `number` і `bigint`:

    10 + 10n;
    // TypeError

---

# 4. Boolean

`boolean` має тільки два значення:

    true
    false

Приклади:

    const isActive = true;
    const isAdmin = false;

Boolean часто використовується в умовах:

    if (isActive) {
        console.log("Active");
    }

---

### Boolean Naming

Для boolean часто використовують:

    is...
    has...
    can...
    should...

Приклади:

    isLoggedIn
    isActive
    hasPermission
    canEdit
    shouldUpdate

---

# 5. Undefined

`undefined` означає, що значення не було визначене.

    let value;

    console.log(value);
    // undefined

Також:

    const user = {};

    console.log(user.name);
    // undefined

`undefined` часто означає:

    value is not defined / not assigned

---

# 6. Null

`null` означає відсутність значення, задану явно.

    const user = null;

Тобто програміст явно вказує:

    "тут зараз немає значення"

Порівняння:

    undefined → значення відсутнє / не задане
    null      → навмисно встановлена відсутність значення

---

### typeof null

Існує історична особливість JavaScript:

    typeof null;
    // "object"

Це відома особливість мови.

Насправді `null` є primitive value, хоча `typeof null` повертає `"object"`.

---

# 7. Symbol

`symbol` використовується для створення унікальних значень.

    const id = Symbol("id");

Кожен Symbol унікальний:

    const a = Symbol("id");
    const b = Symbol("id");

    console.log(a === b);
    // false

Symbols часто використовуються як унікальні ключі об'єктів та в механізмах JavaScript language internals.

На початковому рівні достатньо знати:

    Symbol → unique primitive value

---

# Object

`object` використовується для структурованих даних.

Приклад:

    const user = {
        name: "John",
        age: 25
    };

Об'єкт складається з:

    key → value

У цьому прикладі:

    name → "John"
    age  → 25

---

### Object properties

Доступ через крапку:

    user.name

Доступ через квадратні дужки:

    user["name"]

Зміна властивості:

    user.age = 26;

Додавання:

    user.email = "john@example.com";

---

# Array

Array — спеціальний тип object для зберігання впорядкованої колекції значень.

    const fruits = ["apple", "banana", "orange"];

Доступ за index:

    fruits[0];
    // "apple"

    fruits[1];
    // "banana"

Індексація починається з:

    0

Перевірка:

    typeof fruits;
    // "object"

Тому:

    Array.isArray(fruits);
    // true

---

# Function

Функції в JavaScript є об'єктами першого класу.

Наприклад:

    function greet() {
        console.log("Hello");
    }

Тип:

    typeof greet;
    // "function"

Функції можна:

✔ зберігати у змінних  
✔ передавати як аргументи  
✔ повертати з інших функцій  
✔ зберігати у масивах та об'єктах  

---

# typeof

`typeof` повертає рядок із типом значення.

Приклади:

    typeof "hello";
    // "string"

    typeof 42;
    // "number"

    typeof 10n;
    // "bigint"

    typeof true;
    // "boolean"

    typeof undefined;
    // "undefined"

    typeof Symbol();
    // "symbol"

    typeof {};
    // "object"

    typeof [];
    // "object"

    typeof function () {};
    // "function"

Особливість:

    typeof null;
    // "object"

---

### Основна шпаргалка typeof

    typeof "hello"       → "string"
    typeof 42            → "number"
    typeof 10n           → "bigint"
    typeof true          → "boolean"
    typeof undefined     → "undefined"
    typeof Symbol()      → "symbol"
    typeof null          → "object"
    typeof {}            → "object"
    typeof []            → "object"
    typeof function(){}  → "function"

---

# Dynamic Typing

JavaScript має динамічну типізацію.

Тип визначається під час виконання програми.

    let value = 10;

    value = "hello";

    value = true;

Це дозволено.

Тип змінної може змінюватися:

    let value = 10;

    typeof value;
    // "number"

    value = "hello";

    typeof value;
    // "string"

    value = true;

    typeof value;
    // "boolean"

Важливо:

    variable ≠ fixed type

Тип належить значенню.

---

# Primitive vs Object

Спрощена модель:

    JavaScript values
    │
    ├── Primitive
    │   ├── string
    │   ├── number
    │   ├── bigint
    │   ├── boolean
    │   ├── undefined
    │   ├── symbol
    │   └── null
    │
    └── Object
        ├── object
        ├── array
        ├── function
        ├── Date
        ├── Map
        ├── Set
        └── ...

---

# Value vs Reference

Primitive values поводяться як значення.

    let a = 10;
    let b = a;

    b = 20;

    console.log(a);
    // 10

Для об'єктів змінні можуть посилатися на той самий object.

    const user1 = {
        name: "John"
    };

    const user2 = user1;

    user2.name = "Peter";

    console.log(user1.name);
    // "Peter"

Спрощено:

    user1 ──┐
            ├──→ { name: "Peter" }
    user2 ──┘

Тому при роботі з objects та arrays потрібно розуміти references.

---

# Assignment

Основний оператор присвоєння:

    =

Приклад:

    let age = 25;

Інші assignment operators:

    +=
    -=
    *=
    /=
    %=

Приклади:

    let count = 10;

    count += 5;
    // 15

    count -= 3;
    // 12

    count *= 2;
    // 24

    count /= 4;
    // 6

---

# Constants

У JavaScript є два різних поняття:

    const variable
    immutable value

`const` не робить value immutable.

Наприклад:

    const user = {
        name: "John"
    };

    user.name = "Peter";

Дозволено.

Якщо потрібна справжня незмінність структури, існують окремі механізми, наприклад:

    Object.freeze()

Але `Object.freeze()` має свої особливості та не робить вкладені об'єкти автоматично deeply immutable.

---

# Scope

Scope — область видимості змінної.

Основні види:

    Global Scope
    Function Scope
    Block Scope

---

### Block Scope

`let` та `const` мають block scope.

    {
        let age = 25;
        const name = "John";
    }

За межами блоку:

    console.log(age);
    // ReferenceError

---

### var Function Scope

`var` має function scope.

    function test() {
        var age = 25;
    }

За межами функції:

    console.log(age);
    // ReferenceError

---

# Temporal Dead Zone

`let` і `const` піднімаються (hoisted), але не можуть бути використані до моменту їхнього оголошення.

    console.log(age);

    let age = 25;

Результат:

    ReferenceError

Цей період називається:

    Temporal Dead Zone (TDZ)

---

# Hoisting

JavaScript під час створення execution context обробляє declarations до виконання коду.

Наприклад з `var`:

    console.log(age);
    // undefined

    var age = 25;

З `let`:

    console.log(age);
    // ReferenceError

    let age = 25;

Тому не варто покладатися на hoisting у власному коді.

Краще оголошувати змінні перед використанням.

---

# Type Conversion

Type conversion — явне перетворення одного типу в інший.

Наприклад:

    const value = "42";

    const number = Number(value);

Результат:

    42

Основні функції:

    Number()
    String()
    Boolean()
    BigInt()

---

### String()

    String(42);
    // "42"

    String(true);
    // "true"

---

### Number()

    Number("42");
    // 42

    Number("3.14");
    // 3.14

    Number("hello");
    // NaN

---

### Boolean()

    Boolean(1);
    // true

    Boolean(0);
    // false

    Boolean("hello");
    // true

    Boolean("");
    // false

---

# Truthy and Falsy

У JavaScript значення можуть поводитися як `true` або `false` у boolean context.

Falsy values:

    false
    0
    -0
    0n
    ""
    null
    undefined
    NaN

Все інше зазвичай є truthy.

Наприклад:

    Boolean("hello");
    // true

    Boolean([]);
    // true

    Boolean({});
    // true

Важливо:

    Boolean([]) → true
    Boolean({}) → true

Порожній масив та порожній об'єкт — truthy.

---

# Type Coercion

Type coercion — автоматичне перетворення типів JavaScript.

Наприклад:

    "5" + 2;
    // "52"

Тут число `2` перетворюється на string.

Інший приклад:

    "5" - 2;
    // 3

У цьому випадку string `"5"` перетворюється на number.

Тому:

    + → часто працює як string concatenation
    - → numeric operation

На початковому етапі краще використовувати явні conversion functions:

    Number()
    String()
    Boolean()

---

# Explicit vs Implicit Conversion

Explicit conversion:

    const value = "42";

    const number = Number(value);

Implicit conversion:

    const result = "42" - 2;

Explicit conversion легше читати та контролювати.

---

# Primitive Immutability

Primitive values є immutable.

Наприклад:

    let name = "John";

    name[0] = "P";

Рядок не змінюється таким способом.

Щоб отримати новий рядок:

    name = "Peter";

Ми не змінюємо старий string, а присвоюємо змінній нове значення.

---

# Null vs Undefined

Це важлива різниця.

`undefined`:

    let value;

    console.log(value);
    // undefined

`null`:

    let value = null;

    console.log(value);
    // null

Спрощено:

    undefined → значення не задане
    null      → значення навмисно відсутнє

---

# Naming Variables

Добре:

    const userName = "John";
    const userAge = 25;
    const isActive = true;
    const totalPrice = 100;

Погано:

    const x = "John";
    const a = 25;
    const flag = true;

Якщо значення має зрозумілий контекст, краще використовувати описову назву.

Порівняння:

    const x = 250;

    const productPrice = 250;

Другий варіант зрозуміліший.

---

# Практичні приклади

### Приклад 1 — let

    let score = 0;

    score = 10;
    score = 20;

    console.log(score);
    // 20

---

### Приклад 2 — const

    const name = "John";

    console.log(name);
    // John

    // name = "Peter";
    // TypeError

---

### Приклад 3 — різні типи

    const name = "John";
    const age = 25;
    const isActive = true;
    const value = null;

    console.log(typeof name);
    // string

    console.log(typeof age);
    // number

    console.log(typeof isActive);
    // boolean

    console.log(typeof value);
    // object

---

### Приклад 4 — dynamic typing

    let value = 100;

    console.log(typeof value);
    // number

    value = "100";

    console.log(typeof value);
    // string

    value = false;

    console.log(typeof value);
    // boolean

---

### Приклад 5 — object

    const user = {
        name: "John",
        age: 25
    };

    console.log(user.name);
    // John

    user.age = 26;

    console.log(user.age);
    // 26

---

### Приклад 6 — array

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    console.log(fruits[0]);
    // apple

    console.log(fruits.length);
    // 3

---

# Типова структура даних

Наприклад, користувач:

    const user = {
        id: 1,
        name: "John",
        age: 25,
        isActive: true,
        email: null
    };

Типи:

    id        → number
    name      → string
    age       → number
    isActive  → boolean
    email     → null

---

# Типові помилки

❌ Використовувати `var` у новому коді без причини.

❌ Використовувати `let`, якщо значення ніколи не змінюється.

❌ Вважати, що `const` робить object immutable.

❌ Плутати `null` та `undefined`.

❌ Забувати, що JavaScript має dynamic typing.

❌ Вважати `typeof null` правильним відображенням його фактичної категорії.

❌ Вважати масив окремим primitive type.

❌ Порівнювати типи тільки через `typeof`, не знаючи його особливостей.

❌ Покладатися на implicit type coercion, коли код можна зробити явним.

❌ Давати змінним незрозумілі назви.

---

# Питання зі співбесіди

Що таке variable?

Яка різниця між declaration та initialization?

Що таке assignment?

Яка різниця між `let`, `const` та `var`?

Чому `const` потрібно ініціалізувати під час оголошення?

Чи можна змінити об'єкт, оголошений через `const`?

Що таке dynamic typing?

Які primitive types існують у JavaScript?

Що таке `undefined`?

Що таке `null`?

Яка різниця між `null` та `undefined`?

Що повертає `typeof null`?

Чому `typeof null` повертає `"object"`?

Як перевірити, чи є значення масивом?

Що таке `NaN`?

Що таке `Infinity`?

Що таке BigInt?

Для чого потрібен Symbol?

Що таке object?

Чим primitive відрізняється від object?

Що таке type conversion?

Що таке type coercion?

Що таке truthy та falsy?

Які значення є falsy?

Що таке scope?

Чим block scope відрізняється від function scope?

Що таке hoisting?

Що таке Temporal Dead Zone?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке variable.

Що таке declaration.

Що таке initialization.

Що таке assignment.

`let`.

`const`.

Основи `var`.

Основні primitive types:

    string
    number
    boolean
    undefined
    null

Що таке object.

Що таке array.

Що таке `typeof`.

Що таке dynamic typing.

Що таке `null` та `undefined`.

Truthy / falsy.

Основи type conversion.

---

🔵 Junior

Різниця між `let`, `const` та `var`.

Block scope.

Function scope.

Global scope.

Hoisting.

Temporal Dead Zone.

Primitive vs object.

Value vs reference.

`NaN`.

`Infinity`.

BigInt.

Symbol.

Explicit conversion.

Implicit coercion.

`Number()`.

`String()`.

`Boolean()`.

`Array.isArray()`.

Основні правила naming variables.

---

🟠 Middle

Глибше розуміння JavaScript type system.

Execution context.

Lexical environment.

Scope chain.

Closures та scope.

Reference semantics.

Object identity.

Shallow copy.

Deep copy.

Type coercion rules.

Abstract operations JavaScript.

`Object.is()`.

`===` та `==`.

Primitive wrappers.

Boxing / unboxing.

Immutability patterns.

---

🔴 Senior

ECMAScript specification type system.

Language types vs specification types.

Abstract operations.

`ToPrimitive`.

`ToNumber`.

`ToString`.

`ToBoolean`.

`ToObject`.

`SameValue`.

`SameValueZero`.

Reference semantics.

Garbage collection implications.

Memory model.

Engine optimizations.

Hidden classes / shapes.

Inline caching.

Deoptimization.

Trade-offs між різними способами представлення даних.

---

# Міні-шпаргалка

## Variables

    let
    const
    var

Рекомендація:

    const → за замовчуванням
    let   → якщо значення змінюється
    var   → legacy

---

## Primitive Types

    string
    number
    bigint
    boolean
    undefined
    symbol
    null

---

## Object

    object
    array
    function
    Date
    Map
    Set
    ...

---

## typeof

    typeof "hello"       → "string"
    typeof 42            → "number"
    typeof 10n           → "bigint"
    typeof true          → "boolean"
    typeof undefined     → "undefined"
    typeof Symbol()      → "symbol"
    typeof null          → "object"
    typeof {}            → "object"
    typeof []            → "object"
    typeof function(){}  → "function"

---

## Conversion

    Number("42")     → 42
    String(42)       → "42"
    Boolean(1)       → true

---

## Falsy

    false
    0
    -0
    0n
    ""
    null
    undefined
    NaN

---

## null vs undefined

    undefined → value is not assigned
    null      → intentionally empty value

---

## const

    const user = {
        name: "John"
    };

Можна:

    user.name = "Peter";

Не можна:

    user = {};

---

## Scope

    Global Scope
         │
         ├── Function Scope
         │
         └── Block Scope

`let` / `const`:

    Block Scope

`var`:

    Function Scope

---

# Головне

• Variable — іменоване binding для роботи зі значенням.

• `const` — використовуємо за замовчуванням, якщо binding не потрібно переприсвоювати.

• `let` — використовуємо, якщо binding буде переприсвоюватися.

• `var` — legacy mechanism.

• JavaScript має dynamic typing.

• Тип належить значенню, а не змінній.

• Primitive types:

    string
    number
    bigint
    boolean
    undefined
    symbol
    null

• Object — окрема категорія значень.

• Array — object, а не primitive.

• Function — особливий callable object.

• `typeof` повертає тип у вигляді string.

• `typeof null` повертає `"object"` — історична особливість JavaScript.

• `undefined` означає відсутність заданого значення.

• `null` використовується для явного позначення відсутності значення.

• `const` не робить object або array immutable.

• Primitive values є immutable.

• Objects та arrays працюють через references.

• Type conversion — явне перетворення типу.

• Type coercion — автоматичне перетворення типів.

• Falsy values мають false-поведінку в boolean context.

• `let` та `const` мають block scope.

• `var` має function scope.

• Для сучасного JavaScript основне правило:

    const → default
    let   → reassignment
    var   → avoid in new code