# 02. Promises

Promise — це об'єкт JavaScript, який представляє результат asynchronous operation, який буде доступний зараз, у майбутньому або завершиться помилкою.

Promises — основний сучасний механізм роботи з asynchronous JavaScript.

### Ключові поняття
✔ Promise
✔ asynchronous operation
✔ pending
✔ fulfilled
✔ rejected
✔ settled
✔ resolve
✔ reject
✔ then()
✔ catch()
✔ finally()
✔ Promise chaining
✔ Promise.all()
✔ Promise.allSettled()
✔ Promise.race()
✔ Promise.any()
✔ callback vs Promise
✔ error handling
✔ Promise composition

### Що потрібно пам'ятати
• Promise представляє майбутній результат asynchronous operation.

• Promise має три основні стани:
  - pending
  - fulfilled
  - rejected

• `fulfilled` означає, що операція успішно завершилась.

• `rejected` означає, що операція завершилась помилкою.

• `pending` означає, що операція ще не завершилась.

• Після переходу в `fulfilled` або `rejected` Promise називається `settled`.

• Promise не може повернутися зі `fulfilled` або `rejected` назад у `pending`.

• `resolve()` переводить Promise в успішний стан.

• `reject()` переводить Promise у стан помилки.

• `.then()` обробляє успішний результат.

• `.catch()` обробляє помилку.

• `.finally()` виконується після завершення Promise незалежно від результату.

• Promises дозволяють будувати послідовність asynchronous operations через chaining.

• Promise chaining допомагає уникати глибокої вкладеності callbacks.

• `Promise.all()` очікує завершення всіх Promise.

• `Promise.allSettled()` очікує завершення всіх Promise незалежно від результату.

• `Promise.race()` повертає результат першої завершеної Promise.

• `Promise.any()` повертає першу успішно виконану Promise.

• `fetch()` повертає Promise.

• `async/await` працює поверх Promises.

Основна модель:

    Callback
        ↓
    Promise
        ↓
    async / await

---

# Що таке Promise

Promise — це об'єкт, який представляє майбутній результат операції.

Спрощено:

    Promise
       │
       ├── pending
       │
       ├── fulfilled
       │
       └── rejected

Приклад:

    const promise = new Promise((resolve, reject) => {
      resolve("Success");
    });

---

# Створення Promise

Синтаксис:

    const promise = new Promise((resolve, reject) => {
      // asynchronous operation

      resolve(result);
      // або
      reject(error);
    });

`resolve` — успішне завершення.

`reject` — завершення з помилкою.

---

## Простий Promise

    const promise = new Promise((resolve) => {
      resolve("Hello");
    });

Отримати результат:

    promise.then((result) => {
      console.log(result);
    });

Результат:

    Hello

---

# Promise states

Promise має три основні стани:

    pending
       │
       ├──────────────► fulfilled
       │
       └──────────────► rejected

### Pending

Операція ще не завершена:

    pending

### Fulfilled

Операція успішно завершилась:

    fulfilled

### Rejected

Операція завершилась помилкою:

    rejected

### Settled

Promise є `settled`, якщо вона вже завершилась:

    fulfilled
    або
    rejected

---

# Promise lifecycle

Приклад:

    const promise = new Promise((resolve, reject) => {

      setTimeout(() => {
        resolve("Done");
      }, 1000);

    });

Спочатку:

    pending

Через 1 секунду:

    fulfilled

З результатом:

    "Done"

---

# resolve()

`resolve()` повідомляє Promise про успішне завершення.

    const promise = new Promise((resolve) => {
      resolve("Success");
    });

Результат Promise:

    "Success"

Отримання:

    promise.then((result) => {
      console.log(result);
    });

---

# reject()

`reject()` повідомляє Promise про помилку.

    const promise = new Promise((resolve, reject) => {
      reject(new Error("Something went wrong"));
    });

Обробка:

    promise.catch((error) => {
      console.error(error);
    });

---

# Promise з setTimeout()

Приклад:

    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve("Done");
      }, 1000);
    });

    promise.then((result) => {
      console.log(result);
    });

Послідовність:

    new Promise()
         ↓
    pending
         ↓
    setTimeout()
         ↓
    resolve()
         ↓
    fulfilled
         ↓
    then()
         ↓
    result

---

# then()

`.then()` використовується для обробки успішного результату Promise.

    promise.then((result) => {
      console.log(result);
    });

Приклад:

    Promise.resolve(10)
      .then((value) => {
        console.log(value);
      });

Результат:

    10

---

# then() повертає Promise

Це одна з найважливіших властивостей Promise.

    const promise = Promise.resolve(10);

    const nextPromise = promise.then((value) => {
      return value * 2;
    });

`nextPromise` також є Promise.

Результат:

    20

Це дозволяє створювати Promise chains.

---

# Promise chaining

Promise можна об'єднувати в ланцюжок.

    Promise.resolve(10)
      .then((value) => {
        return value * 2;
      })
      .then((value) => {
        return value + 5;
      })
      .then((value) => {
        console.log(value);
      });

Результат:

    25

Ланцюжок:

    10
     ↓
    × 2
     ↓
    20
     ↓
    + 5
     ↓
    25

---

# Передача результату між then()

    Promise.resolve(10)
      .then((value) => {
        return value * 2;
      })
      .then((value) => {
        console.log(value);
      });

Перший `then()` повертає:

    20

Другий `then()` отримує:

    20

---

# Важливе правило return

Якщо потрібно передати результат у наступний `.then()`, потрібно повернути значення:

    promise
      .then((value) => {
        return value * 2;
      })
      .then((value) => {
        console.log(value);
      });

Не слід плутати:

    return value;

і:

    console.log(value);

`console.log()` не передає значення далі.

---

# catch()

`.catch()` обробляє rejected Promise.

    Promise.reject(new Error("Failed"))
      .catch((error) => {
        console.error(error);
      });

Типовий pattern:

    promise
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });

---

# finally()

`.finally()` виконується незалежно від того, Promise fulfilled чи rejected.

    promise
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        console.log("Finished");
      });

Типове використання:

    loading = true;

    fetchData()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        loading = false;
      });

---

# Error handling

Типовий Promise pattern:

    doSomething()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });

Модель:

    Promise
       │
       ├── success → then()
       │
       └── error   → catch()

---

# Помилка всередині then()

Помилка, яка виникла всередині `.then()`, може бути перехоплена наступним `.catch()`.

    Promise.resolve("Hello")
      .then(() => {
        throw new Error("Something went wrong");
      })
      .catch((error) => {
        console.error(error);
      });

Це дозволяє централізовано обробляти помилки ланцюжка.

---

# Promise.resolve()

`Promise.resolve()` створює fulfilled Promise.

    const promise = Promise.resolve("Hello");

Еквівалентна ідея:

    new Promise((resolve) => {
      resolve("Hello");
    });

Приклад:

    Promise.resolve(10)
      .then((value) => {
        console.log(value);
      });

---

# Promise.reject()

`Promise.reject()` створює rejected Promise.

    const promise = Promise.reject(
      new Error("Something went wrong")
    );

Обробка:

    promise.catch((error) => {
      console.error(error);
    });

---

# Promise.all()

`Promise.all()` запускає/очікує групу Promise та успішно завершується лише тоді, коли успішно завершилися всі Promise.

    const promise1 = Promise.resolve(1);
    const promise2 = Promise.resolve(2);
    const promise3 = Promise.resolve(3);

    Promise.all([
      promise1,
      promise2,
      promise3
    ]).then((results) => {
      console.log(results);
    });

Результат:

    [1, 2, 3]

---

## Promise.all() і помилка

Якщо хоча б одна Promise rejected:

    const promise1 = Promise.resolve(1);
    const promise2 = Promise.reject(new Error("Failed"));
    const promise3 = Promise.resolve(3);

    Promise.all([
      promise1,
      promise2,
      promise3
    ])
      .then((results) => {
        console.log(results);
      })
      .catch((error) => {
        console.error(error);
      });

Весь `Promise.all()` буде rejected.

Модель:

    P1 ─────► fulfilled
    P2 ─────► rejected ───► Promise.all() rejected
    P3 ─────► fulfilled

---

# Promise.allSettled()

`Promise.allSettled()` чекає завершення всіх Promise.

Не має значення:

    fulfilled
    або
    rejected

Приклад:

    const promise1 = Promise.resolve("A");

    const promise2 = Promise.reject(
      new Error("Failed")
    );

    Promise.allSettled([
      promise1,
      promise2
    ]).then((results) => {
      console.log(results);
    });

Результат має інформацію про кожну Promise:

    [
      {
        status: "fulfilled",
        value: "A"
      },
      {
        status: "rejected",
        reason: Error(...)
      }
    ]

---

# Promise.race()

`Promise.race()` повертає результат першої Promise, яка завершиться.

    const promise1 = new Promise((resolve) => {
      setTimeout(() => resolve("First"), 1000);
    });

    const promise2 = new Promise((resolve) => {
      setTimeout(() => resolve("Second"), 2000);
    });

    Promise.race([
      promise1,
      promise2
    ]).then((result) => {
      console.log(result);
    });

Результат:

    First

---

# Promise.race() та rejected Promise

`Promise.race()` реагує на першу settled Promise.

Тобто першою може завершитися:

    fulfilled
    або
    rejected

Приклад:

    const promise1 = new Promise((resolve) => {
      setTimeout(() => resolve("Success"), 2000);
    });

    const promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Failed"));
      }, 1000);
    });

    Promise.race([
      promise1,
      promise2
    ])
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });

Перша завершена Promise:

    promise2

Отже `race()` буде rejected.

---

# Promise.any()

`Promise.any()` повертає першу Promise, яка успішно fulfilled.

    const promise1 = Promise.reject("Error");

    const promise2 = new Promise((resolve) => {
      setTimeout(() => resolve("Success"), 1000);
    });

    const promise3 = Promise.resolve("Fast success");

    Promise.any([
      promise1,
      promise2,
      promise3
    ]).then((result) => {
      console.log(result);
    });

Результат:

    Fast success

Rejected Promise не зупиняють `Promise.any()`.

---

# Promise.any() якщо всі rejected

Якщо всі Promise rejected:

    Promise.any([
      Promise.reject("Error 1"),
      Promise.reject("Error 2")
    ])
      .catch((error) => {
        console.log(error);
      });

Результатом буде `AggregateError`.

---

# Promise combinators

Основні static methods:

    Promise.all()
        ↓
    всі повинні успішно завершитись

    Promise.allSettled()
        ↓
    чекати всі незалежно від результату

    Promise.race()
        ↓
    перша settled Promise

    Promise.any()
        ↓
    перша fulfilled Promise

Міні-таблиця:

    all
    → всі успішні

    allSettled
    → всі завершені

    race
    → перша завершена

    any
    → перша успішна

---

# Послідовне виконання Promise

Promise можна виконувати послідовно:

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

Модель:

    getUser()
       ↓
    user
       ↓
    getOrders()
       ↓
    orders
       ↓
    getOrderDetails()
       ↓
    details

---

# Паралельне виконання Promise

Якщо операції незалежні, їх можна виконувати паралельно.

    const userPromise = getUser();
    const postsPromise = getPosts();
    const commentsPromise = getComments();

    Promise.all([
      userPromise,
      postsPromise,
      commentsPromise
    ]).then(([user, posts, comments]) => {
      console.log(user);
      console.log(posts);
      console.log(comments);
    });

Модель:

    getUser()     ────────┐
    getPosts()    ────────┼──► Promise.all()
    getComments() ────────┘

---

# Послідовно vs паралельно

Послідовно:

    await getUser();
    await getPosts();
    await getComments();

Усі операції чекають одна на одну.

Паралельно:

    const userPromise = getUser();
    const postsPromise = getPosts();
    const commentsPromise = getComments();

    await Promise.all([
      userPromise,
      postsPromise,
      commentsPromise
    ]);

Операції запускаються незалежно одна від одної.

### Важливо

Паралельне виконання доречне тоді, коли операції не залежать одна від одної.

---

# Callback vs Promise

Callback:

    getUser((error, user) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(user);
    });

Promise:

    getUser()
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });

Promise дозволяє:

    • будувати chains
    • централізовано обробляти помилки
    • комбінувати asynchronous operations
    • використовувати async/await

---

# Promise та Fetch

`fetch()` повертає Promise.

    fetch("/api/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

Модель:

    fetch()
       ↓
    Promise<Response>
       ↓
    response.json()
       ↓
    Promise<data>
       ↓
    data

---

# Перевірка HTTP помилки

Важливо:

`fetch()` не відхиляє Promise автоматично для HTTP статусів `404`, `500` тощо.

Тому часто потрібно перевіряти:

    response.ok

Приклад:

    fetch("/api/users")
      .then((response) => {

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

---

# Promise та Event Loop

Promise callbacks обробляються через microtask queue.

Спрощена модель:

    JavaScript
         │
         ▼
    Call Stack
         │
         ├──────────────► Web APIs / Runtime
         │
         ▼
    Microtask Queue
         │
         ▼
    Event Loop
         │
         ▼
    Call Stack

Для Promise:

    Promise resolved
         ↓
    .then()
         ↓
    Microtask Queue
         ↓
    Event Loop
         ↓
    Call Stack

---

# Promise та setTimeout()

Приклад:

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

Спрощено:

    synchronous code
          ↓
    microtasks
          ↓
    tasks / macrotasks

Тому Promise callbacks зазвичай виконуються раніше за `setTimeout(..., 0)` після завершення поточного synchronous code.

---

# Promise chaining та помилки

Помилка в одному `.then()` може перейти до наступного `.catch()`.

    Promise.resolve()
      .then(() => {
        throw new Error("Error");
      })
      .then(() => {
        console.log("This is skipped");
      })
      .catch((error) => {
        console.error(error);
      });

Модель:

    then()
      ↓
    error
      ↓
    skip next success handler
      ↓
    catch()

---

# finally() у Promise chain

    Promise.resolve("Success")
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        console.log("Finished");
      });

`finally()` використовується для cleanup:

    • hide loading
    • close connection
    • release resource
    • reset state

---

# Типові помилки

❌ Вважати Promise результатом asynchronous operation, який вже готовий.

Promise представляє майбутній результат.

❌ Плутати:

    resolve()
    reject()

❌ Забувати `return` у Promise chain.

    .then((value) => {
      return doSomething(value);
    })

❌ Не обробляти rejected Promise.

    promise.catch(handleError);

❌ Вважати `Promise.all()` успішним, якщо одна Promise rejected.

❌ Плутати `Promise.race()` та `Promise.any()`.

`race()`:

    перша settled

`any()`:

    перша fulfilled

❌ Вважати, що `fetch()` rejected для HTTP 404/500.

❌ Робити незалежні asynchronous operations послідовно без необхідності.

❌ Використовувати `Promise.all()`, коли операції залежать одна від одної.

❌ Плутати Promise з async/await.

`async/await` — це синтаксис для зручної роботи з Promise.

---

# Питання зі співбесіди

Що таке Promise?

Які стани має Promise?

Що таке `pending`?

Що таке `fulfilled`?

Що таке `rejected`?

Що таке `settled`?

Що робить `resolve()`?

Що робить `reject()`?

Для чого потрібен `.then()`?

Для чого потрібен `.catch()`?

Для чого потрібен `.finally()`?

Що таке Promise chaining?

Чому `.then()` повертає Promise?

Як передати результат від одного `.then()` до іншого?

Як обробляються помилки в Promise chain?

Що робить `Promise.resolve()`?

Що робить `Promise.reject()`?

Що робить `Promise.all()`?

Що робить `Promise.allSettled()`?

Що робить `Promise.race()`?

Що робить `Promise.any()`?

Яка різниця між `Promise.all()` та `Promise.allSettled()`?

Яка різниця між `Promise.race()` та `Promise.any()`?

Як виконати кілька Promise паралельно?

Як виконати Promise послідовно?

Що повертає `fetch()`?

Чи вважає `fetch()` HTTP 404 помилкою Promise?

Який зв'язок між Promise та Event Loop?

Що таке Microtask Queue?

Яка різниця між Promise та callback?

Який зв'язок між Promise та async/await?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке Promise.

Три основні стани:

    pending
    fulfilled
    rejected

Поняття:

    settled

`resolve()`.

`reject()`.

`.then()`.

`.catch()`.

`.finally()`.

Promise chaining.

Передача результату через `return`.

Базовий error handling.

`Promise.resolve()`.

`Promise.reject()`.

Розуміння Promise у `fetch()`.

Розуміння базової роботи Promise через Event Loop.

---

🔵 Junior

Створення власних Promise.

Promise chaining.

Послідовне виконання asynchronous operations.

Паралельне виконання asynchronous operations.

`Promise.all()`.

`Promise.allSettled()`.

`Promise.race()`.

`Promise.any()`.

Обробка помилок у Promise chains.

Розуміння `response.ok` у `fetch()`.

Розуміння Microtask Queue.

Порівняння callbacks та Promises.

---

🟠 Middle

Комбінування Promise.

Promise composition.

Побудова складних Promise chains.

Паралельне та послідовне виконання asynchronous operations.

Контроль concurrency.

Timeout patterns.

Retry patterns.

Cancellation patterns.

Error propagation.

Створення Promise-based APIs.

Перетворення callback APIs у Promise APIs.

Розуміння Promise resolution procedure.

Оптимізація asynchronous control flow.

---

🔴 Senior

Глибоке розуміння Promise specification.

Promise resolution procedure.

Thenable objects.

Microtask scheduling.

Event Loop internals.

Concurrency patterns.

Cancellation architecture.

Retry and backoff strategies.

Timeout strategies.

Concurrency limiting.

Resource management.

Asynchronous pipelines.

Error propagation architecture.

Design Promise-based APIs.

Performance та memory considerations.

---

# Міні-шпаргалка

Promise:

    pending
       │
       ├──── resolve() ────► fulfilled
       │
       └──── reject() ─────► rejected

Основні методи:

    promise
      │
      ├── .then()
      │
      ├── .catch()
      │
      └── .finally()

---

## Promise chain

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
      })
      .finally(() => {
        console.log("Finished");
      });

---

## Promise combinators

    Promise.all()
    → всі успішні

    Promise.allSettled()
    → всі завершені

    Promise.race()
    → перша settled

    Promise.any()
    → перша fulfilled

---

## Послідовно

    getUser()
      .then((user) => {
        return getPosts(user.id);
      })
      .then((posts) => {
        return getComments(posts);
      });

---

## Паралельно

    Promise.all([
      getUser(),
      getPosts(),
      getComments()
    ]).then(([user, posts, comments]) => {
      console.log(user);
      console.log(posts);
      console.log(comments);
    });

---

## Fetch

    fetch("/api/users")
      .then((response) => {

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

---

## Promise + Event Loop

    synchronous code
          ↓
    Call Stack
          ↓
    Promise resolved
          ↓
    Microtask Queue
          ↓
    Event Loop
          ↓
    Call Stack
          ↓
    .then()

---

# Головне:

• Promise — об'єкт, який представляє майбутній результат asynchronous operation.

• Promise має три основні стани:

    pending
    fulfilled
    rejected

• `fulfilled` і `rejected` — фінальні стани.

• `settled` означає, що Promise вже завершилась.

• `resolve()` означає успішне завершення.

• `reject()` означає завершення з помилкою.

• `.then()` обробляє успішний результат.

• `.catch()` обробляє помилку.

• `.finally()` виконується після завершення Promise незалежно від результату.

• `.then()` повертає нову Promise.

• Завдяки цьому можна будувати Promise chains.

• Для передачі результату в наступний `.then()` потрібно використовувати `return`.

• Promise дозволяють уникати надмірної вкладеності callbacks.

• `Promise.all()` успішний лише тоді, коли всі Promise успішні.

• `Promise.allSettled()` чекає завершення всіх Promise незалежно від результату.

• `Promise.race()` повертає першу settled Promise.

• `Promise.any()` повертає першу fulfilled Promise.

• `fetch()` повертає Promise.

• `fetch()` не відхиляє Promise автоматично через HTTP `404` або `500`; потрібно перевіряти `response.ok`.

• Promise callbacks потрапляють до Microtask Queue.

• Microtasks мають пріоритет перед звичайними tasks після завершення поточного synchronous code.

• `async/await` — зручний синтаксис для роботи з Promise.

Основна модель:

    Asynchronous operation
             ↓
          Promise
             ↓
      ┌──────┴──────┐
      ↓             ↓
   success        error
      ↓             ↓
   then()        catch()
      └──────┬──────┘
             ↓
         finally()
             ↓
        async/await