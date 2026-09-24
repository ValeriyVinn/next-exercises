# 10. Complexity Basics

## 📌 Що таке Complexity

**Complexity** — це спосіб оцінити, скільки ресурсів потребує алгоритм залежно від розміру вхідних даних.

Основні ресурси:

- **Time Complexity** — скільки операцій потрібно виконати;
- **Space Complexity** — скільки додаткової пам'яті потрібно.

Найчастіше для опису складності використовують:

> **Big O notation**

Наприклад:

    O(1)
    O(log n)
    O(n)
    O(n log n)
    O(n²)
    O(2ⁿ)

---

# 📁 Місце в структурі

    09-algorithms-and-logic/
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

---

# 🧠 Головна ідея

Коли ми пишемо алгоритм, недостатньо запитати:

> «Чи працює цей код?»

Потрібно також запитати:

> «Як він поводитиметься, якщо даних стане в 10, 100 або 1 000 000 разів більше?»

Наприклад:

    for (const item of items) {
      console.log(item);
    }

Для:

    10 items

приблизно:

    10 iterations

Для:

    1,000 items

приблизно:

    1,000 iterations

Для:

    1,000,000 items

приблизно:

    1,000,000 iterations

Залежність від `n`:

    O(n)

---

# 📌 Що таке `n`

У Big O:

    n

зазвичай означає:

> розмір вхідних даних.

Наприклад:

    const numbers = [1, 2, 3, 4, 5];

Тут:

    n = 5

Якщо:

    numbers.length = 1000

то:

    n = 1000

---

# 🔥 Big O

**Big O notation** описує, як змінюється кількість роботи алгоритму при збільшенні розміру input.

Наприклад:

    O(n)

означає приблизно:

> якщо input збільшиться вдвічі, кількість роботи теж зросте приблизно вдвічі.

А:

    O(n²)

означає приблизно:

> якщо input збільшиться вдвічі, кількість роботи зросте приблизно в чотири рази.

---

# 📊 Основні складності

Для початкового рівня потрібно добре знати:

| Complexity   | Назва        | Інтуїція                 |
|--------------|--------------|--------------------------|
| `O(1)`       | Constant     | не залежить від `n`      |
| `O(log n)`   | Logarithmic  | поступово ділить задачу  |
| `O(n)`       | Linear       | один прохід              |
| `O(n log n)` | Linearithmic | ефективне сортування     |
| `O(n²)`      | Quadratic    | вкладений перебір        |
| `O(2ⁿ)`      | Exponential  | швидко росте             |
| `O(n!)`      | Factorial    | надзвичайно швидко росте |

---

# 🟢 O(1) — Constant

**O(1)** означає, що кількість операцій не залежить від розміру input.

Наприклад:

    function getFirst(numbers) {
      return numbers[0];
    }

Неважливо:

    10 elements
    1,000 elements
    1,000,000 elements

Ми беремо один елемент.

    Time: O(1)

---

# 🔥 Ще приклади O(1)

    const first = numbers[0];

    const last = numbers[numbers.length - 1];

    const value = object.name;

    map.get("user");

    set.has("admin");

У типових випадках:

    Array index access → O(1)
    Object property access → O(1) average
    Map.get() → O(1) average
    Map.set() → O(1) average
    Set.has() → O(1) average

Але ці оцінки для структур даних варто сприймати як типові/середні, а не як абсолютну гарантію для будь-якої реалізації чи ситуації.

---

# 🟢 O(n) — Linear

Алгоритм проходить input один раз.

    function printNumbers(numbers) {
      for (const number of numbers) {
        console.log(number);
      }
    }

Якщо:

    n = 10

приблизно:

    10 iterations

Якщо:

    n = 1000

приблизно:

    1000 iterations

Отже:

    O(n)

---

# 🔥 Лінійний пошук

    function linearSearch(numbers, target) {
      for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === target) {
          return i;
        }
      }

      return -1;
    }

У найгіршому випадку потрібно перевірити весь масив:

    O(n)

---

# 🟢 Два послідовні цикли

Наприклад:

    function process(numbers) {
      for (const number of numbers) {
        console.log(number);
      }

      for (const number of numbers) {
        console.log(number * 2);
      }
    }

Маємо:

    O(n) + O(n)

    = O(2n)

У Big O константний множник зазвичай відкидаємо:

    O(2n)
      ↓
    O(n)

Тому:

    Time: O(n)

---

# 📌 Чому відкидаємо константи

Big O цікавить насамперед **темп зростання**.

Наприклад:

    O(n)
    O(2n)
    O(100n)

усі мають лінійний характер зростання.

Тому для асимптотичної оцінки:

    O(100n) → O(n)

Але це не означає, що `100n` фізично дорівнює `n`.

Це означає, що вони мають однаковий порядок зростання.

---

# 🟡 O(log n) — Logarithmic

`O(log n)` виникає, коли на кожному кроці задача значно зменшується, наприклад:

    n
    ↓
    n / 2
    ↓
    n / 4
    ↓
    n / 8
    ↓
    ...

Класичний приклад:

> Binary Search

---

# 🔥 Binary Search

Маємо:

    [1, 3, 5, 7, 9, 11, 13]

Шукаємо:

    9

Перевіряємо середину:

    [1, 3, 5, 7, 9, 11, 13]
             ↑
             7

Оскільки:

    9 > 7

відкидаємо ліву половину.

Залишається:

    [9, 11, 13]

Знову ділимо.

Тобто на кожному кроці область пошуку приблизно:

    / 2

Тому:

    Time: O(log n)

---

# 📌 Логарифмічна складність

Для великого `n`:

    O(log n)

росте набагато повільніше, ніж:

    O(n)

Наприклад, для мільйона елементів:

    log₂(1,000,000) ≈ 20

Тому Binary Search може знайти елемент приблизно за 20 кроків у сприятливій моделі пошуку.

---

# 🟡 O(n log n)

Це поширена складність ефективних алгоритмів сортування.

Класичні приклади:

    Merge Sort
    Heap Sort
    Quick Sort
      ↓
    average O(n log n)

Також `O(n log n)` часто виникає, коли:

    O(log n)
        ×
    O(n)

---

# 🔥 Приклад

Уявімо:

    for (const item of items) {
      binarySearch(data, item);
    }

Якщо:

    for → O(n)

а:

    binarySearch → O(log n)

то:

    O(n × log n)

Отримуємо:

    O(n log n)

---

# 🟠 O(n²) — Quadratic

Найчастіше виникає через вкладені цикли, які перебирають дані.

Наприклад:

    function printPairs(numbers) {
      for (const first of numbers) {
        for (const second of numbers) {
          console.log(first, second);
        }
      }
    }

Для кожного елемента:

    n

ми перебираємо:

    n

елементів.

Отже:

    n × n

    = n²

    Time: O(n²)

---

# 🔥 Візуально

Для:

    [A, B, C]

отримуємо:

    A A
    A B
    A C

    B A
    B B
    B C

    C A
    C B
    C C

Кількість комбінацій:

    3 × 3 = 9

Для:

    n = 1000

буде приблизно:

    1,000 × 1,000
    = 1,000,000

операцій.

---

# ⚠️ Не кожен вкладений цикл автоматично O(n²)

Це дуже важливий момент.

Наприклад:

    let j = 0;

    for (let i = 0; i < n; i++) {
      while (j < n) {
        j++;
      }
    }

На перший погляд:

    for + while

може здатися:

    O(n²)

Але `j` збільшується тільки до `n` за весь час.

Тому загалом:

    O(n)

Це схоже на те, що ми розглядали у Sliding Window.

Потрібно рахувати **загальну кількість операцій**, а не просто кількість циклів у коді.

---

# 🔴 O(2ⁿ) — Exponential

Експоненційна складність росте дуже швидко.

Класичний приклад:

> Наївний рекурсивний Fibonacci.

    function fibonacci(n) {
      if (n <= 1) {
        return n;
      }

      return (
        fibonacci(n - 1) +
        fibonacci(n - 2)
      );
    }

Кожен виклик породжує приблизно два нових виклики.

Складність наївної реалізації:

    приблизно O(2ⁿ)

---

# 📊 Зростання

Умовно:

    n = 10
    2^n = 1,024

    n = 20
    2^n = 1,048,576

    n = 30
    2^n = 1,073,741,824

Саме тому експоненційні алгоритми дуже швидко стають непридатними для великих `n`.

---

# 🔴 O(n!) — Factorial

Ще швидше росте:

    O(n!)

Наприклад, кількість перестановок `n` елементів:

    n!

Для:

    n = 5

маємо:

    5! = 120

Для:

    n = 10

маємо:

    10! = 3,628,800

Для:

    n = 15

маємо:

    15! = 1,307,674,368,000

Тому алгоритми з `O(n!)` зазвичай застосовуються тільки до невеликих input або потребують оптимізації/обрізання пошуку.

---

# 📈 Порядок зростання

Від кращої масштабованості до гіршої:

    O(1)
      ↓
    O(log n)
      ↓
    O(n)
      ↓
    O(n log n)
      ↓
    O(n²)
      ↓
    O(2ⁿ)
      ↓
    O(n!)

Це дуже корисна схема для співбесіди.

Але:

> «Краща Big O» не означає автоматично швидший код для будь-якого малого input.

На практиці мають значення також:

- константи;
- розмір даних;
- структура даних;
- пам'ять;
- кешування;
- реалізація;
- I/O;
- база даних;
- мережа.

---

# 🧠 Big O — не точний час

Якщо алгоритм:

    O(n)

це не означає:

    1 operation × n

точно.

Наприклад:

    10n + 50

має:

    O(n)

Big O описує порядок зростання, а не точну кількість CPU-операцій або час у мілісекундах.

---

# 📌 Best Case / Average Case / Worst Case

Один алгоритм може мати різну поведінку залежно від input.

Наприклад:

    linearSearch(
      [10, 20, 30, 40],
      10
    );

Елемент знаходиться одразу.

Best Case:

    O(1)

Якщо елемент в кінці:

    [10, 20, 30, 40]

пошук може перевірити весь масив.

Worst Case:

    O(n)

Тому потрібно розуміти, про який випадок ми говоримо.

---

# 🧠 Best Case

Найсприятливіший input.

Наприклад:

    target === numbers[0]

Для Linear Search:

    O(1)

---

# 🧠 Worst Case

Найгірший input.

Наприклад:

    target
    знаходиться останнім

або:

    target
    відсутній

Для Linear Search:

    O(n)

---

# 🧠 Average Case

Середня поведінка на типовому наборі input.

Вона залежить від припущень про розподіл даних.

Тому коли говориш про складність на співбесіді, корисно уточнювати:

    Best Case
    Average Case
    Worst Case

---

# 📌 Space Complexity

Time Complexity — це час/кількість роботи.

Space Complexity — це пам'ять.

Наприклад:

    function first(numbers) {
      return numbers[0];
    }

Додаткова пам'ять:

    O(1)

---

# 🔥 O(n) Space

Наприклад:

    function copyArray(numbers) {
      const result = [];

      for (const number of numbers) {
        result.push(number);
      }

      return result;
    }

Створюється новий масив розміру `n`.

Тому:

    Time:  O(n)
    Space: O(n)

---

# 📌 Input Space vs Auxiliary Space

Важливе розрізнення.

Якщо функція отримує:

    numbers

цей масив уже існує як input.

Коли говоримо про **Auxiliary Space**, зазвичай оцінюємо додаткову пам'ять, яку алгоритм створює під час роботи, не рахуючи сам input.

Наприклад:

    function sum(numbers) {
      let total = 0;

      for (const number of numbers) {
        total += number;
      }

      return total;
    }

Тут:

    Time: O(n)
    Auxiliary Space: O(1)

---

# 🔥 In-place Algorithm

**In-place** алгоритм працює без створення великої додаткової структури даних.

Наприклад:

    function reverse(numbers) {
      let left = 0;
      let right = numbers.length - 1;

      while (left < right) {
        [
          numbers[left],
          numbers[right]
        ] = [
          numbers[right],
          numbers[left]
        ];

        left++;
        right--;
      }

      return numbers;
    }

Додаткова пам'ять:

    O(1)

---

# 🧠 Mutation

Але тут є важливий компроміс.

Алгоритм:

    reverse(numbers)

змінює початковий масив.

Якщо не хочемо mutation:

    const reversed = reverse([...numbers]);

Тоді копіювання масиву потребує:

    O(n)

додаткової пам'яті.

Отже:

    In-place
        ↓
    O(1) extra space
        ↓
    але може змінювати input

---

# 📌 Nested Loops

Розглянемо:

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        // work
      }
    }

Отримуємо:

    O(n²)

---

# 🔥 Три вкладені цикли

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        for (let k = 0; k < n; k++) {
          // work
        }
      }
    }

Отримуємо:

    O(n³)

---

# 📌 Послідовні цикли

    for (...) {
      // O(n)
    }

    for (...) {
      // O(n)
    }

    for (...) {
      // O(n)
    }

Разом:

    O(n) + O(n) + O(n)

    O(3n)

    O(n)

---

# 🧠 Різні input sizes

Якщо:

    for (const user of users) {
      ...
    }

і:

    for (const post of posts) {
      ...
    }

то не завжди можна записати:

    O(n)

Якщо розміри незалежні:

    users = n
    posts = m

маємо:

    O(n + m)

---

# 🔥 Вкладені різні input

Наприклад:

    for (const user of users) {
      for (const post of posts) {
        // work
      }
    }

Тоді:

    O(n × m)

або:

    O(nm)

Не можна автоматично писати:

    O(n²)

якщо `n` і `m` — незалежні розміри.

---

# 📌 Dominant Term

Наприклад:

    O(n² + n)

Для великих `n` домінує:

    n²

Тому:

    O(n² + n)
      ↓
    O(n²)

Ще приклад:

    O(n³ + n² + n)

    ↓

    O(n³)

---

# 🧠 Чому відкидаємо менші члени

Big O описує поведінку при великих значеннях `n`.

Наприклад:

    n² + n

при великому `n`:

    n²

значно переважає:

    n

Тому:

    O(n² + n)
    =
    O(n²)

---

# 📌 Common JavaScript Operations

Для практики JavaScript корисно мати базове уявлення:

| Операція | Типова складність |
|---|---|
| `array[index]` | `O(1)` |
| `array.push()` | `O(1)` amortized |
| `array.pop()` | `O(1)` |
| `array.shift()` | `O(n)` |
| `array.unshift()` | `O(n)` |
| `array.includes()` | `O(n)` |
| `array.indexOf()` | `O(n)` |
| `array.find()` | `O(n)` |
| `array.filter()` | `O(n)` |
| `array.map()` | `O(n)` |
| `array.sort()` | залежить від engine / реалізації; зазвичай аналізують як `O(n log n)` для практичної оцінки |
| `Set.has()` | `O(1)` average |
| `Map.get()` | `O(1)` average |

---

# ⚠️ `shift()` vs `pop()`

Це дуже хороший практичний приклад.

### `pop()`

Видаляє останній елемент:

    numbers.pop();

Типово:

    O(1)

### `shift()`

Видаляє перший:

    numbers.shift();

Після цього інші елементи можуть потребувати переміщення індексів.

Типово:

    O(n)

Тому при великих масивах вибір структури/операції має значення.

---

# 📌 `includes()` vs `Set.has()`

Маємо:

    numbers.includes(target);

Для масиву:

    O(n)

бо може знадобитися пройти весь масив.

Якщо часто виконуємо перевірку належності:

    const values = new Set(numbers);

тоді типова перевірка:

    values.has(target);

має:

    O(1) average

Але створення Set саме по собі:

    O(n)

і використовує:

    O(n)

додаткової пам'яті.

Отже, потрібно дивитися на **загальний алгоритм**, а не на одну операцію.

---

# 🔥 Приклад оптимізації

Повторюємо пошук багато разів:

    for (const target of targets) {
      if (numbers.includes(target)) {
        ...
      }
    }

Якщо:

    numbers.length = n
    targets.length = m

може бути:

    O(nm)

Можна побудувати Set:

    const values = new Set(numbers);

    for (const target of targets) {
      if (values.has(target)) {
        ...
      }
    }

Побудова:

    O(n)

Пошуки:

    O(m)

Разом типово:

    O(n + m)

Це класичний приклад:

    більше пам'яті
          ↓
    менше повторної роботи

---

# 🧠 Time vs Space Trade-off

Часто можна обміняти:

    Space

на:

    Time

Наприклад:

    Array
      ↓
    O(n) search

перетворюємо на:

    Set
      ↓
    O(1) average lookup

але:

    Set
      ↓
    потребує додаткової пам'яті

Це називається:

> **Time-Space Trade-off**

---

# 🔥 Frequency Counter як приклад оптимізації

Наївний підхід:

    for each character:
      search/count occurrences

може призвести до:

    O(n²)

Frequency Counter:

    Map
      ↓
    один прохід
      ↓
    O(n)

Типова схема:

    const frequency = new Map();

    for (const char of text) {
      frequency.set(
        char,
        (frequency.get(char) ?? 0) + 1
      );
    }

Складність:

    Time: O(n)
    Space: O(k)

де `k` — кількість різних символів.

---

# 🔥 Two Pointers як приклад оптимізації

Наївний пошук пари:

    for (let i = 0; i < numbers.length; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        // check pair
      }
    }

Складність:

    O(n²)

Для відсортованого масиву можна застосувати:

    Two Pointers

і отримати:

    O(n)

після того, як дані вже відсортовані.

Якщо сортування також потрібне:

    O(n log n) + O(n)

Отже загалом:

    O(n log n)

---

# 🔥 Sliding Window як приклад оптимізації

Наївний підхід:

    для кожного вікна
      заново рахувати всі елементи

може бути:

    O(nk)

Sliding Window:

    add new
    remove old
    update state

часто дає:

    O(n)

Це одна з найважливіших практичних оптимізацій у цьому розділі.

---

# 🔥 Binary Search як приклад оптимізації

Linear Search:

    O(n)

Binary Search:

    O(log n)

Але Binary Search потребує відповідної структури даних/умови, зокрема для стандартного масиву — відсортованого порядку.

Тому не можна просто замінити:

    O(n)

на:

    O(log n)

без виконання необхідних передумов.

---

# 📌 Sorting Complexity

Для базового рівня корисно знати:

    Bubble Sort
        O(n²)

    Selection Sort
        O(n²)

    Insertion Sort
        O(n²) average/worst
        O(n) best case для вже майже/повністю відсортованих даних

    Merge Sort
        O(n log n)

    Quick Sort
        O(n log n) average
        O(n²) worst case

Точні характеристики залежать від реалізації та умов.

---

# 🧠 Complexity і Recursion

Рекурсія додає ще один аспект:

    recursion depth

Наприклад:

    function count(n) {
      if (n === 0) {
        return;
      }

      count(n - 1);
    }

Глибина:

    O(n)

Отже додаткова пам'ять Call Stack:

    O(n)

---

# 🔥 Fibonacci

Наївний:

    function fibonacci(n) {
      if (n <= 1) {
        return n;
      }

      return (
        fibonacci(n - 1) +
        fibonacci(n - 2)
      );
    }

Приблизно:

    Time: O(2ⁿ)
    Space: O(n)

з точки зору максимальної глибини рекурсивного стеку.

З memoization:

    Time: O(n)
    Space: O(n)

Тут добре видно силу оптимізації повторних обчислень.

---

# 📌 Recursion Tree

При аналізі рекурсії корисно намалювати дерево.

Наприклад:

    fib(5)
       / \
    fib4 fib3
     / \
   ... ...

Якщо кожен виклик породжує кілька нових викликів, кількість операцій може рости експоненційно.

Тому recursion tree — хороший інструмент для розуміння:

    Time Complexity

---

# 🧠 Complexity не треба рахувати до кожної інструкції

Для Junior-рівня достатньо навчитися бачити основну структуру:

    один прохід
        ↓
    O(n)

    два вкладені проходи
        ↓
    O(n²)

    ділення навпіл
        ↓
    O(log n)

    ефективне сортування
        ↓
    O(n log n)

    рекурсивне розгалуження
        ↓
    можливо O(2ⁿ)

---

# ⚠️ Big O не враховує все

Big O — це абстрактна модель.

Реальна продуктивність залежить також від:

- CPU;
- RAM;
- cache;
- JavaScript engine;
- browser;
- Node.js;
- database;
- network;
- disk I/O;
- розміру об'єктів;
- констант;
- garbage collection.

Наприклад:

    O(n)

алгоритм із великою константою може бути повільнішим за:

    O(n²)

для дуже маленького `n`.

Але при достатньо великому `n` асимптотичне зростання стає важливим.

---

# 🌐 Complexity у Full Stack

Complexity — не лише тема для coding interview.

У Full Stack вона зустрічається всюди:

    Browser
       ↓
    JavaScript
       ↓
    React
       ↓
    API
       ↓
    Node.js
       ↓
    PostgreSQL

На кожному рівні є питання:

> Скільки роботи потрібно виконати?

---

# 🟢 Frontend

Наприклад:

    users.map(...)
    
це приблизно:

    O(n)

Якщо всередині кожного користувача:

    users.map(user => {
      posts.find(...)
    });

і `posts.find()` — `O(m)`, тоді:

    O(nm)

Для великих даних це може бути проблемою.

---

# 🟢 Backend

Наприклад:

    for (const user of users) {
      // processing
    }

має:

    O(n)

Але якщо всередині кожного користувача робити окремий пошук або запит:

    for (const user of users) {
      await database.query(...);
    }

проблема вже не тільки в Big O JavaScript.

Тут з'являються:

    database latency
    network / I/O
    number of queries
    N+1 problem

Тому Full Stack complexity потрібно розглядати ширше, ніж лише цикли.

---

# 🗄️ PostgreSQL

У базі даних також існують алгоритмічні та performance-питання:

    SELECT
    WHERE
    JOIN
    ORDER BY
    GROUP BY

Особливо важливі:

    indexes
    query plans
    sequential scan
    index scan
    joins

Тут не можна просто переносити JavaScript Big O один-в-один на SQL.

Але принцип той самий:

> Потрібно розуміти, як зростатиме вартість операції зі збільшенням даних.

---

# 🔥 Database vs JavaScript

Припустимо, у тебе:

    1,000,000 rows

Не завжди правильно:

    SELECT *
    FROM table;

а потім:

    Node.js
      ↓
    filter(...)
      ↓
    find(...)
      ↓
    map(...)

Можливо, краще:

    PostgreSQL
      ↓
    WHERE
      ↓
    ORDER BY
      ↓
    LIMIT
      ↓
    тільки потрібні дані
      ↓
    Node.js

Це вже не просто питання Big O.

Це питання:

    data processing
    +
    network transfer
    +
    database optimization
    +
    memory
    +
    latency

---

# 📌 Complexity у твоєму Full Stack workflow

Корисно мислити так:

    Data
      ↓
    Database
      ↓
    SQL
      ↓
    Backend
      ↓
    Algorithm
      ↓
    API
      ↓
    Frontend
      ↓
    UI

На кожному етапі запитай:

    Скільки даних?
    Скільки разів я їх обробляю?
    Чи можу обробити один раз?
    Чи можу використати індекс?
    Чи потрібні всі дані?
    Чи можу зменшити input?
    Чи можу кешувати результат?

---

# 🧠 Як оптимізувати алгоритм

Не починай із:

> «Мені потрібен O(log n)!»

Починай із:

    1. Зрозуміти задачу
       ↓
    2. Написати просте правильне рішення
       ↓
    3. Визначити Complexity
       ↓
    4. Знайти bottleneck
       ↓
    5. Подумати про структуру даних
       ↓
    6. Подумати про алгоритм
       ↓
    7. Оптимізувати
       ↓
    8. Перевірити correctness
       ↓
    9. Порівняти complexity

---

# 📌 Правило "спочатку correctness"

Не варто одразу писати складний:

    O(n log n)

алгоритм, якщо ти не впевнений, що він правильний.

Краще:

    simple solution
        ↓
    correct solution
        ↓
    measure/analyze
        ↓
    optimize if needed

Для навчання це особливо важливо.

---

# 🔥 Brute Force → Optimization

Це одна з головних моделей алгоритмічного мислення:

    Brute Force
        ↓
    O(n²)
        ↓
    знайти повторну роботу
        ↓
    Set / Map / Two Pointers / Sliding Window
        ↓
    O(n)

Наприклад:

    nested loops
        ↓
    repeated lookup
        ↓
    Set
        ↓
    linear solution

---

# 📌 Основні інструменти оптимізації

## Set / Map

Для швидкого lookup.

    O(n²)
       ↓
    O(n)

---

## Two Pointers

Для певних задач із послідовними/впорядкованими даними.

    O(n²)
       ↓
    O(n)

---

## Sliding Window

Для послідовних ділянок.

    O(nk)
       ↓
    O(n)

---

## Binary Search

Для впорядкованого пошуку.

    O(n)
       ↓
    O(log n)

---

## Memoization

Для повторних рекурсивних/динамічних обчислень.

    exponential
       ↓
    часто O(n)

---

## Database Index

Для прискорення пошуку в базі даних.

Але індекс:

    займає storage
    +
    має maintenance cost
    +
    може впливати на INSERT/UPDATE/DELETE

Тому індекси також є компромісом.

---

# 📊 Complexity Cheat Sheet

    O(1)
    Constant
    ↓
    один lookup / одна операція

    O(log n)
    Logarithmic
    ↓
    ділення задачі

    O(n)
    Linear
    ↓
    один прохід

    O(n log n)
    Linearithmic
    ↓
    ефективне сортування / divide & conquer

    O(n²)
    Quadratic
    ↓
    подвійний перебір

    O(2ⁿ)
    Exponential
    ↓
    branching recursion

    O(n!)
    Factorial
    ↓
    permutations / brute force

---

# 📌 Міні-шпаргалка для коду

### Один цикл

    for (...) {
      ...
    }

Зазвичай:

    O(n)

---

### Два незалежні цикли

    for (...) {
      ...
    }

    for (...) {
      ...
    }

    O(n + n)
    ↓
    O(n)

---

### Два вкладені цикли

    for (...) {
      for (...) {
        ...
      }
    }

    O(n²)

---

### Три вкладені цикли

    for (...) {
      for (...) {
        for (...) {
          ...
        }
      }
    }

    O(n³)

---

### Binary Search

    O(log n)

---

### Sorting

    O(n log n)

типова оцінка для ефективних comparison-based sorting algorithms.

---

### Array lookup

    numbers[index]

    O(1)

---

### Linear search

    numbers.includes(value)

    O(n)

---

### Set lookup

    set.has(value)

    O(1) average

---

### Map lookup

    map.get(key)

    O(1) average

---

# 🎤 Питання на співбесіді

### Що таке Big O?

Big O — нотація для опису асимптотичного зростання ресурсів алгоритму залежно від розміру input.

---

### Що таке `n`?

Зазвичай `n` — розмір вхідних даних.

---

### Що означає O(1)?

Кількість роботи не залежить від розміру input у межах відповідної моделі операції.

---

### Що означає O(n)?

Кількість роботи зростає приблизно лінійно разом із розміром input.

---

### Що означає O(n²)?

Кількість роботи росте приблизно як квадрат розміру input.

Частий приклад — подвійний вкладений перебір.

---

### Що таке O(log n)?

Складність, при якій розмір задачі на кожному кроці значно зменшується, наприклад ділиться навпіл.

Класичний приклад:

    Binary Search

---

### Що таке Space Complexity?

Оцінка додаткової пам'яті, необхідної алгоритму.

---

### Чим O(n) Space відрізняється від O(1) Space?

`O(1)` — додаткова пам'ять не залежить від розміру input.

`O(n)` — додаткова пам'ять зростає разом із input.

---

### Чому два послідовні O(n) цикли — O(n), а не O(n²)?

Тому що:

    O(n) + O(n)
    =
    O(2n)
    =
    O(n)

---

### Чому два вкладені цикли — O(n²)?

Тому що внутрішній цикл виконується приблизно `n` разів для кожного з `n` елементів:

    n × n
    =
    n²

---

### Чи кожен вкладений цикл означає O(n²)?

Ні.

Потрібно аналізувати, скільки разів реально виконується кожен цикл і чи рухаються pointers незалежно.

---

### Чому Binary Search O(log n)?

Тому що область пошуку приблизно ділиться навпіл на кожному кроці.

---

### Чому `array.includes()` O(n)?

У найгіршому випадку потрібно перевірити всі елементи.

---

### Чому `Set.has()` зазвичай O(1)?

Хеш-структури забезпечують у середньому constant-time lookup за типової реалізації.

---

### Що таке Time-Space Trade-off?

Це ситуація, коли ми використовуємо більше пам'яті, щоб зменшити час виконання.

Наприклад:

    Array.includes()
        ↓
    Set.has()

---

### Що таке in-place algorithm?

Алгоритм, який використовує невелику, зазвичай `O(1)`, додаткову пам'ять і модифікує input або працює без створення великої копії даних.

---

# 🧪 Практичні вправи

## 🟢 Beginner

### 1. Визначити Complexity

Для кожного фрагмента визначити:

    O(1)
    O(n)
    O(n²)
    ...

---

### 2. Один цикл

    for (let i = 0; i < numbers.length; i++) {
      console.log(numbers[i]);
    }

Визначити:

    Time Complexity
    Space Complexity

---

### 3. Подвійний цикл

    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < numbers.length; j++) {
        console.log(numbers[i], numbers[j]);
      }
    }

---

### 4. Простий lookup

    const value = numbers[10];

Визначити Complexity.

---

# 🟡 Junior

### 5. Linear Search

    linearSearch(numbers, target);

Визначити:

    Best Case
    Worst Case
    Space Complexity

---

### 6. Frequency Counter

Порівняти:

    nested loops

і:

    Map

Визначити Complexity кожного підходу.

---

### 7. Two Pointers

Порівняти:

    Brute Force Pair Sum

з:

    Two Pointers

Пояснити, звідки береться різниця в Complexity.

---

### 8. Sliding Window

Порівняти:

    brute force window

з:

    sliding window

Пояснити, які повторні обчислення були усунені.

---

# 🟠 Junior+

### 9. Set optimization

Маємо:

    numbers
    targets

Знайти всі `targets`, які присутні в `numbers`.

Спочатку реалізувати через:

    includes()

Потім через:

    Set

Порівняти Complexity.

---

### 10. Recursive Fibonacci

Визначити:

    Time Complexity
    Space Complexity

для наївної рекурсії.

Потім додати:

    memoization

і порівняти результати.

---

### 11. Nested data

Рекурсивно пройти nested object.

Визначити:

    Time Complexity
    Space Complexity

і пояснити, від чого залежить recursion depth.

---

# 🔴 Full Stack

### 12. Frontend optimization

Є:

    users

і:

    posts

Наївний варіант:

    users.map(user => {
      return posts.find(
        post => post.userId === user.id
      );
    });

Проаналізувати:

    Time Complexity

Потім побудувати:

    Map<userId, posts>

і порівняти.

---

### 13. Backend optimization

Є великий масив:

    users

Потрібно багато разів перевіряти:

    user.id

Порівняти:

    Array.find()

і:

    Map.get()

---

### 14. Database optimization

Є таблиця:

    users

і пошук:

    WHERE email = ...

Дослідити концепцію:

    index

і пояснити, чому індекс може зменшити кількість роботи для певних запитів.

---

# 🧠 Algorithm Complexity Checklist

Перед завершенням алгоритму запитай:

    1. Який розмір input?
       ↓
    2. Скільки разів я проходжу дані?
       ↓
    3. Чи є вкладені цикли?
       ↓
    4. Чи є повторний lookup?
       ↓
    5. Чи можна використати Set / Map?
       ↓
    6. Чи можна використати Two Pointers?
       ↓
    7. Чи можна використати Sliding Window?
       ↓
    8. Чи потрібне сортування?
       ↓
    9. Чи є рекурсія?
       ↓
    10. Яка recursion depth?
        ↓
    11. Скільки додаткової пам'яті?
        ↓
    12. Який bottleneck?
        ↓
    13. Чи потрібна оптимізація?

---

# 🎯 Що потрібно реально запам'ятати

Для Junior JavaScript Developer не потрібно бути математиком з теорії складності.

Потрібно впевнено розуміти:

    O(1)
    O(log n)
    O(n)
    O(n log n)
    O(n²)

і базово:

    O(2ⁿ)
    O(n!)

Також потрібно вміти:

- побачити один прохід;
- побачити вкладений перебір;
- побачити повторний lookup;
- оцінити додаткову пам'ять;
- розуміти різницю між Time і Space;
- розуміти Best/Worst Case;
- пояснити оптимізацію через `Set` / `Map`;
- розуміти Two Pointers;
- розуміти Sliding Window;
- розуміти Binary Search;
- враховувати recursion depth.

---

# 🧠 Твоя карта алгоритмічного мислення

    Brute Force
         ↓
    Analyze Complexity
         ↓
    Find repeated work
         ↓
    Choose data structure
         ↓
    Choose algorithmic pattern
         ↓
    Optimize
         ↓
    Check correctness
         ↓
    Compare Complexity

Наприклад:

    O(n²)
      ↓
    repeated lookup
      ↓
    Map / Set
      ↓
    O(n)

Або:

    O(n²)
      ↓
    pair / ordered data
      ↓
    Two Pointers
      ↓
    O(n)

Або:

    O(nk)
      ↓
    overlapping windows
      ↓
    Sliding Window
      ↓
    O(n)

Або:

    O(n)
      ↓
    sorted data
      ↓
    Binary Search
      ↓
    O(log n)

---

# 🚀 Головний висновок

**Complexity Basics — це фундамент, який пов'язує всі попередні теми алгоритмів.**

Ти вже бачиш окремі інструменти:

    Searching
       ↓
    Sorting
       ↓
    Frequency Counter
       ↓
    Two Pointers
       ↓
    Sliding Window
       ↓
    Recursion

А `Complexity` дозволяє відповісти на головне питання:

> **Наскільки ефективним є мій алгоритм і як він поводитиметься при збільшенні кількості даних?**

Головна шкала:

    O(1)
      ↓
    O(log n)
      ↓
    O(n)
      ↓
    O(n log n)
      ↓
    O(n²)
      ↓
    O(2ⁿ)
      ↓
    O(n!)

Головні практичні принципи:

    один прохід → O(n)

    вкладений повний перебір → O(n²)

    ділення задачі навпіл → O(log n)

    ефективне сортування → O(n log n)

    повторний lookup → подумати про Set / Map

    послідовне вікно → подумати про Sliding Window

    два краї / впорядковані дані → подумати про Two Pointers

    sorted search → подумати про Binary Search

    повторні рекурсивні обчислення → подумати про Memoization

І найважливіше для Full Stack:

    Complexity
        ≠
    тільки LeetCode

Вона допомагає приймати практичні рішення:

    Які дані передавати через API?
    Де виконувати обчислення?
    Чи потрібен Set / Map?
    Чи потрібен index у PostgreSQL?
    Чи потрібно сортувати?
    Чи можна відфільтрувати дані раніше?
    Чи не роблю я N+1 запитів?
    Чи не створюю зайві копії масивів?
    Чи не обробляю одні й ті самі дані багато разів?

Тобто твоя базова модель має поступово стати такою:

    Correctness
        ↓
    Complexity
        ↓
    Data Structure
        ↓
    Algorithm
        ↓
    Optimization
        ↓
    Real-world constraints

Саме це перетворює знання алгоритмів із набору навчальних задач на практичний інструмент JavaScript / Node.js / PostgreSQL / Full Stack розробника.