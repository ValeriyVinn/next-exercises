# 13. Optional Chaining and Nullish Coalescing

JavaScript має спеціальні оператори для безпечної роботи зі значеннями, які можуть бути `null` або `undefined`.

Основні інструменти:

    ?.  → Optional Chaining
    ??  → Nullish Coalescing
    ??= → Nullish Assignment

Вони особливо корисні при роботі з:

- objects
- nested objects
- arrays
- functions
- API responses
- JSON
- optional properties
- `null`
- `undefined`

---

# Ключова ідея

Без optional chaining:

    const user = {};

    console.log(user.address.city);
    // TypeError

Проблема:

    user.address
    // undefined

JavaScript намагається виконати:

    undefined.city

і виникає помилка.

З optional chaining:

    const user = {};

    console.log(user.address?.city);
    // undefined

Оператор `?.` зупиняє доступ, якщо значення перед ним:

    null

або:

    undefined

---

# Ключові поняття

✔ Optional Chaining

✔ `?.`

✔ Property Access

✔ Optional Property

✔ Optional Method Call

✔ Optional Element Access

✔ Nullish Coalescing

✔ `??`

✔ Nullish Assignment

✔ `??=`

✔ `null`

✔ `undefined`

✔ `nullish`

✔ `fallback value`

✔ short-circuiting

✔ safe property access

✔ nested objects

---

# Що потрібно пам'ятати

• `?.` — optional chaining.

• `?.` безпечно звертається до властивості, якщо значення може бути `null` або `undefined`.

• `??` повертає праву частину, якщо ліва частина є `null` або `undefined`.

• `??` НЕ замінює всі falsy values.

• `0`, `false` та `""` не вважаються nullish.

• `??` відрізняється від `||`.

• `??=` присвоює значення, якщо поточне значення є `null` або `undefined`.

• Optional chaining може використовуватися для properties, methods та elements.

• `?.` повертає `undefined`, якщо chain зупиняється через `null` або `undefined`.

---

# Nullish

Термін `nullish` означає:

    null
    undefined

Тобто:

    nullish = null || undefined

Важливо не плутати:

    nullish

з:

    falsy

Falsy значень більше.

---

# Falsy Values

Основні falsy values:

    false
    0
    -0
    0n
    ""
    null
    undefined
    NaN

---

# Nullish Values

Nullish — тільки:

    null
    undefined

Тому:

    0
    false
    ""
    NaN

не є nullish.

Це принципово важливо для `??`.

---

# Optional Chaining

## Основний синтаксис

    object?.property

Наприклад:

    const user = {
        name: "John"
    };

    console.log(user?.name);
    // "John"

---

# Optional Chaining з відсутньою властивістю

    const user = {
        name: "John"
    };

    console.log(user?.age);
    // undefined

Якщо властивості немає, результат:

    undefined

Помилки немає.

---

# Optional Chaining з null

    const user = null;

    console.log(user?.name);
    // undefined

Без `?.`:

    console.log(user.name);
    // TypeError

---

# Optional Chaining з undefined

    let user;

    console.log(user?.name);
    // undefined

Звичайний доступ:

    console.log(user.name);
    // TypeError

---

# Nested Properties

Одна з найважливіших причин використання `?.`.

Наприклад:

    const user = {
        profile: {
            name: "John"
        }
    };

Без optional chaining:

    user.profile.name

Працює, якщо `profile` існує.

Але:

    const user = {};

    user.profile.name;
    // TypeError

Безпечний варіант:

    user.profile?.name;

Результат:

    undefined

---

# Глибокий Nested Access

Наприклад:

    const user = {
        profile: {
            address: {
                city: "Kyiv"
            }
        }
    };

Можна написати:

    user.profile?.address?.city

Якщо будь-яка частина chain:

    null

або:

    undefined

результатом буде:

    undefined

---

# Приклад з відсутнім рівнем

    const user = {
        profile: {}
    };

    console.log(
        user.profile?.address?.city
    );

Результат:

    undefined

Помилки немає.

---

# Optional Chaining не означає "перевірити все"

Важливо розуміти, де саме стоїть `?.`.

Наприклад:

    user.profile?.address.city

Тут optional chaining захищає:

    user.profile

Але не обов'язково весь наступний chain.

Безпечніше:

    user.profile?.address?.city

Якщо `address` теж може бути `null` або `undefined`, потрібно поставити `?.` і перед `city`.

---

# Правило для Nested Objects

Якщо кожен рівень може бути відсутнім:

    object?.property?.nestedProperty?.value

Наприклад:

    user?.profile?.address?.city

---

# Optional Chaining і Arrays

Optional chaining можна використовувати для масивів.

    const users = null;

    console.log(users?.[0]);
    // undefined

Без `?.`:

    console.log(users[0]);
    // TypeError

---

# Optional Element Access

Синтаксис:

    object?.[expression]

Наприклад:

    const users = [
        "John",
        "Peter"
    ];

    console.log(users?.[0]);
    // "John"

---

# Dynamic Property

Optional chaining можна комбінувати з динамічним ключем.

    const user = {
        name: "John"
    };

    const key = "name";

    console.log(user?.[key]);
    // "John"

---

# Відсутній Dynamic Property

    const user = {};

    const key = "name";

    console.log(user?.[key]);
    // undefined

---

# Optional Chaining з Function

Optional chaining можна використовувати для виклику функції або методу, який може бути відсутнім.

Синтаксис:

    object.method?.()

Наприклад:

    const user = {
        sayHello() {
            console.log("Hello");
        }
    };

    user.sayHello?.();

Результат:

    Hello

---

# Optional Method Call

Якщо методу немає:

    const user = {};

    user.sayHello?.();

Нічого не відбудеться.

Результат:

    undefined

Помилки немає.

---

# Optional Method Call

Це особливо корисно, коли callback може бути необов'язковим.

    function process(callback) {
        callback?.();
    }

    process();

Помилки немає.

---

# Callback

Наприклад:

    function loadData(onSuccess) {
        // ...
        onSuccess?.();
    }

Можна викликати:

    loadData();

або:

    loadData(() => {
        console.log("Success");
    });

---

# Optional Chaining з Methods

Наприклад:

    const user = {
        profile: {
            getName() {
                return "John";
            }
        }
    };

    const name = user.profile?.getName?.();

Результат:

    "John"

Якщо `profile` або `getName` відсутні, chain може повернути `undefined`.

---

# Optional Chaining і Function Call

Є важлива відмінність:

    obj.method?.()

та:

    obj?.method()

Перше означає:

    "якщо method існує — виклич його"

Друге означає:

    "якщо obj існує — спробуй звернутися до method"

Наприклад:

    obj?.method?.()

означає:

    obj може бути nullish
    +
    method може бути nullish

---

# Повний Safe Chain

    user?.profile?.getName?.()

Тут перевіряється:

    user
    profile
    getName

---

# Optional Chaining і null

    const user = null;

    const name = user?.profile?.name;

Результат:

    undefined

---

# Optional Chaining і undefined

    const user = undefined;

    const name = user?.profile?.name;

Результат:

    undefined

---

# Optional Chaining не перетворює значення

Наприклад:

    const user = {
        age: 0
    };

    console.log(user?.age);

Результат:

    0

`?.` не перетворює:

    0

на:

    undefined

---

# Optional Chaining та false

    const user = {
        isActive: false
    };

    console.log(user?.isActive);

Результат:

    false

---

# Optional Chaining та Empty String

    const user = {
        name: ""
    };

    console.log(user?.name);

Результат:

    ""

---

# Optional Chaining — не Boolean Check

Не потрібно думати:

    ?. → перевіряє truthy

Насправді:

    ?. → перевіряє nullish

Тобто:

    null
    undefined

зупиняють chain.

А:

    0
    false
    ""

не зупиняють chain через свою falsy-природу.

---

# Nullish Coalescing

Оператор:

    ??

використовується для надання fallback value, якщо значення:

    null

або:

    undefined

---

# Основний синтаксис

    value ?? fallback

Наприклад:

    const name = null;

    const result = name ?? "Unknown";

Результат:

    "Unknown"

---

# undefined

    const name = undefined;

    const result = name ?? "Unknown";

Результат:

    "Unknown"

---

# Звичайне значення

    const name = "John";

    const result = name ?? "Unknown";

Результат:

    "John"

---

# 0 і Nullish Coalescing

Це дуже важливий приклад:

    const count = 0;

    const result = count ?? 10;

Результат:

    0

Чому?

Тому що:

    0

не є nullish.

---

# false і Nullish Coalescing

    const isActive = false;

    const result = isActive ?? true;

Результат:

    false

`false` зберігається.

---

# Empty String

    const name = "";

    const result = name ?? "Unknown";

Результат:

    ""

Порожній string не є nullish.

---

# NaN

    const value = NaN;

    const result = value ?? 100;

Результат:

    NaN

`NaN` не є nullish.

---

# Основна таблиця `??`

| Значення | `value ?? "default"` |
|---|---|
| `null` | `"default"` |
| `undefined` | `"default"` |
| `0` | `0` |
| `false` | `false` |
| `""` | `""` |
| `NaN` | `NaN` |
| `"hello"` | `"hello"` |
| `42` | `42` |

---

# Nullish Coalescing vs OR

Дуже важливо розрізняти:

    ||

та:

    ??

`||` використовує truthy/falsy.

`??` використовує nullish.

---

# `||`

    const value = 0;

    const result = value || 100;

Результат:

    100

Тому що:

    0

є falsy.

---

# `??`

    const value = 0;

    const result = value ?? 100;

Результат:

    0

Тому що:

    0

не є nullish.

---

# Порівняння `||` та `??`

    const value = "";

    value || "default";
    // "default"

    value ?? "default";
    // ""

---

Ще:

    const value = false;

    value || true;
    // true

    value ?? true;
    // false

---

Ще:

    const value = 0;

    value || 10;
    // 10

    value ?? 10;
    // 0

---

# Коли використовувати `??`

Використовуй `??`, коли:

    null / undefined

означають:

    "значення відсутнє"

але:

    0
    false
    ""

є валідними значеннями.

---

# Приклад з кількістю

    const pageSize = user.pageSize ?? 20;

Якщо:

    user.pageSize = 0

то результат:

    0

а не:

    20

Це може бути важливо для числових параметрів.

---

# Приклад з Boolean

    const enabled = config.enabled ?? true;

Якщо:

    config.enabled = false

результат:

    false

`??` не замінює `false`.

---

# Приклад з String

    const title = data.title ?? "Untitled";

Якщо:

    title = ""

результат:

    ""

Якщо:

    title = null

результат:

    "Untitled"

---

# Optional Chaining + Nullish Coalescing

Це одна з найкорисніших комбінацій.

    const city =
        user?.profile?.address?.city
        ?? "Unknown";

Тут:

    ?. → безпечно отримує значення

    ?? → дає fallback

---

# Приклад

    const user = {
        profile: {
            name: "John"
        }
    };

    const city =
        user?.profile?.address?.city
        ?? "Unknown";

Результат:

    "Unknown"

Тому що:

    user.profile.address

відсутній.

---

# API Response

Наприклад API може повернути:

    const response = {
        user: {
            profile: {
                name: "John"
            }
        }
    };

Можна написати:

    const name =
        response?.user?.profile?.name
        ?? "Unknown";

---

# Якщо API повернув null

    const response = null;

    const name =
        response?.user?.profile?.name
        ?? "Unknown";

Результат:

    "Unknown"

Це дуже типовий pattern при роботі з API.

---

# Nullish Assignment

Оператор:

    ??=

означає:

    "присвоїти значення, якщо поточне значення null або undefined"

---

# Основний синтаксис

    value ??= fallback;

Наприклад:

    let name;

    name ??= "John";

Тепер:

    name
    // "John"

---

# Якщо значення вже існує

    let name = "Peter";

    name ??= "John";

Результат:

    "Peter"

Присвоєння не відбулося.

---

# Nullish Assignment і null

    let value = null;

    value ??= 100;

Результат:

    100

---

# Nullish Assignment і undefined

    let value;

    value ??= 100;

Результат:

    100

---

# Nullish Assignment і 0

    let value = 0;

    value ??= 100;

Результат:

    0

`0` не є nullish.

---

# Nullish Assignment і false

    let value = false;

    value ??= true;

Результат:

    false

---

# Nullish Assignment і Empty String

    let value = "";

    value ??= "default";

Результат:

    ""

---

# Еквівалентна форма

Наприклад:

    value ??= 100;

концептуально означає:

    if (value === null || value === undefined) {
        value = 100;
    }

Але `??=` є коротшим способом запису.

---

# Порівняння Assignment Operators

| Operator | Умова присвоєння |
|---|---|
| `=` | завжди |
| `||=` | якщо falsy |
| `??=` | якщо nullish |

---

# `||=` vs `??=`

Наприклад:

    let value = 0;

    value ||= 100;

Результат:

    100

А:

    let value = 0;

    value ??= 100;

Результат:

    0

---

# Optional Chaining + Nullish Assignment

Можна використовувати ці механізми разом у складніших структурах, але потрібно пам'ятати:

    ?. → безпечний доступ

    ?? → fallback expression

    ??= → fallback assignment

---

# Три оператори

## Optional Chaining

    ?.

Призначення:

    безпечно отримати значення

---

## Nullish Coalescing

    ??

Призначення:

    повернути fallback для null/undefined

---

## Nullish Assignment

    ??=

Призначення:

    встановити fallback у змінну або властивість

---

# Ментальна модель

    user?.name

означає:

    "якщо user існує,
     отримай name"

---

    user.name ?? "Unknown"

означає:

    "якщо name null/undefined,
     використай Unknown"

---

    user.name ??= "Unknown"

означає:

    "якщо name null/undefined,
     запиши Unknown"

---

# Optional Chaining + `??`

Найчастіше вони використовуються разом:

    const value =
        object?.property
        ?? defaultValue;

Можна читати:

    "Безпечно отримай property,
     а якщо його немає —
     використай defaultValue."

---

# Приклад з конфігурацією

    const config = {};

    const theme =
        config?.theme
        ?? "light";

Результат:

    "light"

---

# Приклад з налаштуваннями

    const settings = {
        notifications: {
            email: false
        }
    };

    const emailNotifications =
        settings?.notifications?.email
        ?? true;

Результат:

    false

Це важливо:

    false

не замінюється на:

    true

---

# Приклад з кількістю

    const settings = {
        pageSize: 0
    };

    const pageSize =
        settings?.pageSize
        ?? 20;

Результат:

    0

---

# Приклад з API

    const data = {
        user: {
            name: "John"
        }
    };

    const username =
        data?.user?.name
        ?? "Anonymous";

Результат:

    "John"

---

# Відсутній User

    const data = {};

    const username =
        data?.user?.name
        ?? "Anonymous";

Результат:

    "Anonymous"

---

# `?.` та `??` виконують різні задачі

Це дуже важливо.

    user?.name

не означає:

    "дай default value"

Воно означає:

    "безпечний доступ"

А:

    user?.name ?? "Unknown"

означає:

    "безпечний доступ + fallback"

---

# Optional Chaining не замінює `??`

Наприклад:

    const name = user?.name;

Якщо `user` відсутній:

    name
    // undefined

Якщо потрібно значення за замовчуванням:

    const name =
        user?.name ?? "Unknown";

Тоді:

    name
    // "Unknown"

---

# `??` не замінює Optional Chaining

Наприклад:

    const name =
        user.name ?? "Unknown";

Якщо `user` дорівнює:

    null

код все одно завершиться помилкою до застосування `??`.

Потрібно:

    const name =
        user?.name ?? "Unknown";

---

# Типовий API Pattern

    const value =
        response?.data?.result?.value
        ?? "default";

Ментально:

    response
       ↓
    data
       ↓
    result
       ↓
    value
       ↓
    nullish?
       ↓
    default

---

# Optional Chaining і Arrays

Наприклад:

    const users = [
        {
            name: "John"
        }
    ];

    const name =
        users?.[0]?.name
        ?? "Unknown";

Результат:

    "John"

---

# Array без елемента

    const users = [];

    const name =
        users?.[0]?.name
        ?? "Unknown";

Результат:

    "Unknown"

---

# Array може бути null

    const users = null;

    const name =
        users?.[0]?.name
        ?? "Unknown";

Результат:

    "Unknown"

---

# Optional Chaining з Map

Якщо об'єкт може бути відсутнім:

    const map = null;

    const value =
        map?.get("name");

Результат:

    undefined

Якщо потрібно fallback:

    const value =
        map?.get("name")
        ?? "Unknown";

---

# Optional Chaining з Methods

Наприклад:

    const user = {
        getName() {
            return "John";
        }
    };

    const name =
        user?.getName?.()
        ?? "Unknown";

Результат:

    "John"

---

# Якщо методу немає

    const user = {};

    const name =
        user?.getName?.()
        ?? "Unknown";

Результат:

    "Unknown"

---

# Важлива помилка

Не потрібно писати:

    user?.name();

якщо проблема в тому, що:

    user

може бути `null` або `undefined`.

Це захищає object:

    user?.name()

але не обов'язково означає, що `name` є функцією.

Якщо саме метод може бути відсутнім:

    user?.name?.();

---

# Різниця

    user?.method()

Означає:

    user може бути nullish,
    але method очікується як функція.

---

    user?.method?.()

Означає:

    user може бути nullish
    +
    method може бути nullish.

---

# Заборонені / обмежені випадки

Optional chaining не можна використовувати абсолютно всюди.

Наприклад, не можна використовувати його як ліву частину assignment:

    user?.name = "John";

Це SyntaxError.

Потрібно спочатку перевірити object іншим способом.

---

# Optional Chaining і `delete`

Optional chaining може використовуватися в деяких операціях, наприклад:

    delete user?.name;

Якщо `user` nullish, операція не викликає помилку через сам доступ.

Але такі конструкції варто використовувати усвідомлено.

---

# Optional Chaining і Function Call

Порівняй:

    user?.login()

та:

    user?.login?.()

Перше:

    user може бути nullish,
    login повинен існувати як function.

Друге:

    user може бути nullish,
    login також може бути nullish.

---

# Коли використовувати `||`

`||` доречний, коли всі falsy values повинні означати "відсутнє значення".

Наприклад:

    const username =
        input || "Anonymous";

Тут порожній string також вважається причиною використати fallback.

---

# Коли використовувати `??`

`??` доречний, коли тільки:

    null
    undefined

означають "відсутнє значення".

Наприклад:

    const pageSize =
        settings.pageSize ?? 20;

Якщо:

    pageSize = 0

значення `0` зберігається.

---

# Важлива синтаксична особливість

Не можна безпосередньо змішувати `??` з `||` або `&&` без дужок.

Наприклад:

    a ?? b || c

є SyntaxError.

Потрібно явно визначити порядок:

    (a ?? b) || c

або:

    a ?? (b || c)

Це робить логіку зрозумілою.

---

# Приклад

Неправильно:

    const value = a ?? b || c;

Правильно:

    const value = (a ?? b) || c;

або:

    const value = a ?? (b || c);

---

# Nullish Coalescing Chain

Можна використовувати декілька `??`:

    const value =
        first
        ?? second
        ?? third
        ?? "default";

JavaScript використовує перше значення, яке не є:

    null
    undefined

---

# Приклад

    const username =
        user?.name
        ?? profile?.name
        ?? "Anonymous";

Логіка:

    user.name
        ↓
    profile.name
        ↓
    "Anonymous"

---

# Практичний патерн: API fallback

    const title =
        response?.data?.title
        ?? "Untitled";

---

# Практичний патерн: User profile

    const city =
        user?.profile?.address?.city
        ?? "Unknown";

---

# Практичний патерн: Optional callback

    function save(data, onSuccess) {
        // save data

        onSuccess?.();
    }

---

# Практичний патерн: Default config

    const timeout =
        config?.timeout
        ?? 5000;

---

# Практичний патерн: Boolean setting

    const enabled =
        config?.enabled
        ?? true;

Якщо:

    enabled = false

результат:

    false

---

# Практичний патерн: Number setting

    const limit =
        config?.limit
        ?? 10;

Якщо:

    limit = 0

результат:

    0

---

# Практичний патерн: Object property

    const name =
        user?.name
        ?? "Unknown";

---

# Практичний патерн: Array element

    const firstUser =
        users?.[0]
        ?? null;

---

# Практичний патерн: Method

    const result =
        service?.getData?.()
        ?? [];

---

# Типові помилки

❌ Плутати `nullish` і `falsy`.

    nullish:
    null
    undefined

    falsy:
    false
    0
    -0
    0n
    ""
    null
    undefined
    NaN

---

❌ Вважати, що `??` замінює `||`.

Вони мають різну логіку.

---

❌ Використовувати `||`, коли `0`, `false` або `""` є валідними значеннями.

Наприклад:

    const count = value || 10;

Якщо:

    value = 0

отримаємо:

    10

Можливо, правильніше:

    const count = value ?? 10;

---

❌ Вважати `?.` fallback operator.

`?.` лише безпечно отримує значення.

Для fallback:

    ??

---

❌ Вважати, що `??` захищає від TypeError при доступі до nested object.

Наприклад:

    user.profile.name ?? "Unknown"

не захистить, якщо:

    user === null

Потрібно:

    user?.profile?.name ?? "Unknown"

---

❌ Забувати `?.` перед кожним потенційно nullish рівнем.

    user?.profile.address.city

може бути небезпечним, якщо:

    profile.address

відсутній.

Безпечніше:

    user?.profile?.address?.city

---

❌ Плутати:

    user?.method()

та:

    user?.method?.()

---

❌ Використовувати `?.` як lvalue:

    user?.name = "John";

Це SyntaxError.

---

# Питання зі співбесіди

Що таке Optional Chaining?

Що робить оператор `?.`?

Що таке Nullish Coalescing?

Що робить оператор `??`?

Що означає `nullish`?

Які значення є nullish?

Яка різниця між nullish і falsy?

Яка різниця між `??` та `||`?

Що поверне:

    0 ?? 10

Що поверне:

    0 || 10

Що поверне:

    false ?? true

Що поверне:

    false || true

Що поверне:

    "" ?? "default"

Що поверне:

    "" || "default"

Для чого використовується `??=`?

Чим `??=` відрізняється від `||=`?

Як безпечно отримати nested property?

Як безпечно викликати optional method?

Яка різниця між:

    user?.method()

та:

    user?.method?.()

Що таке fallback value?

Що станеться, якщо використовувати `??` без дужок разом із `||`?

---

# Шлях

## 🟢 Core (обов'язково знати)

Що таке `null`.

Що таке `undefined`.

Що таке `nullish`.

Optional Chaining:

    ?.

Nullish Coalescing:

    ??

Основний патерн:

    object?.property

Nested access:

    object?.property?.nested

Fallback:

    value ?? defaultValue

Різниця:

    ?? vs ||

Основи:

    ??=

---

## 🔵 Junior

Optional property access.

Optional array access:

    array?.[0]

Optional dynamic property:

    object?.[key]

Optional method call:

    object.method?.()

Комбінація:

    object?.method?.()

Nested optional chaining.

API responses.

JSON data.

Fallback values.

Nullish assignment.

`??` з:

    0
    false
    ""

Різниця між:

    null
    undefined
    falsy

Комбінація:

    ?. + ??

---

## 🟠 Middle

Глибоке розуміння short-circuiting.

Optional chaining semantics.

Nullish coalescing semantics.

Evaluation order.

Reference semantics.

Optional call.

Optional property access.

Optional element access.

Nested chains.

Interaction з getters.

Interaction з methods.

`??` та operator precedence.

`??` разом з `||`.

`??` разом з `&&`.

Immutable configuration patterns.

API normalization.

Default values у великих структурах даних.

---

## 🔴 Senior

ECMAScript specification semantics.

Evaluation of OptionalChain.

ChainEvaluation.

Short-circuit evaluation.

Reference Records.

GetValue.

Call evaluation.

Property access semantics.

Nullish Coalescing evaluation semantics.

Logical assignment operators.

`??=` specification semantics.

Interaction з Proxy.

Interaction з getters.

Evaluation order та side effects.

Performance implications.

Transpilation optional chaining.

Transpilation nullish coalescing.

Browser compatibility considerations.

Trade-offs між:

    ?.
    explicit checks
    defensive programming

---

# Міні-шпаргалка

## Optional Chaining

    user?.name

Безпечно отримати:

    name

якщо `user` може бути:

    null
    undefined

---

## Nested Optional Chaining

    user?.profile?.address?.city

---

## Array

    users?.[0]

---

## Dynamic Property

    user?.[key]

---

## Optional Method

    user?.getName?.()

---

## Nullish Coalescing

    value ?? "default"

Fallback спрацьовує для:

    null
    undefined

---

## Nullish Assignment

    value ??= "default"

Присвоєння відбувається для:

    null
    undefined

---

## `??` vs `||`

    0 || 10
    // 10

    0 ?? 10
    // 0


    false || true
    // true

    false ?? true
    // false


    "" || "default"
    // "default"

    "" ?? "default"
    // ""

---

## API Pattern

    const name =
        response?.data?.user?.name
        ?? "Unknown";

---

## Config Pattern

    const timeout =
        config?.timeout
        ?? 5000;

---

## Boolean Pattern

    const enabled =
        config?.enabled
        ?? true;

---

## Array Pattern

    const first =
        users?.[0]
        ?? null;

---

# Головне

• `nullish` — це:

    null
    undefined

• `?.` — Optional Chaining.

• `?.` дозволяє безпечно отримувати властивості.

• Якщо chain зустрічає `null` або `undefined`, результатом стає `undefined`.

• `?.` можна використовувати для:

    properties
    arrays
    dynamic properties
    methods

• Основні форми:

    object?.property

    object?.[expression]

    object?.method?.()

• `??` — Nullish Coalescing.

• `??` повертає праву частину тільки якщо ліва:

    null
    undefined

• `0`, `false`, `""` не є nullish.

• Тому:

    0 ?? 10
    // 0

• Але:

    0 || 10
    // 10

• `??=` — Nullish Assignment.

• `value ??= default` присвоює значення тільки якщо `value` є:

    null
    undefined

• `?.` і `??` часто використовуються разом:

    user?.profile?.name ?? "Unknown"

• `?.` відповідає на питання:

    "Чи можна безпечно отримати це значення?"

• `??` відповідає на питання:

    "Якщо значення відсутнє, що використати замість нього?"

• `??=` відповідає на питання:

    "Якщо значення відсутнє, що записати в нього?"

---

# Фінальна ментальна модель

    ┌─────────────────────────────┐
    │       OPTIONAL CHAINING     │
    │             ?.              │
    │                             │
    │    БЕЗПЕЧНО ОТРИМАТИ        │
    │                             │
    │    user?.profile?.name      │
    └─────────────────────────────┘


    ┌─────────────────────────────┐
    │     NULLISH COALESCING      │
    │             ??              │
    │                             │
    │    ДАТИ FALLBACK            │
    │                             │
    │    value ?? "default"       │
    └─────────────────────────────┘


    ┌─────────────────────────────┐
    │      NULLISH ASSIGNMENT     │
    │             ??=             │
    │                             │
    │    ЗАПИСАТИ FALLBACK        │
    │                             │
    │    value ??= "default"      │
    └─────────────────────────────┘


    Разом:

    user?.profile?.name
        ??
    "Unknown"


    читаємо як:

    "Безпечно отримай name.
     Якщо user/profile/name
     дорівнює null або undefined —
     використай Unknown."