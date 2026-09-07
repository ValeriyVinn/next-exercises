# 09. Composition

Composition — це підхід до побудови objects і classes, коли складний object отримує свою поведінку через **комбінацію інших objects**, а не через глибоку hierarchy inheritance.

Основна ідея:

    "has-a"

замість:

    "is-a"

Наприклад:

    Car
      │
      ├── has an Engine
      ├── has a Transmission
      └── has a GPS

Замість створення великої hierarchy:

    Vehicle
       │
       ├── Car
       │
       └── ElectricCar

можна будувати objects із незалежних components.

---

# Ключові поняття

✔ composition  
✔ object composition  
✔ composition over inheritance  
✔ "has-a" relationship  
✔ "is-a" relationship  
✔ delegation  
✔ delegation pattern  
✔ mixins  
✔ behavior composition  
✔ object composition  
✔ reusable components  
✔ dependency injection  
✔ dependency delegation  
✔ loose coupling  
✔ high cohesion  
✔ inheritance vs composition  
✔ strategy pattern  
✔ service objects  
✔ factories  
✔ functional composition  
✔ class composition  

---

# Що потрібно пам'ятати

• Composition означає складання object із інших objects.

• Основна модель:

    object
      │
      ├── component
      ├── component
      └── component

• Composition описує relationship:

    "has-a"

• Inheritance часто описує:

    "is-a"

• Composition дозволяє комбінувати незалежні behaviors.

• Composition зменшує залежність від inheritance hierarchy.

• Behavior можна передавати object через constructor.

• Object може delegate operation іншому object.

• Composition особливо корисна для великих applications.

• Composition добре працює з dependency injection.

• Composition не означає повну відмову від classes або inheritance.

• У JavaScript composition часто реалізується через ordinary objects і functions.

---

# Що таке Composition

Composition — це створення складного object через об'єднання простіших objects.

Наприклад:

    const engine = {
      start() {
        console.log("Engine started");
      }
    };

    const gps = {
      navigate() {
        console.log("Navigation started");
      }
    };

    const car = {
      engine,
      gps
    };

Тепер:

    car.engine.start();

    car.gps.navigate();

`car` складається з:

    engine
    gps

---

# Mental Model

Composition:

    Component A
         │
         ├──────┐
         │      │
         ▼      ▼
    Component B  Component C
         │      │
         └──┬───┘
            ▼
       Complex Object

Наприклад:

    Engine
       +
    GPS
       +
    AudioSystem
       │
       ▼
      Car

---

# "Has-a" Relationship

Composition зазвичай представляє:

    has-a

Наприклад:

    Car has an Engine.

    User has an Address.

    Order has Items.

    Computer has a Keyboard.

    House has Rooms.

Приклад:

    class Car {
      constructor(engine) {
        this.engine = engine;
      }
    }

Тут:

    Car
      │
      └── has an Engine

---

# "Is-a" Relationship

Inheritance часто представляє:

    is-a

Наприклад:

    Dog is an Animal.

    Cat is an Animal.

    Admin is a User.

Приклад:

    class Animal {}

    class Dog extends Animal {}

Тут:

    Dog
      │
      └── is an Animal

---

# Composition vs Inheritance

Inheritance:

    Animal
       │
       ├── Dog
       ├── Cat
       └── Bird

Composition:

    Dog
     │
     ├── movement
     ├── sound
     └── feeding

У composition behaviors можна комбінувати незалежно.

---

# Чому Composition

Inheritance створює сильний зв'язок:

    Child
      │
      ▼
    Parent

Child залежить від structure та behavior parent.

Composition дозволяє:

    Object
      │
      ├── Behavior A
      ├── Behavior B
      └── Behavior C

Behavior можна замінювати незалежно.

---

# Simple Composition

    const logger = {
      log(message) {
        console.log(message);
      }
    };

    const userService = {
      logger,

      createUser() {
        this.logger.log(
          "Creating user"
        );
      }
    };

Використання:

    userService.createUser();

`userService` використовує `logger`.

Це composition.

---

# Composition через Constructor

У class-based code dependencies часто передаються через constructor.

    class Car {
      constructor(engine) {
        this.engine = engine;
      }

      start() {
        this.engine.start();
      }
    }

Engine:

    class Engine {
      start() {
        console.log(
          "Engine started"
        );
      }
    }

Використання:

    const engine =
      new Engine();

    const car =
      new Car(engine);

    car.start();

Car не створює Engine сам.

Engine передається ззовні.

---

# Composition + Delegation

Composition часто працює разом із delegation.

Наприклад:

    class Car {
      constructor(engine) {
        this.engine = engine;
      }

      start() {
        this.engine.start();
      }
    }

Коли виконується:

    car.start();

Car delegate operation:

    car
      │
      ▼
    engine.start()

Car не реалізує engine behavior сам.

---

# Що таке Delegation

Delegation — це передача responsibility іншому object.

Наприклад:

    class Car {
      constructor(engine) {
        this.engine = engine;
      }

      start() {
        this.engine.start();
      }
    }

Responsibility:

    starting engine

належить:

    Engine

а не:

    Car

Car просто delegate operation.

---

# Composition + Delegation

Це одна з основних моделей:

    Car
     │
     │ owns / has
     ▼
    Engine
     │
     │ performs
     ▼
    start()

Car:

    delegates

Engine:

    performs behavior

---

# Приклад з Audio System

    class AudioSystem {
      play() {
        console.log(
          "Playing music"
        );
      }
    }

    class Car {
      constructor(audioSystem) {
        this.audioSystem =
          audioSystem;
      }

      playMusic() {
        this.audioSystem.play();
      }
    }

Використання:

    const audio =
      new AudioSystem();

    const car =
      new Car(audio);

    car.playMusic();

Car має AudioSystem.

---

# Composition із кількома Components

    class Car {
      constructor(
        engine,
        audioSystem,
        gps
      ) {
        this.engine = engine;
        this.audioSystem =
          audioSystem;
        this.gps = gps;
      }

      start() {
        this.engine.start();
      }

      playMusic() {
        this.audioSystem.play();
      }

      navigate() {
        this.gps.navigate();
      }
    }

Тепер:

    Car
     │
     ├── Engine
     ├── AudioSystem
     └── GPS

---

# Independent Components

Хороші components повинні мати окрему responsibility.

Наприклад:

    Engine
      │
      └── engine behavior

    GPS
      │
      └── navigation behavior

    AudioSystem
      │
      └── audio behavior

    Car
      │
      └── coordinates components

Це сприяє:

    high cohesion

і:

    loose coupling

---

# Composition Over Inheritance

Відомий OOP principle:

    Prefer composition over inheritance.

Це не означає:

    "Never use inheritance."

Це означає:

    "Не використовуй inheritance,
     якщо composition краще описує relationship."

---

# Приклад проблемної Inheritance

Уявімо:

    class Animal {
      walk() {}
      swim() {}
      fly() {}
    }

    class Dog extends Animal {}

    class Bird extends Animal {}

Проблема:

    Dog
      └── fly()

Dog отримує behavior, який йому не потрібен.

Або:

    Bird
      └── swim()

Inheritance може створити неправильні dependencies.

---

# Composition Solution

Замість:

    Animal
       │
       ├── walk
       ├── swim
       └── fly

можна:

    const walker = {
      walk() {
        console.log("Walking");
      }
    };

    const swimmer = {
      swim() {
        console.log("Swimming");
      }
    };

    const flyer = {
      fly() {
        console.log("Flying");
      }
    };

Тепер можна комбінувати behaviors.

---

# Behavior Composition

    const walking = {
      walk() {
        console.log("Walking");
      }
    };

    const swimming = {
      swim() {
        console.log("Swimming");
      }
    };

    const dog = {
      ...walking,
      ...swimming
    };

Тепер:

    dog.walk();

    dog.swim();

Dog отримав лише потрібні behaviors.

---

# Object Spread Composition

JavaScript дозволяє об'єднувати objects через spread.

    const canWalk = {
      walk() {
        console.log("Walking");
      }
    };

    const canTalk = {
      talk() {
        console.log("Talking");
      }
    };

    const human = {
      ...canWalk,
      ...canTalk
    };

Використання:

    human.walk();

    human.talk();

---

# Composition через Functions

Composition не обмежується classes.

Можна створювати behavior factories.

    const withLogging = object => ({
      ...object,

      log(message) {
        console.log(message);
      }
    });

Використання:

    const user =
      withLogging({
        name: "Valeriy"
      });

Тепер:

    user.log("Hello");

---

# Function-Based Composition

    const canEat = object => ({
      ...object,

      eat() {
        console.log("Eating");
      }
    });

    const canWalk = object => ({
      ...object,

      walk() {
        console.log("Walking");
      }
    });

    const canSleep = object => ({
      ...object,

      sleep() {
        console.log("Sleeping");
      }
    });

Композиція:

    const dog =
      canSleep(
        canWalk(
          canEat({})
        )
      );

Тепер:

    dog.eat();

    dog.walk();

    dog.sleep();

---

# Composition Pipeline

Function composition можна уявити як pipeline:

    base object
         │
         ▼
      canEat
         │
         ▼
      canWalk
         │
         ▼
      canSleep
         │
         ▼
      final object

Це дозволяє поступово додавати behavior.

---

# Factory Functions

Factory functions добре підходять для composition.

    const createLogger = () => ({
      log(message) {
        console.log(message);
      }
    });

    const createUserService = (
      logger
    ) => ({
      createUser() {
        logger.log(
          "Creating user"
        );
      }
    });

Використання:

    const logger =
      createLogger();

    const userService =
      createUserService(
        logger
      );

---

# Composition + Dependency Injection

Composition часто використовує dependency injection.

Наприклад:

    class UserService {
      constructor(
        userRepository,
        logger
      ) {
        this.userRepository =
          userRepository;

        this.logger = logger;
      }
    }

Тут:

    UserService
        │
        ├── UserRepository
        └── Logger

Dependencies передаються ззовні.

---

# Чому Dependency Injection важливий

Без DI:

    class UserService {
      constructor() {
        this.repository =
          new UserRepository();

        this.logger =
          new Logger();
      }
    }

Service жорстко пов'язаний з конкретними implementations.

З DI:

    class UserService {
      constructor(
        repository,
        logger
      ) {
        this.repository =
          repository;

        this.logger = logger;
      }
    }

Тепер dependencies можна замінювати.

---

# Composition + Testing

Composition робить testing простішим.

Наприклад:

    class UserService {
      constructor(repository) {
        this.repository =
          repository;
      }

      getUser(id) {
        return this.repository
          .findById(id);
      }
    }

У production:

    const repository =
      new UserRepository();

У test:

    const fakeRepository = {
      findById(id) {
        return {
          id,
          name: "Test User"
        };
      }
    };

    const service =
      new UserService(
        fakeRepository
      );

Це одна з головних переваг composition.

---

# Real Implementation vs Fake Implementation

Production:

    UserService
         │
         ▼
    PostgreSQLRepository

Testing:

    UserService
         │
         ▼
    FakeRepository

UserService не потрібно переписувати.

Ми просто замінюємо dependency.

---

# Strategy Pattern

Composition часто лежить в основі Strategy Pattern.

Наприклад:

    class PaymentService {
      constructor(paymentStrategy) {
        this.paymentStrategy =
          paymentStrategy;
      }

      pay(amount) {
        return this.paymentStrategy
          .pay(amount);
      }
    }

Strategies:

    const cardPayment = {
      pay(amount) {
        console.log(
          `Card: ${amount}`
        );
      }
    };

    const cashPayment = {
      pay(amount) {
        console.log(
          `Cash: ${amount}`
        );
      }
    };

Тепер strategy можна замінити.

---

# Composition + Strategy

    PaymentService
          │
          ▼
    PaymentStrategy
       /       \
      /         \
    Card       Cash

Production code може вибрати:

    cardPayment

або:

    cashPayment

без зміни:

    PaymentService

---

# Composition + Configuration

Composition дозволяє створювати object з різною конфігурацією.

    const createApp = ({
      logger,
      database,
      cache
    }) => {
      return {
        logger,
        database,
        cache
      };
    };

Production:

    createApp({
      logger: productionLogger,
      database: postgresDatabase,
      cache: redisCache
    });

Testing:

    createApp({
      logger: testLogger,
      database: fakeDatabase,
      cache: fakeCache
    });

---

# Composition + Services

У backend applications часто використовують services:

    UserService
    EmailService
    Logger
    PaymentService
    FileStorage
    NotificationService

Інший service може отримувати їх через constructor.

    class UserService {
      constructor(
        emailService,
        logger
      ) {
        this.emailService =
          emailService;

        this.logger = logger;
      }
    }

Це composition.

---

# Composition у Backend

Наприклад:

    OrderService
         │
         ├── OrderRepository
         ├── PaymentService
         ├── EmailService
         └── Logger

OrderService не повинен реалізовувати все сам.

Кожна dependency має свою responsibility.

---

# Composition у NestJS

У NestJS composition є фундаментальним підходом.

Наприклад:

    @Injectable()
    export class UserService {
      constructor(
        private readonly repository: UserRepository,
        private readonly logger: LoggerService
      ) {}
    }

UserService отримує dependencies через constructor.

Модель:

    UserService
         │
         ├── UserRepository
         └── LoggerService

Це dependency injection + composition.

---

# Composition у Frontend

Composition широко використовується і у frontend.

Наприклад:

    Form
      │
      ├── Input
      ├── Button
      ├── Validation
      └── SubmitHandler

У React composition є фундаментальним підходом до побудови UI.

Наприклад:

    <Card>
      <Header />
      <Content />
      <Footer />
    </Card>

Card складається з components.

---

# Component Composition

У React:

    function Card({ children }) {
      return (
        <div>
          {children}
        </div>
      );
    }

Використання:

    <Card>
      <h2>Hello</h2>
      <p>Content</p>
    </Card>

Card не успадковується від іншого component.

Він **composes** children.

---

# Composition vs Inheritance у UI

Inheritance:

    BaseButton
       │
       ├── PrimaryButton
       ├── DangerButton
       └── IconButton

Composition:

    Button
      +
    icon
      +
    label
      +
    style
      +
    behavior

Composition часто дозволяє створювати більш flexible UI.

---

# Mixins

Mixin — це спосіб додати behavior до class через composition-like approach.

Наприклад:

    const CanLog = Base =>
      class extends Base {
        log(message) {
          console.log(message);
        }
      };

Використання:

    class User {}

    class LoggedUser
      extends CanLog(User) {}

Тепер:

    const user =
      new LoggedUser();

    user.log("Hello");

Mixin може комбінувати behavior.

---

# Mixin Composition

Можна створювати кілька mixins:

    const CanLog = Base =>
      class extends Base {
        log(message) {
          console.log(message);
        }
      };

    const CanValidate = Base =>
      class extends Base {
        validate() {
          return true;
        }
      };

Потім:

    class User {}

    class Admin
      extends CanValidate(
        CanLog(User)
      ) {}

Admin отримує:

    log()

і:

    validate()

---

# Mixins vs Object Composition

Object composition:

    const object = {
      ...behaviorA,
      ...behaviorB
    };

Mixin:

    class Result
      extends BehaviorB(
        BehaviorA(
          Base
        )
      ) {}

Обидва підходи дозволяють комбінувати behavior.

У сучасному JavaScript object/function composition часто простіший.

---

# Composition і Reusability

Composition добре підходить для reusable components.

Наприклад:

    logger
    validator
    cache
    repository
    formatter

можуть використовуватися в різних classes.

    UserService
        └── Logger

    OrderService
        └── Logger

    PaymentService
        └── Logger

Один component:

    Logger

може бути shared dependency.

---

# Shared Dependency

Наприклад:

    const logger =
      new Logger();

    const userService =
      new UserService(
        logger
      );

    const orderService =
      new OrderService(
        logger
      );

Тепер обидва services використовують той самий logger.

---

# Loose Coupling

Composition допомагає зменшувати coupling.

Strong coupling:

    UserService
        │
        ▼
    new PostgreSQLRepository()

UserService знає конкретну implementation.

Loose coupling:

    UserService
        │
        ▼
    Repository interface
        ▲
        │
    PostgreSQLRepository

Конкретна implementation передається ззовні.

---

# High Cohesion

Кожен component повинен мати чітку responsibility.

Наприклад:

    Logger
      │
      └── logging

    Validator
      │
      └── validation

    Repository
      │
      └── data access

    UserService
      │
      └── user business logic

Це high cohesion.

---

# Composition і Single Responsibility

Composition добре працює разом із Single Responsibility Principle.

Замість:

    UserService
      │
      ├── database
      ├── email
      ├── logging
      ├── validation
      ├── payment
      └── file system

можна:

    UserService
      │
      ├── UserRepository
      ├── EmailService
      ├── Logger
      ├── Validator
      └── FileStorage

Кожен component має окрему responsibility.

---

# Composition Root

У великих applications dependencies часто збираються в одному місці.

Наприклад:

    const logger =
      new Logger();

    const database =
      new Database();

    const repository =
      new UserRepository(
        database
      );

    const userService =
      new UserService(
        repository,
        logger
      );

Це називається composition root.

Саме тут application components з'єднуються.

---

# Composition Root Mental Model

    Logger
       │
       ▼
    UserService
       ▲
       │
    UserRepository
       ▲
       │
    Database

Composition root створює graph dependencies.

---

# Dependency Graph

Наприклад:

    Application
         │
         ▼
    UserService
       /     \
      ▼       ▼
    Repo     Logger
      │
      ▼
    Database

Це dependency graph.

Composition визначає:

    хто
    з ким
    і як
    працює разом.

---

# Composition vs God Object

Без composition можна отримати God Object:

    Application
      │
      ├── database logic
      ├── email logic
      ├── payment logic
      ├── validation
      ├── logging
      ├── file system
      └── business logic

Composition дозволяє розділити responsibilities.

---

# Composition не означає більше Classes

Composition можна реалізувати через:

    objects
    functions
    closures
    classes
    factories
    services
    modules

Наприклад:

    const logger = {
      log(message) {
        console.log(message);
      }
    };

Це вже component для composition.

---

# Composition через Closures

    const createCounter = () => {
      let count = 0;

      return {
        increment() {
          count++;
        },

        getCount() {
          return count;
        }
      };
    };

Інший object може отримати counter:

    const counter =
      createCounter();

Це також форма composition.

---

# Composition через Modules

Можна мати:

    logger.js
    validator.js
    repository.js
    user-service.js

`user-service.js` імпортує dependencies.

Наприклад:

    import logger from "./logger.js";
    import repository from "./repository.js";

Потім використовує їх.

Module system також допомагає організувати composition.

---

# Composition і Encapsulation

Components можуть приховувати свою internal implementation.

Наприклад:

    class Database {
      #connection;

      connect() {}

      query(sql) {}
    }

UserService не повинен знати:

    як саме
    Database
    встановлює connection.

Він просто використовує:

    database.query();

---

# Composition + Encapsulation

Модель:

    UserService
         │
         ▼
    Database
         │
      encapsulates
         │
         ▼
    connection details

Composition визначає relationship.

Encapsulation приховує implementation.

---

# Composition + Polymorphism

Composition добре працює з polymorphism.

Наприклад:

    class NotificationService {
      constructor(sender) {
        this.sender = sender;
      }

      send(message) {
        this.sender.send(message);
      }
    }

Sender може бути:

    EmailSender

або:

    SmsSender

або:

    PushSender

NotificationService працює з будь-яким object, який має:

    send()

---

# Polymorphic Composition

    NotificationService
           │
           ▼
        Sender
       /  |  \
      /   |   \
   Email SMS  Push

Можна змінити implementation:

    new NotificationService(
      emailSender
    );

або:

    new NotificationService(
      smsSender
    );

---

# Composition + Interface Thinking

JavaScript не має traditional interfaces як TypeScript, але можна мислити через contract.

Наприклад:

    sender.send(message)

Тоді будь-який object, який має:

    send()

може бути dependency.

TypeScript дозволяє описати contract:

    interface Sender {
      send(message: string): void;
    }

Після цього:

    class NotificationService {
      constructor(
        private sender: Sender
      ) {}
    }

---

# Duck Typing

JavaScript часто використовує duck typing.

Ідея:

    "If it has the required behavior,
     it can be used."

Наприклад:

    const emailSender = {
      send(message) {
        console.log(
          "Email:",
          message
        );
      }
    };

    const smsSender = {
      send(message) {
        console.log(
          "SMS:",
          message
        );
      }
    };

Обидва можуть використовуватися як:

    Sender

---

# Composition vs Deep Inheritance

Deep inheritance:

    Entity
      │
      ▼
    Person
      │
      ▼
    Employee
      │
      ▼
    Developer
      │
      ▼
    SeniorDeveloper

Чим глибша hierarchy, тим більше dependencies між classes.

Composition:

    SeniorDeveloper
        │
        ├── EmployeeData
        ├── CodingBehavior
        ├── CommunicationBehavior
        └── LeadershipBehavior

Behaviors можна комбінувати.

---

# Inheritance Explosion

Уявімо combinations:

    FlyingAnimal
    SwimmingAnimal
    FlyingSwimmingAnimal
    WalkingFlyingAnimal
    WalkingSwimmingAnimal
    WalkingFlyingSwimmingAnimal

Inheritance hierarchy швидко стає складною.

Composition:

    canWalk
    canFly
    canSwim

можна комбінувати:

    Dog
      + canWalk

    Duck
      + canWalk
      + canSwim
      + canFly

Це значно гнучкіше.

---

# Composition of Behaviors

    const canWalk = {
      walk() {}
    };

    const canFly = {
      fly() {}
    };

    const canSwim = {
      swim() {}
    };

Комбінації:

    const dog = {
      ...canWalk
    };

    const duck = {
      ...canWalk,
      ...canFly,
      ...canSwim
    };

    const fish = {
      ...canSwim
    };

---

# Composition vs Mixins vs Inheritance

Inheritance:

    class Dog
      extends Animal {}

Mixin:

    class Dog
      extends CanWalk(
        CanEat(
          Animal
        )
      ) {}

Object composition:

    const dog = {
      ...canWalk,
      ...canEat
    };

У JavaScript усі три підходи можливі.

Вибір залежить від relationship та architecture.

---

# Коли використовувати Inheritance

Inheritance добре підходить, коли справді існує:

    "is-a"

relationship.

Наприклад:

    class Animal {}

    class Dog extends Animal {}

Якщо child є спеціалізованим типом parent і relationship стабільний — inheritance може бути хорошим рішенням.

---

# Коли використовувати Composition

Composition добре підходить, коли:

    "has-a"

relationship.

Наприклад:

    Car has Engine.

Або коли потрібно:

    комбінувати behaviors

    замінювати dependencies

    тестувати окремі components

    уникати deep inheritance

    зменшити coupling

    зробити architecture flexible

---

# Composition Checklist

Перед використанням inheritance запитай:

    1. Чи це справді "is-a"?
    2. Чи child повинен успадковувати всю поведінку parent?
    3. Чи hierarchy буде стабільною?
    4. Чи потрібно комбінувати behavior?
    5. Чи потрібно замінювати dependency?
    6. Чи буде простіше через composition?

Якщо relationship:

    "has-a"

часто краще composition.

---

# Practical Example: Car

    class Engine {
      start() {
        console.log(
          "Engine started"
        );
      }
    }

    class GPS {
      navigate(destination) {
        console.log(
          `Navigating to ${destination}`
        );
      }
    }

    class AudioSystem {
      play(song) {
        console.log(
          `Playing ${song}`
        );
      }
    }

    class Car {
      constructor(
        engine,
        gps,
        audio
      ) {
        this.engine = engine;
        this.gps = gps;
        this.audio = audio;
      }

      start() {
        this.engine.start();
      }

      navigate(destination) {
        this.gps.navigate(
          destination
        );
      }

      play(song) {
        this.audio.play(song);
      }
    }

Використання:

    const car = new Car(
      new Engine(),
      new GPS(),
      new AudioSystem()
    );

    car.start();

    car.navigate("Kyiv");

    car.play("Jazz");

Car складається з:

    Engine
    GPS
    AudioSystem

---

# Practical Example: Order Service

    class OrderService {
      constructor(
        repository,
        paymentService,
        emailService,
        logger
      ) {
        this.repository =
          repository;

        this.paymentService =
          paymentService;

        this.emailService =
          emailService;

        this.logger = logger;
      }

      async createOrder(order) {
        this.logger.log(
          "Creating order"
        );

        const savedOrder =
          await this.repository
            .save(order);

        await this.paymentService
          .pay(savedOrder);

        await this.emailService
          .sendConfirmation(
            savedOrder
          );

        return savedOrder;
      }
    }

OrderService не реалізує:

    database
    payment
    email
    logging

самостійно.

Він composes dependencies.

---

# Practical Example: Notification

    class NotificationService {
      constructor(sender) {
        this.sender = sender;
      }

      send(message) {
        return this.sender
          .send(message);
      }
    }

Email:

    const emailSender = {
      send(message) {
        console.log(
          "Email:",
          message
        );
      }
    };

SMS:

    const smsSender = {
      send(message) {
        console.log(
          "SMS:",
          message
        );
      }
    };

Використання:

    const emailNotifications =
      new NotificationService(
        emailSender
      );

    const smsNotifications =
      new NotificationService(
        smsSender
      );

Один service.

Дві різні implementations.

---

# Practical Example: Logger

    const createLogger = prefix => ({
      log(message) {
        console.log(
          `[${prefix}] ${message}`
        );
      }
    });

Використання:

    const logger =
      createLogger("APP");

    logger.log("Started");

Інший logger:

    const testLogger =
      createLogger("TEST");

Тепер logger легко замінюється.

---

# Practical Example: User Service

    class UserService {
      constructor(
        repository,
        logger
      ) {
        this.repository =
          repository;

        this.logger = logger;
      }

      async getUser(id) {
        this.logger.log(
          `Loading user ${id}`
        );

        return this.repository
          .findById(id);
      }
    }

Dependencies:

    repository
    logger

UserService:

    coordinates

їхню роботу.

---

# Composition Architecture

Типова architecture:

    Application
         │
         ▼
    Controllers
         │
         ▼
    Services
         │
      ┌──┼───────────┐
      ▼  ▼           ▼
    Repo Logger    OtherService
      │
      ▼
    Database

Це composition на рівні application architecture.

---

# Composition на різних рівнях

Composition може існувати на різних рівнях:

    Object
      │
      ├── Object composition
      │
      ▼
    Class
      │
      ├── Dependency composition
      │
      ▼
    Module
      │
      ├── Module composition
      │
      ▼
    Application
      │
      └── System composition

Тобто composition — не лише OOP technique.

---

# Composition і Architecture

На рівні architecture composition означає:

    маленькі components
          │
          ▼
    комбінуються
          │
          ▼
    утворюють modules
          │
          ▼
    modules комбінуються
          │
          ▼
    application

Це дозволяє будувати складні systems із простіших parts.

---

# Common Mistakes

❌ Використовувати inheritance лише для reuse code.

Якщо relationship не є:

    "is-a"

розглянь composition.

---

❌ Створювати всі dependencies всередині class.

Погано:

    class UserService {
      constructor() {
        this.repository =
          new UserRepository();

        this.logger =
          new Logger();
      }
    }

Краще:

    class UserService {
      constructor(
        repository,
        logger
      ) {
        this.repository =
          repository;

        this.logger = logger;
      }
    }

---

# ❌ God Component

Погано:

    class ApplicationService {
      databaseLogic() {}
      emailLogic() {}
      paymentLogic() {}
      loggingLogic() {}
      validationLogic() {}
      fileLogic() {}
    }

Краще:

    DatabaseService
    EmailService
    PaymentService
    Logger
    Validator
    FileStorage

і потім:

    ApplicationService
          │
          ├── DatabaseService
          ├── EmailService
          ├── PaymentService
          ├── Logger
          ├── Validator
          └── FileStorage

---

# ❌ Composition без меж

Composition теж може бути неправильною.

Якщо object отримує:

    20 dependencies

це може означати, що class має забагато responsibilities.

Наприклад:

    constructor(
      a,
      b,
      c,
      d,
      e,
      f,
      g,
      h
    ) {}

це сигнал переглянути architecture.

---

# ❌ Надмірна абстракція

Не потрібно створювати:

    interface
    factory
    strategy
    adapter
    service

для кожної маленької функції.

Composition має спрощувати architecture, а не робити її складнішою.

---

# Composition vs Abstraction

Composition:

    combines components

Abstraction:

    hides unnecessary details

Encapsulation:

    protects internal state

Inheritance:

    creates type hierarchy

Polymorphism:

    allows interchangeable behavior

Ці concepts можуть працювати разом.

---

# OOP Architecture Model

    Encapsulation
          │
          ▼
    independent components
          │
          ▼
    Composition
          │
          ▼
    Delegation
          │
          ▼
    Polymorphism
          │
          ▼
    Flexible architecture

Це одна з корисних mental models для OOP.

---

# Composition + Four OOP Principles

### Encapsulation

Компонент приховує internal state.

    UserRepository
          │
          └── hides database details

### Abstraction

Component expose лише необхідний API.

    repository.findById()

### Polymorphism

Dependencies можуть мати різні implementations.

    EmailSender
    SmsSender
    PushSender

### Composition

Objects комбінують ці components.

    NotificationService
          │
          └── Sender

---

# Interview Questions

Що таке composition?

Що означає "composition over inheritance"?

Що таке "has-a" relationship?

Що таке "is-a" relationship?

Чим composition відрізняється від inheritance?

Що таке delegation?

Як composition пов'язана з delegation?

Що таке dependency injection?

Як dependency injection допомагає composition?

Чому composition зменшує coupling?

Що таке high cohesion?

Що таке loose coupling?

Що таке Strategy Pattern?

Як Strategy Pattern використовує composition?

Що таке mixin?

Чим mixin відрізняється від object composition?

Що таке composition root?

Як composition використовується у backend architecture?

Як composition використовується в React?

Чому composition корисна для testing?

Як замінити dependency під час testing?

Коли краще inheritance?

Коли краще composition?

Чи означає "composition over inheritance", що inheritance не потрібно використовувати?

---

# Рівні

🟢 Core (обов'язково знати)

Що таке composition.

Що таке "has-a".

Що таке "is-a".

Composition vs inheritance.

Delegation.

Composition через objects.

Composition через constructor dependencies.

Composition + private state.

Composition + dependency injection.

---

🔵 Junior

Composition over inheritance.

Object composition.

Behavior composition.

Function-based composition.

Factory functions.

Dependency injection.

Strategy pattern.

Composition + testing.

Loose coupling.

High cohesion.

---

🟠 Middle

Composition architecture.

Dependency graph.

Composition root.

Service composition.

Polymorphic composition.

Replaceable dependencies.

Reusable components.

Mixins.

Composition vs inheritance decisions.

Composition у frontend architecture.

Composition у backend architecture.

---

🔴 Senior

Large-scale composition.

Dependency boundaries.

Architecture composition.

Dependency inversion.

Plugin architectures.

Strategy-based systems.

Composition roots.

Highly decoupled systems.

Domain-oriented composition.

Balancing abstraction and complexity.

---

# Міні-шпаргалка

Composition:

    Object
      │
      ├── Component A
      ├── Component B
      └── Component C

---

"Has-a":

    Car
      │
      └── Engine

---

"Inheritance":

    Dog
      │
      └── Animal

    "is-a"

---

Composition:

    Car
      │
      └── Engine

    "has-a"

---

Delegation:

    Car
      │
      ▼
    Engine
      │
      ▼
    start()

---

Dependency Injection:

    class Service {
      constructor(
        dependency
      ) {
        this.dependency =
          dependency;
      }
    }

---

Strategy:

    Service
      │
      ▼
    Strategy
      │
      ├── Implementation A
      └── Implementation B

---

Object Composition:

    const user = {
      ...canLogin,
      ...canLogout,
      ...canEdit
    };

---

Function Composition:

    const object =
      canEdit(
        canLogin(
          createBase()
        )
      );

---

Composition Root:

    dependencies
         │
         ▼
    composition root
         │
         ▼
    application

---

# Головне

• Composition — це складання складного object із простіших components.

• Основна relationship:

    "has-a"

• Inheritance зазвичай представляє:

    "is-a"

• Composition дозволяє комбінувати behaviors.

• Composition часто використовує delegation.

• Composition добре працює з dependency injection.

• Dependency injection дозволяє передавати dependencies ззовні.

• Це зменшує coupling.

• Composition полегшує testing.

• Dependencies можна замінювати на fake implementations.

• Composition добре працює з Strategy Pattern.

• Composition дозволяє створювати reusable components.

• Composition може використовувати:

    objects
    functions
    factories
    classes
    mixins
    services
    modules

• Composition не означає, що inheritance заборонений.

• Inheritance доречний, коли relationship справді:

    "is-a"

• Composition часто кращий, коли relationship:

    "has-a"

• Composition допомагає уникати deep inheritance hierarchies.

• Composition допомагає уникати inheritance explosion.

• Composition добре працює разом із:

    Encapsulation
    Abstraction
    Polymorphism
    Dependency Injection
    Delegation
    Single Responsibility

---

# Найважливіша модель

    INHERITANCE

        Parent
           │
           ▼
         Child

        "is-a"


    COMPOSITION

        Object
           │
       ┌───┼───┐
       ▼   ▼   ▼
       A   B   C

       "has-a"


    DELEGATION

        Object
           │
           ▼
       Component
           │
           ▼
        behavior


    DEPENDENCY INJECTION

        Application
             │
             ▼
          Service
         /       \
        ▼         ▼
    Repository   Logger


    COMPOSITION OVER INHERITANCE

    Prefer:

        small independent components
                 │
                 ▼
            composition
                 │
                 ▼
        flexible architecture

    instead of:

        deep inheritance hierarchy
                 │
                 ▼
          tightly coupled code

Головна ідея:

    Composition
        =
    "build objects by combining
     independent components"

А практичне правило:

    "is-a"  → розглядай inheritance

    "has-a" → розглядай composition

    "does-a" → розглядай behavior / delegation

    "can-be-replaced-by" → розглядай
                           dependency injection
                           + polymorphism
                           + composition