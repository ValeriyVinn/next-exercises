# React Performance — useMemo

`useMemo` — це React Hook, який дозволяє мемоізувати результат обчислення та повторно використовувати його між render'ами компонента, доки його dependencies не змінилися.

`useMemo` використовується переважно для:

- уникнення дорогих повторних обчислень;
- кешування результату обчислення;
- оптимізації компонентів, які часто re-render;
- стабілізації обчисленого значення;
- передачі стабільного object/array value до memoized component;
- зменшення непотрібної роботи під час render.

Синтаксис:

    const memoizedValue = useMemo(
        () => calculateValue(),
        [dependencies]
    );

Основна ідея:

    render
       ↓
    useMemo
       ↓
    dependencies unchanged?
       ↓
    yes ──→ використати cached value
       │
       no
       ↓
    виконати calculation
       ↓
    зберегти результат
       ↓
    повернути value

---

# Ключові поняття

✔ `useMemo`  
✔ memoization  
✔ memoized value  
✔ cache  
✔ calculation  
✔ dependencies  
✔ dependency array  
✔ render  
✔ re-render  
✔ expensive calculation  
✔ referential equality  
✔ object reference  
✔ array reference  
✔ primitive value  
✔ `React.memo`  
✔ `useCallback`  
✔ performance optimization  
✔ premature optimization  
✔ profiling  
✔ React DevTools Profiler  

---

# Що потрібно пам'ятати

• `useMemo` кешує **результат обчислення**, а не саму функцію.

• `useMemo` повертає значення.

• Функція всередині `useMemo` виконується під час render, коли React створює або оновлює memoized value.

• Якщо dependencies не змінилися, React може використати попередній результат.

• Якщо dependency змінилася, calculation виконується знову.

• `useMemo` не потрібно використовувати для кожного значення.

• `useMemo` — це performance optimization, а не механізм для правильної роботи програми.

• Не слід використовувати `useMemo` просто тому, що він існує.

• Особливо корисний `useMemo`, коли calculation є достатньо дорогою або коли потрібна стабільна reference identity object/array.

• `useMemo` та `useCallback` пов'язані, але роблять різні речі:

    useMemo     → memoize value
    useCallback → memoize function

• `React.memo` мемоізує результат rendering компонента за умови, що його props не змінилися за reference equality.

• `useMemo` може бути корисним разом із `React.memo`.

---

# Що таке memoization

Memoization — техніка оптимізації, при якій результат попереднього обчислення зберігається та може бути повторно використаний.

Замість:

    input
      ↓
    calculate
      ↓
    result

при memoization:

    input
      ↓
    cache lookup
      ↓
    same input?
      ↓
    yes → cached result
    no  → calculate → save result

Наприклад:

    calculate(10)
        ↓
    100

Якщо повторно викликати:

    calculate(10)

можна використати вже збережений результат:

    100

---

# useMemo

Синтаксис:

    const value = useMemo(
        () => calculation,
        [dependencies]
    );

Наприклад:

    const doubled = useMemo(() => {
        return count * 2;
    }, [count]);

Тут:

    () => count * 2
        ↓
    calculation

    [count]
        ↓
    dependency

    doubled
        ↓
    memoized value

---

# Простий приклад

    import { useMemo, useState } from "react";

    function Counter() {
        const [count, setCount] = useState(0);

        const doubled = useMemo(() => {
            return count * 2;
        }, [count]);

        return (
            <div>
                <p>Count: {count}</p>
                <p>Doubled: {doubled}</p>

                <button onClick={() => setCount(count + 1)}>
                    Increment
                </button>
            </div>
        );
    }

Тут:

    count
      ↓
    calculation
      ↓
    doubled

Коли `count` змінюється, `doubled` перераховується.

---

# useMemo повертає value

Це дуже важливо.

`useMemo`:

    const value = useMemo(() => {
        return calculate();
    }, []);

повертає:

    value

А не function.

Наприклад:

    const result = useMemo(() => {
        return 10 * 20;
    }, []);

Тепер:

    result === 200

---

# useMemo vs useCallback

Це одна з найважливіших відмінностей.

`useMemo`:

    const value = useMemo(() => {
        return calculate();
    }, []);

Мемоізує:

    value

`useCallback`:

    const handleClick = useCallback(() => {
        console.log("click");
    }, []);

Мемоізує:

    function

Отже:

    useMemo
        → memoized value

    useCallback
        → memoized function

---

# useMemo та function

Можна технічно мемоізувати функцію через `useMemo`:

    const handleClick = useMemo(() => {
        return () => {
            console.log("click");
        };
    }, []);

Але для цього існує спеціальний Hook:

    useCallback()

Тому краще:

    const handleClick = useCallback(() => {
        console.log("click");
    }, []);

Правило:

    useMemo     → value
    useCallback → function

---

# Dependency Array

Dependency array визначає, коли memoized calculation потрібно виконати знову.

Наприклад:

    const result = useMemo(() => {
        return expensiveCalculation(count);
    }, [count]);

Тут dependency:

    count

Якщо:

    count не змінився

React може використати попередній result.

Якщо:

    count змінився

React повторно виконає calculation.

---

# useMemo без dependencies

Синтаксис:

    const value = useMemo(() => {
        return calculate();
    });

Такий варіант фактично не дає потрібної memoization optimization.

Calculation буде виконуватися під час кожного render.

Тому зазвичай потрібно явно вказувати dependencies:

    const value = useMemo(() => {
        return calculate();
    }, [dependency]);

---

# useMemo з порожнім dependency array

Приклад:

    const value = useMemo(() => {
        return calculate();
    }, []);

Порожній array означає, що calculation не залежить від reactive values компонента.

React зберігає результат між render'ами компонента.

Але важливо:

`useMemo` не слід сприймати як гарантію довічного збереження значення.

Memoization — optimization mechanism.

---

# useMemo з dependencies

Найтиповіший випадок:

    const filteredUsers = useMemo(() => {
        return users.filter(user => user.active);
    }, [users]);

Тут calculation залежить від:

    users

Якщо reference `users` змінилася:

    calculation → повторно

Якщо reference не змінилася:

    previous result → reuse

---

# Expensive Calculation

`useMemo` найбільш зрозуміло використовувати для expensive calculation.

Наприклад:

    function calculateStatistics(numbers) {
        let total = 0;

        for (const number of numbers) {
            total += number;
        }

        return {
            total,
            average: total / numbers.length,
        };
    }

Компонент:

    function Statistics({ numbers }) {
        const statistics = useMemo(() => {
            return calculateStatistics(numbers);
        }, [numbers]);

        return (
            <div>
                <p>Total: {statistics.total}</p>
                <p>Average: {statistics.average}</p>
            </div>
        );
    }

---

# Що таке expensive calculation

Expensive calculation — операція, яка потребує помітної кількості CPU time або memory.

Наприклад:

    sorting large arrays

    filtering large datasets

    complex mathematical calculations

    data transformation

    parsing large structures

    complex derived state

    expensive algorithms

Але:

    2 + 2

або:

    `${firstName} ${lastName}`

зазвичай не потребують `useMemo`.

---

# Просте правило

Не:

    const fullName = useMemo(() => {
        return `${firstName} ${lastName}`;
    }, [firstName, lastName]);

Якщо calculation дуже дешевий.

Зазвичай достатньо:

    const fullName = `${firstName} ${lastName}`;

`useMemo` має власну вартість і complexity.

---

# useMemo для filtering

Один із найпоширеніших прикладів:

    function UserList({ users, search }) {
        const filteredUsers = useMemo(() => {
            return users.filter(user =>
                user.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        }, [users, search]);

        return (
            <ul>
                {filteredUsers.map(user => (
                    <li key={user.id}>
                        {user.name}
                    </li>
                ))}
            </ul>
        );
    }

Залежності:

    users
    search

При зміні будь-якої з них:

    filteredUsers → recalculate

---

# useMemo для sorting

Наприклад:

    function ProductList({ products, sortOrder }) {
        const sortedProducts = useMemo(() => {
            return [...products].sort((a, b) => {
                if (sortOrder === "asc") {
                    return a.price - b.price;
                }

                return b.price - a.price;
            });
        }, [products, sortOrder]);

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

Зверни увагу:

    [...products]

створює копію масиву.

Не варто мутувати:

    products.sort(...)

оскільки props/state не повинні мутуватися.

---

# useMemo для derived data

Derived data — дані, які можна отримати з інших даних.

Наприклад:

    const activeUsers = useMemo(() => {
        return users.filter(user => user.active);
    }, [users]);

`activeUsers` — derived data.

Інший приклад:

    const totalPrice = useMemo(() => {
        return products.reduce(
            (total, product) =>
                total + product.price,
            0
        );
    }, [products]);

---

# Derived State

Не потрібно автоматично створювати state для derived data.

Погано:

    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        setActiveUsers(
            users.filter(user => user.active)
        );
    }, [users]);

Тут створюється зайвий state.

Часто краще:

    const activeUsers = useMemo(() => {
        return users.filter(user => user.active);
    }, [users]);

А якщо calculation дуже дешевий:

    const activeUsers = users.filter(
        user => user.active
    );

---

# useMemo та object

`useMemo` часто використовують для стабілізації object reference.

Наприклад:

    const options = useMemo(() => {
        return {
            sort: "price",
            direction: "asc",
        };
    }, []);

Тепер `options` має стабільну reference identity між render'ами, доки dependencies не змінюються.

---

# Чому object може спричинити проблему

JavaScript objects порівнюються за reference.

Наприклад:

    const a = {
        name: "John"
    };

    const b = {
        name: "John"
    };

    console.log(a === b);

Результат:

    false

Хоча дані однакові.

Тому:

    { name: "John" }

створений під час кожного render — це новий object.

---

# Object без useMemo

Наприклад:

    function Parent() {
        const options = {
            theme: "dark",
        };

        return <Child options={options} />;
    }

При кожному render:

    new render
       ↓
    new object
       ↓
    new reference

Навіть якщо:

    options.theme === "dark"

reference буде іншою.

---

# Object з useMemo

    function Parent() {
        const options = useMemo(() => {
            return {
                theme: "dark",
            };
        }, []);

        return <Child options={options} />;
    }

Тепер:

    render
       ↓
    useMemo
       ↓
    same object reference

поки dependencies не змінюються.

---

# useMemo + React.memo

Це важливий performance pattern.

Parent:

    const options = useMemo(() => {
        return {
            theme: "dark",
        };
    }, []);

    return <Child options={options} />;

Child:

    const Child = memo(function Child({ options }) {
        return (
            <div>
                {options.theme}
            </div>
        );
    });

Якщо Parent re-render:

    Parent render
         ↓
    options reference unchanged
         ↓
    Child props unchanged
         ↓
    React.memo
         ↓
    Child render can be skipped

---

# Без useMemo

    function Parent() {
        const options = {
            theme: "dark",
        };

        return <Child options={options} />;
    }

Навіть якщо:

    options.theme

не змінився, кожен render створює:

    new object reference

Тому:

    React.memo

може не дати очікуваного ефекту.

---

# useMemo + React.memo

Типовий pattern:

    const data = useMemo(() => {
        return expensiveCalculation(items);
    }, [items]);

    return <List data={data} />;

Child:

    const List = memo(function List({ data }) {
        return (
            <ul>
                ...
            </ul>
        );
    });

Тут:

    useMemo
        ↓
    stable reference
        ↓
    React.memo
        ↓
    possible render skip

---

# useMemo + useCallback + React.memo

Ці три механізми часто використовуються разом.

    useMemo
        ↓
    stable value

    useCallback
        ↓
    stable function

    React.memo
        ↓
    skip unnecessary child render

Наприклад:

    const options = useMemo(() => {
        return {
            theme: "dark",
        };
    }, []);

    const handleSelect = useCallback((id) => {
        console.log(id);
    }, []);

    return (
        <Child
            options={options}
            onSelect={handleSelect}
        />
    );

Child:

    const Child = memo(function Child({
        options,
        onSelect
    }) {
        ...
    });

---

# useMemo та Referential Equality

React часто використовує порівняння reference.

Наприклад:

    const a = { value: 1 };
    const b = { value: 1 };

    a === b

Результат:

    false

А:

    const a = { value: 1 };
    const b = a;

    a === b

Результат:

    true

`useMemo` може допомогти зберегти reference одного object або array між render'ами.

---

# Array Reference

Наприклад:

    const numbers = useMemo(() => {
        return [1, 2, 3];
    }, []);

Тепер React отримує ту саму reference між render'ами.

Без memoization:

    const numbers = [1, 2, 3];

кожен render створює новий array.

---

# useMemo та primitive values

Primitive values:

    string
    number
    boolean
    null
    undefined
    bigint
    symbol

Наприклад:

    const total = useMemo(() => {
        return price * quantity;
    }, [price, quantity]);

Технічно це працює.

Але якщо calculation дешевий:

    const total = price * quantity;

часто буде кращим рішенням.

Не потрібно використовувати `useMemo` тільки заради memoization primitive value.

---

# useMemo не прискорює все

Неправильна ідея:

    useMemo = component becomes faster

Правильніше:

    useMemo
        ↓
    може зменшити кількість дорогих calculations
        ↓
    може покращити performance

Але сам `useMemo` теж має overhead.

---

# useMemo має свою вартість

React повинен:

    зберегти value
    зберегти dependencies
    порівняти dependencies
    визначити, чи потрібно повторно виконати calculation

Тому:

    useMemo

не є безкоштовним.

Для дешевих calculations memoization може бути зайвою.

---

# Premature Optimization

Premature optimization — передчасна оптимізація без доказу, що саме ця частина коду є проблемою.

Наприклад:

    const name = useMemo(() => {
        return user.name;
    }, [user.name]);

Це, як правило, безглузда оптимізація.

Краще:

    const name = user.name;

Спочатку:

    write simple code

потім:

    measure performance

і лише після цього:

    optimize bottleneck

---

# Performance Optimization Flow

Правильний процес:

    1. Write code
           ↓
    2. Profile
           ↓
    3. Find bottleneck
           ↓
    4. Optimize
           ↓
    5. Measure again

Не:

    useMemo everywhere
           ↓
    hope application becomes faster

---

# React DevTools Profiler

Для performance optimization корисно використовувати React DevTools Profiler.

Profiler допомагає побачити:

    components that render
    render duration
    commit duration
    rendering frequency
    performance bottlenecks

Тому перед використанням `useMemo` бажано зрозуміти:

    де саме знаходиться bottleneck

---

# useMemo для expensive filtering

Наприклад, великий список:

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            return product.name
                .toLowerCase()
                .includes(search.toLowerCase());
        });
    }, [products, search]);

Якщо `products` містить багато елементів, повторне filtering може бути помітним.

---

# useMemo для expensive transformation

Наприклад:

    const chartData = useMemo(() => {
        return transactions.map(transaction => {
            return {
                date: transaction.date,
                amount: transaction.amount,
            };
        });
    }, [transactions]);

`chartData` — derived data.

---

# useMemo для aggregation

Наприклад:

    const total = useMemo(() => {
        return cart.reduce(
            (sum, item) => {
                return sum + item.price * item.quantity;
            },
            0
        );
    }, [cart]);

Залежність:

    cart

---

# useMemo для grouping

Наприклад:

    const usersByRole = useMemo(() => {
        return users.reduce((groups, user) => {
            const role = user.role;

            if (!groups[role]) {
                groups[role] = [];
            }

            groups[role].push(user);

            return groups;
        }, {});
    }, [users]);

Результат:

    {
        admin: [...],
        teacher: [...],
        student: [...]
    }

---

# useMemo для sorting + filtering

Можна комбінувати transformations:

    const visibleProducts = useMemo(() => {
        const filtered = products.filter(product => {
            return product.active;
        });

        return [...filtered].sort((a, b) => {
            return a.price - b.price;
        });
    }, [products]);

Тут:

    products
       ↓
    filter
       ↓
    sort
       ↓
    visibleProducts

---

# Dependency Correctness

Dependencies повинні містити reactive values, від яких залежить calculation.

Наприклад:

    const result = useMemo(() => {
        return price * quantity;
    }, [price, quantity]);

Правильно.

Не:

    const result = useMemo(() => {
        return price * quantity;
    }, [price]);

Тут `quantity` використовується, але відсутня у dependencies.

---

# Неповні dependencies

Проблемний приклад:

    const total = useMemo(() => {
        return price * quantity;
    }, [price]);

Якщо:

    quantity

зміниться, calculation може використовувати старий memoized result.

Правильно:

    const total = useMemo(() => {
        return price * quantity;
    }, [price, quantity]);

---

# ESLint та dependencies

ESLint з React rules може допомогти виявляти проблеми з dependencies.

Наприклад, правило:

    react-hooks/exhaustive-deps

допомагає знаходити missing dependencies у Hooks.

Це особливо корисно для:

    useEffect
    useMemo
    useCallback

---

# Не змінюй dependency reference без необхідності

Наприклад:

    const filters = {
        active: true,
    };

Якщо `filters` створюється під час кожного render:

    new render
        ↓
    new filters object
        ↓
    new reference

Якщо `filters` є dependency:

    useMemo(..., [filters])

calculation може виконуватися знову на кожному render.

---

# Поганий pattern

    function Products({ products }) {
        const filters = {
            active: true,
        };

        const visibleProducts = useMemo(() => {
            return products.filter(product => {
                return product.active === filters.active;
            });
        }, [products, filters]);

        ...
    }

Проблема:

    filters

створюється заново на кожному render.

Тому:

    filters reference changes

і memoization може втрачати сенс.

---

# Кращий pattern

Якщо object не потрібен окремо:

    const visibleProducts = useMemo(() => {
        return products.filter(product => {
            return product.active === true;
        });
    }, [products]);

Або, якщо object дійсно є dependency:

    const filters = useMemo(() => {
        return {
            active: true,
        };
    }, []);

    const visibleProducts = useMemo(() => {
        return products.filter(product => {
            return product.active === filters.active;
        });
    }, [products, filters]);

---

# useMemo не призначений для side effects

Погано:

    const value = useMemo(() => {
        fetch("/api/users");

        return 100;
    }, []);

`useMemo` призначений для:

    calculation

а не:

    side effect

Для side effects існує:

    useEffect

---

# useMemo vs useEffect

`useMemo`:

    calculate value

`useEffect`:

    synchronize with external system

Наприклад:

    const sortedUsers = useMemo(() => {
        return [...users].sort(...);
    }, [users]);

А side effect:

    useEffect(() => {
        document.title = "Users";
    }, []);

Основна різниця:

    useMemo
        → derived value

    useEffect
        → side effect / synchronization

---

# useMemo vs useState

Не потрібно використовувати state для простого derived value.

Погано:

    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(price * quantity);
    }, [price, quantity]);

Краще:

    const total = price * quantity;

Якщо calculation дорогий:

    const total = useMemo(() => {
        return calculateTotal(cart);
    }, [cart]);

---

# useMemo та Strict Mode

У development mode React Strict Mode може викликати render-related logic більше одного разу для виявлення проблем.

Тому не слід покладатися на те, що calculation всередині `useMemo` виконається буквально один раз.

Наприклад:

    const value = useMemo(() => {
        console.log("calculate");

        return expensiveCalculation();
    }, []);

У development output може відрізнятися від production.

Тому calculation має бути:

    pure

і не повинна містити side effects.

---

# Pure Calculation

Calculation всередині `useMemo` повинна бути pure.

Наприклад:

    const sortedUsers = useMemo(() => {
        return [...users].sort(
            (a, b) => a.name.localeCompare(b.name)
        );
    }, [users]);

Це добре.

А ось:

    const sortedUsers = useMemo(() => {
        users.sort(...);

        return users;
    }, [users]);

погано, тому що `sort()` мутує масив.

---

# Не мутуй props/state

Погано:

    const sorted = useMemo(() => {
        return users.sort(...);
    }, [users]);

`sort()` змінює:

    users

Краще:

    const sorted = useMemo(() => {
        return [...users].sort(...);
    }, [users]);

---

# useMemo та cache invalidation

Memoization означає, що React зберігає результат calculation.

Але cached value потрібно вважати implementation detail React.

Не варто будувати correctness логіку на тому, що:

    useMemo

гарантовано збереже value назавжди.

Правильна модель:

    useMemo
        → performance optimization

а не:

    useMemo
        → persistent storage

---

# useMemo не замінює database/cache

Не слід використовувати `useMemo` як заміну:

    server cache
    browser storage
    database
    API cache
    application state

Наприклад, для даних API використовують відповідні data-fetching/cache механізми.

`useMemo` працює в рамках rendering lifecycle конкретного компонента.

---

# useMemo та component lifecycle

У спрощеній моделі:

    initial render
         ↓
    calculation
         ↓
    save memoized value
         ↓
    re-render
         ↓
    compare dependencies
         ↓
    unchanged?
      ↙     ↘
    yes      no
     ↓        ↓
    reuse   calculate
     ↓        ↓
     └──→ render ←──┘

---

# useMemo при зміні dependency

Наприклад:

    const result = useMemo(() => {
        console.log("calculate");

        return count * 2;
    }, [count]);

Initial render:

    count = 1
    ↓
    calculate
    ↓
    result = 2

Re-render без зміни `count`:

    count = 1
    ↓
    reuse
    ↓
    result = 2

Re-render після:

    count = 2
    ↓
    calculate
    ↓
    result = 4

---

# Dependency comparison

React перевіряє dependencies між render'ами.

Наприклад:

    [count]

Якщо попереднє:

    count = 10

і нове:

    count = 10

dependency не змінилася.

Якщо:

    count = 11

dependency змінилася.

Для object:

    previousObject !== newObject

означає, що reference змінилася.

---

# Object dependencies

Наприклад:

    const options = {
        sort: "asc",
    };

    const result = useMemo(() => {
        return calculate(data, options);
    }, [data, options]);

Якщо `options` створюється під час render:

    options → new reference

то calculation може виконуватися знову.

Це важливий момент при роботі з:

    objects
    arrays
    functions

---

# Primitive vs Reference

Primitive:

    const count = 10;

Reference:

    const user = {
        name: "John"
    };

Для primitive comparison:

    10 === 10
        → true

Для object:

    { name: "John" } === { name: "John" }
        → false

Тому reference stability важлива для React optimization patterns.

---

# useMemo та child component

Наприклад:

    function Parent({ items }) {
        const visibleItems = useMemo(() => {
            return items.filter(item => item.visible);
        }, [items]);

        return (
            <Child items={visibleItems} />
        );
    }

Якщо `Child`:

    const Child = memo(function Child({ items }) {
        ...
    });

то стабільна reference `visibleItems` може дозволити `React.memo` пропустити render.

---

# Коли useMemo дійсно корисний

`useMemo` може бути хорошим вибором, якщо:

• calculation expensive;

• calculation виконується часто;

• dependencies часто залишаються незмінними;

• component часто re-renders;

• memoized object/array передається в `React.memo` component;

• стабільна reference потрібна для іншої optimization logic.

---

# Коли useMemo не потрібен

Не варто використовувати `useMemo` для:

• простих арифметичних операцій;

• простого доступу до property;

• простого template string;

• маленьких calculations;

• кожного `const`;

• кожного object без performance reason;

• кожного array без performance reason;

• side effects;

• persistence;

• заміни state;

• заміни API cache.

---

# Приклад зайвого useMemo

Погано:

    const fullName = useMemo(() => {
        return `${firstName} ${lastName}`;
    }, [firstName, lastName]);

Краще:

    const fullName = `${firstName} ${lastName}`;

---

# Ще один зайвий useMemo

Погано:

    const isAdult = useMemo(() => {
        return age >= 18;
    }, [age]);

Краще:

    const isAdult = age >= 18;

---

# Зайвий useMemo для property

Погано:

    const name = useMemo(() => {
        return user.name;
    }, [user.name]);

Краще:

    const name = user.name;

---

# Реалістичний приклад

    function ProductPage({ products, search }) {
        const filteredProducts = useMemo(() => {
            return products
                .filter(product =>
                    product.name
                        .toLowerCase()
                        .includes(search.toLowerCase())
                )
                .sort((a, b) => {
                    return a.price - b.price;
                });
        }, [products, search]);

        return (
            <ProductList
                products={filteredProducts}
            />
        );
    }

Тут:

    products
        ↓
    filter
        ↓
    sort
        ↓
    memoized products
        ↓
    ProductList

---

# Практичний приклад з toggle

Уявімо компонент:

    function Dashboard({ users }) {
        const [showActive, setShowActive] = useState(true);

        const visibleUsers = useMemo(() => {
            console.log("filter users");

            if (!showActive) {
                return users;
            }

            return users.filter(user => user.active);
        }, [users, showActive]);

        return (
            <div>
                <button
                    onClick={() =>
                        setShowActive(value => !value)
                    }
                >
                    Toggle
                </button>

                <UserList users={visibleUsers} />
            </div>
        );
    }

Dependencies:

    users
    showActive

Якщо змінюється інший state, але:

    users
    showActive

залишилися незмінними, React може повторно використати `visibleUsers`.

---

# useMemo та state updates

Наявність `useMemo` не означає, що компонент перестає re-render.

Наприклад:

    function Counter({ items }) {
        const [count, setCount] = useState(0);

        const result = useMemo(() => {
            return expensiveCalculation(items);
        }, [items]);

        return (
            <button
                onClick={() => setCount(count + 1)}
            >
                {count}
            </button>
        );
    }

При зміні:

    count

компонент все одно re-render.

Але calculation:

    expensiveCalculation(items)

може бути пропущена, якщо:

    items

не змінився.

Це дуже важлива відмінність:

    useMemo
        ≠
    prevent component render

`useMemo` мемоізує calculation result.

---

# useMemo vs React.memo

Не плутати.

`useMemo`:

    const value = useMemo(
        calculate,
        dependencies
    );

Мемоізує:

    value

`React.memo`:

    const Component = memo(Component);

Мемоізує rendering component за props comparison.

Отже:

    useMemo
        → memoize calculation/value

    React.memo
        → memoize component rendering

---

# useMemo vs useCallback

    useMemo
        → value

    useCallback
        → function

Наприклад:

    const value = useMemo(() => {
        return calculate(data);
    }, [data]);

    const handleClick = useCallback(() => {
        console.log("click");
    }, []);

---

# useMemo та Context

У Context може бути корисно мемоізувати object value, якщо context provider часто re-render.

Наприклад:

    const contextValue = useMemo(() => {
        return {
            user,
            logout,
        };
    }, [user, logout]);

Потім:

    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>

Це може допомогти уникати зайвих змін `value` reference.

Але це окрема optimization topic.

---

# useMemo та expensive child props

Наприклад:

    const chartData = useMemo(() => {
        return transformData(data);
    }, [data]);

    return (
        <Chart data={chartData} />
    );

Якщо:

    Chart

мемоізований:

    const Chart = memo(function Chart({ data }) {
        ...
    });

стабільна reference `chartData` може бути важливою.

---

# useMemo та nested data

Наприклад:

    const statistics = useMemo(() => {
        return {
            total: orders.length,
            completed: orders.filter(
                order => order.status === "completed"
            ).length,
        };
    }, [orders]);

Тут memoized value:

    {
        total,
        completed
    }

має стабільну reference між змінами `orders`.

---

# useMemo та multiple dependencies

Можна мати декілька dependencies:

    const result = useMemo(() => {
        return calculate(
            products,
            search,
            sortOrder,
            category
        );
    }, [
        products,
        search,
        sortOrder,
        category
    ]);

Calculation повториться, якщо зміниться хоча б одна dependency.

---

# useMemo та dependency order

Не має значення, у якому порядку dependencies записані:

    [products, search]

та:

    [search, products]

Логічно вони представляють той самий набір залежностей.

Головне:

    усі необхідні dependencies
        +
    правильні references

---

# Nested useMemo

Зазвичай не потрібно без необхідності створювати багато `useMemo`.

Наприклад:

    const filtered = useMemo(() => {
        return filterProducts(products);
    }, [products]);

    const sorted = useMemo(() => {
        return sortProducts(filtered);
    }, [filtered]);

Це може бути виправдано, якщо кожна операція справді дорога.

Але часто простіше:

    const sorted = useMemo(() => {
        const filtered = filterProducts(products);

        return sortProducts(filtered);
    }, [products]);

Потрібно оцінювати реальний performance bottleneck.

---

# useMemo та readability

Надмірне використання `useMemo` може погіршити читабельність.

Наприклад:

    const firstName = useMemo(
        () => user.firstName,
        [user.firstName]
    );

Код стає складнішим без реальної користі.

Тому:

    performance
        vs
    readability

потрібно балансувати.

---

# Правильний performance mindset

Не:

    "Я використаю useMemo всюди."

А:

    "Я використаю useMemo там,
     де measurement показує,
     що calculation або reference
     створює проблему."

---

# Performance Optimization Checklist

Перед `useMemo` запитай:

    1. Чи calculation дійсно expensive?

    2. Чи компонент часто re-render?

    3. Чи calculation повторюється без потреби?

    4. Чи dependencies часто змінюються?

    5. Чи стабільна reference реально потрібна?

    6. Чи є React.memo на child component?

    7. Чи вимірював я performance?

    8. Чи не ускладнить useMemo код без користі?

---

# Типові помилки

❌ Використовувати `useMemo` всюди.

---

❌ Вважати, що `useMemo` зупиняє re-render компонента.

    useMemo
        ≠
    React.memo

---

❌ Плутати `useMemo` та `useCallback`.

    useMemo
        → value

    useCallback
        → function

---

❌ Використовувати `useMemo` для side effects.

---

❌ Використовувати `useMemo` замість `useEffect`.

---

❌ Використовувати `useMemo` як persistent storage.

---

❌ Мутувати arrays або objects всередині calculation.

Погано:

    users.sort(...)

Краще:

    [...users].sort(...)

---

❌ Пропускати dependencies.

Погано:

    const total = useMemo(() => {
        return price * quantity;
    }, [price]);

Правильно:

    const total = useMemo(() => {
        return price * quantity;
    }, [price, quantity]);

---

❌ Створювати нові objects як dependencies.

Погано:

    const options = {
        active: true
    };

    const result = useMemo(() => {
        return calculate(options);
    }, [options]);

`options` створюється заново під час кожного render.

---

❌ Використовувати `useMemo` для дуже дешевих calculations.

---

❌ Вважати `useMemo` гарантією cache persistence.

---

# Practical Patterns

## Filter

    const filtered = useMemo(() => {
        return items.filter(item => item.active);
    }, [items]);

---

## Sort

    const sorted = useMemo(() => {
        return [...items].sort(
            (a, b) => a.price - b.price
        );
    }, [items]);

---

## Reduce

    const total = useMemo(() => {
        return items.reduce(
            (sum, item) => sum + item.price,
            0
        );
    }, [items]);

---

## Transform

    const data = useMemo(() => {
        return items.map(item => ({
            id: item.id,
            label: item.name,
        }));
    }, [items]);

---

## Group

    const grouped = useMemo(() => {
        return groupByCategory(items);
    }, [items]);

---

## Stable object

    const options = useMemo(() => {
        return {
            theme: "dark",
            language: "uk",
        };
    }, []);

---

## Stable array

    const columns = useMemo(() => {
        return [
            "name",
            "email",
            "role",
        ];
    }, []);

---

# Practical Example — Search

    function SearchResults({ users, search }) {
        const results = useMemo(() => {
            const normalizedSearch =
                search.toLowerCase();

            return users.filter(user =>
                user.name
                    .toLowerCase()
                    .includes(normalizedSearch)
            );
        }, [users, search]);

        return (
            <ul>
                {results.map(user => (
                    <li key={user.id}>
                        {user.name}
                    </li>
                ))}
            </ul>
        );
    }

---

# Practical Example — Cart

    function Cart({ items }) {
        const total = useMemo(() => {
            return items.reduce(
                (sum, item) => {
                    return sum + item.price * item.quantity;
                },
                0
            );
        }, [items]);

        return (
            <div>
                <p>Total: {total}</p>
            </div>
        );
    }

---

# Practical Example — Expensive Calculation

    function Statistics({ numbers }) {
        const statistics = useMemo(() => {
            let total = 0;

            for (const number of numbers) {
                total += number;
            }

            const average =
                numbers.length > 0
                    ? total / numbers.length
                    : 0;

            return {
                total,
                average,
            };
        }, [numbers]);

        return (
            <div>
                <p>Total: {statistics.total}</p>
                <p>Average: {statistics.average}</p>
            </div>
        );
    }

---

# Practical Example — Memoized Child

    const UserList = memo(function UserList({
        users
    }) {
        return (
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name}
                    </li>
                ))}
            </ul>
        );
    });

Parent:

    function UsersPage({ users }) {
        const activeUsers = useMemo(() => {
            return users.filter(user => user.active);
        }, [users]);

        return (
            <UserList users={activeUsers} />
        );
    }

Тут:

    users
      ↓
    useMemo
      ↓
    activeUsers
      ↓
    UserList
      ↓
    React.memo

---

# Practical Example — Stable Options

    const Child = memo(function Child({
        options
    }) {
        return (
            <div>
                {options.theme}
            </div>
        );
    });

Parent:

    function Parent() {
        const options = useMemo(() => {
            return {
                theme: "dark",
            };
        }, []);

        return (
            <Child options={options} />
        );
    }

---

# useMemo Mental Model

Запам'ятай:

    useMemo(
        calculation,
        dependencies
    )

означає приблизно:

    "Якщо dependencies
     не змінилися,
     використай попередній
     результат calculation."

Не:

    "Ніколи більше
     не запускай calculation."

---

# Simplified Algorithm

У спрощеному вигляді:

    render
      ↓
    execute component
      ↓
    useMemo
      ↓
    compare dependencies
      ↓
    dependencies changed?
       ↙          ↘
      no          yes
      ↓            ↓
    reuse       calculate
      ↓            ↓
      └──────┬─────┘
             ↓
           value
             ↓
           render

---

# useMemo та React Render

Важливо розділяти три поняття:

    Component render
        ↓
    Calculation
        ↓
    DOM update

`useMemo` впливає на:

    Calculation

але не означає автоматичне запобігання:

    Component render

і не є прямим способом контролю:

    DOM update

---

# Rendering vs Calculation

Наприклад:

    function Component({ items }) {
        const result = useMemo(() => {
            return expensiveCalculation(items);
        }, [items]);

        return <div>{result}</div>;
    }

При re-render:

    Component()
        ↓
    useMemo()
        ↓
    cached result
        ↓
    JSX
        ↓
    React rendering process

Тобто component function все одно виконується.

---

# useMemo та large data

При великих datasets:

    10 items
    100 items
    1,000 items
    10,000 items
    100,000+ items

вартість:

    filter
    sort
    map
    reduce

може стати відчутною.

У таких випадках `useMemo` може бути корисним, але потрібно вимірювати реальний bottleneck.

---

# useMemo не вирішує всі performance problems

Якщо список має тисячі елементів, проблемою може бути не тільки calculation.

Можуть бути потрібні:

    list virtualization
    pagination
    server-side filtering
    server-side sorting
    caching
    debouncing
    code splitting
    lazy loading

Тому `useMemo` — лише один із performance tools.

---

# useMemo та debouncing

Не плутати.

`useMemo`:

    memoization

`debounce`:

    delay execution until
    user stops triggering action

Наприклад search input може використовувати:

    debounce

а expensive filtering:

    useMemo

Це різні optimization techniques.

---

# useMemo та caching

Memoization є одним із видів caching.

Але:

    useMemo cache

не те саме, що:

    HTTP cache
    browser cache
    server cache
    React Query cache
    database cache

`useMemo` — локальна optimization React component logic.

---

# useMemo та data fetching

Не потрібно робити:

    const data = useMemo(() => {
        return fetch("/api/users");
    }, []);

Це неправильне використання.

Data fetching — окрема задача.

Для нього використовуються:

    fetch
    useEffect
    custom hooks
    framework data fetching
    data-fetching libraries

`useMemo` може обробляти вже отримані дані:

    const filteredData = useMemo(() => {
        return data.filter(...);
    }, [data]);

---

# useMemo та API response

Наприклад:

    const { users } = data;

    const activeUsers = useMemo(() => {
        return users.filter(user => user.active);
    }, [users]);

Тут:

    API response
        ↓
    users
        ↓
    useMemo
        ↓
    activeUsers
        ↓
    UI

Це хороший use case.

---

# useMemo та Next.js

У React/Next.js потрібно пам'ятати, де виконується код.

`useMemo` є React Hook і використовується у client-side component logic.

Для Next.js важливо відрізняти:

    Server Components
    Client Components

Не потрібно автоматично додавати:

    "use client"

тільки через бажання використовувати `useMemo`.

Потрібно дивитися, чи компонент справді потребує client-side React Hook.

---

# useMemo та Server Components

У Next.js Server Component та Client Component мають різні моделі виконання.

`useMemo` належить до client-side React Hook patterns, які застосовуються там, де component logic підтримує відповідний Hook.

Для Server Components часто важливіші:

    server-side computation
    database queries
    caching
    data fetching
    streaming

а не client-side `useMemo`.

---

# Як думати про useMemo

Постав собі питання:

    "Чи я хочу кешувати
     результат calculation?"

Якщо так:

    useMemo

Потім:

    "Від яких значень
     залежить calculation?"

Це:

    dependencies

Потім:

    "Чи calculation достатньо expensive,
     щоб optimization була виправданою?"

Якщо ні:

    не використовуй useMemo.

---

# Decision Tree

    Потрібне derived value?
          ↓
         yes
          ↓
    Calculation expensive?
       ↙          ↘
      no          yes
      ↓            ↓
   normal       useMemo
   calculation
                   ↓
              dependencies
                   ↓
             correct references

---

# useMemo Checklist

Перед використанням:

    □ Це calculation?

    □ Результат можна derived з інших values?

    □ Calculation достатньо expensive?

    □ Component часто re-render?

    □ Calculation повторюється без необхідності?

    □ Dependencies правильно визначені?

    □ Calculation pure?

    □ Немає mutation?

    □ Performance problem підтверджена profiling?

    □ useMemo не ускладнює код без потреби?

---

# Питання зі співбесіди

Що таке `useMemo`?

Для чого використовується `useMemo`?

Що саме мемоізує `useMemo`?

Що повертає `useMemo`?

Який синтаксис `useMemo`?

Що таке memoization?

Що таке dependency array?

Коли calculation виконується вперше?

Коли calculation виконується повторно?

Що відбувається, якщо dependencies не змінилися?

Що відбувається, якщо dependency змінилася?

Чи зупиняє `useMemo` re-render компонента?

Чим `useMemo` відрізняється від `React.memo`?

Чим `useMemo` відрізняється від `useCallback`?

Коли потрібно використовувати `useMemo`?

Коли не потрібно використовувати `useMemo`?

Чому не потрібно використовувати `useMemo` всюди?

Що таке expensive calculation?

Що таке derived data?

Як використовувати `useMemo` для filtering?

Як використовувати `useMemo` для sorting?

Як використовувати `useMemo` для aggregation?

Як `useMemo` допомагає зі стабільністю object reference?

Як `useMemo` працює разом із `React.memo`?

Чому object, створений у render, має нову reference?

Що таке referential equality?

Чому `useMemo` може бути корисним для array/object props?

Чи є `useMemo` гарантією постійного cache?

Чи можна використовувати `useMemo` для side effects?

Чи можна використовувати `useMemo` для data fetching?

Чим `useMemo` відрізняється від `useEffect`?

Чому не можна мутувати props/state у calculation?

Чому `sort()` може бути небезпечним у `useMemo`?

Що таке premature optimization?

Як перевірити, чи `useMemo` реально покращив performance?

Що таке React DevTools Profiler?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке:

    useMemo

    memoization

    memoized value

    calculation

    dependencies

Розуміти:

    useMemo(() => value, dependencies)

Знати:

    useMemo → value

Розуміти:

    dependencies unchanged
        ↓
    cached value

    dependencies changed
        ↓
    recalculate

Знати:

    useMemo
        ≠
    React.memo

    useMemo
        ≠
    useCallback

Розуміти:

    useMemo → memoize value

    useCallback → memoize function

    React.memo → memoize component rendering

---

## 🔵 Junior

Розуміти:

    expensive calculation

    derived data

    dependency array

    referential equality

    object reference

    array reference

Вміти використовувати `useMemo` для:

    filter

    sort

    map

    reduce

    grouping

Вміти пояснити:

    чому object reference змінюється
    під час кожного render;

    чому React.memo може не допомогти
    при нестабільних object/array props;

    як useMemo може стабілізувати reference.

Розуміти:

    useMemo + React.memo

    useMemo + useCallback

Не використовувати:

    useMemo для side effects

    useMemo для кожного value

    useMemo замість state

    useMemo замість data cache

---

## 🟠 Middle

Глибше розуміти:

    React rendering

    reconciliation

    referential equality

    shallow comparison

    memoization overhead

    profiling

    render performance

Вміти визначати:

    expensive calculations

    unnecessary calculations

    unstable references

    unnecessary child renders

Вміти комбінувати:

    useMemo
    useCallback
    React.memo

Розуміти trade-offs:

    readability
        vs
    performance

Розуміти:

    premature optimization

    cache invalidation

    dependency correctness

Вміти використовувати:

    React DevTools Profiler

для пошуку:

    rendering bottlenecks

    expensive calculations

    unnecessary renders

---

## 🔴 Senior

Глибоке розуміння:

    React rendering model

    reconciliation

    memoization strategies

    referential equality

    object identity

    dependency tracking

    render scheduling

    concurrent rendering

    performance profiling

    CPU vs memory trade-offs

    cache lifetime

    cache invalidation

    optimization boundaries

Розуміти trade-offs між:

    useMemo

    useCallback

    React.memo

    derived calculation

    state

    external cache

    server-side computation

    virtualization

    pagination

    lazy loading

    code splitting

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

---

# Міні-шпаргалка

## useMemo

    const value = useMemo(
        () => calculate(),
        [dependencies]
    );

---

## Основна ідея

    dependencies unchanged
            ↓
      reuse cached value

    dependencies changed
            ↓
        recalculate

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

## Expensive calculation

    const result = useMemo(() => {
        return expensiveCalculation(data);
    }, [data]);

---

## Filter

    const filtered = useMemo(() => {
        return items.filter(item => item.active);
    }, [items]);

---

## Sort

    const sorted = useMemo(() => {
        return [...items].sort(
            (a, b) => a.price - b.price
        );
    }, [items]);

---

## Reduce

    const total = useMemo(() => {
        return items.reduce(
            (sum, item) => sum + item.price,
            0
        );
    }, [items]);

---

## Stable object

    const options = useMemo(() => {
        return {
            theme: "dark",
        };
    }, []);

---

## Stable array

    const columns = useMemo(() => {
        return [
            "name",
            "email",
            "role",
        ];
    }, []);

---

## Dependencies

    useMemo(
        () => calculation,
        [a, b, c]
    );

Якщо зміниться:

    a
    b
    c

calculation може виконатися знову.

---

## Important

    useMemo
        ≠
    prevent re-render

`useMemo` мемоізує calculation result.

---

## Important

    useMemo
        ≠
    persistent cache

Це performance optimization.

---

## Important

    useMemo
        ≠
    side effect

Для side effects:

    useEffect

---

## Important

Не:

    useMemo(() => {
        fetch("/api/users");
    }, []);

Краще використовувати відповідний data-fetching pattern.

---

## Object reference

    const a = {
        value: 1
    };

    const b = {
        value: 1
    };

    a === b
    // false

---

## Stable reference

    const value = useMemo(() => {
        return {
            value: 1
        };
    }, []);

---

## React.memo pattern

    const data = useMemo(() => {
        return transform(items);
    }, [items]);

    return (
        <Child data={data} />
    );

---

## Performance flow

    write code
        ↓
    profile
        ↓
    find bottleneck
        ↓
    optimize
        ↓
    measure again

---

# Головне:

• `useMemo` — React Hook для memoization результату calculation.

• Синтаксис:

    const value = useMemo(
        () => calculation,
        [dependencies]
    );

• `useMemo` повертає memoized value.

• Якщо dependencies не змінилися, React може повторно використати попередній результат.

• Якщо dependency змінилася, calculation виконується знову.

• `useMemo` не означає, що component перестає re-render.

• `useMemo` мемоізує value, а не function.

• Для memoization function використовується:

    useCallback

• Для memoization component rendering використовується:

    React.memo

• `useMemo` особливо корисний для expensive calculations:

    filter
    sort
    map
    reduce
    grouping
    complex transformations

• `useMemo` також може бути корисним для стабілізації reference:

    object
    array

• Стабільна reference може бути важливою при використанні:

    React.memo

• Objects і arrays порівнюються за reference, а не за структурою.

• Новий object:

    { value: 1 }

має нову reference навіть якщо його дані однакові.

• `useMemo` не потрібно використовувати для кожного value.

• Простий код:

    const total = price * quantity;

часто кращий за:

    const total = useMemo(
        () => price * quantity,
        [price, quantity]
    );

якщо calculation дешевий.

• Не потрібно використовувати `useMemo` для side effects.

• Не потрібно використовувати `useMemo` для data fetching.

• Не потрібно використовувати `useMemo` як persistent storage.

• Calculation всередині `useMemo` повинна бути pure.

• Не можна мутувати props/state:

    ❌ users.sort(...)

краще:

    ✅ [...users].sort(...)

• Dependencies повинні відповідати values, які використовуються calculation.

• Потрібно уникати missing dependencies.

• Потрібно обережно працювати з object/array dependencies, які створюються під час render.

• `useMemo` має власний overhead.

• Надмірне використання `useMemo` може погіршити читабельність.

• `useMemo` не повинен бути автоматичною звичкою.

• Правильний підхід:

    measure
        ↓
    identify bottleneck
        ↓
    optimize
        ↓
    measure again

• Основне питання перед використанням `useMemo`:

    "Чи є calculation достатньо дорогою,
     щоб memoization була виправданою?"

• Основна модель:

    render
        ↓
    useMemo
        ↓
    compare dependencies
        ↓
    unchanged?
       ↙       ↘
      yes       no
       ↓         ↓
    reuse     calculate
       ↓         ↓
       └────┬────┘
            ↓
          value

• Головна формула:

    useMemo
        =
    memoized calculation result

• Головна відмінність:

    useMemo     → value
    useCallback → function
    React.memo  → component render

• Головна мета `useMemo`:

    не зробити весь React швидшим,

    а уникнути непотрібних
    повторних дорогих calculations
    там, де це реально має значення.