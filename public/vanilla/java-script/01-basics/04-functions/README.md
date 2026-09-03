## 04. Functions

Function (функція) — це окремий блок коду, який виконує певну задачу та може бути викликаний у потрібний момент.

Функції дозволяють:
- повторно використовувати код;
- розбивати програму на логічні частини;
- передавати дані у функцію;
- повертати результат;
- приховувати внутрішню реалізацію певної операції;
- будувати програму з невеликих незалежних частин.

У JavaScript функції є **first-class objects** — їх можна зберігати у змінних, передавати як аргументи та повертати з інших функцій.

### Ключові поняття

✔ function  
✔ function declaration  
✔ function expression  
✔ arrow function  
✔ function call / invocation  
✔ parameter  
✔ argument  
✔ return  
✔ return value  
✔ default parameter  
✔ rest parameter  
✔ scope  
✔ local variable  
✔ global variable  
✔ callback  
✔ higher-order function  
✔ pure function  
✔ side effect  
✔ anonymous function  
✔ function composition  
✔ first-class function  

### Що потрібно пам'ятати

• Function — блок коду, який можна викликати багато разів.

• Function declaration створюється через `function`.

• Function expression — функція, яка присвоюється змінній.

• Arrow function — короткий синтаксис для створення функцій.

• Parameter — змінна, оголошена у визначенні функції.

• Argument — конкретне значення, передане під час виклику функції.

• `return` завершує виконання функції та повертає значення.

• Якщо функція нічого не повертає явно, вона повертає `undefined`.

• Локальні змінні доступні тільки всередині відповідної функції.

• Функція може приймати інші функції як аргументи.

• Функція може повертати іншу функцію.

• У JavaScript функції є об'єктами.

• Хороша функція зазвичай виконує одну чітко визначену задачу.

• Параметри дозволяють зробити функцію універсальною.

• Default parameters дозволяють задати значення параметра за замовчуванням.

• Rest parameter `...args` дозволяє отримати невизначену кількість аргументів у вигляді масиву.

• Function declaration має особливості hoisting.

• Arrow function має іншу поведінку `this`, ніж звичайна function.

### Основні терміни

**Function**

Іменований або анонімний блок коду, який можна викликати для виконання певної задачі.

    function greet() {
        console.log("Hello");
    }

**Function Declaration**

Оголошення функції через `function`.

    function add(a, b) {
        return a + b;
    }

**Function Expression**

Функція, яка створюється як expression та присвоюється змінній.

    const add = function(a, b) {
        return a + b;
    };

**Arrow Function**

Скорочений синтаксис функції.

    const add = (a, b) => {
        return a + b;
    };

Або короткий запис:

    const add = (a, b) => a + b;

**Parameter**

Змінна у визначенні функції.

    function greet(name) {
        console.log(name);
    }

`name` — parameter.

**Argument**

Значення, яке передається функції під час виклику.

    greet("Valeriy");

`"Valeriy"` — argument.

**Return**

Повертає значення з функції.

    function square(number) {
        return number * number;
    }

    const result = square(5);

    console.log(result);
    // 25

**Return Value**

Значення, яке функція повертає через `return`.

**Function Call / Invocation**

Виклик функції.

    greet();

    add(2, 3);

**Anonymous Function**

Функція без імені.

    const greet = function() {
        console.log("Hello");
    };

**Callback**

Функція, яка передається іншій функції та викликається нею.

    function processUser(name, callback) {
        callback(name);
    }

    processUser("Valeriy", function(name) {
        console.log(`Hello, ${name}`);
    });

**Higher-Order Function**

Функція, яка:
- приймає функцію як аргумент;
- або повертає функцію;
- або робить і те, і інше.

**Pure Function**

Функція, яка для однакових вхідних даних завжди повертає однаковий результат і не має side effects.

    function add(a, b) {
        return a + b;
    }

**Side Effect**

Зміна стану або взаємодія із зовнішнім середовищем.

Наприклад:

    let count = 0;

    function increment() {
        count++;
    }

Функція змінює зовнішню змінну `count`, тому має side effect.

### Function Declaration

Базовий синтаксис:

    function functionName(parameters) {
        // code
    }

Приклад:

    function greet() {
        console.log("Hello!");
    }

Виклик:

    greet();

Функція може приймати параметри:

    function greet(name) {
        console.log(`Hello, ${name}!`);
    }

    greet("Valeriy");

Результат:

    Hello, Valeriy!

### Parameters і Arguments

Параметри описуються при створенні функції:

    function add(a, b) {
        return a + b;
    }

Аргументи передаються під час виклику:

    add(10, 20);

Тут:

    a → parameter
    b → parameter

    10 → argument
    20 → argument

Ментальна модель:

    function add(a, b) {
                 ↑  ↑
            parameters
    }

    add(10, 20);
        ↑   ↑
      arguments

### Return

`return` повертає значення з функції.

    function add(a, b) {
        return a + b;
    }

    const result = add(10, 20);

    console.log(result);
    // 30

Без `return`:

    function add(a, b) {
        a + b;
    }

    const result = add(10, 20);

    console.log(result);
    // undefined

### Return завершує функцію

Код після `return` у тому самому виконанні функції не виконується.

    function checkAge(age) {
        if (age < 18) {
            return "Minor";
        }

        return "Adult";
    }

    console.log(checkAge(15));
    // Minor

    console.log(checkAge(25));
    // Adult

Ще один приклад:

    function test() {
        return 10;

        console.log("Hello");
    }

`console.log()` не виконається.

### Функція без параметрів

    function sayHello() {
        console.log("Hello");
    }

    sayHello();

### Функція з одним параметром

    function greet(name) {
        console.log(`Hello, ${name}`);
    }

    greet("Valeriy");

### Функція з декількома параметрами

    function add(a, b) {
        return a + b;
    }

    console.log(add(5, 3));
    // 8

### Default Parameters

Можна задати параметр за замовчуванням.

    function greet(name = "Guest") {
        console.log(`Hello, ${name}`);
    }

    greet();
    // Hello, Guest

    greet("Valeriy");
    // Hello, Valeriy

Ще приклад:

    function multiply(a, b = 1) {
        return a * b;
    }

    multiply(5);
    // 5

    multiply(5, 3);
    // 15

### Function Expression

Функція може бути присвоєна змінній.

    const greet = function() {
        console.log("Hello");
    };

    greet();

З параметром:

    const add = function(a, b) {
        return a + b;
    };

    console.log(add(2, 3));
    // 5

Основна ідея:

    const functionName = function(parameters) {
        // code
    };

### Function Declaration vs Function Expression

Function Declaration:

    function add(a, b) {
        return a + b;
    }

Function Expression:

    const add = function(a, b) {
        return a + b;
    };

Обидві можуть виконувати одну й ту саму задачу.

Головна синтаксична різниця:

    function add() {}

    const add = function() {};

### Arrow Functions

Arrow function:

    const add = (a, b) => {
        return a + b;
    };

Короткий запис:

    const add = (a, b) => a + b;

Один параметр:

    const square = number => number * number;

Без параметрів:

    const greet = () => {
        console.log("Hello");
    };

Декілька параметрів:

    const add = (a, b) => a + b;

### Implicit Return

Якщо arrow function складається з одного expression, можна не писати `return`.

    const double = number => number * 2;

Це еквівалентно:

    const double = function(number) {
        return number * 2;
    };

І:

    const double = number => {
        return number * 2;
    };

### Arrow Function і Object

При поверненні object у короткому записі потрібні круглі дужки.

    const createUser = (name, age) => ({
        name,
        age
    });

    const user = createUser("Valeriy", 56);

### Scope

Scope — область видимості змінних та функцій.

Наприклад:

    function greet() {
        const message = "Hello";

        console.log(message);
    }

    greet();

Змінна `message` доступна всередині функції.

Але:

    function greet() {
        const message = "Hello";
    }

    console.log(message);

дасть помилку, тому що `message` є локальною змінною функції.

### Local Scope

Змінна, оголошена всередині функції, є локальною.

    function calculate() {
        const result = 10 + 20;

        console.log(result);
    }

    calculate();

`result` доступна всередині `calculate()`.

### Global Scope

Змінна, оголошена поза функцією, може бути доступною для функції.

    const name = "Valeriy";

    function greet() {
        console.log(name);
    }

    greet();

Функція може читати змінну із зовнішнього scope.

Але краще не створювати зайві глобальні змінні.

### Shadowing

Внутрішня змінна може мати таке саме ім'я, як зовнішня.

    const name = "Valeriy";

    function greet() {
        const name = "John";

        console.log(name);
    }

    greet();
    // John

    console.log(name);
    // Valeriy

Внутрішня `name` приховує зовнішню `name` у межах функції.

### Functions як Values

Функцію можна зберігати у змінній.

    const greet = function() {
        console.log("Hello");
    };

Функцію можна передати у змінну:

    const sayHello = greet;

    sayHello();

Обидві змінні посилаються на ту саму функцію.

### Functions як Arguments

Функцію можна передати іншій функції.

    function execute(callback) {
        callback();
    }

    function greet() {
        console.log("Hello");
    }

    execute(greet);

Тут:

    greet
      ↓
    передається як argument
      ↓
    execute(callback)

Важливо:

    execute(greet);

означає передати функцію.

А:

    execute(greet());

означає спочатку викликати `greet()` та передати її результат.

### Callback

Callback — функція, передана іншій функції.

    function process(callback) {
        callback();
    }

    process(() => {
        console.log("Done");
    });

Callback часто використовується:
- у масивах;
- таймерах;
- подіях DOM;
- асинхронному JavaScript;
- Node.js;
- Promise;
- API.

Наприклад:

    setTimeout(() => {
        console.log("Hello");
    }, 1000);

Arrow function тут є callback.

### Higher-Order Functions

Higher-order function — функція, яка працює з іншими функціями.

Наприклад:

    function repeat(action, times) {
        for (let i = 0; i < times; i++) {
            action();
        }
    }

    repeat(() => {
        console.log("Hello");
    }, 3);

`repeat()` приймає функцію `action`.

### Function Returning Function

Функція може повертати іншу функцію.

    function createGreeter(name) {
        return function() {
            console.log(`Hello, ${name}`);
        };
    }

    const greetValeriy = createGreeter("Valeriy");

    greetValeriy();

Це пов'язано з поняттям **closure**, яке буде важливим у подальшому вивченні JavaScript.

### Rest Parameters

`...` дозволяє отримати декілька аргументів як масив.

    function sum(...numbers) {
        let total = 0;

        for (const number of numbers) {
            total += number;
        }

        return total;
    }

    console.log(sum(1, 2, 3));
    // 6

    console.log(sum(1, 2, 3, 4, 5));
    // 15

У функції:

    ...numbers

`numbers` — звичайний масив.

### Rest Parameter з іншими параметрами

Rest parameter повинен бути останнім.

Правильно:

    function greet(greeting, ...names) {
        console.log(greeting);
        console.log(names);
    }

    greet("Hello", "John", "Anna", "Tom");

Результат концептуально:

    greeting → "Hello"

    names → ["John", "Anna", "Tom"]

Неправильно:

    function test(...args, value) {
        // SyntaxError
    }

### Arguments Object

У звичайних функціях існує спеціальний `arguments` object.

    function sum() {
        console.log(arguments);
    }

    sum(10, 20, 30);

Але для сучасного JavaScript зазвичай краще використовувати rest parameter:

    function sum(...numbers) {
        console.log(numbers);
    }

### Function Overloading

JavaScript не підтримує класичне function overloading так, як деякі статично типізовані мови.

Наприклад, не можна мати дві незалежні функції з однаковим ім'ям:

    function add(a, b) {
        return a + b;
    }

    function add(a, b, c) {
        return a + b + c;
    }

Друге оголошення замінить перше.

Замість цього можна використовувати параметри, default values, rest parameters або перевірки.

    function add(...numbers) {
        return numbers.reduce((sum, number) => sum + number, 0);
    }

### Function Hoisting

Function Declaration можна викликати до місця її оголошення.

    greet();

    function greet() {
        console.log("Hello");
    }

Це працює через hoisting.

Але Function Expression:

    greet();

    const greet = function() {
        console.log("Hello");
    };

не працює.

Так само arrow function:

    greet();

    const greet = () => {
        console.log("Hello");
    };

не можна використовувати до ініціалізації змінної.

Для початкового рівня достатньо запам'ятати:

    function declaration
        ↓
    має hoisting

    function expression / arrow function
        ↓
    не можна викликати до ініціалізації

### Pure Functions

Pure function:

    function multiply(a, b) {
        return a * b;
    }

Однакові аргументи:

    multiply(2, 3);
    multiply(2, 3);
    multiply(2, 3);

завжди дають:

    6

Функція не змінює зовнішні дані.

### Side Effects

Функція має side effect, якщо вона змінює зовнішній стан або взаємодіє із зовнішнім середовищем.

Наприклад:

    let count = 0;

    function increment() {
        count++;
    }

    increment();

`increment()` змінює зовнішню змінну.

Інші приклади side effects:

    console.log("Hello");

    document.body.textContent = "Hello";

    localStorage.setItem("theme", "dark");

    fetch("/api/users");

Side effects самі по собі не є поганими. Важливо контролювати їх.

### Function Composition

Function composition — побудова складнішої операції з декількох простих функцій.

Наприклад:

    function double(number) {
        return number * 2;
    }

    function addOne(number) {
        return number + 1;
    }

    const result = addOne(double(5));

    console.log(result);
    // 11

Спочатку:

    double(5)
    → 10

Потім:

    addOne(10)
    → 11

Це один із фундаментальних принципів функціонального програмування.

### Функція повинна робити одну задачу

Погано:

    function processUser(user) {
        console.log(user.name);

        const message = `Hello ${user.name}`;

        localStorage.setItem("user", JSON.stringify(user));

        return message;
    }

Тут функція одночасно:
- виводить дані;
- створює текст;
- працює з localStorage;
- повертає результат.

Краще розділити:

    function getUserMessage(user) {
        return `Hello ${user.name}`;
    }

    function saveUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    function showUser(user) {
        console.log(user.name);
    }

Це робить код простішим для тестування та повторного використання.

### Функції та умовні конструкції

Функції часто використовуються разом із `if`.

    function isAdult(age) {
        if (age >= 18) {
            return true;
        }

        return false;
    }

Можна скоротити:

    function isAdult(age) {
        return age >= 18;
    }

    console.log(isAdult(20));
    // true

    console.log(isAdult(15));
    // false

### Функції та цикли

Функція може містити цикл:

    function sumNumbers(numbers) {
        let total = 0;

        for (const number of numbers) {
            total += number;
        }

        return total;
    }

    console.log(sumNumbers([1, 2, 3, 4]));
    // 10

Або цикл може використовувати функцію:

    function greet(name) {
        console.log(`Hello, ${name}`);
    }

    const names = ["Anna", "John", "Tom"];

    for (const name of names) {
        greet(name);
    }

### Функції та масиви

Функції є основою роботи з методами масивів.

    const numbers = [1, 2, 3, 4];

    const doubled = numbers.map(number => number * 2);

    console.log(doubled);
    // [2, 4, 6, 8]

Тут:

    number => number * 2

є callback function.

Глибше `map`, `filter`, `reduce`, `find` тощо будуть розглядатися у:

    02-array-methods

### Функції та DOM

Функції дозволяють винести DOM-логіку в окремі блоки.

    function showMessage(message) {
        document.querySelector("#message").textContent = message;
    }

    showMessage("Hello!");

Це дозволяє повторно використовувати логіку.

### Функції та події

У DOM функції часто передаються як callback.

    button.addEventListener("click", function() {
        console.log("Button clicked");
    });

Або:

    function handleClick() {
        console.log("Button clicked");
    }

    button.addEventListener("click", handleClick);

Тут `handleClick` передається як callback.

### Функції та timers

Функція також може передаватися у timer.

    setTimeout(function() {
        console.log("Hello");
    }, 1000);

Або:

    setTimeout(() => {
        console.log("Hello");
    }, 1000);

### Типові помилки

❌ Плутати parameter та argument.

    function greet(name) {
        // name → parameter
    }

    greet("Valeriy");
    // "Valeriy" → argument

❌ Забувати `return`.

    function add(a, b) {
        a + b;
    }

    const result = add(2, 3);

    console.log(result);
    // undefined

❌ Плутати передачу функції та її виклик.

    execute(greet);

    // передати функцію

    execute(greet());

    // викликати функцію та передати результат

❌ Використовувати зайві глобальні змінні.

❌ Створювати функції, які роблять занадто багато різних задач.

❌ Створювати дуже довгі функції.

❌ Давати функціям незрозумілі назви.

Погано:

    function process(data) {}

Краще:

    function calculateTotalPrice(items) {}

❌ Плутати `return` та `console.log`.

    function add(a, b) {
        console.log(a + b);
    }

Ця функція виводить результат, але не повертає його.

Краще:

    function add(a, b) {
        return a + b;
    }

Тепер результат можна використовувати:

    const result = add(2, 3);

❌ Плутати `function declaration` та `function expression`.

❌ Викликати arrow function до її ініціалізації.

❌ Зловживати callback-функціями та робити код надмірно складним.

❌ Не розуміти scope локальних змінних.

### Практичні приклади

#### 1. Привітання

    function greet(name) {
        return `Hello, ${name}!`;
    }

    console.log(greet("Valeriy"));

#### 2. Перевірка віку

    function isAdult(age) {
        return age >= 18;
    }

    console.log(isAdult(20));
    // true

#### 3. Розрахунок площі

    function calculateRectangleArea(width, height) {
        return width * height;
    }

    console.log(calculateRectangleArea(10, 5));
    // 50

#### 4. Конвертація температури

    function celsiusToFahrenheit(celsius) {
        return celsius * 9 / 5 + 32;
    }

    console.log(celsiusToFahrenheit(0));
    // 32

#### 5. Пошук найбільшого числа

    function getMax(a, b) {
        return a > b ? a : b;
    }

    console.log(getMax(10, 20));
    // 20

#### 6. Сума масиву

    function sumArray(numbers) {
        let sum = 0;

        for (const number of numbers) {
            sum += number;
        }

        return sum;
    }

    console.log(sumArray([1, 2, 3, 4]));
    // 10

#### 7. Підрахунок парних чисел

    function countEvenNumbers(numbers) {
        let count = 0;

        for (const number of numbers) {
            if (number % 2 === 0) {
                count++;
            }
        }

        return count;
    }

    console.log(countEvenNumbers([1, 2, 3, 4, 6]));
    // 3

#### 8. Rest parameters

    function sum(...numbers) {
        let total = 0;

        for (const number of numbers) {
            total += number;
        }

        return total;
    }

    console.log(sum(1, 2, 3));
    // 6

    console.log(sum(10, 20, 30, 40));
    // 100

#### 9. Callback

    function execute(callback) {
        callback();
    }

    execute(() => {
        console.log("Task completed");
    });

#### 10. Higher-order function

    function repeat(action, times) {
        for (let i = 0; i < times; i++) {
            action();
        }
    }

    repeat(() => {
        console.log("Hello");
    }, 3);

#### 11. Функція, яка повертає функцію

    function createMultiplier(multiplier) {
        return function(number) {
            return number * multiplier;
        };
    }

    const double = createMultiplier(2);

    console.log(double(5));
    // 10

    console.log(double(10));
    // 20

### Як мислити про Function

Корисна ментальна модель:

    Input
      │
      ▼
    Function
      │
      ▼
    Processing
      │
      ▼
    Output

Наприклад:

    10 ──┐
         │
    20 ──┼──► add() ──► 30
         │
         └── arguments

Функція:

    function add(a, b) {
        return a + b;
    }

отримує:

    input → a, b

виконує:

    processing → a + b

повертає:

    output → result

### Хороша функція

Хороша функція зазвичай:

✔ має зрозумілу назву  
✔ виконує одну основну задачу  
✔ має чіткі parameters  
✔ повертає зрозумілий result  
✔ мінімізує непотрібні side effects  
✔ не залежить від зайвих глобальних змінних  
✔ може бути повторно використана  
✔ легко читається  
✔ легко тестується  

Наприклад:

    function calculateTotalPrice(price, quantity) {
        return price * quantity;
    }

Назва одразу пояснює призначення.

### Naming Functions

Для функцій зазвичай використовують `camelCase`.

Приклади:

    getUser()

    getUserById()

    calculateTotal()

    calculateAverage()

    createUser()

    updateUser()

    deleteUser()

    validateEmail()

    isAdult()

    hasPermission()

Часто функції-перевірки починаються з:

    is...
    has...
    can...

Наприклад:

    isValid()

    isLoggedIn()

    hasPermission()

    canEdit()

### Питання зі співбесіди

Що таке function?

Яка різниця між function declaration та function expression?

Що таке arrow function?

Що таке parameter?

Що таке argument?

Яка різниця між parameter та argument?

Що робить `return`?

Що повертає функція без `return`?

Що таке function invocation?

Що таке anonymous function?

Що таке callback function?

Що таке higher-order function?

Що означає, що functions є first-class objects?

Що таке pure function?

Що таке side effect?

Що таке scope?

Що таке local variable?

Що таке global variable?

Що таке default parameter?

Що таке rest parameter?

Чим `...args` відрізняється від `arguments`?

Що таке function hoisting?

Чи можна передати функцію як argument?

Чи може функція повернути іншу функцію?

У чому різниця між:

    callback

та:

    callback()

Чому arrow function не можна викликати до її ініціалізації?

Чому функції бажано робити невеликими?

### Шлях

🟢 **Core (обов'язково знати)**

Що таке function.

Як створити function declaration.

Як викликати function.

Що таке parameter.

Що таке argument.

Різниця між parameter та argument.

Що таке `return`.

Що повертає функція без `return`.

Локальні та глобальні змінні.

Function expression.

Arrow function.

Default parameters.

Основи scope.

---

🔵 **Junior**

Розуміти function declaration vs function expression.

Впевнено використовувати arrow functions.

Розуміти callback.

Передавати функції як arguments.

Розуміти higher-order functions.

Використовувати rest parameters.

Розуміти function hoisting.

Розуміти pure functions.

Розуміти side effects.

Розділяти складну логіку на декілька функцій.

Використовувати функції разом із:
- arrays;
- loops;
- conditionals;
- DOM;
- events;
- timers.

Розуміти базову ідею first-class functions.

---

🟠 **Middle**

Глибоко розуміти scope.

Розуміти lexical scope.

Розуміти closures.

Розуміти execution context.

Розуміти `this`.

Розуміти різницю `this` у звичайних та arrow functions.

Розуміти function methods:
- `call()`
- `apply()`
- `bind()`

Розуміти function composition.

Використовувати higher-order functions.

Писати reusable utility functions.

Розділяти pure logic та side effects.

Проєктувати функціональні модулі.

Розуміти patterns роботи з callbacks.

---

🔴 **Senior**

Functional programming principles.

Advanced closures.

Execution context.

Call stack.

Lexical environment.

Function currying.

Partial application.

Composition pipelines.

Memoization.

Recursion.

Generators.

Iterators.

Advanced `this` behavior.

Function decorators.

Functional architecture.

Dependency injection через functions.

Design patterns, які використовують functions.

Оптимізація function-heavy code.

Розуміння trade-offs між functional та object-oriented підходами.

### Міні-шпаргалка

Function declaration:

    function add(a, b) {
        return a + b;
    }

Function call:

    add(2, 3);

Function expression:

    const add = function(a, b) {
        return a + b;
    };

Arrow function:

    const add = (a, b) => a + b;

Parameter:

    function greet(name) {}

Argument:

    greet("Valeriy");

Return:

    function square(number) {
        return number * number;
    }

Default parameter:

    function greet(name = "Guest") {}

Rest parameter:

    function sum(...numbers) {}

Callback:

    function execute(callback) {
        callback();
    }

Higher-order function:

    function repeat(action, times) {
        // ...
    }

Pure function:

    function add(a, b) {
        return a + b;
    }

Основна модель:

    Input
      ↓
    Function
      ↓
    Processing
      ↓
    Output

Function як value:

    const greet = () => {
        console.log("Hello");
    };

Function як argument:

    execute(greet);

Function як return value:

    function createFunction() {
        return () => {
            console.log("Hello");
        };
    }

Scope:

    global scope
        ↓
    function scope
        ↓
    local variables

### Головне:

• Function — повторно використовуваний блок коду.

• Function може приймати parameters.

• Під час виклику функції передаються arguments.

• `return` повертає результат із функції.

• Функція без явного `return` повертає `undefined`.

• Function Declaration створюється через `function`.

• Function Expression присвоюється змінній.

• Arrow Function має коротший синтаксис.

• Default parameters задають значення параметрів за замовчуванням.

• Rest parameter `...args` збирає аргументи в масив.

• Function може бути передана як argument.

• Callback — функція, передана іншій функції.

• Higher-order function приймає або повертає функцію.

• У JavaScript functions є first-class objects.

• Scope визначає, де змінні доступні.

• Локальні змінні функції недоступні безпосередньо ззовні.

• Pure function не змінює зовнішній стан і для однакових input дає однаковий output.

• Side effect — взаємодія функції із зовнішнім станом або середовищем.

• Хороша функція зазвичай виконує одну чітку задачу.

• Функції є фундаментом усього JavaScript: від базового коду до DOM, React, Node.js, Express та асинхронного програмування.