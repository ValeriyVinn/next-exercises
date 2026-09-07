## 01. Creating Classes

Class (клас) — це шаблон для створення об'єктів з однаковою структурою та поведінкою.

У JavaScript `class` використовується для створення об'єктів, які можуть мати:
- properties (властивості)
- methods (методи)
- constructor (конструктор)

Приклад:

    class User {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }

      sayHello() {
        console.log(`Hello, ${this.name}!`);
      }
    }

Створення об'єкта:

    const user = new User("Valeriy", 56);

    console.log(user.name);
    console.log(user.age);

    user.sayHello();

Результат:

    Valeriy
    56
    Hello, Valeriy!


### Ключові поняття

✔ class
✔ object
✔ constructor
✔ new
✔ this
✔ property
✔ method
✔ instance
✔ class syntax


### Що потрібно пам'ятати

• `class` створює шаблон для об'єктів.

• Об'єкт, створений на основі class, називається instance (екземпляр).

• `constructor()` — спеціальний метод, який автоматично викликається під час створення нового об'єкта.

• `new` створює новий instance класу.

• `this` всередині constructor та methods посилається на поточний instance.

• Properties зберігають дані об'єкта.

• Methods описують поведінку об'єкта.

• Один class може створити багато різних objects.

• Кожен instance має власні значення properties.

• Methods зазвичай описують спільну поведінку всіх instances.


### Основний синтаксис

    class ClassName {
      constructor(parameters) {
        this.property = parameters;
      }

      method() {
        // code
      }
    }

Створення instance:

    const object = new ClassName(value);


### Простий приклад

    class User {
      constructor(name) {
        this.name = name;
      }

      greet() {
        console.log(`Hello, ${this.name}!`);
      }
    }

    const user1 = new User("Anna");
    const user2 = new User("John");

    user1.greet();
    user2.greet();

Результат:

    Hello, Anna!
    Hello, John!


### Class і Object

Class:

    class User {
      constructor(name) {
        this.name = name;
      }
    }

Object:

    const user = new User("Anna");

Можна мислити так:

    Class
      │
      │ new
      ▼
    Object

Наприклад:

    User
      │
      ├── new → user1
      ├── new → user2
      └── new → user3


### Constructor

`constructor()` — спеціальний метод класу.

Він викликається автоматично при використанні `new`.

    class User {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
    }

    const user = new User("Anna", 25);

Фактично:

    new User("Anna", 25)
          │
          ▼
    constructor("Anna", 25)
          │
          ▼
    this.name = "Anna"
    this.age = 25


### Constructor без параметрів

Параметри constructor не є обов'язковими.

    class User {
      constructor() {
        this.name = "Unknown";
        this.age = 0;
      }
    }

    const user = new User();

    console.log(user.name);
    console.log(user.age);


### Constructor з параметрами

Найчастіше дані передаються через constructor.

    class User {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
    }

    const user = new User("Anna", 25);

    console.log(user.name);
    console.log(user.age);


### this

`this` посилається на поточний object (instance).

    class User {
      constructor(name) {
        this.name = name;
      }
    }

    const user1 = new User("Anna");
    const user2 = new User("John");

    console.log(user1.name);
    console.log(user2.name);

Тут:

    this.name

для `user1` означає:

    user1.name

а для `user2`:

    user2.name


### Properties

Properties — це дані, які належать object.

    class User {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
    }

    const user = new User("Anna", 25);

    console.log(user.name);
    console.log(user.age);

У object:

    user
    │
    ├── name → "Anna"
    └── age  → 25


### Methods

Method — це function, яка належить object/class.

    class User {
      constructor(name) {
        this.name = name;
      }

      greet() {
        console.log(`Hello, ${this.name}!`);
      }
    }

    const user = new User("Anna");

    user.greet();


### Method з параметрами

Методи можуть приймати параметри.

    class Calculator {
      add(a, b) {
        return a + b;
      }

      multiply(a, b) {
        return a * b;
      }
    }

    const calculator = new Calculator();

    console.log(calculator.add(2, 3));
    console.log(calculator.multiply(4, 5));


### Methods можуть працювати з properties

    class User {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }

      introduce() {
        console.log(
          `My name is ${this.name}. I am ${this.age} years old.`
        );
      }
    }

    const user = new User("Anna", 25);

    user.introduce();


### Зміна properties

Properties instance можна змінювати.

    class User {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
    }

    const user = new User("Anna", 25);

    user.age = 26;

    console.log(user.age);


### Додавання properties

В JavaScript можна додавати нові properties до instance.

    class User {
      constructor(name) {
        this.name = name;
      }
    }

    const user = new User("Anna");

    user.email = "anna@example.com";

    console.log(user.email);


### Створення декількох instances

Один class може використовуватися для створення багатьох objects.

    class User {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }

      greet() {
        console.log(`Hello, ${this.name}!`);
      }
    }

    const user1 = new User("Anna", 25);
    const user2 = new User("John", 30);
    const user3 = new User("Mike", 35);

    user1.greet();
    user2.greet();
    user3.greet();


### Instances незалежні один від одного

    class User {
      constructor(name) {
        this.name = name;
      }
    }

    const user1 = new User("Anna");
    const user2 = new User("John");

    user1.name = "Maria";

    console.log(user1.name);
    console.log(user2.name);

Результат:

    Maria
    John

Зміна `user1` не змінює `user2`.


### Class з properties та methods

    class Product {
      constructor(name, price) {
        this.name = name;
        this.price = price;
      }

      getInfo() {
        return `${this.name}: $${this.price}`;
      }

      applyDiscount(percent) {
        this.price -= this.price * percent / 100;
      }
    }

    const product = new Product("Laptop", 1000);

    console.log(product.getInfo());

    product.applyDiscount(10);

    console.log(product.getInfo());


### Class може містити багато methods

    class User {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }

      greet() {
        console.log(`Hello, ${this.name}!`);
      }

      getAge() {
        return this.age;
      }

      haveBirthday() {
        this.age++;
      }
    }

    const user = new User("Anna", 25);

    user.greet();

    console.log(user.getAge());

    user.haveBirthday();

    console.log(user.getAge());


### Return у methods

Method може повертати значення через `return`.

    class Rectangle {
      constructor(width, height) {
        this.width = width;
        this.height = height;
      }

      getArea() {
        return this.width * this.height;
      }
    }

    const rectangle = new Rectangle(10, 5);

    console.log(rectangle.getArea());

Результат:

    50


### Class з default values

Можна використовувати значення за замовчуванням.

    class User {
      constructor(name = "Unknown", age = 0) {
        this.name = name;
        this.age = age;
      }
    }

    const user1 = new User();
    const user2 = new User("Anna");

    console.log(user1.name);
    console.log(user1.age);

    console.log(user2.name);
    console.log(user2.age);


### Перевірка instance

Оператор `instanceof` перевіряє, чи створений object через певний class.

    class User {
      constructor(name) {
        this.name = name;
      }
    }

    const user = new User("Anna");

    console.log(user instanceof User);

Результат:

    true


Інший object:

    const person = {
      name: "John"
    };

    console.log(person instanceof User);

Результат:

    false


### Class — це special syntax

JavaScript `class` використовує прототипну систему JavaScript.

Спрощено:

    class User {
      greet() {
        console.log("Hello");
      }
    }

    const user = new User();

Можна мислити так:

    user
      │
      ▼
    User.prototype
      │
      └── greet()


Тобто methods класу доступні instances через prototype.


### Class і prototype

Приклад:

    class User {
      constructor(name) {
        this.name = name;
      }

      greet() {
        console.log(`Hello, ${this.name}`);
      }
    }

    const user = new User("Anna");

Method:

    greet()

знаходиться в:

    User.prototype

а не створюється окремою копією для кожного instance.

Це одна з важливих особливостей class у JavaScript.


### Class declaration

Найпоширеніший спосіб створення класу:

    class User {
      constructor(name) {
        this.name = name;
      }
    }


### Class expression

Class можна записати як expression:

    const User = class {
      constructor(name) {
        this.name = name;
      }
    };

    const user = new User("Anna");


### Class name

Назви класів зазвичай пишуться у `PascalCase`.

Правильно:

    class User {}
    class Product {}
    class BankAccount {}
    class ShoppingCart {}

Не рекомендується:

    class user {}
    class product {}
    class shoppingcart {}


### Коли використовувати class

Class зручно використовувати, коли потрібно створювати багато однотипних objects, які мають:

✔ однакову структуру
✔ однакову поведінку
✔ власний state
✔ methods для роботи зі state


Наприклад:

    class User {}
    class Product {}
    class Order {}
    class BankAccount {}
    class Car {}


### Приклад: BankAccount

    class BankAccount {
      constructor(owner, balance = 0) {
        this.owner = owner;
        this.balance = balance;
      }

      deposit(amount) {
        this.balance += amount;
      }

      withdraw(amount) {
        if (amount <= this.balance) {
          this.balance -= amount;
        }
      }

      getBalance() {
        return this.balance;
      }
    }

    const account = new BankAccount("Anna", 1000);

    account.deposit(500);
    account.withdraw(200);

    console.log(account.getBalance());

Результат:

    1300


### Приклад: Car

    class Car {
      constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
      }

      getInfo() {
        return `${this.brand} ${this.model} (${this.year})`;
      }

      start() {
        console.log(`${this.brand} is starting...`);
      }
    }

    const car = new Car("Toyota", "Corolla", 2024);

    console.log(car.getInfo());
    car.start();


### Приклад: Student

    class Student {
      constructor(name, age) {
        this.name = name;
        this.age = age;
        this.grades = [];
      }

      addGrade(grade) {
        this.grades.push(grade);
      }

      getAverage() {
        if (this.grades.length === 0) {
          return 0;
        }

        const sum = this.grades.reduce(
          (total, grade) => total + grade,
          0
        );

        return sum / this.grades.length;
      }
    }

    const student = new Student("Anna", 20);

    student.addGrade(10);
    student.addGrade(12);
    student.addGrade(11);

    console.log(student.getAverage());


### Class і звичайний object

Звичайний object:

    const user = {
      name: "Anna",

      greet() {
        console.log(`Hello, ${this.name}`);
      }
    };

Class:

    class User {
      constructor(name) {
        this.name = name;
      }

      greet() {
        console.log(`Hello, ${this.name}`);
      }
    }

Основна різниця:

    Object
      ↓
    один конкретний object

    Class
      ↓
    шаблон для створення багатьох objects


### Class і Factory Function

Object можна створювати і через function:

    function createUser(name) {
      return {
        name,

        greet() {
          console.log(`Hello, ${this.name}`);
        }
      };
    }

    const user = createUser("Anna");

Або через class:

    class User {
      constructor(name) {
        this.name = name;
      }

      greet() {
        console.log(`Hello, ${this.name}`);
      }
    }

    const user = new User("Anna");

Обидва підходи можуть використовуватися для створення однотипних objects.


### Важливі правила constructor

✔ Назва завжди `constructor`.

✔ У class може бути лише один `constructor`.

Правильно:

    class User {
      constructor(name) {
        this.name = name;
      }
    }

Не можна:

    class User {
      constructor(name) {}
      constructor(name, age) {}
    }


### Constructor не є обов'язковим

Якщо constructor не написаний, JavaScript створює default constructor.

    class User {
      greet() {
        console.log("Hello");
      }
    }

    const user = new User();

Це допустимо.


### new

`new` використовується для створення instance класу.

    const user = new User("Anna");

Спрощено можна уявляти процес так:

    new User("Anna")
         │
         ├── створюється новий object
         │
         ├── встановлюється prototype
         │
         ├── викликається constructor
         │
         └── повертається instance


### Що робить new

При використанні:

    const user = new User("Anna");

JavaScript концептуально:

    1. Створює новий object.
    2. Пов'язує object з User.prototype.
    3. Викликає constructor.
    4. Передає constructor аргументи.
    5. Повертає новий object.


### Типова структура class

    class ClassName {
      constructor(data) {
        this.property = data;
      }

      method() {
        // behavior
      }
    }

    const instance = new ClassName(data);


### Mental Model

Можна запам'ятати:

    class
      │
      │ template
      ▼
    instance
      │
      ├── properties
      │
      └── methods


Інший варіант:

    Class
      │
      │ new
      ▼
    Instance
      │
      ├── state
      │   ├── property
      │   └── property
      │
      └── behavior
          ├── method()
          └── method()


### Основні терміни

**Class**

Шаблон для створення objects.

**Instance**

Конкретний object, створений через class.

**Constructor**

Спеціальний метод, який виконується під час створення instance.

**new**

Оператор для створення нового instance.

**this**

Посилання на поточний object.

**Property**

Дані, які належать object.

**Method**

Function, яка описує поведінку object.

**Prototype**

Object, через який instances отримують спільні methods та інші властивості.

**instanceof**

Оператор для перевірки, чи належить object певному class.


### Типові помилки

❌ Забути `new`:

    const user = User("Anna");

Замість:

    const user = new User("Anna");


❌ Забути `this`:

    class User {
      constructor(name) {
        name = name;
      }
    }

Правильно:

    class User {
      constructor(name) {
        this.name = name;
      }
    }


❌ Використовувати неправильне ім'я constructor:

    class User {
      Constructor(name) {
        this.name = name;
      }
    }

Правильно:

    class User {
      constructor(name) {
        this.name = name;
      }
    }


❌ Плутати class та instance:

    class User {}

    const user = new User();

    User // class
    user // instance


❌ Плутати property та method:

    this.name       // property

    this.greet()    // method


❌ Забувати `return` у method:

    class Calculator {
      add(a, b) {
        a + b;
      }
    }

Правильно:

    class Calculator {
      add(a, b) {
        return a + b;
      }
    }


### Питання зі співбесіди

Що таке class у JavaScript?

Що таке object instance?

Що таке constructor?

Для чого використовується `new`?

Що таке `this`?

Що таке property?

Що таке method?

Як створити object через class?

Чи обов'язково мати constructor?

Чи може class мати декілька constructors?

Що таке `instanceof`?

Яка різниця між class та object?

Яка різниця між class та factory function?

Де знаходяться methods класу?

Що таке prototype?

Як створити декілька instances одного class?

Чому properties потрібно записувати через `this`?

Що відбувається під час `new ClassName()`?


### Шлях

🟢 Core (обов'язково знати)

Що таке class.

Що таке object.

Що таке instance.

Як створити class.

Як створити instance через `new`.

Що таке constructor.

Як працює `this`.

Що таке property.

Що таке method.

Як створити декілька instances.

Як змінювати properties.

Як повертати значення з methods.

Що робить `instanceof`.


🔵 Junior

Розуміти зв'язок:

    class
      ↓
    instance
      ↓
    properties + methods

Розуміти роль constructor.

Розуміти `this`.

Розуміти `new`.

Розуміти class declaration та class expression.

Розуміти methods класу.

Розуміти default values.

Розуміти базову роль prototype.

Розуміти різницю між class та factory function.

Уміти створити простий class для реальної задачі.


🟠 Middle

Розуміти prototype chain.

Розуміти зв'язок:

    instance
      ↓
    Class.prototype
      ↓
    Object.prototype
      ↓
    null

Розуміти instance methods.

Розуміти static methods та properties.

Розуміти private fields.

Розуміти getters та setters.

Розуміти class inheritance.

Розуміти `super`.

Розуміти polymorphism.

Розуміти composition vs inheritance.


🔴 Senior

Глибоко розуміти prototype system JavaScript.

Розуміти semantics `new`.

Розуміти prototype chain та property lookup.

Розуміти memory та sharing methods через prototype.

Розуміти trade-offs між classes, factory functions та composition.

Розуміти object-oriented design patterns.

Розуміти SOLID principles у контексті JavaScript.

Розуміти, коли class є зайвим.

Розуміти composition over inheritance.

Розуміти поведінку `this` у різних контекстах.


### Міні-шпаргалка

Створення class:

    class User {
      constructor(name) {
        this.name = name;
      }

      greet() {
        console.log(`Hello, ${this.name}`);
      }
    }


Створення instance:

    const user = new User("Anna");


Використання:

    user.greet();


Структура:

    class
      │
      ├── constructor()
      │     │
      │     └── properties
      │
      └── methods


Class → instances:

    User
      │
      ├── new → user1
      ├── new → user2
      └── new → user3


this:

    class User {
      constructor(name) {
        this.name = name;
      }
    }

    const user = new User("Anna");

    user.name
      ↑
    this.name


Основний цикл:

    class
      ↓
    new
      ↓
    constructor
      ↓
    this.properties
      ↓
    instance
      ↓
    methods


### Головне:

• `class` — шаблон для створення objects.

• `new` — створює новий instance.

• `constructor()` — ініціалізує instance.

• `this` — посилається на поточний instance.

• Properties зберігають state object.

• Methods описують behavior object.

• Один class може створити багато instances.

• Кожен instance має власні properties.

• Methods класу спільно використовуються через prototype.

• `instanceof` перевіряє належність object до class.

• Class у JavaScript побудований поверх prototype-based object model.

• Головна модель:

    class
      ↓
    new
      ↓
    instance
      ↓
    properties + methods

• Для базового рівня достатньо добре розуміти:

    class
    constructor
    new
    this
    properties
    methods
    instance

