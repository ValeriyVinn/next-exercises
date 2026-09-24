# 06. Frequency Counter

## Вступ

**Frequency Counter** — це алгоритмічний патерн, який використовується для підрахунку того, **скільки разів кожне значення зустрічається в наборі даних**.

Найпростіший приклад:

    const numbers = [1, 2, 2, 3, 3, 3];

Потрібно отримати:

    1 → 1 раз
    2 → 2 рази
    3 → 3 рази

У JavaScript це часто реалізується через:

- `Object`;
- `Map`;
- іноді `Set`;
- масиви та їхні методи.

Але головна ідея Frequency Counter — не конкретний JavaScript API.

Головна ідея:

> **Замість багаторазового пошуку одного й того самого значення ми один раз проходимо дані та будуємо структуру частот.**

Цей pattern дуже важливий для алгоритмічного мислення.

---

# 1. Де Frequency Counter знаходиться в Algorithms

У нашій структурі:

    09-algorithms-and-logic
    │
    ├── 01-problem-solving
    ├── 02-string-manipulation
    ├── 03-array-problems
    ├── 04-searching
    ├── 05-sorting
    ├── 06-frequency-counter
    ├── 07-two-pointers
    ├── 08-sliding-window
    ├── 09-recursion
    └── 10-complexity-basics

Frequency Counter — це вже не просто окремий метод JavaScript.

Це **problem-solving pattern**.

---

# 2. Головна ідея

Припустимо, маємо:

    const numbers = [2, 1, 2, 3, 2, 1];

Замість постійного пошуку:

    скільки 1?
    скільки 2?
    скільки 3?

створюємо frequency table:

    {
      1: 2,
      2: 3,
      3: 1
    }

Тобто:

    value → frequency

---

# 3. Чому це корисно

Frequency Counter дозволяє ефективно вирішувати задачі типу:

- скільки разів зустрічається елемент;
- чи є дублікати;
- чи мають два масиви однакові частоти;
- чи є два рядки анаграмами;
- який елемент зустрічається найчастіше;
- чи відповідає один набір даних іншому;
- підрахунок категорій;
- статистика;
- групування;
- перевірка умов.

---

# 4. Найпростіший Frequency Counter

    const numbers = [1, 2, 2, 3, 3, 3];

    const frequency = {};

    for (const number of numbers) {
      frequency[number] = (frequency[number] || 0) + 1;
    }

    console.log(frequency);

Результат:

    {
      1: 1,
      2: 2,
      3: 3
    }

---

# 5. Як працює цей код

Розглянемо:

    frequency[number] = (frequency[number] || 0) + 1;

Якщо елемент зустрічається вперше:

    frequency[2]

ще не існує.

Отримуємо:

    undefined

Тому:

    undefined || 0

дає:

    0

Потім:

    0 + 1

отримуємо:

    1

При наступному `2`:

    frequency[2] = 1

тому:

    1 + 1

отримуємо:

    2

---

# 6. Покрокова робота

Маємо:

    [2, 1, 2, 3, 2]

### Крок 1

    2

Counter:

    {
      2: 1
    }

### Крок 2

    1

Counter:

    {
      1: 1,
      2: 1
    }

### Крок 3

    2

Counter:

    {
      1: 1,
      2: 2
    }

### Крок 4

    3

Counter:

    {
      1: 1,
      2: 2,
      3: 1
    }

### Крок 5

    2

Counter:

    {
      1: 1,
      2: 3,
      3: 1
    }

---

# 7. Frequency Counter через `Map`

Для загального випадку дуже зручно використовувати `Map`.

    const numbers = [1, 2, 2, 3, 3, 3];

    const frequency = new Map();

    for (const number of numbers) {
      frequency.set(
        number,
        (frequency.get(number) ?? 0) + 1
      );
    }

Результат концептуально:

    1 → 1
    2 → 2
    3 → 3

---

# 8. `Map` чи Object?

Для простих ключів:

    const frequency = {};

може бути достатньо.

Для більш загальних випадків:

    const frequency = new Map();

часто зручніше.

### Object

Підходить, коли ключі:

- strings;
- прості property names;
- прості числові значення, які можна перетворити на string.

### Map

Дозволяє використовувати різні типи ключів:

- string;
- number;
- object;
- function;
- інші значення.

---

# 9. Frequency Counter через `Map` — функція

    function countFrequency(array) {
      const frequency = new Map();

      for (const value of array) {
        frequency.set(
          value,
          (frequency.get(value) ?? 0) + 1
        );
      }

      return frequency;
    }

Використання:

    const numbers = [1, 2, 2, 3, 3, 3];

    const result = countFrequency(numbers);

    console.log(result.get(3));

Результат:

    3

---

# 10. Підрахунок символів у рядку

Frequency Counter дуже часто використовується для рядків.

Маємо:

    const text = "hello";

Потрібно отримати:

    h → 1
    e → 1
    l → 2
    o → 1

Реалізація:

    function charFrequency(text) {
      const frequency = {};

      for (const char of text) {
        frequency[char] = (frequency[char] || 0) + 1;
      }

      return frequency;
    }

---

# 11. Приклад

    console.log(charFrequency("hello"));

Результат:

    {
      h: 1,
      e: 1,
      l: 2,
      o: 1
    }

---

# 12. Навіщо Frequency Counter замість `indexOf()`

Припустимо, потрібно знайти кількість повторень кожного символу.

Наївний підхід може багато разів проходити рядок.

Наприклад:

    для кожного символу
        шукаємо його в рядку
        рахуємо входження

Це може призвести до:

    O(n²)

Frequency Counter:

    один прохід
        ↓
    записуємо frequency
        ↓
    O(n)

Це одна з головних причин вивчати pattern.

---

# 13. Дублікати

Frequency Counter можна використовувати для пошуку дублікатів.

Наприклад:

    [1, 2, 3, 2]

Маємо:

    {
      1: 1,
      2: 2,
      3: 1
    }

Якщо:

    frequency[value] > 1

то значення є дублікатом.

---

# 14. Пошук першого дубліката

    function findDuplicate(array) {
      const frequency = new Map();

      for (const value of array) {
        const count = frequency.get(value) ?? 0;

        if (count > 0) {
          return value;
        }

        frequency.set(value, count + 1);
      }

      return undefined;
    }

Приклад:

    findDuplicate([1, 2, 3, 2, 5]);

Результат:

    2

---

# 15. Але для простого пошуку дублікатів існує `Set`

Для задачі:

> Чи є хоча б один duplicate?

можна використовувати `Set`.

    function hasDuplicate(array) {
      return new Set(array).size !== array.length;
    }

Наприклад:

    hasDuplicate([1, 2, 3]);

    // false

    hasDuplicate([1, 2, 3, 2]);

    // true

Тому Frequency Counter — не універсальна відповідь на кожну задачу.

---

# 16. Frequency Counter Pattern

Типова схема:

    const frequency = {};

    for (const value of array) {
      frequency[value] = (frequency[value] || 0) + 1;
    }

Або:

    const frequency = new Map();

    for (const value of array) {
      frequency.set(
        value,
        (frequency.get(value) ?? 0) + 1
      );
    }

Це один із шаблонів, який потрібно навчитися впізнавати.

---

# 17. Classic Problem — Same Frequency

Маємо два масиви:

    const a = [1, 2, 3];
    const b = [3, 2, 1];

Потрібно перевірити:

> Чи містять вони однакові значення з однаковою кількістю повторень?

Відповідь:

    true

---

# 18. Приклад із різною частотою

    const a = [1, 2, 2, 3];

    const b = [1, 1, 2, 3];

Тут:

    a:
    1 → 1
    2 → 2
    3 → 1

    b:
    1 → 2
    2 → 1
    3 → 1

Отже:

    false

---

# 19. Рішення через Frequency Counter

    function sameFrequency(array1, array2) {
      if (array1.length !== array2.length) {
        return false;
      }

      const frequency1 = new Map();
      const frequency2 = new Map();

      for (const value of array1) {
        frequency1.set(
          value,
          (frequency1.get(value) ?? 0) + 1
        );
      }

      for (const value of array2) {
        frequency2.set(
          value,
          (frequency2.get(value) ?? 0) + 1
        );
      }

      for (const [value, count] of frequency1) {
        if (frequency2.get(value) !== count) {
          return false;
        }
      }

      return true;
    }

---

# 20. Перевірка

    sameFrequency(
      [1, 2, 2, 3],
      [3, 2, 1, 2]
    );

Результат:

    true

---

# 21. Чому спочатку перевіряємо `length`

Якщо:

    array1.length !== array2.length

вони не можуть містити однакові частоти всіх елементів.

Тому можна відразу:

    return false;

Це називається:

**early return**

або:

**early exit**

---

# 22. Classic Problem — Anagram

Anagram — це коли два слова складаються з однакових символів у різному порядку.

Наприклад:

    "listen"
    "silent"

Мають однакову частоту символів:

    l → 1
    i → 1
    s → 1
    t → 1
    e → 1
    n → 1

Тому:

    true

---

# 23. Anagram — просте рішення через сортування

Один із варіантів:

    function areAnagrams(str1, str2) {
      if (str1.length !== str2.length) {
        return false;
      }

      const sorted1 = [...str1].sort().join("");
      const sorted2 = [...str2].sort().join("");

      return sorted1 === sorted2;
    }

Наприклад:

    areAnagrams("listen", "silent");

Результат:

    true

Але тут використовується sorting.

---

# 24. Anagram через Frequency Counter

Можна уникнути sorting.

    function areAnagrams(str1, str2) {
      if (str1.length !== str2.length) {
        return false;
      }

      const frequency = {};

      for (const char of str1) {
        frequency[char] = (frequency[char] || 0) + 1;
      }

      for (const char of str2) {
        if (!frequency[char]) {
          return false;
        }

        frequency[char]--;
      }

      return true;
    }

---

# 25. Як працює Anagram Counter

Маємо:

    str1 = "listen"

Counter:

    l → 1
    i → 1
    s → 1
    t → 1
    e → 1
    n → 1

Потім проходимо:

    "silent"

Для кожного символу зменшуємо frequency.

Наприклад:

    s → 0
    i → 0
    l → 0
    e → 0
    n → 0
    t → 0

Якщо кожен символ був доступний у достатній кількості:

    true

---

# 26. Чому перевірка `if (!frequency[char])`

Припустимо:

    str1 = "abc"

Counter:

    a → 1
    b → 1
    c → 1

А друга строка:

    "abd"

Коли зустрічаємо:

    d

у counter немає:

    d

Отже:

    !frequency["d"]

буде `true`.

Можна відразу повернути:

    false

---

# 27. Важливе питання: регістр

Чи є:

    "Listen"

і:

    "silent"

анаграмами?

Залежить від умови задачі.

Якщо регістр не має значення:

    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();

Потім виконуємо Frequency Counter.

---

# 28. Пробіли та символи

Так само потрібно знати умови задачі.

Наприклад:

    "rail safety"

і:

    "fairy tales"

Якщо пробіли ігноруються:

    str1.replaceAll(" ", "")

або можна нормалізувати дані іншим способом.

Головний принцип:

> **Спочатку визнач правила порівняння даних, потім будуйте counter.**

---

# 29. Frequency Counter для слів

Можна рахувати не символи, а слова.

Маємо:

    const text = "cat dog cat bird dog cat";

Розбиваємо:

    ["cat", "dog", "cat", "bird", "dog", "cat"]

Counter:

    cat  → 3
    dog  → 2
    bird → 1

---

# 30. Реалізація

    function wordFrequency(text) {
      const frequency = {};

      const words = text.split(" ");

      for (const word of words) {
        frequency[word] = (frequency[word] || 0) + 1;
      }

      return frequency;
    }

---

# 31. Реальні приклади

Frequency Counter може використовуватися для:

- кількості товарів певної категорії;
- кількості запитів до endpoint;
- кількості помилок певного типу;
- статистики відповідей;
- кількості оцінок;
- підрахунку тегів;
- кількості користувачів за ролями;
- аналізу логів;
- статистики пошуку.

---

# 32. Frequency Counter у Full Stack

Наприклад, backend отримав:

    [
      "frontend",
      "backend",
      "frontend",
      "database",
      "backend",
      "frontend"
    ]

Можна побудувати:

    {
      frontend: 3,
      backend: 2,
      database: 1
    }

Після цього API може повернути:

    {
      "frontend": 3,
      "backend": 2,
      "database": 1
    }

Frontend може використати ці дані для:

- статистики;
- графіка;
- таблиці;
- dashboard.

---

# 33. Frequency Counter + PostgreSQL

У database аналогічна задача часто вирішується SQL.

Наприклад, є:

    users

і поле:

    role

Можна отримати кількість користувачів кожної ролі через:

    SELECT role, COUNT(*)
    FROM users
    GROUP BY role;

Це фактично database-версія:

**Frequency Counter.**

---

# 34. JavaScript vs SQL

У JavaScript:

    const frequency = {};

    for (const user of users) {
      frequency[user.role] =
        (frequency[user.role] || 0) + 1;
    }

У PostgreSQL:

    SELECT role, COUNT(*)
    FROM users
    GROUP BY role;

Обидва рішення виконують концептуально схожу задачу:

    value → count

Але в Full Stack важливо вирішити:

> Де краще виконати aggregation?

Якщо даних багато, database часто має виконати таку операцію ефективніше, ніж передача всього dataset у Node.js.

---

# 35. Frequency Counter + `GROUP BY`

Це важливий Full Stack зв'язок:

    Frequency Counter
          ↓
    Group values
          ↓
    Count occurrences

У SQL:

    GROUP BY
        +
    COUNT()

Наприклад:

    SELECT category, COUNT(*) AS total
    FROM products
    GROUP BY category;

Результат:

    category | total
    ---------|------
    books    | 15
    phones   | 8
    laptops  | 5

---

# 36. Frequency Counter + `Map`

`Map` особливо зручний, коли ключі можуть бути не тільки рядками.

Наприклад:

    const frequency = new Map();

    for (const value of values) {
      frequency.set(
        value,
        (frequency.get(value) ?? 0) + 1
      );
    }

Перевага:

    Map

явно представляє структуру:

    key → value

У Frequency Counter:

    value → count

---

# 37. Частотний Counter для об'єктів

Маємо:

    const users = [
      { role: "student" },
      { role: "teacher" },
      { role: "student" },
      { role: "student" },
      { role: "teacher" }
    ];

Потрібно порахувати ролі.

    const frequency = {};

    for (const user of users) {
      const role = user.role;

      frequency[role] = (frequency[role] || 0) + 1;
    }

Результат:

    {
      student: 3,
      teacher: 2
    }

---

# 38. Частотний Counter для статусів

Наприклад:

    const orders = [
      { status: "pending" },
      { status: "completed" },
      { status: "pending" },
      { status: "cancelled" },
      { status: "completed" }
    ];

Counter:

    {
      pending: 2,
      completed: 2,
      cancelled: 1
    }

Це вже дуже близько до реального backend/data-processing коду.

---

# 39. Найчастіший елемент

Frequency Counter можна використати для пошуку mode.

Наприклад:

    [1, 2, 2, 3, 3, 3, 4]

Counter:

    1 → 1
    2 → 2
    3 → 3
    4 → 1

Найчастіший:

    3

---

# 40. Реалізація

    function mostFrequent(array) {
      const frequency = new Map();

      for (const value of array) {
        frequency.set(
          value,
          (frequency.get(value) ?? 0) + 1
        );
      }

      let result;
      let maxCount = 0;

      for (const [value, count] of frequency) {
        if (count > maxCount) {
          maxCount = count;
          result = value;
        }
      }

      return result;
    }

---

# 41. Complexity

Для:

    const numbers = [1, 2, 2, 3, 3, 3];

побудова counter:

    O(n)

прохід по counter:

    O(k)

де:

    k = кількість унікальних значень

Загалом:

    O(n + k)

Оскільки:

    k <= n

можна розглядати це як:

    O(n)

---

# 42. Space Complexity

Frequency Counter створює додаткову структуру.

Якщо всі значення унікальні:

    [1, 2, 3, 4, 5, 6, ...]

counter може містити:

    n

елементів.

Тому:

    Space: O(n)

у worst case.

---

# 43. Головний trade-off

Frequency Counter часто робить:

    Time:  O(n²) → O(n)

але за рахунок:

    Space: O(1) → O(n)

Тобто ми витрачаємо більше пам'яті, щоб заощадити час.

Це один із найважливіших принципів алгоритмів:

> **Trade time for space.**

---

# 44. Наївний підхід vs Frequency Counter

Припустимо:

    array = [1, 2, 2, 3, 3, 3]

Потрібно знайти frequency.

### Наївний підхід

Для кожного елемента знову рахувати його входження.

Концептуально:

    for each element
        scan entire array

Складність:

    O(n²)

### Frequency Counter

    scan array once
        ↓
    update counter

Складність:

    O(n)

Це і є причина використання pattern.

---

# 45. Frequency Counter vs `filter()`

Можна написати:

    const count = array.filter(
      value => value === target
    ).length;

Це нормально, якщо потрібно порахувати **одне конкретне значення**.

Але якщо потрібно порахувати всі значення:

    [1, 2, 2, 3, 3, 3]

то постійно використовувати `filter()` для кожного значення неефективно.

Frequency Counter робить це одним проходом.

---

# 46. Frequency Counter vs `Set`

`Set` зберігає:

    unique values

Frequency Counter зберігає:

    value → count

Наприклад:

    const numbers = [1, 2, 2, 3, 3];

`Set`:

    {1, 2, 3}

Frequency Counter:

    {
      1: 1,
      2: 2,
      3: 2
    }

---

# 47. Коли використовувати `Set`

Якщо питання:

> Чи зустрічався цей елемент?

використовуй:

    Set

Наприклад:

    const seen = new Set();

---

# 48. Коли використовувати Frequency Counter

Якщо питання:

> Скільки разів зустрічається цей елемент?

використовуй:

    Map
    або
    Object

---

# 49. `Set` + Frequency Counter

Іноді вони використовуються разом.

Наприклад:

    const frequency = new Map();
    const duplicates = new Set();

    for (const value of array) {
      const count = frequency.get(value) ?? 0;

      if (count > 0) {
        duplicates.add(value);
      }

      frequency.set(value, count + 1);
    }

---

# 50. Frequency Counter для чисел

    function countNumbers(numbers) {
      const frequency = new Map();

      for (const number of numbers) {
        frequency.set(
          number,
          (frequency.get(number) ?? 0) + 1
        );
      }

      return frequency;
    }

---

# 51. Frequency Counter для рядків

    function countCharacters(text) {
      const frequency = new Map();

      for (const char of text) {
        frequency.set(
          char,
          (frequency.get(char) ?? 0) + 1
        );
      }

      return frequency;
    }

---

# 52. Frequency Counter для слів

    function countWords(text) {
      const frequency = new Map();

      const words = text.split(/\s+/);

      for (const word of words) {
        frequency.set(
          word,
          (frequency.get(word) ?? 0) + 1
        );
      }

      return frequency;
    }

---

# 53. Нормалізація даних

У реальних задачах перед Counter часто потрібно нормалізувати дані.

Наприклад:

    "Hello"
    "hello"
    "HELLO"

Якщо регістр не має значення:

    value.toLowerCase()

Тоді:

    hello
    hello
    hello

і counter:

    hello → 3

---

# 54. Важливість умов задачі

Перед написанням Frequency Counter запитай:

- Чи має значення регістр?
- Чи потрібно ігнорувати пробіли?
- Чи враховувати punctuation?
- Чи можуть бути `null` / `undefined`?
- Чи всі значення одного типу?
- Чи потрібно рахувати всі значення?
- Чи потрібне тільки `true/false`?
- Чи важливий порядок?

Алгоритм залежить від вимог.

---

# 55. Frequency Counter Pattern — універсальний шаблон

    function countFrequency(array) {
      const frequency = new Map();

      for (const value of array) {
        const count = frequency.get(value) ?? 0;

        frequency.set(value, count + 1);
      }

      return frequency;
    }

Це хороший базовий шаблон для власної бібліотеки алгоритмічних вправ.

---

# 56. Pattern для порівняння двох наборів

Загальна схема:

    1. Побудувати counter для першого набору.
    2. Побудувати counter для другого набору.
    3. Порівняти ключі.
    4. Порівняти counts.
    5. Повернути true / false.

Схематично:

    array A
       ↓
    frequency A

    array B
       ↓
    frequency B

       ↓

    compare

       ↓

    true / false

---

# 57. Pattern для зменшення Counter

Є ще дуже корисна техніка.

Спочатку:

    frequency = {
      a: 2,
      b: 1,
      c: 1
    }

Потім при обробці другого набору:

    frequency[a]--
    frequency[b]--
    frequency[c]--

Якщо в будь-який момент значення не існує або його недостатньо:

    return false

Це дозволяє використовувати **один counter**.

---

# 58. Приклад

    function sameCharacters(str1, str2) {
      if (str1.length !== str2.length) {
        return false;
      }

      const frequency = {};

      for (const char of str1) {
        frequency[char] = (frequency[char] || 0) + 1;
      }

      for (const char of str2) {
        if (!frequency[char]) {
          return false;
        }

        frequency[char]--;
      }

      return true;
    }

---

# 59. Що відбувається з Counter

Для:

    "aabb"

отримуємо:

    a → 2
    b → 2

Обробляємо:

    "abab"

Після першого `a`:

    a → 1
    b → 2

Після `b`:

    a → 1
    b → 1

Після другого `a`:

    a → 0
    b → 1

Після другого `b`:

    a → 0
    b → 0

Отже:

    true

---

# 60. Frequency Counter і Complexity

Типова задача:

    compare two arrays

Наївний підхід:

    O(n²)

Frequency Counter:

    O(n)

за рахунок додаткової пам'яті:

    O(n)

Тому коли бачиш задачу:

> Compare two collections by frequency

подумай:

**Frequency Counter.**

---

# 61. Як розпізнати Frequency Counter задачу

Звертай увагу на формулювання:

- "how many times";
- "frequency";
- "occurrences";
- "duplicates";
- "same elements";
- "same number of elements";
- "same characters";
- "anagram";
- "most frequent";
- "count occurrences";
- "compare frequencies".

Це сильні сигнали для Frequency Counter.

---

# 62. Не кожна задача потребує Counter

Наприклад:

> Знайти максимальне число.

    [3, 8, 2, 10, 5]

Counter тут не потрібен.

Достатньо:

    let max = numbers[0];

    for (const number of numbers) {
      if (number > max) {
        max = number;
      }
    }

---

# 63. Не використовуй складніший pattern без потреби

Алгоритмічне мислення — це не:

> Знайти найскладніший алгоритм.

Це:

> Знайти найпростіший алгоритм, який відповідає вимогам.

Якщо потрібно просто:

    hasDuplicate(array)

то:

    new Set(array).size !== array.length

може бути простішим за повний Frequency Counter.

---

# 64. Практичні вправи — Beginner

## Exercise 1 — Count Numbers

Написати:

    countFrequency(numbers)

Приклад:

    countFrequency([1, 2, 2, 3, 3, 3]);

Результат:

    {
      1: 1,
      2: 2,
      3: 3
    }

---

## Exercise 2 — Count Characters

    countCharacters("hello");

Результат:

    {
      h: 1,
      e: 1,
      l: 2,
      o: 1
    }

---

## Exercise 3 — Count Words

    countWords("cat dog cat dog cat");

Результат:

    {
      cat: 3,
      dog: 2
    }

---

# 65. Практичні вправи — Junior

## Exercise 4 — Has Duplicate

Написати:

    hasDuplicate(array)

Приклади:

    hasDuplicate([1, 2, 3]);

    // false

    hasDuplicate([1, 2, 3, 2]);

    // true

---

## Exercise 5 — Most Frequent

    mostFrequent([1, 2, 2, 3, 3, 3]);

Результат:

    3

---

## Exercise 6 — Same Frequency

    sameFrequency(
      [1, 2, 2, 3],
      [3, 2, 1, 2]
    );

Результат:

    true

---

## Exercise 7 — Anagram

    areAnagrams("listen", "silent");

Результат:

    true

---

# 66. Практичні вправи — Junior+

## Exercise 8 — First Duplicate

Знайти перше значення, яке повторюється.

    firstDuplicate([5, 1, 3, 2, 1, 4]);

Результат:

    1

---

## Exercise 9 — Character Statistics

Для:

    "hello world"

отримати frequency символів.

Окремо вирішити:

- враховувати пробіли;
- ігнорувати пробіли;
- ignore case.

---

## Exercise 10 — Most Frequent Word

Для:

    "cat dog cat bird dog cat"

отримати:

    cat

---

# 67. Практичні вправи — Full Stack

## Exercise 11 — User Roles

Маємо:

    [
      { name: "Anna", role: "student" },
      { name: "Bob", role: "teacher" },
      { name: "John", role: "student" }
    ]

Побудувати:

    {
      student: 2,
      teacher: 1
    }

---

## Exercise 12 — Order Status Statistics

Маємо:

    [
      { status: "pending" },
      { status: "completed" },
      { status: "pending" },
      { status: "cancelled" }
    ]

Отримати:

    {
      pending: 2,
      completed: 1,
      cancelled: 1
    }

---

## Exercise 13 — PostgreSQL

Створити SQL-запит для підрахунку кількості користувачів кожної ролі:

    SELECT role, COUNT(*)
    FROM users
    GROUP BY role;

---

## Exercise 14 — API Statistics

Створити endpoint:

    GET /statistics/users

Який повертає:

    {
      "student": 25,
      "teacher": 5,
      "director": 1
    }

---

# 68. Frequency Counter + Searching

Frequency Counter часто замінює багаторазовий Searching.

Замість:

    search
    search
    search
    search
    ...

можна:

    scan once
       ↓
    build frequency table
       ↓
    O(1) average lookup

Наприклад:

    const frequency = new Map();

Після побудови:

    frequency.get(value)

може виконуватися в середньому за:

    O(1)

---

# 69. Frequency Counter + Sorting

Іноді задачу можна вирішити двома способами.

Наприклад, перевірка анаграм.

### Варіант 1

    sort
    compare

### Варіант 2

    frequency counter
    compare counts

Sorting:

    O(n log n)

Frequency Counter:

    O(n)

але використовує:

    O(n)

додаткової пам'яті.

Тому це хороший приклад алгоритмічного trade-off.

---

# 70. Frequency Counter + Two Pointers

Frequency Counter і Two Pointers — різні patterns.

### Frequency Counter

    value → count

### Two Pointers

    left → →
    right → ←

Не потрібно змішувати їх без потреби.

Але в деяких задачах вони можуть використовуватися разом.

Наприклад:

    sort
      ↓
    two pointers

або:

    frequency counter
      ↓
    eliminate repeated search

---

# 71. Frequency Counter + Sliding Window

Frequency Counter часто стає частиною Sliding Window.

Наприклад, потрібно знати:

> Скільки разів кожен символ зустрічається в поточному вікні?

Тоді:

    window
       ↓
    frequency map
       ↓
    add / remove characters

У нашій структурі `Sliding Window` буде окремою темою, тому тут достатньо запам'ятати зв'язок.

---

# 72. Frequency Counter + Recursion

Frequency Counter може використовуватися і разом із recursion.

Наприклад:

- аналіз дерева;
- підрахунок значень;
- рекурсивний traversal;
- статистика елементів.

Але сам Frequency Counter не є рекурсивним алгоритмом.

Це важлива відмінність.

---

# 73. Object як Counter — обмеження

При використанні:

    const frequency = {};

потрібно пам'ятати, що JavaScript object — це не спеціалізована структура Frequency Counter.

Для складніших випадків `Map` часто є більш явним вибором:

    const frequency = new Map();

---

# 74. `??` vs `||`

Для Counter часто можна побачити:

    frequency[value] || 0

або:

    frequency.get(value) ?? 0

`??` перевіряє:

    null
    undefined

`||` реагує на всі falsy values:

    false
    0
    ""
    null
    undefined
    NaN

Для `Map` із числовим counter:

    map.get(value) ?? 0

дуже добре передає зміст:

> якщо значення ще немає — почати з 0.

---

# 75. Frequency Counter — головний шаблон для масивів

    const frequency = new Map();

    for (const value of array) {
      frequency.set(
        value,
        (frequency.get(value) ?? 0) + 1
      );
    }

Після цього:

    frequency.get(value)

дає кількість входжень.

---

# 76. Frequency Counter — головний шаблон для рядків

    const frequency = new Map();

    for (const char of text) {
      frequency.set(
        char,
        (frequency.get(char) ?? 0) + 1
      );
    }

---

# 77. Frequency Counter — головний шаблон для об'єктів

    const frequency = new Map();

    for (const item of items) {
      const key = item.category;

      frequency.set(
        key,
        (frequency.get(key) ?? 0) + 1
      );
    }

---

# 78. Frequency Counter — головний шаблон порівняння

    function sameFrequency(array1, array2) {
      if (array1.length !== array2.length) {
        return false;
      }

      const frequency1 = countFrequency(array1);
      const frequency2 = countFrequency(array2);

      for (const [value, count] of frequency1) {
        if (frequency2.get(value) !== count) {
          return false;
        }
      }

      return true;
    }

---

# 79. Типові помилки

## Помилка 1 — забути збільшувати counter

Неправильно:

    frequency[value] = 1;

Це кожного разу скидає значення.

Правильно:

    frequency[value] = (frequency[value] || 0) + 1;

---

## Помилка 2 — не перевірити різну довжину

При порівнянні двох масивів:

    array1.length !== array2.length

можна відразу повернути:

    false

---

## Помилка 3 — порівнювати тільки унікальні значення

Наприклад:

    [1, 2, 2]

і:

    [1, 1, 2]

мають однакові unique values:

    {1, 2}

але різні frequency.

Тому:

    Set

недостатньо, якщо важлива кількість повторень.

---

## Помилка 4 — використовувати sorting без потреби

Для Anagram:

    sort()

може працювати.

Але Frequency Counter може дати:

    O(n)

замість:

    O(n log n)

---

## Помилка 5 — забути про Space Complexity

Counter створює додаткову структуру.

Тому потрібно пам'ятати:

    Time:  O(n)
    Space: O(n)

у типовому worst case.

---

# 80. Edge Cases

Перевіряй:

### Порожній масив

    []

### Один елемент

    [5]

### Усі значення однакові

    [5, 5, 5, 5]

### Усі значення різні

    [1, 2, 3, 4]

### Від'ємні числа

    [-1, -1, 2]

### Рядок порожній

    ""

### Один символ

    "a"

### Різний регістр

    "A"
    "a"

### Пробіли

    "hello world"

### Unicode

    "їжак"

### `null` / `undefined`

Якщо вони дозволені умовою задачі, їх потрібно обробити явно.

---

# 81. Interview Questions

## Basic

### 1. Що таке Frequency Counter?

Алгоритмічний pattern, який використовує структуру даних для зберігання кількості входжень кожного значення.

---

### 2. Які структури даних можна використовувати?

Найчастіше:

    Object
    Map

Іноді:

    Set

але `Set` зберігає тільки унікальні значення і не зберігає frequency.

---

### 3. Яка типова Time Complexity?

Побудова counter:

    O(n)

---

### 4. Яка Space Complexity?

У worst case:

    O(n)

якщо всі значення унікальні.

---

# 82. Interview — Algorithmic Thinking

### 5. Навіщо використовувати Frequency Counter?

Щоб уникнути повторних проходів по даних і зменшити час виконання, часто з:

    O(n²)

до:

    O(n)

за рахунок додаткової пам'яті.

---

### 6. Який основний trade-off?

    більше пам'яті
        ↓
    менше часу

Тобто:

    Time ↔ Space

---

### 7. Коли краще використовувати Set?

Коли потрібно знати:

    чи існує значення

а не:

    скільки разів воно зустрічається.

---

### 8. Чим Frequency Counter відрізняється від Searching?

Searching відповідає:

    "Чи є / де знаходиться цей елемент?"

Frequency Counter будує:

    "Скільки разів зустрічається кожен елемент?"

---

# 83. Interview — Practical

### 9. Як знайти найчастіший елемент?

1. Побудувати frequency map.
2. Пройти по map.
3. Зберігати максимальний count.
4. Повернути відповідне значення.

---

### 10. Як перевірити анаграму?

Варіанти:

    sort + compare

або:

    frequency counter + compare

---

### 11. Як знайти дублікати?

Можна використовувати:

    Set

або:

    Frequency Counter

Залежно від того, чи потрібно знати тільки факт дубліката, чи кількість повторень.

---

# 84. Практичний алгоритм розв'язання задачі

Коли бачиш задачу, спочатку запитай:

### Крок 1

Чи потрібно рахувати входження?

    yes
      ↓
    Frequency Counter

---

### Крок 2

Чи потрібно порівнювати два набори за кількістю?

    yes
      ↓
    Frequency Counter

---

### Крок 3

Чи потрібно тільки знати, чи значення вже зустрічалося?

    yes
      ↓
    Set

---

### Крок 4

Чи можна вирішити задачу простим проходом?

    yes
      ↓
    можливо, Counter не потрібен

---

### Крок 5

Проаналізувати:

    Time
    Space

---

# 85. Алгоритмічне мислення

Frequency Counter вчить дуже важливій зміні мислення.

Замість:

    "Як мені кожного разу знайти це значення?"

потрібно подумати:

    "Чи можу я один раз пройти всі дані
     і підготувати структуру,
     яка дасть мені швидкий доступ
     до потрібної інформації?"

Це вже не просто знання JavaScript.

Це:

**algorithmic thinking.**

---

# 86. Frequency Counter як підготовка до Data Structures

Pattern базується на ідеї:

    Data
      ↓
    auxiliary structure
      ↓
    fast lookup

Найчастіше:

    Array
      ↓
    Map
      ↓
    value → count

Це хороший перехід від простих масивів до:

- Map;
- Set;
- Hash Table concept;
- lookup;
- aggregation.

---

# 87. Hash Table Concept

`Object` і `Map` часто використовуються для реалізації ідей, пов'язаних із:

**Hash Table**

Тому Frequency Counter — хороша практична вправа для розуміння:

    key
      ↓
    value
      ↓
    fast lookup

У середньому lookup для `Map` / hash-table-подібних структур часто розглядається як:

    O(1)

але конкретні гарантії та реалізація залежать від структури та середовища.

---

# 88. Frequency Counter у реальному програмуванні

Цей pattern не обмежується interview tasks.

Він використовується для:

    logs
      ↓
    count error types

    users
      ↓
    count roles

    orders
      ↓
    count statuses

    products
      ↓
    count categories

    text
      ↓
    count words

    requests
      ↓
    count endpoints

    events
      ↓
    count event types

---

# 89. Frequency Counter у Full Stack-проєкті

Наприклад, у навчальному Education App:

    students
       ↓
    course_id
       ↓
    frequency

можна отримати:

    Course A → 25 students
    Course B → 18 students
    Course C → 7 students

На Frontend це можна відобразити як:

    Dashboard
       ↓
    statistics

А в PostgreSQL аналогічна задача:

    SELECT course_id, COUNT(*)
    FROM enrollments
    GROUP BY course_id;

---

# 90. Що потрібно знати Junior

Для Junior потрібно впевнено розуміти:

### Concept

    Frequency Counter
    value → count

### JavaScript

    Object
    Map
    Set

### Patterns

    count occurrences
    compare frequencies
    find duplicates
    find most frequent

### Complexity

    O(n)
    O(n²)
    O(n) space

### Related topics

    Searching
    Sorting
    Hash Table
    Set / Map

---

# 91. Що потрібно знати Junior+

Можна переходити до:

- Frequency Counter + Two Pointers;
- Frequency Counter + Sliding Window;
- Frequency Counter + Strings;
- Frequency Counter + Arrays;
- Frequency Counter + objects;
- оптимізація пам'яті;
- single-counter comparison;
- multi-counter comparison;
- статистичні задачі;
- aggregation.

---

# 92. Що потрібно знати Middle

На Middle важливо вже думати не:

> "Я знаю Frequency Counter."

а:

> "Чи є тут можливість попередньо обробити дані?"

Потрібно вміти оцінювати:

- Time Complexity;
- Space Complexity;
- memory constraints;
- size of dataset;
- streaming data;
- database aggregation;
- caching;
- indexing;
- `GROUP BY`;
- trade-offs між Frontend / Backend / Database.

---

# 93. Міні-шпаргалка

## Count array

    const frequency = new Map();

    for (const value of array) {
      frequency.set(
        value,
        (frequency.get(value) ?? 0) + 1
      );
    }

---

## Count characters

    const frequency = new Map();

    for (const char of text) {
      frequency.set(
        char,
        (frequency.get(char) ?? 0) + 1
      );
    }

---

## Check existence

    frequency.has(value);

---

## Get count

    frequency.get(value);

---

## Set count

    frequency.set(value, count);

---

## Set for duplicates

    const unique = new Set(array);

    const hasDuplicates =
      unique.size !== array.length;

---

## SQL equivalent

    SELECT category, COUNT(*)
    FROM products
    GROUP BY category;

---

# 94. Головна карта Frequency Counter

    Frequency Counter
          │
          ├── Core idea
          │     └── value → count
          │
          ├── Structures
          │     ├── Object
          │     ├── Map
          │     └── Set
          │
          ├── Problems
          │     ├── Count occurrences
          │     ├── Duplicates
          │     ├── Anagram
          │     ├── Same frequency
          │     └── Most frequent
          │
          ├── Complexity
          │     ├── Time O(n)
          │     └── Space O(n)
          │
          ├── Related Patterns
          │     ├── Searching
          │     ├── Sorting
          │     ├── Two Pointers
          │     └── Sliding Window
          │
          └── Full Stack
                ├── JavaScript
                ├── Node.js
                ├── API
                ├── PostgreSQL
                └── GROUP BY + COUNT()

---

# 95. Головне, що потрібно запам'ятати

Frequency Counter — це не:

    "ще один метод JavaScript"

Це спосіб мислення:

    багаторазово шукати
          ↓
    замінити
          ↓
    одним проходом побудувати структуру
          ↓
    швидко отримувати інформацію

Основний шаблон:

    data
      ↓
    Map / Object
      ↓
    value → count
      ↓
    fast lookup

Головний trade-off:

    Space O(n)
       ↕
    Time O(n)

І головний практичний сигнал:

> **Якщо задача питає про кількість входжень, частоти, дублікати, однакові набори елементів або анаграми — подумай про Frequency Counter.**

---