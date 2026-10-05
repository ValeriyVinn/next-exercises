# 08. Custom Hooks

Custom Hooks — це спосіб винести повторювану **логіку React Hooks** у власну функцію, яку можна повторно використовувати в різних компонентах.

Custom Hook дозволяє винести з компонента таку логіку, як:

- робота зі `state`;
- робота з `useEffect`;
- робота з `useRef`;
- робота з `useContext`;
- робота з браузерним API;
- робота з `localStorage`;
- завантаження даних;
- debounce / throttle;
- обробка форм;
- визначення розміру вікна;
- онлайн/офлайн статус;
- таймери;
- підписки на події;
- інша повторювана поведінка.

Головна ідея:

> **Custom Hook дозволяє повторно використовувати логіку, а не JSX.**

---

## Що таке Custom Hook

Custom Hook — це звичайна JavaScript/TypeScript-функція, назва якої починається з `use` і всередині якої можна використовувати React Hooks.

Наприклад:

    function useCounter() {
      const [count, setCount] = useState(0);

      return {
        count,
        increment: () => setCount(count + 1),
      };
    }

Потім цей Hook можна використовувати в компоненті:

    function Counter() {
      const { count, increment } = useCounter();

      return (
        <button onClick={increment}>
          {count}
        </button>
      );
    }

Назва `useCounter` починається з `use`, тому React Hooks lint rules можуть визначати її як Hook.

---

# Навіщо потрібні Custom Hooks

Без Custom Hook логіка може дублюватися в декількох компонентах.

Наприклад:

    function ComponentA() {
      const [isOnline, setIsOnline] = useState(navigator.onLine);

      useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
          window.removeEventListener("online", handleOnline);
          window.removeEventListener("offline", handleOffline);
        };
      }, []);

      return <p>{isOnline ? "Online" : "Offline"}</p>;
    }

І та сама логіка в іншому компоненті:

    function ComponentB() {
      const [isOnline, setIsOnline] = useState(navigator.onLine);

      useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
          window.removeEventListener("online", handleOnline);
          window.removeEventListener("offline", handleOffline);
        };
      }, []);

      return <div>{isOnline ? "Online" : "Offline"}</div>;
    }

Логіку можна винести:

    function useOnlineStatus() {
      const [isOnline, setIsOnline] = useState(navigator.onLine);

      useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
          window.removeEventListener("online", handleOnline);
          window.removeEventListener("offline", handleOffline);
        };
      }, []);

      return isOnline;
    }

Тепер:

    function ComponentA() {
      const isOnline = useOnlineStatus();

      return <p>{isOnline ? "Online" : "Offline"}</p>;
    }

    function ComponentB() {
      const isOnline = useOnlineStatus();

      return <div>{isOnline ? "Online" : "Offline"}</div>;
    }

Компоненти отримують готову поведінку.

---

# Головна ідея Custom Hooks

Важливо розрізняти:

**Component**

    function Counter() {
      const [count, setCount] = useState(0);

      return <button>{count}</button>;
    }

Компонент повертає **JSX**.

**Custom Hook**

    function useCounter() {
      const [count, setCount] = useState(0);

      return {
        count,
        setCount,
      };
    }

Custom Hook повертає **дані та функції**, а не JSX.

Тому:

    Component → UI

    Custom Hook → Logic

Це одна з найважливіших ідей цієї теми.

---

# Правила Custom Hooks

Custom Hook повинен дотримуватися Rules of Hooks.

## 1. Назва повинна починатися з `use`

Правильно:

    function useCounter() {
      // ...
    }

    function useFetch() {
      // ...
    }

    function useLocalStorage() {
      // ...
    }

    function useWindowSize() {
      // ...
    }

Неправильно:

    function counterHook() {
      // ...
    }

    function getCounter() {
      // ...
    }

Назва `use...` важлива не тільки для стилю.

Вона дозволяє React та ESLint розпізнавати функцію як Hook.

---

# 2. Hooks викликаються тільки на верхньому рівні

Правильно:

    function useCounter() {
      const [count, setCount] = useState(0);

      if (count > 10) {
        console.log("Big number");
      }

      return count;
    }

Неправильно:

    function useCounter() {
      const [count, setCount] = useState(0);

      if (count > 10) {
        const [value, setValue] = useState(0);
      }

      return count;
    }

Hook не можна викликати всередині:

- `if`;
- `else`;
- `for`;
- `while`;
- вкладених функцій;
- `switch`;
- умовних гілок.

---

# 3. Custom Hook може використовувати інші Hooks

Наприклад:

    function useCounter() {
      const [count, setCount] = useState(0);

      useEffect(() => {
        document.title = `Count: ${count}`;
      }, [count]);

      return {
        count,
        increment: () => setCount((value) => value + 1),
      };
    }

Custom Hook може використовувати:

- `useState`;
- `useEffect`;
- `useRef`;
- `useMemo`;
- `useCallback`;
- `useReducer`;
- `useContext`;
- інші Custom Hooks.

---

# 4. Custom Hook може використовувати інший Custom Hook

Наприклад:

    function useCounter() {
      const [count, setCount] = useState(0);

      return {
        count,
        increment: () => setCount((value) => value + 1),
      };
    }

Інший Hook:

    function useCounterTitle() {
      const { count } = useCounter();

      useEffect(() => {
        document.title = `Count: ${count}`;
      }, [count]);

      return count;
    }

Це називається композицією Hooks.

---

# Найпростіший Custom Hook

Почнемо з простого прикладу.

    function useCounter() {
      const [count, setCount] = useState(0);

      const increment = () => {
        setCount((value) => value + 1);
      };

      const decrement = () => {
        setCount((value) => value - 1);
      };

      const reset = () => {
        setCount(0);
      };

      return {
        count,
        increment,
        decrement,
        reset,
      };
    }

Використання:

    function Counter() {
      const {
        count,
        increment,
        decrement,
        reset,
      } = useCounter();

      return (
        <div>
          <p>{count}</p>

          <button onClick={increment}>
            +
          </button>

          <button onClick={decrement}>
            -
          </button>

          <button onClick={reset}>
            Reset
          </button>
        </div>
      );
    }

---

# Що саме повертає Custom Hook

Custom Hook може повертати:

### Одне значення

    function useCounter() {
      const [count, setCount] = useState(0);

      return count;
    }

Використання:

    const count = useCounter();

---

### Об'єкт

    function useCounter() {
      const [count, setCount] = useState(0);

      return {
        count,
        increment: () => setCount((value) => value + 1),
      };
    }

Використання:

    const {
      count,
      increment,
    } = useCounter();

Це дуже поширений варіант.

---

### Масив

    function useCounter() {
      const [count, setCount] = useState(0);

      return [
        count,
        () => setCount((value) => value + 1),
      ];
    }

Використання:

    const [count, increment] = useCounter();

Такий стиль нагадує `useState`.

---

# Custom Hook з параметрами

Custom Hook може отримувати аргументи.

    function useCounter(initialValue: number) {
      const [count, setCount] = useState(initialValue);

      const increment = () => {
        setCount((value) => value + 1);
      };

      return {
        count,
        increment,
      };
    }

Використання:

    const counterA = useCounter(0);

    const counterB = useCounter(100);

---

# Кожен виклик Custom Hook має власний state

Це дуже важливе правило.

Наприклад:

    function useCounter() {
      const [count, setCount] = useState(0);

      return {
        count,
        increment: () => {
          setCount((value) => value + 1);
        },
      };
    }

Два компоненти:

    function CounterA() {
      const { count, increment } = useCounter();

      return (
        <button onClick={increment}>
          A: {count}
        </button>
      );
    }

    function CounterB() {
      const { count, increment } = useCounter();

      return (
        <button onClick={increment}>
          B: {count}
        </button>
      );
    }

`CounterA` та `CounterB` мають **різні state**.

Виклик:

    useCounter()

не створює один глобальний `count`.

Кожен виклик Hook має власний стан, прив'язаний до конкретного компонента.

---

# Custom Hook ≠ Global State

Це одна з найважливіших відмінностей.

    useCounter()

не означає:

    "всі компоненти використовують один count"

Це означає:

    "кожен компонент отримує свою копію логіки та свій state"

Для спільного стану можна використовувати:

- Context;
- `useReducer + Context`;
- Zustand;
- Redux;
- інші state management рішення.

---

# Custom Hook для localStorage

Один із класичних прикладів.

Звичайний компонент може містити багато логіки:

    function Settings() {
      const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");

        return savedTheme ?? "light";
      });

      useEffect(() => {
        localStorage.setItem("theme", theme);
      }, [theme]);

      return (
        <button onClick={() => {
          setTheme((value) =>
            value === "light" ? "dark" : "light"
          );
        }}>
          {theme}
        </button>
      );
    }

Цю логіку можна винести.

---

# `useLocalStorage`

    function useLocalStorage<T>(
      key: string,
      initialValue: T
    ) {
      const [value, setValue] = useState<T>(() => {
        const savedValue = localStorage.getItem(key);

        if (savedValue === null) {
          return initialValue;
        }

        return JSON.parse(savedValue) as T;
      });

      useEffect(() => {
        localStorage.setItem(
          key,
          JSON.stringify(value)
        );
      }, [key, value]);

      return [value, setValue] as const;
    }

Використання:

    function Settings() {
      const [theme, setTheme] = useLocalStorage(
        "theme",
        "light"
      );

      return (
        <button
          onClick={() => {
            setTheme((value) =>
              value === "light"
                ? "dark"
                : "light"
            );
          }}
        >
          {theme}
        </button>
      );
    }

Тут Custom Hook приховує технічні деталі `localStorage`.

Компоненту вони вже не потрібні.

---

# Важливий момент: `localStorage` і Next.js

У Next.js App Router сервер не має `window` та `localStorage`.

Тому Custom Hook, який використовує браузерні API, повинен працювати в Client Component.

Наприклад:

    "use client";

    import { useEffect, useState } from "react";

Custom Hook:

    function useLocalStorage<T>(
      key: string,
      initialValue: T
    ) {
      const [value, setValue] = useState<T>(initialValue);

      useEffect(() => {
        const savedValue = localStorage.getItem(key);

        if (savedValue !== null) {
          setValue(JSON.parse(savedValue) as T);
        }
      }, [key]);

      useEffect(() => {
        localStorage.setItem(
          key,
          JSON.stringify(value)
        );
      }, [key, value]);

      return [value, setValue] as const;
    }

Потрібно враховувати також SSR/hydration.

---

# Custom Hook для `window.innerWidth`

Наприклад, потрібно знати ширину браузера.

    function useWindowWidth() {
      const [width, setWidth] = useState(() => {
        return window.innerWidth;
      });

      useEffect(() => {
        const handleResize = () => {
          setWidth(window.innerWidth);
        };

        window.addEventListener(
          "resize",
          handleResize
        );

        return () => {
          window.removeEventListener(
            "resize",
            handleResize
          );
        };
      }, []);

      return width;
    }

Використання:

    function LayoutInfo() {
      const width = useWindowWidth();

      return (
        <p>
          Window width: {width}px
        </p>
      );
    }

---

# SSR-safe `useWindowWidth`

Для Next.js краще починати з безпечного значення:

    function useWindowWidth() {
      const [width, setWidth] = useState<number | null>(
        null
      );

      useEffect(() => {
        const updateWidth = () => {
          setWidth(window.innerWidth);
        };

        updateWidth();

        window.addEventListener(
          "resize",
          updateWidth
        );

        return () => {
          window.removeEventListener(
            "resize",
            updateWidth
          );
        };
      }, []);

      return width;
    }

В компоненті:

    function LayoutInfo() {
      const width = useWindowWidth();

      if (width === null) {
        return <p>Loading...</p>;
      }

      return <p>{width}px</p>;
    }

Головна ідея:

> Browser API потрібно використовувати там, де існує браузер.

---

# Custom Hook для online/offline

    function useOnlineStatus() {
      const [isOnline, setIsOnline] = useState(
        () => navigator.onLine
      );

      useEffect(() => {
        const handleOnline = () => {
          setIsOnline(true);
        };

        const handleOffline = () => {
          setIsOnline(false);
        };

        window.addEventListener(
          "online",
          handleOnline
        );

        window.addEventListener(
          "offline",
          handleOffline
        );

        return () => {
          window.removeEventListener(
            "online",
            handleOnline
          );

          window.removeEventListener(
            "offline",
            handleOffline
          );
        };
      }, []);

      return isOnline;
    }

Використання:

    function NetworkStatus() {
      const isOnline = useOnlineStatus();

      return (
        <p>
          {isOnline
            ? "You are online"
            : "You are offline"}
        </p>
      );
    }

---

# Custom Hook для debounce

Debounce часто використовується для:

- пошуку;
- autocomplete;
- фільтрації;
- API-запитів;
- обробки введення.

Наприклад:

    function useDebounce<T>(
      value: T,
      delay: number
    ) {
      const [debouncedValue, setDebouncedValue] =
        useState(value);

      useEffect(() => {
        const timer = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);

        return () => {
          clearTimeout(timer);
        };
      }, [value, delay]);

      return debouncedValue;
    }

Використання:

    function Search() {
      const [query, setQuery] = useState("");

      const debouncedQuery = useDebounce(
        query,
        500
      );

      useEffect(() => {
        if (!debouncedQuery) {
          return;
        }

        console.log(
          "Search:",
          debouncedQuery
        );
      }, [debouncedQuery]);

      return (
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
      );
    }

---

# Що відбувається в `useDebounce`

Користувач вводить:

    r
    re
    rea
    reac
    react

Кожна зміна:

    value → useEffect → setTimeout()

Якщо новий символ введений раніше, ніж закінчився `delay`:

    cleanup → clearTimeout()

Старий таймер видаляється.

Після паузи:

    setTimeout()
        ↓
    debouncedValue оновлюється

Тому API можна викликати не після кожного символу, а після паузи.

---

# Custom Hook для Fetch

Можна створити Hook для завантаження даних.

Наприклад:

    type FetchState<T> = {
      data: T | null;
      loading: boolean;
      error: string | null;
    };

    function useFetch<T>(url: string) {
      const [data, setData] = useState<T | null>(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(
        null
      );

      useEffect(() => {
        let cancelled = false;

        async function load() {
          try {
            setLoading(true);
            setError(null);

            const response = await fetch(url);

            if (!response.ok) {
              throw new Error(
                `HTTP error: ${response.status}`
              );
            }

            const result: T = await response.json();

            if (!cancelled) {
              setData(result);
            }
          } catch (error) {
            if (!cancelled) {
              setError(
                error instanceof Error
                  ? error.message
                  : "Unknown error"
              );
            }
          } finally {
            if (!cancelled) {
              setLoading(false);
            }
          }
        }

        load();

        return () => {
          cancelled = true;
        };
      }, [url]);

      return {
        data,
        loading,
        error,
      };
    }

Використання:

    type User = {
      id: number;
      name: string;
    };

    function Users() {
      const {
        data,
        loading,
        error,
      } = useFetch<User[]>(
        "/api/users"
      );

      if (loading) {
        return <p>Loading...</p>;
      }

      if (error) {
        return <p>Error: {error}</p>;
      }

      return (
        <ul>
          {data?.map((user) => (
            <li key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      );
    }

Це хороший навчальний приклад Custom Hook.

Але в реальному Next.js-проєкті для server-side data fetching часто є кращі підходи.

---

# Custom Hook + `useReducer`

Custom Hook може використовувати `useReducer`.

Це корисно, коли логіка має багато станів.

Наприклад:

    type State<T> = {
      data: T | null;
      loading: boolean;
      error: string | null;
    };

    type Action<T> =
      | { type: "start" }
      | { type: "success"; payload: T }
      | { type: "error"; payload: string };

    function reducer<T>(
      state: State<T>,
      action: Action<T>
    ): State<T> {
      switch (action.type) {
        case "start":
          return {
            data: null,
            loading: true,
            error: null,
          };

        case "success":
          return {
            data: action.payload,
            loading: false,
            error: null,
          };

        case "error":
          return {
            data: null,
            loading: false,
            error: action.payload,
          };

        default:
          return state;
      }
    }

Custom Hook:

    function useFetch<T>(url: string) {
      const [state, dispatch] = useReducer(
        reducer<T>,
        {
          data: null,
          loading: true,
          error: null,
        }
      );

      useEffect(() => {
        async function load() {
          dispatch({ type: "start" });

          try {
            const response = await fetch(url);

            if (!response.ok) {
              throw new Error(
                `HTTP ${response.status}`
              );
            }

            const data: T = await response.json();

            dispatch({
              type: "success",
              payload: data,
            });
          } catch (error) {
            dispatch({
              type: "error",
              payload:
                error instanceof Error
                  ? error.message
                  : "Unknown error",
            });
          }
        }

        load();
      }, [url]);

      return state;
    }

Тут добре видно композицію:

    Custom Hook
        ↓
    useReducer
        ↓
    useEffect
        ↓
    fetch

---

# Custom Hook для форми

Custom Hook може приховати логіку форми.

Наприклад:

    function useInput(initialValue: string) {
      const [value, setValue] = useState(initialValue);

      const onChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        setValue(event.target.value);
      };

      const reset = () => {
        setValue(initialValue);
      };

      return {
        value,
        onChange,
        reset,
      };
    }

Використання:

    function LoginForm() {
      const email = useInput("");
      const password = useInput("");

      return (
        <form>
          <input
            type="email"
            value={email.value}
            onChange={email.onChange}
          />

          <input
            type="password"
            value={password.value}
            onChange={password.onChange}
          />

          <button type="button" onClick={email.reset}>
            Reset email
          </button>
        </form>
      );
    }

---

# Краще передавати не Event, а значення

Іноді зручніше зробити Hook незалежним від HTML.

Замість:

    const onChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setValue(event.target.value);
    };

можна:

    const setInputValue = (
      value: string
    ) => {
      setValue(value);
    };

Тоді:

    function useInput(initialValue: string) {
      const [value, setValue] = useState(initialValue);

      const reset = () => {
        setValue(initialValue);
      };

      return {
        value,
        setValue,
        reset,
      };
    }

Компонент:

    function LoginForm() {
      const email = useInput("");

      return (
        <input
          value={email.value}
          onChange={(event) => {
            email.setValue(event.target.value);
          }}
        />
      );
    }

Такий Hook менше залежить від конкретного DOM-елемента.

---

# Custom Hook для toggle

Простий і дуже поширений приклад:

    function useToggle(
      initialValue = false
    ) {
      const [value, setValue] =
        useState(initialValue);

      const toggle = () => {
        setValue((current) => !current);
      };

      const setTrue = () => {
        setValue(true);
      };

      const setFalse = () => {
        setValue(false);
      };

      return {
        value,
        toggle,
        setTrue,
        setFalse,
      };
    }

Використання:

    function Modal() {
      const {
        value: isOpen,
        toggle,
        setFalse,
      } = useToggle();

      return (
        <>
          <button onClick={toggle}>
            Open modal
          </button>

          {isOpen && (
            <div>
              <p>Modal</p>

              <button onClick={setFalse}>
                Close
              </button>
            </div>
          )}
        </>
      );
    }

---

# Custom Hook для `usePrevious`

Можна використовувати `useRef` для збереження попереднього значення.

    function usePrevious<T>(
      value: T
    ): T | undefined {
      const ref = useRef<T | undefined>(
        undefined
      );

      useEffect(() => {
        ref.current = value;
      }, [value]);

      return ref.current;
    }

Використання:

    function Counter() {
      const [count, setCount] = useState(0);

      const previousCount =
        usePrevious(count);

      return (
        <div>
          <p>Current: {count}</p>

          <p>
            Previous: {previousCount ?? "-"}
          </p>

          <button
            onClick={() => {
              setCount((value) => value + 1);
            }}
          >
            +
          </button>
        </div>
      );
    }

---

# Custom Hook може повертати функції

Наприклад:

    function useCounter() {
      const [count, setCount] = useState(0);

      const increment = useCallback(() => {
        setCount((value) => value + 1);
      }, []);

      const decrement = useCallback(() => {
        setCount((value) => value - 1);
      }, []);

      return {
        count,
        increment,
        decrement,
      };
    }

Тут `useCallback` може бути доречним, якщо стабільність посилання на функції реально потрібна.

Не потрібно автоматично обгортати всі функції Custom Hook у `useCallback`.

---

# Custom Hook та `useMemo`

Custom Hook може використовувати `useMemo`.

Наприклад:

    function useFilteredUsers(
      users: User[],
      query: string
    ) {
      return useMemo(() => {
        return users.filter((user) =>
          user.name
            .toLowerCase()
            .includes(query.toLowerCase())
        );
      }, [users, query]);
    }

Використання:

    function UserList({
      users,
    }: {
      users: User[];
    }) {
      const [query, setQuery] =
        useState("");

      const filteredUsers =
        useFilteredUsers(
          users,
          query
        );

      return (
        <div>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />

          {filteredUsers.map((user) => (
            <p key={user.id}>
              {user.name}
            </p>
          ))}
        </div>
      );
    }

Але:

> `useMemo` потрібен не для того, щоб "Custom Hook був швидшим" автоматично.

Він потрібен лише тоді, коли мемоізація конкретного обчислення має сенс.

---

# Custom Hook та `useCallback`

Те саме стосується `useCallback`.

Не потрібно робити:

    const increment = useCallback(() => {
      setCount((value) => value + 1);
    }, []);

лише тому, що це Custom Hook.

Потрібно мати конкретну причину, наприклад:

- функція передається мемоізованому компоненту;
- функція використовується як dependency іншого Hook;
- стабільність reference реально має значення.

---

# Custom Hook та Context

Custom Hook часто використовується разом із Context.

Наприклад:

    const ThemeContext = createContext<
      ThemeContextValue | null
    >(null);

Provider:

    function ThemeProvider({
      children,
    }: {
      children: React.ReactNode;
    }) {
      const [theme, setTheme] =
        useState<"light" | "dark">("light");

      const value = {
        theme,
        setTheme,
      };

      return (
        <ThemeContext.Provider value={value}>
          {children}
        </ThemeContext.Provider>
      );
    }

Custom Hook:

    function useTheme() {
      const context =
        useContext(ThemeContext);

      if (context === null) {
        throw new Error(
          "useTheme must be used inside ThemeProvider"
        );
      }

      return context;
    }

Тепер компонент:

    function ThemeButton() {
      const {
        theme,
        setTheme,
      } = useTheme();

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
          Current theme: {theme}
        </button>
      );
    }

Компонент більше не знає про:

- `createContext`;
- `useContext`;
- перевірку `null`;
- структуру Context.

Він просто використовує:

    useTheme();

---

# Custom Hook + Context + useReducer

Це дуже корисний патерн для React.

Архітектура:

    Context
        +
    useReducer
        +
    Custom Hook
        ↓
    shared state

Наприклад:

    type State = {
      count: number;
    };

    type Action =
      | { type: "increment" }
      | { type: "decrement" };

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

Context:

    type CounterContextValue = {
      state: State;
      dispatch: React.Dispatch<Action>;
    };

    const CounterContext =
      createContext<CounterContextValue | null>(
        null
      );

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

Custom Hook:

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

Компонент:

    function Counter() {
      const {
        state,
        dispatch,
      } = useCounter();

      return (
        <div>
          <p>{state.count}</p>

          <button
            onClick={() => {
              dispatch({
                type: "increment",
              });
            }}
          >
            +
          </button>

          <button
            onClick={() => {
              dispatch({
                type: "decrement",
              });
            }}
          >
            -
          </button>
        </div>
      );
    }

Це вже схоже на маленьку локальну state-management архітектуру.

---

# Custom Hooks і композиція

Одна з головних переваг Custom Hooks — їх можна комбінувати.

Наприклад:

    function useUser() {
      // отримання користувача
    }

    function usePermissions() {
      // отримання permissions
    }

    function useCurrentUser() {
      const user = useUser();
      const permissions = usePermissions();

      return {
        user,
        permissions,
      };
    }

І потім:

    function Dashboard() {
      const {
        user,
        permissions,
      } = useCurrentUser();

      // ...
    }

Отримуємо:

    Dashboard
        ↓
    useCurrentUser
        ↓
        ├── useUser
        └── usePermissions

Це називається композицією логіки.

---

# Custom Hook не повинен знати про JSX

Поганий варіант:

    function useUser() {
      const user = ...;

      return (
        <div>
          {user.name}
        </div>
      );
    }

Це вже більше схоже на компонент.

Краще:

    function useUser() {
      const user = ...;

      return user;
    }

А UI:

    function UserProfile() {
      const user = useUser();

      return (
        <div>
          {user.name}
        </div>
      );
    }

---

# Custom Hook і розділення відповідальності

Хороший поділ:

    Custom Hook
        ↓
    state
    effects
    browser API
    data fetching
    business logic
    reusable behavior

    Component
        ↓
    JSX
    layout
    visual presentation
    user interaction

Наприклад:

    function useCart() {
      // cart state
      // add item
      // remove item
      // total
      // persistence
    }

Компонент:

    function CartPage() {
      const {
        items,
        total,
        removeItem,
      } = useCart();

      return (
        <div>
          {/* UI */}
        </div>
      );
    }

---

# Custom Hook для бізнес-логіки

Custom Hook може бути не лише "технічним".

Наприклад:

    function useCart() {
      const [items, setItems] = useState<CartItem[]>(
        []
      );

      const addItem = (item: Product) => {
        // business logic
      };

      const removeItem = (productId: number) => {
        // business logic
      };

      const total = items.reduce(
        (sum, item) =>
          sum + item.price * item.quantity,
        0
      );

      return {
        items,
        addItem,
        removeItem,
        total,
      };
    }

Це вже reusable business logic.

---

# Custom Hook для authentication

Наприклад:

    function useAuth() {
      const context =
        useContext(AuthContext);

      if (context === null) {
        throw new Error(
          "useAuth must be used inside AuthProvider"
        );
      }

      return context;
    }

Використання:

    function Profile() {
      const {
        user,
        logout,
      } = useAuth();

      if (!user) {
        return <p>Please log in</p>;
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

Custom Hook створює зручний API:

    useAuth()

замість:

    useContext(AuthContext)

---

# Custom Hook для permission

Наприклад:

    function usePermission(
      permission: string
    ) {
      const {
        user,
      } = useAuth();

      return user?.permissions.includes(
        permission
      ) ?? false;
    }

Використання:

    function DeleteButton() {
      const canDelete =
        usePermission("delete:users");

      if (!canDelete) {
        return null;
      }

      return (
        <button>
          Delete
        </button>
      );
    }

Тут один Custom Hook використовує інший:

    usePermission
        ↓
    useAuth
        ↓
    Context

---

# Custom Hook для interval

Наприклад:

    function useInterval(
      callback: () => void,
      delay: number | null
    ) {
      const savedCallback =
        useRef(callback);

      useEffect(() => {
        savedCallback.current = callback;
      }, [callback]);

      useEffect(() => {
        if (delay === null) {
          return;
        }

        const id = setInterval(() => {
          savedCallback.current();
        }, delay);

        return () => {
          clearInterval(id);
        };
      }, [delay]);
    }

Використання:

    function Timer() {
      const [count, setCount] = useState(0);

      useInterval(() => {
        setCount((value) => value + 1);
      }, 1000);

      return <p>{count}</p>;
    }

Тут Hook приховує складність роботи з:

- `setInterval`;
- `clearInterval`;
- `useRef`;
- `useEffect`.

---

# Cleanup у Custom Hooks

Якщо Custom Hook створює підписку, таймер або listener, він повинен правильно очищати ресурс.

Наприклад:

    function useWindowSize() {
      const [width, setWidth] =
        useState<number | null>(null);

      useEffect(() => {
        const handleResize = () => {
          setWidth(window.innerWidth);
        };

        window.addEventListener(
          "resize",
          handleResize
        );

        return () => {
          window.removeEventListener(
            "resize",
            handleResize
          );
        };
      }, []);

      return width;
    }

Загальна модель:

    useEffect(() => {
      // subscribe

      return () => {
        // unsubscribe
      };
    }, []);

Це особливо важливо для:

- `addEventListener`;
- `setInterval`;
- `setTimeout`;
- WebSocket;
- subscriptions;
- observers;
- інших ресурсів.

---

# Custom Hook і dependency array

Custom Hook може містити `useEffect`.

Наприклад:

    function useDocumentTitle(
      title: string
    ) {
      useEffect(() => {
        document.title = title;
      }, [title]);
    }

Використання:

    function Profile() {
      useDocumentTitle("Profile");

      return <h1>Profile</h1>;
    }

Якщо `title` зміниться:

    title
      ↓
    dependency change
      ↓
    useEffect
      ↓
    document.title

---

# Custom Hook може приховати `useEffect`

Це одна з основних переваг.

Замість:

    function Profile() {
      useEffect(() => {
        document.title = "Profile";
      }, []);

      // ...
    }

можна:

    function useDocumentTitle(
      title: string
    ) {
      useEffect(() => {
        document.title = title;
      }, [title]);
    }

    function Profile() {
      useDocumentTitle("Profile");

      // ...
    }

Компонент стає більш декларативним:

    useDocumentTitle("Profile");

Ми говоримо:

> "Цей компонент має такий title"

а не описуємо всі технічні деталі.

---

# Custom Hook і TypeScript

TypeScript дуже корисний для Custom Hooks.

Наприклад:

    type UseCounterResult = {
      count: number;
      increment: () => void;
      decrement: () => void;
      reset: () => void;
    };

    function useCounter(
      initialValue: number = 0
    ): UseCounterResult {
      const [count, setCount] =
        useState(initialValue);

      const increment = () => {
        setCount((value) => value + 1);
      };

      const decrement = () => {
        setCount((value) => value - 1);
      };

      const reset = () => {
        setCount(initialValue);
      };

      return {
        count,
        increment,
        decrement,
        reset,
      };
    }

Тут немає `any`.

---

# Generic Custom Hook

Generics особливо корисні для універсальних Hooks.

Наприклад:

    function useLocalStorage<T>(
      key: string,
      initialValue: T
    ) {
      const [value, setValue] =
        useState<T>(initialValue);

      return [value, setValue] as const;
    }

Тепер TypeScript знає тип:

    const [name, setName] =
      useLocalStorage(
        "name",
        "Valeriy"
      );

`name`:

    string

Інший приклад:

    const [age, setAge] =
      useLocalStorage(
        "age",
        56
      );

`age`:

    number

---

# Типізація результату через `as const`

Якщо Custom Hook повертає tuple:

    function useCounter() {
      const [count, setCount] =
        useState(0);

      return [count, setCount] as const;
    }

Тоді TypeScript розуміє:

    readonly [
      number,
      React.Dispatch<
        React.SetStateAction<number>
      >
    ]

Без `as const` TypeScript може вивести результат як звичайний масив із менш точними типами.

---

# Custom Hook як API

Хороший Custom Hook можна розглядати як маленький API.

Наприклад:

    const {
      data,
      loading,
      error,
      refetch,
    } = useUsers();

Компоненту не потрібно знати:

- як виконується `fetch`;
- як обробляється loading;
- як обробляється error;
- де зберігається state;
- як викликається повторний запит.

Він отримує API:

    useUsers()

і використовує результат.

---

# Проєктування Custom Hook

Перед створенням Hook корисно відповісти на питання:

### 1. Яку логіку я хочу повторно використовувати?

Наприклад:

    localStorage

### 2. Які параметри потрібні?

    key
    initialValue

### 3. Що Hook повинен повернути?

    value
    setValue

### 4. Чи потрібен `useEffect`?

    Так, якщо потрібно синхронізувати
    state з localStorage.

### 5. Чи потрібен `useMemo`?

    Тільки якщо є реальна потреба
    в мемоізації.

### 6. Чи потрібен `useCallback`?

    Тільки якщо важлива стабільність
    посилання на функцію.

---

# Не потрібно робити Custom Hook для всього

Це важливе правило.

Не кожну функцію потрібно перетворювати на Hook.

Наприклад:

    function formatPrice(
      price: number
    ) {
      return `${price.toFixed(2)} ₴`;
    }

Це не Hook.

Це звичайна функція.

Не потрібно:

    function useFormatPrice(
      price: number
    ) {
      // ...
    }

Якщо немає React state/effect або іншої Hook-логіки.

Краще:

    function formatPrice(
      price: number
    ) {
      return `${price.toFixed(2)} ₴`;
    }

---

# Custom Hook vs Utility Function

Це дуже важливе розмежування.

## Utility function

Звичайна функція:

    function calculateTotal(
      items: CartItem[]
    ) {
      return items.reduce(
        (total, item) =>
          total + item.price * item.quantity,
        0
      );
    }

Вона не використовує React.

---

## Custom Hook

    function useCart() {
      const [items, setItems] =
        useState<CartItem[]>([]);

      // ...

      return {
        items,
      };
    }

Вона використовує React Hooks.

---

# Просте правило

Якщо логіка:

    не використовує Hooks
        ↓
    звичайна функція

Якщо логіка:

    використовує Hooks
        ↓
    Custom Hook

---

# Custom Hook vs Component

## Component

    function UserProfile() {
      const user = useUser();

      return (
        <div>
          <h1>{user.name}</h1>
        </div>
      );
    }

Component відповідає за UI.

## Custom Hook

    function useUser() {
      const [user, setUser] =
        useState<User | null>(null);

      // data logic

      return user;
    }

Hook відповідає за логіку.

---

# Custom Hook vs Context

Context відповідає за передачу значення через дерево компонентів.

Custom Hook відповідає за повторне використання логіки.

Їх можна комбінувати:

    Context
       +
    Custom Hook

Наприклад:

    useAuth()

всередині може бути:

    useContext(AuthContext)

Але це не означає, що Custom Hook і Context — одне й те саме.

---

# Custom Hook vs `useReducer`

`useReducer` — це механізм керування state.

Custom Hook — це спосіб організувати та повторно використовувати логіку.

Їх можна комбінувати:

    useCustomHook()
          ↓
      useReducer()
          ↓
        state

Наприклад:

    function useCart() {
      const [state, dispatch] =
        useReducer(cartReducer, initialState);

      // ...

      return {
        state,
        dispatch,
      };
    }

---

# Custom Hook vs Redux / Zustand

Custom Hook:

    useState
    useEffect
    useReducer
    useContext
    ...

працює в межах React.

Наприклад:

    useCart()

може керувати локальним або shared state через Context.

Redux/Zustand — це окремі state management рішення.

Важливо:

> Custom Hook не є заміною будь-якому state manager.

---

# Custom Hook не робить state глобальним

Наприклад:

    function useCounter() {
      const [count, setCount] =
        useState(0);

      return {
        count,
        setCount,
      };
    }

Якщо:

    ComponentA → useCounter()
    ComponentB → useCounter()

то вони отримують різні state.

Щоб мати спільний state:

    Context
       +
    Provider
       +
    useContext

або зовнішній state manager.

---

# Custom Hook і `useEffect`

Не потрібно використовувати `useEffect` лише тому, що це Custom Hook.

Наприклад, погано:

    function useFullName(
      firstName: string,
      lastName: string
    ) {
      const [fullName, setFullName] =
        useState("");

      useEffect(() => {
        setFullName(
          `${firstName} ${lastName}`
        );
      }, [firstName, lastName]);

      return fullName;
    }

Це derived data.

Краще:

    function useFullName(
      firstName: string,
      lastName: string
    ) {
      return `${firstName} ${lastName}`;
    }

Але ще краще — якщо тут взагалі немає React-логіки:

    function getFullName(
      firstName: string,
      lastName: string
    ) {
      return `${firstName} ${lastName}`;
    }

Тобто це вже utility function.

---

# Не ховай складність без потреби

Custom Hook повинен спрощувати використання логіки.

Погано:

    function useSomething() {
      // 500 lines of complicated logic
    }

Якщо Hook став величезним, можливо, його потрібно розділити.

Наприклад:

    useUser()
    usePermissions()
    useNotifications()

замість:

    useEverything()

---

# Хороший Custom Hook

Хороший Hook зазвичай:

- має зрозумілу назву;
- вирішує одну логічну задачу;
- має чіткий API;
- приховує технічні деталі;
- легко використовується;
- легко тестується;
- не повертає зайві дані;
- має правильну типізацію.

Наприклад:

    const {
      isOpen,
      open,
      close,
      toggle,
    } = useModal();

Це хороший API.

---

# Поганий Custom Hook

Наприклад:

    const {
      state,
      setState,
      value,
      data,
      error,
      loading,
      randomThing,
      handleSomething,
      handleAnotherThing,
    } = useEverything();

Такий Hook важко зрозуміти та підтримувати.

---

# Naming Custom Hooks

Назва повинна описувати поведінку.

Добре:

    useAuth()
    useUser()
    useUsers()
    useCart()
    useModal()
    useToggle()
    useDebounce()
    useLocalStorage()
    useOnlineStatus()
    useWindowSize()
    usePrevious()

Погано:

    useData()
    useHelper()
    useStuff()
    useCommon()
    useUtils()

Чим конкретніше ім'я, тим зрозуміліше API.

---

# Організація файлів

Для невеликого проєкту:

    src/
    ├── hooks/
    │   ├── useCounter.ts
    │   ├── useToggle.ts
    │   ├── useDebounce.ts
    │   ├── useLocalStorage.ts
    │   └── useWindowSize.ts

Для конкретної feature:

    src/
    ├── features/
    │   └── cart/
    │       ├── components/
    │       ├── hooks/
    │       │   └── useCart.ts
    │       ├── cartReducer.ts
    │       └── types.ts

У великих проєктах другий варіант часто зручніший, бо логіка знаходиться поруч із feature.

---

# Приклад структури для навчального проєкту

Для цієї папки:

    react/
    └── 04-hooks/
        └── 08-custom-hooks/

можна зробити:

    08-custom-hooks/
    ├── README.md
    ├── 01-use-counter/
    ├── 02-use-toggle/
    ├── 03-use-local-storage/
    ├── 04-use-debounce/
    ├── 05-use-window-size/
    ├── 06-use-online-status/
    ├── 07-use-previous/
    ├── 08-use-fetch/
    └── 09-context-and-custom-hook/

Це дозволяє поступово переходити від простих Hooks до реальних патернів.

---

# Практичний приклад 1 — `useCounter`

    function useCounter(
      initialValue = 0
    ) {
      const [count, setCount] =
        useState(initialValue);

      const increment = () => {
        setCount((value) => value + 1);
      };

      const decrement = () => {
        setCount((value) => value - 1);
      };

      const reset = () => {
        setCount(initialValue);
      };

      return {
        count,
        increment,
        decrement,
        reset,
      };
    }

Компонент:

    function Counter() {
      const {
        count,
        increment,
        decrement,
        reset,
      } = useCounter(10);

      return (
        <div>
          <p>{count}</p>

          <button onClick={increment}>
            +
          </button>

          <button onClick={decrement}>
            -
          </button>

          <button onClick={reset}>
            Reset
          </button>
        </div>
      );
    }

---

# Практичний приклад 2 — `useToggle`

    function useToggle(
      initialValue = false
    ) {
      const [value, setValue] =
        useState(initialValue);

      const toggle = () => {
        setValue((current) => !current);
      };

      return {
        value,
        toggle,
      };
    }

Використання:

    function Details() {
      const {
        value: isVisible,
        toggle,
      } = useToggle();

      return (
        <div>
          <button onClick={toggle}>
            Toggle
          </button>

          {isVisible && (
            <p>
              Additional information
            </p>
          )}
        </div>
      );
    }

---

# Практичний приклад 3 — `useDebounce`

    function useDebounce<T>(
      value: T,
      delay: number
    ) {
      const [debouncedValue, setDebouncedValue] =
        useState(value);

      useEffect(() => {
        const timer = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);

        return () => {
          clearTimeout(timer);
        };
      }, [value, delay]);

      return debouncedValue;
    }

Компонент:

    function Search() {
      const [query, setQuery] =
        useState("");

      const debouncedQuery =
        useDebounce(query, 500);

      useEffect(() => {
        if (!debouncedQuery) {
          return;
        }

        console.log(
          "Searching:",
          debouncedQuery
        );
      }, [debouncedQuery]);

      return (
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
      );
    }

---

# Практичний приклад 4 — `usePrevious`

    function usePrevious<T>(
      value: T
    ): T | undefined {
      const ref = useRef<T | undefined>();

      useEffect(() => {
        ref.current = value;
      }, [value]);

      return ref.current;
    }

Використання:

    function Counter() {
      const [count, setCount] =
        useState(0);

      const previous =
        usePrevious(count);

      return (
        <div>
          <p>
            Current: {count}
          </p>

          <p>
            Previous: {previous ?? "-"}
          </p>

          <button
            onClick={() => {
              setCount(
                (value) => value + 1
              );
            }}
          >
            Increment
          </button>
        </div>
      );
    }

---

# Практичний приклад 5 — `useDocumentTitle`

    function useDocumentTitle(
      title: string
    ) {
      useEffect(() => {
        document.title = title;
      }, [title]);
    }

Використання:

    function AboutPage() {
      useDocumentTitle("About");

      return (
        <main>
          <h1>About</h1>
        </main>
      );
    }

---

# Практичний приклад 6 — `useOnlineStatus`

    function useOnlineStatus() {
      const [isOnline, setIsOnline] =
        useState(() => navigator.onLine);

      useEffect(() => {
        const handleOnline = () => {
          setIsOnline(true);
        };

        const handleOffline = () => {
          setIsOnline(false);
        };

        window.addEventListener(
          "online",
          handleOnline
        );

        window.addEventListener(
          "offline",
          handleOffline
        );

        return () => {
          window.removeEventListener(
            "online",
            handleOnline
          );

          window.removeEventListener(
            "offline",
            handleOffline
          );
        };
      }, []);

      return isOnline;
    }

Використання:

    function AppStatus() {
      const isOnline =
        useOnlineStatus();

      return (
        <p>
          Status:{" "}
          {isOnline
            ? "Online"
            : "Offline"}
        </p>
      );
    }

---

# Практичний приклад 7 — `useLocalStorage`

    function useLocalStorage<T>(
      key: string,
      initialValue: T
    ) {
      const [value, setValue] =
        useState<T>(() => {
          const stored =
            localStorage.getItem(key);

          if (stored === null) {
            return initialValue;
          }

          return JSON.parse(stored) as T;
        });

      useEffect(() => {
        localStorage.setItem(
          key,
          JSON.stringify(value)
        );
      }, [key, value]);

      return [
        value,
        setValue,
      ] as const;
    }

Використання:

    function Settings() {
      const [
        theme,
        setTheme,
      ] = useLocalStorage<
        "light" | "dark"
      >(
        "theme",
        "light"
      );

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
          Theme: {theme}
        </button>
      );
    }

---

# Практичний приклад 8 — Custom Hook з Context

    const AuthContext =
      createContext<AuthContextValue | null>(
        null
      );

    function useAuth() {
      const context =
        useContext(AuthContext);

      if (context === null) {
        throw new Error(
          "useAuth must be used inside AuthProvider"
        );
      }

      return context;
    }

Тепер:

    function Header() {
      const {
        user,
        logout,
      } = useAuth();

      return (
        <header>
          <span>
            {user?.name}
          </span>

          <button onClick={logout}>
            Logout
          </button>
        </header>
      );
    }

Це один із найкорисніших практичних патернів React.

---

# Тестування Custom Hook

Custom Hook добре тестується, якщо логіка ізольована.

Наприклад, якщо є:

    useCounter()

можна перевірити:

    initial value
    increment
    decrement
    reset

Але не потрібно автоматично тестувати кожен маленький Hook окремо.

Важливіше тестувати поведінку, яка має бізнес-значення.

---

# Чистий reducer всередині Custom Hook

Якщо Custom Hook використовує `useReducer`, reducer можна винести окремо.

Наприклад:

    cartReducer.ts

    type CartState = {
      items: CartItem[];
    };

    type CartAction =
      | {
          type: "add";
          payload: CartItem;
        }
      | {
          type: "remove";
          payload: number;
        };

    export function cartReducer(
      state: CartState,
      action: CartAction
    ): CartState {
      switch (action.type) {
        case "add":
          return {
            items: [
              ...state.items,
              action.payload,
            ],
          };

        case "remove":
          return {
            items: state.items.filter(
              (item) =>
                item.id !== action.payload
            ),
          };

        default:
          return state;
      }
    }

Custom Hook:

    function useCart() {
      const [state, dispatch] =
        useReducer(
          cartReducer,
          {
            items: [],
          }
        );

      return {
        items: state.items,
        dispatch,
      };
    }

Таке розділення спрощує тестування та підтримку.

---

# Custom Hook як abstraction layer

Наприклад, зараз API використовує:

    fetch("/api/users")

Пізніше реалізація може змінитися.

Компоненту не обов'язково знати про це.

Компонент:

    const {
      users,
      loading,
    } = useUsers();

Hook:

    useUsers()
        ↓
    API
        ↓
    fetch

Пізніше:

    useUsers()
        ↓
    React Query / інший client
        ↓
    API

Компонент може залишитися майже незмінним.

Тому Custom Hook може бути abstraction layer між UI та логікою.

---

# Коли створювати Custom Hook

Створюй Custom Hook, коли:

- одна й та сама React-логіка повторюється;
- компонент стає занадто складним;
- потрібно ізолювати browser API;
- потрібно повторно використовувати state + effect;
- потрібно приховати складну бізнес-логіку;
- потрібно створити зрозумілий API для компонентів;
- логіка може бути використана в декількох компонентах.

---

# Коли НЕ потрібно створювати Custom Hook

Не створюй Hook лише тому, що:

- функція довша за 10 рядків;
- хочеться мати більше файлів;
- "так роблять у React";
- можна винести звичайну utility function;
- логіка використовується лише один раз і дуже проста.

Наприклад:

    function formatDate(
      date: Date
    ) {
      return date.toLocaleDateString(
        "uk-UA"
      );
    }

Це звичайна функція.

---

# Типові помилки

## 1. Називати звичайну функцію `use...`

Погано:

    function useFormatPrice(
      price: number
    ) {
      return price.toFixed(2);
    }

Якщо вона не використовує Hooks, краще:

    function formatPrice(
      price: number
    ) {
      return price.toFixed(2);
    }

---

## 2. Викликати Hook умовно

Погано:

    if (isLoggedIn) {
      useAuth();
    }

Краще:

    const auth = useAuth();

    if (!isLoggedIn) {
      return null;
    }

---

## 3. Викликати Hook у циклі

Погано:

    for (const item of items) {
      useSomething(item);
    }

Hooks повинні викликатися на верхньому рівні компонента або Custom Hook.

---

## 4. Викликати Hook всередині callback

Погано:

    function handleClick() {
      const value = useSomething();
    }

Hooks не можна викликати всередині event handler.

---

## 5. Створити надто великий Hook

Погано:

    useEverything()

який робить:

    auth
    cart
    notifications
    theme
    search
    users
    settings
    analytics

Краще розділити логіку.

---

## 6. Використовувати `useEffect` для derived state

Погано:

    const [fullName, setFullName] =
      useState("");

    useEffect(() => {
      setFullName(
        `${firstName} ${lastName}`
      );
    }, [firstName, lastName]);

Краще:

    const fullName =
      `${firstName} ${lastName}`;

---

## 7. Робити Custom Hook "магічним"

Погано, якщо користувач Hook не розуміє, що відбувається:

    useSomething(
      true,
      false,
      10,
      "abc",
      null
    );

Краще:

    useUsers({
      enabled: true,
      pageSize: 10,
    });

Явний API легше читати.

---

## 8. Неправильно очищати ресурси

Наприклад:

    useEffect(() => {
      window.addEventListener(
        "resize",
        handleResize
      );
    }, []);

Тут відсутній cleanup.

Краще:

    useEffect(() => {
      window.addEventListener(
        "resize",
        handleResize
      );

      return () => {
        window.removeEventListener(
          "resize",
          handleResize
        );
      };
    }, []);

---

## 9. Порушувати типізацію

Погано:

    function useData(): any {
      // ...
    }

Краще визначити конкретний тип:

    type UseDataResult<T> = {
      data: T | null;
      loading: boolean;
      error: string | null;
    };

---

# Custom Hooks у Next.js App Router

У Next.js App Router потрібно пам'ятати:

> React Hooks, які використовують state/effects/context, працюють у Client Components.

Наприклад:

    "use client";

    import { useState } from "react";

    function useCounter() {
      const [count, setCount] =
        useState(0);

      return {
        count,
        increment: () => {
          setCount(
            (value) => value + 1
          );
        },
      };
    }

Якщо компонент використовує цей Hook:

    "use client";

    function Counter() {
      const {
        count,
        increment,
      } = useCounter();

      return (
        <button onClick={increment}>
          {count}
        </button>
      );
    }

Server Component може рендерити Client Component:

    export default function Page() {
      return (
        <main>
          <Counter />
        </main>
      );
    }

Таким чином:

    Server Component
          ↓
    Client Component
          ↓
    Custom Hook
          ↓
    React Hooks

---

# Важлива особливість Next.js

Не потрібно перетворювати весь Next.js компонент на Client Component лише через те, що на сторінці є інтерактивний елемент.

Наприклад:

    export default function Page() {
      return (
        <main>
          <h1>Users</h1>

          <UsersFilter />
        </main>
      );
    }

А:

    "use client";

    function UsersFilter() {
      const {
        query,
        setQuery,
      } = useSearch();

      // ...
    }

Тобто інтерактивну логіку можна ізолювати в Client Component разом із потрібними Custom Hooks.

---

# Custom Hooks та Server Components

Custom Hook, який використовує:

    useState
    useEffect
    useRef
    useContext

не можна використовувати безпосередньо в Server Component.

Наприклад:

    function useCounter() {
      const [count, setCount] =
        useState(0);

      return count;
    }

Такий Hook потребує Client Component.

У Next.js важливо розуміти межу:

    Server Component
        ↓
    Client Component
        ↓
    Client Hooks

---

# Custom Hook та асинхронність

Не потрібно робити:

    async function useUsers() {
      // ...
    }

Custom Hook не повинен бути `async` функцією в такому сенсі.

Поганий підхід:

    async function useUsers() {
      const response =
        await fetch("/api/users");

      return response.json();
    }

Custom Hook може містити асинхронну логіку через `useEffect`, але сам Hook повертає React state/API.

Наприклад:

    function useUsers() {
      const [users, setUsers] =
        useState<User[]>([]);

      const [loading, setLoading] =
        useState(true);

      useEffect(() => {
        async function loadUsers() {
          const response =
            await fetch("/api/users");

          const data: User[] =
            await response.json();

          setUsers(data);
          setLoading(false);
        }

        loadUsers();
      }, []);

      return {
        users,
        loading,
      };
    }

---

# Custom Hook та race conditions

У складніших Fetch Hooks потрібно враховувати ситуацію:

    request A
        ↓
    request B
        ↓
    B finishes
        ↓
    A finishes

Якщо просто записувати результат, старий запит може перезаписати новий.

Для реального data fetching часто використовують:

- `AbortController`;
- спеціальні data-fetching бібліотеки;
- правильну логіку запитів.

Простий варіант із `AbortController`:

    function useFetch<T>(url: string) {
      const [data, setData] =
        useState<T | null>(null);

      useEffect(() => {
        const controller =
          new AbortController();

        async function load() {
          const response = await fetch(
            url,
            {
              signal: controller.signal,
            }
          );

          const result: T =
            await response.json();

          setData(result);
        }

        load();

        return () => {
          controller.abort();
        };
      }, [url]);

      return data;
    }

Для production data fetching цього все одно може бути недостатньо.

---

# Не винаходь data-fetching library без потреби

Навчальний:

    useFetch()

може бути дуже корисним для розуміння:

    useEffect
    fetch
    loading
    error
    cleanup
    AbortController
    state

Але реальний проєкт може використовувати:

    TanStack Query
    SWR
    Next.js data fetching
    server-side fetching

Тому Custom Hook — це не обов'язково заміна спеціалізованому рішенню.

---

# Custom Hooks і separation of concerns

Розглянемо:

    function UserPage() {
      const [users, setUsers] =
        useState<User[]>([]);

      const [loading, setLoading] =
        useState(true);

      const [query, setQuery] =
        useState("");

      useEffect(() => {
        // fetch
      }, []);

      // filtering

      // sorting

      // permissions

      // ...

      return (
        // huge JSX
      );
    }

Такий компонент поступово стає важким.

Можна розділити:

    useUsers()
    useSearch()
    usePermissions()
    useSorting()

І:

    function UserPage() {
      const users = useUsers();
      const search = useSearch();
      const permissions =
        usePermissions();

      return (
        // UI
      );
    }

Компонент стає простішим.

---

# Але не перестарайся

Не потрібно автоматично робити:

    useUsers()
    useSearch()
    useFilter()
    useSort()
    usePagination()
    useSelection()
    useModal()
    useKeyboard()
    useTheme()
    useSomethingElse()

для компонента з 20 рядками.

Мета:

> **Не максимальна кількість Custom Hooks, а зрозуміла структура логіки.**

---

# Питання зі співбесіди

### Що таке Custom Hook?

Custom Hook — це функція, назва якої починається з `use` і яка може використовувати React Hooks для повторного використання логіки.

---

### Чим Custom Hook відрізняється від компонента?

Компонент повертає JSX.

Custom Hook повертає дані, state, функції або інші значення.

    Component → JSX

    Custom Hook → logic

---

### Чи може Custom Hook використовувати `useState`?

Так.

    function useCounter() {
      const [count, setCount] =
        useState(0);

      return count;
    }

---

### Чи може Custom Hook використовувати інший Custom Hook?

Так.

    function useCurrentUser() {
      const user = useUser();
      const permissions =
        usePermissions();

      return {
        user,
        permissions,
      };
    }

---

### Чи має Custom Hook спільний state між компонентами?

Ні.

Кожен виклик Custom Hook отримує власний state.

Для спільного state потрібні інші механізми, наприклад Context або external state manager.

---

### Чи можна назвати будь-яку функцію `useSomething`?

Технічно назва сама по собі не робить функцію Hook.

Якщо це звичайна utility function без React Hooks, краще не використовувати `use...`.

---

### Чому назва Custom Hook повинна починатися з `use`?

Щоб React/ESLint могли застосовувати Rules of Hooks і розуміти, що функція є Hook.

---

### Чи можна викликати Custom Hook всередині `if`?

Ні.

    if (condition) {
      useSomething();
    }

порушує Rules of Hooks.

---

### Чи можна викликати Custom Hook у event handler?

Ні.

Погано:

    function handleClick() {
      const value = useSomething();
    }

---

### Чи можна використовувати Custom Hook у Next.js Server Component?

Якщо Hook використовує client-only React Hooks, наприклад `useState` або `useEffect`, — ні.

Такий Hook використовується в Client Component.

---

### Чи робить Custom Hook state глобальним?

Ні.

Custom Hook лише повторно використовує логіку.

---

### Коли краще використовувати utility function?

Коли логіка не потребує React Hooks.

Наприклад:

    function formatPrice(price: number) {
      return `${price.toFixed(2)} ₴`;
    }

---

### Чи потрібно використовувати `useMemo` та `useCallback` всередині Custom Hook?

Не автоматично.

Їх потрібно використовувати лише тоді, коли є конкретна причина для мемоізації.

---

### Чи може Custom Hook працювати з Context?

Так.

Дуже поширений патерн:

    Context
       ↓
    useContext
       ↓
    useAuth()
       ↓
    Component

---

# Шлях вивчення Custom Hooks

## 🟢 Core — обов'язково

Потрібно знати:

- що таке Custom Hook;
- навіщо він потрібен;
- naming `use...`;
- Rules of Hooks;
- `useState` всередині Custom Hook;
- `useEffect` всередині Custom Hook;
- параметри;
- return values;
- власний state кожного виклику.

Практика:

    useCounter()
    useToggle()
    useInput()

---

## 🔵 Junior

Потрібно вміти:

- писати Hooks з TypeScript;
- використовувати generics;
- працювати з `useEffect`;
- робити cleanup;
- працювати з browser API;
- робити `useDebounce`;
- `useLocalStorage`;
- `usePrevious`;
- `useOnlineStatus`;
- розуміти Client Components у Next.js.

Практика:

    useDebounce()
    useLocalStorage()
    useWindowSize()
    useOnlineStatus()

---

## 🟠 Middle

Потрібно розуміти:

- композицію Custom Hooks;
- Context + Custom Hook;
- `useReducer + Context + Custom Hook`;
- abstraction layer;
- data fetching;
- `AbortController`;
- race conditions;
- API design;
- тестування логіки;
- separation of concerns;
- коли Hook потрібно розділити.

Практика:

    useAuth()
    useCart()
    useUsers()
    usePermissions()
    useFetch()

---

## 🔴 Senior

Корисно розуміти:

- дизайн API Custom Hooks;
- композицію складної поведінки;
- state machines;
- server/client boundaries;
- rendering behavior;
- performance implications;
- subscriptions;
- external stores;
- data fetching architecture;
- trade-offs між Custom Hooks та бібліотеками;
- коли abstraction допомагає, а коли ускладнює код.

Головне:

> Senior-рівень — це не "писати більше Custom Hooks", а розуміти, **де abstraction дійсно потрібна**.

---

# Міні-шпаргалка

| Поняття | Значення |
|---|---|
| Custom Hook | Повторно використовувана React-логіка |
| Назва | `useSomething` |
| JSX | Custom Hook зазвичай не повертає JSX |
| State | Може мати власний `useState` |
| Effects | Може використовувати `useEffect` |
| Context | Може використовувати `useContext` |
| Reducer | Може використовувати `useReducer` |
| Інші Hooks | Може композиційно використовувати інші Hooks |
| Shared state | Сам по собі не створює shared state |
| TypeScript | Бажано типізувати API Hook |
| Generic | Корисний для універсальних Hooks |
| Cleanup | Потрібний для subscriptions/timers/listeners |
| Next.js | Client Hooks потребують Client Component |
| Utility function | Краще для логіки без React Hooks |

---

# Основні приклади, які варто запам'ятати

## `useCounter`

    function useCounter() {
      const [count, setCount] =
        useState(0);

      return {
        count,
        increment: () => {
          setCount(
            (value) => value + 1
          );
        },
      };
    }

---

## `useToggle`

    function useToggle(
      initialValue = false
    ) {
      const [value, setValue] =
        useState(initialValue);

      return {
        value,
        toggle: () => {
          setValue(
            (current) => !current
          );
        },
      };
    }

---

## `useDebounce`

    function useDebounce<T>(
      value: T,
      delay: number
    ) {
      const [result, setResult] =
        useState(value);

      useEffect(() => {
        const timer = setTimeout(() => {
          setResult(value);
        }, delay);

        return () => {
          clearTimeout(timer);
        };
      }, [value, delay]);

      return result;
    }

---

## `usePrevious`

    function usePrevious<T>(
      value: T
    ) {
      const ref = useRef<T>();

      useEffect(() => {
        ref.current = value;
      }, [value]);

      return ref.current;
    }

---

## `useAuth`

    function useAuth() {
      const context =
        useContext(AuthContext);

      if (context === null) {
        throw new Error(
          "useAuth must be used inside AuthProvider"
        );
      }

      return context;
    }

---

# Головна схема

Запам'ятай так:

    Component
        ↓
    useSomething()
        ↓
    Custom Hook
        ↓
    ┌─────────────────────┐
    │ useState             │
    │ useEffect            │
    │ useRef               │
    │ useReducer            │
    │ useContext            │
    │ other Custom Hooks   │
    └─────────────────────┘
        ↓
    reusable logic
        ↓
    Component
        ↓
    JSX

---

# Головна ідея

Custom Hook — це не "ще один вид компонента".

Це спосіб **винести та повторно використовувати React-логіку**.

Найважливіше розуміти:

    Component
        =
    UI + logic

можна поступово перетворити на:

    Component
        =
    UI

    Custom Hook
        =
    reusable logic

Наприклад:

    function UserPage() {
      const {
        users,
        loading,
        error,
        refresh,
      } = useUsers();

      // UI
    }

А всередині:

    useUsers()
        ↓
    useState / useReducer
        ↓
    useEffect
        ↓
    fetch
        ↓
    state
        ↓
    return API

---

# Головне, що потрібно запам'ятати

1. **Custom Hook — це функція для повторного використання React-логіки.**

2. Назва Custom Hook повинна починатися з `use`.

3. Custom Hook може використовувати інші Hooks.

4. Custom Hook може використовувати інші Custom Hooks.

5. Custom Hook зазвичай повертає дані та функції, а не JSX.

6. Кожен виклик Custom Hook має власний state.

7. Custom Hook сам по собі не створює global state.

8. Hooks не можна викликати умовно, у циклах або вкладених функціях.

9. Якщо логіка не використовує React Hooks — часто достатньо звичайної utility function.

10. `useState`, `useEffect`, `useReducer`, `useContext`, `useRef` можна комбінувати всередині Custom Hook.

11. `Context + Custom Hook` — дуже поширений патерн для зручного API.

12. `useReducer + Context + Custom Hook` — корисний патерн для складнішого shared state.

13. Browser API (`window`, `localStorage`, `document`) потребують уваги до Client/Server межі в Next.js.

14. Side effects повинні бути в `useEffect` або відповідному event handler, а не під час render.

15. Не потрібно створювати Custom Hook для кожної функції.

16. Хороший Custom Hook приховує складність, але не створює зайву магію.

17. Хороший Custom Hook має маленький, зрозумілий API.

18. Custom Hooks — це насамперед **композиція та повторне використання логіки**.

---

# Ментальна модель

Найпростіше запам'ятати:

    Custom Hook
        =
    "Я хочу винести цю React-логіку
     з компонента і мати можливість
     використовувати її ще раз."

Тоді:

    useCounter()
        → керує counter logic

    useToggle()
        → керує boolean logic

    useDebounce()
        → керує debounce logic

    useLocalStorage()
        → керує localStorage logic

    useOnlineStatus()
        → керує online/offline logic

    useAuth()
        → дає доступ до auth logic

    useCart()
        → керує cart logic

    useUsers()
        → керує users/data logic

І компонент залишається зосередженим насамперед на тому, що він **відображає**.

> **Custom Hook = reusable behavior, Component = UI.**