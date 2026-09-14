# 10. Method Chaining

## 📌 Що таке Method Chaining

**Method Chaining** — це послідовний виклик декількох методів одного значення, коли результат попереднього методу передається наступному.

Замість:

    const filtered = numbers.filter(number => number > 5);
    const doubled = filtered.map(number => number * 2);
    const sorted = doubled.sort((a, b) => a - b);

можна записати:

    const result = numbers
      .filter(number => number > 5)
      .map(number => number * 2)
      .sort((a, b) => a - b);

### Головна ідея

    data
      → method()
      → method()
      → method()
      → result

Наприклад:

    const result = numbers
      .filter(number => number > 5)
      .map(number => number * 2)
      .slice(0, 3);

Кожен наступний метод працює з результатом попереднього.

---

# 1. Базовий приклад

    const numbers = [1, 2, 3, 4, 5];

    const result = numbers
      .filter(number => number > 2)
      .map(number => number * 10);

    console.log(result);
    // [30, 40, 50]

Розбір:

    [1, 2, 3, 4, 5]
          ↓ filter
    [3, 4, 5]
          ↓ map
    [30, 40, 50]

Тобто:

    numbers
      .filter(...)
      .map(...)

це приблизно те саме, що:

    const filtered = numbers.filter(...);
    const result = filtered.map(...);

---

# 2. Які методи можна об'єднувати

Найчастіше Method Chaining використовується з методами масивів:

- `filter()`
- `map()`
- `reduce()`
- `find()`
- `findIndex()`
- `some()`
- `every()`
- `includes()`
- `slice()`
- `flat()`
- `flatMap()`
- `sort()`
- `toSorted()`
- `reverse()`
- `toReversed()`

Але важливо розуміти:

> Не всі методи повертають масив.

Саме від типу результату залежить, чи можна продовжувати chain.

---

# 3. `filter()` → `map()`

Один із найпоширеніших варіантів.

    const numbers = [1, 2, 3, 4, 5, 6];

    const result = numbers
      .filter(number => number % 2 === 0)
      .map(number => number * 10);

    console.log(result);
    // [20, 40, 60]

Послідовність:

    [1, 2, 3, 4, 5, 6]
              ↓
    filter(even)
              ↓
    [2, 4, 6]
              ↓
    map(* 10)
              ↓
    [20, 40, 60]

---

# 4. `map()` → `filter()`

Порядок методів має значення.

    const numbers = [1, 2, 3, 4, 5];

    const result = numbers
      .map(number => number * 2)
      .filter(number => number > 5);

    console.log(result);
    // [6, 8, 10]

Спочатку:

    [1, 2, 3, 4, 5]
          ↓ map
    [2, 4, 6, 8, 10]
          ↓ filter > 5
    [6, 8, 10]

Це не те саме, що:

    const result = numbers
      .filter(number => number > 5)
      .map(number => number * 2);

Результат:

    []

Тому що до `map()` потрапляють тільки числа, більші за `5`, а їх у початковому масиві немає.

---

# 5. `filter()` → `map()` → `sort()`

Практичний приклад:

    const numbers = [10, 3, 8, 15, 2, 7];

    const result = numbers
      .filter(number => number > 5)
      .map(number => number * 2)
      .sort((a, b) => a - b);

    console.log(result);
    // [14, 16, 20, 30]

Послідовність:

    [10, 3, 8, 15, 2, 7]
              ↓ filter
    [10, 8, 15, 7]
              ↓ map
    [20, 16, 30, 14]
              ↓ sort
    [14, 16, 20, 30]

---

# 6. `filter()` → `map()` → `join()`

Chaining може закінчуватися не масивом.

    const users = [
      { name: "Anna", age: 25 },
      { name: "Oleh", age: 17 },
      { name: "Ivan", age: 30 }
    ];

    const result = users
      .filter(user => user.age >= 18)
      .map(user => user.name)
      .join(", ");

    console.log(result);
    // "Anna, Ivan"

Послідовність:

    users
      ↓
    filter()
      ↓
    users[]
      ↓
    map()
      ↓
    names[]
      ↓
    join()
      ↓
    string

Після `join()` результат уже `string`.

Тому:

    users
      .filter(...)
      .map(...)
      .join(", ");

працює.

А:

    users
      .filter(...)
      .map(...)
      .join(", ")
      .filter(...)

не працює, тому що `string` не має методу `filter()`.

---

# 7. `filter()` → `map()` → `reduce()`

Дуже важливий full-stack-патерн.

    const products = [
      { name: "Book", price: 20 },
      { name: "Pen", price: 5 },
      { name: "Laptop", price: 1000 },
      { name: "Phone", price: 700 }
    ];

    const total = products
      .filter(product => product.price > 10)
      .map(product => product.price)
      .reduce((sum, price) => sum + price, 0);

    console.log(total);
    // 1720

Послідовність:

    products[]
      ↓ filter
    expensiveProducts[]
      ↓ map
    prices[]
      ↓ reduce
    number

---

# 8. `map()` → `reduce()`

Наприклад, отримати загальну кількість товарів:

    const products = [
      { name: "Book", quantity: 3 },
      { name: "Pen", quantity: 10 },
      { name: "Notebook", quantity: 5 }
    ];

    const total = products
      .map(product => product.quantity)
      .reduce((sum, quantity) => sum + quantity, 0);

    console.log(total);
    // 18

Але тут можна подумати:

> Чи потрібен нам взагалі `map()`?

Можна зробити:

    const total = products.reduce(
      (sum, product) => sum + product.quantity,
      0
    );

Це часто краще.

---

# 9. Не потрібно робити chaining заради chaining

Погано:

    const result = numbers
      .map(number => number)
      .filter(number => true)
      .map(number => number)
      .slice(0);

Якщо метод нічого корисного не робить — він тільки ускладнює код.

### Хороший принцип

> Chaining повинен робити код зрозумілішим, а не просто коротшим.

---

# 10. `find()` завершує ланцюжок масиву

`find()` повертає **один елемент**, а не масив.

    const users = [
      { id: 1, name: "Anna", active: false },
      { id: 2, name: "Oleh", active: true },
      { id: 3, name: "Ivan", active: true }
    ];

    const name = users
      .filter(user => user.active)
      .map(user => user.name)
      .find(name => name.startsWith("I"));

    console.log(name);
    // "Ivan"

Тут:

    users[]
      ↓ filter
    users[]
      ↓ map
    string[]
      ↓ find
    string | undefined

Після `find()` вже не можна викликати `map()` як метод масиву:

    users
      .find(...)
      .map(...);

Це помилка.

---

# 11. `find()` → властивість об'єкта

Можна отримати властивість знайденого об'єкта:

    const users = [
      { id: 1, name: "Anna" },
      { id: 2, name: "Oleh" },
      { id: 3, name: "Ivan" }
    ];

    const name = users.find(user => user.id === 2)?.name;

    console.log(name);
    // "Oleh"

Тут використовується optional chaining:

    ?.name

Він захищає від ситуації, коли `find()` поверне `undefined`.

---

# 12. `some()` та `every()` у chaining

Наприклад:

    const numbers = [2, 4, 6, 8, 10];

    const result = numbers
      .filter(number => number > 3)
      .every(number => number % 2 === 0);

    console.log(result);
    // true

Послідовність:

    array
      ↓
    filter()
      ↓
    array
      ↓
    every()
      ↓
    boolean

`every()` завершує ланцюжок масиву, якщо після нього немає операцій над boolean.

---

# 13. `map()` → `some()`

    const users = [
      { name: "Anna", age: 20 },
      { name: "Oleh", age: 17 },
      { name: "Ivan", age: 25 }
    ];

    const hasMinor = users
      .map(user => user.age)
      .some(age => age < 18);

    console.log(hasMinor);
    // true

Але знову:

    users.some(user => user.age < 18);

буде простіше.

### Важливий принцип

Не використовуй проміжний `map()`, якщо потрібний результат можна отримати без нього.

---

# 14. `flatMap()` як частина chaining

Наприклад:

    const users = [
      {
        name: "Anna",
        skills: ["HTML", "CSS"]
      },
      {
        name: "Oleh",
        skills: ["JavaScript", "React"]
      }
    ];

    const skills = users
      .map(user => user.skills)
      .flat();

    console.log(skills);
    // ["HTML", "CSS", "JavaScript", "React"]

Те саме можна зробити коротше:

    const skills = users.flatMap(user => user.skills);

---

# 15. `filter()` → `flatMap()`

Практичний приклад:

    const users = [
      {
        name: "Anna",
        skills: ["HTML", "CSS"]
      },
      {
        name: "Oleh",
        skills: ["JavaScript", "React"]
      },
      {
        name: "Ivan",
        skills: []
      }
    ];

    const skills = users
      .filter(user => user.skills.length > 0)
      .flatMap(user => user.skills);

    console.log(skills);
    // ["HTML", "CSS", "JavaScript", "React"]

---

# 16. `slice()` у chaining

`slice()` повертає новий масив, тому його можна продовжувати.

    const numbers = [1, 2, 3, 4, 5, 6];

    const result = numbers
      .filter(number => number % 2 === 0)
      .map(number => number * 10)
      .slice(0, 2);

    console.log(result);
    // [20, 40]

Послідовність:

    [1, 2, 3, 4, 5, 6]
      ↓ filter
    [2, 4, 6]
      ↓ map
    [20, 40, 60]
      ↓ slice
    [20, 40]

---

# 17. `sort()` у chaining

Наприклад:

    const numbers = [10, 3, 25, 7, 1];

    const result = numbers
      .filter(number => number > 5)
      .map(number => number * 2)
      .sort((a, b) => a - b);

    console.log(result);
    // [14, 20, 50]

### Увага

`sort()` змінює масив, який отримав.

Якщо це проміжний новий масив після `filter()` або `map()`, проблеми з оригінальним масивом зазвичай немає:

    const result = numbers
      .filter(...)
      .map(...)
      .sort(...);

Але якщо потрібно гарантувати незмінність уже існуючого масиву, краще:

    const result = numbers
      .filter(...)
      .toSorted((a, b) => a - b);

або:

    const result = [...numbers]
      .sort((a, b) => a - b);

---

# 18. `toSorted()` у chaining

Сучасний варіант:

    const result = numbers
      .filter(number => number > 5)
      .map(number => number * 2)
      .toSorted((a, b) => a - b);

`toSorted()`:

- не змінює масив;
- повертає новий масив;
- добре підходить для immutable-підходу.

---

# 19. Читання довгого chain

Наприклад:

    const result = products
      .filter(product => product.inStock)
      .filter(product => product.price > 100)
      .map(product => ({
        name: product.name,
        price: product.price
      }))
      .toSorted((a, b) => a.price - b.price)
      .slice(0, 5);

Не потрібно сприймати це як одну складну операцію.

Читайте зверху вниз:

    products
      ↓
    тільки товари в наявності
      ↓
    тільки дорожчі за 100
      ↓
    залишаємо name + price
      ↓
    сортуємо за ціною
      ↓
    беремо перші 5

---

# 20. Практичний приклад: список користувачів

    const users = [
      { name: "Anna", age: 25, active: true },
      { name: "Oleh", age: 17, active: true },
      { name: "Ivan", age: 32, active: false },
      { name: "Maria", age: 28, active: true }
    ];

    const result = users
      .filter(user => user.active)
      .filter(user => user.age >= 18)
      .map(user => user.name)
      .toSorted();

    console.log(result);
    // ["Anna", "Maria"]

Логіка:

    users
      ↓
    active
      ↓
    age >= 18
      ↓
    name
      ↓
    sort
      ↓
    ["Anna", "Maria"]

---

# 21. Практичний приклад: товари

    const products = [
      { name: "Laptop", price: 1000, category: "electronics" },
      { name: "Phone", price: 700, category: "electronics" },
      { name: "Book", price: 20, category: "books" },
      { name: "Headphones", price: 150, category: "electronics" }
    ];

    const result = products
      .filter(product => product.category === "electronics")
      .filter(product => product.price >= 100)
      .toSorted((a, b) => a.price - b.price)
      .map(product => product.name);

    console.log(result);
    // ["Headphones", "Phone", "Laptop"]

---

# 22. Практичний приклад: дані для UI

Method chaining дуже часто зустрічається перед передачею даних у UI.

    const products = [
      { id: 1, name: "Laptop", price: 1000, active: true },
      { id: 2, name: "Phone", price: 700, active: false },
      { id: 3, name: "Headphones", price: 150, active: true }
    ];

    const visibleProducts = products
      .filter(product => product.active)
      .toSorted((a, b) => a.price - b.price);

Результат:

    [
      { id: 3, name: "Headphones", price: 150, active: true },
      { id: 1, name: "Laptop", price: 1000, active: true }
    ]

У React це може бути основою для рендерингу:

    visibleProducts.map(product => ...)

---

# 23. Method Chaining і React

Типовий React-підхід:

    const visibleUsers = users
      .filter(user => user.active)
      .filter(user => user.role === "student")
      .toSorted((a, b) => a.name.localeCompare(b.name));

Потім:

    visibleUsers.map(user => ...)

Це дуже поширений патерн:

    data
      → filter
      → filter
      → sort
      → map
      → UI

---

# 24. Chaining і immutable data

Для сучасного JavaScript особливо важливо розуміти, які методи мутують масив.

### Не мутують

    filter()
    map()
    reduce()
    find()
    findIndex()
    some()
    every()
    slice()
    flat()
    flatMap()
    toSorted()
    toReversed()
    toSpliced()

### Мутують

    sort()
    reverse()
    splice()
    push()
    pop()
    shift()
    unshift()

Наприклад:

    const result = numbers
      .filter(...)
      .map(...)
      .toSorted(...);

Це хороший immutable chain.

---

# 25. Chaining з `reduce()`

`reduce()` особливий тим, що може повернути будь-який тип.

Наприклад, число:

    const total = products
      .filter(product => product.active)
      .reduce((sum, product) => sum + product.price, 0);

Результат:

    number

Або об'єкт:

    const result = users.reduce((acc, user) => {
      acc[user.id] = user.name;
      return acc;
    }, {});

Результат:

    object

Тому після `reduce()` потрібно дивитися, що саме він повертає.

---

# 26. Chaining з `reduce()` → `Object.values()`

Наприклад:

    const users = [
      { id: 1, name: "Anna", role: "admin" },
      { id: 2, name: "Oleh", role: "user" },
      { id: 3, name: "Ivan", role: "user" }
    ];

    const usersById = users.reduce((result, user) => {
      result[user.id] = user;
      return result;
    }, {});

    const userList = Object.values(usersById);

Тут chain уже не такий прямий, тому іноді окремі змінні роблять код зрозумілішим.

---

# 27. Коли chaining стає занадто довгим

Погано:

    const result = users
      .filter(user => user.active)
      .filter(user => user.age >= 18)
      .filter(user => user.role === "student")
      .map(user => ({
        name: user.name,
        age: user.age,
        score: user.score
      }))
      .filter(user => user.score >= 80)
      .toSorted((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(user => user.name)
      .join(", ");

Технічно це може бути правильно.

Але читати його вже важче.

Можна розбити:

    const activeStudents = users
      .filter(user => user.active)
      .filter(user => user.age >= 18)
      .filter(user => user.role === "student");

    const topStudents = activeStudents
      .map(user => ({
        name: user.name,
        age: user.age,
        score: user.score
      }))
      .filter(user => user.score >= 80)
      .toSorted((a, b) => b.score - a.score)
      .slice(0, 10);

    const names = topStudents.map(user => user.name);

Тепер кожен етап має зрозумілу назву.

---

# 28. Коли краще окремі змінні

Використовуй окремі змінні, якщо:

- логіка складна;
- проміжний результат має власний сенс;
- потрібно повторно використати результат;
- chain стає занадто довгим;
- потрібно налагоджувати код;
- кожен етап виконує окрему бізнес-операцію.

Наприклад:

    const activeUsers = users.filter(user => user.active);

    const adults = activeUsers.filter(user => user.age >= 18);

    const names = adults.map(user => user.name);

Це довше, але дуже зрозуміло.

---

# 29. Method Chaining і debugging

Довгий chain іноді складніше налагоджувати.

Наприклад:

    const result = users
      .filter(user => user.active)
      .filter(user => user.age >= 18)
      .map(user => user.name)
      .toSorted();

Якщо результат неправильний, можна тимчасово розділити:

    const activeUsers = users.filter(user => user.active);

    console.log(activeUsers);

    const adults = activeUsers.filter(user => user.age >= 18);

    console.log(adults);

    const names = adults.map(user => user.name);

    console.log(names);

Так легше знайти етап, де виникла проблема.

---

# 30. Важливе правило: дивись на тип результату

Перед тим як додавати наступний метод, запитай:

> Що повернув попередній метод?

Наприклад:

    filter()
    → Array

Тому можна:

    .map()
    .filter()
    .reduce()
    .sort()
    .slice()

Але:

    reduce()
    → залежить від accumulator

    find()
    → Element | undefined

    some()
    → boolean

    every()
    → boolean

    join()
    → string

Тому chaining потрібно будувати на основі типів результатів.

---

# 31. `map()` → `filter()` → `map()`

Це дуже поширений патерн.

    const users = [
      { name: "Anna", age: 25 },
      { name: "Oleh", age: 17 },
      { name: "Ivan", age: 30 }
    ];

    const result = users
      .map(user => ({
        ...user,
        isAdult: user.age >= 18
      }))
      .filter(user => user.isAdult)
      .map(user => user.name);

    console.log(result);
    // ["Anna", "Ivan"]

Але тут створюється проміжна властивість `isAdult`, яка більше ніде не потрібна.

Можна простіше:

    const result = users
      .filter(user => user.age >= 18)
      .map(user => user.name);

### Висновок

Не додавай `map()` лише для того, щоб потім використати створене значення один раз.

---

# 32. Chaining та продуктивність

Наприклад:

    const result = numbers
      .filter(number => number > 0)
      .map(number => number * 2)
      .filter(number => number < 100);

Кожен метод створює проміжний масив.

Умовно:

    numbers
      ↓
    filter → new array
      ↓
    map → new array
      ↓
    filter → new array

Для більшості звичайних UI-задач це абсолютно нормально.

Не потрібно оптимізувати chaining без реальної потреби.

---

# 33. Chaining vs один `for`

Теоретично можна зробити все одним циклом:

    const result = [];

    for (const number of numbers) {
      if (number > 0) {
        const doubled = number * 2;

        if (doubled < 100) {
          result.push(doubled);
        }
      }
    }

Або декларативно:

    const result = numbers
      .filter(number => number > 0)
      .map(number => number * 2)
      .filter(number => number < 100);

### Для навчання та більшості frontend-задач

Method chaining часто:

- коротший;
- читабельніший;
- ближчий до опису бізнес-логіки;
- простіше розширюється.

### Але

Для дуже великих масивів або критичних за продуктивністю алгоритмів один цикл іноді може бути ефективнішим.

---

# 34. Декларативний стиль

Method chaining добре демонструє **декларативний стиль**.

Замість:

    for (const user of users) {
      if (user.active) {
        ...
      }
    }

ми описуємо:

    users
      .filter(user => user.active)
      .map(user => ...);

Тобто ми більше описуємо:

> ЩО потрібно зробити

а не:

> ЯК вручну пройти кожен елемент.

---

# 35. Типовий full-stack pipeline

У реальному full-stack застосунку дані можуть проходити приблизно такий pipeline:

    API response
      ↓
    filter()
      ↓
    map()
      ↓
    sort()
      ↓
    slice()
      ↓
    UI

Наприклад:

    const visibleProducts = products
      .filter(product => product.isActive)
      .filter(product => product.stock > 0)
      .toSorted((a, b) => a.price - b.price)
      .slice(0, 20);

Це дуже близько до реальної роботи з даними у React / Next.js.

---

# 36. Практичний приклад: пошук товарів

Уявімо, що користувач вводить пошуковий запит:

    const query = "phone";

    const result = products
      .filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
      .toSorted((a, b) => a.price - b.price);

Результат:

- тільки товари, назва яких містить `phone`;
- відсортовані за ціною.

---

# 37. Практичний приклад: фільтрація + pagination

    const page = products
      .filter(product => product.active)
      .toSorted((a, b) => a.name.localeCompare(b.name))
      .slice(0, 10);

Отримуємо перші 10 активних товарів.

Для наступної сторінки:

    const page = products
      .filter(product => product.active)
      .toSorted((a, b) => a.name.localeCompare(b.name))
      .slice(10, 20);

---

# 38. Практичний приклад: дані з backend

Припустимо, backend повернув:

    const response = [
      { id: 1, name: "Anna", active: true },
      { id: 2, name: "Oleh", active: false },
      { id: 3, name: "Ivan", active: true }
    ];

Перед відображенням:

    const users = response
      .filter(user => user.active)
      .toSorted((a, b) => a.name.localeCompare(b.name));

Потім:

    users.map(user => ...);

Це типовий frontend data transformation.

---

# 39. Порядок операцій має значення

Розглянемо:

    numbers
      .filter(number => number > 10)
      .map(number => number * 2);

і:

    numbers
      .map(number => number * 2)
      .filter(number => number > 10);

Вони можуть дати різні результати.

Наприклад:

    const numbers = [5, 8, 12];

Перший варіант:

    [5, 8, 12]
      ↓ filter > 10
    [12]
      ↓ map * 2
    [24]

Другий:

    [5, 8, 12]
      ↓ map * 2
    [10, 16, 24]
      ↓ filter > 10
    [16, 24]

### Головний висновок

> Chaining — це не просто набір методів. Порядок методів визначає результат.

---

# 40. Хороший порядок операцій

Немає універсального порядку, але часто логічно:

    filter()
      ↓
    map()
      ↓
    sort()
      ↓
    slice()

Наприклад:

    products
      .filter(product => product.active)
      .map(product => ({
        name: product.name,
        price: product.price
      }))
      .toSorted((a, b) => a.price - b.price)
      .slice(0, 10);

Спочатку зменшуємо кількість даних, потім трансформуємо, сортуємо і беремо потрібну частину.

---

# 41. Метод `includes()` у chaining

`includes()` повертає boolean.

    const hasJavaScript = skills
      .map(skill => skill.toLowerCase())
      .includes("javascript");

Результат:

    true

Після `includes()` вже не можна продовжити chain методами масиву:

    skills
      .map(...)
      .includes(...)
      .filter(...);

це помилка.

---

# 42. Method Chaining — це не тільки масиви

Chaining існує і в інших API.

Наприклад, рядки:

    const result = "  JavaScript  "
      .trim()
      .toLowerCase()
      .replace("javascript", "js");

    console.log(result);
    // "js"

Тут:

    string
      ↓ trim()
    string
      ↓ toLowerCase()
    string
      ↓ replace()
    string

---

# 43. Chaining рядків

Ще один приклад:

    const username = "  Valeriy Svystun  ";

    const result = username
      .trim()
      .toLowerCase()
      .replaceAll(" ", "-");

    console.log(result);
    // "valeriy-svystun"

Тобто загальний принцип Method Chaining:

    value
      .method()
      .method()
      .method();

---

# 44. Метод повертає `this`

Деякі API можуть повертати сам об'єкт і тому підтримують chaining.

Наприклад, концептуально:

    object
      .methodA()
      .methodB()
      .methodC();

Це можливо лише тоді, коли результат `methodA()` має `methodB()`.

Тому основа chaining:

> результат одного виклику повинен підтримувати наступний виклик.

---

# 45. Найважливіші ланцюжки для JavaScript Junior

Добре вміти читати та створювати:

    filter → map

    filter → map → sort

    filter → map → reduce

    filter → toSorted → slice

    map → filter

    filter → flatMap

    filter → map → join

    filter → find

    filter → some

    filter → every

Наприклад:

    const result = users
      .filter(user => user.active)
      .map(user => user.name)
      .toSorted();

---

# 46. Common Mistakes

## ❌ 1. Забутий `return` у callback

Неправильно:

    const result = numbers.map(number => {
      number * 2;
    });

Результат:

    [undefined, undefined, undefined, ...]

Правильно:

    const result = numbers.map(number => {
      return number * 2;
    });

або:

    const result = numbers.map(number => number * 2);

---

## ❌ 2. Плутати `map()` і `filter()`

`map()`:

    array → array тієї ж довжини

`filter()`:

    array → array меншої або такої ж довжини

---

## ❌ 3. Забувати про тип результату

    users
      .map(user => user.name)
      .join(", ");

Після `map()`:

    string[]

Після `join()`:

    string

---

## ❌ 4. Використовувати `sort()` без comparator для чисел

Неправильно:

    numbers.sort();

Правильно:

    numbers.toSorted((a, b) => a - b);

---

## ❌ 5. Випадково мутувати дані

    numbers
      .filter(...)
      .sort(...);

Якщо `sort()` працює з масивом, який потрібно зберегти незмінним, краще:

    numbers
      .filter(...)
      .toSorted(...);

---

## ❌ 6. Робити надто довгі chains

Якщо chain важко прочитати — розбий його на логічні етапи.

---

## ❌ 7. Використовувати зайві методи

Не потрібно:

    users
      .map(user => user)
      .filter(...)
      .map(user => user.name);

Якщо можна:

    users
      .filter(...)
      .map(user => user.name);

---

# 47. Method Chaining і чистий код

Хороший chain повинен читатися майже як речення.

Наприклад:

    const topStudents = students
      .filter(student => student.active)
      .filter(student => student.score >= 80)
      .toSorted((a, b) => b.score - a.score)
      .slice(0, 10);

Його можна прочитати:

> Візьми студентів → залиш активних → залиш тих, хто має 80+ → відсортуй за рейтингом → візьми 10 найкращих.

Це одна з головних переваг Method Chaining.

---

# 48. Практичний шаблон

Для роботи з масивом даних часто можна починати з:

    const result = data
      .filter(item => ...)
      .map(item => ...)
      .toSorted(...)
      .slice(...);

Але це не правило.

Потрібно завжди дивитися на задачу.

---

# 49. Міні-шпаргалка

    // filter → map
    const result = numbers
      .filter(number => number > 5)
      .map(number => number * 2);

    // map → filter
    const result = numbers
      .map(number => number * 2)
      .filter(number => number > 10);

    // filter → map → sort
    const result = numbers
      .filter(number => number > 5)
      .map(number => number * 2)
      .toSorted((a, b) => a - b);

    // filter → map → reduce
    const total = products
      .filter(product => product.active)
      .map(product => product.price)
      .reduce((sum, price) => sum + price, 0);

    // filter → find
    const user = users
      .filter(user => user.active)
      .find(user => user.id === 5);

    // filter → map → join
    const names = users
      .filter(user => user.active)
      .map(user => user.name)
      .join(", ");

    // filter → flatMap
    const skills = users
      .filter(user => user.active)
      .flatMap(user => user.skills);

    // filter → sort → slice
    const topProducts = products
      .filter(product => product.active)
      .toSorted((a, b) => b.rating - a.rating)
      .slice(0, 10);

---

# 50. Шлях вивчення

## 🟢 Core

Потрібно знати:

- що таке Method Chaining;
- як працює передача результату;
- `filter()`;
- `map()`;
- `reduce()`;
- `find()`;
- `some()`;
- `every()`;
- `slice()`;
- `sort()`;
- порядок операцій;
- тип результату кожного методу.

---

## 🟡 Junior

Вміти:

- читати довгі chains;
- будувати `filter → map`;
- будувати `filter → map → sort`;
- працювати з масивами об'єктів;
- трансформувати API data;
- використовувати chaining у React;
- уникати зайвих операцій;
- розуміти mutation / immutability.

---

## 🟠 Middle

Розуміти:

- продуктивність кількох проходів по масиву;
- проміжні масиви;
- структуризацію складних pipeline;
- коли chain краще розбити;
- декларативний стиль;
- чисті функції;
- immutable transformations;
- оптимізацію обробки великих наборів даних.

---

## 🔴 Senior

Розуміти:

- алгоритмічну складність pipeline;
- memory allocations;
- lazy evaluation;
- iterators;
- generators;
- custom collection pipelines;
- оптимізацію data transformation;
- trade-offs між декларативністю та продуктивністю.

---

# 51. Практичні вправи

## Вправа 1 — парні числа

Є:

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

Отримай:

    [4, 8, 12, 16]

Використай:

    filter()
    map()

---

## Вправа 2 — активні користувачі

Є:

    const users = [
      { name: "Anna", active: true },
      { name: "Oleh", active: false },
      { name: "Ivan", active: true }
    ];

Отримай:

    ["Anna", "Ivan"]

---

## Вправа 3 — сортування

Є:

    const numbers = [10, 3, 25, 7, 1, 15];

Отримай числа:

- більші за `5`;
- відсортовані за зростанням.

Очікувано:

    [7, 10, 15, 25]

---

## Вправа 4 — top products

Є:

    const products = [
      { name: "Laptop", price: 1000 },
      { name: "Phone", price: 700 },
      { name: "Book", price: 20 },
      { name: "Headphones", price: 150 }
    ];

Зроби chain, який:

1. залишає товари дорожчі за `100`;
2. сортує за ціною;
3. бере перші `2`;
4. повертає тільки назви.

Очікувано:

    ["Headphones", "Phone"]

---

## Вправа 5 — підрахунок

Є:

    const orders = [
      { price: 100, paid: true },
      { price: 200, paid: false },
      { price: 300, paid: true }
    ];

За допомогою chaining отримай загальну суму оплачених замовлень.

Очікувано:

    400

---

## Вправа 6 — пошук

Є:

    const users = [
      { id: 1, name: "Anna", active: false },
      { id: 2, name: "Oleh", active: true },
      { id: 3, name: "Ivan", active: true }
    ];

Знайди ім'я активного користувача з `id === 3`.

Очікувано:

    "Ivan"

---

# 52. Interview Questions

### Що таке Method Chaining?

Послідовний виклик методів, де результат одного виклику використовується як значення для наступного.

---

### Чому працює:

    numbers
      .filter(...)
      .map(...);

Тому що `filter()` повертає новий масив, а масив має метод `map()`.

---

### Чому не працює:

    numbers
      .filter(...)
      .includes(...)
      .map(...);

Тому що `includes()` повертає `boolean`, а не масив.

---

### Чи всі методи масивів можна chain-ити?

Ні.

Потрібно дивитися на результат методу.

Наприклад:

    map()      → Array
    filter()   → Array
    slice()    → Array
    find()     → Element | undefined
    some()     → boolean
    every()    → boolean
    includes() → boolean
    join()     → string
    reduce()   → залежить від accumulator

---

### Чим відрізняється:

    filter().map()

від:

    map().filter()

Порядком виконання та потенційно результатом.

---

### Чи змінює `map()` оригінальний масив?

Ні.

---

### Чи змінює `filter()` оригінальний масив?

Ні.

---

### Чи змінює `sort()` оригінальний масив?

Так.

---

### Який сучасний immutable-аналог `sort()`?

    toSorted()

---

### Чи завжди довгий chain кращий?

Ні.

Якщо chain стає складним або погано читається, його краще розбити на окремі логічні етапи.

---

# 53. Головна модель у голові

Не сприймай:

    array
      .filter(...)
      .map(...)
      .sort(...)
      .slice(...)

як одну магічну конструкцію.

Думай так:

    array
      ↓
    filter
      ↓
    новий array
      ↓
    map
      ↓
    новий array
      ↓
    sort
      ↓
    array
      ↓
    slice
      ↓
    результат

---

# 54. Головне

> **Method Chaining = результат одного методу стає вхідним значенням наступного.**

Запам'ятай:

    filter()
    → відбирає

    map()
    → перетворює

    reduce()
    → накопичує

    find()
    → знаходить один елемент

    some()
    → чи є хоча б один?

    every()
    → чи всі?

    slice()
    → бере частину

    flat()
    → розгортає вкладені масиви

    flatMap()
    → map + flat(1)

    sort()
    → сортує, мутує

    toSorted()
    → сортує без mutation

    join()
    → масив → string

Головний практичний патерн:

    data
      .filter(...)
      .map(...)
      .toSorted(...)
      .slice(...);

А головне правило:

> **Завжди думай, що повертає поточний метод, і чи має цей результат наступний метод.**