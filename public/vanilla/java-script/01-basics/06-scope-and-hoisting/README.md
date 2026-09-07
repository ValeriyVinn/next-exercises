# 06. Scope and Hoisting

Scope — це область видимості, у якій JavaScript може знайти та використати змінну, функцію або інше binding.

Простіше:

    Scope → де змінна доступна

Наприклад:

    const name = "John";

    console.log(name);

`name` доступна в тому scope, де вона була оголошена.

Але змінна, оголошена всередині блоку або функції, може бути недоступною зовні.

---

### Ключові поняття

✔ scope  
✔ global scope  
✔ module scope  
✔ function scope  
✔ block scope  
✔ lexical scope  
✔ lexical environment  
✔ scope chain  
✔ outer scope  
✔ inner scope  
✔ variable lookup  
✔ shadowing  
✔ global object  
✔ `var`  
✔ `let`  
✔ `const`  
✔ hoisting  
✔ declaration  
✔ initialization  
✔ Temporal Dead Zone  
✔ TDZ  
✔ execution context  
✔ global execution context  
✔ function execution context  
✔ block  
✔ closure  
✔ `var` hoisting  
✔ function declaration hoisting  

---

# Що потрібно пам'ятати

• Scope визначає, де binding доступний.

• JavaScript використовує lexical scope.

• Scope визначається структурою коду, а не тим, звідки функцію викликали.

• Основні scope:

    Global Scope
    Module Scope
    Function Scope
    Block Scope

• `let` та `const` мають block scope.

• `var` має function scope.

• Function declarations мають особливу поведінку щодо hoisting.

• `let` та `const` hoisted, але перебувають у Temporal Dead Zone до моменту виконання declaration.

• `var` hoisted та до initialization має значення `undefined`.

• Hoisting — це не буквальне переміщення рядків коду вгору.

• Scope chain використовується для пошуку змінних.

• Inner scope може отримувати доступ до outer scope.

• Outer scope не має автоматичного доступу до variables inner scope.

• Внутрішня змінна може shadow outer variable.

---

# Scope

Scope — область видимості binding.

Наприклад:

    const name = "John";

    console.log(name);

Тут `name` доступна в поточному scope.

Інший приклад:

    {
        const age = 25;

        console.log(age);
    }

`age` доступна всередині блоку.

Але:

    {
        const age = 25;
    }

    console.log(age);
    // ReferenceError

Тому що `age` належить block scope.

---

# Block

Block — частина коду між `{` та `}`.

Наприклад:

    {
        const name = "John";
        console.log(name);
    }

Також blocks використовуються в:

    if
    else
    for
    while
    switch
    try
    catch

Наприклад:

    if (true) {
        const message = "Hello";

        console.log(message);
    }

`message` має block scope.

---

# Block Scope

`let` та `const` мають block scope.

    {
        let age = 25;
        const name = "John";

        console.log(age);
        console.log(name);
    }

За межами:

    console.log(age);
    // ReferenceError

    console.log(name);
    // ReferenceError

Кожен block створює окрему область видимості для `let` та `const`.

---

# Block Scope у `if`

    if (true) {
        const message = "Hello";

        console.log(message);
        // Hello
    }

За межами:

    console.log(message);
    // ReferenceError

---

# Block Scope у `for`

    for (let i = 0; i < 3; i++) {
        console.log(i);
    }

`i` доступна всередині `for`.

Після циклу:

    console.log(i);
    // ReferenceError

Це одна з важливих переваг `let` порівняно з `var`.

---

# Function Scope

Function scope — область видимості функції.

Змінні, оголошені всередині функції через `let`, `const` або `var`, доступні всередині цієї функції.

    function greet() {
        const message = "Hello";

        console.log(message);
    }

    greet();

Але:

    console.log(message);
    // ReferenceError

`message` існує тільки всередині function scope.

---

# `var` та Function Scope

`var` має function scope.

    function test() {
        var age = 25;

        if (true) {
            var name = "John";
        }

        console.log(age);
        console.log(name);
    }

    test();

Обидві змінні доступні всередині функції.

Навіть якщо `name` оголошена всередині `if`.

Це тому, що `var` не має block scope.

---

# `let` / `const` vs `var`

Порівняння:

    function test() {

        if (true) {
            let a = 1;
            const b = 2;
            var c = 3;
        }

        console.log(c);
        // 3

        console.log(a);
        // ReferenceError

        console.log(b);
        // ReferenceError
    }

Правило:

    let    → block scope
    const  → block scope
    var    → function scope

---

# Global Scope

Global scope — найзовнішніша область видимості програми.

Наприклад:

    const appName = "My App";

    function start() {
        console.log(appName);
    }

Функція може отримати доступ до `appName`, тому що `appName` знаходиться в outer scope.

---

# Global Variable

Наприклад:

    const appName = "My App";

    function showAppName() {
        console.log(appName);
    }

    showAppName();

Результат:

    My App

Функція не має власної `appName`, тому JavaScript шукає її в outer scope.

---

# Inner Scope

Scope може бути вкладеним.

Наприклад:

    const globalValue = 10;

    function test() {
        const functionValue = 20;

        if (true) {
            const blockValue = 30;
        }
    }

Структура:

    Global Scope
        │
        └── Function Scope
                │
                └── Block Scope

Inner scope знаходиться всередині outer scope.

---

# Scope Chain

Scope chain — механізм пошуку binding через поточний scope та його outer scopes.

Наприклад:

    const globalValue = 10;

    function test() {
        const functionValue = 20;

        if (true) {
            const blockValue = 30;

            console.log(blockValue);
            console.log(functionValue);
            console.log(globalValue);
        }
    }

Пошук `globalValue`:

    Block Scope
        ↓
    Function Scope
        ↓
    Global Scope
        ↓
    found

JavaScript рухається від найближчого scope назовні.

---

# Variable Lookup

Коли JavaScript зустрічає:

    console.log(name);

він шукає `name` у поточному lexical scope.

Якщо не знаходить:

    Current Scope
        ↓
    Outer Scope
        ↓
    Outer Scope
        ↓
    Global Scope

Якщо binding не знайдений:

    ReferenceError

---

# Outer Scope

Outer scope — scope, який оточує поточний scope.

Наприклад:

    const globalValue = 10;

    function test() {
        console.log(globalValue);
    }

Для `test()`:

    Function Scope
        ↓
    Global Scope

Global scope є outer scope для function scope.

---

# Inner Scope

Inner scope — scope, який знаходиться всередині іншого scope.

Наприклад:

    function test() {

        const value = 10;

        if (true) {

            const innerValue = 20;

        }
    }

Тут:

    Function Scope
        │
        └── Block Scope

Block scope є inner scope відносно function scope.

---

# Access Outer Scope

Inner scope може звертатися до outer scope.

    const name = "John";

    function greet() {
        console.log(name);
    }

    greet();

Результат:

    John

---

# Outer Scope Cannot Access Inner Scope

Навпаки не працює.

    function greet() {
        const name = "John";
    }

    console.log(name);
    // ReferenceError

Причина:

    Global Scope
        ↓
    не може отримати доступ
        ↓
    до Function Scope

---

# Lexical Scope

JavaScript використовує lexical scope.

Це означає, що доступність binding визначається тим, **де код написаний**, а не тим, звідки функцію викликали.

Наприклад:

    const name = "John";

    function greet() {
        console.log(name);
    }

    function execute() {
        const name = "Peter";

        greet();
    }

    execute();

Результат:

    John

Чому не `Peter`?

Тому що `greet()` була визначена в scope, де `name` — `"John"`.

Виклик функції з іншого scope не змінює її lexical environment.

---

# Lexical Environment

Lexical Environment — внутрішня структура JavaScript, яка пов'язує identifiers з їхніми значеннями та зберігає посилання на outer environment.

Спрощено:

    Lexical Environment
        │
        ├── bindings
        │
        └── outer environment

Наприклад:

    const name = "John";

    function greet() {
        console.log(name);
    }

Для `greet()`:

    greet Environment
        │
        ├── local bindings
        │
        └── outer → Global Environment

Це допомагає пояснити scope chain та closures.

---

# Scope та Execution Context

Scope і execution context — пов'язані, але це не одне й те саме поняття.

Execution context описує середовище виконання коду.

Наприклад:

    Global Execution Context
            ↓
    Function Execution Context

Scope визначає доступність bindings.

Execution context — ширше поняття, яке включає необхідне середовище для виконання коду.

На практичному рівні:

    Scope
        → де binding доступний

    Execution Context
        → середовище виконання коду

---

# Hoisting

Hoisting — поведінка JavaScript, за якої declarations обробляються до фактичного виконання відповідного коду.

Важливо:

    Hoisting ≠ physically moving code

JavaScript не просто переносить declaration на початок файлу.

Краще мислити так:

    declarations become known during environment setup

---

# `var` Hoisting

Приклад:

    console.log(age);

    var age = 25;

Результат:

    undefined

Спрощено це можна уявляти як:

    var age;

    console.log(age);

    age = 25;

Але це лише модель для розуміння hoisting, а не буквальне переписування source code.

---

# `let` Hoisting

`let` також hoisted у тому сенсі, що binding створюється під час setup відповідного environment.

Але до досягнення declaration binding перебуває в Temporal Dead Zone.

    console.log(age);

    let age = 25;

Результат:

    ReferenceError

---

# `const` Hoisting

`const` поводиться аналогічно щодо TDZ.

    console.log(age);

    const age = 25;

Результат:

    ReferenceError

---

# Temporal Dead Zone

Temporal Dead Zone — період від початку відповідного scope до моменту виконання declaration `let` або `const`.

Наприклад:

    {
        // TDZ begins

        console.log(age);
        // ReferenceError

        let age = 25;

        // TDZ ends
    }

До моменту:

    let age = 25;

binding не можна використовувати.

---

# TDZ — Важливо

TDZ існує не тому, що `let` або `const` "не hoisted".

Правильніше:

    let / const
        ↓
    binding created during environment setup
        ↓
    TDZ
        ↓
    declaration executed
        ↓
    initialized
        ↓
    accessible

---

# `var` vs `let` vs `const`

Порівняння:

    var
        ↓
    function scope
        ↓
    hoisted
        ↓
    initialized with undefined

    let
        ↓
    block scope
        ↓
    hoisted
        ↓
    TDZ
        ↓
    initialized at declaration

    const
        ↓
    block scope
        ↓
    hoisted
        ↓
    TDZ
        ↓
    initialized at declaration

---

# Hoisting Function Declarations

Function declarations мають особливу поведінку.

Наприклад:

    greet();

    function greet() {
        console.log("Hello");
    }

Це працює.

Результат:

    Hello

Function declaration доступна до рядка, де вона написана.

---

# Function Expression

Function expression поводиться інакше.

    greet();

    const greet = function () {
        console.log("Hello");
    };

Результат:

    ReferenceError

Причина:

    greet → const

а `const` перебуває в TDZ до моменту initialization.

---

# Arrow Function

Arrow function також часто створюється через `const`.

    greet();

    const greet = () => {
        console.log("Hello");
    };

Результат:

    ReferenceError

Це не означає, що arrow functions "не hoisted".

Binding `greet` створюється, але перебуває в TDZ до initialization.

---

# Function Declaration vs Function Expression

Порівняння:

    greet();

    function greet() {
        console.log("Hello");
    }

Працює.

А:

    greet();

    const greet = function () {
        console.log("Hello");
    };

Не працює.

Тому потрібно розрізняти:

    function declaration

та:

    function expression

---

# Scope Shadowing

Shadowing — коли inner scope створює binding з таким самим ім'ям, як у outer scope.

Наприклад:

    const name = "John";

    {
        const name = "Peter";

        console.log(name);
        // Peter
    }

    console.log(name);
    // John

Внутрішній `name` shadows зовнішній.

---

# Shadowing у Function

    const name = "John";

    function greet() {
        const name = "Peter";

        console.log(name);
    }

    greet();

Результат:

    Peter

За межами:

    console.log(name);
    // John

---

# Shadowing з `let`

    let value = 10;

    {
        let value = 20;

        console.log(value);
        // 20
    }

    console.log(value);
    // 10

Це дозволено, тому що bindings знаходяться у різних scopes.

---

# Shadowing з `const`

    const value = 10;

    {
        const value = 20;

        console.log(value);
        // 20
    }

Це також дозволено.

---

# Shadowing `var`

`var` має function scope, тому поведінка залежить від меж function.

    var value = 10;

    {
        var value = 20;
    }

    console.log(value);
    // 20

Block не створює окремий scope для `var`.

---

# Illegal Shadowing

Не всі комбінації shadowing дозволені.

Наприклад:

    let value = 10;

    {
        var value = 20;
    }

Це викликає:

    SyntaxError

Причина в тому, що `var` не може створити binding, який конфліктує з lexical declaration `let` у відповідному outer scope.

---

# Scope у Nested Functions

Функції можуть бути вкладені.

    function outer() {

        const outerValue = 10;

        function inner() {

            const innerValue = 20;

            console.log(outerValue);
            console.log(innerValue);
        }

        inner();
    }

    outer();

`inner()` має доступ до:

    inner scope
        ↓
    outer scope
        ↓
    global scope

---

# Closure та Scope

Closure виникає, коли функція зберігає доступ до lexical environment, у якому вона була створена.

Наприклад:

    function createCounter() {

        let count = 0;

        return function () {
            count++;

            return count;
        };
    }

    const counter = createCounter();

    console.log(counter());
    // 1

    console.log(counter());
    // 2

    console.log(counter());
    // 3

Внутрішня функція продовжує мати доступ до:

    count

навіть після завершення `createCounter()`.

Closure є прямим практичним наслідком lexical scoping.

---

# Scope Chain та Closure

Спрощено:

    counter function
        │
        └──→ createCounter environment
                    │
                    ├── count
                    │
                    └──→ outer environment

Тому `counter()` може знайти `count`.

---

# Global Scope vs Module Scope

У сучасному JavaScript modules мають власний module scope.

Наприклад:

    const apiUrl = "https://example.com";

    export { apiUrl };

`apiUrl` належить module scope.

Інший module не отримує її автоматично.

Щоб передати binding:

    export

та:

    import

Module scope допомагає уникати глобального забруднення.

---

# Script vs Module

Звичайний script та ES module мають різні правила щодо top-level bindings.

Module:

    <script type="module">
        const value = 10;
    </script>

`value` належить module scope.

Вона не стає автоматично глобальною властивістю `window`.

---

# Global Object

У браузері існує global object:

    window

Сучасний стандартний спосіб отримати global object:

    globalThis

Наприклад:

    globalThis.console

У браузері:

    globalThis === window;
    // true

Але top-level `let` та `const` у classic script не поводяться так само, як top-level `var`, щодо global object properties.

---

# `var` та Global Object

У classic browser script:

    var age = 25;

може створити property global object:

    window.age
    // 25

Тоді як:

    let age = 25;

не створює:

    window.age

Тобто:

    var → може створити global object property
    let / const → не створюють її таким способом

Module scripts мають окрему module scope model.

---

# Scope у `for`

`let` створює block-scoped binding.

    for (let i = 0; i < 3; i++) {
        console.log(i);
    }

Після циклу:

    console.log(i);
    // ReferenceError

Це особливо важливо для callbacks та closures.

---

# `var` у `for`

    for (var i = 0; i < 3; i++) {
        console.log(i);
    }

Після циклу:

    console.log(i);
    // 3

Тому `var` може створювати небажану поведінку.

---

# Classic Closure Example

Порівняння `var` та `let` у циклі:

    const functions = [];

    for (var i = 0; i < 3; i++) {
        functions.push(function () {
            return i;
        });
    }

    console.log(functions[0]());
    console.log(functions[1]());
    console.log(functions[2]());

Результат:

    3
    3
    3

Усі функції звертаються до одного `var i`.

З `let`:

    const functions = [];

    for (let i = 0; i < 3; i++) {
        functions.push(function () {
            return i;
        });
    }

    console.log(functions[0]());
    console.log(functions[1]());
    console.log(functions[2]());

Результат:

    0
    1
    2

`let` створює окреме binding для кожної ітерації циклу.

---

# Scope Lookup Example

    const a = "global";

    function outer() {

        const b = "outer";

        function inner() {

            const c = "inner";

            console.log(c);
            console.log(b);
            console.log(a);
        }

        inner();
    }

    outer();

Пошук `a`:

    inner
      ↓
    outer
      ↓
    global
      ↓
    a

Пошук `b`:

    inner
      ↓
    outer
      ↓
    b

Пошук `c`:

    inner
      ↓
    c

---

# Типова структура Scope

Спрощено:

    Global Scope
        │
        ├── Function Scope
        │       │
        │       └── Block Scope
        │
        └── Function Scope
                │
                └── Block Scope

Кожен inner scope може бачити outer scopes.

---

# Scope не залежить від виклику

Важливо:

    lexical scope
        ≠
    dynamic scope

JavaScript не шукає змінну відповідно до того, хто викликав функцію.

Наприклад:

    const value = "global";

    function showValue() {
        console.log(value);
    }

    function run() {
        const value = "local";

        showValue();
    }

    run();

Результат:

    global

Не:

    local

---

# Hoisting та Execution Order

Розглянемо:

    console.log(a);

    var a = 10;

Спочатку environment створює binding:

    a → undefined

Потім код виконується:

    console.log(a);
    // undefined

Після цього:

    a = 10;

Тому результат:

    undefined

---

# Hoisting `let`

    console.log(a);

    let a = 10;

Environment знає про binding `a`, але він не initialized.

До declaration:

    a → TDZ

Тому:

    console.log(a);

викликає:

    ReferenceError

---

# Hoisting `const`

    console.log(a);

    const a = 10;

Так само:

    a → TDZ

Результат:

    ReferenceError

---

# Hoisting та Function Declaration

    greet();

    function greet() {
        console.log("Hello");
    }

Функція доступна до місця declaration.

Спрощено:

    function declaration
        ↓
    binding available during environment setup
        ↓
    function can be called

---

# Hoisting та Function Expression

    greet();

    var greet = function () {
        console.log("Hello");
    };

Результат:

    TypeError

Чому?

`var greet` hoisted:

    greet → undefined

А виклик:

    greet();

намагається викликати:

    undefined()

Тому це `TypeError`.

---

# Важливе порівняння

### Function declaration

    greet();

    function greet() {}

Працює.

### `var` function expression

    greet();

    var greet = function () {};

Не працює:

    TypeError

### `const` function expression

    greet();

    const greet = function () {};

Не працює:

    ReferenceError

### `const` arrow function

    greet();

    const greet = () => {};

Не працює:

    ReferenceError

---

# Declaration vs Initialization

Для розуміння hoisting важливо розділяти:

    declaration

та:

    initialization

Наприклад:

    let age = 25;

Тут:

    let age
        ↓
    declaration

    = 25
        ↓
    initialization

Для `var`:

    var age;

binding отримує:

    undefined

до фактичного assignment.

---

# Reassignment та Scope

Scope не визначає, чи можна змінювати binding.

Наприклад:

    {
        let count = 0;

        count = 1;
        count = 2;
    }

`count` має:

    block scope

і може бути:

    reassigned

Тобто:

    scope
        → де binding доступний

    mutability / reassignment
        → чи можна binding змінити

Це різні поняття.

---

# `const` та Scope

`const`:

    {
        const name = "John";
    }

має:

    block scope

Але:

    const name = "John";

не можна:

    name = "Peter";

Scope та immutability/reassignment — різні концепції.

---

# Nested Blocks

Blocks можуть бути вкладені.

    {
        const a = 1;

        {
            const b = 2;

            console.log(a);
            console.log(b);
        }

        console.log(a);

        console.log(b);
        // ReferenceError
    }

Inner block бачить outer binding.

Outer block не бачить inner binding.

---

# Shadowing у Nested Blocks

    const value = "outer";

    {
        const value = "middle";

        {
            const value = "inner";

            console.log(value);
            // inner
        }

        console.log(value);
        // middle
    }

    console.log(value);
    // outer

Пошук завжди починається з найближчого scope.

---

# Scope та Parameters

Parameters функції належать до function scope.

    function greet(name) {
        console.log(name);
    }

`name` — parameter binding.

Він доступний всередині функції:

    function greet(name) {
        const message = `Hello, ${name}`;

        console.log(message);
    }

За межами:

    console.log(name);
    // ReferenceError

---

# Scope та Catch

`catch` створює block scope для exception parameter.

    try {
        throw new Error("Something went wrong");
    } catch (error) {
        console.log(error);
    }

За межами:

    console.log(error);
    // ReferenceError

`error` доступний тільки в `catch` block.

---

# Scope та Classes

Class declarations також мають lexical scope.

    class User {
        constructor(name) {
            this.name = name;
        }
    }

Class declaration не є global/function-scoped як `var`.

У сучасному JavaScript classes належать до lexical bindings.

---

# Scope та `switch`

`switch` використовує block structure, але для `let` / `const` потрібно бути уважним до declaration у `case`.

Безпечний pattern:

    switch (value) {

        case 1: {
            const message = "One";
            console.log(message);
            break;
        }

        case 2: {
            const message = "Two";
            console.log(message);
            break;
        }
    }

Окремі blocks дозволяють мати однакові `const` names у різних cases.

---

# Scope та `try/catch`

Наприклад:

    try {
        const value = 10;
    } catch (error) {
        console.log(error);
    }

`value` доступна тільки в `try` block.

`error` доступний тільки в `catch` block.

---

# Global Pollution

Не варто без необхідності створювати багато global variables.

Погано:

    var user;
    var name;
    var age;
    var data;
    var result;

Глобальний namespace легко забруднити.

Краще використовувати:

    const
    let
    modules
    functions
    objects

і тримати bindings у мінімально необхідному scope.

---

# Principle: Narrow Scope

Хороша практика:

> Створюй binding у найменшому scope, де він потрібен.

Наприклад, якщо змінна використовується тільки в `if`:

    if (isActive) {
        const message = "Active";

        console.log(message);
    }

Не потрібно робити її глобальною або доступною для всієї функції.

---

# Scope та Readability

Менший scope полегшує розуміння коду.

Погано:

    const user = ...;
    const result = ...;
    const temporaryValue = ...;

    // 100 lines

    function process() {
        // uses temporaryValue
    }

Краще:

    function process() {

        const temporaryValue = ...;

        // use it here
    }

Локальний scope зменшує кількість bindings, які потрібно тримати в голові.

---

# Типові помилки

❌ Вважати, що hoisting — це фізичне переміщення коду.

❌ Вважати, що `let` та `const` не hoisted.

❌ Вважати, що TDZ означає відсутність binding.

❌ Плутати block scope та function scope.

❌ Вважати, що `var` має block scope.

❌ Очікувати, що функція використовує variable з caller scope.

❌ Плутати lexical scope з dynamic scope.

❌ Вважати, що `const` означає immutable value.

❌ Створювати зайві global variables.

❌ Використовувати `var` у новому коді без причини.

❌ Не розуміти різницю між function declaration та function expression.

❌ Плутати `ReferenceError` та `TypeError` у прикладах з hoisting.

---

# Типові ReferenceError

### `let`

    console.log(age);

    let age = 25;

Результат:

    ReferenceError

Причина:

    age → TDZ

---

### `const`

    console.log(age);

    const age = 25;

Результат:

    ReferenceError

---

### Block Scope

    {
        const value = 10;
    }

    console.log(value);

Результат:

    ReferenceError

---

# Типовий TypeError з `var`

    greet();

    var greet = function () {};

Результат:

    TypeError

Тому що:

    greet → undefined

а:

    undefined()

не є викликом функції.

---

# Питання зі співбесіди

Що таке scope?

Що таке lexical scope?

Які види scope існують у JavaScript?

Що таке global scope?

Що таке function scope?

Що таке block scope?

Яка різниця між `var`, `let` та `const` щодо scope?

Що таке scope chain?

Як JavaScript шукає змінну?

Що таке outer scope?

Що таке inner scope?

Що таке lexical environment?

Що таке variable lookup?

Що таке shadowing?

Що таке hoisting?

Чи hoisted `let`?

Чи hoisted `const`?

Чи hoisted `var`?

Що таке Temporal Dead Zone?

Чому `let` до declaration викликає `ReferenceError`?

Чому `var` до declaration повертає `undefined`?

Чому function declaration можна викликати до declaration?

Яка різниця між function declaration та function expression?

Чому `var` не має block scope?

Що таке closure?

Як scope пов'язаний із closure?

Чим lexical scope відрізняється від dynamic scope?

Що таке module scope?

Чим global scope відрізняється від module scope?

Що таке global object?

Яка різниця між `var` та `let` на top level?

---

# Практичні приклади

### Приклад 1 — Block Scope

    {
        let message = "Hello";

        console.log(message);
        // Hello
    }

    console.log(message);
    // ReferenceError

---

### Приклад 2 — Function Scope

    function greet() {
        const message = "Hello";

        console.log(message);
    }

    greet();

    console.log(message);
    // ReferenceError

---

### Приклад 3 — Outer Scope

    const name = "John";

    function greet() {
        console.log(name);
    }

    greet();
    // John

---

### Приклад 4 — Shadowing

    const name = "John";

    function greet() {
        const name = "Peter";

        console.log(name);
        // Peter
    }

    greet();

    console.log(name);
    // John

---

### Приклад 5 — Scope Chain

    const a = 1;

    function outer() {

        const b = 2;

        function inner() {

            const c = 3;

            console.log(a);
            console.log(b);
            console.log(c);
        }

        inner();
    }

    outer();

---

### Приклад 6 — `var`

    if (true) {
        var value = 10;
    }

    console.log(value);
    // 10

---

### Приклад 7 — `let`

    if (true) {
        let value = 10;
    }

    console.log(value);
    // ReferenceError

---

### Приклад 8 — Hoisting `var`

    console.log(value);
    // undefined

    var value = 10;

---

### Приклад 9 — TDZ

    console.log(value);
    // ReferenceError

    let value = 10;

---

### Приклад 10 — Function Declaration

    greet();

    function greet() {
        console.log("Hello");
    }

    // Hello

---

### Приклад 11 — Function Expression

    greet();

    const greet = function () {
        console.log("Hello");
    };

    // ReferenceError

---

### Приклад 12 — Arrow Function

    greet();

    const greet = () => {
        console.log("Hello");
    };

    // ReferenceError

---

### Приклад 13 — Closure

    function createCounter() {

        let count = 0;

        return function () {
            count++;

            return count;
        };
    }

    const counter = createCounter();

    console.log(counter());
    // 1

    console.log(counter());
    // 2

    console.log(counter());
    // 3

---

# Ментальна модель Scope

Коли бачиш:

    const value = 10;

питай себе:

    1. У якому scope створений binding?
    2. Де його можна використовувати?
    3. Який outer scope?
    4. Чи є binding з таким самим ім'ям ближче?
    5. Чи доступний binding у цьому місці?

---

# Ментальна модель Hoisting

Коли бачиш declaration, думай:

    Environment Setup
          ↓
    Binding Creation
          ↓
    Initialization rules
          ↓
    Code Execution

Для `var`:

    binding
        ↓
    undefined
        ↓
    assignment

Для `let` / `const`:

    binding
        ↓
    TDZ
        ↓
    declaration executed
        ↓
    initialized

Для function declaration:

    function binding
        ↓
    available during setup
        ↓
    callable

---

# Шлях

🟢 Core (обов'язково знати)

Що таке scope.

Global scope.

Function scope.

Block scope.

Lexical scope.

Scope chain.

Outer scope.

Inner scope.

Variable lookup.

`let` / `const` → block scope.

`var` → function scope.

Основи hoisting.

`var` hoisting.

`let` / `const` та TDZ.

Temporal Dead Zone.

Function declaration hoisting.

Різниця:

    declaration
    initialization

---

🔵 Junior

Глибше розуміння:

Lexical Environment.

Execution Context.

Global Execution Context.

Function Execution Context.

Scope chain.

Nested scopes.

Shadowing.

Function parameters як bindings.

Scope у `for`.

`let` у циклах.

`var` у циклах.

Function declaration vs function expression.

Arrow functions та TDZ.

`var` та global object.

Global scope vs module scope.

Module scope.

Closures як наслідок lexical scope.

---

🟠 Middle

Глибше розуміння:

Lexical environments.

Environment Records.

Outer environment references.

Binding creation.

Binding initialization.

Variable Environment.

Lexical Environment.

Execution Context.

Environment setup.

Function Environment Records.

Global Environment Records.

Module Environment Records.

TDZ semantics.

Hoisting semantics.

Declaration instantiation.

Function declaration instantiation.

Shadowing та name resolution.

Scope chain та closures.

Per-iteration bindings.

Global object vs global environment.

`var` / `let` / `const` semantics.

---

🔴 Senior

ECMAScript specification concepts.

Execution Context specification model.

Lexical Environment.

Environment Records.

Declarative Environment Record.

Object Environment Record.

Function Environment Record.

Global Environment Record.

Module Environment Record.

LexicalDeclaration.

VariableStatement.

DeclarationInstantiation.

FunctionDeclarationInstantiation.

BindingIdentifier.

CreateMutableBinding.

CreateImmutableBinding.

InitializeBinding.

SetMutableBinding.

GetBindingValue.

HasBinding.

GetIdentifierReference.

ResolveBinding.

Lexical scope semantics.

Module linking та environment creation.

Global environment semantics.

Engine implementation details.

Scope representation.

Environment optimization.

Closure allocation.

Escape analysis.

Garbage collection implications.

JIT optimization та deoptimization.

---

# Міні-шпаргалка

## Scope

    Scope
        ↓
    область видимості binding

---

## Основні scopes

    Global Scope
    Module Scope
    Function Scope
    Block Scope

---

## `let`

    let
      ↓
    block scope
      ↓
    TDZ
      ↓
    initialization

---

## `const`

    const
      ↓
    block scope
      ↓
    TDZ
      ↓
    initialization
      ↓
    no reassignment

---

## `var`

    var
      ↓
    function scope
      ↓
    hoisted
      ↓
    initialized as undefined

---

## Scope Chain

    Current Scope
         ↓
    Outer Scope
         ↓
    Outer Scope
         ↓
    Global Scope

---

## Variable Lookup

    name
     ↓
    current scope
     ↓
    outer scope
     ↓
    global scope
     ↓
    found / ReferenceError

---

## Shadowing

    outer:
        const value = "outer";

    inner:
        const value = "inner";

    inner value shadows outer value.

---

## Hoisting

    Hoisting
        ↓
    declarations processed
    during environment setup

Не:

    "code physically moved upward"

---

## TDZ

    let / const
        ↓
    binding created
        ↓
    TDZ
        ↓
    declaration executed
        ↓
    initialized
        ↓
    accessible

---

## Function Declaration

    greet();

    function greet() {}

Працює.

---

## Function Expression

    greet();

    const greet = function () {};

`ReferenceError`.

---

## `var` Function Expression

    greet();

    var greet = function () {};

`TypeError`.

Причина:

    greet → undefined

---

# `var` vs `let` vs `const`

    ┌──────────┬───────────────┬─────────────────────┐
    │          │ Scope         │ Before declaration   │
    ├──────────┼───────────────┼─────────────────────┤
    │ var      │ function      │ undefined            │
    │ let      │ block         │ TDZ / ReferenceError │
    │ const    │ block         │ TDZ / ReferenceError │
    └──────────┴───────────────┴─────────────────────┘

---

# Найважливіше правило

Мисли так:

    Scope
        ↓
    де binding доступний

    Hoisting
        ↓
    як declarations обробляються
    під час створення environment

    TDZ
        ↓
    період між створенням binding
    та його initialization

    Scope Chain
        ↓
    як JavaScript шукає binding

    Closure
        ↓
    функція зберігає доступ
    до свого lexical environment

---

# Головне

• Scope визначає область видимості binding.

• JavaScript використовує lexical scope.

• Scope визначається структурою source code.

• Основні scopes:

    Global
    Module
    Function
    Block

• `let` має block scope.

• `const` має block scope.

• `var` має function scope.

• Block scope використовується в конструкціях із `{}`.

• Inner scope може отримувати доступ до outer scope.

• Outer scope не може автоматично отримувати доступ до inner scope.

• Scope chain визначає порядок пошуку bindings:

    current
        ↓
    outer
        ↓
    global

• Якщо binding не знайдений — `ReferenceError`.

• Shadowing — inner binding з таким самим ім'ям приховує outer binding.

• Hoisting не означає фізичне переміщення коду.

• `var` hoisted та до initialization має значення `undefined`.

• `let` та `const` hoisted у сенсі створення binding, але перебувають у TDZ до initialization.

• TDZ закінчується, коли declaration виконується та binding initialized.

• Function declarations доступні до місця declaration.

• Function expressions та arrow functions, створені через `let` / `const`, не можна викликати до initialization.

• `var` у block не створює block scope.

• `let` у `for` має block/per-iteration behavior, що особливо важливо для closures.

• JavaScript має lexical scope, а не dynamic scope.

• Closure виникає, коли функція зберігає доступ до lexical environment, у якому вона була створена.

• Scope та reassignment — різні поняття.

• `const` визначає binding, який не можна переприсвоїти, але це не означає immutable object.

• Module має власний module scope.

• Не варто без необхідності створювати global variables.

• Хороше практичне правило:

    створюй binding
    у найменшому scope,
    де він потрібен.

• Основна ментальна модель:

    Scope
        ↓
    де binding доступний

    Scope Chain
        ↓
    де JavaScript його шукає

    Hoisting
        ↓
    як declarations стають доступними
    під час environment setup

    TDZ
        ↓
    коли let / const binding
    ще не initialized

    Closure
        ↓
    функція зберігає доступ
    до свого lexical environment