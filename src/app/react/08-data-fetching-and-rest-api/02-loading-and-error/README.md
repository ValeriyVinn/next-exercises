# React — 08. Data Fetching and REST API
# 02. Loading and Error

Loading та Error — це два основні стани, які потрібно правильно обробляти під час data fetching у React.

Коли React отримує дані з API, request не завершується миттєво.

Між моментом запуску request та отриманням response проходить певний час.

Тому UI повинен уміти показувати:

    Loading
        ↓
    дані завантажуються

    Success
        ↓
    дані успішно отримані

    Error
        ↓
    сталася помилка

Типовий data-fetching flow:

    Component
        ↓
    fetch()
        ↓
    Loading
        ↓
    HTTP request
        ↓
    ┌───────────────┐
    ↓               ↓
    Success        Error
    ↓               ↓
    Data           Error message
    ↓
    UI

---

# Ключові поняття

✔ loading state  
✔ error state  
✔ data state  
✔ initial state  
✔ success state  
✔ error state  
✔ `isLoading`  
✔ `isError`  
✔ `error`  
✔ `setIsLoading()`  
✔ `setError()`  
✔ `try`  
✔ `catch`  
✔ `finally`  
✔ `response.ok`  
✔ `response.status`  
✔ network error  
✔ HTTP error  
✔ server error  
✔ client error  
✔ retry  
✔ refetch  
✔ empty state  
✔ success state  
✔ loading state  
✔ error state  
✔ state transition  
✔ conditional rendering  
✔ request lifecycle  

---

# Що потрібно пам'ятати

• Data fetching не відбувається миттєво.

• Поки request виконується, UI повинен мати loading state.

• Якщо request завершився успішно, UI показує data.

• Якщо request завершився помилкою, UI показує error state.

• Loading state часто зберігається в:

    isLoading

• Error state часто зберігається в:

    error

• Дані зберігаються в:

    data

• Типова модель:

    data
    isLoading
    error

• `try...catch` використовується для обробки помилок.

• `response.ok` потрібно перевіряти окремо, тому що HTTP `404` або `500` сам по собі не обов'язково призводить до rejection `fetch()`.

• `finally` зручно використовувати для завершення loading state.

• Loading потрібно завершувати як при success, так і при error.

• Error state потрібно очищати перед новим request.

• UI повинен чітко розрізняти:

    loading
    success
    error
    empty

• Empty state — це не те саме, що error.

• `[]` після успішного response означає, що даних немає.

• Error означає, що request або обробка даних не завершилися нормально.

---

# Request Lifecycle

Data fetching можна уявляти як lifecycle.

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

Після retry:

    Error
       ↓
    Loading
       ↓
    Success

---

# Основні UI States

У простому application достатньо:

    Loading
    Success
    Error

Але в реальному UI часто потрібно розрізняти:

    Initial
    Loading
    Success with data
    Success with empty data
    Error

Наприклад:

    Initial
        ↓
    "Натисніть Load"

    Loading
        ↓
    "Loading..."

    Success + data
        ↓
    список користувачів

    Success + empty
        ↓
    "No users found"

    Error
        ↓
    "Something went wrong"

---

# Initial State

Initial state — початковий стан компонента до виконання request.

Наприклад:

    const [users, setUsers] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);

До початку request:

    users = []
    isLoading = false
    error = null

Але тут є одна проблема.

    users = []

може означати:

    ще не завантажили

або:

    завантажили, але список порожній

Тому для складніших UI корисно мати окремий loading/status state.

---

# Loading State

Loading state означає:

    request зараз виконується

Наприклад:

    const [isLoading, setIsLoading] = useState(false);

Перед request:

    setIsLoading(true);

Після завершення:

    setIsLoading(false);

---

# Базовий Loading

    async function loadUsers() {
        setIsLoading(true);

        const response = await fetch("/api/users");

        const data = await response.json();

        setUsers(data);

        setIsLoading(false);
    }

---

# Проблема базового Loading

Такий код має проблему.

Якщо виникне error:

    async function loadUsers() {
        setIsLoading(true);

        const response = await fetch("/api/users");

        const data = await response.json();

        setUsers(data);

        setIsLoading(false);
    }

Якщо request завершиться помилкою до:

    setIsLoading(false);

то loading може залишитися:

    true

UI може назавжди показувати:

    Loading...

Тому потрібен:

    try
    catch
    finally

---

# finally

Правильніше:

    async function loadUsers() {
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

`finally` виконується незалежно від результату.

---

# try / catch / finally

Структура:

    try {
        // request
    } catch (error) {
        // error handling
    } finally {
        // cleanup
    }

Для data fetching:

    try
        ↓
    set loading
        ↓
    fetch
        ↓
    parse data
        ↓
    update state

    catch
        ↓
    set error

    finally
        ↓
    set loading false

---

# Error State

Error state зберігає інформацію про помилку.

Наприклад:

    const [error, setError] = useState(null);

При помилці:

    setError(error.message);

UI:

    {error && (
        <p>Error: {error}</p>
    )}

---

# Error State TypeScript

У TypeScript:

    const [error, setError] = useState<string | null>(null);

Початково:

    null

При помилці:

    "Failed to load users"

---

# Error Object

Можна зберігати сам Error:

    const [error, setError] =
        useState<Error | null>(null);

Наприклад:

    try {
        ...
    } catch (error) {
        if (error instanceof Error) {
            setError(error);
        }
    }

UI:

    {error && (
        <p>{error.message}</p>
    )}

---

# Error Message

Іноді зручно зберігати лише message:

    const [error, setError] =
        useState<string | null>(null);

Тоді:

    setError("Failed to load users");

Це простіше для невеликих компонентів.

---

# HTTP Error

Наприклад:

    404 Not Found

або:

    500 Internal Server Error

`fetch()` зазвичай повертає `Response`.

Тому:

    const response = await fetch("/api/users");

    if (!response.ok) {
        throw new Error(
            `HTTP error: ${response.status}`
        );
    }

---

# Network Error

Network error може виникнути, якщо request не вдалося виконати.

Наприклад:

    server unavailable
    network failure
    DNS failure
    browser blocking
    CORS-related failure

Тоді:

    fetch()

може rejected Promise.

Це обробляється через:

    catch

---

# HTTP Error vs Network Error

Це дуже важлива різниця.

HTTP error:

    fetch()
        ↓
    Response
        ↓
    status = 404
        ↓
    response.ok = false

Network error:

    fetch()
        ↓
    request failed
        ↓
    Promise rejected
        ↓
    catch

---

# Базовий Error Handling

    try {
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
    }

---

# Повний Loading + Error

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function loadUsers() {
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

---

# Чому setError(null) перед request

Уявімо:

    Request 1
        ↓
    Error
        ↓
    error = "Failed to load"

Потім користувач натискає:

    Retry

Якщо не зробити:

    setError(null);

старе повідомлення може залишатися під час нового request.

Тому:

    setError(null);

зазвичай ставлять на початку нового request.

---

# Retry

Retry — повторне виконання request після помилки.

Наприклад:

    <button onClick={loadUsers}>
        Try again
    </button>

Функція:

    async function loadUsers() {
        try {
            setIsLoading(true);
            setError(null);

            ...
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

---

# Retry Flow

    Error
      ↓
    User clicks Retry
      ↓
    clear error
      ↓
    loading
      ↓
    fetch()
      ↓
    ┌────────────┐
    ↓            ↓
    Success     Error
    ↓            ↓
    Data       Error UI

---

# Disable Retry During Loading

Не варто дозволяти багато одночасних requests без необхідності.

Наприклад:

    <button
        onClick={loadUsers}
        disabled={isLoading}
    >
        {isLoading ? "Loading..." : "Try again"}
    </button>

---

# Loading Text

Найпростіший UI:

    if (isLoading) {
        return <p>Loading...</p>;
    }

---

# Loading Spinner

Замість тексту можна показувати spinner:

    if (isLoading) {
        return <Spinner />;
    }

Головна ідея не змінюється:

    isLoading === true
        ↓
    loading UI

---

# Skeleton

Skeleton — placeholder UI, який імітує майбутній контент.

Наприклад:

    if (isLoading) {
        return <UsersSkeleton />;
    }

Skeleton часто дає кращий UX, ніж просто:

    Loading...

---

# Loading Overlay

Іноді не потрібно замінювати весь UI.

Наприклад:

    <div>
        <UserList />

        {isLoading && (
            <LoadingOverlay />
        )}
    </div>

Це зручно для:

    refetch
    pagination
    filtering
    background updates

---

# Initial Loading vs Refetching

Це важлива відмінність.

Initial loading:

    немає data
        ↓
    loading
        ↓
    data

Refetch:

    data вже є
        ↓
    loading again
        ↓
    new data

Наприклад:

    Initial:

    [ Loading... ]

    Refetch:

    [ existing data ]
    [ Loading... ]

Не завжди потрібно ховати старі дані під час refetch.

---

# isLoading

Часто:

    isLoading

означає:

    initial request is in progress

А для подальших requests може бути корисним окремий стан:

    isFetching

Наприклад:

    isLoading
        → перше завантаження

    isFetching
        → будь-який активний request

Це не є обов'язковим правилом, але така модель часто використовується у data-fetching libraries.

---

# Data + Loading

Наприклад:

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

При initial load:

    users = []
    isLoading = true

Після success:

    users = [...]
    isLoading = false

Під час refetch:

    users = [...]
    isLoading = true

Це дозволяє залишити старі дані на екрані.

---

# Empty State

Empty state — успішний request, але data порожня.

Наприклад:

    []

Це НЕ error.

Правильно:

    response.ok === true
        ↓
    data = []
        ↓
    Empty state

UI:

    <p>No users found.</p>

---

# Loading vs Empty vs Error

Не плутати:

    Loading
        ↓
    data ще не отримані

    Empty
        ↓
    data успішно отримані
    але список порожній

    Error
        ↓
    request не завершився успішно

---

# Conditional Rendering

React дозволяє показувати різний UI залежно від state.

Наприклад:

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (users.length === 0) {
        return <p>No users found.</p>;
    }

    return (
        <UserList users={users} />
    );

Порядок має значення.

---

# Типовий порядок

Часто зручно:

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage />;
    }

    if (data.length === 0) {
        return <EmptyState />;
    }

    return <DataView />;

---

# Чому Loading перевіряється першим

Якщо:

    isLoading === true

не потрібно показувати старий error або empty state як основний стан.

Тому часто:

    Loading
        ↓
    Error
        ↓
    Empty
        ↓
    Data

---

# Inline Conditional Rendering

Можна:

    {isLoading && (
        <p>Loading...</p>
    )}

    {error && (
        <p>Error: {error}</p>
    )}

    {users.length > 0 && (
        <UserList users={users} />
    )}

---

# Ternary

Наприклад:

    {isLoading
        ? <p>Loading...</p>
        : <UserList users={users} />
    }

Для складніших state conditions краще використовувати звичайні `if`.

---

# Error UI

Error UI повинен бути зрозумілим користувачу.

Не обов'язково показувати:

    TypeError: Failed to fetch

Краще:

    <p>
        Не вдалося завантажити користувачів.
    </p>

Для developer можна логувати:

    console.error(error);

---

# User Error vs Developer Error

Користувачу:

    Не вдалося завантажити дані.

Developer:

    console.error(error);

Не завжди потрібно показувати внутрішню технічну інформацію користувачу.

---

# Error Message

Наприклад:

    setError(
        "Не вдалося завантажити користувачів."
    );

UI:

    {error && (
        <p>{error}</p>
    )}

---

# HTTP Status Based UI

Можна мати різну поведінку:

    if (response.status === 404) {
        ...
    }

Наприклад:

    401
        → потрібно увійти

    403
        → немає доступу

    404
        → ресурс не знайдено

    500
        → проблема сервера

---

# 401 Unauthorized

Наприклад:

    if (response.status === 401) {
        setError(
            "Please log in."
        );
    }

---

# 403 Forbidden

    if (response.status === 403) {
        setError(
            "You do not have permission."
        );
    }

---

# 404 Not Found

    if (response.status === 404) {
        setError(
            "Resource not found."
        );
    }

---

# 500 Server Error

    if (response.status >= 500) {
        setError(
            "Server error. Please try again later."
        );
    }

---

# Error Classification

Можна мислити так:

    4xx
        ↓
    request / client / authorization problem

    5xx
        ↓
    server problem

    network failure
        ↓
    request did not complete normally

---

# Error Normalization

У великих applications корисно привести різні errors до єдиного формату.

Наприклад:

    {
        message: "Failed to load users",
        status: 500,
        type: "server"
    }

Тоді UI працює з єдиною структурою.

---

# Error Object

Можна створити власний error:

    class ApiError extends Error {
        status;

        constructor(message, status) {
            super(message);
            this.status = status;
        }
    }

Наприклад:

    throw new ApiError(
        "User not found",
        404
    );

Це вже більш складний pattern і для базового React достатньо розуміти принцип.

---

# Loading + Error + Data Component

    function Users() {
        const [users, setUsers] = useState([]);
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState(null);

        async function loadUsers() {
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

        useEffect(() => {
            loadUsers();
        }, []);

        if (isLoading && users.length === 0) {
            return <p>Loading...</p>;
        }

        if (error && users.length === 0) {
            return (
                <div>
                    <p>{error}</p>

                    <button onClick={loadUsers}>
                        Try again
                    </button>
                </div>
            );
        }

        if (users.length === 0) {
            return <p>No users found.</p>;
        }

        return (
            <div>
                {isLoading && (
                    <p>Refreshing...</p>
                )}

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

# Важливий pattern

У попередньому прикладі:

    users.length === 0

не завжди означає:

    loading

Тому використовується:

    isLoading && users.length === 0

для initial loading.

А якщо:

    users.length > 0
    isLoading === true

то це вже:

    refetch

---

# Initial Loading

    if (isLoading && users.length === 0) {
        return <p>Loading...</p>;
    }

---

# Initial Error

    if (error && users.length === 0) {
        return (
            <div>
                <p>{error}</p>

                <button onClick={loadUsers}>
                    Try again
                </button>
            </div>
        );
    }

---

# Refetching

Якщо data вже є:

    users.length > 0
    isLoading === true

можна показати:

    <p>Refreshing...</p>

але залишити список.

---

# Error During Refetch

Це складніший випадок.

Наприклад:

    old data
        ↓
    refetch
        ↓
    error

Можна залишити старі дані:

    [ old data ]

і показати:

    Could not refresh data.

Це часто кращий UX, ніж повністю очищати UI.

---

# Do Not Clear Data Unnecessarily

Не обов'язково робити:

    setUsers([]);

перед кожним request.

Наприклад, при refetch краще:

    old data
        +
    refreshing indicator

ніж:

    empty screen
        ↓
    Loading...

---

# Stale Data + Error

Можливий стан:

    data exists
    +
    latest request failed

Наприклад:

    users = old data
    error = "Failed to refresh"

UI може показувати:

    Users
    ↓
    old data
    ↓
    "Could not refresh. Showing previous data."

Це вже більш advanced UX pattern.

---

# State Machine Thinking

Data fetching зручно уявляти як state machine.

Наприклад:

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
      ↓
    loading
      ↓
    success

---

# Простий State Machine

    IDLE
      ↓
    LOADING
      ↓
    SUCCESS

або:

    IDLE
      ↓
    LOADING
      ↓
    ERROR

Retry:

    ERROR
      ↓
    LOADING

---

# Проблема кількох Boolean States

Можна мати:

    isLoading
    isError
    isSuccess

Але така модель дозволяє створити суперечливі комбінації:

    isLoading = true
    isError = true
    isSuccess = true

Це може бути нелогічним.

---

# Status State

Замість декількох booleans можна використовувати:

    status

Наприклад:

    const [status, setStatus] =
        useState("idle");

Можливі значення:

    "idle"
    "loading"
    "success"
    "error"

---

# Status Example

    setStatus("loading");

    ...

    setStatus("success");

або:

    setStatus("error");

---

# Status + Data + Error

Наприклад:

    const [status, setStatus] =
        useState("idle");

    const [data, setData] =
        useState([]);

    const [error, setError] =
        useState(null);

Тоді:

    status === "idle"
        → initial state

    status === "loading"
        → loading

    status === "success"
        → success

    status === "error"
        → error

---

# Status Rendering

    if (status === "loading") {
        return <Loading />;
    }

    if (status === "error") {
        return <ErrorMessage />;
    }

    if (status === "success") {
        return <DataView />;
    }

    return <InitialState />;

---

# Status vs Boolean Flags

Boolean approach:

    isLoading
    error

Проста і зрозуміла.

Status approach:

    idle
    loading
    success
    error

краще описує взаємовиключні стани.

Обидва підходи можуть бути правильними.

Для простих компонентів:

    isLoading
    error

часто достатньо.

Для складної state logic:

    status

може бути кращим.

---

# Discriminated State

У TypeScript можна описати fetching state точніше.

Наприклад:

    type DataState<T> =
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

Тоді стан має чітку структуру.

---

# Generic Data State

Наприклад:

    type DataState<T> =
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

Для:

    User[]

можна мати:

    DataState<User[]>

---

# Loading State with TypeScript

Простий варіант:

    const [isLoading, setIsLoading] =
        useState(false);

---

# Error State with TypeScript

    const [error, setError] =
        useState<string | null>(null);

---

# Data State with TypeScript

    const [users, setUsers] =
        useState<User[]>([]);

---

# Full TypeScript State

    const [users, setUsers] =
        useState<User[]>([]);

    const [isLoading, setIsLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

---

# Loading Button

Кнопку можна блокувати:

    <button
        onClick={loadUsers}
        disabled={isLoading}
    >
        {isLoading
            ? "Loading..."
            : "Load users"}
    </button>

Це запобігає випадковим повторним clicks.

---

# Loading Text in Button

    <button
        onClick={loadUsers}
        disabled={isLoading}
    >
        {isLoading
            ? "Please wait..."
            : "Load users"}
    </button>

---

# Error + Retry Button

    {error && (
        <div>
            <p>{error}</p>

            <button onClick={loadUsers}>
                Try again
            </button>
        </div>
    )}

---

# Empty State

    if (!isLoading &&
        !error &&
        users.length === 0) {
        return <p>No users found.</p>;
    }

---

# Full Conditional UI

    if (isLoading && users.length === 0) {
        return <p>Loading...</p>;
    }

    if (error && users.length === 0) {
        return (
            <div>
                <p>{error}</p>

                <button onClick={loadUsers}>
                    Try again
                </button>
            </div>
        );
    }

    if (users.length === 0) {
        return <p>No users found.</p>;
    }

    return (
        <UserList users={users} />
    );

---

# Fetching with useEffect

Типовий pattern:

    useEffect(() => {
        loadUsers();
    }, []);

Але сама async function:

    async function loadUsers() {
        ...
    }

може бути оголошена поза effect.

---

# Function Dependency

Якщо функція оголошена всередині компонента:

    async function loadUsers() {
        ...
    }

і використовується в `useEffect`, потрібно уважно ставитися до dependency rules та можливого створення нової функції на кожному render.

Для простого навчального прикладу часто:

    useEffect(() => {
        async function loadUsers() {
            ...
        }

        loadUsers();
    }, []);

є найпростішим варіантом.

У складніших компонентах можуть використовуватися:

    useCallback()
    custom hooks

---

# Cleanup and Loading

Якщо request можна скасувати:

    useEffect(() => {
        const controller =
            new AbortController();

        async function loadUsers() {
            try {
                setIsLoading(true);

                const response = await fetch(
                    "/api/users",
                    {
                        signal:
                            controller.signal
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        `HTTP error: ${response.status}`
                    );
                }

                const data =
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

---

# Abort Error

Abort — це не обов'язково справжня application error.

Наприклад:

    controller.abort();

може призвести до:

    AbortError

Його часто потрібно ігнорувати:

    if (error.name === "AbortError") {
        return;
    }

---

# Loading and Abort

При cancellation потрібно уважно ставитися до:

    setIsLoading(false)

Якщо cleanup виконується під час unmount, компонент уже може не потребувати оновлення UI.

У більш складних custom hooks важливо правильно контролювати lifecycle request.

---

# Race Conditions

Наприклад:

    Request A
        ↓
    old search query

    Request B
        ↓
    new search query

Можливо:

    B finishes
        ↓
    setData(new data)

    A finishes later
        ↓
    setData(old data)

Результат:

    UI показує stale data

---

# Abort Previous Request

При зміні query можна скасувати попередній request.

Концептуально:

    Request A
        ↓
    abort A

    Request B
        ↓
    use B

Це допомагає уникати деяких race conditions.

---

# Error Boundary vs Fetch Error

Це важлива відмінність.

Error Boundary призначений для помилок під час rendering/lifecycle певної частини React tree.

Звичайна помилка `fetch()` не автоматично стає Error Boundary error.

Тому data fetching error потрібно обробляти у власній логіці:

    try
    catch
    error state

---

# Loading Component

Можна створити reusable component:

    function Loading() {
        return (
            <p>Loading...</p>
        );
    }

Використання:

    if (isLoading) {
        return <Loading />;
    }

---

# Error Component

    function ErrorMessage({ message }) {
        return (
            <div role="alert">
                <p>{message}</p>
            </div>
        );
    }

---

# Empty Component

    function EmptyState() {
        return (
            <p>No data found.</p>
        );
    }

---

# Reusable State Components

Можна мати:

    Loading
    ErrorMessage
    EmptyState

і:

    DataView

Тоді UI стає структурованішим:

    Loading
        ↓
    Error
        ↓
    Empty
        ↓
    Data

---

# Accessibility

Loading та error UI потрібно робити доступними.

Для error message можна:

    <div role="alert">
        Failed to load users.
    </div>

Для loading можна використовувати:

    <div
        role="status"
        aria-live="polite"
    >
        Loading...
    </div>

Це допомагає assistive technologies повідомляти про зміни стану.

---

# Loading Spinner Accessibility

Якщо spinner не має тексту:

    <div
        role="status"
        aria-label="Loading"
    >
        ...
    </div>

Не слід покладатися лише на animation.

---

# Avoid Layout Shift

Loading UI бажано приблизно відповідати розміру майбутнього контенту.

Наприклад:

    skeleton
        ↓
    list

часто краще, ніж:

    blank screen
        ↓
    list

Це допомагає зробити UI стабільнішим.

---

# Loading Indicator vs Blocking UI

Не кожен request повинен блокувати весь UI.

Наприклад:

    Initial load
        → full loading state

    Refetch
        → small spinner

    Save button
        → button loading

    Background refresh
        → subtle indicator

---

# Button Loading

Наприклад:

    <button
        disabled={isLoading}
        onClick={handleSave}
    >
        {isLoading
            ? "Saving..."
            : "Save"}
    </button>

Тут loading стосується конкретної операції.

---

# Multiple Requests

Якщо компонент завантажує:

    users
    posts

не обов'язково мати один global loading state.

Можна:

    usersLoading
    postsLoading

або об'єднати requests залежно від UI.

---

# Independent Loading States

Наприклад:

    const [usersLoading, setUsersLoading] =
        useState(false);

    const [postsLoading, setPostsLoading] =
        useState(false);

Це дозволяє незалежно показувати:

    Users loading

та:

    Posts loading

---

# Promise.all

Якщо два requests потрібно виконати паралельно:

    const [usersResponse, postsResponse] =
        await Promise.all([
            fetch("/api/users"),
            fetch("/api/posts")
        ]);

Це може бути ефективніше, ніж:

    await fetch("/api/users");
    await fetch("/api/posts");

коли requests незалежні.

---

# Sequential vs Parallel

Послідовно:

    const users = await fetch("/api/users");

    const posts = await fetch("/api/posts");

Другий request починається після першого.

Паралельно:

    const [users, posts] =
        await Promise.all([
            fetch("/api/users"),
            fetch("/api/posts")
        ]);

Requests виконуються одночасно.

---

# Promise.all Error

`Promise.all()` reject, якщо один із promises reject.

Тому error handling:

    try {
        const [usersResponse, postsResponse] =
            await Promise.all([
                fetch("/api/users"),
                fetch("/api/posts")
            ]);

        ...
    } catch (error) {
        ...
    }

Але HTTP `404` сам по собі не reject `fetch()`, тому `response.ok` все одно потрібно перевіряти.

---

# Loading Multiple Requests

Можна:

    setIsLoading(true);

    try {
        ...
    } finally {
        setIsLoading(false);
    }

Або мати незалежні loading states.

Вибір залежить від UI.

---

# Request Status

Для складнішої логіки можна мати:

    type Status =
        | "idle"
        | "loading"
        | "success"
        | "error";

Наприклад:

    const [status, setStatus] =
        useState<Status>("idle");

---

# Status Flow

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
      ↓
    loading
      ↓
    success

---

# Status + Retry

    async function loadUsers() {
        setStatus("loading");

        try {
            const response =
                await fetch("/api/users");

            if (!response.ok) {
                throw new Error(
                    `HTTP error: ${response.status}`
                );
            }

            const data =
                await response.json();

            setUsers(data);
            setStatus("success");
        } catch (error) {
            setError(error.message);
            setStatus("error");
        }
    }

---

# Practical Example — Complete Users

    import { useEffect, useState } from "react";

    type User = {
        id: number;
        name: string;
    };

    export default function Users() {
        const [users, setUsers] =
            useState<User[]>([]);

        const [isLoading, setIsLoading] =
            useState(false);

        const [error, setError] =
            useState<string | null>(null);

        async function loadUsers() {
            try {
                setIsLoading(true);
                setError(null);

                const response =
                    await fetch("/api/users");

                if (!response.ok) {
                    throw new Error(
                        `HTTP error: ${response.status}`
                    );
                }

                const data: User[] =
                    await response.json();

                setUsers(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError(
                        "Unknown error"
                    );
                }
            } finally {
                setIsLoading(false);
            }
        }

        useEffect(() => {
            loadUsers();
        }, []);

        if (
            isLoading &&
            users.length === 0
        ) {
            return (
                <p>Loading...</p>
            );
        }

        if (
            error &&
            users.length === 0
        ) {
            return (
                <div>
                    <p>
                        Failed to load users.
                    </p>

                    <button
                        onClick={loadUsers}
                    >
                        Try again
                    </button>
                </div>
            );
        }

        if (users.length === 0) {
            return (
                <p>
                    No users found.
                </p>
            );
        }

        return (
            <section>
                {isLoading && (
                    <p>
                        Refreshing...
                    </p>
                )}

                {error && (
                    <p role="alert">
                        Could not refresh data.
                    </p>
                )}

                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.name}
                        </li>
                    ))}
                </ul>

                <button
                    onClick={loadUsers}
                    disabled={isLoading}
                >
                    Reload
                </button>
            </section>
        );
    }

---

# Що відбувається в цьому прикладі

Initial:

    users = []
    isLoading = false
    error = null

Після:

    loadUsers()

отримуємо:

    isLoading = true

UI:

    Loading...

Після successful response:

    users = [...]
    isLoading = false
    error = null

UI:

    User list

При error:

    error = "..."

    isLoading = false

UI:

    Error
    Try again

При retry:

    error = null
    isLoading = true

---

# Практичний Example — Empty

Сервер повернув:

    []

Request успішний:

    response.ok === true

Data:

    users = []

Тоді:

    No users found.

Це не:

    Error

---

# Практичний Example — 500

Сервер повернув:

    500 Internal Server Error

Тоді:

    response.ok === false

Код:

    if (!response.ok) {
        throw new Error(
            `HTTP error: ${response.status}`
        );
    }

Переходимо в:

    catch

і:

    setError(...)

---

# Практичний Example — Network Error

Якщо request не може завершитися:

    fetch()
        ↓
    rejected Promise
        ↓
    catch

Тоді:

    setError(...)

---

# Error Handling Pattern

    async function loadData() {
        try {
            setIsLoading(true);
            setError(null);

            const response =
                await fetch(url);

            if (!response.ok) {
                throw new Error(
                    `HTTP error: ${response.status}`
                );
            }

            const data =
                await response.json();

            setData(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(
                    "Unknown error"
                );
            }
        } finally {
            setIsLoading(false);
        }
    }

---

# Recommended Mental Model

Не думати:

    fetch()
        ↓
    data

Краще:

    request starts
        ↓
    loading
        ↓
    response
        ↓
    ┌──────────────┐
    ↓              ↓
    success       error
    ↓              ↓
    data          error
    ↓
    render

---

# Common Mistakes

❌ Не мати loading state.

    fetch(...)
        ↓
    ...
        ↓
    data

Користувач не розуміє, що відбувається.

---

❌ Встановлювати loading false тільки після success.

Неправильно:

    try {
        ...
        setIsLoading(false);
    } catch {
        ...
    }

При error loading може залишитися:

    true

Краще:

    finally {
        setIsLoading(false);
    }

---

❌ Не очищати стару помилку.

    async function loadData() {
        setIsLoading(true);

        ...
    }

Краще:

    setError(null);

    перед новим request.

---

❌ Вважати `404` network error.

    404
        ↓
    HTTP response
        ↓
    response.ok === false

Це HTTP error.

---

❌ Вважати empty data error.

    []

означає:

    успішний response
    але немає елементів

---

❌ Показувати Loading навіть після завершення request.

Перевіряй:

    setIsLoading(false)

у `finally`.

---

❌ Не disable button під час request.

Це може призвести до:

    request
    request
    request
    request

Коли це не передбачено application logic.

---

❌ Очищати data при кожному refetch без потреби.

Можна втратити корисний старий UI.

---

❌ Показувати технічну помилку користувачу.

Наприклад:

    TypeError: Cannot read properties of undefined...

Краще мати friendly message.

---

❌ Ігнорувати race conditions.

Особливо при:

    search
    filters
    autocomplete
    pagination
    rapidly changing parameters

---

❌ Не враховувати AbortError.

Якщо request скасований навмисно, це не завжди потрібно показувати як помилку.

---

# Loading / Error Checklist

Перед завершенням data-fetching component перевір:

    □ Є loading state?
    □ Є error state?
    □ Є success state?
    □ Є empty state?
    □ Перевіряється response.ok?
    □ Обробляється network error?
    □ Error очищається перед retry?
    □ Loading завершується у finally?
    □ Retry можливий?
    □ Кнопка блокується під час request?
    □ Чи потрібен AbortController?
    □ Чи можливий race condition?
    □ Чи потрібно залишати старі data під час refetch?
    □ Чи зрозуміле повідомлення користувачу?
    □ Чи доступний loading/error UI?

---

# Питання зі співбесіди

Що таке loading state?

Що таке error state?

Що таке success state?

Що таке empty state?

Чому loading state потрібен під час fetch?

Як реалізувати loading state у React?

Як реалізувати error state?

Навіщо потрібен `try...catch`?

Навіщо потрібен `finally`?

Чому `setIsLoading(false)` часто знаходиться у `finally`?

Що станеться, якщо не скинути loading після error?

Що таке network error?

Що таке HTTP error?

Чим network error відрізняється від HTTP error?

Чи є `404` network error?

Чому `fetch()` не кидає exception для `404`?

Як перевірити HTTP error?

Що робить `response.ok`?

Що робить `response.status`?

Як зробити Retry?

Чому потрібно робити `setError(null)` перед новим request?

Що таке empty state?

Чим empty state відрізняється від error state?

Що таке refetch?

Чим initial loading відрізняється від refetching?

Чи потрібно очищати data під час refetch?

Що таке stale data?

Що таке race condition?

Як AbortController допомагає під час fetching?

Що таке AbortError?

Чому loading та error — це state?

Як зробити loading button?

Як disable button під час request?

Що таке conditional rendering?

Як показати різний UI для loading/error/success?

Чому кілька boolean states можуть створювати суперечливі стани?

Що таке status state?

Які стани може мати data-fetching component?

Як описати loading/error/success через TypeScript?

Що таке discriminated union?

Як обробити помилку `401`?

Як обробити `403`?

Як обробити `404`?

Як обробити `500`?

Що робити, якщо під час refetch виникла помилка, але старі data вже є?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке loading state.

Що таке error state.

Що таке success state.

Що таке empty state.

`isLoading`.

`error`.

`data`.

`try`.

`catch`.

`finally`.

`response.ok`.

`response.status`.

Network error.

HTTP error.

Conditional rendering.

Loading UI.

Error UI.

Retry.

Основи refetch.

Основи `useEffect()` + data fetching.

---

🔵 Junior

Впевнене розуміння:

    Initial
    Loading
    Success
    Error
    Empty

Вміння:

    показати Loading
    показати Error
    показати Empty
    показати Data
    зробити Retry
    disable button під час request
    очищати старий error
    використовувати finally

Розуміння:

    HTTP errors
    network errors
    status codes
    refetch
    initial loading
    loading during refetch

Розуміння:

    AbortController
    AbortError
    cleanup
    race conditions
    stale data

---

🟠 Middle

Розуміння:

    server state
    request lifecycle
    state machines
    status state
    request cancellation
    request deduplication
    retry strategies
    stale data
    cache
    background refetching

Вміння проєктувати:

    loading UI
    error UI
    empty UI
    retry logic
    optimistic UI

Розуміння різниці:

    initial loading
    refetching
    background fetching

Розуміння:

    parallel requests
    sequential requests
    Promise.all
    request races
    stale responses

Розуміння API error normalization.

---

🔴 Senior

Глибоке розуміння:

    server-state lifecycle
    state machines
    cache invalidation
    stale-while-revalidate
    request deduplication
    background synchronization
    retry policies
    exponential backoff

Розуміння:

    transient errors
    permanent errors
    retryable errors
    non-retryable errors

Архітектура:

    centralized error handling
    API clients
    server-state abstraction
    caching layer
    request cancellation
    concurrent requests

Performance:

    avoiding waterfalls
    parallel fetching
    prefetching
    background refresh
    cache reuse

UX:

    skeleton loading
    optimistic updates
    stale data presentation
    partial failure
    progressive loading
    resilient UI

---

# Міні-шпаргалка

## Основні states

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

## Loading

    const [isLoading, setIsLoading] =
        useState(false);

---

## Error

    const [error, setError] =
        useState<string | null>(null);

---

## Data

    const [data, setData] =
        useState([]);

---

## Basic pattern

    try {
        setIsLoading(true);
        setError(null);

        const response =
            await fetch(url);

        if (!response.ok) {
            throw new Error(
                `HTTP error: ${response.status}`
            );
        }

        const data =
            await response.json();

        setData(data);
    } catch (error) {
        if (error instanceof Error) {
            setError(error.message);
        }
    } finally {
        setIsLoading(false);
    }

---

## Loading UI

    if (isLoading) {
        return <p>Loading...</p>;
    }

---

## Error UI

    if (error) {
        return (
            <p>
                Error: {error}
            </p>
        );
    }

---

## Empty UI

    if (data.length === 0) {
        return (
            <p>
                No data found.
            </p>
        );
    }

---

## Retry

    <button onClick={loadData}>
        Try again
    </button>

---

## Disable while loading

    <button
        onClick={loadData}
        disabled={isLoading}
    >
        {isLoading
            ? "Loading..."
            : "Load data"}
    </button>

---

## HTTP error

    const response =
        await fetch(url);

    if (!response.ok) {
        throw new Error(
            `HTTP error: ${response.status}`
        );
    }

---

## Network error

    try {
        await fetch(url);
    } catch (error) {
        // network / request failure
    }

---

## Refetch

    data already exists
        ↓
    fetch again
        ↓
    update data

Не обов'язково очищати старі data.

---

## Empty ≠ Error

    []

    → success + empty

а не:

    error

---

## Initial Loading

    no data
       +
    loading
       ↓
    Loading UI

---

## Refetching

    old data
       +
    loading
       ↓
    old data + refresh indicator

---

## Status

    idle
    loading
    success
    error

---

## State machine

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
      ↓
    loading
      ↓
    success

---

# Головне:

• Data fetching має декілька можливих станів.

    initial
    loading
    success
    empty
    error

• `isLoading` показує, що request виконується.

• `error` містить інформацію про помилку.

• `data` містить отримані дані.

• Базова модель:

    data
    isLoading
    error

• Основний pattern:

    try
        ↓
    loading
        ↓
    fetch
        ↓
    response.ok
        ↓
    response.json()
        ↓
    data

    catch
        ↓
    error

    finally
        ↓
    loading = false

• `finally` дуже зручний для:

    setIsLoading(false)

• HTTP `404`, `500` тощо потрібно перевіряти через:

    response.ok

• Network errors обробляються через:

    catch

• `404` — це HTTP error, а не network error.

• Empty data:

    []

не означає error.

• Empty state повинен бути окремим UI state.

• Перед новим request корисно очистити старий error:

    setError(null);

• Retry — повторний запуск request після error.

• Retry button бажано disable під час loading:

    disabled={isLoading}

• Initial loading та refetching — не обов'язково одне й те саме.

• Під час refetch часто краще залишити старі data на екрані:

    old data
        +
    refreshing indicator

• Не потрібно автоматично очищати data перед кожним refetch.

• Error під час refetch не обов'язково означає, що потрібно прибрати старі data.

• Якщо старі data залишаються після failed refetch:

    old data
        +
    refresh error

може бути кращим UX.

• `AbortController` дозволяє скасовувати requests.

• Скасування request потрібно враховувати окремо від справжньої application error.

• При декількох requests потрібно пам'ятати про:

    race conditions
    stale data
    request cancellation

• Для складної логіки можна використовувати:

    idle
    loading
    success
    error

замість декількох boolean states.

• Кілька boolean states можуть створювати нелогічні комбінації:

    isLoading = true
    isError = true
    isSuccess = true

• Status state дозволяє описати взаємовиключні стани.

• У TypeScript можна використовувати discriminated union для точного опису data-fetching state.

• Loading UI може бути:

    text
    spinner
    skeleton
    overlay

• Error UI повинен бути зрозумілим користувачу.

• Технічну інформацію краще залишати для developer logs:

    console.error(error)

• Для accessibility корисні:

    role="alert"

та:

    role="status"

• Основна модель:

    request
       ↓
    loading
       ↓
    ┌──────────────┐
    ↓              ↓
    success       error
    ↓              ↓
    data          message
    ↓              ↓
    UI            retry

• Найважливіша практична конструкція:

    async function loadData() {
        try {
            setIsLoading(true);
            setError(null);

            const response =
                await fetch(url);

            if (!response.ok) {
                throw new Error(
                    `HTTP error: ${response.status}`
                );
            }

            const data =
                await response.json();

            setData(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(
                    "Unknown error"
                );
            }
        } finally {
            setIsLoading(false);
        }
    }

• Для простого React data fetching спочатку добре засвоїти:

    data
    isLoading
    error

потім:

    empty state
    retry
    refetch

і вже далі:

    abort
    race conditions
    stale data
    status state
    custom hooks
    server-state management

• Головна ідея цього розділу:

    Fetching ≠ тільки отримання data.

    Fetching =
        loading
        +
        success
        +
        empty
        +
        error
        +
        retry
        +
        правильний UI для кожного стану.