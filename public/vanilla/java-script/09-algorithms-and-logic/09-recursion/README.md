# 09. Recursion

## 📌 Що таке Recursion

**Recursion** (рекурсія) — це техніка, коли функція викликає **сама себе**, щоб розв'язати задачу через менші версії тієї самої задачі.

Проста ідея:

> Велика задача → така сама, але менша задача → ще менша → базовий випадок.

Наприклад:

    countdown(3)

можна уявити як:

    3
    ↓
    2
    ↓
    1
    ↓
    0
    ↓
    stop

Рекурсія особливо корисна для структур, які самі мають рекурсивну природу:

- дерева;
- вкладені об'єкти;
- вкладені масиви;
- файлові системи;
- DOM-структури;
- графи;
- directory traversal;
- JSON-подібні структури.

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

# 🧠 Основна модель рекурсії

Практично будь-яка рекурсивна функція повинна мати дві складові:

1. **Base Case** — базовий випадок, коли рекурсія зупиняється.
2. **Recursive Case** — випадок, коли функція викликає саму себе для меншої задачі.

Схема:

    function recursiveFunction(data) {
      if (baseCase) {
        return result;
      }

      return recursiveFunction(smallerData);
    }

Запам'ятай:

    BASE CASE
        ↓
      STOP

    RECURSIVE CASE
        ↓
    smaller problem
        ↓
    recursive call

---

# 🔥 Найпростіший приклад

## Countdown

    function countdown(number) {
      if (number === 0) {
        return;
      }

      console.log(number);

      countdown(number - 1);
    }

    countdown(3);

Результат:

    3
    2
    1

---

# 🧠 Як це працює

Виклик:

    countdown(3)

викликає:

    countdown(2)

який викликає:

    countdown(1)

який викликає:

    countdown(0)

А тут:

    if (number === 0) {
      return;
    }

рекурсія зупиняється.

Отже:

    countdown(3)
        ↓
    countdown(2)
        ↓
    countdown(1)
        ↓
    countdown(0)
        ↓
       STOP

---

# 📌 Base Case

**Base Case** — це найважливіший елемент рекурсії.

Без нього функція продовжуватиме викликати себе.

Наприклад, неправильно:

    function count(number) {
      console.log(number);

      count(number - 1);
    }

Виклик:

    count(3);

продовжуватиметься:

    3
    2
    1
    0
    -1
    -2
    -3
    ...

і зрештою JavaScript завершить виконання через переповнення стеку викликів.

---

# ⚠️ Call Stack

JavaScript використовує **Call Stack** для відстеження активних викликів функцій.

Наприклад:

    function first() {
      second();
    }

    function second() {
      third();
    }

    function third() {
      console.log("Hello");
    }

    first();

Стек приблизно:

    first()
       ↓
    second()
       ↓
    third()

Після завершення:

    third()
       ↑
    second()
       ↑
    first()

---

# 🧠 Рекурсія і Call Stack

Для:

    countdown(3)

в момент максимального вкладення стек може виглядати приблизно так:

    countdown(3)
    countdown(2)
    countdown(1)
    countdown(0)

Після Base Case виклики завершуються у зворотному порядку.

Це називається:

> **unwinding the call stack**

---

# 📌 Stack Overflow

Якщо рекурсія занадто глибока або не має правильного Base Case:

    RangeError: Maximum call stack size exceeded

Це означає, що Call Stack переповнився.

Тому рекурсія — це не:

> «Функція просто може викликати себе».

Потрібно контролювати:

- умову зупинки;
- глибину;
- напрямок руху до Base Case.

---

# 🔥 Рекурсивний факторіал

Математично:

    5! = 5 × 4 × 3 × 2 × 1

Рекурсивно:

    5! = 5 × 4!

    4! = 4 × 3!

    3! = 3 × 2!

    2! = 2 × 1!

    1! = 1

---

# 🧩 Реалізація

    function factorial(number) {
      if (number === 1) {
        return 1;
      }

      return number * factorial(number - 1);
    }

    console.log(factorial(5));

    // 120

---

# 🧠 Розгортання

Виклик:

    factorial(5)

перетворюється на:

    5 * factorial(4)
          ↓
    5 * 4 * factorial(3)
              ↓
    5 * 4 * 3 * factorial(2)
                  ↓
    5 * 4 * 3 * 2 * factorial(1)
                      ↓
                      1

Потім Call Stack розгортається:

    factorial(1) = 1
    factorial(2) = 2
    factorial(3) = 6
    factorial(4) = 24
    factorial(5) = 120

---

# 📌 Рекурсивна функція часто має такий вигляд

    function recursive(value) {
      if (stopCondition) {
        return baseResult;
      }

      return operation(
        value,
        recursive(smallerValue)
      );
    }

Наприклад:

    function sumTo(number) {
      if (number === 1) {
        return 1;
      }

      return number + sumTo(number - 1);
    }

    sumTo(5);

Результат:

    15

---

# 🔥 Сума чисел

Потрібно:

    1 + 2 + 3 + 4 + 5

Рекурсивно:

    function sumTo(number) {
      if (number === 1) {
        return 1;
      }

      return number + sumTo(number - 1);
    }

    console.log(sumTo(5));

    // 15

Логіка:

    sumTo(5)
      ↓
    5 + sumTo(4)
      ↓
    5 + 4 + sumTo(3)
      ↓
    5 + 4 + 3 + sumTo(2)
      ↓
    5 + 4 + 3 + 2 + sumTo(1)
      ↓
    15

---

# 📌 Рекурсія не завжди означає "швидше"

Рекурсія — це спосіб організації алгоритму.

Вона не є автоматично:

- швидшою;
- повільнішою;
- кращою;
- гіршою.

Потрібно аналізувати конкретний алгоритм.

Іноді рекурсія робить код набагато зрозумілішим.

Іноді звичайний цикл:

    for
    while

буде простішим і ефективнішим.

---

# 🆚 Recursion vs Loop

Наприклад, countdown через цикл:

    function countdown(number) {
      for (let i = number; i > 0; i--) {
        console.log(i);
      }
    }

Рекурсивний варіант:

    function countdown(number) {
      if (number === 0) {
        return;
      }

      console.log(number);

      countdown(number - 1);
    }

Обидва підходи можуть вирішити задачу.

Для простого countdown цикл часто практичніший.

Рекурсія стає особливо корисною, коли структура задачі сама є вкладеною.

---

# 📊 Загальна різниця

| Loop | Recursion |
|---|---|
| `for` / `while` | функція викликає себе |
| зазвичай не створює глибокий call stack | використовує Call Stack |
| часто простіший для лінійних задач | часто природний для дерев/вкладеності |
| немає рекурсивних викликів | є recursive call |
| контроль через умову циклу | контроль через Base Case |

---

# 🔥 Рекурсія з масивом

Можна рекурсивно пройти масив.

Наприклад, знайти суму:

    function sumArray(numbers, index = 0) {
      if (index === numbers.length) {
        return 0;
      }

      return numbers[index] + sumArray(
        numbers,
        index + 1
      );
    }

    console.log(
      sumArray([1, 2, 3, 4])
    );

    // 10

---

# 🧠 Як працює index

Перший виклик:

    index = 0

Потім:

    index = 1
    index = 2
    index = 3
    index = 4

На:

    index === numbers.length

рекурсія зупиняється.

---

# 📌 Рекурсивний обхід масиву

Схема:

    function traverse(array, index = 0) {
      if (index === array.length) {
        return;
      }

      // process array[index]

      traverse(array, index + 1);
    }

Це фактично рекурсивний аналог:

    for (let i = 0; i < array.length; i++) {
      // process array[i]
    }

---

# 🔥 Рекурсія для пошуку

Наприклад, перевірити, чи є число в масиві.

    function contains(numbers, target, index = 0) {
      if (index === numbers.length) {
        return false;
      }

      if (numbers[index] === target) {
        return true;
      }

      return contains(
        numbers,
        target,
        index + 1
      );
    }

    console.log(
      contains([10, 20, 30], 20)
    );

    // true

---

# 📌 Рекурсія і пошук

У такій задачі рекурсія не робить алгоритм кращим за звичайний цикл.

Лінійний пошук:

    Time: O(n)

Рекурсивний лінійний пошук:

    Time: O(n)

Але рекурсивний варіант використовує Call Stack:

    Space: O(n)

Тому потрібно розуміти не тільки:

> «Я можу зробити це рекурсивно».

а:

> «Чи є тут перевага від рекурсивної структури?»

---

# 🔥 Рекурсія і рядки

Рекурсивно можна обробляти символи.

Наприклад, перевірити паліндром.

    function isPalindrome(text, left = 0, right = text.length - 1) {
      if (left >= right) {
        return true;
      }

      if (text[left] !== text[right]) {
        return false;
      }

      return isPalindrome(
        text,
        left + 1,
        right - 1
      );
    }

    console.log(
      isPalindrome("level")
    );

    // true

---

# 🧠 Тут поєднуються

    Recursion
        +
    Two Pointers

Маємо:

    left →       ← right
    [ l e v e l ]

Після кожного кроку:

    left++

    right--

Рекурсія продовжується, поки:

    left < right

---

# 📌 Recursive Case може зменшувати задачу з двох боків

Не обов'язково мати тільки:

    index + 1

Можна:

    left + 1
    right - 1

Або:

    n - 1

Або:

    n / 2

Головне:

> Кожен рекурсивний виклик повинен наближатися до Base Case.

---

# 🔥 Рекурсія і вкладені масиви

Наприклад:

    const data = [
      1,
      [2, 3],
      [4, [5, 6]]
    ];

Потрібно отримати:

    [1, 2, 3, 4, 5, 6]

Рекурсія природно підходить, тому що структура може бути вкладена на будь-яку глибину.

---

# 🧩 Recursive Flatten

    function flatten(data) {
      const result = [];

      for (const item of data) {
        if (Array.isArray(item)) {
          result.push(...flatten(item));
        } else {
          result.push(item);
        }
      }

      return result;
    }

    console.log(
      flatten([1, [2, 3], [4, [5, 6]]])
    );

    // [1, 2, 3, 4, 5, 6]

---

# 🧠 Чому тут рекурсія природна

Маємо:

    [
      value,
      array,
      array
    ]

Якщо зустрічаємо:

    array

то застосовуємо **ту саму логіку** до цього масиву:

    flatten(item)

Це класична рекурсивна структура:

    process data
        ↓
    is nested?
      /     \
    no       yes
    ↓         ↓
    value    process nested data
                 ↓
              same function

---

# 🔥 Вкладені об'єкти

Рекурсія особливо корисна для:

    nested objects

Наприклад:

    const user = {
      name: "Valeriy",
      profile: {
        age: 56,
        contacts: {
          email: "example@mail.com"
        }
      }
    };

Структура:

    user
     │
     ├── name
     │
     └── profile
          │
          ├── age
          │
          └── contacts
                │
                └── email

Глибина може бути невідомою.

---

# 📌 Рекурсивний обхід об'єкта

    function traverseObject(object) {
      for (const key in object) {
        const value = object[key];

        if (
          typeof value === "object" &&
          value !== null
        ) {
          traverseObject(value);
        } else {
          console.log(key, value);
        }
      }
    }

    traverseObject({
      name: "Alex",
      profile: {
        age: 30,
        contacts: {
          email: "alex@example.com"
        }
      }
    });

---

# ⚠️ `null` у JavaScript

У перевірці:

    typeof null === "object"

Тому перевірка:

    typeof value === "object"

сама по собі недостатня.

Потрібно:

    typeof value === "object" &&
    value !== null

А для масивів часто варто додатково перевіряти:

    Array.isArray(value)

---

# 🔥 Дерева

Одна з найважливіших областей застосування рекурсії — **Tree Traversal**.

Дерево:

    A
    ├── B
    │   ├── D
    │   └── E
    └── C
        └── F

Кожен вузол може мати дочірні вузли.

А дочірній вузол сам може бути коренем іншого дерева.

Це рекурсивна структура.

---

# 🧠 Tree Node

Проста структура:

    const tree = {
      value: "A",
      children: [
        {
          value: "B",
          children: []
        },
        {
          value: "C",
          children: []
        }
      ]
    };

Для кожного вузла потрібно:

    process node

а потім:

    process children

---

# 🔥 Recursive Tree Traversal

    function traverseTree(node) {
      console.log(node.value);

      for (const child of node.children) {
        traverseTree(child);
      }
    }

    traverseTree(tree);

Результат:

    A
    B
    C

---

# 📌 Більш глибоке дерево

    const tree = {
      value: "A",
      children: [
        {
          value: "B",
          children: [
            {
              value: "D",
              children: []
            },
            {
              value: "E",
              children: []
            }
          ]
        },
        {
          value: "C",
          children: [
            {
              value: "F",
              children: []
            }
          ]
        }
      ]
    };

Обхід:

    A
    B
    D
    E
    C
    F

---

# 🧠 Tree Traversal — фундаментальна тема

Рекурсія використовується для:

- DOM;
- файлових систем;
- меню;
- категорій;
- коментарів;
- organizational charts;
- nested JSON;
- AST;
- database trees;
- component trees.

---

# 🌐 Рекурсія і DOM

DOM має деревоподібну структуру:

    document
       │
       └── html
            ├── head
            └── body
                 ├── header
                 ├── main
                 │    ├── section
                 │    └── section
                 └── footer

Тому рекурсивний обхід DOM концептуально природний.

Наприклад:

    function walk(node) {
      console.log(node.nodeName);

      for (const child of node.children) {
        walk(child);
      }
    }

    walk(document.body);

---

# 💻 Рекурсія і файлова система

Файлова система також є деревом:

    project/
    ├── src/
    │   ├── components/
    │   └── pages/
    ├── public/
    └── package.json

Щоб пройти всі вкладені директорії:

    directory
       ↓
    files
       +
    subdirectories
             ↓
        same algorithm

Це класичний випадок для рекурсії.

---

# 🟢 Рекурсія в Node.js

У backend розробці рекурсія може використовуватися для:

- обходу директорій;
- обробки nested JSON;
- дерева категорій;
- permissions hierarchy;
- меню;
- коментарів;
- файлових структур;
- AST;
- dependency structures.

Наприклад, концептуально:

    folder
      ↓
    subfolder
      ↓
    subfolder
      ↓
    files

Для кожної папки:

    process folder
    ↓
    process children
    ↓
    recursively process subfolders

---

# 🔥 Recursion + Divide and Conquer

Рекурсія часто використовується в алгоритмах **Divide and Conquer**.

Ідея:

    велика задача
         ↓
    розділити
       /   \
      /     \
    менша  менша
    задача задача
      ↓      ↓
    solve  solve
      \      /
       combine

Класичні приклади:

- Merge Sort;
- Quick Sort;
- Binary Search.

---

# 📌 Binary Search і рекурсія

Маємо відсортований масив:

    [1, 3, 5, 7, 9, 11, 13]

Шукаємо:

    9

Перевіряємо середину.

    [1, 3, 5, 7, 9, 11, 13]
             ↑
             7

`9 > 7`, тому шукаємо праворуч:

    [9, 11, 13]

Потім знову ділимо.

---

# 🧩 Recursive Binary Search

    function binarySearch(
      numbers,
      target,
      left = 0,
      right = numbers.length - 1
    ) {
      if (left > right) {
        return -1;
      }

      const middle = Math.floor(
        (left + right) / 2
      );

      if (numbers[middle] === target) {
        return middle;
      }

      if (target < numbers[middle]) {
        return binarySearch(
          numbers,
          target,
          left,
          middle - 1
        );
      }

      return binarySearch(
        numbers,
        target,
        middle + 1,
        right
      );
    }

    console.log(
      binarySearch(
        [1, 3, 5, 7, 9, 11, 13],
        9
      )
    );

    // 4

---

# 📊 Binary Search Complexity

На кожному кроці область пошуку приблизно ділиться навпіл.

Тому:

    Time: O(log n)

Але рекурсивна реалізація використовує Call Stack:

    Space: O(log n)

Ітеративна реалізація Binary Search може використовувати:

    Space: O(1)

Це хороший приклад того, що:

> Рекурсивна ітеративна реалізації можуть мати однакову часову складність, але різну просторову.

---

# 🔥 Recursion + Backtracking

**Backtracking** — техніка, де ми:

1. робимо вибір;
2. рухаємося далі;
3. якщо потрібно — повертаємося назад;
4. пробуємо інший варіант.

Схема:

    choose
      ↓
    explore
      ↓
    undo
      ↓
    next choice

Рекурсія часто є природним механізмом для такого обходу.

---

# 📌 Приклад концепції

Маємо:

    ["A", "B", "C"]

Хочемо отримати всі можливі перестановки.

Перший вибір:

    A

потім:

    B

потім:

    C

Отримуємо:

    ABC

Повертаємося:

    undo C

і пробуємо інший варіант:

    ACB

Потім:

    B...

Це вже область:

    Recursion
        +
    Backtracking

---

# ⚠️ Recursion vs Backtracking

Це не одне й те саме.

**Recursion**:

> функція викликає саму себе.

**Backtracking**:

> систематично перебираємо варіанти, повертаючись назад після кожної гілки.

Backtracking часто використовує recursion, але рекурсія не обов'язково є backtracking.

---

# 🔥 Класичний приклад: Fibonacci

Послідовність:

    0, 1, 1, 2, 3, 5, 8, 13...

Рекурсивне визначення:

    fib(n) = fib(n - 1) + fib(n - 2)

Базові випадки:

    fib(0) = 0
    fib(1) = 1

---

# 🧩 Наївна рекурсивна реалізація

    function fibonacci(number) {
      if (number <= 1) {
        return number;
      }

      return (
        fibonacci(number - 1) +
        fibonacci(number - 2)
      );
    }

    console.log(fibonacci(6));

    // 8

---

# ⚠️ Проблема Fibonacci

Наївна рекурсія багато разів обчислює одні й ті самі значення.

Наприклад:

    fib(5)
       ├── fib(4)
       │    ├── fib(3)
       │    └── fib(2)
       │
       └── fib(3)
            ├── fib(2)
            └── fib(1)

`fib(3)` обчислюється повторно.

Для великих `n` це стає дуже неефективним.

---

# 📊 Fibonacci Complexity

Наївна рекурсивна реалізація має експоненційну часову складність, яку часто позначають приблизно як:

    O(2^n)

Тому це хороший приклад:

> Рекурсивний код може бути дуже простим для читання, але дуже неефективним.

---

# 🚀 Memoization

Щоб не обчислювати те саме повторно, можна запам'ятовувати результати.

Це називається:

> **Memoization**

Наприклад:

    function fibonacci(number, memo = {}) {
      if (number <= 1) {
        return number;
      }

      if (number in memo) {
        return memo[number];
      }

      memo[number] =
        fibonacci(number - 1, memo) +
        fibonacci(number - 2, memo);

      return memo[number];
    }

---

# 🧠 Recursion + Memoization

Отримуємо:

    Recursion
        +
    Cache
        =
    Memoization

Завдяки цьому кількість повторних обчислень різко зменшується.

Для Fibonacci така реалізація може працювати за:

    Time: O(n)
    Space: O(n)

---

# 📌 Memoization vs Tabulation

Два поширені підходи до Dynamic Programming:

### Memoization

    recursion
        +
    cache

### Tabulation

    iteration
        +
    table

Memoization часто можна сприймати як:

> «Рекурсивне рішення + запам'ятовування результатів».

---

# ⚠️ Рекурсія і великі дані

Не потрібно автоматично використовувати recursion для дуже глибоких структур.

Наприклад:

    100000
      ↓
    99999
      ↓
    99998
      ↓
    ...

може призвести до:

    Maximum call stack size exceeded

У таких випадках ітеративний алгоритм із власним стеком може бути безпечнішим.

---

# 🧠 Call Stack vs Explicit Stack

Рекурсія використовує:

    Call Stack

Можна вручну створити:

    const stack = [];

і зберігати там дані для обробки.

Тобто іноді:

    recursion

можна замінити на:

    iteration + stack

---

# 🔥 Iterative Tree Traversal

Замість:

    function traverse(node) {
      for (const child of node.children) {
        traverse(child);
      }
    }

можна використовувати власний стек:

    function traverse(root) {
      const stack = [root];

      while (stack.length > 0) {
        const node = stack.pop();

        console.log(node.value);

        for (const child of node.children) {
          stack.push(child);
        }
      }
    }

Тут ми самі керуємо:

    stack

замість Call Stack.

---

# 📌 Tail Recursion

**Tail recursion** — рекурсивний виклик є останньою операцією функції.

Наприклад:

    function countdown(number) {
      if (number === 0) {
        return;
      }

      console.log(number);

      return countdown(number - 1);
    }

Рекурсивний виклик:

    countdown(number - 1)

є останньою операцією.

---

# ⚠️ Важливо про JavaScript

Не варто припускати, що JavaScript автоматично оптимізує tail recursion і тому можна безпечно створювати дуже глибоку рекурсію.

У звичайному практичному JavaScript-коді потрібно все одно враховувати обмеження Call Stack.

---

# 📌 Рекурсивне мислення

Коли бачиш задачу, не думай одразу:

> «Як я зроблю це через рекурсію?»

Краще поставити питання:

> «Чи складається ця задача з менших задач такого самого типу?»

Наприклад:

    дерево
      ↓
    subtree
      ↓
    subtree
      ↓
    subtree

Або:

    nested array
         ↓
    nested array
         ↓
    nested array

Якщо структура повторюється:

    same structure inside itself

рекурсія може бути дуже природним рішенням.

---

# 🧠 Recursive Thinking Template

Для задачі постав собі 4 питання:

### 1. Що є Base Case?

    Коли задача настільки мала,
    що відповідь очевидна?

### 2. Яка менша задача?

    Як перетворити
    current problem
    на smaller problem?

### 3. Як отримати відповідь?

    current result
        +
    recursive result

### 4. Чи рухаюся я до Base Case?

Якщо ні — рекурсія неправильна.

---

# 🔥 Приклад мислення

Задача:

> Порахувати суму чисел від `1` до `n`.

Питання:

### Base Case

Для:

    n = 1

відповідь:

    1

### Smaller Problem

Сума до `n`:

    n + sumTo(n - 1)

### Recursive Case

    return n + sumTo(n - 1);

Отримуємо:

    function sumTo(n) {
      if (n === 1) {
        return 1;
      }

      return n + sumTo(n - 1);
    }

---

# 📌 Recursion Tree

Для рекурсивних алгоритмів корисно малювати дерево викликів.

Наприклад:

    fibonacci(5)
          /    \
        fib4   fib3
        /  \    /  \
      fib3 fib2 ...
      / \
    fib2 fib1

Це допомагає побачити:

- кількість викликів;
- повторні обчислення;
- глибину;
- branching factor;
- складність.

---

# 📊 Depth vs Number of Calls

Важливо розрізняти:

### Recursion depth

Наскільки глибоко ми пішли.

### Number of recursive calls

Скільки всього викликів було створено.

Наприклад, Fibonacci має відносно невелику глибину:

    O(n)

але величезну кількість викликів без memoization.

Тому:

    depth ≠ total calls

---

# 🧠 Просторова складність рекурсії

При оцінці рекурсивного алгоритму потрібно враховувати Call Stack.

Наприклад:

    function count(n) {
      if (n === 0) {
        return;
      }

      count(n - 1);
    }

Глибина:

    n

Отже:

    Space: O(n)

навіть якщо сам алгоритм не створює масивів або об'єктів.

---

# 📌 Recursion і `return`

Одна з частих помилок:

    function sumTo(n) {
      if (n === 1) {
        return 1;
      }

      sumTo(n - 1);
    }

Тут результат рекурсивного виклику не повертається.

Правильно:

    function sumTo(n) {
      if (n === 1) {
        return 1;
      }

      return n + sumTo(n - 1);
    }

`return` передає результат назад через Call Stack.

---

# ⚠️ Типова помилка №1 — немає Base Case

    function test(n) {
      return test(n - 1);
    }

Проблема:

    немає умови зупинки

---

# ⚠️ Типова помилка №2 — Base Case недосяжний

    function test(n) {
      if (n === 0) {
        return;
      }

      test(n + 1);
    }

Якщо почати з:

    test(1);

отримаємо:

    1
    2
    3
    4
    ...

Ми рухаємося **від** Base Case, а не до нього.

---

# ⚠️ Типова помилка №3 — неправильний `return`

    function factorial(n) {
      if (n === 1) {
        return 1;
      }

      factorial(n - 1);
    }

Тут результат не повертається.

Правильно:

    return n * factorial(n - 1);

---

# ⚠️ Типова помилка №4 — змінюємо не ту частину задачі

Наприклад:

    function test(n) {
      if (n === 0) {
        return;
      }

      test(n - 2);
    }

Якщо почати з непарного числа:

    test(5);

отримаємо:

    5
    3
    1
    -1
    -3
    ...

Base Case:

    n === 0

ніколи не буде досягнутий.

Потрібно перевіряти, чи всі можливі шляхи рекурсії справді ведуть до зупинки.

---

# 🧪 Практичні вправи

## 🟢 Beginner

### 1. Countdown

Реалізувати:

    countdown(5);

Результат:

    5
    4
    3
    2
    1

---

### 2. Count Up

Реалізувати рекурсивний вивід:

    1
    2
    3
    4
    5

---

### 3. Sum

Реалізувати:

    sumTo(5);

Результат:

    15

---

### 4. Factorial

Реалізувати:

    factorial(5);

Результат:

    120

---

# 🟡 Junior

### 5. Sum Array

    sumArray([1, 2, 3, 4]);

Результат:

    10

---

### 6. Search

Реалізувати:

    contains(
      [10, 20, 30],
      20
    );

Результат:

    true

---

### 7. Reverse String

Рекурсивно:

    reverse("hello");

Результат:

    "olleh"

---

### 8. Palindrome

Реалізувати:

    isPalindrome("level");

Результат:

    true

---

# 🟠 Junior+

### 9. Flatten Nested Array

    flatten([
      1,
      [2, 3],
      [4, [5, 6]]
    ]);

Результат:

    [1, 2, 3, 4, 5, 6]

---

### 10. Traverse Nested Object

Написати функцію, яка проходить:

    nested object

і виводить primitive values.

---

### 11. Tree Traversal

Створити дерево:

    A
    ├── B
    │   ├── D
    │   └── E
    └── C
        └── F

і рекурсивно вивести всі значення.

---

### 12. Recursive Binary Search

Реалізувати Binary Search рекурсивно.

Умови:

    array must be sorted

---

# 🔴 Advanced

### 13. Fibonacci + Memoization

Реалізувати:

    fibonacci(n)

з memoization.

---

### 14. Generate Permutations

Для:

    ["A", "B", "C"]

отримати всі перестановки.

---

### 15. Backtracking

Розв'язати просту задачу перебору варіантів через:

    recursion
        +
    choose
        +
    explore
        +
    undo

---

# 🌐 Full Stack практичні задачі

## 16. Nested Categories

Backend повертає:

    {
      id: 1,
      name: "Programming",
      children: [
        {
          id: 2,
          name: "JavaScript",
          children: [
            {
              id: 3,
              name: "Arrays",
              children: []
            }
          ]
        }
      ]
    }

На frontend рекурсивно відобразити дерево категорій.

---

# 🌐 17. Recursive React Component

Наприклад:

    <Category
      category={category}
    />

Компонент:

    Category
      ↓
    children.map(...)
      ↓
    <Category />
      ↓
    children
      ↓
    <Category />
      ↓
    ...

Це один із дуже практичних випадків рекурсії у React.

---

# 📌 Recursive React Tree

Концептуально:

    function Category({ category }) {
      return (
        <div>
          <h3>{category.name}</h3>

          {category.children.map(child => (
            <Category
              key={child.id}
              category={child}
            />
          ))}
        </div>
      );
    }

Тут компонент рендерить сам себе для дочірніх категорій.

Це той самий принцип:

    tree
      ↓
    subtree
      ↓
    subtree

---

# 🗄️ Recursion і PostgreSQL

Рекурсивні структури часто зустрічаються в базах даних:

    categories
    comments
    employees
    folders
    permissions
    organizational structures

Наприклад:

    categories

може містити:

    id
    name
    parent_id

де:

    parent_id → categories.id

Отримуємо:

    category
       ↓
    child category
       ↓
    child category
       ↓
    ...

Це вже зв'язок:

    database
        +
    tree structure
        +
    recursion

---

# 📌 Важливий Full Stack принцип

Не обов'язково отримувати все дерево з PostgreSQL і потім будувати його рекурсивно в JavaScript.

Для великих структур потрібно думати про:

    SQL
    indexes
    recursive queries
    API design
    pagination
    lazy loading

Тобто рекурсія — лише один інструмент у всій системі.

---

# 🧠 Recursion у реальному JavaScript

Рекурсія може зустрічатися при роботі з:

    DOM
    nested arrays
    nested objects
    JSON
    trees
    folders
    menus
    comments
    categories
    React components
    AST
    parsers
    backtracking
    divide and conquer

---

# 📊 Complexity

При аналізі рекурсії дивись на три речі:

### 1. Time Complexity

Скільки рекурсивних викликів?

    O(n)
    O(log n)
    O(2^n)
    ...

### 2. Space Complexity

Яка максимальна глибина Call Stack?

    O(n)
    O(log n)
    ...

### 3. Extra Data Structures

Чи використовуються:

    Set
    Map
    Array
    Object
    Memoization cache

Наприклад:

    recursion + memoization

може мати:

    Time: O(n)
    Space: O(n)

---

# 🆚 Recursion + Loop + Stack

Три способи обробки структури:

    Recursion
        ↓
    Call Stack

    Loop
        ↓
    simple iteration

    Loop + Stack
        ↓
    explicit stack

Вибір залежить від:

- структури даних;
- глибини;
- читабельності;
- продуктивності;
- обмежень середовища.

---

# 🎤 Питання на співбесіді

### Що таке recursion?

Рекурсія — це техніка, коли функція викликає сама себе для розв'язання меншої версії задачі.

---

### Які дві частини повинна мати рекурсивна функція?

    Base Case
    Recursive Case

---

### Що буде без Base Case?

Рекурсія не зупиниться і зрештою може спричинити:

    Maximum call stack size exceeded

---

### Що таке Call Stack?

Структура виконання JavaScript, яка зберігає інформацію про активні виклики функцій.

---

### Чому рекурсія може спричинити Stack Overflow?

Кожен активний рекурсивний виклик займає місце в Call Stack.

Якщо глибина занадто велика, стек переповнюється.

---

### Коли рекурсія особливо корисна?

Коли задача має рекурсивну структуру:

    trees
    nested objects
    nested arrays
    filesystem
    DOM
    backtracking
    divide and conquer

---

### Чи завжди рекурсія краща за цикл?

Ні.

Для простих лінійних задач цикл часто може бути простішим.

Рекурсія особливо корисна там, де структура задачі сама є вкладеною або рекурсивною.

---

### Що таке recursion depth?

Максимальна кількість одночасно активних рекурсивних викликів.

---

### Що таке infinite recursion?

Рекурсія, яка не досягає Base Case.

---

### Що таке memoization?

Збереження результатів уже виконаних обчислень, щоб не виконувати їх повторно.

---

### Що таке backtracking?

Техніка перебору варіантів:

    choose
    ↓
    explore
    ↓
    undo
    ↓
    next choice

Часто реалізується через recursion.

---

### Що таке tail recursion?

Рекурсія, де recursive call є останньою операцією функції.

---

# 🧠 Recursion Checklist

Перед написанням рекурсивної функції:

    1. Який Base Case?
       ↓
    2. Яка більша задача?
       ↓
    3. Яка менша версія цієї задачі?
       ↓
    4. Як перейти до меншої задачі?
       ↓
    5. Чи гарантовано рухаємося до Base Case?
       ↓
    6. Що потрібно повернути?
       ↓
    7. Яка Time Complexity?
       ↓
    8. Яка Recursion Depth?
       ↓
    9. Чи не краще використати loop?

---

# 📌 Міні-шпаргалка

## Basic structure

    function recursive(data) {
      if (baseCase) {
        return result;
      }

      return recursive(smallerData);
    }

---

## Countdown

    function countdown(n) {
      if (n === 0) {
        return;
      }

      console.log(n);

      countdown(n - 1);
    }

---

## Sum

    function sumTo(n) {
      if (n === 1) {
        return 1;
      }

      return n + sumTo(n - 1);
    }

---

## Factorial

    function factorial(n) {
      if (n === 1) {
        return 1;
      }

      return n * factorial(n - 1);
    }

---

## Array traversal

    function traverse(array, index = 0) {
      if (index === array.length) {
        return;
      }

      // process array[index]

      traverse(array, index + 1);
    }

---

## Two-sided recursion

    function check(data, left, right) {
      if (left >= right) {
        return true;
      }

      // process

      return check(
        data,
        left + 1,
        right - 1
      );
    }

---

## Nested structure

    function traverse(node) {
      // process node

      for (const child of node.children) {
        traverse(child);
      }
    }

---

## Memoization

    function solve(value, memo = new Map()) {
      if (memo.has(value)) {
        return memo.get(value);
      }

      // calculate result

      memo.set(value, result);

      return result;
    }

---

# 🎯 Що потрібно реально запам'ятати

Не потрібно зубрити десятки рекурсивних функцій.

Потрібно запам'ятати модель:

    1. Base Case
          ↓
    2. Smaller Problem
          ↓
    3. Recursive Call
          ↓
    4. Return Result

І головне питання:

> **Як я можу представити цю задачу як меншу версію самої себе?**

---

# 🧠 Найважливіші зв'язки

Рекурсія особливо добре поєднується з:

    Recursion
       │
       ├── Trees
       │
       ├── Nested Data
       │
       ├── DOM
       │
       ├── File System
       │
       ├── Binary Search
       │
       ├── Merge Sort
       │
       ├── Quick Sort
       │
       ├── Divide & Conquer
       │
       ├── Backtracking
       │
       └── Memoization

---

# 🚀 Головний висновок

**Recursion — це не просто функція, яка викликає сама себе.**

Це спосіб мислення:

    велика задача
         ↓
    менша задача
         ↓
    ще менша
         ↓
    Base Case
         ↓
    повернення результатів назад

Найважливіші речі:

    Base Case
    Recursive Case
    Call Stack
    Recursion Depth
    Time Complexity
    Space Complexity

Для JavaScript особливо важливо розуміти, де рекурсія справді природна:

    nested data
    trees
    DOM
    filesystem
    backtracking
    divide and conquer

І де простіше використати:

    for
    while
    explicit stack

Для твого Full Stack напряму найцінніші практичні зв'язки:

    JSON
      ↓
    nested data
      ↓
    recursion
      ↓
    tree
      ↓
    React recursive component

та:

    PostgreSQL
      ↓
    parent_id
      ↓
    tree/category structure
      ↓
    API
      ↓
    recursive frontend rendering

Тобто рекурсію варто вивчати не як набір «математичних головоломок», а як інструмент роботи з **вкладеними та деревоподібними даними**.