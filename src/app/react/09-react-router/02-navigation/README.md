# 02. Navigation

Navigation — це процес переходу користувача між routes React-застосунку.

У React Router navigation використовується для:

- переходу між сторінками;
- зміни URL;
- побудови navigation menu;
- створення активних пунктів меню;
- програмного переходу;
- переходу назад і вперед;
- redirect;
- передачі state під час navigation;
- роботи з relative paths.

Основні інструменти navigation у React Router:

    <Link>
    <NavLink>
    useNavigate()
    navigate()
    useLocation()
    <Navigate>

---

# Ключові поняття

✔ navigation  
✔ client-side navigation  
✔ `<Link>`  
✔ `<NavLink>`  
✔ `to`  
✔ active link  
✔ `isActive`  
✔ `isPending`  
✔ `useNavigate()`  
✔ `navigate()`  
✔ programmatic navigation  
✔ relative navigation  
✔ absolute path  
✔ relative path  
✔ `replace`  
✔ navigation state  
✔ `useLocation()`  
✔ `<Navigate>`  
✔ redirect  
✔ browser history  
✔ Back  
✔ Forward  
✔ navigation menu  
✔ active route  
✔ pending navigation  

---

# Що потрібно пам'ятати

• Для звичайної внутрішньої navigation використовують `<Link>`.

• Для navigation з active state зручно використовувати `<NavLink>`.

• `to` визначає destination route.

• `useNavigate()` дозволяє виконати navigation програмно.

• `navigate("/about")` переходить на `/about`.

• `navigate(-1)` переходить назад в browser history.

• `navigate(1)` переходить вперед.

• `replace: true` замінює поточний history entry замість додавання нового.

• `<Navigate>` дозволяє виконати declarative navigation через React element.

• `useLocation()` дозволяє отримати інформацію про поточний location.

• Для внутрішніх routes краще використовувати React Router navigation, а не `window.location`.

• `<NavLink>` може визначати:

    isActive
    isPending

• Navigation змінює location, після чого React Router визначає відповідний route.

---

# Navigation Flow

Типовий navigation flow:

    user action
        ↓
    Link / NavLink / navigate()
        ↓
    URL changes
        ↓
    router detects location
        ↓
    route matching
        ↓
    new route
        ↓
    React renders UI

Наприклад:

    click
      ↓
    <Link to="/about">
      ↓
    /about
      ↓
    route matching
      ↓
    <AboutPage />

---

# Link

`Link` — основний компонент для внутрішньої navigation.

Імпорт:

    import { Link } from "react-router-dom";

Приклад:

    <Link to="/about">
        About
    </Link>

Користувач натискає:

    About

і переходить на:

    /about

---

# Простий Navigation

    import { Link } from "react-router-dom";

    function Navigation() {
        return (
            <nav>
                <Link to="/">
                    Home
                </Link>

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

# `to`

`to` визначає destination.

Наприклад:

    <Link to="/about">
        About
    </Link>

означає:

    current route
        ↓
    /about

---

# Link до Root

    <Link to="/">
        Home
    </Link>

Destination:

    /

---

# Link до Static Route

    <Link to="/about">
        About
    </Link>

Destination:

    /about

---

# Link до Products

    <Link to="/products">
        Products
    </Link>

Destination:

    /products

---

# Link до Dynamic Route

Якщо route:

    <Route
        path="/products/:id"
        element={<ProductDetails />}
    />

можна створити:

    <Link to="/products/42">
        Product 42
    </Link>

Destination:

    /products/42

---

# Link vs `<a>`

Для internal navigation:

    <Link to="/about">
        About
    </Link>

Для external navigation:

    <a href="https://example.com">
        External website
    </a>

---

# Чому Link кращий для Internal Navigation

Звичайний HTML:

    <a href="/about">
        About
    </a>

передає navigation браузеру як звичайний document navigation.

React Router:

    <Link to="/about">
        About
    </Link>

інтегрується з client-side router.

Тому для internal routes React Router application зазвичай використовує:

    Link
    NavLink

---

# NavLink

`NavLink` — спеціальний варіант `Link`, який знає, чи є destination active.

Імпорт:

    import {
        NavLink
    } from "react-router-dom";

Приклад:

    <NavLink to="/about">
        About
    </NavLink>

---

# Link vs NavLink

`Link`:

    <Link to="/about">
        About
    </Link>

Основне призначення:

    navigation

`NavLink`:

    <NavLink to="/about">
        About
    </NavLink>

Основне призначення:

    navigation
    +
    active state

---

# Active Link

Active link — navigation link, destination якого відповідає поточному route.

Наприклад:

    current URL:

    /about

і:

    <NavLink to="/about">
        About
    </NavLink>

є active.

---

# `isActive`

`NavLink` дозволяє отримати:

    isActive

через callback.

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

Якщо поточний route:

    /about

то:

    isActive === true

---

# Active Class

Поширений pattern:

    <NavLink
        to="/about"
        className={({ isActive }) =>
            isActive ? "active" : ""
        }
    >
        About
    </NavLink>

Можна стилізувати:

    .active {
        font-weight: 700;
    }

---

# Active Link з CSS Module

Наприклад:

    import styles from "./Navigation.module.css";

    <NavLink
        to="/about"
        className={({ isActive }) =>
            isActive
                ? styles.active
                : styles.link
        }
    >
        About
    </NavLink>

---

# Function як className

`className` у `NavLink` може бути функцією:

    className={({ isActive }) => {
        return isActive
            ? "active"
            : "link";
    }}

Або коротше:

    className={({ isActive }) =>
        isActive ? "active" : "link"
    }

---

# `isPending`

У navigation з сучасним React Router `NavLink` також може отримувати:

    isPending

Наприклад:

    <NavLink
        to="/about"
        className={({ isActive, isPending }) => {
            if (isPending) {
                return "pending";
            }

            if (isActive) {
                return "active";
            }

            return "link";
        }}
    >
        About
    </NavLink>

`isPending` дозволяє показати стан, коли navigation ще виконується.

Це особливо корисно у routing/data-loading сценаріях.

---

# Navigation Menu

Типовий navigation menu:

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

                <NavLink to="/contacts">
                    Contacts
                </NavLink>
            </nav>
        );
    }

---

# Active Navigation Menu

Наприклад:

    function Navigation() {
        return (
            <nav>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "active"
                            : undefined
                    }
                >
                    Home
                </NavLink>

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

                <NavLink
                    to="/products"
                    className={({ isActive }) =>
                        isActive
                            ? "active"
                            : undefined
                    }
                >
                    Products
                </NavLink>
            </nav>
        );
    }

---

# `end`

`NavLink` має проп `end`, який може бути важливим для точного active matching.

Наприклад:

    <NavLink
        to="/"
        end
    >
        Home
    </NavLink>

`end` означає, що link вважається active, коли destination є кінцевим matching path.

Це особливо корисно для root link:

    /

щоб він не залишався active на всіх інших routes.

---

# Root Link

Без `end`:

    <NavLink to="/">
        Home
    </NavLink>

У navigation menu це може створювати небажану поведінку active matching залежно від структури routes.

Часто краще:

    <NavLink
        to="/"
        end
    >
        Home
    </NavLink>

---

# `useNavigate`

`useNavigate()` — React Hook для programmatic navigation.

Імпорт:

    import {
        useNavigate
    } from "react-router-dom";

Приклад:

    function LoginPage() {
        const navigate = useNavigate();

        function handleLogin() {
            // login logic

            navigate("/dashboard");
        }

        return (
            <button onClick={handleLogin}>
                Login
            </button>
        );
    }

---

# Programmatic Navigation

Programmatic navigation — navigation, яке виконується кодом.

Наприклад:

    const navigate = useNavigate();

    navigate("/dashboard");

Замість:

    user clicks Link

маємо:

    event
      ↓
    function
      ↓
    navigate()
      ↓
    new route

---

# Коли потрібен `useNavigate`

`useNavigate()` корисний, коли navigation залежить від логіки.

Наприклад:

    login
    logout
    form submit
    save
    delete
    wizard
    conditional action

---

# Login Example

    function LoginPage() {
        const navigate = useNavigate();

        function handleLogin() {
            const success = true;

            if (success) {
                navigate("/dashboard");
            }
        }

        return (
            <button onClick={handleLogin}>
                Login
            </button>
        );
    }

Flow:

    click Login
        ↓
    login logic
        ↓
    success
        ↓
    navigate("/dashboard")
        ↓
    /dashboard

---

# Form Submit Navigation

    function CreateUser() {
        const navigate = useNavigate();

        function handleSubmit(event) {
            event.preventDefault();

            // save user

            navigate("/users");
        }

        return (
            <form onSubmit={handleSubmit}>
                <button type="submit">
                    Save
                </button>
            </form>
        );
    }

Після successful save:

    /users/new
        ↓
    /users

---

# Navigation після Delete

    function DeleteButton({ id }) {
        const navigate = useNavigate();

        function handleDelete() {
            // delete item

            navigate("/products");
        }

        return (
            <button onClick={handleDelete}>
                Delete
            </button>
        );
    }

---

# `navigate()` з Path

Найпростіший варіант:

    const navigate = useNavigate();

    navigate("/about");

---

# `navigate()` з Relative Path

Можна використовувати relative navigation.

Наприклад, якщо current route:

    /dashboard/settings

можна перейти relative:

    navigate("profile");

Результат залежить від поточного route context.

Для складних nested routes важливо розуміти різницю між:

    absolute path
    relative path

---

# Absolute Path

Path, який починається з:

    /

є absolute path.

Наприклад:

    navigate("/about");

або:

    <Link to="/about">
        About
    </Link>

Destination:

    /about

---

# Relative Path

Path без початкового `/` є relative.

Наприклад:

    <Link to="profile">
        Profile
    </Link>

або:

    navigate("profile");

У nested routing це означає navigation відносно поточного route context.

---

# Absolute vs Relative

    /about
        ↓
    absolute

    about
        ↓
    relative

Наприклад:

    <Link to="/products">
        Products
    </Link>

absolute.

А:

    <Link to="details">
        Details
    </Link>

може бути relative до поточного route.

---

# Navigation History

Кожна navigation може створювати новий history entry.

Наприклад:

    /
     ↓
    /about
     ↓
    /products

Browser history:

    /
    /about
    /products

Тоді Back:

    /products
        ↓
    /about

---

# navigate(-1)

Для переходу назад:

    navigate(-1);

Наприклад:

    function BackButton() {
        const navigate = useNavigate();

        return (
            <button
                onClick={() => navigate(-1)}
            >
                Back
            </button>
        );
    }

---

# navigate(1)

Для переходу вперед:

    navigate(1);

Наприклад:

    function ForwardButton() {
        const navigate = useNavigate();

        return (
            <button
                onClick={() => navigate(1)}
            >
                Forward
            </button>
        );
    }

---

# navigate(-2)

Можна перейти на кілька history entries назад:

    navigate(-2);

Аналогічно:

    navigate(2);

перейде на два entries вперед.

---

# Browser History Model

Наприклад:

    /home
       ↓
    /products
       ↓
    /products/10
       ↓
    /products/10/edit

History:

    /home
    /products
    /products/10
    /products/10/edit

`navigate(-1)`:

    /products/10

Ще один:

    navigate(-1)

отримаємо:

    /products

---

# `replace`

`navigate()` може приймати options.

Наприклад:

    navigate("/dashboard", {
        replace: true
    });

`replace` означає:

    замінити current history entry

замість:

    додати новий history entry

---

# push vs replace

Звичайна navigation:

    navigate("/about");

умовно:

    current
       ↓
    add new history entry

`replace`:

    navigate("/about", {
        replace: true
    });

означає:

    current
       ↓
    replace current history entry

---

# Коли використовувати replace

`replace` корисний, коли не потрібно, щоб користувач повертався до попереднього URL через Back.

Типові приклади:

    login
    logout
    redirect
    після завершення wizard
    після певних one-time actions

---

# Login з replace

    navigate("/dashboard", {
        replace: true
    });

Якщо користувач успішно залогінився, часто немає сенсу повертати його Back на:

    /login

---

# Redirect

Redirect — автоматичний перехід на інший route.

У React Router можна використовувати:

    <Navigate />

або:

    navigate()

залежно від задачі.

---

# Navigate Component

Імпорт:

    import {
        Navigate
    } from "react-router-dom";

Приклад:

    function ProtectedPage() {
        const isAuthenticated = false;

        if (!isAuthenticated) {
            return (
                <Navigate to="/login" />
            );
        }

        return <h1>Dashboard</h1>;
    }

---

# `<Navigate>` vs `navigate()`

`<Navigate>`:

    <Navigate to="/login" />

це declarative navigation.

`navigate()`:

    const navigate = useNavigate();

    navigate("/login");

це programmatic navigation.

---

# Declarative vs Programmatic

Declarative:

    if (!isAuthenticated) {
        return (
            <Navigate to="/login" />
        );
    }

Programmatic:

    if (!isAuthenticated) {
        navigate("/login");
    }

Програмний `navigate()` зазвичай використовується всередині event handler або іншої логіки, тоді як `<Navigate>` — як React element у render flow.

---

# `useLocation`

`useLocation()` дозволяє отримати інформацію про поточний location.

Імпорт:

    import {
        useLocation
    } from "react-router-dom";

Приклад:

    function CurrentLocation() {
        const location = useLocation();

        console.log(location);

        return (
            <p>
                {location.pathname}
            </p>
        );
    }

---

# Location Object

`location` містить інформацію про поточний URL/location.

Наприклад:

    const location = useLocation();

Можна отримати:

    location.pathname
    location.search
    location.hash
    location.state
    location.key

---

# pathname

Наприклад URL:

    /products/42?sort=price#reviews

має:

    pathname
        → /products/42

    search
        → ?sort=price

    hash
        → #reviews

---

# search

Для URL:

    /products?page=2

отримуємо:

    location.search

результат:

    "?page=2"

Для роботи з query parameters пізніше використовується спеціалізований API.

---

# hash

Для URL:

    /about#team

отримуємо:

    location.hash

результат:

    "#team"

---

# location.state

Navigation може передавати state.

Наприклад:

    navigate("/products", {
        state: {
            from: "home"
        }
    });

На destination можна отримати:

    const location = useLocation();

    console.log(location.state);

Результат:

    {
        from: "home"
    }

---

# Link з state

State можна передати і через `Link`.

    <Link
        to="/products"
        state={{
            from: "home"
        }}
    >
        Products
    </Link>

Destination:

    const location = useLocation();

    console.log(location.state);

---

# Navigation State

Navigation state — додаткові дані, які передаються під час navigation.

Наприклад:

    <Link
        to="/details"
        state={{
            from: "products"
        }}
    >
        Details
    </Link>

На destination:

    const location = useLocation();

    console.log(location.state.from);

---

# Важливо про location.state

`location.state` — це не те саме, що:

    URL parameter

або:

    query parameter

Наприклад:

    /products/42

містить параметр у URL.

А:

    state={{
        from: "home"
    }}

передає navigation state.

Navigation state не є частиною URL.

---

# Link з Object

`to` може бути не тільки string.

Наприклад:

    <Link
        to={{
            pathname: "/products",
            search: "?page=2"
        }}
    >
        Products
    </Link>

Це дозволяє описувати destination структуровано.

---

# Link з State

Наприклад:

    <Link
        to="/products"
        state={{
            category: "books"
        }}
    >
        Books
    </Link>

---

# Link з Replace

`Link` також може виконувати navigation з replace behavior.

    <Link
        to="/dashboard"
        replace
    >
        Dashboard
    </Link>

Це означає:

    replace current history entry

---

# Link з Relative

У nested routes можна використовувати:

    <Link to="profile">
        Profile
    </Link>

замість:

    <Link to="/dashboard/profile">
        Profile
    </Link>

Relative navigation особливо корисна при nested routing.

---

# Link з `..`

У nested routes:

    <Link to="..">
        Back
    </Link>

може виконати navigation до parent route.

Це корисно для nested UI.

---

# Navigation Buttons

Іноді користувач очікує кнопку, а не посилання.

Наприклад:

    <button
        onClick={() => navigate("/dashboard")}
    >
        Go to dashboard
    </button>

Але якщо дія просто є navigation, семантично часто краще:

    <Link to="/dashboard">
        Go to dashboard
    </Link>

Правило:

    navigation
        → Link

    action + navigation logic
        → navigate()

---

# Не робити так без потреби

Не варто робити:

    <button
        onClick={() => {
            window.location.href = "/about";
        }}
    >
        About
    </button>

Для internal React Router navigation краще:

    <Link to="/about">
        About
    </Link>

або, якщо navigation залежить від логіки:

    navigate("/about");

---

# `window.location`

Браузерний API:

    window.location

можна використовувати для повної browser navigation.

Наприклад:

    window.location.href = "/about";

Але для звичайної internal navigation у React Router application краще використовувати:

    Link
    NavLink
    navigate()

---

# Navigation після Action

Типовий сценарій:

    user action
        ↓
    API request
        ↓
    success
        ↓
    navigate("/success")

Наприклад:

    async function handleSubmit() {
        const response = await saveUser();

        if (response.ok) {
            navigate("/users");
        }
    }

---

# Navigation після Login

    async function handleLogin() {
        const success = await login();

        if (success) {
            navigate("/dashboard", {
                replace: true
            });
        }
    }

---

# Navigation після Logout

Наприклад:

    function LogoutButton() {
        const navigate = useNavigate();

        function handleLogout() {
            logout();

            navigate("/login", {
                replace: true
            });
        }

        return (
            <button onClick={handleLogout}>
                Logout
            </button>
        );
    }

---

# Navigation після Save

    async function handleSave() {
        await saveProduct();

        navigate("/products");
    }

Flow:

    edit form
       ↓
    save
       ↓
    success
       ↓
    /products

---

# Navigation після Delete

    async function handleDelete() {
        await deleteProduct(id);

        navigate("/products");
    }

---

# Navigation після Error

Наприклад:

    async function handleAction() {
        try {
            await action();

            navigate("/success");
        } catch {
            navigate("/error");
        }
    }

У реальному application error handling краще організовувати уважніше, але navigation після action — поширений pattern.

---

# Navigation Guard

Navigation guard — логіка, яка визначає, чи може користувач перейти до route.

Наприклад:

    authenticated
        ↓
    /dashboard

    not authenticated
        ↓
    /login

Це стане основою для:

    06-protected-routes

---

# Protected Navigation

У спрощеному вигляді:

    function Dashboard() {
        const isAuthenticated = true;

        if (!isAuthenticated) {
            return (
                <Navigate
                    to="/login"
                    replace
                />
            );
        }

        return <h1>Dashboard</h1>;
    }

---

# Navigation та Authentication

Типовий flow:

    user
      ↓
    /dashboard
      ↓
    authenticated?
      ↓
    yes ─────→ Dashboard
      │
    no
      ↓
    /login

Після login:

    /login
      ↓
    successful login
      ↓
    /dashboard

---

# Back Navigation

Власна кнопка Back:

    function BackButton() {
        const navigate = useNavigate();

        return (
            <button
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>
        );
    }

---

# Forward Navigation

    function ForwardButton() {
        const navigate = useNavigate();

        return (
            <button
                onClick={() => navigate(1)}
            >
                Forward →
            </button>
        );
    }

---

# Navigation Utility Component

Можна створити reusable component:

    function BackButton() {
        const navigate = useNavigate();

        return (
            <button
                type="button"
                onClick={() => navigate(-1)}
            >
                Back
            </button>
        );
    }

---

# Navigation Layout

Типовий layout:

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

У складнішій routing architecture navigation буде частиною layout route.

---

# Navigation Menu з даними

Для великого menu можна зберігати navigation items як дані.

    const navigationItems = [
        {
            to: "/",
            label: "Home"
        },
        {
            to: "/about",
            label: "About"
        },
        {
            to: "/products",
            label: "Products"
        }
    ];

Потім:

    function Navigation() {
        return (
            <nav>
                {navigationItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        );
    }

Це дозволяє не дублювати однаковий navigation markup.

---

# Navigation Data Pattern

Наприклад:

    const navigationItems = [
        {
            to: "/",
            label: "Home"
        },
        {
            to: "/about",
            label: "About"
        },
        {
            to: "/courses",
            label: "Courses"
        },
        {
            to: "/contacts",
            label: "Contacts"
        }
    ];

    function Navigation() {
        return (
            <nav>
                {navigationItems.map(
                    ({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                        >
                            {label}
                        </NavLink>
                    )
                )}
            </nav>
        );
    }

---

# Active Navigation Data Pattern

    function Navigation() {
        return (
            <nav>
                {navigationItems.map(
                    ({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                isActive
                                    ? "active"
                                    : undefined
                            }
                        >
                            {label}
                        </NavLink>
                    )
                )}
            </nav>
        );
    }

---

# Navigation Accessibility

Navigation повинен бути зрозумілим для користувача та assistive technologies.

Для основного navigation menu корисно використовувати:

    <nav>

Наприклад:

    <nav aria-label="Main navigation">
        <NavLink to="/">
            Home
        </NavLink>

        <NavLink to="/about">
            About
        </NavLink>
    </nav>

---

# Link vs Button

Важливе правило:

    Link
        → перейти за URL

    button
        → виконати action

Наприклад:

    <Link to="/profile">
        Profile
    </Link>

це navigation.

А:

    <button onClick={handleDelete}>
        Delete
    </button>

це action.

Якщо після action потрібно перейти:

    handleDelete()
        ↓
    navigate("/products")

---

# Navigation and Browser Back

Якщо користувач переходить:

    /
      ↓
    /products
      ↓
    /products/10

натискання Back:

    /products/10
          ↓
    /products
          ↓
    /

React Router інтегрується з browser history, тому navigation може працювати разом із кнопками браузера:

    Back
    Forward

---

# Navigation and Reload

Client-side navigation:

    <Link to="/about">

не означає повний document reload.

Але browser refresh:

    F5

або:

    Ctrl + R

завантажує application заново.

Після цього router читає поточний URL та визначає відповідний route.

---

# Navigation and URL

Navigation завжди пов'язана з location.

Наприклад:

    current:

    /products

натискаємо:

    <Link to="/about">

отримуємо:

    /about

Після зміни location React Router повторно виконує route matching.

---

# Типові помилки

❌ Використовувати `<a>` замість `<Link>` для внутрішньої navigation.

    <a href="/about">
        About
    </a>

Краще:

    <Link to="/about">
        About
    </Link>

---

❌ Використовувати `navigate()` для звичайного текстового navigation link.

Замість:

    <button
        onClick={() => navigate("/about")}
    >
        About
    </button>

часто краще:

    <Link to="/about">
        About
    </Link>

---

❌ Використовувати `window.location.href` для звичайного internal route.

Замість:

    window.location.href = "/about";

краще:

    navigate("/about");

або:

    <Link to="/about">
        About
    </Link>

---

❌ Викликати `useNavigate()` поза React component.

Неправильно:

    const navigate = useNavigate();

поза component.

Правильно:

    function Component() {
        const navigate = useNavigate();

        ...
    }

---

❌ Викликати navigation під час render без потреби.

Не варто бездумно робити:

    function Component() {
        const navigate = useNavigate();

        navigate("/login");

        return null;
    }

Для declarative redirect краще:

    return (
        <Navigate
            to="/login"
            replace
        />
    );

А programmatic navigation виконувати в event handler або відповідній effect/logic.

---

❌ Плутати absolute та relative paths.

    /products
        → absolute

    products
        → relative

---

❌ Забувати про `replace`.

Наприклад, після login:

    navigate("/dashboard");

може залишити:

    /login

у history.

Якщо це небажано:

    navigate("/dashboard", {
        replace: true
    });

---

❌ Неправильно використовувати `NavLink` для root route.

Можна отримати небажаний active state.

Часто:

    <NavLink
        to="/"
        end
    >
        Home
    </NavLink>

---

❌ Зберігати критично важливі дані тільки в `location.state`.

Наприклад:

    state={{
        userId: 42
    }}

не є хорошою заміною URL parameter, якщо `userId` повинен бути доступний через URL.

Якщо інформація повинна бути частиною адреси:

    /users/42

краще використовувати route parameter.

---

# Практичні приклади

## Приклад 1 — простий Link

    import { Link } from "react-router-dom";

    function HomePage() {
        return (
            <div>
                <h1>Home</h1>

                <Link to="/about">
                    About
                </Link>
            </div>
        );
    }

---

## Приклад 2 — Navigation

    import { NavLink } from "react-router-dom";

    function Navigation() {
        return (
            <nav>
                <NavLink
                    to="/"
                    end
                >
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

## Приклад 3 — Active class

    <NavLink
        to="/products"
        className={({ isActive }) =>
            isActive
                ? "active"
                : "link"
        }
    >
        Products
    </NavLink>

---

## Приклад 4 — Programmatic navigation

    import {
        useNavigate
    } from "react-router-dom";

    function LoginButton() {
        const navigate = useNavigate();

        function handleLogin() {
            navigate("/dashboard");
        }

        return (
            <button onClick={handleLogin}>
                Login
            </button>
        );
    }

---

## Приклад 5 — Navigation після submit

    function Form() {
        const navigate = useNavigate();

        function handleSubmit(event) {
            event.preventDefault();

            // save data

            navigate("/success");
        }

        return (
            <form onSubmit={handleSubmit}>
                <button type="submit">
                    Save
                </button>
            </form>
        );
    }

---

## Приклад 6 — Back

    function BackButton() {
        const navigate = useNavigate();

        return (
            <button
                onClick={() => navigate(-1)}
            >
                Back
            </button>
        );
    }

---

## Приклад 7 — Replace

    navigate("/dashboard", {
        replace: true
    });

---

## Приклад 8 — Navigate

    import {
        Navigate
    } from "react-router-dom";

    function ProtectedPage() {
        const isAuthenticated = false;

        if (!isAuthenticated) {
            return (
                <Navigate
                    to="/login"
                    replace
                />
            );
        }

        return <h1>Dashboard</h1>;
    }

---

## Приклад 9 — Location

    import {
        useLocation
    } from "react-router-dom";

    function CurrentPath() {
        const location = useLocation();

        return (
            <p>
                Current path:
                {" "}
                {location.pathname}
            </p>
        );
    }

---

## Приклад 10 — Link state

    <Link
        to="/products"
        state={{
            from: "home"
        }}
    >
        Products
    </Link>

На destination:

    const location = useLocation();

    console.log(location.state);

---

## Приклад 11 — Navigate state

    navigate("/products", {
        state: {
            from: "dashboard"
        }
    });

---

## Приклад 12 — Relative Link

    <Link to="profile">
        Profile
    </Link>

У nested route це може вести до child route:

    /dashboard/profile

---

## Приклад 13 — Parent route

    <Link to="..">
        Back
    </Link>

Може вести до parent route у nested routing.

---

## Приклад 14 — Navigation menu з масиву

    const items = [
        {
            to: "/",
            label: "Home"
        },
        {
            to: "/about",
            label: "About"
        },
        {
            to: "/products",
            label: "Products"
        }
    ];

    function Navigation() {
        return (
            <nav>
                {items.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        );
    }

---

# Практична структура application

    src/
    ├── app/
    │   └── router/
    │       └── AppRouter.tsx
    │
    ├── components/
    │   └── Navigation/
    │       ├── Navigation.tsx
    │       └── Navigation.module.css
    │
    └── pages/
        ├── HomePage.tsx
        ├── AboutPage.tsx
        ├── ProductsPage.tsx
        └── ContactsPage.tsx

Navigation:

    function Navigation() {
        return (
            <nav>
                <NavLink
                    to="/"
                    end
                >
                    Home
                </NavLink>

                <NavLink to="/about">
                    About
                </NavLink>

                <NavLink to="/products">
                    Products
                </NavLink>

                <NavLink to="/contacts">
                    Contacts
                </NavLink>
            </nav>
        );
    }

Router:

    function AppRouter() {
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
                    path="/products"
                    element={<ProductsPage />}
                />

                <Route
                    path="/contacts"
                    element={<ContactsPage />}
                />
            </Routes>
        );
    }

---

# Navigation Mental Model

Для звичайного посилання:

    <Link to="/about">
        About
    </Link>

модель:

    Link
      ↓
    navigation
      ↓
    location
      ↓
    route matching
      ↓
    route
      ↓
    component

---

Для active link:

    <NavLink to="/about">
        About
    </NavLink>

модель:

    NavLink
       ↓
    navigation
       ↓
    location
       ↓
    isActive
       ↓
    active UI

---

Для programmatic navigation:

    navigate("/about");

модель:

    event / logic
        ↓
    navigate()
        ↓
    location
        ↓
    route matching
        ↓
    component
        ↓
    UI

---

# Link vs NavLink vs navigate vs Navigate

Це одна з найважливіших шпаргалок.

    Link
        ↓
    звичайна internal navigation

    NavLink
        ↓
    navigation + active state

    navigate()
        ↓
    programmatic navigation

    <Navigate />
        ↓
    declarative redirect/navigation

---

# Таблиця

| Інструмент | Призначення |
|---|---|
| `Link` | звичайна internal navigation |
| `NavLink` | navigation + active state |
| `useNavigate()` | отримати `navigate()` |
| `navigate()` | programmatic navigation |
| `<Navigate>` | declarative navigation / redirect |
| `useLocation()` | отримати current location |
| `<a>` | HTML navigation / external URL |

---

# Питання зі співбесіди

Що таке navigation?

Що таке client-side navigation?

Що таке `<Link>`?

Для чого потрібен `to`?

Чим `<Link>` відрізняється від `<a>`?

Що таке `<NavLink>`?

Чим `NavLink` відрізняється від `Link`?

Що таке active link?

Що таке `isActive`?

Що таке `isPending`?

Для чого потрібен `end`?

Що таке `useNavigate()`?

Що повертає `useNavigate()`?

Як виконати programmatic navigation?

Як перейти назад?

Що робить:

    navigate(-1)

Що робить:

    navigate(1)

Що таке `replace`?

Чим navigation з `replace` відрізняється від звичайної navigation?

Коли використовувати `replace: true`?

Що таке `<Navigate>`?

Чим `<Navigate>` відрізняється від `navigate()`?

Що таке `useLocation()`?

Що таке `location.pathname`?

Що таке `location.search`?

Що таке `location.hash`?

Що таке `location.state`?

Як передати state через `<Link>`?

Як передати state через `navigate()`?

Чим absolute path відрізняється від relative path?

Що означає:

    /products

і:

    products

Як створити active navigation menu?

Коли краще використовувати `Link`, а коли `navigate()`?

Чому не варто використовувати `window.location.href` для звичайної internal navigation?

Як працює browser Back разом із React Router?

---

# Шлях

🟢 Core (обов'язково знати)

`Link`.

`NavLink`.

`to`.

Internal navigation.

`Link` vs `<a>`.

Active link.

`isActive`.

`end`.

`useNavigate()`.

`navigate()`.

Programmatic navigation.

`navigate(-1)`.

`navigate(1)`.

`replace`.

Basic navigation menu.

Browser history.

---

🔵 Junior

Впевнено створювати navigation menu.

Використовувати:

    Link
    NavLink
    useNavigate
    Navigate
    useLocation

Розуміти:

    active route
    active link
    browser history
    push navigation
    replace navigation

Вміти:

    navigate after form submit
    navigate after login
    navigate after logout
    navigate after save
    navigate after delete

Розуміти:

    absolute paths
    relative paths

Вміти передавати:

    navigation state

Розуміти:

    location.pathname
    location.search
    location.hash
    location.state

Будувати reusable navigation components.

---

🟠 Middle

Complex navigation flows.

Nested navigation.

Relative navigation.

Navigation state architecture.

Authentication redirects.

Protected navigation.

Return-to URL patterns.

Preserving intended destination.

Navigation guards.

Pending navigation states.

Loading UI.

Error navigation.

Route-based layouts.

Reusable navigation abstractions.

Navigation after mutations.

History management.

Programmatic redirects.

Advanced `NavLink` patterns.

---

🔴 Senior

Routing architecture у великих SPA.

Navigation state architecture.

Authentication flow architecture.

Authorization flow.

Permission-aware navigation.

Deep linking.

History management.

Navigation race conditions.

Concurrent navigation.

Data-aware navigation.

Prefetching.

Pending UI.

Optimistic navigation.

Navigation cancellation.

SSR navigation.

Hydration.

Server/client navigation synchronization.

Advanced route transitions.

Performance of large navigation trees.

Accessibility navigation architecture.

---

# Міні-шпаргалка

## Link

    <Link to="/about">
        About
    </Link>

Internal navigation.

---

## NavLink

    <NavLink to="/about">
        About
    </NavLink>

Navigation + active state.

---

## Active

    <NavLink
        to="/about"
        className={({ isActive }) =>
            isActive
                ? "active"
                : "link"
        }
    >
        About
    </NavLink>

---

## Root NavLink

    <NavLink
        to="/"
        end
    >
        Home
    </NavLink>

---

## useNavigate

    const navigate = useNavigate();

---

## navigate

    navigate("/about");

Programmatic navigation.

---

## Back

    navigate(-1);

---

## Forward

    navigate(1);

---

## Replace

    navigate("/dashboard", {
        replace: true
    });

---

## Navigate

    <Navigate
        to="/login"
        replace
    />

Declarative navigation / redirect.

---

## useLocation

    const location = useLocation();

    location.pathname
    location.search
    location.hash
    location.state

---

## Absolute path

    /about

---

## Relative path

    about

---

## Link state

    <Link
        to="/products"
        state={{
            from: "home"
        }}
    >
        Products
    </Link>

---

## Navigate state

    navigate("/products", {
        state: {
            from: "home"
        }
    });

---

# Основні правила

    Link
        → normal internal navigation

    NavLink
        → internal navigation + active state

    navigate()
        → programmatic navigation

    <Navigate />
        → declarative navigation / redirect

    useLocation()
        → current location

    <a>
        → normal HTML / external navigation

---

# Navigation Decision Tree

Якщо користувач просто хоче перейти на інший route:

    Link

Якщо потрібно показати active state:

    NavLink

Якщо navigation виконується після action:

    navigate()

Якщо потрібно виконати redirect через render:

    <Navigate />

Якщо потрібно прочитати current URL:

    useLocation()

---

# Головне:

• Navigation — це процес переходу між routes.

• Для звичайної internal navigation використовують:

    <Link>

• Для navigation з active state використовують:

    <NavLink>

• `to` визначає destination.

• `NavLink` дозволяє визначати:

    isActive
    isPending

• `end` корисний для точного matching, особливо для root link:

    <NavLink to="/" end>

• `useNavigate()` повертає функцію:

    navigate()

• `navigate("/about")` виконує programmatic navigation.

• `navigate(-1)` переходить назад.

• `navigate(1)` переходить вперед.

• `replace: true` замінює поточний history entry.

• `<Navigate>` використовується для declarative navigation та redirects.

• `useLocation()` дозволяє отримати поточний location.

• Основні властивості location:

    pathname
    search
    hash
    state
    key

• `location.pathname` — path поточного URL.

• `location.search` — query string.

• `location.hash` — hash fragment.

• `location.state` — navigation state, переданий під час переходу.

• Navigation state не є частиною URL.

• Absolute path починається з:

    /

• Relative path не починається з:

    /

• У navigation menu часто використовують:

    NavLink

• Для navigation після login, save, delete або form submit часто використовується:

    navigate()

• Якщо navigation просто відкриває route, краще використовувати:

    Link

а не:

    button + navigate()

• Якщо дія виконує бізнес-логіку, після якої потрібен перехід, можна використовувати:

    navigate()

• Для internal React Router navigation не варто без потреби використовувати:

    window.location.href

• Для external URL використовується:

    <a>

• Основна модель:

    Link
      ↓
    navigation
      ↓
    location
      ↓
    route matching
      ↓
    UI

• Programmatic navigation:

    event
      ↓
    logic
      ↓
    navigate()
      ↓
    location
      ↓
    route
      ↓
    UI

• Основна різниця:

    Link
        → navigation

    NavLink
        → navigation + active state

    navigate()
        → programmatic navigation

    <Navigate />
        → declarative navigation

    useLocation()
        → read current location

• Navigation тісно пов'язана з browser history:

    /
     ↓
    /about
     ↓
    /products

    navigate(-1)
        ↓
    /about

• React Router navigation дозволяє будувати SPA, у якій URL, browser history та React UI працюють разом.
