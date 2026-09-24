# 02. String Manipulation

String Manipulation (робота з рядками) — це набір операцій, алгоритмів і patterns для аналізу, пошуку, перевірки, зміни та перетворення рядків.

У JavaScript `String` — один із найважливіших типів даних.

Робота з рядками використовується для:

- пошуку тексту;
- перевірки символів;
- зміни регістру;
- обрізання пробілів;
- розділення рядка;
- об'єднання частин;
- пошуку підрядків;
- перевірки palindrome;
- підрахунку символів;
- пошуку duplicate characters;
- порівняння рядків;
- валідації введених даних;
- обробки URL;
- роботи з формами;
- обробки текстових даних;
- підготовки даних перед збереженням у БД.

У JavaScript string має багато вбудованих методів, але в алгоритмічних задачах важливо не тільки знати методи.

Потрібно вміти побудувати алгоритм:

    input string
        ↓
    analyze characters
        ↓
    apply condition
        ↓
    build result
        ↓
    return result

Ця тема є продовженням:

    01-problem-solving

і підготовкою до:

    03-array-problems
    06-frequency-counter
    07-two-pointers
    08-sliding-window
    09-recursion

---

# Ключові поняття

✔ string  
✔ character  
✔ substring  
✔ subsequence  
✔ string length  
✔ index  
✔ first character  
✔ last character  
✔ traversal  
✔ iteration  
✔ concatenation  
✔ interpolation  
✔ comparison  
✔ search  
✔ transformation  
✔ normalization  
✔ trimming  
✔ splitting  
✔ joining  
✔ palindrome  
✔ anagram  
✔ frequency  
✔ duplicate character  
✔ unique character  
✔ case-sensitive  
✔ case-insensitive  
✔ immutable  
✔ Unicode  
✔ UTF-16  
✔ regular expression  
✔ pattern  

---

# Що потрібно пам'ятати

• String у JavaScript — primitive value.

• String є immutable.

• Методи string не змінюють оригінальний string.

• Багато string-операцій створюють новий string.

• Індекс першого символу:

    0

• Останній індекс:

    string.length - 1

• `length` повертає довжину string у UTF-16 code units, а не завжди кількість видимих Unicode characters.

• `charAt()` повертає символ за index.

• `includes()` перевіряє наявність substring.

• `startsWith()` перевіряє початок.

• `endsWith()` перевіряє кінець.

• `indexOf()` повертає index першого входження.

• `lastIndexOf()` повертає index останнього входження.

• `slice()` повертає частину string.

• `substring()` також повертає частину string, але має іншу поведінку щодо negative indexes.

• `toUpperCase()` і `toLowerCase()` створюють новий string.

• `trim()` видаляє whitespace на початку та в кінці.

• `split()` перетворює string на array.

• `join()` перетворює array на string.

• Для складніших задач потрібно вміти пройти string через loop.

• String можна перебирати через:

    for...of

• Для задач із двома кінцями string можна використовувати pattern:

    two pointers

• Для підрахунку символів часто використовується:

    frequency counter

---

# String Basics

Створення string:

    const message = "Hello";

    const name = 'John';

    const text = `Hello, world!`;

У JavaScript можна використовувати:

    "..."
    '...'
    `...`

---

# String Length

Властивість:

    length

Приклад:

    const word = "Hello";

    console.log(word.length);

Результат:

    5

---

# String Index

Кожен символ має index.

    H e l l o
    0 1 2 3 4

Наприклад:

    const word = "Hello";

    console.log(word[0]);

Результат:

    H

---

# Останній символ

Типовий pattern:

    string[string.length - 1]

Наприклад:

    const word = "Hello";

    console.log(word[word.length - 1]);

Результат:

    o

---

# Access Character

Через square brackets:

    const word = "Hello";

    console.log(word[1]);

Результат:

    e

Також:

    console.log(word.at(1));

Результат:

    e

---

# at()

`at()` дозволяє отримувати символ за index.

    const word = "Hello";

    console.log(word.at(0));
    // H

    console.log(word.at(-1));
    // o

Negative index є зручним для доступу до символів з кінця.

---

# charAt()

    const word = "Hello";

    console.log(word.charAt(1));

Результат:

    e

На відміну від `at()`, `charAt()` не підтримує negative index таким самим способом.

---

# String Is Immutable

String не можна змінити безпосередньо.

Наприклад:

    let word = "Hello";

    word[0] = "Y";

Це не змінить string на:

    Yello

Правильний підхід:

    word = "Y" + word.slice(1);

Результат:

    Yello

---

# Immutable

Наприклад:

    const word = "hello";

    const upper = word.toUpperCase();

Оригінальний:

    word

залишається:

    "hello"

Новий string:

    upper

має:

    "HELLO"

---

# String Concatenation

Об'єднання strings:

    const firstName = "John";
    const lastName = "Smith";

    const fullName = firstName + " " + lastName;

Результат:

    "John Smith"

---

# Template Literals

Сучасніший спосіб:

    const firstName = "John";
    const lastName = "Smith";

    const fullName = `${firstName} ${lastName}`;

Template literals особливо зручні для:

    variables
    expressions
    multiline strings

---

# String Interpolation

    const name = "John";
    const age = 25;

    const message = `My name is ${name}. I am ${age}.`;

Результат:

    My name is John. I am 25.

---

# Escape Characters

Спеціальні символи:

    \n
        new line

    \t
        tab

    \'
        single quote

    \"
        double quote

    \\
        backslash

Приклад:

    const text = "Hello\nWorld";

Результат:

    Hello
    World

---

# Comparing Strings

Strings можна порівнювати:

    console.log("apple" === "apple");
    // true

    console.log("apple" === "Apple");
    // false

Порівняння є case-sensitive.

---

# Case-sensitive

Це означає:

    "Hello" !== "hello"

Наприклад:

    const a = "JavaScript";
    const b = "javascript";

    console.log(a === b);

Результат:

    false

---

# Case-insensitive Comparison

Можна нормалізувати регістр:

    const a = "JavaScript";
    const b = "javascript";

    console.log(
        a.toLowerCase() === b.toLowerCase()
    );

Результат:

    true

---

# toUpperCase()

    const word = "hello";

    const result = word.toUpperCase();

Результат:

    "HELLO"

---

# toLowerCase()

    const word = "HELLO";

    const result = word.toLowerCase();

Результат:

    "hello"

---

# trim()

`trim()` видаляє whitespace з початку та кінця string.

    const value = "   hello   ";

    const result = value.trim();

Результат:

    "hello"

---

# trimStart()

    const value = "   hello   ";

    console.log(value.trimStart());

Результат:

    "hello   "

---

# trimEnd()

    const value = "   hello   ";

    console.log(value.trimEnd());

Результат:

    "   hello"

---

# Search Methods

Основні методи пошуку:

    includes()
    startsWith()
    endsWith()
    indexOf()
    lastIndexOf()

---

# includes()

Перевіряє, чи містить string певний substring.

    const text = "Hello JavaScript";

    console.log(text.includes("JavaScript"));

Результат:

    true

---

# includes() — false

    const text = "Hello JavaScript";

    console.log(text.includes("Python"));

Результат:

    false

---

# startsWith()

Перевіряє, чи починається string із заданого значення.

    const text = "JavaScript";

    console.log(text.startsWith("Java"));

Результат:

    true

---

# endsWith()

    const file = "photo.jpg";

    console.log(file.endsWith(".jpg"));

Результат:

    true

---

# indexOf()

Повертає index першого входження.

    const text = "Hello";

    console.log(text.indexOf("l"));

Результат:

    2

Якщо substring не знайдено:

    -1

Наприклад:

    console.log(text.indexOf("x"));

Результат:

    -1

---

# lastIndexOf()

Повертає index останнього входження.

    const text = "hello";

    console.log(text.lastIndexOf("l"));

Результат:

    3

---

# indexOf() vs includes()

`indexOf()`:

    → повертає index

`includes()`:

    → повертає boolean

Наприклад:

    text.indexOf("a");

може повернути:

    3

А:

    text.includes("a");

повертає:

    true

Якщо потрібен лише факт наявності, `includes()` часто зрозуміліший.

---

# Search With Position

`includes()` може почати пошук з певної позиції.

    const text = "hello world";

    console.log(text.includes("world", 6));

Результат:

    true

Також:

    text.indexOf("world", 6);

---

# slice()

`slice()` повертає частину string.

Синтаксис:

    string.slice(start, end)

`end` не включається.

Наприклад:

    const word = "JavaScript";

    console.log(word.slice(0, 4));

Результат:

    Java

---

# slice() — з кінця

Negative index можна використовувати:

    const word = "JavaScript";

    console.log(word.slice(-6));

Результат:

    Script

---

# slice() — last characters

Наприклад:

    const value = "123456789";

    const result = value.slice(-3);

Результат:

    "789"

---

# substring()

    const word = "JavaScript";

    console.log(word.substring(0, 4));

Результат:

    "Java"

Основна різниця:

    slice()
    → підтримує negative indexes

    substring()
    → negative values обробляються інакше

Для сучасного JavaScript часто зручно використовувати `slice()`.

---

# substr()

`substr()` є legacy/deprecated API.

У новому коді краще використовувати:

    slice()

або:

    substring()

---

# replace()

Замінює перше відповідне входження.

    const text = "Hello world";

    const result = text.replace("world", "JavaScript");

Результат:

    "Hello JavaScript"

---

# replaceAll()

Замінює всі відповідні входження.

    const text = "red red red";

    const result = text.replaceAll("red", "blue");

Результат:

    "blue blue blue"

---

# replace() з Regular Expression

Наприклад:

    const text = "hello HELLO Hello";

    const result = text.replace(
        /hello/gi,
        "hi"
    );

Результат:

    "hi hi hi"

Regular expressions будуть детальніше розглядатися в:

    03-strings-and-regex

---

# split()

`split()` розділяє string і повертає array.

    const text = "apple,banana,orange";

    const fruits = text.split(",");

Результат:

    [
        "apple",
        "banana",
        "orange"
    ]

---

# split("")

Якщо роздільник — порожній string:

    const word = "hello";

    const chars = word.split("");

Результат:

    [
        "h",
        "e",
        "l",
        "l",
        "o"
    ]

Для Unicode-коректної роботи з деякими символами краще розглянути:

    Array.from()
    for...of

---

# join()

`join()` — це метод array, який об'єднує елементи в string.

    const words = [
        "Hello",
        "JavaScript"
    ];

    const result = words.join(" ");

Результат:

    "Hello JavaScript"

---

# split() + join()

Дуже поширений pattern:

    string
       ↓
    split()
       ↓
    array
       ↓
    process
       ↓
    join()
       ↓
    string

Наприклад:

    const text = "hello world";

    const result = text
        .split(" ")
        .join("-");

Результат:

    "hello-world"

---

# Repeat

`repeat()` повторює string задану кількість разів.

    const value = "ha";

    console.log(value.repeat(3));

Результат:

    "hahaha"

---

# padStart()

Додає символи на початок.

    const value = "5";

    console.log(value.padStart(3, "0"));

Результат:

    "005"

---

# padEnd()

    const value = "5";

    console.log(value.padEnd(3, "0"));

Результат:

    "500"

---

# String Traversal

String можна перебирати.

Найзручніше:

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

---

# Classic for

Можна працювати через index:

    const word = "Hello";

    for (let i = 0; i < word.length; i++) {
        console.log(word[i]);
    }

Це особливо корисно, коли потрібен:

    index

або:

    сусідній символ

---

# Reverse Traversal

Щоб пройти string з кінця:

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

Цей pattern буде важливим для:

    reverse string
    palindrome
    two pointers

---

# String Traversal Patterns

### Forward

    for (let i = 0; i < text.length; i++) {
        ...
    }

### Reverse

    for (let i = text.length - 1; i >= 0; i--) {
        ...
    }

### for...of

    for (const char of text) {
        ...
    }

---

# Count Characters

Задача:

    Порахувати кількість символів "a".

Input:

    "banana"

Algorithm:

    1. створити count = 0
    2. пройти string
    3. якщо char === "a"
    4. count++
    5. повернути count

Код:

    function countA(text) {
        let count = 0;

        for (const char of text) {
            if (char === "a") {
                count++;
            }
        }

        return count;
    }

Результат:

    countA("banana");
    // 3

Complexity:

    Time: O(n)
    Space: O(1)

---

# Count Specific Character

Універсальний варіант:

    function countChar(text, target) {
        let count = 0;

        for (const char of text) {
            if (char === target) {
                count++;
            }
        }

        return count;
    }

Приклад:

    countChar("banana", "a");
    // 3

---

# Count Vowels

    function countVowels(text) {
        const vowels = "aeiou";
        let count = 0;

        for (const char of text.toLowerCase()) {
            if (vowels.includes(char)) {
                count++;
            }
        }

        return count;
    }

Приклад:

    countVowels("JavaScript");
    // 3

---

# Count Consonants

Підхід:

    1. визначити vowels
    2. пройти string
    3. перевірити, чи character є буквою
    4. якщо це не vowel → consonant

Для реальних задач потрібно також визначити, як обробляти:

    spaces
    numbers
    punctuation
    Unicode letters

---

# Reverse String

Одна з класичних алгоритмічних задач.

Input:

    "hello"

Output:

    "olleh"

Рішення:

    function reverseString(text) {
        let result = "";

        for (let i = text.length - 1; i >= 0; i--) {
            result += text[i];
        }

        return result;
    }

---

# Reverse String — Array Approach

Можна використати:

    function reverseString(text) {
        return text
            .split("")
            .reverse()
            .join("");
    }

Це коротше, але алгоритмічний варіант через loop корисний для розуміння process.

---

# Palindrome

Palindrome — string, який однаково читається зліва направо та справа наліво.

Приклади:

    "level"
    "radar"
    "madam"

Не palindrome:

    "hello"

---

# Palindrome — Simple Approach

    function isPalindrome(text) {
        const reversed = text
            .split("")
            .reverse()
            .join("");

        return text === reversed;
    }

Приклад:

    isPalindrome("level");
    // true

---

# Palindrome — Two Pointers

Можна не створювати reversed string.

Порівнюємо:

    first
    last

потім:

    second
    second-last

і так далі.

    function isPalindrome(text) {
        let left = 0;
        let right = text.length - 1;

        while (left < right) {
            if (text[left] !== text[right]) {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }

Це важливий pattern:

    two pointers

Він буде детальніше розглядатися в:

    07-two-pointers

---

# Normalize Before Comparison

Іноді palindrome має бути:

    case-insensitive

Наприклад:

    "Level"

може вважатися palindrome.

Тоді:

    text = text.toLowerCase();

Іноді потрібно також видалити:

    spaces
    punctuation

Наприклад:

    "A man, a plan, a canal: Panama"

Для цього можна застосувати normalization.

---

# String Normalization

Normalization — приведення даних до єдиного формату перед порівнянням або обробкою.

Наприклад:

    "  Hello World  "

можна привести до:

    "hello world"

Кроки:

    trim()
    ↓
    toLowerCase()

Наприклад:

    const normalized = text
        .trim()
        .toLowerCase();

---

# Remove Spaces

Наприклад:

    const text = "hello world";

    const result = text.replaceAll(" ", "");

Результат:

    "helloworld"

Для складніших whitespace cases можна використовувати regular expressions:

    const result = text.replace(/\s/g, "");

---

# Remove Punctuation

Наприклад:

    const text = "Hello, world!";

Можна використати regex:

    const result = text.replace(/[^\w\s]/g, "");

Але конкретний pattern залежить від того, які символи потрібно вважати допустимими.

---

# Anagram

Anagram — два strings мають однакові символи з однаковими кількостями, але можуть бути в іншому порядку.

Наприклад:

    "listen"
    "silent"

є anagrams.

---

# Anagram — Sorting Approach

Один із простих підходів:

    1. split
    2. sort
    3. join
    4. compare

    function isAnagram(a, b) {
        return a
            .split("")
            .sort()
            .join("")
            ===
            b
            .split("")
            .sort()
            .join("");
    }

Приклад:

    isAnagram("listen", "silent");
    // true

Цей підхід простий, але використовує sorting.

---

# Anagram — Frequency Counter

Інший підхід:

    1. порахувати frequency кожного символу
    2. порівняти frequency двох strings

Наприклад:

    "listen"

може мати:

    l → 1
    i → 1
    s → 1
    t → 1
    e → 1
    n → 1

Цей pattern буде детальніше розглянутий у:

    06-frequency-counter

---

# Duplicate Characters

Задача:

    знайти duplicate characters.

Input:

    "hello"

Characters:

    h
    e
    l
    l
    o

Duplicate:

    l

---

# Set для Duplicate

Можна використовувати `Set`.

    function hasDuplicateChar(text) {
        const seen = new Set();

        for (const char of text) {
            if (seen.has(char)) {
                return true;
            }

            seen.add(char);
        }

        return false;
    }

Приклад:

    hasDuplicateChar("hello");
    // true

    hasDuplicateChar("world");
    // false

---

# First Unique Character

Задача:

    знайти перший символ,
    який зустрічається тільки один раз.

Input:

    "swiss"

Frequency:

    s → 3
    w → 1
    i → 1

Перший unique:

    w

Зручно розділити задачу на два проходи:

    pass 1
        → count characters

    pass 2
        → find first count === 1

Це типовий алгоритмічний pattern.

---

# String Frequency Counter

Наприклад:

    function countCharacters(text) {
        const frequency = {};

        for (const char of text) {
            if (frequency[char]) {
                frequency[char]++;
            } else {
                frequency[char] = 1;
            }
        }

        return frequency;
    }

Результат:

    countCharacters("hello");

    {
        h: 1,
        e: 1,
        l: 2,
        o: 1
    }

Для production-коду також можна використовувати:

    Map

---

# Map Frequency Counter

    function countCharacters(text) {
        const frequency = new Map();

        for (const char of text) {
            const count = frequency.get(char) ?? 0;

            frequency.set(char, count + 1);
        }

        return frequency;
    }

---

# Word Count

Задача:

    порахувати кількість слів.

Простий варіант:

    function countWords(text) {
        return text.trim().split(/\s+/).length;
    }

Наприклад:

    countWords("Hello JavaScript world");
    // 3

Але edge case:

    ""

потребує окремої обробки.

---

# Safe Word Count

    function countWords(text) {
        const trimmed = text.trim();

        if (trimmed === "") {
            return 0;
        }

        return trimmed.split(/\s+/).length;
    }

---

# Find Longest Word

Input:

    "I love JavaScript"

Output:

    "JavaScript"

Алгоритм:

    1. split string into words
    2. set first word as longest
    3. compare lengths
    4. update longest
    5. return longest

Код:

    function findLongestWord(text) {
        const words = text.trim().split(/\s+/);

        let longest = "";

        for (const word of words) {
            if (word.length > longest.length) {
                longest = word;
            }
        }

        return longest;
    }

---

# Capitalize First Character

Наприклад:

    "hello"

→

    "Hello"

Код:

    function capitalize(text) {
        if (text === "") {
            return "";
        }

        return text[0].toUpperCase() + text.slice(1);
    }

---

# Capitalize Words

Наприклад:

    "hello world"

→

    "Hello World"

Алгоритм:

    1. split into words
    2. capitalize each word
    3. join words

    function capitalizeWords(text) {
        return text
            .split(" ")
            .map(word => {
                return word[0]?.toUpperCase() + word.slice(1);
            })
            .join(" ");
    }

Для алгоритмічної практики корисно також реалізувати це через loop.

---

# Remove Duplicate Characters

Задача:

    "hello"

→

    "helo"

Один із варіантів:

    function removeDuplicates(text) {
        const seen = new Set();
        let result = "";

        for (const char of text) {
            if (!seen.has(char)) {
                seen.add(char);
                result += char;
            }
        }

        return result;
    }

---

# Character Replacement

Наприклад:

    "hello"

замінити всі:

    "l"

на:

    "x"

Результат:

    "hexxo"

Через:

    replaceAll()

    const result = "hello".replaceAll("l", "x");

---

# Compare Strings

Пряме порівняння:

    const a = "hello";
    const b = "hello";

    a === b;

Результат:

    true

Для case-insensitive:

    a.toLowerCase() === b.toLowerCase()

---

# Lexicographical Comparison

Strings можна порівнювати:

    "apple" < "banana"

JavaScript порівнює strings лексикографічно відповідно до правил Unicode.

Наприклад:

    "apple" < "banana"
    // true

Для навчальних задач важливо розуміти, що string comparison — не те саме, що порівняння чисел.

---

# localeCompare()

Для мовно-залежного порівняння:

    const result = "apple".localeCompare("banana");

Результат буде числом:

    negative
    zero
    positive

Це корисно для сортування тексту з урахуванням locale.

---

# startsWith / endsWith Pattern

Дуже поширений pattern для validation.

Наприклад:

    function isImageFile(filename) {
        return (
            filename.endsWith(".jpg") ||
            filename.endsWith(".png")
        );
    }

---

# URL / Prefix Validation

Наприклад:

    function isHttps(url) {
        return url.startsWith("https://");
    }

---

# String Transformation Pipeline

String methods можна об'єднувати.

Наприклад:

    const result = text
        .trim()
        .toLowerCase()
        .replaceAll(" ", "-");

Input:

    "  Hello World  "

Output:

    "hello-world"

Це називається chaining.

---

# Method Chaining

Наприклад:

    const slug = title
        .trim()
        .toLowerCase()
        .replaceAll(" ", "-");

Поступово:

    title
       ↓
    trim()
       ↓
    toLowerCase()
       ↓
    replaceAll()
       ↓
    slug

---

# String → Array → String

Один із найважливіших patterns:

    string
       ↓
    split()
       ↓
    array
       ↓
    array processing
       ↓
    join()
       ↓
    string

Наприклад:

    const text = "hello world";

    const result = text
        .split(" ")
        .reverse()
        .join(" ");

Результат:

    "world hello"

---

# Reverse Words

Зверни увагу:

    reverse string

і:

    reverse words

— різні задачі.

Input:

    "hello world"

Reverse string:

    "dlrow olleh"

Reverse words:

    "world hello"

Реалізація:

    function reverseWords(text) {
        return text
            .split(" ")
            .reverse()
            .join(" ");
    }

---

# Remove Extra Spaces

Input:

    "  hello   world  "

Очікуваний результат:

    "hello world"

Один із варіантів:

    function normalizeSpaces(text) {
        return text
            .trim()
            .split(/\s+/)
            .join(" ");
    }

---

# Check Empty String

Не завжди достатньо:

    text === ""

Якщо input може містити whitespace:

    "   "

то корисніше:

    text.trim() === ""

---

# Empty String

Empty string:

    ""

має:

    length === 0

Наприклад:

    const text = "";

    console.log(text.length);
    // 0

---

# Truthy / Falsy String

У JavaScript:

    ""

є falsy.

А:

    "hello"

є truthy.

Наприклад:

    if (text) {
        console.log("String is not empty");
    }

Але:

    "   "

є truthy.

Тому якщо whitespace також потрібно вважати порожнім:

    if (text.trim()) {
        ...
    }

---

# String and Numbers

Будь уважним до оператора `+`.

    "5" + 2

Результат:

    "52"

А:

    Number("5") + 2

Результат:

    7

Типи потрібно контролювати явно.

---

# Convert Number to String

    const number = 123;

    const text = String(number);

або:

    const text = number.toString();

Результат:

    "123"

---

# Convert String to Number

    const text = "123";

    const number = Number(text);

Результат:

    123

Також:

    parseInt()
    parseFloat()

мають окрему поведінку і застосовуються залежно від задачі.

---

# String Algorithm: Count Digits

Наприклад:

    const text = "abc12345";

Потрібно порахувати digits.

    function countDigits(text) {
        let count = 0;

        for (const char of text) {
            if (char >= "0" && char <= "9") {
                count++;
            }
        }

        return count;
    }

Результат:

    5

Для більш складних правил можна використовувати regex.

---

# String Algorithm: Remove Digits

    function removeDigits(text) {
        let result = "";

        for (const char of text) {
            if (!(char >= "0" && char <= "9")) {
                result += char;
            }
        }

        return result;
    }

Input:

    "abc123"

Output:

    "abc"

---

# String Algorithm: Keep Only Digits

    function onlyDigits(text) {
        let result = "";

        for (const char of text) {
            if (char >= "0" && char <= "9") {
                result += char;
            }
        }

        return result;
    }

Input:

    "abc123xyz45"

Output:

    "12345"

---

# String Algorithm: Character at Index

    function getCharacter(text, index) {
        if (
            index < 0 ||
            index >= text.length
        ) {
            return undefined;
        }

        return text[index];
    }

---

# String Algorithm: Find First Occurrence

    function findCharacter(text, target) {
        for (let i = 0; i < text.length; i++) {
            if (text[i] === target) {
                return i;
            }
        }

        return -1;
    }

Це алгоритмічна реалізація ідеї `indexOf()`.

---

# String Algorithm: Find Last Occurrence

Можна пройти string з кінця:

    function findLastCharacter(text, target) {
        for (let i = text.length - 1; i >= 0; i--) {
            if (text[i] === target) {
                return i;
            }
        }

        return -1;
    }

---

# String Algorithm: Contains Character

    function containsChar(text, target) {
        for (const char of text) {
            if (char === target) {
                return true;
            }
        }

        return false;
    }

Це алгоритмічна реалізація ідеї:

    includes()

---

# String Algorithm: Count Words

    function countWords(text) {
        const words = text.trim().split(/\s+/);

        if (text.trim() === "") {
            return 0;
        }

        return words.length;
    }

---

# String Algorithm: Longest Word Length

    function longestWordLength(text) {
        const trimmed = text.trim();

        if (trimmed === "") {
            return 0;
        }

        const words = trimmed.split(/\s+/);

        let maxLength = 0;

        for (const word of words) {
            if (word.length > maxLength) {
                maxLength = word.length;
            }
        }

        return maxLength;
    }

---

# String Algorithm: First Repeated Character

    function firstRepeatedChar(text) {
        const seen = new Set();

        for (const char of text) {
            if (seen.has(char)) {
                return char;
            }

            seen.add(char);
        }

        return undefined;
    }

При:

    "swiss"

результат:

    "s"

---

# String Algorithm: First Unique Character

    function firstUniqueChar(text) {
        const frequency = new Map();

        for (const char of text) {
            frequency.set(
                char,
                (frequency.get(char) ?? 0) + 1
            );
        }

        for (const char of text) {
            if (frequency.get(char) === 1) {
                return char;
            }
        }

        return undefined;
    }

---

# String Algorithm: Palindrome

Простий підхід:

    function isPalindrome(text) {
        return (
            text ===
            text.split("").reverse().join("")
        );
    }

Two-pointer підхід:

    function isPalindrome(text) {
        let left = 0;
        let right = text.length - 1;

        while (left < right) {
            if (text[left] !== text[right]) {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }

---

# Two Pointers on String

Загальна схема:

    left →           ← right

    a b c d c b a
    ↑               ↑

Порівняти:

    text[left]
    text[right]

Потім:

    left++
    right--

Поки:

    left < right

Це один із фундаментальних алгоритмічних patterns.

---

# Normalize + Palindrome

Для задачі:

    "A man, a plan, a canal: Panama"

можна спочатку нормалізувати:

    lowercase
    +
    remove non-alphanumeric

Наприклад:

    const normalized = text
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

Після цього застосувати palindrome algorithm.

---

# String Algorithms and Complexity

Для string довжини:

    n

прохід по всіх символах:

    O(n)

Наприклад:

    for (const char of text) {
        ...
    }

---

# Two Passes

Якщо алгоритм двічі проходить string:

    pass 1
    pass 2

зазвичай:

    O(n) + O(n)
    = O(n)

Константні множники ігноруються в Big O.

---

# Nested String Loops

Якщо для кожного символу проходити весь string:

    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < text.length; j++) {
            ...
        }
    }

Complexity:

    O(n²)

Такі рішення можуть бути нормальними для brute force, але потрібно розуміти їхню вартість.

---

# String Building

Наприклад:

    let result = "";

    for (const char of text) {
        result += char;
    }

Це часто використовується для побудови нового string.

У практичному коді потрібно розуміти, що strings immutable, тому створення нових strings має вартість.

Для більшості звичайних задач та помірних input такий підхід є нормальним.

---

# String vs Array

String:

    immutable sequence of text

Array:

    mutable collection

Наприклад:

    const text = "hello";

не можна змінити:

    text[0] = "H";

А array:

    const chars = ["h", "e", "l", "l", "o"];

можна змінити:

    chars[0] = "H";

---

# Коли перетворювати String на Array

Це корисно, коли потрібно:

    sort characters
    reverse characters
    modify individual elements
    use array methods

Наприклад:

    const chars = text.split("");

---

# Коли не потрібно перетворювати String на Array

Якщо потрібно лише:

    search
    count
    compare
    traverse

часто достатньо:

    for...of

або:

    for

Наприклад:

    for (const char of text) {
        if (char === "a") {
            ...
        }
    }

---

# Unicode

Важливо розуміти, що JavaScript strings використовують UTF-16.

Тому:

    string.length

не завжди дорівнює кількості видимих символів.

Наприклад, деякі Unicode characters займають більше одного UTF-16 code unit.

---

# Unicode Example

Наприклад:

    const text = "😀";

    console.log(text.length);

Результат:

    2

Хоча користувач бачить:

    1 символ

Це важлива відмінність:

    UTF-16 code units
        ≠
    Unicode code points
        ≠
    grapheme clusters

---

# for...of and Unicode

`for...of` перебирає string за Unicode code points.

Наприклад:

    const text = "😀";

    for (const char of text) {
        console.log(char);
    }

Отримаємо один iteration для цього emoji.

Тому для багатьох задач:

    for...of

краще підходить для роботи з Unicode characters, ніж:

    text[i]

Але навіть code point не завжди дорівнює одному користувацькому "видимому символу".

---

# Array.from()

Можна отримати array Unicode code points:

    const chars = Array.from("😀");

Результат:

    ["😀"]

Для складніших Unicode/grapheme задач потрібні спеціалізовані підходи, наприклад `Intl.Segmenter`.

---

# Intl.Segmenter

Для поділу тексту на grapheme clusters:

    const segmenter = new Intl.Segmenter(
        "en",
        {
            granularity: "grapheme"
        }
    );

    const segments = [
        ...segmenter.segment("😀")
    ];

Це вже більш advanced тема.

Для базового алгоритмічного рівня достатньо розуміти:

    string.length
        ↓
    UTF-16 code units

    for...of
        ↓
    Unicode code points

---

# Regular Expressions

Regular expressions дозволяють описувати patterns у тексті.

Наприклад:

    const digits = "123";

    /^\d+$/.test(digits);

Результат:

    true

Regex буде детальніше розглядатися в:

    03-strings-and-regex

У цьому розділі достатньо знати, що regex може бути корисним для:

    validation
    search
    replacement
    extraction

---

# String Manipulation Patterns

## Search

    includes()
    indexOf()
    startsWith()
    endsWith()

---

## Extract

    slice()
    substring()
    match()

---

## Transform

    toUpperCase()
    toLowerCase()
    replace()
    replaceAll()

---

## Normalize

    trim()
    toLowerCase()
    replace()

---

## Split

    split()

---

## Combine

    join()

---

## Traverse

    for
    for...of

---

## Compare

    ===
    localeCompare()

---

# Common Problem-Solving Patterns

### Pattern 1 — Traversal

    for (const char of text) {
        ...
    }

Використовується для:

    count
    search
    validation
    transformation

---

### Pattern 2 — Accumulator

    let result = "";

    for (const char of text) {
        result += char;
    }

Використовується для:

    build string
    remove characters
    transform characters

---

### Pattern 3 — Counter

    let count = 0;

    for (const char of text) {
        if (...) {
            count++;
        }
    }

Використовується для:

    count characters
    count vowels
    count digits
    count matches

---

### Pattern 4 — Search

    for (const char of text) {
        if (...) {
            return char;
        }
    }

Використовується для:

    find first match
    find first unique
    find first repeated

---

### Pattern 5 — Frequency Counter

    const frequency = new Map();

    for (const char of text) {
        frequency.set(
            char,
            (frequency.get(char) ?? 0) + 1
        );
    }

Використовується для:

    anagrams
    duplicates
    character frequency
    unique characters

---

### Pattern 6 — Two Pointers

    let left = 0;
    let right = text.length - 1;

    while (left < right) {
        ...
        left++;
        right--;
    }

Використовується для:

    palindrome
    comparing both ends
    reversing logic
    symmetric problems

---

### Pattern 7 — Normalize Then Compare

    const a = normalize(first);
    const b = normalize(second);

    return a === b;

Використовується для:

    case-insensitive comparison
    whitespace normalization
    palindrome
    text validation

---

# Practical Examples

## Example 1 — Uppercase

    const text = "hello";

    const result = text.toUpperCase();

    console.log(result);
    // HELLO

---

## Example 2 — Remove Spaces

    const text = "hello world";

    const result = text.replaceAll(" ", "");

    console.log(result);
    // helloworld

---

## Example 3 — Count Character

    const text = "banana";

    let count = 0;

    for (const char of text) {
        if (char === "a") {
            count++;
        }
    }

    console.log(count);
    // 3

---

## Example 4 — Reverse String

    const text = "hello";

    let result = "";

    for (let i = text.length - 1; i >= 0; i--) {
        result += text[i];
    }

    console.log(result);
    // olleh

---

## Example 5 — First Character

    const text = "JavaScript";

    console.log(text[0]);
    // J

---

## Example 6 — Last Character

    const text = "JavaScript";

    console.log(text[text.length - 1]);
    // t

---

## Example 7 — Search

    const text = "Hello JavaScript";

    if (text.includes("JavaScript")) {
        console.log("Found");
    }

---

## Example 8 — Replace

    const text = "Hello world";

    const result = text.replace(
        "world",
        "JavaScript"
    );

    console.log(result);
    // Hello JavaScript

---

## Example 9 — Split

    const text = "one,two,three";

    const result = text.split(",");

    console.log(result);

    // [
    //     "one",
    //     "two",
    //     "three"
    // ]

---

## Example 10 — Join

    const words = [
        "JavaScript",
        "is",
        "powerful"
    ];

    const result = words.join(" ");

    console.log(result);
    // JavaScript is powerful

---

## Example 11 — Longest Word

    const text = "I love JavaScript";

    const words = text.split(" ");

    let longest = "";

    for (const word of words) {
        if (word.length > longest.length) {
            longest = word;
        }
    }

    console.log(longest);
    // JavaScript

---

## Example 12 — Palindrome

    const text = "level";

    let left = 0;
    let right = text.length - 1;

    let isPalindrome = true;

    while (left < right) {
        if (text[left] !== text[right]) {
            isPalindrome = false;
            break;
        }

        left++;
        right--;
    }

    console.log(isPalindrome);
    // true

---

## Example 13 — Character Frequency

    const text = "hello";

    const frequency = {};

    for (const char of text) {
        frequency[char] =
            (frequency[char] ?? 0) + 1;
    }

    console.log(frequency);

    // {
    //     h: 1,
    //     e: 1,
    //     l: 2,
    //     o: 1
    // }

---

# Typical String Problem Workflow

Наприклад:

    Problem:
    "Determine whether two strings are anagrams."

Не потрібно одразу писати код.

Спочатку:

    Input:
        two strings

    Output:
        boolean

    Edge cases:
        empty strings
        different lengths
        repeated characters
        different case

    Simple approach:
        sort characters and compare

    Optimized approach:
        frequency counter

---

# Problem Solving Template for Strings

    ## Problem

    Що потрібно зробити?

    ## Input

    Який string / strings?

    ## Output

    Що потрібно повернути?

    ## Constraints

    Яка максимальна довжина?

    ## Examples

    Які normal cases?

    ## Edge Cases

    Що буде для:

        ""
        "a"
        spaces
        duplicate characters
        uppercase/lowercase
        special characters

    ## Approach

    Який algorithmic pattern?

    ## Pseudocode

    Які кроки?

    ## Implementation

    JavaScript code.

    ## Complexity

    Time:
        ?

    Space:
        ?

---

# Типові помилки

❌ Забувати, що string immutable.

---

❌ Намагатися змінити:

    text[0] = "A"

замість створення нового string.

---

❌ Плутати:

    index

і:

    character

---

❌ Забувати, що index починається з:

    0

---

❌ Використовувати:

    i <= text.length

замість:

    i < text.length

---

❌ Не враховувати empty string.

---

❌ Не враховувати whitespace.

---

❌ Плутати:

    "Hello"

і:

    "hello"

---

❌ Припускати, що `length` завжди означає кількість видимих Unicode символів.

---

❌ Плутати:

    substring

    subsequence

---

❌ Робити case-sensitive comparison, коли задача вимагає case-insensitive.

---

❌ Не визначати, чи потрібно враховувати punctuation.

---

❌ Не визначати, чи потрібно враховувати spaces.

---

❌ Використовувати regex для кожної задачі, коли простий loop достатній.

---

❌ Використовувати складний algorithm там, де достатньо:

    includes()
    indexOf()
    startsWith()
    endsWith()

---

❌ Писати nested loops без перевірки complexity.

---

# String Methods — Core

Основні методи, які потрібно знати:

    charAt()
    at()

    includes()
    startsWith()
    endsWith()

    indexOf()
    lastIndexOf()

    slice()
    substring()

    toUpperCase()
    toLowerCase()

    trim()
    trimStart()
    trimEnd()

    replace()
    replaceAll()

    split()

    repeat()

    padStart()
    padEnd()

---

# String + Array Methods

Потрібно добре розуміти взаємодію:

    string
       ↓
    split()
       ↓
    array
       ↓
    map()
    filter()
    find()
    sort()
    reverse()
       ↓
    join()
       ↓
    string

Наприклад:

    const result = text
        .split(" ")
        .filter(Boolean)
        .map(word => word.toUpperCase())
        .join(" ");

---

# String vs Regex

Для простих задач:

    includes()
    startsWith()
    endsWith()
    indexOf()
    replaceAll()

часто достатньо.

Для pattern-based задач:

    regex

може бути кращим.

Наприклад:

    email validation
    digit extraction
    whitespace normalization
    pattern matching

Regex детальніше:

    03-strings-and-regex

---

# String Algorithms Roadmap

Після базових string operations варто практикувати:

    1. reverse string

    2. count characters

    3. count vowels

    4. count words

    5. find longest word

    6. find shortest word

    7. capitalize words

    8. remove spaces

    9. remove duplicate characters

    10. find duplicate characters

    11. find first unique character

    12. find first repeated character

    13. check palindrome

    14. check anagram

    15. compare strings

    16. normalize strings

    17. validate string

    18. count character frequency

    19. reverse words

    20. find substring

---

# Поступове ускладнення

## Level 1 — Basic

    length
    index
    character access
    uppercase
    lowercase
    trim
    includes
    startsWith
    endsWith

---

## Level 2 — Traversal

    for
    for...of
    reverse traversal
    count
    search
    accumulator

---

## Level 3 — Transformation

    split
    join
    replace
    replaceAll
    normalization
    character transformation

---

## Level 4 — Algorithms

    reverse string
    palindrome
    anagram
    duplicates
    unique characters
    frequency counter
    longest word

---

## Level 5 — Patterns

    frequency counter
    two pointers
    sliding window
    recursion

---

# Interview Questions

Що таке String у JavaScript?

Чи є String mutable?

Що означає immutable string?

Як отримати довжину string?

Як отримати символ за index?

Як отримати останній символ?

Яка різниця між `charAt()` та `at()`?

Що повертає `includes()`?

Що повертає `indexOf()`?

Що повертає `indexOf()`, якщо значення не знайдено?

Яка різниця між `includes()` та `indexOf()`?

Що робить `startsWith()`?

Що робить `endsWith()`?

Що робить `slice()`?

Яка різниця між `slice()` та `substring()`?

Що робить `split()`?

Що робить `join()`?

Як перевернути string?

Як перевірити palindrome?

Як знайти кількість певного символу?

Як знайти duplicate characters?

Як знайти first unique character?

Як перевірити anagram?

Що таке frequency counter?

Коли використовувати `Set`?

Коли використовувати `Map`?

Як пройти string через loop?

Чим `for` відрізняється від `for...of` при роботі з string?

Що таке two pointers?

Як використовувати two pointers для palindrome?

Що таке normalization?

Як зробити case-insensitive comparison?

Що таке Unicode?

Чому `"😀".length` може бути не `1`?

Що перебирає `for...of` у string?

Що таке UTF-16?

Яка різниця між code unit і code point?

Що таке grapheme?

Яка time complexity проходу по string?

Яка space complexity алгоритму reverse string?

Як знайти найдовше слово?

Як порахувати кількість слів?

Як видалити зайві пробіли?

Як знайти перший повторюваний символ?

Як знайти перший унікальний символ?

---

# Шлях

## 🟢 Core — обов'язково знати

String basics:

    string
    length
    index
    character

Основні операції:

    []
    at()
    charAt()

Основні методи:

    includes()
    startsWith()
    endsWith()

    indexOf()
    lastIndexOf()

    slice()

    toUpperCase()
    toLowerCase()

    trim()

    split()
    join()

Основи:

    string immutability
    string comparison
    case-sensitive comparison
    empty string
    whitespace

Уміння:

    пройти string через loop
    отримати перший символ
    отримати останній символ
    знайти символ
    порахувати символи
    побудувати новий string

---

## 🔵 Junior

Впевнено розуміти:

    string traversal
    reverse traversal
    string transformation
    normalization
    search patterns
    accumulator
    counter

Вміти реалізувати:

    reverse string
    count characters
    count vowels
    count words
    find longest word
    find shortest word
    capitalize words
    remove spaces
    remove duplicate characters
    find duplicate characters
    first unique character
    first repeated character
    palindrome
    basic anagram

Розуміти:

    Set
    Map
    frequency counter
    two pointers

Розуміти базову:

    O(n)
    O(n²)

---

## 🟠 Middle

Глибше розуміти:

    frequency counter
    two pointers
    sliding window
    string normalization
    Unicode
    UTF-16
    code points
    grapheme clusters

Вміти:

    оптимізувати string algorithms
    порівнювати brute force та optimized approaches
    працювати з великими strings
    аналізувати time complexity
    аналізувати space complexity

Розуміти:

    string vs array trade-offs
    Set / Map trade-offs
    regex vs manual traversal
    immutable data processing

Вміти вирішувати:

    anagram problems
    substring problems
    duplicate problems
    palindrome variations
    frequency problems

---

## 🔴 Senior

Глибоке розуміння:

    Unicode
    UTF-16
    code units
    code points
    grapheme clusters
    Unicode normalization
    Intl.Segmenter

Розуміння:

    advanced string algorithms
    substring search
    pattern matching
    rolling hash
    tries
    suffix structures
    advanced text processing

Алгоритмічні підходи:

    KMP
    Rabin-Karp
    Boyer-Moore

Глибоке розуміння:

    time complexity
    space complexity
    memory behavior
    allocation costs
    Unicode correctness
    locale-aware comparison

Вибір між:

    string methods
    loops
    arrays
    Set
    Map
    regex
    advanced algorithms

---

# Міні-шпаргалка

## String

    const text = "Hello";

    text.length
        → 5

    text[0]
        → "H"

    text.at(-1)
        → "o"

---

## Search

    text.includes("Hello")
        → true / false

    text.startsWith("He")
        → true / false

    text.endsWith("lo")
        → true / false

    text.indexOf("l")
        → index / -1

    text.lastIndexOf("l")
        → last index / -1

---

## Extract

    text.slice(0, 3)

    text.substring(0, 3)

---

## Transform

    text.toUpperCase()

    text.toLowerCase()

    text.replace()

    text.replaceAll()

---

## Normalize

    text.trim()

    text
        .trim()
        .toLowerCase()

---

## Split

    text.split(" ")

---

## Join

    words.join(" ")

---

## Traverse

    for (const char of text) {
        ...
    }

---

## Reverse

    for (
        let i = text.length - 1;
        i >= 0;
        i--
    ) {
        ...
    }

---

## Count

    let count = 0;

    for (const char of text) {
        if (char === target) {
            count++;
        }
    }

---

## Frequency Counter

    const frequency = new Map();

    for (const char of text) {
        frequency.set(
            char,
            (frequency.get(char) ?? 0) + 1
        );
    }

---

## Duplicate

    const seen = new Set();

    for (const char of text) {
        if (seen.has(char)) {
            return true;
        }

        seen.add(char);
    }

    return false;

---

## Palindrome

    let left = 0;
    let right = text.length - 1;

    while (left < right) {
        if (text[left] !== text[right]) {
            return false;
        }

        left++;
        right--;
    }

    return true;

---

## Reverse Words

    text
        .split(" ")
        .reverse()
        .join(" ");

---

## Normalize + Compare

    const a = first
        .trim()
        .toLowerCase();

    const b = second
        .trim()
        .toLowerCase();

    return a === b;

---

# Основні правила

    string
        → immutable

    length
        → UTF-16 code units

    [index]
        → character/code unit access

    at()
        → supports negative index

    includes()
        → contains?

    indexOf()
        → where?

    startsWith()
        → starts with?

    endsWith()
        → ends with?

    slice()
        → extract part

    split()
        → string → array

    join()
        → array → string

    trim()
        → remove surrounding whitespace

    replace()
        → replace first matching occurrence

    replaceAll()
        → replace all matching occurrences

    for...of
        → iterate Unicode code points

    Set
        → uniqueness / duplicate detection

    Map
        → frequency counting

    two pointers
        → compare/process both ends

---

# Complexity Patterns

## One pass

    for (const char of text) {
        ...
    }

    Time:
        O(n)

---

## Two passes

    first pass
        ↓
    second pass

    Time:
        O(n)

---

## Nested loops

    for (...) {
        for (...) {
            ...
        }
    }

    Time:
        O(n²)

---

## Set / Map

Часто дозволяють:

    lookup
    counting
    duplicate detection

за ефективністю, близькою до:

    O(1)

для типових операцій у середньому випадку.

---

# Головне

• String — один із фундаментальних типів даних для алгоритмічного програмування.

• JavaScript strings є immutable.

• Не можна змінювати окремий символ напряму.

• Основна модель роботи з string:

    access
    ↓
    traverse
    ↓
    analyze
    ↓
    transform
    ↓
    return result

• Перший index:

    0

• Останній index:

    length - 1

• Для проходження string найчастіше використовуються:

    for
    for...of

• `for...of` зручний, коли потрібні самі символи.

• `for` з index зручний, коли потрібно знати позицію або працювати із сусідніми символами.

• `includes()` відповідає на питання:

    "Чи містить string це значення?"

• `indexOf()` відповідає на питання:

    "Де знаходиться це значення?"

• `slice()` використовується для отримання частини string.

• `split()` перетворює string на array.

• `join()` перетворює array назад на string.

• `trim()` корисний для normalization input.

• Порівняння strings є case-sensitive, якщо ми попередньо не нормалізували регістр.

• Для case-insensitive comparison часто використовують:

    toLowerCase()

або відповідний locale-aware підхід залежно від задачі.

• Для підрахунку символів використовується:

    counter

• Для побудови нового string:

    accumulator

• Для частот символів:

    frequency counter

• Для duplicate detection часто використовується:

    Set

• Для frequency counting:

    Map

• Для palindrome ефективним pattern є:

    two pointers

• Для багатьох string задач корисно спочатку зробити:

    normalize
        ↓
    process
        ↓
    compare / return

• Не потрібно використовувати складний алгоритм, якщо достатньо стандартного string method.

• Але для навчання algorithms важливо вміти реалізувати базові операції вручну через loops.

• Важливо розрізняти:

    string length
        ↓
    UTF-16 code units

та:

    Unicode code points
        ↓
    for...of

і:

    grapheme clusters
        ↓
    видимі користувачем символи

• Основні алгоритмічні patterns для strings:

    traversal
    accumulator
    counter
    search
    frequency counter
    two pointers
    normalization
    split → process → join

• Найважливіші практичні задачі:

    reverse string
    count characters
    count vowels
    find longest word
    remove duplicates
    find duplicates
    first unique character
    first repeated character
    palindrome
    anagram

• Основна мета цього розділу:

    не просто знати
    string methods,

    а вміти побачити
    алгоритмічний pattern
    у задачі з текстом.

• Загальна модель:

    String
       ↓
    Understand problem
       ↓
    Normalize input
       ↓
    Choose pattern
       ↓
    Traverse / Search / Transform
       ↓
    Build result
       ↓
    Test edge cases
       ↓
    Analyze complexity

• І головне:

    String manipulation —
    це не набір випадкових методів.

    Це тренування вміння
    перетворювати текстові дані
    у чіткий алгоритм.