# 04. Searching

## Вступ

**Searching** — це алгоритми пошуку потрібного елемента або групи елементів у наборі даних.

Для масивів найважливіше навчитися розуміти:

- що саме ми шукаємо;
- чи відсортовані дані;
- чи потрібен індекс або саме значення;
- чи потрібно знайти перший збіг;
- чи потрібно знайти всі збіги;
- скільки разів потрібно виконати пошук;
- чи можна використати додаткову структуру даних;
- яка часова складність алгоритму.

У JavaScript пошук зустрічається постійно:

- пошук користувача за `id`;
- пошук товару;
- пошук елемента в масиві;
- пошук запису в API-відповіді;
- пошук значення в `Set`;
- пошук за ключем у `Map`;
- пошук у відсортованих даних;
- пошук за умовою;
- пошук у рядках.

---

# Місце Searching у вивченні алгоритмів

Структура цього розділу:

    09-algorithms-and-logic
    │
    ├── 01-problem-solving
    ├── 02-string-manipulation
    ├── 03-array-problems
    ├── 04-searching
    ├── 05-sorting
    ├── 06-frequency-counter
    ├── 07-two-pointers
    ├── 08-sliding-window
    ├── 09-recursion
    └── 10-complexity-basics

Searching пов'язаний практично з усіма наступними темами.

Особливо:

    Searching
        ↓
    Sorting
        ↓
    Binary Search
        ↓
    Two Pointers
        ↓
    Complexity

---

# Що потрібно пам'ятати

- **Linear Search** може працювати з невідсортованим масивом.
- **Binary Search** потребує впорядкованих даних.
- `find()` повертає перший відповідний елемент.
- `findIndex()` повертає індекс.
- `includes()` перевіряє наявність значення.
- `indexOf()` повертає індекс першого точного збігу.
- `lastIndexOf()` шукає з кінця.
- `some()` перевіряє, чи є хоча б один відповідний елемент.
- `every()` перевіряє, чи всі відповідають умові.
- `Set.has()` зручно використовувати для перевірки наявності унікального значення.
- `Map.has()` перевіряє наявність ключа.
- `Binary Search` працює значно швидше за лінійний пошук на великих відсортованих масивах.
- Але binary search не є універсальною заміною linear search.
- Перед вибором алгоритму потрібно знати властивості даних.

---

# 1. Що означає Search

Маємо дані:

    const numbers = [10, 20, 30, 40, 50];

Потрібно знайти:

    30

Пошук може повернути:

### Значення

    30

### Індекс

    2

### Boolean

    true

### Об'єкт

    {
      id: 3,
      name: "John"
    }

Тому перед реалізацією алгоритму потрібно визначити:

> Що саме повинна повернути функція?

---

# 2. Найпростіший пошук

Для масиву:

    const numbers = [10, 20, 30, 40];

можемо перевіряти кожен елемент:

    for (const number of numbers) {
      if (number === 30) {
        console.log("Found");
      }
    }

Це базова ідея:

> переглянути елементи один за одним.

Цей алгоритм називається:

**Linear Search**

---

# 3. Linear Search

**Linear Search** — лінійний пошук.

Алгоритм:

    [10, 20, 30, 40, 50]
      ↓
     10
      ↓
     20
      ↓
     30 ← found

Ми рухаємося від початку до кінця.

---

# 4. Linear Search — реалізація

    function linearSearch(numbers, target) {
      for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === target) {
          return i;
        }
      }

      return -1;
    }

    linearSearch([10, 20, 30, 40], 30);

    // 2

---

# 5. Чому повертаємо `-1`

Індекси масиву:

    0
    1
    2
    3

`-1` не є нормальним індексом масиву.

Тому його зручно використовувати як:

> "Елемент не знайдено."

Наприклад:

    const index = linearSearch(
      [10, 20, 30],
      100
    );

    // -1

---

# 6. Linear Search — значення

Іноді потрібен сам елемент:

    function findNumber(numbers, target) {
      for (const number of numbers) {
        if (number === target) {
          return number;
        }
      }

      return undefined;
    }

---

# 7. `find()`

У JavaScript є готовий метод:

    const numbers = [10, 20, 30, 40];

    const result = numbers.find((number) => {
      return number === 30;
    });

    // 30

Якщо елемента немає:

    undefined

`find()` повертає:

> перший елемент, який відповідає умові.

---

# 8. `findIndex()`

Якщо потрібен індекс:

    const numbers = [10, 20, 30, 40];

    const index = numbers.findIndex((number) => {
      return number === 30;
    });

    // 2

Якщо не знайдено:

    -1

---

# 9. `includes()`

Якщо потрібно лише знати:

> Чи є таке значення?

можна використовувати:

    const numbers = [10, 20, 30, 40];

    numbers.includes(30);
    // true

    numbers.includes(100);
    // false

`includes()` повертає:

    boolean

---

# 10. `indexOf()`

Повертає індекс першого точного збігу:

    const numbers = [10, 20, 30, 20];

    numbers.indexOf(20);

    // 1

Якщо не знайдено:

    -1

---

# 11. `lastIndexOf()`

Шукає останнє входження:

    const numbers = [10, 20, 30, 20];

    numbers.lastIndexOf(20);

    // 3

Порівняй:

    numbers.indexOf(20);
    // 1

    numbers.lastIndexOf(20);
    // 3

---

# 12. `find()` vs `findIndex()` vs `includes()`

| Метод | Результат |
|---|---|
| `find()` | елемент |
| `findIndex()` | індекс |
| `includes()` | `true / false` |
| `indexOf()` | індекс |
| `lastIndexOf()` | останній індекс |

Приклад:

    const numbers = [10, 20, 30];

    numbers.find((number) => number > 15);
    // 20

    numbers.findIndex((number) => number > 15);
    // 1

    numbers.includes(20);
    // true

    numbers.indexOf(20);
    // 1

---

# 13. Пошук об'єкта

У реальних застосунках часто шукають не число, а об'єкт.

    const users = [
      { id: 1, name: "Anna" },
      { id: 2, name: "John" },
      { id: 3, name: "Kate" }
    ];

Пошук за `id`:

    const user = users.find((user) => {
      return user.id === 2;
    });

Результат:

    {
      id: 2,
      name: "John"
    }

---

# 14. Пошук індексу об'єкта

    const users = [
      { id: 1, name: "Anna" },
      { id: 2, name: "John" },
      { id: 3, name: "Kate" }
    ];

    const index = users.findIndex((user) => {
      return user.id === 2;
    });

    // 1

---

# 15. Пошук за декількома умовами

Наприклад:

> знайти активного користувача віком понад 18 років.

    const users = [
      { name: "Anna", age: 25, active: true },
      { name: "John", age: 17, active: true },
      { name: "Kate", age: 30, active: false }
    ];

    const user = users.find((user) => {
      return user.active && user.age >= 18;
    });

---

# 16. Пошук першого збігу

`find()` зупиняє пошук після першого відповідного елемента.

    const numbers = [5, 12, 20, 15];

    const result = numbers.find((number) => {
      return number > 10;
    });

    // 12

Хоча `20` і `15` також відповідають умові, вони вже не перевіряються після знаходження `12`.

Це важлива властивість пошукових алгоритмів:

> Якщо результат уже знайдено, не завжди потрібно продовжувати пошук.

---

# 17. `some()` як пошук

`some()` відповідає на питання:

> Чи існує хоча б один елемент, який відповідає умові?

    const numbers = [1, 3, 5, 8];

    const hasEven = numbers.some((number) => {
      return number % 2 === 0;
    });

    // true

---

# 18. `every()` — це вже не пошук

`every()` відповідає на інше питання:

> Чи всі елементи відповідають умові?

    const numbers = [2, 4, 6, 8];

    const allEven = numbers.every((number) => {
      return number % 2 === 0;
    });

    // true

Не плутай:

    some()
    // хоча б один?

    every()
    // всі?

---

# 19. Linear Search на прикладі

Маємо:

    [7, 12, 4, 20, 8]

Шукаємо:

    20

Алгоритм:

    7 !== 20
    ↓
    12 !== 20
    ↓
    4 !== 20
    ↓
    20 === 20
    ↓
    FOUND

Індекс:

    3

---

# 20. Найкращий випадок

Маємо:

    [20, 7, 12, 4, 8]

Шукаємо:

    20

Потрібно перевірити тільки перший елемент.

Це найкращий випадок для Linear Search.

---

# 21. Найгірший випадок

Маємо:

    [7, 12, 4, 20, 8]

Шукаємо:

    100

Потрібно перевірити весь масив.

У результаті:

    -1

---

# 22. Складність Linear Search

Якщо масив має `n` елементів:

    Time Complexity: O(n)

У найгіршому випадку потрібно переглянути всі `n` елементів.

Додаткова пам'ять:

    Space Complexity: O(1)

якщо ми не створюємо додаткові структури.

---

# 23. Коли Linear Search — правильний вибір

Linear Search добре підходить, коли:

- масив невеликий;
- дані не відсортовані;
- пошук виконується один раз;
- потрібна проста реалізація;
- дані постійно змінюються;
- немає сенсу підтримувати складнішу структуру даних.

Наприклад:

    const users = [
      { id: 1, name: "Anna" },
      { id: 2, name: "John" },
      { id: 3, name: "Kate" }
    ];

    const user = users.find((user) => {
      return user.id === 2;
    });

Для невеликого масиву це абсолютно нормальний підхід.

---

# 24. Головне обмеження Linear Search

Якщо масив дуже великий:

    [1, 2, 3, 4, 5, ... 1000000]

і потрібно багато разів шукати елементи, лінійний пошук може стати дорогим.

У такій ситуації потрібно подумати:

> Чи можна організувати дані так, щоб пошук був швидшим?

Тут з'являються:

    Set
    Map
    Binary Search
    Hash-based structures

---

# 25. Пошук через `Set`

Якщо нам потрібно багато разів перевіряти наявність значень:

    const numbers = new Set([
      10,
      20,
      30,
      40
    ]);

    numbers.has(30);
    // true

    numbers.has(100);
    // false

Для `Set` операція `has()` у середньому має близьку до:

    O(1)

часову складність.

Але конкретні характеристики залежать від реалізації та умов.

---

# 26. Array vs Set

### Array

    numbers.includes(30);

Типова складність пошуку:

    O(n)

### Set

    numbersSet.has(30);

У середньому:

    O(1)

Але `Set` має іншу семантику:

- зберігає унікальні значення;
- не працює як звичайний індексований масив;
- не замінює `Array` у всіх задачах.

---

# 27. Коли використовувати `Set`

Якщо задача:

> "Мені потрібно дуже часто перевіряти, чи існує значення."

Наприклад:

    const allowedIds = new Set([
      10,
      20,
      30
    ]);

    if (allowedIds.has(userId)) {
      // allowed
    }

---

# 28. Пошук через `Map`

`Map` зручно використовувати, коли пошук відбувається за ключем.

    const users = new Map();

    users.set(1, {
      name: "Anna"
    });

    users.set(2, {
      name: "John"
    });

Пошук:

    users.get(2);

Результат:

    {
      name: "John"
    }

Перевірка:

    users.has(2);

    // true

---

# 29. Array vs Map

Array:

    const user = users.find((user) => {
      return user.id === 2;
    });

Map:

    const user = usersMap.get(2);

Якщо дані природно організовані як:

    id → user

`Map` може бути набагато зручнішим.

---

# 30. Що таке Binary Search

**Binary Search** — бінарний пошук.

Він працює на **відсортованих даних**.

Замість перевірки кожного елемента:

    1
    2
    3
    4
    5
    6
    7
    8

ми дивимося на середину.

Наприклад:

    [1, 2, 3, 4, 5, 6, 7, 8]
                  ↑
                middle

---

# 31. Ідея Binary Search

Шукаємо:

    7

Масив:

    [1, 2, 3, 4, 5, 6, 7, 8]

Середина:

    4

Оскільки:

    7 > 4

ми знаємо, що шукати ліворуч немає сенсу.

Відкидаємо половину:

    [5, 6, 7, 8]

---

# 32. Наступний крок

Маємо:

    [5, 6, 7, 8]

Середина:

    6

Оскільки:

    7 > 6

залишається:

    [7, 8]

---

# 33. Наступний крок

Маємо:

    [7, 8]

Середина:

    7

Знайдено:

    FOUND

---

# 34. Головна ідея Binary Search

Після кожної перевірки ми можемо відкинути приблизно половину області пошуку.

    n
    ↓
    n / 2
    ↓
    n / 4
    ↓
    n / 8
    ↓
    ...

Саме тому Binary Search значно ефективніший за Linear Search на великих відсортованих масивах.

---

# 35. Умова для Binary Search

Дані повинні мати властивість, яка дозволяє відкидати частину області пошуку.

Найтиповіший випадок:

    відсортований масив

Наприклад:

    [1, 3, 5, 7, 9, 11, 13]

---

# 36. Binary Search — базова реалізація

    function binarySearch(numbers, target) {
      let left = 0;
      let right = numbers.length - 1;

      while (left <= right) {
        const middle = Math.floor(
          (left + right) / 2
        );

        if (numbers[middle] === target) {
          return middle;
        }

        if (numbers[middle] < target) {
          left = middle + 1;
        } else {
          right = middle - 1;
        }
      }

      return -1;
    }

---

# 37. Приклад Binary Search

    const numbers = [
      10,
      20,
      30,
      40,
      50,
      60,
      70
    ];

    binarySearch(numbers, 50);

    // 4

---

# 38. Як працюють `left`, `right`, `middle`

На початку:

    left = 0
    right = 6

    [10, 20, 30, 40, 50, 60, 70]
     ↑              ↑              ↑
    left          middle         right

`middle`:

    Math.floor((0 + 6) / 2)

    // 3

Значення:

    numbers[3]

    // 40

---

# 39. Якщо target більший за middle

Маємо:

    middleValue = 40
    target = 50

Оскільки:

    50 > 40

ліва половина більше не потрібна.

Тому:

    left = middle + 1;

Отримуємо:

    left = 4

---

# 40. Якщо target менший за middle

Маємо:

    middleValue = 40
    target = 20

Оскільки:

    20 < 40

права половина більше не потрібна.

Тому:

    right = middle - 1;

---

# 41. Binary Search покроково

Масив:

    [10, 20, 30, 40, 50, 60, 70]

Шукаємо:

    60

### Крок 1

    middle = 40

    60 > 40

Залишається:

    [50, 60, 70]

### Крок 2

    middle = 60

    FOUND

---

# 42. Складність Binary Search

Для відсортованого масиву:

    Time Complexity: O(log n)

Додаткова пам'ять для ітеративної реалізації:

    Space Complexity: O(1)

Це одна з найважливіших ідей алгоритмів пошуку.

---

# 43. Чому `O(log n)` швидко

Уявімо:

    n = 1,000,000

Linear Search у найгіршому випадку:

    ~1,000,000 перевірок

Binary Search:

    приблизно log₂(1,000,000)

    ≈ 20 перевірок

Тому відсортовані дані можуть давати величезну перевагу.

---

# 44. Але є важлива умова

Binary Search не означає:

> "Завжди використовуй binary search."

Потрібно враховувати:

- чи дані відсортовані;
- чи підтримується цей порядок;
- скільки разів виконується пошук;
- чи коштує сортування більше, ніж сам пошук.

---

# 45. Сортування перед пошуком

Маємо невідсортований масив:

    [40, 10, 70, 20, 50]

Можна зробити:

    sort()

а потім:

    binarySearch()

Але сортування саме по собі має вартість.

Тому не можна просто сказати:

> "Binary Search швидший, тому завжди спочатку відсортуємо."

Потрібно врахувати всю задачу.

---

# 46. Linear Search vs Binary Search

| Характеристика | Linear Search | Binary Search |
|---|---|---|
| Потрібне сортування | ні | так |
| Принцип | послідовна перевірка | ділення області навпіл |
| Середня ідея | простота | ефективність |
| Worst Case | `O(n)` | `O(log n)` |
| Складність реалізації | низька | вища |
| Невідсортовані дані | так | ні |
| Великі відсортовані дані | повільніше | ефективно |

---

# 47. Пошук першого входження в Binary Search

У простому binary search ми знаходимо **будь-яке** входження.

Але задача може звучати:

> Знайти перший індекс значення `5`.

Маємо:

    [1, 2, 5, 5, 5, 8, 10]

Потрібно:

    2

а не:

    3
    або
    4

Це вже модифікований Binary Search.

---

# 48. Пошук першого входження

Одна з реалізацій:

    function findFirst(numbers, target) {
      let left = 0;
      let right = numbers.length - 1;
      let result = -1;

      while (left <= right) {
        const middle = Math.floor(
          (left + right) / 2
        );

        if (numbers[middle] === target) {
          result = middle;
          right = middle - 1;
        } else if (numbers[middle] < target) {
          left = middle + 1;
        } else {
          right = middle - 1;
        }
      }

      return result;
    }

---

# 49. Чому після знаходження продовжуємо пошук

Маємо:

    [1, 2, 5, 5, 5, 8, 10]
         ↑

Ми знайшли `5`.

Але можливо, ліворуч є ще один `5`.

Тому:

    result = middle;
    right = middle - 1;

Ми продовжуємо пошук ліворуч.

---

# 50. Пошук останнього входження

Аналогічна задача:

> Знайти останній індекс `5`.

Для:

    [1, 2, 5, 5, 5, 8, 10]

результат:

    4

Після знаходження потрібно продовжити пошук праворуч:

    left = middle + 1;

---

# 51. Lower Bound

Більш загальна задача:

> Знайти першу позицію, де значення не менше за `target`.

Наприклад:

    [1, 3, 5, 7, 9]

Шукаємо:

    6

Позиція:

    3

тому що:

    numbers[3] === 7

і:

    7 >= 6

Це один із важливих варіантів Binary Search.

---

# 52. Upper Bound

Задача:

> Знайти першу позицію, де значення строго більше за `target`.

Для:

    [1, 3, 5, 5, 5, 8]

і:

    target = 5

upper bound:

    5

Тобто індекс першого:

    8

Ці поняття часто зустрічаються у складніших алгоритмічних задачах.

---

# 53. Пошук у відсортованому масиві об'єктів

Наприклад:

    const users = [
      { id: 10, name: "Anna" },
      { id: 20, name: "John" },
      { id: 30, name: "Kate" }
    ];

Якщо `id` відсортовані, можна реалізувати binary search за:

    user.id

Але потрібно писати алгоритм з урахуванням поля об'єкта:

    users[middle].id

---

# 54. Binary Search для об'єктів

    function findUserById(users, targetId) {
      let left = 0;
      let right = users.length - 1;

      while (left <= right) {
        const middle = Math.floor(
          (left + right) / 2
        );

        const id = users[middle].id;

        if (id === targetId) {
          return users[middle];
        }

        if (id < targetId) {
          left = middle + 1;
        } else {
          right = middle - 1;
        }
      }

      return undefined;
    }

---

# 55. Важлива умова для об'єктів

Цей алгоритм працює тільки якщо:

    users

відсортований за:

    id

Наприклад:

    10
    20
    30
    40
    50

Якщо порядок:

    30
    10
    50
    20
    40

binary search за `id` не працюватиме правильно.

---

# 56. Search Space

У Binary Search важливо думати не просто:

> "Шукаємо в масиві."

А:

> "Яка зараз область пошуку?"

Спочатку:

    [0 ---------------- n - 1]

Після першого кроку:

    [0 ------ middle - 1]
                  X
             middle + 1 ------ n - 1

Після кожного кроку область зменшується.

---

# 57. Binary Search — це не тільки масив

Це важлива ідея.

Binary Search можна застосовувати, якщо є:

1. впорядкований простір;
2. можливість перевірити середню точку;
3. можливість сказати:
   - шукаємо ліворуч;
   - або шукаємо праворуч.

Тому binary search може працювати не лише з готовим масивом.

---

# 58. Binary Search on Answer

Більш просунутий патерн:

> Binary Search по можливій відповіді.

Наприклад, ми не шукаємо конкретне число в масиві.

Ми шукаємо:

> мінімальне значення, при якому певна умова стає `true`.

Схема:

    false false false false true true true
                         ↑
                     answer

Це вже наступний рівень алгоритмічного мислення.

---

# 59. Monotonic Condition

Для Binary Search on Answer потрібна умова, яка має монотонну поведінку.

Наприклад:

    false
    false
    false
    true
    true
    true

або:

    true
    true
    true
    false
    false
    false

Ми шукаємо межу між двома станами.

---

# 60. Пошук у рядку

Searching стосується не тільки масивів.

Наприклад:

    const text = "JavaScript is powerful";

Перевірити наявність:

    text.includes("JavaScript");

    // true

Знайти позицію:

    text.indexOf("powerful");

---

# 61. `startsWith()`

Перевірити початок:

    const url = "https://example.com";

    url.startsWith("https://");

    // true

---

# 62. `endsWith()`

Перевірити кінець:

    const filename = "photo.jpg";

    filename.endsWith(".jpg");

    // true

---

# 63. Пошук без урахування регістру

Маємо:

    const text = "JavaScript";

Потрібно знайти:

    "javascript"

Простий варіант:

    text.toLowerCase().includes("javascript");

Результат:

    true

---

# 64. Пошук у масиві без урахування регістру

    const names = [
      "Anna",
      "John",
      "Kate"
    ];

    const target = "john";

    const user = names.find((name) => {
      return name.toLowerCase() === target.toLowerCase();
    });

---

# 65. Нормалізація перед пошуком

Перед пошуком іноді потрібно привести дані до єдиного формату.

Наприклад:

    const normalized = value
      .trim()
      .toLowerCase();

Після цього:

    search(normalized);

Це особливо корисно для:

- form input;
- search fields;
- usernames;
- email;
- tags;
- API data.

---

# 66. Пошук за частиною рядка

    const products = [
      "JavaScript Book",
      "TypeScript Guide",
      "React Course"
    ];

Знайти товари, що містять:

    "script"

    const result = products.filter((product) => {
      return product
        .toLowerCase()
        .includes("script");
    });

Результат:

    [
      "JavaScript Book",
      "TypeScript Guide"
    ]

---

# 67. Search vs Filter

Це важлива різниця.

### Search

Потрібен один результат:

    find()

### Filter

Потрібні всі відповідні результати:

    filter()

Наприклад:

    users.find(user => user.id === 5);

проти:

    users.filter(user => user.age >= 18);

---

# 68. Пошук одного vs всіх

Маємо:

    [10, 20, 10, 30, 10]

Пошук першого:

    indexOf(10);

Результат:

    0

Пошук останнього:

    lastIndexOf(10);

Результат:

    4

Пошук усіх:

    filter(number => number === 10);

Результат:

    [10, 10, 10]

---

# 69. Пошук усіх індексів

Якщо потрібні всі позиції:

    function findAllIndexes(numbers, target) {
      const indexes = [];

      for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === target) {
          indexes.push(i);
        }
      }

      return indexes;
    }

    findAllIndexes(
      [10, 20, 10, 30, 10],
      10
    );

    // [0, 2, 4]

---

# 70. Пошук у вкладених масивах

Маємо:

    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];

Пошук `5` потребує двох рівнів:

    for (const row of matrix) {
      for (const number of row) {
        if (number === 5) {
          console.log("Found");
        }
      }
    }

Це приклад пошуку в двовимірній структурі.

---

# 71. Пошук у матриці

З індексами:

    function findInMatrix(matrix, target) {
      for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
          if (matrix[row][col] === target) {
            return [row, col];
          }
        }
      }

      return [-1, -1];
    }

    findInMatrix(
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ],
      5
    );

    // [1, 1]

---

# 72. Пошук у масиві об'єктів за текстом

Наприклад:

    const products = [
      { id: 1, name: "JavaScript Book" },
      { id: 2, name: "React Course" },
      { id: 3, name: "Node.js Guide" }
    ];

Пошук:

    const query = "react";

    const results = products.filter((product) => {
      return product.name
        .toLowerCase()
        .includes(query.toLowerCase());
    });

---

# 73. Реальний Full Stack сценарій

Backend повертає:

    [
      {
        "id": 1,
        "name": "Anna"
      },
      {
        "id": 2,
        "name": "John"
      }
    ]

Frontend отримує:

    const users = await response.json();

Потрібно знайти користувача:

    const user = users.find((user) => {
      return user.id === 2;
    });

Це звичайний Searching у реальному застосунку.

---

# 74. Search у базі даних vs Search у JavaScript

Це дуже важливе Full Stack розмежування.

Якщо база має:

    1 000 000 users

не потрібно бездумно передавати всіх користувачів у frontend:

    Database
        ↓
    1,000,000 rows
        ↓
    JSON
        ↓
    Browser
        ↓
    find()

Краще виконувати пошук там, де це логічно:

    Browser
        ↓
    API
        ↓
    Database
        ↓
    SQL query

Наприклад:

    SELECT *
    FROM users
    WHERE id = $1;

---

# 75. SQL Search

У SQL пошук часто виконується через:

    WHERE

Наприклад:

    SELECT *
    FROM users
    WHERE id = 10;

Або:

    SELECT *
    FROM users
    WHERE name = 'John';

Або:

    SELECT *
    FROM products
    WHERE price > 100;

Це вже пошук на рівні бази даних.

---

# 76. Індекси бази даних

Коли база стає великою, важливим стає поняття:

    Database Index

Індекс допомагає базі швидше знаходити записи.

Концептуально:

    Table
      ↓
    Index
      ↓
    Faster lookup

Це не те саме, що JavaScript `Array.indexOf()`.

Але загальна ідея одна:

> правильно організувати дані для ефективного пошуку.

---

# 77. Пошук — це не завжди цикл

Пошук може використовувати:

    Array
    Set
    Map
    Binary Search
    Database Index
    Hash Table
    Tree
    Graph algorithms

Тому алгоритмічне питання:

> "Як знайти?"

часто насправді означає:

> "Яка структура даних найкраще підходить для цього пошуку?"

---

# 78. Порівняння основних підходів

| Підхід | Типова складність пошуку | Особливість |
|---|---:|---|
| `Array` linear search | `O(n)` | простий |
| `Set.has()` | `O(1)` average | унікальні значення |
| `Map.get()` | `O(1)` average | пошук за ключем |
| Binary Search | `O(log n)` | потрібен порядок |
| Database Index | залежить від індексу | пошук у БД |

Це спрощена навчальна модель; реальна продуктивність залежить від структури даних, engine та умов.

---

# 79. Коли використовувати `find()`

Використовуй `find()`, коли:

> потрібен перший елемент, який відповідає умові.

    const user = users.find((user) => {
      return user.id === 10;
    });

---

# 80. Коли використовувати `filter()`

Використовуй `filter()`, коли:

> потрібні всі елементи, які відповідають умові.

    const activeUsers = users.filter((user) => {
      return user.active;
    });

---

# 81. Коли використовувати `includes()`

Коли:

> потрібно просто перевірити конкретне значення.

    allowedRoles.includes(role);

---

# 82. Коли використовувати `Set`

Коли:

> потрібно багато разів швидко перевіряти наявність значення.

    const ids = new Set(userIds);

    ids.has(userId);

---

# 83. Коли використовувати `Map`

Коли:

> потрібен зв'язок `key → value`.

    const usersById = new Map();

    usersById.set(user.id, user);

Пошук:

    usersById.get(userId);

---

# 84. Коли використовувати Binary Search

Коли:

- дані впорядковані;
- можна визначити, в якій половині шукати;
- пошук виконується достатньо часто або масив великий;
- потрібен `O(log n)` пошук.

---

# 85. Типова помилка: Binary Search на невідсортованому масиві

Не можна просто написати:

    binarySearch(
      [40, 10, 70, 20, 50],
      50
    );

і очікувати правильного результату.

Binary Search використовує припущення про порядок даних.

Якщо це припущення порушене:

> алгоритм може повернути неправильний результат.

---

# 86. Типова помилка: неправильне оновлення меж

У Binary Search:

    left
    right
    middle

Після перевірки потрібно правильно рухати межу.

Якщо:

    numbers[middle] < target

то:

    left = middle + 1;

Якщо:

    numbers[middle] > target

то:

    right = middle - 1;

Важливо використовувати:

    + 1
    - 1

щоб не перевіряти ту саму позицію нескінченно.

---

# 87. Типова помилка: неправильна умова `while`

Звичайний варіант:

    while (left <= right) {
      // ...
    }

Якщо використати неправильну умову, можна:

- пропустити останній кандидат;
- отримати нескінченний цикл;
- неправильно обробити масив з одним елементом.

---

# 88. Edge Cases для Binary Search

Обов'язково перевір:

### Порожній масив

    []

### Один елемент — знайдений

    [5]

    target = 5

### Один елемент — не знайдений

    [5]

    target = 10

### Target на початку

    [1, 2, 3, 4, 5]

    target = 1

### Target в кінці

    target = 5

### Target відсутній

    target = 10

### Дублікати

    [1, 2, 2, 2, 5]

---

# 89. Пошук у відсортованому масиві з дублікати

Маємо:

    [1, 2, 2, 2, 5]

Звичайний Binary Search може повернути будь-який із:

    1
    2
    3

залежно від реалізації.

Якщо задача вимагає:

> перший `2`

потрібна модифікація алгоритму.

Якщо:

> останній `2`

потрібна інша модифікація.

---

# 90. Binary Search — iterative vs recursive

Binary Search можна написати через:

    while

або рекурсію:

    function binarySearch(numbers, target, left, right) {
      // ...
      return binarySearch(...);
    }

Для базового JavaScript практичніше спочатку добре освоїти **iterative version**.

Рекурсивний варіант можна розглядати після теми:

    09-recursion

---

# 91. Iterative Binary Search

Переважний базовий варіант:

    function binarySearch(numbers, target) {
      let left = 0;
      let right = numbers.length - 1;

      while (left <= right) {
        const middle = Math.floor(
          (left + right) / 2
        );

        if (numbers[middle] === target) {
          return middle;
        }

        if (numbers[middle] < target) {
          left = middle + 1;
        } else {
          right = middle - 1;
        }
      }

      return -1;
    }

Переваги:

- простий контроль меж;
- `O(1)` додаткова пам'ять;
- легко трасувати вручну.

---

# 92. Як трасувати алгоритм

Якщо не розумієш Binary Search, не дивись одразу на готовий код.

Візьми:

    [10, 20, 30, 40, 50, 60, 70]

і:

    target = 60

Запиши таблицю:

    left | right | middle | value
    --------------------------------
     0   |   6   |   3    | 40
     4   |   6   |   5    | 60

Після цього:

    FOUND

Це дуже корисний спосіб навчання алгоритмів.

---

# 93. Ще один приклад трасування

Маємо:

    [2, 4, 6, 8, 10, 12, 14, 16]

Шукаємо:

    2

### Крок 1

    left = 0
    right = 7
    middle = 3

    numbers[3] = 8

    2 < 8

Тому:

    right = 2

### Крок 2

    left = 0
    right = 2
    middle = 1

    numbers[1] = 4

    2 < 4

Тому:

    right = 0

### Крок 3

    middle = 0

    numbers[0] = 2

    FOUND

---

# 94. Практична задача: знайти перший елемент

Задача:

> Знайти перший елемент, більший за `target`.

Для:

    [1, 3, 5, 7, 9]

і:

    target = 5

результат:

    7

Це вже хороший місток до:

- Binary Search;
- Lower Bound;
- Upper Bound.

---

# 95. Практична задача: знайти позицію вставки

Маємо:

    [1, 3, 5, 7]

Потрібно вставити:

    6

Позиція:

    3

Отримаємо:

    [1, 3, 5, 6, 7]

Такі задачі часто розв'язуються модифікованим Binary Search.

---

# 96. Пошук у відсортованих даних

Важливе правило:

> Якщо дані відсортовані, завжди подумай про Binary Search.

Але не обов'язково використовуй його.

Постав питання:

1. Наскільки великий масив?
2. Скільки пошуків буде?
3. Чи дані вже відсортовані?
4. Чи змінюються дані?
5. Чи потрібно зберігати порядок?
6. Чи можна використовувати `Set` або `Map`?

---

# 97. Пошук і вибір структури даних

Дуже важливе алгоритмічне мислення.

### Потрібен порядок та індекси

    Array

### Потрібна унікальність

    Set

### Потрібен `key → value`

    Map

### Потрібен пошук у відсортованому масиві

    Binary Search

### Потрібен пошук у великій БД

    Database Index

---

# 98. Практичні задачі — Beginner

## 1. Linear Search

Написати:

    linearSearch(numbers, target)

Приклад:

    linearSearch([10, 20, 30], 20);

Результат:

    1

---

## 2. Пошук значення

Написати:

    findNumber(numbers, target)

Результат:

    number

або:

    undefined

---

## 3. Перевірка наявності

Написати:

    contains(numbers, target)

Результат:

    true / false

---

## 4. Знайти перший парний

    findFirstEven([1, 3, 5, 8, 10]);

Результат:

    8

---

## 5. Знайти перший позитивний

    findFirstPositive([-5, -2, 0, 4, 8]);

Результат:

    4

---

# 99. Практичні задачі — Junior

## 6. Пошук користувача

    findUserById(users, id)

---

## 7. Пошук товару

    findProductById(products, id)

---

## 8. Знайти всі збіги

    findAllIndexes(numbers, target)

---

## 9. Знайти останній збіг

    findLastIndex(numbers, target)

---

## 10. Пошук без урахування регістру

    findName(names, target)

---

## 11. Пошук за частиною назви

    searchProducts(products, query)

---

# 100. Практичні задачі — Junior+

## 12. Linear Search

Написати власний алгоритм без:

    find()
    findIndex()
    includes()
    indexOf()

---

## 13. Binary Search

Написати:

    binarySearch(numbers, target)

---

## 14. Перший збіг у відсортованому масиві

    findFirst(numbers, target)

---

## 15. Останній збіг

    findLast(numbers, target)

---

## 16. Position to insert

Знайти правильну позицію для вставки значення.

---

## 17. First greater

Знайти перший елемент:

    > target

---

## 18. First greater or equal

Знайти перший елемент:

    >= target

---

# 101. Практичні задачі — Middle

На наступному рівні:

- Binary Search variations;
- Lower Bound;
- Upper Bound;
- Search Space;
- Binary Search on Answer;
- пошук у матрицях;
- пошук у rotated sorted array;
- пошук піку;
- пошук у структурах даних;
- оптимізація пошуку;
- комбінування Binary Search з іншими патернами.

---

# 102. Search у rotated sorted array

Наприклад:

    [4, 5, 6, 7, 0, 1, 2]

Це масив, який був відсортований, а потім повернутий.

Пошук:

    target = 0

Це вже складніша задача.

Звичайний Binary Search без адаптації не завжди працює.

Потрібно визначати, яка половина залишається впорядкованою.

---

# 103. Пошук піку

Маємо:

    [1, 3, 5, 7, 6, 4, 2]

Пік:

    7

Це ще один приклад задачі, де Binary Search може використовуватися не для пошуку конкретного значення, а для пошуку позиції, яка відповідає певній властивості.

---

# 104. Binary Search як спосіб мислення

Не запам'ятовуй лише:

    left
    right
    middle

Запам'ятай основну ідею:

> Якщо після перевірки я можу гарантовано відкинути частину можливих відповідей, можливо, я можу використати Binary Search.

Це значно важливіше за механічне запам'ятовування коду.

---

# 105. Brute Force vs Optimized Search

Приклад:

> Знайти чи існує пара чисел із заданою сумою.

Brute Force:

    for (...)
      for (...)

Складність:

    O(n²)

Оптимізований підхід через `Set` / `Map`:

    O(n)

Типовий алгоритмічний перехід:

    Просте правильне рішення
              ↓
        оцінка складності
              ↓
        пошук bottleneck
              ↓
        структура даних
              ↓
        оптимізоване рішення

---

# 106. Search та Frequency Counter

Якщо потрібно багато разів перевіряти:

> Скільки разів зустрічається значення?

можна використати:

    Map

Наприклад:

    const frequency = new Map();

    for (const number of numbers) {
      frequency.set(
        number,
        (frequency.get(number) ?? 0) + 1
      );
    }

Потім:

    frequency.get(10);

Це вже швидший доступ до інформації, яку ми заздалегідь підготували.

Детально:

    06-frequency-counter

---

# 107. Search та Two Pointers

Деякі задачі пошуку вимагають одночасно рухати:

    left
    right

Наприклад:

    [1, 2, 3, 4, 5]
     ↑           ↑

Це не Binary Search.

Це інший алгоритмічний патерн:

    Two Pointers

Детально:

    07-two-pointers

---

# 108. Search та Sliding Window

Якщо потрібно шукати щось у послідовних діапазонах:

    [1, 2, 3, 4, 5, 6]
     └─────┘

може використовуватися:

    Sliding Window

Детально:

    08-sliding-window

---

# 109. Search та Sorting

Sorting і Searching дуже тісно пов'язані.

Без сортування:

    Linear Search
    O(n)

Після сортування:

    Binary Search
    O(log n)

Але сортування теж коштує:

    O(n log n)

Тому завжди оцінюй повний алгоритм.

---

# 110. Search Pipeline

Для великої задачі може бути:

    Raw Data
       ↓
    Normalize
       ↓
    Sort / Index
       ↓
    Search Structure
       ↓
    Query
       ↓
    Result

У Full Stack:

    Database
       ↓
    SQL / Index
       ↓
    Backend
       ↓
    API
       ↓
    Frontend Search
       ↓
    UI

---

# 111. Common Mistakes

## Помилка 1 — Binary Search без сортування

    binarySearch([5, 1, 8, 2], 8);

Не можна припускати, що це працюватиме.

---

## Помилка 2 — плутати `find()` та `filter()`

`find()`:

    один елемент

`filter()`:

    масив елементів

---

## Помилка 3 — плутати `includes()` та `indexOf()`

`includes()`:

    true / false

`indexOf()`:

    index / -1

---

## Помилка 4 — забути `-1`

Пошукові функції часто використовують:

    -1

для:

    "not found"

---

## Помилка 5 — нескінченний Binary Search

Наприклад, неправильно оновлювати:

    left
    right

і постійно залишати ту саму область.

Потрібно переконатися, що кожна ітерація зменшує search space.

---

# 112. Як перевірити Binary Search

Створи окремі тести:

    binarySearch([], 5);
    // -1

    binarySearch([5], 5);
    // 0

    binarySearch([5], 10);
    // -1

    binarySearch([1, 2, 3, 4, 5], 1);
    // 0

    binarySearch([1, 2, 3, 4, 5], 5);
    // 4

    binarySearch([1, 2, 3, 4, 5], 3);
    // 2

    binarySearch([1, 2, 3, 4, 5], 10);
    // -1

---

# 113. Порівняння алгоритмів

Маємо масив:

    [1, 2, 3, ..., 1_000_000]

### Linear Search

У найгіршому випадку:

    1,000,000 перевірок

### Binary Search

Приблизно:

    20 перевірок

Але:

> Binary Search можливий тільки тому, що масив має потрібну структуру — він відсортований.

---

# 114. Головна ідея Searching

Пошук — це не просто:

    find()

або:

    indexOf()

Потрібно розуміти рівні.

### Рівень 1

    includes()
    indexOf()
    find()

### Рівень 2

    Linear Search

### Рівень 3

    Set
    Map

### Рівень 4

    Binary Search

### Рівень 5

    Search patterns
    Lower Bound
    Upper Bound
    Search on Answer

---

# 115. Міні-шпаргалка

## Простий пошук

    array.includes(value)

## Індекс

    array.indexOf(value)

## Останній індекс

    array.lastIndexOf(value)

## Пошук елемента

    array.find(callback)

## Пошук індексу

    array.findIndex(callback)

## Пошук усіх

    array.filter(callback)

## Перевірити хоча б один

    array.some(callback)

## Унікальний пошук

    set.has(value)

## Пошук за ключем

    map.get(key)

## Binary Search

    left
    right
    middle

---

# 116. Binary Search Cheat Sheet

    function binarySearch(numbers, target) {
      let left = 0;
      let right = numbers.length - 1;

      while (left <= right) {
        const middle = Math.floor(
          (left + right) / 2
        );

        if (numbers[middle] === target) {
          return middle;
        }

        if (numbers[middle] < target) {
          left = middle + 1;
        } else {
          right = middle - 1;
        }
      }

      return -1;
    }

Головна формула:

    sorted data
         ↓
    left / right
         ↓
      middle
         ↓
    compare
         ↓
    discard half
         ↓
    repeat

---

# 117. Питання для співбесіди

### Базові

1. Що таке Linear Search?
2. Яка складність Linear Search?
3. Що повертає `find()`?
4. Що повертає `findIndex()`?
5. Чим `find()` відрізняється від `filter()`?
6. Чим `includes()` відрізняється від `indexOf()`?
7. Для чого `lastIndexOf()`?
8. Що робить `some()`?
9. Що робить `every()`?

---

# 118. Питання про структури даних

10. Коли краще використовувати `Set`, а не `Array`?
11. Коли використовувати `Map`?
12. Яка типова складність `Set.has()`?
13. Яка типова складність `Map.get()`?
14. Чому структура даних впливає на пошук?
15. Чому не завжди потрібно використовувати `Array.find()`?

---

# 119. Питання про Binary Search

16. Що таке Binary Search?
17. Яка його часова складність?
18. Чому він працює швидше за Linear Search?
19. Чому масив повинен бути відсортований?
20. Що таке `left`, `right`, `middle`?
21. Що відбувається, якщо `target > numbers[middle]`?
22. Що відбувається, якщо `target < numbers[middle]`?
23. Що повертає алгоритм, якщо елемент не знайдено?
24. Чим відрізняється пошук першого та будь-якого входження?
25. Що таке Lower Bound?
26. Що таке Upper Bound?

---

# 120. Алгоритмічні питання

27. Як знайти всі входження елемента?
28. Як знайти перше входження?
29. Як знайти останнє входження?
30. Як знайти перший елемент, більший за `target`?
31. Як знайти позицію вставки?
32. Як перевірити наявність дублікатів?
33. Як оптимізувати багаторазовий пошук?
34. Коли варто створити `Set`?
35. Коли варто створити `Map`?
36. Коли варто відсортувати дані?

---

# 121. Рівень Core JavaScript

Потрібно впевнено знати:

- `find()`;
- `findIndex()`;
- `filter()`;
- `includes()`;
- `indexOf()`;
- `lastIndexOf()`;
- `some()`;
- `every()`;
- `Set`;
- `Map`;
- `Array`.

---

# 122. Рівень Junior

Потрібно вміти:

- написати Linear Search;
- знайти індекс;
- знайти перший збіг;
- знайти всі збіги;
- знайти об'єкт;
- шукати за умовою;
- шукати без урахування регістру;
- використовувати `Set`;
- використовувати `Map`;
- пояснити `O(n)`.

---

# 123. Рівень Junior+

Потрібно розуміти:

- Binary Search;
- `O(log n)`;
- sorted data;
- search space;
- `left`;
- `right`;
- `middle`;
- first occurrence;
- last occurrence;
- insertion position;
- Lower Bound;
- Upper Bound.

---

# 124. Рівень Middle

Поступово:

- Binary Search variations;
- rotated sorted arrays;
- peak finding;
- Search on Answer;
- monotonic predicates;
- складніші структури даних;
- оптимізація пошуку;
- поєднання Searching з:
  - Two Pointers;
  - Sliding Window;
  - Frequency Counter;
  - Sorting.

---

# 125. Як розв'язувати Search Problem

Коли бачиш задачу, постав питання:

### 1. Що шукаємо?

    value
    index
    object
    boolean
    position

### 2. Чи потрібно знайти один результат?

    find()

### 3. Чи всі результати?

    filter()

### 4. Чи лише наявність?

    includes()
    Set.has()

### 5. Чи дані відсортовані?

    Так → подумати про Binary Search.

### 6. Чи пошук повторюється багато разів?

    Set
    Map
    Index
    Search structure

### 7. Яка складність?

    O(n)
    O(log n)
    O(1) average

---

# 126. Головна схема мислення

    SEARCH PROBLEM
          ↓
    Що потрібно повернути?
          ↓
    Один чи всі результати?
          ↓
    Дані відсортовані?
          ↓
      ┌───┴───┐
     Ні       Так
      ↓        ↓
    Linear   Binary
    Search   Search?
      ↓        ↓
    Set / Map?
          ↓
      Complexity
          ↓
      Edge Cases
          ↓
        Tests

---

# 127. Search у Full Stack

Для твого Full Stack JavaScript шляху особливо важливо бачити три різні рівні пошуку.

## Рівень 1 — JavaScript

    users.find(user => user.id === id)

## Рівень 2 — Backend / API

    GET /api/users/:id

## Рівень 3 — Database

    SELECT *
    FROM users
    WHERE id = $1;

Тобто:

    UI
      ↓
    API
      ↓
    Backend
      ↓
    SQL
      ↓
    Database

Не потрібно завантажувати всю таблицю в браузер лише для того, щоб виконати:

    find()

якщо пошук природно можна виконати на backend/database.

---

# 128. Searching та продуктивність

Можна мислити так:

### Малий масив

    Array.find()

цілком нормально.

### Багато перевірок

    Set

або:

    Map

може бути кращим.

### Великий відсортований масив

    Binary Search

може бути кращим.

### Велика база даних

    SQL
    +
    Database Index

може бути правильним рівнем для пошуку.

---

# 129. Фінальний чекліст

Перед переходом до наступних алгоритмічних тем я повинен вміти:

- [ ] пояснити, що таке Searching;
- [ ] написати Linear Search;
- [ ] пояснити `O(n)`;
- [ ] використовувати `find()`;
- [ ] використовувати `findIndex()`;
- [ ] використовувати `includes()`;
- [ ] використовувати `indexOf()`;
- [ ] використовувати `lastIndexOf()`;
- [ ] використовувати `some()`;
- [ ] відрізняти `find()` від `filter()`;
- [ ] шукати об'єкт у масиві;
- [ ] шукати за декількома умовами;
- [ ] знайти всі входження;
- [ ] використовувати `Set`;
- [ ] використовувати `Map`;
- [ ] пояснити, коли `Set` кращий за `Array`;
- [ ] пояснити, коли `Map` кращий за `Array`;
- [ ] пояснити Binary Search;
- [ ] написати Binary Search;
- [ ] пояснити `left`, `right`, `middle`;
- [ ] пояснити `O(log n)`;
- [ ] знати, чому Binary Search потребує впорядкованих даних;
- [ ] обробляти порожній масив;
- [ ] обробляти один елемент;
- [ ] обробляти відсутній target;
- [ ] працювати з дублікати;
- [ ] розуміти first/last occurrence;
- [ ] розуміти insertion position;
- [ ] знати базову ідею Lower Bound / Upper Bound;
- [ ] оцінювати повну вартість сортування + пошуку;
- [ ] розуміти, що пошук у БД і пошук у JavaScript — різні рівні задачі.

---

# Підсумок

**Searching** вчить не просто знаходити значення, а вибирати правильний спосіб пошуку залежно від структури даних.

Початковий рівень:

    find()
    findIndex()
    includes()
    indexOf()

Потім:

    Linear Search
        O(n)

Далі:

    Set
    Map
        O(1) average

І наступний важливий крок:

    Sorted Data
        ↓
    Binary Search
        ↓
    O(log n)

Але головна навичка — не запам'ятати код Binary Search.

Головна навичка:

> **Побачити властивості даних і зрозуміти, який алгоритм пошуку буде доречним.**

Для Full Stack JavaScript це переходить у практичну схему:

    Array
      ↓
    Search
      ↓
    Set / Map
      ↓
    Sorting
      ↓
    Binary Search
      ↓
    Database Index
      ↓
    Efficient API / Backend