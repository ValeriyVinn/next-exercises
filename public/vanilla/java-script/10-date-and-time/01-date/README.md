# 10. Date

`Date` — вбудований об'єкт JavaScript для роботи з датою та часом.

Він дозволяє:

- створювати дату;
- отримувати поточну дату та час;
- отримувати окремі компоненти дати;
- змінювати компоненти дати;
- отримувати timestamp;
- перетворювати дату у string;
- порівнювати дати;
- виконувати базові операції з датами;
- передавати дати між frontend і backend.

Основний об'єкт:

    Date

Наприклад:

    const now = new Date();

    console.log(now);

---

### Ключові поняття

✔ `Date`  
✔ date  
✔ time  
✔ timestamp  
✔ Unix timestamp  
✔ epoch  
✔ milliseconds  
✔ `new Date()`  
✔ `Date.now()`  
✔ date components  
✔ year  
✔ month  
✔ day  
✔ hours  
✔ minutes  
✔ seconds  
✔ milliseconds  
✔ local time  
✔ UTC  
✔ timezone  
✔ ISO 8601  
✔ `getTime()`  
✔ `getFullYear()`  
✔ `getMonth()`  
✔ `getDate()`  
✔ `getDay()`  
✔ `getHours()`  
✔ `getMinutes()`  
✔ `getSeconds()`  
✔ `getMilliseconds()`  
✔ `getUTC...()`  
✔ `set...()`  
✔ `toISOString()`  
✔ `toString()`  
✔ `toDateString()`  
✔ `toTimeString()`  
✔ `Date.parse()`  
✔ `Date.UTC()`  

---

### Що потрібно пам'ятати

• `Date` представляє конкретний момент часу.

• Усередині `Date` значення базується на кількості мілісекунд від Unix epoch.

• Unix epoch — `1970-01-01T00:00:00.000Z`.

• `new Date()` створює об'єкт із поточним моментом часу.

• `Date.now()` повертає поточний timestamp у мілісекундах.

• `getTime()` повертає timestamp конкретного `Date`.

• У JavaScript місяці в `Date` нумеруються від `0` до `11`.

    0  → January
    1  → February
    2  → March
    ...
    11 → December

• День місяця через `getDate()` починається з `1`.

• День тижня через `getDay()` має значення:

    0 → Sunday
    1 → Monday
    2 → Tuesday
    3 → Wednesday
    4 → Thursday
    5 → Friday
    6 → Saturday

• `get...()` працює з local time.

• `getUTC...()` працює з UTC.

• `toISOString()` повертає дату у стандартизованому UTC ISO-форматі.

• `Date` не зберігає timezone як окрему властивість конкретної дати.

• Для складного форматування дат та локалізації використовується `Intl.DateTimeFormat`.

---

# Date Object

Створити дату можна через:

    new Date()

Наприклад:

    const now = new Date();

    console.log(now);

---

# Current Date and Time

Для отримання поточного моменту:

    const now = new Date();

    console.log(now);

`new Date()` використовує поточний момент часу системного середовища.

---

# Date.now()

`Date.now()` повертає timestamp поточного моменту.

    const timestamp = Date.now();

    console.log(timestamp);

Результат буде приблизно таким:

    1780000000000

Точне число залежить від моменту виконання.

---

### Date.now() vs new Date()

    const timestamp = Date.now();

    const date = new Date();

`Date.now()`:

    → number

`new Date()`:

    → Date object

Наприклад:

    console.log(typeof Date.now());
    // "number"

    console.log(typeof new Date());
    // "object"

---

# Timestamp

Timestamp — числове представлення моменту часу.

У JavaScript `Date` використовує milliseconds.

Наприклад:

    const date = new Date();

    console.log(date.getTime());

---

### Epoch

Unix epoch:

    1970-01-01T00:00:00.000Z

Наприклад:

    const date = new Date(0);

    console.log(date.toISOString());

Результат:

    1970-01-01T00:00:00.000Z

Тобто:

    0 milliseconds
        ↓
    Unix epoch

---

# Milliseconds

JavaScript `Date` працює з мілісекундами.

Наприклад:

    const date = new Date(1000);

Це:

    1000 milliseconds
        ↓
    1 second

Ще:

    60_000 milliseconds
        ↓
    1 minute

    3_600_000 milliseconds
        ↓
    1 hour

---

# Creating Date

Існує декілька способів створення `Date`.

---

## Current date

    const now = new Date();

---

## From timestamp

    const date = new Date(0);

    console.log(date.toISOString());

Результат:

    1970-01-01T00:00:00.000Z

---

## From date string

    const date = new Date("2026-09-24");

    console.log(date);

ISO-подібний формат є хорошим вибором для передачі дат.

---

## From ISO datetime

    const date = new Date("2026-09-24T12:30:00Z");

    console.log(date);

`Z` означає UTC.

---

## From components

Можна передати компоненти:

    const date = new Date(
        2026,
        8,
        24
    );

Тут:

    2026 → year
    8    → September
    24   → day

Пам'ятай:

    January  → 0
    February → 1
    ...
    September → 8

---

### Date components

Повний синтаксис:

    new Date(
        year,
        monthIndex,
        day,
        hours,
        minutes,
        seconds,
        milliseconds
    );

Наприклад:

    const date = new Date(
        2026,
        8,
        24,
        14,
        30,
        15,
        500
    );

---

# Month Index

Одна з найважливіших особливостей `Date`:

    month → 0-based

Тобто:

    January   → 0
    February  → 1
    March     → 2
    April     → 3
    May       → 4
    June      → 5
    July      → 6
    August    → 7
    September → 8
    October   → 9
    November  → 10
    December  → 11

Наприклад:

    const date = new Date(2026, 0, 1);

Це:

    January 1, 2026

А не:

    February 1, 2026

---

# Date Components

Дата складається з компонентів:

    year
    month
    day of month
    day of week
    hours
    minutes
    seconds
    milliseconds

Наприклад:

    const date = new Date();

---

# getFullYear()

Отримати рік:

    const date = new Date();

    console.log(date.getFullYear());

Наприклад:

    2026

---

# getMonth()

Отримати місяць:

    const date = new Date();

    console.log(date.getMonth());

Пам'ятай:

    January → 0
    December → 11

---

# getDate()

Отримати день місяця:

    const date = new Date();

    console.log(date.getDate());

Наприклад:

    24

Це день місяця.

---

# getDay()

Отримати день тижня:

    const date = new Date();

    console.log(date.getDay());

Результат:

    0 → Sunday
    1 → Monday
    2 → Tuesday
    3 → Wednesday
    4 → Thursday
    5 → Friday
    6 → Saturday

Важливо:

`getDay()` — це день тижня.

`getDate()` — це день місяця.

---

# getHours()

Отримати години:

    const date = new Date();

    console.log(date.getHours());

---

# getMinutes()

Отримати хвилини:

    const date = new Date();

    console.log(date.getMinutes());

---

# getSeconds()

Отримати секунди:

    const date = new Date();

    console.log(date.getSeconds());

---

# getMilliseconds()

Отримати мілісекунди:

    const date = new Date();

    console.log(date.getMilliseconds());

---

# Отримання всіх компонентів

    const date = new Date();

    console.log(date.getFullYear());
    console.log(date.getMonth());
    console.log(date.getDate());
    console.log(date.getDay());
    console.log(date.getHours());
    console.log(date.getMinutes());
    console.log(date.getSeconds());
    console.log(date.getMilliseconds());

---

# UTC

UTC — Universal Coordinated Time.

JavaScript має окремі методи для отримання компонентів у UTC.

Наприклад:

    const date = new Date();

    date.getFullYear();
    date.getUTCFullYear();

Перше значення:

    → local year

Друге:

    → UTC year

---

# Local Time vs UTC

Local:

    getFullYear()
    getMonth()
    getDate()
    getDay()
    getHours()
    getMinutes()
    getSeconds()

UTC:

    getUTCFullYear()
    getUTCMonth()
    getUTCDate()
    getUTCDay()
    getUTCHours()
    getUTCMinutes()
    getUTCSeconds()

---

# UTC Methods

Основні UTC-методи:

    getUTCFullYear()
    getUTCMonth()
    getUTCDate()
    getUTCDay()
    getUTCHours()
    getUTCMinutes()
    getUTCSeconds()
    getUTCMilliseconds()

Наприклад:

    const date = new Date();

    console.log(date.getHours());
    console.log(date.getUTCHours());

Значення можуть відрізнятися через timezone.

---

# getTime()

`getTime()` повертає timestamp.

    const date = new Date();

    const timestamp = date.getTime();

    console.log(timestamp);

Результат:

    number

---

### Date.now() vs getTime()

    Date.now()

повертає timestamp:

    → зараз

А:

    date.getTime()

повертає timestamp:

    → конкретного Date

Наприклад:

    const date = new Date("2026-09-24T12:00:00Z");

    console.log(date.getTime());

---

# Date to Number

`Date` можна перетворити на timestamp.

    const date = new Date();

    const timestamp = Number(date);

Також:

    const timestamp = +date;

Але для читабельності зазвичай краще:

    date.getTime()

---

# Date to String

`Date` можна перетворити у string.

    const date = new Date();

    console.log(String(date));

Або:

    console.log(date.toString());

---

# toString()

`toString()` повертає текстове представлення дати у local timezone.

    const date = new Date();

    console.log(date.toString());

Формат залежить від середовища та timezone.

---

# toDateString()

`toDateString()` повертає тільки дату без часу.

    const date = new Date();

    console.log(date.toDateString());

Наприклад:

    Thu Sep 24 2026

---

# toTimeString()

`toTimeString()` повертає час без дати.

    const date = new Date();

    console.log(date.toTimeString());

---

# toISOString()

`toISOString()` — один із найважливіших методів для роботи з датами.

    const date = new Date();

    console.log(date.toISOString());

Приклад:

    2026-09-24T12:30:00.000Z

Формат:

    YYYY-MM-DDTHH:mm:ss.sssZ

---

### ISO 8601

ISO-подібний формат:

    2026-09-24T12:30:00.000Z

Розшифрування:

    2026 → year
    09   → month
    24   → day
    T    → separator
    12   → hours
    30   → minutes
    00   → seconds
    000  → milliseconds
    Z    → UTC

ISO 8601 широко використовується для передачі дат між системами.

---

# Date Parsing

Parsing — перетворення string у дату.

Наприклад:

    const date = new Date("2026-09-24");

---

# Date.parse()

`Date.parse()` перетворює date string у timestamp.

    const timestamp = Date.parse(
        "2026-09-24"
    );

    console.log(timestamp);

Результат:

    number

---

### Date.parse() та new Date()

    const timestamp = Date.parse(
        "2026-09-24"
    );

Аналогічно:

    const date = new Date(
        "2026-09-24"
    );

`Date.parse()` повертає timestamp.

`new Date()` повертає `Date`.

---

# Valid Date

Не кожен string створює коректну дату.

Наприклад:

    const date = new Date("invalid");

    console.log(date);

Отримаємо:

    Invalid Date

---

### Перевірка валідності

Один із простих способів:

    const date = new Date("2026-09-24");

    const isValid = !Number.isNaN(
        date.getTime()
    );

    console.log(isValid);

Результат:

    true

Для invalid date:

    const date = new Date("invalid");

    console.log(
        Number.isNaN(date.getTime())
    );

Результат:

    true

---

# Invalid Date

`Invalid Date` — спеціальний стан `Date`, який означає, що дата не представляє коректний момент часу.

Наприклад:

    const date = new Date("hello");

    console.log(date.toString());

Результат:

    Invalid Date

---

# Date Setters

`Date` дозволяє змінювати свої компоненти.

Основні методи:

    setFullYear()
    setMonth()
    setDate()
    setHours()
    setMinutes()
    setSeconds()
    setMilliseconds()

Наприклад:

    const date = new Date();

    date.setFullYear(2030);

    console.log(date);

---

# setMonth()

Змінити місяць:

    const date = new Date();

    date.setMonth(0);

Тепер місяць:

    January

Пам'ятай:

    January → 0

---

# setDate()

Змінити день місяця:

    const date = new Date();

    date.setDate(15);

---

# setHours()

Змінити години:

    const date = new Date();

    date.setHours(12);

---

# setMinutes()

Змінити хвилини:

    const date = new Date();

    date.setMinutes(30);

---

# setSeconds()

Змінити секунди:

    const date = new Date();

    date.setSeconds(45);

---

# setMilliseconds()

Змінити мілісекунди:

    const date = new Date();

    date.setMilliseconds(500);

---

# UTC Setters

Існують також UTC-версії:

    setUTCFullYear()
    setUTCMonth()
    setUTCDate()
    setUTCHours()
    setUTCMinutes()
    setUTCSeconds()
    setUTCMilliseconds()

Наприклад:

    const date = new Date();

    date.setUTCHours(12);

---

# Date Mutation

Методи `set...()` змінюють існуючий `Date`.

Наприклад:

    const date = new Date();

    date.setFullYear(2030);

Після цього:

    date

вже представляє змінений момент.

Тому потрібно пам'ятати:

    Date object → mutable

---

# Копіювання Date

Якщо потрібно створити копію:

    const original = new Date();

    const copy = new Date(original);

Тепер:

    original !== copy

але вони представляють той самий момент часу.

---

### Копіювання через timestamp

    const original = new Date();

    const copy = new Date(
        original.getTime()
    );

---

# Date Comparison

`Date` можна порівнювати через timestamp.

Наприклад:

    const first = new Date(
        "2026-01-01"
    );

    const second = new Date(
        "2026-02-01"
    );

    console.log(first < second);

Результат:

    true

JavaScript при порівнянні приводить `Date` до числового timestamp.

---

# Date Equality

Увага:

    const first = new Date(
        "2026-01-01"
    );

    const second = new Date(
        "2026-01-01"
    );

    console.log(first === second);

Результат:

    false

Причина:

`first` і `second` — різні object references.

---

### Порівняння timestamp

Правильно:

    console.log(
        first.getTime() === second.getTime()
    );

Результат:

    true

---

# Date Difference

Різницю між датами можна отримати через timestamp.

    const first = new Date(
        "2026-01-01"
    );

    const second = new Date(
        "2026-01-10"
    );

    const difference =
        second.getTime() - first.getTime();

Результат:

    777600000

Це milliseconds.

---

# Milliseconds to Seconds

    const milliseconds = 5000;

    const seconds = milliseconds / 1000;

Результат:

    5

---

# Milliseconds to Minutes

    const milliseconds = 120000;

    const minutes =
        milliseconds / 1000 / 60;

Результат:

    2

---

# Milliseconds to Hours

    const milliseconds = 7_200_000;

    const hours =
        milliseconds / 1000 / 60 / 60;

Результат:

    2

---

# Constants for Time

Для читабельності можна використовувати constants:

    const SECOND = 1000;

    const MINUTE = SECOND * 60;

    const HOUR = MINUTE * 60;

    const DAY = HOUR * 24;

Наприклад:

    const tomorrow =
        Date.now() + DAY;

---

# Date Arithmetic

До timestamp можна додавати milliseconds.

Наприклад:

    const date = new Date();

    const tomorrow = new Date(
        date.getTime() + DAY
    );

---

### Додати один день

    const DAY = 24 * 60 * 60 * 1000;

    const date = new Date();

    const tomorrow = new Date(
        date.getTime() + DAY
    );

Це простий підхід для базових задач.

Для складнішої календарної арифметики потрібно враховувати timezone та переходи між літнім/зимовим часом.

---

# Date Overflow

`Date` автоматично нормалізує деякі значення.

Наприклад:

    const date = new Date(
        2026,
        0,
        32
    );

JavaScript нормалізує дату до наступного місяця.

Ця поведінка може бути корисною для арифметики, але її потрібно розуміти.

---

# Date Overflow Example

    const date = new Date(
        2026,
        0,
        1
    );

    date.setDate(
        date.getDate() + 30
    );

Дата буде автоматично перерахована.

---

# Date and Time Zones

Один і той самий момент часу може відображатися по-різному в різних часових поясах.

Наприклад:

    UTC:
    2026-09-24T12:00:00Z

У local timezone це може бути:

    15:00

або інший local time залежно від timezone.

Важливо розділяти:

    момент часу
        ↓
    timezone
        ↓
    local representation

---

# Date vs Timezone

`Date` представляє момент часу.

Timezone використовується для перетворення цього моменту у локальне представлення.

Наприклад:

    same instant
         ↓
    UTC
         ↓
    Europe/Kyiv
         ↓
    America/New_York

Момент той самий, але локальний час різний.

---

# Z

У ISO datetime:

    2026-09-24T12:00:00.000Z

`Z` означає UTC.

Наприклад:

    const date = new Date(
        "2026-09-24T12:00:00Z"
    );

---

# Offset

Дата може містити timezone offset.

Наприклад:

    2026-09-24T15:00:00+03:00

`+03:00` означає:

    UTC + 3 hours

---

# ISO Date Strings

Для обміну датами між frontend і backend зручно використовувати ISO-представлення:

    const date = new Date();

    const value = date.toISOString();

Наприклад:

    2026-09-24T12:30:00.000Z

Такий формат добре підходить для:

    APIs
    JSON
    databases
    logs
    network communication

---

# JSON and Date

При серіалізації об'єкта `Date` у JSON дата зазвичай перетворюється на ISO string.

Наприклад:

    const data = {
        createdAt: new Date()
    };

    const json = JSON.stringify(data);

Результат міститиме дату як string.

Наприклад:

    {
        "createdAt": "2026-09-24T12:30:00.000Z"
    }

---

### JSON.parse()

Після `JSON.parse()` дата автоматично не стає `Date`.

Наприклад:

    const json = '{"createdAt":"2026-09-24T12:30:00.000Z"}';

    const data = JSON.parse(json);

    console.log(typeof data.createdAt);

Результат:

    string

Якщо потрібен `Date`:

    const date = new Date(
        data.createdAt
    );

---

# Date in API

Backend може повернути:

    {
        "createdAt": "2026-09-24T12:30:00.000Z"
    }

Frontend отримує:

    string

І за потреби створює:

    const date = new Date(
        data.createdAt
    );

Це важлива практика для full-stack JavaScript.

---

# Date and Database

При роботі з backend та database потрібно розуміти різницю між:

    Date object
    timestamp
    ISO string
    database date/time type

Наприклад:

    frontend
        ↓
    ISO string
        ↓
    backend
        ↓
    database

А при отриманні:

    database
        ↓
    backend
        ↓
    JSON
        ↓
    frontend
        ↓
    Date

---

# Common Date Methods

Найважливіші методи:

    new Date()

    Date.now()

    Date.parse()

    Date.UTC()

    date.getTime()

    date.getFullYear()
    date.getMonth()
    date.getDate()
    date.getDay()

    date.getHours()
    date.getMinutes()
    date.getSeconds()
    date.getMilliseconds()

    date.toString()
    date.toDateString()
    date.toTimeString()
    date.toISOString()

    date.setFullYear()
    date.setMonth()
    date.setDate()

    date.setHours()
    date.setMinutes()
    date.setSeconds()
    date.setMilliseconds()

---

# Date.UTC()

`Date.UTC()` створює timestamp з UTC-компонентів.

Наприклад:

    const timestamp = Date.UTC(
        2026,
        8,
        24
    );

Результат:

    number

Його можна використати:

    const date = new Date(timestamp);

---

# Date.UTC() та new Date()

Наприклад:

    const timestamp = Date.UTC(
        2026,
        8,
        24
    );

    const date = new Date(timestamp);

Тут:

    Date.UTC()
        ↓
    timestamp

    new Date()
        ↓
    Date object

---

# Date Constructor vs Date.now()

    new Date()

→ `Date object`

    Date.now()

→ `number`

Наприклад:

    const date = new Date();

    const timestamp = Date.now();

---

# Date Methods Classification

## Creation

    new Date()
    Date.now()
    Date.parse()
    Date.UTC()

---

## Getters

    getTime()

    getFullYear()
    getMonth()
    getDate()
    getDay()

    getHours()
    getMinutes()
    getSeconds()
    getMilliseconds()

---

## UTC Getters

    getUTCFullYear()
    getUTCMonth()
    getUTCDate()
    getUTCDay()

    getUTCHours()
    getUTCMinutes()
    getUTCSeconds()
    getUTCMilliseconds()

---

## Setters

    setFullYear()
    setMonth()
    setDate()

    setHours()
    setMinutes()
    setSeconds()
    setMilliseconds()

---

## UTC Setters

    setUTCFullYear()
    setUTCMonth()
    setUTCDate()

    setUTCHours()
    setUTCMinutes()
    setUTCSeconds()
    setUTCMilliseconds()

---

## Formatting

    toString()
    toDateString()
    toTimeString()
    toISOString()

---

# Practical Examples

## Приклад 1 — поточна дата

    const now = new Date();

    console.log(now);

---

## Приклад 2 — поточний timestamp

    const timestamp = Date.now();

    console.log(timestamp);

---

## Приклад 3 — отримати рік

    const date = new Date();

    console.log(
        date.getFullYear()
    );

---

## Приклад 4 — отримати місяць

    const date = new Date();

    console.log(
        date.getMonth()
    );

---

## Приклад 5 — отримати день місяця

    const date = new Date();

    console.log(
        date.getDate()
    );

---

## Приклад 6 — отримати день тижня

    const date = new Date();

    console.log(
        date.getDay()
    );

---

## Приклад 7 — отримати час

    const date = new Date();

    console.log(
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    );

---

## Приклад 8 — ISO

    const date = new Date();

    console.log(
        date.toISOString()
    );

---

## Приклад 9 — конкретна дата

    const date = new Date(
        "2026-09-24"
    );

    console.log(date);

---

## Приклад 10 — конкретний datetime

    const date = new Date(
        "2026-09-24T12:30:00Z"
    );

    console.log(date);

---

## Приклад 11 — timestamp

    const date = new Date();

    console.log(
        date.getTime()
    );

---

## Приклад 12 — перевірка дати

    const date = new Date(
        "2026-09-24"
    );

    const isValid =
        !Number.isNaN(date.getTime());

    console.log(isValid);

---

## Приклад 13 — змінити рік

    const date = new Date();

    date.setFullYear(2030);

    console.log(date);

---

## Приклад 14 — змінити місяць

    const date = new Date();

    date.setMonth(0);

    console.log(date);

---

## Приклад 15 — змінити день

    const date = new Date();

    date.setDate(15);

    console.log(date);

---

## Приклад 16 — порівняння

    const first = new Date(
        "2026-01-01"
    );

    const second = new Date(
        "2026-02-01"
    );

    console.log(first < second);

Результат:

    true

---

## Приклад 17 — однакові дати

    const first = new Date(
        "2026-01-01"
    );

    const second = new Date(
        "2026-01-01"
    );

    console.log(
        first.getTime() === second.getTime()
    );

Результат:

    true

---

## Приклад 18 — різниця між датами

    const first = new Date(
        "2026-01-01"
    );

    const second = new Date(
        "2026-01-10"
    );

    const difference =
        second.getTime() - first.getTime();

    console.log(difference);

---

## Приклад 19 — milliseconds у days

    const first = new Date(
        "2026-01-01"
    );

    const second = new Date(
        "2026-01-10"
    );

    const difference =
        second.getTime() - first.getTime();

    const days =
        difference /
        (1000 * 60 * 60 * 24);

    console.log(days);

Результат:

    9

---

## Приклад 20 — tomorrow

    const DAY =
        24 * 60 * 60 * 1000;

    const tomorrow = new Date(
        Date.now() + DAY
    );

    console.log(tomorrow);

---

## Приклад 21 — JSON

    const data = {
        createdAt: new Date()
    };

    const json =
        JSON.stringify(data);

    console.log(json);

---

## Приклад 22 — JSON назад у Date

    const json =
        '{"createdAt":"2026-09-24T12:30:00.000Z"}';

    const data =
        JSON.parse(json);

    const date =
        new Date(data.createdAt);

    console.log(date);

---

# Типові помилки

❌ Забувати, що місяці починаються з `0`.

    new Date(2026, 0, 1)

Це:

    January 1, 2026

а не February.

---

❌ Плутати `getDate()` та `getDay()`.

    getDate()
        → day of month

    getDay()
        → day of week

Наприклад:

    getDate() → 24

    getDay() → 4

якщо дата припадає на четвер.

---

❌ Порівнювати два Date через `===`.

    first === second

Це порівнює references.

Правильно:

    first.getTime() === second.getTime()

---

❌ Вважати, що `Date` зберігає timezone як частину самого моменту.

`Date` представляє момент часу.

Timezone впливає на його локальне представлення.

---

❌ Плутати local time та UTC.

    getHours()

не обов'язково дорівнює:

    getUTCHours()

---

❌ Вважати ISO string та Date одним типом.

    "2026-09-24T12:30:00.000Z"

це:

    string

А:

    new Date("2026-09-24T12:30:00.000Z")

це:

    Date object

---

❌ Очікувати, що `JSON.parse()` автоматично створить `Date`.

    JSON.parse()

повертає звичайні JavaScript values.

ISO string залишиться:

    string

---

❌ Неправильно працювати з timezone.

Наприклад, зберігати локальний час без інформації про timezone, а потім на іншому сервері інтерпретувати його як інший момент.

Для обміну моментами часу часто зручно використовувати:

    ISO 8601 + UTC

---

❌ Працювати з датами як із простими strings.

Наприклад:

    "2026-09-24"

і:

    "2026-10-01"

можна порівнювати як ISO date strings у певних сценаріях, але для загальної роботи з моментами часу краще розуміти `Date` і timestamp.

---

❌ Мутувати Date, коли потрібен оригінальний об'єкт.

    const date = new Date();

    date.setDate(
        date.getDate() + 1
    );

Тут `date` змінюється.

Якщо потрібна копія:

    const tomorrow = new Date(date);

    tomorrow.setDate(
        tomorrow.getDate() + 1
    );

---

# Date Object Model

Корисно мислити про `Date` так:

    Date
      ↓
    конкретний момент часу
      ↓
    timestamp
      ↓
    milliseconds since Unix epoch

А при відображенні:

    Date
      ↓
    local time
    або
    UTC
      ↓
    string representation

---

# Date Workflow

Типовий workflow:

    input
      ↓
    parse
      ↓
    Date
      ↓
    manipulate
      ↓
    compare
      ↓
    format
      ↓
    output

Наприклад:

    API string
        ↓
    new Date()
        ↓
    getTime()
        ↓
    calculation
        ↓
    toISOString()
        ↓
    API response

---

# Date у Full Stack JavaScript

Типовий сценарій:

    Browser
        ↓
    ISO string
        ↓
    HTTP request
        ↓
    Node.js / NestJS
        ↓
    Database
        ↓
    query
        ↓
    backend
        ↓
    JSON
        ↓
    Browser

Наприклад:

    {
        "createdAt": "2026-09-24T12:30:00.000Z"
    }

На frontend:

    const date = new Date(
        data.createdAt
    );

Після цього можна форматувати дату для користувача.

---

# Date Formatting

Для простих задач можна використовувати:

    toISOString()
    toDateString()
    toTimeString()
    toString()

Але для нормального UI-форматування дат краще використовувати:

    Intl.DateTimeFormat

Це буде детально розглянуто у:

    10-date-and-time
        └── 05-intl

---

# Date Comparison Pattern

Типовий шаблон:

    const first = new Date(
        firstValue
    );

    const second = new Date(
        secondValue
    );

    if (first.getTime() < second.getTime()) {
        ...
    }

Або:

    if (first < second) {
        ...
    }

---

# Date Difference Pattern

Типовий шаблон:

    const first = new Date(
        firstValue
    );

    const second = new Date(
        secondValue
    );

    const difference =
        second.getTime() -
        first.getTime();

---

# Date Validation Pattern

    const date = new Date(
        value
    );

    const isValid =
        !Number.isNaN(
            date.getTime()
        );

---

# Date Copy Pattern

    const original = new Date();

    const copy = new Date(
        original
    );

---

# Date → Timestamp

    const date = new Date();

    const timestamp =
        date.getTime();

Схема:

    Date
      ↓
    getTime()
      ↓
    number

---

# Timestamp → Date

    const timestamp = Date.now();

    const date =
        new Date(timestamp);

Схема:

    number
      ↓
    new Date()
      ↓
    Date

---

# String → Date

    const value =
        "2026-09-24T12:30:00Z";

    const date =
        new Date(value);

Схема:

    string
      ↓
    new Date()
      ↓
    Date

---

# Date → ISO String

    const date = new Date();

    const value =
        date.toISOString();

Схема:

    Date
      ↓
    toISOString()
      ↓
    string

---

# Питання зі співбесіди

Що таке `Date` у JavaScript?

Як створити поточну дату?

Що повертає `new Date()`?

Що повертає `Date.now()`?

Що таке timestamp?

Що таке Unix epoch?

У яких одиницях JavaScript `Date` зберігає timestamp?

Чому Unix epoch починається з 1970 року?

Що повертає `getTime()`?

Яка різниця між `Date.now()` та `getTime()`?

Чому місяці в JavaScript починаються з `0`?

Що повертає `getMonth()`?

Що повертає `getDate()`?

Що повертає `getDay()`?

Яка різниця між `getDate()` та `getDay()`?

Що таке UTC?

Чим `getHours()` відрізняється від `getUTCHours()`?

Що робить `toISOString()`?

Що означає `Z` в ISO date string?

Що таке ISO 8601?

Як створити `Date` з timestamp?

Як створити `Date` з string?

Як перевірити, чи є `Date` валідним?

Що таке `Invalid Date`?

Як отримати timestamp?

Як порівняти дві дати?

Чому:

    new Date("2026-01-01") ===
    new Date("2026-01-01")

повертає `false`?

Як правильно порівняти два `Date`?

Як отримати різницю між двома датами?

В яких одиницях повертається різниця між timestamp?

Як додати день до дати?

Що роблять `setFullYear()`, `setMonth()` та `setDate()`?

Чи мутують `set...()` методи існуючий `Date`?

Як скопіювати `Date`?

Чим local time відрізняється від UTC?

Як `Date` працює з timezone?

Що відбувається з `Date` під час `JSON.stringify()`?

Що повертає `JSON.parse()` для ISO date string?

Чому після `JSON.parse()` потрібно створювати `new Date()`?

Як передавати дату через API?

Чому ISO string зручний для API?

Чим `Date` відрізняється від date string?

Що таке `Date.parse()`?

Що робить `Date.UTC()`?

---

# Шлях

## 🟢 Core (обов'язково знати)

Що таке `Date`.

Створення:

    new Date()

Поточний timestamp:

    Date.now()

Timestamp.

Unix epoch.

Milliseconds.

    getTime()

Основні getters:

    getFullYear()
    getMonth()
    getDate()
    getDay()

    getHours()
    getMinutes()
    getSeconds()
    getMilliseconds()

Основні setters:

    setFullYear()
    setMonth()
    setDate()

    setHours()
    setMinutes()
    setSeconds()
    setMilliseconds()

Різниця між:

    getDate()
    getDay()
    getMonth()

Розуміння:

    local time
    UTC

`toISOString()`.

ISO 8601.

Створення Date з timestamp.

Створення Date з ISO string.

Порівняння дат.

Різниця між датами.

Перевірка `Invalid Date`.

---

## 🔵 Junior

Впевнена робота з:

    Date
    timestamp
    ISO string

Розуміння:

    Unix epoch
    milliseconds
    UTC
    local timezone

Використання:

    Date.now()
    Date.parse()
    Date.UTC()

Розуміння:

    get...
    getUTC...
    set...
    setUTC...

Порівняння дат.

Обчислення різниці між датами.

Базова date arithmetic.

Копіювання `Date`.

Розуміння mutation.

Робота з ISO dates в API.

Розуміння:

    JSON.stringify()
    JSON.parse()

у контексті дат.

Передача дат між:

    frontend
    backend
    database

Розуміння проблем timezone.

---

## 🟠 Middle

Глибше розуміння:

    UTC
    timezone
    offset
    ISO 8601

Робота з:

    API dates
    database timestamps
    server timezone
    client timezone

Розуміння DST:

    Daylight Saving Time

Розуміння складної date arithmetic.

Робота з календарними межами:

    month
    year
    leap year

Надійна валідація дат.

Розуміння parsing limitations.

Вибір правильного формату для:

    API
    database
    UI

Використання:

    Intl.DateTimeFormat

Timezone-aware formatting.

Розуміння різниці між:

    instant
    local date
    local time
    timezone

---

## 🔴 Senior

Глибоке розуміння:

    ECMAScript Date model

Time values.

Epoch time.

UTC.

Time zones.

Timezone offsets.

DST transitions.

Calendar calculations.

Leap years.

Parsing edge cases.

Serialization.

Distributed systems and time.

Server/client timezone differences.

Database time semantics.

Temporal API.

Розуміння різниці між:

    instant
    calendar date
    wall-clock time
    timezone

Вибір правильної моделі часу для domain logic.

Для складної роботи з датами сучасний JavaScript також має:

    Temporal

Temporal буде окремою концепцією більш просунутого рівня, оскільки він дозволяє чіткіше розділяти різні поняття часу.

---

# Міні-шпаргалка

## Current Date

    const now = new Date();

---

## Current Timestamp

    const timestamp = Date.now();

---

## Timestamp

    const timestamp =
        date.getTime();

---

## Timestamp → Date

    const date =
        new Date(timestamp);

---

## String → Date

    const date =
        new Date(
            "2026-09-24T12:30:00Z"
        );

---

## Date → ISO

    const value =
        date.toISOString();

---

## Year

    date.getFullYear();

---

## Month

    date.getMonth();

    January → 0
    December → 11

---

## Day of Month

    date.getDate();

---

## Day of Week

    date.getDay();

    Sunday → 0
    Saturday → 6

---

## Time

    date.getHours();
    date.getMinutes();
    date.getSeconds();
    date.getMilliseconds();

---

## UTC

    date.getUTCFullYear();
    date.getUTCMonth();
    date.getUTCDate();

    date.getUTCHours();
    date.getUTCMinutes();
    date.getUTCSeconds();

---

## Set

    date.setFullYear(2030);
    date.setMonth(0);
    date.setDate(15);

---

## ISO

    date.toISOString();

Формат:

    YYYY-MM-DDTHH:mm:ss.sssZ

---

## Compare

    first.getTime() <
    second.getTime()

---

## Equality

    first.getTime() ===
    second.getTime()

---

## Difference

    const difference =
        second.getTime() -
        first.getTime();

---

## Validate

    const isValid =
        !Number.isNaN(
            date.getTime()
        );

---

## Copy

    const copy =
        new Date(original);

---

## JSON

    JSON.stringify({
        createdAt: new Date()
    });

Дата буде серіалізована як ISO string.

---

# Основна модель

    Date
      ↓
    moment in time
      ↓
    timestamp
      ↓
    milliseconds since epoch

---

# Перетворення

    string
      ↓
    new Date()
      ↓
    Date
      ↓
    getTime()
      ↓
    timestamp

І назад:

    timestamp
      ↓
    new Date()
      ↓
    Date
      ↓
    toISOString()
      ↓
    ISO string

---

# Local vs UTC

    Date
      ↓
    ┌───────────────┐
    │               │
    ↓               ↓
    Local           UTC
    ↓               ↓
    get...          getUTC...

Наприклад:

    getHours()

і:

    getUTCHours()

можуть повернути різні значення.

---

# Основні правила

    new Date()
        → current Date

    Date.now()
        → current timestamp

    getTime()
        → timestamp

    getMonth()
        → 0–11

    getDate()
        → 1–31

    getDay()
        → 0–6

    get...
        → local time

    getUTC...
        → UTC

    set...
        → mutate Date

    toISOString()
        → UTC ISO string

---

# Головне:

• `Date` використовується для представлення конкретного моменту часу.

• `new Date()` створює `Date` для поточного моменту.

• `Date.now()` повертає поточний timestamp.

• Timestamp у JavaScript вимірюється в milliseconds.

• Unix epoch:

    1970-01-01T00:00:00.000Z

• `getTime()` повертає timestamp конкретного `Date`.

• `getFullYear()` повертає рік.

• `getMonth()` повертає місяць від `0` до `11`.

• `getDate()` повертає день місяця.

• `getDay()` повертає день тижня від `0` до `6`.

• Не можна плутати:

    getDate()
    getDay()

• `get...()` працює з local time.

• `getUTC...()` працює з UTC.

• `toISOString()` повертає ISO string у UTC.

• `Z` в ISO datetime означає UTC.

• ISO-представлення зручно використовувати для API та передачі дат між системами.

• `Date` і date string — різні типи:

    Date → object
    "2026-09-24..." → string

• `JSON.parse()` не перетворює ISO string автоматично на `Date`.

• Для створення `Date` з ISO string:

    const date = new Date(value);

• Два різні `Date` objects не є рівними через `===`, навіть якщо представляють один момент.

• Для порівняння моментів зручно використовувати:

    date.getTime()

• Різниця між датами через timestamp повертається в milliseconds.

• `set...()` методи змінюють існуючий `Date`.

• `Date` є mutable object.

• Якщо потрібна незалежна копія:

    const copy = new Date(original);

• Timezone та момент часу — не одне й те саме.

• Один момент часу може мати різне local представлення у різних timezone.

• При full-stack роботі важливо розуміти весь ланцюжок:

    frontend
        ↓
    ISO string
        ↓
    API
        ↓
    backend
        ↓
    database
        ↓
    backend
        ↓
    JSON
        ↓
    frontend
        ↓
    Date / formatting

• Для складного відображення дат і локалізації використовується:

    Intl.DateTimeFormat

• Для складної сучасної роботи з різними поняттями часу варто знати:

    Temporal

• Найважливіша модель для початку:

    Date
      ↓
    moment
      ↓
    timestamp
      ↓
    milliseconds

• Друга важлива модель:

    moment
      ↓
    UTC / local representation
      ↓
    formatted string

• Третя важлива модель для full-stack:

    Date object
        ↕
    timestamp
        ↕
    ISO string

• Основні методи, які потрібно знати на Core-рівні:

    new Date()
    Date.now()
    getTime()

    getFullYear()
    getMonth()
    getDate()
    getDay()

    getHours()
    getMinutes()
    getSeconds()

    toISOString()

    setFullYear()
    setMonth()
    setDate()

• Головна небезпека при роботі з датами — не сам `Date`, а неправильне розуміння:

    month indexing
    local time
    UTC
    timezone
    timestamp
    string vs Date
    mutation
    serialization

• Наступні теми цього розділу:

    01-date
        ↓
    Date object і базові операції

    02-date-comparison
        ↓
    порівняння дат

    03-date-arithmetic
        ↓
    арифметика дат

    04-formatting
        ↓
    форматування

    05-intl
        ↓
    локалізація та Intl API