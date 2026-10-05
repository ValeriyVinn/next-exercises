# 03. `useRef`

`useRef` — це React Hook, який дозволяє зберігати **значення між рендерами компонента**, не спричиняючи повторний рендер при його зміні.

Найчастіше `useRef` використовують для:

- доступу до DOM-елемента;
- фокусу на `input`;
- прокручування до елемента;
- вимірювання DOM;
- зберігання `setTimeout` / `setInterval` ID;
- зберігання попереднього значення;
- зберігання змінної, яка повинна переживати рендери, але **не повинна викликати новий рендер**;
- роботи з `WebSocket`, subscription та іншими зовнішніми об'єктами.

---

## Основний принцип

`useRef` повертає об'єкт такого виду:

    {
        current: ...
    }

Наприклад:

    const countRef = useRef(0);

Тепер:

    countRef.current

містить значення `0`.

Якщо змінити:

    countRef.current = 10;

React **не виконає повторний рендер**.

Це головна відмінність `useRef` від `useState`.

---

## Імпорт

    import { useRef } from "react";

---

# Ключові поняття

### `ref`

Посилання на значення або DOM-елемент.

### `current`

Властивість об'єкта ref, у якій зберігається поточне значення.

    const valueRef = useRef(0);

    valueRef.current = 10;

### Mutable value

Значення, яке можна змінювати без створення нового ref:

    valueRef.current = 20;

### DOM ref

Посилання на реальний DOM-елемент:

    const inputRef = useRef<HTMLInputElement | null>(null);

### Persistent value

Значення, яке зберігається між рендерами:

    const renderCount = useRef(0);

### Re-render

Повторний рендер компонента.

Зміна `ref.current` **не викликає re-render**.

---

# Що потрібно пам'ятати

1. `useRef()` повертає об'єкт із властивістю `.current`.

2. Значення `.current` можна змінювати.

3. Зміна `.current` не викликає повторний рендер.

4. Значення ref зберігається між рендерами.

5. `useRef` часто використовують для доступу до DOM.

6. `useRef` не замінює `useState`.

7. Якщо зміна значення повинна відобразитися в UI — зазвичай потрібен `useState`.

8. Якщо значення потрібно зберегти між рендерами, але його зміна не повинна оновлювати UI — часто підходить `useRef`.

9. Не потрібно читати або змінювати `ref.current` під час render без необхідності.

10. `ref.current` — це mutable value.

---

# 1. Базовий синтаксис

Загальний синтаксис:

    const ref = useRef(initialValue);

Наприклад:

    const countRef = useRef(0);

    console.log(countRef.current);

Результат:

    0

Зміна:

    countRef.current = 10;

Тепер:

    console.log(countRef.current);

Результат:

    10

---

# 2. `useRef` повертає об'єкт

Важливо розуміти, що:

    const countRef = useRef(0);

це не означає:

    countRef === 0

Насправді:

    countRef === {
        current: 0
    }

Тому використовується:

    countRef.current

---

# 3. `useRef` не викликає re-render

Розглянемо:

    import { useRef } from "react";

    function Counter() {
        const countRef = useRef(0);

        const handleClick = () => {
            countRef.current += 1;

            console.log(countRef.current);
        };

        return (
            <button onClick={handleClick}>
                Increase
            </button>
        );
    }

При кожному натисканні:

    countRef.current += 1;

але компонент не перерендерюється.

У консолі:

    1
    2
    3
    4

Але UI не показує ці значення.

---

# 4. `useRef` vs `useState`

Це одне з найважливіших порівнянь у React.

## `useState`

    const [count, setCount] = useState(0);

    setCount(1);

Зміна state:

- змінює значення;
- запускає re-render;
- UI отримує нове значення.

---

## `useRef`

    const countRef = useRef(0);

    countRef.current = 1;

Зміна ref:

- змінює значення;
- не запускає re-render;
- UI автоматично не оновлюється.

---

## Порівняння

| `useState` | `useRef` |
|---|---|
| зберігає значення | зберігає значення |
| зміна викликає re-render | зміна не викликає re-render |
| використовується для UI state | використовується для mutable values |
| `setState()` | `.current = ...` |
| React контролює оновлення UI | React не реагує на зміну `.current` |

---

# 5. Коли використовувати `useState`

Якщо значення повинно відображатися в UI:

    const [count, setCount] = useState(0);

    return (
        <p>Count: {count}</p>
    );

Тут потрібен `useState`.

Якщо зробити:

    const countRef = useRef(0);

    return (
        <p>Count: {countRef.current}</p>
    );

і потім:

    countRef.current += 1;

UI сам не оновиться.

---

# 6. Коли використовувати `useRef`

Якщо значення:

- потрібно зберігати між render;
- але зміна цього значення не повинна оновлювати UI.

Наприклад:

    const timerIdRef = useRef<number | null>(null);

або:

    const previousValueRef = useRef<string | null>(null);

або:

    const inputRef = useRef<HTMLInputElement | null>(null);

---

# 7. `useRef` для DOM

Це один із найважливіших сценаріїв використання `useRef`.

Наприклад, маємо:

    <input />

Потрібно програмно встановити на нього focus.

Створюємо ref:

    const inputRef = useRef<HTMLInputElement | null>(null);

Передаємо його в `ref`:

    <input ref={inputRef} />

Тепер React зв'язує:

    inputRef.current

із DOM-елементом `<input>`.

---

# 8. Focus на input

Повний приклад:

    import { useRef } from "react";

    function SearchForm() {
        const inputRef = useRef<HTMLInputElement | null>(null);

        const handleFocus = () => {
            inputRef.current?.focus();
        };

        return (
            <>
                <input ref={inputRef} />

                <button onClick={handleFocus}>
                    Focus
                </button>
            </>
        );
    }

Коли користувач натискає кнопку:

    inputRef.current?.focus();

React звертається до реального DOM-елемента.

---

# 9. Чому використовується `null`

У TypeScript:

    const inputRef = useRef<HTMLInputElement | null>(null);

На початку:

    inputRef.current === null

Після монтування компонента React встановлює:

    inputRef.current = HTMLInputElement

При демонтуванні:

    inputRef.current

може знову стати:

    null

Тому TypeScript повинен знати, що значення може бути `null`.

---

# 10. Optional chaining

Через це часто використовується:

    inputRef.current?.focus();

Знак:

    ?.

означає:

> якщо `current` існує — виконай `focus()`.

Якщо:

    inputRef.current === null

помилки не буде.

---

# 11. `useRef` для кнопки

Ref можна встановлювати не тільки на `input`.

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    return (
        <button ref={buttonRef}>
            Save
        </button>
    );

Тепер можна:

    buttonRef.current?.focus();

---

# 12. `useRef` для `div`

    const divRef = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={divRef}>
            Content
        </div>
    );

Можна звернутися до DOM:

    divRef.current?.scrollIntoView();

---

# 13. `scrollIntoView()`

Наприклад:

    function Example() {
        const sectionRef = useRef<HTMLElement | null>(null);

        const handleScroll = () => {
            sectionRef.current?.scrollIntoView({
                behavior: "smooth",
            });
        };

        return (
            <>
                <button onClick={handleScroll}>
                    Go to section
                </button>

                <section ref={sectionRef}>
                    Target section
                </section>
            </>
        );
    }

При натисканні кнопки браузер прокрутить сторінку до `section`.

---

# 14. `useRef` і DOM-методи

Через DOM ref можна використовувати методи елемента.

Наприклад:

    inputRef.current?.focus();

    inputRef.current?.blur();

    elementRef.current?.scrollIntoView();

Також можна отримувати інформацію про DOM:

    elementRef.current?.getBoundingClientRect();

---

# 15. `getBoundingClientRect()`

Метод дозволяє отримати розміри та координати елемента.

    const boxRef = useRef<HTMLDivElement | null>(null);

    const handleMeasure = () => {
        const rect = boxRef.current?.getBoundingClientRect();

        console.log(rect);
    };

    return (
        <>
            <button onClick={handleMeasure}>
                Measure
            </button>

            <div ref={boxRef}>
                Box
            </div>
        </>
    );

Результат міститиме:

    width
    height
    top
    left
    right
    bottom
    x
    y

Для вимірювання layout також часто використовують `useLayoutEffect`, але це вже окрема тема.

---

# 16. `useRef` з `useEffect`

`useRef` дуже часто використовується разом із `useEffect`.

Наприклад:

    import { useEffect, useRef } from "react";

    function SearchForm() {
        const inputRef = useRef<HTMLInputElement | null>(null);

        useEffect(() => {
            inputRef.current?.focus();
        }, []);

        return (
            <input ref={inputRef} />
        );
    }

Послідовність:

    1. React рендерить компонент.
    2. DOM створюється.
    3. React встановлює inputRef.current.
    4. useEffect запускається.
    5. input отримує focus.

---

# 17. `useRef` для першого render

Іноді потрібно знати:

> це перший render чи ні?

Для цього можна використати ref.

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        console.log("Not the first render");
    });

На першому виконанні:

    isFirstRender.current === true

Після цього:

    isFirstRender.current = false;

---

# 18. Збереження попереднього значення

Один із популярних патернів:

    const previousValueRef = useRef<string | null>(null);

    useEffect(() => {
        previousValueRef.current = value;
    }, [value]);

Наприклад:

    function Example({ value }: { value: string }) {
        const previousValueRef = useRef<string | null>(null);

        useEffect(() => {
            previousValueRef.current = value;
        }, [value]);

        return (
            <p>
                Previous: {previousValueRef.current}
            </p>
        );
    }

Але тут є важливий нюанс:

під час render `previousValueRef.current` містить значення, яке було записане попереднім effect.

Це дозволяє створювати патерн:

    current value
        ↓
    render
        ↓
    effect
        ↓
    save current value as previous
        ↓
    next render

---

# 19. Класичний `usePrevious`

Можна винести цю логіку в custom Hook:

    function usePrevious<T>(value: T): T | undefined {
        const ref = useRef<T | undefined>(undefined);

        useEffect(() => {
            ref.current = value;
        }, [value]);

        return ref.current;
    }

Використання:

    function Example({ value }: { value: number }) {
        const previousValue = usePrevious(value);

        return (
            <p>
                Previous: {previousValue}
            </p>
        );
    }

Наприклад:

    value = 10
    previousValue = undefined

Після зміни:

    value = 20
    previousValue = 10

---

# 20. `useRef` для лічильника render

Можна використовувати ref для підрахунку кількості render:

    const renderCount = useRef(0);

    renderCount.current += 1;

    console.log("Render:", renderCount.current);

Важливо:

це значення не відображатиметься в UI автоматично, тому що зміна ref не викликає render.

---

# 21. `useRef` для timer

Наприклад:

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

Створюємо timer:

    timerRef.current = setTimeout(() => {
        console.log("Done");
    }, 1000);

Потім можемо його очистити:

    if (timerRef.current) {
        clearTimeout(timerRef.current);
    }

---

# 22. `setInterval` у ref

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const start = () => {
        intervalRef.current = setInterval(() => {
            console.log("Tick");
        }, 1000);
    };

    const stop = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

Тут ref зберігає ID interval між render.

---

# 23. Чому timer ID зручно зберігати в ref

Потрібно:

    start()
        ↓
    створити interval
        ↓
    зберегти його ID
        ↓
    component render
        ↓
    stop()
        ↓
    використати збережений ID

`useRef` добре підходить, тому що:

- значення повинно пережити render;
- UI не залежить від цього значення;
- зміна ID не повинна викликати render.

---

# 24. `useRef` для `setTimeout`

Наприклад, debounce:

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleChange = (value: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            console.log("Search:", value);
        }, 500);
    };

При кожному введенні старий timer очищується.

---

# 25. `useRef` для DOM event listener

Наприклад, потрібно зберегти обробник або інше значення, яке використовується event listener.

Загальна ідея:

    const handlerRef = useRef<(() => void) | null>(null);

    handlerRef.current = () => {
        console.log("Clicked");
    };

У складніших компонентах це допомагає уникати непотрібного створення subscription.

---

# 26. `useRef` для WebSocket

Ref може зберігати об'єкт зовнішньої системи.

Наприклад:

    const socketRef = useRef<WebSocket | null>(null);

Підключення:

    socketRef.current = new WebSocket("wss://example.com");

Відправлення:

    socketRef.current?.send("Hello");

Закриття:

    socketRef.current?.close();

Таке значення не потрібно показувати безпосередньо в UI, тому `useRef` підходить краще за `useState`.

---

# 27. `useRef` для сторонніх бібліотек

Ref часто використовують для бібліотек, які працюють безпосередньо з DOM.

Наприклад:

    const chartRef = useRef<HTMLDivElement | null>(null);

Після монтування:

    useEffect(() => {
        if (!chartRef.current) {
            return;
        }

        // initialize third-party library

        return () => {
            // destroy library
        };
    }, []);

Це типовий патерн:

    React
        ↓
    ref
        ↓
    DOM element
        ↓
    third-party library

---

# 28. `useRef` не є state

Дуже важлива різниця.

Не потрібно використовувати ref замість state лише тому, що він простіший.

Погано:

    const countRef = useRef(0);

    const handleClick = () => {
        countRef.current += 1;
    };

    return (
        <p>{countRef.current}</p>
    );

Клік змінює:

    countRef.current

але UI не оновлюється.

Правильно:

    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    };

    return (
        <p>{count}</p>
    );

---

# 29. Просте правило вибору

Запитай себе:

> Чи повинна зміна цього значення змінити UI?

Якщо **так**:

    useState

Якщо **ні**, але значення повинно зберігатися між render:

    useRef

Якщо потрібно отримати DOM-елемент:

    useRef

---

# 30. `useRef` не запускає effect

Наприклад:

    const valueRef = useRef(0);

    useEffect(() => {
        console.log("Effect");
    }, [valueRef.current]);

Не варто використовувати `ref.current` як звичайну реактивну dependency.

Зміна:

    valueRef.current = 10;

не повідомляє React, що потрібно виконати effect.

Для реактивних значень використовують `state` або `props`.

---

# 31. `ref.current` не є reactive value

Наприклад:

    const countRef = useRef(0);

    countRef.current += 1;

React не знає, що це значення змінилося.

Тому:

    ref.current

не працює так само, як:

    state

State:

    setCount(10);

React знає про зміну.

Ref:

    countRef.current = 10;

React не запускає render.

---

# 32. Не використовуй ref для даних, які показує UI

Якщо UI повинен реагувати на зміну:

    const [username, setUsername] = useState("");

Правильно.

Не:

    const usernameRef = useRef("");

якщо зміна username повинна автоматично відображатися:

    <p>{username}</p>

---

# 33. Ref зберігається між render

Розглянемо:

    function Example() {
        const valueRef = useRef(0);

        console.log(valueRef);

        return <div>Example</div>;
    }

React не створює новий ref з нуля при кожному render.

Ref залишається тим самим об'єктом.

Умовно:

    render 1
        ↓
    ref object
        ↓
    render 2
        ↓
    той самий ref object
        ↓
    render 3
        ↓
    той самий ref object

---

# 34. `useRef` як "коробка"

Корисна ментальна модель:

    const ref = useRef(value);

Уявляй це як коробку:

    ref
    └── current
        └── value

Ти можеш замінити вміст:

    ref.current = newValue;

Але сама коробка залишається тією самою.

---

# 35. `useRef` і identity

Важливо:

    const ref = useRef(0);

`ref` має стабільну identity протягом життя компонента.

Тому можна зберігати в ньому:

    DOM element
    timer ID
    WebSocket
    previous value
    mutable object
    external instance

---

# 36. Ref і `null`

DOM ref до монтування:

    inputRef.current === null

Після монтування:

    inputRef.current === HTMLInputElement

Після unmount:

    inputRef.current === null

Тому завжди потрібно враховувати життєвий цикл DOM-елемента.

---

# 37. TypeScript типізація DOM ref

Найпоширеніші варіанти:

    const inputRef = useRef<HTMLInputElement | null>(null);

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const divRef = useRef<HTMLDivElement | null>(null);

    const formRef = useRef<HTMLFormElement | null>(null);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const selectRef = useRef<HTMLSelectElement | null>(null);

---

# 38. Типи для інших елементів

Наприклад:

    HTMLAnchorElement

    HTMLImageElement

    HTMLVideoElement

    HTMLAudioElement

    HTMLCanvasElement

    HTMLFormElement

    HTMLTextAreaElement

---

# 39. Ref для video

Наприклад:

    function VideoPlayer() {
        const videoRef = useRef<HTMLVideoElement | null>(null);

        const handlePlay = () => {
            videoRef.current?.play();
        };

        const handlePause = () => {
            videoRef.current?.pause();
        };

        return (
            <>
                <video
                    ref={videoRef}
                    src="/video.mp4"
                />

                <button onClick={handlePlay}>
                    Play
                </button>

                <button onClick={handlePause}>
                    Pause
                </button>
            </>
        );
    }

Тут React керує самим DOM-елементом, а ref дозволяє викликати його API.

---

# 40. Ref для audio

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handlePlay = () => {
        audioRef.current?.play();
    };

    const handlePause = () => {
        audioRef.current?.pause();
    };

---

# 41. Ref для форми

    const formRef = useRef<HTMLFormElement | null>(null);

    const handleReset = () => {
        formRef.current?.reset();
    };

    return (
        <form ref={formRef}>
            ...
        </form>
    );

---

# 42. Callback ref

Існує також callback ref.

Замість:

    const inputRef = useRef<HTMLInputElement | null>(null);

можна:

    const inputRef = (element: HTMLInputElement | null) => {
        console.log(element);
    };

    return (
        <input ref={inputRef} />
    );

React передає DOM-елемент у callback.

Callback ref корисний у складніших випадках, коли потрібно виконати дію саме в момент підключення або відключення DOM-елемента.

---

# 43. `useRef` vs callback ref

### `useRef`

    const inputRef = useRef<HTMLInputElement | null>(null);

Потім:

    inputRef.current?.focus();

### Callback ref

    const handleRef = (element: HTMLInputElement | null) => {
        if (element) {
            element.focus();
        }
    };

Callback ref зручний, коли сама установка ref повинна виконувати певну логіку.

---

# 44. Ref forwarding

Іноді батьківський компонент хоче отримати ref до DOM-елемента всередині дочірнього компонента.

Наприклад:

    function Input() {
        return <input />;
    }

Батьківський компонент не може просто зробити:

    <Input ref={inputRef} />

для звичайного function component без відповідної підтримки ref.

У сучасному React існують механізми передачі ref компонентам, але конкретний підхід залежить від версії React та API, яке використовується.

Головна ідея:

    Parent
        ↓
       ref
        ↓
    Child
        ↓
    DOM element

---

# 45. `forwardRef`

Класичний підхід:

    const Input = forwardRef<HTMLInputElement>((props, ref) => {
        return (
            <input
                {...props}
                ref={ref}
            />
        );
    });

Батьківський компонент:

    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <Input ref={inputRef} />
    );

Тепер:

    inputRef.current?.focus();

---

# 46. Навіщо передавати ref через компонент

Це може бути потрібно для reusable UI-компонентів.

Наприклад:

    <CustomInput />

але батьківський компонент хоче:

    focus()
    scrollIntoView()
    select()

Тоді компонент може надати доступ до внутрішнього DOM-елемента через ref.

---

# 47. Не зловживай DOM refs

React рекомендує описувати UI через:

    props
    state

а не постійно маніпулювати DOM вручну.

Погано:

    elementRef.current!.style.color = "red";

якщо це звичайна частина UI.

Краще:

    const [isError, setIsError] = useState(false);

    return (
        <div className={isError ? "error" : ""}>
            ...
        </div>
    );

Ref краще використовувати для дій, які природно належать DOM:

    focus()
    blur()
    play()
    pause()
    scrollIntoView()
    measure DOM
    інтеграція зі сторонньою бібліотекою

---

# 48. Ref і imperative actions

React переважно працює декларативно:

    state
        ↓
    UI

А ref дозволяє виконати imperative action:

    inputRef.current?.focus();

Тобто:

> "Зроби цю дію з конкретним DOM-елементом."

Це нормально, коли дія дійсно є imperative.

---

# 49. `useRef` для попереднього значення

Типовий приклад:

    function Example({ value }: { value: number }) {
        const previousValue = useRef<number | undefined>(undefined);

        useEffect(() => {
            previousValue.current = value;
        }, [value]);

        return (
            <div>
                <p>Current: {value}</p>
                <p>Previous: {previousValue.current}</p>
            </div>
        );
    }

Ідея:

    render
        ↓
    показати попереднє значення
        ↓
    effect
        ↓
    записати поточне значення
        ↓
    наступний render

---

# 50. `useRef` для mutable object

Ref може містити об'єкт:

    const dataRef = useRef({
        count: 0,
        status: "idle",
    });

Можна змінити:

    dataRef.current.count += 1;

або:

    dataRef.current.status = "loading";

Але React не зробить re-render.

---

# 51. Важливе правило для mutable data

Якщо інші частини UI повинні реагувати на зміну:

    useState

Якщо значення використовується внутрішньо і React не потрібно повідомляти про зміну:

    useRef

---

# 52. `useRef` і closures

Ref особливо корисний, коли callback повинен отримувати актуальне значення.

Наприклад:

    const valueRef = useRef(value);

    useEffect(() => {
        valueRef.current = value;
    }, [value]);

Тепер callback може читати:

    valueRef.current

і отримувати останнє значення ref.

Це часто використовується в:

    timers
    event listeners
    subscriptions
    WebSocket
    external APIs

---

# 53. Stale closure

Розглянемо:

    const [count, setCount] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            console.log(count);
        }, 1000);

        return () => clearInterval(id);
    }, []);

Effect замкнув значення `count`, яке було доступне під час відповідного render.

Це може створити проблему зі "старим" значенням.

Один із способів роботи з актуальним mutable значенням — ref.

---

# 54. Ref як сховище актуального значення

Наприклад:

    const [count, setCount] = useState(0);

    const countRef = useRef(count);

    useEffect(() => {
        countRef.current = count;
    }, [count]);

Тепер callback може звернутися до:

    countRef.current

і отримати актуальне значення.

Але цей патерн потрібно використовувати свідомо. Не треба перетворювати весь state на refs.

---

# 55. `useRef` + `useEffect` + timer

Типовий практичний приклад:

    function Timer() {
        const [seconds, setSeconds] = useState(0);

        const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

        const start = () => {
            if (intervalRef.current !== null) {
                return;
            }

            intervalRef.current = setInterval(() => {
                setSeconds((value) => value + 1);
            }, 1000);
        };

        const stop = () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };

        useEffect(() => {
            return () => {
                if (intervalRef.current !== null) {
                    clearInterval(intervalRef.current);
                }
            };
        }, []);

        return (
            <>
                <p>{seconds}</p>

                <button onClick={start}>
                    Start
                </button>

                <button onClick={stop}>
                    Stop
                </button>
            </>
        );
    }

Тут:

    seconds

зберігається в state, тому що він показується в UI.

А:

    intervalRef

зберігається в ref, тому що ID timer не потрібно показувати в UI.

Це хороший приклад правильного розділення відповідальності.

---

# 56. `useRef` + input + state

Практичний приклад:

    function Search() {
        const [query, setQuery] = useState("");

        const inputRef = useRef<HTMLInputElement | null>(null);

        const clearSearch = () => {
            setQuery("");
            inputRef.current?.focus();
        };

        return (
            <>
                <input
                    ref={inputRef}
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value);
                    }}
                />

                <button onClick={clearSearch}>
                    Clear
                </button>
            </>
        );
    }

Тут:

    query → useState

тому що значення контролює UI.

А:

    inputRef → useRef

тому що ref потрібен для imperative action:

    focus()

---

# 57. `useRef` у Next.js App Router

У Next.js App Router компонент, який використовує `useRef`, зазвичай повинен бути Client Component.

На початку файлу:

    "use client";

Потім:

    import { useRef } from "react";

Наприклад:

    "use client";

    import { useRef } from "react";

    export default function Search() {
        const inputRef = useRef<HTMLInputElement | null>(null);

        return (
            <input ref={inputRef} />
        );
    }

---

# 58. `useRef` і Server Components

React Hooks, пов'язані з інтерактивністю та client-side поведінкою, не використовуються безпосередньо в Server Component.

Особливо це важливо для:

    DOM refs
    browser APIs
    event handlers
    useState
    useEffect

У Next.js потрібно чітко розуміти межу:

    Server Component
        ↓
    Client Component
        ↓
    useRef
        ↓
    browser DOM

---

# 59. `useRef` і SSR

На сервері немає реального browser DOM.

Тому:

    inputRef.current

не можна використовувати для роботи з browser DOM під час server rendering.

DOM ref стає доступним після того, як компонент змонтований у браузері.

---

# 60. `useRef` і `useEffect`

Типовий зв'язок:

    useRef
        ↓
    отримати DOM element
        ↓
    useEffect
        ↓
    виконати browser-side action

Наприклад:

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

---

# 61. `useRef` не потрібно створювати умовно

Не можна:

    if (condition) {
        const ref = useRef(null);
    }

Hooks повинні викликатися на верхньому рівні компонента.

Правильно:

    const ref = useRef(null);

    if (condition) {
        // use ref here
    }

Це загальне правило React Hooks.

---

# 62. Не викликай `useRef` у циклі

Погано:

    items.map(() => {
        const ref = useRef(null);
    });

Hooks не можна викликати всередині циклів, умов або вкладених функцій.

Для списків існують інші підходи:

    callback refs
    ref collections
    refs у дочірніх компонентах

---

# 63. Масив refs

Іноді потрібно мати refs для кількох елементів.

Наприклад, можна зберігати DOM-елементи в масиві:

    const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

Під час render:

    {items.map((item, index) => (
        <li
            key={item.id}
            ref={(element) => {
                itemRefs.current[index] = element;
            }}
        >
            {item.name}
        </li>
    ))}

Тепер:

    itemRefs.current[0]

посилається на перший DOM-елемент.

---

# 64. Чому `useRef` підходить для масиву refs

Тому що кількість елементів списку може змінюватися, а створювати окремий Hook для кожного елемента не можна.

Замість цього:

    useRef([])

може містити колекцію DOM-елементів.

---

# 65. Ref не повинен бути джерелом істини для UI

Поганий підхід:

    const valueRef = useRef("");

    // змінюємо ref
    valueRef.current = "Hello";

і очікуємо:

    <p>{valueRef.current}</p>

автоматичного оновлення.

Для UI state:

    const [value, setValue] = useState("");

---

# 66. Типова помилка: забутий `.current`

Неправильно:

    const inputRef = useRef<HTMLInputElement | null>(null);

    inputRef.focus();

Правильно:

    inputRef.current?.focus();

Ref — це об'єкт.

DOM-елемент знаходиться всередині:

    ref.current

---

# 67. Типова помилка: примусовий `!`

Можна написати:

    inputRef.current!.focus();

але це потрібно робити обережно.

`!` говорить TypeScript:

> Я гарантую, що тут не буде null.

Але якщо це неправда:

    inputRef.current === null

може виникнути runtime error.

Безпечніше:

    inputRef.current?.focus();

---

# 68. Типова помилка: очікувати re-render

Погано:

    const countRef = useRef(0);

    const handleClick = () => {
        countRef.current += 1;
    };

і очікувати:

    <p>{countRef.current}</p>

після кліку.

`useRef` не запускає render.

Якщо UI повинен змінюватися:

    useState

---

# 69. Типова помилка: використовувати ref замість state

Погано:

    const isOpenRef = useRef(false);

    const toggle = () => {
        isOpenRef.current = !isOpenRef.current;
    };

Якщо UI залежить від:

    isOpen

потрібно:

    const [isOpen, setIsOpen] = useState(false);

---

# 70. Типова помилка: маніпулювати DOM без потреби

Погано:

    ref.current!.textContent = "Hello";

якщо цей текст повинен контролювати React.

Краще:

    const [text, setText] = useState("Hello");

    return <p>{text}</p>;

React повинен залишатися джерелом істини для звичайного UI.

---

# 71. Типова помилка: використовувати ref як глобальну змінну

`useRef` не є глобальним сховищем.

Наприклад:

    const dataRef = useRef(data);

не означає, що інші компоненти автоматично побачать зміни.

Для спільного state використовують:

    props
    context
    state management
    external store

залежно від задачі.

---

# 72. Типова помилка: змінювати ref під час render без потреби

Наприклад:

    function Example() {
        const ref = useRef(0);

        ref.current += 1;

        return <div>...</div>;
    }

Технічно ref змінюється, але така логіка під час render часто створює проблеми з розумінням компонента.

Краще змінювати ref у:

    event handler
    effect
    callback ref

коли це відповідає задачі.

---

# 73. `useRef` vs `useEffect`

Ці Hooks часто використовуються разом, але виконують різні ролі.

### `useRef`

Зберігає значення:

    const ref = useRef(null);

### `useEffect`

Виконує side effect:

    useEffect(() => {
        ...
    }, []);

Разом:

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

---

# 74. `useRef` vs `useMemo`

Це також важливе порівняння.

### `useRef`

Зберігає mutable value:

    const ref = useRef(value);

    ref.current = newValue;

### `useMemo`

Мемоізує обчислене значення:

    const result = useMemo(() => {
        return expensiveCalculation(data);
    }, [data]);

Головна різниця:

    useRef → mutable storage

    useMemo → memoized calculation

---

# 75. `useRef` vs `useCallback`

### `useRef`

Зберігає значення:

    const valueRef = useRef(value);

### `useCallback`

Мемоізує function identity:

    const handleClick = useCallback(() => {
        ...
    }, [dependencies]);

Не потрібно використовувати `useRef` для звичайної задачі мемоізації callback.

---

# 76. `useRef` vs `useState` — практичний приклад

Припустимо, маємо timer.

Потрібно зберегти:

    seconds

і:

    interval ID

`seconds`:

    const [seconds, setSeconds] = useState(0);

`interval ID`:

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

Чому?

    seconds
        ↓
    показується в UI
        ↓
    useState

    interval ID
        ↓
    потрібен тільки для керування timer
        ↓
    useRef

Це дуже хороший практичний патерн.

---

# 77. Ментальна модель `useRef`

Запам'ятай:

    useState
        ↓
    "значення для UI"

    useRef
        ↓
    "значення для компонента"

Це спрощена, але дуже корисна модель.

---

# 78. Життєвий цикл ref

Для DOM:

    render
        ↓
    DOM commit
        ↓
    ref.current = DOM element
        ↓
    effects
        ↓
    component works
        ↓
    unmount
        ↓
    ref.current = null

---

# 79. `useRef` не є reactive

Це ключова властивість.

Якщо:

    ref.current = 100;

React не каже:

    "О, ref змінився — треба render."

React просто зберігає нове значення.

Тому:

    ref.current

не потрібно сприймати як state.

---

# 80. Коли `useRef` — правильний вибір

Використовуй `useRef`, якщо:

- потрібно отримати DOM element;
- потрібно викликати `focus()`;
- потрібно викликати `play()` / `pause()`;
- потрібно прокрутити елемент;
- потрібно виміряти DOM;
- потрібно зберегти timer ID;
- потрібно зберегти WebSocket;
- потрібно зберегти subscription;
- потрібно запам'ятати попереднє значення;
- потрібно зберегти mutable value між render;
- зміна значення не повинна викликати render.

---

# 81. Коли `useRef` — неправильний вибір

Не використовуй `useRef`, якщо:

- значення відображається в UI;
- зміна значення повинна викликати render;
- це звичайний component state;
- потрібно передати реактивне значення дочірньому компоненту;
- потрібно повідомити React про зміну даних.

У таких випадках часто потрібен:

    useState

---

# 82. Практичний приклад — Autofocus

    "use client";

    import { useEffect, useRef } from "react";

    export default function LoginForm() {
        const emailRef = useRef<HTMLInputElement | null>(null);

        useEffect(() => {
            emailRef.current?.focus();
        }, []);

        return (
            <form>
                <input
                    ref={emailRef}
                    type="email"
                    placeholder="Email"
                />

                <input
                    type="password"
                    placeholder="Password"
                />

                <button type="submit">
                    Login
                </button>
            </form>
        );
    }

---

# 83. Практичний приклад — Focus після помилки

    function Form() {
        const [error, setError] = useState(false);

        const inputRef = useRef<HTMLInputElement | null>(null);

        useEffect(() => {
            if (error) {
                inputRef.current?.focus();
            }
        }, [error]);

        return (
            <>
                <input ref={inputRef} />

                <button onClick={() => setError(true)}>
                    Submit
                </button>
            </>
        );
    }

Тут:

    error

є state, тому що він впливає на поведінку UI.

А:

    inputRef

є ref, тому що він потрібен для доступу до DOM.

---

# 84. Практичний приклад — Scroll до помилки

    function Form() {
        const errorRef = useRef<HTMLDivElement | null>(null);

        const showError = () => {
            errorRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        };

        return (
            <>
                <button onClick={showError}>
                    Show error
                </button>

                <div ref={errorRef}>
                    Error message
                </div>
            </>
        );
    }

---

# 85. Практичний приклад — попереднє значення

    function Price({
        price,
    }: {
        price: number;
    }) {
        const previousPrice = useRef<number | undefined>();

        useEffect(() => {
            previousPrice.current = price;
        }, [price]);

        return (
            <div>
                <p>Current: {price}</p>
                <p>
                    Previous: {previousPrice.current ?? "—"}
                </p>
            </div>
        );
    }

---

# 86. Практичний приклад — timer

    function Timer() {
        const [seconds, setSeconds] = useState(0);

        const timerRef =
            useRef<ReturnType<typeof setInterval> | null>(null);

        const start = () => {
            if (timerRef.current !== null) {
                return;
            }

            timerRef.current = setInterval(() => {
                setSeconds((value) => value + 1);
            }, 1000);
        };

        const stop = () => {
            if (timerRef.current !== null) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };

        useEffect(() => {
            return () => {
                if (timerRef.current !== null) {
                    clearInterval(timerRef.current);
                }
            };
        }, []);

        return (
            <>
                <p>{seconds}</p>

                <button onClick={start}>
                    Start
                </button>

                <button onClick={stop}>
                    Stop
                </button>
            </>
        );
    }

---

# 87. Практичний приклад — video player

    function VideoPlayer() {
        const videoRef = useRef<HTMLVideoElement | null>(null);

        return (
            <>
                <video
                    ref={videoRef}
                    src="/video.mp4"
                />

                <button
                    onClick={() => {
                        videoRef.current?.play();
                    }}
                >
                    Play
                </button>

                <button
                    onClick={() => {
                        videoRef.current?.pause();
                    }}
                >
                    Pause
                </button>
            </>
        );
    }

---

# 88. Практичний приклад — controlled input + ref

    function SearchInput() {
        const [value, setValue] = useState("");

        const inputRef = useRef<HTMLInputElement | null>(null);

        const clear = () => {
            setValue("");
            inputRef.current?.focus();
        };

        return (
            <div>
                <input
                    ref={inputRef}
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                />

                <button onClick={clear}>
                    Clear
                </button>
            </div>
        );
    }

Тут дуже добре видно різницю:

    value
        ↓
    useState

    inputRef
        ↓
    useRef

---

# 89. Практичний приклад — WebSocket

Спрощений приклад:

    function Chat() {
        const socketRef = useRef<WebSocket | null>(null);

        useEffect(() => {
            const socket = new WebSocket(
                "wss://example.com"
            );

            socketRef.current = socket;

            return () => {
                socket.close();
                socketRef.current = null;
            };
        }, []);

        const sendMessage = () => {
            socketRef.current?.send("Hello");
        };

        return (
            <button onClick={sendMessage}>
                Send
            </button>
        );
    }

Тут WebSocket — зовнішній об'єкт, який повинен переживати render.

---

# 90. Практичний приклад — зберігання попереднього render

    function Example({ value }: { value: number }) {
        const renderCount = useRef(0);

        renderCount.current += 1;

        return (
            <p>
                Render count: {renderCount.current}
            </p>
        );
    }

Кожен render збільшує ref.

Але важливо розуміти:

    renderCount.current += 1

не викликає render.

Render уже відбувся.

---

# 91. Типові помилки

## Помилка 1 — очікувати оновлення UI

    const valueRef = useRef(0);

    valueRef.current += 1;

UI не оновиться.

---

## Помилка 2 — використовувати ref замість state

    const [value, setValue] = useState("");

для UI правильніше, ніж:

    const valueRef = useRef("");

---

## Помилка 3 — забути `.current`

Неправильно:

    inputRef.focus();

Правильно:

    inputRef.current?.focus();

---

## Помилка 4 — небезпечний `!`

    inputRef.current!.focus();

Краще:

    inputRef.current?.focus();

---

## Помилка 5 — маніпулювати DOM замість state

Погано:

    elementRef.current!.textContent = "Hello";

Краще:

    setText("Hello");

і:

    <p>{text}</p>

---

## Помилка 6 — очікувати reactive behavior

    ref.current = newValue;

не запускає render.

---

## Помилка 7 — неправильна типізація

Неправильно:

    const inputRef = useRef<HTMLInputElement>(null);

У TypeScript тип ref повинен враховувати `null`:

    const inputRef = useRef<HTMLInputElement | null>(null);

---

# 92. `useRef` і React mental model

React-компонент можна умовно уявити так:

    props
      +
    state
      ↓
    render
      ↓
    UI

А `ref` знаходиться трохи збоку:

    props
      +
    state
      ↓
    render
      ↓
    UI
      ↑
    ref

Ref не є звичайним джерелом reactive UI.

Він дозволяє компоненту зберігати mutable value або отримувати доступ до DOM.

---

# 93. Головна різниця між state і ref

Запам'ятай цю пару:

    state:
    "React, значення змінилося — онови UI."

    ref:
    "React, просто збережи це значення для мене."

Це одна з найкорисніших ментальних моделей для `useRef`.

---

# 94. Питання зі співбесіди

### Що таке `useRef`?

`useRef` — це React Hook, який повертає mutable object із властивістю `.current`. Значення зберігається між render і зміна `.current` не викликає re-render.

---

### Для чого використовують `useRef`?

Основні випадки:

- доступ до DOM;
- focus;
- scroll;
- вимірювання DOM;
- timer ID;
- попереднє значення;
- WebSocket;
- subscriptions;
- інші mutable values.

---

### Чим `useRef` відрізняється від `useState`?

`useState` викликає re-render після зміни state.

`useRef` не викликає re-render після зміни `.current`.

---

### Що знаходиться всередині ref?

Об'єкт:

    {
        current: value
    }

---

### Чому використовується `.current`?

Тому що `useRef()` повертає об'єкт-контейнер, а значення зберігається в його властивості:

    ref.current

---

### Чи викликає зміна `ref.current` render?

Ні.

    ref.current = newValue;

не викликає re-render.

---

### Чи зберігається ref між render?

Так.

Один і той самий ref object зберігається протягом життя компонента.

---

### Чи можна використовувати `useRef` для state?

Технічно можна зберігати значення, але якщо UI повинен реагувати на його зміну — потрібно використовувати `useState`.

---

### Для чого потрібен DOM ref?

Щоб отримати доступ до DOM-елемента та виконати imperative operations:

    focus()
    blur()
    play()
    pause()
    scrollIntoView()

---

### Чому DOM ref часто має тип `T | null`?

Тому що до монтування DOM-елемент ще не існує, а після unmount ref може бути `null`.

---

### Чи можна змінювати `ref.current`?

Так.

    ref.current = newValue;

Саме тому ref називають mutable value.

---

### Чи потрібно додавати `ref.current` у dependency array?

Зазвичай ні. Зміна `ref.current` не є реактивною зміною і сама по собі не запускає effect.

---

### Чи можна використовувати `useRef` всередині `if`?

Ні.

Hooks потрібно викликати на верхньому рівні компонента.

---

# 95. Шлях вивчення

## 🟢 Core

Спочатку потрібно добре знати:

- `useRef`;
- `.current`;
- ref vs state;
- DOM refs;
- `focus()`;
- `scrollIntoView()`;
- TypeScript `T | null`;
- ref + `useEffect`.

---

## 🔵 Junior

Далі:

- previous value;
- timer IDs;
- `setTimeout`;
- `setInterval`;
- controlled input + ref;
- video/audio refs;
- callback refs;
- cleanup timer;
- basic stale closure problems.

---

## 🟠 Middle

Потім:

- refs + subscriptions;
- WebSocket;
- third-party libraries;
- mutable values;
- stale closures;
- ref collections;
- forwarded refs;
- reusable components;
- imperative APIs;
- розуміння, коли ref краще за state.

---

## 🔴 Senior

Глибше:

- imperative handles;
- складні ref architectures;
- external systems;
- subscription patterns;
- concurrency considerations;
- integration with third-party DOM libraries;
- правильне розділення декларативної та imperative логіки;
- design reusable components without unnecessary refs;
- розуміння, коли ref є симптомом неправильного component design.

---

# 96. Міні-шпаргалка

    import { useRef } from "react";

    const ref = useRef(initialValue);

    ref.current

Змінити:

    ref.current = newValue;

---

### DOM

    const inputRef = useRef<HTMLInputElement | null>(null);

    <input ref={inputRef} />

    inputRef.current?.focus();

---

### Scroll

    elementRef.current?.scrollIntoView();

---

### Timer

    const timerRef =
        useRef<ReturnType<typeof setTimeout> | null>(null);

---

### Interval

    const intervalRef =
        useRef<ReturnType<typeof setInterval> | null>(null);

---

### Previous value

    const previousRef = useRef<T | undefined>();

    useEffect(() => {
        previousRef.current = value;
    }, [value]);

---

### State vs Ref

    useState
        ↓
    зміна → re-render

    useRef
        ↓
    зміна .current → без re-render

---

# 97. Найважливіша таблиця

| Завдання | Що використовувати |
|---|---|
| Показати значення в UI | `useState` |
| Змінити UI після зміни значення | `useState` |
| Зберегти значення між render | `useRef` |
| Не викликати render при зміні | `useRef` |
| Отримати DOM element | `useRef` |
| Focus input | `useRef` |
| Scroll до element | `useRef` |
| Play/pause video | `useRef` |
| Зберегти timer ID | `useRef` |
| Зберегти WebSocket | `useRef` |
| Зберегти previous value | `useRef` |
| Обчислити derived value | звичайний JS / `useMemo` за потреби |
| Виконати side effect | `useEffect` |

---

# 98. `useRef` у зв'язці з іншими Hooks

У реальному React-коді часто зустрічається:

    useState
        +
    useRef
        +
    useEffect

Наприклад:

    function Search() {
        const [query, setQuery] = useState("");

        const inputRef =
            useRef<HTMLInputElement | null>(null);

        useEffect(() => {
            inputRef.current?.focus();
        }, []);

        return (
            <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                    setQuery(event.target.value);
                }}
            />
        );
    }

Тут кожен Hook має свою роль:

    useState
        ↓
    data для UI

    useRef
        ↓
    доступ до DOM

    useEffect
        ↓
    side effect після render

Це дуже важлива модель для подальшого вивчення React.

---

# 99. Головне

`useRef` — це не просто "спосіб отримати DOM".

Його правильніше розуміти як:

> **стабільний mutable контейнер, який зберігається між render і зміна якого не викликає re-render.**

Найважливіша конструкція:

    const ref = useRef(value);

    ref.current

Найважливіше правило:

    useState
        ↓
    зміна повинна оновити UI

    useRef
        ↓
    значення повинно пережити render,
    але зміна не повинна оновлювати UI

Для DOM:

    const inputRef = useRef<HTMLInputElement | null>(null);

    <input ref={inputRef} />

    inputRef.current?.focus();

Для timer:

    const timerRef =
        useRef<ReturnType<typeof setTimeout> | null>(null);

Для previous value:

    const previousRef = useRef<T | undefined>();

    useEffect(() => {
        previousRef.current = value;
    }, [value]);

Для Next.js App Router:

    "use client";

    import { useRef } from "react";

---

# 100. Підсумкова ментальна модель

Запам'ятай три основні ролі:

    useState
        ↓
    "Мені потрібно зберегти дані
     і оновлювати UI."

    useRef
        ↓
    "Мені потрібно зберегти значення
     між render, але не оновлювати UI
     через його зміну."

    useEffect
        ↓
    "Мені потрібно синхронізувати компонент
     із зовнішньою системою після render."

Разом:

    state
      ↓
    render
      ↓
    DOM
      ↑
    ref
      ↓
    imperative access

і:

    render
      ↓
    useEffect
      ↓
    external system

Саме розуміння цієї взаємодії між `useState`, `useRef` та `useEffect` є фундаментом для подальшого вивчення React Hooks.