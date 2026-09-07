## 05. Closures

Closure (замикання) — це механізм JavaScript, за якого функція зберігає доступ до змінних свого зовнішнього lexical scope навіть після завершення виконання цієї зовнішньої функції.

Простіше:

**Closure = функція + її lexical environment.**

Це означає, що внутрішня функція може "пам'ятати" змінні, які існували в момент її створення.

### Ключові поняття

✔ closure
✔ lexical scope
✔ lexical environment
✔ scope
✔ outer scope
✔ inner function
✔ nested function
✔ `return function`
✔ private variables
✔ data encapsulation
✔ state
✔ factory function
✔ callback
✔ function as value
✔ `let`
✔ `const`
✔ `var`
✔ loop + closure
✔ `this` і closure
✔ garbage collection

### Що потрібно пам'ятати

• Closure виникає, коли функція має доступ до змінних свого зовнішнього scope.

• Внутрішня функція може використовувати змінні зовнішньої функції.

• Closure дозволяє внутрішній функції зберігати доступ до цих змінних навіть після завершення зовнішньої функції.

• Closure пов'язаний із lexical scope.

• JavaScript визначає scope функції за місцем її створення, а не за місцем виклику.

• Кожен виклик функції створює нове execution context.

• Якщо функція повертається назовні та продовжує використовувати змінні зовнішнього scope, ці змінні залишаються доступними через closure.

• Closure часто використовується для:
  - private state
  - data encapsulation
  - factory functions
  - callbacks
  - event handlers
  - timers
  - function factories
  - memoization
  - partial application

• Closure не копіює змінні — функція зберігає доступ до lexical environment.

• Якщо замкнена змінна змінюється, closure бачить актуальне значення.

• Кожен новий виклик factory function може створити окремий незалежний closure.

• Closure може бути створений без `return` — достатньо, щоб функція зберігала доступ до зовнішнього scope.

---

### Scope

**Scope** — область видимості змінної.

JavaScript має кілька основних типів scope:

    Global Scope
        │
        ├── Function Scope
        │
        └── Block Scope

Наприклад:

    const globalValue = "global";

    function test() {
      const localValue = "local";

      console.log(globalValue);
      console.log(localValue);
    }

Функція має доступ до:

    local scope
        +
    outer scope

---

### Lexical Scope

**Lexical scope** означає, що доступність змінних визначається місцем, де код написаний.

Наприклад:

    const name = "John";

    function sayHello() {
      console.log(name);
    }

    sayHello();

Функція `sayHello()` бачить `name`, тому що `name` знаходиться у зовнішньому lexical scope.

---

### Scope Chain

Якщо JavaScript не знаходить змінну у поточному scope, він шукає її у зовнішньому scope.

Наприклад:

    const a = 10;

    function outer() {
      const b = 20;

      function inner() {
        const c = 30;

        console.log(a);
        console.log(b);
        console.log(c);
      }

      inner();
    }

Модель:

    inner scope
        │
        ├── c
        │
        ▼
    outer scope
        │
        ├── b
        │
        ▼
    global scope
        │
        └── a

Пошук змінної відбувається від внутрішнього scope до зовнішнього.

---

### Nested Function

Функція, оголошена всередині іншої функції, називається nested function.

    function outer() {
      const message = "Hello";

      function inner() {
        console.log(message);
      }

      inner();
    }

`inner()` має доступ до `message`.

---

### Простий Closure

    function outer() {
      const message = "Hello";

      function inner() {
        console.log(message);
      }

      return inner;
    }

    const greet = outer();

    greet();

Результат:

    Hello

Що відбулося:

    outer()
       │
       ├── message = "Hello"
       │
       └── inner()
              │
              └── використовує message

Після:

    const greet = outer();

`outer()` завершила виконання, але `greet()` все ще має доступ до `message`.

Це і є closure.

---

### Як утворюється Closure

Модель:

    function outer() {
      const value = 10;

      return function inner() {
        return value;
      };
    }

    const fn = outer();

    fn();

Послідовність:

    1. Викликається outer()
              ↓
    2. Створюється value
              ↓
    3. Створюється inner()
              ↓
    4. inner() повертається
              ↓
    5. outer() завершується
              ↓
    6. fn зберігає inner()
              ↓
    7. inner() все ще бачить value

---

### Closure — це не копія змінної

Важливо:

    function outer() {
      let count = 0;

      return function () {
        count++;
        return count;
      };
    }

    const counter = outer();

    console.log(counter());
    console.log(counter());
    console.log(counter());

Результат:

    1
    2
    3

`count` не копіюється для кожного виклику `counter()`.

Усі виклики працюють із тим самим замкненим state:

    counter
       │
       ▼
    closure
       │
       └── count = 0
              │
              ├── 1
              ├── 2
              └── 3

---

### Closure з let

    function createCounter() {
      let count = 0;

      return function () {
        count += 1;

        return count;
      };
    }

    const counter = createCounter();

    console.log(counter()); // 1
    console.log(counter()); // 2
    console.log(counter()); // 3

Closure дозволяє зберігати state між викликами функції.

---

### Незалежні Closures

Кожен виклик `createCounter()` створює окремий closure.

    function createCounter() {
      let count = 0;

      return function () {
        count++;

        return count;
      };
    }

    const counterA = createCounter();
    const counterB = createCounter();

    console.log(counterA()); // 1
    console.log(counterA()); // 2

    console.log(counterB()); // 1
    console.log(counterB()); // 2

Модель:

    counterA
       │
       └── closure A
              └── count = 2


    counterB
       │
       └── closure B
              └── count = 2

`counterA` та `counterB` не ділять одну змінну `count`.

---

### Private Variables

Closure дозволяє створювати змінні, які недоступні безпосередньо ззовні.

    function createUser() {
      let password = "secret";

      return {
        checkPassword(value) {
          return value === password;
        }
      };
    }

    const user = createUser();

    console.log(
      user.checkPassword("secret")
    );

Але:

    console.log(user.password);

Результат:

    undefined

`password` є private state на рівні closure.

---

### Data Encapsulation

Closure можна використовувати для encapsulation.

    function createBankAccount(initialBalance) {
      let balance = initialBalance;

      return {
        deposit(amount) {
          balance += amount;
        },

        getBalance() {
          return balance;
        }
      };
    }

    const account = createBankAccount(100);

    account.deposit(50);

    console.log(account.getBalance());

Результат:

    150

Зовні немає прямого доступу до:

    balance

Доступ здійснюється через методи.

---

### Closure як State

Closure часто використовується для зберігання state:

    function createCounter() {
      let count = 0;

      return {
        increment() {
          count++;
        },

        decrement() {
          count--;
        },

        getValue() {
          return count;
        }
      };
    }

    const counter = createCounter();

    counter.increment();
    counter.increment();

    console.log(counter.getValue());

Результат:

    2

---

### Factory Function

**Factory function** — функція, яка створює та повертає новий об'єкт або функцію.

Closure робить factory functions дуже корисними.

    function createCounter(start = 0) {
      let count = start;

      return {
        increment() {
          count++;
        },

        decrement() {
          count--;
        },

        getValue() {
          return count;
        }
      };
    }

Використання:

    const counter = createCounter(10);

    counter.increment();

    console.log(counter.getValue());

Результат:

    11

---

### Function Factory

Closure може створювати функції з різною поведінкою.

    function multiplyBy(number) {
      return function (value) {
        return value * number;
      };
    }

    const double = multiplyBy(2);
    const triple = multiplyBy(3);

    console.log(double(5));
    console.log(triple(5));

Результат:

    10
    15

Модель:

    multiplyBy(2)
        │
        └── closure
              └── number = 2


    multiplyBy(3)
        │
        └── closure
              └── number = 3

---

### Closure і Callbacks

Callbacks часто використовують closure.

    function createLogger(prefix) {
      return function (message) {
        console.log(`[${prefix}] ${message}`);
      };
    }

    const info = createLogger("INFO");
    const error = createLogger("ERROR");

    info("Server started");
    error("Something went wrong");

Результат:

    [INFO] Server started
    [ERROR] Something went wrong

Кожна функція пам'ятає свій `prefix`.

---

### Closure і setTimeout

Closure часто зустрічається у timers.

    function greetLater(name) {
      setTimeout(() => {
        console.log(`Hello, ${name}`);
      }, 1000);
    }

    greetLater("John");

Callback всередині `setTimeout()` має доступ до `name`.

Модель:

    greetLater("John")
          │
          ├── name = "John"
          │
          └── setTimeout()
                  │
                  └── callback
                        │
                        └── name

Навіть після завершення `greetLater()` callback може використати `name`.

---

### Closure і Event Listener

Closure часто використовується в event handlers.

    function setupButton(button) {
      let clicks = 0;

      button.addEventListener("click", () => {
        clicks++;

        console.log(`Clicks: ${clicks}`);
      });
    }

Callback зберігає доступ до:

    clicks

Це closure.

---

### Closure і DOM

Наприклад:

    function setupCounter(button, output) {
      let count = 0;

      button.addEventListener("click", () => {
        count++;

        output.textContent = count;
      });
    }

Тут `click` callback має доступ до:

    count
    button
    output

---

### Closure і for loop

Одна з важливих тем — closures у циклах.

З `var`:

    for (var i = 0; i < 3; i++) {
      setTimeout(() => {
        console.log(i);
      }, 100);
    }

Результат:

    3
    3
    3

Причина:

`var` має function scope, а не block scope.

Усі callbacks використовують одну змінну `i`.

---

### Closure і let у циклі

З `let`:

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        console.log(i);
      }, 100);
    }

Результат:

    0
    1
    2

`let` створює окреме binding для кожної ітерації циклу.

---

### Closure і var

Щоб отримати правильну поведінку з `var`, раніше використовували IIFE:

    for (var i = 0; i < 3; i++) {
      (function (index) {
        setTimeout(() => {
          console.log(index);
        }, 100);
      })(i);
    }

Результат:

    0
    1
    2

Сьогодні для таких випадків зазвичай використовують `let`.

---

### Closure і параметри функції

Параметри функції також можуть бути замкнені.

    function createGreeting(name) {
      return function () {
        return `Hello, ${name}!`;
      };
    }

    const greetJohn = createGreeting("John");

    console.log(greetJohn());

`name` доступний через closure.

---

### Closure і об'єкти

Closure може зберігати reference на object.

    function createUser(name) {
      const user = {
        name
      };

      return function () {
        return user.name;
      };
    }

    const getName = createUser("John");

    console.log(getName());

Функція зберігає доступ до `user`.

---

### Closure і масиви

    function createList() {
      const items = [];

      return {
        add(item) {
          items.push(item);
        },

        getAll() {
          return [...items];
        }
      };
    }

    const list = createList();

    list.add("JavaScript");
    list.add("Node.js");

    console.log(list.getAll());

Масив `items` захищений closure.

---

### Closure і memoization

Closure можна використовувати для кешування результатів функції.

    function memoize(fn) {
      const cache = new Map();

      return function (value) {
        if (cache.has(value)) {
          return cache.get(value);
        }

        const result = fn(value);

        cache.set(value, result);

        return result;
      };
    }

Приклад:

    function square(number) {
      console.log("Calculating...");

      return number * number;
    }

    const memoizedSquare = memoize(square);

    console.log(memoizedSquare(5));
    console.log(memoizedSquare(5));

Другий виклик може отримати результат із `cache`.

`cache` зберігається через closure.

---

### Closure і приватний cache

Модель:

    memoize()
       │
       ├── cache
       │
       └── returned function
              │
              └── використовує cache

Зовні:

    cache

недоступний напряму.

---

### Closure і часткове застосування

Closure можна використовувати для partial application.

    function add(a) {
      return function (b) {
        return a + b;
      };
    }

    const add10 = add(10);

    console.log(add10(5));
    console.log(add10(20));

Результат:

    15
    30

`add10` пам'ятає:

    a = 10

---

### Closure та this

Closure і `this` — це різні механізми.

Closure визначає доступ до змінних lexical scope.

`this` визначається правилами виклику функції.

Наприклад:

    const user = {
      name: "John",

      greet() {
        const message = "Hello";

        const inner = () => {
          console.log(this.name);
          console.log(message);
        };

        inner();
      }
    };

Тут:

    message

доступний через closure.

А:

    this

пов'язаний із lexical `this` arrow function.

Важливо:

**Closure ≠ `this`.**

---

### Closure та Arrow Function

Arrow function часто використовується з closures.

    function outer() {
      const value = 10;

      return () => {
        return value;
      };
    }

    const getValue = outer();

    console.log(getValue());

Але closure не залежить виключно від arrow functions.

Звичайна function також може створювати closure:

    function outer() {
      const value = 10;

      return function () {
        return value;
      };
    }

---

### Closure і Garbage Collection

JavaScript має garbage collector.

Якщо об'єкт або змінна більше не доступні з програми, пам'ять може бути звільнена.

Але якщо returned function продовжує посилатися на closure, необхідні дані повинні залишатися доступними.

    function outer() {
      const largeData = "...";

      return function () {
        console.log(largeData);
      };
    }

    const fn = outer();

Поки `fn` доступна і використовує closure, `largeData` може залишатися доступною.

Коли:

    fn = null;

і більше немає references на відповідні дані, garbage collector зможе звільнити пам'ять, якщо інші references відсутні.

---

### Closure може зберігати state

Це одна з найважливіших ідей:

    Function
       +
    External Variables
       =
    Closure

Closure дозволяє функції мати "пам'ять".

Наприклад:

    function createCounter() {
      let count = 0;

      return () => ++count;
    }

    const counter = createCounter();

    counter(); // 1
    counter(); // 2
    counter(); // 3

Функція пам'ятає попередній state.

---

### Closure у реальному JavaScript

Closures зустрічаються дуже часто:

✔ event listeners

    button.addEventListener("click", () => {
      ...
    });

✔ timers

    setTimeout(() => {
      ...
    }, 1000);

✔ callbacks

    items.map(item => {
      ...
    });

✔ factory functions

    createCounter()

✔ private state

    createBankAccount()

✔ memoization

    memoize()

✔ function factories

    multiplyBy()

✔ modules

    createModule()

✔ asynchronous code

    fetch(...).then(() => {
      ...
    });

---

### Closure та Modules

Closure є однією з основ для module pattern.

    const counter = (() => {
      let count = 0;

      return {
        increment() {
          count++;
        },

        getValue() {
          return count;
        }
      };
    })();

    counter.increment();

    console.log(counter.getValue());

Зовнішній код не має прямого доступу до:

    count

---

### Closure vs Global Variable

Без closure:

    let count = 0;

    function increment() {
      count++;
    }

    increment();

Проблема:

    count

доступний у ширшому scope.

З closure:

    function createCounter() {
      let count = 0;

      return function () {
        count++;
        return count;
      };
    }

    const counter = createCounter();

Тепер `count` прихований всередині closure.

---

### Closure vs Class

Closure може використовуватися для private state:

    function createCounter() {
      let count = 0;

      return {
        increment() {
          count++;
        },

        getValue() {
          return count;
        }
      };
    }

Подібну задачу можна вирішувати через `class`.

Closure:

    private state
        ↓
    lexical scope
        ↓
    methods

Class:

    object
        ↓
    private fields / methods

Обидва підходи можуть використовуватися для encapsulation.

---

### Типові помилки

❌ Вважати closure окремим типом функції.

Closure — це не окремий тип функції.

❌ Вважати, що closure створюється тільки через `return`.

Closure може виникнути і без `return`.

❌ Вважати, що closure копіює змінну.

Closure зберігає доступ до lexical environment.

❌ Плутати closure та scope.

Scope визначає доступність змінних.

Closure — це механізм, завдяки якому функція може зберігати доступ до зовнішнього scope.

❌ Плутати closure та `this`.

Це різні механізми.

❌ Забувати про `var` у циклах.

`var` має function scope.

❌ Вважати, що всі closures використовують одну спільну змінну.

Кожен виклик factory function може створювати окремий closure.

❌ Створювати великі closures без потреби.

Closure може утримувати references на дані довше, ніж потрібно.

❌ Зберігати великі об'єкти у довгоживучих closures без необхідності.

Це може сприяти зайвому використанню пам'яті.

---

### Питання зі співбесіди

Що таке closure?

Як утворюється closure?

Що таке lexical scope?

Що таке scope chain?

Чим closure відрізняється від scope?

Чому функція може використовувати змінну після завершення зовнішньої функції?

Чи копіює closure зовнішні змінні?

Як closure може зберігати state?

Як створити private variable за допомогою closure?

Що таке factory function?

Як closure використовується у callbacks?

Як closure працює з `setTimeout()`?

Як closure працює з event listeners?

Чому `var` та `let` поводяться по-різному в циклах?

Що таке function factory?

Як closure використовується для memoization?

Що таке data encapsulation?

Чим closure відрізняється від `this`?

Як closure пов'язаний із garbage collection?

Чи створюється closure кожного разу при виклику функції?

---

### Шлях

🟢 **Core (обов'язково знати)**

Що таке scope.

Що таке lexical scope.

Що таке outer scope.

Що таке nested function.

Що таке closure.

Як функція отримує доступ до зовнішніх змінних.

Як closure зберігає доступ до state.

Розуміти `return function`.

Розуміти простий counter через closure.

Розуміти різницю між scope та closure.

---

🔵 **Junior**

Closures у callbacks.

Closures у `setTimeout()`.

Closures у event listeners.

Closures у циклах.

Різниця `var` та `let` у циклах.

Private variables.

Data encapsulation.

Factory functions.

Function factories.

Closure + `async / await`.

Closure + Promises.

Closure + DOM.

---

🟠 **Middle**

Memoization через closure.

Private state.

Module pattern.

Partial application.

Function composition.

Closure у reusable utilities.

Memory management.

Garbage collection та closures.

Аналіз lifecycle closure.

Race conditions у замкненому state.

Closure у складних asynchronous flows.

---

🔴 **Senior**

Closure та memory management.

Long-lived closures.

Memory leaks.

Closure у event-driven architecture.

Closure у framework internals.

Functional programming patterns.

Advanced memoization.

Lazy evaluation.

Currying.

Partial application.

State management architecture.

Trade-offs між closure, class та module.

Оптимізація довгоживучих closures.

---

### Міні-шпаргалка

Scope:

    Global Scope
         │
         ▼
    Outer Scope
         │
         ▼
    Inner Scope

---

Scope Chain:

    inner
      │
      ▼
    outer
      │
      ▼
    global

JavaScript шукає змінну від поточного scope до зовнішніх scopes.

---

Closure:

    function outer() {
      const value = 10;

      return function inner() {
        return value;
      };
    }

    const fn = outer();

    fn(); // 10

Модель:

    fn
     │
     ▼
    inner()
     │
     ▼
    closure
     │
     └── value = 10

---

Counter:

    function createCounter() {
      let count = 0;

      return function () {
        count++;

        return count;
      };
    }

    const counter = createCounter();

    counter(); // 1
    counter(); // 2
    counter(); // 3

---

Private state:

    function createAccount() {
      let balance = 0;

      return {
        deposit(amount) {
          balance += amount;
        },

        getBalance() {
          return balance;
        }
      };
    }

---

Factory:

    function multiplyBy(number) {
      return value => value * number;
    }

    const double = multiplyBy(2);
    const triple = multiplyBy(3);

    double(5); // 10
    triple(5); // 15

---

Closure + timer:

    function greetLater(name) {
      setTimeout(() => {
        console.log(name);
      }, 1000);
    }

---

Closure + event:

    function setup(button) {
      let count = 0;

      button.addEventListener("click", () => {
        count++;
      });
    }

---

`var` vs `let`:

    for (var i = 0; i < 3; i++) {
      setTimeout(() => console.log(i), 100);
    }

    // 3
    // 3
    // 3

    for (let i = 0; i < 3; i++) {
      setTimeout(() => console.log(i), 100);
    }

    // 0
    // 1
    // 2

---

Closure vs scope:

    Scope
    ↓
    визначає, де змінна доступна.

    Closure
    ↓
    дозволяє функції зберігати доступ
    до зовнішнього lexical scope.

---

Closure vs this:

    Closure
    ↓
    lexical environment

    this
    ↓
    context of function call

---

### Головне:

• Closure — це функція разом із lexical environment, до якого вона має доступ.

• Closure дозволяє функції "пам'ятати" змінні зовнішнього scope.

• Closure базується на lexical scope.

• Внутрішня функція може використовувати змінні зовнішньої функції.

• Closure може продовжувати існувати після завершення зовнішньої функції.

• Closure дозволяє зберігати state між викликами.

• Closure можна використовувати для створення private variables.

• Closure є основою багатьох factory functions.

• Callbacks та event handlers дуже часто використовують closures.

• `setTimeout()` callbacks можуть використовувати змінні через closure.

• `let` і `const` мають block scope, а `var` — function scope.

• Closure не копіює змінну — він зберігає доступ до lexical environment.

• Кожен виклик factory function може створювати незалежний closure.

• Closure та `this` — різні механізми.

• Closure широко використовується у функціональному програмуванні, callbacks, modules, memoization та state management.

• Найпростіша модель для запам'ятовування:

    Function
       +
    Outer Scope
       ↓
    Closure
       ↓
    Remembered State

• Ключова ідея:

    function createCounter() {
      let count = 0;

      return () => ++count;
    }

    const counter = createCounter();

    counter(); // 1
    counter(); // 2
    counter(); // 3

**Closure дозволяє функції мати доступ до зовнішнього state навіть після завершення виконання зовнішньої функції.**