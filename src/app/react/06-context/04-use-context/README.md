# 04. useContext

## Зміст

- [1. Що таке `useContext`](#1-що-таке-usecontext)
- [2. Для чого потрібен `useContext`](#2-для-чого-потрібен-usecontext)
- [3. Базовий синтаксис](#3-базовий-синтаксис)
- [4. `createContext` → Provider → `useContext`](#4-createcontext--provider--usecontext)
- [5. Найпростіший приклад](#5-найпростіший-приклад)
- [6. Читання Context у компоненті](#6-читання-context-у-компоненті)
- [7. `defaultValue`](#7-defaultvalue)
- [8. `useContext` без Provider](#8-usecontext-без-provider)
- [9. `useContext` і найближчий Provider](#9-usecontext-і-найближчий-provider)
- [10. Вкладені Provider](#10-вкладені-provider)
- [11. Context з `useState`](#11-context-з-usestate)
- [12. Context з об'єктом](#12-context-з-обєктом)
- [13. Context з функціями](#13-context-з-функціями)
- [14. Context для авторизації](#14-context-для-авторизації)
- [15. Context для теми](#15-context-для-теми)
- [16. Context для мови](#16-context-для-мови)
- [17. TypeScript і `useContext`](#17-typescript-і-usecontext)
- [18. `undefined` і перевірка Provider](#18-undefined-і-перевірка-provider)
- [19. Custom Hook поверх `useContext`](#19-custom-hook-поверх-usecontext)
- [20. Чому Custom Hook зручніший](#20-чому-custom-hook-зручніший)
- [21. `useContext` не приймає Context value](#21-usecontext-не-приймає-context-value)
- [22. `useContext` читає найближчий Provider](#22-usecontext-читає-найближчий-provider)
- [23. Context і ререндери](#23-context-і-ререндери)
- [24. Context не замінює props](#24-context-не-замінює-props)
- [25. Context не є глобальним state management](#25-context-не-є-глобальним-state-management)
- [26. Типові помилки](#26-типові-помилки)
- [27. Практичний повний приклад](#27-практичний-повний-приклад)
- [28. Структура файлів](#28-структура-файлів)
- [29. Питання для співбесіди](#29-питання-для-співбесіди)
- [30. Рівні знань](#30-рівні-знань)
- [31. Міні-шпаргалка](#31-міні-шпаргалка)
- [32. Головне](#32-головне)

---

# 1. Що таке `useContext`

`useContext` — це React Hook, який дозволяє компоненту **прочитати значення Context**, передане найближчим відповідним Provider.

Імпорт:

    import { useContext } from "react";

Базове використання:

    const value = useContext(SomeContext);

Наприклад:

    const ThemeContext = createContext<Theme>("light");

    function Button() {
        const theme = useContext(ThemeContext);

        return (
            <button>
                Current theme: {theme}
            </button>
        );
    }

Якщо над `Button` є:

    <ThemeContext.Provider value="dark">
        <Button />
    </ThemeContext.Provider>

то:

    useContext(ThemeContext)

поверне:

    "dark"

---

# 2. Для чого потрібен `useContext`

Без Context дані часто доводиться передавати через props:

    App
     ↓ theme
    Page
     ↓ theme
    Layout
     ↓ theme
    Header
     ↓ theme
    Button

Якщо `Page`, `Layout` і `Header` самі не використовують `theme`, вони фактично лише передають його далі.

Це називається **prop drilling**.

Context дозволяє:

    ThemeProvider
         ↓
        App
         ↓
       Page
         ↓
      Layout
         ↓
      Header
         ↓
      Button
         ↑
     useContext()

Тепер `Button` може безпосередньо прочитати `theme`.

---

# 3. Базовий синтаксис

Базовий синтаксис:

    const value = useContext(SomeContext);

Наприклад:

    import { useContext } from "react";

    const theme = useContext(ThemeContext);

`useContext()` приймає **Context object**, створений через `createContext()`.

Не значення.

Правильно:

    useContext(ThemeContext);

Неправильно:

    useContext("dark");

Неправильно:

    useContext(theme);

Тобто:

    createContext()
          ↓
       Context
          ↓
    useContext(Context)
          ↓
       value

---

# 4. `createContext` → Provider → `useContext`

Це одна з найважливіших схем Context API.

## Крок 1 — створити Context

    const ThemeContext =
        createContext<Theme>("light");

---

## Крок 2 — передати значення через Provider

    <ThemeContext.Provider value="dark">
        <App />
    </ThemeContext.Provider>

---

## Крок 3 — прочитати значення через `useContext`

    function Button() {
        const theme =
            useContext(ThemeContext);

        return (
            <button>
                {theme}
            </button>
        );
    }

Отримуємо:

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
      component

---

# 5. Найпростіший приклад

Створимо Context:

    import { createContext } from "react";

    type Theme = "light" | "dark";

    export const ThemeContext =
        createContext<Theme>("light");

Provider:

    import { ThemeContext } from "./ThemeContext";

    function App() {
        return (
            <ThemeContext.Provider value="dark">
                <Page />
            </ThemeContext.Provider>
        );
    }

Компонент:

    import { useContext } from "react";
    import { ThemeContext } from "./ThemeContext";

    function Page() {
        const theme =
            useContext(ThemeContext);

        return (
            <main>
                Theme: {theme}
            </main>
        );
    }

Результат:

    Theme: dark

---

# 6. Читання Context у компоненті

`useContext` можна викликати безпосередньо всередині функціонального компонента.

Наприклад:

    function Header() {
        const theme =
            useContext(ThemeContext);

        return (
            <header>
                Theme: {theme}
            </header>
        );
    }

Значення `theme` тепер можна використовувати:

- у JSX;
- в умовах;
- у функціях;
- для вибору CSS class;
- для побудови інших значень;
- для виклику функцій, отриманих через Context.

Наприклад:

    function Button() {
        const theme =
            useContext(ThemeContext);

        const className =
            theme === "dark"
                ? "button-dark"
                : "button-light";

        return (
            <button className={className}>
                Save
            </button>
        );
    }

---

# 7. `defaultValue`

При створенні Context ми можемо задати значення за замовчуванням:

    const ThemeContext =
        createContext<Theme>("light");

Тут:

    "light"

є `defaultValue`.

Якщо компонент використовує:

    useContext(ThemeContext);

але над ним немає Provider цього Context, він отримає:

    "light"

---

## Важливо

`defaultValue` — це не динамічний state.

Наприклад:

    const ThemeContext =
        createContext<Theme>("light");

`"light"` не змінюється автоматично.

Provider може передати інше значення:

    <ThemeContext.Provider value="dark">
        <App />
    </ThemeContext.Provider>

Тоді `useContext()` отримає:

    "dark"

---

## Схема

Без Provider:

    useContext(ThemeContext)
            ↓
       "light"
       defaultValue

З Provider:

    <ThemeContext.Provider value="dark">
        ...
    </ThemeContext.Provider>

            ↓

    useContext(ThemeContext)
            ↓
        "dark"

---

# 8. `useContext` без Provider

Розглянемо:

    const ThemeContext =
        createContext<Theme>("light");

    function Button() {
        const theme =
            useContext(ThemeContext);

        return (
            <button>
                {theme}
            </button>
        );
    }

Якщо:

    <Button />

не знаходиться всередині:

    <ThemeContext.Provider>

то:

    theme === "light"

бо `"light"` — `defaultValue`.

---

## Інший варіант

Context може бути створений так:

    const ThemeContext =
        createContext<Theme | undefined>(
            undefined
        );

Тоді без Provider:

    const theme =
        useContext(ThemeContext);

отримаємо:

    undefined

Саме тому в TypeScript часто використовують:

    createContext<Type | undefined>(
        undefined
    );

якщо Provider є обов'язковим.

---

# 9. `useContext` і найближчий Provider

`useContext()` шукає відповідний Provider **вгору по React tree**.

Наприклад:

    <ThemeContext.Provider value="light">

        <Page>

            <ThemeContext.Provider value="dark">

                <Button />

            </ThemeContext.Provider>

        </Page>

    </ThemeContext.Provider>

Для `Button` найближчим Provider є:

    value="dark"

Тому:

    const theme =
        useContext(ThemeContext);

отримає:

    "dark"

---

# 10. Вкладені Provider

Можна мати декілька Provider одного Context.

Наприклад:

    <ThemeContext.Provider value="light">

        <Header />

        <ThemeContext.Provider value="dark">

            <Dashboard />

        </ThemeContext.Provider>

    </ThemeContext.Provider>

Результат:

    Header
        → "light"

    Dashboard
        → "dark"

---

## Чому?

Тому що Context використовує найближчий Provider.

Схема:

    Provider("light")
    │
    ├── Header
    │      ↓
    │    "light"
    │
    └── Provider("dark")
           │
           └── Dashboard
                  ↓
                "dark"

---

# 11. Context з `useState`

Це один із найважливіших практичних сценаріїв.

Створимо Context:

    type Theme = "light" | "dark";

    type ThemeContextValue = {
        theme: Theme;
        setTheme: (theme: Theme) => void;
    };

    const ThemeContext =
        createContext<
            ThemeContextValue | undefined
        >(undefined);

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

Consumer:

    function ThemeButton() {
        const context =
            useContext(ThemeContext);

        if (!context) {
            throw new Error(
                "ThemeButton must be used inside ThemeProvider"
            );
        }

        const {
            theme,
            setTheme,
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
                Current: {theme}
            </button>
        );
    }

Тут Context передає не тільки дані:

    theme

а й функцію:

    setTheme

Тому компонент може і читати, і змінювати shared state.

---

# 12. Context з об'єктом

У реальних проектах `useContext` часто повертає об'єкт.

Наприклад:

    type User = {
        id: number;
        name: string;
    };

    type UserContextValue = {
        user: User | null;
        isAuthenticated: boolean;
    };

    const UserContext =
        createContext<
            UserContextValue | undefined
        >(undefined);

Provider:

    <UserContext.Provider
        value={{
            user,
            isAuthenticated,
        }}
    >
        <App />
    </UserContext.Provider>

Consumer:

    function Profile() {
        const context =
            useContext(UserContext);

        if (!context) {
            throw new Error(
                "Profile must be used inside UserProvider"
            );
        }

        const {
            user,
            isAuthenticated,
        } = context;

        if (!isAuthenticated) {
            return <p>Please log in.</p>;
        }

        return (
            <p>
                Hello, {user?.name}
            </p>
        );
    }

---

# 13. Context з функціями

Context може передавати функції.

Наприклад:

    type AuthContextValue = {
        user: User | null;
        login: (name: string) => void;
        logout: () => void;
    };

Context:

    const AuthContext =
        createContext<
            AuthContextValue | undefined
        >(undefined);

Provider:

    <AuthContext.Provider
        value={{
            user,
            login,
            logout,
        }}
    >
        {children}
    </AuthContext.Provider>

Consumer:

    function UserMenu() {
        const context =
            useContext(AuthContext);

        if (!context) {
            throw new Error(
                "UserMenu must be used inside AuthProvider"
            );
        }

        const {
            user,
            logout,
        } = context;

        return (
            <div>
                <span>
                    {user?.name}
                </span>

                <button onClick={logout}>
                    Logout
                </button>
            </div>
        );
    }

Це дуже поширений патерн:

    Context value
        =
    data + actions

Наприклад:

    {
        user,
        login,
        logout,
    }

---

# 14. Context для авторизації

Auth Context — один із класичних прикладів Context API.

Наприклад:

    type User = {
        id: number;
        name: string;
    };

    type AuthContextValue = {
        user: User | null;
        login: (name: string) => void;
        logout: () => void;
    };

    const AuthContext =
        createContext<
            AuthContextValue | undefined
        >(undefined);

Provider:

    function AuthProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const [user, setUser] =
            useState<User | null>(null);

        function login(name: string) {
            setUser({
                id: 1,
                name,
            });
        }

        function logout() {
            setUser(null);
        }

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

Consumer:

    function Header() {
        const auth =
            useContext(AuthContext);

        if (!auth) {
            throw new Error(
                "Header must be used inside AuthProvider"
            );
        }

        if (!auth.user) {
            return (
                <button
                    onClick={() =>
                        auth.login("Valeriy")
                    }
                >
                    Login
                </button>
            );
        }

        return (
            <div>
                <span>
                    {auth.user.name}
                </span>

                <button onClick={auth.logout}>
                    Logout
                </button>
            </div>
        );
    }

---

# 15. Context для теми

Один із найпростіших прикладів:

    type Theme = "light" | "dark";

    type ThemeContextValue = {
        theme: Theme;
        setTheme: (theme: Theme) => void;
    };

    const ThemeContext =
        createContext<
            ThemeContextValue | undefined
        >(undefined);

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

Consumer:

    function ThemeButton() {
        const context =
            useContext(ThemeContext);

        if (!context) {
            throw new Error(
                "ThemeButton must be used inside ThemeProvider"
            );
        }

        return (
            <button
                onClick={() =>
                    context.setTheme(
                        context.theme === "light"
                            ? "dark"
                            : "light"
                    )
                }
            >
                Theme: {context.theme}
            </button>
        );
    }

Тепер будь-який компонент усередині `ThemeProvider` може отримати:

    theme

та:

    setTheme

---

# 16. Context для мови

Context зручно використовувати для поточної мови:

    type Language = "uk" | "en";

    type LanguageContextValue = {
        language: Language;
        setLanguage: (
            language: Language
        ) => void;
    };

    const LanguageContext =
        createContext<
            LanguageContextValue | undefined
        >(undefined);

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

Consumer:

    function LanguageSwitcher() {
        const context =
            useContext(LanguageContext);

        if (!context) {
            throw new Error(
                "LanguageSwitcher must be used inside LanguageProvider"
            );
        }

        return (
            <button
                onClick={() =>
                    context.setLanguage(
                        context.language === "uk"
                            ? "en"
                            : "uk"
                    )
                }
            >
                {context.language}
            </button>
        );
    }

---

# 17. TypeScript і `useContext`

У TypeScript `useContext` повертає тип, визначений Context.

Наприклад:

    type Theme = "light" | "dark";

    const ThemeContext =
        createContext<Theme>("light");

Тоді:

    const theme =
        useContext(ThemeContext);

TypeScript знає:

    theme: Theme

Тобто:

    theme === "light"

або:

    theme === "dark"

---

## Context з `undefined`

Якщо:

    const ThemeContext =
        createContext<
            ThemeContextValue | undefined
        >(undefined);

то:

    const context =
        useContext(ThemeContext);

має тип:

    ThemeContextValue | undefined

Тому TypeScript змусить нас перевірити:

    if (!context) {
        throw new Error(
            "Missing ThemeProvider"
        );
    }

Після перевірки TypeScript розуміє:

    context: ThemeContextValue

---

# 18. `undefined` і перевірка Provider

Один із хороших патернів:

    const ThemeContext =
        createContext<
            ThemeContextValue | undefined
        >(undefined);

Потім:

    function ThemeButton() {
        const context =
            useContext(ThemeContext);

        if (!context) {
            throw new Error(
                "ThemeButton must be used inside ThemeProvider"
            );
        }

        return (
            <button>
                {context.theme}
            </button>
        );
    }

Якщо розробник випадково напише:

    <ThemeButton />

замість:

    <ThemeProvider>
        <ThemeButton />
    </ThemeProvider>

він отримає зрозумілу помилку.

---

# 19. Custom Hook поверх `useContext`

У реальному проекті часто не пишуть:

    const context =
        useContext(ThemeContext);

у кожному компоненті.

Замість цього створюють власний Hook:

    export function useTheme() {
        const context =
            useContext(ThemeContext);

        if (!context) {
            throw new Error(
                "useTheme must be used inside ThemeProvider"
            );
        }

        return context;
    }

Тепер компонент виглядає набагато чистіше:

    function ThemeButton() {
        const {
            theme,
            setTheme,
        } = useTheme();

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
                {theme}
            </button>
        );
    }

---

# 20. Чому Custom Hook зручніший

Без Custom Hook:

    function Header() {
        const context =
            useContext(AuthContext);

        if (!context) {
            throw new Error(
                "Header must be used inside AuthProvider"
            );
        }

        const {
            user,
            logout,
        } = context;

        ...
    }

    function Profile() {
        const context =
            useContext(AuthContext);

        if (!context) {
            throw new Error(
                "Profile must be used inside AuthProvider"
            );
        }

        const {
            user,
        } = context;

        ...
    }

Повторюється одна й та сама логіка.

З Custom Hook:

    function Header() {
        const {
            user,
            logout,
        } = useAuth();

        ...
    }

    function Profile() {
        const {
            user,
        } = useAuth();

        ...
    }

Уся перевірка знаходиться в одному місці:

    export function useAuth() {
        const context =
            useContext(AuthContext);

        if (!context) {
            throw new Error(
                "useAuth must be used inside AuthProvider"
            );
        }

        return context;
    }

Це один із найкорисніших патернів Context API.

---

# 21. `useContext` не приймає Context value

Важливо не плутати:

    useContext(ThemeContext)

і:

    useContext("dark")

`useContext` отримує **Context object**.

Context створюється:

    const ThemeContext =
        createContext<Theme>("light");

Потім:

    useContext(ThemeContext);

повертає актуальне значення.

Схема:

    ThemeContext
         │
         ↓
    useContext()
         │
         ↓
    "dark"

---

# 22. `useContext` читає найближчий Provider

Наприклад:

    <ThemeContext.Provider value="light">

        <Page />

        <ThemeContext.Provider value="dark">

            <Dashboard />

        </ThemeContext.Provider>

    </ThemeContext.Provider>

У `Page`:

    const theme =
        useContext(ThemeContext);

отримаємо:

    "light"

У `Dashboard`:

    const theme =
        useContext(ThemeContext);

отримаємо:

    "dark"

Тому важливо запам'ятати:

> `useContext()` шукає відповідний Provider вгору по дереву і використовує найближчий.

---

# 23. Context і ререндери

Якщо значення Context змінюється, компоненти, які читають цей Context через `useContext`, можуть оновитися.

Наприклад:

    const ThemeContext =
        createContext<Theme>("light");

Provider:

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

Consumer:

    function Button() {
        const theme =
            useContext(ThemeContext);

        console.log("Button render");

        return (
            <button>
                {theme}
            </button>
        );
    }

Коли:

    setTheme("dark");

значення Context змінюється:

    "light"
        ↓
    "dark"

Компоненти, які читають цей Context, реагують на зміну.

---

## Важлива ідея

Context — не спосіб "сховати" оновлення.

Якщо компонент використовує:

    useContext(SomeContext)

він залежить від значення цього Context.

Тому Context потрібно проектувати розумно.

Наприклад, замість одного величезного:

    AppContext

може бути краще:

    ThemeContext
    AuthContext
    LanguageContext
    CartContext

Залежності стають точнішими.

---

# 24. Context не замінює props

Не потрібно використовувати Context для абсолютно всіх даних.

Наприклад:

    function UserCard({
        user,
    }: {
        user: User;
    }) {
        ...
    }

Якщо `user` потрібен лише `UserCard`, props часто є кращим рішенням.

Context має сенс, якщо:

- дані потрібні багатьом компонентам;
- компоненти знаходяться глибоко;
- передача через props створює prop drilling;
- значення концептуально спільне.

---

## Просте правило

Якщо дані потрібні:

    Parent
       ↓
    Child

використовуй props.

Якщо:

    App
       ↓
    A
       ↓
    B
       ↓
    C
       ↓
    D
       ↓
    E

і `E` потрібні дані з `App`, а проміжні компоненти ці дані не використовують — Context може бути доречним.

---

# 25. Context не є глобальним state management

Це важлива концепція.

Context API складається з:

    createContext
    Provider
    useContext

Але Context сам по собі не вирішує всі задачі state management.

Наприклад:

    useState
        +
    Context

або:

    useReducer
        +
    Context

можуть створити простий shared state.

Але для дуже складного application state можуть існувати інші підходи.

Наприклад:

    Context
        ↓
    dependency propagation

а:

    useState
    useReducer
    external store
    state management library
        ↓
    state management

Тому:

> Context — це механізм передачі залежностей/значень по React tree, а не універсальна заміна всім state management рішенням.

---

# 26. Типові помилки

## Помилка №1 — забути імпортувати `useContext`

Потрібно:

    import { useContext } from "react";

---

## Помилка №2 — передати неправильний аргумент

Неправильно:

    useContext("dark");

Правильно:

    useContext(ThemeContext);

---

## Помилка №3 — використати Context без Provider

Якщо Context має:

    defaultValue

то компонент отримає default value.

Якщо:

    defaultValue === undefined

то можна отримати:

    undefined

і помилку під час виконання.

---

## Помилка №4 — неправильно обробити `undefined`

Якщо:

    const Context =
        createContext<Value | undefined>(
            undefined
        );

то не можна без перевірки припускати, що значення завжди існує.

Наприклад:

    const value =
        useContext(Context);

    console.log(value.name);

може бути проблемою.

Краще:

    if (!value) {
        throw new Error(
            "Missing Provider"
        );
    }

    console.log(value.name);

---

## Помилка №5 — створити Context не того типу

Наприклад:

    type Theme = "light" | "dark";

    const ThemeContext =
        createContext<Theme>("light");

Не можна передавати:

    <ThemeContext.Provider value="blue">

TypeScript повідомить про помилку.

---

## Помилка №6 — плутати Context і його значення

Не:

    useContext(theme);

а:

    useContext(ThemeContext);

---

## Помилка №7 — думати, що `useContext` змінює Context

`useContext()` лише читає значення.

Наприклад:

    const theme =
        useContext(ThemeContext);

Це не змінює:

    theme

Щоб змінювати стан, Provider повинен передати функцію:

    setTheme

або:

    dispatch

Наприклад:

    const {
        theme,
        setTheme,
    } = useTheme();

---

## Помилка №8 — використовувати `any`

Не потрібно:

    const context =
        useContext<any>(Context);

Тип Context повинен бути визначений на рівні самого Context.

---

## Помилка №9 — створювати Context для кожної дрібниці

Не кожне значення потребує Context.

Наприклад:

    <Button size="large" />

не потребує Context тільки тому, що Context існує.

Context потрібен тоді, коли він реально вирішує проблему передачі залежності.

---

# 27. Практичний повний приклад

Розглянемо повний приклад Theme Context.

## Крок 1. Типи

    export type Theme = "light" | "dark";

    export type ThemeContextValue = {
        theme: Theme;
        setTheme: (theme: Theme) => void;
    };

---

## Крок 2. Context

    import { createContext } from "react";

    export const ThemeContext =
        createContext<
            ThemeContextValue | undefined
        >(undefined);

---

## Крок 3. Provider

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

## Крок 4. Custom Hook

    import { useContext } from "react";

    import { ThemeContext } from "./ThemeContext";

    export function useTheme() {
        const context =
            useContext(ThemeContext);

        if (!context) {
            throw new Error(
                "useTheme must be used inside ThemeProvider"
            );
        }

        return context;
    }

---

## Крок 5. Consumer

    import { useTheme } from "./useTheme";

    export function ThemeButton() {
        const {
            theme,
            setTheme,
        } = useTheme();

        function toggleTheme() {
            setTheme(
                theme === "light"
                    ? "dark"
                    : "light"
            );
        }

        return (
            <button onClick={toggleTheme}>
                Theme: {theme}
            </button>
        );
    }

---

## Крок 6. App

    import { ThemeProvider } from "./ThemeProvider";
    import { ThemeButton } from "./ThemeButton";

    export function App() {
        return (
            <ThemeProvider>
                <h1>My application</h1>

                <ThemeButton />
            </ThemeProvider>
        );
    }

---

## Повна схема

    App
     │
     ↓
    ThemeProvider
     │
     ├── useState(theme)
     │
     ├── ThemeContext.Provider
     │       │
     │       ↓
     │     value={{
     │       theme,
     │       setTheme
     │     }}
     │
     └── ThemeButton
              │
              ↓
           useTheme()
              │
              ↓
          useContext()
              │
              ↓
          ThemeContext
              │
              ↓
          {
            theme,
            setTheme
          }

Це типовий і дуже корисний Context pattern.

---

# 28. Структура файлів

Для реального проекту можна організувати Context приблизно так:

    src/
    ├── context/
    │   └── theme/
    │       ├── ThemeContext.ts
    │       ├── ThemeProvider.tsx
    │       └── useTheme.ts
    │
    └── app/
        └── App.tsx

---

## `ThemeContext.ts`

Відповідає за:

- типи;
- Context object.

    import { createContext } from "react";

    export type Theme =
        "light" | "dark";

    export type ThemeContextValue = {
        theme: Theme;
        setTheme: (theme: Theme) => void;
    };

    export const ThemeContext =
        createContext<
            ThemeContextValue | undefined
        >(undefined);

---

## `ThemeProvider.tsx`

Відповідає за:

- state;
- state update;
- Provider;
- `value`.

    import {
        useState,
        type ReactNode,
    } from "react";

    import {
        ThemeContext,
        type Theme,
    } from "./ThemeContext";

    export function ThemeProvider({
        children,
    }: {
        children: ReactNode;
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

## `useTheme.ts`

Відповідає за:

- читання Context;
- перевірку Provider;
- зручний API для компонентів.

    import { useContext } from "react";

    import { ThemeContext } from "./ThemeContext";

    export function useTheme() {
        const context =
            useContext(ThemeContext);

        if (!context) {
            throw new Error(
                "useTheme must be used inside ThemeProvider"
            );
        }

        return context;
    }

---

# 29. Питання для співбесіди

## Що робить `useContext`?

`useContext` дозволяє функціональному компоненту прочитати значення Context.

    const value =
        useContext(SomeContext);

---

## Що передається в `useContext`?

Context object:

    useContext(ThemeContext);

а не саме значення.

---

## Звідки `useContext` бере значення?

Він шукає відповідний Provider вгору по React tree.

Якщо Provider знайдений — повертається його `value`.

Якщо Provider не знайдений — використовується `defaultValue`.

---

## Що буде, якщо є кілька Provider?

Використовується найближчий Provider.

---

## Чи змінює `useContext` Context?

Ні.

`useContext` читає Context.

Для зміни state Provider зазвичай передає:

    setState

або:

    dispatch

---

## Чи можна передати через Context функцію?

Так.

Наприклад:

    value={{
        user,
        login,
        logout,
    }}

---

## Чи можна використовувати `useContext` поза компонентом?

Ні.

Як і інші React Hooks, `useContext` повинен використовуватися відповідно до Rules of Hooks.

Наприклад, правильно:

    function Header() {
        const theme =
            useContext(ThemeContext);

        return <header>{theme}</header>;
    }

Не потрібно викликати Hook у довільному звичайному коді:

    const theme =
        useContext(ThemeContext);

поза React-компонентом або custom Hook.

---

## Чому часто використовують Custom Hook?

Щоб:

- приховати `useContext`;
- централізувати перевірку Provider;
- отримати чистіший API;
- не дублювати код.

Наприклад:

    const {
        theme,
        setTheme,
    } = useTheme();

замість:

    const context =
        useContext(ThemeContext);

    if (!context) {
        throw new Error(...);
    }

---

## Чим `useContext` відрізняється від props?

Props передаються явно через компонент.

Context дозволяє компоненту прочитати значення з Provider без передачі цього значення через кожен проміжний компонент.

---

## Чи робить `useContext` state глобальним?

Ні.

Він лише читає значення Context, яке доступне в конкретній частині React tree.

---

# 30. Рівні знань

## 🟢 Core

Потрібно знати:

- що таке `useContext`;
- для чого він потрібен;
- як його імпортувати;
- як передати Context;
- що він повертає;
- що таке `defaultValue`;
- що таке Provider;
- що `useContext` використовує найближчий Provider.

Базовий приклад:

    const theme =
        useContext(ThemeContext);

---

## 🟡 Junior

Потрібно вміти:

- використовувати Context з TypeScript;
- працювати з `undefined`;
- передавати об'єкти;
- передавати функції;
- використовувати Context разом із `useState`;
- створювати Auth Context;
- створювати Theme Context;
- створювати Language Context;
- створювати Custom Hook поверх `useContext`.

Типовий код:

    const {
        theme,
        setTheme,
    } = useTheme();

---

## 🟠 Middle

Потрібно розуміти:

- Context propagation;
- nearest Provider;
- вкладені Provider;
- залежності компонентів від Context;
- вплив зміни Context value;
- Context + `useReducer`;
- Context + custom hooks;
- розділення Context за відповідальністю;
- коли Context краще за props;
- коли Context не потрібен;
- проблеми надто великого Context.

---

## 🔴 Senior

Потрібно розуміти:

- Context як dependency propagation mechanism;
- identity Context object;
- identity `value`;
- вплив reference changes;
- архітектуру Provider tree;
- розділення Context за доменами;
- Context vs external stores;
- Context vs state management libraries;
- Context як dependency injection;
- клієнтські та серверні межі в React/Next.js;
- React 19 Context Provider syntax;
- як уникати надмірної зв'язаності компонентів.

---

# 31. Міні-шпаргалка

## Імпорт

    import { useContext } from "react";

---

## Створити Context

    const ThemeContext =
        createContext<Theme>("light");

---

## Provider

    <ThemeContext.Provider value="dark">
        <App />
    </ThemeContext.Provider>

---

## Прочитати Context

    const theme =
        useContext(ThemeContext);

---

## Отримати об'єкт

    const {
        user,
        logout,
    } = useContext(AuthContext);

---

## Типізований Context

    type ContextValue = {
        value: string;
        setValue: (value: string) => void;
    };

    const Context =
        createContext<
            ContextValue | undefined
        >(undefined);

---

## Перевірити Provider

    const context =
        useContext(Context);

    if (!context) {
        throw new Error(
            "Missing Provider"
        );
    }

---

## Custom Hook

    function useTheme() {
        const context =
            useContext(ThemeContext);

        if (!context) {
            throw new Error(
                "useTheme must be used inside ThemeProvider"
            );
        }

        return context;
    }

---

## Використання

    const {
        theme,
        setTheme,
    } = useTheme();

---

## Найважливіша схема

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

---

# 32. Головне

> **`useContext` — це Hook, який дозволяє компоненту прочитати значення Context, передане найближчим відповідним Provider.**

Запам'ятай:

1. `useContext` імпортується з React:

       import { useContext } from "react";

2. Він приймає **Context object**:

       useContext(ThemeContext)

3. Він не приймає саме значення:

       useContext("dark") // ❌

4. Context створюється через:

       createContext()

5. Provider передає значення через:

       value={...}

6. `useContext` читає це значення.

7. Якщо Provider відсутній, використовується `defaultValue`.

8. Якщо є декілька Provider, використовується найближчий.

9. `useContext` не змінює state сам по собі.

10. Для зміни state Context часто передає:

        setState

    або:

        dispatch

11. Context може передавати не тільки дані, а й функції:

        {
            user,
            login,
            logout
        }

12. Для TypeScript часто зручно використовувати:

        createContext<Type | undefined>(
            undefined
        );

13. Якщо Provider обов'язковий, можна перевірити:

        if (!context) {
            throw new Error(
                "Missing Provider"
            );
        }

14. Для реального проекту зручно створювати Custom Hook:

        useTheme()
        useAuth()
        useLanguage()
        useCart()

15. Custom Hook приховує деталі Context:

        const {
            theme,
            setTheme,
        } = useTheme();

16. `useContext` не робить дані глобальними.

17. Context поширює значення лише в межах React tree, де знаходиться Provider.

18. Context не повинен автоматично замінювати props.

19. Якщо дані потрібні лише безпосередньому дочірньому компоненту, props часто простіші.

20. Якщо значення потрібне багатьом глибоко вкладеним компонентам, Context може бути хорошим рішенням.

---

## Ключова ментальна модель

    createContext()
        │
        │ створює Context object
        ↓
    Context
        │
        │ Provider передає value
        ↓
    Provider
        │
        ↓
    value
        │
        ↓
    React tree
        │
        ├── Component A
        │
        ├── Component B
        │
        └── Component C
                │
                ↓
            useContext()
                │
                ↓
              value

Тобто:

    createContext()
        → створити Context

    Provider
        → передати конкретне value

    useContext()
        → прочитати value

    setState / dispatch
        → змінити state, якщо вони передані через Context

    Custom Hook
        → зробити роботу з Context зручною та типобезпечною

### Формула, яку варто запам'ятати

    Context
      +
    Provider
      +
    useContext
      =
    передача спільного значення
    через React tree

А типовий production-патерн виглядає так:

    Context
       ↓
    Provider
       ↓
    useState / useReducer
       ↓
    value
       ↓
    useContext
       ↓
    custom hook
       ↓
    Components

Це базова практична схема використання **React Context API**.