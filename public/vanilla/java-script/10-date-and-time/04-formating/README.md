# 04. Date Formatting

Форматування дат у JavaScript — це перетворення об'єкта `Date` у зручне для людини або програми текстове представлення.

Наприклад, один і той самий момент часу:

    2026-09-24T12:30:45.123Z

можна представити як:

    24.09.2026
    24.09.2026, 15:30
    September 24, 2026
    24 вересня 2026 р., 15:30
    2026-09-24
    2026-09-24T12:30:45.123Z

Головна ідея:

> `Date` зберігає момент часу, а форматування визначає, як цей момент буде представлений у тексті.

---

# 1. Що потрібно знати перед Date Formatting

Основні інструменти:

- `Date`
- `toString()`
- `toISOString()`
- `toUTCString()`
- `toDateString()`
- `toTimeString()`
- `toJSON()`
- `Intl.DateTimeFormat`
- `format()`
- `formatToParts()`
- `locale`
- `options`
- `timeZone`

Також потрібно розуміти різницю між:

- моментом часу;
- локальним часом;
- UTC;
- датою без часу;
- часом без дати;
- машинним форматом;
- форматом для користувача.

---

# 2. Date і формат — це різні речі

Об'єкт:

    const date = new Date();

не є форматованим текстом.

Це об'єкт, який представляє конкретний момент часу.

Форматування:

    date.toISOString();

перетворює цей момент у рядок.

Тому:

    Date
      ↓
    момент часу
      ↓
    форматування
      ↓
    String

---

# 3. `toString()`

Найпростіше представлення:

    const date = new Date();

    console.log(date.toString());

Результат залежить від середовища та локального часового поясу.

Наприклад:

    Thu Sep 24 2026 15:30:45 GMT+0300 (Eastern European Summer Time)

`toString()` зручний переважно для швидкого перегляду.

Для API та зберігання даних краще використовувати стандартизовані формати.

---

# 4. `toISOString()`

Один із найважливіших методів:

    const date = new Date();

    console.log(date.toISOString());

Приклад:

    2026-09-24T12:30:45.123Z

Це ISO 8601-подібне представлення моменту часу в UTC.

`Z` означає:

    UTC

---

# 5. Формат `toISOString()`

Структура:

    YYYY-MM-DDTHH:mm:ss.sssZ

Наприклад:

    2026-09-24T12:30:45.123Z

де:

    YYYY  — рік
    MM    — місяць
    DD    — день
    T     — роздільник дати й часу
    HH    — години
    mm    — хвилини
    ss    — секунди
    sss   — мілісекунди
    Z     — UTC

---

# 6. Чому `toISOString()` важливий

ISO-формат зручний для:

- API;
- JSON;
- backend;
- frontend;
- баз даних;
- логів;
- передачі дат між системами;
- зберігання timestamps;
- порівняння стандартизованих timestamp-рядків.

Наприклад:

    const payload = {
      createdAt: new Date().toISOString()
    };

---

# 7. `toJSON()`

`Date` має метод:

    date.toJSON();

У нормальному випадку він повертає ISO-представлення дати.

Наприклад:

    const date = new Date();

    console.log(date.toJSON());

Результат буде подібним до:

    2026-09-24T12:30:45.123Z

---

# 8. Date у JSON

При використанні:

    JSON.stringify()

об'єкт `Date` автоматично серіалізується через `toJSON()`.

Наприклад:

    const data = {
      createdAt: new Date()
    };

    console.log(
      JSON.stringify(data)
    );

Результат буде приблизно:

    {
      "createdAt": "2026-09-24T12:30:45.123Z"
    }

Це дуже важливо для роботи з API.

---

# 9. `toUTCString()`

Отримати текстове представлення в UTC:

    const date = new Date();

    console.log(date.toUTCString());

Наприклад:

    Thu, 24 Sep 2026 12:30:45 GMT

Це зручний формат для читання та деяких HTTP/web-сценаріїв.

---

# 10. `toDateString()`

Повертає тільки локальну дату у текстовому форматі:

    const date = new Date();

    console.log(date.toDateString());

Наприклад:

    Thu Sep 24 2026

Час при цьому не показується.

---

# 11. `toTimeString()`

Повертає локальний час:

    const date = new Date();

    console.log(date.toTimeString());

Наприклад:

    15:30:45 GMT+0300 (Eastern European Summer Time)

---

# 12. Порівняння основних методів

    const date = new Date();

    date.toString();
    date.toISOString();
    date.toUTCString();
    date.toDateString();
    date.toTimeString();
    date.toJSON();

Вони представляють той самий `Date`, але в різних форматах.

---

# 13. `toISOString()` vs локальний формат

Наприклад:

    const date = new Date(
      "2026-09-24T12:30:00Z"
    );

    console.log(date.toISOString());

    console.log(date.toString());

`toISOString()` покаже UTC.

`toString()` покаже локальне представлення.

Це можуть бути різні години, хоча момент часу один і той самий.

---

# 14. Форматування для користувача

Для UI краще використовувати:

    Intl.DateTimeFormat

або:

    date.toLocaleDateString()

    date.toLocaleTimeString()

    date.toLocaleString()

---

# 15. `toLocaleDateString()`

Показує дату відповідно до локалі:

    const date = new Date();

    console.log(
      date.toLocaleDateString()
    );

Результат залежить від локалі користувача.

---

# 16. `toLocaleTimeString()`

Показує локальний час:

    const date = new Date();

    console.log(
      date.toLocaleTimeString()
    );

---

# 17. `toLocaleString()`

Показує дату та час:

    const date = new Date();

    console.log(
      date.toLocaleString()
    );

---

# 18. Чому `toLocale...()` не завжди достатньо

Результат залежить від налаштувань середовища.

Тому:

    date.toLocaleDateString()

може мати різний результат у різних користувачів.

Для контрольованого UI краще явно задавати:

- locale;
- options;
- timezone.

---

# 19. `Intl.DateTimeFormat`

Основний сучасний інструмент для форматування дат:

    const formatter =
      new Intl.DateTimeFormat(
        "uk-UA"
      );

    console.log(
      formatter.format(new Date())
    );

---

# 20. Locale

Locale визначає правила форматування.

Наприклад:

    "uk-UA"

українська Україна.

    "en-US"

англійська США.

    "en-GB"

англійська Велика Британія.

    "de-DE"

німецька Німеччина.

    "fr-FR"

французька Франція.

---

# 21. Приклад різних locale

    const date = new Date(
      "2026-09-24T12:30:00Z"
    );

    console.log(
      new Intl.DateTimeFormat("uk-UA")
        .format(date)
    );

    console.log(
      new Intl.DateTimeFormat("en-US")
        .format(date)
    );

    console.log(
      new Intl.DateTimeFormat("de-DE")
        .format(date)
    );

Один момент часу може мати різне текстове представлення.

---

# 22. `Intl.DateTimeFormat` + `options`

Справжня сила `Intl.DateTimeFormat` — у налаштуваннях.

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    );

    console.log(
      formatter.format(new Date())
    );

Наприклад:

    24 вересня 2026 р.

---

# 23. Основні options

Найчастіше використовуються:

    year
    month
    day
    weekday
    hour
    minute
    second
    timeZone
    timeZoneName

---

# 24. `year`

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        year: "numeric"
      }
    );

---

# 25. `month`

Можливі значення:

    "numeric"
    "2-digit"
    "long"
    "short"
    "narrow"

Наприклад:

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        month: "long"
      }
    );

Може повернути:

    вересня

---

# 26. `month: "numeric"`

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        month: "numeric"
      }
    );

Може повернути:

    9

---

# 27. `month: "2-digit"`

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        month: "2-digit"
      }
    );

Результат:

    09

---

# 28. `month: "long"`

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        month: "long"
      }
    );

Результат:

    вересня

---

# 29. `month: "short"`

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        month: "short"
      }
    );

Результат залежить від локалі, наприклад:

    вер.

---

# 30. `month: "narrow"`

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        month: "narrow"
      }
    );

Це найкоротше представлення місяця, якщо локаль його підтримує.

---

# 31. `day`

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        day: "numeric"
      }
    );

---

# 32. `day: "2-digit"`

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        day: "2-digit"
      }
    );

Наприклад:

    04

---

# 33. `weekday`

Можливі значення:

    "long"
    "short"
    "narrow"

Наприклад:

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        weekday: "long"
      }
    );

Результат:

    четвер

---

# 34. Повна дата

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    );

    console.log(
      formatter.format(new Date())
    );

---

# 35. Коротка дата

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }
    );

---

# 36. Формат `DD.MM.YYYY`

Для українського UI:

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }
    );

    console.log(
      formatter.format(new Date())
    );

Результат може бути:

    24.09.2026

Це хороший варіант для відображення користувачу.

---

# 37. Дата з назвою місяця

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );

Може отримати:

    24 вересня 2026 р.

---

# 38. Дата + день тижня

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    );

Наприклад:

    четвер, 24 вересня 2026 р.

---

# 39. Година і хвилини

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        hour: "2-digit",
        minute: "2-digit"
      }
    );

Результат:

    15:30

---

# 40. Година, хвилини та секунди

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }
    );

Результат:

    15:30:45

---

# 41. Дата + час

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }
    );

---

# 42. Дата + час + секунди

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }
    );

---

# 43. `hour12`

Для деяких локалей можна контролювати 12/24-годинний формат.

    const formatter = new Intl.DateTimeFormat(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      }
    );

Можливий результат:

    3:30 PM

---

# 44. 24-годинний формат

    const formatter = new Intl.DateTimeFormat(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }
    );

---

# 45. `timeZone`

Одна з найважливіших options.

Наприклад:

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Europe/Kyiv"
      }
    );

    console.log(
      formatter.format(new Date())
    );

`timeZone` визначає, у якому часовому поясі потрібно представити момент.

---

# 46. Один момент — різні часові пояси

    const date = new Date(
      "2026-09-24T12:00:00Z"
    );

    const kyiv = new Intl.DateTimeFormat(
      "uk-UA",
      {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Europe/Kyiv"
      }
    );

    const newYork = new Intl.DateTimeFormat(
      "en-US",
      {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "America/New_York"
      }
    );

    console.log(kyiv.format(date));
    console.log(newYork.format(date));

Це один і той самий момент часу, представлений у різних часових поясах.

---

# 47. `timeZone` не змінює Date

Важливо:

    const date = new Date(
      "2026-09-24T12:00:00Z"
    );

Форматтер:

    new Intl.DateTimeFormat(
      "uk-UA",
      {
        timeZone: "Europe/Kyiv"
      }
    )

не змінює `date`.

Він лише визначає, як цей момент буде показаний.

---

# 48. `dateStyle`

Сучасний зручний спосіб задати стиль дати:

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        dateStyle: "medium"
      }
    );

Можливі значення:

    "full"
    "long"
    "medium"
    "short"

---

# 49. `dateStyle: "full"`

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        dateStyle: "full"
      }
    );

Наприклад:

    четвер, 24 вересня 2026 р.

Точне представлення залежить від locale.

---

# 50. `dateStyle: "long"`

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        dateStyle: "long"
      }
    );

Наприклад:

    24 вересня 2026 р.

---

# 51. `dateStyle: "medium"`

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        dateStyle: "medium"
      }
    );

---

# 52. `dateStyle: "short"`

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        dateStyle: "short"
      }
    );

Короткий формат для UI.

---

# 53. `timeStyle`

Аналогічно можна форматувати час.

Можливі значення:

    "full"
    "long"
    "medium"
    "short"

Наприклад:

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        timeStyle: "short"
      }
    );

---

# 54. Дата + час через `dateStyle` і `timeStyle`

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        dateStyle: "medium",
        timeStyle: "short"
      }
    );

Це дуже зручний варіант для UI.

---

# 55. Не змішувати `dateStyle` з окремими date options

Не потрібно робити:

    new Intl.DateTimeFormat(
      "uk-UA",
      {
        dateStyle: "medium",
        year: "numeric"
      }
    );

Для `dateStyle` краще використовувати готовий стиль.

Якщо потрібен точний контроль — використовуй окремі:

    year
    month
    day
    weekday
    hour
    minute
    second

---

# 56. Перевикористання formatter

Якщо потрібно форматувати багато дат, краще створити formatter один раз:

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    );

    formatter.format(date1);
    formatter.format(date2);
    formatter.format(date3);

Замість постійного створення:

    new Intl.DateTimeFormat(...)

---

# 57. `format()`

Основний метод:

    const formatter = new Intl.DateTimeFormat(
      "uk-UA"
    );

    const result =
      formatter.format(new Date());

---

# 58. `Intl.DateTimeFormat().format()`

Можна скоротити:

    const result =
      new Intl.DateTimeFormat(
        "uk-UA",
        {
          year: "numeric",
          month: "long",
          day: "numeric"
        }
      ).format(new Date());

Для одного використання це нормально.

Для багатьох дат краще зберігати formatter.

---

# 59. `formatToParts()`

Іноді потрібно отримати не один рядок, а окремі частини.

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    );

    const parts =
      formatter.formatToParts(new Date());

    console.log(parts);

Результатом буде масив частин:

    [
      { type: "day", value: "24" },
      { type: "literal", value: " " },
      { type: "month", value: "вересня" },
      ...
    ]

---

# 60. Навіщо `formatToParts()`

Це корисно, коли потрібно створити власний UI.

Наприклад:

    День: 24
    Місяць: вересня
    Рік: 2026

Замість ручного парсингу готового рядка можна отримати структуровані частини.

---

# 61. Не парсити локалізований рядок назад у Date

Поганий підхід:

    const formatted =
      date.toLocaleDateString("uk-UA");

    // Потім намагатися:
    new Date(formatted);

Формат локалізованого рядка призначений для відображення, а не для надійного машинного парсингу.

Краще:

    Date
      ↓
    ISO / timestamp
      ↓
    форматування для UI

---

# 62. Машинний формат vs UI формат

### Машинний

    2026-09-24T12:30:45.123Z

### UI

    24 вересня 2026 р., 15:30

Не потрібно використовувати UI-формат для передачі даних між системами.

---

# 63. ISO для API

Наприклад:

    const user = {
      name: "Valeriy",
      createdAt: new Date().toISOString()
    };

JSON:

    {
      "name": "Valeriy",
      "createdAt": "2026-09-24T12:30:45.123Z"
    }

Це хороший формат для API.

---

# 64. Форматування для UI

На frontend:

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        dateStyle: "medium",
        timeStyle: "short"
      }
    );

    const text =
      formatter.format(
        new Date(user.createdAt)
      );

Тут:

- API передає ISO;
- frontend створює `Date`;
- frontend форматує для користувача.

---

# 65. Хороший full-stack pipeline

Типовий процес:

    PostgreSQL
        ↓
    Backend
        ↓
    ISO / timestamp
        ↓
    JSON API
        ↓
    Frontend
        ↓
    Date
        ↓
    Intl.DateTimeFormat
        ↓
    UI

Це дуже корисна модель для full-stack розробника.

---

# 66. Формат `YYYY-MM-DD`

Для date-only значень часто використовується:

    2026-09-24

Це зручний машинний формат.

Але важливо розуміти:

> `YYYY-MM-DD` і timestamp — не одне й те саме.

`2026-09-24` описує календарну дату, а timestamp описує конкретний момент часу.

---

# 67. Date-only та timezone

Обережно з:

    new Date("2026-09-24");

У JavaScript ISO date-only string інтерпретується як UTC.

Тому при виведенні через локальний часовий пояс можна отримати несподівану календарну дату в деяких часових поясах.

Для доменних значень типу:

    День народження
    Дата уроку
    Дата свята
    Дата документа

потрібно окремо продумати, чи це:

- календарна дата;
- момент часу.

---

# 68. Форматування date-only значення

Якщо в тебе є саме календарний рядок:

    const dateString = "2026-09-24";

не варто автоматично сприймати його як timestamp.

Якщо задача — просто показати:

    24.09.2026

можна працювати з компонентами або використовувати контрольований підхід до date-only даних.

---

# 69. Ручне форматування

Іноді потрібно отримати конкретний технічний формат, наприклад:

    YYYY-MM-DD

Можна створити функцію:

    function pad(value) {
      return String(value).padStart(2, "0");
    }

    function formatDate(date) {
      return [
        date.getFullYear(),
        pad(date.getMonth() + 1),
        pad(date.getDate())
      ].join("-");
    }

---

# 70. Результат ручного форматування

    const date = new Date();

    console.log(
      formatDate(date)
    );

Наприклад:

    2026-09-24

---

# 71. Чому `getMonth() + 1`

JavaScript використовує:

    January = 0
    February = 1
    ...
    December = 11

Тому для людського номера місяця:

    date.getMonth() + 1

---

# 72. `padStart()`

Для отримання двозначного значення:

    String(5).padStart(2, "0");

Результат:

    "05"

Для:

    12

результат:

    "12"

---

# 73. Ручне форматування часу

    function formatTime(date) {
      const hours = String(
        date.getHours()
      ).padStart(2, "0");

      const minutes = String(
        date.getMinutes()
      ).padStart(2, "0");

      return `${hours}:${minutes}`;
    }

Результат:

    15:30

---

# 74. Ручне форматування `HH:mm:ss`

    function formatTime(date) {
      const hours = String(
        date.getHours()
      ).padStart(2, "0");

      const minutes = String(
        date.getMinutes()
      ).padStart(2, "0");

      const seconds = String(
        date.getSeconds()
      ).padStart(2, "0");

      return `${hours}:${minutes}:${seconds}`;
    }

---

# 75. Ручне форматування дати та часу

    function formatDateTime(date) {
      const year = date.getFullYear();

      const month = String(
        date.getMonth() + 1
      ).padStart(2, "0");

      const day = String(
        date.getDate()
      ).padStart(2, "0");

      const hours = String(
        date.getHours()
      ).padStart(2, "0");

      const minutes = String(
        date.getMinutes()
      ).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

---

# 76. Коли ручне форматування доречне

Ручне форматування може бути корисним для:

- строго визначеного технічного формату;
- `YYYY-MM-DD`;
- `HH:mm`;
- внутрішніх ключів;
- простих form values;
- специфічних API-контрактів.

Але для природної мови краще використовувати:

    Intl.DateTimeFormat

---

# 77. Не створюй власний locale formatter без потреби

Наприклад, замість складного:

    `${day} ${monthName} ${year}`

краще:

    new Intl.DateTimeFormat(
      "uk-UA",
      {
        day: "numeric",
        month: "long",
        year: "numeric"
      }
    ).format(date);

`Intl` вже враховує правила конкретної мови.

---

# 78. Локалізація

Порівняй:

    const date = new Date(
      "2026-09-24T12:30:00Z"
    );

    new Intl.DateTimeFormat(
      "uk-UA",
      {
        dateStyle: "long"
      }
    ).format(date);

та:

    new Intl.DateTimeFormat(
      "en-US",
      {
        dateStyle: "long"
      }
    ).format(date);

Результат буде локалізований відповідно до мови.

---

# 79. Локалізація місяців

Не потрібно створювати вручну:

    const months = [
      "січень",
      "лютий",
      "березень",
      ...
    ];

Для UI краще використовувати `Intl`.

Це особливо важливо, якщо застосунок підтримує:

    uk
    en
    de
    fr
    ...

---

# 80. Локалізація дня тижня

Так само не потрібно вручну створювати:

    Monday
    Tuesday
    Wednesday

`Intl.DateTimeFormat` зробить це відповідно до locale.

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        weekday: "long"
      }
    );

---

# 81. Відображення дати у React

Наприклад:

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        dateStyle: "medium"
      }
    );

    function PostDate({ createdAt }) {
      return (
        <time>
          {formatter.format(new Date(createdAt))}
        </time>
      );
    }

---

# 82. Семантичний `<time>`

Для HTML корисно використовувати:

    <time dateTime="2026-09-24T12:30:00Z">
      24 вересня 2026 р.
    </time>

Тут:

    dateTime

містить машинне значення.

Текст усередині:

    24 вересня 2026 р.

призначений для користувача.

Це хороший приклад розділення:

    machine-readable
    vs
    human-readable

---

# 83. Full-stack приклад

Backend:

    const response = {
      createdAt: new Date().toISOString()
    };

Frontend:

    const date = new Date(
      response.createdAt
    );

    const text =
      new Intl.DateTimeFormat(
        "uk-UA",
        {
          dateStyle: "medium",
          timeStyle: "short"
        }
      ).format(date);

---

# 84. API не повинно повертати локалізовану дату

Погано:

    {
      "createdAt": "24 вересня 2026 р."
    }

Краще:

    {
      "createdAt": "2026-09-24T12:30:00.000Z"
    }

Backend передає стандартизоване значення.

Frontend вирішує, як його показати.

---

# 85. Чому backend не повинен форматувати дату для UI

Backend може обслуговувати:

- українського користувача;
- американського користувача;
- британського користувача;
- німецького користувача.

Тому backend краще передає:

    timestamp
    або
    ISO string

а frontend виконує локалізоване форматування.

---

# 86. Форматування в конкретному timezone

Наприклад, backend передає UTC:

    const date = new Date(
      "2026-09-24T12:00:00Z"
    );

Frontend може показати Kyiv:

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Europe/Kyiv"
      }
    );

---

# 87. Форматування в часовому поясі користувача

Якщо `timeZone` не вказати, `Intl.DateTimeFormat` зазвичай використовує часовий пояс середовища.

Наприклад:

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        dateStyle: "medium",
        timeStyle: "short"
      }
    );

Це може бути зручно для UI, якщо потрібно показати час у локальному часовому поясі користувача.

---

# 88. Форматування в UTC

Можна явно вказати:

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "UTC"
      }
    );

---

# 89. `timeZoneName`

Можна показати інформацію про часовий пояс:

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short"
      }
    );

Можливі значення:

    "short"
    "long"
    "shortOffset"
    "longOffset"
    "shortGeneric"
    "longGeneric"

Підтримка та конкретний текст залежать від середовища та locale.

---

# 90. Важлива відмінність: форматування не змінює Date

    const date = new Date();

    const text =
      new Intl.DateTimeFormat(
        "uk-UA"
      ).format(date);

`date` залишився тим самим моментом.

Змінився лише:

    text

---

# 91. Форматування — це операція представлення

Модель:

    Date
      ↓
    format()
      ↓
    String

Не:

    Date
      ↓
    format()
      ↓
    нова Date

Тобто форматований рядок не є заміною об'єкта `Date`.

---

# 92. Типова помилка: форматувати через `toLocaleString()` і зберігати результат

Погано:

    const createdAt =
      new Date().toLocaleString();

Такий рядок залежить від locale та середовища.

Для зберігання краще:

    const createdAt =
      new Date().toISOString();

А для показу:

    formatter.format(
      new Date(createdAt)
    );

---

# 93. Типова помилка: використовувати `toString()` як API format

Не варто:

    {
      createdAt: new Date().toString()
    }

Краще:

    {
      createdAt: new Date().toISOString()
    }

---

# 94. Типова помилка: вручну перекладати місяці

Не варто будувати складні locale-aware формати вручну.

Замість:

    const months = [
      "січень",
      "лютий",
      ...
    ];

краще:

    new Intl.DateTimeFormat(
      "uk-UA",
      {
        month: "long"
      }
    ).format(date);

---

# 95. Типова помилка: змішувати timezone

Наприклад:

    date.toISOString();

і:

    date.getHours();

не обов'язково представляють одну й ту саму годину.

`toISOString()` — UTC.

`getHours()` — локальний час.

---

# 96. Типова помилка: плутати ISO та локальний формат

ISO:

    2026-09-24T12:30:00.000Z

UI:

    24 вересня 2026 р., 15:30

Це різні представлення одного моменту.

---

# 97. Типова помилка: намагатися парсити локалізований формат

Не варто:

    const text = "24.09.2026";

    new Date(text);

Формат не є надійним універсальним способом передачі дати.

Для машинного обміну краще використовувати стандартизований формат.

---

# 98. ISO 8601 як стандартний напрямок

Для API та обміну даними дуже корисний формат:

    2026-09-24T12:30:45.123Z

Він:

- однозначний;
- машиночитний;
- містить timezone information;
- добре підходить для JSON/API;
- не залежить від мови користувача.

---

# 99. Форматування і парсинг — різні операції

### Formatting

    Date → String

Наприклад:

    date.toISOString();

### Parsing

    String → Date

Наприклад:

    new Date(
      "2026-09-24T12:30:00Z"
    );

Не потрібно плутати ці два процеси.

---

# 100. Formatting pipeline

Корисно запам'ятати:

    Date
      ↓
    formatting
      ↓
    String
      ↓
    UI

А для API:

    Date
      ↓
    ISO
      ↓
    JSON
      ↓
    HTTP
      ↓
    frontend
      ↓
    Date
      ↓
    Intl
      ↓
    UI

---

# 101. Практичний helper для української дати

    const ukrainianDateFormatter =
      new Intl.DateTimeFormat(
        "uk-UA",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        }
      );

    function formatDate(date) {
      return ukrainianDateFormatter.format(date);
    }

---

# 102. Практичний helper для української дати + часу

    const ukrainianDateTimeFormatter =
      new Intl.DateTimeFormat(
        "uk-UA",
        {
          dateStyle: "medium",
          timeStyle: "short"
        }
      );

    function formatDateTime(date) {
      return ukrainianDateTimeFormatter.format(date);
    }

---

# 103. Практичний helper для ISO

Для ISO форматування зазвичай не потрібен власний helper:

    function formatISO(date) {
      return date.toISOString();
    }

---

# 104. Практичний helper `YYYY-MM-DD`

    function pad(value) {
      return String(value).padStart(2, "0");
    }

    function formatISODate(date) {
      return [
        date.getFullYear(),
        pad(date.getMonth() + 1),
        pad(date.getDate())
      ].join("-");
    }

Це створює date-only representation у локальному календарі.

Важливо:

> Такий рядок — календарна дата, а не повний timestamp.

---

# 105. Практичний helper `HH:mm`

    function formatTime(date) {
      const hours = String(
        date.getHours()
      ).padStart(2, "0");

      const minutes = String(
        date.getMinutes()
      ).padStart(2, "0");

      return `${hours}:${minutes}`;
    }

---

# 106. Практичний helper `HH:mm:ss`

    function formatTime(date) {
      const hours = String(
        date.getHours()
      ).padStart(2, "0");

      const minutes = String(
        date.getMinutes()
      ).padStart(2, "0");

      const seconds = String(
        date.getSeconds()
      ).padStart(2, "0");

      return `${hours}:${minutes}:${seconds}`;
    }

---

# 107. Форматування відносного часу

Для задач типу:

    5 хвилин тому
    2 години тому
    завтра
    через 3 дні

існує окремий API:

    Intl.RelativeTimeFormat

Наприклад:

    const formatter =
      new Intl.RelativeTimeFormat(
        "uk-UA",
        {
          numeric: "auto"
        }
      );

    console.log(
      formatter.format(-1, "day")
    );

Можливий результат:

    учора

---

# 108. `Intl.RelativeTimeFormat`

Це вже не звичайне форматування дати.

Воно форматує:

    number + unit

Наприклад:

    -1 day
    2 hours
    3 months

У локалізований текст.

---

# 109. `Intl.RelativeTimeFormat` — приклад

    const formatter =
      new Intl.RelativeTimeFormat(
        "uk-UA",
        {
          numeric: "auto"
        }
      );

    formatter.format(-1, "day");
    formatter.format(1, "day");
    formatter.format(-2, "hour");

---

# 110. Relative time vs Date formatting

### Date formatting

    24 вересня 2026 р.

### Relative formatting

    сьогодні
    учора
    завтра
    через 2 дні

Це різні задачі.

---

# 111. Практичний приклад: пост у соцмережі

API:

    {
      "createdAt": "2026-09-24T12:30:00.000Z"
    }

Frontend може показати:

    24 вересня 2026 р.

або:

    2 години тому

Залежно від вимог UI.

---

# 112. Форматування для таблиці

Наприклад:

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }
    );

    const rows = dates.map(date => ({
      createdAt: formatter.format(date)
    }));

Це зручно для списків і таблиць.

---

# 113. Форматування для логів

Для логів часто зручно використовувати:

    new Date().toISOString();

Наприклад:

    console.log(
      `[${new Date().toISOString()}] User created`
    );

Результат:

    [2026-09-24T12:30:45.123Z] User created

ISO добре підходить для технічних логів.

---

# 114. Форматування для `<input type="date">`

HTML:

    <input type="date">

Очікує значення у форматі:

    YYYY-MM-DD

Наприклад:

    2026-09-24

Це важливий приклад, де потрібно відрізняти date-only значення від timestamp.

---

# 115. Форматування для `<input type="datetime-local">`

HTML:

    <input type="datetime-local">

Очікує значення приблизно такого формату:

    2026-09-24T15:30

Це локальне date-time значення без timezone offset.

Тому його не можна автоматично прирівнювати до ISO timestamp з `Z`.

---

# 116. Date Formatting і форми

Наприклад:

    const date = new Date();

    const value = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0")
    ].join("-");

Таке значення можна використовувати для:

    <input type="date">

---

# 117. Форматування для URL/API

Якщо потрібно передати точний момент:

    const params = new URLSearchParams({
      createdAt: new Date().toISOString()
    });

Наприклад:

    /api/posts?createdAt=2026-09-24T12%3A30%3A00.000Z

Для URL потрібно пам'ятати, що символи ISO-рядка можуть бути URL-encoded.

---

# 118. Форматування і база даних

У full-stack застосунку не потрібно перетворювати дату в красивий український текст перед збереженням.

Не:

    "24 вересня 2026 р."

Краще зберігати:

    timestamp
    або
    ISO-compatible datetime

А форматувати тільки на рівні представлення.

---

# 119. Розділення відповідальності

Хороша архітектура:

    Database
        ↓
    Backend
        ↓
    Machine-readable date
        ↓
    API
        ↓
    Frontend
        ↓
    Intl.DateTimeFormat
        ↓
    Human-readable date

---

# 120. Практичний full-stack приклад

Backend:

    const post = {
      title: "JavaScript Date",
      createdAt: new Date().toISOString()
    };

API:

    {
      "title": "JavaScript Date",
      "createdAt": "2026-09-24T12:30:00.000Z"
    }

Frontend:

    const createdAt =
      new Date(post.createdAt);

    const formatted =
      new Intl.DateTimeFormat(
        "uk-UA",
        {
          dateStyle: "long",
          timeStyle: "short"
        }
      ).format(createdAt);

UI:

    JavaScript Date
    24 вересня 2026 р., 15:30

---

# 121. Formatting і timezone — головна модель

Можна уявляти:

    Один момент
         │
         ├── UTC
         │
         ├── Europe/Kyiv
         │
         ├── America/New_York
         │
         └── Asia/Tokyo

Це не різні моменти.

Це різні представлення одного моменту.

---

# 122. Не змінюй timezone вручну через арифметику

Не потрібно робити:

    date.getTime() + 3 * 60 * 60 * 1000

лише для того, щоб "перевести" дату в Kyiv.

Часовий пояс краще задавати formatter:

    new Intl.DateTimeFormat(
      "uk-UA",
      {
        timeZone: "Europe/Kyiv"
      }
    ).format(date);

Це враховує правила конкретного timezone.

---

# 123. `Intl.DateTimeFormat` — основний інструмент

Для сучасного JavaScript:

    Intl.DateTimeFormat

варто запам'ятати як основний API для локалізованого форматування дат.

Він дозволяє контролювати:

- мову;
- дату;
- час;
- порядок компонентів;
- назви місяців;
- день тижня;
- часовий пояс;
- стиль представлення.

---

# 124. Основний шаблон

    const formatter = new Intl.DateTimeFormat(
      locale,
      options
    );

    const text = formatter.format(date);

Наприклад:

    const formatter = new Intl.DateTimeFormat(
      "uk-UA",
      {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Europe/Kyiv"
      }
    );

    const text = formatter.format(
      new Date()
    );

---

# 125. Що використовувати коли

### `toISOString()`

Для:

- API;
- JSON;
- технічних даних;
- логів;
- передачі моменту часу.

### `Intl.DateTimeFormat`

Для:

- UI;
- локалізації;
- різних мов;
- різних timezone;
- форматування для користувача.

### `toLocaleDateString()`

Для простих локалізованих дат.

### `toLocaleTimeString()`

Для простих локалізованих часів.

### `toLocaleString()`

Для простого локалізованого date + time.

### `toString()`

Для швидкого debugging.

---

# 126. Типова архітектура форматування

Не:

    Database
      ↓
    "24 вересня 2026"
      ↓
    API
      ↓
    Frontend

Краще:

    Database
      ↓
    timestamp
      ↓
    Backend
      ↓
    ISO
      ↓
    API
      ↓
    Frontend
      ↓
    Intl.DateTimeFormat
      ↓
    "24 вересня 2026"

---

# 127. Що потрібно пам'ятати

### Машинний формат

    date.toISOString();

### Локалізована дата

    date.toLocaleDateString(
      "uk-UA"
    );

### Локалізований час

    date.toLocaleTimeString(
      "uk-UA"
    );

### Локалізовані дата + час

    date.toLocaleString(
      "uk-UA"
    );

### Контрольований формат

    new Intl.DateTimeFormat(
      "uk-UA",
      options
    ).format(date);

### Частини формату

    formatter.formatToParts(date);

---

# 128. Core Level

Потрібно вміти:

- розуміти, що `Date` і string — різні типи;
- використовувати `toISOString()`;
- використовувати `toLocaleDateString()`;
- використовувати `toLocaleTimeString()`;
- використовувати `toLocaleString()`;
- розуміти UTC;
- розуміти локальний час;
- форматувати дату для UI;
- відрізняти ISO від локалізованого формату.

---

# 129. Junior Level

Потрібно вміти:

- використовувати `Intl.DateTimeFormat`;
- задавати locale;
- задавати `year`, `month`, `day`;
- задавати `hour`, `minute`, `second`;
- використовувати `dateStyle`;
- використовувати `timeStyle`;
- задавати `timeZone`;
- форматувати API dates;
- створювати reusable formatter;
- працювати з `<time>`;
- не зберігати локалізовані рядки замість дат.

---

# 130. Middle Level

Потрібно розуміти:

- ISO 8601;
- timezone;
- UTC;
- локальний час;
- date-only;
- datetime-local;
- API date contracts;
- локалізацію;
- `Intl.DateTimeFormat`;
- `formatToParts()`;
- різницю між машинним та UI-представленням;
- форматування на frontend vs backend;
- проблеми date-only значень.

---

# 131. Senior Level

Потрібно розуміти:

- instant vs calendar date;
- timezone-aware applications;
- locale-aware formatting;
- API contracts;
- database datetime semantics;
- DST;
- міжнародні формати;
- date-only/domain dates;
- UTC-first architecture;
- formatting boundaries;
- localization architecture;
- `Intl`;
- складні часові домени;
- Temporal API та спеціалізовані date/time libraries.

---

# 132. Interview Questions

### Junior

**1. Що робить `toISOString()`?**

Перетворює `Date` у стандартизований ISO-рядок у UTC.

**2. Що означає `Z` у ISO timestamp?**

UTC.

**3. Чим `toLocaleDateString()` відрізняється від `toISOString()`?**

`toISOString()` створює стандартизований машинний формат.

`toLocaleDateString()` створює локалізоване представлення для користувача.

**4. Для чого потрібен `Intl.DateTimeFormat`?**

Для локалізованого та контрольованого форматування дат і часу.

**5. Чи змінює форматування об'єкт `Date`?**

Ні.

---

### Middle

**6. Чому не варто зберігати `24.09.2026` як універсальне datetime representation?**

Це локалізований/неоднозначний текстовий формат і не містить інформації про час або timezone.

**7. Чому API краще повертати ISO timestamp?**

Він стандартизований, машиночитний і придатний для передачі точного моменту часу.

**8. Для чого потрібен `timeZone` в `Intl.DateTimeFormat`?**

Щоб визначити часовий пояс, у якому момент часу буде представлений.

**9. Що робить `formatToParts()`?**

Повертає структуровані частини форматованого результату.

**10. Чому не варто вручну форматувати назви місяців?**

Тому що `Intl` вже враховує правила локалі та локалізацію.

---

### Advanced

**11. Чому backend не повинен повертати дату у форматі `24 вересня 2026 р.`?**

Тому що API має передавати дані, а не presentation-specific локалізацію.

**12. Чим instant відрізняється від calendar date?**

Instant — конкретний момент часу.

Calendar date — дата календаря без обов'язкового прив'язування до конкретного моменту.

**13. Чому timezone не потрібно змінювати через додавання годин до timestamp?**

Тому що timezone має власні правила, включно з DST. `Intl` може коректно представити момент у потрібному timezone.

**14. Чому `toLocaleString()` не варто використовувати як storage format?**

Результат залежить від locale та середовища.

**15. Чому важливо розділяти formatting і parsing?**

Formatting — `Date → String`.

Parsing — `String → Date`.

Це різні операції з різними вимогами.

---

# 133. Mini Cheat Sheet

## ISO

    date.toISOString();

## JSON

    date.toJSON();

## Local string

    date.toString();

## UTC string

    date.toUTCString();

## Local date

    date.toDateString();

## Local time

    date.toTimeString();

## Localized date

    date.toLocaleDateString(
      "uk-UA"
    );

## Localized time

    date.toLocaleTimeString(
      "uk-UA"
    );

## Localized date + time

    date.toLocaleString(
      "uk-UA"
    );

## Intl formatter

    const formatter =
      new Intl.DateTimeFormat(
        "uk-UA",
        {
          year: "numeric",
          month: "long",
          day: "numeric"
        }
      );

    formatter.format(date);

## Date style

    const formatter =
      new Intl.DateTimeFormat(
        "uk-UA",
        {
          dateStyle: "long"
        }
      );

## Date + time style

    const formatter =
      new Intl.DateTimeFormat(
        "uk-UA",
        {
          dateStyle: "medium",
          timeStyle: "short"
        }
      );

## Timezone

    const formatter =
      new Intl.DateTimeFormat(
        "uk-UA",
        {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "Europe/Kyiv"
        }
      );

## Parts

    formatter.formatToParts(date);

## ISO date `YYYY-MM-DD`

    function pad(value) {
      return String(value).padStart(2, "0");
    }

    function formatDate(date) {
      return [
        date.getFullYear(),
        pad(date.getMonth() + 1),
        pad(date.getDate())
      ].join("-");
    }

---

# 134. Головні правила

1. `Date` зберігає момент часу, а не форматований текст.
2. Форматування перетворює `Date` у `String`.
3. `toISOString()` — хороший машинний формат.
4. `toISOString()` використовує UTC.
5. `Z` означає UTC.
6. `Intl.DateTimeFormat` — основний інструмент локалізованого форматування.
7. Locale визначає правила представлення.
8. `timeZone` визначає, у якому часовому поясі показати момент.
9. Форматування не змінює `Date`.
10. UI-формат і API-формат — різні речі.
11. Не використовуй локалізовані рядки як універсальний storage format.
12. Не намагайся парсити назад рядки, створені для UI.
13. Для API краще передавати ISO timestamp або інше чітко визначене машинне представлення.
14. Для UI використовуй `Intl.DateTimeFormat`.
15. Для локалізації не потрібно вручну створювати назви місяців і днів.
16. Завжди розрізняй instant, calendar date і formatted string.
17. Не змішуй UTC та local time без чіткого розуміння, що саме потрібно.
18. Для складних часових доменів потрібно окремо враховувати timezone, DST і calendar semantics.

---

# 135. Головна модель мислення

Запам'ятай три рівні.

### 1. Дані

    Date

або:

    timestamp

або:

    ISO string

### 2. Представлення

    Intl.DateTimeFormat

### 3. UI

    24 вересня 2026 р., 15:30

Тобто:

    DATA
      ↓
    FORMAT
      ↓
    UI

---

# 136. Найважливіша схема для full-stack

У типовому full-stack застосунку:

    PostgreSQL
        ↓
    Backend
        ↓
    ISO / timestamp
        ↓
    JSON API
        ↓
    Frontend
        ↓
    Date
        ↓
    Intl.DateTimeFormat
        ↓
    локалізований UI

Наприклад:

    "2026-09-24T12:30:00.000Z"

перетворюється на:

    "24 вересня 2026 р., 15:30"

при цьому сам момент часу не змінюється.

---

# 137. Що треба винести з теми

Date Formatting — це не зміна дати.

Це зміна її представлення.

Основний принцип:

    Date
      ↓
    момент часу
      ↓
    formatting
      ↓
    String

Для технічного обміну:

    toISOString()

Для користувацького інтерфейсу:

    Intl.DateTimeFormat

Для локалізації:

    locale

Для конкретного часового поясу:

    timeZone

І найважливіше:

> Зберігай і передавай дату як дані, а форматуйте її там, де вона стає частиною інтерфейсу користувача.