# 11. Destructuring

`Destructuring` — це синтаксис JavaScript для зручного вилучення значень з:

- objects
- arrays
- function parameters
- return values

Замість того щоб звертатися до кожного значення окремо:

    const user = {
        name: "John",
        age: 30
    };

    const name = user.name;
    const age = user.age;

можна використати destructuring:

    const {
        name,
        age
    } = user;

Тепер:

    console.log(name);
    console.log(age);

Результат:

    John
    30

---

# Ключові поняття

✔ destructuring  
✔ object destructuring  
✔ array destructuring  
✔ property  
✔ variable  
✔ nested destructuring  
✔ default values  
✔ renaming  
✔ rest syntax  
✔ spread syntax  
✔ function parameters  
✔ function return values  
✔ swapping variables  
✔ optional chaining  
✔ `undefined`  
✔ `null`  
✔ shallow destructuring  

---

# Object Destructuring

Базовий синтаксис:

    const {
        property
    } = object;

Наприклад:

    const user = {
        name: "John",
        age: 30
    };

    const {
        name,
        age
    } = user;

Тепер створені дві змінні:

    name
    age

---

# Порівняння зі звичайним доступом

Без destructuring:

    const user = {
        name: "John",
        age: 30
    };

    const name = user.name;
    const age = user.age;

З destructuring:

    const user = {
        name: "John",
        age: 30
    };

    const {
        name,
        age
    } = user;

Обидва варіанти отримують ті самі значення.

---

# Property Name

Object destructuring орієнтується на **назви properties**, а не на їх порядок.

Наприклад:

    const user = {
        name: "John",
        age: 30,
        city: "Vinnytsia"
    };

    const {
        city,
        name
    } = user;

Результат:

    city → "Vinnytsia"
    name → "John"

Порядок properties у destructuring не має значення.

---

# Вибірковий Destructuring

Не потрібно вилучати всі properties.

    const user = {
        name: "John",
        age: 30,
        city: "Vinnytsia"
    };

    const {
        name
    } = user;

Тепер існує:

    name

а `age` та `city` не вилучалися.

---

# Renaming

Можна створити змінну з іншою назвою.

Синтаксис:

    const {
        property: variable
    } = object;

Наприклад:

    const user = {
        name: "John"
    };

    const {
        name: userName
    } = user;

Тепер:

    userName === "John"

Але змінної:

    name

не створено.

---

# Renaming кількох Properties

    const user = {
        name: "John",
        age: 30
    };

    const {
        name: userName,
        age: userAge
    } = user;

Тепер:

    userName → "John"
    userAge → 30

---

# Destructuring + Default Value

Якщо property відсутня або має значення `undefined`, можна встановити default value.

    const user = {
        name: "John"
    };

    const {
        name,
        age = 30
    } = user;

Тепер:

    name → "John"
    age → 30

---

# Default Value працює з `undefined`

Наприклад:

    const user = {
        name: "John",
        age: undefined
    };

    const {
        age = 30
    } = user;

Результат:

    age → 30

---

# Default Value НЕ працює з `null`

Наприклад:

    const user = {
        age: null
    };

    const {
        age = 30
    } = user;

Результат:

    age → null

Тому:

    undefined
        ↓
    використовує default

    null
        ↓
    НЕ використовує default

---

# Object Rest

За допомогою `...` можна зібрати решту properties.

    const user = {
        name: "John",
        age: 30,
        city: "Vinnytsia"
    };

    const {
        name,
        ...rest
    } = user;

Тепер:

    name → "John"

    rest → {
        age: 30,
        city: "Vinnytsia"
    }

---

# Rest у Object Destructuring

Синтаксис:

    const {
        property,
        ...rest
    } = object;

`rest` збирає всі properties, які ще не були destructured.

---

# Rest має бути останнім

Правильно:

    const {
        name,
        age,
        ...rest
    } = user;

Неправильно:

    const {
        ...rest,
        name
    } = user;

Rest element повинен знаходитися наприкінці.

---

# Object Destructuring у Function Parameters

Destructuring можна виконувати прямо в параметрах function.

Наприклад:

    function greet({ name }) {
        console.log(`Hello, ${name}`);
    }

    const user = {
        name: "John",
        age: 30
    };

    greet(user);

Результат:

    Hello, John

---

# Function Parameter + Default Values

    function greet({
        name,
        age = 18
    }) {

        console.log(name);
        console.log(age);

    }

    greet({
        name: "John"
    });

Результат:

    John
    18

---

# Function Parameter + Renaming

У parameter destructuring також можна перейменовувати properties:

    function showUser({
        name: userName
    }) {

        console.log(userName);

    }

    showUser({
        name: "John"
    });

---

# Function Parameter + Rest

    function showUser({
        name,
        ...details
    }) {

        console.log(name);
        console.log(details);

    }

    showUser({
        name: "John",
        age: 30,
        city: "Vinnytsia"
    });

Результат:

    John

    {
        age: 30,
        city: "Vinnytsia"
    }

---

# Array Destructuring

Для arrays destructuring працює за **позицією**.

Синтаксис:

    const [
        first,
        second
    ] = array;

Наприклад:

    const colors = [
        "red",
        "green",
        "blue"
    ];

    const [
        first,
        second,
        third
    ] = colors;

Результат:

    first → "red"
    second → "green"
    third → "blue"

---

# Array Destructuring та Position

На відміну від objects:

    Object
        ↓
    property name

    Array
        ↓
    position

Наприклад:

    const numbers = [
        10,
        20,
        30
    ];

    const [
        a,
        b,
        c
    ] = numbers;

Отримаємо:

    a → 10
    b → 20
    c → 30

---

# Пропуск Element

Можна пропустити element через кому.

    const numbers = [
        10,
        20,
        30
    ];

    const [
        first,
        ,
        third
    ] = numbers;

Результат:

    first → 10
    third → 30

`20` було пропущено.

---

# Array Default Values

Якщо element відсутній:

    const numbers = [
        10
    ];

    const [
        first,
        second = 20
    ] = numbers;

Результат:

    first → 10
    second → 20

---

# Array Rest

Можна отримати перший element і зібрати решту.

    const numbers = [
        10,
        20,
        30,
        40
    ];

    const [
        first,
        ...rest
    ] = numbers;

Результат:

    first → 10

    rest → [
        20,
        30,
        40
    ]

---

# Array Rest має бути останнім

Правильно:

    const [
        first,
        second,
        ...rest
    ] = numbers;

Неправильно:

    const [
        ...rest,
        last
    ] = numbers;

Rest element повинен бути останнім.

---

# Nested Object Destructuring

Можна destructure вкладені objects.

    const user = {

        name: "John",

        address: {
            city: "Vinnytsia",
            country: "Ukraine"
        }

    };

    const {
        address: {
            city,
            country
        }
    } = user;

Тепер:

    city → "Vinnytsia"
    country → "Ukraine"

---

# Nested Array Destructuring

    const data = [
        [10, 20],
        [30, 40]
    ];

    const [
        [a, b],
        [c, d]
    ] = data;

Результат:

    a → 10
    b → 20
    c → 30
    d → 40

---

# Mixed Destructuring

Object може містити array.

    const user = {

        name: "John",

        skills: [
            "HTML",
            "CSS",
            "JavaScript"
        ]

    };

    const {
        name,
        skills: [
            firstSkill,
            secondSkill
        ]
    } = user;

Результат:

    name → "John"

    firstSkill → "HTML"

    secondSkill → "CSS"

---

# Object всередині Array

    const users = [

        {
            name: "John",
            age: 30
        },

        {
            name: "Peter",
            age: 25
        }

    ];

    const [
        {
            name: firstName
        },
        {
            name: secondName
        }
    ] = users;

Результат:

    firstName → "John"
    secondName → "Peter"

---

# Array всередині Array

    const data = [
        10,
        [
            20,
            30
        ]
    ];

    const [
        first,
        [
            second,
            third
        ]
    ] = data;

Результат:

    first → 10
    second → 20
    third → 30

---

# Destructuring Return Value

Function може повертати object:

    function createUser() {

        return {
            name: "John",
            age: 30
        };

    }

    const {
        name,
        age
    } = createUser();

Тепер:

    name → "John"
    age → 30

---

# Destructuring Array Return Value

    function getCoordinates() {

        return [
            50.45,
            30.52
        ];

    }

    const [
        latitude,
        longitude
    ] = getCoordinates();

Результат:

    latitude → 50.45
    longitude → 30.52

---

# Swapping Variables

Destructuring дозволяє легко поміняти значення двох змінних.

Без destructuring потрібно було б використовувати тимчасову variable.

З destructuring:

    let a = 10;
    let b = 20;

    [a, b] = [b, a];

Результат:

    a → 20
    b → 10

---

# Swapping трьох змінних

    let a = 1;
    let b = 2;
    let c = 3;

    [a, b, c] = [c, a, b];

Результат:

    a → 3
    b → 1
    c → 2

---

# Destructuring Assignment

Destructuring можна використовувати не тільки при declaration.

Наприклад:

    let first;
    let second;

    [first, second] = [10, 20];

Результат:

    first → 10
    second → 20

Для object також:

    let name;
    let age;

    ({
        name,
        age
    } = {
        name: "John",
        age: 30
    });

---

# Чому потрібні дужки

Якщо object destructuring assignment починається з `{`, JavaScript може сприйняти його як block statement.

Тому використовують:

    ({
        name,
        age
    } = user);

А не:

    {
        name,
        age
    } = user;

---

# Destructuring та `undefined`

Наприклад:

    const {
        name
    } = {};

Результат:

    name → undefined

Так само для array:

    const [
        first
    ] = [];

Результат:

    first → undefined

---

# Destructuring `null`

Object destructuring з `null` або `undefined` викличе error.

Наприклад:

    const {
        name
    } = null;

Це помилка.

Так само:

    const {
        name
    } = undefined;

---

# Optional Chaining vs Destructuring

Optional chaining:

    user?.address?.city

дозволяє безпечно звертатися до nested property.

Destructuring:

    const {
        address: {
            city
        }
    } = user;

очікує відповідну структуру.

Якщо nested object може бути відсутній, destructuring потрібно робити обережніше.

---

# Default Object для Nested Destructuring

Наприклад:

    function showCity({
        address: {
            city
        } = {}
    }) {

        console.log(city);

    }

Тепер якщо `address` відсутній:

    showCity({
        name: "John"
    });

`city` буде:

    undefined

замість помилки через відсутній `address`.

---

# Default Parameter Object

Це особливо важливо для functions.

Небезпечно:

    function greet({
        name
    }) {

        console.log(name);

    }

    greet();

Тут буде error, тому що parameter:

    undefined

не можна destructure як object.

Безпечніше:

    function greet({
        name
    } = {}) {

        console.log(name);

    }

    greet();

Результат:

    undefined

---

# Default Parameter + Property Default

Можна мати два рівні defaults:

    function greet({
        name = "Guest",
        age = 18
    } = {}) {

        console.log(name);
        console.log(age);

    }

Виклик:

    greet();

Результат:

    Guest
    18

---

# Renaming + Default

    const user = {};

    const {
        name: userName = "Guest"
    } = user;

Результат:

    userName → "Guest"

---

# Rest + Renaming

    const user = {

        name: "John",
        age: 30,
        city: "Vinnytsia"

    };

    const {
        name: userName,
        ...details
    } = user;

Результат:

    userName → "John"

    details → {
        age: 30,
        city: "Vinnytsia"
    }

---

# Destructuring у `for...of`

Можна destructure elements прямо в циклі.

    const users = [

        {
            name: "John",
            age: 30
        },

        {
            name: "Peter",
            age: 25
        }

    ];

    for (const {
        name,
        age
    } of users) {

        console.log(name, age);

    }

---

# Destructuring у `forEach`

    users.forEach(
        ({ name, age }) => {

            console.log(
                name,
                age
            );

        }
    );

Це дуже поширений pattern.

---

# Destructuring у `map`

    const names = users.map(
        ({ name }) => name
    );

Тепер:

    names

містить:

    [
        "John",
        "Peter"
    ]

---

# Destructuring у `filter`

    const adults = users.filter(
        ({ age }) => age >= 18
    );

Тут destructuring дозволяє одразу отримати:

    age

з кожного object.

---

# Destructuring у `reduce`

Наприклад:

    const totalAge = users.reduce(
        (total, { age }) =>
            total + age,
        0
    );

Destructuring parameter:

    { age }

дозволяє не писати:

    user.age

---

# Destructuring та `Object.entries()`

`Object.entries()` повертає array пар:

    [
        ["name", "John"],
        ["age", 30]
    ]

Їх зручно destructure:

    const user = {
        name: "John",
        age: 30
    };

    for (const [
        key,
        value
    ] of Object.entries(user)) {

        console.log(
            key,
            value
        );

    }

---

# Destructuring та `Object.keys()`

    const user = {
        name: "John",
        age: 30
    };

    const [
        firstKey
    ] = Object.keys(user);

Тепер:

    firstKey → "name"

---

# Destructuring та `Object.values()`

    const user = {
        name: "John",
        age: 30
    };

    const [
        firstValue
    ] = Object.values(user);

Тепер:

    firstValue → "John"

---

# Destructuring Import

Destructuring syntax концептуально схожий із named imports.

Наприклад:

    import {
        useState,
        useEffect
    } from "react";

Тут ми отримуємо конкретні named exports.

Це не звичайний runtime object destructuring, але syntax використовує подібну ідею вибору named bindings.

---

# Destructuring та API Response

Типовий приклад:

    const response = await fetch(url);

    const {
        data,
        status
    } = response;

Можна одразу отримати потрібні properties object.

---

# Nested API Data

Наприклад response:

    const response = {
        data: {
            user: {
                name: "John",
                age: 30
            }
        }
    };

Можна написати:

    const {
        data: {
            user: {
                name,
                age
            }
        }
    } = response;

---

# Обережно з Deep Destructuring

Глибокий destructuring може стати важким для читання.

Наприклад:

    const {
        data: {
            user: {
                profile: {
                    settings: {
                        theme
                    }
                }
            }
        }
    } = response;

Технічно це працює, але код може бути складним для підтримки.

Іноді краще:

    const user =
        response.data.user;

    const theme =
        user.profile.settings.theme;

Або використати:

    optional chaining

залежно від задачі.

---

# Destructuring не копіює Object повністю

Наприклад:

    const user = {
        name: "John",
        address: {
            city: "Vinnytsia"
        }
    };

    const {
        address
    } = user;

`address` посилається на той самий nested object.

Тобто:

    address === user.address

Результат:

    true

---

# Destructuring та Reference

Наприклад:

    const user = {
        profile: {
            name: "John"
        }
    };

    const {
        profile
    } = user;

    profile.name = "Peter";

Тепер:

    user.profile.name

також:

    "Peter"

Тому що destructuring не робить deep clone.

---

# Destructuring та Primitive Values

Object destructuring може працювати з primitive values через відповідну object wrapper semantics.

Наприклад:

    const {
        length
    } = "Hello";

Тепер:

    length → 5

Але для практичного коду важливо не зловживати такими можливостями.

---

# Array Destructuring та Iterable

Array destructuring працює не тільки з Array.

Він працює з iterable values.

Наприклад:

    const text = "ABC";

    const [
        first,
        second,
        third
    ] = text;

Результат:

    first → "A"
    second → "B"
    third → "C"

---

# String Destructuring

    const [
        first,
        ...rest
    ] = "Hello";

Результат:

    first → "H"

    rest → [
        "e",
        "l",
        "l",
        "o"
    ]

---

# Destructuring та Set

`Set` є iterable:

    const numbers =
        new Set([10, 20, 30]);

    const [
        first,
        second
    ] = numbers;

Результат:

    first → 10
    second → 20

---

# Destructuring та Map

`Map` також iterable.

    const map = new Map([
        ["name", "John"],
        ["age", 30]
    ]);

    for (const [
        key,
        value
    ] of map) {

        console.log(
            key,
            value
        );

    }

Тут destructuring кожної pair:

    [key, value]

---

# Object Rest vs Spread

Це дуже важливо не плутати.

Destructuring:

    const {
        name,
        ...rest
    } = user;

`...rest`:

    збирає залишок

Spread:

    const copy = {
        ...user
    };

`...user`:

    розгортає properties

Отже:

    Rest
        ↓
    collect

    Spread
        ↓
    expand

---

# Array Rest vs Spread

Rest:

    const [
        first,
        ...rest
    ] = numbers;

Збирає:

    rest

Spread:

    const newNumbers = [
        ...numbers
    ];

Розгортає:

    numbers

---

# Rest Parameters vs Destructuring Rest

Не плутай:

    function sum(...numbers) {}

це:

    rest parameter

А:

    const [
        first,
        ...rest
    ] = numbers;

це:

    rest element у destructuring

Ідея схожа:

    collect remaining values

але синтаксичний контекст різний.

---

# Destructuring та Spread Разом

Дуже поширений pattern:

    const user = {
        name: "John",
        age: 30,
        city: "Vinnytsia"
    };

    const {
        name,
        ...rest
    } = user;

    const updatedUser = {
        ...rest,
        name: "Peter"
    };

---

# Видалення Property через Destructuring + Rest

Наприклад потрібно створити object без `password`.

    const user = {
        name: "John",
        email: "john@example.com",
        password: "secret"
    };

    const {
        password,
        ...safeUser
    } = user;

Тепер:

    safeUser

містить:

    {
        name: "John",
        email: "john@example.com"
    }

Це створює новий object з решти properties.

---

# Практичний Pattern: API Data

    const response = {
        id: 1,
        name: "John",
        email: "john@example.com",
        password: "secret"
    };

    const {
        password,
        ...publicUser
    } = response;

`publicUser` можна використовувати як object без `password`.

---

# Практичний Pattern: Rename

Наприклад API повертає:

    {
        user_name: "John"
    }

У JavaScript можна зробити:

    const {
        user_name: userName
    } = data;

Тепер у коді:

    userName

---

# Практичний Pattern: Function Options

Destructuring дуже зручний для configuration objects.

    function createButton({
        text,
        type = "button",
        disabled = false
    } = {}) {

        console.log(
            text,
            type,
            disabled
        );

    }

Виклик:

    createButton({
        text: "Save",
        disabled: true
    });

---

# Чому Options Object зручний

Замість:

    createButton(
        "Save",
        "button",
        false
    );

можна:

    createButton({
        text: "Save",
        type: "button",
        disabled: false
    });

Це особливо корисно, коли parameters багато.

---

# Практичний Pattern: React

Destructuring дуже часто зустрічається у React components.

Наприклад:

    function UserCard({
        name,
        age
    }) {

        return (
            <div>
                {name} — {age}
            </div>
        );

    }

Замість:

    function UserCard(props) {

        return (
            <div>
                {props.name} — {props.age}
            </div>
        );

    }

Обидва варіанти можливі.

---

# Практичний Pattern: Props + Rest

    function Button({
        children,
        ...props
    }) {

        return (
            <button {...props}>
                {children}
            </button>
        );

    }

Тут:

    children

отримується окремо,

а:

    ...props

збирає інші properties.

---

# Практичний Pattern: Next.js / TypeScript

У TypeScript destructuring часто використовується разом із typed objects.

Наприклад:

    type User = {
        name: string;
        age: number;
    };

    function showUser({
        name,
        age
    }: User) {

        console.log(name, age);

    }

Тут destructuring відбувається безпосередньо в parameters.

---

# Типова помилка №1

❌ Плутати object та array destructuring.

Object:

    const {
        name
    } = user;

Array:

    const [
        first
    ] = users;

Object використовує:

    property name

Array використовує:

    position

---

# Типова помилка №2

❌ Думати, що порядок важливий для object destructuring.

    const {
        age,
        name
    } = user;

і:

    const {
        name,
        age
    } = user;

дають ті самі bindings.

---

# Типова помилка №3

❌ Забувати про `undefined`.

    const {
        age
    } = user;

Якщо `age` відсутній:

    age === undefined

---

# Типова помилка №4

❌ Очікувати, що default працює з `null`.

    const {
        age = 18
    } = {
        age: null
    };

Результат:

    age === null

Default працює при:

    undefined

---

# Типова помилка №5

❌ Плутати rename syntax.

Правильно:

    const {
        name: userName
    } = user;

Це означає:

    property:
        name

    variable:
        userName

---

# Типова помилка №6

❌ Плутати Rest і Spread.

    const {
        name,
        ...rest
    } = user;

Rest:

    collect

А:

    const copy = {
        ...user
    };

Spread:

    expand

---

# Типова помилка №7

❌ Забувати, що rest має бути останнім.

Неправильно:

    const [
        ...rest,
        last
    ] = numbers;

---

# Типова помилка №8

❌ Деструктурувати `undefined`.

    const {
        name
    } = undefined;

Це error.

Для function parameter часто допомагає:

    function greet({
        name
    } = {}) {}

---

# Типова помилка №9

❌ Робити занадто глибокий destructuring.

Наприклад:

    const {
        data: {
            response: {
                user: {
                    profile: {
                        settings: {
                            theme
                        }
                    }
                }
            }
        }
    } = result;

Якщо структура складна, код стає важко читати та підтримувати.

---

# Типова помилка №10

❌ Вважати destructuring deep clone.

    const {
        profile
    } = user;

Не створює незалежну копію:

    profile

Якщо це object, це reference на той самий nested object.

---

# Практичні завдання

## Завдання 1 — Object Destructuring

Є:

    const user = {
        name: "John",
        age: 30,
        city: "Vinnytsia"
    };

Отримай через destructuring:

    name
    age
    city

---

## Завдання 2 — Вибірковий Destructuring

З object:

    const user = {
        name: "John",
        age: 30,
        city: "Vinnytsia"
    };

отримай тільки:

    name

---

## Завдання 3 — Rename

Створи:

    userName
    userAge

з:

    name
    age

через destructuring.

---

## Завдання 4 — Default Value

Є:

    const user = {
        name: "John"
    };

Зроби:

    age = 18

через destructuring.

---

## Завдання 5 — Object Rest

Є:

    const user = {
        name: "John",
        age: 30,
        city: "Vinnytsia"
    };

Отримай:

    name

окремо, а:

    age
    city

збери в:

    rest

---

## Завдання 6 — Array Destructuring

Є:

    const numbers = [
        10,
        20,
        30
    ];

Отримай:

    first
    second
    third

---

## Завдання 7 — Пропусти Element

Є:

    const numbers = [
        10,
        20,
        30
    ];

Отримай тільки:

    first
    third

---

## Завдання 8 — Array Rest

Є:

    const numbers = [
        10,
        20,
        30,
        40
    ];

Отримай:

    first

і:

    rest

---

## Завдання 9 — Nested Object

Є:

    const user = {

        name: "John",

        address: {
            city: "Vinnytsia",
            country: "Ukraine"
        }

    };

Через destructuring отримай:

    name
    city
    country

---

## Завдання 10 — Nested Array

Є:

    const data = [
        [10, 20],
        [30, 40]
    ];

Через destructuring отримай:

    a
    b
    c
    d

---

## Завдання 11 — Function Parameter

Створи function:

    showUser()

яка приймає:

    {
        name,
        age
    }

і виводить їх.

Виклик:

    showUser({
        name: "John",
        age: 30
    });

---

## Завдання 12 — Default Parameter

Створи:

    greet({
        name,
        age
    })

так, щоб function можна було викликати:

    greet();

без помилки.

---

## Завдання 13 — Swapping

Поміняй місцями:

    let a = 10;
    let b = 20;

через array destructuring.

---

## Завдання 14 — Remove Property

Є:

    const user = {
        name: "John",
        email: "john@example.com",
        password: "secret"
    };

Створи:

    safeUser

без:

    password

---

## Завдання 15 — Array of Objects

Є:

    const users = [
        {
            name: "John",
            age: 30
        },
        {
            name: "Peter",
            age: 25
        }
    ];

За допомогою `map()` та destructuring отримай:

    [
        "John",
        "Peter"
    ]

---

## Завдання 16 — Filter

За допомогою `filter()` та destructuring отримай users:

    age >= 18

---

## Завдання 17 — Object.entries

Є:

    const user = {
        name: "John",
        age: 30
    };

Перебери object через:

    Object.entries()

та destructuring:

    [key, value]

---

# Практика: передбач результат

## Приклад 1

    const user = {
        name: "John",
        age: 30
    };

    const {
        name,
        age
    } = user;

    console.log(name);
    console.log(age);

Що буде?

---

## Приклад 2

    const user = {
        name: "John"
    };

    const {
        age = 18
    } = user;

Що міститиме:

    age

---

## Приклад 3

    const user = {
        age: null
    };

    const {
        age = 18
    } = user;

Що міститиме:

    age

---

## Приклад 4

    const numbers = [
        10,
        20,
        30
    ];

    const [
        first,
        ,
        third
    ] = numbers;

Що міститимуть:

    first
    third

---

## Приклад 5

    const user = {
        name: "John",
        age: 30,
        city: "Vinnytsia"
    };

    const {
        name,
        ...rest
    } = user;

Що міститиме:

    name

і що міститиме:

    rest

---

## Приклад 6

    const user = {
        name: "John"
    };

    const {
        name: userName
    } = user;

Яка назва змінної?

---

## Приклад 7

    const data = [
        [1, 2],
        [3, 4]
    ];

    const [
        [a, b],
        [c, d]
    ] = data;

Що міститимуть:

    a
    b
    c
    d

---

## Приклад 8

    const user = {
        profile: {
            name: "John"
        }
    };

    const {
        profile
    } = user;

    profile.name = "Peter";

Що буде:

    user.profile.name

---

# Питання зі співбесіди

Що таке destructuring?

Чим object destructuring відрізняється від array destructuring?

Як працює object destructuring?

Як працює array destructuring?

Чи має значення порядок properties в object destructuring?

Чи має значення порядок elements в array destructuring?

Як перейменувати variable під час destructuring?

Як задати default value?

Коли використовується default value?

Чи спрацює default value для `null`?

Що таке rest element?

Де повинен знаходитися rest element?

Чим rest відрізняється від spread?

Як destructuring працює у function parameters?

Як destructuring працює з return value?

Як виконати nested destructuring?

Як пропустити element array?

Як поміняти місцями дві variables через destructuring?

Що відбувається, якщо destructure відсутню property?

Що відбувається, якщо destructure `undefined`?

Що відбувається, якщо destructure `null`?

Чому іноді потрібно використовувати:

    = {}

у function parameter?

Чи створює destructuring deep clone?

Як destructuring працює з references?

Як використовувати destructuring разом із `map()`?

Як використовувати destructuring разом із `filter()`?

Як використовувати destructuring разом із `Object.entries()`?

Як використовувати destructuring для видалення property з нового object?

---

# Junior Level

Потрібно вміти:

    використовувати object destructuring

    використовувати array destructuring

    розуміти різницю між ними

    використовувати default values

    перейменовувати variables

    використовувати rest

    робити nested destructuring

    destructure function parameters

    destructure return values

    міняти місцями variables

    використовувати destructuring у map()

    використовувати destructuring у filter()

    використовувати destructuring у for...of

    використовувати destructuring у Object.entries()

    розуміти різницю між rest та spread

---

# Middle Level

Потрібно розуміти:

    nested destructuring

    defaults

    defaults у nested structures

    parameter destructuring

    options objects

    rest properties

    rest elements

    destructuring assignment

    references

    shallow behavior

    iterable destructuring

    destructuring у callbacks

    destructuring у array methods

    destructuring API responses

    destructuring React props

    destructuring configuration objects

    destructuring разом із spread

---

# Senior Level

Глибше розуміння:

    Binding Patterns

    Assignment Patterns

    Object Binding Pattern

    Array Binding Pattern

    Object Assignment Pattern

    Array Assignment Pattern

    Iterator protocol

    Iterable protocol

    IteratorClose

    property access semantics

    computed property names

    default initializers

    lexical bindings

    temporal dead zone

    rest properties

    rest elements

    CopyDataProperties

    iterator destructuring

    nested binding patterns

    function parameter binding

    destructuring assignment semantics

    evaluation order

    side effects у default initializers

---

# Міні-шпаргалка

## Object

    const {
        name,
        age
    } = user;

Object:

    property → variable

---

## Object Rename

    const {
        name: userName
    } = user;

    name → userName

---

## Object Default

    const {
        age = 18
    } = user;

---

## Object Rest

    const {
        name,
        ...rest
    } = user;

    name → окремо

    rest → решта properties

---

## Array

    const [
        first,
        second
    ] = numbers;

Array:

    position → variable

---

## Array Skip

    const [
        first,
        ,
        third
    ] = numbers;

---

## Array Default

    const [
        first,
        second = 20
    ] = numbers;

---

## Array Rest

    const [
        first,
        ...rest
    ] = numbers;

---

## Nested Object

    const {
        address: {
            city
        }
    } = user;

---

## Nested Array

    const [
        [a, b],
        [c, d]
    ] = data;

---

## Function Parameter

    function greet({
        name,
        age
    }) {

        console.log(
            name,
            age
        );

    }

---

## Function Parameter Default

    function greet({
        name = "Guest"
    } = {}) {

        console.log(name);

    }

---

## Swapping

    [a, b] = [b, a];

---

## Object Rest vs Spread

    const {
        name,
        ...rest
    } = user;

    // Rest → collect


    const copy = {
        ...user
    };

    // Spread → expand

---

# Object vs Array

| Feature | Object Destructuring | Array Destructuring |
|---|---|---|
| Syntax | `{}` | `[]` |
| Основний принцип | property name | position |
| Порядок | не важливий | важливий |
| Rename | так | через variable name |
| Default | так | так |
| Rest | `...rest` | `...rest` |
| Nested | так | так |
| Function parameters | так | так |
| Return values | так | так |

---

# Destructuring vs Spread

| Feature | Destructuring | Spread |
|---|---|---|
| Основна дія | отримати значення | розгорнути значення |
| Object | `{ name } = user` | `{ ...user }` |
| Array | `[first] = numbers` | `[...numbers]` |
| Rest | збирає залишок | — |
| Spread | — | розгортає |

---

# Головна ментальна модель

Для Object:

    object
       ↓
    property name
       ↓
    variable

Наприклад:

    const {
        name
    } = user;

---

Для Array:

    array
       ↓
    position
       ↓
    variable

Наприклад:

    const [
        first
    ] = numbers;

---

# Друга ментальна модель

Destructuring:

    "Візьми мені ці значення
     зі структури."

Наприклад:

    const {
        name,
        age
    } = user;

означає:

    user.name → name
    user.age  → age

---

# Третя ментальна модель

Object:

    {
        name,
        age
    }

означає:

    знайди properties
    з такими іменами

Array:

    [
        first,
        second
    ]

означає:

    візьми values
    за позиціями

---

# Четверта ментальна модель

Rest:

    ...

у destructuring означає:

    "Збери все,
     що залишилося."

Наприклад:

    const {
        name,
        ...rest
    } = user;

---

# П'ята ментальна модель

Spread:

    ...

у створенні нового object/array означає:

    "Розгорни значення."

Наприклад:

    const copy = {
        ...user
    };

---

# Головне

• `Destructuring` дозволяє витягувати значення зі структур даних.

• Object destructuring використовує назви properties.

• Array destructuring використовує позиції elements.

• Object:

    const {
        name
    } = user;

• Array:

    const [
        first
    ] = numbers;

• Properties можна перейменовувати:

    const {
        name: userName
    } = user;

• Можна задавати default values:

    const {
        age = 18
    } = user;

• Default value використовується для `undefined`, але не для `null`.

• Object rest збирає properties, що залишилися:

    const {
        name,
        ...rest
    } = user;

• Array rest збирає elements, що залишилися:

    const [
        first,
        ...rest
    ] = numbers;

• Rest element повинен бути останнім.

• Destructuring може бути nested.

• Destructuring можна використовувати у function parameters.

• Destructuring можна використовувати з function return values.

• Destructuring дозволяє легко міняти місцями variables:

    [a, b] = [b, a];

• Destructuring часто використовується разом із:

    map()
    filter()
    reduce()
    for...of
    Object.entries()

• Destructuring дуже часто використовується в React для props.

• Destructuring зручний для configuration/options objects.

• Object rest і spread — різні операції.

• Rest:

    collect

• Spread:

    expand

• Destructuring не є deep clone.

• Якщо destructured value є object, reference може залишатися спільним.

---

# Найкоротша шпаргалка

    // Object
    const {
        name,
        age
    } = user;


    // Object rename
    const {
        name: userName
    } = user;


    // Object default
    const {
        age = 18
    } = user;


    // Object rest
    const {
        name,
        ...rest
    } = user;


    // Array
    const [
        first,
        second
    ] = numbers;


    // Array skip
    const [
        first,
        ,
        third
    ] = numbers;


    // Array default
    const [
        first,
        second = 20
    ] = numbers;


    // Array rest
    const [
        first,
        ...rest
    ] = numbers;


    // Nested object
    const {
        address: {
            city
        }
    } = user;


    // Nested array
    const [
        [a, b],
        [c, d]
    ] = data;


    // Function parameter
    function greet({
        name,
        age
    }) {

        console.log(
            name,
            age
        );

    }


    // Function parameter default
    function greet({
        name = "Guest"
    } = {}) {

        console.log(name);

    }


    // Swap
    [a, b] = [b, a];


# Формула

    Object Destructuring
        ↓
    property name
        ↓
    variable


    Array Destructuring
        ↓
    position
        ↓
    variable


    Rest
        ↓
    collect remaining


    Spread
        ↓
    expand values


    Destructuring
        ↓
    extract values
        ↓
    from objects / arrays
        ↓
    into variables