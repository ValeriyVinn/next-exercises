# 03. find() / findIndex()

`find()` та `findIndex()` — методи масивів JavaScript для пошуку **першого елемента**, який задовольняє певну умову.

Вони особливо корисні, коли потрібно не перебрати весь масив, а **знайти конкретний елемент або його індекс**.

На відміну від `filter()`:

- `find()` повертає **перший знайдений елемент**;
- `findIndex()` повертає **індекс першого знайденого елемента**;
- обидва методи **зупиняють пошук після першого збігу**;
- якщо нічого не знайдено:
  - `find()` → `undefined`;
  - `findIndex()` → `-1`.

---

# Ключові поняття

- [ ] `find()`
- [ ] `findIndex()`
- [ ] callback
- [ ] `currentValue`
- [ ] `currentIndex`
- [ ] `array`
- [ ] умова пошуку
- [ ] перший збіг
- [ ] `undefined`
- [ ] `-1`
- [ ] ранній вихід (`short-circuit`)
- [ ] `find()` vs `filter()`
- [ ] `find()` vs `some()`
- [ ] `findIndex()` vs `indexOf()`
- [ ] пошук об'єктів
- [ ] пошук за `id`
- [ ] пошук вкладених даних
- [ ] перевірка результату
- [ ] `findLast()` / `findLastIndex()`

---

# 1. find() — пошук першого елемента

Базовий синтаксис:

    array.find(callback)

Callback отримує:

    (currentValue, currentIndex, array)

Приклад:

    const numbers = [5, 10, 15, 20];

    const result = numbers.find(number => number > 10);

    console.log(result);

Результат:

    15

`find()` повернув **перший** елемент, який задовольняє умову `number > 10`.

---

# 2. Як працює find()

Маємо:

    const numbers = [5, 10, 15, 20];

    const result = numbers.find(number => number > 10);

Умовно JavaScript перевіряє:

    5 > 10   → false
    10 > 10  → false
    15 > 10  → true  ← зупинка

Результат:

    15

Елемент `20` вже не перевіряється.

Це важлива властивість `find()`:

> `find()` зупиняється на першому успішному результаті.

---

# 3. find() повертає елемент, а не індекс

    const numbers = [10, 20, 30, 40];

    const result = numbers.find(number => number > 20);

    console.log(result);

Результат:

    30

Якщо потрібно отримати позицію елемента — використовуємо `findIndex()`.

---

# 4. findIndex() — пошук індексу

Синтаксис:

    array.findIndex(callback)

Приклад:

    const numbers = [10, 20, 30, 40];

    const index = numbers.findIndex(number => number > 20);

    console.log(index);

Результат:

    2

Тому що:

    numbers[2] === 30

---

# 5. find() та findIndex() на одному прикладі

    const numbers = [10, 20, 30, 40];

    const value = numbers.find(number => number > 20);
    const index = numbers.findIndex(number => number > 20);

    console.log(value);
    console.log(index);

Результат:

    30
    2

Отже:

    find()       → елемент
    findIndex()  → індекс

---

# 6. Якщо елемент не знайдено

## find()

    const numbers = [10, 20, 30];

    const result = numbers.find(number => number > 100);

    console.log(result);

Результат:

    undefined

---

## findIndex()

    const numbers = [10, 20, 30];

    const index = numbers.findIndex(number => number > 100);

    console.log(index);

Результат:

    -1

Тому потрібно пам'ятати:

    find()       → undefined
    findIndex()  → -1

---

# 7. Перевірка результату find()

Оскільки `find()` може повернути `undefined`, результат потрібно правильно перевіряти.

    const numbers = [10, 20, 30];

    const result = numbers.find(number => number > 100);

    if (result !== undefined) {
      console.log("Знайдено:", result);
    } else {
      console.log("Не знайдено");
    }

Результат:

    Не знайдено

---

# 8. Перевірка результату findIndex()

Для `findIndex()` стандартна перевірка:

    const numbers = [10, 20, 30];

    const index = numbers.findIndex(number => number > 100);

    if (index !== -1) {
      console.log("Знайдено на позиції:", index);
    } else {
      console.log("Не знайдено");
    }

Результат:

    Не знайдено

---

# 9. Callback find()

Callback може мати три параметри:

    array.find((currentValue, currentIndex, array) => {
      // ...
    });

Наприклад:

    const numbers = [10, 20, 30];

    const result = numbers.find((number, index, array) => {
      console.log(number);
      console.log(index);
      console.log(array);

      return number > 15;
    });

Найчастіше потрібен тільки перший параметр:

    numbers.find(number => number > 15);

---

# 10. currentValue

Перший параметр — поточний елемент:

    const numbers = [10, 20, 30];

    const result = numbers.find(number => number > 15);

Тут:

    number

це поточний елемент масиву.

---

# 11. currentIndex

Другий параметр — поточний індекс:

    const numbers = [10, 20, 30];

    const result = numbers.find((number, index) => {
      return index === 1;
    });

Результат:

    20

---

# 12. array

Третій параметр — сам масив:

    const numbers = [10, 20, 30];

    const result = numbers.find((number, index, array) => {
      console.log(array);

      return number > 15;
    });

Зазвичай третій параметр для `find()` потрібен рідко.

---

# 13. Пошук конкретного числа

Якщо потрібно знайти конкретне значення:

    const numbers = [5, 10, 15, 20];

    const result = numbers.find(number => number === 15);

Результат:

    15

Але для простого пошуку примітивного значення часто краще використовувати:

    numbers.includes(15)

або:

    numbers.indexOf(15)

`find()` особливо корисний, коли умова складніша.

---

# 14. Пошук числа за умовою

    const numbers = [3, 7, 12, 18, 25];

    const result = numbers.find(number => number % 2 === 0);

Результат:

    12

Пошук зупиниться на першому парному числі.

---

# 15. Пошук найбільшого числа

`find()` не призначений для пошуку максимуму.

Наприклад, цей код:

    const numbers = [10, 50, 20, 80, 30];

    const result = numbers.find(number => number > 50);

Результат:

    80

Але це не означає, що `80` — максимум у загальному випадку.

`find()` означає:

> знайди перший елемент, який відповідає умові.

Для максимуму краще:

    Math.max(...numbers)

або `reduce()` для більш загальних випадків.

---

# 16. Пошук об'єкта

Одна з найважливіших практичних ситуацій — пошук об'єкта в масиві.

    const users = [
      { id: 1, name: "Anna" },
      { id: 2, name: "John" },
      { id: 3, name: "Olena" }
    ];

    const user = users.find(user => user.id === 2);

    console.log(user);

Результат:

    { id: 2, name: "John" }

Це дуже поширений патерн у реальних застосунках.

---

# 17. Пошук користувача за id

Типовий frontend-код:

    const users = [
      { id: 101, name: "Anna" },
      { id: 102, name: "John" },
      { id: 103, name: "Olena" }
    ];

    const user = users.find(user => user.id === 102);

Результат:

    { id: 102, name: "John" }

Наприклад, у React / Next.js це може використовуватися для пошуку елемента, який потрібно показати або відредагувати.

---

# 18. Пошук товару

    const products = [
      { id: 1, name: "Laptop", price: 30000 },
      { id: 2, name: "Phone", price: 20000 },
      { id: 3, name: "Monitor", price: 10000 }
    ];

    const product = products.find(product => product.id === 2);

    console.log(product);

Результат:

    { id: 2, name: "Phone", price: 20000 }

---

# 19. Пошук за кількома умовами

Умова може бути складнішою.

    const users = [
      { id: 1, name: "Anna", age: 25, active: true },
      { id: 2, name: "John", age: 30, active: false },
      { id: 3, name: "Olena", age: 30, active: true }
    ];

    const user = users.find(user => {
      return user.age === 30 && user.active;
    });

Результат:

    { id: 3, name: "Olena", age: 30, active: true }

---

# 20. Пошук за рядком

    const users = [
      { id: 1, name: "Anna" },
      { id: 2, name: "John" },
      { id: 3, name: "Olena" }
    ];

    const user = users.find(user => user.name === "John");

Результат:

    { id: 2, name: "John" }

---

# 21. Пошук без врахування регістру

    const users = [
      { id: 1, name: "Anna" },
      { id: 2, name: "John" },
      { id: 3, name: "Olena" }
    ];

    const user = users.find(user => {
      return user.name.toLowerCase() === "john";
    });

Результат:

    { id: 2, name: "John" }

---

# 22. Пошук за частиною рядка

    const users = [
      { id: 1, name: "Anna Smith" },
      { id: 2, name: "John Johnson" },
      { id: 3, name: "Olena Brown" }
    ];

    const user = users.find(user => {
      return user.name.includes("John");
    });

Результат:

    { id: 2, name: "John Johnson" }

---

# 23. find() повертає перший збіг

Це дуже важливо.

    const numbers = [10, 20, 30, 20, 40];

    const result = numbers.find(number => number === 20);

Результат:

    20

Метод не шукає всі `20`.

Він знаходить першу:

    [10, 20, 30, 20, 40]
         ↑
       перша

Для всіх збігів використовуємо `filter()`:

    const result = numbers.filter(number => number === 20);

Результат:

    [20, 20]

---

# 24. find() vs filter()

## find()

Повертає один перший елемент:

    const users = [
      { id: 1, name: "Anna" },
      { id: 2, name: "John" },
      { id: 3, name: "Olena" }
    ];

    const user = users.find(user => user.id > 1);

Результат:

    { id: 2, name: "John" }

---

## filter()

Повертає всі елементи:

    const users = [
      { id: 1, name: "Anna" },
      { id: 2, name: "John" },
      { id: 3, name: "Olena" }
    ];

    const result = users.filter(user => user.id > 1);

Результат:

    [
      { id: 2, name: "John" },
      { id: 3, name: "Olena" }
    ]

---

# 25. Головна різниця find() і filter()

Запам'ятати:

    find()
    → один елемент
    → перший збіг
    → undefined, якщо не знайдено

    filter()
    → масив
    → усі збіги
    → [] якщо нічого не знайдено

---

# 26. find() vs some()

Обидва методи можуть перевіряти умову та зупинятися після першого збігу.

Але результат різний.

`find()`:

    const numbers = [5, 10, 15];

    const result = numbers.find(number => number > 10);

    console.log(result);

Результат:

    15

`some()`:

    const numbers = [5, 10, 15];

    const result = numbers.some(number => number > 10);

    console.log(result);

Результат:

    true

Отже:

    find()  → "Який саме елемент?"
    some()  → "Чи існує хоча б один?"

---

# 27. findIndex() vs indexOf()

Ці методи також схожі, але мають різне призначення.

`indexOf()` шукає конкретне значення:

    const numbers = [10, 20, 30];

    const index = numbers.indexOf(20);

Результат:

    1

`findIndex()` шукає за умовою:

    const numbers = [10, 20, 30];

    const index = numbers.findIndex(number => number > 15);

Результат:

    1

---

# 28. Коли використовувати indexOf()

Якщо потрібно знайти конкретне примітивне значення:

    const fruits = ["apple", "banana", "orange"];

    const index = fruits.indexOf("banana");

Це простіше, ніж:

    const index = fruits.findIndex(fruit => fruit === "banana");

Обидва працюють, але `indexOf()` тут виразніший.

---

# 29. Коли використовувати findIndex()

Коли пошук залежить від умови:

    const users = [
      { id: 10, name: "Anna" },
      { id: 20, name: "John" },
      { id: 30, name: "Olena" }
    ];

    const index = users.findIndex(user => user.id === 20);

Результат:

    1

Для масиву об'єктів `findIndex()` часто набагато зручніший за `indexOf()`.

---

# 30. Практична задача: знайти користувача

    const users = [
      { id: 1, name: "Anna", role: "user" },
      { id: 2, name: "John", role: "admin" },
      { id: 3, name: "Olena", role: "user" }
    ];

    const admin = users.find(user => user.role === "admin");

    console.log(admin);

Результат:

    { id: 2, name: "John", role: "admin" }

---

# 31. Практична задача: знайти активного користувача

    const users = [
      { id: 1, name: "Anna", active: false },
      { id: 2, name: "John", active: false },
      { id: 3, name: "Olena", active: true }
    ];

    const activeUser = users.find(user => user.active);

Результат:

    { id: 3, name: "Olena", active: true }

---

# 32. Практична задача: знайти товар за ціною

    const products = [
      { name: "Laptop", price: 30000 },
      { name: "Phone", price: 20000 },
      { name: "Monitor", price: 10000 }
    ];

    const product = products.find(product => product.price < 15000);

Результат:

    { name: "Monitor", price: 10000 }

---

# 33. Практична задача: знайти перше парне число

    const numbers = [3, 7, 11, 14, 18];

    const firstEven = numbers.find(number => number % 2 === 0);

    console.log(firstEven);

Результат:

    14

---

# 34. Практична задача: знайти перше число, яке більше 100

    const numbers = [10, 50, 80, 120, 150];

    const result = numbers.find(number => number > 100);

Результат:

    120

---

# 35. Практична задача: перевірити результат перед використанням

    const users = [
      { id: 1, name: "Anna" },
      { id: 2, name: "John" }
    ];

    const user = users.find(user => user.id === 10);

    if (user) {
      console.log(user.name);
    } else {
      console.log("Користувача не знайдено");
    }

Результат:

    Користувача не знайдено

Це дуже типовий патерн.

---

# 36. Optional chaining після find()

Якщо достатньо отримати `undefined`, можна використати optional chaining:

    const users = [
      { id: 1, name: "Anna" },
      { id: 2, name: "John" }
    ];

    const name = users.find(user => user.id === 10)?.name;

    console.log(name);

Результат:

    undefined

Без `?.`:

    const user = users.find(user => user.id === 10);

    const name = user.name;

це викличе помилку, тому що `user` буде `undefined`.

---

# 37. Nullish coalescing після find()

Можна задати значення за замовчуванням:

    const users = [
      { id: 1, name: "Anna" },
      { id: 2, name: "John" }
    ];

    const name = users.find(user => user.id === 10)?.name ?? "Unknown";

    console.log(name);

Результат:

    Unknown

---

# 38. find() не змінює масив

Сам по собі `find()` не мутує оригінальний масив.

    const numbers = [10, 20, 30];

    const result = numbers.find(number => number > 15);

    console.log(numbers);
    console.log(result);

Результат:

    [10, 20, 30]
    20

Але callback теоретично може змінювати об'єкти або сам масив.

Так робити без потреби не варто.

---

# 39. find() повертає посилання на об'єкт

Це важливий момент для роботи з об'єктами.

    const users = [
      { id: 1, name: "Anna" },
      { id: 2, name: "John" }
    ];

    const user = users.find(user => user.id === 2);

    user.name = "Johnny";

    console.log(users);

Результат:

    [
      { id: 1, name: "Anna" },
      { id: 2, name: "Johnny" }
    ]

Чому?

Тому що `find()` повернув посилання на той самий об'єкт.

Тобто:

    user === users[1]

Результат:

    true

---

# 40. Якщо потрібно змінити знайдений об'єкт

У реальному коді краще розуміти різницю між мутацією та створенням нового об'єкта.

Мутація:

    const user = users.find(user => user.id === 2);

    if (user) {
      user.name = "Johnny";
    }

Імутабельний підхід часто виглядає так:

    const updatedUsers = users.map(user => {
      if (user.id === 2) {
        return {
          ...user,
          name: "Johnny"
        };
      }

      return user;
    });

Для React та іншого state-based коду це особливо важливо.

---

# 41. find() у ланцюжку методів

`find()` можна комбінувати з іншими методами.

Наприклад:

    const users = [
      { id: 1, name: "Anna", active: false },
      { id: 2, name: "John", active: true },
      { id: 3, name: "Olena", active: true }
    ];

    const name = users
      .filter(user => user.active)
      .find(user => user.name.startsWith("O"));

Результат:

    Olena

Але завжди потрібно думати, чи справді такий ланцюжок потрібен.

---

# 42. Часто краще одразу використовувати find()

Замість:

    const activeUsers = users.filter(user => user.active);

    const user = activeUsers.find(user => user.name === "John");

можна:

    const user = users.find(user => {
      return user.active && user.name === "John";
    });

Це:

- простіше;
- не створює проміжний масив;
- зупиняється після першого збігу.

---

# 43. find() і short-circuit

`find()` має ранній вихід.

Наприклад:

    const numbers = [1, 2, 3, 4, 5];

    const result = numbers.find(number => {
      console.log("Перевірка:", number);

      return number === 3;
    });

Умовний результат у консолі:

    Перевірка: 1
    Перевірка: 2
    Перевірка: 3

`4` та `5` вже не перевіряються.

Це називається:

    short-circuit

---

# 44. Чому short-circuit важливий

Порівняймо `find()` і `filter()`:

    const numbers = [1, 2, 3, 4, 5];

    const result = numbers.find(number => number === 3);

`find()` зупиниться після `3`.

А:

    const result = numbers.filter(number => number === 3);

`filter()` повинен перевірити весь масив, тому що йому потрібно знайти **всі** збіги.

Отже, якщо потрібен лише перший результат:

    find()

часто є кращим вибором.

---

# 45. findLast()

У сучасному JavaScript існує також:

    findLast()

Він шукає **останній** елемент, який задовольняє умову.

    const numbers = [10, 20, 30, 20, 40];

    const result = numbers.findLast(number => number === 20);

Результат:

    20

Але це саме другий `20`, тобто той, що знаходиться ближче до кінця масиву.

---

# 46. findLastIndex()

Аналогічно:

    findLastIndex()

повертає індекс останнього елемента, який відповідає умові.

    const numbers = [10, 20, 30, 20, 40];

    const index = numbers.findLastIndex(number => number === 20);

Результат:

    3

---

# 47. find() vs findLast()

    const numbers = [10, 20, 30, 20, 40];

    numbers.find(number => number === 20);

Результат:

    20

Перший збіг.

    numbers.findLast(number => number === 20);

Результат:

    20

Останній збіг.

Якщо значення однакове, різниця непомітна. З об'єктами або індексами вона стає очевиднішою.

---

# 48. Порівняння основних методів пошуку

| Метод | Результат | Умова | Зупиняється рано |
|---|---|---|---|
| `find()` | перший елемент | callback | так |
| `findIndex()` | індекс | callback | так |
| `findLast()` | останній елемент | callback | пошук справа |
| `findLastIndex()` | індекс останнього | callback | пошук справа |
| `filter()` | масив елементів | callback | ні |
| `some()` | `true/false` | callback | так |
| `every()` | `true/false` | callback | так |
| `indexOf()` | індекс | конкретне значення | так |
| `includes()` | `true/false` | конкретне значення | так |

---

# 49. find() vs some() vs filter()

Ці три методи дуже важливо розрізняти.

Якщо запит:

> Який перший елемент?

    find()

Якщо запит:

> Чи існує хоча б один?

    some()

Якщо запит:

> Які всі елементи?

    filter()

Наприклад:

    const numbers = [5, 10, 15, 20];

Перший > 10:

    numbers.find(number => number > 10);

Результат:

    15

Чи існує > 10:

    numbers.some(number => number > 10);

Результат:

    true

Усі > 10:

    numbers.filter(number => number > 10);

Результат:

    [15, 20]

---

# 50. findIndex() для оновлення елемента

Типовий сценарій:

    const users = [
      { id: 1, name: "Anna" },
      { id: 2, name: "John" },
      { id: 3, name: "Olena" }
    ];

    const index = users.findIndex(user => user.id === 2);

    if (index !== -1) {
      users[index].name = "Johnny";
    }

Результат:

    [
      { id: 1, name: "Anna" },
      { id: 2, name: "Johnny" },
      { id: 3, name: "Olena" }
    ]

`findIndex()` тут дає можливість знайти позицію елемента та працювати з нею.

---

# 51. findIndex() та імутабельне оновлення

У React часто не варто мутувати масив:

    const index = users.findIndex(user => user.id === 2);

    if (index !== -1) {
      const updatedUsers = [...users];

      updatedUsers[index] = {
        ...updatedUsers[index],
        name: "Johnny"
      };
    }

Але для багатьох таких операцій `map()` може бути більш декларативним:

    const updatedUsers = users.map(user => {
      return user.id === 2
        ? { ...user, name: "Johnny" }
        : user;
    });

Тому `findIndex()` — це інструмент пошуку позиції, а не обов'язково найкращий інструмент для оновлення.

---

# 52. Пошук у вкладених об'єктах

Умова може звертатися до вкладених властивостей.

    const users = [
      {
        id: 1,
        profile: {
          city: "Vinnytsia"
        }
      },
      {
        id: 2,
        profile: {
          city: "Kyiv"
        }
      }
    ];

    const user = users.find(user => {
      return user.profile.city === "Kyiv";
    });

Результат:

    {
      id: 2,
      profile: {
        city: "Kyiv"
      }
    }

---

# 53. Optional chaining у складній умові

Якщо вкладена властивість може бути відсутня:

    const users = [
      { id: 1, profile: null },
      {
        id: 2,
        profile: {
          city: "Kyiv"
        }
      }
    ];

    const user = users.find(user => {
      return user.profile?.city === "Kyiv";
    });

Це безпечніше, ніж:

    user.profile.city

коли `profile` може бути `null` або `undefined`.

---

# 54. Пошук першого доступного ресурсу

Практичний приклад:

    const servers = [
      { name: "server-1", online: false },
      { name: "server-2", online: false },
      { name: "server-3", online: true }
    ];

    const server = servers.find(server => server.online);

Результат:

    { name: "server-3", online: true }

Це добре показує ідею `find()`:

> знайти перший елемент, який підходить.

---

# 55. Пошук першого товару в межах бюджету

    const products = [
      { name: "Laptop", price: 50000 },
      { name: "Tablet", price: 25000 },
      { name: "Phone", price: 20000 }
    ];

    const budget = 30000;

    const product = products.find(product => {
      return product.price <= budget;
    });

Результат:

    { name: "Tablet", price: 25000 }

---

# 56. find() не шукає "найкращий" елемент

Це типова помилка.

    const products = [
      { name: "A", price: 100 },
      { name: "B", price: 300 },
      { name: "C", price: 200 }
    ];

    const product = products.find(product => product.price > 100);

Результат:

    { name: "B", price: 300 }

Але найдорожчий товар:

    { name: "B", price: 300 }

у цьому прикладі випадково збігся.

`find()` не оптимізує результат.

Він просто знаходить **перший**, який відповідає умові.

---

# 57. Якщо потрібно знайти мінімум або максимум

Для максимуму:

    const numbers = [10, 50, 30, 80, 20];

    const max = Math.max(...numbers);

Для мінімуму:

    const min = Math.min(...numbers);

Не потрібно використовувати `find()` для задач, для яких існують більш відповідні інструменти.

---

# 58. find() і об'єкт з id

Дуже поширений frontend-патерн:

    const posts = [
      { id: 101, title: "JavaScript" },
      { id: 102, title: "TypeScript" },
      { id: 103, title: "React" }
    ];

    const postId = 102;

    const post = posts.find(post => post.id === postId);

    console.log(post);

Результат:

    { id: 102, title: "TypeScript" }

Цей патерн варто запам'ятати:

    array.find(item => item.id === id)

---

# 59. findIndex() з id

Аналогічно:

    const posts = [
      { id: 101, title: "JavaScript" },
      { id: 102, title: "TypeScript" },
      { id: 103, title: "React" }
    ];

    const postId = 102;

    const index = posts.findIndex(post => post.id === postId);

    console.log(index);

Результат:

    1

---

# 60. Пошук з RegExp

Можна використовувати регулярні вирази:

    const emails = [
      "hello@example.com",
      "test@example",
      "admin@example.com"
    ];

    const email = emails.find(email => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    });

Результат:

    "hello@example.com"

Але для простих випадків регулярні вирази не потрібні.

---

# 61. Пошук за кількома значеннями

    const products = [
      { id: 1, category: "laptop", available: false },
      { id: 2, category: "phone", available: true },
      { id: 3, category: "laptop", available: true }
    ];

    const product = products.find(product => {
      return product.category === "laptop" &&
             product.available;
    });

Результат:

    { id: 3, category: "laptop", available: true }

---

# 62. Пошук у масиві рядків

    const languages = [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java"
    ];

    const language = languages.find(language => {
      return language.startsWith("Type");
    });

Результат:

    TypeScript

---

# 63. Пошук у масиві об'єктів за startsWith()

    const technologies = [
      { name: "JavaScript", type: "language" },
      { name: "React", type: "library" },
      { name: "TypeScript", type: "language" }
    ];

    const technology = technologies.find(technology => {
      return technology.name.startsWith("Type");
    });

Результат:

    { name: "TypeScript", type: "language" }

---

# 64. Пошук за умовою з функцією

Умову можна винести в окрему функцію:

    const isAdult = user => user.age >= 18;

    const users = [
      { name: "Anna", age: 16 },
      { name: "John", age: 25 },
      { name: "Olena", age: 30 }
    ];

    const user = users.find(isAdult);

Результат:

    { name: "John", age: 25 }

Це корисно, коли одна й та сама логіка використовується в декількох місцях.

---

# 65. find() як "пошук за предикатом"

У функціональному програмуванні умову:

    user => user.age >= 18

можна назвати **predicate** — предикатом.

Предикат — функція, яка повертає:

    true
    або
    false

Наприклад:

    const isAdult = user => user.age >= 18;

    users.find(isAdult);

---

# 66. Не плутати find() з forEach()

`forEach()` виконує дію для кожного елемента:

    numbers.forEach(number => {
      console.log(number);
    });

`find()` шукає один елемент:

    const result = numbers.find(number => number > 10);

`forEach()` не повертає знайдений результат.

Якщо потрібно знайти елемент — використовуйте `find()`.

---

# 67. Не використовувати forEach() для пошуку без потреби

Не дуже хороший варіант:

    let foundUser;

    users.forEach(user => {
      if (user.id === 2) {
        foundUser = user;
      }
    });

Краще:

    const foundUser = users.find(user => user.id === 2);

Переваги:

- коротше;
- зрозуміліше;
- декларативніше;
- зупиняється після першого збігу.

---

# 68. Не використовувати filter(), якщо потрібен один елемент

Необхідність:

> знайти користувача з `id = 2`.

Не варто:

    const usersWithId = users.filter(user => user.id === 2);

    const user = usersWithId[0];

Краще:

    const user = users.find(user => user.id === 2);

Це прямо виражає намір:

> find one user.

---

# 69. Не використовувати find(), якщо потрібні всі збіги

Якщо потрібно знайти всіх адміністраторів:

    const admins = users.filter(user => user.role === "admin");

Не:

    const admin = users.find(user => user.role === "admin");

`find()` поверне тільки одного адміністратора.

---

# 70. Порожній масив

Якщо масив порожній:

    const numbers = [];

    const result = numbers.find(number => number > 10);

Результат:

    undefined

Для `findIndex()`:

    const index = numbers.findIndex(number => number > 10);

Результат:

    -1

---

# 71. find() не змінює кількість елементів

На відміну від `filter()`:

    const numbers = [10, 20, 30];

    const result = numbers.find(number => number > 10);

`result` — одне значення.

Масив не створюється.

Тому:

    find()

не слід розглядати як метод, який "фільтрує масив".

Він лише шукає перший відповідний елемент.

---

# 72. Складність find()

У найгіршому випадку `find()` перевірить усі `n` елементів:

    O(n)

Але в середньому він може завершитися раніше, якщо потрібний елемент знаходиться ближче до початку.

Наприклад:

    [target, ...manyItems]

пошук завершиться майже одразу.

А:

    [...manyItems, target]

може вимагати перевірки майже всього масиву.

---

# 73. find() та порядок масиву

Оскільки `find()` повертає перший збіг, порядок елементів має значення.

    const users = [
      { id: 1, active: true },
      { id: 2, active: true },
      { id: 3, active: false }
    ];

    const user = users.find(user => user.active);

Результат:

    { id: 1, active: true }

Якщо змінити порядок:

    const users = [
      { id: 2, active: true },
      { id: 1, active: true },
      { id: 3, active: false }
    ];

результат буде вже іншим.

---

# 74. Типова помилка: забутий return

Неправильно:

    const numbers = [10, 20, 30];

    const result = numbers.find(number => {
      number > 15;
    });

Тут callback нічого не повертає.

Правильно:

    const result = numbers.find(number => {
      return number > 15;
    });

Або коротше:

    const result = numbers.find(number => number > 15);

---

# 75. Типова помилка: використання {} без return

Неправильно:

    const user = users.find(user => {
      user.id === 2;
    });

Правильно:

    const user = users.find(user => {
      return user.id === 2;
    });

Або:

    const user = users.find(user => user.id === 2);

Це одна з найпоширеніших помилок під час роботи з callback-методами масивів.

---

# 76. Типова помилка: очікувати масив

    const numbers = [10, 20, 30];

    const result = numbers.find(number => number > 10);

`result` не є масивом.

    console.log(Array.isArray(result));

Результат:

    false

Результат:

    20

Якщо потрібен масив:

    const result = numbers.filter(number => number > 10);

Результат:

    [20, 30]

---

# 77. Типова помилка: очікувати true/false

`find()` не повертає boolean:

    const result = numbers.find(number => number > 10);

Результат:

    20

Для `true/false` використовуй:

    some()

Наприклад:

    const exists = numbers.some(number => number > 10);

Результат:

    true

---

# 78. Типова помилка: використовувати indexOf() для об'єктів

Це не працює так, як часто очікують:

    const users = [
      { id: 1, name: "Anna" }
    ];

    const index = users.indexOf({ id: 1, name: "Anna" });

Результат:

    -1

Причина — різні посилання на об'єкти.

Для пошуку об'єкта за властивістю:

    const index = users.findIndex(user => user.id === 1);

Результат:

    0

---

# 79. Порівняння об'єктів у find()

Це працює:

    const user = users.find(user => user.id === 1);

Тому що ми порівнюємо властивість:

    user.id === 1

а не весь об'єкт за посиланням.

---

# 80. Типова помилка: очікувати всі збіги

    const numbers = [10, 20, 20, 30];

    const result = numbers.find(number => number === 20);

Результат:

    20

Якщо потрібно:

    [20, 20]

використовуємо:

    numbers.filter(number => number === 20);

---

# 81. Типова помилка: плутати findIndex() і indexOf()

`indexOf()`:

    numbers.indexOf(20)

шукає конкретне значення.

`findIndex()`:

    numbers.findIndex(number => number > 15)

шукає за умовою.

Запам'ятати:

    indexOf(value)
    findIndex(condition)

---

# 82. Типова помилка: не перевіряти undefined

Небезпечно:

    const user = users.find(user => user.id === 100);

    console.log(user.name);

Якщо користувача немає:

    user === undefined

і доступ до:

    user.name

викличе помилку.

Безпечніше:

    const user = users.find(user => user.id === 100);

    if (user) {
      console.log(user.name);
    }

Або:

    console.log(user?.name);

---

# 83. Практичний патерн: пошук за id

Один із найважливіших патернів:

    const item = items.find(item => item.id === id);

А якщо потрібен індекс:

    const index = items.findIndex(item => item.id === id);

Це потрібно дуже добре знати для frontend/full-stack роботи.

---

# 84. Практичний патерн: пошук активного елемента

    const activeItem = items.find(item => item.active);

Або:

    const activeItem = items.find(item => item.status === "active");

---

# 85. Практичний патерн: пошук за статусом

    const order = orders.find(order => {
      return order.status === "pending";
    });

---

# 86. Практичний патерн: пошук помилки

    const error = errors.find(error => {
      return error.code === 404;
    });

---

# 87. Практичний патерн: пошук першого вільного елемента

    const seats = [
      { id: 1, occupied: true },
      { id: 2, occupied: true },
      { id: 3, occupied: false }
    ];

    const freeSeat = seats.find(seat => !seat.occupied);

Результат:

    { id: 3, occupied: false }

---

# 88. Практичний патерн: пошук першого валідного значення

    const values = [
      null,
      undefined,
      "",
      "JavaScript",
      "React"
    ];

    const firstValue = values.find(value => {
      return Boolean(value);
    });

Результат:

    "JavaScript"

Для конкретних задач можуть бути кращі інструменти, але сам патерн важливо розуміти.

---

# 89. find() і логіка бізнесу

`find()` часто добре читається у бізнес-логіці:

    const account = accounts.find(account => {
      return account.userId === userId;
    });

    const activeSubscription = subscriptions.find(subscription => {
      return subscription.active;
    });

    const pendingOrder = orders.find(order => {
      return order.status === "pending";
    });

Це один із методів, який добре переноситься з навчальних вправ у реальний full-stack код.

---

# 90. find() у frontend

Наприклад, маємо список даних:

    const lessons = [
      { id: 1, title: "Variables" },
      { id: 2, title: "Functions" },
      { id: 3, title: "Arrays" }
    ];

Маємо `lessonId`:

    const lessonId = 2;

Шукаємо урок:

    const lesson = lessons.find(lesson => lesson.id === lessonId);

Результат:

    { id: 2, title: "Functions" }

Це типовий сценарій для React / Next.js.

---

# 91. findIndex() у frontend

Наприклад, потрібно знайти позицію елемента:

    const lessons = [
      { id: 1, title: "Variables" },
      { id: 2, title: "Functions" },
      { id: 3, title: "Arrays" }
    ];

    const index = lessons.findIndex(lesson => lesson.id === 2);

Результат:

    1

Це може бути потрібно для:

- зміни елемента;
- видалення;
- переміщення;
- визначення поточної позиції;
- роботи зі state.

---

# 92. find() та API-дані

Після отримання даних від API:

    const users = await fetchUsers();

можна знайти конкретного користувача:

    const user = users.find(user => user.id === userId);

Якщо користувача немає:

    user === undefined

Це важливо враховувати в коді.

---

# 93. find() не є асинхронним

`find()` працює синхронно.

Не потрібно:

    await users.find(...)

`await` тут не дає користі.

Якщо самі дані отримуються асинхронно:

    const users = await fetchUsers();

після отримання масиву:

    const user = users.find(user => user.id === userId);

`find()` вже працює синхронно.

---

# 94. Не використовувати async callback з find() для асинхронної перевірки

Обережно з таким кодом:

    const user = users.find(async user => {
      return await checkUser(user);
    });

Це не працює так, як можна очікувати.

`find()` очікує, що callback поверне boolean:

    true
    або
    false

А `async` функція повертає `Promise`.

Для асинхронного пошуку потрібен інший підхід, наприклад `for...of` з `await`.

---

# 95. Асинхронний пошук через for...of

Якщо умова сама асинхронна:

    let foundUser;

    for (const user of users) {
      const valid = await checkUser(user);

      if (valid) {
        foundUser = user;
        break;
      }
    }

Це хороший варіант, коли потрібен:

- послідовний async-пошук;
- ранній вихід;
- `await` для кожного елемента.

---

# 96. find() та чистота callback

Добре:

    const user = users.find(user => user.active);

Callback просто перевіряє умову.

Не варто без потреби робити побічні ефекти:

    const user = users.find(user => {
      console.log("checking...");
      return user.active;
    });

Для навчання це нормально, але в production-коді callback краще залишати простим.

---

# 97. find() і мутація

Не варто змінювати масив під час його пошуку:

    const result = numbers.find((number, index, array) => {
      array.push(100);

      return number > 10;
    });

Такі конструкції ускладнюють поведінку та читання коду.

Краще:

> використовувати `find()` для пошуку, а зміну даних виконувати окремо.

---

# 98. Sparse arrays

Як і інші ітераційні методи масивів, `find()` має особливості роботи з порожніми слотами.

У звичайному практичному коді краще не покладатися на sparse arrays.

Нормальні масиви:

    const numbers = [10, 20, 30];

набагато простіші для розуміння та підтримки.

---

# 99. Що повертає callback?

Callback `find()` повинен повертати значення, яке приводиться до boolean.

Наприклад:

    numbers.find(number => number > 10);

Тут:

    number > 10

повертає:

    true
    або
    false

Можна також:

    users.find(user => user.active);

де `user.active` вже є boolean.

---

# 100. Truthy / falsy у find()

Можна написати:

    const values = [0, "", null, "Hello"];

    const result = values.find(value => value);

Результат:

    "Hello"

Тому що:

    0       → falsy
    ""      → falsy
    null    → falsy
    "Hello" → truthy

Але для важливого бізнес-коду краще формулювати умову явно.

---

# 101. Явна умова часто краща

Замість:

    users.find(user => user.active)

можна:

    users.find(user => user.active === true);

У JavaScript перший варіант зазвичай є нормальним і коротшим.

Вибір залежить від стилю коду та контексту.

---

# 102. find() та строгі порівняння

Для пошуку конкретного значення краще використовувати:

    ===

Наприклад:

    users.find(user => user.id === 10);

а не:

    users.find(user => user.id == 10);

Строге порівняння робить поведінку передбачуванішою.

---

# 103. Міні-порівняння

## Потрібен перший елемент

    find()

## Потрібен індекс першого елемента

    findIndex()

## Потрібен останній елемент

    findLast()

## Потрібен індекс останнього елемента

    findLastIndex()

## Потрібні всі елементи

    filter()

## Потрібно лише true/false — хоча б один

    some()

## Потрібно true/false — всі

    every()

## Потрібен індекс конкретного значення

    indexOf()

## Потрібно перевірити наявність конкретного значення

    includes()

---

# Типові помилки

## 1. Очікувати масив від find()

    const result = numbers.find(number => number > 10);

`result` — елемент, а не масив.

---

## 2. Використовувати find(), коли потрібні всі збіги

    filter()

---

## 3. Забути return

    numbers.find(number => {
      number > 10;
    });

Правильно:

    numbers.find(number => {
      return number > 10;
    });

---

## 4. Не врахувати undefined

    const user = users.find(user => user.id === 100);

Потрібно пам'ятати:

    user === undefined

якщо користувача немає.

---

## 5. Плутати find() і findIndex()

    find()       → елемент
    findIndex()  → індекс

---

## 6. Плутати findIndex() та indexOf()

    indexOf(value)
    findIndex(condition)

---

## 7. Використовувати filter()[0] замість find()

Замість:

    users.filter(user => user.id === 2)[0]

краще:

    users.find(user => user.id === 2)

---

## 8. Використовувати async callback з find()

`find()` не очікує Promise.

Для асинхронного пошуку потрібен інший підхід.

---

## 9. Використовувати find() для максимуму/мінімуму

`find()` шукає перший збіг, а не оптимальний елемент.

---

# Питання зі співбесіди

### 1. Що робить find()?

Знаходить і повертає перший елемент масиву, який задовольняє умову callback.

---

### 2. Що повертає find(), якщо нічого не знайдено?

    undefined

---

### 3. Що повертає findIndex(), якщо нічого не знайдено?

    -1

---

### 4. Чим find() відрізняється від filter()?

`find()` повертає перший елемент.

`filter()` повертає масив усіх елементів, які задовольняють умову.

---

### 5. Чим find() відрізняється від some()?

`find()` повертає знайдений елемент.

`some()` повертає `true` або `false`.

---

### 6. Чим findIndex() відрізняється від indexOf()?

`findIndex()` шукає елемент за callback-умовою.

`indexOf()` шукає конкретне значення.

---

### 7. Чи змінює find() оригінальний масив?

Ні, сам метод `find()` не мутує масив.

Але callback може виконувати побічні ефекти, тому мутацій у callback краще уникати.

---

### 8. Чи перевіряє find() весь масив?

Не обов'язково.

Він зупиняється після першого знайденого елемента.

---

### 9. Що таке short-circuit у find()?

Це раннє завершення пошуку після першого успішного результату.

---

### 10. Що повертає callback find()?

Значення, яке визначає, чи підходить поточний елемент.

Практично це зазвичай:

    true
    або
    false

---

### 11. Чи можна використовувати find() з об'єктами?

Так.

Це один із найпоширеніших сценаріїв:

    users.find(user => user.id === id);

---

### 12. Що поверне find() на порожньому масиві?

    undefined

---

### 13. Чи є find() асинхронним?

Ні.

`find()` — синхронний метод масиву.

---

### 14. Чи можна використовувати async callback з find()?

Технічно можна передати `async` функцію, але це не дасть очікуваної асинхронної перевірки.

`find()` не очікує Promise.

---

### 15. Яка складність find()?

У найгіршому випадку:

    O(n)

---

# Рівні вивчення

## 🟢 Core — обов'язково

Ти повинен вміти:

- розуміти `find()`;
- розуміти `findIndex()`;
- знати callback;
- знати `undefined`;
- знати `-1`;
- знаходити число;
- знаходити об'єкт;
- знаходити користувача за `id`;
- знаходити товар;
- перевіряти результат;
- розуміти, що `find()` повертає тільки перший збіг.

Базовий патерн:

    const item = items.find(item => item.id === id);

---

## 🔵 Junior

Потрібно впевнено знати:

- `find()` vs `filter()`;
- `find()` vs `some()`;
- `findIndex()` vs `indexOf()`;
- пошук об'єктів;
- складні умови;
- optional chaining;
- роботу з `undefined`;
- використання `findIndex()` для позиції елемента;
- short-circuit;
- `findLast()` / `findLastIndex()`;
- різницю між пошуком і трансформацією.

---

## 🟠 Middle

Корисно розуміти:

- складність `O(n)`;
- ранній вихід;
- вплив порядку елементів;
- посилання на об'єкти;
- mutation vs immutability;
- асинхронні умови;
- чому `async` callback не працює з `find()` так, як очікується;
- коли краще `for...of`;
- композицію `find()` з іншими методами;
- використання `findIndex()` у state-операціях.

---

## 🔴 Senior

На цьому рівні важливо не просто знати API, а правильно вибирати інструмент.

Потрібно швидко визначати:

    Перший елемент?
    → find()

    Позиція першого елемента?
    → findIndex()

    Останній елемент?
    → findLast()

    Усі елементи?
    → filter()

    Чи існує хоча б один?
    → some()

    Чи всі відповідають умові?
    → every()

    Конкретне примітивне значення?
    → includes() / indexOf()

Також потрібно розуміти, коли простий `for...of` буде зрозумілішим за складний ланцюжок array methods.

---

# Міні-шпаргалка

## find()

    const result = array.find(item => condition);

Результат:

    element
    або
    undefined

---

## findIndex()

    const index = array.findIndex(item => condition);

Результат:

    index
    або
    -1

---

## findLast()

    const result = array.findLast(item => condition);

Результат:

    element
    або
    undefined

---

## findLastIndex()

    const index = array.findLastIndex(item => condition);

Результат:

    index
    або
    -1

---

## Пошук числа

    const number = numbers.find(number => number > 10);

---

## Пошук об'єкта

    const user = users.find(user => user.id === 10);

---

## Пошук індексу

    const index = users.findIndex(user => user.id === 10);

---

## Перевірка результату

    const user = users.find(user => user.id === id);

    if (user) {
      console.log(user);
    }

---

## Безпечний доступ

    const name = users.find(user => user.id === id)?.name;

---

## Значення за замовчуванням

    const name = users.find(user => user.id === id)?.name ?? "Unknown";

---

## Усі збіги

    const users = usersArray.filter(user => user.active);

---

## Чи існує хоча б один?

    const exists = users.some(user => user.active);

---

# Головне

`find()` — це метод:

> **"Знайди мені перший елемент, який відповідає умові."**

    const user = users.find(user => user.id === id);

`findIndex()`:

> **"Знайди мені індекс першого елемента, який відповідає умові."**

    const index = users.findIndex(user => user.id === id);

Запам'ятати чотири результати:

    find()
    → element / undefined

    findIndex()
    → index / -1

    findLast()
    → element / undefined

    findLastIndex()
    → index / -1

І головне порівняння:

    find()    → один елемент
    filter()  → всі елементи
    some()    → чи існує хоча б один
    every()   → чи всі
    findIndex() → індекс першого
    indexOf() → індекс конкретного значення

Для практичної роботи з масивами об'єктів один із найважливіших патернів:

    const item = items.find(item => item.id === id);

А для позиції:

    const index = items.findIndex(item => item.id === id);

Саме ці два патерни варто довести до автоматизму.