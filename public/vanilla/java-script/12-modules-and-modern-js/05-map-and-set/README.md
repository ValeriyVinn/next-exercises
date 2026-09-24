# 05. Map та Set

`Map` і `Set` — це спеціальні колекції JavaScript для зберігання даних.

Вони відрізняються від звичайних:

    Array
    Object

і вирішують інші задачі.

Основні колекції:

    Array
    Object
    Map
    Set
    WeakMap
    WeakSet

У цій темі потрібно добре зрозуміти саме:

    Map
    Set

А також знати, коли їх використовувати замість:

    Object
    Array

---

# Ключові поняття

| Поняття | Значення |
|---|---|
| `Map` | колекція пар `key → value` |
| `Set` | колекція унікальних значень |
| `map.set()` | додає або змінює значення в `Map` |
| `map.get()` | отримує значення за ключем |
| `map.has()` | перевіряє наявність ключа |
| `map.delete()` | видаляє елемент |
| `map.clear()` | очищає `Map` |
| `set.add()` | додає значення |
| `set.has()` | перевіряє наявність значення |
| `set.delete()` | видаляє значення |
| `set.clear()` | очищає `Set` |
| `size` | кількість елементів |
| `keys()` | ітератор ключів |
| `values()` | ітератор значень |
| `entries()` | ітератор пар |
| `for...of` | перебір колекції |
| `new Map()` | створення `Map` |
| `new Set()` | створення `Set` |
| `WeakMap` | спеціальна колекція з object keys |
| `WeakSet` | спеціальна колекція object values |

---

# Що потрібно пам'ятати

1. `Map` зберігає пари:

       key → value

2. `Set` зберігає тільки унікальні значення.

3. У `Map` ключем може бути не тільки `string`.

4. Ключем `Map` може бути:

       string
       number
       boolean
       object
       array
       function
       symbol

5. `Set` автоматично прибирає дублікати.

6. Для `Map` використовується:

       set()
       get()
       has()
       delete()
       clear()

7. Для `Set` використовується:

       add()
       has()
       delete()
       clear()

8. Кількість елементів отримується через:

       size

9. Не використовуй `length` для `Map` і `Set`.

10. `Map` зберігає порядок вставки елементів.

11. `Set` також зберігає порядок вставки у своїй ітерації.

12. `Map` і `Set` є ітерованими колекціями.

13. Їх можна використовувати з:

       for...of
       spread syntax
       Array.from()

14. `Map` часто використовується для:

       швидкого пошуку за ключем
       підрахунків
       кешів
       зв'язків key → value
       групування

15. `Set` часто використовується для:

       унікалізації
       перевірки наявності
       множин
       видалення дублікатів

---

# 1. Що таке Map

`Map` — це колекція, яка зберігає пари:

    key → value

Створення:

    const users = new Map();

Додавання:

    users.set(1, "Valeriy");
    users.set(2, "Anna");
    users.set(3, "John");

Отримання:

    console.log(users.get(1));

Результат:

    Valeriy

---

# 2. Map як таблиця key → value

Можна уявляти:

    Map

    key       value
    ─────────────────
    1         Valeriy
    2         Anna
    3         John

Основна ідея:

> За ключем швидко отримати пов'язане значення.

---

# 3. Створення Map

Порожній:

    const map = new Map();

З початковими значеннями:

    const users = new Map([
        [1, "Valeriy"],
        [2, "Anna"],
        [3, "John"]
    ]);

Тут кожен елемент має вигляд:

    [key, value]

---

# 4. `Map.set()`

`set()` додає пару:

    const users = new Map();

    users.set(1, "Valeriy");

    users.set(2, "Anna");

Тепер:

    users

містить:

    1 → "Valeriy"
    2 → "Anna"

---

# 5. `Map.get()`

Отримання значення:

    const users = new Map();

    users.set(1, "Valeriy");

    console.log(users.get(1));

Результат:

    Valeriy

Якщо ключа немає:

    console.log(users.get(100));

Результат:

    undefined

---

# 6. `Map.has()`

Перевірка наявності ключа:

    const users = new Map();

    users.set(1, "Valeriy");

    console.log(users.has(1));

    console.log(users.has(100));

Результат:

    true
    false

---

# 7. `Map.delete()`

Видалення елемента:

    const users = new Map();

    users.set(1, "Valeriy");
    users.set(2, "Anna");

    users.delete(1);

Тепер:

    2 → "Anna"

`delete()` повертає boolean:

    console.log(users.delete(2));

Результат:

    true

Якщо такого ключа не було:

    console.log(users.delete(100));

Результат:

    false

---

# 8. `Map.clear()`

Очищення всієї колекції:

    const users = new Map([
        [1, "Valeriy"],
        [2, "Anna"]
    ]);

    users.clear();

Тепер:

    users.size

дорівнює:

    0

---

# 9. `Map.size`

Кількість елементів:

    const users = new Map([
        [1, "Valeriy"],
        [2, "Anna"],
        [3, "John"]
    ]);

    console.log(users.size);

Результат:

    3

Не:

    users.length

У `Map` використовується:

    size

---

# 10. Map з Number як ключем

    const scores = new Map();

    scores.set(1, 100);
    scores.set(2, 200);
    scores.set(3, 300);

    console.log(scores.get(2));

Результат:

    200

---

# 11. Map з String як ключем

    const capitals = new Map();

    capitals.set("Ukraine", "Kyiv");
    capitals.set("France", "Paris");
    capitals.set("Germany", "Berlin");

    console.log(capitals.get("Ukraine"));

Результат:

    Kyiv

---

# 12. Map з Boolean як ключем

Ключем може бути boolean:

    const values = new Map();

    values.set(true, "yes");
    values.set(false, "no");

    console.log(values.get(true));

Результат:

    yes

---

# 13. Object як ключ Map

Це одна з найважливіших особливостей `Map`.

    const user = {
        id: 1,
        name: "Valeriy"
    };

    const roles = new Map();

    roles.set(user, "admin");

    console.log(roles.get(user));

Результат:

    admin

Ключем є сам object.

---

# 14. Array як ключ Map

Масив також може бути ключем:

    const key = [1, 2, 3];

    const map = new Map();

    map.set(key, "data");

    console.log(map.get(key));

Результат:

    data

---

# 15. Function як ключ Map

Функція також може бути ключем:

    const handler = () => {
        console.log("clicked");
    };

    const map = new Map();

    map.set(handler, "click handler");

    console.log(map.get(handler));

---

# 16. Важливість посилання для object keys

Ось так:

    const user1 = {
        id: 1
    };

    const user2 = {
        id: 1
    };

Це два різні об'єкти.

Тому:

    const map = new Map();

    map.set(user1, "User 1");

    console.log(map.get(user2));

Результат:

    undefined

Хоча:

    user1.id === user2.id

дає:

    true

Але:

    user1 === user2

дає:

    false

---

# 17. Map використовує identity ключа

Для object keys важливе саме посилання:

    const key = {};

    const map = new Map();

    map.set(key, "value");

    console.log(map.get(key));

Результат:

    value

А:

    console.log(map.get({}));

дасть:

    undefined

Тому що `{}` створює новий об'єкт.

---

# 18. Перезапис значення

Якщо встановити той самий ключ:

    const map = new Map();

    map.set("user", "Valeriy");

    map.set("user", "Anna");

Map не створить два елементи.

Значення буде замінене:

    user → Anna

---

# 19. `set()` повертає Map

Це дозволяє робити chaining:

    const map = new Map();

    map
        .set("name", "Valeriy")
        .set("age", 56)
        .set("city", "Vinnytsia");

---

# 20. Map та Object

Обидва можуть зберігати:

    key → value

Але:

    Object

частіше використовується як структура даних / record.

А:

    Map

як спеціальна колекція key-value.

---

# 21. Map vs Object

| Особливість | Object | Map |
|---|---|---|
| Key-value | так | так |
| Багато типів ключів | обмежено | так |
| Object як key | ні, як звичайний property key | так |
| `size` | немає | є |
| `get()` | немає | є |
| `set()` | немає | є |
| `has()` | окремі способи | є |
| `delete()` | `delete object[key]` | є |
| Ітерація | менш пряма | зручна |
| JSON | природно | потрібно перетворення |
| Семантика | record / object | collection |

---

# 22. Коли краще Object

Наприклад:

    const user = {
        name: "Valeriy",
        age: 56,
        active: true
    };

Це структура об'єкта.

Тут `Object` природний.

---

# 23. Коли краще Map

Наприклад:

    const usersById = new Map();

    usersById.set(101, user1);
    usersById.set(102, user2);
    usersById.set(103, user3);

Тут ми явно говоримо:

> Це колекція, де ID пов'язаний з User.

`Map` дуже добре відповідає цій задачі.

---

# 24. Map як індекс

Наприклад:

    const users = [
        { id: 1, name: "Valeriy" },
        { id: 2, name: "Anna" },
        { id: 3, name: "John" }
    ];

Можна створити індекс:

    const usersById = new Map(
        users.map(user => [user.id, user])
    );

Тепер:

    console.log(usersById.get(2));

Отримаємо:

    { id: 2, name: "Anna" }

Це дуже практичний патерн.

---

# 25. Перетворення Array → Map

    const users = [
        { id: 1, name: "Valeriy" },
        { id: 2, name: "Anna" }
    ];

    const usersMap = new Map(
        users.map(user => [user.id, user])
    );

Структура:

    1 → { id: 1, name: "Valeriy" }
    2 → { id: 2, name: "Anna" }

---

# 26. Map → Array

Можна використати spread:

    const map = new Map([
        ["name", "Valeriy"],
        ["age", 56]
    ]);

    const entries = [...map];

Результат:

    [
        ["name", "Valeriy"],
        ["age", 56]
    ]

---

# 27. Map → Array значень

    const map = new Map([
        ["name", "Valeriy"],
        ["city", "Vinnytsia"]
    ]);

    const values = [...map.values()];

Результат:

    ["Valeriy", "Vinnytsia"]

---

# 28. Map → Array ключів

    const map = new Map([
        ["name", "Valeriy"],
        ["city", "Vinnytsia"]
    ]);

    const keys = [...map.keys()];

Результат:

    ["name", "city"]

---

# 29. Map → Object

Для простих string/symbol keys:

    const map = new Map([
        ["name", "Valeriy"],
        ["age", 56]
    ]);

    const object = Object.fromEntries(map);

Результат:

    {
        name: "Valeriy",
        age: 56
    }

Це дуже корисний сучасний JavaScript-патерн.

---

# 30. Object → Map

    const user = {
        name: "Valeriy",
        age: 56
    };

    const map = new Map(
        Object.entries(user)
    );

Тепер:

    map.get("name");

Результат:

    Valeriy

---

# 31. Перебір Map

`Map` можна перебирати через `for...of`.

    const users = new Map([
        [1, "Valeriy"],
        [2, "Anna"],
        [3, "John"]
    ]);

    for (const [id, name] of users) {
        console.log(id, name);
    }

---

# 32. `Map.keys()`

    const users = new Map([
        [1, "Valeriy"],
        [2, "Anna"]
    ]);

    for (const id of users.keys()) {
        console.log(id);
    }

Результат:

    1
    2

---

# 33. `Map.values()`

    const users = new Map([
        [1, "Valeriy"],
        [2, "Anna"]
    ]);

    for (const name of users.values()) {
        console.log(name);
    }

Результат:

    Valeriy
    Anna

---

# 34. `Map.entries()`

    const users = new Map([
        [1, "Valeriy"],
        [2, "Anna"]
    ]);

    for (const entry of users.entries()) {
        console.log(entry);
    }

Отримаємо:

    [1, "Valeriy"]
    [2, "Anna"]

Фактично:

    for (const [id, name] of users) {
        // ...
    }

використовує entries-поведінку за замовчуванням.

---

# 35. Map.forEach()

У `Map` є власний `forEach()`:

    const users = new Map([
        [1, "Valeriy"],
        [2, "Anna"]
    ]);

    users.forEach((name, id) => {
        console.log(id, name);
    });

Зверни увагу на порядок аргументів:

    value
    key
    map

тобто:

    map.forEach((value, key) => {});

---

# 36. Map Iterator

Методи:

    keys()
    values()
    entries()

повертають ітератори.

Наприклад:

    const map = new Map([
        ["a", 1],
        ["b", 2]
    ]);

    const iterator = map.keys();

    console.log(iterator.next());

Результат:

    {
        value: "a",
        done: false
    }

---

# 37. Set

`Set` — це колекція унікальних значень.

Створення:

    const numbers = new Set();

Додавання:

    numbers.add(10);
    numbers.add(20);
    numbers.add(30);

---

# 38. Set не допускає дублікати

    const numbers = new Set();

    numbers.add(10);
    numbers.add(10);
    numbers.add(10);

Результат:

    Set { 10 }

Значення зберігається тільки один раз.

---

# 39. Створення Set з Array

Дуже поширений спосіб:

    const numbers = new Set([
        1,
        2,
        3,
        2,
        1
    ]);

Результат:

    Set { 1, 2, 3 }

---

# 40. Унікалізація Array

Один із найвідоміших патернів:

    const numbers = [1, 2, 2, 3, 3, 4];

    const uniqueNumbers = [
        ...new Set(numbers)
    ];

Результат:

    [1, 2, 3, 4]

---

# 41. `Set.add()`

    const colors = new Set();

    colors.add("red");
    colors.add("green");
    colors.add("blue");

---

# 42. `Set.has()`

    const colors = new Set([
        "red",
        "green",
        "blue"
    ]);

    console.log(colors.has("green"));

    console.log(colors.has("yellow"));

Результат:

    true
    false

---

# 43. `Set.delete()`

    const colors = new Set([
        "red",
        "green",
        "blue"
    ]);

    colors.delete("green");

Тепер:

    red
    blue

Як і в `Map`, `delete()` повертає boolean.

---

# 44. `Set.clear()`

    const colors = new Set([
        "red",
        "green",
        "blue"
    ]);

    colors.clear();

Тепер:

    colors.size

дорівнює:

    0

---

# 45. `Set.size`

    const colors = new Set([
        "red",
        "green",
        "blue"
    ]);

    console.log(colors.size);

Результат:

    3

Не:

    colors.length

---

# 46. Set з різними типами

`Set` може містити різні значення:

    const values = new Set();

    values.add(10);
    values.add("hello");
    values.add(true);
    values.add(null);

Це допустимо.

---

# 47. Set з Objects

Об'єкти також можна зберігати:

    const user1 = {
        id: 1
    };

    const user2 = {
        id: 2
    };

    const users = new Set();

    users.add(user1);
    users.add(user2);

---

# 48. Set та Object identity

Як і `Map`, `Set` використовує identity для об'єктів.

    const user = {
        id: 1
    };

    const users = new Set();

    users.add(user);

    console.log(users.has(user));

Результат:

    true

А:

    console.log(users.has({
        id: 1
    }));

Результат:

    false

Тому що це інший object reference.

---

# 49. Set з Array

Масив також може бути значенням:

    const numbers = [1, 2, 3];

    const set = new Set();

    set.add(numbers);

    console.log(set.has(numbers));

Результат:

    true

---

# 50. Перебір Set

    const colors = new Set([
        "red",
        "green",
        "blue"
    ]);

    for (const color of colors) {
        console.log(color);
    }

---

# 51. Set.keys()

У `Set` є:

    keys()

Але значення ключа і значення самого елемента фактично однакові.

    const set = new Set([
        "a",
        "b",
        "c"
    ]);

    for (const value of set.keys()) {
        console.log(value);
    }

---

# 52. Set.values()

    const set = new Set([
        "a",
        "b",
        "c"
    ]);

    for (const value of set.values()) {
        console.log(value);
    }

---

# 53. Set.entries()

`entries()` повертає:

    [value, value]

Наприклад:

    const set = new Set([
        "a",
        "b"
    ]);

    for (const entry of set.entries()) {
        console.log(entry);
    }

Результат:

    ["a", "a"]
    ["b", "b"]

Це зроблено для узгодження API з іншими колекціями.

---

# 54. Set.forEach()

    const colors = new Set([
        "red",
        "green",
        "blue"
    ]);

    colors.forEach(color => {
        console.log(color);
    });

Для `Set` значення передається як перший і другий аргумент.

    set.forEach((value, valueAgain) => {
        // ...
    });

---

# 55. Set → Array

    const set = new Set([
        1,
        2,
        3
    ]);

    const array = [...set];

Результат:

    [1, 2, 3]

---

# 56. Array → Set

    const array = [
        1,
        2,
        2,
        3,
        3
    ];

    const set = new Set(array);

---

# 57. Set як математична множина

`Set` дуже добре відповідає поняттю множини:

    A = {1, 2, 3}

    B = {3, 4, 5}

Можна виконувати операції над множинами.

Це особливо корисно при роботі з:

    permissions
    tags
    categories
    IDs
    unique values

---

# 58. Перетин множин

Наприклад:

    const a = new Set([1, 2, 3, 4]);
    const b = new Set([3, 4, 5, 6]);

Можна отримати спільні значення:

    const intersection = new Set(
        [...a].filter(value => b.has(value))
    );

Результат:

    Set { 3, 4 }

---

# 59. Об'єднання множин

    const a = new Set([1, 2, 3]);
    const b = new Set([3, 4, 5]);

    const union = new Set([
        ...a,
        ...b
    ]);

Результат:

    Set { 1, 2, 3, 4, 5 }

---

# 60. Різниця множин

Знайти елементи `a`, яких немає в `b`:

    const a = new Set([1, 2, 3, 4]);
    const b = new Set([3, 4, 5, 6]);

    const difference = new Set(
        [...a].filter(value => !b.has(value))
    );

Результат:

    Set { 1, 2 }

---

# 61. Перевірка підмножини

Перевіримо, чи всі елементи `a` містяться в `b`:

    const a = new Set([1, 2]);
    const b = new Set([1, 2, 3, 4]);

    const isSubset = [...a]
        .every(value => b.has(value));

Результат:

    true

---

# 62. Set та унікальні ID

Дуже практичний випадок:

    const selectedIds = new Set();

    selectedIds.add(10);
    selectedIds.add(20);
    selectedIds.add(10);

Тепер:

    [...selectedIds]

Результат:

    [10, 20]

Це зручно для:

    selected items
    permissions
    tags
    checked rows
    visited pages

---

# 63. Set для visited

Наприклад, алгоритм обходить граф:

    const visited = new Set();

Перед обробкою:

    if (visited.has(node)) {
        return;
    }

Додаємо:

    visited.add(node);

Це один із дуже поширених випадків використання `Set`.

---

# 64. Set для дедуплікації

Наприклад:

    const emails = [
        "a@example.com",
        "b@example.com",
        "a@example.com",
        "c@example.com"
    ];

    const uniqueEmails = [
        ...new Set(emails)
    ];

---

# 65. Set для швидкої перевірки належності

Наприклад:

    const allowedRoles = new Set([
        "admin",
        "editor",
        "teacher"
    ]);

    if (allowedRoles.has(user.role)) {
        // allowed
    }

Це дуже зручніше, ніж постійно працювати з великим масивом значень.

---

# 66. `Array.includes()` vs `Set.has()`

Можна написати:

    const roles = [
        "admin",
        "editor",
        "teacher"
    ];

    roles.includes(user.role);

Або:

    const roles = new Set([
        "admin",
        "editor",
        "teacher"
    ]);

    roles.has(user.role);

Для одноразової невеликої перевірки `Array.includes()` цілком достатній.

Якщо колекція використовується як набір унікальних значень і перевірки membership є центральною операцією, `Set` часто краще передає намір.

---

# 67. Map для підрахунку

Один із найважливіших практичних патернів.

Потрібно порахувати кількість кожного слова:

    const words = [
        "js",
        "react",
        "js",
        "node",
        "react",
        "js"
    ];

Використовуємо `Map`:

    const counts = new Map();

    for (const word of words) {
        const current = counts.get(word) ?? 0;

        counts.set(word, current + 1);
    }

Результат:

    js → 3
    react → 2
    node → 1

---

# 68. Підрахунок через `Map.has()`

Можна написати:

    const counts = new Map();

    for (const word of words) {
        if (counts.has(word)) {
            counts.set(
                word,
                counts.get(word) + 1
            );
        } else {
            counts.set(word, 1);
        }
    }

Але:

    counts.get(word) ?? 0

часто коротше.

---

# 69. Map для grouping

Наприклад, є users:

    const users = [
        { name: "A", role: "admin" },
        { name: "B", role: "user" },
        { name: "C", role: "admin" }
    ];

Потрібно згрупувати їх за role.

    const groups = new Map();

    for (const user of users) {
        if (!groups.has(user.role)) {
            groups.set(user.role, []);
        }

        groups.get(user.role).push(user);
    }

Результат концептуально:

    admin → [A, C]
    user  → [B]

---

# 70. Map для кешу

Наприклад:

    const cache = new Map();

    const getUser = async (id) => {
        if (cache.has(id)) {
            return cache.get(id);
        }

        const user = await fetchUser(id);

        cache.set(id, user);

        return user;
    };

Це базова модель кешування.

У production caching може бути значно складнішим, але принцип `key → cached value` саме такий.

---

# 71. Map для зв'язку ID → Object

    const usersById = new Map();

    for (const user of users) {
        usersById.set(user.id, user);
    }

Тепер:

    const user = usersById.get(42);

Це дуже поширена структура даних.

---

# 72. Map для DOM elements

Наприклад:

    const elements = new Map();

    elements.set("header", headerElement);
    elements.set("form", formElement);
    elements.set("button", buttonElement);

Отримання:

    const button = elements.get("button");

---

# 73. Map для event handlers

Можна зберігати зв'язок:

    element → handler

Наприклад:

    const handlers = new Map();

    const handler = () => {
        console.log("clicked");
    };

    handlers.set(button, handler);

Пізніше:

    button.removeEventListener(
        "click",
        handlers.get(button)
    );

---

# 74. Map з object keys у практиці

Наприклад:

    const user = {
        id: 1
    };

    const permissions = new Map();

    permissions.set(
        user,
        new Set(["read", "write"])
    );

Тепер:

    permissions.get(user).has("write");

Це демонструє комбінацію:

    Map
    +
    Set

---

# 75. Map + Set разом

Наприклад:

    const userPermissions = new Map();

    userPermissions.set(
        "admin",
        new Set([
            "read",
            "write",
            "delete"
        ])
    );

    userPermissions.set(
        "teacher",
        new Set([
            "read",
            "write"
        ])
    );

Перевірка:

    userPermissions
        .get("teacher")
        .has("delete");

Результат:

    false

---

# 76. Map + Array

`Map` часто зберігає масив як value:

    const groups = new Map();

    groups.set("admin", []);
    groups.set("user", []);

Потім:

    groups.get("admin").push(user);

Це хороший приклад:

    Map → group
    Array → elements

---

# 77. Set + Array

Можна використовувати `Set` для membership, а `Array` для порядку та операцій над даними.

Наприклад:

    const selectedIds = new Set([
        1,
        3,
        5
    ]);

    const users = [
        { id: 1, name: "A" },
        { id: 2, name: "B" },
        { id: 3, name: "C" }
    ];

    const selectedUsers = users.filter(
        user => selectedIds.has(user.id)
    );

---

# 78. Map не має `map()`

Це дуже важлива відмінність.

Для Array:

    const result = numbers.map(number => {
        return number * 2;
    });

Але:

    Map

не має методу:

    map()

Тому для перетворення можна використати:

    const result = new Map(
        [...map].map(([key, value]) => {
            return [
                key,
                value * 2
            ];
        })
    );

---

# 79. Set не має `map()` і `filter()`

`Set` не має таких Array methods:

    map()
    filter()
    reduce()

Для них можна спочатку перетворити `Set` на Array:

    const set = new Set([1, 2, 3]);

    const result = [...set]
        .map(value => value * 2);

Результат:

    [2, 4, 6]

---

# 80. Array → Map → Array

Це важливий практичний workflow:

    Array
      ↓
    Map
      ↓
    Array

Наприклад:

    const users = [
        { id: 1, name: "A" },
        { id: 2, name: "B" }
    ];

    const usersById = new Map(
        users.map(user => [user.id, user])
    );

    const updatedUsers = [
        ...usersById.values()
    ];

---

# 81. Set для швидкої дедуплікації

    const ids = [
        1,
        2,
        2,
        3,
        4,
        4,
        5
    ];

    const uniqueIds = [
        ...new Set(ids)
    ];

---

# 82. Set не замінює Array

Не потрібно використовувати `Set` просто тому, що він "сучасніший".

Array потрібен, коли важливі:

    порядок
    індекси
    map()
    filter()
    reduce()
    slice()
    sort()

Set потрібен, коли важливі:

    унікальність
    membership
    множинні операції

---

# 83. Map не замінює Object

Object часто краще, якщо ти описуєш одну сутність:

    const user = {
        id: 1,
        name: "Valeriy",
        email: "..."
    };

Map краще, якщо ти описуєш колекцію зв'язків:

    const usersById = new Map();

    usersById.set(1, user1);
    usersById.set(2, user2);

---

# 84. Порядок елементів

`Map` зберігає порядок вставки.

    const map = new Map();

    map.set("a", 1);
    map.set("b", 2);
    map.set("c", 3);

    for (const [key, value] of map) {
        console.log(key, value);
    }

Отримаємо:

    a 1
    b 2
    c 3

---

# 85. Set також зберігає порядок вставки

    const set = new Set();

    set.add("a");
    set.add("b");
    set.add("c");

    for (const value of set) {
        console.log(value);
    }

Результат:

    a
    b
    c

---

# 86. Що відбувається при повторному `Set.add()`

    const set = new Set();

    set.add("a");
    set.add("b");
    set.add("a");

Порядок:

    a
    b

Повторне `"a"` не створює новий елемент.

---

# 87. SameValueZero

`Map` і `Set` використовують алгоритм порівняння, близький до `SameValueZero`.

Це означає, зокрема:

    NaN

вважається рівним самому собі.

Наприклад:

    const set = new Set([
        NaN,
        NaN
    ]);

    console.log(set.size);

Результат:

    1

---

# 88. `0` та `-0`

Для `Map` і `Set`:

    0

та:

    -0

вважаються одним значенням.

Наприклад:

    const set = new Set();

    set.add(0);
    set.add(-0);

    console.log(set.size);

Результат:

    1

---

# 89. WeakMap

`WeakMap` — спеціальна колекція, де ключами можуть бути об'єкти.

Створення:

    const metadata = new WeakMap();

    const user = {};

    metadata.set(user, {
        lastLogin: Date.now()
    });

---

# 90. Відмінність Map від WeakMap

`Map`:

    const map = new Map();

    const user = {};

    map.set(user, "data");

`Map` утримує сильне посилання на ключ.

`WeakMap` призначений для випадків, коли потрібно зберігати дані, пов'язані з object, але не перешкоджати garbage collection цього object.

---

# 91. WeakMap — концепція

Наприклад:

    const metadata = new WeakMap();

    let element = {};

    metadata.set(element, {
        initialized: true
    });

Якщо:

    element = null;

і більше немає інших посилань на об'єкт, він може бути видалений garbage collector.

Це одна з причин існування `WeakMap`.

---

# 92. WeakMap має обмеженіший API

WeakMap має:

    set()
    get()
    has()
    delete()

Але не має:

    size
    clear()
    keys()
    values()
    entries()

Тому WeakMap не призначений для звичайної ітерації колекції.

---

# 93. WeakSet

`WeakSet` зберігає об'єкти та не перешкоджає їх garbage collection.

    const visited = new WeakSet();

    const object = {};

    visited.add(object);

    console.log(visited.has(object));

Результат:

    true

---

# 94. WeakSet API

Основні методи:

    add()
    has()
    delete()

Немає:

    size
    clear()
    keys()
    values()
    entries()

---

# 95. Коли потрібен WeakMap

WeakMap може бути корисним для:

- metadata об'єктів;
- приватних даних;
- caching, прив'язаного до object lifetime;
- зв'язку object → metadata;
- інтеграції з garbage collection.

---

# 96. Коли потрібен WeakSet

WeakSet може бути корисним для:

- позначення об'єктів;
- tracking visited objects;
- перевірки, чи об'єкт вже оброблявся.

Наприклад:

    const processed = new WeakSet();

    const process = (object) => {
        if (processed.has(object)) {
            return;
        }

        processed.add(object);

        // process object
    };

---

# 97. Map / Set / WeakMap / WeakSet

| Колекція | Зберігає | Ключі / значення | Ітерація |
|---|---|---|---|
| `Map` | key → value | будь-які значення | так |
| `Set` | values | будь-які значення | так |
| `WeakMap` | key → value | object keys | ні |
| `WeakSet` | values | objects | ні |

---

# 98. Map vs Set

Запам'ятай головну різницю:

    Map

це:

    key → value

А:

    Set

це:

    unique values

---

# 99. Практичний приклад: уникнення дублювання

Погано:

    const selectedIds = [];

    if (!selectedIds.includes(id)) {
        selectedIds.push(id);
    }

Можна:

    const selectedIds = new Set();

    selectedIds.add(id);

Повторне:

    selectedIds.add(id);

не створить дубль.

---

# 100. Практичний приклад: швидкий lookup

Array:

    const users = [
        { id: 1, name: "A" },
        { id: 2, name: "B" },
        { id: 3, name: "C" }
    ];

Пошук:

    const user = users.find(
        user => user.id === 3
    );

Для багатьох повторних lookup можна побудувати Map:

    const usersById = new Map(
        users.map(user => [user.id, user])
    );

Потім:

    const user = usersById.get(3);

---

# 101. Map для frequency counter

Наприклад:

    const letters = [
        "a",
        "b",
        "a",
        "c",
        "a",
        "b"
    ];

    const frequency = new Map();

    for (const letter of letters) {
        frequency.set(
            letter,
            (frequency.get(letter) ?? 0) + 1
        );
    }

Результат:

    a → 3
    b → 2
    c → 1

Цей патерн дуже важливий для алгоритмів.

---

# 102. Set для перевірки дублікатів

Наприклад:

    const values = [1, 2, 3, 2];

    const uniqueValues = new Set(values);

    const hasDuplicates =
        uniqueValues.size !== values.length;

Результат:

    true

---

# 103. Перевірка унікальності

Функція:

    const hasDuplicates = (array) => {
        return new Set(array).size !== array.length;
    };

Використання:

    hasDuplicates([1, 2, 3]);

Результат:

    false

    hasDuplicates([1, 2, 2, 3]);

Результат:

    true

---

# 104. Map для grouping

Наприклад:

    const students = [
        { name: "A", class: "5A" },
        { name: "B", class: "5B" },
        { name: "C", class: "5A" }
    ];

    const groups = new Map();

    for (const student of students) {
        const group = groups.get(student.class) ?? [];

        group.push(student);

        groups.set(student.class, group);
    }

Отримаємо:

    5A → [A, C]
    5B → [B]

---

# 105. Map для caching результатів

Наприклад:

    const cache = new Map();

    const square = (number) => {
        if (cache.has(number)) {
            return cache.get(number);
        }

        const result = number * number;

        cache.set(number, result);

        return result;
    };

Тепер повторні виклики можуть використовувати cache.

---

# 106. Map як lookup table

Наприклад:

    const handlers = new Map([
        ["add", addHandler],
        ["remove", removeHandler],
        ["update", updateHandler]
    ]);

Замість великої кількості:

    if
    else if
    else if

можна:

    const handler = handlers.get(action);

---

# 107. Map для state

Наприклад:

    const state = new Map();

    state.set("loading", false);
    state.set("error", null);
    state.set("users", []);

Це можливо, але для звичайного application state `Object`, класична структура state або спеціалізована state-management система часто буде зрозумілішою.

Головне — використовувати `Map`, коли його семантика справді підходить.

---

# 108. Map не серіалізується в JSON напряму

Наприклад:

    const map = new Map([
        ["name", "Valeriy"],
        ["age", 56]
    ]);

    JSON.stringify(map);

Результат:

    "{}"

Це важливий практичний момент.

---

# 109. Як серіалізувати Map

Можна перетворити його на entries:

    const map = new Map([
        ["name", "Valeriy"],
        ["age", 56]
    ]);

    const json = JSON.stringify(
        [...map]
    );

Результат концептуально:

    '[["name","Valeriy"],["age",56]]'

Відновлення:

    const restoredMap = new Map(
        JSON.parse(json)
    );

---

# 110. Set і JSON

Так само:

    const set = new Set([
        1,
        2,
        3
    ]);

    JSON.stringify(set);

дасть:

    "{}"

Тому потрібно перетворити:

    JSON.stringify([...set]);

Відновлення:

    const restoredSet = new Set(
        JSON.parse(json)
    );

---

# 111. Map / Set і structuredClone

Сучасний JavaScript підтримує structured cloning.

Наприклад:

    const original = new Map([
        ["a", 1],
        ["b", 2]
    ]);

    const copy = structuredClone(original);

Також підтримується:

    Set

Це відрізняється від простого:

    JSON.parse(JSON.stringify(...))

---

# 112. Map та пам'ять

Не потрібно думати:

> Map завжди швидший за Object.

Реальна продуктивність залежить від:

- engine;
- розміру даних;
- операцій;
- pattern використання;
- конкретної задачі.

Вибір `Map` повинен насамперед виходити з **семантики та зручності API**, а не з міфу про абсолютну швидкість.

---

# 113. Map та алгоритми

`Map` дуже часто використовується в алгоритмах:

    frequency counter
    lookup table
    caching
    grouping
    graph algorithms
    counting
    indexing

Наприклад:

    const counts = new Map();

---

# 114. Set та алгоритми

`Set` дуже часто використовується для:

    visited nodes
    duplicate detection
    membership testing
    unique values
    intersections
    unions
    differences

Наприклад:

    const visited = new Set();

---

# 115. Map у графах

Граф можна представити:

    const graph = new Map();

    graph.set("A", ["B", "C"]);
    graph.set("B", ["D"]);
    graph.set("C", ["D"]);
    graph.set("D", []);

Це:

    A → B, C
    B → D
    C → D
    D → none

---

# 116. Set у DFS/BFS

Наприклад:

    const visited = new Set();

    const visit = (node) => {
        if (visited.has(node)) {
            return;
        }

        visited.add(node);

        // continue traversal
    };

Це базовий патерн для обходу графів.

---

# 117. Комбінація Map + Set в алгоритмах

Наприклад:

    const graph = new Map([
        ["A", ["B", "C"]],
        ["B", ["D"]],
        ["C", ["D"]],
        ["D", []]
    ]);

    const visited = new Set();

Це дуже типова комбінація:

    Map
    ↓
    структура графа

    Set
    ↓
    visited nodes

---

# 118. Часті помилки

## 1. Використовувати `length`

Неправильно:

    map.length

    set.length

Правильно:

    map.size

    set.size

---

## 2. Очікувати `map()`

Немає:

    map.map(...)

Для перетворення:

    [...map].map(...)

---

## 3. Плутати `Map` з `Array`

`Map` не має:

    map[0]

Для отримання:

    map.get(key)

---

## 4. Плутати `Set` з Array

У `Set` немає індексів:

    set[0]

Для доступу потрібно використовувати ітерацію або перетворити:

    [...set]

---

## 5. Забувати про object identity

    map.set({}, "value");

    map.get({});

не поверне `"value"`.

Це два різні objects.

---

## 6. Використовувати Object, коли потрібна колекція

Якщо задача явно:

    key → value

і ключі можуть бути різних типів, `Map` часто є природнішим вибором.

---

## 7. Використовувати Set, коли потрібні індекси

Якщо потрібно:

    array[0]
    array[1]
    array[2]

то `Array` підходить краще.

---

## 8. Серіалізувати Map через JSON.stringify напряму

    JSON.stringify(new Map(...));

не збереже вміст Map.

Потрібне попереднє перетворення.

---

# Питання зі співбесіди

### 1. Що таке Map?

`Map` — колекція пар `key → value`, де ключами можуть бути значення різних типів, включаючи objects.

---

### 2. Чим Map відрізняється від Object?

`Map` є спеціалізованою key-value колекцією з API:

    set()
    get()
    has()
    delete()
    clear()
    size

Object частіше використовується як структура властивостей / record.

---

### 3. Що таке Set?

`Set` — колекція унікальних значень.

---

### 4. Як видалити дублікати з Array?

    const unique = [
        ...new Set(array)
    ];

---

### 5. Як отримати розмір Map?

    map.size

---

### 6. Як отримати розмір Set?

    set.size

---

### 7. Чи може Object бути ключем Map?

Так.

    const key = {};

    const map = new Map();

    map.set(key, "value");

---

### 8. Чому `map.get({})` може повернути `undefined`?

Тому що створюється новий object reference.

---

### 9. Чи зберігає Map порядок?

Так, ітерація відбувається в порядку вставки.

---

### 10. Чи зберігає Set порядок?

Так, ітерація відбувається в порядку вставки.

---

### 11. Чи має Map метод map()?

Ні.

Можна перетворити його на Array:

    [...map].map(...)

---

### 12. Чи має Set метод filter()?

Ні.

Можна:

    [...set].filter(...)

---

### 13. Що повертає `Map.get()` для відсутнього ключа?

    undefined

---

### 14. Що повертає `Map.delete()`?

    true

якщо елемент було видалено.

    false

якщо ключа не існувало.

---

### 15. Що повертає `Set.delete()`?

Також:

    true
    false

залежно від того, чи існував елемент.

---

### 16. Що таке WeakMap?

Колекція key-value, де ключами можуть бути objects і яка дозволяє garbage collector видаляти ключі, коли на них більше немає сильних посилань.

---

### 17. Чим WeakMap відрізняється від Map?

WeakMap:

- тільки object keys;
- не має `size`;
- не має звичайної ітерації;
- призначений для weak references.

---

### 18. Де використовують Set?

Наприклад:

    unique values
    visited nodes
    permissions
    selected IDs
    duplicate detection

---

### 19. Де використовують Map?

Наприклад:

    lookup tables
    caches
    counters
    grouping
    ID → object
    graph representation

---

### 20. Як створити Map з Object?

    const map = new Map(
        Object.entries(object)
    );

---

### 21. Як створити Object з Map?

    const object = Object.fromEntries(map);

---

### 22. Як перетворити Set в Array?

    const array = [...set];

---

### 23. Як перевірити, чи Array має дублікати?

    const hasDuplicates =
        new Set(array).size !== array.length;

---

### 24. Чому Set не зберігає два однакових primitive values?

Тому що `Set` зберігає унікальні значення.

---

### 25. Чи може Set містити objects?

Так.

Але два окремо створені objects з однаковими властивостями є різними references.

---

# Шлях вивчення

## Core

Потрібно знати:

- `Map`;
- `Set`;
- `new Map()`;
- `new Set()`;
- `set()`;
- `get()`;
- `has()`;
- `add()`;
- `delete()`;
- `clear()`;
- `size`;
- `for...of`;
- `keys()`;
- `values()`;
- `entries()`.

Мінімальний рівень:

    Map → key/value

    Set → unique values

---

## Junior

Потрібно вміти:

- вибирати між Array / Object / Map / Set;
- робити deduplication;
- будувати lookup Map;
- рахувати frequency;
- групувати дані;
- використовувати Set для membership;
- перетворювати Map / Set у Array;
- використовувати Map + Set у практичних задачах;
- розуміти object identity.

Приклади:

    [...new Set(array)]

    new Map(
        array.map(item => [item.id, item])
    )

---

## Middle

Потрібно розуміти:

- Map як index;
- Map як cache;
- Map як graph;
- Set як visited collection;
- grouping;
- intersections;
- unions;
- differences;
- WeakMap;
- WeakSet;
- garbage collection concepts;
- serialization;
- trade-offs між Object / Map;
- performance considerations.

---

## Senior

Потрібно розуміти:

- memory behavior;
- weak references;
- garbage collection;
- Map / Set internals на концептуальному рівні;
- data structure selection;
- алгоритмічні trade-offs;
- caching architecture;
- indexing;
- graph representations;
- collection design;
- memory-sensitive application architecture.

---

# Міні-шпаргалка

    // =========================
    // MAP
    // =========================

    const map = new Map();

    map.set("name", "Valeriy");
    map.set("age", 56);

    map.get("name");

    map.has("name");

    map.delete("age");

    map.clear();

    map.size;


    // =========================
    // MAP INITIALIZATION
    // =========================

    const users = new Map([
        [1, "Valeriy"],
        [2, "Anna"]
    ]);


    // =========================
    // MAP ITERATION
    // =========================

    for (const [key, value] of map) {
        console.log(key, value);
    }

    for (const key of map.keys()) {
        console.log(key);
    }

    for (const value of map.values()) {
        console.log(value);
    }


    // =========================
    // SET
    // =========================

    const set = new Set();

    set.add("red");
    set.add("green");

    set.has("red");

    set.delete("green");

    set.clear();

    set.size;


    // =========================
    // ARRAY → SET
    // =========================

    const unique = [
        ...new Set(array)
    ];


    // =========================
    // ARRAY → MAP
    // =========================

    const mapById = new Map(
        users.map(user => [user.id, user])
    );


    // =========================
    // MAP → ARRAY
    // =========================

    const entries = [...map];

    const keys = [...map.keys()];

    const values = [...map.values()];


    // =========================
    // MAP → OBJECT
    // =========================

    const object = Object.fromEntries(map);


    // =========================
    // OBJECT → MAP
    // =========================

    const map = new Map(
        Object.entries(object)
    );


    // =========================
    // COUNTING
    // =========================

    const counts = new Map();

    for (const value of values) {
        counts.set(
            value,
            (counts.get(value) ?? 0) + 1
        );
    }


    // =========================
    // GROUPING
    // =========================

    const groups = new Map();

    for (const item of items) {
        const group = groups.get(item.category) ?? [];

        group.push(item);

        groups.set(item.category, group);
    }


    // =========================
    // SET MEMBERSHIP
    // =========================

    const allowedRoles = new Set([
        "admin",
        "teacher",
        "editor"
    ]);

    allowedRoles.has(user.role);


    // =========================
    // SET INTERSECTION
    // =========================

    const intersection = new Set(
        [...a].filter(value => b.has(value))
    );


    // =========================
    // SET UNION
    // =========================

    const union = new Set([
        ...a,
        ...b
    ]);


    // =========================
    // SET DIFFERENCE
    // =========================

    const difference = new Set(
        [...a].filter(value => !b.has(value))
    );

---

# Головна ментальна модель

Думай про чотири колекції так:

    Array
      ↓
    ordered list
    index-based data


    Object
      ↓
    record / entity
    named properties


    Map
      ↓
    key → value
    lookup / index / cache / grouping


    Set
      ↓
    unique values
    membership / deduplication

---

# Простий вибір структури даних

Якщо запит:

> Мені потрібен список елементів.

Використовуй:

    Array

Якщо:

> Мені потрібна одна сутність з властивостями.

Використовуй:

    Object

Якщо:

> Мені потрібно пов'язати ключ із значенням.

Використовуй:

    Map

Якщо:

> Мені потрібна колекція унікальних значень.

Використовуй:

    Set

---

# Головне

1. **Map** — це `key → value`.

2. **Set** — це колекція унікальних значень.

3. Для `Map` основні методи:

       set()
       get()
       has()
       delete()
       clear()

4. Для `Set`:

       add()
       has()
       delete()
       clear()

5. Для кількості елементів:

       size

6. Не використовуй:

       length

   для `Map` і `Set`.

7. `Map` може мати object як ключ.

8. `Set` може містити objects.

9. Для objects важлива **reference identity**.

10. Найпростіший спосіб прибрати дублікати:

       [...new Set(array)]

11. Один із найважливіших патернів `Map`:

       new Map(
           array.map(item => [item.id, item])
       )

12. `Map` особливо корисний для:

       lookup
       counting
       grouping
       caching
       indexing
       graphs

13. `Set` особливо корисний для:

       uniqueness
       membership
       visited
       duplicate detection
       set operations

14. `Map` не має `map()`.

15. `Set` не має `map()` або `filter()`.

16. Для Array-подібної обробки:

       [...map]
       [...set]

17. `WeakMap` і `WeakSet` пов'язані з garbage collection та weak references.

18. Не вибирай `Map` або `Set` тільки тому, що вони "сучасніші".

19. Вибирай структуру даних відповідно до задачі:

       Array
       Object
       Map
       Set

20. Найважливіше:

> **Правильний вибір структури даних часто спрощує сам алгоритм.**

---

# Практичні вправи

## Вправа 1 — Унікальні числа

Є:

    const numbers = [
        1, 2, 2, 3, 4, 4, 5, 5, 5
    ];

Отримай:

    [1, 2, 3, 4, 5]

Використай `Set`.

---

## Вправа 2 — Перевірка дублікатів

Створи:

    const hasDuplicates = (array) => {
        // ...
    };

Функція повинна повертати:

    false

для:

    [1, 2, 3]

і:

    true

для:

    [1, 2, 3, 2]

---

## Вправа 3 — User Map

Є:

    const users = [
        { id: 1, name: "Valeriy" },
        { id: 2, name: "Anna" },
        { id: 3, name: "John" }
    ];

Створи:

    usersById

щоб можна було:

    usersById.get(2);

отримати:

    { id: 2, name: "Anna" }

---

## Вправа 4 — Frequency Counter

Є:

    const words = [
        "js",
        "react",
        "js",
        "node",
        "react",
        "js"
    ];

Створи `Map`:

    js → 3
    react → 2
    node → 1

---

## Вправа 5 — Allowed Roles

Створи:

    const allowedRoles = new Set([
        "admin",
        "teacher",
        "editor"
    ]);

Напиши перевірку:

    isAllowed("teacher") → true

    isAllowed("student") → false

---

## Вправа 6 — Grouping

Є:

    const users = [
        { name: "A", role: "admin" },
        { name: "B", role: "user" },
        { name: "C", role: "admin" },
        { name: "D", role: "user" }
    ];

Створи:

    Map

з результатом:

    admin → [A, C]
    user → [B, D]

---

## Вправа 7 — Intersection

Є:

    const a = new Set([1, 2, 3, 4]);
    const b = new Set([3, 4, 5, 6]);

Отримай:

    Set { 3, 4 }

---

## Вправа 8 — Graph

Створи граф:

    A → B, C
    B → D
    C → D
    D → none

використовуючи:

    Map

А для visited nodes:

    Set

Це вже хороша підготовка до теми алгоритмів.

---

# Наступний крок

Після `Map` та `Set` логічно перейти до наступних можливостей сучасного JavaScript:

    06-advanced-object-features

де варто розглянути сучасні можливості роботи з об'єктами:

    Object.keys()
    Object.values()
    Object.entries()
    Object.fromEntries()
    property descriptors
    getters
    setters
    computed properties
    object spread
    object rest
    optional chaining
    nullish coalescing

Особливо важливо побачити зв'язок:

    Object
       ↕
    Object.entries()
       ↕
    Map
       ↕
    Array

Це дає цілісне розуміння того, як у сучасному JavaScript переходити між різними структурами даних.