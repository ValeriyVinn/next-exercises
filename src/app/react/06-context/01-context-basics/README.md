# React — Context Basics

Context — це механізм React, який дозволяє передавати дані від компонента-предка до компонентів-нащадків без необхідності вручну передавати ці дані через `props` на кожному рівні дерева компонентів.

Context особливо корисний для даних, які потрібні багатьом компонентам у різних частинах component tree.

Типові приклади:

    theme
    language
    authenticated user
    current account
    application settings
    permissions
    UI preferences

---

### Ключові поняття

✔ Context  
✔ Context API  
✔ context value  
✔ context consumer  
✔ context provider  
✔ Provider  
✔ Consumer  
✔ context tree  
✔ component tree  
✔ props drilling  
✔ `createContext()`  
✔ `useContext()`  
✔ `Context.Provider`  
✔ default value  
✔ shared state  
✔ global-like data  
✔ context propagation  
✔ re-render  
✔ provider value  
✔ context boundary  
✔ dependency injection  
✔ Context vs props  
✔ Context vs state  

---

### Що потрібно пам'ятати

• Context дозволяє передавати значення глибоко вниз по component tree без ручного передачі через кожен рівень `props`.

• Context не є альтернативою `useState()`.

• `useState()` зберігає state.

• Context визначає спосіб, яким значення може бути доступне компонентам нижче в дереві.

• Context створюється через:

    createContext()

• Значення Context зазвичай надається через Provider.

• Компонент може отримати Context через:

    useContext()

• Context працює всередині певної частини React tree.

• Context не робить JavaScript-змінну глобальною.

• Context value може бути будь-яким JavaScript value:

    string
    number
    boolean
    object
    array
    function
    state
    dispatch
    combination of values

• Якщо Context value змінюється, компоненти, які читають цей Context, можуть бути повторно відрендерені.

• Context найкраще використовувати для даних, які дійсно є спільними для певної частини component tree.

• Не потрібно використовувати Context для кожного state.

---

# Що таке Context

Context — це механізм React для передачі значення через component tree.

Без Context дані часто передаються через `props`.

Наприклад:

    App
      ↓
    Layout
      ↓
    Header
      ↓
    UserMenu

Якщо `UserMenu` потребує `user`, а `App` володіє цим значенням, його можна передавати через кожен компонент:

    App
      ↓ props
    Layout
      ↓ props
    Header
      ↓ props
    UserMenu

Це може створювати зайвий код.

Context дозволяє зробити:

    App
      ↓
    Context Provider
      ↓
    Layout
      ↓
    Header
      ↓
    UserMenu

`UserMenu` може отримати Context без того, щоб `Layout` і `Header` передавали `user` через `props`.

---

# Component Tree

React application представляє собою дерево компонентів.

Наприклад:

    App
    ├── Header
    │   ├── Logo
    │   └── UserMenu
    ├── Main
    │   ├── Sidebar
    │   └── Content
    └── Footer

Context дозволяє значенню бути доступним компонентам нижче певного Provider.

Наприклад:

    App
    └── ThemeProvider
        ├── Header
        │   └── ThemeButton
        ├── Main
        │   └── Card
        └── Footer

Якщо `ThemeProvider` надає:

    theme = "dark"

то `ThemeButton`, `Card` та інші descendants можуть читати це значення.

---

# Props Drilling

Props drilling — це ситуація, коли значення передається через кілька компонентів тільки для того, щоб доставити його до глибокого descendant.

Наприклад:

    App
      ↓ user
    Layout
      ↓ user
    Header
      ↓ user
    Navigation
      ↓ user
    UserMenu

`Layout`, `Header` та `Navigation` можуть взагалі не використовувати `user`.

Вони лише передають його далі.

Наприклад:

    function App() {
        const user = {
            name: "John"
        };

        return <Layout user={user} />;
    }

    function Layout({ user }) {
        return <Header user={user} />;
    }

    function Header({ user }) {
        return <Navigation user={user} />;
    }

    function Navigation({ user }) {
        return <UserMenu user={user} />;
    }

    function UserMenu({ user }) {
        return <p>{user.name}</p>;
    }

Це називається:

    props drilling

---

# Props Drilling vs Context

Без Context:

    App
      ↓ props
    Layout
      ↓ props
    Header
      ↓ props
    Navigation
      ↓ props
    UserMenu

З Context:

    App
      ↓
    UserContext.Provider
      ↓
    Layout
      ↓
    Header
      ↓
    Navigation
      ↓
    UserMenu

`UserMenu` читає Context без передачі `user` через кожен проміжний компонент.

---

# Навіщо потрібен Context

Context корисний, коли одне значення потрібно багатьом компонентам.

Наприклад:

    theme
    language
    current user
    authentication status
    permissions
    application configuration

Наприклад, theme може використовуватися:

    Header
    Sidebar
    Button
    Card
    Modal
    Footer

Замість передачі:

    theme
    theme
    theme
    theme
    theme
    theme

можна створити Context.

---

# Context API

Context API складається з кількох основних частин.

Основні інструменти:

    createContext()
    Provider
    useContext()

Наприклад:

    const ThemeContext = createContext("light");

Потім значення можна надати:

    <ThemeContext.Provider value="dark">
        <App />
    </ThemeContext.Provider>

А всередині descendant:

    const theme = useContext(ThemeContext);

Отримуємо:

    "dark"

---

# createContext()

`createContext()` створює Context object.

Синтаксис:

    const SomeContext = createContext(defaultValue);

Наприклад:

    import { createContext } from "react";

    const ThemeContext = createContext("light");

Тепер:

    ThemeContext

є Context object.

---

# Context Object

Результат `createContext()` — це спеціальний Context object.

Наприклад:

    const ThemeContext = createContext("light");

Цей об'єкт використовується для:

    providing a value
    reading a value

Тобто:

    ThemeContext
          ↓
    Provider
          ↓
    consumers

---

# Default Value

При створенні Context можна вказати default value.

Наприклад:

    const ThemeContext = createContext("light");

Тут:

    "light"

є default value.

Це значення використовується, якщо компонент читає Context і для нього немає відповідного Provider вище в tree.

---

# Default Value — важливий момент

Наприклад:

    const ThemeContext = createContext("light");

Компонент:

    function ThemeButton() {
        const theme = useContext(ThemeContext);

        return <button>{theme}</button>;
    }

Якщо `ThemeButton` знаходиться без Provider:

    <ThemeButton />

то:

    theme === "light"

Тобто використовується default value.

---

# Default Value не є State

Дуже важливо розуміти:

    createContext("light")

не створює state.

`"light"` — це лише fallback/default value.

Context сам по собі не має:

    setState
    update function
    automatic state management

Для зміни Context value зазвичай використовується state, який знаходиться у Provider.

---

# Provider

Provider — це механізм, через який Context value передається descendant components.

Класичний синтаксис:

    <ThemeContext.Provider value="dark">
        <App />
    </ThemeContext.Provider>

Усі компоненти всередині цього Provider можуть читати Context.

---

# Provider Tree

Наприклад:

    <ThemeContext.Provider value="dark">
        <App />
    </ThemeContext.Provider>

Дерево:

    ThemeContext.Provider
            │
            └── App
                ├── Header
                ├── Main
                └── Footer

`Header`, `Main`, `Footer` можуть отримати:

    "dark"

через Context.

---

# Context Consumer

Consumer — компонент, який читає Context value.

У сучасному React найчастіше Context читають через:

    useContext()

Наприклад:

    function Button() {
        const theme = useContext(ThemeContext);

        return <button>{theme}</button>;
    }

`Button` є Context consumer.

---

# useContext()

`useContext()` дозволяє прочитати найближчий відповідний Context value.

Синтаксис:

    const value = useContext(SomeContext);

Наприклад:

    const theme = useContext(ThemeContext);

---

# Простий приклад Context

Створюємо Context:

    import { createContext } from "react";

    const ThemeContext = createContext("light");

Provider:

    function App() {
        return (
            <ThemeContext.Provider value="dark">
                <Page />
            </ThemeContext.Provider>
        );
    }

Consumer:

    function Page() {
        const theme = useContext(ThemeContext);

        return <h1>Theme: {theme}</h1>;
    }

Результат:

    Theme: dark

---

# Повний flow

Context працює приблизно так:

    createContext()
          ↓
    Context object
          ↓
    Provider
          ↓
    value
          ↓
    descendant component
          ↓
    useContext()
          ↓
    отримання value

Наприклад:

    const ThemeContext = createContext("light");

          ↓

    <ThemeContext.Provider value="dark">
        <App />
    </ThemeContext.Provider>

          ↓

    const theme = useContext(ThemeContext);

          ↓

    theme === "dark"

---

# Context Without Props Drilling

Без Context:

    function App() {
        const theme = "dark";

        return <Layout theme={theme} />;
    }

    function Layout({ theme }) {
        return <Header theme={theme} />;
    }

    function Header({ theme }) {
        return <Button theme={theme} />;
    }

    function Button({ theme }) {
        return <button>{theme}</button>;
    }

З Context:

    const ThemeContext = createContext("light");

    function App() {
        return (
            <ThemeContext.Provider value="dark">
                <Layout />
            </ThemeContext.Provider>
        );
    }

    function Layout() {
        return <Header />;
    }

    function Header() {
        return <Button />;
    }

    function Button() {
        const theme = useContext(ThemeContext);

        return <button>{theme}</button>;
    }

Проміжні компоненти більше не повинні передавати:

    theme

через props.

---

# Context не прибирає Props

Context не означає:

    "props більше не потрібні"

Props залишаються основним способом передачі даних між батьківським та дочірнім компонентом.

Context корисний, коли:

    багато компонентів
    ↓
    потребують одного shared value
    ↓
    на різних рівнях tree

---

# Props vs Context

### Props

Props добре підходять для:

    parent → child
    explicit data flow
    local component relationships

Наприклад:

    <Button label="Save" />

---

### Context

Context добре підходить для:

    shared values
    deeply nested consumers
    application-wide / subtree-wide configuration

Наприклад:

    theme
    locale
    current user

---

# Explicit vs Implicit Data Flow

Props створюють явний data flow.

Наприклад:

    <Child user={user} />

Видно:

    Child ← user

Context створює менш явний data flow.

Наприклад:

    const user = useContext(UserContext);

Щоб зрозуміти, звідки прийшов `user`, потрібно знайти Provider вище в component tree.

Тому Context робить залежність менш очевидною.

---

# Context як Shared Dependency

Context можна розглядати як спосіб передати shared dependency вниз по component tree.

Наприклад:

    ThemeContext
        ↓
    theme

або:

    AuthContext
        ↓
    current user

або:

    LanguageContext
        ↓
    locale

Це схоже на dependency injection:

    component
        ↓
    отримує dependency
        ↓
    через Context

---

# Context Scope

Context не є автоматично глобальним для всього application.

Його scope визначається розташуванням Provider.

Наприклад:

    <ThemeContext.Provider value="dark">
        <Header />
        <Main />
    </ThemeContext.Provider>

Тут `Header` і `Main` бачать:

    "dark"

А компонент поза Provider:

    <Footer />

не отримує це value.

---

# Context Boundary

Provider створює своєрідну boundary для Context.

Наприклад:

    <ThemeContext.Provider value="dark">
        <Main />
    </ThemeContext.Provider>

    <Footer />

`Main` знаходиться всередині Context boundary.

`Footer` — поза нею.

---

# Nested Providers

Можна мати кілька Provider одного й того самого Context.

Наприклад:

    <ThemeContext.Provider value="dark">
        <Page>

            <ThemeContext.Provider value="light">
                <Card />
            </ThemeContext.Provider>

        </Page>
    </ThemeContext.Provider>

`Page` отримує:

    dark

`Card` отримує:

    light

Найближчий Provider має пріоритет.

---

# Найближчий Provider

Наприклад:

    const ThemeContext = createContext("light");

    <ThemeContext.Provider value="dark">

        <Header />

        <ThemeContext.Provider value="blue">
            <Card />
        </ThemeContext.Provider>

    </ThemeContext.Provider>

`Header` отримує:

    dark

`Card` отримує:

    blue

Тому правило:

    nearest Provider wins

---

# Context Tree

Можна уявити Context як значення, яке поширюється вниз:

    Provider
       │
       ├── Component A
       │
       ├── Component B
       │
       └── Component C
             │
             └── Component D

Якщо всі компоненти читають той самий Context і немає іншого Provider між ними, вони бачать одне value.

---

# Context Value

Provider передає value через prop:

    value={...}

Наприклад:

    <ThemeContext.Provider value="dark">
        <App />
    </ThemeContext.Provider>

Value може бути object:

    <UserContext.Provider
        value={{
            name: "John",
            role: "admin"
        }}
    >
        <App />
    </UserContext.Provider>

Value може бути function:

    <ActionsContext.Provider
        value={{
            save,
            remove
        }}
    >
        <App />
    </ActionsContext.Provider>

---

# Context може містити State

Один із найпоширеніших патернів:

    useState()
        ↓
    Provider
        ↓
    Context
        ↓
    consumers

Наприклад:

    const ThemeContext = createContext("light");

    function ThemeProvider({ children }) {
        const [theme, setTheme] = useState("light");

        return (
            <ThemeContext.Provider
                value={{ theme, setTheme }}
            >
                {children}
            </ThemeContext.Provider>
        );
    }

Тепер descendants можуть отримати:

    theme
    setTheme

---

# Context не зберігає State сам

Наприклад:

    const ThemeContext = createContext("light");

Це не означає, що Context має state.

State знаходиться тут:

    const [theme, setTheme] = useState("light");

Context лише передає:

    theme
    setTheme

до descendants.

Тому:

    State
      +
    Context
      ↓
    Shared state access

---

# Context + useState

Типовий pattern:

    const CountContext = createContext(null);

    function CountProvider({ children }) {
        const [count, setCount] = useState(0);

        return (
            <CountContext.Provider
                value={{ count, setCount }}
            >
                {children}
            </CountContext.Provider>
        );
    }

Consumer:

    function Counter() {
        const { count, setCount } = useContext(CountContext);

        return (
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        );
    }

Тут:

    useState()
        ↓
    state
        ↓
    Provider
        ↓
    Context
        ↓
    useContext()
        ↓
    Consumer

---

# Context + useReducer

Context часто комбінується не тільки з `useState()`, а й з `useReducer()`.

Схема:

    useReducer()
        ↓
    state + dispatch
        ↓
    Context Provider
        ↓
    Consumers

Наприклад:

    const [state, dispatch] = useReducer(reducer, initialState);

Provider може передавати:

    value={{
        state,
        dispatch
    }}

Це дозволяє створювати прості state management patterns.

---

# Context для Theme

Один із найпоширеніших прикладів.

    const ThemeContext = createContext("light");

Provider:

    function App() {
        return (
            <ThemeContext.Provider value="dark">
                <Page />
            </ThemeContext.Provider>
        );
    }

Consumer:

    function Button() {
        const theme = useContext(ThemeContext);

        return (
            <button data-theme={theme}>
                Save
            </button>
        );
    }

---

# Context для Language

Наприклад:

    const LanguageContext = createContext("uk");

Provider:

    <LanguageContext.Provider value="en">
        <App />
    </LanguageContext.Provider>

Consumer:

    function Greeting() {
        const language = useContext(LanguageContext);

        if (language === "uk") {
            return <p>Привіт!</p>;
        }

        return <p>Hello!</p>;
    }

---

# Context для User

Наприклад:

    const UserContext = createContext(null);

Provider:

    <UserContext.Provider value={user}>
        <App />
    </UserContext.Provider>

Consumer:

    function Profile() {
        const user = useContext(UserContext);

        return <p>{user.name}</p>;
    }

---

# Context для Authentication

Context може передавати authentication-related state.

Наприклад:

    {
        user,
        isAuthenticated,
        login,
        logout
    }

Provider:

    <AuthContext.Provider
        value={{
            user,
            isAuthenticated,
            login,
            logout
        }}
    >
        {children}
    </AuthContext.Provider>

Consumer:

    function Header() {
        const {
            user,
            isAuthenticated,
            logout
        } = useContext(AuthContext);

        ...
    }

---

# Context для Configuration

Context також може передавати application configuration.

Наприклад:

    const ConfigContext = createContext({
        apiUrl: "",
        environment: "development"
    });

Provider:

    <ConfigContext.Provider
        value={{
            apiUrl: "/api",
            environment: "development"
        }}
    >
        <App />
    </ConfigContext.Provider>

---

# Context для Permissions

Наприклад:

    const PermissionsContext = createContext([]);

Provider:

    <PermissionsContext.Provider
        value={[
            "read",
            "write"
        ]}
    >
        <App />
    </PermissionsContext.Provider>

Consumer:

    function AdminPanel() {
        const permissions = useContext(PermissionsContext);

        const canWrite = permissions.includes("write");

        if (!canWrite) {
            return null;
        }

        return <div>Admin panel</div>;
    }

---

# Context не повинен містити все

Поганий підхід:

    AppContext

який містить:

    user
    theme
    language
    products
    cart
    notifications
    modal
    sidebar
    permissions
    settings
    ...

Це створює занадто велику dependency surface.

Краще розділяти незалежні Context:

    ThemeContext
    AuthContext
    LanguageContext
    CartContext

---

# Один Context vs кілька Context

Наприклад, замість:

    AppContext

можна мати:

    ThemeContext
    AuthContext
    LanguageContext

Структура:

    <AuthProvider>
        <ThemeProvider>
            <LanguageProvider>
                <App />
            </LanguageProvider>
        </ThemeProvider>
    </AuthProvider>

Це може зробити залежності більш зрозумілими.

---

# Context не є Database

Context не призначений для зберігання великих обсягів даних як database.

Не потрібно думати:

    Context = database

Context — це механізм доступу до значення в React tree.

Наприклад:

    currentUser
    theme
    locale
    settings

можуть бути хорошими Context values.

Але велика collection:

    10000 products

не стає автоматично хорошим кандидатом для Context.

---

# Context vs Server Data

Context і server data — різні концепції.

Server data:

    API
    database
    REST
    GraphQL
    cache
    loading
    error
    synchronization

Context:

    передача значення через React tree

Context може використовуватися разом із server data, але не замінює data-fetching architecture.

---

# Context vs useState

`useState()`:

    створює та зберігає state

Context:

    передає value через tree

Разом:

    useState()
        ↓
    Provider
        ↓
    Context
        ↓
    consumers

---

# Context vs useReducer

`useReducer()`:

    керує складнішим state

Context:

    робить state доступним descendants

Разом:

    useReducer()
        ↓
    state + dispatch
        ↓
    Context
        ↓
    components

---

# Context vs Props

Props:

    explicit
    local
    parent → child

Context:

    shared
    implicit
    parent subtree → descendants

Props:

    <Child user={user} />

Context:

    const user = useContext(UserContext);

---

# Context як dependency injection

Context можна концептуально розглядати як dependency injection mechanism.

Наприклад:

    component
        ↓
    needs theme
        ↓
    useContext(ThemeContext)
        ↓
    receives theme

Компоненту не потрібно знати, який саме ancestor створив value.

---

# Reading Context

Компонент читає Context:

    const theme = useContext(ThemeContext);

Після цього:

    theme

містить current Context value.

---

# Context читається під час Render

Наприклад:

    function Button() {
        const theme = useContext(ThemeContext);

        return (
            <button>
                {theme}
            </button>
        );
    }

Під час render React визначає, яке value відповідає цьому Context.

---

# Якщо Provider відсутній

Наприклад:

    const ThemeContext = createContext("light");

    function Button() {
        const theme = useContext(ThemeContext);

        return <button>{theme}</button>;
    }

Якщо:

    <Button />

не знаходиться всередині Provider, використовується:

    "light"

тобто default value.

---

# Default Value як Fallback

Можна думати про default value як:

    fallback value

Наприклад:

    const LanguageContext = createContext("uk");

Якщо Provider відсутній:

    language === "uk"

---

# Default Value у TypeScript

Наприклад:

    type Theme = "light" | "dark";

    const ThemeContext = createContext<Theme>("light");

Тут Context має тип:

    Theme

а default value:

    "light"

---

# Context з Object

Наприклад:

    type User = {
        id: number;
        name: string;
    };

    const UserContext = createContext<User | null>(null);

Це дозволяє Context містити:

    User
    або
    null

---

# Context Value Object

Наприклад:

    const AuthContext = createContext({
        user: null,
        isAuthenticated: false
    });

Provider:

    <AuthContext.Provider
        value={{
            user,
            isAuthenticated
        }}
    >
        {children}
    </AuthContext.Provider>

Consumer:

    const {
        user,
        isAuthenticated
    } = useContext(AuthContext);

---

# Reference Identity

Якщо Context value є object, важливо пам'ятати про reference identity.

Наприклад:

    <AuthContext.Provider
        value={{
            user,
            logout
        }}
    >
        {children}
    </AuthContext.Provider>

На кожному render може створюватися новий object.

Наприклад:

    {
        user,
        logout
    }

має нову reference identity.

Це може впливати на re-rendering consumers.

Ця тема буде важливішою у розділі:

    12-react-performance

---

# Context Re-render

Якщо Context value змінюється, компоненти, які читають цей Context, можуть бути повторно відрендерені.

Наприклад:

    const ThemeContext = createContext("light");

    function App() {
        const [theme, setTheme] = useState("light");

        return (
            <ThemeContext.Provider value={theme}>
                <Page />
            </ThemeContext.Provider>
        );
    }

Коли:

    setTheme("dark");

Context value змінюється:

    "light"
        ↓
    "dark"

Компоненти, які читають `ThemeContext`, реагують на зміну.

---

# Context Consumers

Consumer — це не обов'язково спеціальний компонент.

У сучасному React consumer часто просто означає компонент, який читає Context через:

    useContext()

Наприклад:

    function Header() {
        const theme = useContext(ThemeContext);

        return <header>{theme}</header>;
    }

`Header` — Context consumer.

---

# Context Provider та Consumer

Основна модель:

    createContext()
          ↓
    Provider
          ↓
    value
          ↓
    Consumer
          ↓
    useContext()

Наприклад:

    const ThemeContext = createContext("light");

    <ThemeContext.Provider value="dark">
        <Button />
    </ThemeContext.Provider>

    function Button() {
        const theme = useContext(ThemeContext);

        return <button>{theme}</button>;
    }

---

# Provider Placement

Дуже важливо правильно вибрати місце Provider.

Не завжди потрібно обгортати весь application.

Наприклад, якщо theme потрібен тільки для:

    Dashboard

можна зробити:

    <DashboardThemeProvider>
        <Dashboard />
    </DashboardThemeProvider>

замість:

    <ThemeProvider>
        <EntireApplication />
    </ThemeProvider>

Provider повинен охоплювати компоненти, які потребують його value.

---

# Provider Too High

Іноді Provider розташовують надто високо.

Наприклад:

    <AppProvider>
        <EntireApplication />
    </AppProvider>

де `AppProvider` містить дуже багато різних values.

Це може зробити архітектуру складнішою.

---

# Provider Too Low

Якщо Provider знаходиться нижче компонента, який повинен читати Context, він не буде доступний.

Наприклад:

    <Page>
        <Header />
        
        <ThemeContext.Provider value="dark">
            <Main />
        </ThemeContext.Provider>
    </Page>

`Header` не бачить:

    "dark"

бо він знаходиться поза Provider.

---

# Context Availability

Правило:

    Consumer
       ↓
    шукає nearest Provider
       ↓
    знаходить value
       ↓
    використовує value

Якщо Provider не знайдений:

    використовує default value

---

# Multiple Contexts

Компонент може читати декілька Context.

Наприклад:

    function Profile() {
        const theme = useContext(ThemeContext);
        const language = useContext(LanguageContext);
        const user = useContext(UserContext);

        ...
    }

Тобто один component може залежати від:

    ThemeContext
    LanguageContext
    UserContext

---

# Multiple Providers

Application може мати кілька Provider.

Наприклад:

    function App() {
        return (
            <AuthProvider>
                <ThemeProvider>
                    <LanguageProvider>
                        <Main />
                    </LanguageProvider>
                </ThemeProvider>
            </AuthProvider>
        );
    }

Тут:

    AuthProvider
    ThemeProvider
    LanguageProvider

створюють різні Context dependencies.

---

# Provider Composition

Якщо Provider стає багато:

    <AuthProvider>
        <ThemeProvider>
            <LanguageProvider>
                <CartProvider>
                    <NotificationProvider>
                        <App />
                    </NotificationProvider>
                </CartProvider>
            </LanguageProvider>
        </ThemeProvider>
    </AuthProvider>

структура може стати складною.

Тоді можна створити окремий компонент:

    function AppProviders({ children }) {
        return (
            <AuthProvider>
                <ThemeProvider>
                    <LanguageProvider>
                        <CartProvider>
                            {children}
                        </CartProvider>
                    </LanguageProvider>
                </ThemeProvider>
            </AuthProvider>
        );
    }

І використовувати:

    <AppProviders>
        <App />
    </AppProviders>

Це буде розглядатися детальніше у:

    05-context-patterns

---

# Context Architecture

Хороша Context architecture зазвичай:

    Context
        ↓
    Provider
        ↓
    state / dependencies
        ↓
    consumers

Наприклад:

    AuthContext
        ↓
    AuthProvider
        ↓
    user + login + logout
        ↓
    Header / Profile / ProtectedPage

---

# Context Naming

Зазвичай Context називають за dependency.

Наприклад:

    ThemeContext
    AuthContext
    UserContext
    LanguageContext
    CartContext

Provider:

    ThemeProvider
    AuthProvider
    UserProvider
    LanguageProvider
    CartProvider

---

# Context File

Простий Context можна організувати так:

    ThemeContext.tsx

Наприклад:

    import {
        createContext,
        useContext,
        useState
    } from "react";

    type Theme = "light" | "dark";

    const ThemeContext = createContext<Theme>("light");

    export function ThemeProvider({ children }) {
        const [theme, setTheme] = useState<Theme>("light");

        return (
            <ThemeContext.Provider value={theme}>
                {children}
            </ThemeContext.Provider>
        );
    }

    export function useTheme() {
        return useContext(ThemeContext);
    }

Це вже наближається до reusable Context pattern.

---

# Context Does Not Automatically Mean Global State

Поширена помилка:

    Context = global state

Точніше:

    Context = mechanism for passing values through a React tree

Context може бути:

    application-wide

але також може бути:

    feature-wide
    page-wide
    subtree-wide

---

# Local State vs Context

Якщо state потрібен тільки одному компоненту:

    useState()

Якщо state потрібен parent + child:

    props

Якщо state потрібен багатьом deep descendants:

    Context може бути доречним

Наприклад:

    Button
        ↓
    Modal
        ↓
    Form

Якщо тільки Form використовує `isLoading`, Context може бути зайвим.

---

# Коли Context НЕ потрібен

Не варто використовувати Context лише тому, що можна.

Наприклад:

    function Parent() {
        const [count, setCount] = useState(0);

        return <Child count={count} />;
    }

    function Child({ count }) {
        return <p>{count}</p>;
    }

Тут Context не потрібен.

Props є простішим рішенням.

---

# Context для одного рівня

Якщо дані передаються:

    Parent
      ↓
    Child

не потрібно створювати Context тільки для цього.

Краще:

    <Child value={value} />

Context стає кориснішим, коли є:

    deep tree
    many consumers
    shared dependency

---

# Context and Component Reuse

Context створює dependency.

Наприклад:

    function Button() {
        const theme = useContext(ThemeContext);

        ...
    }

Тепер `Button` залежить від:

    ThemeContext

Це може впливати на його reusable nature.

Component із props:

    <Button theme="dark" />

має явну dependency.

Component із Context:

    <Button />

може виглядати простіше, але його dependency прихована.

---

# Context Dependency

Якщо component використовує:

    useContext(ThemeContext)

це означає:

    component depends on ThemeContext

Тому Context — це архітектурне рішення, а не просто спосіб скоротити кількість props.

---

# Context and Testing

Context-dependent component може потребувати Provider під час тестування.

Наприклад:

    function Button() {
        const theme = useContext(ThemeContext);

        return <button>{theme}</button>;
    }

У test environment можна знадобитися:

    <ThemeContext.Provider value="dark">
        <Button />
    </ThemeContext.Provider>

Тому Context dependencies важливо враховувати під час testing.

---

# Context and React Server Components

У сучасному React Context пов'язаний із client-side React state та component tree.

У Next.js особливо важливо розуміти різницю між:

    Server Components
    Client Components

Hooks на кшталт:

    useContext()

належать до React client-side interaction model.

У Next.js Context Provider часто реалізують у Client Component і розміщують на відповідному рівні application tree.

---

# Context у Next.js

У Next.js App Router Context Provider часто виглядає приблизно так:

    "use client";

    import { createContext } from "react";

    export const ThemeContext = createContext("light");

Потім Provider можна розмістити у layout або іншій частині tree.

Наприклад:

    <ThemeProvider>
        {children}
    </ThemeProvider>

Важливо розуміти:

    Context Provider
        ↓
    Client Component boundary
        ↓
    descendants

Деталі Next.js будуть важливішими вже під час практики.

---

# Context Flow Example

Повний приклад:

    import {
        createContext,
        useContext
    } from "react";

    const ThemeContext = createContext("light");

    function App() {
        return (
            <ThemeContext.Provider value="dark">
                <Page />
            </ThemeContext.Provider>
        );
    }

    function Page() {
        return <Header />;
    }

    function Header() {
        return <Button />;
    }

    function Button() {
        const theme = useContext(ThemeContext);

        return (
            <button>
                Current theme: {theme}
            </button>
        );
    }

Результат:

    Current theme: dark

При цьому:

    Page

і:

    Header

не отримують `theme` через props.

---

# Практичний приклад — Theme

    import {
        createContext,
        useContext
    } from "react";

    const ThemeContext = createContext("light");

    function App() {
        return (
            <ThemeContext.Provider value="dark">
                <Header />
                <Main />
            </ThemeContext.Provider>
        );
    }

    function Header() {
        const theme = useContext(ThemeContext);

        return (
            <header data-theme={theme}>
                Header
            </header>
        );
    }

    function Main() {
        const theme = useContext(ThemeContext);

        return (
            <main data-theme={theme}>
                Main
            </main>
        );
    }

---

# Практичний приклад — User

    const UserContext = createContext(null);

    function App() {
        const user = {
            name: "John",
            role: "admin"
        };

        return (
            <UserContext.Provider value={user}>
                <Dashboard />
            </UserContext.Provider>
        );
    }

    function Dashboard() {
        return <Profile />;
    }

    function Profile() {
        const user = useContext(UserContext);

        return (
            <div>
                <h2>{user.name}</h2>
                <p>{user.role}</p>
            </div>
        );
    }

---

# Практичний приклад — Language

    const LanguageContext = createContext("uk");

    function App() {
        return (
            <LanguageContext.Provider value="en">
                <Page />
            </LanguageContext.Provider>
        );
    }

    function Page() {
        const language = useContext(LanguageContext);

        return (
            <p>
                Current language: {language}
            </p>
        );
    }

---

# Практичний приклад — State + Context

    const CountContext = createContext(null);

    function CountProvider({ children }) {
        const [count, setCount] = useState(0);

        return (
            <CountContext.Provider
                value={{
                    count,
                    setCount
                }}
            >
                {children}
            </CountContext.Provider>
        );
    }

Consumer:

    function Counter() {
        const {
            count,
            setCount
        } = useContext(CountContext);

        return (
            <button
                onClick={() => setCount(count + 1)}
            >
                Count: {count}
            </button>
        );
    }

Application:

    function App() {
        return (
            <CountProvider>
                <Counter />
            </CountProvider>
        );
    }

---

# Context Mental Model

Корисно мислити так:

    Props
        ↓
    explicit data passing

    Context
        ↓
    shared data access

    State
        ↓
    changing data

Тому:

    state + context

можуть працювати разом.

---

# Context Lifecycle

Для базового розуміння:

    createContext()
        ↓
    Provider mounted
        ↓
    value available
        ↓
    consumer reads value
        ↓
    value changes
        ↓
    consumer updates
        ↓
    Provider unmounts
        ↓
    context scope disappears

---

# Context Update

Наприклад:

    const [theme, setTheme] = useState("light");

Provider:

    <ThemeContext.Provider value={theme}>
        <App />
    </ThemeContext.Provider>

Зміна:

    setTheme("dark");

Flow:

    setTheme("dark")
        ↓
    Provider renders again
        ↓
    Context value = "dark"
        ↓
    Context consumers update

---

# Context Value Can Be Function

Context може передавати functions.

Наприклад:

    const AuthContext = createContext(null);

Provider:

    function AuthProvider({ children }) {
        function login() {
            ...
        }

        function logout() {
            ...
        }

        return (
            <AuthContext.Provider
                value={{
                    login,
                    logout
                }}
            >
                {children}
            </AuthContext.Provider>
        );
    }

Consumer:

    function LoginButton() {
        const { login } = useContext(AuthContext);

        return (
            <button onClick={login}>
                Login
            </button>
        );
    }

---

# Context Value Can Be State + Actions

Поширений pattern:

    {
        state,
        actions
    }

Наприклад:

    {
        user,
        login,
        logout
    }

або:

    {
        theme,
        setTheme
    }

або:

    {
        count,
        increment,
        decrement
    }

Це створює API для Context.

---

# Context API Design

Context можна розглядати як API для descendants.

Наприклад:

    AuthContext

може надавати:

    user
    isAuthenticated
    login
    logout

Тоді consumer використовує:

    const {
        user,
        isAuthenticated,
        login,
        logout
    } = useContext(AuthContext);

Consumer не повинен знати внутрішню реалізацію AuthProvider.

---

# Context Contract

Добре спроєктований Context має зрозумілий contract.

Наприклад:

    ThemeContext

надає:

    theme
    setTheme

А:

    AuthContext

надає:

    user
    isAuthenticated
    login
    logout

Важливо не змішувати unrelated responsibilities.

---

# Context Responsibilities

Хороший Context зазвичай має одну логічну responsibility.

Наприклад:

    ThemeContext
        → theme

    AuthContext
        → authentication

    LanguageContext
        → locale

Замість:

    GlobalContext
        → everything

---

# Типові помилки

❌ Використовувати Context для будь-якого state.

Context не потрібен, якщо:

    state is local

---

❌ Вважати Context глобальною змінною.

Context працює в межах React component tree.

---

❌ Створювати один величезний Context.

Наприклад:

    AppContext

з десятками unrelated values.

---

❌ Використовувати Context замість props для простого parent → child communication.

Якщо:

    Parent
      ↓
    Child

і дані потрібні тільки Child, props зазвичай простіші.

---

❌ Забувати Provider.

Наприклад:

    const theme = useContext(ThemeContext);

але відповідного Provider немає.

Тоді буде використано default value.

---

❌ Не розуміти default value.

Default value:

    createContext(defaultValue)

не є initial state.

---

❌ Передавати занадто великий object через Context.

Наприклад:

    value={{
        users,
        products,
        orders,
        settings,
        theme,
        cart,
        notifications
    }}

Це може створити зайві dependencies та re-renders.

---

❌ Не враховувати reference identity.

Наприклад:

    value={{
        theme,
        setTheme
    }}

object створюється під час render.

Питання оптимізації будуть розглядатися окремо.

---

❌ Ховати надто багато dependencies.

Компонент:

    function Button() {
        const user = useContext(UserContext);
        const theme = useContext(ThemeContext);
        const settings = useContext(SettingsContext);

        ...
    }

має багато implicit dependencies.

---

# Context vs Props — практичний вибір

Якщо дані потрібні одному child:

    props

Якщо дані потрібні кільком descendants:

    props
    або
    Context

Якщо виникає глибокий props drilling:

    Context може бути хорошим кандидатом.

Якщо data flow має бути максимально explicit:

    props

часто простіші.

---

# Context vs State Management Library

Context не є повною заміною state management libraries.

Context:

    value propagation

State management library може надавати:

    state management
    selectors
    subscriptions
    middleware
    persistence
    devtools
    optimized updates

Context може бути достатнім для:

    theme
    auth
    locale
    small shared state

Для складних application state requirements можуть використовуватися інші рішення.

---

# Context Patterns

Базовий Context:

    createContext()
        ↓
    Provider
        ↓
    useContext()

Пізніше можна будувати:

    Context + useState
    Context + useReducer
    custom hooks
    split contexts
    provider composition
    optimized providers

Ці підходи будуть розглянуті в наступних розділах.

---

# Context and Custom Hooks

Замість:

    const theme = useContext(ThemeContext);

можна створити:

    function useTheme() {
        return useContext(ThemeContext);
    }

І використовувати:

    const theme = useTheme();

Це дозволяє приховати implementation details Context.

Цей pattern буде детальніше розглядатися в:

    05-context-patterns

та:

    04-hooks

---

# Context Basics — Mental Diagram

    createContext()
          │
          ▼
    Context object
          │
          ▼
       Provider
          │
          │ value
          ▼
    Component tree
          │
          ▼
      Consumer
          │
          ▼
     useContext()
          │
          ▼
       value

---

# Context Data Flow

Наприклад:

    const ThemeContext = createContext("light");

    function App() {
        const [theme, setTheme] = useState("light");

        return (
            <ThemeContext.Provider value={theme}>
                <Page />
            </ThemeContext.Provider>
        );
    }

    function Page() {
        return <Header />;
    }

    function Header() {
        return <Button />;
    }

    function Button() {
        const theme = useContext(ThemeContext);

        return <button>{theme}</button>;
    }

Data flow:

    useState
       ↓
    theme
       ↓
    Provider
       ↓
    Context
       ↓
    Button
       ↓
    useContext
       ↓
    theme

---

# Співбесіда

Що таке React Context?

Для чого потрібен Context?

Яку проблему вирішує Context?

Що таке props drilling?

Як Context допомагає уникати props drilling?

Що робить `createContext()`?

Що таке Context object?

Що таке Provider?

Що таке Consumer?

Як прочитати Context?

Що робить `useContext()`?

Що таке default value?

Коли використовується default value?

Чи є default value initial state?

Чи є Context state management?

Яка різниця між Context і `useState()`?

Яка різниця між Context і props?

Коли краще використовувати props?

Коли краще використовувати Context?

Чи є Context глобальним state?

Чи можна мати кілька Provider одного Context?

Що станеться, якщо є nested Providers?

Який Provider буде використано?

Що відбувається, якщо Consumer знаходиться поза Provider?

Чи може Context містити object?

Чи може Context містити function?

Чи може Context містити state?

Як поєднати Context з `useState()`?

Як поєднати Context з `useReducer()`?

Чому не варто створювати один величезний Context?

Чому Context може спричиняти re-renders?

Що таке Context dependency?

Чим Context відрізняється від state management library?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке Context.

Для чого потрібен Context.

Props drilling.

`createContext()`.

Context object.

Provider.

Consumer.

`useContext()`.

Default value.

Context value.

Context tree.

Nearest Provider.

Context scope.

Context + props.

Context + state.

Context + `useState()`.

Основні use cases:

    theme
    language
    user
    authentication
    settings

Розуміння:

    Context ≠ State

---

🔵 Junior

Уміти створити Context.

Уміти створити Provider.

Уміти передати value.

Уміти прочитати value через `useContext()`.

Розуміти default value.

Розуміти nearest Provider.

Розуміти nested Providers.

Розуміти Context scope.

Розуміти props drilling.

Розуміти Context vs props.

Розуміти Context vs `useState()`.

Розуміти Context + `useState()`.

Розуміти Context + `useReducer()`.

Уміти створювати:

    ThemeContext
    AuthContext
    LanguageContext
    UserContext

Розуміти Context dependencies.

Розуміти базову проблему re-rendering Context consumers.

---

🟠 Middle

Проєктувати Context API.

Розділяти Context за responsibilities.

Створювати Provider components.

Використовувати Context + custom hooks.

Використовувати Context + `useReducer()`.

Розділяти state та actions.

Розуміти reference identity Context value.

Розуміти Context re-render behavior.

Оптимізувати Provider architecture.

Використовувати multiple Contexts.

Проєктувати provider composition.

Розуміти Context у Next.js.

Розуміти Client Components та Context.

Балансувати:

    props
    context
    local state
    shared state

---

🔴 Senior

Глибоке розуміння Context propagation.

Context update mechanics.

Reference identity.

Consumer subscriptions.

Granular subscriptions.

Context splitting.

Provider composition.

Context performance.

State colocation.

State lifting.

Dependency boundaries.

Context architecture у великих applications.

Context vs external state management.

Server state vs client state.

Context + concurrent rendering.

Context + Server Components architecture.

Designing scalable Context APIs.

Avoiding unnecessary Context dependencies.

Архітектурні trade-offs між:

    props
    context
    custom hooks
    reducers
    external state stores

---

# Міні-шпаргалка

## createContext

    const ThemeContext = createContext("light");

Створює Context.

---

## Provider

    <ThemeContext.Provider value="dark">
        <App />
    </ThemeContext.Provider>

Передає value descendants.

---

## useContext

    const theme = useContext(ThemeContext);

Читає найближчий відповідний Context value.

---

## Default Value

    const ThemeContext = createContext("light");

Якщо Provider відсутній:

    theme === "light"

---

## Props Drilling

    App
      ↓ props
    Layout
      ↓ props
    Header
      ↓ props
    Button

Context може перетворити це на:

    App
      ↓
    Provider
      ↓
    Layout
      ↓
    Header
      ↓
    Button
             ↑
        useContext()

---

## Context + State

    const [theme, setTheme] = useState("light");

    <ThemeContext.Provider value={theme}>
        {children}
    </ThemeContext.Provider>

State:

    useState()

Context:

    передачa state descendants.

---

## Context + Actions

    <AuthContext.Provider
        value={{
            user,
            login,
            logout
        }}
    >
        {children}
    </AuthContext.Provider>

---

## Nearest Provider

    <ThemeContext.Provider value="dark">
        <Header />

        <ThemeContext.Provider value="light">
            <Card />
        </ThemeContext.Provider>
    </ThemeContext.Provider>

    Header → dark
    Card   → light

---

## Scope

    Provider
       ↓
    descendants

Context доступний у межах відповідного subtree.

---

## Основна модель

    createContext()
          ↓
       Provider
          ↓
        value
          ↓
      component
          ↓
     useContext()
          ↓
        value

---

## Context vs Props

    props
        → explicit data passing
        → parent → child

    context
        → shared value access
        → provider → descendants

---

## Context vs State

    state
        → stores changing data

    context
        → provides data to descendants

Разом:

    state + context
          ↓
    shared state access

---

## Context vs Global Variable

    global variable
        → JavaScript module/global scope

    Context
        → React component tree scope

Context не робить значення глобальною JavaScript-змінною.

---

## Основні use cases

    Theme
    Language
    Current user
    Authentication
    Permissions
    Application settings

---

# Головне:

• Context — механізм React для передачі значення через component tree.

• Context особливо корисний, коли значення потрібне багатьом descendants.

• Context часто використовується для вирішення props drilling.

• `createContext()` створює Context object.

• Provider передає Context value.

• `useContext()` читає Context value.

• Default value задається під час:

    createContext(defaultValue)

• Default value використовується, якщо відповідного Provider вище в tree немає.

• Default value не є initial state.

• Context сам по собі не є state management.

• `useState()` зберігає state.

• Context передає value.

• Тому типовий pattern:

    useState()
        ↓
    Provider
        ↓
    Context
        ↓
    useContext()

• Props залишаються основним способом explicit data passing.

• Context не потрібно використовувати для кожного state.

• Якщо значення потрібне лише одному child, props зазвичай простіші.

• Якщо значення потрібне багатьом deep descendants, Context може бути доречним.

• Context має scope, який визначається Provider.

• Context не є автоматично глобальним.

• Можна мати кілька Provider одного Context.

• У випадку nested Providers використовується найближчий Provider.

• Компонент поза Provider отримує default value.

• Context value може бути:

    string
    number
    boolean
    object
    array
    function
    state
    state + actions

• Context можна комбінувати з:

    useState()
    useReducer()
    custom hooks

• Не варто створювати один величезний Context для всього application.

• Краще розділяти Context за логічними responsibilities:

    ThemeContext
    AuthContext
    LanguageContext
    CartContext

• Context створює implicit dependency для consumer.

• `useContext()` дозволяє компоненту отримати dependency без передачі її через props.

• Context value може впливати на re-rendering consumers.

• Object value має reference identity, яку потрібно враховувати під час оптимізації.

• Context не є database.

• Context не є автоматичною заміною state management library.

• Context не замінює server state management.

• Основна модель:

    createContext()
          ↓
       Provider
          ↓
        value
          ↓
    component tree
          ↓
      consumer
          ↓
     useContext()
          ↓
        value

• Найважливіше правило:

    Props → коли потрібна явна передача даних.

    Context → коли value спільне для багатьох descendants.

    State → коли потрібно зберігати та змінювати дані.

• Найважливіша концепція цього розділу:

    Context не зберігає state сам по собі.

    Context передає value через React tree.

• Наступний крок:

    06-context
    └── 02-create-context

де детальніше розглядається:

    createContext()
    default value
    Context object
    типізація Context
    структура Context
    Context API