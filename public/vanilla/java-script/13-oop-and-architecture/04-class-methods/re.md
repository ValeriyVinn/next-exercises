# 04. Class Methods

Class methods — це methods, оголошені всередині `class`, які визначають behavior його instances.

Основна ідея:

    Class
      │
      ├── State
      │
      ├── Constructor
      │
      └── Methods
             │
             ▼
          Behavior

Method описує дію, яку object може виконувати.

Наприклад:

    class User {
      constructor(name) {
        this.name = name;
      }

      sayHello() {
        console.log(`Hello, ${this.name}`);
      }
    }

    const user = new User("Valeriy");

    user.sayHello();

Method:

    sayHello()

визначає behavior object.

---

# Ключові поняття

✔ class method  
✔ instance method  
✔ method declaration  
✔ method name  
✔ parameters  
✔ arguments  
✔ `this`  
✔ method call  
✔ return value  
✔ method behavior  
✔ instance  
✔ state  
✔ public method  
✔ private method  
✔ method chaining  
✔ method composition  
✔ method responsibility  
✔ side effect  
✔ pure method  
✔ method design  
✔ method API  

---

# Що потрібно пам'ятати

• Class method визначає behavior object.

• Methods оголошуються всередині `class`.

• Instance methods викликаються через instance.

• Наприклад:

    user.sayHello();

• `this` всередині instance method зазвичай посилається на object, який викликав method.

• Method може приймати parameters.

• Method може повертати value через `return`.

• Method може змінювати state object.

• Method може викликати інші methods цього самого object.

• Methods можуть працювати з properties object.

• Public methods є частиною public API class.

• Private methods позначаються `#`.

• Method не обов'язково повинен змінювати state.

• Method може виконувати calculation і повертати результат.

• Method може мати side effects.

• Хороший method зазвичай має одну зрозумілу responsibility.

• Не потрібно створювати method для кожної дрібної операції без необхідності.

---

# Що таке Class Method

Проста модель:

    class User {
      sayHello() {
        console.log("Hello");
      }
    }

    const user = new User();

    user.sayHello();

Тут:

    sayHello()

— class method.

Method визначає behavior:

    User
      │
      └── sayHello()
              │
              ▼
           behavior

---

# Method Declaration

У class method записується без ключового слова `function`.

Правильно:

    class User {
      sayHello() {
        console.log("Hello");
      }
    }

Не потрібно:

    class User {
      function sayHello() {
        console.log("Hello");
      }
    }

У class використовується:

    methodName() {
      // code
    }

---

# Найпростіший Method

    class User {
      sayHello() {
        console.log("Hello");
      }
    }

Створення instance:

    const user = new User();

Виклик:

    user.sayHello();

Результат:

    Hello

---

# Method + State

Methods часто працюють із state object.

    class User {
      constructor(name) {
        this.name = name;
      }

      sayHello() {
        console.log(
          `Hello, ${this.name}`
        );
      }
    }

Використання:

    const user = new User("Valeriy");

    user.sayHello();

Method використовує:

    this.name

тобто state поточного object.

---

# `this` у Method

Наприклад:

    class User {
      constructor(name) {
        this.name = name;
      }

      sayHello() {
        console.log(
          `Hello, ${this.name}`
        );
      }
    }

    const user = new User("Valeriy");

Під час:

    user.sayHello();

`this` посилається на:

    user

Тому:

    this.name

означає:

    user.name

---

# Method Call

Method викликається через `.`:

    object.method();

Наприклад:

    user.sayHello();

Або:

    account.deposit(500);

Або:

    cart.add(product);

Модель:

    object
      │
      ▼
    method()
      │
      ▼
    behavior

---

# Method Parameters

Method може приймати parameters.

    class Calculator {
      add(a, b) {
        return a + b;
      }
    }

Виклик:

    const calculator = new Calculator();

    calculator.add(10, 20);

Результат:

    30

Тут:

    a
    b

— parameters.

А:

    10
    20

— arguments.

---

# Method Return

Method може повертати value.

    class Calculator {
      add(a, b) {
        return a + b;
      }
    }

    const calculator = new Calculator();

    const result = calculator.add(10, 20);

    console.log(result);

Результат:

    30

Модель:

    method()
       │
       ▼
    calculation
       │
       ▼
    return value

---

# Method без `return`

Method може нічого не повертати.

    class User {
      sayHello() {
        console.log("Hello");
      }
    }

Результат method:

    undefined

Але method виконує side effect:

    console.log()

---

# Method з `return`

    class User {
      getName() {
        return this.name;
      }
    }

Тепер:

    const name = user.getName();

Method повертає дані.

---

# Method vs Property

Property:

    class User {
      constructor(name) {
        this.name = name;
      }
    }

Використання:

    user.name

Method:

    class User {
      sayHello() {
        console.log("Hello");
      }
    }

Використання:

    user.sayHello();

Модель:

    property
        │
        ▼
      data

    method
        │
        ▼
     behavior

---

# Method змінює State

Method може змінювати state object.

    class Counter {
      constructor() {
        this.value = 0;
      }

      increment() {
        this.value++;
      }
    }

Використання:

    const counter = new Counter();

    counter.increment();

Тепер:

    counter.value

    // 1

Method:

    increment()

змінив:

    this.value

---

# Method читає State

Method може тільки читати state.

    class User {
      constructor(name) {
        this.name = name;
      }

      getName() {
        return this.name;
      }
    }

Виклик:

    user.getName();

Method не змінює state.

---

# Method читає і змінює State

    class Counter {
      constructor(value = 0) {
        this.value = value;
      }

      increment() {
        this.value++;
      }

      getValue() {
        return this.value;
      }
    }

Тут:

    increment()

змінює state.

А:

    getValue()

читає state.

---

# Method і Encapsulation

Methods можуть контролювати доступ до internal state.

    class BankAccount {
      #balance = 0;

      deposit(amount) {
        if (amount <= 0) {
          throw new Error(
            "Invalid amount"
          );
        }

        this.#balance += amount;
      }

      getBalance() {
        return this.#balance;
      }
    }

Зовнішній код працює через:

    deposit()
    getBalance()

але не має прямого доступу до:

    #balance

Модель:

    External Code
          │
          ▼
      Public Methods
          │
          ▼
      Private State

---

# Public Methods

Звичайний method class є public.

    class User {
      sayHello() {
        console.log("Hello");
      }
    }

Зовні:

    const user = new User();

    user.sayHello();

Method доступний через public API.

---

# Private Methods

Private method позначається `#`.

    class User {
      #validateName(name) {
        return name.trim().length > 0;
      }

      constructor(name) {
        if (!this.#validateName(name)) {
          throw new Error(
            "Invalid name"
          );
        }

        this.name = name;
      }
    }

Private method:

    #validateName()

можна викликати тільки всередині class.

---

# Public vs Private Methods

    class User {
      #validateName(name) {
        return name.trim().length > 0;
      }

      sayHello() {
        console.log("Hello");
      }
    }

Модель:

    User
     │
     ├── PUBLIC
     │     └── sayHello()
     │
     └── PRIVATE
           └── #validateName()

---

# Method Calling Another Method

Method може викликати інший method цього самого object.

    class User {
      getGreeting() {
        return `Hello, ${this.name}`;
      }

      sayHello() {
        console.log(
          this.getGreeting()
        );
      }
    }

Тут:

    sayHello()

викликає:

    getGreeting()

Модель:

    sayHello()
        │
        ▼
    getGreeting()
        │
        ▼
      result

---

# Method Composition

Methods можуть комбінуватися для виконання складнішої операції.

    class Calculator {
      add(a, b) {
        return a + b;
      }

      multiply(a, b) {
        return a * b;
      }

      calculate(a, b) {
        const sum = this.add(a, b);
        return this.multiply(sum, 2);
      }
    }

Виклик:

    calculator.calculate(10, 20);

Послідовність:

    calculate()
        │
        ▼
      add()
        │
        ▼
      multiply()
        │
        ▼
      result

---

# Method Responsibility

Хороший method повинен мати зрозумілу responsibility.

Наприклад:

    class User {
      activate() {
        this.isActive = true;
      }

      deactivate() {
        this.isActive = false;
      }
    }

Кожен method має одну зрозумілу дію.

---

# Поганий Великий Method

Погано:

    class UserService {
      createUser(data) {
        // validation
        // database
        // email
        // logging
        // analytics
        // formatting
        // notifications
        // many other operations
      }
    }

Такий method складно:

    read
    test
    debug
    reuse
    maintain

Краще розділити responsibilities.

---

# Methods з однією Responsibility

Наприклад:

    class UserService {
      validateUser(data) {
        // validation
      }

      saveUser(data) {
        // persistence
      }

      sendWelcomeEmail(user) {
        // email
      }

      createUser(data) {
        this.validateUser(data);

        const user =
          this.saveUser(data);

        this.sendWelcomeEmail(user);

        return user;
      }
    }

`createUser()` координує інші operations.

---

# Method Naming

Назва method повинна пояснювати його behavior.

Добре:

    getUser()
    createUser()
    updateUser()
    deleteUser()
    calculateTotal()
    validateEmail()
    sendMessage()
    activate()
    deactivate()

Гірше:

    doIt()
    process()
    handle()
    run()
    thing()

Загальні назви часто приховують responsibility method.

---

# Methods і Verbs

Methods часто називаються дієсловами.

    add()
    remove()
    update()
    delete()
    save()
    load()
    send()
    calculate()
    validate()
    activate()
    deactivate()

Модель:

    object
      │
      ▼
    action()
      │
      ▼
    behavior

---

# Getter-like Methods

Method може використовуватися для отримання даних.

    class User {
      constructor(name) {
        this.name = name;
      }

      getName() {
        return this.name;
      }
    }

Використання:

    user.getName();

Альтернатива — getter:

    get name() {
      return this.#name;
    }

Використання:

    user.name

Обидва підходи можуть бути правильними залежно від API.

---

# Action Methods

Methods часто представляють actions.

    class BankAccount {
      deposit(amount) {
        // ...
      }

      withdraw(amount) {
        // ...
      }
    }

Використання:

    account.deposit(500);

    account.withdraw(200);

Модель:

    account
       │
       ├── deposit()
       └── withdraw()
              │
              ▼
           behavior

---

# Query Methods

Query method отримує інформацію про object.

    class BankAccount {
      getBalance() {
        return this.#balance;
      }

      hasEnoughMoney(amount) {
        return this.#balance >= amount;
      }
    }

Такі methods переважно читають state.

---

# Command vs Query

Спрощено:

    Command
       │
       └── changes state

    Query
       │
       └── reads state

Наприклад:

    deposit()
        ↓
    Command

    getBalance()
        ↓
    Query

---

# Method з Validation

Method може перевіряти input.

    class BankAccount {
      #balance = 0;

      deposit(amount) {
        if (amount <= 0) {
          throw new Error(
            "Amount must be positive"
          );
        }

        this.#balance += amount;
      }
    }

Validation відбувається на boundary method.

---

# Method з Conditional Logic

    class User {
      constructor(isActive) {
        this.isActive = isActive;
      }

      getStatus() {
        if (this.isActive) {
          return "Active";
        }

        return "Inactive";
      }
    }

Method інкапсулює logic визначення status.

---

# Method з Early Return

Early return може спростити method.

    class User {
      canDelete() {
        if (!this.isActive) {
          return false;
        }

        if (this.role === "admin") {
          return false;
        }

        return true;
      }
    }

Модель:

    condition
       │
       ├── invalid → return
       │
       └── valid
             │
             ▼
           result

---

# Method з Default Parameters

Methods можуть мати default parameters.

    class Logger {
      log(message, level = "info") {
        console.log(
          `[${level}] ${message}`
        );
      }
    }

Використання:

    logger.log("Hello");

або:

    logger.log(
      "Something went wrong",
      "error"
    );

---

# Method з Rest Parameters

Method може приймати довільну кількість arguments.

    class Calculator {
      sum(...numbers) {
        return numbers.reduce(
          (total, number) =>
            total + number,
          0
        );
      }
    }

Використання:

    calculator.sum(1, 2, 3, 4);

Результат:

    10

---

# Method і Destructuring

Method може використовувати destructuring parameters.

    class UserService {
      createUser({
        name,
        email
      }) {
        return {
          name,
          email
        };
      }
    }

Використання:

    userService.createUser({
      name: "Valeriy",
      email: "user@example.com"
    });

---

# Method Return Object

Method може повертати object.

    class UserFactory {
      createUser(name, age) {
        return {
          name,
          age
        };
      }
    }

Виклик:

    const user =
      factory.createUser(
        "Valeriy",
        56
      );

---

# Method Return Boolean

Method часто повертає boolean.

    class User {
      constructor(age) {
        this.age = age;
      }

      isAdult() {
        return this.age >= 18;
      }
    }

Використання:

    user.isAdult();

Результат:

    true

---

# Method Return Array

    class Cart {
      constructor(items = []) {
        this.items = items;
      }

      getProducts() {
        return this.items;
      }
    }

Method повертає Array.

Якщо collection є internal state, краще подумати про defensive copy:

    getProducts() {
      return [...this.items];
    }

---

# Method і Defensive Copy

Погано:

    getItems() {
      return this.#items;
    }

Зовнішній код може зробити:

    cart.getItems().push(
      "Invalid item"
    );

Краще:

    getItems() {
      return [...this.#items];
    }

Тоді external code отримує copy.

---

# Method Chaining

Methods можуть повертати `this`.

    class Counter {
      constructor(value = 0) {
        this.value = value;
      }

      increment() {
        this.value++;
        return this;
      }

      decrement() {
        this.value--;
        return this;
      }
    }

Тепер можна:

    counter
      .increment()
      .increment()
      .decrement();

Модель:

    method()
       │
       ▼
      this
       │
       ▼
    next method()

---

# Method Chaining API

Наприклад:

    class QueryBuilder {
      select(fields) {
        this.fields = fields;
        return this;
      }

      where(condition) {
        this.condition = condition;
        return this;
      }

      limit(value) {
        this.limitValue = value;
        return this;
      }
    }

Використання:

    query
      .select(["name"])
      .where("active")
      .limit(10);

Це називається method chaining.

---

# Method без Side Effects

Method може тільки обчислювати результат.

    class Calculator {
      square(number) {
        return number * number;
      }
    }

Такий method не змінює state object.

---

# Method з Side Effect

Method може змінювати state.

    class Counter {
      increment() {
        this.value++;
      }
    }

Side effect:

    this.value++

Інші приклади side effects:

    console.log()

    network request

    database update

    DOM modification

    file write

    state mutation

---

# Pure-like Method

Method, який залежить тільки від arguments і не змінює state, простіше тестувати.

    class Calculator {
      add(a, b) {
        return a + b;
      }
    }

Результат залежить від:

    a
    b

і не залежить від internal state.

---

# State-dependent Method

Method може залежати від state object.

    class User {
      constructor(age) {
        this.age = age;
      }

      isAdult() {
        return this.age >= 18;
      }
    }

Результат залежить від:

    this.age

---

# Method і Internal State

    class BankAccount {
      #balance = 0;

      deposit(amount) {
        this.#balance += amount;
      }

      getBalance() {
        return this.#balance;
      }
    }

Methods мають контрольований доступ до:

    #balance

Модель:

    Methods
       │
       ▼
    Private State
       │
       ▼
    Controlled behavior

---

# Method і Invariants

Methods повинні не порушувати invariants object.

Наприклад:

    balance >= 0

Погано:

    withdraw(amount) {
      this.#balance -= amount;
    }

Якщо:

    balance = 100
    amount = 500

отримаємо:

    balance = -400

Краще:

    withdraw(amount) {
      if (amount > this.#balance) {
        throw new Error(
          "Insufficient funds"
        );
      }

      this.#balance -= amount;
    }

---

# Method як Public API

Class може приховувати implementation і показувати тільки необхідні methods.

    class ShoppingCart {
      #items = [];

      add(product) {
        this.#items.push(product);
      }

      remove(product) {
        this.#items = this.#items.filter(
          item => item !== product
        );
      }

      getTotal() {
        return this.#items.reduce(
          (total, item) =>
            total + item.price,
          0
        );
      }
    }

Public API:

    add()
    remove()
    getTotal()

Internal implementation:

    #items

---

# Method і Information Hiding

Method може приховувати складну internal logic.

    class CoffeeMachine {
      makeCoffee() {
        this.#heatWater();
        this.#grindBeans();
        this.#brew();
      }

      #heatWater() {
        console.log("Heating water");
      }

      #grindBeans() {
        console.log("Grinding beans");
      }

      #brew() {
        console.log("Brewing coffee");
      }
    }

External code:

    machine.makeCoffee();

Не повинно знати про:

    #heatWater()
    #grindBeans()
    #brew()

---

# Method і Abstraction

Public method може представляти просту operation.

    machine.makeCoffee();

Користувачу не потрібно знати:

    how water is heated
    how beans are ground
    how coffee is brewed

Method створює простий interface над складнішою implementation.

---

# Method Composition у Services

У service methods можуть координувати різні operations.

    class OrderService {
      createOrder(data) {
        this.validateOrder(data);

        const order =
          this.saveOrder(data);

        this.sendConfirmation(order);

        return order;
      }

      validateOrder(data) {
        // validation
      }

      saveOrder(data) {
        // persistence
      }

      sendConfirmation(order) {
        // notification
      }
    }

Модель:

    createOrder()
          │
          ├── validateOrder()
          │
          ├── saveOrder()
          │
          └── sendConfirmation()

---

# Method і Dependency

Method може використовувати dependency, отриману через constructor.

    class UserService {
      constructor(repository) {
        this.repository = repository;
      }

      findUser(id) {
        return this.repository.findById(id);
      }
    }

Method:

    findUser()

використовує:

    this.repository

---

# Method і `this` Problem

У JavaScript потрібно пам'ятати, що `this` залежить від способу виклику method.

Наприклад:

    class User {
      constructor(name) {
        this.name = name;
      }

      sayHello() {
        console.log(this.name);
      }
    }

Працює:

    user.sayHello();

Тут method викликаний як:

    object.method()

і:

    this === user

---

# Method Extracted from Object

Проблема може виникнути, якщо method відокремити від object.

    const sayHello =
      user.sayHello;

    sayHello();

У такому випадку `this` може бути `undefined` у strict mode.

Це важлива особливість JavaScript methods.

---

# Binding Method

Method можна прив'язати до конкретного object.

    const sayHello =
      user.sayHello.bind(user);

    sayHello();

Тепер:

    this

залишається:

    user

---

# Arrow Function і `this`

Arrow function не створює власного `this`.

Наприклад:

    class User {
      constructor(name) {
        this.name = name;
      }

      sayHello = () => {
        console.log(this.name);
      };
    }

Такий підхід може зручно зберігати lexical `this`, але class field arrow methods мають іншу модель зберігання, ніж звичайні prototype methods.

Для базового OOP важливо насамперед добре розуміти:

    regular method
        │
        ▼
    dynamic this

    arrow function
        │
        ▼
    lexical this

---

# Methods на Prototype

Звичайні class methods зберігаються на prototype class.

Наприклад:

    class User {
      sayHello() {
        console.log("Hello");
      }
    }

    const user1 = new User();
    const user2 = new User();

Обидва instances використовують method через prototype chain.

Модель:

    user1
      │
      ▼
    User.prototype
      │
      └── sayHello()

    user2
      │
      ▼
    User.prototype
      │
      └── sayHello()

---

# Shared Method

Звичайний class method не створюється окремо для кожного instance.

    class User {
      sayHello() {
        console.log("Hello");
      }
    }

Instances:

    user1
    user2
    user3

використовують method через:

    User.prototype

Це одна з переваг звичайних class methods.

---

# Method vs Arrow Class Field

Звичайний method:

    class User {
      sayHello() {
        console.log("Hello");
      }
    }

Arrow class field:

    class User {
      sayHello = () => {
        console.log("Hello");
      };
    }

Головна різниця:

    regular method
        │
        └── prototype

    arrow class field
        │
        └── own instance property

Arrow class fields можуть бути корисними, коли важливе стабільне lexical `this`, але їх не слід автоматично використовувати для кожного method.

---

# Method Override

У inheritance child class може перевизначити method parent class.

    class Animal {
      speak() {
        console.log("Animal sound");
      }
    }

    class Dog extends Animal {
      speak() {
        console.log("Woof");
      }
    }

Виклик:

    const dog = new Dog();

    dog.speak();

Результат:

    Woof

Child method замінює behavior parent class для цього instance.

---

# Method Override + `super`

Child method може викликати parent method через:

    super.method()

Наприклад:

    class Animal {
      speak() {
        console.log("Animal sound");
      }
    }

    class Dog extends Animal {
      speak() {
        super.speak();

        console.log("Woof");
      }
    }

Виклик:

    dog.speak();

Результат:

    Animal sound
    Woof

---

# Polymorphism через Methods

Methods є основою polymorphism.

    class Animal {
      speak() {
        console.log("Some sound");
      }
    }

    class Dog extends Animal {
      speak() {
        console.log("Woof");
      }
    }

    class Cat extends Animal {
      speak() {
        console.log("Meow");
      }
    }

Тепер:

    const animals = [
      new Dog(),
      new Cat()
    ];

    animals.forEach(
      animal => animal.speak()
    );

Кожен object реагує на:

    speak()

по-своєму.

---

# Method Contract

Public method можна розглядати як contract.

Наприклад:

    calculateTotal(items)

очікує:

    items

і повертає:

    total

Модель:

    Input
      │
      ▼
    Method
      │
      ▼
    Output

Contract визначає:

    what method accepts
    what method returns
    what behavior it guarantees

---

# Method Errors

Method може повідомляти про invalid input через `throw`.

    class User {
      setAge(age) {
        if (age < 0) {
          throw new Error(
            "Age cannot be negative"
          );
        }

        this.age = age;
      }
    }

Використання:

    user.setAge(-10);

викличе error.

---

# Method Return vs Throw

Method може:

    return result

або:

    throw error

Наприклад:

    findUser(id) {
      const user =
        this.repository.findById(id);

      if (!user) {
        throw new Error(
          "User not found"
        );
      }

      return user;
    }

Модель:

    method()
       │
       ├── success → return
       │
       └── failure → throw

---

# Method Design

Перед створенням method корисно запитати:

    1. Що він робить?
    2. Які дані отримує?
    3. Що повертає?
    4. Чи змінює state?
    5. Чи має side effects?
    6. Чи потрібен цей method public?
    7. Чи повинен він бути private?
    8. Чи не робить він забагато?

---

# Хороший Method

Наприклад:

    class Cart {
      #items = [];

      add(item) {
        this.#items.push(item);
      }

      remove(item) {
        this.#items = this.#items.filter(
          current => current !== item
        );
      }

      getTotal() {
        return this.#items.reduce(
          (total, item) =>
            total + item.price,
          0
        );
      }
    }

Methods мають зрозумілі responsibilities:

    add()
      ↓
    add item

    remove()
      ↓
    remove item

    getTotal()
      ↓
    calculate total

---

# Типові помилки

❌ Додавати `function` перед method:

    class User {
      function sayHello() {}
    }

Правильно:

    class User {
      sayHello() {}
    }

---

❌ Забувати `this` при доступі до state:

    class User {
      constructor(name) {
        this.name = name;
      }

      sayHello() {
        console.log(name);
      }
    }

Правильно:

    console.log(this.name);

---

❌ Робити method надто великим.

    createUser() {
      // hundreds of lines
    }

Краще розділити responsibilities.

---

❌ Називати methods незрозуміло.

Погано:

    process()
    doSomething()

Краще:

    validateUser()
    calculateTotal()
    sendEmail()

---

❌ Змінювати state без контролю.

Погано:

    updateBalance(value) {
      this.balance = value;
    }

Якщо balance має invariant, краще контролювати operation:

    deposit(amount) {}

    withdraw(amount) {}

---

❌ Повертати internal collection напряму.

Погано:

    getItems() {
      return this.#items;
    }

Краще:

    getItems() {
      return [...this.#items];
    }

---

❌ Робити всі methods public.

Якщо method є лише internal implementation:

    #validate()
    #calculateInternal()

може бути кращим вибором.

---

❌ Використовувати method chaining без необхідності.

Повернення:

    return this;

має сенс, коли chaining є частиною API.

---

❌ Автоматично робити кожну дію окремим method.

Не потрібно створювати methods лише заради поділу коду.

Method повинен мати зрозумілу responsibility або API value.

---

# Питання зі співбесіди

Що таке class method?

Що таке instance method?

Як оголошуються methods у class?

Як викликати class method?

Що таке `this` у method?

Що таке method parameter?

Що таке method argument?

Що може повертати method?

Що буде, якщо method не має `return`?

Чи може method змінювати state object?

Що таке side effect?

Що таке pure method?

Що таке public method?

Що таке private method?

Як створити private method у JavaScript?

Що таке method chaining?

Навіщо method може повертати `this`?

Що таке method composition?

Що таке method responsibility?

Чому methods не повинні бути надто великими?

Де зберігаються звичайні class methods?

Що таке prototype method?

Чим звичайний method відрізняється від arrow class field?

Що відбувається з `this`, якщо method передати окремо?

Що таке `bind()`?

Як method може викликати інший method?

Як method може працювати з private field?

Як method може контролювати state?

Що таке method override?

Що робить `super.method()`?

Як methods пов'язані з polymorphism?

Що таке method contract?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке class method.

Method declaration.

Method call.

`this`.

Parameters.

Arguments.

`return`.

Methods + state.

Methods + behavior.

Public methods.

Private methods.

---

🔵 Junior

Methods + encapsulation.

Methods + validation.

Methods + private fields.

Methods + getters/setters.

Methods, що змінюють state.

Methods, що читають state.

Method responsibility.

Method naming.

Side effects.

Default parameters.

Rest parameters.

Method chaining.

---

🟠 Middle

Method composition.

Method contracts.

Command vs Query.

Pure-like methods.

State-dependent methods.

Internal vs public methods.

Methods + services.

Methods + dependency injection.

Method override.

`super.method()`.

Polymorphism через methods.

Prototype methods.

Method API design.

---

🔴 Senior

Designing method APIs.

Stable public contracts.

Method boundaries.

Command/query separation.

Managing side effects.

Method-level encapsulation.

Behavior-oriented design.

Domain methods.

Methods + invariants.

Methods across services.

Reducing coupling through APIs.

Designing methods for testability.

Balancing abstraction and method granularity.

---

# Міні-шпаргалка

Class method:

    class User {
      sayHello() {
        console.log("Hello");
      }
    }

    const user = new User();

    user.sayHello();

---

Method + `this`:

    class User {
      constructor(name) {
        this.name = name;
      }

      sayHello() {
        console.log(this.name);
      }
    }

    user.sayHello();

        │
        ▼
    this === user

---

Method parameters:

    class Calculator {
      add(a, b) {
        return a + b;
      }
    }

    calculator.add(10, 20);

        │    │
        ▼    ▼
       a     b

---

Method return:

    method()
       │
       ▼
    return value

Наприклад:

    getTotal() {
      return this.total;
    }

---

Method + State:

    Object
      │
      ├── State
      │     └── this.value
      │
      └── Methods
            ├── increment()
            └── getValue()

---

Method + Encapsulation:

    External Code
          │
          ▼
      Public Method
          │
          ▼
      Private State
          │
          ▼
        #value

---

Public vs Private:

    CLASS
     │
     ├── PUBLIC
     │    ├── method()
     │    └── method()
     │
     └── PRIVATE
          ├── #field
          └── #method()

---

Method composition:

    methodA()
       │
       ▼
    methodB()
       │
       ▼
    methodC()

---

Method chaining:

    object
      .methodA()
      .methodB()
      .methodC();

Methods:

    methodA() {
      return this;
    }

---

Inheritance:

    Parent
      │
      └── method()
             ▲
             │ override
             │
          Child
             │
             └── method()

---

Polymorphism:

    object
        │
        ▼
      speak()
        │
    ┌───┴───┐
    ▼       ▼
   Dog     Cat
    │       │
   Woof    Meow

---

# Method + Constructor

Constructor:

    constructor(data) {
      this.data = data;
    }

Method:

    process() {
      // behavior
    }

Модель:

    new Class(data)
          │
          ▼
      constructor
          │
          ▼
       initial state
          │
          ▼
        methods
          │
          ▼
        behavior

---

# Method + Service

    class UserService {
      constructor(repository) {
        this.repository = repository;
      }

      findUser(id) {
        return this.repository.findById(id);
      }

      createUser(data) {
        // create user
      }

      deleteUser(id) {
        // delete user
      }
    }

Public API:

    findUser()
    createUser()
    deleteUser()

Internal dependency:

    this.repository

---

# Method + Invariant

    State
      │
      ▼
    Invariant
      │
      ▼
    Method
      │
      ▼
    Validation
      │
      ▼
    Updated State

Наприклад:

    balance >= 0

    withdraw(amount) {
      if (amount > this.#balance) {
        throw new Error(
          "Insufficient funds"
        );
      }

      this.#balance -= amount;
    }

---

# Головне

• Class methods визначають behavior object.

• Methods оголошуються всередині class.

• Для method не використовується `function`.

• Instance method викликається через instance:

    object.method();

• `this` зазвичай посилається на object, через який викликаний method.

• Method може читати state object.

• Method може змінювати state object.

• Method може повертати value через `return`.

• Method без `return` повертає `undefined`.

• Method може приймати parameters.

• Arguments — конкретні значення, передані method.

• Public methods є частиною public API.

• Private methods позначаються `#`.

• Methods можуть працювати з private fields.

• Methods можуть контролювати зміни internal state.

• Validation часто виконується всередині methods.

• Methods можуть викликати інші methods через `this`.

• Methods можуть комбінуватися для складнішої behavior.

• Хороший method має чітку responsibility.

• Не варто створювати надто великі methods.

• Назва method повинна описувати його behavior.

• Methods можуть мати side effects.

• Не кожен method повинен змінювати state.

• Query methods переважно читають state.

• Command methods змінюють state.

• Method chaining реалізується через `return this`.

• Звичайні class methods працюють через prototype.

• Child class може override method parent class.

• `super.method()` дозволяє викликати parent method.

• Methods є основою polymorphism у OOP.

• Public method можна розглядати як contract між object та external code.

• Methods допомагають приховувати internal implementation.

• Хороший public API повинен показувати behavior, а не internal details.

---

# Коротка модель для запам'ятовування

    CLASS
      │
      ├── STATE
      │     └── properties
      │
      └── METHODS
            │
            ├── read state
            │
            ├── change state
            │
            ├── calculate
            │
            ├── validate
            │
            └── coordinate behavior

Основна модель:

    Object
       │
       ▼
    Method
       │
       ├── Input
       │
       ├── Logic
       │
       ├── State
       │
       └── Output
              │
              ▼
            Result

Encapsulation:

    External Code
          │
          ▼
      Public Methods
          │
          ▼
      Internal State
          │
          ▼
        Behavior

Inheritance:

    Parent
      │
      └── method()
             ▲
             │
           override
             │
             ▼
          Child

Polymorphism:

    object
      │
      ▼
    same method()
      │
      ├── Dog → Woof
      │
      └── Cat → Meow

Головна ідея:

    Methods define what an object can DO.

    Class
      │
      ▼
    State + Methods
      │
      ▼
    Object
      │
      ▼
    Behavior