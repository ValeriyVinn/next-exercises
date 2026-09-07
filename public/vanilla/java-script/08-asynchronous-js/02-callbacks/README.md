# 01. Callbacks

Callback — це функція, яка передається як аргумент іншій функції та викликається пізніше, коли виконується певна операція або настає певна подія.

Callbacks — один із базових механізмів асинхронного JavaScript.

### Ключові поняття
✔ callback  
✔ callback function  
✔ higher-order function  
✔ synchronous callback  
✔ asynchronous callback  
✔ event  
✔ event handler  
✔ asynchronous operation  
✔ callback queue  
✔ event loop  
✔ callback hell  
✔ error-first callback  

### Що потрібно пам'ятати
• Callback — це функція, передана іншій функції як аргумент.

• Callback може бути викликана:
  - одразу;
  - після завершення операції;
  - у відповідь на подію;
  - через певний час.

• Callback сама по собі не робить код асинхронним.

• Callback може бути як synchronous, так і asynchronous.

• У JavaScript функції є first-class objects, тому їх можна:
  - зберігати у змінних;
  - передавати як аргументи;
  - повертати з інших функцій.

• Функція, яка приймає callback або повертає функцію, називається higher-order function.

• Багато методів масивів використовують callbacks:
  - map()
  - filter()
  - find()
  - forEach()
  - some()
  - every()
  - reduce()

• Event handlers також є callbacks.

• setTimeout() приймає callback, який буде виконаний пізніше.

• Callback — історичний та фундаментальний механізм роботи з asynchronous JavaScript.

• Для складніших асинхронних операцій callbacks поступово були доповнені Promises та async/await.

---

## Callback function

Звичайна функція:

    function greet() {
      console.log("Hello");
    }

Передача функції як аргументу:

    function execute(callback) {
      callback();
    }

    execute(greet);

Тут:

    greet
      ↓
    callback
      ↓
    callback()

`greet` — callback function.

---

## Callback як аргумент

Функцію можна передати без виклику:

    function sayHello() {
      console.log("Hello");
    }

    function execute(callback) {
      callback();
    }

    execute(sayHello);

Правильно:

    execute(sayHello);

Неправильно:

    execute(sayHello());

Чому?

`sayHello` — передаємо саму функцію.

`sayHello()` — одразу викликаємо функцію та передаємо її результат.

---

## Callback з параметрами

Callback може отримувати аргументи:

    function processUser(name, callback) {
      callback(name);
    }

    function greet(name) {
      console.log(`Hello, ${name}!`);
    }

    processUser("Alex", greet);

Результат:

    Hello, Alex!

Callback можна передати як arrow function:

    processUser("Alex", (name) => {
      console.log(`Hello, ${name}!`);
    });

---

## Anonymous callback

Callback не обов'язково повинна мати ім'я.

    function execute(callback) {
      callback();
    }

    execute(function () {
      console.log("Hello");
    });

З arrow function:

    execute(() => {
      console.log("Hello");
    });

Короткий запис:

    execute(() => console.log("Hello"));

---

## Callback та higher-order function

Higher-order function — функція, яка:

    1. приймає функцію як аргумент
    або
    2. повертає функцію
    або
    3. робить обидва

Приклад:

    function execute(callback) {
      callback();
    }

`execute()` — higher-order function.

`callback` — callback function.

---

## Synchronous callback

Callback не обов'язково є асинхронною.

Приклад:

    [1, 2, 3].forEach((number) => {
      console.log(number);
    });

Callback виконується синхронно під час роботи `forEach()`.

Ще приклад:

    function calculate(a, b, callback) {
      const result = a + b;
      callback(result);
    }

    calculate(10, 20, (result) => {
      console.log(result);
    });

Результат:

    30

Тут немає asynchronous operation.

### Важливо

    callback ≠ asynchronous

Callback — це спосіб передати функцію.

Асинхронність залежить від того, коли ця функція буде викликана.

---

## Asynchronous callback

Callback може бути викликана пізніше.

Наприклад:

    console.log("Start");

    setTimeout(() => {
      console.log("Timeout");
    }, 1000);

    console.log("End");

Результат:

    Start
    End
    Timeout

Callback `setTimeout()` виконається пізніше.

---

## Callback у setTimeout()

Синтаксис:

    setTimeout(callback, delay);

Приклад:

    setTimeout(() => {
      console.log("Hello");
    }, 2000);

Через приблизно 2 секунди callback буде поставлена на виконання.

Інший приклад:

    function sayHello() {
      console.log("Hello");
    }

    setTimeout(sayHello, 2000);

---

## Callback та події

Event handler — це callback, яка виконується у відповідь на подію.

HTML:

    <button id="button">Click</button>

JavaScript:

    const button = document.querySelector("#button");

    button.addEventListener("click", () => {
      console.log("Button clicked");
    });

Функція:

    () => {
      console.log("Button clicked");
    }

є callback.

Вона буде виконана тоді, коли користувач натисне кнопку.

---

## Callback у DOM

Приклад:

    const button = document.querySelector("button");

    function handleClick() {
      console.log("Clicked");
    }

    button.addEventListener("click", handleClick);

Тут:

    addEventListener()
          ↓
    handleClick
          ↓
    callback

---

## Callback у масивах

Callbacks дуже часто використовуються з array methods.

### forEach()

    const numbers = [1, 2, 3];

    numbers.forEach((number) => {
      console.log(number);
    });

Callback виконується для кожного елемента.

---

### map()

    const numbers = [1, 2, 3];

    const doubled = numbers.map((number) => {
      return number * 2;
    });

Результат:

    [2, 4, 6]

---

### filter()

    const numbers = [1, 2, 3, 4, 5];

    const evenNumbers = numbers.filter((number) => {
      return number % 2 === 0;
    });

Результат:

    [2, 4]

---

### find()

    const users = [
      { id: 1, name: "Alex" },
      { id: 2, name: "John" }
    ];

    const user = users.find((user) => {
      return user.id === 2;
    });

Результат:

    { id: 2, name: "John" }

---

### some()

    const numbers = [1, 3, 5, 8];

    const hasEven = numbers.some((number) => {
      return number % 2 === 0;
    });

Результат:

    true

---

### every()

    const numbers = [2, 4, 6];

    const allEven = numbers.every((number) => {
      return number % 2 === 0;
    });

Результат:

    true

---

## Callback та порядок виконання

Приклад:

    console.log("1");

    setTimeout(() => {
      console.log("2");
    }, 0);

    console.log("3");

Результат:

    1
    3
    2

Навіть `0` milliseconds не означає "виконати зараз".

Callback передається в механізм обробки асинхронної операції та буде виконана пізніше.

---

## Event Loop

Спрощена модель JavaScript:

    JavaScript
        │
        ▼
    Call Stack
        │
        │ asynchronous operation
        ▼
    Web APIs / Runtime
        │
        ▼
    Callback Queue
        │
        ▼
    Event Loop
        │
        ▼
    Call Stack

Наприклад:

    console.log("Start");

    setTimeout(() => {
      console.log("Callback");
    }, 0);

    console.log("End");

Спочатку:

    Start

Потім:

    End

І тільки після завершення поточного synchronous code:

    Callback

### Важливо

`setTimeout(..., 0)` не означає:

    execute immediately

Це означає приблизно:

    execute callback when possible after the delay
    and after the current call stack is clear

---

# Callback-based asynchronous code

Callbacks історично широко використовувалися для asynchronous APIs.

Умовна модель:

    doSomethingAsync((error, result) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(result);
    });

Ідея:

    start operation
          ↓
    wait for result
          ↓
    callback(error, result)
          ↓
    handle result

---

## Error-first callback

У Node.js традиційно використовується pattern:

    callback(error, result);

Приклад:

    function readData(callback) {
      // asynchronous operation

      const error = null;
      const data = "Hello";

      callback(error, data);
    }

Використання:

    readData((error, data) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(data);
    });

Правило:

    if (error) {
      handle error
      return
    }

    handle result

---

## Error-first callback pattern

Типова структура:

    function operation(callback) {
      // ...

      if (error) {
        callback(error);
        return;
      }

      callback(null, result);
    }

Використання:

    operation((error, result) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(result);
    });

Це особливо характерно для Node.js APIs.

---

# Callback Hell

Callback Hell — ситуація, коли asynchronous callbacks сильно вкладаються одна в одну.

Приклад:

    firstOperation((result1) => {

      secondOperation(result1, (result2) => {

        thirdOperation(result2, (result3) => {

          fourthOperation(result3, (result4) => {

            console.log(result4);

          });

        });

      });

    });

Візуально:

    firstOperation
        │
        └── secondOperation
              │
              └── thirdOperation
                    │
                    └── fourthOperation

Чим більше таких операцій, тим складніше читати та підтримувати код.

---

## Чому Callback Hell — проблема

❌ багато вкладеності

❌ складніше читати код

❌ складніше обробляти помилки

❌ складніше змінювати порядок операцій

❌ складніше тестувати

❌ складніше повторно використовувати код

❌ control flow стає важко зрозумілим

---

## Як уникати Callback Hell

Один із підходів — винести callbacks в окремі функції.

Замість:

    first((result) => {
      second(result, (result) => {
        third(result, (result) => {
          console.log(result);
        });
      });
    });

можна:

    function handleFirst(result) {
      second(result, handleSecond);
    }

    function handleSecond(result) {
      third(result, handleThird);
    }

    function handleThird(result) {
      console.log(result);
    }

    first(handleFirst);

Але для сучасного JavaScript частіше використовують:

    Promises
        ↓
    async / await

---

# Callback vs Promise

Callback:

    doSomething((error, result) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(result);
    });

Promise:

    doSomething()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });

Async/await:

    async function main() {
      try {
        const result = await doSomething();
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }

Спрощений розвиток asynchronous JavaScript:

    Callbacks
        ↓
    Promises
        ↓
    async / await

---

# Callback vs Event Handler

Не кожен callback є event handler.

Callback:

    numbers.forEach((number) => {
      console.log(number);
    });

Event handler:

    button.addEventListener("click", () => {
      console.log("Clicked");
    });

Обидва є callbacks.

Але event handler — callback, пов'язаний з певною подією.

---

# Callback vs function call

Передати функцію:

    execute(sayHello);

Викликати функцію:

    execute(sayHello());

Різниця:

    sayHello
        ↓
    передаємо функцію

    sayHello()
        ↓
    викликаємо функцію

Це одна з найважливіших речей, яку потрібно розуміти при роботі з callbacks.

---

# Типові приклади

### 1. Передати callback

    function run(callback) {
      callback();
    }

    run(() => {
      console.log("Done");
    });

---

### 2. Callback з параметром

    function process(value, callback) {
      const result = value * 2;
      callback(result);
    }

    process(10, (result) => {
      console.log(result);
    });

---

### 3. Async callback

    function delay(callback) {
      setTimeout(() => {
        callback();
      }, 1000);
    }

    delay(() => {
      console.log("Done");
    });

---

### 4. Callback з error-first pattern

    function operation(callback) {
      const success = true;

      if (!success) {
        callback(new Error("Something went wrong"));
        return;
      }

      callback(null, "Success");
    }

    operation((error, result) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(result);
    });

---

# Основна схема callback

    Function
       │
       │ callback
       ▼
    Other Function
       │
       │ later / immediately
       ▼
    callback()

---

# Asynchronous callback

    Start
      │
      ▼
    Start async operation
      │
      │
      │ wait
      ▼
    operation completed
      │
      ▼
    callback()
      │
      ▼
    handle result

---

# Callback + Event Loop

    JavaScript code
          │
          ▼
      Call Stack
          │
          ▼
    async operation
          │
          ▼
    Runtime / Web APIs
          │
          ▼
    Callback Queue
          │
          ▼
      Event Loop
          │
          ▼
      Call Stack
          │
          ▼
      callback()

---

# Callback Hell

    operation1((result1) => {
      operation2(result1, (result2) => {
        operation3(result2, (result3) => {
          operation4(result3, (result4) => {
            console.log(result4);
          });
        });
      });
    });

Проблема:

    ┌───────────────────────┐
    │ operation 1           │
    │   ┌─────────────────┐ │
    │   │ operation 2     │ │
    │   │   ┌───────────┐ │ │
    │   │   │ operation3│ │ │
    │   │   │   ┌─────┐ │ │ │
    │   │   │   │ ... │ │ │ │
    │   │   │   └─────┘ │ │ │
    │   │   └───────────┘ │ │
    │   └─────────────────┘ │
    └───────────────────────┘

Рішення:

    Promises
        ↓
    async / await

---

# Типові помилки

❌ Плутати callback із asynchronous operation.

❌ Викликати callback одразу, коли потрібно передати її:

    execute(callback());

замість:

    execute(callback);

❌ Не обробляти error у callback.

❌ Створювати надмірну вкладеність callbacks.

❌ Вважати `setTimeout(..., 0)` синхронним.

❌ Вважати, що callback виконується одразу після завершення async operation без урахування event loop.

❌ Не розуміти різницю між synchronous та asynchronous callback.

❌ Передавати результат функції замість самої функції.

---

# Питання зі співбесіди

Що таке callback?

Що таке callback function?

Чому функції можна передавати як аргументи?

Що таке higher-order function?

Чи кожен callback є асинхронним?

У чому різниця між synchronous та asynchronous callback?

Як працює callback у `setTimeout()`?

Як callback використовується в `addEventListener()`?

Що таке event handler?

Що таке error-first callback?

Що таке callback hell?

Чому callback hell є проблемою?

Як уникати callback hell?

Який зв'язок між callbacks та Event Loop?

Чому `setTimeout(callback, 0)` не виконує callback негайно?

Чим callbacks відрізняються від Promises?

Чим callbacks відрізняються від async/await?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке callback.

Як передавати функцію як аргумент.

Як викликати callback.

Різниця між:

    callback

та:

    callback()

Що таке higher-order function.

Synchronous callback.

Asynchronous callback.

Callbacks у:

    setTimeout()
    addEventListener()
    array methods

Розуміти базову роль Event Loop.

Розуміти callback queue.

Розуміти callback hell.

---

🔵 Junior

Error-first callback.

Callback-based asynchronous code.

Послідовне виконання asynchronous operations через callbacks.

Обробка помилок у callbacks.

Розуміння `setTimeout()` та callback queue.

Розуміння event loop у контексті callbacks.

Розуміння обмежень callback-based architecture.

Переписування простого callback code на Promise.

---

🟠 Middle

Проєктування callback-based APIs.

Error propagation.

Multiple callbacks.

Nested asynchronous operations.

Callback composition.

Контроль порядку asynchronous operations.

Розуміння event loop та task queues.

Порівняння callback-based API та Promise-based API.

Promisification callback APIs.

---

🔴 Senior

Архітектура asynchronous systems.

Event loop internals.

Task queue / microtask queue interaction.

Callback scheduling.

Backpressure та asynchronous pipelines.

Error propagation strategies.

Design asynchronous APIs.

Callback cancellation patterns.

Performance implications.

Legacy callback API migration.

Callback → Promise migration strategies.

---

# Міні-шпаргалка

Callback:

    function execute(callback) {
      callback();
    }

    execute(() => {
      console.log("Done");
    });

Передача:

    execute(callback);

Виклик:

    callback();

Не плутати:

    callback
        ↓
    function

    callback()
        ↓
    function call

---

## Synchronous callback

    [1, 2, 3].forEach((number) => {
      console.log(number);
    });

Callback виконується під час виконання `forEach()`.

---

## Asynchronous callback

    setTimeout(() => {
      console.log("Done");
    }, 1000);

Callback буде виконана пізніше.

---

## Event callback

    button.addEventListener("click", () => {
      console.log("Clicked");
    });

---

## Error-first callback

    operation((error, result) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(result);
    });

---

## Callback Hell

    operation1((result1) => {
      operation2(result1, (result2) => {
        operation3(result2, (result3) => {
          console.log(result3);
        });
      });
    });

---

# Головне:

• Callback — функція, передана іншій функції.

• Callback може бути synchronous або asynchronous.

• Callback сама по собі не означає asynchronous execution.

• Functions у JavaScript є first-class objects.

• Function можна передати як аргумент:

    execute(callback);

• Function можна викликати:

    callback();

• `callback` і `callback()` — різні речі.

• Higher-order function приймає або повертає функцію.

• `forEach()`, `map()`, `filter()`, `find()` та інші array methods використовують callbacks.

• Event handlers — це callbacks, які виконуються у відповідь на events.

• `setTimeout()` використовує callback для виконання коду пізніше.

• `setTimeout(..., 0)` не означає "виконати негайно".

• Event Loop допомагає JavaScript обробляти asynchronous callbacks.

• Error-first callback зазвичай має форму:

    callback(error, result);

• Callback Hell виникає через надмірну вкладеність asynchronous callbacks.

• Promises були створені, зокрема, для зручнішої роботи з asynchronous control flow.

• `async/await` робить Promise-based asynchronous code більш схожим на послідовний код.

Основна еволюція:

    Callback
       ↓
    Promise
       ↓
    async / await