# 06. Getters and Setters

Getters і setters — це спеціальні methods class, які дозволяють працювати з properties object через звичайний синтаксис доступу до властивостей.

Замість прямого доступу:

    user.name

можна контролювати читання через getter:

    user.name

А замість прямого присвоєння:

    user.name = "John";

можна контролювати запис через setter:

    user.name = "John";

Зовні API виглядає як звичайна property:

    user.name

але всередині може виконуватися method.

---

# Ключові поняття

✔ getter  
✔ setter  
✔ `get`  
✔ `set`  
✔ property access  
✔ computed property  
✔ read-only property  
✔ write-only property  
✔ validation  
✔ encapsulation  
✔ private field  
✔ private getter  
✔ private setter  
✔ getter + setter  
✔ getter без setter  
✔ setter без getter  
✔ derived property  
✔ computed property  
✔ data normalization  
✔ controlled access  
✔ public API  
✔ internal state  

---

# Що потрібно пам'ятати

• Getter читає значення property.

• Setter встановлює значення property.

• Getter оголошується через:

    get propertyName() {}

• Setter оголошується через:

    set propertyName(value) {}

• Getter викликається без `()`:

    user.name

• Setter також використовується без `()`:

    user.name = "John";

• Getter може повертати computed value.

• Setter може виконувати validation.

• Getter і setter можуть працювати з private fields.

• Getter дозволяє створювати read-only properties.

• Setter дозволяє контролювати запис значення.

• Getter/setter є частиною public API object.

• Getter і setter не обов'язково повинні мати однакову внутрішню реалізацію.

---

# Що таке Getter

Getter — це special method, який виконується під час читання property.

Синтаксис:

    class User {
      get name() {
        return this._name;
      }
    }

Використання:

    const user =
      new User();

    user.name;

Зверни увагу:

    user.name

а не:

    user.name();

Getter виглядає як property, хоча всередині є method.

---

# Простий Getter

    class User {
      constructor(name) {
        this._name = name;
      }

      get name() {
        return this._name;
      }
    }

Використання:

    const user =
      new User("Valeriy");

    console.log(user.name);

Результат:

    Valeriy

---

# Getter викликається автоматично

Коли пишемо:

    user.name

JavaScript автоматично виконує:

    get name() {
      return this._name;
    }

Тобто концептуально:

    user.name
       │
       ▼
    getter
       │
       ▼
    this._name

---

# Getter не викликається як Function

Правильно:

    user.name

Неправильно:

    user.name();

Getter — це property access, а не звичайний method call.

---

# Getter vs Method

Звичайний method:

    class User {
      getName() {
        return this._name;
      }
    }

Виклик:

    user.getName();

Getter:

    class User {
      get name() {
        return this._name;
      }
    }

Виклик:

    user.name;

Різниця:

    method
      │
      ▼
    user.getName()


    getter
      │
      ▼
    user.name

---

# Коли Getter зручніший

Getter добре підходить, коли значення концептуально є property object.

Наприклад:

    user.fullName

замість:

    user.getFullName()

Або:

    product.price

замість:

    product.getPrice()

Або:

    rectangle.area

замість:

    rectangle.calculateArea()

---

# Getter для Computed Property

Getter може не зберігати значення, а обчислювати його.

    class Rectangle {
      constructor(width, height) {
        this.width = width;
        this.height = height;
      }

      get area() {
        return this.width * this.height;
      }
    }

Використання:

    const rectangle =
      new Rectangle(10, 5);

    console.log(rectangle.area);

Результат:

    50

`area` не є окремим stored field.

Воно обчислюється getter.

---

# Derived Property

Getter особливо корисний для derived properties.

Наприклад:

    class User {
      constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
      }

      get fullName() {
        return `${this.firstName} ${this.lastName}`;
      }
    }

Використання:

    user.fullName;

`fullName` залежить від:

    firstName
    lastName

і є derived value.

---

# Getter не обов'язково зберігає значення

Наприклад:

    class Circle {
      constructor(radius) {
        this.radius = radius;
      }

      get area() {
        return Math.PI *
          this.radius *
          this.radius;
      }
    }

Тут:

    area

не зберігається.

Вона обчислюється кожного разу під час читання:

    circle.area

---

# Getter + Private Field

Один із найважливіших практичних patterns:

    private field
          │
          ▼
        getter
          │
          ▼
      public API

Наприклад:

    class User {
      #name;

      constructor(name) {
        this.#name = name;
      }

      get name() {
        return this.#name;
      }
    }

Використання:

    const user =
      new User("Valeriy");

    user.name;

Private field:

    #name

не доступний напряму ззовні.

---

# Private Field + Getter

    class BankAccount {
      #balance = 0;

      get balance() {
        return this.#balance;
      }
    }

Використання:

    const account =
      new BankAccount();

    console.log(
      account.balance
    );

Зовні можна прочитати:

    account.balance

але не можна:

    account.#balance

---

# Read-Only Property

Getter без setter створює property, яку з точки зору API можна читати, але не встановлювати через assignment.

    class User {
      #name;

      constructor(name) {
        this.#name = name;
      }

      get name() {
        return this.#name;
      }
    }

Можна:

    user.name;

Але немає:

    set name(value) {}

Тому API не має контрольованого способу:

    user.name = "John";

---

# Read-Only Не Означає Immutable

Це важлива різниця.

Getter без setter означає, що через цей public API немає setter для зміни property.

Але object може мати інші methods, які змінюють internal state.

Наприклад:

    class User {
      #name;

      constructor(name) {
        this.#name = name;
      }

      get name() {
        return this.#name;
      }

      rename(name) {
        this.#name = name;
      }
    }

Тепер:

    user.name = "Bob";

не є правильним способом зміни.

А:

    user.rename("Bob");

є контрольованою операцією.

---

# Що таке Setter

Setter — це special method, який виконується під час присвоєння значення property.

Синтаксис:

    class User {
      set name(value) {
        this._name = value;
      }
    }

Використання:

    user.name = "Valeriy";

JavaScript автоматично викликає setter.

---

# Простий Setter

    class User {
      set name(value) {
        this._name = value;
      }
    }

Використання:

    const user =
      new User();

    user.name = "Valeriy";

Setter отримує:

    "Valeriy"

як аргумент:

    value

---

# Setter не викликається як Function

Правильно:

    user.name = "John";

Неправильно:

    user.name("John");

Setter виконується через assignment.

---

# Setter + Getter

Getter і setter часто використовуються разом.

    class User {
      #name;

      get name() {
        return this.#name;
      }

      set name(value) {
        this.#name = value;
      }
    }

Використання:

    const user =
      new User();

    user.name = "Valeriy";

    console.log(user.name);

Результат:

    Valeriy

Модель:

    user.name = "Valeriy"
          │
          ▼
        setter
          │
          ▼
       #name


    user.name
          │
          ▼
        getter
          │
          ▼
       #name

---

# Getter + Setter + Constructor

Часто constructor використовує setter для initial validation.

    class User {
      #name;

      constructor(name) {
        this.name = name;
      }

      get name() {
        return this.#name;
      }

      set name(value) {
        this.#name = value;
      }
    }

Тут:

    this.name = name;

викликає setter.

---

# Setter для Validation

Це один із найкорисніших випадків використання setter.

    class User {
      #age;

      get age() {
        return this.#age;
      }

      set age(value) {
        if (value < 0) {
          throw new Error(
            "Age cannot be negative"
          );
        }

        this.#age = value;
      }
    }

Використання:

    const user =
      new User();

    user.age = 30;

Але:

    user.age = -5;

викличе error.

---

# Setter як Boundary

Setter може бути boundary між external input та internal state.

    External Input
          │
          ▼
    user.age = value
          │
          ▼
        setter
          │
          ├── validation
          ├── normalization
          └── conversion
          │
          ▼
      internal state

Це один із способів реалізації encapsulation.

---

# Setter для Normalization

Setter може нормалізувати значення.

    class User {
      #name;

      get name() {
        return this.#name;
      }

      set name(value) {
        this.#name =
          value.trim();
      }
    }

Використання:

    user.name =
      "  Valeriy  ";

Тепер:

    user.name;

дасть:

    "Valeriy"

---

# Setter + Type Checking

    class User {
      #age;

      get age() {
        return this.#age;
      }

      set age(value) {
        if (
          typeof value !== "number"
        ) {
          throw new TypeError(
            "Age must be a number"
          );
        }

        this.#age = value;
      }
    }

Тепер:

    user.age = 30;

працює.

А:

    user.age = "30";

викличе error.

---

# Setter + Range Validation

    class Product {
      #price;

      get price() {
        return this.#price;
      }

      set price(value) {
        if (
          value < 0
        ) {
          throw new Error(
            "Price cannot be negative"
          );
        }

        this.#price = value;
      }
    }

Можна також перевіряти upper bound:

    if (
      value < 0 ||
      value > 1000000
    ) {
      throw new Error(
        "Invalid price"
      );
    }

---

# Setter + Conversion

Setter може перетворювати дані.

    class Temperature {
      #celsius;

      get celsius() {
        return this.#celsius;
      }

      set celsius(value) {
        this.#celsius =
          Number(value);
      }
    }

Використання:

    temperature.celsius =
      "25";

Внутрішньо:

    #celsius

буде number:

    25

---

# Getter + Formatting

Getter може повертати formatted value.

    class Product {
      constructor(price) {
        this.price = price;
      }

      get formattedPrice() {
        return `$${this.price.toFixed(2)}`;
      }
    }

Використання:

    product.formattedPrice;

Наприклад:

    "$100.00"

---

# Getter + Multiple Fields

    class User {
      constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
      }

      get fullName() {
        return `${this.firstName} ${this.lastName}`;
      }
    }

Зміна:

    user.firstName =
      "John";

автоматично впливає на:

    user.fullName

Тому що getter обчислює значення при кожному доступі.

---

# Getter + Boolean Property

Getter добре підходить для boolean properties.

    class User {
      constructor(age) {
        this.age = age;
      }

      get isAdult() {
        return this.age >= 18;
      }
    }

Використання:

    if (user.isAdult) {
      console.log("Adult");
    }

Замість:

    user.isAdult();

Getter робить API більш природним:

    user.isAdult

---

# Getter + Derived State

    class Cart {
      constructor(items) {
        this.items = items;
      }

      get total() {
        return this.items.reduce(
          (sum, item) =>
            sum + item.price,
          0
        );
      }
    }

Використання:

    cart.total;

`total` є derived property.

Вона залежить від:

    items

---

# Getter + Collection

    class Cart {
      constructor(items = []) {
        this.items = items;
      }

      get itemCount() {
        return this.items.length;
      }
    }

Використання:

    cart.itemCount;

Getter перетворює calculation на property-like API.

---

# Getter + Method

Не кожну operation потрібно робити getter.

Getter добре підходить для простого property-like access.

Наприклад:

    user.fullName

Добре.

А складна operation:

    user.calculateStatistics()

може бути звичайним method.

Просте правило:

    property-like value
          │
          ▼
        getter

    action / operation
          │
          ▼
        method

---

# Getter не повинен мати Side Effects

Не рекомендується робити getter, який змінює state.

Погано:

    class Counter {
      #count = 0;

      get next() {
        this.#count++;
        return this.#count;
      }
    }

Тоді:

    counter.next;

не просто читає значення — він змінює state.

Краще:

    next() {
      this.#count++;
      return this.#count;
    }

Getter бажано сприймати як read operation.

---

# Setter може мати Side Effects

Setter може виконувати validation або normalization.

Але також не варто робити його надто складним.

Наприклад, допустимо:

    set email(value) {
      if (!value.includes("@")) {
        throw new Error(
          "Invalid email"
        );
      }

      this.#email = value;
    }

Але якщо setter запускає складний workflow, краще використати method.

---

# Setter vs Method

Setter:

    user.name = "John";

Method:

    user.rename("John");

Setter добре підходить для:

    validation
    normalization
    conversion
    simple state update

Method краще підходить для:

    complex operation
    business logic
    side effects
    asynchronous operation
    multi-step workflow

---

# Getter + Private State

Хороша модель encapsulation:

    class BankAccount {
      #balance = 0;

      get balance() {
        return this.#balance;
      }

      deposit(amount) {
        this.#balance += amount;
      }
    }

Зовні:

    account.balance

можна читати.

Але змінити balance напряму:

    account.balance = 1000;

не можна через setter, якщо його немає.

Зміна виконується через domain method:

    account.deposit(1000);

---

# Чому це краще за Public Field

Прямий public field:

    class User {
      name;
    }

Зовнішній код може робити:

    user.name = "";

    user.name = 123;

    user.name = null;

Немає центрального контролю.

Getter + setter:

    class User {
      #name;

      get name() {
        return this.#name;
      }

      set name(value) {
        if (
          typeof value !== "string"
        ) {
          throw new TypeError(
            "Name must be a string"
          );
        }

        this.#name =
          value.trim();
      }
    }

Тепер assignment проходить через controlled API.

---

# Encapsulation

Getter/setter часто використовуються разом з private fields.

Модель:

    External Code
          │
          ▼
    public property
          │
      ┌───┴───┐
      │       │
      ▼       ▼
    getter  setter
      │       │
      └───┬───┘
          ▼
     private field
          │
          ▼
        state

Наприклад:

    user.name

→ getter.

    user.name = "John";

→ setter.

Внутрішньо:

    #name

---

# Getter/Setter API

Зовнішній код не повинен знати, де і як зберігається значення.

Наприклад:

    class User {
      #name;

      get name() {
        return this.#name;
      }

      set name(value) {
        this.#name =
          value.trim();
      }
    }

External API:

    user.name

Internal implementation:

    #name

Це дозволяє змінювати internal implementation, не змінюючи API.

---

# Getter + Setter без `_property`

Старий common pattern:

    class User {
      get name() {
        return this._name;
      }

      set name(value) {
        this._name = value;
      }
    }

Але `_name` — це лише convention.

Underscore:

    _name

не робить property private.

Сучасний варіант:

    #name

створює справжнє private field.

---

# `_name` vs `#name`

Старий convention:

    this._name

означає:

    "це internal property, не чіпай напряму"

Але JavaScript все одно дозволяє:

    user._name;

Private field:

    this.#name

реально прихований від external code.

Не можна:

    user.#name;

---

# Getter + Setter з Private Field

Рекомендована сучасна модель:

    class User {
      #name;

      constructor(name) {
        this.name = name;
      }

      get name() {
        return this.#name;
      }

      set name(value) {
        if (
          typeof value !== "string"
        ) {
          throw new TypeError(
            "Name must be a string"
          );
        }

        this.#name =
          value.trim();
      }
    }

Це поєднує:

    private state
          +
    controlled access
          +
    validation

---

# Getter без Setter

    class User {
      #id;

      constructor(id) {
        this.#id = id;
      }

      get id() {
        return this.#id;
      }
    }

Це хороший pattern для:

    ID
    createdAt
    computed values
    immutable-like values
    read-only state

---

# Setter без Getter

Технічно можна мати setter без getter.

    class User {
      #name;

      set name(value) {
        this.#name =
          value.trim();
      }
    }

Можна:

    user.name = "John";

Але:

    user.name;

не поверне stored value через getter.

Такий API зустрічається рідше.

---

# Getter і Setter можуть мати різну назву Internal Field

    class User {
      #firstName;

      get name() {
        return this.#firstName;
      }

      set name(value) {
        this.#firstName =
          value.trim();
      }
    }

Public API:

    user.name

Internal state:

    #firstName

Getter/setter абстрагують internal representation.

---

# Getter може змінити Implementation

Спочатку:

    class User {
      #name;

      get name() {
        return this.#name;
      }
    }

Пізніше:

    class User {
      #firstName;
      #lastName;

      get name() {
        return `${this.#firstName} ${this.#lastName}`;
      }
    }

Public API може залишитися:

    user.name

Хоча internal implementation змінився.

Це одна з переваг encapsulation.

---

# Computed Property

Getter може представляти значення, яке не зберігається.

    class Rectangle {
      constructor(width, height) {
        this.width = width;
        this.height = height;
      }

      get area() {
        return this.width * this.height;
      }

      get perimeter() {
        return (
          2 *
          (this.width + this.height)
        );
      }
    }

Використання:

    rectangle.area;

    rectangle.perimeter;

---

# Getter + Date

    class User {
      constructor(birthYear) {
        this.birthYear = birthYear;
      }

      get age() {
        return (
          new Date().getFullYear() -
          this.birthYear
        );
      }
    }

Використання:

    user.age;

`age` може змінюватися з часом, тому його не обов'язково зберігати.

---

# Getter + Status

    class Order {
      constructor(total) {
        this.total = total;
        this.paid = false;
      }

      get status() {
        return this.paid
          ? "paid"
          : "pending";
      }
    }

Використання:

    order.status;

Getter створює derived property.

---

# Setter + Business Rule

Setter може забезпечити просте business rule.

    class BankAccount {
      #balance = 0;

      get balance() {
        return this.#balance;
      }

      set balance(value) {
        if (value < 0) {
          throw new Error(
            "Balance cannot be negative"
          );
        }

        this.#balance = value;
      }
    }

Але в реальному domain model інколи краще:

    deposit(amount)

    withdraw(amount)

бо це express domain actions.

---

# Setter vs Domain Method

Порівняй:

    account.balance = 1000;

та:

    account.deposit(1000);

Другий варіант може краще описувати domain behavior.

Setter:

    "set this value"

Method:

    "perform this operation"

Тому не потрібно використовувати setter для кожної зміни state.

---

# Getter/Setter Naming

Зазвичай public property називається як звичайна property:

    name
    age
    email
    price
    balance
    status
    fullName
    total
    area

Не потрібно:

    getName

для getter.

Getter:

    get name() {}

Виклик:

    user.name

---

# Getter для Boolean

Рекомендується використовувати назви:

    isActive
    isValid
    isAdult
    hasItems
    canEdit

Наприклад:

    class User {
      constructor(age) {
        this.age = age;
      }

      get isAdult() {
        return this.age >= 18;
      }
    }

Виклик:

    user.isAdult;

---

# Getter + Optional Logic

Getter може повертати fallback.

    class User {
      constructor(name) {
        this.name = name;
      }

      get displayName() {
        return this.name ||
          "Anonymous";
      }
    }

Використання:

    user.displayName;

---

# Setter + Default Value

Setter може нормалізувати empty value.

    class User {
      #name;

      get name() {
        return this.#name;
      }

      set name(value) {
        this.#name =
          value.trim() ||
          "Anonymous";
      }
    }

---

# Getter + Array

    class Cart {
      constructor(items = []) {
        this.items = items;
      }

      get total() {
        return this.items.reduce(
          (sum, item) =>
            sum + item.price,
          0
        );
      }

      get isEmpty() {
        return this.items.length === 0;
      }
    }

Використання:

    cart.total;

    cart.isEmpty;

---

# Getter + Object

    class Product {
      constructor(price, quantity) {
        this.price = price;
        this.quantity = quantity;
      }

      get total() {
        return (
          this.price *
          this.quantity
        );
      }
    }

Використання:

    product.total;

---

# Getter + Cache

Іноді computed value можна кешувати, якщо calculation expensive.

Але це вже складніший pattern.

Наприклад:

    class Data {
      #value;
      #cachedResult;

      get result() {
        if (
          this.#cachedResult === undefined
        ) {
          this.#cachedResult =
            this.calculate();
        }

        return this.#cachedResult;
      }

      calculate() {
        // expensive calculation
      }
    }

Тут потрібно дуже уважно керувати invalidation cache.

Для простих calculations кешування не потрібне.

---

# Getter Performance

Getter виглядає як property:

    object.value

але це не означає, що значення безкоштовне.

Наприклад:

    get total() {
      return this.items.reduce(
        ...
      );
    }

Кожен доступ:

    cart.total

може запускати calculation.

Тому getter бажано використовувати для:

    simple
    predictable
    reasonably cheap

operations.

---

# Getter + Expensive Operation

Не дуже добре:

    class Report {
      get statistics() {
        // very expensive calculation
      }
    }

Якщо calculation:

    expensive
    asynchronous
    side-effectful

краще розглянути звичайний method або окремий service.

Наприклад:

    report.calculateStatistics();

---

# Getter + Async

Getter не може бути `async` у звичайному syntax.

Не можна:

    class User {
      async get data() {
        // ...
      }
    }

Для asynchronous operation використовується method:

    class User {
      async getData() {
        // ...
      }
    }

Виклик:

    await user.getData();

Це важлива межа між getter і method.

---

# Getter + Promise

Якщо operation повертає Promise, краще звичайний method.

Не:

    user.data

якщо це означає asynchronous fetch.

Краще:

    await user.getData();

Getter краще залишати для synchronous property-like access.

---

# Getter + Setter з однаковим ім'ям

Це стандартний pattern.

    class User {
      #name;

      get name() {
        return this.#name;
      }

      set name(value) {
        this.#name =
          value.trim();
      }
    }

Public API:

    user.name

для читання.

І:

    user.name = "John";

для запису.

---

# Getter + Setter Lifecycle

Assignment:

    user.name = "John";

проходить:

    assignment
        │
        ▼
      setter
        │
        ▼
    validation
        │
        ▼
    normalization
        │
        ▼
    private state

Reading:

    user.name
        │
        ▼
      getter
        │
        ▼
    private state
        │
        ▼
      value

---

# Encapsulation Pattern

Один із найкорисніших patterns:

    class User {
      #email;

      constructor(email) {
        this.email = email;
      }

      get email() {
        return this.#email;
      }

      set email(value) {
        if (!value.includes("@")) {
          throw new Error(
            "Invalid email"
          );
        }

        this.#email =
          value.toLowerCase();
      }
    }

Тут setter відповідає за:

    validation
    normalization

Getter відповідає за:

    controlled reading

Private field відповідає за:

    internal state

---

# Public API vs Internal State

Модель:

    ┌─────────────────────────────┐
    │         User Class          │
    │                             │
    │  Public API                 │
    │    user.name                │
    │         │                   │
    │      ┌──┴──┐                │
    │      ▼     ▼                │
    │   getter  setter            │
    │      │     │                │
    │      └──┬──┘                │
    │         ▼                   │
    │      #name                  │
    │                             │
    └─────────────────────────────┘

External code працює з:

    user.name

але internal state:

    #name

залишається encapsulated.

---

# Getters and Setters у Inheritance

Getters і setters можуть успадковуватися.

    class User {
      #name;

      get name() {
        return this.#name;
      }

      set name(value) {
        this.#name =
          value.trim();
      }
    }

    class Admin extends User {}

Admin успадковує:

    name

getter і setter.

---

# Override Getter

Child class може перевизначити getter.

    class User {
      get role() {
        return "user";
      }
    }

    class Admin extends User {
      get role() {
        return "admin";
      }
    }

Використання:

    const admin =
      new Admin();

    admin.role;

Результат:

    admin

---

# Override Setter

Child class може перевизначити setter.

    class User {
      #name;

      set name(value) {
        this.#name =
          value.trim();
      }
    }

    class Admin extends User {
      set name(value) {
        super.name =
          value.trim();
      }
    }

`super` дозволяє звернутися до implementation parent class.

---

# Getter + `super`

    class User {
      get role() {
        return "user";
      }
    }

    class Admin extends User {
      get role() {
        return `${super.role} admin`;
      }
    }

Виклик:

    admin.role;

Результат:

    user admin

---

# Getter + Setter + `super`

    class User {
      #name;

      get name() {
        return this.#name;
      }

      set name(value) {
        this.#name =
          value.trim();
      }
    }

Child:

    class Admin extends User {
      get name() {
        return `Admin: ${super.name}`;
      }
    }

Тут getter child використовує getter parent.

---

# Обережно з Private Fields та Inheritance

Private field:

    #name

належить class, який його оголосив.

Child class не може напряму зробити:

    this.#name

якщо `#name` оголошений у parent class.

Наприклад:

    class User {
      #name;
    }

    class Admin extends User {
      changeName() {
        this.#name = "John";
      }
    }

Це не працює.

Child повинен використовувати public/protected-like API, наприклад:

    this.name = "John";

якщо setter доступний.

---

# Getter + Setter як Abstraction

Getter/setter дозволяють змінити internal implementation без зміни external API.

Спочатку:

    class User {
      #name;

      get name() {
        return this.#name;
      }

      set name(value) {
        this.#name = value;
      }
    }

Пізніше можна додати:

    validation

    normalization

    logging

    conversion

але external code все одно використовує:

    user.name

---

# Getter + Setter + Logging

Іноді setter може логувати зміни.

    class User {
      #name;

      get name() {
        return this.#name;
      }

      set name(value) {
        console.log(
          "Name changed"
        );

        this.#name =
          value.trim();
      }
    }

Але logging у setter варто використовувати обережно, щоб property assignment не створював несподіваних side effects.

---

# Getter/Setter як Boundary

Це корисна mental model:

    External Data
          │
          ▼
       setter
          │
          ▼
    Validation
          │
          ▼
    Normalization
          │
          ▼
    Internal State
          │
          ▼
       getter
          │
          ▼
    External Data

Getter/setter можуть бути boundary між:

    public API

і:

    internal implementation

---

# Getter/Setter vs Public Field

Public field:

    class User {
      name;
    }

Прямий доступ:

    user.name = "John";

Getter/setter:

    class User {
      #name;

      get name() {
        return this.#name;
      }

      set name(value) {
        this.#name =
          value.trim();
      }
    }

API зовні майже такий самий:

    user.name

але всередині з'являється контроль.

---

# Getter/Setter vs Method API

Property API:

    user.name

Method API:

    user.getName();

Property API може бути зручнішим для simple values.

Method API може бути кращим для:

    actions
    expensive calculations
    complex operations
    async operations

---

# Правило для Getter

Якщо ти можеш природно сказати:

    "Яка властивість цього object?"

можна розглянути getter.

Наприклад:

    What is the user's full name?

    user.fullName

    What is the rectangle's area?

    rectangle.area

    Is the user active?

    user.isActive

---

# Правило для Setter

Якщо ти можеш природно сказати:

    "Встановити значення цієї property"

можна розглянути setter.

Наприклад:

    user.name = "John";

    product.price = 100;

    account.email = "user@example.com";

Але якщо дія є domain operation:

    account.withdraw(100);

краще method.

---

# Типові помилки

❌ Викликати getter як function:

    user.name();

Правильно:

    user.name;

---

❌ Викликати setter як function:

    user.name("John");

Правильно:

    user.name = "John";

---

❌ Зберігати getter у property з тим самим ім'ям:

    class User {
      get name() {
        return this.name;
      }
    }

Це створить нескінченну recursion.

Потрібне internal storage:

    #name

або:

    _name

---

# Infinite Recursion

Погано:

    class User {
      get name() {
        return this.name;
      }
    }

Чому?

    user.name
       │
       ▼
    getter
       │
       ▼
    this.name
       │
       ▼
    getter
       │
       ▼
    this.name
       │
       ▼
      ...

Правильно:

    class User {
      #name;

      get name() {
        return this.#name;
      }
    }

---

# Setter Infinite Recursion

Погано:

    class User {
      set name(value) {
        this.name = value;
      }
    }

Assignment:

    user.name = "John";

викликає setter, який знову робить:

    this.name = value;

і знову викликає setter.

Правильно:

    class User {
      #name;

      set name(value) {
        this.#name = value;
      }
    }

---

# ❌ Getter з важким Side Effect

Погано:

    class User {
      get data() {
        fetch("/api/user");
      }
    }

Getter не повинен приховувати:

    network request

Краще:

    async getData() {
      return fetch("/api/user");
    }

---

# ❌ Надто складний Setter

Якщо setter робить:

    validation
    database request
    logging
    network request
    event dispatch
    multiple mutations

API:

    user.name = "John";

стає misleading.

Краще використати explicit method:

    user.rename("John");

---

# ❌ Setter для всіх Domain Operations

Не потрібно:

    account.balance = 100;

якщо domain operation насправді:

    account.deposit(100);

або:

    account.withdraw(100);

Setter — це не заміна domain methods.

---

# ❌ Getter для Action

Погано:

    get save() {
      // saves data
    }

Читання:

    user.save;

виглядає як read operation.

Але фактично це action.

Краще:

    user.save();

---

# ❌ Getter для Async Operation

Погано концептуально:

    user.profile;

якщо для отримання profile потрібно зробити network request.

Краще:

    await user.getProfile();

---

# Getters/Setters і API Design

Getter:

    object.value

означає:

    "дай мені value"

Setter:

    object.value = newValue

означає:

    "встанови value"

Method:

    object.doSomething()

означає:

    "виконай action"

Це допомагає створювати зрозумілий object API.

---

# Practical Example: User

    class User {
      #name;
      #email;

      constructor(name, email) {
        this.name = name;
        this.email = email;
      }

      get name() {
        return this.#name;
      }

      set name(value) {
        if (
          typeof value !== "string" ||
          value.trim() === ""
        ) {
          throw new TypeError(
            "Invalid name"
          );
        }

        this.#name =
          value.trim();
      }

      get email() {
        return this.#email;
      }

      set email(value) {
        if (
          !value.includes("@")
        ) {
          throw new Error(
            "Invalid email"
          );
        }

        this.#email =
          value.toLowerCase();
      }
    }

Використання:

    const user = new User(
      "  Valeriy  ",
      "USER@EXAMPLE.COM"
    );

    console.log(user.name);

    console.log(user.email);

Результат:

    Valeriy
    user@example.com

---

# Practical Example: Product

    class Product {
      #price;

      constructor(name, price) {
        this.name = name;
        this.price = price;
      }

      get price() {
        return this.#price;
      }

      set price(value) {
        if (
          typeof value !== "number" ||
          value < 0
        ) {
          throw new Error(
            "Invalid price"
          );
        }

        this.#price = value;
      }

      get formattedPrice() {
        return `$${this.#price.toFixed(2)}`;
      }
    }

Використання:

    const product =
      new Product(
        "Laptop",
        1500
      );

    console.log(
      product.price
    );

    console.log(
      product.formattedPrice
    );

---

# Practical Example: Bank Account

    class BankAccount {
      #balance = 0;

      get balance() {
        return this.#balance;
      }

      deposit(amount) {
        if (amount <= 0) {
          throw new Error(
            "Invalid deposit"
          );
        }

        this.#balance += amount;
      }

      withdraw(amount) {
        if (
          amount <= 0 ||
          amount > this.#balance
        ) {
          throw new Error(
            "Invalid withdrawal"
          );
        }

        this.#balance -= amount;
      }
    }

Використання:

    const account =
      new BankAccount();

    account.deposit(1000);

    console.log(
      account.balance
    );

    account.withdraw(300);

    console.log(
      account.balance
    );

Тут balance має getter, але немає setter.

Це дозволяє контролювати зміну balance через:

    deposit()

    withdraw()

---

# Practical Example: Rectangle

    class Rectangle {
      constructor(width, height) {
        this.width = width;
        this.height = height;
      }

      get area() {
        return (
          this.width *
          this.height
        );
      }

      get perimeter() {
        return (
          2 *
          (this.width +
            this.height)
        );
      }

      get isSquare() {
        return (
          this.width ===
          this.height
        );
      }
    }

Використання:

    const rectangle =
      new Rectangle(10, 5);

    rectangle.area;

    rectangle.perimeter;

    rectangle.isSquare;

---

# Practical Example: Shopping Cart

    class Cart {
      constructor(items = []) {
        this.items = items;
      }

      get itemCount() {
        return this.items.length;
      }

      get total() {
        return this.items.reduce(
          (sum, item) =>
            sum + item.price,
          0
        );
      }

      get isEmpty() {
        return this.items.length === 0;
      }
    }

Використання:

    const cart = new Cart([
      { name: "Book", price: 20 },
      { name: "Pen", price: 5 }
    ]);

    console.log(
      cart.itemCount
    );

    console.log(
      cart.total
    );

    console.log(
      cart.isEmpty
    );

---

# Practical Example: Temperature

    class Temperature {
      #celsius;

      constructor(celsius) {
        this.celsius = celsius;
      }

      get celsius() {
        return this.#celsius;
      }

      set celsius(value) {
        if (
          typeof value !== "number"
        ) {
          throw new TypeError(
            "Temperature must be a number"
          );
        }

        this.#celsius = value;
      }

      get fahrenheit() {
        return (
          this.#celsius *
          9 / 5 +
          32
        );
      }
    }

Використання:

    const temperature =
      new Temperature(20);

    temperature.celsius;

    temperature.fahrenheit;

---

# Getter/Setter Checklist

Перед створенням getter запитай:

    1. Чи це property-like value?
    2. Чи calculation достатньо простий?
    3. Чи немає side effects?
    4. Чи operation synchronous?
    5. Чи буде API зрозумілішим?

Перед створенням setter:

    1. Чи це simple state assignment?
    2. Чи потрібна validation?
    3. Чи потрібна normalization?
    4. Чи потрібна conversion?
    5. Чи не є це насправді domain action?
    6. Чи немає надто складних side effects?

---

# Співбесіда

Що таке getter?

Що таке setter?

Для чого використовується `get`?

Для чого використовується `set`?

Як викликається getter?

Як викликається setter?

Чим getter відрізняється від звичайного method?

Чому getter викликається без `()`?

Чому setter використовується через assignment?

Що таке read-only property?

Чи означає getter без setter, що object immutable?

Як getter працює з private field?

Як setter може виконувати validation?

Що таке derived property?

Що таке computed property?

Чим getter відрізняється від method?

Коли краще використати getter?

Коли краще використати method?

Чи може getter бути `async`?

Чому не варто робити network request у getter?

Що станеться, якщо getter повертає `this.name`?

Що станеться, якщо setter робить `this.name = value`?

Чим `_name` відрізняється від `#name`?

Чи успадковуються getters/setters?

Як перевизначити getter у child class?

Що робить `super` у getter?

Чи може child class напряму звернутися до private field parent class?

---

# Рівні

🟢 Core (обов'язково знати)

Що таке getter.

Що таке setter.

Синтаксис:

    get property() {}

    set property(value) {}

Виклик getter:

    object.property

Виклик setter:

    object.property = value

Getter vs method.

Setter vs method.

Read-only property.

Validation через setter.

Computed property.

---

🔵 Junior

Private fields + getters/setters.

Encapsulation.

Getter + setter з однаковим ім'ям.

Normalization.

Type validation.

Range validation.

Derived properties.

Boolean getters.

Inheritance.

Override getters/setters.

`super` у getters/setters.

---

🟠 Middle

Public API design.

Getter vs method decisions.

Setter vs domain method.

Read-only domain state.

Encapsulation patterns.

Private fields.

Computed state.

Avoiding side effects.

Performance considerations.

Caching computed values.

Getters/setters у domain models.

---

🔴 Senior

API abstraction.

Encapsulation boundaries.

Immutable-like APIs.

Domain-driven modeling.

Getter vs explicit query methods.

Setter vs domain commands.

Hidden side effects.

State invariants.

API evolution without breaking consumers.

Designing maintainable object interfaces.

---

# Міні-шпаргалка

Getter:

    class User {
      #name;

      get name() {
        return this.#name;
      }
    }

Виклик:

    user.name;

---

Setter:

    class User {
      #name;

      set name(value) {
        this.#name = value;
      }
    }

Виклик:

    user.name = "John";

---

Getter + Setter:

    class User {
      #name;

      get name() {
        return this.#name;
      }

      set name(value) {
        this.#name =
          value.trim();
      }
    }

---

Read-only:

    class User {
      #id;

      get id() {
        return this.#id;
      }
    }

---

Validation:

    class User {
      #age;

      get age() {
        return this.#age;
      }

      set age(value) {
        if (value < 0) {
          throw new Error(
            "Invalid age"
          );
        }

        this.#age = value;
      }
    }

---

Computed property:

    class Rectangle {
      constructor(width, height) {
        this.width = width;
        this.height = height;
      }

      get area() {
        return (
          this.width *
          this.height
        );
      }
    }

---

Boolean getter:

    class User {
      get isAdult() {
        return this.age >= 18;
      }
    }

Виклик:

    user.isAdult;

---

Private field:

    class User {
      #name;

      get name() {
        return this.#name;
      }

      set name(value) {
        this.#name = value;
      }
    }

---

Getter vs method:

    getter
      │
      ▼
    user.fullName


    method
      │
      ▼
    user.calculateStatistics()

---

Setter vs method:

    setter
      │
      ▼
    user.name = "John"


    method
      │
      ▼
    user.rename("John")

---

Основна модель:

    External Code
          │
          ▼
    public property
          │
      ┌───┴───┐
      │       │
      ▼       ▼
    getter  setter
      │       │
      └───┬───┘
          ▼
     private state

---

# Головне

• Getter — це special method для читання property.

• Setter — це special method для запису property.

• Getter:

    get name() {}

• Setter:

    set name(value) {}

• Getter викликається:

    user.name

• Setter використовується:

    user.name = "John";

• Getter не викликається через `()`.

• Setter не викликається як function.

• Getter добре підходить для property-like values.

• Getter може створювати computed або derived properties.

• Getter може працювати з private fields.

• Setter добре підходить для validation.

• Setter може виконувати normalization.

• Setter може виконувати conversion.

• Getter без setter може створювати read-only API.

• Read-only property не обов'язково означає immutable object.

• `_name` — convention, а `#name` — справжнє private field.

• Getter/setter можуть приховувати internal implementation.

• Getter бажано робити без side effects.

• Не варто приховувати asynchronous operations у getter.

• Getter не може бути звичайним `async getter`.

• Складні operations краще робити methods.

• Setter не повинен перетворюватися на складний workflow.

• Domain actions часто краще представляти methods:

    deposit()
    withdraw()
    rename()
    activate()

• Getter:

    "дай мені значення"

• Setter:

    "встанови значення"

• Method:

    "виконай operation"

---

# Коротка модель для запам'ятовування

    GETTER
       │
       ▼
    READ
       │
       ▼
    object.property


    SETTER
       │
       ▼
    WRITE
       │
       ▼
    object.property = value


    METHOD
       │
       ▼
    ACTION
       │
       ▼
    object.method()

---

# Encapsulation Model

    Public API
         │
         ▼
    ┌──────────────┐
    │   property   │
    └──────┬───────┘
           │
      ┌────┴────┐
      ▼         ▼
    getter    setter
      │         │
      └────┬────┘
           ▼
      private field
           │
           ▼
         state

---

# Найважливіша формула

    user.name
        │
        ▼
      GETTER
        │
        ▼
      #name


    user.name = "John"
        │
        ▼
      SETTER
        │
        ▼
      #name


    user.rename("John")
        │
        ▼
      METHOD
        │
        ▼
    DOMAIN ACTION

Головна ідея:

    Getter
      =
    controlled READ

    Setter
      =
    controlled WRITE

    Method
      =
    ACTION

А разом із private fields:

    Private State
          │
          ▼
    Getter / Setter
          │
          ▼
      Public API

це один із базових механізмів **encapsulation** в OOP JavaScript.