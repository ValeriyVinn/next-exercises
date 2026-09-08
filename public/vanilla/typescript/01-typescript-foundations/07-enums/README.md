# Enums

> **Шлях:** `01-typescript-foundations/07-enums`  
> **Рівень:** Core → Junior  
> **Тема:** Enums у TypeScript

---

## 1. Вступ

`enum` — це спеціальна конструкція TypeScript для створення набору **іменованих констант**.

Наприклад, замість:

    const status = "pending";

можна створити:

    enum Status {
        Pending,
        Success,
        Error
    }

і використовувати:

    const status = Status.Pending;

Enum зручно використовувати, коли значення повинні належати до **обмеженого набору можливих варіантів**.

Типові приклади:

- статуси;
- ролі користувачів;
- рівні доступу;
- напрямки;
- категорії;
- режими роботи;
- типи повідомлень;
- HTTP-подібні статуси;
- дні тижня;
- налаштування застосунку.

---

# 2. Що потрібно знати

Після цієї теми потрібно розуміти:

- що таке `enum`;
- навіщо використовуються enums;
- numeric enums;
- string enums;
- enum members;
- auto-increment;
- explicit values;
- mixed enums;
- computed members;
- enum reverse mapping;
- `const enum`;
- enum у функціях;
- enum у об'єктах;
- enum у `switch`;
- enum та union types;
- enum та JavaScript;
- переваги та недоліки enum;
- коли використовувати enum;
- коли краще використовувати union type.

---

# 3. Базовий синтаксис

Найпростіший enum:

    enum Direction {
        Up,
        Down,
        Left,
        Right
    }

Використання:

    const direction = Direction.Up;

Enum має члени:

    Up
    Down
    Left
    Right

Кожен член отримує значення.

---

# 4. Numeric Enum

За замовчуванням TypeScript створює числовий enum.

    enum Direction {
        Up,
        Down,
        Left,
        Right
    }

Значення:

    Direction.Up    // 0
    Direction.Down  // 1
    Direction.Left  // 2
    Direction.Right // 3

Нумерація починається з `0`.

---

# 5. Auto-increment

TypeScript автоматично збільшує значення.

    enum Status {
        Pending,
        Processing,
        Success,
        Error
    }

Отримуємо:

    Status.Pending    // 0
    Status.Processing // 1
    Status.Success    // 2
    Status.Error      // 3

Тобто:

    0 → 1 → 2 → 3

---

# 6. Explicit Numeric Values

Можна задати значення вручну.

    enum Status {
        Pending = 1,
        Processing = 2,
        Success = 3,
        Error = 4
    }

Тепер:

    Status.Pending    // 1
    Status.Processing // 2
    Status.Success    // 3
    Status.Error      // 4

---

# 7. Початкове значення

Можна змінити стартове значення.

    enum Direction {
        Up = 1,
        Down,
        Left,
        Right
    }

Результат:

    Up    → 1
    Down  → 2
    Left  → 3
    Right → 4

TypeScript продовжує автоматичне збільшення.

---

# 8. Від'ємні значення

Enum може містити від'ємні числа.

    enum Temperature {
        Cold = -1,
        Normal = 0,
        Hot = 1
    }

---

# 9. String Enum

У реальних застосунках string enums часто зрозуміліші.

    enum Status {
        Pending = "pending",
        Processing = "processing",
        Success = "success",
        Error = "error"
    }

Тепер:

    Status.Pending
    // "pending"

    Status.Success
    // "success"

---

# 10. Чому String Enum часто кращий

Порівняй:

    enum Status {
        Pending,
        Success,
        Error
    }

Зі:

    enum Status {
        Pending = "pending",
        Success = "success",
        Error = "error"
    }

У першому випадку:

    Status.Success
    // 1

У другому:

    Status.Success
    // "success"

Для API та JSON другий варіант часто зрозуміліший.

---

# 11. Enum та API

Наприклад, API повертає:

    {
        "status": "success"
    }

Можна описати:

    enum Status {
        Pending = "pending",
        Success = "success",
        Error = "error"
    }

Тип:

    type Response = {
        status: Status;
    };

Об'єкт:

    const response: Response = {
        status: Status.Success
    };

---

# 12. Enum у TypeScript-коді

    enum Role {
        Admin = "admin",
        User = "user",
        Editor = "editor"
    }

    const role: Role = Role.Admin;

Тепер `role` може містити значення enum.

---

# 13. Enum як тип

Enum можна використовувати не тільки як значення, а й як тип.

    enum Role {
        Admin = "admin",
        User = "user",
        Guest = "guest"
    }

    let role: Role;

    role = Role.Admin;
    role = Role.User;
    role = Role.Guest;

---

# 14. Enum та функції

Enum можна використовувати для обмеження параметра функції.

    enum Role {
        Admin = "admin",
        User = "user",
        Guest = "guest"
    }

    function checkAccess(role: Role): boolean {
        return role === Role.Admin;
    }

Виклик:

    checkAccess(Role.Admin);

---

# 15. Enum у `switch`

Це один із практичних сценаріїв.

    enum Status {
        Pending = "pending",
        Success = "success",
        Error = "error"
    }

    function getMessage(status: Status): string {
        switch (status) {
            case Status.Pending:
                return "Очікування";

            case Status.Success:
                return "Успішно";

            case Status.Error:
                return "Помилка";
        }
    }

---

# 16. Enum для ролей

    enum Role {
        Admin = "admin",
        Moderator = "moderator",
        User = "user",
        Guest = "guest"
    }

Функція:

    function canDeletePost(role: Role): boolean {
        return role === Role.Admin ||
               role === Role.Moderator;
    }

---

# 17. Enum для напрямків

    enum Direction {
        Up = "up",
        Down = "down",
        Left = "left",
        Right = "right"
    }

Функція:

    function move(direction: Direction): void {
        console.log(`Move ${direction}`);
    }

Використання:

    move(Direction.Up);
    move(Direction.Left);

---

# 18. Enum для рівнів доступу

    enum AccessLevel {
        Read = "read",
        Write = "write",
        Admin = "admin"
    }

Об'єкт:

    type Permission = {
        user: string;
        level: AccessLevel;
    };

    const permission: Permission = {
        user: "John",
        level: AccessLevel.Write
    };

---

# 19. Enum для категорій

    enum Category {
        Electronics = "electronics",
        Books = "books",
        Clothing = "clothing",
        Food = "food"
    }

Продукт:

    type Product = {
        name: string;
        category: Category;
    };

    const product: Product = {
        name: "Laptop",
        category: Category.Electronics
    };

---

# 20. Enum для режимів

    enum Theme {
        Light = "light",
        Dark = "dark",
        System = "system"
    }

    let theme: Theme = Theme.Dark;

---

# 21. Enum для днів тижня

    enum Day {
        Monday = "monday",
        Tuesday = "tuesday",
        Wednesday = "wednesday",
        Thursday = "thursday",
        Friday = "friday",
        Saturday = "saturday",
        Sunday = "sunday"
    }

Функція:

    function isWeekend(day: Day): boolean {
        return day === Day.Saturday ||
               day === Day.Sunday;
    }

---

# 22. Enum для HTTP-подібних статусів

Можна створити:

    enum HttpStatus {
        OK = 200,
        BadRequest = 400,
        Unauthorized = 401,
        Forbidden = 403,
        NotFound = 404,
        InternalServerError = 500
    }

Використання:

    function handleStatus(status: HttpStatus): void {
        if (status === HttpStatus.OK) {
            console.log("Success");
        }
    }

---

# 23. Numeric Enum та HTTP

Numeric enum зручний, коли саме числове значення має значення.

    enum HttpStatus {
        OK = 200,
        Created = 201,
        NoContent = 204,
        BadRequest = 400,
        NotFound = 404
    }

Наприклад:

    const status = HttpStatus.NotFound;

Результат:

    404

---

# 24. Mixed Enum

TypeScript дозволяє змішувати string та numeric members.

    enum Example {
        A = 1,
        B = "B"
    }

Це працює, але такий підхід зазвичай не рекомендується без конкретної причини.

Краще використовувати один стиль:

    numeric

або:

    string

---

# 25. Computed Enum Members

Enum може містити обчислювані значення.

    enum FileSize {
        KB = 1024,
        MB = 1024 * KB,
        GB = 1024 * MB
    }

Тепер:

    FileSize.KB
    // 1024

    FileSize.MB
    // 1048576

---

# 26. Enum Member Names

Імена членів enum зазвичай пишуться у PascalCase.

Наприклад:

    enum UserRole {
        Admin,
        User,
        Guest
    }

або:

    enum HttpStatus {
        Ok,
        NotFound,
        InternalServerError
    }

Назви повинні бути зрозумілими.

---

# 27. Enum та Object

Enum:

    enum Role {
        Admin = "admin",
        User = "user"
    }

Object:

    const user = {
        name: "John",
        role: Role.Admin
    };

TypeScript знає, що:

    user.role

має значення типу:

    Role

---

# 28. Enum та Array

Можна створити масив значень enum.

    enum Role {
        Admin = "admin",
        User = "user",
        Guest = "guest"
    }

    const roles: Role[] = [
        Role.Admin,
        Role.User,
        Role.Guest
    ];

---

# 29. Enum та Object Array

    enum Role {
        Admin = "admin",
        User = "user"
    }

    type User = {
        id: number;
        name: string;
        role: Role;
    };

    const users: User[] = [
        {
            id: 1,
            name: "John",
            role: Role.Admin
        },
        {
            id: 2,
            name: "Mike",
            role: Role.User
        }
    ];

---

# 30. Enum та Optional Property

Enum може використовуватися з optional property.

    enum Role {
        Admin = "admin",
        User = "user"
    }

    type User = {
        name: string;
        role?: Role;
    };

Можна:

    const user: User = {
        name: "John"
    };

Або:

    const user: User = {
        name: "John",
        role: Role.Admin
    };

---

# 31. Enum та Union

Enum:

    enum Status {
        Pending = "pending",
        Success = "success",
        Error = "error"
    }

Union:

    type Status =
        | "pending"
        | "success"
        | "error";

Обидва підходи дозволяють обмежити значення.

---

# 32. Enum vs Union Type

Це одна з найважливіших тем.

### Enum

    enum Status {
        Pending = "pending",
        Success = "success",
        Error = "error"
    }

Використання:

    const status = Status.Success;

### Union

    type Status =
        | "pending"
        | "success"
        | "error";

Використання:

    const status: Status = "success";

---

# 33. Переваги Union Type

Union type простіший:

    type Role = "admin" | "user" | "guest";

Не потрібно:

    Role.Admin

Можна:

    const role: Role = "admin";

Це часто дуже зручно для:

- React props;
- API data;
- JSON;
- configuration;
- простих обмежених значень.

---

# 34. Переваги Enum

Enum створює іменований набір значень.

    enum Role {
        Admin = "admin",
        User = "user",
        Guest = "guest"
    }

Використання:

    Role.Admin
    Role.User
    Role.Guest

Це може покращити читабельність, коли enum використовується у великій кількості місць.

---

# 35. Enum як Runtime Value

Важлива особливість:

`enum` існує не тільки під час компіляції.

Наприклад:

    enum Role {
        Admin = "admin",
        User = "user"
    }

Після компіляції TypeScript створює JavaScript-конструкцію, яка існує під час виконання.

Тому можна:

    console.log(Role);

---

# 36. Union Type не існує у Runtime

Union:

    type Role =
        | "admin"
        | "user";

Після компіляції цей тип зникає.

Не можна:

    console.log(Role);

Тому що `Role` — це тільки TypeScript type.

Це одна з фундаментальних відмінностей.

---

# 37. Numeric Enum Runtime

Numeric enum має runtime representation.

    enum Direction {
        Up,
        Down,
        Left,
        Right
    }

Можна:

    console.log(Direction.Up);

Результат:

    0

---

# 38. Reverse Mapping

Numeric enums мають особливість — reverse mapping.

    enum Direction {
        Up,
        Down,
        Left
    }

Можна:

    Direction.Up

Результат:

    0

А також:

    Direction[0]

Результат:

    "Up"

Тобто:

    Direction.Up // 0
    Direction[0] // "Up"

Це характерна особливість numeric enums.

---

# 39. String Enum та Reverse Mapping

Для string enum reverse mapping не створюється.

    enum Direction {
        Up = "up",
        Down = "down"
    }

Є:

    Direction.Up
    // "up"

Але немає аналогічного:

    Direction["up"]

яке повертало б `"Up"`.

Тому string enum простіший з точки зору runtime representation.

---

# 40. `const enum`

TypeScript має:

    const enum

Наприклад:

    const enum Direction {
        Up,
        Down,
        Left,
        Right
    }

Використання:

    const direction = Direction.Up;

`const enum` може бути інлайновим під час компіляції.

Це може зменшити runtime overhead.

---

# 41. Обережно з `const enum`

`const enum` має специфічні обмеження та може створювати проблеми в деяких build-середовищах або бібліотеках.

Тому на початковому етапі достатньо знати:

    enum

і лише розуміти:

    const enum

як окремий механізм оптимізації компіляції.

---

# 42. Enum та `switch`

Enum дуже зручно використовувати у `switch`.

    enum TrafficLight {
        Red = "red",
        Yellow = "yellow",
        Green = "green"
    }

    function getAction(
        light: TrafficLight
    ): string {
        switch (light) {
            case TrafficLight.Red:
                return "Stop";

            case TrafficLight.Yellow:
                return "Wait";

            case TrafficLight.Green:
                return "Go";
        }
    }

---

# 43. Enum для стану застосунку

Наприклад:

    enum RequestStatus {
        Idle = "idle",
        Loading = "loading",
        Success = "success",
        Error = "error"
    }

Стан:

    type State = {
        status: RequestStatus;
    };

    const state: State = {
        status: RequestStatus.Loading
    };

Це дуже близько до реального frontend-коду.

---

# 44. Enum для UI

    enum Modal {
        None = "none",
        Login = "login",
        Register = "register",
        Settings = "settings"
    }

Стан:

    let activeModal: Modal = Modal.Login;

---

# 45. Enum для сортування

    enum SortOrder {
        Asc = "asc",
        Desc = "desc"
    }

Функція:

    function sortProducts(order: SortOrder) {
        // ...
    }

Виклик:

    sortProducts(SortOrder.Asc);

---

# 46. Enum для фільтра

    enum ProductFilter {
        All = "all",
        Available = "available",
        OutOfStock = "out-of-stock"
    }

Функція:

    function filterProducts(
        filter: ProductFilter
    ) {
        // ...
    }

---

# 47. Enum та React

Enum можна використовувати для props.

    enum ButtonVariant {
        Primary = "primary",
        Secondary = "secondary",
        Danger = "danger"
    }

Тип:

    type ButtonProps = {
        variant: ButtonVariant;
        children: string;
    };

Компонент:

    function Button({
        variant,
        children
    }: ButtonProps) {
        return (
            <button className={variant}>
                {children}
            </button>
        );
    }

Використання:

    <Button variant={ButtonVariant.Primary}>
        Save
    </Button>

На практиці в React також дуже часто використовують union literals:

    type ButtonVariant =
        | "primary"
        | "secondary"
        | "danger";

---

# 48. Enum та JSON

Enum може бути корисним для моделі API:

    enum UserRole {
        Admin = "admin",
        User = "user"
    }

Об'єкт:

    const user = {
        name: "John",
        role: UserRole.Admin
    };

При серіалізації:

    JSON.stringify(user);

отримаємо значення:

    {
        "name": "John",
        "role": "admin"
    }

---

# 49. Enum та PostgreSQL

Enums можуть моделювати обмежений набір значень.

Наприклад:

    enum UserStatus {
        Active = "active",
        Blocked = "blocked",
        Deleted = "deleted"
    }

У TypeScript:

    type User = {
        id: number;
        status: UserStatus;
    };

Цей підхід може відповідати database enum або CHECK constraint на рівні PostgreSQL.

Але важливо розрізняти:

    TypeScript enum
            ↓
    application-level type

і:

    PostgreSQL enum
            ↓
    database-level type

Це різні механізми.

---

# 50. Enum та Node.js

У backend-коді enum може описувати:

- ролі;
- статуси;
- permissions;
- типи ресурсів;
- типи помилок;
- статуси замовлень;
- статуси платежів.

Наприклад:

    enum OrderStatus {
        Pending = "pending",
        Paid = "paid",
        Shipped = "shipped",
        Delivered = "delivered",
        Cancelled = "cancelled"
    }

---

# 51. Enum для Order

    type Order = {
        id: number;
        status: OrderStatus;
    };

    const order: Order = {
        id: 100,
        status: OrderStatus.Paid
    };

---

# 52. Enum та типізація бізнес-логіки

    enum OrderStatus {
        Pending = "pending",
        Paid = "paid",
        Cancelled = "cancelled"
    }

    function canCancelOrder(
        status: OrderStatus
    ): boolean {
        return status === OrderStatus.Pending ||
               status === OrderStatus.Paid;
    }

Тут enum допомагає уникнути випадкових рядків:

    "pendng"

замість:

    "pending"

---

# 53. Типова помилка — неправильне значення

    enum Role {
        Admin = "admin",
        User = "user"
    }

    const role: Role = "manager";

Помилка, тому що:

    "manager"

не входить до enum.

---

# 54. Enum Member vs Enum Value

Важливо розуміти різницю.

    enum Role {
        Admin = "admin"
    }

Тут:

    Admin

— member name.

А:

    "admin"

— його value.

Використовуємо:

    Role.Admin

Отримуємо:

    "admin"

---

# 55. Не плутай enum з object

JavaScript object:

    const Role = {
        Admin: "admin",
        User: "user"
    };

Enum:

    enum Role {
        Admin = "admin",
        User = "user"
    }

Вони схожі за ідеєю, але enum має спеціальну підтримку TypeScript як тип.

---

# 56. Enum чи `as const` object?

Сучасний TypeScript також дозволяє:

    const Role = {
        Admin: "admin",
        User: "user",
        Guest: "guest"
    } as const;

А потім:

    type Role =
        typeof Role[keyof typeof Role];

Отримуємо:

    "admin" | "user" | "guest"

Це популярний сучасний підхід, особливо коли потрібні одночасно:

- runtime object;
- literal values;
- TypeScript type.

---

# 57. Enum vs `as const`

### Enum

    enum Role {
        Admin = "admin",
        User = "user"
    }

### `as const`

    const Role = {
        Admin: "admin",
        User: "user"
    } as const;

### Type

    type Role =
        typeof Role[keyof typeof Role];

У сучасних TypeScript-проєктах `as const` + union часто є альтернативою enum.

---

# 58. Коли використовувати enum

Enum доречний, коли:

- потрібен іменований набір констант;
- значення використовуються у багатьох місцях;
- потрібне runtime-представлення;
- numeric values мають значення;
- enum добре описує доменну модель;
- команда використовує enums як стандарт.

Наприклад:

    enum OrderStatus {
        Pending = "pending",
        Paid = "paid",
        Shipped = "shipped",
        Delivered = "delivered"
    }

---

# 59. Коли краще Union Type

Union часто кращий для простих наборів:

    type Status =
        | "pending"
        | "success"
        | "error";

Особливо для:

- React props;
- простих options;
- API values;
- configuration;
- CSS-like variants;
- невеликих обмежених значень.

---

# 60. Головна різниця

Запам'ятай:

    enum
       ↓
    type + runtime value

А:

    union type
       ↓
    тільки type

Наприклад:

    enum Status {
        Success = "success"
    }

існує під час runtime.

А:

    type Status = "success";

існує тільки на рівні TypeScript.

---

# 61. Типові помилки

## 61.1. Зловживання enum

Не потрібно створювати enum для кожного рядка.

Наприклад, замість:

    enum Name {
        John = "John"
    }

краще просто:

    const name = "John";

---

## 61.2. Numeric enum без причини

    enum Status {
        Pending,
        Success,
        Error
    }

Значення:

    0
    1
    2

можуть бути неочевидними.

Для API часто зрозуміліше:

    enum Status {
        Pending = "pending",
        Success = "success",
        Error = "error"
    }

---

## 61.3. Mixed enum без необхідності

Не варто без причини:

    enum Example {
        A = 1,
        B = "b"
    }

Краще мати однорідний набір.

---

## 61.4. Плутати member та value

    enum Role {
        Admin = "admin"
    }

Правильно:

    Role.Admin

а не:

    Role.admin

---

## 61.5. Забувати про runtime

`enum` відрізняється від `type`, тому що enum генерує runtime-код.

Це важливо при проєктуванні бібліотек і bundle size.

---

# 62. Практика №1 — Status

Створи:

    enum Status {
        Pending = "pending",
        Success = "success",
        Error = "error"
    };

Створи змінну:

    let status: Status;

Перевір усі допустимі значення.

---

# 63. Практика №2 — User Roles

Створи:

    enum Role {
        Admin = "admin",
        Moderator = "moderator",
        User = "user",
        Guest = "guest"
    };

Створи масив користувачів:

    type User = {
        id: number;
        name: string;
        role: Role;
    };

Додай 5 користувачів.

---

# 64. Практика №3 — Directions

Створи:

    enum Direction {
        Up = "up",
        Down = "down",
        Left = "left",
        Right = "right"
    };

Напиши функцію:

    function move(direction: Direction): void {
        // ...
    }

Перевір усі напрямки.

---

# 65. Практика №4 — HTTP Status

Створи numeric enum:

    enum HttpStatus {
        OK = 200,
        Created = 201,
        BadRequest = 400,
        Unauthorized = 401,
        NotFound = 404,
        InternalServerError = 500
    };

Напиши функцію:

    function isSuccess(status: HttpStatus): boolean {
        return status >= 200 && status < 300;
    }

---

# 66. Практика №5 — Order

Створи:

    enum OrderStatus {
        Pending = "pending",
        Paid = "paid",
        Shipped = "shipped",
        Delivered = "delivered",
        Cancelled = "cancelled"
    };

Тип:

    type Order = {
        id: number;
        status: OrderStatus;
    };

Створи 5 замовлень.

---

# 67. Практика №6 — Switch

Використай:

    enum OrderStatus {
        Pending = "pending",
        Paid = "paid",
        Shipped = "shipped",
        Delivered = "delivered",
        Cancelled = "cancelled"
    };

Напиши:

    function getOrderMessage(
        status: OrderStatus
    ): string {
        // switch
    }

Для кожного статусу поверни власне повідомлення.

---

# 68. Практика №7 — Theme

Створи:

    enum Theme {
        Light = "light",
        Dark = "dark",
        System = "system"
    };

Створи:

    type Settings = {
        theme: Theme;
    };

Перевір усі теми.

---

# 69. Практика №8 — Enum vs Union

Створи два варіанти.

Enum:

    enum Role {
        Admin = "admin",
        User = "user",
        Guest = "guest"
    }

Union:

    type RoleType =
        | "admin"
        | "user"
        | "guest";

Порівняй:

- читабельність;
- використання;
- runtime;
- JavaScript output;
- зручність у React.

---

# 70. Практика №9 — `as const`

Створи:

    const Role = {
        Admin: "admin",
        User: "user",
        Guest: "guest"
    } as const;

Створи тип:

    type Role =
        typeof Role[keyof typeof Role];

Перевір, які значення дозволені.

---

# 71. Практика №10 — Mini Project

Створи модель інтернет-магазину.

Enum:

    enum ProductCategory {
        Electronics = "electronics",
        Books = "books",
        Clothing = "clothing"
    }

    enum ProductStatus {
        Available = "available",
        OutOfStock = "out-of-stock",
        Discontinued = "discontinued"
    }

Тип:

    type Product = {
        id: number;
        name: string;
        category: ProductCategory;
        status: ProductStatus;
        price: number;
    };

Створи:

- 10 продуктів;
- фільтрацію за категорією;
- фільтрацію за статусом;
- пошук доступних продуктів;
- функцію форматування статусу;
- функцію перевірки доступності.

---

# 72. Міні-проєкт — Request State

Створи:

    enum RequestStatus {
        Idle = "idle",
        Loading = "loading",
        Success = "success",
        Error = "error"
    }

Тип:

    type RequestState = {
        status: RequestStatus;
        data: string | null;
        error: string | null;
    };

Створи чотири різні стани:

    Idle
    Loading
    Success
    Error

Ця модель стане в пригоді при вивченні React.

---

# 73. Міні-проєкт — User Permissions

Створи:

    enum Permission {
        Read = "read",
        Write = "write",
        Delete = "delete",
        Admin = "admin"
    };

Тип:

    type User = {
        id: number;
        name: string;
        permissions: Permission[];
    };

Напиши:

    function hasPermission(
        user: User,
        permission: Permission
    ): boolean {
        return user.permissions.includes(permission);
    }

---

# 74. Interview Questions

### Junior

1. Що таке `enum` у TypeScript?
2. Для чого використовуються enums?
3. Що таке numeric enum?
4. Що таке string enum?
5. Які значення отримують numeric enum за замовчуванням?
6. Як задати власні значення enum?
7. Чи можна використовувати enum як тип?
8. Як використовувати enum у `switch`?
9. Що таке enum member?
10. Чим string enum відрізняється від numeric enum?

### Middle

11. Чим enum відрізняється від union type?
12. Чи існує enum у runtime?
13. Чи існує union type у runtime?
14. Що таке reverse mapping?
15. Чому reverse mapping працює для numeric enum?
16. Чи працює reverse mapping для string enum?
17. Що таке `const enum`?
18. Що таке computed enum member?
19. Чому mixed enums небажані?
20. Коли краще використовувати string enum?

### Senior

21. Який JavaScript-код генерує TypeScript для enum?
22. Як enum впливає на bundle size?
23. Коли enum гірший за union type?
24. Коли використовувати `as const` object замість enum?
25. Які проблеми можуть виникати з `const enum`?
26. Як enum використовувати при моделюванні domain state?
27. Як синхронізувати TypeScript enum з API?
28. Як синхронізувати TypeScript enum з PostgreSQL?
29. Чи варто використовувати enum у public library API?
30. Як проектувати enum для великого full-stack застосунку?

---

# 75. Learning Path

## 🟢 Core

Потрібно знати:

- що таке enum;
- numeric enum;
- string enum;
- enum members;
- explicit values;
- auto-increment;
- enum як тип;
- enum у функціях;
- enum у `switch`.

Приклад:

    enum Status {
        Pending = "pending",
        Success = "success",
        Error = "error"
    }

---

## 🟡 Junior

Додатково:

- enum у object types;
- enum у arrays;
- enum у React props;
- enum для API;
- enum для state;
- enum для permissions;
- numeric enum;
- reverse mapping;
- `const enum`;
- enum vs union.

---

## 🟠 Middle

Далі:

- enum vs `as const`;
- literal types;
- discriminated unions;
- exhaustive checking;
- mapped types;
- `keyof typeof`;
- API data modeling;
- database enum modeling;
- DTO;
- domain models.

---

## 🔴 Senior

На senior-рівні:

- runtime implications;
- generated JavaScript;
- bundle size;
- library design;
- API contracts;
- database/application enum synchronization;
- domain-driven modeling;
- type-safe state machines;
- enum alternatives;
- architecture of shared types.

---

# 76. Mini Cheat Sheet

## Numeric Enum

    enum Direction {
        Up,
        Down,
        Left,
        Right
    }

Значення:

    Up    → 0
    Down  → 1
    Left  → 2
    Right → 3

---

## Explicit Numeric Enum

    enum Status {
        Pending = 1,
        Success = 2,
        Error = 3
    }

---

## String Enum

    enum Status {
        Pending = "pending",
        Success = "success",
        Error = "error"
    }

---

## Enum as Type

    let status: Status;

---

## Function Parameter

    function setStatus(status: Status) {
        // ...
    }

---

## Object

    type User = {
        name: string;
        role: Role;
    };

---

## Array

    const roles: Role[] = [
        Role.Admin,
        Role.User
    ];

---

## Switch

    switch (status) {
        case Status.Pending:
            break;

        case Status.Success:
            break;

        case Status.Error:
            break;
    }

---

## Union Alternative

    type Status =
        | "pending"
        | "success"
        | "error";

---

## `as const` Alternative

    const Status = {
        Pending: "pending",
        Success: "success",
        Error: "error"
    } as const;

    type Status =
        typeof Status[keyof typeof Status];

---

## Reverse Mapping

    enum Direction {
        Up,
        Down
    }

    Direction.Up
    // 0

    Direction[0]
    // "Up"

---

## Computed Values

    enum Size {
        KB = 1024,
        MB = 1024 * KB
    }

---

## const enum

    const enum Direction {
        Up,
        Down
    }

---

# 77. JavaScript → TypeScript

### JavaScript

    const status = "pending";

    if (status === "pending") {
        console.log("Loading...");
    }

### TypeScript з union

    type Status =
        | "pending"
        | "success"
        | "error";

    const status: Status = "pending";

### TypeScript з enum

    enum Status {
        Pending = "pending",
        Success = "success",
        Error = "error"
    }

    const status: Status = Status.Pending;

---

# 78. Ментальна модель

Думай про enum так:

    enum
      ↓
    named constants
      ↓
    обмежений набір значень
      ↓
    type safety
      ↓
    бізнес-логіка

Наприклад:

    enum OrderStatus {
        Pending = "pending",
        Paid = "paid",
        Shipped = "shipped",
        Delivered = "delivered"
    }

Це означає:

> Замовлення може перебувати тільки в одному з визначених станів.

---

# 79. Enum у Full Stack

У full-stack застосунку enum може проходити через декілька рівнів:

    PostgreSQL
         ↓
    Backend / NestJS
         ↓
    REST API
         ↓
    TypeScript types
         ↓
    React
         ↓
    Next.js UI

Наприклад:

    pending
    paid
    shipped
    delivered

Важливо підтримувати узгодженість цих значень між рівнями системи.

---

# 80. Що запам'ятати найперше

### 1. Enum створює набір іменованих значень

    enum Role {
        Admin = "admin",
        User = "user"
    }

### 2. Enum може бути numeric

    enum Direction {
        Up,
        Down
    }

### 3. Enum може бути string

    enum Direction {
        Up = "up",
        Down = "down"
    }

### 4. Enum можна використовувати як тип

    let role: Role;

### 5. Enum існує у runtime

На відміну від `type`.

### 6. Numeric enum має reverse mapping

    Direction[0]

### 7. String enum не має такого reverse mapping

### 8. Union type — головна альтернатива

    type Role = "admin" | "user";

### 9. `as const` — ще одна сучасна альтернатива

    const Role = {
        Admin: "admin",
        User: "user"
    } as const;

### 10. Не використовуй enum автоматично

Спочатку запитай:

> Мені справді потрібен runtime object, чи достатньо union type?

---

# 81. Головне

> **Enum — це іменований набір обмежених значень, який може існувати і як TypeScript type, і як runtime value.**

Основний варіант:

    enum Status {
        Pending = "pending",
        Success = "success",
        Error = "error"
    }

Використання:

    const status: Status = Status.Success;

Ментальна модель:

    enum
      ↓
    named values
      ↓
    finite set
      ↓
    type safety
      ↓
    business logic

Але завжди пам'ятай про альтернативи:

    enum
       ↕
    union type
       ↕
    as const object

Для сучасного TypeScript важливо вміти не просто створювати `enum`, а **розуміти, коли enum дійсно потрібен, а коли простіший union type або `as const` буде кращим рішенням**.

Це стане особливо важливим при переході до:

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
    React / Next.js / Node.js / NestJS