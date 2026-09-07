## 08. Inheritance

Inheritance (наслідування) — це механізм, який дозволяє створити новий class на основі іншого class.

Новий class успадковує properties та methods батьківського class і може додавати власні properties та methods або змінювати поведінку успадкованих methods.

У JavaScript inheritance реалізується за допомогою:

- `extends`
- `super`
- prototype chain


### Ключові поняття

✔ inheritance
✔ parent class
✔ child class
✔ superclass
✔ subclass
✔ `extends`
✔ `super`
✔ method overriding
✔ prototype chain
✔ `instanceof`


### Що потрібно пам'ятати

• Parent class — клас, від якого наслідують.

• Child class — клас, який наслідує parent class.

• `extends` встановлює inheritance між classes.

• `super()` викликає constructor батьківського class.

• `super.method()` викликає method батьківського class.

• Child class може мати власні properties та methods.

• Child class може змінити поведінку успадкованого method — це називається method overriding.

• Якщо child class має constructor, перед використанням `this` потрібно викликати `super()`.

• Child class успадковує methods через prototype chain.

• Один parent class може мати багато child classes.


### Основний синтаксис

    class Parent {
      constructor(name) {
        this.name = name;
      }

      greet() {
        console.log(`Hello, ${this.name}`);
      }
    }

    class Child extends Parent {
      constructor(name, age) {
        super(name);
        this.age = age;
      }
    }

Створення object:

    const child = new Child("Anna", 25);

    child.greet();

    console.log(child.age);


### Parent class і Child class

    class Animal {
      eat() {
        console.log("Eating...");
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

`Dog` успадковує method `eat()` від `Animal`.


### Mental Model

    Parent
      │
      │ extends
      ▼
    Child
      │
      ├── inherited methods
      ├── inherited properties
      └── own methods / properties


### extends

`extends` створює inheritance relationship між classes.

    class Animal {
      eat() {
        console.log("Eating...");
      }
    }

    class Dog extends Animal {
      bark() {
        console.log("Woof!");
      }
    }

Тепер:

    Dog
      │
      └── extends
              │
              ▼
           Animal


### Child class

Child class може використовувати methods parent class.

    class Animal {
      eat() {
        console.log("Eating...");
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

Результат:

    Eating...
    Woof!


### super()

`super()` викликає constructor parent class.

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

    const dog = new Dog("Rex", "Labrador");

    console.log(dog.name);
    console.log(dog.breed);


### Чому потрібен super()

У child class, якщо створений власний `constructor`, перед використанням `this` потрібно викликати `super()`.

Правильно:

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


Неправильно:

    class Animal {
      constructor(name) {
        this.name = name;
      }
    }

    class Dog extends Animal {
      constructor(name, breed) {
        this.name = name;
        this.breed = breed;
      }
    }

У такому випадку буде помилка через використання `this` до `super()`.


### super передає аргументи

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

    const dog = new Dog("Rex", "Labrador");

Можна мислити:

    new Dog("Rex", "Labrador")
              │
              ▼
    Dog constructor
              │
              ├── super("Rex")
              │       │
              │       ▼
              │   Animal constructor
              │
              └── this.breed = "Labrador"


### super() без аргументів

Якщо parent constructor не потребує параметрів:

    class Animal {
      constructor() {
        this.type = "animal";
      }
    }

    class Dog extends Animal {
      constructor() {
        super();
        this.name = "Rex";
      }
    }

    const dog = new Dog();


### Child class без constructor

Якщо child class не має власного constructor, JavaScript використовує constructor, який передає аргументи до parent class.

    class Animal {
      constructor(name) {
        this.name = name;
      }
    }

    class Dog extends Animal {}

    const dog = new Dog("Rex");

    console.log(dog.name);

Це працює.


### super.method()

`super` використовується не тільки для constructor.

Через `super.method()` можна викликати method parent class.

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

    const dog = new Dog();

    dog.speak();

Результат:

    Animal sound
    Woof!


### Method overriding

Method overriding — це перевизначення успадкованого method у child class.

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

    const dog = new Dog();

    dog.speak();

Результат:

    Woof!


### Overriding + super

Child class може розширити поведінку parent method.

    class Animal {
      speak() {
        console.log("Animal makes a sound");
      }
    }

    class Dog extends Animal {
      speak() {
        super.speak();
        console.log("Woof!");
      }
    }

    const dog = new Dog();

    dog.speak();

Результат:

    Animal makes a sound
    Woof!


### Власні properties child class

Child class може додавати власні properties.

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

    const dog = new Dog("Rex", "Labrador");

    console.log(dog.name);
    console.log(dog.breed);


### Власні methods child class

    class Animal {
      eat() {
        console.log("Eating...");
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


### Parent може мати багато children

    class Animal {
      eat() {
        console.log("Eating...");
      }
    }

    class Dog extends Animal {
      bark() {
        console.log("Woof!");
      }
    }

    class Cat extends Animal {
      meow() {
        console.log("Meow!");
      }
    }

    const dog = new Dog();
    const cat = new Cat();

    dog.eat();
    dog.bark();

    cat.eat();
    cat.meow();

Структура:

    Animal
      │
      ├── Dog
      │
      └── Cat


### Багаторівневе inheritance

Inheritance може мати декілька рівнів.

    class Animal {
      eat() {
        console.log("Eating...");
      }
    }

    class Mammal extends Animal {
      walk() {
        console.log("Walking...");
      }
    }

    class Dog extends Mammal {
      bark() {
        console.log("Woof!");
      }
    }

    const dog = new Dog();

    dog.eat();
    dog.walk();
    dog.bark();

Структура:

    Animal
      │
      ▼
    Mammal
      │
      ▼
    Dog

`Dog` отримує methods від `Mammal` і `Animal`.


### Prototype chain

Inheritance у JavaScript базується на prototype chain.

    dog
      │
      ▼
    Dog.prototype
      │
      ▼
    Mammal.prototype
      │
      ▼
    Animal.prototype
      │
      ▼
    Object.prototype
      │
      ▼
    null


Коли JavaScript шукає property або method:

    dog.someMethod()

JavaScript перевіряє:

    dog
      ↓
    Dog.prototype
      ↓
    Mammal.prototype
      ↓
    Animal.prototype
      ↓
    Object.prototype
      ↓
    null


### Inheritance і method lookup

    class Animal {
      eat() {
        console.log("Eating");
      }
    }

    class Dog extends Animal {}

    const dog = new Dog();

    dog.eat();

`eat()` не знаходиться безпосередньо в `dog`.

JavaScript шукає його через prototype chain:

    dog
      ↓
    Dog.prototype
      ↓
    Animal.prototype
      ↓
    eat()


### instanceof

`instanceof` можна використовувати для перевірки inheritance.

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

Тому що:

    dog
      ↓
    Dog.prototype
      ↓
    Animal.prototype
      ↓
    Object.prototype


### Parent і Child через instanceof

    class Animal {}

    class Dog extends Animal {}

    const dog = new Dog();

    console.log(dog instanceof Dog);      // true
    console.log(dog instanceof Animal);   // true

Але:

    const animal = new Animal();

    console.log(animal instanceof Dog);   // false


### Inheritance не копіює methods

Важливо розуміти:

    class Animal {
      eat() {
        console.log("Eating");
      }
    }

    class Dog extends Animal {}

    const dog = new Dog();

`eat()` не обов'язково копіюється безпосередньо в `dog`.

Він знаходиться в prototype chain:

    dog
      ↓
    Dog.prototype
      ↓
    Animal.prototype
           │
           └── eat()


### Приклад: Vehicle

    class Vehicle {
      constructor(brand) {
        this.brand = brand;
      }

      start() {
        console.log(`${this.brand} is starting`);
      }
    }

    class Car extends Vehicle {
      drive() {
        console.log(`${this.brand} is driving`);
      }
    }

    const car = new Car("Toyota");

    car.start();
    car.drive();


### Приклад: ElectricCar

    class Vehicle {
      constructor(brand) {
        this.brand = brand;
      }

      start() {
        console.log(`${this.brand} is starting`);
      }
    }

    class Car extends Vehicle {
      drive() {
        console.log(`${this.brand} is driving`);
      }
    }

    class ElectricCar extends Car {
      charge() {
        console.log(`${this.brand} is charging`);
      }
    }

    const car = new ElectricCar("Tesla");

    car.start();
    car.drive();
    car.charge();

Структура:

    Vehicle
       │
       ▼
      Car
       │
       ▼
    ElectricCar


### Приклад: User roles

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
      deleteUser(user) {
        console.log(`${this.name} deleted ${user.name}`);
      }
    }

    const admin = new Admin(
      "Anna",
      "anna@example.com"
    );

    const user = new User(
      "John",
      "john@example.com"
    );

    admin.login();
    admin.deleteUser(user);


### Приклад: Animal hierarchy

    class Animal {
      constructor(name) {
        this.name = name;
      }

      speak() {
        console.log("Some sound");
      }
    }

    class Dog extends Animal {
      speak() {
        console.log(`${this.name}: Woof!`);
      }
    }

    class Cat extends Animal {
      speak() {
        console.log(`${this.name}: Meow!`);
      }
    }

    const dog = new Dog("Rex");
    const cat = new Cat("Murka");

    dog.speak();
    cat.speak();


### Polymorphism

Inheritance дозволяє різним child classes реалізовувати однаковий method по-різному.

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

    class Cat extends Animal {
      speak() {
        console.log("Meow!");
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

    Woof!
    Meow!

Однакова операція:

    animal.speak()

може мати різну поведінку залежно від конкретного object.


### Polymorphism — mental model

    Animal
       │
       ├── Dog
       │     └── speak() → Woof!
       │
       └── Cat
             └── speak() → Meow!


### super у звичайному method

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

Тут:

    super.speak()

означає:

    "виклич speak() з parent class"


### super і constructor

    class User {
      constructor(name) {
        this.name = name;
      }
    }

    class Admin extends User {
      constructor(name, permissions) {
        super(name);
        this.permissions = permissions;
      }
    }

Тут:

    super(name)

викликає:

    User constructor


### super — не object

`super` не означає "поточний object".

`this`:

    this

посилається на поточний instance.

`super`:

    super

дозволяє звернутися до parent class / parent prototype.


### Важливий порядок

При child constructor:

    class Child extends Parent {
      constructor(data) {
        super(data);

        this.ownProperty = data;
      }
    }

Порядок:

    constructor()
         │
         ▼
    super()
         │
         ▼
    parent constructor
         │
         ▼
    this доступний
         │
         ▼
    child properties


### Parent constructor + Child constructor

    class Person {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
    }

    class Student extends Person {
      constructor(name, age, course) {
        super(name, age);
        this.course = course;
      }
    }

    const student = new Student(
      "Anna",
      20,
      2
    );

Object:

    student
      │
      ├── name   → "Anna"
      ├── age    → 20
      └── course → 2


### Типові помилки

❌ Забути `extends`:

    class Dog {
      constructor(name) {
        super(name);
      }
    }

`super()` має сенс у context inheritance.


❌ Забути `super()` у child constructor:

    class Animal {
      constructor(name) {
        this.name = name;
      }
    }

    class Dog extends Animal {
      constructor(name) {
        this.name = name;
      }
    }

Правильно:

    class Dog extends Animal {
      constructor(name) {
        super(name);
      }
    }


❌ Використати `this` до `super()`:

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


❌ Плутати `super()` і `super.method()`:

    super()

викликає parent constructor.

    super.method()

викликає parent method.


❌ Вважати inheritance копіюванням:

    Child
      ↓
    копія Parent

Насправді JavaScript використовує prototype chain.


❌ Надмірно використовувати inheritance.

Не кожен зв'язок між classes означає inheritance.

Inheritance має сенс, коли існує логічне відношення:

    Dog is an Animal
    Car is a Vehicle
    Admin is a User

а не:

    Car has an Engine

Для "has-a" relationship часто краще використовувати composition.


### "is-a" vs "has-a"

Inheritance:

    Dog is an Animal

    class Dog extends Animal {}


Composition:

    Car has an Engine

    class Car {
      constructor() {
        this.engine = new Engine();
      }
    }

Модель:

    is-a
      ↓
    inheritance

    has-a
      ↓
    composition


### Inheritance vs Composition

Inheritance:

    Animal
      │
      ├── Dog
      └── Cat

Composition:

    Car
      │
      ├── Engine
      ├── Wheels
      └── GPS


Загальне правило:

    "is-a"  → inheritance

    "has-a" → composition


### Коли використовувати inheritance

Inheritance може бути корисним, коли:

✔ існує чіткий parent-child relationship

✔ child є спеціалізованою версією parent

✔ classes мають багато спільної поведінки

✔ потрібно перевизначити окремі methods

Приклади:

    Animal → Dog
    Animal → Cat

    Vehicle → Car
    Vehicle → Truck

    User → Admin
    User → Customer


### Коли inheritance краще не використовувати

Не варто створювати глибокі hierarchy без необхідності.

Проблемна структура:

    Entity
      ↓
    User
      ↓
    Employee
      ↓
    Manager
      ↓
    AdminManager
      ↓
    SuperAdminManager

Чим глибша hierarchy, тим складніше її підтримувати.

У складних системах часто краще використовувати composition.


### Основні терміни

**Inheritance**

Механізм створення нового class на основі існуючого class.

**Parent Class**

Клас, від якого наслідують.

**Child Class**

Клас, який наслідує parent class.

**Superclass**

Інша назва parent class.

**Subclass**

Інша назва child class.

**extends**

Встановлює inheritance між classes.

**super()**

Викликає parent constructor.

**super.method()**

Викликає method parent class.

**Method Overriding**

Перевизначення успадкованого method у child class.

**Prototype Chain**

Ланцюжок prototypes, через який JavaScript шукає properties та methods.

**Polymorphism**

Можливість використовувати однаковий interface/method з різною реалізацією у різних classes.

**instanceof**

Перевіряє, чи знаходиться prototype певного class у prototype chain object.


### Питання зі співбесіди

Що таке inheritance?

Що таке parent class?

Що таке child class?

Для чого використовується `extends`?

Для чого використовується `super()`?

Для чого використовується `super.method()`?

Чому потрібно викликати `super()` перед `this`?

Що таке method overriding?

Що таке prototype chain?

Як працює inheritance у JavaScript?

Що перевіряє `instanceof`?

Чи копіюються methods parent class у child object?

Що таке polymorphism?

Яка різниця між inheritance та composition?

Що означає relationship "is-a"?

Що означає relationship "has-a"?

Коли inheritance може бути поганим рішенням?

Чи може class успадковувати інший child class?

Чи може один parent class мати декілька child classes?


### Шлях

🟢 Core (обов'язково знати)

Що таке inheritance.

Що таке parent class.

Що таке child class.

Як використовувати `extends`.

Як використовувати `super()`.

Як передавати дані в parent constructor.

Як додавати власні properties у child.

Як додавати власні methods у child.

Що таке method overriding.

Як працює `super.method()`.

Як використовувати `instanceof`.


🔵 Junior

Розуміти:

    Parent
      ↓
    Child

Розуміти:

    extends
      ↓
    inheritance

Розуміти:

    super()
      ↓
    parent constructor

Розуміти:

    super.method()
      ↓
    parent method

Розуміти prototype chain.

Розуміти багаторівневе inheritance.

Розуміти polymorphism.

Розуміти різницю між inheritance та composition.

Уміти побудувати просту hierarchy classes.


🟠 Middle

Глибоко розуміти prototype chain.

Розуміти method lookup.

Розуміти overriding та delegation через `super`.

Розуміти polymorphism.

Розуміти composition vs inheritance.

Розуміти проблеми deep inheritance hierarchies.

Розуміти принцип composition over inheritance.

Розуміти, як inheritance впливає на структуру application.

Уміти проектувати hierarchy classes без зайвої складності.


🔴 Senior

Розуміти prototype-based nature JavaScript.

Розуміти внутрішню модель inheritance.

Розуміти trade-offs inheritance.

Розуміти composition over inheritance.

Розуміти coupling між parent та child classes.

Розуміти fragile base class problem.

Розуміти глибокі inheritance hierarchies та їхні ризики.

Розуміти polymorphism на рівні application architecture.

Уміти вибирати між:

    inheritance
    composition
    factory functions
    plain objects

залежно від задачі.


### Міні-шпаргалка

Basic inheritance:

    class Parent {
      method() {
        console.log("Parent");
      }
    }

    class Child extends Parent {
      childMethod() {
        console.log("Child");
      }
    }

    const child = new Child();

    child.method();
    child.childMethod();


Constructor:

    class Parent {
      constructor(name) {
        this.name = name;
      }
    }

    class Child extends Parent {
      constructor(name, age) {
        super(name);
        this.age = age;
      }
    }


Overriding:

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


super.method():

    class Parent {
      speak() {
        console.log("Parent");
      }
    }

    class Child extends Parent {
      speak() {
        super.speak();
        console.log("Child");
      }
    }


Prototype chain:

    child
      ↓
    Child.prototype
      ↓
    Parent.prototype
      ↓
    Object.prototype
      ↓
    null


Hierarchy:

    Parent
      │
      ├── Child A
      ├── Child B
      └── Child C


Multilevel:

    Parent
      ↓
    Child
      ↓
    GrandChild


Relationship:

    is-a
      ↓
    inheritance

    has-a
      ↓
    composition


### Головне:

• Inheritance дозволяє створити class на основі іншого class.

• `extends` створює inheritance relationship.

• Parent class — базовий class.

• Child class — class, який наслідує parent.

• `super()` викликає parent constructor.

• `super.method()` викликає parent method.

• У child constructor `super()` потрібно викликати до використання `this`.

• Child може додавати власні properties та methods.

• Child може перевизначати methods parent class.

• Method overriding дозволяє змінювати поведінку успадкованого method.

• Inheritance у JavaScript працює через prototype chain.

• Methods parent class доступні child instances через prototype chain.

• `instanceof` дозволяє перевірити inheritance relationship.

• Polymorphism дозволяє різним classes реалізовувати один method по-різному.

• `is-a` relationship зазвичай підходить для inheritance.

• `has-a` relationship зазвичай підходить для composition.

• Не потрібно використовувати inheritance лише тому, що його можна використати.

• Глибокі inheritance hierarchies збільшують складність і coupling.

• У сучасному JavaScript важливо розуміти не тільки `class`, але й prototype chain.

• Основна модель:

    Parent
      │
      │ extends
      ▼
    Child
      │
      ├── inherited behavior
      ├── own behavior
      └── overridden behavior

• Основна формула:

    extends
       ↓
    inheritance

    super()
       ↓
    parent constructor

    super.method()
       ↓
    parent method

    overriding
       ↓
    змінення inherited behavior

    prototype chain
       ↓
    пошук properties / methods

• Головне для практики:

    class Parent {
      constructor(data) {
        this.data = data;
      }

      method() {
        // parent behavior
      }
    }

    class Child extends Parent {
      constructor(data, extra) {
        super(data);
        this.extra = extra;
      }

      method() {
        super.method();
        // child behavior
      }
    }

    const child = new Child(data, extra);
