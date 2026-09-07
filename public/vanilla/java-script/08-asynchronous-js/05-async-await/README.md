# 03. Async / Await

`async/await` — це сучасний синтаксис JavaScript для зручної роботи з Promises.

Він дозволяє писати asynchronous code у стилі, схожому на звичайний synchronous code, але виконання asynchronous operations залишається асинхронним.

### Ключові поняття
✔ async
✔ await
✔ Promise
✔ asynchronous function
✔ Promise resolution
✔ return value
✔ throw
✔ try / catch
✔ finally
✔ error handling
✔ Promise chaining
✔ sequential execution
✔ parallel execution
✔ Promise.all()
✔ async function return value
✔ await Promise
✔ top-level await
✔ async/await vs Promise
✔ async/await vs callbacks

### Що потрібно пам'ятати
• `async` використовується для оголошення asynchronous function.

• `async` function завжди повертає Promise.

• `await` використовується для очікування результату Promise.

• `await` можна використовувати всередині `async` function.

• `await` не блокує весь JavaScript.

• `await` призупиняє виконання конкретної `async` function до завершення Promise.

• Після успішного завершення Promise `await` повертає її результат.

• Якщо Promise rejected, `await` генерує exception.

• Для обробки помилок зазвичай використовують:

    try {
      ...
    } catch (error) {
      ...
    }

• `finally` можна використовувати для cleanup.

• Значення, повернуте з `async` function, автоматично обгортається в Promise.

• `throw` всередині `async` function призводить до rejected Promise.

• `async/await` — це не окремий механізм асинхронності.

• `async/await` працює поверх Promises.

• Незалежні asynchronous operations часто краще запускати паралельно через `Promise.all()`.

• Послідовний `await` потрібен тоді, коли наступна операція залежить від результату попередньої.

Основна модель:

    async function
         ↓
       await
         ↓
      Promise
         ↓
    result / error

---

# async function

Синтаксис:

    async function getData() {
      // asynchronous code
    }

Приклад:

    async function greet() {
      return "Hello";
    }

Оскільки функція `async`, вона повертає Promise.

    const result = greet();

    console.log(result);

Результат:

    Promise

---

# Async function завжди повертає Promise

Навіть якщо ми повертаємо звичайне значення:

    async function getNumber() {
      return 10;
    }

Фактично:

    getNumber()
      .then((value) => {
        console.log(value);
      });

Результат:

    10

Можна мислити так:

    async function getNumber() {
      return 10;
    }

приблизно відповідає:

    function getNumber() {
      return Promise.resolve(10);
    }

---

# async + return

Приклад:

    async function getUser() {
      return {
        id: 1,
        name: "Alex"
      };
    }

Отримання результату:

    getUser().then((user) => {
      console.log(user);
    });

Або через `await`:

    async function main() {
      const user = await getUser();

      console.log(user);
    }

---

# await

`await` використовується для очікування Promise.

    async function main() {
      const result = await getData();

      console.log(result);
    }

Модель:

    getData()
       ↓
    Promise
       ↓
      await
       ↓
    result

---

# Простий приклад

    function getData() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("Data loaded");
        }, 1000);
      });
    }

    async function main() {
      const data = await getData();

      console.log(data);
    }

    main();

Через приблизно 1 секунду:

    Data loaded

---

# await не робить код синхронним

Важливо розуміти:

    await
       ≠
    block entire JavaScript

`await` призупиняє виконання поточної `async` function, але JavaScript runtime може продовжувати виконувати інший код.

Приклад:

    async function main() {
      console.log("A");

      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

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

---

# Як працює await

Спрощена модель:

    async function
         │
         ▼
    await Promise
         │
         ├── Promise pending
         │
         ▼
    function execution paused
         │
         │
         ▼
    Promise fulfilled
         │
         ▼
    execution continues
         │
         ▼
    result

Якщо Promise rejected:

    await Promise
         │
         ▼
      rejected
         │
         ▼
    exception
         │
         ▼
    catch

---

# await повертає результат Promise

    const promise = Promise.resolve(100);

    async function main() {
      const value = await promise;

      console.log(value);
    }

Результат:

    100

Тобто:

    Promise.resolve(100)
            ↓
          await
            ↓
           100

---

# await з Promise.reject()

    async function main() {
      const result = await Promise.reject(
        new Error("Failed")
      );

      console.log(result);
    }

Якщо помилку не перехопити, `async` function поверне rejected Promise.

Тому зазвичай:

    async function main() {
      try {
        const result = await Promise.reject(
          new Error("Failed")
        );

        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }

---

# try / catch

Основний спосіб обробки помилок з `async/await`:

    async function main() {
      try {
        const data = await getData();

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

Модель:

    try
      │
      ▼
    await Promise
      │
      ├── success ──► continue
      │
      └── error ────► catch

---

# finally

`finally` виконується незалежно від результату.

    async function main() {
      try {
        const data = await getData();

        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        console.log("Finished");
      }
    }

Типове використання:

    loading = true;

    try {
      const data = await getData();

      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      loading = false;
    }

---

# throw в async function

`throw` створює rejected Promise.

    async function test() {
      throw new Error("Something went wrong");
    }

Обробка:

    test().catch((error) => {
      console.error(error);
    });

Або:

    async function main() {
      try {
        await test();
      } catch (error) {
        console.error(error);
      }
    }

---

# async/await та Promise

Promise:

    getUser()
      .then((user) => {
        return getOrders(user.id);
      })
      .then((orders) => {
        return getOrderDetails(orders);
      })
      .then((details) => {
        console.log(details);
      })
      .catch((error) => {
        console.error(error);
      });

Async/await:

    async function main() {
      try {
        const user = await getUser();

        const orders = await getOrders(user.id);

        const details = await getOrderDetails(orders);

        console.log(details);
      } catch (error) {
        console.error(error);
      }
    }

Зазвичай `async/await` легше читати, особливо коли asynchronous operations виконуються послідовно.

---

# Послідовне виконання

Якщо друга операція залежить від першої:

    async function main() {
      const user = await getUser();

      const orders = await getOrders(user.id);

      const details = await getOrderDetails(orders);

      console.log(details);
    }

Модель:

    getUser()
       ↓
      user
       ↓
    getOrders(user.id)
       ↓
      orders
       ↓
    getOrderDetails(orders)
       ↓
      details

Тут `await` використовується свідомо, тому що кожна наступна операція потребує результату попередньої.

---

# Паралельне виконання

Якщо asynchronous operations незалежні, не потрібно чекати кожну окремо.

Неоптимальний варіант:

    async function main() {
      const users = await getUsers();

      const posts = await getPosts();

      const comments = await getComments();
    }

Умовно:

    getUsers()
       ↓
    wait
       ↓
    getPosts()
       ↓
    wait
       ↓
    getComments()

Якщо вони незалежні, краще:

    async function main() {
      const usersPromise = getUsers();
      const postsPromise = getPosts();
      const commentsPromise = getComments();

      const [users, posts, comments] = await Promise.all([
        usersPromise,
        postsPromise,
        commentsPromise
      ]);
    }

Модель:

    getUsers()     ───────┐
    getPosts()    ────────┼──► Promise.all()
    getComments() ────────┘
                           │
                           ▼
                         results

---

# Promise.all() + async/await

    async function main() {
      const [users, posts, comments] = await Promise.all([
        getUsers(),
        getPosts(),
        getComments()
      ]);

      console.log(users);
      console.log(posts);
      console.log(comments);
    }

Це один із найважливіших patterns у сучасному JavaScript.

---

# Послідовно чи паралельно?

Послідовно:

    const user = await getUser();
    const posts = await getPosts(user.id);

Використовуємо, якщо:

    getPosts()
    залежить від user.id

Паралельно:

    const [users, posts] = await Promise.all([
      getUsers(),
      getPosts()
    ]);

Використовуємо, якщо:

    getUsers()
    і
    getPosts()

не залежать одна від одної.

---

# async/await + fetch

`fetch()` повертає Promise, тому його можна використовувати з `await`.

    async function getUsers() {
      const response = await fetch("/api/users");

      const data = await response.json();

      return data;
    }

Використання:

    async function main() {
      const users = await getUsers();

      console.log(users);
    }

---

# Fetch + try/catch

    async function getUsers() {
      try {
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        return data;
      } catch (error) {
        console.error(error);
      }
    }

---

# Важливий момент: fetch і HTTP errors

`fetch()` не відхиляє Promise автоматично для HTTP статусів:

    404
    500
    403
    ...

Тому потрібно перевіряти:

    response.ok

Приклад:

    const response = await fetch("/api/users");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

---

# Async function з return

    async function getUser() {
      const response = await fetch("/api/user");

      const user = await response.json();

      return user;
    }

Результат:

    getUser()
        ↓
    Promise<User>

Тобто навіть якщо функція повертає:

    return user;

зовні ми отримуємо:

    Promise

---

# Async function з throw

    async function getUser() {
      const response = await fetch("/api/user");

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      return response.json();
    }

`throw` призводить до rejected Promise.

---

# Async function як API

Async function можна використовувати як зручний API:

    async function getUser(id) {
      const response = await fetch(`/api/users/${id}`);

      if (!response.ok) {
        throw new Error("User not found");
      }

      return response.json();
    }

Використання:

    async function main() {
      try {
        const user = await getUser(10);

        console.log(user);
      } catch (error) {
        console.error(error);
      }
    }

---

# await та звичайне значення

`await` може працювати не тільки з Promise.

    async function main() {
      const value = await 10;

      console.log(value);
    }

Результат:

    10

JavaScript фактично розглядає значення як успішно виконану Promise.

Але основне призначення `await` — очікування Promise.

---

# await можна використовувати з Promise

    const promise = Promise.resolve("Hello");

    async function main() {
      const result = await promise;

      console.log(result);
    }

---

# await поза async function

У сучасному JavaScript `await` також може використовуватися як `top-level await` у ES modules.

Наприклад:

    const response = await fetch("/api/users");

    const users = await response.json();

Це залежить від середовища та того, що файл виконується як module.

---

# Top-level await

У JavaScript modules можна використовувати:

    const data = await fetch("/api/data")
      .then((response) => response.json());

Це називається:

    top-level await

Воно дозволяє використовувати `await` без обгортки в `async function`.

---

# Async/await та Event Loop

`async/await` не змінює фундаментальну модель JavaScript.

Спрощено:

    async function
         │
         ▼
       await
         │
         ▼
      Promise
         │
         ▼
    function pauses
         │
         ▼
    other JavaScript can run
         │
         ▼
    Promise fulfilled
         │
         ▼
    continuation
         │
         ▼
    Microtask Queue
         │
         ▼
    Event Loop
         │
         ▼
    Call Stack

Тобто `await` не блокує весь JavaScript runtime.

---

# Async/await та Microtask Queue

Приклад:

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

Після `await` продовження `async function` виконується пізніше як microtask.

---

# Async/await vs Promise

Promise chain:

    getData()
      .then((data) => {
        return processData(data);
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });

Async/await:

    async function main() {
      try {
        const data = await getData();

        const result = await processData(data);

        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }

Обидва варіанти працюють з Promise.

`async/await` — інший синтаксис для зручнішої роботи з ними.

---

# Async/await vs callbacks

Callback:

    getUser((error, user) => {
      if (error) {
        console.error(error);
        return;
      }

      getOrders(user.id, (error, orders) => {
        if (error) {
          console.error(error);
          return;
        }

        console.log(orders);
      });
    });

Async/await:

    async function main() {
      try {
        const user = await getUser();

        const orders = await getOrders(user.id);

        console.log(orders);
      } catch (error) {
        console.error(error);
      }
    }

Async/await зазвичай робить послідовний asynchronous code значно читабельнішим.

---

# Promise.allSettled() + await

    async function main() {
      const results = await Promise.allSettled([
        getUsers(),
        getPosts(),
        getComments()
      ]);

      console.log(results);
    }

Усі операції будуть завершені незалежно від того, успішні вони чи ні.

---

# Promise.race() + await

    async function main() {
      const result = await Promise.race([
        getFromServerA(),
        getFromServerB()
      ]);

      console.log(result);
    }

Повертається перша settled Promise.

---

# Promise.any() + await

    async function main() {
      const result = await Promise.any([
        getFromServerA(),
        getFromServerB(),
        getFromServerC()
      ]);

      console.log(result);
    }

Повертається перша fulfilled Promise.

---

# Змішування await та Promise methods

Цілком нормально використовувати:

    async function main() {
      const results = await Promise.all([
        getUsers(),
        getPosts()
      ]);

      console.log(results);
    }

`await` не замінює `Promise.all()`.

Вони вирішують різні задачі:

    await
      ↓
    очікувати Promise

    Promise.all()
      ↓
    комбінувати кілька Promise

---

# Типові помилки

❌ Вважати `async` функцію звичайною функцією.

    async function getData() {
      return "data";
    }

Результат:

    Promise

❌ Використовувати `await` без розуміння, що він працює з Promise.

❌ Вважати, що `await` блокує весь JavaScript.

❌ Виконувати незалежні операції послідовно:

    await getUsers();
    await getPosts();
    await getComments();

коли їх можна виконати паралельно через:

    await Promise.all([
      getUsers(),
      getPosts(),
      getComments()
    ]);

❌ Забувати `try/catch` там, де потрібно обробити rejected Promise.

❌ Вважати, що `fetch()` автоматично кидає помилку для HTTP 404/500.

❌ Забувати перевіряти:

    response.ok

❌ Плутати:

    await Promise.all()

з:

    await Promise.allSettled()

❌ Створювати зайві `new Promise()` навколо вже існуючої Promise API.

❌ Робити так:

    async function getData() {
      return new Promise(async (resolve, reject) => {
        ...
      });
    }

Це часто є ознакою неправильного розуміння async/await.

❌ Використовувати `await` у циклі без розуміння наслідків для послідовності виконання.

---

# await у циклах

Приклад:

    async function processUsers(users) {
      for (const user of users) {
        await processUser(user);
      }
    }

Операції виконуються послідовно:

    user 1
      ↓
    wait
      ↓
    user 2
      ↓
    wait
      ↓
    user 3

Це може бути правильно, якщо порядок важливий.

Але якщо операції незалежні, можна використовувати:

    async function processUsers(users) {
      await Promise.all(
        users.map((user) => processUser(user))
      );
    }

Модель:

    user 1 ─────┐
    user 2 ─────┼──► Promise.all()
    user 3 ─────┘

---

# Sequential vs Parallel

Sequential:

    for (const item of items) {
      await process(item);
    }

Parallel:

    await Promise.all(
      items.map((item) => process(item))
    );

Вибір залежить від задачі.

### Sequential

Потрібен порядок:

    A → B → C

### Parallel

Операції незалежні:

    A ──┐
    B ──┼──► results
    C ──┘

---

# Обмеження паралельності

`Promise.all()` може запускати багато операцій одночасно.

Наприклад:

    await Promise.all(
      thousandsOfItems.map((item) => process(item))
    );

Для великої кількості задач це може створити надмірне навантаження.

На Middle/Senior рівні потрібно розуміти:

    concurrency
    rate limits
    connection limits
    resource limits
    batching
    concurrency control

---

# Async/await і return await

Зазвичай достатньо:

    async function getData() {
      return getSomething();
    }

Не завжди потрібно:

    async function getData() {
      return await getSomething();
    }

Але `return await` може бути корисним у певних сценаріях, наприклад для обробки помилки локальним `try/catch`.

Приклад:

    async function getData() {
      try {
        return await getSomething();
      } catch (error) {
        console.error(error);

        throw error;
      }
    }

---

# Типовий async/await pattern

    async function main() {
      try {

        // start
        const data = await getData();

        // process
        const result = await processData(data);

        // output
        console.log(result);

      } catch (error) {

        // error
        console.error(error);

      } finally {

        // cleanup
        console.log("Finished");

      }
    }

    main();

---

# Async/await + API

Типовий frontend pattern:

    async function loadUsers() {
      try {
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error(
            `HTTP error: ${response.status}`
          );
        }

        const users = await response.json();

        return users;

      } catch (error) {
        console.error("Failed to load users:", error);

        throw error;
      }
    }

---

# Async/await у frontend

Наприклад:

    async function renderUsers() {
      try {
        const users = await loadUsers();

        users.forEach((user) => {
          console.log(user.name);
        });

      } catch (error) {
        console.error(error);
      }
    }

Модель:

    UI
     │
     ▼
    async function
     │
     ▼
    fetch()
     │
     ▼
    Promise
     │
     ▼
    await
     │
     ▼
    data
     │
     ▼
    UI update

---

# Async/await у Node.js

Async/await широко використовується у Node.js:

    async function readUsers() {
      try {
        const users = await getUsersFromDatabase();

        return users;
      } catch (error) {
        console.error(error);

        throw error;
      }
    }

Типові asynchronous operations:

    database queries
    file system
    HTTP requests
    APIs
    authentication
    queues
    external services

---

# Питання зі співбесіди

Що таке `async`?

Що таке `await`?

Чому `async` function завжди повертає Promise?

Що повертає `await`?

Що відбувається, якщо Promise rejected під час `await`?

Як обробляти помилки в `async/await`?

Для чого потрібні `try/catch/finally`?

Що відбувається при `throw` всередині `async` function?

Чи блокує `await` весь JavaScript?

Як `async/await` пов'язаний з Event Loop?

Як `async/await` пов'язаний з Promises?

Чим `async/await` відрізняється від Promise `.then()`?

Чим `async/await` відрізняється від callbacks?

Як виконати кілька asynchronous operations паралельно?

Коли використовувати `Promise.all()`?

Яка різниця між sequential та parallel execution?

Чому `await` всередині `for...of` може виконувати операції послідовно?

Як виконати operations з масиву паралельно?

Що робить `Promise.allSettled()`?

Що робить `Promise.race()`?

Що робить `Promise.any()`?

Чи потрібно використовувати `await` перед `Promise.all()`?

Чому `fetch()` потрібно перевіряти через `response.ok`?

Що таке top-level await?

Що станеться, якщо async function повертає звичайне значення?

Що станеться, якщо async function виконує `throw`?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке `async`.

Що таке `await`.

Розуміти, що `async function` повертає Promise.

Розуміти, що `await` отримує результат Promise.

Розуміти `try / catch`.

Розуміти `throw`.

Розуміти `finally`.

Розуміти:

    async/await
        ↓
    Promises

Розуміти послідовне виконання asynchronous operations.

Розуміти базове паралельне виконання через:

    Promise.all()

---

🔵 Junior

Використання `async/await` з `fetch()`.

Обробка HTTP errors через:

    response.ok

Promise chaining → async/await.

Sequential execution.

Parallel execution.

`Promise.all()` + `await`.

`Promise.allSettled()` + `await`.

`Promise.race()` + `await`.

`Promise.any()` + `await`.

Async functions у frontend.

Async functions у Node.js.

Розуміння Event Loop та Microtask Queue.

Розуміння `await` у циклах.

---

🟠 Middle

Concurrency.

Concurrency limits.

Batch processing.

Retry patterns.

Timeout patterns.

Cancellation.

Error propagation.

Async iteration.

Async generators.

Top-level await.

Побудова asynchronous pipelines.

Контроль паралельності.

Оптимізація sequential/parallel execution.

Обробка asynchronous operations у великих масивах.

---

🔴 Senior

Event Loop internals.

Microtask scheduling.

Advanced concurrency patterns.

Concurrency control.

Rate limiting.

Backpressure.

Cancellation architecture.

Timeout and retry architecture.

Async resource management.

Distributed asynchronous workflows.

Asynchronous pipelines.

Failure handling.

Resilience patterns.

Performance optimization.

Design asynchronous APIs.

---

# Міні-шпаргалка

## async

    async function getData() {
      return "data";
    }

    getData()
      .then((data) => {
        console.log(data);
      });

`async`:

    function → Promise

---

## await

    async function main() {
      const data = await getData();

      console.log(data);
    }

`await`:

    Promise → result

---

## Error handling

    async function main() {
      try {
        const data = await getData();

        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        console.log("Finished");
      }
    }

---

## Sequential

    const user = await getUser();

    const posts = await getPosts(user.id);

    const comments = await getComments(posts);

Модель:

    A → B → C

---

## Parallel

    const [users, posts, comments] = await Promise.all([
      getUsers(),
      getPosts(),
      getComments()
    ]);

Модель:

    A ──┐
    B ──┼──► results
    C ──┘

---

## Fetch

    async function getUsers() {
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return response.json();
    }

---

## Async + Promise

    async function getData() {
      return Promise.resolve("Hello");
    }

    const data = await getData();

Результат:

    Hello

---

## Async + throw

    async function getData() {
      throw new Error("Failed");
    }

    try {
      await getData();
    } catch (error) {
      console.error(error);
    }

---

## Async function

    async function main() {
      const data = await getData();

      return data;
    }

    main()
      ↓
    Promise
      ↓
    result

---

# Основна схема

    async function
          │
          ▼
        await
          │
          ▼
       Promise
          │
       ┌──┴──┐
       ▼     ▼
    success error
       │     │
       ▼     ▼
    result  catch
       │
       ▼
    continue

---

# Async / Await vs Promise

    Promise:

    getData()
      .then((data) => {
        return process(data);
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });


    Async / Await:

    async function main() {
      try {
        const data = await getData();

        const result = await process(data);

        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }

---

# Головне:

• `async` оголошує asynchronous function.

• `async function` завжди повертає Promise.

• `await` використовується для очікування Promise.

• `await` повертає fulfilled value Promise.

• Якщо Promise rejected, `await` генерує exception.

• Для обробки помилок використовують:

    try / catch

• `finally` використовується для cleanup.

• `throw` всередині `async function` призводить до rejected Promise.

• `async/await` працює поверх Promises.

• `async/await` не є окремим механізмом асинхронності.

• `await` не блокує весь JavaScript runtime.

• `await` призупиняє виконання поточної `async function`.

• Після завершення Promise виконання `async function` продовжується.

• Продовження після `await` виконується асинхронно через механізм Promise/microtask.

• Якщо operations залежать одна від одної:

    await A
    await B
    await C

• Якщо operations незалежні:

    await Promise.all([
      A,
      B,
      C
    ])

• `Promise.all()` не замінюється `async/await`; вони часто використовуються разом.

• `fetch()` повертає Promise.

• HTTP `404` або `500` самі по собі не роблять `fetch()` Promise rejected.

• Для HTTP errors потрібно перевіряти:

    response.ok

• `async/await` зазвичай робить послідовний asynchronous code читабельнішим.

• `await` у циклі може зробити operations послідовними.

• Для незалежних operations у масиві часто використовують:

    Promise.all(
      items.map(...)
    )

• Основна модель сучасного asynchronous JavaScript:

    Callback
        ↓
    Promise
        ↓
    async / await

Найважливіше розуміння:

    async
      ↓
    function returns Promise

    await
      ↓
    wait for Promise result

    try / catch
      ↓
    handle errors

    Promise.all()
      ↓
    run independent async operations together