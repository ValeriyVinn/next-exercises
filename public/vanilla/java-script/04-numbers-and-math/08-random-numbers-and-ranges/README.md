# 08. Random Numbers and Ranges

## 📌 Зміст

1. [Що вивчаємо](#-що-вивчаємо)
2. [Базова ідея випадкового діапазону](#-базова-ідея-випадкового-діапазону)
3. [Діапазон `[0, max)`](#-діапазон-0-max)
4. [Діапазон `[min, max)`](#-діапазон-min-max)
5. [Діапазон `[min, max]`](#-діапазон-min-max-1)
6. [Inclusive та exclusive межі](#-inclusive-та-exclusive-межі)
7. [Випадкове ціле число](#-випадкове-ціле-число)
8. [Випадкове дробове число](#-випадкове-дробове-число)
9. [Універсальна функція randomInt()](#-універсальна-функція-randomint)
10. [Універсальна функція randomFloat()](#-універсальна-функція-randomfloat)
11. [Випадкове число 1–10](#-випадкове-число-1-10)
12. [Випадкове число 1–100](#-випадкове-число-1-100)
13. [Випадковий індекс масиву](#-випадковий-індекс-масиву)
14. [Випадковий елемент масиву](#-випадковий-елемент-масиву)
15. [Випадковий Boolean](#-випадковий-boolean)
16. [Випадковий вибір із діапазону](#-випадковий-вибір-із-діапазону)
17. [Практичні приклади](#-практичні-приклади)
18. [Типові помилки](#-типові-помилки)
19. [Практика](#-практика)
20. [Мініпроєкт](#-мініпроєкт)
21. [Рівні володіння](#-рівні-володіння)
22. [Питання на співбесіді](#-питання-на-співбесіді)
23. [Зв'язок з іншими темами](#-звязок-з-іншими-темами)
24. [Коротка шпаргалка](#-коротка-шпаргалка)
25. [Головне правило](#-головне-правило)

---

# 🎯 Що вивчаємо

У попередній темі:

    07-random-numbers

ми розібрали:

    Math.random()

який повертає випадкове дробове число:

    0 <= number < 1

Тепер наше завдання — навчитися перетворювати це число на потрібний діапазон.

Наприклад:

    0–9
    1–10
    1–100
    10–20
    50–100
    -10–10
    0–1
    10.5–20.5

Основна ідея:

    Math.random()
        ↓
    масштабування
        ↓
    зміщення
        ↓
    Math.floor() / Math.ceil()
        ↓
    потрібний діапазон

---

# 🔢 Базова ідея випадкового діапазону

`Math.random()` дає:

    [0, 1)

Тобто:

    0 <= random < 1

Якщо помножити на `10`:

    Math.random() * 10

отримуємо:

    [0, 10)

Якщо застосувати `Math.floor()`:

    Math.floor(Math.random() * 10)

отримуємо:

    0–9

Тобто:

    [0, 10)

перетворюється на:

    0, 1, 2, 3, 4, 5, 6, 7, 8, 9

---

# 📏 Діапазон `[0, max)`

Формула:

    Math.random() * max

дає дробове число:

    0 <= number < max

Наприклад:

    const random = Math.random() * 10;

Можливі результати:

    0.152
    3.742
    7.981
    9.999...

Але `10` не входить.

---

# 🔢 Ціле число `[0, max)`

Якщо потрібне ціле число:

    Math.floor(Math.random() * max)

Наприклад:

    const random = Math.floor(Math.random() * 10);

Результат:

    0
    1
    2
    3
    4
    5
    6
    7
    8
    9

Тобто:

    0 <= random < 10

---

# 📏 Діапазон `[min, max)`

Для дробового числа, де `min` включається, а `max` не включається:

    Math.random() * (max - min) + min

Наприклад:

    const min = 10;
    const max = 20;

    const random = Math.random() * (max - min) + min;

    console.log(random);

Діапазон:

    10 <= random < 20

Можливі результати:

    10.12
    13.75
    17.42
    19.98

Але:

    20

не входить у діапазон.

---

# 🔢 Діапазон `[min, max)` для цілих

Якщо потрібні цілі числа:

    min <= number < max

використовуємо:

    Math.floor(Math.random() * (max - min)) + min

Наприклад:

    const min = 10;
    const max = 20;

    const random = Math.floor(
        Math.random() * (max - min)
    ) + min;

Результат:

    10
    11
    12
    13
    14
    15
    16
    17
    18
    19

`20` не входить.

---

# 📏 Діапазон `[min, max]`

Іноді потрібно включити обидві межі:

    min <= number <= max

Наприклад:

    1–10

Тоді для цілого числа:

    Math.floor(Math.random() * (max - min + 1)) + min

Приклад:

    const min = 1;
    const max = 10;

    const random = Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

Можливі результати:

    1
    2
    3
    4
    5
    6
    7
    8
    9
    10

---

# 🔍 Inclusive та exclusive межі

Це дуже важливе поняття для роботи з діапазонами.

## Inclusive

Межа входить у діапазон.

Наприклад:

    [1, 10]

означає:

    1 <= number <= 10

Тут входять:

    1
    10

---

## Exclusive

Межа не входить.

Наприклад:

    [1, 10)

означає:

    1 <= number < 10

Тут:

    1

входить,

а:

    10

не входить.

---

# 📊 Основні варіанти діапазонів

| Діапазон | Формула |
|---|---|
| `[0, max)` дробове | `Math.random() * max` |
| `[0, max)` ціле | `Math.floor(Math.random() * max)` |
| `[min, max)` дробове | `Math.random() * (max - min) + min` |
| `[min, max)` ціле | `Math.floor(Math.random() * (max - min)) + min` |
| `[min, max]` ціле | `Math.floor(Math.random() * (max - min + 1)) + min` |

Ці п'ять формул варто добре запам'ятати.

---

# 🔢 Випадкове ціле число

Найчастіше у практичному JavaScript потрібне саме ціле число.

Базова формула:

    Math.floor(Math.random() * max)

Наприклад:

    const number = Math.floor(Math.random() * 5);

Діапазон:

    0–4

---

# 🎯 Випадкове ціле від 1 до max

Якщо потрібно:

    1–10

використовуємо:

    Math.floor(Math.random() * 10) + 1

Для довільного `max`:

    Math.floor(Math.random() * max) + 1

Наприклад:

    const dice = Math.floor(Math.random() * 6) + 1;

Результат:

    1–6

---

# 🔢 Випадкове ціле від min до max

Найважливіша формула:

    Math.floor(Math.random() * (max - min + 1)) + min

Наприклад:

    const min = 50;
    const max = 100;

    const random = Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

Результат:

    50–100

---

# 🧠 Чому `+ 1`?

Це одна з найважливіших речей для розуміння.

Припустимо:

    min = 1
    max = 6

Маємо шість можливих значень:

    1
    2
    3
    4
    5
    6

Кількість значень:

    max - min + 1

тобто:

    6 - 1 + 1 = 6

Тому:

    Math.random() * 6

після `floor()` дає:

    0–5

А після:

    + 1

отримуємо:

    1–6

---

# 🔢 Випадкове дробове число

Для дробового числа:

    min <= number < max

використовуємо:

    Math.random() * (max - min) + min

Наприклад:

    const random = Math.random() * (20 - 10) + 10;

Результат:

    10 <= random < 20

---

# 🔢 Випадкове дробове число з двома знаками

Наприклад, потрібно:

    10.00–20.00

Можна отримати:

    const random = Math.random() * (20 - 10) + 10;

Для відображення двох знаків:

    const result = random.toFixed(2);

Але `toFixed()` повертає рядок.

Наприклад:

    "15.73"

Якщо потрібне саме число:

    const result = Number(random.toFixed(2));

Але для більшості задач не потрібно штучно обмежувати кількість знаків після коми.

---

# 🛠️ Універсальна функція randomInt()

Для цілих чисел:

    function randomInt(min, max) {
        return Math.floor(
            Math.random() * (max - min + 1)
        ) + min;
    }

Використання:

    randomInt(1, 10);

    randomInt(50, 100);

    randomInt(-10, 10);

    randomInt(100, 200);

---

# 🧪 Приклади randomInt()

## Кубик

    const dice = randomInt(1, 6);

---

## Вік

    const age = randomInt(18, 80);

---

## Температура

    const temperature = randomInt(-20, 35);

---

## Оцінка

    const score = randomInt(0, 100);

---

## Випадковий рік

    const year = randomInt(2000, 2026);

---

# 🛠️ Універсальна функція randomFloat()

Для дробових чисел:

    function randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

Використання:

    randomFloat(0, 1);

    randomFloat(10, 20);

    randomFloat(-10, 10);

Наприклад:

    const temperature = randomFloat(-10, 10);

---

# 🎯 Random Int vs Random Float

Дві різні задачі:

### Ціле

    function randomInt(min, max) {
        return Math.floor(
            Math.random() * (max - min + 1)
        ) + min;
    }

### Дробове

    function randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

Наприклад:

    randomInt(1, 10);

може повернути:

    1
    2
    3
    ...
    10

А:

    randomFloat(1, 10);

може повернути:

    1.3847
    5.9214
    9.0021

---

# 🎲 Випадкове число 1–10

Найпростіший варіант:

    const number = Math.floor(Math.random() * 10) + 1;

Або через універсальну функцію:

    const number = randomInt(1, 10);

---

# 🎲 Випадкове число 1–100

    const number = Math.floor(Math.random() * 100) + 1;

Або:

    const number = randomInt(1, 100);

---

# 🌡️ Випадкова температура

Наприклад, температура від `-10` до `35`:

    const temperature = randomInt(-10, 35);

Можливі результати:

    -10
    -5
    0
    14
    27
    35

---

# 📊 Випадковий відсоток

Для цілого відсотка:

    const percent = randomInt(0, 100);

Результат:

    0–100

Для дробового:

    const percent = randomFloat(0, 100);

Наприклад:

    37.28491

---

# 🎯 Випадковий індекс масиву

Маємо:

    const fruits = [
        "apple",
        "banana",
        "orange",
        "grape"
    ];

Довжина:

    fruits.length; // 4

Індекси:

    0
    1
    2
    3

Тому:

    const index = Math.floor(
        Math.random() * fruits.length
    );

---

# 🍎 Випадковий елемент масиву

Повний запис:

    const fruits = [
        "apple",
        "banana",
        "orange",
        "grape"
    ];

    const randomFruit = fruits[
        Math.floor(Math.random() * fruits.length)
    ];

    console.log(randomFruit);

Це один із найважливіших практичних патернів.

---

# 🛠️ Функція randomItem()

Можна зробити універсальну функцію:

    function randomItem(array) {
        const index = Math.floor(
            Math.random() * array.length
        );

        return array[index];
    }

Використання:

    const colors = [
        "red",
        "green",
        "blue"
    ];

    const color = randomItem(colors);

---

# 🔀 Випадковий Boolean

Найпростіший варіант:

    const result = Math.random() < 0.5;

Отримуємо:

    true

або:

    false

Функція:

    function randomBoolean() {
        return Math.random() < 0.5;
    }

---

# 🎯 Випадковий вибір із діапазону

Можна вибрати одне значення з певного набору.

Наприклад:

    const values = [10, 20, 30, 40, 50];

    const value = randomItem(values);

Результат буде одним із:

    10
    20
    30
    40
    50

Це відрізняється від генерації довільного числа в діапазоні.

Наприклад:

    randomInt(10, 50);

може дати:

    27

А:

    randomItem([10, 20, 30, 40, 50]);

може дати тільки:

    10
    20
    30
    40
    50

---

# 🧠 Діапазон vs набір значень

Це важливе розрізнення.

### Діапазон

    randomInt(1, 10);

може дати:

    1
    2
    3
    4
    5
    6
    7
    8
    9
    10

### Набір

    randomItem([1, 5, 10, 20]);

може дати тільки:

    1
    5
    10
    20

Тобто:

    range → будь-яке число в межах

    array → один із заздалегідь визначених варіантів

---

# 🎮 Практичні приклади

## 1. Кидок кубика

    const dice = randomInt(1, 6);

---

## 2. Підкидання монети

    const coin = randomBoolean();

---

## 3. Випадковий колір

    const colors = [
        "red",
        "green",
        "blue",
        "yellow"
    ];

    const color = randomItem(colors);

---

## 4. Випадковий бал

    const score = randomInt(0, 100);

---

## 5. Випадкова температура

    const temperature = randomInt(-20, 35);

---

## 6. Випадковий damage

    const damage = randomInt(10, 20);

---

## 7. Випадкова швидкість

    const speed = randomFloat(10, 20);

---

## 8. Випадкова позиція

    const x = randomInt(0, 799);
    const y = randomInt(0, 599);

Це може бути корисно для розміщення об'єкта на екрані.

---

# 🧮 Випадковий діапазон із від'ємними числами

Формула працює і з від'ємними значеннями:

    randomInt(-10, 10);

Результат:

    -10 ... 10

Наприклад:

    -7
    -3
    0
    4
    9
    10

---

# 📐 Випадковий діапазон навколо нуля

Це часто потрібно для:

- координат;
- руху;
- шуму;
- симуляцій;
- ігор.

Наприклад:

    const offset = randomInt(-5, 5);

Отримаємо:

    -5 ... 5

Або дробове:

    const offset = randomFloat(-1, 1);

---

# 🎮 Випадкова сила руху

Наприклад:

    const dx = randomInt(-10, 10);
    const dy = randomInt(-10, 10);

Тепер об'єкт може рухатися в різних напрямках.

---

# 📦 Генерація тестових даних

Наприклад:

    const product = {
        price: randomFloat(10, 100),
        quantity: randomInt(1, 10),
        rating: randomInt(1, 5)
    };

Це корисно для створення:

- mock data;
- тестових масивів;
- демонстрацій;
- навчальних задач.

---

# ⚠️ Типові помилки

## ❌ Помилка 1. Плутати `[min, max)` та `[min, max]`

Це різні діапазони.

    [1, 10)

означає:

    1–9

для цілих чисел.

А:

    [1, 10]

означає:

    1–10

---

## ❌ Помилка 2. Забути `+ 1`

Неправильно для діапазону `1–10`:

    Math.floor(Math.random() * (10 - 1)) + 1;

Це дає:

    1–9

Правильно:

    Math.floor(Math.random() * (10 - 1 + 1)) + 1;

або просто:

    Math.floor(Math.random() * 10) + 1;

---

## ❌ Помилка 3. Використовувати `Math.round()`

Наприклад:

    Math.round(Math.random() * 10);

Це не є стандартною формулою для рівномірного цілого діапазону.

Для:

    0–9

використовуй:

    Math.floor(Math.random() * 10);

---

## ❌ Помилка 4. Помилка з масивом

Маємо:

    const items = ["a", "b", "c"];

Неправильно:

    const index = randomInt(0, items.length);

Тому що:

    items.length === 3

а допустимі індекси:

    0
    1
    2

`3` не існує.

Правильно:

    const index = randomInt(0, items.length - 1);

Або простіше:

    const index = Math.floor(
        Math.random() * items.length
    );

---

# ⚠️ Помилка 5. Використовувати Math.random() для безпеки

Не використовуй:

    Math.random()

для:

- паролів;
- authentication tokens;
- reset tokens;
- session secrets;
- криптографічних ключів.

`Math.random()` призначений для звичайної псевдовипадковості, а не для security-sensitive задач.

---

# 🧪 Практика

## 🟢 Вправа 1 — 0–9

Згенеруй випадкове ціле:

    0–9

---

## 🟢 Вправа 2 — 1–10

Згенеруй:

    1–10

---

## 🟢 Вправа 3 — 1–100

Згенеруй:

    1–100

---

## 🟡 Вправа 4 — min/max

Створи:

    const min = 20;
    const max = 50;

Згенеруй випадкове число:

    20–50

---

## 🟡 Вправа 5 — від'ємний діапазон

Згенеруй:

    -20 ... 20

---

## 🟡 Вправа 6 — дробовий діапазон

Згенеруй дробове число:

    10 ... 20

---

## 🟡 Вправа 7 — randomInt()

Створи:

    function randomInt(min, max) {
        // ...
    }

Перевір:

    randomInt(1, 6);

    randomInt(10, 20);

    randomInt(-10, 10);

---

## 🟡 Вправа 8 — randomFloat()

Створи:

    function randomFloat(min, max) {
        // ...
    }

Перевір:

    randomFloat(0, 1);

    randomFloat(10, 20);

---

## 🟠 Вправа 9 — randomItem()

Створи:

    function randomItem(array) {
        // ...
    }

Перевір:

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    console.log(randomItem(fruits));

---

## 🟠 Вправа 10 — випадкова температура

Створи 10 випадкових температур у діапазоні:

    -20 ... 35

Наприклад:

    for (let i = 0; i < 10; i++) {
        console.log(randomInt(-20, 35));
    }

---

# 🎮 Мініпроєкт

## "Random Data Generator"

Створи генератор тестових даних.

Він повинен генерувати:

    const user = {
        age: randomInt(18, 80),
        score: randomInt(0, 100),
        temperature: randomInt(-20, 35),
        active: randomBoolean()
    };

Потім створи масив із 10 користувачів:

    const users = [];

    for (let i = 0; i < 10; i++) {
        users.push({
            age: randomInt(18, 80),
            score: randomInt(0, 100),
            temperature: randomInt(-20, 35),
            active: randomBoolean()
        });
    }

---

# 🎲 Мініпроєкт 2 — Dice Simulator

Створи функцію:

    function rollDice() {
        return randomInt(1, 6);
    }

Кинь кубик 100 разів:

    const results = [];

    for (let i = 0; i < 100; i++) {
        results.push(rollDice());
    }

Потім можна підрахувати:

- скільки разів випало `1`;
- скільки `2`;
- скільки `3`;
- скільки `4`;
- скільки `5`;
- скільки `6`.

Це вже хороша маленька задача на:

    random
        +
    arrays
        +
    loops
        +
    objects

---

# 🎯 Мініпроєкт 3 — Guess the Number

Комп'ютер генерує:

    const secretNumber = randomInt(1, 100);

Користувач вводить число.

Програма порівнює:

    if (guess < secretNumber) {
        console.log("Too low");
    } else if (guess > secretNumber) {
        console.log("Too high");
    } else {
        console.log("Correct!");
    }

Тут поєднуються:

- random numbers;
- ranges;
- conditions;
- input;
- loops;
- functions.

---

# 🧠 Рівні володіння

## 🟢 Beginner

Потрібно знати:

    Math.random()

і розуміти:

    [0, 1)

Також:

    Math.floor(Math.random() * 10)

для діапазону:

    0–9

---

## 🟡 Junior

Потрібно вміти:

- генерувати `[0, max)`;
- генерувати `[min, max)`;
- генерувати `[min, max]`;
- працювати з від'ємними межами;
- генерувати випадковий індекс;
- вибирати випадковий елемент масиву;
- створити `randomInt()`;
- створити `randomFloat()`.

---

## 🟠 Strong Junior

Потрібно чітко розуміти:

    [min, max)

і:

    [min, max]

та різницю між:

    max - min

і:

    max - min + 1

Також потрібно вміти пояснити, чому для масиву використовується:

    Math.floor(Math.random() * array.length)

---

## 🔴 Middle+

Потрібно розуміти:

- псевдовипадковість;
- рівномірність розподілу;
- inclusive/exclusive boundaries;
- тестування коду з random;
- seedable random generators у відповідних задачах;
- обмеження `Math.random()`;
- криптографічно безпечну випадковість;
- різницю між генерацією випадкового числа та випадковим вибором із набору.

---

# 💼 Питання на співбесіді

### 1. Що повертає `Math.random()`?

Дробове псевдовипадкове число:

    0 <= x < 1

---

### 2. Як отримати випадкове ціле число від 0 до 9?

    Math.floor(Math.random() * 10);

---

### 3. Як отримати число від 1 до 10?

    Math.floor(Math.random() * 10) + 1;

---

### 4. Як отримати число від min до max включно?

    Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

---

### 5. Чому використовується `+ 1`?

Тому що потрібно включити обидві межі:

    min
    ...
    max

Кількість можливих цілих значень:

    max - min + 1

---

### 6. Як отримати дробове число від min до max?

    Math.random() * (max - min) + min;

Це діапазон:

    [min, max)

---

### 7. Як отримати випадковий елемент масиву?

    array[Math.floor(Math.random() * array.length)]

---

### 8. Чому не можна використовувати `array.length` як останній індекс?

Тому що якщо:

    array.length === 5

то індекси:

    0
    1
    2
    3
    4

Індекс `5` вже не існує.

---

### 9. Чим відрізняються `[min, max)` та `[min, max]`?

    [min, max)

включає `min`, але не включає `max`.

    [min, max]

включає і `min`, і `max`.

---

### 10. Чи є Math.random() криптографічно безпечним?

Ні.

Для security-sensitive випадковості потрібно використовувати відповідні криптографічні API.

---

# 🔗 Зв'язок з іншими темами

Ця тема продовжує:

    04-numbers-and-math
    │
    ├── 01-number-basics
    ├── 02-number-conversion
    ├── 03-number-methods
    ├── 04-math-round-floor-ceil-trunc
    ├── 05-math-abs-min-max
    ├── 06-math-pow-sqrt
    ├── 07-random-numbers
    ├── 08-random-numbers-and-ranges      ← ми тут
    ├── 09-floating-point-and-precision
    ├── 10-number-formatting
    ├── 11-bigint
    └── 12-numbers-project

Особливо важливий ланцюжок:

    Math.random()
          ↓
    range
          ↓
    Math.floor()
          ↓
    random integer
          ↓
    random index
          ↓
    random item
          ↓
    практичний алгоритм

---

# 📌 Основні формули

## 1. `[0, max)` — дробове

    Math.random() * max

---

## 2. `[0, max)` — ціле

    Math.floor(Math.random() * max)

---

## 3. `[min, max)` — дробове

    Math.random() * (max - min) + min

---

## 4. `[min, max)` — ціле

    Math.floor(
        Math.random() * (max - min)
    ) + min

---

## 5. `[min, max]` — ціле

    Math.floor(
        Math.random() * (max - min + 1)
    ) + min

---

## 6. Випадковий індекс

    Math.floor(Math.random() * array.length)

---

## 7. Випадковий елемент

    array[Math.floor(Math.random() * array.length)]

---

# ⚡ Коротка шпаргалка

| Завдання | Формула | Діапазон |
|---|---|---|
| Random | `Math.random()` | `[0, 1)` |
| Random float | `Math.random() * max` | `[0, max)` |
| Random int | `Math.floor(Math.random() * max)` | `0 ... max-1` |
| Float range | `Math.random() * (max - min) + min` | `[min, max)` |
| Int range | `Math.floor(Math.random() * (max - min)) + min` | `min ... max-1` |
| Int inclusive | `Math.floor(Math.random() * (max - min + 1)) + min` | `min ... max` |
| Array index | `Math.floor(Math.random() * array.length)` | `0 ... length-1` |
| Array item | `array[Math.floor(Math.random() * array.length)]` | один item |

---

# 🧠 Головне правило

> Спочатку визнач, який саме діапазон тобі потрібен.

Наприклад:

    0–9

це не те саме, що:

    1–10

і не те саме, що:

    1–10.999...

Тому перед написанням формули потрібно визначити:

    1. integer чи float?
    2. min входить?
    3. max входить?
    4. потрібен діапазон чи набір конкретних значень?

Після цього формула стає простою.

### Для цілих чисел із включеними межами:

    Math.floor(
        Math.random() * (max - min + 1)
    ) + min

### Для дробових чисел із включеним min та виключеним max:

    Math.random() * (max - min) + min

### Для випадкового елемента масиву:

    array[Math.floor(Math.random() * array.length)]

Саме розуміння `min`, `max`, `inclusive` та `exclusive` є головною метою цієї теми.