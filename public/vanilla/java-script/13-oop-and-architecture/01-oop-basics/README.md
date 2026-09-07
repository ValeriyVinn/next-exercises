## 01. OOP Basics

Object-Oriented Programming (OOP) — це підхід до програмування, у якому програма будується навколо **об'єктів**, які об'єднують дані та поведінку.

У JavaScript OOP використовується для створення структурованого, повторно використовуваного та масштабованого коду.

---

### Ключові поняття

✔ OOP (Object-Oriented Programming)  
✔ object  
✔ property  
✔ method  
✔ class  
✔ instance  
✔ constructor  
✔ `this`  
✔ encapsulation  
✔ inheritance  
✔ polymorphism  
✔ abstraction  

---

### Що потрібно пам'ятати

• OOP — це спосіб організації коду навколо об'єктів.

• Object містить:
  - data → properties
  - behavior → methods

• Class — це шаблон для створення об'єктів.

• Instance — конкретний об'єкт, створений на основі class.

• Constructor — спеціальний метод, який виконується під час створення instance.

• `this` посилається на поточний об'єкт у відповідному контексті.

• Method — функція, яка є властивістю object/class.

• Properties описують стан object.

• Methods описують поведінку object.

• Один class може створити багато instances.

• OOP дозволяє моделювати об'єкти реального світу через код.

---

# Object

Object — це структура, яка зберігає дані у вигляді `key: value` і може містити функції.

Приклад:

    const user = {
      name: "Valeriy",
      age: 56,

      sayHello() {
        console.log(`Hello, ${this.name}`);
      }
    };

    console.log(user.name);

    user.sayHello();

Результат:

    Valeriy
    Hello, Valeriy

---

# Property

Property — це властивість object, яка зберігає дані.

    const user = {
      name: "Valeriy",
      age: 56,
      email: "user@example.com"
    };

Тут:

    name
    age
    email

— properties.

Значення:

    "Valeriy"
    56
    "user@example.com"

— values.

Доступ до property:

    user.name
    user.age
    user.email

---

# Method

Method — це функція, яка належить object.

    const user = {
      name: "Valeriy",

      sayHello() {
        console.log(`Hello, ${this.name}`);
      }
    };

    user.sayHello();

Method описує **поведінку object**.

---

# Data + Behavior

Одна з головних ідей OOP:

    Object
    │
    ├── Data
    │   ├── name
    │   └── age
    │
    └── Behavior
        ├── sayHello()
        └── login()

Наприклад:

    const user = {
      name: "Valeriy",
      age: 56,

      login() {
        console.log("User logged in");
      },

      sayHello() {
        console.log(`Hello, ${this.name}`);
      }
    };

Properties:

    name
    age

Methods:

    login()
    sayHello()

---

# Class

Class — це шаблон (blueprint) для створення objects.

    class User {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }

      sayHello() {
        console.log(`Hello, ${this.name}`);
      }
    }

Class сам по собі є описом того, якими будуть створені objects.

---

# Instance

Instance — конкретний object, створений за допомогою `new`.

    class User {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
    }

    const user1 = new User("Valeriy", 56);
    const user2 = new User("John", 30);

Тут:

    User

— class.

А:

    user1
    user2

— instances.

Можна уявити:

    User
      │
      ├── user1
      ├── user2
      ├── user3
      └── user4

Один class → багато instances.

---

# Constructor

`constructor()` — спеціальний метод class, який автоматично викликається під час створення instance.

    class User {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
    }

    const user = new User("Valeriy", 56);

Під час:

    new User("Valeriy", 56)

виконується:

    constructor("Valeriy", 56)

Constructor зазвичай використовується для початкового налаштування object.

---

# new

Оператор `new` створює новий instance class.

    const user = new User("Valeriy", 56);

Спрощено:

    class User
          │
          │ new
          ▼
    new object
          │
          ├── name
          └── age

`new` пов'язаний зі створенням нового object та prototype chain.

---

# this

`this` — спеціальне значення, яке посилається на object, з яким виконується method.

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

У цьому випадку:

    this === user

Тому:

    this.name

означає:

    user.name

---

# Class Example

Простий приклад:

    class User {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }

      sayHello() {
        console.log(`Hello, ${this.name}`);
      }

      getAge() {
        return this.age;
      }
    }

    const user = new User("Valeriy", 56);

    console.log(user.name);
    console.log(user.getAge());

    user.sayHello();

Структура:

    User
    │
    ├── properties
    │   ├── name
    │   └── age
    │
    └── methods
        ├── sayHello()
        └── getAge()

---

# Object vs Class

Object:

    const user = {
      name: "Valeriy",
      age: 56,

      sayHello() {
        console.log(`Hello, ${this.name}`);
      }
    };

Це конкретний object.

Class:

    class User {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }

      sayHello() {
        console.log(`Hello, ${this.name}`);
      }
    }

Це шаблон для створення objects.

---

# Class → Instances

    class User {
      constructor(name) {
        this.name = name;
      }
    }

    const user1 = new User("Valeriy");
    const user2 = new User("John");
    const user3 = new User("Anna");

Модель:

    User
      │
      ├── user1 → { name: "Valeriy" }
      ├── user2 → { name: "John" }
      └── user3 → { name: "Anna" }

---

# Methods

Methods можуть змінювати стан object.

    class Counter {
      constructor() {
        this.value = 0;
      }

      increment() {
        this.value++;
      }

      decrement() {
        this.value--;
      }

      getValue() {
        return this.value;
      }
    }

    const counter = new Counter();

    counter.increment();
    counter.increment();

    console.log(counter.getValue());

Результат:

    2

Object має state:

    value

Methods змінюють state:

    increment()
    decrement()

---

# State

State — поточний стан object, який зберігається у його properties.

    class Counter {
      constructor() {
        this.value = 0;
      }

      increment() {
        this.value++;
      }
    }

    const counter = new Counter();

Спочатку:

    counter.value === 0

Після:

    counter.increment();

стан:

    counter.value === 1

Після ще одного:

    counter.increment();

стан:

    counter.value === 2

---

# Object State + Behavior

Одна з базових моделей OOP:

    Object
       │
       ├── State
       │   ├── property
       │   ├── property
       │   └── property
       │
       └── Behavior
           ├── method()
           ├── method()
           └── method()

Наприклад:

    class BankAccount {
      constructor(balance) {
        this.balance = balance;
      }

      deposit(amount) {
        this.balance += amount;
      }

      withdraw(amount) {
        this.balance -= amount;
      }
    }

State:

    balance

Behavior:

    deposit()
    withdraw()

---

# Encapsulation

Encapsulation — об'єднання data та behavior в одному object і контроль доступу до внутрішнього стану.

Простий приклад:

    class BankAccount {
      constructor(balance) {
        this.balance = balance;
      }

      deposit(amount) {
        this.balance += amount;
      }
    }

    const account = new BankAccount(1000);

    account.deposit(500);

    console.log(account.balance);

Data:

    balance

Behavior:

    deposit()

У сучасному JavaScript для справжнього private поля можна використовувати `#`.

    class BankAccount {
      #balance;

      constructor(balance) {
        this.#balance = balance;
      }

      deposit(amount) {
        this.#balance += amount;
      }

      getBalance() {
        return this.#balance;
      }
    }

    const account = new BankAccount(1000);

    account.deposit(500);

    console.log(account.getBalance());

Безпосередній доступ:

    account.#balance

викличе помилку.

---

# Inheritance

Inheritance — створення нового class на основі існуючого class.

    class User {
      constructor(name) {
        this.name = name;
      }

      sayHello() {
        console.log(`Hello, ${this.name}`);
      }
    }

    class Admin extends User {
      deleteUser() {
        console.log("User deleted");
      }
    }

    const admin = new Admin("Valeriy");

    admin.sayHello();
    admin.deleteUser();

`Admin` успадковує behavior від `User`.

Модель:

    User
      │
      └── Admin
            │
            ├── sayHello()
            └── deleteUser()

Детальніше inheritance вивчається у:

    13-oop/04-inheritance

---

# Polymorphism

Polymorphism — можливість різних objects мати однаковий interface, але різну реалізацію behavior.

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

    const animals = [
      new Dog(),
      new Cat()
    ];

    animals.forEach(animal => {
      animal.speak();
    });

Результат:

    Woof
    Meow

Один method:

    speak()

але різна поведінка.

Детальніше polymorphism буде важливим при вивченні inheritance.

---

# Abstraction

Abstraction — приховування складних деталей реалізації та надання простого interface для використання.

Наприклад:

    class CoffeeMachine {
      makeCoffee() {
        this.#heatWater();
        this.#grindBeans();
        this.#brew();
      }

      #heatWater() {
        console.log("Heating water...");
      }

      #grindBeans() {
        console.log("Grinding beans...");
      }

      #brew() {
        console.log("Brewing coffee...");
      }
    }

Користувачу достатньо:

    const machine = new CoffeeMachine();

    machine.makeCoffee();

Не потрібно знати внутрішні кроки.

Модель:

    Public API
         │
         ▼
    makeCoffee()
         │
         ├── #heatWater()
         ├── #grindBeans()
         └── #brew()

---

# Чотири основні принципи OOP

Класична модель OOP:

    OOP
    │
    ├── Encapsulation
    ├── Inheritance
    ├── Polymorphism
    └── Abstraction

### Encapsulation

Об'єднання data та behavior і контроль доступу до внутрішнього стану.

### Inheritance

Створення нового class на основі існуючого.

### Polymorphism

Одна interface/операція → різна поведінка різних objects.

### Abstraction

Приховування складної реалізації за простим interface.

---

# Composition

Composition — побудова object з інших objects.

Часто в сучасному JavaScript composition є кращою альтернативою надмірному inheritance.

    class Engine {
      start() {
        console.log("Engine started");
      }
    }

    class Car {
      constructor() {
        this.engine = new Engine();
      }

      start() {
        this.engine.start();
      }
    }

    const car = new Car();

    car.start();

Модель:

    Car
     │
     └── Engine

Car **має** Engine.

Це називається:

    has-a relationship

На відміну від:

    is-a relationship

яке часто описує inheritance.

---

# is-a vs has-a

Inheritance:

    Dog is an Animal

Composition:

    Car has an Engine

Приклад inheritance:

    class Animal {}

    class Dog extends Animal {}

Приклад composition:

    class Engine {}

    class Car {
      constructor() {
        this.engine = new Engine();
      }
    }

---

# Prototype

JavaScript використовує prototype-based object model.

Objects можуть успадковувати властивості та methods через prototype chain.

Наприклад:

    const user = {
      name: "Valeriy"
    };

    console.log(user.toString());

`toString()` не був явно створений у `user`.

Він доступний через prototype chain.

Спрощено:

    user
      │
      ▼
    Object.prototype
      │
      ▼
    null

---

# Class і Prototype

JavaScript `class` не скасовує prototype system.

Наприклад:

    class User {
      sayHello() {
        console.log("Hello");
      }
    }

    const user1 = new User();
    const user2 = new User();

Метод:

    sayHello()

не потрібно створювати окремо в кожному instance.

Він знаходиться у:

    User.prototype

Модель:

    User
      │
      ├── prototype
      │     └── sayHello()
      │
      ├── user1
      └── user2

Обидва instances використовують prototype method.

---

# Class Syntax vs Prototype Syntax

Class syntax:

    class User {
      constructor(name) {
        this.name = name;
      }

      sayHello() {
        console.log(`Hello, ${this.name}`);
      }
    }

Приблизно пов'язано з prototype:

    function User(name) {
      this.name = name;
    }

    User.prototype.sayHello = function () {
      console.log(`Hello, ${this.name}`);
    };

Сучасний JavaScript зазвичай використовує `class` syntax, коли потрібна класична OOP-структура.

---

# Static

`static` method належить самому class, а не його instances.

    class MathHelper {
      static add(a, b) {
        return a + b;
      }
    }

Виклик:

    MathHelper.add(2, 3);

Не:

    const helper = new MathHelper();

    helper.add(2, 3);

`static` використовується для behavior, який логічно належить class, а не конкретному instance.

---

# Getter

Getter дозволяє отримувати значення як property, хоча фактично виконується method.

    class User {
      constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
      }

      get fullName() {
        return `${this.firstName} ${this.lastName}`;
      }
    }

    const user = new User("Valeriy", "Svystun");

    console.log(user.fullName);

Звернення:

    user.fullName

а не:

    user.fullName()

---

# Setter

Setter дозволяє контролювати встановлення значення property.

    class User {
      constructor(name) {
        this.name = name;
      }

      set username(value) {
        this.name = value.trim();
      }
    }

    const user = new User("Valeriy");

    user.username = " John ";

    console.log(user.name);

Результат:

    John

---

# Public Fields

Class може мати public fields.

    class User {
      role = "user";

      constructor(name) {
        this.name = name;
      }
    }

    const user = new User("Valeriy");

    console.log(user.name);
    console.log(user.role);

---

# Private Fields

Private fields позначаються `#`.

    class User {
      #password;

      constructor(password) {
        this.#password = password;
      }

      checkPassword(password) {
        return this.#password === password;
      }
    }

    const user = new User("12345");

    console.log(user.checkPassword("12345"));

Зовні:

    user.#password

недоступне.

Private fields використовуються для encapsulation.

---

# OOP Mental Model

Корисно мислити так:

    REAL WORLD
         │
         ▼
    ENTITY
         │
         ▼
    OBJECT
         │
         ├── STATE
         │    └── properties
         │
         └── BEHAVIOR
              └── methods

Наприклад:

    REAL WORLD
         │
         ▼
       User
         │
         ▼
      Object
       │
       ├── name
       ├── email
       ├── age
       │
       ├── login()
       ├── logout()
       └── updateProfile()

---

# OOP Mental Model: Class

    Class
      │
      │ new
      ▼
    Instance
      │
      ├── state
      │
      └── behavior

Наприклад:

    class User
         │
         │ new
         ▼
    user1
         │
         ├── name
         ├── email
         └── login()

---

# OOP Mental Model: Application

У великому application:

    Application
         │
         ├── User
         │    ├── properties
         │    └── methods
         │
         ├── Product
         │    ├── properties
         │    └── methods
         │
         ├── Cart
         │    ├── properties
         │    └── methods
         │
         └── Order
              ├── properties
              └── methods

Objects взаємодіють між собою:

    User
      │
      ▼
    Cart
      │
      ▼
    Product
      │
      ▼
    Order

---

# Простий приклад OOP Application

    class Product {
      constructor(name, price) {
        this.name = name;
        this.price = price;
      }
    }

    class Cart {
      constructor() {
        this.items = [];
      }

      add(product) {
        this.items.push(product);
      }

      getTotal() {
        return this.items.reduce(
          (total, product) => total + product.price,
          0
        );
      }
    }

    const laptop = new Product("Laptop", 1000);
    const mouse = new Product("Mouse", 50);

    const cart = new Cart();

    cart.add(laptop);
    cart.add(mouse);

    console.log(cart.getTotal());

Результат:

    1050

Модель:

    Product
       │
       ├── name
       └── price

    Cart
       │
       ├── items
       ├── add()
       └── getTotal()

    Application
       │
       ├── Product
       └── Cart

---

# Object Relationships

Основні відносини між objects:

    is-a
    has-a
    uses-a

### is-a

Inheritance.

    Dog is an Animal

### has-a

Composition.

    Car has an Engine

### uses-a

Один object використовує інший.

    Order uses PaymentService

---

# OOP і функції

OOP не означає, що функції більше не використовуються.

Навпаки:

    Object
      │
      └── Methods
             │
             └── functions

Method — це function, пов'язана з object/class.

---

# OOP vs Procedural Programming

Procedural style:

    let balance = 1000;

    function deposit(amount) {
      balance += amount;
    }

    function withdraw(amount) {
      balance -= amount;
    }

OOP style:

    class BankAccount {
      constructor(balance) {
        this.balance = balance;
      }

      deposit(amount) {
        this.balance += amount;
      }

      withdraw(amount) {
        this.balance -= amount;
      }
    }

    const account = new BankAccount(1000);

Порівняння:

    Procedural
       │
       ├── data
       └── functions

    OOP
       │
       └── object
            ├── data
            └── methods

---

# Коли використовувати OOP

OOP особливо корисний, коли:

✔ у application багато сутностей  
✔ objects мають state  
✔ objects мають behavior  
✔ objects взаємодіють між собою  
✔ потрібне повторне створення однотипних objects  
✔ application стає великим  
✔ потрібна чітка структура коду  
✔ потрібно моделювати складну предметну область  

Наприклад:

    User
    Product
    Order
    Cart
    Payment
    Vehicle
    Employee
    Course

---

# Коли OOP може бути зайвим

Не кожен JavaScript код потрібно будувати через classes.

Для простої операції:

    const sum = (a, b) => a + b;

class може бути непотрібним.

Для невеликого transformation:

    const names = users.map(user => user.name);

також не потрібен class.

Важливо:

    OOP ≠ використовувати class всюди

OOP — це спосіб моделювання та організації складного коду.

---

# Типові помилки

❌ Вважати class object.

❌ Вважати instance class.

❌ Плутати property та method.

❌ Забувати `new` при створенні instance.

❌ Не розуміти призначення `constructor`.

❌ Не розуміти `this`.

❌ Вважати `this` завжди рівним class.

❌ Вважати OOP просто використанням `class`.

❌ Використовувати inheritance всюди.

❌ Створювати class для кожної маленької функції.

❌ Ігнорувати composition.

❌ Не розуміти prototype chain.

❌ Намагатися зробити весь application через одну величезну class.

---

# Питання зі співбесіди

Що таке OOP?

Що таке object?

Що таке property?

Що таке method?

Що таке class?

Що таке instance?

Що робить `constructor()`?

Для чого використовується `new`?

Що таке `this`?

Яка різниця між object і class?

Яка різниця між class і instance?

Що таке encapsulation?

Що таке inheritance?

Що таке polymorphism?

Що таке abstraction?

Що таке composition?

Що таке prototype?

Як class пов'язаний з prototype?

Що таке `static` method?

Що таке getter?

Що таке setter?

Що таке private field?

Яка різниця між `is-a` та `has-a`?

Коли OOP доцільно використовувати?

Чому не потрібно використовувати class для всього?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке OOP.

Що таке object.

Що таке property.

Що таке method.

Різниця між property та method.

Що таке class.

Що таке instance.

Різниця між class та instance.

Що робить `constructor`.

Що робить `new`.

Базове розуміння `this`.

Data + Behavior.

State + Behavior.

Class → Instance.

---

🔵 Junior

Створення class.

Створення instances.

Constructor parameters.

Methods.

`this`.

Public fields.

Private fields `#`.

Getters.

Setters.

Static methods.

Prototype basics.

Prototype chain.

Encapsulation.

Composition.

Розуміння inheritance.

Розуміння polymorphism.

Розуміння abstraction.

---

🟠 Middle

Проєктування класів.

Відповідальність class.

Composition over inheritance.

Dependency relationships.

Object collaboration.

Encapsulation design.

Public API object.

Private implementation details.

Prototype chain.

`this` у різних контекстах.

Static vs instance methods.

OOP design patterns.

SOLID principles.

---

🔴 Senior

Domain modeling.

Object-oriented architecture.

Composition vs inheritance trade-offs.

Abstraction boundaries.

Dependency management.

Loose coupling.

High cohesion.

Design patterns.

SOLID.

Domain-driven design.

Object lifecycle.

Large-scale OOP architecture.

Trade-offs між OOP, functional та procedural approaches.

---

# Міні-шпаргалка

OOP:

    Object-Oriented Programming
             │
             ▼
          Objects
             │
       ┌─────┴─────┐
       ▼           ▼
     State      Behavior
       │           │
   properties    methods

Class:

    Class
      │
      │ new
      ▼
    Instance

Constructor:

    new User(...)
          │
          ▼
    constructor(...)

`this`:

    object
      │
      └── this

OOP principles:

    OOP
    │
    ├── Encapsulation
    ├── Inheritance
    ├── Polymorphism
    └── Abstraction

Relationships:

    is-a   → inheritance
    has-a  → composition
    uses-a → dependency

Prototype:

    object
      │
      ▼
    prototype
      │
      ▼
    prototype
      │
      ▼
    null

---

# Головне

• OOP — підхід до організації програм навколо objects.

• Object містить state та behavior.

• Properties зберігають data.

• Methods описують behavior.

• Class — шаблон для створення objects.

• Instance — конкретний object, створений на основі class.

• `constructor()` налаштовує новий instance.

• `new` створює instance.

• `this` використовується для звернення до поточного object у відповідному контексті.

• Encapsulation об'єднує data та behavior і дозволяє контролювати доступ до внутрішнього стану.

• Inheritance дозволяє створювати class на основі іншого class.

• Polymorphism дозволяє різним objects реалізовувати однаковий interface по-різному.

• Abstraction приховує складність реалізації за простим interface.

• Composition дозволяє будувати складні objects з інших objects.

• JavaScript використовує prototype-based object model.

• `class` у JavaScript працює поверх prototype mechanism.

• OOP не дорівнює `class`.

• Не кожен JavaScript код потребує OOP.

• Для складних application важливо думати не тільки про classes, а про **objects, їх відповідальність та взаємодію**.

---

# Коротка модель для запам'ятовування

    OOP
     │
     ▼
    OBJECT
     │
     ├── STATE
     │    └── properties
     │
     └── BEHAVIOR
          └── methods

    CLASS
       │
       │ new
       ▼
    INSTANCE
       │
       ├── state
       └── behavior

    OOP
     │
     ├── Encapsulation
     ├── Inheritance
     ├── Polymorphism
     └── Abstraction

    Relationships
     │
     ├── is-a   → inheritance
     ├── has-a  → composition
     └── uses-a → dependency