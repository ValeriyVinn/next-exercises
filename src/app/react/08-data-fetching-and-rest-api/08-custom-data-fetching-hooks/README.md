# Custom Data Fetching Hooks у React

## 📁 Розташування

    react/
    ├── 📁 08-data-fetching-and-rest-api
    │   ├── 📁 01-fetch
    │   ├── 📁 02-loading-and-error
    │   ├── 📁 03-get
    │   ├── 📁 04-post
    │   ├── 📁 05-put-and-patch
    │   ├── 📁 06-delete
    │   ├── 📁 07-async-data
    │   └── 📁 08-custom-data-fetching-hooks
    │       └── README.md   ← цей файл

---

# 1. Що таке Custom Data Fetching Hook?

**Custom Data Fetching Hook** — це власний React Hook, який інкапсулює логіку отримання даних із API.

Замість того щоб повторювати в кожному компоненті:

    useState()
    useEffect()
    fetch()
    loading
    error
    response.ok
    response.json()

ми переносимо цю логіку в окремий Hook.

Наприклад:

    function Users() {
      const { data, loading, error } = useUsers();

      // UI
    }

Замість:

    function Users() {
      const [users, setUsers] = useState<User[]>([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        async function fetchUsers() {
          setLoading(true);
          setError(null);

          try {
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
        }

        fetchUsers();
      }, []);

      // UI
    }

---

# 2. Навіщо потрібні Custom Hooks?

Основна мета:

> **винести повторювану логіку з компонентів і зробити її повторно використовуваною.**

Наприклад, у застосунку є:

    UsersPage
    ProductsPage
    OrdersPage
    PostsPage

У кожному компоненті може бути однакова логіка:

    fetch()
    loading
    error
    response.ok
    response.json()

Це призводить до дублювання.

Custom Hook дозволяє зробити:

    useUsers()
    useProducts()
    useOrders()
    usePosts()

---

# 3. Основна ідея

Замість:

    Component
        ↓
    useState
        ↓
    useEffect
        ↓
    fetch
        ↓
    API

отримуємо:

    Component
        ↓
    Custom Hook
        ↓
    API function
        ↓
    fetch
        ↓
    Backend

Наприклад:

    UsersPage
        ↓
    useUsers()
        ↓
    getUsers()
        ↓
    fetch("/api/users")
        ↓
    Backend
        ↓
    Database

---

# 4. Що повинен робити Custom Data Fetching Hook?

Хороший Hook може відповідати за:

- запуск запиту;
- збереження отриманих даних;
- стан `loading`;
- стан `error`;
- повторний запит (`refetch`);
- скасування запиту;
- обробку HTTP-помилок;
- залежності запиту;
- параметри запиту;
- іноді кешування.

Наприклад:

    const {
      data,
      loading,
      error,
      refetch,
    } = useUsers();

Компонент отримує готовий інтерфейс.

---

# 5. Найпростіший Custom Hook

Почнемо з простого прикладу.

    import { useEffect, useState } from "react";

    type User = {
      id: number;
      name: string;
      email: string;
    };

    export function useUsers() {
      const [users, setUsers] = useState<User[]>([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        async function fetchUsers() {
          setLoading(true);
          setError(null);

          try {
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
        }

        fetchUsers();
      }, []);

      return {
        users,
        loading,
        error,
      };
    }

---

# 6. Використання Hook у компоненті

Тепер компонент стає набагато простішим.

    import { useUsers } from "./useUsers";

    export function Users() {
      const {
        users,
        loading,
        error,
      } = useUsers();

      if (loading) {
        return <p>Loading...</p>;
      }

      if (error) {
        return <p>Error: {error}</p>;
      }

      if (users.length === 0) {
        return <p>No users found.</p>;
      }

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

Компонент тепер переважно відповідає за **UI**.

Hook відповідає за **data fetching**.

---

# 7. Правило іменування Custom Hook

Custom Hook повинен починатися з:

    use

Наприклад:

    useUsers()
    useProducts()
    usePosts()
    useOrders()
    useUser()
    useProduct()
    useFetch()
    useApi()
    useDebouncedValue()

Не:

    users()
    fetchUsersHook()
    getUsersHook()

Правильно:

    useUsers()

---

# 8. Чому слово `use` важливе?

React визначає Hook за правилом:

> Назва Custom Hook повинна починатися з `use`.

Наприклад:

    useUsers
    useProducts
    useAuth
    useForm

Це дозволяє React та інструментам аналізу коду розуміти, що функція використовує Hooks.

---

# 9. Custom Hook не є компонентом

Це важлива різниця.

Компонент:

    function Users() {
      return <div>Users</div>;
    }

Custom Hook:

    function useUsers() {
      // Hook logic

      return {
        users,
        loading,
        error,
      };
    }

Компонент повертає:

    JSX

Hook повертає:

    data
    state
    functions
    objects
    values

---

# 10. Hook може використовувати інші Hooks

Custom Hook може використовувати:

    useState()
    useEffect()
    useMemo()
    useCallback()
    useRef()
    useContext()

Наприклад:

    function useUsers() {
      const [users, setUsers] = useState<User[]>([]);
      const [loading, setLoading] = useState(false);

      useEffect(() => {
        // fetch
      }, []);

      return {
        users,
        loading,
      };
    }

Тобто Custom Hook — це спосіб **компонувати React Hooks**.

---

# 11. Правила Hooks

Custom Hook також повинен дотримуватися Rules of Hooks.

## ✔ Hooks викликаємо на верхньому рівні

Правильно:

    function useUsers() {
      const [users, setUsers] = useState<User[]>([]);

      useEffect(() => {
        // ...
      }, []);

      return users;
    }

Неправильно:

    function useUsers() {
      if (someCondition) {
        const [users, setUsers] = useState<User[]>([]);
      }

      // ...
    }

---

# 12. Не викликаємо Hook всередині циклу

Неправильно:

    for (const item of items) {
      const data = useSomething(item);
    }

Hooks не повинні викликатися залежно від кількості елементів.

---

# 13. Не викликаємо Hook всередині звичайної функції

Неправильно:

    function getUsers() {
      const users = useUsers();

      return users;
    }

Custom Hook потрібно використовувати:

- у React component;
- або в іншому Custom Hook.

---

# 14. Розділення API-функції та Hook

Ще краща архітектура:

    Component
        ↓
    Custom Hook
        ↓
    API function
        ↓
    fetch
        ↓
    Backend

Наприклад:

    api/
      users.ts

    hooks/
      useUsers.ts

    components/
      Users.tsx

---

# 15. API function

Функція API відповідає за HTTP-запит.

    type User = {
      id: number;
      name: string;
      email: string;
    };

    export async function getUsers(): Promise<User[]> {
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      return response.json();
    }

Тут немає:

    useState
    useEffect

Це просто асинхронна JavaScript-функція.

---

# 16. Custom Hook

Тепер Hook використовує API function.

    import { useEffect, useState } from "react";
    import { getUsers } from "../api/users";

    export function useUsers() {
      const [users, setUsers] = useState<User[]>([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        async function loadUsers() {
          setLoading(true);
          setError(null);

          try {
            const data = await getUsers();

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
        }

        loadUsers();
      }, []);

      return {
        users,
        loading,
        error,
      };
    }

---

# 17. Чому це краще?

Компонент:

    function Users() {
      const {
        users,
        loading,
        error,
      } = useUsers();

      // UI
    }

Hook:

    useUsers()

відповідає за React state та lifecycle.

API:

    getUsers()

відповідає за HTTP.

Backend:

    /api/users

відповідає за серверну логіку.

Database:

    PostgreSQL

відповідає за зберігання даних.

---

# 18. Separation of Concerns

Це називається:

**Separation of Concerns**

Тобто:

    UI
      ↓
    Hook
      ↓
    API
      ↓
    Backend
      ↓
    Database

Кожен рівень має свою відповідальність.

---

# 19. `useFetch` — універсальний Hook

Можна створити більш загальний Hook.

    function useFetch<T>(url: string) {
      const [data, setData] = useState<T | null>(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch(url);

            if (!response.ok) {
              throw new Error("Request failed");
            }

            const result: T = await response.json();

            setData(result);
          } catch (error) {
            setError(
              error instanceof Error
                ? error.message
                : "Unknown error"
            );
          } finally {
            setLoading(false);
          }
        }

        fetchData();
      }, [url]);

      return {
        data,
        loading,
        error,
      };
    }

---

# 20. Навіщо потрібен generic `<T>`?

Наприклад:

    useFetch<User[]>("/api/users")

означає:

    T = User[]

А:

    useFetch<Product[]>("/api/products")

означає:

    T = Product[]

Таким чином один Hook може працювати з різними типами даних.

---

# 21. Приклад `useFetch<User[]>`

    type User = {
      id: number;
      name: string;
      email: string;
    };

    function Users() {
      const {
        data,
        loading,
        error,
      } = useFetch<User[]>("/api/users");

      if (loading) {
        return <p>Loading...</p>;
      }

      if (error) {
        return <p>{error}</p>;
      }

      return (
        <ul>
          {data?.map(user => (
            <li key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      );
    }

---

# 22. Але універсальний `useFetch` має межі

На перший погляд:

    useFetch<T>()

здається ідеальним рішенням.

Але реальний application швидко потребує:

    GET
    POST
    PUT
    PATCH
    DELETE
    headers
    authorization
    query parameters
    body
    AbortController
    retry
    refetch
    caching
    pagination
    mutations

Тому надто універсальний Hook може стати складним.

---

# 23. Спеціалізовані Hooks

Часто краще мати:

    useUsers()
    useUser(id)
    useProducts()
    useProduct(id)
    useOrders()

ніж один величезний:

    useEverything()

Наприклад:

    const {
      users,
      loading,
      error,
      refetch,
    } = useUsers();

Такий API Hook набагато зрозуміліший.

---

# 24. Hook для одного ресурсу

Наприклад:

    useUser(id)

    type User = {
      id: number;
      name: string;
      email: string;
    };

    export function useUser(id: number) {
      const [user, setUser] = useState<User | null>(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        async function loadUser() {
          setLoading(true);
          setError(null);

          try {
            const response = await fetch(`/api/users/${id}`);

            if (!response.ok) {
              throw new Error("Failed to fetch user");
            }

            const data: User = await response.json();

            setUser(data);
          } catch (error) {
            setError(
              error instanceof Error
                ? error.message
                : "Unknown error"
            );
          } finally {
            setLoading(false);
          }
        }

        loadUser();
      }, [id]);

      return {
        user,
        loading,
        error,
      };
    }

---

# 25. Dependency у `useEffect`

Зверніть увагу:

    }, [id]);

Якщо:

    id = 1

Hook завантажує:

    /api/users/1

Якщо:

    id = 2

React запускає effect знову:

    /api/users/2

Тобто параметр Hook може керувати запитом.

---

# 26. Custom Hook з параметрами

Наприклад:

    useUsers({
      page: 1,
      limit: 20,
    });

Hook:

    type UseUsersOptions = {
      page: number;
      limit: number;
    };

    function useUsers({
      page,
      limit,
    }: UseUsersOptions) {
      // ...
    }

Це зручно для:

    pagination
    filtering
    sorting
    searching

---

# 27. Query parameters

Наприклад:

    /api/users?page=1&limit=20

API function:

    export async function getUsers(
      page: number,
      limit: number
    ): Promise<User[]> {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      const response = await fetch(
        `/api/users?${params}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      return response.json();
    }

---

# 28. Hook з pagination

    function useUsers(
      page: number,
      limit: number
    ) {
      const [users, setUsers] = useState<User[]>([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        async function loadUsers() {
          setLoading(true);
          setError(null);

          try {
            const data = await getUsers(page, limit);

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
        }

        loadUsers();
      }, [page, limit]);

      return {
        users,
        loading,
        error,
      };
    }

---

# 29. `refetch()`

Дуже корисна можливість — дозволити компоненту повторити запит.

Наприклад:

    const {
      users,
      loading,
      error,
      refetch,
    } = useUsers();

Кнопка:

    <button onClick={refetch}>
      Refresh
    </button>

---

# 30. Простий `refetch`

Один із варіантів — зберігати спеціальний counter.

    const [refreshKey, setRefreshKey] = useState(0);

    const refetch = () => {
      setRefreshKey(value => value + 1);
    };

    useEffect(() => {
      async function loadUsers() {
        // fetch
      }

      loadUsers();
    }, [refreshKey]);

Кожен виклик:

    refetch()

змінює:

    refreshKey

і запускає effect повторно.

---

# 31. Більш зрозуміла структура Hook

    function useUsers() {
      const [users, setUsers] = useState<User[]>([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);
      const [refreshKey, setRefreshKey] = useState(0);

      const refetch = () => {
        setRefreshKey(value => value + 1);
      };

      useEffect(() => {
        async function loadUsers() {
          setLoading(true);
          setError(null);

          try {
            const data = await getUsers();

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
        }

        loadUsers();
      }, [refreshKey]);

      return {
        users,
        loading,
        error,
        refetch,
      };
    }

---

# 32. `isLoading` та `isFetching`

У простих прикладах достатньо:

    loading

Але в реальних застосунках корисно розрізняти:

    isLoading
    isFetching

Наприклад:

**`isLoading`**

Перший запит, даних ще немає.

**`isFetching`**

Будь-який запит зараз виконується, навіть якщо старі дані вже є.

---

# 33. Навіщо розділяти `isLoading` та `isFetching`?

Уявімо:

    users = [Alice, Bob, John]

Користувач натиснув:

    Refresh

Не обов'язково прибирати список.

Можна показати:

    Alice
    Bob
    John

і поруч:

    Updating...

Тобто:

    data = старі дані
    isFetching = true

Це дає кращий UX.

---

# 34. Типовий стан data fetching

Зручно мислити такими станами:

    idle
      ↓
    loading
      ↓
    success
      ↓
    refetching

або:

    idle
      ↓
    loading
      ↓
    error

Також:

    success
      ↓
    refetching
      ↓
    success

---

# 35. `status` замість багатьох boolean

Іноді можна використовувати:

    type Status =
      | "idle"
      | "loading"
      | "success"
      | "error";

Наприклад:

    const [status, setStatus] =
      useState<Status>("idle");

Це може бути зрозуміліше, ніж:

    loading
    success
    error

Особливо у складній логіці.

---

# 36. Data + error + status

Наприклад:

    type Status =
      | "idle"
      | "loading"
      | "success"
      | "error";

    const [data, setData] =
      useState<User[] | null>(null);

    const [status, setStatus] =
      useState<Status>("idle");

    const [error, setError] =
      useState<string | null>(null);

---

# 37. `null` і `[]` — різні речі

Для одного ресурсу:

    User | null

`null` означає:

    даних ще немає

Для списку:

    User[]

Порожній масив:

    []

може означати:

    запит успішний,
    але користувачів немає.

Тому:

    [] !== loading

і:

    [] !== error

---

# 38. Error handling

Hook повинен правильно обробляти помилки.

    try {
      const data = await getUsers();

      setUsers(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unknown error"
      );
    }

Не варто робити:

    catch (error) {
      setError(error as string);
    }

Тому що `error` не обов'язково є `string`.

---

# 39. HTTP error

Пам'ятаємо:

    fetch()

не вважає:

    404
    500
    401

автоматично JavaScript exception.

Тому API function повинна перевіряти:

    if (!response.ok) {
      throw new Error("Request failed");
    }

---

# 40. TypeScript і `response.json()`

Можна написати:

    const data: User[] = await response.json();

Але TypeScript не перевіряє реальну відповідь сервера під час виконання.

Якщо backend повернув:

    {
      something: "wrong"
    }

TypeScript не врятує від цього runtime-проблеми.

---

# 41. Runtime validation

Для надійних застосунків можна перевіряти дані після отримання.

Наприклад, за допомогою schema validation бібліотек.

Концептуально:

    response
      ↓
    JSON
      ↓
    validation
      ↓
    valid User[]
      ↓
    React state

Це особливо важливо для:

    public APIs
    external APIs
    complex backends
    authentication
    payment data

---

# 42. AbortController

При асинхронних запитах важливо враховувати ситуацію:

    Component mounted
        ↓
    fetch started
        ↓
    Component unmounted
        ↓
    fetch finishes

Або:

    request A
    request B

і `A` завершився після `B`.

Для контролю запитів можна використовувати:

    AbortController

---

# 43. Приклад AbortController

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
            throw new Error("Failed to fetch users");
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

# 44. Чому AbortController особливо важливий для search?

Уявімо:

    користувач вводить:
    r
    re
    rea
    reac
    react

Можуть запуститися:

    request "r"
    request "re"
    request "rea"
    request "reac"
    request "react"

Якщо відповіді прийдуть не по порядку, старий результат може перезаписати новий.

Це називається:

**Race Condition**

---

# 45. Race Condition

Наприклад:

    Request A: "re"
    Request B: "react"

B відправлений пізніше.

Але сервер відповів:

    B → швидко
    A → повільно

Тоді:

    B → setData("react")
    A → setData("re")

У результаті UI показує старі дані.

---

# 46. Захист від Race Condition

Один із підходів:

    AbortController

При новому запиті попередній можна скасувати.

Інший підхід:

    requestId

або перевірка актуальності запиту перед `setState`.

---

# 47. Custom Hook для search

Концептуально:

    useUsersSearch(query)

Компонент:

    const {
      data,
      loading,
      error,
    } = useUsersSearch(search);

Hook відповідає за:

    query
    debounce
    fetch
    cancellation
    race conditions
    loading
    error

Компонент відповідає за:

    input
    rendering
    UI

---

# 48. Debounce

Для search-запитів не потрібно робити HTTP request на кожну клавішу.

Замість:

    r → request
    re → request
    rea → request
    reac → request
    react → request

можна почекати, наприклад:

    300 ms

після завершення введення.

Це називається:

**Debouncing**

---

# 49. Custom Hook може використовувати інший Custom Hook

Наприклад:

    useUsersSearch()

може використовувати:

    useDebounce()

та:

    useUsers()

Концептуально:

    useUsersSearch()
        ↓
    useDebounce()
        ↓
    useUsers()
        ↓
    API

Це називається композицією Hooks.

---

# 50. Mutations

Data fetching — це не тільки GET.

У застосунку є:

    GET
    POST
    PUT
    PATCH
    DELETE

Для зміни server state часто використовують поняття:

**Mutation**

Наприклад:

    useCreateUser()
    useUpdateUser()
    useDeleteUser()

---

# 51. `useCreateUser`

Наприклад:

    type CreateUserInput = {
      name: string;
      email: string;
    };

    export function useCreateUser() {
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);

      async function createUser(
        input: CreateUserInput
      ) {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch(
            "/api/users",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(input),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to create user");
          }

          return await response.json();
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : "Unknown error";

          setError(message);

          throw error;
        } finally {
          setLoading(false);
        }
      }

      return {
        createUser,
        loading,
        error,
      };
    }

---

# 52. Використання mutation Hook

    function CreateUserForm() {
      const {
        createUser,
        loading,
        error,
      } = useCreateUser();

      async function handleSubmit() {
        await createUser({
          name: "John",
          email: "john@example.com",
        });
      }

      return (
        <form onSubmit={handleSubmit}>
          {/* form */}
        </form>
      );
    }

---

# 53. Data fetching Hook vs Mutation Hook

GET:

    useUsers()

отримує дані.

POST:

    useCreateUser()

створює дані.

PUT/PATCH:

    useUpdateUser()

оновлює дані.

DELETE:

    useDeleteUser()

видаляє дані.

Це дозволяє зробити API Hooks семантично зрозумілими.

---

# 54. Server State

Важливе поняття:

**Server State**

Це дані, джерелом правди для яких є сервер.

Наприклад:

    users
    products
    orders
    comments
    posts
    profile

React може зберігати локальну копію цих даних, але React не є їхнім джерелом правди.

---

# 55. Client State

Client State — стан, який належить UI.

Наприклад:

    modalOpen
    selectedTab
    inputValue
    sidebarOpen
    theme
    currentStep

---

# 56. Server State vs Client State

### Client State

    const [isOpen, setIsOpen] =
      useState(false);

### Server State

    const {
      users,
      loading,
      error,
    } = useUsers();

Це різні категорії стану.

---

# 57. Чому Server State складніший?

Server State може бути:

    remote
    asynchronous
    shared
    stale
    cached
    paginated
    updated by another user
    invalidated
    refetched

Тому простий:

    useState()

не завжди достатній для великого data-driven application.

---

# 58. Stale Data

**Stale data** — дані, які були отримані раніше, але можуть вже не відповідати серверу.

Наприклад:

    10:00
    GET /users
    → Alice, Bob

Пізніше інший користувач створив:

    John

Наш React application все ще має:

    Alice, Bob

Це вже потенційно:

    stale data

---

# 59. Refetch

Щоб отримати актуальні дані:

    refetch()

або автоматичний повторний запит.

Наприклад:

    GET /api/users

знову.

---

# 60. Invalidation

У більш складних системах після mutation можна сказати:

> дані users більше не вважаються актуальними.

Наприклад:

    createUser()
        ↓
    invalidate users
        ↓
    refetch users
        ↓
    UI updated

Це одна з причин, чому спеціалізовані data-fetching libraries стають корисними.

---

# 61. Коли власного Hook достатньо?

Custom Hooks добре підходять для:

    невеликих проєктів
    навчальних проєктів
    простих CRUD
    кількох API requests
    простого loading/error
    невеликої кількості server state

Наприклад:

    useUsers()
    useUser(id)
    useCreateUser()

---

# 62. Коли власний Hook починає ставати складним?

Якщо потрібно:

    caching
    automatic refetching
    retries
    stale time
    mutations
    optimistic updates
    pagination
    infinite queries
    request deduplication
    cache invalidation
    synchronization

то власна система швидко стає складною.

---

# 63. Data Fetching Libraries

У production React-проєктах можна використовувати спеціалізовані бібліотеки.

Наприклад:

    TanStack Query
    SWR

Вони вирішують багато проблем:

    caching
    refetching
    stale data
    mutations
    retries
    request synchronization
    cache invalidation

Але перед використанням таких бібліотек важливо розуміти базову модель:

    fetch
    Promise
    loading
    error
    state
    effect
    refetch
    race conditions

---

# 64. Custom Hook як abstraction layer

Хороший Hook приховує технічні деталі.

Компоненту не потрібно знати:

    fetch()
    response.ok
    response.json()
    AbortController
    loading state
    error state

Компоненту достатньо:

    const {
      users,
      loading,
      error,
      refetch,
    } = useUsers();

Це називається:

**Abstraction**

---

# 65. Хороший API Custom Hook

Хороший Hook повинен мати зрозумілий API.

Наприклад:

    const {
      data,
      loading,
      error,
      refetch,
    } = useUsers();

або:

    const {
      user,
      loading,
      error,
      refetch,
    } = useUser(id);

Не варто повертати десятки незрозумілих значень.

---

# 66. Поганий Custom Hook

Наприклад:

    const result = useUsers();

    result.a
    result.b
    result.c
    result.x
    result.data2

Такий API важко читати.

Краще:

    const {
      users,
      loading,
      error,
      refetch,
    } = useUsers();

---

# 67. Naming

Назви повинні описувати призначення.

Добре:

    useUsers()
    useUser(id)
    useCreateUser()
    useUpdateUser()
    useDeleteUser()

Менш зрозуміло:

    useData()
    useRequest()
    useStuff()

Особливо якщо Hook спеціалізований.

---

# 68. Файлова структура

Один із варіантів:

    src/
    ├── api/
    │   └── users.ts
    │
    ├── hooks/
    │   ├── useUsers.ts
    │   ├── useUser.ts
    │   ├── useCreateUser.ts
    │   └── useDeleteUser.ts
    │
    └── components/
        └── Users.tsx

---

# 69. Feature-based структура

У більших проєктах може бути:

    src/
    └── features/
        └── users/
            ├── api/
            │   └── users.ts
            ├── hooks/
            │   ├── useUsers.ts
            │   └── useUser.ts
            ├── components/
            │   ├── UsersList.tsx
            │   └── UserCard.tsx
            └── types.ts

Це часто краще масштабується.

---

# 70. Hook не повинен містити весь application

Погано:

    useUsers()

який одночасно:

    fetch
    validation
    authentication
    pagination
    sorting
    filtering
    UI state
    modal state
    form state
    rendering

Hook повинен мати чітку відповідальність.

---

# 71. Hook і UI state

Наприклад:

    const [isModalOpen, setIsModalOpen] =
      useState(false);

не обов'язково переносити в:

    useUsers()

якщо modal не має прямого відношення до fetching.

Краще:

    UsersPage
        ↓
    useUsers()
        ↓
    server data

а:

    UsersPage
        ↓
    isModalOpen
        ↓
    UI

---

# 72. Custom Hook не повинен повертати JSX

Погано:

    function useUsers() {
      // ...

      return <div>Users</div>;
    }

Це вже не нормальна абстракція data hook.

Hook повинен повертати:

    data
    state
    functions

а компонент:

    JSX

---

# 73. Приклад повного `useUsers`

    import {
      useEffect,
      useState,
    } from "react";

    type User = {
      id: number;
      name: string;
      email: string;
    };

    async function getUsers(): Promise<User[]> {
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      return response.json();
    }

    export function useUsers() {
      const [users, setUsers] = useState<User[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      async function loadUsers() {
        setLoading(true);
        setError(null);

        try {
          const data = await getUsers();

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
      }

      useEffect(() => {
        loadUsers();
      }, []);

      return {
        users,
        loading,
        error,
        refetch: loadUsers,
      };
    }

---

# 74. Важливий нюанс залежностей

У попередньому прикладі:

    useEffect(() => {
      loadUsers();
    }, []);

`loadUsers` створюється заново при кожному render.

Для простого навчального прикладу це можна зрозуміти як робочу модель, але в production-коді потрібно уважно проектувати залежності.

Один із варіантів — помістити функцію всередину effect.

Інший — використовувати `useCallback`, якщо функція повинна бути стабільною reference.

---

# 75. Варіант із функцією всередині effect

    useEffect(() => {
      async function loadUsers() {
        setLoading(true);
        setError(null);

        try {
          const data = await getUsers();

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
      }

      loadUsers();
    }, []);

Це часто найпростіший варіант для initial fetch.

---

# 76. `useCallback`

Якщо функція повинна бути доступна зовні і використовуватися як dependency, можна розглянути:

    const loadUsers = useCallback(
      async () => {
        // fetch
      },
      []
    );

Тоді:

    useEffect(() => {
      loadUsers();
    }, [loadUsers]);

Але:

> `useCallback` не потрібно використовувати автоматично всюди.

Спочатку потрібно зрозуміти, навіщо потрібна стабільна reference.

---

# 77. Generic API response

Іноді backend повертає не просто масив.

Наприклад:

    {
      "data": [...],
      "total": 100,
      "page": 1
    }

Тип:

    type PaginatedResponse<T> = {
      data: T[];
      total: number;
      page: number;
    };

Тоді:

    const response =
      await getUsers();

може мати тип:

    PaginatedResponse<User>

---

# 78. Generic Custom Hook

Наприклад:

    function useFetch<T>(url: string) {
      const [data, setData] =
        useState<T | null>(null);

      // ...

      return {
        data,
        loading,
        error,
      };
    }

Використання:

    useFetch<User[]>("/api/users");

або:

    useFetch<Product[]>("/api/products");

---

# 79. Але generic не означає validation

Це дуже важливо.

Запис:

    useFetch<User[]>("/api/users")

не перевіряє, що сервер реально повернув `User[]`.

Це лише інформація для TypeScript.

Тому:

    TypeScript type
        ≠
    Runtime validation

---

# 80. Hook і authentication

Data fetching Hook часто працює з авторизацією.

Наприклад:

    Authorization: Bearer <token>

API layer може централізовано додавати headers.

Тоді:

    useUsers()
        ↓
    getUsers()
        ↓
    apiClient
        ↓
    Authorization
        ↓
    Backend

Це краще, ніж дублювати auth headers у кожному Hook.

---

# 81. API Client

У більших проєктах можна створити:

    apiClient

Наприклад концептуально:

    apiClient.get("/users")
    apiClient.post("/users", data)
    apiClient.patch("/users/1", data)
    apiClient.delete("/users/1")

Тоді Hooks працюють поверх API client.

---

# 82. Архітектура

Один із хороших варіантів:

    React Component
          ↓
    Custom Hook
          ↓
    API Layer
          ↓
    API Client
          ↓
    HTTP
          ↓
    Backend
          ↓
    Database

Наприклад:

    UsersPage
          ↓
    useUsers()
          ↓
    getUsers()
          ↓
    apiClient.get()
          ↓
    GET /api/users
          ↓
    Nest.js / Express
          ↓
    PostgreSQL

---

# 83. Що НЕ потрібно робити

## ❌ Fetch під час render

Не:

    function Users() {
      const data = fetch("/api/users");

      return <div>...</div>;
    }

Render повинен залишатися передбачуваним.

---

# 84. Не робити `useEffect(async ...)`

Не:

    useEffect(async () => {
      const response = await fetch("/api/users");
    }, []);

Краще:

    useEffect(() => {
      async function loadUsers() {
        const response = await fetch("/api/users");
      }

      loadUsers();
    }, []);

---

# 85. Не дублювати fetching logic

Погано:

    UsersPage
      → fetch users

    Sidebar
      → fetch users

    Dashboard
      → fetch users

Якщо це одна й та сама логіка, її можна винести в:

    useUsers()

---

# 86. Не змішувати API та UI

Погано:

    useUsers()

який містить:

    <button>
    <Modal>
    <UserCard>

Hook повинен займатися даними та логікою.

Компоненти — UI.

---

# 87. Не ігнорувати loading

Погано:

    const { users } = useUsers();

    return (
      <ul>
        {users.map(...)}
      </ul>
    );

Якщо дані ще завантажуються, UI може бути незрозумілим.

Краще:

    if (loading) {
      return <p>Loading...</p>;
    }

---

# 88. Не ігнорувати error

Погано:

    try {
      // fetch
    } catch {
      // nothing
    }

Користувач повинен отримати зрозумілий стан:

    Error loading users.

---

# 89. Не плутати empty та error

Це різні ситуації.

### Empty

    request → success
    data → []

### Error

    request → failed

UI:

    No users found.

або:

    Failed to load users.

---

# 90. Не очищати старі дані без необхідності

Під час refetch не завжди потрібно:

    setUsers([]);

Краще іноді залишити старі дані:

    users = old data
    isFetching = true

і показати:

    Updating...

Це дає плавніший UI.

---

# 91. Не робити blind retry для всіх запитів

Повторити:

    GET

часто безпечно.

Але автоматично повторювати:

    POST

може бути небезпечно.

Наприклад:

    POST /orders

може створити замовлення двічі.

Тому retry policy залежить від операції.

---

# 92. Custom Hook і тестування

Custom Hook можна тестувати окремо від UI.

Перевірити:

    initial state
    loading
    success
    error
    refetch
    parameter changes
    cancellation

Це одна з переваг винесення логіки з компонента.

---

# 93. Модель мислення

Коли створюєш Custom Data Fetching Hook, подумай:

    1. Які дані отримуємо?
    2. Який endpoint?
    3. Які параметри?
    4. Який тип даних?
    5. Який initial state?
    6. Що відбувається під час loading?
    7. Що робимо при success?
    8. Що робимо при error?
    9. Чи потрібен refetch?
    10. Чи потрібна cancellation?
    11. Чи може бути race condition?
    12. Чи потрібне кешування?

---

# 94. Типова схема Hook

    function useSomething() {
      // 1. state

      // 2. async function

      // 3. effect

      // 4. error handling

      // 5. refetch

      // 6. return public API
    }

---

# 95. Мінімальний шаблон

    function useData<T>() {
      const [data, setData] =
        useState<T | null>(null);

      const [loading, setLoading] =
        useState(true);

      const [error, setError] =
        useState<string | null>(null);

      useEffect(() => {
        async function load() {
          try {
            // request
          } catch (error) {
            // error
          } finally {
            setLoading(false);
          }
        }

        load();
      }, []);

      return {
        data,
        loading,
        error,
      };
    }

---

# 96. Реальний потік даних

Наприклад:

    User opens UsersPage
            ↓
    UsersPage calls useUsers()
            ↓
    useUsers() starts effect
            ↓
    getUsers()
            ↓
    fetch("/api/users")
            ↓
    Backend
            ↓
    PostgreSQL
            ↓
    Backend returns JSON
            ↓
    getUsers() returns data
            ↓
    useUsers() updates state
            ↓
    React rerenders
            ↓
    UsersPage renders users

---

# 97. Component vs Hook vs API

Дуже важливо розділяти:

### Component

    What should the user see?

### Hook

    How should React manage this data?

### API function

    How do we communicate with the server?

### Backend

    How do we process the request?

### Database

    Where do we store the data?

---

# 98. Практичний приклад

Уявімо простий LMS.

Backend:

    GET /api/courses

Frontend:

    useCourses()

API:

    getCourses()

Component:

    CoursesList

Архітектура:

    CoursesList
        ↓
    useCourses()
        ↓
    getCourses()
        ↓
    GET /api/courses
        ↓
    Nest.js
        ↓
    PostgreSQL

---

# 99. Типи

    type Course = {
      id: number;
      title: string;
      description: string;
    };

API:

    async function getCourses(): Promise<Course[]> {
      const response = await fetch("/api/courses");

      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      return response.json();
    }

Hook:

    function useCourses() {
      const [courses, setCourses] =
        useState<Course[]>([]);

      // ...

      return {
        courses,
        loading,
        error,
      };
    }

Component:

    function CoursesList() {
      const {
        courses,
        loading,
        error,
      } = useCourses();

      // UI
    }

---

# 100. Custom Hook — це не просто скорочення коду

Головна користь не в тому, що ми написали менше рядків.

Головна користь:

    reusable logic
    separation of concerns
    abstraction
    consistency
    testability
    maintainability

---

# 101. Коли створювати Custom Hook?

Створюй Hook, якщо:

✔ логіка повторюється;

✔ логіка має власний state;

✔ логіка використовує React Hooks;

✔ логіка пов'язана з певною поведінкою;

✔ компонент стає занадто складним;

✔ потрібно використовувати одну логіку в кількох компонентах.

---

# 102. Коли не потрібно створювати Hook?

Не кожну функцію потрібно перетворювати на Hook.

Якщо це просто:

    function formatUserName(user: User) {
      return user.name.trim();
    }

це звичайна JavaScript/TypeScript function.

Не потрібно:

    useFormatUserName()

якщо React state/effect/context там не потрібні.

---

# 103. Hook vs utility function

### Utility function

    function formatDate(date: Date) {
      // ...
    }

Не використовує React Hooks.

### Custom Hook

    function useUsers() {
      const [users, setUsers] =
        useState<User[]>([]);

      useEffect(() => {
        // ...
      }, []);

      return users;
    }

Використовує React Hooks.

---

# 104. Custom Hook як reusable behavior

Custom Hook може інкапсулювати не тільки fetching.

Наприклад:

    useLocalStorage()
    useDebounce()
    useOnlineStatus()
    useMediaQuery()
    useForm()
    useAuth()
    useUsers()

Спільна ідея:

> Hook інкапсулює повторно використовувану поведінку.

---

# 105. Interview Questions

## Що таке Custom Hook?

Custom Hook — це JavaScript-функція, назва якої починається з `use` і яка може використовувати React Hooks для інкапсуляції та повторного використання логіки.

---

## Навіщо потрібен Custom Data Fetching Hook?

Щоб винести повторювану логіку:

    fetch
    loading
    error
    state
    refetch

з компонентів і зробити її повторно використовуваною.

---

## Чим Hook відрізняється від компонента?

Компонент повертає JSX.

Hook повертає дані, state, functions або інші значення.

---

## Чи може Custom Hook використовувати інші Hooks?

Так.

Наприклад:

    useState()
    useEffect()
    useMemo()
    useCallback()
    useContext()

---

## Чому назва повинна починатися з `use`?

Це правило React Hooks. Воно дозволяє React та linting tools розпізнавати Custom Hooks і перевіряти Rules of Hooks.

---

## Чи можна викликати Custom Hook всередині `if`?

Ні.

Не можна:

    if (condition) {
      useUsers();
    }

Hooks повинні викликатися стабільно на верхньому рівні.

---

## Що таке `refetch`?

`refetch` — повторний запуск запиту для отримання актуальних даних із сервера.

---

## Що таке server state?

Дані, джерелом правди для яких є сервер.

Наприклад:

    users
    products
    orders

---

## Що таке client state?

Локальний стан UI:

    modalOpen
    selectedTab
    inputValue

---

## Що таке stale data?

Дані, які були отримані раніше, але можуть вже не відповідати поточному стану сервера.

---

## Навіщо `AbortController`?

Для скасування HTTP-запитів і зменшення проблем із:

    unmount
    race conditions
    search requests

---

## Що таке Race Condition?

Ситуація, коли результати асинхронних операцій приходять у непередбачуваному порядку і старий результат може перезаписати новий.

---

## Чи достатньо TypeScript для перевірки API response?

Ні.

TypeScript не виконує runtime validation JSON-відповіді.

---

## Коли використовувати спеціальну data-fetching library?

Коли application потребує:

    caching
    refetching
    stale data management
    mutations
    retries
    pagination
    cache invalidation

---

# 106. Типові помилки

### ❌ `useEffect(async () => ...)`

Правильно:

    useEffect(() => {
      async function load() {
        // ...
      }

      load();
    }, []);

---

### ❌ Fetch під час render

    function Users() {
      fetch("/api/users");

      return <div>Users</div>;
    }

Погано.

---

### ❌ Відсутність `response.ok`

    const response = await fetch(url);

    const data = await response.json();

Потрібно перевіряти HTTP status.

---

### ❌ Відсутність loading state

    const { data } = useUsers();

Не завжди достатньо.

---

### ❌ Відсутність error state

Помилки мережі та backend повинні бути оброблені.

---

### ❌ `any`

Не варто:

    const data: any = await response.json();

Краще:

    const data: User[] = await response.json();

або runtime validation.

---

### ❌ Один величезний Hook

Не варто створювати:

    useApplicationData()

який робить усе.

Краще:

    useUsers()
    useOrders()
    useProducts()

---

### ❌ Hook повертає UI

Hook не повинен перетворюватися на компонент.

---

# 107. Практичне завдання №1

Створити:

    useUsers()

Hook повинен мати:

    users
    loading
    error

Компонент:

    UsersList

Повинен показувати:

    Loading...
    Error...
    No users found.
    Users list

---

# 108. Практичне завдання №2

Додати:

    refetch()

UI:

    <button>
      Refresh
    </button>

Після натискання:

    GET /api/users

виконується повторно.

---

# 109. Практичне завдання №3

Створити:

    useUser(id)

Підтримати:

    /api/users/1
    /api/users/2
    /api/users/3

При зміні `id` повинен виконуватися новий request.

---

# 110. Практичне завдання №4

Створити:

    useCreateUser()

Повернути:

    createUser()
    loading
    error

Перевірити:

    POST
    JSON.stringify()
    Content-Type
    response.ok

---

# 111. Практичне завдання №5

Створити:

    useUpdateUser()

Підтримати:

    PATCH /api/users/:id

---

# 112. Практичне завдання №6

Створити:

    useDeleteUser()

Підтримати:

    DELETE /api/users/:id

---

# 113. Практичне завдання №7

Додати:

    AbortController

до:

    useUsers()

Перевірити поведінку при unmount.

---

# 114. Практичне завдання №8

Створити:

    useUsersSearch(query)

Додати:

    debounce
    AbortController
    loading
    error
    empty state

Це вже дуже хороший практичний exercise.

---

# 115. Практичне завдання №9

Створити API layer:

    api/
    ├── users.ts
    ├── products.ts
    └── orders.ts

Hooks:

    hooks/
    ├── useUsers.ts
    ├── useProducts.ts
    └── useOrders.ts

Components:

    components/
    ├── Users.tsx
    ├── Products.tsx
    └── Orders.tsx

---

# 116. Практичне завдання №10

Побудувати маленький CRUD:

    Users
      ↓
    GET
      ↓
    list

    Create
      ↓
    POST

    Update
      ↓
    PATCH

    Delete
      ↓
    DELETE

Hooks:

    useUsers()
    useCreateUser()
    useUpdateUser()
    useDeleteUser()

---

# 117. Рівень Core

Ти повинен розуміти:

✔ що таке Custom Hook;

✔ чому назва починається з `use`;

✔ Rules of Hooks;

✔ `useState` у Custom Hook;

✔ `useEffect` у Custom Hook;

✔ `fetch`;

✔ loading;

✔ error;

✔ data;

✔ `refetch`.

---

# 118. Рівень Junior

Потрібно вміти:

✔ створити `useUsers`;

✔ створити `useUser(id)`;

✔ працювати з TypeScript;

✔ використовувати generics;

✔ розділити Hook та API layer;

✔ обробляти HTTP errors;

✔ працювати з query parameters;

✔ створити CRUD Hooks;

✔ розуміти server state.

---

# 119. Рівень Middle

Потрібно розуміти:

✔ `AbortController`;

✔ Race Conditions;

✔ debounce;

✔ pagination;

✔ stale data;

✔ refetching;

✔ mutations;

✔ cache invalidation;

✔ API client;

✔ runtime validation;

✔ architecture of data fetching.

---

# 120. Рівень Senior

Потрібно розуміти:

✔ server-state architecture;

✔ caching strategy;

✔ synchronization;

✔ optimistic updates;

✔ retries;

✔ request deduplication;

✔ error boundaries;

✔ observability;

✔ performance;

✔ security;

✔ authentication;

✔ authorization;

✔ TanStack Query / SWR та подібні підходи;

✔ SSR / RSC / Next.js data fetching;

✔ trade-offs між власними Hooks і data-fetching libraries.

---

# 121. Міні-шпаргалка

    Custom Hook
    ↓
    function starting with "use"
    ↓
    encapsulates reusable React logic

---

    useUsers()
    ↓
    data
    loading
    error
    refetch

---

    Component
        ↓
    Custom Hook
        ↓
    API function
        ↓
    fetch
        ↓
    Backend
        ↓
    Database

---

    GET
    ↓
    useUsers()

    POST
    ↓
    useCreateUser()

    PATCH
    ↓
    useUpdateUser()

    DELETE
    ↓
    useDeleteUser()

---

# 122. Головні правила

✔ Custom Hook починається з `use`.

✔ Hook може використовувати інші Hooks.

✔ Hooks не викликаються всередині `if`, `for` або вкладених функцій.

✔ Component відповідає за UI.

✔ Hook відповідає за reusable React logic.

✔ API function відповідає за HTTP.

✔ `fetch()` не вважає HTTP `4xx/5xx` автоматично exception.

✔ Перевіряй `response.ok`.

✔ Не використовуй `useEffect(async () => ...)`.

✔ Не роби fetch під час render.

✔ Не забувай `loading`.

✔ Не забувай `error`.

✔ `[]` — це не те саме, що loading.

✔ Server state і client state — різні поняття.

✔ `refetch()` дозволяє повторно отримати дані.

✔ `AbortController` допомагає контролювати async requests.

✔ Race Conditions потрібно враховувати.

✔ TypeScript types не замінюють runtime validation.

✔ Не роби один величезний Hook для всього application.

✔ Для складного server state можуть бути корисні TanStack Query, SWR та подібні рішення.

---

# 123. Найважливіша модель

Запам'ятай:

    UI
     ↓
    Hook
     ↓
    API
     ↓
    Backend
     ↓
    Database

А назад:

    Database
     ↓
    Backend
     ↓
    API response
     ↓
    Hook
     ↓
    React state
     ↓
    UI

---

# 124. Фінальна модель Custom Data Fetching Hook

    USER
      ↓
    React Component
      ↓
    useUsers()
      ↓
    loading
      ↓
    getUsers()
      ↓
    fetch()
      ↓
    Backend
      ↓
    Database
      ↓
    JSON response
      ↓
    setUsers()
      ↓
    React re-render
      ↓
    Users UI

---

# 125. Що потрібно вміти після цієї теми

Після вивчення `08-custom-data-fetching-hooks` ти повинен уміти самостійно побудувати:

    API function
        ↓
    Custom Hook
        ↓
    React Component

Наприклад:

    getUsers()
        ↓
    useUsers()
        ↓
    UsersList

і розуміти, де повинна знаходитися кожна частина логіки.

---

# 126. Головне

**Custom Data Fetching Hook — це не просто "fetch винесений в окремий файл".**

Це спосіб побудувати зрозумілий шар між:

    React UI

та:

    asynchronous server data.

Найпростіша модель:

    Component
        ↓
    useUsers()
        ↓
    getUsers()
        ↓
    fetch()
        ↓
    Backend

Компонент не повинен знати всі деталі HTTP-запиту.

Hook не повинен знати, як малюється UI.

API function не повинна знати про React.

Саме так поступово формується чистіша та масштабованіша архітектура React application.