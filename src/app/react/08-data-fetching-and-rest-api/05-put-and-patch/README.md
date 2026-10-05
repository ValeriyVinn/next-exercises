# PUT та PATCH у React

> `PUT` і `PATCH` використовуються для **оновлення даних на сервері**.
>
> У React вони зазвичай викликаються через `fetch()` після дії користувача: `onSubmit`, `onClick` тощо.
>
> Головна ідея:
>
> **React → fetch → PUT/PATCH → API → Backend → Database**

---

# 1. Що таке PUT і PATCH

`PUT` та `PATCH` — це HTTP-методи для зміни вже існуючого ресурсу.

Наприклад, маємо користувача:

    {
      "id": 10,
      "name": "Valeriy",
      "email": "valeriy@example.com",
      "age": 56
    }

Можемо:

- `PUT` — передати нову повну версію ресурсу;
- `PATCH` — змінити лише окремі поля.

---

# 2. PUT vs PATCH

| Метод | Призначення | Типовий підхід |
|---|---|---|
| `GET` | отримати дані | читання |
| `POST` | створити ресурс | створення |
| `PUT` | замінити ресурс | повне оновлення |
| `PATCH` | частково оновити ресурс | часткова зміна |
| `DELETE` | видалити ресурс | видалення |

Головна різниця:

    PUT   → "Ось нова повна версія ресурсу"

    PATCH → "Зміни тільки ці поля"

---

# 3. Приклад ресурсу

Нехай API має:

    GET /api/users/10

Відповідь:

    {
      "id": 10,
      "name": "Valeriy",
      "email": "valeriy@example.com",
      "age": 56
    }

Ми хочемо змінити ім'я.

---

# 4. PUT

При `PUT` зазвичай передається повне представлення ресурсу:

    PUT /api/users/10

    {
      "name": "Oleksandr",
      "email": "valeriy@example.com",
      "age": 56
    }

Ідея:

    старий ресурс
          ↓
    повна нова версія
          ↓
        PUT
          ↓
    новий ресурс

---

# 5. PATCH

При `PATCH` можна передати тільки те поле, яке потрібно змінити:

    PATCH /api/users/10

    {
      "name": "Oleksandr"
    }

Ідея:

    старий ресурс
          ↓
    змінити тільки name
          ↓
       PATCH
          ↓
    оновлений ресурс

---

# 6. Синтаксис fetch() для PUT

Базовий приклад:

    const response = await fetch("/api/users/10", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Oleksandr",
        email: "valeriy@example.com",
        age: 56,
      }),
    });

---

# 7. Синтаксис fetch() для PATCH

Аналогічно:

    const response = await fetch("/api/users/10", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Oleksandr",
      }),
    });

---

# 8. Розберемо fetch() по частинах

    fetch("/api/users/10", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Oleksandr",
      }),
    });

Тут:

    "/api/users/10"
    → URL ресурсу

    method: "PATCH"
    → HTTP-метод

    headers
    → інформація про формат запиту

    Content-Type: "application/json"
    → body містить JSON

    JSON.stringify(...)
    → перетворення JavaScript-об'єкта у JSON-рядок

---

# 9. Чому потрібен JSON.stringify()

У JavaScript:

    const data = {
      name: "Oleksandr",
    };

Це JavaScript-об'єкт.

А HTTP body у цьому випадку передаємо як JSON:

    body: JSON.stringify(data)

Після перетворення:

    {
      "name": "Oleksandr"
    }

Тобто:

    JavaScript object
          ↓
    JSON.stringify()
          ↓
    JSON string
          ↓
    HTTP request body

---

# 10. Чому потрібен Content-Type

Якщо передаємо JSON:

    headers: {
      "Content-Type": "application/json",
    }

Це повідомляє серверу:

> Body цього HTTP-запиту містить JSON.

Повний приклад:

    const response = await fetch("/api/users/10", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Oleksandr",
      }),
    });

---

# 11. Читання відповіді сервера

Після `fetch()`:

    const response = await fetch("/api/users/10", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Oleksandr",
      }),
    });

Якщо сервер повертає JSON:

    const data = await response.json();

Наприклад:

    {
      "id": 10,
      "name": "Oleksandr",
      "email": "valeriy@example.com",
      "age": 56
    }

---

# 12. Важливо: fetch() не кидає помилку для 4xx/5xx

Це одна з найважливіших речей при роботі з `fetch()`.

Такий запит:

    const response = await fetch("/api/users/10");

не потрапить автоматично в `catch`, якщо сервер повернув:

    404
    400
    500

Тому потрібно перевіряти:

    response.ok

Наприклад:

    if (!response.ok) {
      throw new Error("Не вдалося оновити користувача");
    }

---

# 13. Базовий PATCH із перевіркою response.ok

    const response = await fetch("/api/users/10", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Oleksandr",
      }),
    });

    if (!response.ok) {
      throw new Error("Не вдалося оновити користувача");
    }

    const updatedUser = await response.json();

---

# 14. PATCH у React

Припустимо, маємо форму:

    import { useState } from "react";

    type User = {
      id: number;
      name: string;
      email: string;
    };

    type Props = {
      user: User;
    };

    export default function EditUserForm({ user }: Props) {
      const [name, setName] = useState(user.name);

      async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
      ) {
        event.preventDefault();

        const response = await fetch(`/api/users/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
          }),
        });

        if (!response.ok) {
          throw new Error("Не вдалося оновити користувача");
        }

        const updatedUser: User = await response.json();

        console.log(updatedUser);
      }

      return (
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <button type="submit">
            Зберегти
          </button>
        </form>
      );
    }

---

# 15. Чому event.preventDefault()

У звичайній HTML-формі:

    <form>

після submit браузер може виконати стандартну поведінку форми — навігацію або перезавантаження сторінки.

У React SPA зазвичай хочемо контролювати submit самостійно.

Тому:

    event.preventDefault();

Отримуємо:

    form submit
        ↓
    preventDefault()
        ↓
    fetch()
        ↓
    PATCH
        ↓
    API

---

# 16. Controlled input

У React поле форми часто є controlled component:

    const [name, setName] = useState(user.name);

    <input
      value={name}
      onChange={(event) => setName(event.target.value)}
    />

Дані рухаються так:

    input
      ↓
    onChange
      ↓
    setName()
      ↓
    state
      ↓
    submit
      ↓
    PATCH

---

# 17. PUT у React

Приклад повного оновлення:

    async function handleSubmit(
      event: React.FormEvent<HTMLFormElement>
    ) {
      event.preventDefault();

      const response = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error("Не вдалося оновити користувача");
      }

      const updatedUser = await response.json();

      console.log(updatedUser);
    }

---

# 18. PUT і PATCH на практиці

Наприклад, користувач:

    {
      "id": 10,
      "name": "Valeriy",
      "email": "valeriy@example.com",
      "role": "student"
    }

Потрібно змінити тільки `name`.

### PATCH

    PATCH /api/users/10

    {
      "name": "Oleksandr"
    }

### PUT

    PUT /api/users/10

    {
      "name": "Oleksandr",
      "email": "valeriy@example.com",
      "role": "student"
    }

---

# 19. Важливе зауваження щодо PUT

У REST-підході `PUT` семантично означає заміну ресурсу.

Тому концептуально:

    PUT

це:

    "Ось нове представлення ресурсу"

а не:

    "Зміни тільки одне поле"

Для часткових змін зазвичай логічніше використовувати:

    PATCH

---

# 20. PATCH особливо зручний для форм

Наприклад, користувач редагує тільки email:

    PATCH /api/users/10

    {
      "email": "new@example.com"
    }

Або тільки пароль:

    PATCH /api/users/10

    {
      "password": "new-password"
    }

Або тільки статус:

    PATCH /api/users/10

    {
      "status": "active"
    }

---

# 21. Loading state

Оновлення даних також може тривати певний час.

Тому:

    const [isLoading, setIsLoading] = useState(false);

При submit:

    setIsLoading(true);

Після завершення:

    setIsLoading(false);

---

# 22. try / catch / finally

Зручно використовувати:

    async function handleSubmit(
      event: React.FormEvent<HTMLFormElement>
    ) {
      event.preventDefault();

      setIsLoading(true);

      try {
        const response = await fetch(`/api/users/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
          }),
        });

        if (!response.ok) {
          throw new Error("Не вдалося оновити користувача");
        }

        const updatedUser = await response.json();

        console.log(updatedUser);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

`finally` виконається незалежно від того, чи була помилка.

---

# 23. Повний компонент редагування

    import { useState } from "react";

    type User = {
      id: number;
      name: string;
      email: string;
    };

    type Props = {
      user: User;
    };

    export default function EditUserForm({ user }: Props) {
      const [name, setName] = useState(user.name);
      const [email, setEmail] = useState(user.email);

      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);
      const [success, setSuccess] = useState(false);

      async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
      ) {
        event.preventDefault();

        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
          const response = await fetch(`/api/users/${user.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
            }),
          });

          if (!response.ok) {
            throw new Error("Не вдалося оновити користувача");
          }

          const updatedUser: User = await response.json();

          console.log(updatedUser);

          setSuccess(true);
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : "Сталася невідома помилка"
          );
        } finally {
          setIsLoading(false);
        }
      }

      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">
              Ім'я
            </label>

            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Збереження..." : "Зберегти"}
          </button>

          {error && (
            <p>{error}</p>
          )}

          {success && (
            <p>Дані успішно оновлено.</p>
          )}
        </form>
      );
    }

---

# 24. Стан компонента

Для форми редагування часто достатньо:

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

Маємо:

    form data
       ↓
    loading
       ↓
    error
       ↓
    success

---

# 25. Не плутати loading GET і loading PATCH

Для початкового GET:

    const [isLoading, setIsLoading] = useState(true);

Тому що завантаження починається автоматично.

Для PATCH:

    const [isLoading, setIsLoading] = useState(false);

Тому що PATCH починається тільки після дії користувача.

---

# 26. Не дозволяємо повторне натискання

Під час запиту:

    <button
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? "Збереження..." : "Зберегти"}
    </button>

Це зменшує ризик:

    click
      ↓
    PATCH
      ↓
    click
      ↓
    PATCH
      ↓
    click
      ↓
    PATCH

---

# 27. Але disabled не вирішує всі проблеми

`disabled={isLoading}` захищає UI від повторного кліку.

Але це не гарантує захист на рівні сервера.

Користувач може:

- повторити HTTP-запит;
- мати нестабільне з'єднання;
- повторно відправити форму;
- відправити запит з іншого клієнта.

Тому важливі операції повинні бути захищені також на backend.

---

# 28. PATCH і валідація

Не можна покладатися тільки на React.

Наприклад, frontend перевіряє:

    if (name.trim().length === 0) {
      setError("Ім'я обов'язкове");
      return;
    }

Це добре для UX.

Але backend також повинен перевірити:

    name
    email
    permissions
    data format
    business rules

Правило:

    Frontend validation
          +
    Backend validation

---

# 29. Приклад client-side validation

    async function handleSubmit(
      event: React.FormEvent<HTMLFormElement>
    ) {
      event.preventDefault();

      const trimmedName = name.trim();

      if (!trimmedName) {
        setError("Ім'я обов'язкове");
        return;
      }

      if (trimmedName.length < 2) {
        setError("Ім'я повинно містити щонайменше 2 символи");
        return;
      }

      // PATCH...
    }

---

# 30. Помилка від backend

Backend може повернути:

    HTTP 400

    {
      "message": "Invalid email"
    }

Тому frontend може прочитати відповідь:

    const response = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
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
        errorData.message ?? "Не вдалося оновити дані"
      );
    }

---

# 31. Обережно з response.json()

Не кожна помилка обов'язково повертає JSON.

Наприклад, сервер може повернути:

    500 Internal Server Error

без JSON body.

Тому більш захищений варіант:

    if (!response.ok) {
      let message = "Не вдалося оновити дані";

      try {
        const errorData: { message?: string } =
          await response.json();

        if (errorData.message) {
          message = errorData.message;
        }
      } catch {
        // Сервер не повернув коректний JSON
      }

      throw new Error(message);
    }

---

# 32. HTTP status codes для PUT/PATCH

Найпоширеніші:

    200 OK
    → оновлення успішне, сервер повернув ресурс

    204 No Content
    → оновлення успішне, body немає

    400 Bad Request
    → неправильний запит

    401 Unauthorized
    → користувач не автентифікований

    403 Forbidden
    → недостатньо прав

    404 Not Found
    → ресурс не знайдено

    409 Conflict
    → конфлікт даних

    422 Unprocessable Content
    → дані не пройшли валідацію

    500 Internal Server Error
    → помилка сервера

---

# 33. Якщо сервер повертає 204

Не можна робити:

    const data = await response.json();

якщо відповідь має:

    204 No Content

Тому що body відсутній.

Можна:

    if (!response.ok) {
      throw new Error("Не вдалося оновити");
    }

    if (response.status !== 204) {
      const data = await response.json();

      console.log(data);
    }

---

# 34. PUT/PATCH із окремою API-функцією

У невеликому компоненті можна писати `fetch()` безпосередньо.

Але в реальному проєкті зручно винести API-запити.

Наприклад:

    // api/users.ts

    export type User = {
      id: number;
      name: string;
      email: string;
    };

    export async function updateUser(
      userId: number,
      data: {
        name: string;
        email: string;
      }
    ): Promise<User> {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Не вдалося оновити користувача");
      }

      return response.json();
    }

Компонент:

    const updatedUser = await updateUser(user.id, {
      name,
      email,
    });

---

# 35. Перевага окремої API-функції

Замість:

    Component
      ↓
    fetch()
      ↓
    API

можна організувати:

    Component
      ↓
    updateUser()
      ↓
    fetch()
      ↓
    API

Компонент тоді відповідає переважно за UI.

API-функція відповідає за HTTP-запит.

---

# 36. PUT і PATCH із TypeScript

Наприклад:

    type UpdateUserData = {
      name: string;
      email: string;
    };

    type User = {
      id: number;
      name: string;
      email: string;
    };

    async function updateUser(
      userId: number,
      data: UpdateUserData
    ): Promise<User> {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      return response.json();
    }

---

# 37. Частковий тип для PATCH

Якщо PATCH дозволяє змінювати будь-яке поле окремо:

    type User = {
      id: number;
      name: string;
      email: string;
      age: number;
    };

можна описати:

    type UpdateUserData = Partial<
      Pick<User, "name" | "email" | "age">
    >;

Тепер можливі:

    updateUser(10, {
      name: "Oleksandr",
    });

або:

    updateUser(10, {
      email: "new@example.com",
    });

або:

    updateUser(10, {
      name: "Oleksandr",
      age: 57,
    });

---

# 38. PATCH не означає, що всі поля повинні бути optional

Це залежить від API.

Наприклад, API може вимагати:

    PATCH /api/users/10

    {
      "name": "Oleksandr"
    }

А може вимагати:

    PATCH /api/users/10

    {
      "name": "Oleksandr",
      "email": "new@example.com"
    }

Тому TypeScript-тип повинен відповідати контракту API.

---

# 39. Важливий момент: TypeScript не перевіряє сервер

Написати:

    const user: User = await response.json();

не означає, що сервер справді повернув правильний `User`.

TypeScript перевіряє код під час розробки.

Він не виконує runtime validation JSON-відповіді.

Для складних production API можна використовувати runtime validation libraries, наприклад Zod.

Але на етапі базового React достатньо розуміти:

    TypeScript types
          ≠
    runtime validation

---

# 40. PUT/PATCH після GET

Типовий сценарій:

    GET /api/users/10
          ↓
    отримали user
          ↓
    показали форму
          ↓
    користувач змінив дані
          ↓
    submit
          ↓
    PATCH /api/users/10
          ↓
    отримали оновлений user
          ↓
    оновили UI

Це один із найважливіших практичних сценаріїв React.

---

# 41. Що робити після успішного PATCH

Є кілька варіантів.

### Варіант 1 — використати відповідь сервера

Якщо сервер повертає оновлений ресурс:

    const updatedUser = await response.json();

    setUser(updatedUser);

Перевага:

    PATCH
      ↓
    server
      ↓
    updated resource
      ↓
    React state

---

### Варіант 2 — повторити GET

Після PATCH:

    await updateUser();

    await getUser();

Тобто:

    PATCH
      ↓
    GET
      ↓
    актуальні дані

Це може бути корисно, якщо сервер змінює або обчислює додаткові поля.

---

# 42. Локальне оновлення UI

Наприклад:

    const [user, setUser] = useState<User>(initialUser);

Після PATCH:

    const updatedUser = await updateUser(user.id, {
      name,
      email,
    });

    setUser(updatedUser);

Тепер React перемалює компонент із новими даними.

---

# 43. Optimistic update

Більш складний підхід:

    user натискає "Зберегти"
          ↓
    UI одразу показує нові дані
          ↓
    PATCH відправляється на сервер
          ↓
    якщо успіх → залишаємо зміни
          ↓
    якщо помилка → rollback

Це називається:

    optimistic update

Для базового CRUD це не обов'язково.

Спочатку важливо навчитися:

    request
      ↓
    response
      ↓
    update state

---

# 44. PATCH та useEffect

Не варто без причини робити:

    useEffect(() => {
      updateUser();
    }, []);

для звичайного редагування користувача.

PATCH змінює дані на сервері.

Зазвичай він повинен запускатися через дію користувача:

    onSubmit
    onClick

а не автоматично під час монтування компонента.

Правильніше:

    function handleSubmit() {
      updateUser();
    }

---

# 45. Чому PATCH у useEffect може бути проблемою

Наприклад:

    useEffect(() => {
      fetch("/api/users/10", {
        method: "PATCH",
        ...
      });
    }, []);

Це означає:

> "Після монтування компонента зміни дані на сервері."

Це може бути небажано.

Крім того, у development React Strict Mode ефекти можуть запускатися додатково для виявлення проблем.

Тому мутації даних краще прив'язувати до явної дії користувача.

---

# 46. PUT/PATCH та authentication

Якщо API захищений, може знадобитися:

    Authorization

Наприклад:

    const response = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
      }),
    });

Але конкретний спосіб authentication залежить від архітектури застосунку.

---

# 47. PUT/PATCH та credentials

Для cookie-based authentication може використовуватися:

    fetch("/api/users/10", {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

Тут браузер може включити credentials відповідно до політики cookies/CORS.

---

# 48. PUT/PATCH і CORS

Якщо frontend і backend знаходяться на різних origin:

    Frontend
    http://localhost:3000

    Backend
    http://localhost:4000

може виникнути CORS.

Наприклад:

    fetch("http://localhost:4000/api/users/10", {
      method: "PATCH",
      ...
    });

Backend повинен бути налаштований так, щоб дозволяти потрібний origin та HTTP-метод.

Це вже відповідальність backend.

---

# 49. PUT/PATCH і REST API

Приклад REST API:

    GET     /api/users
    GET     /api/users/10
    POST    /api/users
    PUT     /api/users/10
    PATCH   /api/users/10
    DELETE  /api/users/10

Це типовий CRUD:

    Create  → POST
    Read    → GET
    Update  → PUT / PATCH
    Delete  → DELETE

---

# 50. CRUD-мислення

Корисно запам'ятати:

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

---

# 51. PUT/PATCH у повному full-stack сценарії

Наприклад, редагування користувача:

    React form
        ↓
    onSubmit
        ↓
    fetch()
        ↓
    PATCH /api/users/10
        ↓
    Backend
        ↓
    validation
        ↓
    authorization
        ↓
    PostgreSQL
        ↓
    UPDATE users
        ↓
    response
        ↓
    React
        ↓
    setUser()
        ↓
    UI

Це вже справжній full-stack CRUD.

---

# 52. Що відбувається на backend

Наприклад:

    PATCH /api/users/10

Body:

    {
      "name": "Oleksandr"
    }

Backend може виконати SQL:

    UPDATE users
    SET name = 'Oleksandr'
    WHERE id = 10;

Після цього повернути:

    {
      "id": 10,
      "name": "Oleksandr",
      "email": "valeriy@example.com"
    }

---

# 53. Не довіряємо id із body без потреби

Наприклад, URL:

    PATCH /api/users/10

а body:

    {
      "id": 999,
      "name": "Oleksandr"
    }

Зазвичай ресурс уже визначений через URL:

    /api/users/10

Тому API може приймати:

    {
      "name": "Oleksandr"
    }

а `id` брати з route parameter:

    /users/:id

Це залежить від конкретного API-контракту.

---

# 54. Не змішуємо URL і body

Хороша концептуальна модель:

    URL
    ↓
    який ресурс змінюємо?

    Body
    ↓
    які дані змінюємо?

Наприклад:

    PATCH /api/users/10

    {
      "name": "Oleksandr"
    }

означає:

    resource = user 10
    changes = name → Oleksandr

---

# 55. PUT/PATCH і form state

При редагуванні важливо розділяти:

    server data

та

    form data

Наприклад:

    const [user, setUser] = useState<User>(initialUser);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

`user` — поточні дані ресурсу.

`name` та `email` — поточні значення форми.

---

# 56. Dirty state

Іноді потрібно знати, чи користувач щось змінив.

Наприклад:

    const isDirty =
      name !== user.name ||
      email !== user.email;

Тоді кнопку можна зробити:

    <button
      type="submit"
      disabled={isLoading || !isDirty}
    >
      Зберегти
    </button>

---

# 57. Після успішного PATCH

Наприклад:

    const updatedUser = await updateUser(user.id, {
      name,
      email,
    });

    setUser(updatedUser);

Тепер:

    user.name
    user.email

містять нові значення.

Якщо форма базується на `user`, її також можна синхронізувати з новими даними.

---

# 58. Типова помилка №1 — забули method

Помилка:

    fetch("/api/users/10", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

За замовчуванням `fetch()` використовує:

    GET

Для PATCH потрібно:

    method: "PATCH"

---

# 59. Типова помилка №2 — забули JSON.stringify()

Неправильно:

    body: {
      name,
    }

Правильно:

    body: JSON.stringify({
      name,
    })

---

# 60. Типова помилка №3 — забули Content-Type

Неправильно:

    fetch("/api/users/10", {
      method: "PATCH",
      body: JSON.stringify({
        name,
      }),
    });

Часто потрібно:

    headers: {
      "Content-Type": "application/json",
    }

---

# 61. Типова помилка №4 — не перевіряємо response.ok

Небезпечно:

    const response = await fetch(...);

    const user = await response.json();

Потрібно:

    const response = await fetch(...);

    if (!response.ok) {
      throw new Error("Update failed");
    }

    const user = await response.json();

---

# 62. Типова помилка №5 — PATCH замість PUT без розуміння

Не потрібно запам'ятовувати:

    PATCH = правильний
    PUT = неправильний

Обидва методи можуть бути правильними.

Потрібно розуміти API-контракт.

    PUT
    → повне оновлення / заміна

    PATCH
    → часткове оновлення

---

# 63. Типова помилка №6 — PATCH у useEffect

Не варто без причини:

    useEffect(() => {
      updateUser();
    }, []);

Для звичайного редагування:

    onSubmit
      ↓
    PATCH

---

# 64. Типова помилка №7 — відсутній loading state

Без loading state користувач може:

    натиснути
      ↓
    натиснути
      ↓
    натиснути

Краще:

    disabled={isLoading}

---

# 65. Типова помилка №8 — frontend validation замість backend validation

Frontend:

    if (!email) {
      ...
    }

це добре.

Але backend все одно повинен перевірити:

    email
    permissions
    authorization
    business rules
    data integrity

Ніколи не вважай frontend validation достатньою для безпеки.

---

# 66. Типова помилка №9 — використовувати any

Не варто:

    const data: any = await response.json();

Краще:

    type User = {
      id: number;
      name: string;
      email: string;
    };

    const data: User = await response.json();

А ще краще для складних API — runtime validation.

---

# 67. Типова помилка №10 — вручну встановлювати неправильний Content-Type для FormData

Для JSON:

    headers: {
      "Content-Type": "application/json",
    }

Для `FormData`:

    const formData = new FormData();

    formData.append("name", name);

    fetch("/api/users/10", {
      method: "PATCH",
      body: formData,
    });

Не потрібно вручну писати:

    "Content-Type": "multipart/form-data"

Браузер сам встановлює правильний `boundary`.

---

# 68. JSON PATCH vs FormData PATCH

### JSON

    fetch("/api/users/10", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

### FormData

    const formData = new FormData();

    formData.append("name", name);

    fetch("/api/users/10", {
      method: "PATCH",
      body: formData,
    });

JSON зручний для звичайних структурованих даних.

`FormData` потрібен, коли працюємо, наприклад, із файлами.

---

# 69. PUT/PATCH не обов'язково повинні повертати ресурс

API може повернути:

    200 OK

і:

    {
      "id": 10,
      "name": "Oleksandr"
    }

А може:

    204 No Content

Тому frontend повинен знати контракт API.

Не можна автоматично припускати:

    response.json()

після кожного PATCH.

---

# 70. PUT/PATCH та idempotency

`PUT` зазвичай розглядається як **ідемпотентний** (idempotent).

Наприклад:

    PUT /api/users/10

    {
      "name": "Oleksandr"
    }

Якщо виконати той самий PUT кілька разів, кінцевий стан ресурсу буде тим самим.

---

# 71. PATCH і idempotency

`PATCH` за своєю природою не гарантує ідемпотентність.

Наприклад, PATCH:

    {
      "name": "Oleksandr"
    }

може бути ідемпотентним на практиці.

Але PATCH:

    {
      "counter": "+1"
    }

може змінювати ресурс кожного разу.

Тому не варто автоматично вважати кожен PATCH ідемпотентним.

---

# 72. Чому це важливо

У мережі можливі:

    timeout
    retry
    duplicate request
    network failure

Тому для важливих операцій backend повинен враховувати можливість повторних запитів.

Особливо це важливо для:

    платежів
    замовлень
    бронювань
    створення документів
    фінансових операцій

---

# 73. Простий CRUD-проєкт

Для тренування можна зробити:

    Users CRUD

    GET     /api/users
    GET     /api/users/:id
    POST    /api/users
    PATCH   /api/users/:id
    DELETE  /api/users/:id

React:

    UserList
    UserDetails
    CreateUserForm
    EditUserForm
    DeleteUserButton

---

# 74. Практичний сценарій

Користувач відкриває:

    /users/10/edit

React:

    GET /api/users/10

отримує:

    {
      "id": 10,
      "name": "Valeriy",
      "email": "old@example.com"
    }

Показує форму.

Користувач змінює:

    email → new@example.com

Натискає:

    Зберегти

React:

    PATCH /api/users/10

    {
      "email": "new@example.com"
    }

Backend:

    UPDATE users
    SET email = 'new@example.com'
    WHERE id = 10;

Backend повертає оновлений ресурс.

React:

    setUser(updatedUser)

UI показує новий email.

---

# 75. Повна схема

    ┌─────────────────────┐
    │      React UI       │
    │                     │
    │   Edit User Form    │
    └──────────┬──────────┘
               │
               │ submit
               ▼
    ┌─────────────────────┐
    │      fetch()        │
    │                     │
    │ PATCH /users/10     │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────┐
    │       API           │
    │                     │
    │   validation        │
    │   authorization     │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────┐
    │      Database       │
    │                     │
    │       UPDATE        │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────┐
    │      Response       │
    │                     │
    │   updated user      │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────┐
    │      React          │
    │                     │
    │     setUser()       │
    └─────────────────────┘

---

# 76. PUT/PATCH у Next.js

У Next.js frontend може викликати:

    const response = await fetch("/api/users/10", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

API route може бути:

    app/api/users/[id]/route.ts

і містити:

    export async function PATCH(
      request: Request,
      { params }: { params: Promise<{ id: string }> }
    ) {
      const { id } = await params;

      const body = await request.json();

      // validation
      // database update

      return Response.json({
        id,
        ...body,
      });
    }

Конкретна реалізація залежить від версії Next.js та архітектури проєкту.

---

# 77. Де знаходиться PUT/PATCH у React-архітектурі

На базовому рівні:

    Component
        ↓
    event handler
        ↓
    fetch()
        ↓
    API

На більш структурованому рівні:

    Component
        ↓
    custom hook
        ↓
    API function
        ↓
    fetch()
        ↓
    backend

Наприклад:

    EditUserForm
        ↓
    useUpdateUser()
        ↓
    updateUser()
        ↓
    fetch()
        ↓
    PATCH /api/users/:id

---

# 78. PUT/PATCH і custom hook

Пізніше можна винести mutation logic:

    function useUpdateUser() {
      async function updateUser(
        userId: number,
        data: UpdateUserData
      ) {
        const response = await fetch(`/api/users/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Update failed");
        }

        return response.json();
      }

      return {
        updateUser,
      };
    }

Це вже місток до:

    08-custom-data-fetching-hooks

---

# 79. Коли використовувати PUT

Обирай `PUT`, коли API передбачає:

    повну заміну ресурсу

Наприклад:

    PUT /api/users/10

    {
      "name": "Oleksandr",
      "email": "new@example.com",
      "age": 57
    }

---

# 80. Коли використовувати PATCH

Обирай `PATCH`, коли API передбачає:

    часткове оновлення

Наприклад:

    PATCH /api/users/10

    {
      "email": "new@example.com"
    }

---

# 81. Не вирішуємо PUT vs PATCH самостійно

У реальному проєкті важливий API contract.

Frontend повинен знати:

    endpoint
    method
    request body
    headers
    authentication
    response status
    response body
    error format

Наприклад:

    PATCH /api/users/:id

може бути контрактом backend.

Тоді React повинен використовувати саме PATCH.

---

# 82. Мінімальний PUT

    async function updateUser(userId: number) {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Oleksandr",
          email: "new@example.com",
        }),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      return response.json();
    }

---

# 83. Мінімальний PATCH

    async function updateUser(userId: number) {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Oleksandr",
        }),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      return response.json();
    }

---

# 84. PUT vs PATCH — найкоротше пояснення

Запам'ятай:

    PUT

    "Замінити ресурс новою версією."

    PATCH

    "Змінити частину ресурсу."

---

# 85. Питання зі співбесіди

### 1. Для чого потрібен PUT?

Для повного оновлення або заміни ресурсу.

---

### 2. Для чого потрібен PATCH?

Для часткового оновлення ресурсу.

---

### 3. Яка головна різниця між PUT і PATCH?

    PUT   → повна заміна
    PATCH → часткова зміна

---

### 4. Як відправити PATCH через fetch()?

    fetch("/api/users/10", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Oleksandr",
      }),
    });

---

### 5. Навіщо JSON.stringify()?

Щоб перетворити JavaScript-об'єкт у JSON-рядок для HTTP body.

---

### 6. Навіщо Content-Type?

Щоб повідомити серверу, що body містить JSON.

---

### 7. Чи кидає fetch() помилку при HTTP 404?

Ні.

Потрібно перевіряти:

    response.ok

---

### 8. Що робити після успішного PATCH?

Наприклад:

    const updatedUser = await response.json();

    setUser(updatedUser);

або повторно завантажити ресурс через GET.

---

### 9. Чи потрібно використовувати PATCH у useEffect?

Для звичайного редагування — зазвичай ні.

Краще запускати PATCH через:

    onSubmit
    onClick

---

### 10. Чи достатньо frontend validation?

Ні.

Backend також повинен виконувати validation та authorization.

---

### 11. Чи є PATCH ідемпотентним?

Не обов'язково.

Це залежить від конкретної операції.

---

### 12. Чи є PUT ідемпотентним?

PUT за HTTP-семантикою є ідемпотентним.

---

# 86. Рівень Core

Ти повинен розуміти:

- що таке HTTP methods;
- що таке PUT;
- що таке PATCH;
- різницю PUT/PATCH;
- `fetch()`;
- `method`;
- `headers`;
- `Content-Type`;
- `body`;
- `JSON.stringify()`;
- `response.ok`;
- `response.json()`;
- `async/await`;
- `try/catch`;
- `loading`;
- `error`.

---

# 87. Рівень Junior

Ти повинен уміти:

- створити edit form;
- використовувати controlled inputs;
- зробити `onSubmit`;
- виконати PATCH;
- виконати PUT;
- показати loading;
- показати error;
- показати success;
- перевірити `response.ok`;
- типізувати request data;
- типізувати response;
- оновити React state після PATCH.

---

# 88. Рівень Middle

Потрібно розуміти:

- API layer;
- custom hooks;
- mutation state;
- optimistic updates;
- rollback;
- cache invalidation;
- authentication;
- authorization;
- CORS;
- idempotency;
- duplicate requests;
- runtime validation;
- API contracts;
- error mapping;
- server-side validation.

---

# 89. Рівень Senior

Важливо розуміти вже всю систему:

    React
      ↓
    API client
      ↓
    HTTP
      ↓
    authentication
      ↓
    authorization
      ↓
    validation
      ↓
    backend
      ↓
    transaction
      ↓
    database
      ↓
    consistency
      ↓
    response
      ↓
    cache
      ↓
    UI

А також:

- retry policies;
- idempotency keys;
- race conditions;
- concurrent updates;
- optimistic concurrency;
- ETags;
- caching;
- distributed systems;
- observability;
- API versioning.

---

# 90. Міні-шпаргалка

    // PATCH

    const response = await fetch(`/api/users/${id}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
      }),
    });

    if (!response.ok) {
      throw new Error("Update failed");
    }

    const updatedUser = await response.json();

---

# 91. PUT

    const response = await fetch(`/api/users/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        age,
      }),
    });

    if (!response.ok) {
      throw new Error("Update failed");
    }

    const updatedUser = await response.json();

---

# 92. React form

    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <button
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Збереження..." : "Зберегти"}
      </button>
    </form>

---

# 93. Правильний flow

    user edits form
          ↓
    controlled state
          ↓
    submit
          ↓
    preventDefault()
          ↓
    validation
          ↓
    setLoading(true)
          ↓
    fetch()
          ↓
    PUT / PATCH
          ↓
    response.ok?
       ↙       ↘
     no         yes
      ↓          ↓
    error      response.json()
                 ↓
              setState()
                 ↓
                UI
          ↓
    setLoading(false)

---

# 94. PUT vs PATCH — фінальна таблиця

| Характеристика | PUT | PATCH |
|---|---|---|
| Призначення | заміна ресурсу | часткова зміна |
| Повний ресурс | зазвичай так | ні |
| Часткові дані | зазвичай ні | так |
| Idempotent | так | не гарантовано |
| React use case | повне редагування | редагування окремих полів |
| `fetch()` | так | так |
| JSON body | часто | часто |

---

# 95. Головне

✔ `PUT` використовується для повного оновлення / заміни ресурсу.

✔ `PATCH` використовується для часткового оновлення.

✔ Обидва методи можна викликати через `fetch()`.

✔ Для JSON потрібно:

    headers: {
      "Content-Type": "application/json",
    }

✔ Дані передаються через:

    body: JSON.stringify(data)

✔ `fetch()` не кидає помилку тільки через `4xx` або `5xx`.

✔ Завжди пам'ятай про:

    response.ok

✔ Для форми:

    onSubmit
      ↓
    preventDefault()
      ↓
    validation
      ↓
    PUT/PATCH

✔ Під час запиту корисно мати:

    isLoading
    error
    success

✔ Frontend validation не замінює backend validation.

✔ `PATCH` особливо зручний для редагування окремих полів.

✔ Після успішного оновлення потрібно синхронізувати React UI із серверними даними.

✔ У реальному full-stack застосунку:

    React
      ↓
    fetch
      ↓
    PUT/PATCH
      ↓
    API
      ↓
    Backend
      ↓
    Database
      ↓
    Response
      ↓
    React state
      ↓
    UI

---

# 96. Зв'язок із попередніми темами

У цьому розділі об'єднуються попередні знання:

    01-fetch
        ↓
    fetch()

    02-loading-and-error
        ↓
    loading / error

    03-get
        ↓
    отримання ресурсу

    04-post
        ↓
    створення ресурсу

    05-put-and-patch
        ↓
    оновлення ресурсу

Далі логічно:

    06-delete
        ↓
    видалення ресурсу

    07-async-data
        ↓
    системна робота з async data

    08-custom-data-fetching-hooks
        ↓
    винесення data-fetching logic у hooks

---

# 97. CRUD-картина

У результаті маємо повну картину CRUD:

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

А React відповідає за:

    state
    forms
    events
    loading
    errors
    UI

Backend відповідає за:

    API
    validation
    authentication
    authorization
    business logic
    database

Саме так `PUT` і `PATCH` стають частиною реального React full-stack застосунку.