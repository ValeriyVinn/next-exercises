# React — 08. Data Fetching and REST API
# 01. Fetch

`fetch()` — це Web API для виконання HTTP-запитів із JavaScript та отримання даних із сервера.

У React `fetch()` найчастіше використовується для:

- отримання даних із REST API;
- відправлення даних на сервер;
- завантаження списків;
- отримання одного ресурсу;
- виконання CRUD-операцій;
- роботи з JSON;
- інтеграції React-компонентів із backend;
- завантаження даних під час lifecycle компонента.

Типовий потік:

    React component
          ↓
       fetch()
          ↓
      HTTP request
          ↓
        Server
          ↓
       HTTP response
          ↓
       response.json()
          ↓
        JavaScript data
          ↓
       React state
          ↓
        re-render

---

# Ключові поняття

✔ data fetching  
✔ HTTP request  
✔ HTTP response  
✔ API  
✔ REST API  
✔ endpoint  
✔ URL  
✔ HTTP method  
✔ GET  
✔ POST  
✔ PUT  
✔ PATCH  
✔ DELETE  
✔ `fetch()`  
✔ Promise  
✔ async/await  
✔ `Response`  
✔ `response.ok`  
✔ `response.status`  
✔ `response.json()`  
✔ request headers  
✔ response headers  
✔ request body  
✔ JSON  
✔ HTTP status code  
✔ network error  
✔ server error  
✔ client error  
✔ CORS  
✔ loading state  
✔ error state  
✔ data state  
✔ `useEffect()`  
✔ cleanup  
✔ AbortController  

---

# Що потрібно пам'ятати

• `fetch()` використовується для виконання HTTP-запитів.

• `fetch()` повертає `Promise`.

• `fetch()` не повертає безпосередньо JSON.

• Спочатку потрібно отримати `Response`:

    const response = await fetch(url);

• Потім прочитати body:

    const data = await response.json();

• `response.json()` також повертає `Promise`.

• `fetch()` зазвичай не відхиляє Promise лише через HTTP `404`, `500` тощо.

• Для HTTP-помилок потрібно перевіряти:

    response.ok

• `response.ok === true` означає HTTP status у діапазоні:

    200–299

• HTTP error потрібно обробляти окремо від network error.

• У React дані часто зберігаються в state:

    const [data, setData] = useState(null);

• Для завантаження даних після mount часто використовується:

    useEffect()

• Для асинхронної логіки зручно використовувати:

    async / await

• JSON — найпоширеніший формат обміну даними між frontend і REST API.

• `fetch()` є вбудованим Web API, тому окрема бібліотека для простих HTTP-запитів не потрібна.

---

# Data Fetching

Data fetching — процес отримання даних із зовнішнього джерела.

У React джерелом даних може бути:

    REST API
    backend server
    database через backend
    third-party API
    local API
    mock API

Наприклад:

    React
       ↓
    fetch()
       ↓
    REST API
       ↓
    Backend
       ↓
    Database

React зазвичай не повинен напряму підключатися до database.

Типова архітектура:

    React frontend
          ↓
        HTTP
          ↓
    Backend / API
          ↓
       Database

---

# fetch()

Базовий синтаксис:

    fetch(url);

Наприклад:

    fetch("https://example.com/api/users");

`fetch()` повертає Promise.

    const promise = fetch("https://example.com/api/users");

Успішне виконання HTTP-запиту приводить до отримання об'єкта:

    Response

---

# Найпростіший fetch

    fetch("https://example.com/api/users")
        .then((response) => {
            console.log(response);
        });

Тут:

    fetch()
        ↓
    Promise
        ↓
    Response

---

# fetch() та Promise

`fetch()` є Promise-based API.

Наприклад:

    const promise = fetch("/api/users");

Promise буде завершено після отримання HTTP response.

Можна використати:

    then()

та:

    catch()

Наприклад:

    fetch("/api/users")
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });

---

# async / await

У сучасному React-коді часто використовується `async/await`.

Наприклад:

    async function fetchUsers() {
        const response = await fetch("/api/users");

        console.log(response);
    }

`await` очікує завершення Promise.

---

# Базова структура

    async function fetchUsers() {
        const response = await fetch("/api/users");

        const data = await response.json();

        return data;
    }

Послідовність:

    fetch()
        ↓
    Response
        ↓
    response.json()
        ↓
    JavaScript data

---

# Response

`fetch()` повертає об'єкт `Response`.

Наприклад:

    const response = await fetch("/api/users");

    console.log(response);

Response містить інформацію про HTTP-відповідь.

Важливі властивості:

    response.ok
    response.status
    response.statusText
    response.headers
    response.url

---

# response.ok

`response.ok` показує, чи HTTP response успішний.

Наприклад:

    const response = await fetch("/api/users");

    if (response.ok) {
        console.log("Success");
    }

Для status:

    200
    201
    204
    299

`response.ok` буде:

    true

Для:

    400
    401
    403
    404
    500

буде:

    false

---

# response.status

`response.status` містить HTTP status code.

Наприклад:

    const response = await fetch("/api/users");

    console.log(response.status);

Може бути:

    200

або:

    404

або:

    500

---

# response.statusText

Можна отримати текст HTTP status:

    console.log(response.statusText);

Наприклад:

    OK

Але в реальному застосунку частіше перевіряють:

    response.ok

і:

    response.status

---

# response.headers

Response містить headers.

Наприклад:

    const response = await fetch("/api/users");

    console.log(response.headers);

Headers можуть містити:

    Content-Type
    Content-Length
    Cache-Control
    ...

---

# response.url

Можна отримати URL response:

    console.log(response.url);

---

# response.json()

Найважливіший метод для REST API:

    response.json()

Він читає response body та перетворює JSON у JavaScript value.

Наприклад, сервер повернув:

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

Frontend:

    const response = await fetch("/api/users");

    const users = await response.json();

Тепер:

    users

є JavaScript-масивом:

    [
        {
            id: 1,
            name: "John"
        },
        {
            id: 2,
            name: "Anna"
        }
    ]

---

# Важлива особливість response.json()

`response.json()` асинхронний.

Тому:

    const data = response.json();

не дає безпосередньо об'єкт або масив.

Воно повертає:

    Promise

Правильно:

    const data = await response.json();

---

# fetch + json

Найпоширеніший шаблон:

    const response = await fetch("/api/users");

    const data = await response.json();

---

# Повний базовий приклад

    async function fetchUsers() {
        const response = await fetch("/api/users");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const users = await response.json();

        return users;
    }

---

# HTTP Request

HTTP request складається з основних частин:

    method
    URL
    headers
    body

Наприклад:

    POST /api/users

    Content-Type: application/json

    {
        "name": "John"
    }

---

# HTTP Response

HTTP response складається з:

    status
    headers
    body

Наприклад:

    HTTP 200 OK

    Content-Type: application/json

    {
        "id": 1,
        "name": "John"
    }

---

# URL

URL визначає ресурс, з яким працює frontend.

Наприклад:

    /api/users

або:

    https://api.example.com/users

REST API часто має endpoints:

    /users
    /users/1
    /posts
    /posts/10
    /products
    /products/5

---

# Endpoint

Endpoint — конкретна API-точка, через яку frontend взаємодіє із сервером.

Наприклад:

    GET /api/users

або:

    GET /api/users/10

---

# HTTP Methods

Основні HTTP methods:

    GET
    POST
    PUT
    PATCH
    DELETE

У цьому розділі основна увага приділяється самому `fetch()`.

Детальні CRUD-операції будуть у наступних розділах:

    03-get
    04-post
    05-put-and-patch
    06-delete

---

# GET

`GET` використовується для отримання даних.

Наприклад:

    fetch("/api/users");

За замовчуванням `fetch()` використовує:

    GET

Тобто:

    fetch("/api/users");

еквівалентний за призначенням:

    fetch("/api/users", {
        method: "GET"
    });

---

# POST

POST використовується для відправлення нових даних.

Наприклад:

    fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "John"
        })
    });

Детальніше:

    04-post

---

# PUT

PUT зазвичай використовується для повного оновлення ресурсу.

    fetch("/api/users/1", {
        method: "PUT",
        ...
    });

---

# PATCH

PATCH зазвичай використовується для часткового оновлення.

    fetch("/api/users/1", {
        method: "PATCH",
        ...
    });

---

# DELETE

DELETE використовується для видалення ресурсу.

    fetch("/api/users/1", {
        method: "DELETE"
    });

---

# fetch options

Другий аргумент `fetch()` — options object.

Синтаксис:

    fetch(url, options);

Наприклад:

    fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "John"
        })
    });

Основні options:

    method
    headers
    body
    signal
    credentials
    mode
    cache
    redirect

На Core-рівні найважливіші:

    method
    headers
    body
    signal

---

# method

Визначає HTTP method.

Наприклад:

    fetch("/api/users", {
        method: "POST"
    });

---

# headers

Headers передають додаткову інформацію про request.

Наприклад:

    fetch("/api/users", {
        headers: {
            "Content-Type": "application/json"
        }
    });

---

# Content-Type

`Content-Type` повідомляє серверу, який тип даних передається в body.

Для JSON:

    "Content-Type": "application/json"

Наприклад:

    fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "John"
        })
    });

---

# JSON.stringify()

Перед відправленням JavaScript object у JSON body потрібно перетворити його на JSON string.

Наприклад:

    const user = {
        name: "John",
        age: 25
    };

    const body = JSON.stringify(user);

Результат:

    '{"name":"John","age":25}'

---

# JSON.parse()

У зворотному напрямку JSON можна перетворити на JavaScript value через:

    JSON.parse()

Але при роботі з `fetch()` зазвичай використовують:

    response.json()

який виконує необхідне читання та parsing response body.

---

# Request body

Body використовується для передачі даних серверу.

Наприклад:

    const user = {
        name: "John"
    };

    fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

Тут:

    user
       ↓
    JSON.stringify()
       ↓
    JSON string
       ↓
    HTTP request body
       ↓
    server

---

# fetch без body

GET-запит зазвичай не потребує body.

    fetch("/api/users");

---

# fetch з body

POST:

    fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "John"
        })
    });

---

# Error Handling

При роботі з `fetch()` потрібно розрізняти:

    network error

і:

    HTTP error

Це дуже важливе поняття.

---

# HTTP Error

Наприклад, сервер відповів:

    404 Not Found

або:

    500 Internal Server Error

`fetch()` зазвичай все одно поверне `Response`.

Тому:

    try {
        const response = await fetch("/api/users");

        console.log("fetch resolved");
    } catch (error) {
        console.log("fetch rejected");
    }

може не потрапити в `catch` при HTTP `404` або `500`.

---

# response.ok для HTTP errors

Тому потрібно перевіряти:

    const response = await fetch("/api/users");

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

---

# Network Error

Network error може виникнути, якщо request не вдалося виконати на мережевому рівні.

Наприклад:

    server unavailable
    network connection problem
    request blocked
    DNS problem
    CORS-related failure in browser

У такому випадку Promise `fetch()` може бути rejected.

---

# try...catch

Для обробки помилок:

    async function fetchUsers() {
        try {
            const response = await fetch("/api/users");

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const users = await response.json();

            return users;
        } catch (error) {
            console.error(error);
        }
    }

---

# Повна базова модель помилок

    try
       ↓
    fetch()
       ↓
    network error?
       ↓
    catch

    response
       ↓
    response.ok?
       ↓
    false
       ↓
    throw Error
       ↓
    catch

    response.ok === true
       ↓
    response.json()
       ↓
    data

---

# React + fetch

У React `fetch()` зазвичай поєднується з:

    useState()
    useEffect()

Наприклад:

    import { useEffect, useState } from "react";

    function Users() {
        const [users, setUsers] = useState([]);

        useEffect(() => {
            async function fetchUsers() {
                const response = await fetch("/api/users");

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const data = await response.json();

                setUsers(data);
            }

            fetchUsers();
        }, []);

        return (
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name}
                    </li>
                ))}
            </ul>
        );
    }

---

# Чому fetch у useEffect?

Якщо компонент повинен завантажити дані після render, часто використовується:

    useEffect()

Наприклад:

    useEffect(() => {
        fetchUsers();
    }, []);

Порожній dependency array:

    []

означає, що effect запускається після initial mount у типовому сценарії.

У development з React Strict Mode effect може виконуватися додатково для перевірки side effects, тому не слід робити висновок, що `useEffect(..., [])` буквально гарантує рівно один виклик у будь-якому режимі.

---

# Не робити useEffect async безпосередньо

Не варто писати:

    useEffect(async () => {
        ...
    }, []);

Причина: callback `useEffect` не повинен повертати Promise.

Краще:

    useEffect(() => {
        async function fetchUsers() {
            ...
        }

        fetchUsers();
    }, []);

Або:

    useEffect(() => {
        const loadUsers = async () => {
            ...
        };

        loadUsers();
    }, []);

---

# Loading State

Data fetching займає певний час.

Тому UI часто має показувати:

    Loading...

Для цього використовується state:

    const [isLoading, setIsLoading] = useState(false);

Наприклад:

    useEffect(() => {
        async function fetchUsers() {
            setIsLoading(true);

            const response = await fetch("/api/users");

            const data = await response.json();

            setUsers(data);

            setIsLoading(false);
        }

        fetchUsers();
    }, []);

---

# Error State

Помилку також потрібно зберігати в state.

    const [error, setError] = useState(null);

Наприклад:

    useEffect(() => {
        async function fetchUsers() {
            try {
                setIsLoading(true);

                const response = await fetch("/api/users");

                if (!response.ok) {
                    throw new Error(
                        `HTTP error: ${response.status}`
                    );
                }

                const data = await response.json();

                setUsers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUsers();
    }, []);

---

# Data + Loading + Error

Типовий React pattern:

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

Можна уявляти стан так:

    data
       ↓
    успішно отримані дані

    isLoading
       ↓
    процес завантаження

    error
       ↓
    помилка

---

# UI States

При fetching UI зазвичай має декілька станів:

    Initial
       ↓
    Loading
       ↓
    Success
       ↓
    Data

або:

    Loading
       ↓
    Error

Типова модель:

    ┌─────────────┐
    │   Initial   │
    └──────┬──────┘
           ↓
    ┌─────────────┐
    │   Loading   │
    └──────┬──────┘
           │
       ┌───┴────┐
       ↓        ↓
    Success    Error
       ↓        ↓
      Data    Message

---

# finally

`finally` виконується після завершення `try/catch` незалежно від результату.

Наприклад:

    try {
        ...
    } catch (error) {
        ...
    } finally {
        setIsLoading(false);
    }

Це зручно для:

    loading → false

---

# Повний React приклад

    import { useEffect, useState } from "react";

    function Users() {
        const [users, setUsers] = useState([]);
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState(null);

        useEffect(() => {
            async function fetchUsers() {
                try {
                    setIsLoading(true);
                    setError(null);

                    const response = await fetch("/api/users");

                    if (!response.ok) {
                        throw new Error(
                            `HTTP error: ${response.status}`
                        );
                    }

                    const data = await response.json();

                    setUsers(data);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setIsLoading(false);
                }
            }

            fetchUsers();
        }, []);

        if (isLoading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p>Error: {error}</p>;
        }

        return (
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name}
                    </li>
                ))}
            </ul>
        );
    }

---

# Порядок виконання

Для такого компонента:

    useEffect()
        ↓
    setIsLoading(true)
        ↓
    fetch()
        ↓
    Response
        ↓
    response.ok
        ↓
    response.json()
        ↓
    setUsers(data)
        ↓
    setIsLoading(false)
        ↓
    React re-render
        ↓
    UI показує data

---

# Loading Before Request

Правильний порядок:

    setIsLoading(true);

    const response = await fetch(...);

    ...

    setIsLoading(false);

Не потрібно встановлювати:

    setIsLoading(false);

до завершення запиту.

---

# Reset Error

Перед новим запитом часто корисно очистити стару помилку:

    setError(null);

Наприклад:

    async function fetchUsers() {
        try {
            setError(null);
            setIsLoading(true);

            ...
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

---

# Refetch

Refetch — повторне завантаження даних.

Наприклад:

    const fetchUsers = async () => {
        ...
    };

Кнопка:

    <button onClick={fetchUsers}>
        Reload
    </button>

може повторно отримати дані.

---

# Fetch Function

Зручно винести fetching logic в окрему функцію:

    async function fetchUsers() {
        const response = await fetch("/api/users");

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        return response.json();
    }

Потім:

    const users = await fetchUsers();

---

# Separation of Concerns

Необов'язково писати весь fetch logic прямо всередині JSX-компонента.

Наприклад:

    async function fetchUsers() {
        const response = await fetch("/api/users");

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        return response.json();
    }

Компонент:

    useEffect(() => {
        async function loadUsers() {
            try {
                const users = await fetchUsers();

                setUsers(users);
            } catch (error) {
                setError(error.message);
            }
        }

        loadUsers();
    }, []);

Це робить код більш структурованим.

---

# Relative URL

У frontend часто використовують relative URL:

    fetch("/api/users");

Перевага:

    frontend.example.com
          ↓
       /api/users

не потрібно жорстко прописувати domain.

---

# Absolute URL

Можна використовувати повний URL:

    fetch("https://api.example.com/users");

Це часто використовується при роботі з:

    external API
    third-party API
    separate backend

---

# Environment Variables

URL API часто не варто жорстко прописувати в багатьох компонентах.

Наприклад:

    const API_URL = "https://api.example.com";

Або через environment variables.

У frontend framework конкретний синтаксис залежить від середовища.

Наприклад, у Next.js client-side змінні мають відповідати правилам framework.

Головна ідея:

    API_BASE_URL
          ↓
    /users
          ↓
    /posts

---

# Query Parameters

API часто приймає query parameters.

Наприклад:

    /api/users?page=2

або:

    /api/users?limit=10

Fetch:

    fetch("/api/users?page=2");

---

# URLSearchParams

Для формування query string можна використовувати:

    URLSearchParams

Наприклад:

    const params = new URLSearchParams({
        page: "2",
        limit: "10"
    });

    const response = await fetch(
        `/api/users?${params}`
    );

Результат:

    /api/users?page=2&limit=10

---

# Path Parameters

Endpoint може містити resource ID:

    /api/users/10

Наприклад:

    const userId = 10;

    const response = await fetch(
        `/api/users/${userId}`
    );

---

# Fetch One Resource

Наприклад:

    async function fetchUser(id) {
        const response = await fetch(
            `/api/users/${id}`
        );

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        return response.json();
    }

---

# Fetch Collection

Отримання списку:

    async function fetchUsers() {
        const response = await fetch("/api/users");

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        return response.json();
    }

---

# REST API

REST API зазвичай представляє дані як resources.

Наприклад:

    /users
    /users/1

    /posts
    /posts/1

    /products
    /products/1

HTTP method визначає операцію.

Наприклад:

    GET    /users
        → отримати users

    GET    /users/1
        → отримати user 1

    POST   /users
        → створити user

    PATCH  /users/1
        → оновити user 1

    DELETE /users/1
        → видалити user 1

---

# REST + React

Типова архітектура:

    React component
          ↓
    fetch()
          ↓
    REST endpoint
          ↓
    Backend
          ↓
    Database

Response:

    Database
          ↓
    Backend
          ↓
    JSON
          ↓
    fetch()
          ↓
    React state
          ↓
    UI

---

# JSON

JSON — поширений формат передачі даних.

Приклад:

    {
        "id": 1,
        "name": "John",
        "age": 25
    }

Array:

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

# JSON limitations

JSON підтримує основні типи даних:

    string
    number
    boolean
    null
    object
    array

JSON не має нативних JavaScript-типів на кшталт:

    Date
    Map
    Set
    Function
    undefined

Тому після отримання JSON потрібно враховувати реальний формат даних API.

---

# Content-Type Response

Сервер може повернути:

    Content-Type: application/json

Frontend може отримати JSON через:

    response.json()

Для іншого типу даних можуть використовуватися:

    response.text()
    response.blob()
    response.arrayBuffer()
    response.formData()

---

# response.text()

Для текстової відповіді:

    const response = await fetch("/api/message");

    const text = await response.text();

---

# response.blob()

Для binary data:

    const response = await fetch("/image.jpg");

    const blob = await response.blob();

---

# response.formData()

Для FormData response:

    const response = await fetch("/api/form");

    const formData = await response.formData();

На Core-рівні для REST API найчастіше потрібен:

    response.json()

---

# CORS

CORS — Cross-Origin Resource Sharing.

Проблема може виникнути, коли frontend і backend знаходяться на різних origins.

Наприклад:

    Frontend:
    http://localhost:3000

    Backend:
    http://localhost:5000

Це різні origins.

Browser застосовує CORS security rules.

---

# Origin

Origin складається з:

    scheme
    host
    port

Наприклад:

    http://localhost:3000

і:

    http://localhost:5000

мають різні ports, тому це різні origins.

---

# CORS responsibility

CORS зазвичай контролюється сервером.

Backend може дозволити frontend origin через відповідні HTTP headers.

Наприклад:

    Access-Control-Allow-Origin

Frontend не може просто "вимкнути CORS" через `fetch()`.

---

# Browser Security

Важливо розуміти:

    fetch()
        ↓
    Browser
        ↓
    security rules
        ↓
    CORS

CORS — це не помилка самого `fetch()`.

Це browser security mechanism.

---

# Credentials

Для cookies та credentials `fetch()` має відповідні options.

Наприклад:

    fetch("/api/profile", {
        credentials: "include"
    });

Це потрібно лише тоді, коли authentication/session architecture цього вимагає.

---

# AbortController

HTTP request можна скасувати.

Для цього використовується:

    AbortController

Наприклад:

    const controller = new AbortController();

    fetch("/api/users", {
        signal: controller.signal
    });

Скасування:

    controller.abort();

---

# AbortController + React

Це особливо корисно, коли компонент може бути unmounted до завершення request.

Наприклад:

    useEffect(() => {
        const controller = new AbortController();

        async function fetchUsers() {
            try {
                const response = await fetch("/api/users", {
                    signal: controller.signal
                });

                const data = await response.json();

                setUsers(data);
            } catch (error) {
                if (error.name === "AbortError") {
                    return;
                }

                setError(error.message);
            }
        }

        fetchUsers();

        return () => {
            controller.abort();
        };
    }, []);

Логіка:

    component mount
          ↓
    create controller
          ↓
    fetch()
          ↓
    component unmount
          ↓
    cleanup
          ↓
    controller.abort()
          ↓
    request cancelled

---

# Cleanup

`useEffect()` може повернути cleanup function:

    useEffect(() => {
        ...

        return () => {
            ...
        };
    }, []);

Для fetch cleanup може використовуватися для:

    abort request

---

# Race Conditions

Якщо компонент виконує декілька requests, responses можуть прийти не в тому порядку, в якому були відправлені.

Наприклад:

    Request A
        ↓
        ────────────────→ response A

    Request B
        ↓
        ───────→ response B

B може завершитися раніше за A.

Це може призвести до:

    stale data

AbortController та правильна структура data fetching допомагають контролювати такі ситуації.

---

# Stale Data

Stale data — застарілі дані.

Наприклад:

    request A → old query
    request B → new query

Якщо A завершиться після B і перезапише state, UI може показати старі дані.

Тому при складнішому data fetching потрібно враховувати:

    request lifecycle
    cancellation
    request identity
    stale responses

---

# Fetching з параметром

Наприклад:

    function User({ userId }) {
        const [user, setUser] = useState(null);

        useEffect(() => {
            async function fetchUser() {
                const response = await fetch(
                    `/api/users/${userId}`
                );

                const data = await response.json();

                setUser(data);
            }

            fetchUser();
        }, [userId]);

        ...
    }

Коли змінюється:

    userId

effect запускається знову.

---

# Dependency Array

Наприклад:

    useEffect(() => {
        fetchUsers();
    }, []);

Request виконується після initial render.

Якщо залежить від ID:

    useEffect(() => {
        fetchUser(userId);
    }, [userId]);

При зміні:

    userId

effect запускається знову.

---

# Fetching on User Action

Не всі requests потрібно запускати через `useEffect()`.

Наприклад, request після натискання кнопки:

    async function handleClick() {
        const response = await fetch("/api/users");

        const data = await response.json();

        setUsers(data);
    }

    return (
        <button onClick={handleClick}>
            Load users
        </button>
    );

Тут request є реакцією на user action.

---

# Fetching on Submit

Наприклад:

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name
            })
        });

        ...
    }

Тут fetch виконується в event handler.

---

# useEffect vs Event Handler

Зручно запам'ятати:

    useEffect
        ↓
    synchronization with external system
    / initial or dependency-driven fetching

    event handler
        ↓
    user action
    / click
    / submit
    / explicit reload

Не потрібно автоматично поміщати кожен `fetch()` у `useEffect()`.

---

# Fetching Function

Поширений pattern:

    async function getUsers() {
        const response = await fetch("/api/users");

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        return response.json();
    }

Компонент:

    async function loadUsers() {
        try {
            const users = await getUsers();

            setUsers(users);
        } catch (error) {
            setError(error.message);
        }
    }

---

# API Layer

У більших applications fetching logic можна винести окремо.

Наприклад:

    src/
    ├── app/
    ├── components/
    └── services/
        └── users-api.js

Файл:

    users-api.js

    export async function getUsers() {
        const response = await fetch("/api/users");

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        return response.json();
    }

Компонент:

    import { getUsers } from "./users-api";

Це зменшує кількість API logic всередині UI components.

---

# TypeScript + fetch

У TypeScript `fetch()` повертає:

    Promise<Response>

Наприклад:

    const response = await fetch("/api/users");

Після:

    const data = await response.json();

TypeScript не завжди автоматично знає точну структуру API data.

Тому часто створюють type/interface:

    type User = {
        id: number;
        name: string;
    };

---

# TypeScript API Example

    type User = {
        id: number;
        name: string;
    };

    async function fetchUsers(): Promise<User[]> {
        const response = await fetch("/api/users");

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        const data: User[] = await response.json();

        return data;
    }

Важливо:

    TypeScript type
        ≠
    runtime validation

TypeScript не перевіряє реальну відповідь сервера під час виконання.

---

# Runtime Validation

Якщо API зовнішнє або ненадійне, дані можна runtime-validating за допомогою schema validation library.

Наприклад, концептуально:

    HTTP response
          ↓
    parse JSON
          ↓
    validate shape
          ↓
    trusted application data

Це особливо важливо для production applications.

---

# fetch Wrapper

У великих applications можна створити власну функцію-обгортку:

    async function apiFetch(url, options) {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        return response.json();
    }

Тоді:

    const users = await apiFetch("/api/users");

Або:

    const user = await apiFetch("/api/users/1");

Це зменшує дублювання:

    if (!response.ok) {
        ...
    }

---

# Типовий fetch wrapper

    async function apiFetch(url, options = {}) {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        return response.json();
    }

Використання:

    const users = await apiFetch("/api/users");

---

# Але fetch wrapper не завжди потрібен

Для маленького application:

    fetch()

може бути достатньо.

Не потрібно створювати складну abstraction, якщо вона не вирішує реальну проблему.

Починати краще з:

    fetch()
        ↓
    response.ok
        ↓
    response.json()

А потім, коли з'являється дублювання, створювати abstraction.

---

# Common Fetch Pattern

    async function fetchData() {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(
                    `HTTP error: ${response.status}`
                );
            }

            const data = await response.json();

            setData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

Це один із найважливіших шаблонів для запам'ятовування.

---

# Generic Fetch Flow

    USER
      ↓
    React component
      ↓
    fetch(url)
      ↓
    HTTP Request
      ↓
    API server
      ↓
    HTTP Response
      ↓
    response.ok
      ↓
    response.json()
      ↓
    JavaScript data
      ↓
    setData()
      ↓
    React re-render
      ↓
    UI

---

# GET Flow

    React
      ↓
    fetch("/api/users")
      ↓
    GET /api/users
      ↓
    Server
      ↓
    JSON response
      ↓
    response.json()
      ↓
    users
      ↓
    setUsers(users)
      ↓
    UI

---

# POST Flow

    React
      ↓
    form submit
      ↓
    fetch()
      ↓
    POST /api/users
      ↓
    JSON body
      ↓
    Server
      ↓
    Response
      ↓
    React
      ↓
    update UI

---

# Request / Response Mental Model

Дуже важливо мислити не:

    fetch()
        ↓
    data

а:

    fetch()
        ↓
    Request
        ↓
    Server
        ↓
    Response
        ↓
    Response body
        ↓
    JSON parsing
        ↓
    JavaScript data

---

# HTTP Status Codes

Основні групи:

    1xx → informational

    2xx → success

    3xx → redirection

    4xx → client error

    5xx → server error

---

# Common Status Codes

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

На практиці найчастіше потрібно розуміти:

    2xx → success
    4xx → request/client problem
    5xx → server problem

---

# response.ok vs status

Можна:

    if (!response.ok) {
        ...
    }

Або:

    if (response.status === 404) {
        ...
    }

`response.ok` зручно використовувати для загальної перевірки успішності.

`response.status` потрібен, коли application має різну логіку для конкретних status codes.

Наприклад:

    if (response.status === 404) {
        ...
    }

---

# No Content

Не кожна успішна response має JSON body.

Наприклад:

    204 No Content

У такому випадку не можна бездумно робити:

    await response.json();

якщо body відсутній.

Тому потрібно знати API contract.

---

# API Contract

API contract описує:

    endpoint
    method
    request format
    response format
    status codes
    errors
    authentication

Наприклад:

    GET /api/users

Response:

    [
        {
            "id": 1,
            "name": "John"
        }
    ]

---

# API Error Response

Сервер може повертати structured error:

    {
        "message": "User not found",
        "code": "USER_NOT_FOUND"
    }

Frontend може прочитати:

    const errorData = await response.json();

і використати:

    errorData.message

---

# HTTP Error + JSON

Наприклад:

    const response = await fetch("/api/users/100");

    if (!response.ok) {
        const errorData = await response.json();

        throw new Error(errorData.message);
    }

    const user = await response.json();

Але конкретна структура залежить від API.

---

# Don't Assume Every Response Is JSON

Не слід автоматично припускати:

    response.json()

для абсолютно кожного endpoint.

API може повернути:

    JSON
    text
    HTML
    image
    file
    empty body

Frontend повинен знати API contract.

---

# Common Mistakes

❌ Забувати `await` перед `response.json()`.

Неправильно:

    const response = await fetch("/api/users");

    const data = response.json();

Правильно:

    const data = await response.json();

---

❌ Вважати, що `fetch()` кидає error для `404`.

Неправильне припущення:

    try {
        await fetch("/api/users");
    } catch (error) {
        // 404
    }

`404` зазвичай не викликає rejection.

Потрібно:

    if (!response.ok) {
        throw new Error(
            `HTTP error: ${response.status}`
        );
    }

---

❌ Не перевіряти `response.ok`.

    const response = await fetch("/api/users");

    const data = await response.json();

Це може приховати HTTP error.

Краще:

    if (!response.ok) {
        throw new Error(
            `HTTP error: ${response.status}`
        );
    }

---

❌ Не обробляти network errors.

    try {
        ...
    } catch (error) {
        ...
    }

---

❌ Використовувати async безпосередньо в useEffect.

Неправильно:

    useEffect(async () => {
        ...
    }, []);

Краще:

    useEffect(() => {
        async function loadData() {
            ...
        }

        loadData();
    }, []);

---

❌ Не обробляти loading state.

Користувач може не розуміти, що request ще виконується.

---

❌ Не обробляти error state.

При помилці UI може залишитися у незрозумілому стані.

---

❌ Не скасовувати непотрібні requests.

У складних компонентах це може призвести до race conditions.

Для таких випадків може використовуватися:

    AbortController

---

❌ Дублювати однаковий fetch logic у багатьох компонентах.

Якщо код повторюється:

    fetch()
    response.ok
    response.json()
    error handling

можна розглянути API/service layer або custom hook.

---

# Fetch vs Axios

Для простих HTTP-запитів:

    fetch()

часто достатньо.

`fetch()`:

    browser built-in
    Promise-based
    не потребує додаткової dependency

Axios — окрема HTTP library з додатковими можливостями та власним API.

На Core-рівні React важливо добре знати:

    fetch()

перед тим як переходити до додаткових HTTP libraries.

---

# Fetch — Browser API

`fetch()` не є функцією React.

Це:

    Web API

React лише використовує її для отримання даних.

Тобто:

    React
       +
    fetch()

а не:

    React fetch API

---

# React не робить HTTP Requests автоматично

React відповідає переважно за:

    UI
    components
    state
    rendering

`fetch()` відповідає за:

    HTTP communication

Тому:

    React → UI
    fetch → HTTP

---

# Fetching and State

Основна модель:

    server data
         ↓
       fetch
         ↓
    JavaScript data
         ↓
      React state
         ↓
       render

Наприклад:

    const [users, setUsers] = useState([]);

    ...

    const data = await response.json();

    setUsers(data);

---

# Server State vs UI State

Важливо розрізняти:

    UI state
        ↓
    modal open
    selected tab
    input value

та:

    server state
        ↓
    users
    products
    posts
    profile

Data fetching працює переважно із:

    server state

Пізніше для server state можуть використовуватися спеціалізовані libraries.

---

# React Strict Mode

У development mode React Strict Mode може допомагати знаходити проблеми з effects, зокрема виконуючи effect setup додатково.

Тому під час розробки можна побачити більше одного запиту, якщо data fetching написаний без урахування цього.

Не потрібно робити висновок:

    useEffect(..., [])
        =
    HTTP request завжди рівно один раз

Правильніше думати:

    effect lifecycle
        +
    development checks
        +
    production behavior

---

# DevTools

Для debugging fetch-запитів дуже корисний:

    Browser DevTools
        ↓
    Network

Там можна побачити:

    Request URL
    Request Method
    Status Code
    Request Headers
    Request Payload
    Response Headers
    Response Body
    Timing

---

# Network Tab

Приклад:

    Network
       ↓
    users
       ↓
    GET
       ↓
    Status 200
       ↓
    Response
       ↓
    JSON

Якщо fetch не працює, Network tab — одне з перших місць, яке потрібно перевірити.

---

# Debugging Checklist

Якщо fetch не працює:

    1. Чи правильний URL?
    2. Чи правильний HTTP method?
    3. Чи працює backend?
    4. Який status code?
    5. Чи є CORS problem?
    6. Які request headers?
    7. Який response body?
    8. Чи викликається response.json()?
    9. Чи перевіряється response.ok?
    10. Чи правильно оновлюється React state?

---

# Practical Example — Users

    import { useEffect, useState } from "react";

    type User = {
        id: number;
        name: string;
    };

    export default function Users() {
        const [users, setUsers] = useState<User[]>([]);
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
            const controller = new AbortController();

            async function loadUsers() {
                try {
                    setIsLoading(true);
                    setError(null);

                    const response = await fetch(
                        "/api/users",
                        {
                            signal: controller.signal
                        }
                    );

                    if (!response.ok) {
                        throw new Error(
                            `HTTP error: ${response.status}`
                        );
                    }

                    const data: User[] =
                        await response.json();

                    setUsers(data);
                } catch (error) {
                    if (
                        error instanceof DOMException &&
                        error.name === "AbortError"
                    ) {
                        return;
                    }

                    if (error instanceof Error) {
                        setError(error.message);
                    } else {
                        setError("Unknown error");
                    }
                } finally {
                    setIsLoading(false);
                }
            }

            loadUsers();

            return () => {
                controller.abort();
            };
        }, []);

        if (isLoading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p>Error: {error}</p>;
        }

        return (
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name}
                    </li>
                ))}
            </ul>
        );
    }

---

# Practical Example — Load on Button Click

    import { useState } from "react";

    function Users() {
        const [users, setUsers] = useState([]);
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState(null);

        async function handleLoad() {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch("/api/users");

                if (!response.ok) {
                    throw new Error(
                        `HTTP error: ${response.status}`
                    );
                }

                const data = await response.json();

                setUsers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        return (
            <div>
                <button
                    onClick={handleLoad}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Load users"}
                </button>

                {error && <p>{error}</p>}

                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.name}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

---

# Practical Example — Query Parameters

    async function searchUsers(query) {
        const params = new URLSearchParams({
            q: query
        });

        const response = await fetch(
            `/api/users?${params}`
        );

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        return response.json();
    }

Виклик:

    const users = await searchUsers("John");

Request:

    /api/users?q=John

---

# Practical Example — Fetch One User

    async function fetchUser(id) {
        const response = await fetch(
            `/api/users/${id}`
        );

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        return response.json();
    }

Виклик:

    const user = await fetchUser(10);

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

Виклик:

    const user = await createUser({
        name: "John"
    });

---

# Practical Example — Generic API Function

    async function apiFetch(url, options = {}) {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        return response.json();
    }

GET:

    const users = await apiFetch("/api/users");

POST:

    const user = await apiFetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "John"
        })
    });

---

# Практична модель React Data Fetching

    Component
        ↓
    useEffect / event handler
        ↓
    fetch()
        ↓
    HTTP request
        ↓
    API
        ↓
    response
        ↓
    response.ok
        ↓
    response.json()
        ↓
    data
        ↓
    setState()
        ↓
    re-render
        ↓
    UI

---

# Типова структура проекту

Для невеликого проекту:

    src/
    ├── app/
    ├── components/
    └── ...

Для більшого:

    src/
    ├── app/
    ├── components/
    ├── services/
    │   └── users-api.ts
    ├── hooks/
    │   └── use-users.ts
    └── types/
        └── user.ts

Це лише один із можливих варіантів.

Архітектура залежить від розміру та вимог application.

---

# Зв'язок з наступними розділами

Цей розділ:

    01-fetch

дає фундамент для наступних тем.

Після нього:

    02-loading-and-error
        ↓
    loading / error states

    03-get
        ↓
    GET requests

    04-post
        ↓
    POST requests

    05-put-and-patch
        ↓
    update requests

    06-delete
        ↓
    DELETE requests

    07-async-data
        ↓
    asynchronous data patterns

    08-custom-data-fetching-hooks
        ↓
    reusable fetching logic

---

# Питання зі співбесіди

Що таке `fetch()`?

Що повертає `fetch()`?

Що таке `Promise`?

Що таке `Response`?

Як отримати JSON з response?

Чим відрізняється:

    response

від:

    response.json()

Що робить `response.ok`?

Що містить `response.status`?

Чи кидає `fetch()` error при HTTP `404`?

Як обробляти HTTP errors?

Як обробляти network errors?

Що таке `try...catch`?

Навіщо використовувати `async/await`?

Що таке HTTP request?

Що таке HTTP response?

Що таке endpoint?

Що таке REST API?

Що таке JSON?

Що таке `Content-Type`?

Навіщо потрібен:

    "Content-Type": "application/json"

Що робить `JSON.stringify()`?

Що робить `response.json()`?

Що таке request body?

Які основні HTTP methods?

Що робить GET?

Що робить POST?

Що робить PUT?

Що робить PATCH?

Що робить DELETE?

Що таке CORS?

Чому CORS виникає у browser?

Де налаштовується CORS?

Чому fetch часто використовується разом із `useEffect()`?

Чому не рекомендується робити `useEffect(async () => {})`?

Як реалізувати loading state?

Як реалізувати error state?

Навіщо потрібен `finally`?

Що таке refetch?

Що таке `AbortController`?

Навіщо потрібен `signal`?

Як скасувати fetch request?

Що таке race condition?

Що таке stale data?

Чим data fetching через event handler відрізняється від fetching через effect?

Як працює fetch у React?

Як отримати один ресурс?

Як отримати список ресурсів?

Як передати query parameters?

Як передати path parameter?

Як передати JSON body?

Як перевірити HTTP status?

Як організувати API layer?

Коли варто створювати fetch wrapper?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке data fetching.

Що таке API.

Що таке REST API.

Що таке endpoint.

Що таке HTTP request.

Що таке HTTP response.

`fetch()`.

Promise.

`async/await`.

`Response`.

`response.ok`.

`response.status`.

`response.json()`.

GET.

POST — на базовому рівні.

HTTP status codes.

JSON.

`JSON.stringify()`.

Request headers.

`Content-Type`.

Request body.

`try...catch`.

Network error.

HTTP error.

`useEffect()` + fetch.

Loading state.

Error state.

Data state.

---

🔵 Junior

Впевнене використання:

    fetch()
    async/await
    response.ok
    response.status
    response.json()

Розуміння:

    GET
    POST
    PUT
    PATCH
    DELETE

Розуміння:

    request
    response
    headers
    body
    JSON

Вміння:

    отримувати collection
    отримувати single resource
    використовувати path parameters
    використовувати query parameters
    передавати JSON body
    обробляти HTTP errors
    обробляти network errors
    реалізовувати loading state
    реалізовувати error state

Розуміння:

    CORS
    AbortController
    cleanup
    refetch
    stale data
    race conditions

---

🟠 Middle

Розуміння:

    API layer
    service layer
    fetch wrappers
    reusable fetching logic
    custom hooks

Розуміння:

    request cancellation
    race conditions
    stale responses
    caching
    refetching
    pagination
    filtering
    sorting
    optimistic updates

Розуміння server state.

Вибір між:

    plain fetch
    custom hooks
    data-fetching libraries

Розуміння:

    authentication
    credentials
    cookies
    tokens
    CORS

TypeScript API types.

Runtime validation.

Error normalization.

Centralized API client.

---

🔴 Senior

Глибоке розуміння:

    HTTP
    REST
    browser networking
    caching
    HTTP cache
    conditional requests
    ETag
    Cache-Control
    stale data
    request deduplication
    request cancellation
    race conditions

Архітектура:

    API clients
    service layers
    repository patterns
    server state management
    cache invalidation

Розуміння:

    retries
    exponential backoff
    rate limiting
    pagination strategies
    cursor pagination
    optimistic updates
    pessimistic updates
    synchronization
    offline support
    request deduplication

Безпечна робота з:

    authentication
    authorization
    cookies
    CSRF
    CORS
    tokens

Performance:

    caching
    prefetching
    parallel requests
    sequential requests
    waterfalls
    request batching

---

# Міні-шпаргалка

## fetch

    const response = await fetch("/api/users");

`fetch()`:

    → Promise<Response>

---

## JSON

    const response = await fetch("/api/users");

    const data = await response.json();

    response
        ↓
    response.json()
        ↓
    JavaScript data

---

## HTTP status

    if (!response.ok) {
        throw new Error(
            `HTTP error: ${response.status}`
        );
    }

---

## GET

    const response = await fetch("/api/users");

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

## Query parameters

    const params = new URLSearchParams({
        page: "2",
        limit: "10"
    });

    fetch(`/api/users?${params}`);

---

## Path parameter

    const id = 10;

    fetch(`/api/users/${id}`);

---

## React

    useEffect(() => {
        async function loadData() {
            const response = await fetch("/api/users");

            if (!response.ok) {
                throw new Error(
                    `HTTP error: ${response.status}`
                );
            }

            const data = await response.json();

            setData(data);
        }

        loadData();
    }, []);

---

## Loading

    const [isLoading, setIsLoading] = useState(false);

---

## Error

    const [error, setError] = useState(null);

---

## Data

    const [data, setData] = useState([]);

---

## Full pattern

    try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/users");

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        const data = await response.json();

        setData(data);
    } catch (error) {
        setError(error.message);
    } finally {
        setIsLoading(false);
    }

---

## AbortController

    const controller = new AbortController();

    fetch("/api/users", {
        signal: controller.signal
    });

    controller.abort();

---

## Основні HTTP methods

    GET
        → read

    POST
        → create

    PUT
        → replace/update

    PATCH
        → partial update

    DELETE
        → delete

---

## HTTP status groups

    2xx → success
    3xx → redirect
    4xx → client error
    5xx → server error

---

## Найважливіші Response properties

    response.ok
    response.status
    response.headers
    response.url

---

## Response body methods

    response.json()
    response.text()
    response.blob()
    response.formData()
    response.arrayBuffer()

Для REST API найчастіше:

    response.json()

---

# Головне:

• `fetch()` — Web API для виконання HTTP-запитів.

• `fetch()` повертає:

    Promise<Response>

• `Response` — об'єкт HTTP-відповіді.

• Щоб отримати JSON:

    const data = await response.json();

• `response.json()` також асинхронний і повертає Promise.

• `response.ok` показує, чи response має успішний HTTP status.

• `response.status` містить конкретний HTTP status code.

• `fetch()` не відхиляє Promise лише через HTTP `404`, `500` тощо.

• HTTP errors потрібно перевіряти через:

    if (!response.ok) {
        ...
    }

• Network errors обробляються через:

    try...catch

• Типовий fetch flow:

    fetch()
        ↓
    Response
        ↓
    response.ok
        ↓
    response.json()
        ↓
    data

• У React отримані дані часто зберігаються в:

    useState()

• Для data fetching, який повинен синхронізуватися з lifecycle/dependencies компонента, часто використовується:

    useEffect()

• Не слід писати:

    useEffect(async () => {
        ...
    }, []);

• Краще створити внутрішню async function:

    useEffect(() => {
        async function loadData() {
            ...
        }

        loadData();
    }, []);

• Типовий React data state:

    data
    isLoading
    error

• Типовий UI має стани:

    loading
    success
    error

• `finally` зручно використовувати для:

    setIsLoading(false)

• `GET` використовується для отримання даних.

• `POST` використовується для створення/відправлення даних.

• `PUT` — повне оновлення/заміна ресурсу.

• `PATCH` — часткове оновлення.

• `DELETE` — видалення.

• JSON body передається через:

    body: JSON.stringify(data)

• Для JSON request зазвичай використовується:

    "Content-Type": "application/json"

• Query parameters можна створювати через:

    URLSearchParams

• Path parameters часто будуються через template literals:

    `/api/users/${id}`

• `fetch()` не є частиною React.

    React → UI
    fetch → HTTP

• REST API представляє дані як resources:

    /users
    /users/1
    /posts
    /posts/1

• Browser застосовує CORS security rules для cross-origin requests.

• CORS зазвичай налаштовується на сервері.

• `AbortController` дозволяє скасувати fetch request.

• Для React cleanup можна використовувати:

    return () => {
        controller.abort();
    };

• При декількох requests потрібно враховувати:

    race conditions
    stale data
    request cancellation

• Для debugging fetch найважливіший інструмент:

    Browser DevTools
        ↓
    Network

• Потрібно вміти бачити:

    Request URL
    Request Method
    Status Code
    Request Headers
    Request Body
    Response Headers
    Response Body

• Базовий mental model:

    React component
          ↓
       fetch()
          ↓
    HTTP request
          ↓
       REST API
          ↓
    HTTP response
          ↓
    response.ok
          ↓
    response.json()
          ↓
        data
          ↓
      setState()
          ↓
      re-render
          ↓
         UI

• Найважливіший шаблон:

    try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        const data = await response.json();

        setData(data);
    } catch (error) {
        setError(error.message);
    } finally {
        setIsLoading(false);
    }

• Починай вивчення data fetching з простого:

    fetch()
        ↓
    response
        ↓
    response.ok
        ↓
    response.json()
        ↓
    setState()

а потім переходь до:

    loading
    error
    GET
    POST
    PUT
    PATCH
    DELETE
    async data
    custom hooks

• Головна ідея всього розділу:

    Server
       ↓
    HTTP
       ↓
    fetch()
       ↓
    JavaScript data
       ↓
    React state
       ↓
    UI