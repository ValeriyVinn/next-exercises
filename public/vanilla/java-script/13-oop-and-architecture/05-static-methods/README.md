# 05. Static Methods

Static methods — це methods, які належать самому `class`, а не його instances.

Основна ідея:

    Class
      │
      └── Static Methods
             │
             ▼
          behavior

    Instance
      │
      └── Instance Methods
             │
             ▼
          behavior

Static method викликається через class:

    Class.method();

а звичайний instance method — через instance:

    instance.method();

---

# Ключові поняття

✔ static method  
✔ `static`  
✔ class-level behavior  
✔ instance-level behavior  
✔ static method call  
✔ `this` у static method  
✔ static property  
✔ static field  
✔ static block  
✔ utility method  
✔ factory method  
✔ validation method  
✔ class API  
✔ instance API  
✔ inheritance  
✔ `super`  
✔ private static method  
✔ private static field  
✔ static vs instance method  

---

# Що потрібно пам'ятати

• Static method належить `class`, а не instance.

• Static method оголошується через `static`.

• Static method викликається через class:

    Class.method();

• Static method не викликається через instance:

    instance.method();

• Instance method викликається через instance.

• Static methods зручно використовувати для behavior, який не потребує конкретного instance.

• Static method може працювати зі static properties.

• Усередині static method `this` зазвичай посилається на class, через який method був викликаний.

• Static method може викликати інший static method через `this`.

• Static method може бути private:

    static #method() {}

• Static methods можуть успадковуватися через inheritance.

• Static methods часто використовуються як utility methods або factory methods.

• Static method не має прямого доступу до instance state через `this`.

---

# Що таке Static Method

Звичайний instance method:

    class User {
      sayHello() {
        console.log("Hello");
      }
    }

Виклик:

    const user = new User();

    user.sayHello();

Static method:

    class User {
      static sayHello() {
        console.log("Hello");
      }
    }

Виклик:

    User.sayHello();

Тут `sayHello()` належить:

    User

а не:

    user

---

# `static`

Для створення static method використовується keyword:

    static

Наприклад:

    class MathHelper {
      static add(a, b) {
        return a + b;
      }
    }

Виклик:

    MathHelper.add(10, 20);

Результат:

    30

---

# Static Method vs Instance Method

Instance method:

    class User {
      sayHello() {
        console.log("Hello");
      }
    }

    const user = new User();

    user.sayHello();

Static method:

    class User {
      static sayHello() {
        console.log("Hello");
      }
    }

    User.sayHello();

Модель:

    CLASS
      │
      └── static method
             │
             ▼
        Class.method()


    INSTANCE
      │
      └── instance method
             │
             ▼
        instance.method()

---

# Основна різниця

Instance method:

    class User {
      sayHello() {}
    }

Викликається:

    user.sayHello();

Static method:

    class User {
      static sayHello() {}
    }

Викликається:

    User.sayHello();

---

# Static Method не належить Instance

    class User {
      static create() {
        return new User();
      }
    }

    const user = new User();

Instance:

    user

не має:

    create()

А class:

    User

має:

    User.create()

---

# Приклад

    class User {
      static createGuest() {
        return new User(
          "Guest"
        );
      }

      constructor(name) {
        this.name = name;
      }
    }

Використання:

    const guest =
      User.createGuest();

    console.log(guest.name);

Результат:

    Guest

Static method створює instance.

---

# Static Methods як Class API

Class може мати два різні API:

    User
      │
      ├── Class API
      │     └── static methods
      │
      └── Instance API
            └── instance methods

Наприклад:

    class User {
      static create() {
        return new User();
      }

      save() {
        console.log("Saving user");
      }
    }

Class API:

    User.create();

Instance API:

    user.save();

---

# Static Method не потребує Instance

Якщо operation не залежить від конкретного object, static method може бути доречним.

Наприклад:

    class Temperature {
      static celsiusToFahrenheit(celsius) {
        return celsius * 9 / 5 + 32;
      }
    }

Виклик:

    Temperature.celsiusToFahrenheit(20);

Тут не потрібно:

    new Temperature();

---

# Utility Static Method

Static methods часто використовуються для utility logic.

    class MathHelper {
      static add(a, b) {
        return a + b;
      }

      static subtract(a, b) {
        return a - b;
      }

      static multiply(a, b) {
        return a * b;
      }
    }

Використання:

    MathHelper.add(10, 5);

    MathHelper.subtract(10, 5);

    MathHelper.multiply(10, 5);

---

# Utility Class

Class може містити тільки static methods.

    class StringUtils {
      static capitalize(value) {
        return (
          value[0].toUpperCase() +
          value.slice(1)
        );
      }

      static reverse(value) {
        return value
          .split("")
          .reverse()
          .join("");
      }
    }

Використання:

    StringUtils.capitalize("hello");

    StringUtils.reverse("hello");

Instance не потрібен.

---

# Але не кожен Utility потрібно робити Class

Наприклад, інколи простіше:

    function capitalize(value) {
      return (
        value[0].toUpperCase() +
        value.slice(1)
      );
    }

або:

    const capitalize = value => {
      return (
        value[0].toUpperCase() +
        value.slice(1)
      );
    };

Тому static utility class має сенс, коли він відповідає певній концепції або API.

---

# Static Method + `this`

У static method:

    this

зазвичай посилається на class.

Наприклад:

    class User {
      static getClassName() {
        return this.name;
      }
    }

Виклик:

    User.getClassName();

Результат:

    User

Тут:

    this === User

---

# Static Method + Static Property

Static method може використовувати static property.

    class Config {
      static environment = "development";

      static getEnvironment() {
        return this.environment;
      }
    }

Виклик:

    Config.getEnvironment();

Результат:

    development

Модель:

    Config
      │
      ├── static environment
      │
      └── static getEnvironment()
               │
               ▼
        this.environment

---

# Static Property

Static field належить class.

    class Counter {
      static count = 0;
    }

Використання:

    Counter.count;

Результат:

    0

Instance:

    const counter =
      new Counter();

не має власного:

    count

якщо його не створено окремо.

---

# Static Method + Counter

    class User {
      static count = 0;

      constructor(name) {
        this.name = name;

        User.count++;
      }

      static getCount() {
        return this.count;
      }
    }

Створення:

    new User("A");
    new User("B");
    new User("C");

Тепер:

    User.getCount();

Результат:

    3

Static state належить всьому class.

---

# Instance State vs Static State

Instance state:

    class User {
      constructor(name) {
        this.name = name;
      }
    }

Кожен instance має власний:

    name

Static state:

    class User {
      static count = 0;
    }

Один:

    count

належить class.

Модель:

    User
      │
      └── static count
             │
             ▼
          shared


    user1
      │
      └── name

    user2
      │
      └── name

    user3
      │
      └── name

Instance state — окремий для кожного object.

Static state — спільний на рівні class.

---

# Static Method + Instance State

Static method не має конкретного instance.

Наприклад:

    class User {
      constructor(name) {
        this.name = name;
      }

      static getName() {
        return this.name;
      }
    }

    const user = new User("Valeriy");

    User.getName();

Тут:

    this

у static method — це `User`, а не:

    user

Тому static method не може таким способом отримати:

    user.name

---

# Важливе правило

Instance method:

    this
      │
      ▼
    instance

Static method:

    this
      │
      ▼
    class

Спрощена модель:

    instance.method()
          │
          ▼
        this
          │
          ▼
       instance


    Class.method()
          │
          ▼
        this
          │
          ▼
         Class

---

# Static Method не бачить Instance State

Погано:

    class User {
      constructor(name) {
        this.name = name;
      }

      static sayHello() {
        console.log(this.name);
      }
    }

    const user =
      new User("Valeriy");

    User.sayHello();

Static method не працює з:

    user.name

через `this`.

Він працює з:

    User.name

---

# Static Factory Method

Одна з найпоширеніших практик — static factory method.

    class User {
      constructor(name, role) {
        this.name = name;
        this.role = role;
      }

      static createAdmin(name) {
        return new User(
          name,
          "admin"
        );
      }
    }

Використання:

    const user =
      User.createAdmin("Valeriy");

Результат:

    {
      name: "Valeriy",
      role: "admin"
    }

---

# Factory Method

Factory method приховує деталі створення object.

Без factory:

    const user = new User(
      "Valeriy",
      "admin"
    );

З factory:

    const user =
      User.createAdmin("Valeriy");

Factory:

    createAdmin()

визначає:

    how object should be created

---

# Кілька Factory Methods

    class User {
      constructor(name, role) {
        this.name = name;
        this.role = role;
      }

      static createAdmin(name) {
        return new User(
          name,
          "admin"
        );
      }

      static createGuest(name) {
        return new User(
          name,
          "guest"
        );
      }
    }

Використання:

    const admin =
      User.createAdmin("John");

    const guest =
      User.createGuest("Bob");

---

# Static Method для Validation

Static methods часто використовують для validation.

    class Email {
      static isValid(value) {
        return value.includes("@");
      }
    }

Використання:

    Email.isValid(
      "user@example.com"
    );

Результат:

    true

Тут не потрібно створювати:

    new Email()

---

# Static Method для Parsing

Static method може перетворювати дані.

    class DateParser {
      static fromString(value) {
        return new Date(value);
      }
    }

Використання:

    const date =
      DateParser.fromString(
        "2026-09-07"
      );

---

# Static Method для Formatting

    class Currency {
      static format(value) {
        return `$${value.toFixed(2)}`;
      }
    }

Використання:

    Currency.format(100);

Результат:

    "$100.00"

---

# Static Method + Private Static Method

Static method може викликати private static method.

    class User {
      static #normalizeName(name) {
        return name.trim();
      }

      static create(name) {
        const normalized =
          this.#normalizeName(name);

        return new User(normalized);
      }

      constructor(name) {
        this.name = name;
      }
    }

Використання:

    const user =
      User.create(" Valeriy ");

Private method:

    #normalizeName()

доступний тільки всередині class.

---

# Private Static Method

Синтаксис:

    class Example {
      static #helper() {
        // ...
      }
    }

Виклик всередині class:

    this.#helper();

Зовні:

    Example.#helper();

неможливо.

Private static method належить class, але прихований від external code.

---

# Static Block

JavaScript також підтримує static initialization blocks.

    class Config {
      static value;

      static {
        Config.value =
          "development";
      }
    }

Після визначення class:

    Config.value

буде:

    "development"

Static block виконується під час ініціалізації class.

---

# Static Block + `this`

У static block:

    this

посилається на class.

    class Config {
      static environment;

      static {
        this.environment =
          "development";
      }
    }

---

# Static Methods + Inheritance

Static methods можуть успадковуватися.

    class Animal {
      static info() {
        console.log(
          "Animal class"
        );
      }
    }

    class Dog extends Animal {}

Тепер:

    Dog.info();

Static method доступний через child class.

---

# Static Method + `super`

Child class може викликати static method parent class через:

    super.method()

Наприклад:

    class Animal {
      static info() {
        return "Animal";
      }
    }

    class Dog extends Animal {
      static info() {
        return super.info() +
          " -> Dog";
      }
    }

Виклик:

    Dog.info();

Результат:

    Animal -> Dog

---

# Static Method + `this` у Inheritance

Це важливий момент.

    class Animal {
      static create() {
        return new this();
      }
    }

    class Dog extends Animal {}

Тепер:

    const dog =
      Dog.create();

`this` всередині static method буде:

    Dog

Тому:

    new this()

стає:

    new Dog()

Це дозволяє створювати polymorphic factory methods.

---

# Static Factory + Inheritance

    class Animal {
      constructor(name) {
        this.name = name;
      }

      static create(name) {
        return new this(name);
      }
    }

    class Dog extends Animal {}

    const dog =
      Dog.create("Rex");

Тут `this` у:

    Animal.create()

під час виклику через `Dog` посилається на:

    Dog

Тому створюється:

    new Dog("Rex")

---

# Static Method Inheritance Model

    Animal
      │
      └── static create()
              │
              ▼
          inherited by
              │
              ▼
            Dog
              │
              ▼
          Dog.create()

Static methods можуть бути доступними через child class.

---

# Static Method vs Instance Method

Приклад:

    class User {
      constructor(name) {
        this.name = name;
      }

      sayHello() {
        return `Hello, ${this.name}`;
      }

      static createGuest() {
        return new User("Guest");
      }
    }

Instance method:

    user.sayHello();

Static method:

    User.createGuest();

---

# Коли використовувати Instance Method

Instance method доречний, коли behavior залежить від конкретного object.

Наприклад:

    class User {
      constructor(name) {
        this.name = name;
      }

      sayHello() {
        return `Hello, ${this.name}`;
      }
    }

Результат залежить від:

    this.name

Тобто від конкретного instance.

---

# Коли використовувати Static Method

Static method доречний, коли operation:

• не потребує конкретного instance;

• працює на рівні class;

• створює instances;

• перевіряє або перетворює дані;

• є factory behavior;

• представляє class-level utility;

• працює зі static state.

---

# Хороший кандидат для Static Method

Наприклад:

    class User {
      static isValidName(name) {
        return name.trim().length > 0;
      }
    }

Використання:

    User.isValidName("Valeriy");

Тут немає необхідності в:

    new User()

---

# Поганий кандидат для Static Method

Наприклад:

    class User {
      constructor(name) {
        this.name = name;
      }

      static getName() {
        return this.name;
      }
    }

Це погана модель, якщо нам потрібне ім'я конкретного user.

Краще:

    getName() {
      return this.name;
    }

Тому що behavior залежить від instance.

---

# Просте правило

Запитай:

    "Чи потрібен мені конкретний object?"

Якщо:

    YES

→ instance method.

Якщо:

    NO

→ можливо, static method.

Модель:

    Need instance state?
          │
       ┌──┴──┐
       │     │
      YES    NO
       │     │
       ▼     ▼
    Instance Static
     method  method

---

# Static Methods і Encapsulation

Static methods можуть бути частиною public class API.

    class User {
      static createGuest() {
        return new User("Guest");
      }

      constructor(name) {
        this.name = name;
      }
    }

External code використовує:

    User.createGuest();

але не повинен знати всі деталі створення object.

---

# Static Method як Public API

    class Database {
      static connect() {
        // connection logic
      }

      static disconnect() {
        // disconnect logic
      }
    }

External API:

    Database.connect();

    Database.disconnect();

Static methods представляють operations на рівні class.

---

# Static Method + Shared State

    class Session {
      static currentUser = null;

      static login(user) {
        this.currentUser = user;
      }

      static logout() {
        this.currentUser = null;
      }

      static isAuthenticated() {
        return this.currentUser !== null;
      }
    }

Використання:

    Session.login(user);

    Session.isAuthenticated();

    Session.logout();

Static state є спільним для class.

---

# Обережно зі Shared State

Static state живе на рівні class.

Тому:

    class Counter {
      static value = 0;

      static increment() {
        this.value++;
      }
    }

    Counter.increment();
    Counter.increment();

Тепер:

    Counter.value

дорівнює:

    2

Shared state може бути корисним, але може ускладнювати:

    testing
    concurrency
    state management
    debugging

---

# Static Methods і Testing

Pure static method легко тестувати.

    class MathHelper {
      static add(a, b) {
        return a + b;
      }
    }

Тестова ідея:

    MathHelper.add(2, 3);

Очікуємо:

    5

Не потрібно створювати object.

---

# Static Method + Dependency

Static methods можуть ускладнювати dependency injection, якщо вони жорстко залежать від глобального state.

Наприклад:

    class UserService {
      static createUser(data) {
        // uses global database
      }
    }

Такий підхід може бути менш гнучким.

У великих applications часто краще використовувати звичайні objects/services із dependencies.

---

# Static Methods у Domain Model

Static methods можуть бути корисними для створення domain objects.

    class Money {
      constructor(amount, currency) {
        this.amount = amount;
        this.currency = currency;
      }

      static fromUSD(amount) {
        return new Money(
          amount,
          "USD"
        );
      }

      static fromEUR(amount) {
        return new Money(
          amount,
          "EUR"
        );
      }
    }

Використання:

    const price =
      Money.fromUSD(100);

---

# Static Factory vs Constructor

Constructor:

    new User(
      "Valeriy",
      "admin"
    );

Static factory:

    User.createAdmin(
      "Valeriy"
    );

Factory method може зробити API зрозумілішим.

---

# Static Method Naming

Static methods часто використовують назви:

    create()
    from()
    fromJSON()
    fromString()
    parse()
    validate()
    isValid()
    format()
    compare()
    calculate()

Наприклад:

    User.fromJSON(data);

    Email.isValid(value);

    Money.fromUSD(100);

    DateParser.parse(value);

---

# Static Predicate Methods

Static method може повертати boolean.

    class Email {
      static isValid(value) {
        return value.includes("@");
      }
    }

Використання:

    if (Email.isValid(email)) {
      // ...
    }

Назви:

    isValid()
    isEmpty()
    exists()
    supports()

часто добре підходять для boolean methods.

---

# Static Compare Method

Static method може порівнювати objects.

    class User {
      constructor(id) {
        this.id = id;
      }

      static sameUser(userA, userB) {
        return userA.id === userB.id;
      }
    }

Використання:

    User.sameUser(
      user1,
      user2
    );

---

# Static Method + Array

Static method може створити collection.

    class User {
      static createMany(names) {
        return names.map(
          name => new User(name)
        );
      }

      constructor(name) {
        this.name = name;
      }
    }

Використання:

    const users =
      User.createMany([
        "John",
        "Bob",
        "Anna"
      ]);

---

# Static Method + JSON

    class User {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }

      static fromJSON(json) {
        const data =
          JSON.parse(json);

        return new User(
          data.name,
          data.age
        );
      }
    }

Використання:

    const user =
      User.fromJSON(
        '{"name":"John","age":30}'
      );

---

# Static Method + Serialization

Static method може відновлювати object із serialized data.

Модель:

    JSON
      │
      ▼
    static fromJSON()
      │
      ▼
    instance

А instance method може робити зворотну операцію:

    instance.toJSON()
      │
      ▼
    JSON

Це хороший приклад розділення class-level та instance-level behavior.

---

# Instance + Static API Разом

    class User {
      constructor(name) {
        this.name = name;
      }

      sayHello() {
        return `Hello, ${this.name}`;
      }

      static fromJSON(json) {
        const data =
          JSON.parse(json);

        return new User(data.name);
      }
    }

Class-level:

    User.fromJSON(json);

Instance-level:

    user.sayHello();

Модель:

    User
      │
      └── fromJSON()
            │
            ▼
          User instance
            │
            └── sayHello()

---

# Static Method + Private Constructor Logic

JavaScript не має private constructor syntax у такому самому стилі, як private methods, але factory methods можуть приховувати складність створення object.

    class User {
      constructor(name, role) {
        this.name = name;
        this.role = role;
      }

      static createAdmin(name) {
        return new User(
          name,
          "admin"
        );
      }

      static createGuest(name) {
        return new User(
          name,
          "guest"
        );
      }
    }

Factory methods створюють контрольовані способи створення objects.

---

# Static Method + Validation + Factory

    class User {
      constructor(name) {
        this.name = name;
      }

      static create(name) {
        if (!this.isValidName(name)) {
          throw new Error(
            "Invalid name"
          );
        }

        return new this(name);
      }

      static isValidName(name) {
        return (
          typeof name === "string" &&
          name.trim().length > 0
        );
      }
    }

Використання:

    const user =
      User.create("Valeriy");

Модель:

    create()
      │
      ├── isValidName()
      │
      └── new this()
              │
              ▼
           instance

---

# Static Method Design

Перед створенням static method запитай:

    1. Чи потрібен instance?
    2. Чи потрібен instance state?
    3. Чи operation належить class?
    4. Чи це factory?
    5. Чи це validation?
    6. Чи це conversion?
    7. Чи це utility?
    8. Чи потрібен shared state?
    9. Чи не краще звичайна function?
    10. Чи буде method легко тестувати?

---

# Типові помилки

❌ Викликати static method через instance:

    user.createGuest();

Якщо:

    createGuest()

є static, правильно:

    User.createGuest();

---

❌ Очікувати instance state у static method:

    class User {
      constructor(name) {
        this.name = name;
      }

      static getName() {
        return this.name;
      }
    }

Static `this` — це class, а не конкретний user.

---

❌ Робити всі utility functions static methods.

Іноді проста function є кращим рішенням:

    function add(a, b) {
      return a + b;
    }

не обов'язково перетворювати на:

    MathHelper.add(a, b);

---

❌ Зловживати shared static state.

Наприклад:

    static users = [];

Глобально спільний mutable state може ускладнити architecture.

---

❌ Використовувати static method, коли behavior залежить від instance.

Якщо потрібно:

    this.name
    this.balance
    this.items

часто потрібен instance method.

---

❌ Використовувати static methods замість dependency injection у складних services.

Static API може створювати приховані dependencies і ускладнювати testing.

---

# Порівняння

| Instance Method | Static Method |
|---|---|
| Належить instance | Належить class |
| Викликається через instance | Викликається через class |
| `user.sayHello()` | `User.create()` |
| Працює з instance state | Працює з class-level state |
| `this` → instance | `this` → class |
| Часто змінює object state | Не має конкретного instance |
| Behavior конкретного object | Class-level behavior |

---

# Instance vs Static

    class User {
      constructor(name) {
        this.name = name;
      }

      sayHello() {
        return `Hello, ${this.name}`;
      }

      static createGuest() {
        return new User("Guest");
      }
    }

Instance method:

    const user =
      new User("Valeriy");

    user.sayHello();

Static method:

    const guest =
      User.createGuest();

Модель:

    User
      │
      ├── static createGuest()
      │
      └── new User()
              │
              └── instance
                    │
                    └── sayHello()

---

# Static Methods у JavaScript API

У JavaScript вже існує багато static methods.

Наприклад:

    Array.isArray(value);

    Object.keys(object);

    Object.values(object);

    Object.entries(object);

    Number.isNaN(value);

    Number.isInteger(value);

    String.fromCharCode(...);

Ці methods викликаються через built-in objects/classes, а не через instance.

---

# Важливий приклад

    Array.isArray([]);

Результат:

    true

А:

    const array = [];

    array.isArray();

не працює, тому що:

    isArray()

— static method `Array`.

---

# Static Built-in Methods

Приклади:

    Object.keys(object);

    Object.values(object);

    Object.entries(object);

    Array.isArray(value);

    Number.isInteger(value);

    Number.isNaN(value);

Модель:

    Built-in Class/Object
            │
            ▼
        static method
            │
            ▼
          result

---

# Static Methods і Prototype

Instance methods доступні через prototype chain.

Static methods знаходяться на самому class constructor function.

Спрощено:

    User
      │
      ├── static methods
      │
      └── prototype
             │
             └── instance methods

Наприклад:

    User.create()

— static.

А:

    user.sayHello()

— instance method через prototype.

---

# Важлива модель JavaScript

Class:

    class User {
      static create() {}

      sayHello() {}
    }

Концептуально:

    User
      │
      ├── create()
      │
      └── prototype
            │
            └── sayHello()

Instance:

    const user =
      new User();

    user
      │
      ▼
    User.prototype
      │
      └── sayHello()

---

# Static Method і `super`

У child class:

    class Parent {
      static greet() {
        return "Hello";
      }
    }

    class Child extends Parent {
      static greet() {
        return super.greet() +
          " Child";
      }
    }

Виклик:

    Child.greet();

Результат:

    Hello Child

---

# Static Private Members

Можна створювати private static fields:

    class Config {
      static #environment =
        "development";

      static getEnvironment() {
        return this.#environment;
      }
    }

Виклик:

    Config.getEnvironment();

Результат:

    development

Зовні:

    Config.#environment;

неможливо.

---

# Static Method + Static Private State

    class IDGenerator {
      static #current = 0;

      static next() {
        this.#current++;

        return this.#current;
      }
    }

Використання:

    IDGenerator.next();

    IDGenerator.next();

    IDGenerator.next();

Результат:

    1
    2
    3

Static private state прихований від external code.

---

# Static API як Boundary

    External Code
          │
          ▼
    User.create()
          │
          ▼
    Static Logic
          │
          ▼
    new User()
          │
          ▼
       Instance

Static factory може бути boundary між external input та створенням object.

---

# Static Method + Domain Language

Добре названі static methods можуть зробити код більш зрозумілим.

Наприклад:

    Money.fromUSD(100);

зрозуміліше за:

    new Money(100, "USD");

Або:

    User.createAdmin("John");

зрозуміліше за:

    new User(
      "John",
      "admin"
    );

Static factory може зробити API більш expressive.

---

# Коли Static Method — хороший вибір

✔ Factory methods.

    User.createGuest();

✔ Parsing.

    DateParser.fromString();

✔ Validation.

    Email.isValid();

✔ Conversion.

    Temperature.celsiusToFahrenheit();

✔ Comparison.

    User.sameUser();

✔ Class-level utilities.

    MathHelper.add();

✔ Operations над static state.

    Counter.getCount();

---

# Коли Static Method — поганий вибір

❌ Behavior залежить від instance.

    user.getName();

❌ Behavior змінює конкретний instance.

    user.activate();

❌ Behavior працює з:

    this.name
    this.balance
    this.items

конкретного object.

❌ Потрібні dependencies, які краще передавати через constructor.

❌ Static state створює непотрібний глобальний mutable state.

---

# Співбесіда

Що таке static method?

Для чого використовується `static`?

Чим static method відрізняється від instance method?

Як викликати static method?

Чи можна викликати static method через instance?

Що означає `this` у static method?

Чи має static method доступ до instance state?

Що таке static property?

Чим static state відрізняється від instance state?

Що таке static factory method?

Для чого використовуються factory methods?

Чому validation часто роблять static method?

Що таке utility class?

Коли краще використати звичайну function замість static method?

Чи можуть static methods успадковуватися?

Як викликати parent static method?

Що робить `super` у static method?

Що таке private static method?

Що таке private static field?

Що таке static initialization block?

Де знаходяться static methods у структурі class?

Чим `User.create()` відрізняється від `user.save()`?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке static method.

Keyword `static`.

Class-level behavior.

Виклик:

    Class.method();

Різниця:

    Class.method();

    instance.method();

`this` у static method.

Static vs instance state.

---

🔵 Junior

Static properties.

Static methods + static properties.

Utility methods.

Factory methods.

Validation methods.

Parsing methods.

Conversion methods.

Private static methods.

Private static fields.

Static methods + inheritance.

`super` у static methods.

---

🟠 Middle

Polymorphic static factories.

Static API design.

Class-level encapsulation.

Static state management.

Static methods + dependency injection.

Testing static methods.

Static methods у domain models.

Static methods vs module functions.

---

🔴 Senior

Static API architecture.

Trade-offs shared state.

Static methods vs services.

Static dependencies.

Testability.

Dependency inversion.

Factory abstractions.

Class-level vs instance-level responsibilities.

Designing expressive factory APIs.

Avoiding global mutable state.

---

# Міні-шпаргалка

Static method:

    class User {
      static create() {
        return new User();
      }
    }

Виклик:

    User.create();

---

Instance method:

    class User {
      save() {
        // ...
      }
    }

Виклик:

    const user =
      new User();

    user.save();

---

Основна різниця:

    CLASS
      │
      └── static method
             │
             ▼
        Class.method()


    INSTANCE
      │
      └── instance method
             │
             ▼
        instance.method()

---

`this`:

    static method
        │
        ▼
       this
        │
        ▼
      Class


    instance method
        │
        ▼
       this
        │
        ▼
     Instance

---

Static state:

    class Counter {
      static count = 0;

      static increment() {
        this.count++;
      }
    }

Використання:

    Counter.increment();

    Counter.count;

---

Factory:

    class User {
      static createGuest() {
        return new User(
          "Guest"
        );
      }
    }

Виклик:

    User.createGuest();

---

Validation:

    class Email {
      static isValid(value) {
        return value.includes("@");
      }
    }

Виклик:

    Email.isValid(
      "user@example.com"
    );

---

Private static:

    class Config {
      static #value =
        "development";

      static getValue() {
        return this.#value;
      }
    }

---

Inheritance:

    class Parent {
      static info() {
        return "Parent";
      }
    }

    class Child extends Parent {}

    Child.info();

---

Static + `super`:

    class Parent {
      static info() {
        return "Parent";
      }
    }

    class Child extends Parent {
      static info() {
        return super.info() +
          " Child";
      }
    }

---

# Головне

• `static` створює class-level method.

• Static method належить class, а не instance.

• Static method викликається:

    Class.method();

• Instance method викликається:

    instance.method();

• Static method не потребує конкретного instance.

• Static method не має прямого доступу до instance state через `this`.

• У static method `this` зазвичай посилається на class.

• Static methods можуть працювати зі static properties.

• Static state є спільним на рівні class.

• Static methods часто використовуються для factory methods.

• Static methods часто використовуються для validation.

• Static methods часто використовуються для parsing та conversion.

• Static methods можуть бути utility methods.

• Static methods можуть бути private:

    static #method() {}

• Static fields також можуть бути private:

    static #value;

• Static methods можуть успадковуватися.

• Parent static method можна викликати через:

    super.method();

• `new this()` у static factory дозволяє враховувати child class при inheritance.

• Не потрібно використовувати static method, якщо behavior залежить від конкретного instance.

• Не потрібно перетворювати кожну utility function на static method.

• Shared static mutable state може ускладнювати architecture.

• У великих applications static methods не завжди є найкращим способом роботи з dependencies.

---

# Коротка модель для запам'ятовування

    CLASS
      │
      ├── STATIC
      │     │
      │     ├── static methods
      │     ├── static fields
      │     └── static state
      │
      └── PROTOTYPE
            │
            └── instance methods
                    │
                    ▼
                 instances

Головне питання:

    Чи потрібен конкретний instance?

        │
        ├── YES
        │     │
        │     ▼
        │  Instance Method
        │
        └── NO
              │
              ▼
          Static Method

Основна ідея:

    Static Method
          │
          ▼
    Class-level behavior

    Instance Method
          │
          ▼
    Object-level behavior

Factory:

    Class
      │
      ▼
    static create()
      │
      ▼
    Instance

Validation:

    Class
      │
      ▼
    static isValid()
      │
      ▼
    true / false

Encapsulation:

    External Code
          │
          ▼
    Public Static API
          │
          ▼
    Internal Class Logic

Найважливіша формула:

    Class.method()
          │
          ▼
       STATIC


    instance.method()
          │
          ▼
       INSTANCE