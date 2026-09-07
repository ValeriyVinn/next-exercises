# 07. Closures

Closure — це механізм JavaScript, завдяки якому функція зберігає доступ до variables свого lexical scope, навіть після того, як зовнішня функція завершила виконання.

Простіше:

    Closure → функція пам'ятає своє оточення

Наприклад:

    function outer() {
        const message = "Hello";

        function inner() {
            console.log(message);
        }

        return inner;
    }

    const greet = outer();

    greet();
    // Hello

Після завершення `outer()` змінна `message` все одно доступна для `inner()`.

Це і є основна ідея closure.

---

# Ключові поняття

✔ closure  
✔ lexical scope  
✔ lexical environment  
✔ outer scope  
✔ inner scope  
✔ scope chain  
✔ function  
✔ nested function  
✔ free variable  
✔ captured variable  
✔ captured environment  
✔ environment reference  
✔ persistent state  
✔ private state  
✔ factory function  
✔ callback  
✔ higher-order function  
✔ IIFE  
✔ module pattern  
✔ encapsulation  
✔ data privacy  
✔ garbage collection  
✔ memory  
✔ closure у циклах  
✔ `var` та closure  
✔ `let` та closure  
✔ closure у asynchronous code  
✔ closure у event handlers  
✔ closure у React  
✔ closure у JavaScript modules  

---

# Що потрібно пам'ятати

• Closure пов'язаний із lexical scope.

• Closure виникає тоді, коли функція зберігає доступ до свого outer lexical environment.

• Функція бачить variables відповідно до місця, де вона була створена, а не відповідно до місця, звідки її викликали.

• Inner function може отримувати доступ до outer variables.

• Outer function може завершити виконання, але її environment може залишатися доступним через closure.

• Closure дозволяє створювати private state.

• Closure часто використовується у:

    callbacks
    event handlers
    timers
    asynchronous code
    function factories
    modules
    React components
    memoization
    currying

• Closure не є окремим типом функції.

• Будь-яка функція JavaScript має доступ до свого lexical environment.

• Closure особливо помітний тоді, коли функція використовується поза scope, у якому була створена.

---

# Базова ідея Closure

Розглянемо:

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

Послідовність:

    outer()
        ↓
    створюється message
        ↓
    створюється inner()
        ↓
    inner() повертається
        ↓
    outer() завершується
        ↓
    greet зберігає inner()
        ↓
    inner() все ще бачить message

Тобто:

    greet
      ↓
    inner function
      ↓
    lexical environment
      ↓
    message

---

# Closure — це не "пам'ять функції"

Не варто думати:

    "Функція запам'ятовує всі змінні"

Правильніше:

    function
        ↓
    має lexical environment
        ↓
    має доступ до outer environment
        ↓
    потрібні bindings можуть залишатися доступними

JavaScript engine зберігає необхідне environment, поки воно ще потрібне.

---

# Lexical Scope

Closure неможливо нормально зрозуміти без lexical scope.

Наприклад:

    const name = "John";

    function greet() {
        console.log(name);
    }

`greet()` бачить `name`, тому що була створена в lexical environment, де `name` доступна.

Lexical scope визначається:

    де функція написана

а не:

    звідки функція викликана

---

# Closure та Lexical Scope

Наприклад:

    const value = "global";

    function outer() {

        const value = "outer";

        function inner() {
            console.log(value);
        }

        return inner;
    }

    const fn = outer();

    fn();

Результат:

    outer

`inner()` використовує `value` з lexical environment `outer()`.

---

# Function Creation

Коли JavaScript створює функцію, функція має зв'язок зі своїм lexical environment.

Спрощено:

    function inner() {
        console.log(value);
    }

можна уявляти як:

    inner function
        │
        └── lexical environment reference
                    │
                    ↓
              outer environment

Саме цей зв'язок є основою closure behavior.

---

# Closure та Scope Chain

Наприклад:

    const a = "global";

    function outer() {

        const b = "outer";

        function inner() {

            const c = "inner";

            console.log(c);
            console.log(b);
            console.log(a);
        }

        return inner;
    }

    const fn = outer();

    fn();

Пошук:

    c
    ↓
    inner scope

    b
    ↓
    inner scope
    ↓
    outer scope

    a
    ↓
    inner scope
    ↓
    outer scope
    ↓
    global scope

Closure використовує той самий lexical scope chain.

---

# Captured Variable

Captured variable — variable з outer scope, до якої продовжує мати доступ внутрішня функція.

Наприклад:

    function createCounter() {

        let count = 0;

        return function () {
            count++;
            return count;
        };
    }

Тут:

    count

є captured variable.

Внутрішня функція захоплює доступ до `count`.

---

# Free Variable

Для функції variable є free variable, якщо вона не оголошена всередині самої функції, але використовується нею.

Наприклад:

    function outer() {

        const message = "Hello";

        function inner() {
            console.log(message);
        }

        return inner;
    }

У `inner()`:

    message

є free variable.

Вона знаходиться в outer lexical environment.

---

# Найпростіший Closure

    function outer() {

        const message = "Hello";

        return function () {
            console.log(message);
        };
    }

    const fn = outer();

    fn();

Результат:

    Hello

Чому?

Тому що returned function має доступ до lexical environment `outer()`.

---

# Closure після завершення Function

Це найважливіша особливість.

    function outer() {

        const value = 42;

        return function () {
            return value;
        };
    }

    const getValue = outer();

`outer()` вже завершила виконання.

Але:

    getValue()

повертає:

    42

Тому що closure продовжує тримати доступ до environment, де знаходиться `value`.

---

# Persistent State

Closure може зберігати стан між викликами.

Наприклад:

    function createCounter() {

        let count = 0;

        return function () {
            count++;

            return count;
        };
    }

    const counter = createCounter();

    console.log(counter());
    // 1

    console.log(counter());
    // 2

    console.log(counter());
    // 3

`count` не створюється заново під час кожного виклику `counter()`.

Він належить environment, який зберігається closure.

---

# Closure як Private State

Closure дозволяє приховати state від прямого доступу.

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
    // 2

Зовні немає прямого:

    counter.count

`count` існує в closure environment.

---

# Private State

Ще один приклад:

    function createUser(name) {

        let password = "secret";

        return {
            getName() {
                return name;
            },

            checkPassword(value) {
                return value === password;
            }
        };
    }

    const user = createUser("John");

    console.log(user.getName());
    // John

    console.log(user.checkPassword("secret"));
    // true

`password` не доступний напряму:

    user.password
    // undefined

Closure забезпечує encapsulation.

---

# Encapsulation

Closure дозволяє організувати:

    private data
        ↓
    public methods
        ↓
    controlled access

Наприклад:

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
    // 150

`balance` прихований від прямого доступу.

---

# Function Factory

Function factory — функція, яка створює та повертає інші функції.

Наприклад:

    function createMultiplier(multiplier) {

        return function (value) {
            return value * multiplier;
        };
    }

    const double = createMultiplier(2);
    const triple = createMultiplier(3);

    console.log(double(5));
    // 10

    console.log(triple(5));
    // 15

Кожна функція має власний closure.

---

# Окремі Closure

    function createCounter() {

        let count = 0;

        return function () {
            count++;

            return count;
        };
    }

    const counterA = createCounter();
    const counterB = createCounter();

    console.log(counterA());
    // 1

    console.log(counterA());
    // 2

    console.log(counterB());
    // 1

`counterA` та `counterB` мають різні environments.

Умовно:

    counterA
        ↓
    Environment A
        ↓
    count = 2


    counterB
        ↓
    Environment B
        ↓
    count = 1

---

# Closure не ділиться state автоматично

Наприклад:

    function createCounter() {

        let count = 0;

        return function () {
            return ++count;
        };
    }

    const a = createCounter();
    const b = createCounter();

    console.log(a());
    // 1

    console.log(b());
    // 1

Це два різні closure environments.

---

# Shared Closure Environment

Але кілька функцій можуть використовувати один environment.

Наприклад:

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

Усі три methods мають доступ до одного:

    count

Тобто:

    increment ─┐
    decrement ─┼──→ shared environment
    getValue ──┘          ↓
                        count

---

# Closure та Objects

Closure не є object.

Наприклад:

    function createCounter() {

        let count = 0;

        return function () {
            count++;
        };
    }

Тут:

    returned value → function

а не:

    object

Closure — це relationship між function та її lexical environment.

---

# Closure та Callback

Closures дуже часто використовуються в callbacks.

Наприклад:

    function greet(name) {

        setTimeout(function () {
            console.log(`Hello, ${name}`);
        }, 1000);
    }

    greet("John");

Callback використовує:

    name

який знаходиться в outer function.

Навіть після завершення `greet()` callback зберігає доступ до `name`.

---

# Closure та `setTimeout`

    function createMessage(message) {

        setTimeout(function () {
            console.log(message);
        }, 1000);
    }

    createMessage("Hello");

Callback закривається над:

    message

Це closure.

---

# Closure та Event Handler

Наприклад:

    function setupButton(button, message) {

        button.addEventListener("click", function () {
            console.log(message);
        });
    }

    setupButton(button, "Hello");

Event handler має closure над:

    message

Коли користувач натисне кнопку пізніше, handler все ще матиме доступ до `message`.

---

# Closure у DOM

Приклад:

    function setupCounter(button) {

        let count = 0;

        button.addEventListener("click", function () {

            count++;

            button.textContent = count;
        });
    }

    setupCounter(button);

`count` є private state.

Event handler має closure над:

    count

---

# Closure та `for`

Одна з найвідоміших проблем JavaScript.

З `var`:

    for (var i = 0; i < 3; i++) {

        setTimeout(function () {
            console.log(i);
        }, 100);
    }

Результат:

    3
    3
    3

Причина:

усі callbacks використовують одне binding:

    i

Після завершення циклу:

    i === 3

Усі callbacks читають це саме binding.

---

# `let` у `for`

З `let`:

    for (let i = 0; i < 3; i++) {

        setTimeout(function () {
            console.log(i);
        }, 100);
    }

Результат:

    0
    1
    2

Для циклу з `let` JavaScript створює окреме per-iteration binding.

Умовно:

    iteration 1 → i = 0
    iteration 2 → i = 1
    iteration 3 → i = 2

Кожен callback отримує доступ до відповідного binding.

---

# Старий спосіб вирішення з IIFE

До появи `let` використовували IIFE.

    for (var i = 0; i < 3; i++) {

        (function (index) {

            setTimeout(function () {
                console.log(index);
            }, 100);

        })(i);
    }

Результат:

    0
    1
    2

IIFE створює окремий function scope для кожної ітерації.

Сьогодні для такого завдання зазвичай достатньо:

    let

---

# Closure та Asynchronous JavaScript

Closure дуже важливий у asynchronous code.

Наприклад:

    function fetchData(url) {

        const startTime = Date.now();

        setTimeout(function () {

            const elapsed = Date.now() - startTime;

            console.log(`Elapsed: ${elapsed}ms`);

        }, 1000);
    }

    fetchData("/api/data");

Callback має доступ до:

    startTime

навіть після завершення `fetchData()`.

---

# Closure та Promise

Наприклад:

    function loadUser(userId) {

        return fetch(`/api/users/${userId}`)
            .then(function (response) {
                console.log("Loading user:", userId);

                return response.json();
            });
    }

`then()` callback використовує:

    userId

Це closure.

---

# Closure та async/await

Closure не зникає через `async`.

Наприклад:

    function createLoader(url) {

        const apiUrl = url;

        return async function () {

            const response = await fetch(apiUrl);

            return response.json();
        };
    }

    const loadUsers = createLoader("/api/users");

    loadUsers();

Returned async function має доступ до:

    apiUrl

---

# Closure та Higher-Order Functions

Higher-order function може:

    приймати function
    або
    повертати function

Наприклад:

    function multiplyBy(multiplier) {

        return function (value) {
            return value * multiplier;
        };
    }

    const multiplyByTwo = multiplyBy(2);

    console.log(multiplyByTwo(10));
    // 20

Тут closure зберігає:

    multiplier

---

# Closure та `map`

Наприклад:

    function createMultiplier(multiplier) {

        return function (value) {
            return value * multiplier;
        };
    }

    const double = createMultiplier(2);

    const numbers = [1, 2, 3, 4];

    const result = numbers.map(double);

    console.log(result);
    // [2, 4, 6, 8]

`double` має closure над:

    multiplier

---

# Closure та Currying

Closure часто використовується для currying.

Наприклад:

    function multiply(a) {

        return function (b) {
            return a * b;
        };
    }

    const multiplyByTwo = multiply(2);

    console.log(multiplyByTwo(5));
    // 10

Перший виклик:

    multiply(2)

зберігає:

    a = 2

Другий виклик:

    multiplyByTwo(5)

використовує:

    a = 2
    b = 5

Результат:

    10

---

# Currying з Arrow Functions

Те саме коротше:

    const multiply =
        a =>
        b =>
        a * b;

    const double = multiply(2);

    console.log(double(5));
    // 10

`b => a * b` має closure над:

    a

---

# Closure та IIFE

IIFE — Immediately Invoked Function Expression.

Наприклад:

    (function () {

        const privateValue = 42;

        console.log(privateValue);

    })();

`privateValue` не доступна за межами function scope.

IIFE історично використовувались для:

    isolation
    private state
    avoiding global variables

---

# IIFE з Closure

    const counter = (function () {

        let count = 0;

        return function () {
            return ++count;
        };

    })();

    console.log(counter());
    // 1

    console.log(counter());
    // 2

IIFE створила environment.

Returned function зберігає closure над:

    count

---

# Module Pattern

До ES Modules closure часто використовували для створення module pattern.

Наприклад:

    const counter = (function () {

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

Зовні доступні:

    counter.increment()
    counter.getValue()

Але не:

    counter.count

Це форма encapsulation через closure.

---

# Closure та ES Modules

Сучасні ES modules мають власний module scope.

Наприклад:

    const apiUrl = "/api";

    export function getApiUrl() {
        return apiUrl;
    }

Інші modules не мають прямого доступу до:

    apiUrl

але exported function має до нього доступ.

Module scope та closure мають споріднену ідею lexical environment, хоча module binding та closure — не одне й те саме поняття.

---

# Closure та React

Closure дуже важливий для React.

Наприклад:

    function Counter() {

        const [count, setCount] = useState(0);

        function handleClick() {
            console.log(count);
        }

        return (
            <button onClick={handleClick}>
                {count}
            </button>
        );
    }

`handleClick` має доступ до:

    count

через lexical scope.

У React потрібно особливо добре розуміти closures, тому що callbacks часто виконуються пізніше.

---

# Stale Closure

Stale closure — ситуація, коли callback використовує старе значення, захоплене під час певного render/environment.

Спрощений приклад:

    function createLogger(value) {

        return function () {
            console.log(value);
        };
    }

    const log = createLogger(10);

    log();

Навіть якщо десь згодом існує:

    value = 20

це не означає, що `log()` автоматично почне використовувати `20`.

Closure пов'язаний із конкретним lexical environment.

---

# Closure та React State

У React це особливо важливо для:

    event handlers
    setTimeout
    setInterval
    promises
    effects
    subscriptions

Наприклад:

    function Component() {

        const [count, setCount] = useState(0);

        function handleClick() {

            setTimeout(() => {
                console.log(count);
            }, 1000);
        }

        return (
            <button onClick={handleClick}>
                Click
            </button>
        );
    }

Callback закривається над значенням `count` з відповідного render.

---

# Closure та Memory

Closure може утримувати environment у пам'яті, якщо він все ще доступний через references.

Наприклад:

    function createLargeObject() {

        const largeData = new Array(1000000).fill("data");

        return function () {
            return largeData.length;
        };
    }

    const fn = createLargeObject();

Поки `fn` доступна, environment з `largeData` може залишатися reachable.

Тому closure може впливати на memory usage.

---

# Garbage Collection

JavaScript має garbage collector.

Якщо object або environment більше не reachable, engine може звільнити його пам'ять.

Наприклад:

    function createCounter() {

        let count = 0;

        return function () {
            return ++count;
        };
    }

    let counter = createCounter();

Поки:

    counter

посилається на function, environment з `count` може залишатися потрібним.

Якщо:

    counter = null;

і немає інших references до closure, відповідне environment може стати garbage-collectable.

---

# Closure та Memory Leak

Сам closure не є memory leak.

Проблема виникає тоді, коли непотрібні references продовжують утримувати великі objects.

Наприклад:

    let handler;

    function setup() {

        const hugeData = new Array(1000000).fill("data");

        handler = function () {
            console.log(hugeData.length);
        };
    }

    setup();

Поки `handler` reachable, `hugeData` може залишатися reachable через closure.

Тому потрібно уважно працювати з:

    event listeners
    timers
    subscriptions
    global references
    long-lived callbacks

---

# Closure та Event Listener Cleanup

Наприклад:

    function setup(button) {

        function handleClick() {
            console.log("clicked");
        }

        button.addEventListener("click", handleClick);

        return function cleanup() {
            button.removeEventListener("click", handleClick);
        };
    }

    const cleanup = setup(button);

    cleanup();

Тут closure використовується не тільки для state, а й для збереження reference на handler.

---

# Closure та Reference

Важливо розрізняти:

    value

та:

    reference

Closure не обов'язково "копіює значення".

Він забезпечує доступ до binding.

Наприклад:

    function outer() {

        let value = 10;

        return {
            get() {
                return value;
            },

            set(newValue) {
                value = newValue;
            }
        };
    }

    const state = outer();

    console.log(state.get());
    // 10

    state.set(20);

    console.log(state.get());
    // 20

Обидві functions працюють з одним binding:

    value

---

# Closure та Mutable State

Closure може зберігати mutable state.

    function createCounter() {

        let count = 0;

        return function () {
            count++;
            return count;
        };
    }

`count` змінюється:

    0 → 1 → 2 → 3

Але binding залишається в closure environment.

---

# Closure та `const`

Closure не залежить від того, чи binding створено через `let` або `const`.

Наприклад:

    function outer() {

        const name = "John";

        return function () {
            return name;
        };
    }

`name` захоплений closure.

Так само:

    function outer() {

        let count = 0;

        return function () {
            return ++count;
        };
    }

`count` також захоплений closure.

---

# Closure та Object Mutation

`const` не робить object immutable.

Наприклад:

    function createStore() {

        const state = {
            count: 0
        };

        return function () {
            state.count++;

            return state.count;
        };
    }

    const getNext = createStore();

    console.log(getNext());
    // 1

    console.log(getNext());
    // 2

`state` — `const` binding, але його property можна змінювати.

---

# Closure та приватність

Closure може забезпечити логічну приватність:

    function createUser() {

        const password = "secret";

        return {
            check(value) {
                return value === password;
            }
        };
    }

Але потрібно розуміти:

    closure privacy
        ≠
    security boundary

Closure приховує binding від звичайного прямого доступу через object API.

Це не заміна authentication, authorization або encryption.

---

# Closure та Security

Не потрібно використовувати closure як спосіб зберігати справжні secrets у frontend application.

Наприклад:

    function createApiClient() {

        const secret = "MY_SECRET";

        return function () {
            return secret;
        };
    }

Якщо код працює у браузері, секрет уже присутній у client-side application.

Closure не робить його безпечним від користувача, який контролює середовище виконання.

---

# Closure та Scope

Порівняй:

    Scope
        ↓
    визначає, де binding доступний

    Closure
        ↓
    дозволяє функції продовжувати доступ
    до lexical environment

Тобто closure базується на scope.

---

# Closure та Execution Context

Не потрібно плутати:

    Execution Context

та:

    Closure

Execution context — середовище, пов'язане з виконанням коду.

Closure — поведінка, за якої function зберігає доступ до lexical environment.

Функція може продовжувати використовувати outer bindings після завершення виклику outer function.

---

# Closure та Scope Chain

Спрощено:

    function inner() {
        console.log(value);
    }

JavaScript шукає:

    inner scope
        ↓
    outer scope
        ↓
    global scope

Closure дозволяє `inner` продовжувати мати доступ до відповідного lexical environment.

---

# Closure у Recursive Functions

Closure може використовуватися разом із recursion.

Наприклад:

    function createCounter(max) {

        let count = 0;

        function next() {

            count++;

            if (count <= max) {
                return count;
            }

            return null;
        }

        return next;
    }

    const next = createCounter(3);

    console.log(next());
    // 1

    console.log(next());
    // 2

    console.log(next());
    // 3

    console.log(next());
    // null

---

# Closure та Memoization

Closure часто використовується для зберігання cache.

Наприклад:

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

    function square(n) {
        console.log("calculating...");

        return n * n;
    }

    const memoizedSquare = memoize(square);

    console.log(memoizedSquare(5));
    // calculating...
    // 25

    console.log(memoizedSquare(5));
    // 25

`cache` зберігається у closure.

---

# Closure та Debounce

Closure часто використовується для реалізації debounce.

Спрощений приклад:

    function debounce(fn, delay) {

        let timer;

        return function (...args) {

            clearTimeout(timer);

            timer = setTimeout(() => {
                fn(...args);
            }, delay);
        };
    }

    const handleSearch = debounce(function (query) {
        console.log(query);
    }, 500);

`timer` є private state closure.

Кожен виклик returned function може отримувати доступ до того самого `timer`.

---

# Closure та Throttle

Closure також можна використовувати для throttle.

    function throttle(fn, delay) {

        let lastCall = 0;

        return function (...args) {

            const now = Date.now();

            if (now - lastCall >= delay) {

                lastCall = now;

                fn(...args);
            }
        };
    }

    const handleScroll = throttle(function () {
        console.log("scroll");
    }, 500);

`lastCall` зберігається в closure.

---

# Closure та Factory

Один із найважливіших practical patterns:

    function createX(config) {

        return function () {
            // uses config
        };
    }

Наприклад:

    function createLogger(prefix) {

        return function (message) {
            console.log(`[${prefix}] ${message}`);
        };
    }

    const info = createLogger("INFO");
    const error = createLogger("ERROR");

    info("Server started");
    error("Something went wrong");

Кожен logger має власний closure.

---

# Closure та Configuration

Closure зручний для створення configured functions.

    function createFetcher(baseUrl) {

        return async function (path) {

            const response = await fetch(
                `${baseUrl}${path}`
            );

            return response.json();
        };
    }

    const api = createFetcher("https://example.com/api");

    api("/users");

`baseUrl` захоплений closure.

---

# Closure та Dependency Injection

Closure можна використовувати для передачі залежностей.

    function createUserService(repository) {

        return {

            getUser(id) {
                return repository.findById(id);
            }

        };
    }

`repository` доступний methods через closure.

Це дозволяє створювати ізольовані services.

---

# Closure та Class

Closure та class private fields вирішують деякі схожі задачі, але різними способами.

Closure:

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

Class:

    class Counter {

        #count = 0;

        increment() {
            this.#count++;
        }

        getValue() {
            return this.#count;
        }
    }

Обидва підходи можуть створювати private state.

---

# Closure vs Class

Closure добре підходить для:

    function factories
    small modules
    private state
    callbacks
    utilities
    encapsulation

Class добре підходить для:

    many instances
    shared prototype methods
    inheritance
    object-oriented architecture
    explicit object model

Не потрібно використовувати closure всюди.

---

# Closure та Arrow Functions

Arrow functions також створюють closures.

Наприклад:

    function createGreeting(name) {

        return () => {
            console.log(`Hello, ${name}`);
        };
    }

    const greet = createGreeting("John");

    greet();

Arrow function має closure над:

    name

Arrow function не має окремого `this`, але це окреме питання від closure.

---

# Closure та `this`

Closure та `this` — різні механізми.

Closure визначає доступ до lexical variables.

`this` визначається правилами виклику функції, а для arrow function — lexical `this`.

Наприклад:

    const name = "John";

    const object = {

        name: "Peter",

        method() {

            const greet = () => {
                console.log(this.name);
            };

            greet();
        }
    };

    object.method();

Arrow function захоплює lexical `this`.

Це пов'язано з lexical behavior, але `this` не є variable closure у звичайному сенсі.

---

# Closure та Parameters

Parameters також можуть бути captured.

    function createGreeter(name) {

        return function () {
            return `Hello, ${name}`;
        };
    }

    const greetJohn = createGreeter("John");

`name` — parameter outer function.

Returned function має до нього доступ через closure.

---

# Closure та Local Variables

Не тільки parameters можуть бути captured.

    function outer() {

        const a = 10;
        let b = 20;

        return function () {
            return a + b;
        };
    }

Внутрішня функція використовує:

    a
    b

обидві variables із outer environment.

---

# Closure та Nested Functions

Closure найчастіше видно у nested functions.

    function outer() {

        const value = 10;

        function inner() {
            return value;
        }

        return inner;
    }

    const fn = outer();

Nested function має доступ до outer scope.

---

# Closure не обов'язково означає `return function`

Це важливо.

Closure може виникнути через callback:

    function setup() {

        const message = "Hello";

        button.addEventListener("click", function () {
            console.log(message);
        });
    }

Тут функція не повертається через `return`, але callback зберігає доступ до `message`.

Тобто:

    closure
        ≠
    return function

`return function` — лише один із найзручніших способів продемонструвати closure.

---

# Closure та Callback без Return

    function setupTimer() {

        const message = "Hello";

        setTimeout(function () {
            console.log(message);
        }, 1000);
    }

    setupTimer();

Callback використовує `message`.

Це closure.

---

# Closure та Event Callback

    function setup(button, username) {

        button.addEventListener("click", function () {

            console.log(`Hello, ${username}`);

        });
    }

    setup(button, "John");

Після завершення `setup()` event listener продовжує використовувати:

    username

---

# Closure та Array Methods

Callbacks для:

    map
    filter
    reduce
    find
    some
    every

можуть використовувати closures.

Наприклад:

    function greaterThan(limit) {

        return function (value) {
            return value > limit;
        };
    }

    const numbers = [1, 5, 10, 15];

    const result = numbers.filter(
        greaterThan(5)
    );

    console.log(result);
    // [10, 15]

Callback має closure над:

    limit

---

# Closure та `reduce`

    function createAdder(initial) {

        return function (numbers) {

            return numbers.reduce(
                (sum, value) => sum + value,
                initial
            );
        };
    }

    const addFrom100 = createAdder(100);

    console.log(
        addFrom100([1, 2, 3])
    );

    // 106

`initial` зберігається в closure.

---

# Closure та DOM Factory

Наприклад:

    function createToggle(element) {

        let active = false;

        return function () {

            active = !active;

            element.classList.toggle(
                "active",
                active
            );
        };
    }

    const toggle = createToggle(element);

    button.addEventListener("click", toggle);

Тут closure зберігає:

    active
    element

---

# Closure та State Machine

Closure може використовуватися для простого state machine.

    function createTrafficLight() {

        let state = "red";

        return function () {

            if (state === "red") {
                state = "green";
            } else if (state === "green") {
                state = "yellow";
            } else {
                state = "red";
            }

            return state;
        };
    }

    const nextState = createTrafficLight();

    console.log(nextState());
    // green

    console.log(nextState());
    // yellow

    console.log(nextState());
    // red

State:

    red → green → yellow → red

зберігається у closure.

---

# Closure та генератори ID

Наприклад:

    function createIdGenerator() {

        let id = 0;

        return function () {
            id++;

            return id;
        };
    }

    const nextId = createIdGenerator();

    console.log(nextId());
    // 1

    console.log(nextId());
    // 2

    console.log(nextId());
    // 3

`id` недоступний напряму.

---

# Closure та Cache

Ще один practical example:

    function createCache() {

        const cache = new Map();

        return {

            get(key) {
                return cache.get(key);
            },

            set(key, value) {
                cache.set(key, value);
            },

            has(key) {
                return cache.has(key);
            }

        };
    }

    const cache = createCache();

`cache` є private state.

---

# Closure та Multiple Functions

Наприклад:

    function createStore(initialValue) {

        let value = initialValue;

        function get() {
            return value;
        }

        function set(newValue) {
            value = newValue;
        }

        function reset() {
            value = initialValue;
        }

        return {
            get,
            set,
            reset
        };
    }

    const store = createStore(10);

    console.log(store.get());
    // 10

    store.set(20);

    console.log(store.get());
    // 20

    store.reset();

    console.log(store.get());
    // 10

Усі functions працюють з одним closure environment.

---

# Closure та Referential Independence

Кожен виклик factory може створити незалежний state.

    const first = createStore(10);
    const second = createStore(100);

    first.set(20);

    console.log(first.get());
    // 20

    console.log(second.get());
    // 100

Кожен invocation створив власний environment.

---

# Closure та Reusable Logic

Closure дозволяє відокремити configuration від behavior.

    const isAdult = greaterThanOrEqual(18);
    const isSenior = greaterThanOrEqual(65);

    function greaterThanOrEqual(limit) {

        return function (value) {
            return value >= limit;
        };
    }

    console.log(isAdult(20));
    // true

    console.log(isSenior(20));
    // false

---

# Closure та Configuration Object

    function createFormatter(options) {

        return function (value) {

            if (options.uppercase) {
                return String(value).toUpperCase();
            }

            return String(value);
        };
    }

    const formatter = createFormatter({
        uppercase: true
    });

    console.log(formatter("hello"));
    // HELLO

`options` доступний через closure.

---

# Closure та `var`

Потрібно добре знати класичну проблему:

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

    var
        ↓
    function scope
        ↓
    одне binding i
        ↓
    callbacks використовують його

---

# Closure та `let`

    for (let i = 0; i < 3; i++) {

        setTimeout(() => {
            console.log(i);
        }, 100);
    }

Результат:

    0
    1
    2

`let` має per-iteration binding behavior.

---

# Як мислити про Closure

Коли бачиш:

    function outer() {

        const value = 10;

        return function inner() {
            return value;
        };
    }

    const fn = outer();

Питай себе:

    1. Де створена inner?
    2. Які variables вона використовує?
    3. Які з них local?
    4. Які знаходяться в outer scope?
    5. Чи буде inner використовуватися пізніше?
    6. Який lexical environment їй потрібен?

Відповідь:

    inner
      ↓
    захоплює value
      ↓
    outer() завершується
      ↓
    environment залишається reachable
      ↓
    fn() може використати value

---

# Ментальна модель Closure

Найкорисніша модель:

    Function
        │
        ├── code
        │
        └── lexical environment reference
                    │
                    ↓
              outer environment
                    │
                    ↓
                  bindings

Closure дозволяє функції використовувати цей lexical environment пізніше.

---

# Closure Step by Step

Розглянемо:

    function createCounter() {

        let count = 0;

        return function () {
            count++;

            return count;
        };
    }

    const counter = createCounter();

Крок 1:

    createCounter()
        ↓
    створює environment

Крок 2:

    count = 0

Крок 3:

    створюється inner function

Крок 4:

    inner function має доступ до count

Крок 5:

    inner function повертається

Крок 6:

    createCounter() завершується

Крок 7:

    counter зберігає inner function

Крок 8:

    inner function продовжує мати доступ до count

Крок 9:

    counter()
        ↓
    count++
        ↓
    1

---

# Closure Diagram

Спрощено:

    createCounter()
          │
          ▼
    ┌─────────────────────┐
    │ Lexical Environment │
    │                     │
    │ count = 0           │
    └──────────┬──────────┘
               ▲
               │
               │ closure
               │
        ┌──────┴──────┐
        │ inner fn    │
        └──────┬──────┘
               │
               ▼
           counter()

---

# Multiple Closures Diagram

    createCounter()
          │
          ├── Environment A
          │       └── count = 2
          │
          └── Environment B
                  └── count = 1

    counterA → Environment A

    counterB → Environment B

Кожен виклик factory створює окремий environment.

---

# Closure та Reachability

Важлива ментальна модель:

    object/function/environment
        ↓
    reachable?
        ↓
    yes → може залишатися в memory
        ↓
    no → може бути garbage collected

Closure може підтримувати environment reachable.

---

# Типові помилки

❌ Вважати closure окремим типом function.

❌ Вважати, що closure — це просто nested function.

❌ Вважати, що closure працює тільки з `return function`.

❌ Вважати, що closure копіює всі variables.

❌ Вважати, що closure автоматично означає memory leak.

❌ Плутати closure та `this`.

❌ Плутати closure та scope.

❌ Вважати, що outer function повинна залишатися виконуваною.

❌ Не розуміти проблему `var` у циклах.

❌ Не розуміти stale closures у asynchronous code.

❌ Зберігати великі непотрібні objects через довгоживучі closures.

❌ Використовувати closure як security mechanism для frontend secrets.

---

# Практичні завдання

## Завдання 1 — Простий Closure

Створи:

    createGreeting(name)

яка повертає function.

Очікувано:

    const greet = createGreeting("John");

    greet();

Результат:

    Hello, John

---

## Завдання 2 — Counter

Створи:

    createCounter()

яка повертає function.

Очікувано:

    const counter = createCounter();

    counter();
    // 1

    counter();
    // 2

    counter();
    // 3

---

## Завдання 3 — Independent Counters

Створи два counters.

    const a = createCounter();
    const b = createCounter();

Перевір:

    a();
    // 1

    a();
    // 2

    b();
    // 1

    b();
    // 2

---

## Завдання 4 — Private State

Створи:

    createUser(name)

яка повертає:

    getName()
    setName()

Зроби так, щоб `name` не був доступний напряму.

---

## Завдання 5 — Multiplier

Створи:

    createMultiplier(number)

Очікувано:

    const double = createMultiplier(2);

    double(5);
    // 10

---

## Завдання 6 — Minimum

Створи:

    greaterThan(limit)

Очікувано:

    const isAdult = greaterThan(17);

    isAdult(20);
    // true

    isAdult(15);
    // false

---

## Завдання 7 — ID Generator

Створи:

    createIdGenerator()

Очікувано:

    const nextId = createIdGenerator();

    nextId();
    // 1

    nextId();
    // 2

    nextId();
    // 3

---

## Завдання 8 — Cache

Створи:

    createCache()

з methods:

    get(key)
    set(key, value)
    has(key)

Зроби `Map` private через closure.

---

## Завдання 9 — Toggle

Створи:

    createToggle()

яка починає з:

    false

Кожен виклик змінює:

    false → true
    true → false

---

## Завдання 10 — Timer

Створи function factory:

    createTimer()

яка має private:

    startTime

та повертає:

    start()
    elapsed()

---

## Завдання 11 — `var` та Closure

Поясни результат:

    const functions = [];

    for (var i = 0; i < 3; i++) {

        functions.push(function () {
            return i;
        });
    }

    console.log(functions[0]());
    console.log(functions[1]());
    console.log(functions[2]());

Після цього перепиши приклад з `let`.

---

## Завдання 12 — Closure у Callback

Створи:

    delayedGreeting(name)

яка через `setTimeout()` виводить:

    Hello, John

---

# Питання зі співбесіди

Що таке closure?

Чому closure пов'язаний із lexical scope?

Що таке lexical environment?

Що таке captured variable?

Що таке free variable?

Чим closure відрізняється від nested function?

Чи обов'язково повертати function для створення closure?

Чи може callback створити closure?

Чи може event handler бути closure?

Що відбувається з outer function після її завершення?

Чому closure може використовувати variable після завершення outer function?

Що таке persistent state?

Як closure дозволяє створювати private state?

Що таке function factory?

Як closure використовується у memoization?

Як closure використовується у debounce?

Як closure використовується у throttle?

Як closure працює з `setTimeout()`?

Як closure працює з Promise?

Як closure працює з asynchronous code?

Яка проблема `var` у циклах?

Чому `let` у циклі дає інший результат?

Що таке per-iteration binding?

Чи closure копіює variable?

Що таке stale closure?

Чи кожен виклик factory створює новий closure?

Чи можуть кілька functions використовувати один closure environment?

Чи є closure object?

Чи є closure function?

Який зв'язок між closure та scope chain?

Який зв'язок між closure та garbage collection?

Чи closure завжди викликає memory leak?

Чим closure відрізняється від `this`?

Як closure використовується в React?

---

# Junior Level

Потрібно вміти:

    пояснити closure простими словами

    розуміти lexical scope

    розуміти outer scope

    розуміти nested functions

    розуміти captured variables

    розуміти scope chain

    створити counter через closure

    створити function factory

    пояснити `var` у циклі

    пояснити `let` у циклі

    розуміти closure у callbacks

    розуміти closure у setTimeout

    розуміти private state

---

# Middle Level

Потрібно розуміти:

    lexical environments

    environment references

    captured bindings

    free variables

    persistent state

    shared closure environment

    multiple closure environments

    closures у asynchronous code

    closures у event handlers

    closures у promises

    stale closures

    memoization

    debounce

    throttle

    module pattern

    factory pattern

    closure-based encapsulation

    garbage collection

    reachability

    memory implications

    closure у React

    closure та dependencies

---

# Senior Level

Глибше розуміння:

    ECMAScript lexical environments

    Environment Records

    Declarative Environment Records

    Function Environment Records

    Module Environment Records

    GetIdentifierReference

    ResolveBinding

    CreateMutableBinding

    CreateImmutableBinding

    InitializeBinding

    SetMutableBinding

    GetBindingValue

    lexical environment chains

    execution contexts

    function environment

    closure implementation

    environment allocation

    variable capture

    escaping variables

    garbage collection

    reachability analysis

    escape analysis

    JIT optimization

    closure allocation strategies

    optimization/deoptimization

    memory retention

    event listener lifetime

    asynchronous callback lifetime

    engine-specific implementation details

---

# Міні-шпаргалка

## Closure

    Closure
        ↓
    function
        +
    lexical environment access

---

## Основна схема

    outer()
        ↓
    local variable
        ↓
    inner function
        ↓
    inner function escapes
        ↓
    outer() finishes
        ↓
    inner still accesses variable

---

## Captured Variable

    function outer() {

        const value = 10;

        return function () {
            return value;
        };
    }

`value` → captured variable.

---

## Scope Chain

    inner
      ↓
    outer
      ↓
    global

---

## Private State

    factory()
        ↓
    private variable
        ↓
    returned methods
        ↓
    controlled access

---

## Function Factory

    createX(config)
        ↓
    return function
        ↓
    function remembers config

---

## Counter

    function createCounter() {

        let count = 0;

        return () => ++count;
    }

---

## Multiple Closures

    createCounter()
        ↓
    Environment A

    createCounter()
        ↓
    Environment B

A і B мають незалежний state.

---

## Shared Environment

    function A() {
        return value;
    }

    function B() {
        return value;
    }

Якщо обидві functions створені в одному environment, вони можуть використовувати один binding.

---

## Callback

    outer()
        ↓
    callback
        ↓
    callback uses outer variable
        ↓
    closure

---

## Async

    outer()
        ↓
    setTimeout(callback)
        ↓
    outer finishes
        ↓
    callback later accesses outer variable

---

## `var` у циклі

    for (var i = 0; i < 3; i++) {

        setTimeout(() => {
            console.log(i);
        });
    }

Результат:

    3
    3
    3

---

## `let` у циклі

    for (let i = 0; i < 3; i++) {

        setTimeout(() => {
            console.log(i);
        });
    }

Результат:

    0
    1
    2

---

## Closure та Memory

    closure
        ↓
    environment reachable
        ↓
    bindings remain available

Коли environment більше не reachable:

    garbage collector
        ↓
    може звільнити memory

---

# Головна різниця

## Scope

    Scope
        ↓
    де binding доступний

## Lexical Environment

    Lexical Environment
        ↓
    bindings + outer environment reference

## Closure

    Closure
        ↓
    function продовжує мати доступ
    до lexical environment

## Scope Chain

    Scope Chain
        ↓
    порядок пошуку bindings

## Captured Variable

    Captured Variable
        ↓
    outer binding,
    який використовується function

---

# Найважливіша ментальна модель

Не думай:

    "closure зберігає значення"

Краще думай:

    function
        ↓
    має доступ до lexical environment
        ↓
    environment містить bindings
        ↓
    binding може продовжувати існувати,
    поки він потрібен

---

# Closure у трьох рядках

    function outer() {
        let value = 0;

        return () => ++value;
    }

    const fn = outer();

    fn();
    // 1

    fn();
    // 2

Returned function:

    fn

зберігає доступ до:

    value

Саме це — основа closure.

---

# Головне

• Closure — це механізм, за якого function зберігає доступ до свого lexical environment.

• Closure базується на lexical scope.

• Closure визначається не місцем виклику функції, а місцем її створення.

• Nested function може отримувати доступ до outer variables.

• Outer function може завершити виконання, але її environment може залишатися доступним.

• Variable, яку використовує inner function з outer scope, можна називати captured variable.

• Variable, яка не оголошена всередині function, але використовується нею, є free variable щодо цієї function.

• Closure не є окремим типом function.

• Closure не обов'язково означає `return function`.

• Callback може бути closure.

• Event handler може бути closure.

• `setTimeout()` callback може бути closure.

• Promise callback може бути closure.

• Async function може використовувати closure.

• Closure дозволяє створювати persistent state.

• Closure дозволяє створювати private state.

• Closure часто використовується у function factories.

• Closure часто використовується у memoization.

• Closure часто використовується у debounce.

• Closure часто використовується у throttle.

• Closure може використовуватися для encapsulation.

• Кілька functions можуть використовувати один closure environment.

• Кожен виклик factory може створити окремий environment.

• `var` у циклах може призвести до того, що всі callbacks використовують один binding.

• `let` має per-iteration binding behavior.

• Closure та `this` — різні механізми.

• Closure та scope — не одне й те саме.

• Closure може впливати на memory retention.

• Closure сам по собі не є memory leak.

• Environment може бути garbage-collected, коли більше не reachable.

• Потрібно бути уважним із long-lived callbacks, event listeners та великими objects.

• Closure не є security mechanism для збереження frontend secrets.

• У React closure особливо важливі для callbacks, effects, timers та asynchronous code.

• Найкраща ментальна модель:

    Function
        ↓
    lexical environment
        ↓
    outer environment
        ↓
    captured bindings
        ↓
    function може використовувати їх пізніше

---

# Зв'язок з попередньою темою

    06. Scope and Hoisting
              ↓
          lexical scope
              ↓
          scope chain
              ↓
       lexical environment
              ↓
    07. Closures
              ↓
    function зберігає доступ
    до lexical environment
              ↓
    persistent state
    private state
    callbacks
    async code
    factories
    memoization
    debounce
    throttle

Тобто:

    Scope
        ↓
    пояснює, де JavaScript шукає binding

    Closure
        ↓
    пояснює, чому function може
    продовжувати використовувати
    outer binding пізніше