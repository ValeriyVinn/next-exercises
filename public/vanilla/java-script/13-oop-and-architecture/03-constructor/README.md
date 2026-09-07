# 03. Constructor

`constructor` — спеціальний method класу, який автоматично виконується під час створення нового object через `new`.

Основна ідея:

    new Class()
         │
         ▼
    constructor()
         │
         ▼
    initialize object
         │
         ▼
      object

Constructor використовується для початкового налаштування object:

- створення initial state
- отримання початкових даних
- присвоєння properties
- виконання initial validation
- підготовки object до роботи

---

# Ключові поняття

✔ `constructor`  
✔ `new`  
✔ instance  
✔ initialization  
✔ initial state  
✔ constructor parameters  
✔ constructor arguments  
✔ `this`  
✔ default parameters  
✔ validation  
✔ property initialization  
✔ class fields  
✔ `super()`  
✔ inheritance  
✔ base class  
✔ derived class  
✔ constructor chaining  
✔ object initialization  
✔ constructor responsibility  

---

# Що потрібно пам'ятати

• `constructor()` — спеціальний method класу.

• Він автоматично викликається під час використання `new`.

• Constructor використовується для initialization нового object.

• Constructor може приймати parameters.

• Значення передані через `new` стають arguments constructor.

• Усередині constructor `this` посилається на новий instance.

• Properties object зазвичай створюються через `this.property`.

• Constructor може встановлювати initial state.

• Constructor може виконувати validation початкових даних.

• Constructor не потрібно викликати вручну.

• Якщо class не має constructor, JavaScript створює default constructor.

• Constructor не повинен містити всю business logic application.

• У derived class constructor потрібно викликати `super()` перед використанням `this`.

• `super()` викликає constructor parent class.

• Constructor відповідає передусім за коректну initialization object.

---

# Що таке Constructor

Проста модель:

    class
      │
      ▼
    constructor()
      │
      ▼
    initialization
      │
      ▼
    instance

Наприклад:

    class User {
      constructor(name) {
        this.name = name;
      }
    }

Створення object:

    const user = new User("Valeriy");

Під час:

    new User("Valeriy")

JavaScript викликає:

    constructor("Valeriy")

і створює instance:

    {
      name: "Valeriy"
    }

---

# Constructor і `new`

Constructor зазвичай працює разом із `new`.

    class User {
      constructor(name) {
        this.name = name;
      }
    }

    const user = new User("Valeriy");

Модель:

    new User("Valeriy")
          │
          ▼
    create instance
          │
          ▼
    constructor("Valeriy")
          │
          ▼
    this.name = "Valeriy"
          │
          ▼
       user object

---

# Що робить `new`

Коли виконується:

    const user = new User("Valeriy");

`new` створює новий instance class і запускає constructor.

Спрощена модель:

    new
     │
     ├── create new object
     │
     ├── connect prototype
     │
     ├── call constructor
     │
     └── return instance

Тобто:

    new User("Valeriy")

створює новий object і передає `"Valeriy"` у constructor.

---

# Найпростіший Constructor

    class User {
      constructor(name) {
        this.name = name;
      }
    }

Створення:

    const user = new User("Valeriy");

Результат:

    user.name

    // "Valeriy"

Constructor виконав:

    this.name = name;

---

# Constructor Parameters

Constructor може приймати parameters.

    class User {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
    }

Створення:

    const user = new User(
      "Valeriy",
      56
    );

Тут:

    name → "Valeriy"
    age  → 56

Object:

    user.name
    user.age

---

# Constructor Arguments

Важливо розрізняти:

    parameter

та:

    argument

У constructor:

    class User {
      constructor(name) {
        this.name = name;
      }
    }

`name` — parameter.

Під час створення:

    new User("Valeriy");

`"Valeriy"` — argument.

Модель:

    new User("Valeriy")
             │
             ▼
          argument
             │
             ▼
       constructor(name)
                    │
                    ▼
                parameter

---

# `this` у Constructor

У constructor:

    this

посилається на новий instance.

Наприклад:

    class User {
      constructor(name) {
        this.name = name;
      }
    }

    const user = new User("Valeriy");

Усередині constructor:

    this

означає:

    user

Тому:

    this.name = name;

означає:

    user.name = "Valeriy";

---

# Constructor Initialization

Головне завдання constructor — initializе object.

Наприклад:

    class Counter {
      constructor() {
        this.value = 0;
      }
    }

Створення:

    const counter = new Counter();

Initial state:

    counter.value

    // 0

Модель:

    new Counter()
         │
         ▼
    constructor()
         │
         ▼
    value = 0
         │
         ▼
    initialized object

---

# Initial State

Constructor часто створює initial state object.

    class User {
      constructor(name) {
        this.name = name;
        this.isActive = true;
        this.role = "user";
      }
    }

    const user = new User("Valeriy");

Initial state:

    {
      name: "Valeriy",
      isActive: true,
      role: "user"
    }

Constructor визначив початковий state.

---

# Constructor з кількома Properties

    class Product {
      constructor(name, price, category) {
        this.name = name;
        this.price = price;
        this.category = category;
      }
    }

    const product = new Product(
      "Laptop",
      1200,
      "electronics"
    );

Object:

    product.name
    product.price
    product.category

Constructor централізовано створює initial state product.

---

# Constructor без Parameters

Constructor може не мати parameters.

    class Counter {
      constructor() {
        this.value = 0;
      }
    }

    const counter = new Counter();

Parameters не потрібні, якщо object має fixed initial state.

---

# Constructor з Default Parameters

Можна використовувати default parameters.

    class User {
      constructor(name = "Guest") {
        this.name = name;
      }
    }

Тоді:

    const user = new User();

Результат:

    user.name

    // "Guest"

Або:

    const user = new User("Valeriy");

Результат:

    user.name

    // "Valeriy"

---

# Constructor з Default State

Наприклад:

    class Settings {
      constructor(
        theme = "light",
        language = "en"
      ) {
        this.theme = theme;
        this.language = language;
      }
    }

    const settings = new Settings();

Initial state:

    {
      theme: "light",
      language: "en"
    }

---

# Constructor Validation

Constructor може перевіряти initial data.

    class User {
      constructor(age) {
        if (age < 0) {
          throw new Error(
            "Age cannot be negative"
          );
        }

        this.age = age;
      }
    }

Коректно:

    const user = new User(56);

Некоректно:

    const user = new User(-10);

Constructor не дозволяє створити object з invalid initial state.

---

# Constructor і Invariants

Constructor може гарантувати початковий invariant object.

Наприклад:

    balance >= 0

    class BankAccount {
      constructor(balance) {
        if (balance < 0) {
          throw new Error(
            "Balance cannot be negative"
          );
        }

        this.balance = balance;
      }
    }

Тепер кожен створений object починає життя з valid state.

Модель:

    Input
      │
      ▼
    constructor
      │
      ▼
    validation
      │
      ▼
    valid initial state
      │
      ▼
    object

---

# Constructor + Encapsulation

Constructor часто використовується разом із private fields.

    class BankAccount {
      #balance;

      constructor(initialBalance) {
        if (initialBalance < 0) {
          throw new Error(
            "Invalid balance"
          );
        }

        this.#balance = initialBalance;
      }

      getBalance() {
        return this.#balance;
      }
    }

Створення:

    const account = new BankAccount(1000);

Constructor встановив:

    #balance = 1000

Зовнішній код не має прямого доступу до private state.

---

# Constructor не є звичайним Method

Constructor синтаксично знаходиться серед methods class:

    class User {
      constructor(name) {
        this.name = name;
      }

      sayHello() {
        console.log("Hello");
      }
    }

Але `constructor` має спеціальне призначення.

    constructor()
         │
         └── initialization

    sayHello()
         │
         └── behavior

---

# Constructor vs Method

Constructor:

    class User {
      constructor(name) {
        this.name = name;
      }
    }

Викликається автоматично:

    new User("Valeriy");

Звичайний method:

    class User {
      sayHello() {
        console.log("Hello");
      }
    }

Викликається явно:

    user.sayHello();

Модель:

    constructor
         │
         ▼
    initialization

    method
         │
         ▼
    behavior

---

# Constructor Return

Зазвичай constructor не повинен явно повертати object.

Наприклад:

    class User {
      constructor(name) {
        this.name = name;
      }
    }

Замість:

    return ...

constructor зазвичай налаштовує:

    this

і `new` повертає instance.

---

# Default Constructor

Якщо class не має constructor:

    class User {
      sayHello() {
        console.log("Hello");
      }
    }

JavaScript використовує default constructor.

Спрощено:

    class User {
      constructor(...args) {
        super(...args);
      }

      sayHello() {
        console.log("Hello");
      }
    }

Для базового class без parent це можна уявляти як автоматичний механізм створення instance.

---

# Class без Constructor

Можна написати:

    class User {
      sayHello() {
        console.log("Hello");
      }
    }

і:

    const user = new User();

Це працює.

Не кожен class обов'язково потребує явного constructor.

---

# Коли потрібен Constructor

Constructor потрібен, коли object має отримувати initial data.

Наприклад:

    class User {
      constructor(name, email) {
        this.name = name;
        this.email = email;
      }
    }

Або коли потрібно створити initial state:

    class Counter {
      constructor() {
        this.value = 0;
      }
    }

Або коли потрібна initial validation:

    class Product {
      constructor(price) {
        if (price < 0) {
          throw new Error("Invalid price");
        }

        this.price = price;
      }
    }

---

# Коли Constructor не потрібен

Якщо class не має initial data або special initialization:

    class Logger {
      log(message) {
        console.log(message);
      }
    }

Тут constructor може бути зайвим.

Не потрібно створювати constructor лише тому, що "у class повинен бути constructor".

---

# Constructor Responsibility

Хороший constructor повинен відповідати передусім за:

    initialization
    validation
    initial state

Наприклад:

    class User {
      constructor(name, age) {
        if (!name) {
          throw new Error("Name required");
        }

        if (age < 0) {
          throw new Error("Invalid age");
        }

        this.name = name;
        this.age = age;
      }
    }

---

# Не варто робити Constructor надто складним

Погано:

    class User {
      constructor(data) {
        // validation
        // database request
        // API request
        // email sending
        // file processing
        // complex business logic
        // logging
        // analytics
      }
    }

Constructor не повинен перетворюватися на центральний контейнер усієї business logic.

Краще:

    constructor()
         │
         └── initialize

    methods
         │
         └── behavior / business logic

---

# Constructor і Methods

Наприклад:

    class BankAccount {
      constructor(initialBalance = 0) {
        if (initialBalance < 0) {
          throw new Error("Invalid balance");
        }

        this.balance = initialBalance;
      }

      deposit(amount) {
        if (amount <= 0) {
          throw new Error("Invalid amount");
        }

        this.balance += amount;
      }

      withdraw(amount) {
        if (amount > this.balance) {
          throw new Error("Insufficient funds");
        }

        this.balance -= amount;
      }
    }

Constructor:

    initial state

Methods:

    behavior

Модель:

    BankAccount
         │
         ├── constructor()
         │       └── initial state
         │
         ├── deposit()
         │       └── behavior
         │
         └── withdraw()
                 └── behavior

---

# Constructor і Object Identity

Кожен виклик `new` створює окремий instance.

    class User {
      constructor(name) {
        this.name = name;
      }
    }

    const user1 = new User("John");
    const user2 = new User("Mary");

Маємо:

    user1 !== user2

Об'єкти різні:

    user1
      │
      └── name: "John"

    user2
      │
      └── name: "Mary"

---

# Constructor створює незалежний State

    class Counter {
      constructor() {
        this.value = 0;
      }

      increment() {
        this.value++;
      }
    }

    const counter1 = new Counter();
    const counter2 = new Counter();

    counter1.increment();

Тепер:

    counter1.value
    // 1

    counter2.value
    // 0

Кожен instance має власний state.

---

# Constructor і Arrays

Якщо property повинна містити власну Array для кожного instance, її потрібно створювати для instance.

    class Cart {
      constructor() {
        this.items = [];
      }
    }

    const cart1 = new Cart();
    const cart2 = new Cart();

    cart1.items.push("Laptop");

Тепер:

    cart1.items
    // ["Laptop"]

    cart2.items
    // []

Кожен constructor створив власний Array.

---

# Constructor і Objects

Так само можна створювати initial object state.

    class User {
      constructor(name) {
        this.name = name;

        this.settings = {
          theme: "light",
          language: "en"
        };
      }
    }

Кожен instance отримує власний `settings` object.

---

# Constructor і Class Fields

JavaScript дозволяє оголошувати class fields.

Наприклад:

    class Counter {
      value = 0;
    }

Це означає, що кожен instance отримує:

    value = 0

Можна також використовувати constructor:

    class Counter {
      constructor(value = 0) {
        this.value = value;
      }
    }

Обидва підходи можуть використовуватися для initialization.

---

# Class Field vs Constructor

Class field:

    class Counter {
      value = 0;
    }

Constructor:

    class Counter {
      constructor(value = 0) {
        this.value = value;
      }
    }

Class field зручний для простого fixed initial state.

Constructor зручний, коли initialization залежить від arguments або validation.

---

# Private Class Field + Constructor

    class User {
      #name;

      constructor(name) {
        this.#name = name;
      }

      getName() {
        return this.#name;
      }
    }

Модель:

    new User("Valeriy")
           │
           ▼
      constructor
           │
           ▼
        #name
           │
           ▼
     private state

---

# Constructor і Getters / Setters

Constructor може використовувати setter для validation.

    class User {
      #name;

      constructor(name) {
        this.name = name;
      }

      get name() {
        return this.#name;
      }

      set name(value) {
        if (!value.trim()) {
          throw new Error(
            "Name cannot be empty"
          );
        }

        this.#name = value.trim();
      }
    }

Constructor:

    this.name = name;

викликає setter.

Модель:

    constructor
         │
         ▼
       setter
         │
         ▼
     validation
         │
         ▼
      #name

---

# Constructor і Inheritance

У inheritance constructor дочірнього class може викликати parent constructor через:

    super()

Наприклад:

    class Animal {
      constructor(name) {
        this.name = name;
      }
    }

    class Dog extends Animal {
      constructor(name, breed) {
        super(name);

        this.breed = breed;
      }
    }

Створення:

    const dog = new Dog(
      "Rex",
      "Labrador"
    );

---

# Що робить `super()`

У derived class:

    super(name);

викликає constructor parent class:

    Animal

Тобто:

    Dog
     │
     ▼
    super(name)
     │
     ▼
    Animal constructor
     │
     ▼
    this.name = name

Після цього child constructor продовжує initialization:

    this.breed = breed;

---

# `super()` перед `this`

У derived class не можна використовувати `this` до `super()`.

Правильно:

    class Dog extends Animal {
      constructor(name, breed) {
        super(name);

        this.breed = breed;
      }
    }

Неправильно:

    class Dog extends Animal {
      constructor(name, breed) {
        this.breed = breed;

        super(name);
      }
    }

Спочатку:

    super()

потім:

    this

---

# Constructor Chain

При inheritance може виникати constructor chain.

    new Dog("Rex", "Labrador")
              │
              ▼
       Dog constructor
              │
              ▼
          super(name)
              │
              ▼
       Animal constructor
              │
              ▼
          initialization
              │
              ▼
       Dog initialization

Модель:

    Child
      │
      ▼
    super()
      │
      ▼
    Parent
      │
      ▼
    Child continues

---

# Parent Constructor

    class Animal {
      constructor(name) {
        this.name = name;
      }
    }

Child:

    class Dog extends Animal {
      constructor(name, breed) {
        super(name);
        this.breed = breed;
      }
    }

Parent відповідає за:

    name

Child відповідає за:

    breed

Це дозволяє розподілити initialization між класами.

---

# Constructor і Composition

Constructor також може отримувати dependencies.

Наприклад:

    class UserService {
      constructor(repository) {
        this.repository = repository;
      }
    }

Створення:

    const repository = new UserRepository();

    const userService = new UserService(
      repository
    );

Модель:

    Repository
        │
        ▼
    Constructor
        │
        ▼
    UserService
        │
        ▼
    this.repository

Це називається dependency injection через constructor.

---

# Constructor Dependency Injection

Constructor може отримувати готові dependencies замість того, щоб створювати їх сам.

Краще:

    class UserService {
      constructor(repository) {
        this.repository = repository;
      }
    }

Замість:

    class UserService {
      constructor() {
        this.repository = new UserRepository();
      }
    }

Перший варіант робить class більш flexible і testable.

---

# Constructor і Dependency

Модель:

    External Code
         │
         │ dependency
         ▼
    constructor()
         │
         ▼
    Class
         │
         ▼
    uses dependency

Наприклад:

    const repository = new UserRepository();

    const service = new UserService(
      repository
    );

Constructor отримує dependency і зберігає її.

---

# Constructor Factory Thinking

Constructor можна розглядати як частину процесу створення instance.

    Input
      │
      ▼
    new Class(data)
      │
      ▼
    constructor(data)
      │
      ├── validation
      │
      ├── initialization
      │
      └── dependencies
      │
      ▼
    initialized instance

---

# Constructor і Public API

Parameters constructor фактично є частиною API class.

Наприклад:

    class User {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
    }

API створення:

    new User(name, age)

Якщо змінити constructor:

    constructor(name, age, role)

змінюється спосіб створення object.

Тому constructor API також потрібно проєктувати уважно.

---

# Constructor з Object Parameter

Якщо parameters багато, часто зручно передавати один object.

Замість:

    class User {
      constructor(name, age, email, role) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.role = role;
      }
    }

Можна:

    class User {
      constructor({
        name,
        age,
        email,
        role
      }) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.role = role;
      }
    }

Використання:

    const user = new User({
      name: "Valeriy",
      age: 56,
      email: "user@example.com",
      role: "user"
    });

Це може зробити constructor API зрозумілішим при великій кількості параметрів.

---

# Constructor + Destructuring

Object parameter можна комбінувати з default values.

    class User {
      constructor({
        name,
        age = 0,
        role = "user"
      }) {
        this.name = name;
        this.age = age;
        this.role = role;
      }
    }

Використання:

    const user = new User({
      name: "Valeriy"
    });

Initial state:

    {
      name: "Valeriy",
      age: 0,
      role: "user"
    }

---

# Constructor Normalization

Constructor може нормалізувати initial data.

    class User {
      constructor(name) {
        this.name = name.trim();
      }
    }

    const user = new User(
      "  Valeriy  "
    );

Результат:

    user.name

    // "Valeriy"

Constructor перетворив input у normalized state.

---

# Constructor і Type Validation

Constructor може перевіряти тип даних.

    class Product {
      constructor(name, price) {
        if (typeof name !== "string") {
          throw new TypeError(
            "Name must be a string"
          );
        }

        if (typeof price !== "number") {
          throw new TypeError(
            "Price must be a number"
          );
        }

        this.name = name;
        this.price = price;
      }
    }

---

# Constructor і Required Data

Constructor може вимагати обов'язкові дані.

    class User {
      constructor(name) {
        if (!name) {
          throw new Error(
            "Name is required"
          );
        }

        this.name = name;
      }
    }

Без name:

    new User();

викличе error.

---

# Constructor і Optional Data

Не всі дані повинні бути обов'язковими.

    class User {
      constructor(
        name,
        role = "user"
      ) {
        this.name = name;
        this.role = role;
      }
    }

Можна:

    new User("Valeriy");

або:

    new User(
      "Valeriy",
      "admin"
    );

---

# Constructor і Immutable Initial State

Constructor може створити initial state, який потім не повинен змінюватися.

Наприклад:

    class User {
      constructor(id) {
        this.id = id;
      }
    }

`id` може концептуально бути immutable identity object.

Але важливо:

    const user = new User(10);

сам факт створення property у constructor **не робить її автоматично immutable**.

---

# Constructor ≠ Immutable

Наприклад:

    class User {
      constructor(id) {
        this.id = id;
      }
    }

Після створення:

    user.id = 20;

може змінити property.

Для справжнього контролю потрібні інші механізми:

    Object.freeze()

або:

    private fields

або контрольований public API.

---

# Constructor і `Object.freeze()`

У деяких випадках object можна заморозити після initialization.

    class Config {
      constructor() {
        this.apiUrl = "/api";
        this.timeout = 5000;

        Object.freeze(this);
      }
    }

Тепер properties object не можна змінювати звичайним способом.

Але `Object.freeze()` має власні особливості і не є універсальним способом encapsulation.

---

# Constructor і Static Methods

Static method не працює як instance constructor.

Наприклад:

    class User {
      constructor(name) {
        this.name = name;
      }

      static guest() {
        return new User("Guest");
      }
    }

Використання:

    const user = User.guest();

Всередині static method:

    new User("Guest")

викликає constructor.

Модель:

    User.guest()
         │
         ▼
    new User("Guest")
         │
         ▼
    constructor()
         │
         ▼
      instance

---

# Constructor як єдина точка Initialization

Хороший принцип:

    Object
      │
      ▼
    Constructor
      │
      ├── required data
      ├── default data
      ├── validation
      └── initial state
      │
      ▼
    Ready Object

Після constructor object повинен бути готовим до нормальної роботи.

---

# Ready Object

Наприклад:

    class BankAccount {
      constructor(balance = 0) {
        if (balance < 0) {
          throw new Error(
            "Invalid balance"
          );
        }

        this.balance = balance;
      }

      deposit(amount) {
        this.balance += amount;
      }
    }

Після:

    const account = new BankAccount(1000);

object вже має valid initial state:

    balance = 1000

і готовий до:

    account.deposit(500);

---

# Constructor і Lifecycle Object

Спрощений lifecycle:

    class definition
          │
          ▼
       new Class()
          │
          ▼
      constructor
          │
          ▼
     initialization
          │
          ▼
      ready object
          │
          ▼
       methods
          │
          ▼
     object lifetime

Constructor знаходиться на самому початку lifecycle instance.

---

# Constructor у OOP

У контексті OOP:

    Class
      │
      ├── Constructor
      │      └── initialization
      │
      ├── State
      │      └── properties
      │
      └── Behavior
             └── methods

Constructor пов'язує class definition із конкретним instance.

---

# Приклад: User

    class User {
      constructor(name, email) {
        this.name = name;
        this.email = email;
        this.isActive = true;
      }

      deactivate() {
        this.isActive = false;
      }
    }

Використання:

    const user = new User(
      "Valeriy",
      "user@example.com"
    );

Constructor створює:

    name
    email
    isActive

Method відповідає за behavior:

    deactivate()

---

# Приклад: Product

    class Product {
      constructor(name, price) {
        if (price < 0) {
          throw new Error(
            "Price cannot be negative"
          );
        }

        this.name = name;
        this.price = price;
      }

      applyDiscount(percent) {
        this.price -=
          this.price * percent / 100;
      }
    }

Constructor:

    initialization
    validation

Method:

    behavior

---

# Приклад: Counter

    class Counter {
      constructor(initialValue = 0) {
        this.value = initialValue;
      }

      increment() {
        this.value++;
      }

      decrement() {
        this.value--;
      }
    }

Використання:

    const counter = new Counter(10);

    counter.increment();

    console.log(counter.value);

Результат:

    11

---

# Приклад: Cart

    class Cart {
      constructor() {
        this.items = [];
      }

      add(item) {
        this.items.push(item);
      }

      remove(item) {
        this.items = this.items.filter(
          current => current !== item
        );
      }

      getTotal() {
        return this.items.reduce(
          (total, item) =>
            total + item.price,
          0
        );
      }
    }

Constructor створює initial collection:

    this.items = [];

Methods керують collection:

    add()
    remove()
    getTotal()

---

# Приклад: Encapsulated Cart

Більш encapsulated варіант:

    class Cart {
      #items = [];

      constructor(items = []) {
        this.#items = [...items];
      }

      add(item) {
        this.#items.push(item);
      }

      remove(item) {
        this.#items = this.#items.filter(
          current => current !== item
        );
      }

      getItems() {
        return [...this.#items];
      }
    }

Constructor створює власну копію initial collection.

---

# Приклад: Service

Constructor може отримувати dependency.

    class UserService {
      constructor(repository) {
        this.repository = repository;
      }

      findUser(id) {
        return this.repository.findById(id);
      }
    }

Використання:

    const repository = new UserRepository();

    const service = new UserService(
      repository
    );

Constructor initialization:

    this.repository = repository;

Method behavior:

    findUser()

---

# Типові помилки

❌ Викликати constructor вручну:

    user.constructor();

Constructor не призначений для повторної initialization instance.

---

❌ Створювати object без `new`:

    const user = User("John");

Для class це викличе помилку.

Правильно:

    const user = new User("John");

---

❌ Використовувати `this` до `super()`:

    class Dog extends Animal {
      constructor(name) {
        this.name = name;
        super(name);
      }
    }

Правильно:

    class Dog extends Animal {
      constructor(name) {
        super(name);
        this.name = name;
      }
    }

---

❌ Робити constructor надто складним.

    constructor() {
      // database
      // API
      // files
      // email
      // analytics
      // huge business logic
    }

Constructor повинен передусім initialize object.

---

❌ Дублювати initialization у methods.

Погано:

    class User {
      constructor() {
        this.name = null;
      }

      initialize(name) {
        this.name = name;
      }
    }

Якщо name є обов'язковим для valid User, краще передати його constructor:

    class User {
      constructor(name) {
        this.name = name;
      }
    }

---

❌ Створювати shared mutable state випадково.

Наприклад, не варто використовувати один mutable Array для всіх instances, якщо кожен object повинен мати власний список.

Краще:

    class Cart {
      constructor() {
        this.items = [];
      }
    }

---

# Питання зі співбесіди

Що таке constructor?

Коли викликається constructor?

Що робить `new`?

Для чого потрібен constructor?

Що таке constructor parameter?

Що таке constructor argument?

Що означає `this` у constructor?

Чи обов'язково class повинен мати constructor?

Що відбувається, якщо constructor не оголошений?

Чи можна передавати parameters у constructor?

Чи може constructor мати default parameters?

Чи може constructor виконувати validation?

Що таке initial state?

Чим constructor відрізняється від звичайного method?

Чи потрібно вручну викликати constructor?

Що відбувається під час `new Class()`?

Що таке `super()`?

Навіщо потрібен `super()` у derived class?

Чому `super()` повинен викликатися перед `this`?

Що таке constructor chaining?

Чи можна використовувати private fields у constructor?

Чи може constructor отримувати dependencies?

Що таке dependency injection через constructor?

Чому constructor не повинен містити всю business logic?

Як constructor пов'язаний з encapsulation?

Як constructor допомагає створити valid initial state?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке constructor.

`new`.

Instance.

Initialization.

Constructor parameters.

Constructor arguments.

`this`.

Initial state.

Default parameters.

Constructor validation.

Default constructor.

---

🔵 Junior

Constructor + private fields.

Constructor + getters/setters.

Constructor + validation.

Constructor + default values.

Constructor + arrays.

Constructor + objects.

Constructor + class fields.

Constructor + encapsulation.

Constructor + inheritance.

`super()`.

---

🟠 Middle

Constructor API design.

Constructor responsibility.

Valid initial state.

Invariants.

Constructor normalization.

Object parameter.

Destructuring constructor parameters.

Dependency injection.

Constructor dependencies.

Constructor + composition.

Avoiding heavy constructors.

Constructor and testability.

---

🔴 Senior

Constructor design at architecture level.

Dependency management.

Composition root.

Constructor dependency injection.

Object lifecycle.

Initialization boundaries.

Immutable initialization.

Constructor API stability.

Avoiding hidden side effects.

Managing complex object graphs.

Designing classes with minimal initialization responsibilities.

---

# Міні-шпаргалка

Constructor:

    new Class(data)
          │
          ▼
      constructor()
          │
          ▼
     initialization
          │
          ▼
       instance

---

`this`:

    class User {
      constructor(name) {
        this.name = name;
      }
    }

    const user = new User("John");

    this
     │
     ▼
    user

---

Parameters:

    class User {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
    }

    new User("John", 30)
             │      │
             ▼      ▼
          name     age

---

Validation:

    input
      │
      ▼
    constructor
      │
      ▼
    validation
      │
      ▼
    valid state
      │
      ▼
    object

---

Default parameter:

    constructor(
      name = "Guest"
    ) {
      this.name = name;
    }

    new User()

        ↓

    name = "Guest"

---

Inheritance:

    Child
      │
      ▼
    super()
      │
      ▼
    Parent constructor
      │
      ▼
    Parent state
      │
      ▼
    Child state

---

Dependency Injection:

    Dependency
        │
        ▼
    constructor(dependency)
        │
        ▼
      this.dependency
        │
        ▼
       Service

---

# Constructor vs Class Field

Простий fixed state:

    class Counter {
      value = 0;
    }

State залежить від input:

    class Counter {
      constructor(value = 0) {
        this.value = value;
      }
    }

Модель:

    Fixed state
        │
        ▼
    class field

    Dynamic state
        │
        ▼
    constructor

---

# Constructor vs Factory Method

Constructor:

    new User("John");

Factory method:

    User.guest();

Наприклад:

    class User {
      constructor(name) {
        this.name = name;
      }

      static guest() {
        return new User("Guest");
      }
    }

Factory method може приховати деталі створення object.

Модель:

    User.guest()
         │
         ▼
    new User("Guest")
         │
         ▼
    constructor()
         │
         ▼
      instance

---

# Constructor + Encapsulation

    class BankAccount {
      #balance;

      constructor(balance = 0) {
        if (balance < 0) {
          throw new Error(
            "Invalid balance"
          );
        }

        this.#balance = balance;
      }

      deposit(amount) {
        this.#balance += amount;
      }

      getBalance() {
        return this.#balance;
      }
    }

Модель:

    new BankAccount(1000)
             │
             ▼
       constructor
             │
             ▼
        validation
             │
             ▼
        #balance
             │
             ▼
      valid object

---

# Constructor + Inheritance

    class Animal {
      constructor(name) {
        this.name = name;
      }
    }

    class Dog extends Animal {
      constructor(name, breed) {
        super(name);
        this.breed = breed;
      }
    }

Модель:

    new Dog("Rex", "Labrador")
              │
              ▼
       Dog constructor
              │
              ▼
          super(name)
              │
              ▼
      Animal constructor
              │
              ▼
         this.name
              │
              ▼
      this.breed

---

# Головне

• `constructor()` — спеціальний method для initialization instance.

• Constructor автоматично запускається через `new`.

• `new Class()` створює новий instance.

• Constructor parameters отримують дані від `new`.

• Arguments — конкретні значення, передані constructor.

• `this` у constructor посилається на новий instance.

• Constructor часто створює initial state object.

• Constructor може встановлювати properties.

• Constructor може використовувати default parameters.

• Constructor може виконувати validation.

• Constructor може гарантувати valid initial state.

• Якщо constructor не оголошений, JavaScript використовує default constructor.

• Не кожен class потребує явного constructor.

• Constructor відрізняється від звичайного method тим, що він призначений для initialization.

• Constructor не потрібно викликати вручну.

• Constructor не повинен містити всю business logic.

• У derived class constructor потрібно викликати `super()`.

• `super()` викликає constructor parent class.

• У derived class `super()` повинен бути викликаний до використання `this`.

• Constructor може отримувати dependencies.

• Constructor dependency injection допомагає зробити class більш flexible та testable.

• Constructor parameters є частиною API створення class.

• Велика кількість constructor parameters може бути сигналом використовувати object parameter.

• Constructor повинен створювати object у зрозумілому та valid initial state.

---

# Коротка модель для запам'ятовування

    CONSTRUCTOR
          │
          ▼
       new Class()
          │
          ▼
     constructor()
          │
     ┌────┼────┐
     ▼    ▼    ▼
   input validation dependencies
     │    │    │
     └────┼────┘
          ▼
    initial state
          │
          ▼
      READY OBJECT

Головна ідея:

    Constructor
         =
    Initialize object

    new Class(data)
         │
         ▼
    constructor(data)
         │
         ▼
    valid initial state
         │
         ▼
       instance

У контексті OOP:

    CLASS
      │
      ├── constructor()
      │      └── initialization
      │
      ├── state
      │      └── properties
      │
      └── methods
             └── behavior

Головне правило:

    Constructor creates a valid initial state.

І ще коротше:

    new
     ↓
    constructor
     ↓
    initialize
     ↓
    object