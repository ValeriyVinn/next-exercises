## 03. Encapsulation

Encapsulation (інкапсуляція) — один з основних принципів OOP, який полягає в об'єднанні даних та поведінки всередині object і контролі доступу до його внутрішнього стану.

Основна ідея:

    Object
       │
       ├── Internal State
       │
       ├── Internal Logic
       │
       └── Public API
              │
              ▼
         External Code

Зовнішній код не повинен без потреби знати або змінювати внутрішню реалізацію object.

---

### Ключові поняття

✔ encapsulation  
✔ state  
✔ behavior  
✔ public API  
✔ public property  
✔ private field  
✔ private method  
✔ `#`  
✔ getter  
✔ setter  
✔ data validation  
✔ controlled access  
✔ abstraction  
✔ information hiding  
✔ internal implementation  
✔ immutable access  
✔ defensive copy  

---

### Що потрібно пам'ятати

• Encapsulation захищає внутрішній state object від неконтрольованої зміни.

• Object сам відповідає за керування власним state.

• Зовнішній код взаємодіє з object через його public API.

• Public API — methods та properties, які object дозволяє використовувати зовні.

• Internal implementation — деталі, які не повинні бути доступними зовнішньому коду.

• У JavaScript private fields позначаються `#`.

• Private fields доступні тільки всередині class.

• Private methods також можуть позначатися `#`.

• Getter дозволяє контролювати отримання значення.

• Setter дозволяє контролювати встановлення значення.

• Encapsulation дозволяє виконувати validation перед зміною state.

• Необов'язково робити абсолютно всі properties private.

• Encapsulation — це не просто використання `#`.

• Encapsulation — це правильне визначення меж між public API та internal implementation.

---

# Що таке Encapsulation

Проста модель:

    Encapsulation
         │
         ▼
    Object
      │
      ├── State
      │
      ├── Behavior
      │
      └── Public API

Наприклад:

    class User {
      constructor(name) {
        this.name = name;
      }

      sayHello() {
        console.log(`Hello, ${this.name}`);
      }
    }

Object об'єднує:

    data
      ↓
    name

та:

    behavior
      ↓
    sayHello()

---

# Без Encapsulation

Наприклад:

    class BankAccount {
      constructor(balance) {
        this.balance = balance;
      }
    }

    const account = new BankAccount(1000);

Зовнішній код може зробити:

    account.balance = -500000;

Тобто будь-який код може змінити state без контролю.

Модель:

    External Code
          │
          │ direct access
          ▼
    account.balance

Це може призвести до некоректного state.

---

# Encapsulation

Замість прямого доступу можна приховати state:

    class BankAccount {
      #balance;

      constructor(balance) {
        this.#balance = balance;
      }

      deposit(amount) {
        if (amount <= 0) {
          return;
        }

        this.#balance += amount;
      }

      getBalance() {
        return this.#balance;
      }
    }

Тепер:

    const account = new BankAccount(1000);

    account.deposit(500);

    console.log(account.getBalance());

Зовнішній код не має прямого доступу до:

    #balance

Модель:

    External Code
          │
          ▼
    Public API
      │
      ├── deposit()
      └── getBalance()
          │
          ▼
    Private State
      │
      └── #balance

---

# Public API

Public API — це частина object, з якою дозволено працювати зовнішньому коду.

Наприклад:

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

Public API:

    deposit()
    getBalance()

Internal implementation:

    #balance

Модель:

    BankAccount
        │
        ├── PUBLIC
        │    ├── deposit()
        │    └── getBalance()
        │
        └── PRIVATE
             └── #balance

---

# Private Fields

Private field створюється за допомогою `#`.

    class User {
      #password;

      constructor(password) {
        this.#password = password;
      }
    }

Private field:

    #password

Доступ всередині class:

    class User {
      #password;

      constructor(password) {
        this.#password = password;
      }

      checkPassword(password) {
        return this.#password === password;
      }
    }

Доступ зовні:

    const user = new User("12345");

    user.checkPassword("12345");

Але:

    user.#password

викличе помилку.

---

# Private Methods

Methods також можуть бути private.

    class User {
      #validateName(name) {
        return name.trim().length > 0;
      }

      constructor(name) {
        if (!this.#validateName(name)) {
          throw new Error("Invalid name");
        }

        this.name = name;
      }
    }

`#validateName()` — private method.

Зовні його викликати не можна:

    user.#validateName("John");

---

# Public vs Private

Public:

    class User {
      name = "Valeriy";

      sayHello() {
        console.log("Hello");
      }
    }

Private:

    class User {
      #password;

      #validatePassword() {
        // internal logic
      }
    }

Модель:

    User
     │
     ├── PUBLIC
     │    ├── name
     │    └── sayHello()
     │
     └── PRIVATE
          ├── #password
          └── #validatePassword()

---

# State

State — дані, які описують поточний стан object.

Наприклад:

    class Counter {
      #value = 0;

      increment() {
        this.#value++;
      }

      getValue() {
        return this.#value;
      }
    }

State:

    #value

Behavior:

    increment()
    getValue()

---

# Controlled State

Encapsulation дозволяє змінювати state тільки через контрольовані methods.

    class Counter {
      #value = 0;

      increment() {
        this.#value++;
      }

      decrement() {
        if (this.#value > 0) {
          this.#value--;
        }
      }

      getValue() {
        return this.#value;
      }
    }

Зовнішній код:

    counter.increment();

    counter.decrement();

Не може зробити:

    counter.#value = -100;

State контролюється самим object.

---

# Validation

Encapsulation часто використовується разом із validation.

Без контролю:

    class User {
      constructor(age) {
        this.age = age;
      }
    }

Можна:

    user.age = -500;

З validation:

    class User {
      #age;

      constructor(age) {
        this.setAge(age);
      }

      setAge(age) {
        if (age < 0) {
          throw new Error("Age cannot be negative");
        }

        this.#age = age;
      }

      getAge() {
        return this.#age;
      }
    }

Тепер object контролює власний state.

---

# Getter

Getter дозволяє отримувати internal value через property-like syntax.

    class User {
      #name;

      constructor(name) {
        this.#name = name;
      }

      get name() {
        return this.#name;
      }
    }

    const user = new User("Valeriy");

    console.log(user.name);

Використовується:

    user.name

а не:

    user.name()

---

# Setter

Setter дозволяє контролювати встановлення значення.

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
          throw new Error("Name cannot be empty");
        }

        this.#name = value.trim();
      }
    }

Тепер:

    user.name = " John ";

значення буде нормалізовано.

---

# Getter + Setter

Повна модель:

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
          throw new Error("Name cannot be empty");
        }

        this.#name = value.trim();
      }
    }

Модель:

    External Code
          │
          ▼
       name
          │
       ┌──┴──┐
       ▼     ▼
     getter setter
       │     │
       └──┬──┘
          ▼
       #name

---

# Method vs Getter

Method:

    getName() {
      return this.#name;
    }

Виклик:

    user.getName();

Getter:

    get name() {
      return this.#name;
    }

Виклик:

    user.name;

Getter зручний, коли операція логічно сприймається як отримання property.

---

# Setter vs Method

Setter:

    set name(value) {
      this.#name = value;
    }

Використання:

    user.name = "John";

Method:

    setName(value) {
      this.#name = value;
    }

Використання:

    user.setName("John");

Обидва підходи можуть контролювати зміну state.

---

# Encapsulation через Methods

Не обов'язково використовувати getter/setter.

Можна надати спеціальні methods.

    class BankAccount {
      #balance = 0;

      deposit(amount) {
        if (amount <= 0) {
          throw new Error("Invalid amount");
        }

        this.#balance += amount;
      }

      withdraw(amount) {
        if (amount <= 0) {
          throw new Error("Invalid amount");
        }

        if (amount > this.#balance) {
          throw new Error("Insufficient funds");
        }

        this.#balance -= amount;
      }

      getBalance() {
        return this.#balance;
      }
    }

Це часто краще, ніж дозволяти зовнішньому коду напряму змінювати:

    balance

---

# Encapsulation і Invariants

Invariant — умова, яка повинна залишатися істинною для valid state object.

Наприклад:

    balance >= 0

Якщо state public:

    account.balance = -1000;

invariant може бути порушений.

Якщо state private:

    #balance

і всі зміни проходять через:

    deposit()
    withdraw()

class може гарантувати:

    balance >= 0

Модель:

    Public API
         │
         ▼
    Validation
         │
         ▼
    State
         │
         ▼
    Valid Object

---

# Example: Bank Account

    class BankAccount {
      #balance = 0;

      constructor(initialBalance = 0) {
        if (initialBalance < 0) {
          throw new Error("Invalid initial balance");
        }

        this.#balance = initialBalance;
      }

      deposit(amount) {
        if (amount <= 0) {
          throw new Error("Amount must be positive");
        }

        this.#balance += amount;
      }

      withdraw(amount) {
        if (amount <= 0) {
          throw new Error("Amount must be positive");
        }

        if (amount > this.#balance) {
          throw new Error("Insufficient funds");
        }

        this.#balance -= amount;
      }

      getBalance() {
        return this.#balance;
      }
    }

Використання:

    const account = new BankAccount(1000);

    account.deposit(500);
    account.withdraw(200);

    console.log(account.getBalance());

Результат:

    1300

Зовнішній код не керує `#balance` напряму.

---

# Example: User

    class User {
      #password;

      constructor(name, password) {
        this.name = name;
        this.#password = password;
      }

      checkPassword(password) {
        return this.#password === password;
      }

      changePassword(oldPassword, newPassword) {
        if (!this.checkPassword(oldPassword)) {
          return false;
        }

        if (newPassword.length < 6) {
          return false;
        }

        this.#password = newPassword;

        return true;
      }
    }

Використання:

    const user = new User(
      "Valeriy",
      "123456"
    );

    console.log(
      user.checkPassword("123456")
    );

Зовнішній код не отримує:

    user.#password

Password залишається internal state.

---

# Encapsulation of Collections

Encapsulation особливо важлива для collections.

Проблема:

    class Cart {
      constructor() {
        this.items = [];
      }
    }

Зовнішній код може зробити:

    cart.items.push("Invalid item");

Краще:

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

      getItems() {
        return [...this.#items];
      }
    }

Тепер:

    const cart = new Cart();

    cart.add("Laptop");

Внутрішня collection прихована.

---

# Defensive Copy

Якщо повернути internal Array напряму:

    getItems() {
      return this.#items;
    }

зовнішній код може змінити state:

    cart.getItems().push("Invalid item");

Краще повернути копію:

    getItems() {
      return [...this.#items];
    }

Тоді:

    const items = cart.getItems();

    items.push("Something");

змінює тільки копію, а не internal collection.

Модель:

    Internal State
         │
         │ copy
         ▼
    External Code

---

# Read-only Access

Іноді object повинен дозволяти:

    READ

але не дозволяти:

    DIRECT WRITE

Наприклад:

    class User {
      #balance = 1000;

      get balance() {
        return this.#balance;
      }
    }

Зовні:

    console.log(user.balance);

Але:

    user.balance = 5000;

не змінює private `#balance` через setter, якого немає.

Це приклад контрольованого read-only access.

---

# Information Hiding

Information hiding — приховування деталей реалізації object.

Наприклад:

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

Зовнішній код бачить:

    makeCoffee()

А внутрішні кроки приховані:

    #heatWater()
    #grindBeans()
    #brew()

---

# Encapsulation vs Abstraction

Ці поняття пов'язані, але не однакові.

### Encapsulation

Фокусується на:

    HOW state and behavior are organized
    AND
    HOW access is controlled

### Abstraction

Фокусується на:

    WHAT the object exposes
    AND
    WHAT complexity is hidden

Спрощено:

    Encapsulation
         │
         └── control access

    Abstraction
         │
         └── hide complexity

Наприклад:

    coffeeMachine.makeCoffee()

Abstraction:

    "Я хочу зробити coffee."

Encapsulation:

    internal methods:

    #heatWater()
    #grindBeans()
    #brew()

---

# Encapsulation vs Data Hiding

Data hiding — приховування internal data.

Encapsulation — ширше поняття.

    Encapsulation
         │
         ├── State
         ├── Behavior
         ├── Access control
         └── Public API

Data hiding:

    State
      │
      └── hidden/private data

Тобто data hiding є одним із способів реалізації encapsulation.

---

# Encapsulation і Public API

Хороший class має чіткий public API.

Наприклад:

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
          (total, item) => total + item.price,
          0
        );
      }
    }

Public API:

    add()
    remove()
    getTotal()

Private implementation:

    #items

Користувачу class не потрібно знати, що всередині використовується Array.

---

# Why Hide Implementation?

Приховування implementation дає можливість змінювати внутрішню реалізацію без зміни public API.

Спочатку:

    class UserCollection {
      #users = [];

      findById(id) {
        return this.#users.find(
          user => user.id === id
        );
      }
    }

Пізніше внутрішню реалізацію можна змінити на:

    #users = new Map();

а public API залишити:

    findById(id)

Зовнішній код:

    collection.findById(id);

не повинен знати, чи всередині:

    Array

або:

    Map

Це важлива перевага encapsulation.

---

# Encapsulation Boundary

Encapsulation створює межу:

    External Code
          │
          │ Public API
          ▼
    ┌───────────────┐
    │     Class     │
    │               │
    │  Public API   │
    │       │       │
    │       ▼       │
    │ Internal      │
    │ State/Logic   │
    └───────────────┘

Зовнішній код взаємодіє з class через public boundary.

---

# Loose Coupling

Хороша encapsulation допомагає зменшити coupling.

Погано:

    Application
        │
        ├── directly changes state
        ├── knows internal fields
        └── knows implementation

Краще:

    Application
        │
        ▼
    Public API
        │
        ▼
    Internal Implementation

Application залежить від interface, а не від деталей реалізації.

---

# Encapsulation і Services

У більших application services можуть приховувати internal implementation.

Наприклад:

    class UserService {
      #users = [];

      createUser(data) {
        // validation
        // transformation
        // storage
      }

      findUser(id) {
        // search logic
      }
    }

Зовнішній код:

    userService.createUser(data);
    userService.findUser(id);

Не повинен напряму працювати з:

    #users

Це дозволяє змінювати internal implementation service.

---

# Типові помилки

❌ Вважати encapsulation просто використанням `#`.

❌ Робити всі properties public без причини.

❌ Робити всі properties private без причини.

❌ Дозволяти зовнішньому коду напряму змінювати critical state.

❌ Повертати internal collection без необхідності.

❌ Використовувати setter без validation.

❌ Створювати getter/setter для кожної property автоматично.

❌ Плутати encapsulation та abstraction.

❌ Вважати private field способом абсолютного захисту всієї логіки application.

❌ Створювати величезний class з сотнями private fields та methods.

❌ Приховувати implementation, але створювати public API, який розкриває всі internal details.

---

# Питання зі співбесіди

Що таке encapsulation?

Який принцип OOP реалізує encapsulation?

Навіщо потрібна encapsulation?

Що таке public API?

Що таке internal state?

Що таке information hiding?

Як створити private field у JavaScript?

Що означає `#` у class?

Чи можна отримати private field за межами class?

Що таке private method?

Що таке getter?

Що таке setter?

Яка різниця між getter та method?

Яка різниця між setter та method?

Навіщо потрібна validation у setter?

Що таке read-only property?

Що таке defensive copy?

Чому не варто повертати internal Array напряму?

Яка різниця між encapsulation та abstraction?

Як encapsulation допомагає зменшити coupling?

Як encapsulation допомагає змінювати internal implementation?

Як encapsulation застосовується до collections?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке encapsulation.

State + behavior.

Public API.

Internal implementation.

Public vs private.

Private fields `#`.

Private methods.

Контроль доступу.

Data validation.

Information hiding.

Controlled state.

---

🔵 Junior

Private class fields.

Private methods.

Getters.

Setters.

Read-only access.

Validation.

Encapsulation collections.

Defensive copies.

Public API design.

Internal state.

Encapsulation boundaries.

Encapsulation vs abstraction.

---

🟠 Middle

Designing class boundaries.

Designing public APIs.

Hiding implementation details.

Encapsulation of collections.

Controlled state transitions.

Invariants.

Validation at boundaries.

Loose coupling.

Composition + encapsulation.

Service encapsulation.

Changing internal implementation without changing public API.

---

🔴 Senior

Encapsulation architecture.

Abstraction boundaries.

API stability.

Domain invariants.

Information hiding.

Coupling management.

Encapsulation across modules.

Encapsulation across services.

Public API design at application scale.

Internal vs external contracts.

Trade-offs між flexibility та strict encapsulation.

---

# Міні-шпаргалка

Encapsulation:

    Object
      │
      ├── Private State
      │     ├── #data
      │     └── #data
      │
      ├── Private Logic
      │     └── #method()
      │
      └── Public API
            ├── method()
            ├── method()
            └── getter

---

Public vs Private:

    CLASS
     │
     ├── PUBLIC
     │    ├── method()
     │    ├── getter
     │    └── property
     │
     └── PRIVATE
          ├── #field
          ├── #method()
          └── internal logic

---

Controlled state:

    External Code
          │
          ▼
      Public API
          │
          ▼
       Validation
          │
          ▼
      Private State

---

Getter:

    get name() {
      return this.#name;
    }

    user.name

Setter:

    set name(value) {
      this.#name = value;
    }

    user.name = "John"

---

Collection:

    Class
      │
      ├── #items
      │
      ├── add()
      ├── remove()
      └── getItems()
              │
              ▼
          copy of items

---

Encapsulation + abstraction:

    External Code
          │
          ▼
      Simple API
          │
          ▼
    Encapsulated Object
       │          │
       ▼          ▼
     State      Logic
       │          │
       └────┬─────┘
            ▼
        Complexity

---

# Головне

• Encapsulation — це контроль доступу до state та internal implementation object.

• Object повинен сам відповідати за керування власним state.

• Public API — інтерфейс, через який зовнішній код взаємодіє з object.

• Internal implementation не повинна бути доступною без необхідності.

• `#` використовується для private fields та private methods у JavaScript classes.

• Private fields недоступні безпосередньо за межами class.

• Getter дозволяє контролювати отримання даних.

• Setter дозволяє контролювати встановлення даних.

• Methods часто є кращим способом контролю state, коли потрібні дії або business rules.

• Validation повинна виконуватися на межі між external input та internal state.

• Private state допомагає підтримувати invariants object.

• Internal collections також можна інкапсулювати.

• Не варто повертати internal collection напряму, якщо зовнішній код може її змінити.

• Defensive copy дозволяє повернути копію collection замість internal collection.

• Encapsulation дозволяє змінювати internal implementation без зміни public API.

• Encapsulation допомагає зменшити coupling.

• Encapsulation та abstraction пов'язані, але це різні поняття.

• Encapsulation відповідає за **організацію та контроль доступу**.

• Abstraction відповідає за **приховування складності та представлення простого interface**.

• Хороший class має чітку межу між public API та internal implementation.

---

# Коротка модель для запам'ятовування

    ENCAPSULATION
          │
          ▼
       OBJECT
          │
     ┌────┴────┐
     ▼         ▼
   PUBLIC    PRIVATE
     │         │
     │         ├── #state
     │         ├── #methods
     │         └── internal logic
     │
     ├── methods
     ├── getters
     └── setters
          │
          ▼
       CONTROL
          │
          ▼
      VALID STATE

Головна ідея:

    Don't expose internal state unnecessarily.

    External Code
          │
          ▼
      Public API
          │
          ▼
    Encapsulated Object
          │
          ▼
    Private State + Logic