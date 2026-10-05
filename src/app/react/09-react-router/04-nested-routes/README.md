# React Router — Nested Routes

> `react/09-react-router/04-nested-routes`

## Визначення

**Nested routes (вкладені маршрути)** — це маршрути, які знаходяться всередині іншого маршруту та відображають UI у структурі батьківського маршруту.

Наприклад:

    /dashboard
    /dashboard/profile
    /dashboard/settings
    /dashboard/orders

Тут:

    /dashboard

є батьківським маршрутом,

а:

    /dashboard/profile
    /dashboard/settings
    /dashboard/orders

є вкладеними маршрутами.

Nested routes особливо корисні для застосунків із:

- dashboard;
- особистим кабінетом;
- admin panel;
- профілем користувача;
- курсами та уроками;
- каталогами;
- налаштуваннями;
- багаторівневою навігацією.

---

# 1. Навіщо потрібні Nested Routes

Уявімо dashboard:

    /dashboard

У ньому є:

    /dashboard/profile
    /dashboard/settings
    /dashboard/orders

У всіх цих сторінок може бути спільний UI:

    ┌──────────────────────────────────┐
    │ Header                           │
    ├──────────────┬───────────────────┤
    │ Sidebar      │ Content           │
    │              │                   │
    │ Profile      │                   │
    │ Settings     │                   │
    │ Orders       │                   │
    │              │                   │
    └──────────────┴───────────────────┘

`Header` і `Sidebar` залишаються на місці.

Змінюється лише:

    Content

Саме для такого сценарію дуже добре підходять nested routes.

---

# 2. Ключові поняття

Основні поняття цієї теми:

1. Parent route
2. Child route
3. Nested route
4. `<Outlet />`
5. `<Route>`
6. `children`
7. Relative routes
8. Relative links
9. Layout route
10. `index` route
11. Nested navigation
12. Nested route parameters
13. `useOutletContext()`
14. `Outlet context`
15. Deep nesting

---

# 3. Parent Route

Батьківський маршрут:

    /dashboard

може містити дочірні маршрути:

    /dashboard/profile
    /dashboard/settings
    /dashboard/orders

У React Router це можна описати так:

    <Route path="/dashboard" element={<DashboardLayout />}>
      <Route path="profile" element={<ProfilePage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="orders" element={<OrdersPage />} />
    </Route>

Тут:

    /dashboard

є parent route.

А:

    profile
    settings
    orders

є child routes.

---

# 4. Важливий момент: дочірній `path` не починається з `/`

У parent route:

    <Route path="/dashboard" element={<DashboardLayout />}>
      <Route path="profile" element={<ProfilePage />} />
    </Route>

дочірній маршрут:

    profile

означає:

    /dashboard/profile

Не потрібно писати:

    /profile

якщо потрібен nested route.

---

# 5. Структура маршруту

Можна уявляти nested routes як дерево:

    /dashboard
    │
    ├── profile
    │
    ├── settings
    │
    └── orders

А повні URL:

    /dashboard
    /dashboard/profile
    /dashboard/settings
    /dashboard/orders

---

# 6. Найважливіший елемент — `<Outlet />`

Nested routes самі по собі не визначають, **де саме дочірній компонент повинен з'явитися**.

Для цього використовується:

    <Outlet />

Імпорт:

    import { Outlet } from "react-router-dom";

`Outlet` — це місце, куди React Router вставляє компонент активного дочірнього маршруту.

---

# 7. Простий приклад `Outlet`

Parent component:

    import { Outlet } from "react-router-dom";

    function DashboardLayout() {
      return (
        <div>
          <h1>Dashboard</h1>

          <nav>
            ...
          </nav>

          <main>
            <Outlet />
          </main>
        </div>
      );
    }

Якщо активний маршрут:

    /dashboard/profile

то:

    <Outlet />

покаже:

    <ProfilePage />

Якщо:

    /dashboard/settings

то:

    <Outlet />

покаже:

    <SettingsPage />

---

# 8. Головна схема Nested Routes

Запам'ятай:

    Parent Route
         ↓
    Parent Component
         ↓
       <Outlet />
         ↓
    Child Route
         ↓
    Child Component

Наприклад:

    /dashboard
         ↓
    DashboardLayout
         ↓
       <Outlet />
         ↓
    /profile
         ↓
    ProfilePage

---

# 9. Повний простий приклад

Маршрути:

    <Routes>
      <Route
        path="/dashboard"
        element={<DashboardLayout />}
      >
        <Route
          path="profile"
          element={<ProfilePage />}
        />

        <Route
          path="settings"
          element={<SettingsPage />}
        />
      </Route>
    </Routes>

Layout:

    import { Outlet } from "react-router-dom";

    function DashboardLayout() {
      return (
        <div>
          <h1>Dashboard</h1>

          <aside>
            Sidebar
          </aside>

          <main>
            <Outlet />
          </main>
        </div>
      );
    }

Profile:

    function ProfilePage() {
      return <h2>Profile</h2>;
    }

Settings:

    function SettingsPage() {
      return <h2>Settings</h2>;
    }

---

# 10. Що відбувається при переході на `/dashboard/profile`

React Router бачить:

    /dashboard/profile

і знаходить:

    /dashboard

та:

    profile

Тому рендериться:

    DashboardLayout
        +
    ProfilePage

Всередині:

    DashboardLayout

є:

    <Outlet />

Тому результат приблизно:

    DashboardLayout
    ├── Header
    ├── Sidebar
    └── Outlet
          └── ProfilePage

---

# 11. Що відбувається при переході на `/dashboard/settings`

URL:

    /dashboard/settings

Router знаходить:

    /dashboard
        └── settings

Результат:

    DashboardLayout
    ├── Header
    ├── Sidebar
    └── Outlet
          └── SettingsPage

`DashboardLayout` залишається спільним.

Змінюється лише вміст:

    <Outlet />

---

# 12. Nested Routes як Layout Pattern

Одна з найважливіших практичних ідей:

> **Nested routes дозволяють створювати layout, спільний для декількох сторінок.**

Наприклад:

    DashboardLayout

може містити:

- header;
- sidebar;
- navigation;
- breadcrumbs;
- footer;
- загальні кнопки;
- user menu.

А дочірні сторінки відповідають лише за свій контент.

---

# 13. Layout Route

Route, який використовується переважно для спільного layout, часто називають **layout route**.

Наприклад:

    <Route
      path="/dashboard"
      element={<DashboardLayout />}
    >
      <Route
        path="profile"
        element={<ProfilePage />}
      />

      <Route
        path="settings"
        element={<SettingsPage />}
      />
    </Route>

Тут:

    DashboardLayout

є layout component.

---

# 14. Layout без конкретної сторінки

Можна мати layout route, який сам не має окремої сторінки.

Наприклад:

    <Route element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Route>

`MainLayout` може містити:

    Header
    Navigation
    Footer
    Outlet

---

# 15. Layout Route без `path`

Наприклад:

    <Route element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
    </Route>

Такий route використовується для групування спільного layout.

Його головна роль:

    Layout
       +
    Outlet

---

# 16. `<Outlet />` — це не просто компонент

Важливо правильно зрозуміти концепцію.

`Outlet` не знає заздалегідь:

    <ProfilePage />

або:

    <SettingsPage />

React Router визначає активний child route і вставляє відповідний компонент у:

    <Outlet />

Тобто:

    <Outlet />

можна сприймати як:

> "Покажи тут активний дочірній маршрут."

---

# 17. `Outlet` можна розміщувати в різних місцях

Наприклад:

    function DashboardLayout() {
      return (
        <div>
          <header>
            Header
          </header>

          <main>
            <Outlet />
          </main>

          <footer>
            Footer
          </footer>
        </div>
      );
    }

Тоді child page буде між:

    Header

і:

    Footer

---

# 18. `Outlet` і Sidebar

Типовий dashboard:

    function DashboardLayout() {
      return (
        <div className="dashboard">
          <aside>
            <nav>
              ...
            </nav>
          </aside>

          <main>
            <Outlet />
          </main>
        </div>
      );
    }

Тоді:

    /dashboard/profile

показує:

    Sidebar + ProfilePage

А:

    /dashboard/settings

показує:

    Sidebar + SettingsPage

---

# 19. Nested Navigation

У nested routes часто використовуються relative links.

Наприклад, ми вже знаходимося:

    /dashboard

Тоді:

    <Link to="profile">
      Profile
    </Link>

веде на:

    /dashboard/profile

А:

    <Link to="settings">
      Settings
    </Link>

веде на:

    /dashboard/settings

---

# 20. Relative navigation

Це важлива перевага nested routes.

Замість:

    <Link to="/dashboard/profile">
      Profile
    </Link>

можна написати:

    <Link to="profile">
      Profile
    </Link>

якщо link знаходиться в контексті відповідного маршруту.

Це робить navigation більш незалежною від повного URL.

---

# 21. Абсолютний і відносний шлях

### Абсолютний

    <Link to="/dashboard/profile">
      Profile
    </Link>

Починається з:

    /

### Відносний

    <Link to="profile">
      Profile
    </Link>

Не починається з:

    /

У nested routes relative paths часто зручніші.

---

# 22. `..` у nested navigation

У nested маршрутах:

    <Link to="..">
      Back to dashboard
    </Link>

може використовуватися для переходу на батьківський рівень.

Наприклад:

    /dashboard/profile

→

    /dashboard

Це особливо корисно при побудові reusable nested components.

---

# 23. Relative navigation через `useNavigate`

Так само можна використовувати:

    const navigate = useNavigate();

    navigate("profile");

або:

    navigate("settings");

Для переходу на parent route:

    navigate("..");

Це дозволяє будувати navigation відносно поточного маршруту.

---

# 24. Index Route

Ще одна дуже важлива концепція nested routes — **index route**.

Наприклад, є:

    /dashboard

і:

    /dashboard/profile
    /dashboard/settings

Що повинно показуватися при відкритті:

    /dashboard

?

Для цього можна створити:

    <Route
      index
      element={<DashboardHome />}
    />

---

# 25. Приклад Index Route

    <Route
      path="/dashboard"
      element={<DashboardLayout />}
    >
      <Route
        index
        element={<DashboardHome />}
      />

      <Route
        path="profile"
        element={<ProfilePage />}
      />

      <Route
        path="settings"
        element={<SettingsPage />}
      />
    </Route>

Тепер:

    /dashboard

показує:

    DashboardHome

А:

    /dashboard/profile

показує:

    ProfilePage

---

# 26. Що таке Index Route

Index route можна розуміти як:

> "Покажи цей компонент за замовчуванням, коли активний parent route."

Наприклад:

    /dashboard

має:

    DashboardLayout

а його index route:

    DashboardHome

Структура:

    DashboardLayout
         │
         └── Outlet
               │
               └── DashboardHome

---

# 27. Чому Index Route корисний

Без index route може виникнути ситуація:

    /dashboard

показує:

    Header
    Sidebar
    пустий Content

З index route:

    /dashboard

показує:

    Header
    Sidebar
    DashboardHome

Це значно краще для UX.

---

# 28. Nested Routes дерево

Наприклад:

    <Route path="/dashboard" element={<DashboardLayout />}>
      <Route index element={<DashboardHome />} />

      <Route path="profile" element={<ProfilePage />} />

      <Route path="settings" element={<SettingsPage />} />

      <Route path="orders" element={<OrdersPage />} />
    </Route>

Можна уявити:

    dashboard
    │
    ├── index
    │
    ├── profile
    │
    ├── settings
    │
    └── orders

---

# 29. Nested Routes із параметрами

Nested routes чудово працюють разом із route parameters.

Наприклад:

    /users/:userId

має:

    /users/:userId/profile
    /users/:userId/posts
    /users/:userId/settings

Маршрути:

    <Route path="/users/:userId" element={<UserLayout />}>
      <Route
        index
        element={<UserOverview />}
      />

      <Route
        path="profile"
        element={<UserProfile />}
      />

      <Route
        path="posts"
        element={<UserPosts />}
      />

      <Route
        path="settings"
        element={<UserSettings />}
      />
    </Route>

---

# 30. URL структура

Отримуємо:

    /users/42

    /users/42/profile

    /users/42/posts

    /users/42/settings

У всіх маршрутах:

    userId = "42"

---

# 31. Доступ до параметра в child route

Наприклад:

    function UserProfile() {
      const { userId } = useParams<{
        userId: string;
      }>();

      return (
        <h1>
          User profile: {userId}
        </h1>
      );
    }

Для:

    /users/42/profile

отримаємо:

    userId = "42"

---

# 32. Nested parameters

Можна мати декілька параметрів:

    /courses/:courseId/lessons/:lessonId

Наприклад:

    /courses/8/lessons/25

Маршрути:

    <Route
      path="/courses/:courseId"
      element={<CourseLayout />}
    >
      <Route
        path="lessons/:lessonId"
        element={<LessonPage />}
      />
    </Route>

---

# 33. Отримання параметрів

У `LessonPage`:

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
          <p>Course: {courseId}</p>
          <p>Lesson: {lessonId}</p>
        </div>
      );
    }

Для URL:

    /courses/8/lessons/25

маємо:

    courseId = "8"
    lessonId = "25"

---

# 34. Багаторівневі Nested Routes

Nested routes можуть мати декілька рівнів.

Наприклад:

    /admin
      └── users
            └── :userId
                  └── settings

URL:

    /admin/users/42/settings

Структура:

    <Route path="/admin" element={<AdminLayout />}>
      <Route path="users" element={<UsersLayout />}>
        <Route path=":userId" element={<UserLayout />}>
          <Route
            path="settings"
            element={<UserSettings />}
          />
        </Route>
      </Route>
    </Route>

---

# 35. Як працюють кілька `Outlet`

Приклад:

    AdminLayout
        ↓
      Outlet
        ↓
    UsersLayout
        ↓
      Outlet
        ↓
    UserLayout
        ↓
      Outlet
        ↓
    UserSettings

Тобто кожен parent component має власне місце для child route.

---

# 36. Візуальна модель

Для:

    /admin/users/42/settings

маємо:

    AdminLayout
    │
    └── Outlet
          │
          └── UsersLayout
                │
                └── Outlet
                      │
                      └── UserLayout
                            │
                            └── Outlet
                                  │
                                  └── UserSettings

Це дуже важлива модель для розуміння nested routes.

---

# 37. Nested Routes і спільний UI

Уявімо:

    /courses/8

Сторінка має:

    CourseHeader
    CourseNavigation
    CourseSidebar

А всередині змінюється:

    Overview
    Lessons
    Students
    Settings

Тоді:

    CourseLayout

може містити:

    Header
    Navigation
    Sidebar
    Outlet

---

# 38. Приклад Course Layout

    function CourseLayout() {
      return (
        <div>
          <header>
            <h1>Course</h1>
          </header>

          <nav>
            <Link to=".">Overview</Link>
            <Link to="lessons">Lessons</Link>
            <Link to="students">Students</Link>
            <Link to="settings">Settings</Link>
          </nav>

          <main>
            <Outlet />
          </main>
        </div>
      );
    }

---

# 39. Routes для Course Layout

    <Route
      path="/courses/:courseId"
      element={<CourseLayout />}
    >
      <Route
        index
        element={<CourseOverview />}
      />

      <Route
        path="lessons"
        element={<CourseLessons />}
      />

      <Route
        path="students"
        element={<CourseStudents />}
      />

      <Route
        path="settings"
        element={<CourseSettings />}
      />
    </Route>

---

# 40. URL результат

Отримуємо:

    /courses/8

    /courses/8/lessons

    /courses/8/students

    /courses/8/settings

Усі сторінки використовують:

    CourseLayout

---

# 41. Nested Routes і Tabs

Nested routes дуже добре підходять для tabs.

Наприклад:

    /profile
    /profile/account
    /profile/security
    /profile/notifications

UI:

    Account | Security | Notifications

При перемиканні tab змінюється URL.

Це краще, ніж просто:

    useState("account")

у багатьох випадках, тому що URL стає відображенням поточного розділу.

---

# 42. Nested Routes як Tabs

Маршрути:

    <Route path="/profile" element={<ProfileLayout />}>
      <Route
        index
        element={<AccountTab />}
      />

      <Route
        path="security"
        element={<SecurityTab />}
      />

      <Route
        path="notifications"
        element={<NotificationsTab />}
      />
    </Route>

URL:

    /profile
    /profile/security
    /profile/notifications

---

# 43. URL як стан вкладеної навігації

Це дуже корисна концепція.

Замість:

    const [tab, setTab] = useState("security");

маємо:

    /profile/security

Тепер URL зберігає:

    currentTab = security

Це дозволяє:

- зробити bookmark;
- скопіювати URL;
- використати Back/Forward;
- відкрити конкретний tab напряму;
- оновити сторінку без втрати вибраного розділу.

---

# 44. Nested Routes і Browser Back

Наприклад:

    /dashboard
        ↓
    /dashboard/profile
        ↓
    /dashboard/settings

Користувач натискає Back:

    /dashboard/profile

ще раз:

    /dashboard

React Router працює разом із browser history.

---

# 45. Relative links у layout

У:

    /dashboard

можна написати:

    <Link to="profile">
      Profile
    </Link>

Замість:

    <Link to="/dashboard/profile">
      Profile
    </Link>

Перевага:

`DashboardLayout` не повинен жорстко дублювати весь URL у кожному link.

---

# 46. `to="."`

Relative path:

    <Link to=".">
      Dashboard
    </Link>

означає перехід до поточного route context.

Наприклад, у:

    /dashboard/profile

це може використовуватися для переходу до поточного parent route context залежно від структури маршруту.

Для простого переходу до конкретного parent route часто зрозуміліше використовувати:

    <Link to="..">
      Dashboard
    </Link>

---

# 47. `Outlet context`

`Outlet` може передавати дані дочірньому компоненту через `context`.

Наприклад:

    <Outlet context={{ user }} />

Child component може отримати ці дані через:

    useOutletContext()

---

# 48. Простий `Outlet context`

Parent:

    function UserLayout() {
      const user = {
        id: 42,
        name: "Anna",
      };

      return (
        <div>
          <h1>{user.name}</h1>

          <Outlet context={{ user }} />
        </div>
      );
    }

Child:

    import { useOutletContext } from "react-router-dom";

    type User = {
      id: number;
      name: string;
    };

    type UserContext = {
      user: User;
    };

    function UserProfile() {
      const { user } =
        useOutletContext<UserContext>();

      return <h2>{user.name}</h2>;
    }

---

# 49. Навіщо потрібен `Outlet context`

Він дозволяє parent route передати дані безпосередньо child route.

Наприклад:

    UserLayout
        ↓
      user
        ↓
      Outlet
        ↓
    UserProfile

Це може бути зручно для route-specific layout data.

---

# 50. `Outlet context` не є глобальним state

Не потрібно розглядати:

    <Outlet context={...} />

як заміну:

- Context API;
- Redux;
- Zustand;
- серверному state;
- props у звичайній компонентній ієрархії.

Це механізм передачі даних від route parent до route child.

---

# 51. Коли використовувати `Outlet context`

Добре підходить для:

- даних конкретного layout;
- selected user;
- dashboard data;
- permissions для route section;
- callback functions, пов'язаних із route layout.

Наприклад:

    <Outlet
      context={{
        user,
        refreshUser,
      }}
    />

---

# 52. Коли не варто використовувати `Outlet context`

Не варто використовувати його як глобальне сховище всього застосунку.

Наприклад, якщо дані потрібні:

    Header
    Sidebar
    Footer
    Dashboard
    Modal
    Notifications

краще розглянути відповідний state management або Context API.

---

# 53. Nested Routes і authentication

Nested routes добре поєднуються із protected layouts.

Наприклад:

    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route
          index
          element={<DashboardHome />}
        />

        <Route
          path="profile"
          element={<ProfilePage />}
        />
      </Route>
    </Route>

Тоді:

    ProtectedRoute

може перевірити authentication.

---

# 54. Protected Route як layout

Наприклад:

    function ProtectedRoute() {
      const isAuthenticated = true;

      if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
      }

      return <Outlet />;
    }

Тут `Outlet` показує:

    DashboardLayout

або інший child route.

---

# 55. Ієрархія Protected Routes

Можна отримати:

    ProtectedRoute
        ↓
    DashboardLayout
        ↓
    Outlet
        ↓
    ProfilePage

URL:

    /dashboard/profile

Це дуже потужний pattern.

---

# 56. Nested Routes і permissions

Можна мати:

    AdminRoute
        ↓
    AdminLayout
        ↓
    Outlet
        ↓
    UsersPage

Наприклад:

    function AdminRoute() {
      const isAdmin = true;

      if (!isAdmin) {
        return <Navigate to="/forbidden" replace />;
      }

      return <Outlet />;
    }

---

# 57. Nested Routes і 404

Можна створити catch-all child route:

    <Route
      path="/dashboard"
      element={<DashboardLayout />}
    >
      <Route
        index
        element={<DashboardHome />}
      />

      <Route
        path="profile"
        element={<ProfilePage />}
      />

      <Route
        path="*"
        element={<DashboardNotFound />}
      />
    </Route>

Тоді невідомий child path:

    /dashboard/unknown

може показати:

    DashboardNotFound

---

# 58. Nested route tree

Для великого застосунку корисно мислити не списком URL, а деревом:

    App
    │
    ├── PublicLayout
    │     ├── Home
    │     ├── About
    │     └── Login
    │
    └── ProtectedRoute
          │
          └── DashboardLayout
                ├── DashboardHome
                ├── Profile
                ├── Settings
                └── Orders

Це значно краще показує архітектуру застосунку.

---

# 59. Приклад повної структури

    src/
    ├── layouts/
    │   ├── MainLayout.tsx
    │   ├── DashboardLayout.tsx
    │   └── CourseLayout.tsx
    │
    ├── pages/
    │   ├── HomePage.tsx
    │   ├── DashboardPage.tsx
    │   ├── ProfilePage.tsx
    │   ├── SettingsPage.tsx
    │   └── OrdersPage.tsx
    │
    └── App.tsx

---

# 60. Routes у `App.tsx`

    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={<DashboardLayout />}
        >
          <Route
            index
            element={<DashboardHome />}
          />

          <Route
            path="profile"
            element={<ProfilePage />}
          />

          <Route
            path="settings"
            element={<SettingsPage />}
          />

          <Route
            path="orders"
            element={<OrdersPage />}
          />
        </Route>
      </Route>
    </Routes>

---

# 61. Чому Nested Routes зручніші за дублювання Layout

Без nested routes можна було б зробити:

    <Route
      path="/dashboard/profile"
      element={
        <DashboardLayout>
          <ProfilePage />
        </DashboardLayout>
      }
    />

    <Route
      path="/dashboard/settings"
      element={
        <DashboardLayout>
          <SettingsPage />
        </DashboardLayout>
      }
    />

    <Route
      path="/dashboard/orders"
      element={
        <DashboardLayout>
          <OrdersPage />
        </DashboardLayout>
      }
    />

Це працює концептуально, але призводить до дублювання.

Nested routes дозволяють описати layout один раз.

---

# 62. З nested routes

Замість дублювання:

    <Route path="/dashboard" element={<DashboardLayout />}>
      <Route
        path="profile"
        element={<ProfilePage />}
      />

      <Route
        path="settings"
        element={<SettingsPage />}
      />

      <Route
        path="orders"
        element={<OrdersPage />}
      />
    </Route>

`DashboardLayout` описується один раз.

---

# 63. Nested Routes і компонентна композиція

Nested routes добре узгоджуються з React composition.

Наприклад:

    DashboardLayout
        ├── Header
        ├── Sidebar
        └── Outlet

А child:

    ProfilePage
        ├── ProfileHeader
        ├── ProfileInfo
        └── ProfileActions

Таким чином кожен рівень відповідає за свою частину UI.

---

# 64. Nested Routes і separation of concerns

Parent layout:

    navigation
    shared UI
    common data

Child page:

    конкретний контент

Це дозволяє розділити відповідальність.

Наприклад:

    DashboardLayout

відповідає за dashboard.

    ProfilePage

відповідає за profile.

    SettingsPage

відповідає за settings.

---

# 65. Nested Routes і data fetching

У простому підході child component сам завантажує дані:

    function ProfilePage() {
      const { userId } = useParams();

      useEffect(() => {
        fetch(`/api/users/${userId}`);
      }, [userId]);

      ...
    }

У складніших застосунках route-level data loading може бути організований на рівні router.

Головна ідея:

> Nested route визначає структуру UI, а data layer визначає, звідки приходять дані.

---

# 66. Не плутати Nested Routes із простою вкладеністю компонентів

Компонентна вкладеність:

    App
      ↓
    Layout
      ↓
    Component
      ↓
    Button

це просто React component tree.

Nested routes:

    /dashboard
        ↓
    /dashboard/profile

пов'язані з:

- URL;
- router;
- navigation;
- browser history;
- route matching.

Nested routes створюють зв'язок:

    URL ↔ UI hierarchy

---

# 67. Найважливіша концепція

Nested routes фактично дозволяють відобразити:

    URL hierarchy

у:

    UI hierarchy

Наприклад:

    /courses/8/lessons/25

можна представити як:

    CourseLayout
         ↓
    LessonLayout
         ↓
    LessonPage

URL і структура UI відповідають один одному.

---

# 68. Глибоко вкладені маршрути

Теоретично можна мати:

    /a
      /b
        /c
          /d
            /e

Але це не означає, що потрібно будувати дуже глибоке дерево.

Якщо URL стає складним:

    /admin/users/42/posts/10/comments/5/edit

варто запитати:

> Чи дійсно вся ця ієрархія потрібна користувачу?

---

# 69. Хороший URL

Хороший URL повинен бути:

- зрозумілим;
- передбачуваним;
- стабільним;
- логічним;
- не надто глибоким.

Наприклад:

    /courses/8/lessons/25

виглядає логічно.

А надто складний:

    /application/dashboard/data/entities/courses/8/resources/lessons/25/view

може бути ознакою надмірної складності.

---

# 70. Типова помилка №1 — забули `<Outlet />`

Routes:

    <Route path="/dashboard" element={<DashboardLayout />}>
      <Route
        path="profile"
        element={<ProfilePage />}
      />
    </Route>

А в:

    DashboardLayout

немає:

    <Outlet />

Тоді:

    /dashboard/profile

може показати лише:

    DashboardLayout

а:

    ProfilePage

не буде відображений у потрібному місці.

---

# 71. Типова помилка №2 — неправильний child path

Погано:

    <Route path="/dashboard" element={<DashboardLayout />}>
      <Route
        path="/profile"
        element={<ProfilePage />}
      />
    </Route>

Якщо потрібен nested route, зазвичай потрібно:

    <Route
      path="profile"
      element={<ProfilePage />}
    />

Тобто без початкового:

    /

---

# 72. Типова помилка №3 — забули `index`

Є:

    /dashboard

і:

    /dashboard/profile

Але немає default child.

Тоді `/dashboard` може не мати потрібного основного контенту.

Рішення:

    <Route
      index
      element={<DashboardHome />}
    />

---

# 73. Типова помилка №4 — неправильний relative Link

У:

    /dashboard

можна:

    <Link to="profile">
      Profile
    </Link>

Але:

    <Link to="/profile">
      Profile
    </Link>

означає зовсім інший абсолютний URL:

    /profile

а не:

    /dashboard/profile

---

# 74. Типова помилка №5 — надмірна вкладеність

Погано будувати дерево лише тому, що це технічно можливо:

    Layout
      ↓
    Layout
      ↓
    Layout
      ↓
    Layout
      ↓
    Page

Кожен рівень повинен мати реальну відповідальність.

---

# 75. Типова помилка №6 — використовувати `Outlet context` як глобальний store

Не потрібно передавати через:

    <Outlet context={...} />

усі дані застосунку.

Для глобального стану існують інші рішення.

---

# 76. Типова помилка №7 — дублювання layout

Якщо десять сторінок використовують один dashboard layout, не потрібно десять разів вручну обгортати їх у цей layout.

Краще:

    DashboardLayout
         ↓
      Outlet
         ↓
    Child routes

---

# 77. Типова помилка №8 — плутати `Outlet` і `children`

У звичайному React компоненті:

    function Layout({ children }) {
      return (
        <main>
          {children}
        </main>
      );
    }

У React Router layout може використовувати:

    function Layout() {
      return (
        <main>
          <Outlet />
        </main>
      );
    }

`children` — звичайна React composition.

`Outlet` — механізм React Router для rendering matched child route.

---

# 78. `children` vs `Outlet`

### `children`

Використовується для звичайної React composition:

    <Layout>
      <ProfilePage />
    </Layout>

### `Outlet`

Використовується для route composition:

    <Route
      path="/dashboard"
      element={<DashboardLayout />}
    >
      <Route
        path="profile"
        element={<ProfilePage />}
      />
    </Route>

У:

    DashboardLayout

потрібен:

    <Outlet />

---

# 79. Повний Dashboard приклад

## Routes

    <Routes>
      <Route
        path="/dashboard"
        element={<DashboardLayout />}
      >
        <Route
          index
          element={<DashboardHome />}
        />

        <Route
          path="profile"
          element={<ProfilePage />}
        />

        <Route
          path="settings"
          element={<SettingsPage />}
        />

        <Route
          path="orders"
          element={<OrdersPage />}
        />
      </Route>
    </Routes>

## DashboardLayout

    import {
      Link,
      Outlet,
    } from "react-router-dom";

    function DashboardLayout() {
      return (
        <div>
          <header>
            <h1>Dashboard</h1>
          </header>

          <aside>
            <nav>
              <ul>
                <li>
                  <Link to=".">
                    Home
                  </Link>
                </li>

                <li>
                  <Link to="profile">
                    Profile
                  </Link>
                </li>

                <li>
                  <Link to="settings">
                    Settings
                  </Link>
                </li>

                <li>
                  <Link to="orders">
                    Orders
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>

          <main>
            <Outlet />
          </main>
        </div>
      );
    }

---

# 80. Візуальний результат

Для:

    /dashboard/profile

отримаємо:

    Dashboard
    ├── Header
    │
    ├── Sidebar
    │    ├── Home
    │    ├── Profile
    │    ├── Settings
    │    └── Orders
    │
    └── Main
         └── ProfilePage

Для:

    /dashboard/settings

отримаємо:

    Dashboard
    ├── Header
    ├── Sidebar
    └── Main
         └── SettingsPage

Layout той самий.

Змінюється лише child route.

---

# 81. Nested Routes + route parameters

Один із найпрактичніших варіантів:

    <Route
      path="/users/:userId"
      element={<UserLayout />}
    >
      <Route
        index
        element={<UserOverview />}
      />

      <Route
        path="profile"
        element={<UserProfile />}
      />

      <Route
        path="posts"
        element={<UserPosts />}
      />

      <Route
        path="settings"
        element={<UserSettings />}
      />
    </Route>

URL:

    /users/42
    /users/42/profile
    /users/42/posts
    /users/42/settings

---

# 82. Повна модель User Dashboard

    /users/:userId
          │
          ├── index
          │
          ├── profile
          │
          ├── posts
          │
          └── settings

React tree:

    UserLayout
       │
       └── Outlet
             │
             ├── UserOverview
             ├── UserProfile
             ├── UserPosts
             └── UserSettings

---

# 83. Практичний Full Stack сценарій

Уявімо навчальну систему.

URL:

    /courses/8

показує курс.

Вкладені сторінки:

    /courses/8
    /courses/8/lessons
    /courses/8/students
    /courses/8/settings

Ще глибше:

    /courses/8/lessons/25

Тоді можна побудувати:

    CourseLayout
       ↓
    Outlet
       ↓
    LessonsLayout
       ↓
    Outlet
       ↓
    LessonPage

---

# 84. Структура LMS

    /courses
       ↓
    /courses/:courseId
       ↓
    /courses/:courseId/lessons
       ↓
    /courses/:courseId/lessons/:lessonId

Це природно відповідає структурі даних:

    Course
       ↓
    Lessons
       ↓
    Lesson

---

# 85. Nested Routes і Database

Наприклад:

    /courses/8/lessons/25

може відповідати SQL-запиту:

    SELECT *
    FROM lessons
    WHERE id = 25
      AND course_id = 8;

Таким чином:

    URL
      ↓
    courseId
      ↓
    lessonId
      ↓
    backend
      ↓
    PostgreSQL

Nested route може дуже добре відображати структуру ресурсів backend.

---

# 86. Але URL не зобов'язаний копіювати Database schema

Важливо:

> URL architecture ≠ database schema.

Наприклад, database може мати:

    courses
    lessons
    users
    enrollments

А URL може бути:

    /courses/8/lessons/25

Це рішення API/UX, а не буквальна копія таблиць.

---

# 87. Nested Routes і reusable layouts

Якщо у проекті є:

    MainLayout
    DashboardLayout
    CourseLayout
    AdminLayout

можна будувати багаторівневу route architecture.

Наприклад:

    MainLayout
       ↓
    ProtectedRoute
       ↓
    DashboardLayout
       ↓
    CourseLayout
       ↓
    LessonPage

Це дуже потужний pattern для великих застосунків.

---

# 88. Route hierarchy як архітектура застосунку

У великих проектах route tree фактично стає частиною architecture.

Наприклад:

    App
    │
    ├── Public
    │
    ├── Auth
    │
    └── Protected
          │
          ├── Dashboard
          │
          ├── Courses
          │
          └── Admin

Тому routing — це не просто:

> "Як перейти на іншу сторінку?"

Routing також визначає:

- структуру UI;
- layout;
- access control;
- navigation;
- URL state;
- resource hierarchy.

---

# 89. Core Level

На базовому рівні потрібно знати:

- що таке nested route;
- parent route;
- child route;
- `<Outlet />`;
- `index` route;
- relative paths;
- relative links.

Мінімальний приклад:

    <Route path="/dashboard" element={<DashboardLayout />}>
      <Route
        index
        element={<DashboardHome />}
      />

      <Route
        path="profile"
        element={<ProfilePage />}
      />
    </Route>

---

# 90. Junior Level

На Junior рівні потрібно вміти:

- створювати layout routes;
- використовувати `<Outlet />`;
- будувати dashboard;
- використовувати relative navigation;
- використовувати `index` routes;
- поєднувати nested routes із parameters;
- будувати nested navigation;
- працювати з 404;
- використовувати `Outlet context`;
- будувати protected nested routes.

---

# 91. Middle Level

На Middle рівні потрібно розуміти:

- route hierarchy;
- layout architecture;
- nested resource URLs;
- route-level data;
- authentication boundaries;
- authorization boundaries;
- reusable layouts;
- error handling;
- route-level code splitting;
- URL design;
- relative navigation;
- nested parameters;
- state vs URL state.

---

# 92. Senior Level

На Senior рівні nested routes потрібно розглядати як частину application architecture.

Важливі питання:

- Яка структура route tree?
- Які layout повинні бути спільними?
- Де проходять auth boundaries?
- Де проходять permission boundaries?
- Які routes повинні бути nested?
- Які routes повинні бути незалежними?
- Чи не надто глибока URL hierarchy?
- Які частини UI повинні зберігатися під час navigation?
- Де завантажувати дані?
- Де обробляти errors?
- Які routes можна lazy-load?
- Як URL відображає domain model?
- Чи зручний URL для deep linking?

---

# 93. Питання для співбесіди

### 1. Що таке nested routes?

Це маршрути, вкладені в інший route та пов'язані зі структурою parent UI.

---

### 2. Для чого потрібен `<Outlet />`?

`Outlet` визначає місце, де React Router відображає активний дочірній route.

---

### 3. Що таке layout route?

Route, який використовується для спільного UI декількох дочірніх маршрутів.

---

### 4. Що таке index route?

Дочірній route, який відображається за замовчуванням при відкритті parent route.

---

### 5. Чим відрізняється:

    path="/dashboard/profile"

від:

    path="profile"

у nested route?

Перший є абсолютним шляхом.

Другий є відносним до parent route.

---

### 6. Що буде без `<Outlet />`?

Child route не матиме місця для відображення всередині parent component.

---

### 7. Чи можна мати кілька `<Outlet />`?

Звичайний layout зазвичай використовує один `Outlet` для свого child route. Важливо розуміти route hierarchy, а не намагатися відображати одного child route у довільній кількості місць.

---

### 8. Що таке `Outlet context`?

Механізм передачі даних від parent route component до child route component через `Outlet`.

---

### 9. Чим nested routes відрізняються від React component nesting?

Component nesting — це React hierarchy.

Nested routes додатково пов'язані з:

- URL;
- route matching;
- navigation;
- history;
- layout.

---

### 10. Чому nested routes корисні для dashboard?

Тому що sidebar/header можуть залишатися спільними, а `Outlet` змінює тільки основний контент.

---

# 94. Міні-шпаргалка

## Parent route

    <Route
      path="/dashboard"
      element={<DashboardLayout />}
    >

## Child route

    <Route
      path="profile"
      element={<ProfilePage />}
    />

## Outlet

    <Outlet />

## Index route

    <Route
      index
      element={<DashboardHome />}
    />

## Relative Link

    <Link to="profile">
      Profile
    </Link>

## Parent Link

    <Link to="..">
      Back
    </Link>

## Parameter + nested route

    <Route
      path="/users/:userId"
      element={<UserLayout />}
    >
      <Route
        path="profile"
        element={<UserProfile />}
      />
    </Route>

## Outlet context

    <Outlet context={{ user }} />

## Read context

    const { user } =
      useOutletContext<UserContext>();

---

# 95. Головна схема

Запам'ятай:

    Parent Route
         ↓
    Parent Layout
         ↓
      <Outlet />
         ↓
    Child Route
         ↓
    Child Component

Наприклад:

    /dashboard
         ↓
    DashboardLayout
         ↓
      <Outlet />
         ↓
    /profile
         ↓
    ProfilePage

---

# 96. Головна практична модель

Для реального Full Stack застосунку:

    URL
     ↓
    React Router
     ↓
    Parent Route
     ↓
    Layout
     ↓
    Outlet
     ↓
    Child Route
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
    Child UI

Наприклад:

    /courses/8/lessons/25
             ↓
    CourseLayout
             ↓
          Outlet
             ↓
    Lessons / Lesson route
             ↓
    courseId = "8"
    lessonId = "25"
             ↓
    GET /api/courses/8/lessons/25
             ↓
    PostgreSQL
             ↓
    Lesson
             ↓
    LessonPage

---

# 97. Що потрібно пам'ятати

1. **Nested routes** — це маршрути, вкладені в parent route.

2. Parent route зазвичай відповідає за спільний layout.

3. Child route відповідає за конкретний content.

4. `<Outlet />` — головний механізм rendering child route.

5. Child path у nested route зазвичай пишеться без `/`:

       path="profile"

6. `index` route задає default child page.

7. Relative links дозволяють писати:

       <Link to="profile">

   замість повного:

       <Link to="/dashboard/profile">

8. Nested routes можуть містити parameters:

       /users/:userId/profile

9. Один parent layout може мати багато child routes.

10. Кілька рівнів nested routes створюють route tree.

11. `Outlet context` дозволяє передавати дані parent route → child route.

12. Nested routes особливо корисні для:

       Dashboard
       Admin
       Profile
       Courses
       LMS
       Settings
       Multi-level navigation

13. Nested routes пов'язують:

       URL hierarchy
           ↕
       UI hierarchy

14. Хороший route tree — це частина архітектури React-застосунку.

---

# 98. Головне

> **Nested Routes дозволяють пов'язати ієрархію URL з ієрархією React UI.**

Найважливіша конструкція:

    <Route
      path="/dashboard"
      element={<DashboardLayout />}
    >
      <Route
        index
        element={<DashboardHome />}
      />

      <Route
        path="profile"
        element={<ProfilePage />}
      />

      <Route
        path="settings"
        element={<SettingsPage />}
      />
    </Route>

А в `DashboardLayout`:

    <Outlet />

Тоді:

    /dashboard
          ↓
    DashboardLayout
          ↓
       Outlet
          ↓
    DashboardHome

А:

    /dashboard/profile
          ↓
    DashboardLayout
          ↓
       Outlet
          ↓
    ProfilePage

І:

    /dashboard/settings
          ↓
    DashboardLayout
          ↓
       Outlet
          ↓
    SettingsPage

Тобто головна ідея:

    Parent Route
        ↓
    Layout
        ↓
    Outlet
        ↓
    Child Route
        ↓
    Child UI

А в більш складному Full Stack застосунку:

    URL
     ↓
    Nested Routes
     ↓
    Layout hierarchy
     ↓
    Route parameters
     ↓
    API
     ↓
    Backend
     ↓
    Database
     ↓
    React UI

Саме тому Nested Routes — це не просто спосіб організувати URL. Це один із основних інструментів побудови **структури UI, layout-ів і navigation architecture** у React Router.