# 04. `slice()`, `substring()`, `substr()`

## Визначення

`slice()`, `substring()` та `substr()` — методи для отримання частини string.

Вони дозволяють взяти певний фрагмент рядка, не змінюючи оригінальний string.

Основний метод, який потрібно використовувати в сучасному JavaScript:

    slice()

`substring()` теж є актуальним методом, але має іншу поведінку щодо від'ємних індексів.

`substr()` — **застарілий (deprecated)** метод. У новому коді його використовувати не рекомендується.

---

# 1. Основна ідея

Нехай маємо:

    const text = "JavaScript";

Індекси:

    J a v a S c r i p t
    0 1 2 3 4 5 6 7 8 9

Можемо отримати частину:

    const result = text.slice(0, 4);

    console.log(result);
    // "Java"

---

# 2. Синтаксис `slice()`

    string.slice(start, end)

де:

• `start` — початковий індекс  
• `end` — кінцевий індекс  
• `end` **не включається**

Це дуже важливе правило:

    slice(start, end)

означає:

    від start
    до end - 1

---

# 3. Простий приклад `slice()`

    const text = "JavaScript";

    const result = text.slice(0, 4);

    console.log(result);
    // "Java"

Індекси:

    J a v a S c r i p t
    ↑       ↑
    0       4

Беремо:

    0, 1, 2, 3

Індекс `4` вже не входить.

---

# 4. `slice()` без `end`

Якщо `end` не передати, метод бере все до кінця string.

    const text = "JavaScript";

    console.log(text.slice(4));
    // "Script"

---

# 5. `slice()` з початку

    const text = "JavaScript";

    console.log(text.slice(0, 4));
    // "Java"

---

# 6. `slice()` з середини

    const text = "JavaScript";

    console.log(text.slice(4, 10));
    // "Script"

---

# 7. `slice()` до кінця

    const text = "JavaScript";

    console.log(text.slice(6));
    // "ript"

---

# 8. `slice()` і від'ємні індекси

Одна з головних переваг `slice()` — підтримка від'ємних індексів.

Від'ємний індекс рахується від кінця string.

    const text = "JavaScript";

    console.log(text.slice(-6));
    // "Script"

---

# 9. Як працюють від'ємні індекси

    const text = "JavaScript";

    // J a v a S c r i p t
    // 0 1 2 3 4 5 6 7 8 9
    // -10 -9 -8 -7 -6 -5 -4 -3 -2 -1

Тому:

    text.slice(-1);
    // "t"

    text.slice(-2);
    // "pt"

    text.slice(-6);
    // "Script"

---

# 10. Отримати останній символ

Дуже практичний патерн:

    const text = "JavaScript";

    const lastChar = text.slice(-1);

    console.log(lastChar);
    // "t"

Але для доступу до одного символу також можна використовувати:

    text.at(-1);

---

# 11. Отримати останні N символів

Наприклад, останні 3 символи:

    const text = "JavaScript";

    console.log(text.slice(-3));
    // "ipt"

Останні 5:

    console.log(text.slice(-5));
    // "cript"

---

# 12. `slice(start, end)` з від'ємним `end`

Від'ємним може бути не тільки `start`.

    const text = "JavaScript";

    console.log(text.slice(0, -6));
    // "Java"

Тут:

    -6

означає позицію за 6 символів до кінця.

---

# 13. Комбінація додатних і від'ємних індексів

    const text = "JavaScript";

    console.log(text.slice(2, -2));
    // "JavaScri"

---

# 14. `slice()` не змінює оригінальний string

String у JavaScript є immutable.

    const text = "JavaScript";

    const result = text.slice(0, 4);

    console.log(text);
    // "JavaScript"

    console.log(result);
    // "Java"

Оригінальний string залишився без змін.

---

# 15. Результат `slice()` — новий string

    const text = "JavaScript";

    const part = text.slice(0, 4);

    console.log(typeof part);
    // "string"

---

# 16. `slice()` з `start === end`

Якщо початковий і кінцевий індекси однакові:

    const text = "JavaScript";

    console.log(text.slice(4, 4));
    // ""

Результат — порожній string.

---

# 17. `slice()` з `start > end`

Це важливий випадок.

    const text = "JavaScript";

    console.log(text.slice(6, 2));
    // ""

`slice()` не міняє місцями `start` та `end`.

Якщо:

    start > end

результат:

    ""

---

# 18. `slice()` з індексом більшим за довжину

    const text = "JavaScript";

    console.log(text.slice(100));
    // ""

Індекс нормалізується до кінця string.

---

# 19. `slice()` з від'ємним індексом, більшим за довжину

    const text = "JavaScript";

    console.log(text.slice(-100));
    // "JavaScript"

Якщо від'ємний індекс виходить далеко за межі, він фактично стає `0`.

---

# 20. `substring()`

## Визначення

`substring()` також повертає частину string.

Синтаксис:

    string.substring(start, end)

Приклад:

    const text = "JavaScript";

    console.log(text.substring(0, 4));
    // "Java"

На простих додатних індексах `substring()` дуже схожий на `slice()`.

---

# 21. `substring()` без `end`

    const text = "JavaScript";

    console.log(text.substring(4));
    // "Script"

---

# 22. Головна різниця `slice()` і `substring()`

Найважливіша відмінність — робота з від'ємними індексами.

`slice()` підтримує negative indexes:

    const text = "JavaScript";

    console.log(text.slice(-6));
    // "Script"

`substring()` не підтримує negative indexes так само.

Від'ємні значення перетворюються на `0`:

    console.log(text.substring(-6));
    // "JavaScript"

Тому для сучасного коду зазвичай простіше запам'ятати:

    slice() → підтримує negative indexes

    substring() → negative indexes перетворюються на 0

---

# 23. Ще одна різниця: `start > end`

`slice()`:

    const text = "JavaScript";

    console.log(text.slice(6, 2));
    // ""

`substring()` міняє значення місцями:

    console.log(text.substring(6, 2));
    // "vaSc"

Тобто:

    slice(6, 2)
    // ""

    substring(6, 2)
    // substring(2, 6)

---

# 24. `substring()` і negative indexes

    const text = "JavaScript";

    console.log(text.substring(-3, 4));
    // "Java"

Тому що:

    -3 → 0

Фактично:

    text.substring(0, 4);

---

# 25. `substring()` з двома negative indexes

    const text = "JavaScript";

    console.log(text.substring(-5, -1));
    // ""

Обидва значення перетворюються на `0`:

    text.substring(0, 0);
    // ""

---

# 26. `substr()`

## Визначення

`substr()` — старий метод для отримання частини string.

Синтаксис:

    string.substr(start, length)

На відміну від `slice()` та `substring()` другий параметр — це **кількість символів**, а не кінцевий індекс.

Наприклад:

    const text = "JavaScript";

    console.log(text.substr(0, 4));
    // "Java"

---

# 27. `substr()` використовує `length`

Це ключова відмінність.

`slice()`:

    text.slice(0, 4);

означає:

    від індексу 0
    до індексу 4
    індекс 4 не включається

А `substr()`:

    text.substr(0, 4);

означає:

    почати з 0
    взяти 4 символи

---

# 28. Приклад різниці

    const text = "JavaScript";

    console.log(text.slice(2, 6));
    // "vaSc"

    console.log(text.substr(2, 4));
    // "vaSc"

У цьому випадку результат однаковий, але логіка різна.

---

# 29. `substr()` з одним аргументом

    const text = "JavaScript";

    console.log(text.substr(4));
    // "Script"

Починаємо з індексу `4` і беремо все до кінця.

---

# 30. `substr()` з negative `start`

Старий `substr()` допускає negative `start`.

    const text = "JavaScript";

    console.log(text.substr(-6));
    // "Script"

Але саме через те, що `substr()` є deprecated, у новому коді краще використовувати:

    text.slice(-6);

---

# 31. Чому `substr()` не рекомендується

`substr()` вважається застарілим API.

Для нового коду краще використовувати:

    slice()

або:

    substring()

А в більшості випадків:

    slice()

---

# 32. Головна рекомендація

Якщо потрібно отримати частину string:

    slice()

— перший вибір.

Приклади:

    const text = "JavaScript";

    text.slice(0, 4);
    // "Java"

    text.slice(4);
    // "Script"

    text.slice(-6);
    // "Script"

---

# 33. Порівняння трьох методів

| Метод | Другий аргумент | Negative indexes | `start > end` |
|---|---|---|---|
| `slice()` | `end` | Так | `""` |
| `substring()` | `end` | Ні, → `0` | Міняє місцями |
| `substr()` | `length` | Так для `start` | Інша логіка |

---

# 34. Найважливіша різниця

Запам'ятай:

    slice(start, end)

    substring(start, end)

    substr(start, length)

Особливо:

    slice()      → end

    substring()  → end

    substr()     → length

---

# 35. `slice()` — рекомендований варіант

У сучасному JavaScript:

    const text = "JavaScript";

    const part = text.slice(4, 10);

    console.log(part);
    // "Script"

---

# 36. Практичний приклад: ім'я

    const fullName = "Valeriy Svystun";

    const firstName = fullName.slice(0, 7);

    console.log(firstName);
    // "Valeriy"

Але для реального поділу імені за пробілом краще буде використовувати `split()`, який розглядається в окремій темі.

---

# 37. Практичний приклад: останні символи

    const phone = "+380501234567";

    const lastFour = phone.slice(-4);

    console.log(lastFour);
    // "4567"

---

# 38. Практичний приклад: маскування номера

    const phone = "+380501234567";

    const visible = phone.slice(-4);

    console.log(`****${visible}`);
    // "****4567"

---

# 39. Практичний приклад: скорочення тексту

Наприклад, потрібно показати перші 20 символів:

    const text = "JavaScript is a powerful programming language";

    const shortText = text.slice(0, 20);

    console.log(shortText);
    // "JavaScript is a power"

Можна додати `...`:

    const shortText = text.slice(0, 20) + "...";

---

# 40. Практичний приклад: slug

    const slug = "javascript-string-methods";

    const prefix = slug.slice(0, 10);

    console.log(prefix);
    // "javascript"

---

# 41. Практичний приклад: отримання року

    const date = "2026-09-14";

    const year = date.slice(0, 4);

    console.log(year);
    // "2026"

> Для реальної роботи з датами краще використовувати відповідні API дат, а не розбирати дату вручну через `slice()`.

---

# 42. Практичний приклад: отримання місяця

    const date = "2026-09-14";

    const month = date.slice(5, 7);

    console.log(month);
    // "09"

---

# 43. Практичний приклад: отримання домену

Простий приклад:

    const email = "user@example.com";

    const at = email.indexOf("@");

    const domain = email.slice(at + 1);

    console.log(domain);
    // "example.com"

Тут ми комбінуємо:

    indexOf()
        +
    slice()

Це дуже типовий JavaScript-патерн.

---

# 44. Практичний приклад: ім'я файлу

    const path = "src/components/Button.jsx";

    const slash = path.lastIndexOf("/");

    const fileName = path.slice(slash + 1);

    console.log(fileName);
    // "Button.jsx"

---

# 45. Практичний приклад: розширення файлу

    const fileName = "Button.jsx";

    const dot = fileName.lastIndexOf(".");

    const extension = fileName.slice(dot + 1);

    console.log(extension);
    // "jsx"

---

# 46. Практичний патерн

Дуже важливо розуміти комбінацію:

    search
       ↓
    position
       ↓
    slice
       ↓
    substring

Наприклад:

    const email = "user@example.com";

    const at = email.indexOf("@");

    const domain = email.slice(at + 1);

    console.log(domain);
    // "example.com"

---

# 47. `slice()` + `indexOf()`

Це один із корисних патернів роботи зі string:

    const text = "Hello JavaScript";

    const start = text.indexOf("JavaScript");

    const result = text.slice(start);

    console.log(result);
    // "JavaScript"

---

# 48. `slice()` + `lastIndexOf()`

Наприклад, отримати назву файлу:

    const path = "src/components/Button/Button.jsx";

    const position = path.lastIndexOf("/");

    const fileName = path.slice(position + 1);

    console.log(fileName);
    // "Button.jsx"

---

# 49. Копія всього string

Технічно можна:

    const text = "JavaScript";

    const copy = text.slice();

    console.log(copy);
    // "JavaScript"

Але для простого присвоєння це зазвичай непотрібно:

    const copy = text;

Оскільки string є primitive value.

---

# 50. `slice()` і Unicode

Потрібно пам'ятати, що JavaScript string працює з UTF-16 code units.

Наприклад:

    const emoji = "😀";

    console.log(emoji.length);
    // 2

Тому:

    console.log(emoji.slice(0, 1));

може повернути лише половину surrogate pair, а не повноцінний emoji.

Для звичайного ASCII-тексту ця проблема непомітна.

---

# 51. Чому це важливо

Для:

    "JavaScript"
    "Hello"
    "Database"

звичайний `slice()` працює очікувано.

А для деяких Unicode-символів:

    "😀"
    "𝌆"
    "𐍈"

один видимий символ може складатися з кількох UTF-16 code units.

Тому `slice()` не завжди відповідає поняттю "видимий символ".

---

# 52. Практичне правило Unicode

Для звичайної роботи з текстом:

    slice()

— чудово підходить.

Але якщо задача пов'язана з точним Unicode-aware розбиттям на символи, потрібно розуміти різницю між:

    code unit

та:

    Unicode code point

і використовувати відповідні підходи, наприклад:

    Array.from(string)

або:

    [...string]

---

# 53. `slice()` не мутує string

    const text = "JavaScript";

    text.slice(0, 4);

    console.log(text);
    // "JavaScript"

Метод лише повертає новий string.

Щоб зберегти результат:

    const part = text.slice(0, 4);

---

# 54. Типова помилка

❌ Очікувати, що `slice()` змінить string:

    let text = "JavaScript";

    text.slice(0, 4);

    console.log(text);
    // "JavaScript"

Правильно:

    let text = "JavaScript";

    text = text.slice(0, 4);

    console.log(text);
    // "Java"

---

# 55. `slice()` і `const`

Навіть якщо string оголошений через `const`, можна отримати його частину:

    const text = "JavaScript";

    const result = text.slice(0, 4);

    console.log(result);
    // "Java"

`const` забороняє переприсвоєння змінної, але не забороняє викликати методи string.

---

# 56. Як вибрати метод

## Потрібна частина string?

    slice()

---

## Потрібні negative indexes?

    slice()

---

## Потрібна старіша логіка з `start/end`?

    substring()

---

## Потрібно використовувати старий API?

    substr()

Але:

> Новий код — краще `slice()`.

---

# 57. `slice()` чи `substring()`?

У більшості сучасних задач:

    slice()

Причини:

• простий синтаксис  
• підтримка negative indexes  
• логічна поведінка  
• добре працює з індексами від початку і від кінця  
• один метод покриває більшість практичних випадків

---

# 58. `substring()` — коли потрібно знати

`substring()` варто знати тому, що:

• він існує в JavaScript  
• зустрічається в старому коді  
• може бути на технічній співбесіді  
• його поведінка відрізняється від `slice()`

Але не потрібно штучно використовувати його замість `slice()`.

---

# 59. `substr()` — що потрібно знати

Достатньо запам'ятати:

    substr(start, length)

і:

    substr() → deprecated

У новому коді:

    ❌ substr()

    ✅ slice()

---

# 60. Common Mistakes

## ❌ Помилка: плутати `end` і `length`

    text.slice(2, 5);

Другий аргумент:

    end = 5

А не:

    length = 5

---

## ❌ Помилка: думати, що `end` включається

    const text = "JavaScript";

    console.log(text.slice(0, 4));
    // "Java"

Індекс `4` не включається.

---

## ❌ Помилка: очікувати мутацію

    const text = "JavaScript";

    text.slice(0, 4);

    console.log(text);
    // "JavaScript"

Потрібно зберегти результат:

    const result = text.slice(0, 4);

---

## ❌ Помилка: плутати `slice()` і `substr()`

    slice(start, end)

    substr(start, length)

Це різні правила.

---

## ❌ Помилка: думати, що `substring()` підтримує negative indexes

    "JavaScript".substring(-4);
    // "JavaScript"

Negative values перетворюються на `0`.

---

## ❌ Помилка: не знати поведінку `start > end`

    "JavaScript".slice(6, 2);
    // ""

А:

    "JavaScript".substring(6, 2);
    // "vaSc"

---

# 61. Interview Questions

### 1. Що робить `slice()`?

Повертає частину string від `start` до `end`, не включаючи `end`.

---

### 2. Чи змінює `slice()` оригінальний string?

Ні.

String immutable, а `slice()` повертає новий string.

---

### 3. Чи підтримує `slice()` negative indexes?

Так.

    "JavaScript".slice(-6);
    // "Script"

---

### 4. Що означає другий аргумент `slice()`?

Кінцевий індекс:

    slice(start, end)

`end` не включається.

---

### 5. Чим `slice()` відрізняється від `substring()`?

Основна відмінність:

    slice() → підтримує negative indexes

    substring() → negative indexes → 0

Також при `start > end`:

    slice() → ""

    substring() → міняє аргументи місцями

---

### 6. Чим `substr()` відрізняється від `slice()`?

У `substr()` другий аргумент — кількість символів:

    substr(start, length)

У `slice()` — кінцевий індекс:

    slice(start, end)

---

### 7. Чи варто використовувати `substr()`?

Для нового коду — ні. Метод deprecated.

---

### 8. Який метод краще використовувати в сучасному JavaScript?

У більшості випадків:

    slice()

---

### 9. Що поверне?

    "JavaScript".slice(4);

Відповідь:

    "Script"

---

### 10. Що поверне?

    "JavaScript".slice(-3);

Відповідь:

    "ipt"

---

### 11. Що поверне?

    "JavaScript".slice(2, 5);

Відповідь:

    "vas"

---

### 12. Що поверне?

    "JavaScript".substring(-3);

Відповідь:

    "JavaScript"

Тому що `-3` перетворюється на `0`.

---

### 13. Що поверне?

    "JavaScript".slice(6, 2);

Відповідь:

    ""

---

### 14. Що поверне?

    "JavaScript".substring(6, 2);

Відповідь:

    "vaSc"

---

# 62. Learning Path

## 🟢 Core

Обов'язково знати:

    slice(start, end)

Вміти:

• отримати початок string  
• отримати кінець string  
• отримати частину string  
• використовувати negative indexes  
• пам'ятати, що `end` не включається  
• розуміти immutable strings

---

## 🟡 Junior

Додати:

    substring()

Розуміти:

• відмінність `slice()` та `substring()`  
• negative indexes  
• `start > end`  
• практичне комбінування `indexOf()` + `slice()`

---

## 🟠 Middle

Розуміти:

• Unicode та UTF-16  
• code units vs code points  
• роботу з великими текстами  
• комбінацію search → index → slice  
• створення власних utility functions для роботи з string

---

## 🔴 Senior

Глибше розуміти:

• Unicode  
• UTF-16  
• surrogate pairs  
• Unicode normalization  
• performance string operations  
• міжнародні тексти  
• правильну роботу з user-generated content

---

# 63. Практичні шаблони

## Перші N символів

    const result = text.slice(0, n);

---

## Останні N символів

    const result = text.slice(-n);

---

## Від N до кінця

    const result = text.slice(n);

---

## Від N до M

    const result = text.slice(n, m);

---

## Прибрати перший символ

    const result = text.slice(1);

---

## Прибрати останній символ

    const result = text.slice(0, -1);

---

## Прибрати перші N символів

    const result = text.slice(n);

---

## Прибрати останні N символів

    const result = text.slice(0, -n);

---

# 64. Корисні патерни

### Прибрати останній символ

    const text = "Hello!";

    const result = text.slice(0, -1);

    console.log(result);
    // "Hello"

---

### Прибрати перший символ

    const text = "#JavaScript";

    const result = text.slice(1);

    console.log(result);
    // "JavaScript"

---

### Отримати останні 4 символи

    const text = "123456789";

    const result = text.slice(-4);

    console.log(result);
    // "6789"

---

### Отримати перші 3 символи

    const text = "JavaScript";

    const result = text.slice(0, 3);

    console.log(result);
    // "Jav"

---

# 65. Mini Cheat Sheet

## `slice()`

    text.slice(start, end)

    // end не включається

---

## Від start до кінця

    text.slice(start)

---

## Останні N символів

    text.slice(-N)

---

## Від початку до N

    text.slice(0, N)

---

## Прибрати перший символ

    text.slice(1)

---

## Прибрати останній символ

    text.slice(0, -1)

---

## `substring()`

    text.substring(start, end)

    // negative → 0

    // start > end → аргументи міняються місцями

---

## `substr()`

    text.substr(start, length)

    // deprecated

---

# 66. Головна таблиця

| Завдання | Рішення |
|---|---|
| Взяти частину string | `slice()` |
| Взяти від позиції до кінця | `slice(start)` |
| Взяти останні N символів | `slice(-N)` |
| Взяти перші N символів | `slice(0, N)` |
| Прибрати перший символ | `slice(1)` |
| Прибрати останній символ | `slice(0, -1)` |
| Старий метод із `start/end` | `substring()` |
| Старий метод із `start/length` | `substr()` |
| Новий рекомендований підхід | `slice()` |

---

# 67. `slice()` у зв'язці з іншими методами

Ця тема особливо важлива не сама по собі, а як частина string processing.

Типовий ланцюжок:

    string
       ↓
    search
       ↓
    index
       ↓
    slice
       ↓
    result

Наприклад:

    const email = "user@example.com";

    const position = email.indexOf("@");

    const domain = email.slice(position + 1);

    console.log(domain);
    // "example.com"

Це вже фундамент для обробки реальних даних у frontend і backend.

---

# 68. Main Takeaways

• `slice()` — основний сучасний метод для отримання частини string.

• Синтаксис:

    slice(start, end)

• `end` не включається.

• `slice()` не змінює оригінальний string.

• `slice()` підтримує negative indexes.

• `slice(-1)` — останній символ.

• `slice(-N)` — останні `N` символів.

• `slice(0, N)` — перші `N` символів.

• `slice(1)` — все, крім першого символу.

• `slice(0, -1)` — все, крім останнього символу.

• `substring()` схожий на `slice()`, але не підтримує negative indexes таким самим способом.

• `substring()` при `start > end` міняє аргументи місцями.

• `substr()` використовує `length`, а не `end`.

• `substr()` — deprecated, тому в новому коді краще `slice()`.

• `indexOf()` + `slice()` — дуже корисна комбінація для практичної роботи зі string.

• Для Unicode потрібно пам'ятати про UTF-16 та surrogate pairs.

---

# 69. Головне правило

> Якщо тобі потрібно **взяти частину string** — у сучасному JavaScript спочатку подумай про `slice()`.

    slice(start, end)

    start → звідки почати

    end → де зупинитися

    end → НЕ включається

А якщо потрібно взяти символи з кінця:

    slice(-N)

Це один із найкорисніших і найчастіше використовуваних патернів JavaScript.