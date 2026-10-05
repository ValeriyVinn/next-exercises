## 05. `lazy` and `Suspense`

`lazy` та `Suspense` — інструменти React для **відкладеного завантаження компонентів** та керування UI під час очікування.

Вони допомагають реалізувати:

- code splitting;
- lazy loading компонентів;
- зменшення початкового JavaScript bundle;
- завантаження важких компонентів лише тоді, коли вони потрібні;
- fallback UI під час завантаження;
- завантаження сторінок або великих частин інтерфейсу окремими chunks.

Головна ідея:

> Не завантажуй весь застосунок одразу, якщо частину коду користувач може побачити лише пізніше.

Наприклад, якщо застосунок має:

- Dashboard;
- Settings;
- Admin panel;
- Reports;
- Editor;

немає необхідності завантажувати код `AdminPanel`, якщо користувач ніколи не відкриває адміністративну сторінку.

---

### Ключові поняття

- `lazy()` — дозволяє завантажувати компонент динамічно.
- `Suspense` — показує fallback, поки lazy-компонент завантажується.
- `import()` — динамічний ES module import.
- code splitting — розділення JavaScript bundle на окремі chunks.
- chunk — окремий файл JavaScript, який може бути завантажений пізніше.
- fallback — UI, який показується під час очікування.
- `Suspense boundary` — область UI, яку контролює конкретний `Suspense`.
- lazy loading — завантаження ресурсу лише тоді, коли він потрібен.
- `React.lazy()` — lazy loading саме React-компонента.
- `Suspense` не завантажує компонент самостійно — він визначає, що показувати під час очікування.

---

### Що потрібно пам'ятати

1. `lazy()` використовується для відкладеного завантаження компонента.
2. `lazy()` зазвичай працює разом із `Suspense`.
3. `Suspense` показує `fallback`, поки дочірній компонент ще не готовий.
4. `lazy()` використовує dynamic `import()`.
5. Lazy component зазвичай має бути default export.
6. `Suspense` не є синонімом `lazy`.
7. `Suspense` може використовуватися не тільки з `lazy`, але для навчання найпростіший приклад — саме `lazy + Suspense`.
8. Lazy loading зменшує початковий JavaScript bundle.
9. Lazy loading не означає, що код ніколи не завантажиться.
10. Код завантажиться тоді, коли React реально знадобиться компонент.
11. `fallback` повинен бути простим і зрозумілим для користувача.
12. Не потрібно робити lazy loading абсолютно кожного компонента.
13. Дуже маленькі компоненти зазвичай немає сенсу lazy-load.
14. Lazy loading особливо корисний для великих сторінок, редакторів, графіків, адмін-панелей тощо.
15. Для route-level code splitting lazy loading часто є дуже природним рішенням.
16. `Suspense` визначає межу, в якій може відображатися fallback.
17. Можна мати декілька `Suspense` boundaries.
18. Хороші boundaries допомагають зробити UX плавнішим.
19. `lazy()` повертає спеціальний React-компонент.
20. `lazy()` не замінює `memo`, `useMemo` або `useCallback`.

---

# 1. Проблема великого JavaScript bundle

Уявімо великий застосунок:

    App
    ├── Home
    ├── Dashboard
    ├── Reports
    ├── Settings
    ├── Admin
    └── Editor

Без code splitting браузер може отримати великий JavaScript bundle:

    app.js
    └── весь код застосунку

Навіть якщо користувач відкрив тільки:

    Home

він потенційно завантажує код:

    Dashboard
    Reports
    Settings
    Admin
    Editor

Це може бути неефективно.

---

# 2. Code Splitting

**Code splitting** — це розділення JavaScript-коду на окремі частини.

Наприклад:

    app.js
    dashboard.js
    reports.js
    admin.js
    editor.js

Тоді початкове завантаження може бути приблизно таким:

    app.js
    └── Home

А коли користувач відкриє Reports:

    reports.js

буде завантажений окремо.

---

# 3. Lazy Loading

**Lazy loading** означає:

> Завантажити ресурс не зараз, а тоді, коли він стане потрібним.

Наприклад:

    Користувач відкриває Home
            ↓
    Home завантажується
            ↓
    Admin не завантажується
            ↓
    Користувач відкриває Admin
            ↓
    Admin chunk завантажується
            ↓
    Admin відображається

Це дозволяє зменшити початкове навантаження.

---

# 4. `React.lazy()`

React надає спеціальну функцію:

    lazy()

Вона дозволяє оголосити компонент, який буде завантажуватися пізніше.

Синтаксис:

    const Component = lazy(() => import("./Component"));

Наприклад:

    import { lazy } from "react";

    const AdminPage = lazy(() => import("./AdminPage"));

Тепер `AdminPage` не обов'язково потрапить у початковий bundle.

---

# 5. Dynamic `import()`

Основа `lazy()` — динамічний import.

Звичайний import:

    import AdminPage from "./AdminPage";

Такий import є статичним.

Компонент підключається під час побудови модуля.

---

Динамічний import:

    import("./AdminPage");

Він повертає Promise:

    import("./AdminPage")
        .then(module => {
            // module
        });

Тобто браузер може завантажити модуль пізніше.

---

# 6. `lazy()` + `import()`

Класична конструкція:

    const AdminPage = lazy(() => import("./AdminPage"));

Логіка:

    lazy()
       ↓
    import()
       ↓
    завантаження chunk
       ↓
    компонент
       ↓
    React render

---

# 7. Простий приклад

Файл:

    AdminPage.tsx

    export default function AdminPage() {
        return (
            <section>
                <h1>Admin</h1>
                <p>Admin dashboard</p>
            </section>
        );
    }

Батьківський компонент:

    import { lazy } from "react";

    const AdminPage = lazy(() => import("./AdminPage"));

    export default function App() {
        return (
            <main>
                <AdminPage />
            </main>
        );
    }

Але тут виникає проблема.

React повинен знати:

> Що показувати, поки `AdminPage` завантажується?

Для цього використовується `Suspense`.

---

# 8. `Suspense`

`Suspense` дозволяє показати fallback UI під час очікування.

Імпорт:

    import { Suspense } from "react";

Приклад:

    <Suspense fallback={<p>Loading...</p>}>
        <AdminPage />
    </Suspense>

Якщо `AdminPage` ще завантажується:

    Loading...

Після завантаження:

    Admin

---

# 9. Повний приклад `lazy + Suspense`

    import { lazy, Suspense } from "react";

    const AdminPage = lazy(() => import("./AdminPage"));

    export default function App() {
        return (
            <main>
                <Suspense fallback={<p>Loading...</p>}>
                    <AdminPage />
                </Suspense>
            </main>
        );
    }

Схема:

    App
      ↓
    Suspense
      ↓
    AdminPage
      ↓
    lazy()
      ↓
    import()
      ↓
    chunk
      ↓
    AdminPage

---

# 10. Що робить `fallback`

`fallback` — це UI, який React показує, коли дочірній компонент ще не готовий.

Наприклад:

    <Suspense fallback={<p>Loading...</p>}>
        <AdminPage />
    </Suspense>

Поки компонент завантажується:

    Loading...

Після завантаження:

    AdminPage

---

# 11. Fallback може бути компонентом

Не обов'язково використовувати простий `<p>`.

Можна створити:

    function Loader() {
        return <div>Loading...</div>;
    }

І:

    <Suspense fallback={<Loader />}>
        <AdminPage />
    </Suspense>

---

# 12. Fallback може бути складнішим

Наприклад:

    function PageLoader() {
        return (
            <div className="page-loader">
                <div className="spinner" />
                <p>Завантаження сторінки...</p>
            </div>
        );
    }

Використання:

    <Suspense fallback={<PageLoader />}>
        <AdminPage />
    </Suspense>

---

# 13. `Suspense` не є loader

Важлива різниця.

`Suspense`:

    <Suspense fallback={...}>

не є самим loader.

`Suspense` — це механізм React, який визначає:

> Якщо дочірній UI ще не готовий — покажи fallback.

А fallback — це вже конкретний UI.

---

# 14. `Suspense` boundary

Ось це:

    <Suspense fallback={<Loader />}>
        <AdminPage />
    </Suspense>

називається **Suspense boundary**.

Boundary визначає область, для якої існує fallback.

---

# 15. Один великий `Suspense`

Можна зробити:

    <Suspense fallback={<PageLoader />}>
        <Header />
        <Sidebar />
        <MainContent />
        <Footer />
    </Suspense>

Тоді fallback може стосуватися великої частини UI.

Але це не завжди найкращий UX.

---

# 16. Кілька `Suspense`

Можна створити кілька boundaries:

    <Header />

    <Suspense fallback={<SidebarLoader />}>
        <Sidebar />
    </Suspense>

    <Suspense fallback={<ContentLoader />}>
        <MainContent />
    </Suspense>

    <Footer />

Тоді окремі частини інтерфейсу можуть мати власний loading state.

---

# 17. Великий boundary vs маленькі boundaries

Великий boundary:

    <Suspense fallback={<PageLoader />}>
        <Sidebar />
        <Content />
        <Comments />
    </Suspense>

Перевага:

- простіше.

Недолік:

- fallback може приховати занадто багато UI.

---

Менші boundaries:

    <Sidebar />

    <Suspense fallback={<ContentLoader />}>
        <Content />
    </Suspense>

    <Suspense fallback={<CommentsLoader />}>
        <Comments />
    </Suspense>

Перевага:

- кращий UX;
- частини сторінки можуть з'являтися незалежно.

---

# 18. Lazy component повинен мати `default export`

Найпростіший варіант:

    // AdminPage.tsx

    export default function AdminPage() {
        return <h1>Admin</h1>;
    }

І:

    const AdminPage = lazy(() => import("./AdminPage"));

---

# 19. Чому `default export`?

`lazy()` очікує Promise, який повертає модуль із компонентом у полі `default`.

Тобто:

    import("./AdminPage")

повинен дати щось на кшталт:

    {
        default: AdminPage
    }

---

# 20. Якщо компонент має named export

Наприклад:

    export function AdminPage() {
        return <h1>Admin</h1>;
    }

Тоді простий варіант:

    const AdminPage = lazy(() => import("./AdminPage"));

не відповідає очікуваному формату.

Можна перетворити named export:

    const AdminPage = lazy(() =>
        import("./AdminPage").then(module => ({
            default: module.AdminPage
        }))
    );

Але для простоти часто зручно використовувати:

    export default function AdminPage() {
        ...
    }

---

# 21. Lazy loading сторінок

Один із найпрактичніших сценаріїв:

    Home
    Dashboard
    Settings
    Admin

Наприклад:

    const Dashboard = lazy(() => import("./pages/Dashboard"));
    const Settings = lazy(() => import("./pages/Settings"));
    const Admin = lazy(() => import("./pages/Admin"));

---

# 22. Lazy loading разом із умовним рендерингом

Наприклад:

    import { lazy, Suspense, useState } from "react";

    const AdminPage = lazy(() => import("./AdminPage"));

    export default function App() {
        const [isAdminOpen, setIsAdminOpen] = useState(false);

        return (
            <>
                <button onClick={() => setIsAdminOpen(true)}>
                    Open Admin
                </button>

                {isAdminOpen && (
                    <Suspense fallback={<p>Loading Admin...</p>}>
                        <AdminPage />
                    </Suspense>
                )}
            </>
        );
    }

Тут Admin може бути завантажений тільки тоді, коли він реально потрібен.

---

# 23. Lazy loading модального вікна

Це дуже хороший практичний сценарій.

Припустимо, модальне вікно велике:

    const UserEditor = lazy(() => import("./UserEditor"));

Тоді:

    {isEditorOpen && (
        <Suspense fallback={<p>Loading editor...</p>}>
            <UserEditor />
        </Suspense>
    )}

Користувач не відкриває редактор:

    UserEditor
    ↓
    не потрібен

Користувач відкрив редактор:

    UserEditor
    ↓
    завантажується

---

# 24. Lazy loading важкого редактора

Наприклад:

- Markdown editor;
- rich text editor;
- image editor;
- code editor.

Замість:

    import Editor from "./Editor";

можна:

    const Editor = lazy(() => import("./Editor"));

І:

    <Suspense fallback={<EditorLoader />}>
        <Editor />
    </Suspense>

Це особливо корисно, якщо редактор має великий bundle.

---

# 25. Lazy loading графіків

Графіки також можуть бути важкими.

Наприклад:

    const AnalyticsChart = lazy(
        () => import("./AnalyticsChart")
    );

Використання:

    <Suspense fallback={<ChartLoader />}>
        <AnalyticsChart />
    </Suspense>

Якщо користувач не відкриває Analytics, код графіка може не бути потрібний одразу.

---

# 26. Lazy loading Admin Panel

Типовий production-сценарій:

    const AdminPanel = lazy(
        () => import("./pages/AdminPanel")
    );

    <Suspense fallback={<PageLoader />}>
        <AdminPanel />
    </Suspense>

Це особливо логічно, якщо адміністративний UI великий і доступний невеликій кількості користувачів.

---

# 27. Lazy loading routes

Один із найважливіших сценаріїв — розділяти код за маршрутами.

Наприклад:

    /
    /dashboard
    /settings
    /admin
    /reports

Кожна сторінка може бути окремим chunk.

Приклад:

    const Home = lazy(() => import("./pages/Home"));
    const Dashboard = lazy(() => import("./pages/Dashboard"));
    const Settings = lazy(() => import("./pages/Settings"));
    const Reports = lazy(() => import("./pages/Reports"));

---

# 28. React Router + `lazy`

У сучасних застосунках lazy loading часто поєднують із router.

Концептуально:

    route
       ↓
    lazy component
       ↓
    Suspense
       ↓
    page

Наприклад:

    const ReportsPage = lazy(
        () => import("./pages/ReportsPage")
    );

    <Suspense fallback={<PageLoader />}>
        <ReportsPage />
    </Suspense>

---

# 29. Що відбувається під час завантаження

Умовно:

    User
      ↓
    відкриває Reports
      ↓
    React render ReportsPage
      ↓
    chunk ще не завантажений
      ↓
    Suspense fallback
      ↓
    browser завантажує chunk
      ↓
    module готовий
      ↓
    React повторно показує ReportsPage

---

# 30. `lazy()` не означає "render пізніше"

Це важлива різниця.

`lazy()` стосується **завантаження коду**.

Він не означає:

> Не render компонент зараз, але завантаж код.

Він означає:

> Не завантажуй код компонента, поки він не знадобиться.

---

# 31. `lazy()` vs conditional rendering

Це різні речі.

Conditional rendering:

    {isOpen && <Modal />}

визначає:

> Чи потрібно render компонент?

Lazy loading:

    const Modal = lazy(() => import("./Modal"));

визначає:

> Коли потрібно завантажити код компонента?

Їх можна комбінувати:

    {isOpen && (
        <Suspense fallback={<Loader />}>
            <Modal />
        </Suspense>
    )}

---

# 32. `lazy()` vs dynamic `import()`

`import()`:

    import("./AdminPage")

це JavaScript-механізм динамічного завантаження модуля.

`lazy()`:

    lazy(() => import("./AdminPage"))

адаптує цей механізм до React-компонента.

---

# 33. `lazy()` не завантажує кожен раз заново

Після того як модуль завантажений, він зазвичай кешується module system / bundler.

Тобто:

    Open Admin
        ↓
    chunk завантажився

Потім:

    Close Admin
        ↓
    Open Admin

не означає обов'язково повторне завантаження того самого JavaScript-файлу.

---

# 34. Lazy loading і network

Основна перевага:

Без code splitting:

    initial request
        ↓
    великий bundle
        ↓
    багато JavaScript

З code splitting:

    initial request
        ↓
    менший bundle
        ↓
    потрібний chunk
        ↓
    завантажується пізніше

---

# 35. Lazy loading і performance

Lazy loading може покращити:

- initial load;
- кількість JavaScript, яку потрібно завантажити одразу;
- час до інтерактивності в деяких сценаріях;
- використання мережі;
- startup performance.

Але:

> Lazy loading не робить весь застосунок автоматично швидшим.

---

# 36. Коли lazy loading може нашкодити UX

Уявімо:

    Home
      ↓
    User clicks
      ↓
    chunk request
      ↓
    loading
      ↓
    component

Користувач може побачити затримку.

Тому важливо мати:

    <Suspense fallback={<Loader />}>

або використовувати preloading / інші стратегії там, де це виправдано.

---

# 37. Не потрібно lazy-load усе

Поганий підхід:

    const Button = lazy(() => import("./Button"));
    const Input = lazy(() => import("./Input"));
    const Card = lazy(() => import("./Card"));
    const Icon = lazy(() => import("./Icon"));

Для маленьких компонентів це часто створює більше складності, ніж користі.

---

# 38. Що зазвичай добре lazy-load

Хороші кандидати:

- великі сторінки;
- routes;
- admin sections;
- charts;
- editors;
- rich text editors;
- великі модальні вікна;
- складні wizard-компоненти;
- рідко використовувані функції;
- важкі third-party UI modules.

---

# 39. Що зазвичай не варто lazy-load

Зазвичай немає сенсу:

- маленькі кнопки;
- прості input;
- прості labels;
- маленькі icons;
- базові layout components;
- Header;
- Footer;
- дуже часто використовувані компоненти.

---

# 40. `Suspense` і вкладені boundaries

Можна вкладати `Suspense`.

    <Suspense fallback={<PageLoader />}>
        <Page>
            <Suspense fallback={<ChartLoader />}>
                <Chart />
            </Suspense>
        </Page>
    </Suspense>

Тоді:

- зовнішній boundary відповідає за великий UI;
- внутрішній — за Chart.

---

# 41. Приклад вкладених boundaries

    <Suspense fallback={<p>Loading page...</p>}>
        <Dashboard>

            <Suspense fallback={<p>Loading chart...</p>}>
                <AnalyticsChart />
            </Suspense>

            <Suspense fallback={<p>Loading comments...</p>}>
                <Comments />
            </Suspense>

        </Dashboard>
    </Suspense>

Це дозволяє будувати більш granular loading UI.

---

# 42. `Suspense` і UX

Поганий fallback:

    <Suspense fallback={<div>...</div>}>

Користувач не розуміє:

- що відбувається;
- скільки чекати;
- яка частина UI завантажується.

Краще:

    <Suspense fallback={<ChartSkeleton />}>
        <AnalyticsChart />
    </Suspense>

---

# 43. Skeleton UI

Skeleton часто виглядає краще за загальний spinner.

Наприклад:

    function ChartSkeleton() {
        return (
            <div className="chart-skeleton">
                <div className="skeleton-title" />
                <div className="skeleton-chart" />
            </div>
        );
    }

І:

    <Suspense fallback={<ChartSkeleton />}>
        <AnalyticsChart />
    </Suspense>

---

# 44. Spinner vs Skeleton

Spinner:

    Loading...

або:

    ⟳

Skeleton:

    ┌──────────────────────┐
    │ █████████            │
    │                      │
    │ ███████████████████  │
    │ ███████████████      │
    └──────────────────────┘

Skeleton часто краще показує структуру майбутнього UI.

---

# 45. `Suspense` boundary — це UX-рішення

Boundary потрібно розташовувати не тільки з технічної точки зору.

Потрібно думати:

> Яку частину UI користувач повинен продовжувати бачити?

Наприклад:

    Header
    Sidebar
    Main content

Не обов'язково ховати весь екран, якщо завантажується лише Main content.

---

# 46. Поганий приклад

    <Suspense fallback={<FullScreenLoader />}>
        <Header />
        <Sidebar />
        <MainContent />
        <Footer />
    </Suspense>

Якщо завантажується тільки MainContent, користувач може втратити весь інтерфейс.

---

# 47. Кращий підхід

    <Header />

    <Sidebar />

    <Suspense fallback={<MainContentSkeleton />}>
        <MainContent />
    </Suspense>

    <Footer />

Тепер Header і Sidebar залишаються доступними.

---

# 48. `lazy` компонент і props

Lazy component працює як звичайний React component.

Наприклад:

    const UserProfile = lazy(
        () => import("./UserProfile")
    );

Передача props:

    <Suspense fallback={<p>Loading...</p>}>
        <UserProfile userId={userId} />
    </Suspense>

---

# 49. Lazy component зі state

Lazy component може мати власний state:

    export default function Editor() {
        const [value, setValue] = useState("");

        return (
            <textarea
                value={value}
                onChange={event => setValue(event.target.value)}
            />
        );
    }

Lazy loading не змінює звичайні правила state.

---

# 50. Lazy component зі своїми hooks

У lazy component можна використовувати:

- `useState`;
- `useEffect`;
- `useMemo`;
- `useCallback`;
- `useRef`;
- custom hooks;
- context.

Наприклад:

    export default function ReportsPage() {
        const [reports, setReports] = useState([]);

        return (
            <section>
                ...
            </section>
        );
    }

---

# 51. Lazy loading не замінює data fetching

Важливо розділяти:

**Code loading:**

    lazy(() => import("./Reports"));

**Data loading:**

    fetch("/api/reports");

Це різні проблеми.

Можна мати:

    component code
          +
    API data

і вони можуть завантажуватися незалежно.

---

# 52. Code splitting vs data fetching

Code splitting:

> Коли завантажити JavaScript-код?

Data fetching:

> Коли отримати дані з сервера?

Наприклад:

    User opens Reports
          ↓
    load Reports component
          ↓
    component starts API request
          ↓
    load reports data
          ↓
    render reports

---

# 53. Lazy loading і помилки

Що буде, якщо chunk не завантажився?

Наприклад:

- немає мережі;
- server error;
- chunk missing;
- deployment mismatch;
- network interruption.

`Suspense` відповідає за **очікування**, але не є повноцінною системою обробки помилок.

Для помилок потрібні error boundaries / інша error handling логіка.

---

# 54. `Suspense` vs Error Boundary

`Suspense`:

    Loading...

Error Boundary:

    Something went wrong.

Тобто концептуально:

    loading
       ↓
    Suspense

    error
       ↓
    Error Boundary

---

# 55. Концептуальна схема

    Component
         │
         ├── ready
         │      ↓
         │    render
         │
         ├── loading
         │      ↓
         │    Suspense fallback
         │
         └── error
                ↓
             Error Boundary

---

# 56. `lazy` + Error Boundary

У production-застосунку можна комбінувати:

    <ErrorBoundary fallback={<ErrorPage />}>
        <Suspense fallback={<PageLoader />}>
            <AdminPage />
        </Suspense>
    </ErrorBoundary>

Логіка:

    loading → PageLoader

    error → ErrorPage

    success → AdminPage

---

# 57. Lazy loading і React Router

Для великих застосунків route-level splitting є одним із найпрактичніших варіантів.

Наприклад:

    /dashboard
    /reports
    /settings
    /admin

Кожен route може мати окремий chunk.

Умовно:

    app.js

    dashboard.chunk.js
    reports.chunk.js
    settings.chunk.js
    admin.chunk.js

---

# 58. Приклад структури

    src/
    ├── app/
    │   ├── App.tsx
    │   └── routes/
    │       ├── HomePage.tsx
    │       ├── DashboardPage.tsx
    │       ├── ReportsPage.tsx
    │       └── AdminPage.tsx
    │
    └── components/
        ├── Header.tsx
        └── Loader.tsx

У `App.tsx`:

    const DashboardPage = lazy(
        () => import("./routes/DashboardPage")
    );

    const ReportsPage = lazy(
        () => import("./routes/ReportsPage")
    );

---

# 59. Практичний route-level приклад

    import { lazy, Suspense } from "react";

    const DashboardPage = lazy(
        () => import("./pages/DashboardPage")
    );

    const ReportsPage = lazy(
        () => import("./pages/ReportsPage")
    );

    export default function App() {
        const path = window.location.pathname;

        return (
            <Suspense fallback={<p>Loading page...</p>}>
                {path === "/dashboard" && <DashboardPage />}

                {path === "/reports" && <ReportsPage />}
            </Suspense>
        );
    }

Це спрощений приклад.

У реальному застосунку для routing зазвичай використовують React Router або framework routing.

---

# 60. `Suspense` навколо всього App

Можна:

    function App() {
        return (
            <Suspense fallback={<AppLoader />}>
                <Router />
            </Suspense>
        );
    }

Це просто, але fallback може замінити весь application UI.

Для складного UI краще продумати boundaries.

---

# 61. `Suspense` навколо route outlet

Концептуально:

    <Layout>
        <Header />

        <Suspense fallback={<PageLoader />}>
            <Outlet />
        </Suspense>
    </Layout>

Тоді:

    Layout
      ├── Header
      └── route content
              ↓
          Suspense

Header не зникає під час завантаження сторінки.

---

# 62. Lazy loading у Next.js

У Next.js також існують механізми code splitting і lazy loading.

Але важливо розуміти:

> React `lazy` — це базовий React API.

Framework може надавати додаткові можливості.

У Next.js потрібно також розуміти різницю між:

- Server Components;
- Client Components;
- `dynamic()`;
- streaming;
- Suspense.

Тобто `React.lazy()` — не єдиний механізм lazy loading у Next.js.

---

# 63. `Suspense` і Server Components

У сучасному React `Suspense` має ширше значення, ніж просто:

    lazy() + loading spinner

Він також може використовуватися для сценаріїв streaming і асинхронного UI у сучасних React-фреймворках.

Тому:

> `Suspense` — це загальний механізм React для декларативного очікування UI.

Для базового React найпростіший сценарій:

    lazy + Suspense

---

# 64. `lazy()` не потрібно викликати всередині компонента

Погано:

    function App() {
        const AdminPage = lazy(
            () => import("./AdminPage")
        );

        return (
            <Suspense fallback={<p>Loading...</p>}>
                <AdminPage />
            </Suspense>
        );
    }

Краще оголосити lazy component на рівні модуля:

    const AdminPage = lazy(
        () => import("./AdminPage")
    );

    function App() {
        return (
            <Suspense fallback={<p>Loading...</p>}>
                <AdminPage />
            </Suspense>
        );
    }

---

# 65. Чому `lazy()` на рівні модуля

Компонент:

    const AdminPage = lazy(
        () => import("./AdminPage")
    );

має стабільну identity між render.

Це відповідає нормальній моделі React component definition.

---

# 66. Поганий pattern

Не потрібно:

    function Parent() {
        const LazyChild = lazy(() => import("./Child"));

        return <LazyChild />;
    }

Це створює нове lazy definition під час render.

Правильніше:

    const LazyChild = lazy(() => import("./Child"));

    function Parent() {
        return <LazyChild />;
    }

---

# 67. `lazy()` і повторний render

Правильно оголошений lazy component:

    const Reports = lazy(() => import("./Reports"));

не створюється заново при кожному render `App`.

При:

    function App() {
        const [count, setCount] = useState(0);

        return (
            <>
                <button onClick={() => setCount(count + 1)}>
                    {count}
                </button>

                <Reports />
            </>
        );
    }

`Reports` залишається тим самим React component definition.

---

# 68. `lazy()` vs `useMemo`

Не потрібно:

    const LazyComponent = useMemo(
        () => lazy(() => import("./Component")),
        []
    );

Це неправильний напрямок.

`lazy()` сам призначений для створення lazy component.

Просто:

    const LazyComponent = lazy(
        () => import("./Component")
    );

---

# 69. `lazy()` vs `useCallback`

`useCallback`:

    const handleClick = useCallback(
        () => {
            ...
        },
        []
    );

зберігає identity функції.

`lazy`:

    const Admin = lazy(
        () => import("./Admin")
    );

визначає компонент із відкладеним завантаженням коду.

Це абсолютно різні задачі.

---

# 70. `lazy()` vs `memo`

`memo`:

    const Button = memo(ButtonComponent);

допомагає пропустити непотрібний render memoized component, якщо props не змінилися.

`lazy`:

    const Admin = lazy(
        () => import("./Admin")
    );

відкладає завантаження коду.

---

# 71. `lazy` + `memo`

Їх можна комбінувати, якщо є реальна причина.

Наприклад:

    const ExpensivePanel = lazy(
        () => import("./ExpensivePanel")
    );

А всередині самого lazy module:

    export default memo(function ExpensivePanel({
        items
    }) {
        return (
            <div>
                ...
            </div>
        );
    });

Але:

> `lazy` не означає автоматично `memo`.

---

# 72. `lazy` + `Suspense` + `memo`

Це три різні оптимізації:

    lazy
    ↓
    code loading

    Suspense
    ↓
    loading UI

    memo
    ↓
    render optimization

Не потрібно змішувати їх призначення.

---

# 73. Performance optimization: правильний порядок

Не починай із:

    lazy
    memo
    useMemo
    useCallback

Спочатку потрібно зрозуміти проблему.

Хороший workflow:

    1. Запустити застосунок
            ↓
    2. Виміряти performance
            ↓
    3. Знайти великий bundle / важкий route
            ↓
    4. Знайти рідко використовуваний код
            ↓
    5. Додати code splitting
            ↓
    6. Додати lazy loading
            ↓
    7. Додати Suspense boundary
            ↓
    8. Повторно виміряти

---

# 74. React DevTools Profiler

React DevTools Profiler допомагає аналізувати rendering performance.

Він відповідає на питання:

- які компоненти render;
- коли вони render;
- скільки часу це займає;
- які оновлення є дорогими.

Але для bundle size потрібно також дивитися на build/bundler tooling.

---

# 75. React Profiler vs Bundle Analyzer

Це різні інструменти.

React Profiler:

> Наскільки дорого render UI?

Bundle analyzer:

> Який код потрапив у JavaScript bundle?

Lazy loading найчастіше пов'язаний із другим питанням.

---

# 76. Що шукати в bundle

Наприклад:

    main.js
        ├── React
        ├── Router
        ├── UI
        ├── Chart library
        ├── Editor
        └── Admin

Якщо `Editor` займає значну частину bundle, але потрібен лише на одній сторінці:

    Editor
      ↓
    кандидат для lazy loading

---

# 77. Велика бібліотека як кандидат

Наприклад, застосунок використовує:

- chart library;
- rich text editor;
- PDF viewer;
- map library.

Не обов'язково завантажувати весь код на старті.

Концептуально:

    const Reports = lazy(
        () => import("./Reports")
    );

    Reports
       ↓
    chart library
       ↓
    окремий chunk

---

# 78. Переваги `lazy`

`lazy` може:

- зменшити initial bundle;
- прискорити initial load;
- завантажувати код за потребою;
- розділяти routes;
- відкладати важкі features;
- зменшувати початкове network навантаження.

---

# 79. Недоліки `lazy`

Lazy loading також має ціну:

- більше network requests/chunks;
- можливий loading state;
- можливе відчуття затримки;
- складніша архітектура;
- потрібно продумувати boundaries;
- chunk може не завантажитися;
- занадто дрібне splitting може бути контрпродуктивним.

---

# 80. Не роби code splitting занадто дрібним

Погано:

    Button.chunk.js
    Input.chunk.js
    Card.chunk.js
    Label.chunk.js
    Icon.chunk.js

Можна отримати:

    багато маленьких chunks
          ↓
    багато network overhead
          ↓
    складніша система
          ↓
    мало реальної користі

---

# 81. Хороший баланс

Часто краще:

    App
    ├── shared UI
    ├── Home
    ├── Dashboard chunk
    ├── Reports chunk
    ├── Admin chunk
    └── Editor chunk

Тобто розділяти код на **логічні великі features**.

---

# 82. Lazy loading і shared dependencies

Якщо кілька chunks використовують одну бібліотеку, bundler може винести shared code в окремий chunk.

Наприклад:

    dashboard.chunk.js
          ↓
        charts

    reports.chunk.js
          ↓
        charts

Bundler може оптимізувати спільний код.

Точна структура chunks залежить від bundler та його налаштувань.

---

# 83. Lazy loading і preloading

Іноді ми знаємо, що компонент скоро знадобиться.

Наприклад:

    User навів курсор на кнопку Reports

Можна потенційно почати підготовку завантаження заздалегідь.

Концепція:

    користувач ще не відкрив Reports
            ↓
    але, ймовірно, відкриє
            ↓
    починаємо завантаження
            ↓
    користувач клікає
            ↓
    component уже готовий

Це називається **preloading / prefetching** залежно від конкретної стратегії.

---

# 84. Lazy loading не завжди означає максимальну швидкість

Уявімо два сценарії.

Без lazy:

    1 великий request
        ↓
    сторінка готова

З lazy:

    маленький initial request
        ↓
    user interaction
        ↓
    ще один request
        ↓
    component готовий

Другий варіант може покращити initial load, але погіршити момент переходу до конкретної функції.

Тому потрібно оптимізувати не один показник, а реальний UX.

---

# 85. `Suspense` не потрібно ставити на кожен компонент

Погано:

    <Suspense fallback={<Loader />}>
        <Button />
    </Suspense>

    <Suspense fallback={<Loader />}>
        <Input />
    </Suspense>

    <Suspense fallback={<Loader />}>
        <Card />
    </Suspense>

Якщо ці компоненти не lazy/async boundary candidates, це лише створює зайву складність.

---

# 86. Хороший Suspense boundary

Хороший boundary зазвичай відповідає:

- сторінці;
- секції;
- великому widget;
- chart;
- editor;
- comments;
- dashboard panel.

Наприклад:

    <Suspense fallback={<ChartSkeleton />}>
        <AnalyticsChart />
    </Suspense>

---

# 87. Практичний Dashboard

Уявімо:

    Dashboard
    ├── Header
    ├── Statistics
    ├── Sales Chart
    ├── Activity Chart
    └── Recent Orders

Можна зробити:

    <Dashboard>
        <Statistics />

        <Suspense fallback={<ChartSkeleton />}>
            <SalesChart />
        </Suspense>

        <Suspense fallback={<ChartSkeleton />}>
            <ActivityChart />
        </Suspense>

        <RecentOrders />
    </Dashboard>

Це дає можливість поступово показувати UI.

---

# 88. Практичний Admin Panel

    const AdminPanel = lazy(
        () => import("./AdminPanel")
    );

    function App() {
        return (
            <Suspense fallback={<AdminLoader />}>
                <AdminPanel />
            </Suspense>
        );
    }

Якщо AdminPanel великий:

    AdminPanel
        ├── Users
        ├── Roles
        ├── Reports
        ├── Audit logs
        └── Settings

його lazy loading може бути дуже доречним.

---

# 89. Практичний Editor

    const Editor = lazy(
        () => import("./Editor")
    );

    function ArticlePage() {
        const [editing, setEditing] = useState(false);

        return (
            <>
                <button onClick={() => setEditing(true)}>
                    Edit
                </button>

                {editing && (
                    <Suspense fallback={<EditorSkeleton />}>
                        <Editor />
                    </Suspense>
                )}
            </>
        );
    }

---

# 90. Практичний Modal

    const UserModal = lazy(
        () => import("./UserModal")
    );

    function UsersPage() {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <>
                <button onClick={() => setIsOpen(true)}>
                    Edit user
                </button>

                {isOpen && (
                    <Suspense fallback={<p>Loading...</p>}>
                        <UserModal />
                    </Suspense>
                )}
            </>
        );
    }

---

# 91. Lazy loading feature

Можна lazy-load не просто сторінку, а цілу feature:

    const ReportsFeature = lazy(
        () => import("./features/reports")
    );

Наприклад:

    features/
    ├── auth/
    ├── dashboard/
    ├── reports/
    └── editor/

І:

    const ReportsFeature = lazy(
        () => import("./features/reports")
    );

---

# 92. Feature-level code splitting

Це часто хороший компроміс:

    shared code
          +
    feature chunks

Наприклад:

    core
       +
    auth
       +
    dashboard
       +
    reports
       +
    admin

Користувач завантажує тільки потрібні feature chunks.

---

# 93. TypeScript і `lazy`

TypeScript зазвичай добре розуміє:

    const AdminPage = lazy(
        () => import("./AdminPage")
    );

Якщо `AdminPage` має default export:

    export default function AdminPage() {
        return <h1>Admin</h1>;
    }

типи props також зберігаються.

---

# 94. Lazy component з props у TypeScript

Наприклад:

    type UserProfileProps = {
        userId: string;
    };

    export default function UserProfile({
        userId
    }: UserProfileProps) {
        return (
            <div>
                User: {userId}
            </div>
        );
    }

Lazy:

    const UserProfile = lazy(
        () => import("./UserProfile")
    );

Використання:

    <Suspense fallback={<p>Loading...</p>}>
        <UserProfile userId="123" />
    </Suspense>

TypeScript перевірить:

    userId

---

# 95. `lazy()` і named export у TypeScript

Якщо:

    export function ReportsPage() {
        return <h1>Reports</h1>;
    }

можна:

    const ReportsPage = lazy(() =>
        import("./ReportsPage").then(module => ({
            default: module.ReportsPage
        }))
    );

Але якщо немає причини використовувати named export, default export може бути простішим для lazy components.

---

# 96. `Suspense` і children

`Suspense` приймає `children`:

    <Suspense fallback={<Loader />}>
        <Component />
    </Suspense>

Тобто він створює boundary навколо children.

---

# 97. Fallback може бути `null`

Можна:

    <Suspense fallback={null}>
        <Component />
    </Suspense>

Але це означає:

> Поки компонент завантажується — нічого не показувати.

Це може бути доречно для невеликого або непомітного UI, але часто погано для UX.

---

# 98. `fallback={null}`

Наприклад:

    <Suspense fallback={null}>
        <OptionalPanel />
    </Suspense>

Під час завантаження:

    нічого

Після завантаження:

    OptionalPanel

Потрібно використовувати свідомо.

---

# 99. `Suspense` і layout

У production UI часто потрібно залишати layout видимим:

    <Layout>
        <Header />

        <main>
            <Suspense fallback={<PageSkeleton />}>
                <Page />
            </Suspense>
        </main>
    </Layout>

Це часто краще, ніж:

    <Suspense fallback={<FullScreenLoader />}>
        <Layout />
    </Suspense>

---

# 100. `Suspense` і nested loading states

Наприклад:

    <Layout>
        <Suspense fallback={<PageSkeleton />}>
            <Page>
                <Suspense fallback={<ChartSkeleton />}>
                    <Chart />
                </Suspense>
            </Page>
        </Suspense>
    </Layout>

Можна мати:

    page loading
          +
    chart loading

окремо.

---

# 101. Що відбувається, якщо lazy component ще не готовий

Умовно React робить:

    render LazyComponent
          ↓
    component code unavailable
          ↓
    Suspense boundary catches suspension
          ↓
    fallback
          ↓
    module loads
          ↓
    render component

Це одна з основних ідей `Suspense`.

---

# 102. `Suspense` не треба плутати з `isLoading`

Звичайний state:

    const [isLoading, setIsLoading] = useState(false);

це ручне керування loading state.

`Suspense`:

    <Suspense fallback={<Loader />}>
        ...
    </Suspense>

це декларативний React-механізм для suspension.

Вони вирішують пов'язані, але не однакові задачі.

---

# 103. Звичайний loading state

Наприклад:

    function Users() {
        const [isLoading, setIsLoading] = useState(true);

        if (isLoading) {
            return <Loader />;
        }

        return <UsersList />;
    }

Тут developer сам керує:

    isLoading

---

# 104. `Suspense`

З lazy:

    const UsersList = lazy(
        () => import("./UsersList")
    );

    <Suspense fallback={<Loader />}>
        <UsersList />
    </Suspense>

Тут React керує переходом між:

    loading
        ↓
    ready

через Suspense mechanism.

---

# 105. Не змішуй поняття

Є:

    JavaScript loading
    Data loading
    Image loading
    Component rendering
    User interaction

`Suspense` може бути частиною сучасної архітектури для різних async UI сценаріїв, але не треба вважати, що:

    Suspense = будь-який loading

---

# 106. `lazy` для images?

Ні.

Для зображень існують інші механізми:

    <img loading="lazy" />

Це не React `lazy()`.

Не плутати:

    React.lazy()
    
та:

    loading="lazy"

---

# 107. `React.lazy` vs image lazy loading

`React.lazy`:

    const Chart = lazy(
        () => import("./Chart")
    );

відкладає завантаження JavaScript-модуля.

`loading="lazy"`:

    <img
        src="/photo.jpg"
        loading="lazy"
        alt="..."
    />

відкладає завантаження image resource.

---

# 108. `lazy` для компонентів, `loading="lazy"` для images

Запам'ятати:

    React.lazy()
        ↓
    component/module

    loading="lazy"
        ↓
    image

Це різні механізми.

---

# 109. Поширена помилка №1 — забути `Suspense`

Погано:

    const Admin = lazy(
        () => import("./Admin")
    );

    function App() {
        return <Admin />;
    }

Правильно:

    const Admin = lazy(
        () => import("./Admin")
    );

    function App() {
        return (
            <Suspense fallback={<p>Loading...</p>}>
                <Admin />
            </Suspense>
        );
    }

---

# 110. Поширена помилка №2 — lazy-load усе

Погано:

    const Button = lazy(() => import("./Button"));
    const Input = lazy(() => import("./Input"));
    const Card = lazy(() => import("./Card"));

Не кожен компонент заслуговує окремого chunk.

Потрібно шукати реальний performance bottleneck.

---

# 111. Поширена помилка №3 — lazy component всередині render

Погано:

    function App() {
        const Page = lazy(() => import("./Page"));

        return <Page />;
    }

Правильно:

    const Page = lazy(() => import("./Page"));

    function App() {
        return <Page />;
    }

---

# 112. Поширена помилка №4 — відсутній default export

Якщо:

    export function Page() {
        return <h1>Page</h1>;
    }

то:

    const Page = lazy(() => import("./Page"));

може не працювати так, як очікується.

Потрібно або default export:

    export default function Page() {
        return <h1>Page</h1>;
    }

або перетворення Promise:

    const Page = lazy(() =>
        import("./Page").then(module => ({
            default: module.Page
        }))
    );

---

# 113. Поширена помилка №5 — занадто великий fallback

Погано:

    <Suspense fallback={<FullScreenLoader />}>
        <SmallWidget />
    </Suspense>

Якщо завантажується лише маленький widget, не обов'язково блокувати весь екран.

Краще:

    <Suspense fallback={<WidgetSkeleton />}>
        <SmallWidget />
    </Suspense>

---

# 114. Поширена помилка №6 — відсутність loading UX

Технічно:

    <Suspense fallback={null}>
        <Reports />
    </Suspense>

може працювати.

Але користувач може подумати:

> Кнопка не працює.

Тому для важливих переходів краще показувати зрозумілий loading state.

---

# 115. Поширена помилка №7 — плутати code splitting і rendering optimization

`lazy`:

    code splitting

`memo`:

    render optimization

`useMemo`:

    value calculation caching

`useCallback`:

    function identity caching

Це різні інструменти.

---

# 116. Поширена помилка №8 — оптимізувати без вимірювання

Поганий workflow:

    "Цей компонент великий."
        ↓
    "Додам lazy."
        ↓
    "Цей теж."
        ↓
    "І цей."

Кращий workflow:

    measure
       ↓
    identify
       ↓
    optimize
       ↓
    measure again

---

# 117. Поширена помилка №9 — забути про loading transition

Якщо route переходить:

    Dashboard → Reports

і Reports lazy:

    click
      ↓
    blank
      ↓
    request
      ↓
    Reports

це може відчуватися повільно.

Потрібно мати:

    click
      ↓
    ReportsSkeleton
      ↓
    Reports

---

# 118. Поширена помилка №10 — створити занадто багато boundaries

Не потрібно:

    <Suspense>
        <A />
    </Suspense>

    <Suspense>
        <B />
    </Suspense>

    <Suspense>
        <C />
    </Suspense>

    <Suspense>
        <D />
    </Suspense>

без реальної причини.

Boundary повинен відповідати UX або architecture needs.

---

# 119. Як вибирати місце для `Suspense`

Постав собі питання:

> Що користувач може продовжувати використовувати, поки цей компонент завантажується?

Наприклад:

    Header → завжди доступний
    Sidebar → бажано доступний
    Main → може loading
    Chart → може loading

Тоді:

    Header
    Sidebar

    <Suspense>
        Main
    </Suspense>

---

# 120. `lazy` і accessibility

Loading UI також повинен бути доступним.

Наприклад, простий:

    <div role="status" aria-live="polite">
        Loading...
    </div>

може бути кращим за візуальний spinner без інформації для assistive technologies.

Приклад:

    function Loader() {
        return (
            <div role="status" aria-live="polite">
                Завантаження...
            </div>
        );
    }

---

# 121. Хороший production fallback

Наприклад:

    function PageLoader() {
        return (
            <div
                role="status"
                aria-live="polite"
            >
                <p>Завантаження сторінки...</p>
            </div>
        );
    }

Використання:

    <Suspense fallback={<PageLoader />}>
        <ReportsPage />
    </Suspense>

---

# 122. `Suspense` boundary як частина architecture

У великому застосунку можна домовитися:

    App
    ├── Layout
    │
    ├── Route boundary
    │
    ├── Feature boundary
    │
    └── Widget boundaries

Наприклад:

    Layout
       ↓
    Page Suspense
       ↓
    Dashboard
       ↓
    Chart Suspense
       ↓
    Chart

---

# 123. Практичний production-підхід

Уявімо застосунок:

    / 
    /courses
    /students
    /psychology
    /admin

Можна:

    Home
        ↓
    eager

    Courses
        ↓
    lazy

    Students
        ↓
    lazy

    Psychology
        ↓
    lazy

    Admin
        ↓
    lazy

Особливо якщо admin і psychology sections використовуються рідко.

---

# 124. Приклад для навчального LMS

У твоєму LMS можуть бути:

    Dashboard
    Courses
    Students
    Tests
    Editor
    Reports
    Admin

Логічно:

    Dashboard
        ↓
    initial

    Courses
        ↓
    route chunk

    Editor
        ↓
    lazy

    Reports
        ↓
    lazy

    Admin
        ↓
    lazy

Це вже реальний приклад застосування code splitting.

---

# 125. Lazy loading і рідко використовувані features

Особливо хороший кандидат:

    Help Center
    Admin
    Advanced Settings
    Export
    PDF Viewer
    Editor
    Analytics

Тобто:

> великий + рідко використовується

це сильний кандидат для lazy loading.

---

# 126. Просте правило

Якщо компонент:

    великий
    +
    рідко потрібний
    +
    незалежний

то:

    lazy loading

може бути хорошим рішенням.

---

# 127. Що якщо компонент маленький, але використовується часто?

Наприклад:

    Button

Він:

    маленький
    +
    використовується всюди

Lazy loading тут зазвичай не має сенсу.

---

# 128. Що якщо компонент великий і використовується завжди?

Наприклад:

    MainDashboard

Якщо він:

    великий
    +
    потрібний відразу

lazy loading може не дати очікуваного UX-покращення.

Тут потрібно вимірювати.

---

# 129. Матриця рішення

| Компонент | Розмір | Частота | Lazy? |
|---|---|---|---|
| Button | малий | часто | ❌ |
| Header | малий | часто | ❌ |
| Dashboard | великий | часто | залежить |
| Admin | великий | рідко | ✅ |
| Editor | великий | рідко | ✅ |
| Chart | великий | інколи | ✅ |
| Settings | середній | рідко | часто так |
| Icon | малий | часто | ❌ |

Головне:

> Не використовуй таблицю як абсолютне правило. Вимірювання важливіше.

---

# 130. `lazy` і initial bundle

До:

    main.js
    └── Admin + Reports + Editor

Після:

    main.js
    ├── core
    └── Home

    admin.chunk.js
    reports.chunk.js
    editor.chunk.js

Це і є одна з основних цілей code splitting.

---

# 131. Chunk не означає окремий компонент

Chunk — це не обов'язково:

    один компонент = один файл

Bundler сам визначає оптимальну структуру output chunks.

Тому думати краще:

> lazy import створює точку code splitting.

а не:

> кожен lazy component гарантовано стане одним JS-файлом.

---

# 132. Code splitting point

Наприклад:

    const Reports = lazy(
        () => import("./Reports")
    );

Dynamic import є точкою, де bundler може розділити код.

Схема:

    import("./Reports")
          ↓
    code splitting point
          ↓
    Reports chunk

---

# 133. `lazy` і tree shaking

Tree shaking та code splitting — різні оптимізації.

Tree shaking:

> видалити невикористаний код.

Code splitting:

> розділити код на chunks.

Вони можуть працювати разом.

---

# 134. Tree shaking vs code splitting

    Tree shaking
        ↓
    менше коду

    Code splitting
        ↓
    код завантажується частинами

Можна мати обидві оптимізації одночасно.

---

# 135. `lazy` не видаляє код

Якщо компонент:

    const Admin = lazy(
        () => import("./Admin")
    );

його код не зникає.

Він просто:

    не завантажується initial bundle
            ↓
    завантажується пізніше
            ↓
    коли потрібен

---

# 136. `Suspense` і повторне використання

Після завантаження lazy module React може повторно render component без повторного завантаження самого module.

Тому lazy loading не означає:

    кожен render → network request

Це було б дуже погано.

---

# 137. Lazy loading і state

Якщо lazy component unmount:

    {isOpen && <LazyComponent />}

і потім:

    isOpen = false

component буде unmount.

Його local state буде втрачений так само, як у звичайного component.

`lazy` не змінює правила React state lifecycle.

---

# 138. Lazy loading не зберігає state

Наприклад:

    {isEditorOpen && (
        <Suspense fallback={<Loader />}>
            <Editor />
        </Suspense>
    )}

Закрили:

    isEditorOpen = false

Editor unmount.

Відкрили знову:

    Editor

монтується знову.

Його state починається заново.

---

# 139. Lazy component — звичайний React component після завантаження

До завантаження:

    lazy component

Після завантаження:

    звичайний React component

Він може:

- отримувати props;
- мати state;
- мати effects;
- використовувати context;
- render children.

---

# 140. Коли `Suspense` особливо корисний

Особливо корисний для:

- route transitions;
- dashboards;
- editors;
- charts;
- large widgets;
- modals;
- admin sections;
- rarely used features.

---

# 141. Коли `Suspense` не дає користі

Якщо component:

    не suspend
    +
    не lazy
    +
    не використовує async React mechanism

то:

    <Suspense fallback={<Loader />}>
        <SimpleComponent />
    </Suspense>

може не мати практичної користі.

---

# 142. `Suspense` — не "магічна оптимізація"

Не можна просто додати:

    <Suspense fallback={<Loader />}>

і очікувати:

> застосунок став швидшим.

Потрібен компонент або async operation, який реально може suspend.

---

# 143. Правильне мислення

Не:

> Де я можу поставити Suspense?

А:

> Який UI може завантажуватися незалежно від іншого UI?

Це набагато корисніше питання.

---

# 144. Архітектура loading UI

Наприклад:

    Application
       │
       ├── Header
       │
       ├── Sidebar
       │
       └── Main
             │
             ├── Content
             │
             ├── Chart
             │
             └── Comments

Можна:

    Application
       │
       ├── Header
       ├── Sidebar
       │
       └── Suspense
             │
             └── Main
                    ├── Content
                    │
                    ├── Suspense
                    │      └── Chart
                    │
                    └── Suspense
                           └── Comments

Це дає granular loading.

---

# 145. Головний принцип `Suspense`

> Loading UI повинен відповідати структурі UI.

Не просто:

    Loading...

на весь екран.

А:

    Page skeleton
    Chart skeleton
    Comments skeleton

де це доречно.

---

# 146. `lazy` і network waterfall

Необережний code splitting може створити waterfall.

Наприклад:

    App
      ↓
    Page
      ↓
    Feature
      ↓
    Widget
      ↓
    Library

Якщо кожна частина чекає попередню, завантаження може бути повільним.

Тому code splitting треба проектувати так, щоб не створювати непотрібних послідовних network dependencies.

---

# 147. Не все потрібно розділяти незалежно

Іноді краще один chunk:

    Reports
      ├── Chart
      ├── Filters
      └── Table

ніж:

    Reports.chunk.js
    Chart.chunk.js
    Filters.chunk.js
    Table.chunk.js

Якщо всі вони завжди потрібні разом.

---

# 148. Feature chunk

Хороший підхід:

    Reports
      ↓
    reports.chunk.js

Усередині:

    Reports
    Chart
    Filters
    Table

якщо вони логічно завжди використовуються разом.

---

# 149. Lazy loading і boundaries

Code splitting:

    Reports chunk

Suspense boundary:

    <Suspense fallback={<ReportsSkeleton />}>
        <Reports />
    </Suspense>

Разом:

    chunk loading
          +
    UX loading state

---

# 150. React Compiler і `lazy`

React Compiler — окрема тема автоматичної оптимізації React code.

Важливо:

> Compiler може автоматично оптимізувати деякі rendering-related аспекти, але він не означає, що code splitting стає непотрібним.

`lazy()` вирішує іншу задачу:

    lazy
      ↓
    коли завантажувати код

А compiler optimization стосується іншого рівня.

---

# 151. `lazy` і `Suspense` — не заміна оптимізації bundle

У production потрібно дивитися на:

- bundle size;
- chunk size;
- number of chunks;
- caching;
- network waterfall;
- route usage;
- performance metrics.

`lazy` — лише один інструмент.

---

# 152. Практичний алгоритм

Якщо застосунок повільно стартує:

    1. Перевірити bundle
            ↓
    2. Знайти великі залежності
            ↓
    3. Знайти рідко використовувані features
            ↓
    4. Додати dynamic import
            ↓
    5. Використати lazy
            ↓
    6. Додати Suspense
            ↓
    7. Створити хороший fallback
            ↓
    8. Перевірити network
            ↓
    9. Перевірити UX
            ↓
    10. Повторно виміряти

---

# 153. Міні-проєкт

Створи застосунок:

    Performance Demo

Сторінки:

    Home
    Dashboard
    Reports
    Admin
    Editor

---

## Крок 1. Зробити звичайні imports

    import Home from "./pages/Home";
    import Dashboard from "./pages/Dashboard";
    import Reports from "./pages/Reports";
    import Admin from "./pages/Admin";
    import Editor from "./pages/Editor";

---

## Крок 2. Перетворити великі сторінки на lazy

    const Dashboard = lazy(
        () => import("./pages/Dashboard")
    );

    const Reports = lazy(
        () => import("./pages/Reports")
    );

    const Admin = lazy(
        () => import("./pages/Admin")
    );

    const Editor = lazy(
        () => import("./pages/Editor")
    );

---

## Крок 3. Додати Suspense

    <Suspense fallback={<PageLoader />}>
        <Dashboard />
    </Suspense>

---

## Крок 4. Зробити окремі fallbacks

    <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
    </Suspense>

    <Suspense fallback={<ReportsSkeleton />}>
        <Reports />
    </Suspense>

---

## Крок 5. Перевірити Network

Подивитися:

    DevTools
        ↓
    Network
        ↓
    JS

Перевірити:

- які chunks завантажуються;
- коли вони завантажуються;
- який chunk великий;
- який route його викликає.

---

## Крок 6. Порівняти

До:

    initial bundle
        ↓
    великий

Після:

    initial bundle
        ↓
    менший

    route chunk
        ↓
    завантажується пізніше

---

# 154. Практичний приклад цілком

    import { lazy, Suspense } from "react";

    const ReportsPage = lazy(
        () => import("./pages/ReportsPage")
    );

    function PageLoader() {
        return (
            <div role="status" aria-live="polite">
                Завантаження звітів...
            </div>
        );
    }

    export default function App() {
        return (
            <main>
                <h1>Reports</h1>

                <Suspense fallback={<PageLoader />}>
                    <ReportsPage />
                </Suspense>
            </main>
        );
    }

---

# 155. Практичний приклад із layout

    import { lazy, Suspense } from "react";

    const ReportsPage = lazy(
        () => import("./pages/ReportsPage")
    );

    export default function App() {
        return (
            <div className="layout">
                <header>
                    <h1>My App</h1>
                </header>

                <main>
                    <Suspense fallback={<p>Loading reports...</p>}>
                        <ReportsPage />
                    </Suspense>
                </main>
            </div>
        );
    }

Тут header залишається доступним.

---

# 156. Практичний приклад із двома sections

    const Chart = lazy(
        () => import("./Chart")
    );

    const Comments = lazy(
        () => import("./Comments")
    );

    function Dashboard() {
        return (
            <section>
                <h1>Dashboard</h1>

                <Suspense fallback={<p>Loading chart...</p>}>
                    <Chart />
                </Suspense>

                <Suspense fallback={<p>Loading comments...</p>}>
                    <Comments />
                </Suspense>
            </section>
        );
    }

Тепер Chart і Comments мають окремі boundaries.

---

# 157. Практичний приклад із conditional rendering

    const AdminPanel = lazy(
        () => import("./AdminPanel")
    );

    function App() {
        const [showAdmin, setShowAdmin] = useState(false);

        return (
            <>
                <button
                    onClick={() => setShowAdmin(true)}
                >
                    Open Admin
                </button>

                {showAdmin && (
                    <Suspense fallback={<p>Loading admin...</p>}>
                        <AdminPanel />
                    </Suspense>
                )}
            </>
        );
    }

Логіка:

    button
       ↓
    showAdmin = true
       ↓
    AdminPanel потрібен
       ↓
    chunk завантажується
       ↓
    fallback
       ↓
    AdminPanel

---

# 158. `lazy` і route-level splitting — головне практичне застосування

Як Junior Developer ти повинен розуміти:

    route
       ↓
    lazy component
       ↓
    Suspense
       ↓
    fallback
       ↓
    chunk

Це один із найпоширеніших сценаріїв.

---

# 159. Що потрібно вміти Junior

Ти повинен уміти:

- пояснити `lazy`;
- пояснити `Suspense`;
- написати `lazy(() => import(...))`;
- додати `Suspense`;
- створити fallback;
- зробити lazy route;
- пояснити code splitting;
- пояснити chunk;
- розуміти default export;
- відрізняти code loading від data loading;
- знати, коли lazy loading доречний.

---

# 160. Що потрібно вміти Middle

На Middle рівні:

- проектувати Suspense boundaries;
- робити route-level code splitting;
- аналізувати bundle;
- знаходити великі dependencies;
- оптимізувати loading UX;
- уникати waterfall;
- оцінювати trade-offs;
- комбінувати lazy loading із routing;
- працювати з Error Boundaries;
- використовувати skeleton UI;
- аналізувати network waterfall;
- розуміти chunk caching.

---

# 161. Що потрібно знати Senior

На Senior рівні:

- performance budgets;
- bundle architecture;
- route-level splitting;
- feature-level splitting;
- preload / prefetch стратегії;
- network waterfall;
- caching;
- chunk invalidation;
- streaming;
- Suspense architecture;
- Server Components;
- framework-specific loading strategies;
- UX trade-offs;
- performance metrics.

---

# 162. Питання зі співбесіди

### 1. Що таке `React.lazy()`?

`React.lazy()` дозволяє створити компонент, код якого завантажується динамічно через `import()` лише тоді, коли компонент потрібен.

---

### 2. Для чого потрібен `Suspense`?

`Suspense` визначає fallback UI, який React може показати, поки дочірній UI перебуває в стані очікування.

---

### 3. Чи можна використовувати `lazy()` без `Suspense`?

Для звичайного lazy component потрібно мати Suspense boundary, який може обробити його suspension і показати fallback.

Практичний pattern:

    <Suspense fallback={<Loader />}>
        <LazyComponent />
    </Suspense>

---

### 4. Що таке code splitting?

Code splitting — розділення JavaScript-коду застосунку на окремі chunks, які можуть завантажуватися незалежно.

---

### 5. Яка роль dynamic `import()`?

Він дозволяє завантажувати модуль асинхронно:

    import("./Component")

`React.lazy()` використовує цей механізм для lazy components.

---

### 6. Що таке chunk?

Chunk — частина згенерованого JavaScript-коду, яку bundler може завантажувати окремо.

---

### 7. Чи кожен lazy component обов'язково стає окремим JS-файлом?

Не потрібно мислити так буквально.

Dynamic import створює точку code splitting, а конкретна структура chunks залежить від bundler та його оптимізацій.

---

### 8. Чим `lazy` відрізняється від `memo`?

`lazy`:

    code loading

`memo`:

    render optimization

---

### 9. Чим `lazy` відрізняється від `useMemo`?

`lazy`:

    відкладене завантаження component module

`useMemo`:

    кешування результату обчислення.

---

### 10. Чим `lazy` відрізняється від `useCallback`?

`lazy` працює з code loading.

`useCallback` кешує identity функції між render.

---

### 11. Чим `Suspense` відрізняється від `isLoading`?

`isLoading` — звичайний state, яким developer керує вручну.

`Suspense` — декларативний React-механізм для suspension.

---

### 12. Для чого потрібен `fallback`?

Для відображення UI під час очікування.

Наприклад:

    <Suspense fallback={<PageLoader />}>
        <Page />
    </Suspense>

---

### 13. Чи потрібно lazy-load кожен компонент?

Ні.

Найчастіше lazy loading корисний для великих, рідко використовуваних або незалежних features.

---

### 14. Чи можна lazy-load route?

Так. Це один із найпоширеніших сценаріїв code splitting.

---

### 15. Чи можна мати кілька `Suspense`?

Так.

Це дозволяє створювати окремі loading boundaries для різних частин UI.

---

### 16. Чи можна вкладати `Suspense`?

Так.

    <Suspense fallback={<PageLoader />}>
        <Page>
            <Suspense fallback={<ChartLoader />}>
                <Chart />
            </Suspense>
        </Page>
    </Suspense>

---

### 17. Що буде, якщо lazy chunk не завантажиться?

Це вже error scenario, а не просто loading scenario.

Потрібно мати відповідну error handling strategy, наприклад Error Boundary.

---

### 18. Чи `Suspense` замінює Error Boundary?

Ні.

    Suspense
        ↓
    loading / waiting

    Error Boundary
        ↓
    errors

---

### 19. Чому lazy component часто має default export?

Тому що `React.lazy()` очікує Promise, який резолвиться в модуль із React component у `default`.

---

### 20. Чи можна lazy-load named export?

Так.

Наприклад:

    const Reports = lazy(() =>
        import("./Reports").then(module => ({
            default: module.Reports
        }))
    );

---

### 21. Чи lazy loading завжди покращує performance?

Ні.

Він може покращити initial loading, але додати затримку при першому відкритті lazy feature.

Потрібно вимірювати.

---

### 22. Що таке loading waterfall?

Це ситуація, коли ресурси завантажуються послідовно:

    A
     ↓
    B
     ↓
    C
     ↓
    D

замість можливого паралельного завантаження.

---

### 23. Чому не варто робити занадто багато маленьких chunks?

Через:

- network overhead;
- складнішу систему;
- можливі waterfalls;
- відсутність реальної performance benefit.

---

### 24. Що таке route-level code splitting?

Поділ коду за маршрутами:

    /dashboard
        ↓
    dashboard.chunk.js

    /reports
        ↓
    reports.chunk.js

---

### 25. Що таке feature-level code splitting?

Поділ коду за великими функціональними модулями:

    reports
    admin
    editor
    analytics

---

# 163. Порівняння основних React performance API

| Інструмент | Основна задача |
|---|---|
| `lazy` | відкладене завантаження component code |
| `Suspense` | fallback під час suspension |
| `memo` | пропуск непотрібного render |
| `useMemo` | кешування обчисленого значення |
| `useCallback` | кешування function reference |
| `useRef` | зберігання mutable value без render |
| Profiler | аналіз rendering performance |

---

# 164. Головна схема

    ┌───────────────────────────┐
    │      React Application    │
    └─────────────┬─────────────┘
                  │
                  ▼
            dynamic import()
                  │
                  ▼
             code split
                  │
                  ▼
                chunk
                  │
                  ▼
              React.lazy
                  │
                  ▼
              Suspense
                  │
          ┌───────┴────────┐
          │                │
          ▼                ▼
       loading           ready
          │                │
          ▼                ▼
       fallback        component

---

# 165. Міні-шпаргалка

## `lazy`

    import { lazy } from "react";

    const AdminPage = lazy(
        () => import("./AdminPage")
    );

---

## `Suspense`

    import { Suspense } from "react";

    <Suspense fallback={<p>Loading...</p>}>
        <AdminPage />
    </Suspense>

---

## Повний pattern

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

## Default export

    export default function ReportsPage() {
        return <h1>Reports</h1>;
    }

---

## Named export

    export function ReportsPage() {
        return <h1>Reports</h1>;
    }

    const ReportsPage = lazy(() =>
        import("./ReportsPage").then(module => ({
            default: module.ReportsPage
        }))
    );

---

## Lazy route

    const DashboardPage = lazy(
        () => import("./pages/DashboardPage")
    );

    <Suspense fallback={<PageLoader />}>
        <DashboardPage />
    </Suspense>

---

## Lazy modal

    const UserModal = lazy(
        () => import("./UserModal")
    );

    {isOpen && (
        <Suspense fallback={<ModalLoader />}>
            <UserModal />
        </Suspense>
    )}

---

## Lazy editor

    const Editor = lazy(
        () => import("./Editor")
    );

    <Suspense fallback={<EditorSkeleton />}>
        <Editor />
    </Suspense>

---

## Коли використовувати

    великий component
          +
    рідко потрібний
          +
    незалежний
          ↓
       lazy

---

## Коли не використовувати

    маленький component
          +
    використовується всюди
          ↓
    звичайний import

---

# 166. Шлях

### 🟢 Core

Потрібно знати:

- що таке `lazy`;
- що таке `Suspense`;
- що таке `fallback`;
- що таке code splitting;
- що таке dynamic `import()`;
- навіщо потрібні chunks;
- базовий syntax.

Базовий pattern:

    const Page = lazy(
        () => import("./Page")
    );

    <Suspense fallback={<Loader />}>
        <Page />
    </Suspense>

---

### 🔵 Junior

Потрібно вміти:

- lazy-load сторінки;
- lazy-load routes;
- створювати loading UI;
- використовувати skeleton;
- працювати з default exports;
- розуміти chunks;
- розуміти initial bundle;
- розрізняти lazy loading і data fetching;
- розрізняти `lazy`, `memo`, `useMemo`, `useCallback`;
- створювати кілька Suspense boundaries.

---

### 🟠 Middle

Потрібно вміти:

- аналізувати bundle;
- знаходити великі features;
- проектувати code splitting;
- робити route-level splitting;
- робити feature-level splitting;
- створювати granular Suspense boundaries;
- уникати loading waterfalls;
- створювати хороші loading states;
- комбінувати `Suspense` з Error Boundaries;
- оцінювати trade-offs lazy loading;
- перевіряти performance до і після оптимізації.

---

### 🔴 Senior

Потрібно розуміти:

- performance budgets;
- bundle architecture;
- chunk strategy;
- caching;
- preload;
- prefetch;
- network waterfalls;
- streaming;
- Suspense architecture;
- Server Components;
- framework-specific loading strategies;
- route-level vs feature-level splitting;
- UX implications;
- Core Web Vitals;
- performance measurement;
- trade-offs між initial load та interaction latency.

---

# 167. Найважливіші правила

### Правило №1

`lazy()` — про **відкладене завантаження коду**.

---

### Правило №2

`Suspense` — про **очікування та fallback UI**.

---

### Правило №3

Типовий pattern:

    lazy
      +
    Suspense

---

### Правило №4

`lazy` не означає:

> компонент render пізніше.

Він означає:

> код компонента завантажується пізніше.

---

### Правило №5

`Suspense` не означає:

> будь-який loading state.

Це React-механізм для suspension.

---

### Правило №6

Не lazy-load кожен маленький компонент.

---

### Правило №7

Найкращі кандидати:

    large
    +
    rarely used
    +
    independent

---

### Правило №8

Route-level code splitting — один із найпрактичніших сценаріїв.

---

### Правило №9

Не забувай про UX:

    loading
        ↓
    fallback
        ↓
    ready

---

### Правило №10

Для помилок потрібна окрема error handling strategy.

    loading → Suspense

    error → Error Boundary

---

### Правило №11

Не оптимізуй без вимірювання.

    measure
       ↓
    optimize
       ↓
    measure again

---

### Правило №12

Code splitting не означає:

> весь код повинен бути розділений на сотні chunks.

Потрібен баланс.

---

# 168. Головне:

> `React.lazy()` дозволяє завантажувати React-компонент динамічно через `import()` тоді, коли він потрібен.

> `Suspense` визначає fallback UI, який React може показати під час очікування.

> Разом вони є базовим інструментом для lazy loading та code splitting.

Запам'ятати одну схему:

    lazy()
       ↓
    dynamic import()
       ↓
    code splitting
       ↓
    chunk
       ↓
    Suspense
       ↓
    fallback
       ↓
    component

І головний performance-принцип:

    Не завантажуй усе одразу,
    якщо користувачу не потрібно все одразу.

Але ще важливіше:

    НЕ:
    "Додамо lazy всюди."

    А:
    "Що реально потрібно завантажити пізніше,
    і чи покращить це реальний UX?"

Саме так `lazy` та `Suspense` стають не просто React API, а частиною **архітектури продуктивного React-застосунку**.