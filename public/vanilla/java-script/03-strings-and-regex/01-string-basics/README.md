# 01. String Basics

String (рядок) — це примітивний тип даних JavaScript, який використовується для представлення тексту.

Рядки використовуються, коли потрібно працювати з:

- текстом;
- словами;
- реченнями;
- іменами;
- повідомленнями;
- URL;
- HTML-текстом;
- даними, отриманими від користувача;
- текстовими значеннями з API;
- текстовими даними з бази даних.

У JavaScript string є primitive value.

Приклади:

    "Hello"
    'Hello'
    `Hello`

---

### Ключові поняття

✔ string  
✔ string primitive  
✔ text  
✔ character  
✔ string literal  
✔ single quotes `' '`  
✔ double quotes `" "`  
✔ backticks `` ` ` ``  
✔ string length  
✔ index  
✔ zero-based indexing  
✔ character access  
✔ immutable  
✔ concatenation  
✔ escape character  
✔ escape sequence  
✔ Unicode  
✔ UTF-16  
✔ empty string  
✔ whitespace  
✔ multiline string  
✔ template literal  
✔ primitive value  
✔ String object  

---

# Що потрібно пам'ятати

• `string` — один із primitive data types JavaScript.

• Рядок можна створити за допомогою:

    'text'
    "text"
    `text`

• Найчастіше використовують один стиль лапок послідовно в межах проєкту.

• String має властивість:

    length

• Індекси символів починаються з:

    0

• Рядки в JavaScript є immutable.

• Це означає, що після створення конкретне string value не можна змінити без створення іншого string value.

• Рядки можна об'єднувати за допомогою:

    +

• Для складнішої вставки значень зручно використовувати template literals:

    `Hello, ${name}`

• String може містити спеціальні escape sequences:

    \n
    \t
    \"
    \'
    \\

• Порожній рядок:

    ""

має length:

    0

---

# String Primitive

String primitive — це примітивне текстове значення.

Наприклад:

    const name = "Valeriy";

Тут:

    "Valeriy"

є string primitive.

Перевірити тип можна через:

    typeof name;

Результат:

    "string"

---

# typeof string

Для рядка:

    const message = "Hello";

    console.log(typeof message);

Результат:

    "string"

---

### Інші приклади

    typeof "Hello";
    // "string"

    typeof "";
    // "string"

    typeof "123";
    // "string"

Важливо:

    "123"

це string, а:

    123

це number.

---

# String vs Number

Це різні типи даних.

    const a = "10";
    const b = 10;

    console.log(typeof a);
    // "string"

    console.log(typeof b);
    // "number"

Навіть якщо вони виводяться схоже:

    "10"
    10

це різні значення різних типів.

---

# String Literals

String literal — рядкове значення, записане безпосередньо в коді.

Приклади:

    "Hello"

    'Hello'

    `Hello`

Усі три створюють string value.

---

# Single Quotes

Одинарні лапки:

    const name = 'Valeriy';

---

# Double Quotes

Подвійні лапки:

    const name = "Valeriy";

---

# Backticks

Зворотні лапки:

    const name = `Valeriy`;

Backticks використовуються для template literals.

Вони дозволяють:

- вставляти expressions;
- створювати багаторядковий текст;
- зручно формувати динамічні рядки.

Наприклад:

    const name = "Valeriy";

    const message = `Hello, ${name}!`;

Результат:

    Hello, Valeriy!

---

# Які лапки використовувати?

JavaScript дозволяє:

    'text'
    "text"
    `text`

На практиці важливіше дотримуватися одного стилю в проєкті.

Наприклад:

    const firstName = "John";
    const lastName = "Smith";

або:

    const firstName = 'John';
    const lastName = 'Smith';

У реальному проєкті стиль часто контролюється ESLint / Prettier.

---

# Empty String

Empty string — порожній рядок.

    const message = "";

У ньому немає символів.

Перевірка:

    console.log(message.length);

Результат:

    0

Тип:

    console.log(typeof message);

Результат:

    "string"

Важливо:

    ""
    
це string, а не:

    null
    undefined

---

# String Length

Кожен string має властивість:

    length

Вона повертає кількість UTF-16 code units у рядку.

Приклад:

    const word = "Hello";

    console.log(word.length);

Результат:

    5

---

### Ще приклади

    "JavaScript".length;
    // 10

    "Hello world".length;
    // 11

    "".length;
    // 0

---

# length та пробіли

Пробіли також враховуються.

    const text = "Hello world";

    console.log(text.length);

Результат:

    11

Між:

    Hello
    world

є пробіл, і він є частиною string.

---

### Пробіл на початку

    const text = " Hello";

    console.log(text.length);

Довжина включає пробіл.

---

### Пробіл у кінці

    const text = "Hello ";

Пробіл також входить до:

    text.length

---

# Characters

Character — окремий символ рядка.

Наприклад:

    const word = "Hello";

Символи:

    H
    e
    l
    l
    o

Але важливо розуміти, що JavaScript не має окремого primitive типу `character`.

Окремий символ у JavaScript — це також string.

Наприклад:

    const char = "H";

    console.log(typeof char);

Результат:

    "string"

---

# Index

Index — позиція символу в рядку.

JavaScript використовує zero-based indexing.

Наприклад:

    const word = "Hello";

    H e l l o
    0 1 2 3 4

Перший символ має index:

    0

Другий:

    1

Останній:

    4

---

# Zero-Based Indexing

Індекси починаються з нуля.

    const word = "Hello";

    index:   0 1 2 3 4
    char:    H e l l o

Тому:

    word[0]
    // "H"

    word[1]
    // "e"

    word[4]
    // "o"

---

# Access Character

До символу можна звернутися через square brackets.

    const word = "Hello";

    console.log(word[0]);

Результат:

    H

---

### Приклади

    const word = "JavaScript";

    console.log(word[0]);
    // J

    console.log(word[1]);
    // a

    console.log(word[4]);
    // S

---

# Останній символ

Для отримання останнього символу часто використовують:

    const word = "Hello";

    console.log(word[word.length - 1]);

Результат:

    o

Чому:

    word.length
    // 5

Останній index:

    5 - 1
    // 4

Отже:

    word[4]
    // "o"

---

# First Character

Перший символ:

    const word = "JavaScript";

    const first = word[0];

---

# Last Character

Останній символ:

    const word = "JavaScript";

    const last = word[word.length - 1];

---

# Character Access через at()

Сучасний спосіб:

    const word = "Hello";

    console.log(word.at(0));
    // H

    console.log(word.at(-1));
    // o

`at()` особливо зручний для доступу до кінця рядка через від'ємний index.

Наприклад:

    word.at(-1)

означає:

    останній символ

---

# [] vs at()

Square brackets:

    word[0]

`at()`:

    word.at(0)

Для останнього символу:

    word[word.length - 1]

або:

    word.at(-1)

`at()` зручніший, коли потрібно використовувати negative index.

---

# Invalid Index

Якщо звернутися до index, якого не існує:

    const word = "Hello";

    console.log(word[10]);

Результат:

    undefined

Але:

    word.at(10)

також поверне:

    undefined

---

# Negative Index у []

Square brackets не підтримують negative index як позицію символу.

    const word = "Hello";

    console.log(word[-1]);

Результат:

    undefined

Для negative index використовують:

    word.at(-1);

Результат:

    "o"

---

# Strings are Immutable

String є immutable.

Це означає, що після створення string value його символи не можна змінити напряму.

Наприклад:

    let word = "Hello";

Спроба:

    word[0] = "Y";

не змінить string на:

    Yello

Рядок залишається:

    Hello

---

# Як змінити String

Оскільки string immutable, потрібно створити новий string.

Наприклад:

    let word = "Hello";

    word = "Yello";

Тут старе string value не змінюється.

Змінна:

    word

отримує інше string value.

---

### Ще один приклад

    const word = "hello";

Не можна змінити один символ напряму:

    word[0] = "H";

Замість цього можна створити новий рядок:

    const newWord = "H" + word.slice(1);

Результат:

    Hello

Методи роботи з рядками детальніше будуть розглянуті в наступних темах.

---

# String Concatenation

Concatenation — об'єднання рядків.

Найпростіший оператор:

    +

Наприклад:

    const firstName = "John";
    const lastName = "Smith";

    const fullName = firstName + " " + lastName;

Результат:

    "John Smith"

---

# Concatenation with +

Наприклад:

    const a = "Hello";
    const b = "World";

    const result = a + " " + b;

Результат:

    "Hello World"

---

# Concatenation та Numbers

Оператор `+` з string має особливу поведінку.

    const age = 25;

    const message = "Age: " + age;

Результат:

    "Age: 25"

Number був перетворений у string у процесі concatenation.

---

### Важливо

    "10" + 5

Результат:

    "105"

а не:

    15

Тому що один з operands є string.

---

# String Conversion

Значення можна явно перетворити на string за допомогою:

    String()

Наприклад:

    const number = 123;

    const text = String(number);

Тепер:

    typeof text

дасть:

    "string"

---

### Приклади

    String(123);
    // "123"

    String(true);
    // "true"

    String(false);
    // "false"

    String(null);
    // "null"

    String(undefined);
    // "undefined"

---

# String() vs toString()

Для багатьох значень можна використовувати:

    value.toString()

Наприклад:

    const number = 123;

    number.toString();
    // "123"

Але `String()` безпечніший для значень `null` та `undefined`.

Наприклад:

    String(null);
    // "null"

А:

    null.toString();

спричинить помилку.

На Core-рівні достатньо пам'ятати:

    String(value) → explicit conversion to string

---

# Escape Sequences

Escape sequence — спеціальна послідовність символів, яка дозволяє представити символи або спеціальні дії всередині string.

Основні:

    \n
    \t
    \'
    \"
    \\
    \`

---

# New Line

`\n` створює новий рядок.

    const message = "Hello\nWorld";

Результат:

    Hello
    World

---

# Tab

`\t` додає tab.

    const text = "Name:\tJohn";

Приблизний результат:

    Name:   John

---

# Single Quote Escape

Якщо string створений через одинарні лапки, одинарну лапку всередині можна екранувати:

    const text = 'It\'s JavaScript';

Результат:

    It's JavaScript

---

# Double Quote Escape

У double-quoted string можна екранувати подвійні лапки:

    const text = "He said: \"Hello\"";

Результат:

    He said: "Hello"

---

# Backslash

Щоб записати символ backslash:

    \\

Наприклад:

    const path = "C:\\Users\\Valeriy";

Результат:

    C:\Users\Valeriy

---

# Quotes всередині String

Не завжди потрібно використовувати escape.

Наприклад:

    const text = "It's JavaScript";

або:

    const text = 'He said "Hello"';

Різні типи лапок дозволяють уникнути зайвого escaping.

---

# Multiline Strings

Backticks дозволяють створювати багаторядкові strings.

    const message = `
    Hello
    World
    JavaScript
    `;

Рядок містить переноси рядків.

---

### Через \n

Багаторядковий текст також можна створити через:

    const message = "Hello\nWorld\nJavaScript";

---

# Unicode

JavaScript strings підтримують Unicode.

Це дозволяє працювати з текстом різних мов та символами.

Наприклад:

    const text = "Привіт";

    const text2 = "こんにちは";

    const text3 = "你好";

    const text4 = "🙂";

Рядок може містити Unicode characters.

---

# UTF-16

JavaScript strings концептуально представлені як послідовності UTF-16 code units.

На базовому рівні важливо знати:

    JavaScript string
        ↓
    UTF-16 code units

Через це `length` не завжди дорівнює кількості видимих символів.

Наприклад:

    const text = "🙂";

    console.log(text.length);

Результат:

    2

Це відбувається тому, що цей символ представлений двома UTF-16 code units.

Для звичайного тексту латиницею:

    "Hello".length
    // 5

і кількість code units збігається з кількістю символів.

---

# String та Emoji

Не всі Unicode symbols займають один UTF-16 code unit.

Наприклад:

    const emoji = "🙂";

    console.log(emoji.length);

Результат:

    2

Тому не слід завжди ототожнювати:

    string.length

з кількістю видимих Unicode characters.

На Core-рівні достатньо пам'ятати:

    length → кількість UTF-16 code units

---

# String Comparison

Strings можна порівнювати за допомогою:

    ===
    !==

Наприклад:

    "hello" === "hello";
    // true

    "hello" === "Hello";
    // false

JavaScript розрізняє регістр.

---

# Case Sensitivity

String comparison є case-sensitive.

Наприклад:

    "JavaScript" === "javascript";

Результат:

    false

Тому:

    "Hello"

і:

    "hello"

є різними strings.

---

# String Equality

Для перевірки однаковості strings зазвичай використовують:

    ===

Наприклад:

    const a = "Hello";
    const b = "Hello";

    console.log(a === b);

Результат:

    true

---

# String Inequality

Для перевірки нерівності:

    !==

Наприклад:

    const a = "Hello";
    const b = "hello";

    console.log(a !== b);

Результат:

    true

---

# Lexicographical Comparison

Strings можна порівнювати також через:

    >
    <
    >=
    <=

Наприклад:

    "b" > "a";
    // true

Порівняння відбувається на основі порядку Unicode code points.

Для повсякденної роботи важливо не плутати таке порівняння з локалізованим сортуванням тексту.

Для складнішого сортування використовують:

    localeCompare()

Це буде розглянуто пізніше.

---

# String as Primitive

String primitive відрізняється від String object.

Звичайний варіант:

    const text = "Hello";

це primitive string.

Не слід без необхідності створювати:

    const text = new String("Hello");

`new String()` створює object wrapper.

Для звичайної роботи використовують primitive strings.

---

# String Object

Можна створити:

    const text = new String("Hello");

Перевірка:

    typeof text;

Результат:

    "object"

Тоді як:

    typeof "Hello";

дає:

    "string"

---

### Рекомендація

Використовуй:

    const text = "Hello";

а не:

    const text = new String("Hello");

`String` object потрібен рідко.

---

# Primitive String та Methods

Хоча string є primitive, ми можемо викликати methods:

    const word = "Hello";

    console.log(word.toUpperCase());

Результат:

    HELLO

JavaScript автоматично створює тимчасовий wrapper object для доступу до властивостей і методів.

На практиці достатньо пам'ятати:

    primitive string → має доступ до string methods

---

# String Properties

Основна властивість string:

    length

Наприклад:

    const word = "JavaScript";

    console.log(word.length);

Результат:

    10

Методи будуть розглядатися в наступних темах.

---

# String Methods

String має багато корисних methods.

Основні групи:

### Search

    includes()
    startsWith()
    endsWith()
    indexOf()
    lastIndexOf()

### Extract

    slice()
    substring()
    substr()

### Transform

    toUpperCase()
    toLowerCase()
    replace()
    replaceAll()

### Split / Join

    split()

### Whitespace

    trim()
    trimStart()
    trimEnd()

### Padding

    padStart()
    padEnd()

### Repeat

    repeat()

Усі ці методи будуть розглянуті окремо.

---

# String та Arrays

String не є Array.

Наприклад:

    const word = "Hello";

це:

    string

а:

    const letters = ["H", "e", "l", "l", "o"];

це:

    array

Вони мають деякі схожі можливості доступу до елементів, але це різні типи даних.

---

# String vs Array

String:

    const word = "Hello";

Array:

    const letters = ["H", "e", "l", "l", "o"];

String має:

    word.length

Array також має:

    letters.length

Але string є immutable, тоді як елементи масиву можна змінювати.

Наприклад:

    letters[0] = "Y";

Тепер:

    ["Y", "e", "l", "l", "o"]

Для string:

    word[0] = "Y";

не змінить:

    "Hello"

---

# String Iteration

String є iterable.

Тому його можна перебирати через:

    for...of

Наприклад:

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

Це буде корисно при роботі з алгоритмами та текстом.

---

# String Concatenation vs Template Literal

Старий / простий підхід:

    const name = "John";
    const age = 25;

    const message =
        "My name is " + name + " and I am " + age + ".";

Template literal:

    const message =
        `My name is ${name} and I am ${age}.`;

Другий варіант часто читабельніший.

---

# Template Literal

Template literal створюється через backticks:

    const message = `Hello`;

Він дозволяє вставляти expressions:

    const name = "John";

    const message = `Hello, ${name}!`;

Результат:

    Hello, John!

---

# Expression у Template Literal

Всередині `${}` можна використовувати expression.

Наприклад:

    const a = 10;
    const b = 20;

    const result = `Sum: ${a + b}`;

Результат:

    Sum: 30

---

### Function у Template Literal

    const name = "John";

    const message = `Hello, ${name.toUpperCase()}!`;

Результат:

    Hello, JOHN!

---

# String Interpolation

String interpolation — вставка значень або expressions у string.

Наприклад:

    const name = "John";
    const age = 25;

    const message = `Name: ${name}, age: ${age}`;

Це одна з основних причин використовувати template literals.

---

# Whitespace

Whitespace — пробіли та інші невидимі символи форматування тексту.

До них можуть належати:

    space
    tab
    newline

Наприклад:

    const text = "  Hello  ";

Пробіли є частиною string.

Тому:

    text.length

включатиме їх.

Методи очищення whitespace:

    trim()
    trimStart()
    trimEnd()

будуть розглянуті окремо.

---

# Escape Character

Backslash:

    \

використовується для створення escape sequences.

Наприклад:

    \n
    \t
    \"
    \'
    \\

---

# Raw Text

Якщо потрібно буквально записати backslash або спеціальні символи, потрібно враховувати правила escaping.

Наприклад:

    const path = "C:\\Users\\John";

Результат:

    C:\Users\John

---

# String Declaration

Змінна з string:

    const name = "John";

Змінна може бути `let`, якщо її значення планується переприсвоювати:

    let message = "Hello";

    message = "Goodbye";

З `const` змінну не можна переприсвоїти:

    const message = "Hello";

    message = "Goodbye";

Це спричинить помилку.

Важливо:

`const` забороняє переприсвоєння змінної, а не "робить string mutable".

---

# String Reassignment

Наприклад:

    let word = "Hello";

    word = "World";

Тут:

    word

тепер посилається на інше string value.

String `"Hello"` не був змінений.

---

# String Value та Variable

Важливо розрізняти:

    variable

та:

    string value

Наприклад:

    let message = "Hello";

`message` — variable.

`"Hello"` — string value.

Після:

    message = "World";

змінна отримує інше значення.

---

# Practical Examples

## Приклад 1 — створення string

    const name = "Valeriy";

    console.log(name);

Результат:

    Valeriy

---

## Приклад 2 — перевірка типу

    const message = "Hello";

    console.log(typeof message);

Результат:

    "string"

---

## Приклад 3 — довжина

    const word = "JavaScript";

    console.log(word.length);

Результат:

    10

---

## Приклад 4 — перший символ

    const word = "JavaScript";

    console.log(word[0]);

Результат:

    J

---

## Приклад 5 — останній символ

    const word = "JavaScript";

    console.log(word[word.length - 1]);

Результат:

    t

---

## Приклад 6 — at()

    const word = "JavaScript";

    console.log(word.at(-1));

Результат:

    t

---

## Приклад 7 — concatenation

    const firstName = "John";
    const lastName = "Smith";

    const fullName = firstName + " " + lastName;

    console.log(fullName);

Результат:

    John Smith

---

## Приклад 8 — template literal

    const name = "John";

    const message = `Hello, ${name}!`;

    console.log(message);

Результат:

    Hello, John!

---

## Приклад 9 — expression

    const a = 10;
    const b = 20;

    const message = `Result: ${a + b}`;

    console.log(message);

Результат:

    Result: 30

---

## Приклад 10 — multiline string

    const message = `
    Hello
    JavaScript
    World
    `;

---

## Приклад 11 — newline

    const message = "Hello\nJavaScript";

    console.log(message);

Результат:

    Hello
    JavaScript

---

## Приклад 12 — tab

    const message = "Name:\tJohn";

    console.log(message);

---

## Приклад 13 — quotes

    const message = "It's a JavaScript string";

    console.log(message);

Результат:

    It's a JavaScript string

---

## Приклад 14 — escaped quotes

    const message = "He said: \"Hello\"";

    console.log(message);

Результат:

    He said: "Hello"

---

## Приклад 15 — string conversion

    const number = 123;

    const text = String(number);

    console.log(text);
    // "123"

    console.log(typeof text);
    // "string"

---

## Приклад 16 — string та number

    const result = "Age: " + 25;

    console.log(result);

Результат:

    Age: 25

---

## Приклад 17 — empty string

    const text = "";

    console.log(text.length);

Результат:

    0

---

## Приклад 18 — iteration

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

# Типові помилки

❌ Плутати string та number.

    const value = "10";

це:

    string

а:

    const value = 10;

це:

    number

---

❌ Очікувати математичного додавання:

    "10" + 5

Результат:

    "105"

---

❌ Намагатися змінити символ string напряму.

    const word = "Hello";

    word[0] = "Y";

Це не змінить string.

---

❌ Плутати `length` та останній index.

Якщо:

    const word = "Hello";

то:

    word.length
    // 5

але останній index:

    word.length - 1
    // 4

---

❌ Використовувати:

    word[word.length]

для останнього символу.

Це поверне:

    undefined

Правильно:

    word[word.length - 1]

або:

    word.at(-1)

---

❌ Забувати, що index починається з `0`.

    "Hello"

має:

    H → 0
    e → 1
    l → 2
    l → 3
    o → 4

---

❌ Плутати `const` з immutable string.

`const`:

    const word = "Hello";

означає, що змінну `word` не можна переприсвоїти.

Immutable:

    string value

означає, що конкретне string value не можна змінити посимвольно.

---

❌ Створювати `new String()` без потреби.

Не потрібно:

    const text = new String("Hello");

Зазвичай потрібно:

    const text = "Hello";

---

❌ Очікувати, що `length` завжди означає кількість видимих символів.

Наприклад:

    "🙂".length
    // 2

`length` рахує UTF-16 code units.

---

❌ Плутати різні типи лапок та backticks.

    "text"
    'text'
    `text`

Backticks мають додаткові можливості template literals.

---

# Важливі відмінності

## String vs Number

    "100" → string
    100   → number

---

## Empty String vs Undefined

    ""
    → string

    undefined
    → undefined

---

## String vs Array

    "Hello"
    → string

    ["H", "e", "l", "l", "o"]
    → array

---

## length vs last index

    word.length
    → кількість UTF-16 code units

    word.length - 1
    → останній index для простого однокодовогового випадку

---

## [] vs at()

    word[0]
    → перший символ

    word.at(-1)
    → останній символ

---

## String primitive vs String object

    "Hello"
    → primitive

    new String("Hello")
    → object

Для звичайної роботи використовуй primitive.

---

# String Operations — карта курсу

Базові strings:

    "Hello"

Властивості:

    length

Доступ:

    word[0]
    word.at(0)
    word.at(-1)

Concatenation:

    +
    
Template literals:

    `Hello, ${name}`

Conversion:

    String(value)

Search:

    includes()
    indexOf()
    startsWith()
    endsWith()

Extract:

    slice()
    substring()
    substr()

Case:

    toUpperCase()
    toLowerCase()

Whitespace:

    trim()
    trimStart()
    trimEnd()

Replace:

    replace()
    replaceAll()

Split / Join:

    split()
    join()

Padding:

    padStart()
    padEnd()

Repeat:

    repeat()

Regex:

    match()
    matchAll()
    search()
    replace()
    replaceAll()
    test()

---

# Практичні патерни

## Отримати перший символ

    const first = text[0];

---

## Отримати останній символ

    const last = text[text.length - 1];

або:

    const last = text.at(-1);

---

## Перевірити, чи string порожній

    const text = "";

    if (text.length === 0) {
        console.log("Empty");
    }

---

## Об'єднати strings

    const firstName = "John";
    const lastName = "Smith";

    const fullName = firstName + " " + lastName;

---

## Створити динамічний string

    const name = "John";
    const age = 25;

    const message = `Name: ${name}, age: ${age}`;

---

## Перетворити number на string

    const number = 123;

    const text = String(number);

---

## Перебрати string

    const word = "Hello";

    for (const char of word) {
        console.log(char);
    }

---

# String Immutability

Це одна з найважливіших концепцій.

Наприклад:

    let text = "hello";

Операція:

    text.toUpperCase();

повертає новий string:

    "HELLO"

але сама змінна:

    text

залишається:

    "hello"

Тому:

    const text = "hello";

    text.toUpperCase();

не змінить:

    text

Щоб зберегти результат:

    const text = "hello";

    const upperText = text.toUpperCase();

Тепер:

    text
    // "hello"

    upperText
    // "HELLO"

Це загальний принцип роботи багатьох string methods.

---

# String та Reference

String є primitive value.

Наприклад:

    const a = "Hello";
    const b = a;

Тут:

    a
    → "Hello"

    b
    → "Hello"

Primitive strings порівнюються за значенням.

    const a = "Hello";
    const b = "Hello";

    console.log(a === b);

Результат:

    true

---

# String Comparison

    const a = "Hello";
    const b = "Hello";
    const c = "hello";

    console.log(a === b);
    // true

    console.log(a === c);
    // false

Порівняння strings є case-sensitive.

---

# Practical Text Processing Flow

Типовий шлях роботи з текстом:

    string
       ↓
    access
       ↓
    search
       ↓
    extract
       ↓
    transform
       ↓
    validate
       ↓
    output

Наприклад:

    const email = "  user@example.com  ";

Пізніше можна:

    trim()
        ↓
    search
        ↓
    replace
        ↓
    split
        ↓
    validate

Це буде основою для наступних тем `strings-and-regex`.

---

# Питання зі співбесіди

Що таке string у JavaScript?

Які primitive data types існують у JavaScript?

Що повертає:

    typeof "Hello"

?

Що таке string literal?

Які способи створення string існують?

Чим відрізняються:

    'text'
    "text"
    `text`

?

Що таке template literal?

Для чого використовуються backticks?

Що таке string interpolation?

Що робить:

    ${expression}

?

Що таке empty string?

Яка довжина:

    "".length

?

Що таке `length` у string?

З якого index починається string?

Що таке zero-based indexing?

Як отримати перший символ string?

Як отримати останній символ?

Що поверне:

    "Hello"[0]

?

Що поверне:

    "Hello"[10]

?

Для чого використовується `at()`?

Яка різниця між:

    text[-1]

і:

    text.at(-1)

?

Що таке string immutability?

Чи можна змінити окремий символ string?

Що відбудеться після:

    text[0] = "A"

?

Як об'єднати strings?

Що робить оператор `+` зі string?

Що буде:

    "10" + 5

?

Як явно перетворити значення на string?

Для чого використовується:

    String(value)

?

Чим `String(value)` відрізняється від `value.toString()`?

Що таке escape sequence?

Що означають:

    \n
    \t
    \"
    \'
    \\

?

Як створити multiline string?

Що таке Unicode?

Що таке UTF-16?

Чому:

    "🙂".length

може дорівнювати `2`?

Чи дорівнює `string.length` завжди кількості видимих символів?

Що таке String object?

Чим відрізняються:

    "Hello"

і:

    new String("Hello")

?

Чому не рекомендується використовувати `new String()` для звичайних strings?

Чи є string iterable?

Як перебрати string через `for...of`?

Чим string відрізняється від array?

Чи можна змінити string напряму?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке string.

String як primitive type.

    typeof

String literals.

    'text'
    "text"
    `text`

`length`.

Zero-based indexing.

Access через:

    text[0]

Access через:

    text.at()

First character.

Last character.

Empty string.

String concatenation:

    +

String immutability.

String comparison:

    ===
    !==

String conversion:

    String(value)

Escape sequences:

    \n
    \t
    \"
    \'
    \\

Основи template literals:

    `Hello, ${name}`

String iteration:

    for...of

---

## 🔵 Junior

Розуміння:

    primitive string
    String object

Розуміння:

    length
    index
    character

Розуміння zero-based indexing.

Розуміння string immutability.

Розуміння різниці:

    string
    number

Розуміння:

    String(value)

Розуміння concatenation.

Розуміння template literals.

String interpolation.

Multiline strings.

Escape sequences.

Unicode basics.

UTF-16 basics.

Розуміння того, що `length` рахує UTF-16 code units.

Розуміння:

    []
    at()

Перебір strings через:

    for...of

Case-sensitive comparison.

---

## 🟠 Middle

Глибше розуміння Unicode.

UTF-16 code units.

Unicode code points.

Surrogate pairs.

Grapheme clusters.

Різниця між:

    code unit
    code point
    grapheme

Робота з:

    String.fromCodePoint()

    codePointAt()

Unicode normalization.

    normalize()

Locale-aware comparison.

    localeCompare()

Intl API.

Складні Unicode strings.

Міжнародний текст.

Unicode-aware text processing.

---

## 🔴 Senior

Глибоке розуміння ECMAScript String specification.

UTF-16 representation.

Code units.

Code points.

Surrogate pairs.

Well-formed Unicode strings.

Unicode normalization.

Grapheme segmentation.

Intl.Segmenter.

Locale-sensitive comparison.

Unicode property escapes у RegExp.

Internationalization.

Performance characteristics string operations.

Memory considerations.

String concatenation strategies.

Ropes / concatenated strings на рівні engine implementation.

Text processing abstractions.

Unicode-aware algorithms.

---

# Міні-шпаргалка

## String

    const text = "Hello";

    typeof text;
    // "string"

---

## Empty String

    const text = "";

    text.length;
    // 0

---

## Length

    const text = "Hello";

    text.length;
    // 5

---

## Index

    H e l l o
    0 1 2 3 4

---

## First Character

    text[0]

---

## Last Character

    text[text.length - 1]

або:

    text.at(-1)

---

## Invalid Index

    text[100]
    // undefined

---

## Concatenation

    const result = "Hello" + " " + "World";

    // "Hello World"

---

## Template Literal

    const name = "John";

    const message = `Hello, ${name}!`;

---

## Conversion

    String(123);
    // "123"

---

## Escape Sequences

    \n → newline
    \t → tab
    \' → single quote
    \" → double quote
    \\ → backslash

---

## Immutable

    const text = "Hello";

    text[0] = "Y";

String не зміниться.

---

## Comparison

    "Hello" === "Hello";
    // true

    "Hello" === "hello";
    // false

---

## Iteration

    for (const char of text) {
        console.log(char);
    }

---

## String vs Number

    "123" → string
    123   → number

---

## String vs Array

    "Hello"
    → string

    ["H", "e", "l", "l", "o"]
    → array

---

# Основні правила

    string → primitive text value

    typeof "Hello"
    → "string"

    length
    → кількість UTF-16 code units

    first index
    → 0

    last index
    → length - 1

    text[0]
    → перший символ / UTF-16 code unit access

    text.at(-1)
    → останній елемент з урахуванням negative index

    +
    → concatenation, якщо операція працює зі string

    String(value)
    → explicit string conversion

    ===
    → strict comparison

    string
    → immutable

    for...of
    → iteration over string

    `Hello ${name}`
    → template literal

---

# Головне

• `string` — primitive type JavaScript для представлення тексту.

• String можна записати через:

    'text'
    "text"
    `text`

• Backticks використовуються для template literals.

• `typeof "Hello"` повертає:

    "string"

• String має властивість:

    length

• Індекси починаються з:

    0

• Перший символ:

    text[0]

• Останній символ:

    text[text.length - 1]

або:

    text.at(-1)

• Якщо index не існує, доступ через `[]` або `at()` повертає:

    undefined

• String є immutable.

• Не можна змінити окремий символ існуючого string напряму.

• Щоб отримати змінений текст, створюється новий string.

• Strings можна об'єднувати:

    "Hello" + " " + "World"

• Для динамічного тексту часто зручніше використовувати:

    `Hello, ${name}`

• `String(value)` дозволяє явно перетворити значення на string.

• Escape sequences дозволяють записувати спеціальні символи:

    \n
    \t
    \"
    \'
    \\

• String підтримує Unicode.

• JavaScript використовує UTF-16 code units для представлення string.

• Тому `length` не завжди дорівнює кількості видимих Unicode characters.

• `"123"` та `123` — різні типи:

    string
    number

• String є iterable, тому його можна перебирати через:

    for...of

• Для звичайної роботи використовуй primitive strings:

    "Hello"

а не:

    new String("Hello")

• Основна модель роботи з текстом:

    create
      ↓
    access
      ↓
    search
      ↓
    extract
      ↓
    transform
      ↓
    validate
      ↓
    output

• Цей розділ — фундамент для наступних тем:

    string properties and access
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

• Для Junior-рівня найважливіше впевнено володіти:

    string
    length
    index
    []
    at()
    +
    String()
    template literals
    escape sequences
    immutability
    comparison
    for...of
    Unicode / UTF-16 basics