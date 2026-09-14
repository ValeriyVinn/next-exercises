# 05. includes() та indexOf()

`includes()` та `indexOf()` — методи масиву, які дозволяють перевірити, чи містить масив певне значення, або знайти позицію цього значення.

Вони особливо корисні, коли потрібно:

- перевірити наявність елемента в масиві;
- знайти index елемента;
- перевірити, чи є значення серед дозволених;
- перевірити наявність рядка;
- знайти перше входження значення;
- виконати умовну логіку на основі наявності елемента.

Основні методи:

    includes()
    indexOf()
    lastIndexOf()

Також `includes()` та `indexOf()` існують у `String`.

---

### Ключові поняття

✔ `includes()`  
✔ `indexOf()`  
✔ `lastIndexOf()`  
✔ search  
✔ membership test  
✔ index  
✔ zero-based index  
✔ first occurrence  
✔ last occurrence  
✔ `true` / `false`  
✔ `-1`  
✔ strict equality  
✔ `NaN`  
✔ `fromIndex`  
✔ case-sensitive  
✔ arrays  
✔ strings  
✔ primitive values  
✔ object references  

---

### Що потрібно пам'ятати

• `includes()` перевіряє, чи є значення в масиві.

• `includes()` повертає:

    true
    false

• `indexOf()` шукає значення та повертає його index.

• Якщо `indexOf()` не знаходить значення, він повертає:

    -1

• Index масиву починається з:

    0

• `includes()` зручний, коли потрібно лише знати:

    є значення чи немає?

• `indexOf()` зручний, коли потрібно знати:

    де знаходиться значення?

• Обидва методи використовують порівняння значень за strict equality-подібною логікою.

• Важливий виняток:

    includes(NaN)

  може знайти `NaN`.

• `indexOf(NaN)` повертає:

    -1

• Для рядків пошук є case-sensitive:

    "Hello".includes("hello")
    // false

• `includes()` не змінює масив.

• `indexOf()` не змінює масив.

• Для object значення порівнюються за reference, а не за структурою.

---

# includes()

`includes()` перевіряє, чи містить масив певне значення.

Синтаксис:

    array.includes(value)

Приклад:

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    console.log(fruits.includes("banana"));

Результат:

    true

---

### Значення відсутнє

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    console.log(fruits.includes("kiwi"));

Результат:

    false

---

# includes() → Boolean

Головна особливість `includes()`:

    includes()
        ↓
    true / false

Наприклад:

    const numbers = [10, 20, 30];

    const hasTwenty = numbers.includes(20);

    console.log(hasTwenty);

Результат:

    true

---

### Практичний шаблон

    if (numbers.includes(20)) {
        console.log("Number exists");
    }

Це читається як:

    "якщо масив містить 20"

---

# includes() та numbers

    const numbers = [10, 20, 30, 40];

    console.log(numbers.includes(30));
    // true

    console.log(numbers.includes(50));
    // false

---

# includes() та strings

`includes()` працює не тільки з числами.

    const roles = [
        "admin",
        "editor",
        "user"
    ];

    console.log(roles.includes("admin"));
    // true

    console.log(roles.includes("guest"));
    // false

---

# includes() та boolean

    const values = [
        true,
        false
    ];

    console.log(values.includes(true));
    // true

---

# includes() та null

    const values = [
        10,
        null,
        20
    ];

    console.log(values.includes(null));
    // true

---

# includes() та undefined

    const values = [
        10,
        undefined,
        20
    ];

    console.log(values.includes(undefined));
    // true

---

# includes() та NaN

Це важлива особливість.

    const numbers = [
        10,
        NaN,
        30
    ];

    console.log(numbers.includes(NaN));

Результат:

    true

`includes()` вміє знаходити `NaN`.

---

# indexOf()

`indexOf()` шукає значення в масиві та повертає index його першого входження.

Синтаксис:

    array.indexOf(value)

Приклад:

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    const index = fruits.indexOf("banana");

    console.log(index);

Результат:

    1

---

# Index

Масив:

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

Має index:

    apple  → 0
    banana → 1
    orange → 2

Тому:

    fruits.indexOf("apple");
    // 0

    fruits.indexOf("banana");
    // 1

    fruits.indexOf("orange");
    // 2

---

# indexOf() → -1

Якщо значення не знайдено:

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    console.log(
        fruits.indexOf("kiwi")
    );

Результат:

    -1

Це дуже важливо.

    indexOf(value) === -1

означає:

    value не знайдено

---

# Перевірка через indexOf()

Можна перевірити наявність значення:

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    if (fruits.indexOf("banana") !== -1) {
        console.log("Found");
    }

Результат:

    Found

Але для простої перевірки наявності сьогодні зазвичай краще:

    if (fruits.includes("banana")) {
        console.log("Found");
    }

---

# includes() vs indexOf()

Основна різниця:

    includes()
        ↓
    true / false

    indexOf()
        ↓
    index / -1

Наприклад:

    const numbers = [10, 20, 30];

    numbers.includes(20);
    // true

    numbers.indexOf(20);
    // 1

---

# Коли використовувати includes()

Якщо потрібно відповісти на питання:

    "Чи існує це значення?"

використовуй:

    includes()

Наприклад:

    const permissions = [
        "read",
        "write"
    ];

    if (permissions.includes("write")) {
        console.log("Allowed");
    }

---

# Коли використовувати indexOf()

Якщо потрібно знати:

    "На якому index знаходиться значення?"

використовуй:

    indexOf()

Наприклад:

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    const index = fruits.indexOf("orange");

    console.log(index);
    // 2

---

# First Occurrence

`indexOf()` повертає index першого входження.

Наприклад:

    const numbers = [
        10,
        20,
        30,
        20,
        40
    ];

    console.log(numbers.indexOf(20));

Результат:

    1

Хоча `20` зустрічається двічі:

    index 1
    index 3

`indexOf()` повертає перший:

    1

---

# lastIndexOf()

Якщо потрібно знайти останнє входження, можна використати:

    lastIndexOf()

Приклад:

    const numbers = [
        10,
        20,
        30,
        20,
        40
    ];

    console.log(numbers.lastIndexOf(20));

Результат:

    3

Отже:

    indexOf()
        → first occurrence

    lastIndexOf()
        → last occurrence

---

# indexOf() vs lastIndexOf()

    const numbers = [
        10,
        20,
        30,
        20,
        40
    ];

    numbers.indexOf(20);
    // 1

    numbers.lastIndexOf(20);
    // 3

---

# fromIndex

`includes()` та `indexOf()` можуть отримувати другий аргумент — `fromIndex`.

Він визначає, з якого index починати пошук.

Синтаксис:

    array.includes(value, fromIndex)

    array.indexOf(value, fromIndex)

---

### includes() з fromIndex

    const numbers = [
        10,
        20,
        30,
        20
    ];

    console.log(
        numbers.includes(20, 2)
    );

Результат:

    true

Пошук починається з index:

    2

Масив:

    0   1   2   3
    10  20  30  20
            ↑       ↑
            start

З index `2` вперед є ще одне `20`.

---

### indexOf() з fromIndex

    const numbers = [
        10,
        20,
        30,
        20
    ];

    console.log(
        numbers.indexOf(20, 2)
    );

Результат:

    3

Перше `20` знаходиться на index `1`, але пошук починається з `2`.

Тому знаходиться наступне:

    index 3

---

# Negative fromIndex

`fromIndex` може бути від'ємним.

Наприклад:

    const numbers = [
        10,
        20,
        30,
        40
    ];

    console.log(
        numbers.includes(40, -1)
    );

Результат:

    true

Від'ємний index рахується від кінця масиву.

---

# includes() та String

`includes()` також є методом `String`.

Синтаксис:

    string.includes(searchString)

Приклад:

    const message = "Hello JavaScript";

    console.log(
        message.includes("JavaScript")
    );

Результат:

    true

---

### String — значення відсутнє

    const message = "Hello JavaScript";

    console.log(
        message.includes("Python")
    );

Результат:

    false

---

# String та case-sensitive search

Пошук у string є case-sensitive.

    const message = "Hello";

    console.log(
        message.includes("Hello")
    );
    // true

    console.log(
        message.includes("hello")
    );
    // false

Регістр має значення.

---

# String indexOf()

`String` також має `indexOf()`.

    const message = "Hello JavaScript";

    console.log(
        message.indexOf("JavaScript")
    );

Результат:

    6

---

### Якщо string не знайдено

    const message = "Hello JavaScript";

    console.log(
        message.indexOf("Python")
    );

Результат:

    -1

---

# String lastIndexOf()

    const message = "JavaScript JavaScript";

    console.log(
        message.lastIndexOf("JavaScript")
    );

Результат буде index останнього входження.

---

# includes() у масиві та string

Однакова загальна ідея:

    Array
        ↓
    includes(value)

    String
        ↓
    includes(searchString)

Наприклад:

    const fruits = [
        "apple",
        "banana"
    ];

    fruits.includes("banana");
    // true

    const text = "Hello JavaScript";

    text.includes("JavaScript");
    // true

---

# Strict Comparison

Під час пошуку важливий тип значення.

Наприклад:

    const numbers = [1, 2, 3];

    numbers.includes(2);
    // true

Але:

    numbers.includes("2");
    // false

Тому що:

    2 !== "2"

---

# Number vs String

    const values = [
        1,
        2,
        3
    ];

    console.log(values.includes(2));
    // true

    console.log(values.includes("2"));
    // false

Тип має значення.

---

# Boolean vs String

    const values = [true, false];

    values.includes(true);
    // true

    values.includes("true");
    // false

---

# Object References

З object є важлива особливість.

Наприклад:

    const user = {
        id: 1,
        name: "John"
    };

    const users = [user];

    console.log(users.includes(user));

Результат:

    true

Тому що це той самий object reference.

---

### Два однакові object

    const users = [
        {
            id: 1,
            name: "John"
        }
    ];

    console.log(
        users.includes({
            id: 1,
            name: "John"
        })
    );

Результат:

    false

Об'єкти мають різні references.

Навіть якщо їхні властивості однакові:

    { id: 1, name: "John" }
    { id: 1, name: "John" }

це два різні object references.

---

# Reference Comparison

Наприклад:

    const user = {
        id: 1
    };

    const users = [user];

    console.log(users.includes(user));
    // true

А:

    console.log(
        users.includes({ id: 1 })
    );
    // false

Головне:

    object
        ↓
    reference comparison

а не:

    object
        ↓
    structural comparison

---

# NaN

`NaN` має особливу поведінку.

    const values = [1, NaN, 3];

    values.includes(NaN);
    // true

А:

    values.indexOf(NaN);
    // -1

Це одна з важливих відмінностей між `includes()` та `indexOf()`.

---

# includes() та NaN

`includes()` використовує алгоритм порівняння, який дозволяє вважати:

    NaN === NaN

для цілей пошуку через `includes()`.

Наприклад:

    [NaN].includes(NaN);
    // true

---

# indexOf() та NaN

`indexOf()` не знаходить `NaN`.

    [NaN].indexOf(NaN);
    // -1

Тому для перевірки наявності `NaN` краще:

    includes()

---

# Sparse Arrays

Масив може містити пропущені позиції.

Наприклад:

    const numbers = [1, , 3];

`includes()` може враховувати пропущену позицію як `undefined` під час пошуку.

Наприклад:

    numbers.includes(undefined);

може повернути:

    true

Це edge case, який не часто потрібен у повсякденному коді.

Для Core достатньо знати, що sparse arrays можуть мати особливості поведінки.

---

# Не змінюють масив

Ні `includes()`, ні `indexOf()` не змінюють original array.

Наприклад:

    const numbers = [10, 20, 30];

    numbers.includes(20);

    console.log(numbers);

Масив залишається:

    [10, 20, 30]

Так само:

    numbers.indexOf(20);

не змінює його.

---

# includes() у condition

Один із найпоширеніших випадків використання:

    const allowedRoles = [
        "admin",
        "editor"
    ];

    const role = "admin";

    if (allowedRoles.includes(role)) {
        console.log("Access allowed");
    }

---

# Заборонені значення

Можна перевіряти список заборонених значень:

    const forbiddenWords = [
        "spam",
        "scam",
        "hack"
    ];

    const word = "spam";

    if (forbiddenWords.includes(word)) {
        console.log("Forbidden");
    }

---

# Перевірка статусу

    const validStatuses = [
        "pending",
        "active",
        "completed"
    ];

    const status = "active";

    if (validStatuses.includes(status)) {
        console.log("Valid status");
    }

---

# Перевірка permission

    const permissions = [
        "read",
        "write",
        "delete"
    ];

    if (permissions.includes("delete")) {
        console.log("User can delete");
    }

---

# Перевірка extension

    const allowedExtensions = [
        ".jpg",
        ".png",
        ".webp"
    ];

    const extension = ".png";

    if (allowedExtensions.includes(extension)) {
        console.log("Allowed");
    }

---

# Перевірка значень форми

Наприклад:

    const allowedCountries = [
        "Ukraine",
        "Poland",
        "Germany"
    ];

    const country = "Ukraine";

    if (allowedCountries.includes(country)) {
        console.log("Country is supported");
    }

---

# includes() vs OR

Іноді замість:

    if (
        role === "admin" ||
        role === "editor" ||
        role === "manager"
    ) {
        ...
    }

можна написати:

    const allowedRoles = [
        "admin",
        "editor",
        "manager"
    ];

    if (allowedRoles.includes(role)) {
        ...
    }

Другий варіант часто легше масштабувати та читати.

---

# indexOf() для пошуку позиції

Наприклад, потрібно знати позицію товару:

    const products = [
        "phone",
        "laptop",
        "tablet"
    ];

    const index = products.indexOf("laptop");

    console.log(index);
    // 1

---

# indexOf() для перевірки

Старий поширений pattern:

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    if (fruits.indexOf("banana") !== -1) {
        console.log("Exists");
    }

Це працює.

Але якщо index не потрібен, краще:

    if (fruits.includes("banana")) {
        console.log("Exists");
    }

---

# Важлива помилка з indexOf()

Не варто перевіряти так:

    if (numbers.indexOf(value)) {
        ...
    }

Чому?

Тому що index може бути:

    0

А:

    Boolean(0)
    // false

Наприклад:

    const numbers = [10, 20, 30];

    if (numbers.indexOf(10)) {
        console.log("Found");
    }

`10` знаходиться на index `0`, тому умова буде `false`.

---

### Правильно

Потрібно перевіряти:

    if (numbers.indexOf(10) !== -1) {
        console.log("Found");
    }

Або ще краще для простої перевірки:

    if (numbers.includes(10)) {
        console.log("Found");
    }

---

# indexOf() та 0

Це дуже важливий interview point.

    const fruits = [
        "apple",
        "banana"
    ];

    const index = fruits.indexOf("apple");

    console.log(index);
    // 0

`0` — валідний index.

Але:

    Boolean(0)
    // false

Тому не можна просто писати:

    if (index) {
        ...
    }

---

# Correct Pattern

    const index = fruits.indexOf("apple");

    if (index !== -1) {
        console.log("Found");
    }

---

# includes() — простіше для membership

Якщо задача:

    "Чи є елемент?"

використовуй:

    includes()

Наприклад:

    const users = [
        "John",
        "Anna",
        "Mike"
    ];

    if (users.includes("Anna")) {
        console.log("User exists");
    }

---

# indexOf() — якщо потрібен index

    const users = [
        "John",
        "Anna",
        "Mike"
    ];

    const index = users.indexOf("Anna");

    console.log(index);
    // 1

---

# lastIndexOf()

`lastIndexOf()` шукає останнє входження.

Синтаксис:

    array.lastIndexOf(value)

Приклад:

    const numbers = [
        10,
        20,
        30,
        20
    ];

    console.log(
        numbers.lastIndexOf(20)
    );

Результат:

    3

---

# lastIndexOf() та відсутнє значення

    const numbers = [10, 20, 30];

    console.log(
        numbers.lastIndexOf(50)
    );

Результат:

    -1

Так само як `indexOf()`.

---

# fromIndex та lastIndexOf()

`lastIndexOf()` також може отримувати другий аргумент.

    array.lastIndexOf(value, fromIndex)

Він визначає позицію, з якої починається зворотний пошук.

Наприклад:

    const numbers = [
        10,
        20,
        30,
        20,
        40
    ];

    console.log(
        numbers.lastIndexOf(20, 2)
    );

Результат:

    1

Пошук іде назад від index `2`.

---

# includes() з від'ємним fromIndex

    const numbers = [
        10,
        20,
        30,
        40
    ];

    numbers.includes(30, -2);
    // true

`-2` означає початок пошуку приблизно з:

    length - 2

тобто:

    4 - 2 = 2

---

# indexOf() з від'ємним fromIndex

    const numbers = [
        10,
        20,
        30,
        40
    ];

    numbers.indexOf(30, -2);
    // 2

Пошук починається з відповідної позиції, обчисленої від кінця.

---

# Search Range

За допомогою `fromIndex` можна обмежити область пошуку.

Наприклад:

    const numbers = [
        10,
        20,
        30,
        20,
        40
    ];

    numbers.indexOf(20, 2);
    // 3

Пошук:

    index 0 → не перевіряється
    index 1 → не перевіряється
    index 2 → 30
    index 3 → 20 → found

---

# includes() та chaining

`includes()` повертає Boolean, тому його зручно використовувати в умовах.

Наприклад:

    const tags = [
        "javascript",
        "react",
        "frontend"
    ];

    if (tags.includes("react")) {
        console.log("React developer");
    }

---

# includes() після filter/map

`includes()` може бути частиною method chain.

Наприклад:

    const users = [
        { name: "John", role: "admin" },
        { name: "Anna", role: "user" },
        { name: "Mike", role: "editor" }
    ];

    const roles = users.map(user => user.role);

    console.log(
        roles.includes("admin")
    );

Результат:

    true

Це приклад поєднання:

    map()
        ↓
    includes()

---

# includes() vs some()

Обидва можуть використовуватися для перевірки наявності, але вони вирішують різні задачі.

`includes()`:

    → шукає конкретне значення

`some()`:

    → перевіряє умову для елементів

Наприклад:

    const numbers = [10, 20, 30];

    numbers.includes(20);
    // true

А:

    numbers.some(number => number > 25);
    // true

`some()` буде детально розглядатися в іншій темі.

---

# includes() vs find()

`includes()`:

    → true / false

`find()`:

    → сам знайдений element

Наприклад:

    const numbers = [10, 20, 30];

    numbers.includes(20);
    // true

    numbers.find(number => number === 20);
    // 20

Для простого membership test:

    includes()

Для пошуку елемента за умовою:

    find()

---

# includes() vs indexOf()

### includes()

    const numbers = [10, 20, 30];

    numbers.includes(20);
    // true

Відповідає:

    "Чи є 20?"

---

### indexOf()

    const numbers = [10, 20, 30];

    numbers.indexOf(20);
    // 1

Відповідає:

    "Де знаходиться 20?"

---

# Практичні шаблони

## Перевірити наявність

    if (array.includes(value)) {
        // value exists
    }

---

## Перевірити відсутність

    if (!array.includes(value)) {
        // value does not exist
    }

---

## Знайти index

    const index = array.indexOf(value);

---

## Перевірити через indexOf

    if (array.indexOf(value) !== -1) {
        // value exists
    }

---

## Знайти останній index

    const index = array.lastIndexOf(value);

---

## Перевірити останнє входження

    if (array.lastIndexOf(value) !== -1) {
        // value exists
    }

---

# Practical Examples

### Приклад 1 — перевірка числа

    const numbers = [10, 20, 30];

    if (numbers.includes(20)) {
        console.log("20 exists");
    }

---

### Приклад 2 — число відсутнє

    const numbers = [10, 20, 30];

    if (!numbers.includes(50)) {
        console.log("50 does not exist");
    }

---

### Приклад 3 — пошук index

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    const index = fruits.indexOf("banana");

    console.log(index);
    // 1

---

### Приклад 4 — елемент не знайдено

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    const index = fruits.indexOf("kiwi");

    console.log(index);
    // -1

---

### Приклад 5 — перше входження

    const numbers = [
        10,
        20,
        30,
        20
    ];

    console.log(numbers.indexOf(20));
    // 1

---

### Приклад 6 — останнє входження

    const numbers = [
        10,
        20,
        30,
        20
    ];

    console.log(numbers.lastIndexOf(20));
    // 3

---

### Приклад 7 — allowed roles

    const allowedRoles = [
        "admin",
        "editor"
    ];

    const role = "admin";

    if (allowedRoles.includes(role)) {
        console.log("Access allowed");
    }

---

### Приклад 8 — forbidden values

    const forbidden = [
        "spam",
        "scam"
    ];

    const value = "spam";

    if (forbidden.includes(value)) {
        console.log("Forbidden");
    }

---

### Приклад 9 — permissions

    const permissions = [
        "read",
        "write",
        "delete"
    ];

    const permission = "write";

    if (permissions.includes(permission)) {
        console.log("Permission granted");
    }

---

### Приклад 10 — string

    const message = "Hello JavaScript";

    if (message.includes("JavaScript")) {
        console.log("Found");
    }

---

### Приклад 11 — string index

    const message = "Hello JavaScript";

    const index = message.indexOf("JavaScript");

    console.log(index);
    // 6

---

### Приклад 12 — NaN

    const values = [
        1,
        NaN,
        3
    ];

    console.log(values.includes(NaN));
    // true

    console.log(values.indexOf(NaN));
    // -1

---

### Приклад 13 — object reference

    const user = {
        id: 1
    };

    const users = [user];

    console.log(users.includes(user));
    // true

---

### Приклад 14 — різні references

    const users = [
        {
            id: 1
        }
    ];

    console.log(
        users.includes({
            id: 1
        })
    );

    // false

---

### Приклад 15 — index 0

    const fruits = [
        "apple",
        "banana"
    ];

    const index = fruits.indexOf("apple");

    console.log(index);
    // 0

    if (index !== -1) {
        console.log("Found");
    }

---

# Типові помилки

❌ Перевіряти `indexOf()` як Boolean.

Неправильно:

    if (array.indexOf(value)) {
        ...
    }

Проблема:

    index === 0

є валідним результатом, але:

    Boolean(0)
    // false

Правильно:

    if (array.indexOf(value) !== -1) {
        ...
    }

Або:

    if (array.includes(value)) {
        ...
    }

---

❌ Плутати `includes()` та `indexOf()`.

    includes()
        → true / false

    indexOf()
        → index / -1

---

❌ Очікувати, що `indexOf()` поверне `null`, якщо значення не знайдено.

Насправді:

    indexOf()
        → -1

---

❌ Плутати index та value.

    const numbers = [10, 20, 30];

    numbers.indexOf(20);
    // 1

`1` — це index, а не саме значення.

---

❌ Очікувати, що `includes()` поверне index.

    numbers.includes(20);
    // true

Не:

    1

---

❌ Порівнювати number та string.

    const numbers = [1, 2, 3];

    numbers.includes("2");
    // false

Тому що:

    2 !== "2"

---

❌ Очікувати structural comparison для object.

    const users = [
        { id: 1 }
    ];

    users.includes({ id: 1 });
    // false

---

❌ Забувати про case sensitivity у string.

    "JavaScript".includes("javascript");
    // false

---

❌ Використовувати `indexOf()` для простої перевірки наявності, коли `includes()` робить код зрозумілішим.

Замість:

    if (array.indexOf(value) !== -1) {
        ...
    }

часто краще:

    if (array.includes(value)) {
        ...
    }

---

# Порівняння методів

| Метод | Результат | Основна задача |
|---|---|---|
| `includes()` | `true` / `false` | перевірити наявність |
| `indexOf()` | index / `-1` | знайти перше входження |
| `lastIndexOf()` | index / `-1` | знайти останнє входження |
| `some()` | `true` / `false` | перевірити умову |
| `find()` | element / `undefined` | знайти елемент |
| `findIndex()` | index / `-1` | знайти index за умовою |

---

# includes() vs indexOf() vs find()

Наприклад:

    const users = [
        { id: 1, name: "John" },
        { id: 2, name: "Anna" }
    ];

Якщо потрібно перевірити конкретне primitive value:

    ids.includes(2);

Якщо потрібно знайти exact value:

    ids.indexOf(2);

Якщо потрібно знайти object за умовою:

    users.find(user => user.id === 2);

Це різні задачі.

---

# Алгоритм вибору

Постав собі питання:

    Мені потрібно просто знати,
    чи існує значення?

Якщо так:

    includes()

---

    Мені потрібен index
    exact value?

Якщо так:

    indexOf()

---

    Мені потрібен останній index?

Якщо так:

    lastIndexOf()

---

    Мені потрібно знайти element
    за умовою?

Якщо так:

    find()

---

    Мені потрібно перевірити
    умову для хоча б одного element?

Якщо так:

    some()

---

# Complexity

Для звичайного масиву:

    includes()
    indexOf()
    lastIndexOf()

у найгіршому випадку проходять елементи послідовно.

Типова time complexity:

    O(n)

Наприклад:

    [10, 20, 30, 40, 50]

Якщо шукаємо:

    50

може знадобитися перевірити всі елементи.

---

### Найкращий випадок

Якщо потрібне значення знаходиться на початку:

    [10, 20, 30, 40, 50]

і шукаємо:

    10

пошук завершується дуже швидко.

Але загальна worst-case complexity залишається:

    O(n)

---

# Array vs Set

Якщо потрібно дуже часто перевіряти membership у великій колекції, іноді краще використовувати `Set`.

Array:

    const roles = [
        "admin",
        "editor",
        "user"
    ];

    roles.includes("admin");

Set:

    const roles = new Set([
        "admin",
        "editor",
        "user"
    ]);

    roles.has("admin");

Для `Set` метод перевірки називається:

    has()

Це вже інша структура даних, але важливо знати концептуальну різницю:

    Array
        → includes()

    Set
        → has()

---

# includes() та immutability

`includes()` не мутує масив.

Наприклад:

    const numbers = [10, 20, 30];

    const result = numbers.includes(20);

    console.log(result);
    // true

    console.log(numbers);
    // [10, 20, 30]

---

# indexOf() та immutability

Так само:

    const numbers = [10, 20, 30];

    const index = numbers.indexOf(20);

    console.log(index);
    // 1

    console.log(numbers);
    // [10, 20, 30]

---

# Практичний pattern — validation

Наприклад, перевірка статусу:

    const validStatuses = [
        "pending",
        "approved",
        "rejected"
    ];

    const status = "approved";

    const isValid = validStatuses.includes(status);

    console.log(isValid);
    // true

---

# Практичний pattern — permissions

    const permissions = [
        "read",
        "write"
    ];

    const requiredPermission = "write";

    if (permissions.includes(requiredPermission)) {
        console.log("Allowed");
    } else {
        console.log("Denied");
    }

---

# Практичний pattern — category

    const categories = [
        "books",
        "electronics",
        "clothing"
    ];

    const category = "electronics";

    if (categories.includes(category)) {
        console.log("Valid category");
    }

---

# Практичний pattern — search index

    const menuItems = [
        "Home",
        "Products",
        "About",
        "Contact"
    ];

    const index = menuItems.indexOf("Products");

    console.log(index);
    // 1

---

# Практичний pattern — remove by index

`indexOf()` часто використовується разом з іншими array methods.

Наприклад:

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    const index = fruits.indexOf("banana");

    if (index !== -1) {
        fruits.splice(index, 1);
    }

Після цього:

    [
        "apple",
        "orange"
    ]

Тут:

    indexOf()
        ↓
    знаходимо position

    splice()
        ↓
    змінюємо array

`splice()` буде розглядатися окремо.

---

# Практичний pattern — toggle value

Наприклад, додати або видалити tag:

    const tags = [
        "javascript",
        "react"
    ];

    const tag = "react";

    const index = tags.indexOf(tag);

    if (index === -1) {
        tags.push(tag);
    } else {
        tags.splice(index, 1);
    }

Логіка:

    не існує
        ↓
    додати

    існує
        ↓
    видалити

---

# Practical Full Example

    const allowedRoles = [
        "admin",
        "editor",
        "moderator"
    ];

    const userRole = "editor";

    if (allowedRoles.includes(userRole)) {
        console.log("Access allowed");
    } else {
        console.log("Access denied");
    }

---

# Ще один Full Example

    const products = [
        "phone",
        "laptop",
        "tablet",
        "monitor"
    ];

    const product = "tablet";

    const index = products.indexOf(product);

    if (index !== -1) {
        console.log(
            `Product found at index ${index}`
        );
    } else {
        console.log("Product not found");
    }

Результат:

    Product found at index 2

---

# Міні-шпаргалка

## includes()

    array.includes(value)

Повертає:

    true
    false

Використовуй, коли потрібно:

    "Чи існує значення?"

---

## indexOf()

    array.indexOf(value)

Повертає:

    index
    -1

Використовуй, коли потрібно:

    "Де знаходиться значення?"

---

## lastIndexOf()

    array.lastIndexOf(value)

Повертає:

    last index
    -1

Використовуй, коли потрібно:

    "Де знаходиться останнє входження?"

---

## fromIndex

    array.includes(value, fromIndex)

    array.indexOf(value, fromIndex)

Пошук починається з указаного index.

---

## String

    string.includes(searchString)

    string.indexOf(searchString)

    string.lastIndexOf(searchString)

---

## Не знайдено

Для `indexOf()`:

    -1

Для `lastIndexOf()`:

    -1

Для `includes()`:

    false

---

## NaN

    [NaN].includes(NaN);
    // true

    [NaN].indexOf(NaN);
    // -1

---

## Object

    const user = {
        id: 1
    };

    const users = [user];

    users.includes(user);
    // true

А:

    users.includes({ id: 1 });
    // false

Різні object references.

---

## Важлива помилка

Не:

    if (array.indexOf(value)) {
        ...
    }

Правильно:

    if (array.indexOf(value) !== -1) {
        ...
    }

Або:

    if (array.includes(value)) {
        ...
    }

---

# Основні правила

    includes()
        → membership test

    indexOf()
        → first index

    lastIndexOf()
        → last index

    includes()
        → true / false

    indexOf()
        → index / -1

    lastIndexOf()
        → index / -1

---

# Питання зі співбесіди

Що робить `includes()`?

Що повертає `includes()`?

Що робить `indexOf()`?

Що повертає `indexOf()`?

Що означає `-1` у `indexOf()`?

Яка різниця між `includes()` та `indexOf()`?

Коли краще використовувати `includes()`?

Коли краще використовувати `indexOf()`?

Що робить `lastIndexOf()`?

Чим `indexOf()` відрізняється від `lastIndexOf()`?

Що таке `fromIndex`?

Чи змінює `includes()` масив?

Чи змінює `indexOf()` масив?

Що поверне:

    [1, 2, 3].includes(2)

Що поверне:

    [1, 2, 3].indexOf(2)

Що поверне:

    [1, 2, 3].indexOf(5)

Чому небезпечно писати:

    if (array.indexOf(value))?

Що поверне:

    [10, 20, 30].indexOf(10)

Чому `0` є проблемним у Boolean context?

Як `includes()` працює з `NaN`?

Чим поведінка `indexOf(NaN)` відрізняється від `includes(NaN)`?

Як `includes()` працює з objects?

Чому:

    [{ id: 1 }].includes({ id: 1 })

повертає `false`?

Чи є `includes()` у `String`?

Чи є `indexOf()` у `String`?

Чи є пошук у String case-sensitive?

Чим `includes()` відрізняється від `some()`?

Чим `includes()` відрізняється від `find()`?

Яка типова time complexity `includes()` для масиву?

Яка типова time complexity `indexOf()`?

Коли для membership test краще використати `Set`?

---

# Шлях

🟢 Core (обов'язково знати)

Що робить `includes()`.

Що робить `indexOf()`.

Що робить `lastIndexOf()`.

`true` / `false`.

`index` / `-1`.

Zero-based index.

Перевірка наявності елемента.

Пошук index.

Перше входження.

Останнє входження.

`includes()` з array.

`includes()` з string.

`indexOf()` з array.

`indexOf()` з string.

Case-sensitive search.

Primitive values.

Різниця:

    includes()
    indexOf()

---

🔵 Junior

`fromIndex`.

Negative `fromIndex`.

`NaN`.

Object references.

Розуміння:

    index === 0

як валідного результату.

Розуміння проблеми:

    if (array.indexOf(value))

Практичне використання:

    includes()
    indexOf()
    lastIndexOf()

Використання `includes()` для validation.

Використання `includes()` для permissions.

Використання `indexOf()` для пошуку position.

Комбінація:

    indexOf()
    splice()

Порівняння:

    includes()
    some()
    find()
    findIndex()

Основи time complexity:

    O(n)

---

🟠 Middle

Глибше розуміння алгоритмів порівняння.

SameValueZero та `includes()`.

Strict equality та `indexOf()`.

Edge cases з:

    NaN
    undefined
    null
    sparse arrays

Object references.

Вибір між:

    Array.includes()
    Array.indexOf()
    Array.some()
    Array.find()
    Array.findIndex()
    Set.has()

Розуміння trade-offs між Array та Set.

Оптимізація великої кількості membership checks.

Розуміння:

    O(n)

для array search.

Розуміння впливу раннього завершення пошуку.

---

🔴 Senior

Глибоке розуміння ECMAScript comparison algorithms.

SameValueZero.

Strict Equality Comparison.

Abstract Equality Comparison.

Поведение `NaN`.

Sparse arrays та specification semantics.

Array exotic objects.

Generic behavior array methods.

Prototype chain considerations.

Performance characteristics JavaScript engines.

Array vs Set vs Map.

Hash-based membership.

Memory/time trade-offs.

Data structure selection.

Algorithmic complexity.

Optimization великих наборів даних.

Розуміння, коли membership test потрібно переносити з:

    Array
        ↓
    Set

---

# Головне:

• `includes()` перевіряє наявність значення.

• `includes()` повертає:

    true / false

• `indexOf()` повертає index першого входження.

• `indexOf()` повертає:

    index / -1

• `lastIndexOf()` шукає останнє входження.

• `lastIndexOf()` повертає:

    index / -1

• Якщо потрібно просто перевірити існування значення:

    includes()

• Якщо потрібно отримати position:

    indexOf()

• Не можна безпосередньо використовувати:

    if (array.indexOf(value))

  тому що index `0` є falsy.

• Правильно:

    if (array.indexOf(value) !== -1) {
        ...
    }

• А для простої перевірки краще:

    if (array.includes(value)) {
        ...
    }

• `includes()` знаходить `NaN`:

    [NaN].includes(NaN);
    // true

• `indexOf()` не знаходить `NaN`:

    [NaN].indexOf(NaN);
    // -1

• Для objects порівнюються references, а не структура об'єкта.

• Пошук у String є case-sensitive.

• `includes()` та `indexOf()` не мутують масив.

• `fromIndex` дозволяє почати пошук з певної позиції.

• Типова складність пошуку в масиві:

    O(n)

• Для великої кількості membership checks може бути доречнішим:

    Set

  з методом:

    has()

---

# Швидке порівняння

    includes()
        → "Чи є?"

    indexOf()
        → "Де перше?"

    lastIndexOf()
        → "Де останнє?"

    some()
        → "Чи є хоча б один,
           який відповідає умові?"

    find()
        → "Який перший element
           відповідає умові?"

    findIndex()
        → "Який index першого element,
           що відповідає умові?"

---

# Фінальна модель

    ARRAY
      │
      ├── includes(value)
      │       ↓
      │   true / false
      │
      ├── indexOf(value)
      │       ↓
      │   first index / -1
      │
      └── lastIndexOf(value)
              ↓
          last index / -1


    STRING
      │
      ├── includes(text)
      │       ↓
      │   true / false
      │
      ├── indexOf(text)
      │       ↓
      │   first index / -1
      │
      └── lastIndexOf(text)
              ↓
          last index / -1

---

# Запам'ятати в першу чергу

    includes()
        → true / false

    indexOf()
        → index / -1

    lastIndexOf()
        → last index / -1

    includes()
        → "чи є?"

    indexOf()
        → "де?"

    lastIndexOf()
        → "де останній?"

    indexOf() === -1
        → not found

    indexOf() === 0
        → found at first position

    [NaN].includes(NaN)
        → true

    [NaN].indexOf(NaN)
        → -1

    object comparison
        → reference

    array search
        → O(n)