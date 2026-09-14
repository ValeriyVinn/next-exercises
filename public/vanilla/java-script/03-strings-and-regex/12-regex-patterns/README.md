# 12. Regex Patterns

## Визначення

**Regex (Regular Expression)** — регулярний вираз для пошуку, перевірки, вилучення або заміни тексту за певним шаблоном.

У JavaScript Regex представлений об'єктом `RegExp` і використовується разом із:

- `test()`
- `exec()`
- `match()`
- `matchAll()`
- `search()`
- `replace()`
- `replaceAll()`
- `split()`

> `11-regex-methods` — **як працювати з Regex**.  
> `12-regex-patterns` — **як правильно будувати Regex-шаблони**.

---

# 1. Створення Regex

## Literal syntax

Найпоширеніший спосіб:

    const regex = /hello/;

Перевірка:

    console.log(regex.test("hello world")); // true
    console.log(regex.test("Hello world")); // false

## Constructor syntax

    const regex = new RegExp("hello");

    console.log(regex.test("hello world")); // true

Constructor особливо корисний, коли шаблон формується динамічно:

    const word = "hello";
    const regex = new RegExp(word);

    console.log(regex.test("hello world")); // true

### Що використовувати?

Зазвичай:

    /pattern/

Якщо Regex створюється на основі змінної:

    new RegExp(pattern)

---

# 2. Regex складається з символів і правил

Наприклад:

    /^\d{3}$/

Цей Regex означає:

- `^` — початок рядка
- `\d` — цифра
- `{3}` — рівно 3 рази
- `$` — кінець рядка

Отже:

    /^\d{3}$/

відповідає:

    "123"
    "456"
    "007"

але не відповідає:

    "12"
    "1234"
    "abc"
    "123abc"

---

# 3. Літеральні символи

Найпростіший Regex шукає точний текст.

    /cat/

відповідає:

    "cat"
    "my cat"
    "category"

Тому що Regex за замовчуванням не вимагає, щоб весь рядок дорівнював шаблону.

Якщо потрібно перевірити весь рядок:

    /^cat$/

Тоді:

    /^cat$/.test("cat");        // true
    /^cat$/.test("my cat");     // false
    /^cat$/.test("category");   // false

---

# 4. Метасимволи

Regex має спеціальні символи, які мають особливе значення.

Основні:

| Символ | Значення |
|---|---|
| `.` | будь-який символ, крім line terminator |
| `^` | початок рядка |
| `$` | кінець рядка |
| `*` | 0 або більше |
| `+` | 1 або більше |
| `?` | 0 або 1 |
| `{n}` | рівно `n` разів |
| `{n,}` | `n` або більше |
| `{n,m}` | від `n` до `m` |
| `[]` | набір символів |
| `()` | група |
| `|` | OR |
| `\` | escape / спеціальна послідовність |

---

# 5. Dot `.`

`.` означає приблизно:

> будь-який один символ

Наприклад:

    /c.t/

відповідає:

    "cat"
    "cot"
    "cut"
    "c9t"

Але не:

    "ct"

Тому що між `c` і `t` повинен бути один символ.

### Важливо

`.` не означає буквально крапку.

Для пошуку саме крапки:

    /\./

---

# 6. Character classes `[]`

Квадратні дужки задають набір допустимих символів.

    /[abc]/

означає:

> один символ: `a`, `b` або `c`

Приклади:

    /[abc]/.test("apple"); // true
    /[abc]/.test("dog");   // true — є "a/b/c"? Ні, тому false

Правильно:

    /[abc]/.test("apple"); // true
    /[abc]/.test("dog");   // false
    /[abc]/.test("cat");   // true

---

# 7. Діапазони символів

Можна задавати діапазони.

## Цифри

    /[0-9]/

Одна цифра від `0` до `9`.

## Маленькі літери

    /[a-z]/

## Великі літери

    /[A-Z]/

## Літери та цифри

    /[A-Za-z0-9]/

Наприклад:

    /^[A-Za-z0-9]+$/

означає:

> весь рядок складається тільки з латинських літер і цифр.

---

# 8. Negated character class `[^...]`

`^` всередині `[]` означає заперечення.

    /[^0-9]/

означає:

> будь-який символ, який НЕ є цифрою.

Наприклад:

    /[^0-9]/.test("123"); // false
    /[^0-9]/.test("12a"); // true

Зверни увагу:

    [^0-9]

означає **один символ, який не є цифрою**, а не "рядок без цифр".

---

# 9. Shorthand character classes

Regex має скорочені позначення.

## `\d` — digit

Цифра.

    /\d/

приблизно відповідає:

    /[0-9]/

Приклад:

    /\d/.test("abc123"); // true

---

## `\D` — not digit

Не цифра.

    /\D/

приблизно:

    /[^0-9]/

---

## `\w` — word character

У JavaScript це ASCII-орієнтований shorthand:

    [A-Za-z0-9_]

Приклад:

    /\w+/.test("user_123"); // true

---

## `\W` — not word character

Все, що не входить до:

    A-Z
    a-z
    0-9
    _

---

## `\s` — whitespace

Пробільні символи:

- пробіл
- tab
- line break
- інші whitespace characters

Приклад:

    /\s/.test("hello world"); // true

---

## `\S` — not whitespace

Будь-який символ, який не є whitespace.

---

# 10. Quantifiers

Quantifier визначає:

> скільки разів повинен повторитися попередній елемент.

---

## `*` — 0 або більше

    /ab*/

Відповідає:

    "a"
    "ab"
    "abb"
    "abbb"

Тому що `b` може бути:

    0
    1
    2
    3
    ...

разів.

---

## `+` — 1 або більше

    /ab+/

Відповідає:

    "ab"
    "abb"
    "abbb"

Але не:

    "a"

---

## `?` — 0 або 1

    /colou?r/

Відповідає:

    "color"
    "colour"

`u` є необов'язковим.

---

# 11. Exact quantifier `{n}`

Рівно `n` разів.

    /\d{3}/

означає:

> три цифри підряд.

Наприклад:

    /\d{3}/.test("123");    // true
    /\d{3}/.test("12345");  // true

Останній результат `true`, тому що Regex знайшов усередині `"12345"` послідовність із трьох цифр.

Для всього рядка:

    /^\d{3}$/

Тоді:

    /^\d{3}$/.test("123");   // true
    /^\d{3}$/.test("12345"); // false

---

# 12. Range quantifier `{n,}`

`n` або більше разів.

    /^\d{3,}$/

Означає:

> мінімум 3 цифри.

Приклади:

    /^\d{3,}$/.test("123");     // true
    /^\d{3,}$/.test("12345");   // true
    /^\d{3,}$/.test("12");      // false

---

# 13. Range `{n,m}`

Від `n` до `m` разів.

    /^\d{2,4}$/

Означає:

> від 2 до 4 цифр.

    /^\d{2,4}$/.test("12");    // true
    /^\d{2,4}$/.test("123");   // true
    /^\d{2,4}$/.test("1234");  // true
    /^\d{2,4}$/.test("12345"); // false

---

# 14. Anchors `^` і `$`

Anchors дозволяють контролювати позицію.

## `^`

Початок рядка.

    /^Hello/

Відповідає:

    "Hello world"

Але не:

    "Hi, Hello world"

---

## `$`

Кінець рядка.

    /world$/

Відповідає:

    "Hello world"

Але не:

    "world is here"

---

## Разом

    /^Hello world$/

Вимагає, щоб весь рядок був:

    "Hello world"

---

# 15. Найважливіша відмінність: пошук vs validation

Це одна з найважливіших речей у Regex.

### Пошук

    /\d+/

Шукає одну або більше цифр десь у тексті.

    /\d+/.test("Age: 56"); // true

### Validation

    /^\d+$/

Вимагає, щоб увесь рядок складався з цифр.

    /^\d+$/.test("56");      // true
    /^\d+$/.test("Age: 56"); // false

Тому:

> Для перевірки всього значення дуже часто потрібні `^` і `$`.

---

# 16. Alternation `|`

`|` означає:

> OR

Наприклад:

    /cat|dog/

відповідає:

    "cat"
    "dog"

Приклад:

    /^(cat|dog)$/

Тепер весь рядок повинен бути або `cat`, або `dog`.

    /^(cat|dog)$/.test("cat"); // true
    /^(cat|dog)$/.test("dog"); // true
    /^(cat|dog)$/.test("fox"); // false

---

# 17. Groups `()`

Круглі дужки створюють групу.

    /(ab)+/

`ab` розглядається як єдина група.

Відповідає:

    "ab"
    "abab"
    "ababab"

---

# 18. Capturing groups

Групи не тільки групують Regex — вони можуть зберігати знайдені частини.

Наприклад:

    /(\d{4})-(\d{2})-(\d{2})/

Для:

    "2026-09-14"

групи будуть:

    1 → 2026
    2 → 09
    3 → 14

Приклад:

    const regex = /(\d{4})-(\d{2})-(\d{2})/;
    const result = "2026-09-14".match(regex);

    console.log(result[1]); // "2026"
    console.log(result[2]); // "09"
    console.log(result[3]); // "14"

---

# 19. Non-capturing group `(?:...)`

Якщо групування потрібне, але результат групи не потрібно зберігати:

    /(?:cat|dog)/

Це **non-capturing group**.

Наприклад:

    /^(?:cat|dog)$/

Вона використовується для логічного групування без створення capturing group.

---

# 20. Escape character `\`

Backslash дозволяє використовувати спеціальні символи або shorthand-послідовності.

Наприклад:

    \d
    \w
    \s
    \.
    \+
    \?
    \*

Якщо потрібно знайти саме `.`:

    /\./

Якщо потрібно знайти `+`:

    /\+/

Якщо потрібно знайти `?`:

    /\?/

---

# 21. Special characters

До Regex-метасимволів належать:

    . ^ $ * + ? { } [ ] \ | ( )

Якщо потрібно шукати їх буквально, часто потрібен escape.

Наприклад:

    /\$/

знаходить `$`.

    /\?/

знаходить `?`.

    /\./

знаходить `.`.

---

# 22. Email pattern

Простий навчальний варіант:

    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

Приклади:

    test@example.com
    user123@gmail.com

Логіка:

    ^                  початок
    [^\s@]+            один або більше символів, крім пробілу та @
    @                  символ @
    [^\s@]+            домен
    \.                 крапка
    [^\s@]+            доменна зона
    $                  кінець

### Важливо

Email Regex швидко стає дуже складним.

У реальному застосунку Regex краще використовувати для базової перевірки формату, а не намагатися повністю реалізувати всю специфікацію email.

---

# 23. Phone number

Наприклад, базова перевірка номера:

    /^\+380\d{9}$/

Вимагає формат:

    +380XXXXXXXXX

Наприклад:

    /^\+380\d{9}$/.test("+380501234567"); // true
    /^\+380\d{9}$/.test("0501234567");    // false

Якщо потрібно дозволити різні формати номера, Regex потрібно будувати окремо під вимоги конкретного застосунку.

---

# 24. Username

Наприклад:

> 3–16 символів, тільки латинські літери, цифри та `_`.

    /^[A-Za-z0-9_]{3,16}$/

Приклади:

    "valeriy"
    "user_123"
    "admin56"

Не відповідають:

    "ab"
    "user-name"
    "дуже_довгий_username"

---

# 25. Password pattern

Наприклад, базова вимога:

- мінімум 8 символів
- хоча б одна маленька літера
- хоча б одна велика літера
- хоча б одна цифра

Regex:

    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

Тут уже використовуються **lookaheads**.

Це складніший рівень Regex.

---

# 26. Lookahead `(?=...)`

Lookahead перевіряє умову, не "з'їдаючи" символи.

Наприклад:

    /(?=.*\d)/

означає:

> десь далі в рядку повинна бути цифра.

Наприклад:

    /^(?=.*\d).+$/

означає:

> весь рядок має хоча б один символ і містить хоча б одну цифру.

    /^(?=.*\d).+$/.test("abc1"); // true
    /^(?=.*\d).+$/.test("abc");  // false

---

# 27. Multiple lookaheads

Можна комбінувати умови.

Наприклад:

    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

Розбираємо:

    (?=.*[a-z])

є маленька літера.

    (?=.*[A-Z])

є велика літера.

    (?=.*\d)

є цифра.

    .{8,}

мінімум 8 символів.

---

# 28. Negative lookahead `(?!...)`

Negative lookahead означає:

> наступна умова НЕ повинна виконуватися.

Наприклад:

    /^(?!admin$).+$/

Забороняє точне значення:

    "admin"

але дозволяє:

    "administrator"
    "user"
    "admin123"

---

# 29. Word boundary `\b`

`\b` означає межу слова.

Наприклад:

    /\bcat\b/

відповідає слову:

    "cat"

але не:

    "category"

Приклади:

    /\bcat\b/.test("cat");      // true
    /\bcat\b/.test("my cat");   // true
    /\bcat\b/.test("category"); // false

Це дуже корисно для пошуку окремих слів.

---

# 30. Negative word boundary `\B`

`\B` означає:

> позиція, яка НЕ є межею слова.

Це значно рідше використовується в початковій практиці.

Приклад:

    /\Bcat/.test("category"); // true

---

# 31. Unicode та `u`

Для Unicode-aware Regex можна використовувати прапорець `u`.

    const regex = /\p{L}+/u;

`\p{L}` означає Unicode category "Letter".

Наприклад, це дозволяє працювати з літерами різних мов.

Для Unicode property escapes потрібен прапорець `u`.

---

# 32. Unicode property escapes

Корисні категорії:

    \p{L}   // letters
    \p{N}   // numbers
    \p{P}   // punctuation
    \p{S}   // symbols

Наприклад:

    /^\p{L}+$/u

означає:

> рядок складається тільки з Unicode-літер.

Це значно ширше, ніж:

    /^[A-Za-z]+$/

Останній варіант працює тільки з латинським алфавітом.

---

# 33. Regex flags

Прапорці змінюють поведінку Regex.

Основні:

| Flag | Значення |
|---|---|
| `g` | global |
| `i` | case-insensitive |
| `m` | multiline |
| `s` | dotAll |
| `u` | Unicode |
| `y` | sticky |
| `d` | indices |

---

# 34. `i` — case-insensitive

Без `i`:

    /hello/.test("Hello"); // false

З `i`:

    /hello/i.test("Hello"); // true

Також:

    /hello/i.test("HELLO"); // true

---

# 35. `g` — global

Без `g` Regex зазвичай працює з першим збігом у відповідних String methods.

З `g`:

    const text = "cat dog cat";
    const result = text.match(/cat/g);

    console.log(result); // ["cat", "cat"]

`g` особливо важливий для:

- `match()`
- `replace()`
- `replaceAll()` з Regex
- глобального пошуку

---

# 36. `m` — multiline

`m` змінює поведінку `^` та `$`.

Без `m` вони орієнтуються на весь input.

З `m` вони можуть працювати з окремими рядками багаторядкового тексту.

Наприклад:

    const text = `first line
    second line
    third line`;

    text.match(/^second line$/m);

може знайти окремий рядок.

---

# 37. `s` — dotAll

За замовчуванням `.` не відповідає line terminator.

З `s`:

    /./s

крапка може відповідати і line terminator.

Наприклад:

    const regex = /hello.world/s;

може знайти текст, де між `hello` і `world` є перенос рядка.

---

# 38. `u` — Unicode

Прапорець:

    /.../u

вмикає Unicode-aware behavior для відповідних можливостей Regex.

Особливо важливий разом із:

    \p{...}

Наприклад:

    /\p{L}/u

---

# 39. Комбінація flags

Flags можна комбінувати:

    /hello/gi

означає:

- `g` — глобальний пошук
- `i` — без урахування регістру

Наприклад:

    "Hello hello HELLO".match(/hello/gi);

Результат:

    ["Hello", "hello", "HELLO"]

---

# 40. Практичний приклад: тільки цифри

    const regex = /^\d+$/;

    regex.test("123");    // true
    regex.test("123abc"); // false
    regex.test("abc");    // false

---

# 41. Практичний приклад: тільки латинські літери

    const regex = /^[A-Za-z]+$/;

    regex.test("Hello");  // true
    regex.test("Hello1"); // false
    regex.test("Привіт"); // false

Якщо потрібні Unicode-літери:

    const regex = /^\p{L}+$/u;

---

# 42. Практичний приклад: ціле число

    /^-?\d+$/

Розбираємо:

    -?      мінус необов'язковий
    \d+     одна або більше цифр

Відповідає:

    "123"
    "-123"
    "0"

Не відповідає:

    "12.5"
    "abc"

---

# 43. Практичний приклад: decimal number

Простий навчальний варіант:

    /^-?\d+(\.\d+)?$/

Відповідає:

    "10"
    "-10"
    "10.5"
    "-10.5"

Не відповідає:

    "10."
    "abc"

---

# 44. Практичний приклад: дата

Для формату:

    YYYY-MM-DD

можна використати:

    /^\d{4}-\d{2}-\d{2}$/

Наприклад:

    "2026-09-14"

Але важливо:

> цей Regex перевіряє **формат**, а не реальність дати.

Наприклад:

    "2026-99-99"

формально відповідає цьому Regex.

Для перевірки реальної календарної дати потрібна додаткова логіка.

---

# 45. Практичний приклад: час

Для базового формату:

    HH:MM

можна написати:

    /^\d{2}:\d{2}$/

Але це перевіряє лише формат.

Для реальних годин `00–23` і хвилин `00–59`:

    /^(?:[01]\d|2[0-3]):[0-5]\d$/

Приклади:

    "09:30" → true
    "23:59" → true
    "25:90" → false

---

# 46. Практичний приклад: hex color

Простий варіант:

    /^#[0-9A-Fa-f]{6}$/

Відповідає:

    "#ffffff"
    "#000000"
    "#12ABef"

Не відповідає:

    "ffffff"
    "#fff"
    "#12345"

Для короткого формату `#fff` можна розширити Regex:

    /^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/

---

# 47. Практичний приклад: slug

Наприклад, slug:

> тільки lowercase letters, numbers і `-`.

    /^[a-z0-9]+(?:-[a-z0-9]+)*$/

Відповідає:

    "hello"
    "hello-world"
    "javascript-2026"

Не відповідає:

    "Hello"
    "hello_world"
    "-hello"
    "hello-"

---

# 48. Практичний приклад: пошук hashtags

    /#[A-Za-z0-9_]+/g

Наприклад:

    const text = "Learning #JavaScript and #React";

    const hashtags = text.match(/#[A-Za-z0-9_]+/g);

    console.log(hashtags);
    // ["#JavaScript", "#React"]

---

# 49. Практичний приклад: пошук згадок

    /@[A-Za-z0-9_]+/g

Для:

    "Hello @valeriy and @admin"

отримаємо:

    ["@valeriy", "@admin"]

---

# 50. Практичний приклад: видалення зайвих пробілів

Regex:

    /\s+/g

можна використовувати разом із `replace()`:

    const text = "Hello    world   JavaScript";

    const normalized = text.replace(/\s+/g, " ");

    console.log(normalized);
    // "Hello world JavaScript"

---

# 51. Практичний приклад: знайти всі числа

    const text = "There are 12 apples and 25 oranges.";

    const numbers = text.match(/\d+/g);

    console.log(numbers);
    // ["12", "25"]

Якщо потрібно отримати числа:

    const numbers = text.match(/\d+/g).map(Number);

---

# 52. Практичний приклад: вилучення дат

    const text = `
    Meeting: 2026-09-14
    Deadline: 2026-10-01
    `;

    const dates = text.match(/\d{4}-\d{2}-\d{2}/g);

Результат:

    [
        "2026-09-14",
        "2026-10-01"
    ]

---

# 53. Практичний приклад: заміна всіх цифр

    const text = "User 123 has 456 points.";

    const result = text.replace(/\d+/g, "[NUMBER]");

    console.log(result);
    // "User [NUMBER] has [NUMBER] points."

---

# 54. Практичний приклад: захист від простого форматування

Наприклад, потрібно знайти всі слова `JavaScript` незалежно від регістру:

    const text = "javascript JavaScript JAVASCRIPT";

    const result = text.match(/javascript/gi);

    console.log(result);
    // ["javascript", "JavaScript", "JAVASCRIPT"]

---

# 55. Regex + capturing groups

Припустимо, є дата:

    const text = "2026-09-14";

Regex:

    const regex = /(\d{4})-(\d{2})-(\d{2})/;

Отримуємо:

    const match = text.match(regex);

    console.log(match[1]); // "2026"
    console.log(match[2]); // "09"
    console.log(match[3]); // "14"

Це корисно, коли Regex не просто перевіряє текст, а **витягує структуровані частини**.

---

# 56. Named capturing groups

Замість:

    (\d{4})-(\d{2})-(\d{2})

можна використовувати імена:

    /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/

Приклад:

    const regex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

    const match = "2026-09-14".match(regex);

    console.log(match.groups.year);
    console.log(match.groups.month);
    console.log(match.groups.day);

Результат:

    2026
    09
    14

Це значно зрозуміліше, ніж:

    match[1]
    match[2]
    match[3]

---

# 57. Backreference

Backreference дозволяє звернутися до вже захопленої групи.

Наприклад:

    /^(["']).*\1$/

Ідея:

- на початку беремо `'` або `"`
- в кінці вимагаємо той самий символ

Це дозволяє працювати з конструкціями на кшталт:

    "hello"
    'hello'

але не:

    "hello'

Backreferences — більш просунутий рівень Regex.

---

# 58. Greedy matching

За замовчуванням quantifiers є **greedy**.

Наприклад:

    /".*"/

Для:

    'He said "hello" and "goodbye".'

Regex може захопити:

    "hello" and "goodbye"

бо `.*` намагається захопити якомога більше.

---

# 59. Lazy matching

Додаємо `?` після quantifier:

    /".*?"/

Тепер Regex намагається захопити якомога менше.

Для:

    'He said "hello" and "goodbye".'

можна отримати окремі:

    "hello"
    "goodbye"

Це називається **lazy / non-greedy matching**.

---

# 60. Greedy vs lazy

| Pattern | Поведінка |
|---|---|
| `.*` | greedy |
| `.*?` | lazy |
| `.+` | greedy |
| `.+?` | lazy |
| `\d+` | greedy |
| `\d+?` | lazy |

Не потрібно використовувати lazy quantifiers автоматично.

Спочатку потрібно зрозуміти, який результат тобі потрібен.

---

# 61. Практична модель побудови Regex

Не намагайся написати складний Regex одразу.

Розбивай задачу на частини.

Наприклад, потрібно перевірити:

> username: 3–16 символів, літери/цифри/underscore.

### Крок 1 — дозволені символи

    [A-Za-z0-9_]

### Крок 2 — кількість

    [A-Za-z0-9_]{3,16}

### Крок 3 — весь рядок

    ^[A-Za-z0-9_]{3,16}$

Готово:

    /^[A-Za-z0-9_]{3,16}$/

---

# 62. Другий приклад побудови

Потрібно:

> номер у форматі `+380` + 9 цифр.

### Крок 1

Фіксований префікс:

    \+380

### Крок 2

Дев'ять цифр:

    \d{9}

### Крок 3

Весь рядок:

    ^\+380\d{9}$

Готовий Regex:

    /^\+380\d{9}$/

---

# 63. Третій приклад

Потрібно:

> тільки цифри, від 4 до 8 символів.

### Цифри

    \d

### Кількість

    {4,8}

### Весь рядок

    ^\d{4,8}$

Готово:

    /^\d{4,8}$/

---

# 64. Regex як маленька мова

Корисно читати Regex **зліва направо**.

Наприклад:

    /^[A-Za-z0-9_]{3,16}$/

Читаємо:

    ^

початок рядка

    [A-Za-z0-9_]

дозволена множина символів

    {3,16}

від 3 до 16

    $

кінець рядка

Тобто:

> весь рядок повинен містити від 3 до 16 латинських літер, цифр або `_`.

---

# 65. Regex не замінює звичайний JavaScript

Regex дуже корисний для:

- пошуку
- перевірки формату
- вилучення тексту
- заміни
- нормалізації

Але Regex не завжди найкращий інструмент.

Наприклад, замість:

    /^\d+$/.test(value)

іноді логічніше використовувати звичайну JavaScript-логіку залежно від задачі.

Так само складну бізнес-логіку не варто намагатися запхати в один величезний Regex.

---

# 66. Regex і frontend

У frontend Regex часто використовується для:

- validation input
- email
- username
- password
- phone
- search
- filtering
- parsing text
- extracting hashtags
- extracting mentions
- formatting text

Наприклад:

    const input = document.querySelector("#username");

    const regex = /^[A-Za-z0-9_]{3,16}$/;

    if (regex.test(input.value)) {
        console.log("Valid username");
    } else {
        console.log("Invalid username");
    }

---

# 67. Regex і backend

На backend Regex може використовуватися для:

- validation request data
- username
- slug
- identifiers
- parsing headers
- log processing
- extracting information
- cleaning input

Наприклад:

    const usernameRegex = /^[A-Za-z0-9_]{3,16}$/;

    if (!usernameRegex.test(username)) {
        throw new Error("Invalid username");
    }

Але:

> backend validation не повинна покладатися лише на frontend validation.

Frontend можна обійти.

---

# 68. Regex + form validation

Типовий сценарій:

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const email = input.value.trim();

    if (!emailRegex.test(email)) {
        error.textContent = "Invalid email";
    }

Тут Regex відповідає лише за структуру.

Перед Regex часто варто:

    trim()

---

# 69. Regex + search

Наприклад:

    const regex = /javascript/i;

    if (regex.test(text)) {
        console.log("JavaScript found");
    }

Це зручніше, коли пошук має бути складнішим, ніж простий:

    includes()

---

# 70. Regex + replace

Наприклад, нормалізація whitespace:

    const result = text.replace(/\s+/g, " ");

Або видалення всіх нецифрових символів:

    const digits = text.replace(/\D/g, "");

Наприклад:

    const phone = "+380 (50) 123-45-67";

    const normalized = phone.replace(/\D/g, "");

    console.log(normalized);
    // "380501234567"

---

# 71. Regex + split

Regex можна використовувати як delimiter.

Наприклад:

    const text = "apple, banana; orange  grape";

    const words = text.split(/[,\s;]+/);

Результат:

    ["apple", "banana", "orange", "grape"]

---

# 72. Regex + match

Пошук усіх чисел:

    const text = "10 apples, 20 oranges";

    const result = text.match(/\d+/g);

Результат:

    ["10", "20"]

---

# 73. Regex + matchAll

Коли потрібні:

- matches
- positions
- capturing groups
- named groups

можна використовувати `matchAll()`.

Наприклад:

    const text = "2026-09-14 and 2026-10-01";

    const regex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/g;

    for (const match of text.matchAll(regex)) {
        console.log(match.groups);
    }

---

# 74. Regex debugging

Складний Regex краще тестувати поступово.

Наприклад, замість одразу:

    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/

спочатку перевірити:

    /[a-z]/

потім:

    /[A-Z]/

потім:

    /\d/

потім:

    /[!@#$%^&*]/

і тільки після цього об'єднувати умови.

---

# 75. Regex: validation checklist

Перед написанням Regex запитай себе:

1. Я шукаю текст чи перевіряю весь рядок?
2. Які символи дозволені?
3. Які символи заборонені?
4. Скільки символів має бути?
5. Чи є необов'язкові частини?
6. Чи є альтернативи `OR`?
7. Чи потрібні групи?
8. Чи потрібно витягнути частини тексту?
9. Чи потрібен `g`?
10. Чи потрібен `i`?
11. Чи потрібен Unicode `u`?
12. Чи справді тут потрібен Regex?

---

# 76. Типові помилки

## Помилка 1 — забути `^` і `$`

Неправильно для validation:

    /\d{3}/

Це знайде три цифри всередині:

    "abc123xyz"

Правильно:

    /^\d{3}$/

---

## Помилка 2 — плутати `*` і `+`

    \d*

означає:

> 0 або більше цифр.

    \d+

означає:

> 1 або більше цифр.

---

## Помилка 3 — плутати `[]` і `()`

    [abc]

означає:

> один символ: `a`, `b` або `c`.

    (abc)

означає:

> послідовність `abc` як групу.

Це принципово різні конструкції.

---

## Помилка 4 — забути escape

Неправильно:

    /+380/

Правильно:

    /\+380/

Тому що `+` має спеціальне значення.

---

## Помилка 5 — використовувати `.` замість `\.`

Неправильно:

    /example.com/

`.` тут означає "будь-який символ".

Для буквальної крапки:

    /example\.com/

---

## Помилка 6 — вважати `\d` універсальним "числом"

`\d` означає цифру, а не довільне число.

    \d

— одна цифра.

    \d+

— одна або більше цифр.

---

## Помилка 7 — надто складний Regex

Погано:

> написати величезний Regex, який ніхто не може прочитати.

Краще:

- розділити validation
- використати JavaScript
- створити кілька простих Regex
- дати Regex зрозуміле ім'я

Наприклад:

    const usernameRegex = /^[A-Za-z0-9_]{3,16}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

---

# 77. Naming Regex

Якщо Regex використовується більше одного разу, краще дати йому ім'я.

Замість:

    if (/^[A-Za-z0-9_]{3,16}$/.test(username)) {
        ...
    }

краще:

    const usernameRegex = /^[A-Za-z0-9_]{3,16}$/;

    if (usernameRegex.test(username)) {
        ...
    }

Код стає зрозумілішим.

---

# 78. Regex як окрема validation function

Ще краще — винести правило:

    const usernameRegex = /^[A-Za-z0-9_]{3,16}$/;

    function isValidUsername(username) {
        return usernameRegex.test(username);
    }

Тепер:

    isValidUsername("valeriy"); // true
    isValidUsername("ab");      // false

Це вже хороший підхід для реального коду.

---

# 79. Regex і security

Regex сам по собі не захищає застосунок від усіх атак.

Наприклад:

> Regex для email ≠ захист від SQL injection.

> Regex для username ≠ authorization.

> Regex для password ≠ безпечне зберігання password.

Regex — це лише інструмент для роботи з текстом.

У backend потрібно додатково використовувати:

- validation
- parameterized queries
- authentication
- authorization
- password hashing
- правильну обробку input

---

# 80. Regex і ReDoS

Надто складні Regex можуть бути небезпечними з точки зору продуктивності.

Особливо ризикованими можуть бути конструкції з:

- великою кількістю вкладених quantifiers
- неоднозначним backtracking
- складними alternations

Наприклад, Regex потрібно проектувати не тільки так, щоб він "працював", але й так, щоб він не витрачав величезну кількість часу на поганих input.

Для звичайного junior-рівня достатньо пам'ятати:

> Не створюй надмірно складні Regex без необхідності.

---

# 81. Практичні вправи

## Вправа 1 — тільки цифри

Створи Regex, який дозволяє:

    "123456"

але не:

    "123abc"

Очікувана ідея:

    /^\d+$/

---

## Вправа 2 — 4 цифри

Наприклад:

    "2026"

але не:

    "26"

    /^\d{4}$/

---

## Вправа 3 — username

Вимоги:

- 3–12 символів
- латинські літери
- цифри
- `_`

    /^[A-Za-z0-9_]{3,12}$/

---

## Вправа 4 — slug

Вимоги:

- lowercase
- digits
- hyphen
- не починається і не закінчується `-`

Спробуй самостійно побудувати:

    /^[a-z0-9]+(?:-[a-z0-9]+)*$/

---

## Вправа 5 — телефон

Формат:

    +380501234567

Побудуй Regex:

    /^\+380\d{9}$/

---

## Вправа 6 — hashtag

Знайди всі hashtags:

    /#[A-Za-z0-9_]+/g

---

## Вправа 7 — числа

З тексту:

    "I have 12 apples and 25 oranges."

отримай:

    ["12", "25"]

---

## Вправа 8 — дата

Перевір формат:

    YYYY-MM-DD

Наприклад:

    /^\d{4}-\d{2}-\d{2}$/

---

## Вправа 9 — email

Напиши базовий email Regex:

    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

Потім протестуй:

    "test@example.com"
    "user@gmail.com"
    "hello"
    "user@"
    "@gmail.com"

---

## Вправа 10 — password

Побудуй Regex:

- мінімум 8 символів
- lowercase
- uppercase
- digit

    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

Після цього поясни кожну частину Regex своїми словами.

---

# 82. Міні-проєкт

## Username validator

Зроби невелику HTML-форму:

    Username: [____________] [Check]

Правила:

- 3–16 символів
- `A-Z`
- `a-z`
- `0-9`
- `_`

Regex:

    /^[A-Za-z0-9_]{3,16}$/

JavaScript:

    const usernameRegex = /^[A-Za-z0-9_]{3,16}$/;

    function validateUsername(username) {
        return usernameRegex.test(username);
    }

Потім додай:

- зелений стан для valid
- червоний стан для invalid
- повідомлення користувачу
- `trim()`
- перевірку порожнього input

Це вже хороший маленький frontend exercise.

---

# 83. Міні-проєкт 2 — Text Analyzer

Створи input/textarea.

Користувач вводить:

    "I learn JavaScript in 2026. JavaScript is interesting."

Програма повинна:

1. знайти всі числа;
2. знайти всі слова `JavaScript`;
3. порахувати кількість;
4. знайти email, якщо він є;
5. знайти hashtags;
6. показати результати.

Тут можна використати:

- `match()`
- `matchAll()`
- `test()`
- `replace()`
- `split()`

Це добре поєднує попередній `11-regex-methods` з поточним `12-regex-patterns`.

---

# 84. Interview Questions

### 1. Що таке Regex?

Регулярний вираз — шаблон для пошуку, перевірки, вилучення або заміни тексту.

---

### 2. Як створити Regex у JavaScript?

Literal:

    /pattern/

Constructor:

    new RegExp("pattern")

---

### 3. Що означає `^`?

Початок рядка.

---

### 4. Що означає `$`?

Кінець рядка.

---

### 5. Різниця між `*` і `+`?

    *

0 або більше.

    +

1 або більше.

---

### 6. Що означає `?`?

Залежно від контексту:

- 0 або 1 повторення;
- lazy quantifier;
- частина lookaround syntax.

У простому випадку:

    a?

означає:

> `a` може бути відсутня або зустрічатися один раз.

---

### 7. Різниця між `[abc]` і `(abc)`?

    [abc]

один символ із `a`, `b`, `c`.

    (abc)

група з послідовністю `abc`.

---

### 8. Що означає `\d`?

Одна цифра.

---

### 9. Що означає `\w`?

Word character у JavaScript Regex:

    A-Z
    a-z
    0-9
    _

---

### 10. Що означає `\s`?

Whitespace character.

---

### 11. Для чого `g`?

Global matching.

---

### 12. Для чого `i`?

Case-insensitive matching.

---

### 13. Для чого `u`?

Unicode-aware behavior.

---

### 14. Для чого `[]`?

Character class.

---

### 15. Для чого `()`?

Grouping і capturing.

---

### 16. Що таке capturing group?

Група, значення якої можна отримати з результату Regex.

---

### 17. Що таке lookahead?

Перевірка умови в певній позиції без включення перевіреної частини в основний match.

---

### 18. Чим `.*` відрізняється від `.*?`?

`.*` — greedy.

`.*?` — lazy.

---

### 19. Чому `/\d{3}/` може знайти match у `"abc123xyz"`?

Тому що Regex не вимагає збігу всього рядка.

Для повної validation:

    /^\d{3}$/

---

### 20. Чи Regex може перевірити реальність дати?

Не сам по собі.

Regex може перевірити формат:

    /^\d{4}-\d{2}-\d{2}$/

А календарну правильність потрібно перевіряти додатковою логікою.

---

# 85. Learning Path

## 🟢 Core — Junior

Обов'язково знати:

    /pattern/

    ^

    $

    .

    []

    [^]

    [a-z]

    [0-9]

    \d

    \w

    \s

    *

    +

    ?

    {n}

    {n,}

    {n,m}

    |

    ()

    \

    g

    i

Вміти написати Regex для:

- digits
- username
- simple email
- phone
- date format
- slug
- search
- replacement

---

## 🟡 Strong Junior

Додатково:

    (?:...)

    \b

    \B

    lookahead

    named groups

    backreferences

    greedy / lazy

    m

    s

    u

Вміти:

- витягувати структуровані дані;
- комбінувати Regex із `matchAll()`;
- створювати validation functions;
- розуміти flags;
- читати складніші Regex.

---

## 🟠 Middle

Розуміти:

- Unicode property escapes;
- advanced groups;
- lookahead / negative lookahead;
- backreferences;
- performance;
- backtracking;
- ReDoS risks;
- Regex design;
- межі застосування Regex.

---

## 🔴 Senior

Не означає:

> писати максимально складні Regex.

Скоріше:

> знати, коли Regex — правильний інструмент, а коли краще використати parser, звичайний JavaScript або спеціалізовану бібліотеку.

---

# 86. Mini Cheat Sheet

## Створення

    /hello/

    new RegExp("hello")

## Anchors

    ^       початок

    $       кінець

## Character classes

    [abc]       a або b або c

    [a-z]       lowercase

    [A-Z]       uppercase

    [0-9]       digit

    [^0-9]      не digit

## Shorthand

    \d          digit

    \D          not digit

    \w          word character

    \W          not word character

    \s          whitespace

    \S          not whitespace

## Quantifiers

    *           0+

    +           1+

    ?           0–1

    {3}         рівно 3

    {3,}        3+

    {3,5}       3–5

## Groups

    (abc)       capturing group

    (?:abc)     non-capturing group

    (?<name>...) named group

## OR

    cat|dog

## Boundary

    \b

## Flags

    g           global

    i           case-insensitive

    m           multiline

    s           dotAll

    u           Unicode

## Escape

    \.

    \+

    \?

    \$

    \*

---

# 87. Найважливіші Regex-шаблони

### Тільки цифри

    /^\d+$/

### Точно 4 цифри

    /^\d{4}$/

### Від 4 до 8 цифр

    /^\d{4,8}$/

### Тільки латинські літери

    /^[A-Za-z]+$/

### Username

    /^[A-Za-z0-9_]{3,16}$/

### Basic email

    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

### Український номер у форматі +380...

    /^\+380\d{9}$/

### Дата YYYY-MM-DD

    /^\d{4}-\d{2}-\d{2}$/

### Час HH:MM

    /^(?:[01]\d|2[0-3]):[0-5]\d$/

### Slug

    /^[a-z0-9]+(?:-[a-z0-9]+)*$/

### Hashtag

    /#[A-Za-z0-9_]+/g

### Mention

    /@[A-Za-z0-9_]+/g

### Усі числа

    /\d+/g

### Прибрати всі нецифрові символи

    text.replace(/\D/g, "")

### Стиснути whitespace

    text.replace(/\s+/g, " ")

---

# 88. Regex у твоєму JavaScript-курсі

Логічний зв'язок тем:

    03-strings-and-regex
    │
    ├── 01-string-basics
    │
    ├── 02-string-properties-and-access
    │
    ├── 03-search-and-check
    │
    ├── 04-slice-substring-substr
    │
    ├── 05-case-and-whitespace
    │
    ├── 06-replace-and-replaceAll
    │
    ├── 07-split-and-join
    │
    ├── 08-template-literals
    │
    ├── 09-string-padding-and-repeat
    │
    ├── 10-regex-basics
    │
    ├── 11-regex-methods
    │
    ├── 12-regex-patterns
    │
    └── 13-string-project

### Логіка навчання

    String
       ↓
    Search
       ↓
    Replace
       ↓
    Split / Join
       ↓
    Regex basics
       ↓
    Regex methods
       ↓
    Regex patterns
       ↓
    String project

Тобто зараз ти переходиш від:

> "Я знаю методи Regex"

до:

> "Я можу сам побудувати Regex для конкретної задачі."

---

# 89. Що потрібно реально запам'ятати

Не потрібно намагатися запам'ятати сотні Regex.

Потрібно добре розуміти **будівельні блоки**:

    ^  $

    []

    ()

    |

    \d  \w  \s

    *

    +

    ?

    {n}

    {n,m}

    \b

    g

    i

    u

І вміти комбінувати їх.

Наприклад:

    /^\d{4}$/

читається як:

> від початку до кінця — рівно чотири цифри.

А:

    /^[A-Za-z0-9_]{3,16}$/

як:

> від початку до кінця — від 3 до 16 дозволених символів.

---

# 90. Головна ідея

Regex краще сприймати не як набір магічних символів, а як **конструктор**:

    character
        ↓
    character class
        ↓
    quantifier
        ↓
    group
        ↓
    alternation
        ↓
    anchor
        ↓
    flags

Наприклад:

    /^[A-Za-z0-9_]{3,16}$/

це не "страшний Regex".

Це:

    ^

початок

    [A-Za-z0-9_]

дозволені символи

    {3,16}

кількість

    $

кінець

---

# 91. Головні висновки

1. **Regex — це шаблон, а не просто пошук тексту.**
2. `^` і `$` дуже важливі для validation.
3. `[]` задає допустимі символи.
4. `()` створює групу.
5. `|` означає OR.
6. `*`, `+`, `?`, `{}` керують кількістю повторень.
7. `\d`, `\w`, `\s` — shorthand character classes.
8. `\b` працює з межами слів.
9. `g`, `i`, `m`, `s`, `u` змінюють поведінку Regex.
10. Capturing groups дозволяють витягувати частини тексту.
11. Lookaheads дозволяють задавати додаткові умови.
12. Greedy і lazy matching дають контроль над кількістю захопленого тексту.
13. Regex добре підходить для **формату**, але не для всієї бізнес-логіки.
14. Складний Regex потрібно будувати поступово.
15. Хороший програміст не той, хто пише найдовший Regex, а той, хто пише **достатньо простий Regex для конкретної задачі**.

> **Regex Patterns = навчитися бачити текст як структуру та описувати цю структуру формальним шаблоном.**