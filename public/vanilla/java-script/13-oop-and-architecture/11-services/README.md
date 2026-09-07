## 11. Services

Service (сервіс) — це окремий class або module, який відповідає за певну логіку application.

Основна ідея:

    Application
         │
         ├── UserService
         ├── ProductService
         ├── AuthService
         └── StorageService

Service допомагає розділити application на окремі частини, кожна з яких має свою відповідальність.

Наприклад:

    UserService
        ↓
    робота з users

    ProductService
        ↓
    робота з products

    AuthService
        ↓
    authentication

---

### Ключові поняття

✔ service  
✔ Service Class  
✔ business logic  
✔ responsibility  
✔ separation of concerns  
✔ single responsibility  
✔ dependency  
✔ dependency injection  
✔ service composition  
✔ reusable service  
✔ stateful service  
✔ stateless service  
✔ repository  
✔ controller  
✔ model  
✔ service layer  
✔ abstraction  
✔ encapsulation  
✔ loose coupling  
✔ high cohesion  

---

### Що потрібно пам'ятати

• Service — це компонент, який інкапсулює певну application/business logic.

• Service зазвичай відповідає за одну конкретну область відповідальності.

• Service дозволяє не змішувати business logic з UI, DOM, HTTP або іншою інфраструктурною логікою.

• Service може бути реалізований як class або звичайний module.

• Service може використовувати інші services.

• Service може отримувати dependencies через constructor.

• Dependency Injection дозволяє передавати dependencies ззовні.

• Хороший Service має чітку responsibility.

• Service не повинен знати зайві деталі інших частин application.

• Services допомагають створювати reusable та testable code.

• Service Layer часто знаходиться між Controller/UI та Data/Repository layer.

• У невеликому application окремий Service може бути непотрібним.

• Не потрібно створювати Service Class тільки заради використання `class`.

---

# Що таке Service

Service — це окремий компонент, який виконує певну функцію application.

Наприклад:

    class UserService {
      createUser(user) {
        // business logic
      }

      getUser(id) {
        // business logic
      }
    }

Використання:

    const userService = new UserService();

    userService.createUser({
      name: "Valeriy"
    });

---

# Service як відповідальність

Краще думати про Service не як про "class", а як про:

    RESPONSIBILITY

Наприклад:

    UserService
        ↓
    user-related logic

    AuthService
        ↓
    authentication logic

    CartService
        ↓
    shopping cart logic

    OrderService
        ↓
    order logic

---

# Business Logic

Business logic — правила, за якими працює application.

Наприклад:

    користувач може створити замовлення,
    якщо кошик не порожній.

Цю логіку можна помістити в:

    OrderService

Наприклад:

    class OrderService {
      createOrder(cart) {
        if (cart.items.length === 0) {
          throw new Error("Cart is empty");
        }

        return {
          items: cart.items,
          total: cart.total
        };
      }
    }

Service відповідає за правило:

    Empty cart
       ↓
    cannot create order

---

# Service без UI

Service не повинен залежати від DOM, якщо це не його відповідальність.

Наприклад, погано:

    class UserService {
      createUser(user) {
        document.querySelector("#message")
          .textContent = "User created";

        // business logic
      }
    }

Тут Service змішує:

    business logic
          +
    DOM logic

Краще:

    class UserService {
      createUser(user) {
        // business logic

        return user;
      }
    }

UI сам вирішує, що робити з результатом:

    const user = userService.createUser(data);

    message.textContent = "User created";

---

# Separation of Concerns

Separation of Concerns означає розділення різних відповідальностей.

Наприклад:

    UI
     │
     ▼
    Service
     │
     ▼
    Repository
     │
     ▼
    Data

Кожен layer має свою відповідальність.

    UI
    ↓
    display / interaction

    Service
    ↓
    business logic

    Repository
    ↓
    data access

---

# Service Layer

Service Layer — рівень application, який містить business logic.

Спрощена architecture:

    UI / Controller
          │
          ▼
    Service Layer
          │
          ▼
    Repository / API
          │
          ▼
        Data

Наприклад:

    UserPage
       │
       ▼
    UserService
       │
       ▼
    UserRepository
       │
       ▼
    users

---

# Простий Service

    class CalculatorService {
      add(a, b) {
        return a + b;
      }

      subtract(a, b) {
        return a - b;
      }

      multiply(a, b) {
        return a * b;
      }
    }

Використання:

    const calculator = new CalculatorService();

    console.log(
      calculator.add(10, 5)
    );

Service інкапсулює operations.

---

# UserService

    class UserService {
      constructor(users) {
        this.users = users;
      }

      getUserById(id) {
        return this.users.find(
          user => user.id === id
        );
      }

      createUser(user) {
        this.users.push(user);

        return user;
      }
    }

Використання:

    const users = [];

    const userService = new UserService(users);

    userService.createUser({
      id: 1,
      name: "Valeriy"
    });

    console.log(
      userService.getUserById(1)
    );

---

# Stateful Service

Stateful Service зберігає state.

Наприклад:

    class CartService {
      constructor() {
        this.items = [];
      }

      addItem(item) {
        this.items.push(item);
      }

      removeItem(id) {
        this.items = this.items.filter(
          item => item.id !== id
        );
      }

      getItems() {
        return this.items;
      }
    }

Використання:

    const cart = new CartService();

    cart.addItem({
      id: 1,
      name: "Book",
      price: 20
    });

    console.log(cart.getItems());

Service має власний state:

    CartService
         │
         └── items

---

# Stateless Service

Stateless Service не зберігає власний mutable state.

Наприклад:

    class PriceService {
      calculateTotal(price, quantity) {
        return price * quantity;
      }

      calculateDiscount(total, percent) {
        return total * (1 - percent / 100);
      }
    }

Використання:

    const priceService = new PriceService();

    const total = priceService.calculateTotal(
      100,
      3
    );

    console.log(total);

Методи працюють з отриманими даними.

---

# Service Dependency

Service може використовувати інший Service.

Наприклад:

    class LoggerService {
      log(message) {
        console.log(message);
      }
    }

    class UserService {
      constructor(logger) {
        this.logger = logger;
      }

      createUser(user) {
        this.logger.log(
          `Creating user: ${user.name}`
        );

        return user;
      }
    }

Тут:

    UserService
         │
         ▼
    LoggerService

`LoggerService` — dependency `UserService`.

---

# Dependency Injection

Dependency Injection (DI) — передавання dependencies у component ззовні замість створення їх всередині.

Погано:

    class UserService {
      constructor() {
        this.logger = new LoggerService();
      }
    }

`UserService` сам створює dependency.

Краще:

    class UserService {
      constructor(logger) {
        this.logger = logger;
      }
    }

Створення:

    const logger = new LoggerService();

    const userService =
      new UserService(logger);

Тепер:

    UserService
         ↑
         │ dependency
         │
    LoggerService

---

# Чому Dependency Injection корисний

DI дозволяє:

✔ зменшити coupling

✔ спростити testing

✔ замінювати dependencies

✔ повторно використовувати Service

✔ контролювати створення dependencies

Наприклад:

    const realLogger = new LoggerService();

    const userService =
      new UserService(realLogger);

У test можна передати fake logger:

    const fakeLogger = {
      log(message) {
        console.log("TEST:", message);
      }
    };

    const userService =
      new UserService(fakeLogger);

---

# Repository

Repository — component, який відповідає за доступ до data.

Наприклад:

    class UserRepository {
      constructor(users) {
        this.users = users;
      }

      findById(id) {
        return this.users.find(
          user => user.id === id
        );
      }

      save(user) {
        this.users.push(user);

        return user;
      }
    }

Тепер Service може використовувати Repository.

---

# Service + Repository

Architecture:

    UserService
         │
         ▼
    UserRepository
         │
         ▼
       users

Приклад:

    class UserRepository {
      constructor(users) {
        this.users = users;
      }

      findById(id) {
        return this.users.find(
          user => user.id === id
        );
      }

      save(user) {
        this.users.push(user);

        return user;
      }
    }

    class UserService {
      constructor(userRepository) {
        this.userRepository = userRepository;
      }

      getUser(id) {
        return this.userRepository.findById(id);
      }

      createUser(user) {
        return this.userRepository.save(user);
      }
    }

Створення:

    const users = [];

    const repository =
      new UserRepository(users);

    const service =
      new UserService(repository);

Тепер:

    Application
         │
         ▼
    UserService
         │
         ▼
    UserRepository
         │
         ▼
       users

---

# Controller + Service + Repository

У web application часто зустрічається така структура:

    Controller
        │
        ▼
    Service
        │
        ▼
    Repository
        │
        ▼
    Database / API

Наприклад:

    UserController
          │
          ▼
    UserService
          │
          ▼
    UserRepository
          │
          ▼
       Database

Відповідальності:

    Controller
        ↓
    request / response

    Service
        ↓
    business logic

    Repository
        ↓
    data access

---

# Service у Frontend

Services можна використовувати і у frontend application.

Наприклад:

    ApiService
    UserService
    AuthService
    StorageService

Architecture:

    Component
       │
       ▼
    UserService
       │
       ▼
    ApiService
       │
       ▼
    Backend API

---

# ApiService

    class ApiService {
      async get(url) {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Request failed");
        }

        return response.json();
      }

      async post(url, data) {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        return response.json();
      }
    }

Інший Service може використовувати `ApiService`.

---

# UserService + ApiService

    class UserService {
      constructor(api) {
        this.api = api;
      }

      getUsers() {
        return this.api.get("/api/users");
      }

      getUser(id) {
        return this.api.get(`/api/users/${id}`);
      }

      createUser(user) {
        return this.api.post(
          "/api/users",
          user
        );
      }
    }

Використання:

    const api = new ApiService();

    const userService =
      new UserService(api);

    const users =
      await userService.getUsers();

---

# AuthService

Service може інкапсулювати authentication logic.

    class AuthService {
      constructor(storage) {
        this.storage = storage;
      }

      login(user) {
        this.storage.setItem(
          "user",
          JSON.stringify(user)
        );
      }

      logout() {
        this.storage.removeItem("user");
      }

      getCurrentUser() {
        const data =
          this.storage.getItem("user");

        return data
          ? JSON.parse(data)
          : null;
      }

      isAuthenticated() {
        return this.getCurrentUser() !== null;
      }
    }

Використання:

    const authService =
      new AuthService(localStorage);

    authService.login({
      id: 1,
      name: "Valeriy"
    });

    console.log(
      authService.isAuthenticated()
    );

---

# StorageService

Можна винести роботу з `localStorage` в окремий Service.

    class StorageService {
      set(key, value) {
        localStorage.setItem(
          key,
          JSON.stringify(value)
        );
      }

      get(key) {
        const value =
          localStorage.getItem(key);

        return value
          ? JSON.parse(value)
          : null;
      }

      remove(key) {
        localStorage.removeItem(key);
      }
    }

Тепер інші services не повинні знати деталі `localStorage`.

---

# Service Composition

Services можуть комбінуватися.

Наприклад:

    StorageService
          │
          ▼
      AuthService
          │
          ▼
      UserService

Або:

    ApiService
       │
       ├── UserService
       ├── ProductService
       └── OrderService

Це дозволяє будувати application з незалежних компонентів.

---

# Service Factory

Для створення services можна використовувати factory function.

    function createServices() {
      const api = new ApiService();
      const storage = new StorageService();

      const auth =
        new AuthService(storage);

      const users =
        new UserService(api);

      return {
        api,
        storage,
        auth,
        users
      };
    }

Використання:

    const services = createServices();

    services.auth.login(user);

    services.users.getUsers();

Модель:

    createServices()
          │
          ├── ApiService
          ├── StorageService
          ├── AuthService
          └── UserService

---

# Service як Module

Service не обов'язково повинен бути class.

Наприклад:

    // userService.js

    export function getUserById(users, id) {
      return users.find(
        user => user.id === id
      );
    }

    export function createUser(users, user) {
      users.push(user);

      return user;
    }

Це також Service logic.

Важливо:

    Service ≠ обов'язково class

Service — це перш за все:

    responsibility

---

# Class Service vs Module Service

Class:

    class UserService {
      getUser(id) {
        // ...
      }
    }

Module:

    export function getUser(id) {
      // ...
    }

Class зручний, коли потрібні:

    state
    dependencies
    multiple instances

Module зручний, коли логіка:

    stateless
    проста
    не потребує instance

---

# High Cohesion

High cohesion — коли component зосереджений на близьких за змістом задачах.

Добре:

    UserService
        ├── createUser()
        ├── getUser()
        ├── updateUser()
        └── deleteUser()

Погано:

    UserService
        ├── createUser()
        ├── calculateTax()
        ├── sendEmail()
        ├── resizeImage()
        └── connectDatabase()

У другому випадку Service має занадто багато різних responsibilities.

---

# Low Coupling

Low coupling — компоненти якомога менше залежать від внутрішньої реалізації один одного.

Погано:

    UserService
        │
        ├── знає DOM
        ├── знає localStorage
        ├── знає fetch
        ├── знає database
        └── знає UI

Краще:

    UserService
        │
        ▼
    dependencies

і кожна dependency має власну responsibility.

---

# Single Responsibility Principle

Single Responsibility Principle (SRP):

    One class / module
    should have one responsibility.

Наприклад:

    UserService
        ↓
    user business logic

    EmailService
        ↓
    email logic

    StorageService
        ↓
    storage logic

    ApiService
        ↓
    HTTP logic

---

# Поганий Service

    class UserService {
      createUser(user) {
        document.querySelector("#message");

        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );

        fetch("/api/users", {
          method: "POST",
          body: JSON.stringify(user)
        });

        console.log("User created");
      }
    }

Тут змішані:

    DOM
    Storage
    HTTP
    Logging
    Business Logic

Це створює сильний coupling.

---

# Кращий варіант

    class UserService {
      constructor(api, storage, logger) {
        this.api = api;
        this.storage = storage;
        this.logger = logger;
      }

      async createUser(user) {
        const createdUser =
          await this.api.post(
            "/api/users",
            user
          );

        this.storage.set(
          "lastUser",
          createdUser
        );

        this.logger.log(
          "User created"
        );

        return createdUser;
      }
    }

Тепер dependencies можна замінити.

---

# Service Error Handling

Service може перевіряти business rules.

    class UserService {
      createUser(user) {
        if (!user.name) {
          throw new Error(
            "User name is required"
          );
        }

        if (!user.email) {
          throw new Error(
            "User email is required"
          );
        }

        return user;
      }
    }

Service відповідає за business validation.

---

# Service Validation vs Form Validation

Не слід покладатися тільки на UI validation.

Наприклад:

    Form
      ↓
    required field

але Service також може перевірити:

    UserService
      ↓
    business rules

Тому:

    UI validation
        +
    Service validation

можуть виконувати різні задачі.

---

# Stateful vs Stateless

Stateful:

    class CartService {
      constructor() {
        this.items = [];
      }
    }

Service має state.

Stateless:

    class MathService {
      add(a, b) {
        return a + b;
      }
    }

Service не має власного state.

Запам'ятати:

    Stateful
       ↓
    service owns state

    Stateless
       ↓
    service works with input

---

# Services у Mini SPA

Для Mini SPA можна організувати application так:

    src/
    ├── components/
    ├── services/
    │   ├── apiService.js
    │   ├── userService.js
    │   ├── authService.js
    │   └── storageService.js
    ├── state/
    └── main.js

Модель:

    UI
     │
     ▼
    Services
     │
     ├── API
     ├── Auth
     └── Storage
     │
     ▼
    Backend / Browser APIs

---

# Example: Mini Application

Наприклад, application для users.

    UserService
        │
        ├── getUsers()
        ├── getUser()
        ├── createUser()
        └── deleteUser()

    AuthService
        │
        ├── login()
        ├── logout()
        └── isAuthenticated()

    ApiService
        │
        ├── get()
        ├── post()
        ├── put()
        └── delete()

Architecture:

    Component
        │
        ▼
    UserService
        │
        ▼
    ApiService
        │
        ▼
    Backend API

---

# Типові помилки

❌ Вважати Service обов'язково class.

❌ Створювати Service для кожної дрібної функції.

❌ Робити один `AppService`, який містить всю application logic.

❌ Змішувати UI та business logic.

❌ Змішувати data access та business logic без потреби.

❌ Створювати dependencies всередині Service, якщо їх можна передати через constructor.

❌ Робити Service занадто великим.

❌ Створювати глибоку chain dependencies без необхідності.

❌ Зберігати зайвий state у Service.

❌ Робити Service залежним від конкретної реалізації, коли потрібна абстракція.

❌ Використовувати inheritance для services без реальної необхідності.

❌ Створювати Service тільки тому, що "OOP означає багато classes".

---

# Питання зі співбесіди

Що таке Service?

Для чого потрібен Service?

Що таке business logic?

Що таке Service Layer?

Яка відповідальність Service?

Чим Service відрізняється від Repository?

Чим Service відрізняється від Controller?

Чи обов'язково Service повинен бути class?

Що таке Dependency Injection?

Що таке dependency?

Навіщо передавати dependency через constructor?

Що таке stateful Service?

Що таке stateless Service?

Що таке Separation of Concerns?

Що таке Single Responsibility Principle?

Що таке high cohesion?

Що таке low coupling?

Коли потрібно створювати Service?

Чи потрібно використовувати Service у маленькому application?

Чому business logic краще відокремлювати від UI?

Як Service може взаємодіяти з Repository?

Як Services взаємодіють між собою?

Які Services можуть бути у frontend application?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке Service.

Service responsibility.

Business logic.

Service Class.

Service module.

Separation of Concerns.

Single Responsibility Principle.

Stateful Service.

Stateless Service.

Dependencies.

Основи Service Layer.

---

🔵 Junior

UserService.

AuthService.

ApiService.

StorageService.

Repository.

Service + Repository.

Dependency Injection.

Constructor dependencies.

Service composition.

Error handling у Service.

Service у frontend application.

Service у Mini SPA.

---

🟠 Middle

Service Layer architecture.

Low coupling.

High cohesion.

Dependency Injection.

Dependency inversion.

Reusable services.

Testing services.

Mock / fake dependencies.

Service boundaries.

Business logic isolation.

Composition over inheritance.

Service orchestration.

---

🔴 Senior

Application architecture.

Service boundaries.

Domain vs application services.

Dependency Inversion Principle.

Dependency Injection architecture.

Service orchestration.

Transaction boundaries.

Distributed services.

Microservices vs application services.

Service coupling.

Service cohesion.

Scalability.

Testability.

Architecture trade-offs.

---

# Міні-шпаргалка

Service:

    Service
       │
       └── Responsibility
              │
              ▼
        Business Logic

Основна architecture:

    UI / Controller
          │
          ▼
       Service
          │
          ▼
      Repository
          │
          ▼
      Database / API

---

Service + Dependency:

    UserService
         │
         ├── ApiService
         ├── StorageService
         └── LoggerService

Dependencies передаються:

    constructor(
      dependency
    )

---

Dependency Injection:

    Dependency
         │
         ▼
    Service

    const service =
      new Service(dependency);

Не:

    Service
      │
      └── new Dependency()

---

Stateful:

    Service
       │
       └── state

Stateless:

    input
      │
      ▼
    Service
      │
      ▼
    output

---

Responsibilities:

    Controller
       ↓
    request / response

    Service
       ↓
    business logic

    Repository
       ↓
    data access

---

Composition:

    Application
         │
         ├── ApiService
         ├── AuthService
         ├── UserService
         ├── StorageService
         └── LoggerService

---

# Головне

• Service — компонент, який відповідає за певну application/business logic.

• Service може бути class або module.

• Service — це насамперед responsibility, а не конкретний синтаксис.

• Service допомагає відокремити business logic від UI та infrastructure logic.

• Service Layer часто знаходиться між Controller/UI та Repository/API.

• `UserService` відповідає за user-related logic.

• `AuthService` відповідає за authentication logic.

• `ApiService` відповідає за HTTP/API communication.

• `StorageService` відповідає за роботу зі storage.

• Repository відповідає за data access.

• Service відповідає за business logic.

• Controller відповідає за request/response або interaction layer.

• Dependency — об'єкт, який потрібен Service для роботи.

• Dependency Injection — передавання dependency ззовні.

• Constructor Injection — передавання dependency через constructor.

• Stateful Service має власний state.

• Stateless Service не зберігає власний mutable state.

• Separation of Concerns допомагає розділяти різні responsibilities.

• Single Responsibility Principle допомагає не перетворювати Service на "God Class".

• High cohesion означає, що Service займається близькими за змістом задачами.

• Low coupling означає мінімальну залежність між компонентами.

• Services можуть використовувати інші Services.

• Services можуть використовувати Repository.

• Services особливо корисні в applications, де business logic стає складнішою.

• У маленькому application Service Layer може бути зайвим.

• Не потрібно створювати class тільки заради OOP.

• Не потрібно використовувати inheritance для Services без реальної потреби.

• Composition та Dependency Injection часто є кращим способом побудови Services.

---

# Коротка модель для запам'ятовування

    APPLICATION
         │
         ▼
    UI / CONTROLLER
         │
         ▼
      SERVICE
         │
         │ business logic
         ▼
     REPOSITORY
         │
         ▼
    DATABASE / API


Головна ідея:

    UI
     ↓
    "Що зробити?"
     ↓
    Service
     ↓
    "Як це зробити за business rules?"
     ↓
    Repository / API
     ↓
    "Де взяти або зберегти data?"

Service =

    Business Logic
         +
    Responsibility
         +
    Encapsulation
         +
    Reusability
         +
    Testability