# 06. sort() та reverse()

`sort()` та `reverse()` — методи масиву, які використовуються для зміни порядку елементів.

Основні задачі:

- сортувати елементи масиву;
- сортувати числа;
- сортувати рядки;
- сортувати об'єкти за властивістю;
- сортувати за зростанням;
- сортувати за спаданням;
- змінювати порядок елементів на протилежний;
- створювати копію перед сортуванням, якщо потрібно зберегти original array.

Основні методи:

    sort()
    reverse()

Також важливо знати сучасний immutable-підхід:

    toSorted()
    toReversed()

---

### Ключові поняття

✔ `sort()`  
✔ `reverse()`  
✔ `toSorted()`  
✔ `toReversed()`  
✔ sorting  
✔ ascending order  
✔ descending order  
✔ lexicographic order  
✔ compare function  
✔ comparator  
✔ mutation  
✔ immutability  
✔ numeric sorting  
✔ string sorting  
✔ object sorting  
✔ stable sort  
✔ index  
✔ array order  
✔ in-place operation  
✔ shallow copy  

---

### Що потрібно пам'ятати

• `sort()` сортує елементи масиву.

• `sort()` за замовчуванням сортує елементи як strings.

• Тому:

    [10, 2, 30].sort()

  дає не числовий порядок:

    [10, 2, 30]

  а lexicographic order.

• Для чисел потрібно використовувати compare function:

    numbers.sort((a, b) => a - b);

• Для сортування за спаданням:

    numbers.sort((a, b) => b - a);

• `sort()` мутує original array.

• `reverse()` змінює порядок елементів на протилежний.

• `reverse()` також мутує original array.

• `toSorted()` повертає новий відсортований масив і не мутує original array.

• `toReversed()` повертає новий масив у зворотному порядку і не мутує original array.

• Compare function визначає порядок двох елементів.

• Якщо comparator повертає:

    negative
        → a перед b

    positive
        → b перед a

    0
        → порядок між a та b не потрібно змінювати

• Для чисел:

    a - b
        → ascending

    b - a
        → descending

• `sort()` може використовуватися для primitive values та objects.

• Для objects потрібно явно визначити, за якою властивістю сортувати.

---

# sort()

`sort()` сортує елементи масиву.

Синтаксис:

    array.sort()

Приклад:

    const fruits = [
        "orange",
        "apple",
        "banana"
    ];

    fruits.sort();

Результат:

    [
        "apple",
        "banana",
        "orange"
    ]

---

# sort() повертає array

`sort()` повертає сам масив після сортування.

Наприклад:

    const fruits = [
        "orange",
        "apple",
        "banana"
    ];

    const result = fruits.sort();

    console.log(result);

Результат:

    [
        "apple",
        "banana",
        "orange"
    ]

Але важливо:

    result === fruits

дасть:

    true

Тому що `sort()` повертає той самий масив.

---

# Default sort()

Без comparator `sort()` сортує елементи як strings.

Наприклад:

    const fruits = [
        "banana",
        "apple",
        "orange"
    ];

    fruits.sort();

Результат:

    [
        "apple",
        "banana",
        "orange"
    ]

Для strings це часто працює так, як очікується.

---

# Lexicographic Order

Lexicographic order — порядок, заснований на порівнянні string values.

Наприклад:

    const words = [
        "banana",
        "apple",
        "cherry"
    ];

    words.sort();

Результат:

    [
        "apple",
        "banana",
        "cherry"
    ]

Можна умовно думати про це як про:

    dictionary order

але реальні правила залежать від Unicode-кодів символів.

---

# Головна пастка sort() з numbers

Наприклад:

    const numbers = [
        10,
        2,
        30,
        4
    ];

    numbers.sort();

Результат:

    [
        10,
        2,
        30,
        4
    ]

Це може здатися неправильним.

Але `sort()` без comparator порівнює елементи як strings.

Умовно:

    "10"
    "2"
    "30"
    "4"

Тому:

    "10" < "2"

у lexicographic comparison.

---

# Numeric Sort

Для чисел потрібно передати compare function.

Правильно:

    const numbers = [
        10,
        2,
        30,
        4
    ];

    numbers.sort((a, b) => a - b);

Результат:

    [
        2,
        4,
        10,
        30
    ]

---

# Compare Function

Синтаксис:

    array.sort((a, b) => {
        // comparison
    });

`a` та `b` — два елементи, порядок яких визначає comparator.

Для чисел:

    (a, b) => a - b

означає:

    ascending order

---

# Як працює comparator

Comparator:

    (a, b) => a - b

повертає:

    negative
    zero
    positive

### Якщо результат negative

    a - b < 0

означає:

    a should come before b

---

### Якщо результат positive

    a - b > 0

означає:

    b should come before a

---

### Якщо результат zero

    a - b === 0

означає:

    порядок a та b не потрібно змінювати

---

# Простий приклад comparator

    const numbers = [30, 10];

    numbers.sort((a, b) => a - b);

Для:

    a = 30
    b = 10

отримаємо:

    30 - 10
    // 20

Результат positive.

Отже:

    10

має опинитися перед:

    30

---

# Ascending Order

Ascending order — сортування від меншого до більшого.

Для чисел:

    const numbers = [
        5,
        1,
        10,
        3
    ];

    numbers.sort((a, b) => a - b);

Результат:

    [
        1,
        3,
        5,
        10
    ]

Шаблон:

    numbers.sort((a, b) => a - b);

---

# Descending Order

Descending order — сортування від більшого до меншого.

    const numbers = [
        5,
        1,
        10,
        3
    ];

    numbers.sort((a, b) => b - a);

Результат:

    [
        10,
        5,
        3,
        1
    ]

Шаблон:

    numbers.sort((a, b) => b - a);

---

# Найважливіше правило для numbers

Запам'ятати:

    ascending:

    (a, b) => a - b

    descending:

    (a, b) => b - a

---

# sort() мутує масив

Це дуже важливо.

Наприклад:

    const numbers = [
        30,
        10,
        20
    ];

    numbers.sort((a, b) => a - b);

Після цього original array:

    numbers

вже буде:

    [
        10,
        20,
        30
    ]

`sort()` змінює порядок елементів самого масиву.

---

# Mutation

Mutation означає зміну існуючого object або array.

Наприклад:

    const numbers = [3, 1, 2];

    numbers.sort((a, b) => a - b);

Тепер:

    numbers
    // [1, 2, 3]

Original array було змінено.

---

# Копія перед sort()

Якщо потрібно зберегти original array:

    const numbers = [
        30,
        10,
        20
    ];

    const sortedNumbers = [
        ...numbers
    ].sort((a, b) => a - b);

Тепер:

    numbers
    // [30, 10, 20]

    sortedNumbers
    // [10, 20, 30]

---

# Array.from() перед sort()

Ще один спосіб створити копію:

    const numbers = [
        30,
        10,
        20
    ];

    const sortedNumbers = Array
        .from(numbers)
        .sort((a, b) => a - b);

Original:

    numbers
    // [30, 10, 20]

Copy:

    sortedNumbers
    // [10, 20, 30]

---

# toSorted()

Сучасний immutable-підхід:

    toSorted()

`toSorted()` повертає новий відсортований масив.

Original array не змінюється.

Приклад:

    const numbers = [
        30,
        10,
        20
    ];

    const sortedNumbers = numbers.toSorted(
        (a, b) => a - b
    );

Тепер:

    numbers
    // [30, 10, 20]

    sortedNumbers
    // [10, 20, 30]

---

# sort() vs toSorted()

`sort()`:

    const numbers = [3, 1, 2];

    const result = numbers.sort(
        (a, b) => a - b
    );

    numbers
    // [1, 2, 3]

Original array змінений.

---

`toSorted()`:

    const numbers = [3, 1, 2];

    const result = numbers.toSorted(
        (a, b) => a - b
    );

    numbers
    // [3, 1, 2]

    result
    // [1, 2, 3]

Original array не змінений.

---

# reverse()

`reverse()` змінює порядок елементів масиву на протилежний.

Синтаксис:

    array.reverse()

Приклад:

    const numbers = [
        1,
        2,
        3,
        4
    ];

    numbers.reverse();

Результат:

    [
        4,
        3,
        2,
        1
    ]

---

# reverse() мутує array

`reverse()` також змінює original array.

    const numbers = [
        1,
        2,
        3
    ];

    numbers.reverse();

Тепер:

    numbers
    // [3, 2, 1]

---

# reverse() повертає той самий array

    const numbers = [
        1,
        2,
        3
    ];

    const result = numbers.reverse();

    console.log(result);

    // [3, 2, 1]

При цьому:

    result === numbers

буде:

    true

---

# toReversed()

Сучасний immutable-метод:

    toReversed()

Він повертає новий масив.

    const numbers = [
        1,
        2,
        3
    ];

    const reversedNumbers =
        numbers.toReversed();

Тепер:

    numbers
    // [1, 2, 3]

    reversedNumbers
    // [3, 2, 1]

---

# reverse() vs toReversed()

`reverse()`:

    const numbers = [1, 2, 3];

    const result = numbers.reverse();

    numbers
    // [3, 2, 1]

---

`toReversed()`:

    const numbers = [1, 2, 3];

    const result = numbers.toReversed();

    numbers
    // [1, 2, 3]

    result
    // [3, 2, 1]

---

# sort() + reverse()

Можна комбінувати:

    sort()
    reverse()

Наприклад:

    const numbers = [
        10,
        5,
        30,
        20
    ];

    numbers
        .sort((a, b) => a - b)
        .reverse();

Результат:

    [
        30,
        20,
        10,
        5
    ]

Але для чисел простіше одразу:

    numbers.sort((a, b) => b - a);

---

# sort() та reverse() chaining

Оскільки обидва методи повертають array, їх можна chain-ити.

    const numbers = [
        5,
        1,
        4,
        2
    ];

    numbers
        .sort((a, b) => a - b)
        .reverse();

Результат:

    [
        5,
        4,
        2,
        1
    ]

Але пам'ятай:

    sort()
    reverse()

обидва мутують array.

---

# Sorting Strings

Для strings можна використовувати:

    sort()

Наприклад:

    const names = [
        "Valeriy",
        "Anna",
        "John",
        "Mike"
    ];

    names.sort();

Результат буде в lexicographic order.

---

# Case Sensitivity

При сортуванні strings регістр має значення.

Наприклад:

    const words = [
        "banana",
        "Apple",
        "apple"
    ];

    words.sort();

Порядок може відрізнятися від очікуваного алфавітного порядку через Unicode ordering.

Для більш природного сортування тексту часто використовують:

    localeCompare()

---

# localeCompare()

`localeCompare()` дозволяє порівнювати strings з урахуванням language/locale rules.

Наприклад:

    const names = [
        "Олена",
        "Анна",
        "Богдан"
    ];

    names.sort((a, b) =>
        a.localeCompare(b)
    );

Це часто краще для human-readable text sorting.

---

# localeCompare() — descending

Можна поміняти аргументи:

    const names = [
        "Anna",
        "John",
        "Mike"
    ];

    names.sort((a, b) =>
        b.localeCompare(a)
    );

---

# String Length Sorting

Comparator не обов'язково має працювати тільки з числами.

Наприклад, сортування strings за довжиною:

    const words = [
        "JavaScript",
        "JS",
        "React",
        "TypeScript"
    ];

    words.sort(
        (a, b) => a.length - b.length
    );

Результат:

    [
        "JS",
        "React",
        "JavaScript",
        "TypeScript"
    ]

---

# Descending String Length

    const words = [
        "JavaScript",
        "JS",
        "React",
        "TypeScript"
    ];

    words.sort(
        (a, b) => b.length - a.length
    );

Результат:

    [
        "TypeScript",
        "JavaScript",
        "React",
        "JS"
    ]

---

# Sorting Objects

Одна з найважливіших практичних задач — сортування масиву objects.

Наприклад:

    const users = [
        { name: "John", age: 30 },
        { name: "Anna", age: 20 },
        { name: "Mike", age: 25 }
    ];

Потрібно відсортувати за `age`.

    users.sort(
        (a, b) => a.age - b.age
    );

Результат:

    [
        { name: "Anna", age: 20 },
        { name: "Mike", age: 25 },
        { name: "John", age: 30 }
    ]

---

# Objects — descending

    users.sort(
        (a, b) => b.age - a.age
    );

Результат:

    [
        { name: "John", age: 30 },
        { name: "Mike", age: 25 },
        { name: "Anna", age: 20 }
    ]

---

# Sorting Objects by String

Наприклад:

    const users = [
        { name: "John" },
        { name: "Anna" },
        { name: "Mike" }
    ];

Сортування за `name`:

    users.sort((a, b) =>
        a.name.localeCompare(b.name)
    );

Результат:

    [
        { name: "Anna" },
        { name: "John" },
        { name: "Mike" }
    ]

---

# Objects by String Descending

    users.sort((a, b) =>
        b.name.localeCompare(a.name)
    );

---

# Sorting by Date

Наприклад:

    const users = [
        {
            name: "John",
            date: new Date("2026-03-10")
        },
        {
            name: "Anna",
            date: new Date("2026-01-15")
        }
    ];

Сортування від старішої дати до новішої:

    users.sort(
        (a, b) => a.date - b.date
    );

---

# Stable Sort

Сучасний JavaScript гарантує stable sorting для `Array.prototype.sort()`.

Stable sort означає:

якщо два елементи мають однаковий sorting key, їхній взаємний порядок зберігається.

Наприклад:

    const users = [
        { name: "John", age: 30 },
        { name: "Anna", age: 20 },
        { name: "Mike", age: 30 }
    ];

    users.sort(
        (a, b) => a.age - b.age
    );

`John` та `Mike` мають однаковий:

    age = 30

Тому їхній порядок залишається:

    John
    Mike

---

# Comparator та 0

Якщо comparator повертає:

    0

це означає, що для цього порівняння елементи вважаються рівними з точки зору порядку.

Наприклад:

    const users = [
        { name: "John", age: 30 },
        { name: "Mike", age: 30 }
    ];

    users.sort(
        (a, b) => a.age - b.age
    );

Для цих двох objects:

    a.age - b.age
    // 0

Їхній взаємний порядок зберігається.

---

# Custom Comparator

Comparator може реалізовувати складні правила.

Наприклад:

    const numbers = [
        10,
        5,
        20,
        1
    ];

    numbers.sort((a, b) => {
        if (a < b) {
            return -1;
        }

        if (a > b) {
            return 1;
        }

        return 0;
    });

Це еквівалентно ascending numeric sort.

Коротший варіант:

    numbers.sort((a, b) => a - b);

---

# Comparator — загальна модель

    array.sort((a, b) => {
        if (a should come before b) {
            return -1;
        }

        if (a should come after b) {
            return 1;
        }

        return 0;
    });

Запам'ятати:

    negative → a before b
    positive → b before a
    0        → equal order

---

# sort() не просто "переставляє"

Важливо розуміти:

    sort()

не отримує аргумент:

    "ascending"

або:

    "descending"

Натомість він отримує:

    comparator

Саме comparator визначає порядок.

---

# Ascending / Descending Pattern

Для numbers:

    ascending:
    (a, b) => a - b

    descending:
    (a, b) => b - a

Для strings:

    ascending:
    (a, b) => a.localeCompare(b)

    descending:
    (a, b) => b.localeCompare(a)

---

# Reverse не є Sort Descending

Це важлива концептуальна різниця.

`reverse()` просто перевертає поточний порядок.

Наприклад:

    const numbers = [
        3,
        1,
        2
    ];

    numbers.reverse();

Результат:

    [
        2,
        1,
        3
    ]

Це НЕ descending sort.

---

# Sort Descending

    const numbers = [
        3,
        1,
        2
    ];

    numbers.sort((a, b) => b - a);

Результат:

    [
        3,
        2,
        1
    ]

Отже:

    reverse()
        → reverse current order

    sort()
        → establish a new order

---

# reverse() після sorted array

Якщо масив уже відсортований ascending:

    const numbers = [
        1,
        2,
        3
    ];

    numbers.reverse();

отримаємо:

    [
        3,
        2,
        1
    ]

Тому `reverse()` можна використовувати для зміни вже визначеного порядку.

---

# toSorted() + toReversed()

Immutable chain:

    const numbers = [
        5,
        1,
        3,
        2
    ];

    const result = numbers
        .toSorted((a, b) => a - b)
        .toReversed();

Original:

    numbers
    // [5, 1, 3, 2]

Result:

    [5, 3, 2, 1]

---

# Sorting Without Mutation

Старий підхід:

    const sorted = [
        ...numbers
    ].sort((a, b) => a - b);

Сучасний підхід:

    const sorted = numbers.toSorted(
        (a, b) => a - b
    );

Обидва залишають original array без змін.

---

# reverse Without Mutation

Старий підхід:

    const reversed = [
        ...numbers
    ].reverse();

Сучасний підхід:

    const reversed = numbers.toReversed();

---

# Shallow Copy

`sort()` та `reverse()` працюють з самим array.

Копіювання через:

    [...array]

створює лише shallow copy.

Наприклад:

    const users = [
        { name: "John" },
        { name: "Anna" }
    ];

    const copy = [...users];

Масиви різні:

    copy !== users

але objects всередині ті самі references.

---

# Object References During Sort

Наприклад:

    const user = {
        name: "John",
        age: 30
    };

    const users = [
        user
    ];

    const copy = [...users];

Тепер:

    copy[0] === users[0]

дасть:

    true

Тому copy array не означає deep copy objects.

Для простого сортування це зазвичай нормально, тому що `sort()` змінює порядок references, а не копіює objects.

---

# sort() та undefined

Особливі значення можуть мати специфічну поведінку під час sorting.

Наприклад:

    const values = [
        3,
        undefined,
        1,
        2
    ];

    values.sort((a, b) => a - b);

При роботі з `undefined` не варто покладатися на просту числову арифметику як на універсальний comparator.

Якщо дані можуть містити `undefined`, краще явно визначити правило сортування.

Наприклад:

    values.sort((a, b) => {
        if (a === undefined) return 1;
        if (b === undefined) return -1;

        return a - b;
    });

---

# null та sort()

`null` також потребує уваги.

Наприклад, якщо дані можуть містити:

    null

краще явно визначити, де він має знаходитися:

    const numbers = [
        10,
        null,
        5,
        20
    ];

    numbers.sort((a, b) => {
        if (a === null) return 1;
        if (b === null) return -1;

        return a - b;
    });

---

# Practical Example — Products by Price

    const products = [
        { name: "Phone", price: 800 },
        { name: "Laptop", price: 1200 },
        { name: "Tablet", price: 500 }
    ];

    products.sort(
        (a, b) => a.price - b.price
    );

Результат:

    [
        { name: "Tablet", price: 500 },
        { name: "Phone", price: 800 },
        { name: "Laptop", price: 1200 }
    ]

---

# Products by Price Descending

    products.sort(
        (a, b) => b.price - a.price
    );

---

# Products by Name

    products.sort((a, b) =>
        a.name.localeCompare(b.name)
    );

---

# Practical Example — Students

    const students = [
        { name: "John", score: 85 },
        { name: "Anna", score: 95 },
        { name: "Mike", score: 70 }
    ];

Сортування за score:

    students.sort(
        (a, b) => b.score - a.score
    );

Результат:

    Anna → 95
    John  → 85
    Mike  → 70

---

# Practical Example — Tasks

    const tasks = [
        { title: "Task A", priority: 2 },
        { title: "Task B", priority: 1 },
        { title: "Task C", priority: 3 }
    ];

    tasks.sort(
        (a, b) => b.priority - a.priority
    );

Результат:

    Task C → 3
    Task A → 2
    Task B → 1

---

# Practical Example — Dates

    const posts = [
        {
            title: "Post A",
            date: new Date("2026-01-10")
        },
        {
            title: "Post B",
            date: new Date("2026-03-10")
        },
        {
            title: "Post C",
            date: new Date("2026-02-10")
        }
    ];

Сортування від старіших до новіших:

    posts.sort(
        (a, b) => a.date - b.date
    );

---

# Newest First

Щоб новіші записи були першими:

    posts.sort(
        (a, b) => b.date - a.date
    );

Це типовий pattern для:

    posts
    messages
    events
    transactions
    logs

---

# Practical Example — Alphabetical Names

    const names = [
        "John",
        "Anna",
        "Mike"
    ];

    names.sort(
        (a, b) => a.localeCompare(b)
    );

Результат:

    [
        "Anna",
        "John",
        "Mike"
    ]

---

# Practical Example — Name Length

    const names = [
        "John",
        "Alexander",
        "Anna",
        "Mike"
    ];

    names.sort(
        (a, b) => a.length - b.length
    );

---

# Practical Example — Reverse

    const queue = [
        "first",
        "second",
        "third"
    ];

    queue.reverse();

Результат:

    [
        "third",
        "second",
        "first"
    ]

---

# Practical Example — Copy + Reverse

Якщо original не можна змінювати:

    const queue = [
        "first",
        "second",
        "third"
    ];

    const reversedQueue = [
        ...queue
    ].reverse();

Original:

    [
        "first",
        "second",
        "third"
    ]

Reversed:

    [
        "third",
        "second",
        "first"
    ]

---

# Practical Example — toReversed()

    const queue = [
        "first",
        "second",
        "third"
    ];

    const reversedQueue =
        queue.toReversed();

---

# Практичний pattern — sort + map

Наприклад:

    const users = [
        { name: "John", age: 30 },
        { name: "Anna", age: 20 },
        { name: "Mike", age: 25 }
    ];

    const names = users
        .toSorted((a, b) => a.age - b.age)
        .map(user => user.name);

Результат:

    [
        "Anna",
        "Mike",
        "John"
    ]

Це хороший приклад method chaining.

---

# sort() + filter()

Наприклад:

    const products = [
        { name: "Phone", price: 800, active: true },
        { name: "Laptop", price: 1200, active: false },
        { name: "Tablet", price: 500, active: true }
    ];

    const result = products
        .filter(product => product.active)
        .toSorted(
            (a, b) => a.price - b.price
        );

Результат:

    [
        { name: "Tablet", price: 500, active: true },
        { name: "Phone", price: 800, active: true }
    ]

---

# Типові помилки

❌ Очікувати numeric sort без comparator.

    const numbers = [
        10,
        2,
        30
    ];

    numbers.sort();

Не слід очікувати:

    [2, 10, 30]

Правильно:

    numbers.sort((a, b) => a - b);

---

❌ Забувати, що `sort()` мутує array.

    const original = [3, 1, 2];

    const sorted = original.sort(
        (a, b) => a - b
    );

`original` також змінений.

---

❌ Забувати, що `reverse()` мутує array.

    const original = [1, 2, 3];

    const reversed = original.reverse();

`original` тепер:

    [3, 2, 1]

---

❌ Плутати `reverse()` та descending sort.

    reverse()
        → просто перевертає поточний порядок

    sort((a, b) => b - a)
        → сортує числа за спаданням

---

❌ Неправильно писати comparator.

Наприклад:

    numbers.sort((a, b) => a > b);

Comparator повинен повертати значення, яке визначає порядок.

Надійний стандартний варіант:

    numbers.sort((a, b) => a - b);

---

❌ Плутати ascending та descending.

    a - b
        → ascending

    b - a
        → descending

---

❌ Сортувати objects без comparator.

    users.sort();

Для objects потрібно явно вказати property:

    users.sort(
        (a, b) => a.age - b.age
    );

---

❌ Порівнювати strings через `a - b`.

Наприклад:

    names.sort((a, b) => a - b);

Для strings краще:

    names.sort(
        (a, b) => a.localeCompare(b)
    );

---

❌ Забувати про case-sensitive / locale rules.

Для human-readable text часто краще:

    localeCompare()

---

❌ Мутувати shared state.

Особливо важливо в UI та React-коді.

Небезпечно:

    const sortedUsers = users.sort(
        (a, b) => a.age - b.age
    );

Якщо `users` є state, це змінює original array.

Краще:

    const sortedUsers = users.toSorted(
        (a, b) => a.age - b.age
    );

або:

    const sortedUsers = [...users].sort(
        (a, b) => a.age - b.age
    );

---

# sort() у React

У React особливо важливо не мутувати state.

Погано:

    setUsers(
        users.sort((a, b) => a.age - b.age)
    );

Тому що `sort()` змінює `users`.

Краще:

    setUsers(
        users.toSorted((a, b) => a.age - b.age)
    );

Або:

    setUsers(
        [...users].sort((a, b) => a.age - b.age)
    );

Головний принцип:

    state
        ↓
    do not mutate
        ↓
    create new array

---

# sort() Complexity

Для `sort()` не слід запам'ятовувати конкретний алгоритм реалізації JavaScript engine.

Для практичного рівня важливо розуміти:

    sorting
        → comparison-based operation

Типова нижня межа для comparison sorting:

    O(n log n)

У конкретній реалізації JavaScript engine алгоритм може мати власні оптимізації та характеристики.

Для Junior достатньо знати:

    sort()
        → sorting
        → приблизно O(n log n) typical complexity

і розуміти, що sorting може бути значно дорожчим за простий:

    O(n)

array traversal.

---

# Stable Sorting

Сучасний JavaScript гарантує stable sort.

Наприклад:

    const users = [
        { name: "John", age: 30 },
        { name: "Anna", age: 20 },
        { name: "Mike", age: 30 }
    ];

    users.sort(
        (a, b) => a.age - b.age
    );

Результат:

    Anna
    John
    Mike

John та Mike мають однаковий age.

Їхній початковий порядок:

    John
    Mike

зберігається.

---

# Comparator Rules

Comparator повинен бути логічним та consistent.

Основна модель:

    compare(a, b) < 0
        → a before b

    compare(a, b) > 0
        → a after b

    compare(a, b) === 0
        → equal ordering

---

# Comparator для numbers

    (a, b) => a - b

---

# Comparator для numbers descending

    (a, b) => b - a

---

# Comparator для strings

    (a, b) => a.localeCompare(b)

---

# Comparator для strings descending

    (a, b) => b.localeCompare(a)

---

# Comparator для objects

За числовим property:

    (a, b) => a.age - b.age

За string property:

    (a, b) =>
        a.name.localeCompare(b.name)

---

# Multi-level Sorting

Іноді потрібно сортувати за кількома властивостями.

Наприклад:

    const users = [
        { name: "John", age: 30 },
        { name: "Anna", age: 30 },
        { name: "Mike", age: 20 }
    ];

Спочатку за age, потім за name:

    users.sort((a, b) => {
        const ageDifference = a.age - b.age;

        if (ageDifference !== 0) {
            return ageDifference;
        }

        return a.name.localeCompare(b.name);
    });

Результат:

    Mike 20
    Anna 30
    John 30

Це важливий практичний pattern для реальних даних.

---

# Multi-level Sorting — короткий варіант

Можна записати:

    users.sort((a, b) =>
        a.age - b.age ||
        a.name.localeCompare(b.name)
    );

Але для навчального та production-коду часто читабельніше використовувати явні змінні та `if`.

---

# Практичний вибір

## Потрібно відсортувати numbers

    numbers.sort((a, b) => a - b);

---

## Numbers descending

    numbers.sort((a, b) => b - a);

---

## Strings alphabetically

    strings.sort(
        (a, b) => a.localeCompare(b)
    );

---

## Objects by number

    objects.sort(
        (a, b) => a.price - b.price
    );

---

## Objects by string

    objects.sort(
        (a, b) =>
            a.name.localeCompare(b.name)
    );

---

## Reverse current order

    array.reverse();

---

## Immutable sorting

    array.toSorted();

або:

    [...array].sort();

---

## Immutable reverse

    array.toReversed();

або:

    [...array].reverse();

---

# sort() vs reverse()

| Метод | Що робить | Mutates? |
|---|---|---|
| `sort()` | сортує | так |
| `reverse()` | перевертає порядок | так |
| `toSorted()` | повертає sorted copy | ні |
| `toReversed()` | повертає reversed copy | ні |

---

# sort() vs toSorted()

| `sort()` | `toSorted()` |
|---|---|
| змінює original | не змінює original |
| повертає sorted array | повертає new sorted array |
| mutable | immutable |
| старіший підхід | сучасний immutable-підхід |

---

# reverse() vs toReversed()

| `reverse()` | `toReversed()` |
|---|---|
| змінює original | не змінює original |
| повертає same array | повертає new array |
| mutable | immutable |

---

# Практична таблиця

| Задача | Рішення |
|---|---|
| Numbers ascending | `sort((a, b) => a - b)` |
| Numbers descending | `sort((a, b) => b - a)` |
| Strings | `sort()` |
| Human-readable strings | `sort((a, b) => a.localeCompare(b))` |
| Objects by number | `sort((a, b) => a.value - b.value)` |
| Objects by string | `sort((a, b) => a.name.localeCompare(b.name))` |
| Reverse current order | `reverse()` |
| Immutable sort | `toSorted()` |
| Immutable reverse | `toReversed()` |

---

# Питання зі співбесіди

Що робить `sort()`?

Що робить `reverse()`?

Чи мутує `sort()` original array?

Чи мутує `reverse()` original array?

Що повертає `sort()`?

Що повертає `reverse()`?

Чому:

    [10, 2, 30].sort()

може дати неочікуваний результат?

Як правильно сортувати numbers?

Що таке compare function?

Що означає negative return value comparator?

Що означає positive return value comparator?

Що означає `0` у comparator?

Як відсортувати numbers за зростанням?

Як відсортувати numbers за спаданням?

Чим `sort()` відрізняється від `reverse()`?

Чи є `reverse()` способом сортувати numbers descending?

Що таке lexicographic sorting?

Що таке `localeCompare()`?

Як сортувати strings?

Як сортувати strings за довжиною?

Як сортувати objects за числовою властивістю?

Як сортувати objects за string property?

Що таке stable sort?

Чому mutation `sort()` може бути проблемою в React?

Як відсортувати array без mutation?

Що робить `toSorted()`?

Що робить `toReversed()`?

Яка різниця між:

    sort()
    toSorted()

Яка різниця між:

    reverse()
    toReversed()

Що таке shallow copy?

Чому:

    [...array].sort()

не змінює original array?

Чи копіюються objects всередині через spread?

Що таке multi-level sorting?

Яка приблизна time complexity sorting?

Чим Array sorting відрізняється від membership search?

---

# Шлях

🟢 Core (обов'язково знати)

Що робить `sort()`.

Що робить `reverse()`.

Що `sort()` мутує array.

Що `reverse()` мутує array.

Default string sorting.

Numeric sorting.

Comparator.

Ascending:

    (a, b) => a - b

Descending:

    (a, b) => b - a

`reverse()`.

Index order.

Основи `localeCompare()`.

Основи sorting objects.

---

🔵 Junior

`sort()` з comparator.

Ascending / descending.

String sorting.

Numeric sorting.

Object sorting.

Sorting by property.

Sorting by string property.

`localeCompare()`.

Stable sort.

Mutation.

Shallow copy.

Immutable sorting:

    [...array].sort()

Immutable reverse:

    [...array].reverse()

`toSorted()`.

`toReversed()`.

Multi-level sorting.

Розуміння comparator:

    negative
    positive
    zero

Розуміння різниці:

    sort()
    reverse()

Розуміння різниці:

    sort()
    toSorted()

---

🟠 Middle

Складні comparator functions.

Multi-level sorting.

Sorting nullable values.

Sorting dates.

Locale-aware sorting.

Stable sorting.

Immutability у frontend applications.

Sorting large datasets.

Time complexity.

Space complexity.

Вибір між:

    sort()
    toSorted()
    reverse()
    toReversed()

Оптимізація comparator.

Sorting objects без зайвих обчислень.

Method chaining після sorting.

---

🔴 Senior

Глибоке розуміння ECMAScript sorting semantics.

Comparator consistency.

Stable sorting guarantees.

Engine implementation details.

Sorting algorithms та їхні trade-offs.

TimSort та інші engine-level implementation strategies.

Comparison-based sorting.

Lower bound:

    O(n log n)

Large dataset sorting.

Memory allocation.

Mutation vs immutability.

Sorting in React state.

Server-side vs client-side sorting.

Database sorting vs JavaScript sorting.

Pagination + sorting.

Multi-key sorting.

Locale-aware sorting.

Performance profiling.

---

# Міні-шпаргалка

## sort()

    array.sort()

Сортує array.

За замовчуванням:

    elements → strings

---

## Numeric ascending

    numbers.sort(
        (a, b) => a - b
    );

---

## Numeric descending

    numbers.sort(
        (a, b) => b - a
    );

---

## String sorting

    strings.sort();

---

## Locale-aware string sorting

    strings.sort(
        (a, b) => a.localeCompare(b)
    );

---

## Object sorting

    users.sort(
        (a, b) => a.age - b.age
    );

---

## reverse()

    array.reverse();

Перевертає поточний порядок.

---

## Immutable sort

    const sorted =
        array.toSorted(
            (a, b) => a - b
        );

---

## Immutable reverse

    const reversed =
        array.toReversed();

---

## Comparator

    negative
        → a before b

    positive
        → b before a

    zero
        → equal ordering

---

## Mutation

    sort()
        → mutates

    reverse()
        → mutates

    toSorted()
        → does not mutate

    toReversed()
        → does not mutate

---

# Основні правила

    sort()
        → sort elements

    reverse()
        → reverse current order

    toSorted()
        → immutable sort

    toReversed()
        → immutable reverse

    a - b
        → ascending numbers

    b - a
        → descending numbers

    a.localeCompare(b)
        → ascending strings

    b.localeCompare(a)
        → descending strings

---

# Головне:

• `sort()` сортує елементи масиву.

• Без comparator `sort()` сортує елементи як strings.

• Для чисел потрібно використовувати comparator:

    numbers.sort((a, b) => a - b);

• Для descending:

    numbers.sort((a, b) => b - a);

• Comparator повертає:

    negative
    positive
    0

• Negative означає, що `a` має бути перед `b`.

• Positive означає, що `b` має бути перед `a`.

• `0` означає, що порядок між ними не потрібно змінювати.

• `sort()` мутує original array.

• `reverse()` мутує original array.

• `reverse()` просто змінює поточний порядок.

• `reverse()` не є повноцінною заміною descending sort.

• Для descending numbers краще:

    (a, b) => b - a

• `toSorted()` створює новий sorted array.

• `toReversed()` створює новий reversed array.

• Для immutable sorting можна використовувати:

    [...array].sort()

  або:

    array.toSorted()

• Для immutable reverse:

    [...array].reverse()

  або:

    array.toReversed()

• Для strings часто корисний:

    localeCompare()

• Objects сортуються через comparator за конкретною властивістю.

• Наприклад:

    users.sort(
        (a, b) => a.age - b.age
    );

• Для string property:

    users.sort(
        (a, b) =>
            a.name.localeCompare(b.name)
    );

• JavaScript гарантує stable sorting.

• `sort()` — comparison-based sorting operation.

• Для великих масивів sorting може бути значно дорожчим за простий linear traversal.

• Типова модель складності comparison sorting:

    O(n log n)

• У frontend-коді особливо важливо не мутувати state через:

    sort()
    reverse()

• Сучасний immutable-підхід:

    toSorted()
    toReversed()

---

# Фінальна модель

    ARRAY
      │
      ├── sort()
      │      ↓
      │   sorted array
      │      ↓
      │   MUTATES
      │
      ├── toSorted()
      │      ↓
      │   new sorted array
      │      ↓
      │   NO MUTATION
      │
      ├── reverse()
      │      ↓
      │   reversed array
      │      ↓
      │   MUTATES
      │
      └── toReversed()
             ↓
         new reversed array
             ↓
         NO MUTATION


    NUMBERS
      │
      ├── (a, b) => a - b
      │       ↓
      │   ascending
      │
      └── (a, b) => b - a
              ↓
          descending


    STRINGS
      │
      └── (a, b) => a.localeCompare(b)
              ↓
          locale-aware order


    OBJECTS
      │
      ├── a.age - b.age
      │       ↓
      │   numeric property
      │
      └── a.name.localeCompare(b.name)
              ↓
          string property

---

# Запам'ятати в першу чергу

    sort()
        → sort

    reverse()
        → reverse current order

    toSorted()
        → sorted copy

    toReversed()
        → reversed copy

    a - b
        → ascending numbers

    b - a
        → descending numbers

    a.localeCompare(b)
        → ascending strings

    sort()
        → MUTATES

    reverse()
        → MUTATES

    toSorted()
        → NO MUTATION

    toReversed()
        → NO MUTATION

    comparator < 0
        → a before b

    comparator > 0
        → b before a

    comparator === 0
        → equal order