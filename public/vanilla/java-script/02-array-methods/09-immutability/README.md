# 09. Immutability

## Коротко

**Immutability (незмінність)** — принцип, за якого ми **не змінюємо існуючі дані напряму**, а створюємо нову версію даних із потрібними змінами.

У JavaScript масиви та об'єкти є mutable за замовчуванням.

Наприклад:

    const numbers = [1, 2, 3];

    numbers.push(4);

Тут ми змінили існуючий масив:

    [1, 2, 3]
          ↓
    [1, 2, 3, 4]

При immutable-підході:

    const numbers = [1, 2, 3];

    const newNumbers = [...numbers, 4];

Тепер:

    numbers
    // [1, 2, 3]

    newNumbers
    // [1, 2, 3, 4]

Головна ідея:

    Mutable
        → змінюємо існуючий об'єкт

    Immutable
        → створюємо новий об'єкт із потрібною зміною

---

# Ключові поняття

| Поняття | Значення |
|---|---|
| Mutation | зміна існуючого об'єкта/масиву |
| Immutability | не змінювати існуючі дані |
| Shallow copy | поверхнева копія |
| Deep copy | глибока копія |
| Reference | посилання на об'єкт у пам'яті |
| Spread `...` | зручний спосіб створення shallow copy |
| `slice()` | створює новий масив |
| `map()` | створює новий масив |
| `filter()` | створює новий масив |
| `toSorted()` | немутуюче сортування |
| `toReversed()` | немутуюче reverse |
| `toSpliced()` | немутуючий splice |

---

# 1. Що таке mutation

Mutation — це зміна вже існуючого значення.

Наприклад:

    const numbers = [1, 2, 3];

    numbers.push(4);

Ми не створили новий масив.

Ми змінили існуючий:

    numbers
    // [1, 2, 3, 4]

---

# 2. Приклади mutation

## `push()`

    const numbers = [1, 2, 3];

    numbers.push(4);

    console.log(numbers);
    // [1, 2, 3, 4]

---

## `pop()`

    const numbers = [1, 2, 3];

    numbers.pop();

    console.log(numbers);
    // [1, 2]

---

## `shift()`

    const numbers = [1, 2, 3];

    numbers.shift();

    console.log(numbers);
    // [2, 3]

---

## `unshift()`

    const numbers = [1, 2, 3];

    numbers.unshift(0);

    console.log(numbers);
    // [0, 1, 2, 3]

---

## `splice()`

    const numbers = [1, 2, 3];

    numbers.splice(1, 1);

    console.log(numbers);
    // [1, 3]

---

## `sort()`

    const numbers = [3, 1, 2];

    numbers.sort((a, b) => a - b);

    console.log(numbers);
    // [1, 2, 3]

---

## `reverse()`

    const numbers = [1, 2, 3];

    numbers.reverse();

    console.log(numbers);
    // [3, 2, 1]

Усі ці операції змінюють існуючий масив.

---

# 3. Immutable операції

Багато методів масивів не мутують original.

Наприклад:

    const numbers = [1, 2, 3];

    const doubled = numbers.map(number => number * 2);

    console.log(numbers);
    // [1, 2, 3]

    console.log(doubled);
    // [2, 4, 6]

Original залишився незмінним.

---

# 4. Основні немутуючі методи масивів

До важливих immutable-операцій належать:

    map()
    filter()
    slice()
    concat()
    flat()
    flatMap()

Сучасний JavaScript також має:

    toSorted()
    toReversed()
    toSpliced()

---

# 5. Основні мутуючі методи масивів

Потрібно добре знати:

    push()
    pop()
    shift()
    unshift()
    splice()
    sort()
    reverse()

Вони змінюють original array.

---

# 6. Таблиця mutation

| Метод | Mutates? |
|---|---:|
| `push()` | ✅ |
| `pop()` | ✅ |
| `shift()` | ✅ |
| `unshift()` | ✅ |
| `splice()` | ✅ |
| `sort()` | ✅ |
| `reverse()` | ✅ |
| `map()` | ❌ |
| `filter()` | ❌ |
| `slice()` | ❌ |
| `concat()` | ❌ |
| `flat()` | ❌ |
| `flatMap()` | ❌ |
| `toSorted()` | ❌ |
| `toReversed()` | ❌ |
| `toSpliced()` | ❌ |

Цю таблицю варто знати дуже добре.

---

# 7. Чому immutability важлива

Immutability особливо важлива у:

- React;
- Redux;
- state management;
- frontend applications;
- функціональному програмуванні;
- predictable data flow.

Коли дані не змінюються несподівано, простіше:

- розуміти код;
- знаходити помилки;
- відстежувати зміни;
- порівнювати старий і новий state;
- тестувати функції;
- працювати з React state.

---

# 8. `const` не означає immutable

Це дуже важливий момент.

Багато початківців думають:

    const numbers = [1, 2, 3];

означає:

> масив не можна змінити.

Це неправильно.

`const` забороняє змінити **посилання на масив**.

Але вміст масиву можна змінювати:

    const numbers = [1, 2, 3];

    numbers.push(4);

Це дозволено.

---

# 9. Що саме забороняє `const`

Це помилка:

    const numbers = [1, 2, 3];

    numbers = [4, 5, 6];

Тому що ми намагаємося змінити binding:

    numbers
        ↓
    інший масив

А ось це дозволено:

    const numbers = [1, 2, 3];

    numbers[0] = 100;

Масив той самий.

Змінився його вміст.

---

# 10. `const` ≠ immutability

Отже:

    const
        → не можна переприсвоїти змінну

    immutability
        → не змінюємо сам об'єкт/масив

Це різні поняття.

---

# 11. Reference

Об'єкти та масиви в JavaScript працюють через references.

Наприклад:

    const numbers = [1, 2, 3];

    const other = numbers;

Тепер:

    numbers
        ↓
        [1, 2, 3]
        ↑
    other

Обидві змінні посилаються на **той самий масив**.

---

# 12. Наслідок спільного reference

    const numbers = [1, 2, 3];

    const other = numbers;

    other.push(4);

    console.log(numbers);
    // [1, 2, 3, 4]

Чому `numbers` змінився?

Тому що:

    numbers === other
    // true

Обидві змінні посилаються на один масив.

---

# 13. Перевірка reference

    const numbers = [1, 2, 3];

    const other = numbers;

    console.log(numbers === other);
    // true

Це означає:

> це той самий об'єкт у пам'яті.

---

# 14. Створення нового масиву

Щоб створити новий масив:

    const numbers = [1, 2, 3];

    const other = [...numbers];

Тепер:

    console.log(numbers === other);
    // false

Маємо два різні масиви.

---

# 15. Spread як shallow copy

    const numbers = [1, 2, 3];

    const copy = [...numbers];

    copy.push(4);

    console.log(numbers);
    // [1, 2, 3]

    console.log(copy);
    // [1, 2, 3, 4]

Це один із найважливіших immutable-патернів у JavaScript.

---

# 16. Immutable додавання

Mutable:

    const numbers = [1, 2, 3];

    numbers.push(4);

Immutable:

    const numbers = [1, 2, 3];

    const newNumbers = [...numbers, 4];

Результат:

    numbers
    // [1, 2, 3]

    newNumbers
    // [1, 2, 3, 4]

---

# 17. Immutable додавання на початок

Mutable:

    const numbers = [2, 3];

    numbers.unshift(1);

Immutable:

    const numbers = [2, 3];

    const newNumbers = [1, ...numbers];

Результат:

    [1, 2, 3]

---

# 18. Immutable видалення

Mutable:

    const numbers = [1, 2, 3, 4];

    numbers.splice(1, 1);

Immutable:

    const newNumbers = numbers.filter(number => number !== 2);

Результат:

    [1, 3, 4]

Original:

    [1, 2, 3, 4]

залишився без змін.

---

# 19. Видалення за індексом

Є:

    const numbers = [10, 20, 30, 40];

Потрібно видалити елемент з індексом `2`.

Mutable:

    numbers.splice(2, 1);

Immutable через `toSpliced()`:

    const newNumbers = numbers.toSpliced(2, 1);

Immutable через `slice()`:

    const newNumbers = [
        ...numbers.slice(0, 2),
        ...numbers.slice(3)
    ];

Для сучасного JavaScript `toSpliced()` є значно зрозумілішим варіантом.

---

# 20. Immutable заміна елемента

Є:

    const numbers = [10, 20, 30];

Потрібно замінити `20` на `200`.

Mutable:

    numbers[1] = 200;

Immutable через `map()`:

    const newNumbers = numbers.map((number, index) => {
        return index === 1 ? 200 : number;
    });

Результат:

    [10, 200, 30]

Original:

    [10, 20, 30]

---

# 21. Immutable оновлення за умовою

Наприклад:

    const numbers = [10, 20, 30, 40];

Потрібно помножити на `2` тільки числа, більші за `20`.

    const newNumbers = numbers.map(number => {
        return number > 20
            ? number * 2
            : number;
    });

Результат:

    [10, 20, 60, 80]

---

# 22. Immutable сортування

`sort()` мутує:

    const numbers = [3, 1, 2];

    numbers.sort((a, b) => a - b);

Original:

    [1, 2, 3]

Immutable варіант:

    const numbers = [3, 1, 2];

    const sorted = [...numbers].sort((a, b) => a - b);

Original:

    [3, 1, 2]

Sorted:

    [1, 2, 3]

---

# 23. `toSorted()`

Сучасний JavaScript має:

    toSorted()

Він не змінює original.

    const numbers = [3, 1, 2];

    const sorted = numbers.toSorted((a, b) => a - b);

    console.log(numbers);
    // [3, 1, 2]

    console.log(sorted);
    // [1, 2, 3]

Ментальна модель:

    sort()
        → mutable

    toSorted()
        → immutable

---

# 24. Immutable reverse

`reverse()` мутує:

    const numbers = [1, 2, 3];

    numbers.reverse();

Original:

    [3, 2, 1]

Immutable через копію:

    const reversed = [...numbers].reverse();

Або сучасний варіант:

    const reversed = numbers.toReversed();

---

# 25. `toReversed()`

    const numbers = [1, 2, 3];

    const reversed = numbers.toReversed();

    console.log(numbers);
    // [1, 2, 3]

    console.log(reversed);
    // [3, 2, 1]

Ментальна модель:

    reverse()
        → mutable

    toReversed()
        → immutable

---

# 26. Immutable splice

`splice()` мутує:

    const numbers = [1, 2, 3, 4];

    numbers.splice(1, 2);

Original:

    [1, 4]

Сучасний варіант:

    const numbers = [1, 2, 3, 4];

    const result = numbers.toSpliced(1, 2);

    console.log(numbers);
    // [1, 2, 3, 4]

    console.log(result);
    // [1, 4]

Ментальна модель:

    splice()
        → mutable

    toSpliced()
        → immutable

---

# 27. Три сучасні immutable методи

Дуже корисно запам'ятати:

    sort()
        → toSorted()

    reverse()
        → toReversed()

    splice()
        → toSpliced()

Тобто:

| Mutable | Immutable |
|---|---|
| `sort()` | `toSorted()` |
| `reverse()` | `toReversed()` |
| `splice()` | `toSpliced()` |

---

# 28. Immutable update pattern

Загальна схема:

    oldData
        ↓
    create copy
        ↓
    modify copy
        ↓
    return newData

Наприклад:

    const numbers = [1, 2, 3];

    const newNumbers = [...numbers];

    newNumbers.push(4);

    console.log(numbers);
    // [1, 2, 3]

    console.log(newNumbers);
    // [1, 2, 3, 4]

---

# 29. Array methods як immutable tools

Багато задач можна вирішувати через методи, які автоматично створюють новий масив.

## Перетворення

    map()

## Фільтрація

    filter()

## Частина

    slice()

## Об'єднання

    concat()

## Flatten

    flat()

## Flatten + transform

    flatMap()

Це дуже важлива основа функціонального стилю JavaScript.

---

# 30. `map()` та immutability

    const users = [
        { name: "Anna", age: 25 },
        { name: "John", age: 30 }
    ];

    const updatedUsers = users.map(user => {
        return {
            ...user,
            age: user.age + 1
        };
    });

Original:

    [
        { name: "Anna", age: 25 },
        { name: "John", age: 30 }
    ]

New:

    [
        { name: "Anna", age: 26 },
        { name: "John", age: 31 }
    ]

---

# 31. Чому тут потрібен `...user`

Неправильно:

    const updatedUsers = users.map(user => {
        user.age += 1;
        return user;
    });

Це мутує існуючі об'єкти.

Правильно:

    const updatedUsers = users.map(user => {
        return {
            ...user,
            age: user.age + 1
        };
    });

Тут створюється новий об'єкт.

---

# 32. Shallow copy об'єкта

Наприклад:

    const user = {
        name: "Anna",
        age: 25
    };

    const updatedUser = {
        ...user,
        age: 26
    };

Тепер:

    user
    // { name: "Anna", age: 25 }

    updatedUser
    // { name: "Anna", age: 26 }

І:

    user === updatedUser
    // false

---

# 33. Оновлення властивості об'єкта

Mutable:

    const user = {
        name: "Anna",
        age: 25
    };

    user.age = 26;

Immutable:

    const user = {
        name: "Anna",
        age: 25
    };

    const updatedUser = {
        ...user,
        age: 26
    };

Це фундаментальний патерн для React.

---

# 34. Додавання властивості

    const user = {
        name: "Anna",
        age: 25
    };

    const updatedUser = {
        ...user,
        role: "admin"
    };

Original:

    {
        name: "Anna",
        age: 25
    }

New:

    {
        name: "Anna",
        age: 25,
        role: "admin"
    }

---

# 35. Видалення властивості

Для видалення властивості без мутації можна використати destructuring.

    const user = {
        name: "Anna",
        age: 25,
        password: "123"
    };

    const { password, ...safeUser } = user;

    console.log(safeUser);

Результат:

    {
        name: "Anna",
        age: 25
    }

Original `user` не змінюється.

---

# 36. Immutable оновлення вкладеного об'єкта

Є:

    const user = {
        name: "Anna",
        address: {
            city: "Vinnytsia",
            country: "Ukraine"
        }
    };

Потрібно змінити `city`.

Неправильно:

    user.address.city = "Kyiv";

Це mutation.

Правильно:

    const updatedUser = {
        ...user,
        address: {
            ...user.address,
            city: "Kyiv"
        }
    };

---

# 37. Чому потрібно копіювати кожен змінений рівень

Було:

    user
      ↓
    address
      ↓
    city

Якщо змінюємо:

    city

потрібно створити нові об'єкти на шляху до нього:

    newUser
      ↓
    newAddress
      ↓
    newCity

Тому:

    const updatedUser = {
        ...user,
        address: {
            ...user.address,
            city: "Kyiv"
        }
    };

---

# 38. Вкладені масиви

Є:

    const users = [
        {
            name: "Anna",
            skills: ["JS", "React"]
        },
        {
            name: "John",
            skills: ["Node"]
        }
    ];

Потрібно додати `TypeScript` Anna.

Неправильно:

    users[0].skills.push("TypeScript");

Це mutation.

---

# 39. Immutable оновлення вкладеного масиву

Правильно:

    const updatedUsers = users.map(user => {
        if (user.name !== "Anna") {
            return user;
        }

        return {
            ...user,
            skills: [...user.skills, "TypeScript"]
        };
    });

Тепер:

    users

залишився незмінним.

А:

    updatedUsers

містить нову версію даних.

---

# 40. Важливий момент: не все потрібно копіювати

Immutable update не означає:

> створити deep copy всього дерева даних.

Потрібно створити нові об'єкти тільки на шляху до зміненої частини.

Наприклад:

    const updatedUsers = users.map(user => {
        if (user.id !== 2) {
            return user;
        }

        return {
            ...user,
            name: "New Name"
        };
    });

Об'єкти інших користувачів можна залишити з тими самими references.

---

# 41. Structural sharing

Це називається **structural sharing**.

Стара структура:

    users
      ├── user1
      ├── user2
      └── user3

Якщо змінюємо `user2`:

    newUsers
      ├── user1 ──────┐
      ├── newUser2    │
      └── user3 ──────┘

`user1` і `user3` можуть залишитися тими самими об'єктами.

Створюється тільки необхідна частина нової структури.

Це важлива концепція для React та state management.

---

# 42. Reference equality

Immutability часто використовує порівняння references.

Наприклад:

    const oldUser = {
        name: "Anna"
    };

    const newUser = {
        ...oldUser,
        name: "Kate"
    };

    console.log(oldUser === newUser);
    // false

Ми отримали новий object.

---

# 43. Якщо нічого не змінилося

У деяких сценаріях можна повернути старий reference.

Наприклад:

    const updatedUsers = users.map(user => {
        if (user.id === 2) {
            return {
                ...user,
                name: "John"
            };
        }

        return user;
    });

Для користувачів, яких ми не змінювали:

    updatedUsers[0] === users[0]
    // true

Для зміненого:

    updatedUsers[1] === users[1]
    // false

Це корисно для оптимізації.

---

# 44. Immutability та React

React часто працює за принципом:

    old state
        ↓
    new state
        ↓
    render

Тому замість:

    state.push(item);

часто потрібно:

    setState(prev => [...prev, item]);

---

# 45. Додавання в React state

Mutable:

    const addUser = user => {
        users.push(user);
        setUsers(users);
    };

Проблема:

    users

залишається тим самим reference.

Immutable:

    const addUser = user => {
        setUsers(prevUsers => [
            ...prevUsers,
            user
        ]);
    };

Створюється новий масив.

---

# 46. Видалення з React state

Mutable:

    users.splice(index, 1);
    setUsers(users);

Immutable:

    setUsers(prevUsers =>
        prevUsers.toSpliced(index, 1)
    );

Або:

    setUsers(prevUsers =>
        prevUsers.filter(user => user.id !== id)
    );

---

# 47. Оновлення React state

Наприклад, потрібно змінити ім'я користувача.

    setUsers(prevUsers =>
        prevUsers.map(user =>
            user.id === id
                ? { ...user, name: newName }
                : user
        )
    );

Це дуже важливий React-патерн.

Ментальна модель:

    map()
        ↓
    знайти потрібний елемент
        ↓
    створити новий object
        ↓
    інші елементи залишити без змін

---

# 48. Чому mutation може створювати проблеми

При мутації:

    const users = [...];

    users[0].name = "Kate";

Reference масиву може залишитися тим самим.

Система, яка орієнтується на reference equality, може не побачити очікуваної зміни на потрібному рівні.

Тому immutable updates роблять зміни більш передбачуваними.

---

# 49. Immutability та `Object.freeze()`

JavaScript має:

    Object.freeze()

Наприклад:

    const user = {
        name: "Anna"
    };

    Object.freeze(user);

Після цього:

    user.name = "John";

не дозволяється змінювати властивість у звичайному режимі виконання.

Але:

    Object.freeze()

за замовчуванням є **shallow**.

---

# 50. `Object.freeze()` не є deep freeze

Наприклад:

    const user = {
        name: "Anna",
        address: {
            city: "Vinnytsia"
        }
    };

    Object.freeze(user);

Зовнішній об'єкт frozen.

Але вкладений:

    user.address

не обов'язково frozen.

Тому:

    user.address.city = "Kyiv";

може змінити вкладений об'єкт.

`Object.freeze()` ≠ автоматичний deep immutable object.

---

# 51. `Object.freeze()` vs immutable programming

Це різні концепції.

`Object.freeze()`:

    захищає об'єкт від певних мутацій

Immutability:

    стиль роботи,
    при якому ми створюємо
    нові значення замість зміни старих

У React зазвичай не потрібно вручну заморожувати весь state через `Object.freeze()`.

Важливіше правильно робити immutable updates.

---

# 52. Immutable array operations

## Додати в кінець

    const result = [...array, value];

## Додати на початок

    const result = [value, ...array];

## Видалити за умовою

    const result = array.filter(item => condition);

## Перетворити

    const result = array.map(item => transform(item));

## Отримати частину

    const result = array.slice(start, end);

## Відсортувати

    const result = array.toSorted(compareFn);

## Розвернути

    const result = array.toReversed();

## Видалити/вставити/замінити

    const result = array.toSpliced(...);

---

# 53. Immutable object operations

## Оновити властивість

    const updated = {
        ...user,
        name: "John"
    };

## Додати властивість

    const updated = {
        ...user,
        role: "admin"
    };

## Видалити властивість

    const { password, ...safeUser } = user;

## Оновити вкладений object

    const updated = {
        ...user,
        address: {
            ...user.address,
            city: "Kyiv"
        }
    };

---

# 54. Mutable vs immutable

## Mutable

    const user = {
        name: "Anna",
        age: 25
    };

    user.age = 26;

Original object змінено.

---

## Immutable

    const user = {
        name: "Anna",
        age: 25
    };

    const updatedUser = {
        ...user,
        age: 26
    };

Original залишився:

    {
        name: "Anna",
        age: 25
    }

Новий:

    {
        name: "Anna",
        age: 26
    }

---

# 55. Mutable vs immutable масив

## Mutable

    const numbers = [1, 2, 3];

    numbers.push(4);

    console.log(numbers);
    // [1, 2, 3, 4]

---

## Immutable

    const numbers = [1, 2, 3];

    const newNumbers = [...numbers, 4];

    console.log(numbers);
    // [1, 2, 3]

    console.log(newNumbers);
    // [1, 2, 3, 4]

---

# 56. `concat()` як immutable альтернатива

Замість:

    numbers.push(4);

можна:

    const newNumbers = numbers.concat(4);

Original:

    [1, 2, 3]

New:

    [1, 2, 3, 4]

Також можна:

    const newNumbers = [...numbers, 4];

Обидва підходи створюють новий масив.

---

# 57. `filter()` як immutable delete

Mutable:

    numbers.splice(index, 1);

Immutable:

    const result = numbers.filter(
        (_, currentIndex) => currentIndex !== index
    );

Для видалення за значенням:

    const result = numbers.filter(number => number !== 20);

---

# 58. `map()` як immutable update

Замість:

    users[index].name = "Kate";

можна:

    const updatedUsers = users.map((user, currentIndex) => {
        if (currentIndex !== index) {
            return user;
        }

        return {
            ...user,
            name: "Kate"
        };
    });

---

# 59. Не потрібно боятися mutation взагалі

Immutability — не означає:

> mutation завжди заборонена в будь-якому JavaScript-коді.

Mutation може бути нормальною всередині контрольованої локальної операції.

Наприклад:

    function sortNumbers(numbers) {
        const copy = [...numbers];

        copy.sort((a, b) => a - b);

        return copy;
    }

Ми мутуємо:

    copy

але не мутуємо:

    numbers

Це цілком нормальний підхід.

---

# 60. Mutation локальної копії

Наприклад:

    function removeFirst(items) {
        const copy = [...items];

        copy.shift();

        return copy;
    }

Тут:

    items
        → не змінюється

    copy
        → змінюється локально

Це хороший компроміс:

> mutation дозволена всередині локальної копії, якщо зовнішній стан не змінюється.

---

# 61. Immutability не означає "ніколи не змінювати локальну змінну"

Наприклад:

    let total = 0;

    for (const number of numbers) {
        total += number;
    }

Тут `total` змінюється.

Це не той тип mutation, який зазвичай мають на увазі, коли говорять про immutable data structures.

У контексті масивів/об'єктів головна проблема — **несподівана зміна спільних даних**.

---

# 62. Shallow copy vs deep copy

## Shallow copy

Копіюється контейнер.

Вкладені об'єкти можуть залишатися спільними.

    const copy = [...users];

---

## Deep copy

Створюється незалежна структура з вкладеними об'єктами.

Сучасний JavaScript має:

    structuredClone()

Наприклад:

    const copy = structuredClone(user);

Але deep clone не потрібно використовувати автоматично.

---

# 63. `structuredClone()`

Приклад:

    const user = {
        name: "Anna",
        address: {
            city: "Vinnytsia"
        }
    };

    const copy = structuredClone(user);

Тепер:

    copy !== user
    // true

і:

    copy.address !== user.address
    // true

Це глибоке копіювання підтримуваних типів даних.

---

# 64. Чому deep clone не є універсальним рішенням

Не потрібно робити:

    const copy = structuredClone(bigObject);

при кожній маленькій зміні.

Це може:

- створювати зайві об'єкти;
- витрачати пам'ять;
- бути повільнішим;
- руйнувати корисне structural sharing.

У frontend часто краще створювати нові references тільки там, де дані реально змінилися.

---

# 65. Immutable data та performance

Immutability має переваги, але не є безкоштовною.

Створення нових масивів та об'єктів означає:

    allocation
        +
    copying references
        +
    garbage collection

Тому потрібно розуміти баланс.

Правильна ідея:

    не мутувати shared state
        +
    не робити бездумні deep copies всього state

---

# 66. Structural sharing та performance

Наприклад:

    const users = [
        user1,
        user2,
        user3,
        user4
    ];

Потрібно змінити тільки `user2`.

Не потрібно створювати чотири нових user objects.

Можна:

    const updatedUsers = users.map(user =>
        user.id === 2
            ? { ...user, name: "New Name" }
            : user
    );

Тут:

    user1 → той самий reference
    user2 → новий reference
    user3 → той самий reference
    user4 → той самий reference

Це ефективніше, ніж deep clone всієї структури.

---

# 67. Immutable method chaining

Immutable методи добре комбінуються:

    const result = users
        .filter(user => user.active)
        .map(user => ({
            ...user,
            name: user.name.toUpperCase()
        }))
        .slice(0, 10);

Кожен метод повертає новий результат.

Ментальна модель:

    users
      ↓
    filter()
      ↓
    map()
      ↓
    slice()
      ↓
    result

---

# 68. Immutable data pipeline

Наприклад:

    const result = products
        .filter(product => product.inStock)
        .map(product => ({
            ...product,
            price: product.price * 0.9
        }))
        .toSorted((a, b) => a.price - b.price);

Original `products` не змінюється.

Це типовий стиль сучасного JavaScript.

---

# 69. Типові помилки

## Помилка 1. `const` вважають immutable

    const users = [];

    users.push(user);

Це дозволено.

`const` не робить масив immutable.

---

## Помилка 2. `sort()` вважають immutable

    const sorted = users.sort(...);

`users` також змінився.

Потрібно:

    const sorted = users.toSorted(...);

або:

    const sorted = [...users].sort(...);

---

## Помилка 3. `reverse()` вважають immutable

    const reversed = users.reverse();

Original `users` також змінено.

Краще:

    const reversed = users.toReversed();

---

## Помилка 4. `splice()` вважають immutable

    const result = users.splice(1, 1);

`users` вже змінений.

Краще:

    const result = users.toSpliced(1, 1);

---

## Помилка 5. Копіювати тільки зовнішній масив

    const copy = [...users];

Це shallow copy.

Вкладені objects все ще можуть бути спільними.

---

## Помилка 6. Мутувати object всередині `map()`

Неправильно:

    users.map(user => {
        user.active = true;
        return user;
    });

Правильно:

    users.map(user => ({
        ...user,
        active: true
    }));

---

# 70. Типова помилка з вкладеними даними

Неправильно:

    const updatedUser = { ...user };

    updatedUser.address.city = "Kyiv";

Чому це проблема?

Тому що:

    updatedUser.address
        ===
    user.address

Ми скопіювали тільки верхній рівень.

Правильно:

    const updatedUser = {
        ...user,
        address: {
            ...user.address,
            city: "Kyiv"
        }
    };

---

# 71. Практичний приклад: список користувачів

Є:

    const users = [
        {
            id: 1,
            name: "Anna",
            active: true
        },
        {
            id: 2,
            name: "John",
            active: false
        }
    ];

Завдання:

> активувати користувача з `id = 2`.

Immutable:

    const updatedUsers = users.map(user => {
        if (user.id !== 2) {
            return user;
        }

        return {
            ...user,
            active: true
        };
    });

---

# 72. Практичний приклад: додати користувача

    const users = [
        { id: 1, name: "Anna" }
    ];

    const newUser = {
        id: 2,
        name: "John"
    };

    const updatedUsers = [
        ...users,
        newUser
    ];

Результат:

    [
        { id: 1, name: "Anna" },
        { id: 2, name: "John" }
    ]

Original `users` не змінений.

---

# 73. Практичний приклад: видалити користувача

    const users = [
        { id: 1, name: "Anna" },
        { id: 2, name: "John" },
        { id: 3, name: "Mark" }
    ];

    const updatedUsers = users.filter(user => user.id !== 2);

Результат:

    [
        { id: 1, name: "Anna" },
        { id: 3, name: "Mark" }
    ]

Original:

    users

залишився без змін.

---

# 74. Практичний приклад: змінити користувача

    const users = [
        { id: 1, name: "Anna" },
        { id: 2, name: "John" },
        { id: 3, name: "Mark" }
    ];

    const updatedUsers = users.map(user =>
        user.id === 2
            ? { ...user, name: "Jonathan" }
            : user
    );

---

# 75. Практичний приклад: додати skill

    const user = {
        name: "Anna",
        skills: ["JavaScript", "React"]
    };

    const updatedUser = {
        ...user,
        skills: [
            ...user.skills,
            "TypeScript"
        ]
    };

Original:

    {
        name: "Anna",
        skills: ["JavaScript", "React"]
    }

New:

    {
        name: "Anna",
        skills: ["JavaScript", "React", "TypeScript"]
    }

---

# 76. Практичний приклад: видалити skill

    const user = {
        name: "Anna",
        skills: ["JavaScript", "React", "TypeScript"]
    };

    const updatedUser = {
        ...user,
        skills: user.skills.filter(
            skill => skill !== "React"
        )
    };

---

# 77. Практичний приклад: оновити nested state

    const state = {
        user: {
            name: "Anna",
            settings: {
                theme: "light",
                language: "uk"
            }
        }
    };

Змінити `theme`:

    const newState = {
        ...state,
        user: {
            ...state.user,
            settings: {
                ...state.user.settings,
                theme: "dark"
            }
        }
    };

Original `state` не змінюється.

---

# 78. Immutable state update — загальний шаблон

Для масиву:

    const newArray = [
        ...oldArray
    ];

Для об'єкта:

    const newObject = {
        ...oldObject
    };

Для зміни властивості:

    const newObject = {
        ...oldObject,
        property: newValue
    };

Для вкладеної властивості:

    const newObject = {
        ...oldObject,
        nested: {
            ...oldObject.nested,
            property: newValue
        }
    };

---

# 79. Immutable operations — шпаргалка

## Add

    [...array, value]

## Add first

    [value, ...array]

## Remove by condition

    array.filter(item => condition)

## Update item

    array.map(item => condition
        ? { ...item, value: newValue }
        : item
    )

## Copy

    [...array]

## Slice

    array.slice(start, end)

## Sort

    array.toSorted(compareFn)

## Reverse

    array.toReversed()

## Splice

    array.toSpliced(start, deleteCount, ...items)

---

# 80. Mutable → Immutable

## `push()`

Mutable:

    array.push(value);

Immutable:

    const result = [...array, value];

---

## `unshift()`

Mutable:

    array.unshift(value);

Immutable:

    const result = [value, ...array];

---

## `splice()` delete

Mutable:

    array.splice(index, 1);

Immutable:

    const result = array.toSpliced(index, 1);

---

## `sort()`

Mutable:

    array.sort(compareFn);

Immutable:

    const result = array.toSorted(compareFn);

---

## `reverse()`

Mutable:

    array.reverse();

Immutable:

    const result = array.toReversed();

---

# 81. Mutable → Immutable: object

## Property update

Mutable:

    user.name = "John";

Immutable:

    const updatedUser = {
        ...user,
        name: "John"
    };

---

## Property add

Mutable:

    user.role = "admin";

Immutable:

    const updatedUser = {
        ...user,
        role: "admin"
    };

---

## Nested property update

Mutable:

    user.address.city = "Kyiv";

Immutable:

    const updatedUser = {
        ...user,
        address: {
            ...user.address,
            city: "Kyiv"
        }
    };

---

# 82. Коли immutability особливо важлива

Особливо важлива при роботі з:

- React state;
- Redux;
- Zustand та іншими state managers;
- props;
- shared data;
- кешами;
- predictable state;
- функціями, які повинні бути pure.

---

# 83. Pure functions та immutability

Pure function:

- для однакового input повертає однаковий output;
- не має небажаних side effects.

Наприклад:

    function addItem(items, item) {
        return [...items, item];
    }

Функція не змінює:

    items

а повертає:

    new array

---

# 84. Непередбачувана mutation

Проблемний код:

    function addItem(items, item) {
        items.push(item);

        return items;
    }

Тепер функція має side effect:

    input

було змінено всередині функції.

Це може створювати складні для пошуку помилки.

---

# 85. Immutable function

Кращий варіант:

    function addItem(items, item) {
        return [...items, item];
    }

Використання:

    const numbers = [1, 2, 3];

    const result = addItem(numbers, 4);

Результат:

    numbers
    // [1, 2, 3]

    result
    // [1, 2, 3, 4]

---

# 86. Pure transformation

Ще один приклад:

    function doubleNumbers(numbers) {
        return numbers.map(number => number * 2);
    }

Вхід:

    [1, 2, 3]

Вихід:

    [2, 4, 6]

Original не змінюється.

---

# 87. Immutability та predictability

Без mutation:

    oldState
        ↓
    operation
        ↓
    newState

Можна чітко порівняти:

    oldState
    newState

З mutation:

    state
        ↓
    operation
        ↓
    той самий object
        ↓
    старий стан втрачено

Це одна з головних причин використання immutability.

---

# 88. Undo / history

Immutable data зручна для збереження історії.

Наприклад:

    const state1 = [1, 2];

    const state2 = [...state1, 3];

    const state3 = [...state2, 4];

Тепер ми все ще маємо:

    state1
    // [1, 2]

    state2
    // [1, 2, 3]

    state3
    // [1, 2, 3, 4]

При mutation попередні стани могли б бути змінені.

---

# 89. Immutability та debugging

Якщо дані не мутуються:

    oldState !== newState

може допомогти зрозуміти:

- що змінилося;
- коли змінилося;
- яка функція створила новий стан.

Це особливо корисно у великих frontend applications.

---

# 90. Типові помилки

### 1. `const` плутають з immutability

    const array = [];

    array.push(1);

Це mutation.

---

### 2. `sort()` мутує

    array.sort();

---

### 3. `reverse()` мутує

    array.reverse();

---

### 4. `splice()` мутує

    array.splice(...);

---

### 5. Spread — не deep clone

    const copy = {
        ...object
    };

---

### 6. Мутують об'єкти всередині `map()`

    users.map(user => {
        user.name = "John";
        return user;
    });

---

### 7. Роблять deep clone всього state без потреби

    structuredClone(state)

не повинен бути автоматичним рішенням кожної проблеми.

---

# 91. Питання для співбесіди

### 1. Що таке immutability?

Принцип, за якого існуючі дані не змінюються напряму; замість цього створюється нова версія даних.

---

### 2. Чи є `const` immutable?

Ні.

`const` забороняє переприсвоєння binding, але не робить об'єкт або масив immutable.

---

### 3. Які методи масиву мутують?

Основні:

    push()
    pop()
    shift()
    unshift()
    splice()
    sort()
    reverse()

---

### 4. Які методи не мутують?

Наприклад:

    map()
    filter()
    slice()
    concat()
    flat()
    flatMap()

Також сучасні:

    toSorted()
    toReversed()
    toSpliced()

---

### 5. Як додати елемент без mutation?

    const result = [...array, value];

---

### 6. Як видалити елемент без mutation?

Наприклад:

    const result = array.filter(item => item.id !== id);

або:

    const result = array.toSpliced(index, 1);

---

### 7. Як відсортувати без mutation?

    const result = array.toSorted(compareFn);

або:

    const result = [...array].sort(compareFn);

---

### 8. Що таке shallow copy?

Копія верхнього рівня, у якій вкладені об'єкти можуть залишатися спільними references.

---

### 9. Як зробити shallow copy масиву?

    const copy = [...array];

або:

    const copy = array.slice();

---

### 10. Як зробити shallow copy об'єкта?

    const copy = {
        ...object
    };

---

### 11. Чому mutation може бути проблемою в React?

Тому що React та state management часто використовують reference equality для визначення змін.

---

### 12. Що таке structural sharing?

Повторне використання незмінених частин структури при створенні нової версії даних.

---

### 13. Чи потрібно робити deep clone всього state?

Ні.

Зазвичай потрібно створити нові references лише для змінених рівнів.

---

### 14. `sort()` vs `toSorted()`?

    sort()
        → мутує

    toSorted()
        → не мутує

---

### 15. `splice()` vs `toSpliced()`?

    splice()
        → мутує

    toSpliced()
        → не мутує

---

# 92. Шлях вивчення

## Core

Потрібно знати:

- mutation;
- immutability;
- reference;
- `const` ≠ immutable;
- shallow copy;
- spread operator;
- `map()`;
- `filter()`;
- `slice()`;
- `concat()`;
- `sort()` mutates;
- `reverse()` mutates;
- `splice()` mutates.

---

## Junior

Потрібно вміти:

- додавати елементи immutable;
- видаляти елементи immutable;
- оновлювати елементи через `map()`;
- оновлювати об'єкти через spread;
- працювати з nested objects;
- працювати з nested arrays;
- використовувати `toSorted()`;
- використовувати `toReversed()`;
- використовувати `toSpliced()`;
- розуміти React state;
- розуміти reference equality;
- уникати mutation shared state.

---

## Middle

Корисно розуміти:

- structural sharing;
- shallow vs deep copy;
- reference equality;
- immutable data structures;
- performance;
- garbage collection;
- state management;
- pure functions;
- side effects;
- оптимізацію immutable updates.

---

## Senior

Додатково:

- persistent data structures;
- structural sharing algorithms;
- immutable state architecture;
- memory/performance trade-offs;
- change detection;
- referential equality;
- memoization;
- React rendering optimization;
- state normalization;
- великі data structures;
- specialized immutable libraries та їхні trade-offs.

---

# 93. Практичні вправи

## Вправа 1 — додавання

Є:

    const numbers = [1, 2, 3];

Додати `4`, не змінюючи original.

Очікувано:

    numbers
    // [1, 2, 3]

    result
    // [1, 2, 3, 4]

---

## Вправа 2 — видалення

Є:

    const numbers = [1, 2, 3, 4];

Видалити `3` без mutation.

---

## Вправа 3 — заміна

Є:

    const numbers = [10, 20, 30];

Замінити `20` на `200` без mutation.

---

## Вправа 4 — сортування

Є:

    const numbers = [5, 2, 8, 1];

Відсортувати без зміни original.

Спробувати:

    toSorted()

та:

    [...numbers].sort(...)

---

## Вправа 5 — reverse

Є:

    const numbers = [1, 2, 3];

Створити reversed array без зміни original.

---

## Вправа 6 — об'єкт

Є:

    const user = {
        name: "Anna",
        age: 25
    };

Створити нового користувача з:

    age: 26

без зміни original.

---

## Вправа 7 — список користувачів

Є:

    const users = [
        { id: 1, name: "Anna", active: true },
        { id: 2, name: "John", active: false },
        { id: 3, name: "Mark", active: true }
    ];

Зробити `John` активним без mutation.

---

## Вправа 8 — видалення користувача

Видалити користувача з:

    id === 2

без mutation.

---

## Вправа 9 — додати skill

Є:

    const user = {
        name: "Anna",
        skills: ["JavaScript", "React"]
    };

Додати:

    "TypeScript"

без mutation.

---

## Вправа 10 — nested object

Є:

    const user = {
        name: "Anna",
        address: {
            city: "Vinnytsia",
            country: "Ukraine"
        }
    };

Змінити місто на:

    "Kyiv"

не мутуючи original.

---

# 94. Міні-шпаргалка

## Mutable

    push()
    pop()
    shift()
    unshift()
    splice()
    sort()
    reverse()

---

## Immutable

    map()
    filter()
    slice()
    concat()
    flat()
    flatMap()
    toSorted()
    toReversed()
    toSpliced()

---

## Додати

    const result = [...array, value];

---

## Додати на початок

    const result = [value, ...array];

---

## Видалити

    const result = array.filter(item => item.id !== id);

---

## Оновити

    const result = array.map(item =>
        item.id === id
            ? { ...item, name: "New Name" }
            : item
    );

---

## Копія масиву

    const copy = [...array];

---

## Копія об'єкта

    const copy = { ...object };

---

## Sort без mutation

    const result = array.toSorted(compareFn);

---

## Reverse без mutation

    const result = array.toReversed();

---

## Splice без mutation

    const result = array.toSpliced(
        start,
        deleteCount,
        ...items
    );

---

# 95. Головне

- **Immutability** означає: не змінюй існуючі shared data напряму.
- `const` **не робить** масив або об'єкт immutable.
- Масиви та об'єкти передаються через references.
- `const other = array` створює ще одне посилання на той самий масив.
- `const copy = [...array]` створює новий масив.
- Spread створює **shallow copy**.
- `map()`, `filter()`, `slice()`, `flat()` та `flatMap()` не мутують original.
- `push()`, `pop()`, `shift()`, `unshift()`, `splice()`, `sort()`, `reverse()` мутують.
- `toSorted()`, `toReversed()`, `toSpliced()` — сучасні немутуючі альтернативи.
- Для об'єктів використовуй spread:
  
      const updated = {
          ...object,
          property: newValue
      };

- Для вкладених об'єктів потрібно копіювати кожен змінений рівень.
- Не потрібно робити deep clone всього state при кожній зміні.
- **Structural sharing** дозволяє перевикористовувати незмінені частини структури.
- Immutable-підхід особливо важливий для **React state** та state management.
- Мета immutability — не "ніколи нічого не змінювати", а **не мутувати дані, які повинні залишатися незмінними для іншого коду**.

> **Ментальна модель:**
>
> `mutation`
> → **змінити існуючий**
>
> `immutability`
> → **створити новий**
>
> `spread`
> → **shallow copy**
>
> `map()`
> → **створити нову версію елементів**
>
> `filter()`
> → **створити масив без непотрібних елементів**
>
> `toSorted()`
> → **новий відсортований масив**
>
> `toReversed()`
> → **новий перевернутий масив**
>
> `toSpliced()`
> → **новий масив після insert/delete/replace**