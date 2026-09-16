# 03. Number Methods

## 📌 Зміст

1. [Що таке Number Methods](#-що-таке-number-methods)
2. [Основні методи Number](#-основні-методи-number)
3. [Number.isNaN()](#1-numberisnan)
4. [Number.isFinite()](#2-numberisfinite)
5. [Number.isInteger()](#3-numberisinteger)
6. [Number.isSafeInteger()](#4-numberissafeinteger)
7. [Number.parseInt()](#5-numberparseint)
8. [Number.parseFloat()](#6-numberparsefloat)
9. [Number.MAX_VALUE та Number.MIN_VALUE](#-numbermax_value-та-numbermin_value)
10. [Number.MAX_SAFE_INTEGER та Number.MIN_SAFE_INTEGER](#-numbermax_safe_integer-та-numbermin_safe_integer)
11. [Number.EPSILON](#-numberepsilon)
12. [Number.POSITIVE_INFINITY та Number.NEGATIVE_INFINITY](#-numberpositive_infinity-та-numbernegative_infinity)
13. [Number.NaN](#-numbernan)
14. [Методи Number vs глобальні функції](#-методи-number-vs-глобальні-функції)
15. [Number Methods для перевірки даних](#-number-methods-для-перевірки-даних)
16. [Практичні приклади](#-практичні-приклади)
17. [Типові помилки](#-типові-помилки)
18. [Number Methods — коротка шпаргалка](#-number-methods--коротка-шпаргалка)
19. [Що потрібно знати Junior](#-що-потрібно-знати-junior)
20. [Питання на співбесіді](#-питання-на-співбесіді)

---

# 📌 Що таке Number Methods

`Number` — це вбудований об'єкт JavaScript, який містить:

- методи для перевірки чисел;
- методи для перетворення та парсингу;
- числові константи;
- межі точного представлення чисел;
- спеціальні числові значення.

Наприклад:

    Number.isInteger(42);
    // true

    Number.isNaN(NaN);
    // true

    Number.isFinite(100);
    // true

Важливо розрізняти:

    Number.isInteger(42);

та

    (42).toFixed(2);

Перше — **статичний метод `Number`**.

Друге — **метод конкретного числового значення**.

У цьому розділі ми вивчаємо саме:

    Number.isNaN()
    Number.isFinite()
    Number.isInteger()
    Number.isSafeInteger()
    Number.parseInt()
    Number.parseFloat()

а також важливі числові константи:

    Number.MAX_VALUE
    Number.MIN_VALUE
    Number.MAX_SAFE_INTEGER
    Number.MIN_SAFE_INTEGER
    Number.EPSILON
    Number.POSITIVE_INFINITY
    Number.NEGATIVE_INFINITY
    Number.NaN

---

# 🎯 Навіщо потрібні Number Methods

Number Methods особливо важливі при:

- перевірці даних від користувача;
- роботі з формами;
- валідації API;
- роботі з JSON;
- обробці числових значень;
- перевірці результатів обчислень;
- перевірці `NaN`;
- перевірці `Infinity`;
- перевірці цілих чисел;
- роботі з межами точного представлення чисел.

Наприклад, користувач вводить:

    "25"

Після отримання значення з HTML-форми це буде:

    string

Ми можемо перетворити:

    const age = Number("25");

    console.log(age);
    // 25

А потім перевірити:

    Number.isInteger(age);
    // true

---

# 🧠 Основна ідея

Запам'ятай:

> `Number` — не тільки тип даних. `Number` також має статичні методи та числові константи.

Наприклад:

    Number.isNaN(value);
    Number.isFinite(value);
    Number.isInteger(value);
    Number.isSafeInteger(value);

---

# 🔢 Основні методи Number

| Метод | Для чого |
|---|---|
| `Number.isNaN()` | перевіряє, чи значення є `NaN` |
| `Number.isFinite()` | перевіряє, чи число є скінченним |
| `Number.isInteger()` | перевіряє, чи число ціле |
| `Number.isSafeInteger()` | перевіряє, чи число є безпечно представленим цілим |
| `Number.parseInt()` | перетворює початок рядка на ціле число |
| `Number.parseFloat()` | перетворює початок рядка на число з дробовою частиною |

---

# 1. Number.isNaN()

`Number.isNaN()` перевіряє, чи значення є спеціальним числовим значенням:

    NaN

Приклад:

    Number.isNaN(NaN);
    // true

    Number.isNaN(42);
    // false

    Number.isNaN("42");
    // false

    Number.isNaN("hello");
    // false

---

## 📌 Важливо

`Number.isNaN()` **не виконує перетворення типу**.

Тому:

    Number.isNaN("hello");
    // false

Рядок `"hello"` — це не `NaN`.

А:

    Number("hello");
    // NaN

    Number.isNaN(Number("hello"));
    // true

---

## ✅ Правильна перевірка результату перетворення

    const value = Number("hello");

    if (Number.isNaN(value)) {
        console.log("Це не число");
    }

---

## ❌ Типова помилка

Не використовуй:

    value === NaN

Тому що:

    NaN === NaN;
    // false

Правильно:

    Number.isNaN(value);

---

# 2. Number.isFinite()

`Number.isFinite()` перевіряє, чи є значення:

- числом;
- не `NaN`;
- не `Infinity`;
- не `-Infinity`.

Приклад:

    Number.isFinite(42);
    // true

    Number.isFinite(3.14);
    // true

    Number.isFinite(0);
    // true

    Number.isFinite(-100);
    // true

---

## ❌ Infinity

    Number.isFinite(Infinity);
    // false

    Number.isFinite(-Infinity);
    // false

---

## ❌ NaN

    Number.isFinite(NaN);
    // false

---

## ❌ Рядок

    Number.isFinite("42");
    // false

Навіть якщо рядок містить число:

    "42"

це все одно `string`.

---

## 📌 Порівняння

    Number.isFinite(42);
    // true

    Number.isFinite("42");
    // false

    Number.isFinite(NaN);
    // false

    Number.isFinite(Infinity);
    // false

---

## ✅ Практична перевірка

    const value = Number(input);

    if (Number.isFinite(value)) {
        console.log("Коректне скінченне число");
    }

---

# 3. Number.isInteger()

`Number.isInteger()` перевіряє, чи є значення **цілим числом**.

Приклад:

    Number.isInteger(10);
    // true

    Number.isInteger(0);
    // true

    Number.isInteger(-5);
    // true

---

## ❌ Дробові числа

    Number.isInteger(3.14);
    // false

    Number.isInteger(10.5);
    // false

---

## ❌ Рядки

    Number.isInteger("10");
    // false

Навіть якщо:

    "10"

можна легко перетворити на число.

---

## 📌 Спочатку перетворити, потім перевірити

    const value = Number("10");

    Number.isInteger(value);
    // true

---

## Приклади

    Number.isInteger(42);
    // true

    Number.isInteger(42.0);
    // true

    Number.isInteger(42.5);
    // false

    Number.isInteger(-42);
    // true

    Number.isInteger(NaN);
    // false

    Number.isInteger(Infinity);
    // false

    Number.isInteger("42");
    // false

---

# 4. Number.isSafeInteger()

`Number.isSafeInteger()` перевіряє, чи є значення:

1. числом;
2. цілим;
3. таким, яке JavaScript може точно представити як integer.

Безпечний діапазон:

    Number.MIN_SAFE_INTEGER
    // -9007199254740991

    Number.MAX_SAFE_INTEGER
    // 9007199254740991

---

## Приклади

    Number.isSafeInteger(42);
    // true

    Number.isSafeInteger(1000);
    // true

    Number.isSafeInteger(9007199254740991);
    // true

    Number.isSafeInteger(9007199254740992);
    // false

---

## Дробові числа

    Number.isSafeInteger(42.5);
    // false

---

## Infinity

    Number.isSafeInteger(Infinity);
    // false

---

## NaN

    Number.isSafeInteger(NaN);
    // false

---

## 📌 Різниця

    Number.isInteger(9007199254740992);
    // true

    Number.isSafeInteger(9007199254740992);
    // false

Це дуже важливий момент.

Число може бути цілим (`integer`), але вже не бути **safe integer**.

---

# 🔢 Number.MAX_VALUE та Number.MIN_VALUE

## Number.MAX_VALUE

Найбільше позитивне скінченне число, яке може бути представлене типом `Number`.

    console.log(Number.MAX_VALUE);

Приблизно:

    1.7976931348623157e+308

---

## Number.MIN_VALUE

Найменше позитивне число, відмінне від нуля.

    console.log(Number.MIN_VALUE);

Приблизно:

    5e-324

---

## ⚠️ Важлива відмінність

`Number.MIN_VALUE` — це **не найменше негативне число**.

Це найменше **позитивне** число, близьке до нуля.

Для негативної межі існує:

    Number.MIN_SAFE_INTEGER

але це зовсім інша характеристика.

---

# 🔐 Number.MAX_SAFE_INTEGER та Number.MIN_SAFE_INTEGER

## Number.MAX_SAFE_INTEGER

Максимальне ціле число, яке JavaScript може точно представляти.

    console.log(Number.MAX_SAFE_INTEGER);
    // 9007199254740991

---

## Number.MIN_SAFE_INTEGER

Мінімальне ціле число, яке JavaScript може точно представляти.

    console.log(Number.MIN_SAFE_INTEGER);
    // -9007199254740991

---

## 📌 Безпечний діапазон integer

    -9007199254740991
    ...
    9007199254740991

---

## Перевірка

    Number.isSafeInteger(Number.MAX_SAFE_INTEGER);
    // true

    Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1);
    // false

---

# ⚠️ Проблема великих чисел

JavaScript `Number` використовує формат IEEE 754 double precision.

Через це дуже великі цілі числа можуть втрачати точність.

Наприклад:

    const a = 9007199254740992;
    const b = 9007199254740993;

    console.log(a === b);
    // true

Це одна з причин існування:

    BigInt

`BigInt` буде розглядатися окремо в:

    11-bigint

---

# 📐 Number.EPSILON

`Number.EPSILON` — дуже маленьке число, яке показує різницю між `1` та наступним найближчим представимим числом типу `Number`.

Приблизне значення:

    2.220446049250313e-16

Перевірити:

    console.log(Number.EPSILON);

---

## Навіщо потрібен EPSILON

Він часто використовується при порівнянні дробових чисел через проблему floating-point precision.

Наприклад:

    0.1 + 0.2 === 0.3;
    // false

Тому що результат:

    0.1 + 0.2;
    // 0.30000000000000004

---

## Порівняння через EPSILON

Простий варіант:

    const a = 0.1 + 0.2;
    const b = 0.3;

    Math.abs(a - b) < Number.EPSILON;
    // true

Детальніше floating-point precision буде розглянуто в:

    09-floating-point-and-precision

---

# ♾️ Number.POSITIVE_INFINITY та Number.NEGATIVE_INFINITY

JavaScript має два спеціальні значення нескінченності.

## Positive Infinity

    Number.POSITIVE_INFINITY

Фактично:

    Infinity

Наприклад:

    console.log(Number.POSITIVE_INFINITY);
    // Infinity

---

## Negative Infinity

    Number.NEGATIVE_INFINITY

    console.log(Number.NEGATIVE_INFINITY);
    // -Infinity

---

## Перевірка

    Number.isFinite(Infinity);
    // false

    Number.isFinite(-Infinity);
    // false

---

# NaN

`Number.NaN` — властивість `Number`, яка представляє:

    NaN

Наприклад:

    console.log(Number.NaN);
    // NaN

Зазвичай у коді просто використовують:

    NaN

а не:

    Number.NaN

---

# 🔄 Number.parseInt()

`Number.parseInt()` — це статичний метод `Number`, функціонально еквівалентний глобальному:

    parseInt()

Приклад:

    Number.parseInt("42", 10);
    // 42

---

## Рекомендується вказувати radix

    Number.parseInt("42", 10);
    // 42

Другий аргумент:

    10

означає десяткову систему числення.

---

## Приклади

    Number.parseInt("42px", 10);
    // 42

    Number.parseInt("12.99", 10);
    // 12

    Number.parseInt("100", 10);
    // 100

    Number.parseInt("-25", 10);
    // -25

---

## Інші системи числення

    Number.parseInt("1010", 2);
    // 10

    Number.parseInt("FF", 16);
    // 255

    Number.parseInt("77", 8);
    // 63

---

## Некоректний рядок

    Number.parseInt("hello", 10);
    // NaN

---

# 🔄 Number.parseFloat()

`Number.parseFloat()` — статичний метод `Number`, функціонально еквівалентний глобальному:

    parseFloat()

Приклад:

    Number.parseFloat("3.14");
    // 3.14

---

## Приклади

    Number.parseFloat("3.14px");
    // 3.14

    Number.parseFloat("10.5");
    // 10.5

    Number.parseFloat("-12.75");
    // -12.75

---

## Некоректний рядок

    Number.parseFloat("hello");
    // NaN

---

# 📊 Number.parseInt() vs Number.parseFloat()

| Метод | Результат |
|---|---:|
| `Number.parseInt("12.99", 10)` | `12` |
| `Number.parseFloat("12.99")` | `12.99` |
| `Number.parseInt("42px", 10)` | `42` |
| `Number.parseFloat("42px")` | `42` |
| `Number.parseInt("3.14abc", 10)` | `3` |
| `Number.parseFloat("3.14abc")` | `3.14` |

---

# 🆚 Number Methods vs глобальні функції

JavaScript має:

    Number.parseInt()

і:

    parseInt()

Так само:

    Number.parseFloat()

і:

    parseFloat()

У сучасному JavaScript вони мають однакову поведінку.

Наприклад:

    Number.parseInt("42", 10);
    // 42

    parseInt("42", 10);
    // 42

---

## 📌 Що використовувати?

Для навчання та структурованого коду можна використовувати:

    Number.parseInt()

    Number.parseFloat()

Це явно показує, що мова йде про числові операції.

Але глобальні:

    parseInt()
    parseFloat()

також є абсолютно нормальними та дуже поширеними.

---

# 🔍 Number.isNaN() vs isNaN()

Це важлива відмінність.

## Number.isNaN()

Не виконує неявне перетворення типу:

    Number.isNaN("hello");
    // false

    Number.isNaN("123");
    // false

    Number.isNaN(NaN);
    // true

---

## Глобальний isNaN()

Глобальний `isNaN()` спочатку намагається перетворити значення на число.

    isNaN("123");
    // false

    isNaN("hello");
    // true

    isNaN("");
    // false

---

## 📌 Рекомендація

Для сучасного JavaScript зазвичай краще використовувати:

    Number.isNaN()

тому що він не робить прихованого перетворення типів.

---

# 🔍 Number.isFinite() vs isFinite()

Аналогічна проблема.

## Number.isFinite()

    Number.isFinite(42);
    // true

    Number.isFinite("42");
    // false

---

## Глобальний isFinite()

    isFinite(42);
    // true

    isFinite("42");
    // true

Глобальний `isFinite()` спочатку перетворює значення.

---

## 📌 Рекомендація

Для перевірки вже отриманого числового значення:

    Number.isFinite(value)

---

# 🔄 Number() vs Number.parseInt() vs Number.parseFloat()

Це одна з найважливіших відмінностей.

## Number()

Суворо перетворює все значення.

    Number("42");
    // 42

    Number("3.14");
    // 3.14

    Number("42px");
    // NaN

---

## Number.parseInt()

Бере цілу частину на початку рядка.

    Number.parseInt("42px", 10);
    // 42

    Number.parseInt("12.99", 10);
    // 12

---

## Number.parseFloat()

Бере число з дробовою частиною на початку рядка.

    Number.parseFloat("3.14px");
    // 3.14

---

# 📋 Порівняльна таблиця

| Значення | `Number()` | `Number.parseInt()` | `Number.parseFloat()` |
|---|---:|---:|---:|
| `"42"` | `42` | `42` | `42` |
| `"3.14"` | `3.14` | `3` | `3.14` |
| `"42px"` | `NaN` | `42` | `42` |
| `"3.14px"` | `NaN` | `3` | `3.14` |
| `"hello"` | `NaN` | `NaN` | `NaN` |
| `""` | `0` | `NaN` | `NaN` |

---

# 📝 Практика з HTML-формами

Значення з `<input>` зазвичай приходить як `string`.

Наприклад:

    const input = document.querySelector("#age");

Якщо користувач ввів:

    25

то:

    input.value

буде:

    "25"

а не:

    25

Тому:

    const age = Number(input.value);

---

## Перевірка

    const age = Number(input.value);

    if (Number.isInteger(age)) {
        console.log("Ціле число");
    }

---

# 🛡️ Валідація числового значення

Базовий шаблон:

    const value = Number(input.value);

    if (!Number.isFinite(value)) {
        console.log("Некоректне число");
        return;
    }

    console.log("Число:", value);

---

# ⚠️ Особливість Number("")

Дуже важлива особливість:

    Number("");
    // 0

Тому проста перевірка:

    const value = Number(input.value);

    if (Number.isFinite(value)) {
        // ...
    }

пропустить порожній input як:

    0

Якщо порожній рядок повинен бути помилкою, спочатку перевіряємо його.

    const inputValue = input.value.trim();

    if (inputValue === "") {
        console.log("Поле порожнє");
        return;
    }

    const value = Number(inputValue);

    if (!Number.isFinite(value)) {
        console.log("Некоректне число");
        return;
    }

    console.log(value);

---

# 🔢 Перевірка цілого числа

Наприклад, вік:

    const value = Number(input.value);

    if (!Number.isInteger(value)) {
        console.log("Вік повинен бути цілим числом");
        return;
    }

---

# 🔢 Перевірка безпечного цілого

Для дуже великих integer:

    const value = Number(input.value);

    if (!Number.isSafeInteger(value)) {
        console.log("Число виходить за межі safe integer");
        return;
    }

---

# ♾️ Перевірка на скінченне число

Якщо `Infinity` неприпустиме:

    const value = Number(input.value);

    if (!Number.isFinite(value)) {
        console.log("Потрібне скінченне число");
        return;
    }

---

# 🧩 Комбінація перевірок

Наприклад, потрібне ціле число від 1 до 100:

    const value = Number(input.value);

    if (!Number.isInteger(value)) {
        console.log("Потрібне ціле число");
        return;
    }

    if (value < 1 || value > 100) {
        console.log("Число повинно бути від 1 до 100");
        return;
    }

    console.log("Коректне значення:", value);

---

# 🧪 Практичний приклад: оцінка

Користувач вводить оцінку від 1 до 12:

    const inputValue = "10";
    const grade = Number(inputValue);

    if (!Number.isInteger(grade)) {
        console.log("Оцінка повинна бути цілим числом");
    } else if (grade < 1 || grade > 12) {
        console.log("Оцінка повинна бути від 1 до 12");
    } else {
        console.log("Коректна оцінка:", grade);
    }

---

# 🧪 Практичний приклад: ціна

Ціна може бути дробовою:

    const inputValue = "149.99";
    const price = Number(inputValue);

    if (!Number.isFinite(price)) {
        console.log("Некоректна ціна");
    } else if (price < 0) {
        console.log("Ціна не може бути від'ємною");
    } else {
        console.log("Ціна:", price);
    }

---

# 🧪 Практичний приклад: API

При отриманні даних від API:

    const value = Number(data.age);

    if (!Number.isSafeInteger(value)) {
        throw new Error("Некоректний age");
    }

    console.log(value);

---

# 🔢 Перевірка різних значень

    Number.isNaN(NaN);
    // true

    Number.isNaN(10);
    // false

    Number.isFinite(10);
    // true

    Number.isFinite(Infinity);
    // false

    Number.isInteger(10);
    // true

    Number.isInteger(10.5);
    // false

    Number.isSafeInteger(10);
    // true

---

# ⚠️ Типові помилки

## 1. Перевірка NaN через ===

❌ Неправильно:

    value === NaN

✅ Правильно:

    Number.isNaN(value)

---

## 2. Використання глобального isNaN() без розуміння coercion

    isNaN("123");
    // false

Це може бути несподіваним.

Краще:

    Number.isNaN(value)

---

## 3. Перевірка рядка через Number.isInteger()

    Number.isInteger("42");
    // false

Спочатку:

    const value = Number("42");

Потім:

    Number.isInteger(value);
    // true

---

## 4. Використання Number.isFinite() до перетворення

    Number.isFinite("42");
    // false

Якщо потрібно перевірити введене число:

    const value = Number(input.value);

    Number.isFinite(value);
    // true

---

## 5. Плутати MAX_VALUE і MAX_SAFE_INTEGER

`MAX_VALUE`:

    Number.MAX_VALUE

— найбільше скінченне число.

`MAX_SAFE_INTEGER`:

    Number.MAX_SAFE_INTEGER

— найбільше ціле число, яке можна точно представити.

Це різні речі.

---

## 6. Плутати MIN_VALUE і MIN_SAFE_INTEGER

`MIN_VALUE`:

    Number.MIN_VALUE

— найменше позитивне число, відмінне від нуля.

`MIN_SAFE_INTEGER`:

    Number.MIN_SAFE_INTEGER

— найменше безпечне ціле число.

---

## 7. Вважати всі integer безпечними

Наприклад:

    Number.isInteger(9007199254740992);
    // true

але:

    Number.isSafeInteger(9007199254740992);
    // false

---

## 8. Забувати про floating-point precision

    0.1 + 0.2 === 0.3;
    // false

Для точних фінансових розрахунків не можна бездумно покладатися на звичайний `Number`.

Тема детальніше:

    09-floating-point-and-precision

---

# 🧠 Що потрібно запам'ятати

## Перевірка NaN

    Number.isNaN(value)

---

## Перевірка скінченності

    Number.isFinite(value)

---

## Перевірка integer

    Number.isInteger(value)

---

## Перевірка safe integer

    Number.isSafeInteger(value)

---

## Парсинг integer

    Number.parseInt(value, 10)

---

## Парсинг decimal

    Number.parseFloat(value)

---

## Максимальний safe integer

    Number.MAX_SAFE_INTEGER

---

## Мінімальний safe integer

    Number.MIN_SAFE_INTEGER

---

## Floating-point precision

    Number.EPSILON

---

# 📌 Number Methods для перевірки даних

Корисна послідовність:

    input
      ↓
    string
      ↓
    Number()
      ↓
    Number.isFinite()
      ↓
    Number.isInteger()
      ↓
    range check

Наприклад:

    const rawValue = input.value.trim();

    if (rawValue === "") {
        console.log("Поле порожнє");
        return;
    }

    const value = Number(rawValue);

    if (!Number.isFinite(value)) {
        console.log("Некоректне число");
        return;
    }

    if (!Number.isInteger(value)) {
        console.log("Потрібне ціле число");
        return;
    }

    if (value < 1 || value > 100) {
        console.log("Число поза допустимим діапазоном");
        return;
    }

    console.log("OK:", value);

---

# 🧭 Коли який метод використовувати

## Потрібно дізнатися, чи це NaN

    Number.isNaN(value)

---

## Потрібно дізнатися, чи це нормальне скінченне число

    Number.isFinite(value)

---

## Потрібно перевірити integer

    Number.isInteger(value)

---

## Потрібно перевірити безпечний integer

    Number.isSafeInteger(value)

---

## Потрібно витягнути integer із початку рядка

    Number.parseInt(value, 10)

---

## Потрібно витягнути decimal number із початку рядка

    Number.parseFloat(value)

---

## Потрібно суворо перетворити рядок на число

    Number(value)

Це особливо важлива відмінність:

> `Number()` — conversion, `parseInt()` / `parseFloat()` — parsing.

---

# 🔗 Зв'язок з іншими темами

Number Methods не варто вивчати ізольовано.

Вони пов'язані з:

    01-number-basics
          ↓
    02-number-conversion
          ↓
    03-number-methods
          ↓
    04-math-round-floor-ceil-trunc
          ↓
    05-math-abs-min-max
          ↓
    06-math-pow-sqrt
          ↓
    07-random-numbers
          ↓
    08-random-numbers-and-ranges
          ↓
    09-floating-point-and-precision
          ↓
    10-number-formatting
          ↓
    11-bigint
          ↓
    12-numbers-project

---

# 🧩 Number Methods + Math

`Number` відповідає переважно за:

- перевірку числового значення;
- conversion/parsing;
- числові межі;
- спеціальні числові значення.

`Math` відповідає переважно за:

- округлення;
- абсолютне значення;
- степені;
- корені;
- мінімум/максимум;
- випадкові числа;
- математичні функції.

Наприклад:

    Number.isInteger(10.5);
    // false

    Math.floor(10.5);
    // 10

Перший метод **перевіряє**.

Другий **змінює результат обчислення**.

---

# 🧪 Міні-практика

## Вправа 1

Що повернуть:

    Number.isNaN(NaN);
    Number.isNaN("NaN");
    Number.isNaN(10);

---

## Вправа 2

Перевір:

    10
    10.5
    Infinity
    NaN
    "10"

за допомогою:

    Number.isFinite()

---

## Вправа 3

Перевір:

    10
    10.5
    -10
    "10"
    NaN

за допомогою:

    Number.isInteger()

---

## Вправа 4

Перевір:

    Number.MAX_SAFE_INTEGER

та:

    Number.MAX_SAFE_INTEGER + 1

за допомогою:

    Number.isSafeInteger()

---

## Вправа 5

Порівняй:

    Number("12.5")
    Number.parseInt("12.5", 10)
    Number.parseFloat("12.5")

---

## Вправа 6

Порівняй:

    Number("25px")
    Number.parseInt("25px", 10)
    Number.parseFloat("25px")

---

# 🧠 Рівні знань

## 🟢 Beginner

Потрібно знати:

- `Number.isNaN()`;
- `Number.isFinite()`;
- `Number.isInteger()`;
- `Number.parseInt()`;
- `Number.parseFloat()`;
- `Number.MAX_SAFE_INTEGER`;
- `Number.MIN_SAFE_INTEGER`;
- різницю між `Number()` і `parseInt()`.

---

## 🔵 Junior

Потрібно впевнено розуміти:

- `NaN`;
- `Infinity`;
- `Number.isNaN()` vs `isNaN()`;
- `Number.isFinite()` vs `isFinite()`;
- `Number.isInteger()`;
- `Number.isSafeInteger()`;
- `Number.EPSILON`;
- `MAX_VALUE` vs `MAX_SAFE_INTEGER`;
- валідацію чисел із форм;
- перевірку порожнього input;
- `parseInt(value, 10)`;
- різницю між conversion і parsing.

---

## 🟠 Middle

Корисно розуміти:

- IEEE 754;
- floating-point precision;
- safe integers;
- причини появи `NaN`;
- coercion;
- numeric conversion;
- обмеження `Number`;
- коли потрібен `BigInt`.

---

## 🔴 Senior

На глибшому рівні:

- ECMAScript specification;
- `ToNumber`;
- `ToNumeric`;
- `ToPrimitive`;
- IEEE 754 binary64;
- precision/rounding;
- `Number` vs `BigInt`;
- поведінка арифметичних операцій із різними numeric types.

---

# 🎤 Питання на співбесіді

### 1. Що таке Number Methods?

Методи та властивості конструктора `Number`, призначені для роботи з числовими значеннями, їх перевірки, парсингу та меж представлення.

---

### 2. Як перевірити, чи значення є NaN?

    Number.isNaN(value)

---

### 3. Чому не можна використовувати `value === NaN`?

Тому що:

    NaN === NaN;
    // false

`NaN` — спеціальне значення, яке не дорівнює навіть самому собі.

---

### 4. Яка різниця між `Number.isNaN()` і `isNaN()`?

`Number.isNaN()` не робить coercion.

Глобальний `isNaN()` спочатку перетворює значення на число.

---

### 5. Як перевірити, чи число є finite?

    Number.isFinite(value)

---

### 6. Як перевірити, чи число є цілим?

    Number.isInteger(value)

---

### 7. Як перевірити safe integer?

    Number.isSafeInteger(value)

---

### 8. Який діапазон safe integers?

    Number.MIN_SAFE_INTEGER
    // -9007199254740991

    Number.MAX_SAFE_INTEGER
    // 9007199254740991

---

### 9. Чим `Number()` відрізняється від `parseInt()`?

`Number()` виконує conversion і вимагає, щоб усе значення було коректним числовим представленням.

`parseInt()` читає цілу частину на початку рядка та може зупинитися на нечисловому символі.

Наприклад:

    Number("42px");
    // NaN

    Number.parseInt("42px", 10);
    // 42

---

### 10. Чим `parseInt()` відрізняється від `parseFloat()`?

`parseInt()` повертає integer.

`parseFloat()` може повернути число з дробовою частиною.

    Number.parseInt("12.99", 10);
    // 12

    Number.parseFloat("12.99");
    // 12.99

---

### 11. Навіщо передавати radix у parseInt()?

Щоб явно вказати систему числення:

    Number.parseInt("1010", 2);
    // 10

Для звичайних десяткових чисел:

    Number.parseInt(value, 10)

---

### 12. Що таке Number.MAX_VALUE?

Найбільше скінченне значення, яке може представляти `Number`.

---

### 13. Що таке Number.MAX_SAFE_INTEGER?

Найбільше ціле число, яке `Number` може точно представляти:

    9007199254740991

---

### 14. Чим MAX_VALUE відрізняється від MAX_SAFE_INTEGER?

`MAX_VALUE` визначає максимальне скінченне число.

`MAX_SAFE_INTEGER` визначає максимальне ціле число, яке можна точно представити.

---

### 15. Що таке Number.EPSILON?

Дуже мала величина, пов'язана з точністю представлення чисел типу `Number`, яка часто використовується для порівняння floating-point результатів.

---

### 16. Чому `0.1 + 0.2 !== 0.3`?

Через особливості двійкового представлення дробових чисел у IEEE 754.

---

### 17. Що поверне `Number.isInteger("10")`?

    false

Тому що `"10"` — рядок.

---

### 18. Що поверне `Number.isFinite("10")`?

    false

Тому що `Number.isFinite()` не виконує coercion.

---

### 19. Як правильно перевірити числове значення з input?

Наприклад:

    const value = Number(input.value);

    if (!Number.isFinite(value)) {
        console.log("Invalid number");
    }

Але перед цим за потреби потрібно окремо перевірити порожній рядок.

---

### 20. Коли використовувати BigInt?

Коли потрібно працювати з цілими числами, які виходять за межі безпечного діапазону `Number` і при цьому потребують точної integer-арифметики.

---

# ⚡ Number Methods — коротка шпаргалка

    // NaN
    Number.isNaN(NaN);
    // true

    // Finite
    Number.isFinite(42);
    // true

    Number.isFinite(Infinity);
    // false

    // Integer
    Number.isInteger(42);
    // true

    Number.isInteger(42.5);
    // false

    // Safe integer
    Number.isSafeInteger(42);
    // true

    // Parse integer
    Number.parseInt("42px", 10);
    // 42

    // Parse float
    Number.parseFloat("3.14px");
    // 3.14

    // Safe integer limits
    Number.MAX_SAFE_INTEGER;
    // 9007199254740991

    Number.MIN_SAFE_INTEGER;
    // -9007199254740991

    // Maximum Number
    Number.MAX_VALUE;

    // Minimum positive Number
    Number.MIN_VALUE;

    // Floating-point precision
    Number.EPSILON;

    // Infinity
    Number.POSITIVE_INFINITY;
    Number.NEGATIVE_INFINITY;

    // NaN
    Number.NaN;

---

# 🏆 Головні правила

1. Для перевірки `NaN` використовуй:

       Number.isNaN(value)

2. Для перевірки finite number використовуй:

       Number.isFinite(value)

3. Для перевірки integer використовуй:

       Number.isInteger(value)

4. Для перевірки safe integer використовуй:

       Number.isSafeInteger(value)

5. Для `parseInt()` вказуй radix:

       Number.parseInt(value, 10)

6. Для decimal parsing використовуй:

       Number.parseFloat(value)

7. Пам'ятай:

       Number("42px")
       // NaN

       Number.parseInt("42px", 10)
       // 42

8. `Number.isNaN()` та `Number.isFinite()` не роблять автоматичного перетворення типів.

9. Не перевіряй `NaN` через:

       value === NaN

10. Не плутай:

       Number.MAX_VALUE

    з:

       Number.MAX_SAFE_INTEGER

11. `Number.MIN_VALUE` — це найменше позитивне число, а не найменше негативне.

12. Для великих integer за межами safe range потрібно розглядати:

       BigInt

---

# 📚 Підсумок

`Number Methods` — це набір інструментів, який дозволяє безпечно працювати з числовими даними.

Найважливіші методи:

    Number.isNaN()
    Number.isFinite()
    Number.isInteger()
    Number.isSafeInteger()
    Number.parseInt()
    Number.parseFloat()

Найважливіші властивості:

    Number.MAX_VALUE
    Number.MIN_VALUE
    Number.MAX_SAFE_INTEGER
    Number.MIN_SAFE_INTEGER
    Number.EPSILON
    Number.POSITIVE_INFINITY
    Number.NEGATIVE_INFINITY
    Number.NaN

Для практичного Full Stack JavaScript особливо важливо вміти:

    string
      ↓
    Number()
      ↓
    Number.isFinite()
      ↓
    Number.isInteger()
      ↓
    range validation
      ↓
    business logic

Цей шаблон постійно зустрічається у:

- HTML forms;
- React forms;
- Next.js applications;
- Node.js;
- Express;
- NestJS;
- REST API;
- PostgreSQL;
- валідації даних.

> **Головна ідея:** не просто перетворювати значення на число, а перевіряти, що отримане число справді відповідає вимогам програми.