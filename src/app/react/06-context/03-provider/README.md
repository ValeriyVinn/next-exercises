# 03. Provider

## Зміст

- [1. Що таке Provider](#1-що-таке-provider)
- [2. Зв'язок Context → Provider → Consumer](#2-звязок-context--provider--consumer)
- [3. Базовий синтаксис Provider](#3-базовий-синтаксис-provider)
- [4. `value` — головна властивість Provider](#4-value--головна-властивість-provider)
- [5. Передача простого значення](#5-передача-простого-значення)
- [6. Передача об'єкта](#6-передача-обєкта)
- [7. Передача стану через Provider](#7-передача-стану-через-provider)
- [8. Provider і `useState`](#8-provider-і-usestate)
- [9. Provider і `useReducer`](#9-provider-і-usereducer)
- [10. Вкладені Provider](#10-вкладені-provider)
- [11. Найближчий Provider](#11-найближчий-provider)
- [12. Provider для частини дерева](#12-provider-для-частини-дерева)
- [13. Provider у React 19](#13-provider-у-react-19)
- [14. Provider як окремий компонент](#14-provider-як-окремий-компонент)
- [15. Типізація Provider у TypeScript](#15-типізація-provider-у-typescript)
- [16. `undefined` як ознака відсутнього Provider](#16-undefined-як-ознака-відсутнього-provider)
- [17. Provider не зберігає стан сам по собі](#17-provider-не-зберігає-стан-сам-по-собі)
- [18. Provider і зміна `value`](#18-provider-і-зміна-value)
- [19. Об'єкти та функції в `value`](#19-обєкти-та-функції-в-value)
- [20. Типова структура Context + Provider](#20-типова-структура-context--provider)
- [21. Типові помилки](#21-типові-помилки)
- [22. Provider vs props](#22-provider-vs-props)
- [23. Provider vs глобальні змінні](#23-provider-vs-глобальні-змінні)
- [24. Питання для співбесіди](#24-питання-для-співбесіди)
- [25. Рівні знань](#25-рівні-знань)
- [26. Міні-шпаргалка](#26-міні-шпаргалка)
- [27. Головне](#27-головне)

---

# 1. Що таке Provider

**Provider** — це частина Context API, яка передає значення Context усім компонентам нижче себе в React tree.

Якщо `createContext()` **створює Context**, то Provider **постачає конкретне значення цього Context**.

У спрощеному вигляді:

    createContext()
          ↓
       Context
          ↓
      Provider
          ↓
    value={...}
          ↓
    дочірні компоненти
          ↓
      useContext()

Наприклад:

    const ThemeContext = createContext<Theme>("light");

Provider передає реальне значення:

    <ThemeContext.Provider value="dark">
        <App />
    </ThemeContext.Provider>

Тепер компоненти всередині цього Provider можуть отримати:

    "dark"

через `useContext()`.

---

# 2. Зв'язок Context → Provider → Consumer

Context API складається з декількох пов'язаних понять.

## `createContext()`

Створює Context object:

    const ThemeContext = createContext<Theme>("light");

---

## Provider

Передає конкретне значення:

    <ThemeContext.Provider value="dark">
        ...
    </ThemeContext.Provider>

---

## Consumer

Компонент, який отримує значення Context.

Сучасний React найчастіше використовує:

    const theme = useContext(ThemeContext);

Тобто:

    createContext()
          ↓
       Context
          ↓
       Provider
          ↓
        value
          ↓
      useContext()
          ↓
       Component

Важливо:

> `createContext()` створює Context, але саме Provider визначає значення Context для конкретної частини React tree.

---

# 3. Базовий синтаксис Provider

Класичний синтаксис:

    <SomeContext.Provider value={value}>
        {children}
    </SomeContext.Provider>

Наприклад:

    import { createContext } from "react";

    type Theme = "light" | "dark";

    const ThemeContext = createContext<Theme>("light");

    function App() {
        return (
            <ThemeContext.Provider value="dark">
                <Page />
            </ThemeContext.Provider>
        );
    }

`value` — це значення, яке отримають споживачі Context.

---

# 4. `value` — головна властивість Provider

Provider має головну властивість:

    value

Наприклад:

    <ThemeContext.Provider value="dark">
        <App />
    </ThemeContext.Provider>

Тут:

    value="dark"

означає:

> "Для всіх споживачів цього Context всередині цього Provider значення ThemeContext буде `dark`."

---

## Provider може передавати різні типи значень

### Рядок

    <ThemeContext.Provider value="dark">
        ...
    </ThemeContext.Provider>

### Число

    <CountContext.Provider value={10}>
        ...
    </CountContext.Provider>

### Boolean

    <AuthContext.Provider value={true}>
        ...
    </AuthContext.Provider>

### Об'єкт

    <UserContext.Provider value={user}>
        ...
    </UserContext.Provider>

### Масив

    <ItemsContext.Provider value={items}>
        ...
    </ItemsContext.Provider>

### Функцію

    <LanguageContext.Provider value={changeLanguage}>
        ...
    </LanguageContext.Provider>

### Об'єкт із даними та функціями

    <AuthContext.Provider
        value={{
            user,
            login,
            logout,
        }}
    >
        ...
    </AuthContext.Provider>

---

# 5. Передача простого значення

Найпростіший приклад — тема.

Створюємо Context:

    import { createContext } from "react";

    type Theme = "light" | "dark";

    const ThemeContext = createContext<Theme>("light");

Передаємо значення:

    function App() {
        return (
            <ThemeContext.Provider value="dark">
                <Page />
            </ThemeContext.Provider>
        );
    }

Тепер:

    Page
      └── Header
            └── Button

усі ці компоненти знаходяться всередині Provider.

Тому вони можуть отримати:

    "dark"

---

# 6. Передача об'єкта

У реальних застосунках Context часто передає не одне значення, а об'єкт.

Наприклад:

    type User = {
        id: number;
        name: string;
    };

    type UserContextValue = {
        user: User | null;
        isAuthenticated: boolean;
    };

Створюємо Context:

    const UserContext =
        createContext<UserContextValue | undefined>(undefined);

Provider:

    function App() {
        const user = {
            id: 1,
            name: "Valeriy",
        };

        return (
            <UserContext.Provider
                value={{
                    user,
                    isAuthenticated: true,
                }}
            >
                <Dashboard />
            </UserContext.Provider>
        );
    }

Context тепер передає цілий об'єкт:

    {
        user,
        isAuthenticated
    }

---

# 7. Передача стану через Provider

Одна з головних причин використання Provider — передавати **стан** багатьом компонентам.

Наприклад:

    const ThemeContext = createContext<Theme>("light");

Provider може отримувати стан:

    function App() {
        const [theme, setTheme] = useState<Theme>("light");

        return (
            <ThemeContext.Provider value={theme}>
                <Page />
            </ThemeContext.Provider>
        );
    }

Тепер:

    theme

зберігається у `App`, а Context поширює його вниз по дереву.

Схема:

    App
      │
      ├── state: theme
      │
      └── ThemeContext.Provider
              │
              ├── Header
              │
              ├── Main
              │
              └── Footer

Усі ці компоненти можуть отримати `theme`.

---

# 8. Provider і `useState`

Найпоширеніший практичний шаблон:

    useState
        ↓
    Provider
        ↓
    Context
        ↓
    дочірні компоненти

Наприклад:

    import {
        createContext,
        useState,
    } from "react";

    type Theme = "light" | "dark";

    type ThemeContextValue = {
        theme: Theme;
        setTheme: (theme: Theme) => void;
    };

    const ThemeContext =
        createContext<ThemeContextValue | undefined>(undefined);

    function App() {
        const [theme, setTheme] =
            useState<Theme>("light");

        return (
            <ThemeContext.Provider
                value={{
                    theme,
                    setTheme,
                }}
            >
                <Page />
            </ThemeContext.Provider>
        );
    }

Тут Provider передає:

    {
        theme,
        setTheme
    }

Отже, дочірні компоненти можуть:

- прочитати `theme`;
- змінити `theme`.

---

# 9. Provider і `useReducer`

Для складнішого стану замість `useState` часто використовують `useReducer`.

Наприклад:

    type State = {
        count: number;
    };

    type Action =
        | { type: "increment" }
        | { type: "decrement" };

    type CounterContextValue = {
        state: State;
        dispatch: React.Dispatch<Action>;
    };

Provider може виглядати так:

    function CounterProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const [state, dispatch] =
            useReducer(reducer, { count: 0 });

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

Схема:

    useReducer()
         ↓
    state + dispatch
         ↓
      Provider
         ↓
      Context
         ↓
    Components

Це один із найпоширеніших патернів Context API.

---

# 10. Вкладені Provider

Provider можна вкладати один в один.

Наприклад:

    <ThemeContext.Provider value="dark">
        <LanguageContext.Provider value="uk">
            <App />
        </LanguageContext.Provider>
    </ThemeContext.Provider>

Тут `App` знаходиться одночасно:

- всередині `ThemeContext.Provider`;
- всередині `LanguageContext.Provider`.

Тому `App` та його дочірні компоненти можуть отримати обидва значення.

---

## Ще один приклад

    <AuthContext.Provider value={auth}>
        <ThemeContext.Provider value="dark">
            <LanguageContext.Provider value="uk">
                <App />
            </LanguageContext.Provider>
        </ThemeContext.Provider>
    </AuthContext.Provider>

Це нормальна практика.

Наприклад:

    AuthContext
        ↓
    ThemeContext
        ↓
    LanguageContext
        ↓
    App

---

# 11. Найближчий Provider

Якщо для одного Context існує декілька Provider, React використовує **найближчий Provider зверху по дереву**.

Наприклад:

    <ThemeContext.Provider value="light">

        <Header />

        <ThemeContext.Provider value="dark">
            <Main />
        </ThemeContext.Provider>

    </ThemeContext.Provider>

Тоді:

    Header → "light"

а:

    Main → "dark"

Тобто внутрішній Provider перекриває зовнішній для своєї частини дерева.

---

## Схематично

    ThemeProvider("light")
    │
    ├── Header
    │     └── отримує "light"
    │
    └── ThemeProvider("dark")
          │
          ├── Main
          │     └── отримує "dark"
          │
          └── Footer
                └── отримує "dark"

Це дуже важлива властивість Context API.

---

# 12. Provider для частини дерева

Provider необов'язково повинен обгортати весь застосунок.

Він може обгортати лише потрібну частину.

Наприклад:

    function App() {
        return (
            <>
                <Header />

                <ThemeContext.Provider value="dark">
                    <Dashboard />
                </ThemeContext.Provider>

                <Footer />
            </>
        );
    }

Тут:

    Header

не знаходиться всередині Provider.

А:

    Dashboard

знаходиться.

Тому Context доступний тільки для:

    Dashboard

та його дочірніх компонентів.

---

# 13. Provider у React 19

У старішому та широко використовуваному синтаксисі Provider записується так:

    <ThemeContext.Provider value={theme}>
        {children}
    </ThemeContext.Provider>

У React 19 Context object можна використовувати безпосередньо як Provider:

    <ThemeContext value={theme}>
        {children}
    </ThemeContext>

Тобто:

    ThemeContext.Provider

і в React 19:

    ThemeContext

можуть використовуватися як Provider.

---

## Порівняння

Класичний запис:

    <ThemeContext.Provider value="dark">
        <App />
    </ThemeContext.Provider>

React 19:

    <ThemeContext value="dark">
        <App />
    </ThemeContext>

Обидва варіанти означають одну концепцію:

> передати значення Context вниз по React tree.

Для навчання важливо знати обидва синтаксиси, оскільки в існуючих проектах ти зустрінеш обидва.

---

# 14. Provider як окремий компонент

У невеликому прикладі можна написати Provider безпосередньо в `App`.

Але в реальному проекті логіку Context зазвичай виносять в окремий компонент.

Наприклад:

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

Після цього:

    function App() {
        return (
            <ThemeProvider>
                <Header />
                <Main />
                <Footer />
            </ThemeProvider>
        );
    }

Це набагато зручніше.

---

## Чому це корисно

Компонент `ThemeProvider` бере на себе:

- створення state;
- зміну state;
- формування `value`;
- передачу `value`;
- роботу з Context.

А `App` просто використовує готовий Provider.

---

# 15. Типізація Provider у TypeScript

У TypeScript потрібно правильно описати тип `value`.

Наприклад:

    type Theme = "light" | "dark";

    type ThemeContextValue = {
        theme: Theme;
        setTheme: (theme: Theme) => void;
    };

Context:

    const ThemeContext =
        createContext<ThemeContextValue | undefined>(undefined);

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

Тут TypeScript контролює `value`.

Наприклад, це правильно:

    value={{
        theme: "dark",
        setTheme,
    }}

А це помилка:

    value={{
        theme: "blue",
        setTheme,
    }}

тому що:

    type Theme = "light" | "dark";

і `"blue"` не входить до цього типу.

---

# 16. `undefined` як ознака відсутнього Provider

Дуже поширений TypeScript-патерн:

    const ThemeContext =
        createContext<ThemeContextValue | undefined>(undefined);

Це означає:

> Context не має нормального значення, якщо відповідний Provider не був встановлений.

Наприклад:

    createContext<ThemeContextValue | undefined>(undefined);

Provider:

    <ThemeContext.Provider
        value={{
            theme,
            setTheme,
        }}
    >
        {children}
    </ThemeContext.Provider>

Якщо компонент знаходиться поза Provider, значення Context буде:

    undefined

Це може бути корисно, тому що помилку неправильного використання можна виявити явно.

---

## Чому це часто краще за фіктивне значення

Можна було б написати:

    createContext({
        theme: "light",
        setTheme: () => {},
    });

Але це може приховати помилку.

Наприклад, компонент забули обгорнути Provider.

Замість помилки він отримає:

    theme: "light"

і порожню функцію:

    setTheme: () => {}

У результаті застосунок може працювати неправильно, але помилка буде непомітною.

Тому якщо Provider **обов'язковий**, часто краще:

    createContext<ThemeContextValue | undefined>(undefined);

---

# 17. Provider не зберігає стан сам по собі

Це одна з найважливіших концепцій.

**Context Provider не є state management системою сам по собі.**

Provider лише передає значення.

Наприклад:

    <ThemeContext.Provider value="dark">
        ...
    </ThemeContext.Provider>

Provider не створив `"dark"`.

Значення:

    "dark"

було передане йому через:

    value="dark"

---

## Звідки може прийти `value`

### Зі змінної

    const theme = "dark";

    <ThemeContext.Provider value={theme}>
        ...
    </ThemeContext.Provider>

### З `useState`

    const [theme, setTheme] =
        useState<Theme>("light");

    <ThemeContext.Provider value={theme}>
        ...
    </ThemeContext.Provider>

### З `useReducer`

    const [state, dispatch] =
        useReducer(reducer, initialState);

    <Context.Provider
        value={{ state, dispatch }}
    >
        ...
    </Context.Provider>

### З props

    function Provider({ value, children }) {
        return (
            <Context.Provider value={value}>
                {children}
            </Context.Provider>
        );
    }

Тобто:

    Context Provider
         ↓
    розповсюджує value

але:

    State
         ↓
    створюється useState / useReducer / іншою логікою

---

# 18. Provider і зміна `value`

Якщо `value` змінюється, компоненти, які використовують цей Context, можуть бути оновлені.

Наприклад:

    function ThemeProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const [theme, setTheme] =
            useState<Theme>("light");

        return (
            <ThemeContext.Provider value={theme}>
                {children}
            </ThemeContext.Provider>
        );
    }

Спочатку:

    theme = "light"

Provider передає:

    value="light"

Після:

    setTheme("dark");

Provider отримує:

    value="dark"

Споживачі Context отримують нове значення.

Схема:

    useState
       ↓
    theme = "light"
       ↓
    Provider
       ↓
    value="light"

          ↓ setTheme("dark")

    theme = "dark"
       ↓
    Provider
       ↓
    value="dark"
       ↓
    Context consumers update

---

# 19. Об'єкти та функції в `value`

Дуже часто Provider передає об'єкт:

    value={{
        theme,
        setTheme,
    }}

Наприклад:

    <ThemeContext.Provider
        value={{
            theme,
            setTheme,
        }}
    >
        {children}
    </ThemeContext.Provider>

Тут `value` — новий об'єкт.

Це важливо для продуктивності, тому що Context реагує на зміну значення.

---

## Наївний варіант

    <ThemeContext.Provider
        value={{
            theme,
            setTheme,
        }}
    >
        {children}
    </ThemeContext.Provider>

У багатьох випадках це абсолютно нормально.

Не потрібно автоматично додавати `useMemo()` до кожного Context Provider.

Але якщо Provider часто ререндериться і `value` містить складний об'єкт, стабілізація посилання може бути доречною:

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

Це вже питання оптимізації, а не базового використання Provider.

---

# 20. Типова структура Context + Provider

У реальному проекті зручно розділяти Context і Provider.

Наприклад:

    src/
    └── context/
        └── theme/
            ├── ThemeContext.ts
            └── ThemeProvider.tsx

---

## `ThemeContext.ts`

    import { createContext } from "react";

    export type Theme = "light" | "dark";

    export type ThemeContextValue = {
        theme: Theme;
        setTheme: (theme: Theme) => void;
    };

    export const ThemeContext =
        createContext<ThemeContextValue | undefined>(
            undefined
        );

---

## `ThemeProvider.tsx`

    import {
        useState,
        type ReactNode,
    } from "react";

    import {
        ThemeContext,
        type Theme,
    } from "./ThemeContext";

    type ThemeProviderProps = {
        children: ReactNode;
    };

    export function ThemeProvider({
        children,
    }: ThemeProviderProps) {
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

---

## Використання

    function App() {
        return (
            <ThemeProvider>
                <Header />
                <Main />
                <Footer />
            </ThemeProvider>
        );
    }

Це вже хороший базовий production-style підхід.

---

# 21. Типові помилки

## Помилка №1 — плутати Context і Provider

Неправильно думати:

    createContext()
        =
    Provider

Насправді:

    createContext()
        ↓
    створює Context

    Provider
        ↓
    передає значення Context

---

## Помилка №2 — думати, що Context автоматично робить дані глобальними

Наприклад:

    const UserContext = createContext<User | null>(null);

це **не означає**, що `user` автоматично доступний у всьому застосунку.

Потрібен Provider:

    <UserContext.Provider value={user}>
        <App />
    </UserContext.Provider>

---

## Помилка №3 — забути `value`

Наприклад:

    <ThemeContext.Provider>
        <App />
    </ThemeContext.Provider>

Provider потребує значення.

Правильно:

    <ThemeContext.Provider value={theme}>
        <App />
    </ThemeContext.Provider>

---

## Помилка №4 — Provider знаходиться не над споживачем

Наприклад:

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

`Header` не знаходиться всередині Provider.

Тому він не отримає значення цього Provider.

---

## Помилка №5 — створювати Context всередині компонента

Погано:

    function App() {
        const ThemeContext =
            createContext("light");

        return (
            ...
        );
    }

Context зазвичай потрібно створювати на рівні модуля:

    const ThemeContext =
        createContext<Theme>("light");

    function App() {
        return (
            ...
        );
    }

---

## Помилка №6 — використовувати `any`

Не потрібно:

    const Context =
        createContext<any>(null);

Краще:

    type Theme = "light" | "dark";

    const ThemeContext =
        createContext<Theme>("light");

Або:

    type ThemeContextValue = {
        theme: Theme;
        setTheme: (theme: Theme) => void;
    };

    const ThemeContext =
        createContext<ThemeContextValue | undefined>(
            undefined
        );

---

## Помилка №7 — фіктивні функції за замовчуванням

Наприклад:

    const AuthContext = createContext({
        user: null,
        login: () => {},
        logout: () => {},
    });

Такий код може приховати відсутність Provider.

Якщо Provider обов'язковий, часто краще:

    const AuthContext =
        createContext<AuthContextValue | undefined>(
            undefined
        );

---

## Помилка №8 — один величезний Context

Не варто автоматично складати в один Context:

    User
    Theme
    Language
    Cart
    Notifications
    Settings
    Permissions
    Modal
    Search

Краще розділяти незалежні області відповідальності:

    AuthContext
    ThemeContext
    LanguageContext
    CartContext

Це робить архітектуру зрозумілішою.

---

# 22. Provider vs props

## Props

Дані передаються явно:

    function App() {
        const theme = "dark";

        return (
            <Page theme={theme} />
        );
    }

    function Page({ theme }) {
        return (
            <Header theme={theme} />
        );
    }

    function Header({ theme }) {
        return (
            <Button theme={theme} />
        );
    }

Тут дані проходять через компоненти.

---

## Context Provider

При Context:

    <ThemeContext.Provider value="dark">
        <Page />
    </ThemeContext.Provider>

`Page`, `Header`, `Button` не повинні передавати `theme` через props лише для того, щоб доставити його глибоко вниз.

Схема:

    Props:

    App
     ↓ props
    Page
     ↓ props
    Header
     ↓ props
    Button


    Context:

    App
     ↓
    Provider
     ↓
    Page
     ↓
    Header
     ↓
    Button
          ↑
       useContext()

---

## Але Context не замінює props

Props краще використовувати, коли:

- дані потрібні безпосередньому дочірньому компоненту;
- залежність повинна бути очевидною;
- значення використовується в невеликій частині дерева;
- передача через 1–2 рівні не створює проблем.

Context корисний, коли:

- дані потрібні багатьом компонентам;
- компоненти знаходяться глибоко;
- prop drilling стає незручним;
- значення є концептуально спільним для частини дерева.

---

# 23. Provider vs глобальні змінні

Context Provider — це не просто глобальна змінна.

Глобальна змінна:

    const theme = "dark";

Context:

    <ThemeContext.Provider value={theme}>
        <App />
    </ThemeContext.Provider>

Головна різниця:

**Context прив'язаний до React tree.**

Він має область дії.

Наприклад:

    Provider A
    │
    ├── Component A
    │
    └── Component B

Значення Context доступне цим компонентам.

Але компонент поза цією гілкою не обов'язково отримує це значення.

Тому Context можна розглядати як:

> механізм передачі значення вниз по конкретному React tree.

---

# 24. Питання для співбесіди

## Що таке Provider?

Provider — це механізм Context API, який передає значення Context компонентам нижче себе в React tree.

---

## Що робить `value`?

`value` визначає конкретне значення, яке Provider передає споживачам Context.

Наприклад:

    <ThemeContext.Provider value="dark">
        ...
    </ThemeContext.Provider>

---

## Чи створює Provider стан?

Ні.

Provider лише передає значення.

Стан зазвичай створюється через:

    useState

або:

    useReducer

а Provider поширює цей стан через `value`.

---

## Що станеться, якщо Provider відсутній?

Тоді споживач Context отримає `defaultValue`, який був переданий у `createContext()`.

Наприклад:

    const ThemeContext =
        createContext<Theme>("light");

Без Provider:

    "light"

Якщо Context створений так:

    const ThemeContext =
        createContext<Theme | undefined>(
            undefined
        );

без Provider:

    undefined

---

## Чи можна мати декілька Provider одного Context?

Так.

Наприклад:

    <ThemeContext.Provider value="light">
        <Header />

        <ThemeContext.Provider value="dark">
            <Main />
        </ThemeContext.Provider>
    </ThemeContext.Provider>

`Header` отримує `"light"`.

`Main` отримує `"dark"`.

---

## Який Provider буде використано?

Найближчий Provider цього Context над компонентом.

---

## Чи можна передавати через Provider об'єкт?

Так.

Наприклад:

    <AuthContext.Provider
        value={{
            user,
            login,
            logout,
        }}
    >
        ...
    </AuthContext.Provider>

---

## Чи можна передавати функції?

Так.

Це дуже поширений патерн:

    value={{
        theme,
        setTheme,
    }}

---

## Чому Context створюють поза компонентом?

Щоб Context object мав стабільну ідентичність і використовувався всіма компонентами як один і той самий Context.

---

## Чи робить Context дані глобальними?

Не зовсім.

Context поширює значення вниз по React tree від конкретного Provider.

---

## Чи обов'язково Provider повинен обгортати весь App?

Ні.

Provider може обгортати тільки ту частину дерева, якій потрібне значення.

---

# 25. Рівні знань

## 🟢 Core

Ти повинен розуміти:

- що таке Provider;
- для чого потрібен Provider;
- що таке `value`;
- зв'язок `createContext → Provider → useContext`;
- що Provider передає значення вниз;
- що Provider не створює state сам по собі;
- що без Provider використовується `defaultValue`;
- що Provider можна вкладати.

Базовий приклад:

    const ThemeContext =
        createContext<Theme>("light");

    function App() {
        return (
            <ThemeContext.Provider value="dark">
                <Page />
            </ThemeContext.Provider>
        );
    }

---

## 🟡 Junior

Потрібно вміти:

- створювати типізований Provider;
- передавати об'єкти;
- передавати функції;
- використовувати `useState` всередині Provider;
- використовувати `useReducer` всередині Provider;
- створювати окремий компонент `ThemeProvider`;
- використовувати `undefined` для обов'язкового Provider;
- розуміти вкладені Provider;
- розуміти nearest Provider.

Типовий шаблон:

    type ContextValue = {
        value: string;
        setValue: (value: string) => void;
    };

    const Context =
        createContext<ContextValue | undefined>(
            undefined
        );

    function Provider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const [value, setValue] =
            useState("initial");

        return (
            <Context.Provider
                value={{
                    value,
                    setValue,
                }}
            >
                {children}
            </Context.Provider>
        );
    }

---

## 🟠 Middle

Потрібно розуміти:

- межі відповідальності Context;
- розділення Context за domain;
- Context + `useState`;
- Context + `useReducer`;
- стабільність `value`;
- вплив зміни `value` на consumers;
- навіщо виносити Provider в окремий компонент;
- типобезпечний API Context;
- композицію декількох Provider;
- коли Context не є найкращим рішенням.

Наприклад:

    AuthProvider
        ↓
    ThemeProvider
        ↓
    CartProvider
        ↓
    App

або об'єднання Provider через окремий компонент:

    function AppProviders({
        children,
    }: {
        children: React.ReactNode;
    }) {
        return (
            <AuthProvider>
                <ThemeProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </ThemeProvider>
            </AuthProvider>
        );
    }

---

## 🔴 Senior

Потрібно розуміти:

- Context як механізм dependency propagation;
- область дії Provider;
- nearest Provider semantics;
- identity `value`;
- наслідки зміни Context value;
- розділення Context за відповідальністю;
- Context vs external state management;
- Context vs external store;
- Context як dependency injection mechanism;
- серверні та клієнтські межі в сучасному React / Next.js;
- коли Context створює зайві залежності;
- коли Context стає "global state dumping ground";
- архітектуру Provider tree;
- React 19 syntax:

    <SomeContext value={value}>
        {children}
    </SomeContext>

---

# 26. Міні-шпаргалка

## Створити Context

    import { createContext } from "react";

    const ThemeContext =
        createContext<Theme>("light");

---

## Provider

Класичний синтаксис:

    <ThemeContext.Provider value={theme}>
        {children}
    </ThemeContext.Provider>

React 19:

    <ThemeContext value={theme}>
        {children}
    </ThemeContext>

---

## Provider з state

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

---

## Типізований Context

    type ContextValue = {
        theme: Theme;
        setTheme: (theme: Theme) => void;
    };

    const ThemeContext =
        createContext<ContextValue | undefined>(
            undefined
        );

---

## Обгорнути дерево

    <ThemeProvider>
        <App />
    </ThemeProvider>

---

## Вкладені Provider

    <AuthProvider>
        <ThemeProvider>
            <LanguageProvider>
                <App />
            </LanguageProvider>
        </ThemeProvider>
    </AuthProvider>

---

## Головна схема

    createContext()
          ↓
       Context
          ↓
       Provider
          ↓
       value
          ↓
    React tree
          ↓
      useContext()
          ↓
       Consumer

---

# 27. Головне

> **`createContext()` створює Context, а Provider передає конкретне значення цього Context вниз по React tree.**

Запам'ятай:

1. `createContext()` створює Context object.

2. Provider визначає значення через:

       value={...}

3. Provider передає значення компонентам нижче себе.

4. Provider не є state management сам по собі.

5. State зазвичай створюється через:

       useState()

   або:

       useReducer()

6. Provider може передавати:

       string
       number
       boolean
       object
       array
       function
       state
       dispatch
       state + functions

7. Provider не обов'язково повинен обгортати весь застосунок.

8. Provider можна вкладати.

9. Якщо існує декілька Provider одного Context, використовується найближчий.

10. Без Provider використовується `defaultValue` з `createContext()`.

11. Якщо Provider обов'язковий, зручно використовувати:

       createContext<Type | undefined>(undefined)

12. Context краще створювати на рівні модуля, а не всередині компонента.

13. Не потрібно використовувати `any` для Context.

14. Context не робить значення "магічно глобальним" — значення поширюється від конкретного Provider вниз по React tree.

15. У React 19 Context object можна використовувати безпосередньо як Provider:

       <ThemeContext value={theme}>
           {children}
       </ThemeContext>

16. Класичний синтаксис:

       <ThemeContext.Provider value={theme}>
           {children}
       </ThemeContext.Provider>

17. Типовий production-підхід:

       Context
          +
       Provider
          +
       useState / useReducer
          +
       type-safe value
          ↓
       shared application state

### Найважливіша ментальна модель

    Context
       │
       │ створюється через createContext()
       ↓
    Provider
       │
       │ передає value
       ↓
    React tree
       │
       ├── Component
       ├── Component
       └── Component
              │
              ↓
          useContext()
              │
              ↓
           value

Тобто:

    createContext()
        → створити канал Context

    Provider
        → покласти значення в цей Context

    value
        → конкретні дані, які передаються

    useContext()
        → отримати ці дані в дочірньому компоненті

Це основа всього **Context API** у React.