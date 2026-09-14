# 08. `slice()` та `splice()`

## Коротко

`slice()` та `splice()` працюють з частинами масиву, але мають **дуже важливу відмінність**:

- `slice()` — **копіює** частину масиву, не змінюючи оригінал.
- `splice()` — **змінює** оригінальний масив: може видаляти, додавати або замінювати елементи.

Головна формула:

    slice()  → НЕ мутує
    splice() → МУТУЄ

Це одна з найважливіших відмінностей методів масивів JavaScript.

---

# Ключові поняття

| Метод | Мутує масив? | Основне призначення |
|---|---:|---|
| `slice()` | ❌ | отримати копію частини масиву |
| `splice()` | ✅ | видалити / додати / замінити елементи |
| `toSpliced()` | ❌ | немутуюча альтернатива `splice()` |

Ментальна модель:

    slice()
        "Візьми шматок, але оригінал не чіпай."

    splice()
        "Зміни сам масив."

---

# 1. `slice()`

## Визначення

`slice()` повертає **новий масив**, який містить частину елементів початкового масиву.

Синтаксис:

    array.slice(start, end);

де:

- `start` — початковий індекс;
- `end` — кінцевий індекс;
- `end` **не включається**.

Головне:

    slice() → не змінює оригінальний масив

---

# 2. Простий `slice()`

    const numbers = [10, 20, 30, 40, 50];

    const result = numbers.slice(1, 4);

    console.log(result);
    // [20, 30, 40]

Індекси:

    0    1    2    3    4
    10   20   30   40   50

    slice(1, 4)
           ↑     ↑
         start  end
                не включається

Отже:

    індекси 1, 2, 3

---

# 3. `slice()` не включає `end`

Це дуже важливо.

    const numbers = [10, 20, 30, 40, 50];

    const result = numbers.slice(1, 3);

Результат:

    [20, 30]

Не:

    [20, 30, 40]

Формула:

    slice(start, end)

    start → включається
    end   → НЕ включається

---

# 4. `slice(start)`

Якщо `end` не вказаний, `slice()` бере всі елементи від `start` до кінця.

    const numbers = [10, 20, 30, 40, 50];

    const result = numbers.slice(2);

    console.log(result);
    // [30, 40, 50]

---

# 5. `slice(0, n)`

Часто потрібно отримати перші `n` елементів.

    const numbers = [10, 20, 30, 40, 50];

    const firstThree = numbers.slice(0, 3);

    console.log(firstThree);
    // [10, 20, 30]

Це дуже поширений патерн.

---

# 6. Отримати останні елементи

`slice()` підтримує від'ємні індекси.

    const numbers = [10, 20, 30, 40, 50];

    const result = numbers.slice(-2);

    console.log(result);
    // [40, 50]

Тобто:

    -1 → 50
    -2 → 40
    -3 → 30

---

# 7. `slice()` з від'ємним `end`

Можна використовувати від'ємні значення і для `end`.

    const numbers = [10, 20, 30, 40, 50];

    const result = numbers.slice(1, -1);

    console.log(result);
    // [20, 30, 40]

Тут:

    start = 1
    end = -1

`-1` означає позицію перед останнім елементом.

---

# 8. Отримати копію всього масиву

Один із класичних способів:

    const numbers = [1, 2, 3];

    const copy = numbers.slice();

    console.log(copy);
    // [1, 2, 3]

Перевірка:

    console.log(copy === numbers);
    // false

Отже:

    slice() → новий масив

---

# 9. Копіювання через `slice()`

Наприклад:

    const original = [1, 2, 3];

    const copy = original.slice();

    copy.push(4);

    console.log(original);
    // [1, 2, 3]

    console.log(copy);
    // [1, 2, 3, 4]

Оригінальний масив не змінився.

---

# 10. `slice()` — shallow copy

Важливо:

    slice()

створює **поверхневу копію** масиву.

Наприклад:

    const users = [
        { name: "Anna" },
        { name: "John" }
    ];

    const copy = users.slice();

Масив новий:

    copy !== users
    // true

Але об'єкти всередині залишаються тими самими посиланнями.

    copy[0] === users[0]
    // true

Тому:

    slice() ≠ deep clone

---

# 11. Приклад shallow copy

    const users = [
        { name: "Anna" },
        { name: "John" }
    ];

    const copy = users.slice();

    copy[0].name = "Kate";

    console.log(users[0].name);
    // "Kate"

Чому?

Тому що:

    copy[0]
        ↓
    той самий об'єкт
        ↑
    users[0]

---

# 12. `slice()` та `const`

`const` забороняє змінити посилання на масив, але не забороняє змінювати його елементи.

Наприклад:

    const numbers = [1, 2, 3];

    numbers[0] = 100;

Це дозволено.

А:

    numbers = [4, 5, 6];

дасть помилку, тому що змінюється саме посилання.

Це важливо для розуміння мутацій масивів.

---

# 13. `splice()`

## Визначення

`splice()` змінює **оригінальний масив**.

Він може:

- видаляти елементи;
- додавати елементи;
- замінювати елементи;
- одночасно видаляти та додавати.

Синтаксис:

    array.splice(start, deleteCount, item1, item2, ...);

де:

- `start` — з якого індексу почати;
- `deleteCount` — скільки елементів видалити;
- `item1`, `item2`, ... — елементи, які потрібно вставити.

---

# 14. `splice()` видалення

Наприклад:

    const numbers = [10, 20, 30, 40, 50];

    numbers.splice(1, 2);

    console.log(numbers);
    // [10, 40, 50]

Що відбулося?

    splice(1, 2)
           ↑  ↑
         start deleteCount

Починаємо з індексу `1`:

    10, [20, 30], 40, 50

Видаляємо:

    20
    30

Залишається:

    [10, 40, 50]

---

# 15. `splice()` повертає видалені елементи

Це дуже важливо.

    const numbers = [10, 20, 30, 40, 50];

    const removed = numbers.splice(1, 2);

    console.log(removed);
    // [20, 30]

    console.log(numbers);
    // [10, 40, 50]

Отже:

    splice()
        ↓
    змінює original
        +
    повертає масив видалених елементів

---

# 16. `splice()` тільки додає

Щоб нічого не видаляти, можна передати:

    deleteCount = 0

Наприклад:

    const numbers = [10, 20, 40, 50];

    numbers.splice(2, 0, 30);

    console.log(numbers);
    // [10, 20, 30, 40, 50]

Розбір:

    splice(2, 0, 30)
           ↑  ↑  ↑
         start  |  item
                |
          нічого не видаляємо

---

# 17. Додати декілька елементів

    const numbers = [1, 4];

    numbers.splice(1, 0, 2, 3);

    console.log(numbers);
    // [1, 2, 3, 4]

Тобто:

    splice(1, 0, 2, 3)

означає:

> починаючи з індексу `1`, нічого не видаляй, встав `2` і `3`.

---

# 18. `splice()` заміна елементів

Можна одночасно видаляти і додавати.

    const numbers = [10, 20, 30, 40];

    numbers.splice(1, 2, 200, 300);

    console.log(numbers);
    // [10, 200, 300, 40]

Було:

    [10, 20, 30, 40]

Видалили:

    20, 30

Вставили:

    200, 300

Стало:

    [10, 200, 300, 40]

---

# 19. Заміна одного елемента

    const numbers = [10, 20, 30];

    numbers.splice(1, 1, 200);

    console.log(numbers);
    // [10, 200, 30]

Формула:

    splice(index, 1, newValue)

---

# 20. Заміна декількох елементів

    const numbers = [1, 2, 3, 4, 5];

    numbers.splice(1, 3, 20, 30);

    console.log(numbers);
    // [1, 20, 30, 5]

Видалили:

    2, 3, 4

Додали:

    20, 30

---

# 21. `splice()` може змінити довжину масиву

Наприклад, видалення:

    const numbers = [1, 2, 3, 4, 5];

    numbers.splice(1, 3);

    console.log(numbers);
    // [1, 5]

Довжина:

    5 → 2

Або додавання:

    const numbers = [1, 2, 5];

    numbers.splice(2, 0, 3, 4);

    console.log(numbers);
    // [1, 2, 3, 4, 5]

Довжина:

    3 → 5

---

# 22. `splice()` без `deleteCount`

Наприклад:

    const numbers = [1, 2, 3, 4, 5];

    numbers.splice(2);

    console.log(numbers);
    // [1, 2]

Якщо `deleteCount` не вказано, видаляються всі елементи від `start` до кінця.

Тобто:

    splice(2)

означає:

> видалити все, починаючи з індексу `2`.

---

# 23. `splice()` з від'ємним `start`

`start` може бути від'ємним.

    const numbers = [10, 20, 30, 40, 50];

    numbers.splice(-2, 1);

    console.log(numbers);
    // [10, 20, 30, 50]

`-2` означає:

    другий елемент з кінця

Тобто починаємо з:

    40

і видаляємо один елемент.

---

# 24. `splice()` з `deleteCount = 0`

Це один із найкорисніших патернів для вставки.

    const fruits = ["apple", "orange"];

    fruits.splice(1, 0, "banana");

    console.log(fruits);
    // ["apple", "banana", "orange"]

Формула:

    splice(index, 0, value)

означає:

> вставити `value` перед елементом з цим індексом.

---

# 25. `slice()` vs `splice()`

Це одна з головних тем.

| | `slice()` | `splice()` |
|---|---|---|
| Мутує original? | ❌ | ✅ |
| Створює новий масив? | ✅ | повертає масив видалених |
| Видаляє елементи з original? | ❌ | ✅ |
| Додає елементи? | ❌ | ✅ |
| Замінює елементи? | ❌ | ✅ |
| Приймає `start`? | ✅ | ✅ |
| Приймає `end`? | ✅ | ❌ |
| Приймає `deleteCount`? | ❌ | ✅ |

Запам'ятати:

    slice()
        → copy

    splice()
        → change

---

# 26. Найважливіша відмінність параметрів

`slice()`:

    slice(start, end)

`end` не включається.

`splice()`:

    splice(start, deleteCount, ...items)

Другий аргумент — це **кількість елементів для видалення**, а не кінцевий індекс.

Наприклад:

    numbers.slice(1, 3);

означає:

    взяти індекси 1 і 2

А:

    numbers.splice(1, 3);

означає:

    почати з індексу 1
    видалити 3 елементи

Це дуже поширена причина помилок.

---

# 27. `slice()` vs `splice()` на одному прикладі

Маємо:

    const numbers = [10, 20, 30, 40, 50];

`slice()`:

    const result = numbers.slice(1, 3);

    console.log(result);
    // [20, 30]

    console.log(numbers);
    // [10, 20, 30, 40, 50]

Original не змінився.

---

`splice()`:

    const numbers = [10, 20, 30, 40, 50];

    const result = numbers.splice(1, 3);

    console.log(result);
    // [20, 30, 40]

    console.log(numbers);
    // [10, 50]

Original змінився.

---

# 28. `slice()` для пагінації

`slice()` дуже часто використовується для простих операцій з пагінацією.

Наприклад:

    const users = [
        "Anna",
        "John",
        "Mark",
        "Kate",
        "Paul",
        "Mike"
    ];

Отримати перші 3:

    const page = users.slice(0, 3);

Результат:

    ["Anna", "John", "Mark"]

Наступні 3:

    const page = users.slice(3, 6);

Результат:

    ["Kate", "Paul", "Mike"]

---

# 29. Формула простої пагінації

Якщо:

    const page = 2;
    const pageSize = 3;

можна:

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const result = users.slice(start, end);

Для:

    page = 2
    pageSize = 3

отримаємо:

    start = 3
    end = 6

Отже:

    users.slice(3, 6)

---

# 30. `slice()` для отримання останніх елементів

Наприклад:

    const messages = [
        "Message 1",
        "Message 2",
        "Message 3",
        "Message 4",
        "Message 5"
    ];

Отримати останні 3:

    const latest = messages.slice(-3);

Результат:

    ["Message 3", "Message 4", "Message 5"]

Це корисний патерн для UI.

---

# 31. `slice()` для перших елементів

Наприклад:

    const products = [
        "Phone",
        "Laptop",
        "Tablet",
        "Watch"
    ];

Отримати перші два:

    const topProducts = products.slice(0, 2);

Результат:

    ["Phone", "Laptop"]

---

# 32. `splice()` для видалення елемента за індексом

Наприклад:

    const users = ["Anna", "John", "Mark"];

    const index = 1;

    users.splice(index, 1);

    console.log(users);
    // ["Anna", "Mark"]

Це класичний спосіб видалення елемента за індексом.

---

# 33. Видалення елемента за значенням

`splice()` працює з індексом, тому спочатку можна знайти індекс.

    const users = ["Anna", "John", "Mark"];

    const index = users.indexOf("John");

    if (index !== -1) {
        users.splice(index, 1);
    }

    console.log(users);
    // ["Anna", "Mark"]

Це хороший приклад комбінування:

    indexOf() + splice()

---

# 34. Видалення першого знайденого елемента

Наприклад:

    const numbers = [10, 20, 30, 20, 40];

    const index = numbers.indexOf(20);

    if (index !== -1) {
        numbers.splice(index, 1);
    }

Результат:

    [10, 30, 20, 40]

Видалено лише **перше** `20`.

---

# 35. `splice()` та `findIndex()`

Для об'єктів часто використовують `findIndex()`.

    const users = [
        { id: 1, name: "Anna" },
        { id: 2, name: "John" },
        { id: 3, name: "Mark" }
    ];

    const index = users.findIndex(user => user.id === 2);

    if (index !== -1) {
        users.splice(index, 1);
    }

    console.log(users);

Результат:

    [
        { id: 1, name: "Anna" },
        { id: 3, name: "Mark" }
    ]

Тут:

    findIndex()
        ↓
    знаходимо позицію
        ↓
    splice()
        ↓
    видаляємо

---

# 36. `splice()` для вставки

Наприклад:

    const users = [
        "Anna",
        "Mark"
    ];

    users.splice(1, 0, "John");

    console.log(users);

Результат:

    ["Anna", "John", "Mark"]

---

# 37. `splice()` для переміщення елемента

Можна видалити елемент з одного місця і вставити в інше.

Наприклад:

    const items = ["A", "B", "C", "D"];

    const [item] = items.splice(1, 1);

    items.splice(3, 0, item);

    console.log(items);

Результат:

    ["A", "C", "D", "B"]

Ідея:

    splice() → забрали
    splice() → вставили

Це вже більш практичний сценарій роботи з масивом.

---

# 38. `slice()` + `splice()`

Методи можна комбінувати.

Наприклад, хочемо отримати копію:

    const numbers = [1, 2, 3, 4, 5];

    const copy = numbers.slice();

    copy.splice(1, 2);

    console.log(copy);
    // [1, 4, 5]

    console.log(numbers);
    // [1, 2, 3, 4, 5]

Таким способом можна:

1. зробити копію;
2. змінити копію;
3. залишити original без змін.

---

# 39. `toSpliced()`

У сучасному JavaScript є немутуючий аналог `splice()`:

    toSpliced()

Він працює подібно до `splice()`, але **не змінює оригінальний масив**.

Синтаксис:

    array.toSpliced(start, deleteCount, item1, item2, ...);

---

# 40. `splice()` vs `toSpliced()`

`splice()`:

    const numbers = [1, 2, 3, 4];

    numbers.splice(1, 2);

    console.log(numbers);
    // [1, 4]

Original змінено.

---

`toSpliced()`:

    const numbers = [1, 2, 3, 4];

    const result = numbers.toSpliced(1, 2);

    console.log(numbers);
    // [1, 2, 3, 4]

    console.log(result);
    // [1, 4]

Original залишився без змін.

---

# 41. `toSpliced()` як immutable `splice()`

Можна запам'ятати:

    splice()
        → mutable

    toSpliced()
        → immutable

Це особливо корисно в:

- React;
- state management;
- функціональному стилі;
- коді, де важливо не мутувати дані.

---

# 42. Альтернатива `toSpliced()` через копію

До появи `toSpliced()` часто використовували:

    const numbers = [1, 2, 3, 4];

    const result = [...numbers];

    result.splice(1, 2);

    console.log(numbers);
    // [1, 2, 3, 4]

    console.log(result);
    // [1, 4]

Або:

    const result = numbers.slice();

    result.splice(1, 2);

Це важливо знати, тому що такий код часто зустрічається в існуючих проектах.

---

# 43. `slice()` та `toSpliced()`

Обидва не мутують original.

Але призначення різне.

`slice()`:

    const result = numbers.slice(1, 3);

означає:

> взяти частину масиву.

`toSpliced()`:

    const result = numbers.toSpliced(1, 2);

означає:

> створити новий масив так, ніби ми виконали `splice()`.

---

# 44. Порівняння `slice()`, `splice()`, `toSpliced()`

| Метод | Мутує? | Повертає | Призначення |
|---|---:|---|---|
| `slice()` | ❌ | новий масив | отримати частину |
| `splice()` | ✅ | видалені елементи | змінити масив |
| `toSpliced()` | ❌ | новий масив | немутуюча зміна |

Ментальна модель:

    slice()
        → GET частину

    splice()
        → CHANGE original

    toSpliced()
        → CREATE changed copy

---

# 45. Типова помилка: плутати `slice()` та `splice()`

Неправильне припущення:

    const numbers = [1, 2, 3, 4];

    numbers.slice(1, 2);

Очікувати:

    [1, 3, 4]

Але `slice()` нічого не видаляє з original.

Він просто повертає:

    [2]

Якщо потрібно видалити:

    numbers.splice(1, 1);

Результат:

    [1, 3, 4]

---

# 46. Типова помилка: другий аргумент `splice()`

Неправильно думати:

    splice(start, end)

Насправді:

    splice(start, deleteCount)

Наприклад:

    numbers.splice(2, 3);

означає:

> починаючи з індексу `2`, видалити **3 елементи**.

---

# 47. Типова помилка: очікувати, що `splice()` поверне весь масив

    const numbers = [1, 2, 3, 4];

    const result = numbers.splice(1, 2);

    console.log(result);

Результат:

    [2, 3]

`splice()` повертає **видалені елементи**, а не змінений масив.

Сам змінений масив:

    numbers

буде:

    [1, 4]

---

# 48. Типова помилка: забути про мутацію

    const numbers = [1, 2, 3, 4];

    const result = numbers.splice(1, 2);

Після цього:

    numbers
    // [1, 4]

`splice()` вже змінив original.

Це може бути проблемою, якщо масив використовується ще десь.

---

# 49. Мутація та React

У React небажано безпосередньо мутувати state.

Потенційно проблемний підхід:

    const removeUser = index => {
        users.splice(index, 1);
        setUsers(users);
    };

Тут ми змінили існуючий масив.

Краще створити новий масив.

Наприклад:

    const removeUser = index => {
        setUsers(users.toSpliced(index, 1));
    };

Або, якщо `toSpliced()` недоступний у цільовому середовищі:

    const removeUser = index => {
        setUsers(prevUsers => {
            const nextUsers = [...prevUsers];
            nextUsers.splice(index, 1);
            return nextUsers;
        });
    };

Головна ідея:

    React state
        ↓
    не мутувати напряму
        ↓
    створити новий масив

---

# 50. `slice()` у React

`slice()` добре підходить для отримання частини state без мутації.

Наприклад:

    const visibleUsers = users.slice(0, 10);

`users` залишається незмінним.

---

# 51. `slice()` та `splice()` у Full Stack JavaScript

Ці методи можуть зустрічатися на:

- frontend;
- backend;
- API data transformation;
- pagination;
- списках;
- UI;
- state management;
- обробці результатів запитів.

Наприклад, backend отримав масив:

    const users = await getUsers();

Можна отримати перші 10:

    const firstUsers = users.slice(0, 10);

Без зміни `users`.

---

# 52. `slice()` для простого API pagination

Наприклад:

    const page = 2;
    const limit = 10;

    const start = (page - 1) * limit;
    const end = start + limit;

    const result = users.slice(start, end);

Це проста **in-memory pagination**.

Для великих даних у реальному backend зазвичай краще робити pagination безпосередньо в базі даних, але `slice()` корисний для розуміння механіки.

---

# 53. `splice()` та черга

`splice()` може використовуватися для видалення елементів з початку масиву:

    const queue = ["A", "B", "C"];

    const [first] = queue.splice(0, 1);

    console.log(first);
    // "A"

    console.log(queue);
    // ["B", "C"]

Але для частого видалення з початку великих масивів варто розглядати інші структури/підходи через вартість зсуву елементів.

Для навчання `splice()` важливо розуміти сам принцип.

---

# 54. `slice()` та `splice()` з від'ємними індексами

`slice()`:

    const numbers = [1, 2, 3, 4, 5];

    numbers.slice(-2);

Результат:

    [4, 5]

`splice()`:

    const numbers = [1, 2, 3, 4, 5];

    numbers.splice(-2, 1);

Результат:

    [1, 2, 3, 5]

В обох методах негативні індекси рахуються з кінця, але параметри мають різний сенс.

---

# 55. `slice()` не видаляє

Якщо потрібно просто подивитися / отримати частину:

    const part = numbers.slice(1, 4);

Використовуй:

    slice()

Якщо потрібно реально змінити масив:

    numbers.splice(1, 2);

Використовуй:

    splice()

Якщо потрібно змінити масив, але залишити original:

    const result = numbers.toSpliced(1, 2);

Використовуй:

    toSpliced()

---

# 56. Практична задача: видалити користувача

Є:

    const users = [
        { id: 1, name: "Anna" },
        { id: 2, name: "John" },
        { id: 3, name: "Mark" }
    ];

Знайти користувача:

    const index = users.findIndex(user => user.id === 2);

Видалити:

    if (index !== -1) {
        users.splice(index, 1);
    }

---

# 57. Немутуючий варіант

Якщо не хочемо змінювати original:

    const index = users.findIndex(user => user.id === 2);

    const result = index !== -1
        ? users.toSpliced(index, 1)
        : users;

Або універсальний підхід:

    const result = users.filter(user => user.id !== 2);

Для видалення за умовою `filter()` часто є ще простішим рішенням.

---

# 58. `splice()` vs `filter()`

Це важлива практична відмінність.

Якщо знаємо **індекс**:

    users.splice(index, 1);

Якщо хочемо залишити елементи, які відповідають умові:

    users.filter(user => user.id !== 2);

`filter()` не мутує original.

Тому в сучасному JavaScript часто краще:

    const result = users.filter(user => user.id !== 2);

---

# 59. `splice()` vs `toSpliced()` vs `filter()`

| Задача | Варіант |
|---|---|
| видалити за індексом і мутувати | `splice()` |
| видалити за індексом без мутації | `toSpliced()` |
| видалити за умовою без мутації | `filter()` |
| отримати частину | `slice()` |

Приклад:

    const users = ["Anna", "John", "Mark"];

За індексом:

    users.toSpliced(1, 1);

За значенням:

    users.filter(user => user !== "John");

---

# 60. `slice()` та рядки

Синтаксис `slice()` є не тільки у масивів.

Він також існує у рядків:

    const text = "JavaScript";

    const result = text.slice(0, 4);

    console.log(result);
    // "Java"

Але:

    splice()

у рядків немає.

`splice()` — метод масивів.

---

# 61. `slice()` у рядках не мутує

Рядки в JavaScript взагалі immutable.

    const text = "JavaScript";

    const result = text.slice(0, 4);

    console.log(text);
    // "JavaScript"

    console.log(result);
    // "Java"

Це окремий випадок, але корисно знати.

---

# 62. Складність

Для практичного рівня достатньо розуміти:

### `slice()`

Створює новий масив із вибраної частини.

    slice()

потребує пам'яті для результату.

### `splice()`

Може потребувати переміщення елементів після точки зміни.

Наприклад, при видаленні з початку:

    [A, B, C, D, E]

потрібно логічно змістити елементи:

    [B, C, D, E]

Тому часті операції `splice()` на початку великих масивів можуть бути дорогими.

### `toSpliced()`

Створює новий масив, тому також потребує додаткової пам'яті.

Для Junior достатньо пам'ятати:

    slice()
        → створює копію частини

    splice()
        → змінює original

---

# 63. Практична схема вибору

Постав собі питання:

### Потрібно отримати частину масиву?

    slice()

### Потрібно змінити original?

    splice()

### Потрібно змінити масив, але без мутації?

    toSpliced()

### Потрібно видалити елементи за умовою?

    filter()

### Потрібно знайти індекс?

    findIndex()

### Потрібно вставити елемент?

    splice()

### Потрібно отримати останні N елементів?

    slice(-N)

---

# 64. Міні-шпаргалка

## `slice()`

    const result = array.slice(start, end);

- `start` включається;
- `end` не включається;
- original не змінюється;
- повертає новий масив.

---

## Копія всього масиву

    const copy = array.slice();

---

## Перші N

    const first = array.slice(0, N);

---

## Останні N

    const last = array.slice(-N);

---

## Частина

    const part = array.slice(2, 5);

---

# 65. `splice()`

    array.splice(start, deleteCount, ...items);

Мутує original.

---

## Видалити

    array.splice(index, 1);

---

## Видалити декілька

    array.splice(index, count);

---

## Вставити

    array.splice(index, 0, value);

---

## Замінити

    array.splice(index, 1, newValue);

---

## Видалити до кінця

    array.splice(index);

---

## Видалені елементи

    const removed = array.splice(index, count);

---

# 66. `toSpliced()`

Немутуюча версія `splice()`:

    const result = array.toSpliced(index, count);

Original:

    array

не змінюється.

---

# 67. Головна таблиця

| Метод | Мутація | Повертає | Основна задача |
|---|---:|---|---|
| `slice()` | ❌ | новий масив | копія частини |
| `splice()` | ✅ | видалені елементи | змінити original |
| `toSpliced()` | ❌ | новий масив | immutable splice |
| `filter()` | ❌ | новий масив | видалити за умовою |
| `findIndex()` | ❌ | число | знайти індекс |

---

# 68. Питання для співбесіди

### 1. Яка різниця між `slice()` і `splice()`?

`slice()` не змінює original.

`splice()` змінює original.

---

### 2. Що робить `slice(1, 4)`?

Повертає елементи з індексами:

    1, 2, 3

Індекс `4` не включається.

---

### 3. Що означає другий аргумент `splice()`?

`deleteCount` — кількість елементів, які потрібно видалити.

---

### 4. Що повертає `splice()`?

Масив видалених елементів.

---

### 5. Чи змінює `slice()` original?

Ні.

---

### 6. Чи змінює `splice()` original?

Так.

---

### 7. Як скопіювати масив через `slice()`?

    const copy = array.slice();

---

### 8. Як отримати останні 3 елементи?

    const result = array.slice(-3);

---

### 9. Як вставити елемент у масив?

    array.splice(index, 0, value);

---

### 10. Як замінити елемент?

    array.splice(index, 1, newValue);

---

### 11. Що таке `toSpliced()`?

Немутуюча версія `splice()`, яка повертає новий масив.

---

### 12. Чому `splice()` може бути проблемою в React?

Тому що він мутує існуючий state-масив.

---

### 13. Чим `slice()` відрізняється від deep clone?

`slice()` створює тільки shallow copy.

---

### 14. Як видалити елемент за значенням?

Наприклад:

    const index = array.indexOf(value);

    if (index !== -1) {
        array.splice(index, 1);
    }

Або без мутації:

    const result = array.filter(item => item !== value);

---

### 15. Чим `slice()` відрізняється від `splice()` за параметрами?

`slice()`:

    slice(start, end)

`splice()`:

    splice(start, deleteCount, ...items)

---

# 69. Шлях вивчення

## Core

Потрібно знати обов'язково:

- `slice()`;
- `splice()`;
- `start`;
- `end`;
- `deleteCount`;
- `slice()` не мутує;
- `splice()` мутує;
- `slice()` повертає новий масив;
- `splice()` повертає видалені елементи;
- вставка через `splice()`;
- видалення через `splice()`;
- заміна через `splice()`.

---

## Junior

Потрібно вміти:

- копіювати масив через `slice()`;
- отримувати перші/останні N елементів;
- працювати з негативними індексами;
- видаляти за індексом;
- знаходити індекс через `indexOf()` / `findIndex()`;
- комбінувати `findIndex()` + `splice()`;
- розуміти shallow copy;
- знати `toSpliced()`;
- розуміти мутацію React state;
- використовувати `filter()` як немутуючу альтернативу для видалення за умовою.

---

## Middle

Корисно розуміти:

- вартість операцій вставки/видалення;
- роботу з великими масивами;
- immutable data patterns;
- різницю між shallow та deep copy;
- вибір між `splice()`, `toSpliced()`, `filter()`;
- алгоритми переміщення елементів;
- ефективну роботу з колекціями.

---

## Senior

Додатково:

- memory allocation;
- performance trade-offs;
- структури даних для частих вставок/видалень;
- immutable data architecture;
- state management;
- оптимізацію великих колекцій;
- server-side pagination;
- роботу з даними на рівні БД замість обробки великих масивів у пам'яті.

---

# 70. Практичні вправи

## Вправа 1 — `slice()`

Є:

    const numbers = [10, 20, 30, 40, 50];

Отримати:

    [20, 30, 40]

---

## Вправа 2 — останні елементи

Є:

    const numbers = [1, 2, 3, 4, 5, 6];

Отримати останні 2:

    [5, 6]

---

## Вправа 3 — копія

Створити копію:

    const numbers = [1, 2, 3];

Після зміни копії original не повинен змінитися.

---

## Вправа 4 — видалення

Є:

    const numbers = [10, 20, 30, 40, 50];

Видалити `30`.

Очікуваний результат:

    [10, 20, 40, 50]

---

## Вправа 5 — вставка

Є:

    const numbers = [1, 2, 4, 5];

Вставити `3` між `2` і `4`.

Результат:

    [1, 2, 3, 4, 5]

---

## Вправа 6 — заміна

Є:

    const numbers = [1, 2, 3, 4];

Замінити `3` на `30`.

Результат:

    [1, 2, 30, 4]

---

## Вправа 7 — видалення об'єкта

Є:

    const users = [
        { id: 1, name: "Anna" },
        { id: 2, name: "John" },
        { id: 3, name: "Mark" }
    ];

Видалити користувача з:

    id === 2

---

## Вправа 8 — immutable delete

Виконати ту саму операцію, але original `users` не повинен змінитися.

Спробувати:

    toSpliced()

та:

    filter()

---

# 71. Головне

- `slice()` — **взяти частину** масиву.
- `slice()` **не мутує** original.
- `slice()` повертає **новий масив**.
- У `slice(start, end)` `start` включається, `end` — ні.
- `slice(-N)` — зручний спосіб отримати останні `N` елементів.
- `slice()` створює **shallow copy**, а не deep clone.
- `splice()` — **змінити** масив.
- `splice()` мутує original.
- `splice(start, deleteCount, ...items)` може видаляти, вставляти та замінювати.
- Другий аргумент `splice()` — це **кількість**, а не кінцевий індекс.
- `splice()` повертає **видалені елементи**.
- `splice(index, 0, value)` — вставка.
- `splice(index, 1, value)` — заміна.
- `toSpliced()` — сучасна немутуюча альтернатива `splice()`.
- Для React/state важливо уникати прямої мутації масивів.
- `filter()` часто є кращим варіантом для немутуючого видалення за умовою.

> **Ментальна модель:**
>
> `slice()` → **взяти шматок**
>
> `splice()` → **змінити масив**
>
> `toSpliced()` → **створити змінену копію**