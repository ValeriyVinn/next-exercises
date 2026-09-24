# 05. Sorting

## Вступ

**Sorting** — це впорядкування набору даних за певним правилом.

Найпростіший приклад:

    const numbers = [5, 2, 8, 1, 3];

    // Після сортування:
    [1, 2, 3, 5, 8]

Сортування — одна з базових задач алгоритмів.

Вона важлива не тільки сама по собі. Відсортовані дані дозволяють ефективніше виконувати інші операції:

- Searching
- Binary Search
- пошук мінімуму/максимуму;
- пошук дублікатів;
- об'єднання даних;
- роботу з діапазонами;
- ranking;
- pagination;
- побудову статистики;
- підготовку даних для UI.

У JavaScript сортування часто виконується через:

    Array.prototype.sort()

Але для алгоритмів важливо розуміти не тільки `sort()`, а й **як працюють алгоритми сортування**.

---

# 1. Що потрібно розуміти в Sorting

Перед вивченням конкретних алгоритмів потрібно розрізняти:

- `ascending order` — за зростанням;
- `descending order` — за спаданням;
- `comparator` — правило порівняння;
- `in-place` — алгоритм змінює початковий масив;
- `stable sorting` — однакові елементи зберігають початковий взаємний порядок;
- `time complexity` — скільки операцій потрібно;
- `space complexity` — скільки додаткової пам'яті потрібно.

Наприклад:

    [1, 2, 3, 4, 5]

— ascending.

    [5, 4, 3, 2, 1]

— descending.

---

# 2. JavaScript `sort()`

## 2.1. Простий `sort()`

В JavaScript є вбудований метод:

    array.sort()

Але важлива особливість:

**за замовчуванням `sort()` сортує елементи як рядки.**

Наприклад:

    const numbers = [10, 2, 30, 5];

    numbers.sort();

Результат може бути:

    [10, 2, 30, 5]

Тому для чисел потрібно передавати comparator.

---

# 3. Comparator

Для чисел:

    numbers.sort((a, b) => a - b);

Ascending:

    const numbers = [5, 2, 8, 1, 3];

    numbers.sort((a, b) => a - b);

Результат:

    [1, 2, 3, 5, 8]

Descending:

    numbers.sort((a, b) => b - a);

Результат:

    [8, 5, 3, 2, 1]

---

# 4. Як працює comparator

Comparator отримує два елементи:

    (a, b)

Результат:

- `< 0` → `a` має бути перед `b`;
- `> 0` → `b` має бути перед `a`;
- `0` → порядок між ними не потрібно змінювати.

Наприклад:

    (a, b) => a - b

Якщо:

    a = 2
    b = 5

то:

    2 - 5 = -3

Отже:

    2 перед 5

Якщо:

    a = 8
    b = 3

то:

    8 - 3 = 5

Отже:

    3 перед 8

---

# 5. `sort()` змінює масив

Це важливо.

`sort()` сортує **початковий масив**.

    const numbers = [5, 2, 8, 1];

    numbers.sort((a, b) => a - b);

    console.log(numbers);

Результат:

    [1, 2, 5, 8]

---

## 5.1. Якщо потрібно зберегти оригінал

Можна створити копію:

    const sorted = [...numbers].sort((a, b) => a - b);

Або:

    const sorted = numbers.toSorted((a, b) => a - b);

`toSorted()` повертає новий масив і не змінює початковий.

---

# 6. Сортування рядків

Для простих рядків можна використовувати:

    const names = ["Olena", "Andrii", "Valeriy"];

    names.sort();

---

## 6.1. `localeCompare()`

Для більш коректного сортування тексту:

    const names = ["Olena", "Andrii", "Valeriy"];

    names.sort((a, b) => a.localeCompare(b));

---

## 6.2. Українські слова

    const words = ["яблуко", "груша", "банан", "апельсин"];

    words.sort((a, b) => a.localeCompare(b, "uk"));

---

# 7. Сортування об'єктів

Дуже поширена задача у реальних застосунках.

Маємо:

    const users = [
      { name: "Anna", age: 30 },
      { name: "Bob", age: 20 },
      { name: "John", age: 25 }
    ];

Сортуємо за віком:

    users.sort((a, b) => a.age - b.age);

Результат:

    [
      { name: "Bob", age: 20 },
      { name: "John", age: 25 },
      { name: "Anna", age: 30 }
    ]

---

## 7.1. За спаданням

    users.sort((a, b) => b.age - a.age);

---

## 7.2. За іменем

    users.sort((a, b) => a.name.localeCompare(b.name));

---

# 8. Чому потрібно знати алгоритми сортування

У реальному JavaScript-коді часто достатньо:

    array.sort((a, b) => a - b);

Але в алгоритмах потрібно розуміти:

- що відбувається всередині;
- як працює порівняння;
- скільки операцій виконується;
- які існують алгоритми;
- чим вони відрізняються;
- коли алгоритм використовує додаткову пам'ять;
- що таке stable / unstable sorting;
- чому один алгоритм може бути кращим для конкретного типу даних.

Основні алгоритми, які варто знати:

1. Bubble Sort
2. Selection Sort
3. Insertion Sort
4. Merge Sort
5. Quick Sort
6. Heap Sort
7. Counting Sort — як приклад non-comparison sorting

Для Junior-рівня найважливіше добре зрозуміти:

- Bubble Sort;
- Selection Sort;
- Insertion Sort;
- Merge Sort;
- Quick Sort;
- Big O для кожного.

---

# 9. Bubble Sort

## Ідея

**Bubble Sort** багато разів проходить по масиву та порівнює сусідні елементи.

Якщо вони стоять у неправильному порядку — міняємо їх місцями.

Наприклад:

    [5, 2, 8, 1]

Порівнюємо:

    5 > 2

міняємо:

    [2, 5, 8, 1]

Далі:

    5 < 8

залишаємо:

    [2, 5, 8, 1]

Далі:

    8 > 1

міняємо:

    [2, 5, 1, 8]

Найбільший елемент поступово "спливає" вправо.

Саме тому:

**Bubble Sort.**

---

# 10. Bubble Sort — реалізація

    function bubbleSort(array) {
      const result = [...array];

      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result.length - 1 - i; j++) {
          if (result[j] > result[j + 1]) {
            [result[j], result[j + 1]] = [result[j + 1], result[j]];
          }
        }
      }

      return result;
    }

---

## 10.1. Використання

    const numbers = [5, 2, 8, 1, 3];

    console.log(bubbleSort(numbers));

Результат:

    [1, 2, 3, 5, 8]

---

# 11. Bubble Sort — складність

| Case | Time |
|---|---:|
| Best | O(n) |
| Average | O(n²) |
| Worst | O(n²) |

Space:

    O(1)

якщо алгоритм працює без створення копії.

У наведеній вище реалізації створюється копія:

    const result = [...array];

тому саме ця реалізація використовує додатково:

    O(n)

---

## Запам'ятати

Bubble Sort:

- простий;
- легко реалізувати;
- добре підходить для навчання;
- погано масштабується;
- `O(n²)` у середньому та worst case.

У production-коді JavaScript зазвичай не потрібно писати Bubble Sort замість `sort()`.

---

# 12. Selection Sort

## Ідея

Selection Sort шукає мінімальний елемент у невідсортованій частині та ставить його на правильну позицію.

Наприклад:

    [5, 2, 8, 1, 3]

Шукаємо мінімум:

    1

Ставимо його на початок:

    [1, 2, 8, 5, 3]

Потім шукаємо мінімум серед:

    [2, 8, 5, 3]

Це:

    2

Далі:

    [1, 2, 8, 5, 3]

Потім:

    3

І так далі.

---

# 13. Selection Sort — реалізація

    function selectionSort(array) {
      const result = [...array];

      for (let i = 0; i < result.length; i++) {
        let minIndex = i;

        for (let j = i + 1; j < result.length; j++) {
          if (result[j] < result[minIndex]) {
            minIndex = j;
          }
        }

        [result[i], result[minIndex]] = [result[minIndex], result[i]];
      }

      return result;
    }

---

# 14. Selection Sort — складність

| Case | Time |
|---|---:|
| Best | O(n²) |
| Average | O(n²) |
| Worst | O(n²) |

Додаткова пам'ять для in-place реалізації:

    O(1)

---

## Запам'ятати

Selection Sort:

- шукає мінімум;
- ставить його на правильну позицію;
- проста логіка;
- `O(n²)`;
- корисний для розуміння алгоритмів, але не типовий вибір для великих масивів.

---

# 15. Insertion Sort

## Ідея

Insertion Sort будує відсортовану частину масиву поступово.

Аналогія — сортування карт у руці.

Наприклад:

    [5, 2, 8, 1, 3]

Вважаємо:

    [5]

вже відсортованим.

Беремо:

    2

і вставляємо перед `5`:

    [2, 5]

Беремо:

    8:

    [2, 5, 8]

Беремо:

    1:

    [1, 2, 5, 8]

Потім:

    3:

    [1, 2, 3, 5, 8]

---

# 16. Insertion Sort — реалізація

    function insertionSort(array) {
      const result = [...array];

      for (let i = 1; i < result.length; i++) {
        const current = result[i];

        let j = i - 1;

        while (j >= 0 && result[j] > current) {
          result[j + 1] = result[j];
          j--;
        }

        result[j + 1] = current;
      }

      return result;
    }

---

# 17. Insertion Sort — складність

| Case | Time |
|---|---:|
| Best | O(n) |
| Average | O(n²) |
| Worst | O(n²) |

Space:

    O(1)

для in-place реалізації.

---

## Важлива особливість

Insertion Sort може бути дуже ефективним для:

- маленьких масивів;
- майже відсортованих даних.

Наприклад:

    [1, 2, 3, 4, 5, 6, 8, 7]

Масив майже відсортований.

Insertion Sort може виконати відносно мало перестановок.

---

# 18. Порівняння простих алгоритмів

| Algorithm | Best | Average | Worst | Space |
|---|---:|---:|---:|---:|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |

Ці алгоритми важливо знати переважно для:

- навчання;
- алгоритмічних задач;
- interview questions.

---

# 19. Merge Sort

## Ідея

Merge Sort використовує підхід:

**Divide and Conquer**

Тобто:

1. ділимо масив;
2. сортуємо частини;
3. об'єднуємо відсортовані частини.

Наприклад:

    [8, 3, 5, 1]

Ділимо:

    [8, 3] [5, 1]

Ще раз:

    [8] [3] [5] [1]

Сортуємо:

    [3, 8]
    [1, 5]

Об'єднуємо:

    [1, 3, 5, 8]

---

# 20. Merge Sort — основна ідея

Найважливіша операція тут — **merge**.

Маємо два відсортовані масиви:

    [2, 5, 8]

і:

    [1, 3, 7]

Порівнюємо перші елементи:

    2 vs 1

Беремо `1`.

Потім:

    2 vs 3

Беремо `2`.

Потім:

    5 vs 3

Беремо `3`.

І так далі.

Результат:

    [1, 2, 3, 5, 7, 8]

---

# 21. Merge Sort — реалізація

    function merge(left, right) {
      const result = [];

      let i = 0;
      let j = 0;

      while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
      }

      return [
        ...result,
        ...left.slice(i),
        ...right.slice(j)
      ];
    }

    function mergeSort(array) {
      if (array.length <= 1) {
        return array;
      }

      const middle = Math.floor(array.length / 2);

      const left = mergeSort(array.slice(0, middle));
      const right = mergeSort(array.slice(middle));

      return merge(left, right);
    }

---

# 22. Merge Sort — складність

| Case | Time |
|---|---:|
| Best | O(n log n) |
| Average | O(n log n) |
| Worst | O(n log n) |

Додаткова пам'ять залежить від реалізації.

Для типової рекурсивної реалізації з масивами:

    O(n)

---

## Запам'ятати

Merge Sort:

- використовує Divide and Conquer;
- стабільно працює за `O(n log n)`;
- добре підходить для великих наборів даних;
- потребує додаткової пам'яті у типовій array-реалізації;
- є важливим алгоритмом для розуміння рекурсії та Divide and Conquer.

---

# 23. Quick Sort

## Ідея

Quick Sort також використовує:

**Divide and Conquer.**

Основна ідея:

1. вибрати `pivot`;
2. розділити елементи відносно pivot;
3. рекурсивно сортувати частини.

Наприклад:

    [7, 2, 9, 1, 5]

Вибираємо:

    pivot = 5

Розділяємо:

    [2, 1] 5 [7, 9]

Потім сортуємо ліву та праву частини.

---

# 24. Quick Sort — складність

| Case | Time |
|---|---:|
| Best | O(n log n) |
| Average | O(n log n) |
| Worst | O(n²) |

Space залежить від реалізації та глибини recursion.

У середньому Quick Sort може працювати дуже швидко.

Але вибір `pivot` має значення.

---

# 25. Pivot

`pivot` — елемент, відносно якого ми розділяємо дані.

Наприклад:

    [4, 2, 7, 1, 9]

Якщо:

    pivot = 7

то можемо отримати концептуально:

    [4, 2, 1] [7] [9]

Ліворуч:

    < 7

Праворуч:

    > 7

Конкретний алгоритм partition може реалізовувати це по-різному.

---

# 26. Найгірший випадок Quick Sort

Проблема виникає, якщо partition постійно ділить масив дуже нерівномірно.

Наприклад:

    [1, 2, 3, 4, 5, 6]

і pivot постійно стає крайнім елементом.

Тоді:

    n
    n - 1
    n - 2
    ...

і складність може стати:

    O(n²)

Тому існують різні стратегії вибору pivot.

---

# 27. Merge Sort vs Quick Sort

| Feature | Merge Sort | Quick Sort |
|---|---|---|
| Average | O(n log n) | O(n log n) |
| Worst | O(n log n) | O(n²) |
| Основна ідея | Divide + Merge | Divide + Partition |
| Додаткова пам'ять | зазвичай O(n) | залежить від реалізації |
| Рекурсія | так | так |
| Важливий для алгоритмів | так | так |

Не потрібно механічно запам'ятовувати, що один завжди "кращий".

Потрібно розуміти:

- характеристики;
- обмеження;
- структуру даних;
- реалізацію.

---

# 28. Heap Sort

Heap Sort базується на структурі даних:

**Heap**

Основна ідея:

1. побудувати heap;
2. знаходити максимум/мінімум;
3. переміщувати його на правильну позицію;
4. відновлювати heap.

Складність:

    Best:    O(n log n)
    Average: O(n log n)
    Worst:   O(n log n)

Класичний in-place варіант використовує:

    O(1)

додаткової пам'яті.

Для початкового рівня достатньо:

- знати назву;
- розуміти, що він використовує Heap;
- знати `O(n log n)`;
- знати, що Heap Sort пов'язаний з data structure Heap.

Детальніше Heap краще вивчати окремою темою Data Structures.

---

# 29. Comparison Sorting

Bubble, Selection, Insertion, Merge, Quick і Heap Sort належать до:

**Comparison-based sorting algorithms**

Тобто алгоритм визначає порядок через порівняння елементів.

Наприклад:

    a < b

або:

    a > b

---

# 30. Non-comparison Sorting

Існують алгоритми, які не порівнюють елементи безпосередньо.

Наприклад:

- Counting Sort;
- Radix Sort;
- Bucket Sort.

Вони використовують властивості самих даних.

---

# 31. Counting Sort

Counting Sort добре працює, коли маємо невеликий відомий діапазон цілих чисел.

Наприклад:

    [2, 1, 3, 2, 1, 0]

Можна порахувати кількість кожного числа:

    0 → 1
    1 → 2
    2 → 2
    3 → 1

Після цього відновити:

    [0, 1, 1, 2, 2, 3]

---

## 31.1. Коли Counting Sort корисний

Наприклад, якщо всі значення:

    0 ... 100

і масив містить мільйони таких значень.

Тоді використання діапазону може бути ефективним.

Але якщо маємо:

    1
    1000000000

то створювати структуру для всього діапазону недоцільно.

---

# 32. Sorting Stability

**Stable sorting** означає:

якщо два елементи мають однакове значення ключа, їхній взаємний порядок після сортування зберігається.

Наприклад:

    [
      { name: "Anna", age: 20 },
      { name: "Bob", age: 20 },
      { name: "John", age: 25 }
    ]

Сортуємо за `age`.

Якщо сортування stable:

    Anna 20
    Bob 20
    John 25

Anna залишилася перед Bob.

---

# 33. Чому Stability важлива

У реальних системах часто сортують об'єкти за кількома критеріями.

Наприклад:

1. спочатку за містом;
2. потім за віком.

Stable sorting дозволяє зберегти попередній порядок для елементів з однаковим новим ключем.

Це особливо важливо для:

- таблиць;
- списків;
- ranking;
- UI;
- database results;
- data processing.

---

# 34. In-place Sorting

**In-place** означає, що алгоритм використовує сам початковий масив для перестановки елементів і не потребує великої додаткової структури даних.

Наприклад:

    [5, 2, 8, 1]

може перетворитися без створення нового масиву:

    [1, 2, 5, 8]

---

## Запам'ятати

In-place:

    мало додаткової пам'яті

але:

**in-place не означає автоматично O(1) total memory.**

Наприклад, рекурсивний алгоритм може мати додатковий call stack.

---

# 35. Sorting + Searching

Sorting часто використовується перед Searching.

Наприклад:

    const numbers = [8, 3, 5, 1, 9, 2];

Спочатку:

    numbers.sort((a, b) => a - b);

Отримуємо:

    [1, 2, 3, 5, 8, 9]

Тепер можемо використовувати:

**Binary Search**

і отримати:

    O(log n)

для пошуку елемента в уже відсортованому масиві.

---

# 36. Важлива деталь: sorting теж коштує часу

Не можна просто сказати:

> Binary Search завжди O(log n), тому він кращий.

Якщо масив спочатку не відсортований:

    [8, 3, 5, 1, 9, 2]

потрібно спочатку відсортувати його.

Наприклад:

    Sorting: O(n log n)

після цього:

    Binary Search: O(log n)

Загальна одноразова операція:

    O(n log n)

Тому важливо враховувати **повний алгоритм**, а не тільки одну його частину.

---

# 37. Sorting vs Searching

Не плутати:

### Searching

Шукаємо елемент.

    [1, 3, 5, 8]

Шукаємо:

    5

### Sorting

Змінюємо порядок елементів.

    [5, 1, 8, 3]

отримуємо:

    [1, 3, 5, 8]

---

# 38. Sorting vs Filtering

`filter()` не сортує.

    const numbers = [5, 2, 8, 1, 3];

    const result = numbers.filter(number => number > 3);

Результат:

    [5, 8]

Порядок елементів залишився відносно початкового масиву.

`sort()` змінює порядок:

    [1, 2, 3, 5, 8]

---

# 39. Sorting vs `find()`

`find()` шукає перший відповідний елемент:

    const numbers = [5, 2, 8, 1, 3];

    const result = numbers.find(number => number > 4);

Результат:

    5

Sorting:

    numbers.sort((a, b) => a - b);

Результат:

    [1, 2, 3, 5, 8]

Це різні задачі.

---

# 40. Сортування об'єктів у реальному застосунку

Наприклад:

    const products = [
      { name: "Phone", price: 800 },
      { name: "Mouse", price: 30 },
      { name: "Keyboard", price: 100 }
    ];

Сортування за ціною:

    const sortedProducts = [...products]
      .sort((a, b) => a.price - b.price);

Результат:

    [
      { name: "Mouse", price: 30 },
      { name: "Keyboard", price: 100 },
      { name: "Phone", price: 800 }
    ]

---

# 41. Сортування за кількома полями

Наприклад:

    const users = [
      { name: "Anna", age: 30 },
      { name: "Bob", age: 20 },
      { name: "John", age: 30 }
    ];

Спочатку сортуємо за віком.

Якщо вік однаковий — за іменем.

    users.sort((a, b) => {
      const ageDifference = a.age - b.age;

      if (ageDifference !== 0) {
        return ageDifference;
      }

      return a.name.localeCompare(b.name);
    });

---

# 42. Ascending / Descending як параметр

Можна створити функцію:

    function sortByAge(users, direction = "asc") {
      return [...users].sort((a, b) => {
        return direction === "asc"
          ? a.age - b.age
          : b.age - a.age;
      });
    }

Використання:

    sortByAge(users, "asc");

або:

    sortByAge(users, "desc");

---

# 43. Sorting у Frontend

У UI часто потрібно сортувати:

- товари за ціною;
- користувачів за ім'ям;
- записи за датою;
- результати за рейтингом;
- повідомлення за часом.

Наприклад:

    const sortedUsers = [...users]
      .sort((a, b) => a.name.localeCompare(b.name));

Після цього результат можна відобразити через React або звичайний DOM.

---

# 44. Sorting у Backend

На backend сортування може виконуватися:

- у JavaScript;
- у database.

Наприклад, Node.js отримав:

    const users = await getUsers();

Після цього:

    users.sort((a, b) => a.age - b.age);

Але якщо даних багато, часто краще доручити сортування database.

---

# 45. Sorting у PostgreSQL

SQL має:

    ORDER BY

Наприклад:

    SELECT *
    FROM users
    ORDER BY age ASC;

За спаданням:

    SELECT *
    FROM users
    ORDER BY age DESC;

---

# 46. `ORDER BY` за кількома полями

Наприклад:

    SELECT *
    FROM users
    ORDER BY age ASC, name ASC;

Спочатку:

    age

Потім для однакового `age`:

    name

Це дуже схоже на comparator у JavaScript.

---

# 47. Sorting і Database Index

У великих базах даних важливу роль відіграють:

**indexes**

Наприклад, якщо часто потрібно:

    ORDER BY created_at

може мати сенс відповідний index.

Але index не потрібно створювати на кожне поле автоматично.

Потрібно враховувати:

- які запити виконуються;
- `WHERE`;
- `ORDER BY`;
- `JOIN`;
- кількість даних;
- частоту читання;
- частоту запису;
- вартість підтримки index.

---

# 48. Sorting і Pagination

У backend/API часто зустрічається:

    GET /products?sort=price&order=asc&page=2

Наприклад:

    sort = price
    order = asc

Backend може сформувати SQL:

    SELECT *
    FROM products
    ORDER BY price ASC
    LIMIT 20
    OFFSET 20;

Тут sorting стає частиною реального backend workflow.

---

# 49. Не сортуй усе на Frontend без потреби

Якщо database має:

    1,000,000 rows

не потрібно автоматично:

1. завантажити мільйон записів;
2. передати їх браузеру;
3. відсортувати через JavaScript.

Краще часто зробити:

    Database
        ↓
    SQL ORDER BY
        ↓
    LIMIT / pagination
        ↓
    Backend
        ↓
    Frontend

Це важлива Full Stack концепція.

---

# 50. Sorting і Big O

Основні складності, які потрібно знати:

    O(n²)

для:

- Bubble Sort;
- Selection Sort;
- Insertion Sort average/worst.

І:

    O(n log n)

для:

- Merge Sort;
- Heap Sort;
- Quick Sort average.

Quick Sort:

    Average: O(n log n)
    Worst:   O(n²)

---

# 51. Як приблизно відчувати різницю між O(n²) і O(n log n)

Для:

    n = 10

обидва варіанти можуть бути цілком швидкими.

Але для:

    n = 1,000,000

різниця стає величезною.

Тому Big O потрібен не для математичної краси.

Він допомагає зрозуміти:

**як алгоритм поводитиметься при зростанні кількості даних.**

---

# 52. Типові помилки

## Помилка 1 — `sort()` без comparator для чисел

Неправильно:

    numbers.sort();

Правильно:

    numbers.sort((a, b) => a - b);

---

## Помилка 2 — забути, що `sort()` мутує масив

    const sorted = numbers.sort();

Тут `numbers` також зміниться.

Якщо це небажано:

    const sorted = [...numbers].sort((a, b) => a - b);

або:

    const sorted = numbers.toSorted((a, b) => a - b);

---

## Помилка 3 — плутати `sort()` і `filter()`

`sort()`:

    змінює порядок

`filter()`:

    вибирає елементи

---

## Помилка 4 — сортувати дані на неправильному рівні

Якщо database містить дуже багато записів, не завжди потрібно:

    DB → весь dataset → Node → sort() → Browser

Часто краще:

    DB → ORDER BY + LIMIT → Node → Browser

---

## Помилка 5 — ігнорувати складність

Функція може працювати:

    O(n²)

і бути нормальною для:

    n = 20

але стати проблемою для:

    n = 1,000,000

---

## Помилка 6 — не враховувати стабільність

При сортуванні об'єктів за одним полем може бути важливий порядок елементів з однаковим значенням.

---

# 53. Edge Cases

При написанні власного алгоритму сортування перевіряй:

### Порожній масив

    []

### Один елемент

    [5]

### Два елементи

    [2, 1]

### Уже відсортований

    [1, 2, 3, 4, 5]

### Зворотно відсортований

    [5, 4, 3, 2, 1]

### Дублікати

    [3, 1, 3, 2, 1]

### Однакові елементи

    [5, 5, 5, 5]

### Від'ємні числа

    [-5, 2, -1, 3]

### Великі числа

    [1000000, 2, 500000]

---

# 54. Практичний алгоритм роботи над Sorting-задачею

Коли бачиш задачу на сортування:

### Крок 1 — зрозумій, що саме потрібно сортувати

Наприклад:

    numbers

або:

    objects

---

### Крок 2 — визнач критерій

Наприклад:

    price

    age

    name

    date

    score

---

### Крок 3 — визнач напрямок

    ascending

або:

    descending

---

### Крок 4 — перевір, чи можна використати `sort()`

У звичайному JavaScript-коді:

    array.sort(...)

часто є правильним рішенням.

---

### Крок 5 — якщо це algorithm exercise

Напиши власну реалізацію:

    bubbleSort()

    selectionSort()

    insertionSort()

    mergeSort()

    quickSort()

---

### Крок 6 — проаналізуй складність

Запитай:

    Time?

    Space?

---

### Крок 7 — перевір edge cases

---

# 55. Простий алгоритмічний шаблон

Для навчання корисно спочатку писати словами.

Наприклад, Bubble Sort:

    1. Створити копію масиву.
    2. Пройти масив.
    3. Порівняти сусідні елементи.
    4. Якщо вони в неправильному порядку — поміняти.
    5. Повторювати проходи.
    6. Повернути відсортований масив.

Це:

**pseudocode thinking**

Після цього переходити до JavaScript.

---

# 56. Приклад pseudocode

    FUNCTION bubbleSort(array)

        COPY array

        FOR each position

            FOR each neighboring pair

                IF left > right

                    SWAP left and right

        RETURN sorted array

---

# 57. Sorting Patterns

Під час вивчення алгоритмів варто бачити не тільки назву алгоритму, а й pattern.

### Bubble Sort

Pattern:

    compare neighbors
    swap

### Selection Sort

Pattern:

    find minimum
    put it into position

### Insertion Sort

Pattern:

    take element
    insert into sorted part

### Merge Sort

Pattern:

    divide
    sort
    merge

### Quick Sort

Pattern:

    choose pivot
    partition
    recursively sort

Ці патерни набагато важливіші за механічне запам'ятовування коду.

---

# 58. Sorting і Divide and Conquer

Два важливих алгоритми:

    Merge Sort
    Quick Sort

використовують:

**Divide and Conquer**

Загальна схема:

    Problem
        ↓
    Divide
        ↓
    Solve smaller problems
        ↓
    Combine

Для Merge Sort:

    Divide
        ↓
    Sort left
    Sort right
        ↓
    Merge

Для Quick Sort:

    Divide using pivot
        ↓
    Sort left
    Sort right

---

# 59. Sorting і Recursion

Merge Sort та класичний Quick Sort добре показують зв'язок:

    Sorting
        ↓
    Divide and Conquer
        ↓
    Recursion

Тому після базових циклів і простих алгоритмів важливо вміти читати рекурсивний код.

---

# 60. Що потрібно знати Junior

Для Junior достатньо впевнено розуміти:

### JavaScript

    sort()
    comparator
    ascending
    descending

### Algorithms

    Bubble Sort
    Selection Sort
    Insertion Sort
    Merge Sort
    Quick Sort

### Complexity

    O(n)
    O(n²)
    O(n log n)

### Concepts

    stable sorting
    in-place
    Divide and Conquer
    pivot
    merge
    partition

### Full Stack

    SQL ORDER BY
    sorting in backend
    sorting in frontend
    pagination
    database indexes — на концептуальному рівні

---

# 61. Що потрібно знати Junior+

Можна переходити до:

- оптимізації comparator;
- multi-field sorting;
- stable sorting;
- custom sorting;
- sorting великих наборів даних;
- Merge Sort implementation;
- Quick Sort implementation;
- аналізу memory usage;
- sorting + Binary Search;
- sorting + Two Pointers;
- sorting + Frequency Counter.

---

# 62. Що потрібно знати Middle

На Middle-рівні вже важливо не просто знати назви алгоритмів.

Потрібно вміти відповісти:

> Чому тут використовується саме це сортування?

І розуміти:

- Time Complexity;
- Space Complexity;
- stability;
- in-place;
- worst case;
- average case;
- memory trade-offs;
- data distribution;
- size of dataset;
- database sorting;
- indexes;
- pagination;
- query planning на базовому рівні.

---

# 63. Практичні вправи — Beginner

## Exercise 1 — Ascending Numbers

Написати:

    sortAscending(numbers)

Приклад:

    sortAscending([5, 2, 8, 1]);

Результат:

    [1, 2, 5, 8]

---

## Exercise 2 — Descending Numbers

    sortDescending([5, 2, 8, 1]);

Результат:

    [8, 5, 2, 1]

---

## Exercise 3 — Sort Strings

    sortNames(["John", "Anna", "Bob"]);

Результат:

    ["Anna", "Bob", "John"]

---

## Exercise 4 — Sort by Age

    sortUsersByAge(users);

---

# 64. Практичні вправи — Junior

## Exercise 5 — власний Bubble Sort

Реалізувати:

    bubbleSort(numbers)

Без:

    Array.sort()

---

## Exercise 6 — Selection Sort

Реалізувати:

    selectionSort(numbers)

---

## Exercise 7 — Insertion Sort

Реалізувати:

    insertionSort(numbers)

---

## Exercise 8 — Merge Sort

Реалізувати:

    mergeSort(numbers)

---

## Exercise 9 — Quick Sort

Реалізувати:

    quickSort(numbers)

---

# 65. Практичні вправи — Junior+

## Exercise 10 — Multi-field sorting

Маємо:

    [
      { name: "Bob", age: 25 },
      { name: "Anna", age: 20 },
      { name: "John", age: 25 }
    ]

Сортувати:

    age ASC
    name ASC

---

## Exercise 11 — Custom comparator

Створити:

    sortBy(array, key, direction)

Наприклад:

    sortBy(users, "age", "asc");

---

## Exercise 12 — Sort by score

    [
      { name: "Anna", score: 80 },
      { name: "Bob", score: 95 },
      { name: "John", score: 70 }
    ]

Сортувати за:

    score DESC

---

# 66. Практичні вправи — Full Stack

## Exercise 13 — Products

Створити масив:

    [
      { name: "Phone", price: 800 },
      { name: "Mouse", price: 30 },
      { name: "Keyboard", price: 100 }
    ]

Реалізувати:

    sort=price
    order=asc

---

## Exercise 14 — API sorting

Зробити endpoint:

    GET /products?sort=price&order=asc

Backend:

    parse query parameters
    validate them
    sort data
    return JSON

---

## Exercise 15 — PostgreSQL sorting

Таблиця:

    products

Запит:

    SELECT *
    FROM products
    ORDER BY price ASC;

Потім:

    ORDER BY price DESC;

---

## Exercise 16 — Sorting + pagination

Наприклад:

    GET /products?sort=price&order=asc&page=2&limit=20

SQL концептуально:

    SELECT *
    FROM products
    ORDER BY price ASC
    LIMIT 20
    OFFSET 20;

---

# 67. Interview Questions

## Basic

### 1. Що робить `Array.prototype.sort()`?

Він сортує елементи масиву за comparator або, якщо comparator не переданий, за стандартним string-порівнянням.

---

### 2. Як відсортувати числа за зростанням?

    numbers.sort((a, b) => a - b);

---

### 3. Як за спаданням?

    numbers.sort((a, b) => b - a);

---

### 4. Чи змінює `sort()` початковий масив?

Так.

Якщо потрібно отримати новий:

    const sorted = [...array].sort((a, b) => a - b);

або:

    const sorted = array.toSorted((a, b) => a - b);

---

# 68. Interview — Algorithms

### 5. Що таке Bubble Sort?

Алгоритм, який багаторазово порівнює сусідні елементи та міняє їх місцями, якщо вони стоять у неправильному порядку.

---

### 6. Яка складність Bubble Sort?

Зазвичай:

    Average: O(n²)
    Worst:   O(n²)

Оптимізована реалізація може мати:

    Best: O(n)

для вже відсортованого масиву.

---

### 7. Як працює Selection Sort?

На кожній ітерації знаходить мінімальний елемент невідсортованої частини та ставить його на поточну позицію.

---

### 8. Як працює Insertion Sort?

Поступово будує відсортовану частину масиву та вставляє кожен наступний елемент у правильну позицію.

---

### 9. Чому Insertion Sort може бути корисним для майже відсортованих даних?

Тому що кількість переміщень може бути невеликою, і його best case становить:

    O(n)

---

### 10. Що таке Merge Sort?

Алгоритм Divide and Conquer:

    divide
    sort
    merge

Його time complexity:

    O(n log n)

---

### 11. Що таке Quick Sort?

Алгоритм, який вибирає pivot, partition-ить масив навколо нього та рекурсивно сортує отримані частини.

---

### 12. Яка середня складність Quick Sort?

    O(n log n)

Worst case:

    O(n²)

---

### 13. Яка різниця між Merge Sort і Quick Sort?

Merge Sort використовує merge відсортованих частин і має гарантовану:

    O(n log n)

time complexity.

Quick Sort у середньому:

    O(n log n)

але в найгіршому випадку:

    O(n²)

---

# 69. Interview — практичне мислення

### 14. Чому не потрібно завжди писати власний алгоритм сортування?

Тому що JavaScript вже має:

    Array.prototype.sort()

Для production-коду краще використовувати стандартний, перевірений API, якщо немає спеціальної причини реалізовувати алгоритм самостійно.

---

### 15. Коли потрібно сортувати в database, а не JavaScript?

Коли даних багато і database може ефективніше виконати:

    ORDER BY
    LIMIT
    OFFSET

та використати відповідні indexes/query planning.

---

### 16. Що таке stable sorting?

Стабільне сортування зберігає взаємний порядок елементів, які мають однаковий ключ сортування.

---

### 17. Що таке in-place sorting?

Сортування, яке виконується без створення великої додаткової структури для всіх елементів.

---

# 70. Міні-шпаргалка

## JavaScript

    // Ascending
    numbers.sort((a, b) => a - b);

    // Descending
    numbers.sort((a, b) => b - a);

    // New sorted array
    const sorted = [...numbers].sort((a, b) => a - b);

    // Non-mutating sorting
    const sorted = numbers.toSorted((a, b) => a - b);

---

## String

    names.sort((a, b) => a.localeCompare(b));

---

## Object

    users.sort((a, b) => a.age - b.age);

---

## PostgreSQL

    SELECT *
    FROM users
    ORDER BY age ASC;

    SELECT *
    FROM users
    ORDER BY age DESC;

---

## Main Algorithms

    Bubble Sort
    Selection Sort
    Insertion Sort
    Merge Sort
    Quick Sort
    Heap Sort
    Counting Sort

---

## Complexity

    Bubble:
    O(n²)

    Selection:
    O(n²)

    Insertion:
    O(n²) average/worst
    O(n) best

    Merge:
    O(n log n)

    Quick:
    O(n log n) average
    O(n²) worst

    Heap:
    O(n log n)

---

# 71. Головна карта Sorting

Корисно бачити всю тему так:

    Sorting
       │
       ├── JavaScript sort()
       │     ├── comparator
       │     ├── ascending
       │     ├── descending
       │     └── objects
       │
       ├── Simple Algorithms
       │     ├── Bubble Sort
       │     ├── Selection Sort
       │     └── Insertion Sort
       │
       ├── Divide and Conquer
       │     ├── Merge Sort
       │     └── Quick Sort
       │
       ├── Data Structures
       │     └── Heap Sort
       │
       ├── Non-comparison
       │     ├── Counting Sort
       │     ├── Radix Sort
       │     └── Bucket Sort
       │
       ├── Concepts
       │     ├── Big O
       │     ├── Stable
       │     ├── In-place
       │     └── Comparator
       │
       └── Full Stack
             ├── JS sort()
             ├── API sorting
             ├── SQL ORDER BY
             ├── indexes
             └── pagination

---

# 72. Що реально потрібно тримати в голові

Не потрібно намагатися постійно пам'ятати весь код кожного алгоритму.

Важливіше пам'ятати **ідею**.

### Bubble Sort

    сусіди → порівняння → swap

### Selection Sort

    знайти minimum → поставити на позицію

### Insertion Sort

    взяти елемент → вставити у sorted part

### Merge Sort

    divide → sort → merge

### Quick Sort

    pivot → partition → recursive sort

---

# 73. Sorting у загальній картині Algorithms

Після теми Searching і Sorting починає вимальовуватися основна алгоритмічна картина:

    Data
      ↓
    Searching
      ↓
    Sorting
      ↓
    Patterns
      ├── Frequency Counter
      ├── Two Pointers
      ├── Sliding Window
      └── Recursion
      ↓
    Complexity
      ↓
    Data Structures
      ↓
    Real Applications

Тобто Sorting — це не ізольована тема.

Вона часто стає підготовчим кроком для інших алгоритмів.

Наприклад:

    Sort
      ↓
    Two Pointers
      ↓
    Efficient Search

---

# 74. Найважливіше для Full Stack JavaScript

У Full Stack-розробці потрібно бачити три різні рівні.

### Frontend

    array.sort()

Наприклад:

    products
      ↓
    sort by price
      ↓
    render UI

### Backend

    request
      ↓
    sort / validate / transform
      ↓
    response

### Database

    SELECT ...
    ORDER BY ...
    LIMIT ...

Тобто знання Sorting повинно поступово переходити від:

    алгоритмів

до:

    реальної роботи з даними.

---

# 75. Підсумок

**Sorting** — це не просто `array.sort()`.

Потрібно розуміти:

- що таке сортування;
- ascending / descending;
- comparator;
- чому `sort()` без comparator небезпечний для чисел;
- mutation;
- `toSorted()`;
- Bubble Sort;
- Selection Sort;
- Insertion Sort;
- Merge Sort;
- Quick Sort;
- Heap Sort;
- Counting Sort;
- stable sorting;
- in-place;
- Divide and Conquer;
- pivot;
- merge;
- partition;
- Time Complexity;
- Space Complexity;
- `O(n²)`;
- `O(n log n)`;
- Sorting + Searching;
- Sorting + Binary Search;
- Sorting у Frontend;
- Sorting у Backend;
- SQL `ORDER BY`;
- Sorting + Pagination;
- роль database indexes.

Головна практична ідея:

> **У звичайному JavaScript використовуй `sort()` з правильним comparator. В алгоритмах — розумій, як працюють основні sorting algorithms і яка їхня складність. У Full Stack — вмій визначити, на якому рівні краще виконати сортування: Frontend, Backend чи Database.**

---