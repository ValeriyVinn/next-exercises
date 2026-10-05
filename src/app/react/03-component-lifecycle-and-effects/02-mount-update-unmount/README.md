# React — 03. Component Lifecycle and Effects
## 02. Mount, Update, Unmount

Component lifecycle — це послідовність етапів, через які проходить React-компонент протягом свого існування.

Для функціональних компонентів важливо розуміти три основні етапи:

    Mount
      ↓
    Update
      ↓
    Unmount

Спрощено:

    component appears
          ↓
        MOUNT
          ↓
       UPDATE
          ↓
       UPDATE
          ↓
       UPDATE
          ↓
      UNMOUNT

Не кожний компонент обов'язково проходить багато `update`.

Компонент може:

    mount
      ↓
    unmount

або:

    mount
      ↓
    update
      ↓
    update
      ↓
    unmount

Lifecycle особливо важливий для розуміння:

    useEffect()
    dependencies
    cleanup
    subscriptions
    timers
    API requests
    external systems

---

# Ключові поняття

✔ lifecycle  
✔ component lifecycle  
✔ mount  
✔ initial render  
✔ commit  
✔ mounted component  
✔ update  
✔ re-render  
✔ state update  
✔ props update  
✔ context update  
✔ parent re-render  
✔ unmount  
✔ component removal  
✔ component identity  
✔ `key`  
✔ remount  
✔ cleanup  
✔ `useEffect()`  
✔ effect setup  
✔ effect cleanup  
✔ dependency array  
✔ lifecycle thinking  

---

# Що потрібно пам'ятати

• `Mount` — компонент уперше стає частиною committed UI.

• `Update` — компонент залишається змонтованим, але його props, state або context можуть змінитися, що призводить до нового rendering.

• `Unmount` — компонент видаляється з UI.

• Lifecycle можна спрощено уявити:

    mount
      ↓
    update
      ↓
    update
      ↓
    unmount

• Mount не означає просто "функція була викликана".

• Після rendering React виконує commit, після якого компонент стає частиною DOM/UI.

• Re-render не означає remount.

• Під час re-render component identity зберігається.

• Remount означає:

    unmount
      ↓
    mount

• Зміна `key` може призвести до remount компонента.

• State зберігається між re-renders, але при remount state створюється заново.

• `useEffect()` використовується для синхронізації компонента із зовнішніми системами.

• Effect може мати cleanup.

• Cleanup виконується перед наступним запуском effect, якщо dependencies змінилися, та під час unmount.

---

# Component Lifecycle

Загальна модель:

    MOUNT
      ↓
    render
      ↓
    commit
      ↓
    effect setup
      ↓
    UPDATE
      ↓
    render
      ↓
    commit
      ↓
    effect cleanup
      ↓
    effect setup
      ↓
    UPDATE
      ↓
    ...
      ↓
    UNMOUNT
      ↓
    effect cleanup

Це навчальна модель.

Реальна внутрішня робота React складніша.

---

# Mount

Mount — момент, коли компонент уперше стає частиною UI.

Наприклад:

    function App() {
        return <h1>Hello</h1>;
    }

Коли `<App />` вперше додається до React tree, компонент проходить mount.

Спрощено:

    <App />
       ↓
    render
       ↓
    commit
       ↓
    mounted

---

# Initial Render та Mount

Initial render і mount — пов'язані, але не абсолютно однакові поняття.

Initial render:

    React виконує початковий rendering.

Mount:

    компонент стає частиною committed UI.

Спрощено:

    initial render
          ↓
       commit
          ↓
        mount

---

# Mount Example

    function User() {
        return <h2>John</h2>;
    }

    function App() {
        return (
            <main>
                <User />
            </main>
        );
    }

Під час initial rendering:

    App
      ↓
    User
      ↓
    render
      ↓
    commit
      ↓
    User mounted

---

# Mount у Component Tree

Наприклад:

    App
     │
     ├── Header
     │
     └── Main
          │
          └── User

Якщо application запускається вперше, компоненти можуть пройти mount:

    App
    Header
    Main
    User

Після commit вони є частиною UI tree.

---

# Mount та `useEffect`

Effect setup запускається після commit.

Наприклад:

    import { useEffect } from "react";

    function User() {
        useEffect(() => {
            console.log("effect");

            return () => {
                console.log("cleanup");
            };
        }, []);

        return <h2>User</h2>;
    }

Спрощена модель:

    render
      ↓
    commit
      ↓
    effect setup

При unmount:

    unmount
      ↓
    cleanup

---

# Update

Update — це ситуація, коли вже змонтований компонент отримує новий стан або props/context і React виконує новий rendering.

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        return (
            <button
                onClick={() =>
                    setCount(previousCount => previousCount + 1)
                }
            >
                {count}
            </button>
        );
    }

Initial:

    count = 0

Після click:

    setCount(...)
        ↓
    update
        ↓
    render
        ↓
    commit

---

# Update не означає Mount

Після:

    setCount(1)

компонент не монтується заново.

Відбувається:

    update

а не:

    unmount
    +
    mount

Тому state компонента зберігається.

---

# Re-render під час Update

Типова модель:

    state change
       ↓
    re-render
       ↓
    reconciliation
       ↓
    commit
       ↓
    updated UI

Наприклад:

    count = 0

потім:

    setCount(1)

React отримує:

    count = 1

і виконує новий rendering.

---

# Props Update

Компонент може оновитися через зміну props.

Наприклад:

    function Greeting({ name }) {
        return <h1>Hello, {name}</h1>;
    }

    function App() {
        const [name, setName] = useState("John");

        return (
            <>
                <Greeting name={name} />

                <button
                    onClick={() => setName("Anna")}
                >
                    Change
                </button>
            </>
        );
    }

Initial:

    name = "John"

Потім:

    name = "Anna"

`Greeting` отримує новий prop.

Спрощено:

    App update
        ↓
    new prop
        ↓
    Greeting re-render
        ↓
    commit

---

# State Update

State update:

    setState(...)
        ↓
    update
        ↓
    render
        ↓
    commit

Наприклад:

    const [count, setCount] = useState(0);

    setCount(10);

Компонент отримує новий state:

    count = 10

і React може виконати новий rendering.

---

# Context Update

Компонент також може оновитися через context.

Спрощено:

    context value changes
          ↓
    consuming component
          ↓
    re-render
          ↓
    commit

Context буде детально розглядатися в:

    06-context

---

# Parent Update

Якщо parent re-render-иться, child component також може бути викликаний під час rendering.

Наприклад:

    function Parent() {
        const [count, setCount] = useState(0);

        return (
            <>
                <button
                    onClick={() =>
                        setCount(count + 1)
                    }
                >
                    {count}
                </button>

                <Child />
            </>
        );
    }

    function Child() {
        console.log("Child render");

        return <p>Child</p>;
    }

Після:

    setCount(...)

`Parent` re-render-иться.

`Child` також може бути повторно викликаний під час rendering.

Але:

    Child re-render
        ≠
    Child remount

---

# Unmount

Unmount — момент, коли компонент видаляється з React tree.

Наприклад:

    function App() {
        const [show, setShow] = useState(true);

        return (
            <>
                <button
                    onClick={() => setShow(!show)}
                >
                    Toggle
                </button>

                {show && <Panel />}
            </>
        );
    }

Якщо:

    show = true

маємо:

    Panel mounted

Якщо:

    show = false

маємо:

    Panel unmounted

---

# Conditional Rendering та Unmount

Наприклад:

    {isVisible && <Modal />}

Якщо:

    isVisible = true

`Modal` знаходиться в tree.

Якщо:

    isVisible = false

`Modal` видаляється з tree.

Відбувається:

    Modal
       ↓
    unmount

---

# Unmount не означає Re-render

При unmount компонент більше не бере участі в наступних renders цього місця.

Наприклад:

    {show && <Panel />}

При:

    show = false

відбувається:

    Panel
      ↓
    unmount

а не:

    Panel
      ↓
    render null

Хоча на рівні UI результатом може бути відсутність `Panel`.

---

# `return null` vs Unmount

Це важливе розрізнення.

Наприклад:

    function Panel({ visible }) {
        if (!visible) {
            return null;
        }

        return <div>Panel</div>;
    }

Компонент:

    Panel

продовжує існувати в React tree.

Він просто повертає:

    null

Тобто це не те саме, що:

    {visible && <Panel />}

У другому випадку `Panel` може бути unmounted.

---

# `return null`

Наприклад:

    function Message({ visible }) {
        if (!visible) {
            return null;
        }

        return <p>Hello</p>;
    }

При:

    visible = false

компонент все ще може отримувати renders.

Він просто не створює UI output.

---

# Conditional Component vs null

Варіант 1:

    {show && <Panel />}

Коли `show = false`:

    Panel → unmount

Варіант 2:

    function Panel({ show }) {
        if (!show) {
            return null;
        }

        return <div>Panel</div>;
    }

Тут:

    Panel → remains mounted
    Panel → returns null

Це принципово різні lifecycle scenarios.

---

# Remount

Remount — це:

    unmount
      ↓
    mount

Наприклад:

    <User key={userId} />

Якщо:

    userId = 1

потім:

    userId = 2

React може визначити нову component identity.

Тоді:

    User key=1
        ↓
    unmount

    User key=2
        ↓
    mount

---

# Re-render vs Remount

## Re-render

    component
       ↓
    render again
       ↓
    same identity
       ↓
    state preserved

---

## Remount

    old component
       ↓
    unmount
       ↓
    new component
       ↓
    mount
       ↓
    state initialized again

---

# State та Remount

Це дуже важливо.

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        return (
            <button
                onClick={() =>
                    setCount(count + 1)
                }
            >
                {count}
            </button>
        );
    }

Якщо `Counter` просто re-render-иться:

    count

зберігається.

Якщо `Counter` remount-иться:

    useState(0)

починає новий state lifecycle.

Тобто:

    remount
        ↓
    state reset

---

# Practical Remount Example

    function App() {
        const [userId, setUserId] = useState(1);

        return (
            <>
                <button onClick={() => setUserId(2)}>
                    Change user
                </button>

                <Profile key={userId} />
            </>
        );
    }

При зміні:

    key={1}
        ↓
    key={2}

React може сприйняти це як новий component identity.

Тоді:

    old Profile
        ↓
    unmount

    new Profile
        ↓
    mount

---

# Key як Identity

`key` особливо важливий у списках.

Наприклад:

    users.map(user => (
        <User
            key={user.id}
            user={user}
        />
    ))

React може використовувати:

    user.id

для визначення identity конкретного `User`.

Стабільний key допомагає React зберігати правильний state між updates.

---

# Index як Key

Наприклад:

    users.map((user, index) => (
        <User
            key={index}
            user={user}
        />
    ))

Це може бути проблематично, якщо порядок елементів змінюється.

Наприклад:

    [A, B, C]

стає:

    [C, A, B]

Якщо key — index, React може неправильно зіставити component identity.

Краще використовувати стабільний ID:

    key={user.id}

---

# Mount → Update → Unmount

Розглянемо типовий компонент:

    function Counter() {
        const [count, setCount] = useState(0);

        return (
            <button
                onClick={() =>
                    setCount(count + 1)
                }
            >
                {count}
            </button>
        );
    }

Lifecycle:

    MOUNT
      ↓
    count = 0
      ↓
    UPDATE
      ↓
    count = 1
      ↓
    UPDATE
      ↓
    count = 2
      ↓
    UNMOUNT

---

# Lifecycle Example з Effect

    function Timer() {
        useEffect(() => {
            console.log("mounted");

            return () => {
                console.log("unmounted");
            };
        }, []);

        return <p>Timer</p>;
    }

Спрощено:

    mount
      ↓
    effect setup

Потім:

    unmount
      ↓
    cleanup

Тобто:

    setup
      ↓
    component lives
      ↓
    cleanup

---

# Effect при Update

Розглянемо:

    function User({ userId }) {
        useEffect(() => {
            console.log(
                "subscribe:",
                userId
            );

            return () => {
                console.log(
                    "cleanup:",
                    userId
                );
            };
        }, [userId]);

        return <p>User: {userId}</p>;
    }

Initial:

    userId = 1

Маємо:

    render
      ↓
    commit
      ↓
    effect setup for 1

Якщо:

    userId = 2

тоді:

    render
      ↓
    commit
      ↓
    cleanup for 1
      ↓
    effect setup for 2

Це дуже важлива модель effects.

---

# Effect Cleanup перед наступним Effect

Якщо dependencies змінилися:

    old effect
        ↓
    cleanup
        ↓
    new effect

Наприклад:

    useEffect(() => {
        console.log("setup", userId);

        return () => {
            console.log("cleanup", userId);
        };
    }, [userId]);

При переході:

    userId 1 → 2

маємо:

    setup 1
       ↓
    cleanup 1
       ↓
    setup 2

---

# Effect Cleanup при Unmount

Якщо component unmount-иться:

    component
        ↓
    unmount
        ↓
    cleanup

Наприклад:

    useEffect(() => {
        const timer = setInterval(() => {
            console.log("tick");
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

При unmount:

    clearInterval(timer)

виконується в cleanup.

---

# Навіщо Cleanup

Cleanup потрібен для припинення або скасування того, що було створено effect.

Приклади:

    timer → clearInterval()
    event listener → removeEventListener()
    subscription → unsubscribe()
    connection → disconnect()
    observer → disconnect()

---

# Lifecycle та Timer

Наприклад:

    function Timer() {
        useEffect(() => {
            const intervalId = setInterval(() => {
                console.log("tick");
            }, 1000);

            return () => {
                clearInterval(intervalId);
            };
        }, []);

        return <p>Timer</p>;
    }

Lifecycle:

    mount
      ↓
    setup interval
      ↓
    component works
      ↓
    unmount
      ↓
    clearInterval

---

# Lifecycle та Event Listener

    function WindowWidth() {
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

        return <p>Resize window</p>;
    }

Lifecycle:

    mount
      ↓
    addEventListener
      ↓
    component active
      ↓
    unmount
      ↓
    removeEventListener

---

# Lifecycle та Subscription

Загальна модель:

    mount
      ↓
    subscribe
      ↓
    component active
      ↓
    update
      ↓
    cleanup old subscription
      ↓
    subscribe new
      ↓
    unmount
      ↓
    unsubscribe

Ця модель дуже важлива для:

    WebSocket
    event listeners
    external stores
    browser APIs
    subscriptions

---

# Lifecycle Thinking

Замість питання:

    "Коли React викликає component?"

корисніше думати:

    "З якою зовнішньою системою
     я синхронізую компонент?"

Наприклад:

    component
        ↓
    WebSocket connection

Тоді lifecycle:

    mount
      ↓
    connect

    update
      ↓
    reconnect if dependency changed

    unmount
      ↓
    disconnect

---

# Lifecycle як Synchronization

Effect краще розуміти не як:

    "код, який запускається після render"

а як:

    "синхронізація компонента
     із зовнішньою системою"

Наприклад:

    React state
        ↓
    effect
        ↓
    document.title

Або:

    React props
        ↓
    effect
        ↓
    WebSocket connection

---

# Mount / Update / Unmount у сучасному React

У старому class-based React часто використовували:

    componentDidMount()
    componentDidUpdate()
    componentWillUnmount()

У функціональних компонентах основним механізмом для side effects є:

    useEffect()

Наприклад:

    useEffect(() => {
        // setup

        return () => {
            // cleanup
        };
    }, [dependencies]);

---

# Старий Class Lifecycle

Для історичного розуміння:

    componentDidMount()
        ↓
    componentDidUpdate()
        ↓
    componentWillUnmount()

У сучасному React function components:

    useEffect(...)
        ↓
    setup
        ↓
    cleanup

Не потрібно переносити class lifecycle methods буквально один-в-один у `useEffect()`.

---

# Не "componentDidMount у function"

Частою помилкою є думати:

    useEffect(..., [])

означає:

    componentDidMount()

Це корисна приблизна аналогія для простих випадків, але не повна модель.

Краще думати:

    useEffect(..., [])

означає:

    "синхронізувати effect після commit
     і не повторювати його через dependency changes."

У development `StrictMode` також може виконувати додатковий setup/cleanup цикл.

---

# Lifecycle та Empty Dependency Array

Наприклад:

    useEffect(() => {
        console.log("setup");

        return () => {
            console.log("cleanup");
        };
    }, []);

У типовій production-моделі:

    mount
      ↓
    setup

    unmount
      ↓
    cleanup

У development з `StrictMode` можуть бути додаткові setup/cleanup виклики для перевірки коректності effect.

---

# Lifecycle та Dependencies

Наприклад:

    useEffect(() => {
        console.log(userId);
    }, [userId]);

Effect пов'язаний із:

    userId

Якщо:

    userId = 1

effect запускається після commit.

Якщо:

    userId = 1

і component re-render-иться, але `userId` не змінився:

    effect не запускається знову
    лише через цей dependency

Якщо:

    userId: 1 → 2

effect запускається знову після cleanup старого effect.

---

# Update без Effect Re-run

Наприклад:

    function User({ name }) {
        useEffect(() => {
            console.log("effect");
        }, []);

        return <p>{name}</p>;
    }

Якщо:

    name: "John" → "Anna"

component може:

    re-render

але effect із:

    []

не запускається повторно через зміну `name`.

Це важлива різниця:

    component update
        ≠
    every effect runs again

---

# Update з Effect Re-run

    function User({ userId }) {
        useEffect(() => {
            console.log("effect");
        }, [userId]);

        return <p>{userId}</p>;
    }

Якщо:

    userId: 1 → 2

маємо:

    render
      ↓
    commit
      ↓
    effect runs

---

# Mount / Update / Unmount Example

Повний приклад:

    function User({ userId }) {
        useEffect(() => {
            console.log(
                "connect to user:",
                userId
            );

            return () => {
                console.log(
                    "disconnect from user:",
                    userId
                );
            };
        }, [userId]);

        return (
            <p>
                User ID: {userId}
            </p>
        );
    }

Lifecycle:

    MOUNT
      ↓
    userId = 1
      ↓
    connect to user 1

    UPDATE
      ↓
    userId = 2
      ↓
    disconnect from user 1
      ↓
    connect to user 2

    UNMOUNT
      ↓
    disconnect from user 2

Це одна з найважливіших lifecycle-моделей React.

---

# Lifecycle Diagram

Загальна схема:

    ┌───────────────┐
    │     MOUNT     │
    └───────┬───────┘
            ↓
         render
            ↓
         commit
            ↓
       effect setup
            ↓
    ┌───────────────┐
    │     UPDATE    │
    └───────┬───────┘
            ↓
         render
            ↓
         commit
            ↓
      effect cleanup
            ↓
       effect setup
            ↓
          UPDATE
            ↓
           ...
            ↓
    ┌───────────────┐
    │    UNMOUNT    │
    └───────┬───────┘
            ↓
       effect cleanup

---

# Lifecycle та Component Identity

Lifecycle залежить від того, чи React вважає компонент тим самим component.

Наприклад:

    <User id={1} />

потім:

    <User id={2} />

Це все ще може бути той самий `User` component із новими props.

Тобто:

    update

а не:

    unmount + mount

---

# Component Type та Identity

Якщо:

    <User />

замінюється на:

    <Admin />

React бачить інший component type.

Може відбутися:

    User
      ↓
    unmount

    Admin
      ↓
    mount

---

# Key та Identity

Навіть якщо component type однаковий:

    <User key="one" />

може відрізнятися identity від:

    <User key="two" />

Зміна key може спричинити:

    unmount old User
      ↓
    mount new User

Тому `key` — це не просто:

    "щось для списків"

Він також бере участь у визначенні component identity.

---

# Preserving State

Якщо React зберігає component identity:

    state
      ↓
    preserved

Наприклад:

    <Counter />

оновлюється, але залишається тим самим компонентом.

State:

    count = 5

може залишитися:

    count = 5

---

# Resetting State через Remount

Якщо identity змінюється:

    <Counter key="A" />

стає:

    <Counter key="B" />

може відбутися:

    unmount
      ↓
    mount
      ↓
    useState(initialValue)

State починається заново.

Це можна використовувати навмисно для reset state.

---

# Intentional Remount

Наприклад:

    function Form({ userId }) {
        return (
            <UserForm
                key={userId}
                userId={userId}
            />
        );
    }

При зміні:

    userId

новий `key` може змусити `UserForm` remount.

Це може бути корисно, коли потрібно повністю почати локальний state форми заново.

Але використовувати цей підхід треба свідомо.

---

# Lifecycle та Forms

Наприклад:

    function UserForm() {
        const [name, setName] = useState("");

        return (
            <input
                value={name}
                onChange={event =>
                    setName(event.target.value)
                }
            />
        );
    }

Якщо компонент просто re-render-иться:

    name

зберігається.

Якщо компонент remount-иться:

    name = ""

знову отримує initial state.

---

# Lifecycle та Data Fetching

У простих навчальних прикладах часто зустрічається:

    useEffect(() => {
        fetch("/api/users")
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            });
    }, []);

Модель:

    mount
      ↓
    render
      ↓
    commit
      ↓
    effect
      ↓
    fetch
      ↓
    response
      ↓
    setUsers()
      ↓
    update
      ↓
    render

Data fetching буде детальніше розглядатися в:

    08-data-fetching-and-rest-api

---

# Lifecycle та Async Operations

Асинхронна операція може завершитися після того, як component lifecycle вже змінився.

Наприклад:

    mount
      ↓
    start request
      ↓
    unmount
      ↓
    request finishes

Тому для складних async operations потрібно правильно керувати cancellation / ignoring stale results.

Це буде важливим у data fetching.

---

# Lifecycle та Cleanup

Cleanup не означає:

    "виконати щось після кожного render"

Cleanup означає:

    "припинити попередню synchronization"

Наприклад:

    useEffect(() => {
        const connection = connect(roomId);

        return () => {
            connection.disconnect();
        };
    }, [roomId]);

При:

    roomId: 1 → 2

React:

    disconnect room 1
        ↓
    connect room 2

---

# Lifecycle Thinking Example

Припустимо, є чат.

Компонент отримує:

    roomId

Потрібно підключитися до відповідної кімнати.

Не варто думати:

    "при mount зробити connect"

Краще:

    "компонент повинен бути синхронізований
     із кімнатою, яку визначає roomId"

Тоді:

    mount
      ↓
    connect room 1

    roomId changes
      ↓
    disconnect room 1
      ↓
    connect room 2

    unmount
      ↓
    disconnect room 2

Це і є lifecycle thinking.

---

# Lifecycle Thinking

Основне питання:

    Що повинно бути налаштовано
    під час життя компонента?

І:

    Що потрібно зробити,
    коли ця synchronization більше не потрібна?

Наприклад:

    setup
      ↓
    resource active
      ↓
    cleanup

---

# Setup / Cleanup Pair

Хороший effect часто має симетричну структуру:

    useEffect(() => {
        // setup

        return () => {
            // cleanup
        };
    }, [dependencies]);

Наприклад:

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

Setup:

    addEventListener

Cleanup:

    removeEventListener

---

# Lifecycle та External Systems

External systems можуть бути:

    browser API
    DOM
    timer
    network
    WebSocket
    subscription
    third-party library

React component:

    React state / props
          ↓
       effect
          ↓
    external system

Lifecycle керує тим, коли synchronization потрібна.

---

# Lifecycle vs Rendering

Не слід змішувати:

    Rendering
        ↓
    "Який UI повинен бути?"

і:

    Lifecycle
        ↓
    "Що відбувається з component
     протягом його існування?"

Rendering може відбуватися багато разів.

Lifecycle допомагає зрозуміти:

    mount
    update
    unmount

---

# Lifecycle vs Effect

Lifecycle:

    mount
    update
    unmount

Effect:

    setup
    cleanup

Вони пов'язані:

    mount
      ↓
    effect setup

    update with dependency change
      ↓
    cleanup
      ↓
    setup

    unmount
      ↓
    cleanup

---

# Typical Lifecycle Table

| Етап | Що відбувається |
|---|---|
| Mount | Компонент вперше стає частиною UI |
| Render | React обчислює UI |
| Commit | React застосовує необхідні DOM-зміни |
| Effect setup | Effect синхронізує зовнішню систему |
| Update | Component отримує новий state/props/context |
| Re-render | Component function виконується знову |
| Cleanup | Попередня synchronization припиняється |
| Unmount | Component видаляється з UI |

---

# Mount vs Update vs Unmount

## Mount

    component appears
          ↓
        MOUNT

---

## Update

    component remains
          ↓
        UPDATE

---

## Unmount

    component disappears
          ↓
       UNMOUNT

---

# Найважливіша різниця

    Mount
        ↓
    component starts existing

    Update
        ↓
    existing component changes

    Unmount
        ↓
    component stops existing

---

# Типові помилки

❌ Вважати, що кожний re-render — це mount.

Правильно:

    mount → один початковий lifecycle event

    re-render → existing component renders again

---

❌ Вважати, що state reset відбувається після кожного render.

State зберігається між renders, якщо component identity зберігається.

---

❌ Вважати, що `useEffect(..., [])` буквально означає "componentDidMount".

Це спрощена аналогія, але сучасна модель React — synchronization із external systems.

---

❌ Забувати cleanup для timers.

Наприклад:

    useEffect(() => {
        setInterval(() => {
            console.log("tick");
        }, 1000);
    }, []);

Краще:

    useEffect(() => {
        const id = setInterval(() => {
            console.log("tick");
        }, 1000);

        return () => {
            clearInterval(id);
        };
    }, []);

---

❌ Додавати event listener без cleanup.

Погано:

    useEffect(() => {
        window.addEventListener(
            "resize",
            handleResize
        );
    }, []);

Правильно:

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

❌ Плутати `return null` з unmount.

    return null

означає:

    component renders nothing

а:

    {show && <Component />}

при `show = false` може означати:

    Component unmount

---

❌ Використовувати нестабільні keys.

Погано:

    key={Math.random()}

Це може постійно створювати нову identity.

---

❌ Використовувати array index як key у списках, які можуть змінювати порядок.

Краще:

    key={item.id}

---

❌ Вважати, що parent re-render означає child remount.

Parent re-render може спричинити child re-render, але identity child може залишитися тією самою.

---

❌ Намагатися вручну імітувати lifecycle methods.

Наприклад, не потрібно створювати складну систему:

    "if first render..."
    "if second render..."
    "if unmount..."

Краще розуміти:

    state
    props
    effects
    dependencies
    cleanup

---

# Питання зі співбесіди

Що таке component lifecycle?

Які основні lifecycle stages у React?

Що таке mount?

Що таке update?

Що таке unmount?

Що відбувається під час mount?

Що може спричинити update?

Чим state update відрізняється від remount?

Чим re-render відрізняється від remount?

Чи зберігається state між re-renders?

Що відбувається зі state під час remount?

Що таке component identity?

Як `key` впливає на identity?

Що відбувається, якщо змінюється `key` компонента?

Чим відрізняється:

    {show && <Panel />}

від:

    <Panel show={show} />

і:

    if (!show) {
        return null;
    }

Що таке cleanup?

Коли запускається cleanup effect?

Що відбувається з effect при зміні dependency?

Що відбувається з effect при unmount?

Навіщо потрібен cleanup?

Як очистити timer?

Як видалити event listener?

Як правильно працювати із subscription?

Чому `useEffect(..., [])` не варто просто називати `componentDidMount`?

Що таке lifecycle thinking?

Як lifecycle пов'язаний із synchronization?

Що відбувається при:

    mount → update → unmount

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке lifecycle.

Що таке mount.

Що таке update.

Що таке unmount.

Initial render.

Re-render.

State update.

Props update.

Parent re-render.

Component identity.

Re-render ≠ remount.

State зберігається між re-renders.

State може reset-нутися після remount.

Conditional rendering.

`key`.

Основи `useEffect()`.

Effect setup.

Effect cleanup.

Cleanup при unmount.

Cleanup при зміні dependencies.

---

## 🔵 Junior

Вміти пояснити:

    mount
      ↓
    render
      ↓
    commit
      ↓
    effect

та:

    update
      ↓
    render
      ↓
    commit
      ↓
    effect

та:

    unmount
      ↓
    cleanup

Розуміти різницю:

    render
    mount
    update
    unmount
    remount

Розуміти:

    component identity
    key
    state preservation
    state reset

Вміти створити:

    timer + cleanup

    event listener + cleanup

    subscription + cleanup

Розуміти:

    useEffect(..., [])
    useEffect(..., [dependency])

Розуміти, що effect не запускається просто через кожний re-render, якщо його dependencies не змінилися.

---

## 🟠 Middle

Глибше розуміння:

    component identity
    reconciliation
    state preservation
    remount behavior

Розуміння:

    keys
    conditional rendering
    effect lifecycle
    cleanup

Розуміння synchronization model:

    React state
        ↓
    effect
        ↓
    external system

Розуміння:

    stale closures
    async operations
    subscriptions
    event listeners
    timers
    network synchronization

Вміння правильно визначати:

    setup
    dependencies
    cleanup

для конкретної synchronization.

Розуміння Strict Mode та додаткових development checks.

---

## 🔴 Senior

Глибоке розуміння:

    component identity
    reconciliation
    state preservation
    state reset

Розуміння поведінки lifecycle при:

    conditional rendering
    key changes
    component type changes
    Suspense
    transitions
    concurrent rendering

Розуміння того, що rendering може бути:

    started
    interrupted
    restarted
    abandoned

та чому side effects не повинні виконуватися під час rendering.

Глибоке розуміння effect synchronization.

Розуміння:

    external systems
    subscriptions
    async synchronization
    cancellation
    stale results
    race conditions

Уміння проектувати lifecycle незалежно від старої class-based моделі:

    componentDidMount
    componentDidUpdate
    componentWillUnmount

та мислити через:

    synchronization
    dependencies
    cleanup

---

# Міні-шпаргалка

## Mount

    component appears
          ↓
        MOUNT
          ↓
       render
          ↓
       commit
          ↓
    effect setup

---

## Update

    state / props / context
            ↓
          UPDATE
            ↓
          render
            ↓
          commit
            ↓
      effect if needed

---

## Unmount

    component removed
          ↓
       UNMOUNT
          ↓
    effect cleanup

---

## Lifecycle

    MOUNT
      ↓
    UPDATE
      ↓
    UPDATE
      ↓
    UPDATE
      ↓
    UNMOUNT

---

## Effect Lifecycle

    setup
      ↓
    component active
      ↓
    dependency change
      ↓
    cleanup
      ↓
    setup
      ↓
    component active
      ↓
    unmount
      ↓
    cleanup

---

## Re-render

    state / props / context change
              ↓
           re-render
              ↓
        same identity
              ↓
         state preserved

---

## Remount

    old identity
         ↓
      unmount
         ↓
    new identity
         ↓
       mount
         ↓
    state initialized

---

## Conditional Rendering

    {show && <Panel />}

    show = true
        ↓
    Panel mounted

    show = false
        ↓
    Panel unmounted

---

## Return null

    function Panel({ show }) {
        if (!show) {
            return null;
        }

        return <div>Panel</div>;
    }

    Panel remains mounted
    but renders no UI

---

## Key

    <User key={user.id} />

`key` допомагає React визначити:

    component identity

Зміна key може спричинити:

    unmount
      ↓
    mount

---

## State

    re-render
        ↓
    state preserved

    remount
        ↓
    state initialized again

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

## Event Listener

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

## Subscription

    useEffect(() => {
        const subscription = subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

---

## Dependency Change

    useEffect(() => {
        connect(roomId);

        return () => {
            disconnect(roomId);
        };
    }, [roomId]);

При:

    roomId: 1 → 2

маємо:

    cleanup for 1
          ↓
    setup for 2

---

# Основні правила

    Mount
        → component starts existing

    Update
        → existing component changes

    Unmount
        → component stops existing

    Re-render
        → existing component renders again

    Remount
        → unmount + mount

    key
        → helps determine identity

    state
        → preserved across re-renders

    remount
        → state starts again

    effect
        → synchronize with external system

    cleanup
        → stop previous synchronization

---

# Головне

• Lifecycle описує життя компонента:

    mount
    update
    unmount

• `Mount` — компонент уперше стає частиною committed UI.

• `Update` — вже змонтований компонент отримує нові дані та може re-render-итися.

• `Unmount` — компонент видаляється з React tree.

• Типовий lifecycle:

    MOUNT
      ↓
    UPDATE
      ↓
    UPDATE
      ↓
    UNMOUNT

• `Re-render` не означає `remount`.

• Re-render:

    existing component
        ↓
    render again

• Remount:

    unmount
      ↓
    mount

• State зберігається між re-renders, якщо component identity не змінюється.

• Remount створює новий lifecycle і state починається з initial value.

• `key` бере участь у визначенні component identity.

• Зміна `key` може спричинити:

    unmount
      ↓
    mount

• Conditional rendering:

    {show && <Panel />}

може призвести до unmount `Panel`, коли `show` стає `false`.

• `return null` не означає автоматично unmount самого компонента.

• Effect має lifecycle:

    setup
      ↓
    active
      ↓
    cleanup

• Якщо dependency effect змінилася:

    old cleanup
        ↓
    new setup

• При unmount:

    cleanup

• Cleanup потрібен для:

    timers
    event listeners
    subscriptions
    connections
    observers
    external systems

• Не потрібно мислити `useEffect(..., [])` просто як:

    componentDidMount()

Краще мислити:

    synchronize after commit
        +
    cleanup when synchronization ends

• Lifecycle thinking:

    component
        ↓
    external system
        ↓
    setup
        ↓
    synchronization
        ↓
    cleanup

• Найважливіша модель:

    MOUNT
      ↓
    render
      ↓
    commit
      ↓
    effect setup
      ↓
    UPDATE
      ↓
    render
      ↓
    commit
      ↓
    cleanup + setup if dependencies changed
      ↓
    UPDATE
      ↓
    ...
      ↓
    UNMOUNT
      ↓
    cleanup

• Головна ідея цього розділу:

    Mount
        → початок життя компонента

    Update
        → зміна вже існуючого компонента

    Unmount
        → завершення життя компонента

    Effect
        → synchronization

    Cleanup
        → припинення synchronization

• Після розуміння `mount / update / unmount` наступний логічний крок:

    03-effects-and-side-effects

де потрібно детально розібрати:

    side effects
    useEffect()
    effect setup
    effect execution
    external systems
    cleanup

а потім:

    04-effect-dependencies
    05-cleanup
    06-lifecycle-thinking