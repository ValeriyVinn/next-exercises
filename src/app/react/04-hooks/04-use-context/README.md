# 04. `useContext`

`useContext` — це React Hook, який дозволяє компоненту отримувати значення з React Context без необхідності передавати це значення через `props` на кожному рівні дерева компонентів.

Найчастіше `Context` використовують для даних, які потрібні багатьом компонентам:

- тема (`light` / `dark`);
- поточний користувач;
- мова інтерфейсу;
- налаштування застосунку;
- permissions / roles;
- дані, які потрібні великій кількості компонентів.

---

## Основний принцип

Звичайна передача даних:

    App
      ↓ props
    Layout
      ↓ props
    Page
      ↓ props
    Button

Якщо `Button` потребує значення, але проміжні компоненти його не використовують, виникає **prop drilling**.

Context дозволяє створити інший шлях:

    Context Provider
          ↓
      Component
          ↓
      Component
          ↓
      Button

`Button` може безпосередньо отримати значення з Context.

---

# Основні поняття

- `createContext` — створює Context.
- `Provider` — надає значення Context дочірнім компонентам.
- `useContext` — отримує значення Context.
- `context` — спільне значення, доступне частині дерева компонентів.
- `Consumer` — старіший спосіб отримання Context без Hook.
- `defaultValue` — значення Context за замовчуванням.
- `prop drilling` — передавання props через компоненти, яким ці props не потрібні.
- `Provider` boundary — межа, всередині якої доступне певне значення Context.
- `re-render` — повторний рендер споживачів Context при зміні його `value`.

---

# Що потрібно пам'ятати

1. `useContext` не створює Context.
2. Context створюється через `createContext`.
3. Значення надається через Provider.
4. Значення читається через `useContext`.
5. Context працює тільки для компонентів усередині відповідного Provider.
6. Якщо Provider не знайдено, використовується `defaultValue`, переданий у `createContext`.
7. Context не є автоматично глобальним state manager.
8. Context зручний для даних, які потрібні багатьом компонентам.
9. Не варто використовувати Context для кожного state.
10. Зміна `value` Provider може спричинити re-render компонентів, які читають цей Context.
11. Context не замінює `useState`.
12. Context часто використовують разом із `useState` або `useReducer`.
13. Context особливо корисний для theme, auth, locale та application settings.
14. У Next.js App Router Context Provider зазвичай знаходиться в Client Component.

---

# 1. Імпорт

Для використання `useContext`:

    import { useContext } from "react";

Для створення Context:

    import { createContext } from "react";

Зазвичай:

    import {
        createContext,
        useContext,
    } from "react";

---

# 2. Що таке Context

Context — це механізм React для передачі значення вниз по дереву компонентів без явної передачі через `props`.

Наприклад:

    const ThemeContext = createContext("light");

Тепер існує Context:

    ThemeContext

Компонент нижче в дереві може отримати:

    const theme = useContext(ThemeContext);

---

# 3. `createContext`

Базовий синтаксис:

    const MyContext = createContext(defaultValue);

Наприклад:

    const ThemeContext = createContext("light");

Тут:

    "light"

є `defaultValue`.

---

# 4. `defaultValue`

Наприклад:

    const ThemeContext = createContext("light");

Якщо компонент використовує:

    const theme = useContext(ThemeContext);

але над ним немає відповідного Provider, React поверне:

    "light"

Тобто:

    useContext(ThemeContext)

отримає значення:

    "light"

---

# 5. Простий приклад

    import {
        createContext,
        useContext,
    } from "react";

    const ThemeContext = createContext("light");

    function Button() {
        const theme = useContext(ThemeContext);

        return (
            <button>
                Theme: {theme}
            </button>
        );
    }

    export default function App() {
        return <Button />;
    }

Результат:

    Theme: light

Тут Provider ще не використовується.

Компонент отримує `defaultValue`.

---

# 6. Що таке Provider

Provider — це компонент, який передає конкретне значення Context дочірнім компонентам.

Класичний синтаксис:

    <ThemeContext.Provider value="dark">
        <App />
    </ThemeContext.Provider>

Усі компоненти всередині Provider можуть отримати:

    "dark"

через:

    useContext(ThemeContext)

---

# 7. Context Provider

Повний приклад:

    import {
        createContext,
        useContext,
    } from "react";

    const ThemeContext = createContext("light");

    function Button() {
        const theme = useContext(ThemeContext);

        return (
            <button>
                Theme: {theme}
            </button>
        );
    }

    function App() {
        return (
            <ThemeContext.Provider value="dark">
                <Button />
            </ThemeContext.Provider>
        );
    }

Тепер:

    Button

отримає:

    dark

а не:

    light

---

# 8. Provider змінює default value

Маємо:

    const ThemeContext = createContext("light");

Provider:

    <ThemeContext.Provider value="dark">
        <Button />
    </ThemeContext.Provider>

Всередині Provider:

    useContext(ThemeContext)

повертає:

    "dark"

Значення Provider має пріоритет над `defaultValue`.

---

# 9. Схема роботи Context

    createContext()
          ↓
    ThemeContext
          ↓
    Provider
          ↓
    value="dark"
          ↓
    Component
          ↓
    useContext()
          ↓
    "dark"

---

# 10. Prop drilling

Без Context:

    function App() {
        const theme = "dark";

        return (
            <Layout theme={theme} />
        );
    }

    function Layout({ theme }: { theme: string }) {
        return (
            <Page theme={theme} />
        );
    }

    function Page({ theme }: { theme: string }) {
        return (
            <Button theme={theme} />
        );
    }

    function Button({ theme }: { theme: string }) {
        return (
            <button>
                {theme}
            </button>
        );
    }

`Layout` і `Page` самі не використовують `theme`.

Вони лише передають його далі.

Це називається:

    prop drilling

---

# 11. Context вирішує prop drilling

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
        return <Page />;
    }

    function Page() {
        return <Button />;
    }

    function Button() {
        const theme = useContext(ThemeContext);

        return (
            <button>
                {theme}
            </button>
        );
    }

`Layout` і `Page` більше не повинні отримувати:

    theme

через props.

---

# 12. `useContext`

Основний синтаксис:

    const value = useContext(SomeContext);

Наприклад:

    const theme = useContext(ThemeContext);

Якщо Provider передав:

    value="dark"

то:

    theme === "dark"

---

# 13. `useContext` читає найближчий Provider

Це дуже важливо.

Можна мати:

    <ThemeContext.Provider value="light">

        <Page />

        <ThemeContext.Provider value="dark">
            <Button />
        </ThemeContext.Provider>

    </ThemeContext.Provider>

`Page` отримає:

    light

`Button` отримає:

    dark

Тому що `Button` знаходиться всередині ближчого Provider.

---

# 14. Найближчий Provider

Можна уявити:

    Provider A
        value = "light"
            ↓
        Component
            ↓
        Provider B
            value = "dark"
                ↓
            Button

`Button` використовує:

    "dark"

Тобто Context шукає найближчий Provider відповідного Context над компонентом.

---

# 15. Context працює вниз по дереву

Provider:

    <ThemeContext.Provider value="dark">
        ...
    </ThemeContext.Provider>

передає значення:

    ↓
    ↓
    ↓

усім відповідним компонентам нижче.

Але не передає його:

    ↑

батьківським компонентам.

---

# 16. Context не працює "вгору"

Якщо:

    Parent

містить:

    Child

і Context Provider знаходиться в `Child`:

    Parent
      ↓
    Child
      ↓
    Provider

`Parent` не може отримати значення цього Provider.

Context передається тільки вниз по дереву від Provider.

---

# 17. Простий Theme Context

Практичний приклад:

    import {
        createContext,
        useContext,
    } from "react";

    type Theme = "light" | "dark";

    const ThemeContext = createContext<Theme>("light");

    function Button() {
        const theme = useContext(ThemeContext);

        return (
            <button className={`button-${theme}`}>
                Button
            </button>
        );
    }

    function App() {
        return (
            <ThemeContext.Provider value="dark">
                <Button />
            </ThemeContext.Provider>
        );
    }

---

# 18. Context із TypeScript

Context дуже часто типізують.

Наприклад:

    type Theme = "light" | "dark";

    const ThemeContext = createContext<Theme>("light");

Тепер TypeScript знає:

    theme

може бути тільки:

    "light"

або:

    "dark"

---

# 19. Context з об'єктом

Context може містити не тільки одне значення.

Наприклад:

    type ThemeContextValue = {
        theme: "light" | "dark";
        language: "uk" | "en";
    };

    const ThemeContext = createContext<ThemeContextValue>({
        theme: "light",
        language: "uk",
    });

Provider:

    <ThemeContext.Provider
        value={{
            theme: "dark",
            language: "uk",
        }}
    >
        <App />
    </ThemeContext.Provider>

Consumer:

    const context = useContext(ThemeContext);

Тепер:

    context.theme

і:

    context.language

---

# 20. Context із state

Один із найважливіших практичних патернів:

    Context
        +
    useState

Наприклад:

    type Theme = "light" | "dark";

    const ThemeContext = createContext<Theme>("light");

    function App() {
        const [theme, setTheme] =
            useState<Theme>("light");

        return (
            <ThemeContext.Provider value={theme}>
                <Page />
            </ThemeContext.Provider>
        );
    }

Тепер Context передає поточний state вниз по дереву.

---

# 21. Context із state та setter

Часто потрібно не тільки читати state, а й змінювати його.

Тоді Context може містити:

    theme
    setTheme

Наприклад:

    type Theme = "light" | "dark";

    type ThemeContextValue = {
        theme: Theme;
        setTheme: (theme: Theme) => void;
    };

    const ThemeContext =
        createContext<ThemeContextValue | null>(null);

Provider:

    function ThemeProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const [theme, setTheme] =
            useState<Theme>("light");

        return (
            <ThemeContext.Provider
                value={{
                    theme,
                    setTheme,
                }}
            >
                {children}
            </ThemeContext.Provider>
        );
    }

Тепер дочірні компоненти можуть:

    const context = useContext(ThemeContext);

    context.theme

і:

    context.setTheme("dark");

---

# 22. Чому Context часто використовують із state

Context сам по собі не є state.

Він лише дозволяє передати значення вниз по дереву.

Тому:

    useState
        ↓
    зберігає state

    Context
        ↓
    передає state

Разом:

    useState
        +
    Context

дозволяють створити спільний state для частини дерева компонентів.

---

# 23. `ThemeProvider`

Замість того щоб писати Provider у кожному компоненті, часто створюють окремий компонент:

    function ThemeProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const [theme, setTheme] =
            useState<Theme>("light");

        return (
            <ThemeContext.Provider
                value={{
                    theme,
                    setTheme,
                }}
            >
                {children}
            </ThemeContext.Provider>
        );
    }

Тепер:

    <ThemeProvider>
        <App />
    </ThemeProvider>

---

# 24. Чому створюють власний Provider

Це дозволяє приховати логіку:

    useState
    Context
    functions
    effects
    localStorage

в одному місці.

Компоненти нижче просто використовують:

    useTheme()

замість того щоб знати внутрішню реалізацію.

---

# 25. Custom Hook `useTheme`

Наприклад:

    function useTheme() {
        return useContext(ThemeContext);
    }

Тепер:

    const { theme, setTheme } = useTheme();

Це значно зручніше:

    useTheme()

ніж:

    useContext(ThemeContext)

у великій кількості компонентів.

---

# 26. Повний Theme Context

Приклад:

    "use client";

    import {
        createContext,
        useContext,
        useState,
    } from "react";

    type Theme = "light" | "dark";

    type ThemeContextValue = {
        theme: Theme;
        setTheme: (theme: Theme) => void;
    };

    const ThemeContext =
        createContext<ThemeContextValue | null>(null);

    export function ThemeProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const [theme, setTheme] =
            useState<Theme>("light");

        return (
            <ThemeContext.Provider
                value={{
                    theme,
                    setTheme,
                }}
            >
                {children}
            </ThemeContext.Provider>
        );
    }

    export function useTheme() {
        const context = useContext(ThemeContext);

        if (context === null) {
            throw new Error(
                "useTheme must be used inside ThemeProvider"
            );
        }

        return context;
    }

Тепер компоненти можуть використовувати:

    const { theme, setTheme } = useTheme();

---

# 27. Чому Context часто починається з `null`

Можна написати:

    const ThemeContext =
        createContext<ThemeContextValue | null>(null);

Це означає:

    ThemeContextValue
        або
    null

Перевага такого підходу — можна виявити помилку неправильного використання Provider.

---

# 28. Захист від відсутнього Provider

Custom Hook:

    export function useTheme() {
        const context = useContext(ThemeContext);

        if (context === null) {
            throw new Error(
                "useTheme must be used inside ThemeProvider"
            );
        }

        return context;
    }

Якщо написати:

    function Button() {
        const { theme } = useTheme();

        return <button>{theme}</button>;
    }

але забути:

    <ThemeProvider>
        ...
    </ThemeProvider>

отримаємо зрозумілу помилку.

---

# 29. Чому це краще за мовчазний `defaultValue`

Можна зробити:

    const ThemeContext =
        createContext<ThemeContextValue>({
            theme: "light",
            setTheme: () => {},
        });

Але це може приховати помилку.

Компонент може працювати, хоча Provider забутий.

З `null`:

    createContext<ThemeContextValue | null>(null)

помилка стає очевидною.

---

# 30. Повний приклад Theme

    "use client";

    import {
        createContext,
        useContext,
        useState,
    } from "react";

    type Theme = "light" | "dark";

    type ThemeContextValue = {
        theme: Theme;
        setTheme: (theme: Theme) => void;
    };

    const ThemeContext =
        createContext<ThemeContextValue | null>(null);

    function ThemeProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const [theme, setTheme] =
            useState<Theme>("light");

        return (
            <ThemeContext.Provider
                value={{
                    theme,
                    setTheme,
                }}
            >
                {children}
            </ThemeContext.Provider>
        );
    }

    function useTheme() {
        const context = useContext(ThemeContext);

        if (context === null) {
            throw new Error(
                "useTheme must be used inside ThemeProvider"
            );
        }

        return context;
    }

    function ThemeButton() {
        const { theme, setTheme } = useTheme();

        const nextTheme =
            theme === "light" ? "dark" : "light";

        return (
            <button
                onClick={() => {
                    setTheme(nextTheme);
                }}
            >
                Current: {theme}
            </button>
        );
    }

    export default function App() {
        return (
            <ThemeProvider>
                <ThemeButton />
            </ThemeProvider>
        );
    }

---

# 31. Context + `children`

Provider зазвичай приймає:

    children

Тип:

    React.ReactNode

Наприклад:

    function ThemeProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        return (
            <ThemeContext.Provider value={...}>
                {children}
            </ThemeContext.Provider>
        );
    }

Це дозволяє обгорнути ціле дерево компонентів.

---

# 32. Provider як оболонка

Можна уявляти Provider так:

    <ThemeProvider>
        ┌─────────────────────┐
        │                     │
        │      App            │
        │                     │
        │   ┌─────────────┐   │
        │   │   Button    │   │
        │   └─────────────┘   │
        │                     │
        └─────────────────────┘
    </ThemeProvider>

Усе всередині має доступ до Context.

---

# 33. Context і компоненти-посередники

Наприклад:

    Provider
        ↓
    Layout
        ↓
    Sidebar
        ↓
    Navigation
        ↓
    Button

Якщо `Button` використовує Context:

    Button
        ↓
    useContext()

`Layout`, `Sidebar`, `Navigation` не повинні передавати значення через props.

---

# 34. Context не означає "глобальна змінна"

Це важливо.

Context схожий на глобальне значення тільки в межах певного дерева компонентів.

Він залежить від:

    Provider boundary

Наприклад:

    Provider A
        ↓
        App
        ↓
        Button

`Button` має доступ.

А компонент за межами Provider:

    OtherComponent

не має доступу до цього конкретного Provider.

---

# 35. Context має scope

Наприклад:

    <ThemeContext.Provider value="dark">
        <Page />
    </ThemeContext.Provider>

Context доступний:

    Page
    ↓
    Children
    ↓
    Grandchildren
    ↓
    ...

Але не компонентам поза цим деревом.

---

# 36. Кілька Context

У реальному застосунку часто є кілька Context:

    <AuthProvider>
        <ThemeProvider>
            <LanguageProvider>
                <App />
            </LanguageProvider>
        </ThemeProvider>
    </AuthProvider>

Наприклад:

    AuthContext
        ↓
    currentUser

    ThemeContext
        ↓
    theme

    LanguageContext
        ↓
    language

Кожен Context відповідає за свою область даних.

---

# 37. Не створюй один величезний Context

Погано:

    AppContext = {
        user,
        theme,
        language,
        cart,
        notifications,
        settings,
        ...
    }

Краще розділити:

    AuthContext
    ThemeContext
    LanguageContext
    CartContext

Це допомагає:

- розділити відповідальність;
- зменшити зв'язність;
- легше підтримувати код;
- контролювати re-render.

---

# 38. Context для авторизації

Типовий приклад:

    type User = {
        id: string;
        name: string;
    };

    type AuthContextValue = {
        user: User | null;
        login: (user: User) => void;
        logout: () => void;
    };

    const AuthContext =
        createContext<AuthContextValue | null>(null);

Provider:

    function AuthProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const [user, setUser] =
            useState<User | null>(null);

        const login = (newUser: User) => {
            setUser(newUser);
        };

        const logout = () => {
            setUser(null);
        };

        return (
            <AuthContext.Provider
                value={{
                    user,
                    login,
                    logout,
                }}
            >
                {children}
            </AuthContext.Provider>
        );
    }

---

# 39. `useAuth`

Custom Hook:

    function useAuth() {
        const context = useContext(AuthContext);

        if (context === null) {
            throw new Error(
                "useAuth must be used inside AuthProvider"
            );
        }

        return context;
    }

Тепер:

    const {
        user,
        login,
        logout,
    } = useAuth();

---

# 40. Перевірка користувача

Наприклад:

    function Profile() {
        const { user } = useAuth();

        if (!user) {
            return <p>Please log in.</p>;
        }

        return (
            <p>
                Hello, {user.name}
            </p>
        );
    }

---

# 41. Context для мови

Наприклад:

    type Language = "uk" | "en";

    type LanguageContextValue = {
        language: Language;
        setLanguage: (language: Language) => void;
    };

    const LanguageContext =
        createContext<LanguageContextValue | null>(null);

Provider:

    function LanguageProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const [language, setLanguage] =
            useState<Language>("uk");

        return (
            <LanguageContext.Provider
                value={{
                    language,
                    setLanguage,
                }}
            >
                {children}
            </LanguageContext.Provider>
        );
    }

---

# 42. Context для налаштувань

Наприклад:

    type Settings = {
        notifications: boolean;
        compactMode: boolean;
    };

    type SettingsContextValue = {
        settings: Settings;
        setSettings: React.Dispatch<
            React.SetStateAction<Settings>
        >;
    };

Context:

    const SettingsContext =
        createContext<SettingsContextValue | null>(null);

---

# 43. Context + `useReducer`

Для складнішого state часто використовують:

    Context
        +
    useReducer

Наприклад:

    type State = {
        count: number;
    };

    type Action =
        | { type: "increment" }
        | { type: "decrement" };

Reducer:

    function reducer(
        state: State,
        action: Action
    ): State {
        switch (action.type) {
            case "increment":
                return {
                    count: state.count + 1,
                };

            case "decrement":
                return {
                    count: state.count - 1,
                };

            default:
                return state;
        }
    }

---

# 44. Context + `useReducer` схема

    useReducer
        ↓
    state + dispatch
        ↓
    Context Provider
        ↓
    components
        ↓
    useContext()
        ↓
    state / dispatch

Це один із поширених способів організації state без зовнішнього state manager.

---

# 45. Приклад Counter Context

    type CounterState = {
        count: number;
    };

    type CounterAction =
        | { type: "increment" }
        | { type: "decrement" };

    type CounterContextValue = {
        state: CounterState;
        dispatch: React.Dispatch<CounterAction>;
    };

    const CounterContext =
        createContext<CounterContextValue | null>(null);

Reducer:

    function reducer(
        state: CounterState,
        action: CounterAction
    ): CounterState {
        switch (action.type) {
            case "increment":
                return {
                    count: state.count + 1,
                };

            case "decrement":
                return {
                    count: state.count - 1,
                };
        }
    }

Provider:

    function CounterProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const [state, dispatch] =
            useReducer(reducer, {
                count: 0,
            });

        return (
            <CounterContext.Provider
                value={{
                    state,
                    dispatch,
                }}
            >
                {children}
            </CounterContext.Provider>
        );
    }

---

# 46. Custom Hook для Counter Context

    function useCounter() {
        const context = useContext(CounterContext);

        if (context === null) {
            throw new Error(
                "useCounter must be used inside CounterProvider"
            );
        }

        return context;
    }

В компоненті:

    const {
        state,
        dispatch,
    } = useCounter();

    return (
        <button
            onClick={() => {
                dispatch({
                    type: "increment",
                });
            }}
        >
            {state.count}
        </button>
    );

---

# 47. Чому `Context + useReducer` корисні

`useReducer` відповідає за:

    state transitions

Context відповідає за:

    distribution

Тобто:

    useReducer
        ↓
    як змінюється state

    Context
        ↓
    хто може отримати state і dispatch

---

# 48. Context не є state manager

Важливо розрізняти:

    Context
        ↓
    механізм передачі значень

і:

    useState / useReducer
        ↓
    механізм керування state

Тому часто говорять:

    Context + useState

або:

    Context + useReducer

а не просто:

    Context = state management

---

# 49. Context і re-render

Це дуже важлива тема.

Наприклад:

    const value = {
        theme,
        setTheme,
    };

    <ThemeContext.Provider value={value}>
        ...
    </ThemeContext.Provider>

Коли `value` змінюється, компоненти, які споживають Context, можуть бути перерендерені.

---

# 50. Object identity

Розглянемо:

    <ThemeContext.Provider
        value={{
            theme,
            setTheme,
        }}
    >
        ...
    </ThemeContext.Provider>

Об'єкт:

    {
        theme,
        setTheme,
    }

створюється під час render.

Отже його identity може змінюватися.

Для Context це важливо, тому що React порівнює `value` за identity.

---

# 51. `Object.is`

Зміна Context value визначається порівнянням значення, концептуально заснованим на:

    Object.is()

Наприклад:

    Object.is("light", "light")
    // true

    Object.is("light", "dark")
    // false

Для об'єктів:

    Object.is(
        { theme: "light" },
        { theme: "light" }
    )
    // false

Тому новий object — нове значення.

---

# 52. `useMemo` для Context value

У деяких випадках можна мемоізувати object:

    const value = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme]
    );

Потім:

    <ThemeContext.Provider value={value}>
        ...
    </ThemeContext.Provider>

Це може бути корисним для контролю identity value.

Але `useMemo` не потрібно додавати автоматично всюди.

---

# 53. Чому не треба бездумно використовувати `useMemo`

Не кожен Context потребує:

    useMemo()

Спочатку потрібно зрозуміти:

- чи є проблема з identity;
- чи є зайві render;
- наскільки великий subtree;
- чи справді оптимізація потрібна.

Спочатку правильна архітектура, потім оптимізація.

---

# 54. Context і великі об'єкти

Поганий варіант:

    const AppContext = createContext({
        user,
        theme,
        language,
        cart,
        notifications,
        settings,
    });

Якщо все знаходиться в одному Context, зміна одного поля може впливати на всіх consumers цього Context.

Краще розглянути поділ:

    AuthContext
    ThemeContext
    LanguageContext
    CartContext
    SettingsContext

---

# 55. Context і selective re-rendering

Важливо:

    useContext(ThemeContext)

не дозволяє компоненту сказати:

> "Мене цікавить тільки `theme`, але не `setTheme`."

Компонент підписаний на весь Context value.

Якщо Context value змінюється, consumer може бути перерендерений.

Для дуже великих state-моделей можуть бути кращі спеціалізовані state management підходи або selector-based stores.

---

# 56. Context не вирішує всі проблеми state management

Context добре підходить для:

    theme
    auth
    locale
    settings

Але для дуже складного глобального state можуть бути доречні:

    Redux
    Zustand
    Jotai
    інші state libraries

Не потрібно використовувати Context лише тому, що він є в React.

---

# 57. Context vs Props

### Props

Дані передаються явно:

    <Button theme={theme} />

Переваги:

- явно видно джерело даних;
- легко відстежити залежності;
- добре для локального зв'язку parent → child.

---

### Context

Дані доступні через Context:

    const { theme } = useTheme();

Переваги:

- менше prop drilling;
- зручно для shared values;
- компонентам-посередникам не потрібно передавати props.

---

# 58. Context vs Props — коли що використовувати

Використовуй props, якщо:

    Parent
        ↓
    Child

і Child безпосередньо потребує значення.

Використовуй Context, якщо:

    App
        ↓
    Layout
        ↓
    Page
        ↓
    Component

і дані потрібні глибоко в дереві багатьом компонентам.

---

# 59. Не використовуй Context лише для уникнення одного prop

Якщо:

    Parent
        ↓
    Button

то Context може бути зайвим.

Простіше:

    <Button theme={theme} />

Context особливо корисний, коли:

    Parent
        ↓
    Layout
        ↓
    Section
        ↓
    Card
        ↓
    Button

і багато компонентів між ними не використовують значення.

---

# 60. Context і component composition

Іноді prop drilling можна вирішити не Context, а композицією компонентів.

Наприклад:

    function Layout({
        sidebar,
    }: {
        sidebar: React.ReactNode;
    }) {
        return (
            <div>
                {sidebar}
            </div>
        );
    }

Це дозволяє передати готовий компонент замість передачі даних через багато рівнів.

Тому перед Context варто подумати:

> Чи справді мені потрібен shared context, чи краще composition?

---

# 61. Context і `children`

Composition:

    <Layout
        sidebar={<Sidebar />}
    />

може бути простішим, ніж створення Context.

Context краще використовувати, коли значення повинно бути доступним багатьом незалежним компонентам.

---

# 62. Context і default value

Наприклад:

    const ThemeContext =
        createContext<Theme>("light");

Якщо Provider відсутній:

    useContext(ThemeContext)

поверне:

    "light"

Важливо:

`defaultValue` використовується тоді, коли відповідного Provider вище в дереві немає.

---

# 63. `defaultValue` не оновлюється

Наприклад:

    const ThemeContext =
        createContext("light");

`"light"` — це не state.

React не буде автоматично змінювати `defaultValue`.

Для динамічного значення потрібен Provider:

    <ThemeContext.Provider value={theme}>
        ...
    </ThemeContext.Provider>

---

# 64. Context Provider може мати динамічне value

Наприклад:

    const [theme, setTheme] =
        useState<Theme>("light");

    return (
        <ThemeContext.Provider value={theme}>
            ...
        </ThemeContext.Provider>
    );

Після:

    setTheme("dark");

Provider передасть:

    "dark"

споживачам Context.

---

# 65. Context + event handler

Наприклад:

    function ThemeButton() {
        const { theme, setTheme } = useTheme();

        return (
            <button
                onClick={() => {
                    setTheme(
                        theme === "light"
                            ? "dark"
                            : "light"
                    );
                }}
            >
                {theme}
            </button>
        );
    }

Тут:

    useContext
        ↓
    отримує state + setter

    event handler
        ↓
    змінює state

    Provider
        ↓
    передає нове value

    consumers
        ↓
    отримують нове value

---

# 66. Context + `useEffect`

Context можна використовувати разом із `useEffect`.

Наприклад, зберігати тему в `localStorage`:

    function ThemeProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const [theme, setTheme] =
            useState<Theme>("light");

        useEffect(() => {
            localStorage.setItem(
                "theme",
                theme
            );
        }, [theme]);

        return (
            <ThemeContext.Provider
                value={{
                    theme,
                    setTheme,
                }}
            >
                {children}
            </ThemeContext.Provider>
        );
    }

Тут:

    useState
        ↓
    state

    useEffect
        ↓
    localStorage synchronization

    Context
        ↓
    distribution

---

# 67. Context + custom Hook

Це один із найкращих практичних патернів:

    createContext
        ↓
    Provider
        ↓
    custom Hook
        ↓
    components

Наприклад:

    const AuthContext =
        createContext<AuthContextValue | null>(null);

    function AuthProvider() {
        ...
    }

    function useAuth() {
        ...
    }

    function Profile() {
        const { user } = useAuth();

        ...
    }

---

# 68. Розділяй Provider і consumer logic

Хороша структура:

    context/
    ├── theme-context.tsx
    ├── theme-provider.tsx
    └── use-theme.ts

Або простіше:

    context/
    └── ThemeContext.tsx

У невеликих проєктах один файл цілком нормальний.

---

# 69. Приклад структури Context

Наприклад:

    src/
    ├── context/
    │   ├── ThemeContext.tsx
    │   ├── AuthContext.tsx
    │   └── LanguageContext.tsx
    │
    ├── components/
    │   ├── Header.tsx
    │   ├── Button.tsx
    │   └── Profile.tsx
    │
    └── app/

Це дозволяє відокремити shared state logic від UI.

---

# 70. Context у Next.js App Router

У Next.js App Router важливо пам'ятати:

    useContext
    useState
    useEffect

використовуються в Client Components.

Тому файл Provider часто починається з:

    "use client";

Наприклад:

    "use client";

    import {
        createContext,
        useContext,
        useState,
    } from "react";

---

# 71. Provider у Next.js layout

Наприклад:

    import { ThemeProvider } from "@/context/ThemeContext";

    export default function RootLayout({
        children,
    }: {
        children: React.ReactNode;
    }) {
        return (
            <html lang="uk">
                <body>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        );
    }

Тепер компоненти всередині дерева можуть використовувати:

    useTheme()

---

# 72. Server Component може рендерити Client Provider

У Next.js можна мати:

    RootLayout
        ↓
    ThemeProvider (Client Component)
        ↓
    children

Тобто сам layout може залишатися Server Component, а Provider бути Client Component.

Це дуже поширений патерн у Next.js.

---

# 73. Context і hydration

Якщо Context залежить від browser-only даних:

    localStorage
    window
    document

потрібно враховувати hydration.

Наприклад, не варто бездумно читати:

    localStorage.getItem("theme")

під час server render.

Такі browser APIs потребують client-side логіки.

---

# 74. Context Provider і localStorage

Спрощений підхід:

    "use client";

    function ThemeProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const [theme, setTheme] =
            useState<Theme>("light");

        useEffect(() => {
            const savedTheme =
                localStorage.getItem("theme");

            if (
                savedTheme === "light" ||
                savedTheme === "dark"
            ) {
                setTheme(savedTheme);
            }
        }, []);

        return (
            <ThemeContext.Provider
                value={{
                    theme,
                    setTheme,
                }}
            >
                {children}
            </ThemeContext.Provider>
        );
    }

Для production-рішень також потрібно враховувати flash of incorrect theme та hydration strategy.

---

# 75. Context + reducer — архітектурна схема

Для складнішого Context:

    Context
       │
       ├── State
       │
       ├── Dispatch
       │
       └── Provider
               │
               ├── Component A
               ├── Component B
               └── Component C

Компоненти отримують:

    const {
        state,
        dispatch,
    } = useAppContext();

---

# 76. Розділення State Context і Dispatch Context

Для оптимізації іноді можна розділити:

    StateContext

і:

    DispatchContext

Наприклад:

    const StateContext =
        createContext<State | null>(null);

    const DispatchContext =
        createContext<Dispatch | null>(null);

Тоді компоненти, яким потрібен лише `dispatch`, не повинні підписуватися на весь state Context.

Це вже більш просунутий патерн.

---

# 77. Коли Context стає занадто великим

Якщо Context містить:

    user
    products
    cart
    notifications
    settings
    filters
    search
    modal
    theme

це може бути сигналом, що state model потрібно розділити.

Питання:

> Які компоненти справді повинні знати про ці дані?

часто допомагає знайти правильну архітектуру.

---

# 78. Context і separation of concerns

Добре:

    AuthContext
        ↓
    authentication

    ThemeContext
        ↓
    theme

    LanguageContext
        ↓
    language

Погано:

    AppContext
        ↓
    усе підряд

Кожен Context повинен мати зрозумілу відповідальність.

---

# 79. Типова помилка — забути Provider

Маємо:

    function Button() {
        const { theme } = useTheme();

        return <button>{theme}</button>;
    }

Але:

    <Button />

знаходиться без:

    <ThemeProvider>

Якщо Context створено з `null`, отримаємо помилку:

    useTheme must be used inside ThemeProvider

Це добре, тому що помилка одразу пояснює проблему.

---

# 80. Типова помилка — створити Context не того типу

Погано:

    const ThemeContext =
        createContext(null);

Якщо потім очікуємо:

    theme
    setTheme

TypeScript не зможе нормально вивести структуру.

Краще:

    type ThemeContextValue = {
        theme: Theme;
        setTheme: (theme: Theme) => void;
    };

    const ThemeContext =
        createContext<ThemeContextValue | null>(null);

---

# 81. Типова помилка — передавати state через props після Context

Якщо вже є:

    ThemeContext

і:

    useTheme()

немає сенсу продовжувати передавати:

    theme

через багато рівнів props без причини.

Вибери один зрозумілий канал передачі даних.

---

# 82. Типова помилка — використовувати Context для всього

Не потрібно робити Context для:

    inputValue

якщо цей state використовується тільки в одному компоненті.

Краще:

    const [value, setValue] = useState("");

Context потрібен тоді, коли значення справді потрібно спільно використовувати.

---

# 83. Типова помилка — Context замість props

Якщо компонент має прямого parent:

    Parent
       ↓
    Child

і тільки Child потребує:

    title

краще:

    <Child title={title} />

а не створювати Context тільки для одного prop.

---

# 84. Типова помилка — Context як "магія"

Погано думати:

> Context дозволяє будь-якому компоненту отримати будь-які дані.

Правильніше:

> Компонент може отримати значення конкретного Context, якщо над ним у дереві знаходиться відповідний Provider.

Це важлива різниця.

---

# 85. Типова помилка — забути про re-render

Якщо Provider:

    value

змінюється, consumers Context можуть бути перерендерені.

Тому не варто бездумно складати величезну кількість незалежних даних в один Context.

---

# 86. Типова помилка — premature optimization

Не потрібно відразу писати:

    useMemo
    useCallback
    split contexts
    selector libraries

Спочатку:

    правильна модель даних
        ↓
    простий Context
        ↓
    вимірювання проблеми
        ↓
    оптимізація

---

# 87. Context і `useMemo`

Можливий патерн:

    const value = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme]
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );

Але потрібно пам'ятати:

`useMemo` оптимізує identity об'єкта, а не змінює семантику Context.

---

# 88. Context і функції

Наприклад:

    const login = (user: User) => {
        setUser(user);
    };

Якщо ця function входить у Context value:

    {
        user,
        login,
        logout,
    }

її identity також може змінюватися між render.

У разі реальної performance-проблеми можна розглянути `useCallback`.

Але не потрібно автоматично мемоізувати кожну функцію.

---

# 89. Context + `useCallback` + `useMemo`

У складніших випадках:

    const login = useCallback(
        (newUser: User) => {
            setUser(newUser);
        },
        []
    );

    const value = useMemo(
        () => ({
            user,
            login,
        }),
        [user, login]
    );

Потім:

    <AuthContext.Provider value={value}>
        ...
    </AuthContext.Provider>

Це вже performance optimization.

Для базового React достатньо спочатку добре зрозуміти:

    Context
    Provider
    useContext
    useState

---

# 90. Context і data flow

Звичайний React data flow:

    Parent
       ↓
    props
       ↓
    Child

Context дозволяє:

    Provider
       ↓
    Context
       ↓
    Deep Child

Але напрямок усе одно залишається:

    зверху
      ↓
    вниз

Context не змінює фундаментальну модель дерева React.

---

# 91. Context не передає дані між братами напряму

Наприклад:

    Parent
      ├── Child A
      └── Child B

Якщо Child A має state, Child B не може просто отримати його через Context, якщо Provider не організований вище.

Зазвичай state піднімають:

    Child A
       ↑
    Parent
       ↓
    Child B

або використовують:

    Context

на відповідному рівні.

---

# 92. Context як shared state

Можна уявити:

    Parent
       ↓
    Provider
       ↓
    ┌───────────────┐
    │               │
    ↓               ↓
    A               B
    ↓               ↓
    C               D

A, B, C, D можуть читати Context.

Це особливо корисно для даних, які логічно належать усьому subtree.

---

# 93. Практичний приклад — Theme Switcher

    type Theme = "light" | "dark";

    type ThemeContextValue = {
        theme: Theme;
        toggleTheme: () => void;
    };

    const ThemeContext =
        createContext<ThemeContextValue | null>(null);

Provider:

    function ThemeProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const [theme, setTheme] =
            useState<Theme>("light");

        const toggleTheme = () => {
            setTheme((current) =>
                current === "light"
                    ? "dark"
                    : "light"
            );
        };

        return (
            <ThemeContext.Provider
                value={{
                    theme,
                    toggleTheme,
                }}
            >
                {children}
            </ThemeContext.Provider>
        );
    }

Hook:

    function useTheme() {
        const context = useContext(ThemeContext);

        if (context === null) {
            throw new Error(
                "useTheme must be used inside ThemeProvider"
            );
        }

        return context;
    }

Button:

    function ThemeButton() {
        const {
            theme,
            toggleTheme,
        } = useTheme();

        return (
            <button onClick={toggleTheme}>
                Theme: {theme}
            </button>
        );
    }

---

# 94. Практичний приклад — Auth Context

    type User = {
        id: string;
        name: string;
    };

    type AuthContextValue = {
        user: User | null;
        login: (user: User) => void;
        logout: () => void;
    };

    const AuthContext =
        createContext<AuthContextValue | null>(null);

Provider:

    function AuthProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const [user, setUser] =
            useState<User | null>(null);

        const login = (newUser: User) => {
            setUser(newUser);
        };

        const logout = () => {
            setUser(null);
        };

        return (
            <AuthContext.Provider
                value={{
                    user,
                    login,
                    logout,
                }}
            >
                {children}
            </AuthContext.Provider>
        );
    }

Hook:

    function useAuth() {
        const context = useContext(AuthContext);

        if (context === null) {
            throw new Error(
                "useAuth must be used inside AuthProvider"
            );
        }

        return context;
    }

Profile:

    function Profile() {
        const {
            user,
            logout,
        } = useAuth();

        if (!user) {
            return <p>Not authenticated</p>;
        }

        return (
            <div>
                <p>{user.name}</p>

                <button onClick={logout}>
                    Logout
                </button>
            </div>
        );
    }

---

# 95. Практичний приклад — Language Context

    type Language = "uk" | "en";

    type LanguageContextValue = {
        language: Language;
        setLanguage: (language: Language) => void;
    };

    const LanguageContext =
        createContext<LanguageContextValue | null>(null);

Provider:

    function LanguageProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const [language, setLanguage] =
            useState<Language>("uk");

        return (
            <LanguageContext.Provider
                value={{
                    language,
                    setLanguage,
                }}
            >
                {children}
            </LanguageContext.Provider>
        );
    }

Component:

    function LanguageSwitcher() {
        const {
            language,
            setLanguage,
        } = useContext(LanguageContext)!;

        return (
            <button
                onClick={() => {
                    setLanguage(
                        language === "uk"
                            ? "en"
                            : "uk"
                    );
                }}
            >
                {language}
            </button>
        );
    }

У production-коді краще використовувати custom Hook із перевіркою `null`, а не `!`.

---

# 96. Практичний приклад — Counter Context

    type CounterContextValue = {
        count: number;
        increment: () => void;
        decrement: () => void;
    };

    const CounterContext =
        createContext<CounterContextValue | null>(null);

Provider:

    function CounterProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const [count, setCount] = useState(0);

        const increment = () => {
            setCount((value) => value + 1);
        };

        const decrement = () => {
            setCount((value) => value - 1);
        };

        return (
            <CounterContext.Provider
                value={{
                    count,
                    increment,
                    decrement,
                }}
            >
                {children}
            </CounterContext.Provider>
        );
    }

Hook:

    function useCounter() {
        const context =
            useContext(CounterContext);

        if (context === null) {
            throw new Error(
                "useCounter must be used inside CounterProvider"
            );
        }

        return context;
    }

---

# 97. Context Provider як reusable component

Provider можна використовувати багато разів.

Наприклад:

    <ThemeProvider>
        <AdminPanel />
    </ThemeProvider>

і окремо:

    <ThemeProvider>
        <UserPanel />
    </ThemeProvider>

Кожен Provider створює свою scope/value.

---

# 98. Два Provider одного Context

Наприклад:

    <ThemeContext.Provider value="light">
        <Header />

        <ThemeContext.Provider value="dark">
            <AdminPanel />
        </ThemeContext.Provider>

    </ThemeContext.Provider>

`Header` отримує:

    light

`AdminPanel` отримує:

    dark

Це називається nested providers.

---

# 99. Nested Providers

Nested Provider дозволяє перевизначити значення для окремої частини дерева.

Наприклад:

    <ThemeProvider theme="light">
        <Main />

        <ThemeProvider theme="dark">
            <SpecialSection />
        </ThemeProvider>
    </ThemeProvider>

Тільки `SpecialSection` і його descendants отримують `dark`.

---

# 100. `useContext` не створює Provider

Це важливо запам'ятати:

    useContext()

тільки читає Context.

Створення:

    createContext()

Передача:

    Provider

Читання:

    useContext()

Отже:

    createContext
        ↓
    Provider
        ↓
    useContext

---

# 101. Повний життєвий цикл Context

    1. createContext()
            ↓
    2. створюється Context
            ↓
    3. Provider отримує value
            ↓
    4. компоненти знаходяться всередині Provider
            ↓
    5. useContext() читає value
            ↓
    6. Provider value змінюється
            ↓
    7. consumers отримують нове value
            ↓
    8. залежні компоненти можуть перерендеритися

---

# 102. Context Provider і state update

Наприклад:

    const [theme, setTheme] =
        useState<Theme>("light");

    <ThemeContext.Provider value={theme}>
        ...
    </ThemeContext.Provider>

Коли:

    setTheme("dark");

відбувається:

    state update
        ↓
    Provider re-render
        ↓
    Context value = "dark"
        ↓
    consumers отримують "dark"

---

# 103. Context + state — ключова схема

Запам'ятай:

    useState
        ↓
    створює state

    Context Provider
        ↓
    поширює state

    useContext
        ↓
    читає state

Тобто:

    state owner
        ↓
    Provider
        ↓
    consumers

---

# 104. Context + reducer — ключова схема

    useReducer
        ↓
    state + dispatch
        ↓
    Provider
        ↓
    useContext
        ↓
    components

Reducer відповідає за зміни.

Context відповідає за доступ.

---

# 105. `useContext` і TypeScript — рекомендований патерн

Для більшості практичних проєктів корисний такий шаблон:

    type ContextValue = {
        ...
    };

    const SomeContext =
        createContext<ContextValue | null>(null);

    export function SomeProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        ...
    }

    export function useSomeContext() {
        const context =
            useContext(SomeContext);

        if (context === null) {
            throw new Error(
                "useSomeContext must be used inside SomeProvider"
            );
        }

        return context;
    }

Після цього компоненти працюють через:

    const value = useSomeContext();

Це чистий і масштабований підхід.

---

# 106. Типова структура файлу Context

Наприклад:

    "use client";

    import {
        createContext,
        useContext,
        useState,
    } from "react";

    type Theme = "light" | "dark";

    type ThemeContextValue = {
        theme: Theme;
        setTheme: (theme: Theme) => void;
    };

    const ThemeContext =
        createContext<ThemeContextValue | null>(null);

    export function ThemeProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        ...
    }

    export function useTheme() {
        ...
    }

Це хороший шаблон для власних Context.

---

# 107. Context і separation of state logic

У компоненті:

    function Header() {
        const {
            user,
            logout,
        } = useAuth();

        ...
    }

`Header` не знає:

- де зберігається user;
- як працює login;
- як працює logout;
- який reducer використовується;
- чи є localStorage;
- чи є API.

Він знає тільки public API:

    useAuth()

Це одна з головних переваг custom Context Hook.

---

# 108. Context як API компонента

Можна розглядати:

    useTheme()

як API:

    useTheme().theme
    useTheme().setTheme()

Внутрішня реалізація може змінитися:

    useState

сьогодні,

    useReducer

завтра,

    external store

пізніше.

Компоненти можуть залишитися без змін.

---

# 109. Context і тестування

Context Provider можна використовувати для тестування компонентів.

Наприклад:

    <ThemeProvider>
        <Button />
    </ThemeProvider>

Тест може створити спеціальний Provider або передати тестове value.

Це дозволяє тестувати компонент у контрольованому середовищі.

---

# 110. Коли Context використовувати

Добрі кандидати:

- тема;
- authenticated user;
- permissions;
- locale;
- application settings;
- shared UI state;
- state певного великого subtree;
- дані, які потрібні багатьом deep components.

---

# 111. Коли Context не використовувати

Не варто створювати Context для:

- локального input state;
- простого `isOpen`;
- одного `selectedItem`;
- даних, які потрібні тільки одному компоненту;
- одного прямого prop;
- кожної маленької змінної.

Спочатку спробуй:

    useState

або:

    props

і лише потім Context, якщо він справді вирішує проблему.

---

# 112. Context і lifting state up

Без Context:

    Child A
       ↑
    Parent
       ↓
    Child B

State можна підняти в Parent:

    Parent
    ├── state
    ├── Child A
    └── Child B

Якщо дерево стає глибоким:

    Parent
       ↓
    Layout
       ↓
    Section
       ↓
    Child A / Child B

може стати доречним Context.

---

# 113. Context і prop drilling

Ментальна модель:

    Props:

    A
    ↓
    B
    ↓
    C
    ↓
    D

    Context:

    Provider
       ↓
    A
       ↓
    B
       ↓
    C
       ↓
    D

При Context:

    D → useContext()

не потребує:

    A → props
    B → props
    C → props

---

# 114. Context не замінює компонентну архітектуру

Якщо Context використовується всюди, компоненти можуть стати сильно пов'язаними з application-level state.

Тому потрібно зберігати баланс:

    local state → local component

    props → direct parent/child communication

    context → shared subtree state

    external store → complex global state

---

# 115. Питання зі співбесіди

### Що таке Context у React?

Context — це механізм React для передачі значень через дерево компонентів без необхідності передавати їх через props на кожному рівні.

---

### Що робить `useContext`?

`useContext` дозволяє компоненту отримати значення відповідного Context від найближчого Provider.

---

### Що робить `createContext`?

Створює Context object.

Наприклад:

    const ThemeContext =
        createContext("light");

---

### Що таке Provider?

Provider — це компонент, який надає value відповідного Context дочірньому дереву.

---

### Що станеться, якщо Provider немає?

`useContext` поверне `defaultValue`, заданий у `createContext`.

Якщо default value — `null`, компонент отримає `null`.

---

### Що таке prop drilling?

Передача props через компоненти, яким ці props не потрібні, лише для того, щоб доставити їх глибшому компоненту.

---

### Чи є Context глобальним state?

Ні.

Context — це механізм передачі значення в межах певного дерева компонентів.

Для state зазвичай використовують:

    useState
    useReducer

разом із Context.

---

### Чи може Context містити state?

Так.

Найпоширеніший патерн:

    useState
        +
    Context

---

### Чи можна використовувати Context із `useReducer`?

Так.

Це дуже поширений патерн для складнішого shared state.

---

### Що станеться, якщо value Provider зміниться?

Компоненти, які споживають цей Context, можуть бути перерендерені та отримають нове value.

---

### Чому object як Context value може спричиняти зайві render?

Тому що новий object має нову identity:

    { theme: "light" }

не є тим самим об'єктом, що:

    { theme: "light" }

на іншому render.

---

### Чи потрібно завжди використовувати `useMemo` для Context value?

Ні.

`useMemo` — це optimization tool, а не обов'язкова частина Context.

---

### Чому створюють Context із `null`?

Щоб можна було виявити використання Context без відповідного Provider.

---

### Навіщо потрібен custom Hook `useTheme()`?

Щоб приховати `useContext`, перевірити наявність Provider та надати зручний API компонентам.

---

### Чим Context відрізняється від props?

Props передаються явно від parent до child.

Context дозволяє deep child отримати значення без передачі через проміжні компоненти.

---

### Чи може Context передавати функції?

Так.

Наприклад:

    {
        user,
        login,
        logout
    }

---

### Чи можна мати кілька Context?

Так.

Наприклад:

    AuthContext
    ThemeContext
    LanguageContext

---

### Чи можна мати кілька Provider одного Context?

Так.

Тоді компоненти отримують значення найближчого Provider.

---

# 116. Шлях вивчення

## 🟢 Core

Потрібно добре знати:

- `createContext`;
- Context;
- Provider;
- `useContext`;
- `defaultValue`;
- prop drilling;
- nearest Provider;
- Context + `useState`;
- TypeScript типізацію Context.

---

## 🔵 Junior

Далі:

- custom Context Hook;
- `ContextValue | null`;
- Theme Context;
- Auth Context;
- Language Context;
- multiple Providers;
- nested Providers;
- Context + `useEffect`;
- Context у Next.js App Router.

---

## 🟠 Middle

Потім:

- Context + `useReducer`;
- Provider architecture;
- Context splitting;
- Context performance;
- object identity;
- `useMemo`;
- `useCallback`;
- State Context + Dispatch Context;
- Context vs composition;
- Context vs external state management.

---

## 🔴 Senior

Глибше:

- subscription architecture;
- selector-based state;
- performance boundaries;
- external stores;
- avoiding unnecessary Context coupling;
- state ownership;
- scalable Provider architecture;
- complex application state;
- Context vs Redux/Zustand/Jotai та інші state-management підходи;
- проектування API custom Hooks;
- розділення local state / shared state / server state.

---

# 117. Міні-шпаргалка

### Створити Context

    const ThemeContext =
        createContext<Theme | null>(null);

### Provider

    <ThemeContext.Provider value={theme}>
        {children}
    </ThemeContext.Provider>

### Отримати value

    const theme = useContext(ThemeContext);

### Типізований Context

    type ThemeContextValue = {
        theme: Theme;
        setTheme: (theme: Theme) => void;
    };

    const ThemeContext =
        createContext<ThemeContextValue | null>(null);

### Custom Hook

    function useTheme() {
        const context = useContext(ThemeContext);

        if (context === null) {
            throw new Error(
                "useTheme must be used inside ThemeProvider"
            );
        }

        return context;
    }

### Provider

    function ThemeProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const [theme, setTheme] =
            useState<Theme>("light");

        return (
            <ThemeContext.Provider
                value={{
                    theme,
                    setTheme,
                }}
            >
                {children}
            </ThemeContext.Provider>
        );
    }

### Consumer

    function Button() {
        const {
            theme,
            setTheme,
        } = useTheme();

        return (
            <button
                onClick={() => {
                    setTheme("dark");
                }}
            >
                {theme}
            </button>
        );
    }

---

# 118. Найважливіша схема

    createContext()
          ↓
    Context
          ↓
    Provider
          ↓
    value
          ↓
    component tree
          ↓
    useContext()
          ↓
    component receives value

---

# 119. `Context + useState`

Запам'ятай:

    useState
        ↓
    зберігає state

    Context Provider
        ↓
    поширює state

    useContext
        ↓
    читає state

---

# 120. `Context + useReducer`

Для складнішого state:

    useReducer
        ↓
    state + dispatch
        ↓
    Context Provider
        ↓
    useContext
        ↓
    components

---

# 121. Найважливіша різниця

`props`:

    Parent
       ↓
    Child
       ↓
    Child

Дані передаються явно.

`Context`:

    Provider
       ↓
    Child
       ↓
    Child
       ↓
    Deep Child
          ↓
      useContext()

Deep Child може отримати Context без prop drilling.

---

# 122. Головне

`useContext` не є "глобальною змінною".

Його правильніше розуміти так:

> `Context` дозволяє передати значення вниз по певному дереву компонентів, а `useContext` дозволяє компоненту це значення прочитати.

Три основні елементи:

    createContext
        ↓
    створити Context

    Provider
        ↓
    надати value

    useContext
        ↓
    отримати value

Найпоширеніший практичний патерн:

    useState
        ↓
    Provider
        ↓
    useContext
        ↓
    components

Для складнішого state:

    useReducer
        ↓
    Provider
        ↓
    useContext
        ↓
    components

---

# 123. Фундаментальна ментальна модель

Запам'ятай чотири рівні:

    Props
        ↓
    direct parent → child communication

    useState
        ↓
    local component state

    Context
        ↓
    shared value for a subtree

    External state manager
        ↓
    complex application-wide state

І головне правило:

    Не використовуй Context тільки тому,
    що він існує.

Спочатку запитай:

    "Чи це локальний state?"

        ↓ так

    useState

        ↓ ні

    "Чи це прямий зв'язок parent → child?"

        ↓ так

    props

        ↓ ні

    "Чи це значення потрібно багатьом
     компонентам у великому subtree?"

        ↓ так

    Context

        ↓

    "Чи state став настільки складним,
     що Context вже незручний?"

        ↓

    useReducer / external state management

---

# 124. Context у твоїй React-структурі

У твоєму навчальному плані `useContext` логічно пов'язується з попередніми темами:

    01-components-and-rendering
            ↓
    компоненти та props
            ↓
    02-events-state-and-forms
            ↓
    useState
            ↓
    03-component-lifecycle-and-effects
            ↓
    useEffect
            ↓
    04-hooks
            ↓
    01-use-state
            ↓
    02-use-effect
            ↓
    03-use-ref
            ↓
    04-use-context

Тобто тепер важливо бачити різницю:

    useState
        ↓
    "де зберігати state?"

    useEffect
        ↓
    "як синхронізуватися
     із зовнішньою системою?"

    useRef
        ↓
    "як зберегти mutable value
     між render без re-render?"

    useContext
        ↓
    "як передати shared value
     глибоко в дерево без prop drilling?"

Саме ці чотири Hooks формують дуже важливу основу React:

    useState
    useEffect
    useRef
    useContext

Після їх розуміння значно легше переходити до:

    useMemo
    useCallback
    useReducer
    custom Hooks

і далі — до складнішої компонентної архітектури.