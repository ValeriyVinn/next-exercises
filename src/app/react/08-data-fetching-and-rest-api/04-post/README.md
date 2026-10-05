# POST-запити в React

> `POST` — HTTP-метод для надсилання даних на сервер, найчастіше для створення нового ресурсу або виконання серверної операції.
>
> У React `POST` використовується, коли користувач взаємодіє з формою, кнопкою або іншою UI-дією, яка повинна передати дані на backend.

---

# 1. Що таке POST-запит

`POST` — це HTTP-метод, який використовується для **надсилання даних на сервер**.

Типовий full-stack потік:

    React form
        ↓
    user enters data
        ↓
    submit
        ↓
    fetch()
        ↓
    POST /api/users
        ↓
    Backend
        ↓
    Database
        ↓
    response
        ↓
    React
        ↓
    UI update

Наприклад:

    POST /api/users

може отримати:

    {
        "name": "Anna",
        "email": "anna@example.com"
    }

Backend може створити нового користувача в database.

---

# 2. POST найчастіше використовується для

POST використовується, коли потрібно:

- створити користувача;
- створити пост;
- створити курс;
- створити замовлення;
- відправити форму;
- зареєструвати користувача;
- виконати login;
- відправити коментар;
- створити запис у database;
- передати дані на сервер.

Наприклад:

    POST /api/users

    POST /api/posts

    POST /api/courses

    POST /api/orders

---

# 3. GET vs POST

Одна з найважливіших відмінностей:

    GET
      ↓
    отримати дані

    POST
      ↓
    відправити дані

Наприклад:

    GET /api/users

отримує користувачів.

А:

    POST /api/users

створює нового користувача.

---

# 4. POST і request body

На відміну від простого GET, POST часто передає дані через:

    request body

Наприклад:

    {
        "name": "Anna",
        "email": "anna@example.com"
    }

У `fetch()`:

    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: "Anna",
            email: "anna@example.com",
        }),
    });

---

# 5. Основні частини POST-запиту

Подивимося на:

    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: "Anna",
            email: "anna@example.com",
        }),
    });

Тут:

    "/api/users"

— URL.

    method: "POST"

— HTTP-метод.

    headers

— HTTP-заголовки.

    Content-Type: application/json

— повідомляє серверу, що body містить JSON.

    body

— дані, які відправляються.

    JSON.stringify(...)

— перетворює JavaScript object у JSON string.

---

# 6. Чому потрібен JSON.stringify()

JavaScript object:

    const user = {
        name: "Anna",
        email: "anna@example.com",
    };

не можна просто передати як JSON body.

Потрібно:

    JSON.stringify(user);

Результат:

    '{"name":"Anna","email":"anna@example.com"}'

Тому:

    body: JSON.stringify(user)

---

# 7. Content-Type

Якщо відправляємо JSON:

    headers: {
        "Content-Type": "application/json",
    }

це означає:

> body HTTP-запиту містить JSON.

Backend може використовувати цей заголовок, щоб правильно прочитати request body.

---

# 8. Простий POST

Мінімальний приклад:

    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: "Anna",
            email: "anna@example.com",
        }),
    });

Після цього потрібно перевірити response:

    if (!response.ok) {
        throw new Error("Не вдалося створити користувача.");
    }

---

# 9. POST + response.json()

Backend часто повертає створений ресурс.

Наприклад:

    {
        "id": 15,
        "name": "Anna",
        "email": "anna@example.com"
    }

Тоді:

    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: "Anna",
            email: "anna@example.com",
        }),
    });

    if (!response.ok) {
        throw new Error("Не вдалося створити користувача.");
    }

    const createdUser: User = await response.json();

Тепер:

    createdUser.id

може містити:

    15

---

# 10. Типовий POST flow

Повний потік:

    user fills form
          ↓
    submit
          ↓
    preventDefault()
          ↓
    validate data
          ↓
    setLoading(true)
          ↓
    fetch()
          ↓
    POST request
          ↓
    Backend
          ↓
    Database
          ↓
    HTTP response
          ↓
    response.ok ?
       ↙       ↘
     yes        no
      ↓          ↓
    JSON       error
      ↓          ↓
    success    catch
      ↓          ↓
      └────┬─────┘
           ↓
    setLoading(false)
           ↓
          UI

---

# 11. POST зазвичай запускається подією

На відміну від GET, який часто виконується під час завантаження компонента, POST найчастіше запускається через user action.

Наприклад:

    onSubmit

або:

    onClick

Типовий сценарій:

    <form onSubmit={handleSubmit}>

        ...

    </form>

Після submit:

    handleSubmit()

виконує POST.

---

# 12. POST + React form

Приклад:

    import { FormEvent, useState } from "react";

    type User = {
        id: number;
        name: string;
        email: string;
    };

    export default function CreateUser() {
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");

        const handleSubmit = async (
            event: FormEvent<HTMLFormElement>
        ) => {
            event.preventDefault();

            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                }),
            });

            if (!response.ok) {
                throw new Error(
                    "Не вдалося створити користувача."
                );
            }

            const user: User = await response.json();

            console.log(user);
        };

        return (
            <form onSubmit={handleSubmit}>
                <input
                    value={name}
                    onChange={event =>
                        setName(event.target.value)
                    }
                />

                <input
                    value={email}
                    onChange={event =>
                        setEmail(event.target.value)
                    }
                />

                <button type="submit">
                    Створити
                </button>
            </form>
        );
    }

---

# 13. Навіщо event.preventDefault()

За замовчуванням HTML form при submit може перезавантажити сторінку.

У React SPA зазвичай потрібно:

    event.preventDefault();

Це означає:

> не виконувати стандартну поведінку браузера, а обробити submit через React.

Тому:

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        // POST
    };

---

# 14. POST + controlled components

Типовий React form:

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

Input:

    <input
        value={name}
        onChange={event =>
            setName(event.target.value)
        }
    />

Тепер React знає поточні значення форми.

Під час submit:

    body: JSON.stringify({
        name,
        email,
    })

---

# 15. POST + loading

POST також має асинхронний стан.

Наприклад:

    const [loading, setLoading] = useState(false);

Під час submit:

    setLoading(true);

Після завершення:

    setLoading(false);

Повний шаблон:

    try {
        setLoading(true);

        // POST
    } finally {
        setLoading(false);
    }

---

# 16. Чому POST loading починається з false

Для GET часто:

    const [loading, setLoading] = useState(true);

тому що GET автоматично запускається під час завантаження сторінки.

Для POST:

    const [loading, setLoading] = useState(false);

тому що POST ще не виконується.

Він почнеться після:

    submit

Отже:

    initial:
    loading = false

    submit:
    loading = true

    response:
    loading = false

---

# 17. POST + error

Створимо:

    const [error, setError] = useState<string | null>(null);

На початку submit:

    setError(null);

Потім:

    try {
        // POST
    } catch (error) {
        setError(
            error instanceof Error
                ? error.message
                : "Сталася невідома помилка."
        );
    }

---

# 18. Повний POST із loading та error

    import {
        FormEvent,
        useState,
    } from "react";

    type User = {
        id: number;
        name: string;
        email: string;
    };

    export default function CreateUser() {
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");

        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const [success, setSuccess] = useState(false);

        const handleSubmit = async (
            event: FormEvent<HTMLFormElement>
        ) => {
            event.preventDefault();

            try {
                setLoading(true);
                setError(null);
                setSuccess(false);

                const response = await fetch("/api/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                    }),
                });

                if (!response.ok) {
                    throw new Error(
                        "Не вдалося створити користувача."
                    );
                }

                const user: User = await response.json();

                console.log(user);

                setSuccess(true);
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : "Сталася невідома помилка."
                );
            } finally {
                setLoading(false);
            }
        };

        return (
            <form onSubmit={handleSubmit}>
                <input
                    value={name}
                    onChange={event =>
                        setName(event.target.value)
                    }
                    placeholder="Ім'я"
                />

                <input
                    value={email}
                    onChange={event =>
                        setEmail(event.target.value)
                    }
                    placeholder="Email"
                    type="email"
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Створення..."
                        : "Створити користувача"}
                </button>

                {error && (
                    <p role="alert">
                        {error}
                    </p>
                )}

                {success && (
                    <p>
                        Користувача успішно створено.
                    </p>
                )}
            </form>
        );
    }

Це базовий реальний шаблон для POST через React form.

---

# 19. POST + success state

POST має не тільки:

    loading
    error

а й:

    success

Наприклад:

    const [success, setSuccess] = useState(false);

Перед новою спробою:

    setSuccess(false);

Після успіху:

    setSuccess(true);

UI:

    {success && (
        <p>
            Дані успішно збережено.
        </p>
    )}

---

# 20. Стан POST

Для простої форми:

    idle
      ↓
    submitting
      ↓
    success

або:

    idle
      ↓
    submitting
      ↓
    error

Після помилки:

    error
      ↓
    submitting
      ↓
    success

Це можна розглядати як state machine.

---

# 21. POST: idle

Початковий стан:

    loading = false
    error = null
    success = false

Користувач бачить форму:

    [ Name        ]
    [ Email       ]

    [ Створити ]

---

# 22. POST: submitting

Після натискання:

    loading = true

UI:

    [ Name        ]
    [ Email       ]

    [ Створення... ]

Кнопка може бути:

    disabled

щоб не дозволити повторний submit.

---

# 23. POST: success

Якщо backend відповів успішно:

    loading = false
    success = true
    error = null

UI:

    Користувача успішно створено.

---

# 24. POST: error

Якщо запит завершився помилкою:

    loading = false
    success = false
    error = "..."

UI:

    Не вдалося створити користувача.

    [ Повторити ]

---

# 25. Чому потрібно disabled під час POST

Без:

    disabled={loading}

користувач може швидко натиснути:

    Створити
    Створити
    Створити

і відправити:

    POST
    POST
    POST

Це може створити три ресурси.

Тому:

    <button
        type="submit"
        disabled={loading}
    >
        {loading
            ? "Створення..."
            : "Створити"}
    </button>

є хорошим базовим захистом на UI-рівні.

Але важливо:

> `disabled` у React не є захистом від дублювання на рівні backend.

Backend також повинен бути спроєктований безпечно.

---

# 26. POST і duplicate requests

Проблема:

    user click
       ↓
    POST A

    user click
       ↓
    POST B

Якщо обидва запити успішні:

    resource A
    resource B

можуть бути створені.

Для деяких операцій це нормально.

Для інших — проблема.

На рівні системи можуть використовуватися:

- disabled button;
- server-side validation;
- idempotency keys;
- unique constraints;
- transaction;
- business rules.

---

# 27. POST і validation

Перед відправленням потрібно перевірити дані.

Наприклад:

    if (name.trim() === "") {
        setError("Введіть ім'я.");
        return;
    }

    if (email.trim() === "") {
        setError("Введіть email.");
        return;
    }

Тільки після цього:

    POST

---

# 28. Client-side validation

Приклад:

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!name.trim()) {
            setError("Ім'я є обов'язковим.");
            return;
        }

        if (!email.trim()) {
            setError("Email є обов'язковим.");
            return;
        }

        // POST
    };

Client-side validation потрібна для UX.

Але вона **не замінює backend validation**.

---

# 29. Backend validation

Навіть якщо React перевірив:

    name !== ""

backend все одно повинен перевірити дані.

Користувач може відправити запит не через твій React UI.

Тому:

    React validation
          ↓
    UX

а:

    Backend validation
          ↓
    security + data integrity

---

# 30. Типовий POST validation flow

    user input
        ↓
    client validation
        ↓
    valid?
      ↙   ↘
    no     yes
     ↓      ↓
    error   POST
             ↓
         backend validation
             ↓
          valid?
          ↙   ↘
        no     yes
         ↓      ↓
       4xx    database
                ↓
             success

---

# 31. HTTP status 201 Created

Для створення ресурсу backend часто повертає:

    201 Created

Наприклад:

    HTTP/1.1 201 Created

React:

    if (!response.ok) {
        throw new Error("Request failed");
    }

`response.ok` буде `true`.

Можна також перевірити конкретний status:

    if (response.status !== 201) {
        throw new Error("Resource was not created.");
    }

Але в багатьох випадках достатньо:

    response.ok

якщо API контракт це дозволяє.

---

# 32. Інші POST status codes

Можливі:

    201 Created
    200 OK
    202 Accepted

Помилки:

    400 Bad Request
    401 Unauthorized
    403 Forbidden
    409 Conflict
    422 Unprocessable Content
    500 Internal Server Error

Точний набір залежить від API.

---

# 33. POST і server validation errors

Backend може повернути:

    400

і JSON:

    {
        "message": "Email already exists"
    }

Тоді frontend може прочитати помилку:

    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();

        throw new Error(
            errorData.message ?? "Request failed."
        );
    }

---

# 34. Але response body помилки не завжди JSON

Не можна автоматично припускати:

    await response.json();

для будь-якої помилки.

Backend може повернути:

    JSON
    text
    empty body
    HTML
    інший формат

Тому robust API client може окремо перевіряти:

    Content-Type

Але для навчального REST API найчастіше достатньо очікувати JSON.

---

# 35. POST + server error message

Приклад:

    try {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
            }),
        });

        if (!response.ok) {
            const errorData: {
                message?: string;
            } = await response.json();

            throw new Error(
                errorData.message ??
                "Не вдалося створити користувача."
            );
        }

        const user: User = await response.json();

        setSuccess(true);
    } catch (error) {
        setError(
            error instanceof Error
                ? error.message
                : "Невідома помилка."
        );
    }

---

# 36. POST і response data

Backend може повернути створений об'єкт:

    {
        "id": 25,
        "name": "Anna",
        "email": "anna@example.com"
    }

Frontend:

    const createdUser: User =
        await response.json();

Тепер можна:

    setUser(createdUser);

або:

    console.log(createdUser.id);

---

# 37. POST і очищення форми

Після успішного створення можна очистити форму:

    setName("");
    setEmail("");

Наприклад:

    const user: User = await response.json();

    setName("");
    setEmail("");
    setSuccess(true);

Це залежить від UX.

---

# 38. POST і redirect

Після створення ресурсу іноді потрібно перейти на іншу сторінку.

Наприклад:

    POST /api/courses
          ↓
    201 Created
          ↓
    /courses/15

Логіка:

    const course: Course =
        await response.json();

    // navigate to course page

У React Router для цього можна використовувати navigation API.

У Next.js — відповідні routing tools.

---

# 39. POST і додавання нового елемента в state

Уявімо, що маємо:

    const [users, setUsers] = useState<User[]>([]);

POST повернув:

    const createdUser: User =
        await response.json();

Можна додати його:

    setUsers(currentUsers => [
        ...currentUsers,
        createdUser,
    ]);

Тоді UI оновиться без нового GET.

Потік:

    POST
      ↓
    createdUser
      ↓
    setUsers()
      ↓
    UI

---

# 40. POST + повторний GET

Інший підхід:

    POST
      ↓
    success
      ↓
    GET /api/users
      ↓
    fresh list
      ↓
    UI

Це іноді простіше.

Але це означає додатковий HTTP-запит.

---

# 41. POST: update local state vs refetch

Є два підходи.

### Варіант A — додати результат POST

    POST
      ↓
    createdUser
      ↓
    setUsers()

Перевага:

    один POST

### Варіант B — повторити GET

    POST
      ↓
    GET
      ↓
    fresh data

Перевага:

> frontend отримує актуальний список із server.

Недолік:

> додатковий network request.

Який варіант кращий — залежить від API та архітектури.

---

# 42. POST і FormData

Не всі POST-запити передають JSON.

Для файлів часто використовується:

    FormData

Наприклад:

    const formData = new FormData();

    formData.append("name", name);
    formData.append("file", file);

    const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
    });

У цьому випадку **не потрібно вручну встановлювати**:

    Content-Type: multipart/form-data

Браузер сам сформує необхідний `Content-Type` разом із boundary.

---

# 43. JSON vs FormData

### JSON

Для звичайних даних:

    {
        "name": "Anna",
        "email": "anna@example.com"
    }

використовуємо:

    Content-Type: application/json

і:

    JSON.stringify()

### FormData

Для:

- files;
- images;
- multipart form data.

Використовуємо:

    new FormData()

---

# 44. POST із JSON — основний варіант

Для цього розділу головним залишається:

    fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

Саме цей шаблон потрібно вміти писати без підказки.

---

# 45. POST і credentials

Якщо authentication використовує cookies:

    const response = await fetch("/api/users", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

Але `credentials` потрібно використовувати відповідно до архітектури authentication.

---

# 46. POST + Authorization header

Якщо API використовує Bearer token:

    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

Це вже частина authentication/authorization.

---

# 47. POST не слід запускати в useEffect без причини

Для GET:

    useEffect(() => {
        fetch(...)
    }, []);

це нормальний сценарій.

Для POST:

    useEffect(() => {
        fetch(... {
            method: "POST"
        });
    }, []);

може бути небезпечним, тому що POST змінює серверний стан.

POST зазвичай повинен запускатися явно:

    onSubmit
    onClick
    інша user action

---

# 48. Чому POST відрізняється від GET у React

GET:

    component mount
        ↓
    useEffect
        ↓
    fetch GET

POST:

    user action
        ↓
    handler
        ↓
    fetch POST

Тому:

    GET → часто useEffect

    POST → часто event handler

Це дуже важлива практична відмінність.

---

# 49. POST handler

Типовий шаблон:

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            setLoading(true);
            setError(null);

            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                }),
            });

            if (!response.ok) {
                throw new Error(
                    "Не вдалося створити користувача."
                );
            }

            const user: User =
                await response.json();

            // success
        } catch (error) {
            // error
        } finally {
            setLoading(false);
        }
    };

---

# 50. POST і async/await

POST дуже добре читається через:

    async/await

Замість:

    fetch("/api/users", {
        method: "POST",
        ...
    })
        .then(...)
        .catch(...)
        .finally(...);

можна:

    try {
        const response = await fetch(...);

        if (!response.ok) {
            throw new Error(...);
        }

        const data = await response.json();
    } catch (error) {
        ...
    } finally {
        ...
    }

Для навчання та більшості компонентів такий стиль простіше читати.

---

# 51. Не забувай await

❌

    const response = fetch("/api/users", {
        method: "POST",
        ...
    });

Тут `response` — Promise.

✔

    const response = await fetch("/api/users", {
        method: "POST",
        ...
    });

Тепер:

    response

— це `Response`.

---

# 52. Не забувай await response.json()

❌

    const user = response.json();

✔

    const user = await response.json();

`response.json()` теж асинхронний.

---

# 53. POST і reset помилки

Уявімо:

    POST
      ↓
    error

Користувач виправив форму і натиснув submit.

Перед новим запитом:

    setError(null);

Інакше стара помилка може залишитися на екрані під час нової спроби.

---

# 54. POST і reset success

Аналогічно:

    POST
      ↓
    success

Потім користувач змінює дані та знову натискає submit.

На початку:

    setSuccess(false);

Після нового успішного POST:

    setSuccess(true);

---

# 55. POST state

Базовий state:

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

Перед submit:

    setError(null);
    setSuccess(false);
    setLoading(true);

Success:

    setSuccess(true);

Error:

    setError(...);

Finally:

    setLoading(false);

---

# 56. POST і state machine

Можна мислити:

    idle
      ↓
    submitting
      ↓
    success

або:

    idle
      ↓
    submitting
      ↓
    error

Після помилки:

    error
      ↓
    submitting
      ↓
    success

Це допомагає не плутати:

    idle
    loading
    success
    error

---

# 57. Async state для POST

Можна описати:

    type SubmitState =
        | "idle"
        | "submitting"
        | "success"
        | "error";

    const [status, setStatus] =
        useState<SubmitState>("idle");

Під час submit:

    setStatus("submitting");

Після успіху:

    setStatus("success");

Після помилки:

    setStatus("error");

Для складніших форм такий підхід може бути чистішим.

---

# 58. POST + server response type

Наприклад:

    type CreateUserResponse = {
        id: number;
        name: string;
        email: string;
        createdAt: string;
    };

Тоді:

    const data: CreateUserResponse =
        await response.json();

Це дозволяє TypeScript перевіряти використання даних.

---

# 59. Важливе зауваження про TypeScript

Тип:

    const data: User =
        await response.json();

не перевіряє runtime, що backend дійсно повернув правильний JSON.

TypeScript існує під час розробки.

Якщо API може повертати непередбачені дані, у production застосовують runtime validation libraries або власну перевірку.

Наприклад, концептуально:

    HTTP response
          ↓
    runtime validation
          ↓
    typed data
          ↓
    React state

На базовому рівні достатньо розуміти різницю між:

    TypeScript type

і:

    runtime validation.

---

# 60. POST + reusable API function

Якщо запит повторюється, його можна винести:

    type CreateUserInput = {
        name: string;
        email: string;
    };

    const createUser = async (
        data: CreateUserInput
    ): Promise<User> => {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(
                "Не вдалося створити користувача."
            );
        }

        return response.json();
    };

Тепер компонент:

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            setLoading(true);
            setError(null);

            const user = await createUser({
                name,
                email,
            });

            console.log(user);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Невідома помилка."
            );
        } finally {
            setLoading(false);
        }
    };

Це вже крок до поділу:

    UI
      ↓
    API function
      ↓
    Backend

---

# 61. Чому корисно відділяти API logic

Якщо весь fetch знаходиться всередині компонента:

    component
       ↓
    validation
       ↓
    fetch
       ↓
    response parsing
       ↓
    UI

компонент може стати великим.

Можна розділити:

    Component
       ↓
    createUser()
       ↓
    fetch()
       ↓
    API

Тоді:

- компонент відповідає за UI;
- API function відповідає за HTTP;
- backend відповідає за business logic;
- database відповідає за збереження.

Це важливий крок до чистішої архітектури.

---

# 62. POST API function

Приклад:

    type CreateUserInput = {
        name: string;
        email: string;
    };

    type User = {
        id: number;
        name: string;
        email: string;
    };

    async function createUser(
        input: CreateUserInput
    ): Promise<User> {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
        });

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        return response.json();
    }

---

# 63. POST і separation of concerns

Хороша базова структура:

    React component
          │
          │ user action
          ↓
    handleSubmit()
          │
          ↓
    createUser()
          │
          ↓
    fetch()
          │
          ↓
    Backend API
          │
          ↓
    Database

Це набагато ближче до реального full-stack застосунку.

---

# 64. GET + POST разом

Типовий CRUD UI:

    GET /api/users
          ↓
    список користувачів

    POST /api/users
          ↓
    створення користувача

Після POST можна:

    POST
      ↓
    GET
      ↓
    updated list

або:

    POST
      ↓
    createdUser
      ↓
    setUsers()

---

# 65. POST і optimistic update

Іноді UI може оновлюватися ще до завершення POST.

Наприклад:

    user clicks "Create"
          ↓
    UI immediately shows new item
          ↓
    POST
          ↓
    success / rollback

Це називається:

    optimistic update

Але для базового POST цього робити не потрібно.

Спочатку потрібно добре зрозуміти звичайний flow:

    POST
      ↓
    response
      ↓
    update UI

Optimistic updates краще вивчати пізніше.

---

# 66. POST і idempotency

Важливе поняття:

    idempotency

Два однакові POST-запити можуть створити два ресурси.

Наприклад:

    POST /orders

може створити:

    order #101

а повторний:

    order #102

Тому для операцій, де дублювання критичне, backend може використовувати:

    Idempotency-Key

Це вже більш advanced тема.

Для junior достатньо розуміти:

> повторний POST не завжди безпечний.

---

# 67. POST і database

Повний приклад архітектури:

    React
      ↓
    POST /api/courses
      ↓
    Express / NestJS
      ↓
    validate input
      ↓
    business logic
      ↓
    PostgreSQL
      ↓
    INSERT INTO courses
      ↓
    created row
      ↓
    JSON response
      ↓
    React
      ↓
    UI

Наприклад SQL:

    INSERT INTO courses (title, description)
    VALUES ($1, $2)
    RETURNING id, title, description;

Backend повертає:

    {
        "id": 10,
        "title": "Інформатика 8 клас",
        "description": "..."
    }

React отримує створений ресурс.

---

# 68. Найважливіша full-stack модель

Запам'ятай:

    FORM
      ↓
    React state
      ↓
    validation
      ↓
    POST
      ↓
    HTTP
      ↓
    Backend
      ↓
    validation
      ↓
    Database
      ↓
    response
      ↓
    React state
      ↓
    UI

Це фундаментальна схема для full-stack роботи.

---

# 69. Типові помилки

## ❌ 1. Забути method

❌

    fetch("/api/users", {
        body: JSON.stringify(data),
    });

За замовчуванням `fetch` використовує GET.

✔

    fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(data),
    });

---

## ❌ 2. Забути JSON.stringify

❌

    body: {
        name,
        email,
    }

✔

    body: JSON.stringify({
        name,
        email,
    })

---

## ❌ 3. Забути Content-Type

Для JSON POST:

❌

    fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(data),
    });

✔

    fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

---

## ❌ 4. Не перевіряти response.ok

❌

    const response = await fetch(...);

    const user = await response.json();

✔

    const response = await fetch(...);

    if (!response.ok) {
        throw new Error("Request failed");
    }

    const user = await response.json();

---

## ❌ 5. Не робити preventDefault

❌

    const handleSubmit = async event => {
        const response = await fetch(...);
    };

✔

    const handleSubmit = async event => {
        event.preventDefault();

        const response = await fetch(...);
    };

---

## ❌ 6. Не блокувати кнопку

❌

    <button type="submit">
        Створити
    </button>

✔

    <button
        type="submit"
        disabled={loading}
    >
        {loading ? "Створення..." : "Створити"}
    </button>

---

## ❌ 7. Не очищати старий error

❌

    const handleSubmit = async () => {
        setLoading(true);

        // POST
    };

✔

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        // POST
    };

---

## ❌ 8. Робити POST у render

❌

    function Component() {
        fetch("/api/users", {
            method: "POST",
        });

        return <div />;
    }

POST повинен запускатися контрольовано.

---

## ❌ 9. Робити POST в useEffect без причини

❌

    useEffect(() => {
        fetch("/api/users", {
            method: "POST",
        });
    }, []);

POST зазвичай повинен запускатися через user action.

---

## ❌ 10. Покладатися тільки на client validation

❌

    if (email.includes("@")) {
        // backend trusts it
    }

Backend все одно повинен перевіряти дані.

---

# 70. POST: базовий шаблон

Запам'ятай:

    const response = await fetch("/api/resource", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Request failed");
    }

    const result = await response.json();

Це головний синтаксичний шаблон POST.

---

# 71. POST + form: головний шаблон

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            setLoading(true);
            setError(null);

            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                }),
            });

            if (!response.ok) {
                throw new Error(
                    "Не вдалося створити користувача."
                );
            }

            const user: User =
                await response.json();

            // success
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Невідома помилка."
            );
        } finally {
            setLoading(false);
        }
    };

---

# 72. POST vs GET: важлива таблиця

| Характеристика | GET | POST |
|---|---|---|
| Основна мета | Отримати дані | Надіслати/створити дані |
| Body | Зазвичай немає | Часто є |
| `method` | `"GET"` за замовчуванням | `"POST"` потрібно вказати |
| JSON body | Не типовий сценарій | Дуже поширений |
| `JSON.stringify()` | Зазвичай не потрібен | Потрібен для JSON body |
| `Content-Type` | Часто не потрібен | Потрібен для JSON |
| Типовий запуск | `useEffect` | event handler |
| Приклад | `GET /users` | `POST /users` |
| CRUD | Read | Create |
| Повторення | Зазвичай безпечніше | Може створити дублікати |

---

# 73. Питання зі співбесіди

### 1. Що таке POST?

HTTP-метод для надсилання даних на сервер, часто для створення нового ресурсу.

---

### 2. Чим POST відрізняється від GET?

GET зазвичай отримує дані, POST надсилає дані на сервер.

---

### 3. Де знаходяться дані POST?

Найчастіше в:

    request body

---

### 4. Навіщо JSON.stringify()?

Щоб перетворити JavaScript object на JSON string для передачі в body.

---

### 5. Навіщо Content-Type?

Щоб повідомити серверу формат body:

    application/json

---

### 6. Чому потрібен preventDefault()?

Щоб браузер не виконував стандартну поведінку HTML form і не перезавантажував сторінку.

---

### 7. Де зазвичай запускається POST у React?

У response на user action:

    onSubmit
    onClick

---

### 8. Чому POST не варто бездумно виконувати в useEffect?

Тому що effect може виконуватися повторно, а POST може змінювати server state.

---

### 9. Який status часто повертається після створення ресурсу?

    201 Created

---

### 10. Чи достатньо client-side validation?

Ні.

Backend теж повинен перевіряти дані.

---

### 11. Чому потрібно перевіряти response.ok?

Тому що HTTP 4xx/5xx не обов'язково викликають rejection `fetch()`.

---

### 12. Навіщо disabled кнопка під час POST?

Щоб зменшити ризик повторного submit.

---

### 13. Чи гарантує disabled відсутність duplicate requests?

Ні.

Backend повинен також захищатися від дублювання там, де це важливо.

---

### 14. Що таке optimistic update?

UI оновлюється до підтвердження успіху server.

---

### 15. Що таке idempotency?

Властивість, за якої повторення тієї самої операції не створює небажаного додаткового ефекту.

POST не є ідемпотентним за своєю загальною семантикою.

---

# 74. Шлях навчання

## 🟢 Core

Потрібно знати:

- що таке POST;
- `fetch`;
- `method: "POST"`;
- `headers`;
- `Content-Type`;
- `body`;
- `JSON.stringify`;
- `response.json`;
- `response.ok`;
- `async/await`;
- `try/catch/finally`.

---

## 🟡 Junior

Потрібно вміти:

- створити React form;
- зробити controlled inputs;
- обробити `onSubmit`;
- використовувати `preventDefault`;
- зробити POST;
- передати JSON;
- обробити loading;
- обробити error;
- показати success;
- зробити client validation;
- обробити server validation;
- типізувати request/response;
- блокувати submit під час запиту.

---

## 🟠 Middle

Потрібно розуміти:

- reusable API functions;
- custom hooks;
- server validation;
- error mapping;
- optimistic updates;
- refetch після mutation;
- update local state;
- authentication;
- authorization;
- duplicate submissions;
- idempotency;
- transactions;
- runtime validation.

---

## 🔴 Senior

Додатково:

- mutation architecture;
- cache invalidation;
- optimistic updates;
- rollback;
- retry policies;
- idempotency keys;
- distributed systems;
- transaction boundaries;
- consistency;
- error normalization;
- observability;
- API contracts;
- TanStack Query mutations;
- server actions / server mutations;
- security;
- CSRF;
- rate limiting.

---

# 75. POST у CRUD

POST — друга важлива частина CRUD:

    CREATE → POST

Повна CRUD-модель:

    CREATE
      ↓
    POST

    READ
      ↓
    GET

    UPDATE
      ↓
    PUT / PATCH

    DELETE
      ↓
    DELETE

Наприклад:

    POST   /api/users
    GET    /api/users
    GET    /api/users/15
    PATCH  /api/users/15
    DELETE /api/users/15

---

# 76. Практичне завдання №1

Створи:

    CreateUser

Форма:

    Name
    Email

Після submit:

    POST /api/users

Body:

    {
        "name": "...",
        "email": "..."
    }

Потрібно:

1. `preventDefault()`
2. `loading`
3. `error`
4. `success`
5. `response.ok`
6. `response.json()`
7. TypeScript type
8. disabled submit button
9. client-side validation
10. очищення форми після успіху

---

# 77. Практичне завдання №2

Створи:

    CreateCourse

Тип:

    type Course = {
        id: number;
        title: string;
        description: string;
    };

Input:

    title
    description

POST:

    POST /api/courses

Body:

    {
        "title": "...",
        "description": "..."
    }

Після успіху:

    показати повідомлення
    очистити форму

---

# 78. Практичне завдання №3

Зроби:

    Users

який:

1. через GET отримує список;
2. показує список;
3. має форму створення;
4. через POST створює нового користувача;
5. після POST додає нового користувача до state;
6. не виконує повторний submit під час loading.

Архітектура:

    GET
      ↓
    users state
      ↓
    UserList

    CreateUserForm
      ↓
    POST
      ↓
    createdUser
      ↓
    setUsers()
      ↓
    UserList

---

# 79. Практичне завдання №4

Зроби повний flow:

    PostgreSQL
        ↓
    Express / NestJS
        ↓
    POST /api/courses
        ↓
    React form
        ↓
    success
        ↓
    GET /api/courses
        ↓
    список курсів

Це вже дуже хороший full-stack exercise.

---

# 80. Міні-шпаргалка

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                }),
            });

            if (!response.ok) {
                throw new Error(
                    `HTTP error: ${response.status}`
                );
            }

            const user: User =
                await response.json();

            console.log(user);

            setSuccess(true);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Unknown error"
            );
        } finally {
            setLoading(false);
        }
    };

    <form onSubmit={handleSubmit}>
        <input
            value={name}
            onChange={event =>
                setName(event.target.value)
            }
        />

        <input
            value={email}
            onChange={event =>
                setEmail(event.target.value)
            }
        />

        <button
            type="submit"
            disabled={loading}
        >
            {loading
                ? "Submitting..."
                : "Create"}
        </button>

        {error && (
            <p role="alert">
                {error}
            </p>
        )}

        {success && (
            <p>
                Successfully created.
            </p>
        )}
    </form>

---

# 81. Найкоротша шпаргалка POST

    fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

Головні слова:

    POST
    method
    headers
    Content-Type
    body
    JSON.stringify
    response.ok
    response.json

---

# 82. Головне

✔ `POST` використовується для надсилання даних на сервер.

✔ Найчастіше POST використовується для створення ресурсу.

✔ Дані часто передаються через:

    request body

✔ JSON передається через:

    JSON.stringify(data)

✔ Для JSON потрібно:

    Content-Type: application/json

✔ POST у React найчастіше запускається через:

    onSubmit

✔ Для form потрібно:

    event.preventDefault()

✔ POST має власний loading state:

    loading = false
    ↓
    submit
    ↓
    loading = true
    ↓
    response
    ↓
    loading = false

✔ Потрібно перевіряти:

    response.ok

✔ Після успішного POST можна отримати створений ресурс:

    const user = await response.json();

✔ Типовий success status для створення:

    201 Created

✔ Client validation потрібна для UX.

✔ Backend validation все одно обов'язкова.

✔ Під час POST корисно блокувати кнопку:

    disabled={loading}

✔ `disabled` не замінює backend protection від duplicate requests.

✔ Не варто без причини запускати POST у `useEffect`.

✔ GET часто відбувається автоматично при завантаженні даних:

    useEffect → GET

✔ POST частіше є результатом дії користувача:

    onSubmit → POST

✔ Після POST можна:

    update local state

або:

    refetch GET

✔ Для складніших застосунків з'являються:

    mutations
    custom hooks
    caching
    optimistic updates
    idempotency

---

# 83. Ключова формула

Запам'ятай:

    FORM
      ↓
    controlled state
      ↓
    validation
      ↓
    onSubmit
      ↓
    preventDefault()
      ↓
    POST
      ↓
    JSON.stringify()
      ↓
    Backend
      ↓
    Database
      ↓
    response
      ↓
    response.ok
      ↓
    response.json()
      ↓
    React state
      ↓
    UI

А найважливіший синтаксис:

    const response = await fetch("/api/resource", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Request failed");
    }

    const result = await response.json();

Цей шаблон потрібно не просто запам'ятати, а розуміти **кожен його рядок**.

---

# 84. Зв'язок із наступною темою

Після `POST` логічно переходити до:

    05-put-and-patch

де потрібно зрозуміти:

    POST
      ↓
    CREATE

    PUT
      ↓
    UPDATE / replace

    PATCH
      ↓
    UPDATE / partial modification

А потім:

    DELETE
      ↓
    REMOVE

Разом:

    GET
      → Read

    POST
      → Create

    PUT/PATCH
      → Update

    DELETE
      → Delete

Це фундаментальна модель REST API і одна з основ full-stack JavaScript розробки.