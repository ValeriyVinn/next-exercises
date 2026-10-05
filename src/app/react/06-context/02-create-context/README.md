# React — createContext()

`createContext()` — це React API, який створює Context object.

Context дозволяє передавати значення від компонента-предка до компонентів-нащадків без необхідності передавати це значення через `props` на кожному рівні component tree.

Базова модель:

    createContext()
        ↓
    Context object
        ↓
    Provider
        ↓
    value
        ↓
    descendant components
        ↓
    useContext()

---

### Ключові поняття

✔ `createContext()`  
✔ Context object  
✔ Context  
✔ default value  
✔ Provider  
✔ Consumer  
✔ `useContext()`  
✔ context value  
✔ context scope  
✔ props drilling  
✔ nearest Provider  
✔ nested Provider  
✔ Context type  
✔ generic type  
✔ nullable Context  
✔ Context contract  
✔ Context dependency  
✔ context initialization  
✔ context API  
✔ context composition  

---

### Що потрібно пам'ятати

• `createContext()` створює Context object.

• Синтаксис:

    const SomeContext = createContext(defaultValue);

• `defaultValue` — це fallback value, яке використовується, коли компонент читає Context без відповідного Provider вище в tree.

• `createContext()` не створює state.

• `createContext()` не створює Provider автоматично як окремий компонент.

• Context object використовується для передачі value через React tree.

• Provider визначає value:

    <SomeContext.Provider value={value}>
        ...
    </SomeContext.Provider>

• Consumer читає value через:

    useContext(SomeContext)

• `defaultValue` не є initial state.

• Context може містити будь-який JavaScript value:

    string
    number
    boolean
    object
    array
    function
    state
    state + actions

• У TypeScript бажано явно визначати тип Context.

• Якщо Context може бути відсутнім, часто використовують:

    SomeType | null

• Context API повинен мати зрозумілий contract.

---

# Що робить createContext()

`createContext()` створює Context object.

Наприклад:

    import { createContext } from "react";

    const ThemeContext = createContext("light");

Тепер:

    ThemeContext

є Context object.

Його можна використовувати для:

    providing a value
    reading a value

---

# Синтаксис

Базовий синтаксис:

    const SomeContext = createContext(defaultValue);

Наприклад:

    const ThemeContext = createContext("light");

Або:

    const LanguageContext = createContext("uk");

Або:

    const CountContext = createContext(0);

---

# Context Object

Після:

    const ThemeContext = createContext("light");

змінна:

    ThemeContext

містить спеціальний React Context object.

Це не саме значення:

    "light"

а об'єкт Context, який використовується React для роботи з цим value.

Тобто:

    ThemeContext
        ↓
    Context object

а:

    "light"
        ↓
    default value

---

# createContext() не створює State

Дуже важливо не плутати:

    createContext()

і:

    useState()

`createContext()`:

    створює Context

`useState()`:

    створює state

Наприклад:

    const ThemeContext = createContext("light");

Тут немає state.

А тут:

    const [theme, setTheme] = useState("light");

є state.

---

# createContext() vs useState()

`createContext()`:

    const ThemeContext = createContext("light");

означає:

    створити Context object

`useState()`:

    const [theme, setTheme] = useState("light");

означає:

    створити state

Їх часто використовують разом:

    useState()
        ↓
    state
        ↓
    Context Provider
        ↓
    descendants

---

# Default Value

Основна особливість `createContext()` — він приймає `defaultValue`.

Наприклад:

    const ThemeContext = createContext("light");

Тут:

    "light"

є default value.

---

# Навіщо потрібен default value

Default value використовується, якщо Context consumer не знаходить відповідного Provider вище в component tree.

Наприклад:

    const ThemeContext = createContext("light");

    function Button() {
        const theme = useContext(ThemeContext);

        return <button>{theme}</button>;
    }

Якщо:

    <Button />

знаходиться поза Provider, результатом буде:

    "light"

---

# Default Value — Fallback

Default value можна уявляти як fallback:

    Provider found
        ↓
    use Provider value

    Provider not found
        ↓
    use default value

Наприклад:

    const ThemeContext = createContext("light");

    <ThemeContext.Provider value="dark">
        <Button />
    </ThemeContext.Provider>

`Button` отримує:

    dark

Без Provider:

    <Button />

`Button` отримує:

    light

---

# Default Value не є Initial Value

Це одна з найважливіших концепцій.

Наприклад:

    const ThemeContext = createContext("light");

`"light"` не означає:

    initial theme state

Це означає:

    fallback Context value

Якщо Provider передає:

    "dark"

то consumer отримає:

    "dark"

---

# createContext() і Provider

Сам `createContext()` лише створює Context object.

Наприклад:

    const ThemeContext = createContext("light");

Щоб передати інше value, потрібен Provider.

Наприклад:

    <ThemeContext.Provider value="dark">
        <App />
    </ThemeContext.Provider>

Flow:

    createContext()
        ↓
    Context object
        ↓
    Provider
        ↓
    value

---

# Простий приклад

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

        return <p>{theme}</p>;
    }

Результат:

    dark

---

# createContext() + useContext()

Це базова пара API.

Створення:

    const ThemeContext = createContext("light");

Читання:

    const theme = useContext(ThemeContext);

Повний flow:

    createContext()
        ↓
    ThemeContext
        ↓
    Provider
        ↓
    value
        ↓
    useContext(ThemeContext)
        ↓
    theme

---

# createContext() + Provider

Наприклад:

    const ThemeContext = createContext("light");

    function App() {
        return (
            <ThemeContext.Provider value="dark">
                <Page />
            </ThemeContext.Provider>
        );
    }

Provider передає:

    value="dark"

до descendants.

---

# createContext() + Consumer

Consumer читає Context:

    function Page() {
        const theme = useContext(ThemeContext);

        return <p>{theme}</p>;
    }

Тут:

    Page

є Context consumer.

---

# Context Naming

Context зазвичай називають за значенням або responsibility.

Наприклад:

    ThemeContext
    UserContext
    AuthContext
    LanguageContext
    CartContext
    SettingsContext

Не дуже хороший варіант:

    DataContext
    GlobalContext
    AppContext

якщо вони містять багато unrelated data.

Краще:

    ThemeContext
    AuthContext
    LanguageContext

---

# ThemeContext

Типовий приклад:

    const ThemeContext = createContext("light");

Provider:

    <ThemeContext.Provider value="dark">
        <App />
    </ThemeContext.Provider>

Consumer:

    const theme = useContext(ThemeContext);

---

# LanguageContext

Наприклад:

    const LanguageContext = createContext("uk");

Provider:

    <LanguageContext.Provider value="en">
        <App />
    </LanguageContext.Provider>

Consumer:

    const language = useContext(LanguageContext);

---

# UserContext

Наприклад:

    const UserContext = createContext(null);

Provider:

    <UserContext.Provider value={user}>
        <App />
    </UserContext.Provider>

Consumer:

    const user = useContext(UserContext);

---

# AuthContext

Наприклад:

    const AuthContext = createContext(null);

Він може містити:

    user
    isAuthenticated
    login
    logout

Provider:

    <AuthContext.Provider
        value={{
            user,
            isAuthenticated,
            login,
            logout
        }}
    >
        <App />
    </AuthContext.Provider>

---

# Context Value

Context може передавати просте значення.

Наприклад:

    const ThemeContext = createContext("light");

Provider:

    <ThemeContext.Provider value="dark">
        ...
    </ThemeContext.Provider>

Value:

    "dark"

---

# Context Value — Number

    const CountContext = createContext(0);

Provider:

    <CountContext.Provider value={10}>
        ...
    </CountContext.Provider>

Consumer:

    const count = useContext(CountContext);

Результат:

    10

---

# Context Value — Boolean

    const AuthContext = createContext(false);

Provider:

    <AuthContext.Provider value={true}>
        ...
    </AuthContext.Provider>

Consumer:

    const isAuthenticated = useContext(AuthContext);

---

# Context Value — Object

Context може містити object.

Наприклад:

    const UserContext = createContext({
        name: "",
        role: ""
    });

Provider:

    <UserContext.Provider
        value={{
            name: "John",
            role: "admin"
        }}
    >
        <App />
    </UserContext.Provider>

Consumer:

    const user = useContext(UserContext);

---

# Context Value — Array

Context може містити array.

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

---

# Context Value — Function

Context може передавати function.

Наприклад:

    const ActionsContext = createContext({
        save: () => {},
        remove: () => {}
    });

Provider:

    <ActionsContext.Provider
        value={{
            save,
            remove
        }}
    >
        <App />
    </ActionsContext.Provider>

---

# Context Value — State

Context може передавати state.

Наприклад:

    const ThemeContext = createContext("light");

    function ThemeProvider({ children }) {
        const [theme, setTheme] = useState("light");

        return (
            <ThemeContext.Provider value={theme}>
                {children}
            </ThemeContext.Provider>
        );
    }

Тут:

    useState()
        ↓
    theme
        ↓
    Context value

---

# Context Value — State + Actions

Поширений pattern:

    const ThemeContext = createContext(null);

Provider:

    function ThemeProvider({ children }) {
        const [theme, setTheme] = useState("light");

        return (
            <ThemeContext.Provider
                value={{
                    theme,
                    setTheme
                }}
            >
                {children}
            </ThemeContext.Provider>
        );
    }

Consumer:

    const {
        theme,
        setTheme
    } = useContext(ThemeContext);

---

# Context Contract

Context повинен мати зрозумілий contract.

Наприклад:

    ThemeContext

може надавати:

    theme
    setTheme

AuthContext:

    user
    isAuthenticated
    login
    logout

LanguageContext:

    language
    setLanguage

Не варто без причини змішувати:

    theme
    user
    products
    cart
    notifications
    language

в одному Context.

---

# Context Responsibility

Один Context бажано використовувати для однієї логічної responsibility.

Наприклад:

    ThemeContext
        ↓
    theme

    AuthContext
        ↓
    authentication

    LanguageContext
        ↓
    language

Це робить архітектуру зрозумілішою.

---

# Context Type

У TypeScript важливо правильно типізувати Context.

Наприклад:

    type Theme = "light" | "dark";

    const ThemeContext =
        createContext<Theme>("light");

Тепер Context має тип:

    Theme

---

# Generic Type

Синтаксис:

    createContext<Type>(defaultValue);

Наприклад:

    type Theme = "light" | "dark";

    const ThemeContext =
        createContext<Theme>("light");

Тут:

    Theme

є generic type argument.

---

# String Context у TypeScript

Простий варіант:

    const LanguageContext =
        createContext<string>("uk");

Але якщо значення має обмежений набір:

    type Language = "uk" | "en";

    const LanguageContext =
        createContext<Language>("uk");

Другий варіант точніший.

---

# Boolean Context у TypeScript

    const AuthContext =
        createContext<boolean>(false);

Тоді Context value повинен бути:

    true

або:

    false

---

# Number Context у TypeScript

    const CountContext =
        createContext<number>(0);

---

# Object Context у TypeScript

Наприклад:

    type User = {
        id: number;
        name: string;
        role: string;
    };

    const UserContext =
        createContext<User>({
            id: 0,
            name: "",
            role: ""
        });

---

# Nullable Context

Часто Context може бути недоступним без Provider.

Тоді можна написати:

    type User = {
        id: number;
        name: string;
    };

    const UserContext =
        createContext<User | null>(null);

Тут:

    UserContext

може містити:

    User

або:

    null

---

# Чому використовувати null

Наприклад:

    const AuthContext =
        createContext<AuthContextValue | null>(null);

Це чесно описує ситуацію:

    Provider може бути відсутній.

Consumer:

    const auth = useContext(AuthContext);

Тоді TypeScript знає:

    auth
        ↓
    AuthContextValue | null

Потрібно врахувати `null`.

---

# Nullable Context — перевірка

Наприклад:

    const auth = useContext(AuthContext);

    if (!auth) {
        return null;
    }

Після перевірки TypeScript знає, що:

    auth

не є `null`.

---

# Context Value Type

Краще окремо визначати тип value.

Наприклад:

    type AuthContextValue = {
        user: User | null;
        isAuthenticated: boolean;
        login: () => void;
        logout: () => void;
    };

Потім:

    const AuthContext =
        createContext<AuthContextValue | null>(null);

Це хороший фундамент для typed Context.

---

# Context Interface

Замість `type` можна використовувати `interface`.

    interface ThemeContextValue {
        theme: "light" | "dark";
        setTheme: (theme: "light" | "dark") => void;
    }

Потім:

    const ThemeContext =
        createContext<ThemeContextValue | null>(null);

Обидва підходи можливі.

---

# Type Inference

TypeScript часто може вивести тип із default value.

Наприклад:

    const ThemeContext =
        createContext("light");

TypeScript визначить type на основі `"light"`.

Але тут є потенційна проблема.

Якщо потрібно:

    "light" | "dark"

краще явно визначити тип:

    type Theme = "light" | "dark";

    const ThemeContext =
        createContext<Theme>("light");

---

# Literal Type

Наприклад:

    const ThemeContext =
        createContext("light");

Не варто автоматично припускати, що Context завжди повинен мати тільки:

    "light"

Якщо Provider може передавати:

    "dark"

краще описати domain type:

    type Theme = "light" | "dark";

    const ThemeContext =
        createContext<Theme>("light");

---

# Context Type — хороший підхід

    type Theme = "light" | "dark";

    type ThemeContextValue = {
        theme: Theme;
        setTheme: (theme: Theme) => void;
    };

    const ThemeContext =
        createContext<ThemeContextValue | null>(null);

Це чітко описує API Context.

---

# createContext() з null

Поширений TypeScript pattern:

    const AuthContext =
        createContext<AuthContextValue | null>(null);

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

    const auth = useContext(AuthContext);

Тепер `auth` може бути:

    AuthContextValue
    або
    null

---

# Context Without Provider

Якщо Context:

    const AuthContext =
        createContext<AuthContextValue | null>(null);

і component знаходиться без Provider:

    const auth = useContext(AuthContext);

результат:

    null

Тому consumer повинен врахувати це.

---

# Guard Pattern

Один із поширених способів:

    const auth = useContext(AuthContext);

    if (!auth) {
        throw new Error(
            "AuthContext must be used within AuthProvider"
        );
    }

Після цього:

    auth

вважається non-null.

Це буде детальніше розглядатися у context patterns.

---

# Context Object Export

Context часто експортують із файлу.

Наприклад:

    import { createContext } from "react";

    export const ThemeContext =
        createContext<Theme>("light");

Тепер його можна імпортувати:

    import { ThemeContext } from "./ThemeContext";

---

# File Structure

Простий Context може мати:

    ThemeContext.tsx

або:

    context/
    ├── ThemeContext.tsx
    └── AuthContext.tsx

Для більшої application:

    context/
    ├── theme/
    │   ├── ThemeContext.tsx
    │   └── ThemeProvider.tsx
    ├── auth/
    │   ├── AuthContext.tsx
    │   └── AuthProvider.tsx
    └── language/
        ├── LanguageContext.tsx
        └── LanguageProvider.tsx

Структура залежить від розміру application.

---

# Context Definition

Context definition зазвичай містить:

    import { createContext } from "react";

    type Theme = "light" | "dark";

    export const ThemeContext =
        createContext<Theme>("light");

Це лише створення Context.

Provider може бути окремим компонентом.

---

# Context Provider

Наприклад:

    import { useState } from "react";
    import { ThemeContext } from "./ThemeContext";

    export function ThemeProvider({ children }) {
        const [theme, setTheme] = useState<Theme>("light");

        return (
            <ThemeContext.Provider value={theme}>
                {children}
            </ThemeContext.Provider>
        );
    }

---

# Context Definition vs Provider

Важливо розрізняти:

    Context

і:

    Provider

Context:

    описує Context object

Provider:

    надає конкретне value

Наприклад:

    const ThemeContext =
        createContext<Theme>("light");

а:

    <ThemeContext.Provider value="dark">
        ...
    </ThemeContext.Provider>

---

# createContext() — один раз

Context зазвичай створюють на module level.

Правильно:

    const ThemeContext =
        createContext<Theme>("light");

Не потрібно створювати Context під час кожного render:

    function App() {
        const ThemeContext =
            createContext("light");

        ...
    }

Це неправильна архітектура.

Context object повинен мати стабільну identity.

---

# Module-Level Context

Правильний підхід:

    import { createContext } from "react";

    export const ThemeContext =
        createContext<Theme>("light");

Тобто:

    module scope
        ↓
    Context object

---

# Context Identity

Context object має identity.

Наприклад:

    const ThemeContext =
        createContext("light");

React використовує саме цей Context object.

Consumer:

    useContext(ThemeContext)

повинен використовувати той самий Context object, який використовується Provider.

---

# Один Context — одна Identity

Наприклад:

    const ThemeContext =
        createContext("light");

Provider:

    <ThemeContext.Provider value="dark">
        ...
    </ThemeContext.Provider>

Consumer:

    useContext(ThemeContext)

Вони працюють разом, бо використовують той самий:

    ThemeContext

---

# Не створювати два однакових Context

Поганий підхід:

    const ThemeContextA =
        createContext("light");

    const ThemeContextB =
        createContext("light");

Навіть якщо вони мають однаковий default value:

    ThemeContextA !== ThemeContextB

Це два різних Context objects.

---

# Context Identity Example

    const ThemeContextA =
        createContext("light");

    const ThemeContextB =
        createContext("light");

Це:

    two different contexts

Навіть якщо:

    ThemeContextA
    ThemeContextB

мають однаковий default value.

---

# Context API Contract

Context повинен мати зрозумілий API.

Наприклад:

    type CartContextValue = {
        items: CartItem[];
        addItem: (item: CartItem) => void;
        removeItem: (id: number) => void;
        clearCart: () => void;
    };

    const CartContext =
        createContext<CartContextValue | null>(null);

Тут чітко видно, що Context надає:

    items
    addItem
    removeItem
    clearCart

---

# Context for Configuration

Context добре підходить для configuration.

Наприклад:

    type Config = {
        apiUrl: string;
        environment: "development" | "production";
    };

    const ConfigContext =
        createContext<Config>({
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

# Context for Theme

Типовий TypeScript варіант:

    type Theme = "light" | "dark";

    const ThemeContext =
        createContext<Theme>("light");

Provider:

    <ThemeContext.Provider value="dark">
        <App />
    </ThemeContext.Provider>

Consumer:

    const theme = useContext(ThemeContext);

---

# Context for User

    type User = {
        id: number;
        name: string;
    };

    const UserContext =
        createContext<User | null>(null);

Provider:

    <UserContext.Provider value={user}>
        <App />
    </UserContext.Provider>

Consumer:

    const user = useContext(UserContext);

---

# Context for Authentication

    type AuthContextValue = {
        user: User | null;
        isAuthenticated: boolean;
        login: () => void;
        logout: () => void;
    };

    const AuthContext =
        createContext<AuthContextValue | null>(null);

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

---

# Context + useState

`createContext()` часто використовується разом із `useState()`.

    type Theme = "light" | "dark";

    type ThemeContextValue = {
        theme: Theme;
        setTheme: (theme: Theme) => void;
    };

    const ThemeContext =
        createContext<ThemeContextValue | null>(null);

Provider:

    function ThemeProvider({ children }) {
        const [theme, setTheme] =
            useState<Theme>("light");

        return (
            <ThemeContext.Provider
                value={{
                    theme,
                    setTheme
                }}
            >
                {children}
            </ThemeContext.Provider>
        );
    }

Тут:

    createContext()
        ↓
    defines Context

    useState()
        ↓
    stores state

    Provider
        ↓
    exposes state

---

# Context + useReducer

Context також можна поєднати з `useReducer()`.

Наприклад:

    type CounterState = {
        count: number;
    };

    type CounterContextValue = {
        state: CounterState;
        dispatch: React.Dispatch<Action>;
    };

    const CounterContext =
        createContext<CounterContextValue | null>(null);

Provider:

    const [state, dispatch] =
        useReducer(reducer, initialState);

    <CounterContext.Provider
        value={{
            state,
            dispatch
        }}
    >
        {children}
    </CounterContext.Provider>

---

# createContext() і Re-rendering

Сам `createContext()` не викликає re-render.

Наприклад:

    const ThemeContext =
        createContext("light");

Це лише створення Context object.

Re-rendering пов'язаний із:

    Provider value

Коли value змінюється, consumers, які використовують цей Context, можуть оновитися.

---

# Provider Value Identity

Наприклад:

    <ThemeContext.Provider value={theme}>
        {children}
    </ThemeContext.Provider>

Тут value:

    theme

є primitive value.

Для object:

    <AuthContext.Provider
        value={{
            user,
            login,
            logout
        }}
    >
        {children}
    </AuthContext.Provider>

створюється object value.

Його reference identity важлива для performance.

---

# createContext() не оптимізує State

Важливо:

    createContext()

не є механізмом оптимізації.

Context:

    передає value

а не:

    автоматично оптимізує rendering

Питання оптимізації Context буде розглянуте пізніше.

---

# Nested Contexts

Можна створювати кілька різних Context:

    const ThemeContext =
        createContext("light");

    const LanguageContext =
        createContext("uk");

Component може читати обидва:

    const theme = useContext(ThemeContext);

    const language = useContext(LanguageContext);

---

# Multiple Providers

Наприклад:

    <ThemeContext.Provider value="dark">
        <LanguageContext.Provider value="en">
            <App />
        </LanguageContext.Provider>
    </ThemeContext.Provider>

Тепер descendants можуть читати:

    theme
    language

---

# Nested Provider Same Context

Можна мати кілька Provider одного Context:

    <ThemeContext.Provider value="dark">
        <Header />

        <ThemeContext.Provider value="light">
            <Card />
        </ThemeContext.Provider>
    </ThemeContext.Provider>

Результат:

    Header → dark
    Card   → light

---

# Nearest Provider

Правило:

    consumer
        ↓
    шукає Provider вгору
        ↓
    знаходить найближчий
        ↓
    отримує його value

Наприклад:

    Provider A
        value = "dark"
            ↓
        Provider B
            value = "light"
                ↓
              Card

`Card` отримує:

    light

---

# Context Scope

Context scope визначається Provider.

Наприклад:

    <ThemeContext.Provider value="dark">
        <Header />
        <Main />
    </ThemeContext.Provider>

Context доступний:

    Header
    Main

але не компоненту, який знаходиться поза цим subtree.

---

# Context Outside Provider

Наприклад:

    const ThemeContext =
        createContext("light");

    function App() {
        return (
            <>
                <Header />

                <ThemeContext.Provider value="dark">
                    <Main />
                </ThemeContext.Provider>
            </>
        );
    }

Тоді:

    Header → light
    Main   → dark

---

# createContext() і Props Drilling

Без Context:

    App
      ↓ theme
    Layout
      ↓ theme
    Header
      ↓ theme
    Button

З Context:

    ThemeContext
        ↓
    Provider
        ↓
    App
        ↓
    Layout
        ↓
    Header
        ↓
    Button
        ↓
    useContext()

Проміжні компоненти не повинні передавати:

    theme

через props.

---

# Context vs Props

Props:

    <Button theme={theme} />

Context:

    const theme = useContext(ThemeContext);

Props є:

    explicit

Context dependency є:

    implicit

Тому Context не завжди є кращим за props.

---

# Коли createContext() доречний

Хороші кандидати:

    Theme
    Language
    Current user
    Authentication
    Permissions
    Application settings
    Feature configuration
    Shared UI state

Особливо коли значення потрібно:

    багатьом descendants
    на різних рівнях tree

---

# Коли createContext() зайвий

Якщо:

    Parent
      ↓
    Child

і дані потрібні тільки Child:

    <Child value={value} />

часто краще за Context.

---

# Context не замінює props

Props залишаються основним React data flow mechanism.

Context варто використовувати тоді, коли explicit props passing стає незручним або створює props drilling.

---

# Context не замінює useState

Наприклад:

    const [count, setCount] = useState(0);

це state.

А:

    const CountContext =
        createContext(0);

це Context.

Вони вирішують різні проблеми.

---

# Context не є Global Variable

Наприклад:

    const theme = "dark";

у JavaScript module не є React Context.

Context має:

    React tree scope
    Provider relationship
    consumer relationship

---

# Context не є Database

Не потрібно використовувати Context як database.

Context призначений для:

    passing shared values

а не для:

    storing large datasets
    replacing database
    replacing server cache

---

# Context не є Server State

Наприклад:

    products from API

це server data.

Context може передавати:

    products

але сам Context не є:

    API cache
    database
    server state manager

---

# Практичний приклад — ThemeContext

    import {
        createContext,
        useContext,
        useState
    } from "react";

    type Theme = "light" | "dark";

    type ThemeContextValue = {
        theme: Theme;
        setTheme: (theme: Theme) => void;
    };

    const ThemeContext =
        createContext<ThemeContextValue | null>(null);

    function ThemeProvider({ children }) {
        const [theme, setTheme] =
            useState<Theme>("light");

        return (
            <ThemeContext.Provider
                value={{
                    theme,
                    setTheme
                }}
            >
                {children}
            </ThemeContext.Provider>
        );
    }

    function Button() {
        const context =
            useContext(ThemeContext);

        if (!context) {
            throw new Error(
                "Button must be used inside ThemeProvider"
            );
        }

        const {
            theme,
            setTheme
        } = context;

        return (
            <button
                onClick={() =>
                    setTheme(
                        theme === "light"
                            ? "dark"
                            : "light"
                    )
                }
            >
                Theme: {theme}
            </button>
        );
    }

    function App() {
        return (
            <ThemeProvider>
                <Button />
            </ThemeProvider>
        );
    }

---

# Практичний приклад — LanguageContext

    type Language = "uk" | "en";

    const LanguageContext =
        createContext<Language>("uk");

Provider:

    function App() {
        return (
            <LanguageContext.Provider value="en">
                <Greeting />
            </LanguageContext.Provider>
        );
    }

Consumer:

    function Greeting() {
        const language =
            useContext(LanguageContext);

        if (language === "uk") {
            return <p>Привіт!</p>;
        }

        return <p>Hello!</p>;
    }

---

# Практичний приклад — UserContext

    type User = {
        id: number;
        name: string;
        role: string;
    };

    const UserContext =
        createContext<User | null>(null);

Provider:

    function App() {
        const user = {
            id: 1,
            name: "John",
            role: "admin"
        };

        return (
            <UserContext.Provider value={user}>
                <Profile />
            </UserContext.Provider>
        );
    }

Consumer:

    function Profile() {
        const user =
            useContext(UserContext);

        if (!user) {
            return <p>No user</p>;
        }

        return (
            <div>
                <h2>{user.name}</h2>
                <p>{user.role}</p>
            </div>
        );
    }

---

# Практичний приклад — Authentication Context

    type User = {
        id: number;
        name: string;
    };

    type AuthContextValue = {
        user: User | null;
        isAuthenticated: boolean;
        login: () => void;
        logout: () => void;
    };

    const AuthContext =
        createContext<AuthContextValue | null>(null);

Provider:

    function AuthProvider({ children }) {
        const [user, setUser] =
            useState<User | null>(null);

        function login() {
            setUser({
                id: 1,
                name: "John"
            });
        }

        function logout() {
            setUser(null);
        }

        return (
            <AuthContext.Provider
                value={{
                    user,
                    isAuthenticated: user !== null,
                    login,
                    logout
                }}
            >
                {children}
            </AuthContext.Provider>
        );
    }

Consumer:

    function Header() {
        const auth =
            useContext(AuthContext);

        if (!auth) {
            throw new Error(
                "Header must be used inside AuthProvider"
            );
        }

        const {
            user,
            isAuthenticated,
            login,
            logout
        } = auth;

        return (
            <header>
                {isAuthenticated ? (
                    <>
                        <span>{user?.name}</span>
                        <button onClick={logout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <button onClick={login}>
                        Login
                    </button>
                )}
            </header>
        );
    }

---

# Практичний приклад — SettingsContext

    type Settings = {
        notifications: boolean;
        compactMode: boolean;
    };

    const SettingsContext =
        createContext<Settings>({
            notifications: true,
            compactMode: false
        });

Provider:

    <SettingsContext.Provider
        value={{
            notifications: false,
            compactMode: true
        }}
    >
        <App />
    </SettingsContext.Provider>

Consumer:

    function SettingsPanel() {
        const settings =
            useContext(SettingsContext);

        return (
            <div>
                <p>
                    Notifications:
                    {String(settings.notifications)}
                </p>

                <p>
                    Compact:
                    {String(settings.compactMode)}
                </p>
            </div>
        );
    }

---

# Типові помилки

❌ Вважати `createContext()` state.

    createContext()
        → Context

    useState()
        → State

---

❌ Вважати default value initial state.

    createContext("light")

означає:

    fallback = "light"

а не:

    initialState = "light"

---

❌ Створювати Context всередині component.

Погано:

    function App() {
        const ThemeContext =
            createContext("light");

        ...
    }

Краще:

    const ThemeContext =
        createContext("light");

    function App() {
        ...
    }

---

❌ Створювати Context кожного разу заново.

Context object повинен мати стабільну identity.

---

❌ Створювати два різні Context objects замість одного.

    const ThemeContextA =
        createContext("light");

    const ThemeContextB =
        createContext("light");

Це різні Contexts.

---

❌ Не типізувати складний Context.

Замість:

    const AuthContext =
        createContext(null);

краще:

    type AuthContextValue = {
        user: User | null;
        login: () => void;
        logout: () => void;
    };

    const AuthContext =
        createContext<AuthContextValue | null>(null);

---

❌ Передавати все через один Context.

Погано:

    GlobalContext

з:

    user
    theme
    language
    products
    cart
    notifications
    settings

Краще розділяти responsibilities.

---

❌ Використовувати Context замість простих props.

Якщо:

    Parent → Child

краще часто використати:

    props

---

❌ Забувати про Provider scope.

Consumer повинен знаходитися в потрібній частині tree.

---

❌ Не враховувати `null`.

Якщо:

    createContext<Type | null>(null)

consumer повинен враховувати:

    null

---

# Питання зі співбесіди

Що робить `createContext()`?

Що повертає `createContext()`?

Що таке Context object?

Що таке default value?

Для чого потрібен default value?

Чи є default value initial state?

Чим `createContext()` відрізняється від `useState()`?

Як передати value через Context?

Що таке Provider?

Що таке Consumer?

Як прочитати Context?

Що робить `useContext()`?

Що станеться, якщо Consumer знаходиться поза Provider?

Що таке nearest Provider?

Що станеться при nested Providers?

Чи можна мати кілька Provider одного Context?

Чи можна мати кілька різних Context?

Чи може Context містити object?

Чи може Context містити function?

Чи може Context містити state?

Як типізувати Context у TypeScript?

Навіщо використовувати:

    createContext<Type | null>(null)

?

Що таке Context contract?

Чому Context краще створювати на module level?

Чому не варто створювати Context всередині component?

Чи є Context глобальним state?

Чи замінює Context props?

Чи замінює Context `useState()`?

Коли краще використовувати Context?

Коли Context зайвий?

Чому не варто створювати один GlobalContext для всього application?

Що таке Context identity?

---

# Шлях

🟢 Core (обов'язково знати)

`createContext()`.

Context object.

Default value.

Provider.

Consumer.

`useContext()`.

Context value.

Context scope.

Nearest Provider.

Nested Provider.

Props drilling.

Context vs props.

Context vs state.

Основний синтаксис:

    const SomeContext =
        createContext(defaultValue);

---

🔵 Junior

Уміти створити Context.

Уміти створити Provider.

Уміти передати value.

Уміти прочитати value через `useContext()`.

Розуміти default value.

Розуміти різницю:

    default value
    initial state

Розуміти:

    Context object
    Provider
    Consumer

Уміти створювати:

    ThemeContext
    UserContext
    AuthContext
    LanguageContext

Уміти передавати:

    string
    number
    boolean
    object
    functions

Уміти типізувати Context у TypeScript.

Розуміти:

    createContext<Type>()

Розуміти:

    createContext<Type | null>(null)

Розуміти Context identity.

Розуміти module-level Context definition.

---

🟠 Middle

Проєктувати Context contract.

Розділяти Context responsibilities.

Використовувати Context + `useState()`.

Використовувати Context + `useReducer()`.

Типізувати складні Context values.

Проєктувати:

    state
    actions
    context value

Розуміти Context dependency.

Розуміти reference identity.

Розуміти Context re-render behavior.

Використовувати Context + custom hooks.

Створювати Provider architecture.

Розділяти:

    Context definition
    Provider
    custom hook

---

🔴 Senior

Глибоке розуміння Context identity.

Context propagation.

Provider boundaries.

Context update behavior.

Reference identity.

Context performance.

Context splitting.

Fine-grained dependencies.

Provider composition.

Context architecture у великих applications.

Designing Context contracts.

Dependency boundaries.

Context vs external state management.

Context vs server state.

State colocation.

State lifting.

Trade-offs між:

    props
    context
    custom hooks
    reducers
    external stores

---

# Міні-шпаргалка

## createContext

    const ThemeContext =
        createContext("light");

Створює Context object.

---

## Default Value

    createContext("light");

    "light"

→ default value.

---

## Provider

    <ThemeContext.Provider value="dark">
        <App />
    </ThemeContext.Provider>

Передає value descendants.

---

## Consumer

    function Button() {
        const theme =
            useContext(ThemeContext);

        return <button>{theme}</button>;
    }

---

## TypeScript

    type Theme = "light" | "dark";

    const ThemeContext =
        createContext<Theme>("light");

---

## Nullable Context

    type User = {
        id: number;
        name: string;
    };

    const UserContext =
        createContext<User | null>(null);

---

## Context Value Object

    type AuthContextValue = {
        user: User | null;
        login: () => void;
        logout: () => void;
    };

    const AuthContext =
        createContext<AuthContextValue | null>(null);

---

## Context + State

    const [theme, setTheme] =
        useState<Theme>("light");

    <ThemeContext.Provider
        value={{
            theme,
            setTheme
        }}
    >
        {children}
    </ThemeContext.Provider>

---

## Context Scope

    Provider
        ↓
    descendants

Context доступний у відповідному subtree.

---

## Nearest Provider

    Provider A
        ↓
    Provider B
        ↓
    Consumer

Consumer отримує value від:

    Provider B

якщо `Provider B` є найближчим.

---

## Context Identity

    const ThemeContext =
        createContext("light");

Provider і Consumer повинні використовувати той самий Context object:

    <ThemeContext.Provider ...>

    useContext(ThemeContext)

---

## Context vs State

    createContext()
        → creates Context

    useState()
        → creates State

---

## Context vs Props

    props
        → explicit data passing

    context
        → shared value through tree

---

## Context vs Global Variable

    global variable
        → JavaScript scope

    Context
        → React tree scope

---

# Головне:

• `createContext()` створює Context object.

• Синтаксис:

    const SomeContext =
        createContext(defaultValue);

• `defaultValue` — це fallback value.

• Default value не є initial state.

• `createContext()` не створює state.

• `useState()` створює state.

• Context object використовується разом із Provider та Consumer.

• Provider передає конкретне value:

    <SomeContext.Provider value={value}>
        ...
    </SomeContext.Provider>

• Consumer читає value через:

    useContext(SomeContext)

• Якщо Consumer знаходиться поза Provider, використовується default value.

• Найближчий Provider має пріоритет.

• Context scope визначається Provider.

• Можна мати nested Providers.

• Можна мати кілька різних Contexts.

• Context value може бути:

    string
    number
    boolean
    object
    array
    function
    state
    state + actions

• Для TypeScript складний Context краще явно типізувати.

• Поширений TypeScript pattern:

    createContext<Type | null>(null)

• `null` часто використовується для позначення відсутності Provider value.

• Context краще створювати на module level.

• Не потрібно створювати Context всередині component.

• Context object має identity.

• Два виклики:

    createContext("light")
    createContext("light")

створюють два різні Context objects.

• Context не є global variable.

• Context не є database.

• Context не є state management library.

• Context не замінює props.

• Context не замінює `useState()`.

• Основний pattern:

    createContext()
        ↓
    Context object
        ↓
    Provider
        ↓
    value
        ↓
    Consumer
        ↓
    useContext()

• Для простого parent → child data flow зазвичай достатньо props.

• Context особливо корисний для shared values, які потрібні багатьом descendants.

• Типові Context:

    ThemeContext
    AuthContext
    UserContext
    LanguageContext
    SettingsContext

• Один Context бажано використовувати для однієї логічної responsibility.

• Не варто створювати один величезний:

    GlobalContext

для всього application.

• Context + State — дуже поширена комбінація:

    useState()
        ↓
    Provider
        ↓
    Context
        ↓
    useContext()

• Context + Reducer також є поширеною комбінацією:

    useReducer()
        ↓
    state + dispatch
        ↓
    Provider
        ↓
    Context
        ↓
    consumers

• Головна концепція:

    createContext()
        НЕ зберігає state.

    createContext()
        створює Context object.

• Наступний крок:

    06-context
    └── 03-provider

де детальніше розглядається:

    Provider
    value
    Provider scope
    nested Providers
    Provider architecture
    Context + state
    Context + children
    типізація Provider
    створення власних Provider components