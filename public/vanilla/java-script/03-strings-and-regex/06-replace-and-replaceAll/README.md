# 06. `replace()` та `replaceAll()`

## Визначення

`replace()` та `replaceAll()` — методи рядків JavaScript для **заміни частин рядка**.

Вони широко використовуються для:

- очищення тексту;
- форматування даних;
- заміни символів;
- нормалізації введення користувача;
- обробки URL;
- підготовки даних перед збереженням;
- заміни тексту за допомогою `RegExp`.

> Головне: **рядки в JavaScript незмінні (`immutable`)**.  
> `replace()` і `replaceAll()` не змінюють оригінальний рядок, а повертають новий.

---

# 1. `replace()`

## Синтаксис

    string.replace(searchValue, replacement)

де:

- `searchValue` — текст або `RegExp`, який потрібно знайти;
- `replacement` — текст або функція, яка визначає нове значення.

### Простий приклад

    const text = "Hello world";

    const result = text.replace("world", "JavaScript");

    console.log(result);
    // "Hello JavaScript"

Оригінальний рядок не змінився:

    console.log(text);
    // "Hello world"

---

# 2. `replace()` замінює лише перший збіг

Це одна з найважливіших особливостей `replace()`.

    const text = "cat cat cat";

    const result = text.replace("cat", "dog");

    console.log(result);
    // "dog cat cat"

Замінився тільки **перший** `cat`.

---

# 3. `replaceAll()`

`replaceAll()` замінює **всі збіги** заданого тексту.

## Синтаксис

    string.replaceAll(searchValue, replacement)

### Приклад

    const text = "cat cat cat";

    const result = text.replaceAll("cat", "dog");

    console.log(result);
    // "dog dog dog"

---

# 4. Головна різниця

| Метод | Заміна |
|---|---|
| `replace()` | перший збіг |
| `replaceAll()` | усі збіги |

### `replace()`

    const text = "JavaScript is great. JavaScript is popular.";

    const result = text.replace("JavaScript", "JS");

    console.log(result);
    // "JS is great. JavaScript is popular."

### `replaceAll()`

    const text = "JavaScript is great. JavaScript is popular.";

    const result = text.replaceAll("JavaScript", "JS");

    console.log(result);
    // "JS is great. JS is popular."

---

# 5. `replace()` не змінює оригінальний рядок

Рядки є immutable.

    const text = "Hello world";

    text.replace("world", "JavaScript");

    console.log(text);
    // "Hello world"

Результат потрібно зберегти:

    const text = "Hello world";

    const newText = text.replace("world", "JavaScript");

    console.log(newText);
    // "Hello JavaScript"

Або переприсвоїти:

    let text = "Hello world";

    text = text.replace("world", "JavaScript");

    console.log(text);
    // "Hello JavaScript"

---

# 6. Заміна одного символу

`replace()` можна використовувати для заміни символу.

    const text = "hello";

    const result = text.replace("l", "L");

    console.log(result);
    // "heLlo"

Тільки перший:

    const text = "hello";

    console.log(text.replace("l", "L"));
    // "heLlo"

Усі:

    const text = "hello";

    console.log(text.replaceAll("l", "L"));
    // "heLLo"

---

# 7. Заміна пробілів

### Перший пробіл

    const text = "Hello world JavaScript";

    console.log(text.replace(" ", "-"));
    // "Hello-world JavaScript"

### Усі пробіли

    const text = "Hello world JavaScript";

    console.log(text.replaceAll(" ", "-"));
    // "Hello-world-JavaScript"

---

# 8. Видалення тексту

Щоб щось видалити, можна замінити його на порожній рядок `""`.

### Видалити перший збіг

    const text = "Hello world world";

    const result = text.replace("world", "");

    console.log(result);
    // "Hello  world"

### Видалити всі збіги

    const text = "Hello world world";

    const result = text.replaceAll("world", "");

    console.log(result);
    // "Hello  "

---

# 9. Видалення символів

Наприклад, видалити всі дефіси:

    const phone = "067-123-45-67";

    const result = phone.replaceAll("-", "");

    console.log(result);
    // "0671234567"

Це типовий приклад **нормалізації даних**.

---

# 10. Заміна роздільників

Наприклад, перетворити дату:

    const date = "2026-09-14";

    const result = date.replaceAll("-", ".");

    console.log(result);
    // "2026.09.14"

---

# 11. Заміна тексту без зміни регістру

`replace()` є **case-sensitive**.

    const text = "JavaScript javascript JAVASCRIPT";

    console.log(text.replaceAll("javascript", "JS"));
    // "JavaScript JS JAVASCRIPT"

Збіг повинен точно відповідати регістру.

---

# 12. `replace()` з `RegExp`

Першим аргументом може бути не тільки рядок, а й регулярний вираз.

    const text = "cat cat cat";

    const result = text.replace(/cat/g, "dog");

    console.log(result);
    // "dog dog dog"

Тут:

- `/cat/` — шаблон пошуку;
- `g` — global, тобто всі збіги.

---

# 13. `replace()` + `/g`

До появи `replaceAll()` часто використовували:

    const text = "cat cat cat";

    const result = text.replace(/cat/g, "dog");

    console.log(result);
    // "dog dog dog"

Фактично:

    replace("cat", "dog")

означає:

    заміни перший збіг

а:

    replace(/cat/g, "dog")

означає:

    заміни всі збіги

---

# 14. `replaceAll()` і `RegExp`

`replaceAll()` також може працювати з регулярним виразом.

Але регулярний вираз повинен мати прапорець `g`.

    const text = "cat cat cat";

    const result = text.replaceAll(/cat/g, "dog");

    console.log(result);
    // "dog dog dog"

Без `g` буде помилка:

    const text = "cat cat cat";

    text.replaceAll(/cat/, "dog");

Тому для `replaceAll()`:

    replaceAll(/pattern/g, replacement)

---

# 15. Рядок vs `RegExp`

Потрібно розуміти різницю.

### Рядок

    const text = "cat cat cat";

    text.replaceAll("cat", "dog");

### Регулярний вираз

    const text = "cat cat cat";

    text.replace(/cat/g, "dog");

Рядок зручний для простих буквальних замін.

`RegExp` потрібен, коли треба описати **шаблон**.

---

# 16. Заміна всіх цифр

За допомогою `RegExp`:

    const text = "User123 has 45 points";

    const result = text.replace(/\d/g, "#");

    console.log(result);
    // "User### has ## points"

`\d` означає цифру.

---

# 17. Видалення всіх цифр

    const text = "User123";

    const result = text.replace(/\d/g, "");

    console.log(result);
    // "User"

---

# 18. Заміна всіх пробільних символів

Для простих пробілів:

    const text = "Hello world JavaScript";

    const result = text.replaceAll(" ", "-");

    console.log(result);
    // "Hello-world-JavaScript"

За допомогою `RegExp` можна працювати з ширшим поняттям whitespace:

    const text = "Hello   world";

    const result = text.replace(/\s+/g, " ");

    console.log(result);
    // "Hello world"

Тут:

- `\s` — whitespace;
- `+` — один або більше;
- `g` — усі збіги.

---

# 19. Нормалізація пробілів

Дуже практичний приклад:

    const text = "   Hello     world    JavaScript   ";

    const normalized = text
        .trim()
        .replace(/\s+/g, " ");

    console.log(normalized);
    // "Hello world JavaScript"

Тут використовуються два етапи:

    trim()
    ↓
    прибираємо пробіли з країв

    replace(/\s+/g, " ")
    ↓
    замінюємо групи пробілів одним пробілом

---

# 20. Заміна символів у телефонному номері

Наприклад:

    const phone = "+380 (67) 123-45-67";

Можна залишити тільки цифри:

    const normalizedPhone = phone.replace(/\D/g, "");

    console.log(normalizedPhone);
    // "380671234567"

`\D` означає символ, який **не є цифрою**.

---

# 21. Заміна спеціальних символів

Наприклад, потрібно сформувати простий slug:

    const title = "JavaScript: String Methods!";

    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    console.log(slug);
    // "javascript-string-methods"

Тут `replace()` працює вже як частина невеликого алгоритму нормалізації.

---

# 22. `replace()` з функцією

Другим аргументом може бути **функція**.

Синтаксис:

    string.replace(searchValue, function(match, ...args) {
        // нове значення
    });

Функція викликається для кожного знайденого збігу.

### Простий приклад

    const text = "hello world";

    const result = text.replace(/hello/, (match) => {
        return match.toUpperCase();
    });

    console.log(result);
    // "HELLO world"

---

# 23. Функція як replacement

Це дозволяє виконувати логіку під час заміни.

    const text = "10 20 30";

    const result = text.replace(/\d+/g, (match) => {
        return Number(match) * 2;
    });

    console.log(result);
    // "20 40 60"

Послідовність:

    "10 20 30"
        ↓
    знайти числа
        ↓
    передати кожне число у функцію
        ↓
    Number(match) * 2
        ↓
    "20 40 60"

---

# 24. Заміна з використанням match

Функція отримує знайдений фрагмент як перший аргумент:

    const text = "hello world";

    const result = text.replace(/\w+/g, (match) => {
        console.log(match);
        return match.toUpperCase();
    });

    // hello
    // world

Результат:

    console.log(result);
    // "HELLO WORLD"

---

# 25. Групи в `RegExp` і `$1`

`replace()` підтримує спеціальні replacement patterns.

Наприклад:

    const name = "John Smith";

    const result = name.replace(/(\w+) (\w+)/, "$2, $1");

    console.log(result);
    // "Smith, John"

Тут:

    (\w+)
    ↓
    перша група

    (\w+)
    ↓
    друга група

А:

    $1
    ↓
    перша група

    $2
    ↓
    друга група

---

# 26. Основні replacement patterns

У `replace()` можна використовувати спеціальні конструкції:

| Pattern | Значення |
|---|---|
| `$&` | весь знайдений збіг |
| `$1`, `$2`... | відповідна capturing group |
| `$`` | текст перед збігом |
| `$'` | текст після збігу |
| `$$` | символ `$` |

Для початкового рівня найважливіше запам'ятати:

    $1
    $2

для роботи з capturing groups.

---

# 27. Практика: заміна домену

    const email = "user@example.com";

    const result = email.replace("example.com", "gmail.com");

    console.log(result);
    // "user@gmail.com"

---

# 28. Практика: заміна протоколу URL

    const url = "http://example.com";

    const secureUrl = url.replace("http://", "https://");

    console.log(secureUrl);
    // "https://example.com"

Для складніших URL краще використовувати спеціалізований `URL` API, а не будувати складну логіку через `replace()`.

---

# 29. Практика: приховування частини email

Наприклад:

    const email = "username@example.com";

Можна зробити:

    const masked = email.replace(/(?<=.{2}).(?=.*@)/g, "*");

    console.log(masked);
    // "us******@example.com"

Це вже приклад, де `replace()` використовується разом із регулярним виразом для перетворення даних.

> Для реального захисту персональних даних таку логіку потрібно проектувати уважно; це лише приклад роботи з `replace()`.

---

# 30. Практика: очищення введення користувача

Наприклад, користувач ввів номер:

    const input = "+38 (067) 123-45-67";

Можемо нормалізувати:

    const phone = input.replace(/\D/g, "");

    console.log(phone);
    // "380671234567"

---

# 31. Практика: нормалізація username

    const input = "  Valeriy_Svystun  ";

    const username = input
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");

    console.log(username);
    // "valeriy_svystun"

---

# 32. Практика: заміна HTML-символів

Іноді потрібно замінити символи:

    const text = "5 < 10";

    const result = text.replace("<", "&lt;");

    console.log(result);
    // "5 &lt; 10"

Але:

> Не слід намагатися повністю реалізовувати HTML escaping через кілька `replace()`. Для безпеки потрібно використовувати відповідні API або бібліотеки залежно від контексту.

---

# 33. Ланцюжок `replace()`

`replace()` повертає новий рядок, тому методи можна ланцюжити.

    const text = "  Hello, WORLD!  ";

    const result = text
        .trim()
        .toLowerCase()
        .replace(",", "")
        .replace("!", "");

    console.log(result);
    // "hello world"

Але якщо потрібно замінити всі коми та знаки оклику:

    const text = "Hello, world! Hello, JavaScript!";

    const result = text
        .replaceAll(",", "")
        .replaceAll("!", "");

    console.log(result);
    // "Hello world Hello JavaScript"

---

# 34. `replace()` + `trim()` + `toLowerCase()`

Це дуже типовий патерн при обробці введення користувача:

    const input = "  HELLO WORLD  ";

    const normalized = input
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

    console.log(normalized);
    // "hello world"

---

# 35. `replace()` у формах

Наприклад, користувач вводить ціну:

    const input = "1 250 грн";

    const normalized = input
        .replaceAll(" ", "")
        .replace("грн", "")
        .trim();

    console.log(normalized);
    // "1250"

Після цього можна перетворити значення:

    const price = Number(normalized);

    console.log(price);
    // 1250

---

# 36. `replace()` для форматування чисел

Наприклад, заміна крапки на кому:

    const value = "123.45";

    const formatted = value.replace(".", ",");

    console.log(formatted);
    // "123,45"

Але потрібно пам'ятати:

> `replace()` працює з рядками. Він не змінює число як числове значення.

---

# 37. `replaceAll()` і спеціальні випадки

`replaceAll()` особливо зручний, коли потрібно просто замінити **всі буквальні входження**:

    const text = "red green red blue red";

    const result = text.replaceAll("red", "yellow");

    console.log(result);
    // "yellow green yellow blue yellow"

У такій ситуації `replaceAll()` часто читається зрозуміліше, ніж:

    text.replace(/red/g, "yellow")

---

# 38. Коли використовувати `replace()`

Використовуй `replace()`, коли:

- потрібно замінити тільки перший збіг;
- потрібна заміна за регулярним виразом;
- потрібно використати callback-функцію;
- потрібно виконати складнішу логіку заміни.

### Приклад

    const text = "cat cat cat";

    const result = text.replace("cat", "dog");

    // "dog cat cat"

---

# 39. Коли використовувати `replaceAll()`

Використовуй `replaceAll()`, коли:

- потрібно замінити всі буквальні входження;
- не потрібна складна регулярна логіка;
- код має бути максимально очевидним.

### Приклад

    const text = "cat cat cat";

    const result = text.replaceAll("cat", "dog");

    // "dog dog dog"

---

# 40. `replace()` чи `replaceAll()`?

Практичне правило:

    Потрібен перший збіг?
        ↓
    replace()

    Потрібні всі буквальні збіги?
        ↓
    replaceAll()

    Потрібен RegExp?
        ↓
    replace() + /g

    Потрібна функція для кожного збігу?
        ↓
    replace()

---

# 41. Типова помилка №1 — очікувати зміни оригіналу

Неправильно:

    const text = "hello";

    text.replace("hello", "hi");

    console.log(text);
    // "hello"

Правильно:

    const text = "hello";

    const result = text.replace("hello", "hi");

    console.log(result);
    // "hi"

---

# 42. Типова помилка №2 — забути, що `replace()` замінює перший збіг

    const text = "JS JS JS";

    const result = text.replace("JS", "JavaScript");

    console.log(result);
    // "JavaScript JS JS"

Якщо потрібно все:

    const result = text.replaceAll("JS", "JavaScript");

    // "JavaScript JavaScript JavaScript"

---

# 43. Типова помилка №3 — плутати `replace()` з `replaceAll()`

Запам'ятай:

    replace()
    → first match

    replaceAll()
    → all matches

---

# 44. Типова помилка №4 — забути про регістр

    const text = "JavaScript";

    console.log(text.replace("javascript", "JS"));

    // "JavaScript"

Збігу немає, тому що:

    "JavaScript"
    "javascript"

— різні рядки.

Для нечутливого до регістру пошуку можна використовувати `RegExp` з прапорцем `i`:

    const text = "JavaScript";

    const result = text.replace(/javascript/i, "JS");

    console.log(result);
    // "JS"

---

# 45. Типова помилка №5 — використовувати `replaceAll()` з RegExp без `g`

Неправильно:

    const text = "cat cat";

    text.replaceAll(/cat/, "dog");

Для `replaceAll()` з `RegExp` потрібен `g`:

    const text = "cat cat";

    const result = text.replaceAll(/cat/g, "dog");

    console.log(result);
    // "dog dog"

---

# 46. Типова помилка №6 — використовувати `replace()` замість спеціалізованого API

Не все потрібно вирішувати через `replace()`.

Наприклад, для URL:

    new URL(url)

Для HTML:

    DOM API

Для дат:

    Date / Temporal API залежно від задачі

Для чисел:

    Number / Intl.NumberFormat

`replace()` — це інструмент роботи з текстом, а не універсальний інструмент для всього.

---

# 47. `replace()` повертає рядок

Навіть якщо replacement — число:

    const text = "value";

    const result = text.replace("value", 100);

    console.log(result);
    // "100"

Результат є рядком.

    console.log(typeof result);
    // "string"

---

# 48. Робота з порожнім рядком

Можна повністю видалити знайдений фрагмент:

    const text = "Hello JavaScript";

    const result = text.replace(" JavaScript", "");

    console.log(result);
    // "Hello"

Або:

    const result = text.replaceAll(" ", "");

    console.log(result);
    // "HelloJavaScript"

---

# 49. `replace()` та `split().join()`

До появи `replaceAll()` можна було часто побачити:

    const text = "cat cat cat";

    const result = text.split("cat").join("dog");

    console.log(result);
    // "dog dog dog"

Сьогодні для простої заміни всіх буквальних входжень краще:

    const result = text.replaceAll("cat", "dog");

`split().join()` все ще корисно знати, але це не основний сучасний спосіб.

---

# 50. `replace()` у реальному Full Stack JavaScript

`replace()` та `replaceAll()` можуть зустрічатися на різних рівнях застосунку.

### Frontend

    const username = input.value
        .trim()
        .replace(/\s+/g, "-");

### Backend

    const normalizedPhone = body.phone
        .replace(/\D/g, "");

### Database preparation

    const searchTerm = input
        .trim()
        .replace(/\s+/g, " ");

### URL / slug

    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");

Але:

> На backend не варто покладатися лише на нормалізацію рядка. Дані все одно потрібно валідовувати.

---

# 51. `replace()` як частина pipeline

Дуже корисно мислити про обробку рядка як про pipeline:

    input
      ↓
    trim()
      ↓
    toLowerCase()
      ↓
    replace()
      ↓
    split()
      ↓
    result

Наприклад:

    const input = "  Hello,   WORLD!  ";

    const result = input
        .trim()
        .toLowerCase()
        .replace(/[!,]/g, "")
        .replace(/\s+/g, " ");

    console.log(result);
    // "hello world"

Це вже типовий стиль обробки даних у JavaScript.

---

# 52. Що потрібно знати напам'ять

Обов'язково:

    replace(searchValue, replacement)

    replaceAll(searchValue, replacement)

    replace()
    → перший збіг

    replaceAll()
    → всі буквальні збіги

    /pattern/g
    → глобальна заміна через RegExp

    /pattern/i
    → case-insensitive пошук

    "" 
    → видалення

І головне:

    string → immutable

---

# 53. Міні-шпаргалка

## `replace()`

    const result = text.replace("old", "new");

Замінює перший збіг.

---

## `replaceAll()`

    const result = text.replaceAll("old", "new");

Замінює всі буквальні збіги.

---

## Видалити перший збіг

    const result = text.replace("old", "");

---

## Видалити всі

    const result = text.replaceAll("old", "");

---

## Заміна через RegExp

    const result = text.replace(/old/g, "new");

---

## Case-insensitive

    const result = text.replace(/javascript/i, "JS");

---

## Видалити всі цифри

    const result = text.replace(/\d/g, "");

---

## Залишити тільки цифри

    const result = text.replace(/\D/g, "");

---

## Зменшити кілька пробілів до одного

    const result = text.replace(/\s+/g, " ");

---

## Callback

    const result = text.replace(/\d+/g, (match) => {
        return Number(match) * 2;
    });

---

# 54. Практичні вправи

## Вправа 1 — заміна слова

Дано:

    const text = "I like JavaScript";

Замінити `JavaScript` на `TypeScript`.

Очікуваний результат:

    "I like TypeScript"

---

## Вправа 2 — заміна всіх

Дано:

    const text = "JS is great. JS is popular. JS is everywhere.";

Замінити всі `JS` на `JavaScript`.

---

## Вправа 3 — видалення дефісів

Дано:

    const phone = "067-123-45-67";

Отримати:

    "0671234567"

---

## Вправа 4 — нормалізація пробілів

Дано:

    const text = "   Hello     JavaScript    World   ";

Отримати:

    "Hello JavaScript World"

---

## Вправа 5 — тільки цифри

Дано:

    const phone = "+38 (067) 123-45-67";

Отримати:

    "380671234567"

---

## Вправа 6 — заміна чисел

Дано:

    const text = "10 20 30";

Збільшити кожне число вдвічі.

Очікуваний результат:

    "20 40 60"

---

## Вправа 7 — lowercase + replace

Дано:

    const title = "JavaScript String Methods";

Перетворити на:

    "javascript-string-methods"

---

# 55. Interview Questions

### 1. Чим відрізняються `replace()` і `replaceAll()`?

`replace()` за замовчуванням замінює перший збіг, а `replaceAll()` — усі буквальні збіги.

---

### 2. Чи змінює `replace()` оригінальний рядок?

Ні.

Рядки JavaScript immutable.

---

### 3. Як замінити всі збіги через `replace()`?

За допомогою `RegExp` з прапорцем `g`:

    text.replace(/word/g, "newWord");

---

### 4. Чи можна передати `RegExp` у `replace()`?

Так.

    text.replace(/hello/gi, "hi");

---

### 5. Для чого потрібен прапорець `g`?

`g` означає `global` і дозволяє працювати з усіма збігами.

---

### 6. Що робить `replaceAll()` з рядком?

Замінює всі входження цього рядка.

    "a a a".replaceAll("a", "b");

Результат:

    "b b b"

---

### 7. Чи можна передати функцію як replacement?

Так.

    text.replace(/\d+/g, (match) => {
        return Number(match) * 2;
    });

---

### 8. Як видалити всі збіги?

Замінити їх на порожній рядок:

    text.replaceAll("word", "");

---

### 9. Як замінити всі цифри?

    text.replace(/\d/g, "#");

---

### 10. Як залишити тільки цифри?

    text.replace(/\D/g, "");

---

### 11. Чому `replace()` іноді нічого не змінює?

Можливі причини:

- неправильний регістр;
- неправильний текст пошуку;
- пошук не збігається з фактичним рядком;
- використано неправильний `RegExp`.

---

# 56. Learning Path

## 🟢 Core — обов'язково

Знати:

- `replace()`;
- `replaceAll()`;
- перший vs всі збіги;
- immutable strings;
- заміна на `""`;
- базове використання `RegExp`.

Приклад:

    const result = text
        .trim()
        .replaceAll(" ", "-");

---

## 🟡 Junior

Додатково:

- `replace()` + `/g`;
- `replace()` + `/i`;
- `\d`;
- `\D`;
- `\s`;
- callback replacement;
- chaining;
- нормалізація user input;
- slug generation.

Приклад:

    const slug = title
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");

---

## 🟠 Middle

Розуміти:

- capturing groups;
- `$1`, `$2`;
- callback replacement;
- складні `RegExp`;
- Unicode;
- нормалізацію даних;
- edge cases;
- продуктивність довгих ланцюжків перетворень.

---

## 🔴 Senior

Вміти оцінювати:

- чи взагалі потрібен `replace()`;
- чи краще використати спеціалізований API;
- складність регулярних виразів;
- читабельність transformation pipeline;
- Unicode та локалізацію;
- безпеку обробки користувацького тексту;
- вплив складних `RegExp` на продуктивність.

---

# 57. Зв'язок з попередніми темами

Цей розділ логічно використовує попередні знання:

    String basics
        ↓
    length / access
        ↓
    search
        ↓
    slice / substring
        ↓
    case / whitespace
        ↓
    replace / replaceAll
        ↓
    split / join
        ↓
    template literals
        ↓
    RegExp

Особливо важливий зв'язок:

    search
        +
    RegExp
        +
    replace
        =
    пошук + трансформація тексту

---

# 58. Головні висновки

1. `replace()` створює новий рядок і не змінює оригінал.
2. `replace()` зазвичай замінює **перший збіг**.
3. `replaceAll()` замінює **всі буквальні збіги**.
4. `RegExp` дозволяє виконувати складніший пошук.
5. `/g` означає глобальну заміну всіх збігів.
6. `/i` дозволяє ігнорувати регістр.
7. `""` використовується для видалення знайденого тексту.
8. `replace()` може отримувати callback-функцію.
9. `replace()` часто використовується разом із `trim()`, `toLowerCase()`, `split()`, `join()` та `RegExp`.
10. Для простих замін усіх входжень `replaceAll()` часто є найчитабельнішим рішенням.
11. Для складних шаблонів варто використовувати `replace()` + `RegExp`.
12. `replace()` — важливий інструмент **нормалізації та трансформації текстових даних**.

---

# 🧠 Що має залишитися в голові

    replace()
    → заміни перший збіг

    replaceAll()
    → заміни всі буквальні збіги

    replace(/pattern/g, replacement)
    → заміни всі збіги за RegExp

    replace(/pattern/i, replacement)
    → пошук без врахування регістру

    replace(pattern, "")
    → видалення

    replace(/\d/g, "#")
    → заміна цифр

    replace(/\D/g, "")
    → залишити тільки цифри

    replace(/\s+/g, " ")
    → нормалізація пробілів

    string
        .trim()
        .toLowerCase()
        .replace(...)
        .split(...)
        .join(...)

    → типовий pipeline обробки рядка