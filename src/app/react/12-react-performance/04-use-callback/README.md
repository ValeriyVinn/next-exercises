# React Performance — useCallback

`useCallback` — це React Hook, який дозволяє мемоізувати функцію та зберігати ту саму function reference між render'ами, доки його dependencies не змінилися.

`useCallback` використовується переважно для:

- стабілізації function reference;
- передачі callback у memoized child component;
- уникнення непотрібних re-render дочірніх компонентів;
- використання функції як dependency іншого Hook;
- оптимізації компонентів, де identity функції має значення.

Синтаксис:

    const memoizedFunction = useCallback(
        () => {
            // code
        },
        [dependencies]
    );

Основна ідея:

    render
       ↓
    useCallback
       ↓
    dependencies unchanged?
       ↓
    yes ──→ використати попередню function reference
       │
       no
       ↓
    створити нову function reference
       ↓
    повернути function

---

# Ключові поняття

✔ `useCallback`  
✔ callback function  
✔ function reference  
✔ memoization  
✔ dependencies  
✔ dependency array  
✔ render  
✔ re-render  
✔ referential equality  
✔ `React.memo`  
✔ `useMemo`  
✔ event handler  
✔ child component  
✔ parent component  
✔ function identity  
✔ stable reference  
✔ performance optimization  
✔ unnecessary re-render  
✔ closure  
✔ stale closure  
✔ React DevTools Profiler  

---

# Що потрібно пам'ятати

• `useCallback` мемоізує **функцію**, а не результат її виконання.

• `useCallback` повертає function reference.

• Якщо dependencies не змінилися, React може повернути попередню function reference.

• Якщо dependency змінилася, React створює нову function reference.

• `useCallback` не зупиняє re-render самого компонента.

• `useCallback` часто використовується разом із `React.memo`.

• `useMemo`:

    useMemo → memoized value

• `useCallback`:

    useCallback → memoized function

• `useCallback` не потрібно використовувати для кожної функції.

• Найчастіше він має сенс, коли function передається в memoized child component або використовується як dependency іншого Hook.

• `useCallback` має власний overhead.

• Надмірне використання `useCallback` може зробити код складнішим без реальної користі.

• Dependencies повинні містити reactive values, від яких залежить callback.

• Потрібно уважно працювати з closures та stale values.

---

# Що таке callback

Callback — це функція, яка передається кудись для подальшого виклику.

Наприклад:

    function handleClick() {
        console.log("Clicked");
    }

    button.addEventListener("click", handleClick);

У React:

    function Button({ onClick }) {
        return (
            <button onClick={onClick}>
                Click
            </button>
        );
    }

Тут:

    onClick

є callback function, яку передав parent.

---

# useCallback

Синтаксис:

    const handleClick = useCallback(() => {
        console.log("click");
    }, []);

Тепер:

    handleClick

є memoized function reference.

---

# Простий приклад

    import { useCallback, useState } from "react";

    function Counter() {
        const [count, setCount] = useState(0);

        const handleClick = useCallback(() => {
            console.log("clicked");
        }, []);

        return (
            <div>
                <p>{count}</p>

                <button
                    onClick={() => setCount(count + 1)}
                >
                    Increment
                </button>

                <button onClick={handleClick}>
                    Log
                </button>
            </div>
        );
    }

Тут:

    handleClick

має стабільну reference, поки dependencies не змінюються.

---

# useCallback повертає function

Це одна з найважливіших відмінностей.

`useCallback`:

    const handleClick = useCallback(() => {
        console.log("click");
    }, []);

Повертає:

    function

На відміну від:

    useMemo

який повертає:

    value

---

# useCallback vs useMemo

Це потрібно добре запам'ятати.

`useMemo`:

    const value = useMemo(() => {
        return calculate();
    }, []);

Результат:

    value

`useCallback`:

    const handleClick = useCallback(() => {
        console.log("click");
    }, []);

Результат:

    function

Отже:

    useMemo
        → memoize value

    useCallback
        → memoize function

---

# Технічно useCallback та useMemo

Концептуально:

    useCallback(fn, dependencies)

можна уявити як:

    useMemo(() => fn, dependencies)

Тобто:

    useCallback
        ↓
    useMemo
        ↓
    function reference

Але в коді для memoization callback використовують саме:

    useCallback()

---

# Function Reference

Це центральне поняття для розуміння `useCallback`.

У JavaScript функція є object-like reference value.

Наприклад:

    const fn1 = () => {
        console.log("hello");
    };

    const fn2 = () => {
        console.log("hello");
    };

    console.log(fn1 === fn2);

Результат:

    false

Хоча функції виконують однаковий код.

Причина:

    fn1
       ↓
    reference A

    fn2
       ↓
    reference B

---

# Нова функція під час render

Наприклад:

    function Parent() {
        const handleClick = () => {
            console.log("click");
        };

        return (
            <Child onClick={handleClick} />
        );
    }

Під час кожного render:

    Parent render
         ↓
    new function
         ↓
    new reference
         ↓
    Child receives new onClick

Тобто:

    render 1 → function A
    render 2 → function B
    render 3 → function C

Навіть якщо код функції однаковий.

---

# useCallback та стабільна reference

Тепер:

    function Parent() {
        const handleClick = useCallback(() => {
            console.log("click");
        }, []);

        return (
            <Child onClick={handleClick} />
        );
    }

Модель:

    render 1
       ↓
    function A

    render 2
       ↓
    same function A

    render 3
       ↓
    same function A

поки dependencies не змінилися.

---

# Чому це важливо

У React props можуть порівнюватися за reference.

Наприклад:

    previousProps.onClick
        ===
    nextProps.onClick

Якщо:

    true

function reference та сама.

Якщо:

    false

function reference змінилася.

Це особливо важливо для:

    React.memo

---

# useCallback + React.memo

Це один із головних use cases.

Parent:

    function Parent() {
        const handleClick = useCallback(() => {
            console.log("click");
        }, []);

        return (
            <Child onClick={handleClick} />
        );
    }

Child:

    const Child = memo(function Child({
        onClick
    }) {
        console.log("Child render");

        return (
            <button onClick={onClick}>
                Click
            </button>
        );
    });

Тут:

    Parent re-render
          ↓
    useCallback
          ↓
    same function reference
          ↓
    Child props unchanged
          ↓
    React.memo
          ↓
    Child render can be skipped

---

# Без useCallback

Parent:

    function Parent() {
        const handleClick = () => {
            console.log("click");
        };

        return (
            <Child onClick={handleClick} />
        );
    }

Child:

    const Child = memo(function Child({
        onClick
    }) {
        console.log("Child render");

        return (
            <button onClick={onClick}>
                Click
            </button>
        );
    });

При кожному render:

    new handleClick
          ↓
    new function reference
          ↓
    Child props changed
          ↓
    React.memo cannot skip render

У такому випадку `useCallback` може бути корисним.

---

# Важливо: useCallback сам не запобігає render

Це дуже важливо.

Наприклад:

    function Parent() {
        const [count, setCount] = useState(0);

        const handleClick = useCallback(() => {
            console.log("click");
        }, []);

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

Коли:

    count

змінюється:

    Parent

все одно re-render.

`useCallback` лише допомагає зберегти:

    handleClick reference

---

# useCallback ≠ React.memo

Не плутати.

`useCallback`:

    memoize function

`React.memo`:

    memoize component rendering

Вони можуть працювати разом:

    useCallback
        ↓
    stable function reference
        ↓
    React.memo
        ↓
    possible child render skip

---

# Dependency Array

Наприклад:

    const handleClick = useCallback(() => {
        console.log(count);
    }, [count]);

Dependency:

    count

Коли:

    count

змінюється, callback отримує нову function reference.

---

# useCallback без dependencies

Технічно:

    const handleClick = useCallback(() => {
        console.log("click");
    });

але без dependency array memoization не має потрібного ефекту.

Функція буде створюватися під час кожного render.

Тому зазвичай використовують:

    const handleClick = useCallback(() => {
        console.log("click");
    }, []);

або:

    const handleClick = useCallback(() => {
        console.log(count);
    }, [count]);

---

# useCallback з порожнім array

Приклад:

    const handleClick = useCallback(() => {
        console.log("click");
    }, []);

Це означає, що callback не залежить від reactive values компонента.

Function reference залишається стабільною між render'ами.

Але callback повинен справді не використовувати змінні, які потребують оновлення.

---

# useCallback з dependencies

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        const handleLog = useCallback(() => {
            console.log(count);
        }, [count]);

        return (
            <button onClick={handleLog}>
                Log
            </button>
        );
    }

Тут callback використовує:

    count

тому:

    count

має бути dependency.

---

# Stale Closure

Одна з найважливіших тем `useCallback`.

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        const handleLog = useCallback(() => {
            console.log(count);
        }, []);

        return (
            <button onClick={handleLog}>
                Log
            </button>
        );
    }

Проблема:

    count

використовується всередині callback, але dependency array:

    []

не містить:

    count

Callback може продовжувати бачити старе значення `count`.

Це називається:

    stale closure

---

# Правильний dependency

    const handleLog = useCallback(() => {
        console.log(count);
    }, [count]);

Тепер:

    count
        ↓
    dependency
        ↓
    callback оновлюється

---

# Closure

Closure — це здатність функції мати доступ до змінних із зовнішнього lexical scope.

Наприклад:

    function Counter() {
        const count = 10;

        function handleClick() {
            console.log(count);
        }

        return handleClick;
    }

`handleClick` має доступ до:

    count

Це closure.

---

# useCallback та closure

Наприклад:

    function Component({ user }) {
        const handleClick = useCallback(() => {
            console.log(user.name);
        }, [user]);

        return (
            <button onClick={handleClick}>
                User
            </button>
        );
    }

Callback закриває:

    user

Тому `user` є dependency.

---

# Stale Closure Example

Поганий приклад:

    function Counter() {
        const [count, setCount] = useState(0);

        const handleClick = useCallback(() => {
            console.log(count);
        }, []);

        return (
            <div>
                <p>{count}</p>

                <button
                    onClick={() =>
                        setCount(count + 1)
                    }
                >
                    Increment
                </button>

                <button onClick={handleClick}>
                    Log count
                </button>
            </div>
        );
    }

Після збільшення:

    count = 5

callback може продовжувати бачити старе значення, яке було доступне під час створення closure.

---

# Correct Closure

    const handleClick = useCallback(() => {
        console.log(count);
    }, [count]);

Тепер callback оновлюється разом із:

    count

---

# Functional State Update

Іноді dependency можна уникнути, використовуючи functional state update.

Наприклад:

    const handleIncrement = useCallback(() => {
        setCount(count + 1);
    }, [count]);

Тут dependency:

    count

Потрібна.

Але можна:

    const handleIncrement = useCallback(() => {
        setCount(value => value + 1);
    }, []);

Тепер callback не читає:

    count

безпосередньо.

Тому:

    []

може бути правильним.

---

# Functional Update Pattern

    const handleAdd = useCallback(() => {
        setItems(items => [
            ...items,
            createItem()
        ]);
    }, []);

Тут використовується:

    previous state

через:

    items => [...]

Тому callback не залежить від зовнішнього `items`.

---

# useCallback та event handlers

Один із найчастіших випадків:

    const handleSubmit = useCallback(() => {
        console.log("submit");
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            ...
        </form>
    );

Але важливо:

не кожен event handler потребує `useCallback`.

Звичайний:

    const handleSubmit = () => {
        console.log("submit");
    };

може бути абсолютно нормальним.

---

# useCallback не потрібен автоматично

Погано мислити:

    "Це event handler,
     отже потрібен useCallback."

Правильніше:

    "Чи identity цієї функції
     має performance significance?"

Якщо ні:

    звичайна function

часто краща.

---

# useCallback + memoized child

Найтиповіший pattern:

    const Child = memo(function Child({
        onSelect
    }) {
        ...
    });

Parent:

    const handleSelect = useCallback((id) => {
        console.log(id);
    }, []);

    return (
        <Child onSelect={handleSelect} />
    );

Тут:

    useCallback
        ↓
    stable callback reference
        ↓
    React.memo
        ↓
    possible render skip

---

# useCallback без React.memo

Наприклад:

    function Child({ onClick }) {
        return (
            <button onClick={onClick}>
                Click
            </button>
        );
    }

Якщо `Child` не memoized, стабільна function reference часто не дає значного performance benefit.

Child все одно re-render разом із parent.

Тому:

    useCallback

найчастіше має сенс у конкретному optimization context.

---

# useCallback та dependency Hook

`useCallback` також може бути корисним, якщо функція є dependency іншого Hook.

Наприклад:

    const fetchUsers = useCallback(() => {
        return fetch("/api/users");
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

Тут:

    fetchUsers

є dependency `useEffect`.

Якщо функція створюється без `useCallback`:

    const fetchUsers = () => {
        ...
    };

то reference може змінюватися на кожному render.

---

# useCallback + useEffect

Проблемний приклад:

    function Users() {
        const fetchUsers = () => {
            return fetch("/api/users");
        };

        useEffect(() => {
            fetchUsers();
        }, [fetchUsers]);

        return <div>Users</div>;
    }

На кожному render:

    new fetchUsers function
        ↓
    dependency changed
        ↓
    useEffect may run again

---

# useCallback + useEffect

Можна:

    const fetchUsers = useCallback(() => {
        return fetch("/api/users");
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

Тепер:

    fetchUsers reference

залишається стабільною.

---

# Але useCallback не завжди найкраще рішення

Іноді краще перенести function безпосередньо всередину effect.

Наприклад:

    useEffect(() => {
        async function fetchUsers() {
            const response =
                await fetch("/api/users");

            ...
        }

        fetchUsers();
    }, []);

Тут не потрібен:

    useCallback

Тому потрібно спочатку спростити logic, а не автоматично додавати memoization.

---

# useCallback та custom hooks

`useCallback` часто використовується у custom hooks.

Наприклад:

    function useCounter() {
        const [count, setCount] = useState(0);

        const increment = useCallback(() => {
            setCount(value => value + 1);
        }, []);

        return {
            count,
            increment,
        };
    }

Тут:

    increment

має стабільну reference.

---

# Custom Hook Example

    function useUsers() {
        const [users, setUsers] = useState([]);

        const refresh = useCallback(async () => {
            const response =
                await fetch("/api/users");

            const data = await response.json();

            setUsers(data);
        }, []);

        return {
            users,
            refresh,
        };
    }

Компонент:

    function UsersPage() {
        const {
            users,
            refresh
        } = useUsers();

        return (
            <button onClick={refresh}>
                Refresh
            </button>
        );
    }

---

# useCallback та Context

`useCallback` може бути корисним для стабілізації functions, які передаються через Context.

Наприклад:

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const contextValue = useMemo(() => {
        return {
            user,
            logout,
        };
    }, [user, logout]);

Тут:

    useCallback
        ↓
    stable logout

    useMemo
        ↓
    stable context value

Ці Hooks вирішують різні задачі.

---

# useCallback + useMemo + Context

Типовий pattern:

    const login = useCallback((user) => {
        setUser(user);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const value = useMemo(() => {
        return {
            user,
            login,
            logout,
        };
    }, [user, login, logout]);

Provider:

    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>

---

# useCallback та arrays

Function може працювати з array:

    const handleSelect = useCallback((id) => {
        setSelectedIds(ids => [
            ...ids,
            id,
        ]);
    }, []);

Тут functional update дозволяє не залежати від:

    selectedIds

---

# useCallback та objects

Наприклад:

    const handleSave = useCallback(() => {
        saveUser(user);
    }, [user]);

Якщо:

    user

змінюється за reference, callback також отримає нову reference.

Це нормально, якщо callback дійсно залежить від `user`.

---

# useCallback та primitive dependencies

Наприклад:

    const handleSearch = useCallback(() => {
        search(query);
    }, [query]);

Dependency:

    query

Якщо:

    query

змінилася:

    new callback reference

Якщо:

    query

не змінилася:

    same callback reference

---

# useCallback та multiple dependencies

Наприклад:

    const handleSave = useCallback(() => {
        saveUser(userId, formData);
    }, [userId, formData]);

Dependencies:

    userId
    formData

Якщо зміниться хоча б одна:

    callback → new reference

---

# useCallback та object dependency

Наприклад:

    const options = {
        sort: "asc",
    };

    const handleSort = useCallback(() => {
        sortProducts(options);
    }, [options]);

Проблема:

    options

створюється під час кожного render.

Тому:

    options reference changes
        ↓
    callback reference changes

---

# Кращий pattern

Якщо `options` не потрібен поза callback:

    const handleSort = useCallback(() => {
        sortProducts({
            sort: "asc",
        });
    }, []);

Тепер callback не залежить від зовнішнього object.

---

# Або useMemo для object

Якщо `options` потрібен окремо:

    const options = useMemo(() => {
        return {
            sort: "asc",
        };
    }, []);

    const handleSort = useCallback(() => {
        sortProducts(options);
    }, [options]);

Тут:

    useMemo
        ↓
    stable options

    useCallback
        ↓
    stable handleSort

Але не потрібно будувати таку систему без реальної потреби.

---

# useCallback та React.memo — повний приклад

    import { memo, useCallback, useState } from "react";

    const Button = memo(function Button({
        onClick
    }) {
        console.log("Button render");

        return (
            <button onClick={onClick}>
                Click
            </button>
        );
    });

    function Counter() {
        const [count, setCount] = useState(0);

        const handleClick = useCallback(() => {
            console.log("button clicked");
        }, []);

        return (
            <div>
                <p>{count}</p>

                <button
                    onClick={() =>
                        setCount(value => value + 1)
                    }
                >
                    Increment
                </button>

                <Button onClick={handleClick} />
            </div>
        );
    }

Коли змінюється:

    count

Parent re-render.

Але:

    handleClick

зберігає ту саму reference.

Тому:

    Button

може не re-render завдяки:

    React.memo

---

# Без React.memo

Якщо:

    Button

не обгорнутий у:

    memo()

то:

    Button

може re-render разом із parent незалежно від стабільності callback.

Тому `useCallback` не є самодостатнім "захистом від render".

---

# useCallback та child props

Наприклад:

    <Child
        onClick={handleClick}
    />

React може порівнювати:

    previous onClick
        ===
    next onClick

Якщо:

    true

prop reference не змінилася.

Якщо:

    false

prop змінилася.

Це важливо для memoized components.

---

# Function Identity

Function identity — це конкретна object/function reference.

Наприклад:

    const fn = () => {};

    const same = fn;

    fn === same
    // true

А:

    const fn1 = () => {};

    const fn2 = () => {};

    fn1 === fn2
    // false

`useCallback` допомагає зберігати identity функції між render'ами.

---

# useCallback та closures

Callback може захоплювати values із component scope.

Наприклад:

    function Profile({ user }) {
        const handleClick = useCallback(() => {
            console.log(user.name);
        }, [user]);

        return (
            <button onClick={handleClick}>
                {user.name}
            </button>
        );
    }

Closure містить доступ до:

    user

Тому:

    user

є dependency.

---

# Stale Closure та state

Погано:

    const handleClick = useCallback(() => {
        console.log(count);
    }, []);

Якщо `count` змінюється, callback може працювати зі старим значенням.

Правильно:

    const handleClick = useCallback(() => {
        console.log(count);
    }, [count]);

---

# Stale Closure та props

Погано:

    const handleClick = useCallback(() => {
        console.log(user.name);
    }, []);

Правильно:

    const handleClick = useCallback(() => {
        console.log(user.name);
    }, [user]);

---

# Functional Update проти dependency

Замість:

    const handleIncrement = useCallback(() => {
        setCount(count + 1);
    }, [count]);

можна:

    const handleIncrement = useCallback(() => {
        setCount(value => value + 1);
    }, []);

Обидва варіанти можуть бути правильними.

Другий:

    callback

не залежить від зовнішнього:

    count

---

# useCallback та async function

Callback може бути async:

    const handleSubmit = useCallback(async () => {
        const response =
            await fetch("/api/users");

        const data = await response.json();

        console.log(data);
    }, []);

Якщо callback не залежить від reactive values:

    []

може бути правильним.

---

# useCallback та form submit

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();

            await saveForm(formData);
        },
        [formData]
    );

    return (
        <form onSubmit={handleSubmit}>
            ...
        </form>
    );

Тут:

    formData

є dependency.

---

# useCallback та event parameters

Наприклад:

    const handleSelect = useCallback((id) => {
        console.log(id);
    }, []);

Передача:

    <button
        onClick={() => handleSelect(user.id)}
    >
        Select
    </button>

Тут:

    handleSelect

стабільна.

Але wrapper:

    () => handleSelect(user.id)

створюється під час render.

Не потрібно автоматично вважати, що це проблема.

---

# useCallback не робить всі functions faster

Функція сама по собі не стає:

    faster

`useCallback` не оптимізує execution speed функції.

Він оптимізує:

    function identity / reference

Тобто:

    useCallback
        ≠
    faster function execution

А:

    useCallback
        →
    stable function reference

---

# useCallback та expensive function

Наприклад:

    const calculate = useCallback(() => {
        return expensiveCalculation(data);
    }, [data]);

`useCallback` не кешує результат:

    expensiveCalculation(data)

Він кешує:

    calculate function

Якщо потрібно кешувати result:

    useMemo

Наприклад:

    const result = useMemo(() => {
        return expensiveCalculation(data);
    }, [data]);

---

# useCallback vs useMemo — дуже важливо

Потрібно memoize:

    result?

Використовуй:

    useMemo

Потрібно memoize:

    function?

Використовуй:

    useCallback

Наприклад:

    const result = useMemo(
        () => calculate(data),
        [data]
    );

    const handleClick = useCallback(
        () => doSomething(data),
        [data]
    );

---

# useCallback та performance

Правильний mental model:

    Parent re-render
          ↓
    callback recreated?
          ↓
    yes
          ↓
    child sees changed function prop
          ↓
    memoized child may re-render

`useCallback`:

    Parent re-render
          ↓
    callback reference stable
          ↓
    child sees same function prop
          ↓
    React.memo may skip render

---

# Performance Optimization Flow

Правильний процес:

    1. Write code
           ↓
    2. Profile
           ↓
    3. Find bottleneck
           ↓
    4. Determine whether
       function identity matters
           ↓
    5. Add useCallback if justified
           ↓
    6. Measure again

Не:

    useCallback everywhere
           ↓
    hope application becomes faster

---

# Premature Optimization

Не потрібно:

    const handleClick = useCallback(() => {
        console.log("click");
    }, []);

лише тому, що це "правильний React style".

Якщо callback:

    не передається memoized child;

    не є важливою dependency;

    не створює реальної performance problem;

звичайна функція часто краща.

---

# Коли useCallback дійсно корисний

`useCallback` може бути хорошим вибором, якщо:

• function передається в `React.memo` child;

• function є dependency іншого Hook;

• custom hook повертає callback, для якого важлива stable reference;

• стабільність function identity реально впливає на performance;

• callback створюється часто, а downstream component дорого re-render;

• profiling показує unnecessary renders через changed callback reference.

---

# Коли useCallback не потрібен

Не варто використовувати `useCallback` автоматично для:

• кожного event handler;

• кожної function;

• маленьких компонентів без performance problem;

• функцій, які нікуди не передаються;

• функцій, які не є dependencies;

• ситуацій без `React.memo`, якщо stable reference не має іншої причини;

• просто "щоб React був швидшим".

---

# useCallback та readability

Порівняй:

    const handleClick = () => {
        console.log("click");
    };

та:

    const handleClick = useCallback(() => {
        console.log("click");
    }, []);

Другий варіант складніший.

Якщо optimization не дає користі:

    простий код

кращий.

---

# useCallback та component size

Для маленького компонента:

    function Button() {
        const handleClick = () => {
            ...
        };

        return <button onClick={handleClick} />;
    }

це часто достатньо.

Не потрібно автоматично додавати:

    useCallback

---

# useCallback та memoized components

Для великого дерева:

    Parent
      ↓
    ExpensiveChild
      ↓
    LargeList
      ↓
    Complex UI

стабільний callback може мати значно більше значення.

Особливо:

    Parent
       ↓
    React.memo Child
       ↓
    expensive rendering

---

# useCallback та custom hook API

Custom hook може повертати:

    {
        data,
        refresh
    }

Наприклад:

    function useUsers() {
        const [users, setUsers] = useState([]);

        const refresh = useCallback(async () => {
            const response =
                await fetch("/api/users");

            setUsers(await response.json());
        }, []);

        return {
            users,
            refresh,
        };
    }

Стабільний:

    refresh

може бути корисним для consumers hook.

---

# useCallback та context API

Приклад:

    const increment = useCallback(() => {
        setCount(value => value + 1);
    }, []);

    const value = useMemo(() => {
        return {
            count,
            increment,
        };
    }, [count, increment]);

Це може допомогти стабілізувати context value structure.

---

# useCallback та React.memo — важлива схема

    Parent
       │
       ├── state changes
       │
       ↓
    Parent re-render
       │
       ↓
    useCallback
       │
       ↓
    same callback reference
       │
       ↓
    React.memo Child
       │
       ↓
    props unchanged
       │
       ↓
    Child render can be skipped

---

# Що відбувається без useCallback

    Parent
       │
       ↓
    re-render
       │
       ↓
    new callback
       │
       ↓
    new function reference
       │
       ↓
    Child receives changed prop
       │
       ↓
    React.memo cannot skip render

---

# Але React.memo — не єдина причина

Навіть без `React.memo` `useCallback` може бути корисним як dependency stability mechanism.

Наприклад:

    const fetchData = useCallback(() => {
        ...
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

Але перед додаванням `useCallback` треба перевірити, чи не можна просто переписати logic.

---

# useCallback та useEffect — decision

Якщо function потрібна тільки всередині effect:

    useEffect(() => {
        function fetchUsers() {
            ...
        }

        fetchUsers();
    }, []);

може бути простіше.

Якщо function потрібна поза effect:

    const fetchUsers = useCallback(() => {
        ...
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

може бути доречним.

---

# useCallback та dependency array

Потрібно дивитися не тільки на:

    function reference

але й на:

    values captured by closure

Наприклад:

    const handleClick = useCallback(() => {
        save(user, theme);
    }, [user, theme]);

Dependencies:

    user
    theme

Якщо змінюється будь-яка:

    callback reference → new

---

# ESLint та dependencies

ESLint React Hooks rules можуть допомагати знаходити проблеми.

Наприклад:

    react-hooks/exhaustive-deps

може повідомити, якщо callback використовує value, але dependency відсутня.

Це особливо важливо для:

    useEffect
    useMemo
    useCallback

---

# useCallback та mutation

Не потрібно мутувати дані всередині callback.

Погано:

    const handleAdd = useCallback(() => {
        items.push(newItem);
    }, [items]);

Краще:

    const handleAdd = useCallback(() => {
        setItems(currentItems => [
            ...currentItems,
            newItem,
        ]);
    }, [newItem]);

---

# useCallback та immutable updates

React state краще оновлювати immutable способом.

Наприклад:

    const handleRemove = useCallback((id) => {
        setItems(items =>
            items.filter(item => item.id !== id)
        );
    }, []);

Тут:

    filter()

створює новий array.

---

# useCallback та stable callback API

Наприклад:

    function useModal() {
        const [isOpen, setIsOpen] = useState(false);

        const open = useCallback(() => {
            setIsOpen(true);
        }, []);

        const close = useCallback(() => {
            setIsOpen(false);
        }, []);

        return {
            isOpen,
            open,
            close,
        };
    }

Custom hook повертає:

    stable open
    stable close

---

# useCallback та child component API

Наприклад:

    function Parent() {
        const handleDelete = useCallback((id) => {
            deleteUser(id);
        }, []);

        return (
            <UserList
                onDelete={handleDelete}
            />
        );
    }

Child:

    const UserList = memo(function UserList({
        onDelete
    }) {
        ...
    });

Це типовий optimization pattern.

---

# useCallback та dynamic dependencies

Наприклад:

    function UserPage({ userId }) {
        const handleLoad = useCallback(() => {
            loadUser(userId);
        }, [userId]);

        ...
    }

Коли:

    userId

змінюється:

    handleLoad

отримує нову reference.

Це правильно, тому що callback залежить від нового:

    userId

---

# Не намагайся завжди мати []

Поширена помилка:

    useCallback(() => {
        console.log(user);
    }, []);

Тільки заради stable reference.

Це може створити:

    stale closure

Правильніше:

    useCallback(() => {
        console.log(user);
    }, [user]);

Коректність важливіша за штучну стабільність reference.

---

# Correctness before Optimization

Головне правило:

    correct dependencies
        >
    stable reference at any cost

Не можна видаляти dependencies тільки для того, щоб callback не змінювався.

Спочатку:

    correct behavior

потім:

    performance optimization

---

# useCallback та memory

Memoization означає, що React зберігає information про:

    function
    dependencies

Це теж має memory cost.

Тому:

    useCallback

не є безкоштовним.

Для кожної маленької функції його використання може бути зайвим.

---

# useCallback та CPU

`useCallback` може зменшити downstream rendering work.

Але React повинен:

    store callback
    store dependencies
    compare dependencies

Тому загальна performance користь залежить від конкретної ситуації.

---

# useCallback не оптимізує function body

Наприклад:

    const calculate = useCallback(() => {
        for (...) {
            ...
        }
    }, [data]);

`useCallback` не робить цикл швидшим.

Він тільки допомагає зберігати:

    calculate function reference

Якщо потрібно кешувати результат циклу:

    useMemo

---

# useCallback та useMemo разом

Наприклад:

    const result = useMemo(() => {
        return calculate(data);
    }, [data]);

    const handleSave = useCallback(() => {
        save(result);
    }, [result]);

Тут:

    useMemo
        ↓
    memoized result

    useCallback
        ↓
    memoized function

---

# useCallback та object props

Наприклад:

    const options = useMemo(() => {
        return {
            mode: "advanced",
        };
    }, []);

    const handleSubmit = useCallback(() => {
        submit(options);
    }, [options]);

Тут:

    useMemo
        ↓
    stable options

    useCallback
        ↓
    stable handleSubmit

Але знову:

    optimization should be justified

---

# Практичний приклад — Todo

    const TodoItem = memo(function TodoItem({
        todo,
        onToggle,
        onDelete
    }) {
        return (
            <li>
                <span>{todo.title}</span>

                <button
                    onClick={() => onToggle(todo.id)}
                >
                    Toggle
                </button>

                <button
                    onClick={() => onDelete(todo.id)}
                >
                    Delete
                </button>
            </li>
        );
    });

Parent:

    function TodoList({ todos }) {
        const [items, setItems] = useState(todos);

        const handleToggle = useCallback((id) => {
            setItems(items =>
                items.map(item =>
                    item.id === id
                        ? {
                            ...item,
                            completed:
                                !item.completed,
                        }
                        : item
                )
            );
        }, []);

        const handleDelete = useCallback((id) => {
            setItems(items =>
                items.filter(item => item.id !== id)
            );
        }, []);

        return (
            <ul>
                {items.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                    />
                ))}
            </ul>
        );
    }

Тут:

    handleToggle
        ↓
    stable reference

    handleDelete
        ↓
    stable reference

а:

    TodoItem

може використовувати:

    React.memo

---

# Практичний приклад — Search

    function SearchPage() {
        const [query, setQuery] = useState("");

        const handleSearch = useCallback((value) => {
            setQuery(value);
        }, []);

        return (
            <SearchInput
                value={query}
                onSearch={handleSearch}
            />
        );
    }

Якщо:

    SearchInput

memoized:

    const SearchInput = memo(function SearchInput({
        value,
        onSearch
    }) {
        ...
    });

стабільний:

    onSearch

може допомогти уникати зайвих render'ів, якщо інші props також не змінилися.

---

# Практичний приклад — Form

    function UserForm() {
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");

        const handleSubmit = useCallback(
            (event) => {
                event.preventDefault();

                saveUser({
                    name,
                    email,
                });
            },
            [name, email]
        );

        return (
            <form onSubmit={handleSubmit}>
                ...
            </form>
        );
    }

Тут:

    name
    email

є dependencies, тому що callback використовує їх.

---

# Практичний приклад — Functional Update

    function Counter() {
        const [count, setCount] = useState(0);

        const increment = useCallback(() => {
            setCount(value => value + 1);
        }, []);

        return (
            <button onClick={increment}>
                {count}
            </button>
        );
    }

`increment` не залежить безпосередньо від:

    count

тому:

    []

є коректним.

---

# Практичний приклад — Custom Hook

    function useCounter() {
        const [count, setCount] = useState(0);

        const increment = useCallback(() => {
            setCount(value => value + 1);
        }, []);

        const decrement = useCallback(() => {
            setCount(value => value - 1);
        }, []);

        return {
            count,
            increment,
            decrement,
        };
    }

---

# Практичний приклад — API

    function useUsers() {
        const [users, setUsers] = useState([]);

        const fetchUsers = useCallback(async () => {
            const response =
                await fetch("/api/users");

            const data = await response.json();

            setUsers(data);
        }, []);

        return {
            users,
            fetchUsers,
        };
    }

---

# Типові помилки

❌ Використовувати `useCallback` для кожної функції.

---

❌ Вважати, що `useCallback` зупиняє re-render компонента.

    useCallback
        ≠
    React.memo

---

❌ Вважати, що `useCallback` робить function execution швидшим.

    useCallback
        ≠
    faster function

---

❌ Плутати:

    useCallback
        →
    function

    useMemo
        →
    value

---

❌ Забувати dependencies.

Погано:

    const handleClick = useCallback(() => {
        console.log(user.name);
    }, []);

Правильно:

    const handleClick = useCallback(() => {
        console.log(user.name);
    }, [user]);

---

❌ Створювати stale closure.

---

❌ Видаляти dependencies тільки заради `[]`.

---

❌ Використовувати `useCallback`, коли немає optimization reason.

---

❌ Використовувати `useCallback` замість `useMemo`.

---

❌ Використовувати `useCallback` замість `React.memo`.

---

❌ Мутувати state всередині callback.

---

❌ Думати, що stable callback автоматично означає stable child render.

На rendering можуть впливати й інші props.

---

# Performance Checklist

Перед використанням `useCallback` запитай:

    1. Чи ця function передається в child?

    2. Чи child використовує React.memo?

    3. Чи function є dependency іншого Hook?

    4. Чи function identity справді важлива?

    5. Чи є реальний performance bottleneck?

    6. Чи dependencies правильно визначені?

    7. Чи не створить useCallback stale closure?

    8. Чи не можна зробити код простішим?

    9. Чи вимірював я performance?

---

# Performance Flow

    Component re-renders
          ↓
    callback recreated
          ↓
    function reference changes
          ↓
    memoized child receives new prop
          ↓
    child re-renders
          ↓
    profiling shows bottleneck
          ↓
    useCallback
          ↓
    stable reference
          ↓
    React.memo
          ↓
    child render can be skipped

---

# Але важливо

Не кожен:

    new function

є проблемою.

Створення function саме по собі не означає:

    performance bug

Проблема виникає, коли зміна reference спричиняє зайву роботу, яку можна безпечно уникнути.

Тому:

    new function
        ≠
    automatically bad

---

# useCallback Decision Tree

    Function?
        ↓
       yes
        ↓
    Passed as prop?
       ↙       ↘
      no       yes
      ↓          ↓
    normal    Is child memoized?
    function      ↙      ↘
                 no      yes
                 ↓        ↓
              maybe     consider
              normal    useCallback
              function

Інший випадок:

    Function is dependency?
        ↓
       yes
        ↓
    Does stable reference matter?
       ↙          ↘
      yes          no
      ↓             ↓
    useCallback    simplify logic

---

# useCallback Mental Model

Запам'ятай:

    useCallback(
        function,
        dependencies
    )

означає приблизно:

    "Зберігай цю function reference
     між render'ами,
     доки dependencies
     не змінилися."

Не:

    "Зроби function швидшою."

Не:

    "Заборони component render."

Не:

    "Function більше ніколи не створюється."

---

# Simplified Algorithm

У спрощеному вигляді:

    render
      ↓
    useCallback
      ↓
    compare dependencies
      ↓
    dependencies changed?
       ↙          ↘
      no          yes
      ↓            ↓
    reuse        create/update
    function     function reference
      ↓            ↓
      └──────┬─────┘
             ↓
        function value
             ↓
           render

---

# useCallback та React Rendering

Важливо розділяти:

    Component render

    Function identity

    Child render

`useCallback` працює переважно з:

    Function identity

`React.memo` може використати цю стабільну identity для:

    Child render optimization

---

# useCallback та referential equality

Наприклад:

    const fn1 = () => {};

    const fn2 = () => {};

    fn1 === fn2;

Результат:

    false

А:

    const fn = () => {};

    const sameFn = fn;

    fn === sameFn;

Результат:

    true

`useCallback` допомагає зберігати другий тип поведінки між render'ами.

---

# useCallback та stable callback

Без:

    useCallback

можемо отримати:

    render 1 → callback A
    render 2 → callback B
    render 3 → callback C

З:

    useCallback(..., [])

можемо отримати:

    render 1 → callback A
    render 2 → callback A
    render 3 → callback A

поки dependencies не змінюються.

---

# useCallback та dependencies

Наприклад:

    const handleSave = useCallback(() => {
        save(user);
    }, [user]);

Модель:

    user same reference
        ↓
    same callback reference

    user changed
        ↓
    new callback reference

Це правильно, тому що callback залежить від:

    user

---

# useCallback та correctness

Якщо callback використовує:

    count

і `count` змінюється, не можна приховувати цю dependency тільки для performance.

Правильність:

    [count]

важливіша за:

    []

---

# useCallback та ESLint

Корисно використовувати React Hooks lint rules.

Вони можуть допомогти знайти:

    missing dependencies

    incorrect dependencies

    Hooks usage problems

Особливо важливе правило:

    react-hooks/exhaustive-deps

---

# useCallback та Profiler

Якщо підозрюєш проблему:

    не починай одразу з useCallback

Спочатку:

    React DevTools Profiler

Подивись:

    який component re-renders;

    чому він re-renders;

    які props змінилися;

    чи змінився callback reference;

    скільки часу займає render.

Потім вирішуй:

    useCallback?
    React.memo?
    інша optimization?

---

# useCallback та unnecessary optimization

Приклад:

    function Button() {
        const handleClick = useCallback(() => {
            console.log("click");
        }, []);

        return (
            <button onClick={handleClick}>
                Click
            </button>
        );
    }

Це може бути цілком нормально технічно.

Але якщо:

    Button

простий і не має performance issue, звичайно:

    const handleClick = () => {
        console.log("click");
    };

буде простішим.

---

# Питання зі співбесіди

Що таке `useCallback`?

Для чого використовується `useCallback`?

Що саме мемоізує `useCallback`?

Що повертає `useCallback`?

Який синтаксис `useCallback`?

Що таке callback function?

Що таке function reference?

Що таке function identity?

Що таке referential equality?

Чому дві однакові arrow functions не є `===`?

Чому function створюється заново під час render?

Як `useCallback` змінює цю поведінку?

Чим `useCallback` відрізняється від `useMemo`?

Чим `useCallback` відрізняється від `React.memo`?

Чи зупиняє `useCallback` re-render компонента?

Коли `useCallback` дійсно корисний?

Коли `useCallback` не потрібен?

Чому `useCallback` часто використовують разом із `React.memo`?

Що таке dependency array?

Що відбувається, коли dependency змінюється?

Що таке stale closure?

Як виникає stale closure?

Як уникнути stale closure?

Чому dependencies повинні бути правильними?

Що таке functional state update?

Як functional update може зменшити dependencies?

Чому не потрібно завжди використовувати `[]`?

Чи робить `useCallback` function швидшою?

Чи зменшує `useCallback` CPU time самої function?

Чи є `useCallback` безкоштовним?

Як `useCallback` впливає на `React.memo`?

Як `useCallback` може впливати на `useEffect`?

Коли function краще оголосити безпосередньо всередині `useEffect`?

Як використовувати `useCallback` у custom hook?

Як використовувати `useCallback` із Context?

Як визначити, чи `useCallback` реально покращив performance?

Що таке premature optimization?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке:

    useCallback

    callback

    function reference

    function identity

    memoization

Знати:

    useCallback(
        () => {},
        []
    )

Розуміти:

    useCallback
        → memoized function reference

Розуміти різницю:

    useMemo
        → value

    useCallback
        → function

    React.memo
        → component rendering

Розуміти:

    dependencies unchanged
        ↓
    same callback reference

    dependency changed
        ↓
    new callback reference

Знати:

    useCallback
        ≠
    prevent component render

---

## 🔵 Junior

Розуміти:

    referential equality

    function identity

    dependency array

    closure

    stale closure

Вміти використовувати:

    useCallback + React.memo

    useCallback + useEffect

    useCallback + custom hooks

    functional state updates

Розуміти:

    чому function prop може
    спричинити re-render memoized child;

    чому stable function reference
    може допомогти React.memo;

    чому не потрібно memoize
    кожну function.

Вміти правильно визначати:

    dependencies

і уникати:

    stale closures

    missing dependencies

    unnecessary useCallback

---

## 🟠 Middle

Глибше розуміти:

    React rendering

    reconciliation

    referential equality

    shallow comparison

    function identity

    closures

    dependency tracking

    memoization overhead

    rendering performance

Вміти аналізувати:

    Parent render
        ↓
    callback reference
        ↓
    child props
        ↓
    React.memo
        ↓
    child render

Розуміти trade-offs:

    stable references
        vs
    code complexity

    memoization
        vs
    memory/CPU overhead

Вміти комбінувати:

    useCallback
    useMemo
    React.memo

Вміти використовувати:

    React DevTools Profiler

для визначення:

    unnecessary renders

    changed function props

    performance bottlenecks

---

## 🔴 Senior

Глибоке розуміння:

    React rendering model

    reconciliation

    memoization strategies

    referential equality

    function identity

    closure semantics

    dependency tracking

    render scheduling

    concurrent rendering

    performance profiling

    optimization boundaries

    memory/CPU trade-offs

Розуміти trade-offs між:

    inline functions

    useCallback

    React.memo

    useMemo

    custom hooks

    context

    external state

    event handlers

Розуміти, що performance optimization повинна базуватися на:

    measurement
        ↓
    profiling
        ↓
    bottleneck identification
        ↓
    optimization
        ↓
    re-measurement

Розуміти:

    stable reference
        ≠
    automatically better performance

і:

    useCallback
        ≠
    universal optimization

---

# Міні-шпаргалка

## useCallback

    const handleClick = useCallback(() => {
        console.log("click");
    }, []);

---

## Основна ідея

    dependencies unchanged
            ↓
    same function reference

    dependency changed
            ↓
    new function reference

---

## useMemo

    useMemo
        ↓
    memoized value

---

## useCallback

    useCallback
        ↓
    memoized function

---

## React.memo

    React.memo
        ↓
    memoized component rendering

---

## Основний pattern

    const handleClick = useCallback(() => {
        ...
    }, []);

    return (
        <Child onClick={handleClick} />
    );

---

## React.memo pattern

    const Child = memo(function Child({
        onClick
    }) {
        ...
    });

---

## useCallback + React.memo

    Parent
       ↓
    useCallback
       ↓
    stable function
       ↓
    React.memo
       ↓
    child render can be skipped

---

## Dependency

    const handleClick = useCallback(() => {
        console.log(count);
    }, [count]);

---

## Functional update

    const increment = useCallback(() => {
        setCount(value => value + 1);
    }, []);

---

## Stale closure

    const handleClick = useCallback(() => {
        console.log(count);
    }, []);

Якщо `count` змінюється, але не є dependency, може виникнути:

    stale closure

Правильно:

    const handleClick = useCallback(() => {
        console.log(count);
    }, [count]);

---

## Function reference

    const fn1 = () => {};
    const fn2 = () => {};

    fn1 === fn2;

    // false

---

## Stable reference

    const fn = useCallback(() => {
        ...
    }, []);

---

## Callback dependency

    const handleSave = useCallback(() => {
        save(user);
    }, [user]);

---

## Custom Hook

    function useCounter() {
        const [count, setCount] = useState(0);

        const increment = useCallback(() => {
            setCount(value => value + 1);
        }, []);

        return {
            count,
            increment,
        };
    }

---

## Context

    const logout = useCallback(() => {
        setUser(null);
    }, []);

---

## Important

    useCallback
        ≠
    faster function

---

## Important

    useCallback
        ≠
    prevent component render

---

## Important

    useCallback
        ≠
    React.memo

---

## Important

    useCallback
        ≠
    useMemo

---

## Основна модель

    render
        ↓
    useCallback
        ↓
    compare dependencies
        ↓
    unchanged?
       ↙       ↘
      yes       no
       ↓         ↓
    reuse      new function
       ↓         ↓
       └────┬────┘
            ↓
          callback

---

## Performance flow

    profile
       ↓
    find bottleneck
       ↓
    check function identity
       ↓
    useCallback if justified
       ↓
    React.memo if appropriate
       ↓
    measure again

---

# Головне:

• `useCallback` — React Hook для memoization function reference.

• Синтаксис:

    const handleClick = useCallback(
        () => {
            ...
        },
        [dependencies]
    );

• `useCallback` повертає function.

• Якщо dependencies не змінилися, React може повернути ту саму function reference.

• Якщо dependency змінилася, callback reference може змінитися.

• `useCallback` не робить function execution швидшим.

• `useCallback` не зупиняє re-render parent component.

• Основна користь `useCallback` — стабільність function identity.

• Це особливо важливо при:

    React.memo

• Типовий pattern:

    useCallback
        ↓
    stable function reference
        ↓
    React.memo
        ↓
    possible child render skip

• `useMemo` мемоізує value:

    useMemo → value

• `useCallback` мемоізує function:

    useCallback → function

• `React.memo` оптимізує rendering component:

    React.memo → component render

• Function створена під час кожного render має нову reference.

• Наприклад:

    const fn1 = () => {};
    const fn2 = () => {};

    fn1 === fn2
    // false

• `useCallback` може зберігати ту саму reference:

    render 1 → function A
    render 2 → function A
    render 3 → function A

поки dependencies не змінилися.

• Callback може створювати closure над:

    state
    props
    variables

• Якщо callback використовує reactive value, ця value зазвичай повинна бути dependency.

• Неправильні dependencies можуть спричинити:

    stale closure

• Не потрібно видаляти dependencies тільки заради:

    []

• Functional state update може дозволити callback не залежати від поточного state:

    setCount(value => value + 1);

• `useCallback` не потрібно використовувати для кожної function.

• Якщо callback не передається memoized child і не є важливою dependency, звичайна function часто простіша.

• `useCallback` має власний overhead.

• Надмірне використання `useCallback` може погіршити:

    readability
    maintainability
    simplicity

• Stable reference сама по собі не означає performance improvement.

• Не кожен новий callback є performance problem.

• Потрібно спочатку:

    measure
        ↓
    profile
        ↓
    identify bottleneck

і лише потім:

    optimize

• Головне питання перед використанням `useCallback`:

    "Чи важлива identity цієї функції
     для performance або dependency stability?"

• Основна модель:

    useCallback(
        function,
        dependencies
    )

        ↓

    dependencies unchanged
        ↓
    reuse function reference

    dependencies changed
        ↓
    new function reference

• Головна формула:

    useCallback
        =
    memoized function reference

• Головний performance pattern:

    Parent
       ↓
    useCallback
       ↓
    stable callback
       ↓
    React.memo
       ↓
    possible child render skip

• Найважливіше правило:

    correctness
        >
    artificial memoization

• `useCallback` — це інструмент оптимізації, а не обов'язкова частина кожного React-компонента.