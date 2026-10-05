# 01. useState

`useState` — це React Hook, який дозволяє функціональному компоненту зберігати та змінювати state.

State — це дані компонента, зміна яких може спричинити повторний render компонента.

`useState` — один із найважливіших React Hooks.

Він використовується, коли компонент повинен:

- зберігати значення між renders;
- реагувати на дії користувача;
- оновлювати UI після зміни даних;
- керувати формами;
- відкривати / закривати елементи UI;
- зберігати лічильники;
- зберігати вибране значення;
- зберігати стан завантаження;
- зберігати локальні дані компонента.

Основний синтаксис:

    const [state, setState] = useState(initialValue);

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

---

# Ключові поняття

✔ `useState`  
✔ Hook  
✔ state  
✔ initial state  
✔ state variable  
✔ state setter  
✔ `setState`  
✔ state update  
✔ render  
✔ re-render  
✔ component state  
✔ functional component  
✔ state persistence  
✔ immutable update  
✔ previous state  
✔ functional updater  
✔ lazy initialization  
✔ batching  
✔ state snapshot  
✔ asynchronous-looking state updates  
✔ state replacement  
✔ object state  
✔ array state  
✔ state lifting  

---

# Що потрібно пам'ятати

• `useState` дозволяє функціональному компоненту мати state.

• `useState()` повертає масив із двох елементів:

    [state, setState]

• Перший елемент — поточне значення state.

• Другий елемент — функція для оновлення state.

• `setState()` не змінює state безпосередньо.

• Після оновлення state React планує новий render компонента.

• Не можна змінювати state напряму.

❌ Неправильно:

    count = count + 1;

Правильно:

    setCount(count + 1);

• Якщо новий state залежить від попереднього state, краще використовувати functional updater:

    setCount(prevCount => prevCount + 1);

• State є snapshot для конкретного render.

• Кілька state updates можуть бути batched React.

• Для object та array state потрібно створювати нове значення, а не мутувати старе.

• `useState` можна викликати тільки на верхньому рівні компонента або custom Hook.

• Не можна викликати Hook всередині:

    if
    for
    while
    nested function
    event handler

• Initial value використовується під час початкового створення state.

---

# Import useState

`useState` потрібно імпортувати з React.

    import { useState } from "react";

Після цього Hook можна використовувати:

    const [count, setCount] = useState(0);

У сучасному React також можна використовувати namespace import:

    import * as React from "react";

    const [count, setCount] = React.useState(0);

Найчастіше використовується перший варіант:

    import { useState } from "react";

---

# Що таке Hook

Hook — це спеціальна React-функція, яка дозволяє функціональним компонентам використовувати можливості React.

Приклади Hooks:

    useState()
    useEffect()
    useRef()
    useContext()
    useMemo()
    useCallback()
    useReducer()

`useState` — Hook для local state.

---

# Базовий синтаксис

    const [state, setState] = useState(initialValue);

Наприклад:

    const [count, setCount] = useState(0);

Тут:

    count
        ↓
    current state

    setCount
        ↓
    state setter

    0
        ↓
    initial state

---

# Array Destructuring

Синтаксис:

    const [state, setState] = useState(initialValue);

використовує array destructuring.

Наприклад:

    const result = useState(0);

Результат концептуально:

    [
        0,
        function setState() {}
    ]

Тому можна написати:

    const [count, setCount] = result;

У React зазвичай відразу пишуть:

    const [count, setCount] = useState(0);

---

# State Variable

State variable — змінна, яка містить поточне значення state.

Наприклад:

    const [count, setCount] = useState(0);

`count` — state variable.

Початкове значення:

    0

Після:

    setCount(1);

наступний render матиме:

    count === 1

---

# State Setter

State setter — функція, яку React повертає разом зі state.

Наприклад:

    const [count, setCount] = useState(0);

`setCount` — state setter.

Виклик:

    setCount(10);

запитує React оновити state до:

    10

---

# Простий приклад

    import { useState } from "react";

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

Початково:

    count = 0

Після натискання:

    count = 1

Після наступного:

    count = 2

і так далі.

---

# State → UI

Одна з основних ідей React:

    state
      ↓
    render
      ↓
    UI

Наприклад:

    const [isOpen, setIsOpen] = useState(false);

UI залежить від:

    isOpen

Якщо:

    isOpen === false

можна показати:

    "Open"

Якщо:

    isOpen === true

можна показати:

    "Close"

---

# State Update → Re-render

Коли викликається setter:

    setCount(10);

React оновлює state і планує новий render.

У спрощеному вигляді:

    user action
        ↓
    setCount(...)
        ↓
    state update
        ↓
    React re-render
        ↓
    component function runs again
        ↓
    new UI

---

# Render

Render — це виконання компонента React для отримання нового UI description.

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

Після зміни state компонент може виконатися повторно.

Важливо:

    re-render
        ≠
    повне перезавантаження сторінки

React оновлює необхідні частини UI.

---

# State зберігається між renders

Без state:

    function Counter() {
        let count = 0;

        return (
            <button onClick={() => {
                count++;
            }}>
                {count}
            </button>
        );
    }

Це не працює як React state.

`count` створюється заново під час кожного виконання компонента.

Для state потрібно:

    const [count, setCount] = useState(0);

React зберігає значення state між renders.

---

# Local State

State, який належить конкретному компоненту, називається local state.

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        ...
    }

`count` належить цьому компоненту.

Інший компонент не отримує цей state автоматично.

---

# Initial State

Initial state — початкове значення state.

Наприклад:

    const [count, setCount] = useState(0);

Initial state:

    0

Інший приклад:

    const [name, setName] = useState("");

Початкове значення:

    ""

Boolean:

    const [isOpen, setIsOpen] = useState(false);

Array:

    const [items, setItems] = useState([]);

Object:

    const [user, setUser] = useState({
        name: "",
        age: 0
    });

---

# Типи initial state

`useState` може зберігати різні типи даних.

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

    const [items, setItems] = useState([]);

---

## Object

    const [user, setUser] = useState({
        name: "",
        age: 0
    });

---

## null

    const [user, setUser] = useState(null);

Наприклад, коли дані ще не завантажені.

---

# Updating State

Для оновлення state використовується setter.

Наприклад:

    const [count, setCount] = useState(0);

Оновлення:

    setCount(10);

Тепер у наступному render:

    count === 10

---

# State не змінюється напряму

❌ Неправильно:

    const [count, setCount] = useState(0);

    count = count + 1;

State не потрібно змінювати безпосередньо.

Правильно:

    setCount(count + 1);

---

# State Setter не повертає новий state

Наприклад:

    const result = setCount(10);

Не потрібно очікувати:

    result === 10

Setter використовується для запиту на оновлення state.

    setCount(10);

А нове значення буде доступне під час наступного render:

    function Counter() {
        const [count, setCount] = useState(0);

        ...
    }

---

# State Snapshot

Одна з найважливіших концепцій React:

State для конкретного render можна розглядати як snapshot.

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        function handleClick() {
            console.log(count);

            setCount(count + 1);

            console.log(count);
        }

        ...
    }

Обидва `console.log(count)` у цьому handler можуть показати:

    0

якщо handler був створений під час render, де:

    count === 0

`setCount()` не змінює значення `count` всередині вже виконуваного render.

---

# Snapshot Model

Спрощено:

    Render 1

    count = 0
        ↓
    event handler
        ↓
    setCount(1)
        ↓
    Render 2

    count = 1

Тобто:

    current render
        ↓
    current state snapshot

Наступний render отримує новий snapshot.

---

# State Update Is Not Immediate

Не потрібно мислити про:

    setCount(1);

як про звичайне:

    count = 1;

React використовує setter, щоб запланувати оновлення state та наступний render.

Наприклад:

    function handleClick() {
        setCount(count + 1);

        console.log(count);
    }

`console.log(count)` не обов'язково покаже `1`.

Він відображає state поточного render.

---

# Functional Updater

Якщо новий state залежить від попереднього state, можна передати функцію:

    setCount(prevCount => prevCount + 1);

Наприклад:

    const [count, setCount] = useState(0);

    function increment() {
        setCount(prevCount => prevCount + 1);
    }

React передасть у функцію попереднє значення.

---

# Functional Updater vs Direct Value

Пряме значення:

    setCount(count + 1);

Functional updater:

    setCount(prevCount => prevCount + 1);

Якщо нове значення залежить від попереднього, functional updater часто є правильнішим і надійнішим підходом.

---

# Кілька State Updates

Розглянемо:

    function handleClick() {
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
    }

Якщо:

    count === 0

усі три вирази можуть використовувати той самий snapshot:

    count + 1

Тому результат може бути:

    1

а не:

    3

---

# Кілька Functional Updates

Правильний варіант:

    function handleClick() {
        setCount(prevCount => prevCount + 1);
        setCount(prevCount => prevCount + 1);
        setCount(prevCount => prevCount + 1);
    }

Тепер updates можуть послідовно використовувати попередній результат.

Якщо:

    count === 0

результат:

    3

Модель:

    0
    ↓
    +1
    ↓
    1
    ↓
    +1
    ↓
    2
    ↓
    +1
    ↓
    3

---

# Коли використовувати Functional Updater

Особливо корисно, коли:

- нове значення залежить від попереднього;
- виконується кілька state updates;
- update передається в callback;
- update відбувається в асинхронному сценарії;
- важливо явно показати залежність від previous state.

Наприклад:

    setCount(prev => prev + 1);

А не:

    setCount(count + 1);

---

# Naming Convention

Зазвичай використовують:

    [state, setState]

Наприклад:

    [count, setCount]

    [name, setName]

    [isOpen, setIsOpen]

    [items, setItems]

    [user, setUser]

Для boolean часто використовують:

    isOpen
    isLoading
    isActive
    isVisible

Наприклад:

    const [isOpen, setIsOpen] = useState(false);

---

# Boolean State

Boolean state дуже часто використовується в UI.

Наприклад:

    const [isOpen, setIsOpen] = useState(false);

Toggle:

    setIsOpen(prev => !prev);

Повний приклад:

    function ModalButton() {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <>
                <button onClick={() => setIsOpen(prev => !prev)}>
                    Toggle modal
                </button>

                {isOpen && (
                    <div>
                        Modal content
                    </div>
                )}
            </>
        );
    }

---

# Toggle Pattern

Один із найважливіших patterns:

    setIsOpen(prev => !prev);

Наприклад:

    const [isOpen, setIsOpen] = useState(false);

    function toggle() {
        setIsOpen(prev => !prev);
    }

State:

    false
      ↓
    true
      ↓
    false
      ↓
    true

---

# String State

Наприклад:

    const [name, setName] = useState("");

Оновлення:

    setName("John");

Input:

    <input
        value={name}
        onChange={event => setName(event.target.value)}
    />

Це основа controlled components.

---

# Number State

Наприклад:

    const [age, setAge] = useState(18);

Оновлення:

    setAge(19);

Збільшення:

    setAge(prevAge => prevAge + 1);

Зменшення:

    setAge(prevAge => prevAge - 1);

---

# Array State

State може містити масив.

    const [items, setItems] = useState([]);

Наприклад:

    setItems(["Apple"]);

Після цього:

    items

міститиме:

    ["Apple"]

---

# Додавання елемента в Array State

Не потрібно робити:

    items.push("Apple");

Це mutation.

Краще:

    setItems(prevItems => [
        ...prevItems,
        "Apple"
    ]);

Тут створюється новий array.

---

# Видалення елемента з Array State

Наприклад:

    const [items, setItems] = useState([
        "Apple",
        "Banana",
        "Orange"
    ]);

Видалити `"Banana"`:

    setItems(prevItems =>
        prevItems.filter(item => item !== "Banana")
    );

---

# Оновлення Array Element

Наприклад:

    const [users, setUsers] = useState([
        {
            id: 1,
            name: "John",
            active: false
        },
        {
            id: 2,
            name: "Anna",
            active: false
        }
    ]);

Змінити `active` для одного user:

    setUsers(prevUsers =>
        prevUsers.map(user =>
            user.id === 1
                ? { ...user, active: true }
                : user
        )
    );

Основна ідея:

    old array
        ↓
    map()
        ↓
    new array

---

# Object State

State може бути object.

    const [user, setUser] = useState({
        name: "John",
        age: 25
    });

Не потрібно:

    user.name = "Anna";

Це mutation.

Краще:

    setUser(prevUser => ({
        ...prevUser,
        name: "Anna"
    }));

---

# Object Spread

Для оновлення частини object часто використовується spread:

    setUser(prevUser => ({
        ...prevUser,
        age: 26
    }));

Було:

    {
        name: "John",
        age: 25
    }

Стало:

    {
        name: "John",
        age: 26
    }

---

# Важлива особливість Object State

Setter для object не виконує автоматичне shallow merge, як старий class-based `setState`.

Наприклад:

    const [user, setUser] = useState({
        name: "John",
        age: 25
    });

Не варто робити:

    setUser({
        name: "Anna"
    });

Тому що новий state стане:

    {
        name: "Anna"
    }

Поле `age` буде втрачено.

Для часткового оновлення:

    setUser(prevUser => ({
        ...prevUser,
        name: "Anna"
    }));

---

# Nested Object State

Наприклад:

    const [user, setUser] = useState({
        name: "John",
        address: {
            city: "Kyiv",
            country: "Ukraine"
        }
    });

Для зміни `city`:

    setUser(prevUser => ({
        ...prevUser,
        address: {
            ...prevUser.address,
            city: "Vinnytsia"
        }
    }));

Потрібно створити новий object на кожному зміненому рівні.

---

# Immutability

React state потрібно оновлювати immutable способом.

Immutability означає:

    не змінювати існуюче значення
    безпосередньо

а створювати нове значення.

Array:

    [...oldArray]

Object:

    {...oldObject}

---

# Mutation

Mutation — безпосередня зміна існуючого object або array.

❌ Array mutation:

    items.push(newItem);

❌ Object mutation:

    user.name = "Anna";

Для React state це погана практика.

Правильно:

    setItems(prev => [
        ...prev,
        newItem
    ]);

    setUser(prev => ({
        ...prev,
        name: "Anna"
    }));

---

# Чому Immutability важлива

React активно використовує порівняння references для визначення змін.

Якщо створюється новий object або array:

    old !== new

React може коректно побачити зміну reference.

Наприклад:

    const nextUser = {
        ...user,
        name: "Anna"
    };

Тут:

    nextUser !== user

---

# State з Array та Object

Зручно пам'ятати:

    primitive
        ↓
    setValue(newValue)

    object / array
        ↓
    create new object / array
        ↓
    setState(newValue)

Наприклад:

    setCount(10);

    setUser(prev => ({
        ...prev,
        name: "Anna"
    }));

    setItems(prev => [
        ...prev,
        "Apple"
    ]);

---

# Lazy Initialization

Іноді initial state потребує дорогої операції.

Наприклад:

    const [value, setValue] = useState(
        expensiveCalculation()
    );

Вираз виконується під час render.

Для lazy initialization можна передати функцію:

    const [value, setValue] = useState(
        expensiveCalculation
    );

React виконає initializer для отримання початкового state.

---

# Lazy Initializer

Наприклад:

    function createInitialState() {
        console.log("create initial state");

        return {
            count: 0
        };
    }

    const [state, setState] = useState(
        createInitialState
    );

Важливо:

    useState(createInitialState)

а не:

    useState(createInitialState())

У першому випадку React отримує функцію initializer.

У другому випадку функція виконується одразу під час render.

---

# Коли потрібна Lazy Initialization

Звичайний initial value:

    const [count, setCount] = useState(0);

Lazy initialization потрібна, коли initial state потребує помітної роботи:

    const [data, setData] = useState(
        createInitialData
    );

Наприклад:

- складний розрахунок;
- parsing великих даних;
- initial value з `localStorage`;
- інша операція, яку не потрібно виконувати на кожному render.

---

# useState з localStorage

Приклад:

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") ?? "light";
    });

Функція використовується як lazy initializer.

Важливо враховувати, що код із `localStorage` має виконуватися в browser environment.

У Next.js також потрібно враховувати server/client rendering.

---

# useState у Next.js

У Next.js компонент, який використовує `useState`, повинен бути Client Component.

На початку файлу:

    "use client";

Наприклад:

    "use client";

    import { useState } from "react";

    export default function Counter() {
        const [count, setCount] = useState(0);

        return (
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        );
    }

Без `"use client"` використання `useState` у Server Component не дозволяється.

---

# Rules of Hooks

Hooks мають спеціальні правила.

`useState` потрібно викликати:

    на верхньому рівні компонента

або:

    на верхньому рівні custom Hook

---

# Не викликати Hook у if

❌ Неправильно:

    if (isLoggedIn) {
        const [name, setName] = useState("");
    }

Правильно:

    const [name, setName] = useState("");

    if (isLoggedIn) {
        ...
    }

---

# Не викликати Hook у loop

❌ Неправильно:

    for (...) {
        const [value, setValue] = useState(0);
    }

---

# Не викликати Hook у nested function

❌ Неправильно:

    function Component() {
        function createState() {
            const [value, setValue] = useState(0);
        }
    }

---

# Правильно

    function Component() {
        const [value, setValue] = useState(0);

        ...
    }

Hooks повинні викликатися в однаковому порядку під час кожного render.

---

# Чому Rules of Hooks важливі

React повинен мати стабільний порядок виклику Hooks.

Наприклад:

    useState(...)
    useEffect(...)
    useRef(...)

React може співвідносити ці виклики з відповідним state/effect/ref.

Якщо порядок змінюється:

    if (...) {
        useState(...)
    }

може виникнути неправильна відповідність Hook state.

Тому Hooks:

    ❌ не в if
    ❌ не в loops
    ❌ не в nested functions

---

# Multiple useState

Компонент може мати кілька state.

Наприклад:

    const [name, setName] = useState("");

    const [age, setAge] = useState(0);

    const [isActive, setIsActive] = useState(false);

Кожен state має власний setter.

---

# Приклад Multiple State

    function UserForm() {
        const [name, setName] = useState("");
        const [age, setAge] = useState(0);
        const [isActive, setIsActive] = useState(false);

        return (
            <div>
                ...
            </div>
        );
    }

Це нормальна практика.

Не потрібно об'єднувати весь state в один object без причини.

---

# Один Object State vs Multiple State

Можна:

    const [user, setUser] = useState({
        name: "",
        age: 0,
        isActive: false
    });

А можна:

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [isActive, setIsActive] = useState(false);

Обидва варіанти можуть бути правильними.

Вибір залежить від того, наскільки дані пов'язані між собою.

---

# Коли використовувати Multiple State

Наприклад:

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

Ці значення описують різні незалежні стани.

Зручно мати окремий state.

---

# Коли Object State може бути зручним

Якщо дані логічно утворюють одну сутність:

    const [user, setUser] = useState({
        name: "",
        email: "",
        age: 0
    });

Це може бути зручніше.

Але потрібно пам'ятати про immutable updates.

---

# Derived State

Derived state — значення, яке можна обчислити з existing state.

Наприклад:

    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Smith");

Не обов'язково створювати:

    const [fullName, setFullName] = useState("");

Можна обчислити:

    const fullName = `${firstName} ${lastName}`;

Якщо значення можна легко отримати з іншого state, часто не потрібно зберігати його окремо.

---

# Не зберігати зайвий Derived State

❌ Надлишковий state:

    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Smith");
    const [fullName, setFullName] = useState("John Smith");

Тепер потрібно синхронізувати три значення.

Краще:

    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Smith");

    const fullName = `${firstName} ${lastName}`;

---

# State та Props

State:

    component owns data

Props:

    parent passes data

Наприклад:

    function Parent() {
        const [count, setCount] = useState(0);

        return (
            <Counter
                count={count}
                onIncrement={() => setCount(count + 1)}
            />
        );
    }

Child отримує:

    count
    onIncrement

як props.

---

# State Lifting

Якщо два компоненти повинні працювати з одним state, state часто потрібно підняти до їхнього спільного parent.

Наприклад:

    Parent
       │
       ├── Component A
       │
       └── Component B

State можна зберігати в:

    Parent

і передавати вниз через props.

Це називається:

    lifting state up

---

# Controlled Input

`useState` часто використовується для controlled components.

Наприклад:

    function NameInput() {
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

Тут:

    React state
        ↓
    value

і:

    user input
        ↓
    onChange
        ↓
    setName
        ↓
    state
        ↓
    render

---

# Form State

Наприклад:

    function LoginForm() {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        return (
            <form>
                <input
                    value={email}
                    onChange={event =>
                        setEmail(event.target.value)
                    }
                />

                <input
                    type="password"
                    value={password}
                    onChange={event =>
                        setPassword(event.target.value)
                    }
                />
            </form>
        );
    }

Це один із найтиповіших випадків використання `useState`.

---

# State для UI

`useState` часто використовується для:

    modal
    dropdown
    accordion
    tabs
    menu
    tooltip
    loading indicator
    selected item
    active tab

Наприклад:

    const [isModalOpen, setIsModalOpen] = useState(false);

---

# Selected Item

Наприклад:

    const [selectedId, setSelectedId] = useState(null);

При виборі:

    setSelectedId(5);

UI:

    {selectedId === 5 && (
        <div>Selected</div>
    )}

---

# Loading State

Наприклад:

    const [isLoading, setIsLoading] = useState(false);

Перед операцією:

    setIsLoading(true);

Після завершення:

    setIsLoading(false);

Пізніше такі сценарії будуть детальніше розглядатися разом із:

    useEffect()
    data fetching
    async operations

---

# State Reset

State можна повернути до початкового значення.

Наприклад:

    const [name, setName] = useState("");

    setName("");

Або:

    const [count, setCount] = useState(0);

    setCount(0);

---

# Reset Multiple State Values

Наприклад:

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);

Reset:

    function resetForm() {
        setName("");
        setAge(0);
    }

---

# State Initializer vs State Update

Важливо розрізняти:

    useState(initialValue)

та:

    setState(newValue)

Наприклад:

    const [count, setCount] = useState(0);

Тут:

    0
        ↓
    initial state

А:

    setCount(10);

це:

    state update

---

# State Setter може отримати значення

Наприклад:

    setCount(10);

Setter отримує нове значення.

---

# State Setter може отримати функцію

Наприклад:

    setCount(prevCount => prevCount + 1);

Setter отримує updater function.

Це особливо важливо, коли новий state залежить від попереднього.

---

# State Replacement

Для primitive:

    const [count, setCount] = useState(0);

    setCount(10);

Старе:

    0

замінюється новим:

    10

Для object:

    setUser({
        name: "Anna"
    });

весь object state буде замінений.

Тому для часткового оновлення:

    setUser(prev => ({
        ...prev,
        name: "Anna"
    }));

---

# Batching

React може групувати кілька state updates в один render.

Наприклад:

    function handleClick() {
        setName("John");
        setAge(25);
        setIsActive(true);
    }

React може обробити ці updates разом і виконати один наступний render замість окремого render для кожного update.

Це називається:

    batching

---

# Automatic Batching

Сучасний React підтримує automatic batching для багатьох типів updates, включаючи updates поза традиційними React event handlers.

Для Junior-рівня важливо пам'ятати:

    multiple state updates
        ↓
    React may batch them
        ↓
    fewer renders

---

# State and Objects: Reference

Наприклад:

    const user = {
        name: "John"
    };

Якщо зробити:

    user.name = "Anna";

reference object залишається тим самим.

Для React state краще створити новий object:

    setUser(prev => ({
        ...prev,
        name: "Anna"
    }));

Тепер:

    old object !== new object

---

# State and Arrays: Reference

❌ Mutation:

    items.push("Apple");

❌ Mutation:

    items.splice(0, 1);

Краще:

    setItems(prev => [
        ...prev,
        "Apple"
    ]);

Для видалення:

    setItems(prev =>
        prev.filter(item => item !== "Apple")
    );

---

# Common Array State Patterns

## Add

    setItems(prev => [
        ...prev,
        newItem
    ]);

---

## Remove

    setItems(prev =>
        prev.filter(item => item.id !== id)
    );

---

## Update

    setItems(prev =>
        prev.map(item =>
            item.id === id
                ? { ...item, completed: true }
                : item
        )
    );

---

## Clear

    setItems([]);

---

# State and Event Handlers

`useState` часто використовується разом із event handlers.

Наприклад:

    const [count, setCount] = useState(0);

    function handleIncrement() {
        setCount(prev => prev + 1);
    }

    return (
        <button onClick={handleIncrement}>
            {count}
        </button>
    );

---

# Не викликати Handler під час Render

❌ Неправильно:

    <button onClick={handleIncrement()}>
        Increment
    </button>

Тут функція викликається під час render.

Правильно:

    <button onClick={handleIncrement}>
        Increment
    </button>

Або:

    <button onClick={() => setCount(count + 1)}>
        Increment
    </button>

---

# State and Conditional Rendering

Наприклад:

    const [isLoggedIn, setIsLoggedIn] = useState(false);

UI:

    {isLoggedIn ? (
        <Dashboard />
    ) : (
        <Login />
    )}

При зміні:

    setIsLoggedIn(true);

React renderить інший UI.

---

# State and Lists

Наприклад:

    const [items, setItems] = useState([
        "Apple",
        "Banana",
        "Orange"
    ]);

Render:

    <ul>
        {items.map(item => (
            <li key={item}>
                {item}
            </li>
        ))}
    </ul>

State контролює список.

---

# State and Keys

При роботі зі списками:

    items.map(item => (
        <Item
            key={item.id}
            item={item}
        />
    ))

`key` допомагає React визначати, які list elements змінилися.

`key` не є частиною state.

---

# State Does Not Need to Be Everything

Не потрібно зберігати в state кожне значення.

Наприклад:

    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Smith");

Derived:

    const fullName = `${firstName} ${lastName}`;

State потрібен для даних, зміна яких повинна впливати на render.

---

# Local Variable vs State

Звичайна змінна:

    let count = 0;

State:

    const [count, setCount] = useState(0);

Основна різниця:

    local variable
        ↓
    не зберігається між renders

    state
        ↓
    зберігається між renders
        ↓
    update може спричинити re-render

---

# State vs Ref

`useState`:

    const [count, setCount] = useState(0);

Зміна state:

    setCount(1);

може спричинити re-render.

`useRef`:

    const countRef = useRef(0);

Зміна:

    countRef.current = 1;

сама по собі не спричиняє re-render.

`useRef` буде детально розглядатися у:

    03-use-ref

---

# State vs Constant

Наприклад:

    const maxItems = 10;

`maxItems` — не state.

Він не змінюється через UI update.

State:

    const [items, setItems] = useState([]);

може змінюватися під час роботи компонента.

---

# State vs Props

State:

    component manages it

Props:

    component receives it

Наприклад:

    function Child({ count }) {
        return <p>{count}</p>;
    }

Parent:

    const [count, setCount] = useState(0);

    <Child count={count} />

---

# State Flow

Типовий React flow:

    user action
        ↓
    event handler
        ↓
    setState()
        ↓
    state update
        ↓
    re-render
        ↓
    new UI

Наприклад:

    click
      ↓
    setCount(prev => prev + 1)
      ↓
    count changes
      ↓
    component re-renders
      ↓
    button displays new count

---

# Practical Example — Counter

    "use client";

    import { useState } from "react";

    export default function Counter() {
        const [count, setCount] = useState(0);

        return (
            <div>
                <p>Count: {count}</p>

                <button
                    onClick={() =>
                        setCount(prev => prev + 1)
                    }
                >
                    +
                </button>

                <button
                    onClick={() =>
                        setCount(prev => prev - 1)
                    }
                >
                    -
                </button>

                <button
                    onClick={() => setCount(0)}
                >
                    Reset
                </button>
            </div>
        );
    }

---

# Practical Example — Toggle

    "use client";

    import { useState } from "react";

    export default function Toggle() {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div>
                <button
                    onClick={() =>
                        setIsOpen(prev => !prev)
                    }
                >
                    {isOpen ? "Close" : "Open"}
                </button>

                {isOpen && (
                    <p>Content is visible</p>
                )}
            </div>
        );
    }

---

# Practical Example — Input

    "use client";

    import { useState } from "react";

    export default function NameInput() {
        const [name, setName] = useState("");

        return (
            <div>
                <input
                    value={name}
                    onChange={event =>
                        setName(event.target.value)
                    }
                />

                <p>Hello, {name}</p>
            </div>
        );
    }

---

# Practical Example — Array

    "use client";

    import { useState } from "react";

    export default function TodoList() {
        const [items, setItems] = useState([]);

        function addItem() {
            const item = {
                id: Date.now(),
                text: "New item"
            };

            setItems(prev => [
                ...prev,
                item
            ]);
        }

        return (
            <div>
                <button onClick={addItem}>
                    Add
                </button>

                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            {item.text}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

---

# Practical Example — Object

    "use client";

    import { useState } from "react";

    export default function UserProfile() {
        const [user, setUser] = useState({
            name: "John",
            age: 25
        });

        function changeName() {
            setUser(prev => ({
                ...prev,
                name: "Anna"
            }));
        }

        return (
            <div>
                <p>{user.name}</p>
                <p>{user.age}</p>

                <button onClick={changeName}>
                    Change name
                </button>
            </div>
        );
    }

---

# Practical Example — Form

    "use client";

    import { useState } from "react";

    export default function Form() {
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");

        function handleSubmit(event) {
            event.preventDefault();

            console.log({
                name,
                email
            });
        }

        return (
            <form onSubmit={handleSubmit}>
                <input
                    value={name}
                    onChange={event =>
                        setName(event.target.value)
                    }
                    placeholder="Name"
                />

                <input
                    value={email}
                    onChange={event =>
                        setEmail(event.target.value)
                    }
                    placeholder="Email"
                />

                <button type="submit">
                    Submit
                </button>
            </form>
        );
    }

---

# Practical Example — Multiple Updates

    "use client";

    import { useState } from "react";

    export default function Counter() {
        const [count, setCount] = useState(0);

        function handleClick() {
            setCount(prev => prev + 1);
            setCount(prev => prev + 1);
            setCount(prev => prev + 1);
        }

        return (
            <button onClick={handleClick}>
                {count}
            </button>
        );
    }

Після одного click:

    count
        ↓
    +1
        ↓
    +1
        ↓
    +1

Результат:

    count + 3

---

# Practical Example — Select

    "use client";

    import { useState } from "react";

    export default function ColorSelect() {
        const [color, setColor] = useState("red");

        return (
            <div>
                <select
                    value={color}
                    onChange={event =>
                        setColor(event.target.value)
                    }
                >
                    <option value="red">
                        Red
                    </option>

                    <option value="green">
                        Green
                    </option>

                    <option value="blue">
                        Blue
                    </option>
                </select>

                <p>Selected: {color}</p>
            </div>
        );
    }

---

# Практичний Pattern

Для простого state:

    const [value, setValue] = useState(initialValue);

Для нового незалежного значення:

    setValue(newValue);

Для update на основі previous state:

    setValue(prev => nextValue);

Для boolean toggle:

    setValue(prev => !prev);

Для array add:

    setItems(prev => [
        ...prev,
        item
    ]);

Для array remove:

    setItems(prev =>
        prev.filter(item => item.id !== id)
    );

Для object update:

    setUser(prev => ({
        ...prev,
        name: "Anna"
    }));

---

# Типові помилки

❌ Прямо змінювати state.

    count++;

Правильно:

    setCount(prev => prev + 1);

---

❌ Мутувати array.

    items.push(item);

Правильно:

    setItems(prev => [
        ...prev,
        item
    ]);

---

❌ Мутувати object.

    user.name = "Anna";

Правильно:

    setUser(prev => ({
        ...prev,
        name: "Anna"
    }));

---

❌ Використовувати stale snapshot для кількох updates.

    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);

Якщо кожен update залежить від попереднього, краще:

    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);

---

❌ Очікувати, що setter змінить поточну змінну одразу.

    setCount(10);

    console.log(count);

Не потрібно очікувати:

    10

Поточний render має свій snapshot.

---

❌ Викликати Hook умовно.

    if (condition) {
        const [value, setValue] = useState(0);
    }

Hooks повинні викликатися на верхньому рівні.

---

❌ Використовувати `useState` для кожного derived value.

Наприклад:

    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Smith");

Не обов'язково:

    const [fullName, setFullName] = useState("John Smith");

Краще:

    const fullName = `${firstName} ${lastName}`;

---

❌ Передавати виклик setter у render без необхідності.

    <button onClick={setCount(count + 1)}>
        Increment
    </button>

Правильно:

    <button onClick={() => setCount(count + 1)}>
        Increment
    </button>

Або:

    function handleIncrement() {
        setCount(prev => prev + 1);
    }

    <button onClick={handleIncrement}>
        Increment
    </button>

---

# useState та TypeScript

У TypeScript React зазвичай може автоматично вивести тип state.

Наприклад:

    const [count, setCount] = useState(0);

TypeScript визначить:

    count: number

і:

    setCount: (value: number | ...) => void

String:

    const [name, setName] = useState("");

Boolean:

    const [isOpen, setIsOpen] = useState(false);

---

# Explicit Generic Type

Іноді тип потрібно вказати явно.

Наприклад:

    const [user, setUser] = useState<User | null>(null);

Тип:

    type User = {
        id: number;
        name: string;
    };

Тепер:

    user

може бути:

    User

або:

    null

---

# Array Type

Наприклад:

    type User = {
        id: number;
        name: string;
    };

    const [users, setUsers] = useState<User[]>([]);

---

# String Union State

Наприклад:

    type Status =
        | "idle"
        | "loading"
        | "success"
        | "error";

    const [status, setStatus] =
        useState<Status>("idle");

Це корисний TypeScript pattern для state machine-like UI.

---

# Boolean Type

TypeScript легко виводить:

    const [isOpen, setIsOpen] = useState(false);

Тут:

    isOpen → boolean

---

# Nullable State

Частий випадок:

    const [user, setUser] = useState<User | null>(null);

Спочатку:

    user === null

Після завантаження:

    setUser({
        id: 1,
        name: "John"
    });

---

# Generic Syntax

Загальний синтаксис:

    useState<Type>(initialValue);

Наприклад:

    useState<number>(0);

    useState<string>("");

    useState<boolean>(false);

    useState<User | null>(null);

    useState<User[]>([]);

Але якщо TypeScript може правильно вивести тип, явний generic часто не потрібен.

---

# useState та Null

Потрібно бути уважним:

    const [user, setUser] = useState(null);

TypeScript може вивести тип занадто вузько.

Якщо state пізніше повинен містити User:

    const [user, setUser] =
        useState<User | null>(null);

Це правильніше.

---

# useState та Initial Object

Наприклад:

    type FormData = {
        name: string;
        email: string;
    };

    const [formData, setFormData] =
        useState<FormData>({
            name: "",
            email: ""
        });

---

# useState та Event

Наприклад:

    const [name, setName] = useState("");

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setName(event.target.value);
    }

У TSX також можна використовувати:

    import type {
        ChangeEvent
    } from "react";

    function handleChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        setName(event.target.value);
    }

---

# useState та Form

TypeScript:

    type FormData = {
        name: string;
        email: string;
    };

    const [formData, setFormData] =
        useState<FormData>({
            name: "",
            email: ""
        });

Update:

    setFormData(prev => ({
        ...prev,
        name: event.target.value
    }));

---

# State Design

При проектуванні компонента потрібно запитати:

1. Чи повинно значення змінювати UI?
2. Чи повинно значення зберігатися між renders?
3. Чи можна його обчислити з іншого state/props?
4. Чи належить state цьому компоненту?
5. Чи потрібно підняти state до parent?

---

# State Decision Tree

    Значення змінюється?
          │
          ├── ні → const
          │
          └── так
               │
               ↓
        впливає на UI?
               │
          ┌────┴────┐
          │         │
         ні        так
          │         │
          ↓         ↓
       можливо    useState
       useRef
       або інша
       структура

Це спрощена модель.

---

# Не кожна змінна — State

Наприклад:

    const price = 100;
    const quantity = 2;

    const total = price * quantity;

`total` не обов'язково повинен бути state.

Якщо:

    total

можна отримати з інших значень:

    const total = price * quantity;

краще не створювати окремий state без необхідності.

---

# State Colocation

State бажано зберігати якомога ближче до компонентів, які його використовують.

Наприклад, якщо state потрібен тільки одному компоненту:

    Component
      └── state

Не потрібно без причини піднімати його високо в дерево.

Якщо state потрібен кількома sibling components:

    Parent
      ├── state
      ├── Child A
      └── Child B

---

# State Lifting

Якщо два sibling components потребують одного state:

    Parent
      │
      ├── Component A
      │
      └── Component B

State можна перенести в:

    Parent

і передавати через props.

Це називається:

    lifting state up

---

# State Flow

React зазвичай використовує односпрямований data flow:

    Parent state
         ↓
       props
         ↓
      Child

Child може попросити parent змінити state через callback:

    Child
      ↓
    callback
      ↓
    Parent
      ↓
    setState
      ↓
    re-render
      ↓
    props
      ↓
    Child

---

# useState та Component Lifecycle

`useState` безпосередньо пов'язаний із render.

При першому render:

    useState(initialValue)

створює state.

Під час наступних renders:

    useState(initialValue)

не скидає state до initial value.

React зберігає state між renders.

---

# Initial Value Не Переобчислює State

Наприклад:

    const [count, setCount] = useState(0);

Після:

    setCount(10);

наступний render не робить:

    count = 0

State залишається:

    10

Initial value використовується для початкового створення state.

---

# Component Remount

Якщо компонент буде remount, state буде створено заново.

Наприклад:

    Component mounts
        ↓
    initial state
        ↓
    updates
        ↓
    unmount
        ↓
    mount again
        ↓
    initial state again

Це важливо відрізняти від звичайного re-render.

---

# Re-render vs Remount

`re-render`:

    component runs again
        ↓
    state preserved

`remount`:

    old component removed
        ↓
    new component created
        ↓
    initial state

Це дуже важлива React-концепція.

---

# State та key

`key` може впливати на identity компонента.

Наприклад:

    <Counter key={userId} />

При зміні `key` React може створити новий component instance.

Це означає, що його state може бути скинутий до initial state.

---

# Практична модель useState

Запам'ятай:

    useState(initialValue)
            ↓
    [state, setState]
            ↓
        state
          │
          ↓
        render
          │
          ↓
       UI
          │
          ↓
    user interaction
          │
          ↓
      setState()
          │
          ↓
      new state
          │
          ↓
       re-render

---

# Питання зі співбесіди

Що таке `useState`?

Що повертає `useState()`?

Що таке state?

Що таке initial state?

Що таке state setter?

Чим state відрізняється від звичайної змінної?

Що відбувається після виклику setter?

Чи змінює `setState()` state негайно?

Що таке state snapshot?

Чому:

    setCount(count + 1);
    setCount(count + 1);

може дати лише `+1`?

Як виправити це?

Що таке functional updater?

Коли використовувати:

    setCount(prev => prev + 1);

?

Що таке batching?

Що таке re-render?

Чим re-render відрізняється від remount?

Чи можна змінювати state напряму?

Чому не можна робити:

    items.push(item);

?

Як додати елемент до array state?

Як видалити елемент з array state?

Як оновити object state?

Чому потрібен spread operator для object state?

Чи merge-ить `useState` objects автоматично?

Що таке immutable update?

Що таке mutation?

Чи можна використовувати `useState` для object?

Чи можна використовувати `useState` для array?

Чи можна мати декілька `useState` в одному компоненті?

Чи можна викликати `useState` всередині `if`?

Чи можна викликати `useState` у циклі?

Чому Hooks повинні викликатися на верхньому рівні?

Що таке lazy initialization?

Чим відрізняється:

    useState(expensiveCalculation())

від:

    useState(expensiveCalculation)

?

Що таке controlled input?

Що таке derived state?

Чи потрібно зберігати derived values у state?

Що таке lifting state up?

Де краще зберігати local state?

Чим state відрізняється від props?

Як типізувати `useState` у TypeScript?

Як типізувати nullable state?

Як типізувати array state?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке React state.

Що таке `useState`.

Імпорт:

    import { useState } from "react";

Базовий синтаксис:

    const [state, setState] = useState(initialValue);

State variable.

State setter.

Initial state.

State update.

Re-render.

State snapshot.

State persistence між renders.

State не змінюється напряму.

Functional updater:

    setState(prev => nextState);

Boolean toggle:

    setIsOpen(prev => !prev);

Multiple state updates.

Batching — базове розуміння.

Primitive state.

Object state.

Array state.

Immutability.

Object spread.

Array spread.

`map()` для оновлення array.

`filter()` для видалення.

Controlled inputs.

Basic form state.

Rules of Hooks.

---

# 🔵 Junior

Розуміння:

    useState
    state
    setter
    render
    re-render
    snapshot

Functional updates.

Batching.

Lazy initialization.

Multiple `useState`.

Object state.

Array state.

Nested object updates.

Immutable updates.

Derived state.

State colocation.

Lifting state up.

State vs props.

State vs local variables.

State vs refs — базова різниця.

Controlled components.

Form state.

Conditional rendering через state.

List rendering через state.

Resetting state.

Component identity.

`key` та state reset — базове розуміння.

TypeScript:

    useState<number>()
    useState<string>()
    useState<boolean>()
    useState<User | null>()
    useState<User[]>()

Next.js:

    "use client";

---

# 🟠 Middle

Глибоке розуміння React state model.

State snapshot model.

Render and commit model.

Batching.

Functional updates.

State queue.

Update priority.

State preservation.

State reset.

Component identity.

Keys та state preservation.

State colocation.

State lifting.

Derived state.

Avoiding redundant state.

Complex object state.

Complex array state.

State normalization.

State machines.

Коли `useState` стає незручним.

Перехід від:

    useState

до:

    useReducer

Розділення:

    UI state
    server state
    derived state
    persistent state

Оптимізація state structure.

---

# 🔴 Senior

Глибоке розуміння React state architecture.

Fiber identity.

State preservation rules.

Component position та state identity.

Keys як identity mechanism.

Update queues.

Functional updater semantics.

Batching та scheduling.

Concurrent rendering.

Transitions.

Priority of updates.

State consistency.

Complex state machines.

State normalization.

Derived state architecture.

Local vs shared state.

State ownership.

State colocation.

State lifting.

Context vs state.

Reducer vs state.

Client state vs server state.

State synchronization.

External stores.

`useSyncExternalStore`.

Performance implications state updates.

Avoiding unnecessary renders.

State architecture у великих React applications.

---

# Міні-шпаргалка

## useState

    import { useState } from "react";

    const [state, setState] = useState(initialValue);

---

## Number

    const [count, setCount] = useState(0);

    setCount(10);

---

## Increment

    setCount(prev => prev + 1);

---

## Decrement

    setCount(prev => prev - 1);

---

## Boolean

    const [isOpen, setIsOpen] = useState(false);

---

## Toggle

    setIsOpen(prev => !prev);

---

## String

    const [name, setName] = useState("");

    setName("John");

---

## Array

    const [items, setItems] = useState([]);

---

## Add

    setItems(prev => [
        ...prev,
        item
    ]);

---

## Remove

    setItems(prev =>
        prev.filter(item => item.id !== id)
    );

---

## Update

    setItems(prev =>
        prev.map(item =>
            item.id === id
                ? { ...item, active: true }
                : item
        )
    );

---

## Clear

    setItems([]);

---

## Object

    const [user, setUser] = useState({
        name: "John",
        age: 25
    });

---

## Update Object

    setUser(prev => ({
        ...prev,
        name: "Anna"
    }));

---

## Nested Object

    setUser(prev => ({
        ...prev,
        address: {
            ...prev.address,
            city: "Vinnytsia"
        }
    }));

---

## Functional Updater

    setCount(prev => prev + 1);

Використовувати, коли:

    newState depends on previousState

---

## Lazy Initialization

    const [data, setData] = useState(
        createInitialData
    );

Не:

    useState(createInitialData())

якщо потрібен lazy initializer.

---

## Multiple State

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [isActive, setIsActive] = useState(false);

---

## Nullable State

    const [user, setUser] =
        useState<User | null>(null);

---

## Array Type

    const [users, setUsers] =
        useState<User[]>([]);

---

## Derived Value

    const [firstName, setFirstName] =
        useState("John");

    const [lastName, setLastName] =
        useState("Smith");

    const fullName =
        `${firstName} ${lastName}`;

Не потрібно:

    const [fullName, setFullName] =
        useState("John Smith");

якщо `fullName` повністю derived від інших значень.

---

## Controlled Input

    const [name, setName] = useState("");

    <input
        value={name}
        onChange={event =>
            setName(event.target.value)
        }
    />

---

## State Flow

    user action
        ↓
    event handler
        ↓
    setState()
        ↓
    state update
        ↓
    re-render
        ↓
    new UI

---

## State Snapshot

    render
      ↓
    state snapshot
      ↓
    event handler
      ↓
    setState()
      ↓
    next render
      ↓
    new snapshot

---

## Rules of Hooks

    useState(...)

можна викликати:

    ✓ на верхньому рівні компонента
    ✓ у custom Hook

Не можна:

    ✗ if
    ✗ for
    ✗ while
    ✗ nested function
    ✗ event handler

---

## Immutability

Array:

    [...array]

Object:

    {...object}

Не:

    array.push(...)

Не:

    object.property = value

---

# Головне

• `useState` — React Hook для local state.

• Базовий синтаксис:

    const [state, setState] = useState(initialValue);

• `state` містить поточне значення.

• `setState` використовується для оновлення state.

• State зберігається між renders.

• Виклик setter може спричинити re-render.

• State потрібно розглядати як snapshot конкретного render.

• `setState()` не означає звичайне миттєве присвоєння:

    state = newValue

• Якщо новий state залежить від попереднього, використовуй functional updater:

    setState(prev => newValue);

• Для boolean toggle:

    setIsOpen(prev => !prev);

• Для кількох послідовних updates, які залежать від попереднього state, використовуй functional updater.

• React може batch-ити кілька state updates.

• State не потрібно мутувати напряму.

• Для object створюй новий object:

    setUser(prev => ({
        ...prev,
        name: "Anna"
    }));

• Для array створюй новий array:

    setItems(prev => [
        ...prev,
        item
    ]);

• Для видалення елемента з array:

    setItems(prev =>
        prev.filter(item => item.id !== id)
    );

• Для оновлення елемента:

    setItems(prev =>
        prev.map(item =>
            item.id === id
                ? { ...item, active: true }
                : item
        )
    );

• `useState` може зберігати:

    number
    string
    boolean
    object
    array
    null
    custom types

• Не кожна змінна повинна бути state.

• Якщо значення можна легко обчислити з existing state або props, часто краще використовувати derived value.

• State бажано зберігати якомога ближче до компонентів, які його використовують.

• Якщо кільком компонентам потрібен один state, можна підняти його до спільного parent.

• `useState` часто використовується для:

    counters
    forms
    inputs
    toggles
    modals
    tabs
    selected values
    lists
    loading state

• Hooks потрібно викликати на верхньому рівні.

• Не можна викликати Hooks умовно або всередині циклів.

• Lazy initialization:

    useState(createInitialValue)

може бути корисним для дорогого початкового обчислення.

• У TypeScript тип `useState` часто виводиться автоматично:

    const [count, setCount] = useState(0);

• Для складніших випадків тип можна вказати явно:

    const [user, setUser] =
        useState<User | null>(null);

• У Next.js для компонента, який використовує `useState`, потрібен Client Component:

    "use client";

• Основна модель:

    useState()
        ↓
    state
        ↓
    UI
        ↓
    user action
        ↓
    setState()
        ↓
    new state
        ↓
    re-render
        ↓
    new UI

• Найважливіша практична формула:

    state changes
        ↓
    setter
        ↓
    React schedules update
        ↓
    component renders again
        ↓
    UI reflects new state

• `useState` — базовий механізм локального стану React.

• Наступний важливий крок після `useState` — зрозуміти side effects та `useEffect`.

---

# Коротко перед співбесідою

    useState
        ↓
    [state, setState]

    state
        ↓
    snapshot of current render

    setState(value)
        ↓
    update state

    setState(prev => next)
        ↓
    update based on previous state

    object state
        ↓
    immutable update

    array state
        ↓
    immutable update

    multiple dependent updates
        ↓
    functional updater

    derived value
        ↓
    don't store unnecessarily

    useState
        ↓
    top level only

    state update
        ↓
    re-render

    re-render
        ↓
    state preserved

    remount
        ↓
    state may reset

    React state
        ↓
    data that changes over time
    and affects rendered UI