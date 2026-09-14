# 04. some() / every()

`some()` та `every()` — методи масивів JavaScript для перевірки елементів за певною умовою.

Вони не повертають знайдений елемент і не створюють новий масив.

Їх основна задача — отримати відповідь:

    true
    або
    false

Головна різниця:

    some()
    → "Чи існує ХОЧА Б ОДИН елемент, який відповідає умові?"

    every()
    → "Чи ВСІ елементи відповідають умові?"

Обидва методи мають важливу властивість:

> вони можуть завершити перебір раніше, щойно відповідь уже відома.

---

# Ключові поняття

- [ ] `some()`
- [ ] `every()`
- [ ] callback
- [ ] `currentValue`
- [ ] `currentIndex`
- [ ] `array`
- [ ] boolean result
- [ ] `true`
- [ ] `false`
- [ ] predicate
- [ ] short-circuit
- [ ] ранній вихід
- [ ] `some()` → хоча б один
- [ ] `every()` → всі
- [ ] порожній масив
- [ ] `some()` vs `every()`
- [ ] `some()` vs `find()`
- [ ] `every()` vs `filter()`
- [ ] перевірка об'єктів
- [ ] перевірка прав доступу
- [ ] валідація даних
- [ ] перевірка стану

---

# 1. some() — чи існує хоча б один?

Базовий синтаксис:

    array.some(callback)

Приклад:

    const numbers = [5, 10, 15, 20];

    const result = numbers.some(number => number > 10);

    console.log(result);

Результат:

    true

Тому що в масиві є числа:

    15
    20

які більші за `10`.

Але `some()` не повідомляє, яке саме число підійшло.

Він відповідає тільки на питання:

> Чи є хоча б одне?

---

# 2. some() повертає boolean

`some()` завжди повертає:

    true

або:

    false

Наприклад:

    const numbers = [1, 2, 3];

    const result = numbers.some(number => number > 10);

    console.log(result);

Результат:

    false

Жодне число не більше `10`.

---

# 3. Простий приклад some()

    const numbers = [1, 3, 5, 8, 9];

    const hasEven = numbers.some(number => number % 2 === 0);

    console.log(hasEven);

Результат:

    true

Тому що:

    8

є парним числом.

---

# 4. some() з перевіркою на конкретне значення

    const fruits = [
      "apple",
      "banana",
      "orange"
    ];

    const hasBanana = fruits.some(fruit => fruit === "banana");

    console.log(hasBanana);

Результат:

    true

Але для простого пошуку конкретного значення часто краще:

    fruits.includes("banana")

Тобто:

    some()

особливо корисний, коли перевірка задається складною умовою.

---

# 5. some() шукає перший true

Умовно:

    const numbers = [2, 4, 7, 8, 10];

    const result = numbers.some(number => number % 2 !== 0);

JavaScript перевіряє:

    2 → false
    4 → false
    7 → true  ← зупинка

Результат:

    true

Числа `8` та `10` вже не перевіряються.

---

# 6. Short-circuit у some()

Це називається:

    short-circuit

або:

    раннє завершення

Як тільки callback повернув `true`, `some()` одразу повертає:

    true

Наприклад:

    const numbers = [1, 2, 3, 4, 5];

    const result = numbers.some(number => {
      console.log(number);

      return number === 3;
    });

У консолі:

    1
    2
    3

Результат:

    true

`4` і `5` не перевіряються.

---

# 7. every() — чи всі відповідають умові?

Базовий синтаксис:

    array.every(callback)

Приклад:

    const numbers = [2, 4, 6, 8];

    const result = numbers.every(number => number % 2 === 0);

    console.log(result);

Результат:

    true

Усі числа парні.

---

# 8. every() повертає boolean

Наприклад:

    const numbers = [2, 4, 7, 8];

    const result = numbers.every(number => number % 2 === 0);

    console.log(result);

Результат:

    false

Чому?

    2 → true
    4 → true
    7 → false  ← зупинка

Як тільки знайдено перший елемент, який не відповідає умові, результат вже відомий:

    false

---

# 9. Short-circuit у every()

`every()` зупиняється після першого `false`.

    const numbers = [2, 4, 7, 8, 10];

    const result = numbers.every(number => {
      console.log(number);

      return number % 2 === 0;
    });

У консолі:

    2
    4
    7

Результат:

    false

`8` та `10` вже не перевіряються.

---

# 10. Головна різниця some() і every()

Запам'ятати:

    some()
    → хоча б один відповідає умові

    every()
    → всі відповідають умові

Наприклад:

    const numbers = [2, 4, 6, 7];

`some()`:

    numbers.some(number => number % 2 !== 0);

Результат:

    true

Тому що є `7`.

`every()`:

    numbers.every(number => number % 2 === 0);

Результат:

    false

Тому що `7` не є парним.

---

# 11. Просте правило

Якщо питання звучить:

> Чи є хоча б один?

використовуй:

    some()

Якщо питання звучить:

> Чи всі?

використовуй:

    every()

---

# 12. some() — перевірка існування

Наприклад:

    const users = [
      { name: "Anna", active: false },
      { name: "John", active: false },
      { name: "Olena", active: true }
    ];

    const hasActiveUser = users.some(user => user.active);

Результат:

    true

Тобто:

> Чи існує хоча б один активний користувач?

---

# 13. every() — перевірка всіх

Той самий масив:

    const users = [
      { name: "Anna", active: false },
      { name: "John", active: false },
      { name: "Olena", active: true }
    ];

    const allActive = users.every(user => user.active);

Результат:

    false

Тому що не всі користувачі активні.

---

# 14. some() для пошуку адміністратора

    const users = [
      { name: "Anna", role: "user" },
      { name: "John", role: "user" },
      { name: "Olena", role: "admin" }
    ];

    const hasAdmin = users.some(user => user.role === "admin");

    console.log(hasAdmin);

Результат:

    true

Питання:

> Чи є хоча б один адміністратор?

---

# 15. every() для перевірки ролей

    const users = [
      { name: "Anna", role: "admin" },
      { name: "John", role: "admin" },
      { name: "Olena", role: "admin" }
    ];

    const allAdmins = users.every(user => user.role === "admin");

    console.log(allAdmins);

Результат:

    true

Питання:

> Чи всі користувачі є адміністраторами?

---

# 16. some() для перевірки помилок

    const fields = [
      { name: "email", valid: true },
      { name: "password", valid: true },
      { name: "age", valid: false }
    ];

    const hasInvalidField = fields.some(field => !field.valid);

    console.log(hasInvalidField);

Результат:

    true

Це дуже практичний патерн для форм.

---

# 17. every() для валідації форми

    const fields = [
      { name: "email", valid: true },
      { name: "password", valid: true },
      { name: "age", valid: true }
    ];

    const formIsValid = fields.every(field => field.valid);

    console.log(formIsValid);

Результат:

    true

Питання:

> Чи всі поля валідні?

---

# 18. some() для перевірки порожніх полів

    const fields = [
      { name: "email", value: "test@example.com" },
      { name: "password", value: "123456" },
      { name: "name", value: "" }
    ];

    const hasEmptyField = fields.some(field => field.value === "");

    console.log(hasEmptyField);

Результат:

    true

---

# 19. every() для перевірки заповненості

    const fields = [
      { name: "email", value: "test@example.com" },
      { name: "password", value: "123456" },
      { name: "name", value: "John" }
    ];

    const allFilled = fields.every(field => field.value !== "");

    console.log(allFilled);

Результат:

    true

---

# 20. some() для перевірки доступу

Наприклад, є дозволи:

    const permissions = [
      "read",
      "write",
      "delete"
    ];

    const canDelete = permissions.some(
      permission => permission === "delete"
    );

    console.log(canDelete);

Результат:

    true

---

# 21. every() для перевірки дозволів

Наприклад:

    const requiredPermissions = [
      "read",
      "write"
    ];

    const userPermissions = [
      "read",
      "write",
      "delete"
    ];

    const hasAllPermissions = requiredPermissions.every(
      permission => userPermissions.includes(permission)
    );

    console.log(hasAllPermissions);

Результат:

    true

Це вже типовий приклад для систем авторизації.

---

# 22. some() з числами

    const numbers = [10, 20, 30, 45];

    const hasLargeNumber = numbers.some(number => number > 40);

Результат:

    true

---

# 23. every() з числами

    const numbers = [10, 20, 30, 40];

    const allPositive = numbers.every(number => number > 0);

Результат:

    true

---

# 24. every() для позитивних чисел

    const numbers = [10, 20, -5, 40];

    const allPositive = numbers.every(number => number > 0);

Результат:

    false

Тому що:

    -5 > 0

дає:

    false

---

# 25. some() для пошуку від'ємного числа

    const numbers = [10, 20, -5, 40];

    const hasNegative = numbers.some(number => number < 0);

Результат:

    true

---

# 26. some() та find()

Ці методи часто плутають.

`some()`:

    const hasAdult = users.some(user => user.age >= 18);

Результат:

    true

`find()`:

    const adult = users.find(user => user.age >= 18);

Результат:

    { ...user }

Отже:

    some()
    → "Чи є?"

    find()
    → "Який саме?"

---

# 27. some() vs find()

Наприклад:

    const users = [
      { id: 1, name: "Anna", age: 16 },
      { id: 2, name: "John", age: 25 },
      { id: 3, name: "Olena", age: 30 }
    ];

`some()`:

    const exists = users.some(user => user.age >= 18);

Результат:

    true

`find()`:

    const user = users.find(user => user.age >= 18);

Результат:

    { id: 2, name: "John", age: 25 }

---

# 28. every() vs filter()

Ці методи теж мають різне призначення.

`every()`:

    const allAdults = users.every(user => user.age >= 18);

Результат:

    true
    або
    false

`filter()`:

    const adults = users.filter(user => user.age >= 18);

Результат:

    [
      { ... },
      { ... }
    ]

Отже:

    every()
    → перевірка

    filter()
    → отримання підмножини

---

# 29. every() vs some()

Приклад:

    const numbers = [2, 4, 6, 8];

    numbers.some(number => number % 2 === 0);

Результат:

    true

Бо хоча б одне парне.

    numbers.every(number => number % 2 === 0);

Результат:

    true

Бо всі парні.

Тому для масиву, де всі елементи відповідають умові, обидва можуть дати `true`.

---

# 30. Важлива логічна різниця

Для:

    [2, 4, 6]

маємо:

    some(number => number > 5)
    → true

    every(number => number > 5)
    → false

Тому:

    some()
    → OR-подібна логіка

    every()
    → AND-подібна логіка

Це хороша ментальна модель.

---

# 31. Логіка some() як OR

Наприклад:

    const hasAdmin = users.some(user => user.role === "admin");

Це концептуально схоже на:

    user1IsAdmin || user2IsAdmin || user3IsAdmin

Тобто:

> достатньо одного `true`.

---

# 32. Логіка every() як AND

Наприклад:

    const allActive = users.every(user => user.active);

Концептуально:

    user1Active && user2Active && user3Active

Тобто:

> всі повинні бути `true`.

---

# 33. some() з кількома умовами

    const users = [
      { name: "Anna", age: 17, active: false },
      { name: "John", age: 25, active: true },
      { name: "Olena", age: 30, active: true }
    ];

    const hasActiveAdult = users.some(user => {
      return user.age >= 18 && user.active;
    });

Результат:

    true

---

# 34. every() з кількома умовами

    const users = [
      { name: "Anna", age: 20, active: true },
      { name: "John", age: 25, active: true },
      { name: "Olena", age: 30, active: true }
    ];

    const allAreActiveAdults = users.every(user => {
      return user.age >= 18 && user.active;
    });

Результат:

    true

---

# 35. Перевірка статусів замовлень

    const orders = [
      { id: 1, status: "completed" },
      { id: 2, status: "completed" },
      { id: 3, status: "pending" }
    ];

Перевірити, чи є незавершене замовлення:

    const hasPendingOrder = orders.some(
      order => order.status === "pending"
    );

Результат:

    true

Перевірити, чи всі завершені:

    const allCompleted = orders.every(
      order => order.status === "completed"
    );

Результат:

    false

---

# 36. Перевірка товарів

    const products = [
      { name: "Laptop", price: 30000, available: true },
      { name: "Phone", price: 20000, available: true },
      { name: "Monitor", price: 10000, available: false }
    ];

Чи є недоступний товар?

    const hasUnavailable = products.some(
      product => !product.available
    );

Результат:

    true

Чи всі товари доступні?

    const allAvailable = products.every(
      product => product.available
    );

Результат:

    false

---

# 37. Перевірка цін

Чи є товар дорожчий за 10000?

    const hasExpensiveProduct = products.some(
      product => product.price > 10000
    );

Чи всі товари дорожчі за 10000?

    const allExpensive = products.every(
      product => product.price > 10000
    );

---

# 38. Перевірка віку

    const users = [
      { name: "Anna", age: 20 },
      { name: "John", age: 25 },
      { name: "Olena", age: 30 }
    ];

Чи є неповнолітній?

    const hasMinor = users.some(user => user.age < 18);

Результат:

    false

Чи всі повнолітні?

    const allAdults = users.every(user => user.age >= 18);

Результат:

    true

---

# 39. Перевірка довжини рядків

    const passwords = [
      "12345678",
      "qwerty123",
      "javascript"
    ];

Чи є короткий пароль?

    const hasShortPassword = passwords.some(
      password => password.length < 8
    );

Результат:

    false

Чи всі паролі достатньої довжини?

    const allValidPasswords = passwords.every(
      password => password.length >= 8
    );

Результат:

    true

---

# 40. Перевірка масиву чисел

    const numbers = [10, 20, 30, 40];

Чи є число `30`?

    const hasThirty = numbers.some(number => number === 30);

Результат:

    true

Чи всі числа додатні?

    const allPositive = numbers.every(number => number > 0);

Результат:

    true

---

# 41. Перевірка типів

Можна перевірити, чи всі елементи мають певний тип:

    const values = [10, 20, 30];

    const allNumbers = values.every(
      value => typeof value === "number"
    );

Результат:

    true

Або:

    const values = [10, "20", 30];

    const allNumbers = values.every(
      value => typeof value === "number"
    );

Результат:

    false

---

# 42. Перевірка хоча б одного типу

    const values = [10, "20", true];

    const hasString = values.some(
      value => typeof value === "string"
    );

Результат:

    true

---

# 43. Перевірка null / undefined

    const values = [
      "JavaScript",
      null,
      "React"
    ];

Чи є `null`?

    const hasNull = values.some(value => value === null);

Результат:

    true

Чи всі значення існують?

    const allDefined = values.every(
      value => value !== null && value !== undefined
    );

Результат:

    false

---

# 44. Перевірка унікальності

`some()` можна використовувати в алгоритмічних задачах.

Наприклад, перевірити, чи є дублікати:

    const numbers = [10, 20, 30, 20];

    const hasDuplicates = numbers.some((number, index, array) => {
      return array.indexOf(number) !== index;
    });

Результат:

    true

Тут:

    indexOf(number)

знаходить першу позицію числа.

Якщо вона не збігається з поточним `index`, значить число вже зустрічалося.

---

# 45. Перевірка унікальності через Set

Для такої задачі простіше:

    const numbers = [10, 20, 30, 20];

    const hasDuplicates =
      new Set(numbers).size !== numbers.length;

Результат:

    true

Тому `some()` тут — корисний навчальний приклад, але `Set` часто є кращим практичним рішенням.

---

# 46. Перевірка доступу користувача

    const userPermissions = [
      "read",
      "write"
    ];

    const requiredPermission = "delete";

    const canDelete = userPermissions.some(
      permission => permission === requiredPermission
    );

Результат:

    false

---

# 47. Перевірка всіх необхідних дозволів

    const userPermissions = [
      "read",
      "write",
      "delete"
    ];

    const requiredPermissions = [
      "read",
      "write"
    ];

    const hasAllPermissions = requiredPermissions.every(
      permission => userPermissions.includes(permission)
    );

Результат:

    true

---

# 48. Валідація форми

Уявімо:

    const fields = [
      { name: "email", valid: true },
      { name: "password", valid: true },
      { name: "age", valid: false }
    ];

Перевірка:

    const isValid = fields.every(field => field.valid);

Результат:

    false

Пошук факту наявності помилки:

    const hasError = fields.some(field => !field.valid);

Результат:

    true

Це дуже корисний патерн:

    every()
    → все правильно?

    some()
    → є хоча б одна помилка?

---

# 49. Перевірка кошика

    const cart = [
      { name: "Laptop", quantity: 1 },
      { name: "Mouse", quantity: 2 },
      { name: "Keyboard", quantity: 1 }
    ];

Чи є товар із кількістю більше 1?

    const hasMultipleItems = cart.some(
      item => item.quantity > 1
    );

Результат:

    true

Чи всі товари мають позитивну кількість?

    const validCart = cart.every(
      item => item.quantity > 0
    );

Результат:

    true

---

# 50. Перевірка даних перед відправленням на backend

    const fields = [
      { name: "name", value: "John" },
      { name: "email", value: "john@example.com" },
      { name: "age", value: "30" }
    ];

    const allFilled = fields.every(
      field => field.value.trim() !== ""
    );

Якщо:

    allFilled === true

можна переходити до наступної перевірки або відправки даних.

---

# 51. some() для пошуку проблеми

Замість:

    let hasError = false;

    for (const field of fields) {
      if (!field.valid) {
        hasError = true;
        break;
      }
    }

можна:

    const hasError = fields.some(field => !field.valid);

Це коротше і краще передає намір:

> перевірити, чи є хоча б одна помилка.

---

# 52. every() замість ручного циклу

Замість:

    let allValid = true;

    for (const field of fields) {
      if (!field.valid) {
        allValid = false;
        break;
      }
    }

можна:

    const allValid = fields.every(field => field.valid);

Це декларативніший код.

---

# 53. some() vs for...of

Можна написати:

    let found = false;

    for (const number of numbers) {
      if (number > 100) {
        found = true;
        break;
      }
    }

Або:

    const found = numbers.some(number => number > 100);

Другий варіант добре виражає намір:

> Чи існує хоча б одне число більше 100?

---

# 54. every() vs for...of

Замість:

    let valid = true;

    for (const number of numbers) {
      if (number <= 0) {
        valid = false;
        break;
      }
    }

можна:

    const valid = numbers.every(number => number > 0);

---

# 55. some() та find()

Якщо потрібен boolean:

    const exists = users.some(user => user.id === id);

Якщо потрібен сам об'єкт:

    const user = users.find(user => user.id === id);

Це дуже важлива різниця.

---

# 56. every() та filter()

Якщо потрібно знати:

> Чи всі користувачі активні?

використовуємо:

    users.every(user => user.active);

Якщо потрібно отримати:

> Які користувачі активні?

використовуємо:

    users.filter(user => user.active);

---

# 57. some() та includes()

Якщо потрібно просто перевірити конкретне значення:

    const fruits = ["apple", "banana", "orange"];

    fruits.includes("banana");

Результат:

    true

Для складної умови:

    fruits.some(fruit => fruit.startsWith("ban"));

Результат:

    true

Отже:

    includes()
    → конкретне значення

    some()
    → довільна умова

---

# 58. every() з функцією-предикатом

Умову можна винести в окрему функцію:

    const isAdult = user => user.age >= 18;

    const users = [
      { name: "Anna", age: 20 },
      { name: "John", age: 25 },
      { name: "Olena", age: 30 }
    ];

    const allAdults = users.every(isAdult);

Результат:

    true

---

# 59. some() з функцією-предикатом

    const isAdmin = user => user.role === "admin";

    const hasAdmin = users.some(isAdmin);

Результат:

    true
    або
    false

Такий підхід зручний, коли умова використовується багато разів.

---

# 60. Callback some() та every()

Callback може отримувати три параметри:

    array.some((currentValue, currentIndex, array) => {
      // ...
    });

і:

    array.every((currentValue, currentIndex, array) => {
      // ...
    });

Найчастіше потрібен тільки:

    currentValue

---

# 61. currentValue

Наприклад:

    const numbers = [10, 20, 30];

    const result = numbers.some(number => number > 15);

Тут:

    number

це поточний елемент.

---

# 62. currentIndex

Можна отримати індекс:

    const numbers = [10, 20, 30];

    const result = numbers.some((number, index) => {
      return index === 2;
    });

Результат:

    true

---

# 63. array

Третій параметр — сам масив:

    const numbers = [10, 20, 30];

    const result = numbers.some((number, index, array) => {
      console.log(array);

      return number > 15;
    });

У практичному коді він використовується рідше.

---

# 64. Порожній масив і some()

Це дуже важливий момент:

    const numbers = [];

    const result = numbers.some(number => number > 10);

Результат:

    false

Чому?

Немає жодного елемента, який міг би задовольнити умову.

Логіка:

> "Чи існує хоча б один?"

У порожньому масиві — ні.

---

# 65. Порожній масив і every()

Тут результат протилежний:

    const numbers = [];

    const result = numbers.every(number => number > 10);

Результат:

    true

Це спочатку може здатися дивним.

Але логічно:

> "Чи є хоча б один елемент, який порушує умову?"

У порожньому масиві такого елемента немає.

Тому `every()` повертає `true`.

Це називається **vacuous truth**.

Для повсякденної роботи достатньо запам'ятати:

    [].some(...)  → false
    [].every(...) → true

---

# 66. Порожній масив — важлива співбесіда

Запам'ятати:

    [].some(() => true);

Результат:

    false

і:

    [].every(() => false);

Результат:

    true

Це часто використовують як питання на співбесідах, щоб перевірити розуміння логіки методів.

---

# 67. some() не повертає знайдений елемент

Наприклад:

    const users = [
      { id: 1, name: "Anna" },
      { id: 2, name: "John" }
    ];

    const result = users.some(user => user.id === 2);

Результат:

    true

Не:

    { id: 2, name: "John" }

Для цього:

    users.find(user => user.id === 2);

---

# 68. every() не повертає відфільтрований масив

    const users = [
      { id: 1, active: true },
      { id: 2, active: true }
    ];

    const result = users.every(user => user.active);

Результат:

    true

Якщо потрібно отримати самі елементи:

    users.filter(user => user.active);

---

# 69. some() та every() не змінюють масив

Сам метод не мутує масив:

    const numbers = [10, 20, 30];

    numbers.some(number => number > 15);

    console.log(numbers);

Результат:

    [10, 20, 30]

Так само:

    numbers.every(number => number > 0);

оригінальний масив не змінює.

Але callback теоретично може виконувати мутації, чого краще уникати без необхідності.

---

# 70. some() та every() працюють синхронно

Обидва методи синхронні:

    const result = numbers.some(number => number > 10);

    const result = numbers.every(number => number > 10);

Вони не очікують Promise.

---

# 71. Не використовувати async callback без розуміння

Небезпечний приклад:

    const result = users.some(async user => {
      return await checkUser(user);
    });

Це не означає:

> "some() дочекається результату checkUser()".

`async` callback повертає Promise.

Promise є truthy-значенням, тому поведінка буде не такою, як очікується.

---

# 72. Асинхронна перевірка

Якщо перевірка асинхронна:

    async function checkUsers(users) {
      for (const user of users) {
        const valid = await checkUser(user);

        if (valid) {
          return true;
        }
      }

      return false;
    }

Такий підхід дозволяє зберегти логіку:

> зупинитися після першого успішного результату.

---

# 73. some() і побічні ефекти

Не варто використовувати `some()` як заміну `forEach()`:

Погано:

    numbers.some(number => {
      console.log(number);
      return false;
    });

Якщо мета — просто виконати дію для кожного елемента, використовуйте:

    numbers.forEach(number => {
      console.log(number);
    });

`some()` має передавати логічний намір:

> перевірити, чи існує хоча б один елемент.

---

# 74. every() і побічні ефекти

Так само не потрібно використовувати `every()` для обходу масиву заради побічних ефектів.

Погано:

    numbers.every(number => {
      console.log(number);
      return true;
    });

Якщо потрібно виконати дію для кожного:

    numbers.forEach(number => {
      console.log(number);
    });

---

# 75. Типова помилка: переплутати some() та every()

Маємо:

    const numbers = [2, 4, 7, 8];

Питання:

> Чи є хоча б одне непарне число?

Правильно:

    numbers.some(number => number % 2 !== 0);

Результат:

    true

Питання:

> Чи всі числа парні?

Правильно:

    numbers.every(number => number % 2 === 0);

Результат:

    false

---

# 76. Типова помилка: використовувати every() для пошуку

Неправильно мислити так:

    const user = users.every(user => user.id === id);

Результат буде:

    true
    або
    false

Якщо потрібен користувач:

    const user = users.find(user => user.id === id);

---

# 77. Типова помилка: використовувати some() замість find()

Неправильно:

    const user = users.some(user => user.id === id);

Результат:

    true

або:

    false

Якщо потрібен об'єкт:

    const user = users.find(user => user.id === id);

---

# 78. Типова помилка: використовувати filter() для boolean

Можна написати:

    const result = users.filter(user => user.active).length > 0;

Але якщо потрібно лише дізнатися:

> чи є хоча б один активний?

краще:

    const result = users.some(user => user.active);

Це простіше і може завершитися раніше.

---

# 79. Типова помилка: використовувати filter() для перевірки всіх

Не потрібно:

    const invalidUsers = users.filter(user => !user.active);

    const allActive = invalidUsers.length === 0;

Краще:

    const allActive = users.every(user => user.active);

Код прямо описує потрібну логіку.

---

# 80. some() для пошуку першої проблеми

Наприклад, перевірка:

    const products = [
      { name: "Laptop", price: 30000 },
      { name: "Phone", price: 20000 },
      { name: "Monitor", price: -100 }
    ];

    const hasInvalidPrice = products.some(
      product => product.price <= 0
    );

Результат:

    true

---

# 81. every() для перевірки всіх цін

    const products = [
      { name: "Laptop", price: 30000 },
      { name: "Phone", price: 20000 },
      { name: "Monitor", price: 10000 }
    ];

    const allPricesValid = products.every(
      product => product.price > 0
    );

Результат:

    true

---

# 82. Перевірка структури API-даних

Наприклад, отримали масив користувачів:

    const users = [
      { id: 1, name: "Anna" },
      { id: 2, name: "John" },
      { id: 3, name: "Olena" }
    ];

Перевірити, чи всі мають `id`:

    const valid = users.every(user => user.id !== undefined);

Результат:

    true

Перевірити, чи є хоча б один без `name`:

    const hasInvalidUser = users.some(
      user => !user.name
    );

Результат:

    false

---

# 83. Перевірка даних перед записом у БД

Наприклад:

    const records = [
      { name: "Anna", age: 25 },
      { name: "John", age: 30 },
      { name: "Olena", age: 28 }
    ];

    const valid = records.every(record => {
      return record.name && record.age > 0;
    });

Результат:

    true

Такий підхід може бути корисним перед подальшою обробкою даних.

Але повну серверну валідацію краще будувати спеціальними інструментами, а не покладатися лише на `every()`.

---

# 84. Перевірка статусу колекції

    const tasks = [
      { title: "HTML", completed: true },
      { title: "CSS", completed: true },
      { title: "JavaScript", completed: false }
    ];

Чи є хоча б одна незавершена задача?

    const hasIncomplete = tasks.some(
      task => !task.completed
    );

Результат:

    true

Чи всі завершені?

    const allCompleted = tasks.every(
      task => task.completed
    );

Результат:

    false

---

# 85. Перевірка доступності сервісів

    const services = [
      { name: "API", online: true },
      { name: "Database", online: true },
      { name: "Cache", online: false }
    ];

Чи є недоступний сервіс?

    const hasOfflineService = services.some(
      service => !service.online
    );

Результат:

    true

Чи всі сервіси доступні?

    const allOnline = services.every(
      service => service.online
    );

Результат:

    false

---

# 86. Перевірка завершення процесу

    const steps = [
      { name: "download", completed: true },
      { name: "install", completed: true },
      { name: "configure", completed: true }
    ];

    const isCompleted = steps.every(
      step => step.completed
    );

Результат:

    true

---

# 87. Перевірка наявності критичної помилки

    const logs = [
      { level: "info" },
      { level: "warning" },
      { level: "error" }
    ];

    const hasCriticalError = logs.some(
      log => log.level === "error"
    );

Результат:

    true

---

# 88. Перевірка email

Наприклад, спрощена перевірка:

    const emails = [
      "anna@example.com",
      "john@example.com",
      "olena@example.com"
    ];

    const allValid = emails.every(email => {
      return email.includes("@");
    });

Результат:

    true

Це лише навчальний приклад, а не повноцінна email-валідація.

---

# 89. some() з RegExp

    const values = [
      "hello",
      "123",
      "world"
    ];

    const hasNumber = values.some(value => {
      return /\d/.test(value);
    });

Результат:

    true

Тому що `"123"` містить цифру.

---

# 90. every() з RegExp

    const values = [
      "hello",
      "world",
      "javascript"
    ];

    const allLetters = values.every(value => {
      return /^[a-z]+$/i.test(value);
    });

Результат:

    true

---

# 91. Порівняння методів

| Метод | Що повертає | Скільки шукає | Ранній вихід |
|---|---|---|---|
| `some()` | `true/false` | хоча б один | так |
| `every()` | `true/false` | усі | так |
| `find()` | елемент | перший | так |
| `findIndex()` | індекс | перший | так |
| `filter()` | масив | усі | ні |
| `forEach()` | `undefined` | усі | ні |
| `map()` | новий масив | усі | ні |

---

# 92. Ментальна карта

Коли бачиш задачу:

    "Чи існує хоча б один?"
        ↓
      some()

    "Чи всі?"
        ↓
      every()

    "Який перший?"
        ↓
      find()

    "Який індекс першого?"
        ↓
      findIndex()

    "Які всі?"
        ↓
      filter()

    "Перетворити кожен?"
        ↓
      map()

    "Виконати дію для кожного?"
        ↓
      forEach()

---

# 93. some() як логічне "OR"

Можна уявити:

    some()

як:

    A || B || C || D

Як тільки один елемент дає `true`, весь результат:

    true

---

# 94. every() як логічне "AND"

Можна уявити:

    every()

як:

    A && B && C && D

Як тільки один елемент дає `false`, весь результат:

    false

Ця модель дуже допомагає запам'ятати поведінку.

---

# 95. Практичний приклад: права користувача

    const permissions = [
      "read",
      "write",
      "delete"
    ];

Перевірити одне право:

    const canDelete = permissions.some(
      permission => permission === "delete"
    );

Перевірити всі необхідні:

    const required = [
      "read",
      "write"
    ];

    const hasRequiredPermissions = required.every(
      permission => permissions.includes(permission)
    );

---

# 96. Практичний приклад: кошик

    const cart = [
      { name: "Laptop", quantity: 1, price: 30000 },
      { name: "Mouse", quantity: 2, price: 1000 },
      { name: "Keyboard", quantity: 1, price: 2000 }
    ];

Чи є товар дешевший за 1500?

    const hasCheapProduct = cart.some(
      item => item.price < 1500
    );

Чи всі товари мають позитивну кількість?

    const validCart = cart.every(
      item => item.quantity > 0
    );

---

# 97. Практичний приклад: навчальна платформа

    const lessons = [
      { title: "Variables", completed: true },
      { title: "Functions", completed: true },
      { title: "Arrays", completed: false }
    ];

Чи є незавершений урок?

    const hasIncompleteLesson = lessons.some(
      lesson => !lesson.completed
    );

Чи завершені всі уроки?

    const allLessonsCompleted = lessons.every(
      lesson => lesson.completed
    );

---

# 98. Практичний приклад: тест

    const answers = [
      { question: 1, correct: true },
      { question: 2, correct: true },
      { question: 3, correct: false }
    ];

Чи є хоча б одна неправильна відповідь?

    const hasMistake = answers.some(
      answer => !answer.correct
    );

Чи всі відповіді правильні?

    const allCorrect = answers.every(
      answer => answer.correct
    );

---

# 99. Практичний приклад: стан користувачів

    const users = [
      { id: 1, online: false },
      { id: 2, online: true },
      { id: 3, online: false }
    ];

Чи є хтось онлайн?

    const hasOnlineUser = users.some(user => user.online);

Результат:

    true

Чи всі онлайн?

    const allOnline = users.every(user => user.online);

Результат:

    false

---

# 100. Практичний приклад: замовлення

    const orders = [
      { id: 1, paid: true },
      { id: 2, paid: true },
      { id: 3, paid: false }
    ];

Чи є неоплачене замовлення?

    const hasUnpaid = orders.some(order => !order.paid);

Результат:

    true

Чи всі оплачені?

    const allPaid = orders.every(order => order.paid);

Результат:

    false

---

# 101. Вкладені умови

Callback може містити складну логіку:

    const users = [
      {
        name: "Anna",
        age: 20,
        active: true
      },
      {
        name: "John",
        age: 16,
        active: true
      }
    ];

    const hasActiveAdult = users.some(user => {
      return user.age >= 18 && user.active;
    });

Результат:

    true

---

# 102. Винесення складної умови

Якщо умова стала великою, її краще винести:

    const isActiveAdult = user => {
      return user.age >= 18 && user.active;
    };

    const hasActiveAdult = users.some(isActiveAdult);

Це підвищує читабельність.

---

# 103. every() з окремою функцією

    const isValidUser = user => {
      return (
        user.id > 0 &&
        user.name !== "" &&
        user.age >= 18
      );
    };

    const allUsersValid = users.every(isValidUser);

Так код стає простішим для тестування.

---

# 104. Не робити callback надто складним

Якщо:

    users.every(user => {
      // 30 рядків логіки
      // ...
      // ...
      // ...
    });

стає складно читати, винеси перевірку:

    const isValidUser = user => {
      // ...
    };

    const allValid = users.every(isValidUser);

---

# 105. some() та every() не створюють новий масив

На відміну від:

    map()
    filter()

методи:

    some()
    every()

повертають лише:

    boolean

Тому після них немає нового масиву для подальшого перебору.

---

# 106. Складність

У найгіршому випадку:

    some() → O(n)
    every() → O(n)

Але через short-circuit вони можуть завершитися раніше.

Для `some()`:

    перший true
    → завершення

Для `every()`:

    перший false
    → завершення

---

# 107. Приклад раннього завершення some()

    const numbers = [1, 2, 3, 4, 5];

    const result = numbers.some(number => {
      console.log("check:", number);

      return number === 1;
    });

Результат у консолі:

    check: 1

`some()` завершився після першого елемента.

---

# 108. Приклад раннього завершення every()

    const numbers = [1, 2, 3, 4, 5];

    const result = numbers.every(number => {
      console.log("check:", number);

      return number < 3;
    });

Результат:

    check: 1
    check: 2
    check: 3

На `3` умова стала `false`, тому пошук завершився.

---

# 109. some() та every() і порядок елементів

Порядок має значення для кількості виконаних перевірок.

Наприклад:

    const numbers = [100, 1, 2, 3, 4];

    numbers.some(number => number > 50);

`some()` завершиться одразу.

А:

    const numbers = [1, 2, 3, 4, 100];

    numbers.some(number => number > 50);

потрібно буде перевірити більше елементів.

Логічний результат однаковий:

    true

але кількість виконаних callback-викликів різна.

---

# 110. some() / every() і продуктивність

Для звичайних масивів різниця зазвичай не має значення.

Але концептуально потрібно розуміти:

    some()
    → може завершитися дуже рано

    every()
    → може завершитися дуже рано

Це одна з причин використовувати ці методи замість ручних конструкцій, коли їхня семантика відповідає задачі.

---

# 111. Типові помилки

## 1. Очікувати елемент від some()

    const result = users.some(user => user.active);

Результат:

    true

Не об'єкт.

---

## 2. Очікувати масив від every()

    const result = users.every(user => user.active);

Результат:

    true
    або
    false

Не масив.

---

## 3. Використовувати some(), коли потрібен об'єкт

Неправильно:

    const user = users.some(user => user.id === id);

Правильно:

    const user = users.find(user => user.id === id);

---

## 4. Використовувати every(), коли потрібен масив

Неправильно:

    const users = allUsers.every(user => user.active);

Правильно:

    const users = allUsers.filter(user => user.active);

---

## 5. Використовувати filter() для простої перевірки існування

Не потрібно:

    const hasAdmin =
      users.filter(user => user.role === "admin").length > 0;

Краще:

    const hasAdmin =
      users.some(user => user.role === "admin");

---

## 6. Забути, що every([]) === true

    [].every(() => false);

Результат:

    true

Це важлива особливість логіки `every()`.

---

## 7. Забути, що some([]) === false

    [].some(() => true);

Результат:

    false

---

## 8. Використовувати async callback

Не очікуй, що:

    users.some(async user => {
      return await checkUser(user);
    });

буде працювати як асинхронний `some()`.

---

## 9. Використовувати some() / every() для побічних ефектів

Якщо потрібно щось зробити для кожного:

    forEach()

або:

    for...of

Якщо потрібно перевірити умову:

    some()
    every()

---

# Питання зі співбесіди

### 1. Що робить some()?

Перевіряє, чи існує хоча б один елемент, який задовольняє умову.

Повертає:

    true
    або
    false

---

### 2. Що робить every()?

Перевіряє, чи всі елементи задовольняють умову.

Повертає:

    true
    або
    false

---

### 3. Яка головна різниця між some() і every()?

    some()
    → хоча б один

    every()
    → всі

---

### 4. Чи перебирає some() весь масив?

Не обов'язково.

Він зупиняється після першого `true`.

---

### 5. Чи перебирає every() весь масив?

Не обов'язково.

Він зупиняється після першого `false`.

---

### 6. Що повертає some() для порожнього масиву?

    false

---

### 7. Що повертає every() для порожнього масиву?

    true

---

### 8. Чому [].every(...) повертає true?

Тому що немає жодного елемента, який порушує умову.

Це називається vacuous truth.

---

### 9. Чим some() відрізняється від find()?

    some()
    → true / false

    find()
    → element / undefined

---

### 10. Чим every() відрізняється від filter()?

    every()
    → true / false

    filter()
    → новий масив

---

### 11. Чи змінюють some() та every() оригінальний масив?

Ні, самі методи не мутують масив.

---

### 12. Чи є some() та every() асинхронними?

Ні.

Вони синхронні.

---

### 13. Що станеться з async callback?

`some()` / `every()` не очікують Promise.

Для асинхронних перевірок потрібен інший підхід.

---

### 14. Яка складність some() та every()?

У найгіршому випадку:

    O(n)

Але вони можуть завершитися раніше завдяки short-circuit.

---

### 15. Коли використовувати some()?

Коли потрібно відповісти:

> Чи існує хоча б один елемент, який відповідає умові?

---

### 16. Коли використовувати every()?

Коли потрібно відповісти:

> Чи всі елементи відповідають умові?

---

# Рівні вивчення

## 🟢 Core — обов'язково

Потрібно знати:

- `some()`;
- `every()`;
- `true / false`;
- "хоча б один";
- "всі";
- callback;
- `short-circuit`;
- `some()` з числами;
- `every()` з числами;
- перевірку об'єктів;
- `some()` → `false` для `[]`;
- `every()` → `true` для `[]`.

Головні патерни:

    const exists = items.some(item => condition);

    const allValid = items.every(item => condition);

---

## 🔵 Junior

Потрібно впевнено використовувати:

- `some()` для перевірки існування;
- `every()` для валідації;
- перевірку форм;
- перевірку permissions;
- перевірку статусів;
- `some()` vs `find()`;
- `every()` vs `filter()`;
- `some()` vs `includes()`;
- `short-circuit`;
- callback з об'єктами;
- складні умови.

---

## 🟠 Middle

Потрібно розуміти:

- логічну модель `some()` як OR;
- логічну модель `every()` як AND;
- поведінку на порожніх масивах;
- складність `O(n)`;
- раннє завершення;
- вплив порядку елементів;
- mutation vs immutability;
- асинхронні callback;
- чому `async` не працює з `some()` / `every()` так, як очікується;
- коли використовувати `for...of`;
- композицію з іншими array methods.

---

## 🔴 Senior

Важливо правильно вибирати семантичний інструмент:

    Чи існує хоча б один?
        → some()

    Чи всі?
        → every()

    Який перший?
        → find()

    Які всі?
        → filter()

    Чи є конкретне значення?
        → includes()

    Чи потрібна позиція?
        → findIndex() / indexOf()

Також потрібно розуміти, що вибір методу — це не лише питання синтаксису.

Він повинен передавати **намір коду**.

Наприклад:

    const hasError = fields.some(field => !field.valid);

краще читається як бізнес-правило, ніж складний ручний цикл із прапорцем:

    let hasError = false;

    for (const field of fields) {
      if (!field.valid) {
        hasError = true;
        break;
      }
    }

---

# Міні-шпаргалка

## some()

    const result = array.some(item => condition);

Результат:

    true
    або
    false

Сенс:

    "Чи є хоча б один?"

---

## every()

    const result = array.every(item => condition);

Результат:

    true
    або
    false

Сенс:

    "Чи всі?"

---

## Перевірити наявність

    const exists = users.some(user => user.id === id);

---

## Знайти сам елемент

    const user = users.find(user => user.id === id);

---

## Перевірити всіх

    const allValid = users.every(user => user.active);

---

## Знайти всі

    const activeUsers = users.filter(user => user.active);

---

## Перевірити конкретне значення

    const exists = numbers.includes(10);

---

## Перевірити наявність помилки

    const hasError = fields.some(field => !field.valid);

---

## Перевірити, що всі правильні

    const isValid = fields.every(field => field.valid);

---

## Порожній масив

    [].some(() => true);
    // false

    [].every(() => false);
    // true

---

# Найважливіша таблиця

| Питання | Метод | Результат |
|---|---|---|
| Чи є хоча б один? | `some()` | `true / false` |
| Чи всі? | `every()` | `true / false` |
| Який перший? | `find()` | element / `undefined` |
| Який індекс першого? | `findIndex()` | index / `-1` |
| Які всі? | `filter()` | array |
| Чи є конкретне значення? | `includes()` | `true / false` |
| Який індекс конкретного значення? | `indexOf()` | index / `-1` |
| Змінити кожен елемент? | `map()` | new array |
| Виконати дію для кожного? | `forEach()` | `undefined` |

---

# Головне

`some()`:

> **"Чи існує хоча б один елемент, який відповідає умові?"**

    const hasAdmin = users.some(user => user.role === "admin");

Результат:

    true
    або
    false

`every()`:

> **"Чи всі елементи відповідають умові?"**

    const allAdmins = users.every(user => user.role === "admin");

Результат:

    true
    або
    false

Головна ментальна модель:

    some()
    → OR
    → хоча б один true

    every()
    → AND
    → всі true

І головне практичне розрізнення:

    some()    → чи є?
    every()   → чи всі?
    find()    → який?
    filter()  → які?
    includes() → чи є конкретне значення?

Для full-stack JavaScript особливо корисні два патерни:

    const hasError = fields.some(field => !field.valid);

    const isValid = fields.every(field => field.valid);

Вони дуже часто зустрічаються у валідації форм, перевірці API-даних, permissions, статусів, кошиків, замовлень, навчальних завдань та іншої бізнес-логіки.