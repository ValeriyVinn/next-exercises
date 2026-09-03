## 04. Inheritance

Inheritance (успадкування) — один з основних принципів OOP, який дозволяє створювати новий class на основі існуючого class, успадковуючи його properties та methods і додаючи або змінюючи поведінку.

Основна ідея:

    Parent Class
         │
         │ inheritance
         ▼
    Child Class
         │
         ├── inherited properties
         ├── inherited methods
         └── own properties / methods

У JavaScript inheritance реалізується за допомогою:

    class
    extends
    super

---

### Ключові поняття

✔ inheritance  
✔ parent class  
✔ child class  
✔ superclass  
✔ subclass  
✔ `extends`  
✔ `super`  
✔ inherited properties  
✔ inherited methods  
✔ method overriding  
✔ constructor  
✔ `super()`  
✔ `super.method()`  
✔ prototype chain  
✔ `instanceof`  
✔ polymorphism  
✔ protected-like conventions  
✔ composition  
✔ inheritance vs composition  

---

### Що потрібно пам'ятати

• Inheritance дозволяє створити Child Class на основі Parent Class.

• Child Class отримує доступ до methods та властивостей Parent Class відповідно до правил JavaScript.

• `extends` створює зв'язок inheritance між classes.

• `super()` використовується для виклику constructor Parent Class.

• `super.method()` використовується для виклику method Parent Class.

• Child Class може додавати власні properties та methods.

• Child Class може override methods Parent Class.

• Constructor Child Class повинен викликати `super()` перед використанням `this`, якщо class extends інший class.

• Inheritance у JavaScript базується на prototype chain.

• `instanceof` дозволяє перевірити inheritance relationship.

• Inheritance добре підходить для відношення "is-a".

• Composition часто краще підходить для відношення "has-a".

• Не потрібно використовувати inheritance тільки для повторного використання коду.

• Надмірне inheritance створює сильний coupling між classes.

---

# Parent Class

Parent Class — class, від якого успадковується інший class.

Наприклад:

    class Animal {
      eat() {
        console.log("Eating");
      }

      sleep() {
        console.log("Sleeping");
      }
    }

`Animal` — Parent Class.

---

# Child Class

Child Class — class, який успадковує Parent Class.

    class Dog extends Animal {
      bark() {
        console.log("Woof!");
      }
    }

Тепер:

    const dog = new Dog();

    dog.eat();
    dog.sleep();
    dog.bark();

`Dog` отримує:

    eat()
    sleep()

від `Animal`

і має власний:

    bark()

Модель:

    Animal
      │
      ├── eat()
      └── sleep()
             │
             │ extends
             ▼
           Dog
             │
             └── bark()

---

# extends

`extends` створює inheritance relationship.

    class Animal {
      eat() {
        console.log("Eating");
      }
    }

    class Dog extends Animal {
      bark() {
        console.log("Woof!");
      }
    }

Модель:

    Dog
     │
     └── extends
            │
            ▼
         Animal

---

# Inherited Methods

Child Class успадковує methods Parent Class.

    class Animal {
      eat() {
        console.log("Eating");
      }
    }

    class Dog extends Animal {
      bark() {
        console.log("Woof!");
      }
    }

    const dog = new Dog();

    dog.eat();
    dog.bark();

`eat()` визначений у:

    Animal

але доступний через:

    dog

---

# Inherited Properties

Child Class також може використовувати properties, створені Parent Class.

    class User {
      constructor(name) {
        this.name = name;
      }
    }

    class Admin extends User {
      deleteUser() {
        console.log(`Admin ${this.name} deletes user`);
      }
    }

    const admin = new Admin("Valeriy");

    console.log(admin.name);

`name` створюється Parent Class constructor, але доступний у Child Class.

---

# super()

`super()` викликає constructor Parent Class.

Наприклад:

    class User {
      constructor(name) {
        this.name = name;
      }
    }

    class Admin extends User {
      constructor(name, role) {
        super(name);
        this.role = role;
      }
    }

Використання:

    const admin = new Admin(
      "Valeriy",
      "administrator"
    );

    console.log(admin.name);
    console.log(admin.role);

Порядок:

    new Admin()
         │
         ▼
    Admin constructor
         │
         ▼
       super(name)
         │
         ▼
    User constructor
         │
         ▼
    this.name = name
         │
         ▼
    Admin continues
         │
         ▼
    this.role = role

---

# Чому потрібен super()

У Child Class, який extends Parent Class, не можна використовувати `this` до виклику `super()`.

Неправильно:

    class Admin extends User {
      constructor(name, role) {
        this.role = role;
        super(name);
      }
    }

Правильно:

    class Admin extends User {
      constructor(name, role) {
        super(name);
        this.role = role;
      }
    }

Правило:

    super()
      ↓
    this

---

# super.method()

`super.method()` дозволяє викликати method Parent Class.

    class Animal {
      speak() {
        console.log("Animal sound");
      }
    }

    class Dog extends Animal {
      speak() {
        super.speak();
        console.log("Woof!");
      }
    }

Виклик:

    const dog = new Dog();

    dog.speak();

Результат:

    Animal sound
    Woof!

Child Class розширює поведінку Parent Class.

---

# Method Overriding

Method overriding — коли Child Class визначає method з таким самим ім'ям, як у Parent Class.

    class Animal {
      speak() {
        console.log("Some sound");
      }
    }

    class Dog extends Animal {
      speak() {
        console.log("Woof!");
      }
    }

Тепер:

    const animal = new Animal();
    const dog = new Dog();

    animal.speak();
    dog.speak();

Результат:

    Some sound
    Woof!

`Dog` override method:

    speak()

---

# Overriding + super

Child Class може override method і при цьому викликати Parent implementation.

    class Animal {
      speak() {
        console.log("Animal sound");
      }
    }

    class Dog extends Animal {
      speak() {
        super.speak();
        console.log("Woof!");
      }
    }

Це корисно, коли потрібно:

    Parent behavior
         +
    Child behavior

---

# Constructor Inheritance

Якщо Child Class не має власного constructor, JavaScript використовує поведінку Parent Class constructor.

Наприклад:

    class User {
      constructor(name) {
        this.name = name;
      }
    }

    class Admin extends User {}

    const admin = new Admin("Valeriy");

    console.log(admin.name);

`Admin` використовує constructor `User`.

---

# Власний Constructor

Child Class може мати власний constructor.

    class User {
      constructor(name) {
        this.name = name;
      }
    }

    class Admin extends User {
      constructor(name, role) {
        super(name);
        this.role = role;
      }
    }

Тепер Child Class розширює state Parent Class.

    User
     │
     └── name

    Admin
     │
     ├── name
     └── role

---

# Private Fields і Inheritance

Private fields Parent Class не стають безпосередньо доступними Child Class.

    class User {
      #password;

      constructor(password) {
        this.#password = password;
      }
    }

    class Admin extends User {
      showPassword() {
        return this.#password;
      }
    }

Такий код не працюватиме.

Child Class не має прямого доступу до:

    #password

Це важливо для encapsulation.

Замість цього Parent Class може надати public/protected-like API:

    class User {
      #password;

      constructor(password) {
        this.#password = password;
      }

      checkPassword(password) {
        return this.#password === password;
      }
    }

    class Admin extends User {
      authenticate(password) {
        return this.checkPassword(password);
      }
    }

---

# Protected у JavaScript

JavaScript не має окремого `protected` keyword як деякі інші OOP languages.

Часто використовується convention з `_`.

Наприклад:

    class User {
      constructor(name) {
        this._name = name;
      }
    }

    class Admin extends User {
      showName() {
        console.log(this._name);
      }
    }

`_name` не є справжнім private field.

Це лише convention:

    _name

означає:

    "Internal / intended for subclass or internal use."

Справжній private field:

    #name

---

# Prototype Chain

JavaScript inheritance базується на prototype chain.

Наприклад:

    class Animal {
      eat() {
        console.log("Eating");
      }
    }

    class Dog extends Animal {
      bark() {
        console.log("Woof!");
      }
    }

    const dog = new Dog();

Спрощено:

    dog
     │
     ▼
    Dog.prototype
     │
     ▼
    Animal.prototype
     │
     ▼
    Object.prototype
     │
     ▼
    null

Коли JavaScript шукає method:

    dog.eat()

він шукає його через prototype chain.

---

# Method Lookup

Наприклад:

    dog.bark();

JavaScript шукає:

    dog
      ↓
    Dog.prototype
      ↓
    bark()

Для:

    dog.eat();

JavaScript шукає:

    dog
      ↓
    Dog.prototype
      ↓
    Animal.prototype
      ↓
    eat()

Якщо method не знайдений:

    Object.prototype
      ↓
    null

---

# instanceof

`instanceof` перевіряє, чи prototype class присутній у prototype chain object.

    class Animal {}

    class Dog extends Animal {}

    const dog = new Dog();

    console.log(dog instanceof Dog);
    console.log(dog instanceof Animal);
    console.log(dog instanceof Object);

Результат:

    true
    true
    true

Модель:

    dog
     │
     ▼
    Dog.prototype
     │
     ▼
    Animal.prototype
     │
     ▼
    Object.prototype

---

# Polymorphism

Inheritance часто використовується разом із polymorphism.

Polymorphism — можливість працювати з різними objects через спільний interface.

Наприклад:

    class Animal {
      speak() {
        console.log("Animal sound");
      }
    }

    class Dog extends Animal {
      speak() {
        console.log("Woof!");
      }
    }

    class Cat extends Animal {
      speak() {
        console.log("Meow!");
      }
    }

Можна:

    const animals = [
      new Dog(),
      new Cat()
    ];

    animals.forEach(animal => {
      animal.speak();
    });

Результат:

    Woof!
    Meow!

Один interface:

    speak()

різна implementation.

---

# Parent Reference

Наприклад:

    class Animal {
      constructor(name) {
        this.name = name;
      }

      speak() {
        console.log(`${this.name} makes a sound`);
      }
    }

    class Dog extends Animal {
      speak() {
        console.log(`${this.name} barks`);
      }
    }

    const dog = new Dog("Rex");

    dog.speak();

Child Class використовує state Parent Class:

    this.name

і змінює behavior:

    speak()

---

# Example: User → Admin

    class User {
      constructor(name, email) {
        this.name = name;
        this.email = email;
      }

      login() {
        console.log(`${this.name} logged in`);
      }
    }

    class Admin extends User {
      constructor(name, email, permissions) {
        super(name, email);
        this.permissions = permissions;
      }

      deleteUser(user) {
        console.log(
          `${this.name} deleted ${user.name}`
        );
      }
    }

Використання:

    const admin = new Admin(
      "Valeriy",
      "admin@example.com",
      ["delete", "edit"]
    );

    admin.login();

    admin.deleteUser({
      name: "John"
    });

Admin отримав:

    name
    email
    login()

від `User`

і додав:

    permissions
    deleteUser()

---

# Example: Vehicle

    class Vehicle {
      constructor(brand) {
        this.brand = brand;
      }

      start() {
        console.log(`${this.brand} started`);
      }

      stop() {
        console.log(`${this.brand} stopped`);
      }
    }

    class Car extends Vehicle {
      drive() {
        console.log(`${this.brand} is driving`);
      }
    }

    class Motorcycle extends Vehicle {
      ride() {
        console.log(`${this.brand} is riding`);
      }
    }

Використання:

    const car = new Car("Toyota");
    const motorcycle = new Motorcycle("Honda");

    car.start();
    car.drive();

    motorcycle.start();
    motorcycle.ride();

Модель:

    Vehicle
       │
       ├── start()
       └── stop()
            │
       ┌────┴─────┐
       ▼          ▼
      Car     Motorcycle
       │          │
       └─ drive()  └─ ride()

---

# Example: Shape

Inheritance може бути використано для спільного interface.

    class Shape {
      area() {
        throw new Error("area() must be implemented");
      }
    }

    class Rectangle extends Shape {
      constructor(width, height) {
        super();

        this.width = width;
        this.height = height;
      }

      area() {
        return this.width * this.height;
      }
    }

    class Circle extends Shape {
      constructor(radius) {
        super();

        this.radius = radius;
      }

      area() {
        return Math.PI * this.radius ** 2;
      }
    }

Тепер:

    const shapes = [
      new Rectangle(10, 5),
      new Circle(5)
    ];

    shapes.forEach(shape => {
      console.log(shape.area());
    });

Спільний interface:

    area()

різна implementation.

---

# Multi-level Inheritance

JavaScript дозволяє створювати inheritance chain.

    class Animal {
      eat() {}
    }

    class Mammal extends Animal {
      walk() {}
    }

    class Dog extends Mammal {
      bark() {}
    }

Модель:

    Animal
      │
      ▼
    Mammal
      │
      ▼
    Dog

`Dog` може отримати behavior з:

    Dog
    Mammal
    Animal
    Object

Але глибокі inheritance chains можуть ускладнювати architecture.

---

# Multiple Inheritance

JavaScript classes не підтримують multiple inheritance напряму.

Наприклад, неможливо:

    class Dog extends Animal, Pet {
    }

Натомість використовуються:

    composition
    mixins

або інші design patterns.

---

# Composition

Composition означає побудову object з інших objects.

Наприклад:

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

Тут:

    Car has an Engine

а не:

    Car is an Engine

Це приклад:

    HAS-A

---

# Inheritance vs Composition

Inheritance:

    Dog IS-A Animal

Composition:

    Car HAS-A Engine

Inheritance:

    class Dog extends Animal {}

Composition:

    class Car {
      constructor() {
        this.engine = new Engine();
      }
    }

Спрощено:

    IS-A  → inheritance

    HAS-A → composition

---

# Коли використовувати Inheritance

Inheritance доречний, коли:

✔ Child справді є спеціалізованим типом Parent.

✔ Є чіткий relationship `is-a`.

✔ Child має спільний interface з Parent.

✔ Спільна поведінка логічно належить Parent Class.

✔ Polymorphism має сенс.

Наприклад:

    Animal
      ├── Dog
      └── Cat

    Vehicle
      ├── Car
      └── Motorcycle

---

# Коли краще Composition

Composition часто краще, коли:

✔ object складається з інших objects.

✔ Behavior можна незалежно комбінувати.

✔ Inheritance створює занадто сильний coupling.

✔ Не існує чіткого `is-a` relationship.

Наприклад:

    Car
      ├── Engine
      ├── Wheels
      └── GPS

Це:

    HAS-A

а не inheritance.

---

# Inheritance і Encapsulation

Inheritance не скасовує encapsulation.

Наприклад:

    class BankAccount {
      #balance = 0;

      deposit(amount) {
        this.#balance += amount;
      }

      getBalance() {
        return this.#balance;
      }
    }

    class SavingsAccount extends BankAccount {
      addInterest() {
        // використовує public API Parent
      }
    }

Child Class не отримує прямий доступ до:

    #balance

Це private implementation Parent Class.

---

# Inheritance і Abstraction

Parent Class може визначати загальний interface.

Наприклад:

    class Payment {
      pay(amount) {
        throw new Error(
          "pay() must be implemented"
        );
      }
    }

Child classes:

    class CardPayment extends Payment {
      pay(amount) {
        console.log(
          `Card payment: ${amount}`
        );
      }
    }

    class CashPayment extends Payment {
      pay(amount) {
        console.log(
          `Cash payment: ${amount}`
        );
      }
    }

Спільний abstraction:

    pay()

різна implementation.

---

# Типові помилки

❌ Використовувати inheritance тільки для повторного використання коду.

❌ Створювати дуже глибоку inheritance hierarchy.

❌ Робити Parent Class занадто великим.

❌ Створювати Child Class, який не є логічним subtype Parent Class.

❌ Плутати `is-a` та `has-a`.

❌ Забувати викликати `super()` у constructor Child Class.

❌ Використовувати `this` до `super()` у derived constructor.

❌ Очікувати доступ Child Class до private `#fields` Parent Class.

❌ Вважати `_property` справжнім private field.

❌ Плутати `super()` та `super.method()`.

❌ Override method без розуміння behavior Parent Class.

❌ Створювати inheritance chain тільки для економії кількох рядків коду.

❌ Ігнорувати composition.

---

# Питання зі співбесіди

Що таке inheritance?

Що таке Parent Class?

Що таке Child Class?

Що робить `extends`?

Що робить `super()`?

Що робить `super.method()`?

Чому потрібно викликати `super()` перед `this`?

Що таке method overriding?

Що таке prototype chain?

Як працює inheritance у JavaScript?

Що таке `instanceof`?

Чи підтримує JavaScript multiple inheritance?

Що таке polymorphism?

Що таке `is-a` relationship?

Що таке `has-a` relationship?

Яка різниця між inheritance та composition?

Чи має Child Class доступ до private `#fields` Parent Class?

Чи є `_property` private у JavaScript?

Коли inheritance є хорошим вибором?

Коли краще використовувати composition?

Чому глибока inheritance hierarchy може бути проблемою?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке inheritance.

Parent Class.

Child Class.

`extends`.

`super()`.

Inherited methods.

Inherited properties.

Constructor inheritance.

Method overriding.

`super.method()`.

Основи prototype chain.

`instanceof`.

---

🔵 Junior

Власний constructor у Child Class.

Правило `super()` → `this`.

Inheritance chain.

Private fields та inheritance.

Polymorphism.

Shared interface.

`is-a` relationship.

`has-a` relationship.

Inheritance vs composition.

Основи mixins.

---

🟠 Middle

Designing inheritance hierarchies.

Method overriding.

Extending behavior через `super`.

Polymorphism.

Abstract-like Parent Classes.

Encapsulation + inheritance.

Composition over inheritance.

Reducing coupling.

Inheritance depth.

Reusable domain models.

---

🔴 Senior

Inheritance architecture.

Deep inheritance problems.

Fragile base class problem.

Liskov Substitution Principle.

Open/Closed Principle.

Composition over inheritance.

Polymorphism design.

Stable base abstractions.

Inheritance vs delegation.

Inheritance vs mixins.

Inheritance vs dependency injection.

Trade-offs між reuse, coupling та flexibility.

---

# Міні-шпаргалка

Inheritance:

    Parent Class
         │
      extends
         │
         ▼
    Child Class
         │
         ├── inherited behavior
         ├── inherited state
         └── own behavior

---

Основні keywords:

    extends
       ↓
    inheritance

    super()
       ↓
    Parent constructor

    super.method()
       ↓
    Parent method

---

Constructor:

    class Parent {
      constructor(name) {
        this.name = name;
      }
    }

    class Child extends Parent {
      constructor(name, role) {
        super(name);
        this.role = role;
      }
    }

---

Method overriding:

    class Parent {
      speak() {
        console.log("Parent");
      }
    }

    class Child extends Parent {
      speak() {
        console.log("Child");
      }
    }

---

Override + Parent behavior:

    class Child extends Parent {
      speak() {
        super.speak();
        console.log("Child");
      }
    }

---

Prototype chain:

    object
       │
       ▼
    Child.prototype
       │
       ▼
    Parent.prototype
       │
       ▼
    Object.prototype
       │
       ▼
      null

---

Polymorphism:

    Parent
      │
      ├── Child A
      │     └── method()
      │
      └── Child B
            └── method()

    objects.forEach(item => {
      item.method();
    });

Один interface:

    method()

різна behavior.

---

Inheritance vs Composition:

    IS-A
      │
      └── inheritance

    HAS-A
      │
      └── composition

Приклад:

    Dog IS-A Animal

    Car HAS-A Engine

---

# Головне

• Inheritance дозволяє створювати Child Class на основі Parent Class.

• `extends` створює inheritance relationship.

• Child Class успадковує доступну поведінку Parent Class.

• `super()` викликає constructor Parent Class.

• У derived constructor `super()` повинен бути викликаний перед використанням `this`.

• `super.method()` викликає method Parent Class.

• Child Class може override methods Parent Class.

• Child Class може розширювати Parent behavior через `super.method()`.

• JavaScript inheritance базується на prototype chain.

• `instanceof` допомагає перевірити inheritance relationship.

• Private `#fields` Parent Class не доступні безпосередньо Child Class.

• `_property` — це convention, а не справжня private property.

• Inheritance часто використовується разом із polymorphism.

• Polymorphism дозволяє різним objects реалізовувати спільний interface по-різному.

• Inheritance найкраще відповідає relationship `is-a`.

• Composition відповідає relationship `has-a`.

• JavaScript не підтримує multiple inheritance через `extends`.

• Не слід використовувати inheritance тільки для повторного використання коду.

• Надмірне inheritance збільшує coupling.

• Глибокі inheritance hierarchies складніше підтримувати.

• Composition часто є більш гнучкою альтернативою inheritance.

---

# Коротка модель для запам'ятовування

    INHERITANCE
         │
         ▼
    Parent Class
         │
       extends
         │
         ▼
    Child Class
         │
    ┌────┴────┐
    ▼         ▼
 inherited   own
 behavior   behavior
    │
    ▼
  super()
  super.method()

Основна ідея:

    Parent
       │
       │ common behavior
       ▼
    Child
       │
       ├── reuse
       ├── extend
       └── override

Але:

    IS-A  → inheritance

    HAS-A → composition

Головне правило:

    Prefer inheritance when there is a real
    "is-a" relationship.

    Prefer composition when an object
    "has-a" another object.