## 02. Conditionals

Conditionals (умовні конструкції) — це механізм JavaScript, який дозволяє виконувати різний код залежно від того, чи є певна умова `true` або `false`.

Умови використовуються для прийняття рішень у програмі.

Наприклад:

    const age = 20;

    if (age >= 18) {
        console.log("Adult");
    }

Програма перевіряє умову:

    age >= 18

Якщо результат:

    true  → код виконується
    false → код не виконується

---

### Ключові поняття

✔ condition  
✔ `if`  
✔ `else`  
✔ `else if`  
✔ conditional statement  
✔ expression  
✔ boolean  
✔ comparison operators  
✔ logical operators  
✔ truthy  
✔ falsy  
✔ strict equality  
✔ strict inequality  
✔ nested conditions  
✔ ternary operator  
✔ short-circuit evaluation  
✔ nullish coalescing  
✔ `switch`  
✔ `case`  
✔ `default`  
✔ `break`  

---

### Що потрібно пам'ятати

• Condition — вираз, результатом якого є значення, що використовується для прийняття рішення.

• `if` виконує код, якщо умова truthy.

• `else` виконується, якщо умова `if` falsy.

• `else if` дозволяє перевіряти додаткові умови.

• Умови найчастіше будуються за допомогою comparison operators.

• Для складних умов використовуються logical operators:

    &&
    ||
    !

• `===` — strict equality.

• `!==` — strict inequality.

• Не слід без необхідності використовувати `==` та `!=`.

• У JavaScript будь-яке значення може використовуватися в умові через truthy/falsy behavior.

• Ternary operator використовується для короткого умовного виразу.

• `switch` зручно використовувати, коли потрібно порівняти одне значення з кількома варіантами.

---

# if

`if` — основна умовна конструкція JavaScript.

Синтаксис:

    if (condition) {
        // code
    }

Приклад:

    const age = 20;

    if (age >= 18) {
        console.log("Adult");
    }

Якщо:

    age >= 18

повертає:

    true

код всередині `{}` виконається.

---

### if з boolean

    const isActive = true;

    if (isActive) {
        console.log("User is active");
    }

Якщо:

    isActive === true

умова виконується.

---

# else

`else` виконується, якщо умова `if` є falsy.

    const age = 16;

    if (age >= 18) {
        console.log("Adult");
    } else {
        console.log("Minor");
    }

Результат:

    Minor

Структура:

    if (condition) {
        // true
    } else {
        // false
    }

---

# else if

`else if` використовується для перевірки кількох умов.

    const age = 25;

    if (age < 13) {
        console.log("Child");
    } else if (age < 18) {
        console.log("Teenager");
    } else {
        console.log("Adult");
    }

JavaScript перевіряє умови зверху вниз.

Перша умова, яка стане truthy, виконається.

Після цього решта `else if` не перевіряються.

---

### Кілька умов

    const score = 75;

    if (score >= 90) {
        console.log("A");
    } else if (score >= 75) {
        console.log("B");
    } else if (score >= 60) {
        console.log("C");
    } else {
        console.log("F");
    }

Результат:

    B

---

# Умови виконуються зверху вниз

Порядок умов має значення.

Наприклад:

    const age = 25;

    if (age >= 18) {
        console.log("Adult");
    } else if (age >= 21) {
        console.log("21+");
    }

Для `age = 25` буде виконано:

    Adult

До другої умови програма не дійде.

Тому більш специфічні умови часто потрібно ставити перед загальними.

---

# Comparison Operators

Comparison operators використовуються для порівняння значень.

Основні:

    >
    <
    >=
    <=
    ===
    !==

---

### Greater than

    10 > 5;
    // true

---

### Less than

    5 < 10;
    // true

---

### Greater than or equal

    10 >= 10;
    // true

    10 >= 5;
    // true

---

### Less than or equal

    5 <= 5;
    // true

---

# Strict Equality

`===` перевіряє:

    value
    +
    type

Наприклад:

    5 === 5;
    // true

    5 === "5";
    // false

Тому що:

    5     → number
    "5"   → string

---

# Strict Inequality

`!==` перевіряє, чи значення або їхні типи відрізняються.

    5 !== 10;
    // true

    5 !== "5";
    // true

    5 !== 5;
    // false

---

# == та !=

JavaScript також має:

    ==
    !=

Але вони використовують type coercion.

Наприклад:

    5 == "5";
    // true

    5 === "5";
    // false

Рекомендація для сучасного JavaScript:

    ===
    !==

використовувати за замовчуванням замість:

    ==
    !=

---

# Logical Operators

Основні logical operators:

    &&
    ||
    !

---

# AND `&&`

`&&` означає логічне "І".

Обидві умови повинні бути truthy.

    const age = 25;
    const hasTicket = true;

    if (age >= 18 && hasTicket) {
        console.log("Allowed");
    }

Умова:

    age >= 18 && hasTicket

має бути truthy з обох боків.

---

### Таблиця AND

    true  && true   → true
    true  && false  → false
    false && true   → false
    false && false  → false

---

# OR `||`

`||` означає логічне "АБО".

Достатньо, щоб хоча б одна умова була truthy.

    const isAdmin = false;
    const isModerator = true;

    if (isAdmin || isModerator) {
        console.log("Has access");
    }

---

### Таблиця OR

    true  || true   → true
    true  || false  → true
    false || true   → true
    false || false  → false

---

# NOT `!`

`!` інвертує boolean value.

    !true;
    // false

    !false;
    // true

Приклад:

    const isLoggedIn = false;

    if (!isLoggedIn) {
        console.log("Please log in");
    }

---

# Double NOT `!!`

`!!` часто використовується для явного перетворення значення в boolean.

    !!"hello";
    // true

    !!0;
    // false

    !!null;
    // false

Але для явного перетворення часто зрозуміліше:

    Boolean(value)

---

# Truthy та Falsy

В умовах JavaScript значення не обов'язково має бути `true` або `false`.

JavaScript перетворює значення до boolean context.

Наприклад:

    if ("hello") {
        console.log("Runs");
    }

Рядок `"hello"` є truthy.

---

### Falsy values

Основні falsy values:

    false
    0
    -0
    0n
    ""
    null
    undefined
    NaN

Наприклад:

    if (0) {
        console.log("Runs");
    }

Код не виконається.

---

### Truthy values

Приклади truthy:

    "hello"
    "0"
    []
    {}
    42
    -1
    true

Важливо:

    [] → truthy
    {} → truthy

Навіть порожній масив та порожній об'єкт є truthy.

---

# Condition Expression

Умова може бути будь-яким expression.

Наприклад:

    if (age >= 18) {
        ...
    }

Або:

    if (isActive) {
        ...
    }

Або:

    if (user) {
        ...
    }

Або:

    if (user && user.isActive) {
        ...
    }

---

# Nested Conditions

Nested condition — умова всередині іншої умови.

    const isLoggedIn = true;
    const isAdmin = true;

    if (isLoggedIn) {
        if (isAdmin) {
            console.log("Admin panel");
        }
    }

Але часто це можна записати простіше:

    if (isLoggedIn && isAdmin) {
        console.log("Admin panel");
    }

Краще уникати зайвої вкладеності, якщо умову можна зробити зрозумілішою.

---

# Multiple Conditions

Наприклад:

    const age = 25;
    const hasLicense = true;
    const hasCar = true;

    if (age >= 18 && hasLicense && hasCar) {
        console.log("Can drive");
    }

Усі три умови повинні бути truthy.

---

# Parentheses

Дужки дозволяють явно визначити порядок логічних операцій.

    const age = 25;
    const isAdmin = false;
    const isModerator = true;

    if (age >= 18 && (isAdmin || isModerator)) {
        console.log("Allowed");
    }

Логіка:

    age >= 18
        &&
    (isAdmin || isModerator)

---

# Operator Precedence

У спрощеному вигляді для умов важливо пам'ятати:

    !
    &&
    ||

Тобто:

    ! → AND → OR

Наприклад:

    a || b && c

інтерпретується як:

    a || (b && c)

Але для читабельності краще використовувати дужки:

    a || (b && c)

---

# Ternary Operator

Ternary operator — короткий спосіб записати просту умовну конструкцію.

Синтаксис:

    condition ? valueIfTrue : valueIfFalse

Приклад:

    const age = 20;

    const status = age >= 18
        ? "Adult"
        : "Minor";

Результат:

    "Adult"

---

### Ternary vs if

Через `if`:

    let message;

    if (age >= 18) {
        message = "Adult";
    } else {
        message = "Minor";
    }

Через ternary:

    const message = age >= 18
        ? "Adult"
        : "Minor";

Для простого вибору значення ternary часто зручніший.

---

### Не варто зловживати ternary

Погано:

    const result = a
        ? b
        : c
            ? d
            : e;

Якщо логіка складна, краще використати `if / else if / else`.

---

# switch

`switch` використовується для вибору одного з кількох варіантів.

Синтаксис:

    switch (expression) {
        case value1:
            // code
            break;

        case value2:
            // code
            break;

        default:
            // code
    }

---

### Приклад

    const day = 2;

    switch (day) {
        case 1:
            console.log("Monday");
            break;

        case 2:
            console.log("Tuesday");
            break;

        case 3:
            console.log("Wednesday");
            break;

        default:
            console.log("Unknown day");
    }

Результат:

    Tuesday

---

# break

`break` зупиняє виконання `switch`.

    switch (value) {
        case 1:
            console.log("One");
            break;

        case 2:
            console.log("Two");
            break;
    }

Без `break` виконання може перейти до наступного `case`.

Це називається:

    fall-through

---

# switch fall-through

Наприклад:

    const value = 1;

    switch (value) {
        case 1:
            console.log("One");

        case 2:
            console.log("Two");
    }

Результат:

    One
    Two

Тому зазвичай після `case` використовують:

    break

---

# default

`default` виконується, якщо жоден `case` не збігається.

    const role = "guest";

    switch (role) {
        case "admin":
            console.log("Admin");
            break;

        case "user":
            console.log("User");
            break;

        default:
            console.log("Guest");
    }

Результат:

    Guest

---

# if vs switch

`if` зручно використовувати для:

    ranges
    comparisons
    complex conditions

Наприклад:

    if (age >= 18) {
        ...
    }

`switch` зручно використовувати для:

    one value
        ↓
    multiple exact cases

Наприклад:

    switch (role) {
        ...
    }

---

# Short-Circuit Evaluation

Logical operators можуть зупинити подальше обчислення.

Для `&&`:

    false && something

Якщо перша частина falsy, друга частина не потрібна для визначення результату.

Для `||`:

    true || something

Якщо перша частина truthy, друга частина не потрібна для визначення результату.

---

### && як умовний запуск

    isLoggedIn && showDashboard();

Якщо:

    isLoggedIn === true

викличеться:

    showDashboard()

Якщо:

    isLoggedIn === false

функція не викличеться.

Для простих випадків це може бути зручно, але для складної логіки краще використовувати `if`.

---

# || як default value

`||` часто використовують для запасного значення.

    const name = userName || "Guest";

Якщо `userName` falsy:

    name → "Guest"

Але це має важливу особливість.

Наприклад:

    const count = 0 || 10;

Результат:

    10

Тобто `||` замінює всі falsy values.

---

# Nullish Coalescing `??`

`??` повертає праву частину тільки тоді, коли ліва частина:

    null
    undefined

Приклад:

    const name = userName ?? "Guest";

Якщо:

    userName = null

результат:

    "Guest"

Але:

    const count = 0 ?? 10;

результат:

    0

Тому:

    || → перевіряє falsy
    ?? → перевіряє null / undefined

---

# || vs ??

Важлива різниця:

    0 || 10;
    // 10

    0 ?? 10;
    // 0

    "" || "Guest";
    // "Guest"

    "" ?? "Guest";
    // ""

    null || "Guest";
    // "Guest"

    null ?? "Guest";
    // "Guest"

---

# Optional Chaining `?.`

Optional chaining дозволяє безпечно звертатися до властивості, яка може бути відсутня.

    const user = {};

    console.log(user.address?.city);

Результат:

    undefined

Без optional chaining:

    user.address.city

може спричинити:

    TypeError

Optional chaining часто використовується разом з `??`:

    const city = user.address?.city ?? "Unknown";

---

# Conditions with Objects

Об'єкти truthy:

    const user = {};

    if (user) {
        console.log("User exists");
    }

Це виконається.

Навіть:

    const user = {};

    Boolean(user);
    // true

Якщо потрібно перевірити конкретну властивість:

    if (user.isActive) {
        ...
    }

---

# Conditions with Arrays

Порожній масив також truthy:

    const items = [];

    if (items) {
        console.log("Runs");
    }

Якщо потрібно перевірити, чи масив має елементи:

    if (items.length > 0) {
        console.log("Has items");
    }

Або:

    if (items.length) {
        console.log("Has items");
    }

Перший варіант часто зрозуміліший для початківця.

---

# Comparing Strings

Рядки можна порівнювати.

    "apple" === "apple";
    // true

    "apple" === "orange";
    // false

Порівняння рядків є case-sensitive:

    "Hello" === "hello";
    // false

---

# Comparing Numbers

    const age = 25;

    if (age >= 18) {
        console.log("Adult");
    }

Оператори:

    >
    <
    >=
    <=

---

# Comparing Boolean

Можна:

    if (isActive) {
        ...
    }

Не обов'язково:

    if (isActive === true) {
        ...
    }

Зазвичай коротший варіант:

    if (isActive) {
        ...
    }

є читабельнішим.

Для false:

    if (!isActive) {
        ...
    }

---

# Guard Conditions

Guard condition — рання перевірка, яка не дозволяє виконувати основну логіку, якщо необхідна умова не виконана.

Наприклад:

    function processUser(user) {
        if (!user) {
            return;
        }

        console.log(user.name);
    }

Це дозволяє уникати великої вкладеності:

    if (user) {
        if (user.isActive) {
            if (user.hasAccess) {
                // ...
            }
        }
    }

Замість цього:

    if (!user) {
        return;
    }

    if (!user.isActive) {
        return;
    }

    if (!user.hasAccess) {
        return;
    }

    // main logic

Guard clauses особливо корисні у функціях.

---

# Practical Examples

### Приклад 1 — перевірка віку

    const age = 20;

    if (age >= 18) {
        console.log("Adult");
    } else {
        console.log("Minor");
    }

---

### Приклад 2 — доступ

    const isLoggedIn = true;
    const isAdmin = false;

    if (isLoggedIn && isAdmin) {
        console.log("Admin panel");
    } else {
        console.log("Access denied");
    }

---

### Приклад 3 — оцінка

    const score = 85;

    if (score >= 90) {
        console.log("A");
    } else if (score >= 80) {
        console.log("B");
    } else if (score >= 70) {
        console.log("C");
    } else if (score >= 60) {
        console.log("D");
    } else {
        console.log("F");
    }

---

### Приклад 4 — перевірка числа

    const number = 10;

    if (number > 0) {
        console.log("Positive");
    } else if (number < 0) {
        console.log("Negative");
    } else {
        console.log("Zero");
    }

---

### Приклад 5 — парне / непарне

    const number = 10;

    if (number % 2 === 0) {
        console.log("Even");
    } else {
        console.log("Odd");
    }

---

### Приклад 6 — кілька умов

    const age = 25;
    const hasLicense = true;

    if (age >= 18 && hasLicense) {
        console.log("Can drive");
    } else {
        console.log("Cannot drive");
    }

---

### Приклад 7 — ternary

    const age = 20;

    const status = age >= 18
        ? "Adult"
        : "Minor";

---

### Приклад 8 — switch

    const role = "admin";

    switch (role) {
        case "admin":
            console.log("Full access");
            break;

        case "user":
            console.log("Limited access");
            break;

        case "guest":
            console.log("Guest access");
            break;

        default:
            console.log("Unknown role");
    }

---

### Приклад 9 — ?? 

    const username = null;

    const displayName = username ?? "Guest";

    console.log(displayName);
    // Guest

---

### Приклад 10 — optional chaining

    const user = {
        name: "John"
    };

    const city = user.address?.city ?? "Unknown";

    console.log(city);
    // Unknown

---

# Типові помилки

❌ Використовувати `=` замість `===` у порівнянні.

Наприклад:

    if (age = 18) {
        ...
    }

Це assignment, а не comparison.

Правильно:

    if (age === 18) {
        ...
    }

---

❌ Плутати `==` та `===`.

    5 == "5"
    // true

    5 === "5"
    // false

У сучасному коді переважно використовують:

    ===
    !==

---

❌ Вважати `[]` falsy.

Насправді:

    Boolean([]);
    // true

---

❌ Вважати `{}` falsy.

Насправді:

    Boolean({});
    // true

---

❌ Перевіряти масив просто через:

    if (items)

Це перевіряє існування array, а не наявність елементів.

Для кількості:

    if (items.length > 0) {
        ...
    }

---

❌ Робити надто багато вкладених `if`.

Замість:

    if (user) {
        if (user.isActive) {
            if (user.hasAccess) {
                // ...
            }
        }
    }

можна використовувати:

    if (!user) {
        return;
    }

    if (!user.isActive) {
        return;
    }

    if (!user.hasAccess) {
        return;
    }

---

❌ Зловживати ternary.

Ternary добре підходить для простого вибору:

    const status = age >= 18 ? "Adult" : "Minor";

Для складної логіки краще:

    if
    else if
    else

---

❌ Забувати `break` у `switch`.

Без `break` можливий fall-through.

---

❌ Використовувати `||`, коли потрібно перевіряти тільки `null` / `undefined`.

Наприклад:

    const count = 0 || 10;
    // 10

Якщо `0` є валідним значенням:

    const count = 0 ?? 10;
    // 0

---

# Питання зі співбесіди

Що таке conditional statement?

Що таке `if`?

Для чого використовується `else`?

Для чого використовується `else if`?

Як JavaScript обробляє кілька `else if`?

Що таке comparison operators?

Яка різниця між `==` та `===`?

Яка різниця між `!=` та `!==`?

Що таке logical AND `&&`?

Що таке logical OR `||`?

Що робить оператор `!`?

Що таке truthy?

Що таке falsy?

Які значення є falsy у JavaScript?

Чому `[]` є truthy?

Чому `{}` є truthy?

Що таке nested condition?

Що таке ternary operator?

Коли краще використовувати ternary?

Що таке `switch`?

Для чого потрібен `break`?

Що таке fall-through у `switch`?

Для чого потрібен `default`?

Що таке short-circuit evaluation?

Як працює `&&` у JavaScript?

Як працює `||` у JavaScript?

Яка різниця між `||` та `??`?

Для чого потрібен optional chaining `?.`?

Що таке guard clause?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке condition.

`if`.

`else`.

`else if`.

Comparison operators:

    >
    <
    >=
    <=
    ===
    !==

Logical operators:

    &&
    ||
    !

Truthy / falsy.

Основні falsy values.

Умови з `number`.

Умови з `string`.

Умови з `boolean`.

Ternary operator.

Основи `switch`.

`case`.

`break`.

`default`.

---

🔵 Junior

Розуміння `==` та `===`.

Розуміння `!=` та `!==`.

Multiple conditions.

Nested conditions.

Operator precedence.

Short-circuit evaluation.

`&&` як умовний виклик.

`||` як fallback.

Nullish coalescing `??`.

Optional chaining `?.`.

Умови з objects.

Умови з arrays.

Перевірка `array.length`.

Guard clauses.

Читабельне комбінування умов.

---

🟠 Middle

Глибоке розуміння type coercion в умовах.

Abstract Equality Comparison.

Strict Equality Comparison.

Logical operators як expressions.

Short-circuit evaluation.

Truthy / falsy semantics.

Nullish coalescing semantics.

Optional chaining semantics.

Conditional expressions.

Guard clauses.

Reducing nested conditions.

Early returns.

Decision-making patterns.

Управління складністю умов.

---

🔴 Senior

ECMAScript specification semantics для conditional evaluation.

Abstract operations:

    ToBoolean
    ToNumeric
    ToString

Evaluation of logical expressions.

Short-circuit evaluation semantics.

Operator precedence та associativity.

Control-flow analysis.

Branch complexity.

Cyclomatic complexity.

Decision tables.

State-based decision logic.

Pattern matching concepts.

Refactoring complex conditional logic.

Trade-offs між:

    if / else
    switch
    ternary
    logical operators
    lookup objects
    polymorphism

---

# Міні-шпаргалка

## Основна структура

    if (condition) {
        // true
    } else {
        // false
    }

---

## Кілька умов

    if (condition1) {
        // ...
    } else if (condition2) {
        // ...
    } else {
        // ...
    }

---

## Comparison

    a > b
    a < b
    a >= b
    a <= b
    a === b
    a !== b

---

## Logical

    a && b
    a || b
    !a

---

## AND

    true  && true  → true
    true  && false → false
    false && true  → false
    false && false → false

---

## OR

    true  || true  → true
    true  || false → true
    false || true  → true
    false || false → false

---

## NOT

    !true  → false
    !false → true

---

## Ternary

    condition
        ? valueIfTrue
        : valueIfFalse

Наприклад:

    const status = age >= 18
        ? "Adult"
        : "Minor";

---

## switch

    switch (value) {
        case 1:
            // ...
            break;

        case 2:
            // ...
            break;

        default:
            // ...
    }

---

## Truthy / Falsy

Falsy:

    false
    0
    -0
    0n
    ""
    null
    undefined
    NaN

Truthy:

    "hello"
    1
    -1
    []
    {}
    true

---

## || vs ??

    0 || 10
    // 10

    0 ?? 10
    // 0

    null || 10
    // 10

    null ?? 10
    // 10

---

## Optional chaining

    user.address?.city

Якщо `address` відсутній:

    undefined

Разом з `??`:

    const city = user.address?.city ?? "Unknown";

---

## Guard clause

    function processUser(user) {
        if (!user) {
            return;
        }

        // main logic
    }

---

# Головне:

• `if` дозволяє виконувати код залежно від умови.

• `else` виконується, коли `if` є falsy.

• `else if` дозволяє перевіряти додаткові умови.

• Умови можуть повертати або містити будь-які значення, які оцінюються як truthy або falsy.

• Для порівняння в сучасному JavaScript переважно використовувати:

    ===
    !==

• Основні comparison operators:

    >
    <
    >=
    <=
    ===
    !==

• Основні logical operators:

    &&
    ||
    !

• `&&` вимагає truthy значення з обох боків.

• `||` повертає/використовує перше truthy значення.

• `!` інвертує boolean context.

• Falsy values:

    false
    0
    -0
    0n
    ""
    null
    undefined
    NaN

• `[]` та `{}` є truthy.

• Ternary operator підходить для простого умовного вибору.

• `switch` зручний для кількох точних варіантів одного значення.

• `break` запобігає небажаному fall-through у `switch`.

• `??` перевіряє саме `null` та `undefined`.

• `?.` дозволяє безпечно звертатися до потенційно відсутніх властивостей.

• Guard clauses допомагають уникати глибокої вкладеності.

• Основна логіка:

    condition
        ↓
    truthy? ── yes → execute
        │
        no
        ↓
    alternative

• Для читабельного коду важливо не тільки правильно написати умову, а й зробити її легкою для розуміння.