# Objects and Types

> **Шлях:** `01-typescript-foundations/06-objects-and-types`  
> **Рівень:** Core → Junior  
> **Тема:** Типізація об'єктів у TypeScript

---

## 1. Вступ

Об'єкти — одна з найважливіших структур даних у JavaScript та TypeScript.

У JavaScript об'єкт може містити будь-які властивості:

    const user = {
        name: "Valeriy",
        age: 56,
        isAdmin: false
    };

TypeScript дозволяє описати **форму об'єкта**:

    const user: {
        name: string;
        age: number;
        isAdmin: boolean;
    } = {
        name: "Valeriy",
        age: 56,
        isAdmin: false
    };

Тобто TypeScript перевіряє:

- які властивості повинні існувати;
- які типи вони мають;
- які властивості можуть бути відсутні;
- які властивості можуть бути `readonly`;
- які методи повинен мати об'єкт;
- які додаткові властивості дозволені;
- чи відповідає об'єкт очікуваній структурі.

Це називається **структурною типізацією (structural typing)**.

---

# 2. Що потрібно знати

Після цієї теми потрібно розуміти:

- object type;
- type annotations для об'єктів;
- shape of an object;
- required properties;
- optional properties;
- `readonly` properties;
- nested objects;
- arrays of objects;
- object methods;
- function properties;
- index signatures;
- dynamic object keys;
- `type` для об'єктів;
- `interface` як наступний крок;
- structural typing;
- excess property checks;
- `typeof`;
- `keyof`;
- різницю між JavaScript object та TypeScript object type.

---

# 3. Object Type

Найпростіший спосіб описати тип об'єкта — записати його структуру.

    const user: {
        name: string;
        age: number;
    } = {
        name: "John",
        age: 30
    };

Тут:

    name: string

означає:

> властивість `name` повинна мати тип `string`.

А:

    age: number

означає:

> властивість `age` повинна мати тип `number`.

---

# 4. Shape об'єкта

TypeScript цікавить не тільки те, що це `object`.

Він перевіряє **структуру (shape)** об'єкта.

    const user: {
        name: string;
        age: number;
    } = {
        name: "John",
        age: 30
    };

Форма:

    {
        name: string;
        age: number;
    }

означає:

    {
        name: string;
        age: number;
    }

Тобто об'єкт повинен відповідати цій структурі.

---

# 5. Required Properties

За замовчуванням усі властивості є обов'язковими.

    const user: {
        name: string;
        age: number;
    } = {
        name: "John"
    };

Це помилка.

Відсутня:

    age

Правильно:

    const user: {
        name: string;
        age: number;
    } = {
        name: "John",
        age: 30
    };

---

# 6. Додаткові властивості

Розглянемо:

    const user: {
        name: string;
        age: number;
    } = {
        name: "John",
        age: 30,
        email: "john@example.com"
    };

TypeScript може повідомити про зайву властивість `email`.

Це називається:

> **Excess Property Check**

Особливо важливо це при передачі object literal безпосередньо в місце, де очікується певний тип.

---

# 7. Optional Properties

Якщо властивість може бути відсутньою, використовується `?`.

    const user: {
        name: string;
        age?: number;
    } = {
        name: "John"
    };

`age?` означає:

> `age` необов'язкова.

Можна:

    const user1: {
        name: string;
        age?: number;
    } = {
        name: "John"
    };

Або:

    const user2: {
        name: string;
        age?: number;
    } = {
        name: "John",
        age: 30
    };

---

# 8. Optional Property та undefined

Optional property фактично означає, що властивість може бути відсутня.

При читанні:

    user.age

значення може бути:

    number | undefined

Тому потрібно враховувати `undefined`.

    if (user.age !== undefined) {
        console.log(user.age);
    }

---

# 9. Readonly Properties

`readonly` забороняє змінювати властивість після створення об'єкта.

    const user: {
        readonly id: number;
        name: string;
    } = {
        id: 1,
        name: "John"
    };

Можна:

    user.name = "Mike";

Не можна:

    user.id = 2;

Тому що:

    id

має модифікатор:

    readonly

---

# 10. readonly не означає deep readonly

Важливо:

`readonly` захищає тільки конкретну властивість.

Наприклад:

    const user: {
        readonly profile: {
            name: string;
        };
    } = {
        profile: {
            name: "John"
        }
    };

Не можна:

    user.profile = {
        name: "Mike"
    };

Але можна:

    user.profile.name = "Mike";

Тому що `profile` readonly, але `name` всередині `profile` — ні.

---

# 11. Primitive Types в Object

Властивості об'єкта можуть мати будь-які TypeScript типи.

    const product: {
        id: number;
        name: string;
        price: number;
        available: boolean;
    } = {
        id: 1,
        name: "Laptop",
        price: 1200,
        available: true
    };

---

# 12. Object з null

Можна явно дозволити `null`.

    const user: {
        name: string;
        avatar: string | null;
    } = {
        name: "John",
        avatar: null
    };

Пізніше:

    user.avatar = "/images/avatar.jpg";

Тип:

    string | null

означає:

> `avatar` або рядок, або `null`.

---

# 13. Nested Objects

Об'єкти можуть містити інші об'єкти.

    const user: {
        name: string;
        address: {
            city: string;
            country: string;
        };
    } = {
        name: "John",
        address: {
            city: "Vinnytsia",
            country: "Ukraine"
        }
    };

Структура:

    user
    ├── name
    └── address
        ├── city
        └── country

Доступ:

    user.name
    user.address.city
    user.address.country

---

# 14. Глибоко вкладені об'єкти

    const product: {
        id: number;
        info: {
            name: string;
            manufacturer: {
                name: string;
                country: string;
            };
        };
    } = {
        id: 1,
        info: {
            name: "Laptop",
            manufacturer: {
                name: "Example",
                country: "USA"
            }
        }
    };

Але дуже великі inline object types стають незручними.

Тому краще використовувати:

    type

або:

    interface

---

# 15. Object Type Alias

Для повторного використання типу використовують `type`.

    type User = {
        name: string;
        age: number;
    };

Тепер:

    const user1: User = {
        name: "John",
        age: 30
    };

    const user2: User = {
        name: "Mike",
        age: 25
    };

Це значно зручніше.

---

# 16. Type Alias для вкладених об'єктів

    type Address = {
        city: string;
        country: string;
    };

    type User = {
        name: string;
        age: number;
        address: Address;
    };

    const user: User = {
        name: "John",
        age: 30,
        address: {
            city: "Vinnytsia",
            country: "Ukraine"
        }
    };

Це вже набагато ближче до реального TypeScript-коду.

---

# 17. Optional Properties у Type Alias

    type User = {
        name: string;
        age?: number;
        email?: string;
    };

    const user: User = {
        name: "John"
    };

Також:

    const user: User = {
        name: "John",
        age: 30,
        email: "john@example.com"
    };

---

# 18. Readonly у Type Alias

    type User = {
        readonly id: number;
        name: string;
    };

    const user: User = {
        id: 1,
        name: "John"
    };

    user.name = "Mike";

    // Помилка:
    // user.id = 2;

---

# 19. Arrays of Objects

Одна з найчастіших конструкцій у реальних програмах.

    type User = {
        id: number;
        name: string;
    };

    const users: User[] = [
        {
            id: 1,
            name: "John"
        },
        {
            id: 2,
            name: "Mike"
        }
    ];

Або:

    const users: Array<User> = [
        {
            id: 1,
            name: "John"
        },
        {
            id: 2,
            name: "Mike"
        }
    ];

---

# 20. Object Methods

Об'єкт може містити методи.

    const user: {
        name: string;
        greet(): string;
    } = {
        name: "John",

        greet() {
            return `Hello, ${this.name}`;
        }
    };

Виклик:

    console.log(user.greet());

---

# 21. Function Property

Метод можна описати і як function property.

    const user: {
        name: string;
        greet: () => string;
    } = {
        name: "John",

        greet: () => {
            return "Hello";
        }
    };

Різниця:

    greet(): string;

та:

    greet: () => string;

Обидва варіанти описують функціональну властивість, але синтаксис і деякі правила щодо `this` відрізняються.

---

# 22. Method з параметрами

    type Calculator = {
        add(a: number, b: number): number;
    };

    const calculator: Calculator = {
        add(a, b) {
            return a + b;
        }
    };

Використання:

    calculator.add(10, 20);

---

# 23. Object з різними типами

    type Product = {
        id: number;
        name: string;
        price: number;
        tags: string[];
        available: boolean;
        description?: string;
    };

    const product: Product = {
        id: 1,
        name: "Laptop",
        price: 1200,
        tags: ["computer", "electronics"],
        available: true
    };

---

# 24. Index Signature

Іноді ми не знаємо наперед назви всіх властивостей.

Наприклад:

    const scores: {
        [key: string]: number;
    } = {
        math: 95,
        english: 88,
        physics: 91
    };

Тут:

    [key: string]: number;

означає:

> будь-який ключ типу `string` повинен мати значення типу `number`.

---

# 25. Index Signature — практичний приклад

    type Scores = {
        [subject: string]: number;
    };

    const scores: Scores = {
        math: 95,
        physics: 90,
        english: 88
    };

Можна:

    scores.math
    scores.physics
    scores.english

Не можна записати число:

    scores.math = "excellent";

Тому що очікується:

    number

---

# 26. Index Signature з number

Можна використовувати числові ключі.

    type UserNames = {
        [id: number]: string;
    };

    const users: UserNames = {
        1: "John",
        2: "Mike",
        3: "Anna"
    };

---

# 27. Index Signature та відомі властивості

Можна поєднувати конкретні властивості з index signature.

    type User = {
        name: string;
        [key: string]: string;
    };

    const user: User = {
        name: "John",
        city: "Vinnytsia",
        country: "Ukraine"
    };

Усі додаткові string-ключі повинні мати `string` значення.

---

# 28. Dictionary Object

Index signatures часто використовуються для словників.

    type Dictionary = {
        [key: string]: string;
    };

    const dictionary: Dictionary = {
        hello: "привіт",
        world: "світ",
        book: "книга"
    };

---

# 29. Record як альтернатива

Пізніше можна використовувати utility type `Record`.

    type Dictionary = Record<string, string>;

Це аналогічно:

    type Dictionary = {
        [key: string]: string;
    };

`Record` детальніше розглядається у темі:

    07-built-in-utility-types

---

# 30. Object Types та Functions

Функції можуть приймати об'єкти.

    type User = {
        name: string;
        age: number;
    };

    function printUser(user: User): void {
        console.log(user.name);
        console.log(user.age);
    }

Виклик:

    printUser({
        name: "John",
        age: 30
    });

---

# 31. Function, яка повертає Object

    type User = {
        name: string;
        age: number;
    };

    function createUser(): User {
        return {
            name: "John",
            age: 30
        };
    }

---

# 32. Object Destructuring

TypeScript коректно типізує destructuring.

    type User = {
        name: string;
        age: number;
    };

    const user: User = {
        name: "John",
        age: 30
    };

    const { name, age } = user;

TypeScript знає:

    name // string
    age  // number

---

# 33. Destructuring у параметрах функції

    type User = {
        name: string;
        age: number;
    };

    function greetUser({ name, age }: User): string {
        return `Hello, ${name}. You are ${age}.`;
    }

---

# 34. Spread Object

TypeScript також перевіряє об'єкти, створені через spread.

    type User = {
        name: string;
        age: number;
    };

    const user: User = {
        name: "John",
        age: 30
    };

    const updatedUser = {
        ...user,
        age: 31
    };

TypeScript виведе відповідну структуру.

---

# 35. Object Type та const

`const` не робить властивості об'єкта readonly.

    const user = {
        name: "John",
        age: 30
    };

Можна:

    user.name = "Mike";

`const` забороняє переприсвоїти саму змінну:

    // user = ...

Але не забороняє змінювати властивості об'єкта.

Для readonly:

    type User = {
        readonly name: string;
    };

---

# 36. Object Type та as const

`as const` робить значення максимально вузькими та readonly.

    const user = {
        name: "John",
        age: 30
    } as const;

Тепер:

    user.name
    // "John"

    user.age
    // 30

і властивості readonly.

`as const` детальніше розглядається у темах про literal types та assertions.

---

# 37. Structural Typing

TypeScript використовує **структурну типізацію**.

Наприклад:

    type User = {
        name: string;
    };

    const person = {
        name: "John",
        age: 30
    };

    const user: User = person;

Це працює.

Чому?

Тому що `person` має необхідну властивість:

    name: string

Наявність додаткової `age` не заважає при присвоєнні вже створеної змінної.

---

# 38. Structural Typing — головна ідея

У TypeScript важливо:

> **Що об'єкт має**, а не **як він називається**.

Наприклад:

    type Point = {
        x: number;
        y: number;
    };

    const position = {
        x: 10,
        y: 20,
        label: "A"
    };

    const point: Point = position;

Працює, тому що `position` має:

    x: number
    y: number

---

# 39. Excess Property Check

Розглянемо два випадки.

### Випадок 1

    type User = {
        name: string;
    };

    const user: User = {
        name: "John",
        age: 30
    };

TypeScript може видати помилку через `age`.

### Випадок 2

    const person = {
        name: "John",
        age: 30
    };

    const user: User = person;

Це може працювати через structural typing.

Це одна з особливостей TypeScript, яку важливо знати.

---

# 40. `object` як тип

Можна написати:

    let value: object;

    value = {};
    value = [];
    value = function () {};

Але:

    value = 10;

не дозволено.

Так само:

    value = "hello";

не дозволено.

Але `object` занадто загальний для більшості прикладних задач.

---

# 41. object vs конкретний Object Type

Погано:

    const user: object = {
        name: "John",
        age: 30
    };

TypeScript знає лише:

    object

Він не дає зручного доступу до:

    user.name

Краще:

    const user: {
        name: string;
        age: number;
    } = {
        name: "John",
        age: 30
    };

Тепер TypeScript знає структуру.

---

# 42. Не використовуй `Object` без потреби

Не слід плутати:

    object

з:

    Object

У більшості випадків краще використовувати конкретну структуру.

Замість:

    const value: Object = {};

краще:

    const value: Record<string, unknown> = {};

або конкретний type:

    type User = {
        name: string;
    };

---

# 43. `unknown` для невідомих об'єктів

Якщо структура об'єкта невідома, можна використати:

    let data: unknown;

    data = {
        name: "John"
    };

Але перед використанням потрібно перевірити тип.

Наприклад:

    if (typeof data === "object" && data !== null) {
        console.log(data);
    }

`unknown` безпечніший за `any`.

---

# 44. `any` та об'єкти

Можна:

    const user: any = {
        name: "John",
        age: 30
    };

Але тоді TypeScript фактично перестає контролювати структуру.

Наприклад:

    user.name.toUpperCase();
    user.age.toFixed();
    user.someUnknownMethod();

TypeScript не зможе нормально захистити від багатьох помилок.

Тому:

> `any` не слід використовувати як стандартний спосіб опису об'єктів.

---

# 45. `typeof` для отримання типу

Можна створити об'єкт:

    const user = {
        name: "John",
        age: 30
    };

А потім отримати його тип:

    type User = typeof user;

Тепер:

    type User = {
        name: string;
        age: number;
    };

Це дуже корисний прийом.

---

# 46. `typeof` — практичний приклад

    const defaultUser = {
        name: "John",
        age: 30,
        isAdmin: false
    };

    type User = typeof defaultUser;

Тепер:

    const user: User = {
        name: "Mike",
        age: 25,
        isAdmin: true
    };

---

# 47. `keyof`

`keyof` дозволяє отримати union ключів object type.

    type User = {
        id: number;
        name: string;
        email: string;
    };

    type UserKey = keyof User;

Результат:

    "id" | "name" | "email"

Це дуже важлива концепція для подальшого вивчення TypeScript.

---

# 48. `keyof` — практичний приклад

    type User = {
        id: number;
        name: string;
        email: string;
    };

    function getUserValue(
        user: User,
        key: keyof User
    ) {
        return user[key];
    }

Тепер:

    getUserValue(user, "name");
    getUserValue(user, "email");

Але:

    getUserValue(user, "password");

викличе помилку, якщо `password` немає у `User`.

---

# 49. Object Types та Literal Types

Властивості можуть бути обмежені конкретними значеннями.

    type User = {
        name: string;
        role: "admin" | "user";
    };

Тепер:

    const user1: User = {
        name: "John",
        role: "admin"
    };

    const user2: User = {
        name: "Mike",
        role: "user"
    };

Але:

    const user3: User = {
        name: "Anna",
        role: "manager"
    };

Помилка.

---

# 50. Object з Union Type

    type User = {
        name: string;
        id: number | string;
    };

Можна:

    const user1: User = {
        name: "John",
        id: 1
    };

Або:

    const user2: User = {
        name: "John",
        id: "user-1"
    };

---

# 51. Object з Array та Nested Data

Реальний API часто повертає складні структури.

    type Address = {
        city: string;
        country: string;
    };

    type User = {
        id: number;
        name: string;
        roles: string[];
        address: Address;
    };

    const user: User = {
        id: 1,
        name: "John",
        roles: ["user", "editor"],
        address: {
            city: "Vinnytsia",
            country: "Ukraine"
        }
    };

---

# 52. API Data Model

Типи об'єктів особливо важливі для API.

Наприклад:

    type Product = {
        id: number;
        title: string;
        price: number;
        category: string;
    };

Отримані дані можна очікувати у формі:

    const product: Product = {
        id: 1,
        title: "Laptop",
        price: 1200,
        category: "electronics"
    };

Пізніше це стане основою для типізації:

- REST API;
- JSON;
- fetch;
- Axios;
- React;
- Next.js;
- Node.js;
- NestJS;
- PostgreSQL models;
- DTO.

---

# 53. Типізація `fetch` data

Наприклад:

    type User = {
        id: number;
        name: string;
        email: string;
    };

    async function getUsers(): Promise<User[]> {
        const response = await fetch("/api/users");

        const data: User[] = await response.json();

        return data;
    }

Тут:

    Promise<User[]>

означає:

> функція повертає Promise, який після виконання міститиме масив `User`.

---

# 54. Object Type для конфігурації

Об'єкти часто використовуються як configuration objects.

    type Config = {
        apiUrl: string;
        timeout: number;
        debug: boolean;
    };

    const config: Config = {
        apiUrl: "/api",
        timeout: 5000,
        debug: true
    };

Це допомагає уникати помилок у конфігурації.

---

# 55. Object Type для Options

Типовий JavaScript-підхід:

    createUser({
        name: "John",
        age: 30,
        isAdmin: true
    });

TypeScript:

    type CreateUserOptions = {
        name: string;
        age: number;
        isAdmin?: boolean;
    };

    function createUser(options: CreateUserOptions) {
        // ...
    }

Виклик:

    createUser({
        name: "John",
        age: 30
    });

---

# 56. Object Type для DOM

TypeScript часто описує об'єкти, які представляють стан UI.

Наприклад:

    type FormState = {
        username: string;
        email: string;
        password: string;
        isSubmitting: boolean;
    };

    const formState: FormState = {
        username: "",
        email: "",
        password: "",
        isSubmitting: false
    };

Цей підхід широко використовується в React та інших UI-фреймворках.

---

# 57. `type` для об'єктів

Базовий синтаксис:

    type User = {
        id: number;
        name: string;
        age?: number;
        readonly createdAt: Date;
    };

Використання:

    const user: User = {
        id: 1,
        name: "John",
        createdAt: new Date()
    };

---

# 58. `interface`

Для об'єктних структур також існує `interface`.

    interface User {
        id: number;
        name: string;
        age?: number;
    }

Використання:

    const user: User = {
        id: 1,
        name: "John"
    };

Детально `interface` буде розглядатися у:

    04-interfaces-and-type-aliases

На цьому етапі достатньо знати, що `type` і `interface` можуть описувати структуру об'єкта.

---

# 59. Type vs Interface — базова ідея

Для простих object types:

    type User = {
        name: string;
        age: number;
    };

Для interface:

    interface User {
        name: string;
        age: number;
    }

Обидва підходи широко використовуються.

На початку навчання важливо не запам'ятовувати всі відмінності, а зрозуміти основний принцип:

> ми описуємо форму об'єкта.

Порівняння `type` та `interface` буде окремою темою.

---

# 60. Object Types та Generics

На наступних етапах можна буде робити універсальні object types.

Наприклад:

    type ApiResponse<T> = {
        data: T;
        success: boolean;
        message: string;
    };

Тоді:

    type User = {
        id: number;
        name: string;
    };

    type UserResponse = ApiResponse<User>;

Це вже наступний рівень TypeScript.

---

# 61. Типові помилки

## 61.1. Використання `object` замість конкретного типу

Погано:

    const user: object = {
        name: "John",
        age: 30
    };

Краще:

    type User = {
        name: string;
        age: number;
    };

    const user: User = {
        name: "John",
        age: 30
    };

---

## 61.2. Використання `any`

Погано:

    const user: any = {
        name: "John"
    };

Краще:

    type User = {
        name: string;
    };

---

## 61.3. Забута optional property

Якщо властивість може бути відсутня:

    type User = {
        name: string;
        age?: number;
    };

а не:

    type User = {
        name: string;
        age: number;
    };

---

## 61.4. Неправильний тип властивості

    type User = {
        name: string;
        age: number;
    };

    const user: User = {
        name: "John",
        age: "30"
    };

`age` повинен бути `number`.

---

## 61.5. Відсутня required property

    type User = {
        name: string;
        age: number;
    };

    const user: User = {
        name: "John"
    };

Відсутня `age`.

---

## 61.6. Зайві властивості

    type User = {
        name: string;
    };

    const user: User = {
        name: "John",
        age: 30
    };

Може спрацювати excess property check.

---

# 62. Практика №1 — User

Створи тип:

    type User = {
        id: number;
        name: string;
        email: string;
        age?: number;
    };

Створи три користувачі.

---

# 63. Практика №2 — Product

Створи:

    type Product = {
        id: number;
        title: string;
        price: number;
        available: boolean;
    };

Створи масив:

    const products: Product[] = [];

Додай мінімум 5 продуктів.

---

# 64. Практика №3 — Address

Створи:

    type Address = {
        city: string;
        country: string;
        postalCode: string;
    };

Потім:

    type User = {
        name: string;
        address: Address;
    };

Створи користувача з адресою.

---

# 65. Практика №4 — Nested Object

Створи:

    type Company = {
        name: string;
        address: {
            city: string;
            country: string;
        };
        employees: number;
    };

Створи 2 компанії.

---

# 66. Практика №5 — Optional Properties

Створи:

    type Profile = {
        username: string;
        bio?: string;
        avatar?: string;
        website?: string;
    };

Створи:

- повний профіль;
- профіль тільки з `username`;
- профіль з `username` та `bio`.

---

# 67. Практика №6 — Readonly

Створи:

    type Product = {
        readonly id: number;
        name: string;
        price: number;
    };

Перевір:

    product.name = "New product";

і:

    product.id = 100;

Подивись, яку операцію TypeScript забороняє.

---

# 68. Практика №7 — Methods

Створи:

    type Calculator = {
        add(a: number, b: number): number;
        subtract(a: number, b: number): number;
        multiply(a: number, b: number): number;
    };

Реалізуй об'єкт:

    const calculator: Calculator = {
        add(a, b) {
            return a + b;
        },

        subtract(a, b) {
            return a - b;
        },

        multiply(a, b) {
            return a * b;
        }
    };

---

# 69. Практика №8 — Dictionary

Створи словник:

    type Dictionary = {
        [key: string]: string;
    };

Додай:

    hello → привіт
    world → світ
    book → книга
    computer → комп'ютер

---

# 70. Практика №9 — API Model

Створи тип:

    type Post = {
        id: number;
        title: string;
        body: string;
        author: {
            id: number;
            name: string;
        };
        tags: string[];
    };

Створи 3 posts.

---

# 71. Практика №10 — Configuration

Створи:

    type AppConfig = {
        appName: string;
        version: string;
        apiUrl: string;
        debug: boolean;
        timeout?: number;
    };

Створи конфігурацію для свого навчального застосунку.

---

# 72. Міні-проєкт

Створи невелику модель інтернет-магазину.

Потрібні типи:

    type Category = {
        id: number;
        name: string;
    };

    type Product = {
        id: number;
        name: string;
        price: number;
        category: Category;
        tags: string[];
        available: boolean;
    };

Створи:

- 3 категорії;
- 10 продуктів;
- масив продуктів;
- функцію пошуку продукту;
- функцію фільтрації доступних продуктів;
- функцію пошуку продуктів за категорією.

---

# 73. Практична функція пошуку

    type Product = {
        id: number;
        name: string;
        price: number;
    };

    function findProduct(
        products: Product[],
        id: number
    ): Product | undefined {
        return products.find(product => product.id === id);
    }

Тут функція може повернути:

    Product

або:

    undefined

Тому тип результату:

    Product | undefined

---

# 74. Що важливо запам'ятати

### 1. Об'єкт можна типізувати напряму

    const user: {
        name: string;
        age: number;
    } = {
        name: "John",
        age: 30
    };

### 2. Для повторного використання використовуй `type`

    type User = {
        name: string;
        age: number;
    };

### 3. `?` робить властивість optional

    age?: number;

### 4. `readonly` забороняє змінювати властивість

    readonly id: number;

### 5. Вкладені об'єкти можна типізувати

    type User = {
        name: string;
        address: {
            city: string;
        };
    };

### 6. Масив об'єктів

    const users: User[] = [];

### 7. Методи також можна типізувати

    type Calculator = {
        add(a: number, b: number): number;
    };

### 8. Для динамічних ключів існує index signature

    type Dictionary = {
        [key: string]: string;
    };

### 9. `object` — занадто загальний тип для більшості задач

Краще описувати конкретну структуру.

### 10. TypeScript використовує structural typing

Важлива структура об'єкта, а не його назва.

---

# 75. Interview Questions

### Junior

1. Як типізувати об'єкт у TypeScript?
2. Що таке object type?
3. Що означає `?` після назви властивості?
4. Що таке `readonly`?
5. Як створити тип для масиву об'єктів?
6. Як типізувати nested object?
7. Як типізувати метод об'єкта?
8. Що таке index signature?
9. Чим `object` відрізняється від конкретного object type?
10. Для чого використовують `type`?

### Middle

11. Що таке structural typing?
12. Що таке excess property checks?
13. Чому змінну з додатковими властивостями можна іноді присвоїти іншому object type?
14. Що робить `typeof` у type position?
15. Що робить `keyof`?
16. Як типізувати dictionary object?
17. Як типізувати API response?
18. Чим `type` відрізняється від `interface`?
19. Як описати readonly nested object?
20. Як працюють optional properties?

### Senior

21. Як structural typing впливає на архітектуру TypeScript-застосунку?
22. Як моделювати складні API objects?
23. Коли використовувати `Record`, а коли index signature?
24. Як використовувати `keyof` разом з generics?
25. Як створювати reusable object types?
26. Як моделювати discriminated unions для об'єктів?
27. Як типізувати dynamic keys без використання `any`?
28. Як працюють mapped types поверх object types?
29. Як моделювати DTO для API?
30. Як типи об'єктів пов'язані з domain models?

---

# 76. Learning Path

## 🟢 Core

Потрібно знати:

    type User = {
        name: string;
        age: number;
    };

    const user: User = {
        name: "John",
        age: 30
    };

Вивчити:

- object types;
- required properties;
- optional properties;
- readonly;
- nested objects;
- arrays of objects;
- object methods.

---

## 🟡 Junior

Додатково:

- `type`;
- `interface`;
- index signatures;
- dictionary objects;
- `typeof`;
- `keyof`;
- structural typing;
- excess property checks;
- API data models;
- configuration objects.

---

## 🟠 Middle

Далі:

- generics;
- `Record`;
- mapped types;
- conditional types;
- reusable object models;
- advanced API types;
- DTO;
- discriminated unions;
- utility types.

---

## 🔴 Senior

На senior-рівні:

- складне моделювання domain objects;
- type-safe API contracts;
- advanced generics;
- mapped types;
- conditional types;
- type transformations;
- schema-driven types;
- runtime validation + static types;
- архітектура типів великих систем.

---

# 77. Mini Cheat Sheet

## Object

    type User = {
        name: string;
        age: number;
    };

## Optional

    type User = {
        name: string;
        age?: number;
    };

## Readonly

    type User = {
        readonly id: number;
    };

## Nested

    type User = {
        name: string;
        address: {
            city: string;
        };
    };

## Array of Objects

    const users: User[] = [];

## Method

    type Calculator = {
        add(a: number, b: number): number;
    };

## Function Property

    type User = {
        greet: () => string;
    };

## Index Signature

    type Dictionary = {
        [key: string]: string;
    };

## Object + Union

    type User = {
        id: number | string;
    };

## Literal Property

    type User = {
        role: "admin" | "user";
    };

## typeof

    const user = {
        name: "John",
        age: 30
    };

    type User = typeof user;

## keyof

    type User = {
        id: number;
        name: string;
    };

    type UserKey = keyof User;

Результат:

    "id" | "name"

## Function Parameter

    function printUser(user: User): void {
        console.log(user.name);
    }

## Function Return

    function createUser(): User {
        return {
            name: "John",
            age: 30
        };
    }

---

# 78. JavaScript → TypeScript

### JavaScript

    const user = {
        id: 1,
        name: "John",
        age: 30
    };

### TypeScript

    type User = {
        id: number;
        name: string;
        age: number;
    };

    const user: User = {
        id: 1,
        name: "John",
        age: 30
    };

---

# 79. Основна ментальна модель

Думай про object type так:

    JavaScript object
            ↓
       структура
            ↓
       TypeScript type
            ↓
      перевірка даних
            ↓
       type safety

Наприклад:

    {
        id: number;
        name: string;
        email: string;
    }

означає:

    id      → number
    name    → string
    email   → string

---

# 80. Зв'язок з наступними темами

Ця тема є фундаментом для:

    06-objects-and-types
            ↓
    07-enums
            ↓
    08-any-unknown-never
            ↓
    09-null-and-undefined
            ↓
    10-type-safety
            ↓
    02-functions-and-type-system
            ↓
    03-unions-intersections-and-narrowing
            ↓
    04-interfaces-and-type-aliases
            ↓
    05-generics
            ↓
    06-advanced-types
            ↓
    07-built-in-utility-types

А далі ці знання використовуються у:

    React
      ↓
    Next.js
      ↓
    Node.js
      ↓
    NestJS
      ↓
    REST API
      ↓
    PostgreSQL / MongoDB
      ↓
    Full Stack TypeScript

---

# 81. Головне

> **TypeScript object type описує форму об'єкта.**

Основний синтаксис:

    type User = {
        id: number;
        name: string;
        email?: string;
        readonly createdAt: Date;
    };

Запам'ятай 6 основних речей:

1. `type` — створення власного типу.
2. `?` — optional property.
3. `readonly` — властивість не можна змінити.
4. `User[]` — масив об'єктів `User`.
5. `{ ... }` — структура об'єкта.
6. TypeScript перевіряє відповідність об'єкта цій структурі.

І найважливіша концепція:

    JavaScript
        ↓
    object
        ↓
    TypeScript
        ↓
    object type
        ↓
    shape / structure
        ↓
    compile-time type safety

Саме вміння **описувати структуру даних** є одним із фундаментів TypeScript і стане основою для `interfaces`, `generics`, `utility types`, API-моделей, React props, DTO та моделей даних у full-stack застосунках.