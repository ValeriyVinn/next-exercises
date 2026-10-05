# 02. memo

`React.memo` — це API React для оптимізації функціонального компонента, яке дозволяє React пропустити повторний render компонента, якщо його props не змінилися.

Основна ідея:

    parent re-renders
          ↓
       Child
          ↓
    props comparison
          ↓
    props unchanged
          ↓
    skip child render

`React.memo` особливо корисний, коли:

- parent часто re-render-иться;
- child отримує ті самі props;
- child виконує відносно дорогу rendering work;
- child не повинен повторно render-итися без зміни props;
- component tree достатньо великий;
- performance problem підтверджена профілюванням.

Але `React.memo` не потрібно використовувати на кожному компоненті.

Спочатку:

    measure
        ↓
    identify unnecessary render
        ↓
    optimize
        ↓
    measure again

---

### Ключові поняття

✔ `React.memo`  
✔ memoization  
✔ memoized component  
✔ props  
✔ re-render  
✔ parent render  
✔ child render  
✔ shallow comparison  
✔ `Object.is`  
✔ referential equality  
✔ primitive values  
✔ object reference  
✔ array reference  
✔ function reference  
✔ custom comparison  
✔ `arePropsEqual`  
✔ unnecessary render  
✔ expensive render  
✔ stable props  
✔ unstable props  
✔ memoization trade-offs  
✔ performance profiling  

---

### Що потрібно пам'ятати

• `React.memo` — це optimization tool.

• Він дозволяє React пропустити render memoized component, якщо його props не змінилися відповідно до порівняння.

• `React.memo` працює на рівні props.

• Якщо parent re-renders, memoized child може не re-render-итися, якщо його props залишилися рівними.

• За замовчуванням React порівнює кожен prop через `Object.is`.

• Primitive values зазвичай легко порівнюються:

    string
    number
    boolean
    null
    undefined

• Objects, arrays та functions порівнюються за reference.

• Два objects з однаковим вмістом можуть бути різними references.

• Новий object prop на кожному render може зламати очікуваний benefit від `React.memo`.

• Нова function reference на кожному render також може спричиняти re-render memoized child.

• `useMemo` може допомогти стабілізувати object/array reference.

• `useCallback` може допомогти стабілізувати function reference.

• `React.memo` не робить component абсолютно "нерендерним".

• State самого memoized component все одно може спричинити його re-render.

• Context updates також можуть спричинити re-render компонента, який читає context.

• `React.memo` не повинен бути заміною правильній архітектурі state.

• Memoization має власну ціну: порівняння props, memory та додаткова complexity.

• Не кожен re-render є performance problem.

---

# Що таке memoization

Memoization — техніка, яка дозволяє зберігати попередній результат або значення та повторно використовувати його, якщо inputs не змінилися.

У React:

    previous inputs
          ↓
    compare with new inputs
          ↓
    same
          ↓
    reuse previous result

Для `React.memo` inputs — це props компонента.

---

# React.memo

Базовий синтаксис:

    const MemoizedComponent = React.memo(Component);

Наприклад:

    function Greeting({ name }) {
        return <h1>Hello, {name}</h1>;
    }

    const MemoizedGreeting = React.memo(Greeting);

Тепер:

    <MemoizedGreeting name="John" />

є memoized version компонента `Greeting`.

---

# Короткий запис

Можна одразу:

    const Greeting = React.memo(function Greeting({ name }) {
        return <h1>Hello, {name}</h1>;
    });

Це часто зручний варіант.

---

# React.memo Example

Без memo:

    function Parent() {
        const [count, setCount] = useState(0);

        return (
            <>
                <button
                    onClick={() => setCount(count + 1)}
                >
                    {count}
                </button>

                <Child name="John" />
            </>
        );
    }

    function Child({ name }) {
        console.log("Child render");

        return <h2>{name}</h2>;
    }

Коли `Parent` re-renders:

    Parent
        ↓
    Child
        ↓
    Child render

`Child` може render-итися знову, хоча:

    name = "John"

не змінився.

---

# React.memo Example

Тепер:

    const Child = React.memo(function Child({ name }) {
        console.log("Child render");

        return <h2>{name}</h2>;
    });

При:

    Parent re-render

React перевіряє:

    previous props
        vs
    next props

Якщо:

    name === "John"

залишився тим самим, React може пропустити render `Child`.

---

# Основна модель

    Parent re-render
          ↓
    Memoized Child
          ↓
    compare props
          ↓
    props changed?
       ↙       ↘
     yes        no
      ↓          ↓
    render     skip render

Це головна ідея `React.memo`.

---

# Props Comparison

За замовчуванням `React.memo` порівнює props.

Наприклад:

    <Child
        name="John"
        age={25}
    />

React порівнює:

    previous:
    {
        name: "John",
        age: 25
    }

з:

    next:
    {
        name: "John",
        age: 25
    }

Для кожного prop використовується порівняння на основі `Object.is`.

---

# Object.is

React використовує `Object.is` для default props comparison.

Наприклад:

    Object.is("John", "John");
    // true

    Object.is(25, 25);
    // true

А для objects:

    Object.is(
        { name: "John" },
        { name: "John" }
    );
    // false

Тому важливо розуміти referential equality.

---

# Primitive Props

Primitive values:

    string
    number
    boolean
    null
    undefined
    bigint
    symbol

порівнюються за значенням.

Наприклад:

    function Parent() {
        return (
            <Child
                name="John"
                age={25}
                active={true}
            />
        );
    }

Якщо parent re-renders і ці значення залишаються такими самими:

    name = "John"
    age = 25
    active = true

memoized child може пропустити render.

---

# Object Props

Розглянемо:

    function Parent() {
        const user = {
            name: "John"
        };

        return <Child user={user} />;
    }

Навіть якщо:

    user.name

завжди `"John"`,

на кожному render створюється новий object.

Наприклад:

    render 1:
    user → reference A

    render 2:
    user → reference B

І:

    A !== B

Тому `React.memo` побачить зміну prop reference.

---

# Важливий приклад

    const Child = React.memo(function Child({ user }) {
        console.log("Child render");

        return <h2>{user.name}</h2>;
    });

    function Parent() {
        const [count, setCount] = useState(0);

        return (
            <>
                <button
                    onClick={() => setCount(count + 1)}
                >
                    {count}
                </button>

                <Child
                    user={{
                        name: "John"
                    }}
                />
            </>
        );
    }

При кожному render:

    {
        name: "John"
    }

створюється заново.

Тому:

    previous user !== next user

і `Child` може re-render-итися.

---

# Array Props

Аналогічна проблема з arrays.

    function Parent() {
        const items = [1, 2, 3];

        return <Child items={items} />;
    }

При кожному render:

    items → new array

Тобто:

    previousItems !== nextItems

навіть якщо:

    [1, 2, 3]

має той самий вміст.

---

# Function Props

Функції також мають identity.

Наприклад:

    function Parent() {
        const handleClick = () => {
            console.log("click");
        };

        return <Child onClick={handleClick} />;
    }

Кожен render створює нову function reference.

    render 1 → function A
    render 2 → function B
    render 3 → function C

Тому:

    A !== B
    B !== C

---

# React.memo + Function Props

    const Child = React.memo(function Child({
        onClick
    }) {
        console.log("Child render");

        return (
            <button onClick={onClick}>
                Click
            </button>
        );
    });

    function Parent() {
        const [count, setCount] = useState(0);

        const handleClick = () => {
            console.log("click");
        };

        return (
            <>
                <button
                    onClick={() => setCount(count + 1)}
                >
                    {count}
                </button>

                <Child onClick={handleClick} />
            </>
        );
    }

При зміні `count`:

    Parent re-renders
          ↓
    handleClick recreated
          ↓
    new function reference
          ↓
    Child props changed
          ↓
    Child re-renders

Тут `React.memo` не дає очікуваного benefit.

---

# useCallback + React.memo

Можна стабілізувати function reference:

    const handleClick = useCallback(() => {
        console.log("click");
    }, []);

Тоді:

    render 1 → function A
    render 2 → function A
    render 3 → function A

поки dependencies не змінилися.

Разом:

    const Child = React.memo(function Child({
        onClick
    }) {
        return (
            <button onClick={onClick}>
                Click
            </button>
        );
    });

    function Parent() {
        const [count, setCount] = useState(0);

        const handleClick = useCallback(() => {
            console.log("click");
        }, []);

        return (
            <>
                <button
                    onClick={() => setCount(count + 1)}
                >
                    {count}
                </button>

                <Child onClick={handleClick} />
            </>
        );
    }

Тепер при зміні `count`:

    Parent re-render
          ↓
    handleClick reference stays stable
          ↓
    Child props unchanged
          ↓
    Child render can be skipped

---

# React.memo + useMemo

Для object props можна використовувати `useMemo`.

Наприклад:

    const options = useMemo(() => {
        return {
            theme: "dark"
        };
    }, []);

    return (
        <Child options={options} />
    );

Тепер:

    render 1 → options reference A
    render 2 → options reference A
    render 3 → options reference A

поки dependencies не змінюються.

---

# React.memo + useMemo Example

    const Child = React.memo(function Child({
        options
    }) {
        console.log("Child render");

        return (
            <div>
                {options.theme}
            </div>
        );
    });

    function Parent() {
        const [count, setCount] = useState(0);

        const options = useMemo(() => {
            return {
                theme: "dark"
            };
        }, []);

        return (
            <>
                <button
                    onClick={() => setCount(count + 1)}
                >
                    {count}
                </button>

                <Child options={options} />
            </>
        );
    }

Тепер `options` має stable reference.

---

# Але useMemo не потрібен завжди

Не потрібно писати:

    const options = useMemo(() => ({
        theme: "dark"
    }), []);

лише тому, що це object.

Потрібно запитати:

    Is this prop passed to a memoized component?

    Is stable reference important?

    Is there a measured performance problem?

Якщо немає проблеми, звичайний object може бути цілком нормальним.

---

# React.memo не робить component pure

`React.memo` не перетворює impure component на pure component.

Компонент все одно повинен бути написаний так, щоб:

    same inputs
        ↓
    same output

Наприклад:

    const Greeting = React.memo(function Greeting({
        name
    }) {
        return <h1>Hello, {name}</h1>;
    });

---

# State всередині memoized component

Важливий момент:

`React.memo` не блокує state updates самого компонента.

Наприклад:

    const Counter = React.memo(function Counter() {
        const [count, setCount] = useState(0);

        console.log("Counter render");

        return (
            <button
                onClick={() => setCount(count + 1)}
            >
                {count}
            </button>
        );
    });

При:

    setCount(...)

`Counter` re-render-иться.

Тому:

    React.memo

не означає:

    "component never renders again"

---

# Context and React.memo

`React.memo` також не означає, що component ігнорує context updates.

Наприклад:

    const ThemeContext = createContext("light");

    const Button = React.memo(function Button() {
        const theme = useContext(ThemeContext);

        return (
            <button>
                {theme}
            </button>
        );
    });

Якщо context value змінюється:

    light
       ↓
    dark

компонент, який читає context, може re-render-итися.

Тому:

    React.memo

не є способом повністю ізолювати component від context changes.

---

# React.memo and children

`children` — також prop.

Наприклад:

    const Card = React.memo(function Card({
        children
    }) {
        return (
            <section>
                {children}
            </section>
        );
    });

Використання:

    <Card>
        <p>Hello</p>
    </Card>

Тут потрібно пам'ятати, що JSX children може бути новим React element object при створенні нового JSX.

Тому memoization з `children` потрібно аналізувати так само, як і з іншими props.

---

# Custom Comparison

`React.memo` дозволяє передати custom comparison function.

Синтаксис:

    const MemoizedComponent = React.memo(
        Component,
        arePropsEqual
    );

Наприклад:

    const UserCard = React.memo(
        function UserCard({ user }) {
            return <h2>{user.name}</h2>;
        },
        (prevProps, nextProps) => {
            return prevProps.user.id === nextProps.user.id;
        }
    );

Тут:

    true
        ↓
    props considered equal
        ↓
    skip render

    false
        ↓
    props considered changed
        ↓
    render

---

# arePropsEqual

Функція:

    (prevProps, nextProps) => boolean

повинна відповідати на питання:

    "Can React treat these props as equivalent?"

Наприклад:

    function arePropsEqual(prevProps, nextProps) {
        return (
            prevProps.name === nextProps.name &&
            prevProps.age === nextProps.age
        );
    }

---

# Custom Comparison Warning

Custom comparison може бути небезпечним, якщо написати її неправильно.

Наприклад:

    function arePropsEqual(prevProps, nextProps) {
        return true;
    }

Це означає:

    "Props are always equal."

React може перестати оновлювати component, навіть коли його props реально змінилися.

Тому custom comparison повинна бути коректною.

---

# Deep Comparison

Можна написати:

    JSON.stringify(prevProps) ===
    JSON.stringify(nextProps)

але це не є універсальним рішенням.

Deep comparison може бути дуже дорогою.

Наприклад:

    large object
        ↓
    deep comparison
        ↓
    багато CPU work

Може виявитися, що:

    comparison cost

буде більшою, ніж:

    component render cost

Тому custom comparison потрібно профілювати.

---

# Shallow Comparison

У context `React.memo` часто говорять про "shallow comparison".

Ідея:

    compare top-level prop values

Наприклад:

    previous:
    {
        name: "John",
        age: 25
    }

    next:
    {
        name: "John",
        age: 25
    }

Primitive props можуть бути рівними.

Але:

    previous:
    {
        user: { name: "John" }
    }

    next:
    {
        user: { name: "John" }
    }

може мати різні nested object references.

---

# Referential Equality

Це ключове поняття для `React.memo`.

Наприклад:

    const userA = {
        name: "John"
    };

    const userB = {
        name: "John"
    };

    Object.is(userA, userB);
    // false

А:

    const userA = {
        name: "John"
    };

    const userB = userA;

    Object.is(userA, userB);
    // true

---

# Stable Props

Stable props — props, references яких не змінюються без необхідності.

Наприклад:

    const handleClick = useCallback(...);

    const options = useMemo(...);

Це може бути корисним для memoized components.

Але stable references потрібні не всюди.

---

# Unstable Props

Unstable prop:

    <Child
        options={{
            theme: "dark"
        }}
    />

або:

    <Child
        onClick={() => console.log("click")}
    />

або:

    <Child
        items={[1, 2, 3]}
    />

У кожному випадку створюється нове reference.

---

# Memoization Dependency Chain

Можемо отримати dependency chain:

    Parent
       ↓
    useMemo / useCallback
       ↓
    stable prop
       ↓
    React.memo
       ↓
    Child render skipped

Наприклад:

    const options = useMemo(...);

    const handleClick = useCallback(...);

    const Child = React.memo(...);

Це може бути корисно, але лише якщо є реальний performance benefit.

---

# React.memo and primitive props

Це простий випадок:

    const Button = React.memo(function Button({
        label
    }) {
        return <button>{label}</button>;
    });

    <Button label="Save" />

При parent re-render:

    label = "Save"

залишається тим самим.

`Button` може не render-итися повторно.

---

# React.memo and object props

    const User = React.memo(function User({
        user
    }) {
        return <h2>{user.name}</h2>;
    });

Проблемний parent:

    function Parent() {
        return (
            <User
                user={{
                    name: "John"
                }}
            />
        );
    }

Object створюється заново.

Тому memoization може бути неефективною.

---

# React.memo and array props

    const List = React.memo(function List({
        items
    }) {
        return (
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name}
                    </li>
                ))}
            </ul>
        );
    });

Проблемний варіант:

    <List
        items={[
            { id: 1, name: "A" },
            { id: 2, name: "B" }
        ]}
    />

Array створюється заново при render.

---

# React.memo and derived arrays

Наприклад:

    function Parent({ products }) {
        const visibleProducts = products.filter(
            product => product.active
        );

        return (
            <ProductList
                products={visibleProducts}
            />
        );
    }

Якщо `ProductList` memoized:

    React.memo(ProductList)

то:

    visibleProducts

отримує нову array reference під час кожного render `Parent`.

Можна розглянути:

    const visibleProducts = useMemo(() => {
        return products.filter(
            product => product.active
        );
    }, [products]);

Але знову:

    measure first.

---

# React.memo and JSX

JSX також створює React elements.

Наприклад:

    const child = <Child name="John" />;

Це object-like React element description.

При новому JSX:

    <Child name="John" />

може бути створено нове element object.

Тому composition patterns та `children` теж можуть впливати на memoization behavior.

---

# React.memo and local state

Наприклад:

    const UserCard = React.memo(function UserCard({
        name
    }) {
        const [selected, setSelected] = useState(false);

        return (
            <button
                onClick={() => setSelected(!selected)}
            >
                {name}
                {selected ? " selected" : ""}
            </button>
        );
    });

Зміна:

    selected

спричиняє re-render `UserCard`.

`React.memo` не блокує його власний state.

---

# React.memo and context

Якщо компонент читає context:

    const value = useContext(SomeContext);

і context update впливає на нього, `React.memo` не гарантує пропуск такого update.

Тому для context-heavy applications потрібно думати також про:

    context splitting
    state placement
    provider boundaries
    selectors / external stores

---

# React.memo and parent state

Розглянемо:

    function App() {
        const [theme, setTheme] = useState("light");

        return (
            <>
                <ThemeButton
                    theme={theme}
                    onChange={setTheme}
                />

                <ExpensiveList />
            </>
        );
    }

Якщо:

    ExpensiveList

не залежить від `theme`, його можна розглянути як candidate для memoization.

Але спочатку:

    profile

---

# When React.memo Helps

`React.memo` може бути корисним, коли:

    Parent renders often
        +
    Child receives same props
        +
    Child render is not trivial
        +
    Child does not need to respond to
    other changing inputs
        +
    profiling shows benefit

---

# When React.memo May Not Help

`React.memo` може майже нічого не дати, якщо:

    Child is very cheap

або:

    Child props change every render

або:

    Parent rarely renders

або:

    comparison itself is expensive

або:

    performance bottleneck is somewhere else

---

# Cheap Component

Наприклад:

    const Label = React.memo(function Label({
        text
    }) {
        return <span>{text}</span>;
    });

Якщо component дуже дешевий:

    render cost ≈ tiny

то додавання memoization може не дати помітного benefit.

Не потрібно оптимізувати кожен маленький component.

---

# Expensive Component

Наприклад:

    const ProductTable = React.memo(
        function ProductTable({ products }) {
            return (
                <table>
                    ...
                </table>
            );
        }
    );

Якщо:

    products

стабільний, а parent часто re-render-иться, memoization може бути корисною.

---

# Cost of Memoization

Memoization не є безкоштовною.

Є:

    props comparison
    memory for previous values
    additional abstraction
    code complexity

Тому потрібно порівнювати:

    cost of render

з:

    cost of memoization

---

# React.memo Does Not Compare Deeply

Наприклад:

    previousProps = {
        user: {
            name: "John"
        }
    }

    nextProps = {
        user: {
            name: "John"
        }
    }

React не робить автоматично:

    previousProps.user.name
        ===
    nextProps.user.name

Він порівнює top-level prop value:

    previousProps.user
        vs
    nextProps.user

І якщо references різні:

    false

---

# Passing Individual Props

Іноді замість:

    <UserCard user={user} />

можна передати тільки потрібні primitive values:

    <UserCard
        name={user.name}
        age={user.age}
    />

Це може зробити memoization простішою, тому що:

    name → string
    age  → number

а не:

    user → object reference

Це не універсальне правило, але корисний design consideration.

---

# Example — Passing Boolean Instead of Object

Замість:

    <CallToAction
        user={user}
    />

якщо component потрібне лише:

    user.isAdmin

можна:

    <CallToAction
        isAdmin={user.isAdmin}
    />

Тоді memoized component залежить лише від потрібного primitive value.

---

# Minimize Props

Для memoized components іноді корисно передавати тільки необхідні дані.

Замість:

    <UserCard user={user} />

можна:

    <UserCard
        name={user.name}
        avatar={user.avatar}
    />

Це зменшує кількість data, яку component отримує та порівнює.

Але не потрібно робити props API штучно складним.

---

# Custom arePropsEqual Example

Наприклад:

    const UserCard = React.memo(
        function UserCard({ user }) {
            return (
                <div>
                    {user.name}
                </div>
            );
        },
        (prevProps, nextProps) => {
            return (
                prevProps.user.name ===
                nextProps.user.name
            );
        }
    );

Тут component буде вважати props equal, якщо:

    user.name

однаковий.

Але це безпечно тільки якщо інші зміни `user` не впливають на rendered output.

---

# Небезпека неправильної arePropsEqual

Припустимо:

    function UserCard({ user }) {
        return (
            <div>
                {user.name}
                {user.age}
            </div>
        );
    }

А comparison:

    (prev, next) => {
        return prev.user.name === next.user.name;
    }

Проблема:

    name same
    age changed

але comparison повертає:

    true

React може пропустити render, і UI може залишитися зі старим age.

Тому custom comparison повинна враховувати всі props, які впливають на output.

---

# React.memo and Effects

`React.memo` не є способом керування effects.

Наприклад:

    const Component = React.memo(function Component({
        userId
    }) {
        useEffect(() => {
            fetchUser(userId);
        }, [userId]);

        return <div>{userId}</div>;
    });

Якщо:

    userId

не змінився і component render пропущений, effect не запускається через цей пропущений render.

Але якщо:

    userId

змінився, component render-иться, і effect може реагувати на зміну dependency.

---

# React.memo and Event Handlers

Event handler може бути inline:

    <button
        onClick={() => setOpen(true)}
    >
        Open
    </button>

Це нормально.

Проблема виникає не через сам факт використання inline function, а коли function identity передається далі як prop і її зміна має performance consequences.

---

# Не боятися inline functions

Не потрібно вважати:

    onClick={() => setOpen(true)}

поганим кодом.

Inline function часто абсолютно нормальна.

Питання:

    Does this changing reference
    actually cause a measured problem?

Якщо ні:

    keep the code simple.

---

# React.memo and Composition

Memoization — не єдиний спосіб оптимізації.

Іноді краще змінити структуру компонентів.

Наприклад:

    App
    ├── Search
    └── ExpensiveContent

Якщо search state потрібен тільки `Search`, локалізація state може бути кращою оптимізацією, ніж:

    React.memo(ExpensiveContent)

Тобто:

    architecture first
        ↓
    memoization second

---

# React.memo and State Colocation

Порівняння.

Варіант 1:

    App
      └── search state
          ├── Search
          └── ExpensiveContent

Варіант 2:

    App
      ├── Search
      │    └── search state
      └── ExpensiveContent

У другому варіанті зміна search state може бути локалізована в `Search`.

Це може повністю усунути проблему, яку інакше намагалися б вирішити через `React.memo`.

---

# React.memo vs useMemo

Це різні речі.

`React.memo`:

    memoize component rendering

`useMemo`:

    memoize calculation result

Наприклад:

    const Child = React.memo(function Child() {
        ...
    });

та:

    const result = useMemo(() => {
        return expensiveCalculation();
    }, [data]);

---

# React.memo vs useCallback

`React.memo`:

    optimize component rendering

`useCallback`:

    stabilize function reference

Разом вони можуть працювати:

    React.memo
        +
    useCallback
        ↓
    memoized child
    receives stable callback

---

# React.memo vs useMemo vs useCallback

Запам'ятати:

    React.memo
        ↓
    component

    useMemo
        ↓
    value / calculation result

    useCallback
        ↓
    function reference

---

# Performance Triangle

Часто зустрічається зв'язка:

    Parent
       ↓
    useCallback
       ↓
    stable function prop
       ↓
    React.memo
       ↓
    Child skips render

Або:

    Parent
       ↓
    useMemo
       ↓
    stable object / array
       ↓
    React.memo
       ↓
    Child skips render

---

# Profiler

React DevTools Profiler допомагає перевірити, чи справді `React.memo` допоміг.

Workflow:

    before optimization
          ↓
       profile
          ↓
    identify component
          ↓
       add memo
          ↓
       profile again
          ↓
    compare results

---

# Performance Measurement

Не слід оцінювати optimization лише за:

    console.log()

Наприклад:

    console.log("render");

показує факт render, але не обов'язково:

    actual performance cost

Для реального аналізу використовуй profiling tools.

---

# Практичний алгоритм

Якщо бачиш unnecessary render:

    1. Identify component.

    2. Find why parent renders.

    3. Check component props.

    4. Check whether props actually change.

    5. Check object / array / function references.

    6. Measure render cost.

    7. Consider React.memo.

    8. Stabilize required props if necessary.

    9. Measure again.

---

# Приклад повного аналізу

Маємо:

    function App() {
        const [count, setCount] = useState(0);

        const handleClick = () => {
            console.log("click");
        };

        return (
            <>
                <button
                    onClick={() => setCount(count + 1)}
                >
                    {count}
                </button>

                <Child onClick={handleClick} />
            </>
        );
    }

    const Child = React.memo(function Child({
        onClick
    }) {
        console.log("Child render");

        return (
            <button onClick={onClick}>
                Child
            </button>
        );
    });

Проблема:

    count changes
        ↓
    App re-renders
        ↓
    handleClick recreated
        ↓
    onClick prop changed
        ↓
    Child re-renders

Optimization:

    const handleClick = useCallback(() => {
        console.log("click");
    }, []);

Тепер:

    count changes
        ↓
    App re-renders
        ↓
    handleClick reference stable
        ↓
    Child props unchanged
        ↓
    Child render can be skipped

---

# Але чи потрібна тут оптимізація?

Це важливе питання.

Якщо `Child`:

    дуже маленький
    і render дешевий

можливо:

    optimization is unnecessary.

Якщо:

    Child
      ↓
    huge list
      ↓
    expensive calculation

тоді optimization може мати значення.

---

# Typical Pattern

    const ExpensiveChild = React.memo(
        function ExpensiveChild({
            data,
            onSelect
        }) {
            ...
        }
    );

    function Parent({ data }) {
        const onSelect = useCallback(
            item => {
                ...
            },
            []
        );

        const visibleData = useMemo(
            () => expensiveTransform(data),
            [data]
        );

        return (
            <ExpensiveChild
                data={visibleData}
                onSelect={onSelect}
            />
        );
    }

Тут:

    React.memo
        ↓
    skip child render

    useCallback
        ↓
    stable callback

    useMemo
        ↓
    stable calculated value

Але така architecture повинна бути виправдана performance problem.

---

# Типові помилки

❌ Використовувати `React.memo` всюди.

    const Component = React.memo(...);

для кожного component без аналізу.

---

❌ Вважати, що `React.memo` повністю забороняє re-render.

Власний state компонента все одно може його re-render-ити.

---

❌ Передавати новий object prop.

    <Child
        options={{
            theme: "dark"
        }}
    />

---

❌ Передавати нову function reference без розуміння наслідків.

    <Child
        onClick={() => doSomething()}
    />

---

❌ Використовувати `useCallback` для кожної function.

    const fn = useCallback(...);

без performance reason.

---

❌ Використовувати `useMemo` для кожного object.

    const value = useMemo(() => ({ ... }), []);

без необхідності.

---

❌ Писати неправильну `arePropsEqual`.

    () => true

може призвести до stale UI.

---

❌ Робити дорогий deep comparison.

    deepEqual(previous, next)

може коштувати дорожче за render.

---

❌ Плутати props comparison із deep comparison.

`React.memo` не порівнює весь object tree рекурсивно.

---

❌ Вважати будь-який re-render проблемою.

Re-render сам по собі — нормальна частина React.

---

❌ Оптимізувати без вимірювання.

Правильніше:

    measure
        ↓
    optimize
        ↓
    measure again

---

# React.memo — коли використовувати

Розглядай `React.memo`, якщо:

    □ Parent часто re-renders.

    □ Child отримує ті самі props.

    □ Child render relatively expensive.

    □ Child не залежить від context updates,
      які постійно змінюються.

    □ Props можуть залишатися referentially stable.

    □ Profiler показав unnecessary rendering.

---

# React.memo — коли не використовувати автоматично

Не потрібно додавати його лише тому, що:

    "React component renders."

Також не обов'язково додавати його, якщо:

    component tiny
    parent rarely renders
    props always change
    comparison is expensive
    bottleneck is elsewhere

---

# React.memo Decision Tree

    Is there a performance problem?
             ↓
            No
             ↓
       Keep code simple

             Yes
             ↓
    Is child rendering expensive?
             ↓
            No
             ↓
    Look for another bottleneck

             Yes
             ↓
    Does child receive same props?
             ↓
            No
             ↓
    Stabilize architecture / props

             Yes
             ↓
        Try React.memo
             ↓
          Measure
             ↓
      Did performance improve?
          ↙        ↘
        Yes         No
         ↓           ↓
      Keep        Reconsider
                  optimization

---

# Питання зі співбесіди

Що таке `React.memo`?

Для чого використовується `React.memo`?

Як працює `React.memo`?

Що відбувається, коли parent re-renders?

Як React вирішує, чи потрібно повторно render-ити memoized component?

Як порівнюються props?

Що таке `Object.is`?

Що таке referential equality?

Чому:

    {} === {}

повертає:

    false

Чому object props можуть ламати memoization?

Чому function props можуть ламати memoization?

Що таке stable reference?

Що таке unstable reference?

Чи `React.memo` працює з primitive props?

Чи `React.memo` працює з object props?

Чи `React.memo` працює з array props?

Чи `React.memo` працює з function props?

Чи `React.memo` блокує state updates?

Чи `React.memo` блокує context updates?

Що таке custom comparison?

Що таке `arePropsEqual`?

Які ризики custom comparison?

Чому deep comparison може бути дорогою?

Чим `React.memo` відрізняється від `useMemo`?

Чим `React.memo` відрізняється від `useCallback`?

Коли `React.memo` може не дати benefit?

Чому не потрібно memoize every component?

Як `useCallback` допомагає `React.memo`?

Як `useMemo` допомагає `React.memo`?

Як state colocation може зменшити потребу в `React.memo`?

Як перевірити, чи `React.memo` реально покращив performance?

Що таке unnecessary re-render?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке:

    React.memo
    memoization
    props
    re-render
    parent render
    child render

Розуміти:

    React.memo(Component)

Розуміти:

    props comparison

Розуміти:

    Object.is

Розуміти:

    primitive values
    objects
    arrays
    functions

Розуміти:

    referential equality

Знати:

    same primitive value
        ↓
    props can be equal

    new object reference
        ↓
    prop changed

    new function reference
        ↓
    prop changed

Розуміти:

    React.memo
        +
    stable props
        ↓
    skip unnecessary render

---

🔵 Junior

Вміти пояснити:

    React.memo

Розуміти:

    parent re-render
    child re-render
    props comparison

Розуміти проблеми:

    object props
    array props
    function props

Вміти використовувати:

    React.memo
    useMemo
    useCallback

у простих performance cases.

Розуміти:

    React.memo ≠ no renders

Знати, що:

    local state
    context

можуть спричинити updates незалежно від memoization props comparison.

Вміти знайти unstable prop references.

Вміти пояснити:

    why memoization works
    why memoization fails

---

🟠 Middle

Глибоко розуміти:

    referential equality
    Object.is
    memoization
    stable references

Розуміти взаємодію:

    React.memo
    useMemo
    useCallback

Розуміти:

    custom arePropsEqual
    comparison cost
    deep comparison

Вміти аналізувати:

    unnecessary renders
    expensive components
    unstable props
    component boundaries
    state placement

Вміти використовувати:

    React DevTools Profiler

Розуміти trade-off:

    render cost
        vs
    comparison cost
        vs
    memory cost
        vs
    code complexity

---

🔴 Senior

Глибоке розуміння:

    React rendering model
    reconciliation
    component identity
    element identity
    referential equality
    memoization boundaries

Розуміти:

    when memoization helps
    when memoization hurts
    when architecture is better than memoization

Вміти аналізувати:

    render frequency
    render cost
    comparison cost
    commit cost
    memory overhead

Розуміти interaction між:

    React.memo
    useMemo
    useCallback
    context
    state architecture
    composition
    external stores

Вміти проектувати component tree так, щоб:

    unnecessary renders

мінімізувалися не тільки через memoization, а через:

    state colocation
    component boundaries
    composition
    selective subscriptions

Головний принцип:

    Do not memoize because you can.

    Memoize because measurement
    shows that it helps.

---

# Міні-шпаргалка

## React.memo

    const MemoizedComponent = React.memo(Component);

---

## Inline form

    const Component = React.memo(function Component({
        name
    }) {
        return <h1>{name}</h1>;
    });

---

## Основна логіка

    Parent re-renders
          ↓
    Memoized Child
          ↓
    compare props
          ↓
    props same
          ↓
    skip render

---

## Props changed

    props changed
        ↓
    Child renders

---

## Props unchanged

    props unchanged
        ↓
    Child render can be skipped

---

## Primitive

    "John" === "John"
    // true

    25 === 25
    // true

---

## Object

    {} === {}
    // false

---

## Array

    [] === []
    // false

---

## Function

    (() => {}) === (() => {})
    // false

---

## Same reference

    const user = {
        name: "John"
    };

    const sameUser = user;

    user === sameUser;
    // true

---

## React.memo + object

Проблема:

    <Child
        options={{
            theme: "dark"
        }}
    />

Новий reference при кожному render.

---

## React.memo + useMemo

    const options = useMemo(() => ({
        theme: "dark"
    }), []);

    <Child options={options} />

---

## React.memo + function

Проблема:

    <Child
        onClick={() => doSomething()}
    />

Нова function reference.

---

## React.memo + useCallback

    const handleClick = useCallback(() => {
        doSomething();
    }, []);

    <Child onClick={handleClick} />

---

## React.memo + state

    const Component = React.memo(function Component() {
        const [count, setCount] = useState(0);

        ...
    });

`setCount()` все одно може спричинити re-render component.

---

## React.memo + context

    const Component = React.memo(function Component() {
        const theme = useContext(ThemeContext);

        ...
    });

Context update може спричинити re-render.

---

## Custom comparison

    const Component = React.memo(
        Component,
        (prevProps, nextProps) => {
            return prevProps.id === nextProps.id;
        }
    );

---

## Warning

    arePropsEqual() === true

означає:

    "Props are equal."

Якщо повернути `true` помилково, UI може не оновитися.

---

## Three tools

    React.memo
        ↓
    memoize component rendering

    useMemo
        ↓
    memoize calculation result

    useCallback
        ↓
    memoize function reference

---

## Performance workflow

    Measure
       ↓
    Identify
       ↓
    Optimize
       ↓
    Measure again

---

## Головне правило

    React.memo
        +
    stable props
        ↓
    potentially fewer renders

Але:

    React.memo
        +
    always-changing props
        ↓
    little or no benefit

---

# Головне:

• `React.memo` — API для memoization функціонального компонента.

• Він може дозволити React пропустити render компонента, якщо його props не змінилися.

• За замовчуванням props порівнюються через `Object.is`.

• Primitive values зазвичай порівнюються за значенням.

• Objects, arrays та functions порівнюються за reference.

• Тому:

    {}`

    !==

    {}

• Новий object prop на кожному render може спричинити re-render memoized component.

• Нова array reference також може спричинити re-render.

• Нова function reference також може спричинити re-render.

• `useMemo` може допомогти стабілізувати object або array reference.

• `useCallback` може допомогти стабілізувати function reference.

• `React.memo` не блокує component від його власних state updates.

• `React.memo` не означає:

    "component will never render again."

• Context updates також можуть впливати на memoized components, які читають context.

• Custom comparison можна передати другим аргументом:

    React.memo(Component, arePropsEqual)

• `arePropsEqual` повинна правильно враховувати всі props, які впливають на output компонента.

• Надто дорога custom comparison може бути гіршою за сам render.

• Deep comparison не слід використовувати без необхідності та measurement.

• `React.memo` не є заміною правильної state architecture.

• State colocation іноді дозволяє вирішити performance problem краще, ніж memoization.

• Не кожен re-render є проблемою.

• Не кожен component потрібно memoize-ити.

• Маленький і дешевий component може бути швидшим та простішим без `React.memo`.

• Memoization має свою ціну:

    comparison
    memory
    complexity

• Основна модель:

    Parent render
          ↓
    props comparison
          ↓
    same → skip
    changed → render

• Основна взаємодія:

    React.memo
        ↓
    component

    useMemo
        ↓
    value

    useCallback
        ↓
    function

• Головне питання:

    "Does this memoization
     solve a measured performance problem?"

• Правильний workflow:

    measure
        ↓
    identify unnecessary work
        ↓
    apply React.memo if appropriate
        ↓
    stabilize props if necessary
        ↓
    measure again

• Головний принцип:

    Do not memoize everything.

    Optimize measured expensive
    or unnecessary rendering.