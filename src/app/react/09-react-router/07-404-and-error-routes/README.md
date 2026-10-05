# 07. 404 and Error Routes

404 and Error Routes у React Router — це механізми, які дозволяють правильно обробляти ситуації, коли користувач переходить на неіснуючий маршрут, а також ситуації, коли під час роботи маршруту або завантаження його даних виникає помилка.

У React Router важливо розділяти:

    404 Not Found
        ↓
    маршрут не знайдено

    Error Route
        ↓
    маршрут знайдено,
    але під час його обробки виникла помилка

Наприклад:

    /about
    /products
    /products/10

можуть бути валідними маршрутами.

А:

    /something-that-does-not-exist

не відповідає жодному маршруту.

Окремо можуть виникнути помилки під час:

    rendering
    loading route data
    loader()
    action()
    lazy route loading
    інтерпретації response
    роботи дочірнього route

React Router дозволяє централізовано обробляти такі ситуації через:

    path="*"
    errorElement
    ErrorBoundary
    useRouteError()
    isRouteErrorResponse()
    json()
    throw new Response(...)
    throw data(...)

---

### Ключові поняття

✔ 404 Not Found  
✔ Not Found page  
✔ catch-all route  
✔ wildcard route  
✔ `path="*"`  
✔ error route  
✔ `errorElement`  
✔ `ErrorBoundary`  
✔ `useRouteError()`  
✔ `isRouteErrorResponse()`  
✔ route error  
✔ loader error  
✔ action error  
✔ render error  
✔ nested error boundary  
✔ root error boundary  
✔ `Response`  
✔ HTTP status  
✔ `404`  
✔ `401`  
✔ `403`  
✔ `500`  
✔ `throw`  
✔ route hierarchy  
✔ error bubbling  
✔ fallback UI  
✔ error message  
✔ recovery  
✔ `Link`  
✔ navigation after error  

---

### Що потрібно пам'ятати

• 404 означає, що URL не відповідає жодному маршруту.

• Найпростіший спосіб створити 404 route у React Router — використати:

    path="*"

• `*` означає catch-all route.

• 404 route зазвичай має бути останнім fallback-маршрутом.

• `path="*"` і `errorElement` вирішують різні задачі.

• `path="*"` використовується, коли маршрут не знайдено.

• `errorElement` використовується, коли під час обробки маршруту виникла помилка.

• `useRouteError()` дозволяє отримати інформацію про помилку всередині error element.

• `isRouteErrorResponse()` допомагає перевірити, чи є помилка route response.

• Error boundary може бути встановлений на рівні route.

• Error boundary може бути встановлений на root route.

• Nested routes можуть мати власні error boundaries.

• Якщо дочірній route не має власного error boundary, помилка може піднятися до батьківського route.

• 404 page — це звичайний UI для неіснуючого URL.

• Error page — це UI для помилки під час роботи route.

• Хороша error page повинна пояснювати проблему та давати користувачу спосіб продовжити роботу.

---

# 404 Not Found

`404 Not Found` — стандартний HTTP статус, який означає:

    ресурс не знайдено

У SPA на React Router це найчастіше означає:

    URL
      ↓
    React Router
      ↓
    жоден route не підходить
      ↓
    404 page

Наприклад:

    /about
    /products
    /contact

існують.

А:

    /abc123
    /hello-world
    /something

можуть не існувати.

---

# Catch-all Route

Catch-all route — маршрут, який відповідає на всі URL, що не були оброблені іншими маршрутами.

У React Router:

    path="*"

Наприклад:

    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/about",
            element: <AboutPage />,
        },
        {
            path: "*",
            element: <NotFoundPage />,
        },
    ]);

Якщо користувач відкриє:

    /about

буде:

    <AboutPage />

Якщо:

    /unknown

буде:

    <NotFoundPage />

---

# `path="*"`

`*` — wildcard path.

Він використовується для route, який повинен відповідати широкому набору URL.

Найпростіший 404:

    {
        path: "*",
        element: <NotFoundPage />,
    }

---

# NotFoundPage

Зазвичай 404 page — окремий React component.

Наприклад:

    function NotFoundPage() {
        return (
            <main>
                <h1>404</h1>

                <p>
                    Сторінку не знайдено.
                </p>

                <Link to="/">
                    На головну
                </Link>
            </main>
        );
    }

---

# Link з 404 page

Користувачу потрібно дати можливість повернутися на валідну сторінку.

    import { Link } from "react-router-dom";

    function NotFoundPage() {
        return (
            <main>
                <h1>404</h1>

                <p>
                    Сторінку не знайдено.
                </p>

                <Link to="/">
                    На головну
                </Link>
            </main>
        );
    }

---

# 404 Route у `createBrowserRouter`

Сучасний підхід:

    import {
        createBrowserRouter,
        RouterProvider,
    } from "react-router-dom";

    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/about",
            element: <AboutPage />,
        },
        {
            path: "*",
            element: <NotFoundPage />,
        },
    ]);

    function App() {
        return (
            <RouterProvider router={router} />
        );
    }

---

# 404 Route у `Routes`

Якщо використовується декларативний API:

    import {
        Routes,
        Route,
    } from "react-router-dom";

    function AppRoutes() {
        return (
            <Routes>
                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/about"
                    element={<AboutPage />}
                />

                <Route
                    path="*"
                    element={<NotFoundPage />}
                />
            </Routes>
        );
    }

---

# Порядок Routes

Для React Router важливо розуміти, що `path="*"` є fallback.

Наприклад:

    <Routes>
        <Route
            path="/"
            element={<HomePage />}
        />

        <Route
            path="/about"
            element={<AboutPage />}
        />

        <Route
            path="*"
            element={<NotFoundPage />}
        />
    </Routes>

Логіка:

    URL
      ↓
    route matching
      ↓
    exact/specific route
      ↓
    якщо не знайдено
      ↓
    *

---

# `*` не означає будь-який route

Важливо не плутати:

    path="*"

з:

    "цей component завжди відображається"

`*` використовується як fallback для URL, які не match-яться з іншими маршрутами.

---

# 404 та Nested Routes

У nested routing 404 можна використовувати на різних рівнях.

Наприклад:

    /dashboard
    /dashboard/profile
    /dashboard/settings

Структура:

    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <DashboardHome />,
            },
            {
                path: "profile",
                element: <ProfilePage />,
            },
            {
                path: "settings",
                element: <SettingsPage />,
            },
            {
                path: "*",
                element: <DashboardNotFound />,
            },
        ],
    }

Тепер:

    /dashboard/profile

існує.

А:

    /dashboard/unknown

може показати:

    <DashboardNotFound />

---

# Global 404

Можна мати глобальний fallback:

    {
        path: "*",
        element: <NotFoundPage />,
    }

Він обробляє URL, які не відповідають жодному основному route.

---

# Local 404

У великому application іноді корисно мати 404 на рівні певного розділу.

Наприклад:

    /admin
    /admin/users
    /admin/settings

Якщо:

    /admin/unknown

можна показати спеціальний:

    AdminNotFoundPage

а не глобальний 404.

---

# 404 vs Error

Це одна з найважливіших відмінностей.

## 404

Route не знайдено:

    /something-that-does-not-exist

Результат:

    NotFoundPage

---

## Error

Route існує, але під час його виконання сталася помилка:

    /products

      ↓

    loader()

      ↓

    API error

      ↓

    ErrorBoundary

---

# `errorElement`

React Router дозволяє визначити UI, який буде показаний при помилці route.

Наприклад:

    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "/about",
                    element: <AboutPage />,
                },
            ],
        },
    ]);

Якщо виникне route error, React Router покаже:

    <ErrorPage />

---

# Простий ErrorPage

    function ErrorPage() {
        return (
            <main>
                <h1>Something went wrong</h1>

                <p>
                    Виникла помилка.
                </p>

                <Link to="/">
                    На головну
                </Link>
            </main>
        );
    }

---

# `useRouteError()`

Щоб отримати інформацію про помилку:

    useRouteError()

Приклад:

    import {
        useRouteError,
    } from "react-router-dom";

    function ErrorPage() {
        const error = useRouteError();

        console.log(error);

        return (
            <main>
                <h1>
                    Помилка
                </h1>
            </main>
        );
    }

---

# Базовий ErrorPage

    import {
        Link,
        useRouteError,
    } from "react-router-dom";

    function ErrorPage() {
        const error = useRouteError();

        console.error(error);

        return (
            <main>
                <h1>Щось пішло не так</h1>

                <p>
                    Не вдалося відкрити сторінку.
                </p>

                <Link to="/">
                    На головну
                </Link>
            </main>
        );
    }

---

# `isRouteErrorResponse()`

React Router має helper:

    isRouteErrorResponse()

Він дозволяє перевірити, чи є отримана помилка route response.

Наприклад:

    import {
        isRouteErrorResponse,
        useRouteError,
    } from "react-router-dom";

    function ErrorPage() {
        const error = useRouteError();

        if (isRouteErrorResponse(error)) {
            return (
                <main>
                    <h1>
                        {error.status}
                    </h1>

                    <p>
                        {error.statusText}
                    </p>
                </main>
            );
        }

        return (
            <main>
                <h1>
                    Невідома помилка
                </h1>
            </main>
        );
    }

---

# Route Error Response

Route error може містити:

    status
    statusText
    data

Наприклад:

    {
        status: 404,
        statusText: "Not Found",
        data: ...
    }

Тому можна відображати різні повідомлення залежно від статусу.

---

# Обробка 404 через Error Response

У data router можна створити route, який кидає 404 response.

Наприклад:

    {
        path: "/products/:productId",
        loader: async ({ params }) => {
            const product = await getProduct(
                params.productId
            );

            if (!product) {
                throw new Response(
                    "Not Found",
                    {
                        status: 404,
                    }
                );
            }

            return product;
        },
        element: <ProductPage />,
        errorElement: <ErrorPage />,
    }

Якщо product не існує:

    loader()
        ↓
    product === null
        ↓
    throw Response
        ↓
    errorElement

---

# `throw new Response()`

Route loader може завершити виконання через HTTP-like response.

    throw new Response(
        "Not Found",
        {
            status: 404,
        }
    );

Наприклад:

    async function productLoader({ params }) {
        const product = await getProduct(
            params.productId
        );

        if (!product) {
            throw new Response(
                "Product not found",
                {
                    status: 404,
                }
            );
        }

        return product;
    }

---

# Error Handling у Loader

Loader:

    loader: async ({ params }) => {
        const response = await fetch(
            `/api/products/${params.productId}`
        );

        if (!response.ok) {
            throw new Response(
                "Failed to load product",
                {
                    status: response.status,
                }
            );
        }

        return response.json();
    }

Помилка:

    loader
      ↓
    response.ok === false
      ↓
    throw
      ↓
    errorElement

---

# ErrorPage для 404 та інших помилок

Можна створити універсальний ErrorPage:

    import {
        isRouteErrorResponse,
        Link,
        useRouteError,
    } from "react-router-dom";

    function ErrorPage() {
        const error = useRouteError();

        if (isRouteErrorResponse(error)) {
            if (error.status === 404) {
                return (
                    <main>
                        <h1>404</h1>

                        <p>
                            Сторінку не знайдено.
                        </p>

                        <Link to="/">
                            На головну
                        </Link>
                    </main>
                );
            }

            return (
                <main>
                    <h1>
                        {error.status}
                    </h1>

                    <p>
                        {error.statusText}
                    </p>
                </main>
            );
        }

        return (
            <main>
                <h1>
                    Невідома помилка
                </h1>

                <Link to="/">
                    На головну
                </Link>
            </main>
        );
    }

---

# 404 vs `errorElement`

Це важлива концепція.

### `path="*"`

Використовується для:

    URL не відповідає жодному route

Наприклад:

    /unknown

---

### `errorElement`

Використовується для:

    route існує,
    але виникла помилка

Наприклад:

    /products/123

    ↓

    loader()

    ↓

    API error

    ↓

    errorElement

---

# Приклад разом

    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: "products",
                    element: <ProductsPage />,
                },
                {
                    path: "*",
                    element: <NotFoundPage />,
                },
            ],
        },
    ]);

Тут є два різних механізми:

    path="*"
        ↓
    NotFoundPage

    errorElement
        ↓
    ErrorPage

---

# Route Errors

Помилка може виникнути під час:

    route matching
    loader()
    action()
    component rendering
    lazy loading
    data fetching

React Router може передати її до відповідного error boundary.

---

# Loader Error

Наприклад:

    {
        path: "/users",
        loader: async () => {
            const response = await fetch(
                "/api/users"
            );

            if (!response.ok) {
                throw new Response(
                    "Failed to load users",
                    {
                        status: 500,
                    }
                );
            }

            return response.json();
        },
        element: <UsersPage />,
        errorElement: <ErrorPage />,
    }

Якщо API поверне помилку:

    fetch()
        ↓
    response.ok === false
        ↓
    throw
        ↓
    ErrorPage

---

# Render Error

Помилка може виникнути під час rendering component.

Наприклад:

    function UserPage() {
        throw new Error(
            "Something went wrong"
        );

        return <div>User</div>;
    }

Якщо route має:

    errorElement: <ErrorPage />

React Router може використати його для обробки route error.

---

# Action Error

У data router `action()` може також завершитися помилкою.

Наприклад:

    {
        path: "/login",
        action: async ({ request }) => {
            const response = await loginUser(request);

            if (!response.ok) {
                throw new Response(
                    "Login failed",
                    {
                        status: 401,
                    }
                );
            }

            return response;
        },
        element: <LoginPage />,
        errorElement: <ErrorPage />,
    }

---

# HTTP Status Codes

Для route error корисно розуміти базові HTTP status codes.

    400 → Bad Request

    401 → Unauthorized

    403 → Forbidden

    404 → Not Found

    500 → Internal Server Error

У frontend application вони можуть використовуватися для відображення відповідного UI.

---

# 401 Unauthorized

Наприклад:

    throw new Response(
        "Unauthorized",
        {
            status: 401,
        }
    );

ErrorPage може показати:

    <h1>401</h1>

    <p>
        Потрібно увійти в систему.
    </p>

---

# 403 Forbidden

Наприклад:

    throw new Response(
        "Forbidden",
        {
            status: 403,
        }
    );

UI:

    <h1>403</h1>

    <p>
        У вас немає доступу до цієї сторінки.
    </p>

---

# 404 Not Found через Loader

Це дуже поширений сценарій.

URL:

    /products/123

Route існує.

Але product `123` не знайдено.

Тому це не обов'язково:

    path="*"

Замість цього loader може повернути 404 error.

    loader: async ({ params }) => {
        const product = await getProduct(
            params.productId
        );

        if (!product) {
            throw new Response(
                "Product not found",
                {
                    status: 404,
                }
            );
        }

        return product;
    }

---

# Дві різні 404 ситуації

Це дуже важливо.

## Ситуація 1

URL не існує:

    /something

Жодного route немає.

Використовується:

    path="*"

---

## Ситуація 2

Route існує:

    /products/:productId

але конкретний ресурс не існує:

    /products/999999

Тоді:

    loader()
        ↓
    product not found
        ↓
    throw 404 response
        ↓
    errorElement

---

# Root Error Boundary

У великому application корисно мати root-level error boundary.

Наприклад:

    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            errorElement: <RootErrorPage />,
            children: [
                ...
            ],
        },
    ]);

Якщо дочірній route не має власного error boundary, помилка може піднятися до root error boundary.

---

# Nested Error Boundaries

Кожен route може мати власний:

    errorElement

Наприклад:

    {
        path: "/",
        element: <RootLayout />,
        errorElement: <RootErrorPage />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
                errorElement: <DashboardErrorPage />,
            },
        ],
    }

Тепер:

    dashboard error
        ↓
    DashboardErrorPage

а не обов'язково:

    RootErrorPage

---

# Error Bubbling

Якщо route не має власного error boundary, помилка може піднятися до найближчого батьківського route, який має:

    errorElement

Наприклад:

    Root
      │
      ├── Dashboard
      │     │
      │     └── Users
      │
      └── About

Якщо `Users` має помилку, але не має власного:

    errorElement

помилка може піднятися до:

    Dashboard
        ↓
    Root

і буде використаний найближчий доступний error boundary.

---

# Error Boundary Hierarchy

Умовно:

    Users
      ↓
    Dashboard
      ↓
    Root

Якщо:

    Users → немає errorElement
    Dashboard → є errorElement

то:

    Users error
        ↓
    Dashboard errorElement

---

# Error Boundary vs React Error Boundary

Не слід повністю ототожнювати:

    React Error Boundary

і:

    React Router errorElement

React Router має власну route-oriented систему обробки помилок.

Вона інтегрована з:

    routes
    loaders
    actions
    route rendering
    nested routing

Тому для помилок маршрутизації та data router зручно використовувати:

    errorElement

---

# `useRouteError()` та TypeScript

У TypeScript можна отримати route error:

    const error = useRouteError();

Наприклад:

    function ErrorPage() {
        const error = useRouteError();

        if (isRouteErrorResponse(error)) {
            console.log(error.status);
        }

        return <div>Error</div>;
    }

`isRouteErrorResponse()` допомагає звузити тип.

---

# Error UI

Хороший ErrorPage повинен:

    пояснити проблему
    ↓
    показати статус
    ↓
    дати можливість продовжити
    ↓
    запропонувати navigation

Наприклад:

    404

    Сторінку не знайдено.

    [На головну]

Або:

    500

    Сталася помилка сервера.

    [Спробувати ще раз]
    [На головну]

---

# Retry

Для деяких помилок корисно дозволити повторити дію.

Наприклад:

    <button
        onClick={() => window.location.reload()}
    >
        Спробувати ще раз
    </button>

Але `reload()` — не єдиний можливий підхід.

У production application retry краще пов'язувати з конкретною операцією:

    refetch
    retry request
    повторний navigation
    повторне виконання loader

---

# Navigation з Error Page

Можна використовувати:

    Link

Наприклад:

    <Link to="/">
        На головну
    </Link>

Або:

    <Link to="/products">
        До товарів
    </Link>

---

# `useNavigate()`

Якщо потрібно програмно перейти на інший route:

    import {
        useNavigate,
    } from "react-router-dom";

    function ErrorPage() {
        const navigate = useNavigate();

        return (
            <button
                onClick={() => navigate("/")}
            >
                На головну
            </button>
        );
    }

Для простого посилання частіше краще:

    <Link />

а для програмної логіки:

    useNavigate()

---

# Not Found Component

Хороший 404 component може містити:

    404
    title
    description
    link home
    link previous section

Наприклад:

    function NotFoundPage() {
        return (
            <main>
                <h1>404</h1>

                <h2>
                    Сторінку не знайдено
                </h2>

                <p>
                    Можливо, URL було введено неправильно.
                </p>

                <Link to="/">
                    Повернутися на головну
                </Link>
            </main>
        );
    }

---

# Error Component

Error component може містити:

    status
    title
    message
    navigation
    retry

Наприклад:

    function ErrorPage() {
        const error = useRouteError();

        console.error(error);

        return (
            <main>
                <h1>Помилка</h1>

                <p>
                    Не вдалося завантажити сторінку.
                </p>

                <Link to="/">
                    На головну
                </Link>
            </main>
        );
    }

---

# Спеціальна обробка статусів

Можна створити різний UI:

    function ErrorPage() {
        const error = useRouteError();

        if (isRouteErrorResponse(error)) {
            switch (error.status) {
                case 401:
                    return <UnauthorizedPage />;

                case 403:
                    return <ForbiddenPage />;

                case 404:
                    return <NotFoundPage />;

                case 500:
                    return <ServerErrorPage />;

                default:
                    return <GenericErrorPage />;
            }
        }

        return <GenericErrorPage />;
    }

---

# Generic Error

Не всі помилки будуть HTTP response.

Наприклад:

    throw new Error(
        "Unexpected error"
    );

Тому потрібен fallback:

    return (
        <GenericErrorPage />
    );

---

# Error Object

Якщо:

    throw new Error("Something went wrong");

можна отримати:

    error.message

Наприклад:

    function ErrorPage() {
        const error = useRouteError();

        if (error instanceof Error) {
            return (
                <p>
                    {error.message}
                </p>
            );
        }

        return (
            <p>
                Unknown error
            </p>
        );
    }

На практиці route errors можуть мати різні форми, тому краще не припускати один конкретний тип без перевірки.

---

# Error Handling Architecture

У невеликому application:

    Root
      ↓
    errorElement
      ↓
    ErrorPage

У більшому:

    RootErrorPage
        │
        ├── DashboardErrorPage
        │
        ├── AdminErrorPage
        │
        └── ProductErrorPage

Це дозволяє показувати context-specific error UI.

---

# 404 Architecture

Проста структура:

    App
     │
     ├── /
     ├── /about
     ├── /products
     ├── /contact
     │
     └── *

`*`:

    ↓

    NotFoundPage

---

# Error Architecture

    Route
      ↓
    loader()
      ↓
    error
      ↓
    errorElement
      ↓
    ErrorPage

---

# Full Example

    import {
        createBrowserRouter,
        Link,
        RouterProvider,
        isRouteErrorResponse,
        useRouteError,
    } from "react-router-dom";

    function HomePage() {
        return (
            <main>
                <h1>Home</h1>
            </main>
        );
    }

    function AboutPage() {
        return (
            <main>
                <h1>About</h1>
            </main>
        );
    }

    function NotFoundPage() {
        return (
            <main>
                <h1>404</h1>

                <p>
                    Сторінку не знайдено.
                </p>

                <Link to="/">
                    На головну
                </Link>
            </main>
        );
    }

    function ErrorPage() {
        const error = useRouteError();

        if (isRouteErrorResponse(error)) {
            return (
                <main>
                    <h1>
                        {error.status}
                    </h1>

                    <p>
                        {error.statusText}
                    </p>

                    <Link to="/">
                        На головну
                    </Link>
                </main>
            );
        }

        return (
            <main>
                <h1>
                    Невідома помилка
                </h1>

                <Link to="/">
                    На головну
                </Link>
            </main>
        );
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/about",
            element: <AboutPage />,
            errorElement: <ErrorPage />,
        },
        {
            path: "*",
            element: <NotFoundPage />,
        },
    ]);

    export default function App() {
        return (
            <RouterProvider router={router} />
        );
    }

---

# Full Example з Loader

    const router = createBrowserRouter([
        {
            path: "/products/:productId",
            element: <ProductPage />,
            errorElement: <ErrorPage />,

            loader: async ({ params }) => {
                const response = await fetch(
                    `/api/products/${params.productId}`
                );

                if (!response.ok) {
                    throw new Response(
                        "Product not found",
                        {
                            status: response.status,
                        }
                    );
                }

                return response.json();
            },
        },
        {
            path: "*",
            element: <NotFoundPage />,
        },
    ]);

---

# ErrorPage з різними статусами

    function ErrorPage() {
        const error = useRouteError();

        if (isRouteErrorResponse(error)) {
            if (error.status === 404) {
                return (
                    <main>
                        <h1>404</h1>

                        <p>
                            Ресурс не знайдено.
                        </p>

                        <Link to="/">
                            На головну
                        </Link>
                    </main>
                );
            }

            if (error.status === 401) {
                return (
                    <main>
                        <h1>401</h1>

                        <p>
                            Потрібна авторизація.
                        </p>

                        <Link to="/login">
                            Увійти
                        </Link>
                    </main>
                );
            }

            if (error.status === 403) {
                return (
                    <main>
                        <h1>403</h1>

                        <p>
                            Доступ заборонено.
                        </p>

                        <Link to="/">
                            На головну
                        </Link>
                    </main>
                );
            }

            if (error.status >= 500) {
                return (
                    <main>
                        <h1>500</h1>

                        <p>
                            Помилка сервера.
                        </p>

                        <Link to="/">
                            На головну
                        </Link>
                    </main>
                );
            }
        }

        return (
            <main>
                <h1>
                    Невідома помилка
                </h1>

                <Link to="/">
                    На головну
                </Link>
            </main>
        );
    }

---

# `errorElement` на Root Route

Для production application часто корисно мати глобальний fallback:

    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            errorElement: <RootErrorPage />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: "about",
                    element: <AboutPage />,
                },
                {
                    path: "products",
                    element: <ProductsPage />,
                },
                {
                    path: "*",
                    element: <NotFoundPage />,
                },
            ],
        },
    ]);

Тепер:

    unknown URL
        ↓
    NotFoundPage

А помилка під час роботи route:

    route error
        ↓
    RootErrorPage

---

# `path="*"` у Nested Routes

Наприклад:

    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            children: [
                {
                    path: "dashboard",
                    element: <DashboardLayout />,
                    children: [
                        {
                            index: true,
                            element: <DashboardHome />,
                        },
                        {
                            path: "users",
                            element: <UsersPage />,
                        },
                        {
                            path: "settings",
                            element: <SettingsPage />,
                        },
                        {
                            path: "*",
                            element: <DashboardNotFound />,
                        },
                    ],
                },
            ],
        },
    ]);

Тепер:

    /dashboard
        → DashboardHome

    /dashboard/users
        → UsersPage

    /dashboard/settings
        → SettingsPage

    /dashboard/unknown
        → DashboardNotFound

---

# Route-Level Error UI

У великому application краще не завжди показувати однакову помилку.

Наприклад:

    ProductsErrorPage

може пояснити:

    "Не вдалося завантажити товари."

А:

    ProfileErrorPage

може пояснити:

    "Не вдалося завантажити профіль."

Це покращує UX.

---

# Error Boundary Placement

При виборі місця для `errorElement` потрібно подумати:

    Наскільки велика частина UI
    повинна бути замінена помилкою?

Якщо boundary знаходиться дуже високо:

    більша частина application
    ↓
    зникне при помилці

Якщо boundary знаходиться нижче:

    помилка може бути локалізована
    ↓
    решта UI продовжує працювати

---

# Error Isolation

Наприклад:

    Root Layout
        │
        ├── Header
        │
        ├── Sidebar
        │
        └── Main
              │
              └── Products

Якщо `Products` має власний error boundary:

    Products error
        ↓
    ProductsErrorPage

Header та Sidebar можуть залишитися доступними.

---

# 404 Page vs Empty State

Не потрібно плутати:

    404
    Empty State

404:

    сторінка або ресурс не знайдений

Empty State:

    сторінка існує,
    але даних немає

Наприклад:

    /products

існує.

Але:

    products = []

Це не обов'язково 404.

Можна показати:

    "Товарів поки немає."

---

# 404 vs Authentication

Також не слід плутати:

    404
    401
    403

`404`:

    ресурс не знайдено

`401`:

    користувач не автентифікований

`403`:

    користувач автентифікований,
    але не має permission

---

# Типовий Flow

## Неіснуючий URL

    User enters URL
          ↓
    React Router
          ↓
    route matching
          ↓
    no route
          ↓
    path="*"
          ↓
    NotFoundPage

---

## Помилка Loader

    User enters URL
          ↓
    route matching
          ↓
    loader()
          ↓
    error
          ↓
    errorElement
          ↓
    ErrorPage

---

## Resource Not Found

    /products/123
          ↓
    route exists
          ↓
    loader()
          ↓
    product not found
          ↓
    throw 404
          ↓
    errorElement
          ↓
    404 UI

---

# Типові помилки

❌ Плутати:

    path="*"

та:

    errorElement

`path="*"` — fallback route.

`errorElement` — error UI.

---

❌ Вважати, що `404` завжди означає `path="*"`.

Resource може не існувати навіть тоді, коли route існує:

    /products/:productId

---

❌ Не створювати global error boundary.

У production application бажано мати хоча б root-level error handling.

---

❌ Показувати користувачу технічний stack trace.

Користувачу краще показати:

    зрозуміле повідомлення
    status
    navigation
    retry

А технічні деталі:

    console.error()
    logging system
    monitoring service

---

❌ Не давати користувачу шлях продовжити роботу.

Error page бажано має містити:

    Link to home
    Link to relevant section
    Retry

---

❌ Перетворювати кожну відсутність даних на 404.

Порожній список:

    []

не означає автоматично:

    404

---

❌ Використовувати один величезний ErrorPage для всього application без потреби.

Для великих application корисні локальні error boundaries.

---

❌ Показувати технічні помилки API безпосередньо користувачу.

Наприклад:

    TypeError: Failed to fetch

не є хорошим user-facing повідомленням.

Краще:

    "Не вдалося завантажити дані.
     Спробуйте ще раз."

---

# Практичний шаблон ErrorPage

    import {
        isRouteErrorResponse,
        Link,
        useRouteError,
    } from "react-router-dom";

    export function ErrorPage() {
        const error = useRouteError();

        if (isRouteErrorResponse(error)) {
            return (
                <main>
                    <h1>
                        {error.status}
                    </h1>

                    <p>
                        {error.statusText}
                    </p>

                    <Link to="/">
                        На головну
                    </Link>
                </main>
            );
        }

        return (
            <main>
                <h1>
                    Щось пішло не так
                </h1>

                <p>
                    Виникла непередбачена помилка.
                </p>

                <Link to="/">
                    На головну
                </Link>
            </main>
        );
    }

---

# Практичний шаблон 404

    import { Link } from "react-router-dom";

    export function NotFoundPage() {
        return (
            <main>
                <h1>404</h1>

                <h2>
                    Сторінку не знайдено
                </h2>

                <p>
                    Перевірте адресу або
                    поверніться на головну.
                </p>

                <Link to="/">
                    На головну
                </Link>
            </main>
        );
    }

---

# Структура файлів

Один із можливих варіантів:

    src/
    └── app/
        └── react/
            └── 09-react-router/
                └── 07-404-and-error-routes/
                    ├── README.md
                    ├── ErrorPage.tsx
                    ├── NotFoundPage.tsx
                    └── router.tsx

Або в реальному application:

    src/
    ├── pages/
    │   ├── NotFoundPage.tsx
    │   └── ErrorPage.tsx
    │
    └── router/
        └── router.tsx

---

# Приклад структури Router

    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: "about",
                    element: <AboutPage />,
                },
                {
                    path: "products",
                    element: <ProductsPage />,
                },
                {
                    path: "*",
                    element: <NotFoundPage />,
                },
            ],
        },
    ]);

---

# 404 та SEO

У SPA потрібно розуміти різницю між:

    client-side route

та:

    server HTTP response

React Router на клієнті може показати:

    NotFoundPage

але сервер також повинен правильно обробляти URL у production deployment.

Для SPA hosting часто потрібен fallback до:

    index.html

щоб React Router отримав можливість обробити URL на клієнті.

Це вже залежить від:

    Vercel
    Netlify
    nginx
    Apache
    іншого hosting

Тому deployment configuration також є частиною правильного routing.

---

# React Router + Vercel

Для Vercel SPA routing важливо правильно налаштувати deployment, якщо application використовує client-side routing.

Наприклад, у SPA route:

    /products/10

при прямому відкритті URL сервер повинен передати application, а не просто повернути server-level 404.

Логіка:

    Browser
       ↓
    /products/10
       ↓
    hosting
       ↓
    React application
       ↓
    React Router
       ↓
    /products/10

Якщо hosting не налаштований для SPA fallback, navigation всередині application може працювати, а пряме оновлення сторінки — ні.

---

# Error Handling Strategy

Хороша базова стратегія:

    Root error boundary
          ↓
    local error boundaries
          ↓
    route-specific errors

Для 404:

    global *
          ↓
    NotFoundPage

Для resource errors:

    loader
       ↓
    throw response
       ↓
    errorElement

---

# Практичний маршрут

Для навчання корисно пройти такий шлях:

    1. створити NotFoundPage
            ↓
    2. додати path="*"
            ↓
    3. створити ErrorPage
            ↓
    4. додати errorElement
            ↓
    5. використати useRouteError()
            ↓
    6. використати isRouteErrorResponse()
            ↓
    7. створити loader error
            ↓
    8. throw 404 Response
            ↓
    9. обробити 401 / 403 / 500
            ↓
    10. додати nested error boundaries

---

# Питання зі співбесіди

Що таке 404?

Що таке Not Found page?

Як створити 404 route у React Router?

Що означає:

    path="*"

Що таке catch-all route?

Чим `path="*"` відрізняється від `errorElement`?

Що таке route error?

Що таке `errorElement`?

Для чого використовується `useRouteError()`?

Для чого потрібен `isRouteErrorResponse()`?

Як отримати HTTP status з route error?

Як обробити 404 у loader?

Що таке:

    throw new Response()

?

Як обробити помилку API в loader?

Що станеться, якщо loader кинув помилку?

Що таке error boundary у React Router?

Що таке nested error boundary?

Що таке error bubbling?

Чим 404 відрізняється від 401?

Чим 401 відрізняється від 403?

Чим 403 відрізняється від 404?

Чим 404 відрізняється від empty state?

Як зробити root-level error handling?

Як зробити локальний error handling для nested route?

Як повернути користувача на головну зі сторінки помилки?

Коли використовувати `Link`, а коли `useNavigate()`?

Що має містити хороша 404 page?

Що має містити хороша error page?

Чому не потрібно показувати користувачу stack trace?

Чому SPA routing може працювати при navigation, але не працювати після refresh?

Що потрібно налаштувати на hosting для client-side routing?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке 404.

Що таке Not Found page.

Що таке `path="*"`.

Що таке catch-all route.

Як створити `NotFoundPage`.

Як використовувати:

    Link

для navigation з 404.

Що таке `errorElement`.

Що таке route error.

Основи:

    useRouteError()

Основи:

    isRouteErrorResponse()

Різниця:

    404 route
    errorElement

Основи error handling.

---

🔵 Junior

Створення 404 route.

Створення ErrorPage.

Використання:

    useRouteError()

Використання:

    isRouteErrorResponse()

Обробка:

    401
    403
    404
    500

Використання:

    throw new Response()

у loader.

Обробка loader errors.

Nested error boundaries.

Root error boundary.

Error bubbling.

Resource not found vs route not found.

Navigation з error page.

Retry UI.

Основи SPA hosting fallback.

---

🟠 Middle

Проєктування error boundary hierarchy.

Root vs local error boundaries.

Context-specific error UI.

Error handling для:

    loaders
    actions
    lazy routes
    rendering

Централізована обробка HTTP status.

Обробка API errors.

Відокремлення:

    technical error
    user-facing error

Error recovery.

Retry strategies.

Logging.

Monitoring.

Error handling architecture.

SPA deployment configuration.

Error handling у nested routes.

---

🔴 Senior

Глибока архітектура route error handling.

Error boundary hierarchy.

Error isolation.

Error propagation.

Error recovery strategies.

Failure boundaries.

Distributed error handling між:

    frontend
    backend
    API
    authentication
    hosting

Observability.

Error logging.

Error monitoring.

Error classification.

HTTP semantics.

UX для degraded states.

Retry policies.

Network failures.

Partial application failure.

SSR / CSR error handling.

Streaming error handling.

Production deployment failures.

Security considerations при відображенні error information.

---

# Міні-шпаргалка

## 404

    404
      ↓
    resource/route not found

---

## Catch-all

    {
        path: "*",
        element: <NotFoundPage />,
    }

---

## Error Element

    {
        errorElement: <ErrorPage />,
    }

---

## useRouteError

    const error = useRouteError();

---

## isRouteErrorResponse

    if (isRouteErrorResponse(error)) {
        console.log(error.status);
    }

---

## 404 Response

    throw new Response(
        "Not Found",
        {
            status: 404,
        }
    );

---

## 401

    status: 401

    → authentication required

---

## 403

    status: 403

    → access forbidden

---

## 404

    status: 404

    → not found

---

## 500

    status: 500

    → server error

---

## 404 route

    URL does not match
          ↓
    path="*"
          ↓
    NotFoundPage

---

## Resource 404

    route exists
          ↓
    loader()
          ↓
    resource not found
          ↓
    throw 404
          ↓
    errorElement

---

## Error flow

    Route
      ↓
    loader/action/render
      ↓
    error
      ↓
    errorElement
      ↓
    ErrorPage

---

## Error hierarchy

    Child route
        ↓
    Parent route
        ↓
    Root route

---

## Navigation

    <Link to="/">
        На головну
    </Link>

---

# Основні правила

    path="*"       → catch-all / 404 route

    errorElement  → route error UI

    useRouteError()
                   → отримати route error

    isRouteErrorResponse()
                   → перевірити route response

    status 401    → authentication required

    status 403    → forbidden

    status 404    → not found

    status 500    → server error

---

# Головне:

• `404 Not Found` означає, що потрібний route або resource не знайдено.

• `path="*"` використовується для catch-all route.

• Найпростіший 404:

    {
        path: "*",
        element: <NotFoundPage />,
    }

• `errorElement` використовується для обробки помилок route.

• `path="*"` і `errorElement` — різні механізми.

• Якщо URL не відповідає жодному route:

    path="*"
        ↓
    NotFoundPage

• Якщо route існує, але `loader()` завершився помилкою:

    loader()
        ↓
    error
        ↓
    errorElement

• `useRouteError()` дозволяє отримати route error.

• `isRouteErrorResponse()` дозволяє перевірити route response error.

• Для resource, який не знайдено всередині існуючого route, можна використати:

    throw new Response(
        "Not Found",
        {
            status: 404,
        }
    );

• Важливо розрізняти:

    route not found
    resource not found

• `401` означає, що потрібна authentication.

• `403` означає, що доступ заборонений.

• `404` означає, що ресурс або route не знайдено.

• `500` означає server-side error.

• Error boundary можна розміщувати на різних рівнях route hierarchy.

• Якщо дочірній route не має власного error boundary, помилка може піднятися до батьківського.

• Root-level `errorElement` корисний як глобальний fallback.

• Local error boundaries дозволяють ізолювати помилки окремих частин application.

• 404 page повинна давати користувачу можливість продовжити роботу.

• Error page повинна показувати зрозуміле user-facing повідомлення, а не технічний stack trace.

• `Link` зручно використовувати для звичайної navigation.

• `useNavigate()` зручно використовувати для програмної navigation.

• Empty state не є автоматично 404.

• Порожній список:

    []

може бути нормальною ситуацією.

• Route error може виникнути під час:

    loader()
    action()
    rendering
    lazy loading
    data fetching

• Основна модель 404:

    URL
      ↓
    route matching
      ↓
    no match
      ↓
    path="*"
      ↓
    NotFoundPage

• Основна модель route error:

    URL
      ↓
    route matching
      ↓
    loader/action/render
      ↓
    error
      ↓
    errorElement
      ↓
    ErrorPage

• Основна архітектурна модель:

    Root Error Boundary
            ↓
    Local Error Boundaries
            ↓
    Route-specific Errors

• У production SPA потрібно враховувати не тільки React Router, а й hosting configuration.

• При прямому відкритті:

    /products/10

сервер повинен правильно передати application, щоб React Router зміг виконати client-side routing.

• Хороший error handling — це не тільки показати помилку, а й дозволити користувачу відновити navigation.

• Основна різниця:

    path="*"
        → route не знайдено

    errorElement
        → під час роботи route виникла помилка

• Для React Router потрібно мислити не тільки маршрутами, а й hierarchy:

    route
      ↓
    nested route
      ↓
    loader/action
      ↓
    error boundary
      ↓
    fallback UI

• Правильний error handling робить application передбачуванішим, стабільнішим і зручнішим для користувача.