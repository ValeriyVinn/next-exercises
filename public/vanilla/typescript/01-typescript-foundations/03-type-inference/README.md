# Type Inference

## 1. Що таке Type Inference

**Type Inference** — це механізм TypeScript, який автоматично визначає тип змінної, параметра, результату виразу або функції на основі доступної інформації.

Тобто нам не завжди потрібно явно писати тип:

    let age: number = 56;

TypeScript сам може визначити:

    let age = 56;
    // TypeScript → number

Це називається **type inference — виведення типу**.

---

## 2. Навіщо потрібен Type Inference

TypeScript намагається зменшити кількість зайвого коду, одночасно зберігаючи статичну типізацію.

Замість:

    let name: string = "Valeriy";
    let age: number = 56;
    let isDeveloper: boolean = true;

часто достатньо:

    let name = "Valeriy";
    let age = 56;
    let isDeveloper = true;

TypeScript автоматично визначає:

    name         → string
    age          → number
    isDeveloper  → boolean

### Головна ідея

> **Annotation — ми явно повідомляємо TypeScript тип.**
>
> **Inference — TypeScript сам визначає тип.**

---

# 3. Type Annotation vs Type Inference

## Явна типізація

    let username: string = "Valeriy";

Ми самі вказали:

    username: string

---

## Автоматичне виведення

    let username = "Valeriy";

TypeScript бачить `"Valeriy"` і виводить:

    username → string

---

## Порівняння

    // Annotation
    let age: number = 56;

    // Inference
    let age = 56;

В обох випадках:

    age → number

Але другий варіант коротший.

---

# 4. Основне правило

Запам'ятай:

> **Якщо TypeScript може надійно визначити тип — часто annotation не потрібна.**

Наприклад:

    const name = "Valeriy";
    const age = 56;
    const active = true;

TypeScript визначить:

    name   → string
    age    → number
    active → boolean

---

# 5. Inference для primitive types

## String

    let name = "John";

Тип:

    string

---

## Number

    let age = 30;

Тип:

    number

---

## Boolean

    let isAdmin = true;

Тип:

    boolean

---

## BigInt

    const bigNumber = 12345678901234567890n;

Тип:

    bigint

---

## Symbol

    const id = Symbol("id");

Тип:

    unique symbol

---

# 6. Inference для const і let

Це важливий момент.

TypeScript по-різному поводиться з `let` та `const`.

## let

    let direction = "up";

Тип:

    string

Тому що значення можна змінити:

    direction = "down";

---

## const

    const direction = "up";

TypeScript може зберегти більш вузький тип:

    "up"

Оскільки `const` не дозволяє переприсвоєння:

    // Error
    direction = "down";

---

# 7. Widening

TypeScript іноді **розширює (widens)** тип від конкретного literal до загального типу.

Наприклад:

    let status = "success";

Значення:

    "success"

але тип змінної:

    string

Тому що:

    status = "error";

дозволено.

---

## const

    const status = "success";

Тут TypeScript може вивести:

    "success"

а не просто:

    string

---

# 8. Literal Types

Literal type — це конкретне значення, яке саме є типом.

Наприклад:

    let status: "success" = "success";

Тип:

    "success"

А не:

    string

---

## Union + Literal

    let status: "success" | "error" = "success";

Тепер дозволені лише:

    status = "success";
    status = "error";

А це помилка:

    status = "loading";
    // Error

---

# 9. Inference для масивів

TypeScript аналізує елементи масиву.

    const numbers = [1, 2, 3, 4];

TypeScript:

    numbers → number[]

---

## String array

    const names = ["John", "Anna", "Mike"];

Тип:

    string[]

---

## Boolean array

    const flags = [true, false, true];

Тип:

    boolean[]

---

# 10. Mixed Arrays

Якщо масив містить різні типи:

    const values = [1, "hello", true];

TypeScript виведе:

    (string | number | boolean)[]

Тобто кожен елемент може бути:

    string
    number
    boolean

---

# 11. Empty Array

Обережно з порожніми масивами.

    const items = [];

TypeScript не отримує достатньо інформації про елементи.

У різних контекстах TypeScript може вивести тип, який не відповідає вашим подальшим намірам.

Тому для порожнього масиву часто корисно явно вказати тип:

    const numbers: number[] = [];

або:

    const names: string[] = [];

---

# 12. Inference для об'єктів

TypeScript аналізує властивості об'єкта.

    const user = {
        name: "Valeriy",
        age: 56,
        active: true
    };

TypeScript виведе приблизно:

    {
        name: string;
        age: number;
        active: boolean;
    }

---

## Доступ до властивостей

    user.name;
    // string

    user.age;
    // number

    user.active;
    // boolean

---

# 13. Nested Objects

Inference працює і для вкладених об'єктів.

    const user = {
        name: "Valeriy",
        address: {
            city: "Vinnytsia",
            country: "Ukraine"
        }
    };

TypeScript визначить:

    user.name
    // string

    user.address.city
    // string

    user.address.country
    // string

---

# 14. Arrays of Objects

    const users = [
        {
            id: 1,
            name: "John"
        },
        {
            id: 2,
            name: "Anna"
        }
    ];

TypeScript виведе:

    {
        id: number;
        name: string;
    }[]

---

# 15. Inference для функцій

TypeScript може визначати тип результату функції.

    function add(a: number, b: number) {
        return a + b;
    }

TypeScript бачить:

    a → number
    b → number

і визначає:

    return → number

Тобто фактично:

    function add(a: number, b: number): number {
        return a + b;
    }

Але `: number` можна не писати, якщо TypeScript може надійно визначити результат.

---

# 16. Return Type Inference

Наприклад:

    function greet(name: string) {
        return `Hello, ${name}`;
    }

TypeScript визначає:

    return → string

---

## Boolean

    function isAdult(age: number) {
        return age >= 18;
    }

TypeScript:

    return → boolean

---

## Object

    function createUser() {
        return {
            name: "John",
            age: 30
        };
    }

TypeScript визначить структуру об'єкта результату.

---

# 17. Коли return type краще вказати явно

Inference не означає, що annotations взагалі не потрібні.

Для важливих функцій API або публічних функцій часто корисно явно вказати return type:

    function calculateTotal(price: number, quantity: number): number {
        return price * quantity;
    }

Це:

- документує контракт;
- захищає від випадкової зміни return;
- робить API функції зрозумілішим;
- полегшує читання коду.

---

# 18. Inference параметрів функції

Тут є важлива особливість.

TypeScript **не завжди може вивести тип звичайного параметра функції**.

Наприклад:

    function greet(name) {
        return `Hello ${name}`;
    }

При `noImplicitAny: true` TypeScript повідомить про проблему, тому що тип `name` не визначений.

Потрібно:

    function greet(name: string) {
        return `Hello ${name}`;
    }

Отже:

> **Return type часто можна вивести, а типи параметрів часто потрібно вказувати явно.**

---

# 19. Contextual Typing

Іноді TypeScript визначає тип не з самого значення, а з **контексту**, у якому воно використовується.

Наприклад:

    const numbers: number[] = [1, 2, 3];

    numbers.map((number) => {
        return number * 2;
    });

TypeScript знає, що `numbers` — це `number[]`.

Тому:

    number → number

не потрібно писати:

    numbers.map((number: number) => {
        return number * 2;
    });

---

# 20. Contextual Typing у callback

Наприклад:

    const names = ["John", "Anna", "Mike"];

    names.forEach((name) => {
        console.log(name.toUpperCase());
    });

TypeScript знає:

    name → string

оскільки `names` — `string[]`.

---

# 21. Function Type Inference

Розглянемо:

    const add = (a: number, b: number) => {
        return a + b;
    };

TypeScript визначить тип:

    (a: number, b: number) => number

Тобто annotation потрібна параметрам, але return type можна вивести.

---

# 22. Повна annotation функції

Можна записати:

    const add: (a: number, b: number) => number =
        (a, b) => {
            return a + b;
        };

Але це більш багатослівний варіант.

Частіше:

    const add = (a: number, b: number): number => {
        return a + b;
    };

або навіть:

    const add = (a: number, b: number) => {
        return a + b;
    };

---

# 23. Inference для callback

Наприклад:

    const numbers = [1, 2, 3];

    const doubled = numbers.map(number => number * 2);

TypeScript визначає:

    number → number

і:

    doubled → number[]

---

# 24. Inference для Promise

Розглянемо:

    async function getUser() {
        return {
            id: 1,
            name: "John"
        };
    }

TypeScript визначить:

    Promise<{
        id: number;
        name: string;
    }>

---

## Явний return type

Можна написати:

    async function getUser(): Promise<User> {
        ...
    }

Для великих проєктів це часто кращий варіант.

---

# 25. Inference для змінних

Значення справа визначає тип зліва:

    const age = 56;

    // age → number

---

## Зміна значення

    let age = 56;

    age = 57;

Це дозволено:

    number → number

А це помилка:

    age = "57";

    // Error:
    // Type 'string' is not assignable to type 'number'

---

# 26. Inference не означає dynamic typing

Це дуже важливо.

JavaScript:

    let age = 56;

    age = "56";

У JavaScript це дозволено.

TypeScript:

    let age = 56;

    age = "56";
    // Error

TypeScript визначив:

    age → number

і контролює подальше використання змінної.

---

# 27. Inference + Type Safety

Inference є частиною статичної типізації.

    const age = 56;

TypeScript знає:

    age → number

Тому:

    age.toUpperCase();

буде помилкою.

Метод `toUpperCase()` існує для `string`, але не для `number`.

---

# 28. Inference і Type Annotation разом

У реальному TypeScript-коді вони постійно використовуються разом.

Наприклад:

    interface User {
        id: number;
        name: string;
    }

    function getUser(id: number) {
        return {
            id,
            name: "John"
        };
    }

Тут:

    id → number

виведено з annotation параметра.

А return type TypeScript виводить автоматично.

---

# 29. Inference через передані аргументи

Наприклад:

    function double(value: number) {
        return value * 2;
    }

    const result = double(10);

TypeScript знає:

    value → number

і:

    result → number

---

# 30. Generic Type Inference

Inference особливо важливий у generics.

Наприклад:

    function identity<T>(value: T): T {
        return value;
    }

Викликаємо:

    const number = identity(10);

TypeScript виводить:

    T → number

тому:

    number → number

---

## String

    const text = identity("hello");

TypeScript:

    T → string

---

## Boolean

    const flag = identity(true);

TypeScript:

    T → boolean

Детально generics розглядатимуться пізніше.

---

# 31. Inference для generic функцій

Ще один приклад:

    function first<T>(items: T[]): T {
        return items[0];
    }

    const number = first([10, 20, 30]);

TypeScript визначає:

    T → number

результат:

    number → number

---

# 32. Inference та Destructuring

TypeScript може використовувати вже відомий тип об'єкта.

    const user = {
        name: "John",
        age: 30
    };

    const { name, age } = user;

TypeScript визначить:

    name → string
    age  → number

---

# 33. Inference у destructured parameters

Наприклад, якщо функція отримує об'єкт через тип:

    interface User {
        name: string;
        age: number;
    }

    function greet({ name, age }: User) {
        return `${name} is ${age} years old`;
    }

TypeScript знає:

    name → string
    age → number

---

# 34. Inference для класів

TypeScript також може визначати типи властивостей, якщо вони ініціалізовані.

    class User {
        name = "John";
        age = 30;
    }

TypeScript визначає:

    name → string
    age → number

---

# 35. Inference у constructor

Наприклад:

    class User {
        name: string;
        age: number;

        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }
    }

Типи параметрів constructor задані явно, а властивості класу мають відповідні типи.

---

# 36. Inference і Union Types

TypeScript може виводити union.

    let value = Math.random() > 0.5
        ? "hello"
        : 42;

TypeScript визначить:

    value → string | number

Тому потрібно враховувати обидва можливі типи.

---

# 37. Inference і Control Flow Analysis

TypeScript може уточнювати тип залежно від умов.

    let value: string | number = "hello";

    if (typeof value === "string") {
        value.toUpperCase();
    }

Усередині `if` TypeScript знає:

    value → string

Це вже пов'язано з **type narrowing** та control flow analysis.

---

# 38. Inference та null

При:

    const value = null;

TypeScript обробляє `null` відповідно до налаштувань компілятора.

Особливо важливим є:

    strictNullChecks

При строгому режимі `null` та `undefined` розглядаються як окремі типи.

Детальніше це буде в темі:

    09-null-and-undefined

---

# 39. Inference та readonly

Наприклад:

    const numbers = [1, 2, 3];

`const` забороняє переприсвоїти саму змінну:

    // Error
    numbers = [4, 5, 6];

Але не робить масив readonly:

    numbers.push(4);

Це дозволено.

Для справжнього readonly-масиву:

    const numbers: readonly number[] = [1, 2, 3];

або:

    const numbers = [1, 2, 3] as const;

Це вже інші механізми, пов'язані з readonly та literal inference.

---

# 40. Inference vs `as const`

Порівняй:

    const status = "success";

TypeScript може вивести:

    "success"

А для об'єкта:

    const user = {
        name: "John"
    };

властивість `name` зазвичай має тип:

    string

Можна використати:

    const user = {
        name: "John"
    } as const;

Тепер:

    user.name → "John"

і властивість стає readonly.

`as const` — це не type annotation, а **const assertion**.

---

# 41. Inference vs Type Assertion

Не плутай:

### Type inference

    const age = 56;

TypeScript сам визначає:

    number

### Type annotation

    const age: number = 56;

Ми явно задаємо:

    number

### Type assertion

    const age = value as number;

Ми говоримо TypeScript:

    "вважай це number"

Це три різні механізми.

---

# 42. Inference не перевіряє runtime-дані

TypeScript inference працює під час компіляції.

Наприклад:

    const response = await fetch("/api/users");
    const data = await response.json();

TypeScript не може магічно перевірити, що сервер реально повернув правильний JSON.

Навіть якщо ми напишемо:

    const user: User = await response.json();

це не створює runtime validation.

Для зовнішніх даних потрібна додаткова runtime-перевірка.

---

# 43. Inference і JSON

Наприклад:

    const data = JSON.parse('{"name":"John"}');

Тип результату `JSON.parse()` зазвичай не дає нам гарантовану структуру конкретного об'єкта.

Не можна припускати:

    data.name → гарантовано string

лише тому, що ми очікуємо таку структуру.

Для зовнішніх даних потрібні:

- runtime validation;
- schema validation;
- перевірка API response;
- безпечні типи.

---

# 44. Inference і `any`

`any` фактично вимикає значну частину type checking.

Наприклад:

    let value: any = 10;

Тепер TypeScript дозволяє:

    value = "hello";
    value = true;
    value.foo.bar();
    value.someMethod();

Тому `any` потрібно використовувати обережно.

---

# 45. Inference і `unknown`

`unknown` безпечніший за `any`.

    let value: unknown = "hello";

Не можна просто написати:

    value.toUpperCase();

Спочатку потрібно перевірити тип:

    if (typeof value === "string") {
        value.toUpperCase();
    }

Це змушує програміста явно перевіряти дані.

---

# 46. Type Inference і TypeScript Compiler

Inference виконується TypeScript compiler.

Наприклад:

    const age = 56;

Compiler аналізує expression:

    56

і визначає відповідний тип.

Потім використовує цей тип для:

- перевірки наступних операцій;
- autocomplete;
- IntelliSense;
- перевірки аргументів;
- перевірки return;
- аналізу властивостей;
- narrowing.

---

# 47. Type Inference та IDE

Inference є однією з причин, чому TypeScript так добре працює у VS Code.

Наприклад:

    const user = {
        name: "John",
        age: 30
    };

При:

    user.

IDE може запропонувати:

    name
    age

Тому що TypeScript вже знає структуру `user`.

---

# 48. Коли використовувати inference

Inference особливо доречний, коли тип очевидний.

Наприклад:

    const name = "John";

    const age = 30;

    const users = ["John", "Anna"];

    const isActive = true;

    const total = price * quantity;

У таких випадках annotation часто не додає корисної інформації.

---

# 49. Коли краще використовувати annotation

Явний тип корисний, коли:

- тип неочевидний;
- значення буде задано пізніше;
- функція є важливою частиною API;
- потрібно обмежити можливі типи;
- тип має бути ширшим за inferred type;
- використовується union;
- потрібна документація;
- потрібно визначити контракт об'єкта.

Наприклад:

    let user: User;

    user = getUser();

---

# 50. Variable без початкового значення

Це типовий випадок, коли annotation потрібна.

    let username: string;

Пізніше:

    username = "John";

Без annotation TypeScript не отримує достатньо інформації про майбутнє значення.

---

# 51. Annotation може бути навмисно ширшою

Наприклад:

    const value: string = "hello";

Хоча значення `"hello"` конкретне, ми явно сказали:

    value → string

Це може бути корисно, якщо нам потрібен загальніший контракт.

---

# 52. Annotation може обмежувати значення

Наприклад:

    let status: "success" | "error";

Тепер:

    status = "success";
    status = "error";

але:

    status = "loading";
    // Error

Тобто annotation може не тільки документувати тип, а й обмежувати допустимі значення.

---

# 53. Надлишкові annotations

Не потрібно писати тип там, де він очевидний.

Наприклад:

    const name: string = "John";

    const age: number = 30;

    const active: boolean = true;

Це не помилка, але часто зайве.

Простіше:

    const name = "John";
    const age = 30;
    const active = true;

---

# 54. Але annotation не є поганою практикою

Не слід запам'ятовувати правило:

> "Ніколи не пиши annotations."

Правильніше:

> **Використовуй inference там, де тип очевидний, і annotation там, де вона додає ясність або обмеження.**

---

# 55. Типовий баланс

Хороший стиль:

    const user = {
        name: "John",
        age: 30
    };

    function calculateTotal(
        price: number,
        quantity: number
    ): number {
        return price * quantity;
    }

Тут:

- об'єкт → inference;
- параметри → annotation;
- return → можна inference або annotation залежно від стилю;
- логіка → type-safe.

---

# 56. Типові помилки

## Помилка 1 — думати, що inference = JavaScript

Неправильно:

    let age = 30;
    age = "30";

У TypeScript це помилка.

Inference створив:

    age → number

---

## Помилка 2 — вважати `const` readonly-об'єктом

    const user = {
        name: "John"
    };

Це дозволено:

    user.name = "Anna";

`const` захищає binding, а не всі властивості об'єкта.

---

## Помилка 3 — плутати annotation та assertion

    const value: number = 10;

і:

    const value = something as number;

не є одним і тим самим.

---

## Помилка 4 — використовувати `any`, щоб позбутися помилки

Погано:

    const data: any = getData();

Краще визначити реальний тип або використати `unknown` з перевіркою.

---

## Помилка 5 — думати, що TypeScript перевіряє API runtime

    const user: User = response;

Annotation не означає автоматичну перевірку фактичних даних.

---

# 57. Практичні приклади

## Приклад 1 — базовий inference

    const name = "Valeriy";
    const age = 56;
    const active = true;

Очікувані типи:

    name   → string
    age    → number
    active → boolean

---

## Приклад 2 — масив

    const scores = [10, 20, 30];

Тип:

    number[]

---

## Приклад 3 — об'єкт

    const product = {
        id: 1,
        title: "Book",
        price: 500
    };

Тип:

    {
        id: number;
        title: string;
        price: number;
    }

---

## Приклад 4 — функція

    function multiply(a: number, b: number) {
        return a * b;
    }

TypeScript:

    a → number
    b → number
    return → number

---

## Приклад 5 — callback

    const prices = [100, 200, 300];

    const doubled = prices.map(price => price * 2);

TypeScript:

    price → number
    doubled → number[]

---

## Приклад 6 — union inference

    const value = Math.random() > 0.5
        ? 10
        : "hello";

Тип:

    string | number

---

## Приклад 7 — generic inference

    function identity<T>(value: T): T {
        return value;
    }

    const result = identity(100);

TypeScript:

    T → number
    result → number

---

# 58. Практична вправа

Створи файл:

    practice.ts

Додай:

    const username = "Valeriy";
    const age = 56;
    const isStudent = true;

    const scores = [10, 20, 30, 40];

    const user = {
        name: username,
        age,
        active: true
    };

    function add(a: number, b: number) {
        return a + b;
    }

    const result = add(10, 20);

Для кожної змінної спробуй сам визначити тип.

---

# 59. Практична вправа — знайди типи

Визнач тип кожного виразу:

    const a = "hello";

    const b = 42;

    const c = true;

    const d = [1, 2, 3];

    const e = ["a", "b", "c"];

    const f = [1, "two"];

    const g = {
        id: 1,
        name: "John"
    };

    const h = Math.random() > 0.5 ? 10 : "ten";

Відповідь:

    a → string
    b → number
    c → boolean
    d → number[]
    e → string[]
    f → (string | number)[]
    g → { id: number; name: string }
    h → string | number

---

# 60. Практична вправа — inference чи annotation?

Визнач, де annotation дійсно потрібна:

    const name = "John";

    let age: number;

    const numbers = [1, 2, 3];

    function add(a: number, b: number) {
        return a + b;
    }

    const active = true;

    let status: "success" | "error";

Приблизний підхід:

    const name = "John";
    // inference

    let age: number;
    // annotation потрібна

    const numbers = [1, 2, 3];
    // inference

    function add(a: number, b: number) {
        // parameter annotations
        // return можна вивести
    }

    const active = true;
    // inference

    let status: "success" | "error";
    // annotation задає обмеження

---

# 61. Практична вправа — дослідження в VS Code

Створи:

    const user = {
        name: "John",
        age: 30,
        active: true
    };

Наведи курсор на:

    user

Потім:

    user.name

    user.age

    user.active

Подивись, які типи показує TypeScript.

Після цього зміни значення:

    user.age = "30";

Подивись на помилку TypeScript.

---

# 62. Практична вправа — widening

Порівняй:

    let a = "hello";

    const b = "hello";

Наведи курсор на `a` і `b`.

Очікувано:

    a → string

    b → "hello"

Тепер:

    let c: "hello" = "hello";

Порівняй `b` і `c`.

---

# 63. Практична вправа — function inference

Напиши:

    function square(value: number) {
        return value * value;
    }

Спробуй визначити:

    value → ?
    return → ?

Потім наведи курсор у VS Code і перевір.

---

# 64. Практична вправа — callback inference

Створи:

    const numbers = [1, 2, 3, 4, 5];

    const result = numbers.map(number => number * 2);

Визнач:

    numbers → ?
    number → ?
    result → ?

Відповідь:

    numbers → number[]
    number → number
    result → number[]

---

# 65. Що потрібно запам'ятати

### 1. Type inference

    const age = 56;

TypeScript сам визначає:

    number

---

### 2. Annotation

    const age: number = 56;

Тип вказаний програмістом.

---

### 3. Return inference

    function add(a: number, b: number) {
        return a + b;
    }

TypeScript визначає:

    number

---

### 4. Parameter types

Параметри часто потрібно типізувати:

    function greet(name: string) {
        ...
    }

---

### 5. Contextual typing

Контекст може підказати TypeScript тип:

    numbers.map(number => number * 2);

---

### 6. Inference ≠ runtime validation

TypeScript не перевіряє реальні зовнішні дані під час виконання програми.

---

# 66. Type Inference у великому проєкті

У реальному застосунку inference працює всюди:

    const user = getUser();

    const users = await getUsers();

    const products = productsData.filter(
        product => product.active
    );

    const total = cart.reduce(
        (sum, item) => sum + item.price,
        0
    );

TypeScript постійно будує інформацію про типи між різними частинами програми.

Це дозволяє отримати:

- autocomplete;
- type checking;
- refactoring;
- navigation;
- підказки IDE;
- перевірку API функцій;
- безпечні callbacks;
- безпечні generic functions.

---

# 67. Inference у TypeScript-мисленні

Корисно мислити не так:

> "Я повинен типізувати кожну змінну."

А так:

> "Який тип TypeScript може визначити сам?"

Наприклад:

    const price = 100;
    const quantity = 3;
    const total = price * quantity;

Немає необхідності:

    const price: number = 100;
    const quantity: number = 3;
    const total: number = price * quantity;

Inference вже забезпечує потрібну type safety.

---

# 68. Коли inference може бути недостатнім

Inference не завжди знає ваш задум.

Наприклад:

    let user;

або:

    const data = getExternalData();

або:

    let status;

У таких ситуаціях annotation може бути необхідною.

Наприклад:

    let user: User;

    let status: "idle" | "loading" | "success" | "error";

---

# 69. Inference та архітектура

На рівні маленьких локальних значень:

    const total = price * quantity;

Inference чудовий.

На рівні публічних контрактів:

    function createUser(data: CreateUserInput): User {
        ...
    }

явні типи часто корисніші.

Тому можна сформулювати правило:

> **Local implementation → inference.**
>
> **Public contract → explicit types.**

Це не абсолютне правило, але дуже корисна практична модель.

---

# 70. Типовий професійний стиль

Хороший TypeScript-код зазвичай не виглядає як:

    const name: string = "John";
    const age: number = 30;
    const active: boolean = true;

якщо типи і так очевидні.

Частіше:

    const name = "John";
    const age = 30;
    const active = true;

Але для API/контрактів:

    function createUser(data: CreateUserInput): User {
        ...
    }

Це дає хороший баланс між:

    readability
    +
    type safety
    +
    maintainability

---

# 71. Interview Questions

## Junior

### 1. Що таке Type Inference?

Механізм TypeScript, який автоматично визначає тип на основі значення, контексту або використання.

---

### 2. Яка різниця між annotation та inference?

Annotation:

    const age: number = 56;

Inference:

    const age = 56;

У першому випадку тип задає програміст, у другому — TypeScript.

---

### 3. Чи потрібно типізувати кожну змінну?

Ні.

Якщо TypeScript надійно визначає тип, annotation часто зайва.

---

### 4. Чи визначає TypeScript return type функції?

Так, у багатьох випадках TypeScript може автоматично визначити return type.

---

### 5. Чи визначає TypeScript тип параметра функції?

Не завжди.

Звичайний параметр часто потрібно типізувати явно:

    function greet(name: string) {
        ...
    }

---

# 72. Interview Questions — Middle

### 1. Що таке contextual typing?

Це ситуація, коли TypeScript визначає тип expression на основі контексту.

Наприклад:

    const numbers = [1, 2, 3];

    numbers.map(number => number * 2);

TypeScript знає, що `number` — `number`.

---

### 2. Що таке widening?

Це процес розширення конкретного literal type до більш загального типу.

Наприклад:

    let status = "success";

Тип:

    string

---

### 3. Чим відрізняються `const` і `let` з точки зору inference?

`let` часто отримує widened type:

    let value = "hello";
    // string

`const` для primitive values може зберігати literal type:

    const value = "hello";
    // "hello"

---

### 4. Чим inference відрізняється від type assertion?

Inference:

    const value = 10;

Assertion:

    const value = something as number;

Inference визначає тип самостійно.

Assertion повідомляє TypeScript, який тип слід припустити.

---

### 5. Чи забезпечує inference runtime safety?

Ні.

TypeScript працює на рівні compile-time.

---

# 73. Interview Questions — Senior

### 1. Як inference пов'язаний із structural typing?

TypeScript порівнює структуру типів, а не лише їхні назви.

Наприклад:

    const user = {
        name: "John",
        age: 30
    };

Структура об'єкта може бути сумісною з іншим структурним типом, якщо необхідні властивості присутні та сумісні.

---

### 2. Як inference працює з generics?

TypeScript може визначати generic type parameters на основі аргументів:

    function identity<T>(value: T): T {
        return value;
    }

    const result = identity(42);

Тут:

    T → number

---

### 3. Що таке control flow analysis?

TypeScript аналізує можливі шляхи виконання програми та може уточнювати типи після перевірок.

Наприклад:

    function print(value: string | number) {
        if (typeof value === "string") {
            value.toUpperCase();
        }
    }

Усередині `if`:

    value → string

---

# 74. Learning Path

## 🟢 Core

Потрібно знати:

- що таке Type Inference;
- primitive inference;
- array inference;
- object inference;
- function return inference;
- різницю між annotation та inference;
- `let` vs `const`;
- widening;
- базовий contextual typing.

Приклади:

    const name = "John";
    const age = 30;
    const numbers = [1, 2, 3];

---

## 🔵 Junior

Потрібно вміти:

- використовувати inference у повсякденному коді;
- визначати, де annotation зайва;
- типізувати параметри функцій;
- розуміти callback inference;
- працювати з union inference;
- розуміти literal types;
- використовувати inference з generics;
- читати типи, які показує VS Code.

---

## 🟣 Middle

Потрібно розуміти:

- contextual typing;
- widening;
- literal inference;
- generic inference;
- control flow analysis;
- type narrowing;
- inference у складних expressions;
- взаємодію inference та annotations;
- inference у React;
- inference у Node.js/API-коді.

---

## 🔴 Senior

Потрібно глибоко розуміти:

- TypeScript inference algorithm на практичному рівні;
- structural typing;
- generic inference;
- contextual typing;
- control flow analysis;
- conditional types;
- mapped types;
- distributive conditional types;
- inference у складних generic API;
- trade-offs між explicit types та inference;
- design type-safe public APIs.

---

# 75. Mini Cheat Sheet

| Ситуація | Приклад | Тип |
|---|---|---|
| String | `const name = "John"` | `string` |
| Number | `const age = 30` | `number` |
| Boolean | `const active = true` | `boolean` |
| Array | `const nums = [1, 2]` | `number[]` |
| Object | `const user = { id: 1 }` | `{ id: number }` |
| Function return | `return a + b` | inferred |
| Callback | `map(x => x * 2)` | contextual typing |
| Union | `true ? 1 : "a"` | `number \| string` |
| Generic | `identity(10)` | `T → number` |
| Literal | `const x = "up"` | `"up"` |

---

# 76. Найважливіші правила

    // 1. Очевидний тип → inference
    const age = 56;

    // 2. Параметри функцій → часто annotation
    function add(a: number, b: number) {
        return a + b;
    }

    // 3. Return → часто inference
    function multiply(a: number, b: number) {
        return a * b;
    }

    // 4. Публічний контракт → часто explicit type
    function createUser(data: CreateUserInput): User {
        ...
    }

    // 5. Не використовуй any просто для обходу type errors
    const value: any = data;

    // 6. Inference не є runtime validation
    const data = JSON.parse(input);

---

# 77. Головне

**Type Inference — одна з фундаментальних можливостей TypeScript.**

Тобі не потрібно вручну описувати кожен очевидний тип.

TypeScript сам може визначити:

    const name = "John";
    // string

    const age = 30;
    // number

    const numbers = [1, 2, 3];
    // number[]

    const user = {
        name: "John",
        age: 30
    };
    // { name: string; age: number }

    function add(a: number, b: number) {
        return a + b;
    }
    // return → number

Головна практична ідея:

> **Не типізуй механічно все підряд.**
>
> **Дозволяй TypeScript виводити очевидні типи, але явно описуй важливі контракти, обмеження та неоднозначні місця.**

Формула:

    Type Annotation
          ↓
    "Я кажу TypeScript, який це тип"

    Type Inference
          ↓
    "TypeScript сам визначає тип"

    Contextual Typing
          ↓
    "TypeScript визначає тип із контексту"

    Type Narrowing
          ↓
    "TypeScript уточнює тип після перевірки"

Разом вони формують основу **статичної типізації TypeScript**.