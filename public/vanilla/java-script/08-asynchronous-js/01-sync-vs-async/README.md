# 01. Sync vs Async

Synchronous та asynchronous JavaScript — це два способи організації виконання операцій.

JavaScript виконує код послідовно, але деякі операції можуть бути передані середовищу виконання браузера або Node.js, щоб JavaScript не блокував подальше виконання коду.

Асинхронність особливо важлива для:

    timers
    HTTP requests
    Fetch API
    file system
    databases
    user events
    network operations
    Web APIs

Основна ідея:

    synchronous
        ↓
    виконати зараз
        ↓
    завершити
        ↓
    перейти далі

    asynchronous
        ↓
    запустити операцію
        ↓
    не чекати її завершення
        ↓
    продовжити виконання
        ↓
    отримати результат пізніше

---

### Ключові поняття

✔ synchronous  
✔ asynchronous  
✔ blocking  
✔ non-blocking  
✔ execution order  
✔ sequential execution  
✔ concurrency  
✔ task  
✔ operation  
✔ callback  
✔ Web API  
✔ runtime  
✔ call stack  
✔ event loop  
✔ task queue  
✔ microtask queue  
✔ Promise  
✔ timer  
✔ network request  
✔ I/O  
✔ waiting  
✔ completion  
✔ response  

---

### Що потрібно пам'ятати

• JavaScript-код зазвичай виконується послідовно.

• Synchronous operation блокує подальше виконання JavaScript-коду до свого завершення.

• Asynchronous operation дозволяє продовжити виконання іншого JavaScript-коду, поки операція завершується.

• Асинхронність не означає, що JavaScript виконує два шматки JavaScript-коду одночасно в одному потоці.

• JavaScript у браузері зазвичай працює в single-threaded execution model.

• Асинхронна поведінка забезпечується взаємодією JavaScript engine та runtime APIs.

• Browser або Node.js може виконувати певні операції поза основним JavaScript call stack.

• Після завершення асинхронної операції її callback / continuation буде поставлено в відповідну чергу.

• Event loop координує call stack та черги задач.

• `setTimeout()` не означає "виконати код рівно через N мілісекунд".

• `setTimeout()` задає мінімальну затримку перед тим, як callback може бути поставлений у чергу.

• `Promise` callbacks виконуються через microtask queue.

• Asynchronous programming особливо важливе для network, timers, I/O та інших операцій, які можуть тривати невизначений час.

---

# Synchronous Execution

Synchronous — послідовне виконання операцій.

Кожна наступна операція починається після завершення попередньої.

Наприклад:

    console.log("A");
    console.log("B");
    console.log("C");

Результат:

    A
    B
    C

Порядок виконання:

    A
    ↓
    B
    ↓
    C

---

# Sequential Execution

JavaScript виконує звичайний синхронний код послідовно.

Наприклад:

    const a = 10;
    const b = 20;
    const sum = a + b;

    console.log(sum);

Логіка:

    create a
        ↓
    create b
        ↓
    calculate sum
        ↓
    console.log

---

# Blocking

Blocking означає, що виконання подальшого коду не може продовжитися, поки поточна операція не завершиться.

Уявімо умовну операцію:

    doSomethingSlow();

    console.log("Done");

Якщо `doSomethingSlow()` виконується синхронно, наступний код чекатиме:

    doSomethingSlow()
        ↓
    завершення
        ↓
    console.log("Done")

---

# Non-blocking

Non-blocking operation дозволяє JavaScript продовжувати виконання, не очікуючи завершення операції безпосередньо в поточному call stack.

Наприклад:

    setTimeout(() => {
        console.log("Timer finished");
    }, 1000);

    console.log("Continue");

Результат:

    Continue
    Timer finished

Хоча timer був запущений першим, `console.log("Continue")` виконується раніше.

---

# Asynchronous JavaScript

Asynchronous JavaScript дозволяє почати операцію зараз, а обробити її результат пізніше.

Типовий сценарій:

    start operation
        ↓
    continue JavaScript execution
        ↓
    operation finishes
        ↓
    callback / Promise continuation
        ↓
    process result

Наприклад:

    console.log("Start");

    setTimeout(() => {
        console.log("Async operation");
    }, 1000);

    console.log("End");

Результат:

    Start
    End
    Async operation

---

# Чому Async потрібен

Уявімо HTTP request.

    request()
        ↓
    сервер обробляє запит
        ↓
    сервер повертає response

Це може зайняти:

    10 ms
    100 ms
    1 second
    5 seconds
    ...

Якби JavaScript синхронно блокував весь execution thread на час network request, інтерфейс браузера міг би перестати реагувати.

Асинхронна модель дозволяє:

    send request
        ↓
    continue other work
        ↓
    response arrives
        ↓
    process response

---

# Real-world Example

Уявімо ресторан.

### Synchronous model

Кухар:

    прийняв замовлення
        ↓
    готує страву
        ↓
    чекає
        ↓
    віддав страву
        ↓
    приймає наступне замовлення

Поки перше замовлення не завершено, інші не обробляються.

---

### Asynchronous model

Офіціант:

    прийняв замовлення
        ↓
    передав на кухню
        ↓
    може займатися іншими замовленнями
        ↓
    кухня завершила
        ↓
    страва готова
        ↓
    замовлення обробляється далі

Це спрощена аналогія asynchronous programming.

---

# Synchronous vs Asynchronous

| Synchronous | Asynchronous |
|---|---|
| виконується послідовно | результат може прийти пізніше |
| поточна операція блокує подальший код | можна продовжити інший код |
| простіший execution flow | складніший execution flow |
| результат доступний одразу після операції | результат обробляється пізніше |
| добре для швидких операцій | важливо для довгих операцій |
| CPU calculations | network / timers / I/O |

---

# Simple Comparison

### Synchronous

    console.log("Start");

    const result = calculate();

    console.log(result);

    console.log("End");

Логіка:

    Start
      ↓
    calculate
      ↓
    result
      ↓
    End

---

### Asynchronous

    console.log("Start");

    getDataAsync((result) => {
        console.log(result);
    });

    console.log("End");

Логіка:

    Start
      ↓
    start async operation
      ↓
    End
      ↓
    operation finishes
      ↓
    callback
      ↓
    result

---

# setTimeout

`setTimeout()` — один із найпростіших способів побачити asynchronous behavior.

    console.log("A");

    setTimeout(() => {
        console.log("B");
    }, 0);

    console.log("C");

Результат:

    A
    C
    B

Навіть при:

    0

callback не виконується миттєво в поточному synchronous execution.

---

# Чому setTimeout(..., 0) не виконується одразу

Наприклад:

    console.log("A");

    setTimeout(() => {
        console.log("B");
    }, 0);

    console.log("C");

Спрощено:

    console.log("A")
        ↓
    setTimeout()
        ↓
    console.log("C")
        ↓
    current synchronous code завершився
        ↓
    event loop
        ↓
    callback
        ↓
    console.log("B")

Результат:

    A
    C
    B

---

# Call Stack

Call stack — структура, яка відстежує поточне виконання JavaScript-функцій.

Наприклад:

    function first() {
        second();
    }

    function second() {
        console.log("Hello");
    }

    first();

Спрощено:

    first()
        ↓
    second()
        ↓
    console.log()
        ↓
    second завершено
        ↓
    first завершено

---

# Stack Frame

Кожен виклик функції створює execution context, який можна концептуально уявляти як frame у call stack.

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

Stack під час виконання:

    third()
    second()
    first()
    global

Верхній елемент виконується першим.

---

# Call Stack та Sync Code

Наприклад:

    function one() {
        console.log("One");
    }

    function two() {
        console.log("Two");
    }

    one();
    two();

Виконання:

    one()
        ↓
    console.log("One")
        ↓
    one завершено
        ↓
    two()
        ↓
    console.log("Two")
        ↓
    two завершено

---

# Runtime

JavaScript engine сама по собі не пояснює всю асинхронну поведінку браузера або Node.js.

Є:

    JavaScript engine
          +
    runtime environment

Приклади runtime:

    Browser
    Node.js

Runtime надає додаткові API та механізми для роботи з:

    timers
    network
    files
    events
    I/O

---

# Browser Runtime

У браузері JavaScript має доступ до Web APIs.

Наприклад:

    setTimeout()
    fetch()
    DOM events
    localStorage
    WebSocket

Спрощена модель:

    JavaScript
        ↓
    Browser APIs
        ↓
    queues
        ↓
    Event Loop
        ↓
    JavaScript

---

# Node.js Runtime

Node.js також надає JavaScript API для asynchronous operations.

Наприклад:

    file system
    network
    timers
    streams
    sockets

Наприклад:

    fs.readFile()

може працювати асинхронно, не блокуючи основний JavaScript execution flow.

---

# Web APIs

Web APIs — API, які надає браузерне середовище, а не сам JavaScript language syntax.

Приклади:

    setTimeout()
    fetch()
    addEventListener()
    DOM APIs

Важливо розрізняти:

    JavaScript language
        +
    Browser Web APIs

Наприклад, `Promise` є частиною JavaScript language/platform standard, тоді як `fetch()` — Web API.

---

# Timer Example

    console.log("Start");

    setTimeout(() => {
        console.log("Timer");
    }, 1000);

    console.log("End");

Результат:

    Start
    End
    Timer

Timer запускається, але callback виконається пізніше.

---

# Asynchronous Does Not Mean Parallel

Це дуже важливе правило.

❌ Неправильно:

    asynchronous = parallel

Правильніше:

    asynchronous
        =
    не блокувати поточний execution flow
    та обробити результат пізніше

JavaScript може координувати asynchronous operations, навіть якщо JavaScript execution сам відбувається в одному основному потоці.

---

# Single-threaded JavaScript

JavaScript традиційно описується як single-threaded language/runtime execution model.

Це означає, що один JavaScript execution thread має один основний call stack.

Наприклад:

    console.log("A");
    console.log("B");
    console.log("C");

Не відбувається:

    A + B + C одночасно

Виконується:

    A
    ↓
    B
    ↓
    C

---

# Concurrency

Concurrency — можливість працювати з кількома задачами, які можуть прогресувати в одному часовому проміжку.

Наприклад:

    request A
    request B
    timer

можуть бути запущені без необхідності чекати повного завершення кожної операції перед запуском наступної.

Це не обов'язково означає фізичне одночасне виконання JavaScript-коду.

---

# Concurrency vs Parallelism

### Concurrency

Кілька задач перебувають у процесі виконання / очікування та координуються разом.

    Task A
       ↘
    Task B
       ↘
    Task C

---

### Parallelism

Кілька задач реально виконуються одночасно на різних execution resources.

    Thread 1 → Task A
    Thread 2 → Task B

Спрощено:

    concurrency → dealing with multiple tasks
    parallelism → executing multiple tasks at the same time

---

# Event Loop

Event loop — механізм, який координує:

    call stack
    queues
    asynchronous callbacks

Спрощено:

    Call Stack
        ↓
    виконання JavaScript
        ↓
    Stack empty
        ↓
    Event Loop
        ↓
    Queue
        ↓
    Callback → Call Stack

Event loop буде детально розглядатися в:

    08-asynchronous-js/
    11-event-loop

---

# Task Queue

Callbacks деяких asynchronous operations потрапляють у task queue.

Наприклад, timer callback:

    setTimeout(() => {
        console.log("Timer");
    }, 0);

Після завершення відповідної операції callback очікує, доки event loop зможе передати його на виконання.

---

# Microtask Queue

Promise callbacks обробляються через microtask queue.

Наприклад:

    Promise.resolve().then(() => {
        console.log("Promise");
    });

Microtasks мають особливий порядок виконання відносно звичайних tasks.

Детально це буде розглядатися у:

    08-asynchronous-js/
    11-event-loop

---

# Basic Execution Order

Розглянемо:

    console.log("A");

    setTimeout(() => {
        console.log("B");
    }, 0);

    Promise.resolve().then(() => {
        console.log("C");
    });

    console.log("D");

Результат:

    A
    D
    C
    B

Спрощена модель:

    synchronous code
        ↓
    microtasks
        ↓
    tasks

Точний порядок та event loop mechanics буде розглядатися окремо.

---

# Callback

Callback — функція, яка передається іншій функції для виклику пізніше.

Наприклад:

    setTimeout(() => {
        console.log("Done");
    }, 1000);

Функція:

    () => {
        console.log("Done");
    }

є callback.

Callback буде виконаний після завершення відповідної asynchronous operation та коли runtime дозволить його виконати.

---

# Callback Example

    function greet(name, callback) {
        callback(`Hello, ${name}`);
    }

    greet("John", (message) => {
        console.log(message);
    });

Тут:

    greet()
        ↓
    callback переданий як argument
        ↓
    callback()
        ↓
    console.log()

Callbacks можуть бути синхронними або асинхронними.

Це важливо.

Сам факт передачі функції як callback **не означає**, що вона asynchronous.

---

# Synchronous Callback

Наприклад:

    const numbers = [1, 2, 3];

    numbers.forEach((number) => {
        console.log(number);
    });

Callback `forEach()` виконується синхронно.

Результат:

    1
    2
    3

Тобто:

    callback ≠ automatically asynchronous

---

# Asynchronous Callback

Наприклад:

    setTimeout(() => {
        console.log("Later");
    }, 1000);

Callback буде виконаний пізніше.

Тут:

    callback = asynchronous

---

# Promise

Promise — об'єкт, який представляє майбутній результат asynchronous operation.

Promise може перебувати у станах:

    pending
    fulfilled
    rejected

Схематично:

    pending
       ↓
    fulfilled

або:

    pending
       ↓
    rejected

Promise буде детально розглядатися у:

    08-asynchronous-js/
    03-promises

---

# async / await

`async` та `await` дозволяють писати asynchronous code у стилі, близькому до synchronous code.

Наприклад:

    async function getData() {
        const response = await fetch("/api/data");
        const data = await response.json();

        console.log(data);
    }

Важливо:

    await
        ≠
    блокування всього JavaScript thread

`await` призупиняє виконання конкретної async function до завершення Promise, дозволяючи runtime виконувати іншу роботу.

Детально:

    08-asynchronous-js/
    05-async-await

---

# Fetch

`fetch()` використовується для HTTP requests.

Наприклад:

    fetch("/api/users")
        .then((response) => response.json())
        .then((users) => {
            console.log(users);
        });

Або:

    async function loadUsers() {
        const response = await fetch("/api/users");
        const users = await response.json();

        console.log(users);
    }

Детально:

    08-asynchronous-js/
    06-fetch

---

# HTTP Request

HTTP request — типовий приклад asynchronous operation.

Наприклад:

    Browser
        ↓
    HTTP request
        ↓
    Server
        ↓
    Database
        ↓
    Server response
        ↓
    Browser

Між request та response може пройти певний час.

Тому frontend не повинен припиняти всю роботу, очікуючи response.

---

# I/O

I/O означає Input / Output.

Приклади:

    network I/O
    file I/O
    database I/O

I/O operations часто є asynchronous, оскільки зовнішній ресурс може відповідати не миттєво.

Наприклад:

    application
        ↓
    database query
        ↓
    waiting
        ↓
    database response
        ↓
    process result

---

# CPU-bound vs I/O-bound

Це важлива відмінність.

### CPU-bound

Основний час витрачається на обчислення CPU.

Наприклад:

    дуже великий цикл
    складні математичні обчислення
    обробка великого dataset

Асинхронність сама по собі не робить таке обчислення швидшим.

---

### I/O-bound

Основний час витрачається на очікування зовнішньої операції.

Наприклад:

    HTTP request
    database query
    file operation

Саме тут asynchronous programming особливо корисне.

---

# Blocking vs Non-blocking

### Blocking

    operation starts
        ↓
    execution waits
        ↓
    operation finishes
        ↓
    continue

---

### Non-blocking

    operation starts
        ↓
    continue other work
        ↓
    operation finishes
        ↓
    process result

---

# Why Blocking Is a Problem in Browser

Браузер повинен залишатися responsive.

Якщо main thread зайнятий довгою synchronous operation:

    JavaScript
        ↓
    long calculation
        ↓
    main thread busy
        ↓
    UI cannot respond normally

Користувач може побачити:

    frozen UI
    delayed clicks
    delayed rendering
    poor responsiveness

---

# Example of Blocking Code

Умовний приклад:

    console.log("Start");

    for (let i = 0; i < 10_000_000_000; i++) {
        // heavy calculation
    }

    console.log("End");

Поки цикл виконується, JavaScript thread зайнятий.

Це не є проблемою asynchronous programming.

Це CPU-bound synchronous work.

---

# Async Does Not Make CPU Work Automatically Non-blocking

Наприклад:

    async function calculate() {
        for (let i = 0; i < 10_000_000_000; i++) {
            // heavy calculation
        }
    }

Наявність:

    async

не означає, що весь цикл автоматично виконується в іншому thread.

`async` function все одно виконує synchronous code до першого suspension point.

Тому:

    async
        ≠
    background thread

---

# First Important Rule

Запам'ятати:

    async function
        ↓
    не означає
        ↓
    весь код всередині виконується asynchronous

Наприклад:

    async function test() {
        console.log("A");

        console.log("B");

        console.log("C");
    }

Цей код виконується синхронно всередині function до завершення.

---

# async Function Without await

    async function test() {
        console.log("Hello");
    }

    test();

`test()` повертає Promise, але код всередині function не стає автоматично delayed.

Важливо розрізняти:

    async function
        ↓
    Promise as return value

та:

    asynchronous operation
        ↓
    actual waiting / continuation

---

# await as Suspension Point

Наприклад:

    async function getData() {
        console.log("Start");

        const response = await fetch("/api/data");

        console.log("End");
    }

Спрощено:

    Start
      ↓
    fetch()
      ↓
    await
      ↓
    function pauses
      ↓
    other work can execute
      ↓
    Promise fulfilled
      ↓
    function continues
      ↓
    End

---

# Asynchronous Flow

Типовий asynchronous flow:

    START
      ↓
    initiate operation
      ↓
    continue execution
      ↓
    operation completes
      ↓
    result becomes available
      ↓
    callback / Promise continuation
      ↓
    process result
      ↓
    END

---

# Synchronous Flow

    START
      ↓
    operation
      ↓
    wait until complete
      ↓
    result
      ↓
    next operation
      ↓
    END

---

# Comparison

### Sync

    task A
      ↓
    wait
      ↓
    task B
      ↓
    wait
      ↓
    task C

---

### Async

    start task A
      ↓
    start task B
      ↓
    start task C
      ↓
    results arrive
      ↓
    process results

Це спрощена модель. Реальний порядок залежить від конкретних asynchronous APIs та event loop.

---

# Multiple Async Operations

Наприклад:

    setTimeout(() => {
        console.log("A");
    }, 1000);

    setTimeout(() => {
        console.log("B");
    }, 500);

Результат:

    B
    A

Тому що друга операція має меншу затримку.

---

# Start Time vs Completion Time

Асинхронні операції можуть завершуватися в іншому порядку, ніж були запущені.

Наприклад:

    requestA → 1000 ms
    requestB → 300 ms
    requestC → 500 ms

Можливий порядок:

    B
    C
    A

Тому не можна автоматично припускати:

    start order = completion order

---

# Race

Коли кілька asynchronous operations завершуються незалежно одна від одної, порядок їх завершення може бути непередбачуваним.

Наприклад:

    requestA
    requestB

Не можна автоматично припустити:

    A finishes first

Потрібно явно керувати залежностями, якщо порядок важливий.

---

# Sequential Async Operations

Іноді operations залежать одна від одної.

Наприклад:

    getUser()
        ↓
    getUserPosts()
        ↓
    getPostComments()

Логіка:

    User
      ↓
    Posts
      ↓
    Comments

У такому випадку operations мають виконуватися послідовно.

---

# Independent Async Operations

Якщо operations не залежать одна від одної:

    getUsers()
    getProducts()
    getCategories()

їх часто можна запускати одночасно.

Пізніше для цього використовуються:

    Promise.all()
    Promise.allSettled()
    Promise.race()
    Promise.any()

Детально:

    08-asynchronous-js/
    09-promise-combinators

---

# Error Handling

Асинхронні операції можуть завершитися помилкою.

Наприклад:

    network error
    server error
    timeout
    invalid response
    rejected Promise

Тому asynchronous code повинен мати error handling.

Наприклад:

    try {
        const response = await fetch("/api/users");

        if (!response.ok) {
            throw new Error("Request failed");
        }

        const users = await response.json();
    } catch (error) {
        console.error(error);
    }

Детально:

    08-asynchronous-js/
    08-error-handling

---

# Abort

Деякі asynchronous operations можуть бути скасовані.

Наприклад:

    user starts search
        ↓
    request starts
        ↓
    user changes search query
        ↓
    previous request no longer needed
        ↓
    abort request

Для цього існує:

    AbortController

Детально:

    08-asynchronous-js/
    10-abort-controller

---

# Async Mental Model

Корисно мислити так:

    JavaScript
        ↓
    starts operation
        ↓
    operation may be handled by runtime
        ↓
    JavaScript continues
        ↓
    operation completes
        ↓
    callback / Promise continuation becomes ready
        ↓
    event loop schedules execution
        ↓
    JavaScript processes result

---

# Common Async APIs

У браузері:

    setTimeout()
    setInterval()
    fetch()
    addEventListener()
    WebSocket

У Node.js:

    fs
    HTTP
    timers
    streams
    sockets

Механізм та деталі відрізняються, але загальна ідея:

    start operation
        ↓
    wait outside current synchronous flow
        ↓
    continue later

---

# Practical Example

### Synchronous calculations

    const a = 10;
    const b = 20;

    const result = a + b;

    console.log(result);

Результат доступний одразу.

---

### Asynchronous timer

    console.log("Start");

    setTimeout(() => {
        console.log("Finished");
    }, 2000);

    console.log("Continue");

Результат:

    Start
    Continue
    Finished

---

### Asynchronous HTTP request

    console.log("Start");

    fetch("/api/users")
        .then((response) => response.json())
        .then((users) => {
            console.log(users);
        });

    console.log("Continue");

Типова модель:

    Start
    Continue
    users

Точний момент залежить від response та runtime scheduling.

---

# Practical Example — Order

    console.log(1);

    setTimeout(() => {
        console.log(2);
    }, 0);

    console.log(3);

Результат:

    1
    3
    2

Головний урок:

    synchronous code
        ↓
    виконується до завершення
        ↓
    asynchronous callback
        ↓
    виконується пізніше

---

# Practical Example — Promise

    console.log("A");

    Promise.resolve().then(() => {
        console.log("B");
    });

    console.log("C");

Результат:

    A
    C
    B

Тому що Promise continuation не виконується в поточному synchronous execution.

---

# Practical Example — async / await

    async function test() {
        console.log("A");

        await Promise.resolve();

        console.log("B");
    }

    console.log("C");

    test();

    console.log("D");

Результат:

    C
    A
    D
    B

До `await` код виконується синхронно.

Після `await` продовження виконується пізніше.

---

# Important Distinction

Не плутати:

    synchronous
    asynchronous
    blocking
    non-blocking
    concurrency
    parallelism

Вони описують різні аспекти.

Спрощено:

    synchronous
        → порядок виконання

    asynchronous
        → результат / continuation пізніше

    blocking
        → поточна операція утримує execution flow

    non-blocking
        → execution може продовжуватися

    concurrency
        → робота з кількома задачами

    parallelism
        → реальне одночасне виконання

---

# Typical Async Problems

До появи Promise сучасний JavaScript часто використовував nested callbacks.

Наприклад:

    getUser(userId, (user) => {
        getPosts(user.id, (posts) => {
            getComments(posts[0].id, (comments) => {
                console.log(comments);
            });
        });
    });

При великій кількості залежностей код може стати складним.

Це називають:

    callback hell

Пізніше проблему частково вирішують:

    Promises
    async / await

---

# Callback Hell

Умовна структура:

    operationA(() => {
        operationB(() => {
            operationC(() => {
                operationD(() => {
                    ...
                });
            });
        });
    });

Проблеми:

    deep nesting
    difficult error handling
    difficult readability
    difficult maintenance

---

# Evolution of Async JavaScript

Корисно бачити розвиток:

    synchronous code
        ↓
    callbacks
        ↓
    Promises
        ↓
    async / await

Це не означає, що callbacks зникли.

Callbacks досі широко використовуються:

    event handlers
    array methods
    Node.js APIs
    libraries

---

# Async JavaScript Roadmap

У цьому курсі:

    01-sync-vs-async
        ↓
    02-callbacks
        ↓
    03-promises
        ↓
    04-promise-chaining
        ↓
    05-async-await
        ↓
    06-fetch
        ↓
    07-http-basics
        ↓
    08-error-handling
        ↓
    09-promise-combinators
        ↓
    10-abort-controller
        ↓
    11-event-loop
        ↓
    12-api-crud-project

Логіка курсу:

    понять проблему
        ↓
    callbacks
        ↓
    Promises
        ↓
    async / await
        ↓
    HTTP / Fetch
        ↓
    error handling
        ↓
    advanced Promise patterns
        ↓
    event loop
        ↓
    full async CRUD project

---

# Typical Full Stack Example

У full-stack application asynchronous programming зустрічається постійно.

Наприклад:

    React / Next.js
        ↓
    fetch()
        ↓
    HTTP request
        ↓
    Nest.js / Node.js
        ↓
    PostgreSQL
        ↓
    database response
        ↓
    backend response
        ↓
    frontend
        ↓
    UI update

Практично кожен етап може містити asynchronous operations.

---

# Full Stack Async Flow

Наприклад, користувач натиснув:

    "Add"

Frontend:

    click
      ↓
    fetch()
      ↓
    HTTP request
      ↓
    backend

Backend:

    receive request
      ↓
    database query
      ↓
    PostgreSQL
      ↓
    result
      ↓
    HTTP response

Frontend:

    response
      ↓
    parse JSON
      ↓
    update state
      ↓
    render UI

Це одна з основних причин, чому asynchronous JavaScript необхідно добре розуміти для full-stack development.

---

# Що відбувається після fetch

Спрощено:

    fetch()
       ↓
    Promise
       ↓
    HTTP request
       ↓
    server
       ↓
    response
       ↓
    Promise fulfilled
       ↓
    continuation
       ↓
    response.json()
       ↓
    Promise
       ↓
    parsed data

Це буде детально розглядатися в наступних темах.

---

# Common Misconceptions

❌ `setTimeout(fn, 1000)` означає "виконати fn рівно через 1 секунду".

Правильніше:

    fn не буде виконаний раніше заданої затримки,
    але фактичне виконання залежить від event loop
    та поточного стану execution.

---

❌ `async` означає, що функція запускається в іншому thread.

Ні.

    async
        →
    function returns Promise
    та підтримує await semantics

---

❌ `await` блокує весь JavaScript.

Ні.

`await` призупиняє продовження конкретної async function.

---

❌ Promise означає, що операція обов'язково виконується в background thread.

Ні.

Promise — це abstraction для eventual result / completion, а не thread.

---

❌ Callback завжди asynchronous.

Ні.

Наприклад:

    [1, 2, 3].forEach(callback);

callback виконується синхронно.

---

❌ Asynchronous означає parallel.

Ні.

    asynchronous ≠ parallel

---

❌ JavaScript завжди чекає HTTP request.

Ні.

Виклик `fetch()` повертає Promise, а JavaScript може продовжити виконання іншого коду.

---

# Типові помилки

❌ Не розуміти порядок виконання:

    console.log("A");

    setTimeout(() => {
        console.log("B");
    }, 0);

    console.log("C");

Очікувати:

    A
    B
    C

Правильно:

    A
    C
    B

---

❌ Вважати `async` магічним background execution.

    async function calculate() {
        // heavy synchronous calculation
    }

`async` не робить CPU-heavy code автоматично неблокуючим.

---

❌ Вважати callback asynchronous.

Наприклад:

    numbers.forEach(number => {
        console.log(number);
    });

Це synchronous iteration.

---

❌ Плутати concurrency та parallelism.

    concurrency ≠ parallelism

---

❌ Не враховувати, що asynchronous operations можуть завершуватися в іншому порядку.

Наприклад:

    requestA → 1000 ms
    requestB → 300 ms

Можливий результат:

    B
    A

---

❌ Використовувати synchronous blocking operation для великої роботи в browser main thread.

Це може призвести до:

    UI freezing
    delayed events
    poor responsiveness

---

❌ Не обробляти asynchronous errors.

Наприклад:

    fetch("/api/users");

Необхідно продумати:

    network errors
    rejected Promise
    HTTP errors
    invalid data

---

# Питання зі співбесіди

Що таке synchronous code?

Що таке asynchronous code?

Чим synchronous відрізняється від asynchronous?

Що таке blocking operation?

Що таке non-blocking operation?

Чому asynchronous programming потрібне в JavaScript?

Чому JavaScript називають single-threaded?

Чи означає asynchronous виконання parallel execution?

Що таке concurrency?

Чим concurrency відрізняється від parallelism?

Що таке call stack?

Що таке event loop?

Що таке task queue?

Що таке microtask queue?

Що таке callback?

Чи кожен callback є asynchronous?

Що робить `setTimeout()`?

Чому `setTimeout(fn, 0)` не виконується одразу?

Що таке Promise?

Які стани має Promise?

Що робить `async`?

Що робить `await`?

Чи блокує `await` весь JavaScript thread?

Чи означає `async`, що код виконується в іншому thread?

Що таке Web API?

Які asynchronous Web APIs ти знаєш?

Чому `fetch()` є asynchronous?

Що таке I/O?

Що таке CPU-bound operation?

Що таке I/O-bound operation?

Чому synchronous heavy calculation може заблокувати UI?

Що таке callback hell?

Як Promises вирішують частину проблем callbacks?

Як `async/await` покращує читабельність asynchronous code?

Чому asynchronous operations можуть завершуватися не в тому порядку, в якому були запущені?

Як працює asynchronous flow у full-stack application?

---

# Шлях

## 🟢 Core (обов'язково знати)

Що таке synchronous execution.

Що таке asynchronous execution.

Різниця:

    synchronous
    asynchronous

Різниця:

    blocking
    non-blocking

Розуміння послідовного виконання JavaScript.

Розуміння, що JavaScript має один основний call stack.

Базове розуміння runtime.

Базове розуміння Browser APIs / Node.js APIs.

`setTimeout()`.

Розуміння:

    callback
    Promise
    async
    await

Розуміння, що:

    async ≠ parallel
    async ≠ another thread

Базове розуміння event loop.

Базове розуміння asynchronous HTTP request.

Розуміння, що asynchronous operation може завершитися пізніше.

---

## 🔵 Junior

Розуміння:

    call stack
    Web APIs
    task queue
    microtask queue
    event loop

Розуміння різниці:

    callback
    Promise
    async/await

Розуміння:

    synchronous callback
    asynchronous callback

Розуміння:

    CPU-bound
    I/O-bound

Розуміння concurrency.

Розуміння різниці:

    concurrency
    parallelism

Розуміння порядку:

    synchronous code
        ↓
    microtasks
        ↓
    tasks

Розуміння, чому:

    setTimeout(fn, 0)

не виконується негайно.

Розуміння asynchronous HTTP flow:

    frontend
        ↓
    HTTP
        ↓
    backend
        ↓
    database
        ↓
    response

Розуміння callback hell.

Уміння пояснити, навіщо потрібні:

    Promises
    async/await

---

## 🟠 Middle

Глибоке розуміння:

    event loop
    microtasks
    tasks
    Promise scheduling

Розуміння runtime differences:

    Browser
    Node.js

Розуміння різних asynchronous APIs.

Розуміння Promise lifecycle.

Розуміння concurrency patterns.

Керування:

    sequential async operations
    parallel async operations

Розуміння:

    Promise.all()
    Promise.allSettled()
    Promise.race()
    Promise.any()

Розуміння cancellation:

    AbortController

Правильне asynchronous error handling.

Розуміння race conditions.

Контроль порядку виконання asynchronous operations.

Оптимізація network requests.

Уміння визначати:

    blocking
    non-blocking
    CPU-bound
    I/O-bound

---

## 🔴 Senior

Глибоке розуміння ECMAScript execution model.

Глибоке розуміння:

    execution contexts
    call stack
    jobs
    PromiseJobs
    microtasks

Глибоке розуміння browser event loop.

Глибоке розуміння Node.js event loop.

Concurrency architecture.

Race conditions.

Cancellation strategies.

Backpressure.

Streams.

Async iterators.

Async generators.

Worker-based parallelism.

Web Workers.

Node.js Worker Threads.

Event-driven architecture.

Scheduling strategies.

Performance implications asynchronous code.

Distributed asynchronous systems.

Retries.

Timeouts.

Circuit breakers.

Idempotency.

Request deduplication.

Rate limiting.

Queue-based architectures.

---

# Міні-шпаргалка

## Synchronous

    operation A
        ↓
    wait
        ↓
    operation B
        ↓
    wait
        ↓
    operation C

    → послідовне виконання

---

## Asynchronous

    start operation A
        ↓
    continue execution
        ↓
    operation A completes
        ↓
    process result

    → результат обробляється пізніше

---

## Blocking

    operation
        ↓
    execution waits
        ↓
    complete
        ↓
    continue

---

## Non-blocking

    start operation
        ↓
    continue other work
        ↓
    operation completes
        ↓
    process result

---

## Callback

    function operation(callback) {
        ...
    }

    operation(() => {
        ...
    });

    callback
        →
    function passed to another function

---

## setTimeout

    setTimeout(() => {
        console.log("Later");
    }, 1000);

    → callback буде виконаний пізніше

---

## Promise

    pending
       ↓
    fulfilled

    або:

    pending
       ↓
    rejected

---

## async

    async function getData() {
        ...
    }

    → async function returns Promise

---

## await

    const result = await promise;

    → призупиняє продовження async function
    → не блокує весь JavaScript execution thread

---

## Event Loop

    Call Stack
        ↓
    JavaScript execution
        ↓
    Stack empty
        ↓
    Event Loop
        ↓
    Queue
        ↓
    Callback / continuation
        ↓
    Call Stack

---

## Basic Order

    synchronous code
        ↓
    microtasks
        ↓
    tasks

---

## Concurrency

    Task A
    Task B
    Task C

    → кілька задач координуються разом

---

## Parallelism

    Thread 1 → Task A
    Thread 2 → Task B

    → реальне одночасне виконання

---

## Important

    asynchronous ≠ parallel

    async ≠ another thread

    callback ≠ automatically asynchronous

    await ≠ block entire JavaScript

---

# Основні правила

    synchronous
        → виконується послідовно

    asynchronous
        → результат / continuation може бути пізніше

    blocking
        → поточний execution flow чекає

    non-blocking
        → execution може продовжуватися

    callback
        → функція, передана для виклику

    Promise
        → майбутній результат asynchronous operation

    async
        → function повертає Promise

    await
        → очікування Promise всередині async function

    event loop
        → координує execution та queues

    concurrency
        → робота з кількома задачами

    parallelism
        → одночасне виконання

---

# Головне:

• JavaScript виконує звичайний код послідовно.

• Synchronous operation завершується перед переходом до наступної операції.

• Asynchronous operation дозволяє продовжити виконання та обробити результат пізніше.

• Blocking operation утримує поточний execution flow.

• Non-blocking operation дозволяє виконувати іншу роботу до завершення операції.

• JavaScript має один основний call stack.

• Асинхронність не означає автоматично parallel execution.

• `async` не означає виконання функції в іншому thread.

• `await` не блокує весь JavaScript thread.

• Callback може бути як synchronous, так і asynchronous.

• `setTimeout()` — простий приклад asynchronous API.

• `setTimeout(fn, 0)` не виконує `fn` негайно.

• Promise представляє майбутній результат операції.

• Promise має стани:

    pending
    fulfilled
    rejected

• `async function` повертає Promise.

• `await` дозволяє призупинити продовження конкретної async function до завершення Promise.

• Browser та Node.js runtime надають API для asynchronous operations.

• Типові asynchronous operations:

    timers
    network requests
    file I/O
    database operations
    events

• Асинхронність особливо важлива для I/O-bound operations.

• CPU-heavy synchronous code все одно може блокувати JavaScript execution.

• Асинхронні операції можуть завершуватися в іншому порядку, ніж були запущені.

• Якщо operations незалежні, їх часто можна виконувати конкурентно.

• Якщо одна operation залежить від іншої, потрібне послідовне керування.

• Event loop координує виконання asynchronous callbacks та continuations.

• Для Promise callbacks використовується microtask mechanism.

• Загальна модель:

    start operation
        ↓
    continue execution
        ↓
    operation completes
        ↓
    callback / Promise continuation
        ↓
    event loop
        ↓
    process result

• Для full-stack JavaScript asynchronous programming є фундаментальною частиною роботи:

    Browser
        ↓
    fetch()
        ↓
    HTTP
        ↓
    Node.js / Nest.js
        ↓
    PostgreSQL
        ↓
    response
        ↓
    frontend

• Саме тому перед вивченням `Promises`, `async/await`, `fetch` та `event loop` потрібно чітко розуміти головну ідею:

    JavaScript не повинен блокувати весь execution flow
    тільки тому, що результат зовнішньої операції
    буде доступний пізніше.

• Основна модель:

    synchronous
        → зробити зараз і дочекатися завершення

    asynchronous
        → запустити зараз і обробити результат пізніше