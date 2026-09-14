# 02. String Properties and Access

String properties and access — це базові способи отримання інформації про рядок та доступу до окремих його символів.

Основні можливості:

    length
    []
    at()
    charAt()
    charCodeAt()
    codePointAt()

На Core-рівні найважливіше добре знати:

    length
    index
    text[index]
    text.at(index)

Пізніше, при роботі з Unicode, важливо розуміти різницю між:

    UTF-16 code unit
    Unicode code point
    visible character / grapheme

---

### Ключові поняття

✔ string property  
✔ string access  
✔ `length`  
✔ index  
✔ zero-based indexing  
✔ first character  
✔ last character  
✔ character access  
✔ bracket notation  
✔ `[]`  
✔ `at()`  
✔ `charAt()`  
✔ `charCodeAt()`  
✔ `codePointAt()`  
✔ UTF-16  
✔ UTF-16 code unit  
✔ Unicode code point  
✔ surrogate pair  
✔ grapheme  
✔ negative index  
✔ out-of-range index  
✔ immutable string  
✔ iteration  
✔ `for...of`  
✔ `String.fromCharCode()`  
✔ `String.fromCodePoint()`  

---

# Що потрібно пам'ятати

• String має властивість:

    length

• `length` повертає кількість UTF-16 code units.

• Індекси рядка починаються з:

    0

• Для доступу до символу можна використовувати:

    text[index]

• Сучасний спосіб доступу:

    text.at(index)

• `at()` підтримує negative indexes:

    text.at(-1)

означає останній елемент.

• `text[-1]` не означає останній символ.

• `charAt()` також дозволяє отримати символ за index.

• `charCodeAt()` повертає UTF-16 code unit value.

• `codePointAt()` працює з Unicode code points.

• `length`, `charAt()`, `charCodeAt()` та `codePointAt()` потрібно розглядати з урахуванням UTF-16.

• Для звичайного тексту:

    text[index]

часто достатньо.

• Для Unicode-aware роботи потрібно розуміти:

    code unit
    code point
    grapheme

• String є immutable.

---

# String Property

Property — це значення, пов'язане з об'єктом або значенням, до якого можна звернутися через property access.

Для string основна властивість:

    length

Наприклад:

    const word = "Hello";

    console.log(word.length);

Результат:

    5

---

# length

`length` — основна властивість string.

    const text = "JavaScript";

    console.log(text.length);

Результат:

    10

---

### length не є method

Важливо розрізняти:

    text.length

та:

    text.length()

Правильно:

    text.length

Неправильно:

    text.length()

`length` — property, а не function/method.

---

# length для Empty String

    const text = "";

    console.log(text.length);

Результат:

    0

---

# length та пробіли

Пробіли входять до довжини.

    const text = " Hello ";

    console.log(text.length);

Результат:

    7

Структура:

    " Hello "
     ↑     ↑
    space space

---

# length та Newline

Newline також є частиною string.

    const text = "Hello\nWorld";

    console.log(text.length);

`\n` представлений одним UTF-16 code unit.

---

# length та Emoji

Не кожен видимий символ займає один UTF-16 code unit.

Наприклад:

    const emoji = "🙂";

    console.log(emoji.length);

Результат:

    2

Тому:

    string.length

не завжди означає:

    кількість видимих символів

Правильніше:

    length
    → кількість UTF-16 code units

---

# Index

Index — числова позиція елемента в string.

JavaScript використовує zero-based indexing.

Наприклад:

    const word = "Hello";

    H e l l o
    0 1 2 3 4

---

# Zero-Based Indexing

Перший index:

    0

Другий:

    1

Третій:

    2

Останній для `"Hello"`:

    4

Тому:

    word.length
    // 5

але:

    last index
    // 4

Загальна формула:

    last index = length - 1

---

# Character Access

Для доступу до символу можна використовувати square brackets.

    const word = "Hello";

    console.log(word[0]);

Результат:

    H

---

### Інші приклади

    const word = "JavaScript";

    console.log(word[0]);
    // J

    console.log(word[1]);
    // a

    console.log(word[4]);
    // S

---

# Access by Index

    const word = "Hello";

    word[0]
    // "H"

    word[1]
    // "e"

    word[2]
    // "l"

    word[3]
    // "l"

    word[4]
    // "o"

---

# First Character

Перший символ:

    const word = "Hello";

    const first = word[0];

Результат:

    "H"

---

# Last Character

Останній символ класичним способом:

    const word = "Hello";

    const last = word[word.length - 1];

Результат:

    "o"

---

# Last Character через at()

Сучасний та зручний варіант:

    const word = "Hello";

    const last = word.at(-1);

Результат:

    "o"

`-1` означає:

    останній елемент

---

# Negative Index

Метод `at()` підтримує negative indexes.

Наприклад:

    const word = "Hello";

    word.at(-1);
    // "o"

    word.at(-2);
    // "l"

    word.at(-3);
    // "l"

Логіка:

    -1 → last
    -2 → second from end
    -3 → third from end

---

# [] не підтримує Negative Index

Наприклад:

    const word = "Hello";

    console.log(word[-1]);

Результат:

    undefined

Тому:

    word[-1]

не означає:

    останній символ

Для цього:

    word.at(-1)

---

# [] vs at()

Порівняння:

    const word = "Hello";

    word[0];
    // "H"

    word.at(0);
    // "H"

Для останнього:

    word[word.length - 1];
    // "o"

    word.at(-1);
    // "o"

Отже:

    []     → index
    at()   → index + negative index support

---

# Out-of-Range Index

Якщо index виходить за межі string:

    const word = "Hello";

    console.log(word[10]);

Результат:

    undefined

---

### at() за межами

    const word = "Hello";

    console.log(word.at(10));

Результат:

    undefined

Також:

    word.at(-10);

поверне:

    undefined

---

# Index Range

Для:

    const word = "Hello";

маємо:

    length = 5

Допустимі позитивні indexes:

    0
    1
    2
    3
    4

Index:

    5

вже поза межами.

---

# String Index та length

Типовий цикл:

    const word = "Hello";

    for (let i = 0; i < word.length; i++) {
        console.log(word[i]);
    }

Результат:

    H
    e
    l
    l
    o

Умова:

    i < word.length

є важливою.

Не:

    i <= word.length

---

# Off-by-One Error

Помилка:

    const word = "Hello";

    for (let i = 0; i <= word.length; i++) {
        console.log(word[i]);
    }

На останній ітерації:

    word[5]

поверне:

    undefined

Правильно:

    for (let i = 0; i < word.length; i++) {
        console.log(word[i]);
    }

---

# charAt()

`charAt(index)` повертає символ за вказаним index.

Наприклад:

    const word = "Hello";

    console.log(word.charAt(0));

Результат:

    H

---

### Приклади

    const word = "JavaScript";

    word.charAt(0);
    // "J"

    word.charAt(1);
    // "a"

    word.charAt(4);
    // "S"

---

# [] vs charAt()

Порівняємо:

    const word = "Hello";

    word[0];
    // "H"

    word.charAt(0);
    // "H"

Для більшості сучасного коду:

    word[index]

є коротшим і дуже поширеним.

`charAt()` залишається стандартним методом JavaScript і може бути корисним для сумісності та явного API.

---

# charAt() та Out-of-Range

Цікава відмінність:

    const word = "Hello";

    word[10];
    // undefined

    word.charAt(10);
    // ""

Тобто:

    [] → undefined

а:

    charAt() → empty string

Це важлива відмінність.

---

# charAt() та Negative Index

`charAt()` не підтримує negative index як "відлік від кінця".

    const word = "Hello";

    word.charAt(-1);

Результат:

    ""

Для останнього символу використовуй:

    word.at(-1)

---

# charCodeAt()

`charCodeAt(index)` повертає UTF-16 code unit value за заданим index.

Наприклад:

    const word = "ABC";

    console.log(word.charCodeAt(0));

Результат:

    65

Тому що:

    "A"
    → UTF-16 code unit 65

---

### Приклади

    "A".charCodeAt(0);
    // 65

    "B".charCodeAt(0);
    // 66

    "C".charCodeAt(0);
    // 67

---

# charCodeAt() та ASCII

Для базових Latin characters значення збігаються з ASCII code.

Наприклад:

    "A".charCodeAt(0);
    // 65

    "a".charCodeAt(0);
    // 97

    "0".charCodeAt(0);
    // 48

Але JavaScript працює не просто з ASCII — string використовує Unicode / UTF-16.

---

# charCodeAt() та Unicode

`charCodeAt()` повертає саме UTF-16 code unit.

Наприклад, для символів, які представлені одним code unit, це безпосередньо відповідає їх Unicode code point.

Для символів за межами Basic Multilingual Plane можуть виникати surrogate pairs.

Наприклад:

    const emoji = "🙂";

    console.log(emoji.length);
    // 2

    console.log(emoji.charCodeAt(0));
    // high surrogate

    console.log(emoji.charCodeAt(1));
    // low surrogate

Точні числові значення тут менш важливі, ніж принцип:

    charCodeAt()
    → UTF-16 code unit

---

# codePointAt()

`codePointAt(index)` повертає Unicode code point, починаючи з указаного index.

Для простих символів:

    const text = "A";

    text.codePointAt(0);
    // 65

Але перевага проявляється з Unicode symbols, які представлені surrogate pair.

Наприклад:

    const emoji = "🙂";

    console.log(emoji.codePointAt(0));

Результат:

    128578

---

# charCodeAt() vs codePointAt()

Це важлива відмінність.

    charCodeAt()
    → UTF-16 code unit

    codePointAt()
    → Unicode code point

Наприклад:

    const emoji = "🙂";

    emoji.length;
    // 2

    emoji.charCodeAt(0);
    // high surrogate code unit

    emoji.codePointAt(0);
    // 128578

Тобто `codePointAt()` краще підходить, коли потрібно працювати саме з Unicode code points.

---

# Unicode Code Point

Unicode code point — числове значення, яке ідентифікує Unicode character / code point.

Наприклад:

    "A"
    → U+0041

    "a"
    → U+0061

    "🙂"
    → U+1F642

JavaScript дозволяє отримувати code point:

    "🙂".codePointAt(0);

---

# UTF-16 Code Unit

JavaScript string працює з UTF-16 code units.

Для багатьох символів:

    1 character
    ↓
    1 code unit

Але деякі Unicode characters потребують:

    2 code units

Таку пару називають:

    surrogate pair

---

# Surrogate Pair

Surrogate pair — два UTF-16 code units, які разом представляють Unicode code point за межами Basic Multilingual Plane.

Наприклад:

    const emoji = "🙂";

    emoji.length;
    // 2

Але Unicode code point один:

    emoji.codePointAt(0);
    // 128578

Це одна з причин, чому:

    length

не завжди дорівнює кількості Unicode code points.

---

# Grapheme

Grapheme — одиниця тексту, яку користувач сприймає як один символ.

Вона може складатися з одного або декількох Unicode code points.

Наприклад, деякі emoji та символи з combining marks можуть містити кілька code points, але відображатися як один видимий символ.

Тому існують різні поняття:

    UTF-16 code unit
    Unicode code point
    grapheme cluster

Вони не завжди мають однакову кількість.

---

# Важлива модель Unicode

У спрощеному вигляді:

    JavaScript string
          ↓
    UTF-16 code units
          ↓
    Unicode code points
          ↓
    grapheme clusters
          ↓
    visible text

Тому:

    length

не можна автоматично трактувати як:

    кількість видимих символів.

---

# for...of та Unicode

Цікавий момент:

`for...of` перебирає string з урахуванням Unicode code points.

Наприклад:

    const emoji = "🙂";

    for (const char of emoji) {
        console.log(char);
    }

Результат:

    🙂

Тоді як:

    emoji.length

дорівнює:

    2

Це важлива відмінність.

---

# [] та Unicode

При роботі з surrogate pair доступ через `[]` працює на рівні UTF-16 code units.

Наприклад:

    const emoji = "🙂";

    console.log(emoji.length);
    // 2

    console.log(emoji[0]);
    // перша частина surrogate pair

    console.log(emoji[1]);
    // друга частина surrogate pair

Тому для Unicode-aware iteration краще використовувати:

    for...of

або відповідні Unicode-aware API.

---

# at() та Unicode

`at()` також працює на рівні string positions, які базуються на UTF-16 code units.

Тому:

    const emoji = "🙂";

    emoji.at(0)

не слід сприймати як універсальний спосіб отримання одного Unicode code point або grapheme.

Для простого ASCII-тексту це зазвичай не має значення.

---

# String.fromCharCode()

`String.fromCharCode()` створює string із UTF-16 code units.

Наприклад:

    const char = String.fromCharCode(65);

    console.log(char);

Результат:

    A

Тому:

    65
    ↓
    "A"

---

### Ще приклад

    String.fromCharCode(65, 66, 67);

Результат:

    "ABC"

---

# String.fromCodePoint()

`String.fromCodePoint()` створює string із Unicode code points.

Наприклад:

    const char = String.fromCodePoint(65);

    console.log(char);

Результат:

    A

Для emoji:

    const emoji = String.fromCodePoint(128578);

    console.log(emoji);

Результат:

    🙂

---

# fromCharCode() vs fromCodePoint()

Важлива пара:

    charCodeAt()
        ↕
    String.fromCharCode()

і:

    codePointAt()
        ↕
    String.fromCodePoint()

Спрощено:

    charCodeAt()
    → UTF-16 code unit

    fromCharCode()
    → створює string з UTF-16 code units

та:

    codePointAt()
    → Unicode code point

    fromCodePoint()
    → створює string з Unicode code points

---

# Property Access

JavaScript дозволяє звертатися до string через:

    dot notation

наприклад:

    text.length

та:

    bracket notation

наприклад:

    text[index]

---

# Dot Notation

Для property:

    const word = "Hello";

    console.log(word.length);

Результат:

    5

---

# Bracket Notation

Для index:

    const word = "Hello";

    console.log(word[0]);

Результат:

    H

---

# Dynamic Index

Brackets особливо зручні, коли index зберігається у змінній.

    const word = "Hello";

    const index = 2;

    console.log(word[index]);

Результат:

    l

---

### Dynamic Access

    const word = "JavaScript";

    let index = 0;

    console.log(word[index]);

    index++;

    console.log(word[index]);

Результат:

    J
    a

---

# Access через Variable

    const word = "Hello";

    const firstIndex = 0;
    const lastIndex = word.length - 1;

    console.log(word[firstIndex]);
    console.log(word[lastIndex]);

Результат:

    H
    o

---

# Check Character

Можна перевіряти конкретний символ.

    const word = "Hello";

    if (word[0] === "H") {
        console.log("Starts with H");
    }

---

# Access у Loop

Класичний цикл:

    const word = "Hello";

    for (let i = 0; i < word.length; i++) {
        console.log(word[i]);
    }

---

# Reverse Access

Можна проходити string справа наліво.

    const word = "Hello";

    for (let i = word.length - 1; i >= 0; i--) {
        console.log(word[i]);
    }

Результат:

    o
    l
    l
    e
    H

---

# Access та Immutability

Доступ до символу не означає можливість його змінити.

    let word = "Hello";

    console.log(word[0]);
    // H

Але:

    word[0] = "Y";

не змінить:

    "Hello"

String remains immutable.

---

# String Access та Assignment

Наприклад:

    const word = "Hello";

Не можна зробити:

    word[0] = "Y";

Щоб отримати:

    "Yello"

потрібно створити новий string.

Наприклад:

    const newWord = "Y" + word.slice(1);

---

# Access Empty String

    const text = "";

    console.log(text[0]);

Результат:

    undefined

Також:

    text.at(0);
    // undefined

і:

    text.charAt(0);
    // ""

---

# String Access API

Основні способи:

    text[index]

    text.at(index)

    text.charAt(index)

    text.charCodeAt(index)

    text.codePointAt(index)

---

# Коли що використовувати?

## `text[index]`

Використовуй для простого доступу до позиції.

    const word = "Hello";

    word[0];

---

## `text.at(index)`

Використовуй, коли потрібен:

    positive index

або:

    negative index

Наприклад:

    word.at(-1);

---

## `text.charAt(index)`

Класичний API для отримання символу.

    word.charAt(0);

Особливо важливо знати різницю поведінки при out-of-range:

    word[100]
    // undefined

    word.charAt(100)
    // ""

---

## `text.charCodeAt(index)`

Використовуй, коли потрібно отримати:

    UTF-16 code unit

---

## `text.codePointAt(index)`

Використовуй, коли потрібно отримати:

    Unicode code point

---

# Практичні приклади

## Приклад 1 — length

    const word = "JavaScript";

    console.log(word.length);

Результат:

    10

---

## Приклад 2 — first character

    const word = "JavaScript";

    console.log(word[0]);

Результат:

    J

---

## Приклад 3 — last character

    const word = "JavaScript";

    console.log(word[word.length - 1]);

Результат:

    t

---

## Приклад 4 — last character через at()

    const word = "JavaScript";

    console.log(word.at(-1));

Результат:

    t

---

## Приклад 5 — character by dynamic index

    const word = "JavaScript";

    const index = 4;

    console.log(word[index]);

Результат:

    S

---

## Приклад 6 — out-of-range

    const word = "Hello";

    console.log(word[100]);

Результат:

    undefined

---

## Приклад 7 — charAt()

    const word = "Hello";

    console.log(word.charAt(1));

Результат:

    e

---

## Приклад 8 — charAt() out-of-range

    const word = "Hello";

    console.log(word.charAt(100));

Результат:

    ""

---

## Приклад 9 — charCodeAt()

    const char = "A";

    console.log(char.charCodeAt(0));

Результат:

    65

---

## Приклад 10 — codePointAt()

    const emoji = "🙂";

    console.log(emoji.codePointAt(0));

Результат:

    128578

---

## Приклад 11 — fromCharCode()

    const char = String.fromCharCode(65);

    console.log(char);

Результат:

    A

---

## Приклад 12 — fromCodePoint()

    const emoji = String.fromCodePoint(128578);

    console.log(emoji);

Результат:

    🙂

---

## Приклад 13 — loop through string

    const word = "Hello";

    for (let i = 0; i < word.length; i++) {
        console.log(word[i]);
    }

---

## Приклад 14 — reverse loop

    const word = "Hello";

    for (let i = word.length - 1; i >= 0; i--) {
        console.log(word[i]);
    }

Результат:

    o
    l
    l
    e
    H

---

## Приклад 15 — find first character

    const word = "JavaScript";

    const first = word[0];

    console.log(first);

Результат:

    J

---

## Приклад 16 — check first character

    const word = "JavaScript";

    if (word[0] === "J") {
        console.log("Starts with J");
    }

---

## Приклад 17 — check last character

    const word = "JavaScript";

    if (word.at(-1) === "t") {
        console.log("Ends with t");
    }

---

## Приклад 18 — compare positions

    const word = "Hello";

    console.log(word[0] === word[4]);

Результат:

    false

---

# Практичні патерни

## Отримати довжину

    const length = text.length;

---

## Отримати перший символ

    const first = text[0];

---

## Отримати останній символ

    const last = text[text.length - 1];

або:

    const last = text.at(-1);

---

## Отримати символ за index

    const char = text[index];

---

## Перевірити, чи index існує

    if (index >= 0 && index < text.length) {
        console.log(text[index]);
    }

---

## Пройти string через index

    for (let i = 0; i < text.length; i++) {
        console.log(text[i]);
    }

---

## Пройти string справа наліво

    for (let i = text.length - 1; i >= 0; i--) {
        console.log(text[i]);
    }

---

## Отримати Unicode code point

    const codePoint = text.codePointAt(index);

---

## Створити символ з code point

    const char = String.fromCodePoint(codePoint);

---

# Типові помилки

❌ Плутати `length` з останнім index.

    const text = "Hello";

    text.length
    // 5

але:

    text[text.length - 1]
    // "o"

---

❌ Використовувати `text[text.length]` для останнього символу.

    text[text.length]
    // undefined

Правильно:

    text[text.length - 1]

або:

    text.at(-1)

---

❌ Використовувати `text[-1]`.

    text[-1]
    // undefined

Правильно:

    text.at(-1)

---

❌ Використовувати `<=` замість `<` у циклі.

Неправильно:

    for (let i = 0; i <= text.length; i++) {
        console.log(text[i]);
    }

Правильно:

    for (let i = 0; i < text.length; i++) {
        console.log(text[i]);
    }

---

❌ Очікувати, що `charAt()` повертає `undefined` за межами string.

    text.charAt(100)
    // ""

Тоді як:

    text[100]
    // undefined

---

❌ Вважати, що `charAt(-1)` повертає останній символ.

    text.charAt(-1)
    // ""

Для цього:

    text.at(-1)

---

❌ Плутати `charCodeAt()` та `codePointAt()`.

    charCodeAt()
    → UTF-16 code unit

    codePointAt()
    → Unicode code point

---

❌ Вважати, що `length` завжди дорівнює кількості видимих символів.

Наприклад:

    "🙂".length
    // 2

---

❌ Намагатися змінити string через index.

    let text = "Hello";

    text[0] = "Y";

String immutable.

---

❌ Вважати, що `[]` завжди повертає повноцінний Unicode character.

Для деяких Unicode symbols один index відповідає лише одному UTF-16 code unit.

---

# Важливі відмінності

## length vs last index

    text.length
    → кількість UTF-16 code units

    text.length - 1
    → останній index у string

---

## [] vs at()

    text[0]
    → доступ за index

    text.at(0)
    → доступ за index

    text.at(-1)
    → останній елемент

    text[-1]
    → undefined

---

## [] vs charAt()

    text[100]
    → undefined

    text.charAt(100)
    → ""

---

## charAt() vs at()

    text.charAt(0)
    → символ

    text.at(0)
    → символ

Але:

    text.charAt(-1)
    → ""

    text.at(-1)
    → останній символ

---

## charCodeAt() vs codePointAt()

    charCodeAt()
    → UTF-16 code unit

    codePointAt()
    → Unicode code point

---

## fromCharCode() vs fromCodePoint()

    String.fromCharCode()
    → UTF-16 code units

    String.fromCodePoint()
    → Unicode code points

---

# String Access та Unicode

Для звичайного ASCII-подібного тексту:

    const word = "Hello";

можна просто використовувати:

    word[0]
    word[1]
    word[2]

Для складного Unicode:

    const text = "🙂";

потрібно пам'ятати:

    text.length
    // 2

але:

    for (const char of text) {
        ...
    }

дає один Unicode code point:

    🙂

Тому для Unicode-aware iteration:

    for...of

часто кращий, ніж:

    for (let i = 0; i < text.length; i++) {
        ...
    }

---

# String Iteration

String є iterable.

Тому:

    const word = "Hello";

    for (const char of word) {
        console.log(char);
    }

Результат:

    H
    e
    l
    l
    o

---

# Index Loop vs for...of

Через index:

    const word = "Hello";

    for (let i = 0; i < word.length; i++) {
        console.log(word[i]);
    }

Через `for...of`:

    const word = "Hello";

    for (const char of word) {
        console.log(char);
    }

Для простого перебору значень `for...of` часто читабельніший.

Якщо потрібен index:

    for (let i = 0; i < word.length; i++) {
        console.log(i, word[i]);
    }

або можна розглянути інші iteration patterns.

---

# Access та Validation

String access часто використовується при validation.

Наприклад:

    const username = "Valeriy";

    if (username.length < 3) {
        console.log("Too short");
    }

---

### Перевірка першого символу

    const username = "Valeriy";

    if (username[0] === "V") {
        console.log("Starts with V");
    }

---

### Перевірка останнього символу

    const filename = "photo.jpg";

    if (filename.at(-1) === "g") {
        console.log("Ends with g");
    }

Для реальної перевірки розширення краще використовувати string methods, які будуть розглянуті пізніше.

---

# Access та Algorithms

Доступ до символів є основою багатьох алгоритмів роботи з текстом.

Наприклад:

    const word = "level";

    console.log(word[0]);
    // l

    console.log(word.at(-1));
    // l

Порівняння першого та останнього символу може бути частиною алгоритму перевірки palindrome.

---

# Palindrome — базовий приклад

Palindrome — слово, яке читається однаково зліва направо та справа наліво.

Наприклад:

    "level"

Можна почати перевірку:

    const word = "level";

    const first = word[0];
    const last = word.at(-1);

    console.log(first === last);

Результат:

    true

Повна перевірка потребує проходження по всіх необхідних позиціях.

---

# String Access у Full Stack

Робота з string properties та access постійно зустрічається у full-stack JavaScript.

Наприклад:

    username
    email
    password
    URL
    file name
    search query
    API response
    database field
    form input

Типовий flow:

    user input
        ↓
    string
        ↓
    length
        ↓
    access
        ↓
    validation
        ↓
    transformation
        ↓
    backend
        ↓
    database

Тому знання базового string API потрібне не тільки для алгоритмів, але й для React / Next.js / Node.js / NestJS.

---

# Питання зі співбесіди

Що таке string property?

Яка основна властивість string?

Що повертає:

    text.length

?

Чим property відрізняється від method?

Чому:

    text.length()

є помилкою?

З якого index починається string?

Що таке zero-based indexing?

Як отримати перший символ?

Як отримати останній символ?

Чому:

    text[text.length]

не повертає останній символ?

Як отримати останній символ через `at()`?

Що робить:

    text.at(-1)

?

Чи працює:

    text[-1]

?

Яка різниця між:

    text[index]

та:

    text.at(index)

?

Що повертає `text[index]`, якщо index не існує?

Що повертає `charAt()` за межами string?

Яка різниця між:

    text[100]

і:

    text.charAt(100)

?

Чи підтримує `charAt()` negative indexes?

Що робить `charCodeAt()`?

Що саме повертає `charCodeAt()`?

Що робить `codePointAt()`?

Яка різниця між:

    charCodeAt()

і:

    codePointAt()

?

Що таке UTF-16 code unit?

Що таке Unicode code point?

Що таке surrogate pair?

Чому:

    "🙂".length

дорівнює `2`?

Чи дорівнює `length` кількості видимих символів?

Що таке grapheme?

Чому `[]` не завжди дає один повноцінний Unicode character?

Чим `for...of` відрізняється від index-based iteration для Unicode?

Для чого використовується:

    String.fromCharCode()

?

Для чого використовується:

    String.fromCodePoint()

?

Яка різниця між:

    fromCharCode()

та:

    fromCodePoint()

?

Чи можна змінити символ string через index?

Що таке string immutability?

Як пройти string через index?

Як пройти string у зворотному напрямку?

Як перевірити перший символ?

Як перевірити останній символ?

Як уникнути off-by-one error при проходженні string?

---

# Шлях

## 🟢 Core — обов'язково знати

String properties.

`length`.

Zero-based indexing.

Index.

Character access.

    text[index]

First character.

Last character.

    text[text.length - 1]

    text.at(-1)

Out-of-range access.

    undefined

Основи:

    at()

Основи:

    charAt()

String immutability.

Loop through string.

    for
    for...of

Розуміння:

    length
    index
    last index

---

## 🔵 Junior

Впевнено використовувати:

    length
    []
    at()
    charAt()

Розуміти:

    positive index
    negative index
    out-of-range index

Розуміти:

    charCodeAt()

Основи:

    codePointAt()

Основи:

    UTF-16
    code unit
    Unicode code point

Розуміти різницю:

    []
    at()
    charAt()

Розуміти різницю:

    charCodeAt()
    codePointAt()

Використовувати string access у:

    loops
    validation
    algorithms
    form processing
    API data processing

---

## 🟠 Middle

Глибоке розуміння:

    UTF-16

    code units

    Unicode code points

    surrogate pairs

    grapheme clusters

Розуміння:

    String.fromCharCode()

    String.fromCodePoint()

Unicode-aware iteration.

Unicode-aware string processing.

Розуміння відмінностей між:

    index
    code unit position
    code point position
    grapheme position

Робота з:

    Unicode normalization
    combining marks
    complex emoji

Розуміння:

    Intl.Segmenter

для segmentation тексту.

---

## 🔴 Senior

Глибоке розуміння ECMAScript String representation.

UTF-16 internals.

Unicode code points.

Surrogate pairs.

Well-formed Unicode strings.

Grapheme segmentation.

Unicode normalization.

String indexing semantics.

Unicode-aware algorithms.

Internationalized text processing.

`Intl.Segmenter`.

Performance considerations.

Memory representation.

String iteration internals.

Engine-level string representations.

Trade-offs між:

    code-unit iteration
    code-point iteration
    grapheme iteration

---

# Міні-шпаргалка

## length

    const text = "Hello";

    text.length;
    // 5

---

## Index

    H e l l o
    0 1 2 3 4

---

## First

    text[0]

---

## Last

    text[text.length - 1]

або:

    text.at(-1)

---

## Dynamic Index

    const index = 2;

    text[index];

---

## at()

    text.at(0)
    // first

    text.at(-1)
    // last

---

## charAt()

    text.charAt(0)

---

## Out of Range

    text[100]
    // undefined

    text.at(100)
    // undefined

    text.charAt(100)
    // ""

---

## charCodeAt()

    "A".charCodeAt(0);
    // 65

    → UTF-16 code unit

---

## codePointAt()

    "🙂".codePointAt(0);
    // 128578

    → Unicode code point

---

## fromCharCode()

    String.fromCharCode(65);
    // "A"

---

## fromCodePoint()

    String.fromCodePoint(128578);
    // "🙂"

---

## Loop

    for (let i = 0; i < text.length; i++) {
        console.log(text[i]);
    }

---

## for...of

    for (const char of text) {
        console.log(char);
    }

---

## Unicode

    "🙂".length
    // 2

    [..."🙂"].length
    // 1

---

## Main Difference

    [] 
    → UTF-16 code unit position

    at()
    → UTF-16 code unit position + negative indexes

    charAt()
    → UTF-16 code unit → string

    charCodeAt()
    → UTF-16 code unit → number

    codePointAt()
    → Unicode code point → number

---

# Основні правила

    text.length
    → кількість UTF-16 code units

    text[0]
    → доступ за index

    text.at(0)
    → доступ за index

    text.at(-1)
    → останній елемент

    text[-1]
    → не останній елемент

    text.charAt(0)
    → символ як string

    text.charCodeAt(0)
    → UTF-16 code unit

    text.codePointAt(0)
    → Unicode code point

    String.fromCharCode(...)
    → string з UTF-16 code units

    String.fromCodePoint(...)
    → string з Unicode code points

---

# Головне

• Основна property string:

    length

• `length` — це кількість UTF-16 code units.

• String використовує zero-based indexing.

• Перший index:

    0

• Останній index:

    length - 1

• Доступ за index:

    text[index]

• Сучасний спосіб доступу з підтримкою negative indexes:

    text.at(index)

• Для останнього елемента:

    text.at(-1)

• `text[-1]` не повертає останній символ.

• Якщо index не існує:

    text[index]
    → undefined

• `charAt()` за межами string повертає:

    ""

• `charCodeAt()` повертає:

    UTF-16 code unit

• `codePointAt()` повертає:

    Unicode code point

• Для простих Latin characters ці поняття часто збігаються за числовим значенням.

• Для деяких Unicode symbols один code point представлений двома UTF-16 code units.

• Це називається:

    surrogate pair

• Тому:

    string.length

не завжди дорівнює кількості Unicode characters.

• `for...of` перебирає string з урахуванням Unicode code points, тому для Unicode-aware iteration він часто кращий за простий index loop.

• String є immutable.

• Не можна змінити окремий символ:

    text[0] = "A";

• Для створення зміненого string потрібно створити нове значення.

• Основна модель доступу:

    string
       ↓
    length
       ↓
    index
       ↓
    text[index]
       ↓
    at()
       ↓
    charAt()
       ↓
    charCodeAt()
       ↓
    codePointAt()

• На Core-рівні потрібно впевнено знати:

    length
    index
    []
    at()
    charAt()
    string immutability

• На Junior-рівні потрібно розуміти:

    charCodeAt()
    codePointAt()
    UTF-16
    code unit
    Unicode code point
    surrogate pair

• Глибоке Unicode-питання можна відкласти до Middle-рівня:

    grapheme
    Unicode normalization
    Intl.Segmenter
    Unicode-aware algorithms

• Для повсякденної Full Stack JavaScript роботи найчастіше будуть потрібні:

    text.length
    text[index]
    text.at(-1)
    for...of

• Ця тема є фундаментом для наступних тем:

    search and check
    slice / substring / substr
    case and whitespace
    replace / replaceAll
    split / join
    template literals
    string padding and repeat
    regex basics
    regex methods
    regex patterns