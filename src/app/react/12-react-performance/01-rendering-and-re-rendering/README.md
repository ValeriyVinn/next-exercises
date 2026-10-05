# 01. Rendering and Re-rendering

Rendering — це процес, під час якого React викликає компоненти, обчислює, що потрібно показати, і формує нове представлення UI.

Re-rendering — повторний запуск rendering process для компонента після того, як змінилися дані, від яких залежить його UI.

Розуміння rendering та re-rendering — основа для розуміння performance у React.

React може виконувати багато render-ів, і сам факт re-render не означає проблему.

Проблема виникає тоді, коли:

- компонент рендериться без необхідності;
- рендеринг відбувається занадто часто;
- component tree занадто великий;
- rendering виконує важкі обчислення;
- через зміну props повторно рендериться велика кількість компонентів;
- створюються непотрібні objects/functions;
- дорогою є не тільки render, а й commit/update DOM.

Основна модель:

    state / props / context change
              ↓
          render phase
              ↓
       React calculates UI
              ↓
          commit phase
              ↓
          DOM update
              ↓
        browser paints UI

---

### Ключові поняття

✔ rendering  
✔ re-rendering  
✔ initial render  
✔ subsequent render  
✔ update  
✔ state  
✔ props  
✔ context  
✔ parent render  
✔ child render  
✔ component tree  
✔ render phase  
✔ commit phase  
✔ reconciliation  
✔ virtual DOM  
✔ DOM update  
✔ reconciliation  
✔ identity  
✔ referential equality  
✔ component purity  
✔ unnecessary render  
✔ expensive render  
✔ batching  
✔ Strict Mode  
✔ memoization  
✔ performance optimization  

---

### Що потрібно пам'ятати

• Render — це не те саме, що зміна DOM.

• Під час render React викликає component function та отримує React elements.

• Re-render означає, що React повторно виконує rendering process для компонента.

• Зміна state компонента запускає його update.

• Коли parent component re-renders, його children зазвичай також отримують можливість re-render.

• Re-render не обов'язково означає реальну зміну DOM.

• React порівнює попереднє та нове представлення UI.

• Якщо результат не потребує зміни DOM, React може не виконувати відповідний DOM update.

• Render phase відповідає за обчислення нового UI.

• Commit phase застосовує необхідні зміни до DOM.

• Не кожен re-render є проблемою.

• Оптимізувати потрібно тоді, коли rendering справді створює performance problem.

• `React.memo`, `useMemo` та `useCallback` можуть допомогти зменшити unnecessary work, але не повинні використовуватися автоматично всюди.

• Component має бути pure: однакові inputs повинні давати однаковий результат UI.

---

# Rendering

У React компонент — це JavaScript function, яка повертає React elements.

Наприклад:

    function Greeting() {
        return <h1>Hello</h1>;
    }

Коли React render-ить компонент:

    Greeting()

функція компонента виконується.

У спрощеній формі:

    Component
        ↓
    function executes
        ↓
    JSX returned
        ↓
    React elements
        ↓
    React compares result
        ↓
    DOM update if necessary

---

# Simple Rendering Example

Компонент:

    function App() {
        return (
            <main>
                <h1>Hello</h1>
                <p>Welcome!</p>
            </main>
        );
    }

React викликає:

    App()

і отримує структуру React elements.

Умовно:

    App()
      ↓
    {
        type: "main",
        children: [...]
    }

React використовує цю інформацію, щоб визначити необхідний UI.

---

# Initial Render

Initial render — перший rendering application.

Наприклад:

    import { createRoot } from "react-dom/client";

    const root = createRoot(
        document.getElementById("root")
    );

    root.render(<App />);

Відбувається приблизно:

    createRoot()
          ↓
    root.render(<App />)
          ↓
    React renders App
          ↓
    React creates DOM
          ↓
    DOM inserted into root

---

# Subsequent Render

Після initial render можуть відбуватися наступні renders.

Наприклад:

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

Після натискання:

    setCount(count + 1)

React отримує update.

Процес:

    state update
         ↓
    schedule render
         ↓
    Counter renders again
         ↓
    new UI calculated
         ↓
    React compares result
         ↓
    DOM updated if necessary

---

# Re-render

Re-render — це повторне виконання rendering process компонента.

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

При initial render:

    render

Після зміни `count`:

    render

Після ще однієї зміни:

    render

Тобто component function виконується знову.

---

# Важливо: Re-render ≠ DOM Update

Це одна з найважливіших речей у React performance.

Наприклад:

    function App() {
        const [count, setCount] = useState(0);

        return (
            <div>
                <h1>Hello</h1>

                <button
                    onClick={() => setCount(count + 1)}
                >
                    {count}
                </button>
            </div>
        );
    }

Після:

    setCount(count + 1)

`App` re-renders.

Але:

    <h1>Hello</h1>

не змінився.

React порівнює попередній результат з новим і застосовує до DOM тільки необхідні зміни.

Отже:

    re-render
        ↓
    new React tree
        ↓
    comparison
        ↓
    necessary DOM updates

Не:

    re-render
        ↓
    rebuild entire DOM

---

# Render Phase

Render phase — етап, на якому React обчислює, яким має бути UI.

У render phase React:

- викликає компоненти;
- виконує JSX;
- створює React elements;
- визначає нове представлення UI;
- порівнює результати з попереднім станом tree.

Наприклад:

    function User({ name }) {
        return <h2>{name}</h2>;
    }

Під час rendering:

    User({ name: "John" })

повертає:

    <h2>John</h2>

---

# Commit Phase

Commit phase — етап, коли React застосовує необхідні зміни до host environment, у браузері — до DOM.

Спрощено:

    Render phase
        ↓
    determine changes
        ↓
    Commit phase
        ↓
    DOM updates

Наприклад:

    <h1>Hello</h1>

змінюється на:

    <h1>Hello World</h1>

React визначає, що текст потрібно оновити, і застосовує відповідну DOM mutation.

---

# Render vs Commit

Дуже важливо розрізняти:

    Render
        ↓
    React calculates what UI should look like

    Commit
        ↓
    React applies necessary changes

Тому:

    render ≠ DOM mutation

---

# Component Tree

React application складається з дерева компонентів.

Наприклад:

    App
    ├── Header
    ├── Main
    │   ├── UserProfile
    │   └── UserList
    │       ├── UserItem
    │       ├── UserItem
    │       └── UserItem
    └── Footer

Якщо `App` re-renders, React проходить відповідну частину component tree.

Це важливо для performance, тому що великий component tree може означати більше rendering work.

---

# Parent Re-render

Розглянемо:

    function Parent() {
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

        return <p>Hello</p>;
    }

Коли `Parent` re-renders:

    Parent
       ↓
    Child

`Child` також може бути re-rendered.

Навіть якщо:

    <Child />

логічно не змінився.

---

# Parent State Update

Наприклад:

    function Parent() {
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

При:

    setCount(count + 1)

відбувається:

    state update
        ↓
    Parent re-render
        ↓
    Child rendering may occur
        ↓
    React compares results
        ↓
    DOM changes if necessary

---

# State Causes Re-render

Зміна state є одним із головних способів запустити re-render.

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        return (
            <button
                onClick={() => setCount(count + 1)}
            >
                {count}
            </button>
        );
    }

При:

    setCount(count + 1)

React планує update.

Після цього компонент повторно render-иться.

---

# Props and Rendering

Props також впливають на rendering.

Наприклад:

    function Parent() {
        const [name, setName] = useState("John");

        return (
            <Child name={name} />
        );
    }

    function Child({ name }) {
        return <h2>{name}</h2>;
    }

Якщо `name` змінюється:

    "John"
        ↓
    "Alex"

Child отримує нове prop value.

Це може призвести до його re-render.

---

# Context and Rendering

Context також може спричинити rendering updates.

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

Компоненти, які читають цей context, можуть re-render, коли context value змінюється.

Тому context теж потрібно враховувати при performance analysis.

---

# Local State

Один із важливих performance patterns — тримати state якомога ближче до компонентів, які його використовують.

Наприклад:

    function App() {
        return (
            <>
                <Header />
                <Search />
                <Content />
                <Footer />
            </>
        );
    }

Якщо search state потрібен тільки `Search`, краще:

    function Search() {
        const [query, setQuery] = useState("");

        ...
    }

ніж піднімати state без необхідності до:

    App

---

# State Placement

Порівняння:

    App
    ├── Search
    ├── Content
    └── Footer

Якщо `Search` має:

    query

краще:

    Search
      └── query state

ніж:

    App
      └── query state
           ↓
      Search

якщо іншим компонентам цей state не потрібен.

Менший scope state може зменшити кількість компонентів, які повинні реагувати на update.

---

# Unnecessary Re-render

Unnecessary re-render — rendering, який не був необхідний з точки зору фактичної зміни UI або роботи компонента.

Наприклад:

    function Parent() {
        const [count, setCount] = useState(0);

        return (
            <>
                <button onClick={() => setCount(count + 1)}>
                    {count}
                </button>

                <ExpensiveComponent />
            </>
        );
    }

Якщо `ExpensiveComponent` не залежить від `count`, його повторний rendering може бути зайвою роботою.

У таких випадках можна розглянути:

    React.memo

Але спочатку потрібно виміряти performance.

---

# Expensive Render

Не всі renders однаково дорогі.

Наприклад:

    function SmallComponent() {
        return <p>Hello</p>;
    }

та:

    function ExpensiveComponent({ items }) {
        const result = expensiveCalculation(items);

        return <LargeList data={result} />;
    }

Другий компонент може виконувати значно більше роботи.

Тому performance problem часто пов'язана не просто з кількістю renders, а з:

    render frequency
          ×
    render cost

---

# Render Cost

Render cost — кількість computational work, яку компонент виконує під час rendering.

Наприклад:

    function ProductList({ products }) {
        const sortedProducts = [...products].sort(
            (a, b) => a.price - b.price
        );

        return (
            <ul>
                {sortedProducts.map(product => (
                    <li key={product.id}>
                        {product.name}
                    </li>
                ))}
            </ul>
        );
    }

Якщо:

    products

дуже великий масив і component re-renders часто, sorting може стати expensive operation.

У наступному розділі:

    03-use-memo

буде розглянуто, як memoization може допомогти з expensive calculations.

---

# Render Frequency

Render frequency — як часто компонент render-иться.

Наприклад:

    Component A
        ↓
    1 render / second

    Component B
        ↓
    100 renders / second

Навіть якщо обидва renders однаково дешеві, другий компонент виконує набагато більше роботи.

Тому performance аналіз враховує:

    how often?
        +
    how expensive?

---

# Rendering Cascade

Rendering cascade — ситуація, коли update одного компонента призводить до rendering великої частини component tree.

Наприклад:

    App
      ↓
    Layout
      ↓
    Main
      ↓
    Dashboard
      ↓
    LargeList

Якщо state знаходиться високо:

    App state update

може спричинити rendering великої гілки.

Тому важливо правильно розміщувати state та boundaries компонентів.

---

# State Colocation

State colocation — розміщення state максимально близько до компонентів, які його використовують.

Наприклад:

    function Search() {
        const [query, setQuery] = useState("");

        return (
            <input
                value={query}
                onChange={event => setQuery(event.target.value)}
            />
        );
    }

Це часто краще, ніж:

    App
      ↓
    query state
      ↓
    Search

якщо `query` не використовується іншими компонентами.

---

# State Lifting

Іноді state навпаки потрібно підняти.

Наприклад:

    Parent
    ├── Search
    └── Results

Якщо `Search` змінює:

    query

а `Results` використовує:

    query

state може бути піднятий:

    Parent
      └── query
          ├── Search
          └── Results

Це називається:

    lifting state up

Але підняття state може збільшити кількість компонентів, які реагують на update.

Тому state потрібно піднімати лише настільки високо, наскільки це необхідно.

---

# Referential Equality

React performance часто залежить від identity values.

Наприклад:

    const user = {
        name: "John"
    };

Кожен новий object literal створює новий object reference.

    const user1 = {
        name: "John"
    };

    const user2 = {
        name: "John"
    };

    console.log(user1 === user2);

Результат:

    false

Хоча значення однакові.

Це називається:

    referential inequality

---

# Primitive Values

Primitive values порівнюються за значенням.

Наприклад:

    const a = 10;
    const b = 10;

    console.log(a === b);

Результат:

    true

Так само:

    const a = "hello";
    const b = "hello";

    console.log(a === b);

Результат:

    true

---

# Objects and References

Objects порівнюються за reference.

    const a = {
        value: 10
    };

    const b = {
        value: 10
    };

    console.log(a === b);

Результат:

    false

А:

    const a = {
        value: 10
    };

    const b = a;

    console.log(a === b);

Результат:

    true

Це важливо для:

    React.memo
    useMemo
    useCallback
    dependency arrays

---

# Function Identity

Функції також є objects і мають identity.

Наприклад:

    function Parent() {
        const handleClick = () => {
            console.log("click");
        };

        return <Child onClick={handleClick} />;
    }

При кожному виконанні `Parent` створюється нова function object.

Умовно:

    render 1
        ↓
    handleClick → reference A

    render 2
        ↓
    handleClick → reference B

І:

    A !== B

Це стане особливо важливим у:

    04-use-callback

---

# Object Props

Наприклад:

    function Parent() {
        const user = {
            name: "John"
        };

        return <Child user={user} />;
    }

При кожному render `Parent` створюється новий object:

    render 1 → user reference A
    render 2 → user reference B
    render 3 → user reference C

Навіть якщо:

    user.name === "John"

reference щоразу новий.

---

# Inline Object

Наприклад:

    <Child
        options={{
            theme: "dark"
        }}
    />

При кожному render створюється новий object.

Тобто концептуально:

    render 1 → {}
    render 2 → {}
    render 3 → {}

але references різні.

---

# Inline Function

Наприклад:

    <Child
        onClick={() => console.log("click")}
    />

Функція створюється під час кожного render parent.

Тобто:

    render 1 → function A
    render 2 → function B
    render 3 → function C

Це не означає, що inline functions самі по собі погані.

Але це стає важливим, коли:

    Child is memoized

або function використовується як:

    dependency

---

# Pure Components

React components бажано писати як pure functions.

Pure component:

    same inputs
        ↓
    same output

Наприклад:

    function Greeting({ name }) {
        return <h1>Hello, {name}</h1>;
    }

Для:

    name = "John"

результат стабільний.

---

# Impure Rendering

Не слід виконувати side effects під час render.

Погано:

    function Component() {
        localStorage.setItem("key", "value");

        return <div>Hello</div>;
    }

Render може виконуватися багато разів.

Отже side effect може виконуватися більше разів, ніж очікується.

Side effects потрібно виконувати у відповідному місці, наприклад:

    useEffect()

або event handler.

---

# Side Effects vs Rendering

Render повинен переважно:

    calculate UI

Side effect:

    change external system

Наприклад:

    API request
    localStorage write
    subscription
    timer
    DOM manipulation

не повинні без потреби виконуватися безпосередньо під час render.

---

# Rendering and Event Handlers

Event handler запускається як реакція на user interaction.

Наприклад:

    function Button() {
        const handleClick = () => {
            console.log("clicked");
        };

        return (
            <button onClick={handleClick}>
                Click
            </button>
        );
    }

Клік:

    user click
        ↓
    event handler
        ↓
    possible state update
        ↓
    re-render

Сам event handler не означає автоматично re-render.

Re-render може відбутися, якщо handler змінює state, context або інший механізм update.

---

# State Update and Rendering

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

Flow:

    click
      ↓
    handleClick()
      ↓
    setCount()
      ↓
    state update scheduled
      ↓
    render
      ↓
    new JSX
      ↓
    comparison
      ↓
    DOM update

---

# Batching

React може групувати кілька state updates в один rendering cycle.

Наприклад:

    function handleClick() {
        setFirstName("John");
        setLastName("Smith");
    }

Замість окремого rendering після кожного update React може обробити updates разом.

Концепція:

    update 1
        +
    update 2
        ↓
    batched update
        ↓
    render

Це називається:

    batching

---

# Functional State Updates

Коли новий state залежить від попереднього state, часто краще використовувати functional updater.

Наприклад:

    setCount(prevCount => prevCount + 1);

Замість:

    setCount(count + 1);

Особливо це корисно, коли виконується кілька updates:

    setCount(prev => prev + 1);
    setCount(prev => prev + 1);

React може коректно застосувати обидва updates послідовно.

---

# Multiple State Updates

Наприклад:

    function handleClick() {
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
    }

Результат:

    count + 3

Це не означає обов'язково:

    3 separate renders

React може batch-ити updates.

---

# Same State Update

Наприклад:

    setCount(1);
    setCount(1);

React може визначити, що кінцеве state value не змінилося відносно попереднього значення, і уникнути зайвої роботи.

Це одна з причин, чому важливо розуміти:

    state identity
    Object.is
    referential equality

---

# Object State and Re-render

Розглянемо:

    const [user, setUser] = useState({
        name: "John"
    });

Не слід мутувати state напряму:

    user.name = "Alex";

Правильно створювати новий object:

    setUser({
        ...user,
        name: "Alex"
    });

Так React отримує нове state value.

---

# Mutation

Поганий підхід:

    const [user, setUser] = useState({
        name: "John"
    });

    user.name = "Alex";

Тут reference залишається тим самим.

Краще:

    setUser(prev => ({
        ...prev,
        name: "Alex"
    }));

Новий object:

    old reference
         ↓
    new reference

---

# Keys and Rendering

Keys допомагають React ідентифікувати elements у списках.

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

`key` допомагає React правильно співвідносити elements між renders.

---

# Bad Keys

Проблемний варіант:

    users.map((user, index) => (
        <User
            key={index}
            user={user}
        />
    ))

Index як key може створювати проблеми, коли список:

    додається
    видаляється
    сортується
    переміщується

Краще використовувати стабільний unique identifier:

    key={user.id}

---

# Reconciliation

Reconciliation — процес, у якому React визначає різницю між попереднім та новим React tree.

Спрощено:

    previous tree
         +
    new tree
         ↓
    reconciliation
         ↓
    determine changes
         ↓
    commit necessary updates

React не потрібно повністю створювати DOM заново при кожному render.

---

# Virtual DOM

Virtual DOM — концептуальна назва для React element tree / representation UI в memory.

Наприклад:

    JSX
      ↓
    React elements
      ↓
    React tree
      ↓
    reconciliation
      ↓
    DOM updates

Важливо:

    Virtual DOM ≠ actual browser DOM

---

# React Element

Наприклад:

    <Button>Save</Button>

створює React element description.

Концептуально:

    {
        type: Button,
        props: {
            children: "Save"
        }
    }

Це не DOM element.

React використовує такі descriptions для побудови та оновлення UI.

---

# DOM Update

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        return <h1>{count}</h1>;
    }

Після:

    setCount(1)

React порівнює:

    previous:
    <h1>0</h1>

    new:
    <h1>1</h1>

і застосовує необхідну зміну тексту в DOM.

---

# Render Does Not Mean Paint

Не слід змішувати:

    React render
    DOM commit
    browser paint

Це різні етапи.

Спрощено:

    State update
         ↓
    React render
         ↓
    React commit
         ↓
    Browser rendering / paint

Performance problem може бути на різних етапах.

---

# React Strict Mode

У development mode `StrictMode` може викликати додаткові render-related checks.

Наприклад:

    import { StrictMode } from "react";

    createRoot(document.getElementById("root"))
        .render(
            <StrictMode>
                <App />
            </StrictMode>
        );

Тому під час development можна побачити більше викликів component function, ніж очікувалося.

Це не означає автоматично production performance problem.

---

# Strict Mode and Pure Components

Додаткові перевірки Strict Mode допомагають виявляти проблеми, пов'язані з impure rendering та side effects.

Наприклад, якщо render function має прихований side effect:

    function Component() {
        console.log("render");

        // side effect
        ...

        return <div>Hello</div>;
    }

Strict Mode може допомогти виявити, що render повинен бути pure.

---

# Development vs Production

Performance поведінка в development може відрізнятися від production.

Особливо через:

    StrictMode
    development checks
    development tooling
    source maps
    warnings

Тому не слід робити висновки про production performance лише за кількістю console.log у development.

Для реального аналізу використовують:

    React DevTools Profiler

---

# React DevTools Profiler

Profiler дозволяє аналізувати rendering performance.

Він допомагає побачити:

    які компоненти render-илися
    коли вони render-илися
    скільки часу зайняв render
    які компоненти були affected
    які renders були дорогими

Performance workflow:

    problem
       ↓
    measure
       ↓
    identify expensive work
       ↓
    optimize
       ↓
    measure again

---

# Не оптимізувати наосліп

Поганий workflow:

    "Компонент render-иться.
     Треба всюди додати memo."

Кращий:

    observe
       ↓
    measure
       ↓
    identify bottleneck
       ↓
    optimize
       ↓
    measure again

Optimization без вимірювання може:

    ускладнити код
    збільшити memory usage
    додати непотрібну complexity
    не дати реального improvement

---

# React.memo

`React.memo` дозволяє пропустити re-render memoized component, якщо його props не змінилися відповідно до порівняння.

Наприклад:

    const UserCard = React.memo(function UserCard({
        name
    }) {
        console.log("render");

        return <h2>{name}</h2>;
    });

Якщо parent re-renders, але:

    name

залишається тим самим, React може пропустити rendering `UserCard`.

Повністю:

    Parent render
        ↓
    UserCard
        ↓
    props comparison
        ↓
    props same
        ↓
    skip render

`React.memo` буде детально розглянуто в:

    02-memo

---

# React.memo and Objects

`React.memo` порівнює props.

Проблема:

    function Parent() {
        const user = {
            name: "John"
        };

        return <UserCard user={user} />;
    }

При кожному parent render:

    user reference

новий.

Тому:

    previous user !== next user

і memoization може не дати очікуваного результату.

---

# React.memo and Functions

Аналогічна проблема:

    function Parent() {
        const handleClick = () => {
            console.log("click");
        };

        return (
            <Child onClick={handleClick} />
        );
    }

При кожному render:

    handleClick

отримує нову reference.

Для memoized child це може означати:

    props changed
        ↓
    Child re-renders

Для стабілізації function reference може використовуватися:

    useCallback()

Але тільки коли це реально необхідно.

---

# useMemo

`useMemo` дозволяє memoize result of a calculation.

Наприклад:

    const sortedProducts = useMemo(() => {
        return products
            .slice()
            .sort((a, b) => a.price - b.price);
    }, [products]);

Ідея:

    expensive calculation
           ↓
       useMemo
           ↓
    reuse previous result
           ↓
    until dependencies change

`useMemo` буде детально розглянуто в:

    03-use-memo

---

# useCallback

`useCallback` дозволяє memoize function reference.

Наприклад:

    const handleClick = useCallback(() => {
        console.log("click");
    }, []);

Ідея:

    render 1 → function A
    render 2 → function A
    render 3 → function A

поки dependencies не змінилися.

`useCallback` буде детально розглянуто в:

    04-use-callback

---

# Lazy Loading

Великі applications можуть завантажувати код частинами.

Наприклад:

    import { lazy } from "react";

    const Dashboard = lazy(
        () => import("./Dashboard")
    );

Разом із:

    <Suspense fallback={<p>Loading...</p>}>
        <Dashboard />
    </Suspense>

можна завантажувати компонент лише тоді, коли він потрібен.

Це вже більше пов'язано з:

    loading performance
    bundle size
    code splitting

Детальніше:

    05-lazy-and-suspense
    06-code-splitting

---

# Rendering Performance vs Loading Performance

Це різні проблеми.

Rendering performance:

    component renders too often
    expensive calculations
    large component tree

Loading performance:

    large JavaScript bundle
    slow initial download
    unnecessary code loaded

Для rendering:

    memo
    useMemo
    useCallback
    state placement

Для loading:

    lazy
    Suspense
    code splitting
    dynamic imports

---

# Large Lists

Великий список:

    10 items

і:

    10,000 items

можуть мати зовсім різну rendering cost.

Наприклад:

    function UserList({ users }) {
        return (
            <ul>
                {users.map(user => (
                    <UserItem
                        key={user.id}
                        user={user}
                    />
                ))}
            </ul>
        );
    }

Якщо список дуже великий, може знадобитися:

    virtualization

або інші optimization techniques.

---

# Virtualization

Virtualization — rendering тільки тієї частини великого списку, яка реально видима користувачу.

Наприклад:

    10,000 items

але на екрані видно:

    20 items

Замість rendering:

    10,000 DOM elements

можна render-ити лише:

    ~20 visible items

Це окрема advanced performance technique.

---

# Component Boundaries

Правильний поділ application на компоненти може допомогти контролювати rendering scope.

Наприклад:

    App
    ├── Header
    ├── Search
    ├── ProductList
    └── Footer

Якщо `Search` часто змінюється, корисно не змушувати всю application architecture залежати від його локального state без необхідності.

Component boundaries допомагають локалізувати state та expensive work.

---

# Composition and Performance

Component composition також може впливати на rendering behavior.

Наприклад:

    function Layout({ children }) {
        const [count, setCount] = useState(0);

        return (
            <>
                <button
                    onClick={() => setCount(count + 1)}
                >
                    {count}
                </button>

                {children}
            </>
        );
    }

І:

    function App() {
        return (
            <Layout>
                <ExpensiveComponent />
            </Layout>
        );
    }

Правильне використання composition може допомогти не створювати unnecessary dependencies між state та component tree.

---

# Children Prop

`children` — це звичайний prop.

Наприклад:

    function Layout({ children }) {
        return (
            <main>
                {children}
            </main>
        );
    }

Використання:

    <Layout>
        <ExpensiveComponent />
    </Layout>

Composition іноді дозволяє уникнути непотрібного coupling між parent state та child component.

---

# Performance Optimization Order

Корисний порядок:

    1. Make it correct
    2. Measure
    3. Identify bottleneck
    4. Optimize
    5. Measure again

Не:

    1. Add memo everywhere
    2. Add useMemo everywhere
    3. Add useCallback everywhere
    4. Hope performance improves

---

# Найважливіша модель

У React performance потрібно думати не:

    "How many renders?"

а:

    "How much work is being done?"

Наприклад:

    100 cheap renders

можуть бути меншою проблемою, ніж:

    2 expensive renders

Тому важливі:

    render frequency
    render cost
    commit cost
    DOM size
    calculation cost
    network cost
    JavaScript bundle size

---

# Rendering Performance Model

Корисно запам'ятати:

    Performance
        =
    frequency
        ×
    cost

Але це лише спрощена модель.

На практиці також важливі:

    DOM updates
    browser layout
    painting
    JavaScript execution
    memory
    network
    bundle size

---

# Приклад — зайвий render

    function App() {
        const [count, setCount] = useState(0);

        return (
            <>
                <button
                    onClick={() => setCount(count + 1)}
                >
                    {count}
                </button>

                <ExpensiveList />
            </>
        );
    }

Якщо:

    ExpensiveList

не залежить від:

    count

то зміна `count` все одно може призвести до rendering цієї частини tree.

Це потенційне місце для оптимізації.

---

# Приклад — React.memo

    const ExpensiveList = React.memo(
        function ExpensiveList() {
            console.log("ExpensiveList render");

            return <div>Large list...</div>;
        }
    );

Тепер при parent re-render:

    Parent
       ↓
    ExpensiveList
       ↓
    props unchanged
       ↓
    render can be skipped

---

# Приклад — unstable object prop

    function App() {
        const [count, setCount] = useState(0);

        return (
            <>
                <button
                    onClick={() => setCount(count + 1)}
                >
                    {count}
                </button>

                <Child
                    options={{
                        theme: "dark"
                    }}
                />
            </>
        );
    }

Навіть якщо:

    theme = "dark"

не змінився, object створюється заново.

Тобто:

    render 1 → options A
    render 2 → options B

і:

    options A !== options B

---

# Приклад — stable value

У деяких випадках можна створити stable reference:

    const options = useMemo(() => {
        return {
            theme: "dark"
        };
    }, []);

    return <Child options={options} />;

Але не потрібно використовувати `useMemo` автоматично для кожного object.

Спочатку потрібно зрозуміти, чи ця стабільність reference справді має значення.

---

# Приклад — unstable function

    function Parent() {
        const handleClick = () => {
            console.log("click");
        };

        return (
            <Child onClick={handleClick} />
        );
    }

При кожному render:

    handleClick

отримує нову reference.

Якщо `Child` memoized:

    React.memo(Child)

це може спричиняти його re-render.

---

# Приклад — useCallback

    function Parent() {
        const handleClick = useCallback(() => {
            console.log("click");
        }, []);

        return (
            <Child onClick={handleClick} />
        );
    }

Тепер reference функції залишається стабільною між renders, поки dependencies не зміняться.

Але `useCallback` має сенс тоді, коли stable function identity використовується для optimization або dependency management.

---

# Приклад — expensive calculation

    function ProductList({ products }) {
        const sortedProducts = [...products].sort(
            (a, b) => a.price - b.price
        );

        return (
            <ul>
                {sortedProducts.map(product => (
                    <li key={product.id}>
                        {product.name}
                    </li>
                ))}
            </ul>
        );
    }

Якщо component render-иться часто, sorting також виконується часто.

Можливий optimization:

    const sortedProducts = useMemo(() => {
        return [...products].sort(
            (a, b) => a.price - b.price
        );
    }, [products]);

---

# Приклад — state colocation

Погано без необхідності:

    function App() {
        const [search, setSearch] = useState("");

        return (
            <>
                <Search
                    value={search}
                    onChange={setSearch}
                />

                <LargePage />
            </>
        );
    }

Якщо `search` використовується лише в `Search`, краще:

    function Search() {
        const [search, setSearch] = useState("");

        return (
            <input
                value={search}
                onChange={event =>
                    setSearch(event.target.value)
                }
            />
        );
    }

Так update локалізований у відповідному компоненті.

---

# Як думати про performance

Коли компонент render-иться, запитай:

    1. Why did it render?
    2. How often does it render?
    3. How expensive is the render?
    4. Did its props change?
    5. Did its state change?
    6. Did context change?
    7. Did parent render?
    8. Are object/function references changing?
    9. Is there an expensive calculation?
    10. Is there a large list?
    11. Does the DOM actually change?
    12. Is the problem really rendering?

---

# Why Did This Component Render?

Потенційні причини:

    state changed
    props changed
    context changed
    parent rendered
    external store update
    component mounted
    development checks

Тому питання:

    "Why did it render?"

часто корисніше, ніж:

    "Did it render?"

---

# Performance Debugging

Корисний workflow:

    Problem
       ↓
    Reproduce
       ↓
    Measure
       ↓
    Find expensive component
       ↓
    Find reason for render
       ↓
    Optimize
       ↓
    Measure again

---

# Performance Anti-Patterns

## ❌ Memoize everything

    React.memo(...)
    useMemo(...)
    useCallback(...)

скрізь без причини.

Це може зробити код складнішим без помітного benefit.

---

## ❌ Optimize without measuring

Не варто припускати:

    "This must be slow."

Потрібно:

    measure

---

## ❌ Keep all state in App

Не потрібно автоматично зберігати весь state у root component.

Це може збільшити rendering scope.

---

## ❌ Mutate state

Погано:

    user.name = "Alex";

Краще:

    setUser(prev => ({
        ...prev,
        name: "Alex"
    }));

---

## ❌ Use index as key everywhere

Проблемний варіант:

    items.map((item, index) => (
        <Item key={index} item={item} />
    ))

Краще:

    items.map(item => (
        <Item key={item.id} item={item} />
    ))

якщо `id` стабільний та унікальний.

---

## ❌ Put side effects into render

Погано:

    function Component() {
        fetch("/api/users");

        return <div>Users</div>;
    }

Render повинен залишатися pure.

---

## ❌ Confuse re-render with DOM update

Не кожен re-render означає:

    DOM rebuilt

React може визначити, що DOM change не потрібен.

---

# Практичний чекліст

Коли бачиш performance problem:

    □ Чи справді є performance problem?

    □ Де саме вона виникає?

    □ Чи це rendering problem?

    □ Чи це expensive calculation?

    □ Чи це DOM problem?

    □ Чи це network problem?

    □ Чи це bundle size problem?

    □ Який компонент render-иться?

    □ Чому він render-иться?

    □ Як часто він render-иться?

    □ Скільки коштує один render?

    □ Чи змінюються props?

    □ Чи змінюється state?

    □ Чи змінюється context?

    □ Чи створюються нові objects?

    □ Чи створюються нові functions?

    □ Чи потрібен React.memo?

    □ Чи потрібен useMemo?

    □ Чи потрібен useCallback?

    □ Чи можна перемістити state ближче?

    □ Чи потрібен code splitting?

    □ Чи потрібна virtualization?

    □ Чи виміряв я результат після optimization?

---

# Питання зі співбесіди

Що таке rendering у React?

Що таке re-rendering?

Що може спричинити re-render?

Що відбувається після зміни state?

Чи кожен re-render змінює DOM?

Чим render phase відрізняється від commit phase?

Що таке reconciliation?

Що таке Virtual DOM?

Чи React повністю перебудовує DOM при кожному render?

Що відбувається, коли parent re-renders?

Чи child завжди re-renders разом із parent?

Для чого потрібен `React.memo`?

Як працює `React.memo`?

Чому `React.memo` може не допомогти з object props?

Чому inline functions можуть впливати на memoized components?

Що таке referential equality?

Чому:

    {} === {}

дає:

    false

Що таке stable reference?

Що таке expensive render?

Що таке unnecessary re-render?

Що таке state colocation?

Що таке lifting state up?

Як placement state впливає на performance?

Що таке batching?

Чому functional state update іноді кращий?

Що таке Strict Mode?

Чому в development component може render-итися більше разів?

Що таке React Profiler?

Як знайти причину re-render?

Коли використовувати `useMemo`?

Коли використовувати `useCallback`?

Коли використовувати `React.memo`?

Чому не потрібно memoize everything?

Що таке code splitting?

Чим rendering performance відрізняється від loading performance?

Що таке virtualization?

Як оптимізувати великий список?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке rendering.

Що таке re-rendering.

Initial render.

State update.

Props update.

Context update.

Parent re-render.

Child rendering.

Component tree.

Render phase.

Commit phase.

Reconciliation.

React elements.

Virtual DOM як концепція.

Різниця:

    render
    DOM update
    browser paint

Розуміння:

    state → render
    props → render
    context → render

Розуміння того, що:

    re-render ≠ DOM update

Основи:

    React.memo
    useMemo
    useCallback

Основи:

    referential equality
    stable references
    expensive calculations
    unnecessary renders

---

🔵 Junior

Вміти пояснити:

    initial render
    subsequent render
    re-render
    render phase
    commit phase

Розуміти:

    parent → child rendering
    state placement
    state colocation
    lifting state up
    batching

Розуміти вплив:

    objects
    arrays
    functions

на:

    referential equality

Вміти знаходити потенційні unnecessary renders.

Розуміти:

    React.memo

та базову взаємодію:

    React.memo
    useMemo
    useCallback

Вміти користуватися:

    React DevTools Profiler

Розуміти, що optimization потрібно робити після measurement.

---

🟠 Middle

Глибше розуміти:

    reconciliation
    component tree
    rendering cascades
    referential equality
    memoization

Розуміти trade-offs:

    React.memo
    useMemo
    useCallback

Розуміти:

    render frequency
    render cost
    commit cost

Вміти аналізувати:

    unnecessary renders
    expensive calculations
    large lists
    unstable props
    unstable callbacks

Вміти застосовувати:

    state colocation
    component composition
    memoization
    lazy loading
    Suspense
    code splitting

Розуміти virtualization.

Вміти профілювати application до та після optimization.

---

🔴 Senior

Глибоке розуміння:

    React rendering model
    reconciliation
    component identity
    element identity
    referential equality
    scheduling
    concurrent rendering
    render interruption
    render prioritization

Розуміння:

    Fiber architecture
    render work
    commit work
    scheduling
    lanes
    transitions
    concurrent features

Розуміння trade-offs між:

    CPU
    memory
    DOM size
    JavaScript execution
    network
    bundle size

Advanced performance analysis:

    profiling
    flame graphs
    render waterfalls
    commit duration
    interaction latency

Advanced optimization:

    virtualization
    selective rendering
    state architecture
    subscription-based updates
    external stores
    code splitting
    streaming
    server rendering

Головне:

    optimization should solve a measured bottleneck

---

# Міні-шпаргалка

## Rendering

    Component
        ↓
    function executes
        ↓
    JSX
        ↓
    React elements
        ↓
    reconciliation
        ↓
    commit
        ↓
    DOM

---

## Re-render

    state / props / context update
                ↓
             render
                ↓
        new React elements
                ↓
          reconciliation
                ↓
          necessary changes
                ↓
             commit

---

## State

    setState()
        ↓
    update scheduled
        ↓
    component re-renders
        ↓
    React compares result
        ↓
    DOM updated if necessary

---

## Parent → Child

    Parent render
         ↓
       Child
         ↓
    child may render

Для запобігання unnecessary rendering можна розглянути:

    React.memo

---

## Render ≠ DOM update

    re-render
        ↓
    React calculates new UI

не означає:

    entire DOM rebuilt

---

## Render phase

    render phase
        ↓
    calculate UI
        ↓
    compare tree

---

## Commit phase

    commit phase
        ↓
    apply necessary changes
        ↓
    DOM

---

## Referential equality

    const a = {};
    const b = {};

    a === b
    // false

А:

    const a = {};
    const b = a;

    a === b
    // true

---

## Function identity

    const fn1 = () => {};
    const fn2 = () => {};

    fn1 === fn2
    // false

---

## React.memo

    const Child = React.memo(function Child(props) {
        return <div>{props.name}</div>;
    });

Ідея:

    props same
        ↓
    render can be skipped

---

## useMemo

    const result = useMemo(() => {
        return expensiveCalculation(data);
    }, [data]);

Ідея:

    cache calculation result
        ↓
    recalculate when dependencies change

---

## useCallback

    const handleClick = useCallback(() => {
        ...
    }, []);

Ідея:

    cache function reference
        ↓
    keep reference stable
        ↓
    until dependencies change

---

## State colocation

    State needed by Search
        ↓
    keep state in Search

Не піднімати state вище без необхідності.

---

## Performance workflow

    Problem
       ↓
    Measure
       ↓
    Identify bottleneck
       ↓
    Optimize
       ↓
    Measure again

---

## Основні performance questions

    Why did it render?

    How often does it render?

    How expensive is the render?

    Did props change?

    Did state change?

    Did context change?

    Did parent render?

    Are references stable?

    Is there expensive calculation?

    Is the DOM actually changing?

---

# Головне:

• Rendering — це процес обчислення UI компонентами React.

• Re-rendering — повторне виконання rendering process після update.

• State update може спричинити re-render компонента.

• Зміна props може спричинити re-render.

• Зміна context може спричинити re-render.

• Parent re-render може призвести до rendering його children.

• Re-render не означає автоматичну повну перебудову DOM.

• React використовує reconciliation, щоб визначити необхідні зміни.

• Render phase — React обчислює нове представлення UI.

• Commit phase — React застосовує необхідні зміни.

• React component має бути максимально pure.

• Не слід виконувати side effects безпосередньо під час render.

• Object, array та function references мають значення для performance.

• Два objects з однаковим вмістом не є рівними за reference:

    {} === {}
    // false

• Дві окремо створені functions також мають різні references.

• `React.memo` може пропускати rendering component, якщо його props не змінилися.

• `useMemo` memoize-ить результат calculation.

• `useCallback` memoize-ить function reference.

• `React.memo`, `useMemo` та `useCallback` не потрібно використовувати всюди без причини.

• Якщо props містять новий object або function на кожному render, memoization може втратити ефективність.

• State бажано тримати якомога ближче до місця його використання.

• State потрібно піднімати тільки тоді, коли його справді потрібно спільно використовувати.

• Batching дозволяє React обробляти кілька updates разом.

• `StrictMode` у development може спричиняти додаткові render-related checks.

• Development behavior не завжди дорівнює production behavior.

• Великі списки можуть вимагати virtualization.

• Rendering performance і loading performance — різні задачі.

• `lazy`, `Suspense` та code splitting більше стосуються завантаження коду, ніж безпосередньо rendering frequency.

• Performance optimization потрібно починати з measurement.

• Правильний workflow:

    measure
        ↓
    identify bottleneck
        ↓
    optimize
        ↓
    measure again

• Не потрібно оптимізувати component лише тому, що він re-render-иться.

• Основне питання performance:

    "How much work is React doing?"

• Важливі характеристики:

    render frequency
    render cost
    commit cost
    DOM size
    calculation cost
    JavaScript execution
    bundle size
    memory usage

• Основна модель:

    state / props / context
            ↓
         render
            ↓
     reconciliation
            ↓
         commit
            ↓
          DOM

• Головний принцип React performance:

    Do not optimize every render.

    Optimize expensive or unnecessary work
    that has been measured as a real bottleneck.