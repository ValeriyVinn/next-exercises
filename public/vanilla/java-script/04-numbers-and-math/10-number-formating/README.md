# 10. Number Formatting

> Форматування чисел у JavaScript: десяткові знаки, розділювачі тисяч, відсотки, валюта та підготовка чисел до відображення в UI.

---

## 📚 Зміст

1. [Що таке Number Formatting](#1-що-таке-number-formatting)
2. [`toFixed()`](#2-tofixed)
3. [`toPrecision()`](#3-toprecision)
4. [`toExponential()`](#4-toexponential)
5. [`Intl.NumberFormat`](#5-intlnumberformat)
6. [Розділювачі тисяч](#6-розділювачі-тисяч)
7. [Десяткові знаки](#7-десяткові-знаки)
8. [Відсотки](#8-відсотки)
9. [Валюта](#9-валюта)
10. [Округлення та форматування](#10-округлення-та-форматування)
11. [Число чи String?](#11-число-чи-string)
12. [Форматування через `Intl.NumberFormat`](#12-форматування-через-intlnumberformat)
13. [Практичні функції](#13-практичні-функції)
14. [Форматування у UI](#14-форматування-у-ui)
15. [Типові помилки](#15-типові-помилки)
16. [Практичні вправи](#16-практичні-вправи)
17. [Mini Projects](#17-mini-projects)
18. [Рівні засвоєння](#18-рівні-засвоєння)
19. [Питання на співбесіді](#19-питання-на-співбесіді)
20. [Пов'язані теми](#20-повязані-теми)
21. [Швидка шпаргалка](#21-швидка-шпаргалка)
22. [Головне правило](#22-головне-правило)

---

# 1. Що таке Number Formatting

**Number Formatting** — це перетворення числового значення у зручний для людини вигляд.

Наприклад, JavaScript має число:

    const value = 1234567.89;

Для програми це:

    1234567.89

А для користувача можна показати:

    1,234,567.89

або український варіант:

    1 234 567,89

або як валюту:

    1 234 567,89 грн

або як відсоток:

    85,5 %

---

## Важливо розділяти

### Значення

    const price = 1234.5;

### Відображення

    "1 234,50 грн"

Значення залишається числом:

    1234.5

А форматування створює текст для користувача.

---

# 2. `toFixed()`

`toFixed()` використовується для форматування числа з певною кількістю знаків після десяткової крапки.

Синтаксис:

    number.toFixed(digits)

Наприклад:

    const price = 19.9;

    console.log(price.toFixed(2));
    // "19.90"

---

## Один знак

    const value = 12.3456;

    console.log(value.toFixed(1));
    // "12.3"

---

## Два знаки

    console.log(value.toFixed(2));
    // "12.35"

---

## Три знаки

    console.log(value.toFixed(3));
    // "12.346"

---

## `toFixed()` округлює

    const value = 3.14159;

    console.log(value.toFixed(2));
    // "3.14"

    console.log(value.toFixed(3));
    // "3.142"

---

## Важливо: результат — String

    const result = (19.9).toFixed(2);

    console.log(result);
    // "19.90"

    console.log(typeof result);
    // "string"

Це одна з найважливіших особливостей `toFixed()`.

---

## Якщо потрібно знову отримати Number

    const result = Number((19.9).toFixed(2));

    console.log(result);
    // 19.9

    console.log(typeof result);
    // "number"

Але пам'ятай:

    Number("19.90")
    // 19.9

Число не зберігає інформацію про кількість нулів після крапки.

---

## `toFixed()` і гроші

Наприклад:

    const price = 19.9;

    console.log(price.toFixed(2));
    // "19.90"

Це зручно саме для відображення ціни.

---

# 3. `toPrecision()`

`toPrecision()` форматує число за загальною кількістю значущих цифр.

Синтаксис:

    number.toPrecision(precision)

Наприклад:

    const value = 123.456;

    console.log(value.toPrecision(4));
    // "123.5"

Тут враховуються всі значущі цифри, а не тільки цифри після десяткової крапки.

---

## Порівняння

    const value = 123.456;

    console.log(value.toFixed(2));
    // "123.46"

    console.log(value.toPrecision(4));
    // "123.5"

---

## Ще приклад

    const value = 12.3456;

    console.log(value.toPrecision(3));
    // "12.3"

---

## Для малих чисел

    const value = 0.00123456;

    console.log(value.toPrecision(3));
    // "0.00123"

---

## Для великих чисел

`toPrecision()` може використовувати експоненційну форму.

Наприклад:

    const value = 123456789;

    console.log(value.toPrecision(4));
    // "1.235e+8"

---

## Коли використовувати

`toPrecision()` корисний, коли важлива **загальна кількість значущих цифр**.

Наприклад:

    123.5
    12.35
    1.235

У всіх випадках можна контролювати кількість значущих цифр.

---

# 4. `toExponential()`

`toExponential()` представляє число в експоненційній формі.

Синтаксис:

    number.toExponential(digits)

Наприклад:

    const value = 123456;

    console.log(value.toExponential(2));
    // "1.23e+5"

---

## Маленьке число

    const value = 0.0000123;

    console.log(value.toExponential(2));
    // "1.23e-5"

---

## Велике число

    const value = 123456789;

    console.log(value.toExponential(3));
    // "1.235e+8"

---

## Що означає `e`

Наприклад:

    1.23e+5

означає:

    1.23 × 10⁵

тобто:

    123000

---

## Коли це потрібно

У звичайному UI `toExponential()` використовується рідко.

Він корисний для:

- наукових розрахунків;
- дуже великих чисел;
- дуже малих чисел;
- технічних даних;
- scientific notation.

---

# 5. `Intl.NumberFormat`

Для реального форматування чисел у UI дуже важливим інструментом є:

    Intl.NumberFormat

Це стандартний API JavaScript для локалізованого форматування чисел.

Наприклад:

    const formatter = new Intl.NumberFormat("uk-UA");

    console.log(formatter.format(1234567.89));

Результат буде локалізований відповідно до українських правил форматування.

---

## Простий варіант

    const formatter = new Intl.NumberFormat("en-US");

    console.log(formatter.format(1234567.89));
    // "1,234,567.89"

---

## Українська локаль

    const formatter = new Intl.NumberFormat("uk-UA");

    console.log(formatter.format(1234567.89));

Результат має український формат розділення тисяч і десяткової частини.

Типово:

    "1 234 567,89"

---

## Німецька локаль

    const formatter = new Intl.NumberFormat("de-DE");

    console.log(formatter.format(1234567.89));

Типовий результат:

    "1.234.567,89"

---

## Локаль змінює формат

Одне число:

    1234567.89

може відображатися як:

    en-US → 1,234,567.89
    de-DE → 1.234.567,89
    uk-UA → 1 234 567,89

Саме тому для міжнародних застосунків не варто вручну створювати розділювачі.

---

# 6. Розділювачі тисяч

Без форматування:

    const value = 1234567.89;

    console.log(value);
    // 1234567.89

З форматуванням:

    const formatter = new Intl.NumberFormat("uk-UA");

    console.log(formatter.format(value));

Отримаємо зручне для користувача представлення числа.

---

## Мінімальна кількість знаків

Можна задати:

    minimumFractionDigits

Наприклад:

    const formatter = new Intl.NumberFormat("uk-UA", {
        minimumFractionDigits: 2
    });

    console.log(formatter.format(1234.5));

Результат:

    "1 234,50"

---

## Максимальна кількість знаків

    const formatter = new Intl.NumberFormat("uk-UA", {
        maximumFractionDigits: 2
    });

Наприклад:

    console.log(formatter.format(1234.5678));

Результат буде округлений до двох знаків після коми.

---

## Мінімум і максимум одночасно

    const formatter = new Intl.NumberFormat("uk-UA", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

Тоді:

    1234
    → "1 234,00"

    1234.5
    → "1 234,50"

    1234.567
    → "1 234,57"

---

# 7. Десяткові знаки

Один із найчастіших випадків:

> Показати число максимум з двома знаками після коми.

Наприклад:

    const formatter = new Intl.NumberFormat("uk-UA", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    console.log(formatter.format(19.9));
    // "19,90"

---

## Максимум без обов'язкового нуля

    const formatter = new Intl.NumberFormat("uk-UA", {
        maximumFractionDigits: 2
    });

Тоді:

    19
    → "19"

    19.5
    → "19,5"

    19.567
    → "19,57"

---

## Мінімум та максимум

Корисне правило:

    minimumFractionDigits
        ↓
    скільки знаків мінімально показувати

    maximumFractionDigits
        ↓
    скільки знаків максимально показувати

---

# 8. Відсотки

`Intl.NumberFormat` дозволяє форматувати число як відсоток.

Наприклад:

    const formatter = new Intl.NumberFormat("uk-UA", {
        style: "percent"
    });

    console.log(formatter.format(0.85));

Результат:

    "85%"

---

## Важливо

Для `style: "percent"`:

    0.85
    → 85%

    0.5
    → 50%

    0.125
    → 12,5%

Тобто:

    1 = 100%
    0.5 = 50%
    0.1 = 10%

---

## Два знаки після коми

    const formatter = new Intl.NumberFormat("uk-UA", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    console.log(formatter.format(0.8567));
    // "85,67%"

---

## Практичний приклад

    const completed = 85;
    const total = 100;

    const progress = completed / total;

    const formatter = new Intl.NumberFormat("uk-UA", {
        style: "percent"
    });

    console.log(formatter.format(progress));
    // "85%"

---

# 9. Валюта

`Intl.NumberFormat` особливо корисний для валют.

Наприклад:

    const formatter = new Intl.NumberFormat("uk-UA", {
        style: "currency",
        currency: "UAH"
    });

    console.log(formatter.format(1234.5));

Отримаємо локалізоване представлення суми в гривнях.

---

## Долари

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });

    console.log(formatter.format(1234.5));
    // "$1,234.50"

---

## Євро

    const formatter = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR"
    });

    console.log(formatter.format(1234.5));

---

## Гривні

    const formatter = new Intl.NumberFormat("uk-UA", {
        style: "currency",
        currency: "UAH"
    });

    console.log(formatter.format(1234.5));

---

## Важливо

Не потрібно вручну створювати:

    "$" + price

або:

    price + " грн"

якщо потрібне повноцінне локалізоване форматування.

Краще:

    Intl.NumberFormat

---

# 10. Округлення та форматування

Потрібно розуміти різницю між:

    rounding

і:

    formatting

---

## Rounding

Округлення змінює числовий результат.

Наприклад:

    const value = 3.14159;

    const rounded =
        Math.round(value * 100) / 100;

    console.log(rounded);
    // 3.14

Тип:

    number

---

## Formatting

Форматування створює текст для користувача.

Наприклад:

    const formatted =
        value.toFixed(2);

    console.log(formatted);
    // "3.14"

Тип:

    string

---

## `Intl.NumberFormat`

Також повертає текст:

    const formatter = new Intl.NumberFormat("uk-UA");

    const formatted = formatter.format(1234567.89);

    console.log(typeof formatted);
    // "string"

---

## Головна різниця

    number
       ↓
    calculations
       ↓
    formatting
       ↓
    string
       ↓
    UI

Не потрібно форматувати число занадто рано.

---

# 11. Число чи String?

Це дуже важливе практичне питання.

Порівняй:

    const a = 19.9;

    const b = a.toFixed(2);

    console.log(typeof a);
    // "number"

    console.log(typeof b);
    // "string"

---

## `Intl.NumberFormat`

    const formatter = new Intl.NumberFormat("uk-UA");

    const value = formatter.format(1234.5);

    console.log(typeof value);
    // "string"

---

## Чому це важливо?

Не потрібно робити:

    const price = 19.9;

    const formattedPrice = price.toFixed(2);

    const total = formattedPrice * 2;

JavaScript може автоматично перетворити String назад у Number, але це поганий стиль для такого коду.

Краще:

    const price = 19.9;

    const total = price * 2;

    const formattedTotal = total.toFixed(2);

---

## Правильний порядок

    data
      ↓
    number
      ↓
    calculations
      ↓
    final number
      ↓
    formatting
      ↓
    string
      ↓
    UI

---

# 12. Форматування через `Intl.NumberFormat`

## Створення formatter

    const formatter = new Intl.NumberFormat("uk-UA");

    formatter.format(1234567.89);

---

## `minimumFractionDigits`

    const formatter = new Intl.NumberFormat("uk-UA", {
        minimumFractionDigits: 2
    });

---

## `maximumFractionDigits`

    const formatter = new Intl.NumberFormat("uk-UA", {
        maximumFractionDigits: 2
    });

---

## Currency

    const formatter = new Intl.NumberFormat("uk-UA", {
        style: "currency",
        currency: "UAH"
    });

---

## Percent

    const formatter = new Intl.NumberFormat("uk-UA", {
        style: "percent"
    });

---

## Unit

`Intl.NumberFormat` також може форматувати одиниці.

Наприклад:

    const formatter = new Intl.NumberFormat("uk-UA", {
        style: "unit",
        unit: "kilometer"
    });

    console.log(formatter.format(120));

Результат буде локалізованим представленням:

    120 км

---

## Інший приклад

    const formatter = new Intl.NumberFormat("uk-UA", {
        style: "unit",
        unit: "celsius"
    });

    console.log(formatter.format(23));

Результат буде локалізованим представленням температури.

---

# 13. Практичні функції

## 13.1. Форматування до двох знаків

    function formatDecimal(value) {
        return value.toFixed(2);
    }

Використання:

    console.log(formatDecimal(19.9));
    // "19.90"

---

## 13.2. Форматування числа для українського UI

    function formatNumber(value) {
        return new Intl.NumberFormat("uk-UA").format(value);
    }

Використання:

    console.log(formatNumber(1234567.89));

---

## 13.3. Форматування валюти

    function formatCurrency(value, currency = "UAH") {
        return new Intl.NumberFormat("uk-UA", {
            style: "currency",
            currency
        }).format(value);
    }

Використання:

    console.log(formatCurrency(1234.5));

---

## 13.4. Форматування відсотка

    function formatPercent(value) {
        return new Intl.NumberFormat("uk-UA", {
            style: "percent",
            maximumFractionDigits: 2
        }).format(value);
    }

Використання:

    console.log(formatPercent(0.8567));
    // "85,67%"

---

## 13.5. Форматування кількості

    function formatCount(value) {
        return new Intl.NumberFormat("uk-UA").format(value);
    }

Використання:

    console.log(formatCount(1500000));

---

# 14. Форматування у UI

У реальному Full Stack застосунку дані часто приходять з backend:

    API
      ↓
    JSON
      ↓
    number
      ↓
    React component
      ↓
    formatting
      ↓
    user

Наприклад backend повертає:

    {
        "price": 1999.9,
        "quantity": 1500,
        "discount": 0.15
    }

Не потрібно зберігати:

    "1 999,90 грн"

як основне значення.

Краще зберігати:

    1999.9

А форматувати тільки при відображенні.

---

## React-приклад

У компоненті:

    const price = 1999.9;

    const formattedPrice = new Intl.NumberFormat("uk-UA", {
        style: "currency",
        currency: "UAH"
    }).format(price);

    console.log(formattedPrice);

І вже:

    formattedPrice

показується користувачу.

---

## Чому це важливо

Backend:

    1999.9

Database:

    1999.9

Frontend state:

    1999.9

UI:

    "1 999,90 грн"

Тобто:

> Дані зберігаємо як дані, форматування застосовуємо на межі відображення.

---

# 15. Типові помилки

## ❌ Помилка 1. Зберігати відформатоване число замість Number

Погано:

    const price = "1 999,90 грн";

Краще:

    const price = 1999.9;

А форматувати:

    formatCurrency(price);

---

## ❌ Помилка 2. Форматувати число перед математичними операціями

Погано:

    const price = 19.9.toFixed(2);

    const total = price * 3;

Тут `price` вже String.

Краще:

    const price = 19.9;

    const total = price * 3;

    const formattedTotal = total.toFixed(2);

---

## ❌ Помилка 3. Плутати `toFixed()` і `toPrecision()`

`toFixed()`:

    2 знаки після крапки

`toPrecision()`:

    загальна кількість значущих цифр

---

## ❌ Помилка 4. Вручну вставляти розділювачі

Погано:

    const value = "1,234,567.89";

Таке форматування залежить від локалі.

Краще:

    new Intl.NumberFormat("uk-UA").format(value);

---

## ❌ Помилка 5. Вручну додавати валютний символ

Погано:

    "$" + price

Краще для локалізованого UI:

    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(price);

---

## ❌ Помилка 6. Плутати `%` та decimal value

Для:

    85%

потрібно передати:

    0.85

а не:

    85

Наприклад:

    new Intl.NumberFormat("uk-UA", {
        style: "percent"
    }).format(0.85);

---

## ❌ Помилка 7. Очікувати, що `toFixed()` повертає Number

    const value = (10).toFixed(2);

    console.log(typeof value);
    // "string"

---

## ❌ Помилка 8. Форматувати дані на backend без необхідності

Backend може повернути:

    1234567.89

А frontend вже може показати:

    1 234 567,89

залежно від мови користувача.

---

# 16. Практичні вправи

## Вправа 1 — `toFixed()`

Створи:

    const price = 19.999;

Покажи:

    19.99

через:

    toFixed()

---

## Вправа 2 — Перевір тип

Перевір:

    const result = (19.99).toFixed(2);

    console.log(typeof result);

Поясни, чому результат — `string`.

---

## Вправа 3 — `toPrecision()`

Спробуй:

    const value = 123.456789;

    value.toPrecision(4);
    value.toPrecision(6);

Порівняй результати.

---

## Вправа 4 — `toExponential()`

Спробуй:

    const value = 123456789;

    value.toExponential(2);

Поясни результат.

---

## Вправа 5 — Локаль

Відформатуй:

    const value = 1234567.89;

для:

    en-US
    uk-UA
    de-DE

Порівняй результати.

---

## Вправа 6 — Валюта

Створи форматування:

    1999.9

як:

    UAH
    USD
    EUR

---

## Вправа 7 — Відсоток

Створи:

    const completed = 87;
    const total = 100;

Обчисли:

    completed / total

і відформатуй як:

    87%

---

## Вправа 8 — Два десяткові знаки

Створи formatter:

    const formatter = new Intl.NumberFormat("uk-UA", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

Перевір:

    10
    10.5
    10.567

---

## Вправа 9 — Ціна товару

Створи:

    const price = 1499.9;
    const quantity = 3;

Обчисли:

    total

і покажи результат як валюту.

---

# 17. Mini Projects

## 💰 Mini Project 1 — Price Formatter

Створи функцію:

    formatPrice(price)

Вона повинна перетворювати:

    19.9

на локалізоване представлення ціни.

Приклади:

    19.9
    1999.99
    1500000

---

## 📊 Mini Project 2 — Statistics Formatter

Створи об'єкт:

    const statistics = {
        users: 125000,
        revenue: 1234567.89,
        conversion: 0.1567
    };

Покажи:

    users
    revenue
    conversion

у зручному форматі.

Наприклад:

    Users: 125 000
    Revenue: 1 234 567,89 грн
    Conversion: 15,67%

---

## 🛒 Mini Project 3 — Shopping Cart

Створи кошик:

    const products = [
        {
            name: "Book",
            price: 299.9,
            quantity: 2
        },
        {
            name: "Notebook",
            price: 89.5,
            quantity: 3
        }
    ];

Обчисли:

    subtotal

і покажи кожну ціну та загальну суму у форматі валюти.

---

## 📈 Mini Project 4 — Dashboard

Створи dashboard з:

    users
    revenue
    orders
    conversion
    averageOrderValue

Кожне число повинно мати власний формат:

    users
        → integer

    revenue
        → currency

    orders
        → integer

    conversion
        → percent

    averageOrderValue
        → currency

Це дуже близько до реальної роботи з даними у React/Next.js.

---

# 18. Рівні засвоєння

## 🟢 Level 1 — Beginner

Ти знаєш:

- `toFixed()`;
- `toPrecision()`;
- `toExponential()`;
- що форматування повертає String;
- різницю між Number і String.

---

## 🟡 Level 2 — Junior

Ти вмієш:

- форматувати десяткові числа;
- форматувати тисячі;
- використовувати `Intl.NumberFormat`;
- працювати з locale;
- форматувати відсотки;
- форматувати валюту.

---

## 🟠 Level 3 — Strong Junior

Ти розумієш:

- `minimumFractionDigits`;
- `maximumFractionDigits`;
- `style: "currency"`;
- `style: "percent"`;
- `style: "unit"`;
- різницю між data та presentation;
- чому не варто зберігати відформатовані числа.

---

## 🔴 Level 4 — Full Stack

Ти правильно організовуєш потік:

    Database
        ↓
    Backend
        ↓
    API
        ↓
    JSON
        ↓
    Number
        ↓
    Frontend
        ↓
    Intl.NumberFormat
        ↓
    UI

І розумієш:

> Форматування — це presentation layer, а не спосіб зберігання даних.

---

# 19. Питання на співбесіді

### 1. Що робить `toFixed()`?

Форматує число з заданою кількістю знаків після десяткової крапки та повертає `string`.

---

### 2. Чим `toFixed()` відрізняється від `toPrecision()`?

`toFixed()` визначає кількість знаків після десяткової крапки.

`toPrecision()` визначає загальну кількість значущих цифр.

---

### 3. Що робить `toExponential()`?

Представляє число в експоненційній формі.

---

### 4. Що таке `Intl.NumberFormat`?

Стандартний JavaScript API для локалізованого форматування чисел.

---

### 5. Навіщо потрібна locale?

Locale визначає правила відображення чисел:

- розділювач тисяч;
- десятковий розділювач;
- формат валюти;
- формат відсотків;
- інші локалізовані правила.

---

### 6. Чому краще використовувати `Intl.NumberFormat`, ніж вручну форматувати число?

Тому що `Intl.NumberFormat` враховує локаль та стандартизовані правила форматування.

---

### 7. Що повертає `Intl.NumberFormat().format()`?

`string`.

---

### 8. Що означає `minimumFractionDigits`?

Мінімальна кількість знаків після десяткового розділювача.

---

### 9. Що означає `maximumFractionDigits`?

Максимальна кількість знаків після десяткового розділювача.

---

### 10. Як форматувати відсоток?

Наприклад:

    const formatter = new Intl.NumberFormat("uk-UA", {
        style: "percent"
    });

    formatter.format(0.85);

---

### 11. Як форматувати валюту?

Наприклад:

    const formatter = new Intl.NumberFormat("uk-UA", {
        style: "currency",
        currency: "UAH"
    });

---

### 12. Чи потрібно зберігати `"1 999,90 грн"` у базі даних?

Ні.

Краще зберігати числове значення, а форматування виконувати при відображенні.

---

# 20. Пов'язані теми

Ця тема логічно продовжує:

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

Особливо важливі:

- `Number`;
- `Math.round()`;
- `toFixed()`;
- `toPrecision()`;
- `toExponential()`;
- `Intl.NumberFormat`;
- `Number.EPSILON`;
- `Number.MAX_SAFE_INTEGER`;
- `BigInt`.

---

# 21. Швидка шпаргалка

## `toFixed()`

    const value = 19.9;

    value.toFixed(2);
    // "19.90"

Задає кількість знаків після крапки.

Повертає:

    string

---

## `toPrecision()`

    const value = 123.456;

    value.toPrecision(4);
    // "123.5"

Задає кількість значущих цифр.

---

## `toExponential()`

    const value = 123456;

    value.toExponential(2);
    // "1.23e+5"

---

## `Intl.NumberFormat`

    new Intl.NumberFormat("uk-UA")
        .format(1234567.89);

Форматує число відповідно до locale.

---

## Два десяткові знаки

    const formatter = new Intl.NumberFormat("uk-UA", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

---

## Валюта

    const formatter = new Intl.NumberFormat("uk-UA", {
        style: "currency",
        currency: "UAH"
    });

---

## Відсоток

    const formatter = new Intl.NumberFormat("uk-UA", {
        style: "percent"
    });

    formatter.format(0.85);
    // "85%"

---

## Unit

    const formatter = new Intl.NumberFormat("uk-UA", {
        style: "unit",
        unit: "kilometer"
    });

---

## Розділювачі тисяч

    new Intl.NumberFormat("uk-UA")
        .format(1234567.89);

---

## Дані ≠ формат

Зберігаємо:

    1234.5

Показуємо:

    "1 234,50 грн"

---

# 22. Головне правило

> **Число зберігаємо як Number, а форматуємо тільки тоді, коли потрібно показати його користувачу.**

Основний робочий принцип:

    raw number
        ↓
    calculations
        ↓
    final number
        ↓
    formatting
        ↓
    string
        ↓
    UI

Для простого форматування:

    value.toFixed(2)

Для локалізованого UI:

    Intl.NumberFormat

Для валюти:

    Intl.NumberFormat(..., {
        style: "currency",
        currency: "UAH"
    })

Для відсотків:

    Intl.NumberFormat(..., {
        style: "percent"
    })

Для значущих цифр:

    value.toPrecision(4)

Для scientific notation:

    value.toExponential(2)

---

## 🧠 Що потрібно реально запам'ятати

Для Junior Full Stack JavaScript достатньо впевнено знати:

1. `toFixed()` — знаки після десяткової крапки.
2. `toPrecision()` — загальна кількість значущих цифр.
3. `toExponential()` — експоненційне представлення.
4. Усі ці методи повертають `string`.
5. `Intl.NumberFormat` — основний інструмент локалізованого форматування.
6. Locale впливає на розділювачі та формат чисел.
7. `style: "currency"` — валюта.
8. `style: "percent"` — відсотки.
9. `minimumFractionDigits` — мінімум знаків після крапки.
10. `maximumFractionDigits` — максимум знаків після крапки.
11. Числові дані не потрібно зберігати у відформатованому вигляді.
12. Форматування краще виконувати на рівні UI/presentation.

> **Головна практична ідея: `Number` — це дані, а formatted string — це їхнє представлення для користувача. Не змішуй ці два рівні.**