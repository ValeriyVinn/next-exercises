## 01. Error Boundaries

Error Boundary (межа помилок) — це спеціальний React-компонент, який перехоплює JavaScript-помилки під час rendering, у lifecycle methods та constructors дочірніх компонентів і показує запасний UI замість зламаного дерева компонентів.

Error Boundaries використовуються для того, щоб:

- не дозволити помилці в одному компоненті зламати весь UI;
- показати fallback UI;
- ізолювати проблемну частину застосунку;
- логувати помилки;
- дати користувачу можливість повторити спробу;
- створити окремий error boundary для критичних частин UI;
- покращити стабільність React-застосунку.

Типовий принцип:

    React application
          ↓
    Error Boundary
          ↓
    ┌───────────────┐
    │   Child UI    │
    └───────────────┘
          ↓
       error?
       /     \
     no       yes
     ↓         ↓
    UI     fallback UI

---

### Ключові поняття

✔ error  
✔ error handling  
✔ Error Boundary  
✔ fallback UI  
✔ error isolation  
✔ error boundary tree  
✔ `componentDidCatch()`  
✔ `getDerivedStateFromError()`  
✔ `hasError`  
✔ error state  
✔ fallback component  
✔ class component  
✔ rendering error  
✔ lifecycle error  
✔ constructor error  
✔ event handler error  
✔ async error  
✔ server error  
✔ error logging  
✔ recovery  
✔ retry  
✔ graceful degradation  
✔ error propagation  
✔ nested Error Boundaries  
✔ root Error Boundary  

---

### Що потрібно пам'ятати

• Error Boundary — це React-компонент, який ізолює помилки в частині UI.

• Класичний Error Boundary реалізується через class component.

• Основні API:

    static getDerivedStateFromError()
    componentDidCatch()

• `getDerivedStateFromError()` використовується для оновлення state та показу fallback UI.

• `componentDidCatch()` використовується переважно для side effects, наприклад logging.

• Error Boundary перехоплює помилки під час rendering дочірніх компонентів.

• Error Boundary також перехоплює помилки в lifecycle methods та constructors дочірніх компонентів.

• Error Boundary не перехоплює помилки event handlers.

• Error Boundary не є універсальним `try...catch` для всього JavaScript-коду.

• Помилки в asynchronous callbacks також не перехоплюються автоматично Error Boundary.

• Для event handlers потрібно використовувати звичайний `try...catch` або інший підхід.

• Для async operations потрібно явно обробляти помилки:

    try / catch
    .catch()
    async / await

• Error Boundary показує fallback UI замість проблемного subtree.

• Один Error Boundary може захищати велику частину застосунку.

• Кілька Error Boundaries дозволяють ізолювати окремі частини UI.

• Якщо boundary сам падає під час rendering fallback UI, потрібен інший boundary вище.

• Error Boundary не замінює нормальну обробку помилок у fetch/API.

---

# Що таке Error Handling

Error Handling — це процес виявлення, перехоплення та обробки помилок у програмі.

У React помилки можуть виникати в різних місцях:

    rendering
    lifecycle methods
    constructors
    event handlers
    async operations
    data fetching
    API requests
    third-party components

Наприклад:

    function User() {
        throw new Error("Something went wrong");

        return <div>User</div>;
    }

Якщо `User` знаходиться всередині Error Boundary, boundary може показати fallback UI.

---

# Error Boundary

Error Boundary — це спеціальний React-компонент, який ловить помилки у своєму дочірньому component tree.

Схематично:

    <ErrorBoundary>
        <App />
    </ErrorBoundary>

Якщо всередині:

    App
     ↓
    Page
     ↓
    User
     ↓
    Error

Error Boundary може перехопити цю помилку:

    ErrorBoundary
         ↓
       App
         ↓
       Page
         ↓
       User
         ↓
       ERROR

і замість проблемного UI показати:

    ErrorBoundary
         ↓
    Fallback UI

---

# Навіщо потрібен Error Boundary

Без Error Boundary помилка rendering може призвести до того, що відповідна частина React tree більше не може нормально відобразитися.

Наприклад:

    <App>
        <Header />
        <Main />
        <Sidebar />
        <Footer />
    </App>

Якщо `Main` падає:

    App
    ├── Header
    ├── Main   ← ERROR
    ├── Sidebar
    └── Footer

Error Boundary дозволяє ізолювати проблему.

Наприклад:

    <App>
        <Header />

        <ErrorBoundary>
            <Main />
        </ErrorBoundary>

        <Sidebar />
        <Footer />
    </App>

Тепер:

    App
    ├── Header
    ├── Main       ← ERROR
    │
    │   fallback
    │
    ├── Sidebar
    └── Footer

Інші частини UI можуть продовжувати працювати.

---

# Error Boundary як Component Tree Isolation

Одна з головних ідей Error Boundary:

    isolate failures

Тобто помилка одного subtree не повинна обов'язково зламати весь application UI.

Наприклад:

    <App>

        <Header />

        <ErrorBoundary>
            <Dashboard />
        </ErrorBoundary>

        <Footer />

    </App>

Якщо `Dashboard` падає:

    Header
       ↓
    працює

    Dashboard
       ↓
    ERROR
       ↓
    fallback

    Footer
       ↓
    працює

Це називається:

    error isolation

---

# Class Component

Традиційний Error Boundary створюється через class component.

Приклад:

    import React from "react";

    class ErrorBoundary extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                hasError: false
            };
        }

        static getDerivedStateFromError(error) {
            return {
                hasError: true
            };
        }

        componentDidCatch(error, info) {
            console.error(error);
            console.error(info);
        }

        render() {
            if (this.state.hasError) {
                return <h1>Something went wrong.</h1>;
            }

            return this.props.children;
        }
    }

---

# Мінімальний Error Boundary

Найпростіший Error Boundary:

    class ErrorBoundary extends React.Component {
        state = {
            hasError: false
        };

        static getDerivedStateFromError(error) {
            return {
                hasError: true
            };
        }

        render() {
            if (this.state.hasError) {
                return <h1>Something went wrong.</h1>;
            }

            return this.props.children;
        }
    }

Використання:

    <ErrorBoundary>
        <App />
    </ErrorBoundary>

---

# `getDerivedStateFromError()`

`getDerivedStateFromError()` — static lifecycle method, яка викликається, коли дочірній компонент генерує помилку під час rendering.

Приклад:

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        };
    }

Основна задача:

    error
      ↓
    update state
      ↓
    render fallback UI

Наприклад:

    class ErrorBoundary extends React.Component {
        state = {
            hasError: false
        };

        static getDerivedStateFromError(error) {
            return {
                hasError: true
            };
        }

        render() {
            if (this.state.hasError) {
                return <h1>Something went wrong.</h1>;
            }

            return this.props.children;
        }
    }

---

# `componentDidCatch()`

`componentDidCatch()` викликається після того, як дочірній component tree згенерував помилку.

Приклад:

    componentDidCatch(error, info) {
        console.error("Error:", error);
        console.error("Component stack:", info.componentStack);
    }

Його часто використовують для:

    logging
    monitoring
    analytics
    error reporting

Наприклад:

    componentDidCatch(error, info) {
        logErrorToService(error, info);
    }

---

# `getDerivedStateFromError()` vs `componentDidCatch()`

Це дуже важлива різниця.

`getDerivedStateFromError()`:

    error
      ↓
    update state
      ↓
    render fallback UI

`componentDidCatch()`:

    error
      ↓
    side effect
      ↓
    logging / reporting

Спрощено:

    getDerivedStateFromError()
        → UI recovery

    componentDidCatch()
        → side effects / logging

---

# Повний Error Boundary

Типовий варіант:

    class ErrorBoundary extends React.Component {
        state = {
            hasError: false
        };

        static getDerivedStateFromError(error) {
            return {
                hasError: true
            };
        }

        componentDidCatch(error, info) {
            console.error("Error:", error);
            console.error("Info:", info);
        }

        render() {
            if (this.state.hasError) {
                return (
                    <div>
                        <h1>Something went wrong.</h1>
                        <p>Please try again later.</p>
                    </div>
                );
            }

            return this.props.children;
        }
    }

---

# `children`

Error Boundary зазвичай рендерить `children`.

Наприклад:

    class ErrorBoundary extends React.Component {
        state = {
            hasError: false
        };

        static getDerivedStateFromError() {
            return {
                hasError: true
            };
        }

        render() {
            if (this.state.hasError) {
                return <p>Error</p>;
            }

            return this.props.children;
        }
    }

Використання:

    <ErrorBoundary>
        <Profile />
    </ErrorBoundary>

Тут:

    this.props.children

це:

    <Profile />

---

# Fallback UI

Fallback UI — це UI, який показується замість компонента, що впав.

Наприклад:

    if (this.state.hasError) {
        return <h1>Something went wrong.</h1>;
    }

Fallback може бути простим:

    <p>Something went wrong.</p>

Або більш корисним:

    <div>
        <h2>Something went wrong.</h2>

        <p>
            Please reload the page.
        </p>

        <button>
            Reload
        </button>
    </div>

---

# Хороший Fallback UI

Fallback UI повинен:

    повідомити про проблему
        ↓
    не створювати нову помилку
        ↓
    запропонувати можливу дію
        ↓
    залишатися зрозумілим користувачу

Наприклад:

    <div>
        <h2>Не вдалося завантажити цей розділ.</h2>

        <p>
            Спробуйте ще раз.
        </p>

        <button>
            Повторити
        </button>
    </div>

---

# Fallback Component

Fallback UI можна винести в окремий компонент.

    function ErrorFallback() {
        return (
            <div>
                <h2>Something went wrong.</h2>

                <p>
                    Please try again.
                </p>
            </div>
        );
    }

Boundary:

    class ErrorBoundary extends React.Component {
        state = {
            hasError: false
        };

        static getDerivedStateFromError() {
            return {
                hasError: true
            };
        }

        render() {
            if (this.state.hasError) {
                return <ErrorFallback />;
            }

            return this.props.children;
        }
    }

---

# Error Boundary Usage

Наприклад:

    function App() {
        return (
            <ErrorBoundary>
                <Dashboard />
            </ErrorBoundary>
        );
    }

Якщо:

    Dashboard

або його дочірній компонент генерує rendering error, boundary покаже fallback.

---

# Boundary Around Whole Application

Можна поставити Error Boundary навколо всього application.

    <ErrorBoundary>
        <App />
    </ErrorBoundary>

Схема:

    ErrorBoundary
          ↓
        App
      /  |  \
    A    B    C

Якщо `B` падає:

    ErrorBoundary
          ↓
      Fallback

Це дає глобальний рівень захисту.

---

# Boundary Around Part of Application

Але часто краще ізолювати окремі частини.

    <App>

        <Header />

        <ErrorBoundary>
            <Dashboard />
        </ErrorBoundary>

        <ErrorBoundary>
            <Recommendations />
        </ErrorBoundary>

        <Footer />

    </App>

Тепер різні частини мають незалежний error handling.

---

# Nested Error Boundaries

Error Boundaries можуть бути вкладеними.

Наприклад:

    <ErrorBoundary>
        <App>

            <ErrorBoundary>
                <Dashboard />
            </ErrorBoundary>

        </App>
    </ErrorBoundary>

Якщо `Dashboard` падає:

    inner Error Boundary
          ↓
    fallback

Зовнішній boundary не обов'язково буде використовуватися.

---

# Error Boundary Hierarchy

Можна побудувати hierarchy:

    Global Boundary
          ↓
        App
       /   \
      /     \
    Page   Page
     ↓
    Boundary
     ↓
    Widget

Це дозволяє контролювати рівень ізоляції помилок.

---

# Як React шукає Error Boundary

Якщо компонент генерує помилку, React шукає найближчий Error Boundary вище в component tree.

Наприклад:

    Boundary A
        ↓
      Page
        ↓
    Boundary B
        ↓
      Widget
        ↓
      ERROR

Найближчий boundary:

    Boundary B

саме він обробляє помилку.

---

# Error Propagation

Помилка поширюється вгору component tree, доки React не знайде Error Boundary.

Схема:

    Component
        ↓
      error
        ↓
    parent
        ↓
    parent
        ↓
    Error Boundary
        ↓
    fallback

Якщо відповідного boundary немає, помилка може піднятися до root рівня.

---

# Root Error Boundary

Корисно мати глобальний boundary.

Наприклад:

    <ErrorBoundary>
        <App />
    </ErrorBoundary>

Він виступає як останній рівень захисту.

У великих застосунках можуть використовуватися:

    root boundary
        +
    page boundaries
        +
    widget boundaries

---

# Що перехоплює Error Boundary

Error Boundary перехоплює помилки, які виникають під час:

    rendering
    lifecycle methods
    constructors

дочірніх компонентів.

Наприклад:

    function Profile() {
        throw new Error("Profile failed");

        return <div>Profile</div>;
    }

Якщо:

    <ErrorBoundary>
        <Profile />
    </ErrorBoundary>

boundary може перехопити цю помилку.

---

# Rendering Error

Найпростіший приклад:

    function UserProfile() {
        throw new Error("Failed to render profile");

        return <div>User Profile</div>;
    }

Boundary:

    <ErrorBoundary>
        <UserProfile />
    </ErrorBoundary>

Результат:

    UserProfile
        ↓
      ERROR
        ↓
    ErrorBoundary
        ↓
    Fallback UI

---

# Lifecycle Error

Помилки в lifecycle methods class components також можуть бути перехоплені boundary.

Наприклад:

    class Profile extends React.Component {
        componentDidMount() {
            throw new Error("Mount error");
        }

        render() {
            return <div>Profile</div>;
        }
    }

Якщо `Profile` знаходиться під Error Boundary, boundary може обробити помилку.

---

# Constructor Error

Помилка в constructor дочірнього class component також може бути перехоплена.

    class Profile extends React.Component {
        constructor(props) {
            super(props);

            throw new Error("Constructor error");
        }

        render() {
            return <div>Profile</div>;
        }
    }

---

# Що Error Boundary НЕ перехоплює

Це одна з найважливіших частин теми.

Error Boundary не перехоплює:

    event handlers
    asynchronous callbacks
    setTimeout callbacks
    Promise rejections
    server-side rendering errors
    errors thrown inside the Error Boundary itself

Тому Error Boundary — не універсальний `try...catch`.

---

# Event Handler Errors

Наприклад:

    function Button() {
        function handleClick() {
            throw new Error("Click error");
        }

        return (
            <button onClick={handleClick}>
                Click
            </button>
        );
    }

Помилка виникла всередині event handler.

Error Boundary автоматично її не перехопить.

---

# Як обробити Event Error

Для event handler можна використовувати `try...catch`.

    function Button() {
        function handleClick() {
            try {
                doSomething();
            } catch (error) {
                console.error(error);
            }
        }

        return (
            <button onClick={handleClick}>
                Click
            </button>
        );
    }

---

# Async Errors

Наприклад:

    async function loadUser() {
        const response = await fetch("/api/user");

        if (!response.ok) {
            throw new Error("Failed to load user");
        }

        return response.json();
    }

Помилка тут не буде автоматично перехоплена Error Boundary.

Потрібно явно обробити її.

---

# Async Error with try/catch

    async function loadUser() {
        try {
            const response = await fetch("/api/user");

            if (!response.ok) {
                throw new Error("Request failed");
            }

            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

---

# Promise `.catch()`

Також:

    fetch("/api/user")
        .then(response => response.json())
        .catch(error => {
            console.error(error);
        });

Error Boundary не замінює:

    try/catch
    .catch()

---

# Data Fetching Errors

Наприклад:

    async function getUsers() {
        const response = await fetch("/api/users");

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        return response.json();
    }

Для UI потрібно мати окремий стан:

    loading
    success
    error

Наприклад:

    const [status, setStatus] = useState("idle");

Можлива модель:

    idle
      ↓
    loading
      ↓
    success

або:

    loading
      ↓
    error

Це вже належить до data fetching error handling, а не безпосередньо до Error Boundary.

---

# Error Boundary vs try/catch

Це дуже важлива співбесідна тема.

`try/catch`:

    JavaScript error handling

`Error Boundary`:

    React rendering error handling

Наприклад:

    try {
        doSomething();
    } catch (error) {
        ...
    }

використовується для звичайного JavaScript control flow.

А:

    <ErrorBoundary>
        <Component />
    </ErrorBoundary>

використовується для React component tree.

---

# Error Boundary vs try/catch

Не потрібно робити:

    try {
        return <Component />;
    } catch (error) {
        return <Fallback />;
    }

для заміни Error Boundary.

React rendering має власний механізм error handling.

Правильний підхід:

    <ErrorBoundary>
        <Component />
    </ErrorBoundary>

---

# Error Boundary не є глобальним try/catch

Помилкова модель:

    ErrorBoundary
        ↓
    ловить ВСІ JavaScript errors

Правильна модель:

    ErrorBoundary
        ↓
    ловить певні React rendering errors

А для інших помилок:

    event handler
        ↓
    try/catch

    async operation
        ↓
    try/catch / catch()

    API request
        ↓
    explicit error state

---

# Error Logging

Error Boundary дуже зручно використовувати для logging.

Наприклад:

    componentDidCatch(error, info) {
        console.error(error);
        console.error(info.componentStack);
    }

У production замість `console.error()` можна використовувати спеціальний monitoring service.

Наприклад, концептуально:

    componentDidCatch(error, info) {
        reportError(error, info);
    }

---

# Error Object

Помилка зазвичай представлена об'єктом `Error`.

Наприклад:

    throw new Error("Something went wrong");

У boundary:

    componentDidCatch(error, info) {
        console.log(error.message);
        console.log(error.stack);
    }

Основні властивості:

    error.name
    error.message
    error.stack

---

# `error.message`

Наприклад:

    throw new Error("Database connection failed");

Тоді:

    error.message

містить:

    "Database connection failed"

---

# `error.stack`

`stack` містить інформацію про stack trace.

Наприклад:

    componentDidCatch(error, info) {
        console.error(error.stack);
    }

Це корисно для debugging.

---

# Component Stack

`componentDidCatch()` також отримує інформацію про React component stack.

Наприклад:

    componentDidCatch(error, info) {
        console.error(info.componentStack);
    }

Це допомагає зрозуміти, у якому component tree виникла проблема.

---

# Error Logging Pattern

Типовий pattern:

    componentDidCatch(error, info) {
        logError({
            error,
            componentStack: info.componentStack
        });
    }

Схема:

    React error
        ↓
    Error Boundary
        ↓
    componentDidCatch()
        ↓
    error logger
        ↓
    monitoring system

---

# Recovery

Error Boundary може не тільки показувати помилку, але й дозволяти користувачу відновити UI.

Наприклад:

    Something went wrong.

    [Try again]

Для цього boundary повинен мати спосіб скинути:

    hasError

назад у:

    false

---

# Retry

Простий приклад:

    class ErrorBoundary extends React.Component {
        state = {
            hasError: false
        };

        static getDerivedStateFromError() {
            return {
                hasError: true
            };
        }

        handleRetry = () => {
            this.setState({
                hasError: false
            });
        };

        render() {
            if (this.state.hasError) {
                return (
                    <div>
                        <h2>Something went wrong.</h2>

                        <button onClick={this.handleRetry}>
                            Try again
                        </button>
                    </div>
                );
            }

            return this.props.children;
        }
    }

---

# Retry Flow

Схема:

    render
      ↓
    error
      ↓
    Error Boundary
      ↓
    fallback
      ↓
    user clicks Retry
      ↓
    hasError = false
      ↓
    render children again

---

# Важливий нюанс Retry

Якщо причина помилки не зникла, повторний rendering знову може впасти.

Наприклад:

    component
        ↓
    always throws Error
        ↓
    Retry
        ↓
    always throws Error

Тому retry має сенс тоді, коли причина помилки могла змінитися.

---

# Resetting Boundary

У складніших реалізаціях boundary може скидатися залежно від певної зміни.

Наприклад:

    user
    route
    request
    selected item

Концептуально:

    previous context
          ↓
    error
          ↓
    fallback
          ↓
    context changes
          ↓
    reset boundary
          ↓
    render again

---

# Reusable Error Boundary

Error Boundary можна зробити reusable.

Наприклад:

    <ErrorBoundary>
        <Profile />
    </ErrorBoundary>

    <ErrorBoundary>
        <Dashboard />
    </ErrorBoundary>

    <ErrorBoundary>
        <Settings />
    </ErrorBoundary>

Усі вони використовують один компонент:

    ErrorBoundary

але ізолюють різні частини UI.

---

# Error Boundary with Props

Boundary може отримувати fallback як prop.

Наприклад:

    <ErrorBoundary
        fallback={<p>Something went wrong.</p>}
    >
        <Profile />
    </ErrorBoundary>

Концептуально:

    class ErrorBoundary extends React.Component {
        state = {
            hasError: false
        };

        static getDerivedStateFromError() {
            return {
                hasError: true
            };
        }

        render() {
            if (this.state.hasError) {
                return this.props.fallback;
            }

            return this.props.children;
        }
    }

---

# Fallback as Component

Замість готового JSX можна передати component або function.

Наприклад:

    <ErrorBoundary
        fallback={<ErrorFallback />}
    >
        <Dashboard />
    </ErrorBoundary>

Це дозволяє використовувати різний UI в різних місцях.

---

# Global vs Local Boundary

Є два основні рівні.

## Global Boundary

    <ErrorBoundary>
        <App />
    </ErrorBoundary>

Призначення:

    останній рівень захисту

---

## Local Boundary

    <ErrorBoundary>
        <Dashboard />
    </ErrorBoundary>

Призначення:

    ізоляція конкретної частини UI

---

# Де ставити Error Boundary

Error Boundary можна ставити навколо:

    application
    route
    page
    dashboard
    widget
    third-party component
    risky UI section

Наприклад:

    <App>

        <Header />

        <ErrorBoundary>
            <Dashboard />
        </ErrorBoundary>

        <ErrorBoundary>
            <WeatherWidget />
        </ErrorBoundary>

        <Footer />

    </App>

---

# Error Boundary Around Third-Party Component

Third-party component може бути потенційно ненадійним.

Наприклад:

    <ErrorBoundary>
        <ThirdPartyChart />
    </ErrorBoundary>

Якщо chart component впаде, fallback може залишити решту UI працездатною.

---

# Error Isolation Strategy

Для великого застосунку корисно мислити рівнями:

    Global
       ↓
    Route
       ↓
    Feature
       ↓
    Widget

Наприклад:

    Global Boundary
        ↓
    Dashboard Route
        ↓
    Analytics Feature
        ↓
    Chart Widget

Це дозволяє ізолювати помилки на відповідному рівні.

---

# Granularity

Granularity — рівень деталізації Error Boundaries.

Занадто мало boundary:

    один boundary
        ↓
    весь application

Помилка маленького widget може замінити весь UI fallback.

Занадто багато:

    Boundary
      ↓
    Boundary
      ↓
    Boundary
      ↓
    Boundary

може зробити структуру складною.

Потрібен баланс.

---

# Помилка в Error Boundary

Error Boundary не може надійно захистити сам себе від власної помилки.

Наприклад:

    <ErrorBoundary>
        <Component />
    </ErrorBoundary>

Якщо проблема виникла у:

    ErrorBoundary

самому, потрібен boundary вище.

Тому часто корисно мати:

    Root Error Boundary
          ↓
    Application Boundary
          ↓
    Local Boundaries

---

# Error Boundary and Hooks

Error Boundary не створюється через звичайний hook.

Наприклад, немає стандартного React hook:

    useErrorBoundary()

який просто замінює класичний Error Boundary у всіх випадках.

Класичний механізм Error Boundary базується на:

    getDerivedStateFromError()
    componentDidCatch()

---

# Function Component

Звичайний function component:

    function ErrorBoundary() {
        ...
    }

сам по собі не є Error Boundary тільки тому, що називається `ErrorBoundary`.

Назва нічого не змінює.

Потрібен відповідний механізм error boundary.

---

# Error Boundary Libraries

У production applications можуть використовуватися готові libraries для зручнішої роботи з Error Boundaries.

Вони можуть надавати:

    reusable boundary
    fallback components
    reset logic
    logging integration
    retry mechanisms

Але фундаментальні концепції залишаються:

    error
      ↓
    boundary
      ↓
    fallback
      ↓
    recovery / logging

---

# Error Boundary Lifecycle

Спрощений flow:

    Child throws error
          ↓
    React finds Error Boundary
          ↓
    getDerivedStateFromError()
          ↓
    boundary state changes
          ↓
    fallback UI renders
          ↓
    componentDidCatch()
          ↓
    logging / reporting

---

# Error Boundary Flow

Повна схема:

    render child
        ↓
    error occurs
        ↓
    React catches error
        ↓
    find nearest Error Boundary
        ↓
    getDerivedStateFromError()
        ↓
    update boundary state
        ↓
    render fallback
        ↓
    componentDidCatch()
        ↓
    logging
        ↓
    user sees fallback

---

# Простий приклад

    import React from "react";

    class ErrorBoundary extends React.Component {
        state = {
            hasError: false
        };

        static getDerivedStateFromError(error) {
            return {
                hasError: true
            };
        }

        componentDidCatch(error, info) {
            console.error(error);
            console.error(info.componentStack);
        }

        render() {
            if (this.state.hasError) {
                return (
                    <div>
                        <h2>Something went wrong.</h2>

                        <button
                            onClick={() => {
                                this.setState({
                                    hasError: false
                                });
                            }}
                        >
                            Try again
                        </button>
                    </div>
                );
            }

            return this.props.children;
        }
    }

---

# Component That Throws

    function BrokenComponent() {
        throw new Error("Component crashed");

        return <div>Hello</div>;
    }

Використання:

    function App() {
        return (
            <ErrorBoundary>
                <BrokenComponent />
            </ErrorBoundary>
        );
    }

Результат:

    BrokenComponent
          ↓
        ERROR
          ↓
    ErrorBoundary
          ↓
    fallback UI

---

# Practical Example — Dashboard

    function Dashboard() {
        return (
            <section>
                <h1>Dashboard</h1>

                <ErrorBoundary>
                    <Statistics />
                </ErrorBoundary>

                <ErrorBoundary>
                    <Chart />
                </ErrorBoundary>

                <ErrorBoundary>
                    <RecentActivity />
                </ErrorBoundary>
            </section>
        );
    }

Якщо `Chart` падає:

    Dashboard
    ├── Statistics       ✓
    ├── Chart            ✗
    │    ↓
    │  fallback
    └── RecentActivity   ✓

Це хороший приклад error isolation.

---

# Практична архітектура

Для application можна використовувати:

    <RootErrorBoundary>

        <App>

            <Header />

            <RouteErrorBoundary>
                <Page />
            </RouteErrorBoundary>

            <Footer />

        </App>

    </RootErrorBoundary>

На feature-рівні:

    <FeatureErrorBoundary>
        <Dashboard />
    </FeatureErrorBoundary>

На widget-рівні:

    <WidgetErrorBoundary>
        <Chart />
    </WidgetErrorBoundary>

---

# Error Boundary vs Data Error

Не всі помилки повинні оброблятися Error Boundary.

Наприклад:

    API request failed

це data fetching error.

Зазвичай UI має показати:

    Loading
       ↓
    Request
       ↓
    Success / Error

Наприклад:

    if (status === "loading") {
        return <Loading />;
    }

    if (status === "error") {
        return <ErrorMessage />;
    }

    return <UserList />;

Error Boundary призначений для іншого рівня:

    component rendering failure

---

# Два рівні Error Handling

У React application часто потрібно мати обидва механізми.

## UI Rendering Errors

    Error Boundary

## Data / Async Errors

    try/catch
    Promise.catch()
    error state

Схема:

    Application
       │
       ├── Rendering error
       │      ↓
       │   Error Boundary
       │
       └── API error
              ↓
          error state

---

# Типові помилки

❌ Вважати Error Boundary глобальним `try/catch`.

Error Boundary не перехоплює всі JavaScript errors.

---

❌ Очікувати, що Error Boundary автоматично обробить `fetch()` rejection.

Потрібно:

    try/catch

або:

    .catch()

або:

    error state

---

❌ Очікувати, що Error Boundary перехопить `onClick` error.

Event handler потрібно обробляти окремо.

---

❌ Робити весь application одним великим boundary без потреби.

Це може призвести до того, що маленька помилка замінить весь UI fallback-екраном.

---

❌ Створювати надто багато boundaries.

Надмірна кількість boundary може ускладнити архітектуру.

---

❌ Робити fallback UI складнішим за основний UI.

Fallback повинен бути максимально надійним.

---

❌ Робити fallback UI, який сам може впасти.

Наприклад:

    if (hasError) {
        return <ComplexComponent />;
    }

Якщо `ComplexComponent` також падає, проблема ускладнюється.

---

❌ Логувати помилку тільки через UI.

Error message для користувача та technical logging — різні задачі.

Користувачу:

    Something went wrong.

Для developer:

    error
    stack
    componentStack

---

❌ Забувати про recovery.

Якщо можливо, корисно дати:

    Try again
    Reload
    Go back
    Go to home

---

# Error UI Principles

Хороший error UI:

    короткий
    зрозумілий
    стабільний
    actionable

Наприклад:

    Something went wrong.

    Please try again.

    [Try again]

---

# User Error vs Developer Error

Не потрібно показувати користувачу technical details.

Не дуже добре:

    TypeError:
    Cannot read properties of undefined
    at UserProfile.tsx:37

Краще:

    Не вдалося відобразити профіль.

    [Спробувати ще раз]

А technical details:

    error.message
    error.stack
    componentStack

відправляються в logging / monitoring system.

---

# Error Boundary and Production

У production Error Boundary особливо корисний для:

    unexpected rendering errors
    third-party component failures
    corrupted UI state
    unexpected component bugs

Основна мета:

    graceful degradation

Тобто application не повинен виглядати повністю зламаним через одну локальну проблему.

---

# Graceful Degradation

Graceful degradation — здатність application продовжувати роботу частково, навіть якщо певна частина UI не працює.

Наприклад:

    Header       ✓
    Sidebar      ✓
    Dashboard    ✓
    Chart        ✗
    Footer       ✓

Замість:

    Entire application
          ↓
        ERROR

отримуємо:

    Chart
      ↓
    fallback

Це значно кращий UX.

---

# Error Boundary Design

Хороша архітектура:

    Global Error Boundary
            ↓
        Application
            ↓
    ┌───────┼────────┐
    ↓       ↓        ↓
    Page   Feature  Widget
    ↓       ↓        ↓
 Boundary Boundary Boundary

Не обов'язково реалізовувати всі рівні.

Вибір залежить від application.

---

# Error Handling Strategy

При проектуванні React application можна розділяти помилки на:

    1. Rendering errors
    2. Event errors
    3. Async errors
    4. Data/API errors
    5. Routing errors
    6. Form validation errors

Для них можуть використовуватися різні механізми.

Наприклад:

    Rendering
        → Error Boundary

    Event
        → try/catch

    Async
        → try/catch / catch()

    API
        → error state

    Form
        → validation state

---

# Error Boundary — не Validation

Error Boundary не призначений для validation.

Наприклад:

    email is required

це не application crash.

Це нормальний стан форми:

    form state
        +
    validation errors

Error Boundary потрібен для unexpected failures.

---

# Error Boundary — не API Error UI

API може повернути:

    400
    401
    403
    404
    500

Це не означає автоматично, що потрібен Error Boundary.

Наприклад:

    404 User Not Found

можна нормально відобразити:

    User not found.

Це очікуваний application state.

---

# Expected vs Unexpected Errors

Дуже важливе розділення.

## Expected Error

Наприклад:

    user not found
    invalid form
    unauthorized
    validation failed

Це можна нормально відобразити через UI.

---

## Unexpected Error

Наприклад:

    component crashes
    unexpected TypeError
    broken third-party component
    rendering failure

Для таких ситуацій Error Boundary дуже корисний.

---

# Mental Model

Корисно запам'ятати:

    Error Boundary
        ↓
    "Що робити, якщо React component tree впав?"

А:

    try/catch
        ↓
    "Що робити, якщо JavaScript operation завершилася помилкою?"

І:

    error state
        ↓
    "Що показати користувачу, якщо operation/API повернула error?"

---

# Error Boundary API

Основні методи:

    static getDerivedStateFromError(error)

    componentDidCatch(error, info)

---

# `getDerivedStateFromError()` — коротко

Призначення:

    update state
        ↓
    render fallback

Тип:

    static method

Приклад:

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        };
    }

---

# `componentDidCatch()` — коротко

Призначення:

    logging
    reporting
    side effects

Приклад:

    componentDidCatch(error, info) {
        console.error(error);
    }

---

# Мінімальна модель Error Boundary

Запам'ятати:

    class ErrorBoundary extends React.Component {
        state = {
            hasError: false
        };

        static getDerivedStateFromError() {
            return {
                hasError: true
            };
        }

        componentDidCatch(error, info) {
            // logging
        }

        render() {
            if (this.state.hasError) {
                return <Fallback />;
            }

            return this.props.children;
        }
    }

---

# Співвідношення

    getDerivedStateFromError()
            ↓
       fallback UI

    componentDidCatch()
            ↓
       logging

---

# Питання зі співбесіди

Що таке Error Boundary?

Навіщо потрібні Error Boundaries у React?

Які помилки перехоплює Error Boundary?

Які помилки Error Boundary не перехоплює?

Чим Error Boundary відрізняється від `try...catch`?

Як створити Error Boundary?

Чому класичний Error Boundary використовує class component?

Що робить `getDerivedStateFromError()`?

Що робить `componentDidCatch()`?

Яка різниця між `getDerivedStateFromError()` та `componentDidCatch()`?

Що таке fallback UI?

Як показати fallback UI?

Що таке error isolation?

Що таке graceful degradation?

Де краще розміщувати Error Boundary?

Чи можна мати кілька Error Boundaries?

Чи можуть Error Boundaries бути вкладеними?

Що відбувається, якщо Error Boundary теж падає?

Чи перехоплює Error Boundary помилки в `onClick`?

Чи перехоплює Error Boundary помилки `fetch()`?

Як обробляти async errors?

Як логувати помилки з Error Boundary?

Що таке `componentStack`?

Що таке error recovery?

Як реалізувати retry?

Чим rendering error відрізняється від API error?

Чи потрібно використовувати Error Boundary для validation errors?

Чи потрібно використовувати Error Boundary для HTTP 404?

Як ізолювати third-party component?

Що таке root Error Boundary?

Що таке local Error Boundary?

Що таке error boundary granularity?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке error handling.

Що таке Error Boundary.

Для чого потрібен Error Boundary.

Fallback UI.

Основи:

    getDerivedStateFromError()
    componentDidCatch()

Error Boundary через class component.

Перехоплення rendering errors.

Error isolation.

Розуміння того, що Error Boundary не перехоплює event handler errors.

Розуміння того, що Error Boundary не перехоплює async errors автоматично.

Різниця між:

    Error Boundary
    try/catch

Основи error logging.

Основи recovery.

---

🔵 Junior

Створення reusable Error Boundary.

Fallback components.

Nested Error Boundaries.

Global Error Boundary.

Local Error Boundaries.

Error isolation.

Retry.

Reset state.

Error logging.

`error.message`.

`error.stack`.

`componentStack`.

Розділення:

    rendering errors
    event errors
    async errors
    API errors

Розуміння graceful degradation.

Вибір рівня Error Boundary.

Error Boundary навколо third-party components.

Розуміння expected vs unexpected errors.

---

🟠 Middle

Error Boundary architecture.

Root + local boundaries.

Feature-level boundaries.

Route-level boundaries.

Boundary granularity.

Error recovery strategies.

Retry strategies.

Reset strategies.

Centralized error logging.

Monitoring integration.

Production error handling.

Graceful degradation.

Error isolation strategy.

Error UX.

Розділення:

    UI errors
    data errors
    network errors
    validation errors
    unexpected errors

Проектування fallback UI.

Проектування reusable Error Boundary API.

Розуміння взаємодії Error Boundary з:

    routing
    data fetching
    Suspense
    lazy loading
    third-party components

---

🔴 Senior

Error handling architecture великого React application.

Error boundary hierarchy.

Global error recovery.

Feature isolation.

Failure containment.

Error observability.

Error monitoring.

Error reporting.

Recovery architecture.

Retry semantics.

Reset semantics.

Error classification.

Expected vs unexpected failures.

Graceful degradation.

Fault isolation.

Resilience patterns.

Interaction між:

    Error Boundaries
    Suspense
    lazy loading
    routing
    server rendering
    streaming
    data fetching

Design trade-offs:

    global boundary
    route boundary
    feature boundary
    widget boundary

Production error strategy.

Error aggregation.

Component stack analysis.

Failure recovery architecture.

UX при partial application failure.

---

# Міні-шпаргалка

## Error Boundary

    <ErrorBoundary>
        <App />
    </ErrorBoundary>

Призначення:

    перехопити React rendering errors
        ↓
    показати fallback UI

---

## getDerivedStateFromError

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        };
    }

Призначення:

    update state
        ↓
    fallback UI

---

## componentDidCatch

    componentDidCatch(error, info) {
        console.error(error);
    }

Призначення:

    logging
    reporting
    side effects

---

## Fallback

    if (this.state.hasError) {
        return <ErrorFallback />;
    }

---

## Children

    return this.props.children;

Якщо помилки немає:

    Error Boundary
          ↓
       children

---

## Rendering Error

    Component
        ↓
    render error
        ↓
    Error Boundary
        ↓
    fallback

---

## Event Error

    onClick
        ↓
    error

Error Boundary автоматично:

    ❌ не ловить

Потрібно:

    try/catch

---

## Async Error

    fetch()
        ↓
    rejected Promise

Error Boundary автоматично:

    ❌ не ловить

Потрібно:

    try/catch

або:

    .catch()

або:

    error state

---

## Logging

    componentDidCatch()
          ↓
    error
          +
    componentStack
          ↓
    logger / monitoring

---

## Recovery

    error
      ↓
    fallback
      ↓
    retry
      ↓
    reset
      ↓
    render again

---

## Error Boundary Levels

    Root
      ↓
    Route
      ↓
    Feature
      ↓
    Widget

Не обов'язково використовувати всі рівні.

---

## Error Boundary vs try/catch

    Error Boundary
        ↓
    React component tree errors

    try/catch
        ↓
    JavaScript operation errors

---

## Error Boundary vs error state

    Error Boundary
        ↓
    unexpected rendering failure

    error state
        ↓
    expected operation/API failure

---

# Головне:

• Error Boundary — спеціальний React-механізм для ізоляції помилок у component tree.

• Error Boundary дозволяє показати fallback UI замість проблемного subtree.

• Класичний Error Boundary створюється через class component.

• Основні API:

    getDerivedStateFromError()
    componentDidCatch()

• `getDerivedStateFromError()` використовується для переходу в error state та rendering fallback UI.

• `componentDidCatch()` використовується переважно для logging та reporting.

• Типовий state:

    {
        hasError: false
    }

• Після помилки:

    hasError: true

• Основна модель:

    error
      ↓
    boundary
      ↓
    fallback

• Error Boundary перехоплює помилки під час rendering дочірніх компонентів.

• Error Boundary також працює з помилками у lifecycle methods та constructors дочірніх компонентів.

• Error Boundary не є глобальним `try/catch`.

• Error Boundary не перехоплює помилки event handlers.

• Error Boundary не перехоплює async errors автоматично.

• Для event handlers використовують:

    try/catch

• Для async operations використовують:

    try/catch
    .catch()

• Для API/data errors часто використовують:

    loading
    success
    error

стани.

• Не кожен `404`, `401`, validation error або API error є application crash.

• Expected errors зазвичай обробляються як normal UI state.

• Unexpected rendering errors — хороший випадок для Error Boundary.

• Fallback UI має бути простим, стабільним і зрозумілим.

• Корисно давати користувачу можливість:

    Retry
    Reload
    Go back
    Go home

• `componentDidCatch()` можна використовувати для відправлення помилок у monitoring system.

• `error.message` допомагає зрозуміти причину помилки.

• `error.stack` допомагає знайти місце виникнення помилки.

• `info.componentStack` допомагає визначити React component tree, у якому виникла проблема.

• Один глобальний Error Boundary дає останній рівень захисту.

• Local Error Boundaries дозволяють ізолювати окремі features та widgets.

• Nested Error Boundaries дозволяють створити hierarchy error handling.

• Чим локальніший boundary, тим точніше можна ізолювати проблему.

• Надто великий boundary може замінити fallback UI для надто великої частини application.

• Надто велика кількість boundaries може ускладнити архітектуру.

• Хороша стратегія часто виглядає так:

    Global Boundary
          ↓
    Route / Feature Boundary
          ↓
    Widget Boundary

• Error isolation дозволяє application продовжувати працювати, навіть якщо одна його частина зламалася.

• Це називається:

    graceful degradation

• Основна ментальна модель:

    Rendering error
          ↓
    Error Boundary

    Event error
          ↓
    try/catch

    Async error
          ↓
    try/catch / catch()

    API error
          ↓
    error state

• Error Boundary — це не спосіб обробити всі помилки програми.

• Його головне призначення:

    isolate React rendering failures
          ↓
    show fallback UI
          ↓
    keep the rest of the application usable