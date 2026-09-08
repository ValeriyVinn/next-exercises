# Arrays and Tuples

## 1. Що таке Arrays and Tuples

**Arrays** та **Tuples** — це структури даних для зберігання декількох значень.

У TypeScript вони мають чітку систему типізації.

Наприклад:

    const numbers: number[] = [1, 2, 3];

Тут:

    numbers → number[]

Tuple дозволяє описати не лише тип елементів, а й **їхню позицію та кількість**:

    const user: [string, number] = [
        "John",
        30
    ];

Тут:

    user[0] → string
    user[1] → number

---

# 2. Array

Array — це колекція елементів, зазвичай одного типу.

Наприклад:

    const numbers = [10, 20, 30];

TypeScript виведе:

    number[]

---

## String array

    const names: string[] = [
        "John",
        "Anna",
        "Mike"
    ];

---

## Number array

    const scores: number[] = [
        10,
        20,
        30
    ];

---

## Boolean array

    const flags: boolean[] = [
        true,
        false,
        true
    ];

---

# 3. Два синтаксиси для Array

TypeScript підтримує два основних варіанти.

### Короткий синтаксис

    const names: string[] = [
        "John",
        "Anna"
    ];

### Generic syntax

    const names: Array<string> = [
        "John",
        "Anna"
    ];

Для простих випадків частіше використовують:

    string[]
    number[]
    boolean[]

---

# 4. Array з primitive types

    const names: string[] = [];

    const ages: number[] = [];

    const active: boolean[] = [];

---

# 5. Array з об'єктами

Можна створювати масиви об'єктів.

    const users: {
        id: number;
        name: string;
    }[] = [
        {
            id: 1,
            name: "John"
        },
        {
            id: 2,
            name: "Anna"
        }
    ];

Це означає:

    users → array

де кожен елемент має:

    id → number
    name → string

---

# 6. Type Alias для Array of Objects

Якщо структура складна, краще створити окремий тип.

    type User = {
        id: number;
        name: string;
    };

    const users: User[] = [
        {
            id: 1,
            name: "John"
        },
        {
            id: 2,
            name: "Anna"
        }
    ];

Це набагато читабельніше.

---

# 7. Inference для Arrays

Якщо значення вже відоме, TypeScript часто сам визначає тип.

    const numbers = [1, 2, 3];

TypeScript:

    number[]

---

    const names = [
        "John",
        "Anna",
        "Mike"
    ];

TypeScript:

    string[]

---

    const flags = [
        true,
        false
    ];

TypeScript:

    boolean[]

---

# 8. Mixed Arrays

Масив може містити декілька типів.

Наприклад:

    const values = [
        10,
        "hello",
        true
    ];

TypeScript визначить:

    (string | number | boolean)[]

Це означає:

> кожен елемент може бути `string`, `number` або `boolean`.

---

# 9. Union Array

Можна явно описати такий масив:

    const values: (string | number)[] = [
        "hello",
        10,
        "world",
        20
    ];

Тут кожен елемент:

    string | number

---

# 10. Array з union type

Не плутай:

    string | number[]

і:

    (string | number)[]

Це різні типи.

### Варіант 1

    string | number[]

означає:

    string

або:

    number[]

---

### Варіант 2

    (string | number)[]

означає:

    array

де кожен елемент може бути:

    string
    або
    number

---

# 11. Empty Array

Порожній масив не містить інформації про тип елементів.

Наприклад:

    const items = [];

У такому випадку тип може бути не таким, якого ти очікуєш, залежно від контексту та налаштувань TypeScript.

Якщо тип відомий заздалегідь, краще:

    const numbers: number[] = [];

або:

    const users: User[] = [];

---

# 12. Array Index

Array використовує індекси, починаючи з `0`.

    const names = [
        "John",
        "Anna",
        "Mike"
    ];

Тоді:

    names[0] → "John"

    names[1] → "Anna"

    names[2] → "Mike"

---

# 13. Type of Array Element

Якщо:

    const names: string[] = [
        "John",
        "Anna"
    ];

то:

    names[0] → string

    names[1] → string

TypeScript знає тип елементів масиву.

---

# 14. Array Methods

TypeScript знає типи стандартних методів масиву.

Наприклад:

    const numbers: number[] = [
        1,
        2,
        3
    ];

Можна використовувати:

    numbers.push(4);

    numbers.pop();

    numbers.map(...);

    numbers.filter(...);

    numbers.find(...);

    numbers.reduce(...);

---

# 15. `push`

    const numbers: number[] = [
        1,
        2,
        3
    ];

    numbers.push(4);

Це дозволено.

А:

    numbers.push("4");

помилка.

TypeScript захищає масив від неправильного типу елемента.

---

# 16. `pop`

    const numbers = [1, 2, 3];

    const last = numbers.pop();

Тип:

    last → number | undefined

Чому?

Тому що масив може бути порожнім.

---

# 17. `map`

Наприклад:

    const numbers = [1, 2, 3];

    const doubled = numbers.map(
        number => number * 2
    );

TypeScript визначає:

    number → number

і:

    doubled → number[]

---

# 18. `filter`

    const numbers = [1, 2, 3, 4, 5];

    const evenNumbers = numbers.filter(
        number => number % 2 === 0
    );

Результат:

    number[]

---

# 19. `find`

    const numbers = [1, 2, 3, 4, 5];

    const result = numbers.find(
        number => number > 3
    );

Тип:

    number | undefined

Тому що елемент може не бути знайдений.

---

# 20. `reduce`

    const numbers = [10, 20, 30];

    const total = numbers.reduce(
        (sum, number) => sum + number,
        0
    );

TypeScript визначить:

    total → number

---

# 21. Readonly Arrays

Якщо масив не повинен змінюватися, можна використати:

    readonly number[]

Наприклад:

    const numbers: readonly number[] = [
        1,
        2,
        3
    ];

Тепер:

    numbers.push(4);

буде помилкою.

---

# 22. `ReadonlyArray`

Альтернативний синтаксис:

    const numbers: ReadonlyArray<number> = [
        1,
        2,
        3
    ];

Це еквівалентна концепція до:

    readonly number[]

Для простих випадків частіше використовують:

    readonly number[]

---

# 23. Readonly Array vs const

Дуже важливо розуміти різницю.

    const numbers = [1, 2, 3];

`const` забороняє переприсвоєння змінної:

    // Error
    numbers = [4, 5, 6];

Але це дозволено:

    numbers.push(4);

---

Readonly:

    const numbers: readonly number[] = [
        1,
        2,
        3
    ];

Тепер:

    numbers.push(4);

помилка.

Отже:

    const
    ↓
    не можна переприсвоїти binding

    readonly
    ↓
    не можна змінювати масив через його тип

---

# 24. Multidimensional Arrays

Можна створювати масиви масивів.

Наприклад:

    const matrix: number[][] = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

Тип:

    number[][]

---

## Three-dimensional array

    const cube: number[][][] = [
        [
            [1, 2],
            [3, 4]
        ]
    ];

Тип:

    number[][][]

---

# 25. Generic Array Syntax

Те саме можна записати:

    const matrix: Array<Array<number>> = [
        [1, 2],
        [3, 4]
    ];

Але:

    number[][]

коротший і часто читабельніший.

---

# 26. Array of Functions

Масив може містити функції.

    const operations: ((a: number, b: number) => number)[] = [
        (a, b) => a + b,
        (a, b) => a - b,
        (a, b) => a * b
    ];

Кожен елемент — функція:

    (a: number, b: number) => number

---

# 27. Array of Arrays and Tuples

Можна комбінувати масиви та tuples.

Наприклад:

    const users: [string, number][] = [
        ["John", 30],
        ["Anna", 25]
    ];

Тут:

    users → array

а кожен елемент:

    [string, number]

---

# 28. Що таке Tuple

**Tuple** — це масив із заздалегідь визначеною:

- кількістю елементів;
- позицією елементів;
- типом кожного елемента.

Наприклад:

    const user: [string, number] = [
        "John",
        30
    ];

Це означає:

    index 0 → string
    index 1 → number

---

# 29. Array vs Tuple

Array:

    const user: (string | number)[] = [
        "John",
        30
    ];

Тут:

    будь-яка кількість елементів

і кожен елемент:

    string | number

---

Tuple:

    const user: [string, number] = [
        "John",
        30
    ];

Тут:

    index 0 → string
    index 1 → number

і очікується саме така структура.

---

# 30. Tuple позиційно типізований

Наприклад:

    const user: [string, number] = [
        "John",
        30
    ];

Правильно:

    user[0] → string
    user[1] → number

Але:

    const user: [string, number] = [
        30,
        "John"
    ];

помилка.

Порядок має значення.

---

# 31. Tuple length

Tuple також описує очікувану кількість елементів.

    const point: [number, number] = [
        10,
        20
    ];

Не можна просто передати:

    const point: [number, number] = [
        10
    ];

або:

    const point: [number, number] = [
        10,
        20,
        30
    ];

У стандартному tuple type структура повинна відповідати визначеному типу.

---

# 32. Tuple з трьома елементами

    const user: [number, string, boolean] = [
        1,
        "John",
        true
    ];

Тут:

    user[0] → number
    user[1] → string
    user[2] → boolean

---

# 33. Named Tuple Elements

Для покращення читабельності можна назвати позиції.

    const user: [
        id: number,
        name: string,
        active: boolean
    ] = [
        1,
        "John",
        true
    ];

Назви не створюють нових runtime properties.

Вони допомагають читабельності та IDE.

---

# 34. Optional Tuple Elements

Tuple може мати optional element.

    const user: [
        string,
        number?
    ] = [
        "John"
    ];

або:

    const user: [
        string,
        number?
    ] = [
        "John",
        30
    ];

Тут другий елемент необов'язковий.

Його тип фактично враховує:

    number | undefined

---

# 35. Rest Elements у Tuple

Tuple може мати rest elements.

    const values: [
        string,
        ...number[]
    ] = [
        "total",
        10,
        20,
        30
    ];

Тут:

    index 0 → string

а всі наступні:

    number

---

# 36. Readonly Tuple

Tuple також може бути readonly.

    const point: readonly [number, number] = [
        10,
        20
    ];

Не можна змінити:

    point[0] = 100;

Також не можна використовувати mutating methods, які змінюють tuple.

---

# 37. `as const` і Tuple

`as const` може перетворити масив у readonly tuple.

Наприклад:

    const point = [10, 20] as const;

TypeScript визначить:

    readonly [10, 20]

Це вже дуже вузький тип.

---

# 38. Array vs Tuple — головна різниця

### Array

    const numbers: number[] = [
        10,
        20,
        30
    ];

Основна ідея:

    багато елементів одного типу

---

### Tuple

    const point: [number, number] = [
        10,
        20
    ];

Основна ідея:

    фіксована структура
    +
    позиційні типи

---

# 39. Tuple як return value

Tuple часто використовується, коли функція повертає декілька значень.

Наприклад:

    function getUser(): [string, number] {
        return [
            "John",
            30
        ];
    }

---

# 40. Destructuring Tuple

    const user: [string, number] = [
        "John",
        30
    ];

    const [name, age] = user;

TypeScript:

    name → string
    age → number

---

# 41. Tuple у функції

    function getCoordinates(): [number, number] {
        return [10, 20];
    }

    const [x, y] = getCoordinates();

TypeScript:

    x → number
    y → number

---

# 42. Tuple для React-подібного API

Концепція tuple часто використовується в API, які повертають фіксовану кількість значень.

Наприклад:

    function useValue(): [
        number,
        (value: number) => void
    ] {
        // ...
    }

Тут:

    index 0 → number

    index 1 → function

Ця концепція дуже важлива для розуміння типів React hooks.

---

# 43. Tuple з Union

Можна комбінувати tuple та union.

    const result:
        [number, string] |
        [string, Error] = [
            200,
            "OK"
        ];

Це дозволяє описувати різні фіксовані структури результату.

---

# 44. Discriminated Tuples

Tuple може використовувати literal type як discriminator.

    type Result =
        | ["success", number]
        | ["error", string];

Тепер:

    const result: Result = [
        "success",
        200
    ];

або:

    const result: Result = [
        "error",
        "Something went wrong"
    ];

---

# 45. Narrowing Discriminated Tuple

Наприклад:

    type Result =
        | ["success", number]
        | ["error", string];

    function handleResult(result: Result) {
        if (result[0] === "success") {
            const statusCode = result[1];

            // statusCode → number
        }

        if (result[0] === "error") {
            const message = result[1];

            // message → string
        }
    }

TypeScript використовує перший елемент як discriminator.

---

# 46. Tuple і `length`

Tuple знає більше інформації про структуру, ніж звичайний array.

Наприклад:

    const point: [number, number] = [
        10,
        20
    ];

TypeScript знає, що це tuple із двох позицій.

Array:

    const numbers: number[] = [
        10,
        20
    ];

може мати довільну кількість елементів.

---

# 47. Tuple не означає "маленький Array"

Це важлива концептуальна різниця.

Tuple використовується, коли **позиція має семантичне значення**.

Наприклад:

    [x, y]

або:

    [status, data]

або:

    [error, result]

Звичайний array використовується, коли позиції не визначають різні типи даних:

    [10, 20, 30, 40]

---

# 48. Array з optional values

Якщо масив може містити `undefined`:

    const values: (number | undefined)[] = [
        10,
        undefined,
        30
    ];

Це array, а не tuple.

---

# 49. Tuple з optional position

Якщо сама позиція необов'язкова:

    const user: [string, number?] = [
        "John"
    ];

Це tuple.

Другий елемент може бути відсутнім.

---

# 50. Readonly Array у функціях

Якщо функція не повинна змінювати отриманий масив:

    function sum(
        numbers: readonly number[]
    ): number {
        return numbers.reduce(
            (total, number) => total + number,
            0
        );
    }

Тепер всередині функції не можна зробити:

    numbers.push(100);

Це хороший спосіб захистити input від mutation.

---

# 51. Readonly Tuple у функціях

    function distance(
        point: readonly [number, number]
    ): number {
        const [x, y] = point;

        return Math.sqrt(x * x + y * y);
    }

Функція може читати tuple, але не змінювати його.

---

# 52. `Array<T>` vs `T[]`

Ці записи для простих типів еквівалентні:

    string[]

і:

    Array<string>

Наприклад:

    const names: string[] = [
        "John",
        "Anna"
    ];

і:

    const names: Array<string> = [
        "John",
        "Anna"
    ];

---

# 53. Коли `Array<T>` може бути зручнішим

У складних generic types:

    Array<string | number>

може бути читабельнішим, ніж:

    (string | number)[]

Обидва варіанти валідні.

---

# 54. Nested Generic Arrays

Наприклад:

    Array<Array<number>>

те саме, що:

    number[][]

---

# 55. Array Type Alias

Можна створити alias:

    type Scores = number[];

    const scores: Scores = [
        10,
        20,
        30
    ];

---

# 56. Tuple Type Alias

Так само:

    type Point = [number, number];

    const point: Point = [
        10,
        20
    ];

Це особливо корисно, якщо tuple використовується багато разів.

---

# 57. Array та Interface

Для складних об'єктів можна використовувати interface:

    interface User {
        id: number;
        name: string;
    }

    const users: User[] = [
        {
            id: 1,
            name: "John"
        },
        {
            id: 2,
            name: "Anna"
        }
    ];

---

# 58. Array з optional properties

    interface User {
        id: number;
        name: string;
        age?: number;
    }

    const users: User[] = [
        {
            id: 1,
            name: "John"
        },
        {
            id: 2,
            name: "Anna",
            age: 30
        }
    ];

---

# 59. Array Type Inference та `map`

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

    const names = users.map(
        user => user.name
    );

TypeScript визначить:

    user → {
        id: number;
        name: string;
    }

    names → string[]

---

# 60. Array Type Inference та `filter`

    const users = [
        {
            name: "John",
            active: true
        },
        {
            name: "Anna",
            active: false
        }
    ];

    const activeUsers = users.filter(
        user => user.active
    );

TypeScript збереже тип елементів масиву.

---

# 61. Array Type Inference та `reduce`

    const prices = [
        100,
        200,
        300
    ];

    const total = prices.reduce(
        (sum, price) => sum + price,
        0
    );

Результат:

    total → number

---

# 62. Типова помилка — неправильний тип елемента

    const numbers: number[] = [
        1,
        2,
        "3"
    ];

Помилка:

    Type 'string' is not assignable to type 'number'.

---

# 63. Типова помилка — неправильний Tuple order

    const user: [string, number] = [
        30,
        "John"
    ];

Помилка.

Потрібно:

    const user: [string, number] = [
        "John",
        30
    ];

---

# 64. Типова помилка — неправильна кількість елементів

    const point: [number, number] = [
        10
    ];

Помилка.

Потрібно:

    const point: [number, number] = [
        10,
        20
    ];

---

# 65. Типова помилка — плутати Array і Tuple

Не потрібно використовувати tuple, якщо структура просто є списком значень:

    const scores: number[] = [
        10,
        20,
        30,
        40
    ];

Tuple був би недоречним:

    const scores: [
        number,
        number,
        number,
        number
    ] = [
        10,
        20,
        30,
        40
    ];

Якщо кількість елементів не має особливого значення, використовуй Array.

---

# 66. Типова помилка — використовувати Tuple для довільного списку

Погано:

    type Numbers = [
        number,
        number,
        number
    ];

Якщо список може мати будь-яку кількість чисел, краще:

    type Numbers = number[];

---

# 67. Типова помилка — забувати readonly

Якщо функція лише читає масив, можна використовувати:

    function average(
        numbers: readonly number[]
    ): number {
        ...
    }

Це чіткіше виражає контракт функції.

---

# 68. Типова помилка — думати, що `const` робить Array immutable

    const numbers = [1, 2, 3];

Все ще дозволено:

    numbers.push(4);

Для immutable API:

    const numbers: readonly number[] = [
        1,
        2,
        3
    ];

---

# 69. Типова помилка — неправильні дужки Union

Погано:

    string | number[]

Якщо потрібно:

    array of string or number

потрібно:

    (string | number)[]

---

# 70. Практичний приклад — список користувачів

    interface User {
        id: number;
        name: string;
        active: boolean;
    }

    const users: User[] = [
        {
            id: 1,
            name: "John",
            active: true
        },
        {
            id: 2,
            name: "Anna",
            active: false
        }
    ];

---

# 71. Практичний приклад — список товарів

    interface Product {
        id: number;
        title: string;
        price: number;
    }

    const products: Product[] = [
        {
            id: 1,
            title: "Book",
            price: 500
        },
        {
            id: 2,
            title: "Pen",
            price: 50
        }
    ];

---

# 72. Практичний приклад — Matrix

    const matrix: number[][] = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    const value = matrix[1][2];

Результат:

    value → number

---

# 73. Практичний приклад — Coordinates

    type Point = [number, number];

    const point: Point = [
        50.1,
        28.4
    ];

---

# 74. Практичний приклад — User Tuple

    type UserTuple = [
        id: number,
        name: string,
        active: boolean
    ];

    const user: UserTuple = [
        1,
        "John",
        true
    ];

---

# 75. Практичний приклад — Function Result

    type Result =
        | ["success", number]
        | ["error", string];

    function getResult(
        success: boolean
    ): Result {
        if (success) {
            return ["success", 200];
        }

        return [
            "error",
            "Request failed"
        ];
    }

---

# 76. Практичний приклад — Readonly Array

    function sum(
        values: readonly number[]
    ): number {
        return values.reduce(
            (total, value) => total + value,
            0
        );
    }

    const numbers = [10, 20, 30];

    const result = sum(numbers);

Функція не може змінити `numbers` через параметр.

---

# 77. Практична вправа — Arrays

Створи:

    const names: string[] = [
        "John",
        "Anna",
        "Mike"
    ];

Зроби:

    const upperNames = names.map(
        name => name.toUpperCase()
    );

Визнач тип:

    upperNames → string[]

---

# 78. Практична вправа — Numbers

Створи:

    const numbers: number[] = [
        10,
        20,
        30,
        40,
        50
    ];

Знайди:

    const evenNumbers = numbers.filter(
        number => number % 2 === 0
    );

Тип:

    evenNumbers → number[]

---

# 79. Практична вправа — Objects Array

Створи:

    interface Product {
        id: number;
        name: string;
        price: number;
    }

Потім:

    const products: Product[] = [
        {
            id: 1,
            name: "Book",
            price: 500
        },
        {
            id: 2,
            name: "Pen",
            price: 50
        }
    ];

Порахуй загальну вартість:

    const total = products.reduce(
        (sum, product) =>
            sum + product.price,
        0
    );

Очікуваний тип:

    total → number

---

# 80. Практична вправа — Tuple

Створи:

    type User = [string, number];

Створи:

    const user: User = [
        "John",
        30
    ];

Потім:

    const [name, age] = user;

Визнач:

    name → string
    age → number

---

# 81. Практична вправа — Tuple positions

Створи:

    const point: [number, number] = [
        10,
        20
    ];

Визнач:

    point[0] → ?
    point[1] → ?

Спробуй:

    point[0] = "10";

Проаналізуй помилку.

---

# 82. Практична вправа — Readonly

Створи:

    const numbers: readonly number[] = [
        1,
        2,
        3
    ];

Спробуй:

    numbers.push(4);

Поясни, чому TypeScript не дозволяє цю операцію.

---

# 83. Практична вправа — Matrix

Створи:

    const matrix: number[][] = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

Отримай центральний елемент:

    const center = matrix[1][1];

Тип:

    center → number

---

# 84. Практична вправа — Discriminated Tuple

Створи:

    type Result =
        | ["success", number]
        | ["error", string];

Створи функцію:

    function printResult(
        result: Result
    ) {
        if (result[0] === "success") {
            console.log(result[1]);
        } else {
            console.log(result[1]);
        }
    }

Перевір, який тип `result[1]` бачить TypeScript у кожній гілці.

---

# 85. Практична вправа — Array чи Tuple?

Визнач, що краще використати.

### Випадок 1

    [10, 20, 30, 40, 50]

Це:

    number[]

---

### Випадок 2

    ["John", 30]

Це може бути:

    [string, number]

---

### Випадок 3

    [latitude, longitude]

Це природний кандидат на:

    [number, number]

---

### Випадок 4

    [product1, product2, product3, ...]

Це:

    Product[]

---

# 86. Interview Questions — Junior

## 1. Що таке Array у TypeScript?

Array — це колекція елементів, для яких можна визначити тип.

Наприклад:

    const numbers: number[] = [
        1,
        2,
        3
    ];

---

## 2. Які є способи записати Array type?

Наприклад:

    string[]

або:

    Array<string>

---

## 3. Що таке Tuple?

Tuple — це масив із визначеною структурою, позиціями та типами елементів.

Наприклад:

    [string, number]

---

## 4. Чим Array відрізняється від Tuple?

Array:

    number[]

означає:

> довільна кількість `number`.

Tuple:

    [string, number]

означає:

> перший елемент `string`, другий — `number`.

---

## 5. Чи може Array містити різні типи?

Так:

    const values: (string | number)[] = [
        "hello",
        10
    ];

---

## 6. Чи може Tuple мати різні типи?

Так:

    const user: [string, number] = [
        "John",
        30
    ];

---

# 87. Interview Questions — Middle

## 1. Що таке readonly array?

Наприклад:

    readonly number[]

Такий тип забороняє змінювати масив через mutation methods.

---

## 2. Чим `const` відрізняється від `readonly`?

`const` захищає binding:

    const numbers = [1, 2, 3];

але:

    numbers.push(4);

дозволено.

`readonly` захищає саму структуру від mutation через цей тип:

    const numbers: readonly number[] = [
        1,
        2,
        3
    ];

---

## 3. Що повертає `find()`?

Для:

    const numbers = [1, 2, 3];

результат:

    number | undefined

оскільки елемент може не бути знайдений.

---

## 4. Що повертає `pop()`?

Для:

    const numbers = [1, 2, 3];

тип результату:

    number | undefined

тому що масив може бути порожнім.

---

## 5. Що таке named tuple?

Наприклад:

    type User = [
        id: number,
        name: string
    ];

Назви `id` та `name` покращують читабельність, але не змінюють runtime структуру tuple.

---

# 88. Interview Questions — Senior

## 1. Коли Tuple кращий за Object?

Tuple може бути корисним, коли:

- структура маленька;
- порядок має значення;
- API природно повертає фіксовану послідовність;
- потрібно повернути декілька пов'язаних значень;
- використовується discriminated tuple.

Object часто кращий, коли важлива семантична назва кожного поля.

---

## 2. Що таке variadic tuple types?

Це tuples, які можуть працювати з rest elements та generic tuple composition.

Наприклад:

    type StringsAndNumbers = [
        ...string[],
        ...number[]
    ];

Це advanced можливість TypeScript.

---

## 3. Що таке labeled tuple elements?

Наприклад:

    type Point = [
        x: number,
        y: number
    ];

Назви допомагають IDE та читабельності, але не є runtime keys.

---

## 4. Що таке discriminated tuple?

Наприклад:

    type Result =
        | ["success", number]
        | ["error", string];

Перший елемент визначає, який тип має другий.

---

## 5. Чому `readonly` array корисний у функціях?

Наприклад:

    function sum(
        values: readonly number[]
    ): number {
        ...
    }

Це явно показує:

> функція лише читає дані і не повинна їх змінювати.

Це покращує API design та захищає від випадкової mutation.

---

# 89. Learning Path

## 🟢 Core

Потрібно знати:

- `number[]`;
- `string[]`;
- `boolean[]`;
- `Array<T>`;
- array inference;
- array indexing;
- basic array methods;
- `readonly` arrays;
- що таке Tuple;
- базову різницю Array vs Tuple.

Приклади:

    const numbers: number[] = [
        1,
        2,
        3
    ];

    const user: [string, number] = [
        "John",
        30
    ];

---

## 🔵 Junior

Потрібно вміти:

- типізувати arrays;
- типізувати arrays of objects;
- працювати з union arrays;
- використовувати multidimensional arrays;
- використовувати tuples;
- destructure tuples;
- працювати з optional tuple elements;
- розуміти readonly arrays;
- використовувати arrays у функціях;
- розуміти типи `map`, `filter`, `find`, `reduce`.

---

## 🟣 Middle

Потрібно розуміти:

- generic arrays;
- named tuples;
- readonly tuples;
- rest tuple elements;
- discriminated tuples;
- tuple unions;
- tuple inference;
- `as const`;
- взаємодію tuples з generics;
- arrays у складних API;
- immutable API design.

---

## 🔴 Senior

Потрібно глибоко розуміти:

- variadic tuple types;
- tuple inference;
- generic tuple manipulation;
- mapped types над tuples;
- conditional types над arrays;
- readonly та mutability;
- covariance/contravariance у складних generic сценаріях;
- type-safe API design;
- discriminated tuple patterns;
- tuple-based function composition.

---

# 90. Mini Cheat Sheet

| Тип | Приклад | Значення |
|---|---|---|
| String array | `string[]` | масив рядків |
| Number array | `number[]` | масив чисел |
| Boolean array | `boolean[]` | масив boolean |
| Generic array | `Array<string>` | масив string |
| Union array | `(string \| number)[]` | масив різних дозволених типів |
| Object array | `User[]` | масив User |
| Nested array | `number[][]` | масив масивів |
| Readonly array | `readonly number[]` | незмінний через цей тип масив |
| Tuple | `[string, number]` | фіксовані позиції та типи |
| Optional tuple | `[string, number?]` | другий елемент optional |
| Named tuple | `[id: number, name: string]` | tuple з назвами позицій |
| Readonly tuple | `readonly [number, number]` | незмінний tuple |
| Rest tuple | `[string, ...number[]]` | string + довільна кількість number |

---

# 91. Основні синтаксиси

### Array

    const numbers: number[] = [
        1,
        2,
        3
    ];

### Generic Array

    const numbers: Array<number> = [
        1,
        2,
        3
    ];

### Union Array

    const values: (string | number)[] = [
        "hello",
        10
    ];

### Object Array

    const users: User[] = [];

### Multidimensional Array

    const matrix: number[][] = [
        [1, 2],
        [3, 4]
    ];

### Readonly Array

    const numbers: readonly number[] = [
        1,
        2,
        3
    ];

### Tuple

    const user: [string, number] = [
        "John",
        30
    ];

### Named Tuple

    const user: [
        name: string,
        age: number
    ] = [
        "John",
        30
    ];

### Optional Tuple

    const user: [string, number?] = [
        "John"
    ];

### Rest Tuple

    const values: [
        string,
        ...number[]
    ] = [
        "total",
        10,
        20,
        30
    ];

### Readonly Tuple

    const point: readonly [number, number] = [
        10,
        20
    ];

---

# 92. Array Methods — типи результатів

Для:

    const numbers: number[] = [
        1,
        2,
        3
    ];

можна очікувати:

    numbers.map(...)
    // number[]

    numbers.filter(...)
    // number[]

    numbers.find(...)
    // number | undefined

    numbers.pop()
    // number | undefined

    numbers.shift()
    // number | undefined

    numbers.includes(...)
    // boolean

    numbers.indexOf(...)
    // number

    numbers.reduce(...)
    // залежить від accumulator type

---

# 93. Array vs Tuple — швидка пам'ятка

    number[]

означає:

    "будь-яка кількість number"

---

    [number, number]

означає:

    "рівно визначена структура
     з number на позиції 0
     і number на позиції 1"

---

    [string, number]

означає:

    "позиція 0 → string
     позиція 1 → number"

---

    (string | number)[]

означає:

    "масив, кожен елемент якого
     може бути string або number"

---

# 94. Головне

**Array** використовуй для колекцій:

    const numbers: number[] = [
        10,
        20,
        30
    ];

Основна ідея:

> **довільна кількість елементів одного типу.**

---

**Tuple** використовуй для фіксованої структури:

    const user: [string, number] = [
        "John",
        30
    ];

Основна ідея:

> **конкретна кількість позицій + конкретний тип кожної позиції.**

---

Найважливіша різниця:

    Array
      ↓
    collection

    Tuple
      ↓
    structure

---

Запам'ятай:

    string[]
    ↓
    масив string

    number[]
    ↓
    масив number

    User[]
    ↓
    масив User

    number[][]
    ↓
    масив масивів number

    readonly number[]
    ↓
    масив number без mutation через цей тип

    [string, number]
    ↓
    tuple:
    index 0 → string
    index 1 → number

    [number, number]
    ↓
    tuple координат

    [string, number?]
    ↓
    tuple з optional position

    [string, ...number[]]
    ↓
    string + довільна кількість number

---

Формула для запам'ятовування:

    ARRAY

    T[]
      ↓
    багато T


    TUPLE

    [T1, T2, T3]
      ↓
    конкретні позиції
    +
    конкретні типи


    READONLY ARRAY

    readonly T[]
      ↓
    читаємо, але не мутуємо


    UNION ARRAY

    (T1 | T2)[]
      ↓
    кожен елемент
    може мати T1 або T2


    OBJECT ARRAY

    User[]
      ↓
    багато об'єктів User


    MULTIDIMENSIONAL ARRAY

    T[][]
      ↓
    масив масивів


Розуміння різниці між:

    Array
       ↓
    Tuple
       ↓
    Readonly Array
       ↓
    Union Array
       ↓
    Array of Objects

є фундаментальним для подальшого вивчення TypeScript.

Особливо важливо зрозуміти одну концепцію:

> **Array описує колекцію, а Tuple описує структуру.**

Це стане основою для роботи з:

    React
    Redux
    API
    generics
    utility types
    discriminated unions
    function composition
    type-safe libraries