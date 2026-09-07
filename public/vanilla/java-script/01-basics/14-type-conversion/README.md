# 14. Type Conversion

Type Conversion — перетворення значення одного типу в інший.

JavaScript може перетворювати значення:

    string
    number
    bigint
    boolean
    object
    undefined
    null

у значення іншого типу.

Наприклад:

    const value = "42";

    const number = Number(value);

    console.log(number);
    // 42

Існує два основних види перетворення:

    Explicit Conversion
    Implicit Conversion / Type Coercion

---

# Ключові поняття

✔ type conversion  
✔ type coercion  
✔ explicit conversion  
✔ implicit conversion  
✔ `Number()`  
✔ `String()`  
✔ `Boolean()`  
✔ `BigInt()`  
✔ `parseInt()`  
✔ `parseFloat()`  
✔ `Number.isNaN()`  
✔ `Number.isFinite()`  
✔ `ToPrimitive`  
✔ `ToNumber`  
✔ `ToString`  
✔ `ToBoolean`  
✔ truthy  
✔ falsy  
✔ numeric conversion  
✔ string conversion  
✔ boolean conversion  
✔ `NaN`  
✔ `Infinity`  
✔ `null`  
✔ `undefined`  

---

# Що потрібно пам'ятати

• Type conversion — зміна типу значення.

• Explicit conversion виконується програмістом явно.

• Implicit conversion виконується JavaScript автоматично.

• Для явного перетворення найчастіше використовуються:

    Number()
    String()
    Boolean()

• `"42"` — це `string`.

• `42` — це `number`.

• `Number("42")` перетворює string у number.

• `String(42)` перетворює number у string.

• `Boolean(1)` перетворює number у boolean.

• Не всі рядки можна перетворити на коректне число.

    Number("hello");
    // NaN

• `NaN` має тип `number`.

    typeof NaN;
    // "number"

• Порожній рядок при числовому перетворенні стає `0`.

    Number("");
    // 0

• `null` при числовому перетворенні стає `0`.

    Number(null);
    // 0

• `undefined` при числовому перетворенні стає `NaN`.

    Number(undefined);
    // NaN

• Boolean conversion має чіткий список falsy values.

• Усе інше є truthy.

• `parseInt()` та `parseFloat()` призначені для розбору рядків, а не є повною заміною `Number()`.

• `==` виконує implicit coercion, а `===` не виконує автоматичного перетворення типів.

---

# Explicit Type Conversion

Explicit conversion — явне перетворення типу.

Програміст сам вказує, що значення потрібно перетворити.

Наприклад:

    const value = "42";

    const number = Number(value);

Тут:

    "42" → string
    Number() → conversion
    42 → number

---

# Основні функції conversion

    Number()
    String()
    Boolean()
    BigInt()

Найчастіше на практиці:

    Number()
    String()
    Boolean()

---

# Number()

`Number()` перетворює значення на `number`.

Наприклад:

    Number("42");
    // 42

    Number("3.14");
    // 3.14

    Number(true);
    // 1

    Number(false);
    // 0

---

## String → Number

    Number("42");
    // 42

    Number("3.14");
    // 3.14

    Number("-10");
    // -10

    Number("0");
    // 0

---

## Рядок із пробілами

Пробіли навколо числа ігноруються:

    Number(" 42 ");
    // 42

Також:

    Number("\t42\n");
    // 42

---

## Empty String

Порожній string перетворюється на `0`.

    Number("");
    // 0

Також:

    Number("   ");
    // 0

Це важлива особливість.

---

## Некоректний Number

Якщо string не представляє коректне число:

    Number("hello");
    // NaN

    Number("42px");
    // NaN

    Number("abc123");
    // NaN

---

# NaN

`NaN` означає:

    Not-a-Number

Наприклад:

    const value = Number("hello");

    console.log(value);
    // NaN

Але:

    typeof value;
    // "number"

`NaN` є спеціальним числовим значенням.

---

## Перевірка NaN

Рекомендований спосіб:

    Number.isNaN(value)

Наприклад:

    Number.isNaN(Number("hello"));
    // true

    Number.isNaN(Number("42"));
    // false

---

## NaN та ===

Особливість:

    NaN === NaN;
    // false

Тому не варто перевіряти:

    value === NaN

Правильно:

    Number.isNaN(value)

---

# Infinity

JavaScript також має спеціальні numeric values:

    Infinity
    -Infinity
    NaN

Наприклад:

    Number("Infinity");
    // Infinity

    1 / 0;
    // Infinity

    -1 / 0;
    // -Infinity

Тип:

    typeof Infinity;
    // "number"

---

# Number.isFinite()

Для перевірки, чи є значення кінцевим числом:

    Number.isFinite(value)

Наприклад:

    Number.isFinite(42);
    // true

    Number.isFinite(Infinity);
    // false

    Number.isFinite(NaN);
    // false

---

# String()

`String()` перетворює значення на string.

Наприклад:

    String(42);
    // "42"

    String(true);
    // "true"

    String(false);
    // "false"

---

## Number → String

    String(42);
    // "42"

    String(3.14);
    // "3.14"

    String(-10);
    // "-10"

---

## Boolean → String

    String(true);
    // "true"

    String(false);
    // "false"

---

## null → String

    String(null);
    // "null"

Результат — саме string:

    typeof String(null);
    // "string"

---

## undefined → String

    String(undefined);
    // "undefined"

---

## Array → String

    String([1, 2, 3]);
    // "1,2,3"

Наприклад:

    String(["apple", "banana"]);
    // "apple,banana"

---

## Object → String

    String({});
    // "[object Object]"

Це наслідок стандартного перетворення object у primitive/string.

На початковому рівні важливо пам'ятати:

    String(object)

не означає автоматично JSON serialization.

Для JSON використовують:

    JSON.stringify()

---

# Boolean()

`Boolean()` перетворює значення на `true` або `false`.

Наприклад:

    Boolean(1);
    // true

    Boolean(0);
    // false

---

# Truthy та Falsy

Boolean conversion має два результати:

    true
    false

Falsy values:

    false
    0
    -0
    0n
    ""
    null
    undefined
    NaN

Усе інше — truthy.

---

# Boolean Conversion Table

    Boolean(false)       → false
    Boolean(0)           → false
    Boolean(-0)          → false
    Boolean(0n)          → false
    Boolean("")          → false
    Boolean(null)        → false
    Boolean(undefined)   → false
    Boolean(NaN)         → false

Truthy:

    Boolean(true)        → true
    Boolean(1)           → true
    Boolean(-1)          → true
    Boolean("hello")     → true
    Boolean("0")         → true
    Boolean([])          → true
    Boolean({})          → true

---

# Empty String

Порожній string — falsy:

    Boolean("");
    // false

Але string, який містить пробіл:

    Boolean(" ");
    // true

І навіть:

    Boolean("false");
    // true

Тому що `"false"` — непорожній string.

---

# Empty Array

Порожній масив — truthy:

    Boolean([]);
    // true

Це часто є джерелом помилок у початківців.

Наприклад:

    if ([]) {
        console.log("runs");
    }

Код виконається.

---

# Empty Object

Порожній object також truthy:

    Boolean({});
    // true

Наприклад:

    if ({}) {
        console.log("runs");
    }

Код виконається.

---

# null → Boolean

    Boolean(null);
    // false

`null` є falsy.

---

# undefined → Boolean

    Boolean(undefined);
    // false

`undefined` є falsy.

---

# Number → Boolean

Основне правило:

    0     → false
    non-zero → true

Наприклад:

    Boolean(0);
    // false

    Boolean(10);
    // true

    Boolean(-10);
    // true

    Boolean(0.5);
    // true

---

# String → Boolean

Основне правило:

    ""       → false
    "text"   → true

Наприклад:

    Boolean("");
    // false

    Boolean("hello");
    // true

    Boolean("0");
    // true

    Boolean("false");
    // true

---

# BigInt → Boolean

    Boolean(0n);
    // false

    Boolean(10n);
    // true

---

# Explicit Conversion Summary

    Number("42")
    // 42

    String(42)
    // "42"

    Boolean(1)
    // true

---

# Implicit Type Conversion

Implicit conversion — автоматичне перетворення типів JavaScript.

Інша назва:

    Type Coercion

Наприклад:

    const result = "5" + 2;

Результат:

    "52"

JavaScript автоматично перетворює `2` на string.

---

# String Coercion

Оператор `+` може виконувати concatenation.

Наприклад:

    "Hello " + "World";
    // "Hello World"

Якщо один з операндів — string:

    "5" + 2;
    // "52"

    2 + "5";
    // "25"

    "Age: " + 25;
    // "Age: 25"

---

# + та String

Оператор `+` має особливу поведінку.

    10 + 20;
    // 30

Але:

    "10" + 20;
    // "1020"

І:

    10 + "20";
    // "1020"

Тому `+` може означати:

    numeric addition
    string concatenation

---

# Інші арифметичні оператори

Оператори:

    -
    *
    /
    %

зазвичай виконують numeric coercion.

Наприклад:

    "10" - 2;
    // 8

    "10" * 2;
    // 20

    "10" / 2;
    // 5

    "10" % 3;
    // 1

---

# + vs -

Це дуже важлива відмінність:

    "10" + 2;
    // "102"

    "10" - 2;
    // 8

`+` може виконувати string concatenation.

`-` працює як numeric operator.

---

# Boolean Coercion in Conditions

JavaScript автоматично перетворює значення на boolean у condition.

Наприклад:

    const name = "John";

    if (name) {
        console.log("Name exists");
    }

`"John"` — truthy, тому блок виконається.

---

# Falsy in Conditions

    const name = "";

    if (name) {
        console.log("Name exists");
    }

Код не виконається, тому що:

    Boolean("");
    // false

---

# Logical Operators and Coercion

Оператори:

    &&
    ||
    !

також працюють із truthy/falsy значеннями.

Наприклад:

    "hello" && 42;
    // 42

    "" || "default";
    // "default"

---

# ! Operator

`!` перетворює значення у boolean та інвертує його.

    !true;
    // false

    !false;
    // true

Наприклад:

    !"hello";
    // false

    !"";
    // true

---

# Double NOT

Подвійне `!!` часто використовується для явного boolean conversion:

    !!"hello";
    // true

    !!"";
    // false

    !!0;
    // false

    !!42;
    // true

Але для більш очевидного коду можна використовувати:

    Boolean(value)

---

# null та undefined

При boolean conversion:

    Boolean(null);
    // false

    Boolean(undefined);
    // false

При number conversion:

    Number(null);
    // 0

    Number(undefined);
    // NaN

Це важлива різниця.

---

# Conversion Table

## Number Conversion

    Number("42")        → 42
    Number("3.14")      → 3.14
    Number("")          → 0
    Number(" ")         → 0
    Number(true)        → 1
    Number(false)       → 0
    Number(null)        → 0
    Number(undefined)   → NaN
    Number("hello")     → NaN

---

## String Conversion

    String(42)           → "42"
    String(3.14)         → "3.14"
    String(true)         → "true"
    String(false)        → "false"
    String(null)         → "null"
    String(undefined)   → "undefined"

---

## Boolean Conversion

    Boolean(0)           → false
    Boolean(1)           → true
    Boolean("")          → false
    Boolean("hello")     → true
    Boolean(null)        → false
    Boolean(undefined)   → false
    Boolean(NaN)         → false
    Boolean([])          → true
    Boolean({})          → true

---

# parseInt()

`parseInt()` читає ціле число з string.

Наприклад:

    parseInt("42");
    // 42

    parseInt("42px");
    // 42

Це відрізняється від `Number()`:

    Number("42px");
    // NaN

    parseInt("42px");
    // 42

---

# parseInt() та decimals

`parseInt()` повертає integer.

    parseInt("42.99");
    // 42

    parseInt("3.14");
    // 3

Тому:

    parseInt()

не підходить, якщо потрібно зберегти десяткову частину.

---

# parseInt() та radix

Рекомендується явно вказувати систему числення:

    parseInt("42", 10);
    // 42

    parseInt("101", 2);
    // 5

Тут:

    10 → decimal
    2  → binary

Для звичайних десяткових чисел:

    parseInt(value, 10)

---

# parseFloat()

`parseFloat()` читає число з плаваючою крапкою.

Наприклад:

    parseFloat("3.14");
    // 3.14

    parseFloat("42.5px");
    // 42.5

Порівняння:

    parseInt("42.5");
    // 42

    parseFloat("42.5");
    // 42.5

---

# Number() vs parseInt() vs parseFloat()

### Number()

Перетворює весь string:

    Number("42");
    // 42

    Number("42px");
    // NaN

---

### parseInt()

Читає integer з початку string:

    parseInt("42px", 10);
    // 42

    parseInt("42.9", 10);
    // 42

---

### parseFloat()

Читає floating-point number:

    parseFloat("42.9px");
    // 42.9

---

# Практичне правило

Якщо очікується, що весь рядок є числом:

    Number(value)

Якщо потрібно витягнути ціле число з початку рядка:

    parseInt(value, 10)

Якщо потрібно витягнути десяткове число з початку рядка:

    parseFloat(value)

---

# Number.isInteger()

Перевіряє, чи є значення integer.

    Number.isInteger(42);
    // true

    Number.isInteger(42.5);
    // false

    Number.isInteger("42");
    // false

Важливо:

    Number.isInteger("42");

не виконує автоматичну conversion.

---

# Number.isNaN() vs global isNaN()

Рекомендовано:

    Number.isNaN(value)

Наприклад:

    Number.isNaN(NaN);
    // true

    Number.isNaN("hello");
    // false

`Number.isNaN()` не виконує перед перевіркою implicit conversion.

Глобальний:

    isNaN("hello");
    // true

тому що `"hello"` спочатку перетворюється на number:

    Number("hello");
    // NaN

На практиці для точнішої перевірки використовуйте:

    Number.isNaN()

---

# BigInt Conversion

BigInt можна створити через `BigInt()`.

    BigInt(42);
    // 42n

Або:

    BigInt("42");
    // 42n

Наприклад:

    const value = BigInt("12345678901234567890");

    console.log(value);
    // 12345678901234567890n

---

# Number та BigInt

Не можна безпосередньо змішувати `number` і `bigint` в арифметичних операціях:

    10 + 10n;
    // TypeError

Потрібно явно привести тип:

    Number(10n) + 10;
    // 20

або:

    10n + BigInt(10);
    // 20n

---

# String Concatenation

При використанні `+` string часто спричиняє coercion.

    const age = 25;

    const message = "Age: " + age;

Результат:

    "Age: 25"

Сучасний і часто зрозуміліший варіант:

    const message = `Age: ${age}`;

---

# Template Literals

Template literals автоматично перетворюють expressions у string context.

    const age = 25;

    const message = `Age: ${age}`;

Результат:

    "Age: 25"

Це один із найзручніших способів формування рядків.

---

# Comparison and Coercion

Оператори порівняння:

    ==
    ===
    !=
    !==

мають різну поведінку.

---

# ==

`==` — loose equality.

Перед порівнянням JavaScript може виконувати type coercion.

Наприклад:

    5 == "5";
    // true

Типи різні:

    number
    string

але після coercion значення можуть бути прирівняні.

---

# ===

`===` — strict equality.

Воно не виконує звичайного implicit type coercion між різними типами.

    5 === "5";
    // false

Типи:

    5   → number
    "5" → string

Тому вони не рівні.

---

# == vs ===

    5 == "5";
    // true

    5 === "5";
    // false

Практичне правило для сучасного JavaScript:

    ===
    !==

використовуються за замовчуванням.

---

# Не покладатися на coercion

Такий код:

    const result = "10" - "5";

повертає:

    5

Але його не завжди легко читати.

Краще:

    const result = Number("10") - Number("5");

Тут намір явно видно.

---

# Explicit vs Implicit

## Explicit

Програміст явно виконує conversion:

    const value = "42";

    const number = Number(value);

---

## Implicit

JavaScript виконує conversion автоматично:

    const result = "42" - 2;

Результат:

    40

---

# Основна різниця

    Explicit
        ↓
    programmer controls conversion

    Implicit
        ↓
    JavaScript performs coercion

---

# Primitive Conversion

JavaScript має внутрішні abstract operations для перетворення значень.

Основні:

    ToPrimitive
    ToNumber
    ToString
    ToBoolean
    ToObject

На рівні Junior достатньо розуміти їхню ідею.

---

# ToBoolean

JavaScript визначає truthy/falsy значення.

Спрощено:

    ToBoolean(value)
        ↓
    true / false

Наприклад:

    Boolean(0);
    // false

    Boolean("hello");
    // true

---

# ToNumber

Перетворення значення у number.

Наприклад:

    Number("42");
    // 42

Спрощено:

    ToNumber("42")
        ↓
    42

---

# ToString

Перетворення значення у string.

Наприклад:

    String(42);
    // "42"

Спрощено:

    ToString(42)
        ↓
    "42"

---

# ToPrimitive

Object може бути перетворений у primitive value.

Наприклад:

    const user = {
        valueOf() {
            return 10;
        }
    };

    Number(user);
    // 10

Це вже більш просунутий механізм, але важливо знати назву:

    ToPrimitive

---

# Object → Primitive

JavaScript може намагатися отримати primitive representation object.

Наприклад:

    const value = {
        valueOf() {
            return 10;
        }
    };

    console.log(value + 5);
    // 15

Механізм включає:

    ToPrimitive

а потім відповідне перетворення.

---

# String Conversion of Objects

Наприклад:

    String({
        name: "John"
    });

Результат:

    "[object Object]"

Для структурованого перетворення object у JSON:

    JSON.stringify({
        name: "John"
    });

Результат:

    '{"name":"John"}'

Це різні механізми.

---

# JSON Conversion ≠ Type Conversion

Не плутати:

    String(object)

та:

    JSON.stringify(object)

Наприклад:

    String({ name: "John" });
    // "[object Object]"

    JSON.stringify({ name: "John" });
    // '{"name":"John"}'

`JSON.stringify()` перетворює JavaScript value у JSON string representation.

---

# Practical Example — Form Input

HTML form часто повертає значення як string.

Наприклад:

    const input = "25";

Хоча користувач ввів число, значення може бути:

    typeof input;
    // "string"

Для математичних операцій:

    const age = Number(input);

Тепер:

    typeof age;
    // "number"

---

# Practical Example — Price

    const priceInput = "99.99";

    const price = Number(priceInput);

    console.log(price + 10);
    // 109.99

Без conversion:

    console.log(priceInput + 10);
    // "99.9910"

Це типовий приклад проблеми з string/number.

---

# Practical Example — Boolean Input

    const value = "false";

    Boolean(value);
    // true

Чому?

Тому що:

    "false"

це непорожній string.

Якщо потрібно інтерпретувати текст `"false"` саме як boolean `false`, простий `Boolean(value)` для цього не підходить.

---

# Practical Example — Default Value

    const input = "";

    const value = input || "default";

Результат:

    "default"

Тому що:

    Boolean("");
    // false

---

# Practical Example — Number Validation

    const input = "42";

    const value = Number(input);

    if (Number.isNaN(value)) {
        console.log("Invalid number");
    } else {
        console.log("Valid number");
    }

---

# Practical Example — parseInt

    const value = "42px";

    const number = parseInt(value, 10);

    console.log(number);
    // 42

---

# Practical Example — parseFloat

    const value = "19.99px";

    const number = parseFloat(value);

    console.log(number);
    // 19.99

---

# Common Conversion Mistakes

❌ Вважати:

    "42"

числом.

Насправді:

    typeof "42";
    // "string"

---

❌ Вважати:

    Boolean("false")

дасть `false`.

Насправді:

    Boolean("false");
    // true

---

❌ Вважати:

    Boolean([])

дасть `false`.

Насправді:

    Boolean([]);
    // true

---

❌ Вважати:

    Boolean({})

дасть `false`.

Насправді:

    Boolean({});
    // true

---

❌ Перевіряти NaN:

    value === NaN

Правильно:

    Number.isNaN(value)

---

❌ Використовувати `parseInt()` для будь-якого числового перетворення.

Наприклад:

    parseInt("42.99", 10);
    // 42

Якщо потрібно зберегти decimal:

    Number("42.99");
    // 42.99

---

❌ Забувати про `+`:

    "10" + 5;
    // "105"

---

# Number Conversion Cheat Sheet

    Number("42")          → 42
    Number("42.5")        → 42.5
    Number("")             → 0
    Number(" ")            → 0
    Number("42px")        → NaN
    Number("hello")        → NaN
    Number(true)           → 1
    Number(false)          → 0
    Number(null)           → 0
    Number(undefined)      → NaN

---

# String Conversion Cheat Sheet

    String(42)              → "42"
    String(42.5)            → "42.5"
    String(true)            → "true"
    String(false)           → "false"
    String(null)            → "null"
    String(undefined)       → "undefined"
    String([1, 2, 3])       → "1,2,3"
    String({})              → "[object Object]"

---

# Boolean Conversion Cheat Sheet

    Boolean(false)          → false
    Boolean(0)              → false
    Boolean(-0)             → false
    Boolean(0n)             → false
    Boolean("")             → false
    Boolean(null)           → false
    Boolean(undefined)      → false
    Boolean(NaN)            → false

    Boolean(true)           → true
    Boolean(1)              → true
    Boolean(-1)             → true
    Boolean("hello")        → true
    Boolean("false")        → true
    Boolean([])             → true
    Boolean({})             → true

---

# Number Parsing Cheat Sheet

    Number("42")
    // 42

    parseInt("42px", 10)
    // 42

    parseFloat("42.5px")
    // 42.5

---

# Number Validation Cheat Sheet

    Number.isNaN(value)

Перевірка на NaN:

    Number.isNaN(NaN);
    // true

Перевірка на finite number:

    Number.isFinite(42);
    // true

Перевірка на integer:

    Number.isInteger(42);
    // true

---

# Практичне правило для Input

Якщо отримали число як string:

    const input = "42";

Перетворення:

    const value = Number(input);

Перевірка:

    if (Number.isNaN(value)) {
        console.log("Invalid number");
    }

---

# Практичне правило для Boolean

Не плутати:

    Boolean("false");
    // true

Якщо значення приходить як текст `"true"` / `"false"`, потрібна окрема логіка:

    const value = "false";

    const result = value === "true";

Результат:

    false

---

# Практичне правило для Arithmetic

Не покладатися на автоматичне перетворення:

    const a = "10";
    const b = "20";

Краще:

    const result = Number(a) + Number(b);

Результат:

    30

Замість:

    const result = a + b;

який дасть:

    "1020"

---

# Explicit Conversion — основні способи

    Number(value)
    String(value)
    Boolean(value)
    BigInt(value)

---

# Implicit Coercion — основні випадки

JavaScript може автоматично перетворювати типи під час:

    +
    -
    *
    /
    %
    ==
    !=
    &&
    ||
    !
    if
    while
    ternary operator

Наприклад:

    "5" - 2;
    // 3

    "5" + 2;
    // "52"

    "5" == 5;
    // true

    "5" === 5;
    // false

---

# Як мислити про Conversion

Корисна модель:

    VALUE
      │
      ├──→ Number()
      │       ↓
      │     number
      │
      ├──→ String()
      │       ↓
      │     string
      │
      └──→ Boolean()
              ↓
            boolean

Або:

    Explicit Conversion
          ↓
    programmer chooses

    Implicit Coercion
          ↓
    JavaScript chooses

---

# Рівні знань

## 🟢 Core — обов'язково знати

Що таке type conversion.

Що таке type coercion.

Різниця між explicit та implicit conversion.

    Number()
    String()
    Boolean()

Що таке `NaN`.

Що таке `Infinity`.

Truthy / falsy.

Список falsy values.

Основи `parseInt()`.

Основи `parseFloat()`.

Різниця:

    ==

та:

    ===

Чому:

    "5" + 2
    // "52"

і:

    "5" - 2
    // 3

---

## 🔵 Junior

Вміти пояснити:

    Number("42")
    Number("")
    Number(null)
    Number(undefined)

Розуміти:

    Boolean("false")
    // true

    Boolean([])
    // true

    Boolean({})
    // true

Знати:

    Number.isNaN()
    Number.isFinite()
    Number.isInteger()

Розуміти різницю:

    Number()
    parseInt()
    parseFloat()

Розуміти string coercion.

Розуміти numeric coercion.

Розуміти boolean coercion.

Розуміти `==` та `===`.

---

## 🟠 Middle

Глибше розуміти:

    ToPrimitive
    ToNumber
    ToString
    ToBoolean
    ToObject

Розуміти coercion objects.

Розуміти:

    valueOf()
    toString()
    Symbol.toPrimitive

Розуміти алгоритм роботи `+`.

Розуміти різницю між:

    String(object)

та:

    JSON.stringify(object)

Розуміти implicit conversion у relational та equality comparisons.

Розуміти особливості:

    null
    undefined
    NaN
    -0
    Infinity

---

## 🔴 Senior

Глибоко розуміти ECMAScript specification algorithms:

    ToPrimitive
    ToNumeric
    ToNumber
    ToBigInt
    ToString
    ToBoolean
    ToObject

Розуміти:

    OrdinaryToPrimitive

Розуміти:

    Symbol.toPrimitive

Розуміти алгоритми:

    Abstract Equality Comparison
    Strict Equality Comparison
    Relational Comparison

Розуміти:

    Number
    BigInt
    String
    Boolean

та взаємодію між ними.

Розуміти edge cases:

    NaN
    -0
    Infinity
    null
    undefined
    BigInt

Розуміти coercion objects та primitive conversion.

---

# Питання зі співбесіди

Що таке type conversion?

Що таке type coercion?

Яка різниця між explicit та implicit conversion?

Що робить `Number()`?

Що повертає:

    Number("42")

Що повертає:

    Number("hello")

Що таке `NaN`?

Який тип має `NaN`?

Що повертає:

    Number("")

Що повертає:

    Number(null)

Що повертає:

    Number(undefined)

Які значення є falsy?

Чому:

    Boolean("false")

повертає `true`?

Чому:

    Boolean([])

повертає `true`?

Чому:

    Boolean({})

повертає `true`?

Чим відрізняється `Number()` від `parseInt()`?

Чим відрізняється `parseInt()` від `parseFloat()`?

Що повертає:

    "5" + 2

Що повертає:

    "5" - 2

Чим відрізняються:

    5 == "5"

та:

    5 === "5"

Що робить `Boolean()`?

Що робить `String()`?

Що робить `Number.isNaN()`?

Чому:

    NaN === NaN

повертає `false`?

Що таке `ToPrimitive`?

Що таке `ToNumber`?

Що таке `ToString`?

Що таке `ToBoolean`?

---

# Практичні вправи

## Вправа 1 — String → Number

    const a = "10";
    const b = "20";

Перетворити обидва значення у number та отримати:

    30

---

## Вправа 2 — Number → String

    const age = 56;

Створити string:

    "I am 56 years old."

---

## Вправа 3 — String → Boolean

Перевірити:

    Boolean("");
    Boolean("hello");
    Boolean("false");

Пояснити кожен результат.

---

## Вправа 4 — Number validation

Створити:

    const input = "123";

Перетворити його в number та перевірити через:

    Number.isNaN()

---

## Вправа 5 — Invalid number

Створити:

    const input = "hello";

Перетворити:

    Number(input)

та перевірити результат.

---

## Вправа 6 — parseInt

Перевірити:

    parseInt("42px", 10)
    parseInt("42.99", 10)
    parseInt("100", 2)

Пояснити результати.

---

## Вправа 7 — parseFloat

Перевірити:

    parseFloat("19.99px")
    parseFloat("42.5")
    parseFloat("100")

---

## Вправа 8 — Coercion

Передбачити результат:

    "10" + 5
    "10" - 5
    "10" * 5
    "10" / 5

Після цього перевірити результати в JavaScript.

---

## Вправа 9 — Truthy / Falsy

Визначити результат:

    Boolean(0)
    Boolean(1)
    Boolean("")
    Boolean("0")
    Boolean(null)
    Boolean(undefined)
    Boolean([])
    Boolean({})

---

## Вправа 10 — == vs ===

Передбачити:

    5 == "5"
    5 === "5"
    0 == false
    0 === false
    null == undefined
    null === undefined

Після цього перевірити результати.

---

# Типові помилки

❌ Вважати string `"42"` числом.

❌ Використовувати `Boolean("false")` для парсингу текстового boolean.

❌ Вважати `[]` falsy.

❌ Вважати `{}` falsy.

❌ Перевіряти `NaN` через:

    value === NaN

❌ Використовувати `parseInt()` там, де потрібно повністю перевірити numeric string.

❌ Плутати:

    Number()
    parseInt()
    parseFloat()

❌ Не враховувати поведінку `+`.

❌ Покладатися на implicit coercion у складному коді.

❌ Плутати:

    String(object)

з:

    JSON.stringify(object)

---

# Міні-шпаргалка

## Explicit Conversion

    Number(value)
    String(value)
    Boolean(value)
    BigInt(value)

---

## Number

    Number("42")       → 42
    Number("3.14")     → 3.14
    Number("")         → 0
    Number(" ")        → 0
    Number(true)       → 1
    Number(false)      → 0
    Number(null)       → 0
    Number(undefined)  → NaN
    Number("hello")    → NaN

---

## String

    String(42)          → "42"
    String(true)        → "true"
    String(false)       → "false"
    String(null)        → "null"
    String(undefined)   → "undefined"

---

## Boolean

Falsy:

    false
    0
    -0
    0n
    ""
    null
    undefined
    NaN

Все інше:

    truthy

---

## Parsing

    parseInt("42px", 10)
    // 42

    parseFloat("42.5px")
    // 42.5

---

## Validation

    Number.isNaN(value)

    Number.isFinite(value)

    Number.isInteger(value)

---

## Coercion

    "5" + 2
    // "52"

    "5" - 2
    // 3

    "5" * 2
    // 10

    "5" / 2
    // 2.5

---

## Equality

    5 == "5"
    // true

    5 === "5"
    // false

Рекомендація:

    ===
    !==

---

# Головне

• Type conversion — перетворення одного типу в інший.

• Explicit conversion — програміст явно виконує conversion.

• Implicit conversion — JavaScript автоматично виконує coercion.

• Основні функції:

    Number()
    String()
    Boolean()

• `Number("42")` → `42`.

• `Number("")` → `0`.

• `Number(null)` → `0`.

• `Number(undefined)` → `NaN`.

• `Number("hello")` → `NaN`.

• `NaN` має тип `number`.

• `NaN === NaN` → `false`.

• Для перевірки NaN використовують:

    Number.isNaN(value)

• `String(42)` → `"42"`.

• `Boolean(0)` → `false`.

• `Boolean("")` → `false`.

• `Boolean(null)` → `false`.

• `Boolean(undefined)` → `false`.

• `Boolean(NaN)` → `false`.

• Порожній масив — truthy:

    Boolean([]);
    // true

• Порожній object — truthy:

    Boolean({});
    // true

• `"false"` — truthy:

    Boolean("false");
    // true

• `parseInt()` читає integer.

• `parseFloat()` читає floating-point number.

• `Number()` перевіряє весь string як число.

• `+` може виконувати string concatenation.

• `-`, `*`, `/`, `%` зазвичай виконують numeric coercion.

• `==` дозволяє implicit coercion.

• `===` порівнює без звичайного implicit type coercion.

• У сучасному JavaScript зазвичай використовують:

    ===
    !==

• Якщо conversion важлива для логіки програми, краще робити її явно:

    Number(value)
    String(value)
    Boolean(value)

• Корисна модель:

    Type Conversion
    │
    ├── Explicit
    │   ├── Number()
    │   ├── String()
    │   ├── Boolean()
    │   └── BigInt()
    │
    └── Implicit
        └── Type Coercion

---

# Фінальна шпаргалка

    "42"                  → string

    Number("42")          → 42

    String(42)            → "42"

    Boolean(42)           → true

    Boolean(0)            → false

    Boolean("")           → false

    Boolean("false")      → true

    Boolean([])           → true

    Boolean({})           → true

    Number("")            → 0

    Number(null)          → 0

    Number(undefined)     → NaN

    Number("hello")       → NaN

    parseInt("42px", 10)  → 42

    parseFloat("42.5px")  → 42.5

    "5" + 2               → "52"

    "5" - 2               → 3

    "5" * 2               → 10

    "5" / 2               → 2.5

    5 == "5"              → true

    5 === "5"             → false

    NaN === NaN           → false

    Number.isNaN(NaN)     → true

---

# Ментальна модель

Коли бачиш значення, спочатку запитай:

    1. Який це тип?
           ↓
    2. Який тип мені потрібен?
           ↓
    3. Чи роблю я conversion явно?
           ↓
    4. Чи JavaScript зробить coercion автоматично?
           ↓
    5. Який результат conversion?

Наприклад:

    const input = "25";

    typeof input;
    // "string"

    const age = Number(input);

    typeof age;
    // "number"

Це хороший сучасний стиль:

    string input
        ↓
    explicit conversion
        ↓
    number value
        ↓
    validation
        ↓
    business logic