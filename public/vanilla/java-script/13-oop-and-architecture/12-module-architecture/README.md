# 12. Module Architecture

Module Architecture (модульна архітектура) — підхід до організації JavaScript application, за якого код поділяється на окремі modules з чіткими відповідальностями, public API та залежностями.

Основна ідея:

    Application
         │
         ├── Module A
         │
         ├── Module B
         │
         ├── Module C
         │
         └── Module D

Кожен module:

    ├── має власну відповідальність
    ├── приховує internal implementation
    ├── експортує необхідний public API
    └── може використовувати інші modules

Мета:

    Large Application
          │
          ▼
    Small Independent Modules
          │
          ▼
    Maintainable Architecture

---

### Ключові поняття

✔ module  
✔ modularity  
✔ module architecture  
✔ ES Modules  
✔ `import`  
✔ `export`  
✔ named export  
✔ default export  
✔ public API  
✔ internal implementation  
✔ dependency  
✔ dependency graph  
✔ module boundary  
✔ separation of concerns  
✔ cohesion  
✔ coupling  
✔ dependency direction  
✔ circular dependency  
✔ barrel file  
✔ feature module  
✔ shared module  
✔ core module  
✔ service module  
✔ repository module  
✔ adapter  
✔ composition root  
✔ layered architecture  
✔ module responsibility  
✔ encapsulation  
✔ maintainability  
✔ scalability  

---

### Що потрібно пам'ятати

• Module — окрема частина application з певною відповідальністю.

• Module architecture дозволяє розділити великий application на менші логічні частини.

• ES Modules використовують `import` та `export`.

• Module повинен експортувати тільки те, що потрібно зовнішньому коду.

• Internal implementation краще залишати всередині module.

• Public API module — це його exported interface.

• Хороший module має одну чітку responsibility.

• Module повинен мати високу cohesion.

• Module architecture допомагає зменшити coupling.

• Залежності між modules утворюють dependency graph.

• Напрямок залежностей має бути зрозумілим.

• Circular dependencies можуть ускладнювати architecture.

• Не потрібно експортувати всі internal functions.

• Не кожен файл повинен бути окремим module на architectural level.

• Module boundary — важлива архітектурна межа.

• Modules можуть бути організовані за technical layer або за feature.

• Для великих applications feature-based architecture часто зручніша.

• `index.js` може виступати як public API module, але barrel files потрібно використовувати обережно.

• Module architecture — це не просто розбиття коду на файли.

---

# Що таке Module

Module — окрема частина програми, яка:

    ├── має власний code
    ├── має власну responsibility
    ├── може мати internal implementation
    └── має public API

Наприклад:

    user/
      │
      ├── user.service.js
      ├── user.repository.js
      └── index.js

Можна розглядати:

    user/
      ↓
    User Module

---

# Найпростіший Module

Файл:

    math.js

Код:

    export function add(a, b) {
      return a + b;
    }

Інший файл:

    app.js

Код:

    import { add } from "./math.js";

    console.log(add(2, 3));

Module:

    math.js

Public API:

    add()

---

# Import / Export

Export:

    export function add(a, b) {
      return a + b;
    }

Import:

    import { add } from "./math.js";

Модель:

    math.js
       │
       │ export
       ▼
      add
       │
       │ import
       ▼
    app.js

---

# Named Export

Named export:

    export function add(a, b) {
      return a + b;
    }

    export function subtract(a, b) {
      return a - b;
    }

Import:

    import {
      add,
      subtract
    } from "./math.js";

Перевага:

    Module
      │
      ├── add
      └── subtract

Зовнішній код явно вибирає необхідні exports.

---

# Default Export

Module:

    export default class UserService {
      // ...
    }

Import:

    import UserService
      from "./user-service.js";

Default export дозволяє module мати основний export.

---

# Named vs Default Export

### Named

    export function add() {}

Import:

    import { add }
      from "./math.js";

---

### Default

    export default function add() {}

Import:

    import add
      from "./math.js";

---

### Що вибрати?

Для одного очевидного main value:

    default export

Для кількох public values:

    named exports

Головне — consistency у project.

---

# Module Boundary

Module boundary — межа між internal implementation та external code.

Модель:

    ┌─────────────────────────────┐
    │          Module             │
    │                             │
    │   Internal Implementation   │
    │                             │
    │   ┌─────────────────────┐   │
    │   │ private logic       │   │
    │   │ helpers             │   │
    │   │ internal state      │   │
    │   └─────────────────────┘   │
    │              │              │
    │              ▼              │
    │         Public API          │
    └──────────────┬──────────────┘
                   │
                   ▼
             External Code

Зовнішній код повинен працювати через public API module.

---

# Public API Module

Наприклад:

    user/
      │
      ├── user.service.js
      ├── user.repository.js
      ├── user.validator.js
      └── index.js

`index.js` може визначати public API:

    export {
      UserService
    } from "./user.service.js";

Зовнішній код:

    import {
      UserService
    } from "./user/index.js";

Зовнішньому коду не потрібно знати:

    user.repository.js
    user.validator.js

---

# Internal Implementation

Наприклад:

    // user.service.js

    function normalizeName(name) {
      return name.trim();
    }

    export class UserService {
      createUser(name) {
        const normalized =
          normalizeName(name);

        // ...
      }
    }

`normalizeName()` не export.

Тому він залишається internal implementation.

Public:

    UserService

Private module-level implementation:

    normalizeName()

---

# Module Encapsulation

Module architecture також реалізує encapsulation.

Модель:

    Module
      │
      ├── Internal
      │    ├── helper
      │    ├── validation
      │    └── implementation
      │
      └── Public
           └── API

External code бачить тільки public API.

---

# Module vs File

Не кожен file автоматично є хорошим architectural module.

Наприклад:

    utils.js

може містити:

    formatDate()
    formatPrice()
    validateUser()
    sendEmail()
    createToken()

Технічно це module.

Але architectural responsibility незрозуміла.

Краще:

    date/
      format-date.js

    price/
      format-price.js

    user/
      validate-user.js

    auth/
      create-token.js

    notification/
      send-email.js

Module повинен мати логічну responsibility.

---

# Single Responsibility

Module бажано мати одну основну responsibility.

Погано:

    user.js

містить:

    database
    validation
    email
    authentication
    logging
    formatting

Краще:

    user/
      │
      ├── user.service.js
      ├── user.repository.js
      ├── user.validator.js
      └── user.mapper.js

Кожна частина має свою responsibility.

---

# Separation of Concerns

Module architecture допомагає розділити concerns.

Наприклад:

    User Module
        │
        ├── Service
        │
        ├── Repository
        │
        ├── Validator
        │
        └── Mapper

Модель:

    Business Logic
         │
         ▼
       Service
         │
         ▼
     Repository
         │
         ▼
      Database

Кожен layer/module виконує свою роль.

---

# Cohesion

Cohesion — наскільки добре code всередині module пов'язаний однією responsibility.

High cohesion:

    user/
      │
      ├── user.service.js
      ├── user.repository.js
      ├── user.validator.js
      └── user.mapper.js

Все пов'язано з:

    User

Low cohesion:

    common/
      │
      ├── sendEmail.js
      ├── calculateTax.js
      ├── parseCsv.js
      ├── createUser.js
      └── resizeImage.js

Занадто багато unrelated responsibilities.

Мета:

    High Cohesion

---

# Coupling

Coupling — рівень залежності одного module від іншого.

High coupling:

    Module A
       │
       ├── depends on B
       ├── depends on C
       ├── depends on D
       └── depends on E

Low coupling:

    Module A
       │
       ▼
    Small Contract
       │
       ▼
    Module B

Мета:

    High Cohesion
          +
    Low Coupling

---

# Dependency

Якщо один module імпортує інший:

    import { UserService }
      from "./user.service.js";

то:

    Current Module
          │
          ▼
    UserService Module

Current module має dependency:

    UserService

---

# Dependency Graph

Залежності можна представити як graph.

    App
     │
     ├── UserService
     │      │
     │      └── UserRepository
     │
     └── AuthService
            │
            └── UserRepository

Модель:

    App
    │
    ├── UserService
    │      ↓
    │   Repository
    │
    └── AuthService
           ↓
       Repository

Такий graph допомагає розуміти architecture.

---

# Dependency Direction

Напрямок dependencies повинен бути логічним.

Наприклад:

    UI
     │
     ▼
    Application
     │
     ▼
    Domain
     │
     ▼
    Infrastructure

Погано, якщо:

    Domain
       │
       ▼
      UI

Domain не повинен залежати від конкретного UI.

---

# Circular Dependency

Circular dependency:

    Module A
       │
       ▼
    Module B
       │
       ▼
    Module A

Наприклад:

    user.js
      ↓
    auth.js
      ↓
    user.js

Це створює cycle.

Проблеми:

    • складні dependency graph
    • складніше тестування
    • складніше розуміти code
    • potential initialization problems
    • сильніший coupling

Краще:

    A ─────► C ◄───── B

винести спільну responsibility у третій module.

---

# Як уникати Circular Dependencies

Погано:

    User
      ↕
    Auth

Краще:

    User ──► Identity
    Auth ──► Identity

Або:

    User
      │
      ▼
    Common Contract
      ▲
      │
    Auth

Ще один варіант:

    User
      │
      ▼
    Service
      │
      ▼
    Auth

Потрібно визначити правильний direction dependency.

---

# Feature-based Architecture

Для великих applications modules можна організовувати за features.

Наприклад:

    src/
      │
      ├── users/
      │
      ├── products/
      │
      ├── orders/
      │
      └── auth/

Кожен feature має власний code.

---

# Feature Module

Наприклад:

    users/
      │
      ├── user.service.js
      ├── user.repository.js
      ├── user.validator.js
      ├── user.mapper.js
      └── index.js

Це:

    User Module

Його responsibility:

    User-related functionality

---

# Technical Layer Architecture

Інший підхід:

    src/
      │
      ├── controllers/
      ├── services/
      ├── repositories/
      ├── validators/
      └── utils/

Наприклад:

    controllers/
      user.controller.js
      product.controller.js

    services/
      user.service.js
      product.service.js

Це layer-based architecture.

---

# Feature vs Layer

### Feature-based

    users/
      service
      repository
      validator

    products/
      service
      repository
      validator

---

### Layer-based

    services/
      user
      product

    repositories/
      user
      product

---

### Feature-based модель

    users
      │
      ├── service
      ├── repository
      └── validator

---

### Layer-based модель

    service
      │
      ├── user
      └── product

Для великих applications feature-based структура часто краще локалізує code feature.

---

# Hybrid Architecture

Можна комбінувати обидва підходи.

Наприклад:

    src/
      │
      ├── features/
      │    ├── users/
      │    ├── products/
      │    └── orders/
      │
      ├── shared/
      │
      └── core/

Feature:

    users/
      │
      ├── application/
      ├── domain/
      └── infrastructure/

Це вже більш масштабована architecture.

---

# Core Module

Core module містить базову application infrastructure.

Наприклад:

    core/
      │
      ├── config/
      ├── errors/
      ├── logger/
      └── http/

Інші modules можуть залежати від core.

Модель:

    Features
       │
       ▼
      Core

Core не повинен залежати від конкретних features без вагомої причини.

---

# Shared Module

Shared module містить справді спільний code.

Наприклад:

    shared/
      │
      ├── constants/
      ├── helpers/
      ├── types/
      └── utilities/

Але:

    shared/

не повинен перетворитися на "everything folder".

Погано:

    shared/
      │
      ├── userLogic.js
      ├── paymentLogic.js
      ├── orderLogic.js
      └── randomHelper.js

Shared повинен містити code, який реально shared.

---

# Barrel File

Barrel file — module, який re-exportує інші exports.

Наприклад:

    users/
      │
      ├── user.service.js
      ├── user.repository.js
      └── index.js

`index.js`:

    export {
      UserService
    } from "./user.service.js";

    export {
      UserRepository
    } from "./user.repository.js";

Тепер:

    import {
      UserService,
      UserRepository
    } from "./users/index.js";

Замість:

    import {
      UserService
    } from "./users/user.service.js";

    import {
      UserRepository
    } from "./users/user.repository.js";

---

# Barrel File як Public API

Barrel file може створити public boundary:

    users/
      │
      ├── internal/
      │
      ├── user.service.js
      ├── user.repository.js
      └── index.js
              │
              ▼
          Public API

Зовнішній code:

    import {
      UserService
    } from "./users/index.js";

Це приховує internal structure.

---

# Barrel File Problems

Barrel files не завжди корисні.

Надмірне використання може:

    • ускладнювати dependency graph
    • створювати circular dependencies
    • ускладнювати debugging
    • створювати зайві re-exports

Тому:

    Use barrels intentionally.

Не потрібно створювати:

    index.js

для кожної дрібної папки без необхідності.

---

# Module API

Хороший module має маленький public API.

Наприклад:

    user/
      │
      ├── internal
      │    ├── normalize.js
      │    └── validate.js
      │
      ├── user.service.js
      └── index.js

Public API:

    UserService

Internal:

    normalize()
    validate()

Модель:

    Small Public API
          │
          ▼
    Hidden Implementation

---

# API Surface

API surface — кількість functionality, яку module відкриває зовнішньому коду.

Великий API:

    export A
    export B
    export C
    export D
    export E
    export F
    export G

Малий API:

    export UserService

Зазвичай менший API:

    ↓
less coupling
    ↓
easier maintenance

---

# Information Hiding

Module architecture добре реалізує information hiding.

Наприклад:

    payment/
      │
      ├── payment.service.js
      ├── payment.validator.js
      ├── payment.gateway.js
      └── index.js

Зовнішній code:

    payment.pay(amount);

Не повинен знати:

    validation details
    gateway details
    internal transformation

Module приховує implementation.

---

# Module Responsibility

Перед створенням module потрібно поставити питання:

    What is this module responsible for?

Наприклад:

    users/

Відповідь:

    User-related operations.

Погано:

    users/
    "Everything related to application"

Responsibility повинна бути конкретною.

---

# Module Naming

Назва module повинна пояснювати responsibility.

Добре:

    users/
    products/
    authentication/
    payments/
    notifications/

Погано:

    stuff/
    helpers/
    misc/
    common/
    utils/

без чіткої причини.

---

# `utils` Problem

Папка:

    utils/

часто стає dumping ground.

Спочатку:

    utils/
      formatDate.js

Пізніше:

    utils/
      formatDate.js
      validateUser.js
      sendEmail.js
      calculatePrice.js
      createToken.js
      fetchData.js
      parseCsv.js

Виникає проблема:

    What is the responsibility
    of utils?

Краще розміщувати code за domain responsibility.

---

# Example: Better Structure

Замість:

    utils/
      formatDate.js
      validateUser.js
      sendEmail.js

Краще:

    date/
      formatDate.js

    users/
      validateUser.js

    notifications/
      sendEmail.js

Тепер dependencies та responsibilities очевидніші.

---

# Service Module

Service module містить application/business operations.

Наприклад:

    user.service.js

    export class UserService {
      constructor(repository) {
        this.repository = repository;
      }

      createUser(data) {
        // business logic
      }

      getUser(id) {
        return this.repository.findById(id);
      }
    }

Public API:

    UserService

Internal details:

    business logic

---

# Repository Module

Repository module відповідає за data access.

    user.repository.js

    export class UserRepository {
      findById(id) {
        // database query
      }

      save(user) {
        // database query
      }
    }

Service:

    UserService
         │
         ▼
    UserRepository
         │
         ▼
    Database

Service не повинен містити SQL/database details.

---

# Validator Module

Validator module відповідає за validation.

    user.validator.js

    export function validateUser(data) {
      if (!data.name) {
        throw new Error(
          "Name is required"
        );
      }
    }

Service:

    import {
      validateUser
    } from "./user.validator.js";

    validateUser(data);

Responsibility:

    validation

---

# Mapper Module

Mapper module відповідає за transformation між models.

Наприклад:

    user.mapper.js

    export function toUserDto(user) {
      return {
        id: user.id,
        name: user.name
      };
    }

Модель:

    Database Model
          │
          ▼
       Mapper
          │
          ▼
       DTO

Mapper приховує transformation logic.

---

# Adapter Module

Adapter module адаптує external API до внутрішнього interface.

Наприклад:

    payment/
      │
      ├── payment.service.js
      └── stripe.adapter.js

Adapter:

    export class StripeAdapter {
      pay(amount) {
        // Stripe API
      }
    }

Service:

    class PaymentService {
      constructor(provider) {
        this.provider = provider;
      }

      pay(amount) {
        return this.provider.pay(amount);
      }
    }

Common interface:

    pay()

---

# Module Composition

Modules потрібно зібрати в application.

Наприклад:

    const userRepository =
      new UserRepository();

    const userService =
      new UserService(
        userRepository
      );

Модель:

    Repository
         │
         ▼
    Service
         │
         ▼
    Application

Це називається composition.

---

# Composition Root

Composition root — місце, де dependencies application створюються та з'єднуються.

Наприклад:

    const repository =
      new UserRepository();

    const service =
      new UserService(repository);

    const controller =
      new UserController(service);

Модель:

    Composition Root
          │
      ┌───┼────┐
      ▼   ▼    ▼
    Repo Service Controller

Це дозволяє не створювати dependencies хаотично всередині кожного module.

---

# Dependency Injection

Module architecture добре працює з Dependency Injection.

Наприклад:

    class UserService {
      constructor(repository) {
        this.repository = repository;
      }
    }

Service не створює repository сам:

    ❌

    this.repository =
      new UserRepository();

Dependency передається:

    ✓

    new UserService(
      repository
    );

Це зменшує coupling.

---

# Dependency Injection + Modules

Структура:

    users/
      │
      ├── user.service.js
      └── user.repository.js

Composition:

    const repository =
      new UserRepository();

    const service =
      new UserService(
        repository
      );

Module:

    UserService

залежить від contract:

    repository

а не обов'язково від конкретної implementation.

---

# Module Architecture Example

Невеликий application:

    src/
      │
      ├── users/
      │    ├── user.service.js
      │    ├── user.repository.js
      │    ├── user.validator.js
      │    └── index.js
      │
      ├── products/
      │    ├── product.service.js
      │    ├── product.repository.js
      │    └── index.js
      │
      ├── orders/
      │    ├── order.service.js
      │    ├── order.repository.js
      │    └── index.js
      │
      └── app.js

Application:

    app.js
      │
      ├── users
      ├── products
      └── orders

---

# Feature Module Example

    users/
      │
      ├── application/
      │    └── user.service.js
      │
      ├── domain/
      │    └── user.js
      │
      ├── infrastructure/
      │    └── user.repository.js
      │
      └── index.js

Модель:

    User Module
         │
    ┌────┼────────────┐
    ▼    ▼            ▼
 Domain Application Infrastructure

Це вже ближче до scalable architecture.

---

# Domain Module

Domain module містить domain rules.

Наприклад:

    class User {
      constructor(name) {
        this.name = name;
      }

      changeName(name) {
        // domain rules
      }
    }

Domain не повинен знати:

    HTTP
    React
    PostgreSQL
    browser DOM

Його responsibility:

    business/domain behavior

---

# Application Module

Application layer координує use cases.

Наприклад:

    class CreateUser {
      constructor(repository) {
        this.repository = repository;
      }

      execute(data) {
        // create user
        // save user
      }
    }

Application layer:

    coordinates operations

---

# Infrastructure Module

Infrastructure містить технічні implementations.

Наприклад:

    infrastructure/
      │
      ├── postgres/
      ├── http/
      ├── filesystem/
      └── external-api/

Infrastructure може реалізувати contracts, необхідні application/domain.

---

# Layered Module Architecture

Можна побудувати:

    Presentation
         │
         ▼
    Application
         │
         ▼
      Domain
         │
         ▼
    Infrastructure

Наприклад:

    Controller
        │
        ▼
    UserService
        │
        ▼
    User
        │
        ▼
    Repository

---

# Dependency Rule

Важливий принцип:

    Dependencies should have
    an intentional direction.

Наприклад:

    Presentation
         ↓
    Application
         ↓
    Domain

Infrastructure може бути підключена через abstractions/contracts.

Не потрібно дозволяти modules імпортувати будь-що з будь-якого місця.

---

# Public vs Internal Modules

У великому module:

    users/
      │
      ├── public/
      │
      └── internal/

Наприклад:

    users/
      │
      ├── user.service.js
      ├── user.repository.js
      ├── user.validator.js
      └── index.js

Public:

    UserService

Internal:

    UserRepository
    validator
    helpers

Це дозволяє контролювати module boundary.

---

# Avoid Deep Imports

Погано:

    import {
      validateUser
    } from
      "./users/internal/validation/user-validator.js";

Зовнішній code знає internal structure.

Краще:

    import {
      UserService
    } from "./users/index.js";

Module сам контролює public API.

---

# Stable Module API

Якщо external code використовує:

    users/index.js

то internal structure можна змінювати.

Було:

    users/
      user.service.js

Пізніше:

    users/
      application/
        user.service.js

External code:

    import {
      UserService
    } from "./users/index.js";

може залишитися без змін.

Це перевага module boundary.

---

# Refactoring без зміни Public API

Було:

    users/
      user.service.js
      index.js

Потім:

    users/
      application/
        user.service.js
      domain/
        user.js
      infrastructure/
        user.repository.js
      index.js

`index.js`:

    export {
      UserService
    } from
      "./application/user.service.js";

External code все ще:

    import {
      UserService
    } from "./users/index.js";

Public API стабільний.

Internal architecture змінилася.

---

# Module Contracts

Module contract визначає:

    What external code can expect.

Наприклад:

    UserRepository

contract:

    findById(id)
    save(user)

Implementation:

    PostgresUserRepository

або:

    MemoryUserRepository

Service залежить від contract.

---

# Module Contract + Polymorphism

    UserService
         │
         ▼
    Repository Contract
         │
      ┌──┴────┐
      ▼       ▼
   Postgres  Memory

Різні modules реалізують common behavior.

Це поєднання:

    Module Architecture
          +
    Polymorphism
          +
    Dependency Injection

---

# Module Architecture + Encapsulation

Encapsulation:

    Hide internal state
    and implementation.

Module architecture:

    Hide internal module structure
    and implementation.

Модель:

    Application
         │
         ▼
    Module Public API
         │
         ▼
    Internal Modules
         │
         ▼
    Internal Implementation

Module boundary — архітектурна форма encapsulation.

---

# Module Architecture + Polymorphism

Наприклад:

    payment/
      │
      ├── payment.service.js
      ├── card.adapter.js
      ├── paypal.adapter.js
      └── index.js

Public:

    PaymentService

Internal implementations:

    CardAdapter
    PayPalAdapter

Service працює через common contract:

    pay()

---

# Module Architecture + Composition

Модель:

    Module A
       │
       ▼
    Module B
       │
       ▼
    Module C

Або:

    Application
      │
      ├── Users
      ├── Products
      └── Orders

Кожен module має:

    responsibility
    public API
    dependencies

---

# Module Architecture + Testing

Добре ізольовані modules легше тестувати.

Наприклад:

    UserService
         │
         ▼
    Repository Contract
         │
         ▼
    MockRepository

Test може використовувати mock:

    class MockRepository {
      findById(id) {
        return {
          id,
          name: "Test User"
        };
      }
    }

Тоді:

    const service =
      new UserService(
        new MockRepository()
      );

Module ізольований від real database.

---

# Module Architecture + Reusability

Добре спроектований module можна повторно використовувати.

Наприклад:

    date/
      format-date.js

Можна використовувати:

    users/
    orders/
    reports/

Але reuse не повинен бути головною метою кожного module.

Спочатку:

    clear responsibility

потім:

    reuse where appropriate

---

# Module Architecture + Maintainability

Без modular architecture:

    app.js
       │
       └── 5000 lines

З modular architecture:

    app/
      │
      ├── users/
      ├── products/
      ├── orders/
      ├── payments/
      └── notifications/

Розробник може працювати з окремим module.

Це спрощує:

    reading
    debugging
    testing
    refactoring
    collaboration

---

# Module Architecture + Scalability

Малий application:

    src/
      ├── users.js
      ├── products.js
      └── orders.js

Зі зростанням:

    src/
      │
      ├── users/
      │
      ├── products/
      │
      ├── orders/
      │
      ├── payments/
      │
      └── notifications/

Ще більший:

    src/
      │
      ├── features/
      ├── core/
      ├── shared/
      └── infrastructure/

Architecture може еволюціонувати разом із application.

---

# Module Architecture у Browser JavaScript

HTML:

    <script
      type="module"
      src="./app.js">
    </script>

`app.js`:

    import {
      createUser
    } from "./users.js";

    createUser("Valeriy");

Browser підтримує ES Modules через:

    type="module"

---

# Module Architecture у Node.js

У сучасному Node.js можна використовувати ES Modules.

Наприклад:

    // package.json

    {
      "type": "module"
    }

Тоді:

    import { add }
      from "./math.js";

    export function multiply(a, b) {
      return a * b;
    }

Також Node.js підтримує CommonJS:

    const module =
      require("./module");

    module.exports = {};

Для сучасного JavaScript краще розуміти обидві системи, але ES Modules є стандартним JavaScript module system.

---

# ES Modules: Static Imports

Наприклад:

    import {
      UserService
    } from "./user.service.js";

Imports визначаються статично.

Це дозволяє tooling аналізувати:

    dependency graph

До запуску application bundler може бачити:

    App
     │
     ├── UserService
     └── AuthService

---

# Dynamic Import

JavaScript також підтримує dynamic import:

    const module =
      await import("./feature.js");

Це корисно для:

    lazy loading
    code splitting
    optional features
    dynamic modules

Наприклад:

    async function loadFeature() {
      const module =
        await import("./feature.js");

      module.run();
    }

---

# Static vs Dynamic Import

### Static

    import {
      run
    } from "./feature.js";

Залежність відома наперед.

---

### Dynamic

    const module =
      await import("./feature.js");

Module завантажується під час виконання.

---

# Tree Shaking

ES Modules дозволяють bundlers аналізувати exports.

Наприклад:

    export function add() {}

    export function subtract() {}

Якщо application використовує тільки:

    add()

bundler може видалити невикористаний code у production build.

Це називається:

    tree shaking

Але ефективність залежить від bundler та способу побудови modules.

---

# Module Side Effects

Module може виконувати code під час import.

Наприклад:

    console.log("Module loaded");

    export function run() {}

Це side effect.

Потрібно обережно використовувати modules із непередбачуваними side effects.

Краще:

    import module

не повинен без потреби:

    змінювати global state
    запускати application logic
    створювати hidden dependencies

---

# Pure Module

Бажаний підхід:

    module
      │
      ├── exports functions/classes
      │
      └── minimal side effects

Наприклад:

    export function add(a, b) {
      return a + b;
    }

Import цього module не змінює зовнішній state.

Такі modules легше тестувати та повторно використовувати.

---

# Global Variables vs Modules

Погано:

    window.userService = ...
    window.api = ...
    window.utils = ...

Виникає:

    global namespace pollution

Краще:

    export
    import

Модель:

    Module A
       │
       ▼
    Explicit Import
       │
       ▼
    Module B

Dependencies стають явними.

---

# Explicit Dependencies

Погано:

    function UserService() {
      return window.database.query(...);
    }

Dependency прихована.

Краще:

    import {
      database
    } from "./database.js";

Тепер dependency очевидна.

Ще краще для testing:

    class UserService {
      constructor(database) {
        this.database = database;
      }
    }

Dependency передається явно.

---

# Hidden Dependencies

Погано:

    import "./config.js";

    function createUser() {
      return globalConfig.apiUrl;
    }

Function залежить від global state.

Краще:

    function createUser(config) {
      return config.apiUrl;
    }

Або dependency injection через module composition.

---

# Module Dependency Rules

Корисні правила:

    1. Module має чітку responsibility.

    2. Module має мінімальний public API.

    3. Internal implementation не export без необхідності.

    4. Dependencies повинні бути явними.

    5. Уникати circular dependencies.

    6. Не створювати global dependencies.

    7. Не дозволяти modules залежати від internal details інших modules.

    8. Визначати чіткий dependency direction.

    9. Shared code повинен бути справді shared.

    10. Public API повинен бути стабільним.

---

# Приклад поганої Architecture

    src/
      │
      ├── utils.js
      ├── helpers.js
      ├── common.js
      ├── app.js
      └── data.js

`app.js` імпортує все:

    app.js
      │
      ├── utils
      ├── helpers
      ├── common
      └── data

Проблема:

    unclear responsibilities
    high coupling
    difficult navigation
    difficult testing

---

# Приклад кращої Architecture

    src/
      │
      ├── users/
      │    ├── user.service.js
      │    ├── user.repository.js
      │    └── index.js
      │
      ├── products/
      │    ├── product.service.js
      │    ├── product.repository.js
      │    └── index.js
      │
      ├── orders/
      │    ├── order.service.js
      │    ├── order.repository.js
      │    └── index.js
      │
      └── app.js

Тепер architecture відображає domain.

---

# Module Dependency Graph Example

    app
     │
     ├──────────────┐
     ▼              ▼
    users        products
     │              │
     ▼              ▼
    repository   repository
     │              │
     └──────┬───────┘
            ▼
        database

Залежності зрозумілі.

---

# Feature Boundary

Уявімо:

    users/
      │
      ├── service
      ├── repository
      └── validator

Інший feature:

    orders/
      │
      ├── service
      ├── repository
      └── validator

Orders не повинен напряму використовувати internal code:

    users/internal/...

Краще:

    users/index.js

та public API.

---

# Cross-module Communication

Modules можуть взаємодіяти через public API.

Наприклад:

    orders/
        │
        ▼
    users/
        │
        ▼
    UserService

Orders не знає internal implementation users.

Модель:

    Orders Module
         │
         ▼
    Users Public API
         │
         ▼
    Users Internal Implementation

---

# Event-based Communication

Іноді modules можуть взаємодіяти через events.

Наприклад:

    User Module
         │
         │ UserCreated
         ▼
    Event Bus
         │
      ┌──┴───┐
      ▼      ▼
    Email   Analytics

Це зменшує direct coupling.

Але event architecture також додає complexity.

Тому використовувати її потрібно тоді, коли вона справді потрібна.

---

# Direct Dependency vs Event

### Direct dependency

    Order
      │
      ▼
    UserService

Проста і зрозуміла dependency.

---

### Event

    Order
      │
      ▼
    Event Bus
      │
      ├── Email
      └── Analytics

Менше direct coupling, але більше architectural complexity.

---

# Module Architecture Trade-offs

Modularity має переваги:

    + maintainability
    + testability
    + separation of concerns
    + encapsulation
    + reusability
    + scalability

Але має і недоліки:

    - більше files
    - більше imports
    - складніший dependency graph
    - більше architectural decisions
    - можливий overengineering

Тому:

    Modularity ≠ maximum number of files.

---

# Over-modularization

Погано:

    user-name/
      index.js

    user-age/
      index.js

    user-email/
      index.js

    user-id/
      index.js

Занадто дрібні modules можуть ускладнити navigation.

Краще групувати code за meaningful responsibility.

---

# Правило для Module

Перед створенням module запитай:

    Does this boundary
    make the code easier to understand?

Якщо ні:

    можливо module зайвий.

---

# Module Architecture Checklist

Перед створенням module:

    1. Яка його responsibility?

    2. Який його public API?

    3. Що повинно залишатися internal?

    4. Від яких modules він залежить?

    5. Хто залежить від нього?

    6. Чи є dependency direction логічним?

    7. Чи створюється circular dependency?

    8. Чи достатньо маленький public API?

    9. Чи висока cohesion?

    10. Чи низький coupling?

    11. Чи не є module надто generic?

    12. Чи не є module надто маленьким?

    13. Чи легко його тестувати?

    14. Чи можна змінити implementation
        без зміни external code?

---

# Типові помилки

❌ Вважати module architecture просто розбиттям code на files.

❌ Створювати module без чіткої responsibility.

❌ Експортувати всі internal functions.

❌ Дозволяти deep imports у internal structure.

❌ Створювати circular dependencies.

❌ Використовувати `utils/` як dumping ground.

❌ Створювати величезний `common` module.

❌ Створювати надто багато дрібних modules.

❌ Використовувати barrel files без необхідності.

❌ Створювати hidden global dependencies.

❌ Дозволяти будь-якому module імпортувати будь-який інший module.

❌ Змішувати UI, business logic та database code в одному module.

❌ Створювати module лише заради "чистої структури".

❌ Робити architecture складнішою, ніж application.

❌ Порушувати dependency direction.

❌ Залежати від internal implementation іншого module.

---

# Питання зі співбесіди

Що таке module?

Що таке module architecture?

Навіщо потрібна modular architecture?

Що таке ES Module?

Що роблять `import` та `export`?

Яка різниця між named export та default export?

Що таке public API module?

Що таке module boundary?

Що таке internal implementation?

Що таке dependency?

Що таке dependency graph?

Що таке dependency direction?

Що таке circular dependency?

Як уникати circular dependencies?

Що таке cohesion?

Що таке coupling?

Чим high cohesion відрізняється від low cohesion?

Що таке feature-based architecture?

Що таке layer-based architecture?

Яка різниця між feature-based та layer-based architecture?

Що таке barrel file?

Які проблеми можуть створювати barrel files?

Що таке dynamic import?

Що таке tree shaking?

Що таке module side effect?

Що таке composition root?

Як module architecture пов'язана з Dependency Injection?

Як module architecture пов'язана з encapsulation?

Як module architecture пов'язана з polymorphism?

Як організувати modules у великому JavaScript application?

Як приховати internal implementation module?

Як зменшити coupling між modules?

Що таке stable module API?

Як правильно організувати shared code?

Чому `utils/` може стати проблемою?

Коли module є надто великим?

Коли module є надто маленьким?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке module.

Що таке modularity.

ES Modules.

`import`.

`export`.

Named exports.

Default export.

Module boundary.

Public API.

Internal implementation.

Module responsibility.

Dependencies.

Dependency graph.

Separation of concerns.

---

🔵 Junior

Cohesion.

Coupling.

Feature modules.

Layer modules.

Shared modules.

Core modules.

Barrel files.

Dynamic imports.

Circular dependencies.

Explicit dependencies.

Encapsulation через modules.

Public vs internal API.

Module side effects.

---

🟠 Middle

Feature-based architecture.

Layered architecture.

Hybrid architecture.

Dependency direction.

Dependency Injection.

Composition root.

Repository modules.

Service modules.

Adapter modules.

Validator modules.

Mapper modules.

Stable module contracts.

Polymorphism between modules.

Module testing.

Reducing cross-module coupling.

---

🔴 Senior

Module boundaries at application scale.

Architecture dependency rules.

Domain modules.

Application modules.

Infrastructure modules.

Dependency inversion.

Stable public APIs.

Internal vs external contracts.

Feature isolation.

Cross-module communication.

Event-based module communication.

Architecture evolution.

Modular monolith.

Plugin-style architecture.

Trade-offs між modularity та complexity.

---

# Міні-шпаргалка

Module:

    MODULE
       │
       ├── Internal Implementation
       │
       └── Public API
                │
                ▼
          External Code

---

# Import / Export

    module-a.js

    export function run() {
      // ...
    }

    module-b.js

    import { run }
      from "./module-a.js";

    run();

---

# Module Boundary

    ┌─────────────────────┐
    │       MODULE        │
    │                     │
    │     INTERNAL        │
    │        │            │
    │        ▼            │
    │    PUBLIC API       │
    └─────────┬───────────┘
              │
              ▼
       EXTERNAL CODE

---

# Public API

    Module
      │
      ├── Internal
      │    ├── helper
      │    ├── validator
      │    └── implementation
      │
      └── Public
           └── Service

---

# Dependency

    Module A
       │
       │ import
       ▼
    Module B

A залежить від B.

---

# Dependency Graph

    App
     │
     ├── Users
     │     └── Repository
     │
     └── Orders
           └── Repository

---

# Good Dependency Direction

    Presentation
         │
         ▼
    Application
         │
         ▼
      Domain
         │
         ▼
    Infrastructure

---

# Circular Dependency

    A
    │
    ▼
    B
    │
    ▼
    A

Avoid unnecessary cycles.

---

# Cohesion + Coupling

    GOOD MODULE

    High Cohesion
          +
    Low Coupling
          ↓
    Maintainable Code

---

# Feature Architecture

    src/
      │
      ├── users/
      │    ├── service
      │    ├── repository
      │    └── validator
      │
      ├── products/
      │    ├── service
      │    ├── repository
      │    └── validator
      │
      └── orders/
           ├── service
           ├── repository
           └── validator

---

# Layer Architecture

    src/
      │
      ├── controllers/
      ├── services/
      ├── repositories/
      ├── validators/
      └── infrastructure/

---

# Hybrid Architecture

    src/
      │
      ├── features/
      │    ├── users/
      │    ├── products/
      │    └── orders/
      │
      ├── core/
      ├── shared/
      └── infrastructure/

---

# Barrel File

    users/
      │
      ├── user.service.js
      ├── user.repository.js
      └── index.js

    index.js

    export {
      UserService
    } from "./user.service.js";

    export {
      UserRepository
    } from "./user.repository.js";

External code:

    import {
      UserService
    } from "./users/index.js";

---

# Service + Repository

    UserService
         │
         ▼
    UserRepository
         │
         ▼
      Database

Service:

    business logic

Repository:

    data access

---

# Adapter

    Application
         │
         ▼
      Adapter
         │
         ▼
    External API

Adapter hides external API details.

---

# Dependency Injection

    Repository
         │
         ▼
      Service
         │
         ▼
    Controller

Dependency передається:

    new UserService(repository)

а не створюється всередині Service.

---

# Composition Root

    Composition Root
          │
      ┌───┼────┐
      ▼   ▼    ▼
    Repo Service Controller

Тут dependencies:

    created
    configured
    connected

---

# Encapsulation + Modules

    Application
         │
         ▼
    Module Public API
         │
         ▼
    Internal Implementation

Module приховує:

    implementation details

---

# Polymorphism + Modules

    Service
       │
       ▼
    Common Contract
       │
    ┌──┴───┐
    ▼      ▼
 Adapter Adapter
    A      B

Same contract:

    pay()

Different implementations.

---

# Головне

• Module architecture — це організація application у логічні modules з чіткими відповідальностями та межами.

• Module — це не просто file.

• Хороший module має одну основну responsibility.

• Public API визначає, що module дозволяє використовувати зовнішньому code.

• Internal implementation повинна залишатися прихованою без необхідності її експортувати.

• `import` та `export` створюють явні dependencies між ES Modules.

• Dependency graph показує зв'язки між modules.

• Dependency direction повинен бути свідомим та зрозумілим.

• Circular dependencies потрібно уникати або свідомо контролювати.

• High cohesion означає, що code module добре пов'язаний однією responsibility.

• Low coupling означає, що module мало залежить від деталей інших modules.

• Хороша architecture прагне:

    High Cohesion
          +
    Low Coupling

• Feature-based architecture групує code за business features.

• Layer-based architecture групує code за technical responsibilities.

• Hybrid architecture може комбінувати обидва підходи.

• `index.js` може використовуватися як public API module.

• Barrel files потрібно використовувати обережно, тому що вони можуть ускладнювати dependency graph.

• Не потрібно створювати величезний `utils` або `common` module.

• Shared module повинен містити тільки справді shared functionality.

• Core module може містити application-wide infrastructure.

• Service module зазвичай координує business/application operations.

• Repository module відповідає за data access.

• Adapter module ізолює external systems.

• Validator module відповідає за validation.

• Mapper module відповідає за transformation.

• Dependency Injection допомагає зменшити coupling між modules.

• Composition root є місцем, де dependencies application створюються та з'єднуються.

• Module architecture добре працює разом із encapsulation.

• Module architecture добре працює разом із polymorphism.

• Common contracts дозволяють різним implementations працювати через один interface.

• Добре спроектований module можна тестувати ізольовано.

• Public API бажано робити маленьким і стабільним.

• External code не повинен залежати від internal structure module.

• Module boundaries дозволяють змінювати internal implementation без масових змін у зовнішньому code.

• Modularity не означає максимальну кількість files.

• Надмірна modularity може призвести до overengineering.

• Architecture повинна допомагати розуміти application, а не ускладнювати його.

---

# Коротка модель для запам'ятовування

    MODULE ARCHITECTURE
             │
             ▼
        APPLICATION
             │
      ┌──────┼──────┐
      ▼      ▼      ▼
    USERS  ORDERS  PAYMENTS
      │      │       │
      ▼      ▼       ▼
    PUBLIC PUBLIC  PUBLIC
     API    API     API
      │      │       │
      ▼      ▼       ▼
   INTERNAL INTERNAL INTERNAL
   LOGIC    LOGIC    LOGIC

Головна ідея:

    Clear Boundaries
          +
    Small Public APIs
          +
    Explicit Dependencies
          +
    High Cohesion
          +
    Low Coupling

---

# Коротка модель Application

    APPLICATION
         │
    ┌────┼─────────┐
    ▼    ▼         ▼
  Users Orders   Payments
    │    │         │
    └────┼─────────┘
         ▼
      Contracts
         │
    ┌────┼────┐
    ▼    ▼    ▼
   DB   API  External Services

---

# Головна формула

    GOOD MODULE
          =
    CLEAR RESPONSIBILITY
          +
    SMALL PUBLIC API
          +
    HIDDEN IMPLEMENTATION
          +
    EXPLICIT DEPENDENCIES
          +
    HIGH COHESION
          +
    LOW COUPLING

---

# Що потрібно запам'ятати в першу чергу

    1. Module

    2. Responsibility

    3. Public API

    4. Internal implementation

    5. import / export

    6. Dependency

    7. Dependency graph

    8. Cohesion

    9. Coupling

    10. Module boundary

    11. Feature-based architecture

    12. Layer-based architecture

    13. Circular dependency

    14. Dependency Injection

    15. Composition root

Ключова фраза:

    A module should hide its
    implementation and expose
    a clear public API.

Модель:

    External Code
         │
         ▼
    Public Module API
         │
         ▼
    Internal Implementation
         │
         ▼
    Dependencies

Мета:

    Small Boundaries
          +
    Clear Responsibilities
          +
    Explicit Dependencies
          ↓
    Maintainable Application