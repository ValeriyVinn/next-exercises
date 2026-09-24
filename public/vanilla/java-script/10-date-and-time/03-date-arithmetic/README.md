# 03. Date Arithmetic

Робота з арифметикою дат у JavaScript — це обчислення моментів часу, додавання та віднімання часу, визначення різниці між датами, отримання майбутніх і минулих дат.

Головна ідея:

> `Date` зберігає момент часу як кількість мілісекунд від Unix Epoch, тому для точної арифметики можна працювати з timestamp.

---

# 1. Що потрібно знати перед Date Arithmetic

Основні інструменти:

- `Date`
- `getTime()`
- `Date.now()`
- `setTime()`
- `setDate()`
- `setMonth()`
- `setFullYear()`
- `setHours()`
- `setMinutes()`
- `setSeconds()`
- `setMilliseconds()`
- `getDate()`
- `getMonth()`
- `getFullYear()`
- `getHours()`
- `getMinutes()`
- `getSeconds()`
- `getMilliseconds()`

Також важливо розуміти одиниці часу:

- 1 секунда = `1000` мс
- 1 хвилина = `60 000` мс
- 1 година = `3 600 000` мс
- 1 доба = `86 400 000` мс

Але:

> `24 години` не завжди дорівнюють `1 календарній добі` в локальному часовому поясі через переходи на літній/зимовий час.

---

# 2. Timestamp

JavaScript `Date` представляє момент часу числом — кількістю мілісекунд від:

`1970-01-01T00:00:00.000Z`

Отримати timestamp:

    const date = new Date();

    console.log(date.getTime());

Приклад:

    const date = new Date("2026-09-24T12:00:00Z");

    console.log(date.getTime());

Timestamp — це число, тому з ним можна виконувати арифметичні операції.

---

# 3. Мілісекунди як основа арифметики

Створимо кілька констант:

    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;

Тепер:

    console.log(SECOND); // 1000
    console.log(MINUTE); // 60000
    console.log(HOUR);   // 3600000
    console.log(DAY);    // 86400000

Це зручно для простих обчислень.

---

# 4. Додавання часу через timestamp

Можна отримати timestamp, додати потрібну кількість мілісекунд і створити новий `Date`.

Наприклад, додати 1 годину:

    const date = new Date();

    const oneHourLater = new Date(
      date.getTime() + 60 * 60 * 1000
    );

    console.log(date);
    console.log(oneHourLater);

Або:

    const HOUR = 60 * 60 * 1000;

    const oneHourLater = new Date(
      date.getTime() + HOUR
    );

---

# 5. Віднімання часу через timestamp

Так само можна відняти час.

Наприклад, 2 години тому:

    const date = new Date();

    const twoHoursAgo = new Date(
      date.getTime() - 2 * 60 * 60 * 1000
    );

---

# 6. Додавання секунд

    const date = new Date();

    const future = new Date(
      date.getTime() + 30 * 1000
    );

Тут:

- `1000` — одна секунда
- `30 * 1000` — 30 секунд

---

# 7. Додавання хвилин

    const date = new Date();

    const future = new Date(
      date.getTime() + 15 * 60 * 1000
    );

15 хвилин:

`15 × 60 × 1000`

---

# 8. Додавання годин

    const date = new Date();

    const future = new Date(
      date.getTime() + 3 * 60 * 60 * 1000
    );

---

# 9. Додавання днів через timestamp

Для простих випадків:

    const date = new Date();

    const tomorrow = new Date(
      date.getTime() + 24 * 60 * 60 * 1000
    );

Це додає рівно `86 400 000` мілісекунд.

Але тут є важливе обмеження.

---

# 10. 24 години ≠ завжди наступний календарний день

У локальному часовому поясі переходи між стандартним і літнім часом можуть створити день тривалістю не рівно 24 години.

Тому для календарної операції:

> "завтра"

краще використовувати `setDate()`.

    const date = new Date();

    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);

Тут ми говоримо не:

> додай 24 години

а:

> перейди на наступний календарний день.

Це важлива різниця.

---

# 11. `setDate()` для роботи з днями

`setDate()` змінює день місяця.

    const date = new Date("2026-09-24");

    date.setDate(date.getDate() + 1);

    console.log(date);

Отримаємо дату наступного календарного дня.

---

# 12. Віднімання дня через `setDate()`

    const date = new Date("2026-09-24");

    date.setDate(date.getDate() - 1);

    console.log(date);

Результат — попередній календарний день.

---

# 13. Автоматичний перехід між місяцями

JavaScript сам коректно переходить між місяцями.

    const date = new Date(2026, 8, 30);

    date.setDate(date.getDate() + 1);

    console.log(date);

`8` — це вересень, тому результат буде 1 жовтня.

Пам'ятай:

> У JavaScript `getMonth()` та `setMonth()` використовують місяці від `0` до `11`.

---

# 14. Перехід через кінець року

    const date = new Date(2026, 11, 31);

    date.setDate(date.getDate() + 1);

    console.log(date);

Результат:

    2027-01-01

JavaScript автоматично переносить дату в наступний рік.

---

# 15. Додавання місяців

Для календарної арифметики можна використовувати `setMonth()`.

    const date = new Date(2026, 8, 24);

    date.setMonth(date.getMonth() + 1);

    console.log(date);

Дата переходить на наступний місяць.

---

# 16. Віднімання місяців

    const date = new Date(2026, 8, 24);

    date.setMonth(date.getMonth() - 1);

    console.log(date);

---

# 17. Додавання років

    const date = new Date(2026, 8, 24);

    date.setFullYear(date.getFullYear() + 1);

    console.log(date);

---

# 18. Віднімання років

    const date = new Date(2026, 8, 24);

    date.setFullYear(date.getFullYear() - 1);

    console.log(date);

---

# 19. Додавання годин через `setHours()`

    const date = new Date();

    date.setHours(date.getHours() + 2);

    console.log(date);

JavaScript автоматично переходить на наступну добу, якщо це необхідно.

---

# 20. Додавання хвилин

    const date = new Date();

    date.setMinutes(date.getMinutes() + 30);

---

# 21. Додавання секунд

    const date = new Date();

    date.setSeconds(date.getSeconds() + 45);

---

# 22. Додавання мілісекунд

    const date = new Date();

    date.setMilliseconds(
      date.getMilliseconds() + 500
    );

---

# 23. Важлива властивість Date: методи `set...()` змінюють об'єкт

Це дуже важливо.

    const date = new Date("2026-09-24");

    date.setDate(date.getDate() + 1);

    console.log(date);

Початковий `date` був змінений.

Тому:

    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);

краще, якщо потрібно зберегти початкову дату.

---

# 24. Копіювання Date

Для створення копії:

    const original = new Date();

    const copy = new Date(original);

Тепер це два різні об'єкти.

Зміна `copy` не змінить `original`.

    copy.setDate(copy.getDate() + 1);

    console.log(original);
    console.log(copy);

---

# 25. Арифметика без зміни оригінальної дати

Хороший практичний шаблон:

    function addDays(date, days) {
      const result = new Date(date);

      result.setDate(result.getDate() + days);

      return result;
    }

Використання:

    const date = new Date("2026-09-24");

    const future = addDays(date, 7);

    console.log(date);
    console.log(future);

Оригінальний `date` не змінюється.

---

# 26. Функція `addHours()`

    function addHours(date, hours) {
      const result = new Date(date);

      result.setHours(result.getHours() + hours);

      return result;
    }

Використання:

    const date = new Date();

    const future = addHours(date, 3);

---

# 27. Функція `addMinutes()`

    function addMinutes(date, minutes) {
      const result = new Date(date);

      result.setMinutes(
        result.getMinutes() + minutes
      );

      return result;
    }

---

# 28. Функція `addMonths()`

    function addMonths(date, months) {
      const result = new Date(date);

      result.setMonth(
        result.getMonth() + months
      );

      return result;
    }

---

# 29. Функція `addYears()`

    function addYears(date, years) {
      const result = new Date(date);

      result.setFullYear(
        result.getFullYear() + years
      );

      return result;
    }

---

# 30. Різниця між двома датами

Найпростіший спосіб:

    const start = new Date("2026-09-20");
    const end = new Date("2026-09-24");

    const difference =
      end.getTime() - start.getTime();

    console.log(difference);

Результат — кількість мілісекунд між двома моментами.

---

# 31. Різниця в секундах

    const differenceMs =
      end.getTime() - start.getTime();

    const differenceSeconds =
      differenceMs / 1000;

---

# 32. Різниця в хвилинах

    const differenceMinutes =
      differenceMs / (1000 * 60);

---

# 33. Різниця в годинах

    const differenceHours =
      differenceMs / (1000 * 60 * 60);

---

# 34. Різниця в днях

    const differenceDays =
      differenceMs / (1000 * 60 * 60 * 24);

Для простих timestamp-обчислень це нормально.

Але:

> Для календарної різниці локальних дат не завжди правильно ділити timestamp-різницю на `24 * 60 * 60 * 1000`.

Причина — часові пояси та переходи на літній/зимовий час.

---

# 35. Ціла кількість днів

Якщо потрібна кількість повних днів:

    const differenceMs =
      end.getTime() - start.getTime();

    const differenceDays =
      Math.floor(
        differenceMs / (1000 * 60 * 60 * 24)
      );

Наприклад:

    const start = new Date("2026-09-20T10:00:00Z");
    const end = new Date("2026-09-24T15:00:00Z");

    const days = Math.floor(
      (end - start) / (1000 * 60 * 60 * 24)
    );

---

# 36. `Date` можна віднімати без `getTime()`

При арифметичних операціях JavaScript автоматично перетворює `Date` на timestamp.

Тому:

    const difference = date2 - date1;

еквівалентно:

    const difference =
      date2.getTime() - date1.getTime();

Але для навчального та прикладного коду часто зрозуміліше явно писати `getTime()`.

---

# 37. Додатна, від'ємна та нульова різниця

    const difference =
      date2.getTime() - date1.getTime();

Якщо:

    difference > 0

`date2` пізніше.

Якщо:

    difference < 0

`date2` раніше.

Якщо:

    difference === 0

обидві дати представляють той самий момент.

---

# 38. Визначення майбутньої дати

    const date = new Date();

    date.setDate(date.getDate() + 7);

Тепер `date` — дата через 7 календарних днів.

---

# 39. Визначення минулої дати

    const date = new Date();

    date.setDate(date.getDate() - 7);

---

# 40. Дата через N днів

Універсальна функція:

    function addDays(date, days) {
      const result = new Date(date);

      result.setDate(result.getDate() + days);

      return result;
    }

Використання:

    const today = new Date();

    const afterTenDays = addDays(today, 10);

---

# 41. Дата N днів тому

    const tenDaysAgo = addDays(today, -10);

Тобто одна функція може працювати в обидва боки.

---

# 42. Дата через N годин

    function addHours(date, hours) {
      const result = new Date(date);

      result.setHours(result.getHours() + hours);

      return result;
    }

---

# 43. Дата через N хвилин

    function addMinutes(date, minutes) {
      const result = new Date(date);

      result.setMinutes(
        result.getMinutes() + minutes
      );

      return result;
    }

---

# 44. Дата через N місяців

    function addMonths(date, months) {
      const result = new Date(date);

      result.setMonth(
        result.getMonth() + months
      );

      return result;
    }

---

# 45. Дата через N років

    function addYears(date, years) {
      const result = new Date(date);

      result.setFullYear(
        result.getFullYear() + years
      );

      return result;
    }

---

# 46. Проблема додавання місяців

Місяці мають різну кількість днів.

Наприклад:

    const date = new Date(2026, 0, 31);

    date.setMonth(date.getMonth() + 1);

Не варто автоматично очікувати:

    2026-02-28

JavaScript виконує календарну нормалізацію компонентів дати, і результат може перейти вже в березень.

Тому операції з місяцями потребують особливої уваги.

---

# 47. Проблема високосного року

Наприклад:

    const date = new Date(2024, 1, 29);

2024 — високосний рік.

Якщо змінювати рік:

    date.setFullYear(2025);

потрібно пам'ятати, що 29 лютого 2025 року не існує.

JavaScript нормалізує таку дату автоматично.

---

# 48. Додавання календарного дня vs додавання 24 годин

Це два різні поняття.

### Додати 24 години

    const result = new Date(
      date.getTime() + 24 * 60 * 60 * 1000
    );

### Додати один календарний день

    const result = new Date(date);

    result.setDate(result.getDate() + 1);

Перший варіант працює з точною тривалістю.

Другий — з календарем.

---

# 49. Коли використовувати timestamp arithmetic

Timestamp зручний для:

- точних інтервалів;
- таймерів;
- тривалості;
- timeout;
- вимірювання часу;
- порівняння моментів;
- додавання секунд/мілісекунд;
- серверної логіки.

Наприклад:

    const expiresAt =
      Date.now() + 30 * 60 * 1000;

Це момент через 30 хвилин.

---

# 50. Коли використовувати `setDate()`

`setDate()` краще підходить для календарних операцій:

- завтра;
- через 7 календарних днів;
- попередній день;
- наступний день;
- календарний тиждень.

Наприклад:

    const tomorrow = new Date();

    tomorrow.setDate(
      tomorrow.getDate() + 1
    );

---

# 51. Коли використовувати `setMonth()`

Для календарних операцій з місяцями:

    const nextMonth = new Date();

    nextMonth.setMonth(
      nextMonth.getMonth() + 1
    );

Але потрібно пам'ятати про різну кількість днів у місяцях.

---

# 52. Коли використовувати `setFullYear()`

Для зміни календарного року:

    const nextYear = new Date();

    nextYear.setFullYear(
      nextYear.getFullYear() + 1
    );

---

# 53. Отримання початку дня

Для локального часу:

    const startOfDay = new Date();

    startOfDay.setHours(0, 0, 0, 0);

Тепер час:

    00:00:00.000

---

# 54. Отримання кінця дня

Один із варіантів:

    const endOfDay = new Date();

    endOfDay.setHours(23, 59, 59, 999);

Але для перевірки діапазонів часто краще використовувати початок наступного дня.

---

# 55. Початок наступного дня

    const nextDay = new Date();

    nextDay.setHours(0, 0, 0, 0);
    nextDay.setDate(nextDay.getDate() + 1);

Це дуже корисний підхід для діапазонів.

---

# 56. Інтервал `[start, end)`

У програмуванні дуже часто використовується напіввідкритий інтервал:

    start <= date < end

Наприклад:

    const start = new Date("2026-09-24T00:00:00");
    const end = new Date("2026-09-25T00:00:00");

    const isInDay =
      date >= start &&
      date < end;

Це означає:

> дата належить 24 вересня, але не належить початку 25 вересня.

---

# 57. Чому `[start, end)` зручний

Такий підхід дозволяє не використовувати:

    23:59:59.999

Замість цього:

    start <= date < nextStart

Наприклад:

    2026-09-24 00:00
    <= date <
    2026-09-25 00:00

Це особливо зручно для:

- календарів;
- статистики;
- SQL-запитів;
- фільтрації;
- логів;
- API;
- часових інтервалів.

---

# 58. Початок тижня

JavaScript не має вбудованого універсального `startOfWeek()` у `Date`, тому можна створити власну функцію.

Наприклад, якщо тиждень починається з понеділка:

    function startOfWeek(date) {
      const result = new Date(date);

      const day = result.getDay();

      const diff = day === 0 ? -6 : 1 - day;

      result.setDate(result.getDate() + diff);
      result.setHours(0, 0, 0, 0);

      return result;
    }

`getDay()`:

- `0` — неділя
- `1` — понеділок
- ...
- `6` — субота

---

# 59. Початок місяця

    function startOfMonth(date) {
      const result = new Date(date);

      result.setDate(1);
      result.setHours(0, 0, 0, 0);

      return result;
    }

---

# 60. Початок року

    function startOfYear(date) {
      const result = new Date(date);

      result.setMonth(0);
      result.setDate(1);
      result.setHours(0, 0, 0, 0);

      return result;
    }

---

# 61. Кінець місяця

Один із зручних прийомів:

> взяти перший день наступного місяця і відняти 1 мілісекунду.

    function endOfMonth(date) {
      const result = new Date(date);

      result.setMonth(result.getMonth() + 1);
      result.setDate(0);
      result.setHours(23, 59, 59, 999);

      return result;
    }

Але для логіки діапазонів часто краще використовувати:

    startOfMonth <= date < startOfNextMonth

замість явного `endOfMonth`.

---

# 62. Різниця між двома моментами

Створимо функцію:

    function differenceInMilliseconds(start, end) {
      return end.getTime() - start.getTime();
    }

---

# 63. Різниця в секундах

    function differenceInSeconds(start, end) {
      return (
        end.getTime() - start.getTime()
      ) / 1000;
    }

---

# 64. Різниця в хвилинах

    function differenceInMinutes(start, end) {
      return (
        end.getTime() - start.getTime()
      ) / (1000 * 60);
    }

---

# 65. Різниця в годинах

    function differenceInHours(start, end) {
      return (
        end.getTime() - start.getTime()
      ) / (1000 * 60 * 60);
    }

---

# 66. Різниця в днях

    function differenceInDays(start, end) {
      return (
        end.getTime() - start.getTime()
      ) / (1000 * 60 * 60 * 24);
    }

Це різниця між моментами часу, а не обов'язково кількість календарних дат.

---

# 67. Округлення різниці

Іноді потрібна ціла кількість днів.

    const days = Math.floor(
      differenceInDays(start, end)
    );

Інші варіанти:

    Math.ceil(value);

    Math.round(value);

Потрібно вибирати округлення залежно від задачі.

---

# 68. Повні години між датами

    const hours = Math.floor(
      (end.getTime() - start.getTime()) /
      (1000 * 60 * 60)
    );

Наприклад, це може використовуватися для:

- тривалості сесії;
- часу роботи;
- тривалості події.

---

# 69. Різниця в абсолютному значенні

Якщо напрямок не важливий:

    const difference = Math.abs(
      date1.getTime() - date2.getTime()
    );

Тепер результат завжди невід'ємний.

---

# 70. Абсолютна різниця в днях

    const differenceDays = Math.abs(
      date1.getTime() - date2.getTime()
    ) / (1000 * 60 * 60 * 24);

---

# 71. Перевірка, чи дата прострочена

    const deadline = new Date("2026-09-20");

    const isExpired =
      deadline.getTime() < Date.now();

Якщо `true` — дедлайн уже минув.

---

# 72. Перевірка, чи дата в майбутньому

    const eventDate = new Date("2026-10-01");

    const isFuture =
      eventDate.getTime() > Date.now();

---

# 73. Перевірка терміну дії

Наприклад, токен дійсний до певного моменту:

    const expiresAt = new Date(
      "2026-10-01T12:00:00Z"
    );

    const isValid =
      Date.now() < expiresAt.getTime();

---

# 74. Створення expiration date

Наприклад, термін дії 30 хвилин:

    const expiresAt = new Date(
      Date.now() + 30 * 60 * 1000
    );

---

# 75. Простий countdown

    const target = new Date(
      "2026-10-01T12:00:00Z"
    );

    const remaining =
      target.getTime() - Date.now();

Якщо:

    remaining > 0

час ще залишився.

Якщо:

    remaining <= 0

час завершився.

---

# 76. Перетворення мілісекунд у хвилини

    const remainingMinutes =
      Math.floor(
        remaining / (1000 * 60)
      );

---

# 77. Перетворення мілісекунд у години та хвилини

    const remainingHours =
      Math.floor(
        remaining / (1000 * 60 * 60)
      );

    const remainingMinutes =
      Math.floor(
        (remaining % (1000 * 60 * 60)) /
        (1000 * 60)
      );

---

# 78. Арифметика з `Date.now()`

`Date.now()` повертає timestamp, а не `Date`.

    const now = Date.now();

Тому:

    const tomorrow =
      new Date(now + 24 * 60 * 60 * 1000);

Але для календарного "завтра" краще:

    const tomorrow = new Date();

    tomorrow.setDate(
      tomorrow.getDate() + 1
    );

---

# 79. `setTime()`

`setTime()` встановлює timestamp для існуючого `Date`.

    const date = new Date();

    date.setTime(
      Date.now() + 60 * 60 * 1000
    );

Тепер `date` представляє момент через одну годину.

---

# 80. `setTime()` і timestamp

Наприклад:

    const date = new Date();

    const timestamp =
      Date.now() + 30 * 60 * 1000;

    date.setTime(timestamp);

Це корисно, коли потрібно безпосередньо встановити момент часу.

---

# 81. Арифметика з копією

Хороший загальний шаблон:

    const result = new Date(original);

    result.setDate(
      result.getDate() + days
    );

Це дозволяє уникнути зміни `original`.

---

# 82. Універсальна функція `addDays`

    function addDays(date, days) {
      const result = new Date(date);

      result.setDate(
        result.getDate() + days
      );

      return result;
    }

---

# 83. Універсальна функція `addHours`

    function addHours(date, hours) {
      const result = new Date(date);

      result.setHours(
        result.getHours() + hours
      );

      return result;
    }

---

# 84. Універсальна функція `addMinutes`

    function addMinutes(date, minutes) {
      const result = new Date(date);

      result.setMinutes(
        result.getMinutes() + minutes
      );

      return result;
    }

---

# 85. Універсальна функція `addSeconds`

    function addSeconds(date, seconds) {
      const result = new Date(date);

      result.setSeconds(
        result.getSeconds() + seconds
      );

      return result;
    }

---

# 86. Арифметика та часові пояси

`Date` представляє конкретний момент часу.

Наприклад:

    const date1 = new Date(
      "2026-09-24T10:00:00Z"
    );

    const date2 = new Date(
      "2026-09-24T13:00:00+03:00"
    );

Це той самий момент.

Тому:

    date1.getTime() === date2.getTime();

буде:

    true

---

# 87. Локальний час і календарна арифметика

Методи:

    getFullYear()
    getMonth()
    getDate()
    getHours()
    getMinutes()

працюють у локальному часовому поясі.

Тому:

    date.setDate(
      date.getDate() + 1
    );

є операцією з локальним календарем.

---

# 88. UTC-арифметика

Для UTC існують:

    getUTCFullYear()
    getUTCMonth()
    getUTCDate()
    getUTCHours()
    getUTCMinutes()
    getUTCSeconds()

та:

    setUTCFullYear()
    setUTCMonth()
    setUTCDate()
    setUTCHours()
    setUTCMinutes()
    setUTCSeconds()

Наприклад:

    const date = new Date();

    date.setUTCDate(
      date.getUTCDate() + 1
    );

Це календарна операція в UTC.

---

# 89. Календарна дата vs тривалість

Це одна з найважливіших ідей.

### Тривалість

    24 години
    60 хвилин
    30 секунд

можна розглядати як кількість мілісекунд.

### Календарна операція

    завтра
    наступний місяць
    наступний рік

має працювати з календарними компонентами.

Не потрібно змішувати ці поняття.

---

# 90. Приклад: "через 24 години"

Якщо потрібен саме момент через 24 години:

    const result = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    );

---

# 91. Приклад: "завтра"

Якщо потрібен наступний календарний день:

    const result = new Date();

    result.setDate(
      result.getDate() + 1
    );

---

# 92. Приклад: "через тиждень"

Для календарної операції:

    const result = new Date();

    result.setDate(
      result.getDate() + 7
    );

---

# 93. Приклад: "через 168 годин"

Якщо потрібна саме тривалість:

    const result = new Date(
      Date.now() + 168 * 60 * 60 * 1000
    );

168 годин = 7 × 24 години.

У більшості звичайних ситуацій результат буде близький до "через тиждень", але концептуально це не те саме, що календарна операція.

---

# 94. Перевірка різниці з допуском

Іноді два моменти не повинні збігатися до мілісекунди.

Наприклад, допустима похибка — 1 секунда:

    const tolerance = 1000;

    const isClose =
      Math.abs(
        date1.getTime() - date2.getTime()
      ) <= tolerance;

---

# 95. Перевірка, чи дата в межах N хвилин

    const tolerance = 5 * 60 * 1000;

    const isClose =
      Math.abs(
        date1.getTime() - date2.getTime()
      ) <= tolerance;

---

# 96. Важлива проблема: Invalid Date

Якщо дата некоректна:

    const date = new Date("invalid");

    console.log(date);

отримаємо `Invalid Date`.

Її timestamp:

    console.log(date.getTime());

буде:

    NaN

---

# 97. Перевірка валідності Date

    function isValidDate(date) {
      return (
        date instanceof Date &&
        !Number.isNaN(date.getTime())
      );
    }

---

# 98. Арифметика з Invalid Date

    const date = new Date("invalid");

    const result = new Date(
      date.getTime() + 1000
    );

`date.getTime()` — `NaN`.

Тому результат також буде невалідним.

Перед арифметикою важливих дат потрібно перевіряти вхідні значення.

---

# 99. Типова помилка: змінити оригінальну дату

Не дуже добре:

    function addDays(date, days) {
      date.setDate(date.getDate() + days);

      return date;
    }

Ця функція змінює переданий об'єкт.

Безпечніший варіант:

    function addDays(date, days) {
      const result = new Date(date);

      result.setDate(
        result.getDate() + days
      );

      return result;
    }

---

# 100. Типова помилка: використовувати `24h` для календарного дня

Не завжди правильно:

    const tomorrow = new Date(
      date.getTime() + 24 * 60 * 60 * 1000
    );

Для календарного дня краще:

    const tomorrow = new Date(date);

    tomorrow.setDate(
      tomorrow.getDate() + 1
    );

---

# 101. Типова помилка: забути про нумерацію місяців

У JavaScript:

    January   = 0
    February  = 1
    March     = 2
    ...
    December  = 11

Тому:

    new Date(2026, 8, 24);

це:

    September 24, 2026

а не August.

---

# 102. Типова помилка: плутати день місяця і день тижня

`getDate()`:

    date.getDate();

повертає день місяця:

    1 ... 31

`getDay()`:

    date.getDay();

повертає день тижня:

    0 ... 6

---

# 103. Типова помилка: очікувати, що `setMonth()` просто збереже день

Наприклад:

    const date = new Date(2026, 0, 31);

    date.setMonth(1);

Не можна просто припустити, що результатом буде "31 лютого".

Такої календарної дати не існує.

JavaScript виконає нормалізацію дати.

---

# 104. Типова помилка: змішувати локальний час і UTC

Наприклад:

    date.getDate();

і:

    date.getUTCDate();

можуть повернути різні значення.

Тому під час роботи з часовими поясами потрібно чітко розуміти:

> у якому календарі виконується операція — локальному чи UTC.

---

# 105. Практичний приклад: дата завершення

Припустимо, користувач отримав доступ на 7 календарних днів.

    function createExpirationDate(startDate, days) {
      const expirationDate = new Date(startDate);

      expirationDate.setDate(
        expirationDate.getDate() + days
      );

      return expirationDate;
    }

Використання:

    const start = new Date();

    const expiration =
      createExpirationDate(start, 7);

---

# 106. Практичний приклад: дедлайн

    const deadline = new Date(
      "2026-10-01T18:00:00"
    );

    const isExpired =
      Date.now() >= deadline.getTime();

---

# 107. Практичний приклад: термін дії токена

    function createExpiration(minutes) {
      return new Date(
        Date.now() + minutes * 60 * 1000
      );
    }

    const expiresAt = createExpiration(30);

---

# 108. Практичний приклад: тривалість події

    const start = new Date(
      "2026-09-24T10:00:00"
    );

    const end = new Date(
      "2026-09-24T12:30:00"
    );

    const duration =
      end.getTime() - start.getTime();

    const hours =
      Math.floor(duration / (1000 * 60 * 60));

    const minutes =
      Math.floor(
        (duration % (1000 * 60 * 60)) /
        (1000 * 60)
      );

    console.log(hours);
    console.log(minutes);

Результат:

    2
    30

---

# 109. Практичний приклад: додати 90 хвилин

    const start = new Date();

    const end = new Date(start);

    end.setMinutes(
      end.getMinutes() + 90
    );

---

# 110. Практичний приклад: дата через 30 днів

    const start = new Date();

    const end = new Date(start);

    end.setDate(
      end.getDate() + 30
    );

---

# 111. Практичний приклад: дата через 3 місяці

    const start = new Date();

    const end = new Date(start);

    end.setMonth(
      end.getMonth() + 3
    );

---

# 112. Практичний приклад: дата через рік

    const start = new Date();

    const end = new Date(start);

    end.setFullYear(
      end.getFullYear() + 1
    );

---

# 113. Практичний приклад: скільки часу залишилось

    const deadline = new Date(
      "2026-10-01T18:00:00Z"
    );

    const remaining =
      deadline.getTime() - Date.now();

    if (remaining > 0) {
      console.log("Час ще є");
    } else {
      console.log("Час завершився");
    }

---

# 114. Практичний приклад: хвилини до дедлайну

    const remainingMinutes = Math.floor(
      remaining / (1000 * 60)
    );

---

# 115. Практичний приклад: перевірка терміну

    function isExpired(date) {
      return date.getTime() <= Date.now();
    }

Використання:

    const deadline = new Date(
      "2026-10-01T18:00:00Z"
    );

    console.log(isExpired(deadline));

---

# 116. Практичний приклад: додати робочий день

Проста версія:

    function addBusinessDay(date) {
      const result = new Date(date);

      result.setDate(result.getDate() + 1);

      while (
        result.getDay() === 0 ||
        result.getDay() === 6
      ) {
        result.setDate(result.getDate() + 1);
      }

      return result;
    }

Тут:

- `0` — неділя;
- `6` — субота.

Це вже приклад поєднання календарної арифметики та логіки.

---

# 117. Практичний приклад: додати N робочих днів

    function addBusinessDays(date, days) {
      const result = new Date(date);

      let remaining = days;

      while (remaining > 0) {
        result.setDate(result.getDate() + 1);

        const day = result.getDay();

        if (day !== 0 && day !== 6) {
          remaining--;
        }
      }

      return result;
    }

---

# 118. Практичний приклад: отримати дату через тиждень

    function nextWeek(date) {
      const result = new Date(date);

      result.setDate(
        result.getDate() + 7
      );

      return result;
    }

---

# 119. Практичний приклад: початок наступного дня

    function startOfNextDay(date) {
      const result = new Date(date);

      result.setHours(0, 0, 0, 0);
      result.setDate(result.getDate() + 1);

      return result;
    }

---

# 120. Практичний приклад: перевірка, чи дата сьогодні

Для локального календаря:

    function isToday(date) {
      const now = new Date();

      return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
      );
    }

Це перевіряє саме календарний день у локальному часовому поясі.

---

# 121. Практичний приклад: різниця календарних дат

Якщо потрібно працювати саме з календарними днями, а не з точними моментами, не завжди достатньо:

    (date2 - date1) / 86400000

Для таких задач потрібно спочатку визначити:

- який часовий пояс;
- чи потрібен локальний календар;
- чи потрібен UTC;
- чи важливий час доби.

Це особливо важливо у production-коді.

---

# 122. `Date` Arithmetic і чисті функції

Хороший стиль:

    function addDays(date, days) {
      const result = new Date(date);

      result.setDate(
        result.getDate() + days
      );

      return result;
    }

Така функція:

- не змінює аргумент;
- повертає новий `Date`;
- легко тестується;
- має передбачувану поведінку.

---

# 123. Date Arithmetic у frontend

Типові задачі:

- countdown;
- timer;
- календар;
- дедлайн;
- expiration;
- дата публікації;
- дата завершення курсу;
- фільтр за датою;
- сортування;
- тривалість події.

---

# 124. Date Arithmetic у backend

Типові задачі:

- expiration token;
- session timeout;
- термін дії доступу;
- TTL;
- планування;
- перевірка дедлайнів;
- логування;
- timestamps;
- фільтрація даних;
- SQL-запити за датами.

---

# 125. Date Arithmetic + PostgreSQL

У full-stack застосунках арифметика дат часто розподіляється між JavaScript та PostgreSQL.

Наприклад:

Frontend / backend JavaScript:

    const expiresAt = new Date(
      Date.now() + 30 * 60 * 1000
    );

PostgreSQL має власні засоби роботи з датами:

    CURRENT_TIMESTAMP

    NOW()

    INTERVAL

Тому важливо розуміти:

> JavaScript Date Arithmetic і SQL Date Arithmetic — пов'язані, але це різні інструменти.

---

# 126. Не зберігати дату як форматований текст для арифметики

Не варто робити арифметику над:

    "24.09.2026"

Спочатку потрібно мати нормальне представлення дати:

    const date = new Date(
      "2026-09-24T00:00:00Z"
    );

Після цього можна працювати з timestamp або календарними компонентами.

---

# 127. Основні одиниці

    const SECOND = 1000;

    const MINUTE =
      60 * SECOND;

    const HOUR =
      60 * MINUTE;

    const DAY =
      24 * HOUR;

Цей шаблон корисно запам'ятати.

---

# 128. Timestamp arithmetic — коротко

    const future = new Date(
      date.getTime() + milliseconds
    );

Використовуй для:

- точних тривалостей;
- секунд;
- хвилин;
- годин;
- timeout;
- expiration.

---

# 129. Calendar arithmetic — коротко

    const future = new Date(date);

    future.setDate(
      future.getDate() + days
    );

Використовуй для:

- завтра;
- через N календарних днів;
- наступний місяць;
- наступний рік.

---

# 130. Що потрібно пам'ятати

### `getTime()`

Повертає timestamp у мілісекундах.

### `Date.now()`

Повертає поточний timestamp.

### `setTime()`

Встановлює timestamp.

### `setDate()`

Змінює календарний день.

### `setMonth()`

Змінює календарний місяць.

### `setFullYear()`

Змінює календарний рік.

### `setHours()`

Змінює локальну годину.

### `setMinutes()`

Змінює хвилини.

### `setSeconds()`

Змінює секунди.

---

# 131. Головна концепція

Не думай про `Date` лише як про:

    день / місяць / рік

Для JavaScript:

    Date
      ↓
    конкретний момент часу
      ↓
    timestamp
      ↓
    milliseconds

А вже потім цей момент можна представити як:

- локальну дату;
- UTC;
- дату + час;
- календарний день.

---

# 132. Типовий алгоритм роботи з датою

Перед арифметикою запитай себе:

1. Мені потрібен момент часу чи календарна дата?
2. Потрібна точна тривалість чи календарна операція?
3. Який часовий пояс використовується?
4. Чи можна змінювати початковий `Date`?
5. Чи може дата бути `Invalid Date`?
6. Чи потрібні повні дні, години або хвилини?
7. Чи враховуються переходи між місяцями/роками?
8. Чи потрібна локальна дата чи UTC?

---

# 133. Типові помилки

### Помилка 1

Додавати `24h` замість календарного дня.

    date.getTime() + 24 * 60 * 60 * 1000

Не завжди підходить для "завтра".

---

### Помилка 2

Змінювати оригінальний `Date`.

    date.setDate(date.getDate() + 1);

Якщо це небажано — спочатку створити копію.

---

### Помилка 3

Забути, що місяці починаються з `0`.

    new Date(2026, 8, 24);

це вересень.

---

### Помилка 4

Плутати `getDate()` і `getDay()`.

    getDate() // день місяця
    getDay()  // день тижня

---

### Помилка 5

Ігнорувати часовий пояс.

    getDate()

і:

    getUTCDate()

можуть повернути різні значення.

---

### Помилка 6

Вважати різницю timestamp автоматично різницею календарних днів.

    (date2 - date1) / 86400000

це різниця між моментами, а не універсальний алгоритм для календарних днів.

---

### Помилка 7

Не перевіряти `Invalid Date`.

    const date = new Date("wrong");

    date.getTime(); // NaN

---

# 134. Interview Questions

### Junior

**1. У яких одиницях `Date.getTime()` повертає значення?**

Мілісекунди.

**2. Що робить `Date.now()`?**

Повертає поточний timestamp у мілісекундах.

**3. Як додати один календарний день?**

    const result = new Date(date);

    result.setDate(
      result.getDate() + 1
    );

**4. Як додати одну годину?**

    const result = new Date(
      date.getTime() + 60 * 60 * 1000
    );

**5. Чим відрізняються `getDate()` і `getDay()`?**

`getDate()` — день місяця.

`getDay()` — день тижня.

---

### Middle

**6. Чому `date.getTime() + 24h` не завжди те саме, що "завтра"?**

Через часові пояси та переходи між стандартним і літнім часом.

**7. Чому краще створювати копію перед `setDate()`?**

Тому що `setDate()` змінює існуючий об'єкт `Date`.

**8. Як знайти різницю між двома моментами?**

Відняти timestamp:

    date2.getTime() - date1.getTime()

**9. Чим відрізняється тривалість від календарної операції?**

Тривалість — точна кількість часу.

Календарна операція — зміна календарного компонента, наприклад "наступний день".

**10. Що відбудеться при арифметиці з `Invalid Date`?**

Зазвичай результатом стане `NaN` або інший невалідний `Date`.

---

### Advanced / Senior

**11. Чому робота з місяцями складніша за роботу з timestamp?**

Місяці мають різну кількість днів.

**12. Чому DST важливий для Date Arithmetic?**

Тому що локальна календарна доба може мати не рівно 24 години.

**13. Коли краще використовувати UTC?**

Коли логіка повинна бути незалежною від локального часового поясу, наприклад для серверних timestamps та глобальних подій.

**14. Чому потрібно розділяти instant і calendar date?**

Тому що "момент часу" і "дата в календарі" — різні концепції.

**15. Чому функції роботи з датами краще робити немутуючими?**

Щоб не змінювати вхідні дані та отримувати передбачувану поведінку.

---

# 135. Core Level

Потрібно вміти:

- розуміти timestamp;
- знати мілісекунди;
- використовувати `getTime()`;
- використовувати `Date.now()`;
- додавати/віднімати мілісекунди;
- працювати з `setDate()`;
- працювати з `setMonth()`;
- працювати з `setFullYear()`;
- знаходити різницю між датами;
- розуміти мутабельність `Date`.

---

# 136. Junior Level

Потрібно вміти:

- створювати функції `addDays()`;
- створювати `addHours()`;
- створювати `addMinutes()`;
- знаходити expiration date;
- визначати deadline;
- рахувати duration;
- працювати з countdown;
- перевіряти `Invalid Date`;
- відрізняти календарну операцію від тривалості;
- не змінювати оригінальний `Date` без потреби.

---

# 137. Middle Level

Потрібно розуміти:

- timezone;
- UTC;
- local time;
- DST;
- календарну арифметику;
- timestamp arithmetic;
- `[start, end)` intervals;
- проблеми додавання місяців;
- високосні роки;
- роботу з датами у frontend/backend;
- взаємодію JavaScript Date та SQL dates/timestamps.

---

# 138. Senior Level

Потрібно розуміти:

- instant vs calendar date;
- timezone-aware design;
- UTC-first backend architecture;
- DST edge cases;
- date-only values;
- recurring events;
- calendar arithmetic;
- expiration logic;
- distributed systems timestamps;
- database timestamp semantics;
- API date formats;
- необхідність спеціалізованих date/time libraries або Temporal для складних доменних задач.

---

# 139. Mini Cheat Sheet

## Timestamp

    date.getTime();

## Current timestamp

    Date.now();

## Current Date

    new Date();

## Add milliseconds

    new Date(
      date.getTime() + milliseconds
    );

## Add seconds

    new Date(
      date.getTime() + seconds * 1000
    );

## Add hours

    new Date(
      date.getTime() + hours * 60 * 60 * 1000
    );

## Add calendar days

    const result = new Date(date);

    result.setDate(
      result.getDate() + days
    );

## Add months

    const result = new Date(date);

    result.setMonth(
      result.getMonth() + months
    );

## Add years

    const result = new Date(date);

    result.setFullYear(
      result.getFullYear() + years
    );

## Difference

    const difference =
      date2.getTime() - date1.getTime();

## Difference in seconds

    difference / 1000

## Difference in minutes

    difference / (1000 * 60)

## Difference in hours

    difference / (1000 * 60 * 60)

## Difference in days

    difference / (1000 * 60 * 60 * 24)

## Copy Date

    const copy = new Date(date);

## Start of local day

    date.setHours(0, 0, 0, 0);

## Tomorrow

    const tomorrow = new Date();

    tomorrow.setDate(
      tomorrow.getDate() + 1
    );

## Yesterday

    const yesterday = new Date();

    yesterday.setDate(
      yesterday.getDate() - 1
    );

## Expiration

    const expiresAt = new Date(
      Date.now() + 30 * 60 * 1000
    );

## Valid Date

    !Number.isNaN(date.getTime())

---

# 140. Головні правила

1. `Date` представляє момент часу.
2. Timestamp — кількість мілісекунд від Unix Epoch.
3. `getTime()` повертає timestamp.
4. `Date.now()` повертає поточний timestamp.
5. Timestamp зручний для точної арифметики.
6. `setDate()` зручний для календарних днів.
7. `setMonth()` — для календарних місяців.
8. `setFullYear()` — для календарних років.
9. `set...()` змінює існуючий `Date`.
10. Якщо не хочеш змінювати оригінал — створи `new Date(date)`.
11. `24 години` і `наступний календарний день` — не завжди одне й те саме.
12. Часові пояси та DST можуть впливати на арифметику.
13. Різниця timestamp — це різниця моментів, а не автоматично різниця календарних днів.
14. Перевіряй `Invalid Date`.
15. Завжди розрізняй **точну тривалість** і **календарну операцію**.

---

# 141. Головна модель мислення

Для Date Arithmetic корисно мислити двома способами.

### 1. Арифметика моментів

    timestamp
        +
    milliseconds
        =
    новий момент

Наприклад:

    const future = new Date(
      date.getTime() + 60 * 60 * 1000
    );

Це:

> "через рівно одну годину".

### 2. Календарна арифметика

    calendar date
        +
    calendar unit
        =
    нова календарна дата

Наприклад:

    const tomorrow = new Date(date);

    tomorrow.setDate(
      tomorrow.getDate() + 1
    );

Це:

> "наступного календарного дня".

---

# 142. Що треба винести з теми

Date Arithmetic — це не просто:

    date + number

Потрібно розрізняти:

    МОМЕНТ
       ↓
    timestamp
       ↓
    milliseconds

і:

    КАЛЕНДАР
       ↓
    день
    місяць
    рік
    година
    хвилина

Для точних інтервалів використовуй timestamp.

Для календарних операцій використовуй відповідні `get...()` / `set...()` методи.

І найважливіше:

> Перед операцією з датою спочатку визнач, що саме означає "додати час": додати точну тривалість чи перейти до іншої календарної дати.