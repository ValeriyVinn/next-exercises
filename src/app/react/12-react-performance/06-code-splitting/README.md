## 06. Code Splitting

**Code Splitting** — це техніка розділення JavaScript-коду застосунку на окремі частини (**chunks**), які можуть завантажуватися незалежно.

Головна ідея:

> Не потрібно завантажувати весь JavaScript-застосунок одразу, якщо користувачу на старті потрібна лише його частина.

Наприклад, великий застосунок може мати:

    Home
    Dashboard
    Courses
    Reports
    Admin
    Editor
    Settings

Якщо користувач відкриває тільки `Home`, немає великого сенсу одразу завантажувати весь код:

    Admin
    Reports
    Editor
    Settings

Code splitting дозволяє розділити застосунок:

    initial.js
    dashboard.js
    reports.js
    admin.js
    editor.js

і завантажувати додаткові chunks тоді, коли вони реально потрібні.

---

### Ключові поняття

- **Bundle** — JavaScript-код, зібраний bundler-ом для браузера.
- **Chunk** — окрема частина згенерованого JavaScript-коду.
- **Code Splitting** — поділ коду на chunks.
- **Dynamic `import()`** — механізм JavaScript для динамічного завантаження модулів.
- **Lazy Loading** — завантаження ресурсу лише тоді, коли він потрібен.
- `React.lazy()` — React API для lazy loading компонентів.
- `Suspense` — React API для fallback UI під час suspension.
- **Route-level splitting** — розділення коду за сторінками/routes.
- **Feature-level splitting** — розділення коду за великими функціональними модулями.
- **Initial bundle** — код, який потрібен для початкового запуску.
- **Network waterfall** — небажана послідовність залежних network requests.
- **Bundle analysis** — аналіз того, що потрапляє до JavaScript bundle.
- **Tree shaking** — видалення невикористаного коду.
- **Preloading** — завчасне завантаження ресурсу, який скоро знадобиться.
- **Prefetching** — завантаження ресурсу наперед, коли він, імовірно, знадобиться пізніше.

---

### Що потрібно пам'ятати

1. Code splitting розділяє JavaScript-код на частини.
2. Головна мета — зменшити обсяг коду, який потрібно завантажити спочатку.
3. Dynamic `import()` є основним механізмом створення code-splitting point.
4. `React.lazy()` використовує dynamic `import()` для lazy components.
5. `Suspense` дозволяє показати fallback під час очікування.
6. Code splitting і lazy loading — пов'язані, але не повністю тотожні поняття.
7. Route-level splitting — один із найпрактичніших сценаріїв.
8. Не потрібно розділяти кожен маленький компонент на окремий chunk.
9. Великі та рідко використовувані features — хороші кандидати для splitting.
10. Code splitting може покращити initial loading.
11. Code splitting може додати додаткові network requests.
12. Занадто дрібне splitting може погіршити performance.
13. Потрібно враховувати network waterfall.
14. Потрібно аналізувати реальний bundle.
15. Не можна оцінювати performance тільки за кількістю chunks.
16. `lazy` не робить компонент автоматично швидшим під час render.
17. Code splitting не замінює `memo`, `useMemo` або `useCallback`.
18. Code splitting не замінює оптимізацію зображень.
19. Code splitting не є data fetching.
20. Оптимізацію потрібно перевіряти вимірюваннями.

---

# 1. Проблема великого bundle

Уявімо застосунок:

    App
    ├── Home
    ├── Dashboard
    ├── Courses
    ├── Reports
    ├── Admin
    ├── Editor
    └── Settings

Без code splitting bundler може створити великий bundle:

    app.js
    └── весь JavaScript застосунку

Користувач відкриває:

    /

Але разом із Home потенційно завантажує код:

    Dashboard
    Courses
    Reports
    Admin
    Editor
    Settings

Це може бути зайвим.

---

# 2. Що робить Code Splitting

Замість:

    app.js
    └── весь application code

можна отримати:

    app.js
    dashboard.chunk.js
    courses.chunk.js
    reports.chunk.js
    admin.chunk.js
    editor.chunk.js
    settings.chunk.js

Тепер застосунок може завантажувати код частинами.

---

# 3. Initial Bundle

**Initial bundle** — код, необхідний для початкового запуску застосунку.

Наприклад:

    User opens /
          ↓
    browser downloads
          ↓
    main.js
          ↓
    Home renders

Якщо `Admin`, `Reports` і `Editor` не потрібні на Home:

    Admin
    Reports
    Editor

не обов'язково повинні бути частиною initial JavaScript.

---

# 4. Чому великий initial bundle — проблема

Великий bundle може означати:

    більше bytes
        ↓
    більше network transfer
        ↓
    більше parsing
        ↓
    більше compilation
        ↓
    більше JavaScript work
        ↓
    повільніший startup

Особливо це може бути помітно на:

- повільному інтернеті;
- мобільних пристроях;
- слабких CPU;
- великих застосунках.

---

# 5. Основна ідея

До:

    initial
       ↓
    весь application code

Після:

    initial
       ↓
    тільки необхідний code

    пізніше
       ↓
    потрібний feature chunk

---

# 6. Dynamic `import()`

JavaScript підтримує dynamic import:

    import("./Reports");

На відміну від:

    import Reports from "./Reports";

dynamic import повертає Promise.

Наприклад:

    import("./Reports")
        .then(module => {
            console.log(module);
        });

---

# 7. Static import

Звичайний import:

    import Reports from "./Reports";

означає, що модуль є статичною залежністю.

Bundler бачить цю залежність під час build.

---

# 8. Dynamic import

Dynamic import:

    import("./Reports");

означає:

> Цей модуль може бути завантажений динамічно.

Це створює можливість для code splitting.

---

# 9. Code Splitting Point

Dynamic import можна розглядати як **точку розділення коду**.

Наприклад:

    import("./Reports");

Схема:

    Application
         ↓
    dynamic import
         ↓
    splitting point
         ↓
    Reports chunk

---

# 10. Простий приклад

Замість:

    import Reports from "./Reports";

можна:

    const loadReports = () => import("./Reports");

Тепер `Reports` може бути завантажений окремо.

---

# 11. Що повертає dynamic import

Наприклад:

    import("./Reports");

повертає Promise.

Умовно:

    Promise<Module>

де module може містити:

    {
        default: Reports
    }

або named exports.

---

# 12. Code Splitting не означає lazy rendering

Це дуже важливо.

Code splitting:

> Розділяє код на chunks.

Rendering:

> Визначає, що React зараз показує.

Наприклад:

    component code
        ↓
    loaded

але component може ще не render-итися.

І навпаки:

    component потрібен
        ↓
    code ще не loaded
        ↓
    loading

---

# 13. Code Splitting + Lazy Loading

У React часто використовують:

    code splitting
        +
    lazy loading
        +
    Suspense

Схема:

    dynamic import
          ↓
    separate chunk
          ↓
    lazy component
          ↓
    Suspense
          ↓
    fallback

---

# 14. `React.lazy()`

Приклад:

    import { lazy } from "react";

    const ReportsPage = lazy(
        () => import("./ReportsPage")
    );

Це зручний React API для lazy-loaded component.

---

# 15. `Suspense`

Lazy component зазвичай використовується разом із:

    import { Suspense } from "react";

    <Suspense fallback={<p>Loading...</p>}>
        <ReportsPage />
    </Suspense>

---

# 16. Повний базовий pattern

    import { lazy, Suspense } from "react";

    const ReportsPage = lazy(
        () => import("./ReportsPage")
    );

    export default function App() {
        return (
            <Suspense fallback={<p>Loading...</p>}>
                <ReportsPage />
            </Suspense>
        );
    }

---

# 17. Code Splitting без React.lazy

Code splitting — не виключно React-механізм.

Можна використовувати:

    import("./module");

і працювати з Promise напряму.

Наприклад:

    async function loadReports() {
        const module = await import("./reports");
        return module;
    }

Тут є code splitting, але немає React `lazy`.

---

# 18. `lazy` — лише один із способів використання dynamic import

Можна:

    import("./module");

для:

- React components;
- utility modules;
- heavy libraries;
- editors;
- parsers;
- feature modules.

---

# 19. Lazy component

Для React component:

    const Editor = lazy(
        () => import("./Editor")
    );

Для звичайного JavaScript module:

    const module = await import("./module");

Тому:

    Code Splitting
          ↓
    broader concept

    React.lazy
          ↓
    React-specific usage

---

# 20. Route-Level Code Splitting

Один із найважливіших сценаріїв.

Уявімо:

    /
    /courses
    /students
    /reports
    /admin

Можна розділити:

    Home
       ↓
    initial

    Courses
       ↓
    courses chunk

    Students
       ↓
    students chunk

    Reports
       ↓
    reports chunk

    Admin
       ↓
    admin chunk

---

# 21. Чому route-level splitting логічний

Користувач, який відкриває:

    /courses

може ніколи не відкрити:

    /admin

Тому немає необхідності обов'язково завантажувати весь Admin code на старті.

---

# 22. Приклад route-level splitting

    const CoursesPage = lazy(
        () => import("./pages/CoursesPage")
    );

    const ReportsPage = lazy(
        () => import("./pages/ReportsPage")
    );

    const AdminPage = lazy(
        () => import("./pages/AdminPage")
    );

Концептуально:

    /
       ↓
    Home

    /courses
       ↓
    CoursesPage chunk

    /reports
       ↓
    ReportsPage chunk

    /admin
       ↓
    AdminPage chunk

---

# 23. Feature-Level Code Splitting

Code splitting можна робити не тільки за routes.

Наприклад:

    features/
    ├── auth/
    ├── courses/
    ├── analytics/
    ├── editor/
    └── admin/

Можна завантажувати:

    Analytics

тільки тоді, коли користувач відкрив Analytics.

---

# 24. Feature chunk

Наприклад:

    const Analytics = lazy(
        () => import("./features/analytics")
    );

Тоді:

    initial bundle
          +
    analytics chunk

Analytics може бути великим feature module.

---

# 25. Route-Level vs Feature-Level

### Route-level

    /reports
        ↓
    reports.chunk.js

### Feature-level

    Reports
       ├── Chart
       ├── Filters
       ├── Export
       └── Analytics
             ↓
        analytics chunk

Route-level часто простіший.

Feature-level може бути корисним у великих applications.

---

# 26. Component-Level Code Splitting

Можна розділяти навіть окремі великі components.

Наприклад:

    const Editor = lazy(
        () => import("./Editor")
    );

або:

    const Chart = lazy(
        () => import("./Chart")
    );

Це має сенс, якщо component:

- великий;
- рідко використовується;
- має важкі dependencies.

---

# 27. Великий Editor

Уявімо:

    ArticlePage
       ├── title
       ├── text
       ├── comments
       └── editor

Якщо editor потрібен лише при натисканні:

    Edit

можна:

    const Editor = lazy(
        () => import("./Editor")
    );

---

# 28. Lazy Editor

    {isEditing && (
        <Suspense fallback={<EditorSkeleton />}>
            <Editor />
        </Suspense>
    )}

До натискання:

    Editor code
        ↓
    може не завантажуватися

Після:

    Edit
       ↓
    Editor chunk
       ↓
    loading
       ↓
    Editor

---

# 29. Велика Chart Library

Уявімо dashboard:

    Dashboard
       ├── stats
       ├── users
       ├── chart
       └── activity

Chart library може бути великою.

Можна:

    const AnalyticsChart = lazy(
        () => import("./AnalyticsChart")
    );

Тоді chart code може бути винесений із initial path.

---

# 30. PDF Viewer

PDF viewer — хороший кандидат.

Наприклад:

    const PdfViewer = lazy(
        () => import("./PdfViewer")
    );

І:

    {showPdf && (
        <Suspense fallback={<p>Loading PDF viewer...</p>}>
            <PdfViewer />
        </Suspense>
    )}

Якщо користувач не відкриває PDF:

    PDF viewer code
        ↓
    може не знадобитися

---

# 31. Admin Panel

Admin часто є хорошим кандидатом:

    const AdminPanel = lazy(
        () => import("./AdminPanel")
    );

Тому що:

- доступний не всім;
- може бути великим;
- може містити багато таблиць;
- може мати charts;
- може містити forms;
- може використовувати багато dependencies.

---

# 32. Code Splitting і рідко використовувані features

Особливо хороша комбінація:

    large
       +
    rarely used
       +
    independent
       ↓
    code splitting candidate

---

# 33. Що не варто split-ити

Наприклад:

    Button
    Input
    Label
    Icon
    Avatar

якщо вони:

- маленькі;
- використовуються всюди;
- потрібні на старті.

Для них окремі chunks можуть бути невиправданими.

---

# 34. Надмірне code splitting

Поганий підхід:

    Button.chunk.js
    Input.chunk.js
    Card.chunk.js
    Icon.chunk.js
    Label.chunk.js
    Avatar.chunk.js

Можливі проблеми:

- багато chunks;
- багато requests;
- складніший loading;
- overhead;
- потенційні waterfalls.

---

# 35. Granularity

**Granularity** — рівень деталізації code splitting.

Занадто грубо:

    весь application
       ↓
    один bundle

Занадто дрібно:

    кожен компонент
       ↓
    окремий chunk

Хороший баланс:

    initial core
       +
    routes
       +
    large features

---

# 36. Хороша структура

Наприклад:

    initial.js

    dashboard.chunk.js
    reports.chunk.js
    admin.chunk.js
    editor.chunk.js

Це може бути логічним поділом для середнього application.

---

# 37. Не потрібно прив'язуватися до назв chunks

У production bundler може створити назви на кшталт:

    472.js
    831.js
    1024.js

або hashed names.

Не потрібно очікувати:

    admin.js

точно.

Головне:

> Code splitting створює окремі завантажувані частини.

---

# 38. Chunk hashing

У production chunks часто мають hash:

    admin.8f3a21.js

Після зміни:

    admin.91bd72.js

Це допомагає browser caching.

Старий файл може залишатися в cache, а нова версія отримує інший filename.

---

# 39. Code Splitting і caching

Уявімо:

    main.a123.js
    admin.b456.js
    reports.c789.js

Користувач уже завантажив:

    main.a123.js

При наступному відвідуванні браузер може взяти його з cache, якщо він ще валідний.

Якщо змінився лише Admin:

    admin.b456.js
        ↓
    admin.newhash.js

Не обов'язково повторно завантажувати весь application bundle.

---

# 40. Перевага стабільних chunks

Добре спроектований code splitting може допомогти caching:

    core
       ↓
    рідко змінюється

    feature chunks
       ↓
    змінюються незалежно

Це може зменшити повторне завантаження коду після deployments.

---

# 41. Code Splitting і deployment

Після deployment користувач може мати старий application shell у cache, а server вже має нові chunks.

Це створює окремий клас production-проблем:

    old app
       ↓
    requests old chunk
       ↓
    chunk no longer exists
       ↓
    loading error

Тому production applications повинні мати продуману стратегію asset caching і deployment.

---

# 42. Chunk Load Error

Наприклад:

    Failed to fetch dynamically imported module

або подібна помилка.

Причини можуть бути:

- network problem;
- deployment;
- stale cached HTML;
- removed chunk;
- CDN issue;
- server issue.

Це не просто `loading` problem.

---

# 43. Code Splitting і Error Boundary

Можна комбінувати:

    <ErrorBoundary fallback={<ErrorPage />}>
        <Suspense fallback={<PageLoader />}>
            <ReportsPage />
        </Suspense>
    </ErrorBoundary>

Схема:

    chunk loading
          ↓
    ┌───────────────┐
    │               │
    ▼               ▼
 loading          error
    │               │
    ▼               ▼
 Suspense      Error Boundary

---

# 44. Suspense не виправляє network error

`Suspense` відповідає за очікування.

Якщо chunk не може завантажитися:

    network error

це вже error handling.

Потрібно мати відповідну strategy.

---

# 45. Code Splitting і loading UX

Після splitting користувач може побачити:

    click Reports
         ↓
    request chunk
         ↓
    loading
         ↓
    Reports

Тому потрібно продумати:

- spinner;
- skeleton;
- progress indicator;
- page transition;
- preserved layout.

---

# 46. Full-screen loader

Простий варіант:

    <Suspense fallback={<FullScreenLoader />}>
        <Reports />
    </Suspense>

Перевага:

- просто.

Недолік:

- може приховати весь UI.

---

# 47. Page-level loader

Краще:

    <Layout>
        <Header />

        <Suspense fallback={<PageSkeleton />}>
            <Reports />
        </Suspense>
    </Layout>

Header залишається.

---

# 48. Section-level loader

Ще granular:

    <Dashboard>
        <Stats />

        <Suspense fallback={<ChartSkeleton />}>
            <Chart />
        </Suspense>

        <Orders />
    </Dashboard>

Тільки Chart має loading state.

---

# 49. Skeleton UI

Skeleton:

    function ChartSkeleton() {
        return (
            <div className="chart-skeleton">
                <div className="skeleton-title" />
                <div className="skeleton-content" />
            </div>
        );
    }

Використання:

    <Suspense fallback={<ChartSkeleton />}>
        <Chart />
    </Suspense>

---

# 50. Loading UI повинен відповідати компоненту

Для page:

    PageSkeleton

Для chart:

    ChartSkeleton

Для table:

    TableSkeleton

Для editor:

    EditorSkeleton

Не обов'язково використовувати один:

    Loading...

для всього application.

---

# 51. Network Waterfall

Небажаний сценарій:

    App
     ↓
    Page
     ↓
    Feature
     ↓
    Widget
     ↓
    Library

Кожен наступний ресурс чекає попередній.

Це може створити waterfall.

---

# 52. Чому waterfall поганий

Умовно:

    A = 200 ms
    B = 200 ms
    C = 200 ms
    D = 200 ms

Послідовно:

    A → B → C → D
          ≈ 800 ms

Якщо можливо:

    A
    B
    C
    D

паралельно, загальний час може бути значно меншим.

Це лише концептуальний приклад; реальний час залежить від network і browser.

---

# 53. Як уникати зайвих waterfalls

Потрібно:

- не робити надто дрібне splitting;
- завчасно завантажувати очевидні dependencies;
- групувати code, який завжди використовується разом;
- використовувати preloading/prefetching там, де це виправдано;
- аналізувати Network waterfall.

---

# 54. Code Splitting і Prefetch

Уявімо:

    User opens Courses

Ми знаємо, що після Courses він, ймовірно, відкриє:

    CourseDetails

Можна потенційно завантажити наступний chunk заздалегідь.

Схема:

    Courses
       ↓
    likely next route
       ↓
    prefetch
       ↓
    CourseDetails ready

---

# 55. Preload vs Prefetch

Спрощено:

**Preload**

> Цей ресурс скоро потрібен, завантаж його пріоритетно.

**Prefetch**

> Можливо, він знадобиться пізніше, можна завантажити наперед.

Не потрібно використовувати їх всюди.

---

# 56. Не prefetch усе

Поганий підхід:

    Home
       ↓
    prefetch everything

Тоді:

    Dashboard
    Reports
    Admin
    Editor
    Settings

знову почнуть завантажуватися, хоча користувач їх може ніколи не відкрити.

Це може звести частину переваги code splitting нанівець.

---

# 57. Code Splitting і user behavior

Хороша оптимізація враховує:

> Що користувач, найімовірніше, зробить далі?

Наприклад:

    Home
       ↓
    Courses
       ↓
    CourseDetails

Якщо 90% користувачів відкривають CourseDetails після Courses, prefetch може мати сенс.

---

# 58. Code Splitting і mobile

На mobile:

- network може бути повільнішим;
- CPU може бути слабшим;
- JavaScript parsing може коштувати дорожче;
- bandwidth може бути обмеженим.

Тому зменшення initial JavaScript часто особливо важливе.

---

# 59. Але менший initial bundle ≠ завжди кращий UX

Приклад:

    initial bundle = маленький
        ↓
    click
        ↓
    500 KB chunk
        ↓
    waiting

Користувач може відчути затримку.

Інший варіант:

    initial bundle = трохи більший
        ↓
    route ready immediately

Тому потрібен баланс.

---

# 60. Code Splitting — це trade-off

Основний trade-off:

    менший initial bundle
           VS
    додаткові requests / delayed feature loading

Тому питання:

> Чи варто переносити цей код із initial bundle?

---

# 61. Хороший кандидат

    300 KB feature
    +
    використовується 5% users
    +
    незалежний
        ↓
    сильний candidate

---

# 62. Слабкий кандидат

    5 KB component
    +
    використовується на кожній сторінці
        ↓
    слабкий candidate

---

# 63. Дуже великий component, який потрібен одразу

Наприклад:

    Dashboard
       ↓
    користувач приходить сюди завжди

Навіть якщо Dashboard великий, lazy loading може лише додати ще один loading step.

Потрібно вимірювати.

---

# 64. Code Splitting і Core Components

Core components:

    App shell
    Header
    Navigation
    Layout
    basic UI

часто залишаються в initial bundle.

Features:

    Reports
    Admin
    Editor
    Analytics

можуть бути lazy.

---

# 65. Application Shell

Application shell — мінімальний UI, який потрібен для старту:

    App
    ├── Header
    ├── Navigation
    ├── Layout
    └── Router

А feature code:

    Reports
    Admin
    Editor

може завантажуватися окремо.

---

# 66. Хороша архітектура

    Initial
    ├── React
    ├── Router
    ├── Layout
    ├── Header
    └── common UI

    Lazy
    ├── Dashboard
    ├── Reports
    ├── Admin
    └── Editor

---

# 67. Code Splitting у React Router

У routing architecture часто:

    route
      ↓
    lazy component
      ↓
    Suspense
      ↓
    route UI

Наприклад:

    const ReportsPage = lazy(
        () => import("./pages/ReportsPage")
    );

---

# 68. React Router і lazy routes

У сучасних версіях React Router існують власні route-level APIs для lazy route modules.

Але базове розуміння залишається тим самим:

    route
       ↓
    dynamic module loading
       ↓
    code splitting

Тобто спочатку потрібно добре розуміти dynamic `import()` і `React.lazy()`.

---

# 69. Frameworks і Code Splitting

Сучасні frameworks часто роблять code splitting автоматично.

Наприклад, framework може розділяти code за routes без того, щоб developer вручну писав:

    lazy(() => import(...))

Тому важливо розуміти два рівні:

    React API
       ↓
    lazy()

і:

    framework
       ↓
    automatic code splitting

---

# 70. Next.js

У Next.js code splitting частково керується framework.

Тому в Next.js потрібно розуміти:

- route splitting;
- Server Components;
- Client Components;
- dynamic imports;
- `next/dynamic`;
- Suspense;
- streaming.

Не потрібно механічно застосовувати чистий React pattern всюди.

---

# 71. `React.lazy` vs `next/dynamic`

У React:

    const Editor = lazy(
        () => import("./Editor")
    );

У Next.js можна також використовувати framework-specific API:

    const Editor = dynamic(
        () => import("./Editor")
    );

Це вже framework-level abstraction.

Головна ідея та сама:

> не завантажувати певний код у початковий шлях без необхідності.

---

# 72. Code Splitting і Server Components

У сучасному React ecosystem потрібно розуміти:

    Server Components
        +
    Client Components
        +
    code splitting

Це різні механізми оптимізації.

Server Component може не вимагати відправки свого client-side JavaScript так само, як Client Component.

Тому архітектура application впливає на JavaScript bundle ще до ручного використання lazy loading.

---

# 73. Не використовуй lazy як заміну правильній архітектурі

Якщо весь application став Client Component:

    "Додамо lazy"

не завжди вирішує проблему.

Потрібно спочатку правильно визначити:

- що має бути client-side;
- що може бути server-side;
- що реально потрібно завантажувати;
- які dependencies важкі.

---

# 74. Code Splitting і third-party dependencies

Великі dependencies часто є хорошими кандидатами для аналізу.

Наприклад:

    chart library
    editor
    map library
    PDF library
    syntax highlighter

Потрібно перевірити:

> Чи потрібна ця dependency на initial page?

Якщо ні — можна розглянути lazy loading feature, яка її використовує.

---

# 75. Lazy feature замість lazy library

Часто краще:

    const Reports = lazy(
        () => import("./Reports")
    );

а всередині:

    Reports
       ↓
    chart library

ніж намагатися вручну керувати кожним third-party module.

Bundler може оптимізувати структуру chunks.

---

# 76. Bundle Analyzer

Bundle analyzer допомагає відповісти:

> Що займає місце в JavaScript bundle?

Умовно:

    main.js
    ├── React
    ├── Router
    ├── UI
    ├── chart library
    ├── editor
    └── utilities

Якщо:

    editor

дуже великий, а використовується рідко:

    candidate for splitting

---

# 77. Що аналізувати

Потрібно дивитися:

- initial bundle size;
- chunk sizes;
- duplicated dependencies;
- large libraries;
- shared chunks;
- route chunks;
- network waterfall.

---

# 78. React DevTools Profiler і Code Splitting

Profiler відповідає на питання:

> Які компоненти довго render?

Bundle analyzer:

> Який JavaScript великий?

Network:

> Коли цей JavaScript завантажується?

Це три різні перспективи.

---

# 79. Performance debugging

Корисна схема:

    Slow startup?
         ↓
    Bundle analysis

    Slow interaction?
         ↓
    React Profiler

    Slow route loading?
         ↓
    Network tab

    Slow data?
         ↓
    API / backend analysis

---

# 80. Code Splitting і Core Web Vitals

Code splitting може впливати на performance metrics, але не можна казати:

> Code splitting автоматично покращує всі Core Web Vitals.

Результат залежить від:

- bundle;
- network;
- CPU;
- rendering;
- images;
- fonts;
- server;
- data fetching;
- architecture.

---

# 81. Initial JavaScript

Потрібно думати не тільки:

> Скільки KB має весь application?

А:

> Скільки JavaScript потрібно користувачу саме зараз?

Це одна з головних ідей code splitting.

---

# 82. Total JavaScript vs Initial JavaScript

Може бути:

    весь application
        ↓
    2 MB

але:

    initial
        ↓
    400 KB

і:

    admin
        ↓
    500 KB

    editor
        ↓
    600 KB

    reports
        ↓
    500 KB

Користувач не обов'язково повинен отримати всі 2 MB одразу.

---

# 83. Code Splitting не зменшує весь application

Важлива деталь.

Якщо:

    application = 2 MB

після splitting:

    initial = 400 KB
    admin = 500 KB
    editor = 600 KB
    reports = 500 KB

Сума все ще приблизно:

    2 MB

Code splitting змінює **коли завантажується код**, а не обов'язково його загальний обсяг.

---

# 84. Code Splitting vs Minification

Minification:

> зменшує розмір коду.

Code splitting:

> розділяє код на частини.

Tree shaking:

> видаляє невикористаний код.

Compression:

> стискає переданий код.

Це різні оптимізації.

---

# 85. Порівняння

| Техніка | Що робить |
|---|---|
| Code splitting | ділить код на chunks |
| Tree shaking | видаляє unused code |
| Minification | стискає source syntax |
| Compression | стискає network transfer |
| Lazy loading | відкладає завантаження |
| Memoization | кешує values/functions |
| Image optimization | зменшує image cost |

---

# 86. Code Splitting + Tree Shaking

Вони добре працюють разом.

Наприклад:

    application
         ↓
    tree shaking
         ↓
    remove unused code
         ↓
    code splitting
         ↓
    chunks

Але реальний build pipeline залежить від bundler.

---

# 87. Code Splitting + Compression

Наприклад:

    reports.chunk.js
          ↓
    gzip / brotli
          ↓
    network transfer

Code splitting визначає структуру chunks.

Compression зменшує bytes, які передаються мережею.

---

# 88. Code Splitting + Caching

Добре розділені chunks можуть краще кешуватися.

Наприклад:

    core.hash1.js
    reports.hash2.js
    admin.hash3.js

Змінився тільки Reports:

    core.hash1.js
        ↓
    cache

    reports.hash4.js
        ↓
    download

---

# 89. Shared Dependencies

Декілька chunks можуть використовувати спільний код:

    Dashboard
       ↓
    React

    Reports
       ↓
    React

Bundler може створити shared chunk.

Конкретна стратегія залежить від bundler.

---

# 90. Duplicate Dependencies

Потрібно також слідкувати, щоб splitting не призводив до небажаного дублювання dependencies.

Наприклад:

    chart chunk
       ↓
    library A

    reports chunk
       ↓
    library A

Bundler може оптимізувати це, але потрібно перевіряти production build.

---

# 91. Code Splitting і bundle boundaries

Хороший boundary часто відповідає:

    route
    feature
    heavy widget
    rarely used functionality

Поганий boundary:

    tiny UI component

---

# 92. Практична модель для LMS

Для навчальної LMS:

    Initial
    ├── App
    ├── Header
    ├── Navigation
    ├── Auth
    └── shared UI

    Lazy
    ├── Courses
    ├── Course Editor
    ├── Tests
    ├── Reports
    └── Admin

Це природний поділ.

---

# 93. LMS + Editor

Редактор курсу:

    Course Editor
        ├── rich text editor
        ├── image uploader
        ├── preview
        └── formatting tools

Це хороший кандидат для окремого feature chunk.

---

# 94. LMS + Reports

Reports можуть містити:

- charts;
- tables;
- filters;
- export;
- analytics.

Якщо Reports не потрібні на Home:

    Reports
        ↓
    lazy feature

---

# 95. LMS + Admin

Admin:

    Users
    Roles
    Permissions
    Audit
    Settings

Якщо тільки адміністратор використовує цей код:

    Admin
       ↓
    separate chunk

Це особливо логічний кандидат.

---

# 96. Практична модель для Psychology app

Наприклад:

    Home
    Articles
    Exercises
    Tests
    Therapist Dashboard
    Admin

Initial:

    Home
    Articles

Lazy:

    Exercises
    Tests
    Dashboard
    Admin

Залежно від реального user flow.

---

# 97. Практична модель для Parish website

Для невеликого сайту:

    Home
    About
    Schedule
    Saints
    Articles
    Gallery

Не обов'язково lazy-load кожну сторінку.

Якщо application невеликий:

    code splitting overhead
        >
    potential benefit

Тому спочатку вимірювання.

---

# 98. Коли code splitting може бути непотрібним

Якщо application:

    маленький
       +
    мало JavaScript
       +
    швидкий initial load

додавання складного lazy architecture може не дати практичної користі.

---

# 99. Performance optimization не повинна бути самоціллю

Поганий підхід:

> Усі React apps повинні мати lazy loading.

Правильний:

> Який bottleneck існує в цьому конкретному application?

---

# 100. Питання перед Code Splitting

Перед оптимізацією запитай:

1. Який initial bundle?
2. Які dependencies найбільші?
3. Які routes рідко використовуються?
4. Які features великі?
5. Які features потрібні одразу?
6. Чи є network waterfall?
7. Чи є слабкі mobile devices?
8. Чи є хороші loading states?
9. Чи є caching?
10. Чи виміряли результат після змін?

---

# 101. Алгоритм оптимізації

    1. Measure
          ↓
    2. Analyze
          ↓
    3. Identify large / rarely used code
          ↓
    4. Choose split boundary
          ↓
    5. Add dynamic import
          ↓
    6. Add loading UI
          ↓
    7. Handle errors
          ↓
    8. Test network
          ↓
    9. Test UX
          ↓
    10. Measure again

---

# 102. Крок 1 — Measure

Спочатку:

    DevTools
       ↓
    Network
       ↓
    JS

Подивитися:

- initial requests;
- sizes;
- loading times;
- chunks.

---

# 103. Крок 2 — Analyze

Знайти:

    large dependency
    large route
    rarely used feature
    expensive widget

Наприклад:

    Editor = 700 KB

---

# 104. Крок 3 — Choose boundary

Не обов'язково:

    Editor library

Можливо краще:

    Editor feature

Тобто:

    CourseEditor
       ↓
    dynamic import

---

# 105. Крок 4 — Dynamic import

    const CourseEditor = lazy(
        () => import("./CourseEditor")
    );

---

# 106. Крок 5 — Suspense

    <Suspense fallback={<EditorSkeleton />}>
        <CourseEditor />
    </Suspense>

---

# 107. Крок 6 — Error handling

Продумати:

    chunk loading error
        ↓
    Error Boundary
        ↓
    retry / reload / error UI

---

# 108. Крок 7 — Network

Перевірити:

    initial
       ↓
    page
       ↓
    chunk

Чи не виник зайвий waterfall?

---

# 109. Крок 8 — UX

Перевірити:

- чи зрозумілий loading;
- чи не зникає весь layout;
- чи не виникає flicker;
- чи швидко відкривається feature;
- чи потрібен prefetch.

---

# 110. Крок 9 — Measure Again

Порівняти:

    BEFORE

    initial JS = X
    load = Y

    AFTER

    initial JS = A
    load = B

Потім оцінити не лише цифри, а й UX.

---

# 111. Практичний приклад до/після

### До

    import Dashboard from "./Dashboard";
    import Reports from "./Reports";
    import Admin from "./Admin";
    import Editor from "./Editor";

Умовно:

    initial bundle
        ↓
    Dashboard
    Reports
    Admin
    Editor

---

### Після

    const Dashboard = lazy(
        () => import("./Dashboard")
    );

    const Reports = lazy(
        () => import("./Reports")
    );

    const Admin = lazy(
        () => import("./Admin")
    );

    const Editor = lazy(
        () => import("./Editor")
    );

Тепер application може мати окремі loading paths.

---

# 112. Повний приклад

    import { lazy, Suspense } from "react";

    const Dashboard = lazy(
        () => import("./pages/Dashboard")
    );

    const Reports = lazy(
        () => import("./pages/Reports")
    );

    const Admin = lazy(
        () => import("./pages/Admin")
    );

    function PageLoader() {
        return (
            <div role="status" aria-live="polite">
                Завантаження...
            </div>
        );
    }

    export default function App() {
        return (
            <main>
                <Suspense fallback={<PageLoader />}>
                    <Dashboard />
                </Suspense>
            </main>
        );
    }

---

# 113. Окремі boundaries

Можна:

    <Suspense fallback={<DashboardLoader />}>
        <Dashboard />
    </Suspense>

    <Suspense fallback={<ReportsLoader />}>
        <Reports />
    </Suspense>

Це дозволяє кожній частині мати власний loading UX.

---

# 114. Один boundary для route area

Або:

    <Suspense fallback={<PageLoader />}>
        <CurrentRoute />
    </Suspense>

Це простіше.

Вибір залежить від UX.

---

# 115. Один boundary vs багато

### Один

    <Suspense fallback={<PageLoader />}>
        <Page />
    </Suspense>

Плюси:

- простота;
- менше architecture overhead.

Мінуси:

- loading може блокувати всю сторінку.

---

### Багато

    <Suspense fallback={<ChartLoader />}>
        <Chart />
    </Suspense>

    <Suspense fallback={<CommentsLoader />}>
        <Comments />
    </Suspense>

Плюси:

- granular UX.

Мінуси:

- складніша architecture.

---

# 116. Code Splitting і accessibility

Loading UI повинен бути доступним.

Наприклад:

    function Loader() {
        return (
            <div
                role="status"
                aria-live="polite"
            >
                Завантаження...
            </div>
        );
    }

І:

    <Suspense fallback={<Loader />}>
        <Reports />
    </Suspense>

---

# 117. Code Splitting і SEO

Для client-side React applications потрібно окремо думати про:

- rendering strategy;
- SSR;
- SSG;
- Server Components;
- hydration.

Не можна просто сказати:

> lazy завжди поганий для SEO.

Результат залежить від framework та способу rendering.

---

# 118. Code Splitting і SSR

У SSR-застосунках code splitting має додаткові considerations:

- які chunks потрібні для route;
- як server визначає dependencies;
- як browser отримує відповідні assets;
- як працює hydration.

Framework часто бере значну частину цієї роботи на себе.

---

# 119. Code Splitting і Hydration

У сучасних React applications потрібно розрізняти:

    HTML
       ↓
    JavaScript
       ↓
    hydration

і:

    code splitting
       ↓
    який JavaScript потрібно завантажити

Це пов'язані, але різні аспекти performance.

---

# 120. Code Splitting і Server Components

Server Components можуть зменшувати кількість client JavaScript.

Тому іноді найкраща оптимізація:

    не "lazy-load component"

а:

    не відправляти цей UI як client JavaScript взагалі

у відповідних framework scenarios.

Це особливо важливо для Next.js та сучасного React ecosystem.

---

# 121. Не плутати Code Splitting з Server Components

Code splitting:

    JavaScript
       ↓
    divide into chunks

Server Components:

    component rendering model
       ↓
    частина UI може залишатися на server

Це різні рівні архітектури.

---

# 122. Code Splitting і images

Code splitting не оптимізує:

    images

Для images існують:

- responsive images;
- WebP/AVIF;
- compression;
- `loading="lazy"`;
- CDN;
- image optimization.

Не потрібно використовувати React `lazy()` для images.

---

# 123. Code Splitting і CSS

Code splitting може взаємодіяти з CSS залежно від bundler/framework.

Великі applications можуть також розділяти CSS за routes/features.

Але це окрема тема.

Головна ідея:

> JavaScript code splitting не означає автоматично оптимізований CSS.

---

# 124. Code Splitting і fonts

Fonts — ще один окремий ресурс.

Оптимізація JavaScript не вирішує:

- font loading;
- font size;
- font formats;
- preload;
- fallback fonts.

Performance — це система, а не один API.

---

# 125. Code Splitting і data fetching

Не потрібно плутати:

    dynamic import()
        ↓
    JavaScript module

і:

    fetch()
        ↓
    API data

Наприклад:

    ReportsPage code
          ↓
    lazy

    Reports data
          ↓
    fetch

Це дві окремі операції.

---

# 126. Component code + data

Повний flow:

    User opens Reports
           ↓
    Reports chunk loads
           ↓
    Reports component renders
           ↓
    API request
           ↓
    Reports data loads
           ↓
    UI ready

У реальному application порядок може бути іншим залежно від architecture.

---

# 127. Code Splitting і caching strategy

Потрібно враховувати:

- long-term caching;
- hashed filenames;
- immutable assets;
- CDN;
- cache invalidation;
- deployment strategy.

Добре спроектований build може дозволити browser повторно використовувати незмінені chunks.

---

# 128. Immutable assets

Production assets часто мають hash:

    main.abc123.js

Якщо файл не змінюється:

    browser cache
        ↓
    reuse

Якщо код змінився:

    main.def456.js

Це допомагає уникати проблем із застарілими assets.

---

# 129. Code Splitting і CDN

У великих applications chunks можуть роздаватися через CDN:

    browser
       ↓
    CDN
       ↓
    chunk

Це може покращити network delivery, але CDN не замінює правильний code splitting.

---

# 130. Performance Budget

Можна встановити правило:

    initial JavaScript
        < певного бюджету

Наприклад, команда може домовитися:

    initial JS
        ≤ target

Точне значення залежить від application.

Головна ідея:

> Performance повинна бути вимірюваною.

---

# 131. Performance regression

Сьогодні:

    initial = 400 KB

Через місяць:

    initial = 900 KB

Навіть якщо application працює, це regression.

Тому bundle size можна контролювати в CI/build process.

---

# 132. Code Splitting і CI

У production pipeline можна перевіряти:

    build
       ↓
    bundle analysis
       ↓
    size budget
       ↓
    pass / fail

Це допомагає не повернутися до величезного initial bundle.

---

# 133. Code Splitting — архітектурне рішення

У маленькому project:

    один bundle

може бути достатнім.

У великому:

    core
    routes
    features
    heavy widgets

може бути значно кращим.

Тому code splitting пов'язаний не тільки з syntax, а й з architecture.

---

# 134. Погана архітектура

    App
      ↓
    import everything
      ↓
    huge bundle
      ↓
    slow startup

---

# 135. Краща архітектура

    App Shell
       ↓
    initial code
       ↓
    route
       ↓
    feature chunk
       ↓
    optional widget

Код завантажується відповідно до user flow.

---

# 136. User Flow

Наприклад:

    Login
      ↓
    Dashboard
      ↓
    Courses
      ↓
    Course
      ↓
    Editor

Можна мати:

    Login/Dashboard
        ↓
    initial

    Courses
        ↓
    courses chunk

    Editor
        ↓
    editor chunk

Тоді користувач не платить upfront за Editor, якщо до нього не дійде.

---

# 137. Code Splitting і progressive loading

Ідея:

> Завантажувати application поступово відповідно до потреб користувача.

Наприклад:

    Step 1
    App shell

    Step 2
    current route

    Step 3
    current feature

    Step 4
    optional widget

Це називають progressive loading strategy.

---

# 138. Погана стратегія

    Browser
       ↓
    download everything
       ↓
    parse everything
       ↓
    execute everything
       ↓
    show Home

---

# 139. Краща стратегія

    Browser
       ↓
    download core
       ↓
    show Home
       ↓
    user opens Reports
       ↓
    download Reports
       ↓
    show Reports

---

# 140. Code Splitting і UX

Мета не:

> мінімізувати кількість KB будь-якою ціною.

Мета:

> дати користувачу потрібний UI якомога швидше.

Тому іноді:

    +100 KB initial

може бути кращим за:

    +500 ms loading delay

для критичної функції.

---

# 141. Найважливіше performance-питання

Не:

> Скільки chunks?

А:

> Який код потрібен користувачу зараз, а який можна безпечно завантажити пізніше?

---

# 142. Практичне завдання №1

Створи:

    Performance Demo

Сторінки:

    Home
    Dashboard
    Reports
    Admin
    Editor

Спочатку всі компоненти підключи через static imports.

---

# 143. Практичне завдання №2

Перетвори:

    Reports
    Admin
    Editor

на lazy-loaded components.

    const Reports = lazy(
        () => import("./Reports")
    );

    const Admin = lazy(
        () => import("./Admin")
    );

    const Editor = lazy(
        () => import("./Editor")
    );

---

# 144. Практичне завдання №3

Додай Suspense:

    <Suspense fallback={<PageLoader />}>
        <Reports />
    </Suspense>

---

# 145. Практичне завдання №4

Зроби різні loaders:

    PageLoader
    AdminLoader
    EditorLoader
    ChartLoader

---

# 146. Практичне завдання №5

Відкрий DevTools:

    Network
       ↓
    JS

Порівняй:

    до code splitting

і:

    після code splitting

---

# 147. Практичне завдання №6

Додай велику dependency до:

    Editor

Наприклад, editor-like feature.

Потім перевір:

    initial bundle
        ↓
    editor chunk

---

# 148. Практичне завдання №7

Зроби route-level splitting.

Наприклад:

    /
    /courses
    /reports
    /admin

Кожен route повинен мати окрему loading strategy.

---

# 149. Практичне завдання №8

Створи nested boundaries:

    Dashboard
       ├── Stats
       ├── Chart
       └── Comments

Зроби:

    Chart → ChartSkeleton

    Comments → CommentsSkeleton

---

# 150. Практичне завдання №9

Навмисно створи багато маленьких chunks.

Порівняй:

    1 large feature chunk

і:

    10 tiny chunks

Подивись Network waterfall.

Мета — побачити, що:

> Більше chunks ≠ автоматично швидше.

---

# 151. Практичне завдання №10

Зроби performance experiment.

### Варіант A

    all static imports

### Варіант B

    route-level lazy loading

### Варіант C

    route + feature splitting

Порівняй:

- initial JS;
- requests;
- loading time;
- UX.

---

# 152. Питання зі співбесіди

### 1. Що таке Code Splitting?

Code Splitting — це поділ JavaScript-коду application на окремі chunks, які можуть завантажуватися незалежно.

---

### 2. Навіщо потрібен Code Splitting?

Щоб не завантажувати весь JavaScript application одразу та зменшити initial JavaScript workload.

---

### 3. Що таке chunk?

Chunk — окрема частина JavaScript-коду, яку bundler може генерувати та завантажувати окремо.

---

### 4. Що таке dynamic `import()`?

Це JavaScript API:

    import("./module");

який повертає Promise і дозволяє завантажувати module динамічно.

---

### 5. Як dynamic import пов'язаний із Code Splitting?

Dynamic import створює точку, в якій bundler може розділити код на окремий chunk.

---

### 6. Що таке `React.lazy()`?

`React.lazy()` дозволяє створити React component, який завантажується через dynamic import тоді, коли він потрібен.

---

### 7. Для чого потрібен `Suspense`?

Для визначення fallback UI під час suspension.

Наприклад:

    <Suspense fallback={<Loader />}>
        <Page />
    </Suspense>

---

### 8. Чи є Code Splitting специфічним для React?

Ні.

Це загальна техніка JavaScript applications.

React має APIs, які роблять її зручною для component loading.

---

### 9. Що таке route-level code splitting?

Розділення JavaScript за routes:

    /dashboard
        ↓
    dashboard chunk

    /admin
        ↓
    admin chunk

---

### 10. Що таке feature-level splitting?

Розділення за функціональними модулями:

    editor
    analytics
    admin
    reports

---

### 11. Чи потрібно lazy-load кожен component?

Ні.

Малі та часто використовувані компоненти зазвичай не є хорошими кандидатами.

---

### 12. Який component хороший кандидат?

Наприклад:

    large
    +
    rarely used
    +
    independent

---

### 13. Чи Code Splitting зменшує загальний JavaScript?

Не обов'язково.

Воно перш за все змінює **коли і якими частинами код завантажується**.

Для зменшення загального коду існують також:

- tree shaking;
- dependency optimization;
- removing unused code.

---

### 14. Чи Code Splitting завжди покращує performance?

Ні.

Він може:

- зменшити initial load;

але може:

- додати requests;
- створити loading delay;
- створити waterfall.

---

### 15. Що таке network waterfall?

Послідовне завантаження залежних ресурсів:

    A
     ↓
    B
     ↓
    C

замість можливого паралельного завантаження.

---

### 16. Як уникати зайвого waterfall?

- не робити надто дрібне splitting;
- групувати code, який потрібен разом;
- використовувати prefetch/preload доречно;
- аналізувати Network;
- правильно вибирати boundaries.

---

### 17. Чим Code Splitting відрізняється від Lazy Loading?

Code splitting:

> розділяє код на chunks.

Lazy loading:

> відкладає завантаження ресурсу до моменту потреби.

У React вони часто використовуються разом.

---

### 18. Чим Code Splitting відрізняється від Tree Shaking?

Tree shaking:

> видаляє невикористаний код.

Code splitting:

> розділяє код на окремі chunks.

---

### 19. Чим Code Splitting відрізняється від Minification?

Minification:

> зменшує текстовий розмір коду.

Code splitting:

> змінює структуру завантаження коду.

---

### 20. Що таке initial bundle?

JavaScript, необхідний для початкового запуску application.

---

### 21. Що таке performance budget?

Встановлений командою допустимий бюджет для ресурсів, наприклад initial JavaScript.

---

### 22. Що робити, якщо chunk не завантажився?

Потрібно мати error handling strategy, наприклад Error Boundary, retry або reload strategy.

---

### 23. Чи `Suspense` обробляє errors?

Ні.

`Suspense` — для suspension/loading.

Для errors використовують error handling mechanisms.

---

### 24. Чому не варто робити сотні chunks?

Через:

- network overhead;
- складність;
- waterfalls;
- додаткові requests;
- можливу відсутність performance benefit.

---

### 25. Що краще: один великий bundle чи багато маленьких?

Ні те, ні інше не є універсально правильним.

Потрібен баланс:

    initial core
       +
    logical feature chunks

---

### 26. Що аналізувати після Code Splitting?

- initial JS;
- chunk sizes;
- number of requests;
- network waterfall;
- cache;
- route loading;
- UX;
- performance metrics.

---

### 27. Чи можна Code Split CSS?

Так, залежно від bundler/framework можна організувати CSS splitting, але це окрема оптимізація від JavaScript code splitting.

---

### 28. Чи можна Code Split images?

Images мають власні механізми lazy loading та optimization. `React.lazy()` для цього не використовується.

---

### 29. Чи можна Code Split third-party libraries?

Так, часто це відбувається через lazy-loading feature, яка використовує цю dependency.

---

### 30. Що важливіше за кількість chunks?

User experience і реальні performance metrics.

---

# 153. Порівняння основних понять

| Поняття | Основна задача |
|---|---|
| Code Splitting | розділити code на chunks |
| Dynamic `import()` | динамічно завантажити module |
| `React.lazy()` | lazy-load React component |
| `Suspense` | показати fallback під час suspension |
| Tree Shaking | видалити unused code |
| Minification | зменшити syntax |
| Compression | зменшити network transfer |
| Prefetch | завантажити можливий майбутній ресурс |
| Preload | завантажити скоро потрібний ресурс |
| `memo` | пропуск непотрібного render |
| `useMemo` | кешування обчисленого value |
| `useCallback` | кешування function reference |
| Profiler | аналіз render performance |
| Bundle Analyzer | аналіз складу bundle |

---

# 154. Матриця кандидатів

| Компонент | Розмір | Використання | Кандидат |
|---|---:|---:|---|
| Button | малий | часто | ❌ |
| Header | малий | часто | ❌ |
| Navigation | малий | часто | ❌ |
| Dashboard | великий | часто | ⚠️ |
| Reports | великий | рідко | ✅ |
| Admin | великий | рідко | ✅ |
| Editor | великий | інколи | ✅ |
| Chart | великий | інколи | ✅ |
| Settings | середній | рідко | ⚠️ |
| Icon | малий | часто | ❌ |

---

# 155. Правильний workflow

    User
      ↓
    Initial load
      ↓
    Application shell
      ↓
    Current route
      ↓
    Current feature
      ↓
    Optional feature
      ↓
    Optional widget

Не:

    User
      ↓
    Download everything
      ↓
    Parse everything
      ↓
    Execute everything
      ↓
    Show Home

---

# 156. Міні-шпаргалка

## Static import

    import Reports from "./Reports";

Код є статичною dependency.

---

## Dynamic import

    import("./Reports");

Може створити code splitting point.

---

## React.lazy

    const Reports = lazy(
        () => import("./Reports")
    );

Lazy-loaded React component.

---

## Suspense

    <Suspense fallback={<Loader />}>
        <Reports />
    </Suspense>

Fallback під час очікування.

---

## Route splitting

    const ReportsPage = lazy(
        () => import("./pages/ReportsPage")
    );

---

## Feature splitting

    const Analytics = lazy(
        () => import("./features/analytics")
    );

---

## Component splitting

    const Editor = lazy(
        () => import("./Editor")
    );

---

## Error handling

    <ErrorBoundary fallback={<ErrorPage />}>
        <Suspense fallback={<Loader />}>
            <Reports />
        </Suspense>
    </ErrorBoundary>

---

## Хороший кандидат

    large
      +
    rarely used
      +
    independent
      ↓
    split

---

## Поганий кандидат

    tiny
      +
    used everywhere
      ↓
    keep in initial bundle

---

# 157. Шлях

### 🟢 Core

Потрібно знати:

- що таке Code Splitting;
- що таке bundle;
- що таке chunk;
- що таке dynamic `import()`;
- що таке lazy loading;
- що таке `React.lazy`;
- що таке `Suspense`;
- що таке fallback;
- навіщо потрібен initial bundle.

Базова схема:

    dynamic import
          ↓
    chunk
          ↓
    lazy
          ↓
    Suspense
          ↓
    fallback

---

### 🔵 Junior

Потрібно вміти:

- робити lazy-loaded components;
- робити route-level splitting;
- створювати loading UI;
- використовувати skeletons;
- пояснювати chunks;
- пояснювати initial bundle;
- працювати з `React.lazy`;
- використовувати `Suspense`;
- розрізняти static і dynamic imports;
- розуміти, чому не потрібно lazy-load усе.

---

### 🟠 Middle

Потрібно вміти:

- аналізувати bundle;
- знаходити великі dependencies;
- проектувати route-level splitting;
- проектувати feature-level splitting;
- визначати правильну granularity;
- аналізувати network waterfall;
- працювати з caching;
- використовувати preload/prefetch доречно;
- створювати granular Suspense boundaries;
- працювати з chunk loading errors;
- вимірювати performance до і після optimization.

---

### 🔴 Senior

Потрібно розуміти:

- performance budgets;
- bundle architecture;
- chunk architecture;
- long-term caching;
- hashed assets;
- CDN;
- deployment consistency;
- cache invalidation;
- network waterfalls;
- preload;
- prefetch;
- route-level splitting;
- feature-level splitting;
- Server Components;
- streaming;
- SSR;
- hydration;
- framework-specific code splitting;
- performance trade-offs;
- Core Web Vitals;
- progressive loading strategies.

---

# 158. Найважливіші правила

### Правило №1

Code Splitting означає:

> розділити JavaScript application на chunks.

---

### Правило №2

Dynamic import:

    import("./module");

є одним із головних механізмів для code splitting.

---

### Правило №3

У React:

    lazy()
       +
    Suspense

є типовим pattern для lazy-loaded components.

---

### Правило №4

Не потрібно завантажувати весь application на старті, якщо частина функцій користувачу зараз не потрібна.

---

### Правило №5

Не lazy-load усе.

Особливо обережно з:

    Button
    Input
    Header
    Icon
    Layout

---

### Правило №6

Хороші кандидати:

    large
      +
    rarely used
      +
    independent

---

### Правило №7

Route-level splitting — один із найпрактичніших сценаріїв.

---

### Правило №8

Feature-level splitting корисний для великих application.

---

### Правило №9

Занадто дрібне splitting може створити:

    many chunks
       ↓
    many requests
       ↓
    waterfalls
       ↓
    worse UX

---

### Правило №10

Code splitting не обов'язково зменшує загальний JavaScript.

Він насамперед змінює:

> **коли і якими частинами завантажується код.**

---

### Правило №11

Не оцінюй optimization тільки за bundle size.

Дивись також:

- loading time;
- network;
- CPU;
- caching;
- UX;
- real user flow.

---

### Правило №12

Оптимізація:

    measure
       ↓
    change
       ↓
    measure again

---

# 159. Головне:

> **Code Splitting — це спосіб розділити JavaScript-застосунок на окремі chunks, щоб користувач не завантажував увесь код одразу.**

Основна схема:

    Application
         ↓
    split into chunks
         ↓
    initial chunk
         +
    feature chunks
         +
    route chunks
         ↓
    load when needed

У React найчастіше:

    import()
       ↓
    React.lazy()
       ↓
    Suspense
       ↓
    fallback
       ↓
    component

Головна практична ідея:

    НЕ:

    "Зробимо lazy loading всюди."

    А:

    "Який код користувачу потрібен зараз,
    а який можна безпечно завантажити пізніше?"

І ще одна дуже важлива думка:

> **Code Splitting не означає, що application став меншим. Він означає, що користувач може не платити за весь application одразу.**

Тому хороший React performance workflow виглядає так:

    measure
       ↓
    analyze bundle
       ↓
    find large / rarely used features
       ↓
    choose logical split boundary
       ↓
    dynamic import
       ↓
    lazy loading
       ↓
    Suspense
       ↓
    loading UX
       ↓
    error handling
       ↓
    analyze Network
       ↓
    measure again

А головне правило для production:

> **Завантажуй не весь application одразу, а саме той код, який потрібен користувачу зараз — і тільки тоді розділяй решту на chunks, коли це реально покращує performance та UX.**