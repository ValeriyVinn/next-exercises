# 10. Polymorphism

Polymorphism (поліморфізм) — один з основних принципів OOP, який дозволяє різним objects реагувати на однаковий interface або method по-різному.

Основна ідея:

    Same Interface
          │
          ▼
    Different Objects
       │       │
       ▼       ▼
    Behavior  Behavior
       │       │
       └───┬───┘
           ▼
      Different Results

Тобто зовнішній код може працювати з різними objects однаково, не знаючи їх конкретного типу.

---

### Ключові поняття

✔ polymorphism  
✔ poly  
✔ morph  
✔ same interface  
✔ different behavior  
✔ method overriding  
✔ inheritance  
✔ subclass  
✔ superclass  
✔ parent class  
✔ child class  
✔ dynamic dispatch  
✔ duck typing  
✔ structural compatibility  
✔ common interface  
✔ abstraction  
✔ loose coupling  
✔ substitutability  
✔ polymorphic function  
✔ polymorphic collection  

---

### Що потрібно пам'ятати

• Polymorphism означає "many forms" — одна interface, різні реалізації.

• Різні objects можуть мати method з однаковим ім'ям, але різною поведінкою.

• Найчастіше polymorphism у JavaScript реалізується через inheritance + method overriding.

• JavaScript також підтримує polymorphism через duck typing.

• Для polymorphism не завжди потрібен `extends`.

• Polymorphic code працює з object через спільний interface.

• Зовнішньому коду не обов'язково знати конкретний class object.

• Method overriding дозволяє subclass змінити behavior успадкованого method.

• `super.method()` дозволяє використати реалізацію parent class.

• Polymorphism допомагає зменшити `if/else` та `switch`, коли behavior залежить від типу object.

• Polymorphism допомагає зменшити coupling.

• Polymorphism особливо корисний у великих applications, services та architecture.

• У JavaScript polymorphism часто базується на behavior, а не на формальному типі.

• Duck typing: "If it behaves like the required object, it can be used."

---

# Що таке Polymorphism

Назва походить від:

    poly
      ↓
    many

    morph
      ↓
    forms

Тобто:

    Polymorphism
         ↓
    many forms

У програмуванні це означає:

    Same operation
          │
          ▼
    Different objects
          │
          ▼
    Different behavior

Наприклад:

    animal.speak()

Для різних objects:

    Dog      → "Woof"
    Cat      → "Meow"
    Cow      → "Moo"

Interface однаковий:

    speak()

Behavior різний.

---

# Найпростіший приклад

    class Dog {
      speak() {
        console.log("Woof");
      }
    }

    class Cat {
      speak() {
        console.log("Meow");
      }
    }

Тепер:

    const dog = new Dog();
    const cat = new Cat();

    dog.speak();
    cat.speak();

Результат:

    Woof
    Meow

Обидва objects мають:

    speak()

але реалізація різна.

Це polymorphism.

---

# Модель Polymorphism

    External Code
          │
          ▼
       speak()
          │
       ┌──┴──┐
       ▼     ▼
      Dog    Cat
       │      │
       ▼      ▼
     "Woof" "Meow"

Один interface:

    speak()

Різні implementations:

    Dog.speak()
    Cat.speak()

---

# Polymorphism через Inheritance

Один із класичних способів реалізації polymorphism:

    Parent Class
          │
      ┌───┴───┐
      ▼       ▼
    Child   Child
    Class   Class

Наприклад:

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

Тут:

    Animal
      │
      ├── Dog
      │
      └── Cat

Обидва subclasses мають:

    speak()

але реалізують його по-різному.

---

# Method Overriding

Method overriding — коли subclass створює власну реалізацію method, який вже існує в parent class.

Наприклад:

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

Parent:

    Animal.speak()

Dog:

    Dog.speak()

Cat:

    Cat.speak()

Одна назва:

    speak()

Різна реалізація.

---

# Parent Class

Parent class може визначати common interface.

    class Animal {
      speak() {
        console.log("Animal sound");
      }
    }

Child classes реалізують конкретний behavior:

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

Модель:

    Animal
      │
      └── speak()
           │
      ┌────┴────┐
      ▼         ▼
     Dog       Cat
      │         │
      ▼         ▼
    Woof       Meow

---

# Polymorphic Function

Function може працювати з різними objects через спільний interface.

    function makeSound(animal) {
      animal.speak();
    }

Тепер:

    makeSound(new Dog());
    makeSound(new Cat());

Результат:

    Woof
    Meow

Function не перевіряє:

    if (animal instanceof Dog)

або:

    if (animal instanceof Cat)

Вона просто очікує:

    speak()

Це polymorphic behavior.

---

# Polymorphic Collection

Можна зберігати різні objects в одній collection.

    const animals = [
      new Dog(),
      new Cat(),
      new Dog()
    ];

Потім:

    for (const animal of animals) {
      animal.speak();
    }

Результат:

    Woof
    Meow
    Woof

Зовнішній код працює з усіма objects однаково:

    animal.speak()

але кожен object виконує власну реалізацію.

---

# Dynamic Dispatch

Dynamic dispatch — вибір конкретної реалізації method під час виконання програми.

Наприклад:

    function makeSound(animal) {
      animal.speak();
    }

Якщо передати:

    new Dog()

буде викликано:

    Dog.speak()

Якщо:

    new Cat()

буде викликано:

    Cat.speak()

Модель:

    makeSound(animal)
           │
           ▼
       animal.speak()
           │
       ┌───┴───┐
       ▼       ▼
      Dog     Cat
       │       │
       ▼       ▼
    Dog.speak Cat.speak

Тобто конкретна реалізація визначається object, який фактично передано.

---

# Polymorphism і this

У polymorphic method `this` посилається на поточний object.

    class Animal {
      speak() {
        console.log("Animal");
      }
    }

    class Dog extends Animal {
      speak() {
        console.log("Woof");
      }
    }

    const animal = new Dog();

    animal.speak();

Буде викликано:

    Dog.speak()

а `this` всередині method буде:

    dog object

---

# Polymorphism через Duck Typing

JavaScript дозволяє polymorphism без inheritance.

Наприклад:

    class Dog {
      speak() {
        console.log("Woof");
      }
    }

    class Robot {
      speak() {
        console.log("Beep");
      }
    }

Function:

    function makeSound(object) {
      object.speak();
    }

Використання:

    makeSound(new Dog());
    makeSound(new Robot());

Результат:

    Woof
    Beep

`Robot` не успадковує `Animal`.

Але він має потрібний behavior:

    speak()

Це приклад duck typing.

---

# Duck Typing

Duck typing можна пояснити так:

    "If it walks like a duck
     and quacks like a duck,
     treat it like a duck."

У JavaScript важливий не обов'язково class object, а його behavior.

Наприклад:

    function startEngine(vehicle) {
      vehicle.start();
    }

Можна передати:

    class Car {
      start() {
        console.log("Car started");
      }
    }

    class Motorcycle {
      start() {
        console.log("Motorcycle started");
      }
    }

Обидва підтримують:

    start()

Тому:

    startEngine(new Car());
    startEngine(new Motorcycle());

---

# Structural Compatibility

JavaScript не вимагає, щоб objects мали однаковий parent class.

Якщо object підтримує потрібний interface:

    object.start()

його можна використовувати.

Наприклад:

    const car = {
      start() {
        console.log("Car started");
      }
    };

    const machine = {
      start() {
        console.log("Machine started");
      }
    };

    function start(object) {
      object.start();
    }

    start(car);
    start(machine);

Спільна структура:

    {
      start()
    }

Різні objects:

    car
    machine

---

# Class-based vs Duck Typing

### Class-based polymorphism

    class Animal {
      speak() {}
    }

    class Dog extends Animal {
      speak() {}
    }

    class Cat extends Animal {
      speak() {}
    }

Спільність визначається через:

    inheritance

---

### Duck typing

    class Dog {
      speak() {}
    }

    class Robot {
      speak() {}
    }

Спільність визначається через:

    behavior

---

# Interface у JavaScript

JavaScript не має вбудованого `interface` keyword у звичайному JavaScript так, як деякі статично типізовані мови.

Але можна домовитися про common interface.

Наприклад:

    speak()

Очікується, що object матиме:

    speak()

Тоді:

    function makeSound(object) {
      object.speak();
    }

Common interface:

    speak()

Implementations:

    Dog.speak()
    Cat.speak()
    Robot.speak()

---

# Common Interface

Уявімо:

    Drawable

з interface:

    draw()

Різні objects:

    Circle
    Rectangle
    Triangle

Кожен має:

    draw()

Наприклад:

    class Circle {
      draw() {
        console.log("Drawing circle");
      }
    }

    class Rectangle {
      draw() {
        console.log("Drawing rectangle");
      }
    }

Function:

    function render(shape) {
      shape.draw();
    }

Тепер:

    render(new Circle());
    render(new Rectangle());

Одна operation:

    draw()

Різна реалізація.

---

# Polymorphism без if/else

Проблема:

    function getPrice(product) {
      if (product.type === "book") {
        return product.price * 0.9;
      }

      if (product.type === "electronics") {
        return product.price * 0.95;
      }

      if (product.type === "food") {
        return product.price;
      }
    }

Function знає про всі типи.

Це створює coupling.

---

# Polymorphism замість if/else

Можна перенести behavior в objects.

    class Book {
      constructor(price) {
        this.price = price;
      }

      getPrice() {
        return this.price * 0.9;
      }
    }

    class Electronics {
      constructor(price) {
        this.price = price;
      }

      getPrice() {
        return this.price * 0.95;
      }
    }

    class Food {
      constructor(price) {
        this.price = price;
      }

      getPrice() {
        return this.price;
      }
    }

Тепер:

    function getPrice(product) {
      return product.getPrice();
    }

Function не знає конкретний type.

Вона знає тільки:

    getPrice()

---

# Polymorphism і Coupling

Без polymorphism:

    Application
         │
         ├── if Book
         ├── if Electronics
         ├── if Food
         └── if Service

Application знає багато деталей.

З polymorphism:

    Application
         │
         ▼
    Common Interface
         │
      ┌──┼──┐
      ▼  ▼  ▼
    Book Food Service

Application знає тільки interface.

Це зменшує coupling.

---

# Polymorphism і Open/Closed Principle

Polymorphism добре працює разом із Open/Closed Principle.

Ідея:

    Open for extension
    Closed for modification

Наприклад:

    function processPayment(payment) {
      payment.pay();
    }

Можна додати:

    class CardPayment {
      pay() {
        console.log("Pay by card");
      }
    }

    class CashPayment {
      pay() {
        console.log("Pay by cash");
      }
    }

    class CryptoPayment {
      pay() {
        console.log("Pay by crypto");
      }
    }

Function:

    processPayment()

не потрібно змінювати.

Додаємо нові implementations:

    CardPayment
    CashPayment
    CryptoPayment

але common API залишається:

    pay()

---

# Polymorphism і Composition

Polymorphism часто використовується разом із composition.

Наприклад:

    class EmailSender {
      send(message) {
        console.log("Sending email");
      }
    }

    class SmsSender {
      send(message) {
        console.log("Sending SMS");
      }
    }

Service:

    class NotificationService {
      constructor(sender) {
        this.sender = sender;
      }

      notify(message) {
        this.sender.send(message);
      }
    }

Тепер:

    const emailService =
      new NotificationService(
        new EmailSender()
      );

    const smsService =
      new NotificationService(
        new SmsSender()
      );

NotificationService працює з будь-яким object, який має:

    send()

Це polymorphism через composition.

---

# Dependency Injection + Polymorphism

Polymorphism часто є основою Dependency Injection.

Наприклад:

    class NotificationService {
      constructor(sender) {
        this.sender = sender;
      }

      notify(message) {
        this.sender.send(message);
      }
    }

Можна передати:

    new EmailSender()

або:

    new SmsSender()

Service не залежить від конкретної implementation.

Модель:

    NotificationService
           │
           ▼
        sender
           │
       ┌───┴───┐
       ▼       ▼
     Email     SMS
     Sender   Sender

---

# Polymorphism і Services

У real application services можуть працювати через common interface.

Наприклад:

    class UserRepository {
      findById(id) {
        // implementation
      }
    }

Можна мати:

    class PostgresUserRepository {
      findById(id) {
        // PostgreSQL
      }
    }

    class MongoUserRepository {
      findById(id) {
        // MongoDB
      }
    }

Service:

    class UserService {
      constructor(repository) {
        this.repository = repository;
      }

      getUser(id) {
        return this.repository.findById(id);
      }
    }

UserService не повинен знати, яка саме database використовується.

Common interface:

    findById()

Implementations:

    PostgresUserRepository
    MongoUserRepository

---

# Real-world Example: Payment

Уявімо payment system.

Common interface:

    pay()

Implementations:

    CardPayment
    PayPalPayment
    BankTransferPayment

Наприклад:

    class CardPayment {
      pay(amount) {
        console.log(
          `Card payment: ${amount}`
        );
      }
    }

    class PayPalPayment {
      pay(amount) {
        console.log(
          `PayPal payment: ${amount}`
        );
      }
    }

    class BankTransferPayment {
      pay(amount) {
        console.log(
          `Bank transfer: ${amount}`
        );
      }
    }

Application:

    function checkout(payment, amount) {
      payment.pay(amount);
    }

Використання:

    checkout(
      new CardPayment(),
      100
    );

    checkout(
      new PayPalPayment(),
      100
    );

    checkout(
      new BankTransferPayment(),
      100
    );

Одна function:

    checkout()

різні behaviors:

    Card
    PayPal
    Bank Transfer

---

# Real-world Example: Storage

Common interface:

    save()
    load()

Implementations:

    LocalStorage
    FileStorage
    DatabaseStorage

Наприклад:

    class LocalStorageRepository {
      save(data) {
        console.log("Save to localStorage");
      }

      load() {
        console.log("Load from localStorage");
      }
    }

    class FileRepository {
      save(data) {
        console.log("Save to file");
      }

      load() {
        console.log("Load from file");
      }
    }

Application:

    function saveData(repository, data) {
      repository.save(data);
    }

Тепер application не залежить від конкретного storage.

---

# Polymorphism і Architecture

На рівні architecture polymorphism допомагає відокремлювати:

    Business Logic
          │
          ▼
      Interface
          │
      ┌───┴────┐
      ▼        ▼
   Adapter   Adapter
      │        │
      ▼        ▼
 PostgreSQL  API

Наприклад:

    UserService
         │
         ▼
    UserRepository
         │
      ┌──┴──┐
      ▼     ▼
 Postgres  Mock

Business logic працює через common contract.

---

# Polymorphic Adapter

Adapter може реалізовувати common interface.

Наприклад:

    class PaymentService {
      constructor(provider) {
        this.provider = provider;
      }

      pay(amount) {
        return this.provider.pay(amount);
      }
    }

Providers:

    StripeProvider
    PayPalProvider
    BankProvider

Кожен підтримує:

    pay()

PaymentService не повинен знати internal details provider.

---

# Polymorphism і Testing

Polymorphism спрощує testing.

Наприклад production implementation:

    class ApiUserRepository {
      findById(id) {
        // HTTP request
      }
    }

Для тесту можна використати:

    class MockUserRepository {
      findById(id) {
        return {
          id,
          name: "Test User"
        };
      }
    }

Service:

    class UserService {
      constructor(repository) {
        this.repository = repository;
      }

      getUser(id) {
        return this.repository.findById(id);
      }
    }

У production:

    new UserService(
      new ApiUserRepository()
    );

У test:

    new UserService(
      new MockUserRepository()
    );

Common interface:

    findById()

Це одна з важливих практичних переваг polymorphism.

---

# Substitutability

Polymorphism дозволяє замінити один object іншим, якщо він підтримує необхідний contract.

Наприклад:

    function printName(user) {
      console.log(user.getName());
    }

Можна передати:

    User

або:

    Admin

якщо обидва мають:

    getName()

Модель:

    Required Behavior
          │
          ▼
       getName()
          │
      ┌───┴───┐
      ▼       ▼
     User    Admin

---

# Polymorphism і Liskov Substitution Principle

Liskov Substitution Principle (LSP) пов'язаний із polymorphism.

Ідея:

    Child object
         ↓
    can substitute
         ↓
    Parent object

якщо child зберігає очікувану поведінку contract.

Наприклад:

    class Bird {
      move() {
        console.log("Moving");
      }
    }

Якщо:

    class Sparrow extends Bird {
      move() {
        console.log("Flying");
      }
    }

це логічна заміна.

Але якщо створити:

    class Penguin extends Bird {
      move() {
        // ...
      }
    }

потрібно уважно визначити abstraction.

Не кожна inheritance relationship є хорошою polymorphic relationship.

---

# Поганий Polymorphism

Не слід створювати inheritance тільки заради polymorphism.

Погано:

    class Database {
      connect() {}
    }

    class FileSystem extends Database {
      connect() {}
    }

Якщо FileSystem не є Database, inheritance створює неправильну модель.

Краще визначити common behavior:

    connect()

і використовувати composition або окремий interface/contract.

---

# Inheritance vs Duck Typing

### Inheritance

    class Animal {
      speak() {}
    }

    class Dog extends Animal {
      speak() {}
    }

Зв'язок:

    Dog IS-A Animal

---

### Duck Typing

    class Dog {
      speak() {}
    }

    class Robot {
      speak() {}
    }

Зв'язок:

    Dog supports speak()
    Robot supports speak()

Inheritance не потрібне.

---

# Method Overriding vs Method Overloading

Ці поняття не потрібно плутати.

### Overriding

Subclass змінює behavior parent method.

    class Animal {
      speak() {}
    }

    class Dog extends Animal {
      speak() {}
    }

Це:

    overriding

---

### Overloading

Одна назва method з різними параметрами.

У класичних мовах:

    calculate()
    calculate(a)
    calculate(a, b)

JavaScript не має традиційного method overloading як Java або C++.

Наприклад:

    class Calculator {
      add(a, b) {
        return a + b;
      }
    }

Не можна визначити окремо:

    add(a)
    add(a, b)

Остання definition перезапише попередню.

---

# Polymorphism і JavaScript Functions

Polymorphism не обмежується classes.

JavaScript functions також можуть працювати з різними values.

Наприклад:

    function getLength(value) {
      return value.length;
    }

Можна передати:

    getLength("Hello");

або:

    getLength([1, 2, 3]);

або object:

    const collection = {
      length: 10
    };

    getLength(collection);

Function використовує common property:

    length

Це форма structural polymorphism.

---

# Polymorphism через Common Method

Найпростіша модель:

    function process(object) {
      object.execute();
    }

Objects:

    objectA.execute()
    objectB.execute()
    objectC.execute()

Function:

    process()

не знає конкретний type.

Вона знає:

    execute()

---

# Polymorphism через Common Property

Не обов'язково використовувати method.

Наприклад:

    function printName(object) {
      console.log(object.name);
    }

Objects:

    const user = {
      name: "Valeriy"
    };

    const product = {
      name: "Laptop"
    };

Обидва підтримують:

    name

Function працює з обома.

---

# Polymorphism і Callbacks

Callbacks також можуть демонструвати polymorphic behavior.

Наприклад:

    function processItems(items, callback) {
      return items.map(callback);
    }

Можна передати різні behaviors:

    processItems(
      [1, 2, 3],
      number => number * 2
    );

або:

    processItems(
      [1, 2, 3],
      number => number ** 2
    );

Common interface:

    callback(value)

Different behavior:

    multiply
    square

---

# Polymorphism і Strategy Pattern

Strategy Pattern — практичний приклад polymorphism.

Наприклад:

    class CreditCardStrategy {
      pay(amount) {
        console.log(
          `Card: ${amount}`
        );
      }
    }

    class PayPalStrategy {
      pay(amount) {
        console.log(
          `PayPal: ${amount}`
        );
      }
    }

Context:

    class PaymentService {
      constructor(strategy) {
        this.strategy = strategy;
      }

      pay(amount) {
        this.strategy.pay(amount);
      }
    }

Використання:

    const service =
      new PaymentService(
        new CreditCardStrategy()
      );

    service.pay(100);

Можна замінити strategy:

    service.strategy =
      new PayPalStrategy();

    service.pay(100);

Один interface:

    pay()

Різні strategies.

---

# Polymorphism і State Pattern

State Pattern також використовує polymorphic behavior.

Наприклад:

    class LoggedOutState {
      handle() {
        console.log("Show login");
      }
    }

    class LoggedInState {
      handle() {
        console.log("Show dashboard");
      }
    }

Context:

    class UserSession {
      constructor(state) {
        this.state = state;
      }

      handle() {
        this.state.handle();
      }
    }

Тут різні state objects мають:

    handle()

але різний behavior.

---

# Polymorphism і Command Pattern

Commands можуть мати common method:

    execute()

Наприклад:

    class SaveCommand {
      execute() {
        console.log("Saving");
      }
    }

    class DeleteCommand {
      execute() {
        console.log("Deleting");
      }
    }

Application:

    function runCommand(command) {
      command.execute();
    }

Тепер:

    runCommand(new SaveCommand());
    runCommand(new DeleteCommand());

Common interface:

    execute()

---

# Polymorphism і Event Handlers

У browser code різні handlers можуть мати спільний contract.

Наприклад:

    function handleAction(handler) {
      handler.handle();
    }

Різні handlers:

    class SaveHandler {
      handle() {
        console.log("Save");
      }
    }

    class DeleteHandler {
      handle() {
        console.log("Delete");
      }
    }

Common method:

    handle()

Different behavior:

    SaveHandler
    DeleteHandler

---

# Encapsulation + Polymorphism

Encapsulation приховує implementation.

Polymorphism дозволяє замінювати implementations.

Разом:

    External Code
          │
          ▼
      Public API
          │
          ▼
    Common Interface
          │
      ┌───┴────┐
      ▼        ▼
 Implementation Implementation
      │        │
      ▼        ▼
    Private  Private
     State    State

Наприклад:

    PaymentService
          │
          ▼
        pay()
          │
      ┌───┴───┐
      ▼       ▼
     Card    PayPal
      │       │
      ▼       ▼
   private  private
   logic    logic

---

# Abstraction + Polymorphism

Abstraction визначає:

    WHAT

Polymorphism дозволяє мати:

    MANY IMPLEMENTATIONS

Наприклад:

    Payment
       │
       └── pay()

Abstraction:

    "Payment can pay."

Polymorphism:

    CardPayment.pay()
    PayPalPayment.pay()
    BankPayment.pay()

---

# Encapsulation vs Polymorphism

### Encapsulation

Фокусується на:

    hiding internal state
    controlling access
    protecting invariants

Модель:

    Public API
         │
         ▼
    Private State

---

### Polymorphism

Фокусується на:

    same interface
          +
    different behavior

Модель:

    Interface
       │
    ┌──┼──┐
    ▼  ▼  ▼
    A  B  C

---

# Polymorphism vs Abstraction

### Abstraction

    Hide complexity
         ↓
    expose essential interface

### Polymorphism

    One interface
         ↓
    many implementations

Разом:

    Simple Interface
          │
          ▼
    ┌─────┼─────┐
    ▼     ▼     ▼
   Impl  Impl  Impl

---

# Polymorphism і Loose Coupling

Без polymorphism:

    Service
       │
       ├── CardPayment
       ├── PayPalPayment
       └── BankPayment

Service знає concrete classes.

З polymorphism:

    Service
       │
       ▼
    Payment Interface
       │
    ┌──┼───┐
    ▼  ▼   ▼
   Card Pay Bank

Service залежить від behavior:

    pay()

а не від concrete implementation.

---

# Polymorphism і Dependency Inversion

Великий application часто будується навколо abstractions.

Наприклад:

    UserService
         │
         ▼
    UserRepository
         │
      ┌──┴──┐
      ▼     ▼
   Postgres Mock

UserService не повинен залежати від деталей PostgreSQL.

Замість цього:

    UserService
         ↓
    Repository Contract
         ↓
    Concrete Implementation

Polymorphism дозволяє різним implementations виконувати один contract.

---

# Example: Logger

Common interface:

    log()

Implementations:

    class ConsoleLogger {
      log(message) {
        console.log(message);
      }
    }

    class FileLogger {
      log(message) {
        // save to file
      }
    }

    class ApiLogger {
      log(message) {
        // send to API
      }
    }

Application:

    class UserService {
      constructor(logger) {
        this.logger = logger;
      }

      createUser(user) {
        this.logger.log(
          "User created"
        );
      }
    }

Тепер:

    new UserService(
      new ConsoleLogger()
    );

або:

    new UserService(
      new FileLogger()
    );

або:

    new UserService(
      new ApiLogger()
    );

UserService використовує тільки:

    logger.log()

---

# Example: Notification

    class EmailNotification {
      send(message) {
        console.log(
          `Email: ${message}`
        );
      }
    }

    class SmsNotification {
      send(message) {
        console.log(
          `SMS: ${message}`
        );
      }
    }

    class PushNotification {
      send(message) {
        console.log(
          `Push: ${message}`
        );
      }
    }

Service:

    class NotificationService {
      constructor(notification) {
        this.notification = notification;
      }

      send(message) {
        this.notification.send(message);
      }
    }

Common interface:

    send()

Different implementations:

    Email
    SMS
    Push

---

# Example: Report Export

Common interface:

    export()

Implementations:

    class PdfExporter {
      export(data) {
        console.log("Export PDF");
      }
    }

    class CsvExporter {
      export(data) {
        console.log("Export CSV");
      }
    }

    class JsonExporter {
      export(data) {
        console.log("Export JSON");
      }
    }

Service:

    class ReportService {
      constructor(exporter) {
        this.exporter = exporter;
      }

      generate(data) {
        this.exporter.export(data);
      }
    }

Використання:

    const pdfReport =
      new ReportService(
        new PdfExporter()
      );

    const csvReport =
      new ReportService(
        new CsvExporter()
      );

Той самий service.

Різний behavior.

---

# Поліморфна обробка масиву

Наприклад:

    const payments = [
      new CardPayment(),
      new PayPalPayment(),
      new BankTransferPayment()
    ];

    for (const payment of payments) {
      payment.pay(100);
    }

Application не перевіряє type:

    if (...)
    else if (...)
    else if (...)

Кожен object сам знає, як виконати:

    pay()

Це одна з головних переваг polymorphism.

---

# Типові помилки

❌ Вважати polymorphism тільки inheritance.

❌ Вважати, що для polymorphism обов'язково потрібен `extends`.

❌ Плутати polymorphism з abstraction.

❌ Плутати overriding з overloading.

❌ Створювати inheritance тільки заради повторного використання коду.

❌ Використовувати `instanceof` всюди замість common interface.

❌ Створювати багато subclasses без реальної потреби.

❌ Створювати artificial interfaces.

❌ Робити common method, який має зовсім різний семантичний зміст у різних classes.

❌ Використовувати polymorphism там, де прості функції були б зрозумілішими.

❌ Робити parent class надто великим.

❌ Порушувати очікуваний behavior parent contract.

❌ Плутати "same method name" із справжнім polymorphic contract.

---

# `instanceof` і Polymorphism

Проблемний підхід:

    function process(object) {
      if (object instanceof Dog) {
        object.speak();
      }

      if (object instanceof Cat) {
        object.speak();
      }
    }

Якщо всі objects мають:

    speak()

краще:

    function process(object) {
      object.speak();
    }

Polymorphism переносить відповідальність за behavior в object.

---

# До і після Polymorphism

### До

    function process(payment) {
      if (payment.type === "card") {
        // card logic
      }

      if (payment.type === "paypal") {
        // paypal logic
      }

      if (payment.type === "bank") {
        // bank logic
      }
    }

---

### Після

    function process(payment) {
      payment.pay();
    }

Implementations:

    CardPayment
    PayPalPayment
    BankPayment

Кожен class відповідає за власний behavior.

---

# Responsibility

Polymorphism допомагає розподілити responsibility.

Без polymorphism:

    Central Function
          │
          ├── knows Card
          ├── knows PayPal
          └── knows Bank

З polymorphism:

    CardPayment
       └── knows how to pay

    PayPalPayment
       └── knows how to pay

    BankPayment
       └── knows how to pay

Central code:

    only calls pay()

Це відповідає ідеї:

    Tell objects what to do,
    rather than asking what they are.

---

# "What are you?" vs "What can you do?"

Поганий підхід:

    if (object.type === "dog") {
      ...
    }

Питання:

    What are you?

Polymorphic підхід:

    object.speak();

Питання:

    What can you do?

У dynamic languages це часто більш гнучка модель.

---

# Polymorphism у Functional JavaScript

Polymorphism існує не тільки в OOP.

Наприклад:

    function format(value) {
      return value.toString();
    }

Різні values мають:

    toString()

Наприклад:

    format(100);

    format("Hello");

    format([1, 2, 3]);

Common operation:

    toString()

Different implementations.

---

# Parametric Polymorphism і JavaScript

У статично типізованих мовах існує поняття parametric polymorphism.

У TypeScript воно реалізується через generics.

Наприклад:

    function identity<T>(value: T): T {
      return value;
    }

Використання:

    identity<number>(10);

    identity<string>("Hello");

Тут function працює з різними типами.

У чистому JavaScript аналогічна ідея проявляється через dynamic typing:

    function identity(value) {
      return value;
    }

Але JavaScript і TypeScript мають різні type systems, тому не потрібно механічно прирівнювати ці поняття.

---

# Polymorphism у TypeScript

TypeScript дозволяє формально описати common interface.

    interface Payment {
      pay(amount: number): void;
    }

Implementations:

    class CardPayment implements Payment {
      pay(amount: number) {
        console.log(
          `Card: ${amount}`
        );
      }
    }

    class PayPalPayment implements Payment {
      pay(amount: number) {
        console.log(
          `PayPal: ${amount}`
        );
      }
    }

Function:

    function checkout(
      payment: Payment,
      amount: number
    ) {
      payment.pay(amount);
    }

Тут TypeScript перевіряє contract.

---

# Structural Typing у TypeScript

TypeScript використовує structural typing.

Наприклад:

    interface Speaker {
      speak(): void;
    }

Не обов'язково:

    implements Speaker

якщо object має необхідну структуру.

    const robot = {
      speak() {
        console.log("Beep");
      }
    };

Robot структурно сумісний із:

    Speaker

Це дуже близько до duck typing у JavaScript.

---

# Polymorphism і API Design

Хороший API визначає:

    WHAT can be done

а не:

    HOW it is implemented.

Наприклад:

    repository.findById(id)

Користувачу API не потрібно знати:

    Array
    Map
    PostgreSQL
    MongoDB
    HTTP

за умови, що contract залишається:

    findById(id)

---

# Stable Contract

Polymorphism добре працює, коли common contract стабільний.

Наприклад:

    save(data)

Можна мати:

    FileRepository
    DatabaseRepository
    ApiRepository

Але всі повинні виконувати очікуваний contract:

    save(data)

Якщо одна implementation вимагає:

    save(data, token, config, mode)

це вже може бути поганим common interface.

---

# Polymorphism Boundary

Модель:

    Application
         │
         ▼
    Common Contract
         │
    ┌────┼────┐
    ▼    ▼    ▼
    A    B    C
    │    │    │
    ▼    ▼    ▼
   Impl Impl Impl

Boundary визначає:

    What application expects

а implementations визначають:

    How it works

---

# Polymorphism і Module Architecture

У module architecture можна мати:

    domain/
      │
      └── UserService

    infrastructure/
      │
      ├── PostgresUserRepository
      └── MongoUserRepository

Service працює через:

    UserRepository

Різні modules можуть надавати різні implementations.

Модель:

    Domain
      │
      ▼
    Contract
      │
      ├── Infrastructure A
      └── Infrastructure B

Це дозволяє замінювати implementation без зміни domain logic.

---

# Polymorphism у Frontend

У frontend можна використовувати polymorphism для UI behavior.

Наприклад:

    class Button {
      render() {
        // ...
      }
    }

Або:

    class PrimaryButton {
      render() {
        // ...
      }
    }

    class IconButton {
      render() {
        // ...
      }
    }

Application може працювати через:

    render()

Однак у React часто краще використовувати composition та components, а не будувати всю UI architecture через class inheritance.

---

# Polymorphism у React

У React polymorphic behavior частіше реалізується через:

    props
    composition
    components
    callbacks
    dependency injection

Наприклад:

    function Button({ renderer }) {
      return renderer.render();
    }

Різні renderer objects можуть мати:

    render()

У сучасному frontend JavaScript polymorphism часто є behavioral та compositional, а не класичним inheritance-based OOP.

---

# Polymorphism у Backend

У backend polymorphism часто використовується для:

    repositories
    services
    adapters
    payment providers
    notification providers
    storage providers
    authentication providers
    logging providers
    external APIs

Наприклад:

    UserService
         │
         ▼
    UserRepository
         │
      ┌──┴───┐
      ▼      ▼
 Postgres   Mock

Це дозволяє легко замінювати infrastructure.

---

# Mini Example: Repository

    class MemoryRepository {
      #items = [];

      findById(id) {
        return this.#items.find(
          item => item.id === id
        );
      }
    }

    class ApiRepository {
      findById(id) {
        // fetch(...)
      }
    }

Service:

    class UserService {
      constructor(repository) {
        this.repository = repository;
      }

      getUser(id) {
        return this.repository.findById(id);
      }
    }

Використання:

    const service =
      new UserService(
        new MemoryRepository()
      );

або:

    const service =
      new UserService(
        new ApiRepository()
      );

Common interface:

    findById()

---

# Polymorphism Checklist

Перед створенням polymorphic design запитай:

    1. Чи є common behavior?

    2. Чи має він однаковий semantic meaning?

    3. Чи є кілька implementations?

    4. Чи потрібно замінювати implementations?

    5. Чи можна прибрати type checks?

    6. Чи стає code простішим?

    7. Чи стабільний common contract?

    8. Чи не створюю я inheritance без IS-A relationship?

    9. Чи не буде проста function кращою?

    10. Чи зменшується coupling?

---

# Питання зі співбесіди

Що таке polymorphism?

Що означає "many forms"?

Як polymorphism реалізується в JavaScript?

Що таке method overriding?

Чи потрібен `extends` для polymorphism?

Що таке duck typing?

Що таке dynamic dispatch?

Що таке common interface?

Що таке polymorphic function?

Що таке polymorphic collection?

Як polymorphism допомагає зменшити coupling?

Як polymorphism допомагає прибрати `if/else`?

Яка різниця між polymorphism та abstraction?

Яка різниця між overriding та overloading?

Що таке Liskov Substitution Principle?

Як polymorphism пов'язаний із Dependency Injection?

Як polymorphism пов'язаний із Strategy Pattern?

Як polymorphism використовується в services?

Як polymorphism використовується в repositories?

Як polymorphism допомагає при testing?

Чи можна реалізувати polymorphism без classes?

Що таке duck typing у JavaScript?

Чим class-based polymorphism відрізняється від duck typing?

Чому `instanceof` не завжди потрібен при polymorphism?

Як polymorphism допомагає створювати loose coupling?

Як polymorphism використовується в module architecture?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке polymorphism.

"Many forms".

Same interface + different behavior.

Common method.

Method overriding.

Inheritance.

Subclass.

Superclass.

Polymorphic function.

Polymorphic collection.

Duck typing.

Behavior-based programming.

---

🔵 Junior

Method overriding.

`super`.

Common interface.

Dynamic dispatch.

Duck typing.

Structural compatibility.

Polymorphic functions.

Polymorphic collections.

`instanceof` vs polymorphism.

Polymorphism + encapsulation.

Polymorphism + abstraction.

---

🟠 Middle

Polymorphism + composition.

Polymorphism + Dependency Injection.

Polymorphism + Strategy Pattern.

Polymorphism + services.

Polymorphism + repositories.

Polymorphism + adapters.

Polymorphism + testing.

Polymorphism + loose coupling.

Polymorphism + Open/Closed Principle.

Polymorphism + Liskov Substitution Principle.

Designing stable contracts.

Avoiding unnecessary inheritance.

---

🔴 Senior

Polymorphic architecture.

Abstraction boundaries.

Stable contracts.

Dependency inversion.

Infrastructure polymorphism.

Adapter architecture.

Plugin architecture.

Replacing implementations.

Domain polymorphism.

Polymorphism across modules.

Polymorphism across services.

Contract design.

Coupling management.

Trade-offs між inheritance, composition та duck typing.

---

# Міні-шпаргалка

Polymorphism:

    SAME INTERFACE
          │
          ▼
    DIFFERENT OBJECTS
          │
      ┌───┼───┐
      ▼   ▼   ▼
      A   B   C
      │   │   │
      ▼   ▼   ▼
     Impl Impl Impl

---

# Same Method

    object.speak()

може виконати:

    Dog.speak()

або:

    Cat.speak()

або:

    Robot.speak()

Одна operation:

    speak()

Різний behavior.

---

# Inheritance Polymorphism

    Animal
      │
    speak()
      │
    ┌─┴─┐
    ▼   ▼
   Dog Cat
    │   │
    ▼   ▼
   Woof Meow

---

# Duck Typing

    function process(object) {
      object.execute();
    }

Неважливо:

    WHAT IS object?

Важливо:

    CAN object.execute()?

---

# Polymorphic Function

    function process(object) {
      object.execute();
    }

    process(objectA);
    process(objectB);
    process(objectC);

Common interface:

    execute()

Different behavior:

    A.execute()
    B.execute()
    C.execute()

---

# Polymorphic Collection

    const items = [
      objectA,
      objectB,
      objectC
    ];

    for (const item of items) {
      item.execute();
    }

---

# Polymorphism + DI

    Service
       │
       ▼
    Dependency
       │
    ┌──┼──┐
    ▼  ▼  ▼
    A  B  C

Service залежить від contract.

Не від concrete implementation.

---

# Polymorphism + Composition

    Context
       │
       ▼
    Strategy
       │
    ┌──┴──┐
    ▼     ▼
   A      B

Context викликає:

    strategy.execute()

А конкретний strategy визначає behavior.

---

# Polymorphism + Encapsulation

    Public API
         │
         ▼
    Common Interface
         │
      ┌──┴──┐
      ▼     ▼
   Object A Object B
      │       │
      ▼       ▼
   Private Private
    State    State

---

# Polymorphism + Abstraction

    Abstraction
         │
         ▼
    Common Interface
         │
    ┌────┼────┐
    ▼    ▼    ▼
   Impl Impl Impl

Abstraction:

    WHAT

Polymorphism:

    MANY IMPLEMENTATIONS

---

# Polymorphism + Loose Coupling

    BAD

    Application
        │
        ├── Card
        ├── PayPal
        └── Bank

    GOOD

    Application
        │
        ▼
    Common Interface
        │
      ┌─┼─┐
      ▼ ▼ ▼
    Card Pay Bank

---

# Polymorphism + `if/else`

Погано:

    if (type === "A") {
      // A
    } else if (type === "B") {
      // B
    }

Краще:

    object.execute();

Кожен object сам реалізує:

    execute()

---

# Головне

• Polymorphism — це можливість використовувати різні objects через спільний interface.

• Один interface може мати багато implementations.

• Різні objects можуть реагувати на один method по-різному.

• Найвідоміший приклад — method overriding через inheritance.

• Для polymorphism не обов'язково використовувати inheritance.

• JavaScript активно використовує duck typing.

• Duck typing базується на behavior, а не на concrete class.

• Common interface визначає behavior, який очікує зовнішній код.

• Polymorphic function працює з будь-яким object, який підтримує необхідний contract.

• Polymorphic collection може містити різні objects, які підтримують common interface.

• Dynamic dispatch дозволяє викликати відповідну implementation під час виконання.

• Polymorphism допомагає уникати великої кількості `if/else` та `instanceof`.

• Polymorphism допомагає зменшити coupling.

• Polymorphism добре працює разом із encapsulation.

• Polymorphism добре працює разом із abstraction.

• Polymorphism часто реалізується через composition та Dependency Injection.

• Strategy, State та Command patterns активно використовують polymorphic behavior.

• Repositories, adapters, payment providers та notification providers часто будуються на polymorphism.

• Polymorphism спрощує заміну implementations.

• Polymorphism може спростити testing через mock implementations.

• Не потрібно створювати inheritance тільки заради polymorphism.

• Хороший polymorphic design має стабільний common contract.

• Різні implementations повинні мати однаковий semantic meaning для common operation.

• Liskov Substitution Principle допомагає визначити, чи справді одна implementation може замінити іншу.

• У JavaScript polymorphism часто є behavioral, compositional та structural.

• Polymorphism відповідає на питання:

    "Як різні objects можуть виконувати
     одну operation по-різному?"

---

# Коротка модель для запам'ятовування

    POLYMORPHISM
          │
          ▼
    COMMON INTERFACE
          │
     ┌────┼────┐
     ▼    ▼    ▼
    Dog  Cat  Robot
     │    │     │
     ▼    ▼     ▼
    Woof Meow  Beep

Головна ідея:

    Same interface.
    Different behavior.

Наприклад:

    object.execute()

може означати:

    SaveCommand.execute()
    DeleteCommand.execute()
    PrintCommand.execute()

---

# Головна формула

    POLYMORPHISM
          =
    SAME INTERFACE
          +
    DIFFERENT BEHAVIOR

---

# Що потрібно запам'ятати в першу чергу

    1. Same interface

    2. Different behavior

    3. Method overriding

    4. Duck typing

    5. Common contract

    6. Polymorphic functions

    7. Composition

    8. Dependency Injection

    9. Loose coupling

    10. Replaceable implementations

Ключова фраза:

    Don't ask what an object is.
    Ask what an object can do.

Модель:

    Application
         │
         ▼
    Common Interface
         │
      ┌──┴──┐
      ▼     ▼
    Impl A Impl B
      │     │
      ▼     ▼
    Behavior Behavior