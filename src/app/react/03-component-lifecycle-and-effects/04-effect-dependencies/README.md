# React — Component Lifecycle and Effects

## 04. Effect Dependencies

**Шлях:**

    `react/03-component-lifecycle-and-effects/04-effect-dependencies`

---

# 1. Що таке Effect Dependencies

У `useEffect()` dependency array визначає, **від яких значень залежить Effect** і коли React повинен виконати його знову.

Базовий синтаксис:

    useEffect(() => {
        // Effect
    }, [dependency1, dependency2]);

Наприклад:

    useEffect(() => {
        document.title = `Count: ${count}`;
    }, [count]);

Тут:

    count

є dependency Effect.

Ментальна модель:

    dependency changes
            ↓
        Effect runs

---

# 2. Навіщо потрібні dependencies

React-компонент може render'итися багато разів.

Наприклад:

    state
      ↓
    render
      ↓
    state changes
      ↓
    render
      ↓
    state changes
      ↓
    render

Але Effect не обов'язково повинен виконуватися після кожного render.

Dependencies дозволяють сказати React:

> "Цей Effect потрібно повторно виконати, коли змінюються ось ці значення."

Наприклад:

    useEffect(() => {
        console.log("User changed");
    }, [userId]);

Тут Effect пов'язаний саме з:

    userId

---

# 3. Три основні форми useEffect

## 3.1. Без dependency array

    useEffect(() => {
        console.log("Effect");
    });

Effect виконується після кожного commit.

Умовно:

    render
      ↓
    commit
      ↓
    Effect

Наступний render:

    render
      ↓
    commit
      ↓
    Effect

---

## 3.2. Порожній dependency array

    useEffect(() => {
        console.log("Effect");
    }, []);

Effect не має dependencies.

У звичайній production-моделі він запускається після першого mount.

У development з `StrictMode` можна побачити додатковий цикл:

    setup
      ↓
    cleanup
      ↓
    setup

Тому `[]` не варто розуміти як:

> "цей код гарантовано виконається рівно один раз за всю програму."

---

## 3.3. Dependency array зі значеннями

    useEffect(() => {
        console.log("Effect");
    }, [userId]);

Effect запускається:

    після mount
        +
    коли userId змінюється

---

# 4. Головна ідея dependencies

Потрібно думати не:

> "Що я хочу додати в масив?"

а:

> "Які реактивні значення використовує цей Effect?"

Наприклад:

    useEffect(() => {
        document.title = `User: ${userName}`;
    }, [userName]);

Effect використовує:

    userName

тому:

    [userName]

є його dependency.

---

# 5. Що таке reactive values

У контексті Effect важливими є значення, які можуть змінюватися між render'ами компонента.

Наприклад:

    props

    state

    variables declared inside component

    functions declared inside component

    objects created inside component

Наприклад:

    function User({ userId }) {
        const [name, setName] = useState("");

        const message = `User: ${name}`;

        // ...
    }

Тут:

    userId
    name
    message

можуть бути пов'язані з Effect.

---

# 6. Props як dependency

Наприклад:

    function User({ userId }) {
        useEffect(() => {
            console.log(userId);
        }, [userId]);

        return <p>User: {userId}</p>;
    }

`userId` приходить через props.

Він є dependency.

Коли parent передає інший `userId`:

    userId = 1

потім:

    userId = 2

Effect запускається знову.

---

# 7. State як dependency

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        useEffect(() => {
            document.title = `Count: ${count}`;
        }, [count]);

        return (
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        );
    }

Dependency:

    count

Потік:

    count = 0
       ↓
    render
       ↓
    Effect

Після click:

    count = 1
       ↓
    render
       ↓
    Effect

---

# 8. Локальна змінна як dependency

Наприклад:

    function User({ firstName, lastName }) {
        const fullName = `${firstName} ${lastName}`;

        useEffect(() => {
            document.title = fullName;
        }, [fullName]);

        return <p>{fullName}</p>;
    }

Тут Effect використовує:

    fullName

тому dependency:

    [fullName]

---

# 9. Необхідно вказувати всі використані dependencies

Наприклад:

    function User({ userId }) {
        const [user, setUser] = useState(null);

        useEffect(() => {
            fetch(`/api/users/${userId}`)
                .then(response => response.json())
                .then(data => setUser(data));
        }, [userId]);

        // ...
    }

Effect використовує:

    userId

тому:

    [userId]

---

# 10. Що буде, якщо dependency пропустити

Поганий приклад:

    function User({ userId }) {
        useEffect(() => {
            fetch(`/api/users/${userId}`);
        }, []);

        // ...
    }

Effect використовує:

    userId

але dependency array:

    []

не відображає цю залежність.

Якщо `userId` зміниться:

    userId = 1
        ↓
    request /api/users/1

потім:

    userId = 2

Effect може не виконатися повторно.

У результаті компонент може залишитися із застарілими даними.

---

# 11. Stale Values

**Stale value** — значення, яке стало застарілим, але код продовжує працювати зі старою версією цього значення.

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        useEffect(() => {
            console.log(count);
        }, []);

        // ...
    }

Effect має:

    []

тому він не реагує на подальші зміни:

    count = 0
    count = 1
    count = 2
    count = 3

Effect не буде повторно виконуватися через `count`.

Якщо Effect повинен реагувати на `count`:

    useEffect(() => {
        console.log(count);
    }, [count]);

---

# 12. Dependency array — не список "коли запускати"

Це важлива концепція.

Не потрібно мислити:

    [count]

як:

> "запускай Effect після зміни count."

Краще:

> "Effect використовує count, тому він залежить від count."

React порівнює dependencies між render'ами.

Якщо dependency змінилася:

    dependency changed
          ↓
    Effect re-runs

---

# 13. Як React визначає, чи змінилася dependency

React порівнює значення dependencies між render'ами.

Для практичної роботи важливо пам'ятати:

> Примітиви порівнюються за значенням, а об'єкти, масиви та функції — за reference identity.

Наприклад:

    10 → 10

не змінилося.

А:

    "hello" → "hello"

також не змінилося.

Але:

    {} → {}

це дві різні object references.

---

# 14. Primitive dependencies

Приклади примітивів:

    string
    number
    boolean
    null
    undefined
    bigint
    symbol

Наприклад:

    useEffect(() => {
        console.log(count);
    }, [count]);

Якщо:

    count: 1 → 1

dependency не змінилася.

Якщо:

    count: 1 → 2

dependency змінилася.

---

# 15. Object dependencies

Розглянемо:

    const user = {
        id: 1,
        name: "John"
    };

Якщо на кожному render створюється новий object:

    const user = {
        id: 1,
        name: "John"
    };

то кожен render створює новий reference.

Навіть якщо дані однакові:

    user1 = { id: 1 }
    user2 = { id: 1 }

то:

    user1 !== user2

---

# 16. Чому об'єкт може викликати повторний Effect

Наприклад:

    function User() {
        const user = {
            id: 1,
            name: "John"
        };

        useEffect(() => {
            console.log(user);
        }, [user]);

        return <p>{user.name}</p>;
    }

При кожному render:

    new object
        ↓
    new reference
        ↓
    dependency changed
        ↓
    Effect runs

Навіть якщо:

    id = 1
    name = "John"

не змінилися.

---

# 17. Аналогічна проблема з масивами

Наприклад:

    const items = [1, 2, 3];

Якщо масив створюється всередині компонента:

    function List() {
        const items = [1, 2, 3];

        useEffect(() => {
            console.log(items);
        }, [items]);

        // ...
    }

кожен render створює новий array reference.

Тому:

    items(previous) !== items(next)

і Effect може запускатися знову.

---

# 18. Аналогічна проблема з функціями

Функція також є object/reference value.

Наприклад:

    function App() {
        function handleMessage() {
            console.log("Hello");
        }

        useEffect(() => {
            console.log(handleMessage);
        }, [handleMessage]);

        // ...
    }

На кожному render функція:

    handleMessage

створюється заново.

Тому reference змінюється.

---

# 19. Reference equality

Потрібно добре розуміти:

    const a = { value: 1 };
    const b = { value: 1 };

    console.log(a === b);

Результат:

    false

Бо:

    a → object #1

    b → object #2

Навіть якщо структура однакова.

---

# 20. Порівняння примітиву та object

Примітив:

    const a = 10;
    const b = 10;

    a === b

Результат:

    true

Object:

    const a = { value: 10 };
    const b = { value: 10 };

    a === b

Результат:

    false

Для dependencies це дуже важливо.

---

# 21. Практичний приклад з object

Погано:

    function Search({ query }) {
        const options = {
            query,
            limit: 10
        };

        useEffect(() => {
            search(options);
        }, [options]);

        // ...
    }

`options` створюється при кожному render.

Тому dependency:

    options

може вважатися зміненою на кожному render.

---

# 22. Краще залежати від primitive values

Наприклад:

    function Search({ query }) {
        const limit = 10;

        useEffect(() => {
            search({
                query,
                limit
            });
        }, [query, limit]);

        // ...
    }

Тепер Effect залежить від:

    query
    limit

а не від нового object.

---

# 23. Ще кращий варіант

Якщо object потрібен тільки всередині Effect:

    function Search({ query }) {
        useEffect(() => {
            const options = {
                query,
                limit: 10
            };

            search(options);
        }, [query]);

        // ...
    }

Тепер:

    options

не є dependency компонента.

Він створюється всередині Effect.

---

# 24. Правило для object dependencies

Якщо object потрібен тільки для роботи Effect:

    useEffect(() => {
        const options = {
            query,
            limit: 10
        };

        search(options);
    }, [query]);

часто краще, ніж:

    const options = {
        query,
        limit: 10
    };

    useEffect(() => {
        search(options);
    }, [options]);

---

# 25. Функції як dependencies

Розглянемо:

    function Chat({ roomId }) {
        function createConnection() {
            return connect(roomId);
        }

        useEffect(() => {
            const connection = createConnection();

            connection.connect();

            return () => {
                connection.disconnect();
            };
        }, [createConnection]);

        // ...
    }

Тут:

    createConnection

створюється під час кожного render.

Тому dependency змінюється.

---

# 26. Як уникнути зайвої function dependency

Якщо функція потрібна тільки Effect, можна перенести її всередину:

    function Chat({ roomId }) {
        useEffect(() => {
            function createConnection() {
                return connect(roomId);
            }

            const connection = createConnection();

            connection.connect();

            return () => {
                connection.disconnect();
            };
        }, [roomId]);

Тепер dependency:

    [roomId]

Це простіше.

---

# 27. useCallback

Інший варіант — `useCallback`.

    const handleMessage = useCallback(() => {
        console.log(message);
    }, [message]);

Тепер React може зберігати ту саму function reference між render'ами, доки dependencies не змінилися.

Потім:

    useEffect(() => {
        subscribe(handleMessage);

        return () => {
            unsubscribe(handleMessage);
        };
    }, [handleMessage]);

`useCallback` буде розглядатися глибше в темі Hooks.

Головне зараз:

> Не використовуй `useCallback` автоматично тільки для того, щоб "заспокоїти" dependency array.

Спочатку перевір, чи можна спростити структуру Effect.

---

# 28. useMemo для object

Аналогічна ситуація може виникнути з object.

Можна використати:

    const options = useMemo(() => {
        return {
            query,
            limit: 10
        };
    }, [query]);

Але `useMemo` теж не потрібно додавати автоматично.

Спочатку запитай:

> Чи справді object повинен бути dependency?

Часто простіше створити object безпосередньо всередині Effect.

---

# 29. Dependency та useMemo/useCallback

Умовно:

    useMemo
        ↓
    stable value

    useCallback
        ↓
    stable function

Але:

    useMemo/useCallback

не повинні використовуватися як перша реакція на погано організований Effect.

Спочатку:

    simplify Effect

і лише потім:

    optimize reference stability

---

# 30. Dependency може бути property

Наприклад:

    useEffect(() => {
        console.log(user.id);
    }, [user.id]);

Якщо Effect використовує тільки:

    user.id

йому не обов'язково залежати від всього:

    [user]

Можна залежати від конкретного primitive value:

    [user.id]

Це часто робить dependency model зрозумілішою.

---

# 31. Object dependency vs property dependency

Наприклад:

    useEffect(() => {
        console.log(user.id);
    }, [user]);

Effect залежить від усього object reference.

Якщо:

    user = new object

навіть із тим самим `id`, Effect може запуститися.

Якщо:

    useEffect(() => {
        console.log(user.id);
    }, [user.id]);

то важливим є саме:

    user.id

---

# 32. Але dependency повинна відповідати логіці

Не можна механічно замінювати:

    [user]

на:

    [user.id]

Якщо Effect використовує:

    user.id
    user.name
    user.email

то він залежить від усіх цих значень.

Наприклад:

    useEffect(() => {
        console.log(
            user.id,
            user.name,
            user.email
        );
    }, [
        user.id,
        user.name,
        user.email
    ]);

Або можна перебудувати код так, щоб dependency model стала простішою.

---

# 33. Functions declared inside component

Наприклад:

    function Component({ value }) {
        function calculate() {
            return value * 2;
        }

        useEffect(() => {
            console.log(calculate());
        }, [calculate]);

        // ...
    }

`calculate` створюється при кожному render.

Тому dependency:

    [calculate]

може змінюватися при кожному render.

Якщо функція потрібна лише Effect:

    function Component({ value }) {
        useEffect(() => {
            function calculate() {
                return value * 2;
            }

            console.log(calculate());
        }, [value]);

        // ...
    }

---

# 34. Functions outside component

Якщо функція не залежить від props/state компонента, її можна винести за межі компонента.

Наприклад:

    function formatUserName(user) {
        return `${user.firstName} ${user.lastName}`;
    }

    function User({ user }) {
        useEffect(() => {
            console.log(formatUserName(user));
        }, [user]);

        // ...
    }

`formatUserName` не створюється заново при кожному render компонента.

Це також може спростити dependency model.

---

# 35. Empty dependency array — особливий випадок

Розглянемо:

    useEffect(() => {
        connect();
    }, []);

Це означає, що Effect не має реактивних dependencies.

Але якщо:

    connect(userId);

то виникає питання:

    userId

Чи повинен Effect залежати від нього?

Якщо так, тоді:

    useEffect(() => {
        connect(userId);
    }, [userId]);

---

# 36. Небезпечна ідея "поставлю []"

Початківець часто бачить проблему:

    Effect запускається занадто часто

і робить:

    []

Це не вирішення проблеми.

Наприклад:

    useEffect(() => {
        fetch(`/api/users/${userId}`);
    }, []);

Тепер Effect не реагує на `userId`.

Проблема не вирішена — dependency просто прихована.

---

# 37. Dependency array не є оптимізацією заради оптимізації

Не треба думати:

    "Чим менше dependencies, тим краще."

Неправильно.

Правильна мета:

> **Dependency array повинна чесно описувати значення, від яких залежить Effect.**

Наприклад:

    useEffect(() => {
        fetch(`/api/users/${userId}`);
    }, [userId]);

Це правильніше, ніж штучно зробити:

    useEffect(() => {
        fetch(`/api/users/${userId}`);
    }, []);

---

# 38. ESLint і dependencies

У React-проєктах linting може перевіряти dependency array.

Наприклад, якщо:

    useEffect(() => {
        console.log(userId);
    }, []);

linter може попередити, що:

    userId

відсутній у dependencies.

Це корисна перевірка.

Вона допомагає знаходити:

- stale closures;
- пропущені dependencies;
- помилки synchronization logic.

---

# 39. Не треба боротися з linter

Якщо linter каже:

    Missing dependency

не потрібно одразу робити:

    // eslint-disable-next-line

Спочатку запитай:

> Чому Effect використовує це значення?

Потім:

> Чи повинно воно бути dependency?

І:

> Чи можна перебудувати Effect так, щоб логіка стала простішою?

---

# 40. Dependency lint warning — сигнал

Наприклад:

    useEffect(() => {
        fetchUser(userId);
    }, []);

Linter говорить:

    userId is missing

Це може означати:

    Effect залежить від userId

Отже:

    useEffect(() => {
        fetchUser(userId);
    }, [userId]);

---

# 41. Не приховуй dependencies через useRef

Іноді розробник намагається зробити:

    const valueRef = useRef(value);

    useEffect(() => {
        console.log(valueRef.current);
    }, []);

Це може бути правильним у спеціальних випадках.

Але не потрібно використовувати `useRef` просто для обходу dependency rules.

`useRef` — окремий інструмент зі своєю семантикою.

---

# 42. Dependency та useRef

Важлива властивість `ref`:

    ref.current

може змінюватися без render.

Тому `ref.current` не працює як звичайна reactive dependency.

Наприклад:

    const valueRef = useRef(0);

    valueRef.current = valueRef.current + 1;

Це не запускає render автоматично.

Тема `useRef` буде розглянута окремо.

---

# 43. Dependency та state setter

React state setter:

    setCount

має стабільну identity.

Наприклад:

    const [count, setCount] = useState(0);

`setCount` не потрібно додавати до dependencies лише тому, що він використовується.

Основна dependency:

    count

---

# 44. Dependency та dispatch

Аналогічно для `useReducer`:

    const [state, dispatch] = useReducer(reducer, initialState);

`dispatch` має стабільну identity.

Зазвичай Effect не потребує:

    [dispatch]

лише через використання `dispatch`.

---

# 45. Dependency та imported functions

Наприклад:

    import { fetchUsers } from "./api";

    useEffect(() => {
        fetchUsers();
    }, []);

Функція, імпортована з іншого модуля, має module-level identity.

Вона не створюється заново при кожному render компонента.

Але якщо функція залежить від значень компонента:

    fetchUsers(userId)

то dependency:

    [userId]

---

# 46. Dependency та context

Якщо значення отримано через:

    const theme = useContext(ThemeContext);

і Effect використовує:

    theme

то `theme` є dependency.

Наприклад:

    useEffect(() => {
        document.body.dataset.theme = theme;
    }, [theme]);

---

# 47. Dependency та props object

Наприклад:

    function Component({ options }) {
        useEffect(() => {
            connect(options);
        }, [options]);

        // ...
    }

Якщо parent створює:

    <Component
        options={{
            theme: "dark"
        }}
    />

то на кожному parent render може створюватися новий object.

У результаті:

    new object
        ↓
    new reference
        ↓
    Effect re-runs

Це одна з причин уважно працювати з object props.

---

# 48. Parent rerender і dependencies

Важливо:

> Parent rerender не означає автоматично, що dependency змінилася.

Наприклад:

    function Child({ userId }) {
        useEffect(() => {
            console.log("Effect");
        }, [userId]);

        return <p>{userId}</p>;
    }

Якщо parent rerender'иться, але:

    userId = 1

залишається:

    1 → 1

то dependency не змінилася.

Effect не повинен запускатися тільки через parent rerender.

---

# 49. Object props змінюють цю картину

Наприклад:

    <Child
        user={{
            id: 1
        }}
    />

При кожному render parent може створювати новий object.

Тоді child отримує:

    user(previous) !== user(next)

і:

    [user]

може спричиняти повторний Effect.

---

# 50. Як мислити про dependency

Для кожного Effect запитай:

### 1.

Що читає Effect?

    props
    state
    local variables
    functions
    context

### 2.

Які з цих значень можуть змінюватися?

### 3.

Чи повинен Effect повторитися при їх зміні?

### 4.

Чи можна спростити Effect?

---

# 51. Приклад повного аналізу

Є:

    function Product({ productId, currency }) {
        const [product, setProduct] = useState(null);

        useEffect(() => {
            fetch(`/api/products/${productId}?currency=${currency}`)
                .then(response => response.json())
                .then(data => {
                    setProduct(data);
                });
        }, [productId, currency]);

        // ...
    }

Що використовує Effect?

    productId
    currency
    setProduct

Reactive dependencies:

    productId
    currency

State setter стабільний.

Тому:

    [productId, currency]

---

# 52. Dependency graph

Можна уявляти Effect як dependency graph:

    productId ─────┐
                   │
                   ↓
                 Effect
                   │
                   ↓
                 fetch()
                   │
                   ↓
                 data
                   │
                   ↓
               setProduct
                   │
                   ↓
                 render

І:

    currency ──────┘

Це допомагає зрозуміти, чому Effect повинен залежати від:

    productId
    currency

---

# 53. Effect dependencies та synchronization

Наприклад:

    useEffect(() => {
        connectToRoom(roomId);
    }, [roomId]);

Ментально:

    roomId
      ↓
    connection

React повинен підтримувати:

    connection ↔ roomId

Коли:

    roomId changes

потрібно:

    disconnect old room
          ↓
    connect new room

Тому dependency є частиною synchronization logic.

---

# 54. Cleanup + dependency

Повний приклад:

    useEffect(() => {
        const connection = connect(roomId);

        connection.connect();

        return () => {
            connection.disconnect();
        };
    }, [roomId]);

При:

    roomId = "general"

маємо:

    connect("general")

Потім:

    roomId = "react"

маємо:

    disconnect("general")
          ↓
    connect("react")

Це один із найкращих прикладів правильного використання dependencies.

---

# 55. Dependency changes

Важливо розрізняти:

    component rerender

і:

    dependency change

Вони не однакові.

Наприклад:

    state A changes
        ↓
      render
        ↓
    dependency B unchanged
        ↓
    Effect B does not rerun

А якщо:

    state B changes
        ↓
      render
        ↓
    dependency B changed
        ↓
    Effect B reruns

---

# 56. Один render — багато Effects

Наприклад:

    function Dashboard({ userId, theme }) {
        useEffect(() => {
            loadUser(userId);
        }, [userId]);

        useEffect(() => {
            document.body.dataset.theme = theme;
        }, [theme]);

        return <DashboardView />;
    }

Якщо зміниться:

    userId

перший Effect запускається.

Якщо зміниться:

    theme

другий Effect запускається.

Це дозволяє незалежно описувати synchronization processes.

---

# 57. Dependency arrays повинні бути стабільними

Нормально:

    useEffect(() => {
        // ...
    }, [userId, theme]);

Не слід робити динамічний dependency array:

    const dependencies = condition
        ? [userId]
        : [userId, theme];

    useEffect(() => {
        // ...
    }, dependencies);

Dependencies мають бути явно описані.

---

# 58. Hooks rules

`useEffect` потрібно викликати:

    на верхньому рівні компонента

Правильно:

    function Component() {
        useEffect(() => {
            // ...
        }, []);

        return <div />;
    }

Не можна:

    function Component({ enabled }) {
        if (enabled) {
            useEffect(() => {
                // ...
            }, []);
        }

        return <div />;
    }

Не можна викликати Hook:

- всередині `if`;
- всередині циклу;
- всередині nested function;
- після умовного `return`.

---

# 59. Умовність повинна бути всередині Effect

Замість:

    if (enabled) {
        useEffect(() => {
            start();
        }, []);
    }

пишемо:

    useEffect(() => {
        if (!enabled) {
            return;
        }

        start();
    }, [enabled]);

Тут Hook завжди викликається в однаковому порядку.

---

# 60. Dependency array та conditional logic

Наприклад:

    useEffect(() => {
        if (!enabled) {
            return;
        }

        connect();
    }, [enabled]);

Коли:

    enabled = false

Effect виконається, але завершиться одразу.

Коли:

    enabled = true

виконається:

    connect()

Якщо є cleanup:

    useEffect(() => {
        if (!enabled) {
            return;
        }

        const connection = connect();

        return () => {
            connection.disconnect();
        };
    }, [enabled]);

---

# 61. Dependency та cleanup

При зміні dependency:

    old dependency
          ↓
    cleanup using old values
          ↓
    new dependency
          ↓
    setup using new values

Наприклад:

    roomId = "general"

    setup("general")

Потім:

    roomId = "react"

    cleanup("general")
        ↓
    setup("react")

Це важлива модель для розуміння Effect.

---

# 62. Не використовуйте stale dependency

Погано:

    useEffect(() => {
        const connection = connect(roomId);

        return () => {
            connection.disconnect();
        };
    }, []);

Тут Effect використовує:

    roomId

але не реагує на його зміни.

Правильно:

    useEffect(() => {
        const connection = connect(roomId);

        return () => {
            connection.disconnect();
        };
    }, [roomId]);

---

# 63. Dependency array як контракт

Можна сприймати dependency array як контракт:

    useEffect(
        synchronization logic,
        dependencies
    );

Наприклад:

    useEffect(() => {
        connect(roomId);
    }, [roomId]);

Контракт:

> "Ця synchronization logic залежить від roomId."

Якщо `roomId` зміниться:

    old synchronization
          ↓
       cleanup
          ↓
    new synchronization

---

# 64. Не додавай зайві dependencies бездумно

Приклад:

    const userId = 10;
    const theme = "dark";

    useEffect(() => {
        fetchUser(userId);
    }, [userId, theme]);

Якщо Effect не використовує:

    theme

то він не є його логічною dependency.

Краще:

    useEffect(() => {
        fetchUser(userId);
    }, [userId]);

---

# 65. Але не видаляй dependency лише для оптимізації

Погано:

    useEffect(() => {
        fetchUser(userId);
    }, []);

тільки тому, що:

> "Я хочу, щоб fetch був один раз."

Якщо Effect концептуально залежить від `userId`, dependency повинна бути:

    [userId]

Якщо потрібна інша поведінка, потрібно змінити дизайн компонента/Effect, а не приховувати dependency.

---

# 66. Правильне питання

Не:

> "Як зробити, щоб Effect запускався рідше?"

А:

> "Коли зовнішня система повинна бути синхронізована?"

Наприклад:

    roomId
      ↓
    WebSocket connection

Тоді:

    [roomId]

є природною dependency.

---

# 67. Dependency та performance

Неправильні dependencies можуть призвести до:

- зайвих API requests;
- зайвих subscriptions;
- повторного створення timer;
- зайвих DOM operations;
- зайвих connection/disconnection;
- зайвих renders через setState.

Але:

> Не потрібно оптимізувати dependencies до того, як правильно побудована логіка Effect.

Спочатку:

    correctness

потім:

    performance

---

# 68. Найчастіша проблема — unstable references

Особливо уважно потрібно ставитися до:

    objects
    arrays
    functions

Наприклад:

    const options = {
        query
    };

    const items = [1, 2, 3];

    function handleClick() {
        // ...
    }

Усе це може отримувати нову reference identity під час render.

---

# 69. Способи вирішення unstable references

Порядок дій:

### 1. Перевірити, чи потрібна ця dependency

Можливо, логіку можна спростити.

### 2. Перенести object/function всередину Effect

    useEffect(() => {
        const options = {
            query
        };

        // ...
    }, [query]);

### 3. Винести незалежну функцію за межі компонента

    function formatData(data) {
        // ...
    }

### 4. Використати useMemo/useCallback

Якщо reference stability дійсно потрібна.

---

# 70. Dependency і useMemo

Наприклад:

    const options = useMemo(() => {
        return {
            query,
            limit: 10
        };
    }, [query]);

Тепер:

    options

зберігає reference, доки:

    query

не зміниться.

Потім:

    useEffect(() => {
        search(options);
    }, [options]);

Це може бути корисним, але не завжди необхідним.

---

# 71. Dependency і useCallback

Наприклад:

    const handleMessage = useCallback(() => {
        console.log(message);
    }, [message]);

Тепер:

    handleMessage

змінюється, коли змінюється:

    message

Можна:

    useEffect(() => {
        subscribe(handleMessage);

        return () => {
            unsubscribe(handleMessage);
        };
    }, [handleMessage]);

---

# 72. Але не потрібно робити так всюди

Не треба:

    useCallback()
    useMemo()
    useRef()

додавати тільки для того, щоб прибрати warning.

Спочатку зрозумій:

    dependency graph

і:

    synchronization logic

Потім оптимізуй, якщо це потрібно.

---

# 73. Dependency і closure

Effect створюється під час конкретного render.

Наприклад:

    render #1
    count = 0
        ↓
    Effect closes over 0

Потім:

    render #2
    count = 1
        ↓
    Effect closes over 1

Потім:

    render #3
    count = 2
        ↓
    Effect closes over 2

Dependency array визначає, коли React повинен синхронізувати Effect із новим render.

---

# 74. Stale closure

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        useEffect(() => {
            const timer = setInterval(() => {
                console.log(count);
            }, 1000);

            return () => {
                clearInterval(timer);
            };
        }, []);

        return (
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        );
    }

Effect із `[]` захоплює початкове:

    count = 0

і interval може продовжувати бачити старе значення.

Це класичний приклад stale closure.

---

# 75. Один із способів вирішення

Якщо Effect повинен реагувати на `count`:

    useEffect(() => {
        const timer = setInterval(() => {
            console.log(count);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [count]);

Тепер при зміні:

    count

відбудеться:

    cleanup old interval
          ↓
    setup new interval

---

# 76. Інший спосіб — functional state update

Якщо Effect повинен змінювати state на основі попереднього state, часто можна використати functional updater.

Наприклад:

    setCount(previousCount => previousCount + 1);

Це дозволяє не залежати від поточного `count` у callback так само, як при прямому:

    setCount(count + 1);

Ця техніка особливо корисна для timers і callbacks.

---

# 77. Приклад timer без зайвої залежності

    function Counter() {
        const [count, setCount] = useState(0);

        useEffect(() => {
            const timerId = setInterval(() => {
                setCount(previousCount => previousCount + 1);
            }, 1000);

            return () => {
                clearInterval(timerId);
            };
        }, []);

        return <p>{count}</p>;
    }

Тут interval не залежить від поточного:

    count

для операції increment.

Тому:

    []

може бути правильною dependency model.

---

# 78. Але читання count — інша ситуація

Якщо потрібно:

    console.log(count);

то Effect використовує:

    count

і потрібно подумати, як саме має працювати synchronization.

Наприклад:

    useEffect(() => {
        console.log(count);
    }, [count]);

Це чесно описує dependency.

---

# 79. Dependency та "останнє значення"

Іноді потрібно отримати latest value без повторного запуску Effect.

Для таких сценаріїв можуть використовуватися:

    useRef

або сучасні спеціальні patterns.

Але це вже окрема тема.

Головне зараз:

> Не прибирай dependency просто тому, що хочеш отримати "latest value".

Спочатку зрозумій synchronization model.

---

# 80. Effect dependencies та cleanup — разом

Найкращий спосіб навчитися dependencies — дивитися на пару:

    dependency
        +
    setup
        +
    cleanup

Наприклад:

    useEffect(() => {
        const connection = connect(roomId);

        return () => {
            connection.disconnect();
        };
    }, [roomId]);

Dependency:

    roomId

Setup:

    connect(roomId)

Cleanup:

    disconnect()

Це повна synchronization model.

---

# 81. Практична схема

    props / state
          │
          ↓
    dependency changed?
       │          │
      NO         YES
       │          │
       ↓          ↓
   nothing     cleanup old
                  │
                  ↓
              setup new

---

# 82. Dependency array — коротко

### Без array

    useEffect(() => {
        // ...
    });

    → після кожного commit

### `[]`

    useEffect(() => {
        // ...
    }, []);

    → без reactive dependencies

### `[value]`

    useEffect(() => {
        // ...
    }, [value]);

    → після mount + коли value змінилося

### `[a, b]`

    useEffect(() => {
        // ...
    }, [a, b]);

    → після mount + коли змінився a або b

---

# 83. Приклад з двома dependencies

    useEffect(() => {
        document.title = `${firstName} ${lastName}`;
    }, [firstName, lastName]);

Dependency graph:

    firstName ───┐
                 ├──→ Effect
    lastName ────┘

Якщо зміниться:

    firstName

Effect запускається.

Якщо зміниться:

    lastName

Effect запускається.

Якщо не змінилося ні те, ні інше:

    Effect не запускається тільки через цей render.

---

# 84. Приклад з трьома dependencies

    useEffect(() => {
        fetch(
            `/api/products/${categoryId}?sort=${sort}&page=${page}`
        );
    }, [categoryId, sort, page]);

Effect залежить від:

    categoryId
    sort
    page

Зміна будь-якої з них вимагає нової synchronization.

---

# 85. Effect dependency checklist

Перед завершенням Effect перевір:

    [ ] Які props використовує Effect?

    [ ] Які state використовує Effect?

    [ ] Які локальні reactive values використовує Effect?

    [ ] Які functions використовує Effect?

    [ ] Які objects / arrays використовує Effect?

    [ ] Чи всі необхідні dependencies вказані?

    [ ] Чи є зайві dependencies?

    [ ] Чи можна перенести object/function всередину Effect?

    [ ] Чи потрібен cleanup?

    [ ] Чи не створює Effect infinite loop?

---

# 86. Алгоритм написання Effect

## Крок 1

Спочатку сформулюй:

> Що я хочу синхронізувати?

Наприклад:

    React state
        ↓
    document.title

---

## Крок 2

Напиши Effect:

    useEffect(() => {
        document.title = title;
    }, [title]);

---

## Крок 3

Знайди dependencies.

Запитай:

    Які значення використовує Effect?

Відповідь:

    title

---

## Крок 4

Додай cleanup, якщо створюється ресурс.

Наприклад:

    useEffect(() => {
        const timerId = setInterval(...);

        return () => {
            clearInterval(timerId);
        };
    }, []);

---

## Крок 5

Перевір StrictMode.

Effect повинен нормально переживати:

    setup
      ↓
    cleanup
      ↓
    setup

---

# 87. Практичний приклад — Chat Room

    function ChatRoom({ roomId }) {
        useEffect(() => {
            const connection = createConnection(roomId);

            connection.connect();

            return () => {
                connection.disconnect();
            };
        }, [roomId]);

        return <h1>Room: {roomId}</h1>;
    }

Логіка:

    roomId = "general"

    connect("general")

Потім:

    roomId = "react"

    disconnect("general")
          ↓
    connect("react")

Потім component unmount:

    disconnect("react")

Це ідеальний приклад:

    dependency
        +
    synchronization
        +
    cleanup

---

# 88. Практичний приклад — document title

    function Counter() {
        const [count, setCount] = useState(0);

        useEffect(() => {
            document.title = `Count: ${count}`;
        }, [count]);

        return (
            <button onClick={() => {
                setCount(
                    previousCount => previousCount + 1
                );
            }}>
                Count: {count}
            </button>
        );
    }

Dependency:

    count

External system:

    document.title

---

# 89. Практичний приклад — resize

    function WindowWidth() {
        const [width, setWidth] = useState(
            window.innerWidth
        );

        useEffect(() => {
            function handleResize() {
                setWidth(window.innerWidth);
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

        return <p>{width}px</p>;
    }

Dependency:

    []

External system:

    window

Resource:

    resize listener

Cleanup:

    removeEventListener()

---

# 90. Практичний приклад — API

    function User({ userId }) {
        const [user, setUser] = useState(null);

        useEffect(() => {
            async function loadUser() {
                const response = await fetch(
                    `/api/users/${userId}`
                );

                const data = await response.json();

                setUser(data);
            }

            loadUser();
        }, [userId]);

        if (!user) {
            return <p>Loading...</p>;
        }

        return <p>{user.name}</p>;
    }

Dependency:

    userId

External system:

    API

State update:

    setUser(data)

---

# 91. Найважливіші помилки

### Помилка 1

    useEffect(() => {
        setFullName(`${firstName} ${lastName}`);
    }, [firstName, lastName]);

Для derived value Effect не потрібен.

---

### Помилка 2

    useEffect(() => {
        fetch(`/api/users/${userId}`);
    }, []);

Пропущено:

    userId

---

### Помилка 3

    useEffect(() => {
        setCount(count + 1);
    }, [count]);

Можливий infinite loop.

---

### Помилка 4

    const options = {
        query
    };

    useEffect(() => {
        search(options);
    }, [options]);

`options` може створюватися заново на кожному render.

---

### Помилка 5

    useEffect(async () => {
        // ...
    }, []);

`async` callback повертає Promise замість cleanup function.

---

### Помилка 6

    useEffect(() => {
        window.addEventListener("resize", handleResize);
    }, []);

Відсутній cleanup.

---

# 92. Що потрібно знати Junior Developer

Потрібно впевнено розуміти:

    useEffect()

    dependency array

    []

    [value]

    [a, b]

    cleanup

    stale values

    object references

    function references

    event handler vs Effect

    derived data vs Effect

    infinite loops

    StrictMode

---

# 93. Що потрібно знати далі

Після цієї теми варто окремо вивчити:

    useEffect
        ↓
    cleanup
        ↓
    useRef
        ↓
    useMemo
        ↓
    useCallback
        ↓
    custom hooks

Особливо важливо:

    object identity
    function identity
    closures
    stale values
    synchronization

---

# 94. Interview Questions

### Що таке dependency array?

Масив значень, від яких залежить Effect. React порівнює dependencies між render'ами і повторно запускає Effect, якщо потрібні значення змінилися.

---

### Що означає `[]`?

Effect не має reactive dependencies.

У production він не повторюється через зміни props/state.

У development з `StrictMode` можливий додатковий setup → cleanup → setup.

---

### Що відбувається без dependency array?

Effect запускається після кожного commit.

---

### Чому не можна просто завжди використовувати `[]`?

Тому що Effect може залежати від props/state.

Приховування dependency може призвести до stale values та неправильної synchronization.

---

### Чому object може спричиняти повторний Effect?

Тому що objects порівнюються за reference identity.

Новий object:

    {} !== {}

навіть якщо його поля однакові.

---

### Чому function може спричиняти повторний Effect?

Функція, створена всередині компонента, зазвичай отримує нову reference identity під час кожного render.

---

### Як уникнути зайвої object dependency?

Часто можна створити object всередині Effect:

    useEffect(() => {
        const options = {
            query
        };

        search(options);
    }, [query]);

---

### Як уникнути зайвої function dependency?

Часто можна перенести функцію всередину Effect або винести незалежну функцію за межі компонента.

---

### Чи треба використовувати useMemo/useCallback для кожної dependency?

Ні.

Спочатку потрібно правильно побудувати synchronization logic.

---

### Чим відрізняється rerender від dependency change?

Component може rerender'итися, але конкретна dependency може залишитися незмінною.

---

# 95. Міні-шпаргалка

    useEffect(() => {
        // setup
    }, []);

    ↓

    Effect without reactive dependencies


    useEffect(() => {
        // setup
    }, [value]);

    ↓

    mount + value changes


    useEffect(() => {
        // setup
    });

    ↓

    every commit


    useEffect(() => {
        // setup

        return () => {
            // cleanup
        };
    }, [value]);

    ↓

    value changes:
        cleanup
        ↓
        setup

    unmount:
        cleanup

---

# 96. Головна ментальна модель

Не думай:

    useEffect(() => {
        ...
    }, [dependencies]);

як про:

> "Код, який React запускає коли щось змінилося."

Думай:

> **"Це synchronization process, який залежить від певних reactive values."**

Наприклад:

    roomId
      ↓
    WebSocket connection

    theme
      ↓
    localStorage

    count
      ↓
    document.title

    userId
      ↓
    API request

---

# 97. Найголовніше правило

> **Dependencies повинні описувати те, від чого Effect логічно залежить, а не те, як змусити Effect запускатися якомога рідше.**

Правильно:

    useEffect(() => {
        connect(roomId);

        return () => {
            disconnect(roomId);
        };
    }, [roomId]);

Неправильно:

    useEffect(() => {
        connect(roomId);
    }, []);

тільки тому, що хочеться запустити код один раз.

---

# 98. Фінальна схема

    ┌─────────────────────────────────┐
    │       PROPS / STATE / CONTEXT   │
    └────────────────┬────────────────┘
                     │
                     ↓
                  RENDER
                     │
                     ↓
                   COMMIT
                     │
                     ↓
                   EFFECT
                     │
                     ↓
              ┌──────┴───────┐
              │              │
        dependencies       external
          changed?          system
              │              │
              ↓              ↓
          re-sync        API / DOM /
              │           Timer /
              │           Events /
              │           WebSocket
              │
              ↓
           cleanup
              │
              ↓
        new setup

---

# 99. Що потрібно винести з теми

1. **Dependency array описує залежності Effect.**

2. **Effect повинен чесно відображати свої reactive dependencies.**

3. **`[]` не є універсальним способом "запустити один раз".**

4. **Без dependency array Effect запускається після кожного commit.**

5. **Примітиви порівнюються за значенням.**

6. **Objects, arrays і functions — за reference identity.**

7. **Новий object з тими самими даними все одно може бути новою dependency.**

8. **Функція, створена всередині компонента, може змінювати reference на кожному render.**

9. **Stale values часто виникають через неправильну dependency model.**

10. **Не використовуй `useEffect` для звичайних обчислень.**

11. **Не використовуй Effect замість event handler.**

12. **Не приховуй dependencies тільки для того, щоб Effect запускався рідше.**

13. **Cleanup і dependencies працюють разом.**

14. **При зміні dependency старий synchronization process повинен бути очищений перед новим setup, якщо Effect має cleanup.**

15. **Спочатку правильність synchronization logic, потім оптимізація.**

16. **`useMemo` і `useCallback` — інструменти, а не спосіб "лікувати" будь-який dependency warning.**

17. **Найкращий Effect — простий Effect із чіткою synchronization responsibility.**

---

# 100. Головна формула

    EFFECT

        =
    
    synchronization logic

        +

    dependencies

        +

    cleanup (якщо потрібен)


    Dependency:

        "Від чого залежить synchronization?"


    Effect:

        "Що потрібно синхронізувати?"


    Cleanup:

        "Що потрібно прибрати перед
         наступною synchronization
         або unmount?"

---

# 101. Підсумок

У сучасному React потрібно навчитися бачити Effect не як:

    "функцію, яка виконується після render"

а як:

    "опис synchronization process
     між React та зовнішньою системою".

Dependencies тоді стають природними.

Наприклад:

    userId
      ↓
    fetch user
      ↓
    [userId]

або:

    roomId
      ↓
    WebSocket
      ↓
    [roomId]

або:

    theme
      ↓
    localStorage
      ↓
    [theme]

або:

    count
      ↓
    document.title
      ↓
    [count]

Тобто:

    dependency
        ↓
    synchronization
        ↓
    external system

Саме така модель допомагає правильно писати `useEffect`, уникати stale values, зайвих запусків, infinite loops і більшості типових помилок із dependency array.