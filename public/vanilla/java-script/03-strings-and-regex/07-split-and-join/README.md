# 07. `split()` та `join()`

## Визначення

`split()` та `join()` — методи JavaScript для перетворення:

- рядка → масив (`split()`);
- масиву → рядок (`join()`).

Це одна з найважливіших пар операцій під час роботи з текстом.

Основна схема:

    String
       ↓
    split()
       ↓
    Array
       ↓
    обробка масиву
       ↓
    join()
       ↓
    String

Наприклад:

    const text = "HTML CSS JavaScript";

    const words = text.split(" ");

    console.log(words);
    // ["HTML", "CSS", "JavaScript"]

Потім:

    const result = words.join("-");

    console.log(result);
    // "HTML-CSS-JavaScript"

---

# 1. `split()`

## Синтаксис

    string.split(separator, limit)

де:

- `separator` — за яким роздільником розбивати рядок;
- `limit` — максимальна кількість елементів результату.

`split()` повертає **масив**.

---

# 2. Простий `split()`

    const text = "HTML CSS JavaScript";

    const words = text.split(" ");

    console.log(words);
    // ["HTML", "CSS", "JavaScript"]

Рядок:

    "HTML CSS JavaScript"

перетворюється на:

    ["HTML", "CSS", "JavaScript"]

Роздільник:

    " "

— звичайний пробіл.

---

# 3. `split()` за комою

    const fruits = "apple,banana,orange";

    const result = fruits.split(",");

    console.log(result);
    // ["apple", "banana", "orange"]

---

# 4. `split()` за крапкою з комою

    const data = "HTML;CSS;JavaScript";

    const result = data.split(";");

    console.log(result);
    // ["HTML", "CSS", "JavaScript"]

---

# 5. `split()` за дефісом

    const date = "2026-09-14";

    const parts = date.split("-");

    console.log(parts);
    // ["2026", "09", "14"]

Тепер кожна частина доступна окремо:

    console.log(parts[0]);
    // "2026"

    console.log(parts[1]);
    // "09"

    console.log(parts[2]);
    // "14"

---

# 6. `split()` за кількома символами

Роздільником може бути рядок із кількох символів.

    const text = "one---two---three";

    const result = text.split("---");

    console.log(result);
    // ["one", "two", "three"]

---

# 7. `split()` без аргументів

Якщо викликати `split()` без `separator`, рядок не розбивається на окремі символи.

    const text = "hello";

    const result = text.split();

    console.log(result);
    // ["hello"]

Це важливо.

Для отримання символів потрібно:

    const result = text.split("");

    console.log(result);
    // ["h", "e", "l", "l", "o"]

---

# 8. `split("")`

Порожній рядок як `separator` розбиває рядок між символами.

    const text = "hello";

    const chars = text.split("");

    console.log(chars);
    // ["h", "e", "l", "l", "o"]

Це простий спосіб перетворити рядок на масив символів.

Але для роботи з Unicode потрібно пам'ятати про UTF-16 та surrogate pairs.

---

# 9. `split()` з `limit`

Другий аргумент дозволяє обмежити кількість елементів.

    const text = "HTML CSS JavaScript TypeScript";

    const result = text.split(" ", 2);

    console.log(result);
    // ["HTML", "CSS"]

---

# 10. `limit = 1`

    const text = "HTML CSS JavaScript";

    const result = text.split(" ", 1);

    console.log(result);
    // ["HTML"]

---

# 11. `limit = 0`

Якщо `limit` дорівнює `0`:

    const text = "HTML CSS JavaScript";

    const result = text.split(" ", 0);

    console.log(result);
    // []

---

# 12. `join()`

## Синтаксис

    array.join(separator)

`join()` об'єднує елементи масиву в один рядок.

    const words = ["HTML", "CSS", "JavaScript"];

    const result = words.join(" ");

    console.log(result);
    // "HTML CSS JavaScript"

---

# 13. `join()` з комою

    const fruits = ["apple", "banana", "orange"];

    const result = fruits.join(",");

    console.log(result);
    // "apple,banana,orange"

---

# 14. `join()` з пробілом

    const words = ["Hello", "world"];

    const result = words.join(" ");

    console.log(result);
    // "Hello world"

---

# 15. `join()` з дефісом

    const words = ["javascript", "string", "methods"];

    const result = words.join("-");

    console.log(result);
    // "javascript-string-methods"

Це часто використовується для створення `slug`.

---

# 16. `join()` без аргументів

Якщо не передати separator, використовується кома.

    const items = ["HTML", "CSS", "JS"];

    const result = items.join();

    console.log(result);
    // "HTML,CSS,JS"

Тому:

    join()

еквівалентно:

    join(",")

---

# 17. `split()` + `join()`

Це одна з найважливіших комбінацій.

    const text = "Hello world";

    const result = text
        .split(" ")
        .join("-");

    console.log(result);
    // "Hello-world"

Логіка:

    "Hello world"
          ↓
       split(" ")
          ↓
    ["Hello", "world"]
          ↓
       join("-")
          ↓
    "Hello-world"

---

# 18. Заміна всіх входжень через `split().join()`

До появи `replaceAll()` часто використовували:

    const text = "cat cat cat";

    const result = text
        .split("cat")
        .join("dog");

    console.log(result);
    // "dog dog dog"

Сьогодні для простої буквальної заміни краще:

    const result = text.replaceAll("cat", "dog");

Але `split().join()` важливо розуміти, тому що цей патерн зустрічається у старому коді та іноді використовується свідомо.

---

# 19. Перетворення CSV-подібного рядка в масив

    const input = "apple,banana,orange";

    const fruits = input.split(",");

    console.log(fruits);
    // ["apple", "banana", "orange"]

Тепер можна працювати з масивом:

    console.log(fruits[0]);
    // "apple"

    console.log(fruits.length);
    // 3

---

# 20. Перетворення масиву назад у рядок

    const fruits = ["apple", "banana", "orange"];

    const result = fruits.join(", ");

    console.log(result);
    // "apple, banana, orange"

---

# 21. Практичний pipeline

Дуже важлива модель:

    String
       ↓
    split()
       ↓
    Array
       ↓
    map()
       ↓
    filter()
       ↓
    join()
       ↓
    String

Наприклад:

    const text = "html, css, javascript";

    const result = text
        .split(",")
        .map(item => item.trim())
        .join(" | ");

    console.log(result);
    // "html | css | javascript"

---

# 22. `split()` + `trim()`

При розділенні за комою часто залишаються пробіли:

    const text = "apple, banana, orange";

    const result = text.split(",");

    console.log(result);
    // ["apple", " banana", " orange"]

Зверни увагу:

    " banana"
    " orange"

мають пробіли на початку.

Тому:

    const result = text
        .split(",")
        .map(item => item.trim());

    console.log(result);
    // ["apple", "banana", "orange"]

---

# 23. `split()` + `map()`

Це дуже поширений патерн.

    const text = "10,20,30";

    const numbers = text
        .split(",")
        .map(Number);

    console.log(numbers);
    // [10, 20, 30]

Без `map(Number)`:

    ["10", "20", "30"]

Після:

    [10, 20, 30]

---

# 24. `split()` + `map(Number)`

Практичний приклад:

    const input = "10, 20, 30, 40";

    const numbers = input
        .split(",")
        .map(item => Number(item.trim()));

    console.log(numbers);
    // [10, 20, 30, 40]

---

# 25. `join()` після `map()`

Можна змінити кожен елемент, а потім знову отримати рядок.

    const words = ["hello", "world"];

    const result = words
        .map(word => word.toUpperCase())
        .join(" ");

    console.log(result);
    // "HELLO WORLD"

---

# 26. `split()` + `reverse()` + `join()`

Класична вправа:

    const text = "hello";

    const result = text
        .split("")
        .reverse()
        .join("");

    console.log(result);
    // "olleh"

Логіка:

    "hello"
       ↓
    ["h", "e", "l", "l", "o"]
       ↓
    ["o", "l", "l", "e", "h"]
       ↓
    "olleh"

---

# 27. Розвернути слова

    const text = "JavaScript is powerful";

    const result = text
        .split(" ")
        .reverse()
        .join(" ");

    console.log(result);
    // "powerful is JavaScript"

Тут ми не розвертаємо символи.

Ми розвертаємо **порядок слів**.

---

# 28. Порахувати слова

`split()` часто використовується разом із `length`.

    const text = "JavaScript is very useful";

    const words = text.split(" ");

    console.log(words.length);
    // 4

Але для реального тексту простий `split(" ")` може давати неправильний результат через кілька пробілів, переноси рядків тощо.

Надійніший варіант:

    const words = text
        .trim()
        .split(/\s+/);

---

# 29. Порахувати слова в тексті

    const text = "  JavaScript   is   very useful  ";

    const words = text
        .trim()
        .split(/\s+/);

    console.log(words);
    // ["JavaScript", "is", "very", "useful"]

    console.log(words.length);
    // 4

Тут використовується `RegExp`:

    /\s+/

де:

- `\s` — whitespace;
- `+` — один або більше.

---

# 30. `split()` з `RegExp`

`separator` може бути регулярним виразом.

    const text = "one,two;three|four";

    const result = text.split(/[,;|]/);

    console.log(result);
    // ["one", "two", "three", "four"]

Можна описати кілька можливих роздільників.

---

# 31. Розділення за пробілами різних типів

    const text = "one two\nthree\tfour";

    const result = text.split(/\s+/);

    console.log(result);
    // ["one", "two", "three", "four"]

`\s` враховує:

- пробіли;
- табуляцію;
- переноси рядків;
- інші whitespace characters.

---

# 32. `split()` з capturing groups

Якщо `separator` є RegExp із capturing group, знайдені роздільники можуть потрапити до результату.

    const text = "one-two-three";

    const result = text.split(/(-)/);

    console.log(result);
    // ["one", "-", "two", "-", "three"]

Це вже більш просунутий випадок.

Для звичайної роботи достатньо пам'ятати:

    split(separator)

а складніші можливості `RegExp` вивчати окремо.

---

# 33. Порожній рядок

Що буде:

    "".split(",")

Результат:

    [""]

Це важливий edge case.

А:

    "".split("")

дасть:

    []

---

# 34. `join()` з порожнім масивом

    const items = [];

    const result = items.join(",");

    console.log(result);
    // ""

`join()` повертає порожній рядок.

---

# 35. `join()` та `null` / `undefined`

`join()` перетворює `null` та `undefined` на порожні елементи.

    const values = ["A", null, "B", undefined, "C"];

    const result = values.join("-");

    console.log(result);
    // "A--B--C"

Тому при роботі з даними потрібно враховувати можливі `null` / `undefined`.

---

# 36. `join()` з числами

Елементи масиву не обов'язково повинні бути рядками.

    const numbers = [10, 20, 30];

    const result = numbers.join(", ");

    console.log(result);
    // "10, 20, 30"

`join()` автоматично перетворює елементи на рядкове представлення.

---

# 37. `join()` з Boolean

    const values = [true, false, true];

    const result = values.join("-");

    console.log(result);
    // "true-false-true"

---

# 38. Вкладені масиви

Це важливий edge case.

    const values = [[1, 2], [3, 4]];

    console.log(values.join("-"));
    // "1,2-3,4"

Вкладені масиви також перетворюються в рядок.

Але не варто використовувати `join()` як універсальний спосіб серіалізації складних структур даних.

Для цього існує `JSON.stringify()`.

---

# 39. Створення slug

Один із найпрактичніших прикладів:

    const title = "JavaScript String Methods";

    const slug = title
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .join("-");

    console.log(slug);
    // "javascript-string-methods"

Ще один варіант:

    const slug = title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

У простому випадку `replace()` може бути коротшим.

---

# 40. Створення речення з масиву

    const words = ["JavaScript", "is", "powerful"];

    const sentence = words.join(" ");

    console.log(sentence);
    // "JavaScript is powerful"

---

# 41. Створення списку

    const items = ["HTML", "CSS", "JavaScript"];

    const list = items.join(", ");

    console.log(list);
    // "HTML, CSS, JavaScript"

---

# 42. Створення URL-шляху

    const segments = ["users", "123", "profile"];

    const path = segments.join("/");

    console.log(path);
    // "users/123/profile"

Отримаємо:

    users/123/profile

Це може бути корисним при формуванні URL-шляхів.

---

# 43. Створення SQL-подібного списку

Наприклад, потрібно отримати список колонок:

    const columns = ["id", "name", "email"];

    const result = columns.join(", ");

    console.log(result);
    // "id, name, email"

У реальному backend-коді SQL не слід будувати шляхом небезпечної конкатенації користувацьких значень. Для SQL використовують параметризовані запити.

---

# 44. Перетворення введення користувача

Наприклад:

    const input = "JavaScript, TypeScript, React";

Перетворимо в масив:

    const skills = input
        .split(",")
        .map(skill => skill.trim());

    console.log(skills);
    // ["JavaScript", "TypeScript", "React"]

Тепер можна:

    skills.forEach(skill => {
        console.log(skill);
    });

---

# 45. Масив назад у текст

    const skills = ["JavaScript", "TypeScript", "React"];

    const text = skills.join(", ");

    console.log(text);
    // "JavaScript, TypeScript, React"

---

# 46. `split()` → `map()` → `filter()` → `join()`

Це дуже корисний pipeline.

    const input = "JavaScript, , TypeScript, , React";

    const result = input
        .split(",")
        .map(item => item.trim())
        .filter(Boolean)
        .join(", ");

    console.log(result);
    // "JavaScript, TypeScript, React"

Логіка:

    String
      ↓
    split()
      ↓
    Array
      ↓
    map()
      ↓
    очищення
      ↓
    filter()
      ↓
    видалення порожніх значень
      ↓
    join()
      ↓
    String

---

# 47. Важлива різниця: `split()` vs `join()`

| Метод | Викликається на | Повертає |
|---|---|---|
| `split()` | String | Array |
| `join()` | Array | String |

Запам'ятай:

    "a,b,c".split(",")
    → ["a", "b", "c"]

    ["a", "b", "c"].join(",")
    → "a,b,c"

---

# 48. `split()` та `join()` як парні операції

Можна думати про них як про протилежні перетворення:

    String
      ↓
    split()
      ↓
    Array

і:

    Array
      ↓
    join()
      ↓
    String

Наприклад:

    const text = "A-B-C";

    const array = text.split("-");

    const result = array.join("-");

    console.log(result);
    // "A-B-C"

У цьому випадку ми повернулися до початкового представлення.

---

# 49. Але `split()` + `join()` не завжди повертають оригінальний рядок

Наприклад:

    const text = "A--B";

    const result = text
        .split("-")
        .join("-");

    console.log(result);
    // "A--B"

Але якщо між операціями змінити структуру:

    const result = text
        .split("-")
        .filter(Boolean)
        .join("-");

    console.log(result);
    // "A-B"

Тому pipeline може не просто перетворювати формат, а й змінювати дані.

---

# 50. Практичний приклад: tags

Користувач вводить:

    const input = "javascript, react, nextjs";

Отримуємо масив тегів:

    const tags = input
        .split(",")
        .map(tag => tag.trim())
        .filter(Boolean);

    console.log(tags);
    // ["javascript", "react", "nextjs"]

Для відображення:

    const text = tags.join(" #");

    console.log("#" + text);
    // "#javascript #react #nextjs"

---

# 51. Практичний приклад: список технологій

    const input = "HTML, CSS, JavaScript, TypeScript";

    const technologies = input
        .split(",")
        .map(item => item.trim());

    console.log(technologies);

Результат:

    [
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript"
    ]

---

# 52. Практичний приклад: шлях до файлу

    const path = "src/components/Button.tsx";

    const parts = path.split("/");

    console.log(parts);
    // ["src", "components", "Button.tsx"]

Останній елемент:

    const fileName = parts[parts.length - 1];

    console.log(fileName);
    // "Button.tsx"

Або:

    const fileName = path.split("/").pop();

---

# 53. Практичний приклад: розширення файлу

    const fileName = "README.md";

    const parts = fileName.split(".");

    console.log(parts);
    // ["README", "md"]

Розширення:

    const extension = parts[parts.length - 1];

    console.log(extension);
    // "md"

Але для складних імен файлів та реальної файлової системи краще використовувати спеціалізовані API.

---

# 54. Практичний приклад: ім'я та прізвище

    const fullName = "Valeriy Svystun";

    const [firstName, lastName] = fullName.split(" ");

    console.log(firstName);
    // "Valeriy"

    console.log(lastName);
    // "Svystun"

Тут `split()` добре поєднується з destructuring.

---

# 55. Практичний приклад: координати

    const input = "49.2331, 28.4682";

    const [latitude, longitude] = input
        .split(",")
        .map(Number);

    console.log(latitude);
    // 49.2331

    console.log(longitude);
    // 28.4682

---

# 56. Практичний приклад: ключі об'єкта

Є рядок:

    const input = "name,email,age";

Можна отримати:

    const fields = input.split(",");

    console.log(fields);
    // ["name", "email", "age"]

Потім використовувати їх для подальшої обробки.

---

# 57. `split()` та Unicode

Обережно з:

    string.split("")

Наприклад, emoji можуть складатися з кількох UTF-16 code units.

    const text = "😀";

    console.log(text.length);
    // 2

І:

    console.log(text.split("").length);
    // 2

Хоча візуально це один символ.

Для коректнішої роботи з Unicode можна використовувати:

    const chars = [...text];

    console.log(chars.length);
    // 1

або:

    const chars = Array.from(text);

    console.log(chars.length);
    // 1

Це вже продовження теми Unicode та ітерації рядків.

---

# 58. `split()` та регулярні вирази

`split()` може бути дуже потужним у поєднанні з `RegExp`.

Наприклад:

    const text = "one, two; three|four";

    const result = text.split(/[,;|]\s*/);

    console.log(result);
    // ["one", "two", "three", "four"]

Тут ми враховуємо:

- кому;
- крапку з комою;
- `|`;
- можливі пробіли після роздільника.

---

# 59. `split()` vs `replace()`

Це важлива практична відмінність.

Якщо потрібно:

    "Hello world"

перетворити на:

    "Hello-world"

можна:

    text.replace(" ", "-");

Але якщо потрібно **працювати зі словами як з окремими елементами**, краще:

    const words = text.split(" ");

Тобто:

    replace()
    → трансформація рядка

    split()
    → отримання структури масиву

---

# 60. `split()` vs `replaceAll()`

Для:

    "cat cat cat"

простішим є:

    text.replaceAll("cat", "dog");

А:

    text.split("cat").join("dog");

теж працює, але має зайвий проміжний масив.

Тому:

> Для простої заміни тексту використовуй `replace()` / `replaceAll()`.  
> `split()` використовуй тоді, коли тобі справді потрібен масив.

---

# 61. `join()` vs template literals

Можна сформувати рядок:

    const name = "Valeriy";
    const age = 56;

    const result = `${name} is ${age} years old`;

Для кількох окремих значень template literals часто зручніші.

`join()` особливо корисний, коли значення вже знаходяться в масиві:

    const skills = ["JavaScript", "React", "Node.js"];

    const result = skills.join(", ");

---

# 62. Типова помилка №1 — забути, що `split()` повертає масив

    const text = "a,b,c";

    const result = text.split(",");

    console.log(typeof result);
    // "object"

`result` — масив.

    console.log(Array.isArray(result));
    // true

---

# 63. Типова помилка №2 — забути separator

    const text = "a,b,c";

    console.log(text.split());
    // ["a,b,c"]

Потрібно:

    console.log(text.split(","));
    // ["a", "b", "c"]

---

# 64. Типова помилка №3 — використовувати неправильний separator

    const text = "a, b, c";

    const result = text.split(";");

    console.log(result);
    // ["a, b, c"]

Якщо фактичний роздільник — кома:

    text.split(",");

---

# 65. Типова помилка №4 — пробіли після separator

    const text = "a, b, c";

    const result = text.split(",");

    console.log(result);
    // ["a", " b", " c"]

Тому:

    const result = text
        .split(",")
        .map(item => item.trim());

---

# 66. Типова помилка №5 — `join()` без separator

    const words = ["Hello", "world"];

    console.log(words.join());
    // "Hello,world"

Якщо потрібен пробіл:

    console.log(words.join(" "));
    // "Hello world"

---

# 67. Типова помилка №6 — плутати `split()` та `join()`

Запам'ятай:

    String → split() → Array

    Array → join() → String

---

# 68. Типова помилка №7 — `split("")` для Unicode

    "😀".split("")

може дати два UTF-16 code units замість одного видимого символу.

Для Unicode-safe ітерації:

    [..."😀"]

або:

    Array.from("😀")

---

# 69. Типова помилка №8 — використовувати `split().join()` всюди

Патерн:

    text.split("old").join("new");

працює.

Але якщо мета просто замінити всі входження:

    text.replaceAll("old", "new");

є зрозумілішим.

---

# 70. Практична схема роботи

Коли бачиш задачу з текстом, подумай:

    Чи треба отримати частини тексту?
            ↓
        split()

    Чи треба обробити кожну частину?
            ↓
        map()

    Чи треба видалити частини?
            ↓
        filter()

    Чи треба зібрати назад у текст?
            ↓
        join()

Наприклад:

    const input = " JS, React, , Node.js ";

    const result = input
        .split(",")
        .map(item => item.trim())
        .filter(Boolean)
        .join(", ");

    console.log(result);
    // "JS, React, Node.js"

---

# 71. Типовий Full Stack JavaScript pipeline

На frontend:

    input.value
        ↓
    split(",")
        ↓
    trim()
        ↓
    filter()
        ↓
    Array
        ↓
    fetch()
        ↓
    backend

На backend:

    request data
        ↓
    validation
        ↓
    normalization
        ↓
    database

Наприклад, поле:

    "JavaScript, React, PostgreSQL"

можна перетворити:

    [
        "JavaScript",
        "React",
        "PostgreSQL"
    ]

і далі вже працювати з масивом.

---

# 72. Міні-шпаргалка

## String → Array

    const result = text.split(",");

---

## String → words

    const words = text.split(" ");

---

## String → characters

    const chars = text.split("");

---

## Обмежити кількість результатів

    const result = text.split(",", 3);

---

## Array → String

    const result = array.join(",");

---

## Array → String з пробілом

    const result = array.join(" ");

---

## Array → String з `-`

    const result = array.join("-");

---

## CSV → Array

    const items = input
        .split(",")
        .map(item => item.trim());

---

## Array → CSV

    const csv = items.join(",");

---

## Reverse string

    const result = text
        .split("")
        .reverse()
        .join("");

---

## Reverse words

    const result = text
        .split(" ")
        .reverse()
        .join(" ");

---

## Slug

    const slug = title
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .join("-");

---

## Тільки слова

    const words = text
        .trim()
        .split(/\s+/);

---

## Очищення списку

    const result = input
        .split(",")
        .map(item => item.trim())
        .filter(Boolean)
        .join(", ");

---

# 73. Практичні вправи

## Вправа 1 — розділити слова

Дано:

    const text = "HTML CSS JavaScript";

Отримати:

    ["HTML", "CSS", "JavaScript"]

---

## Вправа 2 — CSV

Дано:

    const text = "apple,banana,orange";

Отримати масив:

    ["apple", "banana", "orange"]

---

## Вправа 3 — масив назад у рядок

Дано:

    const items = ["HTML", "CSS", "JavaScript"];

Отримати:

    "HTML, CSS, JavaScript"

---

## Вправа 4 — slug

Дано:

    const title = "JavaScript String Methods";

Отримати:

    "javascript-string-methods"

---

## Вправа 5 — числа

Дано:

    const input = "10, 20, 30, 40";

Отримати:

    [10, 20, 30, 40]

---

## Вправа 6 — reverse string

Дано:

    const text = "JavaScript";

Отримати:

    "tpircSavaJ"

---

## Вправа 7 — reverse words

Дано:

    const text = "JavaScript is powerful";

Отримати:

    "powerful is JavaScript"

---

## Вправа 8 — очистити список

Дано:

    const input = "JS, , React,   , Node.js";

Отримати:

    ["JS", "React", "Node.js"]

---

## Вправа 9 — координати

Дано:

    const input = "49.2331, 28.4682";

Отримати дві числові змінні:

    latitude
    longitude

---

## Вправа 10 — ім'я

Дано:

    const fullName = "John Smith";

За допомогою `split()` отримати:

    firstName
    lastName

---

# 74. Interview Questions

### 1. Що робить `split()`?

Розбиває рядок на масив за заданим `separator`.

    "a,b,c".split(",");

Результат:

    ["a", "b", "c"]

---

### 2. Що робить `join()`?

Об'єднує елементи масиву в рядок.

    ["a", "b", "c"].join(",");

Результат:

    "a,b,c"

---

### 3. Який тип повертає `split()`?

`Array`.

---

### 4. Який тип повертає `join()`?

`String`.

---

### 5. Що робить `split("")`?

Розбиває рядок на UTF-16 code units, тому для деяких Unicode-символів результат може бути неочікуваним.

---

### 6. Що буде при `join()` без аргументів?

Використовується кома:

    ["a", "b", "c"].join();

Результат:

    "a,b,c"

---

### 7. Як перетворити CSV-подібний рядок на масив?

    const items = text
        .split(",")
        .map(item => item.trim());

---

### 8. Як перетворити масив у рядок через пробіл?

    array.join(" ");

---

### 9. Як розвернути рядок?

    text
        .split("")
        .reverse()
        .join("");

---

### 10. Як розвернути порядок слів?

    text
        .split(" ")
        .reverse()
        .join(" ");

---

### 11. Чи змінює `split()` оригінальний рядок?

Ні. Рядки immutable.

---

### 12. Чи змінює `join()` оригінальний масив?

Ні. `join()` створює рядок і не змінює масив.

---

### 13. Для чого використовується `limit` у `split()`?

Для обмеження кількості елементів результуючого масиву.

    text.split(",", 2);

---

### 14. Коли краще використовувати `replaceAll()`, а не `split().join()`?

Коли потрібно просто замінити всі буквальні входження одного тексту на інший.

    text.replaceAll("old", "new");

---

# 75. Learning Path

## 🟢 Core — обов'язково

Знати:

- `split()`;
- `join()`;
- `separator`;
- `split("")`;
- `join(" ")`;
- `join(",")`;
- `split()` → `Array`;
- `join()` → `String`.

Базова схема:

    String
      ↓
    split()
      ↓
    Array
      ↓
    join()
      ↓
    String

---

## 🟡 Junior

Додатково:

- `split()` + `map()`;
- `split()` + `filter()`;
- `split()` + `trim()`;
- `join()` після `map()`;
- `split()` з `RegExp`;
- `limit`;
- створення slug;
- обробка user input;
- CSV-подібні дані;
- reverse string / reverse words.

---

## 🟠 Middle

Розуміти:

- складні `RegExp` separators;
- Unicode edge cases;
- transformation pipelines;
- обробку порожніх значень;
- `null` / `undefined` у `join()`;
- різницю між текстовою заміною та структурною обробкою;
- коли краще використати `replaceAll()`;
- коли краще використати спеціалізований parser.

---

## 🔴 Senior

Вміти оцінювати:

- продуктивність великих transformation pipelines;
- Unicode та internationalization;
- parsing vs simple string manipulation;
- коректну обробку malformed input;
- безпеку обробки user input;
- необхідність спеціалізованих parser/API замість `split()`;
- читабельність та підтримуваність pipeline.

---

# 76. Зв'язок з попередніми темами

Ця тема безпосередньо пов'язана з:

    String basics
        ↓
    String properties and access
        ↓
    Search and check
        ↓
    slice / substring / substr
        ↓
    case and whitespace
        ↓
    replace / replaceAll
        ↓
    split / join
        ↓
    template literals
        ↓
    RegExp

Особливо важливий зв'язок:

    replace()
    → змінюємо текст

    split()
    → перетворюємо текст у структуру

    join()
    → збираємо структуру назад у текст

---

# 77. Головні висновки

1. `split()` перетворює `String` на `Array`.
2. `join()` перетворює `Array` на `String`.
3. `split(separator)` розбиває рядок за роздільником.
4. `join(separator)` об'єднує елементи за роздільником.
5. `split("")` можна використовувати для простої роботи із символами, але потрібно пам'ятати про Unicode.
6. `split()` може використовувати `RegExp`.
7. `split()` має другий аргумент `limit`.
8. `join()` без аргументів використовує кому.
9. `split()` часто використовується разом із `map()`, `filter()` та `trim()`.
10. `split().join()` може замінити всі буквальні входження, але для цього зазвичай краще `replaceAll()`.
11. `split()` особливо корисний, коли текст потрібно перетворити на структуровані дані.
12. `join()` особливо корисний, коли потрібно зібрати масив назад у текст.
13. Комбінація `split → map → filter → join` — один із базових transformation pipelines JavaScript.

---

# 🧠 Що має залишитися в голові

    String
       ↓
    split()
       ↓
    Array

    Array
       ↓
    join()
       ↓
    String

    "a,b,c".split(",")
    → ["a", "b", "c"]

    ["a", "b", "c"].join(",")
    → "a,b,c"

    "a b c".split(" ")
    → ["a", "b", "c"]

    ["a", "b", "c"].join(" ")
    → "a b c"

    text
        .split(",")
        .map(item => item.trim())
        .filter(Boolean)
        .join(", ")

    → типовий pipeline обробки текстових даних

    split()
    → розібрати String

    map()
    → змінити елементи

    filter()
    → залишити потрібні елементи

    join()
    → зібрати String