# 09. String Padding and Repeat

## Визначення

**String Padding and Repeat** — це робота з методами JavaScript, які дозволяють:

- додавати символи на початок рядка;
- додавати символи в кінець рядка;
- повторювати рядок задану кількість разів.

Основні методи:

- `padStart()`
- `padEnd()`
- `repeat()`

Ці методи **не змінюють оригінальний рядок**, а повертають новий.

---

# 1. `padStart()`

## Синтаксис

    string.padStart(targetLength, padString)

- `targetLength` — бажана загальна довжина рядка;
- `padString` — рядок, яким потрібно доповнити початок.

### Приклад

    const value = "5";

    console.log(value.padStart(2, "0"));
    // "05"

Після виконання:

    "5"
     ↓
    "05"

Довжина результату:

    "05".length // 2

---

# 2. `padStart()` — доповнення нулями

Один із найпоширеніших випадків:

    const number = "7";

    console.log(number.padStart(2, "0"));
    // "07"

Ще приклади:

    console.log("1".padStart(2, "0"));
    // "01"

    console.log("9".padStart(2, "0"));
    // "09"

    console.log("12".padStart(2, "0"));
    // "12"

Якщо рядок уже має потрібну довжину, нічого не додається.

---

# 3. `padStart()` — важливе правило `targetLength`

`targetLength` — це **кінцева довжина всього рядка**, а не кількість символів, які потрібно додати.

    const value = "123";

    console.log(value.padStart(5, "0"));
    // "00123"

Було:

    "123"
     ↑↑↑
     3 символи

Стало:

    "00123"
     ↑↑↑↑↑
     5 символів

Отже:

    "123".padStart(5, "0")
    // "00123"

а не:

    "12300"

---

# 4. Якщо `targetLength` менший за довжину рядка

Нічого не відбувається.

    const value = "12345";

    console.log(value.padStart(3, "0"));
    // "12345"

Оригінальний рядок уже довший за `targetLength`.

Правило:

    targetLength <= string.length
    → повертається оригінальний рядок

---

# 5. `padStart()` без `padString`

Якщо другий аргумент не передати, використовується пробіл.

    const value = "JS";

    console.log(value.padStart(5));
    // "   JS"

Тобто:

    "JS"
    ↓
    "   JS"

Але в практичному коді краще явно вказувати символ, якщо він має значення.

---

# 6. `padStart()` з декількома символами

`padString` може складатися з декількох символів.

    const value = "42";

    console.log(value.padStart(6, "01"));
    // "010142"

JavaScript повторює `padString`, а потім обрізає його до необхідної кількості символів.

---

# 7. `padStart()` може обрізати `padString`

Наприклад:

    const value = "123";

    console.log(value.padStart(7, "abcdef"));
    // "abcd123"

Потрібно додати:

    7 - 3 = 4

Тому з `"abcdef"` беруться тільки перші 4 символи:

    "abcd" + "123"
    // "abcd123"

---

# 8. `padEnd()`

`padEnd()` працює аналогічно до `padStart()`, але додає символи **в кінець** рядка.

## Синтаксис

    string.padEnd(targetLength, padString)

### Приклад

    const value = "5";

    console.log(value.padEnd(2, "0"));
    // "50"

Порівняння:

    "5".padStart(2, "0");
    // "05"

    "5".padEnd(2, "0");
    // "50"

---

# 9. `padEnd()` — доповнення справа

    const value = "JS";

    console.log(value.padEnd(5, "."));
    // "JS..."

Було:

    "JS"

Стало:

    "JS..."

---

# 10. `padEnd()` і довжина

Як і в `padStart()`, `targetLength` — це загальна довжина результату.

    const value = "123";

    console.log(value.padEnd(6, "0"));
    // "123000"

Не:

    "123000000"

а саме:

    "123000"

тому що кінцева довжина повинна бути `6`.

---

# 11. `padEnd()` без `padString`

За замовчуванням використовуються пробіли.

    const value = "JS";

    console.log(value.padEnd(5));
    // "JS   "

---

# 12. Порівняння `padStart()` і `padEnd()`

| Метод | Куди додає |
|---|---|
| `padStart()` | на початок |
| `padEnd()` | у кінець |

Приклад:

    const value = "42";

    console.log(value.padStart(5, "0"));
    // "00042"

    console.log(value.padEnd(5, "0"));
    // "42000"

Запам'ятати:

    padStart → START → зліва

    padEnd → END → справа

---

# 13. Практика: форматування чисел

`padStart()` часто використовується для створення двозначного представлення числа.

    const day = "7";
    const month = "3";

    const formattedDay = day.padStart(2, "0");
    const formattedMonth = month.padStart(2, "0");

    console.log(formattedDay);
    // "07"

    console.log(formattedMonth);
    // "03"

Можна сформувати дату:

    const date = `${formattedDay}.${formattedMonth}.2026`;

    console.log(date);
    // "07.03.2026"

---

# 14. Форматування часу

Один із дуже практичних випадків:

    const hours = "8";
    const minutes = "5";

    const time = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;

    console.log(time);
    // "08:05"

Якщо:

    const hours = "14";
    const minutes = "30";

результат:

    "14:30"

---

# 15. Функція для форматування часу

Можна винести логіку у функцію:

    function formatTime(hours, minutes) {
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    }

    console.log(formatTime(8, 5));
    // "08:05"

    console.log(formatTime(14, 30));
    // "14:30"

Тут важливий момент:

    String(hours)

Якщо `hours` — число, спочатку перетворюємо його на рядок.

---

# 16. `padStart()` і числа

Методи `padStart()` та `padEnd()` — це **методи рядків**, а не чисел.

Так не працює:

    const number = 7;

    number.padStart(2, "0");
    // TypeError

Правильно:

    String(number).padStart(2, "0");

або:

    const formatted = String(7).padStart(2, "0");

    console.log(formatted);
    // "07"

---

# 17. `String()` + `padStart()`

Це дуже корисна комбінація:

    const number = 42;

    const result = String(number).padStart(5, "0");

    console.log(result);
    // "00042"

Алгоритм:

    number
      ↓
    String(number)
      ↓
    "42"
      ↓
    padStart(5, "0")
      ↓
    "00042"

---

# 18. `repeat()`

`repeat()` створює новий рядок, повторюючи поточний рядок задану кількість разів.

## Синтаксис

    string.repeat(count)

### Приклад

    const value = "JS";

    console.log(value.repeat(3));
    // "JSJSJS"

---

# 19. Простий приклад `repeat()`

    console.log("*".repeat(5));
    // "*****"

    console.log("-".repeat(10));
    // "----------"

    console.log("=".repeat(20));
    // "===================="

Це зручно для створення розділювачів у консолі.

---

# 20. `repeat()` з кількістю `0`

Якщо `count` дорівнює `0`, повертається порожній рядок.

    console.log("JS".repeat(0));
    // ""

---

# 21. `repeat()` з дробовим числом

`count` приводиться до цілого числа.

    console.log("A".repeat(3.7));
    // "AAA"

Фактично використовується ціла частина:

    3.7 → 3

---

# 22. `repeat()` з від'ємним числом

Від'ємне значення викликає помилку.

    "JS".repeat(-1);
    // RangeError

Тому кількість повторень повинна бути невід'ємною.

---

# 23. `repeat()` з `NaN`

`NaN` приводиться до `0`.

    console.log("JS".repeat(NaN));
    // ""

---

# 24. `repeat()` з `Infinity`

Нескінченна кількість повторень неможлива.

    "JS".repeat(Infinity);
    // RangeError

---

# 25. `repeat()` для створення відступів

Можна створювати пробіли:

    const indent = " ".repeat(4);

    console.log(`${indent}Hello`);
    //     Hello

Або використовувати інший символ:

    console.log("  ".repeat(3));
    //  шестипробільний відступ

---

# 26. `repeat()` для візуального представлення

Наприклад, проста шкала:

    const level = 5;

    console.log("█".repeat(level));
    // █████

Інша частина:

    const empty = 10 - level;

    console.log("█".repeat(level) + "░".repeat(empty));
    // █████░░░░░

Це простий приклад використання рядкових методів для UI або CLI.

---

# 27. `repeat()` + `padStart()`

Методи можна комбінувати.

Наприклад, створимо номер із фіксованою довжиною:

    const id = String(42).padStart(6, "0");

    console.log(id);
    // "000042"

Або створимо заголовок:

    const title = "JavaScript";

    console.log("=".repeat(20));
    console.log(title);
    console.log("=".repeat(20));

Результат:

    ====================
    JavaScript
    ====================

---

# 28. `padStart()` + `repeat()` для форматування

Можна створити простий текстовий індикатор:

    const score = 7;
    const max = 10;

    const progress =
        "█".repeat(score) +
        "░".repeat(max - score);

    console.log(progress);
    // ███████░░░

---

# 29. `padEnd()` для вирівнювання тексту

`padEnd()` дуже зручний для створення простих таблиць у консолі.

    const name = "Valeriy";

    console.log(name.padEnd(15, "."));
    // "Valeriy........"

Наприклад:

    console.log("Name".padEnd(15) + "Age");
    console.log("Valeriy".padEnd(15) + "56");

Це дає приблизно таке представлення:

    Name           Age
    Valeriy        56

---

# 30. Форматування списку

    const users = [
        { name: "Anna", age: 25 },
        { name: "John", age: 31 },
        { name: "Maria", age: 28 }
    ];

    users.forEach(user => {
        console.log(
            user.name.padEnd(10) + user.age
        );
    });

Ідея:

    name.padEnd(10)
        ↓
    усі імена займають однакове поле

Це особливо корисно для CLI/debug output.

---

# 31. `padStart()` для числових ID

Наприклад, у системі є ID:

    const id = 37;

    const formattedId = String(id).padStart(6, "0");

    console.log(formattedId);
    // "000037"

Інші:

    String(1).padStart(6, "0");
    // "000001"

    String(25).padStart(6, "0");
    // "000025"

    String(999).padStart(6, "0");
    // "000999"

---

# 32. `padStart()` для номерів

Наприклад:

    const invoiceNumber = 42;

    const invoiceId =
        String(invoiceNumber).padStart(8, "0");

    console.log(invoiceId);
    // "00000042"

Це вже типовий приклад форматування даних перед відображенням користувачу.

---

# 33. `padStart()` не змінює рядок

Як і більшість методів роботи з рядками, `padStart()` повертає новий рядок.

    const value = "42";

    const result = value.padStart(5, "0");

    console.log(value);
    // "42"

    console.log(result);
    // "00042"

Оригінальний рядок залишається незмінним.

---

# 34. `padEnd()` не змінює рядок

    const value = "JS";

    const result = value.padEnd(5, ".");

    console.log(value);
    // "JS"

    console.log(result);
    // "JS..."

---

# 35. `repeat()` не змінює рядок

    const value = "JS";

    const result = value.repeat(3);

    console.log(value);
    // "JS"

    console.log(result);
    // "JSJSJS"

---

# 36. Ланцюжки методів

Методи можна комбінувати.

    const value = "42";

    const result = value
        .padStart(5, "0")
        .repeat(2);

    console.log(result);
    // "0004200042"

Спочатку:

    "42"
      ↓
    padStart(5, "0")
      ↓
    "00042"
      ↓
    repeat(2)
      ↓
    "0004200042"

---

# 37. Комбінація з `trim()`

Ці методи часто використовуються разом з іншими string methods.

    const value = "  42  ";

    const result = value
        .trim()
        .padStart(5, "0");

    console.log(result);
    // "00042"

Алгоритм:

    "  42  "
       ↓
    trim()
       ↓
    "42"
       ↓
    padStart(5, "0")
       ↓
    "00042"

---

# 38. Комбінація з `toUpperCase()`

Наприклад:

    const code = "js";

    const result = code
        .toUpperCase()
        .padEnd(5, "!");

    console.log(result);
    // "JS!!!"

---

# 39. `padStart()` і вже довгий рядок

Важливо не плутати `targetLength` із "кількістю символів для додавання".

    const value = "123456";

    console.log(value.padStart(4, "0"));
    // "123456"

Тому що:

    value.length === 6
    targetLength === 4

Додавати нічого не потрібно.

---

# 40. `padStart()` і порожній `padString`

Якщо `padString` — порожній рядок:

    const value = "42";

    console.log(value.padStart(5, ""));
    // "42"

Доповнення неможливе, тому рядок залишається без змін.

---

# 41. `padEnd()` і порожній `padString`

Аналогічно:

    console.log("42".padEnd(5, ""));
    // "42"

---

# 42. `repeat()` і порожній рядок

Якщо повторювати порожній рядок:

    console.log("".repeat(10));
    // ""

Результат завжди порожній рядок.

---

# 43. `repeat()` для генерації HTML

Теоретично можна використовувати `repeat()` для генерації повторюваних елементів.

Наприклад:

    const divider = "<hr>".repeat(3);

    console.log(divider);
    // "<hr><hr><hr>"

Але для складного динамічного HTML краще використовувати `map()` + `join()` або DOM API.

---

# 44. Практичний приклад: номер сторінки

    function formatPage(page) {
        return String(page).padStart(3, "0");
    }

    console.log(formatPage(1));
    // "001"

    console.log(formatPage(12));
    // "012"

    console.log(formatPage(125));
    // "125"

Це може використовуватися для:

- номерів записів;
- сторінок;
- кодів;
- ID;
- номерів замовлень.

---

# 45. Практичний приклад: дата

    function formatDate(day, month, year) {
        const d = String(day).padStart(2, "0");
        const m = String(month).padStart(2, "0");

        return `${d}.${m}.${year}`;
    }

    console.log(formatDate(7, 3, 2026));
    // "07.03.2026"

---

# 46. Практичний приклад: час

    function formatTime(hours, minutes, seconds) {
        const h = String(hours).padStart(2, "0");
        const m = String(minutes).padStart(2, "0");
        const s = String(seconds).padStart(2, "0");

        return `${h}:${m}:${s}`;
    }

    console.log(formatTime(8, 5, 9));
    // "08:05:09"

---

# 47. Практичний приклад: створення розділювача

    function createDivider(length = 30) {
        return "-".repeat(length);
    }

    console.log(createDivider());

    console.log(createDivider(10));
    // ----------

`repeat()` тут дозволяє не писати символ `-` вручну.

---

# 48. Практичний приклад: консольний звіт

    const users = [
        { name: "Anna", age: 25 },
        { name: "John", age: 31 },
        { name: "Maria", age: 28 }
    ];

    console.log("Name".padEnd(10) + "Age");
    console.log("-".repeat(15));

    users.forEach(user => {
        console.log(
            user.name.padEnd(10) + user.age
        );
    });

Це поєднує:

- `padEnd()`
- `repeat()`
- `forEach()`

і показує, як маленькі string methods можуть працювати разом.

---

# 49. `padStart()` та `padEnd()` — не для числових обчислень

Після форматування результат стає рядком.

    const value = String(42).padStart(5, "0");

    console.log(value);
    // "00042"

    console.log(typeof value);
    // "string"

Тому:

    "00042" + 1
    // "000421"

а не:

    43

Якщо потрібно виконувати математичні операції, потрібно знову отримати число:

    const value = String(42).padStart(5, "0");

    const number = Number(value);

    console.log(number);
    // 42

---

# 50. `repeat()` і пам'ять

`repeat()` створює новий рядок.

Не варто без необхідності створювати величезні рядки:

    const hugeString = "A".repeat(100000000);

Такі операції можуть споживати багато пам'яті.

У звичайній frontend/backend практиці:

    " ".repeat(4)
    "-".repeat(50)
    "0".repeat(3)

абсолютно нормальні.

---

# 51. Порівняння з іншими методами

| Метод | Призначення |
|---|---|
| `padStart()` | доповнити початок |
| `padEnd()` | доповнити кінець |
| `repeat()` | повторити весь рядок |
| `trim()` | видалити пробіли з обох боків |
| `slice()` | отримати частину рядка |
| `replace()` | замінити частину рядка |
| `split()` | перетворити рядок на масив |

Важливо розуміти різницю між ними.

---

# 52. Типові помилки

## Помилка 1 — виклик на числі

Неправильно:

    const number = 5;

    number.padStart(2, "0");

Правильно:

    String(number).padStart(2, "0");

---

## Помилка 2 — неправильне розуміння `targetLength`

Неправильно думати:

    "42".padStart(5, "0");

означає:

    додати 5 нулів

Правильно:

    5 — загальна довжина результату

Результат:

    "00042"

---

## Помилка 3 — очікування зміни оригіналу

    const value = "42";

    value.padStart(5, "0");

    console.log(value);
    // "42"

Потрібно зберегти результат:

    const value = "42";

    const result = value.padStart(5, "0");

---

## Помилка 4 — використання `padStart()` для числа

`padStart()` повертає рядок.

    const id = String(42).padStart(6, "0");

    console.log(typeof id);
    // "string"

Це форматування, а не зміна числового значення.

---

## Помилка 5 — плутати `padStart()` і `padEnd()`

    "42".padStart(5, "0");
    // "00042"

    "42".padEnd(5, "0");
    // "42000"

Запам'ятай:

    Start → початок
    End   → кінець

---

## Помилка 6 — негативний `repeat()`

Неправильно:

    "JS".repeat(-1);

Правильно:

    "JS".repeat(3);

---

# 53. Перевірка результату через `length`

Дуже корисно перевіряти, що `targetLength` — це саме загальна довжина:

    const result = "42".padStart(6, "0");

    console.log(result);
    // "000042"

    console.log(result.length);
    // 6

---

# 54. Важливий принцип: форматування ≠ зміна даних

Наприклад:

    const id = 42;

    const formattedId = String(id).padStart(6, "0");

Ми не змінили `id`.

    console.log(id);
    // 42

Ми створили його текстове представлення:

    console.log(formattedId);
    // "000042"

Тобто:

    data
      ↓
    formatting
      ↓
    display string

Це важливий принцип frontend-розробки.

---

# 55. Де ці методи реально використовуються

## Frontend

- форматування часу;
- форматування дат;
- номери сторінок;
- ID;
- лічильники;
- прогрес-бари;
- візуальні розділювачі;
- підготовка тексту для UI.

## Backend

- форматування номерів;
- генерація текстових кодів;
- CLI output;
- логування;
- формування звітів;
- підготовка даних до відображення.

## Full Stack

Наприклад:

    database
       ↓
    backend
       ↓
    formatted data
       ↓
    frontend

Backend може повернути:

    {
        id: 42
    }

Frontend може відобразити:

    "000042"

При цьому в базі даних залишається:

    42

---

# 56. Практична вправа 1 — два значення

Створи:

    const number = "7";

і отримай:

    "000007"

Умова:

- використати `padStart()`;
- не змінювати початкове значення.

---

# 57. Практична вправа 2 — час

Створи функцію:

    formatTime(hours, minutes)

Вона повинна:

    formatTime(8, 5)
    // "08:05"

    formatTime(12, 30)
    // "12:30"

Підказка:

    String(value).padStart(2, "0")

---

# 58. Практична вправа 3 — прогрес-бар

Створи функцію:

    createProgressBar(current, total)

Наприклад:

    createProgressBar(7, 10)

Результат:

    ███████░░░

Підказка:

    "█".repeat(current)

та:

    "░".repeat(total - current)

---

# 59. Практична вправа 4 — консольна таблиця

Створи масив:

    const products = [
        { name: "Book", price: 250 },
        { name: "Pen", price: 40 },
        { name: "Notebook", price: 120 }
    ];

Виведи щось на кшталт:

    Product       Price
    -------------------
    Book          250
    Pen            40
    Notebook      120

Для вирівнювання використай:

    padEnd()

Для розділювача:

    repeat()

---

# 60. Практична вправа 5 — ID

Створи функцію:

    formatId(id)

Вона повинна повертати ID довжиною 8 символів:

    formatId(1)
    // "00000001"

    formatId(42)
    // "00000042"

    formatId(12345678)
    // "12345678"

---

# 61. Практична вправа 6 — заголовок

Створи функцію:

    printTitle(title)

яка виводить:

    ====================
    JavaScript
    ====================

Довжина лінії:

    20

Використай:

    repeat()

---

# 62. Interview Questions

### 1. Що робить `padStart()`?

Додає символи на початок рядка, доки його загальна довжина не досягне `targetLength`.

---

### 2. Що робить `padEnd()`?

Додає символи в кінець рядка до заданої загальної довжини.

---

### 3. Що робить `repeat()`?

Повертає новий рядок, у якому початковий рядок повторений задану кількість разів.

---

### 4. Чи змінюють `padStart()` і `padEnd()` оригінальний рядок?

Ні.

Рядки в JavaScript immutable.

---

### 5. Що означає `targetLength`?

Це **кінцева загальна довжина** рядка.

    "42".padStart(5, "0");
    // "00042"

---

### 6. Що повертає `padStart()`?

Рядок.

    typeof "42".padStart(5, "0");
    // "string"

---

### 7. Чи можна викликати `padStart()` на числі?

Безпосередньо — ні.

Потрібно спочатку перетворити число на рядок:

    String(42).padStart(5, "0");

---

### 8. Що станеться, якщо `targetLength` менший за довжину рядка?

Рядок залишиться без змін.

    "12345".padStart(3, "0");
    // "12345"

---

### 9. Що станеться при `"JS".repeat(0)`?

Повернеться порожній рядок:

    ""

---

### 10. Що станеться при `"JS".repeat(-1)`?

Буде `RangeError`.

---

### 11. Чим відрізняються `padStart()` і `padEnd()`?

    padStart() → зліва

    padEnd() → справа

---

### 12. Для чого часто використовують `padStart(2, "0")`?

Для форматування однозначних чисел у двозначний формат:

    7 → "07"

---

# 63. Learning Path

## 🟢 Core — Junior

Потрібно впевнено знати:

- `padStart()`;
- `padEnd()`;
- `repeat()`;
- `targetLength`;
- `padString`;
- що методи не змінюють оригінальний рядок;
- `String(number).padStart(...)`;
- форматування часу;
- форматування ID.

---

## 🟡 Junior+

Додатково:

- комбінування методів;
- `padStart()` + `template literals`;
- `padEnd()` для таблиць;
- `repeat()` для генерації UI-тексту;
- використання методів у функціях;
- робота з масивами та `forEach()`.

---

## 🟠 Middle

Важливо розуміти:

- форматування даних окремо від їхнього зберігання;
- різницю між числом і його текстовим представленням;
- використання string methods у frontend/backend;
- побудову форматтерів;
- edge cases;
- Unicode caveats;
- продуктивність при створенні дуже великих рядків.

---

## 🔴 Senior

У межах цієї теми достатньо розуміти:

- поведінку coercion;
- immutable nature of strings;
- edge cases API;
- memory implications великих `repeat()`;
- відокремлення presentation formatting від domain data;
- локалізацію та форматування дат/чисел через спеціалізовані API, коли `padStart()` вже недостатньо.

Наприклад, для складного форматування дат зазвичай краще використовувати `Intl.DateTimeFormat`, а не будувати все вручну через `padStart()`.

---

# 64. Mini Cheat Sheet

    // padStart()
    "42".padStart(5, "0");
    // "00042"

    // padEnd()
    "42".padEnd(5, "0");
    // "42000"

    // repeat()
    "JS".repeat(3);
    // "JSJSJS"

    // number → string → padding
    String(7).padStart(2, "0");
    // "07"

    // time
    `${String(8).padStart(2, "0")}:${String(5).padStart(2, "0")}`;
    // "08:05"

    // divider
    "-".repeat(20);
    // "--------------------"

    // progress bar
    "█".repeat(7) + "░".repeat(3);
    // "███████░░░"

    // right alignment
    "42".padStart(5, " ");
    // "   42"

    // left alignment
    "42".padEnd(5, " ");
    // "42   "

---

# 65. Головне, що потрібно запам'ятати

> `padStart()` додає символи **на початок** рядка.

> `padEnd()` додає символи **в кінець** рядка.

> `repeat()` **повторює рядок** задану кількість разів.

Найважливіше:

    "7".padStart(2, "0")
    // "07"

    "7".padEnd(2, "0")
    // "70"

    "JS".repeat(3)
    // "JSJSJS"

І пам'ятати:

    padStart()
    padEnd()
    repeat()

**не змінюють оригінальний рядок.**

Для чисел:

    String(number).padStart(...)

А `targetLength` — це **загальна довжина результату**, а не кількість символів, які потрібно додати.

---

# 66. Зв'язок з попередніми темами

Ця тема логічно продовжує:

    01-string-basics
          ↓
    02-string-properties-and-access
          ↓
    03-search-and-check
          ↓
    04-slice-substring-substr
          ↓
    05-case-and-whitespace
          ↓
    06-replace-and-replaceAll
          ↓
    07-split-and-join
          ↓
    08-template-literals
          ↓
    09-string-padding-and-repeat
          ↓
    10-regex-basics

Тобто зараз ти переходиш від:

    отримання
    ↓
    пошуку
    ↓
    вирізання
    ↓
    очищення
    ↓
    заміни
    ↓
    розділення
    ↓
    побудови
    ↓
    форматування рядків

А наступна тема — **Regular Expressions**, де пошук і перевірка рядків стають значно потужнішими.

---

# 67. Підсумок

`padStart()`, `padEnd()` і `repeat()` — невеликі, але дуже практичні методи.

Їхнє основне призначення:

    padStart()
    → форматування зліва

    padEnd()
    → форматування справа

    repeat()
    → повторення

Найтиповіші практичні задачі:

- `"07"` замість `"7"`;
- `"08:05"` для часу;
- `"000042"` для ID;
- вирівнювання тексту;
- консольні таблиці;
- progress bars;
- розділювачі;
- форматування даних перед відображенням.

Головний практичний патерн:

    String(value).padStart(length, "0")

і головний принцип:

    JavaScript data
         ↓
    formatting
         ↓
    string for display

Тобто `padStart()` та `padEnd()` найчастіше не змінюють самі дані — вони створюють **зручне текстове представлення даних**.