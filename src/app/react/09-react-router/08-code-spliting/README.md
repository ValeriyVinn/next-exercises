# 08. Code Splitting

Code Splitting — це техніка поділу JavaScript-коду application на окремі частини (chunks), які можуть завантажуватися не всі одразу, а лише тоді, коли вони потрібні.

У великому React application може бути багато коду:

    components
    pages
    routes
    libraries
    utilities
    features
    styles

Якщо весь код завантажувати одним великим JavaScript bundle:

    Browser
        ↓
    download весь JS
        ↓
    parse
        ↓
    execute
        ↓
    application ready

це може бути неефективно.

Code splitting дозволяє:

    Browser
        ↓
    download необхідний JS
        ↓
    application starts
        ↓
    користувач переходить на інший route
        ↓
    завантажується потрібний chunk

Особливо корисний code splitting для:

    routes
    великих сторінок
    великих компонентів
    рідко використовуваних features
    важких бібліотек

У React найважливіші інструменти:

    dynamic import()
    React.lazy()
    <Suspense>

У React Router code splitting особливо часто використовується для route-level splitting.

---

### Ключові поняття

✔ code splitting  
✔ bundle  
✔ bundle size  
✔ chunk  
✔ JavaScript bundle  
✔ dynamic import  
✔ static import  
✔ `import()`  
✔ `React.lazy()`  
✔ `Suspense`  
✔ lazy loading  
✔ route-level code splitting  
✔ component-level code splitting  
✔ loading state  
✔ fallback UI  
✔ eager loading  
✔ lazy loading  
✔ initial bundle  
✔ network request  
✔ preloading  
✔ prefetching  
✔ chunk loading  
✔ route module  
✔ performance  
✔ Core Web Vitals  
✔ bundle analysis  

---

### Що потрібно пам'ятати

• Code splitting розділяє великий JavaScript bundle на менші chunks.

• Без code splitting великий application може завантажувати багато коду ще до того, як він знадобиться.

• Основний механізм JavaScript для dynamic loading:

    import()

• `import()` повертає Promise.

• React надає:

    React.lazy()

для lazy loading React components.

• `Suspense` дозволяє показати fallback UI, поки lazy component завантажується.

• Route-level code splitting — один із найкорисніших способів code splitting.

• Необов'язково завантажувати код усіх сторінок одразу.

• Наприклад:

    /home
    /products
    /admin
    /settings

можуть завантажувати свої chunks окремо.

• Code splitting може зменшити initial JavaScript download.

• Але code splitting створює додаткові network requests.

• Надмірний code splitting може створити занадто багато маленьких chunks.

• Code splitting — це не просто "зробити більше файлів".

• Мета — оптимізувати момент і обсяг завантаження JavaScript.

---

# Bundle

Bundle — це JavaScript-код, підготовлений bundler-ом для завантаження application.

Наприклад:

    source code

        ↓

    bundler

        ↓

    bundle.js

У сучасному application bundle може складатися з багатьох chunks:

    main.js
    vendor.js
    route-home.js
    route-products.js
    route-admin.js

---

# Chunk

Chunk — окрема частина JavaScript output, яку bundler може завантажувати незалежно.

Наприклад:

    main.js
    products.chunk.js
    admin.chunk.js
    settings.chunk.js

Умовно:

    Application
        │
        ├── main.js
        ├── products.js
        ├── admin.js
        └── settings.js

Code splitting дозволяє не завантажувати все одразу.

---

# Bundle vs Chunk

У спрощеній моделі:

    Bundle
        ↓
    JavaScript output

    Chunk
        ↓
    окрема частина output

Наприклад:

    application
        ↓
    multiple chunks
        ↓
    browser loads only required chunks

Точна структура залежить від bundler та build configuration.

---

# Static Import

Звичайний import:

    import ProductsPage from "./ProductsPage";

це static import.

Bundler бачить dependency під час build.

Наприклад:

    import React from "react";
    import ProductsPage from "./ProductsPage";
    import Header from "./Header";

Умовно:

    App
     │
     ├── Header
     └── ProductsPage

можуть потрапити до initial bundle.

---

# Dynamic Import

Dynamic import:

    import("./ProductsPage")

дозволяє завантажити module асинхронно.

Наприклад:

    const module = await import(
        "./ProductsPage"
    );

Це не звичайний static import.

---

# `import()`

Syntax:

    import("./module")

Повертає Promise:

    import("./module")
        .then((module) => {
            console.log(module);
        });

Або:

    const module = await import(
        "./module"
    );

---

# Static vs Dynamic Import

Static:

    import ProductsPage from "./ProductsPage";

Dynamic:

    import("./ProductsPage");

Спрощено:

    static import
        ↓
    dependency відома одразу

    dynamic import()
        ↓
    module можна завантажити пізніше

---

# Dynamic Import та Code Splitting

Наприклад:

    const loadProducts = () => {
        return import("./ProductsPage");
    };

Bundler може створити окремий chunk для:

    ProductsPage

Тоді цей код не обов'язково повинен бути частиною initial bundle.

---

# Promise від `import()`

Dynamic import повертає Promise.

    import("./ProductsPage")
        .then((module) => {
            console.log(module);
        })
        .catch((error) => {
            console.error(error);
        });

---

# `React.lazy()`

React має helper:

    lazy()

Він дозволяє створити lazy-loaded component.

Наприклад:

    import { lazy } from "react";

    const ProductsPage = lazy(
        () => import("./ProductsPage")
    );

Тепер `ProductsPage` завантажується lazy.

---

# `Suspense`

Lazy component потрібно використовувати всередині:

    <Suspense>

Наприклад:

    import {
        lazy,
        Suspense,
    } from "react";

    const ProductsPage = lazy(
        () => import("./ProductsPage")
    );

    function App() {
        return (
            <Suspense
                fallback={<p>Loading...</p>}
            >
                <ProductsPage />
            </Suspense>
        );
    }

Поки component завантажується:

    <p>Loading...</p>

Після завантаження:

    <ProductsPage />

---

# `Suspense` Flow

Логіка:

    render lazy component
          ↓
    component code not loaded
          ↓
    Suspense
          ↓
    fallback
          ↓
    chunk downloaded
          ↓
    component loaded
          ↓
    component rendered

---

# Fallback

`fallback` — UI, який React показує під час очікування.

Наприклад:

    <Suspense
        fallback={<p>Loading...</p>}
    >
        <ProductsPage />
    </Suspense>

Fallback може бути:

    text
    spinner
    skeleton
    loading component

Наприклад:

    <Suspense
        fallback={<LoadingSpinner />}
    >
        <ProductsPage />
    </Suspense>

---

# Loading Component

Замість простого тексту:

    <p>Loading...</p>

можна створити:

    function Loading() {
        return (
            <div>
                Loading...
            </div>
        );
    }

і:

    <Suspense fallback={<Loading />}>
        <ProductsPage />
    </Suspense>

---

# Route-Level Code Splitting

Найважливіший практичний сценарій для React Router:

    один route
        ↓
    один lazy-loaded route component

Наприклад:

    /products
        ↓
    ProductsPage chunk

    /admin
        ↓
    AdminPage chunk

    /settings
        ↓
    SettingsPage chunk

---

# React Router + Lazy Components

Наприклад:

    import {
        lazy,
        Suspense,
    } from "react";

    const HomePage = lazy(
        () => import("./pages/HomePage")
    );

    const ProductsPage = lazy(
        () => import("./pages/ProductsPage")
    );

    const SettingsPage = lazy(
        () => import("./pages/SettingsPage")
    );

Потім:

    <Suspense fallback={<Loading />}>
        <Routes>
            <Route
                path="/"
                element={<HomePage />}
            />

            <Route
                path="/products"
                element={<ProductsPage />}
            />

            <Route
                path="/settings"
                element={<SettingsPage />}
            />
        </Routes>
    </Suspense>

---

# Route Lazy Loading

Для React Router можна використовувати lazy route modules.

Наприклад:

    const router = createBrowserRouter([
        {
            path: "/",
            lazy: async () => {
                const module = await import(
                    "./routes/home"
                );

                return {
                    Component: module.HomePage,
                };
            },
        },
    ]);

У такому підході route module завантажується тоді, коли потрібен route.

---

# React Router `lazy`

React Router Data Router API підтримує `lazy` для route definitions.

Наприклад:

    const router = createBrowserRouter([
        {
            path: "/",
            lazy: async () => {
                const module = await import(
                    "./routes/home"
                );

                return {
                    Component: module.HomePage,
                };
            },
        },
        {
            path: "/products",
            lazy: async () => {
                const module = await import(
                    "./routes/products"
                );

                return {
                    Component: module.ProductsPage,
                };
            },
        },
    ]);

Ідея:

    route matched
        ↓
    lazy()
        ↓
    import()
        ↓
    chunk downloaded
        ↓
    route rendered

---

# Route Module

Route module може містити:

    component
    loader
    action
    errorElement
    інші route exports

Наприклад:

    export async function loader() {
        ...
    }

    export function Component() {
        ...
    }

Route можна завантажити як один module.

---

# React Router `lazy` vs React `lazy`

Це важлива різниця.

React:

    React.lazy()

призначений для lazy loading React components.

React Router:

    route.lazy

призначений для lazy loading route modules.

---

# React.lazy

Основна ідея:

    const Page = lazy(
        () => import("./Page")
    );

Використання:

    <Suspense fallback={<Loading />}>
        <Page />
    </Suspense>

---

# React Router `lazy`

Основна ідея:

    {
        path: "/products",
        lazy: async () => {
            const module = await import(
                "./routes/products"
            );

            return {
                Component: module.Component,
            };
        },
    }

React Router сам керує route-level loading.

---

# Route-Level Splitting vs Component-Level Splitting

## Route-level

    /products
        ↓
    ProductsPage chunk

Завантаження відбувається при переході на route.

---

## Component-level

Наприклад, великий:

    Chart

може бути lazy-loaded всередині ProductsPage.

    ProductsPage
         │
         ├── ProductList
         │
         └── Chart
                 ↓
             lazy chunk

---

# Коли використовувати Route-Level Splitting

Route-level splitting особливо корисний для:

    admin
    dashboard
    settings
    reports
    analytics
    large forms
    rarely visited pages

Наприклад:

    /admin
    /reports
    /settings

не обов'язково завантажувати користувачу, який відкрив:

    /

---

# Коли використовувати Component-Level Splitting

Component-level splitting може бути корисним для великих або рідко використовуваних компонентів.

Наприклад:

    rich text editor
    chart library
    map
    image editor
    code editor
    PDF viewer

---

# Приклад: Lazy Chart

    import { lazy, Suspense } from "react";

    const Chart = lazy(
        () => import("./Chart")
    );

    function Dashboard() {
        return (
            <main>
                <h1>Dashboard</h1>

                <Suspense
                    fallback={<p>Loading chart...</p>}
                >
                    <Chart />
                </Suspense>
            </main>
        );
    }

Тепер код chart може завантажуватися окремо.

---

# Великі Бібліотеки

Code splitting особливо корисний для великих dependencies.

Наприклад:

    chart library
    editor
    map library

Замість:

    initial bundle
        ↓
    huge library

можна:

    initial bundle
        ↓
    application starts
        ↓
    feature needed
        ↓
    library chunk loads

---

# Dynamic Import Library

Наприклад:

    async function openEditor() {
        const module = await import(
            "./heavy-editor"
        );

        module.open();
    }

Це дозволяє відкласти завантаження module.

---

# Lazy Loading

Lazy loading означає:

    load when needed

На відміну від eager loading:

    load immediately

---

# Eager Loading

При eager loading dependency завантажується одразу.

Наприклад:

    import ProductsPage from "./ProductsPage";

Якщо module входить до initial dependency graph, він може бути частиною initial load.

---

# Lazy Loading

Lazy:

    const ProductsPage = lazy(
        () => import("./ProductsPage")
    );

Код можна завантажити пізніше.

---

# Eager vs Lazy

    Eager
        ↓
    load now

    Lazy
        ↓
    load when needed

---

# Initial Bundle

Initial bundle — код, який потрібен для першого запуску application.

Чим він більший:

    more bytes
        ↓
    more download
        ↓
    more parsing
        ↓
    potentially slower startup

Code splitting може зменшити initial bundle.

---

# Але Code Splitting не завжди покращує все

Наприклад:

    initial bundle
        ↓
    small

але:

    user immediately needs
    large lazy chunk

Тоді користувач може побачити:

    Loading...

Тому потрібно правильно визначати:

    що завантажувати одразу
    що завантажувати пізніше

---

# Trade-off

Code splitting має компроміси.

Переваги:

    smaller initial bundle
    faster initial loading
    less unused JavaScript

Недоліки:

    additional requests
    loading states
    possible delays on navigation
    more complex deployment
    chunk loading failures

---

# Chunk Loading Error

Lazy chunk може не завантажитися.

Наприклад:

    network error
    server error
    stale deployment
    cache mismatch
    offline
    connection lost

Тому production application повинен мати error handling.

---

# Chunk Loading Failure

Flow:

    navigate
        ↓
    lazy route
        ↓
    import()
        ↓
    chunk request
        ↓
    request fails
        ↓
    error
        ↓
    error boundary

Це одна з причин, чому code splitting пов'язаний з error handling.

---

# Code Splitting та 404/Error Routes

Попередній розділ:

    07-404-and-error-routes

і цей розділ пов'язані.

Наприклад:

    /admin
        ↓
    lazy chunk
        ↓
    chunk loading error
        ↓
    error boundary

Тому для lazy routes бажано мати:

    loading UI
    error UI
    recovery path

---

# Suspense Boundary

`Suspense` визначає область, яка може показати fallback.

Наприклад:

    <Suspense fallback={<Loading />}>
        <ProductsPage />
    </Suspense>

Якщо lazy component завантажується:

    ProductsPage
        ↓
    fallback

---

# Global Suspense

Можна створити один великий Suspense:

    <Suspense fallback={<Loading />}>
        <App />
    </Suspense>

Але тоді при loading одного lazy component fallback може замінити велику частину UI.

---

# Local Suspense

Можна розмістити Suspense ближче до lazy component:

    <Header />

    <Suspense fallback={<Loading />}>
        <ProductsPage />
    </Suspense>

Тоді Header залишається доступним.

---

# Suspense Boundary Architecture

Наприклад:

    App
     │
     ├── Header
     │
     └── Main
          │
          └── Suspense
                │
                └── ProductsPage

Якщо ProductsPage завантажується:

    Header
        ↓
    залишається

    ProductsPage
        ↓
    Loading

---

# Nested Suspense

Можна мати кілька boundaries:

    <Suspense fallback={<PageLoading />}>
        <Page>
            <Suspense fallback={<ChartLoading />}>
                <Chart />
            </Suspense>
        </Page>
    </Suspense>

Тоді:

    Page
        ↓
    Chart

можуть мати різні loading states.

---

# Loading UX

Не кожен loading state повинен виглядати як:

    Loading...

Можна використовувати:

    skeleton
    spinner
    placeholder
    progressive loading

Наприклад:

    <ProductSkeleton />

---

# Skeleton

Skeleton показує приблизну структуру майбутнього UI.

Наприклад:

    <ProductSkeleton />

замість:

    Loading...

Це часто створює кращий UX.

---

# Code Splitting та Navigation

При переході:

    /home
       ↓
    /products

може відбуватися:

    click
      ↓
    route matching
      ↓
    load products chunk
      ↓
    loading UI
      ↓
    render ProductsPage

---

# Prefetching

Іноді можна завантажити chunk трохи раніше.

Наприклад:

    користувач навів курсор
        ↓
    ймовірно скоро буде navigation
        ↓
    prefetch chunk

Це називається:

    prefetching

---

# Preloading vs Prefetching

У спрощеній формі:

    preload
        ↓
    ресурс дуже скоро потрібен

    prefetch
        ↓
    ресурс може знадобитися пізніше

Ці механізми залежать від bundler, framework та browser APIs.

---

# Не робити все Lazy

Погана ідея:

    Header → lazy
    Button → lazy
    Input → lazy
    Logo → lazy
    Card → lazy
    Text → lazy

Це може створити:

    багато маленьких chunks
        ↓
    багато requests
        ↓
    зайва складність

Code splitting повинен бути осмисленим.

---

# Що зазвичай НЕ потрібно lazy-load

Зазвичай немає великої користі робити lazy для дуже маленьких і базових компонентів:

    Button
    Input
    Icon
    Typography
    Header

якщо вони потрібні одразу.

---

# Що часто варто lazy-load

Корисні кандидати:

    AdminPage
    ReportsPage
    SettingsPage
    Chart
    Map
    RichTextEditor
    CodeEditor
    PDFViewer
    ImageEditor

---

# Route-Level Code Splitting — хороший default

Для великих applications хорошим кандидатом є:

    page per route

Наприклад:

    /home
    /products
    /users
    /settings
    /admin

Кожна велика сторінка може бути окремим chunk.

---

# Code Splitting Architecture

Умовно:

    Application
         │
         ├── Core
         │    ├── Router
         │    ├── Layout
         │    └── Shared UI
         │
         ├── Home chunk
         │
         ├── Products chunk
         │
         ├── Admin chunk
         │
         └── Settings chunk

Initial load:

    Core

Пізніше:

    Products chunk
    Admin chunk
    Settings chunk

---

# Example: React Router Routes

    const HomePage = lazy(
        () => import("./pages/HomePage")
    );

    const ProductsPage = lazy(
        () => import("./pages/ProductsPage")
    );

    const AdminPage = lazy(
        () => import("./pages/AdminPage")
    );

    function AppRoutes() {
        return (
            <Suspense
                fallback={<PageLoading />}
            >
                <Routes>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />

                    <Route
                        path="/products"
                        element={<ProductsPage />}
                    />

                    <Route
                        path="/admin"
                        element={<AdminPage />}
                    />
                </Routes>
            </Suspense>
        );
    }

---

# React Router Data Router Example

    const router = createBrowserRouter([
        {
            path: "/",
            lazy: async () => {
                const module = await import(
                    "./routes/home"
                );

                return {
                    Component: module.Component,
                };
            },
        },
        {
            path: "/products",
            lazy: async () => {
                const module = await import(
                    "./routes/products"
                );

                return {
                    Component: module.Component,
                    loader: module.loader,
                };
            },
        },
    ]);

---

# Route Module Example

Файл:

    routes/products.tsx

може містити:

    export async function loader() {
        const response = await fetch(
            "/api/products"
        );

        return response.json();
    }

    export function Component() {
        return (
            <main>
                <h1>Products</h1>
            </main>
        );
    }

Тоді router може lazy-load цей module.

---

# Route Lazy Loading з Error Element

    const router = createBrowserRouter([
        {
            path: "/products",
            lazy: async () => {
                const module = await import(
                    "./routes/products"
                );

                return {
                    Component: module.Component,
                    loader: module.loader,
                    ErrorBoundary:
                        module.ErrorBoundary,
                };
            },
        },
    ]);

Ідея:

    route
      ↓
    lazy module
      ↓
    component
    loader
    error handling

можуть бути організовані разом.

---

# Code Splitting та `loader()`

Route-level code splitting може розділяти не тільки UI.

Route module може містити:

    Component
    loader
    action
    ErrorBoundary

Наприклад:

    products.tsx

    export async function loader() {
        ...
    }

    export async function action() {
        ...
    }

    export function Component() {
        ...
    }

    export function ErrorBoundary() {
        ...
    }

Таким чином feature може бути lazy-loaded як один route module.

---

# Code Splitting та Authentication

Наприклад:

    /admin

може бути protected route.

Умовно:

    /admin
       ↓
    authentication
       ↓
    authorized?
       ↓
    yes
       ↓
    load admin chunk

Це може зменшити непотрібне завантаження admin UI для звичайного користувача.

Але code splitting не є механізмом security.

---

# Важливо: Code Splitting ≠ Security

Lazy loading не захищає код.

Наприклад:

    /admin

lazy-loaded chunk все одно може бути доступний клієнту, якщо користувач має можливість його завантажити.

Тому:

    authentication
    authorization
    backend permissions

повинні залишатися справжнім механізмом security.

Code splitting:

    performance technique

а не:

    security technique

---

# Code Splitting та API

Code splitting не означає code/data splitting.

Наприклад:

    ProductsPage

може завантажуватися окремо:

    products.js

але API data:

    /api/products

це інша система.

Маємо:

    JavaScript code
        ↓
    code splitting

    API data
        ↓
    data fetching

---

# Code Splitting та Images

Image lazy loading — інша оптимізація.

Наприклад:

    <img
        src="/large-image.jpg"
        loading="lazy"
        alt="..."
    />

Це:

    image lazy loading

а не:

    JavaScript code splitting

Не потрібно плутати ці поняття.

---

# Code Splitting та Tree Shaking

Tree shaking та code splitting — різні оптимізації.

### Tree shaking

Видаляє невикористаний code.

    unused exports
        ↓
    removed

### Code splitting

Розділяє code на chunks.

    JavaScript
        ↓
    chunk A
    chunk B
    chunk C

Вони можуть працювати разом.

---

# Code Splitting та Minification

Minification:

    code
        ↓
    smaller code

Code splitting:

    code
        ↓
    multiple chunks

Це різні оптимізації.

---

# Code Splitting та Compression

Compression:

    JavaScript
        ↓
    gzip / Brotli
        ↓
    fewer network bytes

Code splitting:

    JavaScript
        ↓
    separate chunks

У production вони можуть використовуватися одночасно.

---

# Bundle Analysis

Щоб зрозуміти, що займає багато місця, використовують bundle analyzers.

Мета:

    знайти великі dependencies
    ↓
    знайти непотрібний code
    ↓
    знайти можливості для splitting

Наприклад:

    chart library
        500 KB

може бути хорошим кандидатом для lazy loading.

---

# Performance

Code splitting може покращити:

    initial loading
    initial JavaScript size
    time to interactive
    responsiveness

Але результат потрібно вимірювати.

Не слід автоматично вважати:

    more splitting = faster

---

# Performance Trade-off

Наприклад:

    без splitting

    1 request
    1000 KB

або:

    з splitting

    1 initial request
    300 KB

    пізніше:
    350 KB
    350 KB

Другий варіант може бути кращим, якщо користувач не відкриває всі features.

Але якщо користувач одразу відкриває всі features:

    multiple requests

можуть додати overhead.

---

# Network Waterfall

При аналізі performance корисно дивитися:

    HTML
      ↓
    JS
      ↓
    chunk
      ↓
    chunk
      ↓
    data

Code splitting може змінити network waterfall.

Тому performance треба перевіряти через:

    browser DevTools
    Network
    Performance
    production build

---

# Production Build

Code splitting найкраще аналізувати на production build.

Development server може поводитися інакше.

У production:

    source code
        ↓
    bundler
        ↓
    optimized chunks
        ↓
    browser

---

# Development vs Production

Development:

    hot reload
    source maps
    development modules
    debugging

Production:

    minification
    tree shaking
    chunks
    hashing
    optimization

Тому оцінювати bundle size потрібно після production build.

---

# Chunk Hashing

Production bundlers часто використовують hashed filenames.

Наприклад:

    main.8f31a.js

    products.2a91c.js

Hash дозволяє browser правильно кешувати versioned assets.

---

# Browser Cache

Code splitting може добре працювати разом з caching.

Наприклад:

    main.js
        ↓
    cached

При новому deployment:

    products chunk
        ↓
    changed

Browser може повторно використати незмінені chunks.

---

# Cache Invalidation

Production deployment повинен правильно працювати з:

    chunk hashes
    cache headers
    asset versions

Інакше можливі ситуації:

    old HTML
        ↓
    references old chunk
        ↓
    chunk no longer exists
        ↓
    loading error

---

# Stale Chunk Error

Один із production сценаріїв:

    User has old application
        ↓
    new deployment
        ↓
    old chunk removed
        ↓
    user navigates
        ↓
    old chunk requested
        ↓
    404
        ↓
    chunk loading error

Тому production applications повинні мати стратегію recovery.

---

# Error Recovery

Можливий fallback:

    chunk loading error
        ↓
    notify user
        ↓
    retry
        ↓
    reload application

Але автоматичний reload потрібно робити обережно, щоб не створити infinite reload loop.

---

# Типові помилки

❌ Робити lazy loading для абсолютно кожного component.

    Button
    Icon
    Input
    Text

часто не мають сенсу lazy-load.

---

❌ Забувати `Suspense` для `React.lazy()`.

    const Page = lazy(
        () => import("./Page")
    );

має бути всередині:

    <Suspense>

---

❌ Створювати занадто великий Suspense boundary.

Наприклад:

    <Suspense fallback={<Loading />}>
        <EntireApplication />
    </Suspense>

може замінювати великий UI одним loading state.

---

❌ Використовувати code splitting без вимірювання.

Спочатку:

    measure

потім:

    optimize

---

❌ Плутати code splitting із lazy loading images.

    JavaScript code splitting

та:

    image lazy loading

це різні речі.

---

❌ Плутати code splitting із security.

Lazy-loaded admin page не захищає admin functionality.

---

❌ Забувати про chunk loading errors.

Lazy import може завершитися failure.

---

❌ Створювати надто багато маленьких chunks.

Замість:

    100 tiny chunks

може бути краще:

    logical feature chunks

---

❌ Завантажувати великий module lazy, якщо він потрібен майже кожному користувачу одразу.

Якщо feature є критичною:

    eager loading

може бути кращим.

---

# Типові сценарії

## Сценарій 1 — великий Admin

    /admin

Admin рідко відкривається.

Рішення:

    lazy-load Admin route

---

## Сценарій 2 — Chart

Dashboard має великий chart library.

Рішення:

    lazy-load Chart

---

## Сценарій 3 — Rich Text Editor

Editor потрібен тільки на сторінці створення матеріалу.

Рішення:

    lazy-load editor

---

## Сценарій 4 — Основна Home Page

Home потрібна майже всім.

Можливо:

    eager loading

буде кращим.

---

# Практичний алгоритм

Якщо потрібно вирішити:

    lazy чи eager?

постав питання:

    1. Чи потрібен module під час initial render?
           ↓
       yes → eager

    2. Чи потрібен module більшості користувачів?
           ↓
       yes → можливо eager

    3. Чи module великий?
           ↓
       yes → candidate for lazy

    4. Чи module використовується рідко?
           ↓
       yes → candidate for lazy

    5. Чи feature знаходиться на окремому route?
           ↓
       yes → route-level splitting

---

# Практичний Pattern

Для React Router:

    route
      ↓
    lazy import
      ↓
    chunk
      ↓
    Suspense / route loading UI
      ↓
    page
      ↓
    error boundary

---

# Приклад повної структури

    src/
    └── app/
        └── react/
            └── 09-react-router/
                └── 08-code-splitting/
                    ├── README.md
                    ├── router.tsx
                    ├── pages/
                    │   ├── HomePage.tsx
                    │   ├── ProductsPage.tsx
                    │   └── AdminPage.tsx
                    ├── components/
                    │   └── Loading.tsx
                    └── routes/
                        ├── home.tsx
                        ├── products.tsx
                        └── admin.tsx

---

# Повний приклад

    import {
        lazy,
        Suspense,
    } from "react";

    import {
        BrowserRouter,
        Routes,
        Route,
    } from "react-router-dom";

    const HomePage = lazy(
        () => import("./pages/HomePage")
    );

    const ProductsPage = lazy(
        () => import("./pages/ProductsPage")
    );

    const AdminPage = lazy(
        () => import("./pages/AdminPage")
    );

    function Loading() {
        return (
            <div>
                Loading...
            </div>
        );
    }

    export default function App() {
        return (
            <BrowserRouter>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route
                            path="/"
                            element={<HomePage />}
                        />

                        <Route
                            path="/products"
                            element={<ProductsPage />}
                        />

                        <Route
                            path="/admin"
                            element={<AdminPage />}
                        />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        );
    }

---

# Повний приклад з React Router Data Router

    import {
        createBrowserRouter,
        RouterProvider,
    } from "react-router-dom";

    const router = createBrowserRouter([
        {
            path: "/",
            lazy: async () => {
                const module = await import(
                    "./routes/home"
                );

                return {
                    Component: module.Component,
                };
            },
        },
        {
            path: "/products",
            lazy: async () => {
                const module = await import(
                    "./routes/products"
                );

                return {
                    Component: module.Component,
                    loader: module.loader,
                };
            },
        },
        {
            path: "/admin",
            lazy: async () => {
                const module = await import(
                    "./routes/admin"
                );

                return {
                    Component: module.Component,
                    loader: module.loader,
                    action: module.action,
                };
            },
        },
    ]);

    export default function App() {
        return (
            <RouterProvider router={router} />
        );
    }

---

# Route Module

`routes/products.tsx`:

    export async function loader() {
        const response = await fetch(
            "/api/products"
        );

        if (!response.ok) {
            throw new Response(
                "Failed to load products",
                {
                    status: response.status,
                }
            );
        }

        return response.json();
    }

    export function Component() {
        return (
            <main>
                <h1>Products</h1>
            </main>
        );
    }

Тепер route може lazy-load весь module.

---

# Code Splitting у реальному application

Умовна структура:

    Application
        │
        ├── shared
        │     ├── Header
        │     ├── Button
        │     └── Layout
        │
        ├── Home
        │     └── HomePage
        │
        ├── Products
        │     ├── ProductsPage
        │     └── ProductDetails
        │
        ├── Admin
        │     ├── Dashboard
        │     ├── Users
        │     └── Settings
        │
        └── Reports
              └── Charts

Можна організувати:

    shared
        ↓
    initial bundle

    Home
        ↓
    initial / early chunk

    Products
        ↓
    products chunk

    Admin
        ↓
    admin chunk

    Reports
        ↓
    reports chunk

---

# Code Splitting та Feature Architecture

Code splitting добре поєднується з feature-based architecture.

Наприклад:

    features/
        products/
        admin/
        reports/
        settings/

Кожна feature може мати власний route module.

Наприклад:

    features/
    └── products/
        ├── ProductsPage.tsx
        ├── ProductList.tsx
        ├── ProductDetails.tsx
        ├── loader.ts
        └── routes.tsx

Це спрощує route-level splitting.

---

# Route-Level Splitting як основний практичний підхід

Для junior developer важливо запам'ятати:

    великий route
        ↓
    lazy loading
        ↓
    окремий chunk

Наприклад:

    /products
    /admin
    /reports
    /settings

це хороші кандидати для code splitting.

---

# Питання зі співбесіди

Що таке code splitting?

Навіщо потрібен code splitting?

Що таке bundle?

Що таке chunk?

Чим bundle відрізняється від chunk?

Що таке static import?

Що таке dynamic import?

Як працює:

    import()

?

Що повертає dynamic import?

Що таке `React.lazy()`?

Для чого потрібен `Suspense`?

Що таке fallback?

Що таке lazy loading?

Що таке eager loading?

Що таке route-level code splitting?

Що таке component-level code splitting?

Як зробити lazy-loaded route?

Чим `React.lazy()` відрізняється від React Router `lazy`?

Що таке route module?

Коли варто lazy-load component?

Коли не варто lazy-load component?

Що таке initial bundle?

Як code splitting впливає на initial load?

Які trade-offs має code splitting?

Чому не потрібно робити lazy loading для кожного component?

Що таке chunk loading error?

Що може спричинити chunk loading error?

Як обробляти помилку lazy-loaded chunk?

Що таке prefetching?

Чим prefetching відрізняється від preloading?

Чим code splitting відрізняється від tree shaking?

Чим code splitting відрізняється від minification?

Чим code splitting відрізняється від image lazy loading?

Чи є code splitting механізмом security?

Як code splitting пов'язаний із React Router?

Як code splitting пов'язаний із `Suspense`?

Як code splitting пов'язаний з performance?

Як перевірити, чи code splitting реально покращив performance?

Що таке bundle analyzer?

Що таке chunk hashing?

Чому production build важливий для оцінки code splitting?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке code splitting.

Що таке bundle.

Що таке chunk.

Static import.

Dynamic import.

`import()`.

`React.lazy()`.

`Suspense`.

`fallback`.

Lazy loading.

Eager loading.

Route-level code splitting.

Component-level code splitting.

Initial bundle.

Основи performance trade-offs.

---

🔵 Junior

Lazy-loaded React components.

Lazy-loaded routes.

React Router `lazy`.

Route modules.

`Suspense` boundaries.

Loading UI.

Skeleton UI.

Error handling для lazy loading.

Chunk loading errors.

Route-level splitting.

Вибір між:

    eager loading
    lazy loading

Розуміння:

    initial bundle
    chunks
    network requests

Основи production build.

Основи browser caching.

Основи bundle analysis.

---

🟠 Middle

Архітектура route-level code splitting.

Feature-level code splitting.

Component-level splitting.

Nested Suspense boundaries.

Loading UX.

Error recovery.

Chunk loading failures.

Prefetching.

Preloading.

Bundle analysis.

Dependency optimization.

Tree shaking + code splitting.

Caching.

Chunk hashing.

Cache invalidation.

Performance measurement.

Network waterfall.

Оптимізація:

    initial bundle
    route chunks
    heavy dependencies

---

🔴 Senior

Глибока оптимізація JavaScript delivery.

Chunk graph.

Dependency graph.

Advanced bundler optimization.

Chunk splitting strategies.

Shared chunks.

Vendor chunks.

Runtime chunks.

Long-term caching.

Cache invalidation.

Prefetch strategies.

Predictive loading.

Network-aware loading.

Performance budgets.

Core Web Vitals.

JavaScript execution cost.

Parsing cost.

Compilation cost.

Execution cost.

Main-thread blocking.

Chunk granularity.

Trade-offs між:

    fewer large chunks
    many small chunks

Server-side rendering.

Streaming.

Hydration.

Progressive hydration.

Framework-level code splitting.

Advanced deployment strategies.

CDN caching.

Asset versioning.

Production monitoring.

Real-user performance measurement.

---

# Міні-шпаргалка

## Static import

    import Page from "./Page";

    → dependency known statically

---

## Dynamic import

    import("./Page");

    → asynchronous module loading

---

## Promise

    import("./Page")
        .then((module) => {
            ...
        });

---

## React.lazy

    const Page = lazy(
        () => import("./Page")
    );

---

## Suspense

    <Suspense fallback={<Loading />}>
        <Page />
    </Suspense>

---

## Route-level splitting

    /products
        ↓
    products chunk

---

## Component-level splitting

    ProductsPage
        ↓
    Chart
        ↓
    chart chunk

---

## Eager

    load now

---

## Lazy

    load when needed

---

## Initial bundle

    application startup
        ↓
    initial JavaScript

---

## Chunk

    окрема частина
    JavaScript output

---

## React.lazy

    lazy component

---

## React Router lazy

    lazy route module

---

## Loading flow

    route
      ↓
    lazy import
      ↓
    chunk request
      ↓
    loading
      ↓
    chunk loaded
      ↓
    render

---

## Error flow

    lazy import
      ↓
    chunk request
      ↓
    request fails
      ↓
    error boundary
      ↓
    error UI

---

## Основна модель

    source code
        ↓
    bundler
        ↓
    chunks
        ↓
    browser
        ↓
    load only what is needed

---

# Основні правила

    static import
        → load as part of normal dependency graph

    import()
        → dynamic module loading

    React.lazy()
        → lazy React component

    Suspense
        → loading fallback

    route.lazy
        → lazy React Router route module

    code splitting
        → divide application code into chunks

    route-level splitting
        → split by routes

    component-level splitting
        → split by components/features

---

# Головне:

• Code splitting — це поділ JavaScript application на окремі chunks.

• Головна мета — не завантажувати весь JavaScript одразу.

• Dynamic import:

    import("./module")

дозволяє завантажувати module асинхронно.

• `import()` повертає Promise.

• `React.lazy()` дозволяє створювати lazy-loaded React components.

• Lazy component потрібно використовувати з:

    <Suspense>

• `Suspense` показує fallback, поки потрібний code ще завантажується.

• Основна модель:

    lazy component
        ↓
    import()
        ↓
    chunk
        ↓
    download
        ↓
    render

• Route-level code splitting — один із найкорисніших практичних способів оптимізації React application.

• Великі routes часто є хорошими кандидатами:

    /admin
    /reports
    /settings
    /dashboard

• Великі та рідко використовувані components також можуть бути lazy-loaded:

    Chart
    Map
    Editor
    PDF Viewer
    Code Editor

• Не потрібно робити lazy loading для кожного маленького component.

• Надмірний code splitting може створити занадто багато маленьких chunks.

• Code splitting зменшує initial JavaScript, але може додати додаткові network requests.

• Тому:

    more splitting ≠ automatically faster

• Потрібно вимірювати performance.

• `React.lazy()` і React Router `lazy` мають різне призначення:

    React.lazy()
        → component

    route.lazy
        → route module

• Route module може містити:

    Component
    loader
    action
    ErrorBoundary

• Code splitting не є механізмом security.

• Lazy-loaded `/admin` не захищає application від несанкціонованого доступу.

• Security повинна забезпечуватися:

    authentication
    authorization
    backend permissions

• Code splitting відрізняється від:

    tree shaking
    minification
    compression
    image lazy loading

• Вони можуть використовуватися разом.

• Tree shaking:

    remove unused code

• Code splitting:

    divide code into chunks

• Minification:

    make code smaller

• Compression:

    reduce network transfer size

• Image lazy loading:

    load images when needed

• Lazy chunk може не завантажитися.

Причини:

    network failure
    server failure
    offline
    stale deployment
    cache mismatch

• Тому code splitting потрібно поєднувати з error handling.

• Хороший route-level architecture:

    route
      ↓
    lazy module
      ↓
    loading UI
      ↓
    component
      ↓
    error boundary

• `Suspense` визначає UI для loading state.

• Error boundary визначає UI для failure state.

• У production важливі:

    chunk hashing
    caching
    cache invalidation
    CDN
    deployment strategy

• Якщо старий application посилається на chunk, якого вже немає на сервері, може виникнути chunk loading error.

• Production code splitting потрібно аналізувати після production build.

• Для аналізу корисні:

    browser DevTools
    Network
    Performance
    bundle analyzer

• Основна практична стратегія для React Router:

    shared critical code
        ↓
    initial bundle

    large route
        ↓
    separate chunk

    rarely used feature
        ↓
    lazy chunk

• Вибір між eager та lazy залежить від:

    size
    frequency of use
    importance
    initial loading requirements
    network conditions
    UX

• Якщо module потрібен майже одразу кожному користувачу, eager loading може бути кращим.

• Якщо module великий і використовується рідко, lazy loading часто є хорошим кандидатом.

• Основна мета code splitting:

    завантажувати
    потрібний code
    у потрібний момент

• Найважливіша практична формула:

    large application
          ↓
    logical boundaries
          ↓
    route / feature chunks
          ↓
    smaller initial bundle
          ↓
    better loading performance

• Але оптимізація повинна базуватися на вимірюваннях, а не на принципі:

    "чим більше lazy,
     тим краще".

• Для React Router code splitting особливо важливо розуміти три речі:

    React.lazy()
        → lazy component

    <Suspense>
        → loading fallback

    route.lazy
        → lazy route module

• У підсумку:

    Code Splitting
        ↓
    Dynamic import
        ↓
    Chunks
        ↓
    Lazy loading
        ↓
    Suspense / loading UI
        ↓
    Route-level optimization
        ↓
    Better initial loading