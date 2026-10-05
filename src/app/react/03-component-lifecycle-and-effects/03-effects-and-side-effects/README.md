# React — Component Lifecycle and Effects

## 03. Effects and Side Effects

**Шлях:**

    `react/03-component-lifecycle-and-effects/03-effects-and-side-effects`

---

# 1. Що таке Effect

**Effect (ефект)** — це код, який виконується **після того, як React оновив UI**, щоб синхронізувати компонент із чимось зовнішнім щодо React.

У React компоненти мають бути максимально **чистими**:

    props/state → JSX → UI

Але реальні застосунки повинні взаємодіяти з речами, які знаходяться за межами React:

- API;
- браузерним DOM;
- `localStorage`;
- таймерами;
- підписками;
- WebSocket;
- сторонніми бібліотеками;
- подіями браузера;
- медіаелементами;
- геолокацією;
- зовнішніми системами.

Саме для таких випадків використовуються **Effects**.

Основний інструмент:

    useEffect()

---

# 2. Side Effect — побічний ефект

**Side effect** — це дія, яка змінює щось за межами самої функції компонента або взаємодіє із зовнішнім світом.

Наприклад:

    document.title = "Hello";

    localStorage.setItem("theme", "dark");

    setTimeout(() => {
        console.log("Done");
    }, 1000);

    fetch("/api/users");

    window.addEventListener("resize", handleResize);

Це не просто обчислення значення.

Вони взаємодіють із:

    browser
        ↓
    DOM
    localStorage
    network
    timers
    events
    external libraries

---

# 3. Чому side effects не повинні виконуватися під час render

Функція компонента повинна бути **pure**.

Тобто при однакових:

    props
    +
    state

вона повинна повертати однаковий JSX.

Правильно:

    function User({ name }) {
        const message = `Hello, ${name}`;

        return <h1>{message}</h1>;
    }

Тут немає side effect.

А ось так робити не слід:

    function User({ name }) {
        document.title = name;

        return <h1>{name}</h1>;
    }

Чому?

React може виконати render більше одного разу.

Render може:

- повторитися;
- бути перерваний;
- бути виконаний ще раз;
- не завершитися commit'ом.

Тому render не повинен залежати від побічних ефектів.

---

# 4. Правило

> **Render повинен обчислювати UI. Effect повинен синхронізувати UI з зовнішнім світом.**

Ментальна модель:

    Render:
    props + state
          ↓
        JSX
          ↓
         UI

    Effect:
    UI / state / props
          ↓
    зовнішня система

---

# 5. useEffect

`useEffect` — React Hook для виконання side effects.

Базовий синтаксис:

    import { useEffect } from "react";

    useEffect(() => {
        // side effect
    });

Форма:

    useEffect(setup);

або:

    useEffect(setup, dependencies);

---

# 6. Найпростіший приклад

    import { useEffect } from "react";

    function App() {
        useEffect(() => {
            console.log("Effect executed");

        });

        return <h1>Hello React</h1>;
    }

Тут effect виконується після commit.

Але без dependency array він буде запускатися після кожного commit компонента.

---

# 7. Dependency Array

Найважливіша частина `useEffect` — **dependencies**.

Синтаксис:

    useEffect(() => {
        // effect
    }, [dependencies]);

Наприклад:

    useEffect(() => {
        console.log("Effect");
    }, []);

Або:

    useEffect(() => {
        console.log(userId);
    }, [userId]);

Dependency array повідомляє React:

> "Коли потрібно повторно виконати цей Effect?"

---

# 8. Три основні варіанти useEffect

Є три основні форми.

## 8.1. Без dependency array

    useEffect(() => {
        console.log("Effect");
    });

Effect запускається після кожного commit.

Умовно:

    render
      ↓
    commit
      ↓
    effect

Після наступного оновлення:

    render
      ↓
    commit
      ↓
    effect

І так далі.

---

# 9. Effect з порожнім dependency array

    useEffect(() => {
        console.log("Effect");
    }, []);

У нормальній production-моделі effect запускається після першого mount.

Умовно:

    mount
      ↓
    commit
      ↓
    effect

Це часто використовують для:

- початкового підключення;
- завантаження даних;
- підписки;
- встановлення listener;
- синхронізації із зовнішньою системою.

Але важливо:

> `[]` не означає "запустити один раз за все життя програми".

Це означає:

> Effect не залежить від реактивних значень компонента і не має повторно запускатися через зміни dependencies.

У development з `StrictMode` можна побачити додатковий setup → cleanup → setup. Це нормальна перевірка React.

---

# 10. Effect із dependency

    useEffect(() => {
        console.log("User changed");
    }, [userId]);

Effect запускається:

1. після першого mount;
2. коли змінюється `userId`.

Наприклад:

    userId = 1

    ↓

    Effect

Потім:

    userId = 2

    ↓

    Effect

Якщо:

    userId = 2

і компонент оновився через іншу причину, але `userId` залишився `2`, цей effect не повинен повторно запускатися лише через цей effect.

---

# 11. Що таке dependency

Dependency — це значення, від якого залежить код Effect.

Наприклад:

    useEffect(() => {
        document.title = `User: ${userName}`;
    }, [userName]);

Тут:

    userName

є dependency.

Якщо `userName` змінюється:

    userName
        ↓
    Effect запускається знову

---

# 12. Effect повинен містити код, який залежить від dependencies

Наприклад:

    useEffect(() => {
        document.title = `Count: ${count}`;
    }, [count]);

Effect залежить від:

    count

Тому:

    [count]

є правильною dependency.

---

# 13. Не слід приховувати dependency

Поганий приклад:

    useEffect(() => {
        document.title = `Count: ${count}`;
    }, []);

Тут Effect використовує:

    count

але dependency array говорить React:

    []

Тобто dependency не вказана.

Це може призвести до роботи зі **stale value**.

---

# 14. Stale Value

**Stale value** — це застаріле значення, яке Effect "бачить" через неправильні dependencies або замикання.

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        useEffect(() => {
            console.log(count);
        }, []);

        return (
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        );
    }

Effect із `[]` не буде реагувати на подальші зміни `count`.

Для effect, який повинен реагувати на `count`, потрібно:

    useEffect(() => {
        console.log(count);
    }, [count]);

---

# 15. Effect і Closure

Effect створюється всередині конкретного render.

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        useEffect(() => {
            console.log(count);
        }, [count]);

        // ...
    }

Кожен render має своє значення:

    render #1 → count = 0

    render #2 → count = 1

    render #3 → count = 2

Effect бачить значення того render, у якому він був створений.

Це пов'язано з JavaScript **closures**.

---

# 16. Effect — не "магічний lifecycle method"

У старих class components були:

    componentDidMount()
    componentDidUpdate()
    componentWillUnmount()

У function components немає потреби безпосередньо мислити такими методами.

Замість цього React пропонує:

    render
      ↓
    commit
      ↓
    effect

Effect описує не просто:

> "Я зараз на етапі update".

Краще мислити:

> "Я хочу синхронізувати компонент із зовнішньою системою."

Це дуже важлива сучасна модель React.

---

# 17. Effect як synchronization

Наприклад, компонент повинен змінювати title документа.

    useEffect(() => {
        document.title = `Count: ${count}`;
    }, [count]);

Ми не думаємо:

    "Коли componentDidUpdate?"

Ми думаємо:

    "Документ повинен бути синхронізований з count."

Тобто:

    count
      ↓
    Effect
      ↓
    document.title

---

# 18. Коли потрібен Effect

Effect може бути потрібний, якщо потрібно синхронізувати React з:

### Browser API

    document.title
    window
    navigator
    localStorage

### Network

    fetch()
    WebSocket

### Timers

    setTimeout()
    setInterval()

### Event listeners

    window.addEventListener()

### External libraries

    map library
    chart library
    video player
    third-party widget

### External systems

    subscriptions
    browser APIs
    services

---

# 19. Приклад — document.title

    import { useEffect, useState } from "react";

    function Counter() {
        const [count, setCount] = useState(0);

        useEffect(() => {
            document.title = `Count: ${count}`;
        }, [count]);

        return (
            <button onClick={() => setCount(count + 1)}>
                Count: {count}
            </button>
        );
    }

Потік:

    count = 0
       ↓
    render
       ↓
    commit
       ↓
    Effect
       ↓
    document.title = "Count: 0"

Після click:

    count = 1
       ↓
    render
       ↓
    commit
       ↓
    Effect
       ↓
    document.title = "Count: 1"

---

# 20. Приклад — timer

    import { useEffect } from "react";

    function Timer() {
        useEffect(() => {
            const timerId = setInterval(() => {
                console.log("Tick");
            }, 1000);

            return () => {
                clearInterval(timerId);
            };
        }, []);

        return <p>Timer</p>;
    }

Тут є:

    setup
      ↓
    setInterval()

і cleanup:

    cleanup
      ↓
    clearInterval()

Це важливо, тому що timer є зовнішнім ресурсом.

---

# 21. Cleanup Function

Effect може повернути функцію cleanup.

Синтаксис:

    useEffect(() => {
        // setup

        return () => {
            // cleanup
        };
    }, []);

Наприклад:

    useEffect(() => {
        const timerId = setInterval(() => {
            console.log("Tick");
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

---

# 22. Setup → Cleanup

Ментальна модель:

    Effect
      ↓
    setup
      ↓
    external resource
      ↓
    cleanup

Наприклад:

    setup:
    addEventListener()

    cleanup:
    removeEventListener()

Або:

    setup:
    setInterval()

    cleanup:
    clearInterval()

Або:

    setup:
    subscribe()

    cleanup:
    unsubscribe()

---

# 23. Навіщо потрібен cleanup

Якщо створити ресурс і не прибрати його, можуть виникнути проблеми:

- memory leaks;
- дублювання listeners;
- кілька timer'ів;
- зайві network connections;
- неправильні subscriptions;
- оновлення вже неактуального компонента.

Наприклад, небезпечно:

    useEffect(() => {
        window.addEventListener("resize", handleResize);
    }, []);

Потрібно прибрати listener:

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

---

# 24. Effect з event listener

Повний приклад:

    import { useEffect, useState } from "react";

    function WindowWidth() {
        const [width, setWidth] = useState(window.innerWidth);

        useEffect(() => {
            function handleResize() {
                setWidth(window.innerWidth);
            }

            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }, []);

        return <p>Width: {width}px</p>;
    }

Логіка:

    mount
      ↓
    addEventListener()

    component працює
      ↓
    resize
      ↓
    setWidth()

    unmount
      ↓
    removeEventListener()

---

# 25. Cleanup при зміні dependency

Cleanup виконується не тільки при unmount.

Він також виконується перед повторним запуском Effect, якщо його dependencies змінилися.

Наприклад:

    useEffect(() => {
        console.log("Connect:", roomId);

        return () => {
            console.log("Disconnect:", roomId);
        };
    }, [roomId]);

Якщо:

    roomId = "room-1"

буде:

    setup room-1

Потім `roomId` змінюється:

    roomId = "room-2"

React концептуально виконає:

    cleanup room-1
        ↓
    setup room-2

Це особливо важливо для subscriptions та connections.

---

# 26. Effect як ресурс

Корисно мислити Effect як пару:

    START
      +
    STOP

Наприклад:

    subscribe()
      +
    unsubscribe()

або:

    connect()
      +
    disconnect()

або:

    addEventListener()
      +
    removeEventListener()

або:

    setInterval()
      +
    clearInterval()

Хороший Effect зазвичай має зрозумілу пару setup/cleanup.

---

# 27. Effect не повинен містити все підряд

Погано:

    useEffect(() => {
        // API request
        // localStorage
        // timer
        // event listener
        // analytics
        // DOM manipulation
    }, []);

Краще розділяти незалежні synchronization processes.

Наприклад:

    useEffect(() => {
        // subscription
    }, [userId]);

    useEffect(() => {
        // document title
    }, [title]);

    useEffect(() => {
        // timer
    }, []);

Один Effect — одна логічна synchronization responsibility.

---

# 28. Не все потрібно робити через useEffect

Це одна з найважливіших речей у React.

Якщо значення можна обчислити під час render, Effect не потрібен.

Погано:

    function User({ firstName, lastName }) {
        const [fullName, setFullName] = useState("");

        useEffect(() => {
            setFullName(`${firstName} ${lastName}`);
        }, [firstName, lastName]);

        return <p>{fullName}</p>;
    }

Тут створено зайвий state та Effect.

Краще:

    function User({ firstName, lastName }) {
        const fullName = `${firstName} ${lastName}`;

        return <p>{fullName}</p>;
    }

Бо:

    firstName + lastName
            ↓
        fullName
            ↓
           JSX

Це звичайне обчислення.

---

# 29. Derived Data ≠ Effect

**Derived data** — дані, які можна отримати з props/state.

Наприклад:

    const fullName = `${firstName} ${lastName}`;

    const total = price * quantity;

    const isAdult = age >= 18;

    const filteredUsers = users.filter(
        user => user.active
    );

Для цього не потрібен `useEffect`.

---

# 30. Поганий шаблон: state → Effect → state

Часто початківці пишуть:

    const [fullName, setFullName] = useState("");

    useEffect(() => {
        setFullName(`${firstName} ${lastName}`);
    }, [firstName, lastName]);

Це створює зайвий цикл:

    props
      ↓
    render
      ↓
    effect
      ↓
    setState
      ↓
    render

Якщо значення можна отримати безпосередньо:

    props
      ↓
    calculation
      ↓
    JSX

це простіше і правильніше.

---

# 31. Коли Effect дійсно потрібен

Порівняймо.

### Не потрібен:

    const fullName = `${firstName} ${lastName}`;

### Потрібен:

    useEffect(() => {
        document.title = fullName;
    }, [fullName]);

Чому?

`fullName` — внутрішнє обчислення React.

`document.title` — зовнішня система браузера.

Отже:

    internal calculation
        ↓
    no Effect

    React
        ↓
    external system
        ↓
    Effect

---

# 32. Effect і API

Effect часто використовується для network request.

Наприклад:

    import { useEffect, useState } from "react";

    function Users() {
        const [users, setUsers] = useState([]);

        useEffect(() => {
            fetch("/api/users")
                .then(response => response.json())
                .then(data => {
                    setUsers(data);
                });
        }, []);

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

Потік:

    mount
      ↓
    Effect
      ↓
    fetch()
      ↓
    response
      ↓
    setUsers()
      ↓
    render
      ↓
    UI

---

# 33. Важливо: Effect не робить fetch синхронним

`fetch()` асинхронний.

Тому:

    useEffect(() => {
        fetch("/api/users");
    }, []);

не означає:

    "React чекає на fetch".

React продовжує працювати.

Коли Promise завершиться:

    response
      ↓
    setState
      ↓
    re-render

---

# 34. Async function у useEffect

Не варто робити:

    useEffect(async () => {
        const response = await fetch("/api/users");
        // ...
    }, []);

Причина: callback `useEffect` повинен повертати:

    nothing

або:

    cleanup function

а `async` function повертає:

    Promise

Краще:

    useEffect(() => {
        async function loadUsers() {
            const response = await fetch("/api/users");
            const data = await response.json();

            setUsers(data);
        }

        loadUsers();
    }, []);

Або:

    useEffect(() => {
        fetch("/api/users")
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            });
    }, []);

---

# 35. Effect і race conditions

При запитах до API потрібно враховувати ситуацію, коли dependency змінюється швидше, ніж приходять відповіді.

Наприклад:

    userId = 1
      ↓
    request A

Потім:

    userId = 2
      ↓
    request B

Можливо:

    request B завершився першим
    request A завершився другим

Тоді старі дані можуть перезаписати нові.

Для реальних API запитів потрібно враховувати cancellation / stale responses.

Один із підходів:

    useEffect(() => {
        const controller = new AbortController();

        async function loadUser() {
            const response = await fetch(
                `/api/users/${userId}`,
                {
                    signal: controller.signal
                }
            );

            const data = await response.json();

            setUser(data);
        }

        loadUser();

        return () => {
            controller.abort();
        };
    }, [userId]);

Це вже важливий практичний аспект роботи з Effect.

---

# 36. Effect і localStorage

Наприклад, потрібно зберігати тему:

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

Потік:

    theme
      ↓
    change
      ↓
    render
      ↓
    commit
      ↓
    Effect
      ↓
    localStorage

Тут Effect виправданий, тому що:

    React state
        ↓
    external browser storage

---

# 37. Читання localStorage

Якщо значення потрібно отримати при ініціалізації state, часто можна зробити це без Effect:

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") ?? "light";
    });

А Effect використовувати для синхронізації:

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

Тобто:

    localStorage
        ↓
    initial state

і:

    state
      ↓
    localStorage

це дві різні задачі.

---

# 38. Effect і DOM

React зазвичай сам керує DOM.

Тому не потрібно вручну змінювати DOM без причини.

Погано:

    document.querySelector("#title").textContent = "Hello";

якщо той самий UI можна описати JSX:

    return <h1>Hello</h1>;

Але існують випадки, коли потрібно взаємодіяти з DOM або browser API.

Наприклад:

- focus;
- scroll;
- measurement;
- third-party DOM library.

Для цього можуть використовуватися:

    useEffect()

або, у випадках коли потрібно виконати код до paint:

    useLayoutEffect()

`useLayoutEffect` буде розглядатися окремо.

---

# 39. Effect і стороння бібліотека

Наприклад, є зовнішня бібліотека:

    const chart = new Chart(...);

React повинен синхронізувати її з компонентом.

Концептуально:

    useEffect(() => {
        const chart = createChart(container, data);

        return () => {
            chart.destroy();
        };
    }, [data]);

React відповідає за lifecycle компонента.

Effect відповідає за синхронізацію із зовнішньою бібліотекою.

---

# 40. Effect і subscription

Наприклад:

    useEffect(() => {
        const unsubscribe = subscribeToMessages(
            handleMessage
        );

        return () => {
            unsubscribe();
        };
    }, []);

Модель:

    mount
      ↓
    subscribe

    component active
      ↓
    receive messages

    unmount
      ↓
    unsubscribe

---

# 41. Effect і StrictMode

У development React `StrictMode` може навмисно виконувати додаткову перевірку Effects.

Можна побачити:

    setup
      ↓
    cleanup
      ↓
    setup

Це може виглядати дивно.

Але мета:

> перевірити, чи правильно Effect вміє встановлювати та очищати зовнішні ресурси.

Наприклад, якщо код:

    useEffect(() => {
        window.addEventListener("resize", handleResize);
    }, []);

не має cleanup, StrictMode може допомогти побачити проблему.

Правильно:

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

---

# 42. StrictMode не означає подвійний production Effect

Не потрібно робити висновок:

    "React завжди запускає Effect двічі."

Це development-поведінка `StrictMode`.

Її мета — виявлення проблем.

Production-поведінка інша.

---

# 43. Effect повинен бути resilient

Хороший Effect повинен нормально переживати цикл:

    setup
      ↓
    cleanup
      ↓
    setup

Якщо це ламає програму, часто це сигнал, що cleanup неповний або Effect неправильно організований.

---

# 44. Side Effect під час event handler

Не кожна зовнішня дія повинна бути Effect.

Наприклад, користувач натиснув кнопку:

    function Form() {
        function handleSubmit() {
            console.log("Submit");
        }

        return (
            <button onClick={handleSubmit}>
                Submit
            </button>
        );
    }

Тут `console.log` пов'язаний із конкретною подією користувача.

Йому не потрібен `useEffect`.

---

# 45. Event handler vs Effect

Важлива різниця.

### Event handler

Код виконується через:

    user action

Наприклад:

    click
    submit
    change

### Effect

Код виконується через:

    render / state / props
        ↓
    synchronization

Наприклад:

    count changes
        ↓
    update document.title

---

# 46. Не потрібно переносити event logic в Effect

Погано:

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (submitted) {
            sendAnalytics();
        }
    }, [submitted]);

Якщо `sendAnalytics()` є прямою реакцією на submit, краще:

    function handleSubmit() {
        sendAnalytics();
        // submit logic
    }

    return (
        <form onSubmit={handleSubmit}>
            ...
        </form>
    );

Тут подія вже є достатньою причиною для виконання коду.

---

# 47. Effect — не заміна event handler

Запам'ятати:

    User interaction
        ↓
    Event handler

    State/props → external synchronization
        ↓
    Effect

---

# 48. Effect і derived state

Не потрібно:

    useEffect(() => {
        setTotal(price * quantity);
    }, [price, quantity]);

Краще:

    const total = price * quantity;

Effect потрібен, якщо результат потрібно синхронізувати із зовнішнім світом:

    useEffect(() => {
        localStorage.setItem(
            "cart-total",
            String(total)
        );
    }, [total]);

---

# 49. Effect і infinite loop

Небезпечний шаблон:

    useEffect(() => {
        setCount(count + 1);
    }, [count]);

Потік:

    count changes
        ↓
    Effect
        ↓
    setCount()
        ↓
    count changes
        ↓
    Effect
        ↓
    setCount()
        ↓
    ...

Це створює нескінченний цикл оновлень.

Тому потрібно розуміти:

> Effect, який змінює state, повинен мати чітку причину.

---

# 50. Не кожен setState всередині Effect є помилкою

Наприклад:

    useEffect(() => {
        fetch("/api/users")
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            });
    }, []);

Тут `setUsers` є результатом зовнішньої операції:

    API
      ↓
    data
      ↓
    setUsers
      ↓
    UI

Це нормальний сценарій.

Проблема виникає, коли Effect використовується лише для обчислення того, що можна було обчислити під час render.

---

# 51. Основний принцип Effects

Запитай себе:

> "Я синхронізую React з чимось зовнішнім?"

Якщо:

    НІ

спочатку перевір:

- чи потрібен state;
- чи можна обчислити значення під час render;
- чи потрібен event handler.

Якщо:

    ТАК

`useEffect` може бути правильним інструментом.

---

# 52. Приклад: що робити без Effect

Є:

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

Потрібно отримати:

    fullName

Не треба:

    const [fullName, setFullName] = useState("");

    useEffect(() => {
        setFullName(`${firstName} ${lastName}`);
    }, [firstName, lastName]);

Краще:

    const fullName = `${firstName} ${lastName}`;

---

# 53. Приклад: коли Effect потрібен

Є:

    const [title, setTitle] = useState("");

Потрібно синхронізувати:

    document.title

Тоді:

    useEffect(() => {
        document.title = title;
    }, [title]);

Тут є зовнішня система:

    React state
        ↓
    Browser document
        ↓
    Effect

---

# 54. Приклад: Effect з cleanup

    function Clock() {
        useEffect(() => {
            const intervalId = setInterval(() => {
                console.log(new Date());
            }, 1000);

            return () => {
                clearInterval(intervalId);
            };
        }, []);

        return <h1>Clock</h1>;
    }

Структура:

    useEffect(() => {

        // setup

        return () => {

            // cleanup

        };

    }, []);

---

# 55. Effect lifecycle

Для Effect корисно запам'ятати:

    Component mounts
          ↓
    Effect setup

    Dependency changes
          ↓
    Previous cleanup
          ↓
    New setup

    Component unmounts
          ↓
    Cleanup

Це не загальний lifecycle компонента, а lifecycle конкретного Effect.

---

# 56. Effect lifecycle ≠ Component lifecycle

Це дуже важливе розрізнення.

Компонент має:

    mount
    update
    unmount

Effect має:

    setup
    cleanup
    setup
    cleanup
    ...

Причому Effect може повторно запускатися під час життя одного компонента через зміну dependencies.

---

# 57. Один компонент може мати багато Effects

Наприклад:

    function Dashboard() {
        useEffect(() => {
            // sync title
        }, [page]);

        useEffect(() => {
            // subscribe
        }, [userId]);

        useEffect(() => {
            // save theme
        }, [theme]);

        return <DashboardView />;
    }

Кожен Effect має власну responsibility.

---

# 58. Чому кілька маленьких Effects часто кращі

Кожен Effect може мати власну dependency model.

Наприклад:

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

Це зрозуміліше, ніж один великий Effect:

    useEffect(() => {
        document.title = title;

        localStorage.setItem("theme", theme);

        // ...
    }, [title, theme]);

---

# 59. Common Mistake №1 — Effect для простого обчислення

Погано:

    useEffect(() => {
        setTotal(price * quantity);
    }, [price, quantity]);

Добре:

    const total = price * quantity;

---

# 60. Common Mistake №2 — неправильні dependencies

Погано:

    useEffect(() => {
        console.log(userId);
    }, []);

Якщо Effect повинен реагувати на `userId`, потрібно:

    useEffect(() => {
        console.log(userId);
    }, [userId]);

---

# 61. Common Mistake №3 — відсутність cleanup

Погано:

    useEffect(() => {
        window.addEventListener("resize", handleResize);
    }, []);

Добре:

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener(
                "resize",
                handleResize
            );
        };
    }, []);

---

# 62. Common Mistake №4 — Effect для click

Погано:

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        if (clicked) {
            console.log("Clicked");
        }
    }, [clicked]);

Краще:

    function handleClick() {
        console.log("Clicked");
    }

    return (
        <button onClick={handleClick}>
            Click
        </button>
    );

---

# 63. Common Mistake №5 — Effect для derived data

Погано:

    useEffect(() => {
        setFilteredUsers(
            users.filter(user => user.active)
        );
    }, [users]);

Краще:

    const filteredUsers = users.filter(
        user => user.active
    );

---

# 64. Common Mistake №6 — нескінченний цикл

Небезпечно:

    useEffect(() => {
        setValue(value + 1);
    }, [value]);

Пам'ятати:

    Effect
      ↓
    setState
      ↓
    render
      ↓
    Effect
      ↓
    setState
      ↓
    ...

---

# 65. Common Mistake №7 — side effect під час render

Погано:

    function App() {
        localStorage.setItem("visited", "true");

        return <h1>Hello</h1>;
    }

Краще:

    function App() {
        useEffect(() => {
            localStorage.setItem("visited", "true");
        }, []);

        return <h1>Hello</h1>;
    }

---

# 66. Render vs Effect

Запам'ятати цю різницю:

    RENDER

    props
      +
    state
      ↓
    JSX

    EFFECT

    React state / props
      ↓
    external system

---

# 67. Простий алгоритм прийняття рішення

Перед використанням `useEffect` запитай:

### Крок 1

Чи це звичайне обчислення?

    price * quantity
    filter()
    map()
    fullName

Якщо так:

    → render

### Крок 2

Чи це реакція на user interaction?

    click
    submit
    change

Якщо так:

    → event handler

### Крок 3

Чи потрібно синхронізуватися із зовнішньою системою?

    API
    DOM
    timer
    subscription
    browser API
    external library

Якщо так:

    → Effect

---

# 68. Практична схема

    ┌─────────────────────────┐
    │       React state       │
    │       React props       │
    └────────────┬────────────┘
                 │
                 ↓
              RENDER
                 │
                 ↓
                JSX
                 │
                 ↓
               COMMIT
                 │
                 ↓
              UI / DOM
                 │
                 ↓
               EFFECT
                 │
        ┌────────┼─────────┐
        ↓        ↓         ↓
      API      Timer     Browser
        │        │         │
        └────────┼─────────┘
                 ↓
             setState
                 │
                 ↓
              RENDER

---

# 69. Важлива сучасна модель React

Не думай про Effect як про:

    "місце, куди я кладу код, який має виконатися після render."

Це занадто широке визначення.

Краще:

> **Effect потрібен для синхронізації компонента із зовнішньою системою.**

Це допомагає уникати великої кількості непотрібних Effects.

---

# 70. Effect та lifecycle

Для поточної теми корисно зв'язати попередній матеріал:

    Component lifecycle

    mount
      ↓
    render
      ↓
    commit
      ↓
    Effect

    update
      ↓
    render
      ↓
    commit
      ↓
    Effect, якщо потрібно

    unmount
      ↓
    Effect cleanup

Але:

> Effect — це не lifecycle method.

Effect — це механізм synchronization.

---

# 71. Що відбувається після зміни state

Наприклад:

    setCount(count + 1);

У спрощеній моделі:

    setCount()
        ↓
    React schedules update
        ↓
    render
        ↓
    React determines changes
        ↓
    commit
        ↓
    browser UI
        ↓
    Effect

Якщо Effect має:

    [count]

він побачить нове значення `count`.

---

# 72. Effect не контролює render

Не треба думати:

    render
      ↓
    useEffect запускає render

Насправді:

    state / props change
          ↓
        render
          ↓
        commit
          ↓
        Effect

А Effect може викликати:

    setState()

і тоді виникне наступний render.

---

# 73. Effect → setState

Допустимий сценарій:

    external system
          ↓
        Effect
          ↓
       setState
          ↓
        render

Наприклад:

    API
      ↓
    data
      ↓
    setUsers(data)
      ↓
    render
      ↓
    users displayed

---

# 74. Effect → external system

Інший сценарій:

    React state
        ↓
      Effect
        ↓
    localStorage

або:

    React state
        ↓
      Effect
        ↓
    document.title

або:

    React state
        ↓
      Effect
        ↓
    WebSocket

---

# 75. Головна ідея теми

React-компонент можна уявити як:

    INPUT
      ↓
    props + state
      ↓
    render
      ↓
    UI

А Effect:

    React
      ↓
    synchronization
      ↓
    external world

Тобто Effect — це **міст між React і зовнішнім світом**.

---

# 76. Коротка шпаргалка

## useEffect

    useEffect(() => {
        // effect
    });

Після кожного commit.

---

## useEffect + []

    useEffect(() => {
        // effect
    }, []);

Без повторного запуску через dependencies.

У development `StrictMode` може виконувати setup → cleanup → setup.

---

## useEffect + dependencies

    useEffect(() => {
        // effect
    }, [value]);

Запуск:

    mount
    +
    зміна value

---

## Cleanup

    useEffect(() => {
        // setup

        return () => {
            // cleanup
        };
    }, []);

Cleanup виконується:

    перед повторним setup
    +
    при unmount

---

# 77. Що можна робити через Effect

    API requests
    subscriptions
    timers
    event listeners
    localStorage synchronization
    document.title
    browser APIs
    external libraries
    WebSocket
    DOM synchronization

---

# 78. Що зазвичай НЕ потрібно робити через Effect

    derived values
    calculations
    filtering
    sorting
    string formatting
    simple state relationships
    direct user interactions

Замість цього:

    render
    або
    event handler

---

# 79. Що потрібно пам'ятати

1. **Effect — це side effect.**

2. **Side effect — взаємодія із зовнішнім світом.**

3. **Render повинен залишатися pure.**

4. **useEffect використовується для synchronization.**

5. **Dependencies визначають, коли Effect повинен повторитися.**

6. **Cleanup потрібен для звільнення зовнішніх ресурсів.**

7. **Cleanup виконується перед повторним setup при зміні dependencies та при unmount.**

8. **Не кожен side effect є Effect — event handler також може виконувати side effect.**

9. **Не використовуй Effect для простих обчислень.**

10. **Не створюй state для даних, які можна отримати безпосередньо з props/state.**

11. **Не запускай side effects під час render.**

12. **StrictMode у development може навмисно виконувати setup → cleanup → setup.**

13. **Effect має бути стійким до повторного setup/cleanup.**

14. **Один Effect краще використовувати для однієї логічної synchronization responsibility.**

---

# 80. Питання для самоперевірки

### Теорія

- Що таке side effect?
- Чому render повинен бути pure?
- Для чого потрібен `useEffect()`?
- Що таке dependency array?
- Що означає `[]`?
- Що відбувається, якщо dependency array відсутній?
- Що таке cleanup function?
- Коли виконується cleanup?
- Чим Effect відрізняється від lifecycle method?
- Що таке stale value?
- Що таке derived data?
- Чому не потрібно використовувати Effect для derived data?
- Що таке synchronization?
- Чим Effect відрізняється від event handler?
- Навіщо потрібен cleanup для event listener?
- Навіщо cleanup для timer?
- Чому `async` не слід безпосередньо передавати як callback `useEffect`?
- Що робить `StrictMode` з Effects у development?
- Чому Effect може створити infinite loop?

---

# 81. Практичні завдання

## Завдання 1 — document.title

Створи:

    Counter

Після кожної зміни `count`:

    document.title

повинен показувати:

    Count: 0
    Count: 1
    Count: 2
    ...

---

## Завдання 2 — localStorage

Створи перемикач:

    light
    dark

Зберігай поточну тему в:

    localStorage

Використай:

    useEffect()

---

## Завдання 3 — timer

Створи компонент:

    Timer

Використай:

    setInterval()

і правильно очисти його через:

    clearInterval()

---

## Завдання 4 — window resize

Створи:

    WindowWidth

Компонент повинен показувати:

    Window width: 1280px

При зміні розміру вікна значення повинно оновлюватися.

Використай:

    window.addEventListener()

і cleanup:

    window.removeEventListener()

---

## Завдання 5 — API

Створи:

    Users

Завантаж користувачів через:

    fetch()

Після отримання даних:

    setUsers()

Виведи список користувачів.

---

## Завдання 6 — dependency

Створи:

    User

з:

    userId

При зміні `userId` завантажуй нового користувача.

Потік:

    userId
      ↓
    Effect
      ↓
    fetch()
      ↓
    setUser()
      ↓
    render

---

# 82. Головна схема теми

    ┌───────────────────────────────────┐
    │             COMPONENT             │
    │                                   │
    │     props + state                 │
    │          ↓                        │
    │        render                     │
    │          ↓                        │
    │         JSX                       │
    └──────────┬────────────────────────┘
               │
               ↓
             COMMIT
               │
               ↓
              UI
               │
               ↓
             EFFECT
               │
       ┌───────┼────────┐
       ↓       ↓        ↓
      API    Timer     DOM
       │       │        │
       └───────┼────────┘
               │
               ↓
           setState
               │
               ↓
             render


---

# 83. Головне правило

> **Не використовуй `useEffect` просто тому, що "код повинен виконатися після render".**

Спочатку запитай:

    Чи це звичайне обчислення?

    Чи це реакція на user interaction?

    Чи це synchronization із зовнішньою системою?

І тільки якщо відповідь:

    "synchronization із зовнішньою системою"

тоді розглядай:

    useEffect()

---

# 84. Коротко перед наступною темою

Після цієї теми потрібно чітко розуміти:

    render
       ≠
    effect

    component lifecycle
       ≠
    effect lifecycle

    derived data
       ≠
    side effect

    event handler
       ≠
    effect

    setup
       +
    cleanup

    React
       ↕
    external system

Наступний важливий крок — навчитися правильно працювати з:

    useEffect()
        +
    dependency array
        +
    cleanup

Саме це дозволяє уникати:

- stale values;
- зайвих запитів;
- infinite loops;
- дубльованих subscriptions;
- memory leaks;
- неправильного синхронізування React із зовнішніми системами.