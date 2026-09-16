# 02. Number Conversion

Number conversion (перетворення чисел) — це процес перетворення значень з одного типу або формату в `number` та перетворення чисел в інші представлення.

У JavaScript найчастіше потрібно перетворити:

    string → number
    number → string
    boolean → number
    null → number
    undefined → number

Основні інструменти:

    Number()
    Number.parseInt()
    Number.parseFloat()
    parseInt()
    parseFloat()
    toString()
    String()
    unary +
    Number.isNaN()
    Number.isFinite()

Особливо важливо розуміти різницю між:

    Number()
    parseInt()
    parseFloat()

Вони можуть давати різні результати для одного й того самого string.

---

# Ключові поняття

✔ type conversion  
✔ type coercion  
✔ explicit conversion  
✔ implicit conversion  
✔ `Number()`  
✔ `Number.parseInt()`  
✔ `Number.parseFloat()`  
✔ `parseInt()`  
✔ `parseFloat()`  
✔ unary `+`  
✔ `String()`  
✔ `.toString()`  
✔ `NaN`  
✔ `Number.isNaN()`  
✔ `Number.isFinite()`  
✔ radix  
✔ integer conversion  
✔ floating-point conversion  
✔ whitespace  
✔ empty string  
✔ hexadecimal  
✔ binary  
✔ octal  
✔ numeric string  
✔ invalid numeric string  

---

# Що потрібно пам'ятати

• `Number(value)` намагається перетворити все значення на `number`.

• `parseInt(value)` читає integer з початку string.

• `parseFloat(value)` читає floating-point number з початку string.

• `Number("123")` повертає:

    123

• `Number("123.45")` повертає:

    123.45

• `Number("123px")` повертає:

    NaN

• `parseInt("123px", 10)` повертає:

    123

• `parseFloat("123.45px")` повертає:

    123.45

• `Number("")` повертає:

    0

• `Number("   ")` повертає:

    0

• `Number("hello")` повертає:

    NaN

• `Number(undefined)` повертає:

    NaN

• `Number(null)` повертає:

    0

• `Number(true)` повертає:

    1

• `Number(false)` повертає:

    0

• Для явного перетворення string у number часто використовують:

    Number(value)

або:

    +value

• Для перетворення number у string можна використовувати:

    String(value)

або:

    value.toString()

• `parseInt()` і `parseFloat()` не є повною заміною `Number()`.

• `parseInt()` використовує `radix`, якщо потрібно надійно визначити систему числення.

---

# Type Conversion

Type conversion — перетворення значення з одного типу в інший.

Наприклад:

    const value = "123";

    const number = Number(value);

Тут:

    string → number

---

# Explicit Conversion

Explicit conversion — явне перетворення типу програмістом.

Наприклад:

    const value = "123";

    const number = Number(value);

Ми явно сказали JavaScript:

    перетвори value у number

---

# Implicit Conversion

Implicit conversion — неявне перетворення, яке JavaScript виконує автоматично.

Наприклад:

    const result = "10" - 5;

JavaScript автоматично перетворює:

    "10"

на:

    10

Тому:

    result

дорівнює:

    5

---

# Explicit vs Implicit Conversion

Explicit:

    const number = Number("10");

Implicit:

    const result = "10" - 5;

У першому випадку conversion явно написаний у коді.

У другому JavaScript виконує conversion автоматично.

Для читабельності та передбачуваності коду часто краще явно контролювати conversion.

---

# Number()

`Number()` — основний інструмент для явного перетворення значення у `number`.

Синтаксис:

    Number(value)

---

# String → Number

Найпоширеніший випадок:

    const value = "123";

    const number = Number(value);

    console.log(number);
    console.log(typeof number);

Результат:

    123
    "number"

---

# Decimal String → Number

    const value = "123.45";

    const number = Number(value);

Результат:

    123.45

---

# Negative String → Number

    const value = "-42";

    const number = Number(value);

Результат:

    -42

---

# String with Whitespace

`Number()` ігнорує whitespace на початку та в кінці string.

    Number(" 123 ");

Результат:

    123

Також:

    Number("\n123\t");

Результат:

    123

---

# Empty String

Це важлива особливість:

    Number("");

Результат:

    0

Також:

    Number("   ");

Результат:

    0

Тому потрібно пам'ятати:

    empty string → 0

при використанні `Number()`.

---

# Invalid String

Якщо string не представляє коректне числове значення:

    Number("hello");

Результат:

    NaN

---

# Partially Numeric String

Наприклад:

    Number("123px");

Результат:

    NaN

`Number()` очікує, що весь string представлятиме число.

Це важлива відмінність від `parseInt()` та `parseFloat()`.

---

# Number("10") vs Number("10px")

    Number("10")
    // 10

    Number("10px")
    // NaN

Тобто:

    Number()
        ↓
    очікує повністю numeric string

---

# Boolean → Number

`Number()` може перетворити boolean.

    Number(true);

Результат:

    1

    Number(false);

Результат:

    0

---

# Null → Number

    Number(null);

Результат:

    0

---

# Undefined → Number

    Number(undefined);

Результат:

    NaN

---

# Array → Number

`Number()` також може працювати через implicit conversion масиву в primitive/string representation.

Наприклад:

    Number([]);

Результат:

    0

    Number([10]);

Результат:

    10

А:

    Number([10, 20]);

Результат:

    NaN

Ці conversion rules рідко потрібно використовувати навмисно.

Для реального коду краще спочатку чітко визначити очікуваний тип даних.

---

# Object → Number

Звичайний object зазвичай не перетворюється на корисне число.

Наприклад:

    Number({});

Результат:

    NaN

Не варто покладатися на складні implicit conversions об'єктів.

---

# Number() Conversion Table

Основні приклади:

    Number("123")
    // 123

    Number("123.45")
    // 123.45

    Number("")
    // 0

    Number(" ")
    // 0

    Number("123px")
    // NaN

    Number("hello")
    // NaN

    Number(null)
    // 0

    Number(undefined)
    // NaN

    Number(true)
    // 1

    Number(false)
    // 0

---

# Unary Plus `+`

Unary plus може використовуватися для швидкого numeric conversion.

Наприклад:

    const value = "123";

    const number = +value;

Результат:

    123

Тип:

    typeof number

Результат:

    "number"

---

# Unary Plus vs Number()

Це:

    +"123"

еквівалентно за conversion behavior:

    Number("123")

Наприклад:

    +"123"
    // 123

    Number("123")
    // 123

---

# Unary Plus Examples

    +"10"
    // 10

    +"10.5"
    // 10.5

    +"-20"
    // -20

    +"hello"
    // NaN

    +""
    // 0

---

# Коли використовувати Unary Plus

Unary plus короткий:

    const number = +value;

Але:

    const number = Number(value);

часто читабельніший для навчального та production-коду, особливо якщо conversion важливий для розуміння логіки.

Головне — розуміти обидва варіанти.

---

# parseInt()

`parseInt()` перетворює string у ціле число.

Синтаксис:

    parseInt(string, radix)

Наприклад:

    parseInt("123", 10);

Результат:

    123

---

# parseInt() Removes Fractional Part

    parseInt("123.45", 10);

Результат:

    123

`parseInt()` читає integer representation.

---

# parseInt() and Text

`parseInt()` читає число з початку string.

Наприклад:

    parseInt("123px", 10);

Результат:

    123

Це відрізняється від:

    Number("123px");

який повертає:

    NaN

---

# parseInt() Stops at Invalid Character

Наприклад:

    parseInt("123abc", 10);

Результат:

    123

Парсер читає:

    123

а коли зустрічає:

    a

перестає читати число.

---

# parseInt() Invalid Start

Якщо string не починається з числа, результат:

    NaN

Наприклад:

    parseInt("abc123", 10);

Результат:

    NaN

---

# parseInt() Whitespace

Пробіли на початку допускаються.

    parseInt("   123", 10);

Результат:

    123

---

# parseInt() Negative Numbers

    parseInt("-123", 10);

Результат:

    -123

---

# Radix

`radix` визначає систему числення.

Наприклад:

    parseInt("101", 2);

означає:

    binary

Результат:

    5

Тому що:

    101₂ = 5₁₀

---

# parseInt() Decimal Radix

Для десяткової системи:

    parseInt("123", 10);

`10` — radix.

У сучасному JavaScript рекомендується явно вказувати radix при використанні `parseInt()`.

---

# parseInt() Binary

    parseInt("1010", 2);

Результат:

    10

---

# parseInt() Octal

    parseInt("17", 8);

Результат:

    15

Тому що:

    1 × 8 + 7 = 15

---

# parseInt() Hexadecimal

    parseInt("FF", 16);

Результат:

    255

---

# parseInt() Different Radices

    parseInt("10", 2);
    // 2

    parseInt("10", 8);
    // 8

    parseInt("10", 10);
    // 10

    parseInt("10", 16);
    // 16

Один і той самий string може давати різні numbers залежно від radix.

---

# parseInt() with Prefix

Можна передавати string з hexadecimal prefix:

    parseInt("0xFF", 16);

Результат:

    255

Для binary:

    parseInt("1010", 2);

---

# parseInt() vs Number()

Дуже важлива різниця.

    Number("123px");
    // NaN

    parseInt("123px", 10);
    // 123

І:

    Number("123.45");
    // 123.45

    parseInt("123.45", 10);
    // 123

Отже:

    Number()
        ↓
    повне numeric conversion

    parseInt()
        ↓
    integer з початку string

---

# parseFloat()

`parseFloat()` читає floating-point number з початку string.

Синтаксис:

    parseFloat(string)

Наприклад:

    parseFloat("123.45");

Результат:

    123.45

---

# parseFloat() and Text

    parseFloat("123.45px");

Результат:

    123.45

Як і `parseInt()`, `parseFloat()` може зупинитися після numeric частини.

---

# parseFloat() vs parseInt()

    parseInt("123.45", 10);
    // 123

    parseFloat("123.45");
    // 123.45

Отже:

    parseInt()
        ↓
    integer

    parseFloat()
        ↓
    floating-point number

---

# parseFloat() Invalid String

    parseFloat("hello");

Результат:

    NaN

---

# parseFloat() Negative Number

    parseFloat("-12.5");

Результат:

    -12.5

---

# parseFloat() Scientific Notation

    parseFloat("1.5e3");

Результат:

    1500

---

# parseFloat() Infinity

    parseFloat("Infinity");

Результат:

    Infinity

---

# parseFloat() vs Number()

Наприклад:

    Number("123.45px");
    // NaN

    parseFloat("123.45px");
    // 123.45

А:

    Number("123.45");
    // 123.45

    parseFloat("123.45");
    // 123.45

---

# Number() vs parseInt() vs parseFloat()

Це одна з найважливіших частин теми.

### Number()

    Number("123.45")

Результат:

    123.45

Очікує повне numeric representation.

---

### parseInt()

    parseInt("123.45", 10)

Результат:

    123

Повертає integer.

---

### parseFloat()

    parseFloat("123.45")

Результат:

    123.45

Повертає floating-point number.

---

# Порівняння

    const value = "123.45px";

    Number(value);
    // NaN

    parseInt(value, 10);
    // 123

    parseFloat(value);
    // 123.45

Це дуже важлива відмінність.

---

# Number() — строгіше conversion

Якщо у вас є:

    "123"

і ви очікуєте весь string як число:

    Number("123")

часто є хорошим вибором.

Якщо:

    "123px"

потрібно спеціально витягнути числову частину:

    parseInt("123px", 10)

або:

    parseFloat("123.45px")

---

# Number.parseInt()

JavaScript також має:

    Number.parseInt()

Наприклад:

    Number.parseInt("123", 10);

Результат:

    123

Функціонально це той самий стандартний parsing operation, що й глобальний:

    parseInt()

---

# Number.parseFloat()

Так само існує:

    Number.parseFloat()

Наприклад:

    Number.parseFloat("123.45");

Результат:

    123.45

---

# parseInt() vs Number.parseInt()

Можна написати:

    parseInt("123", 10);

або:

    Number.parseInt("123", 10);

Обидва варіанти виконують parsing integer.

У сучасному коді можна зустріти обидва.

---

# parseFloat() vs Number.parseFloat()

Можна написати:

    parseFloat("123.45");

або:

    Number.parseFloat("123.45");

Обидва виконують parsing floating-point number.

---

# String()

`String()` перетворює значення у string.

Наприклад:

    const number = 123;

    const value = String(number);

    console.log(value);
    console.log(typeof value);

Результат:

    "123"
    "string"

---

# Number → String

    String(123);

Результат:

    "123"

---

# Decimal Number → String

    String(123.45);

Результат:

    "123.45"

---

# Boolean → String

    String(true);

Результат:

    "true"

    String(false);

Результат:

    "false"

---

# Null → String

    String(null);

Результат:

    "null"

---

# Undefined → String

    String(undefined);

Результат:

    "undefined"

---

# NaN → String

    String(NaN);

Результат:

    "NaN"

---

# Infinity → String

    String(Infinity);

Результат:

    "Infinity"

---

# toString()

Number має метод:

    toString()

Наприклад:

    const number = 123;

    const value = number.toString();

Результат:

    "123"

Тип:

    typeof value

Результат:

    "string"

---

# String() vs toString()

Обидва можуть перетворити number у string.

    String(123);

та:

    (123).toString();

дають:

    "123"

Але `String()` безпечніший для `null` та `undefined`.

Наприклад:

    String(null);
    // "null"

А:

    null.toString();

викличе:

    TypeError

Тому для загального explicit conversion часто зручний:

    String(value)

---

# toString() with Radix

Метод `toString()` number може приймати radix.

Наприклад:

    const number = 10;

    number.toString(2);

Результат:

    "1010"

---

# Number to Binary String

    const number = 10;

    console.log(number.toString(2));

Результат:

    "1010"

---

# Number to Hexadecimal String

    const number = 255;

    console.log(number.toString(16));

Результат:

    "ff"

---

# Number to Octal String

    const number = 8;

    console.log(number.toString(8));

Результат:

    "10"

---

# Number to Different Bases

    const number = 42;

    number.toString(2);
    // "101010"

    number.toString(8);
    // "52"

    number.toString(10);
    // "42"

    number.toString(16);
    // "2a"

---

# Numeric String

Numeric string — string, який представляє число.

Наприклад:

    "10"
    "10.5"
    "-25"
    "0"
    "1e3"

Такі strings можна конвертувати:

    Number("10")
    // 10

---

# Non-Numeric String

Наприклад:

    "hello"
    "abc"
    "10px"

Не всі вони можуть бути повністю перетворені через `Number()`.

    Number("hello");
    // NaN

    Number("10px");
    // NaN

---

# Whitespace

Whitespace на початку та в кінці numeric string зазвичай ігнорується під час `Number()` conversion.

    Number("  100  ");

Результат:

    100

---

# Number Conversion and `NaN`

Невдале numeric conversion часто дає:

    NaN

Наприклад:

    const value = Number("hello");

    console.log(value);

Результат:

    NaN

Тому після conversion іноді потрібно перевірити:

    Number.isNaN(value)

---

# Safe Conversion Pattern

Наприклад:

    const input = "123";

    const number = Number(input);

    if (Number.isNaN(number)) {
        console.log("Invalid number");
    } else {
        console.log(number);
    }

---

# Finite Conversion Pattern

Якщо потрібно переконатися, що результат є finite number:

    const input = "123";

    const number = Number(input);

    if (Number.isFinite(number)) {
        console.log("Valid finite number");
    } else {
        console.log("Invalid number");
    }

---

# Важлива різниця: NaN vs 0

Наприклад:

    Number("");

Результат:

    0

А:

    Number("hello");

Результат:

    NaN

Це означає, що перевірка:

    Number.isNaN(number)

не виявить порожній string як invalid input, якщо перед conversion просто виконати `Number("")`.

У формах та user input це потрібно враховувати.

---

# User Input

З DOM input:

    input.value

повертає:

    string

Навіть якщо користувач вводить:

    123

значення буде:

    "123"

Тому часто потрібно:

    const value = Number(input.value);

---

# Input Example

    const input = document.querySelector("#age");

    const age = Number(input.value);

Тепер:

    age

є:

    number

а не:

    string

---

# Number Conversion у формах

Наприклад, користувач вводить:

    "56"

Ми отримуємо:

    input.value
        ↓
    "56"
        ↓
    Number()
        ↓
    56

Це типовий pattern у frontend JavaScript.

---

# Number Conversion у URL

Query parameters також часто приходять як strings.

Наприклад:

    ?page=2&limit=10

Після отримання:

    page
    limit

можуть бути strings:

    "2"
    "10"

Тому їх можна перетворити:

    const page = Number("2");
    const limit = Number("10");

---

# Number Conversion у JSON

JSON може містити numbers як numbers.

Наприклад:

    {
        "age": 56
    }

Після `JSON.parse()`:

    age

буде:

    number

Але якщо API повертає:

    {
        "age": "56"
    }

це буде:

    string

Тому завжди потрібно знати формат даних API.

---

# Implicit Conversion — Addition

Оператор `+` має особливу поведінку.

    "10" + 5

Результат:

    "105"

Це string concatenation.

---

# Implicit Conversion — Subtraction

    "10" - 5

Результат:

    5

Тут JavaScript перетворює `"10"` на number.

---

# Implicit Conversion — Multiplication

    "10" * 2

Результат:

    20

---

# Implicit Conversion — Division

    "10" / 2

Результат:

    5

---

# Implicit Conversion — Remainder

    "10" % 3

Результат:

    1

---

# Implicit Conversion — Comparison

Наприклад:

    "10" > 5

Результат:

    true

JavaScript виконує numeric comparison.

Але:

    "10" === 10

Результат:

    false

Тому strict equality не виконує такого type conversion.

---

# Unary Plus як Conversion

Unary plus:

    +"42"

перетворює string:

    "42"

у:

    42

Це зручний короткий pattern.

---

# Unary Minus

Unary minus також виконує numeric conversion, але змінює знак.

    -"42"

Результат:

    -42

Наприклад:

    -"10"

Результат:

    -10

---

# Conversion Table

## Number

    Number("42")
    // 42

    Number("42.5")
    // 42.5

    Number("")
    // 0

    Number(" ")
    // 0

    Number("42px")
    // NaN

    Number(null)
    // 0

    Number(undefined)
    // NaN

    Number(true)
    // 1

    Number(false)
    // 0

---

## parseInt

    parseInt("42", 10)
    // 42

    parseInt("42.5", 10)
    // 42

    parseInt("42px", 10)
    // 42

    parseInt("px42", 10)
    // NaN

---

## parseFloat

    parseFloat("42",)
    // 42

    parseFloat("42.5")
    // 42.5

    parseFloat("42.5px")
    // 42.5

    parseFloat("px42.5")
    // NaN

---

# Важливе порівняння

Для:

    "123"

маємо:

    Number("123")
    // 123

    parseInt("123", 10)
    // 123

    parseFloat("123")
    // 123

Але для:

    "123.45"

маємо:

    Number("123.45")
    // 123.45

    parseInt("123.45", 10)
    // 123

    parseFloat("123.45")
    // 123.45

А для:

    "123px"

маємо:

    Number("123px")
    // NaN

    parseInt("123px", 10)
    // 123

    parseFloat("123px")
    // 123

А для:

    "123.45px"

маємо:

    Number("123.45px")
    // NaN

    parseInt("123.45px", 10)
    // 123

    parseFloat("123.45px")
    // 123.45

---

# Коли використовувати Number()

Використовуйте `Number()` коли потрібно:

- перетворити повний numeric string у number;
- отримати integer або decimal;
- не дозволяти зайві символи після числа;
- явно виконати numeric conversion.

Наприклад:

    const value = Number(input);

---

# Коли використовувати parseInt()

Використовуйте `parseInt()` коли потрібно:

- отримати integer;
- прочитати integer на початку string;
- працювати з radix;
- витягнути integer з рядка на кшталт `"100px"`.

Наприклад:

    const pixels = parseInt("100px", 10);

Результат:

    100

---

# Коли використовувати parseFloat()

Використовуйте `parseFloat()` коли потрібно:

- отримати floating-point number;
- прочитати decimal number на початку string;
- витягнути decimal number із string на кшталт `"12.5px"`.

Наприклад:

    const width = parseFloat("12.5px");

Результат:

    12.5

---

# Number() vs parseInt() vs parseFloat() — правило

Запам'ятати можна так:

    Number()
        ↓
    "Цей весь string має бути числом"

    parseInt()
        ↓
    "Візьми integer з початку"

    parseFloat()
        ↓
    "Візьми decimal number з початку"

---

# Conversion Pipeline

Типовий pipeline:

    string
       ↓
    conversion
       ↓
    number
       ↓
    validation
       ↓
    calculation

Наприклад:

    const input = "123.45";

    const number = Number(input);

    if (Number.isFinite(number)) {
        console.log(number * 2);
    }

---

# Практичний Pattern — User Input

    const input = "25";

    const age = Number(input);

    if (!Number.isFinite(age)) {
        console.log("Invalid age");
    } else {
        console.log(age);
    }

---

# Практичний Pattern — Empty Input

Якщо:

    const input = "";

    const value = Number(input);

то:

    value === 0

Тому при роботі з user input може бути краще спочатку перевірити:

    if (input.trim() === "") {
        console.log("Input is empty");
    } else {
        const value = Number(input);
    }

---

# Практичний Pattern — Integer Input

    const input = "25";

    const value = Number(input);

    if (Number.isInteger(value)) {
        console.log("Valid integer");
    }

---

# Практичний Pattern — Decimal Input

    const input = "12.5";

    const value = Number(input);

    if (Number.isFinite(value)) {
        console.log("Valid number");
    }

---

# Практичний Pattern — CSS Value

Якщо є:

    const value = "250px";

і потрібно отримати:

    250

можна:

    const pixels = parseInt(value, 10);

Результат:

    250

Якщо:

    const value = "12.5px";

можна:

    const pixels = parseFloat(value);

Результат:

    12.5

---

# Практичний Pattern — Percentage

Наприклад:

    const input = "25%";

`Number()`:

    Number("25%");
    // NaN

А:

    parseFloat("25%");
    // 25

Якщо вам потрібно саме витягнути numeric part із CSS-like string:

    const percentage = parseFloat("25%");

---

# Практичний Pattern — Base Conversion

Binary string:

    const binary = "1010";

    const number = parseInt(binary, 2);

Результат:

    10

---

# Практичний Pattern — Hex Conversion

    const hex = "FF";

    const number = parseInt(hex, 16);

Результат:

    255

---

# Практичний Pattern — Number to Binary

    const number = 10;

    const binary = number.toString(2);

Результат:

    "1010"

---

# Практичний Pattern — Number to Hex

    const number = 255;

    const hex = number.toString(16);

Результат:

    "ff"

---

# Типові помилки

❌ Використовувати `parseInt()` просто як універсальний спосіб перетворення string у number.

Наприклад:

    parseInt("12.5", 10);

Результат:

    12

Якщо потрібно зберегти decimal:

    Number("12.5");

або:

    parseFloat("12.5");

---

❌ Забувати radix у `parseInt()`.

Краще:

    parseInt(value, 10)

ніж:

    parseInt(value)

Особливо коли код читають інші розробники або коли явно важлива система числення.

---

❌ Очікувати, що `Number("10px")` поверне `10`.

Насправді:

    Number("10px")
    // NaN

Для parsing numeric prefix:

    parseInt("10px", 10)
    // 10

---

❌ Забувати, що `Number("")` повертає `0`.

    Number("")
    // 0

Для user input це може бути небажаним.

---

❌ Плутати `Number.isNaN()` і conversion.

Наприклад:

    Number.isNaN("hello");

Результат:

    false

Тому що `"hello"` — це string, а не `NaN`.

Правильно:

    const value = Number("hello");

    Number.isNaN(value);

Результат:

    true

---

❌ Перевіряти результат conversion через truthiness.

Наприклад:

    const value = Number(input);

    if (!value) {
        ...
    }

Це проблематично, тому що:

    0

також є falsy.

Якщо `0` — допустиме значення, така перевірка може бути неправильною.

Краще використовувати конкретну перевірку:

    Number.isFinite(value)

або іншу перевірку відповідно до задачі.

---

❌ Використовувати implicit conversion без розуміння.

Наприклад:

    "10" - 5

працює, але явне:

    Number("10") - 5

часто зрозуміліше.

---

❌ Плутати:

    "123"

і:

    123

Перше:

    string

Друге:

    number

---

❌ Використовувати `toString()` на `null` або `undefined`.

Наприклад:

    null.toString();

дасть:

    TypeError

Якщо потрібне загальне перетворення:

    String(value)

---

# Practical Examples

### Приклад 1 — string to number

    const value = "100";

    const number = Number(value);

    console.log(number);
    console.log(typeof number);

Результат:

    100
    "number"

---

### Приклад 2 — decimal string

    const value = "19.99";

    const price = Number(value);

    console.log(price);

Результат:

    19.99

---

### Приклад 3 — invalid string

    const value = "hello";

    const number = Number(value);

    console.log(number);

Результат:

    NaN

---

### Приклад 4 — check conversion

    const value = Number("hello");

    if (Number.isNaN(value)) {
        console.log("Invalid number");
    }

Результат:

    Invalid number

---

### Приклад 5 — parseInt

    const value = parseInt("100px", 10);

    console.log(value);

Результат:

    100

---

### Приклад 6 — parseFloat

    const value = parseFloat("12.5px");

    console.log(value);

Результат:

    12.5

---

### Приклад 7 — parseInt vs parseFloat

    const value = "12.75";

    console.log(parseInt(value, 10));
    console.log(parseFloat(value));

Результат:

    12
    12.75

---

### Приклад 8 — Number vs parseInt

    const value = "12.75px";

    console.log(Number(value));
    console.log(parseInt(value, 10));

Результат:

    NaN
    12

---

### Приклад 9 — Boolean conversion to number

    console.log(Number(true));
    console.log(Number(false));

Результат:

    1
    0

---

### Приклад 10 — null and undefined

    console.log(Number(null));
    console.log(Number(undefined));

Результат:

    0
    NaN

---

### Приклад 11 — unary plus

    const value = "42";

    const number = +value;

    console.log(number);

Результат:

    42

---

### Приклад 12 — number to string

    const number = 123;

    const value = String(number);

    console.log(value);
    console.log(typeof value);

Результат:

    "123"
    "string"

---

### Приклад 13 — toString

    const number = 123;

    const value = number.toString();

    console.log(value);

Результат:

    "123"

---

### Приклад 14 — binary parsing

    const binary = "1010";

    const number = parseInt(binary, 2);

    console.log(number);

Результат:

    10

---

### Приклад 15 — hexadecimal parsing

    const hex = "FF";

    const number = parseInt(hex, 16);

    console.log(number);

Результат:

    255

---

### Приклад 16 — number to binary

    const number = 10;

    const binary = number.toString(2);

    console.log(binary);

Результат:

    "1010"

---

### Приклад 17 — number to hexadecimal

    const number = 255;

    const hex = number.toString(16);

    console.log(hex);

Результат:

    "ff"

---

### Приклад 18 — user input

    const input = "56";

    const age = Number(input);

    if (Number.isFinite(age)) {
        console.log(`Age: ${age}`);
    }

Результат:

    Age: 56

---

### Приклад 19 — empty input

    const input = "";

    if (input.trim() === "") {
        console.log("Input is empty");
    } else {
        const value = Number(input);
        console.log(value);
    }

Результат:

    Input is empty

---

### Приклад 20 — CSS value

    const width = "250px";

    const pixels = parseInt(width, 10);

    console.log(pixels);

Результат:

    250

---

# Conversion Decision Tree

Коли маєте string і потрібно отримати number:

    Потрібен весь string як число?
             ↓
            так
             ↓
        Number(value)

    Потрібен integer з початку string?
             ↓
            так
             ↓
        parseInt(value, 10)

    Потрібен decimal number
    з початку string?
             ↓
            так
             ↓
        parseFloat(value)

---

# Number Conversion у Full Stack

Number conversion дуже часто зустрічається у frontend/backend JavaScript.

### Frontend

    input.value
        ↓
    string
        ↓
    Number()
        ↓
    number

### URL

    searchParams.get("page")
        ↓
    string
        ↓
    Number()
        ↓
    number

### Backend

    req.params.id
        ↓
    string
        ↓
    Number()
        ↓
    number

### Database

Дані з database/API можуть мати різні типи залежно від драйвера та схеми.

Тому на межі:

    UI
    API
    database

важливо перевіряти та нормалізувати типи.

---

# Conversion Boundaries

Особливо уважно потрібно працювати з conversion на межах системи:

    User Input
        ↓
    Frontend
        ↓
    API
        ↓
    Backend
        ↓
    Database

Наприклад:

    "25"

може прийти як string.

А бізнес-логіка очікує:

    25

Тому conversion має бути виконаний у зрозумілому місці.

---

# Number Conversion та Validation

Conversion і validation — не одне й те саме.

Наприклад:

    const value = Number("25");

Тепер:

    value === 25

Але це ще не означає, що `25` відповідає бізнес-правилам.

Наприклад, якщо age має бути:

    0 ≤ age ≤ 120

потрібна додаткова validation:

    const age = Number(input);

    if (
        Number.isInteger(age) &&
        age >= 0 &&
        age <= 120
    ) {
        console.log("Valid age");
    }

---

# Conversion vs Validation

Conversion:

    "25"
       ↓
    25

Validation:

    25
       ↓
    чи допустиме це значення?
       ↓
    true / false

Не потрібно плутати ці два етапи.

---

# Питання зі співбесіди

Що таке type conversion?

Що таке explicit conversion?

Що таке implicit conversion?

Як перетворити string у number?

Що робить `Number()`?

Що повертає `Number("123")`?

Що повертає `Number("123.45")`?

Що повертає `Number("")`?

Що повертає `Number(" ")`?

Що повертає `Number("hello")`?

Що повертає `Number("123px")`?

Що повертає `Number(null)`?

Що повертає `Number(undefined)`?

Що повертає `Number(true)`?

Що повертає `Number(false)`?

Що таке unary plus?

Як працює:

    +"123"

Що робить `parseInt()`?

Що робить `parseFloat()`?

Яка різниця між `Number()` та `parseInt()`?

Яка різниця між `Number()` та `parseFloat()`?

Яка різниця між `parseInt()` та `parseFloat()`?

Чому:

    Number("123px")

дає `NaN`, а:

    parseInt("123px", 10)

дає `123`?

Що таке radix?

Для чого потрібен другий аргумент `parseInt()`?

Що означає:

    parseInt("1010", 2)

?

Як перетворити binary string у number?

Як перетворити hexadecimal string у number?

Чим `parseInt()` відрізняється від `Number.parseInt()`?

Чим `parseFloat()` відрізняється від `Number.parseFloat()`?

Як перетворити number у string?

Чим `String(value)` відрізняється від `value.toString()`?

Що станеться з:

    null.toString()

?

Як перетворити number у binary string?

Як перетворити number у hexadecimal string?

Що робить `Number.isNaN()`?

Що робить `Number.isFinite()`?

Чому не варто перевіряти результат conversion тільки через:

    if (!value)

?

Як працює conversion для user input?

Чому `input.value` зазвичай є string?

Як перетворити значення HTML input у number?

Чому conversion і validation — різні операції?

---

# Шлях

🟢 Core (обов'язково знати)

Розуміти:

    type conversion
    explicit conversion
    implicit conversion

Знати:

    Number()

    Number.isNaN()
    Number.isFinite()

Вміти:

    string → number
    number → string

Розуміти:

    "123"
    123

як різні типи.

Знати:

    Number("123")
    Number("123.45")
    Number("")
    Number("hello")
    Number(null)
    Number(undefined)
    Number(true)
    Number(false)

Розуміти:

    NaN

Знати:

    parseInt()
    parseFloat()

Розуміти базову різницю:

    Number()
    parseInt()
    parseFloat()

---

🔵 Junior

Впевнено використовувати:

    Number()
    parseInt()
    parseFloat()
    String()
    toString()

Розуміти:

    unary +
    radix
    numeric strings
    invalid numeric strings
    whitespace
    empty strings

Знати:

    parseInt(value, 10)

Вміти:

    binary string → number
    hexadecimal string → number
    number → binary string
    number → hexadecimal string

Розуміти різницю:

    explicit conversion
    implicit conversion

Розуміти типові conversion у:

    forms
    URL parameters
    API data
    frontend
    backend

Вміти правильно перевіряти результат conversion.

Розуміти:

    conversion
    validation

як два різні етапи.

---

🟠 Middle

Глибше розуміти:

    JavaScript type coercion
    ToNumber
    ToString
    ToPrimitive

Розуміти conversion для:

    strings
    numbers
    booleans
    null
    undefined
    objects
    arrays

Розуміти:

    numeric coercion
    comparison coercion
    arithmetic coercion

Глибше розуміти:

    Number()
    parseInt()
    parseFloat()

та їхні різні алгоритми.

Розуміти:

    radix
    numeric literals
    binary
    octal
    hexadecimal
    scientific notation

Розуміти conversion boundaries у:

    frontend
    REST API
    backend
    database

Розуміти edge cases:

    ""
    " "
    "0"
    "0px"
    "12px"
    "12.5px"
    "Infinity"
    "NaN"

Вміти проектувати надійну:

    conversion
    normalization
    validation

для API та user input.

---

🔴 Senior

Глибоке розуміння ECMAScript type conversion algorithms:

    ToPrimitive
    ToNumber
    ToString
    ToBoolean

Розуміння:

    abstract operations
    coercion semantics
    Symbol.toPrimitive
    valueOf()
    toString()

Розуміння conversion object → primitive.

Глибоке розуміння:

    numeric coercion
    equality coercion
    relational comparison
    arithmetic coercion

Розуміння edge cases:

    NaN
    -0
    Infinity
    BigInt
    Symbol

та їх взаємодії з conversion.

Розуміння:

    Number
    BigInt

як різних numeric domains.

Розуміння conversion boundaries у складних distributed systems.

Вміти проектувати type normalization на межах:

    UI
    API
    backend
    database

так, щоб implicit coercion не створював прихованих помилок.

---

# Міні-шпаргалка

## String → Number

    Number("123")
    // 123

---

## Decimal String → Number

    Number("123.45")
    // 123.45

---

## Invalid String

    Number("hello")
    // NaN

---

## Empty String

    Number("")
    // 0

---

## Whitespace

    Number("   ")
    // 0

---

## Boolean → Number

    Number(true)
    // 1

    Number(false)
    // 0

---

## Null → Number

    Number(null)
    // 0

---

## Undefined → Number

    Number(undefined)
    // NaN

---

## Unary Plus

    +"123"
    // 123

---

## parseInt

    parseInt("123.45", 10)
    // 123

---

## parseInt with text

    parseInt("123px", 10)
    // 123

---

## parseFloat

    parseFloat("123.45px")
    // 123.45

---

## Number vs parseInt

    Number("123px")
    // NaN

    parseInt("123px", 10)
    // 123

---

## Number vs parseFloat

    Number("123.45px")
    // NaN

    parseFloat("123.45px")
    // 123.45

---

## Number → String

    String(123)
    // "123"

---

## toString

    (123).toString()
    // "123"

---

## Number → Binary

    (10).toString(2)
    // "1010"

---

## Number → Hex

    (255).toString(16)
    // "ff"

---

## Binary → Number

    parseInt("1010", 2)
    // 10

---

## Hex → Number

    parseInt("FF", 16)
    // 255

---

## Validate NaN

    const value = Number(input);

    Number.isNaN(value)

---

## Validate Finite Number

    const value = Number(input);

    Number.isFinite(value)

---

# Основні правила

    Number(value)
        ↓
    explicit numeric conversion

    +value
        ↓
    короткий numeric conversion

    parseInt(value, 10)
        ↓
    integer parsing

    parseFloat(value)
        ↓
    floating-point parsing

    String(value)
        ↓
    string conversion

    value.toString()
        ↓
    object/primitive → string

---

# Найважливіше порівняння

    Number("100")
    // 100

    parseInt("100", 10)
    // 100

    parseFloat("100")
    // 100

Для decimal:

    Number("100.50")
    // 100.5

    parseInt("100.50", 10)
    // 100

    parseFloat("100.50")
    // 100.5

Для text suffix:

    Number("100px")
    // NaN

    parseInt("100px", 10)
    // 100

    parseFloat("100px")
    // 100

Для decimal + suffix:

    Number("100.50px")
    // NaN

    parseInt("100.50px", 10)
    // 100

    parseFloat("100.50px")
    // 100.5

---

# Головне:

• Number conversion — перетворення значень у числове або інше представлення.

• Явне перетворення:

    Number(value)

• Неявне перетворення JavaScript може відбуватися автоматично під час операцій.

• Найважливіший інструмент для повного numeric conversion:

    Number()

• `Number("123")`:

    123

• `Number("123.45")`:

    123.45

• `Number("")`:

    0

• `Number("   ")`:

    0

• `Number("hello")`:

    NaN

• `Number("123px")`:

    NaN

• `Number(null)`:

    0

• `Number(undefined)`:

    NaN

• `Number(true)`:

    1

• `Number(false)`:

    0

• Unary plus:

    +"123"

дає:

    123

• `parseInt()` використовується для parsing integer.

• `parseFloat()` використовується для parsing floating-point number.

• `parseInt()` читає числову частину з початку string і може зупинитися на першому нечисловому символі.

• `parseFloat()` також може прочитати numeric prefix, але зберігає дробову частину.

• Для `parseInt()` бажано явно вказувати radix:

    parseInt(value, 10)

• Radix визначає систему числення:

    2  → binary
    8  → octal
    10 → decimal
    16 → hexadecimal

• `Number()` та `parseInt()` мають принципово різну поведінку:

    Number("123px")
    // NaN

    parseInt("123px", 10)
    // 123

• `Number()` та `parseFloat()` також можуть давати різні результати:

    Number("12.5px")
    // NaN

    parseFloat("12.5px")
    // 12.5

• Number → string:

    String(number)

або:

    number.toString()

• `String(value)` зручний для загального explicit conversion.

• `toString()` не можна безпосередньо викликати на:

    null
    undefined

• `number.toString(radix)` дозволяє представити number в іншій системі числення.

• Наприклад:

    (10).toString(2)
    // "1010"

• І навпаки:

    parseInt("1010", 2)
    // 10

• `input.value` у DOM зазвичай є string, навіть якщо користувач вводить число.

• Тому frontend часто виконує:

    const value = Number(input.value);

• Conversion і validation — різні операції.

    conversion
        ↓
    отримати number

    validation
        ↓
    перевірити, чи number допустимий

• Після conversion часто потрібно перевірити:

    Number.isFinite(value)

або:

    Number.isNaN(value)

• Не варто перевіряти numeric input лише через:

    if (!value)

бо:

    0

є валідним number, але falsy.

• Для повного numeric string найчастіше підходить:

    Number(value)

• Для integer prefix:

    parseInt(value, 10)

• Для decimal prefix:

    parseFloat(value)

• Основна модель:

    input string
         ↓
    Number() / parseInt() / parseFloat()
         ↓
    number
         ↓
    validation
         ↓
    calculation

• У Full Stack JavaScript conversion особливо важливий на межах:

    HTML forms
    URL parameters
    API
    backend
    database

• Основне правило для запам'ятовування:

    Number()
        → весь string має бути числом

    parseInt()
        → integer з початку string

    parseFloat()
        → decimal number з початку string

    String()
        → string

    toString()
        → string / representation у вибраній radix