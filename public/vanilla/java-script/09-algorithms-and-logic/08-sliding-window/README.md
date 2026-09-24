# 08. Sliding Window

## 📌 Що таке Sliding Window

**Sliding Window** («ковзне вікно») — це алгоритмічний патерн для роботи з **послідовними ділянками даних**:

- масивами;
- рядками;
- підмасивами;
- підрядками;
- послідовностями чисел;
- потоками даних.

Основна ідея:

> Замість того щоб щоразу заново перебирати всю ділянку даних, ми підтримуємо поточне «вікно» і переміщуємо його по масиву або рядку.

Це часто дозволяє замінити алгоритм `O(n²)` на `O(n)`.

---

# 📁 Місце в структурі

    09-algorithms-and-logic/
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

---

# 🧠 Головна ідея

Уявімо масив:

    [2, 1, 5, 1, 3, 2]

Потрібно знайти максимальну суму **трьох послідовних елементів**.

Вікно розміром `3` спочатку:

    [2, 1, 5] 1 3 2
     ↑     ↑
    left  right

Сума:

    2 + 1 + 5 = 8

Потім вікно рухається:

    2 [1, 5, 1] 3 2

Не потрібно заново рахувати:

    1 + 5 + 1

Ми можемо:

1. відняти елемент, який вийшов зліва;
2. додати елемент, який увійшов справа.

Було:

    2 + 1 + 5 = 8

Рух:

    8 - 2 + 1 = 7

Наступне:

    7 - 1 + 3 = 9

Отже:

    2 1 5 1 3 2
    └─────┘       = 8
      └─────┘     = 7
        └─────┘   = 9
          └─────┘ = 6

Максимальна сума:

    9

---

# 🔑 Головне правило

> **Sliding Window підтримує інформацію про поточну ділянку даних і переміщує цю ділянку, не перераховуючи її повністю.**

Типовий рух:

    add new
    remove old
    move window

Саме це і дає виграш у складності.

---

# 📌 Два основних типи Sliding Window

Є два основних варіанти:

1. **Fixed-size window** — вікно фіксованого розміру.
2. **Variable-size window** — розмір вікна змінюється залежно від умови.

---

# 1. Fixed-size Sliding Window

## 📌 Фіксоване вікно

Розмір вікна завжди однаковий.

Наприклад:

> Знайти максимальну суму `k` послідовних елементів.

Для:

    [2, 1, 5, 1, 3, 2]

і:

    k = 3

маємо:

    [2, 1, 5]
     [1, 5, 1]
      [5, 1, 3]
       [1, 3, 2]

---

# 🧩 Наївне рішення

Можна для кожного положення заново рахувати суму.

    function maxSum(numbers, k) {
      let max = -Infinity;

      for (let i = 0; i <= numbers.length - k; i++) {
        let sum = 0;

        for (let j = i; j < i + k; j++) {
          sum += numbers[j];
        }

        max = Math.max(max, sum);
      }

      return max;
    }

Тут кожне вікно обробляється окремо.

Складність:

    O(n * k)

Якщо `k` залежить від `n`, у гіршому випадку це може бути:

    O(n²)

---

# 🚀 Sliding Window рішення

Замість повторного підсумовування використовуємо попередню суму.

    function maxSum(numbers, k) {
      if (k <= 0 || k > numbers.length) {
        return null;
      }

      let windowSum = 0;

      for (let i = 0; i < k; i++) {
        windowSum += numbers[i];
      }

      let maxSum = windowSum;

      for (let right = k; right < numbers.length; right++) {
        windowSum += numbers[right];
        windowSum -= numbers[right - k];

        maxSum = Math.max(maxSum, windowSum);
      }

      return maxSum;
    }

Результат:

    maxSum([2, 1, 5, 1, 3, 2], 3);
    // 9

Складність:

    Time:  O(n)
    Space: O(1)

---

# 🔍 Як працює fixed window

Початкове вікно:

    [2, 1, 5] 1 3 2

    windowSum = 8

Додаємо `1`:

    2 1 5 [1] 3 2
          ↑

    windowSum = 8 + 1

Видаляємо `2`, який залишив вікно:

    2 1 5 1 3 2
    ↑

    windowSum = 8 + 1 - 2
    windowSum = 7

Нове вікно:

    2 [1, 5, 1] 3 2

---

# 📌 Альтернативний запис через left/right

Можна явно використовувати два індекси:

    function maxSum(numbers, k) {
      if (k <= 0 || k > numbers.length) {
        return null;
      }

      let left = 0;
      let windowSum = 0;
      let maxSum = -Infinity;

      for (let right = 0; right < numbers.length; right++) {
        windowSum += numbers[right];

        if (right - left + 1 === k) {
          maxSum = Math.max(maxSum, windowSum);

          windowSum -= numbers[left];
          left++;
        }
      }

      return maxSum;
    }

Тут:

    left
      ↓
    [ 2  1  5 ] 1 3 2
                ↑
               right

Після обробки вікна:

    windowSum -= numbers[left];
    left++;

---

# 🧠 Формула розміру вікна

Якщо є:

    left
    right

то розмір вікна:

    right - left + 1

Цю формулу потрібно добре запам'ятати.

Наприклад:

    left = 2
    right = 4

Тоді:

    4 - 2 + 1 = 3

Вікно має три елементи.

---

# 2. Variable-size Sliding Window

## 📌 Вікно змінного розміру

Тут ми не знаємо наперед точний розмір вікна.

Вікно розширюється:

    right++

а коли умова порушується — звужується:

    left++

Типова схема:

    for (let right = 0; right < numbers.length; right++) {
      // додаємо numbers[right] у вікно

      while (умова_порушена) {
        // видаляємо numbers[left]
        left++;
      }

      // використовуємо поточне вікно
    }

---

# 🔥 Класичний приклад

## Найдовший підмасив із сумою <= target

Маємо:

    [2, 1, 5, 2, 3, 2]

Потрібно знайти найдовший послідовний підмасив, сума якого:

    <= 7

Поступово розширюємо вікно.

    [2]
    sum = 2

    [2, 1]
    sum = 3

    [2, 1, 5]
    sum = 8

Тепер умова порушена:

    8 > 7

Звужуємо вікно зліва:

    [1, 5]
    sum = 6

Тепер знову можемо розширювати.

---

# 🧩 Реалізація

    function longestSubarray(numbers, target) {
      let left = 0;
      let sum = 0;
      let maxLength = 0;

      for (let right = 0; right < numbers.length; right++) {
        sum += numbers[right];

        while (sum > target) {
          sum -= numbers[left];
          left++;
        }

        const length = right - left + 1;

        maxLength = Math.max(maxLength, length);
      }

      return maxLength;
    }

    console.log(
      longestSubarray([2, 1, 5, 2, 3, 2], 7)
    );

    // 3

Одне з максимальних вікон:

    [2, 1, 5]

його сума:

    8

але воно вже більше `7`, тому правильне вікно може бути:

    [1, 5, 1?]

Для конкретного масиву важливо уважно перевіряти умову.

Головне тут — не конкретний результат, а механізм:

    expand → check → shrink → update answer

---

# ⚠️ Важливе обмеження

Такий підхід для задачі про суму `<= target` найпростіше працює, коли числа **невід'ємні**.

Наприклад:

    [2, 1, 5, 2]

Якщо з'являються від'ємні числа:

    [2, -10, 5, 2]

то проста логіка:

    while (sum > target)

може вже не давати потрібних властивостей.

Тому завжди потрібно дивитися на умови задачі.

---

# 📌 Типовий шаблон variable window

    function slidingWindow(data) {
      let left = 0;

      for (let right = 0; right < data.length; right++) {
        // 1. Додаємо data[right] у вікно

        while (/* умова порушена */) {
          // 2. Видаляємо data[left] з вікна
          left++;
        }

        // 3. Оновлюємо результат
      }
    }

Це один із найважливіших шаблонів цього розділу.

---

# 🔥 Приклад: найдовший підрядок без повторюваних символів

Рядок:

    "abcabcbb"

Потрібно знайти довжину найдовшого підрядка без повторів.

Очікуваний результат:

    3

Наприклад:

    "abc"

---

# 🧠 Ідея

Використовуємо:

- `left`;
- `right`;
- `Set`.

`Set` зберігає символи поточного вікна.

Поки символи не повторюються — розширюємо вікно.

Якщо символ уже є — звужуємо вікно зліва.

---

# 🧩 Реалізація

    function longestUniqueSubstring(text) {
      const chars = new Set();

      let left = 0;
      let maxLength = 0;

      for (let right = 0; right < text.length; right++) {
        while (chars.has(text[right])) {
          chars.delete(text[left]);
          left++;
        }

        chars.add(text[right]);

        const length = right - left + 1;

        maxLength = Math.max(maxLength, length);
      }

      return maxLength;
    }

    console.log(
      longestUniqueSubstring("abcabcbb")
    );

    // 3

---

# 🔍 Візуально

Для:

    "abcabcbb"

На початку:

    [a b c] a b c b b
     ↑     ↑
    left  right

Поточне вікно:

    "abc"

Потім зустрічаємо ще `a`.

Вікно:

    [a b c a]

містить повтор.

Тому видаляємо символи зліва:

    [b c a]

Тепер усі символи унікальні.

---

# 📌 Sliding Window + Set

Це дуже поширена комбінація:

    Sliding Window
          +
         Set

Вона особливо корисна для задач:

- унікальних символів;
- відсутності повторів;
- пошуку найдовшого підрядка;
- перевірки обмежень у поточному вікні.

---

# 🔥 Приклад: максимальна кількість голосних

Потрібно знайти максимальну кількість голосних у підрядку довжиною `k`.

Наприклад:

    "abciiidef"

    k = 3

Вікна:

    "abc"
    "bci"
    "cii"
    "iii"
    "iid"
    "ide"
    "def"

Максимум:

    "iii"

Кількість голосних:

    3

---

# 🧩 Реалізація

    function maxVowels(text, k) {
      const vowels = new Set(["a", "e", "i", "o", "u"]);

      let count = 0;

      for (let i = 0; i < k; i++) {
        if (vowels.has(text[i])) {
          count++;
        }
      }

      let maxCount = count;

      for (let right = k; right < text.length; right++) {
        if (vowels.has(text[right])) {
          count++;
        }

        const left = right - k;

        if (vowels.has(text[left])) {
          count--;
        }

        maxCount = Math.max(maxCount, count);
      }

      return maxCount;
    }

    console.log(
      maxVowels("abciiidef", 3)
    );

    // 3

---

# 🧠 Що відбувається

Було:

    "abc"

Кількість голосних:

    1

Наступне вікно:

    "bci"

Ми:

    + "i"
    - "a"

Отримуємо:

    1

Наступне:

    "cii"

    + "i"
    - "b"

Отримуємо:

    2

Наступне:

    "iii"

    + "i"
    - "c"

Отримуємо:

    3

Ми не рахуємо голосні з нуля для кожного вікна.

---

# 📌 Fixed Window vs Variable Window

| Fixed Window | Variable Window |
|---|---|
| Розмір відомий | Розмір змінюється |
| `k` | залежить від умови |
| додаємо новий елемент | розширюємо |
| видаляємо старий | звужуємо |
| часто `right - k` | часто `left++` |
| max/min/sum/count | longest/shortest/condition |

---

# 🔥 Fixed Window — типовий шаблон

    let windowValue = 0;

    // Перше вікно
    for (let i = 0; i < k; i++) {
      windowValue += data[i];
    }

    let result = windowValue;

    // Рухаємо вікно
    for (let right = k; right < data.length; right++) {
      windowValue += data[right];
      windowValue -= data[right - k];

      result = Math.max(result, windowValue);
    }

---

# 🔥 Variable Window — типовий шаблон

    let left = 0;

    for (let right = 0; right < data.length; right++) {
      // add data[right]

      while (/* window invalid */) {
        // remove data[left]
        left++;
      }

      // update result
    }

---

# 📌 Що можна зберігати у вікні

Вікно — це не обов'язково окремий масив.

Не потрібно робити:

    const window = data.slice(left, right + 1);

на кожному кроці.

Це може погіршити ефективність.

Замість цього можна підтримувати:

### Суму

    let sum = 0;

### Кількість

    let count = 0;

### `Set`

    const chars = new Set();

### `Map`

    const frequency = new Map();

### Інші агреговані дані

Наприклад:

    min
    max
    frequency
    count
    sum

Головна ідея:

> Зберігати лише ту інформацію, яка потрібна для умови задачі.

---

# 🧠 Sliding Window + Frequency Counter

Sliding Window часто працює разом із **Frequency Counter**.

Наприклад, потрібно знайти підрядок, де символи відповідають певній частоті.

Тоді:

    Sliding Window
          +
    Frequency Counter
          +
         Map

Наприклад:

    const frequency = new Map();

    frequency.set("a", 2);
    frequency.set("b", 1);

Під час руху вікна:

    add character
    increase frequency

А коли елемент виходить:

    decrease frequency
    delete if frequency === 0

---

# 🔥 Приклад частот у вікні

    function windowFrequency(text, k) {
      const frequency = new Map();

      for (let i = 0; i < k; i++) {
        const char = text[i];

        frequency.set(
          char,
          (frequency.get(char) ?? 0) + 1
        );
      }

      for (let right = k; right < text.length; right++) {
        const added = text[right];

        frequency.set(
          added,
          (frequency.get(added) ?? 0) + 1
        );

        const removed = text[right - k];

        const count = frequency.get(removed);

        if (count === 1) {
          frequency.delete(removed);
        } else {
          frequency.set(removed, count - 1);
        }
      }

      return frequency;
    }

Це вже комбінація:

    Sliding Window
          +
       Map
          +
    Frequency Counter

---

# 📌 Як зрозуміти, що потрібен Sliding Window

Звертай увагу на формулювання задачі.

Особливо на слова:

- contiguous;
- consecutive;
- subarray;
- substring;
- window;
- range;
- longest;
- shortest;
- maximum;
- minimum;
- exactly `k`;
- at most `k`;
- at least `k`.

Українською:

- послідовний;
- підмасив;
- підрядок;
- ділянка;
- відрізок;
- найдовший;
- найкоротший;
- максимальний;
- мінімальний;
- рівно `k`;
- не більше `k`;
- не менше `k`.

---

# ⚠️ Sliding Window працює саме з послідовною ділянкою

Це важливо.

Наприклад:

    [1, 2, 3, 4, 5]

Підмасив:

    [2, 3, 4]

є послідовним.

А:

    [1, 3, 5]

не є одним послідовним вікном.

Тому не кожна задача про «вибір елементів» є Sliding Window.

---

# 🆚 Sliding Window vs Two Pointers

Ці поняття дуже близькі.

**Two Pointers** — ширший патерн.

**Sliding Window** — один із способів використання двох меж.

Наприклад:

    left
      ↓
    [ 1 2 3 4 ]
            ↑
           right

У Sliding Window `left` і `right` визначають поточний діапазон.

---

# 📌 Two Pointers

Two Pointers може використовуватися для:

- пошуку пари;
- паліндрому;
- reverse;
- merge;
- linked list;
- видалення дублікатів.

Наприклад:

    left →          ← right
    [1, 2, 3, 4, 5, 6]

А Sliding Window зазвичай означає:

> `left` і `right` визначають поточну послідовну ділянку.

---

# 🆚 Sliding Window vs Frequency Counter

Frequency Counter відповідає на питання:

> Скільки разів зустрічається кожен елемент?

Sliding Window відповідає на питання:

> Що відбувається всередині поточної послідовної ділянки?

Вони можуть використовуватися разом.

Наприклад:

    Sliding Window
          ↓
    current substring
          ↓
       Map
          ↓
    character frequency

---

# 🆚 Sliding Window vs Brute Force

## Brute Force

Для кожної можливої ділянки:

    створити / перебрати вікно
    ↓
    повністю його обробити

Може отримати:

    O(n²)

або навіть більше.

## Sliding Window

Замість цього:

    додати новий елемент
    ↓
    видалити старий
    ↓
    оновити стан

Часто:

    O(n)

---

# 📊 Приклад складності

Маємо:

    n = 1,000,000

Brute Force:

    O(n²)

може означати величезну кількість операцій.

Sliding Window:

    O(n)

проходить масив приблизно один раз.

Тому цей патерн особливо важливий для великих масивів і рядків.

---

# 🧠 Чому variable window часто O(n)

На перший погляд є:

    for
      +
    while

і може здатися:

    O(n²)

Але `left` не рухається назад.

Наприклад:

    right →
    0 1 2 3 4 5 6 7

`right` проходить масив один раз.

`left` також проходить масив максимум один раз:

    left →
    0 1 2 3 4 5 6 7

Тому сумарно:

    right moves <= n
    left moves  <= n

Отримуємо:

    O(n)

---

# ⚠️ Важливе правило амортизованої складності

Якщо кожен елемент:

- один раз входить у вікно;
- один раз виходить із вікна;

то загальна кількість операцій часто буде:

    O(n)

Навіть якщо всередині `for` є `while`.

---

# 📌 Приклад

    let left = 0;

    for (let right = 0; right < data.length; right++) {
      // додали елемент

      while (condition) {
        // видалили елемент
        left++;
      }
    }

Не потрібно автоматично говорити:

    for = O(n)
    while = O(n)
    разом O(n²)

Потрібно дивитися, **скільки разів реально рухається кожен pointer**.

---

# 🔥 Задача: мінімальна довжина підмасиву

Класичний тип задачі:

> Знайти мінімальну довжину підмасиву, сума якого >= target.

Наприклад:

    numbers = [2, 3, 1, 2, 4, 3]
    target = 7

Одне з відповідних вікон:

    [4, 3]

Довжина:

    2

---

# 🧩 Реалізація

    function minSubarrayLength(target, numbers) {
      let left = 0;
      let sum = 0;
      let minLength = Infinity;

      for (let right = 0; right < numbers.length; right++) {
        sum += numbers[right];

        while (sum >= target) {
          const length = right - left + 1;

          minLength = Math.min(
            minLength,
            length
          );

          sum -= numbers[left];
          left++;
        }
      }

      return minLength === Infinity
        ? 0
        : minLength;
    }

    console.log(
      minSubarrayLength(
        7,
        [2, 3, 1, 2, 4, 3]
      )
    );

    // 2

---

# 🧠 Логіка

Для задачі:

    sum >= target

ми:

### 1. Розширюємо

    right++

### 2. Коли умова виконана

    sum >= target

починаємо звужувати.

### 3. Перевіряємо довжину

    right - left + 1

### 4. Видаляємо лівий елемент

    sum -= numbers[left]

### 5. Рухається `left`

    left++

Це типовий **minimum window** pattern.

---

# 📌 Maximum vs Minimum Window

Для задач на максимальну довжину часто:

    maxLength = Math.max(
      maxLength,
      currentLength
    );

Для мінімальної:

    minLength = Math.min(
      minLength,
      currentLength
    );

Але головне не сама функція `Math.max()` / `Math.min()`.

Головне:

> Коли саме ми повинні оновлювати результат?

---

# 🔥 Типова логіка

## Maximum valid window

    expand
    ↓
    restore validity if needed
    ↓
    update maximum

Наприклад:

    while (invalid) {
      shrink
    }

    update max

---

## Minimum valid window

    expand
    ↓
    while (valid) {
      update minimum
      shrink
    }

Це дуже важлива відмінність.

---

# 📌 `at most K`

Частий тип задач:

> Знайти найдовший підмасив, який містить не більше `K` різних значень.

Наприклад:

    [1, 2, 1, 2, 3]

і:

    k = 2

Вікно:

    [1, 2, 1, 2]

має два різні значення.

Коли додаємо `3`:

    [1, 2, 1, 2, 3]

маємо три.

Потрібно звужувати:

    [2, 1, 2, 3]

все ще три.

Ще:

    [1, 2, 3]

три.

Ще:

    [2, 3]

два.

---

# 🧩 Реалізація через Map

    function longestAtMostKDistinct(numbers, k) {
      const frequency = new Map();

      let left = 0;
      let maxLength = 0;

      for (let right = 0; right < numbers.length; right++) {
        const value = numbers[right];

        frequency.set(
          value,
          (frequency.get(value) ?? 0) + 1
        );

        while (frequency.size > k) {
          const leftValue = numbers[left];

          const count = frequency.get(leftValue);

          if (count === 1) {
            frequency.delete(leftValue);
          } else {
            frequency.set(
              leftValue,
              count - 1
            );
          }

          left++;
        }

        const length = right - left + 1;

        maxLength = Math.max(
          maxLength,
          length
        );
      }

      return maxLength;
    }

---

# 🧠 Що тут важливо

`Map` показує:

    скільки разів значення зустрічається
    у поточному вікні

`frequency.size` показує:

    кількість різних значень

Коли:

    frequency.size > k

вікно недійсне.

Тоді:

    shrink

---

# 📌 Чому не можна просто використовувати Set?

Якщо потрібно знати тільки:

    є значення чи немає

можна використати:

    Set

Але якщо потрібно знати:

    скільки разів значення зустрічається

потрібен:

    Map

Наприклад:

    [a, b, a, c]

Map:

    a → 2
    b → 1
    c → 1

---

# 🔥 Sliding Window для рядків

Sliding Window особливо часто зустрічається у задачах з:

    strings
    substrings
    characters
    frequency

Приклади:

- найдовший підрядок без повторів;
- найдовший підрядок із `K` різними символами;
- найкоротший підрядок, який містить потрібні символи;
- кількість голосних у вікні;
- пошук анаграм;
- перевірка частот символів.

---

# 📌 Sliding Window і Unicode

У простих задачах можна працювати:

    text[index]

Але JavaScript рядки працюють з UTF-16 code units.

Для складніших Unicode-задач можуть знадобитися:

    [...text]

або:

    Array.from(text)

Наприклад:

    const chars = [...text];

Це важливо, якщо алгоритм повинен коректно працювати з широким набором Unicode-символів.

---

# 🧠 Sliding Window не означає обов'язково масив

Вікном може бути:

    array[left...right]

або:

    string[left...right]

або логічний діапазон даних.

Не обов'язково фізично створювати:

    data.slice(left, right + 1)

на кожній ітерації.

Частіше достатньо:

    left
    right
    state

---

# 📌 Три складові Sliding Window

Практично кожна задача має три частини:

### 1. Expand

Рухаємо:

    right++

і додаємо новий елемент.

### 2. Shrink

Коли умова порушена або коли потрібно шукати менше вікно:

    left++

і видаляємо старий елемент.

### 3. Update answer

Оновлюємо:

    max
    min
    count
    result

---

# 🧩 Універсальний mental model

Запам'ятай:

    LEFT                         RIGHT
      ↓                            ↓
    [    current valid window      ]

                 ↓

          expand → right++

                 ↓

          check condition

                 ↓

       condition violated?
              /       \
            yes        no
             ↓          ↓
          shrink       continue
          left++          

                 ↓

          update answer

---

# ⚠️ Типові помилки

## 1. Переплутати Sliding Window з Two Pointers

Не кожна задача з двома індексами є Sliding Window.

Потрібно, щоб вони визначали:

    поточний послідовний діапазон

---

## 2. Неправильно рахувати розмір

Неправильно:

    right - left

Правильно:

    right - left + 1

якщо обидві межі включені.

---

## 3. Забути видалити елемент

Якщо елемент вийшов із вікна, потрібно оновити стан.

Наприклад:

    sum -= numbers[left];

або:

    chars.delete(text[left]);

або:

    frequency.set(...)

---

## 4. Забути `left++`

Наприклад:

    while (condition) {
      sum -= numbers[left];
    }

Це нескінченний цикл.

Потрібно:

    while (condition) {
      sum -= numbers[left];
      left++;
    }

---

## 5. Створювати `slice()` кожного разу

Не варто без необхідності:

    const window = numbers.slice(
      left,
      right + 1
    );

на кожній ітерації.

Це створює новий масив.

Частіше достатньо працювати через індекси.

---

## 6. Неправильно вибрати умову `while`

Наприклад, для:

    sum <= target

і:

    sum >= target

логіка звуження буде різною.

Завжди спочатку сформулюй:

> Коли поточне вікно стає недійсним?

---

## 7. Не врахувати умови задачі

Особливо для задач із сумою.

Класичний variable Sliding Window для суми часто спирається на те, що числа:

    >= 0

Якщо є від'ємні числа, потрібно перевірити, чи зберігається потрібна властивість.

---

# 📌 Sliding Window + сортування

На відміну від деяких Two Pointers задач, Sliding Window зазвичай працює із **початковим порядком елементів**.

Тому сортування може зруйнувати сенс задачі.

Наприклад:

    [5, 1, 4, 2]

Послідовний підмасив:

    [1, 4]

має значення саме тому, що `1` і `4` стоять поруч.

Якщо зробити:

    [1, 2, 4, 5]

це вже інша послідовність.

Тому не сортуй дані автоматично.

---

# 📊 Sliding Window і складність

Типовий випадок:

    Time:  O(n)
    Space: O(1)

Але додаткові структури можуть збільшити пам'ять:

    Set  → O(k)
    Map  → O(k)

де `k` — кількість елементів/різних значень у поточному вікні.

Наприклад:

    Sliding Window + Set

може мати:

    Time:  O(n)
    Space: O(k)

---

# 🧠 Що потрібно реально запам'ятати

Не потрібно запам'ятовувати десятки готових алгоритмів.

Потрібно розуміти механіку:

    left
    right
    current window
    expand
    shrink
    update result

І вміти відповісти:

1. Що входить у вікно?
2. Що виходить із вікна?
3. Яка умова робить вікно валідним?
4. Коли потрібно рухати `right`?
5. Коли потрібно рухати `left`?
6. Що потрібно зберігати про вікно?
7. Що потрібно оптимізувати — максимум, мінімум, кількість?

---

# 🧪 Практичні вправи

## 🟢 Beginner

### 1. Максимальна сума `k` елементів

    maxSum([2, 1, 5, 1, 3, 2], 3);

Очікувано:

    9

---

### 2. Максимальна кількість голосних

    maxVowels("abciiidef", 3);

Очікувано:

    3

---

### 3. Мінімальна довжина підмасиву

    minSubarrayLength(
      7,
      [2, 3, 1, 2, 4, 3]
    );

Очікувано:

    2

---

# 🟡 Junior

### 4. Найдовший підрядок без повторів

    longestUniqueSubstring("abcabcbb");

Очікувано:

    3

---

### 5. Найдовший підмасив із сумою `<= target`

Реалізувати:

    longestSubarray(numbers, target);

---

### 6. Не більше `K` різних значень

Реалізувати:

    longestAtMostKDistinct(
      numbers,
      k
    );

---

# 🟠 Junior+

### 7. Частота символів у кожному вікні

Для:

    "aabbcc"

і:

    k = 3

рухати вікно та підтримувати:

    Map<char, count>

---

### 8. Пошук анаграм

Дано:

    text = "cbaebabacd"
    pattern = "abc"

Потрібно знайти позиції підрядків, які є анаграмами `pattern`.

Це класична комбінація:

    Fixed Sliding Window
          +
    Frequency Counter

---

### 9. Найдовший підрядок з обмеженням

Наприклад:

> Знайти найдовший підрядок, який містить не більше `K` різних символів.

---

# 🔴 Full Stack

Застосувати Sliding Window до реальних даних.

Наприклад:

### 10. API statistics

Є дані:

    [
      { date, requests },
      { date, requests },
      { date, requests }
    ]

Знайти:

> максимальну кількість запитів за будь-які 7 послідовних днів.

---

### 11. Monitoring

Дані:

    [
      { timestamp, value },
      ...
    ]

Знайти:

> максимальне середнє значення за останні 10 вимірювань.

---

### 12. PostgreSQL + Node.js

База даних містить:

    measurements

з полями:

    id
    created_at
    value

Backend отримує дані та обчислює:

    rolling average

Це вже хороший міст:

    PostgreSQL
         ↓
       Node.js
         ↓
    Sliding Window
         ↓
        API
         ↓
      Frontend

---

# 🌐 Sliding Window у Full Stack

Цей патерн корисний не тільки на coding interview.

Наприклад:

    database
        ↓
    API response
        ↓
    array
        ↓
    algorithm
        ↓
    result
        ↓
    UI

Можливі задачі:

- статистика;
- rolling average;
- останні `N` подій;
- аналіз часових рядів;
- обмеження запитів;
- обробка логів;
- аналіз користувацьких подій.

---

# ⚠️ Але не завжди потрібно робити Sliding Window у JavaScript

Наприклад, якщо PostgreSQL може ефективно порахувати результат:

    AVG(...)
    SUM(...)
    COUNT(...)
    MIN(...)
    MAX(...)

краще подумати, чи потрібно передавати весь набір даних у frontend/backend.

Для великих даних:

    Database
        ↓
    SQL
        ↓
    потрібний результат
        ↓
    API

може бути кращим варіантом.

---

# 🗄️ Sliding Window і PostgreSQL

У PostgreSQL існує інше поняття:

> **SQL Window Functions**

Наприклад:

    SUM(value) OVER (...)

Це **не те саме**, що JavaScript алгоритмічний патерн Sliding Window.

Але ідея локального/ковзного діапазону концептуально пов'язана.

Наприклад, у SQL можна рахувати значення за певний діапазон рядків або часу.

Тому важливо не плутати:

    JavaScript Sliding Window
            ≠
    SQL Window Function

---

# 🧠 Sliding Window як спосіб мислення

Замість:

> «Як перебрати всі можливі підмасиви?»

потрібно поступово навчитися думати:

> «Я можу підтримувати інформацію про поточний підмасив і лише оновлювати її, коли вікно рухається?»

Це і є основна оптимізаційна ідея.

---

# 📌 Міні-шпаргалка

## Fixed Window

    // first window
    for (let i = 0; i < k; i++) {
      state += data[i];
    }

    // slide
    for (let right = k; right < data.length; right++) {
      state += data[right];
      state -= data[right - k];
    }

---

## Variable Window

    let left = 0;

    for (let right = 0; right < data.length; right++) {
      // add right

      while (invalid) {
        // remove left
        left++;
      }

      // update answer
    }

---

## Window size

    right - left + 1

---

## Expand

    right++

---

## Shrink

    left++

---

## Maximum

    Math.max()

---

## Minimum

    Math.min()

---

## Unique values

    Set

---

## Frequency

    Map

---

## Typical complexity

    O(n)

---

# 🎯 Алгоритмічний чекліст

Коли бачиш задачу, запитай себе:

    1. Чи працюю я з contiguous data?
       ↓
    2. Це subarray або substring?
       ↓
    3. Потрібно знайти max/min/count?
       ↓
    4. Вікно фіксованого розміру?
       ↓
       Fixed Window
       або
       Variable Window
       ↓
    5. Що потрібно зберігати?
       ↓
       sum / count / Set / Map
       ↓
    6. Коли window стає invalid?
       ↓
    7. Коли рухати left?
       ↓
    8. Коли оновлювати result?
       ↓
    9. Чи можна отримати O(n)?

---

# 🎤 Питання на співбесіді

### Що таке Sliding Window?

Sliding Window — алгоритмічний патерн для ефективної роботи з послідовними ділянками масиву або рядка.

---

### Чим Fixed Window відрізняється від Variable Window?

Fixed Window має заздалегідь заданий розмір `k`.

Variable Window змінює розмір відповідно до умови задачі.

---

### Яка формула розміру вікна?

    right - left + 1

якщо обидві межі включені.

---

### Чому Sliding Window може бути O(n)?

Тому що `left` і `right` рухаються вперед, а кожен елемент часто додається та видаляється максимум один раз.

---

### Чому `for + while` не обов'язково означає O(n²)?

Тому що потрібно аналізувати загальну кількість рухів pointer'ів.

Якщо `left` і `right` кожен проходять масив максимум один раз:

    O(n)

---

### Коли використовують Set?

Коли потрібно швидко перевіряти наявність елемента у поточному вікні.

Наприклад:

    чи є цей символ?

---

### Коли використовують Map?

Коли потрібно зберігати частоту або додаткову інформацію про елементи.

Наприклад:

    character → frequency

---

### Чим Sliding Window відрізняється від Two Pointers?

Two Pointers — ширший патерн роботи з двома індексами.

Sliding Window використовує межі `left/right` для підтримки поточної послідовної ділянки.

---

### Чи можна використовувати Sliding Window для масивів із від'ємними числами?

Залежить від задачі.

Проста логіка variable window для задач із сумою часто покладається на невід'ємність чисел. При наявності від'ємних значень потрібно перевірити, чи зберігається необхідна властивість задачі.

---

# 🧠 Рівні знань

## Junior

Потрібно вміти:

- пояснити Sliding Window;
- розрізняти fixed/variable;
- використовувати `left/right`;
- рахувати розмір вікна;
- робити `expand`;
- робити `shrink`;
- вирішувати прості `O(n)` задачі.

---

## Junior+

Потрібно вміти:

- комбінувати Sliding Window + Set;
- комбінувати Sliding Window + Map;
- працювати з frequency;
- знаходити longest/shortest window;
- розуміти `at most K`;
- аналізувати складність;
- пояснювати, чому алгоритм O(n).

---

## Middle

Потрібно вміти:

- швидко розпізнавати патерн;
- будувати алгоритм із умови задачі;
- бачити обмеження застосовності;
- комбінувати Sliding Window з іншими структурами даних;
- працювати з великими наборами даних;
- переносити алгоритмічне мислення у backend;
- розуміти, коли обчислення краще виконувати в PostgreSQL, а коли в Node.js.

---

# 🔥 Що потрібно реально запам'ятати

Не треба зубрити готовий код.

Потрібно запам'ятати модель:

    ┌─────────────────────────────┐
    │       CURRENT WINDOW        │
    │                             │
    │  left                right  │
    │    ↓                    ↓   │
    │   [   data data data   ]    │
    └─────────────────────────────┘

    right++
       ↓
    EXPAND

    condition invalid
       ↓
    left++
       ↓
    SHRINK

    valid window
       ↓
    UPDATE RESULT

---

# 📌 Коротко: Sliding Window

    Sliding Window
          │
          ├── Fixed Window
          │     └── size = k
          │
          └── Variable Window
                ├── expand
                ├── shrink
                └── condition

    Основні інструменти:

    left
    right
    sum
    count
    Set
    Map

    Основна формула:

    right - left + 1

    Типова складність:

    O(n)

    Головна ідея:

    не перераховувати
    кожне вікно з нуля,
    а оновлювати
    попередній стан.

---

# 🚀 Головний висновок

**Sliding Window — це не метод JavaScript і не окрема функція.**

Це алгоритмічний патерн.

Його суть:

    створити логічне вікно
            ↓
    підтримувати його стан
            ↓
    рухати right
            ↓
    за потреби рухати left
            ↓
    оновлювати результат

Найважливіше для практики:

> **Якщо задача працює з послідовним підмасивом або підрядком і потрібно знайти максимум, мінімум, кількість або виконання певної умови, перевір, чи можна застосувати Sliding Window.**

Для твого алгоритмічного блоку це особливо важливо як зв'язка:

    Arrays / Strings
          ↓
    Two Pointers
          ↓
    Sliding Window
          ↓
    Set / Map
          ↓
    O(n)
          ↓
    Backend / API / Data Processing

Саме тут алгоритми перестають бути лише задачами з LeetCode і починають перетворюватися на практичний інструмент для JavaScript / Node.js / Full Stack розробки.