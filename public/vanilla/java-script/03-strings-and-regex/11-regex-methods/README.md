# 11. Regex Methods

## Визначення

**Regex Methods** — це методи JavaScript, які дозволяють використовувати регулярні вирази для:

- перевірки тексту;
- пошуку збігів;
- отримання знайдених фрагментів;
- визначення позиції збігу;
- заміни тексту;
- отримання всіх збігів;
- розділення рядка за шаблоном.

Основні методи:

### Методи `RegExp`

- `test()`
- `exec()`

### Методи `String`, які працюють з Regex

- `match()`
- `matchAll()`
- `search()`
- `replace()`
- `replaceAll()`
- `split()`

Головна ідея:

    Regex
      ↓
    pattern
      ↓
    String / RegExp method
      ↓
    result

---

# 1. Два способи роботи з Regex

У JavaScript Regex використовується двома основними способами.

## RegExp methods

Методи самого регулярного виразу:

    regex.test(string)
    regex.exec(string)

## String methods

Методи рядка, яким передається Regex:

    string.match(regex)
    string.matchAll(regex)
    string.search(regex)
    string.replace(regex, replacement)
    string.replaceAll(regex, replacement)
    string.split(regex)

Це важливо запам'ятати:

    RegExp → test(), exec()

    String → match(), matchAll(), search(),
             replace(), replaceAll(), split()

---

# 2. `test()`

`test()` перевіряє, чи відповідає рядок Regex.

## Синтаксис

    regex.test(string)

Приклад:

    const regex = /JavaScript/;

    console.log(regex.test("I learn JavaScript"));
    // true

    console.log(regex.test("I learn Python"));
    // false

Результат:

    true
    або
    false

---

# 3. `test()` — validation

`test()` особливо зручний для перевірки формату.

Наприклад, тільки цифри:

    const regex = /^\d+$/;

    console.log(regex.test("12345"));
    // true

    console.log(regex.test("123abc"));
    // false

---

# 4. `test()` — пошук

Без anchors Regex може просто шукати pattern усередині рядка.

    const regex = /\d+/;

    console.log(regex.test("Order 123"));
    // true

    console.log(regex.test("Order ABC"));
    // false

Тобто:

    /^\d+$/
    → весь рядок — цифри

    /\d+/
    → десь є цифри

---

# 5. `exec()`

`exec()` також шукає збіг, але на відміну від `test()` повертає **інформацію про збіг**.

## Синтаксис

    regex.exec(string)

Приклад:

    const regex = /\d+/;

    const result = regex.exec("Order 123");

    console.log(result);
    // ["123", ...]

Якщо збігу немає:

    const result = regex.exec("Order ABC");

    console.log(result);
    // null

---

# 6. `test()` vs `exec()`

| Метод | Результат |
|---|---|
| `test()` | `true` / `false` |
| `exec()` | match object / `null` |

Тобто:

    test()
    → "Чи є збіг?"

    exec()
    → "Який збіг і де він знаходиться?"

---

# 7. Інформація, яку повертає `exec()`

Наприклад:

    const regex = /\d+/;

    const result = regex.exec("Order 123");

    console.log(result[0]);
    // "123"

    console.log(result.index);
    // 6

    console.log(result.input);
    // "Order 123"

Основна інформація:

    result[0]
    → знайдений текст

    result.index
    → позиція початку збігу

    result.input
    → початковий рядок

---

# 8. `exec()` і `null`

Якщо збігу немає:

    const regex = /\d+/;

    const result = regex.exec("Hello");

    console.log(result);
    // null

Тому перед використанням результату потрібно перевіряти його:

    const result = regex.exec("Hello");

    if (result) {
        console.log(result[0]);
    }

---

# 9. `match()`

`match()` — метод рядка, який шукає Regex.

## Синтаксис

    string.match(regex)

Приклад:

    const text = "Order 123";

    const result = text.match(/\d+/);

    console.log(result);
    // ["123", ...]

---

# 10. `match()` без `g`

Якщо Regex не має `g`, `match()` повертає інформацію про **перше збігання**.

    const text = "Order 123, quantity 5";

    const result = text.match(/\d+/);

    console.log(result[0]);
    // "123"

    console.log(result.index);
    // 6

---

# 11. `match()` з `g`

Якщо додати `g`:

    const text = "Order 123, quantity 5";

    const result = text.match(/\d+/g);

    console.log(result);
    // ["123", "5"]

Тепер отримуємо всі збіги.

Важлива різниця:

    match(/pattern/)
    → інформація про перший match

    match(/pattern/g)
    → масив усіх matches

---

# 12. `match()` — немає збігу

Якщо Regex не знайшов збіг:

    const text = "Hello world";

    console.log(text.match(/\d+/));
    // null

Тому:

    const result = text.match(/\d+/);

    if (result) {
        console.log(result[0]);
    }

---

# 13. `match()` vs `exec()`

Без `g` вони можуть повертати дуже схожу інформацію.

    const text = "Order 123";

    const regex = /\d+/;

    console.log(regex.exec(text));

    console.log(text.match(regex));

Але API і напрямок виклику різні:

    regex.exec(text)

    text.match(regex)

Для базового рівня достатньо запам'ятати:

    exec()
    → метод Regex

    match()
    → метод String

---

# 14. `matchAll()`

`matchAll()` дозволяє отримати **всі збіги разом із детальною інформацією про кожен match**.

## Синтаксис

    string.matchAll(regex)

Зазвичай використовується з `g`.

    const text = "Order 123, quantity 5";

    const matches = text.matchAll(/\d+/g);

`matchAll()` повертає **iterator**.

---

# 15. Перетворення `matchAll()` у масив

Найпростіший спосіб:

    const text = "Order 123, quantity 5";

    const matches = [...text.matchAll(/\d+/g)];

    console.log(matches);

Тепер маємо масив match results.

---

# 16. Отримання знайдених значень через `matchAll()`

    const text = "Order 123, quantity 5";

    const matches = [...text.matchAll(/\d+/g)];

    console.log(matches[0][0]);
    // "123"

    console.log(matches[1][0]);
    // "5"

---

# 17. `matchAll()` і `index`

На відміну від простого:

    match(/.../g)

`matchAll()` зберігає детальну інформацію про кожен match.

    const text = "Order 123, quantity 5";

    const matches = [...text.matchAll(/\d+/g)];

    for (const match of matches) {
        console.log(match[0], match.index);
    }

Результат:

    123 6
    5 20

Тобто можна отримати:

- знайдений текст;
- його позицію;
- capturing groups;
- інші дані match result.

---

# 18. `match()` vs `matchAll()`

| Метод | Основне призначення |
|---|---|
| `match()` | отримати match / matches |
| `matchAll()` | отримати всі matches з детальною інформацією |

Наприклад:

    "a1 b2 c3".match(/\d/g);

дасть:

    ["1", "2", "3"]

А:

    [..."a1 b2 c3".matchAll(/\d/g)]

дасть iterator, який містить детальні match results.

---

# 19. `matchAll()` потребує `g`

У сучасному JavaScript `matchAll()` очікує Regex із global flag.

Правильно:

    "a1 b2".matchAll(/\d/g);

Без `g`:

    "a1 b2".matchAll(/\d/);

призведе до помилки.

---

# 20. `search()`

`search()` шукає Regex у рядку і повертає **індекс першого збігу**.

## Синтаксис

    string.search(regex)

Приклад:

    const text = "I learn JavaScript";

    console.log(text.search(/JavaScript/));
    // 8

---

# 21. `search()` — якщо збігу немає

Якщо Regex не знайдено:

    const text = "I learn Python";

    console.log(text.search(/JavaScript/));
    // -1

Тобто:

    >= 0
    → знайдено

    -1
    → не знайдено

---

# 22. `search()` vs `indexOf()`

`indexOf()` шукає звичайний текст:

    "JavaScript".indexOf("Script");

А `search()` може використовувати Regex:

    "JavaScript".search(/Script/);

Тому:

    indexOf()
    → literal string search

    search()
    → Regex search

---

# 23. `search()` і flags

`search()` шукає позицію першого збігу.

Flag `g` не робить `search()` глобальним у сенсі повернення всіх позицій.

    const text = "cat cat cat";

    console.log(text.search(/cat/g));
    // 0

Все одно повертається тільки перша позиція.

Для всіх збігів використовуй:

    match()
    або
    matchAll()

---

# 24. `replace()`

`replace()` використовується для заміни тексту.

## Синтаксис

    string.replace(searchValue, replacement)

`searchValue` може бути:

- string;
- Regex.

---

# 25. `replace()` зі звичайним рядком

    const text = "Hello world";

    const result = text.replace("world", "JavaScript");

    console.log(result);
    // "Hello JavaScript"

---

# 26. `replace()` з Regex

    const text = "Hello world";

    const result = text.replace(/world/, "JavaScript");

    console.log(result);
    // "Hello JavaScript"

---

# 27. `replace()` без `g`

Якщо Regex не має `g`, замінюється тільки **перше** відповідне входження.

    const text = "cat cat cat";

    const result = text.replace(/cat/, "dog");

    console.log(result);
    // "dog cat cat"

---

# 28. `replace()` з `g`

З `g` замінюються всі збіги:

    const text = "cat cat cat";

    const result = text.replace(/cat/g, "dog");

    console.log(result);
    // "dog dog dog"

Це один із найважливіших прикладів використання `g`.

---

# 29. `replaceAll()`

`replaceAll()` замінює всі відповідні входження.

    const text = "cat cat cat";

    const result = text.replaceAll("cat", "dog");

    console.log(result);
    // "dog dog dog"

---

# 30. `replace()` vs `replaceAll()`

| Метод | String | Regex |
|---|---|---|
| `replace()` | перше входження | залежить від `g` |
| `replaceAll()` | усі входження | Regex повинен мати `g` |

Наприклад:

    "cat cat".replace("cat", "dog");
    // "dog cat"

    "cat cat".replaceAll("cat", "dog");
    // "dog dog"

Regex:

    "cat cat".replace(/cat/, "dog");
    // "dog cat"

    "cat cat".replace(/cat/g, "dog");
    // "dog dog"

---

# 31. `replace()` з функцією

Замість готового рядка можна передати функцію.

    const text = "I have 2 apples";

    const result = text.replace(/\d+/, match => {
        return String(Number(match) * 2);
    });

    console.log(result);
    // "I have 4 apples"

Це дуже потужний механізм.

---

# 32. `replace()` — параметри callback

Функція replacement може отримувати:

    match
    offset
    string

а також capturing groups.

Наприклад:

    const text = "Age: 56";

    const result = text.replace(/\d+/, (match, offset, string) => {
        console.log(match);
        console.log(offset);
        console.log(string);

        return "XX";
    });

---

# 33. Capturing groups у `replace()`

Regex:

    /(\d{4})-(\d{2})-(\d{2})/

може мати групи:

    year
    month
    day

Наприклад:

    const date = "2026-09-14";

    const result = date.replace(
        /(\d{4})-(\d{2})-(\d{2})/,
        "$3.$2.$1"
    );

    console.log(result);
    // "14.09.2026"

Це вже практичне поєднання Regex groups та `replace()`.

---

# 34. Replacement patterns

У replacement string можна використовувати спеціальні позначення.

Основні:

    $&
    → весь match

    $1
    $2
    $3
    → capturing groups

    $`
    → текст перед match

    $'
    → текст після match

На практиці найчастіше використовуються:

    $1
    $2
    $3

для роботи з capturing groups.

---

# 35. `split()`

`split()` перетворює рядок на масив.

Він також може приймати Regex.

    const text = "apple,banana;orange";

    const result = text.split(/[,;]/);

    console.log(result);
    // ["apple", "banana", "orange"]

Тут:

    /[,;]/

означає:

> розділяти за комою або крапкою з комою.

---

# 36. `split()` зі whitespace

Наприклад:

    const text = "one   two three";

    const result = text.split(/\s+/);

    console.log(result);
    // ["one", "two", "three"]

Regex:

    \s+

означає:

> один або більше whitespace characters.

---

# 37. `split()` і кілька розділювачів

Наприклад:

    const text = "one,two;three|four";

    const result = text.split(/[,;|]/);

    console.log(result);
    // ["one", "two", "three", "four"]

Це значно потужніше за:

    split(",")

який працює тільки з комою.

---

# 38. `split()` + Regex для очищення пробілів

Наприклад:

    const text = "apple, banana,  orange";

    const result = text
        .split(/\s*,\s*/);

    console.log(result);
    // ["apple", "banana", "orange"]

Regex:

    \s*,\s*

означає:

    whitespace
      +
    comma
      +
    whitespace

---

# 39. Всі основні Regex methods

Тепер маємо:

    test()
    exec()
    match()
    matchAll()
    search()
    replace()
    replaceAll()
    split()

Їх можна поділити на групи.

## Перевірка

    test()

## Отримання match

    exec()
    match()
    matchAll()

## Пошук позиції

    search()

## Заміна

    replace()
    replaceAll()

## Розділення

    split()

---

# 40. Велика таблиця Regex Methods

| Method | Де знаходиться | Результат |
|---|---|---|
| `test()` | RegExp | `true` / `false` |
| `exec()` | RegExp | match / `null` |
| `match()` | String | match / array / `null` |
| `matchAll()` | String | iterator |
| `search()` | String | index / `-1` |
| `replace()` | String | new string |
| `replaceAll()` | String | new string |
| `split()` | String | array |

Цю таблицю варто знати дуже добре.

---

# 41. Один Regex — різні задачі

Візьмемо:

    const regex = /\d+/;

Той самий Regex можна використати різними методами.

## `test()`

    regex.test("Order 123");
    // true

## `exec()`

    regex.exec("Order 123");
    // ["123", ...]

## `match()`

    "Order 123".match(regex);
    // ["123", ...]

## `search()`

    "Order 123".search(regex);
    // 6

## `replace()`

    "Order 123".replace(regex, "456");
    // "Order 456"

Це дуже корисна модель мислення:

    Pattern
       ↓
    Method
       ↓
    потрібний тип результату

---

# 42. Вибір правильного методу

Якщо питання:

> Чи є такий текст?

Використовуй:

    test()

---

Якщо:

> Що саме знайшлося?

Використовуй:

    exec()
    або
    match()

---

Якщо:

> Знайди всі збіги.

Використовуй:

    match()

з `g`, або:

    matchAll()

---

Якщо:

> Де знаходиться перший збіг?

Використовуй:

    search()

---

Якщо:

> Заміни текст.

Використовуй:

    replace()

---

Якщо:

> Заміни всі входження.

Використовуй:

    replaceAll()

або:

    replace(/pattern/g, replacement)

---

Якщо:

> Розділи рядок за Regex.

Використовуй:

    split()

---

# 43. `test()` — найпростіший validation pattern

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const email = "user@example.com";

    const isValid = emailRegex.test(email);

    console.log(isValid);
    // true

Для простих перевірок це найзручніший Regex method.

---

# 44. `match()` — отримання чисел

    const text = "Products: 12, 45, 78";

    const numbers = text.match(/\d+/g);

    console.log(numbers);
    // ["12", "45", "78"]

Якщо потрібно отримати всі знайдені значення:

    match()
    +
    g

є дуже зручною комбінацією.

---

# 45. `matchAll()` — числа з позиціями

    const text = "Products: 12, 45, 78";

    const matches = [...text.matchAll(/\d+/g)];

    for (const match of matches) {
        console.log({
            value: match[0],
            index: match.index
        });
    }

Можна отримати:

    {
        value: "12",
        index: ...
    }

    {
        value: "45",
        index: ...
    }

    {
        value: "78",
        index: ...
    }

---

# 46. `search()` — знайти першу цифру

    const text = "Product 123";

    const index = text.search(/\d/);

    console.log(index);
    // позиція першої цифри

---

# 47. `replace()` — приховати частину номера

Наприклад:

    const phone = "1234567890";

    const result = phone.replace(/\d(?=\d{4})/g, "*");

Ідея:

    1234567890
    ↓
    ******7890

Тут уже використовується lookahead, який належить до більш просунутого Regex.

На базовому етапі важливо побачити сам принцип:

    Regex
      ↓
    знайти pattern
      ↓
    replace()

---

# 48. `replaceAll()` — очищення символів

Наприклад:

    const value = "12-34-56";

    const result = value.replaceAll("-", "");

    console.log(result);
    // "123456"

Якщо використовується Regex:

    const result = value.replace(/-/g, "");

Результат такий самий.

---

# 49. `split()` — слова

    const text = "JavaScript is powerful";

    const words = text.split(/\s+/);

    console.log(words);
    // ["JavaScript", "is", "powerful"]

Це типовий приклад Regex + string processing.

---

# 50. `replace()` + callback для перетворення

Наприклад, потрібно збільшити всі числа на 1:

    const text = "Numbers: 1, 2, 3";

    const result = text.replace(/\d+/g, match => {
        return String(Number(match) + 1);
    });

    console.log(result);
    // "Numbers: 2, 3, 4"

Це вже дуже корисний реальний патерн:

    find
      ↓
    transform
      ↓
    replace

---

# 51. `exec()` у циклі

`exec()` має особливу поведінку з Regex, який має `g`.

Наприклад:

    const regex = /\d+/g;
    const text = "A12 B34 C56";

    let match;

    while ((match = regex.exec(text)) !== null) {
        console.log(match[0]);
    }

Результат:

    12
    34
    56

---

# 52. Чому `exec()` може працювати поетапно

Для global Regex:

    /pattern/g

об'єкт Regex зберігає поточну позицію через:

    lastIndex

Наприклад:

    const regex = /\d+/g;

    console.log(regex.lastIndex);
    // 0

Після успішного `exec()`:

    regex.exec("A12 B34");

`lastIndex` пересувається далі.

Це дозволяє поступово отримувати збіги.

---

# 53. `lastIndex`

Приклад:

    const regex = /\d+/g;
    const text = "A12 B34";

    console.log(regex.exec(text)[0]);
    // "12"

    console.log(regex.lastIndex);

    console.log(regex.exec(text)[0]);
    // "34"

Це одна з особливостей `RegExp` object.

На початковому рівні достатньо знати:

> `g` + `exec()` дозволяє послідовно отримувати збіги.

---

# 54. Обережність із `test()` + `g`

Це важливий edge case.

Global Regex також має `lastIndex`.

Наприклад:

    const regex = /a/g;

    console.log(regex.test("a"));
    // true

    console.log(regex.test("a"));
    // false

Це може здивувати.

Причина — `lastIndex`.

Тому не варто бездумно використовувати один і той самий global Regex у повторних `test()`.

Для простої validation краще часто використовувати Regex без `g`:

    /^[A-Za-z]+$/.test(value)

---

# 55. `g` — не "покращення Regex"

`g` змінює поведінку деяких операцій.

Наприклад:

    /cat/
    → перший match

    /cat/g
    → global matching

Не потрібно автоматично додавати `g` до кожного Regex.

Використовуй flag залежно від задачі.

---

# 56. Regex methods і immutable strings

String methods:

    match()
    matchAll()
    search()
    replace()
    replaceAll()
    split()

не змінюють оригінальний рядок.

Наприклад:

    const text = "cat cat";

    const result = text.replace(/cat/g, "dog");

    console.log(text);
    // "cat cat"

    console.log(result);
    // "dog dog"

---

# 57. Regex methods і chain

Оскільки string methods повертають нові значення, їх можна комбінувати.

Наприклад:

    const text = "  apple, banana, orange  ";

    const result = text
        .trim()
        .split(/\s*,\s*/)
        .map(item => item.toUpperCase());

    console.log(result);
    // ["APPLE", "BANANA", "ORANGE"]

Тут використано:

    trim()
    split()
    Regex
    map()
    toUpperCase()

Це вже типовий JavaScript data-processing pipeline.

---

# 58. Практичний приклад — витягування чисел

    const text = "Price: 120, quantity: 5, discount: 10";

    const numbers = text.match(/\d+/g);

    console.log(numbers);
    // ["120", "5", "10"]

Якщо потрібні саме числа:

    const numbers = text
        .match(/\d+/g)
        .map(Number);

    console.log(numbers);
    // [120, 5, 10]

Важливо:

    match()
    → повертає strings

    map(Number)
    → перетворює їх на numbers

---

# 59. Практичний приклад — пошук усіх слів

    const text = "JavaScript is powerful";

    const words = text.match(/\w+/g);

    console.log(words);
    // ["JavaScript", "is", "powerful"]

Але пам'ятай:

    \w

не охоплює всі Unicode letters.

Для міжнародного тексту потрібен Unicode-aware підхід.

---

# 60. Практичний приклад — видалення зайвих пробілів

    const text = "JavaScript     is     powerful";

    const result = text.replace(/\s+/g, " ");

    console.log(result);
    // "JavaScript is powerful"

Це один із дуже корисних практичних Regex patterns.

---

# 61. Практичний приклад — видалення символів

    const value = "12-34-56-78";

    const result = value.replace(/-/g, "");

    console.log(result);
    // "12345678"

---

# 62. Практичний приклад — розділення за різними символами

    const value = "apple,banana;orange|grape";

    const fruits = value.split(/[,;|]/);

    console.log(fruits);
    // ["apple", "banana", "orange", "grape"]

---

# 63. Практичний приклад — нормалізація списку

    const value = " apple,  banana ; orange ";

    const fruits = value
        .trim()
        .split(/\s*[,;]\s*/)
        .map(item => item.trim());

    console.log(fruits);
    // ["apple", "banana", "orange"]

---

# 64. Практичний приклад — пошук першої цифри

    const text = "Product ABC123";

    const index = text.search(/\d/);

    console.log(index);

Це може бути корисно, якщо потрібно визначити:

> де в тексті починається числова частина.

---

# 65. Практичний приклад — заміна всіх цифр

    const text = "User 123 has 45 points";

    const result = text.replace(/\d+/g, "#");

    console.log(result);
    // "User # has # points"

---

# 66. Практичний приклад — маскування email

Простий навчальний приклад:

    const email = "valeriy@example.com";

    const result = email.replace(
        /^(.)(.*)(@.*)$/,
        "$1***$3"
    );

    console.log(result);
    // "v***@example.com"

Це лише демонстрація Regex + capturing groups.

Для production-рішень правила маскування потрібно визначати окремо.

---

# 67. Практичний приклад — форматування номера

Наприклад, рядок:

    const value = "1234567890";

можна форматувати:

    const result = value.replace(
        /(\d{3})(\d{3})(\d{4})/,
        "$1-$2-$3"
    );

    console.log(result);
    // "123-456-7890"

Тут:

    (\d{3})
    (\d{3})
    (\d{4})

створюють capturing groups.

---

# 68. Вибір між `replace()` і `replaceAll()`

Якщо замінюємо звичайний рядок:

    text.replaceAll("cat", "dog")

дуже просто.

Якщо потрібен pattern:

    text.replace(/cat/g, "dog")

або:

    text.replaceAll(/cat/g, "dog")

Для Regex необхідно пам'ятати про `g`.

---

# 69. `replaceAll()` + Regex

Правильно:

    "cat cat".replaceAll(/cat/g, "dog");
    // "dog dog"

Важливо:

> при використанні Regex з `replaceAll()` Regex повинен мати `g`.

---

# 70. `split()` і `g`

Для `split()` global flag зазвичай не потрібний.

    "a,b,c".split(/,/);

достатньо.

Не потрібно:

    "a,b,c".split(/,/g);

Обидва можуть дати той самий результат, але `g` тут не потрібен для основної задачі `split()`.

---

# 71. `search()` і `g`

Так само `g` зазвичай не потрібний:

    "cat dog cat".search(/cat/);

Він повертає перший match.

Тому:

    search()
    → first match index

Для всіх збігів:

    match()
    або
    matchAll()

---

# 72. `match()` і `g` — дуже важлива різниця

Без `g`:

    const result = "a1 b2".match(/\d/);

    console.log(result);

Отримуємо match information.

З `g`:

    const result = "a1 b2".match(/\d/g);

    console.log(result);
    // ["1", "2"]

Тобто `g` змінює структуру результату `match()`.

---

# 73. `matchAll()` — коли потрібні деталі

Якщо потрібно:

- всі збіги;
- позиції;
- groups;
- match information;

зручно використовувати:

    matchAll()

Наприклад:

    const text = "A12 B34";

    for (const match of text.matchAll(/([A-Z])(\d+)/g)) {
        console.log(match[0]);
        console.log(match[1]);
        console.log(match[2]);
        console.log(match.index);
    }

Можна отримати:

    A12
    A
    12
    position

    B34
    B
    34
    position

---

# 74. `match()` — коли потрібен простий результат

Якщо потрібно просто отримати всі значення:

    const text = "A12 B34 C56";

    const values = text.match(/\d+/g);

    console.log(values);
    // ["12", "34", "56"]

Тут `match()` простіший за `matchAll()`.

---

# 75. `exec()` — коли потрібен контроль

`exec()` корисний, коли:

- потрібно поступово отримувати matches;
- потрібні groups;
- потрібні позиції;
- потрібен контроль над процесом пошуку.

Наприклад:

    const regex = /([A-Z])(\d+)/g;
    const text = "A12 B34";

    let match;

    while ((match = regex.exec(text)) !== null) {
        console.log(match[1]);
        console.log(match[2]);
    }

---

# 76. Загальна модель Regex Methods

Запам'ятай через питання:

    Чи є match?
        ↓
    test()

    Що знайшли?
        ↓
    exec()
    match()

    Усі matches + деталі?
        ↓
    matchAll()

    Де перший match?
        ↓
    search()

    Замінити?
        ↓
    replace()

    Замінити всі?
        ↓
    replaceAll()

    Розділити?
        ↓
    split()

Це набагато корисніше, ніж просто механічно запам'ятовувати назви методів.

---

# 77. Common Mistakes

## Помилка 1 — очікувати `true/false` від `match()`

    "hello".match(/hello/);

повертає match information, а не просто:

    true

Для boolean перевірки використовуй:

    /hello/.test("hello");

---

## Помилка 2 — використовувати `search()` для всіх matches

    "cat cat".search(/cat/);

повертає тільки першу позицію.

Для всіх:

    "cat cat".match(/cat/g);

---

## Помилка 3 — забути `g`

    "cat cat".replace(/cat/, "dog");

Результат:

    "dog cat"

Для всіх:

    "cat cat".replace(/cat/g, "dog");

---

## Помилка 4 — неправильне використання `replaceAll()` з Regex

Неправильно:

    "cat cat".replaceAll(/cat/, "dog");

Для Regex потрібно:

    "cat cat".replaceAll(/cat/g, "dog");

---

## Помилка 5 — забути, що `match()` може повернути `null`

    const result = text.match(/\d+/);

Якщо збігу немає:

    result === null

Тому не варто одразу писати:

    result[0]

без перевірки.

---

## Помилка 6 — плутати `match()` та `matchAll()`

    match()
    → простіше отримати matches

    matchAll()
    → всі matches + детальна інформація

---

## Помилка 7 — не враховувати `lastIndex`

Global Regex:

    /pattern/g

має стан:

    lastIndex

Це особливо важливо для:

    exec()
    test()

при повторному використанні одного Regex object.

---

# 78. Regex Methods і чистий код

Не потрібно писати Regex всюди.

Наприклад, якщо потрібно просто замінити одне слово:

    text.replace("cat", "dog");

може бути зрозумілішим, ніж:

    text.replace(/cat/, "dog");

Regex потрібен, коли справді потрібен **pattern**.

Правило:

> Використовуй найпростішій інструмент, який вирішує задачу.

---

# 79. Regex Methods у Frontend

Типовий flow:

    input
      ↓
    value
      ↓
    regex.test(value)
      ↓
    valid / invalid
      ↓
    UI

Для пошуку:

    input
      ↓
    regex
      ↓
    match()
      ↓
    results
      ↓
    render UI

Для форматування:

    value
      ↓
    replace()
      ↓
    formatted value
      ↓
    UI

---

# 80. Regex Methods у Backend

На backend Regex може використовуватися для:

- validation;
- parsing;
- очищення input;
- обробки logs;
- пошуку;
- нормалізації;
- extraction.

Наприклад:

    request
      ↓
    validation
      ↓
    regex.test()
      ↓
    business logic
      ↓
    database

Але Regex не повинен замінювати повну business validation.

---

# 81. Regex Methods у Full Stack

У типовому full-stack застосунку:

    Frontend
       ↓
    Regex validation
       ↓
    API request
       ↓
    Backend
       ↓
    Regex / validation
       ↓
    Database
       ↓
    response
       ↓
    Frontend

Важливо:

> frontend validation — це зручність для користувача, а не механізм безпеки.

Backend повинен самостійно перевіряти отримані дані.

---

# 82. Практична вправа 1 — `test()`

Створи функцію:

    isDigits(value)

Вона повинна повертати:

    true

якщо весь рядок складається тільки з цифр.

Приклади:

    isDigits("123");
    // true

    isDigits("123abc");
    // false

    isDigits("abc");
    // false

---

# 83. Практична вправа 2 — `match()`

Для:

    const text = "Prices: 100, 250, 75";

отримай:

    ["100", "250", "75"]

Використай:

    match()

та:

    g

---

# 84. Практична вправа 3 — `search()`

Для:

    const text = "Product ABC123";

знайди позицію першої цифри.

Використай:

    search()

та:

    /\d/

---

# 85. Практична вправа 4 — `replace()`

Є:

    const text = "JavaScript is difficult";

Замініть:

    "difficult"

на:

    "powerful"

Використай `replace()`.

---

# 86. Практична вправа 5 — `replace()` + `g`

Є:

    const text = "cat cat cat";

Заміни всі:

    cat

на:

    dog

Результат:

    "dog dog dog"

---

# 87. Практична вправа 6 — `split()`

Є:

    const text = "apple,banana;orange|grape";

Отримай:

    ["apple", "banana", "orange", "grape"]

Використай Regex:

    /[,;|]/

---

# 88. Практична вправа 7 — `matchAll()`

Є:

    const text = "A12 B34 C56";

Отримай для кожного числа:

- значення;
- позицію.

Використай:

    matchAll()

---

# 89. Практична вправа 8 — `exec()`

Є:

    const text = "A12 B34 C56";

Використай:

    const regex = /[A-Z]\d+/g;

і цикл `while`, щоб отримати всі matches через `exec()`.

---

# 90. Практична вправа 9 — нормалізація

Є:

    const text = "  JavaScript     is    great  ";

Отримай:

    "JavaScript is great"

Використай:

    trim()

та:

    replace(/\s+/g, " ")

---

# 91. Практична вправа 10 — витягування чисел

Є:

    const text = "Age: 56, height: 180, weight: 75";

Отримай:

    [56, 180, 75]

Підказка:

    match(/\d+/g)

а потім:

    map(Number)

---

# 92. Interview Questions

### 1. Які основні Regex methods є в JavaScript?

    test()
    exec()
    match()
    matchAll()
    search()
    replace()
    replaceAll()
    split()

---

### 2. Чим відрізняється `test()` від `exec()`?

    test()
    → true / false

    exec()
    → match information / null

---

### 3. Чим відрізняється `match()` від `matchAll()`?

`match()` зручний для простого отримання match/matches.

`matchAll()` повертає iterator з детальною інформацією про всі matches, включаючи groups та positions.

---

### 4. Що повертає `search()`?

Індекс першого збігу або:

    -1

якщо збігу немає.

---

### 5. Чим відрізняються `replace()` і `replaceAll()`?

`replace()` за замовчуванням замінює перший match для string search value або залежить від `g` для Regex.

`replaceAll()` замінює всі відповідні входження.

---

### 6. Для чого потрібен `g`?

Для global matching — роботи з усіма відповідними входженнями.

---

### 7. Чи потрібен `g` для `search()`?

Ні. `search()` все одно повертає тільки індекс першого збігу.

---

### 8. Чи потрібен `g` для `split()`?

Ні. `split()` сам розділяє за всіма відповідностями Regex.

---

### 9. Що повертає `match()`, якщо збігу немає?

    null

---

### 10. Що повертає `matchAll()`?

Iterator з match results.

---

### 11. Чому `matchAll()` зазвичай використовують з `g`?

Тому що `matchAll()` призначений для отримання всіх глобальних matches.

---

### 12. Що таке `lastIndex`?

Властивість `RegExp`, яка використовується для відстеження позиції пошуку, зокрема при global/sticky matching.

---

### 13. Чому `test()` з `/g` може давати несподівані результати?

Через стан `lastIndex`.

Global Regex може зберігати позицію попереднього пошуку.

---

### 14. Як отримати всі числа з рядка?

Наприклад:

    const numbers = text.match(/\d+/g);

---

### 15. Як отримати всі числа як `number`, а не `string`?

    const numbers = text
        .match(/\d+/g)
        .map(Number);

---

### 16. Як замінити всі збіги Regex?

Наприклад:

    text.replace(/cat/g, "dog");

або:

    text.replaceAll(/cat/g, "dog");

---

### 17. Чим `search()` відрізняється від `indexOf()`?

    indexOf()
    → пошук literal string

    search()
    → пошук за Regex

---

### 18. Який метод використовувати для validation?

Найчастіше:

    regex.test(value)

---

# 93. Learning Path

## 🟢 Core — Junior

Впевнено знати:

    regex.test(string)

    regex.exec(string)

    string.match(regex)

    string.matchAll(regex)

    string.search(regex)

    string.replace(regex, replacement)

    string.replaceAll(regex, replacement)

    string.split(regex)

---

## 🟡 Junior+

Вміти:

- знаходити всі числа;
- знаходити всі слова;
- перевіряти input;
- замінювати всі matches;
- використовувати `g`;
- працювати з `matchAll()`;
- використовувати capturing groups;
- використовувати callback у `replace()`;
- комбінувати Regex methods з `map()`, `filter()`, `split()`, `join()`.

---

## 🟠 Middle

Розуміти:

- `exec()` + `lastIndex`;
- `test()` + `g`;
- capturing groups;
- named groups;
- lookahead;
- lookbehind;
- greedy/lazy matching;
- Unicode Regex;
- складні replacement patterns;
- performance.

---

## 🔴 Senior

Важливо розуміти не тільки API, а й архітектурне використання Regex:

- коли Regex доречний;
- коли краще звичайний string method;
- як уникати надто складних patterns;
- Regex performance;
- catastrophic backtracking;
- ReDoS;
- Unicode;
- validation vs business logic;
- frontend vs backend validation.

---

# 94. Mini Cheat Sheet

    // Boolean check
    /hello/.test("hello world");
    // true

    // Get first match
    /\d+/.exec("Order 123");
    // ["123", ...]

    // Get match
    "Order 123".match(/\d+/);
    // ["123", ...]

    // Get all matches
    "A12 B34".match(/\d+/g);
    // ["12", "34"]

    // Get all matches with details
    [..."A12 B34".matchAll(/\d+/g)];

    // Find first position
    "Order 123".search(/\d+/);
    // 6

    // Replace first match
    "cat cat".replace(/cat/, "dog");
    // "dog cat"

    // Replace all matches
    "cat cat".replace(/cat/g, "dog");
    // "dog dog"

    // Replace all with replaceAll
    "cat cat".replaceAll("cat", "dog");
    // "dog dog"

    // Split by Regex
    "a,b;c".split(/[,;]/);
    // ["a", "b", "c"]

---

# 95. Швидка таблиця вибору

| Потрібно | Метод |
|---|---|
| Перевірити відповідність | `test()` |
| Отримати один match з деталями | `exec()` |
| Отримати match / matches | `match()` |
| Отримати всі matches з деталями | `matchAll()` |
| Отримати позицію першого match | `search()` |
| Замінити | `replace()` |
| Замінити всі | `replaceAll()` |
| Розділити рядок | `split()` |

---

# 96. Головне, що потрібно запам'ятати

Regex methods можна запам'ятати не списком, а через задачу:

    Чи відповідає?
        ↓
    test()

    Що знайшли?
        ↓
    exec()
    match()

    Всі matches + деталі?
        ↓
    matchAll()

    Де match?
        ↓
    search()

    Замінити?
        ↓
    replace()

    Замінити всі?
        ↓
    replaceAll()

    Розділити?
        ↓
    split()

Найважливіша практична трійка для початку:

    test()
    match()
    replace()

А далі:

    matchAll()
    search()
    split()
    exec()
    replaceAll()

---

# 97. Зв'язок із попередньою темою

Попередня тема:

    10-regex-basics

навчила:

> **як описати Regex pattern.**

Наприклад:

    /^\d+$/

або:

    /\d+/g

Ця тема:

    11-regex-methods

навчає:

> **що робити з цим pattern.**

Наприклад:

    /^\d+$/.test(value)

    value.match(/\d+/g)

    value.replace(/\d+/g, "#")

    value.search(/\d+/)

    value.split(/\s+/)

Тобто:

    Regex syntax
         ↓
    Regex pattern
         ↓
    Regex method
         ↓
    result

---

# 98. Що буде далі

Наступна тема:

    12-regex-patterns

Там уже варто перейти від окремих символів і методів до **готових практичних шаблонів**:

- username;
- email;
- phone;
- numbers;
- dates;
- URLs;
- passwords;
- whitespace;
- HTML/text patterns;
- Unicode;
- складніші groups;
- практична побудова Regex.

Отже, логіка всього блоку:

    10-regex-basics
          ↓
    Що таке Regex?
    Які є символи?
    Як побудувати pattern?
          ↓
    11-regex-methods
          ↓
    Як застосувати pattern?
          ↓
    12-regex-patterns
          ↓
    Як створювати практичні patterns?
          ↓
    13-string-project
          ↓
    Як використати все разом?

Це хороший порядок для системного вивчення Regex у JavaScript.