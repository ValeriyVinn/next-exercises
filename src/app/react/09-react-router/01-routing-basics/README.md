# 01. Routing Basics

React Router — це бібліотека для побудови routing у React-застосунках.

Routing (маршрутизація) дозволяє пов'язувати URL-адреси з певними React-компонентами та показувати різний UI залежно від поточного URL.

Наприклад:

    /                 → HomePage
    /about            → AboutPage
    /contacts         → ContactsPage
    /products         → ProductsPage

У традиційному багатосторінковому сайті перехід на іншу сторінку часто означає завантаження нового HTML-документа з сервера.

У React SPA routing зазвичай працює інакше:

    URL
     ↓
    React Router
     ↓
    matching route
     ↓
    React component
     ↓
    render UI

React Router дозволяє змінювати URL і React UI без повного перезавантаження сторінки.

---

# Ключові поняття

✔ routing  
✔ route  
✔ router  
✔ URL  
✔ path  
✔ pathname  
✔ SPA  
✔ client-side routing  
✔ server-side routing  
✔ React Router  
✔ `BrowserRouter`  
✔ `Routes`  
✔ `Route`  
✔ `path`  
✔ `element`  
✔ route matching  
✔ navigation  
✔ link  
✔ `<Link>`  
✔ `<NavLink>`  
✔ nested routes  
✔ dynamic routes  
✔ route parameters  
✔ query parameters  
✔ index route  
✔ wildcard route  
✔ 404 route  
✔ route configuration  

---

# Що потрібно пам'ятати

• Routing визначає, який UI потрібно показати для певного URL.

• Route — це правило, яке пов'язує URL pattern з React UI.

• Router — компонент, який надає React-застосунку routing context.

• React Router реалізує client-side routing.

• У SPA зміна маршруту не обов'язково призводить до повного перезавантаження документа.

• `BrowserRouter` використовує browser History API для роботи з URL.

• `Routes` містить набір маршрутів.

• `Route` описує конкретний маршрут.

• `path` визначає URL pattern.

• `element` визначає React element, який потрібно render.

• React Router шукає route, який відповідає поточному URL.

• Для внутрішньої навігації в React Router зазвичай використовують `<Link>` або `<NavLink>`, а не звичайний `<a>`.

• URL:

    /products

може відповідати:

    <Route
        path="/products"
        element={<ProductsPage />}
    />

• Routing дозволяє будувати SPA з багатьма URL та сторінками.

---

# Що таке Routing

Routing — процес визначення того, який UI потрібно показати для поточного URL.

Наприклад:

    URL
    /about

може відповідати:

    AboutPage

Інший URL:

    /contacts

може відповідати:

    ContactsPage

Отже:

    /about
        ↓
    AboutPage

    /contacts
        ↓
    ContactsPage

---

# Route

Route — правило, яке описує відповідність між URL та React UI.

Наприклад:

    <Route
        path="/about"
        element={<AboutPage />}
    />

Це означає:

    /about
        ↓
    <AboutPage />

---

# Router

Router — компонент верхнього рівня, який дозволяє React Router відстежувати URL та керувати routing.

Найчастіше для browser-based React application використовується:

    BrowserRouter

Приклад:

    import {
        BrowserRouter
    } from "react-router-dom";

    function App() {
        return (
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        );
    }

Тепер компоненти всередині `BrowserRouter` можуть використовувати React Router.

---

# React Router

React Router — routing library для React.

Вона надає компоненти та API для:

    routing
    navigation
    route matching
    route parameters
    nested routes
    query parameters
    redirects
    error routes
    protected routes
    lazy routes

Типова структура:

    BrowserRouter
        ↓
    Routes
        ↓
    Route
        ↓
    React component

---

# Встановлення

Для використання React Router у проекті встановлюють пакет:

    npm install react-router-dom

Після встановлення можна імпортувати routing API:

    import {
        BrowserRouter,
        Routes,
        Route,
        Link,
        NavLink
    } from "react-router-dom";

---

# BrowserRouter

`BrowserRouter` — router для browser-based React applications.

Приклад:

    import {
        BrowserRouter
    } from "react-router-dom";

    function App() {
        return (
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        );
    }

Усередині `BrowserRouter` React Router отримує доступ до поточного URL та може реагувати на його зміни.

---

# Routes

`Routes` — контейнер для route configuration.

Наприклад:

    import {
        Routes,
        Route
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
                    path="/contacts"
                    element={<ContactsPage />}
                />
            </Routes>
        );
    }

---

# Route

`Route` описує один маршрут.

Наприклад:

    <Route
        path="/about"
        element={<AboutPage />}
    />

Тут:

    path
        ↓
    "/about"

визначає URL pattern.

А:

    element
        ↓
    <AboutPage />

визначає UI, який потрібно показати.

---

# Основна структура

Типовий базовий приклад:

    import {
        BrowserRouter,
        Routes,
        Route
    } from "react-router-dom";

    function App() {
        return (
            <BrowserRouter>
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
                        path="/contacts"
                        element={<ContactsPage />}
                    />
                </Routes>
            </BrowserRouter>
        );
    }

---

# Простий Router

Можна уявляти routing так:

    URL
     ↓
    BrowserRouter
     ↓
    Routes
     ↓
    Route matching
     ↓
    element
     ↓
    React component

Наприклад:

    /about
       ↓
    <Route path="/about" ... />
       ↓
    <AboutPage />

---

# Root Route

Головна сторінка зазвичай відповідає URL:

    /

Наприклад:

    <Route
        path="/"
        element={<HomePage />}
    />

Тоді:

    http://localhost:3000/

показує:

    <HomePage />

---

# Кілька маршрутів

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
            path="/products"
            element={<ProductsPage />}
        />

        <Route
            path="/contacts"
            element={<ContactsPage />}
        />
    </Routes>

Отримуємо:

    /
        → HomePage

    /about
        → AboutPage

    /products
        → ProductsPage

    /contacts
        → ContactsPage

---

# Page Components

У реальному проекті сторінки часто зберігають окремо.

Наприклад:

    src/
    ├── app/
    │   └── react/
    │       └── 09-react-router/
    ├── pages/
    │   ├── HomePage.tsx
    │   ├── AboutPage.tsx
    │   ├── ProductsPage.tsx
    │   └── ContactsPage.tsx
    └── App.tsx

Компонент:

    function HomePage() {
        return <h1>Home</h1>;
    }

І route:

    <Route
        path="/"
        element={<HomePage />}
    />

---

# Route Matching

Route matching — процес пошуку route, який відповідає поточному URL.

Наприклад, є routes:

    <Route
        path="/"
        element={<HomePage />}
    />

    <Route
        path="/about"
        element={<AboutPage />}
    />

Якщо URL:

    /about

React Router знаходить:

    path="/about"

і render:

    <AboutPage />

---

# URL

URL (Uniform Resource Locator) — адреса ресурсу.

Наприклад:

    https://example.com/products?id=10

У URL можна виділити:

    https
        ↓
    protocol

    example.com
        ↓
    host

    /products
        ↓
    pathname

    ?id=10
        ↓
    query string

У routing на базовому рівні особливо важливий:

    pathname

---

# Pathname

`pathname` — path частина URL.

Наприклад:

    https://example.com/products/10?sort=price

pathname:

    /products/10

Query string:

    ?sort=price

---

# Path

У React Router `path` визначає pattern маршруту.

Наприклад:

    <Route
        path="/products"
        element={<ProductsPage />}
    />

Тут:

    path="/products"

означає, що route відповідає URL:

    /products

---

# Exact Matching

У старих версіях React Router існувало поняття `exact`.

Наприклад, у React Router v5:

    <Route
        exact
        path="/"
        component={HomePage}
    />

У сучасному React Router v6+ `exact` більше не потрібен.

Наприклад:

    <Route
        path="/"
        element={<HomePage />}
    />

React Router використовує сучасну систему route matching.

Тому не потрібно додавати:

    exact

до сучасного `Route`.

---

# Navigation

Navigation — зміна поточного URL та route.

Наприклад:

    /home
        ↓
    /about

Після navigation React Router показує UI для:

    /about

---

# Link

`Link` використовується для внутрішньої навігації.

Приклад:

    import { Link } from "react-router-dom";

    function Navigation() {
        return (
            <nav>
                <Link to="/">Home</Link>

                <Link to="/about">
                    About
                </Link>

                <Link to="/contacts">
                    Contacts
                </Link>
            </nav>
        );
    }

---

# Link vs a

Це дуже важлива різниця.

Звичайний HTML:

    <a href="/about">
        About
    </a>

React Router:

    <Link to="/about">
        About
    </Link>

Для внутрішньої navigation у React Router зазвичай використовують:

    <Link>

а не:

    <a>

---

# Чому не завжди використовувати `<a>`

Звичайний:

    <a href="/about">
        About
    </a>

може спричинити повне завантаження документа.

React Router:

    <Link to="/about">
        About
    </Link>

використовує client-side navigation.

У SPA це дозволяє змінювати route без повного reload сторінки.

---

# Internal Navigation

Внутрішні маршрути:

    /
    /about
    /products
    /contacts

краще відкривати через:

    <Link>

Наприклад:

    <Link to="/products">
        Products
    </Link>

---

# External Links

Для зовнішніх URL використовується звичайний `<a>`.

Наприклад:

    <a
        href="https://example.com"
        target="_blank"
        rel="noreferrer"
    >
        External website
    </a>

Правило:

    internal route
        ↓
    Link

    external URL
        ↓
    a

---

# Navigation Component

Наприклад:

    function Navigation() {
        return (
            <nav>
                <Link to="/">
                    Home
                </Link>

                <Link to="/about">
                    About
                </Link>

                <Link to="/products">
                    Products
                </Link>
            </nav>
        );
    }

Потім:

    function App() {
        return (
            <BrowserRouter>
                <Navigation />

                <Routes>
                    ...
                </Routes>
            </BrowserRouter>
        );
    }

---

# NavLink

`NavLink` схожий на `Link`, але додатково дозволяє визначити, чи є route активним.

Наприклад:

    import {
        NavLink
    } from "react-router-dom";

    <NavLink to="/about">
        About
    </NavLink>

Це особливо зручно для:

    navigation menus
    sidebars
    tabs
    dashboards

---

# Link vs NavLink

`Link`:

    <Link to="/about">
        About
    </Link>

Просте посилання для navigation.

`NavLink`:

    <NavLink to="/about">
        About
    </NavLink>

Посилання, яке знає про active route.

Тобто:

    Link
        → navigation

    NavLink
        → navigation + active state

---

# Active Navigation

Наприклад:

    <NavLink
        to="/about"
        className={({ isActive }) =>
            isActive
                ? "active"
                : undefined
        }
    >
        About
    </NavLink>

Коли поточний route:

    /about

`isActive` буде:

    true

---

# Navigation Example

    function Navigation() {
        return (
            <nav>
                <NavLink to="/">
                    Home
                </NavLink>

                <NavLink to="/about">
                    About
                </NavLink>

                <NavLink to="/products">
                    Products
                </NavLink>
            </nav>
        );
    }

---

# Browser History

Browser має history.

Наприклад:

    /
     ↓
    /about
     ↓
    /products

History дозволяє користувачу натискати:

    Back
    Forward

React Router використовує browser history для navigation.

---

# History API

Браузер має History API.

Основні методи:

    history.pushState()
    history.replaceState()
    history.back()
    history.forward()
    history.go()

React Router використовує механізми browser history для client-side routing.

Не потрібно вручну працювати з ними для звичайного routing.

---

# SPA

SPA — Single Page Application.

У SPA зазвичай завантажується один HTML document, а UI змінюється за допомогою JavaScript.

Типовий flow:

    Browser
        ↓
    index.html
        ↓
    React application
        ↓
    React Router
        ↓
    route
        ↓
    component

Наприклад:

    /about
        ↓
    AboutPage

---

# MPA vs SPA

## MPA

MPA — Multi-Page Application.

При переході:

    /about

сервер може повернути новий HTML document.

Схематично:

    Browser
       ↓
    Server
       ↓
    HTML
       ↓
    Browser reload

---

## SPA

У SPA:

    Browser
       ↓
    React
       ↓
    React Router
       ↓
    route
       ↓
    component

Зміна route не обов'язково означає повне перезавантаження документа.

---

# Client-Side Routing

Client-side routing означає, що routing значною мірою контролюється JavaScript application у браузері.

Наприклад:

    click Link
        ↓
    URL changes
        ↓
    React Router detects location
        ↓
    route matching
        ↓
    new component renders

---

# Server-Side Routing

При server-side routing:

    request
        ↓
    server
        ↓
    route matching
        ↓
    response

Наприклад:

    GET /about

сервер визначає, що потрібно повернути для:

    /about

У SPA React Router може виконувати routing на client side.

---

# React Router Context

Компоненти React Router повинні знаходитися всередині router.

Наприклад:

    <BrowserRouter>
        <Navigation />

        <Routes>
            ...
        </Routes>
    </BrowserRouter>

Тоді routing components можуть отримувати доступ до router context.

---

# Помилка поза Router

Наприклад, якщо використовувати:

    <Link to="/about">
        About
    </Link>

поза:

    <BrowserRouter>

можна отримати помилку, тому що `Link` потребує router context.

Правильно:

    <BrowserRouter>
        <Link to="/about">
            About
        </Link>
    </BrowserRouter>

---

# Мінімальний застосунок

    import {
        BrowserRouter,
        Routes,
        Route,
        Link
    } from "react-router-dom";

    function Home() {
        return <h1>Home</h1>;
    }

    function About() {
        return <h1>About</h1>;
    }

    function App() {
        return (
            <BrowserRouter>
                <nav>
                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/about">
                        About
                    </Link>
                </nav>

                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/about"
                        element={<About />}
                    />
                </Routes>
            </BrowserRouter>
        );
    }

---

# Routing Flow

Для URL:

    /about

flow:

    Browser
       ↓
    current URL
       ↓
    BrowserRouter
       ↓
    Routes
       ↓
    match path="/about"
       ↓
    element={<About />}
       ↓
    About component
       ↓
    UI

---

# Route Configuration

Route configuration — опис маршрутів application.

Наприклад:

    <Routes>
        <Route
            path="/"
            element={<Home />}
        />

        <Route
            path="/about"
            element={<About />}
        />

        <Route
            path="/products"
            element={<Products />}
        />
    </Routes>

Це configuration:

    /
        → Home

    /about
        → About

    /products
        → Products

---

# Route Table

Корисно уявляти routing як таблицю:

    URL                 Component

    /                   Home
    /about              About
    /products            Products
    /contacts            Contacts

React Router реалізує цю відповідність через route configuration.

---

# Routes vs Route

Важливо не плутати:

    Routes

та:

    Route

`Routes` — контейнер / механізм route matching.

`Route` — конкретний route.

Наприклад:

    <Routes>
        <Route
            path="/"
            element={<Home />}
        />

        <Route
            path="/about"
            element={<About />}
        />
    </Routes>

---

# Route Element

У сучасному React Router route component задається через:

    element

Наприклад:

    <Route
        path="/about"
        element={<AboutPage />}
    />

Тут:

    <AboutPage />

є React element.

---

# Component vs Element

Не плутати:

    AboutPage

та:

    <AboutPage />

`AboutPage` — component.

`<AboutPage />` — React element.

У route:

    element={<AboutPage />}

передається саме element.

---

# Route Path

Прості path:

    /
    /about
    /products
    /contacts
    /settings

Приклад:

    <Route
        path="/settings"
        element={<Settings />}
    />

---

# URL Case

У routing важливо бути послідовним у назвах URL.

Наприклад:

    /products

краще не змішувати без причини з:

    /Products

Зазвичай URL paths пишуть lowercase.

Наприклад:

    /about
    /products
    /user-profile

---

# Route Order

У сучасному React Router не потрібно будувати routes так, як це часто робили у старих версіях.

Наприклад:

    <Routes>
        <Route
            path="/products"
            element={<Products />}
        />

        <Route
            path="/products/:id"
            element={<ProductDetails />}
        />
    </Routes>

React Router використовує ranking для визначення найбільш відповідного route.

Тому route matching не слід розуміти просто як:

    first route wins

---

# Static Route

Static route має фіксований path.

Наприклад:

    <Route
        path="/about"
        element={<About />}
    />

URL:

    /about

відповідає цьому route.

---

# Dynamic Route

Dynamic routes дозволяють частину URL зробити змінною.

Наприклад:

    /products/10

    /products/20

    /products/30

можуть відповідати:

    /products/:id

Приклад:

    <Route
        path="/products/:id"
        element={<ProductDetails />}
    />

Це буде детально розглядатися у:

    03-route-parameters

---

# Nested Routes

React Router підтримує вкладені routes.

Наприклад:

    /dashboard
    /dashboard/profile
    /dashboard/settings

Можна організувати routes як:

    dashboard
        ├── profile
        └── settings

Це буде детально розглядатися у:

    04-nested-routes

---

# Query Parameters

URL може містити query string:

    /products?category=books

або:

    /products?page=2&sort=price

Query parameters використовуються для передачі додаткових параметрів URL.

Детальніше:

    05-query-parameters

---

# 404 Route

Якщо URL не відповідає жодному route, можна створити fallback route.

Наприклад:

    <Route
        path="*"
        element={<NotFound />}
    />

Тоді невідомий URL:

    /something-that-does-not-exist

може показати:

    <NotFound />

Детальніше:

    07-404-and-error-routes

---

# Wildcard Path

Знак:

    *

може використовуватися як wildcard.

Наприклад:

    <Route
        path="*"
        element={<NotFound />}
    />

Це типовий підхід для fallback / 404 route.

---

# Index Route

У nested routing існує поняття index route.

Наприклад:

    /dashboard

може бути index route для:

    /dashboard/profile
    /dashboard/settings

Приклад:

    <Route
        path="dashboard"
        element={<Dashboard />}
    >
        <Route
            index
            element={<DashboardHome />}
        />

        <Route
            path="profile"
            element={<Profile />}
        />
    </Route>

Index route буде показуватися для:

    /dashboard

Детальніше:

    04-nested-routes

---

# Router Placement

Часто `BrowserRouter` розміщують на верхньому рівні application.

Наприклад:

    import {
        BrowserRouter
    } from "react-router-dom";

    createRoot(
        document.getElementById("root")
    ).render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );

Тоді:

    App

і всі його дочірні компоненти мають доступ до router context.

---

# App Structure

Типова структура:

    src/
    ├── main.tsx
    ├── App.tsx
    └── pages/
        ├── HomePage.tsx
        ├── AboutPage.tsx
        └── ContactsPage.tsx

`main.tsx`:

    import {
        BrowserRouter
    } from "react-router-dom";

    import {
        createRoot
    } from "react-dom/client";

    import App from "./App";

    createRoot(
        document.getElementById("root")!
    ).render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );

`App.tsx`:

    import {
        Routes,
        Route
    } from "react-router-dom";

    import HomePage from "./pages/HomePage";
    import AboutPage from "./pages/AboutPage";
    import ContactsPage from "./pages/ContactsPage";

    function App() {
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
                    path="/contacts"
                    element={<ContactsPage />}
                />
            </Routes>
        );
    }

    export default App;

---

# Navigation + Routes

Повний базовий приклад:

    import {
        BrowserRouter,
        Routes,
        Route,
        NavLink
    } from "react-router-dom";

    function Home() {
        return <h1>Home</h1>;
    }

    function About() {
        return <h1>About</h1>;
    }

    function Products() {
        return <h1>Products</h1>;
    }

    function Navigation() {
        return (
            <nav>
                <NavLink to="/">
                    Home
                </NavLink>

                <NavLink to="/about">
                    About
                </NavLink>

                <NavLink to="/products">
                    Products
                </NavLink>
            </nav>
        );
    }

    function App() {
        return (
            <BrowserRouter>
                <Navigation />

                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/about"
                        element={<About />}
                    />

                    <Route
                        path="/products"
                        element={<Products />}
                    />
                </Routes>
            </BrowserRouter>
        );
    }

---

# Layout

Навіть у базовому routing корисно розділяти загальний layout та page content.

Наприклад:

    function Layout() {
        return (
            <>
                <header>
                    <Navigation />
                </header>

                <main>
                    ...
                </main>
            </>
        );
    }

У складніших application layout буде пов'язаний з nested routes та `<Outlet>`.

---

# React Router та React State

Routing і React state — різні поняття.

React state:

    useState()

зберігає application/component state.

React Router:

    BrowserRouter
    Routes
    Route
    Link

керує navigation та route state.

Наприклад:

    const [isOpen, setIsOpen] =
        useState(false);

це React state.

А:

    <Link to="/about">
        About
    </Link>

це navigation.

---

# URL як State

У web application URL часто можна розглядати як частину application state.

Наприклад:

    /products?page=2

містить:

    page = 2

А:

    /products/42

містить:

    product id = 42

Це дозволяє:

    bookmark
    share URL
    browser Back/Forward
    reload page

без втрати важливої інформації, яка представлена URL.

---

# Bookmarkable Routes

Хороший route повинен бути доступним безпосередньо через URL.

Наприклад:

    https://example.com/about

користувач може:

    відкрити URL
    оновити сторінку
    додати URL у bookmarks
    відправити URL іншому користувачу

і application повинна правильно обробити цей route.

---

# Direct Navigation

Користувач може перейти безпосередньо:

    /products

не натискаючи:

    Home
    ↓
    Products

Тому application повинна мати route:

    <Route
        path="/products"
        element={<Products />}
    />

---

# Refresh

При client-side navigation:

    /about
        ↓
    click Link
        ↓
    /contacts

React Router може змінити UI без повного reload.

Але якщо користувач безпосередньо відкриє:

    /contacts

сервер також повинен бути налаштований так, щоб SPA могла завантажитися для цього URL.

Це особливо важливо при deployment.

---

# Deployment Problem

Локально:

    /about

може працювати правильно.

А після deployment користувач відкриває:

    https://example.com/about

і сервер може спробувати знайти фізичний файл:

    /about

та повернути:

    404

Для SPA hosting часто потрібен fallback до:

    index.html

Конкретна конфігурація залежить від hosting platform.

---

# React Router не є Backend Router

React Router:

    client-side routing

Backend router, наприклад Express:

    app.get("/users", ...)
    app.post("/users", ...)

це server-side routing.

Не потрібно плутати:

    React Router
        → browser UI routes

та:

    Express Router
        → server/API routes

---

# React Router + API

Наприклад:

Frontend route:

    /users

може показувати:

    <UsersPage />

А API endpoint:

    /api/users

може повертати дані.

Схема:

    Browser
       │
       ├── /users
       │      ↓
       │   React Router
       │      ↓
       │   UsersPage
       │
       └── /api/users
              ↓
           Backend
              ↓
           JSON

Це різні рівні routing.

---

# Route vs API Endpoint

Не плутати:

    /products

та:

    /api/products

Перший може бути frontend route:

    /products
        → ProductsPage

Другий може бути API endpoint:

    /api/products
        → JSON data

---

# Типові помилки

❌ Використовувати `<a>` для всіх внутрішніх React Router routes.

Замість:

    <a href="/about">
        About
    </a>

для internal navigation зазвичай:

    <Link to="/about">
        About
    </Link>

---

❌ Використовувати `Link` поза Router.

Неправильно:

    function App() {
        return (
            <Link to="/about">
                About
            </Link>
        );
    }

Правильно:

    <BrowserRouter>
        <App />
    </BrowserRouter>

---

❌ Плутати `Route` та `Routes`.

    Routes
        → container / matching

    Route
        → individual route

---

❌ Плутати component та element.

    AboutPage
        → component

    <AboutPage />
        → element

У route:

    element={<AboutPage />}

---

❌ Використовувати `exact` у сучасному React Router без потреби.

У React Router v6+:

    <Route
        path="/"
        element={<Home />}
    />

---

❌ Використовувати React Router для API routing.

Frontend:

    React Router

Backend:

    Express / NestJS / інший server router

---

❌ Не враховувати direct navigation.

Користувач може відкрити:

    /products

без переходу з:

    /

Тому route повинен працювати без попереднього navigation.

---

❌ Забувати про server fallback під час deployment SPA.

Клієнтський router може правильно обробляти:

    /about

але web server повинен спочатку віддати React application.

---

❌ Створювати окремий router для кожного простого route.

Зазвичай достатньо одного верхньорівневого router:

    <BrowserRouter>
        <App />
    </BrowserRouter>

---

# Практичний приклад

Нехай є простий сайт:

    /
    /about
    /courses
    /contacts

Route configuration:

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
            path="/courses"
            element={<CoursesPage />}
        />

        <Route
            path="/contacts"
            element={<ContactsPage />}
        />
    </Routes>

Navigation:

    <nav>
        <NavLink to="/">
            Home
        </NavLink>

        <NavLink to="/about">
            About
        </NavLink>

        <NavLink to="/courses">
            Courses
        </NavLink>

        <NavLink to="/contacts">
            Contacts
        </NavLink>
    </nav>

---

# Практичний приклад — маленький сайт

    import {
        BrowserRouter,
        Routes,
        Route,
        NavLink
    } from "react-router-dom";

    function HomePage() {
        return (
            <h1>Home</h1>
        );
    }

    function AboutPage() {
        return (
            <h1>About</h1>
        );
    }

    function CoursesPage() {
        return (
            <h1>Courses</h1>
        );
    }

    function ContactsPage() {
        return (
            <h1>Contacts</h1>
        );
    }

    function Navigation() {
        return (
            <nav>
                <NavLink to="/">
                    Home
                </NavLink>

                <NavLink to="/about">
                    About
                </NavLink>

                <NavLink to="/courses">
                    Courses
                </NavLink>

                <NavLink to="/contacts">
                    Contacts
                </NavLink>
            </nav>
        );
    }

    function App() {
        return (
            <BrowserRouter>
                <Navigation />

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
                        path="/courses"
                        element={<CoursesPage />}
                    />

                    <Route
                        path="/contacts"
                        element={<ContactsPage />}
                    />
                </Routes>
            </BrowserRouter>
        );
    }

    export default App;

---

# Routing Mental Model

Корисно запам'ятати:

    URL
      ↓
    Router
      ↓
    Route matching
      ↓
    React element
      ↓
    Component
      ↓
    UI

Наприклад:

    /courses
       ↓
    BrowserRouter
       ↓
    <Route path="/courses">
       ↓
    <CoursesPage />
       ↓
    CoursesPage
       ↓
    UI

---

# Основна модель React Router

    BrowserRouter
        │
        ├── Navigation
        │      ├── Link
        │      └── NavLink
        │
        └── Routes
               │
               ├── Route /
               │      ↓
               │   HomePage
               │
               ├── Route /about
               │      ↓
               │   AboutPage
               │
               └── Route /products
                      ↓
                   ProductsPage

---

# Питання зі співбесіди

Що таке routing?

Що таке route?

Що таке router?

Що таке React Router?

Що таке SPA?

Що таке client-side routing?

Чим client-side routing відрізняється від server-side routing?

Що таке `BrowserRouter`?

Для чого потрібен `Routes`?

Для чого потрібен `Route`?

Що робить `path`?

Що робить `element`?

Як створити простий route?

Як створити root route?

Як створити кілька routes?

Що таке route matching?

Що таке navigation?

Що таке `Link`?

Що таке `NavLink`?

Чим `Link` відрізняється від `NavLink`?

Чим `<Link>` відрізняється від `<a>`?

Коли використовувати `<a>`?

Коли використовувати `<Link>`?

Що таке active route?

Що таке `isActive` у `NavLink`?

Чому `Link` повинен знаходитися всередині Router?

Що таке `pathname`?

Що таке URL?

Що таке static route?

Що таке dynamic route?

Що таке nested route?

Що таке query parameter?

Що таке wildcard route?

Що таке 404 route?

Що таке index route?

Що таке browser history?

Як React Router використовує History API?

Чи відбувається повне перезавантаження сторінки при navigation через `Link`?

Чим frontend route відрізняється від API endpoint?

Чому SPA може мати проблему з direct navigation після deployment?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке routing.

Що таке route.

Що таке router.

Що таке SPA.

Що таке client-side routing.

React Router.

`BrowserRouter`.

`Routes`.

`Route`.

`path`.

`element`.

Root route:

    /

Створення кількох routes.

Route matching.

Navigation.

`Link`.

`NavLink`.

`Link` vs `<a>`.

Active route.

Browser history.

Основи History API.

Основи static routes.

Основи wildcard route.

---

🔵 Junior

Впевнено створювати routing.

Організовувати navigation.

Використовувати:

    BrowserRouter
    Routes
    Route
    Link
    NavLink

Розуміти:

    pathname
    route matching
    client-side navigation
    browser history

Створювати:

    static routes
    404 routes
    navigation menus

Розуміти різницю між:

    frontend route
    API endpoint

Розуміти direct navigation.

Розуміти SPA deployment та fallback.

Розуміти основи:

    dynamic routes
    nested routes
    query parameters
    index routes

---

🟠 Middle

Route architecture.

Nested routing.

Layout routes.

Index routes.

Dynamic route parameters.

Query parameters.

Protected routes.

Route loaders / data APIs.

Error boundaries та error routes.

Lazy routes.

Code splitting.

Route-based code splitting.

Navigation state.

Programmatic navigation.

Redirects.

Relative routes.

Relative links.

Route configuration patterns.

Reusable navigation components.

Authentication-aware routing.

Authorization-aware routing.

---

🔴 Senior

Глибока архітектура routing.

Route tree design.

Large-scale route architecture.

Nested route boundaries.

Layout composition.

Route-level data loading.

Deferred data.

Error boundaries.

Streaming та data loading.

Route-based code splitting.

Performance optimization.

Prefetching.

Caching.

SSR routing.

SSG routing.

Hydration.

Server/client routing synchronization.

Authentication architecture.

Authorization architecture.

Permission-based routing.

Deep linking.

History API.

Browser navigation lifecycle.

Navigation race conditions.

Advanced route data patterns.

Routing architecture у великих SPA.

---

# Міні-шпаргалка

## BrowserRouter

    <BrowserRouter>
        <App />
    </BrowserRouter>

Router для browser application.

---

## Routes

    <Routes>
        ...
    </Routes>

Контейнер для routes та route matching.

---

## Route

    <Route
        path="/about"
        element={<AboutPage />}
    />

Відповідність:

    /about
        ↓
    AboutPage

---

## Root route

    <Route
        path="/"
        element={<HomePage />}
    />

---

## Link

    <Link to="/about">
        About
    </Link>

Внутрішня navigation.

---

## NavLink

    <NavLink to="/about">
        About
    </NavLink>

Navigation + active state.

---

## Link vs a

    <Link to="/about">
        About
    </Link>

для internal React Router navigation.

    <a href="https://example.com">
        External
    </a>

для external URL.

---

## Static route

    <Route
        path="/about"
        element={<About />}
    />

---

## Dynamic route

    <Route
        path="/products/:id"
        element={<ProductDetails />}
    />

Наприклад:

    /products/10

---

## Wildcard route

    <Route
        path="*"
        element={<NotFound />}
    />

---

## Index route

    <Route
        index
        element={<DashboardHome />}
    />

Використовується з nested routes.

---

## Navigation flow

    click Link
        ↓
    URL changes
        ↓
    route matching
        ↓
    new element
        ↓
    React render

---

## Routing flow

    URL
      ↓
    BrowserRouter
      ↓
    Routes
      ↓
    Route matching
      ↓
    element
      ↓
    Component
      ↓
    UI

---

# Основні правила

    BrowserRouter
        → provides router context

    Routes
        → contains routes

    Route
        → defines route

    path
        → URL pattern

    element
        → React UI for route

    Link
        → internal navigation

    NavLink
        → internal navigation + active state

    a
        → normal HTML/external navigation

---

# Що відбувається при переході

Наприклад:

    <Link to="/about">
        About
    </Link>

Користувач натискає:

    About

Далі приблизно:

    click
      ↓
    navigation
      ↓
    URL → /about
      ↓
    React Router
      ↓
    route matching
      ↓
    path="/about"
      ↓
    <AboutPage />
      ↓
    render

---

# Типова структура

    src/
    ├── main.tsx
    ├── App.tsx
    └── pages/
        ├── HomePage.tsx
        ├── AboutPage.tsx
        ├── ProductsPage.tsx
        └── ContactsPage.tsx

`main.tsx`:

    <BrowserRouter>
        <App />
    </BrowserRouter>

`App.tsx`:

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
            path="/products"
            element={<ProductsPage />}
        />

        <Route
            path="/contacts"
            element={<ContactsPage />}
        />
    </Routes>

---

# Головне:

• React Router дозволяє реалізувати routing у React application.

• Routing визначає, який UI показувати для певного URL.

• Route — правило відповідності URL та React UI.

• Router надає application routing context.

• `BrowserRouter` використовується для browser-based routing.

• `Routes` містить routes.

• `Route` описує конкретний route.

• `path` визначає URL pattern.

• `element` визначає React element, який потрібно показати.

• Root route зазвичай має:

    path="/"

• Внутрішня navigation зазвичай виконується через:

    <Link>

• Для navigation з active state зручно використовувати:

    <NavLink>

• Для зовнішніх URL використовується:

    <a>

• `Link` дозволяє виконувати client-side navigation без звичайного повного переходу документа.

• `NavLink` додатково дозволяє визначати active route.

• SPA може мати багато URL, хоча використовує один основний HTML document.

• React Router та backend router — різні речі.

• Frontend route:

    /products

може показувати:

    ProductsPage

• API endpoint:

    /api/products

може повертати:

    JSON

• Static route має фіксований path.

• Dynamic route може містити параметри:

    /products/:id

• Nested routes дозволяють будувати ієрархію URL та UI.

• Query parameters дозволяють передавати додаткові параметри через URL.

• Wildcard route:

    *

може використовуватися для fallback / 404.

• Index route використовується як default child route у nested routing.

• `BrowserRouter`, `Link`, `NavLink` та інші routing components повинні використовуватися в router context.

• При direct navigation користувач може одразу відкрити будь-який URL.

• При deployment SPA server повинен бути налаштований так, щоб невідомі frontend paths повертали application entry point.

• Основна модель:

    URL
      ↓
    BrowserRouter
      ↓
    Routes
      ↓
    route matching
      ↓
    Route
      ↓
    element
      ↓
    React component
      ↓
    UI

• Основна ідея React Router:

    URL → Route → Component → UI

• У наступних розділах routing поступово розширюється:

    01-routing-basics
          ↓
    02-navigation
          ↓
    03-route-parameters
          ↓
    04-nested-routes
          ↓
    05-query-parameters
          ↓
    06-protected-routes
          ↓
    07-404-and-error-routes
          ↓
    08-code-splitting
