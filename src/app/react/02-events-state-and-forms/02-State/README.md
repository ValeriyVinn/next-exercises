# React — State

State — це внутрішні дані компонента React, які можуть змінюватися під час роботи застосунку та впливати на те, що компонент відображає.

State використовується, коли компонент повинен:

    зберігати інформацію між renders;
    реагувати на дії користувача;
    оновлювати UI;
    зберігати поточний стан форми;
    відкривати / закривати UI;
    зберігати selected value;
    рахувати значення;
    зберігати дані, отримані під час interaction.

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

Користувач натискає кнопку:

    click
      ↓
    setCount(...)
      ↓
    state changes
      ↓
    component re-renders
      ↓
    updated UI

---

# Основні поняття

✔ state  
✔ component state  
✔ `useState`  
✔ state variable  
✔ state setter  
✔ initial state  
✔ current state  
✔ state update  
✔ render  
✔ re-render  
✔ immutable update  
✔ state preservation  
✔ state reset  
✔ state isolation  
✔ primitive state  
✔ object state  
✔ array state  
✔ boolean state  
✔ lazy initialization  
✔ functional state update  
✔ state batching  
✔ state snapshot  

---

# Що потрібно пам'ятати

• State — це дані, які React зберігає між renders компонента.

• Для створення state найчастіше використовується:

    useState()

• `useState()` повертає пару:

    [state, setter]

Наприклад:

    const [count, setCount] = useState(0);

Тут:

    count
        → current state

    setCount
        → function для оновлення state

• Не можна змінювати state напряму.

Неправильно:

    count = count + 1;

Правильно:

    setCount(count + 1);

• Оновлення state повідомляє React, що компонент потрібно повторно відрендерити.

• State є локальним для конкретного component instance.

• Два однакових компоненти можуть мати незалежний state.

• State може бути:

    number
    string
    boolean
    object
    array
    null
    інші JavaScript values

• State повинен містити мінімально необхідні дані.

• Derived data часто не потрібно зберігати в state.

• State update є асинхронним з точки зору коду компонента: після виклику setter не потрібно очікувати, що локальна state variable негайно зміниться в поточному render.

---

# useState

`useState` — React Hook для додавання state до function component.

Імпорт:

    import { useState } from "react";

Синтаксис:

    const [state, setState] = useState(initialState);

Наприклад:

    const [count, setCount] = useState(0);

---

# State Variable

State variable — змінна, яка містить поточне значення state.

Наприклад:

    const [name, setName] = useState("");

Тут:

    name

є state variable.

Її значення:

    ""

під час initial render.

Після update:

    setName("Valeriy");

на наступному render:

    name === "Valeriy"

---

# State Setter

Setter — функція, яку React повертає разом зі state.

Наприклад:

    const [count, setCount] = useState(0);

    setCount(10);

Setter використовується для запиту на оновлення state.

---

# Initial State

Initial state — початкове значення state.

    const [count, setCount] = useState(0);

Тут:

    0

є initial state.

Для string:

    const [name, setName] = useState("");

Для boolean:

    const [isOpen, setIsOpen] = useState(false);

Для array:

    const [items, setItems] = useState([]);

Для object:

    const [user, setUser] = useState({
        name: "",
        age: 0
    });

---

# State Types

State може зберігати різні типи даних.

## Number

    const [count, setCount] = useState(0);

---

## String

    const [name, setName] = useState("");

---

## Boolean

    const [isOpen, setIsOpen] = useState(false);

---

## Array

    const [items, setItems] = useState<string[]>([]);

---

## Object

    type User = {
        name: string;
        age: number;
    };

    const [user, setUser] = useState<User>({
        name: "",
        age: 0
    });

---

# State and Render

React function component виконується під час render.

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

Під час initial render:

    count = 0

Після:

    setCount(1)

React виконає component function знову.

Наступний render:

    count = 1

---

# Re-render

Re-render — повторне виконання component function для отримання оновленого UI.

Спрощена модель:

    state update
        ↓
    React schedules render
        ↓
    component function runs
        ↓
    React calculates UI changes
        ↓
    DOM updates where needed

---

# State Flow

Основна модель:

    initial state
        ↓
      render
        ↓
    user interaction
        ↓
    event handler
        ↓
    state setter
        ↓
    re-render
        ↓
    updated state
        ↓
    updated UI

---

# Простий Counter

    import { useState } from "react";

    function Counter() {
        const [count, setCount] = useState(0);

        function handleIncrement() {
            setCount(count + 1);
        }

        return (
            <button onClick={handleIncrement}>
                Count: {count}
            </button>
        );
    }

Початково:

    count = 0

Після першого click:

    count = 1

Після другого:

    count = 2

---

# State Setter

Setter можна викликати з новим значенням.

    const [count, setCount] = useState(0);

    setCount(10);

Наступний render матиме:

    count = 10

---

# State Doesn't Change Immediately

Важливо розуміти:

    setCount(10);

не змінює поточну локальну змінну `count` всередині вже виконуваного render.

Наприклад:

    function handleClick() {
        setCount(10);

        console.log(count);
    }

Якщо поточний `count` був `0`, console може показати:

    0

Це тому, що поточний render працює зі своїм state snapshot.

Новий state буде доступний у наступному render.

---

# State Snapshot

Кожен render бачить snapshot state на момент цього render.

Наприклад:

    render #1
        count = 0

Після:

    setCount(1)

новий render:

    render #2
        count = 1

Можна думати про це так:

    render
      ↓
    snapshot of state
      ↓
    JSX uses this snapshot

---

# State Isolated per Component Instance

Якщо компонент використовується двічі:

    function Counter() {
        const [count, setCount] = useState(0);

        return (
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        );
    }

    function App() {
        return (
            <>
                <Counter />
                <Counter />
            </>
        );
    }

Кожен `Counter` має власний state.

    Counter #1
        count = 0

    Counter #2
        count = 0

Якщо змінити перший:

    Counter #1
        count = 1

    Counter #2
        count = 0

---

# State Is Local

State належить component instance, у якому він створений.

Наприклад:

    function User() {
        const [name, setName] = useState("");

        ...
    }

`name` є локальним state цього component instance.

Інші компоненти не отримують його автоматично.

---

# State vs Local Variable

Звичайна локальна змінна:

    function Counter() {
        let count = 0;

        count++;

        return <p>{count}</p>;
    }

При наступному render:

    count = 0

Звичайна змінна не зберігає значення між renders.

State:

    function Counter() {
        const [count, setCount] = useState(0);

        ...
    }

React зберігає state між renders.

---

# Local Variable vs State

    local variable
        → temporary value during render

    state
        → value preserved between renders

State також дозволяє React дізнатися, що UI потрібно оновити.

---

# State vs Props

Props:

    parent
      ↓
    child

Props передаються компоненту ззовні.

State:

    component
      ↓
    internal data

State належить компоненту.

Наприклад:

    function Child({ name }: { name: string }) {
        const [count, setCount] = useState(0);

        ...
    }

Тут:

    name
        → prop

    count
        → state

---

# State and Props Together

    function UserCard({
        name
    }: {
        name: string;
    }) {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div>
                <h2>{name}</h2>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                >
                    Toggle
                </button>

                {isOpen && (
                    <p>Details</p>
                )}
            </div>
        );
    }

`name` приходить через props.

`isOpen` зберігається в state.

---

# State Naming

Для boolean state часто використовують:

    isOpen
    isLoading
    isActive
    isVisible
    hasError
    isSelected

Наприклад:

    const [isOpen, setIsOpen] = useState(false);

Для values:

    const [name, setName] = useState("");

    const [count, setCount] = useState(0);

    const [email, setEmail] = useState("");

---

# Boolean State

Boolean state часто використовується для UI states.

Наприклад:

    const [isOpen, setIsOpen] = useState(false);

Toggle:

    setIsOpen(!isOpen);

Наприклад:

    function Modal() {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <>
                <button
                    onClick={() => setIsOpen(true)}
                >
                    Open
                </button>

                {isOpen && (
                    <div>
                        Modal
                    </div>
                )}
            </>
        );
    }

---

# Toggle State

Типовий pattern:

    setIsOpen(!isOpen);

Було:

    false

стане:

    true

Наступний click:

    true

стане:

    false

Для більш надійного update, особливо коли наступний state залежить від попереднього:

    setIsOpen(prev => !prev);

Цей pattern буде важливим у розділі:

    03-state-updates

---

# State Update with New Value

Можна передати нове значення:

    setCount(10);

    setName("Valeriy");

    setIsOpen(true);

---

# State Update with Function

Якщо новий state залежить від попереднього:

    setCount(prev => prev + 1);

Загальний pattern:

    setState(prev => newValue);

Наприклад:

    setCount(prev => prev + 1);

Це називається functional state update.

---

# Functional Update

Functional update особливо важливий, коли нове значення залежить від попереднього.

Наприклад:

    setCount(prevCount => prevCount + 1);

Тут:

    prevCount

— попереднє значення state.

---

# Multiple State Updates

Наприклад:

    function handleClick() {
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
    }

Не слід очікувати:

    count + 3

через те, що всі ці updates використовують один і той самий snapshot `count`.

Якщо потрібно виконати три послідовні updates на основі попереднього state:

    function handleClick() {
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
    }

Тоді кожний functional update отримує актуальне попереднє значення в update chain.

Це буде детальніше розглянуто у:

    03-state-updates

---

# State Updates and Batching

React може групувати кілька state updates разом.

Наприклад:

    function handleClick() {
        setCount(prev => prev + 1);
        setName("John");
        setIsOpen(true);
    }

React може обробити ці updates в одному rendering cycle.

Це називається batching.

На Core-рівні важливо пам'ятати:

    multiple state updates
        ↓
    React may batch them
        ↓
    render

---

# State Must Be Updated Through Setter

Неправильно:

    const [count, setCount] = useState(0);

    count = 10;

Правильно:

    setCount(10);

React відстежує state updates через setter.

---

# Why Direct Mutation Is Wrong

Наприклад:

    const [user, setUser] = useState({
        name: "John",
        age: 25
    });

Неправильно:

    user.name = "Anna";

Це mutation існуючого object.

Правильно:

    setUser({
        ...user,
        name: "Anna"
    });

Створюється новий object.

---

# Immutability

React state зазвичай оновлюють immutable способом.

Це означає:

    old state
        ↓
    create new value
        ↓
    setState(new value)

а не:

    old state
        ↓
    mutate directly

---

# Object State

Наприклад:

    type User = {
        name: string;
        age: number;
    };

    const [user, setUser] = useState<User>({
        name: "John",
        age: 25
    });

Оновлення:

    setUser({
        ...user,
        name: "Anna"
    });

Результат:

    {
        name: "Anna",
        age: 25
    }

---

# Object Spread

Для оновлення частини object state часто використовується spread:

    setUser({
        ...user,
        age: 26
    });

`...user` копіює існуючі properties.

Потім:

    age: 26

перезаписує `age`.

---

# Functional Object Update

Якщо update залежить від попереднього state:

    setUser(prev => ({
        ...prev,
        age: prev.age + 1
    }));

Це безпечний pattern для state updates, що залежать від previous state.

---

# Array State

Array також не потрібно змінювати напряму.

Наприклад:

    const [items, setItems] = useState<string[]>([]);

Додавання:

    setItems(prev => [
        ...prev,
        "React"
    ]);

---

# Array State — Add

    setItems(prev => [
        ...prev,
        newItem
    ]);

Було:

    ["HTML", "CSS"]

Стане:

    ["HTML", "CSS", "React"]

---

# Array State — Remove

Наприклад:

    setItems(prev =>
        prev.filter(item => item !== "React")
    );

---

# Array State — Update

Наприклад:

    setItems(prev =>
        prev.map(item =>
            item.id === id
                ? { ...item, completed: true }
                : item
        )
    );

Це буде детальніше розглядатися у state updates.

---

# Do Not Mutate Array

Неправильно:

    items.push("React");

    setItems(items);

Тут змінюється існуючий array.

Краще:

    setItems(prev => [
        ...prev,
        "React"
    ]);

---

# Common Array Operations

    add
        → spread

    remove
        → filter

    update
        → map

Наприклад:

    add:
    setItems(prev => [...prev, item]);

    remove:
    setItems(prev =>
        prev.filter(item => item.id !== id)
    );

    update:
    setItems(prev =>
        prev.map(item =>
            item.id === id
                ? { ...item, active: true }
                : item
        )
    );

---

# State with null

Іноді state може бути відсутнім:

    const [user, setUser] = useState<User | null>(null);

Спочатку:

    user === null

Після завантаження:

    setUser({
        name: "John",
        age: 25
    });

У JSX:

    {user && (
        <p>{user.name}</p>
    )}

---

# State with Undefined

Можна також мати:

    const [user, setUser] =
        useState<User | undefined>(undefined);

Але потрібно свідомо вибирати:

    null

або:

    undefined

відповідно до моделі даних.

---

# Derived Data

Не все потрібно зберігати в state.

Наприклад:

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

Не потрібно окремо зберігати:

    fullName

якщо його можна отримати:

    const fullName =
        `${firstName} ${lastName}`;

Тут:

    firstName
    lastName

— state.

А:

    fullName

— derived value.

---

# State Minimalism

Хороше правило:

    store only what must be stored

Наприклад:

    const [items, setItems] = useState([...]);

Якщо кількість items можна отримати:

    const itemCount = items.length;

не обов'язково мати:

    const [itemCount, setItemCount] = useState(0);

Інакше можна отримати несинхронізований state.

---

# Redundant State

Redundant state — state, який можна обчислити з іншого state або props.

Наприклад:

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [fullName, setFullName] = useState("");

Це може створити проблему:

    firstName
    lastName
    fullName

можуть не відповідати одне одному.

Краще:

    const fullName =
        `${firstName} ${lastName}`;

---

# State Structure

Якщо дані логічно пов'язані, їх можна зберігати разом.

Наприклад:

    const [user, setUser] = useState({
        name: "",
        email: "",
        age: 0
    });

Але якщо частини state змінюються незалежно, іноді зручніше:

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

Вибір структури залежить від логіки компонента.

---

# One State vs Multiple State Variables

Один object:

    const [form, setForm] = useState({
        name: "",
        email: ""
    });

Або окремо:

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

Обидва підходи можливі.

Потрібно вибирати структуру, яка робить state простим для оновлення та розуміння.

---

# State Initialization

Initial state передається в `useState`:

    useState(0)

    useState("")

    useState(false)

    useState([])

    useState({
        name: ""
    })

---

# Lazy Initialization

Якщо initial state потребує дорогої операції, можна передати function:

    const [value, setValue] = useState(() => {
        return expensiveCalculation();
    });

Тут function використовується для обчислення initial state.

Важливо відрізняти:

    useState(expensiveCalculation())

від:

    useState(() => expensiveCalculation())

Другий варіант передає initializer function.

---

# State Initialization from Function

Наприклад:

    const [items, setItems] = useState(() => {
        return createInitialItems();
    });

Це корисно, якщо створення initial state потребує помітної роботи.

---

# State Does Not Persist Across Remount

State зберігається між renders того самого component instance.

Але якщо component буде unmounted і змонтований заново:

    unmount
        ↓
    mount
        ↓
    initial state

State буде створений заново.

Наприклад:

    const [count, setCount] = useState(0);

Якщо component instance буде remounted, state знову почнеться з:

    0

---

# State and Component Identity

React зберігає state, коли component identity залишається тією самою позицією/структурою в tree.

Якщо identity змінюється, React може створити новий component instance і state буде reset.

Це буде важливіше при вивченні:

    keys
    conditional rendering
    component tree

---

# Reset State

State можна reset через зміну component identity, наприклад за допомогою `key`.

Наприклад:

    <Form key={userId} />

Коли:

    userId

змінюється, React може розглядати component як новий instance.

Це просунутий pattern, але важливо знати його існування.

---

# State and Conditional Rendering

State часто контролює умовний UI.

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
            >
                Open
            </button>

            {isOpen && (
                <div>
                    Content
                </div>
            )}
        </>
    );

State:

    false
        ↓
    content hidden

    true
        ↓
    content visible

---

# State for Loading

Boolean state може представляти loading status:

    const [isLoading, setIsLoading] = useState(false);

Наприклад:

    if (isLoading) {
        return <p>Loading...</p>;
    }

---

# State for Error

    const [hasError, setHasError] = useState(false);

Або:

    const [error, setError] =
        useState<string | null>(null);

---

# State for Selected Item

    const [selectedId, setSelectedId] =
        useState<number | null>(null);

Наприклад:

    <button
        onClick={() => setSelectedId(10)}
    >
        Select
    </button>

---

# State for Form Input

    const [email, setEmail] = useState("");

    <input
        value={email}
        onChange={(event) => {
            setEmail(event.target.value);
        }}
    />

Це буде детальніше розглянуто у:

    04-controlled-components
    05-forms

---

# State and Event

Найпоширеніший React pattern:

    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(prev => prev + 1);
    }

    return (
        <button onClick={handleClick}>
            {count}
        </button>
    );

Flow:

    event
      ↓
    handler
      ↓
    setter
      ↓
    state update
      ↓
    re-render
      ↓
    UI update

---

# State and Rendering

JSX може використовувати state:

    const [name, setName] = useState("John");

    return (
        <h1>
            Hello, {name}
        </h1>
    );

Після:

    setName("Anna");

UI стане:

    Hello, Anna

---

# State Controls UI

State може визначати:

    text
    visibility
    className
    disabled
    selected
    checked
    loading
    error
    list contents

Наприклад:

    <button disabled={isLoading}>
        Save
    </button>

---

# State as Source of Truth

Якщо UI залежить від state, state може бути source of truth.

Наприклад:

    const [isOpen, setIsOpen] = useState(false);

UI:

    {isOpen && <Modal />}

State:

    isOpen

визначає, чи modal показаний.

---

# State and Boolean UI

Типові UI states:

    isOpen
    isLoading
    isDisabled
    isActive
    isSelected
    isVisible
    hasError

Наприклад:

    const [isLoading, setIsLoading] =
        useState(false);

---

# State and Multiple Values

Компонент може мати кілька state variables.

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] =
        useState(false);

Кожен state має власний setter.

---

# Independent State

State variables можуть оновлюватися незалежно.

    setName("John");

    setEmail("john@example.com");

    setIsLoading(true);

Це не означає, що вони обов'язково потребують одного object state.

---

# State and Object Replacement

Важливо:

    setUser({
        name: "Anna"
    });

не означає:

    "зміни тільки name"

Setter для object замінює state value.

Якщо старі properties потрібно зберегти:

    setUser(prev => ({
        ...prev,
        name: "Anna"
    }));

---

# State and Array Replacement

Так само:

    setItems(newItems);

замінює весь array state.

Наприклад:

    setItems(["React"]);

Старий array:

    ["HTML", "CSS"]

буде замінений.

---

# State Update Queue

State updates можна уявляти як updates, які React обробляє перед наступним render.

Наприклад:

    setCount(prev => prev + 1);
    setCount(prev => prev + 1);

React обробить functional updates послідовно.

Спрощено:

    previous = 0

    update 1:
        0 + 1 = 1

    update 2:
        1 + 1 = 2

Наступний render:

    count = 2

---

# State Update Based on Previous State

Якщо нове значення залежить від старого:

    setCount(prev => prev + 1);

Краще використовувати functional update.

Інші приклади:

    setItems(prev => [...prev, item]);

    setItems(prev =>
        prev.filter(item => item.id !== id)
    );

    setUser(prev => ({
        ...prev,
        age: prev.age + 1
    }));

---

# State and Immutability

Основна модель:

    old state
        ↓
    create new state
        ↓
    setter
        ↓
    render

Наприклад:

    setUser(prev => ({
        ...prev,
        name: "Anna"
    }));

---

# Common Immutable Patterns

## Object

    setUser(prev => ({
        ...prev,
        name: "Anna"
    }));

---

## Array Add

    setItems(prev => [
        ...prev,
        item
    ]);

---

## Array Remove

    setItems(prev =>
        prev.filter(item => item.id !== id)
    );

---

## Array Update

    setItems(prev =>
        prev.map(item =>
            item.id === id
                ? { ...item, active: true }
                : item
        )
    );

---

# State and Reference Equality

React працює з JavaScript values та object references.

Наприклад:

    const nextUser = {
        ...user,
        name: "Anna"
    };

`nextUser` — новий object.

Це відрізняється від:

    user.name = "Anna";

де існуючий object мутується.

---

# State and Primitive Values

Для primitive values:

    number
    string
    boolean

оновлення просте:

    setCount(10);

    setName("Anna");

    setIsOpen(true);

---

# State and Objects

Для objects потрібно створювати новий object:

    setUser(prev => ({
        ...prev,
        name: "Anna"
    }));

---

# State and Arrays

Для arrays потрібно створювати новий array:

    setItems(prev => [
        ...prev,
        item
    ]);

Не:

    items.push(item);

---

# State and Nested Objects

Для nested data потрібно копіювати всі рівні, які змінюються.

Наприклад:

    const [user, setUser] = useState({
        name: "John",
        address: {
            city: "Kyiv"
        }
    });

Оновлення:

    setUser(prev => ({
        ...prev,
        address: {
            ...prev.address,
            city: "Vinnytsia"
        }
    }));

---

# State Colocation

State краще розміщувати якомога ближче до компонентів, які його використовують.

Наприклад:

    Component A
        ↓
    needs isOpen

Якщо тільки `A` використовує:

    isOpen

не потрібно автоматично переносити state у глобальне місце.

---

# State Lifting

Якщо два sibling components повинні використовувати одне значення, state часто піднімають до їхнього спільного parent.

Наприклад:

    Parent
      ├── Child A
      └── Child B

Якщо A і B потребують:

    selectedId

можна:

    Parent
        ↓
    selectedId state
        ↓
    Child A
    Child B

Це називається:

    lifting state up

Це буде детальніше розглядатися в наступних темах React architecture.

---

# State Sharing

Локальний state:

    component
        ↓
    useState

Shared state:

    common parent
        ↓
    props

Для складніших випадків використовуються:

    Context
    state management libraries

Context буде розглядатися у:

    06-context

---

# State and Server Data

Не все, що приходить із сервера, автоматично повинно бути локальним UI state.

Наприклад:

    users from API

можуть бути server data.

А:

    isModalOpen

є UI state.

Пізніше це буде важливо при:

    data fetching
    caching
    server state
    client state

---

# State vs Derived Value

State:

    const [items, setItems] = useState([]);

Derived:

    const count = items.length;

Не потрібно:

    const [count, setCount] = useState(0);

якщо `count` повністю визначається `items`.

---

# State vs Constant

Не кожна змінна повинна бути state.

Наприклад:

    const title = "React";

Не потрібно:

    const [title, setTitle] = useState("React");

якщо title ніколи не змінюється через interaction.

---

# State Design

Перед створенням state корисно запитати:

    1. Чи змінюється це значення?
    2. Чи має UI реагувати на його зміну?
    3. Чи потрібно зберігати його між renders?
    4. Чи можна отримати його з props/state?
    5. Хто повинен ним володіти?

Якщо значення не змінюється:

    constant

Якщо змінюється і впливає на UI:

    state

Якщо обчислюється з іншого state:

    derived value

---

# Practical Example — Toggle

    import { useState } from "react";

    function Toggle() {
        const [isOpen, setIsOpen] = useState(false);

        function handleToggle() {
            setIsOpen(prev => !prev);
        }

        return (
            <>
                <button onClick={handleToggle}>
                    Toggle
                </button>

                {isOpen && (
                    <p>Content is visible</p>
                )}
            </>
        );
    }

---

# Practical Example — Counter

    import { useState } from "react";

    function Counter() {
        const [count, setCount] = useState(0);

        function increment() {
            setCount(prev => prev + 1);
        }

        function decrement() {
            setCount(prev => prev - 1);
        }

        return (
            <>
                <p>{count}</p>

                <button onClick={increment}>
                    +
                </button>

                <button onClick={decrement}>
                    -
                </button>
            </>
        );
    }

---

# Practical Example — Name

    import { useState } from "react";

    function Name() {
        const [name, setName] = useState("");

        return (
            <>
                <input
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />

                <p>
                    Name: {name}
                </p>
            </>
        );
    }

---

# Practical Example — Checkbox

    import { useState } from "react";

    function Agreement() {
        const [accepted, setAccepted] =
            useState(false);

        return (
            <>
                <label>
                    <input
                        type="checkbox"
                        checked={accepted}
                        onChange={(event) => {
                            setAccepted(
                                event.target.checked
                            );
                        }}
                    />

                    I agree
                </label>

                <p>
                    Accepted: {accepted ? "yes" : "no"}
                </p>
            </>
        );
    }

---

# Practical Example — Object State

    import { useState } from "react";

    type User = {
        name: string;
        age: number;
    };

    function UserForm() {
        const [user, setUser] = useState<User>({
            name: "",
            age: 0
        });

        function handleNameChange(
            event: React.ChangeEvent<HTMLInputElement>
        ) {
            setUser(prev => ({
                ...prev,
                name: event.target.value
            }));
        }

        return (
            <>
                <input
                    value={user.name}
                    onChange={handleNameChange}
                />

                <p>
                    {user.name}
                </p>
            </>
        );
    }

---

# Practical Example — Array State

    import { useState } from "react";

    function TodoList() {
        const [items, setItems] =
            useState<string[]>([]);

        function addItem() {
            setItems(prev => [
                ...prev,
                "New item"
            ]);
        }

        return (
            <>
                <button onClick={addItem}>
                    Add
                </button>

                <ul>
                    {items.map((item, index) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))}
                </ul>
            </>
        );
    }

---

# Practical Example — Multiple State Values

    function Form() {
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [isLoading, setIsLoading] =
            useState(false);

        ...
    }

Тут є три незалежні state values:

    name
    email
    isLoading

---

# Practical Example — Derived Value

    function Cart() {
        const [items, setItems] = useState([
            { id: 1, name: "Book" },
            { id: 2, name: "Pen" }
        ]);

        const itemCount = items.length;

        return (
            <p>
                Items: {itemCount}
            </p>
        );
    }

`itemCount` не потрібно зберігати в state.

Він derived від:

    items

---

# Practical Example — State and Conditional UI

    function Profile() {
        const [isLoggedIn, setIsLoggedIn] =
            useState(false);

        return (
            <>
                {isLoggedIn ? (
                    <p>Welcome!</p>
                ) : (
                    <p>Please log in.</p>
                )}

                <button
                    onClick={() =>
                        setIsLoggedIn(prev => !prev)
                    }
                >
                    Toggle
                </button>
            </>
        );
    }

---

# Practical Example — Loading State

    function SaveButton() {
        const [isLoading, setIsLoading] =
            useState(false);

        function handleSave() {
            setIsLoading(true);

            // later:
            // setIsLoading(false);
        }

        return (
            <button
                onClick={handleSave}
                disabled={isLoading}
            >
                {isLoading ? "Saving..." : "Save"}
            </button>
        );
    }

---

# State Lifecycle

Спрощено:

    component mounts
        ↓
    initial state
        ↓
    render
        ↓
    user interaction
        ↓
    state update
        ↓
    re-render
        ↓
    new state snapshot
        ↓
    updated UI

State зберігається, поки React зберігає відповідний component instance.

---

# State and Render Mental Model

Корисно думати так:

    Component
        ↓
    receives props
        ↓
    reads state
        ↓
    returns JSX

Після state update:

    setState()
        ↓
    React schedules update
        ↓
    component renders again
        ↓
    new JSX
        ↓
    UI reflects new state

---

# State Update Mental Model

Не варто думати:

    setCount(10)
        ↓
    count immediately becomes 10
        ↓
    continue current function with count = 10

Краще:

    setCount(10)
        ↓
    request state update
        ↓
    current handler continues
        ↓
    React processes update
        ↓
    new render
        ↓
    count = 10

---

# State Snapshot Mental Model

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        function handleClick() {
            setCount(count + 1);

            console.log(count);
        }

        ...
    }

Якщо цей render мав:

    count = 0

то весь handler бачить:

    count = 0

Навіть після:

    setCount(1)

Новий:

    count = 1

буде доступний у наступному render.

---

# State Update Rules

Основні правила:

    1. Не змінювати state напряму.

    2. Використовувати setter.

    3. Якщо update залежить від previous state —
       використовувати functional update.

    4. Objects оновлювати immutable способом.

    5. Arrays оновлювати immutable способом.

    6. Не зберігати redundant state без необхідності.

    7. Розміщувати state там, де він потрібен.

---

# Типові помилки

❌ Direct mutation.

    count = count + 1;

Правильно:

    setCount(count + 1);

---

❌ Mutating object.

    user.name = "Anna";

Правильно:

    setUser(prev => ({
        ...prev,
        name: "Anna"
    }));

---

❌ Mutating array.

    items.push(item);

Правильно:

    setItems(prev => [
        ...prev,
        item
    ]);

---

❌ Очікувати негайну зміну state.

    setCount(10);

    console.log(count);

Не потрібно очікувати, що `count` у поточному render вже стане `10`.

---

❌ Використовувати current state для кількох залежних updates.

    setCount(count + 1);
    setCount(count + 1);

Якщо потрібно послідовно збільшити state:

    setCount(prev => prev + 1);
    setCount(prev => prev + 1);

---

❌ Зберігати derived data як окремий state.

    const [items, setItems] = useState([]);
    const [count, setCount] = useState(0);

Якщо:

    count === items.length

то `count` може бути derived:

    const count = items.length;

---

❌ Створювати state для константи.

Непотрібно:

    const [title, setTitle] =
        useState("React");

якщо title не змінюється.

Краще:

    const title = "React";

---

❌ Зберігати забагато пов'язаних state values.

Наприклад:

    isLoading
    hasError
    isSuccess

іноді можуть створювати неможливі комбінації.

Потрібно продумувати модель state.

---

# State Design Questions

Перед створенням state запитай себе:

    Що саме я зберігаю?

    Чи змінюється це значення?

    Чи повинен UI реагувати на зміну?

    Чи можна отримати це значення
    з іншого state?

    Чи можна отримати його з props?

    Хто повинен володіти цим state?

    Чи повинен state бути local?

    Чи потрібно передати його parent/child?

---

# State Decision Tree

Спрощено:

    Значення змінюється?
            ↓
          ні
            ↓
        constant

          так
            ↓
    UI залежить від нього?
            ↓
          ні
            ↓
      local variable /
      external logic

          так
            ↓
          state

Після цього:

    Чи можна обчислити
    з існуючого state?
            ↓
          так
            ↓
      derived value

          ні
            ↓
        keep state

---

# State and UI Architecture

Типовий React application:

    user action
        ↓
    event
        ↓
    event handler
        ↓
    state update
        ↓
    component render
        ↓
    UI

State є центральною частиною цього циклу.

---

# Міні-шпаргалка

## useState

    const [state, setState] = useState(initialState);

---

## Number

    const [count, setCount] = useState(0);

---

## String

    const [name, setName] = useState("");

---

## Boolean

    const [isOpen, setIsOpen] = useState(false);

---

## Array

    const [items, setItems] =
        useState<string[]>([]);

---

## Object

    const [user, setUser] = useState({
        name: "",
        age: 0
    });

---

## Update

    setCount(10);

---

## Functional Update

    setCount(prev => prev + 1);

---

## Toggle

    setIsOpen(prev => !prev);

---

## Object Update

    setUser(prev => ({
        ...prev,
        name: "Anna"
    }));

---

## Array Add

    setItems(prev => [
        ...prev,
        item
    ]);

---

## Array Remove

    setItems(prev =>
        prev.filter(item => item.id !== id)
    );

---

## Array Update

    setItems(prev =>
        prev.map(item =>
            item.id === id
                ? { ...item, active: true }
                : item
        )
    );

---

## Derived Value

    const count = items.length;

---

## State Flow

    event
      ↓
    handler
      ↓
    setState
      ↓
    re-render
      ↓
    updated UI

---

# Питання зі співбесіди

Що таке state у React?

Для чого потрібен state?

Що таке `useState`?

Що повертає `useState()`?

Що таке initial state?

Що таке state setter?

Чим state відрізняється від local variable?

Чим state відрізняється від props?

Що відбувається після виклику state setter?

Що таке re-render?

Чому не можна змінювати state напряму?

Що таке immutability?

Як оновити object state?

Як оновити array state?

Що таке functional state update?

Коли потрібно використовувати:

    setCount(prev => prev + 1)

замість:

    setCount(count + 1)

?

Що таке state snapshot?

Чому після `setState()` state variable не обов'язково змінюється негайно?

Що таке batching?

Чи може компонент мати кілька state variables?

Чи мають два instances одного компонента спільний state?

Що таке derived state?

Чому не варто зберігати redundant state?

Що таке lifting state up?

Де краще розміщувати state?

Коли використовувати boolean state?

Як реалізувати toggle?

Як зберігати array у state?

Як додати елемент до array state?

Як видалити елемент?

Як оновити один елемент array?

Як оновити nested object?

Що таке lazy initialization?

Що відбувається зі state після component remount?

Як `key` може впливати на state preservation/reset?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке state.

`useState`.

Initial state.

State variable.

State setter.

Re-render.

State snapshot.

State update.

State vs local variable.

State vs props.

Number state.

String state.

Boolean state.

Object state.

Array state.

State + events.

Functional update.

Immutable updates.

Основи derived data.

---

🔵 Junior

Розуміння:

    useState
    state setter
    functional updates
    state snapshots
    batching

Розуміння:

    primitive state
    object state
    array state

Immutable patterns:

    object spread
    array spread
    map()
    filter()

State design.

Derived values.

Avoiding redundant state.

Multiple state variables.

State colocation.

Lifting state up.

State reset.

State preservation.

Lazy initialization.

---

🟠 Middle

Складна state architecture.

State normalization.

Complex object state.

Nested state.

State machines.

Reducer-based state.

`useReducer`.

State lifting.

Shared state.

Context + state.

Server state vs client state.

Derived state architecture.

State synchronization.

State initialization strategies.

State reset patterns.

Component identity.

Keys and state preservation.

Performance considerations.

Avoiding unnecessary state updates.

---

🔴 Senior

Глибоке розуміння React state model.

Render and state snapshots.

State preservation rules.

Component identity.

Reconciliation.

State update queues.

Batching.

Concurrent rendering concepts.

Transitions.

State architecture.

State machines.

Complex state synchronization.

Client state vs server state.

State normalization.

Derived data architecture.

Avoiding duplicated state.

State ownership.

State colocation vs lifting.

Global state trade-offs.

Performance implications.

Immutable data structures.

State update patterns у великих application architectures.

---

# Головне

• State — це дані компонента, які React зберігає між renders.

• Для state найчастіше використовується:

    useState()

• `useState()` повертає:

    [state, setter]

• Наприклад:

    const [count, setCount] = useState(0);

• `count` — current state.

• `setCount` — setter для оновлення state.

• Не потрібно змінювати state напряму:

    count = 10;

Правильно:

    setCount(10);

• State update приводить до нового render.

• Основний flow:

    state update
        ↓
    re-render
        ↓
    updated UI

• State зберігається між renders одного component instance.

• Різні instances одного компонента мають незалежний state.

• Якщо нове значення залежить від попереднього, використовуй functional update:

    setCount(prev => prev + 1);

• Boolean state часто використовується для UI:

    isOpen
    isLoading
    isActive
    isSelected

• Object state потрібно оновлювати immutable способом:

    setUser(prev => ({
        ...prev,
        name: "Anna"
    }));

• Array state потрібно оновлювати immutable способом:

    setItems(prev => [
        ...prev,
        item
    ]);

• Для array:

    add
        → spread

    remove
        → filter

    update
        → map

• Не потрібно зберігати в state значення, яке можна легко обчислити:

    const count = items.length;

• State повинен містити мінімально необхідні дані.

• State snapshot означає, що кожен render працює зі своїм значенням state.

• Після:

    setCount(10);

не потрібно очікувати, що `count` у поточному render негайно стане `10`.

• React може batching-ити кілька state updates.

• State може бути локальним або піднятим до спільного parent.

• Якщо кілька компонентів повинні працювати з одним state, потрібно продумати ownership цього state.

• Основна модель React state:

    INITIAL STATE
          ↓
        RENDER
          ↓
      USER ACTION
          ↓
        EVENT
          ↓
       HANDLER
          ↓
      SET STATE
          ↓
     RE-RENDER
          ↓
    UPDATED STATE
          ↓
      UPDATED UI

• Найважливіша ментальна модель:

    State → описує,
    що компонент "пам'ятає".

    Event → описує,
    що сталося.

    Handler → описує,
    що зробити у відповідь.

    Render → описує,
    який UI показати для поточного state.

• У наступних темах:

    03-state-updates
        ↓
    детальніше розглядаються
    functional updates,
    batching,
    immutable updates,
    object/array state
    та складніші state patterns.

• Далі:

    04-controlled-components
        ↓
    state + form controls

    05-forms
        ↓
    state + forms

    06-form-validation
        ↓
    state + validation