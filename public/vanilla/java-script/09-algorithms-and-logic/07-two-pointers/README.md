# 07. Two Pointers

## Вступ

**Two Pointers** — це алгоритмічний pattern, у якому ми використовуємо дві змінні-покажчики для роботи з даними.

Найчастіше pointers рухаються:

- назустріч один одному;
- в одному напрямку;
- з різною швидкістю;
- по різних частинах структури даних.

Найчастіше Two Pointers застосовується до:

- sorted arrays;
- strings;
- pairs of values;
- subarrays;
- пошуку елементів з певною сумою;
- порівняння елементів з двох кінців.

Головна ідея:

> **Замість вкладених циклів використовувати два покажчики, які рухаються по структурі даних таким чином, щоб зменшити кількість непотрібних перевірок.**

---

# 1. Де Two Pointers знаходиться в Algorithms

У нашій структурі:

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

Two Pointers — це не конкретний метод JavaScript.

Це **problem-solving pattern**.

---

# 2. Що таке Pointer

У контексті Two Pointers `pointer` — це просто змінна, яка зберігає позицію елемента.

Наприклад:

    const numbers = [1, 2, 3, 4, 5];

Можемо мати:

    let left = 0;
    let right = numbers.length - 1;

Тоді:

    left  → index 0
    right → index 4

Візуально:

    [1, 2, 3, 4, 5]
     ↑           ↑
    left       right

---

# 3. Головна ідея Two Pointers

Замість:

    for each element
        compare with every other element

можна використати:

    left
       ↓
    [ ... ]
       ↑
      right

і поступово рухати pointers.

Наприклад:

    left++
    right--

Таким чином два покажчики сходяться до центру.

---

# 4. Найпоширеніший варіант

Для масиву:

    [1, 2, 3, 4, 5]

маємо:

    left = 0
    right = 4

Потім:

    left = 1
    right = 3

Потім:

    left = 2
    right = 2

Умова часто виглядає так:

    while (left < right) {
      ...
    }

---

# 5. Чому Two Pointers корисний

Основна причина:

**зменшення кількості операцій.**

Наївне рішення може мати:

    O(n²)

Two Pointers часто дозволяє отримати:

    O(n)

Тобто замість перевірки всіх пар:

    n × n

ми можемо пройти масив приблизно одним проходом:

    n

---

# 6. Найважливіша умова

Two Pointers особливо добре працює, коли дані мають певну структуру.

Найпоширеніший випадок:

**sorted array**

Наприклад:

    [1, 2, 3, 5, 7, 9]

Завдяки сортуванню ми можемо робити висновки:

    якщо сума занадто мала
        left++

    якщо сума занадто велика
        right--

Це дозволяє відкидати одразу багато непотрібних варіантів.

---

# 7. Classic Problem — Pair Sum

Маємо:

    [1, 2, 3, 4, 6]

Потрібно знайти два числа, сума яких дорівнює:

    6

Відповідь:

    2 + 4 = 6

---

# 8. Наївне рішення

Можна перевірити всі пари:

    function hasPairWithSum(numbers, target) {
      for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
          if (numbers[i] + numbers[j] === target) {
            return true;
          }
        }
      }

      return false;
    }

Складність:

    O(n²)

---

# 9. Two Pointers для Pair Sum

Якщо масив відсортований:

    [1, 2, 3, 4, 6]

Встановлюємо:

    left = 0
    right = 4

Отримуємо:

    1 + 6 = 7

Це більше за:

    6

Отже, потрібно зменшити суму.

Рухаємо:

    right--

Отримуємо:

    1 + 4 = 5

Це менше за:

    6

Тепер потрібно збільшити суму:

    left++

Отримуємо:

    2 + 4 = 6

Знайшли pair.

---

# 10. Pair Sum — реалізація

    function hasPairWithSum(numbers, target) {
      let left = 0;
      let right = numbers.length - 1;

      while (left < right) {
        const sum = numbers[left] + numbers[right];

        if (sum === target) {
          return true;
        }

        if (sum < target) {
          left++;
        } else {
          right--;
        }
      }

      return false;
    }

---

# 11. Перевірка

    hasPairWithSum(
      [1, 2, 3, 4, 6],
      6
    );

Результат:

    true

---

# 12. Якщо pair не існує

    hasPairWithSum(
      [1, 2, 3, 4, 6],
      20
    );

Результат:

    false

Pointers продовжують рухатися, поки:

    left < right

Якщо вони зустрілися — всі необхідні комбінації вже перевірені.

---

# 13. Trace Table

Для:

    [1, 2, 3, 4, 6]

і:

    target = 6

| left | right | values | sum | Action |
|---:|---:|---|---:|---|
| 0 | 4 | 1 + 6 | 7 | right-- |
| 0 | 3 | 1 + 4 | 5 | left++ |
| 1 | 3 | 2 + 4 | 6 | found |

Це хороший спосіб навчитися бачити алгоритм.

---

# 14. Чому можна рухати `right`, якщо сума завелика

Це ключова ідея.

Маємо sorted array:

    [1, 2, 3, 4, 6]

і:

    1 + 6 = 7

target:

    6

Сума завелика.

Чи має сенс залишати `6` і збільшувати `left`?

Ні.

Оскільки `left` може тільки збільшити число:

    1 → 2 → 3 → ...

сума стане ще більшою.

Тому потрібно:

    right--

---

# 15. Чому можна рухати `left`, якщо сума замала

Маємо:

    1 + 4 = 5

target:

    6

Сума замала.

Якщо зменшити `right`:

    4 → 3

сума стане ще меншою.

Тому потрібно збільшити:

    left++

Отримаємо:

    2 + 4 = 6

---

# 16. Це і є головний принцип

Для sorted array:

    sum < target
        ↓
    left++

    sum > target
        ↓
    right--

    sum === target
        ↓
    found

Запам'ятати саме цю логіку важливіше, ніж запам'ятати код.

---

# 17. Two Pointers і Sorting

Two Pointers дуже часто працює разом із Sorting.

Типова схема:

    unsorted data
          ↓
       sorting
          ↓
    two pointers
          ↓
    efficient solution

Наприклад:

    [7, 2, 9, 1, 5, 3]

Після sorting:

    [1, 2, 3, 5, 7, 9]

Після цього можна застосувати:

    left
    right

---

# 18. Але Sorting має свою ціну

Sorting:

    O(n log n)

Two Pointers:

    O(n)

Разом:

    O(n log n)

Тому потрібно порівнювати з іншими підходами.

Наприклад, Frequency Counter може вирішити деякі задачі за:

    O(n)

але з використанням:

    O(n)

додаткової пам'яті.

---

# 19. Two Pointers для palindrome

Palindrome — це слово або послідовність, яка читається однаково зліва направо і справа наліво.

Наприклад:

    "racecar"

Візуально:

    r a c e c a r
    ↑           ↑
   left       right

Порівнюємо:

    r === r

Потім:

    a === a

Потім:

    c === c

---

# 20. Palindrome — реалізація

    function isPalindrome(text) {
      let left = 0;
      let right = text.length - 1;

      while (left < right) {
        if (text[left] !== text[right]) {
          return false;
        }

        left++;
        right--;
      }

      return true;
    }

---

# 21. Перевірка

    isPalindrome("racecar");

Результат:

    true

    isPalindrome("hello");

Результат:

    false

---

# 22. Чому це Two Pointers

Ми маємо:

    left → початок

    right → кінець

І кожної ітерації:

    left++
    right--

Тобто два pointers рухаються назустріч один одному.

---

# 23. Palindrome Complexity

Для рядка довжини:

    n

ми перевіряємо максимум приблизно половину символів.

Але в Big O:

    Time: O(n)

Space:

    O(1)

якщо не створюємо додаткову строку.

---

# 24. Reverse String і Two Pointers

Two Pointers також можна використовувати для reverse array.

Маємо:

    [1, 2, 3, 4, 5]

Pointers:

    left = 0
    right = 4

Міняємо:

    1 ↔ 5

Отримуємо:

    [5, 2, 3, 4, 1]

Потім:

    2 ↔ 4

Отримуємо:

    [5, 4, 3, 2, 1]

---

# 25. Reverse Array — реалізація

    function reverseInPlace(array) {
      let left = 0;
      let right = array.length - 1;

      while (left < right) {
        [array[left], array[right]] =
          [array[right], array[left]];

        left++;
        right--;
      }

      return array;
    }

---

# 26. Complexity

    Time: O(n)
    Space: O(1)

Це хороший приклад:

**in-place algorithm + Two Pointers.**

---

# 27. Пошук пари з конкретною різницею

Можлива задача:

> Чи існують два числа, різниця між якими дорівнює `target`?

Наприклад:

    [1, 3, 5, 8, 10]

target:

    2

Пари:

    3 - 1 = 2
    5 - 3 = 2
    10 - 8 = 2

Для такого типу задач Two Pointers також може бути корисним на sorted data.

---

# 28. Two Pointers для різниці

Можемо мати два pointers:

    left
    right

і рухати їх залежно від:

    numbers[right] - numbers[left]

Якщо різниця:

    < target

збільшуємо `right`.

Якщо:

    > target

збільшуємо `left`.

Якщо:

    === target

знайшли pair.

---

# 29. Приклад

Маємо:

    [1, 3, 5, 8, 10]

target:

    2

Початок:

    left = 0
    right = 1

    3 - 1 = 2

Знайшли.

У загальному випадку важливо правильно вибрати початкові позиції та умови руху pointers відповідно до задачі.

---

# 30. Видалення дублікатів із sorted array

Ще один класичний pattern.

Маємо:

    [1, 1, 2, 2, 3, 3]

Потрібно залишити:

    [1, 2, 3]

Один pointer відстежує позицію останнього унікального елемента, інший проходить масив.

---

# 31. Slow / Fast Pointers

Це споріднений варіант Two Pointers.

Маємо:

    slow
    fast

`fast` рухається швидше.

Наприклад:

    slow++
    fast++

або:

    slow++
    fast += 2

Цей підхід часто використовується для:

- видалення дублікатів;
- linked lists;
- циклів;
- пошуку середини;
- partitioning.

---

# 32. Remove Duplicates — приклад

    function removeDuplicates(numbers) {
      if (numbers.length === 0) {
        return 0;
      }

      let slow = 0;

      for (let fast = 1; fast < numbers.length; fast++) {
        if (numbers[fast] !== numbers[slow]) {
          slow++;
          numbers[slow] = numbers[fast];
        }
      }

      return slow + 1;
    }

---

# 33. Важлива умова

Такий класичний варіант працює для:

**sorted array.**

Наприклад:

    [1, 1, 2, 2, 3]

А не для довільного:

    [2, 1, 2, 3, 1]

Якщо масив не відсортований, алгоритм потребує іншого підходу.

---

# 34. Що означають `slow` і `fast`

Вони не обов'язково означають буквально:

    повільний
    швидкий

Це просто два pointers із різними ролями.

Наприклад:

    fast → шукає нові значення

    slow → визначає місце для запису

Це дуже важливий спосіб мислення.

---

# 35. Two Pointers на двох масивах

Two Pointers можна використовувати не тільки на одному масиві.

Наприклад:

    array1 = [1, 3, 5]
    array2 = [2, 3, 6]

Маємо:

    i = 0
    j = 0

Порівнюємо:

    array1[i]
    array2[j]

і рухаємо той pointer, елемент якого менший.

Це базова ідея:

**merge two sorted arrays.**

---

# 36. Merge Two Sorted Arrays

Маємо:

    [1, 3, 5]

і:

    [2, 4, 6]

Результат:

    [1, 2, 3, 4, 5, 6]

---

# 37. Реалізація

    function mergeSortedArrays(array1, array2) {
      const result = [];

      let i = 0;
      let j = 0;

      while (
        i < array1.length &&
        j < array2.length
      ) {
        if (array1[i] <= array2[j]) {
          result.push(array1[i]);
          i++;
        } else {
          result.push(array2[j]);
          j++;
        }
      }

      while (i < array1.length) {
        result.push(array1[i]);
        i++;
      }

      while (j < array2.length) {
        result.push(array2[j]);
        j++;
      }

      return result;
    }

---

# 38. Complexity Merge Two Arrays

Якщо:

    n = array1.length
    m = array2.length

то:

    Time: O(n + m)

Тому що кожен pointer проходить свій масив максимум один раз.

Space для результату:

    O(n + m)

---

# 39. Two Pointers і `while`

Для цього pattern дуже часто використовується:

    while (left < right)

або:

    while (i < array1.length && j < array2.length)

Це не означає, що Two Pointers завжди потребує `while`.

Головне:

**дві позиції керують проходженням даних.**

---

# 40. Два pointers можуть рухатися в одному напрямку

Не завжди:

    left → ← right

Іноді:

    slow →
    fast →

Наприклад:

    [1, 1, 2, 2, 3]

    slow →
       fast →

Обидва рухаються зліва направо.

---

# 41. Два pointers можуть бути в різних структурах

Наприклад:

    array1 → i
    array2 → j

Тобто Two Pointers може означати:

    pointer + pointer

а не обов'язково:

    left + right

---

# 42. Основні варіанти Two Pointers

## Pattern 1 — Opposite Direction

    left →
    ← right

Використовується для:

- pair sum;
- palindrome;
- reverse;
- comparison from both ends.

---

## Pattern 2 — Same Direction

    slow →
    fast →

Використовується для:

- remove duplicates;
- partitioning;
- compacting array;
- linked lists.

---

## Pattern 3 — Two Arrays

    array1 → i

    array2 → j

Використовується для:

- merge;
- intersection;
- comparison;
- synchronized traversal.

---

# 43. Two Pointers + Pair Sum

Класичний шаблон:

    let left = 0;
    let right = array.length - 1;

    while (left < right) {
      const sum = array[left] + array[right];

      if (sum === target) {
        // found
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }

---

# 44. Two Pointers + Palindrome

Класичний шаблон:

    let left = 0;
    let right = text.length - 1;

    while (left < right) {
      if (text[left] !== text[right]) {
        return false;
      }

      left++;
      right--;
    }

    return true;

---

# 45. Two Pointers + Merge

Класичний шаблон:

    let i = 0;
    let j = 0;

    while (
      i < array1.length &&
      j < array2.length
    ) {
      if (array1[i] <= array2[j]) {
        // use array1[i]
        i++;
      } else {
        // use array2[j]
        j++;
      }
    }

---

# 46. Two Pointers + Remove Duplicates

Класичний шаблон:

    let slow = 0;

    for (let fast = 1; fast < array.length; fast++) {
      if (array[fast] !== array[slow]) {
        slow++;
        array[slow] = array[fast];
      }
    }

---

# 47. Як розпізнати Two Pointers задачу

Звертай увагу на формулювання:

- "find a pair";
- "two numbers";
- "sorted array";
- "target sum";
- "from both ends";
- "reverse";
- "palindrome";
- "remove duplicates";
- "merge two sorted arrays";
- "compare two sorted arrays";
- "find elements with a given difference".

Особливо сильний сигнал:

> **Дані відсортовані + потрібно знайти pair / compare elements / пройти з двох кінців.**

---

# 48. Two Pointers vs Nested Loops

Розглянемо Pair Sum.

### Nested loops

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        ...
      }
    }

Complexity:

    O(n²)

### Two Pointers

    let left = 0;
    let right = n - 1;

    while (left < right) {
      ...
    }

Complexity:

    O(n)

за умови, що масив уже відсортований.

---

# 49. Але не завжди Two Pointers кращий

Якщо масив не відсортований:

    [7, 2, 9, 1, 5]

можна:

    sort → O(n log n)
    two pointers → O(n)

Загалом:

    O(n log n)

Інший варіант — Frequency Counter / Hash Map:

    O(n)

з додатковою пам'яттю:

    O(n)

Тому вибір залежить від:

- чи можна змінювати порядок;
- чи можна сортувати;
- чи важлива пам'ять;
- чи потрібно зберегти original order.

---

# 50. Two Pointers vs Frequency Counter

Для Pair Sum:

### Frequency Counter / Map

    const seen = new Set();

    for (const number of numbers) {
      const complement = target - number;

      if (seen.has(complement)) {
        return true;
      }

      seen.add(number);
    }

Time:

    O(n)

Space:

    O(n)

### Two Pointers

Для sorted array:

    Time: O(n)
    Space: O(1)

Якщо потрібно спочатку сортувати:

    O(n log n)

---

# 51. Головний trade-off

Two Pointers часто дозволяє:

    O(1) extra space

але може вимагати:

    sorted data

Frequency Counter може дати:

    O(n) time

для unsorted data,

але використовує:

    O(n) space.

Це типовий algorithmic trade-off.

---

# 52. Two Pointers і Mutation

In-place Two Pointers часто змінює масив.

Наприклад:

    reverseInPlace(array)

змінює:

    array

Якщо це небажано:

    const result = [...array];

    reverseInPlace(result);

Це створює:

    O(n)

додаткової пам'яті.

---

# 53. Two Pointers і `sort()`

Потрібно бути уважним.

    numbers.sort((a, b) => a - b);

змінює початковий масив.

Безпечніше:

    const sorted = [...numbers]
      .sort((a, b) => a - b);

Після цього:

    Two Pointers

працює з:

    sorted

---

# 54. Pair Sum — повернути самі числа

Можна повернути не тільки `true`.

    function findPairWithSum(numbers, target) {
      let left = 0;
      let right = numbers.length - 1;

      while (left < right) {
        const sum = numbers[left] + numbers[right];

        if (sum === target) {
          return [
            numbers[left],
            numbers[right]
          ];
        }

        if (sum < target) {
          left++;
        } else {
          right--;
        }
      }

      return null;
    }

---

# 55. Pair Sum — повернути індекси

    function findPairIndices(numbers, target) {
      let left = 0;
      let right = numbers.length - 1;

      while (left < right) {
        const sum = numbers[left] + numbers[right];

        if (sum === target) {
          return [left, right];
        }

        if (sum < target) {
          left++;
        } else {
          right--;
        }
      }

      return null;
    }

Цей варіант передбачає, що індекси відносяться до масиву, з яким працюють pointers.

Якщо перед цим створити відсортовану копію, індекси вже будуть індексами копії, а не оригінального масиву.

Це важлива практична деталь.

---

# 56. Pair Sum і duplicates

Маємо:

    [1, 1, 2, 3, 4]

target:

    2

Можлива пара:

    1 + 1 = 2

Two Pointers може коректно працювати з duplicates, якщо умова алгоритму це дозволяє.

Не потрібно автоматично видаляти duplicates перед застосуванням Two Pointers.

---

# 57. Three Sum

Two Pointers часто стає частиною складнішого алгоритму.

Задача:

> Знайти три числа, сума яких дорівнює target.

Наприклад:

    [1, 2, 3, 4, 5]

Після sorting:

    [1, 2, 3, 4, 5]

Фіксуємо одне число:

    1

Для решти:

    [2, 3, 4, 5]

використовуємо Two Pointers.

Схема:

    for each fixed element
        ↓
    left
        +
    right

---

# 58. Three Sum — концепція

    sorted array
          ↓
    choose i
          ↓
    left = i + 1
    right = end
          ↓
    use Two Pointers

Це хороший приклад того, як один pattern стає частиною складнішого алгоритму.

---

# 59. Two Pointers і Sliding Window

Ці patterns схожі, але не однакові.

### Two Pointers

Фокус:

    два pointers

і взаємодія між їхніми позиціями.

### Sliding Window

Фокус:

    window

між:

    left
    right

і підтримка стану всередині цього вікна.

Sliding Window можна розглядати як спеціальний клас задач із двома межами, але не кожна Two Pointers задача є Sliding Window.

---

# 60. Важлива відмінність

Pair Sum:

    left
          right

Ми порівнюємо два конкретні елементи.

Це:

    Two Pointers

Sliding Window:

    [ left ........ right ]

Ми підтримуємо поточний діапазон елементів.

Це:

    Sliding Window

---

# 61. Two Pointers і Searching

Two Pointers можна розглядати як спосіб скоротити простір пошуку.

Наприклад:

    [1, 2, 3, 4, 6]

Замість перевірки:

    1 + 2
    1 + 3
    1 + 4
    1 + 6
    2 + 3
    ...

ми використовуємо властивість sorted array і рухаємо pointers.

Тобто:

    eliminate impossible pairs

---

# 62. Edge Cases

При реалізації Two Pointers перевіряй:

### Порожній масив

    []

### Один елемент

    [5]

### Два елементи

    [1, 5]

### Pair існує

    [1, 2, 3, 4]
    target = 5

### Pair не існує

    [1, 2, 3, 4]
    target = 20

### Pair на початку

    [1, 2, 5, 8]

### Pair в кінці

    [1, 2, 5, 8]
    target = 13

### Дублікати

    [1, 1, 2, 2]

### Від'ємні числа

    [-5, -2, 1, 6]

### Усі однакові

    [3, 3, 3, 3]

---

# 63. Типові помилки

## Помилка 1 — забути умову `left < right`

Неправильно:

    while (left <= right)

У деяких задачах це може призвести до порівняння елемента із самим собою.

Потрібно уважно читати умову задачі.

---

## Помилка 2 — застосувати Two Pointers без необхідної властивості даних

Pair Sum алгоритм:

    sum < target → left++
    sum > target → right--

потребує sorted array.

Для:

    [5, 1, 4, 2, 3]

такий рух не гарантує правильного результату.

---

## Помилка 3 — забути про Sorting

Якщо алгоритм передбачає sorted array, потрібно явно забезпечити це.

---

## Помилка 4 — змінити оригінальний масив

    numbers.sort(...)

мутує масив.

Якщо порядок оригінальних даних важливий:

    const sorted = [...numbers].sort(...);

---

## Помилка 5 — неправильний рух pointer

Наприклад:

    sum < target

але рухаємо:

    right--

Це суперечить логіці sorted array.

---

## Помилка 6 — infinite loop

Наприклад:

    while (left < right) {
      ...
    }

але ні:

    left++

ні:

    right--

не виконується.

Тоді pointers залишаються на місці.

---

# 64. Як перевірити рух pointers

Для кожної ітерації запитай:

> Що я дізнався?

Наприклад:

    sum < target

Це означає:

    поточна сума замала

Отже:

    left++

А не просто:

    "так написано в шаблоні".

Потрібно розуміти причину руху.

---

# 65. Практичний алгоритм розв'язання Two Pointers задачі

### Крок 1

Визнач:

    що саме потрібно знайти?

---

### Крок 2

Перевір:

    чи дані sorted?

---

### Крок 3

Запитай:

    чи можна використати два pointers?

---

### Крок 4

Визнач ролі:

    left
    right

або:

    slow
    fast

або:

    i
    j

---

### Крок 5

Визнач умову руху.

Наприклад:

    sum < target
        → left++

    sum > target
        → right--

---

### Крок 6

Визнач момент завершення:

    left >= right

або:

    i >= array.length

або інша умова.

---

### Крок 7

Перевір edge cases.

---

### Крок 8

Оціни:

    Time
    Space

---

# 66. Pseudocode — Pair Sum

    FUNCTION hasPairWithSum(array, target)

        left = 0
        right = last index

        WHILE left < right

            sum = array[left] + array[right]

            IF sum equals target
                RETURN true

            IF sum < target
                left++

            ELSE
                right--

        RETURN false

---

# 67. Pseudocode — Palindrome

    FUNCTION isPalindrome(text)

        left = 0
        right = last index

        WHILE left < right

            IF text[left] != text[right]
                RETURN false

            left++
            right--

        RETURN true

---

# 68. Pseudocode — Merge

    FUNCTION merge(array1, array2)

        i = 0
        j = 0

        WHILE i < length(array1)
              AND j < length(array2)

            IF array1[i] <= array2[j]

                add array1[i]
                i++

            ELSE

                add array2[j]
                j++

        add remaining elements

        RETURN result

---

# 69. Complexity Patterns

Типові Two Pointers рішення:

    Time: O(n)
    Space: O(1)

Наприклад:

    palindrome
    reverse in place
    pair sum on sorted array

Але якщо спочатку потрібно сортувати:

    Sorting: O(n log n)
    Two Pointers: O(n)

Загалом:

    O(n log n)

Тому завжди дивись на весь алгоритм.

---

# 70. Two Pointers для Linked List

Two Pointers не обмежується масивами.

Для Linked List часто використовують:

    slow
    fast

Наприклад:

    slow → 1 step
    fast → 2 steps

Це дозволяє:

- знайти середину;
- визначити цикл;
- працювати з відстанню між pointers.

Цей варіант варто детальніше вивчати разом із Data Structures.

---

# 71. Fast / Slow — пошук середини

Концептуально:

    slow = head
    fast = head

Поки:

    fast !== null
    fast.next !== null

рухаємо:

    slow = slow.next
    fast = fast.next.next

Коли `fast` дійде до кінця:

    slow

буде приблизно в середині.

---

# 72. Fast / Slow — Cycle Detection

Класичний алгоритм:

**Floyd's Cycle Detection Algorithm**

Якщо:

    slow = slow.next
    fast = fast.next.next

і вони зустрілися:

    cycle exists

Це вже більш advanced застосування Two Pointers.

---

# 73. Two Pointers і Data Structures

Pattern може працювати з:

    Arrays
    Strings
    Linked Lists

Ідея залишається одна:

    pointer
        +
    pointer
        ↓
    controlled traversal

---

# 74. Two Pointers і Real Applications

У реальних застосунках принципи Two Pointers можуть бути корисні для:

- об'єднання відсортованих даних;
- порівняння списків;
- пошуку пар;
- обробки діапазонів;
- очищення даних;
- дедуплікації;
- роботи з ordered datasets.

Наприклад:

    database results A
          +
    database results B
          ↓
    merge

---

# 75. Two Pointers у Full Stack

У Full Stack коді pattern може з'явитися на рівні:

### Frontend

    sorted products
        ↓
    find pair
        ↓
    display result

### Backend

    sorted data
        ↓
    compare / merge
        ↓
    API response

### Database

SQL часто може виконати частину роботи ефективніше, ніж JavaScript.

Наприклад:

    ORDER BY

може забезпечити потрібний порядок даних перед подальшою обробкою.

Тому алгоритмічне рішення потрібно співвідносити з місцем, де реально знаходяться дані.

---

# 76. Two Pointers і PostgreSQL

Якщо database вже може виконати:

    WHERE
    ORDER BY
    JOIN
    GROUP BY

не потрібно автоматично переносити всю логіку в Node.js.

Наприклад:

    Database
       ↓
    ORDER BY
       ↓
    LIMIT
       ↓
    Backend
       ↓
    Frontend

Two Pointers — це інструмент алгоритмічного мислення, а не вимога реалізовувати кожну задачу саме в JavaScript.

---

# 77. Практичні вправи — Beginner

## Exercise 1 — Palindrome

Написати:

    isPalindrome(text)

Приклади:

    isPalindrome("racecar");

    // true

    isPalindrome("hello");

    // false

---

## Exercise 2 — Reverse Array

Реалізувати:

    reverseInPlace(array)

Без:

    reverse()

---

## Exercise 3 — Pair Sum

Для sorted array:

    hasPairWithSum(
      [1, 2, 3, 4, 6],
      6
    );

Результат:

    true

---

## Exercise 4 — Pair Not Found

    hasPairWithSum(
      [1, 2, 3, 4, 6],
      20
    );

Результат:

    false

---

# 78. Практичні вправи — Junior

## Exercise 5 — Return Pair

    findPairWithSum(
      [1, 2, 3, 4, 6],
      6
    );

Результат:

    [2, 4]

---

## Exercise 6 — Merge Sorted Arrays

    mergeSortedArrays(
      [1, 3, 5],
      [2, 4, 6]
    );

Результат:

    [1, 2, 3, 4, 5, 6]

---

## Exercise 7 — Remove Duplicates

Для:

    [1, 1, 2, 2, 3, 3]

отримати:

    [1, 2, 3]

---

## Exercise 8 — Pair Difference

Знайти, чи існують два числа з різницею:

    target

---

# 79. Практичні вправи — Junior+

## Exercise 9 — Three Sum

Знайти всі трійки:

    a + b + c === target

Використати:

    sorting
    +
    two pointers

---

## Exercise 10 — Intersection

Маємо два sorted arrays:

    [1, 2, 3, 5]
    [2, 3, 4, 5]

Знайти intersection:

    [2, 3, 5]

---

## Exercise 11 — Compare Sorted Arrays

Перевірити, чи два sorted arrays містять однакові значення в однаковій кількості.

---

## Exercise 12 — Closest Pair Sum

Для:

    [1, 3, 4, 7, 10]

і target:

    8

знайти pair, сума якої найближча до target.

---

# 80. Практичні вправи — Full Stack

## Exercise 13 — Merge API Data

Є два вже відсортовані масиви:

    productsA
    productsB

Об'єднати їх у backend без повторного sorting.

---

## Exercise 14 — Compare IDs

Є:

    activeUserIds
    registeredUserIds

Обидва масиви sorted.

Знайти спільні IDs через Two Pointers.

---

## Exercise 15 — PostgreSQL + JavaScript

Отримати два datasets через SQL:

    ORDER BY id

Після цього об'єднати їх у Node.js через Two Pointers.

---

# 81. Interview Questions

## Basic

### 1. Що таке Two Pointers?

Алгоритмічний pattern, у якому використовуються дві змінні, що відстежують позиції елементів і керують проходженням даних.

---

### 2. Які основні види Two Pointers?

Найпоширеніші:

    left + right

    slow + fast

    pointer i + pointer j
    для двох масивів

---

### 3. Чому Two Pointers може бути ефективнішим за nested loops?

Тому що pointers можуть пройти структуру даних лінійно, замість перевірки всіх пар.

Наприклад:

    O(n²) → O(n)

---

### 4. Чи завжди Two Pointers працює за O(n)?

Ні.

Це залежить від задачі.

Наприклад:

    sorting O(n log n)
    +
    two pointers O(n)

дає:

    O(n log n)

---

# 82. Interview — Pair Sum

### 5. Чому Pair Sum Two Pointers потребує sorted array?

Тому що алгоритм використовує властивість порядку.

Якщо:

    sum < target

ми знаємо, що потрібно збільшити `left`.

Якщо:

    sum > target

потрібно зменшити `right`.

Без sorted order ці висновки не працюють.

---

### 6. Що відбувається, якщо сума менша за target?

Для sorted array:

    left++

---

### 7. Що відбувається, якщо сума більша за target?

    right--

---

# 83. Interview — Complexity

### 8. Яка Space Complexity у класичного Two Pointers?

Часто:

    O(1)

додаткової пам'яті.

Але це не універсальне правило для кожної задачі.

---

### 9. Чим Two Pointers відрізняється від Frequency Counter?

Two Pointers використовує позиції елементів.

Frequency Counter використовує структуру:

    value → count

Two Pointers часто:

    O(1) extra space

Frequency Counter часто:

    O(n) space

---

### 10. Чим Two Pointers відрізняється від Sliding Window?

Two Pointers — ширший pattern.

Sliding Window підтримує певний діапазон між двома межами та стан цього діапазону.

---

# 84. Interview — Practical Thinking

### 11. Коли варто подумати про Two Pointers?

Коли:

- є sorted data;
- потрібно знайти pair;
- потрібно порівнювати два кінці;
- потрібно пройти два sorted arrays;
- потрібно reverse;
- потрібно перевірити palindrome;
- потрібно видалити duplicates;
- потрібно працювати з slow / fast positions.

---

### 12. Що потрібно перевірити перед використанням Two Pointers?

    Чи є потрібна властивість даних?
    Чи відсортований масив?
    Чи можна його сортувати?
    Чи важливий original order?
    Яку роль має кожен pointer?
    Коли pointers рухаються?
    Коли алгоритм завершується?

---

# 85. Міні-шпаргалка

## Opposite Direction

    let left = 0;
    let right = array.length - 1;

    while (left < right) {
      ...
      left++;
      right--;
    }

---

## Pair Sum

    const sum = array[left] + array[right];

    if (sum === target) {
      // found
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }

---

## Palindrome

    while (left < right) {
      if (text[left] !== text[right]) {
        return false;
      }

      left++;
      right--;
    }

    return true;

---

## Slow / Fast

    let slow = 0;

    for (
      let fast = 1;
      fast < array.length;
      fast++
    ) {
      ...
    }

---

## Two Arrays

    let i = 0;
    let j = 0;

    while (
      i < array1.length &&
      j < array2.length
    ) {
      ...
    }

---

# 86. Головна карта Two Pointers

    Two Pointers
         │
         ├── Opposite Direction
         │     ├── Pair Sum
         │     ├── Palindrome
         │     └── Reverse
         │
         ├── Same Direction
         │     ├── Slow / Fast
         │     ├── Remove Duplicates
         │     └── Partitioning
         │
         ├── Two Arrays
         │     ├── Merge
         │     ├── Intersection
         │     └── Comparison
         │
         ├── With Sorting
         │     ├── Pair problems
         │     ├── Three Sum
         │     └── Closest Pair
         │
         ├── Data Structures
         │     └── Linked List
         │
         └── Related Patterns
               ├── Searching
               ├── Sorting
               ├── Frequency Counter
               └── Sliding Window

---

# 87. Алгоритмічне мислення

Two Pointers вчить ставити питання:

> Чи потрібно мені перевіряти всі можливі комбінації?

Наприклад:

    O(n²)

Можливо, дані мають властивість:

    sorted

Тоді можна використати цю властивість:

    sorted data
        ↓
    eliminate impossible cases
        ↓
    move pointers
        ↓
    O(n)

Це один із найважливіших переходів від простого написання циклів до алгоритмічного мислення.

---

# 88. Головний принцип

Two Pointers — це не:

> "Я маю два цикли або дві змінні."

Це:

> **Я використовую дві позиції, щоб систематично скорочувати або контролювати простір пошуку.**

---

# 89. Що потрібно реально запам'ятати

### Pattern 1

    left → ← right

для:

- pair;
- palindrome;
- reverse;
- comparison from both ends.

### Pattern 2

    slow → fast →

для:

- duplicates;
- compacting;
- linked lists;
- cycle detection.

### Pattern 3

    array1 → i
    array2 → j

для:

- merge;
- intersection;
- comparison.

---

# 90. Що потрібно знати Junior

Для Junior потрібно впевнено розуміти:

    Two Pointers

    left / right

    slow / fast

    sorted array

    pair sum

    palindrome

    reverse

    merge sorted arrays

    remove duplicates

    O(n)

    O(1) extra space

Також потрібно розуміти, **чому pointer рухається саме в цей бік**.

---

# 91. Що потрібно знати Junior+

Можна переходити до:

- Three Sum;
- closest pair;
- intersection;
- partitioning;
- Two Pointers + Sorting;
- Two Pointers + Frequency Counter;
- Two Pointers + Sliding Window;
- slow / fast у Linked List.

---

# 92. Що потрібно знати Middle

На Middle важливо вже бачити Two Pointers як інструмент оптимізації.

Потрібно вміти визначити:

- чи є monotonic property;
- чи потрібне sorting;
- чи можна отримати `O(n)`;
- чи потрібна додаткова пам'ять;
- чи допустима mutation;
- чи потрібно зберігати original indexes;
- чи краще використати Hash Map;
- чи краще виконати операцію в database.

---

# 93. Two Pointers у загальній картині Algorithms

Після:

    Searching
        ↓
    Sorting
        ↓
    Frequency Counter
        ↓
    Two Pointers

починає формуватися важливий набір patterns.

Наприклад, задача:

> Find two numbers with target sum.

може мати кілька рішень:

    Nested Loops
        ↓
    O(n²)

    Hash Map / Set
        ↓
    O(n) time
    O(n) space

    Sorting + Two Pointers
        ↓
    O(n log n)
    O(1) extra space
    після sorting

Це вже справжнє алгоритмічне порівняння.

---

# 94. Головний Full Stack зв'язок

В алгоритмах:

    Array
       ↓
    Two Pointers
       ↓
    efficient processing

У Full Stack:

    Database
       ↓
    ordered data
       ↓
    Backend
       ↓
    processing
       ↓
    API
       ↓
    Frontend

Але важливо пам'ятати:

> **Алгоритм не потрібно переносити в JavaScript автоматично.**

Якщо PostgreSQL може ефективно виконати потрібну операцію через:

    WHERE
    ORDER BY
    JOIN
    GROUP BY

краще спочатку розглянути database як місце виконання.

---

# 95. Підсумок

**Two Pointers** — це один із фундаментальних алгоритмічних patterns.

Основна ідея:

    pointer
       +
    pointer
       ↓
    controlled traversal
       ↓
    fewer unnecessary operations

Найважливіші варіанти:

    left + right

    slow + fast

    i + j

Найважливіші задачі:

- Pair Sum;
- Palindrome;
- Reverse;
- Remove Duplicates;
- Merge Sorted Arrays;
- Intersection;
- Three Sum;
- Closest Pair;
- Linked List middle;
- Cycle Detection.

Головний алгоритмічний сигнал:

> **Якщо маєш sorted data, два кінці, pair-завдання або два набори даних, які можна проходити синхронно — подумай про Two Pointers.**

І головне:

> **Не запам'ятовуй тільки `left++` та `right--`. Розумій, яку інформацію ти отримуєш на кожній ітерації і чому після цього частину простору пошуку можна відкинути.**

---