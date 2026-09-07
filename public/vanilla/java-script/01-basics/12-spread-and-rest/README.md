# 12. Spread and Rest

`Spread` (`...`) та `Rest` (`...`) використовують один і той самий синтаксис:

    ...

Але вони виконують **різні функції**.

    Spread → розгортає / розпаковує значення
    Rest   → збирає / пакує значення

Це важлива тема JavaScript, яка тісно пов'язана з:

- arrays
- objects
- functions
- parameters
- arguments
- destructuring
- копіюванням даних
- immutable-підходом

---

# Ключова ідея

Один синтаксис `...` має два основних значення.

### Spread

Розгортає елементи або властивості:

    const numbers = [1, 2, 3];

    const copy = [...numbers];

Результат:

    [1, 2, 3]

Можна мислити:

    ...array → "розкласти елементи сюди"

---

### Rest

Збирає декілька значень в одну структуру:

    function sum(...numbers) {
        console.log(numbers);
    }

    sum(10, 20, 30);

Результат:

    [10, 20, 30]

Можна мислити:

    ...parameters → "зібрати всі аргументи сюди"

---

# Ключові поняття

✔ `...`

✔ spread syntax

✔ rest syntax

✔ spread in arrays

✔ spread in objects

✔ spread in function calls

✔ rest parameters

✔ rest in destructuring

✔ shallow copy

✔ array merging

✔ object merging

✔ iterable

✔ own enumerable properties

✔ function arguments

✔ `...args`

✔ `...rest`

---

# Що потрібно пам'ятати

• `...` — це один синтаксис для двох різних механізмів.

• `Spread` розгортає значення.

• `Rest` збирає значення.

• У масивах `...` може розгортати iterable.

• У виклику функції `...` розгортає iterable в окремі аргументи.

• В об'єктах `...` копіює own enumerable properties.

• Rest parameters збирають аргументи функції в масив.

• Rest parameter повинен бути останнім параметром.

• Spread створює новий масив або об'єкт, але копіювання є поверхневим (`shallow copy`).

• Вкладені objects та arrays не копіюються рекурсивно.

• Spread не є deep clone.

• Rest у destructuring дозволяє зібрати "решту" значень.

---

# Spread Syntax

## Spread в Array

Spread дозволяє розгорнути елементи одного масиву в інший.

    const numbers = [1, 2, 3];

    const result = [...numbers];

Результат:

    [1, 2, 3]

Без spread:

    const result = [numbers];

Результат:

    [[1, 2, 3]]

Тобто:

    [numbers]
    
означає:

    array
      └── numbers array

А:

    [...numbers]

означає:

    array
      ├── 1
      ├── 2
      └── 3

---

# Spread для копіювання Array

Один із найпоширеніших випадків:

    const numbers = [1, 2, 3];

    const copy = [...numbers];

Тепер:

    numbers !== copy

Але значення однакові:

    copy
    // [1, 2, 3]

Це створює **новий array**.

---

## Перевірка

    const numbers = [1, 2, 3];
    const copy = [...numbers];

    console.log(numbers === copy);
    // false

Це важливо:

    [...numbers] → new array

---

# Spread для об'єднання Array

Можна об'єднати декілька масивів:

    const first = [1, 2, 3];
    const second = [4, 5, 6];

    const result = [...first, ...second];

Результат:

    [1, 2, 3, 4, 5, 6]

Ще приклад:

    const fruits = ["apple", "banana"];
    const vegetables = ["carrot", "potato"];

    const food = [
        ...fruits,
        ...vegetables
    ];

Результат:

    [
        "apple",
        "banana",
        "carrot",
        "potato"
    ]

---

# Spread можна комбінувати зі звичайними значеннями

Наприклад:

    const numbers = [2, 3];

    const result = [
        1,
        ...numbers,
        4
    ];

Результат:

    [1, 2, 3, 4]

Ще:

    const result = [
        "start",
        ...numbers,
        "end"
    ];

Результат:

    ["start", 2, 3, "end"]

---

# Spread і вставка Array

Можна вставити один масив всередину іншого:

    const middle = [2, 3];

    const result = [
        1,
        ...middle,
        4
    ];

Результат:

    [1, 2, 3, 4]

Без spread:

    [1, middle, 4]

Результат:

    [1, [2, 3], 4]

Тобто spread прибирає один рівень вкладеності.

---

# Spread і Strings

Рядки є iterable.

Тому їх можна розгорнути в масив:

    const word = "hello";

    const letters = [...word];

Результат:

    ["h", "e", "l", "l", "o"]

Це можливо тому, що `string` підтримує iteration protocol.

---

# Spread і Set

`Set` також є iterable.

    const numbers = new Set([1, 2, 3]);

    const array = [...numbers];

Результат:

    [1, 2, 3]

Spread часто використовується для перетворення iterable на array.

---

# Spread і Map

`Map` також є iterable.

    const map = new Map([
        ["name", "John"],
        ["age", 25]
    ]);

    const entries = [...map];

Результат:

    [
        ["name", "John"],
        ["age", 25]
    ]

---

# Iterable

Spread в array працює з iterable values.

Наприклад:

    [..."hello"]

    [...new Set([1, 2, 3])]

    [...new Map([
        ["a", 1],
        ["b", 2]
    ])]

Основні iterable, які варто знати:

    String
    Array
    Set
    Map

---

# Spread у Function Call

Spread можна використовувати під час виклику функції.

Наприклад:

    const numbers = [10, 20, 30];

    Math.max(...numbers);

Результат:

    30

Без spread:

    Math.max(numbers);

Тут функція отримала б один аргумент — сам array.

З spread:

    Math.max(...numbers);

це концептуально схоже на:

    Math.max(10, 20, 30)

---

# Spread для передачі Array як аргументів

Наприклад:

    function add(a, b, c) {
        return a + b + c;
    }

    const numbers = [10, 20, 30];

    add(...numbers);

Фактично:

    add(10, 20, 30);

Результат:

    60

---

# Spread у Function Call

Загальна форма:

    functionName(...iterable);

Наприклад:

    const values = [1, 2, 3];

    console.log(...values);

Це приблизно:

    console.log(1, 2, 3);

---

# Spread у Object

Spread можна використовувати з object literals:

    const user = {
        name: "John",
        age: 25
    };

    const copy = {
        ...user
    };

Результат:

    {
        name: "John",
        age: 25
    }

Створюється новий object.

---

# Копіювання Object

    const user = {
        name: "John",
        age: 25
    };

    const copy = { ...user };

Перевірка:

    console.log(user === copy);
    // false

Отже:

    { ...user } → new object

---

# Object Spread

Spread розгортає властивості object:

    const user = {
        name: "John",
        age: 25
    };

    const result = {
        ...user,
        isActive: true
    };

Результат:

    {
        name: "John",
        age: 25,
        isActive: true
    }

---

# Додавання властивостей

Наприклад:

    const user = {
        name: "John"
    };

    const updatedUser = {
        ...user,
        age: 25
    };

Результат:

    {
        name: "John",
        age: 25
    }

Оригінальний object не змінюється.

---

# Перезапис властивостей

Порядок має значення.

    const user = {
        name: "John",
        age: 25
    };

    const updatedUser = {
        ...user,
        age: 26
    };

Результат:

    {
        name: "John",
        age: 26
    }

Пізніша властивість перезаписує попередню.

---

# Порядок Spread

Наприклад:

    const user = {
        name: "John",
        age: 25
    };

    const result = {
        age: 30,
        ...user
    };

Результат:

    {
        age: 25,
        name: "John"
    }

Тому:

    {
        ...object,
        property: newValue
    }

часто використовується для оновлення властивості.

---

# Об'єднання Objects

    const user = {
        name: "John"
    };

    const details = {
        age: 25,
        city: "Kyiv"
    };

    const result = {
        ...user,
        ...details
    };

Результат:

    {
        name: "John",
        age: 25,
        city: "Kyiv"
    }

---

# Конфлікт властивостей

    const first = {
        name: "John",
        age: 25
    };

    const second = {
        name: "Peter"
    };

    const result = {
        ...first,
        ...second
    };

Результат:

    {
        name: "Peter",
        age: 25
    }

Останнє значення перемагає.

Можна мислити:

    left → default
    right → override

---

# Spread і Shallow Copy

Spread створює **shallow copy**.

Наприклад:

    const user = {
        name: "John",
        address: {
            city: "Kyiv"
        }
    };

    const copy = {
        ...user
    };

Зовнішній object новий:

    user !== copy

Але вкладений object той самий:

    user.address === copy.address

Тому:

    copy.address.city = "Lviv";

змінить також:

    user.address.city

---

# Візуальна модель Shallow Copy

    user
      │
      ├── name → "John"
      │
      └── address ─────┐
                       ↓
                    { city: "Kyiv" }

Після:

    const copy = { ...user };

маємо:

    user
      │
      ├── name → "John"
      │
      └── address ─────┐
                       ↓
                    { city: "Kyiv" }
                       
    copy
      │
      ├── name → "John"
      │
      └── address ─────┘
                       ↑
                    same object

Тобто зовнішній object новий, а вкладений reference спільний.

---

# Spread ≠ Deep Clone

Не потрібно думати:

    { ...object }

як про повне копіювання всіх вкладених даних.

Це:

    shallow copy

а не:

    deep copy

---

# Rest Syntax

Rest використовується для збору декількох значень.

Найчастіше — у функціях.

    function sum(...numbers) {
        console.log(numbers);
    }

    sum(1, 2, 3);

Результат:

    [1, 2, 3]

---

# Rest Parameters

`...numbers` — це rest parameter.

    function sum(...numbers) {
        return numbers;
    }

Виклик:

    sum(10, 20, 30);

Отримуємо:

    [10, 20, 30]

Тобто:

    ...numbers

збирає всі передані аргументи в array.

---

# Rest Parameters і Arguments

Сучасний підхід:

    function sum(...numbers) {
        console.log(numbers);
    }

Старий спеціальний механізм:

    function sum() {
        console.log(arguments);
    }

Rest parameters зручніші та зрозуміліші.

Наприклад:

    function sum(...numbers) {
        return numbers.reduce(
            (total, number) => total + number,
            0
        );
    }

    sum(1, 2, 3, 4);

Результат:

    10

---

# Rest Parameter повинен бути останнім

Правильно:

    function example(a, b, ...rest) {
        // ...
    }

Неправильно:

    function example(...rest, a) {
        // SyntaxError
    }

Rest означає:

    "збери всі залишкові аргументи"

Тому після нього вже не може бути звичайного параметра.

---

# Rest після звичайних параметрів

    function greet(greeting, ...names) {
        console.log(greeting);
        console.log(names);
    }

    greet(
        "Hello",
        "John",
        "Peter",
        "Mary"
    );

Результат:

    greeting
    // "Hello"

    names
    // ["John", "Peter", "Mary"]

---

# Rest може зібрати нуль аргументів

    function test(...values) {
        console.log(values);
    }

    test();

Результат:

    []

Rest parameter завжди створює array.

---

# Rest у Destructuring Array

Rest можна використовувати не тільки у функціях.

Наприклад:

    const numbers = [1, 2, 3, 4, 5];

    const [first, ...rest] = numbers;

Результат:

    first
    // 1

    rest
    // [2, 3, 4, 5]

Тут `...rest` збирає всі залишкові елементи.

---

# Rest у Destructuring Object

Також можна використовувати rest з objects.

    const user = {
        name: "John",
        age: 25,
        city: "Kyiv"
    };

    const {
        name,
        ...rest
    } = user;

Результат:

    name
    // "John"

    rest
    // {
    //     age: 25,
    //     city: "Kyiv"
    // }

---

# Rest Object

Це означає:

    const {
        name,
        ...rest
    } = user;

взяти:

    name

а всі інші властивості:

    ...rest

зібрати в новий object.

---

# Spread vs Rest

Це одна з головних речей, яку потрібно запам'ятати.

| Spread | Rest |
|---|---|
| розгортає | збирає |
| unpack | collect |
| array/object literals | parameters/destructuring |
| `...array` | `...args` |
| `...object` | `...rest` |
| багато → окремі значення | багато → одна структура |

---

# Візуально

Spread:

    [ ...[1, 2, 3] ]

перетворюється концептуально на:

    [ 1, 2, 3 ]

Тобто:

    array → values

---

Rest:

    function test(...values) {}

отримує:

    1, 2, 3

і збирає:

    [1, 2, 3]

Тобто:

    values → array

---

# Просте правило

Запам'ятати можна так:

    Spread
    ↓
    РОЗКЛАСТИ

    Rest
    ↓
    ЗІБРАТИ

Або:

    Spread → "розпакувати"
    Rest   → "упакувати"

---

# Spread Array vs Rest Array

Spread:

    const numbers = [1, 2, 3];

    const result = [...numbers];

    // [1, 2, 3]

Rest:

    const numbers = [1, 2, 3];

    const [first, ...rest] = numbers;

    // first → 1
    // rest  → [2, 3]

---

# Spread Object vs Rest Object

Spread:

    const user = {
        name: "John",
        age: 25
    };

    const copy = {
        ...user
    };

Rest:

    const user = {
        name: "John",
        age: 25
    };

    const {
        name,
        ...rest
    } = user;

    // name → "John"
    // rest → { age: 25 }

---

# Spread і Destructuring

Spread і rest часто зустрічаються разом із destructuring.

Наприклад:

    const user = {
        name: "John",
        age: 25,
        city: "Kyiv"
    };

Destructuring:

    const {
        name,
        age
    } = user;

Rest:

    const {
        name,
        ...details
    } = user;

Spread:

    const updatedUser = {
        ...user,
        age: 26
    };

Три різні операції:

    destructuring → дістати
    rest          → зібрати залишок
    spread        → розгорнути

---

# Практичний патерн: оновлення Object

Дуже поширений сучасний JavaScript-підхід:

    const user = {
        name: "John",
        age: 25,
        isActive: true
    };

    const updatedUser = {
        ...user,
        age: 26
    };

Оригінальний object:

    user.age
    // 25

Новий:

    updatedUser.age
    // 26

Цей підхід особливо важливий у:

- React
- Redux
- state management
- functional programming

---

# Практичний патерн: додавання властивості

    const user = {
        name: "John",
        age: 25
    };

    const updatedUser = {
        ...user,
        email: "john@example.com"
    };

---

# Практичний патерн: видалення властивості

Rest можна використати для створення object без певної властивості.

    const user = {
        id: 1,
        name: "John",
        password: "123456"
    };

    const {
        password,
        ...safeUser
    } = user;

Тепер:

    safeUser

містить:

    {
        id: 1,
        name: "John"
    }

Це корисний патерн для створення нового object без окремої властивості.

---

# Практичний патерн: об'єднання конфігурацій

    const defaultOptions = {
        theme: "light",
        language: "en",
        pageSize: 20
    };

    const userOptions = {
        theme: "dark",
        pageSize: 50
    };

    const options = {
        ...defaultOptions,
        ...userOptions
    };

Результат:

    {
        theme: "dark",
        language: "en",
        pageSize: 50
    }

Пізніші властивості мають пріоритет.

---

# Практичний патерн: функція з необмеженою кількістю аргументів

    function sum(...numbers) {
        return numbers.reduce(
            (total, number) => total + number,
            0
        );
    }

    sum(1, 2);
    // 3

    sum(1, 2, 3, 4);
    // 10

    sum(10, 20, 30, 40, 50);
    // 150

---

# Практичний патерн: перший аргумент + решта

    function log(first, ...rest) {
        console.log(first);
        console.log(rest);
    }

    log(
        "Hello",
        "John",
        "Peter",
        "Mary"
    );

Отримуємо:

    first
    // "Hello"

    rest
    // ["John", "Peter", "Mary"]

---

# Практичний патерн: копія Array перед зміною

    const numbers = [1, 2, 3];

    const updatedNumbers = [
        ...numbers,
        4
    ];

Результат:

    [1, 2, 3, 4]

Оригінальний array:

    [1, 2, 3]

залишається без змін.

---

# Практичний патерн: копія + зміна елемента

    const numbers = [10, 20, 30];

    const updatedNumbers = [
        ...numbers
    ];

    updatedNumbers[1] = 200;

Тепер:

    numbers
    // [10, 20, 30]

    updatedNumbers
    // [10, 200, 30]

---

# Spread і Reference

Spread створює новий верхньорівневий array:

    const a = [1, 2, 3];
    const b = [...a];

    a === b;
    // false

Але якщо всередині object:

    const a = [
        {
            name: "John"
        }
    ];

    const b = [...a];

то:

    a[0] === b[0];
    // true

Тому spread — це shallow copy.

---

# Spread і Primitive Values

Для array spread можна розгортати iterable.

Наприклад:

    [..."ABC"]

Результат:

    ["A", "B", "C"]

Але не всі значення є iterable.

Наприклад, звичайний `number`:

    [...42]

призводить до помилки, оскільки `number` не є iterable.

---

# Spread Object і властивості

Object spread працює з властивостями об'єкта.

Наприклад:

    const user = {
        name: "John",
        age: 25
    };

    const copy = {
        ...user
    };

Властивості копіюються у новий object.

---

# Важлива відмінність Array Spread та Object Spread

Array spread:

    [...array]

працює через iterable.

Object spread:

    {...object}

працює з властивостями object.

Тому не потрібно ототожнювати ці два механізми повністю.

---

# Spread у Function Call vs Rest Parameters

Це особливо важливе порівняння.

### Spread

    const numbers = [1, 2, 3];

    function sum(a, b, c) {
        return a + b + c;
    }

    sum(...numbers);

Spread:

    [1, 2, 3]
         ↓
    1, 2, 3

---

### Rest

    function sum(...numbers) {
        // ...
    }

    sum(1, 2, 3);

Rest:

    1, 2, 3
       ↓
    [1, 2, 3]

---

# Spread + Rest разом

Вони можуть використовуватися в одній функції.

    function sum(...numbers) {
        return Math.max(...numbers);
    }

Тут:

    ...numbers

у параметрах:

    Rest

А тут:

    Math.max(...numbers)

це:

    Spread

Тобто:

    arguments
        ↓
    Rest
        ↓
    array
        ↓
    Spread
        ↓
    function arguments

---

# Типові помилки

❌ Плутати spread і rest.

    Spread → розгортає
    Rest   → збирає

---

❌ Вважати spread deep clone.

    { ...object }

це:

    shallow copy

---

❌ Вважати, що вкладені objects копіюються.

    const copy = { ...user };

Вкладені references можуть залишитися спільними.

---

❌ Ставити rest parameter не останнім.

    function test(...rest, value) {}

Це помилка.

---

❌ Плутати:

    [array]

та:

    [...array]

Перше створює масив, який містить інший масив.

Друге розгортає елементи.

---

❌ Плутати:

    { object }

та:

    { ...object }

Перше створює object з властивістю `object` через shorthand.

Друге копіює / розгортає властивості object.

---

# Порівняння

    const numbers = [1, 2, 3];

    [numbers]
    // [[1, 2, 3]]

    [...numbers]
    // [1, 2, 3]

---

# Spread у Object

    const user = {
        name: "John"
    };

    const a = {
        user
    };

Результат:

    {
        user: {
            name: "John"
        }
    }

А:

    const b = {
        ...user
    };

Результат:

    {
        name: "John"
    }

---

# Що відбувається концептуально

Spread Array:

    const result = [...array];

Можна мислити:

    create new array
    + take elements from array

---

Spread Object:

    const result = {...object};

Можна мислити:

    create new object
    + copy object's enumerable own properties

---

Rest:

    function test(...args) {}

Можна мислити:

    collect remaining arguments
    → create array

---

# Spread / Rest та Immutable підхід

Spread дуже часто використовується для створення нової структури замість зміни старої.

Наприклад:

    const user = {
        name: "John",
        age: 25
    };

Замість:

    user.age = 26;

можна створити:

    const updatedUser = {
        ...user,
        age: 26
    };

Це особливо важливо у state management.

---

# Array Immutable Pattern

Додати:

    const numbers = [1, 2, 3];

    const result = [
        ...numbers,
        4
    ];

---

Додати на початок:

    const numbers = [2, 3, 4];

    const result = [
        1,
        ...numbers
    ];

---

Об'єднати:

    const a = [1, 2];
    const b = [3, 4];

    const result = [
        ...a,
        ...b
    ];

---

# Object Immutable Pattern

Оновити:

    const user = {
        name: "John",
        age: 25
    };

    const updatedUser = {
        ...user,
        age: 26
    };

---

Додати:

    const updatedUser = {
        ...user,
        city: "Kyiv"
    };

---

Об'єднати:

    const result = {
        ...user,
        ...profile
    };

---

# Rest Destructuring Array

    const colors = [
        "red",
        "green",
        "blue",
        "yellow"
    ];

    const [
        first,
        ...others
    ] = colors;

Результат:

    first
    // "red"

    others
    // ["green", "blue", "yellow"]

---

# Rest Destructuring Object

    const user = {
        id: 1,
        name: "John",
        age: 25,
        city: "Kyiv"
    };

    const {
        id,
        ...details
    } = user;

Результат:

    id
    // 1

    details
    // {
    //     name: "John",
    //     age: 25,
    //     city: "Kyiv"
    // }

---

# Rest і вкладений Destructuring

Можна комбінувати:

    const user = {
        name: "John",
        address: {
            city: "Kyiv",
            country: "Ukraine"
        }
    };

    const {
        name,
        address: {
            city,
            ...addressDetails
        }
    } = user;

Тут:

    name
    // "John"

    city
    // "Kyiv"

    addressDetails
    // {
    //     country: "Ukraine"
    // }

---

# Spread та Default Values

Spread часто комбінується з default object:

    const defaults = {
        theme: "light",
        language: "en"
    };

    const settings = {
        ...defaults,
        theme: "dark"
    };

Результат:

    {
        theme: "dark",
        language: "en"
    }

---

# Питання зі співбесіди

Що таке spread syntax?

Що таке rest syntax?

Яка різниця між spread та rest?

Для чого використовується `...` у масивах?

Для чого використовується `...` в object literals?

Як скопіювати array за допомогою spread?

Як об'єднати два arrays?

Як об'єднати два objects?

Як передати array як аргументи функції?

Що таке rest parameter?

Який тип даних отримує rest parameter?

Чи може rest parameter бути не останнім?

Що таке shallow copy?

Чи є spread deep clone?

Що відбувається з вкладеними objects під час spread copy?

Що таке iterable?

Які iterable values ти знаєш?

Чим відрізняється:

    [array]

від:

    [...array]

Чим відрізняється:

    { object }

від:

    { ...object }

Як видалити властивість object за допомогою rest?

Як отримати всі аргументи функції за допомогою rest?

Як оновити властивість object без зміни оригіналу?

Як додати елемент до array без зміни оригінального array?

---

# Шлях

## 🟢 Core (обов'язково знати)

Що таке `...`.

Spread vs Rest.

Spread в arrays.

Spread в objects.

Spread у function calls.

Копіювання array:

    [...array]

Копіювання object:

    {...object}

Об'єднання arrays:

    [...a, ...b]

Об'єднання objects:

    {...a, ...b}

Rest parameters:

    function test(...args) {}

Rest у array destructuring:

    const [first, ...rest] = array;

Rest у object destructuring:

    const { name, ...rest } = object;

---

## 🔵 Junior

Shallow copy.

Spread + references.

Iterable.

Spread strings.

Spread Set.

Spread Map.

Перезапис properties через object spread.

Порядок properties при object spread.

Immutable patterns.

Оновлення object через spread.

Додавання елементів до array через spread.

Видалення properties через rest.

Розуміння `arguments` vs rest parameters.

Комбінація rest і spread.

---

## 🟠 Middle

Глибоке розуміння iterable protocol.

Iterator protocol.

`Symbol.iterator`.

Spread behavior для різних iterable.

Object spread semantics.

Own enumerable properties.

Property descriptors та spread.

Getter behavior під час object spread.

Shallow copy та nested references.

Immutable data patterns.

Композиція objects через spread.

Spread у React state updates.

Spread у Redux reducers.

Rest/spread у functional programming.

---

## 🔴 Senior

ECMAScript specification semantics для SpreadElement.

ECMAScript semantics для RestElement.

Iterator protocol.

Iterable protocol.

`Symbol.iterator`.

Object property enumeration.

Own properties.

Enumerable properties.

Property keys.

`CopyDataProperties`.

Iterator closing semantics.

Iterator errors.

Object identity.

Reference semantics.

Shallow vs deep structural copying.

Performance implications spread operations.

Allocation та garbage collection.

Оптимізація роботи з великими arrays/objects.

Trade-offs між immutable copy та mutation.

---

# Міні-шпаргалка

## Spread

    [...array]

    {...object}

    function(...array)

Spread:

    РОЗГОРТАЄ

---

## Rest

    function(...args) {}

    const [first, ...rest] = array;

    const { name, ...rest } = object;

Rest:

    ЗБИРАЄ

---

## Array Copy

    const copy = [...array];

---

## Array Merge

    const result = [
        ...first,
        ...second
    ];

---

## Object Copy

    const copy = {
        ...object
    };

---

## Object Merge

    const result = {
        ...first,
        ...second
    };

---

## Object Update

    const updated = {
        ...user,
        age: 26
    };

---

## Function Arguments

    const numbers = [1, 2, 3];

    Math.max(...numbers);

---

## Rest Parameters

    function sum(...numbers) {
        return numbers;
    }

    sum(1, 2, 3);

    // [1, 2, 3]

---

## Rest Array

    const [first, ...rest] = [
        1,
        2,
        3,
        4
    ];

    first
    // 1

    rest
    // [2, 3, 4]

---

## Rest Object

    const {
        name,
        ...rest
    } = user;

---

## Shallow Copy

    const copy = {
        ...object
    };

    object !== copy

Але:

    object.nested === copy.nested

---

# Головне

• `...` має два основних застосування: **Spread** і **Rest**.

• Spread **розгортає** значення.

• Rest **збирає** значення.

• Spread в array:

    [...array]

• Spread в object:

    {...object}

• Spread у function call:

    functionName(...args)

• Rest parameter:

    function test(...args) {}

• Rest parameter збирає аргументи в array.

• Rest parameter повинен бути останнім параметром.

• Rest можна використовувати в destructuring.

• Array spread працює з iterable.

• Strings, Arrays, Sets та Maps є iterable.

• Object spread копіює властивості в новий object.

• Пізніші властивості при object spread можуть перезаписати попередні.

• Spread створює новий верхньорівневий array/object.

• Spread copy є **shallow copy**.

• Spread не є deep clone.

• Вкладені objects та arrays можуть залишатися спільними references.

• Spread часто використовується для immutable operations.

• Rest часто використовується для роботи з невідомою кількістю аргументів.

• Rest у destructuring дозволяє отримати "все інше".

• Основне правило:

    Spread → розгорнути

    Rest → зібрати

• Найважливіші патерни:

    const copy = [...array];

    const merged = [...a, ...b];

    const copy = {...object};

    const merged = {...a, ...b};

    const updated = {
        ...object,
        property: newValue
    };

    function test(...args) {
        // args → array
    }

    const [first, ...rest] = array;

    const { property, ...rest } = object;

---

# Швидка ментальна модель

    ┌─────────────────────────────┐
    │          SPREAD             │
    │                             │
    │   РОЗГОРНУТИ / РОЗПАКУВАТИ  │
    │                             │
    │   [ ...array ]              │
    │   { ...object }             │
    │   fn(...args)               │
    └─────────────────────────────┘


    ┌─────────────────────────────┐
    │            REST             │
    │                             │
    │   ЗІБРАТИ / УПАКУВАТИ       │
    │                             │
    │   function(...args)         │
    │   [first, ...rest]          │
    │   {name, ...rest}           │
    └─────────────────────────────┘


    Spread:
    
        [1, 2, 3]
             ↓
        1, 2, 3


    Rest:

        1, 2, 3
             ↓
        [1, 2, 3]