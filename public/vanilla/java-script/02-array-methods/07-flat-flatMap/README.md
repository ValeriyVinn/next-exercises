# 07. `flat()` та `flatMap()`

## Коротко

`flat()` та `flatMap()` використовуються для роботи з **вкладеними масивами**.

- `flat()` — "розгортає" вкладені масиви на потрібну глибину.
- `flatMap()` — спочатку застосовує функцію до кожного елемента, а потім розгортає результат на **один рівень**.
- Обидва методи **не змінюють оригінальний масив**.
- Обидва повертають **новий масив**.

Ці методи особливо корисні, коли дані мають структуру:

    [
        [1, 2],
        [3, 4],
        [5, 6]
    ]

або коли після `map()` утворюється вкладений масив:

    const users = [
        { name: "Anna", skills: ["JS", "React"] },
        { name: "John", skills: ["Node", "PostgreSQL"] }
    ];

---

# Ключові поняття

| Метод | Що робить |
|---|---|
| `flat()` | розгортає вкладені масиви |
| `flat(depth)` | розгортає на вказану кількість рівнів |
| `flat(Infinity)` | розгортає всі рівні |
| `flatMap()` | `map()` + `flat(1)` |
| `map()` | перетворює кожен елемент |
| `flat()` | прибирає вкладеність |

Головна ідея:

    map()       → змінити елементи
    flat()      → прибрати вкладеність
    flatMap()   → змінити елементи + прибрати один рівень вкладеності

---

# 1. `flat()`

## Визначення

`flat()` створює новий масив, у якому вкладені масиви розгорнуті на вказану глибину.

Синтаксис:

    array.flat(depth);

За замовчуванням:

    array.flat();

`depth` за замовчуванням дорівнює `1`.

---

# 2. Простий приклад `flat()`

    const numbers = [1, [2, 3], [4, 5]];

    const result = numbers.flat();

    console.log(result);
    // [1, 2, 3, 4, 5]

Оригінальний масив не змінюється:

    console.log(numbers);
    // [1, [2, 3], [4, 5]]

Отже:

    flat() → повертає новий масив

---

# 3. `flat()` розгортає один рівень

Наприклад:

    const numbers = [
        [1, 2],
        [3, 4],
        [5, 6]
    ];

    const result = numbers.flat();

    console.log(result);
    // [1, 2, 3, 4, 5, 6]

Тут достатньо стандартного:

    flat()

тому що вкладеність лише одного рівня.

---

# 4. Глибина `flat()`

`flat()` приймає аргумент `depth`.

    array.flat(depth);

Наприклад:

    const numbers = [
        [1, [2, 3]],
        [4, [5, 6]]
    ];

    console.log(numbers.flat());

Результат:

    [1, [2, 3], 4, [5, 6]]

Чому?

Тому що `flat()` за замовчуванням розгортає тільки **один рівень**.

---

# 5. `flat(2)`

Якщо потрібно розгорнути два рівні:

    const numbers = [
        [1, [2, 3]],
        [4, [5, 6]]
    ];

    const result = numbers.flat(2);

    console.log(result);
    // [1, 2, 3, 4, 5, 6]

---

# 6. Глибока вкладеність

Наприклад:

    const numbers = [
        [1, [2, [3, 4]]]
    ];

    console.log(numbers.flat());

Результат:

    [1, [2, [3, 4]]]

---

    console.log(numbers.flat(2));

Результат:

    [1, 2, [3, 4]]

---

    console.log(numbers.flat(3));

Результат:

    [1, 2, 3, 4]

---

# 7. `flat(Infinity)`

Якщо структура може мати невідому глибину:

    const numbers = [
        [1, [2, [3, [4, 5]]]]
    ];

    const result = numbers.flat(Infinity);

    console.log(result);
    // [1, 2, 3, 4, 5]

`Infinity` означає:

> розгорнути всі рівні вкладеності.

Використовувати це потрібно тоді, коли справді потрібно повністю прибрати вкладеність.

---

# 8. `flat()` не змінює оригінальний масив

Це важлива властивість.

    const numbers = [1, [2, 3], [4, 5]];

    const result = numbers.flat();

    console.log(numbers);
    // [1, [2, 3], [4, 5]]

    console.log(result);
    // [1, 2, 3, 4, 5]

Перевірка посилання:

    console.log(result === numbers);
    // false

Отже:

    flat() → новий масив

---

# 9. `flat()` та `slice()` / spread

До появи `flat()` вкладені масиви часто обробляли вручну.

Наприклад:

    const numbers = [
        [1, 2],
        [3, 4],
        [5, 6]
    ];

Можна було використовувати `reduce()`:

    const result = numbers.reduce((acc, current) => {
        return acc.concat(current);
    }, []);

Тепер простіше:

    const result = numbers.flat();

Для стандартної задачі розгортання одного рівня `flat()` значно читабельніший.

---

# 10. `flat()` та порожні елементи

`flat()` також прибирає порожні слоти масиву на рівні, який розгортається.

Наприклад:

    const numbers = [1, , 3];

    const result = numbers.flat();

    console.log(result);
    // [1, 3]

Для повсякденної роботи це не головний випадок, але важливо знати, що `flat()` не просто механічно копіює структуру.

---

# 11. `flat()` з різними типами даних

`flat()` працює не тільки з числами.

    const data = [
        ["John", 25],
        ["Anna", 30],
        ["Mark", 28]
    ];

    const result = data.flat();

    console.log(result);
    // ["John", 25, "Anna", 30, "Mark", 28]

---

# 12. `flat()` не "розгортає" об'єкти

Наприклад:

    const data = [
        [{ name: "Anna" }],
        [{ name: "John" }]
    ];

    const result = data.flat();

    console.log(result);

Результат:

    [
        { name: "Anna" },
        { name: "John" }
    ]

Об'єкти залишаються об'єктами.

`flat()` працює саме з **масивами**, а не з довільними вкладеними структурами.

---

# 13. `flatMap()`

## Визначення

`flatMap()` поєднує:

    map() + flat(1)

Тобто:

1. проходить по кожному елементу;
2. виконує callback;
3. отримує результати;
4. розгортає результат на один рівень.

Синтаксис:

    array.flatMap(callback);

---

# 14. Простий приклад `flatMap()`

    const numbers = [1, 2, 3];

    const result = numbers.flatMap(number => [number, number * 2]);

    console.log(result);
    // [1, 2, 2, 4, 3, 6]

Подивимося, що відбувається.

`map()` дав би:

    [
        [1, 2],
        [2, 4],
        [3, 6]
    ]

Після `flat(1)`:

    [1, 2, 2, 4, 3, 6]

Саме це і робить `flatMap()`.

---

# 15. `map()` + `flat()`

Цей код:

    const numbers = [1, 2, 3];

    const result = numbers.flatMap(number => [
        number,
        number * 2
    ]);

приблизно відповідає:

    const result = numbers
        .map(number => [
            number,
            number * 2
        ])
        .flat();

Тобто:

    flatMap()
        ↓
    map()
        ↓
    flat(1)

---

# 16. Головна різниця між `map()` та `flatMap()`

`map()`:

    const numbers = [1, 2, 3];

    const result = numbers.map(number => [
        number,
        number * 2
    ]);

Результат:

    [
        [1, 2],
        [2, 4],
        [3, 6]
    ]

`flatMap()`:

    const result = numbers.flatMap(number => [
        number,
        number * 2
    ]);

Результат:

    [1, 2, 2, 4, 3, 6]

Отже:

    map()     → створює вкладений результат
    flatMap() → створює плоский результат на один рівень

---

# 17. `flatMap()` працює тільки на один рівень

Це дуже важливо.

`flatMap()` еквівалентний:

    map() + flat(1)

Він **не має параметра depth**.

Не можна:

    array.flatMap(callback, 2);

Очікувати, що другий аргумент задасть глибину.

Якщо потрібна глибина більше одного:

    array.map(callback).flat(2);

або інша відповідна логіка.

---

# 18. `flatMap()` та фільтрація

Одна з дуже корисних властивостей `flatMap()` — можна фактично одночасно:

- перетворити елемент;
- видалити його;
- створити декілька елементів.

Наприклад:

    const numbers = [1, 2, 3, 4, 5];

    const result = numbers.flatMap(number => {
        if (number % 2 === 0) {
            return [number];
        }

        return [];
    });

    console.log(result);
    // [2, 4]

Чому?

Для непарних чисел:

    []

Для парних:

    [number]

Після flatten:

    [2, 4]

---

# 19. `flatMap()` як `map()` + `filter()`

Наприклад:

    const numbers = [1, 2, 3, 4, 5];

    const result = numbers.flatMap(number => {
        return number % 2 === 0
            ? [number * 10]
            : [];
    });

Результат:

    [20, 40]

Тут:

    непарне число → []
    парне число   → [number * 10]

`flatMap()` прибирає один рівень вкладеності.

Це одна з найпрактичніших схем використання `flatMap()`.

---

# 20. `flatMap()` може створювати кілька елементів

Наприклад, розділимо речення на слова:

    const sentences = [
        "Hello world",
        "JavaScript is great"
    ];

    const words = sentences.flatMap(sentence => sentence.split(" "));

    console.log(words);
    // ["Hello", "world", "JavaScript", "is", "great"]

Без `flatMap()`:

    const words = sentences.map(sentence => sentence.split(" "));

Результат:

    [
        ["Hello", "world"],
        ["JavaScript", "is", "great"]
    ]

`flatMap()` одразу дає:

    [
        "Hello",
        "world",
        "JavaScript",
        "is",
        "great"
    ]

---

# 21. Практичний приклад: товари

Є категорії:

    const categories = [
        {
            name: "Phones",
            products: ["iPhone", "Samsung"]
        },
        {
            name: "Laptops",
            products: ["MacBook", "ThinkPad"]
        }
    ];

Потрібно отримати один масив усіх товарів.

Можна:

    const products = categories.flatMap(category => category.products);

Результат:

    ["iPhone", "Samsung", "MacBook", "ThinkPad"]

Це дуже типовий випадок для `flatMap()`.

---

# 22. `map()` у такому випадку

Якщо використати `map()`:

    const products = categories.map(category => category.products);

Результат:

    [
        ["iPhone", "Samsung"],
        ["MacBook", "ThinkPad"]
    ]

Тобто ми отримали масив масивів.

Якщо потрібно плоский масив:

    const products = categories
        .map(category => category.products)
        .flat();

Або коротше:

    const products = categories.flatMap(category => category.products);

---

# 23. Практичний приклад: користувачі та навички

    const users = [
        {
            name: "Anna",
            skills: ["JavaScript", "React"]
        },
        {
            name: "John",
            skills: ["Node.js", "PostgreSQL"]
        }
    ];

Отримати всі навички:

    const skills = users.flatMap(user => user.skills);

Результат:

    [
        "JavaScript",
        "React",
        "Node.js",
        "PostgreSQL"
    ]

---

# 24. Практичний приклад: користувач + додаткове значення

    const users = [
        { name: "Anna", age: 25 },
        { name: "John", age: 30 }
    ];

Можемо створити декілька значень для кожного користувача:

    const result = users.flatMap(user => [
        user.name,
        user.age
    ]);

Результат:

    ["Anna", 25, "John", 30]

---

# 25. Практичний приклад: створення пар

    const numbers = [1, 2, 3];

    const pairs = numbers.flatMap(number => [
        [number, number * 2]
    ]);

Результат:

    [
        [1, 2],
        [2, 4],
        [3, 6]
    ]

Тут важливо уважно бачити рівні вкладеності.

`flatMap()` прибрав тільки один рівень.

---

# 26. `flat()` та `flatMap()` не змінюють оригінальний масив

`flat()`:

    const numbers = [1, [2, 3]];

    const result = numbers.flat();

    console.log(numbers);
    // [1, [2, 3]]

`flatMap()`:

    const numbers = [1, 2, 3];

    const result = numbers.flatMap(number => [number, number * 2]);

    console.log(numbers);
    // [1, 2, 3]

Обидва методи створюють новий масив.

---

# 27. Порівняння `map()`, `flat()` та `flatMap()`

| Метод | Основна задача | Результат |
|---|---|---|
| `map()` | перетворити елементи | може створити вкладеність |
| `flat()` | прибрати вкладеність | новий плоскіший масив |
| `flatMap()` | перетворити + прибрати 1 рівень | новий плоскіший масив |

Приклад:

    const numbers = [1, 2, 3];

`map()`:

    numbers.map(n => [n, n * 2]);

Результат:

    [[1, 2], [2, 4], [3, 6]]

`flat()`:

    [[1, 2], [3, 4]].flat();

Результат:

    [1, 2, 3, 4]

`flatMap()`:

    numbers.flatMap(n => [n, n * 2]);

Результат:

    [1, 2, 2, 4, 3, 6]

---

# 28. Коли використовувати `flat()`

Використовуй `flat()`, коли:

- вже маєш вкладений масив;
- потрібно прибрати один або декілька рівнів;
- немає необхідності додатково перетворювати елементи.

Наприклад:

    const matrix = [
        [1, 2],
        [3, 4],
        [5, 6]
    ];

    const numbers = matrix.flat();

---

# 29. Коли використовувати `flatMap()`

Використовуй `flatMap()`, коли:

- потрібно пройти по кожному елементу;
- callback повертає масив;
- потрібно одразу прибрати один рівень вкладеності.

Наприклад:

    const users = [
        {
            name: "Anna",
            skills: ["JS", "React"]
        },
        {
            name: "John",
            skills: ["Node", "SQL"]
        }
    ];

    const skills = users.flatMap(user => user.skills);

---

# 30. `flatMap()` vs `map().flat()`

Ці варіанти часто дають однаковий результат.

    const result = numbers
        .map(number => [number, number * 2])
        .flat();

і:

    const result = numbers.flatMap(number => [
        number,
        number * 2
    ]);

Для одного рівня `flat()` `flatMap()` є більш прямим і читабельним варіантом.

---

# 31. Важливе обмеження `flatMap()`

`flatMap()` не є універсальною заміною:

    map().flat()

Він робить саме:

    map() + flat(1)

Наприклад:

    const numbers = [
        [1, [2, 3]],
        [4, [5, 6]]
    ];

Якщо потрібно глибше розгорнути структуру, використовуй `flat()` з потрібним `depth`.

---

# 32. `flatMap()` може повертати не масив

Якщо callback повертає звичайне значення:

    const numbers = [1, 2, 3];

    const result = numbers.flatMap(number => number * 2);

Результат:

    [2, 4, 6]

Це працює так само, як `map()`, тому що значення не є масивом і розгортати нічого.

---

# 33. `flatMap()` може видаляти елементи

Повернення `[]` означає:

> не додавати нічого до результату.

Наприклад:

    const numbers = [1, 2, 3, 4, 5];

    const result = numbers.flatMap(number => {
        if (number > 3) {
            return [number];
        }

        return [];
    });

Результат:

    [4, 5]

Це корисний патерн:

    умова true  → [value]
    умова false → []

---

# 34. `flatMap()` може дублювати елементи

Наприклад:

    const numbers = [1, 2, 3];

    const result = numbers.flatMap(number => [
        number,
        number
    ]);

Результат:

    [1, 1, 2, 2, 3, 3]

Тобто callback може повернути:

    []
    [value]
    [value1, value2]
    [value1, value2, value3]

і `flatMap()` об'єднає ці результати в один масив.

---

# 35. Практична задача: отримати всі ID

    const groups = [
        {
            name: "Admins",
            users: [
                { id: 1, name: "Anna" },
                { id: 2, name: "John" }
            ]
        },
        {
            name: "Users",
            users: [
                { id: 3, name: "Mark" },
                { id: 4, name: "Kate" }
            ]
        }
    ];

Отримати користувачів:

    const users = groups.flatMap(group => group.users);

Результат:

    [
        { id: 1, name: "Anna" },
        { id: 2, name: "John" },
        { id: 3, name: "Mark" },
        { id: 4, name: "Kate" }
    ]

Потім можна використати `map()`:

    const ids = groups
        .flatMap(group => group.users)
        .map(user => user.id);

Результат:

    [1, 2, 3, 4]

Це вже приклад **method chaining**.

---

# 36. `flatMap()` + `filter()`

Методи можна комбінувати.

    const users = [
        {
            name: "Anna",
            skills: ["JS", "React"]
        },
        {
            name: "John",
            skills: ["Node", "SQL"]
        }
    ];

    const skills = users
        .flatMap(user => user.skills)
        .filter(skill => skill !== "SQL");

Результат:

    ["JS", "React", "Node"]

Порядок:

    users
      ↓
    flatMap()
      ↓
    filter()
      ↓
    result

---

# 37. `flatMap()` + `map()`

    const users = [
        {
            name: "Anna",
            skills: ["JS", "React"]
        },
        {
            name: "John",
            skills: ["Node", "SQL"]
        }
    ];

    const skills = users
        .flatMap(user => user.skills)
        .map(skill => skill.toUpperCase());

Результат:

    ["JS", "REACT", "NODE", "SQL"]

---

# 38. `flatMap()` + `filter()` + `map()`

Практичний приклад:

    const users = [
        {
            name: "Anna",
            skills: ["JavaScript", "React"]
        },
        {
            name: "John",
            skills: ["Node.js", "PostgreSQL"]
        }
    ];

    const result = users
        .flatMap(user => user.skills)
        .filter(skill => skill.length > 5)
        .map(skill => skill.toUpperCase());

Результат:

    ["JAVASCRIPT", "POSTGRESQL"]

Це типовий стиль роботи з масивами в сучасному JavaScript.

---

# 39. `flat()` та об'єкти

`flat()` робить shallow flatten.

Наприклад:

    const users = [
        [{ name: "Anna" }],
        [{ name: "John" }]
    ];

    const result = users.flat();

Маємо:

    [
        { name: "Anna" },
        { name: "John" }
    ]

Але самі об'єкти не копіюються глибоко.

Це важливо розуміти:

    flat() ≠ deep clone

---

# 40. Shallow copy

Наприклад:

    const users = [
        [{ name: "Anna" }],
        [{ name: "John" }]
    ];

    const result = users.flat();

`result` — новий масив.

Але об'єкти всередині можуть залишатися тими самими посиланнями.

Тому:

    flat() → новий масив
    flat() → не deep clone всіх вкладених об'єктів

---

# 41. Порівняння основних методів

| Метод | Mutates original? | Повертає |
|---|---:|---|
| `map()` | ❌ | новий масив |
| `filter()` | ❌ | новий масив |
| `flat()` | ❌ | новий масив |
| `flatMap()` | ❌ | новий масив |
| `sort()` | ✅ | той самий масив |
| `reverse()` | ✅ | той самий масив |

Це важливо для подальшої роботи з React та immutable state.

---

# 42. Типові помилки

## Помилка 1. Очікувати, що `flat()` змінить масив

Неправильно:

    const numbers = [1, [2, 3]];

    numbers.flat();

    console.log(numbers);
    // все ще [1, [2, 3]]

Правильно:

    const result = numbers.flat();

---

## Помилка 2. Очікувати глибоке розгортання

    const numbers = [
        [1, [2, 3]]
    ];

    numbers.flat();

Результат:

    [1, [2, 3]]

Потрібно:

    numbers.flat(2);

---

## Помилка 3. Плутати `map()` і `flatMap()`

    const numbers = [1, 2, 3];

    numbers.map(number => [number, number * 2]);

Результат:

    [[1, 2], [2, 4], [3, 6]]

Якщо потрібен плоский результат:

    numbers.flatMap(number => [number, number * 2]);

---

## Помилка 4. Очікувати, що `flatMap()` розгорне багато рівнів

`flatMap()` робить лише:

    flat(1)

Якщо потрібно:

    flat(2)

або:

    flat(Infinity)

використовуй `flat()` окремо.

---

## Помилка 5. Використовувати `flatMap()` там, де достатньо `map()`

Якщо callback повертає звичайне значення:

    numbers.flatMap(number => number * 2);

це працюватиме, але:

    numbers.map(number => number * 2);

буде простішим і зрозумілішим.

`flatMap()` особливо корисний, коли callback повертає **масиви**.

---

# 43. `flatMap()` як "один → багато"

Дуже корисно запам'ятати концепцію:

    map()
        один → один

    flatMap()
        один → багато

Наприклад:

    const users = [
        {
            name: "Anna",
            skills: ["JS", "React"]
        },
        {
            name: "John",
            skills: ["Node", "SQL"]
        }
    ];

Один користувач:

    Anna

може мати багато skills:

    ["JS", "React"]

`flatMap()` дозволяє перетворити:

    users → skills

в один плоский масив.

---

# 44. `flatMap()` як "один → нуль, один або багато"

Ще точніше:

    flatMap()

може перетворити один елемент на:

    []
    
або:

    [value]

або:

    [value1, value2]

або:

    [value1, value2, value3]

Тому `flatMap()` дуже зручний для трансформацій типу:

    один → нуль або багато

---

# 45. Практична задача: категорії товарів

Є:

    const categories = [
        {
            name: "Phones",
            products: ["iPhone", "Samsung"]
        },
        {
            name: "Laptops",
            products: ["MacBook"]
        }
    ];

Завдання:

Отримати:

    ["iPhone", "Samsung", "MacBook"]

Рішення:

    const products = categories.flatMap(category => category.products);

---

# 46. Практична задача: залишити тільки активних користувачів

    const users = [
        { name: "Anna", active: true },
        { name: "John", active: false },
        { name: "Mark", active: true }
    ];

Можна використати звичайний `filter()`:

    const activeUsers = users.filter(user => user.active);

`flatMap()` тут не потрібен.

Але якщо кожен активний користувач може породжувати декілька значень:

    const result = users.flatMap(user => {
        if (!user.active) {
            return [];
        }

        return [user.name, user.name.toUpperCase()];
    });

Результат:

    [
        "Anna",
        "ANNA",
        "Mark",
        "MARK"
    ]

Тут `flatMap()` уже має сенс.

---

# 47. Практична задача: розділити слова

    const texts = [
        "JavaScript React",
        "Node PostgreSQL"
    ];

    const words = texts.flatMap(text => text.split(" "));

    console.log(words);

Результат:

    [
        "JavaScript",
        "React",
        "Node",
        "PostgreSQL"
    ]

Це дуже хороший приклад для запам'ятовування `flatMap()`.

---

# 48. Практична задача: отримати всі коментарі

    const posts = [
        {
            title: "Post 1",
            comments: ["Good", "Nice"]
        },
        {
            title: "Post 2",
            comments: ["Great", "Interesting"]
        }
    ];

    const comments = posts.flatMap(post => post.comments);

Результат:

    [
        "Good",
        "Nice",
        "Great",
        "Interesting"
    ]

---

# 49. `flat()` у frontend

Типова ситуація:

API може повернути:

    const response = [
        {
            data: [1, 2]
        },
        {
            data: [3, 4]
        }
    ];

Отримати всі значення:

    const values = response.flatMap(item => item.data);

Результат:

    [1, 2, 3, 4]

Це часто зустрічається під час роботи з API.

---

# 50. `flatMap()` у React

Наприклад, маємо:

    const users = [
        {
            name: "Anna",
            roles: ["admin", "editor"]
        },
        {
            name: "John",
            roles: ["user"]
        }
    ];

Отримати всі ролі:

    const roles = users.flatMap(user => user.roles);

Після цього можна:

    const uniqueRoles = [...new Set(roles)];

Отримаємо:

    ["admin", "editor", "user"]

Це вже типовий практичний frontend-кейс.

---

# 51. `flat()` та React state

Оскільки `flat()` не мутує оригінальний масив:

    const flattened = data.flat();

він добре підходить для immutable-підходу.

Наприклад:

    const flattenedUsers = groups.flatMap(group => group.users);

Ми створюємо новий масив, а не змінюємо `groups`.

---

# 52. Чи завжди `flatMap()` кращий за `map().flat()`?

Ні.

Якщо потрібна додаткова логіка між операціями:

    const result = data
        .map(...)
        .filter(...)
        .flat();

може бути читабельніше.

`flatMap()` найкраще використовувати тоді, коли логіка природно виглядає як:

    map → flat(1)

---

# 53. Складність

Для практичного розуміння достатньо пам'ятати:

- `flat()` проходить по елементах і створює новий масив.
- `flatMap()` проходить по елементах, виконує callback і розгортає один рівень.
- Обидва потребують додаткової пам'яті для нового масиву.

Не потрібно запам'ятовувати конкретну реалізацію всередині JavaScript engine.

Головне для Junior:

    flat()      → flatten
    flatMap()   → transform + flatten

---

# 54. Сучасний JavaScript

`flat()` і `flatMap()` — сучасні методи масивів JavaScript.

Вони значно спрощують код у порівнянні з ручними циклами та комбінаціями `reduce()` / `concat()`.

Замість:

    const result = [];

    for (const group of groups) {
        for (const item of group) {
            result.push(item);
        }
    }

часто можна:

    const result = groups.flat();

А замість:

    const result = [];

    for (const user of users) {
        for (const skill of user.skills) {
            result.push(skill);
        }
    }

можна:

    const result = users.flatMap(user => user.skills);

---

# 55. Важлива ментальна модель

Запам'ятай:

    flat()
        "У мене вже є вкладені масиви.
         Прибери вкладеність."

    flatMap()
        "Я хочу перетворити кожен елемент
         у масив і одразу прибрати один рівень."

---

# 56. Міні-шпаргалка

## `flat()`

    const result = array.flat();

Розгортає один рівень.

---

## `flat(depth)`

    const result = array.flat(2);

Розгортає два рівні.

---

## `flat(Infinity)`

    const result = array.flat(Infinity);

Розгортає всі рівні.

---

## `flatMap()`

    const result = array.flatMap(item => [item]);

`map()` + `flat(1)`.

---

## `map()` vs `flatMap()`

    [1, 2, 3].map(n => [n, n * 2]);

Результат:

    [[1, 2], [2, 4], [3, 6]]

---

    [1, 2, 3].flatMap(n => [n, n * 2]);

Результат:

    [1, 2, 2, 4, 3, 6]

---

## Видалення через `flatMap()`

    numbers.flatMap(n => condition ? [n] : []);

---

## Один → багато

    users.flatMap(user => user.skills);

---

# 57. Швидке порівняння

| Метод | Приклад | Результат |
|---|---|---|
| `map()` | `arr.map(x => [x])` | `[[...], [...]]` |
| `flat()` | `arr.flat()` | прибирає вкладеність |
| `flat(2)` | `arr.flat(2)` | прибирає 2 рівні |
| `flat(Infinity)` | `arr.flat(Infinity)` | прибирає всі рівні |
| `flatMap()` | `arr.flatMap(x => [x])` | `map()` + `flat(1)` |

---

# 58. Питання для співбесіди

### 1. Що робить `flat()`?

Розгортає вкладені масиви та повертає новий масив.

---

### 2. Яка глибина `flat()` за замовчуванням?

    1

---

### 3. Як розгорнути два рівні?

    array.flat(2);

---

### 4. Як повністю розгорнути вкладений масив?

    array.flat(Infinity);

---

### 5. Чи змінює `flat()` оригінальний масив?

Ні.

---

### 6. Що робить `flatMap()`?

Комбінує:

    map() + flat(1)

---

### 7. Чи можна задати depth для `flatMap()`?

Ні.

`flatMap()` завжди розгортає один рівень.

---

### 8. Чим відрізняється `map()` від `flatMap()`?

`map()` зберігає вкладеність, яку повертає callback.

`flatMap()` додатково розгортає один рівень.

---

### 9. Чи може `flatMap()` видаляти елементи?

Так.

Потрібно повернути:

    []

---

### 10. Чи може `flatMap()` створити декілька елементів?

Так.

Наприклад:

    [1, 2, 3].flatMap(n => [n, n * 2]);

---

### 11. Чи є `flat()` deep clone?

Ні.

Він створює новий масив, але не робить повну глибоку копію всіх вкладених об'єктів.

---

### 12. Коли краще використовувати `flatMap()`?

Коли кожен елемент потрібно перетворити на нуль, один або декілька елементів і отримати один плоский масив.

---

# 59. Шлях вивчення

## Core

Потрібно знати обов'язково:

- `flat()`
- `flat(2)`
- `flat(Infinity)`
- `flatMap()`
- `map()` vs `flatMap()`
- `flat()` не мутує
- `flatMap()` не мутує
- `map() + flat(1)`

---

## Junior

Потрібно вміти:

- працювати з масивами масивів;
- отримувати плоский список даних;
- діставати дані з вкладених об'єктів;
- використовувати `flatMap()` для `one → many`;
- використовувати `flatMap()` для `zero → one`;
- комбінувати `flatMap()` з `filter()`;
- комбінувати `flatMap()` з `map()`;
- працювати з даними API;
- розуміти shallow copy.

---

## Middle

Корисно розуміти:

- рівні вкладеності;
- поведінку `flat()` з holes;
- shallow vs deep structures;
- продуктивність на великих масивах;
- відмінність `flatMap()` від `reduce()`;
- вибір між `flat()`, `flatMap()` та ручною трансформацією;
- method chaining.

---

## Senior

Додатково:

- ECMAScript semantics;
- алгоритмічні витрати flattening;
- memory allocation;
- роботу з великими структурами даних;
- оптимізацію трансформацій;
- альтернативи `flatMap()` для складних data pipelines;
- flattening нормалізованих API-даних;
- server-side data transformation.

---

# 60. Практичні вправи

## Вправа 1

Розгорнути:

    const numbers = [
        [1, 2],
        [3, 4],
        [5, 6]
    ];

Очікуваний результат:

    [1, 2, 3, 4, 5, 6]

---

## Вправа 2

Розгорнути два рівні:

    const numbers = [
        [1, [2, 3]],
        [4, [5, 6]]
    ];

Очікуваний результат:

    [1, 2, 3, 4, 5, 6]

---

## Вправа 3

Отримати всі skills:

    const users = [
        {
            name: "Anna",
            skills: ["JS", "React"]
        },
        {
            name: "John",
            skills: ["Node", "SQL"]
        }
    ];

Очікуваний результат:

    ["JS", "React", "Node", "SQL"]

---

## Вправа 4

Для кожного числа створити число та його квадрат:

    const numbers = [1, 2, 3, 4];

Очікуваний результат:

    [1, 1, 2, 4, 3, 9, 4, 16]

---

## Вправа 5

Залишити тільки парні числа:

    const numbers = [1, 2, 3, 4, 5, 6];

Очікуваний результат:

    [2, 4, 6]

Використати `flatMap()`.

---

## Вправа 6

Є:

    const texts = [
        "JavaScript React",
        "Node PostgreSQL"
    ];

Отримати:

    ["JavaScript", "React", "Node", "PostgreSQL"]

---

## Вправа 7

Є:

    const categories = [
        {
            name: "Phones",
            products: ["iPhone", "Samsung"]
        },
        {
            name: "Laptops",
            products: ["MacBook", "ThinkPad"]
        }
    ];

Отримати один масив усіх продуктів.

---

# 61. Головне

- `flat()` **розгортає вкладені масиви**.
- `flat()` за замовчуванням розгортає **1 рівень**.
- `flat(depth)` дозволяє вказати глибину.
- `flat(Infinity)` розгортає всі рівні.
- `flat()` **не мутує** оригінальний масив.
- `flatMap()` = `map()` + `flat(1)`.
- `flatMap()` також **не мутує** оригінальний масив.
- `map()` — один елемент → одне значення.
- `flatMap()` — один елемент → **нуль, одне або багато значень**.
- `flatMap()` особливо корисний для роботи з вкладеними даними API.
- Повернення `[]` з `flatMap()` дозволяє прибрати елемент.
- `flat()` не є deep clone.
- `flatMap()` не має параметра `depth`.
- Якщо потрібно просто прибрати вкладеність → `flat()`.
- Якщо потрібно **перетворити + розгорнути один рівень** → `flatMap()`.

> **Ментальна модель:**
>
> `map()` → **перетворити**
>
> `flat()` → **розгорнути**
>
> `flatMap()` → **перетворити + розгорнути**