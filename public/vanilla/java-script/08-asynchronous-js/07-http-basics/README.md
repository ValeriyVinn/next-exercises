## 06. Promisification

Promisification (перетворення callback-based API у Promise-based API) — це техніка перетворення функції, яка працює через callbacks, у функцію, яка повертає `Promise`.

Це дозволяє використовувати старий callback-based код разом із сучасним:

    Promise
    async / await
    try / catch
    Promise.all()

Наприклад, callback-based API:

    function getData(callback) {
      setTimeout(() => {
        callback(null, "Data");
      }, 1000);
    }

Після promisification:

    function getDataAsync() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("Data");
        }, 1000);
      });
    }

Тепер можна використовувати:

    const data = await getDataAsync();

### Ключові поняття

✔ promisification
✔ callback-based API
✔ Promise-based API
✔ callback
✔ `Promise`
✔ `resolve`
✔ `reject`
✔ `async / await`
✔ `try / catch`
✔ success callback
✔ error callback
✔ error-first callback
✔ callback hell
✔ wrapper function
✔ Promise wrapper
✔ Node.js callback convention
✔ `util.promisify()`
✔ `this` context
✔ multiple callback arguments

### Що потрібно пам'ятати

• Promisification — це перетворення callback-based функції на Promise-based функцію.

• Основна ідея:

    callback API
         ↓
    Promise wrapper
         ↓
    Promise API

• Promise-based функцію можна використовувати через `.then()` / `.catch()`.

• Promise-based функцію можна використовувати через `async / await`.

• Успішний callback зазвичай перетворюється на:

    resolve(value)

• Callback з помилкою перетворюється на:

    reject(error)

• Найчастіше promisification використовується для старих callback-based APIs.

• Node.js традиційно використовує error-first callback pattern:

    callback(error, result)

• `util.promisify()` у Node.js дозволяє автоматично перетворювати багато callback-based функцій у Promise-based.

• Не кожну callback-функцію можна безпосередньо передати в `util.promisify()` — вона повинна відповідати очікуваному callback convention.

• Promisification не робить синхронну функцію асинхронною магічним способом.

• Promisification змінює спосіб отримання результату: callback → Promise.

• Promise повинен бути settled лише один раз:

    resolve(...)
    або
    reject(...)

• Якщо callback може викликатися багато разів, простий Promise wrapper може бути неправильним рішенням.

---

### Callback-based API

Callback-based API передає функцію, яка буде викликана після завершення операції.

Наприклад:

    function getData(callback) {
      setTimeout(() => {
        callback("Hello");
      }, 1000);
    }

Використання:

    getData(data => {
      console.log(data);
    });

Модель:

    getData()
       │
       │ callback
       ▼
    result

---

### Error-first Callback

У Node.js поширений pattern:

    callback(error, result)

Наприклад:

    function getData(callback) {
      setTimeout(() => {
        const success = true;

        if (success) {
          callback(null, "Data");
        } else {
          callback(new Error("Failed"));
        }
      }, 1000);
    }

Використання:

    getData((error, data) => {
      if (error) {
        console.error(error);

        return;
      }

      console.log(data);
    });

Модель:

    callback(error, result)

Успіх:

    callback(null, result)

Помилка:

    callback(error)

---

### Що таке Promisification

Promisification бере callback-based function:

    function getData(callback) {
      ...
    }

і створює Promise-based function:

    function getDataAsync() {
      return new Promise((resolve, reject) => {
        ...
      });
    }

Тепер:

    getDataAsync()
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });

Або:

    try {
      const data = await getDataAsync();

      console.log(data);
    } catch (error) {
      console.error(error);
    }

---

### Найпростіший Promise Wrapper

Callback:

    function getData(callback) {
      setTimeout(() => {
        callback(null, "Data");
      }, 1000);
    }

Promisification:

    function getDataAsync() {
      return new Promise((resolve, reject) => {
        getData((error, data) => {
          if (error) {
            reject(error);

            return;
          }

          resolve(data);
        });
      });
    }

Використання:

    const data = await getDataAsync();

---

### Promise Wrapper

Загальна модель:

    function promisifiedFunction() {
      return new Promise((resolve, reject) => {

        callbackBasedFunction((error, result) => {

          if (error) {
            reject(error);

            return;
          }

          resolve(result);
        });

      });
    }

---

### Promisification через `.then()`

Після створення Promise wrapper:

    getDataAsync()
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });

---

### Promisification через async / await

Найзручніший варіант:

    async function main() {
      try {
        const data = await getDataAsync();

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    main();

---

### Callback API → Promise API

Стара API:

    readFile(path, callback)

Promise API:

    readFileAsync(path)

Модель:

    Callback API
        │
        │ promisification
        ▼
    Promise API
        │
        ├── .then()
        ├── .catch()
        └── async / await

---

### Навіщо потрібна Promisification

Promisification особливо корисна, коли:

✔ є старий callback-based API

✔ потрібно використовувати `async / await`

✔ потрібно використовувати `Promise.all()`

✔ потрібно використовувати `Promise.race()`

✔ потрібно централізовано обробляти помилки

✔ callback code стає складним

✔ потрібно інтегрувати legacy code із сучасним JavaScript

---

### Callback Hell

Callback-based код може ставати складним:

    getUser(userId, (error, user) => {
      if (error) {
        return handleError(error);
      }

      getOrders(user.id, (error, orders) => {
        if (error) {
          return handleError(error);
        }

        getProducts(orders, (error, products) => {
          if (error) {
            return handleError(error);
          }

          console.log(products);
        });
      });
    });

Модель:

    getUser()
       │
       ▼
    getOrders()
       │
       ▼
    getProducts()
       │
       ▼
    result

При великій кількості операцій код може ставати важким для читання.

---

### Після Promisification

Після перетворення:

    const user = await getUserAsync(userId);

    const orders = await getOrdersAsync(user.id);

    const products = await getProductsAsync(orders);

Код стає лінійнішим.

Модель:

    getUserAsync()
         ↓
    getOrdersAsync()
         ↓
    getProductsAsync()
         ↓
    result

---

### Error Handling

Callback:

    getData((error, data) => {
      if (error) {
        ...
      }
    });

Promise:

    getDataAsync()
      .catch(error => {
        ...
      });

Async / await:

    try {
      const data = await getDataAsync();
    } catch (error) {
      ...
    }

---

### Promisification з error-first callback

Наприклад:

    function divide(a, b, callback) {
      if (b === 0) {
        callback(new Error("Division by zero"));

        return;
      }

      callback(null, a / b);
    }

Promisified version:

    function divideAsync(a, b) {
      return new Promise((resolve, reject) => {
        divide(a, b, (error, result) => {
          if (error) {
            reject(error);

            return;
          }

          resolve(result);
        });
      });
    }

Використання:

    try {
      const result = await divideAsync(10, 2);

      console.log(result);
    } catch (error) {
      console.error(error);
    }

---

### Promisification з setTimeout

Callback API:

    function delay(ms, callback) {
      setTimeout(() => {
        callback(null);
      }, ms);
    }

Promisified:

    function delayAsync(ms) {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    }

Використання:

    await delayAsync(1000);

    console.log("Done");

---

### Promisification і Promise

Важливо розуміти різницю:

    callback-based function
    ↓
    передає результат у callback

    Promise-based function
    ↓
    повертає Promise

Наприклад:

    getData(callback);

Проти:

    const promise = getDataAsync();

---

### Promisification і async / await

`async / await` не замінює Promisification.

Навпаки:

    callback API
         ↓
    promisification
         ↓
    Promise API
         ↓
    async / await

Тобто:

**Promisification робить callback API сумісним із Promise-based code.**

---

### util.promisify()

Node.js має вбудований helper:

    util.promisify()

Він дозволяє перетворювати функції з Node.js callback style у Promise-based functions.

Імпорт:

    const { promisify } = require("node:util");

Або ES Modules:

    import { promisify } from "node:util";

---

### Приклад util.promisify()

Callback-based function:

    function add(a, b, callback) {
      setTimeout(() => {
        callback(null, a + b);
      }, 100);
    }

Promisify:

    const addAsync = promisify(add);

Тепер:

    const result = await addAsync(2, 3);

    console.log(result);

Результат:

    5

---

### Як працює util.promisify()

Умовно:

    promisify(callbackFunction)
            │
            ▼
    Promise-returning function

Наприклад:

    const addAsync = promisify(add);

Виклик:

    addAsync(2, 3)

повертає:

    Promise

---

### util.promisify() та error-first callback

`util.promisify()` очікує типовий Node.js callback:

    callback(error, result)

Наприклад:

    function getUser(id, callback) {
      ...
      callback(null, user);
    }

Після:

    const getUserAsync = promisify(getUser);

Можна:

    const user = await getUserAsync(5);

---

### Promisify Node.js API

Багато старих Node.js APIs мають callback-based versions.

Наприклад, умовно:

    fs.readFile(path, callback)

Через `promisify`:

    const { promisify } = require("node:util");
    const fs = require("node:fs");

    const readFileAsync = promisify(fs.readFile);

    const data = await readFileAsync(
      "file.txt",
      "utf8"
    );

У сучасному Node.js багато APIs вже мають готові Promise-based versions, тому ручний `promisify()` потрібен не завжди.

---

### Promise-based Node.js APIs

Якщо бібліотека вже має Promise API, краще використовувати його без додаткової promisification.

Наприклад:

    const fs = require("node:fs/promises");

    const data = await fs.readFile(
      "file.txt",
      "utf8"
    );

Тут Promise вже повертається без `promisify()`.

---

### Ручна Promisification vs util.promisify()

Ручна:

    function getDataAsync() {
      return new Promise((resolve, reject) => {
        getData((error, data) => {
          if (error) {
            reject(error);

            return;
          }

          resolve(data);
        });
      });
    }

Автоматична:

    const getDataAsync = promisify(getData);

Ручний варіант потрібен, коли callback API має нестандартну поведінку.

---

### Callback з декількома результатами

Не всі callback APIs повертають тільки один result.

Наприклад:

    callback(null, value1, value2);

Звичайний Promise може передати тільки одне значення через `resolve()`.

Тому потрібно створити object або array:

    resolve({
      value1,
      value2
    });

Або:

    resolve([
      value1,
      value2
    ]);

Наприклад:

    function getData(callback) {
      callback(null, "John", 30);
    }

Promisified:

    function getDataAsync() {
      return new Promise((resolve, reject) => {
        getData((error, name, age) => {
          if (error) {
            reject(error);

            return;
          }

          resolve({
            name,
            age
          });
        });
      });
    }

Використання:

    const { name, age } = await getDataAsync();

---

### Callback, який викликається багато разів

Це важливе обмеження.

Наприклад:

    function onData(callback) {
      callback("first");
      callback("second");
      callback("third");
    }

Не можна просто очікувати, що Promise збере всі значення:

    new Promise(resolve => {
      onData(data => {
        resolve(data);
      });
    });

Promise буде fulfilled після першого:

    resolve("first");

Наступні виклики:

    resolve("second");
    resolve("third");

вже не змінять результат Promise.

Якщо API повертає багато значень протягом часу, потрібно використовувати інший механізм, наприклад:

    EventEmitter
    AsyncIterator
    Stream

---

### Promise settle only once

Promise може перейти у фінальний стан лише один раз:

    pending
       │
       ├── resolve() → fulfilled
       │
       └── reject()  → rejected

Після цього:

    resolve()
    reject()

не змінять його стан.

---

### Promisification і EventEmitter

Не кожен callback API потрібно promisify.

Наприклад, event-based API:

    emitter.on("data", handler);

може генерувати багато подій.

Promise підходить для операції:

    one operation
         ↓
    one result

EventEmitter підходить для:

    one source
         ↓
    many events

---

### Promisification та synchronous callback

Promisification зазвичай використовується для asynchronous APIs.

Якщо функція синхронна:

    function add(a, b) {
      return a + b;
    }

Немає сенсу робити:

    function addAsync(a, b) {
      return Promise.resolve(add(a, b));
    }

без конкретної причини.

Це лише змінить API, але не зробить саму операцію корисно асинхронною.

---

### Promisification і `this`

При promisification важливо враховувати context.

Наприклад:

    const object = {
      value: 10,

      getValue(callback) {
        callback(null, this.value);
      }
    };

Якщо передати метод окремо:

    const getValueAsync = promisify(
      object.getValue
    );

можна втратити необхідний `this`.

Потрібно зберегти context:

    const getValueAsync = promisify(
      object.getValue.bind(object)
    );

Тепер:

    const value = await getValueAsync();

---

### Promisification wrapper

Хороший wrapper:

    function promisifyOperation() {
      return new Promise((resolve, reject) => {
        originalOperation((error, result) => {
          if (error) {
            reject(error);

            return;
          }

          resolve(result);
        });
      });
    }

Модель:

    Original API
         │
         │ callback
         ▼
    Promise Wrapper
         │
         ├── error → reject()
         │
         └── result → resolve()
         │
         ▼
       Promise

---

### Типові помилки

❌ Забути `return new Promise(...)`.

Неправильно:

    function getDataAsync() {
      new Promise((resolve, reject) => {
        ...
      });
    }

Правильно:

    function getDataAsync() {
      return new Promise((resolve, reject) => {
        ...
      });
    }

❌ Забути `reject()` для callback error.

❌ Викликати `resolve()` до обробки error.

❌ Викликати `resolve()` та `reject()` без розуміння callback convention.

❌ Використовувати `util.promisify()` для callback API, яке не відповідає error-first convention.

❌ Promisify callback, який викликається багато разів.

❌ Вважати, що promisification автоматично робить синхронну функцію асинхронною.

❌ Використовувати promisification для API, яке вже має Promise version.

❌ Втратити `this` при promisification object method.

❌ Вважати, що Promise може повернути декілька окремих результатів через `resolve()`.

❌ Плутати Promisification з `async / await`.

---

### Питання зі співбесіди

Що таке promisification?

Навіщо потрібна promisification?

Що таке callback-based API?

Що таке Promise-based API?

Що таке error-first callback?

Як перетворити callback API на Promise?

Що робить `resolve()`?

Що робить `reject()`?

Чому `fetch()` не потребує promisification?

Чим promisification відрізняється від `async / await`?

Що таке `util.promisify()`?

Який callback pattern очікує `util.promisify()`?

Чи можна promisify будь-яку callback function?

Що відбудеться, якщо callback викликається декілька разів?

Що відбудеться, якщо `resolve()` викликати декілька разів?

Як promisify function, яка повертає декілька результатів?

Чому може виникнути проблема з `this` при promisification?

Коли не потрібно використовувати promisification?

Яка різниця між `fs` та `fs/promises` у Node.js?

---

### Шлях

🟢 **Core (обов'язково знати)**

Що таке callback-based API.

Що таке Promise-based API.

Що таке promisification.

Як callback API перетворити на Promise.

`resolve()`.

`reject()`.

Error-first callback.

`new Promise()`.

Promisification через wrapper.

Promisification + `async / await`.

Promisification + `try / catch`.

Розуміти, що Promise settle відбувається один раз.

---

🔵 **Junior**

Node.js error-first callback pattern.

Callback hell.

Ручна promisification.

`util.promisify()`.

Promisification старих Node.js APIs.

Promise chaining після promisification.

Parallel operations через `Promise.all()`.

Обробка errors.

Розуміння `this` при promisification.

Різниця між callback API та Promise API.

---

🟠 **Middle**

Створення reusable promisify wrapper.

Promisification нестандартних callback APIs.

Callbacks з декількома результатами.

API, які викликають callback багато разів.

EventEmitter vs Promise.

Streams vs Promise.

Preserving `this`.

Error propagation.

Cancellation considerations.

Retry logic після promisification.

Адаптація legacy APIs до modern Promise-based architecture.

---

🔴 **Senior**

Designing Promise adapters.

Legacy API migration.

Callback-to-Promise compatibility layers.

Async architecture.

Error propagation architecture.

Cancellation architecture.

Resource lifecycle.

Backpressure.

Streams та Async Iterators.

Event-driven vs Promise-based architecture.

API migration strategies.

Performance trade-offs.

Memory management.

Designing reliable adapters для legacy systems.

---

### Міні-шпаргалка

Callback:

    function getData(callback) {
      callback(null, "Data");
    }

Використання:

    getData((error, data) => {
      if (error) {
        console.error(error);

        return;
      }

      console.log(data);
    });

---

Promisification:

    function getDataAsync() {
      return new Promise((resolve, reject) => {
        getData((error, data) => {
          if (error) {
            reject(error);

            return;
          }

          resolve(data);
        });
      });
    }

---

Promise:

    getDataAsync()
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });

---

Async / await:

    try {
      const data = await getDataAsync();

      console.log(data);
    } catch (error) {
      console.error(error);
    }

---

Error-first callback:

    callback(error, result)

Успіх:

    callback(null, result)

Помилка:

    callback(error)

---

Основна схема:

    Callback API
         │
         │ promisification
         ▼
    Promise API
         │
         ├── .then()
         ├── .catch()
         └── async / await

---

Ручний wrapper:

    function asyncOperation() {
      return new Promise((resolve, reject) => {
        operation((error, result) => {
          if (error) {
            reject(error);

            return;
          }

          resolve(result);
        });
      });
    }

---

`util.promisify()`:

    const { promisify } = require("node:util");

    const asyncOperation =
      promisify(operation);

    const result = await asyncOperation();

---

Promise lifecycle:

    pending
       │
       ├── resolve()
       │      ↓
       │   fulfilled
       │
       └── reject()
              ↓
           rejected

---

Один Promise → один фінальний результат:

    resolve(value1)
         ↓
      fulfilled

    resolve(value2)
         ↓
      ignored

---

Один результат:

    callback(error, result)
                       │
                       ▼
                    resolve()

Декілька результатів:

    callback(error, value1, value2)
                       │
                       ▼
                  resolve({
                    value1,
                    value2
                  })

---

Не кожен callback API потрібно promisify:

    One result
        ↓
    Promise

    Many events
        ↓
    EventEmitter / Stream / AsyncIterator

---

### Головне:

• Promisification — перетворення callback-based API у Promise-based API.

• Callback API передає результат через callback.

• Promise API повертає `Promise`.

• Типовий Node.js callback має форму:

    callback(error, result)

• Успішний результат перетворюється на:

    resolve(result)

• Помилка перетворюється на:

    reject(error)

• Основний інструмент ручної promisification:

    new Promise((resolve, reject) => {
      ...
    });

• `async / await` працює поверх Promise API.

• Promisification і `async / await` — не одне й те саме:

    callback API
         ↓
    promisification
         ↓
    Promise API
         ↓
    async / await

• `util.promisify()` дозволяє автоматично адаптувати багато Node.js callback APIs.

• `util.promisify()` зазвичай очікує error-first callback.

• Promise може перейти у фінальний стан лише один раз.

• Callback, який викликається багато разів, не можна просто перетворити на Promise і очікувати отримання всіх значень.

• API, яке вже має Promise version, зазвичай не потрібно promisify.

• При promisification object methods потрібно враховувати `this`.

• Promisification особливо важлива для роботи з legacy callback-based code.

• Основна ідея:

    Callback
       ↓
    Adapter / Promisification
       ↓
    Promise
       ↓
    async / await
       ↓
    readable modern JavaScript