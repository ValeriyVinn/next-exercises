# 01. forEach() — map() — filter()

`forEach()`, `map()` та `filter()` — базові методи масивів JavaScript.

Вони дозволяють виконувати операції над елементами масиву без написання класичного циклу `for`.

Основна ідея:

    forEach() → виконати дію для кожного елемента
    map()     → перетворити кожен елемент і створити новий масив
    filter()  → відібрати елементи та створити новий масив

Ці методи дуже часто використовуються у:

    JavaScript
    React
    Next.js
    Node.js
    TypeScript

Особливо важливо розуміти різницю між:

    forEach()
    map()
    filter()

бо вони мають різне призначення.

---

### Ключові поняття

✔ array methods  
✔ array iteration  
✔ callback  
✔ callback function  
✔ current element  
✔ index  
✔ array  
✔ return  
✔ mutation  
✔ immutability  
✔ `forEach()`  
✔ `map()`  
✔ `filter()`  
✔ transformation  
✔ selection  
✔ side effect  
✔ new array  
✔ original array  
✔ chaining  
✔ predicate  
✔ declarative code  

---

### Що потрібно пам'ятати

• `forEach()` виконує callback для кожного елемента масиву.

• `forEach()` не створює новий масив із результатів callback.

• `map()` створює новий масив тієї самої довжини.

• `map()` використовується для transformation — перетворення кожного елемента.

• `filter()` створює новий масив тільки з елементів, для яких callback повернув truthy.

• `filter()` може повернути масив меншої довжини.

• `map()` очікує, що callback поверне нове значення.

• `filter()` очікує, що callback поверне `true` або `false`-подібний результат.

• `forEach()` повертає `undefined`.

• `map()` повертає новий array.

• `filter()` повертає новий array.

• Самі методи `forEach()`, `map()` та `filter()` не змінюють оригінальний масив, якщо callback сам не мутує його.

• Callback отримує:

    element
    index
    array

• `map()` та `filter()` дуже часто використовуються разом із arrow functions.

• `map()` часто використовується для створення UI-елементів у React.

• `filter()` часто використовується для пошуку підмножини даних.

• `forEach()` підходить для side effects.

---

# Array Method Pattern

Загальний вигляд:

    array.method(callback);

Наприклад:

    const numbers = [1, 2, 3];

    numbers.forEach((number) => {
        console.log(number);
    });

Тут:

    array
        ↓
    method
        ↓
    callback
        ↓
    current element

---

# Callback

Callback — функція, яку передають іншій функції як аргумент.

Наприклад:

    function printNumber(number) {
        console.log(number);
    }

    const numbers = [10, 20, 30];

    numbers.forEach(printNumber);

Те саме можна записати через arrow function:

    numbers.forEach((number) => {
        console.log(number);
    });

---

# Callback Parameters

Array methods передають callback інформацію про поточний елемент.

Основний порядок:

    element
    index
    array

Наприклад:

    const fruits = ["apple", "banana", "orange"];

    fruits.forEach((fruit, index, array) => {
        console.log(fruit);
        console.log(index);
        console.log(array);
    });

Перший параметр:

    element

Другий:

    index

Третій:

    array

---

# element

Перший параметр callback — поточний елемент.

    const numbers = [10, 20, 30];

    numbers.forEach((number) => {
        console.log(number);
    });

Результат:

    10
    20
    30

---

# index

Другий параметр — index поточного елемента.

    const numbers = [10, 20, 30];

    numbers.forEach((number, index) => {
        console.log(index, number);
    });

Результат:

    0 10
    1 20
    2 30

---

# array

Третій параметр — сам масив.

    const numbers = [10, 20, 30];

    numbers.forEach((number, index, array) => {
        console.log(array);
    });

На кожній ітерації callback отримує посилання на масив:

    [10, 20, 30]

---

# forEach()

`forEach()` виконує callback один раз для кожного елемента масиву.

Синтаксис:

    array.forEach(callback);

Наприклад:

    const numbers = [10, 20, 30];

    numbers.forEach((number) => {
        console.log(number);
    });

Результат:

    10
    20
    30

---

# forEach() — базовий приклад

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    fruits.forEach((fruit) => {
        console.log(fruit);
    });

Результат:

    apple
    banana
    orange

---

# forEach() та index

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    fruits.forEach((fruit, index) => {
        console.log(`${index}: ${fruit}`);
    });

Результат:

    0: apple
    1: banana
    2: orange

---

# forEach() та array

    const numbers = [10, 20, 30];

    numbers.forEach((number, index, array) => {
        console.log({
            number,
            index,
            array
        });
    });

---

# forEach() нічого не повертає

Це одна з найважливіших властивостей.

    const numbers = [1, 2, 3];

    const result = numbers.forEach((number) => {
        return number * 2;
    });

    console.log(result);

Результат:

    undefined

Навіть якщо callback робить:

    return number * 2;

`forEach()` не збирає ці значення в новий масив.

---

# forEach() — side effects

`forEach()` часто використовується для side effects.

Наприклад:

    const users = [
        { name: "John" },
        { name: "Anna" },
        { name: "Tom" }
    ];

    users.forEach((user) => {
        console.log(user.name);
    });

Інший приклад:

    const numbers = [1, 2, 3];

    numbers.forEach((number) => {
        console.log(number);
    });

Side effect тут:

    console.log()

---

# forEach() та DOM

`forEach()` часто використовується для виконання дії над кожним елементом.

Наприклад:

    const buttons = document.querySelectorAll("button");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            console.log("Clicked");
        });
    });

Це типовий практичний сценарій.

---

# forEach() vs for

Класичний цикл:

    const numbers = [10, 20, 30];

    for (let i = 0; i < numbers.length; i++) {
        console.log(numbers[i]);
    }

Через `forEach()`:

    const numbers = [10, 20, 30];

    numbers.forEach((number) => {
        console.log(number);
    });

`forEach()` часто читати простіше, якщо потрібно просто виконати дію для кожного елемента.

---

# map()

`map()` створює новий масив, застосовуючи callback до кожного елемента.

Синтаксис:

    const newArray = array.map(callback);

Наприклад:

    const numbers = [1, 2, 3];

    const doubled = numbers.map((number) => {
        return number * 2;
    });

Результат:

    [2, 4, 6]

Оригінальний масив:

    [1, 2, 3]

---

# Основна ідея map()

`map()` означає:

    один елемент
        ↓
    transformation
        ↓
    новий елемент

Наприклад:

    1 → 2
    2 → 4
    3 → 6

Отримуємо:

    [2, 4, 6]

---

# map() — короткий запис

Замість:

    const doubled = numbers.map((number) => {
        return number * 2;
    });

можна:

    const doubled = numbers.map(number => number * 2);

Це дуже поширений стиль.

---

# map() та index

`map()` також отримує index.

    const fruits = [
        "apple",
        "banana",
        "orange"
    ];

    const result = fruits.map((fruit, index) => {
        return `${index}: ${fruit}`;
    });

Результат:

    [
        "0: apple",
        "1: banana",
        "2: orange"
    ]

---

# map() та array

Третій параметр — оригінальний масив.

    const numbers = [10, 20, 30];

    const result = numbers.map((number, index, array) => {
        console.log(array);

        return number * 2;
    });

---

# map() зберігає довжину

Це важлива властивість `map()`.

Якщо:

    const numbers = [1, 2, 3, 4];

то:

    const result = numbers.map(number => number * 2);

дасть:

    [2, 4, 6, 8]

Довжина:

    4

була:

    4

і залишилася:

    4

Загальна ідея:

    input length === output length

---

# map() — transformation

`map()` використовується, коли потрібно перетворити дані.

Наприклад:

    const prices = [10, 20, 30];

    const pricesWithTax = prices.map(price => price * 1.2);

Результат:

    [12, 24, 36]

---

# map() — strings

    const names = [
        "john",
        "anna",
        "tom"
    ];

    const upperNames = names.map(name => name.toUpperCase());

Результат:

    [
        "JOHN",
        "ANNA",
        "TOM"
    ]

---

# map() — objects

`map()` може перетворювати об'єкти.

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

Отримати тільки імена:

    const names = users.map(user => user.name);

Результат:

    [
        "John",
        "Anna"
    ]

---

# map() — створення нового object

Можна створити нові об'єкти:

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

    const result = users.map(user => ({
        id: user.id,
        username: user.name.toLowerCase()
    }));

Результат:

    [
        {
            id: 1,
            username: "john"
        },
        {
            id: 2,
            username: "anna"
        }
    ]

---

# map() та return

Callback `map()` повинен повертати значення, яке потрапить у новий масив.

Правильно:

    const numbers = [1, 2, 3];

    const doubled = numbers.map(number => {
        return number * 2;
    });

Результат:

    [2, 4, 6]

---

# map() без return

Типова помилка:

    const numbers = [1, 2, 3];

    const doubled = numbers.map(number => {
        number * 2;
    });

Результат:

    [undefined, undefined, undefined]

Причина:

    callback нічого не повертає.

Правильно:

    const doubled = numbers.map(number => {
        return number * 2;
    });

Або:

    const doubled = numbers.map(number => number * 2);

---

# map() та object literals

При поверненні object через arrow function потрібно використовувати круглі дужки.

Правильно:

    const result = users.map(user => ({
        id: user.id,
        name: user.name
    }));

Не так:

    const result = users.map(user => {
        id: user.id,
        name: user.name
    });

У другому випадку `{}` сприймається як block body, а не object literal.

---

# filter()

`filter()` створює новий масив з елементів, які відповідають умові.

Синтаксис:

    const newArray = array.filter(callback);

Наприклад:

    const numbers = [1, 2, 3, 4, 5];

    const evenNumbers = numbers.filter(number => {
        return number % 2 === 0;
    });

Результат:

    [2, 4]

---

# Основна ідея filter()

`filter()` означає:

    element
        ↓
    condition
        ↓
    true → залишити
    false → відкинути

Наприклад:

    1 → false
    2 → true
    3 → false
    4 → true
    5 → false

Результат:

    [2, 4]

---

# filter() — predicate

Callback `filter()` часто називають predicate function.

Predicate — функція, яка визначає:

    true
    false

Наприклад:

    const isEven = number => number % 2 === 0;

    const numbers = [1, 2, 3, 4];

    const result = numbers.filter(isEven);

Результат:

    [2, 4]

---

# filter() — короткий запис

Замість:

    const evenNumbers = numbers.filter((number) => {
        return number % 2 === 0;
    });

можна:

    const evenNumbers = numbers.filter(number => number % 2 === 0);

---

# filter() та index

    const numbers = [10, 20, 30];

    const result = numbers.filter((number, index) => {
        return index > 0;
    });

Результат:

    [20, 30]

---

# filter() та array

Третій параметр — оригінальний масив.

    const numbers = [1, 2, 3];

    const result = numbers.filter((number, index, array) => {
        console.log(array);

        return number > 1;
    });

---

# filter() може змінити довжину

На відміну від `map()`, результат `filter()` не обов'язково має таку саму довжину.

Наприклад:

    const numbers = [1, 2, 3, 4, 5];

    const result = numbers.filter(number => number > 3);

Результат:

    [4, 5]

Було:

    5 elements

Стало:

    2 elements

Може бути навіть:

    []

або весь масив.

---

# filter() — числа

    const numbers = [
        5,
        12,
        3,
        20,
        8
    ];

    const result = numbers.filter(number => number >= 10);

Результат:

    [12, 20]

---

# filter() — strings

    const words = [
        "cat",
        "elephant",
        "dog",
        "giraffe"
    ];

    const longWords = words.filter(word => word.length > 3);

Результат:

    [
        "elephant",
        "giraffe"
    ]

---

# filter() — objects

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

    const adults = users.filter(user => user.age >= 18);

Результат:

    [
        {
            name: "John",
            age: 25
        },
        {
            name: "Tom",
            age: 30
        }
    ]

---

# filter() — active users

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

    const activeUsers = users.filter(user => user.active);

Результат:

    [
        {
            name: "John",
            active: true
        },
        {
            name: "Tom",
            active: true
        }
    ]

---

# Truthy / Falsy у filter()

`filter()` не обов'язково повинен повертати буквально `true` або `false`.

Використовується truthy / falsy evaluation.

Наприклад:

    const values = [
        0,
        1,
        "",
        "hello",
        null,
        5
    ];

    const truthyValues = values.filter(value => value);

Результат:

    [
        1,
        "hello",
        5
    ]

---

# filter(Boolean)

Популярний короткий запис:

    const values = [
        0,
        1,
        "",
        "hello",
        null,
        5
    ];

    const result = values.filter(Boolean);

Результат:

    [
        1,
        "hello",
        5
    ]

Тут:

    Boolean(value)

використовується як callback.

---

# forEach vs map vs filter

Це одна з найважливіших частин теми.

## forEach()

    array.forEach(callback);

Призначення:

    виконати дію

Результат:

    undefined

---

## map()

    array.map(callback);

Призначення:

    transform

Результат:

    new array

Довжина:

    така сама

---

## filter()

    array.filter(callback);

Призначення:

    select

Результат:

    new array

Довжина:

    така сама або менша

---

# Головна таблиця

    forEach()
        → execute
        → side effect
        → undefined

    map()
        → transform
        → new array
        → same length

    filter()
        → select
        → new array
        → same or smaller length

---

# Один масив — три методи

Нехай:

    const numbers = [1, 2, 3, 4];

### forEach()

    numbers.forEach(number => {
        console.log(number * 2);
    });

Результат side effect:

    2
    4
    6
    8

Але:

    return value → undefined

---

### map()

    const doubled = numbers.map(number => number * 2);

Результат:

    [2, 4, 6, 8]

---

### filter()

    const even = numbers.filter(number => number % 2 === 0);

Результат:

    [2, 4]

---

# map() vs filter()

Дуже важлива різниця.

`map()`:

    кожен element
        ↓
    transform
        ↓
    новий element

Наприклад:

    [1, 2, 3]
        ↓
    [2, 4, 6]

`filter()`:

    кожен element
        ↓
    condition
        ↓
    залишити або видалити

Наприклад:

    [1, 2, 3, 4]
        ↓
    [2, 4]

---

# forEach() vs map()

Якщо потрібно просто виконати дію:

    numbers.forEach(number => {
        console.log(number);
    });

Якщо потрібно отримати новий масив:

    const doubled = numbers.map(number => {
        return number * 2;
    });

Не потрібно використовувати `map()` лише тому, що він повертає масив.

Якщо результат не потрібен, `forEach()` часто зрозуміліший.

---

# map() vs forEach() — типова помилка

❌ Непотрібний `map()`:

    numbers.map(number => {
        console.log(number);
    });

Якщо результат `map()` не використовується, це часто означає, що потрібен `forEach()`:

    numbers.forEach(number => {
        console.log(number);
    });

---

# filter() vs forEach()

Замість ручного накопичення:

    const numbers = [1, 2, 3, 4, 5];

    const evenNumbers = [];

    numbers.forEach(number => {
        if (number % 2 === 0) {
            evenNumbers.push(number);
        }
    });

можна:

    const evenNumbers = numbers.filter(number => {
        return number % 2 === 0;
    });

Другий варіант чіткіше виражає намір:

    filter → відфільтрувати

---

# Array Methods та Immutability

`forEach()`, `map()` та `filter()` самі по собі не змінюють довжину або елементи оригінального масиву.

Наприклад:

    const numbers = [1, 2, 3];

    const doubled = numbers.map(number => number * 2);

    console.log(numbers);
    console.log(doubled);

Результат:

    [1, 2, 3]
    [2, 4, 6]

Оригінал залишився:

    [1, 2, 3]

---

# Важливе уточнення про mutation

Метод може не мутувати масив, але callback може мутувати об'єкти всередині нього.

Наприклад:

    const users = [
        {
            name: "John"
        }
    ];

    users.forEach(user => {
        user.name = "Anna";
    });

Тепер:

    console.log(users);

Результат:

    [
        {
            name: "Anna"
        }
    ]

Тобто:

    array method ≠ гарантія повної immutability

Якщо елементи є objects, потрібно окремо думати про mutation самих objects.

---

# map() — створення копій об'єктів

Для створення нових об'єктів:

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

    const updatedUsers = users.map(user => ({
        ...user,
        active: true
    }));

Оригінальні об'єкти не змінюються.

---

# map() та spread

Поширений патерн:

    const users = [
        {
            id: 1,
            name: "John"
        }
    ];

    const result = users.map(user => ({
        ...user,
        active: true
    }));

Результат:

    [
        {
            id: 1,
            name: "John",
            active: true
        }
    ]

---

# Chaining

Array methods можна поєднувати.

Наприклад:

    const numbers = [1, 2, 3, 4, 5, 6];

    const result = numbers
        .filter(number => number % 2 === 0)
        .map(number => number * 10);

Результат:

    [20, 40, 60]

Логіка:

    [1, 2, 3, 4, 5, 6]
            ↓
        filter()
            ↓
        [2, 4, 6]
            ↓
          map()
            ↓
        [20, 40, 60]

Method chaining буде детально розглядатися у:

    10-method-chaining

---

# Практичний приклад — users

    const users = [
        {
            id: 1,
            name: "John",
            age: 25
        },
        {
            id: 2,
            name: "Anna",
            age: 17
        },
        {
            id: 3,
            name: "Tom",
            age: 30
        }
    ];

Отримати повнолітніх:

    const adults = users.filter(user => user.age >= 18);

Результат:

    [
        {
            id: 1,
            name: "John",
            age: 25
        },
        {
            id: 3,
            name: "Tom",
            age: 30
        }
    ]

---

# Практичний приклад — отримати names

    const names = users.map(user => user.name);

Результат:

    [
        "John",
        "Anna",
        "Tom"
    ]

---

# Практичний приклад — вивести names

    users.forEach(user => {
        console.log(user.name);
    });

Результат:

    John
    Anna
    Tom

---

# Практичний приклад — filter + map

Отримати імена дорослих користувачів:

    const adultNames = users
        .filter(user => user.age >= 18)
        .map(user => user.name);

Результат:

    [
        "John",
        "Tom"
    ]

Логіка:

    users
        ↓
    filter(age >= 18)
        ↓
    adults
        ↓
    map(name)
        ↓
    names

---

# Практичний приклад — ціни

    const prices = [
        100,
        250,
        80,
        500
    ];

Збільшити кожну ціну на 10%:

    const updatedPrices = prices.map(price => price * 1.1);

Результат:

    [
        110,
        275,
        88,
        550
    ]

---

# Практичний приклад — дорогі товари

    const prices = [
        100,
        250,
        80,
        500
    ];

    const expensive = prices.filter(price => price >= 200);

Результат:

    [
        250,
        500
    ]

---

# Практичний приклад — products

    const products = [
        {
            name: "Laptop",
            price: 1000
        },
        {
            name: "Phone",
            price: 700
        },
        {
            name: "Mouse",
            price: 30
        }
    ];

Отримати назви:

    const names = products.map(product => product.name);

Результат:

    [
        "Laptop",
        "Phone",
        "Mouse"
    ]

Отримати дорогі товари:

    const expensiveProducts = products.filter(
        product => product.price > 500
    );

---

# Практичний приклад — DOM

Нехай маємо:

    const users = [
        "John",
        "Anna",
        "Tom"
    ];

Створюємо HTML для кожного користувача:

    const html = users.map(user => {
        return `<li>${user}</li>`;
    });

Результат:

    [
        "<li>John</li>",
        "<li>Anna</li>",
        "<li>Tom</li>"
    ]

Це особливо важливий патерн для React.

---

# map() у React

У React `map()` дуже часто використовується для rendering lists.

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

У JSX:

    {users.map(user => (
        <li key={user.id}>
            {user.name}
        </li>
    ))}

Основна ідея:

    data
      ↓
    map()
      ↓
    UI elements

Це одна з причин, чому `map()` потрібно добре знати для frontend development.

---

# filter() у React

`filter()` часто використовується для відображення лише потрібних даних.

Наприклад:

    const activeUsers = users.filter(user => user.active);

Потім:

    {activeUsers.map(user => (
        <UserCard
            key={user.id}
            user={user}
        />
    ))}

Комбінація:

    filter()
        ↓
    map()
        ↓
    UI

дуже поширена у React.

---

# forEach() у React

`forEach()` зазвичай не використовують для створення JSX-масиву.

Наприклад, це не працює так, як очікується:

    const items = users.forEach(user => (
        <li>{user.name}</li>
    ));

`items` буде:

    undefined

Для створення нового масиву JSX-елементів використовується:

    map()

---

# Nested data

Array methods добре працюють із вкладеними даними.

Наприклад:

    const orders = [
        {
            id: 1,
            total: 100
        },
        {
            id: 2,
            total: 250
        },
        {
            id: 3,
            total: 50
        }
    ];

Отримати тільки великі замовлення:

    const bigOrders = orders.filter(
        order => order.total >= 200
    );

---

# Multiple conditions

`filter()` може мати декілька умов.

    const users = [
        {
            name: "John",
            age: 25,
            active: true
        },
        {
            name: "Anna",
            age: 17,
            active: true
        },
        {
            name: "Tom",
            age: 30,
            active: false
        }
    ];

    const result = users.filter(user => {
        return user.age >= 18 && user.active;
    });

Результат:

    [
        {
            name: "John",
            age: 25,
            active: true
        }
    ]

---

# filter() з OR

    const result = users.filter(user => {
        return user.age < 18 || user.age > 60;
    });

Тут залишаться:

    age < 18

або:

    age > 60

---

# map() з умовою

`map()` також може використовувати condition.

    const numbers = [1, 2, 3, 4];

    const result = numbers.map(number => {
        if (number % 2 === 0) {
            return number * 2;
        }

        return number;
    });

Результат:

    [1, 4, 3, 8]

Але якщо основна задача — вибрати елементи, краще `filter()`.

---

# map() не призначений для filtering

Типова помилка:

    const numbers = [1, 2, 3, 4];

    const result = numbers.map(number => {
        if (number % 2 === 0) {
            return number;
        }
    });

Результат:

    [
        undefined,
        2,
        undefined,
        4
    ]

Якщо потрібно отримати тільки парні числа:

    const result = numbers.filter(number => {
        return number % 2 === 0;
    });

Результат:

    [2, 4]

---

# filter() не призначений для transformation

Типова помилка:

    const numbers = [1, 2, 3];

    const result = numbers.filter(number => {
        return number * 2;
    });

Оскільки:

    2
    4
    6

є truthy, всі елементи залишаться.

Результат:

    [1, 2, 3]

Якщо потрібно перетворити елементи:

    const result = numbers.map(number => number * 2);

Результат:

    [2, 4, 6]

---

# Метод та його return value

Це потрібно знати напам'ять.

    forEach()
        → undefined

    map()
        → new array

    filter()
        → new filtered array

Наприклад:

    const numbers = [1, 2, 3];

    const a = numbers.forEach(number => number * 2);

    const b = numbers.map(number => number * 2);

    const c = numbers.filter(number => number > 1);

Отримаємо:

    a → undefined
    b → [2, 4, 6]
    c → [2, 3]

---

# Callback Return

Потрібно розрізняти:

    method return

і:

    callback return

Наприклад:

    const result = numbers.map(number => {
        return number * 2;
    });

Тут:

    callback return
        ↓
    number * 2

а:

    map return
        ↓
    new array

У `filter()`:

    callback return
        ↓
    true / false

а:

    filter return
        ↓
    new array

У `forEach()`:

    callback return
        ↓
    ігнорується

---

# Side Effects

Side effect — дія, яка змінює зовнішній стан або взаємодіє із зовнішнім середовищем.

Наприклад:

    let total = 0;

    [10, 20, 30].forEach(number => {
        total += number;
    });

Тут callback змінює:

    total

Це side effect.

Інший приклад:

    users.forEach(user => {
        console.log(user.name);
    });

`console.log()` також є side effect.

---

# Pure transformation

`map()` добре підходить для pure transformation.

Наприклад:

    const numbers = [1, 2, 3];

    const doubled = numbers.map(number => number * 2);

Функція:

    number => number * 2

не змінює зовнішній стан.

---

# Method Chaining Example

    const numbers = [1, 2, 3, 4, 5];

    const result = numbers
        .filter(number => number > 2)
        .map(number => number * 10);

Результат:

    [30, 40, 50]

Кроки:

    [1, 2, 3, 4, 5]
            ↓
    filter(number > 2)
            ↓
    [3, 4, 5]
            ↓
    map(number * 10)
            ↓
    [30, 40, 50]

---

# Practical Patterns

## Print every element

    numbers.forEach(number => {
        console.log(number);
    });

---

## Double every element

    const doubled = numbers.map(number => {
        return number * 2;
    });

---

## Get positive numbers

    const positive = numbers.filter(number => {
        return number > 0;
    });

---

## Get names

    const names = users.map(user => user.name);

---

## Get adults

    const adults = users.filter(user => user.age >= 18);

---

## Get active users

    const activeUsers = users.filter(user => user.active);

---

## Get active user names

    const activeNames = users
        .filter(user => user.active)
        .map(user => user.name);

---

## Convert strings to uppercase

    const upper = words.map(word => word.toUpperCase());

---

## Get long words

    const longWords = words.filter(word => word.length > 5);

---

# Типові помилки

❌ Очікувати масив від `forEach()`.

    const result = numbers.forEach(number => {
        return number * 2;
    });

Результат:

    undefined

Потрібно:

    const result = numbers.map(number => number * 2);

---

❌ Використовувати `map()` без return.

    const result = numbers.map(number => {
        number * 2;
    });

Результат:

    [undefined, undefined, ...]

Правильно:

    const result = numbers.map(number => {
        return number * 2;
    });

---

❌ Використовувати `map()` замість `filter()`.

    const result = numbers.map(number => {
        if (number > 10) {
            return number;
        }
    });

Отримаємо `undefined` для елементів, які не відповідають умові.

Правильно:

    const result = numbers.filter(number => number > 10);

---

❌ Використовувати `filter()` для transformation.

    const result = numbers.filter(number => number * 2);

Якщо потрібно змінити значення:

    const result = numbers.map(number => number * 2);

---

❌ Використовувати `forEach()` для створення нового масиву.

Замість:

    const result = [];

    numbers.forEach(number => {
        result.push(number * 2);
    });

краще:

    const result = numbers.map(number => number * 2);

---

❌ Забувати return object у `map()`.

Неправильно:

    const result = users.map(user => {
        id: user.id,
        name: user.name
    });

Правильно:

    const result = users.map(user => ({
        id: user.id,
        name: user.name
    }));

---

❌ Очікувати, що `map()` змінить original array.

    const numbers = [1, 2, 3];

    numbers.map(number => number * 2);

    console.log(numbers);

Результат:

    [1, 2, 3]

Потрібно зберегти результат:

    const doubled = numbers.map(number => number * 2);

---

❌ Забувати, що `filter()` може повернути порожній масив.

    const numbers = [1, 2, 3];

    const result = numbers.filter(number => number > 100);

Результат:

    []

Це нормальний результат.

---

# forEach() — коли використовувати

Використовуй `forEach()`, коли:

    потрібно виконати дію
    для кожного елемента

Наприклад:

    console.log()
    DOM manipulation
    event registration
    external side effect

Приклад:

    users.forEach(user => {
        console.log(user.name);
    });

---

# map() — коли використовувати

Використовуй `map()`, коли:

    кожен елемент потрібно
    перетворити на нове значення

Наприклад:

    const names = users.map(user => user.name);

    const prices = products.map(product => product.price);

    const doubled = numbers.map(number => number * 2);

Основне питання:

    "Яке нове значення має відповідати кожному елементу?"

---

# filter() — коли використовувати

Використовуй `filter()`, коли:

    потрібно залишити тільки
    елементи, які відповідають умові

Наприклад:

    const adults = users.filter(user => user.age >= 18);

    const active = users.filter(user => user.active);

    const positive = numbers.filter(number => number > 0);

Основне питання:

    "Які елементи потрібно залишити?"

---

# Decision Tree

Якщо потрібно:

    виконати дію для кожного
        ↓
    forEach()

Якщо потрібно:

    отримати новий масив,
    перетворивши кожен елемент
        ↓
    map()

Якщо потрібно:

    отримати новий масив
    тільки з деяких елементів
        ↓
    filter()

---

# forEach / map / filter

Можна запам'ятати так:

    forEach()
        → DO

    map()
        → TRANSFORM

    filter()
        → SELECT

Або:

    forEach → зробити
    map     → перетворити
    filter  → відібрати

---

# Порівняння з класичним for

### forEach()

    numbers.forEach(number => {
        console.log(number);
    });

### for

    for (const number of numbers) {
        console.log(number);
    }

Для простого перебору обидва варіанти можуть бути правильними.

---

# map() замість ручного push()

Імперативний підхід:

    const doubled = [];

    for (const number of numbers) {
        doubled.push(number * 2);
    }

Функціональніший підхід:

    const doubled = numbers.map(number => number * 2);

Другий варіант безпосередньо виражає:

    "перетвори кожен елемент"

---

# filter() замість ручного push()

Імперативний підхід:

    const adults = [];

    for (const user of users) {
        if (user.age >= 18) {
            adults.push(user);
        }
    }

Через `filter()`:

    const adults = users.filter(user => user.age >= 18);

Другий варіант безпосередньо виражає:

    "залиш тільки дорослих"

---

# Declarative vs Imperative

Класичний цикл часто є більш imperative:

    const result = [];

    for (const number of numbers) {
        if (number > 10) {
            result.push(number * 2);
        }
    }

Через array methods:

    const result = numbers
        .filter(number => number > 10)
        .map(number => number * 2);

Функціональний варіант описує:

    що потрібно зробити

а не покроково:

    як це зробити.

Це одна з причин популярності array methods.

---

# Практичний приклад — обробка даних

Нехай backend повернув:

    const users = [
        {
            id: 1,
            name: "John",
            age: 25,
            active: true
        },
        {
            id: 2,
            name: "Anna",
            age: 17,
            active: false
        },
        {
            id: 3,
            name: "Tom",
            age: 30,
            active: true
        }
    ];

Потрібні імена активних дорослих користувачів.

    const names = users
        .filter(user => user.age >= 18)
        .filter(user => user.active)
        .map(user => user.name);

Результат:

    [
        "John",
        "Tom"
    ]

---

# Практичний приклад — pipeline

Можна мислити як pipeline:

    data
      ↓
    filter
      ↓
    filter
      ↓
    map
      ↓
    result

Наприклад:

    users
      ↓
    тільки adults
      ↓
    тільки active
      ↓
    тільки names
      ↓
    names

Це дуже важлива модель мислення для роботи з даними.

---

# Performance

У більшості звичайних frontend/backend задач:

    forEach()
    map()
    filter()

є достатньо швидкими.

Не потрібно автоматично уникати array methods через міркування про performance.

Але важливо розуміти, що chaining створює проміжні масиви.

Наприклад:

    const result = numbers
        .filter(number => number > 10)
        .map(number => number * 2);

Тут створюється результат `filter()`, який потім передається в `map()`.

Для більшості задач це нормально.

Оптимізація має сенс тоді, коли profiling показує реальну проблему.

---

# Empty Array

Методи працюють і з порожнім масивом.

    const numbers = [];

    numbers.forEach(number => {
        console.log(number);
    });

Нічого не відбудеться.

`map()`:

    const result = numbers.map(number => number * 2);

Результат:

    []

`filter()`:

    const result = numbers.filter(number => number > 0);

Результат:

    []

---

# Sparse Arrays

Array methods мають особливості при роботі з sparse arrays.

Наприклад:

    const numbers = [];

    numbers[2] = 10;

    console.log(numbers);

Маємо array з пропущеними позиціями.

`map()`, `filter()` та `forEach()` не викликають callback для відсутніх елементів.

Для базового рівня достатньо пам'ятати:

    existing element
        → callback

    empty slot
        → callback не викликається

---

# Метод як callback

Callback можна винести в окрему функцію.

Наприклад:

    const numbers = [1, 2, 3, 4];

    function double(number) {
        return number * 2;
    }

    const result = numbers.map(double);

Результат:

    [2, 4, 6, 8]

---

# Reusable Predicate

Для `filter()` можна створювати reusable predicates.

    function isAdult(user) {
        return user.age >= 18;
    }

    const adults = users.filter(isAdult);

Це корисно, коли одна й та сама умова використовується в різних місцях.

---

# Function Composition

Методи можна комбінувати з окремими функціями.

    const double = number => number * 2;

    const isEven = number => number % 2 === 0;

    const numbers = [1, 2, 3, 4];

    const result = numbers
        .filter(isEven)
        .map(double);

Результат:

    [4, 8]

---

# Practical Exercises

## Exercise 1

Є:

    const numbers = [1, 2, 3, 4, 5];

Потрібно вивести кожне число.

Рішення:

    numbers.forEach(number => {
        console.log(number);
    });

---

## Exercise 2

Помножити кожне число на 10.

    const numbers = [1, 2, 3, 4, 5];

Рішення:

    const result = numbers.map(number => number * 10);

Результат:

    [10, 20, 30, 40, 50]

---

## Exercise 3

Отримати тільки парні числа.

    const numbers = [1, 2, 3, 4, 5, 6];

Рішення:

    const result = numbers.filter(number => {
        return number % 2 === 0;
    });

Результат:

    [2, 4, 6]

---

## Exercise 4

Є:

    const names = [
        "john",
        "anna",
        "tom"
    ];

Зробити всі імена uppercase.

Рішення:

    const result = names.map(name => name.toUpperCase());

---

## Exercise 5

Залишити слова довші за 4 символи.

    const words = [
        "cat",
        "house",
        "dog",
        "computer"
    ];

Рішення:

    const result = words.filter(word => word.length > 4);

Результат:

    [
        "house",
        "computer"
    ]

---

## Exercise 6

Є:

    const users = [
        {
            name: "John",
            age: 25
        },
        {
            name: "Anna",
            age: 16
        },
        {
            name: "Tom",
            age: 30
        }
    ];

Отримати імена дорослих.

Рішення:

    const result = users
        .filter(user => user.age >= 18)
        .map(user => user.name);

Результат:

    [
        "John",
        "Tom"
    ]

---

# Типові задачі

### Перетворення

    map()

Приклади:

    numbers → doubled numbers
    users → names
    products → prices
    strings → uppercase strings

---

### Фільтрація

    filter()

Приклади:

    users → adults
    users → active users
    numbers → positive numbers
    products → expensive products

---

### Side effect

    forEach()

Приклади:

    log values
    update DOM
    register events
    send data
    perform an external action

---

# Питання зі співбесіди

Що таке array method?

Що таке callback?

Які параметри отримує callback array method?

Що таке `forEach()`?

Що повертає `forEach()`?

Чи створює `forEach()` новий масив?

Що таке `map()`?

Що повертає `map()`?

Чи змінює `map()` original array?

Чому `map()` зазвичай має таку саму довжину результату?

Що таке `filter()`?

Що повертає `filter()`?

Чи може `filter()` повернути порожній масив?

Чим `map()` відрізняється від `filter()`?

Чим `forEach()` відрізняється від `map()`?

Коли використовувати `forEach()`?

Коли використовувати `map()`?

Коли використовувати `filter()`?

Що таке predicate function?

Що таке side effect?

Чому `forEach()` часто використовується для side effects?

Чому `map()` не слід використовувати просто для виконання side effect?

Що станеться, якщо не зробити `return` у callback `map()`?

Що станеться, якщо callback `filter()` повертає truthy?

Що станеться, якщо callback `filter()` повертає falsy?

Як отримати тільки імена користувачів через `map()`?

Як отримати тільки активних користувачів через `filter()`?

Як поєднати `filter()` та `map()`?

Що таке method chaining?

Чи гарантують `map()` та `filter()` повну immutability?

Що станеться, якщо callback мутує object всередині масиву?

Чому `map()` важливий у React?

Чому `forEach()` не використовують для rendering списку в React?

---

# Шлях

## 🟢 Core

Обов'язково знати:

    array methods
    callback
    element
    index

`forEach()`:

    виконати дію
    undefined return

`map()`:

    transform
    new array
    same length

`filter()`:

    select
    new array
    same or smaller length

Також:

    callback return
    arrow functions
    truthy / falsy
    original array
    new array
    basic immutability

---

## 🔵 Junior

Потрібно добре розуміти:

    forEach()
    map()
    filter()

Callback parameters:

    element
    index
    array

Практичні патерни:

    array of primitives
    array of objects
    map + object
    filter + condition
    filter + map
    method chaining

Розуміти:

    side effects
    transformation
    selection
    predicate

Вміти замінити:

    manual for + push

на:

    map()
    filter()

Розуміти використання `map()` у React.

---

## 🟠 Middle

Глибше розуміти:

    functional programming
    pure functions
    side effects
    immutability
    referential transparency
    function composition
    method chaining

Розуміти:

    intermediate arrays
    memory implications
    callback overhead
    algorithmic complexity

Уміти рефакторити:

    imperative loops

у:

    declarative array operations

Вміти будувати pipeline:

    filter()
    map()
    filter()
    map()

та оцінювати його читабельність і performance.

---

## 🔴 Senior

Глибоко розуміти:

    ECMAScript specification
    Array.prototype methods
    callback invocation
    sparse arrays
    array-like objects
    generic array methods
    mutation semantics
    iterator behavior
    engine optimization
    JIT considerations
    memory allocation
    intermediate arrays
    lazy evaluation

Порівнювати:

    imperative loops
    array methods
    iterators
    generators
    lazy pipelines

Розуміти trade-offs між:

    readability
    maintainability
    performance
    memory usage

---

# Міні-шпаргалка

## forEach()

    array.forEach((element, index, array) => {
        // action
    });

Призначення:

    виконати дію для кожного елемента

Повертає:

    undefined

---

## map()

    const result = array.map((element, index, array) => {
        return newValue;
    });

Призначення:

    transform

Повертає:

    new array

Довжина:

    така сама

---

## filter()

    const result = array.filter((element, index, array) => {
        return condition;
    });

Призначення:

    select

Повертає:

    new array

Довжина:

    така сама або менша

---

## Callback parameters

    (element, index, array)

Наприклад:

    numbers.map((number, index, array) => {
        ...
    });

---

## forEach

    forEach()
        ↓
    DO
        ↓
    side effect

---

## map

    map()
        ↓
    TRANSFORM
        ↓
    new array

---

## filter

    filter()
        ↓
    SELECT
        ↓
    new array

---

## map

    [1, 2, 3]
        ↓
    map(x => x * 2)
        ↓
    [2, 4, 6]

---

## filter

    [1, 2, 3, 4]
        ↓
    filter(x => x % 2 === 0)
        ↓
    [2, 4]

---

## filter + map

    users
        ↓
    filter(active)
        ↓
    active users
        ↓
    map(name)
        ↓
    names

---

# Основні правила

    forEach()
        → execute action
        → undefined

    map()
        → transform elements
        → new array
        → same length

    filter()
        → select elements
        → new array
        → same or smaller length

---

# Головне:

• `forEach()` виконує callback для кожного елемента.

• `forEach()` повертає `undefined`.

• `map()` перетворює кожен елемент і створює новий масив.

• `map()` зазвичай зберігає кількість елементів.

• `filter()` залишає тільки елементи, які відповідають умові.

• `filter()` може повернути масив меншої довжини або `[]`.

• Callback array methods отримує:

    element
    index
    array

• `map()` повинен повертати значення для кожного елемента.

• Якщо callback `map()` нічого не повертає, результатом будуть `undefined`.

• `filter()` використовує truthy / falsy результат callback.

• `forEach()` добре підходить для side effects.

• `map()` добре підходить для transformation.

• `filter()` добре підходить для selection.

• Не потрібно використовувати `map()`, якщо новий масив не потрібен.

• Не потрібно використовувати `filter()` для transformation.

• Не потрібно використовувати `forEach()` для побудови нового масиву, якщо це можна природно виразити через `map()` або `filter()`.

• `map()` і `filter()` не мутують сам масив, але callback може мутувати об'єкти всередині нього.

• Найважливіша модель:

    forEach → DO
    map     → TRANSFORM
    filter  → SELECT

• Для роботи з даними дуже важливо вміти мислити pipeline:

    data
      ↓
    filter()
      ↓
    map()
      ↓
    result

• У React `map()` є одним із основних способів перетворення масиву даних у список JSX-елементів.

• Якщо потрібно:

    виконати дію
        → forEach()

    перетворити кожен елемент
        → map()

    відібрати частину елементів
        → filter()

• Основна різниця:

    forEach() → нічого не збирає
    map()     → створює новий масив
    filter()  → створює відфільтрований масив