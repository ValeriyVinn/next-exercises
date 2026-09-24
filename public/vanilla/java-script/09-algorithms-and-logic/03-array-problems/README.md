# 03. Array Problems

## Вступ

**Array Problems** — це практичні алгоритмічні задачі, у яких основною структурою даних є масив (`Array`).

На цьому етапі важливо не просто знати методи масивів, а навчитися **бачити алгоритм у задачі**:

- що потрібно знайти;
- що потрібно порахувати;
- що потрібно змінити;
- чи потрібен новий масив;
- чи можна змінити існуючий;
- чи потрібен один прохід по масиву;
- чи потрібні два проходи;
- чи потрібні `Set`, `Map` або інша структура;
- яка часова та просторова складність рішення.

Цей розділ спирається на:

- базовий JavaScript;
- `Array` та його методи;
- цикли;
- умовні конструкції;
- функції;
- `String`;
- `Set` та `Map`.

І готує до наступних алгоритмічних тем:

- `06-frequency-counter`;
- `07-two-pointers`;
- `08-sliding-window`;
- `09-recursion`;
- `10-complexity-basics`.

---

# Навіщо вивчати Array Problems

Масиви зустрічаються практично всюди:

- список користувачів;
- товари;
- повідомлення;
- результати тестів;
- оцінки;
- платежі;
- записи з бази даних;
- API-відповіді;
- DOM-елементи;
- дані для таблиць;
- результати пошуку.

Наприклад:

    const scores = [78, 92, 65, 88, 95];

Питання алгоритмічної задачі може бути дуже простим:

> Знайти найбільший результат.

Але за цією простою задачею стоїть алгоритмічне мислення:

1. пройти масив;
2. зберігати поточний максимум;
3. порівнювати кожне значення;
4. оновлювати максимум;
5. повернути результат.

    function findMax(numbers) {
      let max = numbers[0];

      for (const number of numbers) {
        if (number > max) {
          max = number;
        }
      }

      return max;
    }

---

# Основні групи Array Problems

У цьому розділі корисно навчитися розпізнавати такі типи задач:

1. Пошук елемента
2. Пошук мінімуму / максимуму
3. Підрахунок елементів
4. Сума / середнє
5. Фільтрація
6. Перетворення
7. Пошук індексу
8. Перевірка умови
9. Порівняння масивів
10. Видалення дублікатів
11. Об'єднання масивів
12. Розворот масиву
13. Зсув елементів
14. Пошук другого максимуму
15. Пошук пропущеного значення
16. Пошук повторюваних значень
17. Частоти елементів
18. Групування елементів
19. Просте сортування
20. Комбінування декількох операцій

---

# Ключове правило

> **Спочатку зрозумій задачу → потім придумай алгоритм → тільки після цього пиши код.**

Не потрібно одразу шукати метод:

    map()
    filter()
    reduce()
    find()
    sort()

Спочатку постав питання:

> Що саме має відбутися з кожним елементом?

---

# Що потрібно пам'ятати

- `Array` — упорядкована колекція елементів.
- Індекси починаються з `0`.
- `array.length` — кількість елементів.
- Масиви є об'єктами.
- Багато методів масивів створюють новий масив.
- Деякі методи змінюють початковий масив.
- `map()` — перетворити.
- `filter()` — залишити потрібні.
- `find()` — знайти перший елемент.
- `some()` — чи існує хоча б один.
- `every()` — чи всі відповідають умові.
- `reduce()` — звести масив до одного результату.
- `sort()` — сортує масив і **змінює його**.
- `reverse()` — змінює масив.
- `slice()` — не змінює початковий масив.
- `splice()` — змінює початковий масив.
- `Set` зручно використовувати для унікальних значень.
- `Map` зручно використовувати для підрахунку та зв'язків `key → value`.
- Не кожну задачу потрібно вирішувати методом масиву.
- Цикл `for` залишається фундаментальним інструментом.

---

# 1. Індекси масиву

Масив:

    const fruits = ["apple", "banana", "orange"];

Індекси:

    // index:   0        1         2

    fruits[0]; // "apple"
    fruits[1]; // "banana"
    fruits[2]; // "orange"

Останній елемент:

    fruits[fruits.length - 1];

У сучасному JavaScript:

    fruits.at(-1);

---

# 2. Перебір масиву

## Класичний `for`

Найважливіший алгоритмічний варіант.

    const numbers = [10, 20, 30, 40];

    for (let i = 0; i < numbers.length; i++) {
      console.log(numbers[i]);
    }

Перевага:

- маєш індекс;
- можеш рухатися вперед або назад;
- можеш контролювати крок;
- зручно для алгоритмів.

---

# 3. `for...of`

Коли індекс не потрібен:

    const numbers = [10, 20, 30];

    for (const number of numbers) {
      console.log(number);
    }

Це один із найзручніших способів читання елементів масиву.

---

# 4. `forEach()`

Зручно виконати дію для кожного елемента:

    const numbers = [10, 20, 30];

    numbers.forEach((number) => {
      console.log(number);
    });

Але:

> `forEach()` не повертає новий масив.

Для алгоритмічних задач часто зручнішими є:

    map()
    filter()
    find()
    some()
    every()
    reduce()

або звичайний `for`.

---

# 5. Знайти максимальне значення

Задача:

> Знайти найбільше число.

    function findMax(numbers) {
      let max = numbers[0];

      for (const number of numbers) {
        if (number > max) {
          max = number;
        }
      }

      return max;
    }

    findMax([5, 10, 3, 20, 8]); // 20

### Алгоритмічна ідея

Маємо:

    max = перший елемент

Потім:

    якщо current > max
      max = current

---

# 6. Знайти мінімальне значення

    function findMin(numbers) {
      let min = numbers[0];

      for (const number of numbers) {
        if (number < min) {
          min = number;
        }
      }

      return min;
    }

    findMin([5, 10, 3, 20, 8]); // 3

---

# 7. `Math.max()` та `Math.min()`

Для невеликих масивів можна:

    const numbers = [5, 10, 3, 20, 8];

    Math.max(...numbers); // 20
    Math.min(...numbers); // 3

Але важливо розуміти алгоритм через цикл.

У навчанні алгоритмів:

> `for` важливіший за короткий запис через spread.

---

# 8. Сума елементів

    function sum(numbers) {
      let total = 0;

      for (const number of numbers) {
        total += number;
      }

      return total;
    }

    sum([10, 20, 30]); // 60

Через `reduce()`:

    const total = [10, 20, 30].reduce(
      (sum, number) => sum + number,
      0
    );

---

# 9. Середнє значення

    function average(numbers) {
      if (numbers.length === 0) {
        return 0;
      }

      let total = 0;

      for (const number of numbers) {
        total += number;
      }

      return total / numbers.length;
    }

    average([10, 20, 30]); // 20

### Важливо

Завжди подумай про порожній масив:

    []

Що має повернути функція?

Це частина алгоритму, а не дрібниця.

---

# 10. Порахувати кількість елементів

Наприклад, скільки парних чисел:

    function countEven(numbers) {
      let count = 0;

      for (const number of numbers) {
        if (number % 2 === 0) {
          count++;
        }
      }

      return count;
    }

    countEven([1, 2, 4, 7, 8]); // 3

Це фундаментальний алгоритмічний шаблон:

    let count = 0;

    for (...) {
      if (умова) {
        count++;
      }
    }

---

# 11. Порахувати кількість за умовою

Наприклад, кількість чисел більших за `10`:

    function countGreaterThan(numbers, limit) {
      let count = 0;

      for (const number of numbers) {
        if (number > limit) {
          count++;
        }
      }

      return count;
    }

    countGreaterThan([5, 12, 20, 3, 15], 10); // 3

---

# 12. `filter()` як алгоритмічний інструмент

`filter()` створює новий масив з елементів, які відповідають умові.

    const numbers = [1, 2, 3, 4, 5, 6];

    const evenNumbers = numbers.filter((number) => {
      return number % 2 === 0;
    });

    // [2, 4, 6]

Короткий варіант:

    const evenNumbers = numbers.filter(
      (number) => number % 2 === 0
    );

---

# 13. `map()` як алгоритмічний інструмент

`map()` перетворює кожен елемент.

    const numbers = [1, 2, 3, 4];

    const doubled = numbers.map((number) => {
      return number * 2;
    });

    // [2, 4, 6, 8]

Алгоритмічне питання:

> Яке нове значення має відповідати кожному старому елементу?

---

# 14. `find()`

Знайти перший елемент, який відповідає умові:

    const numbers = [5, 12, 3, 20];

    const result = numbers.find((number) => number > 10);

    // 12

Якщо нічого не знайдено:

    undefined

Це важливо враховувати.

---

# 15. `findIndex()`

Знайти індекс першого відповідного елемента:

    const numbers = [5, 12, 3, 20];

    const index = numbers.findIndex((number) => number > 10);

    // 1

Якщо нічого не знайдено:

    -1

---

# 16. `includes()`

Перевірити наявність конкретного значення:

    const fruits = ["apple", "banana", "orange"];

    fruits.includes("banana"); // true
    fruits.includes("pear");   // false

Це зручніше, ніж вручну писати цикл, коли потрібна лише проста перевірка.

---

# 17. `some()`

Перевірити:

> Чи є хоча б один елемент, який відповідає умові?

    const numbers = [1, 3, 5, 8];

    const hasEven = numbers.some((number) => {
      return number % 2 === 0;
    });

    // true

---

# 18. `every()`

Перевірити:

> Чи всі елементи відповідають умові?

    const numbers = [2, 4, 6, 8];

    const allEven = numbers.every((number) => {
      return number % 2 === 0;
    });

    // true

---

# 19. `reduce()`

`reduce()` використовується, коли багато елементів потрібно перетворити на **один результат**.

Наприклад:

    const numbers = [1, 2, 3, 4];

    const sum = numbers.reduce((total, number) => {
      return total + number;
    }, 0);

    // 10

Інші приклади результату:

- сума;
- добуток;
- кількість;
- об'єкт;
- групування;
- статистика.

### Але

Не потрібно використовувати `reduce()` лише тому, що він коротший.

Якщо `for` робить алгоритм зрозумілішим — використовуй `for`.

---

# 20. Пошук першого максимуму

Наприклад:

    const numbers = [5, 20, 8, 20, 3];

Знайти індекс першого максимального значення.

    function findMaxIndex(numbers) {
      if (numbers.length === 0) {
        return -1;
      }

      let maxIndex = 0;

      for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > numbers[maxIndex]) {
          maxIndex = i;
        }
      }

      return maxIndex;
    }

    findMaxIndex([5, 20, 8, 20, 3]); // 1

### Важливий момент

Ми зберігаємо не саме значення:

    max = 20

а його позицію:

    maxIndex = 1

---

# 21. Другий найбільший елемент

Це вже цікавіша алгоритмічна задача.

Наприклад:

    [10, 5, 20, 8]

Результат:

    10

Один із варіантів:

    function findSecondMax(numbers) {
      if (numbers.length < 2) {
        return undefined;
      }

      let max = -Infinity;
      let secondMax = -Infinity;

      for (const number of numbers) {
        if (number > max) {
          secondMax = max;
          max = number;
        } else if (number > secondMax && number < max) {
          secondMax = number;
        }
      }

      return secondMax === -Infinity
        ? undefined
        : secondMax;
    }

Це приклад задачі, де важливо правильно підтримувати **декілька станів**.

---

# 22. Видалення дублікатів

Наприклад:

    const numbers = [1, 2, 2, 3, 3, 4];

Потрібно:

    [1, 2, 3, 4]

Простий варіант:

    const uniqueNumbers = [...new Set(numbers)];

---

# 23. Чому `Set` корисний

`Set` зберігає тільки унікальні значення.

    const numbers = new Set([1, 2, 2, 3]);

    console.log(numbers);

    // Set(3) { 1, 2, 3 }

Перетворити назад у масив:

    const uniqueNumbers = [...numbers];

---

# 24. Перевірка на дублікати

Задача:

> Чи має масив хоча б один повторюваний елемент?

    function hasDuplicates(numbers) {
      return new Set(numbers).size !== numbers.length;
    }

    hasDuplicates([1, 2, 3]);       // false
    hasDuplicates([1, 2, 2, 3]);    // true

Це хороший приклад того, як правильна структура даних спрощує алгоритм.

---

# 25. Знайти дублікати

Наприклад:

    [1, 2, 2, 3, 3, 4]

Результат:

    [2, 3]

Простий варіант:

    function findDuplicates(numbers) {
      const seen = new Set();
      const duplicates = new Set();

      for (const number of numbers) {
        if (seen.has(number)) {
          duplicates.add(number);
        } else {
          seen.add(number);
        }
      }

      return [...duplicates];
    }

---

# 26. Пошук пропущеного числа

Приклад:

    [1, 2, 3, 5]

Пропущено:

    4

Простий навчальний варіант:

    function findMissingNumber(numbers, max) {
      for (let number = 1; number <= max; number++) {
        if (!numbers.includes(number)) {
          return number;
        }
      }

      return undefined;
    }

Але цей варіант може бути повільним, тому що `includes()` запускається багато разів.

Це важливий момент:

> Правильність алгоритму — не єдина характеристика. Важлива також його ефективність.

---

# 27. Пошук елемента

Лінійний пошук:

    function findNumber(numbers, target) {
      for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === target) {
          return i;
        }
      }

      return -1;
    }

    findNumber([10, 20, 30, 40], 30); // 2

Це називається:

**Linear Search**

---

# 28. Лінійний пошук

Принцип:

    [10, 20, 30, 40, 50]
       ↓
      10 !== target
          ↓
      20 !== target
          ↓
      30 === target

Ми перевіряємо елементи послідовно.

У найгіршому випадку потрібно переглянути весь масив.

---

# 29. Перевірка, чи масив відсортований

Наприклад:

    [1, 2, 3, 4, 5]

Масив відсортований за зростанням.

    function isSorted(numbers) {
      for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] < numbers[i - 1]) {
          return false;
        }
      }

      return true;
    }

    isSorted([1, 2, 3, 4]); // true
    isSorted([1, 3, 2, 4]); // false

### Алгоритмічна ідея

Порівнюємо:

    current

з:

    previous

---

# 30. Розворот масиву

Є:

    const numbers = [1, 2, 3, 4];

Потрібно:

    [4, 3, 2, 1]

Можна:

    const reversed = [...numbers].reverse();

Важливо:

    numbers.reverse();

**змінює початковий масив**.

Якщо не хочемо мутації:

    const reversed = [...numbers].reverse();

---

# 31. Розворот вручну

Для алгоритмічного тренування корисно зробити це без `reverse()`.

    function reverseArray(numbers) {
      const result = [];

      for (let i = numbers.length - 1; i >= 0; i--) {
        result.push(numbers[i]);
      }

      return result;
    }

    reverseArray([1, 2, 3, 4]);

    // [4, 3, 2, 1]

---

# 32. Зсув масиву

Наприклад:

    [1, 2, 3, 4, 5]

Зсунути на одну позицію вправо:

    [5, 1, 2, 3, 4]

Простий варіант:

    function rotateRight(numbers) {
      if (numbers.length === 0) {
        return [];
      }

      return [
        numbers[numbers.length - 1],
        ...numbers.slice(0, -1)
      ];
    }

---

# 33. `slice()` vs `splice()`

Це дуже важливо.

## `slice()`

Не змінює початковий масив.

    const numbers = [1, 2, 3, 4];

    const result = numbers.slice(1, 3);

    // [2, 3]

    // numbers залишається:
    // [1, 2, 3, 4]

## `splice()`

Змінює початковий масив.

    const numbers = [1, 2, 3, 4];

    numbers.splice(1, 2);

    // numbers:
    // [1, 4]

---

# 34. Об'єднання масивів

Через spread:

    const first = [1, 2];
    const second = [3, 4];

    const result = [...first, ...second];

    // [1, 2, 3, 4]

Через `concat()`:

    const result = first.concat(second);

---

# 35. Перетин двох масивів

Наприклад:

    const first = [1, 2, 3, 4];
    const second = [3, 4, 5, 6];

Спільні значення:

    [3, 4]

Простий варіант:

    const intersection = first.filter((number) => {
      return second.includes(number);
    });

Це зрозуміле рішення, але при великих масивах може бути неефективним.

---

# 36. Ефективніший пошук через `Set`

    const first = [1, 2, 3, 4];
    const second = [3, 4, 5, 6];

    const secondSet = new Set(second);

    const intersection = first.filter((number) => {
      return secondSet.has(number);
    });

Тут ми спочатку створюємо:

    Set

а потім швидше перевіряємо:

    has()

Це важлива алгоритмічна ідея:

> Правильний вибір структури даних може змінити ефективність алгоритму.

---

# 37. Різниця між масивами

Наприклад:

    first  = [1, 2, 3]
    second = [2, 3, 4]

Елементи, які є в `first`, але відсутні в `second`:

    [1]

    const secondSet = new Set(second);

    const difference = first.filter((number) => {
      return !secondSet.has(number);
    });

---

# 38. Порівняння двох масивів

Питання:

> Чи однакові два масиви?

Просте порівняння:

    [1, 2, 3] === [1, 2, 3]

дасть:

    false

Тому що масиви — об'єкти, і порівнюються за посиланням.

---

# 39. Порівняння масивів поелементно

    function areEqual(first, second) {
      if (first.length !== second.length) {
        return false;
      }

      for (let i = 0; i < first.length; i++) {
        if (first[i] !== second[i]) {
          return false;
        }
      }

      return true;
    }

    areEqual([1, 2, 3], [1, 2, 3]);
    // true

    areEqual([1, 2, 3], [1, 3, 2]);
    // false

---

# 40. Важлива відмінність: порядок

Масиви:

    [1, 2, 3]
    [3, 2, 1]

не однакові як послідовності.

Якщо задача говорить:

> "містять однакові значення незалежно від порядку"

це вже інша алгоритмічна задача.

Наприклад:

    [1, 2, 3]
    [3, 1, 2]

можуть вважатися еквівалентними залежно від умови задачі.

---

# 41. Сортування чисел

У JavaScript:

    [10, 2, 30, 5].sort();

дасть:

    [10, 2, 30, 5]

або порядок, заснований на перетворенні до рядків.

Для чисел:

    const numbers = [10, 2, 30, 5];

    numbers.sort((a, b) => a - b);

    // [2, 5, 10, 30]

За спаданням:

    numbers.sort((a, b) => b - a);

---

# 42. `sort()` мутує масив

    const numbers = [3, 1, 2];

    numbers.sort((a, b) => a - b);

Після цього:

    numbers
    // [1, 2, 3]

Якщо потрібно зберегти оригінал:

    const sorted = [...numbers].sort((a, b) => a - b);

---

# 43. Як працює comparator

У:

    numbers.sort((a, b) => a - b);

якщо результат:

    < 0

`a` йде перед `b`.

Якщо:

    > 0

`b` йде перед `a`.

Якщо:

    0

їх порядок відносно comparator не змінюється.

Для чисел достатньо запам'ятати:

    (a, b) => a - b

---

# 44. Знайти найближче число

Наприклад:

    numbers = [10, 20, 30, 40]
    target = 26

Найближче:

    30

Один із простих варіантів:

    function findClosest(numbers, target) {
      let closest = numbers[0];

      for (const number of numbers) {
        if (
          Math.abs(number - target) <
          Math.abs(closest - target)
        ) {
          closest = number;
        }
      }

      return closest;
    }

---

# 45. Перемістити нулі в кінець

Є:

    [0, 1, 0, 3, 12]

Потрібно:

    [1, 3, 12, 0, 0]

Простий варіант:

    function moveZeros(numbers) {
      const nonZero = numbers.filter((number) => number !== 0);
      const zeros = numbers.filter((number) => number === 0);

      return [...nonZero, ...zeros];
    }

Це просте рішення, яке легко читати.

Пізніше можна вивчити алгоритм **in-place**, який використовує менше додаткової пам'яті.

---

# 46. Розділення масиву

Наприклад:

    [1, 2, 3, 4, 5, 6]

Отримати парні та непарні:

    const even = [];
    const odd = [];

    for (const number of numbers) {
      if (number % 2 === 0) {
        even.push(number);
      } else {
        odd.push(number);
      }
    }

---

# 47. `partition`

Загальна алгоритмічна ідея:

> Розділити елементи за певною умовою.

Наприклад:

    const numbers = [5, 12, 3, 20, 8];

    const small = [];
    const large = [];

    for (const number of numbers) {
      if (number < 10) {
        small.push(number);
      } else {
        large.push(number);
      }
    }

Результат:

    small
    // [5, 3, 8]

    large
    // [12, 20]

---

# 48. Знайти перший унікальний елемент

Приклад:

    [2, 3, 2, 4, 3, 5]

Перший елемент, який зустрічається один раз:

    4

Це вже задача, де корисна структура:

    Map

Перший прохід:

    підрахувати частоти

Другий прохід:

    знайти перший елемент з частотою 1

---

# 49. Частоти елементів

Наприклад:

    [1, 2, 2, 3, 3, 3]

Потрібно:

    1 → 1
    2 → 2
    3 → 3

Через `Map`:

    function countFrequency(numbers) {
      const frequency = new Map();

      for (const number of numbers) {
        const count = frequency.get(number) ?? 0;

        frequency.set(number, count + 1);
      }

      return frequency;
    }

Це базовий приклад **Frequency Counter**.

Більш детально цей патерн розглядається в:

    06-frequency-counter

---

# 50. Групування елементів

Наприклад:

    const numbers = [1, 2, 3, 4, 5, 6];

Потрібно:

    even → [2, 4, 6]
    odd  → [1, 3, 5]

Можна використати об'єкт:

    const groups = {
      even: [],
      odd: []
    };

    for (const number of numbers) {
      if (number % 2 === 0) {
        groups.even.push(number);
      } else {
        groups.odd.push(number);
      }
    }

---

# 51. Перетворення масиву об'єктів

Дуже важлива практична задача для Full Stack JavaScript.

Є:

    const users = [
      { id: 1, name: "Anna", age: 25 },
      { id: 2, name: "John", age: 30 },
      { id: 3, name: "Kate", age: 22 }
    ];

Отримати тільки імена:

    const names = users.map((user) => user.name);

Результат:

    ["Anna", "John", "Kate"]

---

# 52. Фільтрація масиву об'єктів

Знайти користувачів старших за 25:

    const adults = users.filter((user) => {
      return user.age > 25;
    });

---

# 53. Пошук об'єкта

Знайти користувача за `id`:

    const user = users.find((user) => {
      return user.id === 2;
    });

Результат:

    { id: 2, name: "John", age: 30 }

Це одна з найчастіших операцій у реальних JavaScript-застосунках.

---

# 54. Пошук максимального поля

Наприклад:

    const users = [
      { name: "Anna", score: 80 },
      { name: "John", score: 95 },
      { name: "Kate", score: 88 }
    ];

Знайти користувача з найбільшим `score`:

    function findBestUser(users) {
      if (users.length === 0) {
        return undefined;
      }

      let best = users[0];

      for (const user of users) {
        if (user.score > best.score) {
          best = user;
        }
      }

      return best;
    }

---

# 55. Сума значень об'єктів

    const products = [
      { name: "Book", price: 20 },
      { name: "Pen", price: 5 },
      { name: "Notebook", price: 15 }
    ];

    const total = products.reduce((sum, product) => {
      return sum + product.price;
    }, 0);

    // 40

---

# 56. Знайти найдорожчий товар

    function findMostExpensive(products) {
      if (products.length === 0) {
        return undefined;
      }

      let result = products[0];

      for (const product of products) {
        if (product.price > result.price) {
          result = product;
        }
      }

      return result;
    }

---

# 57. Створення нового масиву без певного значення

    const numbers = [1, 2, 3, 2, 4];

    const result = numbers.filter((number) => {
      return number !== 2;
    });

    // [1, 3, 4]

Це видаляє **всі** значення `2`.

---

# 58. Видалення тільки першого входження

Якщо потрібно видалити тільки перший `2`:

    function removeFirst(numbers, target) {
      const index = numbers.indexOf(target);

      if (index === -1) {
        return [...numbers];
      }

      return [
        ...numbers.slice(0, index),
        ...numbers.slice(index + 1)
      ];
    }

---

# 59. Вставити елемент без мутації

Є:

    const numbers = [1, 2, 4];

Потрібно:

    [1, 2, 3, 4]

    const result = [
      ...numbers.slice(0, 2),
      3,
      ...numbers.slice(2)
    ];

---

# 60. Масив як стек

JavaScript `Array` можна використовувати як **Stack**.

Основні операції:

    push()
    pop()

Приклад:

    const stack = [];

    stack.push(10);
    stack.push(20);
    stack.push(30);

    stack.pop();

Результат:

    30

Принцип:

    Last In → First Out

або:

    LIFO

---

# 61. Масив як черга

Можна використовувати:

    push()
    shift()

Наприклад:

    const queue = [];

    queue.push("A");
    queue.push("B");
    queue.push("C");

    queue.shift();

Першим буде видалено:

    "A"

Принцип:

    First In → First Out

або:

    FIFO

### Важливо

Для великих черг постійне використання `shift()` може бути неефективним.

Алгоритмічні структури даних пізніше розглядаються окремо.

---

# 62. Перевірка зростання

Задача:

> Чи кожен наступний елемент більший за попередній?

    function isStrictlyIncreasing(numbers) {
      for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] <= numbers[i - 1]) {
          return false;
        }
      }

      return true;
    }

    isStrictlyIncreasing([1, 2, 3, 4]);
    // true

    isStrictlyIncreasing([1, 2, 2, 4]);
    // false

---

# 63. Пошук локального максимуму

Локальний максимум — елемент, який більший за своїх сусідів.

Наприклад:

    [1, 5, 2, 3, 4, 1]

`5` — локальний максимум.

Перевірка внутрішніх елементів:

    function findLocalMax(numbers) {
      const result = [];

      for (let i = 1; i < numbers.length - 1; i++) {
        if (
          numbers[i] > numbers[i - 1] &&
          numbers[i] > numbers[i + 1]
        ) {
          result.push(numbers[i]);
        }
      }

      return result;
    }

---

# 64. Підмасив — Subarray

Важливе поняття.

Маємо:

    [1, 2, 3, 4]

Підмасивом може бути:

    [2, 3]

або:

    [1, 2, 3]

Але:

    [1, 3]

не є contiguous subarray, тому що елементи не йдуть безперервно.

Це важливо для наступних алгоритмічних задач.

---

# 65. Subarray vs Subsequence

### Subarray

Елементи повинні йти підряд:

    [1, 2, 3]

### Subsequence

Елементи можуть мати пропуски, але порядок зберігається.

Наприклад із:

    [1, 2, 3, 4, 5]

можна отримати:

    [1, 3, 5]

Тому:

> **Subarray = contiguous**

> **Subsequence = порядок зберігається, але пропуски дозволені**

---

# 66. Пошук суми двох елементів

Задача:

    numbers = [2, 7, 11, 15]
    target = 9

Потрібно знайти:

    2 + 7 = 9

Простий варіант через два цикли:

    function twoSum(numbers, target) {
      for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
          if (numbers[i] + numbers[j] === target) {
            return [i, j];
          }
        }
      }

      return [];
    }

    twoSum([2, 7, 11, 15], 9);

    // [0, 1]

Це важливий приклад, тому що показує:

> Іноді простий алгоритм має два вкладені цикли.

Пізніше цю задачу можна оптимізувати через `Map`.

---

# 67. Вкладені цикли

Приклад:

    for (let i = 0; i < numbers.length; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        // робота з парою елементів
      }
    }

Такий підхід часто використовується для задач:

- порівняння пар;
- пошуку двох елементів;
- перевірки комбінацій;
- простих brute-force рішень.

Але:

> два вкладені цикли часто означають `O(n²)`.

---

# 68. Brute Force

**Brute Force** — прямий, простий спосіб перебрати можливі варіанти.

Наприклад:

    [2, 7, 11, 15]

Для пошуку `target = 9`:

    2 + 7
    2 + 11
    2 + 15
    7 + 11
    ...

Перевага:

- легко придумати;
- легко перевірити;
- легко реалізувати.

Недолік:

- часто повільний на великих даних.

### Важливо

Brute Force — не "поганий код".

Це часто:

> перше правильне рішення, яке потім можна оптимізувати.

---

# 69. Розділяй правильність та оптимізацію

При розв'язанні задачі:

### Крок 1

Зробити рішення правильним.

### Крок 2

Перевірити edge cases.

### Крок 3

Оцінити складність.

### Крок 4

Якщо потрібно — оптимізувати.

Не потрібно одразу намагатися написати найскладніший алгоритм.

---

# 70. Edge Cases

Кожна задача повинна перевіряти крайні випадки.

Наприклад:

### Порожній масив

    []

### Один елемент

    [5]

### Два елементи

    [1, 2]

### Усі елементи однакові

    [5, 5, 5, 5]

### Від'ємні числа

    [-10, -5, -20]

### Нуль

    [0, 1, 2]

### Дуже великі числа

    [1000000, 2000000]

---

# 71. Приклад edge cases для максимуму

Функція:

    findMax(numbers)

Тести:

    findMax([1, 2, 3]);
    // 3

    findMax([-5, -2, -10]);
    // -2

    findMax([7]);
    // 7

    findMax([]);
    // потрібно заздалегідь визначити поведінку

---

# 72. Не використовуй `0` як універсальне початкове значення

Помилка:

    let max = 0;

Для:

    [-5, -10, -2]

результат буде неправильним:

    0

Правильніше:

    let max = numbers[0];

або, залежно від задачі:

    let max = -Infinity;

---

# 73. `Infinity` та `-Infinity`

Можна використовувати:

    let min = Infinity;
    let max = -Infinity;

Наприклад:

    function findMax(numbers) {
      let max = -Infinity;

      for (const number of numbers) {
        if (number > max) {
          max = number;
        }
      }

      return max;
    }

Але для порожнього масиву:

    findMax([]);

отримаємо:

    -Infinity

Тому edge case потрібно продумати окремо.

---

# 74. Мутація масиву

Мутація означає зміну початкового масиву.

Мутують, наприклад:

    push()
    pop()
    shift()
    unshift()
    splice()
    sort()
    reverse()

Не мутують:

    map()
    filter()
    slice()
    concat()

Також:

    find()
    some()
    every()
    includes()

не змінюють масив.

---

# 75. Чому мутація важлива

Є:

    const numbers = [3, 1, 2];

    const sorted = numbers.sort((a, b) => a - b);

Тепер:

    numbers
    // [1, 2, 3]

Тобто `sorted` і `numbers` працюють з тим самим масивом.

Якщо це небажано:

    const sorted = [...numbers].sort((a, b) => a - b);

---

# 76. Array Methods Cheat Sheet

| Метод | Що робить | Новий масив | Мутує |
|---|---|---:|---:|
| `map()` | перетворює | так | ні |
| `filter()` | фільтрує | так | ні |
| `find()` | знаходить елемент | ні | ні |
| `findIndex()` | знаходить індекс | ні | ні |
| `some()` | хоча б один? | ні | ні |
| `every()` | всі? | ні | ні |
| `includes()` | чи є значення? | ні | ні |
| `reduce()` | зводить до результату | ні | ні |
| `slice()` | копіює частину | так | ні |
| `concat()` | об'єднує | так | ні |
| `sort()` | сортує | ні | **так** |
| `reverse()` | розвертає | ні | **так** |
| `splice()` | вставка/видалення | ні | **так** |
| `push()` | додає в кінець | ні | **так** |
| `pop()` | видаляє з кінця | ні | **так** |
| `shift()` | видаляє з початку | ні | **так** |
| `unshift()` | додає на початок | ні | **так** |

---

# 77. Array Problem Patterns

Для алгоритмічних задач важливо бачити не тільки методи, а **патерни**.

## Pattern 1 — Accumulator

Зберігаємо результат:

    let total = 0;

    for (const number of numbers) {
      total += number;
    }

Приклади:

- сума;
- добуток;
- кількість;
- статистика.

---

# 78. Pattern 2 — Counter

Лічильник:

    let count = 0;

    for (const number of numbers) {
      if (number > 10) {
        count++;
      }
    }

Приклади:

- кількість парних;
- кількість позитивних;
- кількість значень за умовою.

---

# 79. Pattern 3 — Best Value

Зберігаємо найкраще значення:

    let max = numbers[0];

    for (const number of numbers) {
      if (number > max) {
        max = number;
      }
    }

Приклади:

- максимум;
- мінімум;
- найкращий результат;
- найдорожчий товар.

---

# 80. Pattern 4 — Search

Шукаємо перший відповідний елемент:

    for (const number of numbers) {
      if (number === target) {
        return number;
      }
    }

Приклади:

- знайти користувача;
- знайти товар;
- знайти значення;
- знайти індекс.

---

# 81. Pattern 5 — Filter

Залишаємо лише потрібні елементи:

    const result = numbers.filter((number) => {
      return number > 10;
    });

---

# 82. Pattern 6 — Transform

Перетворюємо кожен елемент:

    const result = numbers.map((number) => {
      return number * 2;
    });

---

# 83. Pattern 7 — Set

Коли важлива унікальність:

    const unique = [...new Set(numbers)];

Корисно для:

- видалення дублікатів;
- перевірки дублікатів;
- перетину;
- різниці;
- швидких перевірок наявності.

---

# 84. Pattern 8 — Map / Frequency Counter

Коли потрібно рахувати:

    const frequency = new Map();

    for (const number of numbers) {
      frequency.set(
        number,
        (frequency.get(number) ?? 0) + 1
      );
    }

Це основа наступної теми:

    06-frequency-counter

---

# 85. Pattern 9 — Two Pointers

Для деяких задач використовують два індекси:

    let left = 0;
    let right = numbers.length - 1;

Наприклад:

    [1, 2, 3, 4, 5]
     ↑           ↑
    left       right

Це дозволяє рухатися з двох сторін.

Детально:

    07-two-pointers

---

# 86. Pattern 10 — Sliding Window

Працюємо з поточним діапазоном елементів:

    [1, 2, 3, 4, 5, 6]
     └─────┘
      window

Потім вікно рухається:

    [1, 2, 3, 4, 5, 6]
        └─────┘
         window

Цей патерн особливо важливий для задач із:

- підмасивами;
- сумами;
- послідовностями;
- діапазонами.

Детально:

    08-sliding-window

---

# 87. Як вибрати між `for` і методами масиву

### Використовуй `map()`

Коли:

> кожен елемент потрібно перетворити.

    [1, 2, 3]
    ↓
    [2, 4, 6]

### Використовуй `filter()`

Коли:

> потрібно залишити частину елементів.

    [1, 2, 3, 4]
    ↓
    [2, 4]

### Використовуй `find()`

Коли:

> потрібен перший відповідний елемент.

### Використовуй `some()`

Коли:

> потрібно знати, чи є хоча б один.

### Використовуй `every()`

Коли:

> потрібно перевірити всі.

### Використовуй `reduce()`

Коли:

> багато елементів потрібно перетворити на один результат.

### Використовуй `for`

Коли:

> потрібен повний контроль над алгоритмом.

---

# 88. Часова складність

У навчальних задачах часто зустрічатимеш:

    O(1)
    O(n)
    O(n²)
    O(n log n)

## O(1)

Кількість операцій практично не залежить від розміру масиву.

    numbers[0]

---

# 89. O(n)

Один прохід:

    for (const number of numbers) {
      // ...
    }

Якщо масив має `n` елементів, ми потенційно переглянемо `n` елементів.

---

# 90. O(n²)

Два вкладені проходи:

    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < numbers.length; j++) {
        // ...
      }
    }

При збільшенні `n` кількість операцій росте значно швидше.

---

# 91. O(n log n)

Типовий приклад:

    sort()

Сортування часто має складність порядку:

    O(n log n)

Конкретна реалізація залежить від JavaScript engine.

---

# 92. Просторова складність

Потрібно думати не тільки:

> Скільки часу?

але й:

> Скільки додаткової пам'яті?

Наприклад:

    const result = [];

    for (const number of numbers) {
      result.push(number * 2);
    }

Ми створюємо новий масив.

Додаткова пам'ять залежить від кількості елементів:

    O(n)

---

# 93. In-place

**In-place** означає, що алгоритм працює переважно з існуючою структурою, не створюючи великий новий масив.

Наприклад:

    numbers.reverse();

змінює існуючий масив.

На відміну від:

    const reversed = [...numbers].reverse();

де створюється новий масив.

---

# 94. Простота проти оптимізації

Для навчання:

    const unique = [...new Set(numbers)];

може бути чудовим рішенням.

Для співбесіди можуть запитати:

> Як це працює?

> Яка складність?

> Чи можна зробити in-place?

> Яка додаткова пам'ять?

Тому важливо знати не тільки короткий синтаксис, а й алгоритмічну ідею.

---

# 95. Типові помилки

## Помилка 1 — забути `return`

    const result = numbers.map((number) => {
      number * 2;
    });

Результат:

    [undefined, undefined, undefined]

Правильно:

    const result = numbers.map((number) => {
      return number * 2;
    });

---

# 96. Помилка 2 — плутати `map()` і `filter()`

`map()`:

    [1, 2, 3]
    ↓
    [2, 4, 6]

`filter()`:

    [1, 2, 3]
    ↓
    [2]

---

# 97. Помилка 3 — мутація через `sort()`

    const sorted = numbers.sort();

Це змінює `numbers`.

Якщо потрібна копія:

    const sorted = [...numbers].sort();

---

# 98. Помилка 4 — неправильний `sort()` для чисел

    [10, 2, 5].sort();

Не використовуй це для числового сортування.

Правильно:

    [10, 2, 5].sort((a, b) => a - b);

---

# 99. Помилка 5 — неправильна межа циклу

Помилка:

    for (let i = 0; i <= numbers.length; i++) {
      console.log(numbers[i]);
    }

Останній правильний індекс:

    numbers.length - 1

Тому:

    for (let i = 0; i < numbers.length; i++) {
      console.log(numbers[i]);
    }

---

# 100. Помилка 6 — неправильне початкове значення

Не завжди:

    let max = 0;

правильно.

Для негативних чисел це може зламати алгоритм.

---

# 101. Помилка 7 — не врахувати порожній масив

Функція:

    findMax([])

повинна мати визначену поведінку.

Наприклад:

    return undefined;

або:

    throw new Error("Array must not be empty");

Вибір залежить від контракту функції.

---

# 102. Помилка 8 — порівнювати масиви через `===`

    [1, 2] === [1, 2];

    // false

Потрібно порівнювати елементи або використовувати відповідний алгоритм.

---

# 103. Помилка 9 — використовувати `includes()` у вкладеному циклі без потреби

Наприклад:

    for (const number of first) {
      if (second.includes(number)) {
        // ...
      }
    }

Для великих масивів це може бути повільніше.

Можна подумати про:

    const secondSet = new Set(second);

а потім:

    secondSet.has(number);

---

# 104. Як розв'язувати Array Problem

Використовуй такий алгоритм мислення.

## Крок 1 — прочитай умову

Що потрібно отримати?

---

## Крок 2 — визнач input

Наприклад:

    numbers: number[]

---

## Крок 3 — визнач output

Наприклад:

    number

або:

    number[]

або:

    boolean

---

## Крок 4 — придумай простий приклад

Наприклад:

    [2, 5, 1, 8]

Пошук максимуму:

    8

---

## Крок 5 — подумай про edge cases

    []
    [5]
    [-1, -2]
    [5, 5, 5]

---

## Крок 6 — придумай алгоритм словами

Наприклад:

> Почати з першого числа як максимуму. Перебрати всі наступні числа. Якщо поточне число більше — зробити його новим максимумом.

---

## Крок 7 — тільки тепер код

---

## Крок 8 — перевір тестами

---

## Крок 9 — оцінити складність

Наприклад:

    Time: O(n)
    Space: O(1)

---

# 105. Приклад повного розбору задачі

## Задача

Знайти найбільше число в масиві.

### Input

    [4, 8, 2, 10, 6]

### Output

    10

### Алгоритм

1. Взяти перший елемент.
2. Вважати його максимумом.
3. Перебрати решту.
4. Якщо поточний елемент більший — оновити максимум.
5. Повернути максимум.

### Код

    function findMax(numbers) {
      if (numbers.length === 0) {
        return undefined;
      }

      let max = numbers[0];

      for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
          max = numbers[i];
        }
      }

      return max;
    }

### Complexity

    Time: O(n)
    Space: O(1)

---

# 106. Практичні задачі для тренування

## Beginner

### 1. Сума

Знайти суму всіх чисел.

    sum([1, 2, 3, 4]);

Результат:

    10

---

### 2. Максимум

    findMax([5, 10, 3, 8]);

Результат:

    10

---

### 3. Мінімум

    findMin([5, 10, 3, 8]);

Результат:

    3

---

### 4. Кількість парних

    countEven([1, 2, 4, 7, 8]);

Результат:

    3

---

### 5. Подвоїти числа

    double([1, 2, 3]);

Результат:

    [2, 4, 6]

---

### 6. Залишити позитивні

    positiveNumbers([-2, 5, -1, 8]);

Результат:

    [5, 8]

---

### 7. Знайти число

    findNumber([10, 20, 30], 20);

Результат:

    1

---

# 107. Junior

### 8. Видалити дублікати

    unique([1, 2, 2, 3, 3]);

Результат:

    [1, 2, 3]

---

### 9. Перевірити дублікати

    hasDuplicates([1, 2, 3]);

    // false

    hasDuplicates([1, 2, 2, 3]);

    // true

---

### 10. Другий максимум

    secondMax([10, 5, 20, 8]);

Результат:

    10

---

### 11. Перемістити нулі

    moveZeros([0, 1, 0, 3, 12]);

Результат:

    [1, 3, 12, 0, 0]

---

### 12. Перевірити сортування

    isSorted([1, 2, 3, 4]);

    // true

---

### 13. Об'єднати два масиви без дублікатів

    mergeUnique([1, 2, 3], [2, 3, 4]);

Результат:

    [1, 2, 3, 4]

---

# 108. Junior+

### 14. Перетин масивів

    intersection(
      [1, 2, 3],
      [2, 3, 4]
    );

Результат:

    [2, 3]

---

### 15. Різниця масивів

    difference(
      [1, 2, 3],
      [2, 3, 4]
    );

Результат:

    [1]

---

### 16. Частоти

    frequency([1, 2, 2, 3, 3, 3]);

Результат:

    1 → 1
    2 → 2
    3 → 3

---

### 17. Перший унікальний

    firstUnique([2, 3, 2, 4, 3]);

Результат:

    4

---

### 18. Two Sum

    twoSum([2, 7, 11, 15], 9);

Результат:

    [0, 1]

---

# 109. Middle

На наступному рівні можна тренувати:

- Two Sum через `Map`;
- пошук підмасивів;
- максимальну суму підмасиву;
- Two Pointers;
- Sliding Window;
- сортування;
- binary search;
- partition;
- frequency counter;
- групування;
- пошук дублікатів;
- оптимізацію brute-force рішень.

---

# 110. Важливий перехід

Цей розділ не повинен перетворитися на:

> "Я знаю 30 методів Array."

Мета:

> "Я можу побачити задачу і вибрати відповідний алгоритмічний підхід."

Наприклад:

    "Знайти всі елементи > 10"

Ти повинен швидко побачити:

    filter()

Але:

    "Знайти найбільше число"

можна вирішити:

    for

або:

    reduce()

і потрібно розуміти, чому обидва варіанти працюють.

---

# 111. Array Problems + Full Stack

Для Full Stack JavaScript ця тема особливо важлива.

Наприклад, backend отримав:

    const users = await getUsers();

Frontend отримав JSON:

    const products = await response.json();

Далі потрібно:

- відфільтрувати;
- знайти;
- відсортувати;
- згрупувати;
- порахувати;
- перетворити;
- видалити дублікати;
- підготувати дані для UI.

Наприклад:

    const activeUsers = users.filter((user) => {
      return user.isActive;
    });

Або:

    const names = activeUsers.map((user) => {
      return user.name;
    });

---

# 112. Array Problems та SQL

Дуже корисно бачити зв'язок із базою даних.

SQL:

    SELECT *
    FROM users
    WHERE is_active = true;

У JavaScript після отримання даних:

    users.filter((user) => {
      return user.isActive;
    });

Це не одне й те саме, але логіка обробки даних часто схожа.

Тому для Full Stack розуміння масивів допомагає краще розуміти:

    SQL → Backend → JSON → JavaScript → UI

---

# 113. Array Problems та API

Типовий Full Stack потік:

    Database
        ↓
    Backend
        ↓
    JSON
        ↓
    Frontend
        ↓
    Array methods
        ↓
    UI

Наприклад:

    const response = await fetch("/api/products");

    const products = await response.json();

    const availableProducts = products.filter((product) => {
      return product.stock > 0;
    });

---

# 114. Міні-шпаргалка

## Доступ

    array[0]
    array[array.length - 1]
    array.at(-1)

## Довжина

    array.length

## Перебір

    for (...)
    for...of
    forEach()

## Перетворення

    map()

## Фільтрація

    filter()

## Пошук

    find()
    findIndex()

## Перевірка

    includes()
    some()
    every()

## Зведення

    reduce()

## Унікальність

    Set

## Частоти

    Map

## Копіювання

    [...array]
    slice()

## Об'єднання

    [...first, ...second]
    concat()

## Сортування

    sort((a, b) => a - b)

## Розворот

    reverse()

## Видалення / вставка

    splice()

---

# 115. Алгоритмічні шаблони

Запам'ятай ці базові форми.

## Counter

    let count = 0;

    for (const item of items) {
      if (condition) {
        count++;
      }
    }

## Accumulator

    let total = 0;

    for (const item of items) {
      total += value;
    }

## Maximum

    let max = items[0];

    for (const item of items) {
      if (item > max) {
        max = item;
      }
    }

## Search

    for (const item of items) {
      if (item === target) {
        return item;
      }
    }

## Build result

    const result = [];

    for (const item of items) {
      if (condition) {
        result.push(item);
      }
    }

## Frequency

    const frequency = new Map();

    for (const item of items) {
      frequency.set(
        item,
        (frequency.get(item) ?? 0) + 1
      );
    }

---

# 116. Питання для співбесіди

### Базові

1. Що таке `Array`?
2. З якого індексу починається масив?
3. Що повертає `map()`?
4. Чим `map()` відрізняється від `forEach()`?
5. Чим `filter()` відрізняється від `find()`?
6. Що повертає `find()`, якщо нічого не знайдено?
7. Що повертає `findIndex()`, якщо нічого не знайдено?
8. Для чого `some()`?
9. Для чого `every()`?
10. Для чого `reduce()`?

---

# 117. Питання про мутацію

11. Які методи змінюють масив?
12. Чи мутує `sort()`?
13. Чи мутує `reverse()`?
14. Чим `slice()` відрізняється від `splice()`?
15. Як скопіювати масив?
16. Чим відрізняється:

    const copy = [...array];

від:

    const copy = array;

---

# 118. Алгоритмічні питання

17. Як знайти максимум без `Math.max()`?
18. Як знайти мінімум?
19. Як знайти другий максимум?
20. Як видалити дублікати?
21. Як перевірити наявність дублікатів?
22. Як знайти перший унікальний елемент?
23. Як порахувати частоти?
24. Як знайти перетин двох масивів?
25. Як перевірити, чи масив відсортований?
26. Як розвернути масив?
27. Як перемістити нулі в кінець?

---

# 119. Питання про складність

28. Яка складність одного проходу по масиву?
29. Яка складність двох вкладених циклів?
30. Яка складність пошуку через `includes()`?
31. Коли `Set` може бути кориснішим за `Array`?
32. Для чого використовують `Map`?
33. Що означає `O(n)`?
34. Що означає `O(n²)`?
35. Що таке space complexity?
36. Що означає in-place алгоритм?

---

# 120. Рівень Core JavaScript

Потрібно впевнено знати:

- `Array`;
- індекси;
- `length`;
- `for`;
- `for...of`;
- `map`;
- `filter`;
- `find`;
- `findIndex`;
- `some`;
- `every`;
- `reduce`;
- `includes`;
- `slice`;
- `splice`;
- `sort`;
- `reverse`;
- spread;
- `Set`;
- `Map`;
- мутацію;
- копіювання;
- edge cases.

---

# 121. Рівень Junior

Потрібно вміти самостійно:

- знаходити максимум;
- знаходити мінімум;
- рахувати елементи;
- рахувати суму;
- фільтрувати;
- трансформувати;
- шукати;
- видаляти дублікати;
- знаходити дублікати;
- порівнювати масиви;
- знаходити перетин;
- знаходити різницю;
- працювати з масивом об'єктів;
- писати прості алгоритми через `for`;
- пояснювати свій алгоритм словами.

---

# 122. Рівень Junior+

Потрібно починати розуміти:

- brute force;
- frequency counter;
- `Set`;
- `Map`;
- два проходи;
- вкладені цикли;
- оптимізацію;
- time complexity;
- space complexity;
- two pointers;
- sliding window.

---

# 123. Рівень Middle

Можна переходити до:

- складніших підмасивів;
- Two Sum / Three Sum;
- Two Pointers;
- Sliding Window;
- Binary Search;
- складніших frequency counter;
- рекурсії;
- сортувань;
- структур даних;
- оптимізації алгоритмів.

---

# 124. Як я маю думати над Array Problem

Замість:

> "Який метод масиву тут використати?"

краще запитувати:

> "Який результат мені потрібен?"

Потім:

> "Що потрібно зробити з кожним елементом?"

Потім:

> "Чи достатньо одного проходу?"

Потім:

> "Чи потрібна додаткова структура даних?"

Потім:

> "Яка складність?"

---

# 125. Головна схема мислення

    INPUT
      ↓
    Що потрібно отримати?
      ↓
    OUTPUT
      ↓
    Які дані потрібно переглянути?
      ↓
    Один прохід?
      ↓
    Потрібна додаткова структура?
      ↓
    Алгоритм
      ↓
    Код
      ↓
    Edge Cases
      ↓
    Tests
      ↓
    Complexity
      ↓
    Optimization

---

# 126. Зв'язок з наступними темами

Цей розділ є переходом від простого використання `Array` до алгоритмів.

### 06-frequency-counter

Вчимося ефективно рахувати:

    value → count

### 07-two-pointers

Вчимося працювати з двома позиціями:

    left → ← → right

### 08-sliding-window

Вчимося ефективно працювати з підмасивами:

    [ ... window ... ]

### 09-recursion

Вчимося розв'язувати задачі через повторний виклик функції.

### 10-complexity-basics

Систематизуємо:

    Time Complexity
    Space Complexity
    Big O

---

# 127. Головне, що потрібно запам'ятати

> **Array Problems — це не вивчення великої кількості методів.**

Це навчання мислити над масивом як над даними.

Потрібно вміти:

1. пройти масив;
2. знайти елемент;
3. порахувати;
4. накопичити результат;
5. знайти min/max;
6. відфільтрувати;
7. перетворити;
8. перевірити умову;
9. знайти дублікати;
10. використати `Set`;
11. використати `Map`;
12. порівняти масиви;
13. працювати з масивом об'єктів;
14. побачити brute force;
15. подумати про оптимізацію;
16. оцінити `Time Complexity`;
17. оцінити `Space Complexity`.

---

# 128. Головна формула

    Array
      ↓
    Traverse
      ↓
    Compare
      ↓
    Count
      ↓
    Search
      ↓
    Transform
      ↓
    Filter
      ↓
    Aggregate
      ↓
    Set / Map
      ↓
    Algorithm Pattern
      ↓
    Complexity
      ↓
    Optimization

---

# 129. Фінальний чекліст

Перед переходом далі я повинен вміти без підказки:

- [ ] пройти масив через `for`;
- [ ] пройти масив через `for...of`;
- [ ] знайти максимум;
- [ ] знайти мінімум;
- [ ] знайти індекс;
- [ ] порахувати елементи;
- [ ] знайти суму;
- [ ] знайти середнє;
- [ ] використати `map()`;
- [ ] використати `filter()`;
- [ ] використати `find()`;
- [ ] використати `some()`;
- [ ] використати `every()`;
- [ ] використати `reduce()`;
- [ ] видалити дублікати через `Set`;
- [ ] перевірити дублікати;
- [ ] порахувати частоти через `Map`;
- [ ] порівняти два масиви;
- [ ] знайти перетин;
- [ ] знайти різницю;
- [ ] розвернути масив;
- [ ] правильно відсортувати числа;
- [ ] пояснити мутацію;
- [ ] пояснити `slice()` vs `splice()`;
- [ ] врахувати порожній масив;
- [ ] врахувати негативні числа;
- [ ] пояснити `O(n)`;
- [ ] пояснити `O(n²)`;
- [ ] розпізнати простий brute-force;
- [ ] пояснити свій алгоритм словами.

---

# Підсумок

**Array Problems** — це перший великий практичний рівень алгоритмічного мислення.

Тут важливо перейти від:

    "Я знаю Array methods"

до:

    "Я бачу задачу,
     визначаю дані,
     будую алгоритм,
     реалізую його,
     перевіряю edge cases
     і можу пояснити його складність."

Для Full Stack JavaScript це особливо важливо, тому що масиви постійно проходять через весь стек:

    PostgreSQL
        ↓
    Backend
        ↓
    API / JSON
        ↓
    JavaScript
        ↓
    Array Problems
        ↓
    React / Next.js
        ↓
    UI

Тому хороше володіння масивами — це не окрема алгоритмічна тема, а одна з базових навичок роботи з даними в JavaScript.