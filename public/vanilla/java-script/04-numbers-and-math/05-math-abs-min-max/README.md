# 05. Math — abs, min, max

## 📌 Зміст

1. [Що таке Math.abs(), Math.min(), Math.max()](#-що-таке-mathabs-mathmin-mathmax)
2. [Math.abs()](#1-mathabs)
3. [Math.min()](#2-mathmin)
4. [Math.max()](#3-mathmax)
5. [Порівняння abs, min, max](#-порівняння-abs-min-max)
6. [Math.abs() і негативні числа](#-mathabs-і-негативні-числа)
7. [Math.min() та Math.max() з кількома значеннями](#-mathmin-та-mathmax-з-кількома-значеннями)
8. [Math.min() та Math.max() без аргументів](#-mathmin-та-mathmax-без-аргументів)
9. [Робота з масивами](#-робота-з-масивами)
10. [Spread operator та Math.min/max](#-spread-operator-та-mathminmax)
11. [Практичні приклади Math.abs()](#-практичні-приклади-mathabs)
12. [Практичні приклади Math.min() та Math.max()](#-практичні-приклади-mathmin-та-mathmax)
13. [Обмеження значення в діапазоні](#-обмеження-значення-в-діапазоні)
14. [Типові помилки](#-типові-помилки)
15. [Міні-практика](#-міні-практика)
16. [Зв'язок з іншими Math-методами](#-звязок-з-іншими-math-методами)
17. [Що потрібно знати Junior](#-що-потрібно-знати-junior)
18. [Питання на співбесіді](#-питання-на-співбесіді)
19. [Коротка шпаргалка](#-коротка-шпаргалка)

---

# 📌 Що таке Math.abs(), Math.min(), Math.max()

`Math` містить багато математичних методів.

У цій темі розглядаємо три дуже практичні:

    Math.abs()
    Math.min()
    Math.max()

Вони використовуються для:

- роботи з відстанями;
- порівняння чисел;
- пошуку мінімального значення;
- пошуку максимального значення;
- перевірки діапазонів;
- обмеження значень;
- роботи з координатами;
- обробки результатів обчислень;
- валідації даних.

---

# 🎯 Основна ідея

Запам'ятай:

    Math.abs()
    → абсолютне значення

    Math.min()
    → найменше число

    Math.max()
    → найбільше число

Наприклад:

    Math.abs(-10);
    // 10

    Math.min(10, 5, 20);
    // 5

    Math.max(10, 5, 20);
    // 20

---

# 1. Math.abs()

`Math.abs()` повертає **абсолютне значення** числа.

Абсолютне значення — це відстань числа від нуля без урахування знака.

Наприклад:

    Math.abs(10);
    // 10

    Math.abs(-10);
    // 10

    Math.abs(0);
    // 0

---

# 📌 Як працює Math.abs()

    Math.abs(5);
    // 5

    Math.abs(-5);
    // 5

    Math.abs(100);
    // 100

    Math.abs(-100);
    // 100

Тобто:

    -5 → 5
    -10 → 10
    -25 → 25

Позитивне число залишається позитивним.

---

# 🧠 Абсолютне значення як відстань

Уявімо числову вісь:

    -10 ---- -5 ---- 0 ---- 5 ---- 10

Відстань від:

    -5 до 0 = 5

і:

    5 до 0 = 5

Тому:

    Math.abs(-5);
    // 5

    Math.abs(5);
    // 5

---

# 📐 Math.abs() і відстань між двома числами

Одна з найважливіших практичних конструкцій:

    Math.abs(a - b)

Вона дозволяє знайти відстань між двома числами.

Наприклад:

    const a = 10;
    const b = 4;

    const distance = Math.abs(a - b);

    console.log(distance);
    // 6

---

Якщо числа поміняти місцями:

    const a = 4;
    const b = 10;

    const distance = Math.abs(a - b);

    console.log(distance);
    // 6

Саме тому `Math.abs(a - b)` дуже зручний.

---

# 🎯 Практичний приклад: координати

Є дві позиції:

    const positionA = 120;
    const positionB = 85;

Відстань:

    const distance = Math.abs(positionA - positionB);

    console.log(distance);
    // 35

---

# 🎯 Практичний приклад: різниця температури

Було:

    20°C

Стало:

    27°C

Різниця:

    const difference = Math.abs(27 - 20);

    console.log(difference);
    // 7

Якщо температура впала:

    const difference = Math.abs(20 - 27);

    console.log(difference);
    // 7

---

# 🎯 Практичний приклад: похибка

Очікуване значення:

    100

Фактичне:

    97

Похибка:

    const error = Math.abs(100 - 97);

    console.log(error);
    // 3

---

# 🎯 Практичний приклад: перевірка похибки

Наприклад, допускається похибка не більше `5`:

    const expected = 100;
    const actual = 97;

    const error = Math.abs(expected - actual);

    if (error <= 5) {
        console.log("Результат прийнятний");
    } else {
        console.log("Занадто велика похибка");
    }

---

# ⚠️ Math.abs() не округлює

Наприклад:

    Math.abs(-4.7);
    // 4.7

Він не робить:

    5

Для округлення використовуй:

    Math.round()

    Math.floor()

    Math.ceil()

    Math.trunc()

---

# 2. Math.min()

`Math.min()` повертає найменше передане значення.

Приклад:

    Math.min(10, 5, 20);
    // 5

---

## Приклади

    Math.min(1, 2, 3);
    // 1

    Math.min(10, 5, 8);
    // 5

    Math.min(-1, -5, -3);
    // -5

    Math.min(100, 20, 50);
    // 20

---

# 🧠 Math.min() і негативні числа

Пам'ятай:

    -10 < -5

Тому:

    Math.min(-5, -10);
    // -10

А:

    Math.max(-5, -10);
    // -5

---

# 3. Math.max()

`Math.max()` повертає найбільше передане значення.

Приклад:

    Math.max(10, 5, 20);
    // 20

---

## Приклади

    Math.max(1, 2, 3);
    // 3

    Math.max(10, 5, 8);
    // 10

    Math.max(-1, -5, -3);
    // -1

    Math.max(100, 20, 50);
    // 100

---

# 📊 Порівняння Math.min() і Math.max()

    const a = 10;
    const b = 25;
    const c = 7;

    Math.min(a, b, c);
    // 7

    Math.max(a, b, c);
    // 25

---

# 📋 Таблиця

| Вираз | Результат |
|---|---:|
| `Math.min(1, 2, 3)` | `1` |
| `Math.max(1, 2, 3)` | `3` |
| `Math.min(-1, -5, -3)` | `-5` |
| `Math.max(-1, -5, -3)` | `-1` |
| `Math.min(10, 10, 20)` | `10` |
| `Math.max(10, 10, 20)` | `20` |

---

# 🔢 Math.min() та Math.max() з кількома значеннями

Обидва методи приймають довільну кількість аргументів.

Наприклад:

    Math.min(10, 20);
    // 10

    Math.min(10, 20, 30);
    // 10

    Math.min(10, 20, 30, 5, 100);
    // 5

---

Так само:

    Math.max(10, 20);
    // 20

    Math.max(10, 20, 30);
    // 30

    Math.max(10, 20, 30, 5, 100);
    // 100

---

# ⚠️ Math.min() та Math.max() не приймають масив як один аргумент

Це не працює так, як можна очікувати:

    const numbers = [10, 5, 20];

    Math.min(numbers);
    // NaN

    Math.max(numbers);
    // NaN

Причина:

`Math.min()` та `Math.max()` очікують окремі числові аргументи.

---

# ✅ Spread operator

Для масиву використовуй:

    ...

Наприклад:

    const numbers = [10, 5, 20];

    Math.min(...numbers);
    // 5

    Math.max(...numbers);
    // 20

---

# 🔥 Spread + Math.min()

    const numbers = [10, 5, 20, 8, 30];

    const min = Math.min(...numbers);

    console.log(min);
    // 5

---

# 🔥 Spread + Math.max()

    const numbers = [10, 5, 20, 8, 30];

    const max = Math.max(...numbers);

    console.log(max);
    // 30

---

# 🧠 Що відбувається зі Spread

Маємо:

    const numbers = [10, 5, 20];

Вираз:

    Math.min(...numbers)

перетворюється концептуально на:

    Math.min(10, 5, 20)

Тому результат:

    5

---

# ⚠️ Великі масиви

Для звичайних невеликих масивів:

    Math.min(...numbers)

цілком нормально.

Але для дуже великих масивів spread може бути непридатним через обмеження кількості аргументів функції.

Для великих масивів краще використовувати цикл або:

    reduce()

Наприклад:

    const numbers = [10, 5, 20, 8];

    const min = numbers.reduce((currentMin, value) => {
        return Math.min(currentMin, value);
    }, Infinity);

---

# 🔄 Math.min() та Math.max() без аргументів

Це важливий edge case.

    Math.min();
    // Infinity

    Math.max();
    // -Infinity

Чому?

Ці значення дозволяють коректно працювати з алгоритмами пошуку мінімуму та максимуму.

---

# 📌 Чому Math.min() повертає Infinity?

Якщо немає жодного значення, мінімум повинен бути таким, щоб будь-яке реальне число було меншим.

Тому:

    Math.min();
    // Infinity

Наприклад:

    Math.min(Infinity, 10, 20);
    // 10

---

# 📌 Чому Math.max() повертає -Infinity?

Аналогічно:

    Math.max();
    // -Infinity

Будь-яке звичайне число буде більшим за `-Infinity`.

Наприклад:

    Math.max(-Infinity, 10, 20);
    // 20

---

# ⚠️ Math.min() / Math.max() та NaN

Якщо хоча б один аргумент є `NaN`, результат:

    NaN

Наприклад:

    Math.min(10, 20, NaN);
    // NaN

    Math.max(10, 20, NaN);
    // NaN

---

# ⚠️ Math.min() / Math.max() та рядки

Методи можуть виконувати числове перетворення аргументів.

Наприклад:

    Math.min("10", "5");
    // 5

    Math.max("10", "5");
    // 10

Але це не означає, що варто покладатися на implicit conversion.

Краще працювати з числами явно:

    const a = Number("10");
    const b = Number("5");

    Math.min(a, b);
    // 5

---

# ❌ Некоректний рядок

    Math.min(10, "hello");
    // NaN

    Math.max(10, "hello");
    // NaN

---

# 🧩 Практичні приклади Math.abs()

## 1. Відстань між координатами

    const x1 = 100;
    const x2 = 65;

    const distance = Math.abs(x1 - x2);

    console.log(distance);
    // 35

---

## 2. Відстань між двома температурами

    const t1 = -5;
    const t2 = 3;

    const difference = Math.abs(t1 - t2);

    console.log(difference);
    // 8

---

## 3. Порівняння очікуваного і фактичного

    const expected = 500;
    const actual = 487;

    const difference = Math.abs(expected - actual);

    console.log(difference);
    // 13

---

## 4. Перевірка допустимого відхилення

    const expected = 100;
    const actual = 103;
    const tolerance = 5;

    const difference = Math.abs(expected - actual);

    if (difference <= tolerance) {
        console.log("OK");
    } else {
        console.log("Помилка");
    }

---

# 🧩 Практичні приклади Math.min() та Math.max()

## 1. Найменше з трьох значень

    const a = 15;
    const b = 8;
    const c = 20;

    const min = Math.min(a, b, c);

    console.log(min);
    // 8

---

## 2. Найбільше з трьох значень

    const a = 15;
    const b = 8;
    const c = 20;

    const max = Math.max(a, b, c);

    console.log(max);
    // 20

---

## 3. Мінімальна ціна

    const prices = [120, 80, 250, 95];

    const minPrice = Math.min(...prices);

    console.log(minPrice);
    // 80

---

## 4. Максимальна ціна

    const prices = [120, 80, 250, 95];

    const maxPrice = Math.max(...prices);

    console.log(maxPrice);
    // 250

---

## 5. Мінімальна температура

    const temperatures = [5, -2, 8, 1, -5];

    const minTemperature = Math.min(...temperatures);

    console.log(minTemperature);
    // -5

---

## 6. Максимальна температура

    const temperatures = [5, -2, 8, 1, -5];

    const maxTemperature = Math.max(...temperatures);

    console.log(maxTemperature);
    // 8

---

# 🎯 Обмеження значення в діапазоні

Одна з дуже корисних конструкцій:

    Math.min(Math.max(value, min), max)

Вона дозволяє обмежити число діапазоном.

Наприклад:

    min = 0
    max = 100

---

## Значення менше мінімуму

    const value = -20;

    const result = Math.min(Math.max(value, 0), 100);

    console.log(result);
    // 0

---

## Значення всередині діапазону

    const value = 50;

    const result = Math.min(Math.max(value, 0), 100);

    console.log(result);
    // 50

---

## Значення більше максимуму

    const value = 150;

    const result = Math.min(Math.max(value, 0), 100);

    console.log(result);
    // 100

---

# 🧠 Як працює clamp

Маємо:

    Math.min(Math.max(value, min), max)

Спочатку:

    Math.max(value, min)

гарантує:

    value >= min

Потім:

    Math.min(..., max)

гарантує:

    value <= max

Отже:

    min <= result <= max

---

# 📌 Практичний приклад: гучність

Нехай гучність повинна бути від `0` до `100`.

    const volume = 135;

    const safeVolume = Math.min(Math.max(volume, 0), 100);

    console.log(safeVolume);
    // 100

---

Якщо:

    const volume = -10;

    const safeVolume = Math.min(Math.max(volume, 0), 100);

    console.log(safeVolume);
    // 0

---

# 📌 Практичний приклад: progress

Прогрес повинен бути:

    0 ... 100

    const progress = 125;

    const safeProgress = Math.min(Math.max(progress, 0), 100);

    console.log(safeProgress);
    // 100

---

# 📌 Практичний приклад: age

Припустимо, значення має бути від 0 до 120:

    const age = 150;

    const safeAge = Math.min(Math.max(age, 0), 120);

    console.log(safeAge);
    // 120

Зверни увагу:

для реальної валідації даних часто краще повідомити про помилку, а не просто "обрізати" значення.

---

# 🧩 Альтернативний запис clamp

Можна написати:

    const clamped = Math.min(
        Math.max(value, min),
        max
    );

Наприклад:

    const value = 150;
    const min = 0;
    const max = 100;

    const clamped = Math.min(
        Math.max(value, min),
        max
    );

    console.log(clamped);
    // 100

---

# 📐 Math.abs() + Math.min() + Math.max()

Ці методи часто використовуються разом.

Наприклад:

    const current = 75;
    const target = 100;

    const difference = Math.abs(current - target);

    const progress = Math.min(
        Math.max(current, 0),
        100
    );

    console.log(difference);
    // 25

    console.log(progress);
    // 75

---

# 🎮 Практичний приклад: координата

Нехай координата повинна бути в межах:

    0 ... 500

    const x = 650;

    const safeX = Math.min(Math.max(x, 0), 500);

    console.log(safeX);
    // 500

---

# 🧮 Практичний приклад: різниця чисел

    const a = 100;
    const b = 145;

    const difference = Math.abs(a - b);

    console.log(difference);
    // 45

---

# 🧮 Практичний приклад: min + max

    const score1 = 75;
    const score2 = 82;
    const score3 = 68;

    const lowest = Math.min(score1, score2, score3);
    const highest = Math.max(score1, score2, score3);

    console.log(lowest);
    // 68

    console.log(highest);
    // 82

---

# 📊 Практичний приклад: діапазон значень

Маючи:

    const values = [10, 25, 5, 40, 18];

можемо знайти:

    const min = Math.min(...values);
    const max = Math.max(...values);

    console.log(min);
    // 5

    console.log(max);
    // 40

А ширина діапазону:

    const range = max - min;

    console.log(range);
    // 35

---

# 🔍 Перевірка, чи число знаходиться між min і max

Можна використовувати:

    const value = 50;
    const min = 0;
    const max = 100;

    const isInRange = value >= min && value <= max;

    console.log(isInRange);
    // true

`Math.min()` і `Math.max()` тут не обов'язкові.

---

# 🧠 Не плутай clamp і validation

Clamp:

    const safeValue = Math.min(Math.max(value, 0), 100);

змінює значення.

Наприклад:

    150 → 100

Validation:

    if (value < 0 || value > 100) {
        console.log("Invalid value");
    }

не змінює значення, а повідомляє про помилку.

Для даних від користувача або API це важлива різниця.

---

# ⚠️ Типові помилки

## 1. Передавати масив без spread

❌ Неправильно:

    const numbers = [10, 5, 20];

    Math.min(numbers);
    // NaN

Правильно:

    Math.min(...numbers);
    // 5

---

## 2. Плутати min і max

    Math.min(10, 20);
    // 10

    Math.max(10, 20);
    // 20

---

## 3. Плутати абсолютне значення з округленням

    Math.abs(-4.7);
    // 4.7

Це не:

    5

Для округлення:

    Math.round(-4.7);
    // -5

---

## 4. Вважати Math.abs() модулем тільки негативного числа

Для позитивного:

    Math.abs(10);
    // 10

Для негативного:

    Math.abs(-10);
    // 10

---

## 5. Забувати про NaN

    Math.min(10, NaN);
    // NaN

    Math.max(10, NaN);
    // NaN

Якщо дані можуть бути некоректними, їх потрібно перевірити до обчислення.

---

## 6. Передавати нечислові значення

    Math.max(10, "hello");
    // NaN

Краще явно перетворювати дані:

    const value = Number(input);

    if (!Number.isFinite(value)) {
        // помилка
    }

---

## 7. Плутати min/max із перевіркою діапазону

`Math.min()` і `Math.max()` можуть допомогти створити clamp, але вони не замінюють валідацію.

---

# 🧪 Міні-практика

## Вправа 1

Визнач результат:

    Math.abs(-15);

    Math.abs(15);

    Math.abs(-3.14);

---

## Вправа 2

Знайди відстань між:

    120
    75

Використай:

    Math.abs()

---

## Вправа 3

Знайди найменше число:

    15
    8
    23
    4
    17

Використай:

    Math.min()

---

## Вправа 4

Знайди найбільше число:

    15
    8
    23
    4
    17

Використай:

    Math.max()

---

## Вправа 5

Маємо:

    const numbers = [15, 8, 23, 4, 17];

Знайди min і max.

Підказка:

    Math.min(...numbers)

    Math.max(...numbers)

---

## Вправа 6

Маємо:

    const value = 150;

Потрібно обмежити його діапазоном:

    0 ... 100

Підказка:

    Math.min(Math.max(value, 0), 100)

---

## Вправа 7

Є:

    const expected = 500;
    const actual = 487;

Знайди абсолютну похибку.

---

## Вправа 8

Є:

    const scores = [78, 92, 65, 88, 71];

Знайди:

- мінімальний score;
- максимальний score;
- різницю між ними.

---

# 🎤 Питання на співбесіді

### 1. Що робить Math.abs()?

Повертає абсолютне значення числа.

    Math.abs(-10);
    // 10

---

### 2. Для чого використовують Math.abs(a - b)?

Щоб отримати абсолютну відстань або різницю між двома числами.

    Math.abs(10 - 4);
    // 6

---

### 3. Що робить Math.min()?

Повертає найменше з переданих значень.

    Math.min(10, 5, 20);
    // 5

---

### 4. Що робить Math.max()?

Повертає найбільше з переданих значень.

    Math.max(10, 5, 20);
    // 20

---

### 5. Як знайти min у масиві?

    const numbers = [10, 5, 20];

    Math.min(...numbers);

---

### 6. Чому Math.min(numbers) не працює для масиву?

Тому що `Math.min()` очікує окремі аргументи, а не масив.

Потрібно:

    Math.min(...numbers)

---

### 7. Що повертає Math.min() без аргументів?

    Infinity

---

### 8. Що повертає Math.max() без аргументів?

    -Infinity

---

### 9. Що станеться, якщо передати NaN?

    Math.min(10, NaN);
    // NaN

    Math.max(10, NaN);
    // NaN

---

### 10. Як обмежити число діапазоном?

Наприклад, від `0` до `100`:

    Math.min(Math.max(value, 0), 100)

---

### 11. Чим clamp відрізняється від validation?

Clamp змінює значення до допустимого діапазону.

Validation перевіряє, чи значення допустиме, і зазвичай повідомляє про помилку, якщо ні.

---

### 12. Чи змінює Math.abs() оригінальне число?

Ні.

Числа в JavaScript є примітивними значеннями.

Метод повертає нове числове значення.

---

### 13. Чи округлює Math.abs() число?

Ні.

    Math.abs(-4.7);
    // 4.7

---

### 14. Як знайти діапазон масиву?

    const numbers = [10, 25, 5, 40];

    const min = Math.min(...numbers);
    const max = Math.max(...numbers);

    const range = max - min;

---

# 🧠 Рівні знань

## 🟢 Beginner

Знати:

    Math.abs()
    Math.min()
    Math.max()

Розуміти:

    abs → абсолютне значення
    min → найменше
    max → найбільше

---

## 🔵 Junior

Вміти:

- знаходити відстань між числами;
- знаходити min/max;
- працювати з масивами через spread;
- працювати з негативними числами;
- розуміти `NaN`;
- використовувати clamp;
- розуміти різницю між clamp і validation.

---

## 🟠 Middle

Корисно знати:

- edge cases;
- `Infinity`;
- `-Infinity`;
- `NaN`;
- implicit numeric conversion;
- обмеження spread для великих масивів;
- альтернативу через `reduce()`.

---

## 🔴 Senior

На глибшому рівні:

- ECMAScript specification;
- IEEE 754;
- поведінку `-0`;
- numeric coercion;
- precision;
- edge cases математичних операцій.

---

# 🔗 Зв'язок з іншими Math-методами

У попередній темі:

    04-math-round-floor-ceil-trunc

ми вивчали:

    Math.round()
    Math.floor()
    Math.ceil()
    Math.trunc()

У цій темі:

    05-math-abs-min-max

вивчаємо:

    Math.abs()
    Math.min()
    Math.max()

Далі:

    06-math-pow-sqrt

    Math.pow()
    Math.sqrt()

Потім:

    07-random-numbers

    Math.random()

І:

    08-random-numbers-and-ranges

    Math.random()
    Math.floor()
    Math.ceil()

---

# 🧩 Комбінація Math-методів

У реальному коді методи часто комбінуються.

Наприклад:

    const value = 87.6;

    const rounded = Math.round(value);
    const absolute = Math.abs(value - 100);
    const limited = Math.min(Math.max(value, 0), 100);

    console.log(rounded);
    // 88

    console.log(absolute);
    // 12.400000000000006

    console.log(limited);
    // 87.6

Зверни увагу на можливу floating-point похибку:

    100 - 87.6

У простих прикладах це не проблема, але при точних обчисленнях потрібно враховувати floating-point precision.

Детальніше:

    09-floating-point-and-precision

---

# 📚 Підсумок

## Math.abs()

Використовуй для абсолютного значення:

    Math.abs(-25);
    // 25

Особливо корисно:

    Math.abs(a - b)

для знаходження відстані між двома числами.

---

## Math.min()

Використовуй для пошуку найменшого:

    Math.min(10, 5, 20);
    // 5

Для масиву:

    Math.min(...numbers)

---

## Math.max()

Використовуй для пошуку найбільшого:

    Math.max(10, 5, 20);
    // 20

Для масиву:

    Math.max(...numbers)

---

## Clamp

Для обмеження значення:

    Math.min(Math.max(value, min), max)

---

# ⚡ Коротка шпаргалка

    // Абсолютне значення
    Math.abs(-10);
    // 10

    // Найменше число
    Math.min(10, 5, 20);
    // 5

    // Найбільше число
    Math.max(10, 5, 20);
    // 20

    // Відстань між числами
    Math.abs(10 - 4);
    // 6

    // Min масиву
    const numbers = [10, 5, 20];

    Math.min(...numbers);
    // 5

    // Max масиву
    Math.max(...numbers);
    // 20

    // Clamp 0...100
    Math.min(Math.max(value, 0), 100);

---

# 🎯 Головне правило

> **`Math.abs()` прибирає знак і дає відстань від нуля; `Math.min()` знаходить найменше значення; `Math.max()` — найбільше. Для масивів використовуй spread `...`, а для обмеження значення в діапазоні — комбінацію `Math.min(Math.max(...))`.**