## 03. Class Methods

Class methods — це methods, які визначають поведінку objects, створених через class.

У JavaScript class може містити різні типи methods та властивостей:

- instance methods
- static methods
- static properties
- getters
- setters
- private fields
- private methods

Основна ідея:

    class
      │
      ├── instance methods
      │       ↓
      │    object.method()
      │
      ├── static methods
      │       ↓
      │    Class.method()
      │
      ├── getters
      │       ↓
      │    object.property
      │
      ├── setters
      │       ↓
      │    object.property = value
      │
      └── private fields
              ↓
           object.#property


### Ключові поняття

✔ instance method
✔ static method
✔ static property
✔ getter
✔ setter
✔ private field
✔ private method
✔ `static`
✔ `get`
✔ `set`
✔ `#`
✔ `this`
✔ `super`


### Що потрібно пам'ятати

• Instance methods викликаються через instance.

• Static methods викликаються через сам class.

• `static` створює method або property, яке належить class, а не instance.

• Getter дозволяє отримувати значення як звичайну property.

• Setter дозволяє встановлювати значення як звичайну property.

• Private fields починаються з `#`.

• Private fields доступні тільки всередині class.

• Private methods також починаються з `#`.

• `this` в instance method зазвичай посилається на поточний instance.

• `this` у static method посилається на сам class.

• `super` дозволяє звернутися до parent class.

• Class methods зазвичай використовують для роботи з state або поведінкою objects.


### Instance Methods

Instance method — це method, який належить instances class.

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

Виклик:

    user.greet();

Тобто:

    instance
       │
       └── method()


### Основний синтаксис instance method

    class User {
      method() {
        // code
      }
    }

    const user = new User();

    user.method();


### Instance method з properties

    class User {
      constructor(name) {
        this.name = name;
      }

      greet() {
        return `Hello, ${this.name}!`;
      }
    }

    const user = new User("Anna");

    console.log(user.greet());


### Кілька instance methods

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


### Instance methods — спільна поведінка

Якщо створити багато instances:

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

Обидва instances використовують один definition method через prototype.

Спрощено:

    user1 ──┐
            ├──→ User.prototype → greet()
    user2 ──┘


### Static Methods

Static method — це method, який належить самому class, а не його instances.

Для створення static method використовується `static`.

    class MathHelper {
      static add(a, b) {
        return a + b;
      }
    }

Виклик:

    console.log(MathHelper.add(2, 3));

Не так:

    const helper = new MathHelper();

    helper.add(2, 3);

У цьому випадку `add()` недоступний через instance.


### Instance method vs Static method

Instance method:

    class User {
      greet() {
        console.log("Hello");
      }
    }

    const user = new User();

    user.greet();


Static method:

    class User {
      static createGuest() {
        return new User("Guest");
      }
    }

    const user = User.createGuest();


Mental model:

    Instance method:

    object
      ↓
    object.method()


    Static method:

    Class
      ↓
    Class.method()


### static

`static` означає:

    "належить class, а не instance"

Приклад:

    class User {
      static role = "user";
    }

Доступ:

    console.log(User.role);

Але:

    const user = new User();

    console.log(user.role);

Результат:

    undefined


### Static method для factory

Static methods часто використовуються як альтернативний спосіб створення objects.

    class User {
      constructor(name) {
        this.name = name;
      }

      static createGuest() {
        return new User("Guest");
      }
    }

    const guest = User.createGuest();

    console.log(guest.name);

Тут:

    User.createGuest()

створює:

    new User("Guest")


### Static method для utility logic

Static methods зручно використовувати для функцій, які логічно належать class, але не потребують конкретного instance.

    class MathHelper {
      static add(a, b) {
        return a + b;
      }

      static multiply(a, b) {
        return a * b;
      }

      static square(number) {
        return number * number;
      }
    }

    console.log(MathHelper.add(2, 3));
    console.log(MathHelper.multiply(4, 5));
    console.log(MathHelper.square(6));


### Static method і this

У static method `this` посилається на class.

    class User {
      static role = "admin";

      static getRole() {
        return this.role;
      }
    }

    console.log(User.getRole());

Результат:

    admin


### Instance method і this

В instance method `this` зазвичай посилається на instance.

    class User {
      constructor(name) {
        this.name = name;
      }

      getName() {
        return this.name;
      }
    }

    const user = new User("Anna");

    console.log(user.getName());

Тут:

    this
      ↓
    user


### Static method vs Instance method

    class User {
      constructor(name) {
        this.name = name;
      }

      greet() {
        return `Hello, ${this.name}`;
      }

      static createGuest() {
        return new User("Guest");
      }
    }

Instance:

    const user = new User("Anna");

    user.greet();


Static:

    const guest = User.createGuest();


Можна запам'ятати:

    instance method
        ↓
    працює з конкретним object

    static method
        ↓
    працює на рівні class


### Static Properties

Class може мати static properties.

    class Config {
      static appName = "My App";
      static version = "1.0.0";
    }

Доступ:

    console.log(Config.appName);
    console.log(Config.version);


Instance не має прямого доступу:

    const config = new Config();

    console.log(config.appName);

Результат:

    undefined


### Instance property vs Static property

    class User {
      static count = 0;

      constructor(name) {
        this.name = name;
      }
    }

Тут:

    User.count

належить class.

А:

    user.name

належить конкретному instance.


Модель:

    User
      │
      └── static count

    user
      │
      └── name


### Static counter

Static property часто використовується для підрахунку instances.

    class User {
      static count = 0;

      constructor(name) {
        this.name = name;
        User.count++;
      }
    }

    const user1 = new User("Anna");
    const user2 = new User("John");
    const user3 = new User("Mike");

    console.log(User.count);

Результат:

    3


### Getter

Getter дозволяє створити method, який використовується як property.

Синтаксис:

    get propertyName() {
      return value;
    }

Приклад:

    class User {
      constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
      }

      get fullName() {
        return `${this.firstName} ${this.lastName}`;
      }
    }

    const user = new User("Anna", "Smith");

    console.log(user.fullName);

Зверни увагу:

    user.fullName

а не:

    user.fullName()


### Getter — method як property

Звичайний method:

    user.getFullName()


Getter:

    user.fullName


Модель:

    get fullName()
          ↓
    user.fullName


### Getter може виконувати обчислення

    class Rectangle {
      constructor(width, height) {
        this.width = width;
        this.height = height;
      }

      get area() {
        return this.width * this.height;
      }
    }

    const rectangle = new Rectangle(10, 5);

    console.log(rectangle.area);

Результат:

    50


### Getter для повного імені

    class User {
      constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
      }

      get fullName() {
        return `${this.firstName} ${this.lastName}`;
      }
    }

    const user = new User(
      "John",
      "Smith"
    );

    console.log(user.fullName);


### Setter

Setter дозволяє встановлювати значення через property syntax.

Синтаксис:

    set propertyName(value) {
      // code
    }

Приклад:

    class User {
      constructor(name) {
        this.name = name;
      }

      set username(value) {
        this.name = value;
      }
    }

    const user = new User("Anna");

    user.username = "Maria";

    console.log(user.name);


### Getter + Setter

Getter та setter часто використовуються разом.

    class User {
      constructor(name) {
        this._name = name;
      }

      get name() {
        return this._name;
      }

      set name(value) {
        this._name = value;
      }
    }

    const user = new User("Anna");

    console.log(user.name);

    user.name = "Maria";

    console.log(user.name);


### Getter + validation у setter

Setter можна використовувати для validation.

    class User {
      constructor(name) {
        this.name = name;
      }

      get name() {
        return this._name;
      }

      set name(value) {
        if (value.length < 2) {
          throw new Error("Name is too short");
        }

        this._name = value;
      }
    }

    const user = new User("Anna");

    user.name = "John";

    console.log(user.name);


### Setter з перевіркою number

    class Product {
      constructor(price) {
        this.price = price;
      }

      get price() {
        return this._price;
      }

      set price(value) {
        if (value < 0) {
          throw new Error("Price cannot be negative");
        }

        this._price = value;
      }
    }

    const product = new Product(100);

    product.price = 150;

    console.log(product.price);


### Getter і setter — mental model

    object.property
          │
          ▼
        getter
          │
          ▼
       return value


    object.property = value
          │
          ▼
        setter
          │
          ▼
       validation
          │
          ▼
       save value


### Private Fields

Private field — property, яка доступна тільки всередині class.

Для private fields використовується `#`.

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

    console.log(
      user.checkPassword("12345")
    );

Безпосередній доступ:

    console.log(user.#password);

викличе помилку.


### Private field vs Public field

Public:

    class User {
      constructor(name) {
        this.name = name;
      }
    }

    const user = new User("Anna");

    console.log(user.name);


Private:

    class User {
      #password;

      constructor(password) {
        this.#password = password;
      }
    }

Private property не можна отримати напряму ззовні.


### Private field для internal state

    class BankAccount {
      #balance;

      constructor(balance = 0) {
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

Зовні:

    account.#balance

недоступний.


### Private field і encapsulation

Private fields допомагають приховувати внутрішній state object.

    class BankAccount {
      #balance;

      constructor(balance) {
        this.#balance = balance;
      }

      deposit(amount) {
        if (amount > 0) {
          this.#balance += amount;
        }
      }

      getBalance() {
        return this.#balance;
      }
    }

Зовні доступний public interface:

    account.deposit(500);

    account.getBalance();

А внутрішній state:

    #balance

прихований.


### Private Methods

Private methods також можуть починатися з `#`.

    class User {
      #validateName(name) {
        return name.length >= 2;
      }

      constructor(name) {
        if (!this.#validateName(name)) {
          throw new Error("Invalid name");
        }

        this.name = name;
      }
    }

    const user = new User("Anna");


Private method:

    #validateName()

доступний тільки всередині class.


### Public method + Private method

    class User {
      constructor(name) {
        this.name = name;
      }

      #formatName() {
        return this.name.toUpperCase();
      }

      getDisplayName() {
        return this.#formatName();
      }
    }

    const user = new User("Anna");

    console.log(user.getDisplayName());

Public:

    getDisplayName()

Private:

    #formatName()


### Static Private Fields

Private fields можуть бути static.

    class Counter {
      static #count = 0;

      static increment() {
        Counter.#count++;
      }

      static getCount() {
        return Counter.#count;
      }
    }

    Counter.increment();
    Counter.increment();

    console.log(Counter.getCount());

Тут:

    #count

належить class, але прихований від зовнішнього коду.


### Static Private Method

    class User {
      static #validateName(name) {
        return name.length >= 2;
      }

      static create(name) {
        if (!User.#validateName(name)) {
          throw new Error("Invalid name");
        }

        return new User(name);
      }

      constructor(name) {
        this.name = name;
      }
    }

    const user = User.create("Anna");

Тут:

    #validateName()

є private static method.


### Static block

JavaScript також підтримує static initialization block.

Він виконується один раз під час ініціалізації class.

    class Config {
      static settings;

      static {
        Config.settings = {
          theme: "dark",
          language: "en"
        };
      }
    }

    console.log(Config.settings);

Static block корисний для складнішої ініціалізації static state.


### Methods і inheritance

Class methods можуть успадковуватися.

    class Animal {
      speak() {
        console.log("Animal sound");
      }
    }

    class Dog extends Animal {
      bark() {
        console.log("Woof!");
      }
    }

    const dog = new Dog();

    dog.speak();
    dog.bark();


### Overriding methods

Child class може перевизначити method parent class.

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

    const dog = new Dog();

    dog.speak();

Результат:

    Woof!


### super.method()

Child class може викликати parent method через `super`.

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


### Static methods і inheritance

Static methods також можуть успадковуватися.

    class Animal {
      static info() {
        console.log("This is an animal");
      }
    }

    class Dog extends Animal {}

    Dog.info();

`Dog` отримує static method від `Animal`.


### Static method overriding

    class Animal {
      static info() {
        console.log("Animal");
      }
    }

    class Dog extends Animal {
      static info() {
        console.log("Dog");
      }
    }

    Animal.info();
    Dog.info();

Результат:

    Animal
    Dog


### super у static method

У child static method можна викликати parent static method.

    class Animal {
      static info() {
        console.log("Animal");
      }
    }

    class Dog extends Animal {
      static info() {
        super.info();
        console.log("Dog");
      }
    }

    Dog.info();

Результат:

    Animal
    Dog


### Instance methods + getters + static methods

Один class може використовувати різні типи methods.

    class User {
      static count = 0;

      constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;

        User.count++;
      }

      get fullName() {
        return `${this.firstName} ${this.lastName}`;
      }

      greet() {
        console.log(`Hello, ${this.fullName}!`);
      }

      static getCount() {
        return User.count;
      }
    }

    const user1 = new User("Anna", "Smith");
    const user2 = new User("John", "Brown");

    user1.greet();
    user2.greet();

    console.log(User.getCount());


### Class з private state

    class BankAccount {
      #balance;

      constructor(owner, balance = 0) {
        this.owner = owner;
        this.#balance = balance;
      }

      deposit(amount) {
        if (amount > 0) {
          this.#balance += amount;
        }
      }

      withdraw(amount) {
        if (
          amount > 0 &&
          amount <= this.#balance
        ) {
          this.#balance -= amount;
        }
      }

      get balance() {
        return this.#balance;
      }
    }

    const account = new BankAccount(
      "Anna",
      1000
    );

    account.deposit(500);
    account.withdraw(200);

    console.log(account.balance);


### Class з getter та setter

    class Product {
      constructor(name, price) {
        this.name = name;
        this.price = price;
      }

      get price() {
        return this._price;
      }

      set price(value) {
        if (value < 0) {
          throw new Error(
            "Price cannot be negative"
          );
        }

        this._price = value;
      }
    }

    const product = new Product(
      "Laptop",
      1000
    );

    product.price = 1200;

    console.log(product.price);


### Class з static factory

    class User {
      constructor(name, role) {
        this.name = name;
        this.role = role;
      }

      static createAdmin(name) {
        return new User(name, "admin");
      }

      static createGuest(name) {
        return new User(name, "guest");
      }
    }

    const admin = User.createAdmin("Anna");
    const guest = User.createGuest("John");

    console.log(admin);
    console.log(guest);


### Class з private validation

    class User {
      #validateEmail(email) {
        return email.includes("@");
      }

      constructor(name, email) {
        if (!this.#validateEmail(email)) {
          throw new Error("Invalid email");
        }

        this.name = name;
        this.email = email;
      }
    }

    const user = new User(
      "Anna",
      "anna@example.com"
    );


### Важлива різниця

Instance method:

    class User {
      greet() {}
    }

    const user = new User();

    user.greet();


Static method:

    class User {
      static create() {}
    }

    User.create();


Getter:

    class User {
      get name() {}
    }

    user.name;


Setter:

    class User {
      set name(value) {}
    }

    user.name = "Anna";


Private field:

    class User {
      #password;
    }


Private method:

    class User {
      #validate() {}
    }


### Таблиця

| Тип | Синтаксис | Виклик |
|---|---|---|
| Instance method | `method()` | `object.method()` |
| Static method | `static method()` | `Class.method()` |
| Getter | `get property()` | `object.property` |
| Setter | `set property(value)` | `object.property = value` |
| Public field | `property` | `object.property` |
| Private field | `#property` | тільки всередині class |
| Private method | `#method()` | тільки всередині class |
| Static property | `static property` | `Class.property` |


### Типові помилки

❌ Викликати instance method через class:

    class User {
      greet() {
        console.log("Hello");
      }
    }

    User.greet();

Правильно:

    const user = new User();

    user.greet();


❌ Викликати static method через instance:

    class User {
      static create() {}
    }

    const user = new User();

    user.create();

Правильно:

    User.create();


❌ Викликати getter як function:

    class User {
      get name() {
        return "Anna";
      }
    }

    const user = new User();

    user.name();

Правильно:

    user.name


❌ Забути `static`:

    class MathHelper {
      add(a, b) {
        return a + b;
      }
    }

    MathHelper.add(2, 3);

Якщо method має викликатися через class:

    class MathHelper {
      static add(a, b) {
        return a + b;
      }
    }

    MathHelper.add(2, 3);


❌ Намагатися отримати private field ззовні:

    class User {
      #password;

      constructor(password) {
        this.#password = password;
      }
    }

    const user = new User("12345");

    user.#password;

Так робити не можна.


❌ Плутати `_property` і `#property`.

    this._password

не є справжнім private field.

Це звичайна public property з naming convention.

А:

    this.#password

є справжнім private field.


### `_property` vs `#property`

Старий convention:

    this._password

означає:

    "не використовуй це напряму"

Але JavaScript технічно дозволяє:

    user._password


Private field:

    this.#password

JavaScript не дозволяє:

    user.#password


### Коли використовувати instance methods

Instance methods підходять, коли behavior залежить від конкретного object.

    class User {
      constructor(name) {
        this.name = name;
      }

      greet() {
        return `Hello, ${this.name}`;
      }
    }

Тут method використовує:

    this.name

Тому це instance method.


### Коли використовувати static methods

Static methods підходять, коли operation не залежить від конкретного instance.

Наприклад:

    class MathHelper {
      static add(a, b) {
        return a + b;
      }
    }

Немає необхідності створювати:

    new MathHelper()

щоб виконати:

    MathHelper.add(2, 3)


### Коли використовувати getters

Getter корисний, коли значення:

✔ логічно є property

✔ обчислюється з інших properties

✔ потрібно читати без `()`

Наприклад:

    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    }

Використання:

    user.fullName


### Коли використовувати setters

Setter корисний, коли потрібно контролювати зміну property.

Наприклад:

    set age(value) {
      if (value < 0) {
        throw new Error("Invalid age");
      }

      this._age = value;
    }


### Коли використовувати private fields

Private fields корисні, коли потрібно приховати internal state class.

Наприклад:

    class BankAccount {
      #balance;

      deposit(amount) {
        this.#balance += amount;
      }
    }

Зовнішній код працює через public methods:

    account.deposit(100);

а не безпосередньо змінює:

    account.#balance


### Encapsulation

Encapsulation — це приховування внутрішнього state та надання контрольованого public interface.

Наприклад:

    class BankAccount {
      #balance = 0;

      deposit(amount) {
        if (amount > 0) {
          this.#balance += amount;
        }
      }

      getBalance() {
        return this.#balance;
      }
    }

Public interface:

    account.deposit(500);

    account.getBalance();

Private state:

    #balance


### Public API class

Class може приховувати implementation details і надавати лише потрібні operations.

    class BankAccount {
      #balance = 0;

      deposit(amount) {
        if (amount <= 0) {
          return;
        }

        this.#balance += amount;
      }

      withdraw(amount) {
        if (
          amount > 0 &&
          amount <= this.#balance
        ) {
          this.#balance -= amount;
        }
      }

      getBalance() {
        return this.#balance;
      }
    }

Користувачу class не потрібно знати, як саме зберігається balance.


### Основні терміни

**Instance Method**

Method, який викликається через instance.

**Static Method**

Method, який викликається через class.

**Static Property**

Property, яка належить class.

**Getter**

Спеціальний method для читання property через звичайний property syntax.

**Setter**

Спеціальний method для встановлення property через звичайний property syntax.

**Private Field**

Поле class, доступне тільки всередині class.

**Private Method**

Method, доступний тільки всередині class.

**Encapsulation**

Приховування internal state та контрольований доступ через public interface.

**`static`**

Ключове слово для створення members, які належать class.

**`get`**

Ключове слово для створення getter.

**`set`**

Ключове слово для створення setter.

**`#`**

Синтаксис private fields та private methods.


### Питання зі співбесіди

Що таке instance method?

Що таке static method?

Яка різниця між instance method та static method?

Як викликати static method?

Для чого використовується `static`?

Що таке static property?

Що таке getter?

Як викликається getter?

Що таке setter?

Як викликається setter?

Для чого використовуються getters та setters?

Що таке private field?

Як створити private field?

Чим `#property` відрізняється від `_property`?

Що таке private method?

Що таке encapsulation?

Чи успадковуються static methods?

Чи може child class перевизначити static method?

Що означає `this` у instance method?

Що означає `this` у static method?

Що робить `super.method()`?

Коли краще використовувати static method?

Коли краще використовувати instance method?

Для чого потрібні private fields?


### Шлях

🟢 Core (обов'язково знати)

Що таке instance method.

Що таке static method.

Різниця:

    object.method()

    Class.method()

Що робить `static`.

Що таке getter.

Що таке setter.

Як використовувати `get`.

Як використовувати `set`.

Що таке private field.

Як використовувати `#property`.

Що таке `this`.

Що таке `super.method()`.


🔵 Junior

Уміти створювати:

    instance methods

    static methods

    getters

    setters

    private fields

    private methods

Розуміти:

    instance
      ↓
    instance method

    class
      ↓
    static method

Розуміти encapsulation.

Уміти використовувати private state.

Уміти додавати validation через setter.

Уміти створювати static factory methods.


🟠 Middle

Розуміти prototype-based nature class methods.

Розуміти instance methods через prototype.

Розуміти static methods та їх inheritance.

Розуміти static properties.

Розуміти getters/setters.

Розуміти private fields.

Розуміти private methods.

Розуміти encapsulation.

Розуміти method overriding.

Розуміти `super`.

Розуміти різницю між public API та implementation details.

Уміти проектувати class interface.


🔴 Senior

Розуміти trade-offs використання classes.

Розуміти encapsulation на рівні architecture.

Розуміти composition vs inheritance.

Розуміти public API design.

Розуміти coupling між classes.

Розуміти abstraction boundaries.

Розуміти, коли static methods є кращими за instance methods.

Розуміти, коли getters/setters додають цінність, а коли створюють зайву abstraction.

Розуміти private state та invariants.

Розуміти design patterns, які використовують class methods.

Уміти створювати простий, передбачуваний та maintainable class API.


### Міні-шпаргалка

Instance method:

    class User {
      greet() {
        console.log("Hello");
      }
    }

    const user = new User();

    user.greet();


Static method:

    class User {
      static create() {
        return new User();
      }
    }

    const user = User.create();


Static property:

    class User {
      static count = 0;
    }

    User.count;


Getter:

    class User {
      get name() {
        return this._name;
      }
    }

    user.name;


Setter:

    class User {
      set name(value) {
        this._name = value;
      }
    }

    user.name = "Anna";


Private field:

    class User {
      #password;
    }


Private method:

    class User {
      #validate() {}
    }


Encapsulation:

    class BankAccount {
      #balance = 0;

      deposit(amount) {
        this.#balance += amount;
      }

      getBalance() {
        return this.#balance;
      }
    }


Inheritance:

    class Animal {
      speak() {}
    }

    class Dog extends Animal {
      speak() {
        super.speak();
      }
    }


### Загальна модель class

    class ClassName {

      // static state
      static property = value;

      // private state
      #privateProperty;

      // constructor
      constructor(data) {
        this.property = data;
      }

      // instance method
      method() {
        // ...
      }

      // getter
      get value() {
        return this.property;
      }

      // setter
      set value(newValue) {
        this.property = newValue;
      }

      // static method
      static create() {
        return new ClassName();
      }

      // private method
      #validate() {
        // ...
      }
    }


### Головне:

• Instance method викликається через object:

    object.method()


• Static method викликається через class:

    Class.method()


• `static` означає, що member належить class, а не instance.

• Getter дозволяє читати результат method як property:

    object.property


• Setter дозволяє встановлювати значення через property syntax:

    object.property = value


• Private field створюється через `#`:

    #property


• Private method створюється через `#`:

    #method()


• `_property` — це лише convention, а не справжня приватність.

• `#property` — справжній private field JavaScript.

• `this` в instance method зазвичай означає поточний instance.

• `this` у static method посилається на class.

• `super.method()` викликає method parent class.

• Static methods можуть успадковуватися.

• Child class може перевизначати instance та static methods.

• Getters та setters дозволяють контролювати доступ до properties.

• Private fields допомагають реалізувати encapsulation.

• Encapsulation:

    private state
         ↓
    public methods
         ↓
    controlled access


• Основна модель:

    Class
      │
      ├── static methods
      │       ↓
      │    Class.method()
      │
      └── instances
              │
              ├── properties
              ├── instance methods
              ├── getters
              └── setters


• Найважливіша різниця:

    object.method()
         ↓
    instance method


    Class.method()
         ↓
    static method


• Для теми `12-classes` потрібно послідовно розуміти:

    01-creating-classes
          ↓
    class / constructor / new / this
          ↓
    02-inheritance
          ↓
    extends / super / overriding
          ↓
    03-class-methods
          ↓
    instance / static / get / set / private
          ↓
    13-oop


• Після завершення `12-classes` головна mental model:

    CLASS
      │
      ├── constructor
      │
      ├── instance state
      │     ├── public properties
      │     └── private fields
      │
      ├── instance behavior
      │     ├── methods
      │     ├── getters
      │     └── setters
      │
      └── class behavior
            ├── static properties
            └── static methods

