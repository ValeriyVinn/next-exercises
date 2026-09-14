# 05. Case and Whitespace

## Визначення

**Case and Whitespace** — робота з регістром символів та пробільними символами в JavaScript strings.

У цій темі потрібно знати:

• `toUpperCase()` — переведення в верхній регістр  
• `toLowerCase()` — переведення в нижній регістр  
• `trim()` — видалення пробілів з початку та кінця  
• `trimStart()` / `trimLeft()` — видалення з початку  
• `trimEnd()` / `trimRight()` — видалення з кінця  
• поняття **case-sensitive / case-insensitive**  
• whitespace characters  
• нормалізацію користувацького введення  
• комбінацію `trim()` + `toLowerCase()` / `toUpperCase()`

Ці операції надзвичайно часто використовуються при:

• роботі з формами  
• пошуку  
• логінах  
• email  
• фільтрації  
• порівнянні strings  
• обробці даних із API  
• валідації користувацького введення

---

# 1. Що таке Case

**Case** — це регістр букв.

Наприклад:

    javascript
    JavaScript
    JAVASCRIPT
    JaVaScRiPt

Це різні strings з точки зору звичайного порівняння:

    "javascript" === "JavaScript";
    // false

    "JavaScript" === "JavaScript";
    // true

---

# 2. Uppercase

**Uppercase** — великі літери.

    const text = "JavaScript";

    console.log(text.toUpperCase());
    // "JAVASCRIPT"

---

# 3. Lowercase

**Lowercase** — маленькі літери.

    const text = "JavaScript";

    console.log(text.toLowerCase());
    // "javascript"

---

# 4. `toUpperCase()`

## Визначення

`toUpperCase()` повертає string, у якому літери переведені у верхній регістр.

Синтаксис:

    string.toUpperCase()

Приклад:

    const text = "Hello World";

    const result = text.toUpperCase();

    console.log(result);
    // "HELLO WORLD"

---

# 5. `toUpperCase()` не змінює оригінальний string

Strings у JavaScript immutable.

    const text = "JavaScript";

    text.toUpperCase();

    console.log(text);
    // "JavaScript"

Метод повернув новий string, але ми його не зберегли.

Правильно:

    const text = "JavaScript";

    const result = text.toUpperCase();

    console.log(result);
    // "JAVASCRIPT"

---

# 6. `toLowerCase()`

## Визначення

`toLowerCase()` повертає string, у якому літери переведені в нижній регістр.

    const text = "JavaScript";

    console.log(text.toLowerCase());
    // "javascript"

---

# 7. `toLowerCase()` не змінює оригінал

    const text = "JavaScript";

    const lower = text.toLowerCase();

    console.log(text);
    // "JavaScript"

    console.log(lower);
    // "javascript"

---

# 8. Цифри та спеціальні символи

`toUpperCase()` та `toLowerCase()` впливають на букви.

Цифри не змінюються:

    const text = "JavaScript 2026";

    console.log(text.toUpperCase());
    // "JAVASCRIPT 2026"

Спеціальні символи також залишаються:

    const text = "hello! @#$ 123";

    console.log(text.toUpperCase());
    // "HELLO! @#$ 123"

---

# 9. Case-sensitive

За замовчуванням JavaScript string operations є чутливими до регістру.

Наприклад:

    const role = "Admin";

    console.log(role === "admin");
    // false

    console.log(role === "Admin");
    // true

---

# 10. Case-insensitive comparison

Якщо потрібно порівняти strings без урахування регістру, можна привести обидва до одного регістру.

    const role = "Admin";

    console.log(
        role.toLowerCase() === "admin"
    );
    // true

Або:

    const role = "Admin";

    console.log(
        role.toUpperCase() === "ADMIN"
    );
    // true

---

# 11. Рекомендований патерн порівняння

Для простого case-insensitive comparison:

    const input = "JavaScript";
    const expected = "javascript";

    const result =
        input.toLowerCase() === expected.toLowerCase();

    console.log(result);
    // true

---

# 12. Чому потрібно нормалізувати обидва значення

Не варто робити:

    const input = "JavaScript";

    input.toLowerCase() === "JavaScript";
    // false

Краще:

    input.toLowerCase() === "javascript";
    // true

Або нормалізувати обидві сторони:

    input.toLowerCase() === expected.toLowerCase();

---

# 13. Практичний приклад: команда

    const command = "START";

    if (command.toLowerCase() === "start") {
        console.log("Starting...");
    }

Працюватиме також для:

    start
    Start
    START
    sTaRt

---

# 14. Практичний приклад: пошук

Тема пошуку тісно пов'язана з регістром.

    const text = "I learn JavaScript";

    console.log(
        text.includes("javascript")
    );
    // false

Щоб зробити пошук case-insensitive:

    const text = "I learn JavaScript";
    const query = "javascript";

    const result = text
        .toLowerCase()
        .includes(query.toLowerCase());

    console.log(result);
    // true

---

# 15. Практичний приклад: пошук у масиві

    const languages = [
        "JavaScript",
        "TypeScript",
        "Python",
        "Java"
    ];

    const query = "script";

    const result = languages.filter(language =>
        language
            .toLowerCase()
            .includes(query.toLowerCase())
    );

    console.log(result);
    // ["JavaScript", "TypeScript"]

---

# 16. Що таке Whitespace

**Whitespace** — символи, які використовуються для пробілів та форматування тексту.

Найпоширеніші:

• звичайний пробіл `" "`  
• tab `\t`  
• newline `\n`  
• carriage return `\r`  
• деякі Unicode whitespace characters

Наприклад:

    const text = "   Hello   ";

Пробіли є частиною string.

---

# 17. Пробіл має значення

    const a = "Hello";
    const b = " Hello";

    console.log(a === b);
    // false

Також:

    const a = "Hello";
    const b = "Hello ";

    console.log(a === b);
    // false

---

# 18. `trim()`

## Визначення

`trim()` видаляє whitespace:

• з початку string  
• з кінця string

Але **не видаляє пробіли всередині**.

Синтаксис:

    string.trim()

---

# 19. Простий приклад `trim()`

    const text = "   Hello World   ";

    const result = text.trim();

    console.log(result);
    // "Hello World"

---

# 20. `trim()` не змінює оригінал

    const text = "   Hello   ";

    text.trim();

    console.log(text);
    // "   Hello   "

Правильно:

    const text = "   Hello   ";

    const result = text.trim();

    console.log(result);
    // "Hello"

---

# 21. `trim()` не видаляє внутрішні пробіли

    const text = "   Hello     World   ";

    console.log(text.trim());
    // "Hello     World"

Початкові та кінцеві пробіли видалені.

Внутрішні залишилися.

---

# 22. `trimStart()`

`trimStart()` видаляє whitespace тільки з початку string.

    const text = "   Hello World   ";

    console.log(text.trimStart());
    // "Hello World   "

Кінцеві пробіли залишаються.

---

# 23. `trimEnd()`

`trimEnd()` видаляє whitespace тільки з кінця string.

    const text = "   Hello World   ";

    console.log(text.trimEnd());
    // "   Hello World"

Початкові пробіли залишаються.

---

# 24. Старі назви `trimLeft()` та `trimRight()`

Також існують:

    trimLeft()

та:

    trimRight()

Вони є альтернативними назвами:

    trimLeft()  → trimStart()

    trimRight() → trimEnd()

У сучасному коді краще використовувати:

    trimStart()

    trimEnd()

---

# 25. Порівняння trim-методів

    const text = "   Hello World   ";

    text.trim();
    // "Hello World"

    text.trimStart();
    // "Hello World   "

    text.trimEnd();
    // "   Hello World"

---

# 26. `trim()` і `length`

Це хороший спосіб побачити різницю.

    const text = "   Hello   ";

    console.log(text.length);
    // 11

    console.log(text.trim().length);
    // 5

Після `trim()`:

    "Hello"

має довжину:

    5

---

# 27. Перевірка порожнього введення

Один із найважливіших практичних патернів:

    const input = "     ";

    if (input.trim() === "") {
        console.log("Empty input");
    }

Результат:

    Empty input

Без `trim()`:

    input === ""

поверне:

    false

---

# 28. Перевірка форми

Наприклад:

    const username = "   Valeriy   ";

    if (username.trim() === "") {
        console.log("Username is required");
    }

---

# 29. Нормалізація введення

Дуже типовий pipeline:

    user input
        ↓
    trim()
        ↓
    toLowerCase()
        ↓
    comparison / search

Наприклад:

    const input = "  JavaScript  ";

    const normalized = input
        .trim()
        .toLowerCase();

    console.log(normalized);
    // "javascript"

---

# 30. Нормалізація email

    const email = "  User@Example.COM  ";

    const normalizedEmail = email
        .trim()
        .toLowerCase();

    console.log(normalizedEmail);
    // "user@example.com"

Такий підхід часто використовується для пошуку та порівняння email.

> У реальних системах питання canonicalization email має додаткові нюанси, тому це не універсальне правило для всіх систем автентифікації.

---

# 31. Нормалізація username

    const username = "  VALERIY  ";

    const normalizedUsername = username
        .trim()
        .toLowerCase();

    console.log(normalizedUsername);
    // "valeriy"

---

# 32. Нормалізація пошукового запиту

    const query = "   JavaScript   ";

    const normalizedQuery = query
        .trim()
        .toLowerCase();

    console.log(normalizedQuery);
    // "javascript"

Тепер:

    const title = "Learn JavaScript";

    const found = title
        .toLowerCase()
        .includes(normalizedQuery);

    console.log(found);
    // true

---

# 33. Chain methods

Ця тема добре демонструє **method chaining**.

Замість:

    const input = "   JavaScript   ";

    const trimmed = input.trim();

    const lower = trimmed.toLowerCase();

Можна:

    const normalized = input
        .trim()
        .toLowerCase();

Результат:

    "javascript"

---

# 34. Порядок операцій

Часто можна написати:

    input.trim().toLowerCase()

Тобто:

    input
      ↓
    trim()
      ↓
    toLowerCase()

Або:

    input.toLowerCase().trim()

Для звичайного whitespace навколо букв результат буде однаковим:

    input.trim().toLowerCase()

    input.toLowerCase().trim()

Але перший варіант часто читається природніше як нормалізація:

    trim → case normalization

---

# 35. `trim()` + `includes()`

    const input = "  JavaScript  ";

    const result = input
        .trim()
        .toLowerCase()
        .includes("javascript");

    console.log(result);
    // true

---

# 36. `trim()` + `startsWith()`

    const url = "   https://example.com   ";

    const result = url
        .trim()
        .startsWith("https://");

    console.log(result);
    // true

---

# 37. `trim()` + `endsWith()`

    const file = "   photo.jpg   ";

    const result = file
        .trim()
        .endsWith(".jpg");

    console.log(result);
    // true

---

# 38. `trim()` + `indexOf()`

    const text = "   JavaScript is great   ";

    const index = text
        .trim()
        .indexOf("JavaScript");

    console.log(index);
    // 0

---

# 39. Whitespace у формі

Уявімо input:

    <input value="   Valeriy   ">

Значення може містити непотрібні пробіли.

Перед обробкою:

    const value = input.value.trim();

Це базовий і дуже поширений патерн frontend-розробки.

---

# 40. Whitespace та `length`

Потрібно пам'ятати:

    const text = "Hello ";

    console.log(text.length);
    // 6

Пробіл — це теж символ.

Після:

    console.log(text.trim().length);
    // 5

---

# 41. `trim()` і newline

    const text = "\n\nHello\n\n";

    console.log(text.trim());
    // "Hello"

`trim()` працює не тільки зі звичайним пробілом.

---

# 42. `trim()` і tab

    const text = "\t\tHello\t\t";

    console.log(text.trim());
    // "Hello"

Tab також належить до whitespace.

---

# 43. Комбінація whitespace

    const text = " \n\t Hello World \t\n ";

    console.log(text.trim());
    // "Hello World"

---

# 44. `trim()` не видаляє whitespace всередині

    const text = "Hello \n World";

    console.log(text.trim());
    // "Hello \n World"

Внутрішній whitespace залишається.

Якщо потрібно змінити внутрішню структуру whitespace, це вже інша задача, яка часто вирішується через RegExp або `split()` / `join()`.

---

# 45. Case conversion та Unicode

`toUpperCase()` і `toLowerCase()` працюють не тільки з англійськими літерами.

Наприклад:

    const text = "привіт";

    console.log(text.toUpperCase());
    // "ПРИВІТ"

Також:

    const text = "ПРИВІТ";

    console.log(text.toLowerCase());
    // "привіт"

---

# 46. Case conversion не завжди проста

Для міжнародного тексту правила регістру можуть бути складнішими, ніж проста заміна ASCII-літер.

Наприклад, у різних мовах можуть існувати особливості:

• Turkish `I / İ / ı / i`  
• Greek  
• German `ß`  
• інші Unicode case mappings

Для більш складних локалізованих задач потрібно враховувати Unicode та locale-aware API.

---

# 47. `toLocaleLowerCase()`

Для locale-sensitive сценаріїв існує:

    toLocaleLowerCase()

Наприклад:

    const text = "İSTANBUL";

    console.log(
        text.toLocaleLowerCase("tr")
    );

Це вже більш просунутий Unicode/locale сценарій.

Для звичайної frontend/backend роботи найчастіше достатньо:

    toLowerCase()

---

# 48. `toLocaleUpperCase()`

Аналогічно:

    toLocaleUpperCase()

Використовується для locale-aware перетворення регістру.

    const text = "istanbul";

    console.log(
        text.toLocaleUpperCase("tr")
    );

---

# 49. `toLowerCase()` vs `toLocaleLowerCase()`

### `toLowerCase()`

Звичайне Unicode case conversion.

    text.toLowerCase()

### `toLocaleLowerCase()`

Може враховувати правила конкретної локалі.

    text.toLocaleLowerCase("tr")

Для більшості простих задач:

    toLowerCase()

є достатнім.

---

# 50. Нормалізація тексту

У практичному коді часто потрібно привести input до стандартної форми.

Наприклад:

    const input = "   JavaScript   ";

    const normalized = input
        .trim()
        .toLowerCase();

    console.log(normalized);
    // "javascript"

Це називається **normalization** у широкому практичному сенсі.

---

# 51. Нормалізація перед порівнянням

    const input = "  ADMIN ";
    const expected = "admin";

    const result =
        input.trim().toLowerCase() ===
        expected.trim().toLowerCase();

    console.log(result);
    // true

---

# 52. Нормалізація перед пошуком

    const query = "  JAVASCRIPT ";

    const title = "Learn JavaScript";

    const normalizedQuery =
        query.trim().toLowerCase();

    const result =
        title.toLowerCase().includes(normalizedQuery);

    console.log(result);
    // true

---

# 53. Практичний пошук користувачів

    const users = [
        "Valeriy",
        "Anna",
        "John",
        "Olena"
    ];

    const query = "  ann  ";

    const normalizedQuery =
        query.trim().toLowerCase();

    const result = users.filter(user =>
        user.toLowerCase().includes(normalizedQuery)
    );

    console.log(result);
    // ["Anna"]

---

# 54. Перевірка empty input

Правильний базовий патерн:

    const input = "   ";

    const value = input.trim();

    if (value === "") {
        console.log("Required");
    }

---

# 55. Скорочений варіант

Можна одразу:

    if (input.trim() === "") {
        console.log("Required");
    }

---

# 56. Перевірка непорожнього input

    const input = "   JavaScript   ";

    if (input.trim() !== "") {
        console.log("Input contains text");
    }

---

# 57. Case normalization + validation

Наприклад, дозволяємо команду `yes` незалежно від регістру:

    const input = "  YES ";

    const value = input
        .trim()
        .toLowerCase();

    if (value === "yes") {
        console.log("Confirmed");
    }

---

# 58. Порівняння кількох значень

    const input = "  React ";

    const value = input
        .trim()
        .toLowerCase();

    if (
        value === "react" ||
        value === "javascript" ||
        value === "typescript"
    ) {
        console.log("Known technology");
    }

---

# 59. Case normalization у `switch`

    const command = "  START ";

    const normalizedCommand = command
        .trim()
        .toLowerCase();

    switch (normalizedCommand) {
        case "start":
            console.log("Starting");
            break;

        case "stop":
            console.log("Stopping");
            break;

        default:
            console.log("Unknown command");
    }

---

# 60. Практичний utility function

Якщо одна й та сама логіка повторюється:

    function normalizeText(value) {
        return value.trim().toLowerCase();
    }

Використання:

    const input = "  JavaScript  ";

    console.log(normalizeText(input));
    // "javascript"

---

# 61. Важливий момент: `trim()` не очищає все

`trim()` видаляє whitespace з країв string.

Але він не:

• видаляє punctuation  
• видаляє всі символи всередині  
• замінює кілька пробілів одним  
• видаляє HTML  
• видаляє спеціальні символи за довільним правилом

Наприклад:

    const text = "   Hello!!!   ";

    console.log(text.trim());
    // "Hello!!!"

---

# 62. Якщо потрібно прибрати зайві внутрішні пробіли

Це вже інша задача.

Наприклад:

    const text = "  Hello     World  ";

    const result = text
        .trim()
        .replace(/\s+/g, " ");

    console.log(result);
    // "Hello World"

Тут:

    trim()
        ↓
    прибирає пробіли по краях

    replace(/\s+/g, " ")
        ↓
    замінює послідовності whitespace одним пробілом

`replace()` та RegExp детальніше розглядаються в наступних темах.

---

# 63. Common Mistakes

## ❌ Помилка: очікувати, що `toLowerCase()` змінить string

    const text = "JavaScript";

    text.toLowerCase();

    console.log(text);
    // "JavaScript"

Правильно:

    const result = text.toLowerCase();

---

## ❌ Помилка: порівнювати input без нормалізації

    const input = " YES ";

    console.log(input === "yes");
    // false

Правильно:

    console.log(
        input.trim().toLowerCase() === "yes"
    );
    // true

---

## ❌ Помилка: забувати про whitespace

    const username = " Valeriy ";

    console.log(username === "Valeriy");
    // false

Потрібно:

    username.trim() === "Valeriy";
    // true

---

## ❌ Помилка: думати, що `trim()` видаляє пробіли всередині

    const text = "Hello     World";

    console.log(text.trim());
    // "Hello     World"

---

## ❌ Помилка: використовувати `toUpperCase()` для точного збереження оригінального введення

Нормалізація регістру змінює представлення тексту:

    const name = "Valeriy";

    console.log(name.toUpperCase());
    // "VALERIY"

Тому не потрібно без потреби змінювати оригінальні display values.

Часто краще:

    originalValue
        +
    normalizedValue

---

## ❌ Помилка: плутати `trim()` та очищення всього тексту

    trim()

не означає:

    "remove all spaces"

Він означає:

    "remove whitespace from both ends"

---

# 64. Практичний шаблон для user input

Один із найкорисніших шаблонів:

    const input = getUserInput();

    const value = input
        .trim()
        .toLowerCase();

    if (value === "javascript") {
        // ...
    }

---

# 65. Практичний шаблон для search

    const query = userInput
        .trim()
        .toLowerCase();

    const result = items.filter(item =>
        item.name
            .toLowerCase()
            .includes(query)
    );

---

# 66. Практичний шаблон для form validation

    const username = input.value.trim();

    if (username === "") {
        console.log("Username is required");
    }

---

# 67. Практичний шаблон для command processing

    const command = input
        .trim()
        .toLowerCase();

    if (command === "start") {
        // start
    }

    if (command === "stop") {
        // stop
    }

---

# 68. Практичний міні-проєкт

## Нормалізація username

Завдання:

• користувач вводить username  
• прибрати пробіли по краях  
• привести до lowercase  
• перевірити, чи не порожній

    const input = "  VALERIY  ";

    const username = input
        .trim()
        .toLowerCase();

    if (username === "") {
        console.log("Username is required");
    } else {
        console.log(username);
    }

Результат:

    valeriy

---

# 69. Практичний міні-проєкт: пошук

    const products = [
        "JavaScript Course",
        "TypeScript Course",
        "React Course",
        "Node.js Course"
    ];

    const input = "  SCRIPT ";

    const query = input
        .trim()
        .toLowerCase();

    const result = products.filter(product =>
        product.toLowerCase().includes(query)
    );

    console.log(result);

Результат:

    [
        "JavaScript Course",
        "TypeScript Course"
    ]

---

# 70. Практичний міні-проєкт: команда

    const input = "   StArT   ";

    const command = input
        .trim()
        .toLowerCase();

    if (command === "start") {
        console.log("Application started");
    }

---

# 71. Практичний міні-проєкт: email

    const input = "  USER@EXAMPLE.COM  ";

    const email = input
        .trim()
        .toLowerCase();

    console.log(email);
    // "user@example.com"

---

# 72. Method Chaining

Ця тема є хорошим прикладом chaining:

    const result = input
        .trim()
        .toLowerCase()
        .includes("javascript");

Логіка:

    input
      ↓
    trim()
      ↓
    toLowerCase()
      ↓
    includes()
      ↓
    true / false

---

# 73. Важливий принцип

Не потрібно автоматично нормалізувати **весь** текст.

Наприклад, для відображуваного імені:

    const name = "Valeriy Svystun";

не обов'язково робити:

    name.toLowerCase();

Бо це змінить presentation:

    "valeriy svystun"

Для пошуку або порівняння краще створити окреме normalized value.

---

# 74. Original vs Normalized Value

Хороший практичний підхід:

    const original = "  Valeriy Svystun  ";

    const normalized = original
        .trim()
        .toLowerCase();

    console.log(original);
    // "  Valeriy Svystun  "

    console.log(normalized);
    // "valeriy svystun"

Таким чином:

    original
        ↓
    display / storage

    normalized
        ↓
    comparison / search / validation

---

# 75. Що потрібно знати на Junior-рівні

Обов'язково:

• `toUpperCase()`  
• `toLowerCase()`  
• `trim()`  
• `trimStart()`  
• `trimEnd()`  
• `trimLeft()` / `trimRight()` як старі alias-и  
• case-sensitive comparison  
• case-insensitive comparison  
• whitespace  
• нормалізація user input  
• `trim()` перед перевіркою порожнього input  
• chaining `trim().toLowerCase()`  
• використання разом з `includes()`, `startsWith()`, `endsWith()`

---

# 76. Що варто знати глибше

Для впевненої роботи:

• Unicode case conversion  
• `toLocaleLowerCase()`  
• `toLocaleUpperCase()`  
• locale-sensitive правила  
• normalization pipeline  
• різницю між display value та normalized value  
• whitespace в Unicode  
• обробку user-generated content  
• поєднання string normalization з RegExp

---

# 77. Interview Questions

### 1. Що робить `toLowerCase()`?

Повертає новий string із літерами в нижньому регістрі.

---

### 2. Чи змінює `toLowerCase()` оригінальний string?

Ні.

Strings immutable.

---

### 3. Що робить `toUpperCase()`?

Повертає новий string із літерами у верхньому регістрі.

---

### 4. Що робить `trim()`?

Видаляє whitespace з початку та кінця string.

---

### 5. Чи видаляє `trim()` пробіли всередині?

Ні.

    "  Hello     World  ".trim();

дасть:

    "Hello     World"

---

### 6. Чим `trimStart()` відрізняється від `trimEnd()`?

    trimStart()
        → початок

    trimEnd()
        → кінець

---

### 7. Що таке case-sensitive?

Операція, у якій регістр має значення.

    "JavaScript" !== "javascript"

---

### 8. Як зробити case-insensitive comparison?

Наприклад:

    a.toLowerCase() === b.toLowerCase()

---

### 9. Як перевірити, чи користувач ввів тільки пробіли?

    input.trim() === ""

---

### 10. Чому `trim()` важливий для форм?

Користувач може випадково ввести пробіли до або після значення.

    "  Valeriy  "

Після:

    trim()

отримуємо:

    "Valeriy"

---

### 11. Чим `trim()` відрізняється від `replace()`?

`trim()` спеціально видаляє whitespace з країв.

`replace()` дозволяє виконувати значно ширший спектр замін.

---

### 12. Чи можна робити chaining?

Так:

    input.trim().toLowerCase()

---

### 13. Для чого потрібен `toLocaleLowerCase()`?

Для locale-sensitive перетворення регістру.

---

# 78. Learning Path

## 🟢 Core

Вивчити:

    toUpperCase()
    toLowerCase()
    trim()

Вміти:

• змінювати регістр  
• прибирати пробіли по краях  
• розуміти immutable strings  
• робити просте case-insensitive порівняння

---

## 🟡 Junior

Додати:

    trimStart()
    trimEnd()

Вміти:

• нормалізувати form input  
• перевіряти порожні значення  
• робити case-insensitive search  
• використовувати method chaining  
• комбінувати `trim()` з `includes()`, `startsWith()`, `endsWith()`

---

## 🟠 Middle

Розуміти:

    toLocaleLowerCase()
    toLocaleUpperCase()

А також:

• Unicode case conversion  
• locale-sensitive behavior  
• normalization pipeline  
• display value vs normalized value  
• обробку складного user input

---

## 🔴 Senior

Глибше розуміти:

• Unicode  
• locale  
• internationalization  
• Unicode normalization  
• edge cases різних мов  
• canonicalization  
• безпечну обробку user-generated content  
• вплив normalization на пошук та ідентифікатори

---

# 79. Mini Cheat Sheet

## Uppercase

    text.toUpperCase()

---

## Lowercase

    text.toLowerCase()

---

## Trim з обох боків

    text.trim()

---

## Trim зліва

    text.trimStart()

---

## Trim справа

    text.trimEnd()

---

## Старий alias

    text.trimLeft()

---

## Старий alias

    text.trimRight()

---

## Case-insensitive comparison

    a.toLowerCase() === b.toLowerCase()

---

## Перевірка порожнього input

    input.trim() === ""

---

## Нормалізація input

    input.trim().toLowerCase()

---

## Case-insensitive search

    text.toLowerCase().includes(
        query.toLowerCase()
    )

---

# 80. Головна таблиця

| Метод / поняття | Призначення |
|---|---|
| `toUpperCase()` | перевести в uppercase |
| `toLowerCase()` | перевести в lowercase |
| `trim()` | прибрати whitespace з обох боків |
| `trimStart()` | прибрати whitespace з початку |
| `trimEnd()` | прибрати whitespace з кінця |
| `trimLeft()` | старий alias `trimStart()` |
| `trimRight()` | старий alias `trimEnd()` |
| `toLocaleLowerCase()` | locale-aware lowercase |
| `toLocaleUpperCase()` | locale-aware uppercase |
| `case-sensitive` | регістр має значення |
| `case-insensitive` | регістр ігнорується |

---

# 81. Типовий pipeline

Для user input дуже часто:

    input
      ↓
    trim()
      ↓
    toLowerCase()
      ↓
    validation / comparison / search

Наприклад:

    const value = input
        .trim()
        .toLowerCase();

    if (value === "javascript") {
        console.log("Correct");
    }

---

# 82. Головні правила

> **Правило 1:** String methods не змінюють оригінальний string.

    const text = "JavaScript";

    const lower = text.toLowerCase();

---

> **Правило 2:** `trim()` працює тільки з краями.

    "  Hello World  ".trim();

    // "Hello World"

---

> **Правило 3:** для case-insensitive comparison нормалізуй обидві сторони.

    a.toLowerCase() === b.toLowerCase()

---

> **Правило 4:** перед перевіркою user input часто потрібно зробити `trim()`.

    input.trim() === ""

---

> **Правило 5:** для пошуку часто корисна комбінація:

    trim()
        +
    toLowerCase()
        +
    includes()

---

> **Правило 6:** не змінюй display value без потреби.

Краще:

    originalValue
    normalizedValue

ніж безпосередньо змінювати оригінальні дані.

---

# 83. Main Takeaways

• `toUpperCase()` переводить string у uppercase.

• `toLowerCase()` переводить string у lowercase.

• Обидва методи повертають новий string.

• String у JavaScript immutable.

• `trim()` прибирає whitespace з початку та кінця.

• `trimStart()` працює тільки з початком.

• `trimEnd()` працює тільки з кінцем.

• `trimLeft()` і `trimRight()` — альтернативні старі назви.

• `trim()` не видаляє внутрішні пробіли.

• Пробіл, tab та newline можуть бути whitespace.

• Case-sensitive означає, що регістр має значення.

• Для простого case-insensitive comparison можна використовувати `toLowerCase()` з обох боків.

• `trim()` дуже важливий при обробці користувацького введення.

• Дуже поширений pipeline:

    input
      ↓
    trim()
      ↓
    toLowerCase()
      ↓
    validation / search / comparison

• Для складних міжнародних сценаріїв існують `toLocaleLowerCase()` та `toLocaleUpperCase()`.

• Не потрібно бездумно переводити display text у lowercase — нормалізоване значення краще відокремлювати від оригінального.

---

# 84. Що повинен вміти після цієї теми

Ти повинен без підказки написати:

    const value = input
        .trim()
        .toLowerCase();

і розуміти кожен крок:

    trim()
        ↓
    прибрати зайві whitespace по краях

    toLowerCase()
        ↓
    привести регістр до єдиного вигляду

    value
        ↓
    використовувати для validation,
    comparison або search

Це одна з базових операцій обробки даних, яка постійно зустрічатиметься у frontend, backend, формах, пошуку, API та роботі з базами даних.