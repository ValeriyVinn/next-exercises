# 07. HTTP Basics

HTTP (HyperText Transfer Protocol) — основний протокол, який використовується для обміну даними між клієнтом і сервером у web.

Для JavaScript-розробника HTTP особливо важливий, тому що frontend постійно взаємодіє з backend через HTTP requests.

Типовий full-stack flow:

    Browser
        ↓
    HTTP Request
        ↓
    Server
        ↓
    Database
        ↓
    Server
        ↓
    HTTP Response
        ↓
    Browser

HTTP використовується для:

    отримання даних
    створення даних
    оновлення даних
    видалення даних
    authentication
    authorization
    передачі JSON
    роботи з REST API
    взаємодії frontend ↔ backend

У JavaScript HTTP-запити найчастіше виконуються через:

    fetch()
    Axios
    інші HTTP clients

У цьому курсі основна увага — на стандартному:

    fetch()

---

### Ключові поняття

✔ HTTP  
✔ HTTPS  
✔ client  
✔ server  
✔ request  
✔ response  
✔ request-response model  
✔ URL  
✔ URI  
✔ endpoint  
✔ HTTP method  
✔ GET  
✔ POST  
✔ PUT  
✔ PATCH  
✔ DELETE  
✔ HTTP headers  
✔ request headers  
✔ response headers  
✔ body  
✔ request body  
✔ response body  
✔ status code  
✔ 2xx  
✔ 3xx  
✔ 4xx  
✔ 5xx  
✔ JSON  
✔ Content-Type  
✔ Accept  
✔ Authorization  
✔ REST API  
✔ API endpoint  
✔ query parameters  
✔ path parameters  
✔ HTTP request lifecycle  
✔ stateless protocol  
✔ idempotency  
✔ safe methods  
✔ CORS  
✔ HTTP caching  

---

### Що потрібно пам'ятати

• HTTP — протокол обміну даними між client та server.

• Browser зазвичай виступає як client.

• Backend server приймає request та формує response.

• HTTP використовує модель:

    request → response

• HTTP request містить:

    method
    URL
    headers
    body (optional)

• HTTP response містить:

    status code
    headers
    body (optional)

• Основні HTTP methods:

    GET
    POST
    PUT
    PATCH
    DELETE

• `GET` зазвичай використовується для отримання даних.

• `POST` зазвичай використовується для створення ресурсу або виконання операції.

• `PUT` зазвичай використовується для повної заміни ресурсу.

• `PATCH` використовується для часткового оновлення ресурсу.

• `DELETE` використовується для видалення ресурсу.

• `2xx` — успішні responses.

• `3xx` — redirects / інші response-коди перенаправлення.

• `4xx` — помилки на стороні client/request.

• `5xx` — помилки на стороні server.

• `200 OK` означає успішний request.

• `201 Created` означає, що ресурс було створено.

• `204 No Content` означає успішний request без response body.

• `400 Bad Request` означає неправильний request.

• `401 Unauthorized` зазвичай означає, що authentication відсутня або недійсна.

• `403 Forbidden` означає, що server зрозумів request, але відмовляє в доступі.

• `404 Not Found` означає, що ресурс не знайдено.

• `500 Internal Server Error` означає server-side error.

• JSON — найпоширеніший формат передачі даних між frontend та backend.

• HTTP є stateless protocol: кожен request сам по собі не повинен покладатися на збережений server-side стан попереднього request.

• `fetch()` повертає Promise.

• `fetch()` не вважає HTTP `404` або `500` автоматично JavaScript exception. Response все одно може бути отриманий, тому потрібно перевіряти `response.ok` або `response.status`.

---

# HTTP

HTTP розшифровується як:

    HyperText Transfer Protocol

Це протокол, за допомогою якого client і server обмінюються повідомленнями.

Наприклад:

    Browser
        ↓
    HTTP Request
        ↓
    Server
        ↓
    HTTP Response
        ↓
    Browser

---

# HTTPS

HTTPS — HTTP поверх захищеного TLS-з'єднання.

    HTTP
        +
    TLS
        ↓
    HTTPS

У web-застосунках зазвичай потрібно використовувати:

    https://

замість:

    http://

Особливо для:

    authentication
    passwords
    tokens
    personal data
    payment data

---

# Client

Client — сторона, яка надсилає request.

Наприклад:

    Browser
    Mobile App
    Desktop App
    CLI tool

У типовому frontend application:

    Browser = client

---

# Server

Server — система, яка приймає request та формує response.

Наприклад:

    Node.js
    Nest.js
    Express
    Django
    Laravel
    ASP.NET

Для твого full-stack JavaScript stack:

    Browser
        ↓
    Next.js / React
        ↓
    HTTP
        ↓
    Nest.js / Node.js
        ↓
    PostgreSQL

---

# Request

HTTP request — повідомлення від client до server.

Спрощено:

    REQUEST

    method
    URL
    headers
    body

Наприклад:

    GET /api/users

---

# Response

HTTP response — повідомлення від server до client.

Спрощено:

    RESPONSE

    status
    headers
    body

Наприклад:

    200 OK

    {
        "id": 1,
        "name": "John"
    }

---

# Request-Response Model

Основна модель HTTP:

    Client
        ↓
    Request
        ↓
    Server
        ↓
    Response
        ↓
    Client

Наприклад:

    Browser
        ↓
    GET /api/users
        ↓
    Backend
        ↓
    200 OK + JSON
        ↓
    Browser

---

# URL

URL (Uniform Resource Locator) визначає адресу ресурсу.

Наприклад:

    https://example.com/api/users

URL складається з частин.

    https://example.com/api/users
    └──┬──┘ └──────┬─────┘ └───┬───┘
     scheme       host       path

---

# URL Structure

Наприклад:

    https://api.example.com/users/42?active=true

Маємо:

    https
        → scheme / protocol

    api.example.com
        → host

    /users/42
        → path

    ?active=true
        → query string

---

# Scheme

Scheme визначає протокол.

Наприклад:

    http://
    https://

У сучасному web найчастіше:

    https://

---

# Host

Host визначає сервер / домен.

Наприклад:

    example.com

або:

    api.example.com

У локальній розробці:

    localhost

---

# Port

Server може слухати певний port.

Наприклад:

    http://localhost:3000

Тут:

    localhost
        → host

    3000
        → port

Типові ports:

    HTTP  → 80
    HTTPS → 443

Для development часто:

    Next.js → 3000
    Nest.js → 3000
    PostgreSQL → 5432

---

# Path

Path визначає конкретний ресурс або route.

Наприклад:

    /api/users

або:

    /api/users/42

---

# Endpoint

Endpoint — конкретна API address, через яку можна взаємодіяти з ресурсом.

Наприклад:

    GET /api/users

    GET /api/users/42

    POST /api/users

    PATCH /api/users/42

    DELETE /api/users/42

Один resource може мати кілька endpoints залежно від method.

---

# HTTP Methods

Основні methods:

    GET
    POST
    PUT
    PATCH
    DELETE

---

# GET

`GET` використовується для отримання даних.

Наприклад:

    GET /api/users

Може повернути:

    [
        {
            "id": 1,
            "name": "John"
        },
        {
            "id": 2,
            "name": "Anna"
        }
    ]

---

# GET Single Resource

Щоб отримати одного user:

    GET /api/users/42

Response:

    {
        "id": 42,
        "name": "John"
    }

---

# GET та Body

GET requests зазвичай не використовують request body для передачі параметрів.

Замість цього використовуються:

    path parameters
    query parameters

Наприклад:

    GET /api/users/42

або:

    GET /api/users?role=admin

---

# POST

`POST` зазвичай використовується для створення нового ресурсу.

Наприклад:

    POST /api/users

Request body:

    {
        "name": "John",
        "email": "john@example.com"
    }

Server може відповісти:

    201 Created

    {
        "id": 42,
        "name": "John",
        "email": "john@example.com"
    }

---

# PUT

`PUT` зазвичай використовується для повної заміни ресурсу.

Наприклад:

    PUT /api/users/42

Body:

    {
        "name": "John",
        "email": "new@example.com"
    }

Ідея:

    existing resource
        ↓
    replace with new representation

---

# PATCH

`PATCH` використовується для часткового оновлення ресурсу.

Наприклад:

    PATCH /api/users/42

Body:

    {
        "email": "new@example.com"
    }

Змінюється тільки:

    email

Інші поля можуть залишитися без змін.

---

# PUT vs PATCH

    PUT
        → full replacement

    PATCH
        → partial update

Наприклад:

    PUT /users/1

може передати весь ресурс:

    {
        "name": "John",
        "email": "john@example.com",
        "age": 30
    }

А:

    PATCH /users/1

може передати лише:

    {
        "age": 31
    }

---

# DELETE

`DELETE` використовується для видалення ресурсу.

Наприклад:

    DELETE /api/users/42

Server може відповісти:

    204 No Content

---

# HTTP Methods Cheat Sheet

    GET
        → read

    POST
        → create

    PUT
        → replace

    PATCH
        → partial update

    DELETE
        → delete

У REST-style API часто використовують таку модель:

    GET    /users
        → list users

    GET    /users/42
        → get user

    POST   /users
        → create user

    PUT    /users/42
        → replace user

    PATCH  /users/42
        → update user

    DELETE /users/42
        → delete user

---

# Request Headers

Headers передають додаткову інформацію про request.

Наприклад:

    Content-Type
    Accept
    Authorization

Приклад:

    Content-Type: application/json

---

# Response Headers

Server також повертає headers.

Наприклад:

    Content-Type: application/json

Інші можливі headers:

    Cache-Control
    Set-Cookie
    Location
    ETag

---

# Content-Type

`Content-Type` повідомляє, який формат має body.

Для JSON:

    Content-Type: application/json

Наприклад:

    POST /api/users

    Content-Type: application/json

    {
        "name": "John"
    }

---

# Accept

`Accept` повідомляє server, які формати response client готовий приймати.

Наприклад:

    Accept: application/json

Це означає:

    client expects JSON response

---

# Authorization

`Authorization` використовується для передачі authentication credentials / token.

Наприклад:

    Authorization: Bearer <token>

Не потрібно плутати:

    authentication
        → хто ти?

    authorization
        → що тобі дозволено?

---

# Request Body

Body містить дані, які client передає server.

Наприклад:

    POST /api/users

    Content-Type: application/json

    {
        "name": "John",
        "email": "john@example.com"
    }

Body найчастіше використовується з:

    POST
    PUT
    PATCH

---

# Response Body

Response body містить дані, які server повертає client.

Наприклад:

    {
        "id": 42,
        "name": "John"
    }

Або масив:

    [
        {
            "id": 1,
            "name": "John"
        },
        {
            "id": 2,
            "name": "Anna"
        }
    ]

---

# JSON

JSON (JavaScript Object Notation) — популярний формат передачі структурованих даних.

Наприклад:

    {
        "id": 1,
        "name": "John",
        "age": 30
    }

JSON використовується дуже часто у REST APIs.

---

# JSON.stringify()

Перед відправленням JavaScript object у JSON body часто використовується:

    JSON.stringify()

Наприклад:

    const user = {
        name: "John",
        age: 30
    };

    const body = JSON.stringify(user);

Результат:

    '{"name":"John","age":30}'

---

# JSON.parse()

Щоб перетворити JSON string у JavaScript value:

    JSON.parse()

Наприклад:

    const json = '{"name":"John","age":30}';

    const user = JSON.parse(json);

---

# fetch()

`fetch()` — стандартний JavaScript API для виконання HTTP requests.

Простий GET:

    fetch("/api/users");

`fetch()` повертає:

    Promise<Response>

---

# Basic fetch

    fetch("/api/users")
        .then((response) => {
            return response.json();
        })
        .then((users) => {
            console.log(users);
        });

---

# fetch з async / await

Сучасний стиль:

    async function getUsers() {
        const response = await fetch("/api/users");
        const users = await response.json();

        console.log(users);
    }

---

# fetch GET

    const response = await fetch("/api/users");

    const users = await response.json();

---

# fetch POST

    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "John",
            email: "john@example.com"
        })
    });

    const user = await response.json();

---

# fetch PUT

    const response = await fetch("/api/users/42", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "John",
            email: "john@example.com",
            age: 30
        })
    });

---

# fetch PATCH

    const response = await fetch("/api/users/42", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            age: 31
        })
    });

---

# fetch DELETE

    const response = await fetch("/api/users/42", {
        method: "DELETE"
    });

---

# Response Object

`fetch()` повертає `Response`.

Наприклад:

    const response = await fetch("/api/users");

Можна перевірити:

    response.status
    response.ok
    response.headers
    response.url

---

# response.status

`status` містить HTTP status code.

Наприклад:

    response.status

може бути:

    200
    201
    400
    401
    404
    500

---

# response.ok

`response.ok` дорівнює `true`, якщо status є успішним HTTP response.

Наприклад:

    const response = await fetch("/api/users");

    if (response.ok) {
        console.log("Success");
    }

---

# Important fetch Behavior

Це дуже важливо:

`fetch()` не відхиляє Promise просто через HTTP status:

    404
    500

Наприклад:

    const response = await fetch("/api/users");

Навіть якщо server повернув:

    404 Not Found

Promise `fetch()` зазвичай буде fulfilled з `Response`.

Тому потрібно перевіряти:

    response.ok

або:

    response.status

---

# Proper fetch Error Check

    const response = await fetch("/api/users");

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const users = await response.json();

---

# HTTP Status Code Classes

HTTP status codes поділяються на класи:

    1xx
        → informational

    2xx
        → success

    3xx
        → redirection

    4xx
        → client errors

    5xx
        → server errors

---

# 1xx

`1xx` — informational responses.

Наприклад:

    100 Continue

На frontend application-level практиці використовуються рідко.

---

# 2xx Success

`2xx` означають успішне виконання request.

Найважливіші:

    200 OK
    201 Created
    202 Accepted
    204 No Content

---

# 200 OK

Request успішно виконано.

Наприклад:

    GET /api/users

Response:

    200 OK

---

# 201 Created

Resource успішно створено.

Наприклад:

    POST /api/users

Response:

    201 Created

---

# 202 Accepted

Request прийнято для обробки, але обробка ще не обов'язково завершена.

Може використовуватися для:

    background jobs
    asynchronous processing

---

# 204 No Content

Request успішний, але response body відсутній.

Часто використовується після:

    DELETE

Наприклад:

    DELETE /api/users/42

Response:

    204 No Content

---

# 3xx Redirection

`3xx` пов'язані з перенаправленням або іншими умовами, де client може виконати додаткову дію.

Приклади:

    301 Moved Permanently
    302 Found
    304 Not Modified

---

# 301 Moved Permanently

Ресурс переміщений на іншу URL permanently.

---

# 304 Not Modified

Ресурс не змінився відносно cache validators.

Browser може використати cached representation.

---

# 4xx Client Errors

`4xx` означають проблему з request або доступом client.

Найважливіші:

    400 Bad Request
    401 Unauthorized
    403 Forbidden
    404 Not Found
    405 Method Not Allowed
    409 Conflict
    422 Unprocessable Content
    429 Too Many Requests

---

# 400 Bad Request

Request некоректний.

Наприклад:

    invalid JSON
    invalid parameters
    invalid request structure

---

# 401 Unauthorized

Request потребує authentication або надані authentication credentials недійсні.

Наприклад:

    GET /api/profile

без необхідного authentication.

---

# 403 Forbidden

Server зрозумів request, але відмовляє в доступі.

Наприклад:

    authenticated user
        ↓
    protected admin endpoint
        ↓
    user is not allowed
        ↓
    403 Forbidden

---

# 401 vs 403

Запам'ятати:

    401
        → authentication problem

    403
        → access is forbidden

Спрощено:

    401 → "ти не автентифікований"

    403 → "ти автентифікований,
          але тобі не дозволено"

---

# 404 Not Found

Server не знайшов ресурс за вказаним URL.

Наприклад:

    GET /api/users/999999

може повернути:

    404 Not Found

---

# 405 Method Not Allowed

Endpoint існує, але HTTP method для нього не дозволений.

Наприклад:

    POST /api/users/42

якщо endpoint підтримує тільки:

    GET
    PATCH
    DELETE

---

# 409 Conflict

Request конфліктує з поточним станом ресурсу.

Наприклад:

    створення user
        ↓
    email already exists
        ↓
    409 Conflict

---

# 422 Unprocessable Content

Server зрозумів структуру request, але дані не проходять semantic validation.

Наприклад:

    age: -500

або:

    email: "not-email"

Точне використання залежить від API design.

---

# 429 Too Many Requests

Client перевищив дозволену кількість requests.

Наприклад:

    too many requests
        ↓
    rate limit
        ↓
    429

---

# 5xx Server Errors

`5xx` означають проблему на server side.

Найважливіші:

    500 Internal Server Error
    501 Not Implemented
    502 Bad Gateway
    503 Service Unavailable
    504 Gateway Timeout

---

# 500 Internal Server Error

Загальна server-side error.

Наприклад:

    backend exception
        ↓
    500 Internal Server Error

---

# 502 Bad Gateway

Gateway / proxy отримав некоректну response від upstream server.

Часто зустрічається в архітектурах із:

    reverse proxy
    load balancer
    API gateway

---

# 503 Service Unavailable

Server тимчасово не може обробити request.

Можливі причини:

    overload
    maintenance
    unavailable service

---

# 504 Gateway Timeout

Gateway / proxy не дочекався response від upstream server у встановлений час.

---

# Status Code Cheat Sheet

    200 → OK
    201 → Created
    202 → Accepted
    204 → No Content

    301 → Moved Permanently
    302 → Found
    304 → Not Modified

    400 → Bad Request
    401 → Unauthorized
    403 → Forbidden
    404 → Not Found
    405 → Method Not Allowed
    409 → Conflict
    422 → Unprocessable Content
    429 → Too Many Requests

    500 → Internal Server Error
    502 → Bad Gateway
    503 → Service Unavailable
    504 → Gateway Timeout

---

# Path Parameters

Path parameter є частиною URL path.

Наприклад:

    /api/users/42

Тут:

    42

можна трактувати як:

    userId

Endpoint:

    GET /api/users/:id

Concrete request:

    GET /api/users/42

---

# Query Parameters

Query parameters знаходяться після `?`.

Наприклад:

    /api/users?role=admin

Тут:

    role=admin

є query parameter.

---

# Multiple Query Parameters

Наприклад:

    /api/users?role=admin&active=true&page=2

Маємо:

    role=admin
    active=true
    page=2

---

# Query Parameters для Filtering

Наприклад:

    GET /api/products?category=books

---

# Query Parameters для Pagination

Наприклад:

    GET /api/users?page=2&limit=20

---

# Query Parameters для Sorting

Наприклад:

    GET /api/users?sort=name&order=asc

---

# URLSearchParams

JavaScript має `URLSearchParams`.

Наприклад:

    const params = new URLSearchParams({
        page: "2",
        limit: "20",
        sort: "name"
    });

    const url = `/api/users?${params}`;

Результат:

    /api/users?page=2&limit=20&sort=name

---

# REST API

REST — архітектурний стиль побудови web APIs.

У REST-style API ресурси представляються через URLs.

Наприклад:

    /users
    /users/42
    /posts
    /posts/10

HTTP method визначає operation.

Наприклад:

    GET /users
        → get users

    POST /users
        → create user

    GET /users/42
        → get user

    PATCH /users/42
        → update user

    DELETE /users/42
        → delete user

---

# Resource-Oriented API

Замість:

    /getUsers
    /createUser
    /deleteUser

REST-style API часто використовує:

    GET /users
    POST /users
    DELETE /users/42

Тобто:

    URL → resource

    HTTP method → operation

---

# Stateless HTTP

HTTP є stateless protocol.

Це означає, що кожен request розглядається як окреме повідомлення.

Наприклад:

    Request 1:
    GET /api/users

    Request 2:
    GET /api/products

Server не повинен автоматично припускати, що request 2 має контекст request 1.

State може підтримуватися окремими механізмами:

    cookies
    sessions
    tokens
    databases

---

# Authentication

Authentication відповідає на питання:

    "Хто ти?"

Наприклад:

    login
        ↓
    credentials
        ↓
    authentication
        ↓
    user identity

---

# Authorization

Authorization відповідає на питання:

    "Що тобі дозволено?"

Наприклад:

    authenticated user
        ↓
    role = student
        ↓
    access allowed

або:

    role = student
        ↓
    admin endpoint
        ↓
    403 Forbidden

---

# Cookies

Cookie — механізм зберігання невеликих даних, які browser може пов'язувати з domain.

Server може відправити:

    Set-Cookie

Browser зберігає cookie та може надсилати його в наступних requests відповідно до cookie rules.

Cookies часто використовуються для:

    sessions
    authentication
    preferences

---

# CORS

CORS — Cross-Origin Resource Sharing.

Він визначає правила, за якими browser дозволяє web page робити requests до іншого origin.

Наприклад:

    frontend:
    http://localhost:3000

    backend:
    http://localhost:4000

Це різні origins.

Browser може застосувати CORS restrictions.

---

# Origin

Origin складається з:

    scheme
    host
    port

Наприклад:

    http://localhost:3000

та:

    http://localhost:4000

мають різні origins, тому що різні ports.

Так само:

    http://example.com

та:

    https://example.com

мають різні origins через різні schemes.

---

# CORS Example

Frontend:

    http://localhost:3000

Backend:

    http://localhost:4000

Frontend:

    fetch("http://localhost:4000/api/users");

Browser може перевірити CORS policy backend.

Backend має дозволити відповідний origin через CORS headers / configuration.

---

# Preflight Request

Для деяких cross-origin requests browser спочатку виконує:

    OPTIONS

request.

Це називається:

    preflight request

Його мета — перевірити, чи дозволений actual request.

Наприклад:

    Browser
        ↓
    OPTIONS
        ↓
    Server
        ↓
    CORS permission
        ↓
    actual request

---

# HTTP Headers Example

Request може виглядати концептуально так:

    POST /api/users HTTP/1.1
    Host: example.com
    Content-Type: application/json
    Accept: application/json

    {
        "name": "John"
    }

Response:

    HTTP/1.1 201 Created
    Content-Type: application/json

    {
        "id": 42,
        "name": "John"
    }

---

# HTTP Request Lifecycle

Типовий lifecycle:

    User action
        ↓
    JavaScript
        ↓
    fetch()
        ↓
    HTTP request
        ↓
    network
        ↓
    server
        ↓
    route
        ↓
    controller
        ↓
    service
        ↓
    database
        ↓
    response
        ↓
    browser
        ↓
    JavaScript
        ↓
    UI update

---

# Full Stack Example

Нехай frontend хоче отримати users.

Frontend:

    const response = await fetch(
        "http://localhost:3000/api/users"
    );

Backend:

    GET /api/users

Backend може виконати:

    controller
        ↓
    service
        ↓
    PostgreSQL
        ↓
    users

Потім:

    PostgreSQL
        ↓
    backend
        ↓
    JSON response
        ↓
    frontend

---

# Full Stack CRUD

Для CRUD:

    CREATE
        ↓
    POST /api/users

    READ
        ↓
    GET /api/users

    READ ONE
        ↓
    GET /api/users/42

    UPDATE
        ↓
    PATCH /api/users/42

    DELETE
        ↓
    DELETE /api/users/42

Це базова модель для full-stack practice.

---

# CRUD + HTTP

| CRUD | HTTP |
|---|---|
| Create | POST |
| Read | GET |
| Update | PATCH / PUT |
| Delete | DELETE |

Це не абсолютне правило HTTP, але типовий REST-style mapping.

---

# Idempotency

Idempotent method — метод, повторення якого має той самий intended effect на server state після першого застосування.

Наприклад:

    PUT /users/42

з одним і тим самим representation можна повторити.

Результат стану ресурсу має залишатися тим самим.

`GET`, `PUT`, `DELETE` визначені як idempotent methods.

`POST` зазвичай не є idempotent.

Важливо:

    idempotent
        ≠
    response буде абсолютно однаковим

Йдеться про intended effect на server state.

---

# Safe Methods

Safe HTTP methods — methods, призначені для отримання інформації, а не зміни server state.

Наприклад:

    GET
    HEAD
    OPTIONS

Найважливіший для frontend:

    GET

---

# GET Should Not Modify Data

Наприклад:

    GET /api/users

повинен отримувати users.

Не слід проєктувати API так:

    GET /api/delete-user/42

для видалення user.

Для цього існує:

    DELETE /api/users/42

---

# HTTP Caching

HTTP підтримує caching mechanisms.

Browser та інші caches можуть зберігати response, щоб не виконувати network request щоразу.

Пов'язані headers:

    Cache-Control
    ETag
    Last-Modified
    If-None-Match
    If-Modified-Since

На базовому рівні достатньо розуміти:

    cache
        ↓
    reuse response
        ↓
    less network traffic
        ↓
    faster application

---

# ETag

`ETag` — validator, який server може використовувати для визначення, чи змінилася representation ресурсу.

Спрощено:

    first request
        ↓
    response + ETag
        ↓
    browser stores cache

Наступний request:

    If-None-Match: <etag>

Server може відповісти:

    304 Not Modified

і browser використає cached representation.

---

# HTTP vs HTTPS

| HTTP | HTTPS |
|---|---|
| незашифрований HTTP | HTTP over TLS |
| дані можуть бути перехоплені | traffic захищений TLS |
| `http://` | `https://` |
| не підходить для sensitive data | стандартний вибір для web |

Для production application:

    HTTPS

є стандартною практикою.

---

# Common Request Headers

    Content-Type
    Accept
    Authorization
    Cookie
    User-Agent
    Cache-Control

---

# Common Response Headers

    Content-Type
    Content-Length
    Cache-Control
    ETag
    Set-Cookie
    Location
    Access-Control-Allow-Origin

---

# HTTP vs WebSocket

HTTP:

    request
        ↓
    response

WebSocket:

    connection
        ↓
    persistent communication
        ↕
    messages

HTTP добре підходить для:

    CRUD APIs
    page requests
    REST APIs

WebSocket корисний для:

    real-time chat
    live notifications
    multiplayer applications
    live updates

---

# HTTP Version

Існують різні версії HTTP:

    HTTP/1.1
    HTTP/2
    HTTP/3

На рівні frontend JavaScript зазвичай не потрібно вручну керувати version.

Browser та server домовляються про протокол на транспортному рівні.

Основні сучасні ідеї:

    HTTP/1.1
        → classic widely used protocol

    HTTP/2
        → multiplexing, binary framing, improved transport efficiency

    HTTP/3
        → HTTP over QUIC

Для Junior достатньо знати, що HTTP має кілька versions та сучасний web часто використовує HTTP/2 або HTTP/3.

---

# Practical Example — GET

    async function getUsers() {
        const response = await fetch("/api/users");

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        const users = await response.json();

        return users;
    }

---

# Practical Example — POST

    async function createUser(user) {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        return response.json();
    }

---

# Practical Example — PATCH

    async function updateUser(id, data) {
        const response = await fetch(
            `/api/users/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        return response.json();
    }

---

# Practical Example — DELETE

    async function deleteUser(id) {
        const response = await fetch(
            `/api/users/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }
    }

---

# Practical Example — CRUD API

    async function getUsers() {
        const response = await fetch("/api/users");

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        return response.json();
    }

    async function createUser(user) {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error("Failed to create user");
        }

        return response.json();
    }

    async function updateUser(id, data) {
        const response = await fetch(`/api/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Failed to update user");
        }

        return response.json();
    }

    async function deleteUser(id) {
        const response = await fetch(`/api/users/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete user");
        }
    }

---

# Typical API Structure

Наприклад:

    /api/users

    GET
        → list users

    POST
        → create user

    /api/users/:id

    GET
        → get one user

    PATCH
        → update user

    DELETE
        → delete user

Це дуже типовий pattern для:

    Express
    Nest.js
    Next.js Route Handlers

---

# HTTP + PostgreSQL

У full-stack application PostgreSQL не спілкується з browser безпосередньо.

Типова архітектура:

    Browser
        ↓
    HTTP
        ↓
    Backend
        ↓
    PostgreSQL

Не:

    Browser
        ↓
    PostgreSQL

Backend виконує роль application layer.

---

# Why Browser Should Not Connect Directly to PostgreSQL

Database credentials не повинні потрапляти у frontend code.

Правильна модель:

    Browser
        ↓
    public HTTP API
        ↓
    backend
        ↓
    private database

Backend контролює:

    authentication
    authorization
    validation
    business logic
    database access

---

# HTTP and Validation

Client validation:

    Browser
        ↓
    validate form
        ↓
    request

Але server все одно повинен перевіряти дані.

Правильна модель:

    Client validation
        +
    Server validation

Не можна довіряти тільки frontend validation.

---

# HTTP Errors vs Network Errors

Це дуже важлива відмінність.

### HTTP error

Server відповів:

    404
    400
    500

Тобто HTTP response існує.

---

### Network error

Request не зміг нормально отримати HTTP response.

Наприклад:

    network disconnected
    DNS failure
    connection failure
    blocked request

У такій ситуації `fetch()` може reject Promise.

---

# fetch Error Handling

Наприклад:

    try {
        const response = await fetch("/api/users");

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }

        const users = await response.json();

        console.log(users);
    } catch (error) {
        console.error(error);
    }

Тут обробляються:

    network / fetch errors
    HTTP errors, які ми явно перетворили на exception

---

# Request Headers Example

    const response = await fetch("/api/profile", {
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer token"
        }
    });

---

# POST Request Structure

Типова структура:

    fetch("/api/users", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: "John"
        })
    });

Запам'ятати:

    method
        ↓
    headers
        ↓
    body

---

# GET Request Structure

    fetch("/api/users");

або:

    fetch("/api/users?page=2&limit=20");

Для простого GET:

    method
        → default GET

---

# DELETE Request Structure

    fetch("/api/users/42", {
        method: "DELETE"
    });

---

# HTTP Flow Example

Користувач натискає:

    "Add user"

Frontend:

    button click
        ↓
    createUser()
        ↓
    fetch()
        ↓
    POST /api/users
        ↓
    JSON body

Backend:

    receive request
        ↓
    validate data
        ↓
    service
        ↓
    PostgreSQL
        ↓
    INSERT

Backend:

    201 Created
        ↓
    JSON response

Frontend:

    response
        ↓
    update UI

---

# Practical CRUD Flow

    User clicks Add
        ↓
    POST /api/users
        ↓
    Nest.js
        ↓
    validation
        ↓
    PostgreSQL INSERT
        ↓
    201 Created
        ↓
    JSON user
        ↓
    React state update
        ↓
    UI render

---

# HTTP Mental Model

Корисно мислити:

    URL
        → WHERE?

    Method
        → WHAT operation?

    Headers
        → METADATA?

    Body
        → WHAT data?

    Status
        → WHAT happened?

---

# Request Mental Model

    REQUEST

    METHOD
        +
    URL
        +
    HEADERS
        +
    BODY

---

# Response Mental Model

    RESPONSE

    STATUS
        +
    HEADERS
        +
    BODY

---

# HTTP Cheat Sheet

## Request

    METHOD
    URL
    HEADERS
    BODY

---

## Response

    STATUS
    HEADERS
    BODY

---

## Methods

    GET
        → read

    POST
        → create / submit

    PUT
        → replace

    PATCH
        → partial update

    DELETE
        → delete

---

## Status Codes

    2xx → success
    3xx → redirection
    4xx → client/request problem
    5xx → server problem

---

## Important Statuses

    200 → OK
    201 → Created
    204 → No Content

    400 → Bad Request
    401 → Unauthorized
    403 → Forbidden
    404 → Not Found
    409 → Conflict
    422 → Unprocessable Content
    429 → Too Many Requests

    500 → Internal Server Error
    502 → Bad Gateway
    503 → Service Unavailable
    504 → Gateway Timeout

---

## URL

    https://example.com/api/users/42?active=true

    https
        → scheme

    example.com
        → host

    /api/users/42
        → path

    ?active=true
        → query

---

## Path Parameter

    /users/42

    42 → id

---

## Query Parameter

    /users?page=2&limit=20

    page=2
    limit=20

---

## JSON

    {
        "name": "John",
        "age": 30
    }

---

## Content-Type

    Content-Type: application/json

---

## fetch

    const response = await fetch("/api/users");

    if (!response.ok) {
        throw new Error(
            `HTTP ${response.status}`
        );
    }

    const data = await response.json();

---

# Типові помилки

❌ Вважати, що `fetch()` кидає exception на `404` або `500`.

Правильно:

    fetch()
        ↓
    Response
        ↓
    check response.ok / status

---

❌ Не перевіряти `response.ok`.

    const response = await fetch("/api/users");

    const data = await response.json();

Краще:

    const response = await fetch("/api/users");

    if (!response.ok) {
        throw new Error(
            `HTTP ${response.status}`
        );
    }

---

❌ Забувати `JSON.stringify()` при відправленні JSON.

Неправильно:

    body: {
        name: "John"
    }

Правильно:

    body: JSON.stringify({
        name: "John"
    })

---

❌ Забувати:

    Content-Type: application/json

при відправленні JSON body, якщо API очікує цей header.

---

❌ Плутати `401` та `403`.

    401 → authentication problem

    403 → access forbidden

---

❌ Плутати `PUT` та `PATCH`.

    PUT
        → replace

    PATCH
        → partial update

---

❌ Використовувати GET для зміни server state.

Неправильно:

    GET /delete-user/42

Краще:

    DELETE /users/42

---

❌ Плутати path parameters та query parameters.

    /users/42
        → path parameter

    /users?page=2
        → query parameter

---

❌ Підключати browser безпосередньо до PostgreSQL.

Правильно:

    Browser
        ↓
    Backend API
        ↓
    PostgreSQL

---

❌ Покладатися тільки на frontend validation.

Server повинен повторно перевіряти дані.

---

❌ Плутати HTTP error та network error.

    HTTP error
        → response received
        → status 4xx / 5xx

    Network error
        → request не зміг нормально отримати response

---

❌ Вважати, що HTTP завжди означає insecure connection.

    HTTP
        → protocol

    HTTPS
        → HTTP over TLS

---

# Питання зі співбесіди

Що таке HTTP?

Що таке HTTPS?

Чим HTTP відрізняється від HTTPS?

Що таке client?

Що таке server?

Що таке HTTP request?

Що таке HTTP response?

Що містить HTTP request?

Що містить HTTP response?

Що таке URL?

З яких частин складається URL?

Що таке endpoint?

Що таке HTTP method?

Які основні HTTP methods ти знаєш?

Для чого використовується GET?

Для чого використовується POST?

Для чого використовується PUT?

Для чого використовується PATCH?

Для чого використовується DELETE?

Чим PUT відрізняється від PATCH?

Що таке HTTP headers?

Що таке `Content-Type`?

Що таке `Accept`?

Для чого потрібен `Authorization`?

Що таке request body?

Що таке response body?

Що таке JSON?

Для чого потрібен `JSON.stringify()`?

Для чого потрібен `JSON.parse()`?

Що таке HTTP status code?

Що означає `200`?

Що означає `201`?

Що означає `204`?

Що означає `400`?

Що означає `401`?

Що означає `403`?

Що означає `404`?

Що означає `409`?

Що означає `422`?

Що означає `429`?

Що означає `500`?

Що означає `502`?

Що означає `503`?

Що означає `504`?

Яка різниця між `401` та `403`?

Яка різниця між `4xx` та `5xx`?

Що таке path parameter?

Що таке query parameter?

Яка різниця між:

    /users/42

та:

    /users?id=42

Що таке REST API?

Що таке CRUD?

Як CRUD пов'язаний з HTTP methods?

Що таке stateless protocol?

Що таке authentication?

Що таке authorization?

Що таке CORS?

Що таке origin?

Що таке preflight request?

Що таке `OPTIONS` request?

Як працює `fetch()`?

Що повертає `fetch()`?

Що таке `Response`?

Що таке `response.ok`?

Чи кидає `fetch()` exception при `404`?

Чи кидає `fetch()` exception при `500`?

Чим HTTP error відрізняється від network error?

Як відправити POST request через `fetch()`?

Як відправити JSON через `fetch()`?

Як передати query parameters?

Як отримати JSON response?

Чому browser не повинен безпосередньо підключатися до PostgreSQL?

Як виглядає full-stack HTTP flow?

---

# Шлях

## 🟢 Core (обов'язково знати)

Що таке HTTP.

Що таке HTTPS.

Client / server.

Request / response.

Request-response model.

URL.

Endpoint.

HTTP methods:

    GET
    POST
    PUT
    PATCH
    DELETE

Request:

    method
    URL
    headers
    body

Response:

    status
    headers
    body

HTTP status classes:

    2xx
    3xx
    4xx
    5xx

Основні status codes:

    200
    201
    204
    400
    401
    403
    404
    500

JSON.

`Content-Type`.

`fetch()`.

`response.ok`.

`response.status`.

`response.json()`.

Path parameters.

Query parameters.

Основи REST API.

Основи CRUD.

Основи CORS.

Основи authentication / authorization.

Розуміння:

    Browser
        ↓
    HTTP
        ↓
    Backend
        ↓
    Database

---

## 🔵 Junior

Впевнено працювати з:

    GET
    POST
    PUT
    PATCH
    DELETE

Вміти створити HTTP request через `fetch()`.

Вміти передавати:

    headers
    JSON body
    query parameters

Вміти обробляти:

    response.ok
    response.status

Розуміти:

    401
    403
    404
    409
    422
    429
    500

Розуміти різницю:

    PUT
    PATCH

Розуміти:

    path parameters
    query parameters

Розуміти:

    request body
    response body

Розуміти JSON serialization:

    JSON.stringify()
    JSON.parse()

Розуміти HTTP errors vs network errors.

Розуміти stateless HTTP.

Розуміти authentication vs authorization.

Розуміти CORS.

Розуміти preflight.

Розуміти REST-style resource design.

Уміти побудувати простий CRUD API flow:

    GET
    POST
    PATCH
    DELETE

Уміти пояснити full-stack request:

    React / Next.js
        ↓
    fetch()
        ↓
    Nest.js
        ↓
    PostgreSQL
        ↓
    Nest.js
        ↓
    JSON
        ↓
    React

---

## 🟠 Middle

Глибше розуміння:

    HTTP semantics
    HTTP caching
    ETag
    Cache-Control
    conditional requests

Розуміння:

    safe methods
    idempotent methods

Розуміння:

    cookies
    sessions
    tokens
    authentication flows

Глибоке розуміння:

    CORS
    preflight
    credentials

Розуміння:

    content negotiation
    Accept
    Content-Type

Розуміння:

    pagination
    filtering
    sorting
    searching

Розуміння:

    rate limiting
    retries
    timeouts
    cancellation

Розуміння:

    REST API design
    resource modeling
    HTTP semantics

Розуміння:

    HTTP/1.1
    HTTP/2
    HTTP/3

Розуміння reverse proxy:

    Browser
        ↓
    Nginx / proxy
        ↓
    Backend

Розуміння:

    load balancer
    API gateway
    caching layer

---

## 🔴 Senior

Глибоке розуміння HTTP semantics.

RFC-level understanding HTTP methods.

HTTP caching architecture.

Cache validation.

Conditional requests.

ETag strategies.

Cache-Control directives.

Content negotiation.

HTTP/2 multiplexing.

HTTP/3 / QUIC.

Connection management.

TLS.

HTTP performance.

Compression.

Streaming responses.

Range requests.

Reverse proxies.

Load balancing.

API gateways.

Rate limiting.

Retries.

Timeouts.

Circuit breakers.

Idempotency keys.

Distributed systems.

API versioning.

Backward compatibility.

REST API architecture.

Resource modeling.

Error response design.

Observability.

Tracing.

Request correlation.

Security headers.

CSRF.

CORS security.

Authentication protocols.

Authorization architecture.

---

# Міні-шпаргалка

## HTTP

    Client
        ↓
    Request
        ↓
    Server
        ↓
    Response
        ↓
    Client

---

## Request

    METHOD
    URL
    HEADERS
    BODY

---

## Response

    STATUS
    HEADERS
    BODY

---

## Methods

    GET
        → read

    POST
        → create / submit

    PUT
        → replace

    PATCH
        → partial update

    DELETE
        → delete

---

## CRUD

    Create → POST
    Read   → GET
    Update → PATCH / PUT
    Delete → DELETE

---

## Status

    2xx → success
    3xx → redirect
    4xx → client/request error
    5xx → server error

---

## Important Status

    200 → OK
    201 → Created
    204 → No Content

    400 → Bad Request
    401 → Unauthorized
    403 → Forbidden
    404 → Not Found
    409 → Conflict
    422 → Unprocessable Content
    429 → Too Many Requests

    500 → Internal Server Error
    502 → Bad Gateway
    503 → Service Unavailable
    504 → Gateway Timeout

---

## URL

    https://example.com/api/users/42?page=2

    https
        → scheme

    example.com
        → host

    /api/users/42
        → path

    ?page=2
        → query

---

## Path

    /users/42

    42
        → resource id

---

## Query

    /users?page=2&limit=20

    page=2
    limit=20

---

## JSON

    {
        "name": "John",
        "age": 30
    }

---

## fetch

    const response = await fetch("/api/users");

    if (!response.ok) {
        throw new Error(
            `HTTP ${response.status}`
        );
    }

    const data = await response.json();

---

## POST

    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "John"
        })
    });

---

## PATCH

    const response = await fetch("/api/users/42", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "Anna"
        })
    });

---

## DELETE

    const response = await fetch("/api/users/42", {
        method: "DELETE"
    });

---

## Authentication

    authentication
        → Who are you?

    authorization
        → What are you allowed to do?

---

## CORS

    Frontend
        ↓
    cross-origin request
        ↓
    Browser CORS checks
        ↓
    Backend policy

---

## Full Stack

    React / Next.js
        ↓
    fetch()
        ↓
    HTTP
        ↓
    Nest.js / Node.js
        ↓
    PostgreSQL
        ↓
    Nest.js
        ↓
    HTTP Response
        ↓
    React / Next.js

---

# Головне:

• HTTP — протокол обміну даними між client та server.

• Основна модель HTTP:

    request → response

• HTTP request складається з:

    method
    URL
    headers
    body

• HTTP response складається з:

    status
    headers
    body

• Основні methods:

    GET
    POST
    PUT
    PATCH
    DELETE

• Типовий CRUD mapping:

    CREATE → POST
    READ   → GET
    UPDATE → PATCH / PUT
    DELETE → DELETE

• `GET` використовується переважно для отримання даних.

• `POST` використовується переважно для створення ресурсу або виконання операції.

• `PUT` використовується для повної заміни ресурсу.

• `PATCH` використовується для часткового оновлення.

• `DELETE` використовується для видалення ресурсу.

• HTTP status codes:

    2xx → success
    3xx → redirection
    4xx → client/request problem
    5xx → server problem

• Найважливіші status codes:

    200 → OK
    201 → Created
    204 → No Content
    400 → Bad Request
    401 → Unauthorized
    403 → Forbidden
    404 → Not Found
    409 → Conflict
    422 → Unprocessable Content
    429 → Too Many Requests
    500 → Internal Server Error
    503 → Service Unavailable

• `401` пов'язаний з authentication.

• `403` означає, що доступ заборонений.

• `404` означає, що ресурс не знайдено.

• `500` означає server-side error.

• URL визначає адресу ресурсу.

• Path parameter знаходиться в path:

    /users/42

• Query parameter знаходиться після `?`:

    /users?page=2

• Headers передають metadata.

• `Content-Type` описує формат body.

• `Accept` описує бажаний формат response.

• JSON — один із найпоширеніших форматів обміну даними між frontend та backend.

• `JSON.stringify()` перетворює JavaScript value у JSON string.

• `JSON.parse()` перетворює JSON string у JavaScript value.

• `fetch()` використовується для HTTP requests.

• `fetch()` повертає Promise.

• `fetch()` не вважає `404` або `500` автоматично JavaScript exception.

• Тому потрібно перевіряти:

    response.ok

або:

    response.status

• `response.json()` також є asynchronous operation та повертає Promise.

• HTTP error та network error — не одне й те саме.

• HTTP є stateless protocol.

• Authentication відповідає:

    Who are you?

• Authorization відповідає:

    What are you allowed to do?

• CORS контролює browser access до resources іншого origin.

• HTTPS — HTTP поверх TLS.

• Browser не повинен безпосередньо підключатися до PostgreSQL.

• Типова full-stack architecture:

    Browser
        ↓
    HTTP API
        ↓
    Backend
        ↓
    PostgreSQL

• Для твого JavaScript full-stack stack типовий flow:

    React / Next.js
        ↓
    fetch()
        ↓
    HTTP request
        ↓
    Nest.js / Node.js
        ↓
    PostgreSQL
        ↓
    HTTP response
        ↓
    React / Next.js

• Основна mental model:

    URL
        → WHERE?

    Method
        → WHAT operation?

    Headers
        → METADATA?

    Body
        → WHAT data?

    Status
        → WHAT happened?

• Якщо добре розуміти цю модель, то наступні теми:

    fetch
    Promises
    async/await
    REST API
    CRUD
    Nest.js
    Next.js
    PostgreSQL integration

стають значно зрозумілішими.

• Головна формула HTTP для full-stack JavaScript:

    Request
        ↓
    Backend
        ↓
    Database
        ↓
    Response

• І найважливіше практичне правило:

    Frontend
        ↓
    HTTP API
        ↓
    Backend
        ↓
    Database

а не:

    Frontend
        ↓
    Database