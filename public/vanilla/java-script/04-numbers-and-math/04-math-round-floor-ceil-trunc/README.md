# 04. Math — round, floor, ceil, trunc

## 📌 Зміст

1. [Що таке Math](#-що-таке-math)
2. [Округлення чисел](#-округлення-чисел)
3. [Math.round()](#1-mathround)
4. [Math.floor()](#2-mathfloor)
5. [Math.ceil()](#3-mathceil)
6. [Math.trunc()](#4-mathtrunc)
7. [Порівняння методів](#-порівняння-методів)
8. [Позитивні числа](#-позитивні-числа)
9. [Негативні числа](#-негативні-числа)
10. [Різниця floor та trunc](#-різниця-floor-та-trunc)
11. [Різниця ceil та trunc](#-різниця-ceil-та-trunc)
12. [Округлення до потрібної кількості знаків](#-округлення-до-потрібної-кількості-знаків)
13. [Типові практичні задачі](#-типові-практичні-задачі)
14. [Типові помилки](#-типові-помилки)
15. [Міні-практика](#-міні-практика)
16. [Що потрібно знати Junior](#-що-потрібно-знати-junior)
17. [Питання на співбесіді](#-питання-на-співбесіді)
18. [Коротка шпаргалка](#-коротка-шпаргалка)

---

# 📌 Що таке Math

`Math` — це вбудований об'єкт JavaScript, який містить математичні константи та методи.

Наприклад:

    Math.round(4.6);
    // 5

    Math.floor(4.6);
    // 4

    Math.ceil(4.1);
    // 5

    Math.trunc(4.9);
    // 4

`Math` не створюється через `new`.

❌ Не потрібно:

    const math = new Math();

Правильно:

    Math.round(4.6);

    Math.floor(4.6);

    Math.ceil(4.1);

---

# 🎯 Навіщо потрібні round, floor, ceil, trunc

Ці методи потрібні, коли потрібно перетворити дробове число на ціле.

Наприклад:

    10.2
    10.5
    10.9

можна перетворити на:

    10
    11

Але спосіб перетворення залежить від методу.

Основні методи:

| Метод | Основна дія |
|---|---|
| `Math.round()` | округлення до найближчого цілого |
| `Math.floor()` | округлення вниз |
| `Math.ceil()` | округлення вгору |
| `Math.trunc()` | відкидання дробової частини |

---

# 🧠 Головна ідея

Запам'ятай чотири правила:

    Math.round()
    → найближче ціле

    Math.floor()
    → вниз

    Math.ceil()
    → вгору

    Math.trunc()
    → просто відкинути дробову частину

Для позитивних чисел це легко:

    4.3 → round 4
    4.3 → floor 4
    4.3 → ceil 5
    4.3 → trunc 4

Але з негативними числами є важлива особливість:

    -4.3 → floor -5
    -4.3 → ceil -4
    -4.3 → trunc -4

Саме негативні числа найчастіше створюють плутанину.

---

# 1. Math.round()

`Math.round()` повертає найближче ціле число.

Приклади:

    Math.round(4.1);
    // 4

    Math.round(4.4);
    // 4

    Math.round(4.5);
    // 5

    Math.round(4.6);
    // 5

    Math.round(4.9);
    // 5

---

# 📌 Правило Math.round()

У спрощеному вигляді:

    дробова частина < 0.5
    → вниз

    дробова частина >= 0.5
    → вгору

Наприклад:

    Math.round(10.2);
    // 10

    Math.round(10.49);
    // 10

    Math.round(10.5);
    // 11

    Math.round(10.99);
    // 11

---

# ⚠️ Math.round() і негативні числа

З негативними числами поведінка має особливості.

    Math.round(-4.1);
    // -4

    Math.round(-4.4);
    // -4

    Math.round(-4.5);
    // -4

    Math.round(-4.6);
    // -5

Зверни увагу:

    Math.round(-4.5);
    // -4

Тобто не варто механічно застосовувати правило "0.5 завжди йде до більшого за модулем".

Для `Math.round()` важливо орієнтуватися на правила JavaScript.

---

# 2. Math.floor()

`Math.floor()` повертає найбільше ціле число, яке **не перевищує** задане число.

Простіше:

> `floor` завжди рухається до `-Infinity`.

---

## Позитивні числа

    Math.floor(4.1);
    // 4

    Math.floor(4.9);
    // 4

    Math.floor(10.99);
    // 10

---

## Негативні числа

    Math.floor(-4.1);
    // -5

    Math.floor(-4.9);
    // -5

    Math.floor(-10.1);
    // -11

Це важливо:

    Math.floor(-4.1);
    // -5

а не:

    -4

---

# 🧠 Як запам'ятати floor

Уяви числову вісь:

    -5 ---- -4 ---- -3 ---- -2 ---- -1 ---- 0 ---- 1 ---- 2 ---- 3 ---- 4 ---- 5
                   ↑
                 -4.1

`floor(-4.1)` рухається вліво:

    -5

Тобто:

    Math.floor()
    → до -Infinity

---

# 3. Math.ceil()

`Math.ceil()` повертає найменше ціле число, яке **не менше** заданого числа.

Простіше:

> `ceil` завжди рухається до `+Infinity`.

---

## Позитивні числа

    Math.ceil(4.1);
    // 5

    Math.ceil(4.9);
    // 5

    Math.ceil(10.01);
    // 11

---

## Негативні числа

    Math.ceil(-4.1);
    // -4

    Math.ceil(-4.9);
    // -4

    Math.ceil(-10.01);
    // -10

---

# 🧠 Як запам'ятати ceil

`ceil` можна уявити як рух вправо по числовій осі:

    -5 ---- -4 ---- -3 ---- -2 ---- -1 ---- 0 ---- 1 ---- 2 ---- 3 ---- 4 ---- 5
                   ↑
                 -4.1

    Math.ceil(-4.1)
    // -4

Тобто:

    Math.ceil()
    → до +Infinity

---

# 4. Math.trunc()

`Math.trunc()` просто відкидає дробову частину.

Він **не округлює** число.

Наприклад:

    Math.trunc(4.9);
    // 4

    Math.trunc(4.1);
    // 4

    Math.trunc(4.999);
    // 4

---

## Негативні числа

    Math.trunc(-4.1);
    // -4

    Math.trunc(-4.9);
    // -4

    Math.trunc(-10.99);
    // -10

---

# 🧠 Як запам'ятати trunc

`trunc` = **truncate** = обрізати.

    12.987
      ↓
    12

    -12.987
       ↓
    -12

Тобто `trunc` рухається до нуля.

---

# 📊 Порівняння методів

Для:

    4.7

отримуємо:

    Math.round(4.7);
    // 5

    Math.floor(4.7);
    // 4

    Math.ceil(4.7);
    // 5

    Math.trunc(4.7);
    // 4

---

Для:

    -4.7

отримуємо:

    Math.round(-4.7);
    // -5

    Math.floor(-4.7);
    // -5

    Math.ceil(-4.7);
    // -4

    Math.trunc(-4.7);
    // -4

---

# 📋 Велика таблиця

| Значення | `round()` | `floor()` | `ceil()` | `trunc()` |
|---:|---:|---:|---:|---:|
| `4.1` | `4` | `4` | `5` | `4` |
| `4.4` | `4` | `4` | `5` | `4` |
| `4.5` | `5` | `4` | `5` | `4` |
| `4.9` | `5` | `4` | `5` | `4` |
| `-4.1` | `-4` | `-5` | `-4` | `-4` |
| `-4.4` | `-4` | `-5` | `-4` | `-4` |
| `-4.5` | `-4` | `-5` | `-4` | `-4` |
| `-4.9` | `-5` | `-5` | `-4` | `-4` |

---

# 🧭 Напрямок округлення

Це найкращий спосіб запам'ятати різницю.

    Math.floor()
    → -Infinity

    Math.ceil()
    → +Infinity

    Math.trunc()
    → 0

    Math.round()
    → найближче ціле

Схематично:

    floor
      ↓
    -Infinity

    ceil
      ↑
    +Infinity

    trunc
      →
      0

    round
      →
    найближче ціле

---

# 🔢 Позитивні числа

Для позитивних чисел різниця особливо проста.

Візьмемо:

    7.3

Тоді:

    Math.round(7.3);
    // 7

    Math.floor(7.3);
    // 7

    Math.ceil(7.3);
    // 8

    Math.trunc(7.3);
    // 7

---

Візьмемо:

    7.8

    Math.round(7.8);
    // 8

    Math.floor(7.8);
    // 7

    Math.ceil(7.8);
    // 8

    Math.trunc(7.8);
    // 7

---

# ➖ Негативні числа

Саме тут потрібно бути уважним.

Візьмемо:

    -7.3

    Math.round(-7.3);
    // -7

    Math.floor(-7.3);
    // -8

    Math.ceil(-7.3);
    // -7

    Math.trunc(-7.3);
    // -7

---

Візьмемо:

    -7.8

    Math.round(-7.8);
    // -8

    Math.floor(-7.8);
    // -8

    Math.ceil(-7.8);
    // -7

    Math.trunc(-7.8);
    // -7

---

# 🔥 Різниця floor та trunc

Це одна з найважливіших відмінностей.

Для позитивних чисел:

    Math.floor(4.9);
    // 4

    Math.trunc(4.9);
    // 4

Результат однаковий.

Але для негативних:

    Math.floor(-4.9);
    // -5

    Math.trunc(-4.9);
    // -4

Тому:

> `floor` → до `-Infinity`

> `trunc` → до `0`

---

# 🔥 Різниця ceil та trunc

Для позитивних:

    Math.ceil(4.9);
    // 5

    Math.trunc(4.9);
    // 4

Для негативних:

    Math.ceil(-4.9);
    // -4

    Math.trunc(-4.9);
    // -4

---

# 🧠 Просте правило для запам'ятовування

    floor → вниз по числовій осі
    ceil  → вгору по числовій осі
    trunc → до нуля
    round → до найближчого цілого

Але "вниз" та "вгору" потрібно розуміти математично:

    floor → -Infinity
    ceil  → +Infinity

а не:

    floor → менше за модулем
    ceil  → більше за модулем

---

# 🎯 Коли використовувати Math.round()

Використовуй `round()`, коли потрібно отримати найближче ціле.

Наприклад:

- приблизна кількість;
- округлення рейтингу;
- відображення результату;
- координати;
- значення UI.

Приклад:

    const rating = 4.7;

    const roundedRating = Math.round(rating);

    console.log(roundedRating);
    // 5

---

# 🎯 Коли використовувати Math.floor()

`floor()` корисний, коли потрібно гарантовано округлити вниз.

Наприклад:

- кількість повних одиниць;
- сторінки;
- індекси;
- групування;
- випадкові діапазони;
- розрахунок повних інтервалів.

Приклад:

    const pages = 4.9;

    console.log(Math.floor(pages));
    // 4

---

# 🎯 Коли використовувати Math.ceil()

`ceil()` корисний, коли потрібно округлити вгору.

Наприклад:

- кількість коробок;
- кількість сторінок;
- кількість груп;
- необхідна кількість запитів;
- кількість повних блоків.

Приклад:

    const students = 47;
    const studentsPerGroup = 10;

    const groups = Math.ceil(students / studentsPerGroup);

    console.log(groups);
    // 5

47 студентів неможливо розподілити на групи по 10, використавши тільки 4 групи.

Тому:

    Math.ceil(47 / 10);
    // 5

---

# 🎯 Коли використовувати Math.trunc()

`trunc()` використовують, коли потрібно просто видалити дробову частину.

Наприклад:

    const value = 15.99;

    Math.trunc(value);
    // 15

Для негативного:

    const value = -15.99;

    Math.trunc(value);
    // -15

---

# 📄 Практичний приклад: сторінки

Є:

    const totalItems = 47;
    const itemsPerPage = 10;

Кількість сторінок:

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    console.log(totalPages);
    // 5

Тут `ceil()` логічніший за `floor()`.

---

# 📦 Практичний приклад: коробки

Є 101 товар.

В одну коробку поміщається 20.

    const items = 101;
    const perBox = 20;

    const boxes = Math.ceil(items / perBox);

    console.log(boxes);
    // 6

---

# 🧮 Практичний приклад: повні одиниці

Є:

    const minutes = 125;

Кількість повних годин:

    const hours = Math.floor(minutes / 60);

    console.log(hours);
    // 2

Залишок хвилин:

    const remainingMinutes = minutes % 60;

    console.log(remainingMinutes);
    // 5

Отримуємо:

    2 години 5 хвилин

---

# ⏱️ Практичний приклад: час

    const totalSeconds = 367;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    console.log(minutes);
    // 6

    console.log(seconds);
    // 7

---

# 🎮 Практичний приклад: рівень

Припустимо, за кожні 100 XP користувач отримує новий рівень.

    const xp = 350;

    const level = Math.floor(xp / 100) + 1;

    console.log(level);
    // 4

---

# 📊 Практичний приклад: відсотки

    const completed = 73;
    const total = 100;

    const percent = Math.round((completed / total) * 100);

    console.log(percent);
    // 73

---

# 💰 Округлення до 2 знаків після крапки

Для простих випадків можна використовувати множення, округлення та ділення:

    const price = 12.3456;

    const rounded = Math.round(price * 100) / 100;

    console.log(rounded);
    // 12.35

---

## Як це працює

Спочатку:

    12.3456 * 100
    // 1234.56

Потім:

    Math.round(1234.56)
    // 1235

Потім:

    1235 / 100
    // 12.35

---

# ⚠️ Важливо: це не форматування

Такий код:

    Math.round(12.3 * 100) / 100

повертає число:

    12.3

а не рядок:

    "12.30"

Якщо потрібно саме відображення з двома знаками після крапки, використовуй:

    toFixed()

Наприклад:

    const price = 12.3;

    console.log(price.toFixed(2));
    // "12.30"

`toFixed()` буде розглянуто в темі:

    10-number-formatting

---

# 🔢 Округлення до десятків

Можна використовувати той самий принцип.

Наприклад:

    const value = 127;

    const rounded = Math.round(value / 10) * 10;

    console.log(rounded);
    // 130

---

# 🔢 Округлення до сотень

    const value = 1275;

    const rounded = Math.round(value / 100) * 100;

    console.log(rounded);
    // 1300

---

# 🔢 Округлення вниз до десятків

    const value = 127;

    const result = Math.floor(value / 10) * 10;

    console.log(result);
    // 120

---

# 🔢 Округлення вгору до десятків

    const value = 121;

    const result = Math.ceil(value / 10) * 10;

    console.log(result);
    // 130

---

# 🧩 Універсальний шаблон

Для округлення до `n`:

    Math.round(value / n) * n

Для округлення вниз:

    Math.floor(value / n) * n

Для округлення вгору:

    Math.ceil(value / n) * n

Наприклад, до 100:

    Math.round(1240 / 100) * 100;
    // 1200

---

# ⚠️ Типові помилки

## 1. Плутати floor та trunc

❌ Не думай:

    floor(-4.9) === -4

Правильно:

    Math.floor(-4.9);
    // -5

А:

    Math.trunc(-4.9);
    // -4

---

## 2. Вважати ceil "більшим за модулем"

Наприклад:

    Math.ceil(-4.9);
    // -4

а не:

    -5

`ceil()` рухається до `+Infinity`.

---

## 3. Вважати round звичайним "відкиданням"

    Math.round(4.9);
    // 5

`round()` не відкидає дробову частину.

Для цього:

    Math.trunc(4.9);
    // 4

---

## 4. Використовувати floor замість ceil для кількості блоків

Наприклад:

    const items = 47;
    const perBox = 10;

    Math.floor(items / perBox);
    // 4

Але потрібно 5 коробок.

Правильно:

    Math.ceil(items / perBox);
    // 5

---

## 5. Забувати про негативні числа

Для позитивних:

    Math.floor(4.9);
    // 4

Для негативних:

    Math.floor(-4.9);
    // -5

Це нормальна математична поведінка `floor()`.

---

## 6. Плутати округлення і форматування

    Math.round(12.3);

змінює числове значення:

    12

А:

    (12.3).toFixed(2);

створює рядок:

    "12.30"

---

## 7. Очікувати точного фінансового округлення

JavaScript використовує floating-point `Number`.

Тому такі операції можуть мати особливості:

    0.1 + 0.2;
    // 0.30000000000000004

Тема точності:

    09-floating-point-and-precision

---

# 🧪 Міні-практика

## Вправа 1

Визнач результат:

    Math.round(4.4);

    Math.round(4.5);

    Math.round(4.9);

---

## Вправа 2

Визнач результат:

    Math.floor(4.9);

    Math.floor(-4.9);

---

## Вправа 3

Визнач результат:

    Math.ceil(4.1);

    Math.ceil(-4.1);

---

## Вправа 4

Визнач результат:

    Math.trunc(4.9);

    Math.trunc(-4.9);

---

## Вправа 5

Порівняй:

    Math.floor(-7.8);

    Math.trunc(-7.8);

Поясни, чому результати різні.

---

## Вправа 6

Є:

    const totalItems = 83;
    const itemsPerPage = 10;

Знайди кількість сторінок.

Підказка:

    Math.ceil(...)

---

## Вправа 7

Є:

    const totalMinutes = 185;

Знайди кількість повних годин.

Підказка:

    Math.floor(...)

---

## Вправа 8

Округли:

    const price = 19.8765;

до двох знаків після крапки як число.

Підказка:

    Math.round(price * 100) / 100

---

# 🧠 Швидкий алгоритм вибору методу

Постав питання:

### Потрібне найближче ціле?

    Math.round()

### Потрібно завжди вниз?

    Math.floor()

### Потрібно завжди вгору?

    Math.ceil()

### Потрібно просто забрати дробову частину?

    Math.trunc()

---

# 📌 Числова вісь

Корисно запам'ятати:

    -5   -4   -3   -2   -1    0    1    2    3    4    5
          ←───────────────→

    floor → до -Infinity
    ceil  → до +Infinity
    trunc → до 0
    round → до найближчого integer

---

# 🔗 Зв'язок з іншими Math-методами

У цьому розділі:

    04-math-round-floor-ceil-trunc

ми вивчаємо округлення.

Далі:

    05-math-abs-min-max

    Math.abs()
    Math.min()
    Math.max()

Потім:

    06-math-pow-sqrt

    Math.pow()
    Math.sqrt()

Далі:

    07-random-numbers

    Math.random()

І:

    08-random-numbers-and-ranges

    Math.random()
    + Math.floor()
    + Math.ceil()

---

# 🎲 Math.floor() + Math.random()

`Math.floor()` особливо часто використовується разом із `Math.random()`.

Наприклад, випадкове число від `0` до `9`:

    const randomNumber = Math.floor(Math.random() * 10);

Можливі результати:

    0
    1
    2
    ...
    9

Чому?

`Math.random()`:

    0 <= Math.random() < 1

Після множення:

    0 <= Math.random() * 10 < 10

Після:

    Math.floor()

отримуємо:

    0 ... 9

Це буде детально розглянуто в:

    08-random-numbers-and-ranges

---

# 🎤 Питання на співбесіді

### 1. Чим відрізняються Math.round(), Math.floor(), Math.ceil() та Math.trunc()?

`round()` округлює до найближчого цілого.

`floor()` округлює до `-Infinity`.

`ceil()` округлює до `+Infinity`.

`trunc()` відкидає дробову частину, рухаючись до нуля.

---

### 2. Що поверне Math.floor(4.9)?

    4

---

### 3. Що поверне Math.ceil(4.1)?

    5

---

### 4. Що поверне Math.trunc(4.9)?

    4

---

### 5. Що поверне Math.floor(-4.9)?

    -5

---

### 6. Що поверне Math.ceil(-4.9)?

    -4

---

### 7. Що поверне Math.trunc(-4.9)?

    -4

---

### 8. Чим floor відрізняється від trunc?

Для позитивних чисел часто дають однаковий результат:

    Math.floor(4.9);
    // 4

    Math.trunc(4.9);
    // 4

Але для негативних:

    Math.floor(-4.9);
    // -5

    Math.trunc(-4.9);
    // -4

`floor()` рухається до `-Infinity`, а `trunc()` — до `0`.

---

### 9. Для чого використовують Math.ceil()?

Коли потрібно отримати мінімальне ціле число, достатнє для покриття дробового результату.

Наприклад:

    Math.ceil(47 / 10);
    // 5

---

### 10. Як отримати кількість сторінок?

Наприклад:

    const totalItems = 47;
    const itemsPerPage = 10;

    const pages = Math.ceil(totalItems / itemsPerPage);

---

### 11. Як відкинути дробову частину?

    Math.trunc(value)

---

### 12. Як округлити до найближчого цілого?

    Math.round(value)

---

### 13. Як округлити вниз?

    Math.floor(value)

---

### 14. Як округлити вгору?

    Math.ceil(value)

---

### 15. Чи повертають ці методи Number?

Так.

Наприклад:

    typeof Math.round(4.5);
    // "number"

---

# 🏆 Що потрібно знати Junior

## Обов'язково

Треба впевнено знати:

    Math.round()
    Math.floor()
    Math.ceil()
    Math.trunc()

і розуміти:

    round → nearest integer
    floor → -Infinity
    ceil → +Infinity
    trunc → zero

---

## Особливо важливо

Вміти пояснити:

    Math.floor(-4.9);
    // -5

    Math.trunc(-4.9);
    // -4

Це класичне питання для перевірки розуміння.

---

## Практично

Вміти використовувати:

    Math.ceil(total / perPage)

для:

- сторінок;
- груп;
- коробок;
- пакетів;
- блоків;
- інших задач "скільки потрібно мінімально".

І:

    Math.floor(total / size)

для:

- повних груп;
- повних одиниць;
- повних годин;
- повних блоків.

---

# 🧠 Рівні знань

## 🟢 Beginner

Знати:

- `Math.round()`;
- `Math.floor()`;
- `Math.ceil()`;
- `Math.trunc()`;
- позитивні числа;
- базову різницю між методами.

---

## 🔵 Junior

Впевнено розуміти:

- негативні числа;
- `floor()` vs `trunc()`;
- `ceil()` для кількості блоків;
- округлення до потрібного кроку;
- зв'язок `Math.floor()` з `Math.random()`;
- різницю між числовим округленням та форматуванням.

---

## 🟠 Middle

Корисно розуміти:

- edge cases;
- `-0`;
- `NaN`;
- `Infinity`;
- floating-point precision;
- поведінку методів для спеціальних numeric values.

---

## 🔴 Senior

На глибшому рівні:

- ECMAScript specification;
- правила математичного округлення;
- IEEE 754;
- floating-point representation;
- `-0`;
- edge cases при numeric calculations.

---

# ⚠️ Спеціальні значення

Ці методи також мають визначену поведінку для:

    NaN

    Infinity

    -Infinity

Наприклад:

    Math.floor(NaN);
    // NaN

    Math.ceil(NaN);
    // NaN

    Math.trunc(NaN);
    // NaN

---

Для `Infinity`:

    Math.floor(Infinity);
    // Infinity

    Math.ceil(Infinity);
    // Infinity

    Math.trunc(Infinity);
    // Infinity

---

Для `-Infinity`:

    Math.floor(-Infinity);
    // -Infinity

    Math.ceil(-Infinity);
    // -Infinity

    Math.trunc(-Infinity);
    // -Infinity

---

# 🔎 Цікавий випадок: -0

JavaScript має спеціальне значення:

    -0

Наприклад:

    Math.trunc(-0.5);
    // -0

Перевірити:

    Object.is(Math.trunc(-0.5), -0);
    // true

При цьому:

    -0 === 0;
    // true

Але:

    Object.is(-0, 0);
    // false

Це вже edge case, який не потрібно активно використовувати в повсякденному коді, але корисно знати про його існування.

---

# 📚 Підсумок

Чотири основні методи:

    Math.round()
    Math.floor()
    Math.ceil()
    Math.trunc()

Мають різну логіку.

    Math.round()
    → найближче ціле

    Math.floor()
    → до -Infinity

    Math.ceil()
    → до +Infinity

    Math.trunc()
    → до 0

Найважливіша відмінність:

    Math.floor(-4.9);
    // -5

    Math.trunc(-4.9);
    // -4

Для практичної Full Stack JavaScript роботи особливо корисні:

    Math.ceil(total / perPage)

    Math.floor(total / size)

    Math.round(value)

    Math.trunc(value)

А для форматування чисел потрібно переходити до:

    10-number-formatting

---

# ⚡ Коротка шпаргалка

    // Найближче ціле
    Math.round(4.6);
    // 5

    // Вниз → -Infinity
    Math.floor(4.9);
    // 4

    // Вгору → +Infinity
    Math.ceil(4.1);
    // 5

    // До нуля
    Math.trunc(4.9);
    // 4

---

## Негативні числа

    Math.round(-4.9);
    // -5

    Math.floor(-4.9);
    // -5

    Math.ceil(-4.9);
    // -4

    Math.trunc(-4.9);
    // -4

---

## Повторити

    floor → -Infinity

    ceil → +Infinity

    trunc → 0

    round → nearest integer

---

# 🎯 Головне правило

> **`round` — найближче, `floor` — вниз до `-Infinity`, `ceil` — вгору до `+Infinity`, `trunc` — просто відкинути дробову частину до нуля.**