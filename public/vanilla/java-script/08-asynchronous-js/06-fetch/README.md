## 04. Fetch & Working with API

`fetch()` — це вбудований JavaScript API для виконання HTTP-запитів до серверів та отримання або відправлення даних.

За допомогою `fetch()` JavaScript application може взаємодіяти з:
- REST API
- Backend server
- Web services
- JSON API
- External APIs

`fetch()` працює асинхронно та повертає `Promise`.

### Ключові поняття

✔ `fetch()`
✔ HTTP request
✔ HTTP response
✔ `Promise`
✔ `async / await`
✔ `GET`
✔ `POST`
✔ `PUT`
✔ `PATCH`
✔ `DELETE`
✔ URL
✔ endpoint
✔ headers
✔ request body
✔ JSON
✔ `response.json()`
✔ `response.ok`
✔ `response.status`
✔ HTTP status codes
✔ API
✔ REST API
✔ error handling
✔ CORS

### Що потрібно пам'ятати

• `fetch()` використовується для HTTP-запитів.

• `fetch()` повертає `Promise`.

• `fetch()` за замовчуванням виконує `GET` request.

• `fetch()` не повертає одразу JSON — спочатку потрібно отримати `Response`.

• Для читання JSON використовується:

    response.json()

• `response.json()` також повертає `Promise`.

• HTTP status `404`, `500` тощо не викликають `catch()` автоматично.

• Для перевірки HTTP-помилки потрібно перевіряти:

    response.ok

• `response.ok === true` означає HTTP status у діапазоні `200–299`.

• `response.ok === false` означає, що HTTP response не є успішним.

• Для відправлення JSON потрібно:
  - встановити `Content-Type`
  - перетворити JavaScript object у JSON через `JSON.stringify()`

• Для отримання JSON потрібно перетворити response через:

    response.json()

• `async / await` робить роботу з `fetch()` зручнішою для читання.

• API дозволяє application взаємодіяти з іншою системою через визначений interface.

• Endpoint — конкретна URL-адреса API, з якою працює application.

---

### Що таке API

**API (Application Programming Interface)** — це interface, через який одна програма може взаємодіяти з іншою програмою або сервісом.

Спрощено:

    Application
         │
         │ request
         ▼
        API
         │
         │ response
         ▼
    Application

Наприклад:

    Browser
       │
       │ GET /users
       ▼
    Backend API
       │
       ▼
    Database

API приховує внутрішню реалізацію системи та надає визначений спосіб взаємодії з нею.

---

### Що таке HTTP

**HTTP (HyperText Transfer Protocol)** — протокол, за допомогою якого client та server обмінюються даними.

Основна модель:

    Client
       │
       │ HTTP Request
       ▼
    Server
       │
       │ HTTP Response
       ▼
    Client

Наприклад:

    Browser
       │
       │ GET /api/users
       ▼
    Node.js Server
       │
       ▼
    JSON Response

---

### HTTP Request

HTTP request містить інформацію про те, що client хоче зробити.

Основні частини:

    Request
    │
    ├── Method
    ├── URL
    ├── Headers
    └── Body

Наприклад:

    GET /api/users

Або:

    POST /api/users

    Headers:
    Content-Type: application/json

    Body:
    {
      "name": "John",
      "email": "john@example.com"
    }

---

### HTTP Response

Server повертає response.

Основні частини:

    Response
    │
    ├── Status
    ├── Headers
    └── Body

Наприклад:

    Status: 200 OK

    Content-Type: application/json

    Body:
    [
      {
        "id": 1,
        "name": "John"
      }
    ]

---

### Fetch

Базовий синтаксис:

    fetch(url)

Наприклад:

    fetch("https://example.com/api/users")

`fetch()` повертає `Promise`.

    const promise = fetch("/api/users");

    console.log(promise);

Результатом Promise буде об'єкт `Response`.

---

### Простий GET request

    fetch("/api/users")
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });

Аналогічно через `async / await`:

    async function getUsers() {
      const response = await fetch("/api/users");
      const data = await response.json();

      console.log(data);
    }

---

### Fetch + async / await

Найчастіше у сучасному JavaScript коді:

    async function getUsers() {
      const response = await fetch("/api/users");
      const data = await response.json();

      return data;
    }

Використання:

    const users = await getUsers();

---

### Fetch lifecycle

Важливо розуміти послідовність:

    fetch()
       │
       ▼
    Promise<Response>
       │
       ▼
    Response
       │
       ▼
    response.json()
       │
       ▼
    Promise<Data>
       │
       ▼
    JavaScript data

Наприклад:

    const response = await fetch("/api/users");

    const data = await response.json();

---

### Response

`fetch()` повертає об'єкт `Response`.

Наприклад:

    const response = await fetch("/api/users");

    console.log(response);

Важливі властивості:

    response.ok
    response.status
    response.statusText
    response.headers
    response.url

---

### response.ok

`response.ok` показує, чи є HTTP response успішним.

    const response = await fetch("/api/users");

    if (response.ok) {
      console.log("Success");
    }

Успішними вважаються status:

    200
    201
    202
    204
    ...

Тобто:

    response.ok === true

для status `200–299`.

---

### HTTP Status Codes

Основні категорії:

    1xx → інформаційні
    2xx → успіх
    3xx → redirect
    4xx → помилка client
    5xx → помилка server

Найважливіші:

    200 OK
    201 Created
    204 No Content

    400 Bad Request
    401 Unauthorized
    403 Forbidden
    404 Not Found
    409 Conflict
    422 Unprocessable Content

    500 Internal Server Error
    502 Bad Gateway
    503 Service Unavailable

---

### Важлива особливість fetch()

`fetch()` не вважає HTTP `404` або `500` JavaScript exception.

Наприклад:

    try {
      const response = await fetch("/api/users");

      console.log(response.status);
    } catch (error) {
      console.log(error);
    }

Якщо server повернув:

    404 Not Found

`catch` може не виконатися.

Тому потрібно перевіряти:

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

---

### Правильна обробка HTTP помилок

    async function getUsers() {
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      return data;
    }

---

### try / catch

Для обробки network errors та власноруч створених errors:

    async function getUsers() {
      try {
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        return data;
      } catch (error) {
        console.error("Request failed:", error);
      }
    }

---

### GET

`GET` використовується для отримання даних.

    const response = await fetch("/api/users");

    const users = await response.json();

---

### GET одного ресурсу

    const response = await fetch("/api/users/5");

    const user = await response.json();

---

### Query Parameters

Query parameters передають додаткові параметри через URL.

Наприклад:

    /api/users?page=2&limit=10

Через `fetch()`:

    const response = await fetch(
      "/api/users?page=2&limit=10"
    );

    const users = await response.json();

---

### URLSearchParams

Для створення query string зручно використовувати `URLSearchParams`.

    const params = new URLSearchParams({
      page: 2,
      limit: 10
    });

    const response = await fetch(`/api/users?${params}`);

---

### POST

`POST` використовується для створення нового ресурсу або передачі даних на server.

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

---

### POST з перевіркою response

    async function createUser(user) {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      return response.json();
    }

---

### JSON.stringify()

JavaScript object:

    const user = {
      name: "John",
      age: 30
    };

Для передачі через HTTP body його потрібно перетворити у JSON:

    const json = JSON.stringify(user);

Результат:

    '{"name":"John","age":30}'

---

### JSON.parse()

Якщо у нас є JSON string:

    const json = '{"name":"John","age":30}';

Можна перетворити його назад у JavaScript object:

    const user = JSON.parse(json);

Але для `fetch()` response зазвичай використовується:

    const user = await response.json();

---

### PUT

`PUT` зазвичай використовується для повного оновлення ресурсу.

    const response = await fetch("/api/users/5", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "John",
        email: "new@example.com"
      })
    });

---

### PATCH

`PATCH` зазвичай використовується для часткового оновлення ресурсу.

    const response = await fetch("/api/users/5", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "John Updated"
      })
    });

---

### DELETE

`DELETE` використовується для видалення ресурсу.

    const response = await fetch("/api/users/5", {
      method: "DELETE"
    });

Перевірка:

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

---

### HTTP Methods

    GET
    ↓
    отримати ресурс

    POST
    ↓
    створити / передати дані

    PUT
    ↓
    повністю оновити ресурс

    PATCH
    ↓
    частково оновити ресурс

    DELETE
    ↓
    видалити ресурс

---

### Headers

Headers містять додаткову інформацію про request або response.

Наприклад:

    headers: {
      "Content-Type": "application/json"
    }

Для JSON request:

    "Content-Type": "application/json"

Це повідомляє server:

    Body містить JSON.

---

### Authorization Header

API може вимагати authentication token.

Наприклад:

    const response = await fetch("/api/users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

Типова структура:

    Authorization: Bearer <token>

---

### Request Body

Body містить дані, які client відправляє server.

Наприклад:

    body: JSON.stringify({
      name: "John",
      email: "john@example.com"
    })

Body найчастіше використовується з:

    POST
    PUT
    PATCH

---

### Отримання JSON

Найпоширеніший варіант:

    const response = await fetch("/api/users");
    const data = await response.json();

---

### Інші типи response

Response може містити не тільки JSON.

Наприклад:

    response.text()

    response.blob()

    response.arrayBuffer()

    response.formData()

Для JSON API найчастіше:

    response.json()

---

### REST API

**REST API** — поширений architectural style для побудови HTTP API.

Наприклад:

    GET    /api/users
    GET    /api/users/5
    POST   /api/users
    PUT    /api/users/5
    PATCH  /api/users/5
    DELETE /api/users/5

Можна уявляти API як ресурси:

    /users
    /products
    /orders
    /posts

---

### Client → API → Database

Типова web application:

    Browser
       │
       │ fetch()
       ▼
    REST API
       │
       ▼
    Backend
       │
       ▼
    Database

Наприклад:

    React / Vanilla JS
          │
          │ GET /api/products
          ▼
    Node.js / Express
          │
          │ SQL
          ▼
    PostgreSQL

---

### Fetch з локальним Backend

Frontend:

    async function getProducts() {
      const response = await fetch(
        "http://localhost:5000/api/products"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      return response.json();
    }

Backend:

    GET /api/products

Response:

    [
      {
        "id": 1,
        "name": "Laptop",
        "price": 1000
      },
      {
        "id": 2,
        "name": "Phone",
        "price": 700
      }
    ]

---

### Fetch та CORS

**CORS (Cross-Origin Resource Sharing)** — механізм, який контролює HTTP-запити між різними origins.

Наприклад:

    Frontend:
    http://localhost:5173

    Backend:
    http://localhost:5000

Це різні origins.

Browser може заблокувати request, якщо backend не дозволяє відповідний origin.

Схема:

    Frontend
    localhost:5173
         │
         │ fetch()
         ▼
    Backend
    localhost:5000
         │
         │ CORS policy
         ▼
    Response

Важливо:

• CORS — це browser security mechanism.

• CORS зазвичай налаштовується на server.

• Помилка CORS не означає, що `fetch()` написаний неправильно.

---

### Promise Chain

`fetch()` можна використовувати через `.then()`:

    fetch("/api/users")
      .then(response => response.json())
      .then(users => {
        console.log(users);
      })
      .catch(error => {
        console.error(error);
      });

---

### async / await

Той самий код:

    async function getUsers() {
      try {
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const users = await response.json();

        console.log(users);
      } catch (error) {
        console.error(error);
      }
    }

---

### Послідовні requests

Якщо другий request залежить від першого:

    const userResponse = await fetch("/api/users/5");
    const user = await userResponse.json();

    const ordersResponse = await fetch(
      `/api/users/${user.id}/orders`
    );

    const orders = await ordersResponse.json();

Тут:

    request 1
       ↓
    user
       ↓
    request 2
       ↓
    orders

---

### Паралельні requests

Якщо requests незалежні, їх можна виконувати паралельно.

    const [usersResponse, productsResponse] =
      await Promise.all([
        fetch("/api/users"),
        fetch("/api/products")
      ]);

    const users = await usersResponse.json();
    const products = await productsResponse.json();

Модель:

    fetch users ───────┐
                       ├── Promise.all()
    fetch products ────┘
                       │
                       ▼
                   results

Це може бути значно швидше, ніж:

    await fetch("/api/users");
    await fetch("/api/products");

---

### AbortController

Request можна скасувати через `AbortController`.

    const controller = new AbortController();

    const response = await fetch("/api/users", {
      signal: controller.signal
    });

Скасування:

    controller.abort();

Корисно для:

✔ пошуку
✔ autocomplete
✔ зміни сторінки
✔ component cleanup
✔ скасування непотрібних requests

---

### Fetch з timeout

`fetch()` не має стандартного простого `timeout` параметра, але можна використовувати `AbortSignal.timeout()`:

    try {
      const response = await fetch("/api/users", {
        signal: AbortSignal.timeout(5000)
      });

      const users = await response.json();

    } catch (error) {
      console.error(error);
    }

Тут request буде перерваний після приблизно:

    5000 ms = 5 seconds

---

### Завантаження даних при відкритті сторінки

Наприклад:

    async function loadUsers() {
      try {
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error(
            `Failed: ${response.status}`
          );
        }

        const users = await response.json();

        renderUsers(users);
      } catch (error) {
        console.error(error);
      }
    }

    loadUsers();

---

### Loading State

Під час request корисно показувати loading:

    async function loadUsers() {
      showLoading();

      try {
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const users = await response.json();

        renderUsers(users);
      } catch (error) {
        showError(error);
      } finally {
        hideLoading();
      }
    }

Модель:

    loading
       │
       ▼
    request
       │
       ├── success → data
       │
       └── error   → error
       │
       ▼
    finally
       │
       ▼
    stop loading

---

### API Error Handling

Хороший frontend повинен розрізняти:

    Network Error
         │
         └── server недоступний

    HTTP Error
         │
         ├── 400
         ├── 401
         ├── 403
         ├── 404
         └── 500

    Parsing Error
         │
         └── response не є очікуваним JSON

Наприклад:

    async function getUsers() {
      try {
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}`
          );
        }

        return await response.json();

      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    }

---

### API response format

Backend часто повертає JSON такого виду:

    {
      "data": [
        {
          "id": 1,
          "name": "John"
        }
      ]
    }

Або:

    {
      "data": null,
      "error": "User not found"
    }

Frontend повинен знати API contract — домовленість про структуру request та response.

---

### API Contract

API contract визначає:

    Endpoint
    Method
    Request
    Response
    Status codes
    Errors

Наприклад:

    GET /api/users/:id

    Response 200:
    {
      "id": 5,
      "name": "John"
    }

    Response 404:
    {
      "error": "User not found"
    }

---

### Повний CRUD приклад

#### GET

    const response = await fetch("/api/users");
    const users = await response.json();

#### GET one

    const response = await fetch("/api/users/5");
    const user = await response.json();

#### POST

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

#### PUT

    const response = await fetch("/api/users/5", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "John",
        email: "john@example.com"
      })
    });

#### PATCH

    const response = await fetch("/api/users/5", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "John Updated"
      })
    });

#### DELETE

    const response = await fetch("/api/users/5", {
      method: "DELETE"
    });

---

### Універсальна функція для API

Можна винести повторювану логіку:

    async function apiFetch(url, options = {}) {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error: ${response.status}`
        );
      }

      return response.json();
    }

Використання:

    const users = await apiFetch("/api/users");

    const user = await apiFetch("/api/users/5");

POST:

    const user = await apiFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        name: "John",
        email: "john@example.com"
      })
    });

---

### Fetch і FormData

`fetch()` може відправляти `FormData`.

Наприклад:

    const formData = new FormData();

    formData.append("name", "John");
    formData.append("email", "john@example.com");

    const response = await fetch("/api/users", {
      method: "POST",
      body: formData
    });

При використанні `FormData` зазвичай не потрібно вручну встановлювати:

    Content-Type: multipart/form-data

Browser сам встановить необхідний `Content-Type` разом із boundary.

---

### Fetch і файли

Для завантаження файлу:

    const formData = new FormData();

    formData.append("file", file);

    await fetch("/api/upload", {
      method: "POST",
      body: formData
    });

Для отримання файлу:

    const response = await fetch("/api/file");

    const blob = await response.blob();

---

### API security

Не потрібно передавати через frontend:

❌ database password  
❌ private API secrets  
❌ server credentials  
❌ private encryption keys  

Frontend code доступний користувачу.

Наприклад:

    const API_SECRET = "super-secret-key";

Так робити небезпечно.

Secret повинен залишатися на server.

---

### Типові помилки

❌ Забути `await response.json()`.

    const data = response;

Правильно:

    const data = await response.json();

❌ Вважати, що `fetch()` повертає JSON.

`fetch()` повертає `Response`.

❌ Не перевіряти `response.ok`.

❌ Вважати, що `404` автоматично потрапить у `catch`.

❌ Забути `JSON.stringify()` для JSON request body.

❌ Забути:

    "Content-Type": "application/json"

при відправленні JSON.

❌ Використовувати `GET` для зміни даних.

❌ Відправляти secret API keys у frontend.

❌ Плутати API endpoint і database.

❌ Плутати HTTP error та network error.

❌ Використовувати послідовні requests там, де вони можуть виконуватися паралельно.

❌ Не обробляти loading/error state.

❌ Не враховувати CORS при роботі frontend і backend на різних origins.

---

### Питання зі співбесіди

Що таке `fetch()`?

Що повертає `fetch()`?

Чим `fetch()` відрізняється від `response.json()`?

Що таке HTTP request?

Що таке HTTP response?

Що таке API?

Що таке REST API?

Що таке endpoint?

Які HTTP methods ви знаєте?

Для чого використовуються GET, POST, PUT, PATCH та DELETE?

Що таке HTTP status code?

Що означає `200`?

Що означає `201`?

Що означає `400`?

Що означає `401`?

Що означає `403`?

Що означає `404`?

Що означає `500`?

Що таке `response.ok`?

Чи викличе `fetch()` `catch()` при HTTP `404`?

Як обробити HTTP errors у `fetch()`?

Для чого потрібен `JSON.stringify()`?

Для чого потрібен `response.json()`?

Що таке HTTP headers?

Для чого потрібен `Content-Type`?

Що таке request body?

Що таке CORS?

Чому виникає CORS error?

Як виконати декілька fetch requests паралельно?

Для чого потрібен `Promise.all()`?

Що таке `AbortController`?

Як скасувати fetch request?

---

### Шлях

🟢 **Core (обов'язково знати)**

Що таке API.

Що таке HTTP.

Що таке request та response.

Що таке `fetch()`.

Що `fetch()` повертає `Promise`.

Що таке `Response`.

`response.json()`.

`response.ok`.

`response.status`.

GET request.

POST request.

JSON.

`JSON.stringify()`.

Основні HTTP status codes.

`try / catch`.

---

🔵 **Junior**

GET / POST / PUT / PATCH / DELETE.

Headers.

Request body.

Query parameters.

URL parameters.

REST API.

API endpoints.

CRUD через HTTP.

HTTP error handling.

Network error handling.

CORS.

Loading / error states.

`async / await` + `fetch()`.

`Promise.all()` для parallel requests.

---

🟠 **Middle**

API abstraction.

Reusable API client.

Centralized error handling.

Authentication headers.

Bearer tokens.

Request cancellation.

`AbortController`.

Timeouts.

Pagination.

Filtering.

Sorting.

API response contracts.

Retry strategies.

Request interceptors / wrappers.

Optimistic UI.

Caching API responses.

Race conditions.

---

🔴 **Senior**

API architecture.

REST API design.

API versioning.

Authentication architecture.

Authorization.

Rate limiting.

Caching strategies.

Retry and backoff strategies.

Idempotency.

Distributed systems.

Observability.

API performance.

Request tracing.

API gateways.

BFF (Backend for Frontend).

Security architecture.

Reliability patterns.

---

### Міні-шпаргалка

Fetch:

    fetch(url)
       │
       ▼
    Promise<Response>
       │
       ▼
    response
       │
       ▼
    response.json()
       │
       ▼
    Promise<data>
       │
       ▼
    data

---

HTTP:

    Client
       │
       │ Request
       ▼
    Server
       │
       │ Response
       ▼
    Client

---

Request:

    Request
    │
    ├── Method
    ├── URL
    ├── Headers
    └── Body

---

Response:

    Response
    │
    ├── Status
    ├── Headers
    └── Body

---

HTTP methods:

    GET
    ↓
    Read

    POST
    ↓
    Create

    PUT
    ↓
    Replace

    PATCH
    ↓
    Update

    DELETE
    ↓
    Delete

---

Status codes:

    2xx → success
    3xx → redirect
    4xx → client error
    5xx → server error

---

JSON:

    JavaScript object
          │
          │ JSON.stringify()
          ▼
      JSON string
          │
          │ HTTP
          ▼
        Server

Server response:

    JSON
      │
      │ response.json()
      ▼
    JavaScript object

---

POST:

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

Error handling:

    try {
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}`
        );
      }

      const data = await response.json();

    } catch (error) {
      console.error(error);
    }

---

Parallel requests:

    const [usersResponse, productsResponse] =
      await Promise.all([
        fetch("/api/users"),
        fetch("/api/products")
      ]);

---

Client → API → Backend → Database:

    Frontend
       │
       │ fetch()
       ▼
      API
       │
       ▼
    Backend
       │
       ▼
    Database

---

### Головне:

• `fetch()` — основний Web API для HTTP-запитів у JavaScript.

• `fetch()` повертає `Promise`.

• Результатом `fetch()` є `Response`.

• `response.json()` читає JSON body та повертає `Promise`.

• `response.ok` потрібно перевіряти для HTTP errors.

• HTTP `404` або `500` самі по собі не викликають `catch()`.

• `GET` використовується для отримання даних.

• `POST` — для створення / передачі даних.

• `PUT` — для повного оновлення ресурсу.

• `PATCH` — для часткового оновлення.

• `DELETE` — для видалення.

• JSON передається через `JSON.stringify()`.

• JSON response читається через `response.json()`.

• Headers передають додаткову інформацію про request/response.

• `Content-Type: application/json` використовується для JSON request body.

• API — interface для взаємодії між application та іншою системою.

• Endpoint — конкретна точка API.

• REST API використовує HTTP methods для роботи з resources.

• CORS контролює cross-origin requests у browser.

• `Promise.all()` дозволяє виконувати незалежні requests паралельно.

• `AbortController` дозволяє скасувати request.

• Frontend не повинен містити server secrets.

• Типова схема web application:

    Frontend
       ↓
    fetch()
       ↓
    API
       ↓
    Backend
       ↓
    Database