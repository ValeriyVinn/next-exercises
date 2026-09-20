# 14 — Applications

---

# Загальна мета

Цей розділ потрібен не стільки для створення складних застосунків, скільки
для формування постійної практики full-stack розробки.

Навіть проста задача повинна давати можливість регулярно писати:

- HTML
- CSS
- JavaScript
- DOM
- Events
- Fetch API
- HTTP requests
- Node.js
- HTTP server
- API
- JSON
- SQL
- PostgreSQL
- CRUD
- validation
- error handling
- database queries

Головний принцип:

> **Проста задача → повний технологічний цикл.**

Наприклад, навіть `Counter` можна перетворити на full-stack вправу:

    Browser
       ↓
    POST /api/counter/increment
       ↓
    Node.js
       ↓
    UPDATE counters SET value = value + 1
       ↓
    PostgreSQL
       ↓
    JSON
       ↓
    Browser
       ↓
    DOM update

---

# Принцип поступового ускладнення

Вправи розташовані не за тематикою бізнесу, а приблизно за
**складністю роботи з даними та backend/database**.

    01 Single Data
          ↓
    02 CRUD
          ↓
    03 Related Data
          ↓
    04 Many-to-Many
          ↓
    05 Business Logic
          ↓
    06 Users and Roles
          ↓
    07 Transactions
          ↓
    08 Search and Reporting
          ↓
    09 Complex Applications

Це не означає, що кожен наступний рівень повинен використовувати
більше таблиць.

Складність може зростати через:

- зв'язки між таблицями
- правила предметної області
- валідацію
- права доступу
- транзакції
- складні SQL-запити
- пошук
- фільтрацію
- сортування
- пагінацію
- агрегації
- одночасну роботу з кількома сутностями

---

# 01 — Single Data

## Ідея

Найпростіші full-stack застосунки.

Основна мета — навчитися бачити та повторювати повний цикл:

    UI
     ↓
    JavaScript
     ↓
    HTTP request
     ↓
    Node.js
     ↓
    PostgreSQL
     ↓
    HTTP response
     ↓
    JavaScript
     ↓
    UI

База даних максимально проста.

Зазвичай достатньо:

- однієї таблиці
- одного простого запиту
- одного API endpoint
- мінімальної бізнес-логіки

---

## Що практикуємо

- HTML
- CSS
- DOM
- Events
- Fetch API
- HTTP GET / POST
- JSON
- Node.js
- HTTP server
- PostgreSQL connection
- SELECT
- INSERT
- простий UPDATE
- простий DELETE
- basic error handling

---

## Типова структура

    frontend/
        index.html
        style.css
        app.js

    backend/
        server.js
        db.js

    database/
        schema.sql

---

## Приклади вправ

- Counter
- Color Switcher
- Random Number
- Simple Settings
- Greeting
- Add Two-Digit Numbers
- Simple Quiz
- Like Button
- Score
- Background Color
- Theme Switcher

---

## Приклад: Add Two-Digit Numbers

Frontend:

    27 + 43 = ?

Користувач вводить:

    70

JavaScript перевіряє:

    27 + 43 === 70

Результат:

    true

Frontend відправляє:

    {
      result: true
    }

Backend звертається до PostgreSQL:

    true → green
    false → red

Backend повертає:

    {
      color: "green"
    }

Frontend змінює background-color input.

---

## Мета рівня

Навчитися настільки добре працювати з базовим full-stack циклом,
щоб створення такого застосунку не вимагало довгих роздумів.

> **Не складність задачі важлива, а кількість повторень full-stack циклу.**

---

# 02 — CRUD

## Ідея

Наступний рівень — робота з повним CRUD:

    Create
    Read
    Update
    Delete

Тут frontend уже не просто отримує або передає одне значення,
а працює з колекцією даних.

---

## Що додається

- форми
- створення записів
- отримання списку
- редагування
- видалення
- валідація
- HTTP methods
- SQL CRUD
- primary keys
- timestamps
- обробка помилок

---

## HTTP

Типовий набір:

    GET     /api/items
    GET     /api/items/:id
    POST    /api/items
    PATCH   /api/items/:id
    DELETE  /api/items/:id

---

## PostgreSQL

Наприклад:

    CREATE TABLE notes (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );

---

## Приклади вправ

- Notes
- Todo List
- Contacts
- Books
- Shopping List
- Tasks
- Movies
- Recipes
- Simple Journal
- Bookmarks

---

## Типовий цикл

    Form
      ↓
    JavaScript
      ↓
    POST /api/items
      ↓
    Node.js
      ↓
    INSERT INTO ...
      ↓
    PostgreSQL
      ↓
    JSON
      ↓
    DOM update

Для редагування:

    Form
      ↓
    PATCH
      ↓
    UPDATE
      ↓
    PostgreSQL
      ↓
    JSON
      ↓
    UI

---

## Мета рівня

Вільно працювати з базовим CRUD без прив'язки до конкретного
framework.

> **CRUD повинен стати повсякденною механікою.**

---

# 03 — Related Data

## Ідея

Тепер дані починають бути пов'язаними.

Основна тема:

> **Одна сутність залежить від іншої сутності.**

Наприклад:

    categories
         ↑
         │
       products

або:

    users
      ↑
      │
     posts

---

## Основна структура

Типовий зв'язок:

    One-to-Many

Наприклад:

    category
       │
       ├── product
       ├── product
       └── product

Одна категорія має багато товарів.

---

## PostgreSQL

Наприклад:

    categories
    ├── id
    └── name

    products
    ├── id
    ├── name
    ├── price
    └── category_id

`category_id` є foreign key.

---

## Що вивчаємо

- Foreign Key
- Primary Key
- One-to-Many
- JOIN
- INNER JOIN
- LEFT JOIN
- relational data
- nested data
- dependent records
- cascading
- SQL queries з кількома таблицями

---

## Приклади вправ

- Blog
- Library
- Products + Categories
- Recipes + Ingredients
- Courses + Lessons
- Authors + Books
- Departments + Employees
- Posts + Comments

---

## Приклад

Отримати товари разом із категорією:

    SELECT
      products.id,
      products.name,
      products.price,
      categories.name AS category
    FROM products
    JOIN categories
      ON products.category_id = categories.id;

---

## Мета рівня

Навчитися мислити не окремими таблицями, а **зв'язаними даними**.

> **Database — це не просто набір таблиць. Це система взаємопов'язаних даних.**

---

# 04 — Many-to-Many

## Ідея

Одна сутність може бути пов'язана з багатьма іншими сутностями,
і навпаки.

Наприклад:

    students
       ↕
    courses

Один студент може мати багато курсів.

Один курс може мати багато студентів.

---

## Junction Table

Для такого зв'язку використовується проміжна таблиця:

    students
       ↓
    student_courses
       ↓
    courses

Наприклад:

    students
    ├── id
    └── name

    courses
    ├── id
    └── title

    student_courses
    ├── student_id
    └── course_id

---

## Що вивчаємо

- Many-to-Many
- junction table
- composite relationships
- multiple JOIN
- INSERT у junction table
- DELETE relationships
- unique constraints
- relational queries

---

## Приклади вправ

- Students + Courses
- Posts + Tags
- Movies + Genres
- Products + Tags
- Users + Groups
- Recipes + Ingredients
- Articles + Categories

---

## Приклад

Отримати курси конкретного студента:

    SELECT courses.*
    FROM courses
    JOIN student_courses
      ON courses.id = student_courses.course_id
    WHERE student_courses.student_id = 1;

---

## Мета рівня

Зрозуміти, як PostgreSQL представляє складні зв'язки між сутностями.

> **Many-to-Many — важливий перехід від простого CRUD до реальних моделей даних.**

---

# 05 — Business Logic

## Ідея

Тут складність починає переходити від структури БД до
**правил предметної області**.

Тобто:

> Не просто зберегти дані, а правильно обробити ситуацію.

---

## Приклади правил

Товар можна замовити,

    якщо він є на складі.

Замовлення не можна завершити,

    якщо немає необхідної кількості товару.

Знижка застосовується,

    якщо сума замовлення перевищує певне значення.

Користувач може виконати дію,

    якщо виконані певні умови.

---

## Що вивчаємо

- business rules
- validation
- calculations
- conditions
- state changes
- domain logic
- server-side validation
- client-side validation
- data consistency
- error responses

---

## Важливий принцип

Frontend може перевіряти дані для зручності користувача.

Але критичні правила повинні контролюватися backend.

Наприклад:

    Frontend:
    "Кнопка Order доступна"

це не є достатнім захистом.

Backend все одно повинен перевірити:

    Чи існує товар?
    Чи є він на складі?
    Чи достатня кількість?
    Чи може користувач виконати операцію?

---

## Приклади вправ

- Shopping Cart
- Inventory
- Orders
- Discounts
- Booking Rules
- Quiz with Scoring
- Task Workflow
- Grade Calculation
- Stock Management

---

## Приклад

    User
      ↓
    POST /api/orders
      ↓
    Backend
      ↓
    Check stock
      ↓
    Calculate total
      ↓
    Validate order
      ↓
    Save order
      ↓
    Response

---

## Мета рівня

Навчитися переносити правила реальної задачі в програмний код.

> **Backend не просто передає дані — він забезпечує правила системи.**

---

# 06 — Users and Roles

## Ідея

У застосунку з'являються користувачі та різні рівні доступу.

Наприклад:

    User
    Admin
    Teacher
    Student

Тепер система повинна знати:

> Хто виконує дію?

і:

> Що цьому користувачу дозволено?

---

## Основні поняття

- Users
- Authentication
- Authorization
- Roles
- Permissions
- Password hashing
- Sessions
- Tokens
- Protected routes
- Access control

---

## Приклад

    users
    ├── id
    ├── email
    ├── password_hash
    └── role

Можливі ролі:

    admin
    teacher
    student

---

## Приклад доступу

    GET /api/courses

Доступ:

    student  → YES
    teacher  → YES
    admin    → YES

Інший endpoint:

    DELETE /api/users/:id

    student  → NO
    teacher  → NO
    admin    → YES

---

## Що вивчаємо

- Registration
- Login
- Logout
- Password hashing
- Authentication
- Authorization
- Middleware
- Protected API
- Role checks
- Permission checks

---

## Приклади вправ

- Authentication
- User Profile
- Admin Panel
- Teacher / Student
- Simple LMS
- Private Notes
- Role-based Dashboard
- User Management

---

## Мета рівня

Навчитися будувати API, де доступ до даних залежить від користувача.

> **Authentication відповідає на питання "Хто ти?", authorization — "Що тобі дозволено?".**

---

# 07 — Transactions

## Ідея

Тепер одна операція може змінювати декілька записів або таблиць.

Проблема:

> Що станеться, якщо перша операція виконалась,
> а друга завершилася помилкою?

Для цього використовуються database transactions.

---

## Основний принцип

    BEGIN
       ↓
    operation 1
       ↓
    operation 2
       ↓
    operation 3
       ↓
    COMMIT

Якщо щось пішло не так:

    BEGIN
       ↓
    operation 1
       ↓
    operation 2 → ERROR
       ↓
    ROLLBACK

---

## PostgreSQL

Базова схема:

    BEGIN;

    UPDATE accounts
    SET balance = balance - 100
    WHERE id = 1;

    UPDATE accounts
    SET balance = balance + 100
    WHERE id = 2;

    COMMIT;

При помилці:

    ROLLBACK;

---

## Що вивчаємо

- Transactions
- BEGIN
- COMMIT
- ROLLBACK
- Atomicity
- Data consistency
- Locking
- Concurrent operations
- Transaction errors

---

## Приклади вправ

- Bank Transfer
- Order + Inventory
- Payment + Order
- Booking + Availability
- Wallet Transfer
- Stock Movement
- Seat Reservation

---

## Приклад

Створення замовлення може включати:

    1. створити order
    2. додати order items
    3. зменшити stock
    4. записати payment

Якщо крок №3 не виконався:

    ROLLBACK

Система не повинна залишитися в напівзміненому стані.

---

## Мета рівня

Зрозуміти, як забезпечувати цілісність даних,
коли одна дія складається з декількох database operations.

> **Операція повинна або виконатися повністю, або не виконатися взагалі.**

---

# 08 — Search and Reporting

## Ідея

Застосунок починає працювати з великими наборами даних.

Користувачу вже недостатньо:

    Show all records

Потрібні:

- search
- filtering
- sorting
- pagination
- statistics
- aggregation
- reports

---

## Що вивчаємо

### Search

    WHERE name ILIKE '%phone%'

### Filtering

    WHERE price >= 100
      AND price <= 500

### Sorting

    ORDER BY price DESC

### Pagination

    LIMIT 20
    OFFSET 40

### Aggregation

    COUNT()
    SUM()
    AVG()
    MIN()
    MAX()

### Grouping

    GROUP BY category_id

### Filtering groups

    HAVING COUNT(*) > 5

---

## Приклади вправ

- Product Search
- User Search
- Book Search
- Search + Filters
- Pagination
- Statistics Dashboard
- Sales Report
- Student Results
- Orders Report
- Admin Analytics

---

## Приклад

Запит:

    GET /api/products?search=phone&page=2

Backend:

    search
       ↓
    SQL WHERE
       ↓
    ORDER BY
       ↓
    LIMIT / OFFSET
       ↓
    PostgreSQL
       ↓
    JSON

---

## Приклад статистики

    SELECT
      category_id,
      COUNT(*) AS product_count,
      AVG(price) AS average_price
    FROM products
    GROUP BY category_id;

---

## Мета рівня

Навчитися не тільки зберігати дані,
а й отримувати з бази **корисну інформацію**.

> **Database стає інструментом пошуку, аналізу та формування звітів.**

---

# 09 — Complex Applications

## Ідея

Фінальний рівень — застосунки, які комбінують
усі попередні знання.

Тут можуть одночасно використовуватися:

- CRUD
- relationships
- Many-to-Many
- business logic
- users
- roles
- permissions
- transactions
- search
- filtering
- pagination
- reporting
- complex SQL
- validation

---

## Типова архітектура

    Frontend
        ↓
    HTTP / REST API
        ↓
    Backend
        ↓
    Business Logic
        ↓
    PostgreSQL
        ↓
    Transactions / Queries
        ↓
    JSON
        ↓
    Frontend

---

## Приклади великих застосунків

### CMS

    Users
    Roles
    Posts
    Categories
    Tags
    Media
    Comments

### CRM

    Users
    Customers
    Contacts
    Tasks
    Notes
    Deals
    Activities

### E-commerce

    Users
    Products
    Categories
    Tags
    Cart
    Orders
    Payments
    Inventory

### Booking

    Users
    Services
    Employees
    Availability
    Bookings
    Payments

### Marketplace

    Users
    Sellers
    Products
    Categories
    Orders
    Reviews
    Payments

### SaaS

    Users
    Organizations
    Memberships
    Roles
    Subscriptions
    Projects
    Billing

### Healthcare

    Users
    Patients
    Doctors
    Appointments
    Records
    Services

### Project Management

    Users
    Teams
    Projects
    Tasks
    Comments
    Labels
    Activity

### Analytics / Admin

    Users
    Events
    Products
    Orders
    Statistics
    Reports

---

# Як використовувати 01–09

Не потрібно одразу створювати великі застосунки.

Рухатися потрібно поступово:

    01
    ↓
    простий API + PostgreSQL

    02
    ↓
    повний CRUD

    03
    ↓
    зв'язки таблиць

    04
    ↓
    Many-to-Many

    05
    ↓
    правила предметної області

    06
    ↓
    users + authentication + roles

    07
    ↓
    transactions

    08
    ↓
    search + filtering + reporting

    09
    ↓
    комплексний застосунок

---

# Головний принцип вправ

Кожна вправа повинна відповідати приблизно такому питанню:

> **Що я сьогодні хочу потренувати і як підключити це до full-stack циклу?**

Наприклад, я вивчаю CSS Grid.

Не обов'язково створювати окрему "CSS-only" вправу.

Можна зробити:

    PostgreSQL
        ↓
    Node.js API
        ↓
    JSON data
        ↓
    Vanilla JS
        ↓
    CSS Grid

І основною метою вправи буде саме CSS Grid.

Але паралельно я ще раз написав:

    SQL
    Node.js
    HTTP
    fetch()
    DOM
    CSS

Таким чином різні теми курсу постійно перетинаються.

---

# Full-Stack Practice Loop

Для кожної вправи бажано проходити один і той самий цикл:

    1. придумати просту задачу
           ↓
    2. визначити дані
           ↓
    3. створити PostgreSQL table
           ↓
    4. написати SQL
           ↓
    5. створити Node.js server
           ↓
    6. створити API endpoint
           ↓
    7. підключити fetch()
           ↓
    8. отримати JSON
           ↓
    9. оновити DOM
           ↓
    10. оформити CSS
           ↓
    11. протестувати
           ↓
    12. виправити помилки

---

# Робота з AI

AI не повинен автоматично писати весь застосунок.

Бажаний порядок допомоги:

    1. Спробувати самому
           ↓
    2. Отримати Hint
           ↓
    3. Написати Pseudocode
           ↓
    4. Отримати Partial Code
           ↓
    5. Самостійно завершити
           ↓
    6. Отримати Full Solution
           ↓
    7. Розібрати рішення
           ↓
    8. Переписати самому

Мета:

> **Не просто отримати працюючий код, а навчитися знаходити та виправляти власні проблеми.**

---

# Основний стек

## Frontend

    HTML
    CSS
    Vanilla JavaScript

## Backend

    Node.js
    HTTP
    REST API
    JSON

## Database

    PostgreSQL
    SQL

## Пізніше

    React
    Next.js
    TypeScript
    Express
    NestJS
    Docker

---

# Vanilla → React → Next.js

Після реалізації вправи на Vanilla JavaScript
її можна повторити на React.

Наприклад:

    Vanilla JS
    └── Add Two-Digit Numbers

    React
    └── Add Two-Digit Numbers

Потім:

    Next.js
    └── Add Two-Digit Numbers

Це дозволяє порівнювати:

    DOM manipulation
          vs
    React state

    addEventListener
          vs
    React event handlers

    fetch + DOM update
          vs
    fetch + state update

    HTML files
          vs
    React components

---

# Кінцева мета

Після проходження розділу я повинен уміти дивитися на задачу
не тільки як на frontend або JavaScript exercise.

Я повинен бачити:

    DATA
      ↓
    DATABASE
      ↓
    API
      ↓
    BACKEND
      ↓
    FRONTEND
      ↓
    UI

І вміти самостійно визначити:

- які потрібні дані;
- як їх зберігати;
- які таблиці потрібні;
- які зв'язки потрібні;
- який API потрібен;
- які HTTP methods використати;
- де повинна виконуватися логіка;
- який SQL потрібен;
- як отримати дані на frontend;
- як відобразити результат;
- як обробити помилки.

---

# Головна ідея розділу

> **Не чекати великого проєкту, щоб попрактикувати full-stack.**

Краще:

    100 маленьких full-stack вправ

ніж:

    1 великий проєкт
    після якого надовго забуваються
    Node.js, SQL, HTTP, fetch, DOM і CSS.

Тому навіть:

    Counter
    Color Switcher
    Calculator
    CSS Grid Exercise
    Form
    Todo

можуть бути маленькими full-stack лабораторними роботами.

Головне — постійно повторювати повний цикл:

    Frontend
        ↓
    HTTP
        ↓
    Backend
        ↓
    PostgreSQL
        ↓
    Backend
        ↓
    HTTP
        ↓
    Frontend

> **Маленька задача + повний стек + багато повторень = практичний full-stack навик.**