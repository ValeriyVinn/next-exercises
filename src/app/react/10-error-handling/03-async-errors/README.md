# React — Async Errors

> `react/10-error-handling/03-async-errors`

## Зміст

1. [Що таке async errors](#1-що-таке-async-errors)
2. [Синхронні та асинхронні помилки](#2-синхронні-та-асинхронні-помилки)
3. [Promise rejection](#3-promise-rejection)
4. [`async/await` і `try/catch`](#4-asyncawait-і-trycatch)
5. [Чому Error Boundary не ловить async errors](#5-чому-error-boundary-не-ловить-async-errors)
6. [Async errors у `useEffect`](#6-async-errors-у-useeffect)
7. [Async errors у Fetch API](#7-async-errors-у-fetch-api)
8. [HTTP errors ≠ JavaScript errors](#8-http-errors--javascript-errors)
9. [Обробка `response.ok`](#9-обробка-responseok)
10. [Error state у React](#10-error-state-у-react)
11. [Loading + data + error](#11-loading--data--error)
12. [`finally`](#12-finally)
13. [Обробка помилок форми](#13-обробка-помилок-форми)
14. [Обробка помилок кнопки](#14-обробка-помилок-кнопки)
15. [TypeScript: `catch (error)` має тип `unknown`](#15-typescript-catch-error-має-тип-unknown)
16. [Функція `getErrorMessage`](#16-функція-geterrormessage)
17. [Контрольовані та неочікувані помилки](#17-контрольовані-та-неочікувані-помилки)
18. [AbortController і скасування запиту](#18-abortcontroller-і-скасування-запиту)
19. [Race conditions](#19-race-conditions)
20. [Unhandled Promise Rejection](#20-unhandled-promise-rejection)
21. [Глобальна обробка async errors](#21-глобальна-обробка-async-errors)
22. [Поширені помилки](#22-поширені-помилки)
23. [Практичний шаблон](#23-практичний-шаблон)
24. [Питання на співбесіді](#24-питання-на-співбесіді)
25. [Рівні знань](#25-рівні-знань)
26. [Міні-шпаргалка](#26-міні-шпаргалка)
27. [Головне](#27-головне)

---

# 1. Що таке async errors

**Async error** — це помилка, яка виникає під час виконання асинхронної операції.

Наприклад:

- `fetch()`;
- `Promise`;
- `async/await`;
- запит до REST API;
- читання даних;
- запис даних;
- авторизація;
- завантаження файлу;
- `setTimeout`;
- робота з IndexedDB;
- будь-яка інша Promise-based операція.

У React async errors особливо важливі, тому що:

> Асинхронна помилка не обов'язково виникає в тому самому JavaScript call stack, у якому був запущений React-компонент.

Тому React не може автоматично перетворити кожну async error на UI з повідомленням про помилку.

Наприклад:

    async function loadUsers() {
      const response = await fetch("/api/users");
      return response.json();
    }

Якщо запит завершиться помилкою:

    fetch("/api/users")

може повернути rejected Promise.

Тоді потрібно явно вирішити:

- де перехопити помилку;
- як її зберегти;
- що показати користувачу;
- чи можна повторити операцію;
- чи потрібно записати помилку в лог;
- чи потрібно повідомити систему моніторингу.

---

# 2. Синхронні та асинхронні помилки

Важливо розрізняти два типи.

## Синхронна помилка

Помилка виникає безпосередньо під час виконання функції.

    function divide(a: number, b: number) {
      if (b === 0) {
        throw new Error("Division by zero");
      }

      return a / b;
    }

Її можна перехопити:

    try {
      divide(10, 0);
    } catch (error) {
      console.error(error);
    }

---

## Асинхронна помилка

Помилка виникає всередині Promise.

    async function loadData() {
      throw new Error("Request failed");
    }

Виклик:

    loadData();

повертає rejected Promise.

Тому це вже не звичайний синхронний `throw`, який можна перехопити зовнішнім `try/catch` без `await`.

---

# 3. Promise rejection

Promise може мати два основних результати:

    Promise
      │
      ├── fulfilled
      │
      └── rejected

Наприклад:

    const promise = fetch("/api/users");

Якщо все добре:

    fulfilled

Якщо сталася мережева помилка:

    rejected

З `then/catch`:

    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

Або сучасніший варіант:

    try {
      const response = await fetch("/api/users");
      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error(error);
    }

---

# 4. `async/await` і `try/catch`

## Основний шаблон

Для async-функції найчастіше використовують:

    async function loadUsers() {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();

        return data;
      } catch (error) {
        console.error(error);
      }
    }

Головне:

> `try/catch` повинен охоплювати саме той `await`, який може завершитися rejection.

---

## Правильно

    async function loadUsers() {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();

        return data;
      } catch (error) {
        console.error(error);
      }
    }

---

## Неправильно

    async function loadUsers() {
      const response = await fetch("/api/users");

      try {
        const data = await response.json();

        return data;
      } catch (error) {
        console.error(error);
      }
    }

У цьому прикладі помилка самого `fetch()` не потрапить у `catch`, тому що `fetch()` знаходиться поза `try`.

---

## Важливе правило

    try {
      await asyncOperation();
    } catch (error) {
      // обробка помилки
    }

Це один із головних шаблонів роботи з async errors у React.

---

# 5. Чому Error Boundary не ловить async errors

Це одна з найважливіших речей у React error handling.

**Error Boundary не призначений для перехоплення помилок у:**

- event handlers;
- асинхронному коді;
- `setTimeout`;
- Promise callbacks;
- `fetch`;
- `async/await`.

Наприклад:

    async function handleClick() {
      throw new Error("Async error");
    }

    <button onClick={handleClick}>
      Load
    </button>

Error Boundary не перетворить цю помилку автоматично на fallback UI.

---

## Чому?

Error Boundary працює навколо React rendering/lifecycle механізмів.

Умовно:

    React rendering
          ↓
    Component
          ↓
    Error Boundary
          ↓
    fallback UI

А async operation працює окремо:

    Component
       │
       └── fetch()
              │
              └── Promise
                    │
                    └── rejection

Тому async error потрібно обробити самому.

---

## Неправильне очікування

Не варто думати:

    <ErrorBoundary>
      <UserList />
    </ErrorBoundary>

означає:

> "Тепер усі помилки UserList будуть автоматично перехоплені."

Ні.

Error Boundary не є універсальним `try/catch` для всього асинхронного коду.

---

# 6. Async errors у `useEffect`

Окрема ситуація — завантаження даних після монтування компонента.

Не варто робити сам callback `useEffect` асинхронним:

    useEffect(async () => {
      // ❌ не рекомендовано
    }, []);

Причина в тому, що callback `useEffect` має повертати:

- нічого;
- або cleanup function.

А `async` функція завжди повертає Promise.

---

## Правильний варіант

Створити async-функцію всередині effect:

    useEffect(() => {
      async function loadUsers() {
        try {
          const response = await fetch("/api/users");
          const data = await response.json();

          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }

      loadUsers();
    }, []);

---

## Ще один варіант

    useEffect(() => {
      const loadUsers = async () => {
        try {
          const response = await fetch("/api/users");
          const data = await response.json();

          console.log(data);
        } catch (error) {
          console.error(error);
        }
      };

      loadUsers();
    }, []);

---

## Основна ідея

    useEffect(() => {
      async function loadData() {
        try {
          // async operation
        } catch (error) {
          // handle error
        }
      }

      loadData();
    }, []);

---

# 7. Async errors у Fetch API

`fetch()` має важливу особливість.

Він **не відхиляє Promise тільки через HTTP status**.

Наприклад:

    const response = await fetch("/api/users");

Сервер може відповісти:

    200 OK

або:

    404 Not Found

або:

    500 Internal Server Error

Але сам `fetch()` не обов'язково виконає `catch()` для `404` або `500`.

---

# 8. HTTP errors ≠ JavaScript errors

Це дуже важливе правило.

## HTTP error

Наприклад:

    404 Not Found

    401 Unauthorized

    403 Forbidden

    422 Unprocessable Entity

    500 Internal Server Error

Це **HTTP response**, а не автоматично JavaScript exception.

---

## JavaScript/network error

Наприклад:

    fetch("/api/users")

може завершитися network error.

Тоді Promise буде rejected.

---

## Тому потрібно перевіряти `response.ok`

Наприклад:

    const response = await fetch("/api/users");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

Тепер HTTP-помилка перетворюється на звичайний `throw`, який можна перехопити через `catch`.

---

# 9. Обробка `response.ok`

Повний приклад:

    async function loadUsers() {
      try {
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        return data;
      } catch (error) {
        console.error(error);
      }
    }

Логіка:

    fetch()
       ↓
    response
       ↓
    response.ok ?
       │
       ├── true → parse data
       │
       └── false → throw Error
                         ↓
                       catch

---

# 10. Error state у React

У React помилку часто потрібно зберігати у state.

Наприклад:

    const [error, setError] = useState<string | null>(null);

Початковий стан:

    null

означає:

> помилки немає.

Якщо сталася помилка:

    setError("Не вдалося завантажити користувачів");

Потім UI:

    {error && (
      <p>{error}</p>
    )}

---

## Повний приклад

    function Users() {
      const [users, setUsers] = useState<User[]>([]);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        async function loadUsers() {
          try {
            setError(null);

            const response = await fetch("/api/users");

            if (!response.ok) {
              throw new Error("Failed to load users");
            }

            const data = await response.json();

            setUsers(data);
          } catch (error) {
            setError("Не вдалося завантажити користувачів");
          }
        }

        loadUsers();
      }, []);

      if (error) {
        return <p>{error}</p>;
      }

      return (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      );
    }

---

# 11. Loading + data + error

Для async UI часто потрібні щонайменше три стани:

    loading
    data
    error

Наприклад:

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

---

## Типовий flow

    start
      ↓
    loading = true
      ↓
    request
      ↓
    ┌───────────────┐
    │               │
    ↓               ↓
    success       error
    │               │
    ↓               ↓
    data          error
    │               │
    └───────┬───────┘
            ↓
       loading = false

---

## Приклад

    async function loadUsers() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error("Failed to load users");
        }

        const data = await response.json();

        setUsers(data);
      } catch (error) {
        setError("Не вдалося завантажити дані");
      } finally {
        setLoading(false);
      }
    }

---

# 12. `finally`

`finally` виконується незалежно від результату:

    try {
      // success
    } catch (error) {
      // error
    } finally {
      // always
    }

Для React async operations це особливо корисно для:

- `setLoading(false)`;
- очищення ресурсів;
- скидання тимчасового стану;
- завершення progress indicator.

---

## Приклад

    async function loadUsers() {
      setLoading(true);

      try {
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = await response.json();

        setUsers(data);
      } catch (error) {
        setError("Не вдалося завантажити дані");
      } finally {
        setLoading(false);
      }
    }

---

## Чому `finally` кращий

Замість:

    try {
      ...
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }

краще:

    try {
      ...
    } catch (error) {
      ...
    } finally {
      setLoading(false);
    }

Так менше дублювання.

---

# 13. Обробка помилок форми

Форми дуже часто використовують async operations.

Наприклад:

    async function handleSubmit(
      event: React.FormEvent<HTMLFormElement>
    ) {
      event.preventDefault();

      try {
        const response = await fetch("/api/users", {
          method: "POST",
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to create user");
        }

        // success
      } catch (error) {
        // error
      }
    }

---

## UI для помилки

    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(
      event: React.FormEvent<HTMLFormElement>
    ) {
      event.preventDefault();

      setError(null);

      try {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to create user");
        }
      } catch (error) {
        setError("Не вдалося зберегти дані");
      }
    }

---

# 14. Обробка помилок кнопки

Наприклад, кнопка запускає async operation:

    async function handleDelete() {
      try {
        await deleteUser(userId);
      } catch (error) {
        setError("Не вдалося видалити користувача");
      }
    }

    <button onClick={handleDelete}>
      Delete
    </button>

---

## Додатково: loading state

    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleDelete() {
      setDeleting(true);
      setError(null);

      try {
        await deleteUser(userId);
      } catch (error) {
        setError("Не вдалося видалити користувача");
      } finally {
        setDeleting(false);
      }
    }

    <button
      onClick={handleDelete}
      disabled={deleting}
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>

Це також запобігає повторному запуску операції під час попереднього запиту.

---

# 15. TypeScript: `catch (error)` має тип `unknown`

У TypeScript не можна автоматично припускати, що `error` — це `Error`.

Наприклад:

    try {
      await loadUsers();
    } catch (error) {
      console.log(error.message);
    }

Це може викликати помилку TypeScript:

    Property 'message' does not exist on type 'unknown'.

---

## Чому?

JavaScript дозволяє зробити:

    throw "Something went wrong";

або:

    throw 123;

або:

    throw {
      message: "Error"
    };

Тому TypeScript не може гарантувати, що це `Error`.

---

## Правильна перевірка

    try {
      await loadUsers();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }

---

## Повний приклад

    try {
      await loadUsers();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error");
      }
    }

---

# 16. Функція `getErrorMessage`

У реальному проєкті зручно мати helper:

    function getErrorMessage(error: unknown): string {
      if (error instanceof Error) {
        return error.message;
      }

      return "Unknown error";
    }

Тоді:

    try {
      await loadUsers();
    } catch (error) {
      setError(getErrorMessage(error));
    }

---

## Покращений варіант

    function getErrorMessage(error: unknown): string {
      if (error instanceof Error) {
        return error.message;
      }

      if (typeof error === "string") {
        return error;
      }

      return "Something went wrong";
    }

---

## Чому це корисно

Замість повторення:

    if (error instanceof Error) {
      ...
    }

у кожному `catch` можна використовувати:

    setError(getErrorMessage(error));

---

# 17. Контрольовані та неочікувані помилки

Не кожна помилка повинна оброблятися однаково.

Корисно розділяти помилки на дві категорії.

---

## 17.1. Очікувані / контрольовані

Наприклад:

- неправильний пароль;
- email уже використовується;
- користувача не знайдено;
- недостатньо прав;
- validation error;
- сервер повернув `422`;
- сервер повернув `404`;
- network request failed.

Такі помилки можна показувати користувачу:

    setError("Неправильний пароль");

---

## 17.2. Неочікувані

Наприклад:

    TypeError

    Cannot read properties of undefined

або:

    ReferenceError

або серйозна логічна помилка.

Такі помилки не варто просто приховувати:

    catch (error) {
      // ❌ нічого не робимо
    }

Краще:

    catch (error) {
      console.error(error);

      setError("Сталася неочікувана помилка");
    }

У production також може використовуватися система error monitoring.

---

# 18. AbortController і скасування запиту

Асинхронний запит може стати непотрібним.

Наприклад:

1. компонент почав завантаження;
2. користувач залишив сторінку;
3. запит ще виконується;
4. результат більше не потрібен.

Для `fetch()` можна використовувати `AbortController`.

---

## Приклад

    useEffect(() => {
      const controller = new AbortController();

      async function loadUsers() {
        try {
          const response = await fetch("/api/users", {
            signal: controller.signal,
          });

          if (!response.ok) {
            throw new Error("Failed to load users");
          }

          const data = await response.json();

          setUsers(data);
        } catch (error) {
          if (error instanceof DOMException && error.name === "AbortError") {
            return;
          }

          setError(getErrorMessage(error));
        }
      }

      loadUsers();

      return () => {
        controller.abort();
      };
    }, []);

---

## Що відбувається

    useEffect
       ↓
    create AbortController
       ↓
    fetch(signal)
       ↓
    component unmount
       ↓
    cleanup
       ↓
    controller.abort()
       ↓
    request cancelled

---

## Важливо

Скасування запиту — не обов'язково справжня помилка для користувача.

Тому часто:

    if (error instanceof DOMException && error.name === "AbortError") {
      return;
    }

Тобто cancellation просто ігнорується.

---

# 19. Race conditions

Асинхронні операції можуть завершуватися не в тому порядку, у якому були запущені.

Наприклад:

    Request A
       ↓
       ────────────────→ response

    Request B
       ↓
       ───────→ response

B завершився раніше за A.

Якщо просто записувати результат у state, старий A може перезаписати нові дані B.

---

## Приклад ситуації

Користувач швидко вводить:

    React

потім:

    React Router

Запускаються:

    request("React")
    request("React Router")

Але сервер може відповісти:

    React Router
       ↓
    first

    React
       ↓
    second

Тоді старий запит може перезаписати новий результат.

---

## Один із способів

Використовувати `AbortController` для попереднього запиту.

Ідея:

    new request
         ↓
    abort previous request
         ↓
    start current request

---

## Важливо

Race conditions — це вже не просто "помилка Promise".

Це проблема правильного керування життєвим циклом async operations.

---

# 20. Unhandled Promise Rejection

Якщо Promise відхилився, але ніхто не обробив rejection, виникає:

    Unhandled Promise Rejection

Наприклад:

    async function loadUsers() {
      throw new Error("Failed");
    }

    loadUsers();

Тут Promise повертається, але rejection ніхто не обробляє.

---

## Правильно

    try {
      await loadUsers();
    } catch (error) {
      console.error(error);
    }

---

## Або

    loadUsers().catch((error) => {
      console.error(error);
    });

---

## У React

Не варто залишати:

    onClick={() => loadUsers()}

якщо `loadUsers()` може відхилити Promise і всередині немає власного `try/catch`.

Краще:

    async function handleClick() {
      try {
        await loadUsers();
      } catch (error) {
        setError(getErrorMessage(error));
      }
    }

    <button onClick={handleClick}>
      Load
    </button>

---

# 21. Глобальна обробка async errors

У браузері можна слухати глобальні необроблені Promise rejection.

Наприклад:

    window.addEventListener(
      "unhandledrejection",
      (event) => {
        console.error("Unhandled rejection:", event.reason);
      }
    );

Це може бути корисно для:

- logging;
- monitoring;
- діагностики;
- error reporting.

Але:

> Глобальний handler не повинен замінювати локальну обробку помилок.

---

## Чому?

UI часто повинен знати конкретний контекст помилки.

Наприклад:

    "Не вдалося завантажити список користувачів"

набагато корисніше для користувача, ніж:

    "Something went wrong"

Глобальний handler не знає всього UI-контексту.

---

# 22. Поширені помилки

## 22.1. Очікувати, що Error Boundary перехопить async error

    <ErrorBoundary>
      <Users />
    </ErrorBoundary>

і думати, що:

    fetch()
      ↓
    rejected Promise
      ↓
    Error Boundary

❌ Не варто так розраховувати.

Async operation потрібно обробляти окремо.

---

# 22.2. Забути `response.ok`

Неправильно:

    const response = await fetch("/api/users");
    const data = await response.json();

HTTP `404` або `500` не обов'язково потрапить у `catch`.

Краще:

    const response = await fetch("/api/users");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

---

# 22.3. `try/catch` стоїть не там

Неправильно:

    const response = await fetch("/api/users");

    try {
      return await response.json();
    } catch (error) {
      ...
    }

Якщо `fetch()` завершиться rejection, цей `catch` його не перехопить.

---

# 22.4. Порожній `catch`

Погано:

    try {
      await saveUser();
    } catch (error) {
    }

Користувач не знає, що сталося.

Також помилка може бути повністю прихована від розробника.

---

# 22.5. Просто `console.log(error)`

Наприклад:

    catch (error) {
      console.log(error);
    }

Це корисно під час debugging, але не є повноцінною UI-обробкою.

Користувач все одно повинен отримати зрозумілий стан:

    "Не вдалося зберегти дані."

---

# 22.6. Виводити технічну помилку користувачу

Не варто бездумно показувати:

    Cannot read properties of undefined (reading 'map')

Користувачу краще:

    Не вдалося завантажити список.

Технічну інформацію можна залишити для developer logging.

---

# 22.7. Не скидати стару помилку

Наприклад:

    const [error, setError] = useState<string | null>(null);

Після першої помилки:

    setError("Request failed");

Користувач натискає Retry.

Перед новим запитом бажано:

    setError(null);

Інакше старе повідомлення може залишатися під час нового запиту.

---

# 22.8. Не використовувати `finally`

Погано:

    try {
      ...
      setLoading(false);
    } catch (error) {
      ...
      setLoading(false);
    }

Краще:

    try {
      ...
    } catch (error) {
      ...
    } finally {
      setLoading(false);
    }

---

# 22.9. Не блокувати повторний submit

Користувач може натиснути:

    Save
    Save
    Save

до завершення першого запиту.

Тому часто:

    <button disabled={loading}>
      {loading ? "Saving..." : "Save"}
    </button>

---

# 23. Практичний шаблон

Один із корисних універсальних шаблонів для React:

    type Status = "idle" | "loading" | "success" | "error";

    function Users() {
      const [users, setUsers] = useState<User[]>([]);
      const [status, setStatus] = useState<Status>("idle");
      const [error, setError] = useState<string | null>(null);

      async function loadUsers() {
        setStatus("loading");
        setError(null);

        try {
          const response = await fetch("/api/users");

          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }

          const data: User[] = await response.json();

          setUsers(data);
          setStatus("success");
        } catch (error) {
          console.error(error);

          setError(getErrorMessage(error));
          setStatus("error");
        }
      }

      return (
        <section>
          <button
            onClick={loadUsers}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Loading..." : "Load users"}
          </button>

          {status === "error" && (
            <p>{error}</p>
          )}

          {status === "success" && (
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  {user.name}
                </li>
              ))}
            </ul>
          )}
        </section>
      );
    }

---

# 24. Практичний шаблон для POST

    async function handleSubmit(
      event: React.FormEvent<HTMLFormElement>
    ) {
      event.preventDefault();

      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const user = await response.json();

        console.log("Created:", user);
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    }

---

# 25. Хороша структура async operation

Для більшості React applications можна мислити так:

    User action
        ↓
    async function
        ↓
    setLoading(true)
        ↓
    clear previous error
        ↓
    await operation
        ↓
    ┌──────────────┐
    │              │
    ↓              ↓
    success       error
    │              │
    ↓              ↓
    setData       setError
    │              │
    └──────┬───────┘
           ↓
       finally
           ↓
    setLoading(false)

Це дуже корисна базова модель.

---

# 26. Помилки в async helper functions

Не обов'язково робити `try/catch` у кожній функції.

Наприклад:

    async function fetchUsers() {
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      return response.json();
    }

Тут helper **не обробляє** помилку.

Він її передає наверх.

---

## Компонент обробляє помилку

    async function loadUsers() {
      setLoading(true);
      setError(null);

      try {
        const users = await fetchUsers();

        setUsers(users);
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    }

Це часто хороша архітектура.

---

## Чому?

Helper відповідає за:

    request → response → data

Компонент відповідає за:

    data → UI

Тобто:

    fetchUsers()
         ↓
       data
         ↓
    React component
         ↓
        UI

А при помилці:

    fetchUsers()
         ↓
       throw
         ↓
    component catch
         ↓
    error state
         ↓
       error UI

---

# 27. Де краще ловити помилку?

Не існує правила:

> "Кожна функція повинна мати свій `try/catch`."

Навпаки, іноді краще дати помилці піднятися до рівня, де є достатньо інформації для її обробки.

Наприклад:

    API helper
        ↓
    throw error
        ↓
    React hook/component
        ↓
    setError()
        ↓
    UI

Це часто чистіше, ніж:

    API helper
        ↓
    catch
        ↓
    console.log()
        ↓
    component нічого не знає

---

# 28. `throw` vs `return error`

Є два підходи.

## Варіант 1 — `throw`

    async function fetchUsers() {
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      return response.json();
    }

Використання:

    try {
      const users = await fetchUsers();
    } catch (error) {
      ...
    }

---

## Варіант 2 — повертати результат

Наприклад:

    type Result<T> =
      | {
          success: true;
          data: T;
        }
      | {
          success: false;
          error: string;
        };

Тоді:

    async function fetchUsers(): Promise<Result<User[]>> {
      try {
        const response = await fetch("/api/users");

        if (!response.ok) {
          return {
            success: false,
            error: "Failed to fetch users",
          };
        }

        const data = await response.json();

        return {
          success: true,
          data,
        };
      } catch {
        return {
          success: false,
          error: "Network error",
        };
      }
    }

Це вже більш просунутий підхід.

Для початку достатньо добре розуміти `throw` + `try/catch`.

---

# 29. Async errors і React state

Важливо розуміти:

    throw new Error(...)

сам по собі **не створює UI**.

React не знає, що потрібно показати.

Тому:

    catch (error) {
      setError("Не вдалося завантажити дані");
    }

змінює state.

React бачить зміну state:

    state changed
        ↓
    re-render
        ↓
    error UI

---

# 30. Async error як частина UI state

Корисно мислити про async operation як про state machine:

    idle
      ↓
    loading
      ↓
    ┌───────────┐
    │           │
    ↓           ↓
    success    error

Наприклад:

    type Status =
      | "idle"
      | "loading"
      | "success"
      | "error";

Це часто краще, ніж багато незалежних boolean:

    isLoading
    hasError
    isSuccess
    ...

---

# 31. Повторна спроба — Retry

Якщо операція завершилася помилкою, UI може запропонувати:

    Retry

Наприклад:

    {error && (
      <div>
        <p>{error}</p>

        <button onClick={loadUsers}>
          Try again
        </button>
      </div>
    )}

Flow:

    request
      ↓
    error
      ↓
    show error
      ↓
    Retry
      ↓
    request again

---

# 32. Retry і очищення помилки

При повторній спробі:

    async function loadUsers() {
      setError(null);
      setLoading(true);

      try {
        ...
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    }

Спочатку:

    setError(null);

Потім:

    request

Так UI не показує стару помилку як результат нового запиту.

---

# 33. Async errors і cleanup

Асинхронна операція може завершитися після того, як компонент перестав бути актуальним.

Тому потрібно враховувати:

- cleanup;
- cancellation;
- race conditions;
- актуальність результату.

Особливо це важливо для:

- пошуку;
- autocomplete;
- filters;
- pagination;
- швидкої зміни параметрів;
- API requests.

---

# 34. Не всі async errors потрібно показувати

Наприклад:

    AbortError

може означати:

> користувач змінив сторінку або почав новий запит.

Це не обов'язково помилка, яку потрібно показувати:

    "Something went wrong"

Тому async error handling — це не просто:

    catch → show error

А:

    catch
      ↓
    classify error
      ↓
    expected?
      ├── yes → appropriate UI
      └── no  → log/report + generic UI

---

# 35. Різні рівні обробки помилок

У хорошому React application може бути кілька рівнів:

    API / service layer
        ↓
    request errors
        ↓
    hook / component
        ↓
    UI error state
        ↓
    Error Boundary
        ↓
    global monitoring

Але кожен рівень має свою відповідальність.

---

## Service layer

Відповідає за:

- HTTP;
- parsing;
- API-specific errors.

---

## Hook / component

Відповідає за:

- loading;
- error state;
- retry;
- UI behavior.

---

## Error Boundary

Відповідає за:

- render-time errors;
- errors у React tree, які він призначений ловити.

---

## Global monitoring

Відповідає за:

- logging;
- diagnostics;
- production monitoring.

---

# 36. `useCallback` не обробляє async errors

Іноді помилково думають, що:

    const handleClick = useCallback(async () => {
      ...
    }, []);

робить функцію безпечною.

Ні.

`useCallback` лише допомагає мемоізувати функцію між render'ами.

Він не:

- ловить помилки;
- обробляє Promise;
- створює error boundary;
- робить async code безпечним.

Потрібен звичайний:

    try {
      await ...
    } catch (error) {
      ...
    }

---

# 37. `preventDefault()` не обробляє помилки

Наприклад:

    event.preventDefault();

робить лише одне:

> скасовує стандартну поведінку браузера.

Він не означає:

    "обробити JavaScript error"

Тобто:

    event.preventDefault();

і:

    try {
      ...
    } catch {
      ...
    }

вирішують абсолютно різні задачі.

---

# 38. `stopPropagation()` не обробляє помилки

Так само:

    event.stopPropagation();

зупиняє поширення event.

Але не ловить:

    Promise rejection

або:

    throw new Error(...)

Тому:

    stopPropagation()

≠

    error handling

---

# 39. Що потрібно пам'ятати

> **Async error — це найчастіше rejected Promise.**

> **`try/catch` повинен охоплювати `await`, який може завершитися помилкою.**

> **`fetch()` не вважає HTTP `404` або `500` JavaScript exception автоматично.**

> **Перевіряй `response.ok`.**

> **Error Boundary не є універсальним обробником async errors.**

> **Для UI зберігай помилку у state.**

> **`finally` зручно використовувати для `setLoading(false)`.**

> **У TypeScript `catch (error)` слід розглядати як `unknown`.**

> **Не показуй користувачу сирі технічні помилки.**

> **Не залишай rejected Promise необробленим.**

> **Cancellation не завжди є помилкою для користувача.**

> **API/service layer може `throw`, а component/hook може обробити помилку на рівні UI.**

---

# 40. Питання на співбесіді

## 1. Що таке async error?

Помилка, яка виникає під час асинхронної операції та часто проявляється як rejected Promise.

---

## 2. Як обробити Promise rejection?

Через:

    try {
      await promise;
    } catch (error) {
      ...
    }

або:

    promise.catch((error) => {
      ...
    });

---

## 3. Чи ловить Error Boundary помилки `fetch()`?

Ні, не автоматично.

Async operations потрібно обробляти окремо.

---

## 4. Чи викличе `fetch()` `catch()` при HTTP 404?

Не обов'язково.

`fetch()` зазвичай resolve-ить Promise з `Response`, навіть якщо status — `404`.

Тому потрібно:

    if (!response.ok) {
      throw new Error(...);
    }

---

## 5. Чому `response.ok` важливий?

Тому що дозволяє перетворити HTTP failure на JavaScript exception, який можна обробити через `catch`.

---

## 6. Як правильно використовувати async function у `useEffect`?

Не робити:

    useEffect(async () => {
      ...
    }, []);

Краще:

    useEffect(() => {
      async function loadData() {
        try {
          ...
        } catch (error) {
          ...
        }
      }

      loadData();
    }, []);

---

## 7. Навіщо потрібен `finally`?

Для коду, який повинен виконатися незалежно від success/error.

Наприклад:

    setLoading(false);

---

## 8. Чому `catch (error)` у TypeScript має `unknown`?

Тому що JavaScript дозволяє `throw` будь-якого значення.

---

## 9. Як перевірити, що помилка є `Error`?

    if (error instanceof Error) {
      console.log(error.message);
    }

---

## 10. Що таке unhandled Promise rejection?

Це rejected Promise, для якого не було відповідного обробника.

---

## 11. Для чого потрібен `AbortController`?

Для скасування операцій, зокрема `fetch()`.

---

## 12. Чи кожну async error потрібно показувати користувачу?

Ні.

Наприклад, cancellation може бути внутрішньою технічною подією.

---

# 41. Рівні знань

## 🟢 Core

Потрібно знати:

- Promise;
- `async/await`;
- `try/catch`;
- `finally`;
- rejected Promise;
- `fetch`;
- `response.ok`;
- error state;
- loading state.

Приклад:

    try {
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();

      setData(data);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }

---

# 42. 🟢 Junior

Потрібно розуміти:

- різницю між HTTP error і JavaScript error;
- чому `fetch()` не reject для кожного HTTP status;
- чому Error Boundary не замінює `try/catch`;
- `loading / success / error`;
- `finally`;
- TypeScript `unknown`;
- `AbortController`;
- retry;
- unhandled Promise rejection.

---

# 43. 🟡 Middle

Потрібно розуміти:

- де саме обробляти async errors;
- service layer vs component;
- error classification;
- retry strategies;
- cancellation;
- race conditions;
- request lifecycle;
- reusable data-fetching hooks;
- централізоване API error handling;
- production logging;
- monitoring.

---

# 44. 🔴 Senior

Потрібно думати системно:

    API
      ↓
    service layer
      ↓
    data-fetching layer
      ↓
    React state
      ↓
    UI
      ↓
    error boundary
      ↓
    monitoring

І розрізняти:

- expected errors;
- validation errors;
- authorization errors;
- network errors;
- cancellation;
- timeout;
- server errors;
- programmer errors;
- race conditions;
- stale responses;
- retryable errors;
- non-retryable errors.

---

# 45. Міні-шпаргалка

## Async function

    async function loadData() {
      ...
    }

---

## `await`

    const data = await loadData();

---

## `try/catch`

    try {
      await loadData();
    } catch (error) {
      ...
    }

---

## `finally`

    try {
      ...
    } catch {
      ...
    } finally {
      setLoading(false);
    }

---

## Fetch

    const response = await fetch("/api/users");

---

## HTTP error

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

---

## Parse JSON

    const data = await response.json();

---

## Error state

    const [error, setError] = useState<string | null>(null);

---

## Loading state

    const [loading, setLoading] = useState(false);

---

## TypeScript

    catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }

---

## Helper

    function getErrorMessage(error: unknown): string {
      if (error instanceof Error) {
        return error.message;
      }

      return "Unknown error";
    }

---

## Retry

    <button onClick={loadData}>
      Try again
    </button>

---

## Disable during request

    <button disabled={loading}>
      {loading ? "Loading..." : "Load"}
    </button>

---

## AbortController

    const controller = new AbortController();

    fetch("/api/users", {
      signal: controller.signal,
    });

    controller.abort();

---

# 46. Головне

Async error handling у React можна звести до кількох головних правил:

    1. Async operation може завершитися rejected Promise.

    2. Використовуй try/catch разом з await.

    3. Error Boundary не є заміною для async error handling.

    4. fetch() не вважає 404/500 автоматично JavaScript exception.

    5. Перевіряй response.ok.

    6. Помилку, яку потрібно показати в UI,
       зберігай у React state.

    7. Loading state заверши у finally.

    8. У TypeScript treat catch(error) як unknown.

    9. Не залишай Promise rejection необробленим.

    10. Не показуй користувачу сирі технічні помилки.

    11. Враховуй cancellation та race conditions.

    12. Відділяй API/service logic від UI error handling.

---

## Найважливіший шаблон

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/data");

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        setData(data);
      } catch (error) {
        console.error(error);

        setError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    }

Цей шаблон варто добре розуміти, тому що він поєднує майже всі базові принципи роботи з async errors у React:

    async/await
        +
    try/catch
        +
    fetch
        +
    response.ok
        +
    error state
        +
    loading state
        +
    finally
        +
    TypeScript unknown
        +
    UI error handling

> **React не може автоматично вирішити, що робити з кожною асинхронною помилкою. Тому хороший React-розробник не просто "ловить error", а правильно визначає: де виникла помилка, хто повинен її обробити, чи потрібно показувати її користувачу, чи можна повторити операцію та чи потрібно її записати в monitoring.**