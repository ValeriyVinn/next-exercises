# 11. Event Loop

## 📌 Що це таке

**Event Loop** — механізм JavaScript, який дозволяє виконувати асинхронні операції, незважаючи на те, що JavaScript-код виконується в одному основному потоці.

Спрощено:

    JavaScript виконує синхронний код
            ↓
    Web APIs / Node.js APIs виконують асинхронну роботу
            ↓
    результат потрапляє в черги
            ↓
    Event Loop перевіряє, коли можна виконати callback
            ↓
    callback потрапляє у Call Stack
            ↓
    JavaScript його виконує

Event Loop — одна з ключових тем для розуміння:

- `setTimeout`
- `Promise`
- `async/await`
- `fetch`
- DOM events
- Node.js
- React
- Next.js
- NestJS
- асинхронного програмування загалом

---

# 🧠 Ключові поняття

- Call Stack
- Web APIs
- Node.js APIs
- Task Queue / Macrotask Queue
- Microtask Queue
- Event Loop
- `setTimeout`
- `setInterval`
- `Promise`
- `queueMicrotask`
- `async/await`
- `fetch`
- синхронний код
- асинхронний код
- blocking / non-blocking
- порядок виконання

---

# 1. JavaScript — single-threaded

JavaScript має один основний **Call Stack**.

Це означає, що в один момент часу JavaScript виконує одну операцію JavaScript-коду.

Наприклад:

    console.log("A");
    console.log("B");
    console.log("C");

Результат:

    A
    B
    C

Виконання відбувається зверху вниз.

---

# 2. Call Stack

**Call Stack** — стек викликів функцій.

Коли викликається функція, вона потрапляє в Stack.

Приклад:

    function one() {
        console.log("one");
    }

    function two() {
        one();
        console.log("two");
    }

    two();

Спрощено:

    Call Stack

    two()
      ↓
    one()
      ↓
    console.log()

Після завершення `one()` вона видаляється зі Stack.

Потім завершується `two()`.

---

# 3. Stack працює за принципом LIFO

LIFO:

    Last In → First Out

Остання додана функція виконується першою.

Наприклад:

    function a() {
        b();
    }

    function b() {
        c();
    }

    function c() {
        console.log("C");
    }

    a();

Послідовність:

    a()
      ↓
    b()
      ↓
    c()

`c()` завершується першою.

Потім:

    c()
    ↓
    b()
    ↓
    a()

---

# 4. Синхронний код

Синхронний код виконується без переходу до асинхронних черг.

    console.log("1");
    console.log("2");
    console.log("3");

Результат:

    1
    2
    3

Наступний рядок не виконується, поки попередній не завершився.

---

# 5. Blocking code

Якщо JavaScript довго виконує синхронну операцію, він блокує Call Stack.

Наприклад:

    console.log("Start");

    for (let i = 0; i < 1_000_000_000; i++) {
        // довга операція
    }

    console.log("End");

Поки цикл не завершиться:

- Event Loop не може виконати наступні callbacks
- UI може зависнути
- інші JavaScript-операції чекають

Тому важливо відрізняти:

    synchronous + long
    ↓
    blocking

від:

    asynchronous
    ↓
    non-blocking

---

# 6. Що таке Event Loop

**Event Loop** постійно перевіряє:

    Чи звільнився Call Stack?

Якщо Stack порожній, Event Loop може взяти готову асинхронну задачу з відповідної черги та поставити її в Call Stack.

Спрощена модель:

    ┌─────────────────┐
    │   Call Stack    │
    └────────┬────────┘
             ↑
        Event Loop
             ↑
    ┌────────┴────────┐
    │                 │
    │     Queues      │
    │                 │
    └─────────────────┘

Але на практиці існує кілька типів черг.

---

# 7. Web APIs

У браузері асинхронні операції виконує не сам Call Stack.

Наприклад:

    setTimeout()
    fetch()
    DOM events

передають роботу середовищу браузера — **Web APIs**.

Приклад:

    console.log("Start");

    setTimeout(() => {
        console.log("Timer");
    }, 1000);

    console.log("End");

Спрощено:

    console.log("Start")
          ↓
    Call Stack

    setTimeout(...)
          ↓
    Browser Web API
          ↓
    Timer чекає 1 секунду
          ↓
    Callback Queue

Після того як Call Stack звільниться:

    Event Loop
        ↓
    Callback → Call Stack
        ↓
    console.log("Timer")

---

# 8. setTimeout не означає "виконати через N мс"

Це дуже важливо.

    setTimeout(callback, 1000);

не означає:

    "виконай callback рівно через 1000 мс"

Це означає:

    "не раніше ніж через 1000 мс callback може стати готовим до виконання"

Якщо Call Stack зайнятий, callback чекатиме.

Приклад:

    console.log("Start");

    setTimeout(() => {
        console.log("Timer");
    }, 0);

    console.log("End");

Результат:

    Start
    End
    Timer

Навіть `0 ms` не означає "зараз".

---

# 9. setTimeout(..., 0)

Приклад:

    setTimeout(() => {
        console.log("Timeout");
    }, 0);

    console.log("Sync");

Результат:

    Sync
    Timeout

Причина:

    setTimeout
        ↓
    Web API
        ↓
    Task Queue
        ↓
    Event Loop
        ↓
    Call Stack

А синхронний `console.log("Sync")` виконується безпосередньо.

---

# 10. Task Queue

**Task Queue** часто називають:

- Macrotask Queue
- Callback Queue
- Task Queue

Туди можуть потрапляти callbacks таких операцій, як:

- `setTimeout`
- `setInterval`
- деякі DOM events
- інші task-и середовища

Приклад:

    setTimeout(() => {
        console.log("A");
    }, 0);

    setTimeout(() => {
        console.log("B");
    }, 0);

Результат:

    A
    B

---

# 11. Microtask Queue

Окремо існує **Microtask Queue**.

До microtasks належать, зокрема:

- `Promise.then()`
- `Promise.catch()`
- `Promise.finally()`
- `queueMicrotask()`
- продовження `async/await`

Приклад:

    console.log("A");

    Promise.resolve().then(() => {
        console.log("B");
    });

    console.log("C");

Результат:

    A
    C
    B

---

# 12. Microtasks мають вищий пріоритет

Ключове правило:

    Call Stack
        ↓
    Microtask Queue
        ↓
    Task Queue

Після завершення поточного синхронного коду JavaScript спочатку обробляє microtasks.

Тільки після цього переходить до наступних tasks.

---

# 13. Promise vs setTimeout

Один із найважливіших прикладів:

    console.log("1");

    setTimeout(() => {
        console.log("2");
    }, 0);

    Promise.resolve().then(() => {
        console.log("3");
    });

    console.log("4");

Результат:

    1
    4
    3
    2

Чому?

### Крок 1

Синхронний код:

    console.log("1");
    console.log("4");

Отримуємо:

    1
    4

### Крок 2

Promise callback потрапляє в Microtask Queue.

    console.log("3");

### Крок 3

`setTimeout` callback знаходиться в Task Queue.

    console.log("2");

Тому:

    1
    4
    3
    2

---

# 14. Загальний порядок

Для базового розуміння запам'ятай:

    1. Synchronous code
    2. Microtasks
    3. Tasks / macrotasks

Тобто:

    Call Stack
        ↓
    весь доступний synchronous code
        ↓
    Microtask Queue
        ↓
    наступний Task
        ↓
    Microtask Queue
        ↓
    наступний Task
        ↓
    ...

---

# 15. Microtasks виконуються до спорожнення черги

Це важливий момент.

    Promise.resolve().then(() => {
        console.log("A");

        Promise.resolve().then(() => {
            console.log("B");
        });
    });

    setTimeout(() => {
        console.log("C");
    }, 0);

Результат:

    A
    B
    C

Чому?

Після `A` створюється нова microtask:

    B

Event Loop продовжує виконувати microtasks, доки Microtask Queue не спорожніє.

Тільки після цього переходить до task:

    C

---

# 16. queueMicrotask()

JavaScript має спеціальний API:

    queueMicrotask(() => {
        console.log("Microtask");
    });

Приклад:

    console.log("A");

    queueMicrotask(() => {
        console.log("B");
    });

    console.log("C");

Результат:

    A
    C
    B

---

# 17. Promise.resolve() і Microtask Queue

    Promise.resolve().then(() => {
        console.log("Hello");
    });

Callback `.then()` буде виконаний як microtask.

Тому:

    console.log("A");

    Promise.resolve().then(() => {
        console.log("B");
    });

    console.log("C");

дає:

    A
    C
    B

---

# 18. async / await і Event Loop

`async/await` використовує Promise-механізм.

Наприклад:

    async function main() {
        console.log("A");

        await Promise.resolve();

        console.log("B");
    }

    console.log("C");

    main();

    console.log("D");

Результат:

    C
    A
    D
    B

Після `await` продовження функції відбувається асинхронно.

Спрощено:

    await
      ↓
    Promise
      ↓
    Microtask
      ↓
    продовження async function

---

# 19. await не блокує весь JavaScript

Це дуже важливо.

`await` призупиняє виконання **поточної async-функції**, але не весь JavaScript.

Приклад:

    async function main() {
        console.log("A");

        await Promise.resolve();

        console.log("B");
    }

    main();

    console.log("C");

Результат:

    A
    C
    B

Тобто після `await` JavaScript може виконувати інший код.

---

# 20. await і Promise

Наприклад:

    async function getData() {
        const response = await fetch("/api/users");

        console.log(response);
    }

Поки `fetch()` чекає:

- Call Stack не заблокований
- інший JavaScript може виконуватися
- браузер виконує мережеву операцію
- після завершення Promise продовження `async`-функції буде поставлено в microtask queue

Спрощено:

    fetch()
      ↓
    Browser API
      ↓
    network
      ↓
    Promise fulfilled
      ↓
    Microtask
      ↓
    async function continues

---

# 21. Event Loop + fetch

Приклад:

    console.log("Start");

    fetch("/api/users")
        .then(() => {
            console.log("Data");
        });

    console.log("End");

Результат:

    Start
    End
    Data

`fetch()` не блокує виконання наступного синхронного коду.

---

# 22. Event Loop + DOM events

Наприклад:

    button.addEventListener("click", () => {
        console.log("Clicked");
    });

Callback не виконується одразу.

Він буде виконаний, коли:

1. користувач натисне кнопку;
2. браузер створить event;
3. callback буде поставлений на виконання;
4. Call Stack буде доступний;
5. Event Loop дозволить виконати callback.

---

# 23. Складний приклад

Розглянемо:

    console.log("1");

    setTimeout(() => {
        console.log("2");
    }, 0);

    Promise.resolve().then(() => {
        console.log("3");
    });

    queueMicrotask(() => {
        console.log("4");
    });

    console.log("5");

Результат:

    1
    5
    3
    4
    2

Логіка:

    synchronous:
        1
        5

    microtasks:
        3
        4

    task:
        2

---

# 24. Ще складніший приклад

    console.log("A");

    setTimeout(() => {
        console.log("B");

        Promise.resolve().then(() => {
            console.log("C");
        });
    }, 0);

    Promise.resolve().then(() => {
        console.log("D");
    });

    console.log("E");

Результат:

    A
    E
    D
    B
    C

Чому:

### Синхронно

    A
    E

### Microtask

    D

### Task

    B

### Нова microtask

Під час виконання `B` створюється Promise callback:

    C

Він потрапляє в Microtask Queue і виконується перед наступним Task.

---

# 25. Event Loop не виконує код паралельно

Потрібно розрізняти:

    asynchronous
    ≠
    parallel

JavaScript може організовувати асинхронне виконання без виконання двох JavaScript-функцій одночасно в одному Call Stack.

Наприклад:

    fetch("/api/data");

не означає, що JavaScript одночасно виконує callback `fetch()` разом з іншим JavaScript-кодом.

---

# 26. Асинхронність ≠ багатопоточність

Спрощено:

    JavaScript
        ↓
    один основний Call Stack

але:

    Browser / Node.js
        ↓
    APIs / system resources
        ↓
    timers
    network
    filesystem
    etc.

У браузері та Node.js середовище може використовувати інші механізми та потоки для виконання зовнішньої роботи.

Для програміста це проявляється як:

    non-blocking asynchronous API

---

# 27. Event Loop у браузері

Спрощена модель браузера:

    JavaScript
       ↓
    Call Stack
       ↓
    Web APIs
       ↓
    ┌───────────────┐
    │ Microtasks    │
    │ Tasks         │
    └───────────────┘
       ↓
    Event Loop
       ↓
    Call Stack

Середовище браузера також відповідає за:

- DOM
- events
- timers
- network
- rendering

---

# 28. Event Loop у Node.js

У Node.js модель має свої особливості.

Node.js використовує:

- Event Loop
- libuv
- системні API
- thread pool для певних операцій

Асинхронно можуть виконуватися, наприклад:

- filesystem operations
- network operations
- DNS
- timers
- інші I/O operations

Для Full Stack JavaScript це особливо важливо, тому що:

    Browser
        ↓
    React / Next.js

    Node.js
        ↓
    Express / NestJS

використовують асинхронну модель.

---

# 29. Event Loop і Node.js backend

Наприклад:

    app.get("/users", async (req, res) => {
        const users = await db.query("SELECT * FROM users");

        res.json(users);
    });

Поки база даних виконує запит:

    Node.js
        ↓
    не блокує весь сервер
        ↓
    Event Loop може обробляти інші requests

Саме тому асинхронний I/O дуже важливий для backend.

---

# 30. Blocking vs non-blocking

### Blocking

    const data = expensiveSynchronousOperation();

    console.log(data);

Поки операція не завершиться, потік виконання заблокований.

### Non-blocking

    asyncOperation((data) => {
        console.log(data);
    });

Або:

    const data = await asyncOperation();

У випадку `await` поточна async-функція призупиняється, але Event Loop може продовжувати роботу.

---

# 31. Чому Promise callbacks виконуються раніше за setTimeout

Приклад:

    setTimeout(() => {
        console.log("timeout");
    }, 0);

    Promise.resolve().then(() => {
        console.log("promise");
    });

Результат:

    promise
    timeout

Тому що:

    Promise.then()
        ↓
    Microtask Queue

а:

    setTimeout()
        ↓
    Task Queue

Microtasks обробляються перед переходом до наступної task.

---

# 32. Помилка: "setTimeout має пріоритет"

Неправильно:

    setTimeout(..., 0);

не означає:

    "виконай наступним"

Правильніше:

    setTimeout(...)
        ↓
    callback стане доступним після timeout
        ↓
    callback чекає своєї черги
        ↓
    Event Loop виконає його, коли це дозволено

---

# 33. Помилка: "await блокує JavaScript"

Неправильно:

    await fetch("/api/users");

    // весь JavaScript заблокований

Правильніше:

    await
      ↓
    поточна async function призупиняється
      ↓
    Event Loop продовжує роботу
      ↓
    Promise завершується
      ↓
    async function продовжується

---

# 34. Помилка: "Promise виконується асинхронно"

Не зовсім правильно.

Створення Promise executor виконується синхронно.

    const promise = new Promise((resolve) => {
        console.log("Executor");
        resolve();
    });

    console.log("After");

Результат:

    Executor
    After

А callback `.then()` виконується асинхронно через microtask:

    promise.then(() => {
        console.log("Then");
    });

---

# 35. Promise executor vs .then()

Це важлива відмінність:

    const promise = new Promise((resolve) => {
        console.log("A");

        resolve();
    });

    promise.then(() => {
        console.log("B");
    });

    console.log("C");

Результат:

    A
    C
    B

Тому:

    new Promise(executor)
        ↓
    executor запускається синхронно

А:

    promise.then(callback)
        ↓
    callback → Microtask Queue

---

# 36. Infinite Microtask Queue

Оскільки microtasks мають високий пріоритет, можна створити проблему:

    function loop() {
        queueMicrotask(loop);
    }

    loop();

Microtask Queue постійно поповнюється.

Тоді інші tasks можуть дуже довго не отримувати можливості виконатися.

Це називають **starvation**.

Тому не можна безконтрольно створювати нескінченний ланцюг microtasks.

---

# 37. Long synchronous task

Ще одна проблема:

    while (true) {
        // ...
    }

Call Stack ніколи не звільняється.

Тоді:

- Event Loop не може нормально перейти до наступних callbacks
- UI зависає
- timers не виконуються
- events чекають

---

# 38. Event Loop і UI

У браузері довгі синхронні операції можуть блокувати інтерфейс.

Наприклад:

    button.addEventListener("click", () => {
        for (let i = 0; i < 1_000_000_000; i++) {
            // важка робота
        }
    });

Під час виконання:

- кнопки можуть перестати реагувати
- анімації можуть зависнути
- сторінка може виглядати "мертвою"

Тому важкі операції потрібно розбивати або переносити в інші механізми, наприклад Web Workers.

---

# 39. setInterval і Event Loop

`setInterval` не запускає callback паралельно.

Наприклад:

    setInterval(() => {
        console.log("tick");
    }, 1000);

Якщо Call Stack зайнятий, callback чекатиме.

Тобто інтервал не гарантує:

    точно кожну секунду

Він створює можливість виконання callback після відповідного таймера, коли Event Loop може його обробити.

---

# 40. Event Loop і порядок виконання

Для вирішення задач на порядок виконання використовуй алгоритм.

### Крок 1

Знайди весь синхронний код.

### Крок 2

Запиши всі `Promise.then/catch/finally`.

### Крок 3

Запиши `queueMicrotask`.

### Крок 4

Знайди `setTimeout/setInterval` та інші tasks.

### Крок 5

Виконай synchronous code.

### Крок 6

Виконай microtasks.

### Крок 7

Виконай наступний task.

### Крок 8

Після task знову перевір microtasks.

---

# 41. Практична задача №1

Передбач результат:

    console.log("A");

    setTimeout(() => {
        console.log("B");
    }, 0);

    Promise.resolve().then(() => {
        console.log("C");
    });

    console.log("D");

Відповідь:

    A
    D
    C
    B

---

# 42. Практична задача №2

    console.log("1");

    Promise.resolve().then(() => {
        console.log("2");

        Promise.resolve().then(() => {
            console.log("3");
        });
    });

    setTimeout(() => {
        console.log("4");
    }, 0);

    console.log("5");

Результат:

    1
    5
    2
    3
    4

---

# 43. Практична задача №3

    console.log("1");

    setTimeout(() => {
        console.log("2");
    }, 0);

    setTimeout(() => {
        console.log("3");
    }, 0);

    Promise.resolve().then(() => {
        console.log("4");
    });

    console.log("5");

Результат:

    1
    5
    4
    2
    3

---

# 44. Практична задача №4 — async/await

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

---

# 45. Практична задача №5 — змішаний приклад

    async function test() {
        console.log("A");

        await Promise.resolve();

        console.log("B");
    }

    console.log("C");

    setTimeout(() => {
        console.log("D");
    }, 0);

    test();

    Promise.resolve().then(() => {
        console.log("E");
    });

    console.log("F");

Результат:

    C
    A
    F
    B
    E
    D

Пояснення:

### Synchronous

    C
    A
    F

### Microtasks

Спочатку продовження `await`:

    B

Потім `.then()`:

    E

### Task

    D

---

# 46. Event Loop у реальному Full Stack

У реальному застосунку ти постійно зустрічатимеш:

    User
      ↓
    Browser
      ↓
    React
      ↓
    fetch()
      ↓
    HTTP request
      ↓
    Node.js / NestJS
      ↓
    PostgreSQL
      ↓
    Promise
      ↓
    Event Loop
      ↓
    response
      ↓
    React UI

Тому Event Loop — не абстрактна теорія.

Він пояснює поведінку твого реального Full Stack JavaScript-коду.

---

# 47. Event Loop + React

Наприклад:

    async function loadUsers() {
        const response = await fetch("/api/users");

        const users = await response.json();

        setUsers(users);
    }

Тут присутні:

    fetch
      ↓
    Promise
      ↓
    await
      ↓
    Event Loop
      ↓
    продовження async function
      ↓
    React state update
      ↓
    render

Тому розуміння Event Loop допомагає краще зрозуміти асинхронність React.

---

# 48. Event Loop + Next.js

У Next.js асинхронний код може виконуватися як на клієнті, так і на сервері.

Наприклад:

    const response = await fetch("/api/users");

Важливо розуміти:

    async/await
        ↓
    Promise
        ↓
    Event Loop
        ↓
    asynchronous I/O

Але конкретна реалізація середовища залежить від того, де код виконується:

    Browser
    або
    Node.js

---

# 49. Event Loop + NestJS

У NestJS часто пишуть:

    @Get("users")
    async getUsers() {
        return this.usersService.findAll();
    }

А service:

    async findAll() {
        return this.database.query(
            "SELECT * FROM users"
        );
    }

Під час очікування бази:

    request
      ↓
    NestJS
      ↓
    DB query
      ↓
    await
      ↓
    Event Loop може обробляти інші операції
      ↓
    DB response
      ↓
    Promise fulfilled
      ↓
    function continues

Це одна з причин популярності Node.js для I/O-oriented backend applications.

---

# 50. Event Loop не замінює оптимізацію

Event Loop не робить важкий код швидким.

Наприклад:

    for (let i = 0; i < 10_000_000_000; i++) {
        // heavy computation
    }

Це все одно може заблокувати JavaScript.

Event Loop допомагає організувати асинхронний I/O, але:

    CPU-heavy synchronous work
        ↓
    може блокувати Event Loop

---

# 51. CPU-bound vs I/O-bound

### I/O-bound

Наприклад:

    fetch()
    database query
    filesystem read

Асинхронна модель Node.js тут працює дуже добре.

### CPU-bound

Наприклад:

    massive calculation
    image processing
    complex algorithm
    huge loop

Така робота може блокувати Event Loop.

Для CPU-heavy задач можуть використовуватися:

- Web Workers
- Worker Threads
- окремі процеси
- зовнішні worker services
- спеціалізовані сервіси

---

# 52. Що потрібно пам'ятати

## 🟢 Core

Потрібно розуміти:

- JavaScript має Call Stack
- синхронний код виконується першим
- `setTimeout(..., 0)` не виконується негайно
- Promise callbacks — microtasks
- microtasks мають пріоритет над tasks
- `await` призупиняє поточну async-функцію
- Event Loop координує виконання callbacks

---

## 🔵 Junior

Потрібно вміти:

- визначити порядок `console.log`
- пояснити `Promise.then()` vs `setTimeout`
- пояснити `async/await`
- розуміти Call Stack
- розуміти Microtask Queue
- розуміти Task Queue
- пояснити, чому `setTimeout(..., 0)` може виконатися пізніше
- розуміти blocking code
- розуміти Event Loop у browser / Node.js

---

## 🟠 Middle

Потрібно розуміти:

- microtask starvation
- event loop phases у Node.js
- I/O
- timers
- concurrency
- CPU-bound vs I/O-bound
- performance implications
- event loop blocking
- cancellation
- Promise combinators
- race conditions

---

## 🔴 Senior

Глибше:

- Node.js event loop phases
- libuv
- worker pool
- event loop latency
- backpressure
- streams
- Worker Threads
- process isolation
- high-throughput I/O
- performance profiling
- distributed asynchronous systems

---

# 53. Типові помилки

## ❌ Помилка 1

Думати:

    setTimeout(fn, 0);

означає:

    "виконай fn зараз"

Правильно:

    "fn може бути виконана не раніше встановленого timeout
    і тільки коли Event Loop зможе її обробити"

---

## ❌ Помилка 2

Думати, що `await` блокує весь JavaScript.

Правильно:

    await блокує продовження конкретної async function,
    але не весь Event Loop.

---

## ❌ Помилка 3

Думати, що Promise callback виконується одразу.

    Promise.resolve().then(fn);

`fn` виконується через Microtask Queue.

---

## ❌ Помилка 4

Думати, що asynchronous означає parallel.

Асинхронність і паралельність — різні поняття.

---

## ❌ Помилка 5

Ігнорувати синхронний CPU-heavy код.

Навіть у Node.js:

    while (...) {
        // heavy computation
    }

може заблокувати Event Loop.

---

## ❌ Помилка 6

Не враховувати microtasks після task.

Після виконання task Event Loop знову повинен обробити доступні microtasks.

---

# 54. Практика

## 🟢 Вправа 1 — порядок виконання

Створи 5–10 прикладів з:

    console.log()
    setTimeout()
    Promise.resolve().then()
    queueMicrotask()

Перед запуском прогнозуй результат.

---

## 🟢 Вправа 2 — async/await

Напиши:

    async function test() {
        console.log("start");

        await Promise.resolve();

        console.log("end");
    }

Потім додай:

    console.log("outside");

та поясни порядок.

---

## 🟢 Вправа 3 — nested microtasks

Створи microtask, яка створює ще одну microtask.

    queueMicrotask(() => {
        console.log("A");

        queueMicrotask(() => {
            console.log("B");
        });
    });

Додай `setTimeout()` і спрогнозуй результат.

---

## 🔵 Вправа 4 — fetch

Створи:

    async function loadData() {
        console.log("start");

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        console.log("response");

        const users = await response.json();

        console.log(users);
    }

Поясни, де тут:

    synchronous code
    Promise
    await
    asynchronous I/O
    microtask
    Event Loop

---

## 🔵 Вправа 5 — blocking

Створи навмисно довгий цикл:

    console.time("loop");

    for (let i = 0; i < 1_000_000_000; i++) {
        // heavy work
    }

    console.timeEnd("loop");

Паралельно постав:

    setTimeout(() => {
        console.log("Timer");
    }, 0);

Подивись, коли виконається `Timer`.

---

## 🔵 Вправа 6 — Full Stack

У твоєму Full Stack проекті простеж шлях:

    Browser
      ↓
    fetch()
      ↓
    HTTP
      ↓
    NestJS
      ↓
    PostgreSQL
      ↓
    Promise
      ↓
    await
      ↓
    response
      ↓
    React

Для кожного кроку визнач:

- що синхронне;
- що асинхронне;
- де Promise;
- де очікування;
- де працює Event Loop.

---

# 55. Питання для співбесіди

### Junior

1. Що таке Event Loop?
2. Що таке Call Stack?
3. Чому JavaScript називають single-threaded?
4. Що таке asynchronous code?
5. Що таке Task Queue?
6. Що таке Microtask Queue?
7. Чим Promise відрізняється від `setTimeout()` з точки зору Event Loop?
8. Що виведе:

       console.log("A");

       setTimeout(() => {
           console.log("B");
       }, 0);

       Promise.resolve().then(() => {
           console.log("C");
       });

       console.log("D");

9. Чому `setTimeout(..., 0)` не виконується негайно?
10. Чи блокує `await` весь JavaScript?

### Middle

11. Чому microtasks мають пріоритет?
12. Що таке microtask starvation?
13. Що таке blocking Event Loop?
14. Чим I/O-bound відрізняється від CPU-bound?
15. Як Event Loop працює в Node.js?
16. Що таке libuv?
17. Чому Node.js добре підходить для I/O-bound задач?
18. Чому CPU-heavy код може бути проблемою для Node.js?
19. Чим asynchronous code відрізняється від parallel execution?
20. Як `async/await` пов'язаний з Promise та Event Loop?

---

# 56. Міні-шпаргалка

    JavaScript
        ↓
    Call Stack
        ↓
    synchronous code
        ↓
    Stack empty?
        ↓
    Microtasks
        ↓
    Tasks
        ↓
    Microtasks
        ↓
    Tasks
        ↓
    ...

### Microtasks

    Promise.then()
    Promise.catch()
    Promise.finally()
    queueMicrotask()
    async/await continuation

### Tasks

    setTimeout()
    setInterval()
    DOM events
    інші browser / runtime tasks

### Головне правило

    Synchronous
        ↓
    Microtasks
        ↓
    Task
        ↓
    Microtasks
        ↓
    Task
        ↓
    ...

---

# 57. Найважливіший приклад

    console.log("1");

    setTimeout(() => {
        console.log("2");
    }, 0);

    Promise.resolve().then(() => {
        console.log("3");
    });

    queueMicrotask(() => {
        console.log("4");
    });

    console.log("5");

Результат:

    1
    5
    3
    4
    2

Якщо ти можеш пояснити цей приклад без підглядання — базове розуміння Event Loop вже є.

---

# 58. Event Loop у загальній картині JavaScript

Твій розділ `08-asynchronous-js` логічно складається в таку послідовність:

    01 Sync vs Async
          ↓
    02 Callbacks
          ↓
    03 Promises
          ↓
    04 Promise Chaining
          ↓
    05 Async/Await
          ↓
    06 Fetch
          ↓
    07 HTTP Basics
          ↓
    08 Error Handling
          ↓
    09 Promise Combinators
          ↓
    10 AbortController
          ↓
    11 Event Loop
          ↓
    12 API CRUD Project

Тобто Event Loop — це вже не стільки ще один API JavaScript, скільки **модель, яка пояснює, чому вся попередня асинхронність працює саме так**.

---

# 🎯 Головне

> **Event Loop координує виконання JavaScript та асинхронних операцій, дозволяючи single-threaded JavaScript працювати з timers, events, network, Promise та іншими asynchronous APIs без блокування основного виконання.**

Для практичного Full Stack JavaScript тобі достатньо дуже добре розуміти таку модель:

    Call Stack
        ↓
    synchronous JavaScript
        ↓
    asynchronous API
        ↓
    Promise / callback
        ↓
    Queue
        ↓
    Event Loop
        ↓
    Call Stack

І особливо запам'ятати:

    synchronous code
        ↓
    microtasks
        ↓
    tasks

А `async/await` — це не окрема магія. Під ним знаходиться Promise-механізм, який у свою чергу працює разом з Event Loop.

Саме це розуміння дозволяє перейти від:

    "я знаю як написати async/await"

до:

    "я розумію, що реально відбувається
    під час виконання асинхронного JavaScript-коду".