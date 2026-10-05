# React — 06. Lifecycle Thinking

> `react/03-component-lifecycle-and-effects/06-lifecycle-thinking`

## Зміст

1. [Що таке lifecycle thinking](#що-таке-lifecycle-thinking)
2. [Головна зміна мислення в сучасному React](#головна-зміна-мислення-в-сучасному-react)
3. [Життєвий цикл компонента як процес](#життєвий-цикл-компонента-як-процес)
4. [Render ≠ Mount](#render--mount)
5. [Render → Commit → Effect](#render--commit--effect)
6. [Mount](#mount)
7. [Update](#update)
8. [Unmount](#unmount)
9. [Remount](#remount)
10. [Чому rerender не означає remount](#чому-rerender-не-означає-remount)
11. [Роль `key` у lifecycle](#роль-key-у-lifecycle)
12. [Parent rerender і Child rerender](#parent-rerender-і-child-rerender)
13. [Як думати про `useEffect`](#як-думати-про-useeffect)
14. [Effect як синхронізація із зовнішнім світом](#effect-як-синхронізація-із-зовнішнім-світом)
15. [Lifecycle через `useEffect`](#lifecycle-через-useeffect)
16. [Залежності та життєвий цикл Effect](#залежності-та-життєвий-цикл-effect)
17. [Cleanup як частина lifecycle](#cleanup-як-частина-lifecycle)
18. [Strict Mode і подвійний lifecycle у development](#strict-mode-і-подвійний-lifecycle-у-development)
19. [Не покладатися на кількість render](#не-покладатися-на-кількість-render)
20. [Stale closures і lifecycle thinking](#stale-closures-і-lifecycle-thinking)
21. [Збереження та скидання state](#збереження-та-скидання-state)
22. [Коли компонент справді "народжується заново"](#коли-компонент-справді-народжується-заново)
23. [Lifecycle thinking на практиці](#lifecycle-thinking-на-практиці)
24. [Типові помилки](#типові-помилки)
25. [Як аналізувати React-компонент](#як-аналізувати-react-компонент)
26. [Практичні вправи](#практичні-вправи)
27. [Питання для самоперевірки](#питання-для-самоперевірки)
28. [Міні-шпаргалка](#міні-шпаргалка)
29. [Головна ментальна модель](#головна-ментальна-модель)

---

# 1. Що таке lifecycle thinking

**Lifecycle thinking** — це спосіб мислення про React-компонент не як про набір окремих подій:

- "коли компонент завантажився";
- "коли компонент оновився";
- "коли компонент закрився";

а як про **процес існування компонента та синхронізації його стану із зовнішнім світом**.

У сучасному React важливо мислити приблизно так:

    state / props change
            ↓
         render
            ↓
         commit
            ↓
       DOM updated
            ↓
         effect
            ↓
    external system synchronized

Якщо залежності Effect змінилися:

    dependency changed
            ↓
      previous cleanup
            ↓
       new effect setup

Коли компонент перестає існувати:

    unmount
       ↓
    cleanup

---

# 2. Головна зміна мислення в сучасному React

У старому підході до React lifecycle часто мислили через:

- `componentDidMount`;
- `componentDidUpdate`;
- `componentWillUnmount`.

У сучасному React з Function Components основним інструментом є:

    useEffect()

Але важливо:

> `useEffect` — це не просто "функція для lifecycle".

Правильніше думати:

> `useEffect` потрібен для синхронізації компонента із системами, які знаходяться поза React.

Наприклад:

- DOM API;
- timer;
- browser event;
- WebSocket;
- subscription;
- external library;
- network request;
- browser storage;
- інша зовнішня система.

Тому замість:

    "Мені потрібно виконати щось після render"

краще запитати:

    "Мені потрібно синхронізувати React-компонент
     із чимось зовнішнім?"

Якщо відповідь `так`, можливо, потрібен Effect.

---

# 3. Життєвий цикл компонента як процес

У спрощеному вигляді можна виділити:

    Mount
      ↓
    Render
      ↓
    Commit
      ↓
    Effect setup
      ↓
    Update
      ↓
    Render
      ↓
    Commit
      ↓
    Cleanup
      ↓
    Effect setup
      ↓
    ...
      ↓
    Unmount
      ↓
    Cleanup

Але це не означає, що кожен render є окремою "стадією життя".

Наприклад:

    render
    render
    render
    render

можуть відбуватися під час існування **одного й того самого mounted компонента**.

Тому:

    render ≠ mount

і:

    rerender ≠ remount

Це одна з найважливіших ідей React lifecycle thinking.

---

# 4. Render ≠ Mount

## Render

**Render** — React викликає компонент, щоб визначити, що потрібно відобразити.

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        return (
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        );
    }

Після натискання:

    setCount(...)
        ↓
    component renders again

Але це не означає:

    unmount
        ↓
    mount

Компонент продовжує існувати.

---

## Mount

**Mount** — компонент уперше з'являється в React tree.

Умовно:

    <App />
       ↓
    <Counter />

`Counter` створюється і входить у React tree.

---

## Rerender

**Rerender** — React знову виконує render компонента через зміну:

- state;
- props;
- context;
- або через rerender батьківського компонента.

При цьому компонент може залишатися тим самим mounted instance у React tree.

---

# 5. Render → Commit → Effect

Це одна з найкорисніших моделей сучасного React.

## 5.1 Render phase

React виконує компонент:

    function User({ name }: { name: string }) {
        return <h1>Hello, {name}</h1>;
    }

React визначає:

    "Який UI повинен бути?"

Render повинен бути **pure**.

Не слід робити під час render:

    fetch(...)
    localStorage.setItem(...)
    document.title = ...
    subscribe(...)
    setInterval(...)
    websocket.connect(...)

Render повинен переважно:

    props + state
          ↓
        JSX

---

## 5.2 Commit phase

React застосовує необхідні зміни до DOM.

Умовно:

    Render
      ↓
    React determines changes
      ↓
    Commit
      ↓
    DOM updated

---

## 5.3 Effect

Після commit React може виконати Effect:

    useEffect(() => {
        document.title = "Users";
    }, []);

Тобто:

    React render
         ↓
    DOM commit
         ↓
    Effect

Саме тому Effect добре підходить для синхронізації із зовнішніми системами.

---

# 6. Mount

Mount — це момент, коли компонент входить у React tree.

Наприклад:

    function App() {
        return <Profile />;
    }

При першому відображенні:

    App
     ↓
    Profile

`Profile` монтується.

---

## Effect при mount

Наприклад:

    function Profile() {
        useEffect(() => {
            console.log("Effect setup");
        }, []);

        return <h1>Profile</h1>;
    }

У production за звичайного сценарію:

    mount
      ↓
    render
      ↓
    commit
      ↓
    effect setup

Порожній масив залежностей:

    []

означає:

> Effect не має реактивних залежностей, які змушували б його повторно виконуватися при наступних render.

Не варто сприймати `[]` як магічну команду "виконай один раз за всю історію існування програми".

Effect все одно належить конкретному mount.

Якщо компонент буде unmount, а потім mount знову:

    mount
      ↓
    effect

    unmount
      ↓
    cleanup

    mount again
      ↓
    effect again

---

# 7. Update

Update відбувається, коли компонент або його оточення змінюється.

Наприклад:

    const [count, setCount] = useState(0);

    setCount(1);

Можемо отримати:

    state changed
         ↓
      render
         ↓
      commit
         ↓
      effect update

Але важливо:

> Не кожен update означає, що Effect обов'язково запуститься.

Це залежить від dependencies.

Наприклад:

    useEffect(() => {
        console.log("Effect");
    }, [count]);

Effect реагує на:

    count

Якщо зміниться `count`:

    count: 0 → 1
        ↓
    effect reruns

Якщо зміниться інше значення, яке не входить у dependency list:

    effect не обов'язково reruns

---

# 8. Unmount

Unmount — компонент видаляється з React tree.

Наприклад:

    function App() {
        const [show, setShow] = useState(true);

        return (
            <>
                <button onClick={() => setShow(!show)}>
                    Toggle
                </button>

                {show && <Timer />}
            </>
        );
    }

Спочатку:

    App
     ↓
    Timer

Після:

    setShow(false)

отримуємо:

    App

`Timer` був unmounted.

---

## Cleanup при unmount

Якщо компонент має Effect:

    useEffect(() => {
        const id = setInterval(() => {
            console.log("tick");
        }, 1000);

        return () => {
            clearInterval(id);
        };
    }, []);

то при unmount:

    Timer unmount
         ↓
    cleanup
         ↓
    clearInterval(id)

---

# 9. Remount

**Remount** — це не просто rerender.

Remount означає:

    old component removed
          ↓
    new component created

При remount:

- старий state більше не використовується;
- старі Effects cleanup;
- нові Effects setup;
- компонент починає новий lifecycle.

Умовно:

    Mount A
       ↓
    Update A
       ↓
    Update A
       ↓
    Unmount A
       ↓
    Mount B

A і B можуть бути візуально однаковими компонентами, але це вже різні lifecycle instances.

---

# 10. Чому rerender не означає remount

Розглянемо:

    function Counter() {
        const [count, setCount] = useState(0);

        return (
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        );
    }

Після:

    setCount(1)

React не робить:

    unmount Counter
        ↓
    mount Counter

Відбувається приблизно:

    state update
        ↓
    render Counter
        ↓
    commit
        ↓
    Counter continues existing

Саме тому state зберігається:

    count = 0
        ↓
    setCount(1)
        ↓
    count = 1

---

# 11. Роль `key` у lifecycle

`key` допомагає React визначати identity елемента в tree.

Наприклад:

    function App() {
        const [version, setVersion] = useState(1);

        return (
            <>
                <button onClick={() => setVersion(version + 1)}>
                    Change
                </button>

                <Profile key={version} />
            </>
        );
    }

При:

    version = 1

маємо:

    <Profile key={1} />

Після:

    version = 2

маємо:

    <Profile key={2} />

React бачить:

    Profile key=1
          ↓
    Profile key=2

і може трактувати це як інший component identity.

У результаті:

    old Profile
         ↓
      unmount
         ↓
    cleanup
         ↓
    new Profile
         ↓
      mount
         ↓
    effect setup

Тому `key` може використовуватися не тільки для списків, а й для **контролю identity компонента**.

---

# 12. Parent rerender і Child rerender

Дуже важливо розрізняти:

    parent rerender

і:

    child remount

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

`App` rerenders після:

    setCount(...)

`Child` також може бути повторно викликаний для render.

Але це **не означає**, що `Child` був unmounted.

Тобто:

    Parent rerender
          ↓
    Child rerender
          ↓
    Child remains mounted

а не:

    Parent rerender
          ↓
    Child unmount
          ↓
    Child mount

---

# 13. Як думати про `useEffect`

Неправильна ментальна модель:

> "`useEffect` — це код, який запускається після render."

Це занадто загально.

Краща модель:

> "`useEffect` — це механізм синхронізації React-компонента із зовнішньою системою."

Наприклад:

    React state
        ↓
    document.title

або:

    React state
        ↓
    WebSocket subscription

або:

    React props
        ↓
    external library

або:

    React component lifecycle
        ↓
    timer

---

# 14. Effect як синхронізація із зовнішнім світом

Розглянемо:

    function Page({ title }: { title: string }) {
        useEffect(() => {
            document.title = title;
        }, [title]);

        return <h1>{title}</h1>;
    }

React має:

    title = "Home"

Effect синхронізує:

    React state/props
          ↓
    document.title

Якщо:

    title = "Home"
          ↓
    title = "About"

відбувається:

    render
      ↓
    commit
      ↓
    effect
      ↓
    document.title = "About"

Це і є правильне lifecycle thinking:

> Щось у React змінилося → потрібно синхронізувати зовнішню систему.

---

# 15. Lifecycle через `useEffect`

Різні dependency arrays створюють різну поведінку.

## 15.1 Effect без dependency array

    useEffect(() => {
        console.log("effect");
    });

Effect запускається після кожного commit.

Умовно:

    render
      ↓
    commit
      ↓
    effect

    render
      ↓
    commit
      ↓
    effect

    render
      ↓
    commit
      ↓
    effect

Якщо є cleanup:

    useEffect(() => {
        console.log("setup");

        return () => {
            console.log("cleanup");
        };
    });

при повторному запуску:

    previous cleanup
          ↓
    new setup

---

## 15.2 Effect з `[]`

    useEffect(() => {
        console.log("setup");

        return () => {
            console.log("cleanup");
        };
    }, []);

У нормальному production-сценарії:

    mount
      ↓
    setup

    ...

    unmount
      ↓
    cleanup

---

## 15.3 Effect з dependencies

    useEffect(() => {
        console.log("setup");

        return () => {
            console.log("cleanup");
        };
    }, [userId]);

Якщо:

    userId = 1

setup:

    setup for user 1

Якщо:

    userId = 2

React концептуально робить:

    cleanup for user 1
          ↓
    setup for user 2

Якщо:

    userId = 3

знову:

    cleanup for user 2
          ↓
    setup for user 3

---

# 16. Залежності та життєвий цикл Effect

Dependencies визначають, **коли потрібно повторно синхронізувати Effect**.

Наприклад:

    useEffect(() => {
        const connection = connectToRoom(roomId);

        return () => {
            connection.disconnect();
        };
    }, [roomId]);

Lifecycle:

    roomId = "general"
          ↓
    connect general

    roomId = "react"
          ↓
    disconnect general
          ↓
    connect react

    roomId = "nextjs"
          ↓
    disconnect react
          ↓
    connect nextjs

Це дуже хороший приклад правильного lifecycle thinking.

Effect не думає:

> "Я повинен виконатися після render."

Він думає:

> "Я повинен підтримувати актуальне підключення для поточного `roomId`."

---

# 17. Cleanup як частина lifecycle

Cleanup — це не окремий випадковий механізм.

Він є **парою до setup**.

Наприклад:

    useEffect(() => {
        const id = setInterval(() => {
            console.log("tick");
        }, 1000);

        return () => {
            clearInterval(id);
        };
    }, []);

Ментальна модель:

    SETUP
      ↓
    create interval
      ↓
    component uses interval
      ↓
    CLEANUP
      ↓
    clear interval

---

## Правило дзеркала

Якщо Effect робить:

    addEventListener

cleanup повинен робити:

    removeEventListener

Якщо:

    setInterval

то:

    clearInterval

Якщо:

    subscribe

то:

    unsubscribe

Якщо:

    connect

то:

    disconnect

Якщо:

    observe

то:

    disconnect / unobserve

Це можна запам'ятати як:

> **Setup створює ресурс → cleanup прибирає саме цей ресурс.**

---

# 18. Strict Mode і подвійний lifecycle у development

У development React Strict Mode може навмисно перевіряти Effects додатковим циклом.

Наприклад:

    setup
      ↓
    cleanup
      ↓
    setup

Це не означає, що production-застосунок обов'язково виконує Effect двічі.

Мета такого режиму:

> знайти Effects, які неправильно працюють при повторному setup/cleanup.

Наприклад, поганий код:

    useEffect(() => {
        window.addEventListener("resize", handleResize);
    }, []);

Тут немає cleanup.

Краще:

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

Strict Mode допомагає виявити подібні проблеми.

---

# 19. Не покладатися на кількість render

Не слід писати логіку, яка залежить від припущення:

    "цей компонент render-иться рівно один раз"

або:

    "цей render точно буде другим"

або:

    "React завжди викличе компонент саме стільки разів"

У сучасному React кількість render не повинна бути частиною бізнес-логіки.

React може виконувати render більше одного разу, а в певних сценаріях результат конкретного render може взагалі не стати committed UI.

Тому не слід робити:

    function Component() {
        console.log("render");

        doSomethingImportant();

        return <div />;
    }

Якщо `doSomethingImportant()` — side effect, це неправильне місце.

Краще:

    function Component() {
        useEffect(() => {
            doSomethingImportant();
        }, []);

        return <div />;
    }

Але лише якщо ця дія справді є зовнішньою синхронізацією і відповідає lifecycle компонента.

---

# 20. Stale closures і lifecycle thinking

Effect створює closure.

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        useEffect(() => {
            const id = setInterval(() => {
                console.log(count);
            }, 1000);

            return () => {
                clearInterval(id);
            };
        }, []);

        return (
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        );
    }

Effect із `[]` бачить значення `count`, яке було доступне під час створення цього Effect.

Тому лог може показувати не те значення, яке зараз бачить UI.

Це називається проблемою **stale closure**.

Lifecycle thinking допомагає поставити правильне питання:

> Яке значення повинен бачити цей Effect і коли він має повторно синхронізуватися?

Якщо Effect повинен реагувати на `count`:

    useEffect(() => {
        // ...
    }, [count]);

Тепер lifecycle:

    count changed
        ↓
    cleanup old effect
        ↓
    setup new effect

---

# 21. Збереження та скидання state

Lifecycle thinking також допомагає зрозуміти, чому state іноді зберігається, а іноді скидається.

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        return (
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        );
    }

Якщо `Counter` просто rerender:

    Counter
       ↓
    rerender
       ↓
    same identity

state зберігається.

---

## Якщо identity змінюється

Наприклад:

    {isAdmin ? <Admin /> : <User />}

При зміні:

    Admin
      ↓
    User

це можуть бути різні component identities.

Відповідно:

    Admin unmount
          ↓
    User mount

І state `Admin` не переноситься автоматично в `User`.

---

# 22. Коли компонент справді "народжується заново"

Компонент може бути remounted, якщо React більше не вважає його тим самим компонентом у tree.

Типові причини:

### 22.1 Компонент прибрали з tree

    {show && <Panel />}

Було:

    <Panel />

Стало:

    null

→ `Panel` unmount.

---

### 22.2 Змінився `key`

    <Panel key={id} />

Було:

    key="a"

Стало:

    key="b"

→ React може створити нову identity.

---

### 22.3 Змінився тип елемента

Наприклад:

    <User />

замінили на:

    <Admin />

Це різні component types.

---

## Важлива ідея

Не потрібно думати:

> "React бачить той самий JSX-текст, отже це той самий component."

Потрібно думати:

> "Яка identity цього елемента в React tree?"

Саме identity значною мірою визначає:

- чи зберігається state;
- чи відбувається update;
- чи відбувається unmount/mount.

---

# 23. Lifecycle thinking на практиці

Розглянемо компонент із timer.

    function Clock() {
        const [seconds, setSeconds] = useState(0);

        useEffect(() => {
            const id = setInterval(() => {
                setSeconds(value => value + 1);
            }, 1000);

            return () => {
                clearInterval(id);
            };
        }, []);

        return <p>{seconds}</p>;
    }

Можна описати lifecycle:

### Mount

    Clock mounts
        ↓
    render
        ↓
    commit
        ↓
    effect setup
        ↓
    setInterval()

### Update

Кожну секунду:

    setSeconds(...)
        ↓
    render
        ↓
    commit

Але Effect із `[]` не створює новий interval після кожного update.

---

### Unmount

Коли:

    <Clock />

прибрали з tree:

    unmount
       ↓
    cleanup
       ↓
    clearInterval(id)

---

## Чому це хороший дизайн?

Тому що ресурс має чіткий власник:

    Clock
      ↓
    owns interval

І:

    Clock mounts
      ↓
    creates interval

    Clock unmounts
      ↓
    destroys interval

---

# 24. Типові помилки

## Помилка №1 — вважати кожен render mount

Неправильно:

    render = mount

Правильно:

    mount → перша поява компонента

    render → обчислення UI

---

## Помилка №2 — вважати rerender remount

Неправильно:

    state change
       ↓
    unmount
       ↓
    mount

Правильно:

    state change
       ↓
    rerender
       ↓
    commit

---

## Помилка №3 — робити side effect у render

Погано:

    function Component() {
        document.title = "Hello";

        return <h1>Hello</h1>;
    }

Краще:

    function Component() {
        useEffect(() => {
            document.title = "Hello";
        }, []);

        return <h1>Hello</h1>;
    }

---

## Помилка №4 — використовувати `useEffect` для будь-якої логіки

Не потрібно:

    useEffect(() => {
        setFullName(`${firstName} ${lastName}`);
    }, [firstName, lastName]);

Якщо `fullName` просто обчислюється з props/state, часто краще:

    const fullName = `${firstName} ${lastName}`;

Effect не потрібен лише для того, щоб обчислити похідне значення.

---

## Помилка №5 — cleanup тільки при unmount

Неправильна модель:

    setup
       ↓
    ...
       ↓
    unmount
       ↓
    cleanup

Насправді cleanup може відбутися і перед повторним setup:

    setup
       ↓
    dependency changed
       ↓
    cleanup
       ↓
    setup

---

## Помилка №6 — cleanup не відповідає setup

Погано:

    useEffect(() => {
        const id = setInterval(doSomething, 1000);

        return () => {
            clearTimeout(id);
        };
    }, []);

Для `setInterval` потрібен:

    clearInterval(id)

---

## Помилка №7 — відсутній cleanup для subscription

Погано:

    useEffect(() => {
        const unsubscribe = subscribe(handleChange);
    }, []);

Якщо subscription повертає cleanup:

    useEffect(() => {
        const unsubscribe = subscribe(handleChange);

        return () => {
            unsubscribe();
        };
    }, []);

---

## Помилка №8 — неправильні dependencies

Наприклад:

    useEffect(() => {
        fetchUser(userId);
    }, []);

Якщо Effect повинен реагувати на зміну `userId`, така модель неправильна.

Потрібно:

    useEffect(() => {
        fetchUser(userId);
    }, [userId]);

Конкретний спосіб роботи з network requests може бути складнішим, але lifecycle-ідея саме така:

    userId changed
        ↓
    old synchronization
        ↓
    new synchronization

---

## Помилка №9 — використовувати key випадково

Не варто без причини робити:

    <Component key={Math.random()} />

Це може створювати нову identity при кожному render:

    old component
        ↓
    unmount
        ↓
    new component
        ↓
    mount

У результаті state та Effects можуть постійно скидатися/перезапускатися.

---

# 25. Як аналізувати React-компонент

Коли бачиш React-компонент, корисно пройти його за таким алгоритмом.

## Крок 1 — Яка identity компонента?

Запитай:

    Який component type?
    Який key?
    Де він знаходиться в tree?

---

## Крок 2 — Що викликає render?

Подивись:

- props;
- state;
- context.

Запитай:

    Що може змінитися?

---

## Крок 3 — Що відбувається під час render?

Перевір:

    Чи є render pure?

Не повинно бути:

- API calls;
- subscriptions;
- timers;
- DOM mutations;
- external side effects.

---

## Крок 4 — Які є Effects?

Для кожного:

    useEffect(...)

запитай:

    Що він синхронізує?

---

## Крок 5 — Які dependencies?

Наприклад:

    [roomId]

Запитай:

    Що станеться, якщо roomId зміниться?

---

## Крок 6 — Що створює setup?

Наприклад:

    setInterval()
    addEventListener()
    connect()
    subscribe()

---

## Крок 7 — Що робить cleanup?

Має бути відповідна операція:

    clearInterval()
    removeEventListener()
    disconnect()
    unsubscribe()

---

## Крок 8 — Коли відбудеться cleanup?

Перевір два головних сценарії:

    dependency change

і:

    unmount

---

## Крок 9 — Чи може компонент remount?

Подивись на:

- conditional rendering;
- `key`;
- зміну component type.

---

# 26. Практичні вправи

## Вправа 1 — визначити render/update/unmount

Проаналізуй:

    function Counter() {
        const [count, setCount] = useState(0);

        return (
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        );
    }

Питання:

1. Що відбувається при першій появі?
2. Що відбувається після натискання?
3. Чи відбувається unmount після кожного натискання?
4. Чи зберігається state?

Очікувана модель:

    mount
      ↓
    render
      ↓
    commit

    click
      ↓
    state update
      ↓
    render
      ↓
    commit

---

# Вправа 2 — timer lifecycle

Створи:

    Timer

який:

- запускає `setInterval` при mount;
- збільшує counter;
- очищає interval при unmount.

Ментальна модель:

    mount
      ↓
    setup interval
      ↓
    updates
      ↓
    unmount
      ↓
    cleanup interval

---

# Вправа 3 — dependency lifecycle

Створи компонент:

    UserProfile({ userId })

і Effect:

    useEffect(() => {
        console.log("load", userId);

        return () => {
            console.log("cleanup", userId);
        };
    }, [userId]);

Перевір послідовність:

    userId = 1
    userId = 2
    userId = 3
    unmount

Очікувана концептуальна послідовність:

    setup 1
      ↓
    cleanup 1
      ↓
    setup 2
      ↓
    cleanup 2
      ↓
    setup 3
      ↓
    cleanup 3

---

# Вправа 4 — rerender чи remount?

Створи:

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

Перевір:

    Чи Child remount після кожного натискання?

Для цього можна тимчасово додати:

    useEffect(() => {
        console.log("Child mounted");

        return () => {
            console.log("Child unmounted");
        };
    }, []);

Якщо `Child` не remount, cleanup не буде виконуватися при кожному parent rerender.

---

# Вправа 5 — перевірити `key`

Спробуй:

    <Child key={count} />

і порівняй із:

    <Child />

Спостерігай:

- state;
- mount;
- unmount;
- Effect setup;
- cleanup.

Це дуже добре показує різницю між:

    rerender

і:

    remount

---

# 27. Питання для самоперевірки

### Базові

1. Що таке mount?
2. Що таке render?
3. Що таке rerender?
4. Що таке unmount?
5. Що таке remount?
6. Чим rerender відрізняється від remount?
7. Чи означає state update unmount компонента?

---

### Effects

8. Для чого потрібен `useEffect`?
9. Що таке Effect setup?
10. Що таке cleanup?
11. Коли запускається cleanup?
12. Чому cleanup виконується перед повторним setup?
13. Що означає `[]`?
14. Що означає `[value]`?
15. Чому dependencies пов'язані з lifecycle?

---

### Identity

16. Що таке component identity?
17. Для чого потрібен `key`?
18. Як зміна `key` може викликати remount?
19. Чому state може зберігатися між render?
20. Коли state може бути скинутий?

---

### Практичні

21. Де потрібно створювати timer?
22. Де потрібно очищати timer?
23. Де підписуватися на event?
24. Де відписуватися?
25. Чому side effects не повинні виконуватися під час render?
26. Що таке stale closure?
27. Чому Strict Mode може показати `setup → cleanup → setup`?
28. Чи потрібно писати код, який залежить від того, скільки разів React виконав render?

---

# 28. Міні-шпаргалка

## Основні поняття

    Mount
    ↓
    компонент входить у React tree

    Render
    ↓
    React виконує компонент і визначає UI

    Commit
    ↓
    React застосовує зміни до DOM

    Effect
    ↓
    синхронізація із зовнішньою системою

    Update
    ↓
    state / props / context змінилися

    Cleanup
    ↓
    прибрати попередню synchronization/resource

    Unmount
    ↓
    компонент залишає React tree

    Remount
    ↓
    старий component identity замінений новим

---

## Найважливіші відмінності

    render ≠ mount

    rerender ≠ remount

    update ≠ unmount

    cleanup ≠ тільки unmount

    effect ≠ "код після кожного render"

    key ≠ просто атрибут для списку

---

## Effect lifecycle

Для:

    useEffect(() => {
        setup();

        return () => {
            cleanup();
        };
    }, [value]);

ментальна модель:

    mount
      ↓
    setup

    value changes
      ↓
    cleanup
      ↓
    setup

    unmount
      ↓
    cleanup

---

## Timer

    useEffect(() => {
        const id = setInterval(() => {
            // ...
        }, 1000);

        return () => {
            clearInterval(id);
        };
    }, []);

---

## Event listener

    useEffect(() => {
        const handleResize = () => {
            // ...
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

---

## Subscription

    useEffect(() => {
        const unsubscribe = subscribe(handleChange);

        return () => {
            unsubscribe();
        };
    }, []);

---

## Connection

    useEffect(() => {
        const connection = connect(roomId);

        return () => {
            connection.disconnect();
        };
    }, [roomId]);

---

# 29. Головна ментальна модель

Найважливіше — не запам'ятати десятки lifecycle-подій.

Потрібно навчитися бачити React-компонент як **учасника процесу синхронізації**.

Основна модель:

    ┌──────────────────────┐
    │   Props / State      │
    └──────────┬───────────┘
               ↓
            Render
               ↓
            Commit
               ↓
         UI synchronized
               ↓
          Effect setup
               ↓
    External system synchronized
               │
               │
        dependency change
               │
               ↓
          Cleanup
               ↓
        Effect setup
               │
               ↓
    External system synchronized
               │
               │
            Unmount
               │
               ↓
           Cleanup

---

## Найважливіше правило

Не думай:

> "Що мені виконати на mount?"

Краще думай:

> "Що цей компонент повинен синхронізувати із зовнішнім світом?"

Не думай:

> "Що виконати на update?"

Краще:

> "Які значення змінилися і яку synchronization потрібно оновити?"

Не думай:

> "Що виконати на unmount?"

Краще:

> "Які ресурси належать цьому компоненту і що потрібно після нього прибрати?"

---

# Підсумок

Lifecycle thinking у сучасному React можна звести до кількох принципів:

1. **Render — це обчислення UI.**

2. **Render повинен бути pure.**

3. **Mount — це поява компонента в React tree.**

4. **Rerender не означає remount.**

5. **State update зазвичай приводить до rerender, а не до unmount/mount.**

6. **Component identity визначає, чи React зберігає state і продовжує існуючий компонент.**

7. **`key` може змінити identity компонента і спричинити remount.**

8. **`useEffect` призначений насамперед для синхронізації із зовнішніми системами.**

9. **Dependencies визначають, коли synchronization потрібно повторити.**

10. **Cleanup виконується перед повторним setup Effect і при unmount.**

11. **Cleanup повинен скасовувати або прибирати те, що створив setup.**

12. **Strict Mode у development може навмисно перевіряти setup/cleanup повторним циклом.**

13. **Не потрібно будувати логіку навколо припущення про конкретну кількість render.**

14. **Не кожен render потребує Effect.**

15. **Не кожна зміна state означає новий lifecycle.**

---

## Фінальна схема

    React Component

         │
         ├── Props
         ├── State
         └── Context
                │
                ↓
             Render
                │
                ↓
             Commit
                │
                ↓
             UI update
                │
                ↓
             Effect
                │
                ↓
       External synchronization
                │
                ├───────────────┐
                │               │
       dependency change       unmount
                │               │
                ↓               ↓
             Cleanup         Cleanup
                │
                ↓
          New Effect setup


> **Головна ідея:** у сучасному React lifecycle — це не набір методів "mount/update/unmount", які потрібно механічно запам'ятати. Це спосіб розуміти, як identity компонента, render, commit, state, dependencies, Effects і cleanup взаємодіють протягом існування компонента.