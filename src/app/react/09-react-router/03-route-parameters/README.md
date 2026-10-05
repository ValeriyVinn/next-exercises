# React Router — Route Parameters

> `react/09-react-router/03-route-parameters`

## Визначення

**Route parameters (параметри маршруту)** — це динамічні значення, які є частиною URL і дозволяють React Router визначити, **який конкретний ресурс потрібно показати**.

Наприклад:

    /users/42
    /users/105
    /products/15
    /posts/react-router

У таких URL:

    /users/:userId

`:userId` — це **динамічний параметр маршруту**.

Для URL:

    /users/42

React Router отримає:

    userId = "42"

Route parameters особливо важливі для сторінок:

- конкретного користувача;
- конкретного товару;
- конкретної статті;
- конкретного курсу;
- конкретного уроку;
- конкретного замовлення;
- конкретного Saint/slug page;
- будь-якого ресурсу, який має власний `id` або `slug`.

---

# 1. Навіщо потрібні route parameters

Без параметрів довелося б створювати окремий маршрут для кожного ресурсу:

    /users/1
    /users/2
    /users/3
    /users/4
    ...

Це неможливо масштабувати.

Замість цього створюємо один динамічний маршрут:

    /users/:userId

Тепер він може обробити:

    /users/1
    /users/2
    /users/3
    /users/100
    /users/999

Тобто один компонент може відображати різні дані залежно від параметра URL.

---

# 2. Ключові поняття

Основні поняття цієї теми:

1. **Dynamic route**
2. **Route parameter**
3. `:paramName`
4. `useParams()`
5. `params`
6. `id`
7. `slug`
8. `Link`
9. `NavLink`
10. `useNavigate()`
11. **Dynamic URL**
12. **Nested route parameters**
13. **Optional parameters**
14. **Parameter validation**
15. **404 для неіснуючого ресурсу**

---

# 3. Динамічний маршрут

Замість статичного маршруту:

    /users

можна створити:

    /users/:userId

Наприклад:

    <Route path="/users/:userId" element={<UserPage />} />

Тут:

    :userId

означає:

> "На цьому місці в URL буде динамічне значення."

---

# 4. Простий приклад

Припустимо, є:

    /users/42

Маршрут:

    <Route path="/users/:userId" element={<UserPage />} />

React Router зіставляє:

    /users/42
          │
          └── userId = "42"

Компонент:

    function UserPage() {
      return <h1>User page</h1>;
    }

Але поки що компонент не знає, що URL містить:

    userId = "42"

Для отримання параметрів використовується:

    useParams()

---

# 5. `useParams()`

`useParams()` — React Hook, який повертає параметри поточного маршруту.

Імпорт:

    import { useParams } from "react-router-dom";

Приклад:

    function UserPage() {
      const params = useParams();

      console.log(params);

      return <h1>User page</h1>;
    }

Для URL:

    /users/42

результат буде приблизно:

    {
      userId: "42"
    }

---

# 6. Отримання конкретного параметра

Замість:

    const params = useParams();

можна одразу зробити деструктуризацію:

    const { userId } = useParams();

Повний приклад:

    import { useParams } from "react-router-dom";

    function UserPage() {
      const { userId } = useParams();

      return (
        <div>
          <h1>User</h1>
          <p>ID: {userId}</p>
        </div>
      );
    }

Для URL:

    /users/42

отримаємо:

    userId = "42"

---

# 7. Найважливіше: параметри URL — це рядки

Це дуже важливий момент.

Якщо URL:

    /users/42

то:

    const { userId } = useParams();

`userId` буде:

    "42"

а не:

    42

Тобто це:

    string

а не:

    number

---

# 8. Перетворення параметра на число

Якщо `id` у базі даних є числом:

    const { userId } = useParams();

можна перетворити його:

    const id = Number(userId);

Тепер:

    id

має числове значення:

    42

---

# 9. Перевірка параметра

Не варто автоматично вважати, що параметр правильний.

Наприклад:

    /users/abc

Якщо очікується числовий ID, потрібно перевірити значення.

    const { userId } = useParams();

    const id = Number(userId);

    if (!Number.isInteger(id)) {
      return <p>Invalid user ID</p>;
    }

Тепер:

    /users/42

є валідним,

а:

    /users/abc

можна обробити як помилковий параметр.

---

# 10. TypeScript і `useParams`

У TypeScript можна явно вказати форму параметрів.

    const { userId } = useParams<{ userId: string }>();

Тепер TypeScript знає:

    userId: string

Повний приклад:

    import { useParams } from "react-router-dom";

    function UserPage() {
      const { userId } = useParams<{ userId: string }>();

      return <h1>User: {userId}</h1>;
    }

---

# 11. `id` як route parameter

Найпоширеніший випадок:

    /users/:id

Маршрут:

    <Route path="/users/:id" element={<UserPage />} />

Компонент:

    function UserPage() {
      const { id } = useParams();

      return <h1>User ID: {id}</h1>;
    }

URL:

    /users/42

Результат:

    User ID: 42

---

# 12. Чому часто краще називати параметр `userId`

Технічно можна:

    /users/:id

Але:

    /users/:userId

часто зрозуміліше.

Порівняння:

    /users/:id

    /users/:userId

Другий варіант одразу пояснює, що саме означає значення.

Особливо це корисно у складних маршрутах:

    /users/:userId/posts/:postId

Тут одразу зрозуміло:

    userId
    postId

---

# 13. Кілька route parameters

Маршрут може містити декілька параметрів.

Наприклад:

    /users/:userId/posts/:postId

Маршрут:

    <Route
      path="/users/:userId/posts/:postId"
      element={<PostPage />}
    />

URL:

    /users/42/posts/100

Параметри:

    {
      userId: "42",
      postId: "100"
    }

---

# 14. Отримання декількох параметрів

    function PostPage() {
      const { userId, postId } = useParams();

      return (
        <div>
          <h1>Post</h1>
          <p>User: {userId}</p>
          <p>Post: {postId}</p>
        </div>
      );
    }

Для:

    /users/42/posts/100

отримаємо:

    userId = "42"
    postId = "100"

---

# 15. Практичний приклад: список користувачів

Маємо список:

    const users = [
      { id: 1, name: "Anna" },
      { id: 2, name: "Peter" },
      { id: 3, name: "John" },
    ];

Показуємо посилання:

    import { Link } from "react-router-dom";

    function UsersPage() {
      const users = [
        { id: 1, name: "Anna" },
        { id: 2, name: "Peter" },
        { id: 3, name: "John" },
      ];

      return (
        <div>
          <h1>Users</h1>

          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    }

---

# 16. Динамічне посилання

У попередньому прикладі:

    <Link to={`/users/${user.id}`}>
      {user.name}
    </Link>

Якщо:

    user.id = 1

отримаємо:

    /users/1

Якщо:

    user.id = 2

отримаємо:

    /users/2

Якщо:

    user.id = 3

отримаємо:

    /users/3

Один компонент може працювати з усіма користувачами.

---

# 17. Повний приклад Users + UserPage

Маршрути:

    <Routes>
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/:userId" element={<UserPage />} />
    </Routes>

Список:

    import { Link } from "react-router-dom";

    function UsersPage() {
      const users = [
        { id: 1, name: "Anna" },
        { id: 2, name: "Peter" },
        { id: 3, name: "John" },
      ];

      return (
        <div>
          <h1>Users</h1>

          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    }

Сторінка користувача:

    import { useParams } from "react-router-dom";

    function UserPage() {
      const { userId } = useParams();

      return (
        <div>
          <h1>User page</h1>
          <p>User ID: {userId}</p>
        </div>
      );
    }

---

# 18. Route parameter + API

Одна з головних причин використання route parameters — отримати конкретний ресурс із backend.

Наприклад:

    /users/42

Параметр:

    userId = "42"

можна використати для API-запиту:

    GET /api/users/42

---

# 19. Приклад завантаження користувача

    import { useEffect, useState } from "react";
    import { useParams } from "react-router-dom";

    type User = {
      id: number;
      name: string;
      email: string;
    };

    function UserPage() {
      const { userId } = useParams<{ userId: string }>();

      const [user, setUser] = useState<User | null>(null);

      useEffect(() => {
        if (!userId) {
          return;
        }

        fetch(`/api/users/${userId}`)
          .then((response) => response.json())
          .then((data: User) => {
            setUser(data);
          });
      }, [userId]);

      if (!user) {
        return <p>Loading...</p>;
      }

      return (
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      );
    }

Логіка:

    URL
      ↓
    useParams()
      ↓
    userId
      ↓
    fetch(`/api/users/${userId}`)
      ↓
    backend
      ↓
    database
      ↓
    user data
      ↓
    React UI

Це дуже важлива практична схема:

> **URL → parameter → API → data → UI**

---

# 20. Route parameter як ідентифікатор ресурсу

Наприклад, є:

    /products/15

Це означає:

> Показати товар з ID 15.

Або:

    /courses/8

> Показати курс з ID 8.

Або:

    /lessons/25

> Показати урок з ID 25.

Або:

    /orders/123

> Показати замовлення з ID 123.

---

# 21. `id` і `slug`

Route parameter необов'язково повинен бути числовим ID.

Можна використовувати:

    /posts/:slug

Наприклад:

    /posts/react-router-route-parameters

Тоді:

    const { slug } = useParams();

отримаємо:

    "react-router-route-parameters"

---

# 22. Що таке slug

**Slug** — це зручне для URL текстове представлення ресурсу.

Наприклад, назва:

    React Router: Route Parameters

може мати slug:

    react-router-route-parameters

URL:

    /posts/react-router-route-parameters

Порівняння:

    /posts/42

і:

    /posts/react-router-route-parameters

Перший використовує `id`.

Другий використовує `slug`.

---

# 23. ID vs slug

| ID | Slug |
|---|---|
| `/posts/42` | `/posts/react-router` |
| короткий | зрозумілий людині |
| добре для API | добре для SEO/URL |
| стабільний ідентифікатор | залежить від назви |
| часто число | зазвичай string |

У реальному застосунку можуть використовуватися обидва підходи.

---

# 24. Приклад маршруту зі slug

    <Route
      path="/posts/:slug"
      element={<PostPage />}
    />

Компонент:

    function PostPage() {
      const { slug } = useParams<{ slug: string }>();

      return <h1>Post: {slug}</h1>;
    }

URL:

    /posts/react-router

Результат:

    slug = "react-router"

---

# 25. Route parameters не є query parameters

Це два різні механізми.

Route parameter:

    /users/42

Query parameter:

    /users?page=2

У першому випадку:

    42

є частиною маршруту.

У другому:

    page=2

є query string.

---

# 26. Порівняння

### Route parameter

    /products/42

Зазвичай відповідає:

> Який саме ресурс?

    productId = 42

### Query parameter

    /products?page=2&sort=price

Зазвичай відповідає:

> Як отримати/відсортувати/відфільтрувати ресурси?

    page = 2
    sort = price

Детальніше query parameters розглядаються в:

    09-react-router/05-query-parameters

---

# 27. Route parameter + query parameter

Вони можуть використовуватися разом.

Наприклад:

    /users/42/posts?page=2

Тут:

    userId = "42"

а:

    page = "2"

Тобто:

    /users/:userId/posts
                     ↑
              route parameter

і:

    ?page=2
      ↑
    query parameter

---

# 28. `Link` із параметром

Параметр можна вставити в URL через template literal:

    <Link to={`/users/${user.id}`}>
      Open user
    </Link>

Наприклад:

    user.id = 42

отримаємо:

    /users/42

---

# 29. `useNavigate()` із параметром

Route parameter можна створити і програмно:

    import { useNavigate } from "react-router-dom";

    function UsersPage() {
      const navigate = useNavigate();

      const openUser = (userId: number) => {
        navigate(`/users/${userId}`);
      };

      return (
        <button onClick={() => openUser(42)}>
          Open user
        </button>
      );
    }

Після натискання:

    /users/42

---

# 30. `NavLink` із параметром

Можна використовувати і `NavLink`:

    <NavLink to={`/users/${user.id}`}>
      {user.name}
    </NavLink>

Це особливо корисно, якщо потрібно показувати активний стан поточного маршруту.

---

# 31. Nested route parameters

Параметри можуть використовуватися в nested routes.

Наприклад:

    /users/:userId

а всередині:

    /users/:userId/profile
    /users/:userId/posts
    /users/:userId/settings

Структура:

    /users
      └── /:userId
            ├── /profile
            ├── /posts
            └── /settings

---

# 32. Приклад nested route

    <Routes>
      <Route path="/users/:userId" element={<UserLayout />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="posts" element={<PostsPage />} />
      </Route>
    </Routes>

URL:

    /users/42/profile

Параметр:

    userId = "42"

---

# 33. Доступ до параметра в дочірньому компоненті

Дочірній компонент також може використовувати:

    useParams()

Наприклад:

    function ProfilePage() {
      const { userId } = useParams<{ userId: string }>();

      return <h1>Profile of user {userId}</h1>;
    }

Для:

    /users/42/profile

отримаємо:

    userId = "42"

---

# 34. Кілька рівнів параметрів

Можна створювати:

    /users/:userId/posts/:postId/comments/:commentId

Наприклад:

    /users/42/posts/100/comments/7

Параметри:

    userId = "42"
    postId = "100"
    commentId = "7"

Отримання:

    const {
      userId,
      postId,
      commentId,
    } = useParams();

---

# 35. Але не потрібно зловживати глибиною URL

Маршрут:

    /users/42/posts/100/comments/7

може бути виправданим.

Але надмірно глибокі маршрути:

    /users/42/posts/100/comments/7/replies/3/attachments/9

ускладнюють:

- навігацію;
- підтримку;
- API;
- компоненти;
- тестування;
- читання URL.

Потрібно проектувати URL відповідно до структури ресурсів застосунку.

---

# 36. Route parameter + `useEffect`

Якщо компонент залишається змонтованим, а параметр змінюється, потрібно враховувати параметр у dependency array.

Наприклад:

    function UserPage() {
      const { userId } = useParams();

      useEffect(() => {
        console.log("Load user:", userId);
      }, [userId]);

      return <div>User: {userId}</div>;
    }

Правильно:

    }, [userId]);

Неправильно:

    }, []);

якщо effect повинен реагувати на зміну `userId`.

---

# 37. Чому це важливо

Уявімо:

    /users/1

Потім користувач переходить на:

    /users/2

Компонент може залишатися тим самим:

    <UserPage />

але параметр змінився:

    userId: "1" → "2"

Тому логіка завантаження даних повинна реагувати на:

    userId

---

# 38. Практичний приклад зміни користувача

    function UserPage() {
      const { userId } = useParams<{ userId: string }>();

      useEffect(() => {
        console.log(`Loading user ${userId}`);
      }, [userId]);

      return <h1>User {userId}</h1>;
    }

При переході:

    /users/1

буде:

    Loading user 1

Потім:

    /users/2

буде:

    Loading user 2

---

# 39. Перевірка існування ресурсу

Параметр може бути синтаксично правильним, але ресурс може не існувати.

Наприклад:

    /users/999999

може бути валідним URL.

Але користувача:

    999999

може не існувати.

Тому потрібно розрізняти:

1. неправильний параметр;
2. правильний параметр, але ресурс не знайдений.

---

# 40. Приклад `Not Found`

    function UserPage() {
      const { userId } = useParams();

      const user = users.find(
        (user) => String(user.id) === userId
      );

      if (!user) {
        return <h1>User not found</h1>;
      }

      return (
        <div>
          <h1>{user.name}</h1>
        </div>
      );
    }

---

# 41. Route parameter і 404

Наприклад:

    /users/42

Користувач існує:

    User page

А:

    /users/999

Користувача немає:

    User not found

Це вже не проблема React Router як такого.

Router визначив:

    /users/:userId

але application logic повинна перевірити:

> Чи існує ресурс із таким ID?

---

# 42. `Navigate` після перевірки параметра

Можна перенаправити користувача:

    import {
      Navigate,
      useParams,
    } from "react-router-dom";

    function UserPage() {
      const { userId } = useParams();

      const user = users.find(
        (user) => String(user.id) === userId
      );

      if (!user) {
        return <Navigate to="/users" replace />;
      }

      return <h1>{user.name}</h1>;
    }

Тепер неіснуючий користувач перенаправляється:

    /users/999
          ↓
    /users

---

# 43. Параметри не повинні довірятися без перевірки

Поганий підхід:

    const { userId } = useParams();

    fetch(`/api/users/${userId}`);

Тому що:

    /users/abc
    /users/undefined
    /users/hello

також можуть потрапити у компонент.

Краще:

    const { userId } = useParams();

    if (!userId) {
      return <p>Invalid route</p>;
    }

Якщо очікується число:

    const id = Number(userId);

    if (!Number.isInteger(id)) {
      return <p>Invalid user ID</p>;
    }

---

# 44. Важливе правило: URL — це зовнішній input

Route parameter фактично приходить від користувача через URL.

Наприклад:

    /users/42

або:

    /users/abc

Тому route parameters потрібно розглядати приблизно так само, як:

- дані форми;
- query parameters;
- дані API;
- інший зовнішній input.

Не слід автоматично вважати їх валідними.

---

# 45. `useParams()` — тільки всередині Router

Hook:

    useParams()

повинен використовуватися всередині React Router context.

Наприклад:

    <BrowserRouter>
      <App />
    </BrowserRouter>

і всередині:

    <Routes>
      ...
    </Routes>

Компонент:

    function UserPage() {
      const { userId } = useParams();

      ...
    }

---

# 46. Типова структура

Можна організувати код так:

    src/
    ├── app/
    │   └── App.tsx
    │
    ├── pages/
    │   ├── UsersPage.tsx
    │   └── UserPage.tsx
    │
    └── components/
        └── UserCard.tsx

Маршрути:

    <Routes>
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/:userId" element={<UserPage />} />
    </Routes>

---

# 47. Повний невеликий приклад

## App.tsx

    import {
      BrowserRouter,
      Routes,
      Route,
    } from "react-router-dom";

    import UsersPage from "./pages/UsersPage";
    import UserPage from "./pages/UserPage";

    function App() {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:userId" element={<UserPage />} />
          </Routes>
        </BrowserRouter>
      );
    }

    export default App;

## UsersPage.tsx

    import { Link } from "react-router-dom";

    type User = {
      id: number;
      name: string;
    };

    function UsersPage() {
      const users: User[] = [
        { id: 1, name: "Anna" },
        { id: 2, name: "Peter" },
        { id: 3, name: "John" },
      ];

      return (
        <div>
          <h1>Users</h1>

          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    export default UsersPage;

## UserPage.tsx

    import { useParams } from "react-router-dom";

    function UserPage() {
      const { userId } = useParams<{ userId: string }>();

      return (
        <div>
          <h1>User Page</h1>
          <p>ID: {userId}</p>
        </div>
      );
    }

    export default UserPage;

---

# 48. Потік даних у прикладі

Користувач відкриває:

    /users

React показує:

    UsersPage

Користувач натискає:

    Anna

`Link` створює:

    /users/1

React Router знаходить:

    /users/:userId

і показує:

    UserPage

`UserPage` викликає:

    useParams()

отримує:

    {
      userId: "1"
    }

Після цього можна:

    fetch(`/api/users/${userId}`)

і отримати дані з backend.

---

# 49. Дуже важлива концепція

Route parameter — це не дані користувача.

Це лише **ідентифікатор**, який дозволяє знайти дані.

Наприклад:

    /users/42

`42` — це не сам користувач.

Це лише:

    userId

Після цього application може виконати:

    GET /api/users/42

і отримати:

    {
      id: 42,
      name: "Anna",
      email: "anna@example.com"
    }

---

# 50. URL → Backend → Database

У повноцінному Full Stack застосунку часто маємо такий ланцюг:

    Browser
       ↓
    /users/42
       ↓
    React Router
       ↓
    useParams()
       ↓
    userId = "42"
       ↓
    fetch("/api/users/42")
       ↓
    Backend
       ↓
    PostgreSQL
       ↓
    User #42
       ↓
    JSON
       ↓
    React
       ↓
    UI

Це одна з фундаментальних схем CRUD-застосунків.

---

# 51. Route parameters у CRUD

Route parameters дуже часто використовуються в CRUD:

### Create

    /users/new

### Read

    /users/:userId

### Update

    /users/:userId/edit

### Delete

    /users/:userId/delete

Наприклад:

    /products/15
    /products/15/edit

Параметр:

    productId = "15"

дозволяє працювати з конкретним товаром.

---

# 52. `new` як спеціальний маршрут

Може виникнути конфлікт:

    /users/new

і:

    /users/:userId

Тому що `new` може бути сприйнято як:

    userId = "new"

Наприклад:

    <Route path="/users/new" element={<CreateUserPage />} />
    <Route path="/users/:userId" element={<UserPage />} />

Такий дизайн потрібно продумувати.

У React Router порядок і структура маршрутів мають значення, а сучасний ranking маршрутизатора зазвичай віддає перевагу більш специфічному маршруту.

Все одно корисно явно розуміти потенційний конфлікт.

---

# 53. ID маршруту і TypeScript

Наприклад:

    type RouteParams = {
      userId: string;
    };

    const { userId } = useParams<RouteParams>();

Це зручно, коли параметрів декілька:

    type RouteParams = {
      userId: string;
      postId: string;
    };

    const {
      userId,
      postId,
    } = useParams<RouteParams>();

---

# 54. Не використовуйте `any`

Погано:

    const params: any = useParams();

Краще:

    const { userId } = useParams<{ userId: string }>();

або:

    type RouteParams = {
      userId: string;
    };

    const { userId } = useParams<RouteParams>();

Явні типи роблять код зрозумілішим і безпечнішим.

---

# 55. Route parameter і URL encoding

Route parameters можуть містити символи, які мають спеціальне значення в URL.

Наприклад:

    /posts/hello-world

Для складніших значень потрібно враховувати URL encoding.

Не слід вручну будувати складні URL без розуміння:

    encodeURIComponent()

Наприклад:

    const slug = encodeURIComponent(title);

    navigate(`/posts/${slug}`);

Для звичайних `id` та простих slug це зазвичай не є проблемою.

---

# 56. Коли використовувати ID

ID добре підходить, коли:

- ресурс має унікальний numeric ID;
- URL не обов'язково повинен бути "людиночитним";
- backend працює з ID;
- ресурс однозначно визначається ID.

Наприклад:

    /users/42
    /orders/105
    /products/17

---

# 57. Коли використовувати slug

Slug зручний, коли:

- URL має бути зрозумілим;
- сторінка є статтею;
- сторінка є новиною;
- важливий SEO-friendly URL;
- назва ресурсу природно підходить для URL.

Наприклад:

    /blog/react-route-parameters

    /saints/panteleimon

    /courses/javascript-basics

---

# 58. ID + slug

Іноді використовують обидва:

    /posts/42-react-router

або:

    /products/15-macbook-air

Це дозволяє мати:

- ID для однозначної ідентифікації;
- slug/text для читабельності.

Але конкретний дизайн URL залежить від архітектури застосунку.

---

# 59. Практичний приклад для навчального сайту

Наприклад:

    /courses/8

може означати:

    courseId = "8"

А:

    /courses/8/lessons/25

означає:

    courseId = "8"
    lessonId = "25"

Компонент:

    function LessonPage() {
      const {
        courseId,
        lessonId,
      } = useParams<{
        courseId: string;
        lessonId: string;
      }>();

      return (
        <div>
          <h1>Lesson</h1>

          <p>Course: {courseId}</p>
          <p>Lesson: {lessonId}</p>
        </div>
      );
    }

---

# 60. Практичний Full Stack приклад

URL:

    /courses/8/lessons/25

React Router:

    <Route
      path="/courses/:courseId/lessons/:lessonId"
      element={<LessonPage />}
    />

Параметри:

    courseId = "8"
    lessonId = "25"

API:

    GET /api/courses/8/lessons/25

Backend:

    courseId = 8
    lessonId = 25

Database:

    SELECT *
    FROM lessons
    WHERE id = 25
      AND course_id = 8;

Результат:

    JSON

Потім React показує урок.

---

# 61. Route parameters і компонентний дизайн

Не потрібно передавати параметр через десятки компонентів:

    App
      ↓
    Layout
      ↓
    Page
      ↓
    Container
      ↓
    Component
      ↓
    userId

Якщо компонент знаходиться всередині Router context, він може безпосередньо отримати параметр:

    const { userId } = useParams();

Але це не означає, що `useParams()` треба використовувати всюди.

Краще отримати route parameter на рівні сторінки, де він логічно потрібен, і передавати вже отримані дані дочірнім компонентам через props.

---

# 62. Хороша архітектура

Наприклад:

    function UserPage() {
      const { userId } = useParams();

      // отримуємо user
      // завантажуємо data

      return (
        <UserProfile user={user} />
      );
    }

Тут:

    UserPage

відповідає за routing/data.

А:

    UserProfile

відповідає за UI.

Це часто чистіше, ніж коли кожен маленький компонент сам читає URL.

---

# 63. Route parameter не треба зберігати в state без причини

Не потрібно робити:

    const { userId } = useParams();

    const [id, setId] = useState(userId);

якщо `id` просто дублює параметр URL.

Краще використовувати:

    userId

безпосередньо.

Інакше можна створити два джерела істини:

    URL → userId

і:

    state → id

які можуть розійтися.

---

# 64. URL як джерело стану

Route parameters часто можна розглядати як частину **URL state**.

Наприклад:

    /users/42

означає:

    currentUser = 42

Якщо користувач скопіює URL і відкриє його на іншому пристрої, маршрут усе одно вказує:

    userId = 42

Тому URL добре підходить для стану, який потрібно:

- зберігати після reload;
- передавати через посилання;
- додавати в bookmarks;
- ділитися з іншими.

---

# 65. Route parameter vs React state

### React state

    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

Стан існує всередині React.

Після перезавантаження сторінки він може зникнути.

### Route parameter

    /users/42

Значення знаходиться в URL.

Його можна:

- скопіювати;
- зберегти;
- передати іншому користувачу;
- відкрити напряму.

Тому вибір між state і URL залежить від того, чи повинна інформація бути частиною адреси сторінки.

---

# 66. Типова помилка №1 — очікувати number

Погано:

    const { userId } = useParams();

    const result = userId + 1;

Якщо:

    userId = "42"

результат може бути:

    "421"

а не:

    43

Потрібно:

    const id = Number(userId);

    const result = id + 1;

---

# 67. Типова помилка №2 — відсутній parameter

Погано припускати:

    const { userId } = useParams();

    fetch(`/api/users/${userId}`);

Краще:

    const { userId } = useParams();

    if (!userId) {
      return <p>Invalid route</p>;
    }

---

# 68. Типова помилка №3 — неправильна назва параметра

Маршрут:

    <Route
      path="/users/:userId"
      element={<UserPage />}
    />

А компонент:

    const { id } = useParams();

`id` не існує.

Тому:

    id === undefined

Правильно:

    const { userId } = useParams();

Назва повинна збігатися.

---

# 69. Типова помилка №4 — плутати parameter і query

Маршрут:

    /users/42

отримуємо через:

    useParams()

А:

    /users?page=2

отримуємо через механізми роботи з search/query parameters.

Не потрібно використовувати:

    useParams()

для:

    ?page=2

---

# 70. Типова помилка №5 — дублювати parameter у state

Погано:

    const { userId } = useParams();

    const [currentUserId, setCurrentUserId] =
      useState(userId);

Якщо немає спеціальної причини, це зайва копія даних.

Краще:

    const { userId } = useParams();

---

# 71. Типова помилка №6 — не враховувати зміну parameter

Погано:

    useEffect(() => {
      loadUser(userId);
    }, []);

Якщо `userId` може змінюватися, effect не відреагує.

Краще:

    useEffect(() => {
      loadUser(userId);
    }, [userId]);

---

# 72. Типова помилка №7 — не обробляти ресурс, якого немає

Навіть якщо:

    userId = "999"

валідний як рядок,

це не означає, що:

    user 999

існує.

Потрібно обробляти:

    loading
    success
    not found
    error

---

# 73. Стан сторінки з route parameter

Хороша базова модель:

    loading
      ↓
    request
      ↓
    ┌───────────────┐
    │               │
    ↓               ↓
    success       error
    │
    ↓
    data
    │
    ├── resource exists
    │
    └── resource not found

Наприклад:

    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Something went wrong.</p>;
    }

    if (!user) {
      return <p>User not found.</p>;
    }

    return <UserProfile user={user} />;

---

# 74. Route parameters у реальному React-проєкті

Типова структура:

    React Router
         ↓
    Route
         ↓
    /users/:userId
         ↓
    UserPage
         ↓
    useParams()
         ↓
    userId
         ↓
    API request
         ↓
    Backend
         ↓
    Database
         ↓
    User
         ↓
    UI

Це одна з базових схем для Full Stack Developer.

---

# 75. Коротка схема для запам'ятовування

    <Route path="/users/:userId" />

              ↓

    /users/42

              ↓

    useParams()

              ↓

    { userId: "42" }

              ↓

    fetch(`/api/users/${userId}`)

              ↓

    backend

              ↓

    database

              ↓

    user data

              ↓

    React UI

---

# 76. Що треба пам'ятати

1. `:userId` створює динамічний route parameter.

2. `useParams()` читає параметри поточного маршруту.

3. Route parameters приходять як `string`.

4. Якщо потрібен `number`, використовуй:

       Number(userId)

5. Назва параметра повинна збігатися:

       :userId

   → 

       const { userId } = useParams();

6. Можна мати декілька параметрів:

       /users/:userId/posts/:postId

7. Parameter може бути `id` або `slug`.

8. Route parameter ≠ query parameter.

9. URL може бути джерелом стану сторінки.

10. Parameter потрібно валідовувати.

11. Потрібно обробляти випадок, коли ресурс не знайдений.

12. Якщо дані завантажуються за parameter, effect повинен залежати від parameter.

13. Не потрібно дублювати parameter у state без необхідності.

14. Route parameter часто є містком:

       URL → API → Database → UI

---

# 77. Route Parameters — Core Level

На базовому рівні потрібно вміти:

- розуміти `:param`;
- створювати dynamic route;
- використовувати `useParams()`;
- отримувати `id`;
- отримувати `slug`;
- створювати `Link` із параметром;
- розуміти, що параметр є `string`;
- перетворювати `string` → `number`.

Приклад:

    <Route
      path="/users/:userId"
      element={<UserPage />}
    />

    function UserPage() {
      const { userId } = useParams();

      return <h1>{userId}</h1>;
    }

---

# 78. Route Parameters — Junior Level

На Junior рівні потрібно вміти:

- використовувати декілька parameters;
- створювати nested dynamic routes;
- використовувати `id`;
- використовувати `slug`;
- завантажувати API data за параметром;
- правильно працювати з `useEffect`;
- перевіряти параметри;
- обробляти `404`;
- розуміти URL state;
- використовувати TypeScript для параметрів.

Наприклад:

    type RouteParams = {
      userId: string;
    };

    const { userId } = useParams<RouteParams>();

---

# 79. Route Parameters — Middle Level

На Middle рівні потрібно розуміти:

- дизайн URL;
- REST resource identification;
- nested resources;
- ID vs slug;
- route parameter validation;
- loading/error/not-found states;
- route parameter + API;
- route parameter + authentication;
- route parameter + protected routes;
- route parameter + caching;
- route parameter + data fetching libraries;
- взаємодію routing layer і data layer.

---

# 80. Route Parameters — Senior Level

На Senior рівні потрібно думати не тільки про:

    "Як отримати parameter?"

а про:

> "Як правильно спроектувати URL і routing architecture всього застосунку?"

Потрібно розуміти:

- URL design;
- resource hierarchy;
- nested resources;
- canonical URLs;
- SEO;
- redirects;
- backward compatibility;
- deep linking;
- authorization;
- resource ownership;
- route-level data loading;
- error boundaries;
- code splitting;
- caching;
- navigation UX.

---

# 81. Питання для співбесіди

### 1. Що таке route parameter?

Динамічне значення в URL, яке визначає конкретний ресурс.

Наприклад:

    /users/:userId

---

### 2. Як отримати route parameter?

За допомогою:

    useParams()

---

### 3. Що повертає `useParams()`?

Об'єкт із параметрами поточного маршруту.

Наприклад:

    {
      userId: "42"
    }

---

### 4. Який тип має parameter?

За замовчуванням значення URL є:

    string

---

### 5. Як отримати число?

Наприклад:

    const id = Number(userId);

---

### 6. Чим `/users/:id` відрізняється від `/users?id=42`?

`/users/:id` використовує route parameter.

`/users?id=42` використовує query parameter.

---

### 7. Чи можна мати декілька параметрів?

Так.

Наприклад:

    /users/:userId/posts/:postId

---

### 8. Чи можна використовувати slug?

Так.

Наприклад:

    /posts/:slug

---

### 9. Що робити, якщо параметр невалідний?

Потрібно перевірити його і показати відповідний error/not-found UI або виконати redirect.

---

### 10. Що робити, якщо parameter валідний, але ресурсу немає?

Показати:

    Not Found

або перенаправити користувача на відповідну сторінку.

---

### 11. Чому `useEffect` може залежати від route parameter?

Тому що parameter може змінитися без зміни самого компонента.

Наприклад:

    /users/1

→

    /users/2

---

### 12. Чи потрібно зберігати route parameter у React state?

Зазвичай ні.

URL уже є джерелом цього значення.

---

# 82. Міні-шпаргалка

## Dynamic route

    <Route
      path="/users/:userId"
      element={<UserPage />}
    />

## Get parameter

    const { userId } = useParams();

## TypeScript

    const { userId } =
      useParams<{ userId: string }>();

## Convert to number

    const id = Number(userId);

## Multiple parameters

    <Route
      path="/users/:userId/posts/:postId"
      element={<PostPage />}
    />

## Get multiple parameters

    const {
      userId,
      postId,
    } = useParams<{
      userId: string;
      postId: string;
    }>();

## Dynamic Link

    <Link to={`/users/${user.id}`}>
      Open user
    </Link>

## Dynamic navigation

    navigate(`/users/${userId}`);

## API

    fetch(`/api/users/${userId}`);

## Slug

    <Route
      path="/posts/:slug"
      element={<PostPage />}
    />

## Important

    URL parameter → string

---

# 83. Головна практична модель

Для Full Stack React Developer потрібно запам'ятати не тільки:

    useParams()

а весь ланцюг:

    /users/42
         ↓
    Route
         ↓
    :userId
         ↓
    useParams()
         ↓
    userId = "42"
         ↓
    validation
         ↓
    API request
         ↓
    GET /api/users/42
         ↓
    Backend
         ↓
    PostgreSQL
         ↓
    User
         ↓
    React state
         ↓
    UI

---

# 84. Головне

> **Route parameter — це динамічна частина URL, яка ідентифікує конкретний ресурс.**

Найважливіший синтаксис:

    <Route path="/users/:userId" />

Отримання:

    const { userId } = useParams();

Для URL:

    /users/42

отримаємо:

    userId = "42"

Далі цей параметр часто використовується для отримання даних:

    fetch(`/api/users/${userId}`);

Тобто одна з фундаментальних схем React Router:

    URL
     ↓
    Route Parameter
     ↓
    useParams()
     ↓
    API
     ↓
    Backend
     ↓
    Database
     ↓
    Data
     ↓
    UI

Саме тому route parameters є одним із ключових механізмів, які з'єднують **React Router, frontend, backend і database** у повноцінному Full Stack застосунку.