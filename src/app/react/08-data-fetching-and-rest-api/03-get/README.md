# GET-запити в React

> `GET` — HTTP-метод для отримання даних із сервера.
>
> У React `GET`-запити найчастіше використовуються для завантаження списків, окремих об'єктів, профілів користувачів, товарів, постів, курсів тощо.

---

# 1. Що таке GET-запит

`GET` — це HTTP-метод, призначений для **отримання даних**.

Типовий потік:

    React component
          ↓
    fetch()
          ↓
    GET /api/users
          ↓
    Backend
          ↓
    Database
          ↓
    JSON response
          ↓
    React state
          ↓
    UI

Наприклад:

    GET /api/users

може повернути:

    [
        {
            "id": 1,
            "name": "Anna"
        },
        {
            "id": 2,
            "name": "John"
        }
    ]

React отримує ці дані та зберігає їх у `state`.

---

# 2. Де GET використовується

GET-запити використовуються, коли потрібно:

- отримати список користувачів;
- отримати один користувацький профіль;
- отримати список товарів;
- отримати список постів;
- отримати курс;
- отримати список категорій;
- отримати дані для таблиці;
- отримати дані для сторінки;
- отримати дані з REST API.

Наприклад:

    GET /api/users

    GET /api/products

    GET /api/posts

    GET /api/courses

    GET /api/users/15

Останній варіант означає:

> отримати користувача з `id = 15`.

---

# 3. GET у React

Найпростіший варіант:

    const response = await fetch("/api/users");
    const data = await response.json();

Тут відбувається:

1. `fetch()` відправляє HTTP-запит.
2. Сервер повертає HTTP-відповідь.
3. `response.json()` читає JSON.
4. Отриманий JavaScript-об'єкт можна записати в `state`.

Наприклад:

    const response = await fetch("/api/users");

    const users = await response.json();

---

# 4. GET + useEffect

Якщо дані потрібно завантажити після монтування компонента, типовий варіант:

    import { useEffect, useState } from "react";

    type User = {
        id: number;
        name: string;
    };

    export default function Users() {
        const [users, setUsers] = useState<User[]>([]);

        useEffect(() => {
            const fetchUsers = async () => {
                const response = await fetch("/api/users");
                const data: User[] = await response.json();

                setUsers(data);
            };

            fetchUsers();
        }, []);

        return (
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        );
    }

Порожній масив залежностей:

    []

означає, що effect запускається після монтування компонента.

---

# 5. Чому fetch не потрібно робити прямо в тілі компонента

❌ Неправильно:

    export default function Users() {
        const [users, setUsers] = useState<User[]>([]);

        fetch("/api/users")
            .then(response => response.json())
            .then(data => setUsers(data));

        return (
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        );
    }

Проблема:

кожен render компонента може знову виконати `fetch()`.

Це може привести до:

    render
      ↓
    fetch
      ↓
    setState
      ↓
    render
      ↓
    fetch
      ↓
    setState
      ↓
    ...

Для side effect використовується `useEffect`.

✔ Правильна ідея:

    render
      ↓
    useEffect
      ↓
    fetch
      ↓
    setState
      ↓
    render

---

# 6. GET + loading + error

Реальний GET-запит повинен враховувати не тільки успішну відповідь.

Потрібні щонайменше:

    data
    loading
    error

Наприклад:

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

Повний приклад:

    import { useEffect, useState } from "react";

    type User = {
        id: number;
        name: string;
    };

    export default function Users() {
        const [users, setUsers] = useState<User[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
            const fetchUsers = async () => {
                try {
                    setLoading(true);
                    setError(null);

                    const response = await fetch("/api/users");

                    if (!response.ok) {
                        throw new Error("Не вдалося завантажити користувачів.");
                    }

                    const data: User[] = await response.json();

                    setUsers(data);
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

            fetchUsers();
        }, []);

        if (loading) {
            return <p>Завантаження...</p>;
        }

        if (error) {
            return <p>Помилка: {error}</p>;
        }

        return (
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        );
    }

Це вже базовий реальний шаблон для GET.

---

# 7. Важлива особливість fetch()

`fetch()` **не вважає HTTP 404 або 500 помилкою JavaScript автоматично**.

Наприклад:

    const response = await fetch("/api/users");

Якщо сервер повернув:

    404 Not Found

`fetch()` все одно може успішно завершитися.

Тому потрібно перевіряти:

    response.ok

Наприклад:

    if (!response.ok) {
        throw new Error("Помилка HTTP");
    }

---

# 8. response.ok

`response.ok` має значення:

    true

для успішного HTTP-відповіді приблизно в діапазоні:

    200–299

Наприклад:

    const response = await fetch("/api/users");

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

---

# 9. response.status

Можна отримати конкретний HTTP status:

    const response = await fetch("/api/users");

    console.log(response.status);

Наприклад:

    200
    201
    400
    401
    403
    404
    500

Для GET найчастіше зустрічатимуться:

    200 OK
    401 Unauthorized
    403 Forbidden
    404 Not Found
    500 Internal Server Error

---

# 10. response.json()

HTTP-відповідь — це не відразу JavaScript-об'єкт.

Потрібно прочитати body:

    const response = await fetch("/api/users");

    const data = await response.json();

Після цього:

    data

може бути:

    [
        {
            id: 1,
            name: "Anna"
        },
        {
            id: 2,
            name: "John"
        }
    ]

`response.json()` також є асинхронною операцією.

Тому:

    await response.json();

---

# 11. Повний життєвий цикл GET

Типовий сценарій:

    компонент монтується
            ↓
    useEffect()
            ↓
    loading = true
            ↓
    error = null
            ↓
    fetch()
            ↓
    HTTP response
            ↓
    response.ok ?
        ↙       ↘
      yes        no
       ↓          ↓
    json()      throw Error
       ↓          ↓
    setData()   catch
       ↓          ↓
       └────┬─────┘
            ↓
    loading = false
            ↓
           UI

---

# 12. try / catch / finally

Для GET-запитів зручний шаблон:

    try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/users");

        if (!response.ok) {
            throw new Error("Не вдалося отримати дані.");
        }

        const data: User[] = await response.json();

        setUsers(data);
    } catch (error) {
        setError(
            error instanceof Error
                ? error.message
                : "Сталася невідома помилка."
        );
    } finally {
        setLoading(false);
    }

### Чому finally?

Тому що `loading` потрібно завершити:

- після успіху;
- після HTTP-помилки;
- після network error;
- після помилки JSON.

`finally` виконається в будь-якому випадку.

---

# 13. GET і HTTP-помилки

Наприклад сервер повернув:

    404

Не варто робити так:

    const response = await fetch("/api/users");

    const data = await response.json();

    setUsers(data);

Краще:

    const response = await fetch("/api/users");

    if (!response.ok) {
        throw new Error(
            `Request failed: ${response.status}`
        );
    }

    const data: User[] = await response.json();

---

# 14. GET і network error

Network error — це інша ситуація.

Наприклад:

- сервер недоступний;
- немає мережі;
- DNS проблема;
- запит заблокований;
- проблема з connection.

У такій ситуації `fetch()` може відхилити Promise.

Тому:

    try {
        const response = await fetch("/api/users");

        if (!response.ok) {
            throw new Error("HTTP error");
        }

        const data = await response.json();

        setUsers(data);
    } catch (error) {
        console.error(error);
    }

---

# 15. HTTP error ≠ network error

Це важливо розрізняти.

### HTTP error

Сервер відповів:

    404
    401
    403
    500

Запит до сервера відбувся.

### Network error

Не вдалося нормально отримати HTTP-відповідь.

Тому:

    fetch()
        ↓
    HTTP response
        ↓
    response.ok === false

це не те саме, що:

    fetch()
        ↓
    network failure
        ↓
    catch

---

# 16. Типізація GET-відповіді

У TypeScript потрібно описати структуру даних.

Наприклад:

    type User = {
        id: number;
        name: string;
        email: string;
    };

Потім:

    const data: User[] = await response.json();

І:

    const [users, setUsers] = useState<User[]>([]);

Тепер TypeScript знає, що:

    users

це:

    User[]

---

# 17. GET одного об'єкта

Наприклад:

    GET /api/users/15

Компонент:

    type User = {
        id: number;
        name: string;
        email: string;
    };

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/users/15");

                if (!response.ok) {
                    throw new Error("Користувача не знайдено.");
                }

                const data: User = await response.json();

                setUser(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, []);

Тут:

    User | null

потрібно тому, що спочатку користувача ще немає.

---

# 18. GET списку

Для списку:

    const [users, setUsers] = useState<User[]>([]);

Після запиту:

    const data: User[] = await response.json();

    setUsers(data);

Рендер:

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>
                    {user.name}
                </li>
            ))}
        </ul>
    );

---

# 19. Empty state

Успішний GET може повернути порожній масив:

    []

Це **не помилка**.

Тому потрібно розрізняти:

    loading
    error
    empty
    success

Наприклад:

    if (loading) {
        return <p>Завантаження...</p>;
    }

    if (error) {
        return <p>Помилка: {error}</p>;
    }

    if (users.length === 0) {
        return <p>Користувачів поки немає.</p>;
    }

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );

---

# 20. GET: чотири основні UI-стани

Для простого запиту:

    loading
        ↓
    success
        ↓
    data

або:

    loading
        ↓
    error

А при успішному запиті список може бути порожнім:

    loading
        ↓
    success
        ↓
    empty

Тому UI логічно має:

    Loading
    Error
    Empty
    Data

---

# 21. Правильний порядок перевірок

Типовий порядок:

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage />;
    }

    if (data.length === 0) {
        return <EmptyState />;
    }

    return <DataList />;

Це робить стани взаємовиключними.

---

# 22. Повний компонент Users

    import { useEffect, useState } from "react";

    type User = {
        id: number;
        name: string;
        email: string;
    };

    export default function Users() {
        const [users, setUsers] = useState<User[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
            const fetchUsers = async () => {
                try {
                    setLoading(true);
                    setError(null);

                    const response = await fetch("/api/users");

                    if (!response.ok) {
                        throw new Error(
                            `HTTP error: ${response.status}`
                        );
                    }

                    const data: User[] = await response.json();

                    setUsers(data);
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

            fetchUsers();
        }, []);

        if (loading) {
            return <p>Завантаження користувачів...</p>;
        }

        if (error) {
            return (
                <p role="alert">
                    Не вдалося завантажити користувачів: {error}
                </p>
            );
        }

        if (users.length === 0) {
            return <p>Користувачів немає.</p>;
        }

        return (
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <strong>{user.name}</strong>
                        <span> — {user.email}</span>
                    </li>
                ))}
            </ul>
        );
    }

Це один із базових шаблонів, який потрібно вміти написати без підказки.

---

# 23. Винесення API URL у змінну

Замість:

    fetch("/api/users");

можна:

    const API_URL = "/api/users";

    const response = await fetch(API_URL);

Або:

    const API_URL = "https://example.com/api/users";

    const response = await fetch(API_URL);

У реальному проєкті URL backend часто приходить із environment variables.

Наприклад:

    const API_URL = import.meta.env.VITE_API_URL;

або в Next.js:

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

Конкретний спосіб залежить від інструменту збірки.

---

# 24. GET із query parameters

GET часто використовує query parameters.

Наприклад:

    GET /api/users?role=teacher

або:

    GET /api/products?category=books&page=2

У JavaScript зручно використовувати `URLSearchParams`.

    const params = new URLSearchParams({
        role: "teacher",
        page: "2",
    });

    const response = await fetch(
        `/api/users?${params.toString()}`
    );

---

# 25. GET із кількома параметрами

Наприклад:

    const params = new URLSearchParams({
        search: "react",
        page: "2",
        limit: "10",
    });

    const response = await fetch(
        `/api/courses?${params.toString()}`
    );

URL:

    /api/courses?search=react&page=2&limit=10

---

# 26. GET із path parameter

Є різниця між:

    /api/users/15

і:

    /api/users?id=15

Перший варіант використовує path parameter:

    /api/users/:id

Другий — query parameter:

    /api/users?id=15

Обидва підходи можливі, але в REST API вони мають різне призначення.

---

# 27. GET за id

Наприклад, маємо:

    const userId = 15;

    const response = await fetch(
        `/api/users/${userId}`
    );

    if (!response.ok) {
        throw new Error("User not found");
    }

    const user: User = await response.json();

---

# 28. GET залежить від props

Якщо URL залежить від `userId`:

    type Props = {
        userId: number;
    };

    export default function UserDetails({ userId }: Props) {
        const [user, setUser] = useState<User | null>(null);

        useEffect(() => {
            const fetchUser = async () => {
                const response = await fetch(
                    `/api/users/${userId}`
                );

                if (!response.ok) {
                    throw new Error("User not found");
                }

                const data: User = await response.json();

                setUser(data);
            };

            fetchUser();
        }, [userId]);

        if (!user) {
            return <p>Завантаження...</p>;
        }

        return <h2>{user.name}</h2>;
    }

Дуже важливо:

    [userId]

означає:

> коли `userId` зміниться, потрібно виконати GET-запит знову.

---

# 29. GET після зміни параметра

Наприклад:

    UserDetails userId={1}

Потім:

    UserDetails userId={2}

React бачить зміну:

    userId: 1 → 2

і запускає effect знову:

    GET /api/users/2

Це типовий патерн для:

- сторінок деталей;
- профілів;
- товарів;
- постів;
- курсів;
- категорій.

---

# 30. Повторний GET

Іноді потрібно повторити запит:

    GET
      ↓
    data
      ↓
    користувач натиснув "Повторити"
      ↓
    GET
      ↓
    data

Наприклад:

    const fetchUsers = async () => {
        // ...
    };

    useEffect(() => {
        fetchUsers();
    }, []);

Але якщо `fetchUsers` використовується і в JSX, потрібно продумати залежності effect та стабільність функції.

Для простих компонентів можна оголосити функцію всередині effect.

Для складніших сценаріїв пізніше зручно використовувати:

    useCallback

або власний hook.

---

# 31. GET + Retry

Простий варіант:

    const [retry, setRetry] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            // GET
        };

        fetchUsers();
    }, [retry]);

Кнопка:

    <button onClick={() => setRetry(value => value + 1)}>
        Повторити
    </button>

Зміна:

    retry: 0 → 1

викликає effect знову.

---

# 32. Більш зручний підхід із функцією refetch

Для навчальних прикладів можна зробити:

    const fetchUsers = async () => {
        // GET
    };

    useEffect(() => {
        fetchUsers();
    }, []);

Але для production-коду потрібно уважно стежити за dependency array.

Це одна з причин, чому пізніше з'являються:

    custom hooks
    React Query / TanStack Query
    SWR

На цьому етапі головне — зрозуміти сам принцип GET.

---

# 33. Initial loading vs refetching

Є важлива різниця:

    Initial loading

і:

    Refetching

### Initial loading

Даних ще немає:

    data = null
    loading = true

UI:

    Завантаження...

### Refetching

Дані вже є:

    data = [...]
    loading = true

У цьому випадку не обов'язково повністю прибирати дані з екрана.

Наприклад:

    список користувачів

може залишатися видимим, а поруч:

    Оновлення...

---

# 34. Не обов'язково очищати data перед кожним GET

Іноді погано робити:

    setUsers([]);
    setLoading(true);

при кожному повторному запиті.

Тоді UI:

    дані
      ↓
    порожній екран
      ↓
    loading
      ↓
    нові дані

Це може створювати неприємне миготіння.

Краще іноді залишити старі дані:

    старі дані + loading indicator
              ↓
          GET request
              ↓
          нові дані

Це особливо корисно під час:

- pagination;
- filtering;
- sorting;
- search;
- manual refresh.

---

# 35. isLoading та isFetching

Для складніших data-fetching систем часто розрізняють:

    isLoading

і:

    isFetching

Умовно:

    isLoading === true

означає:

> даних ще немає, виконується перше завантаження.

А:

    isFetching === true

означає:

> зараз виконується запит, незалежно від того, чи є вже дані.

Наприклад:

    data = users
    isFetching = true

означає:

> користувачі вже показані, але React зараз отримує свіжі дані.

Ця ідея дуже важлива для подальшого вивчення data fetching libraries.

---

# 36. GET + existing data + error

Помилка не обов'язково означає, що потрібно прибрати старі дані.

Наприклад:

    старі дані
        ↓
    refetch
        ↓
    server error
        ↓
    старі дані залишаються
    + повідомлення про помилку

Це може бути кращим UX, ніж:

    error
      ↓
    повністю порожній екран

Приклад:

    if (error && users.length === 0) {
        return <p>Не вдалося завантажити дані.</p>;
    }

    return (
        <>
            {error && (
                <p role="alert">
                    Не вдалося оновити дані.
                </p>
            )}

            <UserList users={users} />
        </>
    );

---

# 37. AbortController

GET-запит може тривати довго.

Компонент може бути видалений до завершення запиту.

Для скасування запиту можна використовувати:

    AbortController

Приклад:

    useEffect(() => {
        const controller = new AbortController();

        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    "/api/users",
                    {
                        signal: controller.signal,
                    }
                );

                if (!response.ok) {
                    throw new Error("Request failed");
                }

                const data: User[] = await response.json();

                setUsers(data);
            } catch (error) {
                if (
                    error instanceof DOMException &&
                    error.name === "AbortError"
                ) {
                    return;
                }

                setError(
                    error instanceof Error
                        ? error.message
                        : "Unknown error"
                );
            }
        };

        fetchUsers();

        return () => {
            controller.abort();
        };
    }, []);

---

# 38. Як працює AbortController

Послідовність:

    component mounted
          ↓
    AbortController created
          ↓
    fetch started
          ↓
    component unmounted
          ↓
    cleanup()
          ↓
    controller.abort()
          ↓
    request cancelled

Це особливо важливо, коли GET-запит:

- довгий;
- залежить від параметрів;
- може часто перезапускатися;
- виконується під час зміни сторінки.

---

# 39. GET при зміні параметра і race condition

Уявімо:

    userId = 1
        ↓
    GET /users/1

Користувач швидко переходить:

    userId = 2
        ↓
    GET /users/2

Можливо:

    GET /users/1
        ────────────────→ response

    GET /users/2
        ───────→ response

Якщо перший запит завершиться після другого, старі дані можуть перезаписати нові.

Це називається:

    race condition

---

# 40. AbortController і race conditions

При зміні `userId` cleanup попереднього effect може скасувати попередній запит.

    userId = 1
        ↓
    request A
        ↓
    userId = 2
        ↓
    cleanup
        ↓
    abort request A
        ↓
    request B

Це один із практичних способів контролювати застарілі запити.

Для складніших сценаріїв існують додаткові стратегії:

- request id;
- ignore stale response;
- AbortController;
- data fetching libraries.

---

# 41. React Strict Mode і GET

У development-режимі React Strict Mode може спеціально виконувати effect setup/cleanup додатково, щоб виявляти проблеми з side effects.

Через це під час розробки можна побачити:

    GET
    GET

і подумати, що React "зламався".

Не потрібно просто створювати глобальний прапорець:

    let alreadyFetched = false;

Це приховує проблему, а не вирішує її.

Краще правильно організовувати effect:

- cleanup;
- AbortController;
- правильні dependencies;
- idempotent operations.

Також важливо розуміти:

> скасування fetch на клієнті не гарантує, що сервер взагалі не встиг отримати запит.

---

# 42. GET і Error Boundary

Не потрібно плутати:

    Error Boundary

і:

    fetch error

`Error Boundary` призначений насамперед для помилок під час rendering / React component tree.

Помилка всередині:

    useEffect()
        ↓
    fetch()
        ↓
    catch()

зазвичай обробляється власним async state:

    error

Тому для GET:

    loading
    error
    data

є нормальним підходом.

---

# 43. GET і accessibility

Повідомлення про помилку можна зробити доступнішим:

    <p role="alert">
        Не вдалося завантажити користувачів.
    </p>

Для статусу завантаження:

    <p aria-live="polite">
        Завантаження...
    </p>

Це допомагає assistive technologies повідомляти користувачу про зміну стану.

---

# 44. Не показувати технічну помилку користувачу

Наприклад:

    Failed to fetch

або:

    TypeError: NetworkError when attempting to fetch resource

не завжди є хорошим повідомленням для користувача.

Краще:

    Не вдалося завантажити користувачів.
    Перевірте з'єднання та спробуйте ще раз.

Технічну помилку можна записати в log:

    console.error(error);

а користувачу показати зрозуміле повідомлення.

---

# 45. Функція для отримання повідомлення про помилку

У TypeScript `catch` потрібно розглядати помилку як `unknown`.

Зручно:

    const getErrorMessage = (error: unknown): string => {
        if (error instanceof Error) {
            return error.message;
        }

        return "Сталася невідома помилка.";
    };

Використання:

    catch (error) {
        setError(getErrorMessage(error));
    }

---

# 46. Чому не використовувати any

❌ Не варто:

    catch (error: any) {
        setError(error.message);
    }

Краще:

    catch (error: unknown) {
        if (error instanceof Error) {
            setError(error.message);
        } else {
            setError("Невідома помилка.");
        }
    }

Це зберігає переваги TypeScript.

---

# 47. Типовий AsyncState

Для повторюваної структури можна описати:

    type AsyncState<T> = {
        data: T | null;
        loading: boolean;
        error: string | null;
    };

Наприклад:

    const [state, setState] = useState<AsyncState<User[]>>({
        data: null,
        loading: true,
        error: null,
    });

Це вже підготовка до створення власного data-fetching hook.

---

# 48. Status замість кількох boolean

Ще один підхід:

    type Status =
        | "idle"
        | "loading"
        | "success"
        | "error";

    const [status, setStatus] = useState<Status>("idle");

Тоді:

    setStatus("loading");

    setStatus("success");

    setStatus("error");

Це іноді зрозуміліше, ніж:

    loading
    error
    data

бо `status` явно описує поточний стан операції.

---

# 49. Async state як state machine

Можна мислити GET як маленьку state machine:

    idle
      ↓
    loading
      ↓
    success

або:

    idle
      ↓
    loading
      ↓
    error

Після помилки:

    error
      ↓
    loading
      ↓
    success

Після успіху можна зробити повторний запит:

    success
      ↓
    loading
      ↓
    success

Це дуже корисний спосіб мислення для async UI.

---

# 50. Discriminated union

Для складнішого TypeScript можна описати стани точніше:

    type AsyncState<T> =
        | {
            status: "idle";
          }
        | {
            status: "loading";
          }
        | {
            status: "success";
            data: T;
          }
        | {
            status: "error";
            error: string;
          };

Тепер кожен стан має свою структуру.

Наприклад:

    const state: AsyncState<User[]> = {
        status: "success",
        data: users,
    };

Або:

    const state: AsyncState<User[]> = {
        status: "error",
        error: "Не вдалося завантажити користувачів.",
    };

Це корисний підхід для великих застосунків, але для простих компонентів:

    data
    loading
    error

часто достатньо.

---

# 51. GET із reusable компонентами

Можна розділити UI:

    <LoadingMessage />

    <ErrorMessage />

    <EmptyState />

    <UserList />

Наприклад:

    if (loading) {
        return <LoadingMessage />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (users.length === 0) {
        return <EmptyState />;
    }

    return <UserList users={users} />;

Це покращує читабельність компонента.

---

# 52. Приклад із компонентами

    type User = {
        id: number;
        name: string;
    };

    function LoadingMessage() {
        return <p>Завантаження...</p>;
    }

    type ErrorMessageProps = {
        message: string;
    };

    function ErrorMessage({ message }: ErrorMessageProps) {
        return (
            <p role="alert">
                {message}
            </p>
        );
    }

    function EmptyState() {
        return <p>Даних немає.</p>;
    }

    type UserListProps = {
        users: User[];
    };

    function UserList({ users }: UserListProps) {
        return (
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name}
                    </li>
                ))}
            </ul>
        );
    }

---

# 53. GET із кнопкою Retry

Повний концептуальний приклад:

    function Users() {
        const [users, setUsers] = useState<User[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);
        const [retry, setRetry] = useState(0);

        useEffect(() => {
            const fetchUsers = async () => {
                try {
                    setLoading(true);
                    setError(null);

                    const response = await fetch("/api/users");

                    if (!response.ok) {
                        throw new Error(
                            "Не вдалося завантажити користувачів."
                        );
                    }

                    const data: User[] = await response.json();

                    setUsers(data);
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

            fetchUsers();
        }, [retry]);

        if (loading) {
            return <p>Завантаження...</p>;
        }

        if (error) {
            return (
                <>
                    <p role="alert">{error}</p>

                    <button
                        onClick={() => setRetry(value => value + 1)}
                    >
                        Повторити
                    </button>
                </>
            );
        }

        return (
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        );
    }

---

# 54. Disabled під час повторного запиту

Якщо кнопка запускає запит, можна тимчасово її вимкнути:

    <button
        disabled={loading}
        onClick={() => setRetry(value => value + 1)}
    >
        {loading ? "Завантаження..." : "Повторити"}
    </button>

Це допомагає уникнути випадкового багаторазового запуску.

---

# 55. GET і search

GET дуже часто використовується для пошуку:

    GET /api/products?search=react

React може побудувати URL:

    const params = new URLSearchParams({
        search,
    });

    const response = await fetch(
        `/api/products?${params.toString()}`
    );

Залежно від UX запит може виконуватися:

- після натискання кнопки;
- після зміни пошукового поля;
- після debounce.

Debounce буде окремою темою, але GET є основою такого сценарію.

---

# 56. GET і pagination

GET також використовується для pagination:

    GET /api/users?page=1&limit=10

Наприклад:

    const params = new URLSearchParams({
        page: String(page),
        limit: "10",
    });

    const response = await fetch(
        `/api/users?${params.toString()}`
    );

При зміні:

    page: 1 → 2

React може виконати:

    GET /api/users?page=2&limit=10

---

# 57. GET і filtering

Наприклад:

    GET /api/products?category=books

React:

    const params = new URLSearchParams({
        category,
    });

    const response = await fetch(
        `/api/products?${params.toString()}`
    );

Зміна фільтра:

    books → electronics

може викликати новий GET:

    GET /api/products?category=electronics

---

# 58. GET і sorting

Наприклад:

    GET /api/products?sort=price

або:

    GET /api/products?sort=name

React:

    const params = new URLSearchParams({
        sort,
    });

    const response = await fetch(
        `/api/products?${params.toString()}`
    );

---

# 59. GET і URLSearchParams

Корисний шаблон:

    const params = new URLSearchParams();

    params.set("page", "2");
    params.set("limit", "10");
    params.set("search", "react");

    const url = `/api/courses?${params.toString()}`;

    const response = await fetch(url);

Це краще, ніж вручну будувати складні query strings.

---

# 60. Що не потрібно робити в GET

GET не повинен використовуватися для зміни серверних даних.

❌ Наприклад:

    GET /api/users/delete/15

або:

    GET /api/users/15/change-role

Для зміни даних використовуються інші HTTP-методи:

    POST
    PUT
    PATCH
    DELETE

GET — переважно для читання.

---

# 61. GET повинен бути безпечним для повторення

GET-запит зазвичай не повинен змінювати стан сервера.

Наприклад:

    GET /api/users

можна виконати:

    один раз
    десять разів
    сто разів

і він має лише отримувати дані.

Це одна з фундаментальних ідей HTTP.

---

# 62. GET і кешування

GET-запити можуть кешуватися на різних рівнях:

    Browser
       ↓
    HTTP cache
       ↓
    CDN
       ↓
    Server

У результаті повторний GET не обов'язково означає, що кожного разу потрібно заново отримувати дані з database.

На базовому рівні React важливо просто розуміти:

> GET — це читання ресурсу, а кешування є окремим механізмом.

---

# 63. GET + credentials

Якщо API використовує cookie-based authentication, іноді потрібно:

    const response = await fetch(
        "/api/users",
        {
            credentials: "include",
        }
    );

Але це залежить від архітектури authentication.

Не потрібно додавати:

    credentials: "include"

без потреби.

---

# 64. GET + Authorization header

Якщо API використовує Bearer token:

    const response = await fetch(
        "/api/users",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

Це вже пов'язано з authentication.

На цьому етапі головне розуміти, що GET може мати headers.

---

# 65. GET і Content-Type

Для звичайного GET зазвичай не потрібно:

    headers: {
        "Content-Type": "application/json",
    }

Тому простий GET:

    fetch("/api/users");

є цілком нормальним.

`Content-Type` особливо важливий, коли клієнт **відправляє body**, наприклад у POST/PUT/PATCH.

---

# 66. GET response headers

HTTP response має headers:

    const response = await fetch("/api/users");

    console.log(response.headers);

Окремий header:

    const contentType = response.headers.get(
        "content-type"
    );

Це може бути корисно, якщо потрібно перевірити тип відповіді.

---

# 67. GET не завжди повертає JSON

Хоча REST API дуже часто повертає JSON, HTTP response може містити:

- JSON;
- text;
- Blob;
- ArrayBuffer;
- інші формати.

JSON:

    const data = await response.json();

Text:

    const text = await response.text();

Для стандартного REST API найчастіше використовується:

    response.json()

---

# 68. GET і backend

У повному full-stack застосунку:

    React
      ↓
    fetch()
      ↓
    GET /api/users
      ↓
    Express / NestJS
      ↓
    PostgreSQL
      ↓
    rows
      ↓
    JSON
      ↓
    React

Наприклад backend:

    GET /api/users

може виконати SQL:

    SELECT id, name, email
    FROM users
    ORDER BY id;

і повернути:

    [
        {
            "id": 1,
            "name": "Anna",
            "email": "anna@example.com"
        }
    ]

React отримує JSON і показує його.

---

# 69. Найважливіша модель: Data → Backend → UI

Для твого full-stack навчання корисно мислити так:

    PostgreSQL
         ↓
    SQL
         ↓
    Backend API
         ↓
    HTTP GET
         ↓
    fetch()
         ↓
    JSON
         ↓
    React state
         ↓
    JSX
         ↓
    UI

Наприклад:

    PostgreSQL
        ↓
    SELECT *
    FROM courses
        ↓
    GET /api/courses
        ↓
    fetch("/api/courses")
        ↓
    Course[]
        ↓
    setCourses()
        ↓
    courses.map()
        ↓
    <CourseCard />

Це одна з найважливіших моделей для full-stack developer.

---

# 70. Типові помилки

## ❌ 1. fetch прямо в render

    function Users() {
        fetch("/api/users");

        return <div>...</div>;
    }

✔ Використовуй `useEffect` для side effect.

---

## ❌ 2. Не перевіряти response.ok

    const response = await fetch("/api/users");

    const data = await response.json();

✔ Краще:

    if (!response.ok) {
        throw new Error("Request failed");
    }

---

## ❌ 3. Забути await response.json()

❌

    const data = response.json();

✔

    const data = await response.json();

---

## ❌ 4. Забути loading = false

❌

    try {
        const response = await fetch("/api/users");

        const data = await response.json();

        setUsers(data);
    } catch (error) {
        setError("Error");
    }

✔

    try {
        // request
    } catch (error) {
        // error
    } finally {
        setLoading(false);
    }

---

## ❌ 5. Не очищати стару помилку

Якщо після першої невдалої спроби:

    error = "Network error"

потім повторити GET і не зробити:

    setError(null);

стара помилка може залишатися під час нового запиту.

✔ На початку нового запиту:

    setError(null);

---

## ❌ 6. Вважати [] помилкою

    users.length === 0

не означає:

    error

Це може бути цілком успішна відповідь:

    200 OK
    []

Тому потрібен окремий `EmptyState`.

---

## ❌ 7. Використовувати any

❌

    const [users, setUsers] = useState<any[]>([]);

✔

    const [users, setUsers] = useState<User[]>([]);

---

## ❌ 8. Не враховувати зміну параметра

Якщо:

    userId

впливає на URL, він повинен бути dependency:

    useEffect(() => {
        // GET /users/userId
    }, [userId]);

---

## ❌ 9. Ігнорувати race condition

Якщо швидко змінюється:

    userId

можуть одночасно виконуватися кілька GET.

Для таких сценаріїв потрібно думати про:

    AbortController
    stale responses
    request ordering

---

## ❌ 10. Показувати порожній екран при кожному refetch

Іноді краще залишити:

    старі дані

і показати:

    Оновлення...

замість повного:

    Loading...

---

# 71. Хороший базовий GET-шаблон

Запам'ятай:

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(
                        `HTTP error: ${response.status}`
                    );
                }

                const data: DataType =
                    await response.json();

                setData(data);
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

        fetchData();
    }, [url]);

Це один із головних шаблонів, який потрібно розуміти, а не просто механічно копіювати.

---

# 72. GET: мінімальний варіант

Якщо потрібно просто нагадати синтаксис:

    const response = await fetch("/api/users");

    if (!response.ok) {
        throw new Error("Request failed");
    }

    const users: User[] = await response.json();

---

# 73. GET: середній варіант

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch("/api/users");

                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }

                const data: User[] = await response.json();

                setUsers(data);
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

        fetchUsers();
    }, []);

---

# 74. GET: production-oriented thinking

У production-проєкті потрібно додатково подумати про:

- API URL;
- authentication;
- authorization;
- HTTP status codes;
- error messages;
- loading state;
- empty state;
- retry;
- cancellation;
- race conditions;
- caching;
- refetching;
- pagination;
- filtering;
- sorting;
- accessibility;
- logging;
- TypeScript types;
- server-side validation;
- reusable data-fetching logic.

Не потрібно реалізовувати все це в кожному маленькому компоненті.

Головне — розуміти, які проблеми існують.

---

# 75. GET у React: загальна схема

    User opens page
          ↓
    React component mounts
          ↓
    useEffect
          ↓
    loading = true
          ↓
    fetch(GET)
          ↓
    ┌──────────────────────┐
    │      HTTP response   │
    └──────────────────────┘
          ↓
    response.ok ?
       /        \
     yes         no
      ↓           ↓
    json()      throw
      ↓           ↓
    setData()    catch
      ↓           ↓
      └─────┬─────┘
            ↓
      loading = false
            ↓
           UI

---

# 76. GET: що потрібно вміти без підказки

Ти повинен уміти написати:

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Request failed");
    }

    const data = await response.json();

І розуміти:

- що таке GET;
- що робить `fetch`;
- що таке `Response`;
- що робить `response.json()`;
- що таке `response.ok`;
- що таке `response.status`;
- чому 404/500 не завжди потрапляють у `catch`;
- як обробляти loading;
- як обробляти error;
- як обробляти empty state;
- як типізувати response;
- чому GET у React часто знаходиться всередині `useEffect`;
- як GET залежить від props/state;
- як повторити GET;
- навіщо `AbortController`.

---

# 77. Питання зі співбесіди

### 1. Що таке GET?

HTTP-метод для отримання ресурсу або набору ресурсів.

---

### 2. Як виконати GET у React?

Наприклад:

    const response = await fetch("/api/users");

---

### 3. Чи кидає fetch помилку при 404?

Ні, не автоматично.

Потрібно перевіряти:

    response.ok

---

### 4. Для чого потрібен response.json()?

Щоб прочитати JSON body HTTP-відповіді та отримати JavaScript-значення.

---

### 5. Для чого useEffect?

Для виконання side effect, наприклад HTTP-запиту, поза самим render.

---

### 6. Навіщо loading?

Щоб UI знав, що асинхронна операція ще виконується.

---

### 7. Навіщо error?

Щоб UI міг відобразити невдалий запит.

---

### 8. Чому потрібно перевіряти response.ok?

Тому що `fetch` не відхиляє Promise лише через HTTP status 4xx/5xx.

---

### 9. Що таке empty state?

Стан, коли запит успішний, але даних немає.

Наприклад:

    200 OK
    []

---

### 10. Навіщо finally?

Щоб гарантовано завершити loading:

    setLoading(false);

---

### 11. Для чого AbortController?

Для скасування fetch-запиту.

---

### 12. Що таке race condition?

Ситуація, коли кілька асинхронних запитів завершуються в непередбаченому порядку і старі дані можуть перезаписати нові.

---

### 13. Чому URL може бути dependency useEffect?

Тому що при зміні URL потрібно виконати новий GET.

---

### 14. Чим відрізняється HTTP error від network error?

HTTP error означає, що сервер відповів статусом помилки.

Network error означає, що нормальну HTTP-відповідь не вдалося отримати.

---

### 15. Чи потрібно очищати старі дані під час refetch?

Не завжди.

Для кращого UX часто можна залишити старі дані та показати індикатор оновлення.

---

# 78. Шлях навчання

## 🟢 Core

Потрібно знати:

- HTTP GET;
- `fetch`;
- `async/await`;
- `response.json()`;
- `response.ok`;
- `response.status`;
- `useEffect`;
- `useState`;
- loading;
- error;
- empty state;
- TypeScript types.

---

## 🟡 Junior

Потрібно вміти:

- GET список;
- GET один об'єкт;
- GET за `id`;
- query parameters;
- `URLSearchParams`;
- retry;
- `try/catch/finally`;
- `AbortController`;
- dependency array;
- обробляти HTTP errors;
- правильно типізувати response.

---

## 🟠 Middle

Потрібно розуміти:

- race conditions;
- stale responses;
- initial loading;
- refetching;
- `isLoading` vs `isFetching`;
- caching;
- pagination;
- filtering;
- sorting;
- reusable fetching logic;
- custom hooks;
- authentication headers;
- error strategy;
- cancellation.

---

## 🔴 Senior

Додатково:

- data fetching architecture;
- caching strategy;
- request deduplication;
- optimistic/pessimistic patterns;
- stale-while-revalidate;
- retries/backoff;
- request cancellation;
- server/client boundaries;
- SSR/SSG/ISR;
- hydration;
- TanStack Query / SWR;
- observability;
- performance;
- API design;
- consistency and invalidation strategies.

---

# 79. Що пов'язано з наступними темами

Після GET логічно вивчати:

    03-get
       ↓
    04-post
       ↓
    05-put-and-patch
       ↓
    06-delete
       ↓
    07-async-data
       ↓
    08-custom-data-fetching-hooks

GET є фундаментом для розуміння всього CRUD:

    GET       → Read
    POST      → Create
    PUT/PATCH → Update
    DELETE    → Delete

---

# 80. Міні-шпаргалка

    // state
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // effect
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(null);

                // GET
                const response = await fetch("/api/users");

                // HTTP error
                if (!response.ok) {
                    throw new Error(
                        `HTTP ${response.status}`
                    );
                }

                // JSON
                const users: User[] =
                    await response.json();

                // state
                setData(users);
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

        fetchUsers();
    }, []);

    // UI
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p role="alert">{error}</p>;
    }

    if (data.length === 0) {
        return <p>No data.</p>;
    }

    return (
        <ul>
            {data.map(item => (
                <li key={item.id}>
                    {item.name}
                </li>
            ))}
        </ul>
    );

---

# 81. Головне

✔ `GET` використовується для отримання даних.

✔ У React GET часто виконується через `fetch()` всередині `useEffect`.

✔ `fetch()` повертає `Response`.

✔ JSON читається через:

    await response.json();

✔ `fetch()` не вважає 404/500 JavaScript-помилкою автоматично.

✔ HTTP status потрібно перевіряти:

    if (!response.ok) {
        throw new Error(...);
    }

✔ Для async UI потрібно думати про:

    loading
    error
    empty
    success

✔ `try/catch/finally` — базовий шаблон для асинхронного GET.

✔ `finally` зручно використовувати для:

    setLoading(false);

✔ У TypeScript краще явно описувати response:

    const data: User[] = await response.json();

✔ `any` для response краще не використовувати.

✔ GET зазвичай не повинен змінювати дані на сервері.

✔ Query parameters використовуються для:

    search
    filter
    sort
    pagination

✔ При зміні параметрів GET повинен виконуватися знову.

✔ Для скасування запиту використовується:

    AbortController

✔ При кількох одночасних запитах потрібно пам'ятати про:

    race conditions

✔ `[]` після успішного GET — це не помилка, а `empty state`.

✔ Не завжди потрібно прибирати старі дані під час повторного GET.

✔ Для простих компонентів достатньо:

    data
    loading
    error

✔ Для складніших систем корисно мислити через:

    idle
      ↓
    loading
      ↓
    success / error

---

# 82. Ключова формула

Запам'ятай цю послідовність:

    useEffect
        ↓
    fetch()
        ↓
    response
        ↓
    response.ok
        ↓
    response.json()
        ↓
    setState()
        ↓
    render UI

А для повного UI:

    GET
     ↓
    ┌───────────────┐
    │               │
    ↓               ↓
    loading       request
                    ↓
             ┌──────┴──────┐
             ↓             ↓
           success        error
             ↓             ↓
            data         error UI
             ↓
        ┌────┴────┐
        ↓         ↓
      empty      list
        ↓         ↓
      Empty      Data

---

# 83. Практичне завдання

Створи компонент:

    Users

Вимоги:

1. Виконати:

       GET /api/users

2. Створити тип:

       User

3. Зберігати користувачів у state.

4. Показувати:

       "Завантаження..."

   під час GET.

5. Обробляти HTTP error.

6. Обробляти network error.

7. Показувати:

       "Користувачів немає."

   якщо API повернув:

       []

8. Показати список користувачів.

9. Додати кнопку:

       "Повторити"

   при помилці.

10. Додати `AbortController`.

11. Не використовувати `any`.

Очікувана архітектура:

    Users
      │
      ├── loading
      │
      ├── error
      │
      ├── empty
      │
      └── users
            │
            ├── User
            ├── User
            └── User

Це хороша базова вправа перед переходом до `POST`, `PUT`, `PATCH` і `DELETE`.