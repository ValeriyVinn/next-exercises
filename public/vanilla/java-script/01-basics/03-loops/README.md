## 03. Loops

Loops (цикли) — це конструкції JavaScript, які дозволяють багаторазово виконувати один і той самий блок коду, доки виконується певна умова.

Цикли використовуються, коли потрібно:

- повторити операцію певну кількість разів;
- пройти по елементах масиву;
- перебрати властивості об'єкта;
- виконувати код, поки виконується умова;
- обробити колекцію даних;
- повторювати дію до досягнення певного стану.

Основні цикли JavaScript:

    for
    while
    do...while
    for...of
    for...in

Також існують методи масивів, які часто замінюють традиційні цикли:

    forEach()
    map()
    filter()
    reduce()
    find()
    some()
    every()

---

### Ключові поняття

✔ loop  
✔ iteration  
✔ iteration variable  
✔ counter  
✔ condition  
✔ initialization  
✔ increment  
✔ decrement  
✔ `for`  
✔ `while`  
✔ `do...while`  
✔ `for...of`  
✔ `for...in`  
✔ `break`  
✔ `continue`  
✔ nested loops  
✔ infinite loop  
✔ array iteration  
✔ object iteration  
✔ iterable  
✔ iterator  

---

### Що потрібно пам'ятати

• Loop дозволяє повторно виконувати блок коду.

• Одна ітерація — одне виконання тіла циклу.

• `for` зручно використовувати, коли кількість ітерацій відома або контролюється лічильником.

• `while` зручно використовувати, коли повторення залежить від умови.

• `do...while` гарантовано виконує тіло циклу хоча б один раз.

• `for...of` використовується для перебору значень iterable-об'єктів, наприклад масивів.

• `for...in` використовується для перебору enumerable property keys об'єкта.

• `break` повністю зупиняє цикл.

• `continue` пропускає поточну ітерацію та переходить до наступної.

• Nested loop — цикл всередині іншого циклу.

• Infinite loop — цикл, який ніколи не завершується.

• При роботі з масивами часто краще використовувати методи:

    forEach()
    map()
    filter()
    reduce()
    find()
    some()
    every()

---

# Iteration

Iteration — одна операція повторення циклу.

Наприклад:

    for (let i = 0; i < 3; i++) {
        console.log(i);
    }

Результат:

    0
    1
    2

Тут відбулося 3 iterations.

---

# for

`for` — один із найважливіших циклів JavaScript.

Синтаксис:

    for (initialization; condition; increment) {
        // code
    }

Наприклад:

    for (let i = 0; i < 5; i++) {
        console.log(i);
    }

Результат:

    0
    1
    2
    3
    4

---

### Структура for

    for (
        initialization;
        condition;
        update
    ) {
        // body
    }

Наприклад:

    for (
        let i = 0;
        i < 5;
        i++
    ) {
        console.log(i);
    }

Тут:

    let i = 0  → initialization
    i < 5      → condition
    i++        → update
    console.log → body

---

# Як працює for

Цикл:

    for (let i = 0; i < 3; i++) {
        console.log(i);
    }

Працює приблизно так:

    1. let i = 0
    2. перевірити i < 3
    3. виконати body
    4. виконати i++
    5. перевірити i < 3
    6. виконати body
    7. виконати i++
    8. перевірити i < 3
    9. виконати body
    10. виконати i++
    11. умова false → завершити цикл

Результат:

    0
    1
    2

---

# Counter

У циклі `for` часто використовується counter.

    for (let i = 0; i < 10; i++) {
        console.log(i);
    }

`i` — counter.

Він змінюється:

    0
    1
    2
    3
    ...
    9

---

# Increment

Increment збільшує значення на 1.

    i++

Те саме:

    i = i + 1

Або:

    i += 1

---

# Decrement

Decrement зменшує значення на 1.

    i--

Те саме:

    i = i - 1

Або:

    i -= 1

---

### Зворотний цикл

    for (let i = 5; i > 0; i--) {
        console.log(i);
    }

Результат:

    5
    4
    3
    2
    1

---

# for з кроком

Крок може бути більшим за 1.

    for (let i = 0; i <= 10; i += 2) {
        console.log(i);
    }

Результат:

    0
    2
    4
    6
    8
    10

---

# while

`while` виконує код доти, доки умова truthy.

Синтаксис:

    while (condition) {
        // code
    }

Приклад:

    let i = 0;

    while (i < 5) {
        console.log(i);
        i++;
    }

Результат:

    0
    1
    2
    3
    4

---

### Як працює while

    let i = 0;

    while (i < 3) {
        console.log(i);
        i++;
    }

Логіка:

    condition
        ↓
    true → execute body
        ↓
    update
        ↓
    condition
        ↓
    false → stop

---

# while vs for

`for` часто використовується, коли цикл має явний counter:

    for (let i = 0; i < 10; i++) {
        ...
    }

`while` часто використовується, коли важливіша сама умова:

    while (isRunning) {
        ...
    }

Обидва цикли можуть виконувати багато однакових задач.

---

# do...while

`do...while` схожий на `while`, але тіло циклу виконується хоча б один раз.

Синтаксис:

    do {
        // code
    } while (condition);

Приклад:

    let i = 0;

    do {
        console.log(i);
        i++;
    } while (i < 5);

Результат:

    0
    1
    2
    3
    4

---

### Важлива відмінність

`while`:

    let i = 10;

    while (i < 5) {
        console.log(i);
    }

Нічого не виведе.

`do...while`:

    let i = 10;

    do {
        console.log(i);
    } while (i < 5);

Результат:

    10

Тіло виконується один раз перед першою перевіркою умови.

---

# for...of

`for...of` використовується для перебору значень iterable.

Найчастіше:

    arrays
    strings
    sets
    maps

Приклад з масивом:

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    for (const fruit of fruits) {
        console.log(fruit);
    }

Результат:

    apple
    banana
    orange

---

### for...of та array

    const numbers = [10, 20, 30];

    for (const number of numbers) {
        console.log(number);
    }

Результат:

    10
    20
    30

Тут отримуємо саме значення.

---

# for...of та string

String є iterable.

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

# for...of та index

`for...of` безпосередньо дає значення, а не index.

    const fruits = ["apple", "banana"];

    for (const fruit of fruits) {
        console.log(fruit);
    }

Результат:

    apple
    banana

Якщо потрібен index, можна використовувати:

    for (const [index, fruit] of fruits.entries()) {
        console.log(index, fruit);
    }

Результат:

    0 apple
    1 banana

---

# for...in

`for...in` перебирає enumerable property keys.

Найчастіше використовується з objects.

    const user = {
        name: "John",
        age: 25,
        city: "Kyiv"
    };

    for (const key in user) {
        console.log(key);
    }

Результат:

    name
    age
    city

---

### Отримання значення

    for (const key in user) {
        console.log(user[key]);
    }

Результат:

    John
    25
    Kyiv

---

# for...of vs for...in

Це дуже важлива різниця.

`for...of`:

    → values

`for...in`:

    → keys

Наприклад:

    const fruits = ["apple", "banana", "orange"];

    for (const fruit of fruits) {
        console.log(fruit);
    }

Результат:

    apple
    banana
    orange

А:

    for (const index in fruits) {
        console.log(index);
    }

Результат:

    0
    1
    2

Тобто:

    for...of → values
    for...in → keys

Для масивів зазвичай краще використовувати:

    for
    for...of
    array methods

а не `for...in`.

---

# break

`break` повністю припиняє виконання циклу.

    for (let i = 0; i < 10; i++) {
        if (i === 5) {
            break;
        }

        console.log(i);
    }

Результат:

    0
    1
    2
    3
    4

Коли:

    i === 5

виконується:

    break

і цикл завершується.

---

# continue

`continue` пропускає поточну ітерацію.

    for (let i = 0; i < 5; i++) {
        if (i === 2) {
            continue;
        }

        console.log(i);
    }

Результат:

    0
    1
    3
    4

Ітерація для:

    i === 2

була пропущена.

---

# break vs continue

    break
        ↓
    повністю завершити цикл

    continue
        ↓
    пропустити поточну ітерацію
    ↓
    перейти до наступної

---

# Nested Loops

Nested loop — цикл всередині іншого циклу.

Наприклад:

    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            console.log(i, j);
        }
    }

Результат:

    1 1
    1 2
    1 3
    2 1
    2 2
    2 3
    3 1
    3 2
    3 3

Зовнішній цикл виконується 3 рази.

Для кожної його ітерації внутрішній цикл виконується 3 рази.

Загалом:

    3 × 3 = 9 iterations

---

# Infinite Loop

Infinite loop — цикл, який ніколи не завершується.

Небезпечний приклад:

    let i = 0;

    while (i < 10) {
        console.log(i);
    }

`i` ніколи не змінюється.

Умова:

    i < 10

завжди залишається `true`.

Правильно:

    let i = 0;

    while (i < 10) {
        console.log(i);
        i++;
    }

---

# Loop Control

Цикл зазвичай має:

    initialization
        ↓
    condition
        ↓
    body
        ↓
    update
        ↓
    condition
        ↓
    ...

Наприклад:

    let i = 0;

    while (i < 5) {
        console.log(i);
        i++;
    }

Важливо контролювати зміну значення, яке впливає на condition.

---

# Loop Through Array

Класичний `for`:

    const numbers = [10, 20, 30];

    for (let i = 0; i < numbers.length; i++) {
        console.log(numbers[i]);
    }

Результат:

    10
    20
    30

---

# for...of для масиву

Часто простіше:

    const numbers = [10, 20, 30];

    for (const number of numbers) {
        console.log(number);
    }

Результат:

    10
    20
    30

Якщо index не потрібен, `for...of` часто читабельніший.

---

# forEach

Для масивів часто використовується:

    forEach()

Приклад:

    const numbers = [10, 20, 30];

    numbers.forEach((number) => {
        console.log(number);
    });

Результат:

    10
    20
    30

`forEach()` буде детально розглядатися у розділі:

    02-array-methods

---

# Loop vs Array Methods

Цикл:

    for (const number of numbers) {
        console.log(number);
    }

Метод:

    numbers.forEach((number) => {
        console.log(number);
    });

Для простого перебору обидва підходи можуть бути правильними.

Але array methods дозволяють виражати намір:

    map()
    filter()
    find()
    some()
    every()
    reduce()

Наприклад, якщо потрібно отримати новий масив, краще:

    const doubled = numbers.map(number => number * 2);

ніж вручну створювати його через цикл.

---

# Loop Through Object

Для об'єкта:

    const user = {
        name: "John",
        age: 25,
        city: "Kyiv"
    };

Можна використати:

    for (const key in user) {
        console.log(key, user[key]);
    }

---

### Object.keys()

Інший сучасний підхід:

    const keys = Object.keys(user);

    for (const key of keys) {
        console.log(key, user[key]);
    }

---

### Object.values()

Якщо потрібні тільки значення:

    const values = Object.values(user);

    for (const value of values) {
        console.log(value);
    }

---

### Object.entries()

Якщо потрібні key та value:

    const entries = Object.entries(user);

    for (const [key, value] of entries) {
        console.log(key, value);
    }

---

# Loop Patterns

## Counter

    for (let i = 0; i < 10; i++) {
        console.log(i);
    }

---

## Reverse Counter

    for (let i = 10; i > 0; i--) {
        console.log(i);
    }

---

## Step

    for (let i = 0; i <= 20; i += 5) {
        console.log(i);
    }

Результат:

    0
    5
    10
    15
    20

---

## Sum

    const numbers = [10, 20, 30];

    let sum = 0;

    for (const number of numbers) {
        sum += number;
    }

Результат:

    60

---

## Find

    const numbers = [10, 20, 30, 40];

    let result;

    for (const number of numbers) {
        if (number > 25) {
            result = number;
            break;
        }
    }

Результат:

    30

Пізніше це можна замінити на:

    const result = numbers.find(number => number > 25);

---

## Count

    const numbers = [10, 20, 30, 40];

    let count = 0;

    for (const number of numbers) {
        if (number >= 20) {
            count++;
        }
    }

Результат:

    3

---

# Nested Loop Example

Наприклад, таблиця множення:

    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            console.log(i * j);
        }
    }

Внутрішній цикл виконується для кожного значення зовнішнього циклу.

---

# Loop Labels

JavaScript дозволяє використовувати labels для керування вкладеними циклами.

Наприклад:

    outerLoop:
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (i === 1 && j === 1) {
                break outerLoop;
            }

            console.log(i, j);
        }
    }

`break outerLoop` завершить саме зовнішній цикл.

Labels використовуються рідко.

У більшості випадків код можна зробити зрозумілішим без них.

---

# Iterables

`for...of` працює з iterable objects.

Приклади:

    Array
    String
    Set
    Map

Наприклад:

    const set = new Set([1, 2, 3]);

    for (const value of set) {
        console.log(value);
    }

---

# Iterator

Iterable object має механізм отримання значень послідовно через iterator.

Спрощено:

    Iterable
       ↓
    Iterator
       ↓
    next()
       ↓
    value + done

На Core-рівні достатньо пам'ятати:

    for...of → перебирає values iterable

Поняття iterables та iterators буде важливішим на більш глибокому рівні JavaScript.

---

# Practical Examples

### Приклад 1 — числа від 1 до 10

    for (let i = 1; i <= 10; i++) {
        console.log(i);
    }

---

### Приклад 2 — парні числа

    for (let i = 0; i <= 20; i += 2) {
        console.log(i);
    }

---

### Приклад 3 — сума чисел

    const numbers = [5, 10, 15, 20];

    let sum = 0;

    for (const number of numbers) {
        sum += number;
    }

    console.log(sum);
    // 50

---

### Приклад 4 — пошук числа

    const numbers = [5, 10, 15, 20];

    let found = null;

    for (const number of numbers) {
        if (number === 15) {
            found = number;
            break;
        }
    }

    console.log(found);
    // 15

---

### Приклад 5 — пропустити парні числа

    for (let i = 0; i <= 10; i++) {
        if (i % 2 === 0) {
            continue;
        }

        console.log(i);
    }

Результат:

    1
    3
    5
    7
    9

---

### Приклад 6 — while

    let password = "";

    while (password !== "1234") {
        password = getPassword();
    }

Цикл продовжується, доки пароль не стане:

    "1234"

---

### Приклад 7 — do...while

    let number;

    do {
        number = Math.random();
    } while (number < 0.5);

Тіло виконується мінімум один раз.

---

### Приклад 8 — object

    const user = {
        name: "John",
        age: 25,
        city: "Kyiv"
    };

    for (const key in user) {
        console.log(`${key}: ${user[key]}`);
    }

---

### Приклад 9 — entries

    const user = {
        name: "John",
        age: 25
    };

    for (const [key, value] of Object.entries(user)) {
        console.log(key, value);
    }

---

# Типові помилки

❌ Забувати змінювати counter у `while`.

    let i = 0;

    while (i < 10) {
        console.log(i);
    }

Це infinite loop.

---

❌ Неправильна умова завершення.

    for (let i = 0; i > 10; i++) {
        ...
    }

Цикл не виконається жодного разу.

---

❌ Помилка на одну позицію.

Наприклад:

    const numbers = [10, 20, 30];

    for (let i = 0; i <= numbers.length; i++) {
        console.log(numbers[i]);
    }

Останньою ітерацією буде:

    numbers[3]

але такого елемента немає.

Правильно:

    for (let i = 0; i < numbers.length; i++) {
        console.log(numbers[i]);
    }

Це називається:

    off-by-one error

---

❌ Плутати `for...of` та `for...in`.

    for...of → values
    for...in → keys

---

❌ Використовувати `for...in` для масивів без необхідності.

Для масивів краще:

    for
    for...of
    array methods

---

❌ Забувати `break` у необхідному `switch` або неправильному control flow.

---

❌ Надмірно використовувати `break` та `continue`.

Іноді вони роблять логіку складнішою для читання.

---

❌ Створювати занадто глибокі nested loops.

Наприклад:

    for (...) {
        for (...) {
            for (...) {
                for (...) {
                    ...
                }
            }
        }
    }

Складність і читабельність можуть швидко погіршуватися.

---

❌ Використовувати цикл, коли array method краще виражає намір.

Наприклад, замість ручного пошуку:

    for (const user of users) {
        if (user.id === 10) {
            ...
        }
    }

часто краще:

    const user = users.find(user => user.id === 10);

---

# Питання зі співбесіди

Що таке loop?

Що таке iteration?

Які цикли існують у JavaScript?

Як працює `for`?

Які три основні частини має `for`?

Що таке initialization?

Що таке condition?

Що таке increment?

Що таке decrement?

Чим `for` відрізняється від `while`?

Чим `while` відрізняється від `do...while`?

Коли використовувати `do...while`?

Що таке `for...of`?

Що таке `for...in`?

Яка різниця між `for...of` та `for...in`?

Чому `for...in` зазвичай не використовують для масивів?

Що робить `break`?

Що робить `continue`?

Що таке nested loop?

Що таке infinite loop?

Що таке off-by-one error?

Що таке iterable?

Що таке iterator?

Які об'єкти можна перебирати через `for...of`?

Як перебрати масив?

Як перебрати object?

Як отримати keys об'єкта?

Як отримати values об'єкта?

Як отримати key + value об'єкта?

Коли краще використовувати `forEach()` замість `for`?

Коли краще використовувати `map()` замість циклу?

Коли краще використовувати `filter()`?

Коли краще використовувати `find()`?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке loop.

Що таке iteration.

`for`.

Initialization.

Condition.

Update.

Increment.

Decrement.

`while`.

`do...while`.

`break`.

`continue`.

Цикл по масиву.

Цикл по string.

Основи `for...of`.

Основи `for...in`.

Truthy / falsy conditions у циклах.

Infinite loops.

Off-by-one errors.

---

🔵 Junior

Розуміння різниці:

    for
    while
    do...while

Розуміння:

    for...of
    for...in

Nested loops.

Loop control.

Reverse loops.

Loops with custom step.

Looping through arrays.

Looping through objects.

`Object.keys()`.

`Object.values()`.

`Object.entries()`.

Основи iterable.

Основи iterator.

`break`.

`continue`.

Labels.

Вибір правильного типу циклу.

Розуміння, коли замінити цикл на array method.

---

🟠 Middle

Iterable protocol.

Iterator protocol.

`Symbol.iterator`.

Custom iterables.

Generators.

`yield`.

Async iterables.

`Symbol.asyncIterator`.

Complex iteration patterns.

Nested loop optimization.

Time complexity циклів.

Space complexity циклів.

Loop performance.

Early termination.

Avoiding unnecessary iterations.

Refactoring imperative loops.

Вибір між:

    for
    for...of
    while
    array methods
    iterators
    generators

---

🔴 Senior

Глибоке розуміння iteration protocols.

ECMAScript Iterator Protocol.

ECMAScript Iterable Protocol.

IteratorResult:

    {
        value,
        done
    }

Generators.

Generator delegation.

Async iteration.

Async generators.

Iterator Helpers.

Lazy evaluation.

Lazy sequences.

Custom iteration abstractions.

Algorithmic complexity.

Loop optimization.

Engine optimization.

JIT considerations.

Deoptimization.

Memory usage під час iteration.

Trade-offs між:

    imperative loops
    functional array methods
    iterators
    generators
    lazy evaluation

---

# Міні-шпаргалка

## for

    for (let i = 0; i < 10; i++) {
        // code
    }

Структура:

    initialization
        ↓
    condition
        ↓
    body
        ↓
    update
        ↓
    condition
        ↓
    ...

---

## while

    while (condition) {
        // code
    }

---

## do...while

    do {
        // code
    } while (condition);

Гарантовано:

    мінімум 1 iteration

---

## for...of

    for (const value of iterable) {
        // value
    }

    for...of → values

---

## for...in

    for (const key in object) {
        // key
    }

    for...in → keys

---

## break

    break;

    → повністю завершити loop

---

## continue

    continue;

    → пропустити поточну iteration

---

## Array

    const numbers = [10, 20, 30];

    for (const number of numbers) {
        console.log(number);
    }

---

## Object

    const user = {
        name: "John",
        age: 25
    };

    for (const [key, value] of Object.entries(user)) {
        console.log(key, value);
    }

---

## Counter

    i++

означає:

    i = i + 1

    i--

означає:

    i = i - 1

---

## Loop flow

    START
      ↓
    condition
      ↓
    true
      ↓
    body
      ↓
    update
      ↓
    condition
      ↓
    false
      ↓
    END

---

## Основні правила

    for       → counter / known iteration
    while     → condition
    do...while → execute at least once
    for...of  → values
    for...in  → keys
    break     → stop loop
    continue  → skip iteration

---

# Головне:

• Loop дозволяє багаторазово виконувати код.

• Iteration — одне виконання тіла циклу.

• `for` зручний для циклів із counter.

• `while` зручний, коли повторення залежить від condition.

• `do...while` виконує тіло хоча б один раз.

• `for...of` перебирає values iterable.

• `for...in` перебирає property keys.

• Для масивів зазвичай краще використовувати:

    for
    for...of
    array methods

• Для objects можна використовувати:

    Object.keys()
    Object.values()
    Object.entries()

• `break` повністю завершує цикл.

• `continue` пропускає поточну iteration.

• Необхідно стежити за умовою завершення циклу.

• Якщо значення, яке впливає на condition, не змінюється, може виникнути infinite loop.

• `i < array.length` — типовий шаблон для проходження масиву через index.

• `i <= array.length` часто створює off-by-one error.

• `for...of` дає значення:

    for (const value of values) {
        ...
    }

• `for...in` дає keys:

    for (const key in object) {
        ...
    }

• Array methods часто дозволяють зробити код декларативнішим:

    map()    → transform
    filter() → select
    find()   → find one
    some()   → at least one
    every()  → all
    reduce() → accumulate

• Основна модель циклу:

    initialization
          ↓
      condition
          ↓
        body
          ↓
        update
          ↓
      condition
          ↓
       repeat

• Правильний вибір циклу залежить від задачі, читабельності та способу роботи з даними.