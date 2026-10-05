# 02. DOM Refs

DOM refs — це спосіб у React отримати пряме посилання на DOM-елемент через `ref`.

React зазвичай працює декларативно:

    state
        ↓
    render
        ↓
    DOM

Але іноді потрібно виконати imperative operation безпосередньо над DOM:

    focus()
    blur()
    select()
    scrollIntoView()
    getBoundingClientRect()
    play()
    pause()
    click()

Для таких задач використовуються refs.

Найчастіше DOM ref створюється через:

    useRef()

і передається елементу:

    ref={elementRef}

Після монтування DOM element доступний через:

    elementRef.current

---

### Ключові поняття

✔ DOM  
✔ DOM node  
✔ DOM element  
✔ DOM ref  
✔ `useRef`  
✔ `ref`  
✔ `.current`  
✔ `HTMLInputElement`  
✔ `HTMLButtonElement`  
✔ `HTMLDivElement`  
✔ mount  
✔ unmount  
✔ focus  
✔ blur  
✔ select  
✔ scroll  
✔ `scrollIntoView()`  
✔ `getBoundingClientRect()`  
✔ imperative DOM API  
✔ declarative React  
✔ DOM measurement  
✔ uncontrolled input  
✔ ref lifecycle  
✔ null ref  
✔ callback ref  
✔ DOM synchronization  

---

### Що потрібно пам'ятати

• React рекомендує описувати UI декларативно.

• DOM refs потрібні тоді, коли потрібно безпосередньо взаємодіяти з DOM.

• DOM ref найчастіше створюється:

    const inputRef = useRef(null);

• Потім ref передається DOM element:

    <input ref={inputRef} />

• Після mount:

    inputRef.current

може містити DOM node.

• До mount `ref.current` може бути `null`.

• Після unmount DOM ref знову стає `null`.

• Через DOM ref можна викликати DOM API.

• Типові приклади:

    focus()
    blur()
    select()
    scrollIntoView()
    getBoundingClientRect()

• DOM refs не повинні використовуватися для заміни React state.

• Якщо UI повинен реагувати на зміну даних — зазвичай потрібен `useState`.

• Ref — це escape hatch із декларативної моделі React до imperative DOM API.

---

# Що таке DOM

DOM — Document Object Model.

Браузер перетворює HTML на дерево об'єктів.

Наприклад:

    <div>
        <h1>Hello</h1>
        <button>Click</button>
    </div>

Умовно:

    div
    ├── h1
    │   └── "Hello"
    │
    └── button
        └── "Click"

Кожен DOM element представлений JavaScript object.

Наприклад:

    HTMLDivElement

або:

    HTMLInputElement

або:

    HTMLButtonElement

---

# React та DOM

React створює та оновлює DOM на основі component rendering.

Наприклад:

    function App() {
        return (
            <h1>Hello</h1>
        );
    }

React створює відповідний DOM element.

У звичайному React-коді нам не потрібно вручну робити:

    document.createElement()

або:

    element.appendChild()

React робить це за нас.

---

# Declarative UI

React заохочує декларативний підхід.

Наприклад:

    function App() {
        const [isVisible, setIsVisible] = useState(true);

        return (
            <>
                <button onClick={() => setIsVisible(false)}>
                    Hide
                </button>

                {isVisible && <p>Hello</p>}
            </>
        );
    }

Ми описуємо:

    якщо isVisible === true
        ↓
    показати <p>

React сам змінює DOM.

---

# Imperative DOM

Іноді потрібно сказати браузеру:

    "Зроби цю конкретну DOM operation зараз."

Наприклад:

    input.focus();

або:

    element.scrollIntoView();

Це imperative code.

Тобто ми не просто описуємо:

    "UI повинен бути таким"

а наказуємо:

    "виконай цю operation"

---

# DOM Ref як міст

DOM ref є своєрідним мостом:

    React
      ↓
    ref
      ↓
    DOM node
      ↓
    browser DOM API

Наприклад:

    const inputRef = useRef(null);

    return (
        <input ref={inputRef} />
    );

Після mount:

    inputRef.current
        ↓
    input DOM element

Потім:

    inputRef.current?.focus();

---

# Створення DOM ref

Найпоширеніший pattern:

    const elementRef = useRef(null);

Наприклад:

    function Example() {
        const inputRef = useRef(null);

        return (
            <input ref={inputRef} />
        );
    }

---

# ref Attribute

JSX підтримує спеціальний атрибут:

    ref

Наприклад:

    <input ref={inputRef} />

або:

    <button ref={buttonRef}>
        Click
    </button>

або:

    <div ref={divRef}>
        Content
    </div>

`ref` не є звичайним HTML attribute.

Це спеціальний механізм React для роботи з refs.

---

# Ref Assignment

Коли React монтує:

    <input ref={inputRef} />

React встановлює:

    inputRef.current

у відповідний DOM node.

Схематично:

    inputRef
        ↓
    {
        current: input DOM node
    }

---

# До Mount

Наприклад:

    const inputRef = useRef(null);

На початку:

    inputRef.current === null

Тому не можна бездумно робити:

    inputRef.current.focus();

Якщо element ще не існує.

---

# Після Mount

Після того як:

    <input ref={inputRef} />

змонтований у DOM:

    inputRef.current

посилається на:

    HTMLInputElement

Тепер можна:

    inputRef.current?.focus();

---

# Після Unmount

Якщо element видаляється:

    {showInput && (
        <input ref={inputRef} />
    )}

і:

    showInput === false

React прибирає element.

Відповідно:

    inputRef.current

стає:

    null

---

# DOM Ref Lifecycle

Основний lifecycle:

    useRef(null)
        ↓
    current = null
        ↓
    DOM element mounts
        ↓
    current = DOM node
        ↓
    DOM element exists
        ↓
    DOM element unmounts
        ↓
    current = null

Це дуже важливо пам'ятати.

---

# Input Ref

Найтиповіший приклад:

    import { useRef } from "react";

    function Search() {
        const inputRef = useRef(null);

        return (
            <input
                ref={inputRef}
                type="text"
            />
        );
    }

Після mount:

    inputRef.current

буде input DOM element.

---

# Focus

Одна з найпоширеніших задач DOM refs — встановити focus.

    inputRef.current?.focus();

Повний приклад:

    import { useRef } from "react";

    function Search() {
        const inputRef = useRef(null);

        function handleFocus() {
            inputRef.current?.focus();
        }

        return (
            <>
                <input ref={inputRef} />

                <button onClick={handleFocus}>
                    Focus
                </button>
            </>
        );
    }

---

# Blur

Щоб прибрати focus:

    inputRef.current?.blur();

Наприклад:

    function handleBlur() {
        inputRef.current?.blur();
    }

---

# Select

Для input можна виділити текст:

    inputRef.current?.select();

Наприклад:

    function handleSelect() {
        inputRef.current?.select();
    }

---

# Focus + Select

Можна комбінувати:

    inputRef.current?.focus();

    inputRef.current?.select();

Наприклад:

    function handleEdit() {
        inputRef.current?.focus();
        inputRef.current?.select();
    }

---

# Auto Focus через Effect

Якщо потрібно автоматично встановити focus після mount:

    import { useEffect, useRef } from "react";

    function Search() {
        const inputRef = useRef(null);

        useEffect(() => {
            inputRef.current?.focus();
        }, []);

        return (
            <input ref={inputRef} />
        );
    }

Логіка:

    render
        ↓
    DOM mount
        ↓
    ref.current = input
        ↓
    effect
        ↓
    focus()

---

# Чому focus не роблять під час render

Не слід робити imperative DOM operation безпосередньо під час render:

    function Component() {
        const inputRef = useRef(null);

        inputRef.current?.focus();

        return (
            <input ref={inputRef} />
        );
    }

Під час render DOM ref може ще не бути доступним.

Краще виконати operation:

    event handler

або:

    effect

---

# Event Handler + DOM Ref

Це хороший pattern:

    const inputRef = useRef(null);

    function handleFocus() {
        inputRef.current?.focus();
    }

    return (
        <>
            <input ref={inputRef} />

            <button onClick={handleFocus}>
                Focus
            </button>
        </>
    );

Тут DOM element уже існує, коли користувач натискає кнопку.

---

# Scroll Into View

DOM ref можна використовувати для прокрутки до element.

    elementRef.current?.scrollIntoView();

Наприклад:

    import { useRef } from "react";

    function Page() {
        const sectionRef = useRef(null);

        function handleScroll() {
            sectionRef.current?.scrollIntoView();
        }

        return (
            <>
                <button onClick={handleScroll}>
                    Go to section
                </button>

                <div style={{ height: "1000px" }}>
                    Content
                </div>

                <section ref={sectionRef}>
                    Target
                </section>
            </>
        );
    }

---

# Smooth Scroll

Можна використати options:

    elementRef.current?.scrollIntoView({
        behavior: "smooth"
    });

Наприклад:

    function handleScroll() {
        sectionRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }

---

# Scroll Options

Типовий варіант:

    elementRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

Можна контролювати:

    behavior
    block
    inline

---

# DOM Measurement

DOM ref можна використовувати для вимірювання element.

Наприклад:

    const elementRef = useRef(null);

    const rect =
        elementRef.current?.getBoundingClientRect();

Метод:

    getBoundingClientRect()

повертає інформацію про розміри та позицію element.

---

# getBoundingClientRect

Наприклад:

    const rect =
        elementRef.current?.getBoundingClientRect();

Можна отримати:

    rect.width
    rect.height
    rect.top
    rect.bottom
    rect.left
    rect.right

Також:

    rect.x
    rect.y

---

# Measurement Example

    import { useEffect, useRef } from "react";

    function Box() {
        const boxRef = useRef(null);

        useEffect(() => {
            const box = boxRef.current;

            if (!box) {
                return;
            }

            const rect = box.getBoundingClientRect();

            console.log("width:", rect.width);
            console.log("height:", rect.height);
        }, []);

        return (
            <div ref={boxRef}>
                Box
            </div>
        );
    }

---

# DOM Ref для classList

Ref можна використовувати для DOM API.

Наприклад:

    elementRef.current?.classList.add("active");

Але в React це часто не найкращий підхід.

Якщо клас залежить від state, краще:

    className={isActive ? "active" : ""}

Тобто:

    state → className

часто краще, ніж:

    ref → classList

---

# React vs Manual DOM Manipulation

Неправильний підхід, якщо клас залежить від state:

    elementRef.current?.classList.add("active");

Краще:

    const [isActive, setIsActive] = useState(false);

    return (
        <div className={isActive ? "active" : ""}>
            ...
        </div>
    );

React сам синхронізує:

    state
        ↓
    className
        ↓
    DOM

---

# DOM Ref не замінює State

Наприклад, потрібно показувати / приховувати modal.

Не обов'язково:

    modalRef.current.style.display = "none";

Краще:

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)}>
                Open
            </button>

            {isOpen && <Modal />}
        </>
    );

DOM ref потрібен тоді, коли imperative DOM API дійсно необхідний.

---

# DOM Ref та Input Value

Ref можна використовувати для читання value uncontrolled input.

    const inputRef = useRef(null);

    const value = inputRef.current?.value;

Наприклад:

    function Form() {
        const inputRef = useRef(null);

        function handleSubmit(event) {
            event.preventDefault();

            const value = inputRef.current?.value;

            console.log(value);
        }

        return (
            <form onSubmit={handleSubmit}>
                <input ref={inputRef} />

                <button type="submit">
                    Submit
                </button>
            </form>
        );
    }

---

# Controlled Input

Controlled input використовує React state:

    const [value, setValue] = useState("");

    return (
        <input
            value={value}
            onChange={event => {
                setValue(event.target.value);
            }}
        />
    );

Тут:

    state
      ↓
    value
      ↓
    input

---

# Uncontrolled Input

Uncontrolled input зберігає value у DOM:

    const inputRef = useRef(null);

    return (
        <input ref={inputRef} />
    );

Отримання:

    const value = inputRef.current?.value;

Тут:

    DOM
      ↓
    input value

---

# Controlled vs Uncontrolled

Controlled:

    React state
        ↓
    input value

Uncontrolled:

    DOM
        ↓
    input value

DOM ref часто використовується для uncontrolled components.

---

# Button Ref

Ref можна встановити на button:

    const buttonRef = useRef(null);

    return (
        <button ref={buttonRef}>
            Submit
        </button>
    );

Наприклад:

    buttonRef.current?.focus();

---

# Div Ref

    const divRef = useRef(null);

    return (
        <div ref={divRef}>
            Content
        </div>
    );

Наприклад:

    divRef.current?.scrollIntoView();

---

# Form Ref

Можна отримати form element:

    const formRef = useRef(null);

    return (
        <form ref={formRef}>
            ...
        </form>
    );

DOM API:

    formRef.current?.reset();

---

# Video Ref

Refs особливо корисні для media elements.

Наприклад:

    const videoRef = useRef(null);

    return (
        <video ref={videoRef} controls>
            ...
        </video>
    );

Можна викликати:

    videoRef.current?.play();

або:

    videoRef.current?.pause();

---

# Audio Ref

Так само:

    const audioRef = useRef(null);

    return (
        <audio ref={audioRef} controls>
            ...
        </audio>
    );

Можна:

    audioRef.current?.play();

    audioRef.current?.pause();

Це хороший приклад imperative browser API.

---

# Canvas Ref

Для `<canvas>` ref особливо корисний, тому що canvas часто управляється imperative API.

    const canvasRef = useRef(null);

    return (
        <canvas ref={canvasRef} />
    );

Можна отримати:

    const canvas = canvasRef.current;

Потім:

    const context =
        canvas?.getContext("2d");

Canvas буде детальніше розглядатися при роботі з browser APIs / graphics.

---

# DOM Ref та Third-Party Libraries

DOM refs часто потрібні при інтеграції React із бібліотеками, які очікують DOM node.

Схема:

    React component
          ↓
        useRef
          ↓
      DOM element
          ↓
    third-party library

Наприклад:

    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        // initialize third-party library
    }, []);

    return (
        <div ref={containerRef} />
    );

---

# Imperative Escape Hatch

DOM ref називають escape hatch.

Тобто це механізм, який дозволяє вийти за межі звичайної декларативної React-моделі.

Основна модель:

    state
       ↓
    render
       ↓
    DOM

Escape hatch:

    ref
       ↓
    DOM node
       ↓
    imperative API

Refs потрібні, але ними не слід зловживати.

---

# Коли використовувати DOM Ref

DOM ref доречний для:

• focus management;

• text selection;

• scrolling;

• DOM measurement;

• media control;

• canvas;

• інтеграції з third-party DOM libraries;

• browser APIs;

• imperative animations;

• interaction з DOM API, яку складно або недоречно виразити через state.

---

# Коли НЕ використовувати DOM Ref

Не потрібно використовувати DOM ref лише тому, що можна.

Наприклад, не варто робити:

    elementRef.current.style.display = "none";

якщо задача легко вирішується React state.

Краще:

    {isVisible && <Element />}

Або:

    className={isActive ? "active" : ""}

---

# DOM Ref vs State

Наприклад:

Потрібно:

    показати modal

Краще:

    const [isOpen, setIsOpen] = useState(false);

Потрібно:

    сфокусувати input

Краще:

    inputRef.current?.focus();

Тобто:

    UI state → useState

    imperative DOM action → useRef

---

# DOM Ref vs document.querySelector

У звичайному JavaScript можна:

    const input =
        document.querySelector("#search");

У React зазвичай краще:

    const inputRef = useRef(null);

    return (
        <input ref={inputRef} />
    );

І потім:

    inputRef.current

---

# Чому ref краще за querySelector

`querySelector` шукає element у всьому document.

Ref:

    прив'язаний до конкретного element

Це краще відповідає component-based архітектурі React.

Замість:

    document.querySelector("#input")

можна:

    inputRef.current

---

# DOM Query vs React Ref

Звичайний JavaScript:

    const element =
        document.querySelector(".box");

React:

    const elementRef = useRef(null);

    return (
        <div ref={elementRef}>
            ...
        </div>
    );

React знає, який DOM element пов'язаний із component.

---

# Не використовувати ID без необхідності

Наприклад:

    document.getElementById("search");

у React часто можна замінити на:

    const searchRef = useRef(null);

    <input ref={searchRef} />

Це робить component більш автономним.

---

# Multiple DOM Elements

Якщо є декілька різних elements:

    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const sectionRef = useRef(null);

Можна:

    <input ref={inputRef} />

    <button ref={buttonRef}>
        Submit
    </button>

    <section ref={sectionRef}>
        ...
    </section>

Кожен ref відповідає своєму DOM element.

---

# Один Ref — один DOM Element

Типовий pattern:

    const inputRef = useRef(null);

    <input ref={inputRef} />

Після mount:

    inputRef.current → input

Якщо спробувати використовувати один ref для кількох elements:

    <div ref={elementRef}>
        One
    </div>

    <div ref={elementRef}>
        Two
    </div>

це не є нормальним способом зберігати список DOM nodes.

Для collections існують окремі patterns.

---

# Refs у Lists

Наприклад:

    const items = [
        "One",
        "Two",
        "Three"
    ];

Не слід просто робити:

    const itemRef = useRef(null);

і використовувати його для всіх:

    items.map(item => (
        <div ref={itemRef}>
            {item}
        </div>
    ));

Для багатьох DOM nodes потрібен окремий pattern роботи з refs.

Це буде важливо при складніших DOM interactions.

---

# Callback Ref

Окрім object ref:

    const ref = useRef(null);

React підтримує callback ref.

Синтаксис:

    <div ref={(node) => {
        ...
    }} />

Наприклад:

    function Component() {
        const handleRef = (node) => {
            console.log(node);
        };

        return (
            <div ref={handleRef}>
                Content
            </div>
        );
    }

React викликає callback, передаючи DOM node.

---

# Callback Ref та Null

Callback ref може отримати:

    DOM node

при attach.

І:

    null

при detach.

Наприклад:

    function handleRef(node) {
        if (node) {
            console.log("mounted", node);
        } else {
            console.log("unmounted");
        }
    }

---

# Object Ref vs Callback Ref

Object ref:

    const ref = useRef(null);

    <div ref={ref} />

Callback ref:

    const handleRef = (node) => {
        ...
    };

    <div ref={handleRef} />

Object ref зручний для більшості простих випадків.

Callback ref корисний, коли потрібно реагувати безпосередньо на attach / detach node.

---

# Callback Ref Example

    function Component() {
        const handleRef = (node) => {
            if (!node) {
                return;
            }

            console.log(node.getBoundingClientRect());
        };

        return (
            <div ref={handleRef}>
                Content
            </div>
        );
    }

Callback ref дозволяє виконати логіку в момент отримання DOM node.

---

# Ref Cleanup

Для DOM refs React очищує object ref, коли node більше не приєднаний.

Тобто:

    mounted
        ↓
    ref.current = DOM node

    unmounted
        ↓
    ref.current = null

Це дозволяє уникати посилання на вже неіснуючий DOM node.

---

# DOM Ref та Effect Cleanup

Якщо через DOM ref створюється зовнішній ресурс, потрібно очистити його.

Наприклад:

    useEffect(() => {
        const element = elementRef.current;

        if (!element) {
            return;
        }

        // subscribe / initialize

        return () => {
            // cleanup
        };
    }, []);

Ref дає DOM node, а effect відповідає за lifecycle side effect.

---

# Layout Measurement

Якщо потрібно виміряти DOM одразу після того, як React оновив DOM, може використовуватися:

    useLayoutEffect

разом із ref.

Наприклад:

    const boxRef = useRef(null);

    useLayoutEffect(() => {
        const box = boxRef.current;

        if (!box) {
            return;
        }

        const rect = box.getBoundingClientRect();

        console.log(rect);
    }, []);

`useLayoutEffect` буде розглядатися окремо у темах effects.

---

# useEffect vs useLayoutEffect

Загальна ідея:

    useEffect
        ↓
    side effects after render / paint timing

    useLayoutEffect
        ↓
    layout-related work before browser paint

Для звичайного DOM interaction часто достатньо:

    useEffect

Для вимірювання layout та запобігання visual flicker може знадобитися:

    useLayoutEffect

---

# Ref для DOM Measurement

Типовий pattern:

    const boxRef = useRef(null);

    useLayoutEffect(() => {
        const box = boxRef.current;

        if (!box) {
            return;
        }

        const rect = box.getBoundingClientRect();

        console.log(rect.width);
        console.log(rect.height);
    }, []);

---

# DOM Ref та Browser Events

Ref можна використовувати для додавання imperative event listeners, але в React для звичайних events краще JSX event handlers.

Наприклад:

    <button onClick={handleClick}>
        Click
    </button>

краще, ніж вручну:

    elementRef.current?.addEventListener(
        "click",
        handleClick
    );

React уже має:

    onClick
    onChange
    onFocus
    onBlur
    onSubmit

та багато інших event handlers.

---

# Коли addEventListener може бути доречним

Imperative event listener може бути потрібен для:

    window
    document
    external DOM nodes
    third-party APIs
    events, які не зручно або неможливо обробити через JSX

Наприклад:

    useEffect(() => {
        function handleResize() {
            console.log(window.innerWidth);
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

Тут ref для `window` не потрібен, тому що `window` уже є browser API.

---

# DOM Ref та Animation

DOM refs можуть використовуватися для imperative animations.

Наприклад:

    const boxRef = useRef(null);

    function handleAnimate() {
        boxRef.current?.animate(
            [
                { transform: "translateX(0)" },
                { transform: "translateX(100px)" }
            ],
            {
                duration: 500
            }
        );
    }

Це приклад інтеграції React із browser animation API.

---

# Не все потрібно робити через ref

Наприклад, animation state:

    const [isActive, setIsActive] = useState(false);

може керувати CSS:

    className={isActive ? "active" : ""}

А ref потрібен тоді, коли треба безпосередньо викликати imperative API.

---

# DOM Ref та Accessibility

Refs можуть бути корисними для accessibility.

Наприклад, після відкриття dialog можна встановити focus:

    dialogInputRef.current?.focus();

Це дозволяє керувати keyboard focus.

Особливо важливо:

    focus management
    keyboard navigation
    dialogs
    menus
    forms

---

# Focus Management

Наприклад:

    function Modal() {
        const closeButtonRef = useRef(null);

        useEffect(() => {
            closeButtonRef.current?.focus();
        }, []);

        return (
            <div role="dialog">
                <button ref={closeButtonRef}>
                    Close
                </button>
            </div>
        );
    }

Тут ref використовується не для rendering, а для керування focus.

---

# DOM Ref та Accessibility — важливе правило

Ref не повинен використовуватися для обходу accessibility.

Наприклад, не слід просто приховувати focus або створювати складну keyboard navigation без необхідності.

Краще використовувати стандартні:

    semantic HTML
    labels
    buttons
    links
    ARIA

а ref застосовувати там, де потрібен конкретний focus management.

---

# Типовий DOM Ref Pattern

    import {
        useEffect,
        useRef
    } from "react";

    function Component() {
        const elementRef = useRef(null);

        useEffect(() => {
            const element = elementRef.current;

            if (!element) {
                return;
            }

            // DOM operation
        }, []);

        return (
            <div ref={elementRef}>
                Content
            </div>
        );
    }

Основна послідовність:

    useRef
        ↓
    ref={ref}
        ↓
    DOM mount
        ↓
    ref.current
        ↓
    DOM API

---

# Типові помилки

❌ Використовувати `document.querySelector()` замість ref без необхідності.

    document.querySelector(".input");

У React краще:

    const inputRef = useRef(null);

    <input ref={inputRef} />

---

❌ Використовувати ref для UI state.

    ref.current = true;

якщо це повинно змінити UI.

Краще:

    const [isOpen, setIsOpen] = useState(false);

---

❌ Очікувати re-render після зміни ref.

    inputRef.current = ...

Ref не запускає render.

---

❌ Забувати про `null`.

    inputRef.current.focus();

Краще:

    inputRef.current?.focus();

---

❌ Викликати DOM API під час render.

    inputRef.current?.focus();

безпосередньо у render logic — поганий pattern.

Краще:

    event handler

або:

    useEffect

або:

    useLayoutEffect

залежно від задачі.

---

❌ Маніпулювати DOM там, де React state достатній.

Наприклад:

    elementRef.current.style.display = "none";

замість state-driven rendering.

---

❌ Використовувати один ref для великої колекції DOM nodes без правильного pattern.

---

❌ Забувати cleanup для imperative subscriptions / timers / observers.

---

❌ Змішувати декларативний та imperative підходи без потреби.

---

# DOM Ref Decision Tree

Потрібно змінити UI?

    YES
      ↓
    useState / props
      ↓
    render

Потрібно безпосередньо взаємодіяти з DOM?

    YES
      ↓
    useRef

Потрібно виконати operation після DOM update?

    YES
      ↓
    useEffect
    або
    useLayoutEffect

Потрібно лише прочитати input value під час submit?

    YES
      ↓
    uncontrolled input + useRef
    або controlled input + useState

---

# Практичний приклад — Search Input

    import { useRef } from "react";

    function Search() {
        const inputRef = useRef(null);

        function handleSearch() {
            const value = inputRef.current?.value;

            console.log("Search:", value);
        }

        function handleFocus() {
            inputRef.current?.focus();
        }

        return (
            <div>
                <input
                    ref={inputRef}
                    placeholder="Search..."
                />

                <button onClick={handleSearch}>
                    Search
                </button>

                <button onClick={handleFocus}>
                    Focus
                </button>
            </div>
        );
    }

---

# Практичний приклад — Scroll to Section

    import { useRef } from "react";

    function Page() {
        const targetRef = useRef(null);

        function handleClick() {
            targetRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        return (
            <>
                <button onClick={handleClick}>
                    Go to section
                </button>

                <div style={{ height: "1000px" }}>
                    Top content
                </div>

                <section ref={targetRef}>
                    Target section
                </section>
            </>
        );
    }

---

# Практичний приклад — Video Controls

    import { useRef } from "react";

    function VideoPlayer() {
        const videoRef = useRef(null);

        function handlePlay() {
            videoRef.current?.play();
        }

        function handlePause() {
            videoRef.current?.pause();
        }

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

Тут React component керує browser media API через DOM ref.

---

# Практичний приклад — DOM Measurement

    import {
        useLayoutEffect,
        useRef
    } from "react";

    function Box() {
        const boxRef = useRef(null);

        useLayoutEffect(() => {
            const box = boxRef.current;

            if (!box) {
                return;
            }

            const rect = box.getBoundingClientRect();

            console.log({
                width: rect.width,
                height: rect.height,
                top: rect.top,
                left: rect.left
            });
        }, []);

        return (
            <div ref={boxRef}>
                Content
            </div>
        );
    }

---

# Практичний приклад — Focus після відкриття

    import {
        useEffect,
        useRef,
        useState
    } from "react";

    function SearchPanel() {
        const [isOpen, setIsOpen] = useState(false);
        const inputRef = useRef(null);

        useEffect(() => {
            if (isOpen) {
                inputRef.current?.focus();
            }
        }, [isOpen]);

        return (
            <>
                <button
                    onClick={() => setIsOpen(true)}
                >
                    Open search
                </button>

                {isOpen && (
                    <input
                        ref={inputRef}
                        placeholder="Search..."
                    />
                )}
            </>
        );
    }

Тут:

    state
        ↓
    isOpen
        ↓
    DOM appears
        ↓
    ref.current
        ↓
    effect
        ↓
    focus()

Це хороший приклад спільного використання:

    useState
    useRef
    useEffect

---

# Практичний приклад — Form Reset

    import { useRef } from "react";

    function Form() {
        const formRef = useRef(null);

        function handleReset() {
            formRef.current?.reset();
        }

        return (
            <form ref={formRef}>
                <input name="name" />

                <button type="button" onClick={handleReset}>
                    Reset
                </button>
            </form>
        );
    }

---

# Практичний приклад — Input Selection

    import { useRef } from "react";

    function Input() {
        const inputRef = useRef(null);

        function handleSelect() {
            inputRef.current?.select();
        }

        return (
            <>
                <input
                    ref={inputRef}
                    defaultValue="Select this text"
                />

                <button onClick={handleSelect}>
                    Select text
                </button>
            </>
        );
    }

---

# Практичний приклад — Dialog Focus

    import {
        useEffect,
        useRef
    } from "react";

    function Dialog() {
        const closeButtonRef = useRef(null);

        useEffect(() => {
            closeButtonRef.current?.focus();
        }, []);

        return (
            <div
                role="dialog"
                aria-modal="true"
            >
                <h2>Dialog</h2>

                <button ref={closeButtonRef}>
                    Close
                </button>
            </div>
        );
    }

Це приклад focus management.

---

# Практичний приклад — Third-party DOM Integration

    import {
        useEffect,
        useRef
    } from "react";

    function Chart() {
        const containerRef = useRef(null);

        useEffect(() => {
            const container = containerRef.current;

            if (!container) {
                return;
            }

            // initialize third-party library
            // library(container)

            return () => {
                // cleanup library
            };
        }, []);

        return (
            <div ref={containerRef} />
        );
    }

Основна ідея:

    React
       ↓
    DOM ref
       ↓
    third-party library

---

# Ref та TypeScript

У TypeScript DOM ref часто типізують відповідно до DOM element.

Наприклад:

    const inputRef =
        useRef<HTMLInputElement | null>(null);

Для button:

    const buttonRef =
        useRef<HTMLButtonElement | null>(null);

Для div:

    const divRef =
        useRef<HTMLDivElement | null>(null);

---

# TypeScript — Input Ref

    const inputRef =
        useRef<HTMLInputElement | null>(null);

Тоді:

    inputRef.current

має тип:

    HTMLInputElement | null

Тому TypeScript змушує враховувати `null`.

Наприклад:

    inputRef.current?.focus();

---

# TypeScript — Button Ref

    const buttonRef =
        useRef<HTMLButtonElement | null>(null);

Можна:

    buttonRef.current?.focus();

---

# TypeScript — Div Ref

    const divRef =
        useRef<HTMLDivElement | null>(null);

Можна:

    divRef.current?.scrollIntoView();

---

# Тип DOM Element

Поширені типи:

    HTMLInputElement
    HTMLButtonElement
    HTMLDivElement
    HTMLFormElement
    HTMLTextAreaElement
    HTMLSelectElement
    HTMLVideoElement
    HTMLAudioElement
    HTMLCanvasElement

---

# Generic useRef

У TypeScript:

    useRef<HTMLInputElement | null>(null)

можна читати як:

    useRef
      ↓
    ref для HTMLInputElement
      ↓
    initial value = null

---

# Чому | null

Тому що до mount element ще не існує.

Тобто:

    HTMLInputElement | null

означає:

    або input element
    або null

Саме тому типовий доступ:

    inputRef.current?.focus();

---

# Non-null Assertion

Можна побачити:

    inputRef.current!.focus();

`!` каже TypeScript:

    "Я впевнений, що тут не null."

Але використовувати це потрібно обережно.

Безпечніше часто:

    inputRef.current?.focus();

або:

    if (inputRef.current) {
        inputRef.current.focus();
    }

---

# DOM Ref — TypeScript Pattern

Типовий варіант:

    const inputRef =
        useRef<HTMLInputElement | null>(null);

    return (
        <input ref={inputRef} />
    );

Потім:

    inputRef.current?.focus();

---

# useRef та DOM Node

Ref не обов'язково означає саме:

    HTMLElement

Він може містити різні browser objects.

Наприклад:

    HTMLInputElement
    HTMLVideoElement
    HTMLCanvasElement

або навіть не-DOM mutable value:

    timer ID
    observer
    external instance

Тому потрібно розуміти, що `useRef` — загальний механізм persistent mutable storage, а DOM ref — лише один із його use cases.

---

# Interview Questions

Що таке DOM ref?

Як створити DOM ref у React?

Як передати ref DOM element?

Що знаходиться в `ref.current` після mount?

Що знаходиться в `ref.current` до mount?

Що відбувається з ref після unmount?

Як сфокусувати input через ref?

Як прибрати focus через ref?

Як виділити текст input?

Як прокрутити сторінку до element?

Що робить `scrollIntoView()`?

Як виміряти DOM element?

Що робить `getBoundingClientRect()`?

Чим DOM ref відрізняється від `document.querySelector()`?

Коли використовувати DOM ref замість `querySelector()`?

Чому не слід використовувати ref для звичайного UI state?

Що таке imperative DOM manipulation?

Що означає "escape hatch" у React?

Що таке uncontrolled input?

Як отримати value uncontrolled input через ref?

Чим controlled input відрізняється від uncontrolled input?

Коли використовувати `useEffect` разом із DOM ref?

Коли може знадобитися `useLayoutEffect`?

Що таке callback ref?

Чим callback ref відрізняється від object ref?

Як працюють refs у lifecycle компонента?

Як типізувати DOM ref у TypeScript?

Чому DOM ref має тип:

    HTMLInputElement | null

Як працювати з DOM refs у списках?

Чому не слід використовувати один ref для багатьох DOM elements?

Як використовувати ref для video?

Як використовувати ref для canvas?

Як інтегрувати third-party DOM library з React?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке DOM.

Що таке DOM element.

Що таке DOM ref.

Створення:

    const ref = useRef(null);

Передача:

    <input ref={ref} />

Доступ:

    ref.current

Розуміння:

    null → DOM node → null

Після mount:

    ref.current → DOM element

Після unmount:

    ref.current → null

Основні DOM APIs:

    focus()
    blur()
    select()
    scrollIntoView()

Розуміння:

    useRef
        ↓
    DOM node
        ↓
    imperative API

---

🔵 Junior

Практично використовувати:

    input refs
    button refs
    form refs
    section refs

Focus management.

Uncontrolled inputs.

Scrolling.

Text selection.

DOM measurement.

    getBoundingClientRect()

Media refs:

    video
    audio

Розуміння:

    useRef + useEffect

Розуміння:

    declarative vs imperative

Розуміння:

    React state vs DOM manipulation

Розуміння:

    ref vs querySelector

TypeScript DOM refs:

    useRef<HTMLInputElement | null>(null)

Callback refs.

Основи accessibility focus management.

---

🟠 Middle

Глибше розуміння:

    ref lifecycle
    callback refs
    DOM measurement
    useLayoutEffect
    imperative APIs

Інтеграція:

    third-party DOM libraries
    canvas
    media APIs
    animations
    browser APIs

Робота з:

    multiple DOM nodes
    refs in lists
    dynamic refs

Розуміння:

    React commit phase
    DOM attachment
    ref cleanup

Розуміння trade-offs:

    React state
    DOM state
    imperative APIs

---

🔴 Senior

Глибоке розуміння:

    React rendering model
    commit phase
    ref attachment
    ref cleanup
    concurrent rendering
    Strict Mode

Advanced DOM integration.

Third-party library lifecycle.

Imperative animation systems.

Complex focus management.

Accessible dialogs.

Keyboard navigation.

DOM measurement without visual flicker.

Layout synchronization.

Performance implications of:

    DOM reads
    DOM writes
    layout measurement

Розуміння:

    layout thrashing
    batching
    browser rendering pipeline

Інтеграція React із:

    Web APIs
    Canvas
    Web Animations API
    Media APIs
    ResizeObserver
    IntersectionObserver

---

# Міні-шпаргалка

## Створити DOM ref

    const inputRef =
        useRef<HTMLInputElement | null>(null);

---

## Передати ref

    <input ref={inputRef} />

---

## Отримати DOM element

    inputRef.current

---

## Focus

    inputRef.current?.focus();

---

## Blur

    inputRef.current?.blur();

---

## Select

    inputRef.current?.select();

---

## Scroll

    elementRef.current?.scrollIntoView({
        behavior: "smooth"
    });

---

## Measure

    const rect =
        elementRef.current?.getBoundingClientRect();

---

## Input value

    const value =
        inputRef.current?.value;

---

## Form reset

    formRef.current?.reset();

---

## Video

    videoRef.current?.play();

    videoRef.current?.pause();

---

## Callback ref

    const handleRef = (node) => {
        if (node) {
            console.log(node);
        }
    };

    <div ref={handleRef} />

---

## Ref lifecycle

    before mount
        ↓
    null

    after mount
        ↓
    DOM node

    after unmount
        ↓
    null

---

## DOM ref vs state

    UI data
        ↓
    useState

    DOM reference
        ↓
    useRef

---

## Declarative vs imperative

    React state
        ↓
    render
        ↓
    UI

    useRef
        ↓
    DOM node
        ↓
    imperative API

---

# Основні правила

    useState
        → UI state

    useRef
        → persistent mutable value

    DOM ref
        → DOM node

    ref.current
        → current DOM node / stored value

    focus()
        → focus element

    blur()
        → remove focus

    select()
        → select input text

    scrollIntoView()
        → scroll to element

    getBoundingClientRect()
        → measure element

---

# Головне:

• DOM ref дозволяє отримати прямий доступ до DOM element.

• У React DOM ref найчастіше створюється через:

    useRef(null)

• Ref передається через:

    ref={ref}

• Після mount:

    ref.current

містить відповідний DOM node.

• До mount:

    ref.current === null

• Після unmount:

    ref.current === null

• DOM refs використовуються для imperative DOM operations.

• Найпоширеніші operations:

    focus()
    blur()
    select()
    scrollIntoView()
    getBoundingClientRect()

• `useRef` не викликає re-render при зміні `.current`.

• DOM ref не є заміною `useState`.

• Якщо потрібно змінити UI — краще використовувати:

    state
    props

• Якщо потрібно виконати imperative operation над DOM — можна використовувати:

    ref

• У React краще використовувати refs, ніж безпосередньо:

    document.querySelector()

для доступу до DOM elements, які належать компоненту.

• React refs добре підходять для:

    focus management
    scrolling
    text selection
    measurements
    media control
    canvas
    third-party DOM libraries

• Не слід використовувати DOM manipulation, якщо та сама задача природно вирішується через React state.

• Наприклад, замість:

    elementRef.current.style.display = "none";

часто краще:

    {isVisible && <Element />}

• Controlled input:

    useState
        ↓
    value
        ↓
    input

• Uncontrolled input:

    DOM
        ↓
    ref.current.value

• Для TypeScript DOM ref типовий запис:

    const inputRef =
        useRef<HTMLInputElement | null>(null);

• `null` необхідний, тому що DOM element не існує до mount.

• Callback ref — альтернативний спосіб отримувати DOM node.

• `useEffect` часто використовується разом із ref для виконання DOM operation після mount або update.

• `useLayoutEffect` може бути потрібний для layout measurement та інших DOM operations, які повинні відбутися до browser paint.

• DOM ref — це escape hatch із декларативної моделі React.

---

# Найкоротша модель для запам'ятовування

    const inputRef = useRef(null);

            ↓

    <input ref={inputRef} />

            ↓

       DOM mounts

            ↓

    inputRef.current

            ↓

    HTMLInputElement

            ↓

    inputRef.current?.focus();

---

# DOM Ref Mental Model

    React component
          ↓
       useRef()
          ↓
       ref object
          ↓
       ref={ref}
          ↓
      DOM element
          ↓
    ref.current
          ↓
     DOM API
          ↓
    focus / scroll /
    measure / play /
    select / etc.

---

# Основна формула

    useRef(null)
          ↓
    ref={elementRef}
          ↓
    mount
          ↓
    elementRef.current = DOM node
          ↓
    imperative operation
          ↓
    unmount
          ↓
    elementRef.current = null

---

# Що треба запам'ятати перед наступною темою

`01-use-ref` пояснює:

    useRef
    ↓
    persistent mutable value

`02-dom-refs` додає:

    useRef
    ↓
    DOM node
    ↓
    DOM API

Тобто:

    useRef
       ↓
    ref.current
       ↓
    DOM element
       ↓
    focus()
    blur()
    select()
    scrollIntoView()
    getBoundingClientRect()
    play()
    pause()

Після цього логічно перейти до:

    03-focus-and-inputs

де DOM refs будуть застосовуватися більш практично для:

    input focus
    keyboard interaction
    forms
    uncontrolled inputs
    focus management
    accessibility

А потім:

    04-imperative-handles

де буде розглянуто, як refs працюють із custom components та як компонент може відкривати назовні власний imperative API.