## 02. Collections

Collections (колекції) в OOP — це об'єкти та структури даних, які використовуються для зберігання, організації та роботи з групами об'єктів.

У JavaScript для роботи з колекціями найчастіше використовуються:

- Array
- Set
- Map
- WeakSet
- WeakMap

У контексті OOP collections часто є частиною state іншого object.

Наприклад:

    class Cart {
      constructor() {
        this.items = [];
      }

      add(product) {
        this.items.push(product);
      }
    }

Тут:

    Cart
      │
      └── items → Array
                    │
                    ├── Product
                    ├── Product
                    └── Product

---

### Ключові поняття

✔ collection  
✔ Array  
✔ Set  
✔ Map  
✔ WeakSet  
✔ WeakMap  
✔ iterable  
✔ iterator  
✔ collection item  
✔ key  
✔ value  
✔ index  
✔ `length`  
✔ `size`  
✔ `add()`  
✔ `delete()`  
✔ `has()`  
✔ `get()`  
✔ `set()`  
✔ `for...of`  
✔ `forEach()`  
✔ `entries()`  
✔ `keys()`  
✔ `values()`  

---

### Що потрібно пам'ятати

• Collection — структура для зберігання групи значень або objects.

• Array зберігає елементи у визначеному порядку та використовує numeric indexes.

• Set зберігає унікальні values.

• Map зберігає пари `key → value`.

• WeakSet зберігає weak references до objects.

• WeakMap зберігає пари `object → value` і використовує weak references для keys.

• Array має `length`.

• Set і Map мають `size`.

• Array допускає дублікати.

• Set автоматично не допускає дублікати.

• Map дозволяє використовувати різні типи значень як keys.

• Map key може бути object.

• Collections часто використовуються як state всередині class.

• Collections можна передавати між objects та services.

• `for...of` дозволяє перебирати iterable collections.

---

# Collection

Collection — це структура, яка містить декілька значень.

Наприклад Array:

    const users = [
      "Valeriy",
      "John",
      "Anna"
    ];

Collection:

    users

Items:

    "Valeriy"
    "John"
    "Anna"

---

# Array

Array — ordered collection елементів.

    const users = [
      "Valeriy",
      "John",
      "Anna"
    ];

Доступ за index:

    console.log(users[0]);

Результат:

    Valeriy

Indexes:

    users
      │
      ├── 0 → "Valeriy"
      ├── 1 → "John"
      └── 2 → "Anna"

---

# Array у Class

Collections часто використовуються для зберігання state object.

    class UserList {
      constructor() {
        this.users = [];
      }

      add(user) {
        this.users.push(user);
      }

      remove(user) {
        this.users = this.users.filter(
          item => item !== user
        );
      }
    }

    const list = new UserList();

    list.add("Valeriy");
    list.add("John");

    console.log(list.users);

Тут:

    UserList
       │
       └── users
            │
            ├── "Valeriy"
            └── "John"

---

# Array Methods

Основні methods для роботи з Array:

    push()
    pop()
    shift()
    unshift()

    map()
    filter()
    find()
    findIndex()
    some()
    every()
    reduce()

    includes()
    indexOf()

    sort()
    reverse()

    slice()
    splice()

Приклад:

    class Cart {
      constructor() {
        this.items = [];
      }

      add(product) {
        this.items.push(product);
      }

      remove(product) {
        this.items = this.items.filter(
          item => item !== product
        );
      }
    }

---

# Set

`Set` — collection, яка зберігає **унікальні values**.

    const numbers = new Set();

    numbers.add(10);
    numbers.add(20);
    numbers.add(10);

    console.log(numbers);

Результат міститиме:

    10
    20

Другий `10` не додається.

---

# Set Structure

    Set
     │
     ├── 10
     ├── 20
     └── 30

На відміну від Array:

    Array
     │
     ├── 10
     ├── 20
     ├── 10
     └── 30

Set:

    Set
     │
     ├── 10
     ├── 20
     └── 30

---

# Set Methods

Основні methods:

    add()
    delete()
    has()
    clear()

Property:

    size

Приклад:

    const tags = new Set();

    tags.add("javascript");
    tags.add("oop");
    tags.add("javascript");

    console.log(tags.size);

Результат:

    2

Перевірка:

    tags.has("oop");

Результат:

    true

Видалення:

    tags.delete("oop");

---

# Set з Array

Set можна створити з Array.

    const numbers = [
      1,
      2,
      2,
      3,
      3,
      4
    ];

    const uniqueNumbers = new Set(numbers);

    console.log(uniqueNumbers);

Результат:

    Set(4) { 1, 2, 3, 4 }

Щоб отримати Array:

    const uniqueNumbers = [
      ...new Set(numbers)
    ];

---

# Map

`Map` — collection, яка зберігає пари:

    key → value

Приклад:

    const users = new Map();

    users.set(1, "Valeriy");
    users.set(2, "John");

Отримання:

    console.log(users.get(1));

Результат:

    Valeriy

---

# Map Structure

    Map
     │
     ├── 1 → "Valeriy"
     ├── 2 → "John"
     └── 3 → "Anna"

На відміну від Array:

    Array
     │
     ├── 0 → "Valeriy"
     ├── 1 → "John"
     └── 2 → "Anna"

Map використовує keys:

    key → value

---

# Map Methods

Основні methods:

    set()
    get()
    has()
    delete()
    clear()

Property:

    size

Приклад:

    const users = new Map();

    users.set(1, {
      name: "Valeriy"
    });

    users.set(2, {
      name: "John"
    });

Отримання:

    const user = users.get(1);

    console.log(user.name);

---

# Map з Object Keys

Одна з важливих особливостей Map:

**key може бути object.**

    const user = {
      name: "Valeriy"
    };

    const roles = new Map();

    roles.set(user, "admin");

    console.log(roles.get(user));

Результат:

    admin

У звичайному Object ключі перетворюються на strings або symbols.

У Map key може бути:

    string
    number
    boolean
    object
    array
    function
    symbol

---

# Object vs Map

Object:

    const users = {
      1: "Valeriy",
      2: "John"
    };

Map:

    const users = new Map();

    users.set(1, "Valeriy");
    users.set(2, "John");

Map спеціально призначений для collection пар `key → value`.

Object більше підходить для моделювання сутності:

    const user = {
      name: "Valeriy",
      age: 56
    };

Map більше підходить для:

    key → value

---

# WeakSet

`WeakSet` — спеціальна collection для objects.

    const visitedUsers = new WeakSet();

    const user1 = {};
    const user2 = {};

    visitedUsers.add(user1);
    visitedUsers.add(user2);

Перевірка:

    visitedUsers.has(user1);

Результат:

    true

WeakSet може містити тільки objects.

Не можна:

    visitedUsers.add("user");

---

# WeakMap

`WeakMap` — collection, яка зберігає:

    object → value

Приклад:

    const privateData = new WeakMap();

    const user = {};

    privateData.set(user, {
      password: "12345"
    });

Отримання:

    console.log(
      privateData.get(user)
    );

---

# WeakMap і Garbage Collection

WeakMap використовує weak references до keys.

Якщо object більше ніде не використовується:

    let user = {};

    const data = new WeakMap();

    data.set(user, "some data");

Якщо:

    user = null;

object може бути видалений Garbage Collector разом із пов'язаними даними WeakMap.

Важливо:

    WeakMap
       │
       └── object key
               │
               ▼
          value

WeakMap не заважає Garbage Collector видалити object, якщо на нього більше немає сильних references.

---

# WeakSet vs WeakMap

WeakSet:

    object → stored object

WeakMap:

    object → value

WeakSet:

    const set = new WeakSet();

    set.add(user);

WeakMap:

    const map = new WeakMap();

    map.set(user, data);

---

# Array vs Set vs Map

### Array

    const users = [];

Використовуй, коли:

✔ важливий порядок  
✔ потрібен index  
✔ можуть бути дублікати  
✔ потрібні Array methods  

---

### Set

    const users = new Set();

Використовуй, коли:

✔ потрібні унікальні values  
✔ потрібно швидко перевіряти наявність  
✔ дублікати не потрібні  

---

### Map

    const users = new Map();

Використовуй, коли:

✔ потрібні `key → value`  
✔ key не обов'язково string  
✔ потрібна collection пар  
✔ потрібно явно працювати з keys  

---

### WeakSet

    const objects = new WeakSet();

Використовуй для:

✔ objects  
✔ weak references  
✔ membership tracking  

---

### WeakMap

    const data = new WeakMap();

Використовуй для:

✔ object keys  
✔ пов'язаних metadata  
✔ weak references  
✔ даних, життєвий цикл яких пов'язаний з object  

---

# Основне порівняння

    Array
    │
    ├── ordered
    ├── index
    └── duplicates allowed

    Set
    │
    ├── unique values
    └── no index

    Map
    │
    ├── key
    └── value

    WeakSet
    │
    └── objects only

    WeakMap
    │
    └── object → value

---

# Iterable

Iterable — object, який можна перебирати за допомогою:

    for...of

Array є iterable:

    const numbers = [1, 2, 3];

    for (const number of numbers) {
      console.log(number);
    }

Set є iterable:

    const numbers = new Set([1, 2, 3]);

    for (const number of numbers) {
      console.log(number);
    }

Map є iterable:

    const users = new Map([
      [1, "Valeriy"],
      [2, "John"]
    ]);

    for (const [id, name] of users) {
      console.log(id, name);
    }

---

# Iterator

Iterator — object, який дозволяє послідовно отримувати елементи collection.

Iterable має method:

    Symbol.iterator

Наприклад:

    const numbers = [10, 20, 30];

    const iterator = numbers[Symbol.iterator]();

    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());

Результати містять:

    value
    done

Приблизно:

    {
      value: 10,
      done: false
    }

    {
      value: 20,
      done: false
    }

    {
      value: 30,
      done: false
    }

    {
      value: undefined,
      done: true
    }

---

# for...of

`for...of` використовує iterator mechanism.

    const numbers = [10, 20, 30];

    for (const number of numbers) {
      console.log(number);
    }

Концептуально:

    iterable
       │
       ▼
    iterator
       │
       ▼
    next()
       │
       ▼
    value

---

# forEach

Array, Set та Map мають `forEach()`, але callback parameters відрізняються.

Array:

    const numbers = [10, 20, 30];

    numbers.forEach((value, index) => {
      console.log(value, index);
    });

Set:

    const numbers = new Set([10, 20, 30]);

    numbers.forEach(value => {
      console.log(value);
    });

Map:

    const users = new Map([
      [1, "Valeriy"],
      [2, "John"]
    ]);

    users.forEach((value, key) => {
      console.log(key, value);
    });

---

# Map keys()

Отримати keys:

    const users = new Map([
      [1, "Valeriy"],
      [2, "John"]
    ]);

    for (const key of users.keys()) {
      console.log(key);
    }

Результат:

    1
    2

---

# Map values()

Отримати values:

    for (const value of users.values()) {
      console.log(value);
    }

Результат:

    Valeriy
    John

---

# Map entries()

Отримати pairs:

    for (const [key, value] of users.entries()) {
      console.log(key, value);
    }

Результат:

    1 Valeriy
    2 John

За замовчуванням:

    for (const entry of users) {
      console.log(entry);
    }

Map перебирається як:

    [key, value]

---

# Set values()

Для Set:

    const tags = new Set([
      "javascript",
      "oop",
      "backend"
    ]);

    for (const tag of tags.values()) {
      console.log(tag);
    }

---

# Collection у OOP

Collections особливо важливі в OOP, тому що objects часто повинні керувати групами інших objects.

Наприклад:

    class Cart {
      constructor() {
        this.items = [];
      }
    }

Cart має collection:

    Cart
      │
      └── items
           │
           ├── Product
           ├── Product
           └── Product

---

# Collection of Objects

    class Product {
      constructor(name, price) {
        this.name = name;
        this.price = price;
      }
    }

    class Cart {
      constructor() {
        this.items = [];
      }

      add(product) {
        this.items.push(product);
      }

      getTotal() {
        return this.items.reduce(
          (total, product) => {
            return total + product.price;
          },
          0
        );
      }
    }

    const laptop = new Product("Laptop", 1000);
    const mouse = new Product("Mouse", 50);

    const cart = new Cart();

    cart.add(laptop);
    cart.add(mouse);

    console.log(cart.getTotal());

Результат:

    1050

---

# Collection Management

Class може відповідати за керування collection.

    class UserManager {
      constructor() {
        this.users = [];
      }

      add(user) {
        this.users.push(user);
      }

      remove(id) {
        this.users = this.users.filter(
          user => user.id !== id
        );
      }

      findById(id) {
        return this.users.find(
          user => user.id === id
        );
      }

      getAll() {
        return this.users;
      }
    }

Тут:

    UserManager
         │
         ├── users
         │
         ├── add()
         ├── remove()
         ├── findById()
         └── getAll()

Це приклад collection management.

---

# Array vs Map у Manager

Якщо пошук часто виконується за `id`, Map може бути зручнішим.

Array:

    class UserManager {
      constructor() {
        this.users = [];
      }

      findById(id) {
        return this.users.find(
          user => user.id === id
        );
      }
    }

Map:

    class UserManager {
      constructor() {
        this.users = new Map();
      }

      add(user) {
        this.users.set(user.id, user);
      }

      findById(id) {
        return this.users.get(id);
      }
    }

Модель:

    Map
     │
     ├── id → User
     ├── id → User
     └── id → User

Map добре підходить для collection, де основним способом доступу є key.

---

# Set у OOP

Set зручно використовувати для унікальних значень.

Наприклад tags:

    class Article {
      constructor(title) {
        this.title = title;
        this.tags = new Set();
      }

      addTag(tag) {
        this.tags.add(tag);
      }

      removeTag(tag) {
        this.tags.delete(tag);
      }

      hasTag(tag) {
        return this.tags.has(tag);
      }
    }

    const article = new Article(
      "JavaScript OOP"
    );

    article.addTag("javascript");
    article.addTag("oop");
    article.addTag("javascript");

У результаті:

    javascript
    oop

Дублікат не зберігається.

---

# Composition + Collections

Collections часто використовуються разом із composition.

    class Engine {}

    class Car {
      constructor() {
        this.engine = new Engine();
        this.passengers = [];
      }
    }

Car:

    Car
     │
     ├── engine → Engine
     │
     └── passengers → Array
                         │
                         ├── Person
                         ├── Person
                         └── Person

Object може містити як окремі objects, так і collections objects.

---

# Collection Class

Іноді collection можна винести в окремий class.

    class UserCollection {
      constructor() {
        this.users = [];
      }

      add(user) {
        this.users.push(user);
      }

      remove(user) {
        this.users = this.users.filter(
          item => item !== user
        );
      }

      getAll() {
        return [...this.users];
      }
    }

Тоді:

    class UserService {
      constructor() {
        this.users = new UserCollection();
      }
    }

Модель:

    UserService
         │
         ▼
    UserCollection
         │
         ▼
       Array
         │
         ├── User
         ├── User
         └── User

Цей підхід дозволяє приховати внутрішню реалізацію collection.

---

# Encapsulation of Collections

Не завжди потрібно дозволяти зовнішньому коду напряму змінювати collection.

Погано:

    class Cart {
      constructor() {
        this.items = [];
      }
    }

    const cart = new Cart();

    cart.items.push("Something");

Інший підхід:

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

Тепер внутрішня collection контролюється самим class.

Модель:

    Cart
      │
      └── #items
            │
            └── private collection

Public API:

    add()
    remove()
    getItems()

---

# Чому getItems() повертає копію

Якщо повернути внутрішній Array:

    getItems() {
      return this.#items;
    }

зовнішній код може змінити його:

    cart.getItems().push(item);

Якщо повернути копію:

    getItems() {
      return [...this.#items];
    }

зовнішній код отримує копію.

Модель:

    Cart
      │
      └── #items
           │
           │ copy
           ▼
        external code

Це один із простих способів підтримувати encapsulation.

---

# Collection API

Для collection class корисно створювати зрозумілий API:

    add()
    remove()
    find()
    findById()
    has()
    clear()
    getAll()
    getSize()

Наприклад:

    class UserCollection {
      #users = [];

      add(user) {
        this.#users.push(user);
      }

      getSize() {
        return this.#users.length;
      }

      has(user) {
        return this.#users.includes(user);
      }

      getAll() {
        return [...this.#users];
      }

      clear() {
        this.#users = [];
      }
    }

---

# Array → Set → Map

Корисно мислити вибір collection через питання.

### Потрібен порядок та index?

    Array

### Потрібні тільки унікальні values?

    Set

### Потрібно key → value?

    Map

### Потрібні weak references до objects?

    WeakSet
    WeakMap

---

# Приклад вибору Collection

Users:

    const users = [];

Якщо потрібен список:

    Array

Якщо потрібно зберігати унікальні roles:

    const roles = new Set();

Якщо потрібно швидко знаходити user за id:

    const users = new Map();

Якщо потрібно зберігати metadata, пов'язану з object:

    const metadata = new WeakMap();

---

# Collection і CRUD

Collections можна використовувати для CRUD operations.

    class UserCollection {
      constructor() {
        this.users = [];
      }

      // Create
      add(user) {
        this.users.push(user);
      }

      // Read
      getAll() {
        return [...this.users];
      }

      // Update
      update(id, data) {
        const user = this.users.find(
          user => user.id === id
        );

        if (user) {
          Object.assign(user, data);
        }
      }

      // Delete
      remove(id) {
        this.users = this.users.filter(
          user => user.id !== id
        );
      }
    }

Модель:

    Collection
       │
       ├── Create → add()
       ├── Read   → getAll()
       ├── Update → update()
       └── Delete → remove()

---

# Типові помилки

❌ Використовувати Array, коли потрібні унікальні values.

❌ Використовувати Set, коли потрібен доступ за key → value.

❌ Плутати `length` та `size`.

❌ Використовувати `map()` для Map.

❌ Плутати `Map` та `Object`.

❌ Вважати Set масивом без index.

❌ Очікувати, що Set зберігатиме дублікати.

❌ Забувати, що WeakMap keys повинні бути objects.

❌ Забувати, що WeakSet може містити тільки objects.

❌ Напряму дозволяти змінювати internal collection без необхідності.

❌ Повернути internal Array назовні та втратити encapsulation.

❌ Створювати окремий collection class без реальної потреби.

---

# Питання зі співбесіди

Що таке collection?

Які основні collections є в JavaScript?

Що таке Array?

Що таке Set?

Що таке Map?

Що таке WeakSet?

Що таке WeakMap?

Яка різниця між Array та Set?

Яка різниця між Object та Map?

Яка різниця між Set та Map?

Що таке `size`?

Чим `size` відрізняється від `length`?

Для чого використовується `add()`?

Для чого використовується `set()`?

Для чого використовується `get()`?

Для чого використовується `has()`?

Що таке iterable?

Що таке iterator?

Як працює `for...of`?

Чому Map може використовувати object як key?

Чому WeakMap використовує object keys?

Для чого WeakMap може використовуватися в OOP?

Як collection може бути частиною state class?

Як encapsulation застосовується до collections?

Коли вибрати Array?

Коли вибрати Set?

Коли вибрати Map?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке collection.

Array.

Array index.

Array `length`.

Set.

Set `size`.

Set `add()`.

Set `delete()`.

Set `has()`.

Map.

Map key/value.

Map `set()`.

Map `get()`.

Map `delete()`.

Map `has()`.

`for...of`.

Iterable.

Collection of objects.

Collections як state class.

---

🔵 Junior

Array methods.

Set methods.

Map methods.

Map keys.

Map values.

Map entries.

Object vs Map.

Array vs Set.

Array vs Map.

WeakSet.

WeakMap.

Object keys у Map.

Collection management.

Encapsulation collections.

Private collections.

Composition + collections.

---

🟠 Middle

Створення власних collection classes.

Collection API design.

Collection encapsulation.

Collection of domain objects.

Array vs Map trade-offs.

Set для uniqueness.

Map для indexed access.

Composition через collections.

Collection services.

CRUD через collections.

Ітерація власних collections.

Custom iterators.

Custom iterable objects.

---

🔴 Senior

Collection design.

Data structure selection.

Performance characteristics.

Memory management.

Weak references.

Garbage Collection.

Collection abstraction.

Collection API design.

Encapsulation boundaries.

Domain collections.

Repository-like abstractions.

Composition and collection management.

Trade-offs між Array, Set, Map та custom collections.

---

# Міні-шпаргалка

Collections:

    Collections
       │
       ├── Array
       │    ├── ordered
       │    ├── index
       │    └── duplicates
       │
       ├── Set
       │    ├── unique values
       │    └── size
       │
       ├── Map
       │    ├── key
       │    └── value
       │
       ├── WeakSet
       │    └── objects
       │
       └── WeakMap
            └── object → value

---

Вибір collection:

    Need ordered list?
          │
          ▼
        Array

    Need unique values?
          │
          ▼
         Set

    Need key → value?
          │
          ▼
         Map

    Need weak object references?
          │
          ├── membership → WeakSet
          │
          └── metadata   → WeakMap

---

OOP:

    Class
      │
      └── State
           │
           └── Collection
                │
                ├── Object
                ├── Object
                └── Object

---

Collection management:

    Service / Class
          │
          ▼
      Collection
          │
          ├── add()
          ├── remove()
          ├── find()
          ├── update()
          ├── has()
          └── getAll()

---

Encapsulation:

    Class
      │
      ├── private collection
      │
      └── public API
           ├── add()
           ├── remove()
           └── getAll()

---

# Головне

• Collection — структура для роботи з групою значень або objects.

• Array — ordered collection з numeric indexes.

• Array дозволяє дублікати.

• Set зберігає унікальні values.

• Set використовує `size`, а Array — `length`.

• Map зберігає пари `key → value`.

• Map може використовувати objects як keys.

• WeakSet працює тільки з objects.

• WeakMap зберігає `object → value`.

• WeakMap використовує weak references до keys.

• Array, Set та Map є iterable.

• `for...of` використовується для перебору iterable collections.

• Collections часто є частиною state class.

• Class може керувати collection через methods.

• Collection можна інкапсулювати за допомогою private fields.

• Для ordered list зазвичай використовують Array.

• Для унікальних values — Set.

• Для `key → value` — Map.

• Для weak references до objects — WeakSet / WeakMap.

• У OOP важливо не тільки зберігати objects у collection, а й правильно організовувати **відповідальність за керування цією collection**.

---

# Коротка модель для запам'ятовування

    ARRAY
      │
      ├── order
      ├── index
      └── duplicates

    SET
      │
      └── unique values

    MAP
      │
      └── key → value

    WEAKSET
      │
      └── objects

    WEAKMAP
      │
      └── object → value

    OOP
      │
      ▼
    Class
      │
      ▼
    Collection
      │
      ├── add()
      ├── remove()
      ├── find()
      └── getAll()