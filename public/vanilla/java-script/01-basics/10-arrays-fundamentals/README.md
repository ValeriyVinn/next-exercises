## 10. Arrays Fundamentals

Array (масив) — це структура даних JavaScript, яка дозволяє зберігати впорядковану колекцію значень в одному об'єкті.

Наприклад:

    const fruits = ["apple", "banana", "orange"];

Array може містити:
- strings
- numbers
- booleans
- objects
- arrays
- functions
- інші JavaScript values.

Основна особливість array — кожен елемент має свій `index`, який починається з `0`.

    const fruits = ["apple", "banana", "orange"];

    index:
       0        1         2

    value:
    apple    banana    orange

Arrays є об'єктами JavaScript, але спеціально призначені для роботи з впорядкованими колекціями даних.

### Ключові поняття

✔ array
✔ element
✔ index
✔ zero-based indexing
✔ length
✔ array literal
✔ access
✔ update
✔ add element
✔ remove element
✔ `push()`
✔ `pop()`
✔ `shift()`
✔ `unshift()`
✔ `slice()`
✔ `splice()`
✔ iteration
✔ `for`
✔ `for...of`
✔ nested array
✔ array of objects
✔ array reference
✔ shallow copy
✔ spread operator
✔ destructuring
✔ mutable methods
✔ immutable operations

### Що потрібно пам'ятати

• Array — впорядкована колекція значень.

• Index array починається з `0`.

• Перший елемент має index `0`.

• Другий елемент має index `1`.

• Останній index завжди:

    length - 1

• `length` повертає кількість елементів.

• До елемента можна звернутися через:

    array[index]

• Array можна змінювати після створення.

• `push()` додає елемент у кінець.

• `pop()` видаляє останній елемент.

• `unshift()` додає елемент на початок.

• `shift()` видаляє перший елемент.

• `slice()` повертає частину array без зміни оригінального array.

• `splice()` може додавати, видаляти або замінювати елементи та змінює оригінальний array.

• Arrays є reference types.

• Дві змінні можуть посилатися на один і той самий array.

• Spread operator `...` дозволяє створити shallow copy array.

• Array може містити objects.

• Object може містити arrays.

• Array може містити інші arrays.

• Для перебору array можна використовувати `for`, `for...of` та інші способи.

• Методи `map()`, `filter()`, `reduce()`, `find()` тощо будуть детальніше вивчатися у:

    02-array-methods

### Основні терміни

**Array**

Упорядкована колекція значень.

    const numbers = [10, 20, 30];

**Element**

Окреме значення всередині array.

    const numbers = [10, 20, 30];

Тут:

    10
    20
    30

є elements.

**Index**

Позиція element в array.

    const numbers = [10, 20, 30];

    10 → index 0
    20 → index 1
    30 → index 2

**Zero-Based Indexing**

Нумерація елементів починається з `0`.

    const fruits = ["apple", "banana", "orange"];

    fruits[0]
    // apple

    fruits[1]
    // banana

    fruits[2]
    // orange

**Length**

Кількість elements в array.

    const numbers = [10, 20, 30];

    console.log(numbers.length);
    // 3

**Array Literal**

Створення array за допомогою `[]`.

    const numbers = [1, 2, 3];

### Створення Array

Найчастіше array створюється через array literal:

    const fruits = ["apple", "banana", "orange"];

Порожній array:

    const items = [];

Пізніше можна додавати elements:

    items.push("Book");
    items.push("Laptop");

### Array з різними типами

JavaScript array може містити різні типи значень.

    const data = [
        "Valeriy",
        56,
        true,
        null
    ];

Але в реальному коді зазвичай краще зберігати в одному array логічно пов'язані значення.

### Array з Objects

Дуже поширений випадок:

    const users = [
        {
            id: 1,
            name: "Valeriy"
        },
        {
            id: 2,
            name: "Anna"
        }
    ];

Це називається:

    array of objects

Такий формат дуже часто використовується при роботі з API та databases.

### Доступ до Element

Доступ здійснюється через index:

    const fruits = ["apple", "banana", "orange"];

    console.log(fruits[0]);
    // apple

    console.log(fruits[1]);
    // banana

    console.log(fruits[2]);
    // orange

### Зміна Element

Element можна змінити через index:

    const fruits = ["apple", "banana", "orange"];

    fruits[1] = "mango";

Тепер:

    ["apple", "mango", "orange"]

### Отримання останнього Element

Останній element:

    const fruits = ["apple", "banana", "orange"];

    console.log(fruits[fruits.length - 1]);
    // orange

У сучасному JavaScript також можна використовувати:

    console.log(fruits.at(-1));
    // orange

### Index за межами Array

Якщо index не існує:

    const fruits = ["apple", "banana"];

    console.log(fruits[10]);
    // undefined

### Length

`length` показує кількість елементів.

    const fruits = ["apple", "banana", "orange"];

    console.log(fruits.length);
    // 3

Для порожнього array:

    const items = [];

    console.log(items.length);
    // 0

### Додавання в кінець — push()

`push()` додає один або декілька elements у кінець.

    const fruits = ["apple", "banana"];

    fruits.push("orange");

Тепер:

    ["apple", "banana", "orange"]

Можна додати декілька:

    fruits.push("mango", "kiwi");

### push() повертає length

    const fruits = ["apple", "banana"];

    const result = fruits.push("orange");

    console.log(result);
    // 3

`push()` змінює array та повертає його нову довжину.

### Видалення з кінця — pop()

`pop()` видаляє останній element.

    const fruits = ["apple", "banana", "orange"];

    const removed = fruits.pop();

    console.log(removed);
    // orange

Тепер:

    ["apple", "banana"]

`pop()` повертає видалений element.

### Додавання на початок — unshift()

    const fruits = ["banana", "orange"];

    fruits.unshift("apple");

Тепер:

    ["apple", "banana", "orange"]

`unshift()` змінює array.

### Видалення з початку — shift()

    const fruits = ["apple", "banana", "orange"];

    const removed = fruits.shift();

    console.log(removed);
    // apple

Тепер:

    ["banana", "orange"]

### Основні операції

Можна запам'ятати:

    push()
       ↓
    add to end

    pop()
       ↓
    remove from end

    unshift()
       ↓
    add to beginning

    shift()
       ↓
    remove from beginning

Ментальна модель:

    BEGINNING                         END
        │                              │
        ▼                              ▼
    [ apple, banana, orange, mango ]
        ▲                              ▲
        │                              │
      shift                           pop
      remove                          remove

    unshift                         push
      add                             add

### Перебір Array через for

Класичний спосіб:

    const numbers = [10, 20, 30];

    for (let i = 0; i < numbers.length; i++) {
        console.log(numbers[i]);
    }

Результат:

    10
    20
    30

Тут `i` — index.

### Перебір через for...of

Для отримання безпосередньо values:

    const fruits = ["apple", "banana", "orange"];

    for (const fruit of fruits) {
        console.log(fruit);
    }

Результат:

    apple
    banana
    orange

### Index і value одночасно

Можна використовувати `entries()`:

    const fruits = ["apple", "banana", "orange"];

    for (const [index, fruit] of fruits.entries()) {
        console.log(index, fruit);
    }

Результат:

    0 "apple"
    1 "banana"
    2 "orange"

### Nested Arrays

Array може містити arrays:

    const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

Доступ:

    matrix[0][0]
    // 1

    matrix[1][2]
    // 6

    matrix[2][1]
    // 8

Ментальна модель:

    matrix
    │
    ├── row 0 → [1, 2, 3]
    ├── row 1 → [4, 5, 6]
    └── row 2 → [7, 8, 9]

### Array of Objects

    const users = [
        {
            id: 1,
            name: "Valeriy",
            age: 56
        },
        {
            id: 2,
            name: "Anna",
            age: 30
        }
    ];

Доступ:

    users[0].name;
    // Valeriy

    users[1].age;
    // 30

### Зміна Object всередині Array

    const users = [
        {
            name: "Valeriy",
            age: 56
        }
    ];

    users[0].age = 57;

Тепер:

    users[0].age
    // 57

### slice()

`slice()` повертає копію частини array.

    const fruits = [
        "apple",
        "banana",
        "orange",
        "mango"
    ];

    const result = fruits.slice(1, 3);

Результат:

    ["banana", "orange"]

Оригінальний array не змінюється:

    fruits
    // ["apple", "banana", "orange", "mango"]

Синтаксис:

    array.slice(start, end)

`end` не включається.

### slice() без параметрів

Можна створити shallow copy:

    const fruits = ["apple", "banana", "orange"];

    const copy = fruits.slice();

### splice()

`splice()` змінює оригінальний array.

Синтаксис:

    array.splice(start, deleteCount, item1, item2, ...)

Наприклад видалення:

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    fruits.splice(1, 1);

Тепер:

    ["apple", "orange"]

### splice() — додавання

    const fruits = [
        "apple",
        "orange"
    ];

    fruits.splice(1, 0, "banana");

Тепер:

    ["apple", "banana", "orange"]

### splice() — заміна

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    fruits.splice(1, 1, "mango");

Тепер:

    ["apple", "mango", "orange"]

### slice vs splice

`slice()`:

    не змінює original array
    повертає новий array

`splice()`:

    змінює original array
    може add / remove / replace

Запам'ятати:

    slice
      ↓
    copy / extract
      ↓
    original не змінюється

    splice
      ↓
    modify
      ↓
    original змінюється

### concat()

`concat()` об'єднує arrays.

    const first = [1, 2];
    const second = [3, 4];

    const result = first.concat(second);

Результат:

    [1, 2, 3, 4]

Сучасний альтернативний варіант:

    const result = [
        ...first,
        ...second
    ];

### Spread Operator

Spread `...` дозволяє розгорнути elements array.

    const numbers = [1, 2, 3];

    const copy = [...numbers];

Тепер створено новий array.

### Array Reference

Arrays є reference types.

    const first = [1, 2, 3];

    const second = first;

    second.push(4);

Тепер:

    console.log(first);
    // [1, 2, 3, 4]

    console.log(second);
    // [1, 2, 3, 4]

Ментальна модель:

    first  ──┐
             ├──► [1, 2, 3, 4]
    second ──┘

Обидві змінні посилаються на один array.

### Array Copy

Щоб створити новий array:

    const first = [1, 2, 3];

    const second = [...first];

Тепер:

    first !== second

і зміна `second` не змінює `first` на першому рівні.

    second.push(4);

    console.log(first);
    // [1, 2, 3]

    console.log(second);
    // [1, 2, 3, 4]

### Array Comparison

Два arrays з однаковими значеннями не рівні через `===`.

    const first = [1, 2, 3];
    const second = [1, 2, 3];

    console.log(first === second);
    // false

Це різні objects.

Якщо reference однаковий:

    const first = [1, 2, 3];
    const second = first;

    console.log(first === second);
    // true

### Destructuring Array

Array destructuring дозволяє отримувати elements у змінні.

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    const [first, second, third] = fruits;

Тепер:

    first
    // apple

    second
    // banana

    third
    // orange

### Пропуск Element у Destructuring

Можна пропустити element:

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    const [first, , third] = fruits;

Тепер:

    first
    // apple

    third
    // orange

### Rest у Array Destructuring

    const numbers = [1, 2, 3, 4, 5];

    const [first, second, ...rest] = numbers;

Результат:

    first
    // 1

    second
    // 2

    rest
    // [3, 4, 5]

### Array.isArray()

Для перевірки, чи є значення array, використовується:

    Array.isArray(value)

Приклад:

    const numbers = [1, 2, 3];

    console.log(Array.isArray(numbers));
    // true

    console.log(Array.isArray("hello"));
    // false

Важливо:

    typeof []

повертає:

    "object"

Тому для перевірки array потрібно використовувати:

    Array.isArray()

### Array як Object

У JavaScript array є спеціальним типом object.

    typeof [1, 2, 3]
    // "object"

Але array має спеціальні властивості та methods для роботи з впорядкованими колекціями.

### Mutable Array Methods

Mutable methods змінюють original array.

Основні:

    push()
    pop()
    shift()
    unshift()
    splice()
    sort()
    reverse()

Наприклад:

    const numbers = [3, 1, 2];

    numbers.reverse();

Тепер:

    [2, 1, 3]

Original array змінено.

### Immutable Operations

Деякі операції створюють новий array замість зміни original.

Наприклад:

    const numbers = [1, 2, 3];

    const copy = [...numbers];

Або:

    const first = [1, 2];
    const second = [3, 4];

    const combined = [...first, ...second];

Такі підходи особливо важливі в React та Redux.

### forEach()

`forEach()` дозволяє виконати функцію для кожного element.

    const numbers = [1, 2, 3];

    numbers.forEach(number => {
        console.log(number);
    });

На цьому етапі достатньо розуміти загальний принцип.

Детальніше `forEach()` та інші array methods будуть у:

    02-array-methods

### map()

`map()` створює новий array на основі існуючого.

    const numbers = [1, 2, 3];

    const doubled = numbers.map(number => {
        return number * 2;
    });

Результат:

    [2, 4, 6]

Детальніше:

    02-array-methods

### filter()

`filter()` створює array з elements, які відповідають умові.

    const numbers = [1, 2, 3, 4, 5];

    const evenNumbers = numbers.filter(number => {
        return number % 2 === 0;
    });

Результат:

    [2, 4]

Детальніше:

    02-array-methods

### find()

`find()` знаходить перший element, який відповідає умові.

    const numbers = [10, 20, 30];

    const result = numbers.find(number => number > 15);

    console.log(result);
    // 20

Детальніше:

    02-array-methods

### Arrays та Functions

Array часто передається у function.

    function printItems(items) {
        for (const item of items) {
            console.log(item);
        }
    }

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    printItems(fruits);

Function також може повертати array:

    function createNumbers() {
        return [1, 2, 3, 4, 5];
    }

    const numbers = createNumbers();

### Arrays та Objects

Це одна з найважливіших комбінацій JavaScript.

    const users = [
        {
            id: 1,
            name: "Valeriy"
        },
        {
            id: 2,
            name: "Anna"
        }
    ];

Ментальна модель:

    Array
    │
    ├── Object
    │    ├── id
    │    └── name
    │
    └── Object
         ├── id
         └── name

Це дуже поширена структура даних у REST API.

### Arrays та JSON

JSON часто містить arrays.

Наприклад:

    [
        {
            "id": 1,
            "name": "Valeriy"
        },
        {
            "id": 2,
            "name": "Anna"
        }
    ]

Після `JSON.parse()` це стає JavaScript array of objects.

    const users = JSON.parse(json);

### Практичні приклади

#### 1. Список фруктів

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    console.log(fruits[0]);
    // apple

#### 2. Додати фрукт

    const fruits = [
        "apple",
        "banana"
    ];

    fruits.push("orange");

#### 3. Видалити останній фрукт

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    const removed = fruits.pop();

    console.log(removed);
    // orange

#### 4. Додати на початок

    const fruits = [
        "banana",
        "orange"
    ];

    fruits.unshift("apple");

#### 5. Видалити з початку

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    fruits.shift();

#### 6. Порахувати суму

    const numbers = [10, 20, 30, 40];

    let sum = 0;

    for (const number of numbers) {
        sum += number;
    }

    console.log(sum);
    // 100

#### 7. Знайти найбільше число

    const numbers = [10, 50, 20, 80, 30];

    let max = numbers[0];

    for (const number of numbers) {
        if (number > max) {
            max = number;
        }
    }

    console.log(max);
    // 80

#### 8. Порахувати парні числа

    const numbers = [1, 2, 3, 4, 5, 6];

    let count = 0;

    for (const number of numbers) {
        if (number % 2 === 0) {
            count++;
        }
    }

    console.log(count);
    // 3

#### 9. Array of Objects

    const users = [
        {
            id: 1,
            name: "Valeriy",
            age: 56
        },
        {
            id: 2,
            name: "Anna",
            age: 30
        }
    ];

    for (const user of users) {
        console.log(user.name);
    }

#### 10. Копія Array

    const numbers = [1, 2, 3];

    const copy = [...numbers];

    copy.push(4);

    console.log(numbers);
    // [1, 2, 3]

    console.log(copy);
    // [1, 2, 3, 4]

#### 11. Об'єднання Arrays

    const frontend = [
        "HTML",
        "CSS",
        "JavaScript"
    ];

    const backend = [
        "Node.js",
        "PostgreSQL"
    ];

    const skills = [
        ...frontend,
        ...backend
    ];

    console.log(skills);

#### 12. Destructuring

    const user = [
        "Valeriy",
        56,
        "Ukraine"
    ];

    const [name, age, country] = user;

    console.log(name);
    // Valeriy

    console.log(age);
    // 56

    console.log(country);
    // Ukraine

#### 13. Nested Array

    const matrix = [
        [1, 2],
        [3, 4]
    ];

    console.log(matrix[0][1]);
    // 2

    console.log(matrix[1][0]);
    // 3

#### 14. Array як аргумент function

    function calculateTotal(numbers) {
        let total = 0;

        for (const number of numbers) {
            total += number;
        }

        return total;
    }

    const numbers = [10, 20, 30];

    console.log(calculateTotal(numbers));
    // 60

### Як мислити про Array

Корисна ментальна модель:

    Array
      │
      ├── index 0 → value
      ├── index 1 → value
      ├── index 2 → value
      └── index 3 → value

Наприклад:

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

Ментально:

    index
      0          1          2
      ↓          ↓          ↓
    apple     banana     orange

### Array і позиція

Для array важлива саме позиція.

    const colors = [
        "red",
        "green",
        "blue"
    ];

    colors[0]
    // red

    colors[1]
    // green

    colors[2]
    // blue

Тому array добре підходить для:

    lists
    collections
    sequences
    ordered data

### Array і Object — різниця

Array:

    const users = [
        "Valeriy",
        "Anna",
        "John"
    ];

Головне:

    position / index

Object:

    const user = {
        name: "Valeriy",
        age: 56
    };

Головне:

    property / key

Ментальна модель:

    Array
      ↓
    ordered collection
      ↓
    index

    Object
      ↓
    named properties
      ↓
    key

### Типові помилки

❌ Забувати, що index починається з `0`.

    const fruits = ["apple", "banana"];

    fruits[1]
    // banana

❌ Намагатися отримати останній element через:

    fruits[fruits.length]

Правильно:

    fruits[fruits.length - 1]

або:

    fruits.at(-1)

❌ Плутати `length` з останнім index.

Якщо:

    const numbers = [10, 20, 30];

то:

    length → 3
    last index → 2

❌ Плутати `slice()` і `splice()`.

    slice()
    → не змінює original

    splice()
    → змінює original

❌ Вважати, що:

    const copy = array;

створює копію.

Насправді це той самий reference.

❌ Вважати spread deep copy.

    const copy = [...array];

Це shallow copy.

❌ Порівнювати arrays через `===` за їхнім вмістом.

    [1, 2] === [1, 2]
    // false

❌ Використовувати `delete` для видалення element.

Наприклад:

    delete numbers[1];

Це залишить hole в array і зазвичай не є правильним способом видалення element.

Для структурного видалення використовують:

    splice()

або відповідні array methods.

❌ Плутати `push()` та `unshift()`.

    push()
    → кінець

    unshift()
    → початок

❌ Плутати `pop()` та `shift()`.

    pop()
    → видаляє з кінця

    shift()
    → видаляє з початку

❌ Змінювати original array, коли потрібна immutable operation.

Особливо це важливо в React / Redux.

### Питання зі співбесіди

Що таке array?

Чим array відрізняється від object?

Що таке index?

З якого числа починається index array?

Що таке zero-based indexing?

Що таке `length`?

Як отримати перший element?

Як отримати останній element?

Що робить `push()`?

Що робить `pop()`?

Що робить `shift()`?

Що робить `unshift()`?

Яка різниця між `push()` та `unshift()`?

Яка різниця між `pop()` та `shift()`?

Що робить `slice()`?

Що робить `splice()`?

Яка різниця між `slice()` та `splice()`?

Що таке array reference?

Чому:

    [1, 2, 3] === [1, 2, 3]

повертає `false`?

Як створити копію array?

Що таке shallow copy?

Чи є spread operator deep copy?

Що робить `Array.isArray()`?

Чому:

    typeof []

повертає `"object"`?

Що таке array of objects?

Що таке nested array?

Що таке array destructuring?

Що таке spread operator?

Які array methods змінюють original array?

Які array methods створюють новий array?

У чому різниця між array та object?

### Шлях

🟢 **Core (обов'язково знати)**

Що таке array.

Створення array.

Array literal `[]`.

Elements.

Index.

Zero-based indexing.

`length`.

Доступ через index.

Зміна element.

`push()`.

`pop()`.

`shift()`.

`unshift()`.

Перебір через `for`.

Перебір через `for...of`.

Основи array of objects.

Основи nested arrays.

---

🔵 **Junior**

`slice()`.

`splice()`.

`concat()`.

Spread operator.

Array destructuring.

Rest у destructuring.

`Array.isArray()`.

Array reference.

Array copy.

Shallow copy.

Mutable vs immutable operations.

`forEach()`.

`map()`.

`filter()`.

`find()`.

`some()`.

`every()`.

`reduce()`.

Робота з array of objects.

Робота з JSON arrays.

Arrays у REST API.

---

🟠 **Middle**

Глибоке розуміння reference behavior.

Shallow copy vs deep copy.

Immutable data manipulation.

Nested data structures.

Advanced destructuring.

Advanced spread/rest.

Array iteration protocols.

Iterators.

Generators.

Array-like objects.

Typed arrays.

Performance array operations.

Complexity основних array operations.

Efficient data transformation.

Normalization data.

Arrays у state management.

Arrays у React / Redux.

---

🔴 **Senior**

JavaScript Array internals.

Array exotic objects.

Sparse arrays.

Dense vs sparse arrays.

Array-like structures.

TypedArray.

ArrayBuffer.

Memory representation.

Time complexity array operations.

Performance optimization.

Functional data transformation.

Immutable data structures.

Persistent data structures.

Custom iterators.

Generators.

Advanced collection design.

Trade-offs між arrays, objects, Map та Set.

Data structures selection.

### Міні-шпаргалка

Create:

    const numbers = [1, 2, 3];

Access:

    numbers[0]

Last:

    numbers[numbers.length - 1]

    numbers.at(-1)

Length:

    numbers.length

Add to end:

    numbers.push(4);

Remove from end:

    numbers.pop();

Add to beginning:

    numbers.unshift(0);

Remove from beginning:

    numbers.shift();

Copy:

    const copy = [...numbers];

Slice:

    const part = numbers.slice(1, 3);

Splice:

    numbers.splice(1, 1);

Combine:

    const result = [...first, ...second];

Destructuring:

    const [first, second] = numbers;

Check array:

    Array.isArray(numbers);

Loop:

    for (const number of numbers) {
        console.log(number);
    }

Index + value:

    for (const [index, value] of numbers.entries()) {
        console.log(index, value);
    }

Array of objects:

    const users = [
        {
            id: 1,
            name: "Valeriy"
        },
        {
            id: 2,
            name: "Anna"
        }
    ];

Основна модель:

    Array
    │
    ├── index 0 → element
    ├── index 1 → element
    ├── index 2 → element
    └── index 3 → element

Основні операції:

    BEGINNING                     END
         │                         │
       shift                      pop
       remove                     remove

      unshift                     push
         add                        add

slice vs splice:

    slice
      ↓
    extract / copy
      ↓
    original не змінюється

    splice
      ↓
    add / remove / replace
      ↓
    original змінюється

Reference:

    const a = [1, 2, 3];
    const b = a;

    a === b;
    // true

Copy:

    const a = [1, 2, 3];
    const b = [...a];

    a === b;
    // false

### Головне:

• Array — впорядкована колекція значень.

• Array elements мають indexes.

• Index починається з `0`.

• Перший element має index `0`.

• Останній index:

    length - 1

• `length` показує кількість elements.

• Доступ до element:

    array[index]

• `push()` додає element у кінець.

• `pop()` видаляє element з кінця.

• `unshift()` додає element на початок.

• `shift()` видаляє element з початку.

• `slice()` не змінює original array.

• `splice()` змінює original array.

• Arrays є reference types.

• `const copy = array` не створює копію.

• Spread `...` створює shallow copy.

• `Array.isArray()` використовується для перевірки array.

• Array може містити objects.

• Object може містити arrays.

• Array може містити інші arrays.

• Array of objects — одна з найпоширеніших структур даних у web applications.

• Arrays широко використовуються для списків, API responses, database records, state та collections.

• `for`, `for...of` та array methods дозволяють перебирати та обробляти elements.

• `map()`, `filter()`, `reduce()`, `find()` та інші array methods детальніше вивчаються у `02-array-methods`.

• Розуміння arrays є фундаментом для роботи з даними у JavaScript, React, Node.js та REST API.