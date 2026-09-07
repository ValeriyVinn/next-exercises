# 08. `this`

`this` — спеціальне значення JavaScript, яке визначається контекстом виклику function.

Найважливіше:

    this ≠ lexical variable

    this не визначається просто місцем,
    де написана function.

Для звичайної function значення `this` переважно визначається **способом виклику**.

Для arrow function `this` не створюється власне — вона використовує `this` із зовнішнього lexical scope.

---

# Ключові поняття

✔ `this`  
✔ execution context  
✔ call-site  
✔ invocation  
✔ method call  
✔ standalone function call  
✔ global context  
✔ global object  
✔ `window`  
✔ `globalThis`  
✔ `strict mode`  
✔ `use strict`  
✔ object method  
✔ function call  
✔ constructor call  
✔ `new`  
✔ explicit binding  
✔ `call()`  
✔ `apply()`  
✔ `bind()`  
✔ implicit binding  
✔ explicit binding  
✔ default binding  
✔ new binding  
✔ lexical `this`  
✔ arrow function  
✔ callback  
✔ event handler  
✔ DOM  
✔ class  
✔ constructor  
✔ prototype  
✔ method  
✔ detached method  
✔ method borrowing  
✔ function borrowing  
✔ `this` у classes  
✔ `this` у modules  
✔ `this` у browser  
✔ `this` у Node.js  

---

# Головне правило

Для звичайної function:

    Як function викликана?

Саме це питання потрібно ставити першим.

Наприклад:

    object.method();

Тут `this` зазвичай:

    object

Але:

    const fn = object.method;

    fn();

Тут `this` вже може бути іншим.

Тобто:

    function definition
          ↓
    не визначає this повністю

    call-site
          ↓
    визначає this для звичайної function

---

# `this` — не closure

Не плутай:

    closure
        ↓
    lexical variables

і:

    this
        ↓
    execution / invocation context

Наприклад:

    const name = "John";

    const user = {

        name: "Peter",

        greet() {
            console.log(this.name);
        }

    };

Тут:

    this.name

не є closure над `name`.

`this` визначається способом виклику:

    user.greet();

---

# Найпростіший приклад

    const user = {

        name: "John",

        greet() {
            console.log(this.name);
        }

    };

    user.greet();

Результат:

    John

Тут:

    this → user

Тому:

    this.name

означає:

    user.name

---

# `this` у Method Call

Класична форма:

    object.method();

Наприклад:

    const user = {

        name: "John",

        sayName() {
            console.log(this.name);
        }

    };

    user.sayName();

Тут:

    this === user

---

# `this` залежить від Call-Site

Порівняй:

    const user = {

        name: "John",

        greet() {
            console.log(this.name);
        }

    };

    user.greet();

і:

    const greet = user.greet;

    greet();

У першому:

    user.greet()
        ↓
    this → user

У другому:

    greet()
        ↓
    немає object перед викликом

Тому правила `this` будуть іншими.

---

# Чотири основні способи визначення `this`

Для звичайних functions корисно пам'ятати чотири основні правила:

    1. Default binding
    2. Implicit binding
    3. Explicit binding
    4. New binding

А для arrow functions діє інша модель:

    5. Lexical this

---

# 1. Default Binding

Standalone function call:

    function showThis() {
        console.log(this);
    }

    showThis();

У strict mode:

    this === undefined

Без strict mode поведінка залежить від середовища виконання.

У браузерному classic script у non-strict режимі `this` може бути:

    window

У сучасному JavaScript краще не покладатися на таку поведінку.

---

# Strict Mode

Наприклад:

    "use strict";

    function showThis() {
        console.log(this);
    }

    showThis();

Результат:

    undefined

Тому:

    function call
        +
    strict mode
        ↓
    this === undefined

---

# Non-Strict Mode

Наприклад у browser classic script:

    function showThis() {
        console.log(this);
    }

    showThis();

У non-strict режимі `this` може бути глобальним object:

    window

Але не варто будувати код на implicit conversion.

Краще чітко розуміти:

    strict mode
        ↓
    standalone function
        ↓
    this === undefined

---

# 2. Implicit Binding

Якщо function викликається як method:

    object.method();

то `this` — object перед крапкою.

Наприклад:

    const user = {

        name: "John",

        greet() {
            console.log(this);
        }

    };

    user.greet();

Результат:

    user object

---

# Object Before the Dot

Корисна навчальна модель:

    user.greet()
       ↑
       |
    object перед dot

Тому:

    this → user

Наприклад:

    const car = {

        brand: "Toyota",

        showBrand() {
            console.log(this.brand);
        }

    };

    car.showBrand();

Результат:

    Toyota

---

# Nested Objects

Наприклад:

    const company = {

        name: "ABC",

        department: {

            name: "Development",

            showName() {
                console.log(this.name);
            }

        }

    };

    company.department.showName();

`this`:

    company.department

а не:

    company

Тому результат:

    Development

---

# Найближчий Object

У:

    company.department.showName();

для method call:

    this → department

Не:

    company

Тобто:

    company
        ↓
    department
        ↓
    showName()

    this → department

---

# 3. Explicit Binding

JavaScript дозволяє явно вказати `this`.

Для цього використовуються:

    call()
    apply()
    bind()

---

# `call()`

Синтаксис:

    function.call(thisArg, arg1, arg2);

Наприклад:

    function greet() {
        console.log(this.name);
    }

    const user = {
        name: "John"
    };

    greet.call(user);

Результат:

    John

Тут ми явно сказали:

    this → user

---

# `call()` з Arguments

    function greet(greeting, punctuation) {

        console.log(
            `${greeting}, ${this.name}${punctuation}`
        );

    }

    const user = {
        name: "John"
    };

    greet.call(
        user,
        "Hello",
        "!"
    );

Результат:

    Hello, John!

---

# `apply()`

`apply()` схожий на `call()`.

Різниця — arguments передаються array-like object.

    function greet(greeting, punctuation) {

        console.log(
            `${greeting}, ${this.name}${punctuation}`
        );

    }

    const user = {
        name: "John"
    };

    greet.apply(
        user,
        ["Hello", "!"]
    );

Результат:

    Hello, John!

---

# `call()` vs `apply()`

    call(
        thisArg,
        arg1,
        arg2
    )

    apply(
        thisArg,
        [arg1, arg2]
    )

Тобто:

    call → arguments окремо

    apply → arguments collection

---

# `bind()`

`bind()` не викликає function одразу.

Він створює нову function із прив'язаним `this`.

    const boundFunction =
        function.bind(thisArg);

Наприклад:

    function greet() {
        console.log(this.name);
    }

    const user = {
        name: "John"
    };

    const greetUser =
        greet.bind(user);

    greetUser();

Результат:

    John

---

# `bind()` vs `call()`

`call()`:

    function.call(user);

    ↓

    виконує function одразу

`bind()`:

    const fn = function.bind(user);

    ↓

    створює нову function

    fn();

    ↓

    виконує пізніше

---

# `bind()` з Arguments

Можна прив'язати не тільки `this`, а й arguments.

    function greet(greeting, name) {

        console.log(
            `${greeting}, ${name}`
        );

    }

    const hello =
        greet.bind(null, "Hello");

    hello("John");

Результат:

    Hello, John

---

# Detached Method

Одна з найважливіших проблем.

    const user = {

        name: "John",

        greet() {
            console.log(this.name);
        }

    };

    user.greet();

Працює:

    John

Але:

    const greet = user.greet;

    greet();

Тепер method від'єднаний від object.

Було:

    user.greet()

Стало:

    greet()

Тому `this` більше не прив'язаний до `user` через implicit binding.

---

# Detached Method у Callback

Наприклад:

    const user = {

        name: "John",

        greet() {
            console.log(this.name);
        }

    };

    setTimeout(user.greet, 1000);

Тут передається сама function:

    user.greet

а не method call:

    user.greet()

Тому `this` не зберігається автоматично як `user`.

---

# Вирішення через `bind()`

    setTimeout(
        user.greet.bind(user),
        1000
    );

Тепер:

    bind(user)
        ↓
    this → user

---

# 4. New Binding

Коли function викликається через:

    new

створюється новий object, і `this` всередині constructor function посилається на нього.

Наприклад:

    function User(name) {

        this.name = name;

    }

    const user =
        new User("John");

Тут:

    this → new object

Після виконання:

    user.name

дає:

    John

---

# Як працює `new`

Спрощено:

    new User("John")

можна уявляти як:

    1. створити новий object

    2. встановити prototype

    3. прив'язати this до нового object

    4. виконати function

    5. повернути object

Тобто:

    this → newly created object

---

# Constructor Function

До появи `class` constructor functions широко використовувалися.

    function Person(name) {

        this.name = name;

        this.sayHello = function () {
            console.log(
                `Hello, ${this.name}`
            );
        };
    }

    const person =
        new Person("John");

`this` посилається на створений object.

---

# `this` у Class

У class:

    class User {

        constructor(name) {
            this.name = name;
        }

        greet() {
            console.log(this.name);
        }

    }

    const user =
        new User("John");

    user.greet();

Результат:

    John

У:

    user.greet()

`this`:

    user

---

# Class Method

    class User {

        constructor(name) {
            this.name = name;
        }

        greet() {
            console.log(
                `Hello, ${this.name}`
            );
        }

    }

    const user =
        new User("John");

    user.greet();

Тут:

    this === user

---

# `this` у Constructor

    class User {

        constructor(name) {

            this.name = name;

        }

    }

    const user =
        new User("John");

У constructor:

    this → newly created instance

---

# `this` у Static Method

У class static method:

    class MathUtils {

        static double(value) {
            return value * 2;
        }

    }

Виклик:

    MathUtils.double(5);

Тут `this` у static method може бути:

    MathUtils

Але static method не працює з instance `this`.

---

# Arrow Function

Arrow function має особливе правило.

Вона **не створює власний `this`**.

Замість цього використовує `this` із зовнішнього lexical context.

Наприклад:

    const user = {

        name: "John",

        greet() {

            const inner = () => {
                console.log(this.name);
            };

            inner();
        }

    };

    user.greet();

Результат:

    John

Arrow function бере `this` із:

    greet()

де:

    this → user

---

# Arrow Function та Lexical `this`

Схема:

    user.greet()
          ↓
    this → user
          ↓
    arrow function
          ↓
    використовує зовнішній this
          ↓
    user

Тому:

    arrow this
        ↓
    lexical

---

# Arrow Function не має власного `this`

Наприклад:

    const arrow = () => {
        console.log(this);
    };

`this` тут не визначається способом:

    arrow()

як у звичайної function.

Arrow function бере `this` із зовнішнього context.

---

# Звичайна Function vs Arrow Function

Звичайна:

    const user = {

        name: "John",

        greet: function () {
            console.log(this.name);
        }

    };

    user.greet();

    // John

Arrow:

    const user = {

        name: "John",

        greet: () => {
            console.log(this.name);
        }

    };

Це не еквівалентні записи.

Arrow function не отримує `this` від:

    user.greet()

Вона використовує lexical `this`.

---

# Важливе правило для Object Methods

Не використовуй arrow function як method, якщо тобі потрібен dynamic `this`.

Наприклад:

    const user = {

        name: "John",

        greet: () => {
            console.log(this.name);
        }

    };

Це не буде працювати як звичайний object method.

Краще:

    const user = {

        name: "John",

        greet() {
            console.log(this.name);
        }

    };

---

# Arrow Function у Callback

Ось де arrow function дуже корисна.

    const user = {

        name: "John",

        greet() {

            setTimeout(() => {

                console.log(this.name);

            }, 1000);

        }

    };

    user.greet();

Arrow callback використовує `this` із `greet()`.

Тобто:

    greet()
      ↓
    this → user
      ↓
    arrow callback
      ↓
    this → user

---

# Старий спосіб з `self`

До arrow functions часто використовували:

    const self = this;

Наприклад:

    const user = {

        name: "John",

        greet() {

            const self = this;

            setTimeout(function () {

                console.log(self.name);

            }, 1000);

        }

    };

Сьогодні набагато природніше:

    setTimeout(() => {
        console.log(this.name);
    }, 1000);

---

# `this` та `call()` для Arrow Function

Arrow function не має власного `this`.

Тому:

    const arrow = () => {
        console.log(this);
    };

    arrow.call(user);

не робить:

    this → user

`call()` не може змінити lexical `this` arrow function.

Так само:

    apply()
    bind()

не можуть змінити її lexical `this`.

---

# `bind()` та Arrow Function

Наприклад:

    const arrow = () => {
        console.log(this);
    };

    const bound =
        arrow.bind(user);

`bound()` не отримує `this` як `user` через `bind()`.

Arrow function уже має lexical `this`.

---

# Arrow Function та `arguments`

Arrow function також не має власного `arguments`.

Наприклад:

    function outer() {

        const arrow = () => {
            console.log(arguments);
        };

        arrow();
    }

`arrow` використовує `arguments` із outer function.

Це схоже на lexical behavior `this`.

---

# `this` та Regular Function

Звичайна function:

    function greet() {
        console.log(this);
    }

Її `this` залежить від call-site.

---

# `this` та Arrow Function

Arrow function:

    const greet = () => {
        console.log(this);
    };

Її `this` визначається lexical environment.

Тому:

    regular function
        ↓
    dynamic this

    arrow function
        ↓
    lexical this

Це одна з найважливіших відмінностей.

---

# Event Handler та `this`

У DOM event handlers звичайна function може отримувати `this`, пов'язаний із element.

Наприклад:

    button.addEventListener(
        "click",
        function () {
            console.log(this);
        }
    );

Для звичайного listener function `this` зазвичай є element, на якому listener встановлений.

---

# Arrow Function у Event Handler

Якщо використати arrow:

    button.addEventListener(
        "click",
        () => {
            console.log(this);
        }
    );

Arrow function не отримує dynamic `this` від event target.

Вона використовує `this` із зовнішнього lexical scope.

Тому для доступу до element часто використовують:

    event.currentTarget

Наприклад:

    button.addEventListener(
        "click",
        (event) => {
            console.log(
                event.currentTarget
            );
        }
    );

---

# `event.target` vs `event.currentTarget`

Це не те саме, що `this`, але важливо для DOM.

    event.target

→ element, на якому фактично відбулася подія.

    event.currentTarget

→ element, на якому встановлений поточний listener.

Наприклад:

    button.addEventListener(
        "click",
        (event) => {
            console.log(
                event.currentTarget
            );
        }
    );

---

# `this` у Browser

У браузері є global object:

    window

Також стандартний глобальний reference:

    globalThis

У browser environment:

    globalThis === window

для звичайного browser global context.

Але `this` у різних script/module contexts поводиться по-різному.

---

# `globalThis`

`globalThis` — стандартний спосіб отримати global object.

Наприклад:

    console.log(globalThis);

У браузері це зазвичай:

    window

У Node.js це:

    global

Тому:

    globalThis

є універсальнішим способом звернення до global object.

---

# `this` у Browser Classic Script

У classic script top-level:

    console.log(this);

може бути:

    window

Наприклад:

    <script>

        console.log(this);

    </script>

У classic browser script top-level `this` має global behavior.

---

# `this` у ES Module

В ES module:

    console.log(this);

Результат:

    undefined

Наприклад:

    <script type="module">

        console.log(this);

    </script>

Це одна з важливих відмінностей classic scripts та modules.

---

# `this` у Node.js

Поведінка `this` у Node.js залежить від module system та контексту.

Тому не варто переносити правила:

    browser → Node.js

автоматично.

Особливо потрібно розрізняти:

    CommonJS
    ES Modules

та:

    top-level this
    function this
    method this

---

# `this` та ES Modules

У module code top-level:

    this

є:

    undefined

Але це не означає, що всі functions автоматично мають:

    this === undefined

У method calls та інших invocation patterns діють відповідні правила.

---

# `this` та Object Reference

Важливе питання:

    const user = {
        name: "John"
    };

    const fn = user.greet;

Що буде `this`?

Не потрібно думати:

    fn → user

Тому що function можна від'єднати від object.

Було:

    user.greet()

Стало:

    fn()

Зник object receiver.

---

# Method Borrowing

Один object може використовувати method іншого object через `call()`.

Наприклад:

    const user = {

        name: "John",

        greet() {
            console.log(this.name);
        }

    };

    const admin = {
        name: "Admin"
    };

    user.greet.call(admin);

Результат:

    Admin

Ми позичили method:

    user.greet

і встановили:

    this → admin

---

# Function Borrowing

Це називають method borrowing або function borrowing.

    objectA.method.call(objectB);

Метод `objectA` працює з:

    this → objectB

---

# `this` та Object Destructuring

Наприклад:

    const user = {

        name: "John",

        greet() {
            console.log(this.name);
        }

    };

    const { greet } = user;

    greet();

Destructuring від'єднав function від object.

Тому:

    greet()

не є:

    user.greet()

---

# Як зберегти `this` після Destructuring

Можна використати `bind()`:

    const greet =
        user.greet.bind(user);

    greet();

Тепер:

    this → user

---

# `this` та Nested Function

Наприклад:

    const user = {

        name: "John",

        greet() {

            function inner() {
                console.log(this.name);
            }

            inner();
        }

    };

    user.greet();

Тут `inner()` — standalone function call.

Її `this` не автоматично:

    user

Це відрізняється від arrow function.

---

# Nested Arrow Function

    const user = {

        name: "John",

        greet() {

            const inner = () => {
                console.log(this.name);
            };

            inner();
        }

    };

    user.greet();

Arrow function використовує `this` з `greet()`.

Тому:

    this → user

---

# Regular Nested Function vs Arrow

    const user = {

        name: "John",

        greet() {

            function regular() {
                console.log(this.name);
            }

            const arrow = () => {
                console.log(this.name);
            };

            regular();
            arrow();
        }

    };

Це два різні механізми.

    regular()
        ↓
    власний this

    arrow()
        ↓
    lexical this

---

# `this` у `forEach`

Наприклад:

    const user = {

        name: "John",

        show() {

            [1, 2, 3].forEach(
                function () {
                    console.log(this.name);
                }
            );

        }

    };

Звичайний callback не отримує автоматично:

    this → user

Можна передати `thisArg`:

    [1, 2, 3].forEach(
        function () {
            console.log(this.name);
        },
        user
    );

Або сучасніше — arrow function:

    [1, 2, 3].forEach(() => {
        console.log(this.name);
    });

Arrow бере `this` із `show()`.

---

# `thisArg` у Array Methods

Деякі array methods приймають `thisArg`.

Наприклад:

    array.forEach(callback, thisArg)

    array.map(callback, thisArg)

    array.filter(callback, thisArg)

Але arrow function ігнорує цей механізм для свого `this`.

Наприклад:

    [1, 2, 3].forEach(
        () => {
            console.log(this);
        },
        user
    );

`this` arrow function не стане `user`.

---

# `this` у `map`

Звичайна function:

    const user = {
        multiplier: 2
    };

    const numbers = [1, 2, 3];

    const result = numbers.map(
        function (value) {
            return value * this.multiplier;
        },
        user
    );

Результат:

    [2, 4, 6]

---

# `this` у `filter`

    const config = {
        min: 5
    };

    const numbers = [1, 5, 10];

    const result = numbers.filter(
        function (value) {
            return value >= this.min;
        },
        config
    );

Результат:

    [5, 10]

---

# `this` у `reduce`

`reduce()` не має стандартного `thisArg` parameter.

Тому для такого коду краще використовувати closure або arrow:

    const config = {
        multiplier: 2
    };

    const numbers = [1, 2, 3];

    const result = numbers.reduce(
        (sum, value) =>
            sum + value * config.multiplier,
        0
    );

---

# `this` та Prototype

Methods, які знаходяться в prototype, все одно можуть використовувати `this`.

Наприклад:

    function User(name) {
        this.name = name;
    }

    User.prototype.greet = function () {
        console.log(this.name);
    };

    const user =
        new User("John");

    user.greet();

Тут:

    this → user

Method знаходиться в prototype, але викликається як:

    user.greet()

---

# Prototype Method та Detached Function

    const greet = user.greet;

    greet();

Тепер function більше не викликається як:

    user.greet()

Тому `this` змінюється відповідно до нового call-site.

---

# `this` та Inheritance

У class inheritance:

    class Animal {

        constructor(name) {
            this.name = name;
        }

        speak() {
            console.log(this.name);
        }

    }

    class Dog extends Animal {

        bark() {
            console.log(
                `${this.name} barks`
            );
        }

    }

    const dog =
        new Dog("Rex");

    dog.bark();

Тут:

    this → dog

---

# `super`

У class:

    class Animal {

        speak() {
            console.log("Animal");
        }

    }

    class Dog extends Animal {

        speak() {

            super.speak();

            console.log("Dog");

        }

    }

`super.speak()` викликає parent method.

`this` у method залишається пов'язаним із поточним instance.

---

# `this` та `super`

Наприклад:

    class Animal {

        constructor(name) {
            this.name = name;
        }

    }

    class Dog extends Animal {

        constructor(name) {

            super(name);

            console.log(this.name);

        }

    }

    const dog =
        new Dog("Rex");

`super(name)` викликає parent constructor.

Після цього:

    this → dog

---

# `this` та `bind`

`bind()` часто потрібен, коли method передається як callback.

Наприклад:

    class Counter {

        constructor() {

            this.count = 0;

            this.increment =
                this.increment.bind(this);

        }

        increment() {
            this.count++;
        }

    }

Тепер:

    setTimeout(
        counter.increment,
        1000
    );

може викликати method із правильним:

    this → counter

---

# Class Method як Callback

Без bind:

    class Counter {

        count = 0;

        increment() {
            this.count++;
        }

    }

    const counter =
        new Counter();

    setTimeout(
        counter.increment,
        1000
    );

Method може втратити receiver.

---

# Arrow Property у Class

Ще один підхід:

    class Counter {

        count = 0;

        increment = () => {
            this.count++;
        };

    }

Тут arrow function створюється для instance і захоплює lexical `this`.

Це популярний pattern, але він має інші memory/prototype characteristics, ніж звичайний prototype method.

---

# `this` та Factory Functions

Factory function часто не потребує `this`.

Наприклад:

    function createUser(name) {

        return {
            name,

            greet() {
                console.log(this.name);
            }

        };

    }

    const user =
        createUser("John");

    user.greet();

Тут `this` все одно працює як object receiver.

Але можна написати factory і без `this`:

    function createUser(name) {

        return {

            name,

            greet() {
                console.log(name);
            }

        };

    }

Тут `name` приходить через closure.

---

# Closure vs `this`

Порівняй:

    function createUser(name) {

        return {

            greet() {
                console.log(name);
            }

        };

    }

Тут:

    name → closure

А:

    function createUser(name) {

        return {

            greet() {
                console.log(this.name);
            }

        };

    }

Тут:

    this → object receiver

Це два різні способи отримання даних.

---

# `this` та Closure разом

Вони можуть використовуватися разом.

    const user = {

        name: "John",

        greet() {

            const message = "Hello";

            setTimeout(() => {

                console.log(
                    message,
                    this.name
                );

            }, 1000);

        }

    };

Тут arrow callback має доступ до:

    message
        ↓
    closure / lexical scope

і:

    this
        ↓
    lexical this із greet()

---

# `this` у IIFE

У звичайній IIFE:

    (function () {

        console.log(this);

    })();

`this` визначається способом виклику та strict mode.

У strict mode:

    (function () {

        "use strict";

        console.log(this);

    })();

Результат:

    undefined

---

# Arrow IIFE

    (() => {

        console.log(this);

    })();

Arrow function бере `this` із зовнішнього context.

---

# `this` та Global Variable

Не потрібно ототожнювати:

    variable

і:

    this.property

Наприклад у module:

    const name = "John";

    console.log(this.name);

Це не означає:

    this.name === name

Lexical variable та object property — різні bindings.

---

# `this` та `globalThis`

`globalThis` — object reference.

Наприклад:

    globalThis.name = "John";

    console.log(
        globalThis.name
    );

А `this` — context-dependent value.

Тому:

    this
        ≠
    globalThis

автоматично у всіх ситуаціях.

---

# `this` у Strict Mode

Strict mode робить default behavior більш передбачуваним.

    "use strict";

    function test() {
        console.log(this);
    }

    test();

Результат:

    undefined

---

# Strict Mode у Class

Class body завжди виконується у strict mode.

Наприклад:

    class User {

        method() {
            console.log(this);
        }

    }

Standalone call detached method:

    const user =
        new User();

    const method =
        user.method;

    method();

`this` буде:

    undefined

---

# `this` та Modules

ES modules працюють у strict mode.

Тому top-level:

    this

є:

    undefined

Це одна з причин, чому browser module code відрізняється від classic script.

---

# `this` та Method Call

Запам'ятай:

    object.method()

зазвичай:

    this → object

---

# `this` та Function Call

Запам'ятай:

    method()

не означає:

    this → object

якщо function була від'єднана від object.

У strict mode:

    this → undefined

---

# `this` та `call()`

Запам'ятай:

    fn.call(object)

означає:

    this → object

---

# `this` та `apply()`

Запам'ятай:

    fn.apply(object, args)

означає:

    this → object

---

# `this` та `bind()`

Запам'ятай:

    const fn =
        original.bind(object);

означає:

    fn()
        ↓
    this → object

---

# `this` та `new`

Запам'ятай:

    new Constructor()

означає:

    this → new instance

---

# `this` та Arrow

Запам'ятай:

    arrow()

не отримує власний `this`.

Arrow використовує:

    outer this

---

# Пріоритет правил `this`

Для звичайних functions корисно мислити приблизно так:

    new
        ↓
    explicit binding
        ↓
    implicit binding
        ↓
    default binding

Але є важливі нюанси, особливо з arrow functions та bound functions.

---

# `new` vs `call`

Для constructor-style function:

    function User(name) {
        this.name = name;
    }

    const user =
        new User("John");

`new` створює instance і встановлює `this`.

---

# `call()` vs `bind()`

    fn.call(user);

    ↓
    виклик зараз


    fn.bind(user);

    ↓
    нова function на майбутнє

---

# `call()` vs Method Call

Ці два виклики можуть дати однаковий `this`:

    user.greet();

і:

    greet.call(user);

У першому випадку:

    implicit binding

У другому:

    explicit binding

---

# `this` у Getter

`this` також використовується у getters.

    const user = {

        firstName: "John",
        lastName: "Smith",

        get fullName() {

            return `${this.firstName} ${this.lastName}`;

        }

    };

    console.log(user.fullName);

Результат:

    John Smith

---

# `this` у Setter

    const user = {

        firstName: "John",

        set name(value) {
            this.firstName = value;
        }

    };

    user.name = "Peter";

Тут:

    this → user

---

# `this` у Object Method Shorthand

Сучасний syntax:

    const user = {

        name: "John",

        greet() {
            console.log(this.name);
        }

    };

Це зручний syntax для method.

---

# `this` у Computed Method

Наприклад:

    const methodName = "greet";

    const user = {

        name: "John",

        [methodName]() {
            console.log(this.name);
        }

    };

    user.greet();

`this`:

    user

---

# Типова помилка №1

❌ Думати:

    this = object where function was defined

Це не загальне правило.

Для звичайної function важливий:

    call-site

---

# Типова помилка №2

❌ Думати:

    this завжди object

Ні.

`this` може бути:

    object
    undefined
    global object
    new instance
    інше значення

---

# Типова помилка №3

❌ Думати, що arrow function має власний `this`.

Ні.

Arrow function використовує lexical `this`.

---

# Типова помилка №4

❌ Вважати:

    user.method

та:

    user.method()

одним і тим самим.

Ні.

Перше:

    reference до function

Друге:

    invocation

---

# Типова помилка №5

❌ Передавати method як callback і очікувати, що `this` автоматично залишиться object.

Наприклад:

    setTimeout(
        user.greet,
        1000
    );

Для збереження receiver:

    setTimeout(
        user.greet.bind(user),
        1000
    );

---

# Типова помилка №6

❌ Використовувати arrow function як object method, коли потрібен dynamic `this`.

Не:

    const user = {

        name: "John",

        greet: () => {
            console.log(this.name);
        }

    };

Краще:

    const user = {

        name: "John",

        greet() {
            console.log(this.name);
        }

    };

---

# Типова помилка №7

❌ Плутати `this` та closure.

    this
        ↓
    invocation / lexical this

    closure
        ↓
    lexical variables

---

# Типова помилка №8

❌ Вважати, що `bind()` змінює оригінальну function.

Ні.

    const bound =
        fn.bind(user);

створює нову bound function.

---

# Типова помилка №9

❌ Вважати, що `call()` та `bind()` роблять одне й те саме.

    call()
        ↓
    викликає зараз

    bind()
        ↓
    повертає нову function

---

# Типова помилка №10

❌ Вважати, що `call()` може змінити `this` arrow function.

Не може.

Arrow function має lexical `this`.

---

# Як аналізувати `this`

Коли бачиш:

    function fn() {
        console.log(this);
    }

не поспішай відповідати.

Спочатку знайди:

    CALL SITE

Потім запитай:

    1. Це arrow function?
    2. Чи використовується new?
    3. Чи використовується call/apply/bind?
    4. Чи є object перед крапкою?
    5. Чи це standalone function call?
    6. Чи strict mode?
    7. Чи це class?
    8. Чи це callback?
    9. Чи function була detached?

---

# Алгоритм визначення `this`

## Крок 1

Перевір:

    arrow function?

Якщо так:

    lexical this

---

## Крок 2

Перевір:

    new fn()

Якщо так:

    this → new instance

---

## Крок 3

Перевір:

    fn.call(obj)
    fn.apply(obj)
    fn.bind(obj)

Якщо так:

    this → obj

для звичайної function.

---

## Крок 4

Перевір:

    obj.fn()

Якщо так:

    this → obj

---

## Крок 5

Інакше:

    fn()

У strict mode:

    this → undefined

У non-strict classic function можуть діяти global/default правила середовища.

---

# Ментальна модель

Для звичайної function:

    function fn() {}

Не питай:

    "Хто власник цієї function?"

Питай:

    "Як її викликали?"

---

# Call-Site

Наприклад:

    const user = {

        name: "John",

        greet() {
            console.log(this.name);
        }

    };

Call-site:

    user.greet();

Рішення:

    object.method()
        ↓
    this → user

---

# Другий Call-Site

    const greet = user.greet;

    greet();

Рішення:

    standalone function
        ↓
    strict mode
        ↓
    this → undefined

---

# Третій Call-Site

    user.greet.call(admin);

Рішення:

    explicit binding
        ↓
    this → admin

---

# Четвертий Call-Site

    const greet =
        user.greet.bind(admin);

    greet();

Рішення:

    bound function
        ↓
    this → admin

---

# П'ятий Call-Site

    new user.greet();

У такій конструкції потрібно уважно враховувати precedence та parsing expression.

Для навчання краще використовувати явний constructor:

    new User();

а не комбінувати `new` з object methods без потреби.

---

# Практичні завдання

## Завдання 1 — Object Method

Створи object:

    const user = {
        name: "John",

        greet() {
            // ...
        }
    };

Зроби так, щоб:

    user.greet();

виводив:

    Hello, John

---

## Завдання 2 — `this`

Визнач результат:

    const user = {

        name: "John",

        greet() {
            console.log(this.name);
        }

    };

    user.greet();

---

## Завдання 3 — Detached Method

Визнач результат:

    const user = {

        name: "John",

        greet() {
            console.log(this.name);
        }

    };

    const greet = user.greet;

    greet();

Поясни, чому результат відрізняється від:

    user.greet();

---

## Завдання 4 — `call()`

Є:

    function greet() {
        console.log(this.name);
    }

    const user = {
        name: "John"
    };

Виклич:

    greet()

так, щоб `this` був `user`.

---

## Завдання 5 — `apply()`

Передай у function два arguments через:

    apply()

та встанови:

    this → user

---

## Завдання 6 — `bind()`

Створи:

    const greetUser = ...

так, щоб:

    greetUser();

використовував:

    this → user

---

## Завдання 7 — Counter

Створи class:

    Counter

з:

    count

та:

    increment()

Перевір:

    const counter = new Counter();

    counter.increment();

    console.log(counter.count);

---

## Завдання 8 — Detached Class Method

Створи:

    class User {

        constructor(name) {
            this.name = name;
        }

        greet() {
            console.log(this.name);
        }

    }

Від'єднай `greet` та поясни, чому `this` втрачається.

---

## Завдання 9 — Bind Class Method

Виправ попередній приклад через:

    bind()

---

## Завдання 10 — Arrow Callback

Створи:

    user.greet()

який використовує:

    setTimeout()

та arrow callback.

Callback повинен мати доступ до:

    this.name

---

## Завдання 11 — Regular Callback

Перепиши попередній приклад із regular function.

Поясни, чому:

    this

відрізняється.

---

## Завдання 12 — Method Borrowing

Є:

    const user = {
        name: "John",

        greet() {
            console.log(this.name);
        }
    };

    const admin = {
        name: "Admin"
    };

Використай:

    call()

щоб:

    user.greet()

працював із:

    admin

---

# Практика: передбач результат

## Приклад 1

    const user = {
        name: "John",

        greet() {
            return this.name;
        }
    };

    console.log(user.greet());

Що буде?

---

## Приклад 2

    const user = {
        name: "John",

        greet() {
            return this.name;
        }
    };

    const fn = user.greet;

    console.log(fn());

Що буде у strict mode?

---

## Приклад 3

    const user = {
        name: "John",

        greet() {
            return this.name;
        }
    };

    console.log(
        user.greet.call({
            name: "Peter"
        })
    );

Що буде?

---

## Приклад 4

    const user = {
        name: "John",

        greet() {
            const fn = () => {
                return this.name;
            };

            return fn();
        }
    };

    console.log(user.greet());

Що буде?

---

## Приклад 5

    const user = {

        name: "John",

        greet: () => {
            return this.name;
        }

    };

    console.log(user.greet());

Чому результат не такий, як можна очікувати?

---

# Питання зі співбесіди

Що таке `this`?

Від чого залежить `this` у звичайної function?

Що таке call-site?

Що таке implicit binding?

Що таке explicit binding?

Що таке default binding?

Що таке new binding?

Що таке lexical `this`?

Чим arrow function відрізняється від regular function щодо `this`?

Чому `this` у:

    object.method()

відрізняється від:

    const fn = object.method;
    fn();

Що робить `call()`?

Що робить `apply()`?

Що робить `bind()`?

Яка різниця між `call()` та `apply()`?

Яка різниця між `call()` та `bind()`?

Чому `bind()` повертає нову function?

Чи можна змінити `this` arrow function через `call()`?

Чи можна змінити `this` arrow function через `bind()`?

Що відбувається з `this` у strict mode?

Що відбувається з `this` у standalone function?

Що таке detached method?

Чому method може втратити `this`?

Як виправити detached method?

Як працює `this` у class?

Що таке `this` у constructor?

Що відбувається при використанні `new`?

Як `this` працює в prototype methods?

Як `this` працює в event handlers?

Чим `event.target` відрізняється від `event.currentTarget`?

Як arrow function змінює поведінку `this` в event handler?

Що таке method borrowing?

Як використовувати `call()` для method borrowing?

Чим closure відрізняється від `this`?

---

# Junior Level

Потрібно вміти:

    пояснити this простими словами

    розуміти call-site

    розуміти object.method()

    розуміти standalone function call

    розуміти strict mode

    розуміти arrow function

    розуміти lexical this

    знати call()

    знати apply()

    знати bind()

    розуміти new

    розуміти this у class

    розуміти detached method

    виправляти detached method через bind()

    розуміти this у callback

    розуміти this у DOM event handler

---

# Middle Level

Потрібно розуміти:

    default binding

    implicit binding

    explicit binding

    new binding

    lexical this

    call-site

    method borrowing

    function borrowing

    bind()

    callback context

    thisArg

    prototype methods

    class methods

    class constructors

    inheritance

    super

    detached methods

    this у asynchronous callbacks

    this у event handlers

    this у array methods

    this у CommonJS / ES Modules

    this у browser

    this у Node.js

    взаємодію this та closure

---

# Senior Level

Глибше розуміння:

    ECMAScript this binding

    execution contexts

    Function Environment Records

    [[ThisMode]]

    lexical-this

    [[ThisValue]]

    [[ThisBindingStatus]]

    ResolveThisBinding

    GetThisBinding

    OrdinaryCallBindThis

    Call

    Construct

    [[Call]]

    [[Construct]]

    bound functions

    BoundFunctionCreate

    constructor semantics

    prototype chain

    super property references

    Reference Records

    base value

    property reference

    environment reference

    strict mode semantics

    module semantics

    global environment

    global this binding

    host-defined behavior

    event listener invocation

    callback context

    class fields

    arrow function semantics

    lexical environment interaction

---

# Міні-шпаргалка

## Regular Function

    function fn() {}

    this
        ↓
    залежить від call-site

---

## Method Call

    object.fn();

    this
        ↓
    object

---

## Standalone Call

    fn();

У strict mode:

    this
        ↓
    undefined

---

## `call()`

    fn.call(object);

    this
        ↓
    object

---

## `apply()`

    fn.apply(object, args);

    this
        ↓
    object

---

## `bind()`

    const newFn =
        fn.bind(object);

    newFn();

    this
        ↓
    object

---

## `new`

    new Constructor();

    this
        ↓
    new instance

---

## Arrow

    const fn = () => {};

    this
        ↓
    lexical outer this

---

# Головна таблиця

| Виклик | `this` для regular function |
|---|---|
| `fn()` | `undefined` у strict mode |
| `obj.fn()` | `obj` |
| `fn.call(obj)` | `obj` |
| `fn.apply(obj, args)` | `obj` |
| `fn.bind(obj)` | `obj` при подальшому виклику |
| `new Fn()` | новий instance |
| arrow function | власного `this` немає |

---

# Regular Function vs Arrow Function

| Характеристика | Regular Function | Arrow Function |
|---|---|---|
| Власний `this` | Так | Ні |
| `this` залежить від call-site | Так | Ні |
| Lexical `this` | Ні | Так |
| `call()` змінює `this` | Так | Ні |
| `apply()` змінює `this` | Так | Ні |
| `bind()` змінює `this` | Так | Ні |
| Підходить як object method | Так | Зазвичай ні |
| Підходить для callback | Так | Так |
| Constructor через `new` | Так, якщо callable/constructable | Ні |

---

# Найважливіші приклади

## Method

    const user = {

        name: "John",

        greet() {
            console.log(this.name);
        }

    };

    user.greet();

    // John

---

## Detached Method

    const greet = user.greet;

    greet();

`this` більше не прив'язаний до `user`.

---

## `call`

    greet.call(user);

`this`:

    user

---

## `bind`

    const boundGreet =
        greet.bind(user);

    boundGreet();

`this`:

    user

---

## `new`

    function User(name) {
        this.name = name;
    }

    const user =
        new User("John");

`this`:

    user

---

## Arrow

    const user = {

        name: "John",

        greet() {

            const fn = () => {
                console.log(this.name);
            };

            fn();
        }

    };

Arrow використовує:

    this
    ↓
    greet()
    ↓
    user

---

# Ментальна модель №1

Для regular function:

    function
        ↓
    як викликана?
        ↓
    визначає this

---

# Ментальна модель №2

Для arrow function:

    arrow
        ↓
    власного this немає
        ↓
    взяти this із зовнішнього context

---

# Ментальна модель №3

Запам'ятай:

    user.greet()

це:

    method call

а:

    const greet = user.greet;

    greet();

це:

    standalone function call

Це можуть бути **дві різні ситуації для `this`**.

---

# Ментальна модель №4

`this` не означає:

    "де function створена"

Для regular function думай:

    "Як function викликали?"

Для arrow function думай:

    "Який this був у зовнішньому lexical context?"

---

# Ментальна модель №5

Closure:

    function
        ↓
    lexical variables

`this`:

    function invocation
        ↓
    this binding

Arrow:

    lexical this

---

# Зв'язок з попередньою темою

    07. Closures
          ↓
    lexical scope
          ↓
    lexical environment
          ↓
    captured variables
          ↓
    closure

А поруч:

    08. this
          ↓
    function invocation
          ↓
    call-site
          ↓
    this binding
          ↓
    object methods
    call/apply/bind
    new
    classes
    arrow functions

Особливо важливо розділяти:

    Closure
        ↓
    lexical variables

і:

    this
        ↓
    invocation context

---

# Головне

• `this` — спеціальне значення JavaScript, пов'язане з контекстом виконання function.

• Для regular function `this` переважно визначається способом виклику.

• Найважливіше питання:

    "Як function викликали?"

• У:

    object.method()

для regular method `this` зазвичай є `object`.

• У standalone function call:

    fn()

у strict mode `this` дорівнює `undefined`.

• `call()` дозволяє явно встановити `this`.

• `apply()` дозволяє явно встановити `this` та передати arguments як array-like collection.

• `bind()` створює нову function із прив'язаним `this`.

• `new` встановлює `this` на новий instance.

• Arrow function не має власного `this`.

• Arrow function використовує lexical `this`.

• `call()`, `apply()` та `bind()` не можуть змінити lexical `this` arrow function.

• Arrow functions добре підходять для callbacks, коли потрібно зберегти `this` зовнішнього method/function context.

• Arrow functions зазвичай не використовують як object methods, якщо потрібен dynamic `this`.

• Detached method може втратити `this`.

• Для detached method можна використовувати:

    bind()

• `this` у class methods працює відповідно до способу виклику method.

• У constructor, викликаному через `new`, `this` — новий instance.

• Prototype methods також можуть використовувати `this`.

• `this` та closure — різні механізми.

• Closure працює з lexical variables.

• `this` для regular function працює через invocation/call-site.

• У DOM event handler regular function може мати `this`, пов'язаний із listener element.

• Arrow event handler не отримує dynamic `this` від event target.

• Для DOM краще явно використовувати:

    event.currentTarget

коли потрібен element, на якому встановлений listener.

• `this` у browser, Node.js, classic scripts та ES modules має контекстні відмінності.

• `globalThis` — стандартний спосіб звернутися до global object, але `this` не слід автоматично ототожнювати з `globalThis`.

• Найкраща ментальна модель:

    Regular Function
        ↓
    Як її викликали?
        ↓
    визначає this


    Arrow Function
        ↓
    власного this немає
        ↓
    бере this із зовнішнього lexical context

---

# Найкоротша шпаргалка

    object.method()
        ↓
    this = object


    fn.call(object)
        ↓
    this = object


    fn.apply(object, args)
        ↓
    this = object


    fn.bind(object)
        ↓
    нова function
        ↓
    this = object


    new Fn()
        ↓
    this = new instance


    fn()
        ↓
    strict mode
        ↓
    this = undefined


    arrow()
        ↓
    власного this немає
        ↓
    lexical this


# Формула

    Regular Function
        +
    Call-Site
        =
    this

    Arrow Function
        +
    Outer Lexical Context
        =
    this

Саме ці дві моделі потрібно тримати в голові, коли ти працюєш із `this`.