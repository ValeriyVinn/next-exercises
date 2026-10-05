# Асинхронні дані (Async Data) у React

> `Async Data` — це дані, які надходять не одразу, а через деякий час у результаті асинхронної операції.
>
> У React це найчастіше:
>
> - дані з REST API;
> - HTTP-запити через `fetch()`;
> - дані з database через backend;
> - результати пошуку;
> - authentication data;
> - завантаження файлів;
> - будь-які операції, які завершуються пізніше.
>
> Основна ідея:
>
>     UI
>       ↓
>     async operation
>       ↓
>     loading
>       ↓
>     success / error
>       ↓
>     data
>       ↓
>     UI
>
> React-компонент повинен правильно представляти **всі стани асинхронних даних**, а не тільки успішний результат.

---

# 1. Що таке async data

Синхронне значення доступне одразу:

    const name = "Valeriy";

Асинхронні дані потрібно спочатку отримати:

    const response = await fetch("/api/users");

Між початком операції та результатом проходить час.

Наприклад:

    component renders
          ↓
    request starts
          ↓
    loading...
          ↓
    server responds
          ↓
    data received
          ↓
    UI renders data

---

# 2. Чому async data важлива в React

Звичайний React component може мати:

    data

Але при роботі з API потрібно враховувати щонайменше:

    loading
    success
    error

Тому модель часто виглядає так:

    loading
      ↓
    ┌───────────────┐
    │               │
    ↓               ↓
    success        error
    ↓               ↓
    data           message

---

# 3. Основні стани async data

Найпростіша модель:

    loading
    data
    error

Наприклад:

    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

Ці три значення описують стан асинхронної операції.

---

# 4. Чотири основні UI-стани

На практиці зручно мислити так:

    1. Initial
    2. Loading
    3. Success
    4. Error

Наприклад:

    Initial
       ↓
    Loading
       ↓
    Success

або:

    Initial
       ↓
    Loading
       ↓
    Error

---

# 5. Async data flow

Типовий flow:

    component mount
          ↓
    start request
          ↓
    setLoading(true)
          ↓
    fetch()
          ↓
    response
       ↙       ↘
    success    error
       ↓         ↓
    setData    setError
       ↓         ↓
    UI         error UI

---

# 6. Найпростіший приклад

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
        async function loadUsers() {
          try {
            const response = await fetch("/api/users");

            if (!response.ok) {
              throw new Error("Не вдалося отримати користувачів");
            }

            const data: User[] = await response.json();

            setUsers(data);
          } catch (error) {
            setError(
              error instanceof Error
                ? error.message
                : "Сталася невідома помилка"
            );
          } finally {
            setLoading(false);
          }
        }

        loadUsers();
      }, []);

      if (loading) {
        return <p>Завантаження...</p>;
      }

      if (error) {
        return <p>{error}</p>;
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

# 7. Що відбувається в цьому компоненті

Спочатку:

    loading = true
    error = null
    users = []

Потім:

    fetch("/api/users")

Поки request виконується:

    loading === true

Після успішної відповіді:

    setUsers(data)
    setLoading(false)

Після помилки:

    setError(...)
    setLoading(false)

---

# 8. Чому loading спочатку true

Для initial data fetching:

    const [loading, setLoading] = useState(true);

Це логічно, тому що:

> Компонент ще не має даних і вже почав їх отримувати.

Flow:

    component mounted
          ↓
    request starts
          ↓
    loading = true

---

# 9. POST/DELETE loading відрізняється

Для mutation operation часто:

    const [isLoading, setIsLoading] = useState(false);

Тому що запит ще не розпочався.

Наприклад:

    button
      ↓
    click
      ↓
    setIsLoading(true)
      ↓
    POST / DELETE

Для initial GET:

    loading = true

Для user-triggered mutation:

    loading = false

до моменту дії користувача.

---

# 10. Async data — це не тільки fetch()

Асинхронні дані можуть приходити з:

- REST API;
- GraphQL;
- WebSocket;
- IndexedDB;
- database через backend;
- browser APIs;
- файлових сервісів;
- authentication providers;
- third-party APIs.

Наприклад:

    async function getUser() {
      const response = await fetch("/api/user");

      return response.json();
    }

---

# 11. Promise

Асинхронна операція часто повертає:

    Promise

Наприклад:

    const promise = fetch("/api/users");

`fetch()` не повертає дані безпосередньо.

Він повертає:

    Promise<Response>

Тому:

    const response = await fetch("/api/users");

---

# 12. async / await

Типовий код:

    async function loadUsers() {
      const response = await fetch("/api/users");

      const data = await response.json();

      return data;
    }

Тут дві асинхронні операції:

    fetch()
      ↓
    response
      ↓
    response.json()
      ↓
    data

---

# 13. fetch() не означає "отримав JSON"

Важливо розрізняти:

    const response = await fetch("/api/users");

та:

    const data = await response.json();

Перше:

    HTTP Response

Друге:

    parsed response body

---

# 14. response.ok

`fetch()` не кидає exception просто через HTTP status:

    400
    401
    403
    404
    500

Тому:

    const response = await fetch("/api/users");

потрібно перевірити:

    if (!response.ok) {
      throw new Error("Request failed");
    }

---

# 15. Мережева помилка

Наприклад:

    fetch("/api/users")

може завершитися exception через:

- відсутність мережі;
- DNS problem;
- connection failure;
- CORS-related failure;
- інші network-level проблеми.

Тому:

    try {
      const response = await fetch("/api/users");
    } catch (error) {
      // network / thrown error
    }

---

# 16. HTTP error vs network error

Це важлива різниця.

### HTTP error

Сервер відповів:

    404
    500

`fetch()` зазвичай не кидає exception автоматично.

Потрібно:

    if (!response.ok) {
      throw new Error("HTTP error");
    }

### Network error

Запит не зміг нормально завершитися.

Тоді `fetch()` може перейти в:

    catch

---

# 17. Загальний error flow

    fetch()
       ↓
    ┌───────────────┐
    │               │
    ↓               ↓
    HTTP response   network failure
    ↓               ↓
    response.ok?    catch
    ↓
    ┌───────┐
    ↓       ↓
   yes      no
    ↓       ↓
  data    error

---

# 18. Loading state

Найпростіше:

    const [loading, setLoading] = useState(true);

Перед request:

    setLoading(true);

Після request:

    setLoading(false);

Найкраще використовувати:

    finally

Наприклад:

    try {
      ...
    } catch {
      ...
    } finally {
      setLoading(false);
    }

---

# 19. Чому finally зручний

Без `finally` можна випадково забути:

    setLoading(false);

Наприклад:

    try {
      const response = await fetch(...);

      if (!response.ok) {
        throw new Error("Failed");
      }

      setData(await response.json());
      setLoading(false);
    } catch (error) {
      setError("Error");

      // setLoading(false) легко забути
    }

Краще:

    try {
      ...
    } catch {
      ...
    } finally {
      setLoading(false);
    }

---

# 20. Error state

Наприклад:

    const [error, setError] =
      useState<string | null>(null);

Спочатку:

    error = null

При помилці:

    setError("Не вдалося завантажити дані");

UI:

    if (error) {
      return <p>{error}</p>;
    }

---

# 21. Data state

Наприклад:

    const [users, setUsers] =
      useState<User[]>([]);

Після response:

    const data: User[] = await response.json();

    setUsers(data);

React після `setUsers()` виконає rerender.

---

# 22. React render cycle

Типовий flow:

    render
      ↓
    useEffect
      ↓
    fetch
      ↓
    loading
      ↓
    response
      ↓
    setUsers
      ↓
    state update
      ↓
    rerender
      ↓
    users displayed

---

# 23. Чому fetch не робимо прямо в render

Не потрібно:

    function Users() {
      const response = fetch("/api/users");

      return <div>...</div>;
    }

Це неправильно.

Render повинен залишатися передбачуваним.

Асинхронний side effect потрібно запускати відповідним механізмом.

Для класичного client-side fetching це часто:

    useEffect()

---

# 24. useEffect і async data

Типовий pattern:

    useEffect(() => {
      async function loadData() {
        ...
      }

      loadData();
    }, []);

Тобто:

    render
      ↓
    effect
      ↓
    async request

---

# 25. Чому callback useEffect не роблять async напряму

Не рекомендується:

    useEffect(async () => {
      const response = await fetch("/api/users");
    }, []);

Краще:

    useEffect(() => {
      async function loadUsers() {
        const response = await fetch("/api/users");

        ...
      }

      loadUsers();
    }, []);

Причина:

`useEffect` callback повинен повертати cleanup function або нічого, а не Promise.

---

# 26. Initial loading

Типовий компонент:

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

На початку:

    users = []
    loading = true
    error = null

UI:

    if (loading) {
      return <p>Завантаження...</p>;
    }

---

# 27. Success state

Після успішного response:

    users = [...]
    loading = false
    error = null

UI:

    return (
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    );

---

# 28. Error state

Після помилки:

    users = []
    loading = false
    error = "Не вдалося завантажити дані"

UI:

    if (error) {
      return <p>{error}</p>;
    }

---

# 29. Async state як state machine

Корисно мислити не окремими змінними, а станами:

    Initial
       ↓
    Loading
       ↓
    Success

або:

    Initial
       ↓
    Loading
       ↓
    Error

Більш складно:

    Idle
    Loading
    Success
    Error
    Refetching

Це вже state machine thinking.

---

# 30. Проблема трьох незалежних state

Маємо:

    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

Теоретично можна отримати дивні комбінації:

    loading = true
    error = "Something went wrong"
    data = [...]

Або:

    loading = false
    error = null
    data = []

Що саме означає `data = []`?

- даних ще немає?
- дані успішно завантажені і список порожній?
- запит завершився помилкою?

Це важлива проблема.

---

# 31. Empty data ≠ loading

Наприклад:

    users = []

може означати:

### Loading

Дані ще не прийшли.

або:

### Success

Сервер повернув порожній список.

    []

Це різні стани.

Тому потрібно мати окремий:

    loading

---

# 32. Empty data ≠ error

Також:

    users = []

не означає:

    error

Можливо сервер чесно відповів:

    []

Тоді:

    loading = false
    error = null
    users = []

Це успішний запит із порожнім результатом.

---

# 33. Empty state

Тому UI може мати окремий стан:

    if (users.length === 0) {
      return <p>Користувачів поки немає.</p>;
    }

Flow:

    loading
      ↓
    success
      ↓
    users.length === 0
      ↓
    empty state

---

# 34. Чотири важливі UI-стани

Для списку:

    Loading
       ↓
    ┌───────────────┐
    ↓               ↓
    Error         Success
                    ↓
             ┌──────┴──────┐
             ↓             ↓
           Empty         Data
           state          list

Тобто:

    loading
    error
    empty
    data

---

# 35. Повний приклад із Empty State

    if (loading) {
      return <p>Завантаження...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (users.length === 0) {
      return <p>Користувачів немає.</p>;
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

---

# 36. Async data і UI

Хороший UI не показує лише:

    data

Він повинен передбачати:

    loading
    error
    empty
    success

Це одна з основ роботи з API у frontend.

---

# 37. Initial loading vs refetching

Це дуже важлива різниця.

### Initial loading

Дані ще жодного разу не завантажувалися.

    loading = true

UI може показати:

    Loading...

### Refetching

Дані вже є, але ми отримуємо свіжу версію.

    data = [...]
    isFetching = true

UI може залишити старі дані на екрані та показати маленький indicator:

    Users
    User 1
    User 2
    User 3

    Updating...

---

# 38. Чому не завжди треба ховати data під час refetch

Не завжди добре:

    if (loading) {
      return <Spinner />;
    }

при кожному запиті.

Якщо дані вже є, краще:

    data
      +
    small loading indicator

Тобто:

    old data
       ↓
    refetch
       ↓
    new data

а не:

    old data
       ↓
    blank screen
       ↓
    loading
       ↓
    new data

---

# 39. Приклад initial loading + refetching

    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);

`isLoading`:

> Даних ще немає.

`isFetching`:

> Зараз виконується request.

---

# 40. State model

Можна мислити так:

    isLoading
        ↓
    first request

    isFetching
        ↓
    any request

Наприклад:

    isLoading = true
    isFetching = true

Перший request.

Після:

    isLoading = false
    isFetching = false

Під час refetch:

    isLoading = false
    isFetching = true

---

# 41. Refetch

Refetch означає:

> Повторно отримати дані з сервера.

Наприклад:

    async function loadUsers() {
      ...
    }

Після натискання:

    <button onClick={loadUsers}>
      Оновити
    </button>

---

# 42. Простий refetch example

    async function loadUsers() {
      setIsFetching(true);
      setError(null);

      try {
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error("Не вдалося завантажити користувачів");
        }

        const data: User[] = await response.json();

        setUsers(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Невідома помилка"
        );
      } finally {
        setIsFetching(false);
        setIsLoading(false);
      }
    }

---

# 43. Але є нюанс із error при refetch

При initial loading:

    no data
      +
    error

можна показати error screen.

Але при refetch:

    old data
      +
    refetch error

можливо краще залишити старі дані та показати:

    "Не вдалося оновити дані."

Тобто:

    data = old data
    isFetching = false
    error = "Не вдалося оновити"

Це кращий UX у багатьох випадках.

---

# 44. Async data і stale data

`stale data` — дані, які можуть бути вже неактуальними.

Наприклад:

    UI:
    User balance = 100

На сервері:

    User balance = 120

Frontend ще не зробив refetch.

Отже:

    UI data = stale

Це нормальна проблема distributed/client-server applications.

---

# 45. Server state vs client state

Дуже важлива концепція.

### Client state

Дані, якими безпосередньо керує UI:

    modalOpen
    selectedTab
    inputValue
    sidebarOpen

### Server state

Дані, які належать серверу:

    users
    products
    posts
    orders
    profile
    comments

Async data часто є:

    server state

---

# 46. Чому server state особливий

Server state може:

- бути асинхронним;
- змінюватися поза межами React;
- бути stale;
- кешуватися;
- потребувати refetch;
- мати loading;
- мати error;
- бути shared між компонентами.

Тому server state складніший за звичайний:

    useState()

---

# 47. React state ≠ database

Наприклад:

    const [users, setUsers] = useState<User[]>([]);

це не database.

Це локальна копія даних для UI.

Справжнє джерело даних:

    PostgreSQL
        ↓
    Backend
        ↓
    API
        ↓
    React state

---

# 48. Source of truth

У full-stack застосунку часто:

    Database
        ↓
    source of truth

React може мати:

    cached representation

Тому після mutation:

    POST
    PATCH
    DELETE

frontend повинен подумати:

> Як синхронізувати UI із сервером?

---

# 49. Async data і synchronization

Основне питання:

    Server state
          ↕
    React state

Потрібно синхронізувати їх.

Наприклад:

    DELETE user
          ↓
    server state changed
          ↓
    React state update

---

# 50. Async data і race condition

Уявімо:

    request A
      ↓
    /api/users?page=1

Потім:

    request B
      ↓
    /api/users?page=2

Якщо B завершиться першим:

    page 2 data

а потім A:

    page 1 data

може статися:

    UI = page 1

хоча користувач уже вибрав:

    page 2

Це race condition.

---

# 51. AbortController

Для скасування fetch можна використовувати:

    AbortController

Наприклад:

    useEffect(() => {
      const controller = new AbortController();

      async function loadUsers() {
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

          const data: User[] =
            await response.json();

          setUsers(data);
        } catch (error) {
          if (error instanceof DOMException &&
              error.name === "AbortError") {
            return;
          }

          setError(
            error instanceof Error
              ? error.message
              : "Unknown error"
          );
        }
      }

      loadUsers();

      return () => {
        controller.abort();
      };
    }, []);

---

# 52. Навіщо AbortController

Наприклад:

    component mounted
          ↓
    fetch starts
          ↓
    component unmounts
          ↓
    request no longer needed

Cleanup:

    controller.abort()

Це допомагає скасувати непотрібний fetch.

---

# 53. AbortController і search

Особливо корисно для:

    search input

Користувач вводить:

    r

потім:

    re

потім:

    rea

потім:

    reac

потім:

    react

Можуть запуститися п'ять requests.

Скасування старих requests допомагає уникати зайвої роботи та race conditions.

---

# 54. Async search flow

    user types
       ↓
    search term
       ↓
    fetch
       ↓
    user types again
       ↓
    abort previous request
       ↓
    new fetch
       ↓
    latest data

---

# 55. Debounce

Ще одна техніка для search:

    debounce

Замість request після кожного символу:

    r
    re
    rea
    reac
    react

чекаємо невелику паузу.

Наприклад:

    user stops typing
          ↓
    wait
          ↓
    fetch

Debounce часто використовують для:

- search;
- autocomplete;
- filtering;
- suggestions.

---

# 56. Async data і pagination

Наприклад:

    GET /api/users?page=1

Потім:

    GET /api/users?page=2

State може містити:

    users
    page
    loading
    error
    hasNextPage

Flow:

    page 1
      ↓
    fetch
      ↓
    data
      ↓
    click Next
      ↓
    page 2
      ↓
    fetch
      ↓
    data

---

# 57. Async data і infinite scroll

Ще один варіант:

    scroll
      ↓
    near bottom
      ↓
    fetch next page
      ↓
    append data

Наприклад:

    setUsers((currentUsers) => [
      ...currentUsers,
      ...newUsers,
    ]);

Тут особливо важливі:

- loading state;
- duplicate prevention;
- pagination;
- race conditions;
- cancellation;
- error handling.

---

# 58. Async data і retry

При тимчасовій помилці можна запропонувати:

    Спробувати ще раз

Наприклад:

    <button onClick={loadUsers}>
      Спробувати ще раз
    </button>

Flow:

    request
      ↓
    error
      ↓
    Retry
      ↓
    request again

---

# 59. Retry не завжди безпечний

Для GET retry часто є нормальною операцією.

Але для mutation:

    POST
    DELETE

автоматичний retry може бути небезпечним.

Наприклад POST може створити ресурс двічі.

Тому retry strategy залежить від HTTP operation та API design.

---

# 60. Async GET vs mutation

Корисно розділяти:

### Query

Отримує дані:

    GET

### Mutation

Змінює дані:

    POST
    PUT
    PATCH
    DELETE

У сучасних data-fetching libraries це розділення дуже важливе.

---

# 61. GET як query

Наприклад:

    GET /api/users

отримує:

    users

---

# 62. POST як mutation

    POST /api/users

створює:

    user

---

# 63. PATCH як mutation

    PATCH /api/users/10

змінює:

    user 10

---

# 64. DELETE як mutation

    DELETE /api/users/10

видаляє:

    user 10

---

# 65. Async data і повторне використання логіки

Якщо багато компонентів роблять:

    loading
    error
    fetch
    data

код починає дублюватися.

Наприклад:

    Users
    Posts
    Products
    Comments

У кожному:

    useEffect
    fetch
    loading
    error

Це сигнал для абстракції.

---

# 66. Custom data-fetching hook

Наприклад:

    function useUsers() {
      const [users, setUsers] =
        useState<User[]>([]);

      const [loading, setLoading] =
        useState(true);

      const [error, setError] =
        useState<string | null>(null);

      useEffect(() => {
        async function loadUsers() {
          try {
            const response =
              await fetch("/api/users");

            if (!response.ok) {
              throw new Error(
                "Не вдалося завантажити користувачів"
              );
            }

            const data: User[] =
              await response.json();

            setUsers(data);
          } catch (error) {
            setError(
              error instanceof Error
                ? error.message
                : "Невідома помилка"
            );
          } finally {
            setLoading(false);
          }
        }

        loadUsers();
      }, []);

      return {
        users,
        loading,
        error,
      };
    }

Це вже тема наступного розділу:

    08-custom-data-fetching-hooks

---

# 67. Чому custom hook корисний

Компонент:

    const {
      users,
      loading,
      error,
    } = useUsers();

UI займається:

    rendering

Hook займається:

    data fetching

Це розділяє responsibilities.

---

# 68. Component vs data layer

Без абстракції:

    Component
      ↓
    fetch
      ↓
    API

З абстракцією:

    Component
      ↓
    useUsers()
      ↓
    API function
      ↓
    fetch()
      ↓
    API

У більшому застосунку:

    Component
      ↓
    custom hook
      ↓
    API client
      ↓
    HTTP
      ↓
    backend

---

# 69. API function

Ще один рівень:

    export async function getUsers(): Promise<User[]> {
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error(
          "Не вдалося завантажити користувачів"
        );
      }

      return response.json();
    }

Hook:

    useEffect(() => {
      getUsers()
        .then(setUsers)
        .catch(...)
        .finally(...);
    }, []);

---

# 70. Розділення responsibilities

Добра базова структура:

    Component
       ↓
    Hook
       ↓
    API function
       ↓
    fetch
       ↓
    Backend

### Component

Відповідає за UI.

### Hook

Відповідає за React lifecycle/state.

### API function

Відповідає за HTTP operation.

### Backend

Відповідає за business logic.

---

# 71. Async data і TypeScript

Маємо:

    type User = {
      id: number;
      name: string;
      email: string;
    };

State:

    const [users, setUsers] =
      useState<User[]>([]);

Це допомагає отримувати autocomplete та type checking.

---

# 72. Важливий нюанс TypeScript

Це:

    const data: User[] =
      await response.json();

не перевіряє JSON runtime.

TypeScript лише каже:

> Я очікую, що ці дані мають форму `User[]`.

Якщо backend поверне неправильну структуру, TypeScript у runtime її не перевірить.

---

# 73. Runtime validation

Для production application можна використовувати schema validation.

Наприклад, концептуально:

    API response
        ↓
    runtime validation
        ↓
    valid data
        ↓
    application

Для цього можуть використовуватися schema validation libraries.

На базовому рівні достатньо розуміти:

> TypeScript type ≠ runtime validation.

---

# 74. Async data і nullable state

Для одного ресурсу часто:

    const [user, setUser] =
      useState<User | null>(null);

Спочатку:

    user = null

Після завантаження:

    user = {
      id: 1,
      name: "Valeriy",
      email: "..."
    }

Тоді:

    if (!user) {
      return <p>Loading...</p>;
    }

---

# 75. Один ресурс vs список

Один ресурс:

    const [user, setUser] =
      useState<User | null>(null);

Список:

    const [users, setUsers] =
      useState<User[]>([]);

Це різні моделі даних.

---

# 76. Loading одного ресурсу

    if (loading) {
      return <p>Завантаження користувача...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (!user) {
      return <p>Користувача не знайдено.</p>;
    }

    return (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    );

---

# 77. Loading списку

    if (loading) {
      return <p>Завантаження...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (users.length === 0) {
      return <p>Даних немає.</p>;
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

---

# 78. Conditional rendering

Async UI дуже часто використовує:

    if (loading) {
      ...
    }

    if (error) {
      ...
    }

    if (empty) {
      ...
    }

    return data;

Це простий і зрозумілий pattern.

---

# 79. Не потрібно робити надмірно складний JSX

Не обов'язково:

    return (
      <>
        {loading
          ? ...
          : error
          ? ...
          : users.length === 0
          ? ...
          : ...}
      </>
    );

Краще для складної логіки:

    if (loading) {
      return ...;
    }

    if (error) {
      return ...;
    }

    if (users.length === 0) {
      return ...;
    }

    return ...;

Це легше читати.

---

# 80. Async data і Suspense

React має концепцію:

    Suspense

Вона дозволяє будувати UI навколо компонентів, які можуть "suspend" під час отримання даних.

Наприклад, концептуально:

    <Suspense fallback={<Loading />}>
      <Users />
    </Suspense>

`Suspense` — важлива частина сучасного React, але його data-fetching behavior залежить від конкретного framework та бібліотеки.

Для базового `fetch()` + `useEffect` достатньо спочатку добре зрозуміти:

    loading
    error
    data

---

# 81. Async data у Next.js

У Next.js частина data fetching може виконуватися на сервері.

Тоді архітектура може бути:

    Browser
      ↓
    Next.js
      ↓
    Backend / API
      ↓
    Database

або:

    Server Component
      ↓
    API / database
      ↓
    HTML / RSC payload
      ↓
    Browser

Це відрізняється від класичного client-side:

    Browser
      ↓
    useEffect
      ↓
    fetch
      ↓
    API

Тому потрібно розрізняти:

    client-side data fetching

і:

    server-side data fetching

---

# 82. Client-side fetching

Типовий варіант:

    useEffect(() => {
      fetch("/api/users");
    }, []);

Дані завантажуються після render у браузері.

---

# 83. Server-side fetching

У framework, який підтримує server components, дані можуть бути отримані на сервері до того, як UI стане доступним клієнту.

Це вже окрема архітектурна тема.

Головне:

> `async data` — це загальна концепція, а `useEffect + fetch` — лише один зі способів її реалізації.

---

# 84. Async data і caching

Якщо кожен компонент робить:

    fetch("/api/users")

можуть виникати:

- duplicate requests;
- зайві network calls;
- stale data;
- складність synchronization.

Тому production applications часто використовують caching/data-fetching solutions.

Наприклад, концептуально:

    Component
        ↓
    Data cache
        ↓
    API

---

# 85. Data-fetching libraries

Для складніших застосунків можна використовувати спеціалізовані бібліотеки.

Наприклад:

- TanStack Query;
- SWR;
- framework-specific data fetching.

Вони можуть допомагати з:

- caching;
- refetching;
- mutations;
- retries;
- stale data;
- synchronization;
- loading states;
- error states.

---

# 86. Чому не потрібно одразу використовувати library

Спочатку важливо зрозуміти:

    fetch()
      ↓
    Promise
      ↓
    async/await
      ↓
    loading
      ↓
    success
      ↓
    error
      ↓
    React state
      ↓
    UI

Після цього library стає набагато зрозумілішою.

Інакше можна просто запам'ятати API бібліотеки, не розуміючи проблеми, яку вона вирішує.

---

# 87. Async data — базова модель

Запам'ятай:

    async data
      =
    data
    +
    loading
    +
    error
    +
    synchronization

Для хорошого UI часто також:

    empty
    +
    refetching
    +
    stale data

---

# 88. Повний практичний компонент

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

      async function loadUsers() {
        setError(null);

        try {
          const response = await fetch("/api/users");

          if (!response.ok) {
            throw new Error(
              "Не вдалося завантажити користувачів"
            );
          }

          const data: User[] = await response.json();

          setUsers(data);
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : "Сталася невідома помилка"
          );
        } finally {
          setLoading(false);
        }
      }

      useEffect(() => {
        loadUsers();
      }, []);

      if (loading) {
        return (
          <p>
            Завантаження...
          </p>
        );
      }

      if (error) {
        return (
          <div>
            <p>{error}</p>

            <button
              type="button"
              onClick={loadUsers}
            >
              Спробувати ще раз
            </button>
          </div>
        );
      }

      if (users.length === 0) {
        return (
          <p>
            Користувачів поки немає.
          </p>
        );
      }

      return (
        <section>
          <div>
            <button
              type="button"
              onClick={loadUsers}
            >
              Оновити
            </button>
          </div>

          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <strong>
                  {user.name}
                </strong>

                <span>
                  {user.email}
                </span>
              </li>
            ))}
          </ul>
        </section>
      );
    }

---

# 89. Покращення компонента: isFetching

У реальному UI можна розділити:

    isLoading

і:

    isFetching

Наприклад:

    const [isLoading, setIsLoading] =
      useState(true);

    const [isFetching, setIsFetching] =
      useState(false);

Перший request:

    isLoading = true
    isFetching = true

Після:

    isLoading = false
    isFetching = false

Refetch:

    isLoading = false
    isFetching = true

---

# 90. UI при refetch

Наприклад:

    return (
      <section>
        <div>
          <button
            type="button"
            onClick={loadUsers}
            disabled={isFetching}
          >
            {isFetching
              ? "Оновлення..."
              : "Оновити"}
          </button>
        </div>

        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      </section>
    );

Старі дані залишаються на екрані.

---

# 91. Async data і state transition

Корисно мислити переходами:

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

Після retry:

    error
      ↓
    loading
      ↓
    success

Після refetch:

    success
      ↓
    fetching
      ↓
    success

або:

    success
      ↓
    fetching
      ↓
    error + stale data

---

# 92. Async data та UX

Користувач повинен розуміти:

### Що зараз відбувається?

    Loading...

### Чи сталася помилка?

    Не вдалося завантажити дані.

### Чи є дані?

    User list

### Чи є дані, але список порожній?

    Користувачів немає.

### Чи оновлюються дані?

    Оновлення...

Це і є хороша async UI model.

---

# 93. Типові помилки

## 1. Не перевіряти response.ok

Неправильно:

    const response = await fetch("/api/users");

    const data = await response.json();

Правильно:

    const response = await fetch("/api/users");

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();

---

# 94. Типова помилка №2 — забули loading

Неправильно:

    const [users, setUsers] = useState<User[]>([]);

Тоді:

    users = []

може бути незрозуміло.

Краще мати:

    const [loading, setLoading] = useState(true);

---

# 95. Типова помилка №3 — не обробили error

Неправильно:

    useEffect(() => {
      fetch("/api/users")
        .then((response) => response.json())
        .then(setUsers);
    }, []);

Краще мати error handling.

---

# 96. Типова помилка №4 — неправильний loading

Неправильно:

    setLoading(false);

до завершення request.

Loading повинен означати:

> Асинхронна операція ще триває.

---

# 97. Типова помилка №5 — response.json() без await

Неправильно:

    const data = response.json();

Правильно:

    const data = await response.json();

або:

    response.json().then(...);

---

# 98. Типова помилка №6 — useEffect async напряму

Небажано:

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

# 99. Типова помилка №7 — fetch під час render

Неправильно:

    function Users() {
      fetch("/api/users");

      return <div>Users</div>;
    }

Це може запускати requests при кожному render.

---

# 100. Типова помилка №8 — не розрізняємо empty і loading

    users.length === 0

не означає автоматично:

    loading

Потрібно перевірити:

    loading

окремо.

---

# 101. Типова помилка №9 — не розрізняємо HTTP error і network error

Потрібно розуміти:

    404
    500

і:

    network failure

це різні ситуації.

---

# 102. Типова помилка №10 — надмірний useEffect

Не кожна async operation повинна бути в:

    useEffect

Наприклад mutation після натискання кнопки:

    onClick
      ↓
    POST / DELETE

А initial client-side GET часто:

    useEffect
      ↓
    GET

Потрібно розуміти, **коли саме повинна запускатися операція**.

---

# 103. Типова помилка №11 — не враховуємо unmount

Request може тривати після того, як component більше не потрібен.

Для складніших сценаріїв можна використовувати:

    AbortController

---

# 104. Типова помилка №12 — TypeScript як runtime validation

Неправильно думати:

    const data: User[] =
      await response.json();

означає:

> API точно повернуло User[].

Ні.

Це лише TypeScript typing.

---

# 105. Типова помилка №13 — дублювання data fetching

Якщо десять компонентів окремо роблять:

    fetch("/api/users")

може з'явитися:

- duplicate requests;
- duplicated logic;
- inconsistent loading;
- inconsistent errors.

Це сигнал для кращої data layer.

---

# 106. Типова помилка №14 — ховаємо старі дані при кожному refetch

Не завжди потрібно:

    setUsers([]);

перед кожним запитом.

Інакше UI може мигати:

    data
      ↓
    empty
      ↓
    loading
      ↓
    data

Краще часто залишати старі дані під час refetch.

---

# 107. Типова помилка №15 — автоматичний retry без розуміння операції

Retry для:

    GET

часто безпечніший.

Retry для:

    POST

може створити дублікати.

Тому retry strategy повинна враховувати тип операції.

---

# 108. Питання зі співбесіди

### 1. Що таке async data?

Дані, які отримуються або обчислюються асинхронно і стають доступними пізніше.

---

### 2. Які основні стани потрібно враховувати?

Мінімально:

    loading
    success
    error

Для хорошого UI часто також:

    empty
    refetching
    stale data

---

### 3. Чим відрізняється loading від empty?

`loading`:

> Дані ще отримуються.

`empty`:

> Дані успішно отримані, але результат порожній.

---

### 4. Чим HTTP error відрізняється від network error?

HTTP error:

    404
    500

Сервер відповів, але статус означає помилку.

Network error:

> Запит не зміг нормально отримати HTTP response.

---

### 5. Чи кидає fetch exception при 404?

Ні.

Потрібно перевіряти:

    response.ok

---

### 6. Навіщо потрібен finally?

Щоб гарантовано виконати cleanup logic, наприклад:

    setLoading(false);

---

### 7. Чому не можна робити useEffect(async () => {})?

Тому що callback `useEffect` не повинен повертати Promise.

---

### 8. Де краще виконувати initial client-side fetch?

У класичному React-підході:

    useEffect

---

### 9. Чи всі async operations потрібно виконувати через useEffect?

Ні.

Mutation після дії користувача зазвичай виконується в event handler:

    onClick
    onSubmit

---

### 10. Що таке server state?

Дані, джерелом яких є сервер і які можуть бути асинхронними, stale та змінюватися незалежно від поточного UI.

---

### 11. Чим server state відрізняється від client state?

Client state:

    modalOpen
    selectedTab

Server state:

    users
    products
    orders

---

### 12. Що таке refetch?

Повторне отримання даних із сервера.

---

### 13. Що таке stale data?

Дані, які є локально доступними, але можуть уже не відповідати поточному стану сервера.

---

### 14. Навіщо AbortController?

Для скасування fetch request, коли він більше не потрібен.

---

### 15. Що таке race condition?

Ситуація, коли кілька асинхронних операцій завершуються в іншому порядку, ніж очікувалося, і старі дані можуть перезаписати нові.

---

### 16. Навіщо потрібні data-fetching libraries?

Для вирішення складніших задач:

    caching
    refetching
    mutations
    retries
    stale data
    synchronization

---

# 109. Рівень Core

Потрібно знати:

- Promise;
- `async`;
- `await`;
- `fetch()`;
- `response.ok`;
- `response.json()`;
- `try/catch`;
- `finally`;
- HTTP status codes;
- React state;
- `useEffect`;
- loading;
- error;
- success;
- empty state;
- conditional rendering.

---

# 110. Рівень Junior

Потрібно вміти:

- отримувати дані через `fetch()`;
- використовувати `useEffect`;
- створювати loading state;
- створювати error state;
- перевіряти `response.ok`;
- типізувати API data;
- показувати empty state;
- робити retry;
- робити refetch;
- відокремлювати GET від mutation;
- оновлювати React state після response;
- використовувати `AbortController` у простих сценаріях.

---

# 111. Рівень Middle

Потрібно розуміти:

- server state;
- client state;
- stale data;
- refetching;
- caching;
- race conditions;
- cancellation;
- debounce;
- pagination;
- infinite scroll;
- optimistic updates;
- custom hooks;
- API layer;
- error strategies;
- retry strategies;
- data synchronization.

---

# 112. Рівень Senior

Потрібно мислити всією системою:

    Browser
      ↓
    React
      ↓
    Data layer
      ↓
    Cache
      ↓
    API client
      ↓
    HTTP
      ↓
    Backend
      ↓
    Database

І враховувати:

- consistency;
- caching strategy;
- invalidation;
- concurrency;
- race conditions;
- cancellation;
- retries;
- idempotency;
- pagination;
- synchronization;
- server rendering;
- client rendering;
- observability;
- error monitoring;
- performance.

---

# 113. Практична вправа №1

Створи:

    UsersList

API:

    GET /api/users

Потрібно реалізувати:

    loading
    error
    empty
    success

UI:

    Loading...
    Error
    "Користувачів немає"
    User list

---

# 114. Практична вправа №2

Додай:

    [Оновити]

При натисканні:

    fetch()
      ↓
    update users

Не очищуй старі дані під час refetch.

Покажи:

    Оновлення...

---

# 115. Практична вправа №3

Додай:

    [Спробувати ще раз]

Після error:

    error
      ↓
    Retry
      ↓
    fetch()
      ↓
    success / error

---

# 116. Практична вправа №4

Додай пошук:

    <input />

Користувач вводить:

    react

Запит:

    GET /api/users?search=react

Навчися розуміти:

- query parameters;
- debounce;
- cancellation;
- race conditions.

---

# 117. Практична вправа №5

Зроби:

    Users CRUD

    GET
    POST
    PATCH
    DELETE

І реалізуй:

    loading
    error
    empty
    refetch
    mutation states

Тоді ти побачиш повну картину:

    CRUD
      +
    async data
      +
    React state

---

# 118. Практична вправа №6

Винеси:

    getUsers()

в окремий файл:

    api/users.ts

Наприклад:

    export async function getUsers(): Promise<User[]> {
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error(
          "Не вдалося завантажити користувачів"
        );
      }

      return response.json();
    }

---

# 119. Практична вправа №7

Створи:

    useUsers()

який повертає:

    {
      users,
      loading,
      error,
      refetch
    }

Тоді component займається тільки UI.

Це хороша підготовка до наступного розділу:

    08-custom-data-fetching-hooks

---

# 120. Async Data Cheat Sheet

## Базова модель

    data
    loading
    error

---

## Для списку

    users
    loading
    error

---

## Для одного ресурсу

    user
    loading
    error

---

## Empty state

    loading === false
    error === null
    data.length === 0

---

## GET

    const response = await fetch("/api/users");

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data: User[] =
      await response.json();

---

## useEffect

    useEffect(() => {
      async function loadData() {
        ...
      }

      loadData();
    }, []);

---

## Error

    try {
      ...
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unknown error"
      );
    }

---

## Loading

    try {
      setLoading(true);

      ...
    } finally {
      setLoading(false);
    }

---

## Refetch

    await loadData();

---

## AbortController

    const controller =
      new AbortController();

    fetch(url, {
      signal: controller.signal,
    });

    controller.abort();

---

# 121. Головна схема Async Data

Запам'ятай:

    COMPONENT
        ↓
    REQUEST
        ↓
    LOADING
        ↓
    ┌───────────────────┐
    ↓                   ↓
    SUCCESS             ERROR
    ↓                   ↓
    DATA               MESSAGE
    ↓
    EMPTY / CONTENT
    ↓
    UI

---

# 122. Головна схема Server State

    DATABASE
        ↓
    BACKEND
        ↓
    API
        ↓
    HTTP
        ↓
    REACT
        ↓
    STATE / CACHE
        ↓
    UI

React не є джерелом істини для server data.

Він представляє серверні дані у своєму UI.

---

# 123. Головне

✔ Async data — це дані, які приходять не одразу.

✔ Найчастіше вони надходять через API.

✔ `fetch()` повертає Promise.

✔ `await fetch()` дає `Response`.

✔ `await response.json()` дає parsed body.

✔ `fetch()` не кидає exception просто через `404` або `500`.

✔ Потрібно перевіряти:

    response.ok

✔ Для async UI потрібно враховувати щонайменше:

    loading
    success
    error

✔ Для хорошого UI часто потрібен також:

    empty state

✔ `[]` може означати успішний порожній результат, а не loading.

✔ `useEffect` — один із способів запускати initial client-side data fetching.

✔ Mutation після дії користувача зазвичай запускається через event handler.

✔ `finally` зручний для:

    setLoading(false)

✔ Server state і client state — різні концепції.

✔ Server data може бути stale.

✔ `refetch` означає повторне отримання даних.

✔ `AbortController` допомагає скасовувати непотрібні requests.

✔ Async requests можуть створювати race conditions.

✔ TypeScript type не є runtime validation.

✔ У великих застосунках data fetching часто виносять у:

    custom hooks
    API layer
    data-fetching libraries

---

# 124. Ключова формула

Запам'ятай:

    ASYNC DATA

        ↓

    request
        ↓
    loading
        ↓
    ┌───────────────┐
    ↓               ↓
    success        error
    ↓               ↓
    data           message
    ↓
    ┌───────────────┐
    ↓               ↓
    empty          content
    ↓
    UI

А для повного React/full-stack мислення:

    USER
      ↓
    REACT UI
      ↓
    EVENT / EFFECT
      ↓
    ASYNC REQUEST
      ↓
    API
      ↓
    BACKEND
      ↓
    DATABASE
      ↓
    RESPONSE
      ↓
    SERVER STATE
      ↓
    REACT STATE / CACHE
      ↓
    UI

Саме розуміння цього циклу є фундаментом для подальших тем:

    custom data-fetching hooks
          ↓
    caching
          ↓
    mutations
          ↓
    optimistic updates
          ↓
    TanStack Query / SWR
          ↓
    складна server-state architecture