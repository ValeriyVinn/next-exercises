# 02. Date Comparison

Порівняння дат — це визначення відношення між двома або більше моментами часу.

Потрібно вміти визначати:

- чи одна дата раніше іншої;
- чи одна дата пізніше іншої;
- чи дві дати представляють один момент;
- чи дата знаходиться до або після певного моменту;
- чи дата знаходиться в певному діапазоні;
- скільки часу між двома датами.

У JavaScript для цього найчастіше використовується:

    Date
    getTime()
    timestamp
    comparison operators

Основна ідея:

    Date
      ↓
    timestamp
      ↓
    compare numbers

---

### Ключові поняття

✔ date comparison  
✔ `Date`  
✔ timestamp  
✔ `getTime()`  
✔ `Date.now()`  
✔ milliseconds  
✔ earlier  
✔ later  
✔ same moment  
✔ `<`  
✔ `>`  
✔ `<=`  
✔ `>=`  
✔ `===`  
✔ `!==`  
✔ value comparison  
✔ reference comparison  
✔ date range  
✔ inclusive range  
✔ exclusive range  
✔ minimum date  
✔ maximum date  
✔ difference between dates  
✔ elapsed time  
✔ future date  
✔ past date  
✔ current date  
✔ UTC  
✔ local time  
✔ timezone  
✔ invalid date  
✔ `Invalid Date`  

---

### Що потрібно пам'ятати

• `Date` — це object, який представляє конкретний момент часу.

• Для надійного порівняння моментів часу зручно порівнювати timestamps.

• `getTime()` повертає timestamp у milliseconds.

• Якщо:

    first < second

то `first` відбувається раніше за `second`.

• Якщо:

    first > second

то `first` відбувається пізніше за `second`.

• Якщо:

    first.getTime() === second.getTime()

обидва `Date` представляють один момент часу.

• `===` між двома `Date` objects порівнює references, а не моменти часу.

• Для перевірки однакових моментів потрібно порівнювати:

    getTime()

• Різниця між датами — це різниця їх timestamp.

• Результат різниці між timestamp вимірюється в milliseconds.

• Для перевірки діапазону потрібно чітко визначити, чи межі включаються.

• Порівняння дат може бути правильним лише тоді, коли дати валідні.

• Timezone потрібно враховувати, якщо порівнюються локальні date/time strings.

---

# Date Comparison Model

Основна модель:

    Date
      ↓
    getTime()
      ↓
    timestamp
      ↓
    number comparison

Наприклад:

    const first = new Date(
        "2026-01-01"
    );

    const second = new Date(
        "2026-02-01"
    );

    if (first.getTime() < second.getTime()) {
        console.log("first is earlier");
    }

---

# Date as Timestamp

Кожен валідний `Date` може бути представлений timestamp.

    const date = new Date();

    console.log(
        date.getTime()
    );

Наприклад:

    1780000000000

Це number.

---

# Comparing Two Dates

Найпростіший підхід:

    const first = new Date(
        "2026-01-01"
    );

    const second = new Date(
        "2026-02-01"
    );

    console.log(
        first < second
    );

Результат:

    true

JavaScript при relational comparison приводить `Date` до числового значення.

---

# Explicit Comparison

Для навчання та особливої читабельності можна явно використовувати `getTime()`:

    const first = new Date(
        "2026-01-01"
    );

    const second = new Date(
        "2026-02-01"
    );

    console.log(
        first.getTime() <
        second.getTime()
    );

Результат:

    true

Це явно показує:

    Date
      ↓
    timestamp
      ↓
    comparison

---

# Earlier Date

Перевірити, чи дата раніше:

    const first = new Date(
        "2026-01-01"
    );

    const second = new Date(
        "2026-02-01"
    );

    const isEarlier =
        first.getTime() <
        second.getTime();

Результат:

    true

---

# Later Date

Перевірити, чи дата пізніше:

    const first = new Date(
        "2026-02-01"
    );

    const second = new Date(
        "2026-01-01"
    );

    const isLater =
        first.getTime() >
        second.getTime();

Результат:

    true

---

# Same Moment

Перевірити, чи два `Date` представляють один момент:

    const first = new Date(
        "2026-01-01T12:00:00Z"
    );

    const second = new Date(
        "2026-01-01T12:00:00Z"
    );

    const isSame =
        first.getTime() ===
        second.getTime();

Результат:

    true

---

# Date Equality

Важлива особливість:

    const first = new Date(
        "2026-01-01"
    );

    const second = new Date(
        "2026-01-01"
    );

    console.log(
        first === second
    );

Результат:

    false

Чому?

Тому що:

    first
      ↓
    object A

    second
      ↓
    object B

Це два різні object references.

---

# Reference Comparison

У JavaScript objects порівнюються за reference.

    const first = {};
    const second = {};

    console.log(
        first === second
    );

Результат:

    false

Навіть якщо:

    first

і:

    second

мають однаковий вміст.

---

# Date Reference vs Date Value

Для `Date` потрібно розрізняти:

    reference
        ↓
    object identity

та:

    value
        ↓
    represented moment

Наприклад:

    const first = new Date(
        "2026-01-01"
    );

    const second = new Date(
        "2026-01-01"
    );

    first === second
        → false

А:

    first.getTime() ===
    second.getTime()

        → true

---

# Comparison Operators

Для дат можна використовувати relational operators:

    <
    >
    <=
    >=

Наприклад:

    const today = new Date();

    const future = new Date(
        "2030-01-01"
    );

    console.log(
        today < future
    );

---

# Less Than

    first < second

означає:

    first is earlier than second

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

---

# Greater Than

    first > second

означає:

    first is later than second

---

# Less Than or Equal

    first <= second

означає:

    first is earlier
    OR
    first represents the same moment

---

# Greater Than or Equal

    first >= second

означає:

    first is later
    OR
    first represents the same moment

---

# Comparison Table

    first < second
        → first earlier

    first > second
        → first later

    first <= second
        → first earlier or same

    first >= second
        → first later or same

    first.getTime() === second.getTime()
        → same moment

---

# Date Comparison with getTime()

Рекомендований явний шаблон:

    const firstTime =
        first.getTime();

    const secondTime =
        second.getTime();

    if (firstTime < secondTime) {
        ...
    }

Це особливо зручно, коли timestamp потрібно використати декілька разів.

---

# Compare Dates Function

Можна створити функцію:

    function compareDates(first, second) {
        const firstTime = first.getTime();
        const secondTime = second.getTime();

        if (firstTime < secondTime) {
            return -1;
        }

        if (firstTime > secondTime) {
            return 1;
        }

        return 0;
    }

Результат:

    -1 → first earlier
     0 → same moment
     1 → first later

---

# Comparison Result Pattern

Дуже поширена модель:

    -1
     ↓
    earlier

     0
     ↓
    equal

     1
     ↓
    later

Цей підхід часто використовується в comparison functions.

---

# Compare Dates with Number

Оскільки timestamp — це number, можна порівнювати timestamp безпосередньо:

    const firstTime =
        first.getTime();

    const secondTime =
        second.getTime();

    if (firstTime < secondTime) {
        console.log("first");
    }

---

# Date.now() in Comparison

`Date.now()` зручно використовувати для порівняння з поточним моментом.

Наприклад:

    const expiration =
        new Date("2030-01-01");

    if (
        Date.now() <
        expiration.getTime()
    ) {
        console.log("still valid");
    }

---

# Past Date

Перевірка, чи дата вже минула:

    const date = new Date(
        "2020-01-01"
    );

    const isPast =
        date.getTime() <
        Date.now();

---

# Future Date

Перевірка, чи дата знаходиться в майбутньому:

    const date = new Date(
        "2030-01-01"
    );

    const isFuture =
        date.getTime() >
        Date.now();

---

# Current Moment

Точніше:

    const now = Date.now();

    const timestamp =
        date.getTime();

    if (timestamp < now) {
        console.log("past");
    }

    if (timestamp > now) {
        console.log("future");
    }

    if (timestamp === now) {
        console.log("same moment");
    }

На практиці точне `=== Date.now()` трапляється рідко, тому що час постійно змінюється.

---

# Past / Present / Future

Можна створити функцію:

    function getDateStatus(date) {
        const timestamp = date.getTime();
        const now = Date.now();

        if (timestamp < now) {
            return "past";
        }

        if (timestamp > now) {
            return "future";
        }

        return "now";
    }

---

# Date Range

Date range — проміжок між двома датами.

Наприклад:

    start
      ↓
    2026-01-01
      ↓
    2026-01-31
      ↓
    end

Потрібно визначити, чи дата знаходиться всередині цього діапазону.

---

# Inclusive Range

Inclusive range включає обидві межі.

Умова:

    start <= date <= end

У JavaScript:

    date >= start &&
    date <= end

Наприклад:

    const start = new Date(
        "2026-01-01"
    );

    const end = new Date(
        "2026-01-31"
    );

    const date = new Date(
        "2026-01-15"
    );

    const isInRange =
        date >= start &&
        date <= end;

---

# Exclusive Range

Exclusive range не включає межі.

Умова:

    start < date < end

У JavaScript:

    date > start &&
    date < end

---

# Mixed Range

Можна включати тільки одну межу.

Наприклад:

    start <= date < end

У JavaScript:

    date >= start &&
    date < end;

Такий підхід часто використовується для часових інтервалів.

---

# Range Boundaries

Потрібно завжди визначити:

    inclusive
        або
    exclusive

Наприклад:

    [start, end]

означає:

    start included
    end included

А:

    (start, end)

означає:

    start excluded
    end excluded

У JavaScript це зазвичай виражається умовами:

    >=
    <=

або:

    >
    <

---

# Check Date in Range

    function isInRange(date, start, end) {
        const timestamp = date.getTime();

        return (
            timestamp >= start.getTime() &&
            timestamp <= end.getTime()
        );
    }

---

# Check Date Outside Range

    function isOutsideRange(date, start, end) {
        const timestamp = date.getTime();

        return (
            timestamp < start.getTime() ||
            timestamp > end.getTime()
        );
    }

---

# Date Before

Функція:

    function isBefore(first, second) {
        return (
            first.getTime() <
            second.getTime()
        );
    }

---

# Date After

    function isAfter(first, second) {
        return (
            first.getTime() >
            second.getTime()
        );
    }

---

# Date Same

    function isSameMoment(first, second) {
        return (
            first.getTime() ===
            second.getTime()
        );
    }

---

# Date Same Day

Порівняння однакового моменту:

    first.getTime() ===
    second.getTime()

не означає:

    same calendar day

Наприклад:

    2026-09-24 10:00
    2026-09-24 18:00

Це різні моменти.

Але вони можуть бути одним календарним днем.

Тому:

    same moment

і:

    same calendar day

— різні поняття.

---

# Same Calendar Day

Для простого local-time порівняння можна порівняти:

    year
    month
    date

Наприклад:

    function isSameDay(first, second) {
        return (
            first.getFullYear() ===
            second.getFullYear() &&

            first.getMonth() ===
            second.getMonth() &&

            first.getDate() ===
            second.getDate()
        );
    }

---

# Same Year

    function isSameYear(first, second) {
        return (
            first.getFullYear() ===
            second.getFullYear()
        );
    }

---

# Same Month

Для одного календарного року:

    function isSameMonth(first, second) {
        return (
            first.getFullYear() ===
            second.getFullYear() &&

            first.getMonth() ===
            second.getMonth()
        );
    }

Потрібно враховувати рік.

Наприклад:

    January 2025

і:

    January 2026

мають однаковий month index, але це різні календарні місяці.

---

# Same Year and Month

Правильна модель:

    first.getFullYear() === second.getFullYear()

і:

    first.getMonth() === second.getMonth()

---

# Same Date vs Same Moment

Це важлива різниця.

### Same moment

    2026-09-24T12:00:00Z

і:

    2026-09-24T12:00:00Z

Один момент.

---

### Same calendar date

    2026-09-24 10:00
    2026-09-24 18:00

Один день, але різні моменти.

---

# Timezone and Comparison

Timezone особливо важливий, коли працюємо з local date/time.

Наприклад:

    2026-09-24T23:00:00-04:00

і:

    2026-09-25T03:00:00Z

можуть представляти один і той самий момент.

Тому порівнювати потрібно розуміючи, чи нас цікавить:

    same instant

чи:

    same local calendar date

---

# Same Instant in Different Timezones

Наприклад:

    2026-09-24T12:00:00Z

та:

    2026-09-24T15:00:00+03:00

представляють один момент часу.

Після створення `Date`:

    const first = new Date(
        "2026-09-24T12:00:00Z"
    );

    const second = new Date(
        "2026-09-24T15:00:00+03:00"
    );

можна перевірити:

    first.getTime() ===
    second.getTime();

Результат:

    true

---

# Date Difference

Порівняння часто переходить у визначення різниці.

    const first = new Date(
        "2026-01-01"
    );

    const second = new Date(
        "2026-01-10"
    );

    const difference =
        second.getTime() -
        first.getTime();

Результат:

    milliseconds

---

# Absolute Difference

Якщо не важливо, яка дата раніше:

    const difference = Math.abs(
        first.getTime() -
        second.getTime()
    );

Тепер результат завжди:

    >= 0

---

# Difference in Days

    const difference = Math.abs(
        second.getTime() -
        first.getTime()
    );

    const days =
        difference /
        (1000 * 60 * 60 * 24);

---

# Difference in Hours

    const difference =
        Math.abs(
            second.getTime() -
            first.getTime()
        );

    const hours =
        difference /
        (1000 * 60 * 60);

---

# Difference in Minutes

    const difference =
        Math.abs(
            second.getTime() -
            first.getTime()
        );

    const minutes =
        difference /
        (1000 * 60);

---

# Difference in Seconds

    const difference =
        Math.abs(
            second.getTime() -
            first.getTime()
        );

    const seconds =
        difference / 1000;

---

# Elapsed Time

Elapsed time — скільки часу пройшло між двома моментами.

Наприклад:

    const start = new Date();

    // some operation

    const end = new Date();

    const elapsed =
        end.getTime() -
        start.getTime();

---

# Measuring Execution Time

Для простих вимірювань можна використовувати:

    const start = Date.now();

    // code

    const end = Date.now();

    console.log(
        end - start
    );

Результат:

    milliseconds

Для високоточного вимірювання в браузері існують спеціальні Performance APIs, але це вже інша тема.

---

# Minimum Date

Знайти найранішу дату з двох:

    const first = new Date(
        "2026-01-01"
    );

    const second = new Date(
        "2026-02-01"
    );

    const earliest =
        first < second
            ? first
            : second;

---

# Maximum Date

Знайти найпізнішу дату:

    const latest =
        first > second
            ? first
            : second;

---

# Math.min() with Dates

`Math.min()` працює з numbers, тому спочатку потрібні timestamps.

    const first = new Date(
        "2026-01-01"
    );

    const second = new Date(
        "2026-02-01"
    );

    const earliestTimestamp =
        Math.min(
            first.getTime(),
            second.getTime()
        );

    const earliest =
        new Date(
            earliestTimestamp
        );

---

# Math.max() with Dates

    const latestTimestamp =
        Math.max(
            first.getTime(),
            second.getTime()
        );

    const latest =
        new Date(
            latestTimestamp
        );

---

# Find Earliest Date in Array

    const dates = [
        new Date("2026-03-01"),
        new Date("2026-01-01"),
        new Date("2026-02-01")
    ];

    const earliestTimestamp =
        Math.min(
            ...dates.map(date =>
                date.getTime()
            )
        );

    const earliest =
        new Date(
            earliestTimestamp
        );

---

# Find Latest Date in Array

    const latestTimestamp =
        Math.max(
            ...dates.map(date =>
                date.getTime()
            )
        );

    const latest =
        new Date(
            latestTimestamp
        );

---

# Sorting Dates

Масив дат можна сортувати через comparator.

    const dates = [
        new Date("2026-03-01"),
        new Date("2026-01-01"),
        new Date("2026-02-01")
    ];

    dates.sort(
        (first, second) =>
            first.getTime() -
            second.getTime()
    );

Після сортування:

    2026-01-01
    2026-02-01
    2026-03-01

---

# Descending Date Sort

Від найпізнішої до найранішої:

    dates.sort(
        (first, second) =>
            second.getTime() -
            first.getTime()
    );

---

# Sort Comparator

Основна модель comparator:

    first - second

Якщо результат:

    < 0
        → first before second

    0
        → same value

    > 0
        → first after second

Для `Date`:

    first.getTime() -
    second.getTime()

---

# Find Closest Date

Якщо потрібно знайти дату, найближчу до певного моменту:

    const target = new Date(
        "2026-02-15"
    );

    const dates = [
        new Date("2026-02-01"),
        new Date("2026-02-20"),
        new Date("2026-03-01")
    ];

    const closest = dates.reduce(
        (currentClosest, currentDate) => {
            const currentDifference =
                Math.abs(
                    currentDate.getTime() -
                    target.getTime()
                );

            const closestDifference =
                Math.abs(
                    currentClosest.getTime() -
                    target.getTime()
                );

            return currentDifference <
                closestDifference
                ? currentDate
                : currentClosest;
        }
    );

---

# Date Validation Before Comparison

Перед порівнянням потрібно переконатися, що дата валідна.

    function isValidDate(date) {
        return (
            date instanceof Date &&
            !Number.isNaN(
                date.getTime()
            )
        );
    }

---

# Comparing Invalid Dates

Наприклад:

    const invalid =
        new Date("invalid");

    console.log(
        invalid.getTime()
    );

Результат:

    NaN

Порівняння з `NaN` не працює як звичайне числове порівняння.

Наприклад:

    invalid.getTime() <
    Date.now()

Результат:

    false

Тому перед порівнянням потрібно враховувати invalid dates.

---

# NaN and Date Comparison

Важливо:

    NaN < 10
        → false

    NaN > 10
        → false

    NaN === 10
        → false

Тому:

    Invalid Date

може створити логічні помилки, якщо його не перевірити.

---

# Date Comparison Function

Надійніший варіант:

    function compareDates(first, second) {
        if (
            Number.isNaN(first.getTime()) ||
            Number.isNaN(second.getTime())
        ) {
            throw new Error(
                "Invalid date"
            );
        }

        return (
            first.getTime() -
            second.getTime()
        );
    }

---

# Date Range with Timestamps

Для складної логіки можна один раз отримати timestamps:

    const startTime =
        start.getTime();

    const endTime =
        end.getTime();

    const dateTime =
        date.getTime();

    const isInRange =
        dateTime >= startTime &&
        dateTime <= endTime;

Це робить логіку очевидною.

---

# Date Comparison with Today

Наприклад:

    const today = new Date();

    const date = new Date(
        "2026-12-01"
    );

    if (date > today) {
        console.log(
            "Date is in the future"
        );
    }

---

# Expiration Date

Типова практична задача:

    const expiresAt = new Date(
        "2026-12-31T23:59:59Z"
    );

    const isExpired =
        Date.now() >=
        expiresAt.getTime();

---

# Not Expired

    const isActive =
        Date.now() <
        expiresAt.getTime();

---

# Event Start

    const startsAt = new Date(
        "2026-12-01T10:00:00Z"
    );

    if (Date.now() < startsAt.getTime()) {
        console.log("not started");
    }

---

# Event Finished

    const endsAt = new Date(
        "2026-12-01T12:00:00Z"
    );

    if (Date.now() >= endsAt.getTime()) {
        console.log("finished");
    }

---

# Event Is Active

Можна перевірити, чи поточний момент знаходиться всередині інтервалу:

    const startsAt = new Date(
        "2026-12-01T10:00:00Z"
    );

    const endsAt = new Date(
        "2026-12-01T12:00:00Z"
    );

    const now = Date.now();

    const isActive =
        now >= startsAt.getTime() &&
        now < endsAt.getTime();

---

# Half-Open Interval

Для часових інтервалів часто зручно використовувати:

    start <= time < end

Тобто:

    time >= start
    &&
    time < end

Це називається half-open interval.

Такий підхід допомагає уникати неоднозначності на межах.

---

# Date Range in API

Наприклад, frontend відправляє:

    {
        "from": "2026-09-01T00:00:00.000Z",
        "to": "2026-10-01T00:00:00.000Z"
    }

Backend може перетворити:

    from
        ↓
    Date

    to
        ↓
    Date

і виконувати порівняння.

---

# Date Comparison in Database Context

При роботі з database потрібно розрізняти:

    JavaScript Date
        ↓
    timestamp / ISO string
        ↓
    database date/time value

Наприклад, backend може отримати:

    const date = new Date(
        requestDate
    );

і потім передати значення у SQL query.

Конкретний спосіб залежить від типу database та driver.

---

# Same Day Caveat

Порівняння:

    first.getTime() ===
    second.getTime()

перевіряє:

    same moment

а не:

    same day

Якщо потрібен same day, треба порівнювати календарні компоненти або використовувати відповідний date/time API.

---

# Local Calendar Day

Наприклад:

    const first = new Date(
        "2026-09-24T08:00:00Z"
    );

    const second = new Date(
        "2026-09-24T18:00:00Z"
    );

Вони:

    different moments

але можуть бути:

    same local calendar date

залежно від timezone.

Тому поняття "same day" завжди бажано визначати разом із timezone.

---

# UTC Calendar Comparison

Якщо бізнес-логіка працює саме з UTC-днями, потрібно порівнювати UTC-компоненти:

    getUTCFullYear()
    getUTCMonth()
    getUTCDate()

Наприклад:

    function isSameUTCDay(first, second) {
        return (
            first.getUTCFullYear() ===
            second.getUTCFullYear() &&

            first.getUTCMonth() ===
            second.getUTCMonth() &&

            first.getUTCDate() ===
            second.getUTCDate()
        );
    }

---

# Local Calendar Comparison

Для local calendar day:

    function isSameLocalDay(first, second) {
        return (
            first.getFullYear() ===
            second.getFullYear() &&

            first.getMonth() ===
            second.getMonth() &&

            first.getDate() ===
            second.getDate()
        );
    }

---

# Date Comparison Patterns

## Earlier

    first.getTime() <
    second.getTime()

---

## Later

    first.getTime() >
    second.getTime()

---

## Same Moment

    first.getTime() ===
    second.getTime()

---

## Earlier or Same

    first.getTime() <=
    second.getTime()

---

## Later or Same

    first.getTime() >=
    second.getTime()

---

## In Range

    date.getTime() >= start.getTime() &&
    date.getTime() <= end.getTime()

---

## Future

    date.getTime() > Date.now()

---

## Past

    date.getTime() < Date.now()

---

## Expired

    Date.now() >= expiresAt.getTime()

---

## Active Interval

    now >= start &&
    now < end

---

# Practical Examples

## Приклад 1 — яка дата раніше

    const first = new Date(
        "2026-01-10"
    );

    const second = new Date(
        "2026-02-10"
    );

    if (first < second) {
        console.log(
            "first is earlier"
        );
    }

---

## Приклад 2 — яка дата пізніше

    const first = new Date(
        "2026-03-10"
    );

    const second = new Date(
        "2026-02-10"
    );

    if (first > second) {
        console.log(
            "first is later"
        );
    }

---

## Приклад 3 — однаковий момент

    const first = new Date(
        "2026-01-01T12:00:00Z"
    );

    const second = new Date(
        "2026-01-01T12:00:00Z"
    );

    if (
        first.getTime() ===
        second.getTime()
    ) {
        console.log(
            "same moment"
        );
    }

---

## Приклад 4 — минула дата

    const date = new Date(
        "2020-01-01"
    );

    if (
        date.getTime() <
        Date.now()
    ) {
        console.log(
            "date is in the past"
        );
    }

---

## Приклад 5 — майбутня дата

    const date = new Date(
        "2030-01-01"
    );

    if (
        date.getTime() >
        Date.now()
    ) {
        console.log(
            "date is in the future"
        );
    }

---

## Приклад 6 — дата в діапазоні

    const start = new Date(
        "2026-01-01"
    );

    const end = new Date(
        "2026-01-31"
    );

    const date = new Date(
        "2026-01-15"
    );

    const isInRange =
        date >= start &&
        date <= end;

    console.log(isInRange);

Результат:

    true

---

## Приклад 7 — дата поза діапазоном

    const start = new Date(
        "2026-01-01"
    );

    const end = new Date(
        "2026-01-31"
    );

    const date = new Date(
        "2026-02-15"
    );

    const isOutside =
        date < start ||
        date > end;

    console.log(isOutside);

Результат:

    true

---

## Приклад 8 — різниця між датами

    const first = new Date(
        "2026-01-01"
    );

    const second = new Date(
        "2026-01-10"
    );

    const difference =
        second.getTime() -
        first.getTime();

    console.log(difference);

---

## Приклад 9 — абсолютна різниця

    const first = new Date(
        "2026-01-10"
    );

    const second = new Date(
        "2026-01-01"
    );

    const difference = Math.abs(
        first.getTime() -
        second.getTime()
    );

---

## Приклад 10 — різниця в днях

    const first = new Date(
        "2026-01-01"
    );

    const second = new Date(
        "2026-01-10"
    );

    const difference =
        second.getTime() -
        first.getTime();

    const days =
        difference /
        (1000 * 60 * 60 * 24);

    console.log(days);

Результат:

    9

---

## Приклад 11 — expiration

    const expiresAt = new Date(
        "2030-01-01T00:00:00Z"
    );

    const isExpired =
        Date.now() >=
        expiresAt.getTime();

    console.log(isExpired);

---

## Приклад 12 — active interval

    const startsAt = new Date(
        "2030-01-01T10:00:00Z"
    );

    const endsAt = new Date(
        "2030-01-01T12:00:00Z"
    );

    const now = new Date();

    const isActive =
        now >= startsAt &&
        now < endsAt;

---

## Приклад 13 — сортування дат

    const dates = [
        new Date("2026-03-01"),
        new Date("2026-01-01"),
        new Date("2026-02-01")
    ];

    dates.sort(
        (first, second) =>
            first.getTime() -
            second.getTime()
    );

---

## Приклад 14 — reverse sorting

    dates.sort(
        (first, second) =>
            second.getTime() -
            first.getTime()
    );

---

## Приклад 15 — найраніша дата

    const first = new Date(
        "2026-03-01"
    );

    const second = new Date(
        "2026-01-01"
    );

    const earliest =
        first < second
            ? first
            : second;

---

## Приклад 16 — найпізніша дата

    const latest =
        first > second
            ? first
            : second;

---

## Приклад 17 — same day

    function isSameDay(first, second) {
        return (
            first.getFullYear() ===
            second.getFullYear() &&

            first.getMonth() ===
            second.getMonth() &&

            first.getDate() ===
            second.getDate()
        );
    }

---

## Приклад 18 — same UTC day

    function isSameUTCDay(first, second) {
        return (
            first.getUTCFullYear() ===
            second.getUTCFullYear() &&

            first.getUTCMonth() ===
            second.getUTCMonth() &&

            first.getUTCDate() ===
            second.getUTCDate()
        );
    }

---

## Приклад 19 — before

    function isBefore(first, second) {
        return (
            first.getTime() <
            second.getTime()
        );
    }

---

## Приклад 20 — after

    function isAfter(first, second) {
        return (
            first.getTime() >
            second.getTime()
        );
    }

---

## Приклад 21 — same moment

    function isSameMoment(first, second) {
        return (
            first.getTime() ===
            second.getTime()
        );
    }

---

## Приклад 22 — compare

    function compareDates(first, second) {
        const firstTime =
            first.getTime();

        const secondTime =
            second.getTime();

        if (firstTime < secondTime) {
            return -1;
        }

        if (firstTime > secondTime) {
            return 1;
        }

        return 0;
    }

---

# Типові помилки

❌ Порівнювати два `Date` через `===`.

    first === second

Це порівняння references.

Правильно:

    first.getTime() ===
    second.getTime()

---

❌ Плутати same moment і same day.

    same moment
        ≠
    same calendar day

Наприклад:

    2026-09-24 10:00
    2026-09-24 18:00

Це один календарний день, але два різні моменти.

---

❌ Ігнорувати timezone.

Два local date/time значення можуть представляти різні моменти.

Для точного порівняння моментів важливо розуміти timezone та offset.

---

❌ Порівнювати невалідні дати.

    const date =
        new Date("invalid");

    date.getTime();

дасть:

    NaN

Тому перед порівнянням потрібно перевіряти валідність.

---

❌ Забувати про `NaN`.

Порівняння з `NaN` поводиться не так, як звичайне число:

    NaN < 10
        → false

    NaN > 10
        → false

    NaN === 10
        → false

---

❌ Неправильно визначати межі діапазону.

Наприклад:

    date > start &&
    date < end

не включає `start` та `end`.

А:

    date >= start &&
    date <= end

включає обидві межі.

---

❌ Порівнювати тільки month без year.

Наприклад:

    first.getMonth() ===
    second.getMonth()

не означає, що дати знаходяться в одному календарному місяці.

Потрібно також порівнювати year.

---

❌ Використовувати `Date.now()` декілька разів для одного логічного порівняння.

Краще:

    const now = Date.now();

    // використовувати now

замість багаторазового:

    Date.now()

якщо важливо, щоб усі перевірки використовували один і той самий момент.

---

❌ Перетворювати дати в довільні strings перед порівнянням.

Краще спочатку чітко визначити:

    instant
    calendar date
    local time
    UTC time

і тільки потім виконувати порівняння.

---

# Date Comparison Patterns

## Before

    first < second

або:

    first.getTime() <
    second.getTime()

---

## After

    first > second

---

## Same Moment

    first.getTime() ===
    second.getTime()

---

## Before or Same

    first <= second

---

## After or Same

    first >= second

---

## Past

    date.getTime() <
    Date.now()

---

## Future

    date.getTime() >
    Date.now()

---

## Range

    date >= start &&
    date <= end

---

## Exclusive Range

    date > start &&
    date < end

---

## Half-Open Range

    date >= start &&
    date < end

---

## Difference

    second.getTime() -
    first.getTime()

---

## Absolute Difference

    Math.abs(
        second.getTime() -
        first.getTime()
    )

---

# Date Comparison in Real Applications

Порівняння дат часто використовується для:

    expiration
    events
    appointments
    deadlines
    schedules
    bookings
    sessions
    notifications
    logs
    createdAt
    updatedAt
    publishedAt
    deletedAt
    startAt
    endAt

Наприклад:

    createdAt
        ↓
    updatedAt

можна перевірити:

    updatedAt >= createdAt

---

# createdAt vs updatedAt

Типова модель:

    const createdAt = new Date(
        "2026-01-01T10:00:00Z"
    );

    const updatedAt = new Date(
        "2026-01-01T12:00:00Z"
    );

    const isValid =
        updatedAt >= createdAt;

---

# Deadline

    const deadline = new Date(
        "2026-12-31T23:59:59Z"
    );

    const isOverdue =
        Date.now() >
        deadline.getTime();

---

# Deadline Not Reached

    const hasTime =
        Date.now() <
        deadline.getTime();

---

# Event

    const startsAt = new Date(
        "2026-12-01T10:00:00Z"
    );

    const endsAt = new Date(
        "2026-12-01T12:00:00Z"
    );

    const now = new Date();

    const isUpcoming =
        now < startsAt;

    const isFinished =
        now >= endsAt;

    const isActive =
        now >= startsAt &&
        now < endsAt;

---

# Date Comparison and Business Logic

У реальних застосунках потрібно спочатку визначити, що саме означає "порівняти дату".

Наприклад:

    "Чи подія вже почалася?"

це:

    now >= startsAt

А:

    "Чи дві події відбуваються в один календарний день?"

це вже не просте:

    date1 === date2

Потрібно визначити:

    local day
    або
    UTC day
    або
    конкретна timezone

---

# Instant vs Calendar Date

Це одна з найважливіших концепцій.

## Instant

Конкретний момент:

    2026-09-24T12:00:00Z

Для нього можна використовувати:

    Date
    timestamp

---

## Calendar Date

Наприклад:

    2026-09-24

Тут може бути неважливим конкретний час.

Це вже інша domain concept.

---

## Local Date/Time

Наприклад:

    2026-09-24 15:00

Тут значення залежить від timezone.

---

# Порівняння різних понять

    same instant
        ↓
    getTime()

    same local day
        ↓
    year + month + date

    same UTC day
        ↓
    UTC year + UTC month + UTC date

    date in range
        ↓
    timestamp comparison

---

# Питання зі співбесіди

Що таке порівняння дат?

Як JavaScript порівнює два `Date` через `<` та `>`?

Чому:

    new Date("2026-01-01") ===
    new Date("2026-01-01")

повертає `false`?

Як правильно перевірити, чи два `Date` представляють один момент?

Що повертає `getTime()`?

Що таке timestamp?

У яких одиницях вимірюється timestamp?

Як перевірити, чи дата в минулому?

Як перевірити, чи дата в майбутньому?

Як перевірити, чи дата вже expired?

Як перевірити, чи дата знаходиться в діапазоні?

Яка різниця між:

    >
    >=

та:

    <
    <=

Що таке inclusive range?

Що таке exclusive range?

Що таке half-open interval?

Чому важливо визначати межі date range?

Як знайти різницю між двома датами?

У яких одиницях повертається різниця timestamp?

Як отримати різницю в днях?

Як отримати абсолютну різницю між датами?

Як відсортувати масив дат?

Як знайти найранішу дату?

Як знайти найпізнішу дату?

Як порівняти дату з `Date.now()`?

Що відбудеться при порівнянні `Invalid Date`?

Що таке `NaN` у контексті `Date`?

Як перевірити валідність `Date` перед порівнянням?

Чим відрізняється same moment від same day?

Як перевірити, чи дві дати в одному календарному дні?

Чому для same month потрібно порівнювати також year?

Як timezone впливає на порівняння дат?

Чи можуть два різні ISO strings представляти один момент?

Що означає:

    Z

в ISO string?

Що таке timestamp comparison?

Чому для складної date logic важливо визначити, чи працюємо ми з:

    instant
    calendar date
    local time
    UTC time

---

# Шлях

## 🟢 Core (обов'язково знати)

Розуміння `Date`.

Розуміння timestamp.

Розуміння:

    getTime()

Порівняння:

    <
    >
    <=
    >=

Порівняння однакових моментів:

    getTime() === getTime()

Розуміння різниці між:

    Date object
    timestamp
    reference

Порівняння з:

    Date.now()

Перевірка:

    past
    future

Різниця між датами.

Milliseconds.

Базовий date range.

Inclusive range.

Exclusive range.

Перевірка валідності дат.

Розуміння `Invalid Date`.

---

## 🔵 Junior

Впевнене використання:

    getTime()
    Date.now()

Порівняння:

    before
    after
    same

Перевірка:

    past
    future
    expired

Робота з:

    date ranges
    deadlines
    event intervals

Сортування масиву дат.

Пошук:

    earliest date
    latest date

Обчислення:

    difference in milliseconds
    difference in seconds
    difference in minutes
    difference in hours
    difference in days

Розуміння:

    same moment
    same day

Розуміння local vs UTC.

Врахування timezone під час порівняння.

Робота з API date values.

---

## 🟠 Middle

Глибше розуміння:

    instant
    calendar date
    local date/time
    UTC date/time

Timezone-aware comparison.

Робота з:

    event intervals
    expiration
    deadlines
    schedules
    appointments

Розуміння:

    inclusive intervals
    exclusive intervals
    half-open intervals

Порівняння UTC calendar dates.

Порівняння local calendar dates.

Обробка invalid dates.

Надійні comparison functions.

Сортування та пошук у масивах дат.

Розуміння DST при date arithmetic та range logic.

Проєктування date/time domain logic для frontend/backend.

---

## 🔴 Senior

Глибоке розуміння:

    instant
    calendar date
    wall-clock time
    timezone

Timezone-aware business logic.

DST transitions.

Calendar boundaries.

Distributed systems and time.

Client/server timezone differences.

Database timestamp semantics.

Event intervals.

Temporal semantics.

Надійне моделювання:

    createdAt
    updatedAt
    startsAt
    endsAt
    expiresAt
    publishedAt

Розуміння, коли не можна використовувати простий:

    Date

для domain-level calendar logic.

Використання сучасних time APIs, зокрема:

    Temporal

для чіткого розділення:

    Instant
    PlainDate
    PlainTime
    PlainDateTime
    ZonedDateTime

---

# Міні-шпаргалка

## Before

    first.getTime() <
    second.getTime()

---

## After

    first.getTime() >
    second.getTime()

---

## Same Moment

    first.getTime() ===
    second.getTime()

---

## Past

    date.getTime() <
    Date.now()

---

## Future

    date.getTime() >
    Date.now()

---

## Inclusive Range

    date >= start &&
    date <= end

---

## Exclusive Range

    date > start &&
    date < end

---

## Half-Open Range

    date >= start &&
    date < end

---

## Difference

    second.getTime() -
    first.getTime()

---

## Absolute Difference

    Math.abs(
        second.getTime() -
        first.getTime()
    )

---

## Valid Date

    !Number.isNaN(
        date.getTime()
    )

---

## Sort Ascending

    dates.sort(
        (a, b) =>
            a.getTime() -
            b.getTime()
    );

---

## Sort Descending

    dates.sort(
        (a, b) =>
            b.getTime() -
            a.getTime()
    );

---

## Same Day

    first.getFullYear() ===
    second.getFullYear()

    &&
    
    first.getMonth() ===
    second.getMonth()

    &&

    first.getDate() ===
    second.getDate()

---

## Same UTC Day

    first.getUTCFullYear() ===
    second.getUTCFullYear()

    &&

    first.getUTCMonth() ===
    second.getUTCMonth()

    &&

    first.getUTCDate() ===
    second.getUTCDate()

---

# Основна модель

    Date
      ↓
    getTime()
      ↓
    timestamp
      ↓
    comparison

---

# Comparison Model

    first
      ↓
    timestamp

    second
      ↓
    timestamp

    timestamp
      ↓
    compare

        <
        >
        ===
        <=
        >=

---

# Range Model

    start
      ↓
    ├──────────────────┤
    date               end
      ↓
    check condition

Inclusive:

    start <= date <= end

Exclusive:

    start < date < end

Half-open:

    start <= date < end

---

# Time Model

    Date
      ↓
    moment
      ↓
    timestamp
      ↓
    milliseconds

Для календарного порівняння:

    Date
      ↓
    year
    month
    day

Для UTC:

    UTC year
    UTC month
    UTC day

---

# Головне:

• Для порівняння моментів часу найзручніше мислити через timestamp.

• `getTime()` повертає timestamp у milliseconds.

• `first < second` означає, що `first` відбувається раніше.

• `first > second` означає, що `first` відбувається пізніше.

• Для однакових моментів використовуй:

    first.getTime() ===
    second.getTime()

• Не використовуй `===` безпосередньо між двома `Date` objects для перевірки однакового моменту.

• `Date` — object, тому `===` порівнює references.

• Timestamp — number, тому його можна порівнювати як звичайне число.

• Для перевірки минулого:

    date.getTime() < Date.now()

• Для перевірки майбутнього:

    date.getTime() > Date.now()

• Для expiration:

    Date.now() >=
    expiresAt.getTime()

• Для date range спочатку потрібно визначити, чи межі включені.

• Inclusive range:

    start <= date <= end

• Exclusive range:

    start < date < end

• Half-open interval:

    start <= date < end

• Різниця між timestamp дає milliseconds:

    second.getTime() -
    first.getTime()

• Для абсолютної різниці:

    Math.abs(...)

• `Invalid Date` має timestamp:

    NaN

• Перед складним порівнянням потрібно перевіряти валідність дат.

• `same moment` і `same calendar day` — різні поняття.

• Для same moment:

    getTime()

• Для same local day:

    getFullYear()
    getMonth()
    getDate()

• Для same UTC day:

    getUTCFullYear()
    getUTCMonth()
    getUTCDate()

• Timezone потрібно враховувати, коли логіка працює з календарними днями або local time.

• Два різні ISO strings можуть представляти один момент:

    2026-09-24T12:00:00Z

    2026-09-24T15:00:00+03:00

• Для порівняння вони можуть мати однаковий timestamp.

• При роботі з API потрібно розуміти, чи значення означає:

    instant
    calendar date
    local date/time
    UTC date/time

• Типові full-stack поля:

    createdAt
    updatedAt
    startsAt
    endsAt
    expiresAt
    publishedAt

часто представляють моменти часу, які зручно порівнювати через timestamp.

• Для сортування дат використовується comparator:

    dates.sort(
        (a, b) =>
            a.getTime() -
            b.getTime()
    );

• Порівняння дат — це не тільки питання операторів `<` і `>`.

Потрібно спочатку визначити:

    Що саме ми порівнюємо?

    moment?
    calendar day?
    local time?
    UTC time?
    date range?

• Основна модель:

    Date
      ↓
    timestamp
      ↓
    comparison

• Для наступної теми:

    03-date-arithmetic

потрібно перейти від питання:

    "Яка дата раніше?"

до:

    "Як змінити дату або обчислити нову дату?"