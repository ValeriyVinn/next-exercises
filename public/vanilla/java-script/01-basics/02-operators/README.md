# 02. Operators

Оператори JavaScript — це спеціальні символи або ключові слова, які виконують операції над значеннями.

Наприклад:

    const sum = 10 + 5;

Тут:

    10
    5
    ↓
    operands

    +
    ↓
    operator

    15
    ↓
    result

Оператори використовуються для:

- виконання математичних операцій;
- присвоєння значень;
- порівняння значень;
- перевірки умов;
- роботи з boolean;
- об'єднання рядків;
- перевірки типів;
- виконання логічних операцій;
- роботи з об'єктами та властивостями.

---

# Ключові поняття

✔ operator  
✔ operand  
✔ expression  
✔ arithmetic operators  
✔ assignment operators  
✔ comparison operators  
✔ equality  
✔ strict equality  
✔ loose equality  
✔ relational operators  
✔ logical operators  
✔ unary operators  
✔ binary operators  
✔ ternary operator  
✔ increment  
✔ decrement  
✔ remainder  
✔ exponentiation  
✔ nullish coalescing  
✔ optional chaining  
✔ `typeof`  
✔ `in`  
✔ `instanceof`  
✔ operator precedence  
✔ short-circuit evaluation  

---

# Що потрібно пам'ятати

• Оператор виконує операцію над одним або декількома operands.

• Expression — вираз, який обчислюється та повертає значення.

• Арифметичні оператори виконують математичні операції.

• Assignment operators присвоюють значення.

• Comparison operators повертають `true` або `false`.

• `===` порівнює значення та тип без неявного перетворення.

• `==` може виконувати type coercion.

• Для більшості сучасного коду переважно використовувати `===` та `!==`.

• `&&`, `||` та `??` використовують short-circuit evaluation.

• `!` змінює boolean-значення на протилежне.

• `++` збільшує значення на `1`.

• `--` зменшує значення на `1`.

• `?:` — ternary operator.

• `?.` — optional chaining.

• `??` — nullish coalescing.

• `=` — це assignment, а не порівняння.

---

# Operator та Operand

Operand — значення, над яким виконується операція.

    10 + 5

Тут:

    10 → operand
    +  → operator
    5  → operand

Результат:

    15

---

# Unary Operators

Unary operator працює з одним operand.

Наприклад:

    const age = 25;

    -age;

Оператор `-` працює з одним значенням.

Інші приклади:

    !value
    typeof value
    ++count
    --count

---

# Binary Operators

Binary operator працює з двома operands.

    10 + 5

Тут:

    10 → operand
    +  → operator
    5  → operand

Приклади:

    10 + 5
    10 - 5
    10 * 5
    10 / 5
    10 === 5
    10 > 5

---

# Ternary Operator

Ternary operator працює з трьома частинами:

    condition ? valueIfTrue : valueIfFalse

Наприклад:

    const age = 20;

    const status = age >= 18
        ? "adult"
        : "minor";

Результат:

    "adult"

Структура:

    condition
        │
        ├── true  → valueIfTrue
        │
        └── false → valueIfFalse

Ternary operator часто використовується для простих умов.

Не варто створювати складні вкладені ternary expressions, якщо вони погіршують читабельність.

---

# Expression

Expression — це код, який обчислюється та повертає значення.

Наприклад:

    10 + 5

Результат:

    15

Інші expressions:

    age > 18

    user.name

    typeof value

    isActive && isAdmin

    condition ? "yes" : "no"

Наприклад:

    const result = 10 + 5;

`10 + 5` — expression.

---

# Arithmetic Operators

Арифметичні оператори використовуються для математичних операцій.

Основні:

    +
    -
    *
    /
    %
    **
    ++
    --

---

# Addition `+`

Додавання:

    10 + 5;
    // 15

Змінні:

    const a = 10;
    const b = 5;

    const result = a + b;
    // 15

---

### `+` та Strings

Оператор `+` також використовується для об'єднання рядків.

    "Hello" + " " + "World";

Результат:

    "Hello World"

Якщо один із operands є string, `+` може виконувати string concatenation.

    "5" + 2;
    // "52"

    2 + "5";
    // "25"

Тому потрібно пам'ятати про type coercion.

---

# Subtraction `-`

Віднімання:

    10 - 5;
    // 5

Приклад:

    const price = 100;
    const discount = 20;

    const result = price - discount;
    // 80

`-` працює як numeric operator та може виконувати implicit conversion.

    "10" - 2;
    // 8

---

# Multiplication `*`

Множення:

    10 * 5;
    // 50

Приклад:

    const price = 20;
    const quantity = 3;

    const total = price * quantity;
    // 60

---

# Division `/`

Ділення:

    10 / 2;
    // 5

Приклад:

    const total = 100;
    const people = 4;

    const result = total / people;
    // 25

Ділення на нуль:

    10 / 0;
    // Infinity

---

# Remainder `%`

Оператор `%` повертає залишок від ділення.

    10 % 3;
    // 1

    10 % 2;
    // 0

Наприклад, перевірка парності:

    const number = 10;

    number % 2 === 0;
    // true

Непарне число:

    const number = 7;

    number % 2 !== 0;
    // true

---

# Exponentiation `**`

Піднесення до степеня:

    2 ** 3;
    // 8

Тому що:

    2 × 2 × 2 = 8

Приклади:

    5 ** 2;
    // 25

    10 ** 3;
    // 1000

---

# Increment `++`

Збільшує значення на `1`.

    let count = 0;

    count++;

    console.log(count);
    // 1

Ще:

    count++;
    // 2

---

# Decrement `--`

Зменшує значення на `1`.

    let count = 5;

    count--;

    console.log(count);
    // 4

---

# Prefix та Postfix

`++` та `--` можуть бути prefix або postfix.

### Prefix

    let count = 5;

    ++count;
    // 6

Спочатку значення змінюється, потім використовується.

### Postfix

    let count = 5;

    count++;
    // 5

У expression спочатку використовується старе значення, потім збільшується.

Приклад:

    let count = 5;

    const result = count++;

    console.log(result);
    // 5

    console.log(count);
    // 6

Prefix:

    let count = 5;

    const result = ++count;

    console.log(result);
    // 6

    console.log(count);
    // 6

Для читабельності краще не зловживати складними expressions з `++` та `--`.

---

# Assignment Operator `=`

`=` присвоює значення змінній.

    let age = 25;

Тут:

    age ← 25

Це не порівняння.

❌ Неправильно думати:

    age = 25

означає:

    age equals 25

У JavaScript це означає:

    assign 25 to age

---

# Assignment Operators

Основні assignment operators:

    =
    +=
    -=
    *=
    /=
    %=
    **=

---

# `+=`

    let count = 10;

    count += 5;

Еквівалент:

    count = count + 5;

Результат:

    15

---

# `-=`

    let count = 10;

    count -= 3;

Еквівалент:

    count = count - 3;

Результат:

    7

---

# `*=`

    let price = 10;

    price *= 3;

Еквівалент:

    price = price * 3;

Результат:

    30

---

# `/=`

    let price = 100;

    price /= 4;

Еквівалент:

    price = price / 4;

Результат:

    25

---

# `%=`

    let number = 10;

    number %= 3;

Еквівалент:

    number = number % 3;

Результат:

    1

---

# `**=`

    let number = 2;

    number **= 3;

Еквівалент:

    number = number ** 3;

Результат:

    8

---

# Comparison Operators

Comparison operators порівнюють значення та повертають:

    true
    false

Основні:

    ===
    !==
    ==
    !=
    >
    <
    >=
    <=

---

# Strict Equality `===`

`===` перевіряє:

    value
    +
    type

Приклади:

    5 === 5;
    // true

    5 === "5";
    // false

Тому що:

    5    → number
    "5"  → string

Типи різні.

---

# Strict Inequality `!==`

`!==` означає "не строго дорівнює".

    5 !== 10;
    // true

    5 !== "5";
    // true

    5 !== 5;
    // false

---

# Loose Equality `==`

`==` порівнює значення з можливим type coercion.

    5 == "5";
    // true

JavaScript перед порівнянням може перетворити типи.

Наприклад:

    0 == false;
    // true

    "" == false;
    // true

Це може створювати неочевидну поведінку.

У сучасному JavaScript зазвичай рекомендується:

    ===

замість:

    ==

---

# Loose Inequality `!=`

`!=` — loose inequality.

    5 != 10;
    // true

Через type coercion можливі неочевидні результати:

    5 != "5";
    // false

Тому в сучасному коді переважно використовують:

    !==

---

# `>` Greater Than

Більше:

    10 > 5;
    // true

    5 > 10;
    // false

---

# `<` Less Than

Менше:

    5 < 10;
    // true

    10 < 5;
    // false

---

# `>=` Greater Than or Equal

Більше або дорівнює:

    10 >= 10;
    // true

    10 >= 5;
    // true

    5 >= 10;
    // false

---

# `<=` Less Than or Equal

Менше або дорівнює:

    5 <= 5;
    // true

    5 <= 10;
    // true

    10 <= 5;
    // false

---

# Comparison Table

    5 === 5
    // true

    5 === "5"
    // false

    5 == "5"
    // true

    5 !== "5"
    // true

    10 > 5
    // true

    10 < 5
    // false

    10 >= 10
    // true

    5 <= 10
    // true

---

# Logical Operators

Logical operators використовуються для роботи з умовами та boolean logic.

Основні:

    &&
    ||
    !

Також у сучасному JavaScript:

    ??

---

# Logical AND `&&`

`&&` означає логічне AND.

Для boolean:

    true && true;
    // true

    true && false;
    // false

    false && true;
    // false

    false && false;
    // false

Результат `true` тільки якщо обидві умови `true`.

---

### Приклад

    const age = 25;
    const hasTicket = true;

    age >= 18 && hasTicket;
    // true

---

# Logical OR `||`

`||` означає логічне OR.

Для boolean:

    true || true;
    // true

    true || false;
    // true

    false || true;
    // true

    false || false;
    // false

Результат `false` тільки якщо обидві умови `false`.

---

### Приклад

    const isAdmin = false;
    const isModerator = true;

    isAdmin || isModerator;
    // true

---

# Logical NOT `!`

`!` інвертує boolean result.

    !true;
    // false

    !false;
    // true

Приклад:

    const isActive = true;

    !isActive;
    // false

---

# Double NOT `!!`

`!!` часто використовується для перетворення значення на boolean.

    !!"hello";
    // true

    !!0;
    // false

    !!null;
    // false

Це працює через два застосування `!`.

    !"hello"
    // false

    !!"hello"
    // true

Для явного перетворення часто читабельніше:

    Boolean(value)

---

# Short-Circuit Evaluation

`&&` та `||` можуть повертати не тільки boolean.

Вони повертають одне зі своїх operands.

Наприклад:

    const result = "hello" && "world";

Результат:

    "world"

Для `&&`:

    left && right

Якщо `left` falsy, `right` не обчислюється.

---

### Приклад

    false && console.log("Hello");

`console.log()` не виконається.

---

# `||` Short-Circuit

`||` повертає перше truthy значення.

    const result = "" || "default";

Результат:

    "default"

Інший приклад:

    const name = userName || "Guest";

Якщо `userName` falsy, використовується:

    "Guest"

Але потрібно пам'ятати, що `||` вважає falsy також:

    0
    ""
    false
    NaN

Якщо це небажано, часто краще використовувати `??`.

---

# Nullish Coalescing `??`

`??` повертає праву частину тільки якщо ліва частина:

    null
    undefined

Наприклад:

    const name = null ?? "Guest";

Результат:

    "Guest"

Але:

    const count = 0 ?? 10;

Результат:

    0

Тому:

    ?? → null або undefined

а:

    || → будь-яке falsy value

---

# `||` vs `??`

Порівняння:

    0 || 10;
    // 10

    0 ?? 10;
    // 0

Ще:

    "" || "default";
    // "default"

    "" ?? "default";
    // ""

Ще:

    false || true;
    // true

    false ?? true;
    // false

Тому:

    || → fallback для falsy
    ?? → fallback тільки для null / undefined

---

# Optional Chaining `?.`

Optional chaining дозволяє безпечно звертатися до властивості, якщо об'єкт може бути `null` або `undefined`.

Без `?.`:

    const user = null;

    user.name;
    // TypeError

З `?.`:

    const user = null;

    user?.name;
    // undefined

---

### Nested properties

    const user = {
        profile: {
            name: "John"
        }
    };

    user?.profile?.name;
    // "John"

Якщо `profile` відсутній:

    user?.profile?.name;
    // undefined

---

### Optional method call

    user.sayHello?.();

Якщо `sayHello` існує — метод буде викликано.

Якщо немає — результат буде `undefined`.

---

### Optional array access

    users?.[0];

Це корисно, якщо `users` може бути `null` або `undefined`.

---

# `typeof` Operator

`typeof` повертає рядок із типом значення.

    typeof "hello";
    // "string"

    typeof 42;
    // "number"

    typeof true;
    // "boolean"

    typeof undefined;
    // "undefined"

    typeof null;
    // "object"

    typeof {};
    // "object"

    typeof [];
    // "object"

    typeof function () {};
    // "function"

---

# `delete` Operator

`delete` видаляє властивість об'єкта.

    const user = {
        name: "John",
        age: 25
    };

    delete user.age;

Після цього:

    user.age;
    // undefined

`delete` працює з властивостями об'єктів.

---

# `in` Operator

`in` перевіряє, чи існує властивість у об'єкті або його prototype chain.

    const user = {
        name: "John"
    };

    "name" in user;
    // true

    "age" in user;
    // false

Зверніть увагу:

    "name" in user

а не:

    name in user

---

# `instanceof` Operator

`instanceof` перевіряє, чи належить object до prototype chain певного constructor.

    const numbers = [1, 2, 3];

    numbers instanceof Array;
    // true

Приклад:

    const date = new Date();

    date instanceof Date;
    // true

---

# Unary Plus `+`

Unary `+` перетворює значення на number.

    +"42";
    // 42

    +"3.14";
    // 3.14

    +true;
    // 1

    +false;
    // 0

    +"hello";
    // NaN

Для читабельності явне перетворення часто зрозуміліше:

    Number("42");

---

# Unary Minus `-`

Unary `-` перетворює значення на number та змінює знак.

    -10;
    // -10

    -"10";
    // -10

    -true;
    // -1

    -false;
    // -0

---

# Operator Precedence

Якщо expression містить декілька операторів, JavaScript використовує правила precedence.

Наприклад:

    2 + 3 * 4;

Результат:

    14

Спочатку:

    3 * 4
    // 12

Потім:

    2 + 12
    // 14

Множення має вищий precedence, ніж додавання.

---

# Parentheses

Для явного визначення порядку використовують `()`.

    (2 + 3) * 4;
    // 20

Без дужок:

    2 + 3 * 4;
    // 14

З дужками:

    (2 + 3) * 4;
    // 20

Рекомендація:

Якщо precedence може бути неочевидним, використовуйте дужки.

---

# Основні правила precedence

Спрощено:

    ()
    ↓
    **
    ↓
    * / %
    ↓
    + -
    ↓
    < > <= >=
    ↓
    === !==
    ↓
    &&
    ↓
    ||
    ↓
    ??
    ↓
    ?:
    ↓
    assignment

Це спрощена шпаргалка, а не повна таблиця precedence ECMAScript.

---

# Assignment має низький precedence

Наприклад:

    const result = 2 + 3 * 4;

Спочатку обчислюється:

    3 * 4

Потім:

    2 + 12

Потім результат присвоюється:

    result = 14

---

# Associativity

Associativity визначає порядок обчислення операторів однакового precedence.

Наприклад:

    10 - 5 - 2;

Обчислюється зліва направо:

    (10 - 5) - 2
    // 3

Для деяких операторів порядок інший.

Наприклад:

    2 ** 3 ** 2;

Exponentiation є right-associative:

    2 ** (3 ** 2)

Тобто:

    2 ** 9
    // 512

Для складних expressions краще використовувати дужки.

---

# String Operators

Оператор `+` може об'єднувати strings.

    const firstName = "John";
    const lastName = "Smith";

    const fullName = firstName + " " + lastName;

Результат:

    "John Smith"

Також можна використовувати `+=`:

    let message = "Hello";

    message += " World";

Результат:

    "Hello World"

Сучасний альтернативний спосіб:

    const message = `Hello ${name}`;

---

# Comparison Strings

Strings можна порівнювати.

    "apple" === "apple";
    // true

    "apple" === "banana";
    // false

Рядки також можна порівнювати через:

    <
    >
    <=
    >=

Наприклад:

    "apple" < "banana";
    // true

Порівняння рядків базується на правилах Unicode / lexical ordering.

---

# Boolean Expressions

Comparison operators часто створюють boolean expression.

    const age = 25;

    age >= 18;
    // true

Такі expressions можна використовувати в:

    if
    while
    ternary
    logical operators

Наприклад:

    if (age >= 18) {
        console.log("Adult");
    }

---

# Combining Conditions

Умови можна комбінувати.

    const age = 25;
    const hasTicket = true;

    age >= 18 && hasTicket;
    // true

Ще:

    const isAdmin = false;
    const isModerator = true;

    isAdmin || isModerator;
    // true

---

# Negating Conditions

Можна заперечити умову через `!`.

    const age = 15;

    !(age >= 18);
    // true

Або:

    const isLoggedIn = false;

    !isLoggedIn;
    // true

---

# Strict Comparison — Recommendation

Для сучасного JavaScript базове правило:

    ===
    !==

замість:

    ==
    !=

Наприклад:

    const age = 18;

    age === 18;
    // true

    age !== 20;
    // true

Це робить порівняння більш передбачуваним.

---

# `==` та `===`

Порівняння:

    5 == "5";
    // true

    5 === "5";
    // false

Причина:

    ==  → допускає type coercion
    === → не допускає type coercion

Тому:

    === → recommended default
    ==  → використовувати лише свідомо

---

# Особливості `NaN`

`NaN` має особливу поведінку.

    NaN === NaN;
    // false

    NaN == NaN;
    // false

Для перевірки:

    Number.isNaN(value);

Наприклад:

    Number.isNaN(NaN);
    // true

---

# Особливості `Object.is()`

`Object.is()` схожий на strict equality, але має деякі відмінності.

Наприклад:

    Object.is(NaN, NaN);
    // true

Тоді як:

    NaN === NaN;
    // false

Ще одна відмінність:

    Object.is(0, -0);
    // false

    0 === -0;
    // true

На початковому рівні достатньо знати:

    ===       → стандартне strict comparison
    Object.is → спеціальне порівняння identity/value semantics

---

# Logical Operator Return Values

Важливо: `&&` та `||` не обов'язково повертають `true` або `false`.

Наприклад:

    "hello" && "world";
    // "world"

    "" && "world";
    // ""

Для `||`:

    "" || "hello";
    // "hello"

    "hello" || "world";
    // "hello"

Тому ці оператори часто використовуються для вибору значення.

---

# Default Values

Старий поширений pattern:

    const name = userName || "Guest";

Але якщо `userName` може бути:

    ""
    0
    false

це також буде замінено на `"Guest"`.

Якщо потрібно перевіряти тільки:

    null
    undefined

краще:

    const name = userName ?? "Guest";

---

# Optional Chaining + Nullish Coalescing

Ці оператори часто використовуються разом.

    const name = user?.profile?.name ?? "Guest";

Логіка:

    user
      ↓
    profile
      ↓
    name
      ↓
    якщо null / undefined
      ↓
    "Guest"

Це дуже поширений pattern у сучасному JavaScript.

---

# Operator Categories

Основні категорії:

    Arithmetic
        +
        -
        *
        /
        %
        **
        ++
        --

    Assignment
        =
        +=
        -=
        *=
        /=
        %=
        **=

    Comparison
        ===
        !==
        ==
        !=
        >
        <
        >=
        <=

    Logical
        &&
        ||
        !

    Nullish
        ??

    Optional chaining
        ?.

    Conditional
        ?:

    Type / object
        typeof
        instanceof
        in

    Unary
        +
        -
        !
        typeof
        delete
        ++
        --

---

# Практичні приклади

## Приклад 1 — Arithmetic

    const price = 100;
    const quantity = 3;

    const total = price * quantity;

    console.log(total);
    // 300

---

## Приклад 2 — Remainder

    const number = 10;

    console.log(number % 2);
    // 0

    console.log(number % 3);
    // 1

---

## Приклад 3 — Assignment

    let score = 0;

    score += 10;
    score += 5;

    console.log(score);
    // 15

---

## Приклад 4 — Comparison

    const age = 25;

    console.log(age >= 18);
    // true

---

## Приклад 5 — Strict Equality

    const age = 25;

    console.log(age === 25);
    // true

    console.log(age === "25");
    // false

---

## Приклад 6 — Logical AND

    const age = 25;
    const hasTicket = true;

    const canEnter = age >= 18 && hasTicket;

    console.log(canEnter);
    // true

---

## Приклад 7 — Logical OR

    const isAdmin = false;
    const isModerator = true;

    const canManage = isAdmin || isModerator;

    console.log(canManage);
    // true

---

## Приклад 8 — NOT

    const isLoggedIn = false;

    console.log(!isLoggedIn);
    // true

---

## Приклад 9 — Ternary

    const age = 20;

    const status = age >= 18
        ? "adult"
        : "minor";

    console.log(status);
    // "adult"

---

## Приклад 10 — Nullish Coalescing

    const username = null;

    const displayName = username ?? "Guest";

    console.log(displayName);
    // "Guest"

---

## Приклад 11 — Optional Chaining

    const user = {
        profile: {
            name: "John"
        }
    };

    const name = user?.profile?.name;

    console.log(name);
    // "John"

---

## Приклад 12 — Optional Chaining + Nullish

    const user = null;

    const name = user?.profile?.name ?? "Guest";

    console.log(name);
    // "Guest"

---

## Приклад 13 — Complex Expression

    const price = 100;
    const quantity = 2;
    const discount = 10;

    const total = price * quantity - discount;

    console.log(total);
    // 190

---

## Приклад 14 — Parentheses

    const result = (10 + 5) * 2;

    console.log(result);
    // 30

Без дужок:

    const result = 10 + 5 * 2;

    console.log(result);
    // 20

---

# Типові помилки

❌ Плутати `=` та `===`.

    age = 18;

це assignment.

    age === 18;

це comparison.

---

❌ Використовувати `==`, не розуміючи type coercion.

    5 == "5";
    // true

Краще:

    5 === "5";
    // false

---

❌ Думати, що `&&` завжди повертає boolean.

    "hello" && "world";
    // "world"

---

❌ Думати, що `||` перевіряє тільки `null` / `undefined`.

    0 || 10;
    // 10

Для nullish fallback:

    0 ?? 10;
    // 0

---

❌ Забувати про `typeof null`.

    typeof null;
    // "object"

---

❌ Не враховувати precedence.

    2 + 3 * 4;
    // 14

Якщо потрібен інший порядок:

    (2 + 3) * 4;
    // 20

---

❌ Створювати занадто складні expressions.

Наприклад, замість дуже довгого:

    const result = condition1 && condition2 || condition3 && condition4
        ? value1
        : value2;

краще розбити логіку на зрозумілі змінні.

---

❌ Зловживати вкладеними ternary operators.

Краще:

    const status = isAdmin
        ? "admin"
        : isModerator
            ? "moderator"
            : "user";

замінити складною умовною логікою через `if` або окремі змінні, якщо це покращує читабельність.

---

# Рекомендації

### Для чисел

Використовуй:

    +
    -
    *
    /
    %
    **

---

### Для присвоєння

Основне:

    =

Для зміни:

    +=
    -=
    *=
    /=
    %=

---

### Для порівняння

Переважно:

    ===
    !==

---

### Для умов

Використовуй:

    &&
    ||
    !

---

### Для default values

Якщо потрібна перевірка falsy:

    ||

Якщо потрібна перевірка тільки:

    null
    undefined

використовуй:

    ??

---

### Для безпечного доступу

Якщо значення може бути `null` або `undefined`:

    ?.

---

### Для простих умов

Можна використовувати:

    ?:

---

### Для перевірки типу

Використовуй:

    typeof

---

### Для перевірки array

Не:

    typeof value === "array"

Правильно:

    Array.isArray(value);

---

# Шлях

🟢 Core (обов'язково знати)

Арифметичні оператори:

    +
    -
    *
    /
    %
    **

Assignment:

    =
    +=
    -=
    *=
    /=
    %=

Comparison:

    ===
    !==
    >
    <
    >=
    <=

Logical:

    &&
    ||
    !

Ternary:

    ?:

Основи:

    typeof
    ++
    --

Розуміти:

    expression
    operand
    operator
    precedence

---

🔵 Junior

`==` та `!=`.

Type coercion у comparisons.

Short-circuit evaluation.

    &&
    ||

Nullish coalescing:

    ??

Optional chaining:

    ?.

Unary operators.

Prefix / postfix:

    ++value
    value++

Operator precedence.

Operator associativity.

`in`.

`instanceof`.

`delete`.

Робота з strings через:

    +
    +=

---

🟠 Middle

Глибше розуміння:

    ===
    ==
    !==
    !=

Type coercion rules.

Abstract Equality Comparison.

Strict Equality Comparison.

`Object.is()`.

Short-circuit evaluation.

Logical operators як value-returning expressions.

Nullish coalescing semantics.

Optional chaining semantics.

Operator precedence та associativity.

Evaluation order.

Side effects.

Expressions vs statements.

---

🔴 Senior

ECMAScript specification semantics.

Abstract operations.

ToPrimitive.

ToBoolean.

ToNumber.

ToString.

Strict Equality Comparison.

Abstract Equality Comparison.

Relational comparison.

Logical operator evaluation semantics.

Reference Records.

GetValue / PutValue.

Evaluation order.

Operator semantics у specification.

Side effects та evaluation order.

Performance implications.

Engine optimization та deoptimization.

---

# Міні-шпаргалка

## Arithmetic

    +       addition
    -       subtraction
    *       multiplication
    /       division
    %       remainder
    **      exponentiation
    ++      increment
    --      decrement

---

## Assignment

    =       assignment
    +=      add and assign
    -=      subtract and assign
    *=      multiply and assign
    /=      divide and assign
    %=      remainder and assign
    **=     exponentiation and assign

---

## Comparison

    ===     strict equality
    !==     strict inequality
    ==      loose equality
    !=      loose inequality
    >       greater than
    <       less than
    >=      greater than or equal
    <=      less than or equal

Рекомендація:

    ===
    !==

---

## Logical

    &&      AND
    ||      OR
    !       NOT

---

## Nullish

    ??      null / undefined fallback

---

## Optional Chaining

    ?.      safe property access

---

## Conditional

    ?:

Приклад:

    age >= 18 ? "adult" : "minor"

---

## Type / Object

    typeof
    instanceof
    in

---

## Unary

    +
    -
    !
    typeof
    delete
    ++
    --

---

# `&&` vs `||` vs `??`

    value && fallback

→ повертає перше falsy або останнє value.

    value || fallback

→ повертає перше truthy value.

    value ?? fallback

→ fallback тільки для `null` або `undefined`.

---

# `=` vs `==` vs `===`

    =

→ assignment

    ==

→ loose equality + type coercion

    ===

→ strict equality

---

# `!` vs `!!`

    !value

→ invert boolean result.

    !!value

→ convert value to boolean.

Наприклад:

    !!"hello";
    // true

    !!0;
    // false

Альтернатива:

    Boolean(value);

---

# `++` Prefix vs Postfix

    ++count

→ increment, потім використовує значення.

    count++

→ використовує старе значення, потім increment.

---

# Основна таблиця

    10 + 5
    // 15

    10 - 5
    // 5

    10 * 5
    // 50

    10 / 5
    // 2

    10 % 3
    // 1

    2 ** 3
    // 8

    5 === 5
    // true

    5 === "5"
    // false

    5 == "5"
    // true

    10 > 5
    // true

    true && false
    // false

    true || false
    // true

    !true
    // false

    null ?? "default"
    // "default"

    0 ?? 10
    // 0

    null?.name
    // undefined

    typeof 42
    // "number"

---

# Головне

• Operator виконує операцію над одним або декількома operands.

• Expression — код, який обчислюється та повертає значення.

• Arithmetic operators:

    +
    -
    *
    /
    %
    **

• Assignment:

    =
    +=
    -=
    *=
    /=
    %=

• Comparison:

    ===
    !==
    ==
    !=
    >
    <
    >=
    <=

• У сучасному JavaScript переважно використовують:

    ===
    !==

• `=` — assignment, а не comparison.

• `+` може виконувати як arithmetic addition, так і string concatenation.

• `%` повертає remainder.

• `++` збільшує значення на `1`.

• `--` зменшує значення на `1`.

• `&&` — logical AND.

• `||` — logical OR.

• `!` — logical NOT.

• `&&` та `||` використовують short-circuit evaluation і можуть повертати operands, а не тільки boolean.

• `??` використовує fallback тільки для:

    null
    undefined

• `?.` дозволяє безпечно звертатися до властивостей, коли значення може бути `null` або `undefined`.

• `?:` — ternary operator.

• `typeof` перевіряє тип значення.

• `instanceof` перевіряє prototype relationship.

• `in` перевіряє наявність property.

• `delete` видаляє property об'єкта.

• Parentheses `()` дозволяють явно визначити порядок обчислення.

• Operator precedence визначає, який оператор виконується першим.

• Якщо порядок обчислення неочевидний — краще використовувати дужки.

• Для сучасного JavaScript корисно мислити операторами як інструментами роботи зі значеннями:

    arithmetic
        ↓
    assignment
        ↓
    comparison
        ↓
    logical
        ↓
    nullish / optional
        ↓
    conditional

• Основна практична шпаргалка:

    const total = price * quantity;

    age === 18;

    age >= 18 && hasTicket;

    isAdmin || isModerator;

    !isLoggedIn;

    username ?? "Guest";

    user?.profile?.name;

    condition ? valueA : valueB;