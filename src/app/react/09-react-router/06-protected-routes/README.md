# 🔐 Protected Routes у React Router

> 📁 `react/09-react-router/06-protected-routes`

## 📚 Зміст

- [1. Що таке Protected Routes](#1-що-таке-protected-routes)
- [2. Навіщо потрібні захищені маршрути](#2-навіщо-потрібні-захищені-маршрути)
- [3. Authentication та Authorization](#3-authentication-та-authorization)
- [4. Публічні та захищені маршрути](#4-публічні-та-захищені-маршрути)
- [5. Найпростіший Protected Route](#5-найпростіший-protected-route)
- [6. `Navigate` та перенаправлення](#6-navigate-та-перенаправлення)
- [7. `useLocation` і повернення після Login](#7-uselocation-і-повернення-після-login)
- [8. `RequireAuth` як окремий компонент](#8-requireauth-як-окремий-компонент)
- [9. Protected Routes у структурі Router](#9-protected-routes-у-структурі-router)
- [10. Auth Context](#10-auth-context)
- [11. `useAuth` custom hook](#11-useauth-custom-hook)
- [12. Login → Protected Page](#12-login--protected-page)
- [13. Logout](#13-logout)
- [14. Redirect після Login](#14-redirect-після-login)
- [15. `replace` при Redirect](#15-replace-при-redirect)
- [16. Public Only Routes](#16-public-only-routes)
- [17. Protected Layout](#17-protected-layout)
- [18. Nested Protected Routes](#18-nested-protected-routes)
- [19. Ролі користувачів](#19-ролі-користувачів)
- [20. Role-Based Access Control](#20-role-based-access-control)
- [21. `RequireRole`](#21-requirerole)
- [22. Authentication через Backend](#22-authentication-через-backend)
- [23. Cookie / Session Authentication](#23-cookie--session-authentication)
- [24. JWT Authentication](#24-jwt-authentication)
- [25. Важливе правило безпеки](#25-важливе-правило-безпеки)
- [26. Loading State під час перевірки Auth](#26-loading-state-під-час-перевірки-auth)
- [27. Типовий Auth Flow](#27-типовий-auth-flow)
- [28. TypeScript](#28-typescript)
- [29. Типові помилки](#29-типові-помилки)
- [30. Protected Routes та API](#30-protected-routes-та-api)
- [31. Protected Routes ≠ Security](#31-protected-routes--security)
- [32. Практична структура проєкту](#32-практична-структура-проєкту)
- [33. Що потрібно знати Junior](#33-що-потрібно-знати-junior)
- [34. Питання на співбесіді](#34-питання-на-співбесіді)
- [35. Міні-шпаргалка](#35-міні-шпаргалка)
- [36. Головне](#36-головне)

---

# 1. Що таке Protected Routes

**Protected Route** — це маршрут, доступ до якого дозволений тільки користувачеві, який відповідає певній умові.

Найчастіше умова:

> користувач повинен бути авторизований.

Наприклад:

    /login
    /register
    /about

можуть бути доступні всім.

А:

    /dashboard
    /profile
    /settings
    /admin

можуть бути доступні тільки авторизованим користувачам.

Схематично:

    User
      │
      ▼
    Route
      │
      ├── authenticated? ──► YES ──► Protected Page
      │
      └── NO ──────────────► Login

---

# 2. Навіщо потрібні захищені маршрути

У реальному застосунку різні сторінки мають різний рівень доступу.

Наприклад:

    /                    → Home
    /about               → About
    /login               → Login
    /register            → Register

    /dashboard           → тільки authenticated
    /profile             → тільки authenticated
    /settings            → тільки authenticated

    /admin               → тільки admin

Без перевірки користувач міг би просто ввести URL:

    http://localhost:3000/admin

і React показав би сторінку.

Тому перед відображенням Protected Page ми перевіряємо:

    Чи має користувач право знаходитися на цьому маршруті?

---

# 3. Authentication та Authorization

Це два різних поняття.

## Authentication

**Authentication** — перевірка:

> Хто ти?

Наприклад:

    email + password

або:

    session cookie
    JWT
    OAuth

Після успішної authentication система знає:

    user = {
        id: 123,
        email: "user@example.com"
    }

---

## Authorization

**Authorization** — перевірка:

> Що тобі дозволено?

Наприклад:

    user
    moderator
    admin

Користувач може бути authenticated, але не мати доступу до:

    /admin

Тобто:

    Authentication
        ↓
    Хто користувач?

    Authorization
        ↓
    Що користувач може робити?

---

# 4. Публічні та захищені маршрути

Типова структура:

    Public Routes

    /
    /about
    /login
    /register

    Protected Routes

    /dashboard
    /profile
    /settings

    Admin Routes

    /admin
    /admin/users
    /admin/settings

Можна уявити три рівні:

    PUBLIC
       ↓
    AUTHENTICATED
       ↓
    AUTHORIZED

---

# 5. Найпростіший Protected Route

Розглянемо найпростіший варіант.

Припустимо, у нас є:

    const isAuthenticated = true;

Створюємо компонент:

    import { Navigate } from "react-router-dom";

    type ProtectedRouteProps = {
        isAuthenticated: boolean;
        children: React.ReactNode;
    };

    export function ProtectedRoute({
        isAuthenticated,
        children,
    }: ProtectedRouteProps) {
        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        }

        return children;
    }

Тепер:

    <ProtectedRoute isAuthenticated={isAuthenticated}>
        <Dashboard />
    </ProtectedRoute>

Якщо:

    isAuthenticated === true

отримаємо:

    <Dashboard />

Якщо:

    isAuthenticated === false

отримаємо:

    <Navigate to="/login" />

---

# 6. `Navigate` та перенаправлення

`Navigate` дозволяє декларативно перенаправити користувача на інший маршрут.

    import { Navigate } from "react-router-dom";

    <Navigate to="/login" />

Це означає:

> Перейди на `/login`.

Наприклад:

    function ProtectedRoute({
        isAuthenticated,
        children,
    }: ProtectedRouteProps) {
        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        }

        return children;
    }

---

## `Navigate` як умова

Можна думати про це так:

    if (!isAuthenticated) {
        redirect to /login
    }

У React Router:

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

---

# 7. `useLocation` і повернення після Login

Є важлива проблема.

Користувач хотів:

    /dashboard

але неавторизований.

Ми відправляємо його:

    /login

Після Login було б зручно повернути його саме на:

    /dashboard

Для цього можна зберегти попередній location.

    import { Navigate, useLocation } from "react-router-dom";

    function ProtectedRoute({
        isAuthenticated,
        children,
    }: ProtectedRouteProps) {
        const location = useLocation();

        if (!isAuthenticated) {
            return (
                <Navigate
                    to="/login"
                    state={{ from: location }}
                />
            );
        }

        return children;
    }

Тепер `Login` може отримати інформацію:

    state.from

---

# 8. `RequireAuth` як окремий компонент

На практиці часто використовують назву:

    RequireAuth

або:

    ProtectedRoute

Обидві назви нормальні.

Наприклад:

    function RequireAuth({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const { user } = useAuth();
        const location = useLocation();

        if (!user) {
            return (
                <Navigate
                    to="/login"
                    state={{ from: location }}
                    replace
                />
            );
        }

        return children;
    }

Цей компонент стає своєрідним "охоронцем" маршруту.

---

# 9. Protected Routes у структурі Router

Наприклад:

    import { Routes, Route } from "react-router-dom";

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />

        <Route
            path="/dashboard"
            element={
                <RequireAuth>
                    <Dashboard />
                </RequireAuth>
            }
        />

        <Route
            path="/profile"
            element={
                <RequireAuth>
                    <Profile />
                </RequireAuth>
            }
        />
    </Routes>

Тут:

    /
    /about
    /login

public.

А:

    /dashboard
    /profile

protected.

---

# 10. Auth Context

У реальному застосунку не дуже зручно передавати:

    isAuthenticated

через props у кожен компонент.

Наприклад:

    <ProtectedRoute
        isAuthenticated={isAuthenticated}
    >

Краще створити глобальний auth state.

Для цього часто використовують:

    React Context

Наприклад:

    type User = {
        id: string;
        email: string;
    };

    type AuthContextValue = {
        user: User | null;
        login: (user: User) => void;
        logout: () => void;
    };

---

# 11. `useAuth` custom hook

Створюємо Context:

    import { createContext, useContext } from "react";

    type User = {
        id: string;
        email: string;
    };

    type AuthContextValue = {
        user: User | null;
        login: (user: User) => void;
        logout: () => void;
    };

    const AuthContext = createContext<AuthContextValue | null>(null);

Створюємо hook:

    export function useAuth() {
        const context = useContext(AuthContext);

        if (!context) {
            throw new Error(
                "useAuth must be used inside AuthProvider"
            );
        }

        return context;
    }

Тепер у будь-якому компоненті:

    const { user, login, logout } = useAuth();

---

# 12. Login → Protected Page

Типовий flow:

    User
      ↓
    /login
      ↓
    вводить email/password
      ↓
    Backend
      ↓
    Authentication success
      ↓
    user встановлюється
      ↓
    /dashboard

Наприклад:

    function Login() {
        const { login } = useAuth();

        function handleLogin() {
            const user = {
                id: "1",
                email: "user@example.com",
            };

            login(user);
        }

        return (
            <button onClick={handleLogin}>
                Login
            </button>
        );
    }

Після:

    login(user)

`user` вже не `null`.

Тому:

    <RequireAuth>
        <Dashboard />
    </RequireAuth>

дозволить показати `Dashboard`.

---

# 13. Logout

Logout повинен прибрати authentication state.

Наприклад:

    function AuthProvider() {
        const [user, setUser] = useState<User | null>(null);

        function login(user: User) {
            setUser(user);
        }

        function logout() {
            setUser(null);
        }

        // ...
    }

У компоненті:

    function Profile() {
        const { user, logout } = useAuth();

        return (
            <div>
                <p>{user?.email}</p>

                <button onClick={logout}>
                    Logout
                </button>
            </div>
        );
    }

Після:

    logout()

отримуємо:

    user === null

і Protected Route більше не дозволить доступ.

---

# 14. Redirect після Login

Розглянемо повний flow.

Користувач відкриває:

    /dashboard

Але він не авторизований.

`RequireAuth`:

    <Navigate
        to="/login"
        state={{ from: location }}
    />

Користувач потрапляє:

    /login

Після успішного Login потрібно повернути його:

    /dashboard

Для цього в Login:

    import { useLocation, useNavigate } from "react-router-dom";

    function Login() {
        const navigate = useNavigate();
        const location = useLocation();

        const { login } = useAuth();

        function handleLogin() {
            const user = {
                id: "1",
                email: "user@example.com",
            };

            login(user);

            const from = location.state?.from?.pathname ?? "/dashboard";

            navigate(from, { replace: true });
        }

        return (
            <button onClick={handleLogin}>
                Login
            </button>
        );
    }

Ідея:

    location.state.from
           ↓
       /dashboard
           ↓
    navigate("/dashboard")

Якщо `from` немає:

    /dashboard

стає default destination.

---

# 15. `replace` при Redirect

Для authentication flow часто використовують:

    replace

Наприклад:

    <Navigate
        to="/login"
        replace
        state={{ from: location }}
    />

Або:

    navigate(from, {
        replace: true,
    });

### Чому?

Уявімо:

    /dashboard
        ↓
    /login
        ↓
    /dashboard

Якщо використовувати звичайну навігацію, history може містити непотрібні записи.

`replace` замінює поточний history entry.

Це особливо корисно для:

    Login
    Logout
    Redirect після authentication
    Redirect після authorization

---

# 16. Public Only Routes

Є не тільки Protected Routes.

Іноді потрібно зробити маршрут доступним **тільки неавторизованим** користувачам.

Наприклад:

    /login
    /register

Якщо користувач вже залогінений, йому немає сенсу бачити Login.

Можна зробити:

    function PublicOnlyRoute({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const { user } = useAuth();

        if (user) {
            return <Navigate to="/dashboard" replace />;
        }

        return children;
    }

Тоді:

    <Route
        path="/login"
        element={
            <PublicOnlyRoute>
                <Login />
            </PublicOnlyRoute>
        }
    />

Логіка:

    user === null
        ↓
    Login

    user !== null
        ↓
    Dashboard

---

# 17. Protected Layout

Коли багато Protected Routes, не потрібно обгортати кожен маршрут окремо.

Замість:

    <Route
        path="/dashboard"
        element={
            <RequireAuth>
                <Dashboard />
            </RequireAuth>
        }
    />

    <Route
        path="/profile"
        element={
            <RequireAuth>
                <Profile />
            </RequireAuth>
        }
    />

    <Route
        path="/settings"
        element={
            <RequireAuth>
                <Settings />
            </RequireAuth>
        }
    />

можна використати layout.

Наприклад:

    function ProtectedLayout() {
        const { user } = useAuth();
        const location = useLocation();

        if (!user) {
            return (
                <Navigate
                    to="/login"
                    state={{ from: location }}
                    replace
                />
            );
        }

        return <Outlet />;
    }

`Outlet` — місце, де React Router відрендерить дочірній route.

---

# 18. Nested Protected Routes

Тепер можна побудувати:

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
        </Route>
    </Routes>

Усі дочірні routes захищені:

    ProtectedLayout
         │
         ├── /dashboard
         ├── /profile
         └── /settings

Якщо користувач неавторизований:

    /dashboard
         ↓
    ProtectedLayout
         ↓
    /login

---

## Ще краща структура

Можна мати:

    <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/account">
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
        </Route>
    </Route>

Тоді:

    /dashboard
    /account/profile
    /account/settings

усі знаходяться під одним Protected Layout.

---

# 19. Ролі користувачів

Authentication відповідає:

> Чи користувач увійшов?

Але цього недостатньо.

Наприклад:

    user
    editor
    admin

Усі вони authenticated.

Але:

    /admin

повинен бути доступний тільки:

    admin

Наприклад:

    type Role =
        | "user"
        | "editor"
        | "admin";

    type User = {
        id: string;
        email: string;
        role: Role;
    };

---

# 20. Role-Based Access Control

Це називається:

**RBAC — Role-Based Access Control**

Наприклад:

    user
        ↓
    /profile

    editor
        ↓
    /editor

    admin
        ↓
    /admin

Перевірка:

    user.role === "admin"

---

# 21. `RequireRole`

Можна створити компонент:

    type RequireRoleProps = {
        allowedRoles: Role[];
        children: React.ReactNode;
    };

    function RequireRole({
        allowedRoles,
        children,
    }: RequireRoleProps) {
        const { user } = useAuth();

        if (!user) {
            return <Navigate to="/login" replace />;
        }

        if (!allowedRoles.includes(user.role)) {
            return <Navigate to="/403" replace />;
        }

        return children;
    }

Тепер:

    <Route
        path="/admin"
        element={
            <RequireRole allowedRoles={["admin"]}>
                <Admin />
            </RequireRole>
        }
    />

Тільки `admin` може відкрити:

    /admin

---

# 22. Authentication через Backend

У реальному full-stack застосунку authentication зазвичай не обмежується React state.

Типовий flow:

    React
      ↓
    POST /api/login
      ↓
    Backend
      ↓
    Database
      ↓
    перевірка credentials
      ↓
    Session / JWT
      ↓
    React отримує authenticated user

Наприклад:

    async function login(email: string, password: string) {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const user: User = await response.json();

        setUser(user);
    }

Тепер:

    user !== null

і Protected Route дозволяє доступ.

---

# 23. Cookie / Session Authentication

Один із поширених підходів:

    Browser
       ↓
    Login
       ↓
    Backend
       ↓
    Session
       ↓
    HttpOnly Cookie

Наприклад:

    POST /api/login

Backend створює session і встановлює cookie.

Після цього браузер автоматично надсилає cookie з наступними запитами.

React може перевірити:

    GET /api/me

і отримати:

    {
        id: "123",
        email: "user@example.com",
        role: "user"
    }

---

## `credentials: "include"`

Якщо authentication використовує cookie і frontend/backend працюють на різних origin, часто потрібно:

    fetch("/api/me", {
        credentials: "include",
    });

Для login:

    fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

Конкретна конфігурація залежить від backend та CORS.

---

# 24. JWT Authentication

Інший популярний підхід:

    Login
      ↓
    Backend
      ↓
    JWT
      ↓
    Client
      ↓
    API requests

Наприклад:

    Authorization: Bearer <token>

Backend перевіряє token.

Важливо:

> Наявність JWT у frontend state сама по собі не робить API захищеним.

Backend повинен перевіряти authentication.

---

# 25. Важливе правило безпеки

## Protected Route у React — не справжня security boundary

Це дуже важливо.

React може приховати:

    /admin

від звичайного користувача.

Але користувач все одно може напряму відправити HTTP request до:

    /api/admin/users

Тому backend також повинен перевіряти:

    authentication

і:

    authorization

Правильна архітектура:

    React Router
        ↓
    UI protection
        ↓
    Backend API
        ↓
    Authentication
        ↓
    Authorization
        ↓
    Database

---

## Неправильно

Тільки:

    <RequireRole allowedRoles={["admin"]}>
        <Admin />
    </RequireRole>

Це захищає UI, але не API.

---

## Правильно

Frontend:

    /admin
        ↓
    RequireRole

Backend:

    GET /api/admin/users
        ↓
    check authentication
        ↓
    check role === admin
        ↓
    database

---

# 26. Loading State під час перевірки Auth

Це дуже важливий момент.

Уявімо, що при старті застосунку:

    user = null

але ми ще не знаємо, чи користувач authenticated.

Наприклад:

    GET /api/me

ще виконується.

Якщо одразу перевірити:

    if (!user) {
        return <Navigate to="/login" />;
    }

можна помилково відправити authenticated user на Login.

Тому потрібні три стани:

    loading
    authenticated
    unauthenticated

Наприклад:

    type AuthState = {
        user: User | null;
        loading: boolean;
    };

У Protected Route:

    function RequireAuth({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const { user, loading } = useAuth();
        const location = useLocation();

        if (loading) {
            return <p>Loading...</p>;
        }

        if (!user) {
            return (
                <Navigate
                    to="/login"
                    state={{ from: location }}
                    replace
                />
            );
        }

        return children;
    }

Логіка:

    loading === true
        ↓
    Loading

    loading === false
    user === null
        ↓
    Login

    loading === false
    user !== null
        ↓
    Protected Page

---

# 27. Типовий Auth Flow

Один із найважливіших flow для запам'ятовування:

    APP START
        ↓
    AuthProvider
        ↓
    перевірити session
        ↓
    GET /api/me
        ↓
    ┌─────────────────────┐
    │                     │
    ▼                     ▼
    user                  null
    │                     │
    ▼                     ▼
    authenticated         unauthenticated
    │                     │
    ▼                     ▼
    App                   Login
    │
    ▼
    Protected Routes

---

## Login Flow

    Login Form
        ↓
    POST /api/login
        ↓
    Backend
        ↓
    session / JWT
        ↓
    user
        ↓
    AuthProvider
        ↓
    navigate("/dashboard")

---

## Logout Flow

    Logout
       ↓
    POST /api/logout
       ↓
    Backend destroys session
       ↓
    user = null
       ↓
    /login

---

# 28. TypeScript

Для React + TypeScript краще явно типізувати authentication.

Наприклад:

    type Role =
        | "user"
        | "editor"
        | "admin";

    type User = {
        id: string;
        email: string;
        role: Role;
    };

    type AuthContextValue = {
        user: User | null;
        loading: boolean;
        login: (user: User) => void;
        logout: () => void;
    };

---

## `children`

Тип для `children`:

    type Props = {
        children: React.ReactNode;
    };

Або:

    import type { ReactNode } from "react";

    type Props = {
        children: ReactNode;
    };

Не потрібно використовувати:

    any

---

## Protected Route

    type RequireAuthProps = {
        children: React.ReactNode;
    };

    function RequireAuth({
        children,
    }: RequireAuthProps) {
        // ...
    }

---

# 29. Типові помилки

## ❌ Помилка 1. Захищати тільки frontend

    if (user?.role === "admin") {
        return <Admin />;
    }

Це не захищає backend API.

Потрібна перевірка на сервері.

---

## ❌ Помилка 2. Не враховувати loading

    if (!user) {
        return <Navigate to="/login" />;
    }

Якщо authentication ще перевіряється, це може викликати неправильний redirect.

Краще:

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

---

## ❌ Помилка 3. Втрачати початковий URL

Користувач відкрив:

    /settings

його відправили:

    /login

Після Login він потрапив просто:

    /dashboard

Це працює, але UX гірший.

Краще зберегти:

    state={{ from: location }}

---

## ❌ Помилка 4. Не використовувати `replace`

Для redirect часто доречно:

    <Navigate
        to="/login"
        replace
    />

---

## ❌ Помилка 5. Дублювати `RequireAuth`

Не обов'язково робити:

    <RequireAuth>
        <Dashboard />
    </RequireAuth>

    <RequireAuth>
        <Profile />
    </RequireAuth>

    <RequireAuth>
        <Settings />
    </RequireAuth>

Якщо всі routes protected, зручніше:

    <Route element={<ProtectedLayout />}>
        ...
    </Route>

---

## ❌ Помилка 6. Плутати Authentication та Authorization

    authenticated === true

не означає:

    authorized === true

Користувач може бути authenticated, але не мати ролі `admin`.

---

# 30. Protected Routes та API

Приклад повного full-stack flow.

Frontend:

    /admin

Router:

    RequireRole
        ↓
    role === "admin"

Backend:

    GET /api/admin/users

Backend middleware:

    authenticate()
        ↓
    authorize("admin")
        ↓
    controller
        ↓
    database

Тобто захист існує на двох рівнях:

    FRONTEND
    └── UX / navigation protection

    BACKEND
    └── real security

---

# 31. Protected Routes ≠ Security

Це потрібно добре запам'ятати.

React Router може контролювати:

    що користувач бачить

    куди користувач переходить

    коли потрібно показати Login

    коли потрібно зробити redirect

Але React Router не може сам по собі гарантувати:

    що API захищений

    що database захищена

    що admin endpoint захищений

    що користувач не підробив request

Тому:

    Protected Route
        ≠
    Backend Security

---

# 32. Практична структура проєкту

Для невеликого React застосунку:

    src/
    ├── app/
    │   ├── App.tsx
    │   └── router.tsx
    │
    ├── auth/
    │   ├── AuthContext.tsx
    │   ├── AuthProvider.tsx
    │   ├── RequireAuth.tsx
    │   ├── RequireRole.tsx
    │   └── useAuth.ts
    │
    ├── pages/
    │   ├── Home.tsx
    │   ├── Login.tsx
    │   ├── Dashboard.tsx
    │   ├── Profile.tsx
    │   ├── Settings.tsx
    │   ├── Admin.tsx
    │   └── Forbidden.tsx
    │
    └── components/

Для більших проєктів структура може бути іншою, але принцип залишається.

---

# 33. Що потрібно знати Junior

Для Junior важливо розуміти:

### Базовий рівень

    Protected Route
    Navigate
    useLocation
    authentication
    authorization

### Наступний рівень

    AuthContext
    useAuth
    RequireAuth
    redirect after login
    logout
    loading state

### Хороший Junior / Junior+

    nested protected routes
    protected layout
    role-based access
    RequireRole
    session / JWT
    frontend vs backend security

---

# 34. Питання на співбесіді

## ❓ Що таке Protected Route?

**Відповідь:**

Protected Route — це маршрут, доступ до якого дозволений тільки користувачам, які відповідають певній умові, наприклад authenticated user.

---

## ❓ Як зробити redirect у React Router?

Можна використати:

    <Navigate to="/login" />

або програмну навігацію:

    navigate("/login");

---

## ❓ Для чого `useLocation`?

`useLocation` повертає інформацію про поточний URL.

В authentication flow його можна використовувати, щоб запам'ятати маршрут, який користувач хотів відкрити:

    state={{ from: location }}

---

## ❓ Навіщо `replace`?

`replace` замінює поточний запис у browser history замість додавання нового.

Особливо корисний для redirect після:

    Login
    Logout
    Authentication check

---

## ❓ Authentication vs Authorization?

    Authentication
    → Хто ти?

    Authorization
    → Що тобі дозволено?

---

## ❓ Чи захищає Protected Route API?

Ні.

Protected Route захищає navigation/UI.

API повинен мати власну authentication та authorization на backend.

---

## ❓ Як захистити багато routes?

Можна використовувати:

    ProtectedLayout

з:

    <Outlet />

Наприклад:

    <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
    </Route>

---

## ❓ Як зробити Admin Route?

Перевірити роль:

    user.role === "admin"

або створити:

    RequireRole

---

# 35. Міні-шпаргалка

## Protected Route

    function RequireAuth({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const { user, loading } = useAuth();
        const location = useLocation();

        if (loading) {
            return <Loading />;
        }

        if (!user) {
            return (
                <Navigate
                    to="/login"
                    state={{ from: location }}
                    replace
                />
            );
        }

        return children;
    }

---

## Protected route

    <Route
        path="/dashboard"
        element={
            <RequireAuth>
                <Dashboard />
            </RequireAuth>
        }
    />

---

## Protected layout

    <Route element={<ProtectedLayout />}>
        <Route
            path="/dashboard"
            element={<Dashboard />}
        />

        <Route
            path="/profile"
            element={<Profile />}
        />
    </Route>

---

## Redirect

    <Navigate
        to="/login"
        replace
    />

---

## Programmatic navigation

    const navigate = useNavigate();

    navigate("/dashboard");

---

## Return to previous page

    <Navigate
        to="/login"
        state={{ from: location }}
        replace
    />

Потім:

    const from =
        location.state?.from?.pathname
        ?? "/dashboard";

    navigate(from, {
        replace: true,
    });

---

## Role protection

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/403" replace />;
    }

    return children;

---

# 36. Головне

Protected Routes — це один із фундаментальних патернів реального React-застосунку.

Головна схема:

    USER
      ↓
    ROUTER
      ↓
    AUTH CHECK
      │
      ├── loading
      │      ↓
      │   Loading
      │
      ├── unauthenticated
      │      ↓
      │   /login
      │
      └── authenticated
             ↓
        AUTHORIZATION
             │
             ├── allowed
             │      ↓
             │   Protected Page
             │
             └── forbidden
                    ↓
                   /403

Запам'ятай:

    Authentication
        ↓
    "Хто ти?"

    Authorization
        ↓
    "Що тобі дозволено?"

    Protected Route
        ↓
    "Чи можемо показати цю сторінку?"

    Backend authorization
        ↓
    "Чи дозволено виконати цю операцію?"

Найтиповіша структура:

    <AuthProvider>
        <BrowserRouter>
            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route element={<ProtectedLayout />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    <Route
                        path="/settings"
                        element={<Settings />}
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    </AuthProvider>

А для ролей:

    <Route
        path="/admin"
        element={
            <RequireRole allowedRoles={["admin"]}>
                <Admin />
            </RequireRole>
        }
    />

І найголовніше правило full-stack:

    React Protected Route
        ↓
    захищає UI та navigation

    Backend Auth
        ↓
    захищає API

    Backend Authorization
        ↓
    захищає operation

    Database permissions
        ↓
    захищають data

Тому правильне мислення:

    Login
      ↓
    Authentication
      ↓
    User
      ↓
    React Router
      ↓
    Protected Route
      ↓
    Authorization
      ↓
    Protected UI
      ↓
    API
      ↓
    Backend authentication
      ↓
    Backend authorization
      ↓
    Database

> **Головна ідея:** Protected Route — це не просто `if (!user) → /login`. Це частина загальної authentication/authorization архітектури застосунку.