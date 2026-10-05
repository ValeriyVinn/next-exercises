# 02. useEffect

`useEffect` — це React Hook, який дозволяє синхронізувати компонент із зовнішньою системою та виконувати side effects після render.

Типові приклади:

    API requests
    subscriptions
    timers
    event listeners
    browser APIs
    DOM integrations
    WebSocket connections
    synchronization with external systems

Базовий синтаксис:

    useEffect(() => {
        // side effect

        return () => {
            // cleanup
        };
    }, [dependencies]);

`useEffect` працює після того, як React виконав render і оновив DOM.

---

# Ключові поняття

✔ `useEffect`  
✔ Hook  
✔ Effect  
✔ side effect  
✔ synchronization  
✔ render  
✔ commit  
✔ dependency array  
✔ dependencies  
✔ cleanup function  
✔ effect function  
✔ effect lifecycle  
✔ mount  
✔ update  
✔ unmount  
✔ re-run  
✔ cleanup  
✔ stale closure  
✔ infinite effect loop  
✔ race condition  
✔ data fetching  
✔ subscription  
✔ event listener  
✔ timer  
✔ external system  

---

# Що потрібно пам'ятати

• `useEffect` використовується для side effects.

• Effect запускається після commit.

• Effect може залежати від state або props.

• Dependency array визначає, коли effect повинен повторно виконуватися.

• Cleanup function використовується для очищення side effect.

• Cleanup запускається перед наступним запуском effect, якщо dependencies змінилися.

• Cleanup також запускається, коли компонент unmount.

• Порожній dependency array:

    []

означає, що effect не залежить від реактивних значень.

• Effect без dependency array запускається після кожного commit.

• Не кожен код, який виконується після render, потребує `useEffect`.

• Derived values зазвичай потрібно обчислювати під час render, а не через `useEffect`.

• Якщо потрібно реагувати на user event, часто краще виконати логіку безпосередньо в event handler.

• `useEffect` потрібен насамперед для синхронізації з external systems.

---

# Import useEffect

    import { useEffect } from "react";

Наприклад:

    import { useEffect } from "react";

    function Component() {
        useEffect(() => {
            console.log("Effect");
        });

        return <div>Hello</div>;
    }

---

# Базовий синтаксис

    useEffect(() => {
        // effect
    });

Можна передати dependency array:

    useEffect(() => {
        // effect
    }, []);

Або dependencies:

    useEffect(() => {
        // effect
    }, [value]);

Повний варіант із cleanup:

    useEffect(() => {
        // effect

        return () => {
            // cleanup
        };
    }, [value]);

---

# Що таке Effect

Effect — код, який виконується після render/commit для взаємодії із зовнішньою системою.

Наприклад:

    useEffect(() => {
        document.title = "Hello";
    });

Тут React-компонент взаємодіє з browser API:

    document.title

---

# Side Effect

Side effect — операція, яка взаємодіє із зовнішнім світом або має побічний ефект за межами простого обчислення JSX.

Приклади:

    document.title = "..."
    
    localStorage.setItem(...)

    window.addEventListener(...)

    setInterval(...)

    fetch(...)

    WebSocket connection

    subscribe(...)

---

# Pure Render vs Effect

Render компонента бажано робити максимально pure.

Наприклад:

    function UserCard({ user }) {
        const fullName =
            `${user.firstName} ${user.lastName}`;

        return <p>{fullName}</p>;
    }

Тут немає side effect.

`fullName` можна просто обчислити.

Не потрібно:

    const [fullName, setFullName] = useState("");

    useEffect(() => {
        setFullName(
            `${user.firstName} ${user.lastName}`
        );
    }, [user]);

Це зайвий Effect.

Краще:

    const fullName =
        `${user.firstName} ${user.lastName}`;

---

# Effect Flow

Спрощена модель:

    render
      ↓
    DOM update / commit
      ↓
    effect
      ↓
    external system

Наприклад:

    render
      ↓
    component committed
      ↓
    useEffect()
      ↓
    fetch / subscription / timer

---

# Render ≠ Effect

Це дуже важливо.

Render:

    component function
        ↓
    calculate UI

Effect:

    synchronize with external system

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        return (
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        );
    }

Тут Effect взагалі не потрібен.

---

# Effect без Dependency Array

Наприклад:

    useEffect(() => {
        console.log("Effect");
    });

Такий Effect запускається після кожного commit.

Якщо компонент renderиться:

    render 1
    render 2
    render 3

effect також може виконатися:

    effect 1
    effect 2
    effect 3

Це може бути корисно в рідкісних випадках, але часто потрібно вказувати dependencies.

---

# Empty Dependency Array

Синтаксис:

    useEffect(() => {
        console.log("Effect");
    }, []);

Effect не має reactive dependencies.

У типовому випадку він запускається після initial commit.

Наприклад:

    useEffect(() => {
        console.log("Component mounted");
    }, []);

Але важливо:

У development Strict Mode React може додатково виконати setup + cleanup для перевірки коректності Effect.

Тому не слід покладатися на Effect як на механізм:

    "виконати рівно один раз за весь час існування програми"

---

# Dependency Array

Наприклад:

    useEffect(() => {
        console.log(count);
    }, [count]);

Effect залежить від:

    count

Коли `count` змінюється, Effect може запуститися знову.

Модель:

    render
      ↓
    compare dependencies
      ↓
    dependency changed?
      ↓
    yes
      ↓
    effect

---

# Dependencies

Dependencies — reactive values, від яких залежить Effect.

Наприклад:

    function User({ userId }) {
        useEffect(() => {
            console.log(userId);
        }, [userId]);

        return <div />;
    }

`userId` — dependency.

Якщо `userId` зміниться:

    effect

запуститься знову.

---

# Dependency Comparison

React порівнює dependency values між renders.

Для dependencies використовується порівняння, яке концептуально відповідає:

    Object.is()

Наприклад:

    1 → 1

значення не змінилося.

А:

    1 → 2

змінилося.

Для object:

    {} !== {}

Для array:

    [] !== []

Тому reference identity має значення.

---

# Primitive Dependencies

Наприклад:

    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(count);
    }, [count]);

Якщо:

    count: 0 → 1

Effect запускається знову.

Якщо:

    count: 1 → 1

dependency не змінилася.

---

# Object Dependencies

Наприклад:

    const user = {
        name: "John"
    };

    useEffect(() => {
        console.log(user);
    }, [user]);

Якщо на кожному render створюється новий object:

    const user = {
        name: "John"
    };

то reference може бути новим на кожному render.

Тому Effect може запускатися частіше, ніж очікується.

---

# Array Dependencies

Те саме стосується array.

Наприклад:

    const items = [];

    useEffect(() => {
        console.log(items);
    }, [items]);

Кожне:

    []

створює новий reference.

Тому dependency може вважатися зміненою.

---

# Cleanup Function

Effect може повернути функцію cleanup.

    useEffect(() => {
        // setup

        return () => {
            // cleanup
        };
    }, []);

Cleanup потрібен для:

    event listeners
    subscriptions
    timers
    WebSocket connections
    external resources

---

# Cleanup Example

    useEffect(() => {
        const timerId = setInterval(() => {
            console.log("tick");
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

Effect створює:

    interval

Cleanup видаляє:

    interval

---

# Effect Lifecycle

Для Effect з dependencies:

    setup
      ↓
    dependency changes
      ↓
    cleanup
      ↓
    setup again
      ↓
    dependency changes
      ↓
    cleanup
      ↓
    setup again

Коли component unmount:

    cleanup

---

# Cleanup Before Next Effect

Наприклад:

    useEffect(() => {
        console.log("setup");

        return () => {
            console.log("cleanup");
        };
    }, [count]);

Якщо `count` зміниться:

    cleanup
      ↓
    setup

Не:

    setup
      ↓
    setup

---

# Cleanup on Unmount

Наприклад:

    useEffect(() => {
        const timerId = setInterval(() => {
            console.log("tick");
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

Коли компонент видаляється:

    unmount
      ↓
    cleanup
      ↓
    clearInterval()

---

# Event Listener

Один із класичних прикладів.

    useEffect(() => {
        function handleResize() {
            console.log(window.innerWidth);
        }

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

Effect:

    addEventListener()

Cleanup:

    removeEventListener()

---

# Чому Cleanup важливий

Без cleanup:

    component mount
        ↓
    add listener

    component unmount
        ↓
    listener remains

Після повторного mount можна отримати:

    multiple listeners

Це може призвести до:

    memory leaks
    duplicated handlers
    unnecessary work
    incorrect behavior

---

# Timer

Наприклад:

    useEffect(() => {
        const timerId = setTimeout(() => {
            console.log("Hello");
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, []);

Cleanup:

    clearTimeout(timerId)

---

# setInterval

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log("tick");
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

---

# document.title

Effect може синхронізувати browser document.

    useEffect(() => {
        document.title = `Count: ${count}`;
    }, [count]);

Тут:

    count
        ↓
    document.title

Effect залежить від:

    count

---

# Local Storage

Наприклад:

    useEffect(() => {
        localStorage.setItem(
            "theme",
            theme
        );
    }, [theme]);

Коли:

    theme

змінюється, Effect синхронізує його з:

    localStorage

---

# Reading Local Storage

Наприклад:

    useEffect(() => {
        const savedTheme =
            localStorage.getItem("theme");

        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

Тут Effect читає browser API після mount.

Для Next.js це особливо важливо, тому що:

    localStorage

існує тільки в browser.

---

# Fetch

`useEffect` часто використовують для data fetching.

Наприклад:

    useEffect(() => {
        fetch("/api/users")
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            });
    }, []);

Модель:

    component commit
        ↓
    effect
        ↓
    fetch
        ↓
    response
        ↓
    setUsers()
        ↓
    re-render

---

# Async Function у Effect

Не потрібно робити:

    useEffect(async () => {
        ...
    }, []);

Effect callback не повинен безпосередньо повертати Promise як cleanup.

Краще створити async function всередині:

    useEffect(() => {
        async function loadUsers() {
            const response =
                await fetch("/api/users");

            const data =
                await response.json();

            setUsers(data);
        }

        loadUsers();
    }, []);

---

# Fetch з Dependency

Наприклад:

    const [userId, setUserId] = useState(1);

    useEffect(() => {
        async function loadUser() {
            const response =
                await fetch(`/api/users/${userId}`);

            const data =
                await response.json();

            setUser(data);
        }

        loadUser();
    }, [userId]);

Тепер:

    userId changes
        ↓
    Effect runs
        ↓
    fetch new user

---

# Fetch Cleanup

Для fetch важливо враховувати ситуацію, коли старий request завершується після нового.

Можна використовувати:

    AbortController

Наприклад:

    useEffect(() => {
        const controller =
            new AbortController();

        async function loadUser() {
            try {
                const response = await fetch(
                    `/api/users/${userId}`,
                    {
                        signal: controller.signal
                    }
                );

                const data =
                    await response.json();

                setUser(data);
            } catch (error) {
                if (
                    error instanceof DOMException &&
                    error.name === "AbortError"
                ) {
                    return;
                }

                console.error(error);
            }
        }

        loadUser();

        return () => {
            controller.abort();
        };
    }, [userId]);

---

# Race Condition

При data fetching можлива race condition.

Наприклад:

    userId = 1
        ↓
    request A

    userId = 2
        ↓
    request B

Request B може завершитися раніше.

А потім:

    request A
        ↓
    response later

і старі дані можуть перезаписати нові.

Cleanup + AbortController допомагають контролювати такі ситуації.

---

# Effect та State Update

Effect може оновлювати state.

Наприклад:

    useEffect(() => {
        setCount(10);
    }, []);

Це викличе state update.

Модель:

    render
      ↓
    effect
      ↓
    setCount(10)
      ↓
    re-render
      ↓
    effect dependencies?
      ↓
    ...

Потрібно уважно проектувати dependencies, щоб не створити loop.

---

# Infinite Effect Loop

Небезпечний pattern:

    useEffect(() => {
        setCount(count + 1);
    }, [count]);

Що відбувається:

    count changes
        ↓
    effect runs
        ↓
    setCount()
        ↓
    count changes
        ↓
    effect runs
        ↓
    setCount()
        ↓
    ...

Це може створити infinite update loop.

---

# Як уникати Infinite Effect Loops

Потрібно запитати:

    Чи дійсно Effect повинен змінювати
    state, який є його dependency?

Якщо Effect не синхронізує external system, можливо, `useEffect` взагалі не потрібен.

Наприклад:

❌

    const [fullName, setFullName] = useState("");

    useEffect(() => {
        setFullName(
            `${firstName} ${lastName}`
        );
    }, [firstName, lastName]);

Краще:

    const fullName =
        `${firstName} ${lastName}`;

---

# Effect як Synchronization

Одна з найкращих моделей мислення:

    useEffect

не просто:

    "запустити код після render"

а:

    "синхронізувати React component
     з external system"

External system може бути:

    browser API
    network
    subscription
    timer
    DOM library
    WebSocket
    third-party widget

---

# External System

Наприклад:

    window
    document
    localStorage
    WebSocket
    server
    browser events
    third-party library

Effect часто є bridge:

    React
      ↕
    external system

---

# Коли useEffect НЕ потрібен

Це дуже важлива тема.

Не потрібно використовувати Effect просто тому, що:

    "я хочу виконати щось після render"

Наприклад:

    const fullName =
        `${firstName} ${lastName}`;

Не потрібно:

    useEffect(() => {
        setFullName(...);
    }, [firstName, lastName]);

---

# Event Handler vs Effect

Якщо дія є прямою реакцією на user event, часто краще використовувати event handler.

Наприклад:

    function handleSubmit(event) {
        event.preventDefault();

        fetch("/api/users", {
            method: "POST"
        });
    }

Не потрібно переносити цей fetch у Effect просто через те, що він є side effect.

User action:

    click submit
        ↓
    handleSubmit
        ↓
    fetch

Це природніше, ніж:

    click
        ↓
    setState
        ↓
    Effect
        ↓
    fetch

---

# Effect vs Event Handler

Event handler:

    user action
        ↓
    handler
        ↓
    side effect

Effect:

    render/state/props
        ↓
    synchronization
        ↓
    external system

Приклад event:

    button click
        ↓
    submit form

Приклад Effect:

    userId changed
        ↓
    synchronize with server data

---

# Derived Data vs Effect

❌ Погано:

    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(price * quantity);
    }, [price, quantity]);

Краще:

    const total = price * quantity;

Причина:

    total

є derived value.

---

# Transform Data During Render

Наприклад:

    const visibleUsers =
        users.filter(user => user.active);

Не потрібно:

    const [visibleUsers, setVisibleUsers] =
        useState([]);

    useEffect(() => {
        setVisibleUsers(
            users.filter(user => user.active)
        );
    }, [users]);

Render-time calculation простіший.

---

# useMemo vs useEffect

Якщо потрібно оптимізувати дороге обчислення:

    useMemo

може бути відповідним інструментом.

Наприклад:

    const visibleUsers = useMemo(() => {
        return users.filter(
            user => user.active
        );
    }, [users]);

`useEffect` не призначений для memoization.

---

# Effect Dependencies

При написанні Effect потрібно визначити:

    Які reactive values
    використовуються всередині Effect?

Наприклад:

    useEffect(() => {
        console.log(userId);
        console.log(filter);
    }, [userId, filter]);

Dependencies:

    userId
    filter

---

# Reactive Values

У React до reactive values належать, зокрема:

    props
    state
    values/functions declared inside component

Наприклад:

    function Component({ userId }) {
        const [filter, setFilter] =
            useState("all");

        useEffect(() => {
            console.log(userId);
            console.log(filter);
        }, [userId, filter]);

        ...
    }

Effect використовує:

    userId
    filter

тому вони повинні бути враховані як dependencies.

---

# Dependency Array Не Є "Optimization List"

Не потрібно думати:

    [count]

як:

    "запусти effect тільки тоді,
     коли я хочу"

Dependency array описує:

    від яких reactive values
    залежить Effect

Тобто dependencies повинні відповідати коду Effect.

---

# Empty Dependency Array Не Означає "Never Again"

    useEffect(() => {
        ...
    }, []);

Це означає:

    Effect не має dependencies

а не універсальне:

    "виконай один раз за всю програму"

Компонент може:

    mount
    unmount
    mount again

і Effect буде виконаний для нового mount.

У development Strict Mode також можливий додатковий setup/cleanup цикл.

---

# Strict Mode

У development React Strict Mode може виконати Effect приблизно так:

    setup
      ↓
    cleanup
      ↓
    setup

Це допомагає виявити проблеми з Effect.

Наприклад:

    missing cleanup
    duplicated subscriptions
    incorrect initialization

Тому cleanup має бути коректним і симетричним setup.

---

# Setup / Cleanup Symmetry

Якщо Effect робить:

    addEventListener()

cleanup повинен робити:

    removeEventListener()

Якщо Effect робить:

    setInterval()

cleanup:

    clearInterval()

Якщо Effect створює:

    WebSocket

cleanup повинен:

    close()

Це називається симетричним setup/cleanup.

---

# Subscription

Наприклад:

    useEffect(() => {
        const unsubscribe =
            subscribeToMessages(message => {
                console.log(message);
            });

        return () => {
            unsubscribe();
        };
    }, []);

Effect:

    subscribe

Cleanup:

    unsubscribe

---

# WebSocket

Спрощений приклад:

    useEffect(() => {
        const socket =
            new WebSocket(
                "wss://example.com"
            );

        socket.onmessage = event => {
            console.log(event.data);
        };

        return () => {
            socket.close();
        };
    }, []);

Lifecycle:

    mount
      ↓
    connect
      ↓
    messages
      ↓
    unmount
      ↓
    close

---

# Effect з Props

Наприклад:

    function User({ userId }) {
        useEffect(() => {
            console.log(
                "Load user:",
                userId
            );
        }, [userId]);

        return <div />;
    }

Коли:

    userId: 1 → 2

Effect запускається знову.

---

# Effect з State

Наприклад:

    const [theme, setTheme] =
        useState("light");

    useEffect(() => {
        document.body.dataset.theme =
            theme;
    }, [theme]);

State:

    theme

впливає на external system:

    document.body

---

# Effect with Multiple Dependencies

    useEffect(() => {
        console.log(
            userId,
            language,
            theme
        );
    }, [
        userId,
        language,
        theme
    ]);

Effect може залежати від кількох values.

Якщо зміниться хоча б одна dependency:

    effect

може запуститися знову.

---

# Cleanup with Dependencies

    useEffect(() => {
        const connection =
            connect(roomId);

        return () => {
            connection.disconnect();
        };
    }, [roomId]);

При:

    roomId = 1

створюється connection до room 1.

При:

    roomId = 2

React:

    cleanup room 1
        ↓
    setup room 2

---

# Effect Lifecycle Example

    roomId = 1

    render
      ↓
    commit
      ↓
    setup connection 1

Потім:

    roomId = 2

    render
      ↓
    commit
      ↓
    cleanup connection 1
      ↓
    setup connection 2

Потім component unmount:

    cleanup connection 2

---

# Stale Closure

Effect та callback можуть захоплювати values конкретного render.

Наприклад:

    function Component() {
        const [count, setCount] =
            useState(0);

        useEffect(() => {
            const id = setInterval(() => {
                console.log(count);
            }, 1000);

            return () => {
                clearInterval(id);
            };
        }, []);

        ...
    }

Effect створений із snapshot, де:

    count === 0

і callback може продовжувати бачити це значення.

Це один із варіантів:

    stale closure

---

# Stale Closure та Dependencies

Якщо Effect повинен реагувати на `count`:

    useEffect(() => {
        const id = setInterval(() => {
            console.log(count);
        }, 1000);

        return () => {
            clearInterval(id);
        };
    }, [count]);

Тепер при зміні:

    count

Effect буде перебудований.

Але не завжди додавання dependency є найкращим рішенням — потрібно розуміти, яку саме synchronization behavior ми хочемо отримати.

---

# Effect Events

У сучасному React існують окремі підходи для ситуацій, коли Effect повинен використовувати актуальні значення, але не повинен повторно синхронізуватися через кожну зміну цих значень.

Для базового рівня достатньо спочатку добре засвоїти:

    dependencies
    cleanup
    stale closures
    event handlers

Пізніше можна розглянути:

    Effect Events
    useEffectEvent

---

# useEffect та useRef

`useRef` часто використовується разом із `useEffect`.

Наприклад:

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

Тут:

    useRef
        ↓
    DOM reference

    useEffect
        ↓
    focus after commit

`useRef` буде детально розглядатися в:

    03-use-ref

---

# useEffect та DOM

Наприклад:

    useEffect(() => {
        document.body.style.overflow =
            "hidden";

        return () => {
            document.body.style.overflow =
                "";
        };
    }, []);

Effect змінює DOM/browser state.

Cleanup повертає попередній стан.

---

# Effect для Browser API

Приклади:

    window
    document
    localStorage
    sessionStorage
    navigator
    matchMedia

Наприклад:

    useEffect(() => {
        const mediaQuery =
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            );

        console.log(
            mediaQuery.matches
        );
    }, []);

---

# Effect для Third-Party Library

Наприклад, компонент інтегрується з бібліотекою:

    useEffect(() => {
        const chart =
            createChart(container);

        chart.render(data);

        return () => {
            chart.destroy();
        };
    }, [data]);

React:

    component

синхронізується з:

    external library

---

# Effect та Third-Party Widget

Загальна модель:

    useEffect(() => {
        const widget =
            createWidget(element);

        widget.update(value);

        return () => {
            widget.destroy();
        };
    }, [value]);

---

# Effect та Data Fetching

Типова структура:

    const [data, setData] =
        useState(null);

    const [isLoading, setIsLoading] =
        useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const response =
                    await fetch("/api/data");

                const result =
                    await response.json();

                setData(result);
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, []);

Для реальних applications також потрібно враховувати:

    errors
    cancellation
    race conditions
    caching
    refetching
    loading states

---

# Error State

Наприклад:

    const [error, setError] =
        useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                const response =
                    await fetch("/api/data");

                if (!response.ok) {
                    throw new Error(
                        "Request failed"
                    );
                }

                const data =
                    await response.json();

                setData(data);
            } catch (error) {
                setError(error);
            }
        }

        loadData();
    }, []);

---

# Loading State

    const [isLoading, setIsLoading] =
        useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                ...
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, []);

UI:

    {isLoading && (
        <p>Loading...</p>
    )}

---

# Full Fetch Pattern

Спрощений pattern:

    const [data, setData] =
        useState(null);

    const [isLoading, setIsLoading] =
        useState(true);

    const [error, setError] =
        useState(null);

    useEffect(() => {
        const controller =
            new AbortController();

        async function loadData() {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(
                    "/api/data",
                    {
                        signal:
                            controller.signal
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        "Request failed"
                    );
                }

                const result =
                    await response.json();

                setData(result);
            } catch (error) {
                if (
                    error instanceof DOMException &&
                    error.name === "AbortError"
                ) {
                    return;
                }

                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        loadData();

        return () => {
            controller.abort();
        };
    }, []);

---

# Effect Dependency Rules

Умовно можна запам'ятати:

    useEffect(fn)
        ↓
    after every commit

    useEffect(fn, [])
        ↓
    no reactive dependencies

    useEffect(fn, [a])
        ↓
    synchronize with a

    useEffect(fn, [a, b])
        ↓
    synchronize with a and b

---

# Empty Array

    useEffect(() => {
        ...
    }, []);

Use case:

    setup subscription
    initialize external integration
    read browser state
    initial data loading

Але cleanup все одно може бути потрібен.

---

# No Dependency Array

    useEffect(() => {
        ...
    });

Effect після кожного commit.

Потрібно використовувати обережно.

---

# Dependency Array with Value

    useEffect(() => {
        ...
    }, [count]);

Effect залежить від:

    count

---

# Cleanup Pattern

Запам'ятай:

    useEffect(() => {
        // setup

        return () => {
            // cleanup
        };
    }, [dependencies]);

Типові пари:

    addEventListener
        ↕
    removeEventListener

    setInterval
        ↕
    clearInterval

    setTimeout
        ↕
    clearTimeout

    subscribe
        ↕
    unsubscribe

    connect
        ↕
    disconnect

    create
        ↕
    destroy

---

# useEffect та Strict Mode

У development Strict Mode React може перевірити Effect:

    setup
      ↓
    cleanup
      ↓
    setup

Тому Effect повинен бути безпечним для такого циклу.

Наприклад:

    useEffect(() => {
        const id = setInterval(...);

        return () => {
            clearInterval(id);
        };
    }, []);

Це коректно.

---

# Типові помилки

❌ Використовувати `useEffect` для derived data.

    useEffect(() => {
        setFullName(
            `${firstName} ${lastName}`
        );
    }, [firstName, lastName]);

Краще:

    const fullName =
        `${firstName} ${lastName}`;

---

❌ Використовувати Effect для звичайного event.

Наприклад, submit:

    function handleSubmit() {
        fetch(...);
    }

не потрібно без причини переносити в Effect.

---

❌ Забувати cleanup.

    useEffect(() => {
        window.addEventListener(
            "resize",
            handleResize
        );
    }, []);

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

❌ Створювати infinite loop.

    useEffect(() => {
        setCount(count + 1);
    }, [count]);

---

❌ Ігнорувати dependencies.

Наприклад:

    useEffect(() => {
        fetch(`/api/users/${userId}`);
    }, []);

Якщо Effect повинен реагувати на `userId`, dependency має бути врахована:

    useEffect(() => {
        fetch(`/api/users/${userId}`);
    }, [userId]);

---

❌ Створювати unstable object dependency.

    const options = {
        roomId
    };

    useEffect(() => {
        connect(options);
    }, [options]);

`options` може бути новим object на кожному render.

Краще залежно від ситуації:

    useEffect(() => {
        const options = {
            roomId
        };

        connect(options);

        return () => {
            disconnect(options);
        };
    }, [roomId]);

---

❌ Робити Effect занадто великим.

Наприклад один Effect:

    fetch data
    update title
    subscribe
    save localStorage
    attach events

Краще розділяти незалежні synchronization processes.

---

# Один Effect — одна логічна синхронізація

Наприклад:

    useEffect(() => {
        document.title = title;
    }, [title]);

І окремо:

    useEffect(() => {
        localStorage.setItem(
            "theme",
            theme
        );
    }, [theme]);

Так код легше читати та підтримувати.

---

# Effect та Functions

Функції, оголошені всередині компонента, можуть мати нову reference identity на кожному render.

Наприклад:

    function Component() {
        function createOptions() {
            return {
                roomId
            };
        }

        useEffect(() => {
            const options =
                createOptions();

            ...
        }, [createOptions]);

        ...
    }

Це може спричиняти повторні Effect runs.

Іноді функцію можна перемістити всередину Effect:

    useEffect(() => {
        function createOptions() {
            return {
                roomId
            };
        }

        const options =
            createOptions();

        ...
    }, [roomId]);

Не потрібно автоматично використовувати `useCallback` для кожної функції.

---

# useEffect та useCallback

Іноді Effect залежить від function.

Наприклад:

    const createOptions = useCallback(() => {
        return {
            roomId
        };
    }, [roomId]);

    useEffect(() => {
        const options =
            createOptions();

        ...
    }, [createOptions]);

Але це не означає, що `useCallback` завжди потрібен.

Спочатку потрібно спростити Effect та dependencies.

`useCallback` буде детально розглядатися в:

    06-use-callback

---

# useEffect та useMemo

`useMemo`:

    memoize calculation

`useEffect`:

    synchronize with external system

Не слід використовувати:

    useEffect

для memoization.

Не слід використовувати:

    useMemo

як заміну Effect.

---

# useEffect та useRef

`useRef`:

    persist mutable value
    without re-render

`useEffect`:

    synchronize after commit

Разом вони часто використовуються для DOM:

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

---

# useEffect та useReducer

Для складного state:

    useReducer

може бути зручнішим за багато `useState`.

Effect при цьому може реагувати на state:

    const [state, dispatch] =
        useReducer(reducer, initialState);

    useEffect(() => {
        ...
    }, [state]);

`useReducer` буде розглядатися в:

    07-use-reducer

---

# useEffect та Custom Hooks

Якщо одна й та сама Effect-логіка повторюється, її можна винести в custom Hook.

Наприклад:

    function useWindowSize() {
        const [width, setWidth] =
            useState(window.innerWidth);

        useEffect(() => {
            function handleResize() {
                setWidth(
                    window.innerWidth
                );
            }

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

Пізніше це буде детально розглянуто у:

    08-custom-hooks

---

# Effect та Server Components

У Next.js:

    useEffect

працює тільки в Client Components.

Потрібно:

    "use client";

Наприклад:

    "use client";

    import { useEffect } from "react";

    export default function Page() {
        useEffect(() => {
            console.log("Client effect");
        }, []);

        return <div>Hello</div>;
    }

---

# Server vs Client

Server Component:

    server
      ↓
    render HTML / RSC
      ↓
    no useEffect

Client Component:

    browser
      ↓
    hydration / interaction
      ↓
    useEffect

Тому browser APIs:

    window
    document
    localStorage

зазвичай використовуються у Client Components.

---

# useEffect та SSR

На сервері Effect не виконується.

Наприклад:

    useEffect(() => {
        console.log("Hello");
    }, []);

цей код виконується у browser environment після client commit.

Це одна з причин, чому `useEffect` можна використовувати для browser-only APIs.

---

# Effect та Hydration

У Next.js Client Component може бути попередньо відрендерений, а потім hydrated у browser.

Effect запускається після client-side commit.

Тому:

    useEffect(() => {
        ...
    }, []);

часто використовується для browser-only synchronization.

---

# Practical Example — Document Title

    "use client";

    import {
        useEffect,
        useState
    } from "react";

    export default function Counter() {
        const [count, setCount] =
            useState(0);

        useEffect(() => {
            document.title =
                `Count: ${count}`;
        }, [count]);

        return (
            <button
                onClick={() =>
                    setCount(
                        prev => prev + 1
                    )
                }
            >
                {count}
            </button>
        );
    }

---

# Practical Example — Timer

    "use client";

    import {
        useEffect,
        useState
    } from "react";

    export default function Timer() {
        const [seconds, setSeconds] =
            useState(0);

        useEffect(() => {
            const id = setInterval(() => {
                setSeconds(
                    prev => prev + 1
                );
            }, 1000);

            return () => {
                clearInterval(id);
            };
        }, []);

        return <p>{seconds}</p>;
    }

---

# Practical Example — Window Resize

    "use client";

    import {
        useEffect,
        useState
    } from "react";

    export default function WindowWidth() {
        const [width, setWidth] =
            useState(0);

        useEffect(() => {
            function handleResize() {
                setWidth(
                    window.innerWidth
                );
            }

            handleResize();

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

        return (
            <p>
                Width: {width}
            </p>
        );
    }

---

# Practical Example — localStorage

    "use client";

    import {
        useEffect,
        useState
    } from "react";

    export default function Theme() {
        const [theme, setTheme] =
            useState("light");

        useEffect(() => {
            const savedTheme =
                localStorage.getItem(
                    "theme"
                );

            if (savedTheme) {
                setTheme(savedTheme);
            }
        }, []);

        useEffect(() => {
            localStorage.setItem(
                "theme",
                theme
            );
        }, [theme]);

        return (
            <button
                onClick={() =>
                    setTheme(prev =>
                        prev === "light"
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

# Practical Example — Fetch

    "use client";

    import {
        useEffect,
        useState
    } from "react";

    type User = {
        id: number;
        name: string;
    };

    export default function Users() {
        const [users, setUsers] =
            useState<User[]>([]);

        const [isLoading, setIsLoading] =
            useState(true);

        useEffect(() => {
            async function loadUsers() {
                try {
                    const response =
                        await fetch(
                            "/api/users"
                        );

                    if (!response.ok) {
                        throw new Error(
                            "Failed to load users"
                        );
                    }

                    const data =
                        await response.json();

                    setUsers(data);
                } finally {
                    setIsLoading(false);
                }
            }

            loadUsers();
        }, []);

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name}
                    </li>
                ))}
            </ul>
        );
    }

---

# Practical Example — Fetch with Dependency

    "use client";

    import {
        useEffect,
        useState
    } from "react";

    type User = {
        id: number;
        name: string;
    };

    export default function UserDetails({
        userId
    }: {
        userId: number;
    }) {
        const [user, setUser] =
            useState<User | null>(null);

        useEffect(() => {
            async function loadUser() {
                const response =
                    await fetch(
                        `/api/users/${userId}`
                    );

                const data =
                    await response.json();

                setUser(data);
            }

            loadUser();
        }, [userId]);

        if (!user) {
            return <p>Loading...</p>;
        }

        return (
            <p>{user.name}</p>
        );
    }

---

# Practical Example — Subscription

    useEffect(() => {
        const unsubscribe =
            subscribe(value => {
                setValue(value);
            });

        return () => {
            unsubscribe();
        };
    }, []);

Lifecycle:

    mount
      ↓
    subscribe
      ↓
    receive values
      ↓
    setState
      ↓
    re-render
      ↓
    unmount
      ↓
    unsubscribe

---

# Practical Example — WebSocket

    useEffect(() => {
        const socket =
            new WebSocket(
                "wss://example.com"
            );

        socket.onmessage = event => {
            console.log(
                event.data
            );
        };

        return () => {
            socket.close();
        };
    }, []);

---

# Practical Example — Synchronization

Наприклад, компонент повинен синхронізувати selected room з external connection:

    function ChatRoom({
        roomId
    }) {
        useEffect(() => {
            const connection =
                createConnection(
                    roomId
                );

            connection.connect();

            return () => {
                connection.disconnect();
            };
        }, [roomId]);

        return <div>Chat</div>;
    }

Логіка:

    roomId
      ↓
    connection
      ↓
    external system

---

# Effect Thinking

Перед написанням `useEffect` постав собі питання:

    1. Яка external system?

    2. З чим я синхронізую компонент?

    3. Які reactive values використовує Effect?

    4. Що потрібно зробити при cleanup?

    5. Що повинно викликати повторну synchronization?

    6. Чи можна виконати цю логіку
       під час render?

    7. Чи це насправді event,
       а не Effect?

---

# Effect Checklist

Перед створенням Effect:

    □ Чи є external system?

    □ Чи потрібен side effect?

    □ Які dependencies?

    □ Чи потрібен cleanup?

    □ Чи може dependency змінюватися?

    □ Чи не створюю я infinite loop?

    □ Чи не є значення derived?

    □ Чи не краще event handler?

---

# Effect Mental Model

Не думай:

    "useEffect = code after render"

Краще:

    "useEffect = synchronize component
     with an external system"

Наприклад:

    React state
        ↓
    useEffect
        ↓
    localStorage

або:

    React props
        ↓
    useEffect
        ↓
    WebSocket

або:

    React state
        ↓
    useEffect
        ↓
    document.title

---

# Питання зі співбесіди

Що таке `useEffect`?

Для чого використовується `useEffect`?

Що таке side effect?

Що таке external system?

Коли запускається Effect?

Що таке dependency array?

Що означає:

    useEffect(fn);

?

Що означає:

    useEffect(fn, []);

?

Що означає:

    useEffect(fn, [count]);

?

Що таке cleanup function?

Коли виконується cleanup?

Що відбувається перед повторним запуском Effect?

Що відбувається під час unmount?

Чому потрібно очищати event listeners?

Чому потрібно очищати timers?

Що таке dependency?

Як React порівнює dependencies?

Чому objects та arrays можуть створювати проблеми з dependencies?

Що таке stale closure?

Що таке infinite Effect loop?

Чому:

    useEffect(() => {
        setCount(count + 1);
    }, [count]);

може створити infinite loop?

Коли `useEffect` не потрібен?

Чим Effect відрізняється від event handler?

Чому derived values часто не потрібно зберігати через Effect?

Як працює `useEffect` з fetch?

Як зробити cleanup для fetch?

Що таке `AbortController`?

Що таке race condition?

Чому не можна робити:

    useEffect(async () => {
        ...
    }, []);

?

Як правильно виконувати async operation всередині Effect?

Що таке Strict Mode і як він впливає на Effects у development?

Що таке setup/cleanup symmetry?

Чим `useEffect` відрізняється від `useMemo`?

Чим `useEffect` відрізняється від `useRef`?

Чи працює `useEffect` у Server Component?

Чому для `useEffect` у Next.js потрібен `"use client"`?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке Effect.

Що таке side effect.

Що таке external system.

`useEffect`.

Import:

    import { useEffect } from "react";

Базовий синтаксис:

    useEffect(() => {
        ...
    }, []);

Dependency array.

Dependencies.

Effect без dependencies.

Effect з `[]`.

Effect з `[value]`.

Cleanup function.

Cleanup при dependency change.

Cleanup при unmount.

Render → commit → Effect.

State + Effect.

Props + Effect.

Event listener.

Timer.

`setTimeout`.

`setInterval`.

`clearTimeout`.

`clearInterval`.

Browser APIs.

Основи data fetching.

Rules of Hooks.

---

# 🔵 Junior

Глибоке розуміння:

    dependencies
    cleanup
    effect lifecycle
    re-render
    mount
    unmount
    Strict Mode

Розуміння:

    stale closures
    infinite effect loops
    race conditions

Event handler vs Effect.

Derived values vs Effect.

Fetch у Effect.

Async function всередині Effect.

`AbortController`.

Subscriptions.

WebSocket basics.

`useEffect` + `useRef`.

`useEffect` + `useState`.

Next.js Client Components.

    "use client";

Розуміння dependency references.

Objects та arrays як dependencies.

Effect synchronization model.

---

# 🟠 Middle

Effect lifecycle.

Setup / cleanup symmetry.

Race conditions.

Request cancellation.

Subscriptions.

WebSockets.

External systems.

Third-party integrations.

Complex dependencies.

Stable references.

Stale closures.

Effect decomposition.

Separating independent synchronization processes.

Custom Hooks на основі Effects.

Effect + `useRef`.

Effect + `useReducer`.

Effect + `useCallback`.

Effect + `useMemo`.

Avoiding unnecessary Effects.

State architecture.

Data fetching architecture.

Client state vs server state.

---

# 🔴 Senior

Глибоке розуміння React Effects.

Render phase.

Commit phase.

Effect scheduling.

Passive Effects.

Effect lifecycle.

Fiber architecture.

Concurrent rendering.

Strict Mode.

Effect synchronization.

External store synchronization.

`useSyncExternalStore`.

Race conditions.

Cancellation.

Subscriptions.

Concurrent requests.

Stale closures.

Effect Events.

`useEffectEvent`.

Custom Hook architecture.

Server Components vs Client Components.

SSR / hydration.

Effect-driven architecture.

Avoiding Effect chains.

Avoiding redundant state.

Avoiding unnecessary synchronization.

Client/server data boundaries.

Performance implications Effects.

---

# Міні-шпаргалка

## useEffect

    useEffect(() => {
        // effect
    });

---

## Empty Dependencies

    useEffect(() => {
        // setup
    }, []);

---

## One Dependency

    useEffect(() => {
        // synchronize with count
    }, [count]);

---

## Multiple Dependencies

    useEffect(() => {
        // synchronize
    }, [
        userId,
        theme,
        language
    ]);

---

## Cleanup

    useEffect(() => {
        // setup

        return () => {
            // cleanup
        };
    }, []);

---

## Event Listener

    useEffect(() => {
        function handleResize() {
            console.log(
                window.innerWidth
            );
        }

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

## Timer

    useEffect(() => {
        const id = setInterval(() => {
            console.log("tick");
        }, 1000);

        return () => {
            clearInterval(id);
        };
    }, []);

---

## document.title

    useEffect(() => {
        document.title = `Count: ${count}`;
    }, [count]);

---

## localStorage

    useEffect(() => {
        localStorage.setItem(
            "theme",
            theme
        );
    }, [theme]);

---

## Fetch

    useEffect(() => {
        async function loadData() {
            const response =
                await fetch("/api/data");

            const data =
                await response.json();

            setData(data);
        }

        loadData();
    }, []);

---

## Fetch with Dependency

    useEffect(() => {
        async function loadUser() {
            const response =
                await fetch(
                    `/api/users/${userId}`
                );

            const data =
                await response.json();

            setUser(data);
        }

        loadUser();
    }, [userId]);

---

## AbortController

    useEffect(() => {
        const controller =
            new AbortController();

        async function loadData() {
            const response =
                await fetch("/api/data", {
                    signal:
                        controller.signal
                });

            const data =
                await response.json();

            setData(data);
        }

        loadData();

        return () => {
            controller.abort();
        };
    }, []);

---

## Subscription

    useEffect(() => {
        const unsubscribe =
            subscribe(handleChange);

        return () => {
            unsubscribe();
        };
    }, []);

---

## WebSocket

    useEffect(() => {
        const socket =
            new WebSocket(url);

        return () => {
            socket.close();
        };
    }, [url]);

---

## Основна модель

    render
      ↓
    commit
      ↓
    Effect
      ↓
    external system
      ↓
    cleanup
      ↓
    next Effect / unmount

---

## Dependencies

    useEffect(fn)
        ↓
    every commit

    useEffect(fn, [])
        ↓
    no reactive dependencies

    useEffect(fn, [value])
        ↓
    synchronize with value

---

## Cleanup

    setup
      ↓
    dependency changes
      ↓
    cleanup
      ↓
    setup again

або:

    setup
      ↓
    unmount
      ↓
    cleanup

---

## External Systems

    API
    WebSocket
    subscription
    timer
    DOM
    window
    document
    localStorage
    third-party library

---

## Не використовувати Effect для

    derived values
    simple calculations
    ordinary event handling
    values that can be calculated during render

---

# Головне

• `useEffect` — React Hook для synchronization із зовнішніми системами.

• Основний синтаксис:

    useEffect(() => {
        // effect
    }, [dependencies]);

• Effect виконується після commit.

• Dependency array визначає, коли Effect повинен повторно синхронізуватися.

• Без dependency array:

    useEffect(fn);

Effect запускається після кожного commit.

• З порожнім dependency array:

    useEffect(fn, []);

Effect не має reactive dependencies.

• З dependencies:

    useEffect(fn, [value]);

Effect реагує на зміни `value`.

• Cleanup повертається з Effect:

    return () => {
        // cleanup
    };

• Cleanup виконується перед наступним setup при зміні dependencies та при unmount.

• Типові setup/cleanup pairs:

    addEventListener
        ↕
    removeEventListener

    setInterval
        ↕
    clearInterval

    setTimeout
        ↕
    clearTimeout

    subscribe
        ↕
    unsubscribe

    connect
        ↕
    disconnect

    create
        ↕
    destroy

• Effect особливо корисний для:

    API requests
    subscriptions
    timers
    event listeners
    browser APIs
    WebSockets
    third-party libraries

• Не потрібно використовувати `useEffect` для кожного коду, який виконується після render.

• Якщо значення можна обчислити з props/state, часто краще зробити це під час render.

• Якщо дія є прямою реакцією на user event, часто краще використовувати event handler.

• Effect — це не просто:

    "run code after render"

Краще мислити:

    "synchronize React with an external system"

• Якщо Effect оновлює state, який є його dependency, можна випадково створити infinite loop.

• Якщо Effect використовує reactive value, ця value повинна бути правильно врахована серед dependencies.

• Objects і arrays мають reference identity, тому можуть спричиняти несподівані повторні Effect runs.

• Effect може мати stale closure, якщо callback бачить state/props конкретного render.

• Data fetching може вимагати:

    loading
    error
    cancellation
    race-condition handling

• Для cancellation fetch можна використовувати:

    AbortController

• Не потрібно робити:

    useEffect(async () => {
        ...
    }, []);

Краще створити async function всередині Effect.

• React Strict Mode у development може перевіряти Effect через:

    setup
      ↓
    cleanup
      ↓
    setup

• Тому cleanup повинен бути коректним і симетричним setup.

• У Next.js `useEffect` використовується в Client Components:

    "use client";

• `useEffect` не виконується на сервері.

• `useState` зберігає state.

• `useEffect` синхронізує component із зовнішньою системою.

Запам'ятай різницю:

    useState
        ↓
    state

    useEffect
        ↓
    synchronization

• Основна модель:

    React render
        ↓
    commit
        ↓
    useEffect
        ↓
    external system
        ↓
    cleanup
        ↓
    next synchronization

• Найважливіше питання перед написанням Effect:

    "З якою зовнішньою системою
     я зараз синхронізую React?"

Якщо відповіді немає, дуже ймовірно, що `useEffect` тут взагалі не потрібен.