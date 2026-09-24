# 01. Problem Solving

Problem Solving (розв'язання задач) — це процес перетворення задачі, сформульованої природною мовою, у послідовність точних кроків, які можна реалізувати за допомогою коду.

У програмуванні важливо не просто знати синтаксис JavaScript.

Потрібно вміти:

- зрозуміти умову задачі;
- визначити, які дані ми отримуємо;
- визначити, що потрібно отримати на виході;
- розбити задачу на менші частини;
- знайти закономірність;
- вибрати алгоритм;
- реалізувати алгоритм;
- перевірити результат;
- знайти помилки;
- оцінити ефективність рішення.

Problem solving є основою всього розділу:

    09-algorithms-and-logic

Наступні теми:

    02-string-manipulation
    03-array-problems
    04-searching
    05-sorting
    06-frequency-counter
    07-two-pointers
    08-sliding-window
    09-recursion
    10-complexity-basics

---

# Основна модель Problem Solving

Типовий процес:

    Problem
       ↓
    Understand
       ↓
    Input / Output
       ↓
    Examples
       ↓
    Break into smaller problems
       ↓
    Find pattern
       ↓
    Choose approach
       ↓
    Write pseudocode
       ↓
    Implement
       ↓
    Test
       ↓
    Debug
       ↓
    Analyze complexity
       ↓
    Refactor

Головна ідея:

    спочатку зрозуміти задачу
    → потім придумати алгоритм
    → потім писати код

Не навпаки.

---

# Ключові поняття

✔ problem solving  
✔ problem  
✔ input  
✔ output  
✔ requirements  
✔ constraints  
✔ algorithm  
✔ step  
✔ decomposition  
✔ pattern  
✔ assumption  
✔ edge case  
✔ test case  
✔ expected result  
✔ pseudocode  
✔ implementation  
✔ debugging  
✔ validation  
✔ brute force  
✔ optimization  
✔ time complexity  
✔ space complexity  
✔ trade-off  
✔ invariant  
✔ dry run  
✔ refactoring  

---

# Що потрібно пам'ятати

• Алгоритм — це послідовність кроків для розв'язання задачі.

• Код — це реалізація алгоритму конкретною мовою програмування.

• Не потрібно починати з коду.

• Спочатку потрібно зрозуміти:

    що дано?

    що потрібно отримати?

    які є обмеження?

• Приклад допомагає перевірити, чи правильно ми зрозуміли задачу.

• Edge cases потрібно шукати до написання фінального рішення.

• Pseudocode допомагає відокремити логіку задачі від синтаксису JavaScript.

• Brute force — просте прямолінійне рішення, яке перевіряє всі можливі варіанти.

• Optimization — пошук способу виконати ту саму задачу ефективніше.

• Правильне рішення не завжди є найкоротшим кодом.

• Спочатку важливо отримати correct solution.

• Потім можна працювати над efficiency, readability та maintainability.

---

# 1. Understand the Problem

Перший крок — не писати код.

Потрібно прочитати задачу та сформулювати її своїми словами.

Наприклад:

    Given an array of numbers,
    return the largest number.

Не потрібно одразу писати:

    Math.max(...numbers)

Спочатку потрібно зрозуміти:

    Input:
        array of numbers

    Output:
        largest number

    Example:
        [3, 7, 2, 9, 4]
        → 9

---

# Переформулювання задачі

Корисно сказати собі:

    "Мені потрібно знайти найбільше число
     серед усіх елементів масиву."

Це допомагає побачити алгоритм:

    1. взяти перше число як поточний максимум
    2. пройти всі інші числа
    3. порівнювати їх з максимумом
    4. якщо число більше → оновити максимум
    5. повернути максимум

---

# 2. Input

Input — дані, які алгоритм отримує на вході.

Наприклад:

    const numbers = [3, 7, 2, 9, 4];

Input:

    [3, 7, 2, 9, 4]

Інші приклади input:

    string
    number
    boolean
    array
    object
    multiple values

---

# 3. Output

Output — результат роботи алгоритму.

Наприклад:

    Input:
        [3, 7, 2, 9, 4]

    Output:
        9

Важливо чітко визначити:

    Що саме потрібно повернути?

Це може бути:

    number
    string
    boolean
    array
    object
    index
    null
    undefined

---

# Input → Process → Output

Одна з найважливіших моделей програмування:

    INPUT
      ↓
    PROCESS
      ↓
    OUTPUT

Наприклад:

    Input:
        [1, 2, 3, 4, 5]

    Process:
        знайти суму

    Output:
        15

Код:

    function sum(numbers) {
        let total = 0;

        for (const number of numbers) {
            total += number;
        }

        return total;
    }

---

# 4. Requirements

Requirements — вимоги задачі.

Наприклад:

    Написати функцію, яка приймає масив чисел
    і повертає перше парне число.

Requirements:

    input → array of numbers
    output → number або undefined
    потрібно повернути ПЕРШЕ парне число

Це важливо.

Наприклад:

    [1, 3, 7, 8, 10]

Правильний результат:

    8

а не:

    [8, 10]

---

# 5. Constraints

Constraints — обмеження задачі.

Наприклад:

    numbers.length <= 100

або:

    numbers.length <= 1,000,000

або:

    array contains only positive integers

або:

    values are unique

Constraints впливають на вибір алгоритму.

---

# Чому constraints важливі

При маленькому масиві:

    n <= 100

простий алгоритм може бути достатнім.

При:

    n <= 1,000,000

неефективний алгоритм може стати проблемою.

Наприклад:

    O(n²)

може бути значно дорожчим за:

    O(n)

Тому перед вибором алгоритму потрібно дивитися не тільки на задачу, але й на обмеження.

---

# 6. Examples

Приклад — один із найкращих способів зрозуміти задачу.

Наприклад:

    Input:
        [1, 2, 3, 4]

    Output:
        10

Ще один:

    Input:
        [5, 10]

    Output:
        15

Ще:

    Input:
        []

    Output:
        ?

Тут виникає важливе питання:

    Що робити з порожнім масивом?

Саме так ми знаходимо edge cases.

---

# 7. Edge Cases

Edge case — особливий випадок, який може зламати або змінити логіку алгоритму.

Для масиву:

    []

    [1]

    [1, 2]

Для чисел:

    0

    -1

    Number.MAX_SAFE_INTEGER

Для string:

    ""

    "a"

Для boolean:

    true

    false

---

# Типові Edge Cases

При роботі з масивом перевіряй:

    empty array
    one element
    two elements
    duplicate values
    negative values
    zero
    already sorted
    reverse sorted
    very large input

При роботі з string:

    empty string
    one character
    spaces
    uppercase / lowercase
    repeated characters
    special characters

---

# Приклад Edge Case

Задача:

    знайти найбільше число в масиві

Звичайний випадок:

    [3, 7, 2, 9]

Результат:

    9

Але:

    []

Що повернути?

Можливі варіанти:

    undefined
    null
    error

Це має бути визначено requirements задачі.

---

# 8. Clarify Ambiguity

Іноді умова задачі неоднозначна.

Наприклад:

    "Find a duplicate."

Потрібно уточнити:

    знайти будь-який duplicate?

    знайти всі duplicates?

    повернути перший duplicate?

    повернути кількість duplicates?

    повернути boolean?

Не можна будувати алгоритм, якщо незрозуміло, що саме має бути результатом.

---

# 9. Decomposition

Decomposition — розбиття великої задачі на маленькі підзадачі.

Наприклад:

    Знайти найдовше слово в реченні.

Можна розбити:

    1. отримати sentence
    2. розділити sentence на words
    3. перебрати words
    4. визначити довжину кожного word
    5. зберігати найдовше word
    6. повернути результат

Велика задача:

    findLongestWord()

перетворюється на кілька простих операцій.

---

# Divide and Conquer як спосіб мислення

Не плутати з конкретним алгоритмічним підходом Divide and Conquer.

На базовому рівні корисно мислити:

    large problem
         ↓
    smaller problems
         ↓
    solve each part
         ↓
    combine result

Наприклад:

    Process users

можна розкласти на:

    get users
    validate users
    transform users
    filter users
    calculate result

---

# 10. Pattern Recognition

Pattern recognition — пошук закономірності.

Наприклад:

    [2, 4, 6, 8, 10]

Можна помітити:

    кожне наступне число = попереднє + 2

Або:

    [1, 2, 3, 4, 5]

Потрібно знайти:

    sum

Можна використати accumulator:

    total = 0

---

# Типові алгоритмічні patterns

Поступово потрібно навчитися впізнавати:

    counting
    accumulation
    searching
    filtering
    transformation
    frequency counter
    two pointers
    sliding window
    recursion
    sorting
    binary search

У цьому курсі вони будуть розглянуті окремо.

---

# 11. Brute Force

Brute force — прямолінійний підхід, який перебирає всі можливі варіанти.

Наприклад:

    знайти два числа,
    сума яких дорівнює target.

Можна перевірити кожну пару:

    for each number
        for each other number
            check sum

Приклад:

    const numbers = [2, 7, 11, 15];
    const target = 9;

    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] === target) {
                return [numbers[i], numbers[j]];
            }
        }
    }

Це просте для розуміння рішення.

Але має:

    O(n²)

Пізніше його можна оптимізувати.

---

# Brute Force — не означає погано

Brute force може бути хорошим першим рішенням.

Його переваги:

    simple
    easy to understand
    easy to implement
    easy to verify

Недолік:

    може бути повільним для великих input

Тому корисна стратегія:

    1. solve
    2. verify
    3. analyze
    4. optimize

---

# 12. Optimization

Optimization — покращення алгоритму без зміни правильного результату.

Наприклад:

    O(n²)

можна замінити на:

    O(n)

за допомогою додаткової структури даних.

Наприклад:

    Set
    Map
    Object

---

# Correctness Before Optimization

Одна з найважливіших правил:

    Correctness first.
    Optimization second.

Спочатку:

    чи дає алгоритм правильний результат?

Потім:

    чи можна зробити його швидшим?

Не варто оптимізувати неправильний алгоритм.

---

# 13. Pseudocode

Pseudocode — опис алгоритму без прив'язки до конкретного синтаксису мови.

Наприклад:

    Problem:
    find the largest number

Pseudocode:

    SET max to first number

    FOR each number
        IF number > max
            SET max to number

    RETURN max

Після цього JavaScript:

    function findMax(numbers) {
        let max = numbers[0];

        for (const number of numbers) {
            if (number > max) {
                max = number;
            }
        }

        return max;
    }

---

# Навіщо pseudocode

Pseudocode допомагає:

    думати про алгоритм
    без синтаксису JavaScript

Наприклад, не потрібно одразу думати:

    for (const number of numbers)

Спочатку:

    пройти всі числа

Потім:

    порівняти кожне число з max

Потім:

    оновити max

---

# 14. Algorithm vs Code

Algorithm:

    1. Start with first number
    2. Compare with current maximum
    3. Update maximum
    4. Continue
    5. Return maximum

Code:

    function findMax(numbers) {
        let max = numbers[0];

        for (const number of numbers) {
            if (number > max) {
                max = number;
            }
        }

        return max;
    }

Тобто:

    Algorithm = logic

    Code = implementation

---

# 15. Dry Run

Dry run — ручне виконання алгоритму крок за кроком.

Наприклад:

    numbers = [3, 7, 2, 9]

Алгоритм:

    max = 3

Перша перевірка:

    7 > 3
    true

Отже:

    max = 7

Далі:

    2 > 7
    false

max залишається:

    7

Далі:

    9 > 7
    true

Отже:

    max = 9

Результат:

    9

---

# Таблиця Dry Run

Для складніших задач корисно створювати таблицю.

Наприклад:

    numbers = [3, 7, 2, 9]

    i     number     max
    ---------------------
    0       3         3
    1       7         7
    2       2         7
    3       9         9

Це допомагає побачити, як змінюється state алгоритму.

---

# 16. State

State — поточний стан даних, які алгоритм змінює під час виконання.

Наприклад:

    let max = 3;

Після обробки:

    max = 7;

Потім:

    max = 9;

`max` — частина state алгоритму.

Інші приклади:

    count
    sum
    result
    current
    left
    right
    start
    end

---

# 17. Invariant

Invariant — умова, яка залишається істинною протягом виконання алгоритму.

Наприклад, при пошуку максимуму:

    max = найбільше число серед
          вже оброблених елементів

Після кожної ітерації це твердження залишається правильним.

Це допомагає довести correctness алгоритму.

---

# 18. Accumulator

Accumulator — змінна, яка поступово накопичує результат.

Наприклад:

    const numbers = [1, 2, 3, 4];

    let sum = 0;

    for (const number of numbers) {
        sum += number;
    }

    console.log(sum);
    // 10

Тут:

    sum

є accumulator.

---

# Інші accumulator patterns

### Sum

    let sum = 0;

    for (const number of numbers) {
        sum += number;
    }

---

### Product

    let product = 1;

    for (const number of numbers) {
        product *= number;
    }

---

### Count

    let count = 0;

    for (const number of numbers) {
        if (number > 10) {
            count++;
        }
    }

---

### Result array

    const result = [];

    for (const number of numbers) {
        if (number > 10) {
            result.push(number);
        }
    }

---

# 19. Search Pattern

Багато задач зводяться до:

    пройти дані
    ↓
    перевірити condition
    ↓
    знайти потрібний element
    ↓
    повернути result

Наприклад:

    const numbers = [4, 7, 2, 9];

    for (const number of numbers) {
        if (number === 7) {
            return number;
        }
    }

---

# 20. Early Return

Якщо результат вже знайдено, не завжди потрібно продовжувати цикл.

Наприклад:

    function contains(numbers, target) {
        for (const number of numbers) {
            if (number === target) {
                return true;
            }
        }

        return false;
    }

Як тільки знайдено:

    number === target

функція завершується.

Це називається early return.

---

# Early Termination

Іноді можна завершити алгоритм раніше.

Наприклад:

    function findFirstEven(numbers) {
        for (const number of numbers) {
            if (number % 2 === 0) {
                return number;
            }
        }

        return undefined;
    }

Для:

    [1, 3, 5, 8, 10]

результат:

    8

Після `8` решта масиву вже не потрібна.

---

# 21. Filtering Pattern

Filtering — вибір елементів, які відповідають умові.

Наприклад:

    const numbers = [1, 2, 3, 4, 5, 6];

    const result = [];

    for (const number of numbers) {
        if (number % 2 === 0) {
            result.push(number);
        }
    }

Результат:

    [2, 4, 6]

Пізніше це можна записати через:

    const result = numbers.filter(number => number % 2 === 0);

---

# 22. Transformation Pattern

Transformation — перетворення кожного елемента.

Наприклад:

    const numbers = [1, 2, 3];

    const result = [];

    for (const number of numbers) {
        result.push(number * 2);
    }

Результат:

    [2, 4, 6]

Пізніше:

    const result = numbers.map(number => number * 2);

---

# 23. Counting Pattern

Counting — підрахунок елементів, які відповідають умові.

Наприклад:

    const numbers = [1, 5, 8, 2, 10];

    let count = 0;

    for (const number of numbers) {
        if (number > 5) {
            count++;
        }
    }

Результат:

    2

---

# 24. Maximum Pattern

Пошук максимуму:

    const numbers = [3, 8, 2, 10, 5];

    let max = numbers[0];

    for (const number of numbers) {
        if (number > max) {
            max = number;
        }
    }

Результат:

    10

---

# 25. Minimum Pattern

Пошук мінімуму:

    const numbers = [3, 8, 2, 10, 5];

    let min = numbers[0];

    for (const number of numbers) {
        if (number < min) {
            min = number;
        }
    }

Результат:

    2

---

# 26. Compare Adjacent Elements

Деякі задачі вимагають порівнювати сусідні елементи.

Наприклад:

    const numbers = [1, 2, 4, 3];

    for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] > numbers[i + 1]) {
            console.log("Not sorted");
        }
    }

Порівнюємо:

    numbers[i]
    numbers[i + 1]

Цей pattern буде важливим для sorting та array problems.

---

# 27. Multiple Conditions

Алгоритм може містити кілька умов.

Наприклад:

    function classify(number) {
        if (number > 0) {
            return "positive";
        }

        if (number < 0) {
            return "negative";
        }

        return "zero";
    }

Тут є три cases:

    positive
    negative
    zero

---

# 28. Boolean Decision

Багато алгоритмів повинні відповісти лише:

    true / false

Наприклад:

    Чи є в масиві парне число?

    function hasEven(numbers) {
        for (const number of numbers) {
            if (number % 2 === 0) {
                return true;
            }
        }

        return false;
    }

---

# 29. Input Validation

Перед виконанням алгоритму іноді потрібно перевірити input.

Наприклад:

    function divide(a, b) {
        if (b === 0) {
            return undefined;
        }

        return a / b;
    }

Важливо визначити:

    які input допустимі?

---

# 30. Assumptions

Assumption — припущення про input.

Наприклад:

    "The array contains only numbers."

Тоді можна не перевіряти:

    typeof number

для кожного елемента.

Але якщо requirements цього не гарантують, така перевірка може бути необхідною.

---

# Assumptions vs Requirements

Requirements:

    Array contains integers.

Тоді це не просто припущення.

Це частина умови задачі.

Assumption:

    Ми самі припустили, що input завжди правильний.

Важливо не плутати ці поняття.

---

# 31. Test Cases

Після написання алгоритму потрібно перевірити його на різних input.

Наприклад:

    normal case
    edge case
    empty case
    minimum case
    maximum case
    duplicate case
    invalid case

---

# Test Case Example

Задача:

    findMax(numbers)

Перевірки:

    [3, 7, 2]
        → 7

    [1]
        → 1

    [-5, -2, -10]
        → -2

    [5, 5, 5]
        → 5

    []
        → ?

---

# 32. Expected Result

Для кожного test case потрібно знати expected result.

Наприклад:

    Input:
        [2, 4, 6]

    Expected:
        12

Після запуску:

    Actual:
        12

Отже:

    Actual === Expected

Тест пройдено.

---

# 33. Debugging

Debugging — пошук та виправлення помилок.

Основний цикл:

    reproduce
       ↓
    inspect
       ↓
    identify
       ↓
    fix
       ↓
    test again

---

# Console Debugging

Наприклад:

    function sum(numbers) {
        let total = 0;

        for (const number of numbers) {
            console.log({
                number,
                total
            });

            total += number;
        }

        return total;
    }

Можна побачити state на кожній iteration.

---

# 34. Read the Error

При помилці не потрібно одразу переписувати весь код.

Спочатку:

    1. прочитати error message
    2. знайти file
    3. знайти line
    4. зрозуміти type error
    5. перевірити input
    6. перевірити assumptions
    7. перевірити logic

---

# 35. Syntax vs Logic Error

Syntax error:

    JavaScript не може правильно прочитати код.

Logic error:

    код працює,
    але дає неправильний результат.

Наприклад:

    const numbers = [1, 2, 3];

    let sum = 0;

    for (const number of numbers) {
        sum *= number;
    }

Код синтаксично правильний.

Але логіка неправильна для задачі "знайти суму".

Потрібно:

    sum += number;

---

# 36. Runtime Error

Runtime error виникає під час виконання програми.

Наприклад:

    const user = null;

    console.log(user.name);

JavaScript не може отримати:

    name

із:

    null

---

# 37. Step-by-Step Implementation

Не потрібно писати всю складну функцію одразу.

Краще:

    Step 1:
        отримати input

    Step 2:
        створити необхідні variables

    Step 3:
        пройти data

    Step 4:
        перевірити condition

    Step 5:
        оновити state

    Step 6:
        повернути result

---

# Приклад

Задача:

    Порахувати кількість парних чисел.

Step 1:

    input:
        numbers

Step 2:

    count = 0

Step 3:

    пройти всі numbers

Step 4:

    перевірити:
        number % 2 === 0

Step 5:

    count++

Step 6:

    return count

Код:

    function countEven(numbers) {
        let count = 0;

        for (const number of numbers) {
            if (number % 2 === 0) {
                count++;
            }
        }

        return count;
    }

---

# 38. Do Not Code Too Early

Поганий workflow:

    read problem
       ↓
    immediately write code
       ↓
    get stuck
       ↓
    randomly change code

Кращий workflow:

    read
       ↓
    understand
       ↓
    examples
       ↓
    input/output
       ↓
    edge cases
       ↓
    algorithm
       ↓
    pseudocode
       ↓
    code
       ↓
    tests
       ↓
    optimization

---

# 39. Start With the Simplest Solution

Якщо задача складна, спочатку спробуй:

    simplest correct solution

Наприклад:

    nested loops

навіть якщо пізніше виявиться, що можна використати:

    Set
    Map
    two pointers
    sliding window

Це дозволяє спочатку зрозуміти задачу.

---

# 40. Improve Step by Step

Після першого correct solution:

    Can I reduce work?

    Can I avoid repeated calculations?

    Can I stop earlier?

    Can I use a Set?

    Can I use a Map?

    Can I avoid nested loops?

    Can I process data once?

---

# 41. Repeated Work

Одна з основних причин повільних алгоритмів — повторення тієї самої роботи.

Наприклад:

    for each item
        search the whole array

Може створити:

    O(n²)

Іноді краще один раз створити:

    Set

або:

    Map

і виконувати швидший lookup.

---

# 42. Trade-off

Trade-off — компроміс між різними властивостями рішення.

Наприклад:

    більше memory
        ↓
    швидший lookup

або:

    менше memory
        ↓
    більше computation

Типовий приклад:

    Array.includes()

проти:

    Set.has()

`Set` може вимагати додаткової пам'яті, але дозволяє ефективніше виконувати пошук у відповідних задачах.

---

# 43. Time Complexity

Time complexity описує, як змінюється кількість роботи алгоритму зі збільшенням input.

Наприклад:

    O(1)
    O(n)
    O(n²)

На цьому етапі достатньо розуміти базову ідею.

---

# O(1)

Constant time.

Кількість операцій не залежить від розміру input.

Наприклад:

    const first = numbers[0];

Умовно:

    O(1)

---

# O(n)

Linear time.

Якщо input збільшився приблизно в 2 рази, кількість роботи також приблизно збільшиться в 2 рази.

Наприклад:

    for (const number of numbers) {
        console.log(number);
    }

Приблизно:

    O(n)

---

# O(n²)

Quadratic time.

Наприклад:

    for (const a of numbers) {
        for (const b of numbers) {
            console.log(a, b);
        }
    }

Приблизно:

    O(n²)

---

# 44. Space Complexity

Space complexity описує додаткову пам'ять, яку використовує алгоритм.

Наприклад:

    const result = [];

    for (const number of numbers) {
        result.push(number * 2);
    }

Створюється новий масив.

Отже, додаткова пам'ять залежить від:

    n

і приблизно:

    O(n)

---

# 45. Time vs Space

Алгоритм потрібно розглядати щонайменше з двох боків:

    Time Complexity
        ↓
    скільки роботи?

    Space Complexity
        ↓
    скільки додаткової пам'яті?

Наприклад:

    faster algorithm
        +
    more memory

або:

    slower algorithm
        +
    less memory

Це і є trade-off.

---

# 46. Correctness

Алгоритм повинен не просто завершуватися.

Він повинен давати правильний результат.

Потрібно перевірити:

    normal cases
    edge cases
    boundary cases
    invalid cases

---

# 47. Boundary Cases

Boundary case — випадок на межі допустимого input.

Наприклад:

    n = 0

    n = 1

    n = 100

якщо:

    0 <= n <= 100

Особливо важливо перевіряти:

    minimum
    maximum

---

# 48. Off-by-One Errors

Off-by-one error — помилка на одну позицію.

Наприклад:

    for (let i = 0; i <= numbers.length; i++) {
        ...
    }

Правильний варіант:

    for (let i = 0; i < numbers.length; i++) {
        ...
    }

Це одна з найпоширеніших помилок при роботі з масивами.

---

# 49. Naming

Правильні назви variables допомагають зрозуміти алгоритм.

Погано:

    let x = 0;
    let y = 0;

Краще:

    let count = 0;
    let sum = 0;

Для пошуку:

    let result;

Для двох покажчиків:

    let left = 0;
    let right = numbers.length - 1;

Назви повинні відображати роль variable.

---

# 50. Functions as Algorithm Units

Складну логіку можна розбивати на функції.

Наприклад:

    function isEven(number) {
        return number % 2 === 0;
    }

    function countEven(numbers) {
        let count = 0;

        for (const number of numbers) {
            if (isEven(number)) {
                count++;
            }
        }

        return count;
    }

Так код легше:

    читати
    тестувати
    повторно використовувати
    змінювати

---

# 51. Pure Functions

Для алгоритмів часто зручно використовувати pure functions.

Pure function:

    однаковий input
        ↓
    однаковий output

і вона не змінює зовнішній state.

Наприклад:

    function square(number) {
        return number * number;
    }

    square(5);
    // 25

---

# 52. Side Effects

Side effect — зміна чогось поза локальним результатом функції.

Наприклад:

    let total = 0;

    function add(number) {
        total += number;
    }

Функція змінює зовнішній state.

Для навчання алгоритмів часто корисно спочатку писати функції, які:

    input → output

---

# 53. Mutating Input

Наприклад:

    function sortNumbers(numbers) {
        numbers.sort();
        return numbers;
    }

Тут original array змінюється.

При роботі з алгоритмами потрібно свідомо вирішувати:

    mutate input

або:

    create new result

---

# 54. Problem Solving Template

Для більшості задач можна використовувати такий шаблон:

    ## Problem

    Що потрібно зробити?

    ## Input

    Які дані отримуємо?

    ## Output

    Що повинні повернути?

    ## Constraints

    Які є обмеження?

    ## Examples

    Які приклади?

    ## Edge Cases

    Які особливі випадки?

    ## Approach

    Яка ідея рішення?

    ## Pseudocode

    Які кроки алгоритму?

    ## Implementation

    Реалізація JavaScript.

    ## Tests

    Перевірка результатів.

    ## Complexity

    Time:
        ?

    Space:
        ?

---

# 55. Практичний алгоритмічний шаблон

Перед кодом запитай себе:

    1. Що дано?

    2. Що потрібно повернути?

    3. Який тип input?

    4. Який тип output?

    5. Які constraints?

    6. Які edge cases?

    7. Чи можу я вирішити задачу простим способом?

    8. Чи є повторна робота?

    9. Чи потрібен Set або Map?

    10. Чи потрібен loop?

    11. Чи потрібні два pointers?

    12. Чи потрібне sorting?

    13. Чи потрібна recursion?

    14. Яка time complexity?

    15. Яка space complexity?

---

# 56. Example — Find Maximum

## Problem

Знайти найбільше число в масиві.

## Input

    [3, 7, 2, 9, 4]

## Output

    9

## Approach

    1. Взяти перший елемент як max.
    2. Пройти масив.
    3. Якщо поточне число більше max,
       оновити max.
    4. Повернути max.

## Pseudocode

    SET max to first element

    FOR each number
        IF number > max
            SET max to number

    RETURN max

## Implementation

    function findMax(numbers) {
        let max = numbers[0];

        for (const number of numbers) {
            if (number > max) {
                max = number;
            }
        }

        return max;
    }

## Complexity

    Time:
        O(n)

    Space:
        O(1)

---

# 57. Example — Count Even Numbers

## Problem

Порахувати кількість парних чисел.

## Input

    [1, 2, 4, 7, 10]

## Output

    3

## Pseudocode

    SET count to 0

    FOR each number
        IF number is even
            increment count

    RETURN count

## Implementation

    function countEven(numbers) {
        let count = 0;

        for (const number of numbers) {
            if (number % 2 === 0) {
                count++;
            }
        }

        return count;
    }

## Complexity

    Time:
        O(n)

    Space:
        O(1)

---

# 58. Example — Find First Positive

## Problem

Знайти перше позитивне число.

## Input

    [-3, -2, 0, 5, 8]

## Output

    5

## Pseudocode

    FOR each number
        IF number > 0
            RETURN number

    RETURN undefined

## Implementation

    function findFirstPositive(numbers) {
        for (const number of numbers) {
            if (number > 0) {
                return number;
            }
        }

        return undefined;
    }

## Complexity

    Best case:
        O(1)

    Worst case:
        O(n)

    Space:
        O(1)

---

# 59. Example — Reverse String

## Problem

Перевернути string.

## Input

    "hello"

## Output

    "olleh"

## Simple approach

    const word = "hello";

    const result = word.split("").reverse().join("");

## Algorithmic approach

    function reverseString(value) {
        let result = "";

        for (let i = value.length - 1; i >= 0; i--) {
            result += value[i];
        }

        return result;
    }

## Complexity

    Time:
        O(n)

    Space:
        O(n)

Цей приклад буде розвиватися в:

    02-string-manipulation

---

# 60. Example — Check Sorted Array

## Problem

Перевірити, чи відсортований масив за зростанням.

## Input

    [1, 2, 3, 4]

## Output

    true

Інший:

    [1, 3, 2, 4]

Результат:

    false

## Pseudocode

    FOR each adjacent pair
        IF current > next
            RETURN false

    RETURN true

## Implementation

    function isSorted(numbers) {
        for (let i = 0; i < numbers.length - 1; i++) {
            if (numbers[i] > numbers[i + 1]) {
                return false;
            }
        }

        return true;
    }

## Complexity

    Time:
        O(n)

    Space:
        O(1)

---

# 61. Example — Find Duplicate

## Problem

Перевірити, чи містить масив duplicate.

## Input

    [1, 2, 3, 2]

## Output

    true

## Simple approach

    function hasDuplicate(numbers) {
        for (let i = 0; i < numbers.length; i++) {
            for (let j = i + 1; j < numbers.length; j++) {
                if (numbers[i] === numbers[j]) {
                    return true;
                }
            }
        }

        return false;
    }

Це brute force.

Complexity:

    Time:
        O(n²)

    Space:
        O(1)

Пізніше можна використати:

    Set

і отримати ефективніше рішення.

---

# 62. Think in Patterns

Коли бачиш задачу, спробуй визначити pattern.

### Потрібно пройти всі елементи

    loop

### Потрібно накопичити результат

    accumulator

### Потрібно порахувати

    counter

### Потрібно знайти один елемент

    search

### Потрібно вибрати елементи

    filter

### Потрібно змінити кожен елемент

    transformation

### Потрібно знайти duplicate

    Set / frequency counter

### Потрібно працювати з двома кінцями масиву

    two pointers

### Потрібно працювати з ділянкою масиву

    sliding window

### Потрібно розв'язати задачу через менші копії самої себе

    recursion

---

# 63. Brute Force → Pattern → Optimization

Корисна модель навчання:

    Problem
       ↓
    Brute Force
       ↓
    Understand why it works
       ↓
    Identify repeated work
       ↓
    Find pattern
       ↓
    Optimize
       ↓
    Analyze complexity

Це важливіше, ніж просто запам'ятовувати готові алгоритми.

---

# 64. Algorithm Selection

Не існує одного алгоритму для всіх задач.

Потрібно вибирати підхід відповідно до задачі.

Наприклад:

    simple traversal
        ↓
    for / for...of

    search in sorted data
        ↓
    binary search

    count occurrences
        ↓
    frequency counter

    compare from both ends
        ↓
    two pointers

    continuous subarray
        ↓
    sliding window

    repeated self-similar problem
        ↓
    recursion

---

# 65. Readability

Алгоритм повинен бути не тільки correct.

Він повинен бути зрозумілим.

Погано:

    function f(a) {
        let x = 0;

        for (const y of a) {
            if (y > 5) x++;
        }

        return x;
    }

Краще:

    function countNumbersGreaterThanFive(numbers) {
        let count = 0;

        for (const number of numbers) {
            if (number > 5) {
                count++;
            }
        }

        return count;
    }

Для навчання алгоритмів читабельність особливо важлива.

---

# 66. Avoid Clever Code

Не потрібно намагатися зробити алгоритм максимально коротким.

Наприклад:

    const result = numbers.reduce((a, b) => a > b ? a : b);

може бути коротшим, але:

    let max = numbers[0];

    for (const number of numbers) {
        if (number > max) {
            max = number;
        }
    }

може бути зрозумілішим для навчання алгоритму.

Мета:

    understand the algorithm

а не:

    write the fewest characters

---

# 67. Refactoring

Після того як алгоритм працює, можна покращити:

    naming
    structure
    duplication
    readability
    complexity

Наприклад:

    працює
       ↓
    зрозуміло
       ↓
    чисто
       ↓
    ефективно

Не обов'язково робити все одночасно.

---

# 68. Generalization

Після розв'язання задачі корисно запитати:

    Чи працює мій алгоритм
    тільки для цього прикладу?

Наприклад:

    [1, 2, 3]

не повинно бути особливим випадком.

Функція повинна працювати для:

    [10, 20, 30]

    [-5, 0, 8]

    [100]

якщо це дозволено requirements.

---

# 69. General Algorithm Thinking

Замість:

    "Як вирішити саме цей приклад?"

думай:

    "Яке правило вирішує
     всі допустимі випадки цієї задачі?"

Це одна з головних відмінностей між:

    solving an example

та:

    designing an algorithm

---

# 70. Problem Solving Checklist

Перед реалізацією:

    [ ] Я зрозумів задачу?

    [ ] Я можу пояснити її своїми словами?

    [ ] Я знаю input?

    [ ] Я знаю output?

    [ ] Я знаю constraints?

    [ ] Я маю приклад?

    [ ] Я перевірив edge cases?

    [ ] Я знаю базовий алгоритм?

    [ ] Я можу описати його словами?

    [ ] Я можу написати pseudocode?

---

Після реалізації:

    [ ] Код дає правильний результат?

    [ ] Перевірені normal cases?

    [ ] Перевірені edge cases?

    [ ] Перевірені boundary cases?

    [ ] Немає off-by-one errors?

    [ ] Немає зайвої роботи?

    [ ] Яка time complexity?

    [ ] Яка space complexity?

    [ ] Чи можна покращити readability?

---

# 71. Interview Problem Solving

На співбесіді важливо не просто написати код.

Корисно пояснювати хід думок:

    1. Let's clarify the problem.

    2. The input is...

    3. The output should be...

    4. The main edge cases are...

    5. A simple approach is...

    6. The time complexity is...

    7. The space complexity is...

    8. We can optimize it by...

---

# Приклад пояснення

    "We have an array of numbers.
     We need to find the maximum value.

     I will start with the first element
     as the current maximum.

     Then I will iterate through the array.

     If the current number is greater
     than the maximum, I update it.

     At the end I return the maximum.

     This takes O(n) time
     and O(1) extra space."

Це вже демонструє algorithmic thinking.

---

# Типові помилки

❌ Починати писати код, не зрозумівши умову.

---

❌ Не визначати input та output.

---

❌ Ігнорувати constraints.

---

❌ Перевіряти тільки один приклад.

---

❌ Не думати про empty input.

---

❌ Не перевіряти negative values.

---

❌ Не перевіряти duplicates.

---

❌ Забувати boundary cases.

---

❌ Робити неправильні assumptions.

---

❌ Одразу шукати "найрозумніший" алгоритм.

Спочатку краще знайти просте correct solution.

---

❌ Оптимізувати до того, як рішення стало correct.

---

❌ Плутати короткий код з хорошим алгоритмом.

---

❌ Використовувати складну структуру даних без потреби.

---

❌ Ігнорувати complexity.

---

❌ Не пояснювати, чому алгоритм працює.

---

❌ Не перевіряти алгоритм вручну.

---

# Питання зі співбесіди

Що таке algorithm?

Що таке problem solving?

Чим algorithm відрізняється від code?

Що таке input?

Що таке output?

Що таке requirements?

Що таке constraints?

Що таке edge case?

Що таке boundary case?

Що таке test case?

Що таке expected result?

Що таке pseudocode?

Навіщо потрібен pseudocode?

Що таке brute force?

Чи завжди brute force є поганим рішенням?

Що таке optimization?

Чому спочатку потрібно отримати correct solution?

Що таке dry run?

Що таке debugging?

Чим syntax error відрізняється від logic error?

Що таке runtime error?

Що таке off-by-one error?

Що таке accumulator?

Що таке counter?

Що таке early return?

Що таке early termination?

Що таке invariant?

Що таке time complexity?

Що таке space complexity?

Що таке trade-off?

Як вибрати алгоритм для задачі?

Як знайти edge cases?

Як розбити складну задачу на підзадачі?

Як перевірити правильність алгоритму?

Як покращити brute-force рішення?

---

# Шлях

## 🟢 Core — обов'язково знати

Розуміння:

    problem
    input
    output
    requirements
    constraints

Уміння:

    прочитати задачу
    переформулювати задачу
    визначити input/output
    знайти edge cases
    навести examples
    розбити задачу на кроки
    написати простий алгоритм
    написати pseudocode
    реалізувати алгоритм

Основні patterns:

    counting
    accumulation
    searching
    filtering
    transformation
    maximum
    minimum

Основи:

    brute force
    debugging
    testing
    dry run
    early return
    off-by-one errors

Основи complexity:

    O(1)
    O(n)
    O(n²)

---

## 🔵 Junior

Впевнено розуміти:

    decomposition
    pattern recognition
    brute force
    optimization
    edge cases
    constraints
    trade-offs

Уміти:

    вирішувати прості array problems
    вирішувати string problems
    використовувати loops
    використовувати conditions
    створювати accumulator
    створювати counters
    виконувати early termination
    перевіряти boundary cases
    робити dry run

Розуміти:

    Set
    Map
    basic searching
    basic sorting

Уміти оцінити:

    time complexity
    space complexity

І пояснити рішення словами.

---

## 🟠 Middle

Глибше розуміти:

    algorithmic patterns
    invariants
    optimization
    trade-offs
    data structures

Вміти розпізнавати:

    frequency counter
    two pointers
    sliding window
    recursion
    binary search

Вміти:

    переходити від brute force
    до optimized solution

Розуміти:

    O(1)
    O(log n)
    O(n)
    O(n log n)
    O(n²)

Розуміти:

    time vs space trade-offs

Вміти обґрунтувати:

    чому алгоритм працює
    чому він correct
    чому має таку complexity
    чому вибрано саме цей approach

---

## 🔴 Senior

Глибоке algorithmic thinking:

    problem modeling
    invariant reasoning
    correctness proofs
    advanced optimization
    algorithm selection
    data structure selection

Розуміння:

    amortized analysis
    recursion complexity
    divide and conquer
    greedy algorithms
    dynamic programming
    graph algorithms
    advanced searching
    advanced sorting

Глибоке розуміння:

    time complexity
    space complexity
    memory behavior
    trade-offs
    scalability

Уміння:

    знаходити bottlenecks
    проектувати efficient algorithms
    пояснювати correctness
    порівнювати підходи
    оцінювати scalability
    вибирати відповідну data structure

---

# Міні-шпаргалка

## Problem Solving

    Problem
       ↓
    Understand
       ↓
    Input / Output
       ↓
    Constraints
       ↓
    Examples
       ↓
    Edge Cases
       ↓
    Approach
       ↓
    Pseudocode
       ↓
    Implementation
       ↓
    Tests
       ↓
    Complexity
       ↓
    Optimization

---

## Input / Output

    INPUT
      ↓
    PROCESS
      ↓
    OUTPUT

---

## Основні питання

    What do I have?

    What do I need?

    What are the constraints?

    What are the edge cases?

    What is the simplest solution?

    Can I optimize it?

---

## Brute Force

    Problem
       ↓
    Try all possibilities
       ↓
    Correct result

Плюси:

    simple
    understandable
    easy to verify

Мінус:

    may be inefficient

---

## Optimization

    Correct solution
         ↓
    Analyze work
         ↓
    Find repeated work
         ↓
    Identify pattern
         ↓
    Improve algorithm

---

## Common Patterns

    Sum
        → accumulator

    Count
        → counter

    Find
        → search

    Select
        → filter

    Transform
        → map

    Maximum
        → current max

    Minimum
        → current min

    Duplicate
        → Set / frequency counter

    Two ends
        → two pointers

    Continuous range
        → sliding window

    Self-similar problem
        → recursion

---

## Complexity

    O(1)
        → constant

    O(log n)
        → logarithmic

    O(n)
        → linear

    O(n log n)
        → linearithmic

    O(n²)
        → quadratic

---

## Dry Run

    Input
      ↓
    Step 1
      ↓
    State
      ↓
    Step 2
      ↓
    State
      ↓
    ...
      ↓
    Output

---

## Algorithm vs Code

    Algorithm
        ↓
    logic / steps

    Code
        ↓
    implementation

---

# Головне

• Problem solving — це не написання коду якомога швидше.

• Спочатку потрібно зрозуміти задачу.

• Потрібно чітко визначити:

    input
    output
    requirements
    constraints

• Приклади допомагають перевірити розуміння задачі.

• Edge cases потрібно шукати до реалізації.

• Складну задачу корисно розбити на менші підзадачі.

• Потрібно навчитися бачити повторювані patterns.

• Pseudocode дозволяє продумати алгоритм без синтаксису JavaScript.

• Brute force часто є хорошою відправною точкою.

• Спочатку:

    correct

потім:

    efficient

• Не потрібно оптимізувати неправильний алгоритм.

• Dry run допомагає перевірити алгоритм вручну.

• Test cases повинні включати не тільки звичайні випадки, але й:

    empty input
    one element
    boundary values
    duplicates
    negative values
    special cases

• `accumulator` використовується для поступового накопичення результату.

• `counter` використовується для підрахунку.

• `early return` дозволяє завершити пошук одразу після знаходження результату.

• `early termination` може зменшити кількість непотрібних операцій.

• `Set` та `Map` часто допомагають уникати повторного пошуку.

• Time complexity показує, як росте кількість роботи зі збільшенням input.

• Space complexity показує, скільки додаткової пам'яті використовує алгоритм.

• Хороший алгоритм повинен бути:

    correct
    understandable
    testable
    maintainable
    sufficiently efficient

• Головна навичка problem solving — навчитися переходити від:

    "Я не знаю, як це зробити"

до:

    "Я можу розкласти задачу
     на прості кроки."

• Основна модель:

    understand
        ↓
    decompose
        ↓
    recognize pattern
        ↓
    design algorithm
        ↓
    pseudocode
        ↓
    implement
        ↓
    test
        ↓
    analyze
        ↓
    optimize

• І найважливіше:

    Не запам'ятовуй лише готові рішення.

    Навчайся бачити,
    ЯКУ ЛОГІКУ використовує задача
    і ЧОМУ цей алгоритм працює.