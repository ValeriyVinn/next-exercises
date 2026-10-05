# 05. Context Patterns

## Зміст

- [1. Що таке Context Patterns](#1-що-таке-context-patterns)
- [2. Базова схема Context](#2-базова-схема-context)
- [3. Context як dependency injection](#3-context-як-dependency-injection)
- [4. Context + useState](#4-context--usestate)
- [5. Context + useReducer](#5-context--usereducer)
- [6. Context + Custom Hook](#6-context--custom-hook)
- [7. Context + Provider Component](#7-context--provider-component)
- [8. Розділення Context за відповідальністю](#8-розділення-context-за-відповідальністю)
- [9. Один Context для даних і дій](#9-один-context-для-даних-і-дій)
- [10. Розділення State Context і Dispatch Context](#10-розділення-state-context-і-dispatch-context)
- [11. Compound Components + Context](#11-compound-components--context)
- [12. Context для Theme](#12-context-для-theme)
- [13. Context для Authentication](#13-context-для-authentication)
- [14. Context для Language](#14-context-для-language)
- [15. Context для Form](#15-context-для-form)
- [16. Context для Modal](#16-context-для-modal)
- [17. Context для UI State](#17-context-для-ui-state)
- [18. Provider Composition](#18-provider-composition)
- [19. AppProviders Pattern](#19-appproviders-pattern)
- [20. Контроль області дії Provider](#20-контроль-області-дії-provider)
- [21. Вкладені Provider одного Context](#21-вкладені-provider-одного-context)
- [22. Context і TypeScript](#22-context-і-typescript)
- [23. Context з `undefined`](#23-context-з-undefined)
- [24. Context Factory Pattern](#24-context-factory-pattern)
- [25. Стабільність `value`](#25-стабільність-value)
- [26. `useMemo` для Context value](#26-usememo-для-context-value)
- [27. Розділення Context для оптимізації](#27-розділення-context-для-оптимізації)
- [28. Коли Context стає проблемою](#28-коли-context-стає-проблемою)
- [29. Context vs Props](#29-context-vs-props)
- [30. Context vs useState](#30-context-vs-usestate)
- [31. Context vs useReducer](#31-context-vs-usereducer)
- [32. Context vs External State Management](#32-context-vs-external-state-management)
- [33. Типові помилки](#33-типові-помилки)
- [34. Практичний production-style приклад](#34-практичний-production-style-приклад)
- [35. Структура файлів](#35-структура-файлів)
- [36. Питання для співбесіди](#36-питання-для-співбесіди)
- [37. Рівні знань](#37-рівні-знань)
- [38. Міні-шпаргалка](#38-міні-шпаргалка)
- [39. Головне](#39-головне)

---

# 1. Що таке Context Patterns

**Context Patterns** — це типові способи організації React Context у реальних компонентах і застосунках.

Сам Context API дуже простий:

    createContext()
        ↓
      Provider
        ↓
      value
        ↓
    useContext()

Але в реальних проектах виникають додаткові питання:

- де створювати Context;
- де зберігати state;
- де розміщувати Provider;
- як типізувати Context;
- як перевіряти відсутність Provider;
- як передавати actions;
- коли використовувати `useState`;
- коли використовувати `useReducer`;
- коли розділяти Context;
- як уникати зайвих ререндерів;
- як не перетворити Context на "глобальний склад усього".

Саме для цього існують **Context Patterns**.

---

# 2. Базова схема Context

Найпростіша схема:

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

Наприклад:

    type Theme = "light" | "dark";

    const ThemeContext =
        createContext<Theme>("light");

Provider:

    <ThemeContext.Provider value="dark">
        <App />
    </ThemeContext.Provider>

Consumer:

    function Button() {
        const theme =
            useContext(ThemeContext);

        return (
            <button>
                {theme}
            </button>
        );
    }

---

# 3. Context як dependency injection

Один із корисних способів мислення про Context:

> Context дозволяє передати залежність компонентам без явної передачі її через props на кожному рівні.

Наприклад, компоненту потрібна тема:

    Button
      ↓
    потребує Theme

Без Context:

    App
      ↓ theme
    Page
      ↓ theme
    Layout
      ↓ theme
    Header
      ↓ theme
    Button

З Context:

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
      useTheme()

Тут `Button` безпосередньо отримує залежність:

    Theme

через:

    useTheme()

---

## Context не робить залежність невидимою

Це важливий архітектурний момент.

При props:

    function Button({
        theme,
    }: {
        theme: Theme;
    }) {
        ...
    }

залежність очевидна:

    Button → theme

При Context:

    function Button() {
        const { theme } =
            useTheme();

        ...
    }

залежність все одно існує.

Просто вона визначається через Context.

Тому Context краще розглядати як:

    dependency propagation

а не як:

    magic global variable

---

# 4. Context + `useState`

Це найпростіший і найпоширеніший Context Pattern.

Наприклад, Theme Context.

## Context

    type Theme = "light" | "dark";

    type ThemeContextValue = {
        theme: Theme;
        setTheme: (theme: Theme) => void;
    };

    const ThemeContext =
        createContext<
            ThemeContextValue | undefined
        >(undefined);

---

## Provider

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

## Consumer

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
                Theme: {theme}
            </button>
        );
    }

Схема:

    useState
       ↓
    ThemeProvider
       ↓
    ThemeContext
       ↓
    useTheme()
       ↓
    ThemeButton

Цей Pattern підходить для невеликого та середнього shared state.

---

# 5. Context + `useReducer`

Якщо state має складні переходи, можна використовувати `useReducer`.

Наприклад:

    type State = {
        count: number;
    };

    type Action =
        | { type: "increment" }
        | { type: "decrement" }
        | { type: "reset" };

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

            case "reset":
                return {
                    count: 0,
                };

            default:
                return state;
        }
    }

Context:

    type CounterContextValue = {
        state: State;
        dispatch: React.Dispatch<Action>;
    };

    const CounterContext =
        createContext<
            CounterContextValue | undefined
        >(undefined);

Provider:

    function CounterProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const [state, dispatch] =
            useReducer(
                reducer,
                { count: 0 }
            );

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

Consumer:

    function Counter() {
        const context =
            useContext(CounterContext);

        if (!context) {
            throw new Error(
                "Counter must be used inside CounterProvider"
            );
        }

        const {
            state,
            dispatch,
        } = context;

        return (
            <div>
                <p>{state.count}</p>

                <button
                    onClick={() =>
                        dispatch({
                            type: "increment",
                        })
                    }
                >
                    +
                </button>

                <button
                    onClick={() =>
                        dispatch({
                            type: "decrement",
                        })
                    }
                >
                    -
                </button>

                <button
                    onClick={() =>
                        dispatch({
                            type: "reset",
                        })
                    }
                >
                    Reset
                </button>
            </div>
        );
    }

---

## Коли Context + `useReducer` корисний

Особливо добре підходить, коли:

- state має багато полів;
- є багато типів дій;
- переходи state повинні бути централізовані;
- потрібна передбачувана логіка;
- state використовується багатьма компонентами.

Схема:

    useReducer
        ↓
    state + dispatch
        ↓
    Provider
        ↓
    Context
        ↓
    Components

---

# 6. Context + Custom Hook

Один із найкращих базових патернів:

    Context
       +
    Provider
       +
    Custom Hook

Наприклад:

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
        ...
    }

Custom Hook:

    function useAuth() {
        const context =
            useContext(AuthContext);

        if (!context) {
            throw new Error(
                "useAuth must be used inside AuthProvider"
            );
        }

        return context;
    }

Компонент:

    function Profile() {
        const {
            user,
            logout,
        } = useAuth();

        return (
            <div>
                <p>{user?.name}</p>

                <button onClick={logout}>
                    Logout
                </button>
            </div>
        );
    }

Тепер компоненти не знають про:

    AuthContext

вони працюють із:

    useAuth()

Це створює чистіший API.

---

# 7. Context + Provider Component

Не варто зберігати всю логіку Context безпосередньо в `App`.

Погано для великого проекту:

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
                ...
            </ThemeContext.Provider>
        );
    }

Краще:

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

Тоді:

    function App() {
        return (
            <ThemeProvider>
                <Main />
            </ThemeProvider>
        );
    }

---

## Відповідальність `ThemeProvider`

Provider може відповідати за:

- state;
- reducer;
- actions;
- side effects;
- формування Context value;
- передачу value через Provider.

Компоненти-споживачі відповідають за UI.

---

# 8. Розділення Context за відповідальністю

Не варто створювати один величезний Context:

    AppContext

який містить:

    user
    theme
    language
    cart
    notifications
    settings
    modal
    search
    permissions

Це створює сильну зв'язаність.

Краще:

    AuthContext
    ThemeContext
    LanguageContext
    CartContext
    NotificationContext

---

## Чому це краще

Кожен Context має чітку відповідальність.

Наприклад:

    AuthContext
        ↓
    user
    login
    logout

    ThemeContext
        ↓
    theme
    setTheme

    LanguageContext
        ↓
    language
    setLanguage

    CartContext
        ↓
    items
    addItem
    removeItem

Це називається **separation of concerns**.

---

# 9. Один Context для даних і дій

Найпростіший патерн:

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

    const {
        user,
        login,
        logout,
    } = useAuth();

Це дуже зручний і зрозумілий патерн для невеликих Context.

---

# 10. Розділення State Context і Dispatch Context

Для складніших Context можна розділити:

- state;
- dispatch.

Наприклад:

    const CounterStateContext =
        createContext<State | undefined>(
            undefined
        );

    const CounterDispatchContext =
        createContext<
            React.Dispatch<Action> | undefined
        >(undefined);

Provider:

    function CounterProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const [state, dispatch] =
            useReducer(
                reducer,
                { count: 0 }
            );

        return (
            <CounterStateContext.Provider
                value={state}
            >
                <CounterDispatchContext.Provider
                    value={dispatch}
                >
                    {children}
                </CounterDispatchContext.Provider>
            </CounterStateContext.Provider>
        );
    }

Hooks:

    function useCounterState() {
        const state =
            useContext(
                CounterStateContext
            );

        if (!state) {
            throw new Error(
                "useCounterState must be used inside CounterProvider"
            );
        }

        return state;
    }

    function useCounterDispatch() {
        const dispatch =
            useContext(
                CounterDispatchContext
            );

        if (!dispatch) {
            throw new Error(
                "useCounterDispatch must be used inside CounterProvider"
            );
        }

        return dispatch;
    }

Тепер компонент, якому потрібен лише `dispatch`, не повинен читати весь state Context.

---

## Коли це корисно

Такий Pattern може бути корисним, коли:

- state великий;
- багато компонентів використовують лише actions;
- потрібно чіткіше розділити dependencies;
- важливіше контролювати оновлення.

Але не потрібно використовувати цей Pattern автоматично.

Для простого Context достатньо:

    {
        state,
        dispatch
    }

---

# 11. Compound Components + Context

Context дуже добре працює разом із **Compound Components Pattern**.

Наприклад:

    <Tabs>
        <Tabs.List>
            ...
        </Tabs.List>

        <Tabs.Panel>
            ...
        </Tabs.Panel>
    </Tabs>

Внутрішні компоненти:

    Tabs
    Tabs.List
    Tabs.Tab
    Tabs.Panel

можуть використовувати спільний Context.

---

## Context

    type TabsContextValue = {
        activeTab: string;
        setActiveTab: (
            id: string
        ) => void;
    };

    const TabsContext =
        createContext<
            TabsContextValue | undefined
        >(undefined);

---

## Provider всередині `Tabs`

    function Tabs({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const [
            activeTab,
            setActiveTab,
        ] = useState("first");

        return (
            <TabsContext.Provider
                value={{
                    activeTab,
                    setActiveTab,
                }}
            >
                {children}
            </TabsContext.Provider>
        );
    }

---

## `Tabs.Tab`

    function Tab({
        id,
        children,
    }: {
        id: string;
        children: React.ReactNode;
    }) {
        const context =
            useContext(TabsContext);

        if (!context) {
            throw new Error(
                "Tab must be used inside Tabs"
            );
        }

        return (
            <button
                onClick={() =>
                    context.setActiveTab(id)
                }
            >
                {children}
            </button>
        );
    }

Тепер API компонента виглядає природно:

    <Tabs>
        <Tabs.List>
            <Tabs.Tab id="first">
                First
            </Tabs.Tab>

            <Tabs.Tab id="second">
                Second
            </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel id="first">
            First content
        </Tabs.Panel>

        <Tabs.Panel id="second">
            Second content
        </Tabs.Panel>
    </Tabs>

Context тут дозволяє внутрішнім компонентам `Tabs` обмінюватися станом без prop drilling.

---

# 12. Context для Theme

Theme Context — класичний приклад.

Типи:

    type Theme = "light" | "dark";

    type ThemeContextValue = {
        theme: Theme;
        setTheme: (theme: Theme) => void;
    };

Context:

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

Hook:

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

Компонент:

    function Header() {
        const { theme } = useTheme();

        return (
            <header data-theme={theme}>
                Header
            </header>
        );
    }

---

# 13. Context для Authentication

Auth Context може містити:

    user
    isAuthenticated
    login
    logout

Тип:

    type AuthContextValue = {
        user: User | null;
        isAuthenticated: boolean;
        login: (name: string) => void;
        logout: () => void;
    };

Context:

    const AuthContext =
        createContext<
            AuthContextValue | undefined
        >(undefined);

Hook:

    function useAuth() {
        const context =
            useContext(AuthContext);

        if (!context) {
            throw new Error(
                "useAuth must be used inside AuthProvider"
            );
        }

        return context;
    }

Використання:

    function Header() {
        const {
            user,
            isAuthenticated,
            logout,
        } = useAuth();

        if (!isAuthenticated) {
            return <LoginButton />;
        }

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

---

# 14. Context для Language

Можна створити Language Context:

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

Hook:

    function useLanguage() {
        const context =
            useContext(LanguageContext);

        if (!context) {
            throw new Error(
                "useLanguage must be used inside LanguageProvider"
            );
        }

        return context;
    }

Використання:

    function LanguageSwitcher() {
        const {
            language,
            setLanguage,
        } = useLanguage();

        return (
            <button
                onClick={() =>
                    setLanguage(
                        language === "uk"
                            ? "en"
                            : "uk"
                    )
                }
            >
                {language}
            </button>
        );
    }

---

# 15. Context для Form

Context може бути дуже корисним для складних compound forms.

Наприклад:

    <Form>
        <Form.Field />
        <Form.Field />
        <Form.Submit />
    </Form>

Form може передавати через Context:

    values
    errors
    touched
    setFieldValue
    submit

Тип:

    type FormContextValue = {
        values: Record<string, string>;
        errors: Record<string, string>;
        setFieldValue: (
            name: string,
            value: string
        ) => void;
        submit: () => void;
    };

Тоді:

    Form.Field

може отримувати доступ до form state без:

    <Form.Field
        values={values}
        errors={errors}
        setFieldValue={setFieldValue}
    />

на кожному рівні.

---

# 16. Context для Modal

Context можна використати для централізованого UI state.

Наприклад:

    type ModalContextValue = {
        isOpen: boolean;
        open: () => void;
        close: () => void;
    };

Context:

    const ModalContext =
        createContext<
            ModalContextValue | undefined
        >(undefined);

Provider:

    function ModalProvider({
        children,
    }: {
        children: React.ReactNode;
    }) {
        const [isOpen, setIsOpen] =
            useState(false);

        function open() {
            setIsOpen(true);
        }

        function close() {
            setIsOpen(false);
        }

        return (
            <ModalContext.Provider
                value={{
                    isOpen,
                    open,
                    close,
                }}
            >
                {children}
            </ModalContext.Provider>
        );
    }

Компонент:

    function DeleteButton() {
        const { open } =
            useModal();

        return (
            <button onClick={open}>
                Delete
            </button>
        );
    }

Modal:

    function DeleteModal() {
        const {
            isOpen,
            close,
        } = useModal();

        if (!isOpen) {
            return null;
        }

        return (
            <div>
                <p>
                    Are you sure?
                </p>

                <button onClick={close}>
                    Cancel
                </button>
            </div>
        );
    }

---

# 17. Context для UI State

Context добре підходить для state, який логічно належить певній області UI.

Приклади:

    Theme
    Language
    Sidebar
    Modal
    Tabs
    Accordion
    Tooltip
    Form
    Authentication

Але не потрібно робити Context для кожного:

    isHovered
    inputValue
    buttonClicked
    localCounter

Такі дані часто краще залишити локальними.

---

# 18. Provider Composition

У реальному застосунку може бути декілька Provider.

Наприклад:

    <AuthProvider>
        <ThemeProvider>
            <LanguageProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </LanguageProvider>
        </ThemeProvider>
    </AuthProvider>

Це працює, але при великій кількості Provider JSX може стати важким для читання.

---

# 19. AppProviders Pattern

Один із способів вирішення — створити один компонент:

    function AppProviders({
        children,
    }: {
        children: React.ReactNode;
    }) {
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

Тоді:

    function App() {
        return (
            <AppProviders>
                <Main />
            </AppProviders>
        );
    }

---

## Переваги

`App` не знає деталей структури Provider.

Було:

    App
      ├── AuthProvider
      ├── ThemeProvider
      ├── LanguageProvider
      └── CartProvider

Стало:

    App
      ↓
    AppProviders
      ↓
    AuthProvider
      ↓
    ThemeProvider
      ↓
    LanguageProvider
      ↓
    CartProvider
      ↓
    Main

---

## Але не потрібно створювати `AppProviders` занадто рано

Для маленького проекту:

    <ThemeProvider>
        <App />
    </ThemeProvider>

цілком достатньо.

`AppProviders` має сенс, коли Provider стає багато.

---

# 20. Контроль області дії Provider

Provider краще розміщувати там, де він реально потрібен.

Наприклад:

    <App>
        <Header />

        <AdminProvider>
            <AdminDashboard />
        </AdminProvider>

        <Footer />
    </App>

Тут `AdminProvider` не обгортає весь застосунок.

Це добре, якщо admin state потрібен тільки:

    AdminDashboard

---

## Правило

Чим ширше Provider розміщений у дереві, тим більше компонентів можуть залежати від нього.

Тому варто запитати:

> Яка мінімальна частина дерева повинна мати доступ до цього Context?

---

# 21. Вкладені Provider одного Context

Вкладені Provider дозволяють створити різні області одного Context.

Наприклад:

    <ThemeContext.Provider value="light">

        <MainPage />

        <ThemeContext.Provider value="dark">
            <CodeEditor />
        </ThemeContext.Provider>

    </ThemeContext.Provider>

Тут:

    MainPage
        → light

    CodeEditor
        → dark

Це може бути корисно, коли окрема частина UI повинна мати власну конфігурацію.

---

# 22. Context і TypeScript

Типи Context краще визначати явно.

Наприклад:

    type Theme = "light" | "dark";

    type ThemeContextValue = {
        theme: Theme;
        setTheme: (theme: Theme) => void;
    };

    const ThemeContext =
        createContext<
            ThemeContextValue | undefined
        >(undefined);

Не потрібно:

    const ThemeContext =
        createContext<any>(null);

---

## Чому важливо типізувати `value`

TypeScript контролює Provider:

    <ThemeContext.Provider
        value={{
            theme,
            setTheme,
        }}
    >
        ...
    </ThemeContext.Provider>

і consumer:

    const {
        theme,
        setTheme,
    } = useTheme();

Тому помилки типів виявляються раніше.

---

# 23. Context з `undefined`

Поширений production pattern:

    const AuthContext =
        createContext<
            AuthContextValue | undefined
        >(undefined);

Причина проста:

    undefined

може означати:

> Provider не був встановлений.

Custom Hook:

    function useAuth() {
        const context =
            useContext(AuthContext);

        if (!context) {
            throw new Error(
                "useAuth must be used inside AuthProvider"
            );
        }

        return context;
    }

Це набагато безпечніше, ніж мовчки використовувати фіктивне значення.

---

# 24. Context Factory Pattern

Якщо в проекті багато Context, можна винести повторювану логіку створення Context + Hook.

Наприклад, концептуально:

    function createSafeContext<T>(
        name: string
    ) {
        const Context =
            createContext<T | undefined>(
                undefined
            );

        function useSafeContext() {
            const value =
                useContext(Context);

            if (value === undefined) {
                throw new Error(
                    `${name} must be used inside its Provider`
                );
            }

            return value;
        }

        return [
            Context,
            useSafeContext,
        ] as const;
    }

Тоді можна створити:

    const [
        ThemeContext,
        useTheme,
    ] = createSafeContext<ThemeContextValue>(
        "useTheme"
    );

Але цей Pattern вже більш advanced.

Для невеликого проекту простіше:

    createContext()
    +
    useContext()
    +
    custom hook

---

# 25. Стабільність `value`

Розглянемо:

    <ThemeContext.Provider
        value={{
            theme,
            setTheme,
        }}
    >
        {children}
    </ThemeContext.Provider>

Об'єкт:

    {
        theme,
        setTheme
    }

створюється під час render.

Для багатьох випадків це нормально.

Але важливо розуміти, що Context value має reference identity.

Наприклад:

    const valueA = {
        theme: "dark",
    };

    const valueB = {
        theme: "dark",
    };

`valueA` і `valueB` мають однаковий вміст, але це різні об'єкти.

Тобто:

    valueA === valueB

дасть:

    false

Це важливо для розуміння Context updates.

---

# 26. `useMemo` для Context value

У деяких випадках можна стабілізувати object value:

    const value = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme]
    );

Потім:

    <ThemeContext.Provider value={value}>
        {children}
    </ThemeContext.Provider>

Але:

> `useMemo` не потрібно додавати до кожного Context автоматично.

Спочатку потрібно мати реальну причину для оптимізації.

---

## Простий варіант

    <ThemeContext.Provider
        value={{
            theme,
            setTheme,
        }}
    >
        {children}
    </ThemeContext.Provider>

Для багатьох застосунків цього достатньо.

---

## Оптимізований варіант

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

Це вже optimization pattern.

---

# 27. Розділення Context для оптимізації

Уявімо один Context:

    type AppContextValue = {
        theme: Theme;
        language: Language;
        user: User | null;
        cart: CartItem[];
    };

    const AppContext =
        createContext<
            AppContextValue | undefined
        >(undefined);

Тепер компоненти, яким потрібен лише:

    theme

залежатимуть від великого Context.

Краще:

    ThemeContext
    LanguageContext
    AuthContext
    CartContext

Тоді dependencies стають більш локальними.

---

## Ще більш спеціалізований варіант

Наприклад:

    ThemeStateContext
    ThemeActionsContext

або:

    CartStateContext
    CartActionsContext

Це вже advanced optimization/architecture pattern.

---

# 28. Коли Context стає проблемою

Context починає створювати проблеми, коли його використовують як універсальне сховище:

    AppContext

    {
        user,
        theme,
        language,
        cart,
        notifications,
        settings,
        search,
        filters,
        modal,
        dashboard,
        ...
    }

Проблеми:

- складний API;
- багато залежностей;
- складніше тестувати;
- складніше підтримувати;
- важче зрозуміти, що використовує компонент;
- більше непотрібних оновлень;
- Provider стає занадто великим;
- логіка різних domain змішується.

---

## Кращий підхід

Розділити:

    AuthContext
    ThemeContext
    CartContext
    LanguageContext

і створювати Context лише там, де він реально потрібен.

---

# 29. Context vs Props

## Props

    function UserCard({
        user,
    }: {
        user: User;
    }) {
        ...
    }

Переваги:

- явна залежність;
- простий API;
- легко тестувати;
- легко зрозуміти джерело даних.

---

## Context

    function UserCard() {
        const { user } =
            useAuth();

        ...
    }

Переваги:

- немає prop drilling;
- зручно для глибокого дерева;
- зручно для shared dependencies.

---

## Правило

Не використовуй Context лише тому, що він існує.

Якщо:

    Parent
      ↓
    Child

то props часто найкращі.

Якщо:

    App
      ↓
    Layout
      ↓
    Section
      ↓
    Card
      ↓
    Button

і всі проміжні компоненти лише передають значення, Context може бути кращим.

---

# 30. Context vs `useState`

`useState`:

    const [
        theme,
        setTheme
    ] = useState("light");

зберігає state.

Context:

    <ThemeContext.Provider
        value={{
            theme,
            setTheme,
        }}
    >

поширює цей state.

Тому часто вони працюють разом:

    useState
       +
    Context
       =
    shared state для частини React tree

---

# 31. Context vs `useReducer`

`useReducer` добре підходить для складної логіки state.

Context добре підходить для поширення state.

Тому:

    useReducer
        ↓
    state + dispatch
        ↓
    Context Provider
        ↓
    useContext

є дуже поширеним Pattern.

Наприклад:

    CartProvider
        ↓
    useReducer(cartReducer)
        ↓
    {
        state,
        dispatch
    }
        ↓
    CartContext
        ↓
    useCart()

---

# 32. Context vs External State Management

Context не є єдиним способом shared state.

У React застосунках можна використовувати:

    local state
    ↓
    lifted state
    ↓
    Context
    ↓
    useReducer + Context
    ↓
    external store
    ↓
    specialized state management

Вибір залежить від задачі.

---

## Context добре підходить для

- Theme;
- Language;
- Authentication;
- permissions;
- UI configuration;
- compound component state;
- локального shared state великої частини дерева.

---

## Не варто автоматично використовувати Context для

- кожного input;
- кожного маленького UI state;
- дуже часто змінюваного великого state;
- усіх даних застосунку;
- будь-яких даних лише тому, що їх використовують два компоненти.

---

# 33. Типові помилки

## Помилка №1 — один Context для всього

Погано:

    AppContext

    {
        user,
        theme,
        cart,
        language,
        modal,
        search,
        settings
    }

Краще розділити за domain.

---

## Помилка №2 — Context замість props всюди

Не потрібно:

    <ButtonContext>
        <Button />
    </ButtonContext>

для кожного простого значення.

Якщо `Button` отримує одне значення від Parent, props можуть бути простішими.

---

## Помилка №3 — створити Provider занадто високо

Якщо Context потрібен лише:

    AdminDashboard

не обов'язково обгортати ним:

    весь App

Краще обмежити scope.

---

## Помилка №4 — не створювати Custom Hook

Можна писати:

    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(...);
    }

у кожному компоненті.

Але краще винести:

    useAuth()

в одне місце.

---

## Помилка №5 — використовувати `any`

Не:

    createContext<any>(null)

Краще:

    createContext<
        AuthContextValue | undefined
    >(undefined)

---

## Помилка №6 — додавати `useMemo` без причини

Не потрібно автоматично:

    const value = useMemo(...);

у кожному Provider.

Спочатку зрозумій проблему, потім оптимізуй.

---

## Помилка №7 — Context для локального state

Наприклад:

    function Counter() {
        const [count, setCount] =
            useState(0);

        ...
    }

Не потрібно створювати:

    CounterContext

якщо цей state потрібен тільки одному компоненту.

---

## Помилка №8 — змішувати різні domain

Не потрібно робити:

    AuthProvider

який одночасно відповідає за:

    user
    theme
    cart
    language
    notifications

Кожен Provider повинен мати зрозумілу відповідальність.

---

# 34. Практичний production-style приклад

Розглянемо невеликий застосунок із:

- authentication;
- theme;
- language.

---

## Auth Context

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

Hook:

    function useAuth() {
        const context =
            useContext(AuthContext);

        if (!context) {
            throw new Error(
                "useAuth must be used inside AuthProvider"
            );
        }

        return context;
    }

---

## Theme Context

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

Hook:

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

## Language Context

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

Hook:

    function useLanguage() {
        const context =
            useContext(LanguageContext);

        if (!context) {
            throw new Error(
                "useLanguage must be used inside LanguageProvider"
            );
        }

        return context;
    }

---

## AppProviders

    function AppProviders({
        children,
    }: {
        children: React.ReactNode;
    }) {
        return (
            <AuthProvider>
                <ThemeProvider>
                    <LanguageProvider>
                        {children}
                    </LanguageProvider>
                </ThemeProvider>
            </AuthProvider>
        );
    }

---

## App

    function App() {
        return (
            <AppProviders>
                <Header />
                <Main />
            </AppProviders>
        );
    }

---

## Header

    function Header() {
        const {
            user,
            logout,
        } = useAuth();

        const {
            theme,
            setTheme,
        } = useTheme();

        const {
            language,
            setLanguage,
        } = useLanguage();

        return (
            <header>
                <p>
                    User: {user?.name ?? "Guest"}
                </p>

                <p>
                    Theme: {theme}
                </p>

                <p>
                    Language: {language}
                </p>

                <button
                    onClick={() =>
                        setTheme(
                            theme === "light"
                                ? "dark"
                                : "light"
                        )
                    }
                >
                    Toggle theme
                </button>

                <button
                    onClick={() =>
                        setLanguage(
                            language === "uk"
                                ? "en"
                                : "uk"
                        )
                    }
                >
                    Change language
                </button>

                {user && (
                    <button onClick={logout}>
                        Logout
                    </button>
                )}
            </header>
        );
    }

---

## Архітектура

    App
     │
     ↓
    AppProviders
     │
     ├── AuthProvider
     │      ↓
     │   AuthContext
     │      ↓
     │   useAuth()
     │
     ├── ThemeProvider
     │      ↓
     │   ThemeContext
     │      ↓
     │   useTheme()
     │
     └── LanguageProvider
            ↓
         LanguageContext
            ↓
         useLanguage()

Це вже хороший базовий production-style Context architecture.

---

# 35. Структура файлів

Один із варіантів:

    src/
    ├── context/
    │   ├── auth/
    │   │   ├── AuthContext.ts
    │   │   ├── AuthProvider.tsx
    │   │   └── useAuth.ts
    │   │
    │   ├── theme/
    │   │   ├── ThemeContext.ts
    │   │   ├── ThemeProvider.tsx
    │   │   └── useTheme.ts
    │   │
    │   └── language/
    │       ├── LanguageContext.ts
    │       ├── LanguageProvider.tsx
    │       └── useLanguage.ts
    │
    ├── providers/
    │   └── AppProviders.tsx
    │
    └── app/
        └── App.tsx

---

## Відповідальність файлів

### `Context.ts`

Створює Context і визначає типи.

### `Provider.tsx`

Містить state / reducer та Provider.

### `useX.ts`

Містить Custom Hook для читання Context.

### `AppProviders.tsx`

Комбінує декілька Provider.

### `App.tsx`

Використовує готову систему Provider.

---

# 36. Питання для співбесіди

## Що таке Context Pattern?

Це типовий спосіб організації Context API для вирішення конкретної задачі.

Наприклад:

    Context
    +
    Provider
    +
    Custom Hook

---

## Який найпоширеніший Context Pattern?

    createContext()
        +
    Provider
        +
    useContext()
        +
    Custom Hook

---

## Навіщо створювати Custom Hook?

Щоб:

- приховати Context object;
- централізувати перевірку Provider;
- спростити API;
- повторно використовувати логіку.

---

## Чому використовувати `useState` разом із Context?

`useState` зберігає state, а Context поширює його по React tree.

---

## Навіщо `useReducer` + Context?

Це зручно для складного shared state із багатьма action.

---

## Чому не варто створювати один `AppContext`?

Тому що він:

- змішує різні domain;
- створює зайві залежності;
- ускладнює підтримку;
- може спричиняти зайві оновлення.

---

## Що таке Provider Composition?

Комбінація декількох Provider:

    <AuthProvider>
        <ThemeProvider>
            <LanguageProvider>
                <App />
            </LanguageProvider>
        </ThemeProvider>
    </AuthProvider>

---

## Що таке `AppProviders` Pattern?

Окремий компонент, який об'єднує всі глобальні Provider:

    function AppProviders({
        children,
    }: {
        children: React.ReactNode;
    }) {
        return (
            <AuthProvider>
                <ThemeProvider>
                    <LanguageProvider>
                        {children}
                    </LanguageProvider>
                </ThemeProvider>
            </AuthProvider>
        );
    }

---

## Чи потрібно використовувати Context для всього shared state?

Ні.

Context — один із інструментів.

Потрібно оцінювати:

- scope;
- частоту оновлень;
- складність state;
- кількість consumers;
- архітектуру застосунку.

---

## Коли краще props?

Коли dependency локальна і передача через кілька рівнів не створює проблем.

---

## Коли Context кращий?

Коли значення:

- потрібне багатьом компонентам;
- глибоко знаходиться в дереві;
- є концептуально спільним;
- створює prop drilling.

---

## Чи є Context глобальним state manager?

Ні.

Context — це механізм передачі значення через React tree.

State management може бути побудований поверх Context, наприклад:

    useReducer
        +
    Context

але це не означає, що Context сам по собі є повною state management системою.

---

# 37. Рівні знань

## 🟢 Core

Потрібно знати:

- що таке Context Pattern;
- `createContext`;
- Provider;
- `useContext`;
- `useState + Context`;
- базовий Custom Hook;
- `defaultValue`;
- `undefined`;
- nearest Provider.

Базова схема:

    Context
       ↓
    Provider
       ↓
    value
       ↓
    useContext

---

## 🟡 Junior

Потрібно вміти:

- створити Theme Context;
- створити Auth Context;
- створити Language Context;
- використовувати `useState + Context`;
- створити Provider component;
- створити Custom Hook;
- типізувати Context;
- використовувати `undefined`;
- використовувати декілька Provider.

Типовий API:

    useAuth()
    useTheme()
    useLanguage()

---

## 🟠 Middle

Потрібно розуміти:

- Context boundaries;
- separation of concerns;
- Provider composition;
- AppProviders;
- Context + `useReducer`;
- compound components;
- state/actions Context;
- Context value identity;
- оптимізацію Context;
- `useMemo` для value;
- розділення Context;
- Context architecture.

---

## 🔴 Senior

Потрібно розуміти:

- Context як dependency injection;
- Context propagation;
- Provider tree architecture;
- reference identity;
- render/update implications;
- Context boundaries;
- external stores;
- trade-offs Context vs state libraries;
- domain-driven Context design;
- compound component architecture;
- Server/Client boundaries у Next.js;
- як уникати Context-driven architecture complexity.

---

# 38. Міні-шпаргалка

## Базовий Context

    const ThemeContext =
        createContext<Theme>("light");

---

## Provider

    <ThemeContext.Provider value={theme}>
        {children}
    </ThemeContext.Provider>

---

## Consumer

    const theme =
        useContext(ThemeContext);

---

## Shared state

    const [
        theme,
        setTheme
    ] = useState<Theme>("light");

---

## Context value

    value={{
        theme,
        setTheme,
    }}

---

## Safe Context

    const ThemeContext =
        createContext<
            ThemeContextValue | undefined
        >(undefined);

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

## Consumer

    const {
        theme,
        setTheme,
    } = useTheme();

---

## Reducer Pattern

    useReducer()
        ↓
    state + dispatch
        ↓
    Provider
        ↓
    Context
        ↓
    useContext()

---

## Multiple Contexts

    AuthContext
    ThemeContext
    LanguageContext
    CartContext

---

## Provider Composition

    <AuthProvider>
        <ThemeProvider>
            <LanguageProvider>
                <App />
            </LanguageProvider>
        </ThemeProvider>
    </AuthProvider>

---

## AppProviders

    <AppProviders>
        <App />
    </AppProviders>

---

## Compound Components

    <Tabs>
        <Tabs.List>
            <Tabs.Tab />
        </Tabs.List>

        <Tabs.Panel />
    </Tabs>

Context передає внутрішнім компонентам:

    activeTab
    setActiveTab

---

# 39. Головне

> **Context Patterns — це способи організувати Context так, щоб shared dependencies і state залишалися зрозумілими, типобезпечними та керованими.**

Запам'ятай:

1. Базова схема:

       createContext()
           ↓
       Provider
           ↓
       value
           ↓
       useContext()

2. Найпоширеніший Pattern:

       Context
          +
       Provider
          +
       Custom Hook

3. `useState + Context` — хороший варіант для простого shared state.

4. `useReducer + Context` — хороший варіант для складнішого shared state.

5. Custom Hook приховує деталі Context:

       useAuth()
       useTheme()
       useLanguage()
       useCart()

6. Context краще розділяти за відповідальністю:

       AuthContext
       ThemeContext
       LanguageContext
       CartContext

7. Не створюй один величезний:

       AppContext

   якщо його можна логічно розділити.

8. Provider не обов'язково повинен обгортати весь App.

9. Provider краще розміщувати на найменшій потрібній області дерева.

10. Для великої кількості Provider можна використовувати:

        AppProviders

11. Context дуже добре поєднується з Compound Components:

        Tabs
        Accordion
        Form
        Menu
        Dialog

12. Для TypeScript часто зручно:

        createContext<Type | undefined>(
            undefined
        );

13. Custom Hook може перевіряти наявність Provider:

        if (!context) {
            throw new Error(...);
        }

14. Не потрібно використовувати `any` для Context.

15. Не потрібно використовувати `useMemo` автоматично.

16. Якщо Context value — об'єкт, потрібно розуміти reference identity.

17. Великий Context може створювати зайві залежності.

18. Для оптимізації можна розділяти:

        State Context
        +
        Dispatch Context

19. Context не замінює props.

20. Context не є магічною глобальною змінною.

21. Context не є універсальною state management системою.

22. Найкращий Context — це Context із чіткою відповідальністю.

---

## Головна ментальна модель

    LOCAL STATE
        │
        │ useState / useReducer
        ↓
    PROVIDER
        │
        │ value
        ↓
    CONTEXT
        │
        │ propagation
        ↓
    REACT TREE
        │
        ├── Component
        ├── Component
        └── Component
                │
                ↓
           CUSTOM HOOK
                │
                ↓
           useContext()
                │
                ↓
              value

---

## Типовий production Pattern

    Context.ts
        ↓
    Provider.tsx
        ↓
    useX.ts
        ↓
    Components

Наприклад:

    ThemeContext.ts
        ↓
    ThemeProvider.tsx
        ↓
    useTheme.ts
        ↓
    Header.tsx
    Button.tsx
    Settings.tsx

---

## Для складнішого state

    reducer.ts
        ↓
    useReducer()
        ↓
    Provider
        ↓
    Context
        ↓
    Custom Hook
        ↓
    Components

---

## Для декількох domain

    AuthProvider
        ↓
    ThemeProvider
        ↓
    LanguageProvider
        ↓
    CartProvider
        ↓
    App

---

## Формула Context Patterns

    Context
      +
    Provider
      +
    State / Reducer
      +
    Custom Hook
      +
    правильний scope
      +
    чітка відповідальність
      =
    хороший Context architecture

### Найважливіша ідея

Не запитуй:

> "Де я можу використати Context?"

Краще запитуй:

> "Чи є тут shared dependency, яку незручно передавати через props, і чи Context є найпростішим способом її передати?"

Якщо відповідь **так** — Context може бути хорошим рішенням.

Якщо відповідь **ні** — звичайні props або локальний state часто будуть простішими.

Саме вміння вибирати між:

    props
    local state
    lifted state
    Context
    useReducer + Context
    external state

є важливішим за саме знання синтаксису Context API.