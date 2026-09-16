# 01. Number Basics

Numbers (`числа`) — це primitive data type у JavaScript, який використовується для представлення числових значень.

Numbers використовуються, коли потрібно:

- зберігати цілі числа;
- зберігати дробові числа;
- виконувати арифметичні операції;
- порівнювати числові значення;
- працювати з фінансовими та статистичними даними;
- виконувати математичні обчислення;
- працювати з відстанями, часом, кількістю, цінами тощо.

У JavaScript основним числовим типом є:

    number

Для дуже великих цілих чисел також існує окремий тип:

    bigint

`BigInt` розглядатиметься окремо у:

    04-numbers-and-math/11-bigint

---

# Ключові поняття

✔ `number`  
✔ integer  
✔ floating-point number  
✔ positive number  
✔ negative number  
✔ zero  
✔ `NaN`  
✔ `Infinity`  
✔ `-Infinity`  
✔ `Number`  
✔ `Number.MAX_VALUE`  
✔ `Number.MIN_VALUE`  
✔ `Number.MAX_SAFE_INTEGER`  
✔ `Number.MIN_SAFE_INTEGER`  
✔ `Number.EPSILON`  
✔ decimal  
✔ hexadecimal  
✔ binary  
✔ octal  
✔ arithmetic operators  
✔ remainder `%`  
✔ exponentiation `**`  
✔ `typeof`  
✔ numeric literal  
✔ floating-point precision  
✔ safe integer  

---

# Що потрібно пам'ятати

• У JavaScript звичайні числа мають тип:

    number

• JavaScript використовує один тип `number` і для цілих, і для дробових чисел.

    10
    25
    -5
    3.14
    -0.5

усі мають тип:

    number

• `typeof` повертає `"number"` для звичайних чисел.

    typeof 42;

Результат:

    "number"

• JavaScript numbers реалізовані за стандартом IEEE 754 double-precision floating point.

• Через floating-point representation деякі десяткові дроби не можуть бути представлені точно.

• `NaN` означає:

    Not-a-Number

але при цьому його тип:

    number

• `Infinity` також має тип:

    number

• `Number.MAX_SAFE_INTEGER` визначає найбільше ціле число, яке можна точно представляти та порівнювати як safe integer.

• Для дуже великих цілих чисел використовується:

    BigInt

• Числа можна записувати в різних системах числення:

    decimal
    binary
    octal
    hexadecimal

---

# Number

`number` — primitive data type JavaScript для числових значень.

Наприклад:

    const age = 56;
    const price = 19.99;
    const temperature = -5;

Усі вони мають тип:

    number

Перевірка:

    console.log(typeof age);
    console.log(typeof price);
    console.log(typeof temperature);

Результат:

    "number"
    "number"
    "number"

---

# Integer

Integer — ціле число без дробової частини.

Приклади:

    0
    1
    10
    100
    -5
    -100

Наприклад:

    const count = 10;
    const year = 2026;
    const temperature = -5;

---

# Floating-Point Number

Floating-point number — число з дробовою частиною.

Приклади:

    3.14
    0.5
    -1.25
    99.99

Наприклад:

    const price = 19.99;
    const height = 1.75;
    const temperature = -2.5;

Тип:

    typeof 3.14;

Результат:

    "number"

---

# Integer vs Floating-Point

JavaScript не має окремого типу:

    integer

і окремого типу:

    float

Обидва представлені типом:

    number

Наприклад:

    const a = 10;
    const b = 10.5;

    console.log(typeof a);
    console.log(typeof b);

Результат:

    "number"
    "number"

---

# Positive Numbers

Додатні числа:

    1
    10
    100
    3.14

Наприклад:

    const balance = 100;
    const price = 25.5;

---

# Negative Numbers

Від'ємні числа записуються зі знаком `-`.

    -1
    -10
    -3.14

Наприклад:

    const temperature = -10;

---

# Zero

Нуль також є числом:

    0

Перевірка:

    typeof 0;

Результат:

    "number"

У JavaScript також існує:

    -0

Наприклад:

    const zero = -0;

    console.log(zero);
    console.log(typeof zero);

Результат:

    -0
    "number"

У більшості звичайних операцій `0` та `-0` поводяться однаково, але в деяких випадках різницю можна побачити:

    Object.is(0, -0);

Результат:

    false

---

# Numeric Literals

Numeric literal — числове значення, записане безпосередньо в коді.

Наприклад:

    const age = 56;
    const price = 19.99;
    const temperature = -5;

Тут:

    56
    19.99
    -5

є numeric literals.

---

# Decimal Numbers

Звичайний запис чисел використовує десяткову систему.

Наприклад:

    const a = 10;
    const b = 25.5;
    const c = 1000;

Основа:

    10

---

# Number Separators

У сучасному JavaScript можна використовувати `_` для покращення читабельності великих чисел.

Наприклад:

    const population = 1_000_000;

Це те саме, що:

    const population = 1000000;

Ще приклад:

    const price = 1_299_999;

`_` не змінює числове значення.

    1_000_000 === 1000000

Результат:

    true

---

# Arithmetic Operators

Основні арифметичні оператори:

    +   addition
    -   subtraction
    *   multiplication
    /   division
    %   remainder
    **  exponentiation

---

# Addition

Додавання:

    const result = 10 + 5;

Результат:

    15

---

# Subtraction

Віднімання:

    const result = 10 - 5;

Результат:

    5

---

# Multiplication

Множення:

    const result = 10 * 5;

Результат:

    50

---

# Division

Ділення:

    const result = 10 / 5;

Результат:

    2

---

# Division with Floating-Point Result

Результатом ділення може бути дробове число.

    const result = 10 / 4;

Результат:

    2.5

---

# Division by Zero

У JavaScript ділення числа на `0` не створює помилку типу `Error`.

Наприклад:

    console.log(10 / 0);

Результат:

    Infinity

А:

    console.log(-10 / 0);

Результат:

    -Infinity

А:

    console.log(0 / 0);

Результат:

    NaN

---

# Remainder `%`

Оператор `%` повертає остачу від ділення.

Наприклад:

    const result = 10 % 3;

Результат:

    1

Тому що:

    10 = 3 × 3 + 1

Ще приклади:

    10 % 2
    // 0

    10 % 4
    // 2

    15 % 5
    // 0

---

# Перевірка парності

Оператор `%` часто використовується для перевірки парних і непарних чисел.

Парне число:

    number % 2 === 0

Наприклад:

    const number = 10;

    console.log(number % 2 === 0);

Результат:

    true

Непарне:

    const number = 7;

    console.log(number % 2 === 0);

Результат:

    false

---

# Exponentiation `**`

Оператор `**` використовується для піднесення до степеня.

    2 ** 3

Результат:

    8

Тому що:

    2 × 2 × 2 = 8

Ще приклади:

    5 ** 2
    // 25

    10 ** 3
    // 1000

---

# Negative Numbers and Operators

Можна виконувати арифметичні операції з від'ємними числами.

    const a = -10;
    const b = 5;

    console.log(a + b);
    console.log(a - b);
    console.log(a * b);
    console.log(a / b);

Результат:

    -5
    -15
    -50
    -2

---

# Operator Precedence

JavaScript має правила пріоритету арифметичних операторів.

Наприклад:

    const result = 2 + 3 * 4;

Результат:

    14

Спочатку:

    3 * 4

потім:

    2 + 12

Отже:

    14

---

# Parentheses

Дужки дозволяють явно визначити порядок обчислень.

    const result = (2 + 3) * 4;

Результат:

    20

Без дужок:

    2 + 3 * 4

Результат:

    14

З дужками:

    (2 + 3) * 4

Результат:

    20

---

# Основний порядок арифметики

У спрощеному вигляді:

    ()
    ↓
    **
    ↓
    * / %
    ↓
    + -

Наприклад:

    const result = 2 + 3 * 4 ** 2;

Спочатку:

    4 ** 2

потім:

    3 * 16

потім:

    2 + 48

Результат:

    50

---

# Increment

Increment збільшує число на `1`.

    let count = 5;

    count++;

    console.log(count);

Результат:

    6

Те саме:

    count = count + 1;

або:

    count += 1;

---

# Decrement

Decrement зменшує число на `1`.

    let count = 5;

    count--;

    console.log(count);

Результат:

    4

Те саме:

    count = count - 1;

або:

    count -= 1;

---

# Assignment Operators

З числами часто використовуються скорочені оператори присвоєння.

    +=
    -=
    *=
    /=
    %=

Наприклад:

    let score = 10;

    score += 5;

Те саме:

    score = score + 5;

Результат:

    15

---

# `*=`

    let number = 10;

    number *= 3;

Те саме:

    number = number * 3;

Результат:

    30

---

# `/=`

    let number = 20;

    number /= 4;

Те саме:

    number = number / 4;

Результат:

    5

---

# `%=`

    let number = 10;

    number %= 3;

Те саме:

    number = number % 3;

Результат:

    1

---

# Number Comparison

Числа можна порівнювати операторами:

    >
    <
    >=
    <=
    ===
    !==

Наприклад:

    10 > 5
    // true

    10 < 5
    // false

    10 === 10
    // true

    10 !== 5
    // true

---

# Strict Equality

Для порівняння чисел зазвичай використовують:

    ===

Наприклад:

    const age = 56;

    console.log(age === 56);

Результат:

    true

---

# Number vs String

Потрібно пам'ятати, що:

    10

і:

    "10"

це різні типи.

    typeof 10;
    // "number"

    typeof "10";
    // "string"

Тому:

    10 === "10"

Результат:

    false

---

# Addition and Strings

Оператор `+` має особливу поведінку, якщо один з операндів є string.

    10 + 5

Результат:

    15

А:

    "10" + 5

Результат:

    "105"

Тому що `+` у цьому випадку виконує string concatenation.

Ще приклад:

    "5" + "5"

Результат:

    "55"

---

# Інші арифметичні оператори та String

Інші оператори можуть виконувати numeric conversion.

Наприклад:

    "10" - 5

Результат:

    5

    "10" * 2

Результат:

    20

    "10" / 2

Результат:

    5

Це одна з причин, чому потрібно чітко розуміти різницю між:

    number
    string

та numeric conversion.

Детальніше:

    04-numbers-and-math/02-number-conversion

---

# NaN

`NaN` означає:

    Not-a-Number

`NaN` виникає, коли математична операція не може отримати коректне числове значення.

Наприклад:

    Number("hello");

Результат:

    NaN

Ще:

    0 / 0

Результат:

    NaN

---

# Тип NaN

Незважаючи на назву `Not-a-Number`, `NaN` має тип:

    number

Наприклад:

    typeof NaN;

Результат:

    "number"

Це важливий факт JavaScript.

---

# NaN не дорівнює NaN

Це важлива особливість.

    NaN === NaN

Результат:

    false

Також:

    NaN == NaN

Результат:

    false

Для перевірки `NaN` краще використовувати:

    Number.isNaN()

Наприклад:

    Number.isNaN(NaN);

Результат:

    true

---

# Infinity

`Infinity` — спеціальне числове значення, яке представляє нескінченність.

Наприклад:

    10 / 0

Результат:

    Infinity

Тип:

    typeof Infinity;

Результат:

    "number"

---

# -Infinity

Існує також негативна нескінченність:

    -Infinity

Наприклад:

    -10 / 0

Результат:

    -Infinity

---

# Перевірка Infinity

Можна використовувати:

    Number.isFinite()

Наприклад:

    Number.isFinite(100);

Результат:

    true

А:

    Number.isFinite(Infinity);

Результат:

    false

---

# Finite Number

Finite number — звичайне скінченне число.

Наприклад:

    10
    -5
    3.14
    0

Ці значення є finite.

    Number.isFinite(10);
    // true

    Number.isFinite(-5);
    // true

    Number.isFinite(3.14);
    // true

---

# Number Constants

Об'єкт `Number` містить важливі числові константи.

Наприклад:

    Number.MAX_VALUE
    Number.MIN_VALUE
    Number.MAX_SAFE_INTEGER
    Number.MIN_SAFE_INTEGER
    Number.EPSILON
    Number.POSITIVE_INFINITY
    Number.NEGATIVE_INFINITY
    Number.NaN

---

# Number.MAX_VALUE

`Number.MAX_VALUE` — найбільше скінченне число, яке може бути представлене типом `number`.

    console.log(Number.MAX_VALUE);

Це дуже велике число приблизно:

    1.7976931348623157e+308

Важливо:

`MAX_VALUE` не означає найбільше safe integer.

Це різні поняття.

---

# Number.MIN_VALUE

`Number.MIN_VALUE` — найменше додатне ненульове число, яке може бути представлено JavaScript `number`.

Приблизно:

    5e-324

Важливо:

`MIN_VALUE` — це не найбільше за модулем негативне число і не "найменше число" у звичайному математичному сенсі.

Це саме:

    smallest positive non-zero value

---

# MAX_VALUE vs MAX_SAFE_INTEGER

Не плутати:

    Number.MAX_VALUE

та:

    Number.MAX_SAFE_INTEGER

`MAX_VALUE` стосується максимального magnitude звичайного `number`.

`MAX_SAFE_INTEGER` стосується найбільшого цілого числа, яке можна точно представляти як safe integer.

---

# Number.MAX_SAFE_INTEGER

    Number.MAX_SAFE_INTEGER

Приблизно:

    9007199254740991

або:

    2 ** 53 - 1

Перевірка:

    Number.MAX_SAFE_INTEGER === 2 ** 53 - 1

Результат:

    true

---

# Number.MIN_SAFE_INTEGER

Найменше safe integer:

    Number.MIN_SAFE_INTEGER

Значення:

    -9007199254740991

або:

    -(2 ** 53 - 1)

---

# Safe Integer

Safe integer — ціле число, яке JavaScript може точно представляти та безпечно порівнювати в межах safe integer range.

Діапазон:

    -9007199254740991
    до
    9007199254740991

Тобто:

    Number.MIN_SAFE_INTEGER
    ≤ number ≤
    Number.MAX_SAFE_INTEGER

---

# Number.isSafeInteger()

Для перевірки використовується:

    Number.isSafeInteger()

Наприклад:

    Number.isSafeInteger(100);

Результат:

    true

А:

    Number.isSafeInteger(Number.MAX_SAFE_INTEGER);

Результат:

    true

За межами safe range:

    Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1);

Результат:

    false

---

# Чому Safe Integer важливий

Через floating-point representation JavaScript не може точно представляти всі дуже великі цілі числа.

Наприклад:

    Number.MAX_SAFE_INTEGER + 1

і:

    Number.MAX_SAFE_INTEGER + 2

можуть мати однакове числове представлення.

Тому для великих цілих чисел потрібно розглядати:

    BigInt

---

# Number.EPSILON

`Number.EPSILON` — дуже маленька різниця між `1` та наступним representable number, більшим за `1`.

Наприклад:

    console.log(Number.EPSILON);

Приблизно:

    2.220446049250313e-16

`Number.EPSILON` часто згадується у зв'язку з floating-point precision.

Наприклад:

    0.1 + 0.2 === 0.3

Результат:

    false

Тому що:

    0.1 + 0.2

може бути представлено приблизно як:

    0.30000000000000004

Детальніше це розглядатиметься у:

    04-numbers-and-math/09-floating-point-and-precision

---

# Scientific Notation

JavaScript дозволяє записувати великі або дуже маленькі числа у scientific notation.

Наприклад:

    1e3

означає:

    1000

Тому:

    1e3 === 1000

Результат:

    true

---

# Scientific Notation Examples

    1e2
    // 100

    1e3
    // 1000

    1e6
    // 1000000

    2.5e3
    // 2500

---

# Negative Exponent

Можна використовувати від'ємний exponent.

    1e-3

Результат:

    0.001

Ще:

    5e-2

Результат:

    0.05

---

# Decimal System

Звичайний числовий запис:

    42

означає число в десятковій системі.

Основа:

    10

---

# Binary Numbers

Binary — двійкова система числення.

Для запису binary literal використовується:

    0b

Наприклад:

    const number = 0b1010;

Це:

    10

У десятковій системі.

Перевірка:

    console.log(number);

Результат:

    10

---

# Binary Example

    const a = 0b101;
    const b = 0b10;

    console.log(a);
    console.log(b);

Результат:

    5
    2

---

# Octal Numbers

Octal — вісімкова система числення.

Для сучасного numeric literal використовується:

    0o

Наприклад:

    const number = 0o10;

Результат:

    8

---

# Hexadecimal Numbers

Hexadecimal — шістнадцяткова система числення.

Використовується prefix:

    0x

Наприклад:

    const number = 0xFF;

Результат:

    255

---

# Number Bases

JavaScript підтримує literals:

    Decimal:
    42

    Binary:
    0b101010

    Octal:
    0o52

    Hexadecimal:
    0x2A

Усі ці значення представляють одне число:

    42

Наприклад:

    42 === 0b101010

Результат:

    true

Також:

    42 === 0o52

Результат:

    true

І:

    42 === 0x2A

Результат:

    true

---

# Number as Primitive

Число є primitive value.

Наприклад:

    const age = 56;

`age` містить primitive number value.

---

# Number Object

JavaScript також має об'єкт-конструктор:

    Number

Наприклад:

    Number("123")

може виконувати conversion.

Але:

    new Number(123)

створює object wrapper.

    const value = new Number(123);

    console.log(typeof value);

Результат:

    "object"

Зазвичай не потрібно створювати числа через:

    new Number()

Краще використовувати primitive:

    const value = 123;

---

# Primitive Number vs Number Object

Primitive:

    const number = 123;

    typeof number;

Результат:

    "number"

Object:

    const number = new Number(123);

    typeof number;

Результат:

    "object"

У сучасному JavaScript зазвичай потрібно використовувати primitive values.

Тобто:

    const number = 123;

а не:

    const number = new Number(123);

---

# Number.isNaN()

Перевірка, чи значення є саме `NaN`:

    Number.isNaN(value)

Наприклад:

    Number.isNaN(NaN);

Результат:

    true

А:

    Number.isNaN(10);

Результат:

    false

Важлива особливість:

    Number.isNaN("hello");

Результат:

    false

Тому що `"hello"` — це string, а не `NaN`.

---

# Number.isFinite()

Перевіряє, чи значення є finite number.

    Number.isFinite(100);

Результат:

    true

    Number.isFinite(Infinity);

Результат:

    false

    Number.isFinite(NaN);

Результат:

    false

    Number.isFinite("100");

Результат:

    false

`Number.isFinite()` не виконує implicit conversion string у number.

---

# Number.isInteger()

Перевіряє, чи значення є integer.

    Number.isInteger(10);

Результат:

    true

    Number.isInteger(10.5);

Результат:

    false

    Number.isInteger(-5);

Результат:

    true

---

# Integer Examples

    Number.isInteger(0);
    // true

    Number.isInteger(10);
    // true

    Number.isInteger(-10);
    // true

    Number.isInteger(10.5);
    // false

    Number.isInteger(3.14);
    // false

---

# Number.isSafeInteger()

Перевіряє, чи є значення safe integer.

    Number.isSafeInteger(100);

Результат:

    true

    Number.isSafeInteger(10.5);

Результат:

    false

Тому що `10.5` не є integer.

---

# isNaN() vs Number.isNaN()

Глобальна функція:

    isNaN()

може виконувати type conversion.

Наприклад:

    isNaN("hello");

Результат:

    true

А:

    isNaN("10");

Результат:

    false

Тому що `"10"` може бути перетворено на number.

`Number.isNaN()` суворіший:

    Number.isNaN("hello");

Результат:

    false

    Number.isNaN(NaN);

Результат:

    true

Для сучасного коду зазвичай краще чітко використовувати:

    Number.isNaN()

коли потрібно перевірити саме `NaN`.

---

# isFinite() vs Number.isFinite()

Глобальний:

    isFinite("10");

Результат:

    true

Тому що `"10"` конвертується в number.

А:

    Number.isFinite("10");

Результат:

    false

`Number.isFinite()` не виконує implicit conversion.

---

# Numeric Limits

Корисно розрізняти кілька понять.

### Найбільше finite number

    Number.MAX_VALUE

### Найменше positive non-zero number

    Number.MIN_VALUE

### Найбільше safe integer

    Number.MAX_SAFE_INTEGER

### Найменше safe integer

    Number.MIN_SAFE_INTEGER

### Precision threshold

    Number.EPSILON

---

# Типові арифметичні задачі

## Сума

    const a = 10;
    const b = 20;

    const result = a + b;

Результат:

    30

---

## Різниця

    const a = 20;
    const b = 10;

    const result = a - b;

Результат:

    10

---

## Добуток

    const a = 10;
    const b = 5;

    const result = a * b;

Результат:

    50

---

## Частка

    const a = 20;
    const b = 5;

    const result = a / b;

Результат:

    4

---

## Остача

    const a = 17;
    const b = 5;

    const result = a % b;

Результат:

    2

---

## Степінь

    const base = 2;
    const exponent = 5;

    const result = base ** exponent;

Результат:

    32

---

# Практичний приклад — ціна

    const price = 100;
    const quantity = 3;

    const total = price * quantity;

    console.log(total);

Результат:

    300

---

# Практичний приклад — знижка

    const price = 1000;
    const discount = 20;

    const discountAmount = price * discount / 100;
    const finalPrice = price - discountAmount;

    console.log(discountAmount);
    console.log(finalPrice);

Результат:

    200
    800

---

# Практичний приклад — температура

    const celsius = 25;

    const fahrenheit = celsius * 9 / 5 + 32;

    console.log(fahrenheit);

Результат:

    77

---

# Практичний приклад — середнє значення

    const a = 10;
    const b = 20;
    const c = 30;

    const average = (a + b + c) / 3;

Результат:

    20

---

# Практичний приклад — парність

    const number = 42;

    if (number % 2 === 0) {
        console.log("Even");
    } else {
        console.log("Odd");
    }

Результат:

    Even

---

# Практичний приклад — позитивне чи негативне

    const number = -10;

    if (number > 0) {
        console.log("Positive");
    } else if (number < 0) {
        console.log("Negative");
    } else {
        console.log("Zero");
    }

Результат:

    Negative

---

# Практичний приклад — counter

    let count = 0;

    count++;
    count++;
    count++;

    console.log(count);

Результат:

    3

---

# Практичний приклад — накопичення

    let total = 0;

    total += 10;
    total += 20;
    total += 30;

    console.log(total);

Результат:

    60

---

# Типові помилки

❌ Плутати `number` і `string`.

    const age = "56";

Це:

    string

а не:

    number

---

❌ Використовувати `==` замість `===` без необхідності.

    10 == "10"

Результат:

    true

А:

    10 === "10"

Результат:

    false

Для передбачуваного коду зазвичай використовують:

    ===
    !==

---

❌ Забувати про особливу поведінку `+`.

    "10" + 5

Результат:

    "105"

а не:

    15

---

❌ Вважати, що `NaN` дорівнює `NaN`.

    NaN === NaN

Результат:

    false

Правильно:

    Number.isNaN(NaN)

---

❌ Вважати, що `NaN` має тип `"NaN"`.

    typeof NaN

Результат:

    "number"

---

❌ Плутати `MAX_VALUE` і `MAX_SAFE_INTEGER`.

    Number.MAX_VALUE

та:

    Number.MAX_SAFE_INTEGER

вирішують різні задачі.

---

❌ Вважати, що всі цілі числа можна безпечно представляти як `number`.

Safe integer range обмежений:

    -9007199254740991
    ...
    9007199254740991

Для дуже великих integer values існує:

    BigInt

---

❌ Очікувати математичної точності для всіх decimal calculations.

Наприклад:

    0.1 + 0.2

може дати:

    0.30000000000000004

Це пов'язано з floating-point representation.

---

❌ Створювати Number objects без потреби.

Не рекомендується:

    const number = new Number(10);

Зазвичай краще:

    const number = 10;

---

# Number vs BigInt

Звичайний `number` підходить для більшості повсякденних обчислень:

    const age = 56;
    const price = 19.99;
    const count = 1000;

Для дуже великих цілих чисел можна використовувати:

    BigInt

Наприклад:

    const bigNumber = 9007199254740993n;

Важливо:

    number
    BigInt

— це різні типи.

Не можна безпосередньо змішувати їх у звичайній арифметичній операції.

Наприклад:

    10n + 5

спричинить `TypeError`.

`BigInt` детальніше:

    11-bigint

---

# Number and Math

`number` — це тип даних.

`Math` — вбудований об'єкт із математичними функціями та константами.

Наприклад:

    Math.round()
    Math.floor()
    Math.ceil()
    Math.trunc()
    Math.abs()
    Math.min()
    Math.max()
    Math.pow()
    Math.sqrt()
    Math.random()

Ці методи розглядаються у наступних темах:

    04-math-round-floor-ceil-trunc
    05-math-abs-min-max
    06-math-pow-sqrt
    07-random-numbers
    08-random-numbers-and-ranges

---

# Числа та змінні

Числа можна зберігати в:

    const

або:

    let

Наприклад:

    const price = 100;

Якщо значення потрібно змінювати:

    let score = 0;

    score += 10;
    score += 20;

    console.log(score);

Результат:

    30

`const` не дозволяє переприсвоїти змінну:

    const price = 100;

    price = 200;

Це викличе:

    TypeError

---

# Number Expressions

Числове expression може складатися з:

    values
    variables
    operators
    parentheses

Наприклад:

    const price = 100;
    const quantity = 3;

    const total = price * quantity;

Expression:

    price * quantity

повертає:

    300

---

# Числові expressions

    10 + 5
    10 - 5
    10 * 5
    10 / 5
    10 % 3
    2 ** 4

Результати:

    15
    5
    50
    2
    1
    16

---

# Числа у умовах

Numbers часто використовуються в `if`.

    const age = 20;

    if (age >= 18) {
        console.log("Adult");
    }

---

# Truthy and Falsy Numbers

У boolean context:

    0

є falsy.

Інші звичайні числові значення, включно з від'ємними, є truthy.

Наприклад:

    Boolean(0);

Результат:

    false

А:

    Boolean(10);

Результат:

    true

    Boolean(-10);

Результат:

    true

---

# NaN у Boolean Context

`NaN` також є falsy.

    Boolean(NaN);

Результат:

    false

Тому:

    if (NaN) {
        ...
    }

умова не виконається.

---

# Infinity у Boolean Context

`Infinity` є truthy.

    Boolean(Infinity);

Результат:

    true

Так само:

    Boolean(-Infinity);

Результат:

    true

---

# Числові falsy values

Для `number` основні falsy values:

    0
    -0
    NaN

Інші звичайні numbers є truthy.

---

# Перетворення Number у Boolean

    Boolean(0);
    // false

    Boolean(1);
    // true

    Boolean(-1);
    // true

    Boolean(0.5);
    // true

    Boolean(NaN);
    // false

    Boolean(Infinity);
    // true

---

# Number as Array Index

Numbers часто використовуються як indexes масиву.

    const fruits = ["apple", "banana", "orange"];

    console.log(fruits[0]);
    console.log(fruits[1]);
    console.log(fruits[2]);

Результат:

    apple
    banana
    orange

Index має числове значення:

    0
    1
    2

---

# Number and Array Length

Властивість:

    length

повертає number.

    const fruits = ["apple", "banana", "orange"];

    console.log(fruits.length);

Результат:

    3

---

# Числа у циклах

Numbers часто використовуються як counter.

    for (let i = 0; i < 5; i++) {
        console.log(i);
    }

Результат:

    0
    1
    2
    3
    4

Це буде детально розглядатися у:

    01-basics/04-loops

---

# Корисні Number Methods

Основні статичні методи `Number`:

    Number.isNaN()
    Number.isFinite()
    Number.isInteger()
    Number.isSafeInteger()
    Number.parseInt()
    Number.parseFloat()

Також важливі властивості:

    Number.MAX_VALUE
    Number.MIN_VALUE
    Number.MAX_SAFE_INTEGER
    Number.MIN_SAFE_INTEGER
    Number.EPSILON
    Number.POSITIVE_INFINITY
    Number.NEGATIVE_INFINITY
    Number.NaN

`parseInt()` та `parseFloat()` детальніше розглядатимуться у:

    02-number-conversion

---

# Корисні глобальні властивості

JavaScript також має глобальні:

    NaN
    Infinity

Наприклад:

    console.log(NaN);
    console.log(Infinity);

---

# Числові перевірки

Корисний набір:

    Number.isNaN(value)
    Number.isFinite(value)
    Number.isInteger(value)
    Number.isSafeInteger(value)

Наприклад:

    const value = 100;

    console.log(Number.isNaN(value));
    console.log(Number.isFinite(value));
    console.log(Number.isInteger(value));
    console.log(Number.isSafeInteger(value));

Результат:

    false
    true
    true
    true

---

# Практичний Pattern — перевірка числа

Якщо потрібно прийняти тільки finite number:

    const value = 100;

    if (Number.isFinite(value)) {
        console.log("Valid number");
    }

---

# Практичний Pattern — перевірка integer

    const value = 10;

    if (Number.isInteger(value)) {
        console.log("Integer");
    }

---

# Практичний Pattern — перевірка safe integer

    const value = 100;

    if (Number.isSafeInteger(value)) {
        console.log("Safe integer");
    }

---

# Practical Examples

### Приклад 1 — basic number

    const age = 56;

    console.log(age);
    console.log(typeof age);

Результат:

    56
    "number"

---

### Приклад 2 — decimal

    const price = 19.99;

    console.log(price);
    console.log(typeof price);

Результат:

    19.99
    "number"

---

### Приклад 3 — negative number

    const temperature = -5;

    console.log(temperature);

Результат:

    -5

---

### Приклад 4 — arithmetic

    const a = 20;
    const b = 5;

    console.log(a + b);
    console.log(a - b);
    console.log(a * b);
    console.log(a / b);

Результат:

    25
    15
    100
    4

---

### Приклад 5 — remainder

    const number = 17;

    console.log(number % 5);

Результат:

    2

---

### Приклад 6 — exponentiation

    const number = 2;

    console.log(number ** 4);

Результат:

    16

---

### Приклад 7 — even number

    const number = 24;

    console.log(number % 2 === 0);

Результат:

    true

---

### Приклад 8 — NaN

    const result = 0 / 0;

    console.log(result);
    console.log(typeof result);

Результат:

    NaN
    "number"

---

### Приклад 9 — Infinity

    const result = 10 / 0;

    console.log(result);
    console.log(typeof result);

Результат:

    Infinity
    "number"

---

### Приклад 10 — Number.isNaN()

    const value = NaN;

    console.log(Number.isNaN(value));

Результат:

    true

---

### Приклад 11 — Number.isFinite()

    console.log(Number.isFinite(100));
    console.log(Number.isFinite(Infinity));

Результат:

    true
    false

---

### Приклад 12 — Number.isInteger()

    console.log(Number.isInteger(10));
    console.log(Number.isInteger(10.5));

Результат:

    true
    false

---

### Приклад 13 — Number.isSafeInteger()

    console.log(
        Number.isSafeInteger(100)
    );

Результат:

    true

---

### Приклад 14 — binary

    const number = 0b1010;

    console.log(number);

Результат:

    10

---

### Приклад 15 — hexadecimal

    const number = 0xFF;

    console.log(number);

Результат:

    255

---

### Приклад 16 — octal

    const number = 0o10;

    console.log(number);

Результат:

    8

---

### Приклад 17 — numeric separator

    const population = 1_000_000;

    console.log(population);

Результат:

    1000000

---

### Приклад 18 — scientific notation

    const number = 1e6;

    console.log(number);

Результат:

    1000000

---

### Приклад 19 — average

    const a = 10;
    const b = 20;
    const c = 30;

    const average = (a + b + c) / 3;

    console.log(average);

Результат:

    20

---

### Приклад 20 — percentage

    const total = 500;
    const part = 125;

    const percentage = part / total * 100;

    console.log(percentage);

Результат:

    25

---

# Типові Number Patterns

## Sum

    const a = 10;
    const b = 20;

    const sum = a + b;

---

## Difference

    const difference = a - b;

---

## Product

    const product = a * b;

---

## Quotient

    const quotient = a / b;

---

## Remainder

    const remainder = a % b;

---

## Power

    const power = a ** b;

---

## Even

    number % 2 === 0

---

## Odd

    number % 2 !== 0

---

## Positive

    number > 0

---

## Negative

    number < 0

---

## Zero

    number === 0

---

## Integer

    Number.isInteger(number)

---

## Finite

    Number.isFinite(number)

---

## NaN

    Number.isNaN(number)

---

## Safe Integer

    Number.isSafeInteger(number)

---

# Питання зі співбесіди

Що таке `number` у JavaScript?

Чи існують окремі типи `integer` та `float` у JavaScript?

Який тип має `10`?

Який тип має `10.5`?

Який тип має `NaN`?

Який тип має `Infinity`?

Що таке `NaN`?

Чому `NaN === NaN` повертає `false`?

Як перевірити `NaN`?

Чим `Number.isNaN()` відрізняється від глобального `isNaN()`?

Що таке `Infinity`?

Що відбувається при діленні числа на `0`?

Що відбувається при `0 / 0`?

Що таке remainder operator `%`?

Як перевірити, чи число парне?

Що робить оператор `**`?

Який порядок виконання арифметичних операторів?

Для чого використовуються дужки в математичних expressions?

Що таке numeric literal?

Що таке integer?

Що таке floating-point number?

Що таке `Number.MAX_VALUE`?

Що таке `Number.MIN_VALUE`?

Що таке `Number.MAX_SAFE_INTEGER`?

Що таке `Number.MIN_SAFE_INTEGER`?

Що таке safe integer?

Як перевірити safe integer?

Що таке `Number.EPSILON`?

Чому `0.1 + 0.2 !== 0.3`?

Що таке `BigInt`?

Коли потрібно використовувати `BigInt`?

Яка різниця між `number` і `BigInt`?

Що таке binary number?

Як записати binary literal?

Що таке hexadecimal number?

Як записати hexadecimal literal?

Що таке octal number?

Як записати octal literal?

Для чого використовується `_` у числових literals?

Що таке scientific notation?

Чим `number` відрізняється від `new Number()`?

Чому зазвичай не потрібно використовувати `new Number()`?

Що робить `Number.isFinite()`?

Що робить `Number.isInteger()`?

Що робить `Number.isSafeInteger()`?

Чим `Number.isFinite()` відрізняється від глобального `isFinite()`?

Чим `Number.isNaN()` відрізняється від глобального `isNaN()`?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке:

    number
    integer
    floating-point number

Основні arithmetic operators:

    +
    -
    *
    /
    %
    **

Розуміти:

    addition
    subtraction
    multiplication
    division
    remainder
    exponentiation

Знати:

    operator precedence
    parentheses
    increment
    decrement
    +=
    -=
    *=
    /=
    %=

Розуміти:

    positive numbers
    negative numbers
    zero

Знати:

    NaN
    Infinity
    -Infinity

Розуміти:

    typeof number
    typeof NaN
    typeof Infinity

Знати:

    Number.isNaN()
    Number.isFinite()
    Number.isInteger()

Розуміти:

    number vs string

Знати основи:

    Number.MAX_VALUE
    Number.MIN_VALUE
    Number.MAX_SAFE_INTEGER
    Number.MIN_SAFE_INTEGER

Розуміти:

    safe integer
    floating-point number

---

🔵 Junior

Впевнено працювати з:

    arithmetic expressions
    remainder
    exponentiation
    comparison
    numeric conditions

Розуміти:

    NaN
    Infinity
    finite numbers

Знати:

    Number.isNaN()
    Number.isFinite()
    Number.isInteger()
    Number.isSafeInteger()

Розуміти:

    MAX_VALUE
    MIN_VALUE
    MAX_SAFE_INTEGER
    MIN_SAFE_INTEGER
    EPSILON

Знати numeric literals:

    decimal
    binary
    octal
    hexadecimal

Знати:

    numeric separators
    scientific notation

Розуміти різницю:

    number
    Number object
    BigInt

Розуміти базові floating-point limitations.

Вміти вирішувати прості практичні задачі:

    sum
    average
    percentage
    remainder
    even / odd
    positive / negative
    counters
    basic calculations

---

🟠 Middle

Глибше розуміти:

    IEEE 754
    double-precision floating point
    binary representation of numbers
    precision limitations
    rounding errors

Розуміти:

    Number.EPSILON
    safe integer range
    numeric overflow
    Infinity
    NaN propagation

Розуміти різницю між:

    Number.MAX_VALUE
    Number.MAX_SAFE_INTEGER

Розуміти:

    numeric coercion
    arithmetic with mixed types
    number vs string
    number vs BigInt

Вміти проектувати:

    numeric validation
    precision-sensitive calculations
    safe numeric operations

Знати:

    Number.parseInt()
    Number.parseFloat()

та правила їх використання.

---

🔴 Senior

Глибоке розуміння:

    IEEE 754
    binary floating-point representation
    sign bit
    exponent
    significand
    rounding modes
    precision limits

Розуміння:

    floating-point arithmetic
    ULP
    numerical stability
    catastrophic cancellation
    overflow
    underflow
    NaN propagation
    Infinity propagation

Глибоке розуміння:

    safe integers
    BigInt
    Number
    decimal arithmetic limitations

Розуміння trade-offs між:

    Number
    BigInt
    decimal libraries
    integer-based representations

Розуміння performance та memory implications числових операцій.

Для звичайної frontend/backend JavaScript-практики ці теми не є щоденним мінімумом, але вони корисні для спеціалізованих numerical applications.

---

# Міні-шпаргалка

## Number

    const number = 42;

    typeof number;

Результат:

    "number"

---

## Integer

    10
    -10
    0

---

## Floating-point

    10.5
    3.14
    -0.25

---

## Addition

    10 + 5
    // 15

---

## Subtraction

    10 - 5
    // 5

---

## Multiplication

    10 * 5
    // 50

---

## Division

    10 / 5
    // 2

---

## Remainder

    10 % 3
    // 1

---

## Exponentiation

    2 ** 3
    // 8

---

## Increment

    i++;

Те саме:

    i += 1;

---

## Decrement

    i--;

Те саме:

    i -= 1;

---

## Even

    number % 2 === 0

---

## Odd

    number % 2 !== 0

---

## NaN

    typeof NaN;

Результат:

    "number"

Перевірка:

    Number.isNaN(value)

---

## Infinity

    10 / 0
    // Infinity

---

## Finite

    Number.isFinite(value)

---

## Integer

    Number.isInteger(value)

---

## Safe Integer

    Number.isSafeInteger(value)

---

## Maximum Safe Integer

    Number.MAX_SAFE_INTEGER

Значення:

    9007199254740991

---

## Minimum Safe Integer

    Number.MIN_SAFE_INTEGER

Значення:

    -9007199254740991

---

## Maximum Number

    Number.MAX_VALUE

---

## Minimum Positive Number

    Number.MIN_VALUE

---

## Precision

    0.1 + 0.2

Може дати:

    0.30000000000000004

---

## Binary

    0b1010
    // 10

---

## Octal

    0o10
    // 8

---

## Hexadecimal

    0xFF
    // 255

---

## Numeric Separator

    1_000_000

---

## Scientific Notation

    1e6
    // 1000000

---

## Number vs String

    typeof 10;
    // "number"

    typeof "10";
    // "string"

---

## Strict Comparison

    10 === 10
    // true

    10 === "10"
    // false

---

## Number Checks

    Number.isNaN(value)
    Number.isFinite(value)
    Number.isInteger(value)
    Number.isSafeInteger(value)

---

# Основні правила

    number
        ↓
    основний числовий тип JavaScript

    integer
        ↓
    ціле число

    floating-point
        ↓
    число з дробовою частиною

    %
        ↓
    remainder

    **
        ↓
    exponentiation

    NaN
        ↓
    invalid numeric result

    Infinity
        ↓
    нескінченне числове значення

    Number.isInteger()
        ↓
    перевірка integer

    Number.isFinite()
        ↓
    перевірка finite number

    Number.isNaN()
        ↓
    перевірка NaN

    Number.isSafeInteger()
        ↓
    перевірка safe integer

---

# Головне:

• JavaScript має один основний числовий primitive type:

    number

• `number` використовується і для integer, і для floating-point values.

• Приклади:

    10
    -5
    3.14
    0.5

усі мають тип:

    number

• Основні арифметичні оператори:

    +   addition
    -   subtraction
    *   multiplication
    /   division
    %   remainder
    **  exponentiation

• `%` повертає остачу від ділення.

• `% 2` часто використовується для визначення парності:

    number % 2 === 0

• `**` використовується для піднесення до степеня.

• Дужки дозволяють явно визначити порядок арифметичних операцій.

• `NaN` означає `Not-a-Number`, але:

    typeof NaN === "number"

• `NaN` не дорівнює самому собі:

    NaN === NaN
    // false

• Для перевірки `NaN` краще використовувати:

    Number.isNaN()

• Ділення ненульового числа на `0` дає:

    Infinity

або:

    -Infinity

• `0 / 0` дає:

    NaN

• `Number.isFinite()` перевіряє finite number.

• `Number.isInteger()` перевіряє integer.

• `Number.isSafeInteger()` перевіряє safe integer.

• `Number.MAX_SAFE_INTEGER`:

    9007199254740991

• `Number.MIN_SAFE_INTEGER`:

    -9007199254740991

• `Number.MAX_VALUE` і `Number.MAX_SAFE_INTEGER` — це різні поняття.

• `Number.MIN_VALUE` — найменше додатне ненульове число, а не "найменше integer".

• JavaScript numbers використовують floating-point representation.

• Через це деякі десяткові обчислення можуть мати похибку:

    0.1 + 0.2
    // 0.30000000000000004

• `Number.EPSILON` пов'язаний із precision floating-point numbers.

• Для дуже великих цілих чисел потрібно розглядати:

    BigInt

• Числа можна записувати в різних системах:

    decimal
    binary
    octal
    hexadecimal

• Prefixes:

    0b → binary
    0o → octal
    0x → hexadecimal

• `_` можна використовувати для читабельності великих numeric literals:

    1_000_000

• Scientific notation:

    1e6
    // 1000000

• Не потрібно плутати:

    number
    "number"

Перший — number, другий — string.

• Оператор `+` може виконувати не тільки addition, а й string concatenation:

    "10" + 5
    // "105"

• `number` — primitive value.

• `new Number(10)` створює object і зазвичай не потрібен у звичайному JavaScript-коді.

• Основний практичний набір для роботи з numbers:

    Number.isNaN()
    Number.isFinite()
    Number.isInteger()
    Number.isSafeInteger()

• Наступні теми поглиблюють роботу з числами:

    02-number-conversion
    03-number-methods
    04-math-round-floor-ceil-trunc
    05-math-abs-min-max
    06-math-pow-sqrt
    07-random-numbers
    08-random-numbers-and-ranges
    09-floating-point-and-precision
    10-number-formatting
    11-bigint
    12-numbers-project