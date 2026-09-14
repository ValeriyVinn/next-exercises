# 10. Regex Basics

## Визначення

**Regular Expressions (RegExp / Regex)** — це спеціальний синтаксис для опису **шаблону пошуку тексту**.

Regex дозволяє знаходити, перевіряти та витягувати фрагменти рядка за певними правилами.

Наприклад:

- знайти слово;
- перевірити, чи є в тексті цифри;
- перевірити формат email;
- знайти номер телефону;
- перевірити, чи рядок складається тільки з цифр;
- знайти всі входження певного шаблону.

У JavaScript для роботи з регулярними виразами використовується об'єкт:

    RegExp

і спеціальний літерал:

    /pattern/

---

# 1. Найпростіший Regex

Наприклад, потрібно знайти слово `"JavaScript"`:

    const text = "I learn JavaScript";

    const regex = /JavaScript/;

Regex:

    /JavaScript/

означає:

> знайти послідовність символів `JavaScript`.

---

# 2. Regex як шаблон

Regex не обов'язково шукає конкретне слово.

Він може описувати **структуру тексту**.

Наприклад:

    /\d/

означає:

> знайти одну цифру.

А:

    /\d+/

означає:

> знайти одну або більше цифр.

Отже Regex — це не просто пошук слова, а **мова опису текстових шаблонів**.

---

# 3. Regex Literal

Найпоширеніший спосіб створити регулярний вираз:

    const regex = /javascript/;

Синтаксис:

    /pattern/flags

Наприклад:

    const regex = /javascript/i;

де:

    javascript
    ↓
    pattern

    i
    ↓
    flag

---

# 4. `RegExp` Constructor

Regex можна створити і через `RegExp`:

    const regex = new RegExp("javascript");

Це еквівалентно:

    const regex = /javascript/;

Обидва варіанти створюють регулярний вираз.

---

# 5. Коли використовувати `/.../`

У більшості звичайних випадків достатньо Regex literal:

    const regex = /hello/;

Це:

- коротше;
- читабельніше;
- найчастіше використовується у звичайному JS-коді.

---

# 6. Коли потрібен `new RegExp()`

Constructor особливо корисний, коли pattern створюється **динамічно**.

Наприклад:

    const word = "JavaScript";

    const regex = new RegExp(word, "i");

Тут шаблон береться зі змінної.

Regex literal:

    /JavaScript/i

Constructor:

    new RegExp("JavaScript", "i")

---

# 7. Перевірка через `test()`

Один із найважливіших методів Regex:

    test()

Він перевіряє, чи відповідає рядок регулярному виразу.

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

# 8. `test()` — основний патерн

Типова конструкція:

    const regex = /hello/;

    const result = regex.test("hello world");

    console.log(result);
    // true

Тобто:

    text
      ↓
    regex.test(text)
      ↓
    true / false

---

# 9. Regex чутливий до регістру

За замовчуванням Regex є **case-sensitive**.

    const regex = /javascript/;

    console.log(regex.test("javascript"));
    // true

    console.log(regex.test("JavaScript"));
    // false

    console.log(regex.test("JAVASCRIPT"));
    // false

---

# 10. Flag `i`

Flag `i` означає **ignore case**.

    const regex = /javascript/i;

Тепер:

    console.log(regex.test("javascript"));
    // true

    console.log(regex.test("JavaScript"));
    // true

    console.log(regex.test("JAVASCRIPT"));
    // true

---

# 11. Основні Regex flags

Найважливіші flags:

| Flag | Значення |
|---|---|
| `i` | ignore case |
| `g` | global |
| `m` | multiline |
| `s` | dotAll |
| `u` | Unicode-aware |
| `y` | sticky |

На початковому етапі найважливіше добре знати:

    i
    g

І розуміти призначення інших.

---

# 12. Flag `g`

`g` означає **global** — працювати з усіма відповідними входженнями, а не тільки з першим.

Наприклад:

    const regex = /cat/g;

    const text = "cat dog cat cat";

Flag `g` особливо важливий у методах:

- `match()`;
- `replace()`;
- `replaceAll()`.

Наприклад:

    console.log(text.match(/cat/g));
    // ["cat", "cat", "cat"]

Без `g`:

    console.log(text.match(/cat/));
    // ["cat", ...]

Для `match()` різницю між режимами потрібно буде добре розібрати в темі Regex methods.

---

# 13. Literal characters

Звичайні символи в Regex зазвичай відповідають самим собі.

    /cat/

означає:

    c
    a
    t

послідовно.

Приклади:

    /hello/
    /JavaScript/
    /123/
    /user@example.com/

Але деякі символи мають **спеціальне значення**.

---

# 14. Спеціальні символи Regex

До спеціальних символів належать, зокрема:

    .
    *
    +
    ?
    ^
    $
    \
    |
    ( )
    [ ]
    { }

Вони використовуються для побудови шаблонів.

Тому Regex потрібно сприймати як окрему маленьку мову зі своїм синтаксисом.

---

# 15. Character class `[]`

Квадратні дужки створюють **character class**.

Наприклад:

    /[abc]/

означає:

> один символ: `a`, `b` або `c`.

Приклади:

    console.log(/[abc]/.test("apple"));
    // true

    console.log(/[abc]/.test("dog"));
    // false

---

# 16. `[0-9]`

Можна задавати діапазон символів.

    /[0-9]/

означає:

> будь-яка цифра від `0` до `9`.

Наприклад:

    console.log(/[0-9]/.test("abc5"));
    // true

    console.log(/[0-9]/.test("abc"));
    // false

---

# 17. `[a-z]`

Діапазон малих латинських літер:

    /[a-z]/

Наприклад:

    console.log(/[a-z]/.test("hello"));
    // true

    console.log(/[a-z]/.test("123"));
    // false

---

# 18. `[A-Z]`

Великі латинські літери:

    /[A-Z]/

Наприклад:

    console.log(/[A-Z]/.test("Hello"));
    // true

    console.log(/[A-Z]/.test("hello"));
    // false

---

# 19. Комбінація діапазонів

Можна використовувати декілька діапазонів:

    /[A-Za-z]/

означає:

> будь-яка латинська літера у верхньому або нижньому регістрі.

Наприклад:

    /[A-Za-z]/.test("Hello");
    // true

---

# 20. Character class не означає "слово"

Це важлива різниця.

    /[abc]/

означає:

> один символ `a`, `b` або `c`.

Це НЕ означає:

    "abc"

Наприклад:

    /[abc]/.test("dog");
    // false

    /[abc]/.test("cat");
    // true

У `"cat"` є символ `a`.

---

# 21. Negated character class `[^...]`

Якщо після `[` стоїть `^`, character class стає запереченим.

    /[^0-9]/

означає:

> будь-який символ, який НЕ є цифрою.

Наприклад:

    /[^0-9]/.test("123");
    // false

    /[^0-9]/.test("123a");
    // true

---

# 22. Dot `.`

Крапка `.` — один із найважливіших Regex-символів.

Вона означає:

> майже будь-який один символ, крім line terminator.

Наприклад:

    /c.t/

може відповідати:

    cat
    cot
    cut
    c7t

Але:

    /c.t/.test("ct");
    // false

Між `c` та `t` повинен бути один символ.

---

# 23. Dot не означає буквально крапку

Це дуже поширена помилка.

    /./

не означає:

    "."

Воно означає:

> будь-який один відповідний символ.

Якщо потрібно знайти саме крапку, її потрібно escape:

    /\./

---

# 24. Escape `\`

Backslash `\` використовується для спеціального значення символу або для екранування спеціального символу.

Наприклад:

    /\./

означає:

> буквальна крапка.

Також `\` використовується для shorthand character classes:

    \d
    \w
    \s

---

# 25. `\d`

`\d` означає:

> одна цифра.

Еквівалент:

    [0-9]

Приклади:

    /\d/.test("5");
    // true

    /\d/.test("a");
    // false

---

# 26. `\D`

`\D` — протилежність `\d`.

Означає:

> будь-який символ, який не є цифрою.

Приклади:

    /\D/.test("a");
    // true

    /\D/.test("5");
    // false

---

# 27. `\w`

`\w` означає **word character**.

У JavaScript це ASCII-символи:

    A-Z
    a-z
    0-9
    _

Тобто приблизно:

    [A-Za-z0-9_]

Приклади:

    /\w/.test("abc");
    // true

    /\w/.test("123");
    // true

    /\w/.test("_");
    // true

---

# 28. `\W`

`\W` — протилежність `\w`.

Означає:

> символ, який не належить до `[A-Za-z0-9_]`.

Наприклад:

    /\W/.test("!");
    // true

---

# 29. `\s`

`\s` означає whitespace character.

Наприклад:

- пробіл;
- tab;
- newline;
- деякі інші whitespace characters.

    /\s/.test("hello world");
    // true

---

# 30. `\S`

`\S` — символ, який не є whitespace.

    /\S/.test("hello");
    // true

    /\S/.test(" ");
    // false

---

# 31. Shorthand classes — запам'ятати

| Regex | Значення |
|---|---|
| `\d` | digit |
| `\D` | not digit |
| `\w` | word character |
| `\W` | not word character |
| `\s` | whitespace |
| `\S` | not whitespace |

Це одна з найважливіших базових таблиць Regex.

---

# 32. Quantifier `+`

`+` означає:

> один або більше повторень попереднього елемента.

Наприклад:

    /\d+/

означає:

> одна або більше цифр.

Приклади:

    "5"
    "42"
    "123456"

відповідають.

---

# 33. `+` — приклад

    console.log(/\d+/.test("abc123"));
    // true

    console.log(/\d+/.test("abc"));
    // false

---

# 34. Quantifier `*`

`*` означає:

> нуль або більше повторень попереднього елемента.

Наприклад:

    /a*/

може відповідати:

    ""
    "a"
    "aa"
    "aaa"

Тобто навіть нуль повторень допустимий.

---

# 35. Quantifier `?`

`?` означає:

> нуль або одне повторення попереднього елемента.

Наприклад:

    /colou?r/

може відповідати:

    color
    colour

Тому:

    u?

означає:

> `u` може бути, а може не бути.

---

# 36. Quantifier `{n}`

`{n}` означає:

> рівно `n` повторень.

Наприклад:

    /\d{3}/

означає:

> три цифри.

Приклади:

    "123"
    "456"
    "999"

---

# 37. Quantifier `{n,}`

Означає:

> не менше `n` повторень.

Наприклад:

    /\d{3,}/

означає:

> три або більше цифр.

Підходять:

    123
    1234
    12345

---

# 38. Quantifier `{n,m}`

Означає:

> від `n` до `m` повторень.

Наприклад:

    /\d{2,4}/

може знайти:

    12
    123
    1234

---

# 39. Anchor `^`

`^` означає початок рядка.

Наприклад:

    /^Hello/

означає:

> рядок повинен починатися з `Hello`.

    /^Hello/.test("Hello world");
    // true

    /^Hello/.test("Hi, Hello");
    // false

---

# 40. Anchor `$`

`$` означає кінець рядка.

    /world$/

означає:

> рядок повинен закінчуватися на `world`.

    /world$/.test("Hello world");
    // true

    /world$/.test("world!");
    // false

---

# 41. `^` + `$`

Разом вони дозволяють перевірити **весь рядок**.

Наприклад:

    /^\d+$/

означає:

> весь рядок складається з однієї або більше цифр.

    /^\d+$/.test("12345");
    // true

    /^\d+$/.test("123abc");
    // false

    /^\d+$/.test("abc123");
    // false

---

# 42. Важливий принцип `^...$`

Без anchors:

    /\d+/

означає:

> десь у рядку є одна або більше цифр.

Тому:

    /\d+/.test("abc123");
    // true

З anchors:

    /^\d+$/

означає:

> весь рядок повинен складатися з цифр.

    /^\d+$/.test("abc123");
    // false

Це фундаментальна різниця між:

    search

і

    validation

---

# 43. Alternation `|`

`|` означає **або**.

Наприклад:

    /cat|dog/

означає:

> `cat` або `dog`.

    /cat|dog/.test("I have a cat");
    // true

    /cat|dog/.test("I have a dog");
    // true

---

# 44. Групування `()`

Круглі дужки використовуються для групування.

Наприклад:

    /(cat|dog)/

означає:

> `cat` або `dog` як одна група.

Групи особливо важливі при використанні quantifiers.

---

# 45. Групування + quantifier

Наприклад:

    /(ha)+/

означає:

> один або більше повторень `"ha"`.

    /(ha)+/.test("ha");
    // true

    /(ha)+/.test("hahaha");
    // true

---

# 46. Простий Regex для числа

Перевірити, чи рядок містить хоча б одну цифру:

    /\d/

Наприклад:

    function hasDigit(value) {
        return /\d/.test(value);
    }

    console.log(hasDigit("hello"));
    // false

    console.log(hasDigit("hello5"));
    // true

---

# 47. Перевірка тільки цифр

Якщо потрібно перевірити, що **весь рядок** складається тільки з цифр:

    /^\d+$/

Функція:

    function isNumberString(value) {
        return /^\d+$/.test(value);
    }

    console.log(isNumberString("123"));
    // true

    console.log(isNumberString("123abc"));
    // false

---

# 48. Перевірка тільки латинських літер

    /^[A-Za-z]+$/

Наприклад:

    function isLatinLetters(value) {
        return /^[A-Za-z]+$/.test(value);
    }

    console.log(isLatinLetters("Hello"));
    // true

    console.log(isLatinLetters("Hello123"));
    // false

---

# 49. Перевірка простого username

Наприклад, дозволимо:

- латинські літери;
- цифри;
- `_`.

    /^[A-Za-z0-9_]+$/

Приклади:

    "valeriy"
    "user123"
    "user_name"

можуть відповідати цьому шаблону.

---

# 50. Regex не знає значення слова

Regex працює зі **структурою символів**, а не зі змістом.

Наприклад:

    /^\d+$/

знає, що:

    "12345"

складається з цифр.

Але Regex не знає, чи є це:

- віком;
- ID;
- номером;
- ціною;
- поштовим кодом.

Семантику визначає програма.

---

# 51. Простий email Regex

На базовому рівні можна зустріти:

    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

Наприклад:

    console.log(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test("user@example.com")
    );
    // true

Це може бути корисною базовою перевіркою, але **це не повна специфікація email**.

Не потрібно намагатися вивчити складний RFC email Regex на цьому етапі.

---

# 52. Regex для пошуку номера

Наприклад:

    /\d{3}/

означає:

> знайти послідовність із трьох цифр.

У:

    "Order 123"

буде знайдено:

    "123"

Але це ще не означає, що Regex правильно перевіряє конкретний формат номера.

---

# 53. Regex — пошук чи validation?

Це дуже важливе розділення.

## Пошук

    /\d+/

Шукаємо цифри **де завгодно** у рядку.

## Validation

    /^\d+$/

Перевіряємо, що **весь рядок** складається з цифр.

Тобто:

    /\d+/
    → find something

    /^\d+$/
    → validate whole string

---

# 54. Regex + `test()` у формах

Наприклад:

    const username = "valeriy123";

    const usernameRegex = /^[A-Za-z0-9_]+$/;

    if (usernameRegex.test(username)) {
        console.log("Valid username");
    } else {
        console.log("Invalid username");
    }

Це типовий frontend use case.

---

# 55. Regex + user input

Наприклад:

    const input = "12345";

    const onlyDigits = /^\d+$/;

    if (onlyDigits.test(input)) {
        console.log("Only digits");
    }

Така перевірка може використовуватися для:

- input;
- form validation;
- search;
- filters;
- API data validation.

---

# 56. Regex не замінює нормальну validation

Regex може перевірити **формат**, але не обов'язково правильність даних.

Наприклад:

    /^\d{2}$/

перевіряє:

> рівно дві цифри.

Але:

    "99"

формально відповідає.

Це не означає, що `99` є допустимим значенням для конкретного поля.

Наприклад, якщо поле — місяць:

    99

не є правильним місяцем.

Тому:

    Regex
    +
    business rules

часто потрібні разом.

---

# 57. Unicode і Regex

Важливий нюанс:

    \w

у стандартному використанні JavaScript не означає "будь-яка літера будь-якої мови".

Воно орієнтоване на ASCII:

    A-Z
    a-z
    0-9
    _

Наприклад, для Unicode-роботи існують Unicode property escapes:

    \p{L}

разом із flag:

    u

Наприклад:

    /^\p{L}+$/u

означає:

> один або більше Unicode letters.

Це вже більш просунута тема.

---

# 58. Regex і український текст

Не потрібно припускати, що:

    [A-Za-z]

охоплює українські літери.

Не охоплює.

Наприклад:

    /^[A-Za-z]+$/

не відповідає:

    "Привіт"

Для Unicode потрібно використовувати відповідні Unicode-підходи.

Наприклад:

    /^\p{L}+$/u

може відповідати словам, що складаються з Unicode letters.

---

# 59. Regex і екранування в JavaScript

Є важлива різниця між Regex literal та string.

Regex literal:

    /\d+/

Constructor:

    new RegExp("\\d+")

Чому подвійний `\\`?

Тому що спочатку JavaScript обробляє string escape:

    "\\d+"
       ↓
    "\d+" для RegExp

Це одна з причин, чому Regex literal часто простіший для статичних шаблонів.

---

# 60. Regex як об'єкт

Regex — це об'єкт JavaScript.

    const regex = /hello/i;

    console.log(typeof regex);
    // "object"

Можна перевірити:

    console.log(regex instanceof RegExp);
    // true

---

# 61. Властивості Regex

Наприклад:

    const regex = /hello/gi;

    console.log(regex.source);
    // "hello"

    console.log(regex.flags);
    // "gi"

Також існують властивості:

    regex.global
    regex.ignoreCase
    regex.multiline
    regex.unicode
    regex.sticky
    regex.dotAll

На базовому рівні достатньо розуміти, що Regex зберігає pattern і flags.

---

# 62. Regex і string methods

Regex тісно пов'язаний із методами рядків:

    match()
    matchAll()
    search()
    replace()
    replaceAll()
    split()

Наприклад:

    const text = "I have 123 apples";

    console.log(text.match(/\d+/));
    // ["123", ...]

Але детально ці методи належать до наступної теми:

    11-regex-methods

---

# 63. Regex + `search()`

Можна шукати pattern у рядку:

    const text = "JavaScript is great";

    console.log(text.search(/JavaScript/));
    // 0

Але:

    search()

повертає позицію збігу, а не `true/false`.

Тому для простої перевірки часто зручніше:

    regex.test(text)

---

# 64. Regex + `match()`

`match()` дозволяє отримати збіги.

    const text = "Order 123";

    console.log(text.match(/\d+/));
    // ["123", ...]

Різниця:

    regex.test(text)
    → true / false

    text.match(regex)
    → information about match

---

# 65. Найважливіші базові символи

| Syntax | Значення |
|---|---|
| `.` | майже будь-який символ |
| `[]` | character class |
| `[^]` | заперечений character class |
| `\d` | цифра |
| `\D` | не цифра |
| `\w` | word character |
| `\W` | не word character |
| `\s` | whitespace |
| `\S` | не whitespace |
| `+` | 1 або більше |
| `*` | 0 або більше |
| `?` | 0 або 1 |
| `{n}` | рівно n |
| `{n,}` | n або більше |
| `{n,m}` | від n до m |
| `^` | початок |
| `$` | кінець |
| `|` | або |
| `()` | група |
| `\` | escape / special sequence |

Цю таблицю варто поступово вивчити напам'ять.

---

# 66. Як читати Regex

Regex спочатку виглядає складно:

    /^\d{2,4}$/

Розберемо:

    ^
    ↓
    початок рядка

    \d
    ↓
    цифра

    {2,4}
    ↓
    від 2 до 4 цифр

    $
    ↓
    кінець рядка

Отже:

    /^\d{2,4}$/

означає:

> весь рядок повинен містити від 2 до 4 цифр.

---

# 67. Ще один приклад розбору

    /^[A-Za-z0-9_]+$/

Розбираємо:

    ^
    ↓
    початок

    [A-Za-z0-9_]
    ↓
    латинська літера, цифра або "_"

    +
    ↓
    один або більше

    $
    ↓
    кінець

Весь рядок:

    username123

може відповідати цьому шаблону.

---

# 68. Ще один приклад

    /^\d{4}-\d{2}-\d{2}$/

Розбір:

    ^
    ↓
    початок

    \d{4}
    ↓
    4 цифри

    -
    ↓
    дефіс

    \d{2}
    ↓
    2 цифри

    -
    ↓
    дефіс

    \d{2}
    ↓
    2 цифри

    $
    ↓
    кінець

Формат:

    2026-09-14

відповідає структурі.

Але Regex сам по собі не перевіряє, чи дата реально існує.

Наприклад:

    2026-99-99

структурно відповідає цьому Regex, але не є коректною датою.

---

# 69. Як правильно вивчати Regex

Не потрібно намагатися запам'ятати сотні символів.

Краще рухатися шарами:

    1. literal characters
         ↓
    2. character classes
         ↓
    3. shorthand classes
         ↓
    4. quantifiers
         ↓
    5. anchors
         ↓
    6. groups
         ↓
    7. alternation
         ↓
    8. flags
         ↓
    9. practical patterns

---

# 70. Практична вправа 1 — знайти цифру

Перевір:

    const value = "JavaScript 2026";

Чи містить рядок цифру?

Використай:

    /\d/

Очікуваний результат:

    true

---

# 71. Практична вправа 2 — тільки цифри

Створи функцію:

    function isDigits(value) {
        // ...
    }

Вона повинна давати:

    isDigits("123");
    // true

    isDigits("123abc");
    // false

    isDigits("abc");
    // false

Підказка:

    /^\d+$/

---

# 72. Практична вправа 3 — username

Створи перевірку:

    const usernameRegex = /^[A-Za-z0-9_]+$/;

Перевір:

    "valeriy"
    "user123"
    "user_name"
    "user-name"

Подумай, які значення повинні пройти validation.

---

# 73. Практична вправа 4 — початок і кінець

Створи Regex, який перевіряє, що рядок:

- починається з `"JS"`;
- закінчується на `"!"`.

Наприклад:

    "JS is great!"

---

# 74. Практична вправа 5 — код із 4 цифр

Створи Regex для:

    1234

але не:

    123
    12345
    12ab

Підказка:

    /^\d{4}$/

---

# 75. Практична вправа 6 — два або чотири символи

Створи Regex, який дозволяє:

    "12"
    "1234"

але не:

    "1"
    "123"
    "12345"

Підказка:

    {2,4}

але подумай, де потрібні:

    ^
    $

---

# 76. Типові помилки

## Помилка 1 — забути anchors

Наприклад:

    /\d+/

Як validation це часто недостатньо.

    /\d+/.test("abc123");
    // true

Якщо потрібно дозволити **тільки цифри**:

    /^\d+$/

---

## Помилка 2 — плутати `[]` з групою

    /[abc]/

означає:

    один символ: a або b або c

А:

    /(abc)/

означає:

    послідовність "abc" як групу.

---

## Помилка 3 — плутати `.`

    /./

означає майже будь-який символ.

Для буквальної крапки:

    /\./

---

## Помилка 4 — забути `i`

Без:

    /javascript/

регістр має значення.

З:

    /javascript/i

регістр ігнорується.

---

## Помилка 5 — використовувати `\w` для всіх мов

    \w

не означає "будь-яка літера Unicode".

Для Unicode потрібні інші можливості Regex.

---

## Помилка 6 — намагатися зробити один Regex для всього

Regex не повинен замінювати всю business logic.

Краще:

    Regex
    +
    нормальна перевірка даних
    +
    business rules

---

## Помилка 7 — надто складний Regex

Наприклад, замість величезного шаблону для email часто достатньо базової перевірки формату на frontend, а остаточну перевірку виконувати на backend.

---

# 77. Regex і frontend

Regex дуже часто використовується у формах:

    input
      ↓
    regex.test(value)
      ↓
    valid / invalid
      ↓
    UI feedback

Наприклад:

    const usernameRegex = /^[A-Za-z0-9_]+$/;

    const input = "valeriy123";

    if (usernameRegex.test(input)) {
        console.log("Valid");
    }

---

# 78. Regex і backend

На backend Regex може використовуватися для:

- перевірки параметрів;
- validation;
- пошуку;
- очищення тексту;
- парсингу;
- обробки логів;
- перевірки формату даних.

Але backend validation повинна бути незалежною від frontend.

Не можна покладатися лише на перевірку в браузері.

---

# 79. Regex і PostgreSQL

У full-stack застосунках Regex може зустрічатися не тільки в JavaScript.

Наприклад:

    JavaScript
        ↓
    validation
        ↓
    API
        ↓
    Nest.js / Node.js
        ↓
    PostgreSQL

PostgreSQL також має власні можливості регулярних виразів.

Тому Regex — це корисна концепція не тільки для frontend.

---

# 80. Що потрібно знати для Junior JavaScript Developer

Впевнено знати:

- що таке Regex;
- Regex literal;
- `RegExp`;
- `test()`;
- flags;
- `i`;
- `g`;
- character classes;
- `[]`;
- `\d`;
- `\w`;
- `\s`;
- `+`;
- `*`;
- `?`;
- `{n}`;
- `{n,m}`;
- `^`;
- `$`;
- `|`;
- `()`;
- escape `\`;
- різницю між пошуком і validation.

Не потрібно намагатися запам'ятати всі складні Regex patterns.

Важливіше вміти **прочитати простий Regex і поступово побудувати свій**.

---

# 81. Interview Questions

### 1. Що таке Regular Expression?

Це шаблон для пошуку, перевірки або обробки тексту.

---

### 2. Як створити Regex у JavaScript?

Через literal:

    /pattern/

або constructor:

    new RegExp("pattern")

---

### 3. Що робить `test()`?

Перевіряє, чи є відповідність Regex у рядку, і повертає:

    true
    або
    false

---

### 4. Що означає `i`?

`ignoreCase` — ігнорування регістру.

---

### 5. Що означає `g`?

`global` — робота з глобальними збігами.

---

### 6. Що означає `\d`?

Одна цифра.

Приблизно:

    [0-9]

---

### 7. Що означає `\w`?

ASCII word character:

    A-Z
    a-z
    0-9
    _

---

### 8. Що означає `\s`?

Whitespace character.

---

### 9. Що означає `+`?

Одне або більше повторень попереднього елемента.

---

### 10. Що означає `*`?

Нуль або більше повторень.

---

### 11. Що означає `?`?

Нуль або одне повторення.

---

### 12. Що означає `^`?

Початок рядка.

---

### 13. Що означає `$`?

Кінець рядка.

---

### 14. Навіщо потрібні `^` та `$`?

Для перевірки всього рядка.

Наприклад:

    /^\d+$/

означає:

> весь рядок складається тільки з цифр.

---

### 15. Чим відрізняються `[]` та `()`?

    []
    → character class

    ()
    → group

Наприклад:

    /[abc]/
    → один із символів a, b, c

    /(abc)/
    → група "abc"

---

### 16. Чим відрізняються `/\d+/` та `/^\d+$/`?

    /\d+/
    → шукає цифри десь у рядку

    /^\d+$/
    → перевіряє весь рядок

---

### 17. Чи може Regex перевірити, що дата реально існує?

Сам по собі простий Regex зазвичай перевіряє структуру, а не повну семантику.

Наприклад:

    /^\d{4}-\d{2}-\d{2}$/

перевіряє формат:

    YYYY-MM-DD

але не гарантує, що дата існує.

---

### 18. Чи змінює Regex рядок?

Ні.

Regex описує pattern. Зміна рядка відбувається через відповідні string methods, наприклад `replace()`.

---

# 82. Learning Path

## 🟢 Core — Junior

Вивчити:

    /pattern/

    new RegExp()

    regex.test(string)

    i
    g

    []
    \d
    \w
    \s

    +
    *
    ?
    {n}
    {n,m}

    ^
    $

    |
    ()

---

## 🟡 Junior+

Навчитися самостійно створювати:

- username validation;
- digits validation;
- basic email validation;
- прості ID;
- прості коди;
- пошук чисел;
- пошук слів;
- прості формати дат;
- прості формати телефонів.

---

## 🟠 Middle

Розуміти:

- groups;
- capturing groups;
- non-capturing groups;
- lookahead;
- lookbehind;
- lazy/greedy quantifiers;
- Unicode property escapes;
- складніші patterns;
- Regex performance;
- ReDoS risks.

Це вже наступний рівень і не потрібно змішувати його з базовим Regex.

---

## 🔴 Senior

На старшому рівні важливо не просто знати Regex syntax, а розуміти:

- коли Regex доречний;
- коли Regex робить код гіршим;
- складність pattern;
- catastrophic backtracking;
- безпечну обробку user input;
- Unicode;
- продуктивність;
- читабельність;
- тестування складних patterns.

---

# 83. Mini Cheat Sheet

    // Regex literal
    const regex = /hello/;

    // RegExp constructor
    const regex = new RegExp("hello");

    // test
    /hello/.test("hello world");
    // true

    // ignore case
    /hello/i.test("HELLO");
    // true

    // digit
    /\d/.test("5");
    // true

    // one or more digits
    /\d+/.test("123");
    // true

    // only digits
    /^\d+$/.test("123");
    // true

    // lowercase Latin letter
    /[a-z]/.test("hello");
    // true

    // any Latin letter
    /[A-Za-z]/.test("Hello");
    // true

    // whitespace
    /\s/.test("hello world");
    // true

    // beginning
    /^Hello/.test("Hello world");
    // true

    // ending
    /world$/.test("Hello world");
    // true

    // exactly 4 digits
    /^\d{4}$/.test("1234");
    // true

    // 2 to 4 digits
    /^\d{2,4}$/.test("123");
    // true

    // OR
    /cat|dog/.test("dog");
    // true

    // literal dot
    /\./.test("example.com");
    // true

---

# 84. Головне, що потрібно запам'ятати

> Regex — це **шаблон**, а не просто пошук тексту.

> `test()` відповідає на питання: **є відповідність чи ні?**

> `[]` — набір допустимих символів.

> `\d` — цифра.

> `\w` — ASCII word character.

> `\s` — whitespace.

> `+` — один або більше.

> `*` — нуль або більше.

> `?` — нуль або один.

> `^` — початок.

> `$` — кінець.

> `|` — або.

> `()` — групування.

> `\` — escape та спеціальні послідовності.

Найважливіший практичний патерн для validation:

    /^...$/

Він змушує Regex перевіряти **весь рядок**, а не просто знаходити збіг десь усередині нього.

---

# 85. Зв'язок з попередніми темами

Ця тема логічно продовжує роботу з рядками:

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

До цього моменту ми працювали переважно з готовими string methods:

    includes()
    startsWith()
    endsWith()
    indexOf()
    slice()
    replace()
    split()
    join()
    padStart()
    padEnd()
    repeat()

Тепер з'являється новий рівень:

    String
      ↓
    Regex Pattern
      ↓
    пошук / validation / extraction
      ↓
    String methods

Regex стає універсальним способом описувати **структуру тексту**.

---

# 86. Що буде далі

Наступна тема:

    11-regex-methods

Там Regex буде розглядатися вже разом із методами JavaScript:

    test()
    exec()
    match()
    matchAll()
    search()
    replace()
    replaceAll()
    split()

Тобто ця тема відповідає на питання:

> **Як описати шаблон?**

А наступна:

> **Як використовувати цей шаблон у JavaScript?**

Це важливе розділення для системного вивчення Regex.