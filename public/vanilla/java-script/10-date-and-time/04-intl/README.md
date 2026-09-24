# 05. Intl

## 📚 Зміст

- [1. Що таке `Intl`](#1-що-таке-intl)
- [2. Локаль (`locale`)](#2-локаль-locale)
- [3. `Intl.DateTimeFormat`](#3-intldatetimeformat)
- [4. `format()`](#4-format)
- [5. Налаштування дати](#5-налаштування-дати)
- [6. Налаштування часу](#6-налаштування-часу)
- [7. `dateStyle` і `timeStyle`](#7-datestyle-і-timestyle)
- [8. Часовий пояс `timeZone`](#8-часовий-пояс-timezone)
- [9. Локалізація різними мовами](#9-локалізація-різними-мовами)
- [10. `formatToParts()`](#10-formattoparts)
- [11. `Intl.RelativeTimeFormat`](#11-intlrelativetimeformat)
- [12. `Intl.NumberFormat`](#12-intlnumberformat)
- [13. `Intl.ListFormat`](#13-intllistformat)
- [14. `Intl.PluralRules`](#14-intlpluralrules)
- [15. `Intl.Collator`](#15-intlcollator)
- [16. `Intl.DisplayNames`](#16-intldisplaynames)
- [17. `Intl.Locale`](#17-intllocale)
- [18. `Intl` у Full Stack застосунках](#18-intl-у-full-stack-застосунках)
- [19. Типові помилки](#19-типові-помилки)
- [20. Що потрібно знати на різних рівнях](#20-що-потрібно-знати-на-різних-рівнях)
- [21. Питання для співбесіди](#21-питання-для-співбесіди)
- [22. Mini Cheat Sheet](#22-mini-cheat-sheet)
- [23. Головні правила](#23-головні-правила)

---

# 1. Що таке `Intl`

`Intl` — це вбудований JavaScript API для **інтернаціоналізації**.

Він дозволяє форматувати:

- дати;
- час;
- числа;
- валюту;
- відсотки;
- списки;
- відносний час;
- множину;
- назви мов, країн та інших сутностей;
- текст для різних мов і локалей.

Основна ідея:

> JavaScript зберігає дані в універсальному форматі, а `Intl` допомагає показати їх користувачу відповідно до його мови та регіональних правил.

Наприклад, одна й та сама дата:

    24 вересня 2026 р.

може бути представлена як:

    24 September 2026

або:

    24 septembre 2026

або:

    24.09.2026

або:

    09/24/2026

Дані залишаються тими самими.

Змінюється лише **представлення**.

---

## Головна ідея `Intl`

Уявляй архітектуру так:

    Дані
      ↓
    JavaScript value
      ↓
    Intl
      ↓
    локалізований UI

Наприклад:

    const date = new Date();

    const formatter = new Intl.DateTimeFormat("uk-UA");

    console.log(formatter.format(date));

---

# 2. Локаль (`locale`)

`locale` визначає правила форматування.

Наприклад:

    "uk-UA"

означає українську мову для України.

Інші приклади:

    "en-US"
    "en-GB"
    "de-DE"
    "fr-FR"
    "pl-PL"
    "es-ES"

---

## Мова і регіон

Формат:

    language-REGION

Наприклад:

    uk-UA
    en-US
    en-GB
    de-DE

`language` — мова.

`REGION` — регіон.

---

## Чому `en-US` і `en-GB` відрізняються

Наприклад, дата може форматуватися по-різному:

    en-US → 9/24/2026

    en-GB → 24/09/2026

Тобто locale визначає не лише мову.

Вона також визначає:

- порядок компонентів;
- роздільники;
- назви місяців;
- формат чисел;
- валютні правила;
- правила множини;
- інші культурні conventions.

---

## Перевірити доступні локалі

    console.log(Intl.DateTimeFormat.supportedLocalesOf([
      "uk-UA",
      "en-US",
      "de-DE",
      "fr-FR"
    ]));

---

## Якщо locale не передати

Можна написати:

    const formatter = new Intl.DateTimeFormat();

Тоді JavaScript використовує locale середовища за замовчуванням.

Але для передбачуваного UI краще явно визначати locale або використовувати locale користувача.

---

# 3. `Intl.DateTimeFormat`

`Intl.DateTimeFormat` — головний інструмент `Intl` для форматування дат і часу.

Синтаксис:

    new Intl.DateTimeFormat(locales, options)

Наприклад:

    const formatter = new Intl.DateTimeFormat("uk-UA");

    console.log(formatter.format(new Date()));

---

## Простий приклад

    const date = new Date("2026-09-24T14:30:00Z");

    const formatter = new Intl.DateTimeFormat("uk-UA");

    console.log(formatter.format(date));

Результат буде локалізованим представленням дати.

---

## Форматування одразу

Можна не створювати окрему змінну:

    const date = new Date();

    console.log(
      new Intl.DateTimeFormat("uk-UA").format(date)
    );

---

## Чому створюють formatter окремо

Якщо потрібно форматувати багато дат:

    const formatter = new Intl.DateTimeFormat("uk-UA");

    formatter.format(date1);
    formatter.format(date2);
    formatter.format(date3);

Це зручно і дозволяє повторно використовувати однакову конфігурацію.

---

# 4. `format()`

Метод `format()` перетворює `Date` на локалізований рядок.

    const formatter = new Intl.DateTimeFormat("uk-UA");

    const date = new Date();

    console.log(formatter.format(date));

---

## `format()` не змінює `Date`

Наприклад:

    const date = new Date("2026-09-24T12:30:00Z");

    const formatter = new Intl.DateTimeFormat("uk-UA");

    const result = formatter.format(date);

`date` залишається тим самим об'єктом.

`format()` лише створює рядок для відображення.

---

## Важлива модель

Потрібно розділяти:

    Date
      ↓
    момент часу

і

    Intl.DateTimeFormat
      ↓
    представлення цього моменту для користувача

---

# 5. Налаштування дати

За допомогою options можна вказати, які частини дати показувати.

Основні параметри:

    year
    month
    day
    weekday

---

## `year`

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      year: "numeric"
    });

    console.log(formatter.format(new Date()));

---

## `month`

Можливі значення:

    "numeric"
    "2-digit"
    "long"
    "short"
    "narrow"

Приклад:

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      month: "long"
    });

    console.log(formatter.format(new Date()));

Можна отримати назву місяця:

    вересня

---

### `short`

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      month: "short"
    });

Результат може бути скороченим:

    вер.

---

### `2-digit`

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      month: "2-digit"
    });

Наприклад:

    09

---

## `day`

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      day: "numeric"
    });

---

## `weekday`

Можливі значення:

    "long"
    "short"
    "narrow"

Наприклад:

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      weekday: "long"
    });

Результат:

    четвер

---

## Повна дата

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    console.log(formatter.format(new Date()));

---

## День тижня + дата

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });

---

# 6. Налаштування часу

Для часу використовуються:

    hour
    minute
    second
    fractionalSecondDigits
    dayPeriod

---

## Година

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      hour: "numeric"
    });

---

## Година і хвилини

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      hour: "2-digit",
      minute: "2-digit"
    });

Наприклад:

    14:30

---

## Година, хвилини, секунди

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

---

## Мілісекунди

Можна використовувати:

    fractionalSecondDigits

Наприклад:

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3
    });

---

## Дата + час

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

---

# 7. `dateStyle` і `timeStyle`

Для типових форматів можна використовувати готові стилі.

Основні:

    dateStyle:
      "full"
      "long"
      "medium"
      "short"

    timeStyle:
      "full"
      "long"
      "medium"
      "short"

---

## `dateStyle`

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      dateStyle: "full"
    });

---

## `long`

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      dateStyle: "long"
    });

---

## `medium`

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      dateStyle: "medium"
    });

---

## `short`

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      dateStyle: "short"
    });

---

## `timeStyle`

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      timeStyle: "short"
    });

---

## Дата + час

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      dateStyle: "medium",
      timeStyle: "short"
    });

---

## Важливо

Не потрібно одночасно змішувати:

    dateStyle / timeStyle

з окремими компонентами:

    year
    month
    day
    hour
    minute
    second

Тобто не варто робити:

    {
      dateStyle: "long",
      year: "numeric"
    }

Якщо потрібен точний контроль, використовуй окремі параметри.

Якщо потрібен готовий типовий стиль — `dateStyle` / `timeStyle`.

---

# 8. Часовий пояс `timeZone`

`Date` представляє конкретний момент часу.

А `Intl.DateTimeFormat` може показати цей момент у різних часових поясах.

Для цього використовується:

    timeZone

---

## Приклад

    const date = new Date("2026-09-24T12:00:00Z");

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Europe/Kyiv"
    });

    console.log(formatter.format(date));

---

## Інший часовий пояс

    const formatter = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "America/New_York"
    });

---

## Що важливо зрозуміти

`timeZone` не змінює `Date`.

Він змінює лише спосіб представлення моменту часу.

Можна уявляти:

    один момент часу
             │
       ┌─────┴─────┐
       ↓           ↓
    Europe/Kyiv   America/New_York
       ↓           ↓
     15:00         08:00

Це один і той самий момент.

---

## IANA Time Zone

Для `timeZone` використовуються назви IANA:

    Europe/Kyiv
    Europe/London
    Europe/Berlin
    America/New_York
    America/Los_Angeles
    Asia/Tokyo

---

## Не роби так

Не потрібно вручну додавати години:

    date.getHours() + 2

Це ненадійно через:

- літній/зимовий час;
- різні часові пояси;
- історичні зміни правил;
- різну тривалість зміщення.

Краще:

    new Intl.DateTimeFormat("uk-UA", {
      timeZone: "Europe/Kyiv",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);

---

# 9. Локалізація різними мовами

Одна дата може форматуватися для різних користувачів.

    const date = new Date("2026-09-24T12:30:00Z");

    const uk = new Intl.DateTimeFormat("uk-UA", {
      dateStyle: "long"
    });

    const en = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long"
    });

    const de = new Intl.DateTimeFormat("de-DE", {
      dateStyle: "long"
    });

    console.log(uk.format(date));
    console.log(en.format(date));
    console.log(de.format(date));

---

## Практичний принцип

Не створюй окрему логіку:

    if (language === "uk") {
      ...
    }

    if (language === "en") {
      ...
    }

    if (language === "de") {
      ...
    }

для кожного формату вручну.

Краще використовувати:

    Intl.DateTimeFormat(locale, options)

---

# 10. `formatToParts()`

Іноді потрібно не просто отримати готовий рядок, а окремо отримати його частини.

Для цього:

    formatToParts()

---

## Приклад

    const date = new Date("2026-09-24T12:30:00Z");

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    console.log(formatter.formatToParts(date));

Результатом буде масив об'єктів приблизно такого типу:

    [
      { type: "day", value: "24" },
      { type: "literal", value: " " },
      { type: "month", value: "вересня" },
      { type: "literal", value: " " },
      { type: "year", value: "2026" }
    ]

---

## Навіщо це потрібно

Наприклад, якщо потрібно зробити UI:

    24
    вересня
    2026

або окремо стилізувати:

    24        ← великий текст
    вересня   ← маленький текст
    2026      ← інший стиль

Можна використати `formatToParts()`.

---

## `format()` vs `formatToParts()`

    format()
    ↓
    готовий рядок

    formatToParts()
    ↓
    структуровані частини

---

# 11. `Intl.RelativeTimeFormat`

`Intl.RelativeTimeFormat` призначений для відносного часу.

Наприклад:

    сьогодні
    завтра
    вчора
    2 дні тому
    через 3 години

---

## Створення

    const formatter = new Intl.RelativeTimeFormat("uk-UA");

---

## Приклад

    console.log(formatter.format(-1, "day"));

Може бути:

    учора

---

## Майбутнє

    console.log(formatter.format(2, "day"));

Може бути:

    через 2 дні

---

## Основні одиниці

    "second"
    "minute"
    "hour"
    "day"
    "week"
    "month"
    "quarter"
    "year"

---

## `numeric: "auto"`

Можна дозволити `Intl` використовувати природні слова:

    const formatter = new Intl.RelativeTimeFormat("uk-UA", {
      numeric: "auto"
    });

    console.log(formatter.format(-1, "day"));

Наприклад:

    учора

Замість:

    1 день тому

---

## Практичний приклад

    const formatter = new Intl.RelativeTimeFormat("uk-UA", {
      numeric: "auto"
    });

    formatter.format(-1, "day");
    formatter.format(0, "day");
    formatter.format(1, "day");

Це зручно для:

- повідомлень;
- чатів;
- стрічок новин;
- історії активності;
- коментарів;
- social feed.

---

# 12. `Intl.NumberFormat`

`Intl` працює не тільки з датами.

`Intl.NumberFormat` форматує числа відповідно до locale.

---

## Просте число

    const formatter = new Intl.NumberFormat("uk-UA");

    console.log(formatter.format(1234567.89));

Наприклад:

    1 234 567,89

---

## США

    const formatter = new Intl.NumberFormat("en-US");

    console.log(formatter.format(1234567.89));

Може бути:

    1,234,567.89

---

## Валюта

    const formatter = new Intl.NumberFormat("uk-UA", {
      style: "currency",
      currency: "UAH"
    });

    console.log(formatter.format(12500));

---

## Долари

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    });

---

## Євро

    const formatter = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR"
    });

---

## Відсотки

    const formatter = new Intl.NumberFormat("uk-UA", {
      style: "percent"
    });

    console.log(formatter.format(0.75));

---

## Головна ідея

Замість ручного:

    `${price} грн`

можна використовувати локалізований formatter.

---

# 13. `Intl.ListFormat`

`Intl.ListFormat` форматує списки відповідно до locale.

Наприклад:

    const formatter = new Intl.ListFormat("uk-UA");

    console.log(
      formatter.format(["HTML", "CSS", "JavaScript"])
    );

Може бути:

    HTML, CSS та JavaScript

---

## Англійська

    const formatter = new Intl.ListFormat("en-US");

    console.log(
      formatter.format(["HTML", "CSS", "JavaScript"])
    );

Може бути:

    HTML, CSS, and JavaScript

---

## `type`

Можна використовувати:

    "conjunction"

або:

    "disjunction"

---

## `conjunction`

Означає логіку:

    A, B та C

---

## `disjunction`

Означає:

    A, B або C

Приклад:

    const formatter = new Intl.ListFormat("uk-UA", {
      type: "disjunction"
    });

    formatter.format(["Chrome", "Firefox", "Safari"]);

---

# 14. `Intl.PluralRules`

`Intl.PluralRules` допомагає визначати форму множини для locale.

Це особливо важливо для української мови.

Наприклад:

    1 день
    2 дні
    5 днів

Не можна просто написати:

    `${count} день`

для всіх чисел.

---

## Приклад

    const pluralRules = new Intl.PluralRules("uk-UA");

    console.log(pluralRules.select(1));
    console.log(pluralRules.select(2));
    console.log(pluralRules.select(5));

Можна отримати категорії:

    one
    few
    many
    other

---

## Практичне застосування

    const rules = new Intl.PluralRules("uk-UA");

    const category = rules.select(count);

    switch (category) {
      case "one":
        return `${count} день`;

      case "few":
        return `${count} дні`;

      case "many":
        return `${count} днів`;

      default:
        return `${count} дня`;
    }

Це спрощений приклад.

У реальних i18n-системах plural rules зазвичай інтегровані в бібліотеки локалізації.

---

# 15. `Intl.Collator`

`Intl.Collator` використовується для локалізованого порівняння рядків.

Це важливо при сортуванні тексту.

---

## Проблема простого сортування

    const names = ["Іван", "Андрій", "Олена"];

    names.sort();

Результат залежить від правил порівняння Unicode-рядків.

Для локалізованого сортування краще:

    const collator = new Intl.Collator("uk-UA");

    names.sort(collator.compare);

---

## Приклад

    const collator = new Intl.Collator("uk-UA");

    console.log(
      collator.compare("Андрій", "Олена")
    );

Результат:

    < 0

означає, що перший рядок сортується перед другим.

---

## Практичне застосування

Наприклад, сортування:

    users.sort(
      (a, b) => collator.compare(a.name, b.name)
    );

Це набагато правильніше для локалізованого UI.

---

# 16. `Intl.DisplayNames`

`Intl.DisplayNames` дозволяє отримати локалізовану назву певної сутності.

Наприклад:

- мови;
- регіони;
- валюти;
- деякі інші типи.

---

## Мова

    const displayNames = new Intl.DisplayNames("uk-UA", {
      type: "language"
    });

    console.log(displayNames.of("en"));

Результат:

    англійська

---

## Країна

    const displayNames = new Intl.DisplayNames("uk-UA", {
      type: "region"
    });

    console.log(displayNames.of("US"));

---

## Валюта

    const displayNames = new Intl.DisplayNames("uk-UA", {
      type: "currency"
    });

    console.log(displayNames.of("USD"));

---

# 17. `Intl.Locale`

`Intl.Locale` представляє locale як окремий об'єкт.

---

## Приклад

    const locale = new Intl.Locale("uk-UA");

    console.log(locale.language);
    console.log(locale.region);

Результат:

    uk
    UA

---

## Навіщо це потрібно

Це корисно, коли потрібно працювати з locale програмно.

Наприклад:

    const locale = new Intl.Locale("en-US");

    console.log(locale.language);
    console.log(locale.region);

---

## Основна ідея

Замість простого рядка:

    "uk-UA"

можна працювати з:

    new Intl.Locale("uk-UA")

і отримувати окремі компоненти locale.

---

# 18. `Intl` у Full Stack застосунках

Це особливо важливо для твоєї Full Stack практики.

Типова архітектура:

    PostgreSQL
         ↓
    Node / NestJS
         ↓
    API
         ↓
    React / Next.js
         ↓
    Intl
         ↓
    UI

---

## База даних

У базі краще зберігати дані в машинному форматі.

Наприклад:

    2026-09-24T12:30:00.000Z

а не:

    24 вересня 2026 року, 15:30

---

## Backend

Backend передає:

    {
      "createdAt": "2026-09-24T12:30:00.000Z"
    }

---

## Frontend

Frontend отримує:

    const date = new Date(data.createdAt);

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      dateStyle: "long",
      timeStyle: "short"
    });

    console.log(formatter.format(date));

---

## Чому так правильно

Backend передає:

    універсальні дані

Frontend вирішує:

    як показати ці дані користувачу

---

## Не зберігай локалізований текст як основні дані

Не потрібно:

    "24 вересня 2026 року о 15:30"

як canonical value.

Краще:

    "2026-09-24T12:30:00.000Z"

і вже UI вирішує, як це показати.

---

# 19. Типові помилки

## ❌ 1. Ручне форматування всіх локалей

Погано:

    if (locale === "uk-UA") {
      return `${day}.${month}.${year}`;
    }

    if (locale === "en-US") {
      return `${month}/${day}/${year}`;
    }

    if (locale === "de-DE") {
      return `${day}.${month}.${year}`;
    }

Для простих специфічних форматів ручний код іноді допустимий.

Але для локалізації краще використовувати `Intl`.

---

## ❌ 2. Ручний переклад назв місяців

Не потрібно створювати:

    const months = {
      uk: [
        "січень",
        "лютий",
        "березень"
      ],
      en: [
        "January",
        "February",
        "March"
      ]
    };

Для стандартного форматування:

    Intl.DateTimeFormat

вже вирішує цю задачу.

---

## ❌ 3. Ручне додавання timezone

Погано:

    const kyivHour = date.getUTCHours() + 2;

Часовий пояс не завжди має постійне зміщення.

Краще:

    new Intl.DateTimeFormat("uk-UA", {
      timeZone: "Europe/Kyiv",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);

---

## ❌ 4. Зберігати UI-рядок у БД

Погано:

    created_at = "24 вересня 2026"

Краще:

    created_at = timestamp

---

## ❌ 5. Плутати locale і timezone

Це різні поняття.

`locale`:

    uk-UA

визначає:

    мову + регіональні правила форматування

`timeZone`:

    Europe/Kyiv

визначає:

    часовий пояс представлення моменту

Наприклад:

    Intl.DateTimeFormat("uk-UA", {
      timeZone: "America/New_York"
    })

Українська мова.

Але часовий пояс:

    New York

---

## ❌ 6. Думати, що `Intl` змінює Date

Наприклад:

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      timeZone: "Europe/Kyiv"
    });

`formatter.format(date)` не змінює `date`.

Він лише створює представлення.

---

## ❌ 7. Використовувати `toLocaleString()` без розуміння locale

Можна:

    date.toLocaleString("uk-UA");

Але для складного або повторюваного форматування краще:

    new Intl.DateTimeFormat("uk-UA", options)

---

# 20. Що потрібно знати на різних рівнях

## 🟢 Core

Потрібно розуміти:

- що таке `Intl`;
- що таке locale;
- `uk-UA`;
- `en-US`;
- `Intl.DateTimeFormat`;
- `format()`;
- основні options;
- `Intl.NumberFormat`;
- різницю між даними і представленням.

Приклад:

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });

    formatter.format(new Date());

---

# 🟡 Junior

Потрібно знати:

- `Intl.DateTimeFormat`;
- `dateStyle`;
- `timeStyle`;
- `timeZone`;
- `formatToParts()`;
- `Intl.RelativeTimeFormat`;
- `Intl.NumberFormat`;
- currency;
- percent;
- locale;
- IANA timezone;
- локалізацію UI.

---

# 🟠 Middle

Потрібно розуміти:

- локалізаційну архітектуру;
- frontend/backend відповідальність;
- UTC;
- timezone;
- locale;
- API timestamps;
- локалізоване сортування;
- plural rules;
- performance повторного використання formatter;
- date/time edge cases;
- багатомовний UI.

Наприклад:

    const formatter = new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone
    });

---

# 🔴 Senior

На Senior-рівні важливо вже не просто знати API.

Потрібно розуміти:

- internationalization architecture;
- localization architecture;
- timezone strategy;
- server/client boundaries;
- SSR;
- hydration;
- locale negotiation;
- fallback locales;
- user preferences;
- date-only vs instant;
- calendar systems;
- pluralization;
- formatting consistency;
- performance;
- accessibility;
- testing локалізованого UI.

Особливо важливо:

> Інтернаціоналізація — це не переклад тексту. Це адаптація поведінки UI до мови, регіону, правил форматування та культурних conventions.

---

# 21. Питання для співбесіди

## Базові

### 1. Що таке `Intl`?

API JavaScript для локалізації та форматування даних відповідно до locale.

---

### 2. Що таке locale?

Locale визначає мову та регіональні правила представлення даних.

Наприклад:

    uk-UA
    en-US
    de-DE

---

### 3. Що робить `Intl.DateTimeFormat`?

Форматує дату/час відповідно до locale та заданих options.

---

### 4. Чим `locale` відрізняється від `timeZone`?

`locale`:

    uk-UA

визначає правила форматування.

`timeZone`:

    Europe/Kyiv

визначає часовий пояс представлення моменту.

---

### 5. Що робить `format()`?

Перетворює дату на локалізований рядок.

---

### 6. Для чого `formatToParts()`?

Щоб отримати окремі структуровані частини форматованого значення.

---

### 7. Для чого `Intl.RelativeTimeFormat`?

Для представлення відносного часу:

    учора
    через 2 дні
    5 хвилин тому

---

### 8. Для чого `Intl.NumberFormat`?

Для локалізованого форматування чисел, валют, відсотків тощо.

---

### 9. Чому не варто вручну додавати години для timezone?

Через складність правил часових поясів і переходів між стандартним та літнім часом.

---

### 10. Де краще форматувати дату — backend чи frontend?

Залежить від архітектури, але часто backend передає машинний timestamp, а frontend форматує його відповідно до locale і timezone користувача.

---

# 22. Mini Cheat Sheet

## Date

    const date = new Date();

---

## Basic formatter

    const formatter = new Intl.DateTimeFormat("uk-UA");

    formatter.format(date);

---

## Date

    new Intl.DateTimeFormat("uk-UA", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);

---

## Date + weekday

    new Intl.DateTimeFormat("uk-UA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);

---

## Time

    new Intl.DateTimeFormat("uk-UA", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);

---

## Date + time

    new Intl.DateTimeFormat("uk-UA", {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(date);

---

## Timezone

    new Intl.DateTimeFormat("uk-UA", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Europe/Kyiv"
    }).format(date);

---

## Parts

    new Intl.DateTimeFormat("uk-UA", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).formatToParts(date);

---

## Relative time

    new Intl.RelativeTimeFormat("uk-UA", {
      numeric: "auto"
    }).format(-1, "day");

---

## Number

    new Intl.NumberFormat("uk-UA")
      .format(1234567.89);

---

## Currency

    new Intl.NumberFormat("uk-UA", {
      style: "currency",
      currency: "UAH"
    }).format(12500);

---

## Percent

    new Intl.NumberFormat("uk-UA", {
      style: "percent"
    }).format(0.75);

---

## List

    new Intl.ListFormat("uk-UA")
      .format(["HTML", "CSS", "JavaScript"]);

---

## Plural

    const rules = new Intl.PluralRules("uk-UA");

    rules.select(1);
    rules.select(2);
    rules.select(5);

---

## Collator

    const collator = new Intl.Collator("uk-UA");

    names.sort(collator.compare);

---

## Display name

    const names = new Intl.DisplayNames("uk-UA", {
      type: "language"
    });

    names.of("en");

---

# 23. Головні правила

## Правило 1

`Intl` — це не тільки дати.

    Intl
    ├── DateTimeFormat
    ├── RelativeTimeFormat
    ├── NumberFormat
    ├── ListFormat
    ├── PluralRules
    ├── Collator
    ├── DisplayNames
    └── Locale

---

## Правило 2

Для дат і часу основний інструмент:

    Intl.DateTimeFormat

---

## Правило 3

Для відносного часу:

    Intl.RelativeTimeFormat

---

## Правило 4

Для чисел:

    Intl.NumberFormat

---

## Правило 5

`locale` і `timeZone` — різні поняття.

    locale
    ↓
    як показувати

    timeZone
    ↓
    у якому часовому поясі показувати

---

## Правило 6

Не змішуй дані та їхнє представлення.

    Database
        ↓
    timestamp
        ↓
    API
        ↓
    Date
        ↓
    Intl
        ↓
    localized UI

---

## Правило 7

Не перекладай стандартні дати вручну.

Замість:

    "24 вересня 2026"

вручну формувати рядок краще:

    new Intl.DateTimeFormat("uk-UA", {
      dateStyle: "long"
    }).format(date);

---

## Правило 8

Не змінюй timezone вручну арифметикою.

Замість:

    hour + 2

використовуй:

    timeZone: "Europe/Kyiv"

---

## Правило 9

Для користувацького UI використовуй locale.

Наприклад:

    uk-UA
    en-US
    en-GB
    de-DE

---

## Правило 10

Для API та БД використовуй машинний формат, а не локалізований текст.

    "2026-09-24T12:30:00.000Z"

краще як canonical value, ніж:

    "24 вересня 2026 року о 15:30"

---

# 🧠 Головна модель `Intl`

Запам'ятай цю схему:

    ┌──────────────────────────┐
    │        RAW DATA          │
    │                          │
    │ timestamp / number / ... │
    └────────────┬─────────────┘
                 │
                 ↓
    ┌──────────────────────────┐
    │          Intl            │
    │                          │
    │ locale + options         │
    │ timezone + rules         │
    └────────────┬─────────────┘
                 │
                 ↓
    ┌──────────────────────────┐
    │           UI             │
    │                          │
    │ 24 вересня 2026, 15:30   │
    └──────────────────────────┘

Тобто:

> **Дані зберігаються у машинному форматі, а `Intl` перетворює їх у зрозуміле користувачу локалізоване представлення.**

---

# 🎯 Що потрібно реально запам'ятати

Якщо скоротити весь розділ `05-intl` до найважливішого:

    Intl
    ↓
    інтернаціоналізація

    locale
    ↓
    uk-UA / en-US / de-DE

    Intl.DateTimeFormat
    ↓
    дата + час

    Intl.RelativeTimeFormat
    ↓
    "учора" / "через 2 дні"

    Intl.NumberFormat
    ↓
    числа / валюта / %

    Intl.ListFormat
    ↓
    локалізовані списки

    Intl.PluralRules
    ↓
    правила множини

    Intl.Collator
    ↓
    локалізоване сортування

    Intl.DisplayNames
    ↓
    локалізовані назви

    timeZone
    ↓
    Europe/Kyiv / America/New_York / ...

    format()
    ↓
    готовий рядок

    formatToParts()
    ↓
    структуровані частини

---

# 🔗 Зв'язок з попередніми темами

Розділ:

    10-date-and-time
        │
        ├── 01-date
        │
        ├── 02-date-comparison
        │
        ├── 03-date-arithmetic
        │
        ├── 04-formatting
        │
        └── 05-intl
                ↓
          локалізація

Логіка вивчення:

    01-date
        ↓
    Що таке Date?

        ↓

    02-date-comparison
        ↓
    Як порівнювати моменти часу?

        ↓

    03-date-arithmetic
        ↓
    Як виконувати операції з датами?

        ↓

    04-formatting
        ↓
    Як перетворювати Date у текст?

        ↓

    05-intl
        ↓
    Як показати цей текст правильно
    для різних мов, регіонів і часових поясів?

---

# 🚀 Практичний Full Stack рівень

Для Full Stack JavaScript тобі особливо важливо бачити весь ланцюжок:

    PostgreSQL
        ↓
    timestamp
        ↓
    Node.js / NestJS
        ↓
    JSON API
        ↓
    ISO string
        ↓
    React / Next.js
        ↓
    new Date(...)
        ↓
    Intl.DateTimeFormat(...)
        ↓
    локалізований UI

Наприклад:

    // API
    {
      "createdAt": "2026-09-24T12:30:00.000Z"
    }

    // Frontend
    const date = new Date(data.createdAt);

    const formatter = new Intl.DateTimeFormat("uk-UA", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Europe/Kyiv"
    });

    const text = formatter.format(date);

Саме така модель з'єднує:

    JavaScript
    +
    Date
    +
    API
    +
    PostgreSQL
    +
    timezone
    +
    localization
    +
    UI

і є важливою частиною реального Full Stack застосунку.