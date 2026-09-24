# 06. Advanced Object Features

Розширені можливості роботи з об'єктами в JavaScript.

Цей розділ продовжує роботу з об'єктами після базових операцій:

- створення об'єктів;
- властивості та методи;
- destructuring;
- spread/rest;
- `Object.keys()`;
- `Object.values()`;
- `Object.entries()`.

Тут головна увага приділяється можливостям, які часто використовуються в сучасному JavaScript:

- computed property names;
- shorthand properties;
- method shorthand;
- getters / setters;
- property descriptors;
- `Object.defineProperty()`;
- `Object.defineProperties()`;
- `Object.getOwnPropertyDescriptor()`;
- `Object.getOwnPropertyDescriptors()`;
- `Object.hasOwn()`;
- `Object.assign()`;
- `Object.create()`;
- prototype;
- `Object.getPrototypeOf()`;
- `Object.setPrototypeOf()`;
- `Object.freeze()`;
- `Object.seal()`;
- `Object.preventExtensions()`;
- перевірка стану об'єкта;
- shallow copy та reference behavior.

---

# Ключові поняття

| Поняття | Що означає |
|---|---|
| `computed property` | динамічне ім'я властивості |
| `shorthand property` | скорочений запис властивості |
| `method shorthand` | скорочений запис методу |
| `getter` | спеціальний метод для читання значення |
| `setter` | спеціальний метод для зміни значення |
| descriptor | опис властивості об'єкта |
| `Object.defineProperty()` | створення/зміна властивості з descriptor |
| `Object.assign()` | копіювання властивостей між об'єктами |
| prototype | об'єкт, від якого об'єкт може успадковувати властивості |
| `Object.create()` | створення об'єкта з указаним prototype |
| `freeze()` | повністю заморожує структуру об'єкта |
| `seal()` | забороняє додавати/видаляти властивості |
| `preventExtensions()` | забороняє додавати нові властивості |

---

# 1. Shorthand Properties

Якщо ім'я змінної збігається з ім'ям властивості, можна використовувати скорочений запис.

Замість:

    const name = "Valeriy";
    const age = 56;

    const user = {
      name: name,
      age: age,
    };

можна:

    const name = "Valeriy";
    const age = 56;

    const user = {
      name,
      age,
    };

Це дуже поширений синтаксис сучасного JavaScript.

---

## Приклад

    const title = "JavaScript";
    const level = "Junior";
    const language = "uk";

    const course = {
      title,
      level,
      language,
    };

Результат:

    {
      title: "JavaScript",
      level: "Junior",
      language: "uk"
    }

---

# 2. Method Shorthand

Методи об'єкта також мають скорочений синтаксис.

Старий запис:

    const user = {
      sayHello: function () {
        console.log("Hello");
      },
    };

Сучасний:

    const user = {
      sayHello() {
        console.log("Hello");
      },
    };

Виклик:

    user.sayHello();

---

## Метод із параметрами

    const calculator = {
      add(a, b) {
        return a + b;
      },

      multiply(a, b) {
        return a * b;
      },
    };

    console.log(calculator.add(2, 3));
    console.log(calculator.multiply(4, 5));

---

# 3. Computed Property Names

Computed property дозволяє створювати ім'я властивості динамічно.

Для цього використовуються квадратні дужки:

    const key = "name";

    const user = {
      [key]: "Valeriy",
    };

Результат:

    {
      name: "Valeriy"
    }

---

## Приклад із змінною

    const propertyName = "email";
    const propertyValue = "user@example.com";

    const user = {
      [propertyName]: propertyValue,
    };

---

## Вираз усередині `[]`

    const prefix = "user";
    const id = 10;

    const object = {
      [`${prefix}_${id}`]: "Valeriy",
    };

Результат:

    {
      user_10: "Valeriy"
    }

---

## Практичне використання

Computed properties особливо корисні при створенні об'єктів із динамічними ключами.

    const field = "email";
    const value = "test@example.com";

    const update = {
      [field]: value,
    };

Це часто використовується у формах, API-запитах і state management.

---

# 4. Getters

Getter — спеціальний метод, який дозволяє читати значення як звичайну властивість.

Синтаксис:

    const user = {
      firstName: "Valeriy",
      lastName: "Svystun",

      get fullName() {
        return `${this.firstName} ${this.lastName}`;
      },
    };

Тепер:

    console.log(user.fullName);

Не потрібно:

    user.fullName();

Getter викликається як властивість.

---

# 5. Setters

Setter дозволяє контролювати присвоєння значення властивості.

    const user = {
      _name: "",

      set name(value) {
        this._name = value.trim();
      },

      get name() {
        return this._name;
      },
    };

    user.name = "  Valeriy  ";

    console.log(user.name);

Результат:

    "Valeriy"

---

# 6. Getter + Setter

Getter і setter часто використовуються разом.

    const user = {
      firstName: "Valeriy",
      lastName: "Svystun",

      get fullName() {
        return `${this.firstName} ${this.lastName}`;
      },

      set fullName(value) {
        const [firstName, lastName] = value.split(" ");

        this.firstName = firstName;
        this.lastName = lastName;
      },
    };

    console.log(user.fullName);

    user.fullName = "John Smith";

    console.log(user.firstName);
    console.log(user.lastName);

---

# 7. Для чого потрібні Getters / Setters

Getter:

- обчислює значення;
- приховує внутрішню реалізацію;
- дозволяє використовувати метод як властивість.

Setter:

- перевіряє дані;
- нормалізує значення;
- контролює зміну стану.

Наприклад:

    const account = {
      _balance: 0,

      get balance() {
        return this._balance;
      },

      set balance(value) {
        if (value < 0) {
          throw new Error("Balance cannot be negative");
        }

        this._balance = value;
      },
    };

---

# 8. Property Descriptors

Кожна властивість об'єкта має descriptor — набір характеристик, які визначають поведінку властивості.

Основні характеристики:

- `value`
- `writable`
- `enumerable`
- `configurable`

Для accessor properties використовуються:

- `get`
- `set`

---

# 9. `value`

`value` — значення властивості.

    const user = {
      name: "Valeriy",
    };

Descriptor властивості `name` містить приблизно:

    {
      value: "Valeriy",
      writable: true,
      enumerable: true,
      configurable: true
    }

---

# 10. `writable`

`writable` визначає, чи можна змінити значення властивості.

    const user = {};

    Object.defineProperty(user, "name", {
      value: "Valeriy",
      writable: false,
    });

Тепер:

    user.name = "John";

Значення не зміниться.

У strict mode спроба зміни може спричинити `TypeError`.

---

# 11. `enumerable`

`enumerable` визначає, чи буде властивість видимою під час переліку властивостей.

Наприклад:

    const user = {};

    Object.defineProperty(user, "name", {
      value: "Valeriy",
      enumerable: false,
    });

Тоді:

    console.log(Object.keys(user));

Результат:

    []

Але сама властивість існує:

    console.log(user.name);

Результат:

    "Valeriy"

---

# 12. `configurable`

`configurable` визначає, чи можна змінювати descriptor або видаляти властивість.

    const user = {};

    Object.defineProperty(user, "name", {
      value: "Valeriy",
      configurable: false,
    });

Після цього властивість не можна нормально видалити або переналаштувати.

---

# 13. `Object.defineProperty()`

Метод дозволяє створити або змінити одну властивість із конкретним descriptor.

    const user = {};

    Object.defineProperty(user, "name", {
      value: "Valeriy",
      writable: true,
      enumerable: true,
      configurable: true,
    });

---

## Важлива особливість

Якщо не вказати:

- `writable`;
- `enumerable`;
- `configurable`;

то для нової властивості вони за замовчуванням будуть `false`.

Наприклад:

    const user = {};

    Object.defineProperty(user, "name", {
      value: "Valeriy",
    });

Тут:

    writable: false
    enumerable: false
    configurable: false

Це важливо пам'ятати.

---

# 14. `Object.defineProperties()`

Дозволяє визначити кілька властивостей одночасно.

    const user = {};

    Object.defineProperties(user, {
      firstName: {
        value: "Valeriy",
        writable: true,
        enumerable: true,
      },

      lastName: {
        value: "Svystun",
        writable: true,
        enumerable: true,
      },
    });

---

# 15. `Object.getOwnPropertyDescriptor()`

Повертає descriptor конкретної властивості.

    const user = {
      name: "Valeriy",
    };

    const descriptor = Object.getOwnPropertyDescriptor(user, "name");

    console.log(descriptor);

Типовий результат:

    {
      value: "Valeriy",
      writable: true,
      enumerable: true,
      configurable: true
    }

---

# 16. `Object.getOwnPropertyDescriptors()`

Повертає descriptors усіх власних властивостей.

    const user = {
      name: "Valeriy",
      age: 56,
    };

    const descriptors = Object.getOwnPropertyDescriptors(user);

---

# 17. `Object.hasOwn()`

Перевіряє, чи є властивість безпосередньо власною властивістю об'єкта.

    const user = {
      name: "Valeriy",
    };

    console.log(Object.hasOwn(user, "name"));

Результат:

    true

Для властивості, якої немає:

    console.log(Object.hasOwn(user, "email"));

Результат:

    false

---

## Власна властивість vs prototype

    const parent = {
      role: "user",
    };

    const child = Object.create(parent);

    child.name = "Valeriy";

    console.log(Object.hasOwn(child, "name"));
    // true

    console.log(Object.hasOwn(child, "role"));
    // false

`role` доступна через prototype, але не є власною властивістю `child`.

---

# 18. `Object.assign()`

`Object.assign()` копіює enumerable own properties з одного або кількох джерел у target.

    const target = {
      name: "Valeriy",
    };

    const source = {
      age: 56,
    };

    Object.assign(target, source);

    console.log(target);

Результат:

    {
      name: "Valeriy",
      age: 56
    }

---

# 19. `Object.assign()` змінює target

Це важливо.

    const target = {
      a: 1,
    };

    const source = {
      b: 2,
    };

    const result = Object.assign(target, source);

    console.log(result === target);

Результат:

    true

`Object.assign()` не створює новий target автоматично.

---

# 20. Копіювання через `Object.assign()`

Щоб створити новий об'єкт:

    const user = {
      name: "Valeriy",
      age: 56,
    };

    const copy = Object.assign({}, user);

Тепер:

    console.log(copy);
    console.log(copy === user);

Результат:

    {
      name: "Valeriy",
      age: 56
    }

    false

---

# 21. `Object.assign()` і shallow copy

`Object.assign()` виконує поверхневе копіювання.

    const user = {
      name: "Valeriy",
      address: {
        city: "Vinnytsia",
      },
    };

    const copy = Object.assign({}, user);

Зовнішні об'єкти різні:

    copy !== user

Але вкладений `address` той самий:

    copy.address === user.address

Тому:

    copy.address.city = "Kyiv";

змінить і:

    user.address.city

---

# 22. Spread vs `Object.assign()`

Сучасний JavaScript часто використовує spread:

    const copy = {
      ...user,
    };

Замість:

    const copy = Object.assign({}, user);

Обидва варіанти виконують shallow copy, але spread часто читається простіше.

---

# 23. `Object.create()`

`Object.create()` створює новий об'єкт із заданим prototype.

    const userMethods = {
      sayHello() {
        console.log(`Hello, ${this.name}`);
      },
    };

    const user = Object.create(userMethods);

    user.name = "Valeriy";

    user.sayHello();

`user` не має власної властивості `sayHello`.

Вона знаходиться в prototype.

---

# 24. Prototype

Prototype — це об'єкт, з якого JavaScript може отримувати властивості та методи.

Наприклад:

    const parent = {
      greet() {
        console.log("Hello");
      },
    };

    const child = Object.create(parent);

    child.greet();

JavaScript спочатку шукає `greet` у `child`.

Якщо не знаходить — шукає в prototype.

---

# 25. Prototype Chain

Пошук властивості відбувається приблизно так:

    object
      ↓
    prototype
      ↓
    prototype prototype
      ↓
    ...
      ↓
    null

Це називається prototype chain.

---

# 26. `Object.getPrototypeOf()`

Дозволяє отримати prototype об'єкта.

    const parent = {
      role: "admin",
    };

    const child = Object.create(parent);

    console.log(Object.getPrototypeOf(child) === parent);

Результат:

    true

---

# 27. `Object.setPrototypeOf()`

Дозволяє змінити prototype існуючого об'єкта.

    const admin = {
      role: "admin",
    };

    const user = {
      name: "Valeriy",
    };

    Object.setPrototypeOf(user, admin);

Тепер:

    console.log(user.role);

Результат:

    "admin"

---

## Важливо

`Object.setPrototypeOf()` існує, але не варто без потреби часто змінювати prototype вже створених об'єктів.

Для створення об'єкта з prototype краще:

    Object.create(prototype)

або використовувати:

    class

---

# 28. `Object.freeze()`

`Object.freeze()` заморожує об'єкт.

Після freeze не можна:

- додавати властивості;
- видаляти властивості;
- змінювати існуючі властивості.

    const user = {
      name: "Valeriy",
    };

    Object.freeze(user);

    user.name = "John";
    user.age = 56;

---

# 29. `Object.isFrozen()`

Перевіряє, чи об'єкт заморожений.

    const user = {
      name: "Valeriy",
    };

    Object.freeze(user);

    console.log(Object.isFrozen(user));

Результат:

    true

---

# 30. `Object.seal()`

`Object.seal()` забороняє:

- додавати нові властивості;
- видаляти існуючі властивості.

Але існуючі writable-властивості можна змінювати.

    const user = {
      name: "Valeriy",
    };

    Object.seal(user);

    user.name = "John";

Це дозволено.

А:

    user.age = 56;

не створить нову властивість.

---

# 31. `Object.isSealed()`

Перевірка:

    console.log(Object.isSealed(user));

---

# 32. `Object.preventExtensions()`

Забороняє додавати нові властивості.

Але існуючі властивості можна змінювати або видаляти, якщо їхні descriptors це дозволяють.

    const user = {
      name: "Valeriy",
    };

    Object.preventExtensions(user);

    user.name = "John";

Це дозволено.

А:

    user.age = 56;

не створить нову властивість.

---

# 33. `Object.isExtensible()`

Перевіряє, чи можна додавати нові властивості.

    const user = {
      name: "Valeriy",
    };

    console.log(Object.isExtensible(user));

    Object.preventExtensions(user);

    console.log(Object.isExtensible(user));

Результат:

    true
    false

---

# 34. Freeze vs Seal vs PreventExtensions

| Метод | Додавання | Видалення | Зміна |
|---|---|---|---|
| `preventExtensions()` | ❌ | ✅ | ✅ |
| `seal()` | ❌ | ❌ | ✅ |
| `freeze()` | ❌ | ❌ | ❌ |

Але це стосується **самого об'єкта**, а не автоматично всіх вкладених об'єктів.

---

# 35. Shallow Freeze

`Object.freeze()` не робить deep freeze.

    const user = {
      name: "Valeriy",
      settings: {
        theme: "dark",
      },
    };

    Object.freeze(user);

Змінити:

    user.name = "John";

не можна.

Але:

    user.settings.theme = "light";

може змінити вкладений об'єкт.

Причина:

    user.settings

залишається окремим mutable object.

---

# 36. Deep Freeze

Для повного заморожування вкладених структур потрібен окремий підхід.

Наприклад:

    function deepFreeze(object) {
      Object.freeze(object);

      for (const value of Object.values(object)) {
        if (
          value !== null &&
          typeof value === "object" &&
          !Object.isFrozen(value)
        ) {
          deepFreeze(value);
        }
      }

      return object;
    }

Використання:

    const user = {
      name: "Valeriy",
      settings: {
        theme: "dark",
      },
    };

    deepFreeze(user);

Тепер вкладені об'єкти також заморожені.

---

# 37. Важлива різниця: Object vs Reference

Об'єкти передаються через reference behavior.

    const user = {
      name: "Valeriy",
    };

    const anotherUser = user;

    anotherUser.name = "John";

Тепер:

    console.log(user.name);

Результат:

    "John"

Тому:

    user === anotherUser

дає:

    true

---

# 38. Створення поверхневої копії

Для створення нового верхнього рівня:

    const copy = {
      ...user,
    };

Тепер:

    copy === user

дає:

    false

Але вкладені об'єкти все ще можуть бути спільними.

---

# 39. `Object.assign()` та descriptors

`Object.assign()` копіює значення властивостей, а не повні descriptors.

Наприклад:

    const source = {};

    Object.defineProperty(source, "name", {
      value: "Valeriy",
      enumerable: true,
      writable: false,
    });

    const target = Object.assign({}, source);

У `target` властивість буде створена зі стандартними характеристиками звичайного assignment.

Якщо потрібно зберегти descriptors, можна використати:

    Object.defineProperties(
      {},
      Object.getOwnPropertyDescriptors(source)
    );

Це важливий advanced pattern.

---

# 40. Копіювання об'єкта разом із descriptors

    const source = {
      name: "Valeriy",
    };

    const copy = Object.defineProperties(
      {},
      Object.getOwnPropertyDescriptors(source)
    );

Цей підхід корисний при роботі з:

- getters;
- setters;
- non-enumerable properties;
- спеціальними descriptors.

---

# 41. Getter у descriptor

Getter можна створити через `Object.defineProperty()`.

    const user = {
      firstName: "Valeriy",
      lastName: "Svystun",
    };

    Object.defineProperty(user, "fullName", {
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      enumerable: true,
    });

Тепер:

    console.log(user.fullName);

---

# 42. Setter у descriptor

    const user = {
      _name: "",
    };

    Object.defineProperty(user, "name", {
      get() {
        return this._name;
      },

      set(value) {
        this._name = value.trim();
      },

      enumerable: true,
    });

---

# 43. `this` у getter / setter

Getter і setter використовують `this` для доступу до поточного об'єкта.

    const user = {
      firstName: "Valeriy",
      lastName: "Svystun",

      get fullName() {
        return `${this.firstName} ${this.lastName}`;
      },
    };

`this` тут посилається на `user`, коли getter викликається через:

    user.fullName

---

# 44. Private Data Pattern

До появи private class fields часто використовували convention із `_`.

    const user = {
      _password: "12345",

      getPassword() {
        return this._password;
      },
    };

Але `_password` **не є справді приватним**.

Його все одно можна прочитати:

    console.log(user._password);

Символ `_` — лише домовленість.

Для сучасного JavaScript існують:

    #privateField

у класах.

---

# 45. `Object.hasOwn()` vs `in`

`Object.hasOwn()` перевіряє тільки власні властивості.

    const parent = {
      role: "user",
    };

    const child = Object.create(parent);

    child.name = "Valeriy";

    console.log(Object.hasOwn(child, "role"));
    // false

Оператор `in` перевіряє також prototype chain:

    console.log("role" in child);
    // true

---

# 46. `Object.keys()`, `values()`, `entries()`

Ці методи повертають enumerable own properties.

    const user = {
      name: "Valeriy",
      age: 56,
    };

    Object.keys(user);

    Object.values(user);

    Object.entries(user);

Результат:

    ["name", "age"]

    ["Valeriy", 56]

    [
      ["name", "Valeriy"],
      ["age", 56]
    ]

---

# 47. Властивості з prototype

`Object.keys()` не показує властивості prototype.

    const parent = {
      role: "user",
    };

    const child = Object.create(parent);

    child.name = "Valeriy";

    console.log(Object.keys(child));

Результат:

    ["name"]

Але:

    console.log(child.role);

працює, тому що `role` знаходиться в prototype.

---

# 48. Object Property Order

У сучасному JavaScript порядок власних enumerable properties має визначені правила.

Наприклад:

    const object = {
      b: 1,
      2: "two",
      1: "one",
      a: 3,
    };

    console.log(Object.keys(object));

Числові індексні ключі йдуть перед іншими ключами.

Практично:

    Object.keys()
    Object.values()
    Object.entries()

повертають властивості у передбачуваному порядку відповідно до правил JavaScript.

---

# 49. Dynamic Object Construction

Advanced object features особливо корисні при формуванні об'єктів програмно.

    function createUser(name, age) {
      return {
        name,
        age,
        createdAt: new Date(),
      };
    }

Використання:

    const user = createUser("Valeriy", 56);

---

# 50. Dynamic Keys

    function createField(key, value) {
      return {
        [key]: value,
      };
    }

    const result = createField("email", "test@example.com");

Результат:

    {
      email: "test@example.com"
    }

---

# 51. Практичний приклад: оновлення об'єкта

Computed properties + spread:

    const field = "email";
    const value = "new@example.com";

    const updatedUser = {
      ...user,
      [field]: value,
    };

Це дуже поширений pattern у frontend development.

---

# 52. Практичний приклад: створення API payload

    const name = "Valeriy";
    const age = 56;

    const payload = {
      name,
      age,
      source: "web",
    };

Shorthand робить об'єкт компактним і читабельним.

---

# 53. Практичний приклад: immutable update

Замість зміни:

    user.name = "John";

можна створити новий об'єкт:

    const updatedUser = {
      ...user,
      name: "John",
    };

Старий об'єкт:

    user

залишається без змін.

Цей підхід широко використовується у frontend/state management.

---

# 54. Object.freeze() і immutable style

Можна захистити об'єкт від випадкової зміни:

    const config = Object.freeze({
      apiUrl: "/api",
      timeout: 5000,
    });

Такі об'єкти часто використовують для configuration/constants.

---

# 55. Але `freeze()` не робить об'єкт immutable у всіх сенсах

Freeze:

- не робить deep freeze;
- не змінює вкладені об'єкти;
- не створює deep copy;
- не перетворює значення на immutable data structure.

Тому:

    const config = Object.freeze({
      api: {
        url: "/api",
      },
    });

не гарантує:

    config.api.url

від зміни.

---

# 56. `Object.create(null)`

Можна створити об'єкт без prototype:

    const dictionary = Object.create(null);

Тоді:

    Object.getPrototypeOf(dictionary);

поверне:

    null

Такий об'єкт не успадковує методи з `Object.prototype`.

---

## Для чого це може бути потрібно

Наприклад, для простого dictionary/map:

    const dictionary = Object.create(null);

    dictionary.apple = 5;
    dictionary.orange = 10;

Але в сучасному JavaScript для багатьох таких задач краще підходить:

    Map

---

# 57. Object vs Map

Для колекції ключ → значення:

`Object`:

    const users = {
      admin: "Valeriy",
      guest: "John",
    };

`Map`:

    const users = new Map();

    users.set("admin", "Valeriy");
    users.set("guest", "John");

Якщо потрібна повноцінна структура key-value collection, `Map` часто природніший.

Об'єкти краще підходять для представлення сутностей та структур даних.

---

# 58. Prototype не означає клас

JavaScript історично базується на prototype inheritance.

Класи:

    class User {}

є зручнішим синтаксисом над prototype-based механізмами.

Важливо розуміти:

    object
      ↓
    prototype

навіть якщо в коді використовується `class`.

---

# 59. Типова схема prototype lookup

Якщо написати:

    user.sayHello();

JavaScript шукає `sayHello` приблизно так:

    user
      ↓
    User.prototype
      ↓
    Object.prototype
      ↓
    null

Якщо метод знайдений — він викликається.

Якщо ні — виникає помилка.

---

# 60. Descriptor + Prototype

Властивості prototype також мають descriptors.

    class User {
      sayHello() {
        console.log("Hello");
      }
    }

    const descriptor = Object.getOwnPropertyDescriptor(
      User.prototype,
      "sayHello"
    );

Це вже advanced рівень розуміння JavaScript objects.

---

# 61. Власна властивість чи inherited property?

Корисний спосіб перевірки:

    Object.hasOwn(object, "property");

Якщо потрібно перевірити весь prototype chain:

    "property" in object

Ці перевірки вирішують різні задачі.

---

# 62. Не плутати `Object.freeze()` з `const`

`const` забороняє переприсвоїти змінну:

    const user = {
      name: "Valeriy",
    };

Не можна:

    user = {};

Але можна:

    user.name = "John";

`Object.freeze()` забороняє змінювати властивості:

    Object.freeze(user);

Тобто:

- `const` → захищає binding;
- `freeze()` → захищає властивості об'єкта.

---

# 63. `const` + `freeze()`

Разом:

    const user = Object.freeze({
      name: "Valeriy",
      age: 56,
    });

Тут:

- змінну `user` не можна переприсвоїти;
- властивості об'єкта не можна змінювати.

---

# 64. Типові помилки

## 1. Плутати shallow copy з deep copy

    const copy = {
      ...user,
    };

це не deep copy.

---

## 2. Вважати `_property` приватною

    const user = {
      _password: "12345",
    };

`_password` не є справжньою приватною властивістю.

---

## 3. Забувати про prototype

    Object.hasOwn(object, "name");

і:

    "name" in object

можуть давати різні результати.

---

## 4. Очікувати deep freeze

    Object.freeze(user);

не заморожує автоматично:

    user.settings

---

## 5. Плутати `const` та `freeze`

    const user = {};

не означає:

    Object.freeze(user);

---

## 6. Забувати, що `Object.assign()` змінює target

    Object.assign(target, source);

змінює:

    target

---

## 7. Забувати про default descriptors

У:

    Object.defineProperty(object, "name", {
      value: "Valeriy",
    });

`writable`, `enumerable` і `configurable` за замовчуванням `false`.

---

## 8. Надмірно використовувати `Object.setPrototypeOf()`

Prototype краще правильно встановлювати під час створення об'єкта або використовувати `class`.

---

# 65. Практичні вправи

## Вправа 1 — shorthand

Створи:

    const name = "Valeriy";
    const age = 56;
    const city = "Vinnytsia";

Створи об'єкт `user`, використовуючи shorthand properties.

---

## Вправа 2 — computed property

Створи функцію:

    createObject(key, value)

яка повертає:

    {
      [key]: value
    }

---

## Вправа 3 — method shorthand

Створи об'єкт `calculator` з методами:

    add()
    subtract()
    multiply()
    divide()

---

## Вправа 4 — getter

Створи об'єкт:

    user

з:

    firstName
    lastName

і getter:

    fullName

---

## Вправа 5 — setter

Додай setter:

    fullName

який приймає повне ім'я та розділяє його на:

    firstName
    lastName

---

## Вправа 6 — descriptor

Створи властивість:

    id

яку:

- можна читати;
- не можна змінювати;
- видно через `Object.keys()`.

---

## Вправа 7 — prototype

Створи:

    personMethods

з методом:

    sayHello()

Потім створи через:

    Object.create()

об'єкт:

    person

і використовуй цей метод через prototype.

---

## Вправа 8 — freeze

Створи configuration object:

    const config = {
      apiUrl: "/api",
      timeout: 5000,
    };

Заморозь його та перевір:

    Object.isFrozen(config)

---

## Вправа 9 — seal

Створи об'єкт та перевір різницю між:

    Object.seal()

і:

    Object.freeze()

---

## Вправа 10 — own vs inherited

Створи prototype:

    const parent = {
      role: "user",
    };

Створи child через:

    Object.create(parent)

Перевір:

    Object.hasOwn(child, "role");

і:

    "role" in child;

Поясни різницю результатів.

---

# 66. Міні-проєкт

## Config Manager

Створи невеликий об'єкт конфігурації:

    const config = {
      apiUrl: "/api",
      timeout: 5000,
      environment: "development",
    };

Реалізуй:

1. getter `isProduction`;
2. setter для `environment`;
3. захист конфігурації від випадкового додавання властивостей;
4. перевірку власних властивостей через `Object.hasOwn()`;
5. створення копії через spread;
6. оновлення окремого поля через computed property.

Наприклад:

    const field = "timeout";
    const value = 10000;

    const updatedConfig = {
      ...config,
      [field]: value,
    };

---

# Питання зі співбесіди

### 1. Що таке property descriptor?

Об'єкт, який описує характеристики властивості:

    value
    writable
    enumerable
    configurable

Для accessor property:

    get
    set

---

### 2. Для чого потрібен `Object.defineProperty()`?

Для створення або зміни властивості з контролем її descriptor.

---

### 3. Які default значення descriptors у `defineProperty()`?

Для нової властивості:

    writable: false
    enumerable: false
    configurable: false

якщо їх явно не вказати.

---

### 4. Що таке getter?

Спеціальний accessor, який дозволяє читати значення як властивість:

    object.value

замість:

    object.value()

---

### 5. Що таке setter?

Accessor, який контролює присвоєння:

    object.value = newValue;

---

### 6. Що таке prototype?

Об'єкт, через який JavaScript може успадковувати властивості та методи.

---

### 7. Що таке prototype chain?

Ланцюжок prototype-об'єктів, через який JavaScript шукає властивості.

---

### 8. Різниця між `Object.hasOwn()` і `in`?

`Object.hasOwn()`:

    тільки власна властивість

`in`:

    власна або успадкована через prototype

---

### 9. Різниця між `Object.assign()` і spread?

Обидва можуть використовуватися для shallow copy.

`Object.assign()`:

    Object.assign({}, source);

Spread:

    { ...source }

`Object.assign()` також може змінювати існуючий target.

---

### 10. Що робить `Object.freeze()`?

Забороняє додавання, видалення та зміну властивостей об'єкта.

Але freeze за замовчуванням shallow.

---

### 11. Різниця між `freeze()` і `seal()`?

`freeze()`:

    додавання ❌
    видалення ❌
    зміна ❌

`seal()`:

    додавання ❌
    видалення ❌
    зміна ✅

якщо властивості writable.

---

### 12. Що робить `Object.preventExtensions()`?

Забороняє додавати нові властивості, але не забороняє автоматично змінювати або видаляти існуючі.

---

### 13. Що таке computed property?

Властивість, ім'я якої обчислюється:

    const key = "name";

    const user = {
      [key]: "Valeriy",
    };

---

### 14. Що таке shallow copy?

Копіювання тільки верхнього рівня об'єкта.

Вкладені об'єкти залишаються спільними references.

---

### 15. Чи є `_name` приватною властивістю?

Ні.

Це лише naming convention.

---

### 16. Що таке `Object.create()`?

Створює об'єкт із заданим prototype.

---

### 17. Чи змінює `Object.assign()` оригінальний об'єкт?

Так, якщо цей об'єкт переданий як target.

---

# Рівні володіння

## Core

Потрібно знати:

- object shorthand;
- method shorthand;
- computed properties;
- getters;
- setters;
- `Object.keys()`;
- `Object.values()`;
- `Object.entries()`;
- `Object.hasOwn()`;
- shallow copy;
- spread;
- `Object.assign()`.

---

## Junior

Потрібно розуміти:

- property descriptors;
- `Object.defineProperty()`;
- `Object.defineProperties()`;
- `Object.getOwnPropertyDescriptor()`;
- `Object.getOwnPropertyDescriptors()`;
- prototype;
- `Object.create()`;
- `Object.getPrototypeOf()`;
- `freeze()`;
- `seal()`;
- `preventExtensions()`.

---

## Middle

Потрібно впевнено розуміти:

- prototype chain;
- own vs inherited properties;
- getters/setters;
- descriptors;
- shallow copy;
- reference behavior;
- immutable update patterns;
- object configuration;
- `Object.create(null)`;
- взаємодію objects із classes;
- поведінку prototype.

---

## Senior

Варто розуміти:

- внутрішню модель property access;
- prototype lookup;
- descriptor semantics;
- accessor/data properties;
- property attributes;
- object extensibility;
- prototype manipulation;
- performance implications;
- object shapes;
- interaction із Proxy;
- metaprogramming;
- low-level JavaScript object behavior.

---

# Міні-шпаргалка

    // Shorthand
    const name = "Valeriy";

    const user = {
      name,
    };


    // Method shorthand
    const calculator = {
      add(a, b) {
        return a + b;
      },
    };


    // Computed property
    const key = "name";

    const user = {
      [key]: "Valeriy",
    };


    // Getter
    const user = {
      firstName: "Valeriy",
      lastName: "Svystun",

      get fullName() {
        return `${this.firstName} ${this.lastName}`;
      },
    };


    // Setter
    const user = {
      _name: "",

      set name(value) {
        this._name = value.trim();
      },
    };


    // Descriptor
    Object.defineProperty(object, "name", {
      value: "Valeriy",
      writable: true,
      enumerable: true,
      configurable: true,
    });


    // Read descriptor
    Object.getOwnPropertyDescriptor(object, "name");


    // All descriptors
    Object.getOwnPropertyDescriptors(object);


    // Own property
    Object.hasOwn(object, "name");


    // Own + inherited
    "name" in object;


    // Copy
    const copy = {
      ...object,
    };


    // Assign
    Object.assign(target, source);


    // Prototype
    const child = Object.create(parent);


    // Get prototype
    Object.getPrototypeOf(object);


    // Change prototype
    Object.setPrototypeOf(object, prototype);


    // Freeze
    Object.freeze(object);


    // Seal
    Object.seal(object);


    // Prevent extensions
    Object.preventExtensions(object);


    // State checks
    Object.isFrozen(object);
    Object.isSealed(object);
    Object.isExtensible(object);

---

# Головне

Advanced Object Features — це не набір методів, які потрібно механічно запам'ятати.

Головна мета — зрозуміти, **як JavaScript представляє та контролює властивості об'єктів**.

Особливо важливо тримати в голові:

    object
      ↓
    properties
      ↓
    descriptors
      ↓
    prototype
      ↓
    prototype chain

І практично:

    shorthand
    computed properties
    getters / setters
    Object.hasOwn()
    Object.assign()
    Object.create()
    Object.freeze()
    Object.seal()
    property descriptors

А також чітко розрізняти:

    own property
    inherited property

    shallow copy
    deep copy

    const
    Object.freeze()

    Object.assign()
    spread

    Object
    Map

Ці знання є важливою основою для розуміння:

- JavaScript classes;
- OOP;
- React state;
- Redux;
- NestJS;
- ORM;
- configuration objects;
- API payloads;
- serialization;
- Proxy;
- metaprogramming.

---

# Наступний крок

Після `06-advanced-object-features` логічно перейти до:

    07-iterators

Там об'єкти та колекції починають розглядатися з іншого боку — через протокол ітерації:

    Symbol.iterator
    iterator
    next()
    value
    done

Це створює основу для наступної теми:

    08-generators