# 03. Search and Check

## Визначення

**Search and Check** — це пошук підрядків, символів або відповідності певній умові всередині `string`.

У JavaScript для цього найчастіше використовуються:

• `includes()` — чи містить рядок певний фрагмент  
• `startsWith()` — чи починається рядок з певного фрагмента  
• `endsWith()` — чи закінчується рядок певним фрагментом  
• `indexOf()` — позиція першого входження  
• `lastIndexOf()` — позиція останнього входження  
• `search()` — пошук за рядком або регулярним виразом  
• `match()` — отримання збігів з регулярним виразом  
• `matchAll()` — отримання всіх збігів із додатковою інформацією

> Для базового JavaScript особливо важливо добре знати `includes()`, `startsWith()`, `endsWith()` та `indexOf()`.

---

# 1. Основні поняття

## Пошук у string

Нехай маємо:

    const text = "JavaScript is powerful";

Можемо перевірити:

    text.includes("JavaScript"); // true
    text.includes("Python");     // false

Або знайти позицію:

    text.indexOf("JavaScript"); // 0
    text.indexOf("powerful");   // 15
    text.indexOf("Python");     // -1

---

# 2. `includes()`

## Визначення

`includes()` перевіряє, чи містить string певний підрядок.

Повертає:

• `true` — якщо знайдено  
• `false` — якщо не знайдено

Синтаксис:

    string.includes(searchString)

Приклад:

    const text = "I learn JavaScript";

    console.log(text.includes("JavaScript"));
    // true

    console.log(text.includes("Python"));
    // false

---

## `includes()` чутливий до регістру

    const text = "JavaScript";

    console.log(text.includes("JavaScript"));
    // true

    console.log(text.includes("javascript"));
    // false

Регістр має значення:

    "JavaScript" !== "javascript"

---

## Перевірка одного символу

    const word = "JavaScript";

    console.log(word.includes("J"));
    // true

    console.log(word.includes("x"));
    // false

---

## Перевірка пробілу

Пробіл також є частиною string.

    const text = "Hello world";

    console.log(text.includes(" "));
    // true

---

## Другий аргумент `position`

`includes()` може починати пошук із певної позиції.

Синтаксис:

    string.includes(searchString, position)

Приклад:

    const text = "JavaScript";

    console.log(text.includes("a"));
    // true

    console.log(text.includes("a", 3));
    // true

Пошук починається з індексу `3`.

---

# 3. `startsWith()`

## Визначення

`startsWith()` перевіряє, чи починається string із заданого фрагмента.

Повертає `true` або `false`.

    const text = "JavaScript";

    console.log(text.startsWith("Java"));
    // true

    console.log(text.startsWith("Script"));
    // false

---

## Перевірка початку URL

    const url = "https://example.com";

    console.log(url.startsWith("https://"));
    // true

Практичний випадок:

    if (url.startsWith("https://")) {
        console.log("Secure URL");
    }

---

## `startsWith()` чутливий до регістру

    const text = "Hello world";

    console.log(text.startsWith("Hello"));
    // true

    console.log(text.startsWith("hello"));
    // false

---

## Другий аргумент

Можна вказати позицію, з якої починати перевірку:

    const text = "JavaScript";

    console.log(text.startsWith("Script", 4));
    // true

String:

    JavaScript
    0123456789

`Script` починається з індексу `4`.

---

# 4. `endsWith()`

## Визначення

`endsWith()` перевіряє, чи закінчується string певним фрагментом.

    const file = "photo.jpg";

    console.log(file.endsWith(".jpg"));
    // true

    console.log(file.endsWith(".png"));
    // false

---

## Перевірка розширення файлу

    const fileName = "document.pdf";

    if (fileName.endsWith(".pdf")) {
        console.log("PDF file");
    }

---

## Перевірка закінчення речення

    const sentence = "Are you ready?";

    console.log(sentence.endsWith("?"));
    // true

---

## Регістр має значення

    const file = "photo.JPG";

    console.log(file.endsWith(".jpg"));
    // false

    console.log(file.endsWith(".JPG"));
    // true

---

# 5. `indexOf()`

## Визначення

`indexOf()` повертає індекс першого входження підрядка.

Якщо нічого не знайдено — повертає `-1`.

    const text = "JavaScript";

    console.log(text.indexOf("Java"));
    // 0

    console.log(text.indexOf("Script"));
    // 4

    console.log(text.indexOf("Python"));
    // -1

---

# 6. Індекси в `indexOf()`

String:

    const text = "JavaScript";

    // J a v a S c r i p t
    // 0 1 2 3 4 5 6 7 8 9

    console.log(text.indexOf("J"));
    // 0

    console.log(text.indexOf("S"));
    // 4

    console.log(text.indexOf("t"));
    // 9

---

# 7. `indexOf()` і повторення

Якщо символ або підрядок зустрічається декілька разів, `indexOf()` повертає **перше входження**.

    const text = "banana";

    console.log(text.indexOf("a"));
    // 1

String:

    banana
    012345

`a` зустрічається на позиціях:

    1
    3
    5

Але:

    text.indexOf("a");
    // 1

---

# 8. `lastIndexOf()`

## Визначення

`lastIndexOf()` повертає індекс **останнього входження**.

    const text = "banana";

    console.log(text.lastIndexOf("a"));
    // 5

Порівняння:

    text.indexOf("a");
    // 1

    text.lastIndexOf("a");
    // 5

---

# 9. `indexOf()` + перевірка існування

Один із класичних патернів:

    const text = "I learn JavaScript";

    if (text.indexOf("JavaScript") !== -1) {
        console.log("Found");
    }

Але для простої перевірки існування сучасніше використовувати:

    if (text.includes("JavaScript")) {
        console.log("Found");
    }

### Правило

Якщо потрібен тільки `true/false`:

    includes()

Якщо потрібна позиція:

    indexOf()

---

# 10. Важлива помилка з `indexOf()`

Не варто писати:

    if (text.indexOf("JavaScript")) {
        // ...
    }

Чому?

Якщо збіг знаходиться на позиції `0`:

    text.indexOf("JavaScript");
    // 0

`0` — falsy.

Тому умова не спрацює.

Правильно:

    if (text.indexOf("JavaScript") !== -1) {
        console.log("Found");
    }

Або простіше:

    if (text.includes("JavaScript")) {
        console.log("Found");
    }

---

# 11. `indexOf()` з другим аргументом

Можна вказати позицію, з якої почати пошук.

    const text = "banana";

    console.log(text.indexOf("a"));
    // 1

    console.log(text.indexOf("a", 2));
    // 3

    console.log(text.indexOf("a", 4));
    // 5

---

# 12. Пошук другого входження

За допомогою другого аргументу можна знайти наступне входження.

    const text = "banana";

    const first = text.indexOf("a");

    console.log(first);
    // 1

    const second = text.indexOf("a", first + 1);

    console.log(second);
    // 3

---

# 13. Пошук усіх входжень

Можна використовувати цикл.

    const text = "banana";
    const search = "a";

    let index = text.indexOf(search);

    while (index !== -1) {
        console.log(index);

        index = text.indexOf(search, index + 1);
    }

Результат:

    1
    3
    5

---

# 14. `search()`

## Визначення

`search()` шукає збіг у string.

Найчастіше використовується разом із **regular expression**.

    const text = "I learn JavaScript";

    console.log(text.search("JavaScript"));
    // 8

Якщо нічого не знайдено:

    console.log(text.search("Python"));
    // -1

---

## `search()` з RegExp

    const text = "Hello 123";

    console.log(text.search(/\d/));
    // 6

`\d` означає цифру.

---

## `search()` повертає тільки позицію

    const text = "Hello 123";

    const index = text.search(/\d/);

    console.log(index);
    // 6

`search()` не повертає сам знайдений текст.

---

# 15. `search()` vs `indexOf()`

### `indexOf()`

Підходить для звичайного пошуку рядка:

    const text = "Hello JavaScript";

    text.indexOf("JavaScript");
    // 6

### `search()`

Особливо корисний для RegExp:

    const text = "Hello 123";

    text.search(/\d+/);
    // 6

### Запам'ятати

    indexOf() → звичайний пошук + позиція

    search() → пошук + RegExp + позиція

---

# 16. `match()`

## Визначення

`match()` шукає збіги за RegExp і повертає результат пошуку.

    const text = "I have 25 apples";

    const result = text.match(/\d+/);

    console.log(result);

Без прапора `g` повертається інформація про перший збіг.

---

## Перший збіг

    const text = "123 abc 456";

    const result = text.match(/\d+/);

    console.log(result[0]);
    // "123"

---

# 17. `match()` з прапором `g`

`g` означає global — шукати всі збіги.

    const text = "123 abc 456 def 789";

    const numbers = text.match(/\d+/g);

    console.log(numbers);
    // ["123", "456", "789"]

---

# 18. `match()` якщо нічого не знайдено

    const text = "Hello world";

    const result = text.match(/\d+/g);

    console.log(result);
    // null

Тому при роботі з результатом треба враховувати `null`.

Наприклад:

    const numbers = text.match(/\d+/g) ?? [];

---

# 19. `matchAll()`

## Визначення

`matchAll()` дозволяє отримати **всі збіги RegExp** разом із додатковою інформацією про кожен збіг.

Зазвичай використовується з `g`.

    const text = "cat dog cat";

    const regex = /cat/g;

    const matches = text.matchAll(regex);

    for (const match of matches) {
        console.log(match[0], match.index);
    }

Результат:

    cat 0
    cat 8

---

# 20. `match()` vs `matchAll()`

### `match()`

Зручно, коли потрібно просто отримати всі збіги:

    const text = "10 20 30";

    const numbers = text.match(/\d+/g);

    console.log(numbers);
    // ["10", "20", "30"]

### `matchAll()`

Зручно, коли потрібна додаткова інформація:

    const text = "10 20 30";

    const matches = text.matchAll(/\d+/g);

    for (const match of matches) {
        console.log(match[0], match.index);
    }

---

# 21. Пошук без урахування регістру

Більшість стандартних string-пошуків чутливі до регістру.

Наприклад:

    const text = "JavaScript";

    console.log(text.includes("javascript"));
    // false

Якщо потрібно ігнорувати регістр, можна привести обидва рядки до одного регістру:

    const text = "JavaScript";
    const search = "javascript";

    console.log(
        text.toLowerCase().includes(search.toLowerCase())
    );
    // true

Цей підхід часто використовується для пошуку користувацького введення.

---

# 22. Пошук слова в тексті

    const text = "JavaScript is a programming language";

    const word = "programming";

    if (text.includes(word)) {
        console.log("Word found");
    }

---

# 23. Перевірка домену

    const email = "user@example.com";

    if (email.endsWith("@example.com")) {
        console.log("Example email");
    }

---

# 24. Перевірка URL

    const url = "https://example.com";

    if (url.startsWith("https://")) {
        console.log("HTTPS");
    }

---

# 25. Перевірка розширення файлу

    const fileName = "photo.png";

    if (fileName.endsWith(".png")) {
        console.log("PNG image");
    }

---

# 26. Перевірка кількох варіантів

Наприклад, дозволяємо `.jpg`, `.jpeg` або `.png`.

    const fileName = "photo.jpg";

    const isImage =
        fileName.endsWith(".jpg") ||
        fileName.endsWith(".jpeg") ||
        fileName.endsWith(".png");

    console.log(isImage);
    // true

---

# 27. Перевірка наявності кількох слів

    const text = "I learn JavaScript and React";

    const hasJavaScript = text.includes("JavaScript");
    const hasReact = text.includes("React");

    if (hasJavaScript && hasReact) {
        console.log("Full Stack direction");
    }

---

# 28. `includes()` vs `indexOf()`

| Завдання | Метод |
|---|---|
| Чи містить string фрагмент? | `includes()` |
| Знайти позицію першого входження | `indexOf()` |
| Знайти позицію останнього входження | `lastIndexOf()` |
| Пошук з RegExp | `search()` |
| Отримати збіги RegExp | `match()` |
| Отримати всі збіги + їх позиції | `matchAll()` |

---

# 29. `startsWith()` vs `includes()`

Ці методи вирішують різні задачі.

    const text = "JavaScript";

    text.includes("Script");
    // true

    text.startsWith("Script");
    // false

`Script` є всередині string, але не на початку.

---

# 30. `endsWith()` vs `includes()`

    const file = "photo.jpg";

    file.includes(".jpg");
    // true

    file.endsWith(".jpg");
    // true

Але:

    const text = ".jpg is an image format";

    text.includes(".jpg");
    // true

    text.endsWith(".jpg");
    // false

---

# 31. Пошук порожнього string

Цікавий випадок:

    const text = "JavaScript";

    console.log(text.includes(""));
    // true

Порожній string концептуально знаходиться в будь-якому string.

Також:

    console.log(text.indexOf(""));
    // 0

Тому при валідації даних треба бути уважним до порожнього пошукового рядка.

---

# 32. Пошук у порожньому string

    const text = "";

    console.log(text.includes("a"));
    // false

    console.log(text.indexOf("a"));
    // -1

    console.log(text.startsWith("a"));
    // false

    console.log(text.endsWith("a"));
    // false

---

# 33. `includes()` і типи даних

`includes()` для string шукає **string**.

Якщо передати число:

    const text = "12345";

    console.log(text.includes(123));
    // true

JavaScript приведе аргумент до string.

Але краще явно показувати намір:

    console.log(text.includes(String(123)));
    // true

---

# 34. String — case-sensitive

Пошук за замовчуванням враховує регістр.

    const text = "JavaScript";

    console.log(text.includes("Java"));
    // true

    console.log(text.includes("java"));
    // false

    console.log(text.includes("JAVASCRIPT"));
    // false

Для case-insensitive пошуку:

    const search = "javascript";

    const result = text.toLowerCase().includes(
        search.toLowerCase()
    );

---

# 35. Пошук у користувацькому введенні

Типовий практичний сценарій:

    const query = "javascript";
    const title = "JavaScript for beginners";

    if (
        title.toLowerCase().includes(query.toLowerCase())
    ) {
        console.log("Match");
    }

Це базова логіка пошуку:

    user input
        ↓
    normalize
        ↓
    includes()
        ↓
    true / false

---

# 36. Простий пошук у масиві об'єктів

Наприклад:

    const users = [
        { name: "Valeriy" },
        { name: "Anna" },
        { name: "John" }
    ];

    const query = "ann";

    const result = users.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase())
    );

Результат:

    [
        { name: "Anna" }
    ]

Тут `includes()` працює всередині логіки `filter()`.

---

# 37. Пошук слова на початку

    const command = "start-server";

    if (command.startsWith("start")) {
        console.log("Start command");
    }

---

# 38. Пошук слова в кінці

    const file = "database.sql";

    if (file.endsWith(".sql")) {
        console.log("SQL file");
    }

---

# 39. Пошук символу

    const email = "user@example.com";

    if (email.includes("@")) {
        console.log("Contains @");
    }

> Наявність `@` сама по собі ще не означає, що email валідний. Це лише проста перевірка.

---

# 40. Перевірка протоколу

    const url = "https://example.com";

    const isSecure =
        url.startsWith("https://");

    console.log(isSecure);
    // true

---

# 41. Пошук першого і останнього символу

Для цього можна поєднати доступ до string із `indexOf()` / `lastIndexOf()`.

    const text = "banana";

    console.log(text.indexOf("a"));
    // 1

    console.log(text.lastIndexOf("a"));
    // 5

---

# 42. Пошук останнього роздільника

Практичний приклад:

    const path = "src/components/Button/Button.jsx";

    const lastSlash = path.lastIndexOf("/");

    console.log(lastSlash);
    // 25

Це дозволяє визначити позицію останнього `/`.

---

# 43. Витягування імені файлу

Разом із методами доступу до string:

    const path = "src/components/Button/Button.jsx";

    const lastSlash = path.lastIndexOf("/");

    const fileName = path.slice(lastSlash + 1);

    console.log(fileName);
    // "Button.jsx"

> `slice()` детально розглядається в наступній темі про роботу з частинами string.

---

# 44. Витягування розширення

    const fileName = "photo.jpg";

    const dot = fileName.lastIndexOf(".");

    const extension = fileName.slice(dot + 1);

    console.log(extension);
    // "jpg"

---

# 45. Перевірка перед пошуком

Іноді потрібно перевірити, чи існує значення:

    const text = "JavaScript";

    const index = text.indexOf("Script");

    if (index !== -1) {
        console.log("Found at:", index);
    }

---

# 46. Пошук і умовна логіка

Пошук часто використовується разом з `if`.

    const role = "admin";

    if (role.includes("admin")) {
        console.log("Administrator");
    }

Але якщо перевіряємо точне значення, краще:

    if (role === "admin") {
        console.log("Administrator");
    }

> `includes()` — це пошук підрядка, а `===` — перевірка точного значення.

---

# 47. `includes()` не замінює `===`

Наприклад:

    const role = "superadmin";

    console.log(role.includes("admin"));
    // true

Але:

    console.log(role === "admin");
    // false

Тому потрібно правильно вибирати операцію залежно від задачі.

---

# 48. Пошук у RegExp

Для складніших правил використовується регулярний вираз.

Наприклад, перевірити, чи є в string цифра:

    const text = "Hello 123";

    console.log(/\d/.test(text));
    // true

Тут використовується `RegExp.prototype.test()`, а не string `search()`.

---

# 49. `search()` vs `RegExp.test()`

Якщо потрібна позиція:

    const text = "Hello 123";

    console.log(text.search(/\d/));
    // 6

Якщо потрібен тільки `true/false`:

    console.log(/\d/.test(text));
    // true

### Запам'ятати

    search() → position

    test() → true / false

---

# 50. Основний вибір методу

Коли бачиш задачу **"перевірити string"**, подумай:

### Чи містить?

    includes()

### Чи починається?

    startsWith()

### Чи закінчується?

    endsWith()

### Де перше входження?

    indexOf()

### Де останнє входження?

    lastIndexOf()

### Де збіг RegExp?

    search()

### Які збіги RegExp знайдено?

    match()

### Потрібні всі збіги та їх позиції?

    matchAll()

---

# 51. Типові практичні задачі

## Знайти слово

    const text = "I learn JavaScript";

    console.log(text.includes("JavaScript"));
    // true

---

## Перевірити URL

    const url = "https://example.com";

    console.log(url.startsWith("https://"));
    // true

---

## Перевірити файл

    const file = "image.png";

    console.log(file.endsWith(".png"));
    // true

---

## Знайти позицію

    const text = "Hello JavaScript";

    console.log(text.indexOf("JavaScript"));
    // 6

---

## Знайти останнє входження

    const text = "one two one";

    console.log(text.lastIndexOf("one"));
    // 8

---

## Знайти всі числа

    const text = "Age: 56, year: 2026";

    console.log(text.match(/\d+/g));
    // ["56", "2026"]

---

# 52. Common Mistakes

## ❌ Помилка: перевіряти `indexOf()` як boolean

    if (text.indexOf("JavaScript")) {
        // ...
    }

Проблема: позиція `0` є `false`.

Правильно:

    if (text.indexOf("JavaScript") !== -1) {
        // ...
    }

Або:

    if (text.includes("JavaScript")) {
        // ...
    }

---

## ❌ Помилка: забувати про регістр

    const text = "JavaScript";

    text.includes("javascript");
    // false

Потрібно нормалізувати регістр, якщо задача цього вимагає.

---

## ❌ Помилка: використовувати `includes()` замість точного порівняння

    const role = "superadmin";

    role.includes("admin");
    // true

Але це не означає:

    role === "admin";
    // false

---

## ❌ Помилка: плутати `startsWith()` та `includes()`

    "JavaScript".includes("Script");
    // true

    "JavaScript".startsWith("Script");
    // false

---

## ❌ Помилка: плутати `endsWith()` та `includes()`

    "photo.jpg".includes(".jpg");
    // true

    "photo.jpg".endsWith(".jpg");
    // true

Але `.jpg` може знаходитися і посередині string.

---

## ❌ Помилка: забувати про `-1`

`indexOf()` та `lastIndexOf()` повертають `-1`, якщо збіг не знайдений.

    const index = "JavaScript".indexOf("Python");

    console.log(index);
    // -1

---

## ❌ Помилка: не враховувати `null` у `match()`

    const result = "Hello".match(/\d+/g);

    console.log(result);
    // null

Потрібно враховувати можливість відсутності збігу.

---

# 53. Практичний міні-проєкт

## Перевірка файлу

Завдання:

• отримати ім'я файлу  
• перевірити, чи це зображення  
• дозволити `.jpg`, `.jpeg`, `.png`

    const fileName = "photo.jpg";

    const isImage =
        fileName.endsWith(".jpg") ||
        fileName.endsWith(".jpeg") ||
        fileName.endsWith(".png");

    if (isImage) {
        console.log("Image file");
    } else {
        console.log("Not an image");
    }

---

# 54. Практичний міні-проєкт: пошук

    const products = [
        "JavaScript Book",
        "TypeScript Book",
        "React Course",
        "Node.js Course"
    ];

    const query = "script";

    const result = products.filter(product =>
        product.toLowerCase().includes(query.toLowerCase())
    );

    console.log(result);

Результат:

    [
        "JavaScript Book",
        "TypeScript Book"
    ]

Це вже реальна логіка, яка використовується у пошуку товарів, користувачів, статей тощо.

---

# 55. Практичний міні-проєкт: перевірка URL

    const url = "https://example.com";

    const isHttp =
        url.startsWith("http://") ||
        url.startsWith("https://");

    if (isHttp) {
        console.log("Valid protocol");
    }

---

# 56. Практичний міні-проєкт: пошук чисел

    const text = "There are 25 students and 3 teachers.";

    const numbers = text.match(/\d+/g) ?? [];

    console.log(numbers);
    // ["25", "3"]

---

# 57. Практичний алгоритм пошуку

Для більшості задач можна використовувати таку послідовність:

    1. Отримати string
           ↓
    2. Визначити, що саме шукаємо
           ↓
    3. Вибрати метод
           ↓
    4. Отримати результат
           ↓
    5. Використати результат в умові / алгоритмі

Наприклад:

    const email = "user@example.com";

    const isExampleEmail =
        email.endsWith("@example.com");

    if (isExampleEmail) {
        console.log("Example domain");
    }

---

# 58. Що потрібно знати на Junior-рівні

Обов'язково:

• `includes()`  
• `startsWith()`  
• `endsWith()`  
• `indexOf()`  
• `lastIndexOf()`  
• `search()` на базовому рівні  
• `match()` на базовому рівні  
• case-sensitive пошук  
• `-1` як результат відсутності для `indexOf()`  
• різницю між пошуком і точним порівнянням  
• використання пошуку в `if`  
• використання пошуку разом із `filter()`  
• пошук у користувацькому введенні

---

# 59. Що варто знати глибше

Для впевненої роботи:

• другий аргумент `includes()`  
• другий аргумент `startsWith()`  
• другий аргумент `endsWith()`  
• другий аргумент `indexOf()`  
• другий аргумент `lastIndexOf()`  
• `search()` + RegExp  
• `match()` + прапор `g`  
• `matchAll()`  
• case-insensitive пошук  
• пошук усіх входжень  
• комбінування search-методів з `if`, `filter()`, `map()` та іншими методами

---

# 60. Interview Questions

### 1. Що повертає `includes()`?

    true або false

---

### 2. Що повертає `indexOf()`?

Індекс першого входження або:

    -1

якщо нічого не знайдено.

---

### 3. Чим `indexOf()` відрізняється від `includes()`?

    indexOf() → позиція

    includes() → true / false

---

### 4. Чим `indexOf()` відрізняється від `lastIndexOf()`?

    indexOf() → перше входження

    lastIndexOf() → останнє входження

---

### 5. Чим `startsWith()` відрізняється від `includes()`?

`startsWith()` перевіряє початок string.

`includes()` шукає фрагмент у будь-якому місці.

---

### 6. Чим `endsWith()` відрізняється від `includes()`?

`endsWith()` перевіряє кінець string.

---

### 7. Чому це небезпечно?

    if (text.indexOf("JavaScript")) {
        // ...
    }

Тому що якщо збіг на позиції `0`, умова буде `false`.

---

### 8. Як правильно перевірити результат `indexOf()`?

    if (text.indexOf("JavaScript") !== -1) {
        // ...
    }

Або:

    if (text.includes("JavaScript")) {
        // ...
    }

---

### 9. Чи чутливий `includes()` до регістру?

Так.

    "JavaScript".includes("javascript");
    // false

---

### 10. Для чого використовується `search()`?

Для пошуку збігу, особливо з регулярним виразом. Повертає позицію першого збігу або `-1`.

---

### 11. Для чого використовується `match()`?

Для отримання збігів за регулярним виразом.

---

### 12. Чим `match()` відрізняється від `matchAll()`?

`matchAll()` дозволяє отримувати всі збіги разом із додатковою інформацією, наприклад позицією збігу.

---

# 61. Learning Path

## 🟢 Core

Вивчити:

    includes()
    startsWith()
    endsWith()
    indexOf()
    lastIndexOf()

Вміти:

• перевіряти наявність тексту  
• перевіряти початок і кінець  
• знаходити позицію  
• правильно працювати з `-1`

---

## 🟡 Junior

Додати:

    search()
    match()

Вміти:

• виконувати простий пошук через RegExp  
• отримувати збіги  
• працювати з `match(.../g)`  
• робити case-insensitive пошук  
• використовувати search у практичних алгоритмах

---

## 🟠 Middle

Розуміти:

    matchAll()

Вміти:

• отримувати всі збіги  
• отримувати позиції збігів  
• комбінувати RegExp та string API  
• будувати пошук по тексту  
• працювати з великими текстовими даними

---

## 🔴 Senior

Глибше розуміти:

• Unicode  
• RegExp engine  
• складність пошуку  
• поведінку пошуку в різних сценаріях  
• нормалізацію тексту  
• case-insensitive пошук  
• локалізацію та Unicode-aware операції  
• продуктивність пошуку  
• безпечну обробку користувацького введення

---

# 62. Mini Cheat Sheet

## Перевірити наявність

    text.includes("JavaScript");

    // true / false

---

## Перевірити початок

    text.startsWith("Java");

    // true / false

---

## Перевірити кінець

    text.endsWith(".js");

    // true / false

---

## Знайти перше входження

    text.indexOf("Java");

    // index / -1

---

## Знайти останнє входження

    text.lastIndexOf("a");

    // index / -1

---

## Пошук RegExp

    text.search(/\d+/);

    // index / -1

---

## Отримати збіги

    text.match(/\d+/g);

    // array / null

---

## Отримати всі збіги з позиціями

    text.matchAll(/\d+/g);

    // iterator

---

# 63. Головна таблиця

| Метод | Що робить | Результат |
|---|---|---|
| `includes()` | перевіряє наявність | `true / false` |
| `startsWith()` | перевіряє початок | `true / false` |
| `endsWith()` | перевіряє кінець | `true / false` |
| `indexOf()` | шукає перше входження | `index / -1` |
| `lastIndexOf()` | шукає останнє входження | `index / -1` |
| `search()` | шукає збіг, у т.ч. RegExp | `index / -1` |
| `match()` | отримує збіги RegExp | `array / null` |
| `matchAll()` | отримує всі збіги з інформацією | `iterator` |

---

# 64. Головне, що потрібно запам'ятати

```text
includes()
    ↓
Чи є цей фрагмент?
    ↓
true / false