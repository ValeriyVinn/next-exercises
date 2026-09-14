# 02. reduce()

`reduce()` — один із найважливіших методів масивів JavaScript.

Він використовується для проходження всіх елементів масиву та поступового формування одного підсумкового значення.

Основна ідея:

    array
        ↓
    reduce()
        ↓
    одне підсумкове значення

Цим значенням може бути:

    number
    string
    boolean
    object
    array
    Map
    Set
    будь-яке інше значення

Наприклад:

    [10, 20, 30]
          ↓
       reduce()
          ↓
         60

`reduce()` особливо корисний для:

    sum
    product
    counting
    grouping
    building objects
    building arrays
    calculating totals
    accumulating values
    data transformation

---

### Ключові поняття

✔ `reduce()`  
✔ accumulator  
✔ current value  
✔ current index  
✔ array  
✔ initial value  
✔ callback  
✔ callback parameters  
✔ return value  
✔ accumulation  
✔ accumulator update  
✔ reduction  
✔ aggregation  
✔ initial accumulator  
✔ final result  
✔ empty array  
✔ object accumulator  
✔ array accumulator  
✔ nested data  
✔ reduce chaining  

---

### Що потрібно пам'ятати

• `reduce()` проходить елементи масиву та накопичує результат.

• Основна змінна `reduce()` — `accumulator`.

• `accumulator` зберігає результат попередньої ітерації.

• Callback `reduce()` отримує:

    accumulator
    currentValue
    currentIndex
    array

• Callback повинен повертати нове значення accumulator.

• `initialValue` задає початкове значення accumulator.

• Якщо `initialValue` переданий, перша ітерація використовує його як accumulator.

• Якщо `initialValue` не переданий, перший елемент масиву стає початковим accumulator.

• `reduce()` повертає одне фінальне значення.

• Це значення не обов'язково має бути number.

• `reduce()` може створювати:

    number
    string
    object
    array
    Map
    Set

• `reduce()` може використовуватися для aggregation.

• `reduce()` може замінити деякі задачі, які виконуються через цикли.

• Не потрібно використовувати `reduce()` для кожної задачі з масивом.

• Якщо `map()` або `filter()` чіткіше виражає намір, краще використовувати їх.

---

# Основна модель reduce()

Загальний синтаксис:

    const result = array.reduce(
        (accumulator, currentValue) => {
            return newAccumulator;
        },
        initialValue
    );

Наприклад:

    const numbers = [1, 2, 3, 4];

    const sum = numbers.reduce((accumulator, number) => {
        return accumulator + number;
    }, 0);

Результат:

    10

---

# Accumulator

`accumulator` — накопичувач.

Він зберігає результат попереднього кроку.

Наприклад:

    const numbers = [1, 2, 3];

    const sum = numbers.reduce((acc, number) => {
        return acc + number;
    }, 0);

Робота:

    acc = 0

    0 + 1 → 1

    1 + 2 → 3

    3 + 3 → 6

Фінальний результат:

    6

---

# Current Value

`currentValue` — поточний елемент масиву.

Наприклад:

    const numbers = [10, 20, 30];

    numbers.reduce((accumulator, currentValue) => {
        console.log(currentValue);

        return accumulator + currentValue;
    }, 0);

Послідовно:

    10
    20
    30

---

# Initial Value

`initialValue` — початкове значення accumulator.

Наприклад:

    const numbers = [10, 20, 30];

    const sum = numbers.reduce((accumulator, number) => {
        return accumulator + number;
    }, 0);

Початок:

    accumulator = 0

Потім:

    0 + 10 → 10
    10 + 20 → 30
    30 + 30 → 60

Результат:

    60

---

# Чому initialValue важливий

Рекомендується явно задавати `initialValue`.

Наприклад:

    const numbers = [10, 20, 30];

    const sum = numbers.reduce(
        (acc, number) => acc + number,
        0
    );

Тут одразу зрозуміло:

    accumulator starts at 0

Це робить код безпечнішим та зрозумілішим.

---

# Reduce без initialValue

Можна написати:

    const numbers = [10, 20, 30];

    const sum = numbers.reduce((acc, number) => {
        return acc + number;
    });

У цьому випадку:

    accumulator = 10

а перший `currentValue`:

    20

Тобто фактично:

    10 + 20 → 30
    30 + 30 → 60

Результат:

    60

---

# Reduce з initialValue vs без

З initialValue:

    numbers.reduce(
        (acc, number) => acc + number,
        0
    );

Початок:

    acc = 0
    currentValue = first element

Без initialValue:

    acc = first element
    currentValue = second element

Це важлива відмінність.

---

# Callback Parameters

Повний callback:

    array.reduce(
        (
            accumulator,
            currentValue,
            currentIndex,
            array
        ) => {
            ...
        },
        initialValue
    );

Параметри:

    accumulator
        ↓
    currentValue
        ↓
    currentIndex
        ↓
    array

На практиці найчастіше використовуються:

    accumulator
    currentValue

---

# currentIndex

Третій параметр — index поточного елемента.

    const numbers = [10, 20, 30];

    const result = numbers.reduce(
        (acc, number, index) => {
            console.log(index);

            return acc + number;
        },
        0
    );

Результат:

    0
    1
    2

---

# array

Четвертий параметр — сам масив.

    const numbers = [10, 20, 30];

    numbers.reduce(
        (acc, number, index, array) => {
            console.log(array);

            return acc + number;
        },
        0
    );

---

# Як працює reduce()

Розглянемо:

    const numbers = [1, 2, 3, 4];

    const sum = numbers.reduce(
        (acc, number) => acc + number,
        0
    );

Початково:

    acc = 0

---

### Iteration 1

    acc = 0
    number = 1

    0 + 1 = 1

Новий accumulator:

    1

---

### Iteration 2

    acc = 1
    number = 2

    1 + 2 = 3

Новий accumulator:

    3

---

### Iteration 3

    acc = 3
    number = 3

    3 + 3 = 6

Новий accumulator:

    6

---

### Iteration 4

    acc = 6
    number = 4

    6 + 4 = 10

Новий accumulator:

    10

---

Фінальний результат:

    10

---

# Reduce Flow

Можна запам'ятати:

    initialValue
        ↓
    accumulator
        ↓
    currentValue
        ↓
    return new accumulator
        ↓
    accumulator
        ↓
    next currentValue
        ↓
    return
        ↓
    ...
        ↓
    final result

---

# Найпростіший reduce()

Сума:

    const numbers = [1, 2, 3, 4, 5];

    const sum = numbers.reduce(
        (acc, number) => acc + number,
        0
    );

Результат:

    15

---

# Sum

Один із найтиповіших випадків використання `reduce()`.

    const numbers = [10, 20, 30, 40];

    const sum = numbers.reduce(
        (sum, number) => sum + number,
        0
    );

Результат:

    100

---

# Product

`reduce()` можна використовувати для множення.

    const numbers = [2, 3, 4];

    const product = numbers.reduce(
        (result, number) => result * number,
        1
    );

Результат:

    24

Початкове значення:

    1

тому що:

    1 × 2 × 3 × 4 = 24

---

# Average

Середнє значення можна отримати через `reduce()`.

    const numbers = [10, 20, 30];

    const sum = numbers.reduce(
        (acc, number) => acc + number,
        0
    );

    const average = sum / numbers.length;

Результат:

    20

---

# Count

`reduce()` може рахувати кількість елементів, які відповідають умові.

    const numbers = [1, 2, 3, 4, 5, 6];

    const evenCount = numbers.reduce(
        (count, number) => {
            if (number % 2 === 0) {
                return count + 1;
            }

            return count;
        },
        0
    );

Результат:

    3

---

# Count з тернарним оператором

Той самий приклад коротше:

    const evenCount = numbers.reduce(
        (count, number) => {
            return count + (number % 2 === 0 ? 1 : 0);
        },
        0
    );

Результат:

    3

---

# Count Objects

Наприклад:

    const users = [
        {
            name: "John",
            active: true
        },
        {
            name: "Anna",
            active: false
        },
        {
            name: "Tom",
            active: true
        }
    ];

Порахувати active users:

    const activeCount = users.reduce(
        (count, user) => {
            return count + (user.active ? 1 : 0);
        },
        0
    );

Результат:

    2

---

# Find Maximum

`reduce()` можна використовувати для пошуку максимального значення.

    const numbers = [10, 50, 20, 80, 30];

    const max = numbers.reduce(
        (max, number) => {
            return number > max ? number : max;
        },
        numbers[0]
    );

Результат:

    80

---

# Find Minimum

    const numbers = [10, 50, 20, 80, 30];

    const min = numbers.reduce(
        (min, number) => {
            return number < min ? number : min;
        },
        numbers[0]
    );

Результат:

    10

---

# Reduce to String

Accumulator може бути string.

    const words = [
        "Hello",
        "world",
        "from",
        "JavaScript"
    ];

    const sentence = words.reduce(
        (result, word) => `${result} ${word}`,
        ""
    );

Результат:

    " Hello world from JavaScript"

Можна прибрати початковий пробіл:

    const sentence = words.reduce(
        (result, word, index) => {
            if (index === 0) {
                return word;
            }

            return `${result} ${word}`;
        },
        ""
    );

Результат:

    "Hello world from JavaScript"

Для простої операції об'єднання рядків часто читабельніше використовувати `join()`.

---

# Reduce to Object

`reduce()` може поступово створювати object.

Наприклад:

    const numbers = [1, 2, 3];

    const result = numbers.reduce(
        (acc, number) => {
            acc[number] = number * 10;

            return acc;
        },
        {}
    );

Результат:

    {
        1: 10,
        2: 20,
        3: 30
    }

---

# Object Accumulator

Дуже важливий патерн:

    array.reduce(
        (accumulator, item) => {
            accumulator[key] = value;

            return accumulator;
        },
        {}
    );

Наприклад:

    const users = [
        {
            id: 1,
            name: "John"
        },
        {
            id: 2,
            name: "Anna"
        }
    ];

    const usersById = users.reduce(
        (acc, user) => {
            acc[user.id] = user;

            return acc;
        },
        {}
    );

Результат:

    {
        1: {
            id: 1,
            name: "John"
        },
        2: {
            id: 2,
            name: "Anna"
        }
    }

---

# Indexing Data

Такий патерн називається створенням index.

Було:

    [
        { id: 1, name: "John" },
        { id: 2, name: "Anna" }
    ]

Стало:

    {
        1: { id: 1, name: "John" },
        2: { id: 2, name: "Anna" }
    }

Це може бути зручно для швидкого доступу:

    usersById[2]

Результат:

    {
        id: 2,
        name: "Anna"
    }

---

# Grouping

Одна з важливих задач для `reduce()` — grouping.

Наприклад:

    const users = [
        {
            name: "John",
            role: "admin"
        },
        {
            name: "Anna",
            role: "user"
        },
        {
            name: "Tom",
            role: "admin"
        }
    ];

Потрібно згрупувати users за role.

    const grouped = users.reduce(
        (acc, user) => {
            if (!acc[user.role]) {
                acc[user.role] = [];
            }

            acc[user.role].push(user);

            return acc;
        },
        {}
    );

Результат:

    {
        admin: [
            {
                name: "John",
                role: "admin"
            },
            {
                name: "Tom",
                role: "admin"
            }
        ],
        user: [
            {
                name: "Anna",
                role: "user"
            }
        ]
    }

---

# Grouping — схема

    users
       ↓
    reduce()
       ↓
    group key
       ↓
    accumulator[key]
       ↓
    push item
       ↓
    next item

---

# Group by Category

Наприклад:

    const products = [
        {
            name: "Laptop",
            category: "electronics"
        },
        {
            name: "Phone",
            category: "electronics"
        },
        {
            name: "Chair",
            category: "furniture"
        }
    ];

    const grouped = products.reduce(
        (acc, product) => {
            const category = product.category;

            if (!acc[category]) {
                acc[category] = [];
            }

            acc[category].push(product);

            return acc;
        },
        {}
    );

Результат:

    {
        electronics: [
            {
                name: "Laptop",
                category: "electronics"
            },
            {
                name: "Phone",
                category: "electronics"
            }
        ],
        furniture: [
            {
                name: "Chair",
                category: "furniture"
            }
        ]
    }

---

# Reduce to Array

Accumulator може бути масивом.

Наприклад:

    const numbers = [1, 2, 3, 4];

    const result = numbers.reduce(
        (acc, number) => {
            acc.push(number * 2);

            return acc;
        },
        []
    );

Результат:

    [2, 4, 6, 8]

Але в такому випадку набагато природніше використовувати:

    const result = numbers.map(number => number * 2);

Це важливий принцип:

    reduce() може зробити багато речей,
    але це не означає,
    що його треба використовувати для всіх задач.

---

# Reduce to Array with Condition

Можна одночасно фільтрувати та трансформувати:

    const numbers = [1, 2, 3, 4, 5];

    const result = numbers.reduce(
        (acc, number) => {
            if (number % 2 === 0) {
                acc.push(number * 10);
            }

            return acc;
        },
        []
    );

Результат:

    [20, 40]

Але часто читабельніше:

    const result = numbers
        .filter(number => number % 2 === 0)
        .map(number => number * 10);

`reduce()` тут може бути корисним, якщо потрібно виконати обидві операції за один прохід і це дійсно має значення для задачі.

---

# Flattening Array

`reduce()` можна використовувати для об'єднання вкладених масивів.

Наприклад:

    const arrays = [
        [1, 2],
        [3, 4],
        [5, 6]
    ];

    const result = arrays.reduce(
        (acc, array) => {
            return acc.concat(array);
        },
        []
    );

Результат:

    [1, 2, 3, 4, 5, 6]

Але для цієї задачі існує спеціальний метод:

    flat()

Тому:

    arrays.flat()

є читабельнішим.

---

# Reduce та Nested Arrays

Ще один варіант:

    const arrays = [
        [1, 2],
        [3, 4],
        [5]
    ];

    const result = arrays.reduce(
        (acc, current) => [
            ...acc,
            ...current
        ],
        []
    );

Результат:

    [1, 2, 3, 4, 5]

---

# Reduce to Set

Accumulator може бути `Set`.

Наприклад, потрібно отримати унікальні значення:

    const numbers = [
        1,
        2,
        2,
        3,
        3,
        3
    ];

    const unique = numbers.reduce(
        (set, number) => {
            set.add(number);

            return set;
        },
        new Set()
    );

Результат:

    Set(3) { 1, 2, 3 }

Але простіше:

    const unique = new Set(numbers);

---

# Reduce to Map

Accumulator може бути `Map`.

    const users = [
        {
            id: 1,
            name: "John"
        },
        {
            id: 2,
            name: "Anna"
        }
    ];

    const usersById = users.reduce(
        (map, user) => {
            map.set(user.id, user);

            return map;
        },
        new Map()
    );

Тепер:

    usersById.get(1)

поверне:

    {
        id: 1,
        name: "John"
    }

---

# Reduce та Boolean

`reduce()` може повертати boolean.

Наприклад, перевірити, чи всі числа позитивні:

    const numbers = [1, 2, 3, 4];

    const allPositive = numbers.reduce(
        (result, number) => {
            return result && number > 0;
        },
        true
    );

Результат:

    true

Але для цієї задачі краще використовувати:

    every()

Тобто:

    const allPositive = numbers.every(
        number => number > 0
    );

---

# Reduce та Some

Можна реалізувати логіку `some()` через `reduce()`:

    const numbers = [1, 2, 3, 4];

    const hasEven = numbers.reduce(
        (result, number) => {
            return result || number % 2 === 0;
        },
        false
    );

Результат:

    true

Але природніше:

    const hasEven = numbers.some(
        number => number % 2 === 0
    );

---

# Reduce та Find

Можна побудувати пошук через `reduce()`, але це зазвичай гірше за `find()`.

Наприклад:

    const numbers = [10, 20, 30];

    const result = numbers.reduce(
        (found, number) => {
            if (found !== undefined) {
                return found;
            }

            return number > 15 ? number : undefined;
        },
        undefined
    );

Але набагато краще:

    const result = numbers.find(
        number => number > 15
    );

Висновок:

    reduce() is powerful
    ≠
    reduce() is always the best choice

---

# Reduce vs map

`map()`:

    one element
        ↓
    one transformed element

Наприклад:

    [1, 2, 3]
        ↓
    [2, 4, 6]

`reduce()`:

    many elements
        ↓
    one accumulated result

Наприклад:

    [1, 2, 3]
        ↓
    6

---

# Reduce vs filter

`filter()`:

    many elements
        ↓
    subset of elements

Наприклад:

    [1, 2, 3, 4]
        ↓
    [2, 4]

`reduce()`:

    many elements
        ↓
    one result

Наприклад:

    [1, 2, 3, 4]
        ↓
    10

---

# Reduce vs forEach

`forEach()`:

    виконати side effect
    для кожного елемента

`reduce()`:

    накопичити результат

Наприклад:

    let sum = 0;

    numbers.forEach(number => {
        sum += number;
    });

Те саме через `reduce()`:

    const sum = numbers.reduce(
        (sum, number) => sum + number,
        0
    );

Другий варіант безпосередньо виражає:

    "reduce this array to a sum"

---

# Reduce vs for

Імперативний підхід:

    const numbers = [10, 20, 30];

    let sum = 0;

    for (const number of numbers) {
        sum += number;
    }

Функціональний підхід:

    const sum = numbers.reduce(
        (sum, number) => sum + number,
        0
    );

Обидва варіанти правильні.

Вибір залежить від:

    readability
    complexity
    team conventions
    task

---

# Reduce — важливість return

Це критично.

Правильно:

    const sum = numbers.reduce(
        (acc, number) => {
            return acc + number;
        },
        0
    );

Якщо не повернути accumulator:

    const sum = numbers.reduce(
        (acc, number) => {
            acc + number;
        },
        0
    );

результат буде неправильним.

Після першої ітерації callback поверне:

    undefined

і наступні операції можуть зламатися.

---

# Reduce та mutation

При роботі з object accumulator часто зустрічається mutation:

    const result = numbers.reduce(
        (acc, number) => {
            acc[number] = number * 2;

            return acc;
        },
        {}
    );

Тут мутується accumulator:

    acc

Це не обов'язково погано.

Навпаки, для локального accumulator це часто практичний і ефективний підхід.

Головне — розуміти, що саме мутується.

---

# Reduce без mutation

Можна створювати новий object на кожній ітерації:

    const result = numbers.reduce(
        (acc, number) => {
            return {
                ...acc,
                [number]: number * 2
            };
        },
        {}
    );

Але для великої кількості елементів це може створювати багато проміжних об'єктів.

Тому локальна mutation accumulator часто є практичнішою:

    acc[key] = value;

    return acc;

---

# Empty Array

Важлива особливість:

    [].reduce(...)

без `initialValue` викличе `TypeError`.

Наприклад:

    const result = [].reduce(
        (acc, number) => acc + number
    );

Буде помилка, тому що немає першого елемента, який можна використати як accumulator.

---

# Empty Array with initialValue

Якщо передати initial value:

    const result = [].reduce(
        (acc, number) => acc + number,
        0
    );

Результат:

    0

Тому `initialValue` часто робить `reduce()` безпечнішим.

---

# Initial Value Determines Result Type

Тип initial value часто визначає тип accumulator.

Наприклад:

    numbers.reduce(
        (acc, number) => acc + number,
        0
    );

Accumulator:

    number

---

Object:

    numbers.reduce(
        (acc, number) => {
            acc[number] = true;
            return acc;
        },
        {}
    );

Accumulator:

    object

---

Array:

    numbers.reduce(
        (acc, number) => {
            acc.push(number);
            return acc;
        },
        []
    );

Accumulator:

    array

---

Set:

    numbers.reduce(
        (acc, number) => {
            acc.add(number);
            return acc;
        },
        new Set()
    );

Accumulator:

    Set

---

# Reduce as General Accumulator

Можна запам'ятати:

    initialValue
        ↓
    determines accumulator shape

Наприклад:

    0
        → number accumulator

    ""
        → string accumulator

    []
        → array accumulator

    {}
        → object accumulator

    new Set()
        → Set accumulator

    new Map()
        → Map accumulator

---

# Практичний приклад — cart total

Наприклад:

    const cart = [
        {
            name: "Laptop",
            price: 1000,
            quantity: 1
        },
        {
            name: "Mouse",
            price: 30,
            quantity: 2
        },
        {
            name: "Keyboard",
            price: 70,
            quantity: 1
        }
    ];

Порахувати total:

    const total = cart.reduce(
        (total, item) => {
            return total + item.price * item.quantity;
        },
        0
    );

Результат:

    1130

Логіка:

    Laptop:
    1000 × 1 = 1000

    Mouse:
    30 × 2 = 60

    Keyboard:
    70 × 1 = 70

    Total:
    1130

---

# Практичний приклад — total by category

    const products = [
        {
            name: "Laptop",
            category: "electronics",
            price: 1000
        },
        {
            name: "Phone",
            category: "electronics",
            price: 700
        },
        {
            name: "Chair",
            category: "furniture",
            price: 100
        }
    ];

Згрупувати суму:

    const totals = products.reduce(
        (acc, product) => {
            const category = product.category;

            if (!acc[category]) {
                acc[category] = 0;
            }

            acc[category] += product.price;

            return acc;
        },
        {}
    );

Результат:

    {
        electronics: 1700,
        furniture: 100
    }

---

# Практичний приклад — frequency counter

`reduce()` часто використовується для підрахунку frequency.

    const fruits = [
        "apple",
        "banana",
        "apple",
        "orange",
        "banana",
        "apple"
    ];

    const counts = fruits.reduce(
        (acc, fruit) => {
            if (!acc[fruit]) {
                acc[fruit] = 0;
            }

            acc[fruit]++;

            return acc;
        },
        {}
    );

Результат:

    {
        apple: 3,
        banana: 2,
        orange: 1
    }

Це дуже корисний алгоритмічний патерн.

---

# Frequency Counter — коротший варіант

Можна використати:

    const counts = fruits.reduce(
        (acc, fruit) => {
            acc[fruit] = (acc[fruit] || 0) + 1;

            return acc;
        },
        {}
    );

Результат той самий:

    {
        apple: 3,
        banana: 2,
        orange: 1
    }

---

# Практичний приклад — total length

    const words = [
        "JavaScript",
        "React",
        "Node"
    ];

    const totalLength = words.reduce(
        (total, word) => total + word.length,
        0
    );

Результат:

    17

---

# Практичний приклад — найдовше слово

    const words = [
        "cat",
        "JavaScript",
        "React",
        "programming"
    ];

    const longest = words.reduce(
        (longest, word) => {
            return word.length > longest.length
                ? word
                : longest;
        },
        ""
    );

Результат:

    "JavaScript"

---

# Практичний приклад — object from array

    const users = [
        {
            id: 1,
            name: "John"
        },
        {
            id: 2,
            name: "Anna"
        },
        {
            id: 3,
            name: "Tom"
        }
    ];

    const userMap = users.reduce(
        (acc, user) => {
            acc[user.id] = user.name;

            return acc;
        },
        {}
    );

Результат:

    {
        1: "John",
        2: "Anna",
        3: "Tom"
    }

---

# Практичний приклад — permissions

    const roles = [
        {
            name: "admin",
            permissions: [
                "read",
                "write",
                "delete"
            ]
        },
        {
            name: "editor",
            permissions: [
                "read",
                "write"
            ]
        }
    ];

Отримати всі permissions:

    const permissions = roles.reduce(
        (acc, role) => {
            return acc.concat(role.permissions);
        },
        []
    );

Результат:

    [
        "read",
        "write",
        "delete",
        "read",
        "write"
    ]

Якщо потрібні унікальні permissions:

    const permissions = roles.reduce(
        (acc, role) => {
            role.permissions.forEach(permission => {
                acc.add(permission);
            });

            return acc;
        },
        new Set()
    );

---

# Reduce + filter + map

Не потрібно намагатися зробити все через `reduce()`.

Наприклад:

    const users = [
        {
            name: "John",
            age: 25
        },
        {
            name: "Anna",
            age: 17
        },
        {
            name: "Tom",
            age: 30
        }
    ];

Зрозумілий варіант:

    const names = users
        .filter(user => user.age >= 18)
        .map(user => user.name);

Результат:

    [
        "John",
        "Tom"
    ]

Це часто краще, ніж складний `reduce()`.

---

# Коли reduce() доречний

`reduce()` особливо доречний, коли потрібно:

    aggregate data
    calculate total
    count values
    group values
    build object
    build Map
    build Set
    accumulate state
    combine multiple values into one result

---

# Коли reduce() не потрібен

Не варто використовувати `reduce()` просто тому, що він "може все".

Наприклад:

    numbers.map(number => number * 2)

краще за:

    numbers.reduce(
        (acc, number) => {
            acc.push(number * 2);
            return acc;
        },
        []
    )

Для фільтрації:

    numbers.filter(number => number > 10)

краще за складний `reduce()`.

Для перевірки:

    numbers.some(number => number > 10)

краще за `reduce()`.

Для всіх:

    numbers.every(number => number > 10)

краще за `reduce()`.

Для пошуку:

    numbers.find(number => number > 10)

краще за `reduce()`.

---

# Reduce — не універсальна заміна

Запам'ятай:

    reduce()
        ≠
    replacement for every array method

Краще вибирати метод відповідно до наміру.

    forEach → execute
    map     → transform
    filter  → select
    find    → find one
    some    → at least one
    every   → all
    reduce  → accumulate

---

# Method Chaining

`reduce()` може бути частиною pipeline.

Наприклад:

    const numbers = [1, 2, 3, 4, 5];

    const result = numbers
        .filter(number => number % 2 === 0)
        .reduce(
            (sum, number) => sum + number,
            0
        );

Результат:

    6

Логіка:

    [1, 2, 3, 4, 5]
            ↓
        filter()
            ↓
        [2, 4]
            ↓
        reduce()
            ↓
        6

---

# Reduce та callback

У `reduce()` callback виконується для кожного елемента, але accumulator переходить від однієї ітерації до наступної.

Наприклад:

    [1, 2, 3]

    accumulator:
    
    0
    ↓
    1
    ↓
    3
    ↓
    6

Це і є accumulation.

---

# Reduce Mental Model

Не думай про `reduce()` тільки як про:

    "складення чисел"

Краще думати:

    many values
        ↓
    accumulator
        ↓
    one result

А accumulator може бути:

    number
    string
    object
    array
    Map
    Set

---

# Типові помилки

❌ Забути `return` accumulator.

    const result = numbers.reduce(
        (acc, number) => {
            acc + number;
        },
        0
    );

Потрібно:

    const result = numbers.reduce(
        (acc, number) => {
            return acc + number;
        },
        0
    );

---

❌ Неправильний initial value.

Для суми:

    0

Для множення:

    1

Для object:

    {}

Для array:

    []

Для Set:

    new Set()

Для Map:

    new Map()

---

❌ Не врахувати empty array.

    [].reduce(
        (acc, number) => acc + number
    );

Викличе `TypeError`.

Безпечніше:

    [].reduce(
        (acc, number) => acc + number,
        0
    );

---

❌ Плутати accumulator та currentValue.

    accumulator
        → результат попередніх ітерацій

    currentValue
        → поточний елемент

---

❌ Використовувати `reduce()` там, де `map()` простіший.

Погано:

    numbers.reduce(
        (acc, number) => {
            acc.push(number * 2);
            return acc;
        },
        []
    );

Краще:

    numbers.map(number => number * 2);

---

❌ Використовувати `reduce()` замість `filter()` без потреби.

Погано:

    numbers.reduce(
        (acc, number) => {
            if (number > 10) {
                acc.push(number);
            }

            return acc;
        },
        []
    );

Краще:

    numbers.filter(number => number > 10);

---

❌ Робити надто складний reduce.

Наприклад:

    const result = data.reduce(
        (acc, item) => {
            // дуже багато різної логіки
            ...
        },
        {}
    );

Якщо логіка стає важкою для читання, краще розділити pipeline на:

    filter()
    map()
    reduce()

або винести callback у named function.

---

# Readability

`reduce()` може бути дуже елегантним:

    const total = prices.reduce(
        (sum, price) => sum + price,
        0
    );

Але може стати важким:

    const result = data.reduce(
        (acc, item) => {
            // багато умов
            // багато mutation
            // багато вкладених конструкцій
            ...
        },
        {}
    );

Головне правило:

    readable code > clever code

---

# Performance

`reduce()` проходить масив послідовно.

Для простого reduce:

    O(n)

де:

    n = кількість елементів

Наприклад:

    numbers.reduce(
        (sum, number) => sum + number,
        0
    );

має:

    Time: O(n)

Для простого numeric accumulator:

    Space: O(1)

якщо не враховувати результат та інші зовнішні структури.

---

# Reduce та кілька проходів

Наприклад:

    const even = numbers.filter(number => number % 2 === 0);

    const doubled = even.map(number => number * 2);

Це два проходи.

Можна зробити одним `reduce()`:

    const result = numbers.reduce(
        (acc, number) => {
            if (number % 2 === 0) {
                acc.push(number * 2);
            }

            return acc;
        },
        []
    );

Це може мати performance benefit на великих масивах.

Але:

    один прохід
        ≠
    автоматично кращий код

Для звичайних задач читабельність часто важливіша.

---

# Reduce Complexity

Простий reduce:

    O(n)

Nested reduce або reduce із пошуком:

    O(n²)

може виникнути, якщо всередині callback виконується операція:

    find()
    includes()
    some()

над іншим масивом.

Тому важливо дивитися не тільки на сам `reduce()`, а й на операції всередині callback.

---

# Reduce та React

У React `reduce()` може використовуватися для підготовки даних.

Наприклад:

    const total = cart.reduce(
        (sum, item) => sum + item.price,
        0
    );

Потім:

    <p>Total: {total}</p>

Але для rendering списку зазвичай використовується:

    map()

а не `reduce()`.

---

# Reduce та Backend

У Node.js/Nest.js `reduce()` часто може бути корисним при обробці даних, отриманих із:

    PostgreSQL
    MongoDB
    REST API
    external API

Наприклад, після отримання записів:

    const total = orders.reduce(
        (sum, order) => sum + order.total,
        0
    );

---

# Reduce та Database Data

Наприклад:

    const rows = [
        {
            category: "books",
            amount: 100
        },
        {
            category: "books",
            amount: 150
        },
        {
            category: "games",
            amount: 200
        }
    ];

Можна згрупувати totals:

    const totals = rows.reduce(
        (acc, row) => {
            acc[row.category] =
                (acc[row.category] || 0) + row.amount;

            return acc;
        },
        {}
    );

Результат:

    {
        books: 250,
        games: 200
    }

---

# Reduce та SQL

Важливий практичний момент:

Якщо database вже може виконати aggregation, не завжди потрібно витягувати всі рядки в JavaScript і робити `reduce()`.

Наприклад, SQL може виконати:

    SUM()
    COUNT()
    AVG()
    MIN()
    MAX()
    GROUP BY

Тому потрібно розуміти, де краще виконати aggregation:

    Database
        ↓
    Backend
        ↓
    Frontend

Це вже питання архітектури та performance.

---

# Практичні patterns

## Sum

    const sum = numbers.reduce(
        (acc, number) => acc + number,
        0
    );

---

## Product

    const product = numbers.reduce(
        (acc, number) => acc * number,
        1
    );

---

## Count

    const count = numbers.reduce(
        (acc, number) => {
            return acc + (condition ? 1 : 0);
        },
        0
    );

---

## Maximum

    const max = numbers.reduce(
        (max, number) => {
            return number > max ? number : max;
        },
        numbers[0]
    );

---

## Minimum

    const min = numbers.reduce(
        (min, number) => {
            return number < min ? number : min;
        },
        numbers[0]
    );

---

## Group

    const grouped = items.reduce(
        (acc, item) => {
            const key = item.category;

            if (!acc[key]) {
                acc[key] = [];
            }

            acc[key].push(item);

            return acc;
        },
        {}
    );

---

## Frequency

    const counts = items.reduce(
        (acc, item) => {
            acc[item] = (acc[item] || 0) + 1;

            return acc;
        },
        {}
    );

---

## Index by ID

    const byId = items.reduce(
        (acc, item) => {
            acc[item.id] = item;

            return acc;
        },
        {}
    );

---

## Build Set

    const unique = items.reduce(
        (set, item) => {
            set.add(item);

            return set;
        },
        new Set()
    );

---

# Практичні вправи

## Exercise 1 — Sum

Дано:

    const numbers = [5, 10, 15, 20];

Знайти суму.

Рішення:

    const sum = numbers.reduce(
        (acc, number) => acc + number,
        0
    );

Результат:

    50

---

## Exercise 2 — Product

Дано:

    const numbers = [2, 3, 4];

Знайти добуток.

Рішення:

    const product = numbers.reduce(
        (acc, number) => acc * number,
        1
    );

Результат:

    24

---

## Exercise 3 — Count even

Дано:

    const numbers = [1, 2, 3, 4, 5, 6];

Порахувати парні числа.

Рішення:

    const count = numbers.reduce(
        (acc, number) => {
            return acc + (number % 2 === 0 ? 1 : 0);
        },
        0
    );

Результат:

    3

---

## Exercise 4 — Total cart

Дано:

    const cart = [
        {
            price: 100,
            quantity: 2
        },
        {
            price: 50,
            quantity: 3
        }
    ];

Знайти total.

Рішення:

    const total = cart.reduce(
        (total, item) => {
            return total + item.price * item.quantity;
        },
        0
    );

Результат:

    350

---

## Exercise 5 — Frequency

Дано:

    const fruits = [
        "apple",
        "banana",
        "apple",
        "orange",
        "banana",
        "apple"
    ];

Порахувати кількість кожного fruit.

Рішення:

    const counts = fruits.reduce(
        (acc, fruit) => {
            acc[fruit] = (acc[fruit] || 0) + 1;

            return acc;
        },
        {}
    );

Результат:

    {
        apple: 3,
        banana: 2,
        orange: 1
    }

---

## Exercise 6 — Group users

Дано:

    const users = [
        {
            name: "John",
            role: "admin"
        },
        {
            name: "Anna",
            role: "user"
        },
        {
            name: "Tom",
            role: "admin"
        }
    ];

Згрупувати users за role.

Рішення:

    const grouped = users.reduce(
        (acc, user) => {
            if (!acc[user.role]) {
                acc[user.role] = [];
            }

            acc[user.role].push(user);

            return acc;
        },
        {}
    );

---

# Питання зі співбесіди

Що таке `reduce()`?

Для чого використовується `reduce()`?

Що таке accumulator?

Що таке currentValue?

Які параметри отримує callback `reduce()`?

Що таке initialValue?

Навіщо потрібен `initialValue`?

Що відбувається, якщо не передати `initialValue`?

Що станеться з порожнім масивом без `initialValue`?

Що станеться з порожнім масивом із `initialValue`?

Що повертає `reduce()`?

Чи обов'язково результат `reduce()` має бути number?

Чи може `reduce()` повернути object?

Чи може `reduce()` повернути array?

Чи може `reduce()` повернути Set?

Чи може `reduce()` повернути Map?

Як знайти суму через `reduce()`?

Як знайти добуток?

Як порахувати кількість елементів?

Як знайти максимум?

Як знайти мінімум?

Як згрупувати масив об'єктів через `reduce()`?

Як створити object index за `id`?

Як створити frequency counter?

Чим `reduce()` відрізняється від `map()`?

Чим `reduce()` відрізняється від `filter()`?

Чим `reduce()` відрізняється від `forEach()`?

Коли `reduce()` краще не використовувати?

Чому `reduce()` не є універсальною заміною всіх array methods?

Що станеться, якщо callback `reduce()` не поверне accumulator?

Що визначає `initialValue`?

Що таке accumulation?

Що таке aggregation?

Яка time complexity простого `reduce()`?

---

# Шлях

## 🟢 Core

Обов'язково знати:

    reduce()

    accumulator
    currentValue
    initialValue

Розуміти:

    callback
    return
    accumulation
    final result

Вміти:

    sum
    product
    count
    max
    min

Розуміти:

    reduce() → many values → one result

---

## 🔵 Junior

Вміти працювати з:

    numbers
    strings
    objects
    arrays

Практичні задачі:

    sum
    count
    total
    grouping
    frequency counter
    indexing by id
    object creation
    array creation

Розуміти:

    accumulator type
    initialValue
    empty arrays
    callback parameters
    mutation of accumulator

Вміти комбінувати:

    filter()
    map()
    reduce()

Розуміти, коли:

    map()
    filter()
    find()
    some()
    every()

краще за `reduce()`.

---

## 🟠 Middle

Глибше розуміти:

    aggregation
    functional programming
    pure functions
    immutability
    accumulator mutation
    object accumulation
    Map accumulation
    Set accumulation

Розуміти:

    intermediate arrays
    one-pass algorithms
    time complexity
    space complexity
    performance trade-offs

Вміти:

    group data
    index data
    build lookup structures
    combine transformation + filtering
    process nested data

Розуміти різницю між:

    readable reduce
    over-engineered reduce

---

## 🔴 Senior

Глибоко розуміти:

    ECMAScript specification
    Array.prototype.reduce
    callback invocation
    sparse arrays
    accumulator semantics
    mutation vs immutability
    memory allocation
    JIT optimization
    algorithmic complexity
    data aggregation strategies

Розуміти trade-offs між:

    reduce()
    loops
    map()
    filter()
    iterators
    generators
    lazy evaluation

Розуміти, де aggregation краще виконувати:

    database
    backend
    frontend

Враховувати:

    CPU
    memory
    network
    database load
    readability
    maintainability

---

# Міні-шпаргалка

## reduce()

    const result = array.reduce(
        (accumulator, currentValue) => {
            return newAccumulator;
        },
        initialValue
    );

---

## Parameters

    accumulator
        ↓
    currentValue
        ↓
    currentIndex
        ↓
    array

---

## Accumulator

    accumulator
        ↓
    result from previous iteration
        ↓
    current iteration
        ↓
    new accumulator

---

## Sum

    const sum = numbers.reduce(
        (sum, number) => sum + number,
        0
    );

---

## Product

    const product = numbers.reduce(
        (result, number) => result * number,
        1
    );

---

## Count

    const count = numbers.reduce(
        (count, number) => {
            return count + (condition ? 1 : 0);
        },
        0
    );

---

## Object

    const result = items.reduce(
        (acc, item) => {
            acc[item.id] = item;

            return acc;
        },
        {}
    );

---

## Group

    const grouped = items.reduce(
        (acc, item) => {
            const key = item.category;

            if (!acc[key]) {
                acc[key] = [];
            }

            acc[key].push(item);

            return acc;
        },
        {}
    );

---

## Frequency

    const counts = items.reduce(
        (acc, item) => {
            acc[item] = (acc[item] || 0) + 1;

            return acc;
        },
        {}
    );

---

## Set

    const unique = items.reduce(
        (set, item) => {
            set.add(item);

            return set;
        },
        new Set()
    );

---

## Reduce Flow

    initialValue
         ↓
    accumulator
         ↓
    currentValue
         ↓
    callback
         ↓
    return new accumulator
         ↓
    next iteration
         ↓
       repeat
         ↓
    final result

---

# Основні правила

    reduce()
        → accumulate

    accumulator
        → result from previous step

    currentValue
        → current element

    initialValue
        → starting accumulator

    callback return
        → next accumulator

    reduce return
        → final accumulator

---

# Головне:

• `reduce()` проходить елементи масиву та накопичує результат.

• `accumulator` зберігає результат попередньої ітерації.

• `currentValue` — поточний елемент.

• Callback `reduce()` повинен повертати новий accumulator.

• `initialValue` задає початковий accumulator.

• Краще часто явно задавати `initialValue`.

• Без `initialValue` перший елемент масиву стає accumulator.

• Без `initialValue` `reduce()` на порожньому масиві викличе `TypeError`.

• З `initialValue` порожній масив може повернути початкове значення.

• `reduce()` може повертати не тільки number.

• Accumulator може бути:

    number
    string
    object
    array
    Set
    Map

• Найпростіша модель:

    many values
        ↓
    accumulator
        ↓
    one result

• `reduce()` чудово підходить для:

    sum
    product
    count
    total
    grouping
    frequency
    indexing
    aggregation

• `map()` краще використовувати для transformation.

• `filter()` краще використовувати для selection.

• `forEach()` краще використовувати для side effects.

• `reduce()` не потрібно використовувати тільки тому, що він може вирішити задачу.

• Якщо `map()`, `filter()`, `find()`, `some()` або `every()` чіткіше виражає намір, краще використати відповідний метод.

• Для object accumulator типовий шаблон:

    acc[key] = value;
    return acc;

• Для array accumulator типовий шаблон:

    acc.push(value);
    return acc;

• Для Set accumulator:

    acc.add(value);
    return acc;

• Для Map accumulator:

    acc.set(key, value);
    return acc;

• Типова модель sum:

    const sum = numbers.reduce(
        (acc, number) => acc + number,
        0
    );

• Типова модель grouping:

    const grouped = items.reduce(
        (acc, item) => {
            const key = item.category;

            if (!acc[key]) {
                acc[key] = [];
            }

            acc[key].push(item);

            return acc;
        },
        {}
    );

• Простий `reduce()` має зазвичай:

    Time: O(n)

• Найважливіша модель мислення:

    forEach → DO
    map     → TRANSFORM
    filter  → SELECT
    reduce  → ACCUMULATE

• `reduce()` — це не просто "метод для суми".

Його головна концепція:

    багато значень
          ↓
    послідовне накопичення
          ↓
    одне фінальне значення