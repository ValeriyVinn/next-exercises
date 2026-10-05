# React — 03. Component Lifecycle and Effects
## 01. Rendering

Rendering — це процес, під час якого React визначає, що потрібно відобразити на екрані на основі поточного стану та props компонента.

У React rendering — це не те саме, що безпосередня зміна DOM.

Спрощено процес можна уявити так:

    State / Props
          ↓
       Render
          ↓
    React element tree
          ↓
      Reconciliation
          ↓
     DOM updates
          ↓
       Browser
          ↓
       Screen

React-компонент описує:

    "Як UI має виглядати для поточних props і state."

React викликає компонент, отримує його результат і порівнює нове дерево елементів із попереднім.

---

# Ключові поняття

✔ rendering  
✔ render phase  
✔ commit phase  
✔ component function  
✔ React element  
✔ JSX  
✔ props  
✔ state  
✔ re-render  
✔ initial render  
✔ subsequent render  
✔ reconciliation  
✔ DOM  
✔ Virtual DOM  
✔ render tree  
✔ component tree  
✔ pure component  
✔ render output  
✔ conditional rendering  
✔ state update  
✔ props update  
✔ parent re-render  
✔ child re-render  
✔ Strict Mode  
✔ render vs commit  
✔ side effect  
✔ event handler  
✔ `useEffect()`

---

# Що потрібно пам'ятати

• Rendering — це процес обчислення нового UI на основі props і state.

• React-компонент — це JavaScript-функція, яку React викликає під час rendering.

• Компонент повинен повертати React elements або `null`.

• Rendering не означає автоматично "перемалювати весь DOM".

• Після rendering React визначає, які DOM-зміни справді необхідні.

• React розділяє роботу на дві важливі фази:

    Render phase
    Commit phase

• Render phase визначає, що має бути на екрані.

• Commit phase застосовує необхідні зміни до DOM.

• Initial render відбувається при першому відображенні компонента.

• Re-render відбувається, коли змінюються дані, від яких залежить UI.

• Найчастіші причини re-render:

    state update
    props update
    parent re-render
    context update

• Re-render компонента не означає обов'язково зміну DOM.

• Якщо результат rendering фактично не потребує DOM-змін, React може не змінювати DOM.

• Component function повинна бути чистою під час rendering.

• Side effects не повинні виконуватися безпосередньо під час rendering.

• Для side effects у функціональних компонентах використовується `useEffect()`.

---

# Що таке Rendering

Rendering — це виконання component function для отримання опису UI.

Наприклад:

    function Greeting() {
        return <h1>Hello!</h1>;
    }

Під час rendering React викликає:

    Greeting()

і отримує:

    <h1>Hello!</h1>

Це не означає, що React просто виконує:

    document.createElement()

або:

    element.innerHTML = ...

React сам керує процесом оновлення UI.

---

# Component Function

Функціональний React-компонент — це JavaScript-функція, яка повертає JSX.

Наприклад:

    function Welcome() {
        return <h1>Welcome!</h1>;
    }

React може викликати цей компонент під час rendering.

У спрощеному вигляді:

    function Welcome() {
        return <h1>Welcome!</h1>;
    }

можна уявити як:

    Welcome()
        ↓
    React element
        ↓
    UI

---

# JSX як результат Rendering

Компонент може повертати JSX:

    function App() {
        return (
            <main>
                <h1>Hello</h1>
                <p>Welcome to React</p>
            </main>
        );
    }

JSX описує структуру UI.

React використовує цей результат для подальшої роботи з UI.

---

# React Element

JSX створює React elements.

Наприклад:

    const element = <h1>Hello</h1>;

`element` — це не DOM-елемент.

Це опис того, що React повинен відобразити.

Можна концептуально уявити:

    JSX
      ↓
    React element
      ↓
    React rendering
      ↓
    DOM

---

# React Element vs DOM Element

Це важлива відмінність.

React element:

    <h1>Hello</h1>

описує UI.

DOM element:

    document.querySelector("h1")

є реальним об'єктом DOM браузера.

Тобто:

    React element
        ↓
    description

    DOM element
        ↓
    actual browser DOM node

---

# Rendering ≠ DOM Update

Одна з найважливіших речей у React:

    render
        ≠
    DOM update

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        return <p>{count}</p>;
    }

Коли виконується:

    setCount(1);

React запускає новий rendering.

Але це не означає:

    "React повністю переписав DOM."

React визначає, що змінилося.

Було:

    <p>0</p>

Стало:

    <p>1</p>

І застосовує необхідну DOM-зміну.

---

# Initial Render

Initial render — це перший rendering React-компонента.

Наприклад:

    function App() {
        return <h1>Hello React</h1>;
    }

Під час запуску application React виконує початкове відображення.

Типова схема:

    React application
          ↓
    initial render
          ↓
    component functions
          ↓
    React element tree
          ↓
    DOM
          ↓
    browser screen

---

# createRoot

У сучасному React application root зазвичай створюється через:

    createRoot()

Наприклад:

    import { StrictMode } from "react";
    import { createRoot } from "react-dom/client";
    import App from "./App";

    createRoot(document.getElementById("root")).render(
        <StrictMode>
            <App />
        </StrictMode>
    );

Виклик:

    root.render(<App />);

запускає rendering React application.

---

# Render Tree

React application можна уявити як дерево компонентів.

Наприклад:

    App
    │
    ├── Header
    │
    ├── Main
    │   │
    │   ├── UserProfile
    │   └── ProductList
    │
    └── Footer

React працює з цим component tree під час rendering.

---

# Component Tree

Component tree показує зв'язок компонентів.

Наприклад:

    App
     │
     ├── Header
     │
     └── Main
          │
          ├── Sidebar
          │
          └── Content

Якщо `App` re-render-иться, його дочірні компоненти можуть також бути викликані під час rendering.

Це не означає, що весь DOM буде обов'язково змінений.

---

# Props and Rendering

Props впливають на результат rendering.

Наприклад:

    function Greeting({ name }) {
        return <h1>Hello, {name}!</h1>;
    }

Використання:

    <Greeting name="Valeriy" />

Результат:

    Hello, Valeriy!

Якщо prop змінюється:

    <Greeting name="Anna" />

компонент повинен отримати новий render output.

---

# State and Rendering

State також впливає на rendering.

Наприклад:

    import { useState } from "react";

    function Counter() {
        const [count, setCount] = useState(0);

        return (
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        );
    }

Спочатку:

    count = 0

UI:

    0

Після:

    setCount(1)

React запускає новий rendering.

Новий UI:

    1

---

# Re-render

Re-render — це повторне виконання rendering компонента.

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        console.log("render");

        return (
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        );
    }

При першому відображенні:

    render

Після зміни state:

    render

Після наступної зміни state:

    render

Тобто component function може виконуватися багато разів протягом життя компонента.

---

# Re-render ≠ Remount

Це дуже важливе поняття.

Re-render:

    component function
          ↓
       execute again
          ↓
       new output

Component залишається тим самим.

Remount:

    old component
          ↓
       unmount
          ↓
       mount new component

Тобто:

    re-render
        ≠
    remount

---

# Render vs Mount

Render:

    component function executes

Mount:

    component becomes part of the committed UI

Наприклад:

    function User() {
        return <h2>User</h2>;
    }

Під час initial render React викликає компонент.

Після commit компонент стає частиною UI.

---

# Render Phase

Render phase — фаза, в якій React визначає, що має бути відображено.

У спрощеному вигляді:

    props
      +
    state
      ↓
    component function
      ↓
    React elements
      ↓
    render result

Під час цієї фази React може виконувати component functions.

---

# Commit Phase

Commit phase — фаза, в якій React застосовує необхідні зміни до DOM.

Спрощено:

    Render phase
          ↓
    determine changes
          ↓
    Commit phase
          ↓
    update DOM

Після commit браузер може показати оновлений UI.

---

# Render Phase vs Commit Phase

Дуже важливо розрізняти:

    Render phase
        ↓
    "Що потрібно змінити?"

    Commit phase
        ↓
    "Застосувати ці зміни."

Наприклад:

    state
      ↓
    render
      ↓
    new React elements
      ↓
    compare with previous result
      ↓
    commit
      ↓
    DOM update

---

# Reconciliation

Reconciliation — процес, за допомогою якого React визначає, як новий render output відрізняється від попереднього.

Наприклад:

Було:

    <h1>Hello</h1>

Стало:

    <h1>Hello, Valeriy</h1>

React визначає, що текст потрібно оновити.

Не потрібно створювати весь UI з нуля.

---

# Reconciliation Concept

Спрощено:

    Previous render
          ↓
    <h1>Hello</h1>

    New render
          ↓
    <h1>Hello, Valeriy</h1>

            ↓

       React compares
            ↓
       identifies change
            ↓
          commit
            ↓
       update DOM

---

# Virtual DOM

Термін Virtual DOM часто використовується для опису React-підходу до роботи з UI.

Спрощено можна уявити:

    React elements
          ↓
    virtual representation
          ↓
    comparison
          ↓
    necessary DOM changes

Важливо:

Virtual DOM — це не просто "копія всього DOM".

React використовує структури даних React elements та внутрішнє reconciliation, щоб визначити необхідні оновлення.

---

# Render Output

Render output — результат роботи компонента.

Наприклад:

    function User() {
        return (
            <article>
                <h2>John</h2>
                <p>Developer</p>
            </article>
        );
    }

Render output описує:

    article
      ├── h2
      └── p

---

# Rendering із props

    function User({ name, role }) {
        return (
            <article>
                <h2>{name}</h2>
                <p>{role}</p>
            </article>
        );
    }

Використання:

    <User
        name="John"
        role="Developer"
    />

Render result залежить від props.

---

# Rendering із state

    function Counter() {
        const [count, setCount] = useState(0);

        return (
            <div>
                <p>Count: {count}</p>

                <button onClick={() => setCount(count + 1)}>
                    Increment
                </button>
            </div>
        );
    }

State:

    count = 0

UI:

    Count: 0

Після:

    setCount(1)

UI:

    Count: 1

---

# State Update запускає Rendering

Загальна схема:

    user interaction
          ↓
    event handler
          ↓
    setState()
          ↓
    state update
          ↓
    re-render
          ↓
    reconciliation
          ↓
    commit
          ↓
    DOM update

Наприклад:

    <button
        onClick={() => setCount(count + 1)}
    >
        Increment
    </button>

---

# Event не є Rendering

Event handler запускається через interaction користувача.

Наприклад:

    function Button() {
        function handleClick() {
            console.log("clicked");
        }

        return (
            <button onClick={handleClick}>
                Click
            </button>
        );
    }

Сам по собі:

    console.log()

не запускає rendering.

Rendering запускається, коли змінюються дані, які впливають на UI, наприклад state.

---

# State Update та Rendering

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        function handleClick() {
            setCount(count + 1);
        }

        return (
            <button onClick={handleClick}>
                {count}
            </button>
        );
    }

Послідовність:

    click
      ↓
    handleClick()
      ↓
    setCount()
      ↓
    React schedules update
      ↓
    render
      ↓
    commit
      ↓
    DOM update

---

# Multiple State Updates

React може групувати state updates.

Наприклад:

    function handleClick() {
        setCount(count + 1);
        setCount(count + 1);
    }

Не слід автоматично очікувати:

    count + 2

для такого коду.

Якщо нове значення залежить від попереднього state, краще використовувати functional update:

    function handleClick() {
        setCount(previousCount => previousCount + 1);
        setCount(previousCount => previousCount + 1);
    }

Тоді кожне оновлення працює з актуальним попереднім значенням.

---

# Functional State Update

Рекомендований шаблон:

    setCount(previousCount => previousCount + 1);

Особливо корисний, коли:

    newState depends on previousState

Наприклад:

    setCount(previousCount => previousCount + 1);

або:

    setItems(previousItems => [
        ...previousItems,
        newItem
    ]);

---

# Parent Re-render

Якщо parent component re-render-иться, його child components можуть також бути викликані під час rendering.

Наприклад:

    function App() {
        const [count, setCount] = useState(0);

        return (
            <>
                <button onClick={() => setCount(count + 1)}>
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

Зміна `count` запускає новий rendering `App`.

У звичайному випадку `Child` також може бути викликаний під час цього rendering.

---

# Parent → Child

Типова структура:

    Parent
       ↓
    Child

Parent передає props:

    <Child value={value} />

Якщо parent state змінюється:

    parent state update
          ↓
    parent re-render
          ↓
    child may re-render

Але:

    child re-render
        ≠
    child DOM must change

---

# Re-render не означає DOM update

Наприклад:

    function Child() {
        console.log("render");

        return <p>Hello</p>;
    }

Child може виконатися знову:

    render
    render
    render

але DOM може залишатися:

    <p>Hello</p>

без реальної зміни DOM-вузла.

Це одна з основних ідей React.

---

# Rendering та Pure Functions

React рекомендує, щоб component rendering був чистим.

Pure function:

    same input
        ↓
    same output

Наприклад:

    function Greeting({ name }) {
        return <h1>Hello, {name}</h1>;
    }

Для:

    name = "John"

результат:

    <h1>Hello, John</h1>

Для:

    name = "John"

знову:

    <h1>Hello, John</h1>

---

# Pure Rendering

Під час rendering компонент не повинен виконувати непередбачувані side effects.

Добре:

    function Price({ price }) {
        const total = price * 1.2;

        return <p>{total}</p>;
    }

Тут ми лише обчислюємо результат.

---

# Side Effect

Side effect — дія, яка виходить за межі простого обчислення результату.

Приклади:

    API request
    timer
    subscription
    DOM manipulation
    localStorage update
    logging
    external system interaction

Наприклад:

    localStorage.setItem("theme", "dark");

це side effect.

---

# Side Effect під час Rendering

Не слід робити такі дії безпосередньо під час rendering:

    function User() {
        localStorage.setItem("visited", "true");

        return <h1>User</h1>;
    }

Rendering може виконуватися більше разів, ніж очікується.

Тому side effect може виконатися несподівано або багато разів.

---

# Де виконувати Side Effects

Side effects зазвичай виконуються:

    event handlers

або:

    useEffect()

Наприклад, event:

    function Button() {
        function handleClick() {
            localStorage.setItem(
                "clicked",
                "true"
            );
        }

        return (
            <button onClick={handleClick}>
                Click
            </button>
        );
    }

Або effect:

    useEffect(() => {
        document.title = "Dashboard";
    }, []);

---

# Rendering vs Event Handler

Rendering:

    описує UI

Event handler:

    реагує на interaction

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        function handleClick() {
            setCount(count + 1);
        }

        return (
            <button onClick={handleClick}>
                {count}
            </button>
        );
    }

Тут:

    render
        ↓
    описує button

    click
        ↓
    handleClick
        ↓
    setCount
        ↓
    re-render

---

# Rendering vs useEffect

`useEffect()` призначений для side effects.

Наприклад:

    function Page() {
        useEffect(() => {
            document.title = "Home";
        }, []);

        return <h1>Home</h1>;
    }

Логіка:

    render
      ↓
    commit
      ↓
    effect

Тобто effect не є частиною самого render output.

---

# Render → Commit → Effect

Спрощена модель:

    State / Props
          ↓
       Render
          ↓
       Commit
          ↓
      useEffect
          ↓
    external system

Наприклад:

    state
      ↓
    render UI
      ↓
    DOM update
      ↓
    effect
      ↓
    synchronize external system

---

# Conditional Rendering

Rendering може залежати від умови.

Наприклад:

    function User({ isLoggedIn }) {
        if (isLoggedIn) {
            return <h1>Welcome</h1>;
        }

        return <h1>Please log in</h1>;
    }

Якщо:

    isLoggedIn = true

результат:

    Welcome

Якщо:

    isLoggedIn = false

результат:

    Please log in

---

# Conditional Rendering через ternary

    function Status({ isOnline }) {
        return (
            <p>
                {isOnline ? "Online" : "Offline"}
            </p>
        );
    }

Rendering залежить від:

    isOnline

---

# Conditional Rendering через &&

    function User({ isAdmin }) {
        return (
            <div>
                <h1>User</h1>

                {isAdmin && (
                    <button>
                        Admin panel
                    </button>
                )}
            </div>
        );
    }

Якщо:

    isAdmin === true

кнопка відображається.

---

# Rendering `null`

Компонент може нічого не відображати.

    function Message({ visible }) {
        if (!visible) {
            return null;
        }

        return <p>Hello</p>;
    }

`null` означає:

    нічого не render-ити в цьому місці.

---

# Rendering Lists

Rendering часто використовується для масивів.

Наприклад:

    const users = [
        { id: 1, name: "John" },
        { id: 2, name: "Anna" }
    ];

    function UserList() {
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

React створює список React elements.

---

# Keys та Rendering

`key` допомагає React визначати identity елементів списку.

Наприклад:

    {users.map(user => (
        <li key={user.id}>
            {user.name}
        </li>
    ))}

`key` повинен бути:

    stable
    unique among siblings

Не слід без потреби використовувати:

    key={Math.random()}

або:

    key={Date.now()}

---

# Key впливає на Identity

Наприклад:

    <User key={user.id} />

Якщо `key` стабільний, React може зрозуміти, що це той самий компонент.

Якщо `key` змінюється:

    <User key={someChangingValue} />

React може сприйняти компонент як новий.

Це може призвести до:

    unmount
        ↓
    mount

замість простого re-render.

---

# Re-render vs Remount

Порівняння:

    Re-render

    component
        ↓
    render again
        ↓
    same component identity


    Remount

    old component
        ↓
    unmount
        ↓
    new component
        ↓
    mount

Це принципово різні процеси.

---

# Component Identity

React використовує позицію компонента в дереві та `key`, коли визначає його identity.

Наприклад:

    function App() {
        const [show, setShow] = useState(true);

        return (
            <>
                <button onClick={() => setShow(!show)}>
                    Toggle
                </button>

                {show && <Counter />}
            </>
        );
    }

Якщо `Counter` зникає:

    Counter
       ↓
    unmount

Якщо потім з'являється:

    Counter
       ↓
    mount

Це новий lifecycle.

---

# Rendering та Lifecycle

Rendering є частиною lifecycle компонента.

Спрощена модель:

    Mount
      ↓
    Render
      ↓
    Commit
      ↓
    Effect
      ↓
    Update
      ↓
    Render
      ↓
    Commit
      ↓
    Effect
      ↓
    ...
      ↓
    Unmount
      ↓
    Cleanup

Ця модель буде детальніше розглядатися в наступних підрозділах:

    02-mount-update-unmount
    03-effects-and-side-effects
    04-effect-dependencies
    05-cleanup
    06-lifecycle-thinking

---

# Rendering може відбуватися багато разів

Не слід думати:

    component function
        ↓
    executes once

Правильніше:

    mount
      ↓
    render
      ↓
    update
      ↓
    render
      ↓
    update
      ↓
    render
      ↓
    ...

Компонент може render-итися багато разів протягом свого життя.

---

# Rendering не повинен залежати від кількості запусків

Компонент повинен бути написаний так, щоб повторний rendering був безпечним.

Добре:

    function Price({ price }) {
        const total = price * 1.2;

        return <p>{total}</p>;
    }

Небажано:

    function Component() {
        globalCounter++;

        return <p>Hello</p>;
    }

Тут rendering змінює зовнішній стан.

---

# Bad Rendering Example

❌ Не варто робити:

    function App() {
        document.title = "App";

        return <h1>Hello</h1>;
    }

Чому?

Тому що:

    document.title = ...

є side effect.

Rendering повинен описувати UI, а не синхронізувати зовнішні системи.

Краще:

    function App() {
        useEffect(() => {
            document.title = "App";
        }, []);

        return <h1>Hello</h1>;
    }

---

# Bad Rendering Example — API Request

❌ Не варто:

    function Users() {
        fetch("/api/users");

        return <h1>Users</h1>;
    }

Причина:

render може виконуватися багато разів.

Отже API request також може виконуватися багато разів.

Для таких операцій використовують відповідний data-fetching підхід або `useEffect()` для навчальних прикладів.

---

# Bad Rendering Example — Random Value

Не завжди помилка, але важливо розуміти наслідки:

    function App() {
        const value = Math.random();

        return <p>{value}</p>;
    }

Кожний render може створювати нове значення.

Тобто:

    render 1 → 0.123
    render 2 → 0.754
    render 3 → 0.421

Якщо значення має бути стабільним між renders, потрібен інший підхід, наприклад state або memoization залежно від задачі.

---

# Randomness та Pure Rendering

Pure rendering означає, що результат залежить від inputs.

Якщо:

    props + state

однакові, компонент повинен поводитися передбачувано.

Наприклад:

    function Price({ price }) {
        return <p>{price * 1.2}</p>;
    }

Для однакового:

    price = 100

результат однаковий.

---

# Date та Rendering

Також треба обережно працювати з:

    Date.now()

або:

    new Date()

безпосередньо в rendering.

Наприклад:

    function Clock() {
        return (
            <p>
                {new Date().toLocaleTimeString()}
            </p>
        );
    }

Сам компонент не буде автоматично оновлюватися щосекунди.

Для clock потрібен state + timer, а timer є side effect.

Це вже тема `useEffect()` та lifecycle.

---

# Rendering та Derived Data

Під час rendering можна обчислювати дані, які безпосередньо випливають із props/state.

Наприклад:

    function Cart({ items }) {
        const total = items.reduce(
            (sum, item) => sum + item.price,
            0
        );

        return <p>Total: {total}</p>;
    }

`total` є derived data.

Не потрібно обов'язково створювати окремий state:

    const [total, setTotal] = useState(0);

якщо `total` повністю залежить від `items`.

---

# Derived Data

Якщо значення можна отримати:

    derived value = function(props, state)

часто краще просто обчислити його під час rendering.

Наприклад:

    function UserList({ users }) {
        const activeUsers = users.filter(
            user => user.isActive
        );

        return (
            <p>
                Active users: {activeUsers.length}
            </p>
        );
    }

---

# Don't Store What You Can Calculate

Якщо дані повністю залежать від іншого state:

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const fullName = `${firstName} ${lastName}`;

Краще:

    fullName

обчислювати під час rendering.

Не обов'язково:

    const [fullName, setFullName] = useState("");

і потім синхронізувати його через effect.

Це допомагає уникати зайвих renders та складної синхронізації.

---

# Rendering та Referential Identity

Під час rendering JavaScript може створювати нові об'єкти та функції.

Наприклад:

    function App() {
        const user = {
            name: "John"
        };

        return <User user={user} />;
    }

При кожному render:

    user

може бути новим object reference.

Так само:

    function App() {
        const handleClick = () => {
            console.log("click");
        };

        return <Button onClick={handleClick} />;
    }

функція створюється під час кожного render.

Це нормально в більшості випадків.

Оптимізація потрібна лише тоді, коли вона справді необхідна.

---

# Rendering та Object Reference

Наприклад:

    const user1 = {
        name: "John"
    };

    const user2 = {
        name: "John"
    };

    console.log(user1 === user2);

Результат:

    false

Це JavaScript behavior.

Тому React може бачити різні object references навіть тоді, коли дані виглядають однаково.

---

# Rendering та Function Reference

Наприклад:

    const first = () => {};
    const second = () => {};

    console.log(first === second);

Результат:

    false

Кожна функція — окремий object/function reference.

У React це може бути важливим при:

    memoization
    React.memo
    useMemo
    useCallback

Але ці теми краще розглядати в розділі:

    12-react-performance

---

# Strict Mode

У development mode React `StrictMode` може навмисно викликати певну логіку більше одного разу, щоб допомогти виявити проблеми.

Наприклад:

    import { StrictMode } from "react";

    createRoot(document.getElementById("root")).render(
        <StrictMode>
            <App />
        </StrictMode>
    );

Під час development можна побачити додаткові rendering-related виклики.

Це не означає, що production application буде працювати так само.

---

# Strict Mode та Pure Rendering

Одна з причин таких перевірок:

    виявити impure rendering

Наприклад, якщо компонент змінює зовнішню змінну:

    let counter = 0;

    function App() {
        counter++;

        return <p>{counter}</p>;
    }

повторне виконання rendering допомагає побачити проблему.

Компонент повинен бути максимально безпечним для повторного виклику.

---

# Strict Mode та Effects

У development `StrictMode` також може виконувати додаткові перевірки effects.

Це допомагає виявляти:

    missing cleanup
    unsafe side effects
    неправильну логіку synchronization

Тому effect має бути написаний так, щоб його setup/cleanup логіка була коректною.

---

# Rendering Flow

Повна спрощена модель:

    User interaction
          ↓
    State update
          ↓
    React schedules update
          ↓
    Render phase
          ↓
    Component functions
          ↓
    New React elements
          ↓
    Reconciliation
          ↓
    Commit phase
          ↓
    DOM updates
          ↓
    Browser paints
          ↓
    Effects
          ↓
    External synchronization

Це спрощена навчальна модель.

Внутрішня реалізація React складніша.

---

# Browser Paint

Після того як React застосував DOM-зміни, браузер може оновити pixels на екрані.

Спрощено:

    React render
        ↓
    React commit
        ↓
    DOM
        ↓
    browser rendering
        ↓
    pixels

Важливо розуміти:

    React не малює pixels безпосередньо.

Браузер відповідає за фактичне відображення DOM на екрані.

---

# Render Cycle

Типовий update cycle:

    state update
        ↓
    render
        ↓
    reconciliation
        ↓
    commit
        ↓
    browser update

Наприклад:

    setCount(1)
        ↓
    Counter renders
        ↓
    <button>1</button>
        ↓
    React compares
        ↓
    DOM text changes from "0" to "1"

---

# Що запускає Rendering

Основні причини:

### 1. Initial render

    root.render(<App />);

---

### 2. State update

    setCount(1);

---

### 3. Props change

Наприклад parent передає:

    <User name={name} />

і `name` змінюється.

---

### 4. Parent re-render

Parent може render-итися знову, що може призвести до rendering children.

---

### 5. Context update

Компонент, який використовує context, може re-render-итися після зміни context value.

Context буде розглядатися детальніше у:

    06-context

---

# Що НЕ є причиною Rendering саме по собі

Не кожна JavaScript-операція викликає React rendering.

Наприклад:

    console.log("hello");

не запускає rendering.

Також:

    let value = 10;

    value++;

не запускає React rendering.

Зміна звичайної локальної JavaScript-змінної не повідомляє React про необхідність оновлення UI.

---

# Local Variable vs State

❌ Звичайна змінна:

    function Counter() {
        let count = 0;

        function handleClick() {
            count++;
        }

        return (
            <button onClick={handleClick}>
                {count}
            </button>
        );
    }

Зміна:

    count++

сама по собі не запускає re-render.

---

Правильно використовувати state:

    function Counter() {
        const [count, setCount] = useState(0);

        function handleClick() {
            setCount(count + 1);
        }

        return (
            <button onClick={handleClick}>
                {count}
            </button>
        );
    }

---

# State має особливу роль

State:

    зберігає дані між renders
        +
    повідомляє React про необхідність update

Тому:

    local variable
        ≠
    state

---

# Rendering та State Persistence

При кожному render функція компонента виконується знову.

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        console.log("render");

        return (
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        );
    }

Змінна:

    count

отримує актуальне значення state при кожному render.

React зберігає state між rendering.

---

# Render Snapshot

Корисно мислити про кожний render як про snapshot.

Наприклад:

    count = 0

перший render створює UI, який бачить:

    count === 0

Після:

    setCount(1)

React створює новий render snapshot:

    count === 1

Тобто кожен render має власні значення props і state.

---

# Render Snapshot Example

    function Counter() {
        const [count, setCount] = useState(0);

        function handleClick() {
            console.log(count);
        }

        return (
            <button onClick={handleClick}>
                {count}
            </button>
        );
    }

Якщо button був створений під час render:

    count = 0

його event handler бачить відповідний snapshot.

Після re-render:

    count = 1

створюється новий render з новим handler closure.

---

# Closure та Rendering

React rendering тісно пов'язаний із JavaScript closures.

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        function handleClick() {
            console.log(count);
        }

        return (
            <button onClick={handleClick}>
                {count}
            </button>
        );
    }

`handleClick` захоплює значення:

    count

із конкретного render.

Тому кожен render можна розглядати як окремий snapshot.

---

# Rendering та Stale Values

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        function handleClick() {
            setTimeout(() => {
                console.log(count);
            }, 1000);
        }

        return (
            <button onClick={handleClick}>
                {count}
            </button>
        );
    }

Callback може побачити значення `count` із render, у якому він був створений.

Це важливе поняття для:

    events
    effects
    timers
    async code

---

# Rendering та Immutability

React state не слід змінювати напряму.

❌ Погано:

    const [user, setUser] = useState({
        name: "John",
        age: 25
    });

    user.age = 26;

Правильно:

    setUser(previousUser => ({
        ...previousUser,
        age: 26
    }));

Створюється новий object.

---

# Array State та Rendering

❌ Не мутувати:

    items.push(newItem);

Правильно:

    setItems(previousItems => [
        ...previousItems,
        newItem
    ]);

React отримує нове state value.

---

# Чому Immutability важлива

React часто використовує reference identity для визначення змін.

Наприклад:

    oldObject !== newObject

означає, що reference змінився.

Тому immutable update:

    setUser({
        ...user,
        age: 26
    });

створює новий object reference.

---

# Rendering та Conditional Component

Наприклад:

    function App({ loggedIn }) {
        return (
            <>
                {loggedIn
                    ? <Dashboard />
                    : <Login />
                }
            </>
        );
    }

Якщо:

    loggedIn = false

render:

    Login

Якщо:

    loggedIn = true

render:

    Dashboard

При зміні між різними component types identity може змінитися.

---

# Rendering та Component Type

Наприклад:

    {isAdmin ? <Admin /> : <User />}

Це два різні component types:

    Admin
    User

При зміні:

    Admin → User

React може:

    unmount Admin
        ↓
    mount User

Це не просто звичайний re-render одного компонента.

---

# Rendering Same Component

Наприклад:

    <User name={name} />

Якщо:

    name = "John"

потім:

    name = "Anna"

React може залишити той самий `User` component identity та передати нові props.

Це:

    re-render

а не обов'язково:

    remount

---

# Mount

Mount означає, що компонент уперше стає частиною committed UI.

Спрощено:

    component created
        ↓
    render
        ↓
    commit
        ↓
    mounted

Після mount component може отримувати updates.

---

# Update

Update відбувається, коли дані компонента змінюються.

Наприклад:

    props change
    state change
    context change

Спрощено:

    update
      ↓
    render
      ↓
    commit
      ↓
    updated UI

---

# Unmount

Unmount означає, що компонент більше не є частиною UI.

Наприклад:

    {show && <Panel />}

Якщо:

    show = true

`Panel` змонтований.

Якщо:

    show = false

`Panel` видаляється з component tree.

Відбувається:

    unmount

---

# Rendering Lifecycle

Спрощена модель:

    MOUNT
      ↓
    render
      ↓
    commit
      ↓
    effects
      ↓
    UPDATE
      ↓
    render
      ↓
    commit
      ↓
    effects
      ↓
    UPDATE
      ↓
    ...
      ↓
    UNMOUNT
      ↓
    cleanup

---

# Rendering — це не Lifecycle усього

Важливо не змішувати:

    rendering
    mounting
    updating
    unmounting
    effects
    cleanup

Rendering — лише одна частина lifecycle.

Наступні теми розділу розберуть їх окремо.

---

# Practical Example

    import { useState } from "react";

    function Counter() {
        const [count, setCount] = useState(0);

        return (
            <div>
                <h2>Counter</h2>

                <p>Count: {count}</p>

                <button
                    onClick={() =>
                        setCount(previousCount => previousCount + 1)
                    }
                >
                    Increment
                </button>
            </div>
        );
    }

Що відбувається?

Initial:

    count = 0
        ↓
    render
        ↓
    UI shows 0

Click:

    button click
        ↓
    setCount(...)
        ↓
    state update
        ↓
    render
        ↓
    UI shows 1

Наступний click:

    setCount(...)
        ↓
    render
        ↓
    UI shows 2

---

# Practical Example — Props

    function Greeting({ name }) {
        return (
            <h1>
                Hello, {name}!
            </h1>
        );
    }

    function App() {
        const [name, setName] = useState("John");

        return (
            <>
                <Greeting name={name} />

                <button
                    onClick={() => setName("Anna")}
                >
                    Change name
                </button>
            </>
        );
    }

Initial render:

    name = "John"

UI:

    Hello, John!

Після click:

    setName("Anna")
        ↓
    App re-render
        ↓
    Greeting receives new prop
        ↓
    Greeting re-render
        ↓
    UI:
    Hello, Anna!

---

# Practical Example — Derived Data

    function Cart({ items }) {
        const total = items.reduce(
            (sum, item) => sum + item.price,
            0
        );

        return (
            <section>
                <h2>Cart</h2>
                <p>Total: {total}</p>
            </section>
        );
    }

`total` не потрібно зберігати в окремому state, якщо він повністю залежить від `items`.

Під час кожного render:

    items
      ↓
    calculate total
      ↓
    render total

---

# Practical Example — Conditional Rendering

    function Dashboard({ user }) {
        if (!user) {
            return <p>Please log in.</p>;
        }

        return (
            <main>
                <h1>
                    Welcome, {user.name}
                </h1>
            </main>
        );
    }

Render залежить від:

    user

Якщо:

    user === null

результат:

    Please log in.

Якщо:

    user !== null

результат:

    Welcome, ...

---

# Practical Example — List Rendering

    function ProductList({ products }) {
        return (
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name}
                    </li>
                ))}
            </ul>
        );
    }

Render:

    products
        ↓
    map()
        ↓
    React elements
        ↓
    UI

---

# Practical Example — No DOM Change

    function Child() {
        console.log("Child render");

        return <p>Hello</p>;
    }

Навіть якщо:

    Child()

виконується знову, React може не змінювати DOM, якщо результат залишається еквівалентним попередньому UI.

Тому:

    component render
        ≠
    DOM mutation

---

# Типові помилки

❌ Вважати, що render означає повне перемальовування DOM.

Правильно:

    render
        ↓
    React calculates result

    commit
        ↓
    necessary DOM updates

---

❌ Виконувати side effects безпосередньо під час rendering.

Наприклад:

    function App() {
        fetch("/api/data");

        return <h1>App</h1>;
    }

---

❌ Змінювати DOM вручну під час rendering.

Наприклад:

    function App() {
        document.body.style.background = "red";

        return <h1>App</h1>;
    }

Для React UI краще використовувати React state/props або відповідний effect для синхронізації з зовнішньою системою.

---

❌ Змінювати state без setter.

    const [count, setCount] = useState(0);

    count++;

Це не правильний спосіб оновити React state.

Правильно:

    setCount(previousCount => previousCount + 1);

---

❌ Мутувати object state.

    user.age = 30;

Правильно:

    setUser(previousUser => ({
        ...previousUser,
        age: 30
    }));

---

❌ Мутувати array state.

    items.push(newItem);

Правильно:

    setItems(previousItems => [
        ...previousItems,
        newItem
    ]);

---

❌ Плутати re-render та remount.

    re-render
        ↓
    existing component renders again

    remount
        ↓
    old component removed
        ↓
    new component mounted

---

❌ Використовувати `useEffect()` для простих обчислень.

Наприклад, якщо:

    const fullName = `${firstName} ${lastName}`;

не потрібно створювати effect лише для обчислення `fullName`.

---

❌ Зберігати derived data у state без потреби.

Наприклад:

    const [fullName, setFullName] = useState("");

якщо `fullName` повністю залежить від:

    firstName
    lastName

краще:

    const fullName = `${firstName} ${lastName}`;

---

❌ Вважати, що state update відбувається миттєво всередині event handler.

Наприклад:

    function handleClick() {
        setCount(count + 1);

        console.log(count);
    }

`console.log(count)` може показати старе значення поточного render snapshot.

---

❌ Вважати, що кожний re-render означає зміну DOM.

Можливий:

    render
        ↓
    no meaningful DOM changes

---

# Питання зі співбесіди

Що таке rendering у React?

Що таке re-render?

Що таке initial render?

Що запускає rendering?

Що таке render phase?

Що таке commit phase?

Яка різниця між render та commit?

Чи означає re-render повне перемальовування DOM?

Що таке reconciliation?

Що таке React element?

Чим React element відрізняється від DOM element?

Що таке component tree?

Що таке render tree?

Що таке Virtual DOM?

Що відбувається після `setState`?

Чому state update викликає re-render?

Чи викликає зміна звичайної JavaScript-змінної re-render?

Що відбувається, коли parent re-render-иться?

Чи обов'язково child component змінює DOM після re-render?

Що таке mount?

Що таке update?

Що таке unmount?

Чим re-render відрізняється від remount?

Що таке component identity?

Для чого потрібен `key` у списках?

Як `key` може вплинути на component identity?

Чому rendering повинен бути pure?

Що таке side effect?

Де потрібно виконувати side effects?

Чим rendering відрізняється від event handler?

Для чого використовується `useEffect()`?

Що таке derived data?

Чому не потрібно зберігати derived data у state без необхідності?

Що таке render snapshot?

Як closure пов'язаний із rendering?

Чому `count` може мати старе значення всередині callback?

Що робить `StrictMode` у development?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке rendering.

Що таке initial render.

Що таке re-render.

Що таке component function.

Що таке React element.

Props → rendering.

State → rendering.

State update → re-render.

Render phase.

Commit phase.

Render ≠ DOM update.

Reconciliation.

Mount.

Update.

Unmount.

Re-render ≠ remount.

Conditional rendering.

Rendering lists.

`key`.

Pure rendering.

Side effects.

Rendering vs event handlers.

Rendering vs `useEffect()`.

Derived data.

State vs local variable.

Immutability.

---

## 🔵 Junior

Розуміння:

    initial render
    re-render
    render phase
    commit phase
    reconciliation

Розуміння:

    props → render
    state → render
    parent → child rendering

Розуміння:

    render ≠ DOM update

Розуміння:

    render ≠ remount

Розуміння:

    mount
    update
    unmount

Вміння пояснити:

    state update
        ↓
    render
        ↓
    reconciliation
        ↓
    commit

Розуміння:

    pure rendering
    side effects
    derived data
    immutable state updates

Розуміння `key` та component identity.

Розуміння render snapshot.

Основи closures у React rendering.

Розуміння `StrictMode` у development.

---

## 🟠 Middle

Глибше розуміння:

    render phase
    commit phase
    reconciliation
    component identity

Розуміння того, як React працює з:

    state
    props
    context
    keys

Розуміння:

    render scheduling
    batching
    state snapshots
    closures
    referential identity

Розуміння різниці між:

    render
    commit
    browser paint
    effect

Розуміння, чому side effects не повинні виконуватися під час rendering.

Розуміння:

    memoization
    React.memo
    useMemo
    useCallback

Розуміння того, як unnecessary re-renders можуть виникати.

Розуміння component identity та remount через зміну `key`.

---

## 🔴 Senior

Глибоке розуміння React rendering architecture.

Розуміння:

    render work
    commit work
    scheduling
    prioritization
    concurrent rendering

Розуміння того, що rendering може бути:

    interrupted
    restarted
    abandoned

Розуміння, чому rendering повинен бути pure та idempotent.

Глибоке розуміння:

    reconciliation
    component identity
    keys
    state preservation

Розуміння:

    render scheduling
    transitions
    concurrent features
    Suspense
    selective rendering

Розуміння взаємодії:

    React
        ↓
    scheduler
        ↓
    render
        ↓
    commit
        ↓
    browser

Оптимізація rendering без передчасного використання memoization.

Розуміння trade-offs між:

    readability
    correctness
    render frequency
    memoization
    component composition
    state placement

---

# Міні-шпаргалка

## Rendering

    props + state
          ↓
       render
          ↓
    React elements
          ↓
    reconciliation
          ↓
       commit
          ↓
       DOM update

---

## Initial Render

    root.render(<App />)
          ↓
    initial render
          ↓
    commit
          ↓
    UI

---

## State Update

    setState()
       ↓
    re-render
       ↓
    reconciliation
       ↓
    commit
       ↓
    DOM update

---

## Props Update

    parent state/props
          ↓
    parent render
          ↓
    new child props
          ↓
    child render
          ↓
    reconciliation
          ↓
    commit

---

## Re-render

    re-render
        =
    component renders again

    re-render
        ≠
    remount

    re-render
        ≠
    full DOM repaint

---

## Mount

    render
      ↓
    commit
      ↓
    component mounted

---

## Update

    state / props / context change
              ↓
           render
              ↓
           commit
              ↓
           update

---

## Unmount

    component removed
          ↓
       unmount
          ↓
    cleanup effects

---

## Pure Rendering

    props + state
          ↓
    component()
          ↓
    UI

Rendering повинен бути:

    predictable
    pure
    free of side effects

---

## Side Effect

Приклади:

    API request
    timer
    subscription
    localStorage
    DOM manipulation
    external system synchronization

Зазвичай:

    event handler
        або
    useEffect()

---

## Render vs Commit

    Render
        ↓
    determine what UI should look like

    Commit
        ↓
    apply necessary changes

---

## Render vs DOM

    render
        ↓
    React calculates result

    commit
        ↓
    necessary DOM updates

Тому:

    render ≠ DOM update

---

## State vs Variable

Звичайна variable:

    let count = 0;

    count++;

не запускає React rendering.

State:

    const [count, setCount] = useState(0);

    setCount(count + 1);

повідомляє React про необхідність update.

---

## Derived Data

Якщо:

    total = calculate(items)

краще:

    const total = calculate(items);

а не без потреби:

    const [total, setTotal] = useState(0);

Derived data часто можна обчислювати безпосередньо під час rendering.

---

## Immutable Update

Object:

    setUser(previousUser => ({
        ...previousUser,
        age: 30
    }));

Array:

    setItems(previousItems => [
        ...previousItems,
        newItem
    ]);

---

## Conditional Rendering

    condition
        ? <A />
        : <B />

або:

    condition && <A />

або:

    if (!condition) {
        return null;
    }

---

## List Rendering

    items.map(item => (
        <Item
            key={item.id}
            item={item}
        />
    ))

`key` допомагає React визначити identity елемента.

---

## Component Identity

    same component + new props
            ↓
        re-render

    different component identity
            ↓
        unmount + mount

`key` може впливати на identity.

---

## Render Snapshot

Кожний render можна уявляти як snapshot:

    render 1
    count = 0

    render 2
    count = 1

    render 3
    count = 2

Event handlers та callbacks можуть захоплювати значення конкретного render через closure.

---

## Основний Render Flow

    STATE / PROPS
          ↓
       RENDER
          ↓
    React elements
          ↓
    RECONCILIATION
          ↓
       COMMIT
          ↓
        DOM
          ↓
      BROWSER
          ↓
       EFFECTS

---

# Головне

• Rendering — це процес, у якому React викликає компоненти та визначає, який UI повинен бути відображений.

• Component function повинна описувати UI на основі props і state.

• Initial render — перше відображення компонента.

• Re-render — повторне виконання rendering.

• State update зазвичай запускає re-render компонента.

• Зміна props може призвести до re-render.

• Re-render parent може призвести до rendering його children.

• Re-render не означає автоматично зміну DOM.

• React використовує reconciliation, щоб визначити необхідні зміни.

• Render phase визначає результат rendering.

• Commit phase застосовує необхідні зміни до DOM.

• Simplified flow:

    render
      ↓
    reconciliation
      ↓
    commit

• Rendering повинен бути pure.

• Не потрібно виконувати side effects безпосередньо під час rendering.

• Side effects включають:

    API requests
    timers
    subscriptions
    localStorage
    DOM manipulation
    external system synchronization

• Side effects зазвичай виконуються через:

    event handlers
    useEffect()

• State відрізняється від звичайної JavaScript-змінної.

• State зберігається між renders і повідомляє React про необхідність update.

• Якщо новий state залежить від попереднього, корисно використовувати functional update:

    setCount(previousCount => previousCount + 1);

• Derived data, яка повністю залежить від props/state, часто краще просто обчислювати під час rendering.

• React state потрібно оновлювати immutable способом.

• `key` допомагає React визначати identity елементів списку.

• Re-render:

    existing component
        ↓
    render again

• Remount:

    unmount
        ↓
    mount again

• Render snapshot означає, що кожний render має власний набір props/state values.

• JavaScript closures можуть захоплювати значення конкретного render.

• `StrictMode` у development може виконувати додаткові rendering/effect перевірки.

• Найважливіша модель:

    props + state
          ↓
       render
          ↓
    React elements
          ↓
    reconciliation
          ↓
       commit
          ↓
        DOM
          ↓
       browser

• І головне правило:

    Rendering описує UI.

    Event handlers реагують на interaction.

    Effects синхронізують компонент
    із зовнішніми системами.

• Не потрібно думати про React як:

    "кожного разу повністю перемалювати DOM"

Правильніше думати:

    "React повторно обчислює UI,
    порівнює результат із попереднім
    і застосовує необхідні зміни."

• Наступний важливий крок після розуміння rendering:

    mount
    update
    unmount

Після цього:

    effects
    dependencies
    cleanup
    lifecycle thinking

стають значно зрозумілішими.