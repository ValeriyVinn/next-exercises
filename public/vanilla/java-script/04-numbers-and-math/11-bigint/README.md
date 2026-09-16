# 11. BigInt

> `BigInt` — спеціальний числовий тип JavaScript для роботи з дуже великими цілими числами, які виходять за межі безпечного діапазону `Number`.

---

## 📚 Зміст

1. [Що таке BigInt](#1-що-таке-bigint)
2. [Навіщо потрібен BigInt](#2-навіщо-потрібен-bigint)
3. [Number та його обмеження](#3-number-та-його-обмеження)
4. [`Number.MAX_SAFE_INTEGER`](#4-numbermax_safe_integer)
5. [Створення BigInt](#5-створення-bigint)
6. [Суфікс `n`](#6-суфікс-n)
7. [`BigInt()`](#7-bigint)
8. [Перевірка типу](#8-перевірка-типу)
9. [Арифметичні операції](#9-арифметичні-операції)
10. [Ділення](#10-ділення)
11. [Остача від ділення](#11-остача-від-ділення)
12. [Порівняння BigInt](#12-порівняння-bigint)
13. [BigInt та Number](#13-bigint-та-number)
14. [Не можна змішувати BigInt та Number](#14-не-можна-змішувати-bigint-та-number)
15. [Явне перетворення типів](#15-явне-перетворення-типів)
16. [BigInt та String](#16-bigint-та-string)
17. [Boolean та BigInt](#17-boolean-та-bigint)
18. [Від'ємні BigInt](#18-відємні-bigint)
19. [BigInt та `Math`](#19-bigint-та-math)
20. [BigInt та десяткові дроби](#20-bigint-та-десяткові-дроби)
21. [BigInt та JSON](#21-bigint-та-json)
22. [BigInt у Full Stack JavaScript](#22-bigint-у-full-stack-javascript)
23. [BigInt у базах даних](#23-bigint-у-базах-даних)
24. [Типові помилки](#24-типові-помилки)
25. [Практичні вправи](#25-практичні-вправи)
26. [Mini Projects](#26-mini-projects)
27. [Рівні засвоєння](#27-рівні-засвоєння)
28. [Питання на співбесіді](#28-питання-на-співбесіді)
29. [Пов'язані теми](#29-повязані-теми)
30. [Швидка шпаргалка](#30-швидка-шпаргалка)
31. [Головне правило](#31-головне-правило)

---

# 1. Що таке BigInt

`BigInt` — це окремий примітивний тип JavaScript для представлення **цілих чисел довільної величини**.

Наприклад:

    const value = 123456789012345678901234567890n;

Це не `Number`.

Це:

    BigInt

---

## Основна ідея

`Number`:

    звичайні числа
        ↓
    приблизно до 9 × 10¹⁵ для безпечних integer

`BigInt`:

    дуже великі цілі числа
        ↓
    значно більші значення

---

## Важливо

`BigInt` призначений саме для:

    integers

Тобто:

    10n
    100n
    9007199254740993n

але не:

    10.5n

---

# 2. Навіщо потрібен BigInt

Для більшості повсякденних задач достатньо:

    Number

Наприклад:

    const age = 56;
    const price = 19.99;
    const quantity = 10;

`Number` чудово підходить.

Але є проблема з дуже великими цілими числами.

Наприклад:

    const value = 9007199254740993;

Математично це число існує.

Але `Number` вже не може точно представити всі цілі числа такого масштабу.

Для цього існує:

    BigInt

---

# 3. Number та його обмеження

JavaScript використовує `Number` для більшості числових операцій.

Але `Number` має обмеження щодо точного представлення цілих чисел.

Безпечний діапазон:

    Number.MIN_SAFE_INTEGER

до:

    Number.MAX_SAFE_INTEGER

---

## Максимальне безпечне ціле

    console.log(Number.MAX_SAFE_INTEGER);
    // 9007199254740991

Це:

    2^53 - 1

---

## Проблема

Розглянемо:

    const a = Number.MAX_SAFE_INTEGER + 1;
    const b = Number.MAX_SAFE_INTEGER + 2;

Математично:

    a !== b

Але JavaScript може отримати:

    console.log(a === b);
    // true

Причина:

`Number` вже не може точно розрізнити ці значення.

---

# 4. `Number.MAX_SAFE_INTEGER`

Значення:

    Number.MAX_SAFE_INTEGER

дорівнює:

    9007199254740991

Перевірити:

    console.log(Number.MAX_SAFE_INTEGER);
    // 9007199254740991

---

## Перевірка безпечності

Використовуємо:

    Number.isSafeInteger()

Наприклад:

    console.log(Number.isSafeInteger(100));
    // true

    console.log(Number.isSafeInteger(9007199254740991));
    // true

    console.log(Number.isSafeInteger(9007199254740992));
    // false

---

## До чого тут BigInt?

Якщо нам потрібно працювати з:

    9007199254740993

як з точним цілим числом, можна використати:

    9007199254740993n

---

# 5. Створення BigInt

Найпростіший спосіб:

    const value = 123n;

Символ:

    n

після числа означає:

    BigInt

---

## Приклади

    const a = 10n;
    const b = 100n;
    const c = 9007199254740993n;

---

## Дуже великі числа

    const hugeNumber =
        123456789012345678901234567890123456789n;

JavaScript може працювати з таким integer як з `BigInt`.

---

# 6. Суфікс `n`

Суфікс:

    n

є важливою частиною синтаксису BigInt.

Наприклад:

    const number = 100;

це:

    Number

А:

    const bigNumber = 100n;

це:

    BigInt

---

## Порівняння

    const a = 100;
    const b = 100n;

    console.log(typeof a);
    // "number"

    console.log(typeof b);
    // "bigint"

---

## Значення однакові математично

    100
    100n

Але це різні типи.

---

# 7. `BigInt()`

Створити `BigInt` можна також через функцію:

    BigInt()

Наприклад:

    const value = BigInt(100);

Результат:

    100n

---

## String → BigInt

Можна передати рядок:

    const value = BigInt("12345678901234567890");

Результат:

    12345678901234567890n

Це особливо корисно, коли велике число приходить як String.

---

## Важливо

Рядок повинен містити ціле число.

Наприклад:

    BigInt("123")
    // 123n

Але:

    BigInt("123.5")

викличе помилку.

---

## Decimal Number

Не можна безпосередньо створити BigInt з дробового Number:

    BigInt(10.5)

Це викличе помилку.

`BigInt` працює тільки з цілими значеннями.

---

# 8. Перевірка типу

Використовуємо:

    typeof

Наприклад:

    const value = 123n;

    console.log(typeof value);
    // "bigint"

---

## Порівняння з Number

    const a = 123;
    const b = 123n;

    console.log(typeof a);
    // "number"

    console.log(typeof b);
    // "bigint"

---

## Важливо

Не існує:

    typeof value === "integer"

Для BigInt:

    typeof value === "bigint"

---

# 9. Арифметичні операції

BigInt підтримує основні арифметичні операції.

---

## Додавання

    const a = 10n;
    const b = 20n;

    console.log(a + b);
    // 30n

---

## Віднімання

    const a = 30n;
    const b = 10n;

    console.log(a - b);
    // 20n

---

## Множення

    const a = 10n;
    const b = 20n;

    console.log(a * b);
    // 200n

---

## Ділення

    const a = 20n;
    const b = 5n;

    console.log(a / b);
    // 4n

---

## Піднесення до степеня

    const value = 2n ** 10n;

    console.log(value);
    // 1024n

---

## Остача

    const value = 10n % 3n;

    console.log(value);
    // 1n

---

# 10. Ділення

Одна з важливих особливостей BigInt:

> Ділення BigInt повертає тільки цілу частину.

Наприклад:

    console.log(10n / 3n);
    // 3n

Математично:

    10 / 3 = 3.333...

Але BigInt не підтримує дробову частину.

Тому:

    10n / 3n
    → 3n

---

## Ще приклад

    console.log(7n / 2n);
    // 3n

    console.log(20n / 6n);
    // 3n

---

## Важливо

Не буде:

    3.5n

Тому що:

    BigInt = integer

---

# 11. Остача від ділення

Оператор:

    %

працює з BigInt.

Наприклад:

    const result = 17n % 5n;

    console.log(result);
    // 2n

---

## Практичний приклад

Перевірка парності:

    const value = 100n;

    console.log(value % 2n === 0n);
    // true

---

## Перевірка непарності

    const value = 101n;

    console.log(value % 2n !== 0n);
    // true

---

## Циклічні операції

BigInt можна використовувати там, де потрібна точна цілочисельна арифметика з дуже великими значеннями.

---

# 12. Порівняння BigInt

BigInt можна порівнювати між собою.

    const a = 100n;
    const b = 200n;

    console.log(a < b);
    // true

    console.log(a > b);
    // false

    console.log(a === b);
    // false

---

## `===`

Порівнює і значення, і тип.

Тому:

    100 === 100n

результат:

    false

---

## `==`

Нестроге порівняння може виконати приведення типів:

    console.log(100 == 100n);
    // true

Але у звичайному коді краще не покладатися на неявне приведення типів.

---

## Рекомендація

Переважно використовуй:

    ===
    !==

і явно контролюй типи.

---

# 13. BigInt та Number

Це дуже важливий момент.

Наприклад:

    const a = 100n;
    const b = 50;

Тут:

    a → BigInt
    b → Number

Вони математично сумісні, але JavaScript не дозволяє безпосередньо виконувати між ними більшість арифметичних операцій.

---

# 14. Не можна змішувати BigInt та Number

Наприклад:

    const a = 10n;
    const b = 5;

    console.log(a + b);

Це викличе:

    TypeError

---

## Так само

    10n - 5
    10n * 5
    10n / 5

не можна використовувати як звичайні арифметичні операції.

---

## Чому?

Тому що:

    Number

і:

    BigInt

мають різну семантику представлення чисел.

`Number` підтримує дроби.

`BigInt` — тільки точні integers.

JavaScript не хоче автоматично вирішувати, як змішувати ці два типи.

---

## Правильний підхід

Вибрати один тип:

    BigInt + BigInt

або:

    Number + Number

---

# 15. Явне перетворення типів

Якщо потрібно, можна явно перетворити тип.

---

## Number → BigInt

Якщо Number є цілим:

    const value = 100;

    const bigValue = BigInt(value);

    console.log(bigValue);
    // 100n

---

## BigInt → Number

Можна:

    const value = 100n;

    const numberValue = Number(value);

    console.log(numberValue);
    // 100

---

## Але обережно

Для великих значень:

    const value = 9007199254740993n;

    const numberValue = Number(value);

Тут можливе втрачання точності.

Тому не можна бездумно перетворювати великий BigInt у Number.

---

## Безпечний принцип

    BigInt
       ↓
    Number
       ↓
    можлива втрата precision

Тому перед таким перетворенням потрібно розуміти діапазон значення.

---

# 16. BigInt та String

BigInt часто взаємодіє зі String.

---

## String → BigInt

    const value = BigInt("12345678901234567890");

Результат:

    12345678901234567890n

---

## BigInt → String

Використовуємо:

    String()

Наприклад:

    const value = 12345678901234567890n;

    const text = String(value);

    console.log(text);
    // "12345678901234567890"

---

## `toString()`

Також:

    const value = 12345678901234567890n;

    console.log(value.toString());

---

## Template literals

BigInt можна вставляти в рядок:

    const value = 123n;

    console.log(`Value: ${value}`);
    // "Value: 123"

---

# 17. Boolean та BigInt

BigInt може використовуватися у Boolean-контексті.

Нуль:

    0n

є:

    false

А будь-який ненульовий BigInt:

    1n
    100n
    -100n

є:

    true

---

## Приклад

    if (0n) {
        console.log("true");
    } else {
        console.log("false");
    }

Результат:

    false

---

## Ще приклад

    if (100n) {
        console.log("true");
    }

Результат:

    true

---

## Boolean()

Можна перевірити явно:

    Boolean(0n);
    // false

    Boolean(1n);
    // true

---

# 18. Від'ємні BigInt

BigInt підтримує від'ємні значення.

Наприклад:

    const value = -100n;

    console.log(value);
    // -100n

---

## Арифметика

    const a = -100n;
    const b = 30n;

    console.log(a + b);
    // -70n

---

## Модуль

    const value = -10n;

    console.log(-value);
    // 10n

---

## Порівняння

    console.log(-100n < 0n);
    // true

---

# 19. BigInt та `Math`

Більшість методів `Math` працюють з `Number`, а не з `BigInt`.

Наприклад:

    Math.sqrt(16n)

викличе помилку.

---

## Чому?

`Math` працює з:

    Number

а BigInt:

    BigInt

Це різні числові типи.

---

## Наприклад

Працює:

    Math.sqrt(16);
    // 4

Але:

    Math.sqrt(16n);

не працює.

---

## Що робити?

Якщо значення гарантовано невелике і можна втратити BigInt-семантику:

    const value = 16n;

    console.log(Math.sqrt(Number(value)));
    // 4

Але для дуже великих значень так робити небезпечно через можливу втрату точності.

---

# 20. BigInt та десяткові дроби

`BigInt` не підтримує дробові значення.

Не можна:

    const value = 10.5n;

Це синтаксично некоректно.

---

## Не можна отримати

    10.5n

Тому що BigInt — це:

    integer

---

## Ділення

Наприклад:

    5n / 2n

результат:

    2n

а не:

    2.5

---

## Якщо потрібен decimal

Для звичайних дробів використовуй:

    Number

Наприклад:

    const value = 10.5;

---

## Якщо потрібна дуже точна decimal arithmetic

BigInt не є прямою заміною decimal-типу.

Для точних фінансових decimal-розрахунків можуть використовуватися:

- integer minor units;
- decimal types у базі даних;
- спеціальні decimal-бібліотеки.

---

# 21. BigInt та JSON

Це важлива Full Stack особливість.

Звичайний JSON не підтримує BigInt напряму.

Наприклад:

    const data = {
        id: 12345678901234567890n
    };

Спроба:

    JSON.stringify(data);

призведе до помилки.

---

## Чому це важливо?

У Full Stack застосунку часто маємо:

    Database
        ↓
    Backend
        ↓
    JSON
        ↓
    Frontend

Якщо backend повертає BigInt без спеціальної обробки, JSON serialization може зламатися.

---

# 22. BigInt у Full Stack JavaScript

У реальному Full Stack проєкті BigInt може зустрітися, наприклад, при роботі з:

- database IDs;
- великими counters;
- кількістю записів;
- timestamps у відповідному форматі;
- фінансовими integer units;
- дуже великими лічильниками;
- database `BIGINT`.

Типовий потік:

    PostgreSQL
        ↓
    BIGINT
        ↓
    Node.js
        ↓
    BigInt
        ↓
    API
        ↓
    JSON problem
        ↓
    serialization strategy
        ↓
    frontend

---

## Важливо

Не потрібно перетворювати кожне число у BigInt.

Для більшості:

    id
    count
    price
    quantity
    percentage

звичайного `Number` достатньо.

BigInt потрібен тоді, коли дійсно є вимога до діапазону та точності цілих чисел.

---

# 23. BigInt у базах даних

У SQL-базах існують типи для великих цілих чисел.

Наприклад, у PostgreSQL:

    BIGINT

може зберігати великі signed integer значення.

У JavaScript відповідне значення в деяких Node.js database drivers/ORM може бути представлено як:

    BigInt

---

## Приклад концептуального потоку

    PostgreSQL
        ↓
    BIGINT
        ↓
    Node.js
        ↓
    BigInt
        ↓
    API response
        ↓
    serialization

Тут потрібно розуміти, як конкретний driver або ORM представляє database value.

---

## Для твого Full Stack навчання

Корисно запам'ятати:

    PostgreSQL BIGINT
            ↕
        JavaScript
          BigInt

Але конкретна поведінка залежить від бібліотеки, яку ти використовуєш.

---

# 24. Типові помилки

## ❌ Помилка 1. Плутати `Number` та `BigInt`

    const a = 100;
    const b = 100n;

Це різні типи.

---

## ❌ Помилка 2. Змішувати типи

Погано:

    const a = 10n;
    const b = 5;

    const result = a + b;

Потрібно:

    const a = 10n;
    const b = 5n;

    const result = a + b;

---

## ❌ Помилка 3. Очікувати дробовий результат

    console.log(5n / 2n);
    // 2n

Не:

    2.5

---

## ❌ Помилка 4. Використовувати BigInt для звичайних дробів

Погано:

    const price = 19.99n;

`BigInt` не підтримує decimal values.

---

## ❌ Помилка 5. Безпечно конвертувати великий BigInt у Number

Погано:

    const value = 9007199254740993n;

    const numberValue = Number(value);

Можлива втрата точності.

---

## ❌ Помилка 6. Використовувати `Math` без перетворення

Погано:

    Math.sqrt(16n);

`Math` очікує `Number`.

---

## ❌ Помилка 7. Забути про JSON

Погано:

    JSON.stringify({
        id: 123n
    });

BigInt не серіалізується у звичайний JSON напряму.

---

## ❌ Помилка 8. Використовувати BigInt всюди

Не потрібно робити:

    const age = 56n;
    const count = 10n;
    const price = 19n;

тільки тому, що BigInt "точніший".

Для звичайних чисел `Number` простіший і природніший.

---

# 25. Практичні вправи

## Вправа 1 — Створення BigInt

Створи:

    const value = 12345678901234567890n;

Перевір:

    typeof value

---

## Вправа 2 — Арифметика

Виконай:

    100n + 50n
    100n - 50n
    100n * 50n
    100n / 50n

---

## Вправа 3 — Ділення

Перевір:

    10n / 3n
    7n / 2n
    100n / 6n

Поясни, чому результат завжди цілий.

---

## Вправа 4 — `%`

Перевір:

    10n % 3n
    11n % 3n
    12n % 3n

---

## Вправа 5 — Парність

Створи функцію:

    function isEven(value) {
        // ...
    }

Вона повинна працювати з BigInt.

Наприклад:

    isEven(100n);
    // true

    isEven(101n);
    // false

---

## Вправа 6 — Велике число

Порівняй:

    const numberValue = 9007199254740993;
    const bigIntValue = 9007199254740993n;

Перевір їхні типи та значення.

---

## Вправа 7 — Safe Integer

Перевір:

    Number.isSafeInteger(9007199254740991);
    Number.isSafeInteger(9007199254740992);

Поясни результат.

---

## Вправа 8 — Конвертація

Спробуй:

    BigInt(100);

    BigInt("100");

    Number(100n);

Потім спробуй:

    BigInt(10.5);

Поясни результат.

---

## Вправа 9 — String

Перетвори:

    12345678901234567890n

у String через:

    String()

і:

    toString()

---

## Вправа 10 — Number + BigInt

Спробуй:

    10n + 5

Поясни помилку.

Потім виправ:

    10n + 5n

---

# 26. Mini Projects

## 🔢 Mini Project 1 — Big Counter

Створи лічильник:

    let counter = 0n;

Додай функції:

    increment()
    decrement()
    getValue()

Наприклад:

    increment();
    increment();

    console.log(getValue());
    // 2n

---

## 🔐 Mini Project 2 — Large ID Generator

Створи демонстраційний генератор великих integer ID:

    let id = 9007199254740990n;

Функція:

    function createId() {
        id += 1n;
        return id;
    }

Перевір кілька значень.

---

## 📊 Mini Project 3 — Large Counter

Створи:

    views
    likes
    shares

як BigInt.

Наприклад:

    const views = 9007199254740993000n;
    const likes = 123456789012345n;
    const shares = 98765432109876n;

Обчисли загальну кількість взаємодій.

---

## 🧮 Mini Project 4 — BigInt Calculator

Створи функції:

    add(a, b)
    subtract(a, b)
    multiply(a, b)
    divide(a, b)
    remainder(a, b)

Усі параметри повинні бути BigInt.

Наприклад:

    add(100n, 200n);
    // 300n

---

## 🗄️ Mini Project 5 — Database ID Simulation

Уяви, що PostgreSQL повернув великий `BIGINT`.

Створи:

    const userId = 9223372036854775807n;

Покажи:

- ID;
- тип;
- String representation;
- спробу перетворення в Number;
- пояснення, чому це може бути небезпечно.

---

# 27. Рівні засвоєння

## 🟢 Level 1 — Beginner

Ти знаєш:

- що таке BigInt;
- навіщо він існує;
- синтаксис `123n`;
- `typeof value === "bigint"`;
- різницю між Number і BigInt.

---

## 🟡 Level 2 — Junior

Ти вмієш:

- виконувати арифметику BigInt;
- використовувати `%`;
- працювати з великими integer;
- використовувати `BigInt()`;
- конвертувати String → BigInt;
- розуміти `Number.MAX_SAFE_INTEGER`.

---

## 🟠 Level 3 — Strong Junior

Ти розумієш:

- чому `Number` втрачає precision;
- чому не можна змішувати `Number` та `BigInt`;
- чому ділення BigInt повертає integer;
- чому `Math` не працює безпосередньо з BigInt;
- ризик `BigInt → Number`;
- проблему JSON serialization.

---

## 🔴 Level 4 — Full Stack

Ти розумієш повний потік:

    PostgreSQL BIGINT
          ↓
    backend / ORM
          ↓
    JavaScript BigInt
          ↓
    serialization
          ↓
    API
          ↓
    frontend

І можеш пояснити:

- де BigInt потрібен;
- де достатньо Number;
- коли виникає проблема JSON;
- коли можливе втрачання precision;
- як обирати представлення даних.

---

# 28. Питання на співбесіді

### 1. Що таке BigInt?

Примітивний тип JavaScript для роботи з дуже великими цілими числами довільної величини.

---

### 2. Навіщо потрібен BigInt?

Щоб точно працювати з integer, які виходять за безпечний діапазон `Number`.

---

### 3. Який синтаксис BigInt?

Наприклад:

    const value = 123456789n;

---

### 4. Який тип повертає `typeof` для BigInt?

    typeof 123n
    // "bigint"

---

### 5. Яке максимальне безпечне ціле для Number?

    Number.MAX_SAFE_INTEGER

    // 9007199254740991

---

### 6. Чи можна додати Number до BigInt?

Безпосередньо:

    10n + 5

не можна.

Потрібно привести значення до одного типу.

---

### 7. Що поверне `10n / 3n`?

    3n

Дробова частина відкидається.

---

### 8. Чи підтримує BigInt дроби?

Ні.

BigInt призначений тільки для integer.

---

### 9. Чи працює `Math.sqrt(16n)`?

Ні.

`Math` працює з `Number`.

---

### 10. Чи можна перетворити BigInt у Number?

Так:

    Number(100n)

Але для дуже великих значень можна втратити точність.

---

### 11. Чи можна серіалізувати BigInt через JSON?

Не напряму стандартним `JSON.stringify()`.

Потрібно явно продумати спосіб серіалізації.

---

### 12. Чи потрібно використовувати BigInt замість Number всюди?

Ні.

`Number` залишається стандартним вибором для більшості звичайних числових задач.

---

# 29. Пов'язані теми

Ця тема завершує розділ:

    04-numbers-and-math
        │
        ├── 01-number-basics
        ├── 02-number-conversion
        ├── 03-number-methods
        ├── 04-math-round-floor-ceil-trunc
        ├── 05-math-abs-min-max
        ├── 06-math-pow-sqrt
        ├── 07-random-numbers
        ├── 08-random-numbers-and-ranges
        ├── 09-floating-point-and-precision
        ├── 10-number-formatting
        ├── 11-bigint
        └── 12-numbers-project

Особливо важливі зв'язки:

    Number
      ↓
    MAX_SAFE_INTEGER
      ↓
    precision problem
      ↓
    BigInt

---

## BigInt та наступні теми

BigInt корисний для розуміння:

- PostgreSQL `BIGINT`;
- database IDs;
- JSON serialization;
- Node.js;
- TypeScript;
- API design;
- data validation;
- numeric precision.

---

# 30. Швидка шпаргалка

## Створення

    const value = 123n;

---

## Через `BigInt()`

    const value = BigInt("12345678901234567890");

---

## Тип

    typeof value;
    // "bigint"

---

## Додавання

    10n + 20n;
    // 30n

---

## Віднімання

    30n - 10n;
    // 20n

---

## Множення

    10n * 20n;
    // 200n

---

## Ділення

    10n / 3n;
    // 3n

---

## Остача

    10n % 3n;
    // 1n

---

## Степінь

    2n ** 10n;
    // 1024n

---

## Порівняння

    100n < 200n;
    // true

---

## Number та BigInt

    100 === 100n;
    // false

    100 == 100n;
    // true

Краще віддавати перевагу явному контролю типів та `===`.

---

## Number → BigInt

    BigInt(100);
    // 100n

---

## String → BigInt

    BigInt("123456789");
    // 123456789n

---

## BigInt → Number

    Number(100n);
    // 100

Для дуже великих значень можлива втрата precision.

---

## BigInt → String

    String(123n);
    // "123"

---

## Safe Integer

    Number.isSafeInteger(value);

---

## Максимальний safe integer

    Number.MAX_SAFE_INTEGER
    // 9007199254740991

---

## BigInt

    9007199254740993n

---

## Не можна

    10n + 5

    10n * 5

    10n / 5

---

## Треба

    10n + 5n

    10n * 5n

    10n / 5n

---

## Не підтримуються дроби

    10.5n
    // ❌

---

## JSON

    JSON.stringify({
        id: 123n
    });

Не працює напряму.

---

# 31. Головне правило

> **`Number` — стандартний числовий тип JavaScript для більшості задач. `BigInt` потрібен тоді, коли необхідна точна робота з дуже великими цілими числами.**

Запам'ятай основний ланцюжок:

    Number
       ↓
    MAX_SAFE_INTEGER
       ↓
    beyond safe integer
       ↓
    precision problem
       ↓
    BigInt

---

## Практичний вибір

### Звичайні числа

    const age = 56;
    const quantity = 10;
    const price = 19.99;

Використовуй:

    Number

---

### Дуже великі цілі числа

    const value = 9007199254740993n;

Використовуй:

    BigInt

---

### Дробові числа

    const price = 19.99;

Використовуй:

    Number

або спеціальний decimal-підхід, якщо потрібна підвищена точність.

---

### Дуже великі ID

Якщо значення виходить за межі safe integer:

    BigInt

може бути відповідним варіантом.

---

### Database `BIGINT`

Пам'ятай про можливий зв'язок:

    PostgreSQL BIGINT
          ↓
    JavaScript BigInt

але конкретне представлення залежить від database driver / ORM.

---

## 🧠 Що потрібно реально запам'ятати

Для Junior Full Stack JavaScript достатньо впевнено знати:

1. `BigInt` — окремий primitive type.
2. BigInt призначений тільки для цілих чисел.
3. BigInt записується із суфіксом `n`.
4. `typeof 123n === "bigint"`.
5. `Number.MAX_SAFE_INTEGER === 9007199254740991`.
6. За межами safe integer `Number` може втрачати точність.
7. BigInt дозволяє працювати з набагато більшими integer.
8. `Number` та `BigInt` не можна безпосередньо змішувати в арифметичних операціях.
9. `BigInt` не підтримує дроби.
10. `10n / 3n` дає `3n`.
11. `Math` не працює безпосередньо з BigInt.
12. Перетворення `BigInt → Number` може призвести до втрати точності.
13. `JSON.stringify()` не серіалізує BigInt напряму.
14. Не потрібно використовувати BigInt там, де достатньо Number.
15. Для Full Stack особливо важливий зв'язок `PostgreSQL BIGINT → JavaScript BigInt → JSON/API`.

> **Головна практична ідея: не використовуй BigInt просто тому, що він "точніший". Використовуй `Number` для звичайних чисел, а `BigInt` — коли тобі справді потрібні дуже великі точні цілі числа.**