# 01. useRef

`useRef` — це React Hook, який дозволяє зберігати значення між render-ами компонента, не спричиняючи повторний render при зміні цього значення.

`useRef` найчастіше використовується для:

- доступу до DOM-елемента;
- зберігання mutable value;
- зберігання попереднього значення;
- зберігання timer ID;
- зберігання instance-like значень;
- взаємодії React-компонента з imperative API браузера;
- зберігання значення, яке повинно пережити render, але не повинно викликати новий render.

Основна ідея:

    useState → зміна value → re-render

    useRef → зміна value → re-render НЕ відбувається

---

### Ключові поняття

✔ `useRef`  
✔ Hook  
✔ ref object  
✔ `.current`  
✔ mutable value  
✔ persistent value  
✔ render  
✔ re-render  
✔ DOM reference  
✔ DOM node  
✔ `ref` attribute  
✔ `createRef`  
✔ `useState` vs `useRef`  
✔ `useRef` vs local variable  
✔ previous value  
✔ timer ID  
✔ imperative API  
✔ DOM manipulation  
✔ uncontrolled component  
✔ lifecycle of ref  
✔ ref initialization  

---

### Що потрібно пам'ятати

• `useRef()` повертає object.

• Основна властивість ref object — `.current`.

• Значення `.current` зберігається між render-ами.

• Зміна `.current` сама по собі НЕ викликає re-render.

• `useRef` можна використовувати для зберігання mutable value.

• `useRef` часто використовується для доступу до DOM-елемента.

• Ref можна передати DOM-елементу через:

    ref={ref}

• Після монтування DOM-елемента React може записати DOM node у:

    ref.current

• Не потрібно використовувати `useRef` для даних, які повинні відображатися в UI після зміни.

• Якщо зміна value повинна викликати render — зазвичай потрібен `useState`.

• `useRef` не є заміною `useState`.

• Не слід використовувати `ref.current` як основний механізм синхронізації UI.

• `useRef` особливо корисний для imperative operations.

---

# Що таке useRef

`useRef` — React Hook для створення ref object, який зберігає значення між render-ами.

Синтаксис:

    const ref = useRef(initialValue);

Наприклад:

    import { useRef } from "react";

    function Counter() {
        const countRef = useRef(0);

        return (
            <button>
                {countRef.current}
            </button>
        );
    }

Після виклику:

    useRef(0)

отримуємо приблизно такий object:

    {
        current: 0
    }

---

# Ref Object

Ref — це object з властивістю:

    current

Наприклад:

    const valueRef = useRef(0);

Можна уявляти:

    valueRef
        ↓
    {
        current: 0
    }

Зміна:

    valueRef.current = 10;

дає:

    {
        current: 10
    }

---

# .current

`.current` — основне місце зберігання значення ref.

Наприклад:

    const valueRef = useRef(0);

    console.log(valueRef.current);

Результат:

    0

Можна змінити:

    valueRef.current = 100;

Після цього:

    console.log(valueRef.current);

Результат:

    100

---

# useRef та re-render

Це одна з найважливіших властивостей `useRef`.

Якщо зробити:

    const valueRef = useRef(0);

    valueRef.current = valueRef.current + 1;

React НЕ запускає render тільки через цю зміну.

Тобто:

    ref.current = newValue

не означає:

    render()

---

# useState vs useRef

Це дуже важлива різниця.

`useState`:

    const [count, setCount] = useState(0);

    setCount(1);

Зміна state:

    state change
        ↓
    re-render
        ↓
    UI update

`useRef`:

    const countRef = useRef(0);

    countRef.current = 1;

Зміна ref:

    ref change
        ↓
    no automatic re-render

Тобто:

    useState → reactive data

    useRef → persistent mutable value

---

# Простий приклад useState

    import { useState } from "react";

    function Counter() {
        const [count, setCount] = useState(0);

        return (
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        );
    }

При натисканні:

    setCount(...)
        ↓
    state changes
        ↓
    component re-renders
        ↓
    new count appears in UI

---

# Простий приклад useRef

    import { useRef } from "react";

    function Counter() {
        const countRef = useRef(0);

        function handleClick() {
            countRef.current += 1;
        }

        return (
            <button onClick={handleClick}>
                Increment
            </button>
        );
    }

При натисканні:

    countRef.current += 1

значення змінюється.

Але компонент автоматично не перерендерюється.

Тому нове значення не з'явиться в UI лише через зміну ref.

---

# useRef не для UI state

Неправильна ідея:

    const countRef = useRef(0);

    function handleClick() {
        countRef.current += 1;
    }

    return (
        <p>
            Count: {countRef.current}
        </p>
    );

Якщо очікується, що текст:

    Count: 0

зміниться на:

    Count: 1

після натискання, `useRef` тут не підходить.

Краще:

    const [count, setCount] = useState(0);

---

# Основне правило

Якщо значення:

    змінюється
    +
    зміна повинна бути відображена в UI

використовуй:

    useState

Якщо значення:

    потрібно зберегти між render-ами
    +
    зміна не повинна сама запускати render

можна використовувати:

    useRef

---

# useRef та render

Розглянемо:

    function Component() {
        const valueRef = useRef(0);

        console.log("render");

        function handleClick() {
            valueRef.current += 1;
        }

        return (
            <button onClick={handleClick}>
                Click
            </button>
        );
    }

Натискання змінює:

    valueRef.current

але саме ця зміна не викликає:

    render

Тому:

    ref.current

може змінюватися незалежно від render cycle.

---

# useRef з initial value

Можна передати початкове значення:

    const numberRef = useRef(0);

    const textRef = useRef("");

    const objectRef = useRef({});

    const nullRef = useRef(null);

Наприклад:

    const userRef = useRef({
        name: "John"
    });

Доступ:

    userRef.current.name

---

# Initial Value

Аргумент `useRef()` використовується як початкове значення.

    const ref = useRef(10);

Спочатку:

    ref.current === 10

Після:

    ref.current = 20;

отримуємо:

    ref.current === 20

Наступні render-и не скидають ref назад до `10`.

---

# Persistent Value

Одна з головних властивостей `useRef` — persistence між render-ами.

Наприклад:

    const valueRef = useRef(0);

    valueRef.current += 1;

Після render-а значення ref зберігається.

Схематично:

    render 1
        ↓
    ref.current = 0
        ↓
    change
        ↓
    ref.current = 1
        ↓
    render 2
        ↓
    ref.current === 1

Ref не створюється заново як звичайна local variable при кожному render-і.

---

# useRef vs Local Variable

Це дуже важлива різниця.

Звичайна local variable:

    function Component() {
        let value = 0;

        value += 1;

        ...
    }

При наступному render:

    let value = 0;

починається заново.

Тобто:

    render 1 → value = 0
    render 2 → value = 0
    render 3 → value = 0

---

`useRef`:

    function Component() {
        const valueRef = useRef(0);

        valueRef.current += 1;

        ...
    }

Значення зберігається між render-ами:

    render 1 → current = 0
    render 2 → current = previous value
    render 3 → current = previous value

---

# Local Variable vs useRef

    local variable
        ↓
    recreated during render

    useRef
        ↓
    persistent between renders

Тому `useRef` можна використовувати для зберігання значення, яке повинно пережити render.

---

# useRef та DOM

Одна з найважливіших практичних задач `useRef` — доступ до DOM element.

Наприклад:

    const inputRef = useRef(null);

    return (
        <input ref={inputRef} />
    );

Після монтування:

    inputRef.current

буде посилатися на DOM element.

Схематично:

    inputRef
        ↓
    {
        current: HTMLInputElement
    }

---

# DOM Reference

Наприклад:

    function SearchInput() {
        const inputRef = useRef(null);

        return (
            <input ref={inputRef} />
        );
    }

React зв'язує:

    ref

з:

    DOM node

Тобто:

    inputRef.current

може бути приблизно:

    <input ...>

---

# Access DOM Element

Після того як DOM element змонтований, можна звернутися до нього:

    inputRef.current

Наприклад:

    inputRef.current.focus();

Це дозволяє виконувати imperative DOM operation.

---

# Focus Input

Типовий приклад:

    import { useRef } from "react";

    function SearchInput() {
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

Логіка:

    button click
        ↓
    inputRef.current
        ↓
    focus()
        ↓
    input receives focus

---

# Optional Chaining

У TypeScript / JavaScript часто можна побачити:

    inputRef.current?.focus();

`?.` захищає від ситуації, коли:

    inputRef.current === null

Наприклад, до монтування element:

    inputRef.current

може бути:

    null

---

# Why null?

Наприклад:

    const inputRef = useRef(null);

До того як React підключить ref до DOM element:

    inputRef.current === null

Після монтування:

    inputRef.current === input DOM node

Після unmount:

    inputRef.current === null

Схематично:

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

# Ref Lifecycle

Для DOM ref можна уявляти такий lifecycle:

    useRef(null)
        ↓
    current = null
        ↓
    component mounts
        ↓
    current = DOM node
        ↓
    component updates
        ↓
    current = same DOM node
        ↓
    component unmounts
        ↓
    current = null

Це важливо при роботі з DOM.

---

# useRef та DOM API

Через DOM ref можна використовувати стандартні DOM API.

Наприклад:

    inputRef.current?.focus();

    inputRef.current?.blur();

    inputRef.current?.select();

    inputRef.current?.scrollIntoView();

Приклад:

    function Example() {
        const elementRef = useRef(null);

        function handleScroll() {
            elementRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }

        return (
            <>
                <button onClick={handleScroll}>
                    Scroll
                </button>

                <div ref={elementRef}>
                    Target
                </div>
            </>
        );
    }

---

# useRef та imperative code

React зазвичай заохочує declarative підхід:

    state
      ↓
    render
      ↓
    UI

А `useRef` часто використовується для imperative actions:

    event
      ↓
    ref.current
      ↓
    DOM API
      ↓
    direct action

Наприклад:

    inputRef.current?.focus();

---

# Declarative vs Imperative

Declarative React:

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Modal open={isOpen} />
    );

Ми описуємо:

    UI залежить від state

---

Imperative:

    modalRef.current?.open();

Ми безпосередньо наказуємо:

    open this element

`useRef` часто є мостом між declarative React та imperative APIs.

---

# useRef для timer ID

`useRef` можна використовувати для зберігання timer ID.

Наприклад:

    const timerRef = useRef(null);

    function startTimer() {
        timerRef.current = setTimeout(() => {
            console.log("Done");
        }, 1000);
    }

Можна зупинити:

    function stopTimer() {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    }

Timer ID не повинен відображатися в UI, тому `useRef` тут підходить.

---

# useRef для interval ID

Наприклад:

    const intervalRef = useRef(null);

    function start() {
        intervalRef.current = setInterval(() => {
            console.log("tick");
        }, 1000);
    }

Зупинка:

    function stop() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }

Ref зберігає ID між render-ами.

---

# useRef для попереднього значення

`useRef` часто використовується для зберігання previous value.

Наприклад:

    const previousValueRef = useRef(value);

У `useEffect` можна оновлювати:

    useEffect(() => {
        previousValueRef.current = value;
    }, [value]);

Тоді ref може містити попереднє значення до наступного update.

---

# Previous Value Pattern

Типовий pattern:

    const previousValueRef = useRef(value);

    useEffect(() => {
        previousValueRef.current = value;
    }, [value]);

У render можна отримати:

    const previousValue = previousValueRef.current;

Ідея:

    current value
        ↓
    render
        ↓
    previous ref
        ↓
    effect
        ↓
    update ref

---

# useRef для mutable data

Ref може містити mutable value.

Наприклад:

    const dataRef = useRef({
        count: 0
    });

Зміна:

    dataRef.current.count += 1;

React не викличе render лише через цю зміну.

---

# Mutable Value

Mutable означає, що значення можна змінити.

Наприклад:

    const ref = useRef(0);

    ref.current = 10;

    ref.current = 20;

`ref` object залишається тим самим object, але його:

    current

змінюється.

---

# Ref Identity

Важливо відрізняти:

    ref object

і:

    ref.current

Наприклад:

    const ref = useRef(0);

`ref` — object.

    ref.current

— значення, яке зберігається в цьому object.

Схематично:

    ref
     ↓
    {
        current: 0
    }

---

# Ref Object не потрібно створювати вручну

Не потрібно:

    const ref = {
        current: null
    };

для звичайного React use case.

Правильно:

    const ref = useRef(null);

React спеціально працює з ref object.

---

# useRef та Component Instance

У function component немає class instance у традиційному сенсі.

Але `useRef` може використовуватися для зберігання instance-like mutable values.

Наприклад:

    const connectionRef = useRef(null);

    const timerRef = useRef(null);

    const observerRef = useRef(null);

Такі значення можуть жити разом із життєвим циклом компонента.

---

# useRef для DOM Node

Найпоширеніший pattern:

    const elementRef = useRef(null);

    return (
        <div ref={elementRef}>
            Content
        </div>
    );

Після mount:

    elementRef.current

посилається на:

    HTMLDivElement

---

# useRef з input

    function LoginForm() {
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

містить input DOM element.

---

# useRef з button

Ref можна поставити на різні DOM elements.

    const buttonRef = useRef(null);

    return (
        <button ref={buttonRef}>
            Click
        </button>
    );

Наприклад:

    buttonRef.current?.focus();

---

# useRef з div

    const divRef = useRef(null);

    return (
        <div ref={divRef}>
            Content
        </div>
    );

Можна:

    divRef.current?.scrollIntoView();

---

# useRef та useEffect

`useRef` часто використовується разом із `useEffect`.

Наприклад:

    function Example() {
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
    useEffect
      ↓
    inputRef.current.focus()

Це типовий pattern.

---

# useRef не викликає effect

Важливо:

    ref.current = newValue

сам по собі:

    не викликає render
    не викликає useEffect

Наприклад:

    const ref = useRef(0);

    ref.current += 1;

React не реагує на цю зміну як на state update.

---

# useRef та useEffect — різні ролі

`useRef`:

    зберігає value / DOM reference

`useEffect`:

    виконує side effect після render

Разом:

    useRef
       ↓
    зберігає DOM node
       ↓
    useEffect
       ↓
    виконує operation над DOM

---

# useRef та useState

Порівняння:

    useState
        ↓
    reactive value
        ↓
    update
        ↓
    re-render

    useRef
        ↓
    mutable persistent value
        ↓
    update
        ↓
    no automatic re-render

---

# useRef vs useState — приклад

Потрібно показати count:

    const [count, setCount] = useState(0);

Правильно.

Потрібно зберегти timer ID:

    const timerRef = useRef(null);

Правильно.

Потрібно зберегти DOM element:

    const inputRef = useRef(null);

Правильно.

---

# useRef vs Local Variable — приклад

Не підходить:

    function Component() {
        let timerId = null;

        function start() {
            timerId = setTimeout(...);
        }
    }

При render local variable створюється заново.

Краще:

    const timerRef = useRef(null);

    function start() {
        timerRef.current = setTimeout(...);
    }

---

# useRef та render snapshot

React render можна уявляти як snapshot UI.

State:

    render
       ↓
    snapshot
       ↓
    state value

Ref:

    render
       ↓
    can access mutable ref object
       ↓
    ref.current may change without render

Тому ref має іншу модель, ніж state.

---

# Ref не є reactive

Це одна з найважливіших речей:

    ref.current

не є reactive value.

Якщо:

    ref.current = 10;

React не знає, що потрібно оновити UI через цю зміну.

Тому не слід покладатися на ref для rendering logic.

---

# Неправильне використання ref

Наприклад:

    const countRef = useRef(0);

    function increment() {
        countRef.current++;
    }

    return (
        <p>
            {countRef.current}
        </p>
    );

Якщо UI повинен автоматично показувати новий count — краще:

    const [count, setCount] = useState(0);

    function increment() {
        setCount(count => count + 1);
    }

---

# Правильне розділення відповідальності

Для UI:

    useState

Для DOM reference:

    useRef

Для timer ID:

    useRef

Для previous value:

    useRef

Для mutable value, яка не повинна викликати render:

    useRef

Для server data:

    не useRef

Для form state, який повинен відображатися:

    useState

---

# useRef та controlled input

Controlled input:

    const [value, setValue] = useState("");

    return (
        <input
            value={value}
            onChange={event => setValue(event.target.value)}
        />
    );

Тут input value контролюється React state.

---

# useRef та uncontrolled input

Uncontrolled input може використовувати ref:

    const inputRef = useRef(null);

    return (
        <input ref={inputRef} />
    );

Отримати value:

    const value = inputRef.current?.value;

У цьому випадку DOM зберігає актуальне value.

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

Для uncontrolled input можна використовувати:

    useRef

---

# Form Example

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

# useRef та focus

Один із найтиповіших use cases:

    const inputRef = useRef(null);

    function focusInput() {
        inputRef.current?.focus();
    }

    return (
        <>
            <input ref={inputRef} />

            <button onClick={focusInput}>
                Focus
            </button>
        </>
    );

---

# useRef та blur

Можна зняти focus:

    inputRef.current?.blur();

Наприклад:

    function blurInput() {
        inputRef.current?.blur();
    }

---

# useRef та select

Для input:

    inputRef.current?.select();

Це може виділити текст.

---

# useRef та scrollIntoView

    const sectionRef = useRef(null);

    function scrollToSection() {
        sectionRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }

---

# useRef та DOM Measurement

Ref також можна використовувати для отримання інформації про DOM element.

Наприклад:

    const elementRef = useRef(null);

    const rect = elementRef.current?.getBoundingClientRect();

Метод:

    getBoundingClientRect()

дозволяє отримати розміри та позицію element.

Наприклад:

    const rect = elementRef.current?.getBoundingClientRect();

    console.log(rect.width);
    console.log(rect.height);
    console.log(rect.top);
    console.log(rect.left);

Такі вимірювання зазвичай виконуються після того, як DOM element існує.

---

# useRef та DOM Measurement

Типовий pattern:

    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;

        if (!element) {
            return;
        }

        const rect = element.getBoundingClientRect();

        console.log(rect.width);
        console.log(rect.height);
    }, []);

---

# useRef та Browser APIs

Ref може зберігати objects, пов'язані з browser APIs.

Наприклад:

    const observerRef = useRef(null);

    const timerRef = useRef(null);

    const animationRef = useRef(null);

    const mediaRef = useRef(null);

У таких випадках ref виступає як місце для зберігання imperative object.

---

# useRef для requestAnimationFrame

Наприклад:

    const animationRef = useRef(null);

    function startAnimation() {
        animationRef.current = requestAnimationFrame(() => {
            console.log("animation frame");
        });
    }

Скасування:

    function stopAnimation() {
        if (animationRef.current !== null) {
            cancelAnimationFrame(animationRef.current);
        }
    }

---

# useRef та cleanup

Якщо ref містить timer / observer / subscription-like object, cleanup повинен бути виконаний відповідно до lifecycle.

Наприклад:

    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            console.log("tick");
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

---

# useRef та Strict Mode

У development mode React Strict Mode може виконувати деякі lifecycle-related операції додатково, щоб виявляти проблеми.

Не слід будувати логіку, яка залежить від того, що певний side effect гарантовано виконається лише один раз у development.

Refs повинні використовуватися відповідно до React lifecycle.

---

# useRef та dependency arrays

Ref object:

    const valueRef = useRef(...);

має стабільну identity між render-ами.

Тому сам ref object зазвичай не потрібно додавати як dependency лише через те, що він створений через `useRef`.

Наприклад:

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

Але потрібно окремо думати про значення:

    inputRef.current

і про те, коли воно доступне.

---

# Ref Identity

Наприклад:

    const inputRef = useRef(null);

React зберігає той самий ref object між render-ами.

Умовно:

    render 1
        ↓
    ref A

    render 2
        ↓
    ref A

    render 3
        ↓
    ref A

А:

    ref.current

може змінюватися.

---

# useRef та conditional rendering

Потрібно пам'ятати, що DOM ref існує тільки тоді, коли відповідний DOM element існує.

Наприклад:

    const inputRef = useRef(null);

    return (
        <>
            {showInput && (
                <input ref={inputRef} />
            )}
        </>
    );

Якщо:

    showInput === false

input відсутній.

Тому:

    inputRef.current

може бути:

    null

---

# useRef та conditional DOM

При:

    showInput = true

можна отримати:

    inputRef.current → input element

При:

    showInput = false

можна отримати:

    inputRef.current → null

Тому DOM refs потрібно використовувати з урахуванням lifecycle element.

---

# useRef та list

Не слід бездумно створювати один ref для багатьох однотипних elements.

Наприклад:

    const itemRef = useRef(null);

    return items.map(item => (
        <div ref={itemRef}>
            {item.name}
        </div>
    ));

Один ref не є хорошим способом керування колекцією DOM nodes.

Для списків потрібні окремі patterns, які будуть розглядатися пізніше.

---

# useRef та keys

`key` і `ref` — різні механізми.

    key
        ↓
    допомагає React визначати identity element у list

    ref
        ↓
    дає доступ до DOM node / imperative value

Не потрібно плутати:

    key

та:

    ref

---

# useRef та children

`ref` не є звичайним prop у DOM API.

Наприклад:

    <MyComponent ref={myRef} />

Для function component передача ref має спеціальні правила React і пов'язана з patterns для exposing imperative handles.

Це буде розглядатися у наступному розділі:

    04-imperative-handles

---

# useRef та custom components

Не слід автоматично очікувати, що:

    <MyComponent ref={ref} />

дасть доступ до DOM element всередині `MyComponent`.

Для custom component потрібні відповідні React patterns для forwarding/exposing ref.

Наприклад, сучасний React підтримує передачу ref у component API, але component повинен явно визначити, що саме ref має означати.

---

# useRef та DOM — правило

Якщо потрібно:

    focus
    blur
    select
    scroll
    measure
    access DOM API

можна розглянути:

    useRef

---

# useRef та state — правило

Якщо потрібно:

    display value
    react to changes
    update UI
    trigger render

використовуй:

    useState

---

# useRef та effect — правило

Якщо потрібно:

    synchronize with external system
    perform side effect
    interact with DOM after render

може знадобитися:

    useEffect + useRef

---

# Common Pattern

Один із найтиповіших React patterns:

    const elementRef = useRef(null);

    useEffect(() => {
        elementRef.current?.focus();
    }, []);

    return (
        <input ref={elementRef} />
    );

Тут:

    useRef
        ↓
    DOM reference

    useEffect
        ↓
    side effect after render

---

# Типові useRef patterns

## 1. DOM reference

    const inputRef = useRef(null);

---

## 2. Focus

    inputRef.current?.focus();

---

## 3. Previous value

    const previousValueRef = useRef(value);

---

## 4. Timer

    const timerRef = useRef(null);

---

## 5. Interval

    const intervalRef = useRef(null);

---

## 6. Animation frame

    const animationRef = useRef(null);

---

## 7. DOM measurement

    const elementRef = useRef(null);

    elementRef.current?.getBoundingClientRect();

---

## 8. Mutable instance-like value

    const connectionRef = useRef(null);

---

# Practical Example — Focus Input

    import { useRef } from "react";

    function Search() {
        const inputRef = useRef(null);

        function handleFocus() {
            inputRef.current?.focus();
        }

        return (
            <div>
                <input
                    ref={inputRef}
                    placeholder="Search..."
                />

                <button onClick={handleFocus}>
                    Focus input
                </button>
            </div>
        );
    }

---

# Practical Example — Auto Focus

    import { useEffect, useRef } from "react";

    function LoginForm() {
        const usernameRef = useRef(null);

        useEffect(() => {
            usernameRef.current?.focus();
        }, []);

        return (
            <form>
                <input
                    ref={usernameRef}
                    type="text"
                    placeholder="Username"
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

# Practical Example — Timer

    import { useEffect, useRef } from "react";

    function Timer() {
        const timerRef = useRef(null);

        useEffect(() => {
            timerRef.current = setTimeout(() => {
                console.log("Done");
            }, 2000);

            return () => {
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                }
            };
        }, []);

        return <p>Timer started</p>;
    }

---

# Practical Example — Previous Value

    import { useEffect, useRef } from "react";

    function Price({ price }) {
        const previousPriceRef = useRef(price);

        useEffect(() => {
            previousPriceRef.current = price;
        }, [price]);

        const previousPrice = previousPriceRef.current;

        return (
            <div>
                <p>Current: {price}</p>
                <p>Previous: {previousPrice}</p>
            </div>
        );
    }

Ідея:

    previousPriceRef.current

містить значення з попереднього render cycle.

---

# Practical Example — Scroll

    import { useRef } from "react";

    function Page() {
        const sectionRef = useRef(null);

        function scrollToSection() {
            sectionRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }

        return (
            <>
                <button onClick={scrollToSection}>
                    Go to section
                </button>

                <div style={{ height: "1000px" }}>
                    Top
                </div>

                <section ref={sectionRef}>
                    Target section
                </section>
            </>
        );
    }

---

# Practical Example — Uncontrolled Form

    import { useRef } from "react";

    function Form() {
        const nameRef = useRef(null);

        function handleSubmit(event) {
            event.preventDefault();

            const name = nameRef.current?.value;

            console.log(name);
        }

        return (
            <form onSubmit={handleSubmit}>
                <input
                    ref={nameRef}
                    type="text"
                />

                <button type="submit">
                    Submit
                </button>
            </form>
        );
    }

---

# Practical Example — Mutable Counter

    import { useRef } from "react";

    function Example() {
        const counterRef = useRef(0);

        function handleClick() {
            counterRef.current += 1;

            console.log(counterRef.current);
        }

        return (
            <button onClick={handleClick}>
                Increment
            </button>
        );
    }

Кожне натискання змінює:

    counterRef.current

але не запускає render.

---

# Практичне правило для React

Перед використанням `useRef` постав питання:

    Чи повинна зміна цього значення
    оновити UI?

Якщо:

    YES
        ↓
    useState

Якщо:

    NO
        ↓
    useRef може бути правильним вибором

---

# useRef — не "DOM Hook"

Важливо не зводити `useRef` тільки до DOM.

`useRef` має дві великі категорії використання:

    1. DOM references

    2. Persistent mutable values

Наприклад:

    DOM node
    timer ID
    previous value
    animation ID
    external object

---

# useRef — не state

Не варто думати:

    useRef = useState without render

Це занадто спрощене пояснення.

Краще:

    useState
        → reactive state
        → render-driven UI

    useRef
        → persistent mutable storage
        → imperative access

---

# useRef та purity

React render повинен залишатися максимально predictable.

Не варто без необхідності змінювати:

    ref.current

під час render.

Особливо небезпечно створювати логіку, де mutation ref під час render впливає на результат rendering.

Краще виконувати imperative mutations у:

    event handlers

або відповідних:

    effects

---

# Небажаний pattern

Наприклад:

    function Component() {
        const countRef = useRef(0);

        countRef.current++;

        return <p>{countRef.current}</p>;
    }

Це поганий pattern, тому що mutation відбувається безпосередньо під час render.

Краще змінювати ref у response to an event або effect, коли це відповідає задачі.

---

# Ref Mutation

Зазвичай mutation виглядає так:

    ref.current = newValue;

або:

    ref.current += 1;

або:

    ref.current = someObject;

Це нормально, якщо ref використовується саме як mutable storage.

---

# Ref Reading

Можна читати:

    ref.current

Наприклад:

    const value = valueRef.current;

Для DOM:

    const input = inputRef.current;

---

# Ref як "коробка"

Корисна ментальна модель:

    useRef()

створює стабільну "коробку":

    ┌───────────────────┐
    │       ref         │
    │                   │
    │ current: value   │
    │                   │
    └───────────────────┘

React зберігає цю коробку між render-ами.

Ти можеш змінювати:

    current

без автоматичного render.

---

# Основна модель useRef

    useRef(initialValue)
            ↓
       ref object
            ↓
         .current
            ↓
    persistent value
            ↓
    survives renders

При цьому:

    current changes
            ↓
    no automatic render

---

# useRef vs useState vs local variable

| Механізм | Зберігається між render-ами | Зміна викликає render | Mutable |
|---|---:|---:|---:|
| local variable | ❌ | ❌ | так |
| `useState` | ✅ | ✅ | через setter |
| `useRef` | ✅ | ❌ | ✅ |

---

# Коли використовувати useRef

Використовуй `useRef`, коли:

• потрібно зберігати значення між render-ами;

• зміна цього значення не повинна сама викликати render;

• потрібно отримати DOM node;

• потрібно викликати DOM API;

• потрібно зберігати timer ID;

• потрібно зберігати interval ID;

• потрібно зберігати animation frame ID;

• потрібно зберігати попереднє значення;

• потрібно зберігати mutable instance-like object;

• потрібно інтегрувати React із imperative browser API.

---

# Коли НЕ використовувати useRef

Не використовуй `useRef` як основний state, якщо:

• значення відображається в UI;

• зміна значення повинна автоматично оновлювати UI;

• React повинен реагувати на зміну значення;

• потрібен predictable state-driven rendering.

У таких випадках зазвичай:

    useState

---

# Типові помилки

❌ Очікувати re-render після зміни `ref.current`.

    ref.current += 1;

Це не викликає render.

---

❌ Використовувати ref замість state для UI.

    const countRef = useRef(0);

Якщо count повинен відображатися та оновлюватися — краще `useState`.

---

❌ Забувати, що DOM ref може бути `null`.

    inputRef.current.focus();

Безпечніше:

    inputRef.current?.focus();

або перевірити:

    if (inputRef.current) {
        inputRef.current.focus();
    }

---

❌ Використовувати DOM manipulation там, де React state вирішує задачу простіше.

Наприклад, замість прямого:

    element.style.display = "none";

часто краще:

    const [isVisible, setIsVisible] = useState(true);

і:

    {isVisible && <Element />}

---

❌ Змінювати ref під час render без необхідності.

    ref.current++;

Render має залишатися predictable.

---

❌ Плутати `ref` і `key`.

    key → identity у lists

    ref → DOM / imperative reference

---

❌ Вважати `useRef` способом "зберегти будь-які дані".

Ref підходить саме для даних, які не потребують реактивного оновлення UI.

---

❌ Використовувати `useRef` для server data.

Для server state потрібні інші підходи:

    fetch
    useEffect
    data-fetching libraries
    framework APIs

---

# Interview Questions

Що таке `useRef`?

Що повертає `useRef()`?

Що таке `.current`?

Чи викликає зміна `ref.current` re-render?

У чому різниця між `useRef` та `useState`?

У чому різниця між `useRef` та local variable?

Чому ref зберігається між render-ами?

Для чого використовують DOM refs?

Як отримати DOM element через `useRef`?

Що знаходиться в `ref.current` після mount?

Що знаходиться в `ref.current` до mount?

Що відбувається з DOM ref після unmount?

Як зробити focus input через `useRef`?

Як зробити scroll до element через `useRef`?

Як виміряти DOM element через `useRef`?

Чи можна використовувати `useRef` для timer ID?

Чи можна використовувати `useRef` для previous value?

Чим controlled input відрізняється від uncontrolled input?

Як використовувати `useRef` з uncontrolled input?

Чому не варто використовувати `useRef` для значення, яке відображається в UI?

Що означає, що ref є mutable?

Чи є `ref.current` reactive?

Чи потрібно додавати ref object у dependency array?

Чим `ref` відрізняється від `key`?

Що таке imperative DOM manipulation?

Коли використання `useRef` краще за `useState`?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке `useRef`.

Синтаксис:

    const ref = useRef(initialValue);

Ref object.

`.current`.

Persistent value.

Mutable value.

Розуміння:

    useRef → no automatic re-render

Різниця:

    useRef
    useState
    local variable

DOM refs.

    <input ref={inputRef} />

Access:

    inputRef.current

Основи:

    focus()
    blur()
    select()
    scrollIntoView()

Розуміння `null` до mount.

Розуміння `null` після unmount.

---

🔵 Junior

Практичне використання:

    focus input
    uncontrolled forms
    timers
    intervals
    previous values
    DOM measurement
    scroll

Розуміння:

    persistent mutable value

Розуміння:

    ref does not trigger render

Розуміння:

    useRef + useEffect

Розуміння controlled vs uncontrolled components.

Розуміння declarative vs imperative code.

Розуміння, коли `useRef` не потрібен.

Безпечний доступ:

    ref.current?.method()

---

🟠 Middle

Глибше розуміння:

    ref identity
    ref lifecycle
    DOM lifecycle
    imperative APIs
    browser APIs

Використання refs для:

    timers
    observers
    animation frames
    DOM measurements
    external instances

Розуміння взаємодії:

    useRef
    useEffect
    useState

Розуміння проблем з mutation під час render.

Розуміння uncontrolled patterns.

Розуміння ref у custom components.

Розуміння передачі ref між компонентами.

Imperative APIs.

---

🔴 Senior

Глибоке розуміння:

    React render model
    ref identity
    mutation semantics
    commit phase
    DOM attachment
    ref lifecycle
    imperative escape hatches

Розуміння trade-offs:

    declarative React
    imperative DOM APIs

Розуміння:

    refs
    effects
    layout effects
    concurrent rendering
    Strict Mode

Глибоке розуміння:

    forwardRef
    imperative handles
    useImperativeHandle

Інтеграція React з:

    browser APIs
    third-party DOM libraries
    animation systems
    canvas
    media APIs
    observers

Оптимізація imperative integrations без порушення React rendering model.

---

# Міні-шпаргалка

## useRef

    const ref = useRef(initialValue);

Повертає:

    {
        current: initialValue
    }

---

## .current

Читання:

    ref.current

Запис:

    ref.current = value;

---

## Основна властивість

    ref.current = newValue;

НЕ викликає автоматично:

    re-render

---

## useState

    const [value, setValue] = useState(0);

Зміна:

    setValue(1);

викликає:

    re-render

---

## useRef

    const valueRef = useRef(0);

Зміна:

    valueRef.current = 1;

не викликає:

    re-render

---

## DOM ref

    const inputRef = useRef(null);

    return (
        <input ref={inputRef} />
    );

Після mount:

    inputRef.current
        ↓
    HTMLInputElement

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

## DOM measurement

    const rect =
        elementRef.current?.getBoundingClientRect();

---

## Timer

    const timerRef = useRef(null);

    timerRef.current = setTimeout(() => {
        ...
    }, 1000);

---

## Previous value

    const previousValueRef = useRef(value);

    useEffect(() => {
        previousValueRef.current = value;
    }, [value]);

---

## Uncontrolled input

    const inputRef = useRef(null);

    const value = inputRef.current?.value;

---

## Основна модель

    useRef
       ↓
    ref object
       ↓
    .current
       ↓
    persistent mutable value
       ↓
    no automatic render

---

# Головне:

• `useRef` — React Hook для зберігання значення між render-ами.

• `useRef()` повертає ref object.

• Основна властивість ref object:

    .current

• Значення `.current` можна змінювати.

• Зміна `.current` сама по собі не викликає re-render.

• `useRef` зберігає значення між render-ами.

• На відміну від local variable, ref не скидається при кожному render.

• На відміну від `useState`, зміна ref не є reactive update.

• `useState` використовується для даних, які повинні впливати на UI.

• `useRef` використовується для persistent mutable values, які не повинні самі викликати render.

• Один із головних use cases — DOM references.

• DOM ref створюється:

    const inputRef = useRef(null);

• Передається element:

    <input ref={inputRef} />

• Після mount:

    inputRef.current

може містити DOM element.

• До mount або після unmount DOM ref може бути:

    null

• Типові DOM operations:

    focus()
    blur()
    select()
    scrollIntoView()
    getBoundingClientRect()

• `useRef` часто використовується разом із `useEffect`.

• `useRef` можна використовувати для:

    timer IDs
    interval IDs
    animation frame IDs
    previous values
    DOM nodes
    mutable instance-like values

• `useRef` може бути корисним для uncontrolled inputs.

• Controlled input зазвичай використовує:

    useState

• Uncontrolled input може використовувати:

    useRef

• `ref.current` не є reactive value.

• Не слід використовувати `useRef` як заміну `useState`, якщо UI повинен оновлюватися після зміни значення.

• Не слід без необхідності змінювати refs під час render.

• `useRef` — один із головних escape hatches React для взаємодії з imperative APIs.

• React переважно працює декларативно:

    state
      ↓
    render
      ↓
    UI

• `useRef` дозволяє виконувати imperative operations:

    event
      ↓
    ref.current
      ↓
    DOM / browser API

• Основне питання перед використанням `useRef`:

    "Чи повинна зміна цього значення
    викликати оновлення UI?"

Якщо:

    YES
        ↓
    useState

Якщо:

    NO
        ↓
    useRef може бути правильним вибором.

---

# Найкоротша модель для запам'ятовування

    useState
        ↓
    reactive data
        ↓
    change → render

    useRef
        ↓
    persistent mutable value
        ↓
    change → NO automatic render

    DOM ref
        ↓
    ref.current
        ↓
    DOM node
        ↓
    imperative API

---

# Формула

    useRef(initialValue)
            ↓
       stable object
            ↓
         .current
            ↓
    persistent value
            ↓
    survives renders

А для DOM:

    useRef(null)
         ↓
    ref={ref}
         ↓
    component mounts
         ↓
    ref.current = DOM node
         ↓
    imperative DOM API

---

# React Mental Model

    State
      ↓
    "Що має бачити UI?"
      ↓
    useState

    Ref
      ↓
    "Що потрібно зберегти
     між render-ами,
     але не потрібно
     показувати через reactive UI?"
      ↓
    useRef

    Effect
      ↓
    "Що потрібно зробити
     після render / synchronization?"
      ↓
    useEffect

---

# Зв'язок з наступними темами

Після `01-use-ref` логічно перейти до:

    02-dom-refs

де детальніше розглядається робота з DOM через refs:

    focus
    selection
    scrolling
    measurement
    DOM APIs

Потім:

    03-focus-and-inputs

де refs використовуються для:

    inputs
    focus management
    forms
    uncontrolled inputs

І далі:

    04-imperative-handles

де розглядаються:

    ref forwarding
    exposing imperative APIs
    useImperativeHandle
    custom component refs

Отже, загальна послідовність:

    useRef
       ↓
    DOM refs
       ↓
    focus / inputs
       ↓
    imperative handles

Це формує цілісне розуміння refs у React.