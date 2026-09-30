# React — Events

React Events — це механізм, за допомогою якого React-компоненти реагують на дії користувача та інші події браузера.

Події дозволяють компонентам реагувати на:

    click
    input
    change
    submit
    focus
    blur
    mouse events
    keyboard events
    pointer events

Події є основою інтерактивності React-компонентів.

Наприклад:

    function Button() {
        function handleClick() {
            console.log("Button clicked");
        }

        return (
            <button onClick={handleClick}>
                Click me
            </button>
        );
    }

Користувач натискає кнопку:

    user action
        ↓
    click event
        ↓
    React event handler
        ↓
    handleClick()
        ↓
    component logic

---

# Основні поняття

✔ event  
✔ event handler  
✔ event listener  
✔ event object  
✔ `onClick`  
✔ `onChange`  
✔ `onInput`  
✔ `onSubmit`  
✔ `onFocus`  
✔ `onBlur`  
✔ `onKeyDown`  
✔ `onKeyUp`  
✔ `onMouseEnter`  
✔ `onMouseLeave`  
✔ `onPointerDown`  
✔ `onPointerUp`  
✔ callback function  
✔ event propagation  
✔ bubbling  
✔ `preventDefault()`  
✔ `stopPropagation()`  
✔ event target  
✔ current target  
✔ keyboard events  
✔ mouse events  
✔ form events  
✔ React SyntheticEvent

---

# Що потрібно пам'ятати

• У React обробники подій передаються через JSX props.

• Назви React event props пишуться у `camelCase`:

    onClick
    onChange
    onSubmit
    onFocus
    onBlur

• Обробник події зазвичай є функцією.

• Функцію потрібно передавати, а не викликати під час render.

Правильно:

    <button onClick={handleClick}>
        Click
    </button>

Неправильно:

    <button onClick={handleClick()}>
        Click
    </button>

• `event` можна отримати як аргумент handler-функції.

• `event.target` — елемент, з якого почалася подія.

• `event.currentTarget` — елемент, на якому виконується поточний handler.

• `event.preventDefault()` скасовує стандартну браузерну поведінку.

• `event.stopPropagation()` зупиняє подальше поширення події.

• Події можуть поширюватися через DOM tree.

• У React найчастіше використовують event handlers разом зі state.

---

# Event

Event — це об'єкт, який описує подію, що відбулася.

Наприклад:

    click
    input
    submit
    keydown

React передає event у handler:

    function handleClick(event) {
        console.log(event);
    }

    return (
        <button onClick={handleClick}>
            Click
        </button>
    );

---

# Event Handler

Event handler — функція, яка виконується у відповідь на певну подію.

Наприклад:

    function handleClick() {
        console.log("Clicked");
    }

    return (
        <button onClick={handleClick}>
            Click
        </button>
    );

Тут:

    onClick
        ↓
    event handler
        ↓
    handleClick()

---

# Handler Naming

У React часто використовують імена:

    handleClick
    handleChange
    handleSubmit
    handleFocus
    handleBlur
    handleKeyDown

Наприклад:

    function handleClick() {
        console.log("Clicked");
    }

Це не обов'язкове правило React, але це поширений convention.

---

# onClick

`onClick` використовується для обробки натискання.

    function Button() {
        function handleClick() {
            console.log("Clicked");
        }

        return (
            <button onClick={handleClick}>
                Click me
            </button>
        );
    }

Після натискання:

    handleClick()

буде виконано.

---

# Inline Handler

Handler можна написати безпосередньо в JSX.

    <button
        onClick={() => {
            console.log("Clicked");
        }}
    >
        Click
    </button>

Це допустимо для короткої логіки.

Для складнішої логіки краще:

    function handleClick() {
        ...
    }

    <button onClick={handleClick}>
        Click
    </button>

---

# Function Reference vs Function Call

Це одна з найважливіших речей у React events.

Правильно:

    <button onClick={handleClick}>
        Click
    </button>

React отримує посилання на функцію.

Функція буде викликана пізніше, коли відбудеться click.

---

Неправильно:

    <button onClick={handleClick()}>
        Click
    </button>

Тут:

    handleClick()

виконується під час render.

Результат цієї функції буде переданий у `onClick`.

---

# Function Reference

    onClick={handleClick}

означає:

    "React, виконай handleClick,
     коли відбудеться click"

---

# Function Call

    onClick={handleClick()}

означає:

    "виконай handleClick зараз
     під час render"

Це дуже поширена помилка початківців.

---

# Event Object

Handler може отримати event object.

    function handleClick(event) {
        console.log(event);
    }

    return (
        <button onClick={handleClick}>
            Click
        </button>
    );

Event містить інформацію про подію.

Наприклад:

    event.type
    event.target
    event.currentTarget

---

# event.type

`event.type` містить тип події.

    function handleClick(event) {
        console.log(event.type);
    }

При click:

    click

---

# event.target

`event.target` — елемент, з якого фактично почалася подія.

Наприклад:

    function handleClick(event) {
        console.log(event.target);
    }

    return (
        <button onClick={handleClick}>
            Click
        </button>
    );

При натисканні `event.target` буде button.

---

# event.currentTarget

`event.currentTarget` — елемент, на якому зараз виконується handler.

Наприклад:

    function handleClick(event) {
        console.log(event.currentTarget);
    }

    return (
        <button onClick={handleClick}>
            Click
        </button>
    );

Важлива різниця:

    event.target
        → фактичний source event

    event.currentTarget
        → element with current handler

---

# target vs currentTarget

Наприклад:

    function handleClick(event) {
        console.log(event.target);
        console.log(event.currentTarget);
    }

    return (
        <button onClick={handleClick}>
            <span>Click</span>
        </button>
    );

Якщо натиснути на `span`:

    event.target
        → span

    event.currentTarget
        → button

Це важливо при роботі з bubbling.

---

# Event Types

У React існує багато event handlers.

Найчастіше використовуються:

    onClick
    onChange
    onInput
    onSubmit
    onFocus
    onBlur
    onKeyDown
    onKeyUp
    onMouseEnter
    onMouseLeave
    onPointerDown
    onPointerUp

---

# Mouse Events

Основні mouse events:

    onClick
    onDoubleClick
    onMouseDown
    onMouseUp
    onMouseEnter
    onMouseLeave
    onMouseMove

---

## onClick

    <button onClick={handleClick}>
        Click
    </button>

---

## onDoubleClick

    <button onDoubleClick={handleDoubleClick}>
        Double click
    </button>

---

## onMouseEnter

    <div onMouseEnter={handleMouseEnter}>
        Hover
    </div>

---

## onMouseLeave

    <div onMouseLeave={handleMouseLeave}>
        Leave
    </div>

---

# Keyboard Events

Основні keyboard events:

    onKeyDown
    onKeyUp

---

## onKeyDown

Виникає при натисканні клавіші.

    function handleKeyDown(event) {
        console.log(event.key);
    }

    <input onKeyDown={handleKeyDown} />

---

## onKeyUp

Виникає при відпусканні клавіші.

    function handleKeyUp(event) {
        console.log(event.key);
    }

    <input onKeyUp={handleKeyUp} />

---

# event.key

`event.key` містить значення натиснутої клавіші.

Наприклад:

    function handleKeyDown(event) {
        console.log(event.key);
    }

При натисканні:

    Enter

отримаємо:

    "Enter"

При:

    a

отримаємо:

    "a"

---

# Keyboard Example

    function SearchInput() {
        function handleKeyDown(event) {
            if (event.key === "Enter") {
                console.log("Search");
            }
        }

        return (
            <input onKeyDown={handleKeyDown} />
        );
    }

---

# Keyboard Modifiers

Event містить інформацію про modifier keys.

Наприклад:

    event.ctrlKey
    event.shiftKey
    event.altKey
    event.metaKey

Приклад:

    function handleKeyDown(event) {
        if (event.ctrlKey && event.key === "s") {
            console.log("Save");
        }
    }

---

# Input Events

Для `<input>` часто використовують:

    onChange

Наприклад:

    function Input() {
        function handleChange(event) {
            console.log(event.target.value);
        }

        return (
            <input onChange={handleChange} />
        );
    }

При кожній зміні значення handler отримує актуальне значення input.

---

# onChange

У React `onChange` використовується для реагування на зміни form controls.

Наприклад:

    <input onChange={handleChange} />

Handler:

    function handleChange(event) {
        console.log(event.target.value);
    }

---

# Reading Input Value

Найпоширеніший pattern:

    function handleChange(event) {
        const value = event.target.value;

        console.log(value);
    }

Або коротко:

    function handleChange(event) {
        console.log(event.target.value);
    }

---

# Input Name

Для form fields часто використовується `name`.

    <input
        name="email"
        onChange={handleChange}
    />

Можна отримати:

    event.target.name

і:

    event.target.value

Наприклад:

    function handleChange(event) {
        console.log(event.target.name);
        console.log(event.target.value);
    }

---

# Checkbox

Checkbox має особливість.

Для checkbox часто потрібно використовувати:

    event.target.checked

Наприклад:

    function handleChange(event) {
        console.log(event.target.checked);
    }

    <input
        type="checkbox"
        onChange={handleChange}
    />

Результат:

    true
    false

---

# Select

Для `<select>` також використовується `onChange`.

    function handleChange(event) {
        console.log(event.target.value);
    }

    return (
        <select onChange={handleChange}>
            <option value="react">
                React
            </option>

            <option value="node">
                Node.js
            </option>
        </select>
    );

---

# Textarea

`textarea` також може використовувати `onChange`.

    function handleChange(event) {
        console.log(event.target.value);
    }

    return (
        <textarea onChange={handleChange} />
    );

---

# Form Events

Основні form events:

    onChange
    onSubmit
    onFocus
    onBlur

---

# onSubmit

`onSubmit` використовується для обробки відправлення форми.

    function handleSubmit(event) {
        console.log("Form submitted");
    }

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">
                Submit
            </button>
        </form>
    );

---

# preventDefault()

HTML form за замовчуванням може виконувати navigation/reload.

У React часто потрібно скасувати стандартну поведінку:

    function handleSubmit(event) {
        event.preventDefault();

        console.log("Form submitted");
    }

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">
                Submit
            </button>
        </form>
    );

Після:

    event.preventDefault()

браузер не виконує стандартну submit-поведінку.

---

# Form Submit Flow

Типовий flow:

    user clicks submit
            ↓
        onSubmit
            ↓
    handleSubmit(event)
            ↓
    event.preventDefault()
            ↓
    read form data
            ↓
    validate
            ↓
    send data

---

# Focus Events

Основні focus events:

    onFocus
    onBlur

---

## onFocus

Спрацьовує, коли element отримує focus.

    function handleFocus() {
        console.log("Focused");
    }

    <input onFocus={handleFocus} />

---

## onBlur

Спрацьовує, коли element втрачає focus.

    function handleBlur() {
        console.log("Blurred");
    }

    <input onBlur={handleBlur} />

---

# Focus Example

    function Input() {
        function handleFocus() {
            console.log("Input focused");
        }

        function handleBlur() {
            console.log("Input blurred");
        }

        return (
            <input
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        );
    }

---

# Event Handler with Parameters

Іноді handler повинен отримати додатковий параметр.

Наприклад:

    function handleClick(id) {
        console.log(id);
    }

Не можна просто написати:

    <button onClick={handleClick(10)}>
        Click
    </button>

Тому що функція виконається під час render.

Правильно:

    <button onClick={() => handleClick(10)}>
        Click
    </button>

---

# Callback Wrapper

Arrow function може використовуватися як wrapper:

    onClick={() => handleClick(10)}

Логіка:

    click
      ↓
    arrow function
      ↓
    handleClick(10)

---

# Event + Parameter

Можна одночасно передати event та додатковий параметр.

    function handleClick(event, id) {
        console.log(event);
        console.log(id);
    }

    <button
        onClick={(event) => handleClick(event, 10)}
    >
        Click
    </button>

Або:

    <button
        onClick={(event) => {
            handleClick(event, 10);
        }}
    >
        Click
    </button>

---

# Event Propagation

Event propagation — поширення події через DOM tree.

Спрощено:

    child
      ↓
    parent
      ↓
    ancestor

Наприклад:

    <div onClick={handleParentClick}>
        <button onClick={handleButtonClick}>
            Click
        </button>
    </div>

При click на button подія може поширитися до parent.

---

# Event Bubbling

Bubbling — поширення події від target до батьківських елементів.

Наприклад:

    <div onClick={handleDivClick}>
        <button onClick={handleButtonClick}>
            Click
        </button>
    </div>

При натисканні button:

    button
      ↓
    div
      ↓
    parent
      ↓
    ...

Спочатку виконується handler button, потім подія може піднятися до parent.

---

# Bubbling Example

    function App() {
        function handleDivClick() {
            console.log("DIV");
        }

        function handleButtonClick() {
            console.log("BUTTON");
        }

        return (
            <div onClick={handleDivClick}>
                <button onClick={handleButtonClick}>
                    Click
                </button>
            </div>
        );
    }

Результат:

    BUTTON
    DIV

---

# stopPropagation()

`stopPropagation()` зупиняє подальше поширення події.

    function handleButtonClick(event) {
        event.stopPropagation();

        console.log("BUTTON");
    }

Наприклад:

    <div onClick={handleDivClick}>
        <button onClick={handleButtonClick}>
            Click
        </button>
    </div>

Тепер click button не буде bubbling до `div`.

---

# stopPropagation Example

    function App() {
        function handleDivClick() {
            console.log("DIV");
        }

        function handleButtonClick(event) {
            event.stopPropagation();

            console.log("BUTTON");
        }

        return (
            <div onClick={handleDivClick}>
                <button onClick={handleButtonClick}>
                    Click
                </button>
            </div>
        );
    }

Результат:

    BUTTON

`DIV` не буде виведений.

---

# preventDefault vs stopPropagation

Це різні операції.

`preventDefault()`:

    → скасовує default browser behavior

`stopPropagation()`:

    → зупиняє propagation event

Наприклад:

    event.preventDefault();

та:

    event.stopPropagation();

не є взаємозамінними.

---

# preventDefault

Приклад:

    function handleSubmit(event) {
        event.preventDefault();

        console.log("Submit handled by React");
    }

Основна задача:

    prevent browser default action

---

# stopPropagation

Приклад:

    function handleClick(event) {
        event.stopPropagation();

        console.log("Only this handler");
    }

Основна задача:

    stop event propagation

---

# SyntheticEvent

React використовує власну event abstraction — `SyntheticEvent`.

Він надає узгоджений API для роботи з подіями у React.

Наприклад:

    function handleClick(event) {
        console.log(event.type);
        console.log(event.target);
    }

У сучасному React не потрібно вручну створювати `SyntheticEvent`.

React передає event handler автоматично.

---

# TypeScript Event Types

У React + TypeScript важливо правильно типізувати event.

Наприклад, для button:

    function handleClick(
        event: React.MouseEvent<HTMLButtonElement>
    ) {
        console.log(event);
    }

Для input:

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        console.log(event.target.value);
    }

Для form:

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
    }

---

# Common React Event Types

Найпоширеніші типи:

    React.MouseEvent
    React.ChangeEvent
    React.FormEvent
    React.KeyboardEvent
    React.FocusEvent
    React.PointerEvent

---

# TypeScript — Button

    function handleClick(
        event: React.MouseEvent<HTMLButtonElement>
    ) {
        console.log(event.currentTarget);
    }

    return (
        <button onClick={handleClick}>
            Click
        </button>
    );

---

# TypeScript — Input

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        console.log(event.target.value);
    }

    return (
        <input onChange={handleChange} />
    );

---

# TypeScript — Select

    function handleChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        console.log(event.target.value);
    }

    return (
        <select onChange={handleChange}>
            <option value="react">
                React
            </option>
        </select>
    );

---

# TypeScript — Form

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        console.log("Submit");
    }

    return (
        <form onSubmit={handleSubmit}>
            ...
        </form>
    );

---

# TypeScript — Keyboard

    function handleKeyDown(
        event: React.KeyboardEvent<HTMLInputElement>
    ) {
        if (event.key === "Enter") {
            console.log("Enter");
        }
    }

    return (
        <input onKeyDown={handleKeyDown} />
    );

---

# TypeScript — Focus

    function handleFocus(
        event: React.FocusEvent<HTMLInputElement>
    ) {
        console.log(event.currentTarget);
    }

    return (
        <input onFocus={handleFocus} />
    );

---

# Inline Type Inference

У JSX TypeScript часто може автоматично визначити тип event.

Наприклад:

    <input
        onChange={(event) => {
            console.log(event.target.value);
        }}
    />

У цьому випадку TypeScript знає, що `event` — це `ChangeEvent<HTMLInputElement>`.

Тому не завжди потрібно вручну писати тип.

---

# Handler Type vs Event Type

Є різниця між:

    event type

та:

    handler type

Наприклад:

    React.ChangeEvent<HTMLInputElement>

це тип event.

А handler можна типізувати окремо:

    const handleChange:
        React.ChangeEventHandler<HTMLInputElement>
        = (event) => {
            console.log(event.target.value);
        };

---

# Event Handler Type

React має спеціальні handler types:

    React.MouseEventHandler
    React.ChangeEventHandler
    React.FormEventHandler
    React.KeyboardEventHandler
    React.FocusEventHandler

Наприклад:

    const handleClick: React.MouseEventHandler<HTMLButtonElement>
        = (event) => {
            console.log(event.currentTarget);
        };

---

# Event Handler as Component Prop

Компонент може отримувати event handler через props.

Наприклад:

    type ButtonProps = {
        onClick: () => void;
    };

    function Button({ onClick }: ButtonProps) {
        return (
            <button onClick={onClick}>
                Click
            </button>
        );
    }

Батьківський компонент:

    function App() {
        function handleClick() {
            console.log("Clicked");
        }

        return (
            <Button onClick={handleClick} />
        );
    }

Це важлива основа component communication.

---

# Event Handler Props

Можна передавати різні handlers:

    type InputProps = {
        onChange: React.ChangeEventHandler<HTMLInputElement>;
        onFocus?: React.FocusEventHandler<HTMLInputElement>;
        onBlur?: React.FocusEventHandler<HTMLInputElement>;
    };

    function Input({
        onChange,
        onFocus,
        onBlur
    }: InputProps) {
        return (
            <input
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        );
    }

---

# Events + State

Events дуже часто змінюють state.

Наприклад:

    import { useState } from "react";

    function Counter() {
        const [count, setCount] = useState(0);

        function handleClick() {
            setCount(count + 1);
        }

        return (
            <button onClick={handleClick}>
                {count}
            </button>
        );
    }

Flow:

    user click
        ↓
    event handler
        ↓
    setState
        ↓
    React re-render
        ↓
    updated UI

State буде детально розглядатися у:

    02-state
    03-state-updates

---

# Event Handler + State

Наприклад:

    const [name, setName] = useState("");

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setName(event.target.value);
    }

    return (
        <>
            <input
                value={name}
                onChange={handleChange}
            />

            <p>{name}</p>
        </>
    );

Тут:

    input event
        ↓
    event.target.value
        ↓
    setName()
        ↓
    re-render
        ↓
    UI update

Це основа controlled components.

---

# Event Handler Patterns

## Separate Handler

    function handleClick() {
        console.log("Clicked");
    }

    <button onClick={handleClick}>
        Click
    </button>

Перевага:

    логіка відокремлена від JSX

---

## Inline Handler

    <button
        onClick={() => {
            console.log("Clicked");
        }}
    >
        Click
    </button>

Зручно для дуже короткої логіки.

---

## Handler with Parameter

    function handleDelete(id: number) {
        console.log(id);
    }

    <button
        onClick={() => handleDelete(10)}
    >
        Delete
    </button>

---

## Handler with Event

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        console.log(event.target.value);
    }

    <input onChange={handleChange} />

---

# Multiple Event Handlers

Один компонент може мати багато handlers.

    function Input() {
        function handleFocus() {
            console.log("focus");
        }

        function handleBlur() {
            console.log("blur");
        }

        function handleChange(
            event: React.ChangeEvent<HTMLInputElement>
        ) {
            console.log(event.target.value);
        }

        return (
            <input
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
            />
        );
    }

---

# Event Handler and Conditional Logic

Handler може містити умови.

    function handleKeyDown(
        event: React.KeyboardEvent<HTMLInputElement>
    ) {
        if (event.key === "Enter") {
            console.log("Submit");
        }
    }

---

# Event Handler and Validation

Події часто використовуються для validation.

Наприклад:

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!email) {
            console.log("Email is required");
            return;
        }

        console.log("Submit");
    }

Більш детально validation буде у:

    06-form-validation

---

# Event Delegation

React event system дозволяє працювати з bubbling.

Наприклад:

    function List() {
        function handleClick(
            event: React.MouseEvent<HTMLUListElement>
        ) {
            console.log(event.target);
        }

        return (
            <ul onClick={handleClick}>
                <li>React</li>
                <li>Node</li>
                <li>PostgreSQL</li>
            </ul>
        );
    }

Один handler може обробляти події дочірніх елементів.

---

# target vs currentTarget in Delegation

    function handleClick(
        event: React.MouseEvent<HTMLUListElement>
    ) {
        console.log(event.target);
        console.log(event.currentTarget);
    }

Якщо натиснути на `<li>`:

    target
        → li

    currentTarget
        → ul

Це дуже важливо для event delegation.

---

# Button Type in Forms

У form важливо правильно вказувати `type`.

Submit:

    <button type="submit">
        Submit
    </button>

Звичайна кнопка:

    <button type="button">
        Cancel
    </button>

Усередині form кнопка без `type` може поводитися як submit button.

---

# Click vs Submit

Для form краще обробляти:

    onSubmit

а не тільки:

    onClick

Наприклад:

    <form onSubmit={handleSubmit}>
        <button type="submit">
            Submit
        </button>
    </form>

Перевага:

    Enter

у form також може викликати submit.

---

# Form Event Flow

    input
      ↓
    user enters data
      ↓
    onChange
      ↓
    state update

Потім:

    submit
      ↓
    onSubmit
      ↓
    preventDefault()
      ↓
    validation
      ↓
    API request

---

# Event Order

Для деяких interaction events може бути послідовність.

Наприклад:

    focus
      ↓
    keydown
      ↓
    input/change
      ↓
    keyup
      ↓
    blur

Точна послідовність залежить від конкретної interaction.

Не потрібно механічно запам'ятовувати всі event sequences.

Важливо розуміти, що різні події відповідають різним етапам взаємодії користувача.

---

# Common Events Cheat Sheet

    onClick
        → click

    onDoubleClick
        → double click

    onChange
        → form value changed

    onInput
        → input event

    onSubmit
        → form submit

    onFocus
        → element receives focus

    onBlur
        → element loses focus

    onKeyDown
        → key pressed

    onKeyUp
        → key released

    onMouseEnter
        → pointer enters element

    onMouseLeave
        → pointer leaves element

    onPointerDown
        → pointer pressed

    onPointerUp
        → pointer released

---

# Common Patterns

## Button

    function Button() {
        function handleClick() {
            console.log("Clicked");
        }

        return (
            <button onClick={handleClick}>
                Click
            </button>
        );
    }

---

## Input

    function Input() {
        function handleChange(
            event: React.ChangeEvent<HTMLInputElement>
        ) {
            console.log(event.target.value);
        }

        return (
            <input onChange={handleChange} />
        );
    }

---

## Checkbox

    function Checkbox() {
        function handleChange(
            event: React.ChangeEvent<HTMLInputElement>
        ) {
            console.log(event.target.checked);
        }

        return (
            <input
                type="checkbox"
                onChange={handleChange}
            />
        );
    }

---

## Select

    function Select() {
        function handleChange(
            event: React.ChangeEvent<HTMLSelectElement>
        ) {
            console.log(event.target.value);
        }

        return (
            <select onChange={handleChange}>
                <option value="react">
                    React
                </option>

                <option value="node">
                    Node
                </option>
            </select>
        );
    }

---

## Form

    function Form() {
        function handleSubmit(
            event: React.FormEvent<HTMLFormElement>
        ) {
            event.preventDefault();

            console.log("Submitted");
        }

        return (
            <form onSubmit={handleSubmit}>
                <input />

                <button type="submit">
                    Submit
                </button>
            </form>
        );
    }

---

## Keyboard

    function Input() {
        function handleKeyDown(
            event: React.KeyboardEvent<HTMLInputElement>
        ) {
            if (event.key === "Enter") {
                console.log("Enter");
            }
        }

        return (
            <input onKeyDown={handleKeyDown} />
        );
    }

---

# Типові помилки

❌ Викликати handler під час render.

Неправильно:

    <button onClick={handleClick()}>
        Click
    </button>

Правильно:

    <button onClick={handleClick}>
        Click
    </button>

---

❌ Забути `event.preventDefault()` у form, коли потрібно перехопити стандартний submit.

    function handleSubmit(event) {
        event.preventDefault();
    }

---

❌ Плутати `target` і `currentTarget`.

    target
        → фактичний event target

    currentTarget
        → element with current handler

---

❌ Плутати `preventDefault()` і `stopPropagation()`.

    preventDefault()
        → stop default browser behavior

    stopPropagation()
        → stop event propagation

---

❌ Використовувати `onClick` замість `onSubmit` для всієї form logic.

Краще:

    <form onSubmit={handleSubmit}>

---

❌ Забувати `type="submit"` або `type="button"` у form.

    <button type="submit">
        Submit
    </button>

    <button type="button">
        Cancel
    </button>

---

❌ Передавати параметр неправильним способом.

Неправильно:

    <button onClick={handleDelete(id)}>
        Delete
    </button>

Правильно:

    <button onClick={() => handleDelete(id)}>
        Delete
    </button>

---

❌ Змінювати DOM напряму замість використання React state.

Наприклад, не варто будувати UI так:

    document.querySelector(...)
    element.textContent = ...

У React UI має походити зі state/props.

---

❌ Змішувати event logic і надмірно складну business logic в одному handler.

Якщо handler стає великим:

    event
      ↓
    handler
      ↓
    separate function
      ↓
    business logic

часто є читабельнішим.

---

# Event vs State

Event і state — різні поняття.

Event:

    "Щось сталося"

Наприклад:

    click
    change
    submit

State:

    "Який зараз стан компонента"

Наприклад:

    count = 5
    isOpen = true
    name = "Valeriy"

Типовий React flow:

    event
      ↓
    handler
      ↓
    state update
      ↓
    render
      ↓
    UI

---

# Events as User Input

Події можна розглядати як input від користувача.

Наприклад:

    click
    ↓
    user action

    change
    ↓
    user input

    submit
    ↓
    user request

    keydown
    ↓
    keyboard input

React handler перетворює цю interaction на application logic.

---

# Practical Example — Counter

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

Flow:

    click
      ↓
    handleIncrement
      ↓
    setCount
      ↓
    re-render
      ↓
    Count updated

---

# Practical Example — Input

    import { useState } from "react";

    function NameInput() {
        const [name, setName] = useState("");

        function handleChange(
            event: React.ChangeEvent<HTMLInputElement>
        ) {
            setName(event.target.value);
        }

        return (
            <>
                <input
                    value={name}
                    onChange={handleChange}
                />

                <p>
                    Hello, {name}
                </p>
            </>
        );
    }

Тут event:

    onChange

отримує:

    event.target.value

і передає його у state.

---

# Practical Example — Form

    import { useState } from "react";

    function LoginForm() {
        const [email, setEmail] = useState("");

        function handleSubmit(
            event: React.FormEvent<HTMLFormElement>
        ) {
            event.preventDefault();

            console.log(email);
        }

        return (
            <form onSubmit={handleSubmit}>
                <input
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />

                <button type="submit">
                    Login
                </button>
            </form>
        );
    }

Flow:

    user types
        ↓
    onChange
        ↓
    setEmail
        ↓
    state update

    user submits
        ↓
    onSubmit
        ↓
    preventDefault
        ↓
    validation / API

---

# Practical Example — Button with Parameter

    function UserList() {
        const users = [
            { id: 1, name: "John" },
            { id: 2, name: "Anna" },
        ];

        function handleUserClick(id: number) {
            console.log(id);
        }

        return (
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <button
                            onClick={() =>
                                handleUserClick(user.id)
                            }
                        >
                            {user.name}
                        </button>
                    </li>
                ))}
            </ul>
        );
    }

---

# Practical Example — Event Delegation

    function Menu() {
        function handleClick(
            event: React.MouseEvent<HTMLUListElement>
        ) {
            const target = event.target;

            if (
                target instanceof HTMLButtonElement
            ) {
                console.log(target.dataset.action);
            }
        }

        return (
            <ul onClick={handleClick}>
                <li>
                    <button data-action="open">
                        Open
                    </button>
                </li>

                <li>
                    <button data-action="save">
                        Save
                    </button>
                </li>
            </ul>
        );
    }

Це приклад використання bubbling та `event.target`.

---

# Practical Example — Keyboard Shortcut

    function SearchInput() {
        function handleKeyDown(
            event: React.KeyboardEvent<HTMLInputElement>
        ) {
            if (
                event.key === "Enter"
                && event.ctrlKey
            ) {
                console.log("Search");
            }
        }

        return (
            <input onKeyDown={handleKeyDown} />
        );
    }

---

# Events and Component Architecture

У React event handler може бути:

    1. у тому самому компоненті
    2. переданий через props
    3. переданий від parent до child
    4. використаний для зміни state
    5. використаний для запуску business logic

Наприклад:

    Parent
      │
      │ onSave={handleSave}
      ↓
    Child
      │
      │ onClick={onSave}
      ↓
    event

Це важлива модель React component communication.

---

# Parent → Child Event Handler

Parent:

    function Parent() {
        function handleSave() {
            console.log("Saved");
        }

        return (
            <Child onSave={handleSave} />
        );
    }

Child:

    type ChildProps = {
        onSave: () => void;
    };

    function Child({ onSave }: ChildProps) {
        return (
            <button onClick={onSave}>
                Save
            </button>
        );
    }

Flow:

    Child click
        ↓
    onSave
        ↓
    Parent handler

Це один із фундаментальних patterns React.

---

# Event Handler Responsibilities

Хороший event handler часто виконує коротку послідовність:

    receive event
        ↓
    read event data
        ↓
    validate / decide
        ↓
    update state
        ↓
    call another function

Наприклад:

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const value = event.target.value;

        setName(value);
    }

---

# Коли використовувати event handler

Event handler потрібен, коли UI повинен реагувати на user interaction.

Наприклад:

    button click
    input change
    form submit
    keyboard input
    focus
    blur
    pointer interaction

---

# Коли потрібен state

Якщо результат event повинен зберігатися між renders.

Наприклад:

    input value
    counter
    modal open/close
    selected option
    checkbox state

Тоді типовий pattern:

    event
      ↓
    setState
      ↓
    render

Це буде детально розглянуто в:

    02-state

---

# Коли потрібен effect

Не кожну подію потрібно обробляти через `useEffect`.

Наприклад:

    button click
      ↓
    handleClick()

а не:

    state change
      ↓
    useEffect
      ↓
    handleClick logic

Event-specific logic часто краще залишати в event handler.

`useEffect` буде розглянуто у:

    03-component-lifecycle-and-effects

---

# Event Handler vs Effect

Подія:

    "Користувач натиснув кнопку"

Зазвичай:

    onClick
        ↓
    handler

Effect:

    "Після render/state change
     потрібно синхронізуватися
     із зовнішньою системою"

Зазвичай:

    useEffect()

Не варто використовувати `useEffect` лише тому, що потрібно виконати код після user click.

---

# Mini Cheat Sheet

## onClick

    <button onClick={handleClick}>
        Click
    </button>

    → click

---

## onChange

    <input onChange={handleChange} />

    → value changed

---

## onSubmit

    <form onSubmit={handleSubmit}>
        ...
    </form>

    → form submitted

---

## onFocus

    <input onFocus={handleFocus} />

    → focus received

---

## onBlur

    <input onBlur={handleBlur} />

    → focus lost

---

## onKeyDown

    <input onKeyDown={handleKeyDown} />

    → key pressed

---

## onKeyUp

    <input onKeyUp={handleKeyUp} />

    → key released

---

## event.target

    event.target

    → actual event source

---

## event.currentTarget

    event.currentTarget

    → element with current handler

---

## preventDefault

    event.preventDefault();

    → prevent default browser action

---

## stopPropagation

    event.stopPropagation();

    → stop event propagation

---

## Function Reference

    onClick={handleClick}

    → React calls function on click

---

## Function Call

    onClick={handleClick()}

    → function is called during render

---

## Parameter

    onClick={() => handleDelete(id)}

    → call handler with parameter

---

## Input value

    event.target.value

    → current input value

---

## Checkbox

    event.target.checked

    → boolean checkbox value

---

## Keyboard

    event.key

    → pressed key

---

# Питання зі співбесіди

Що таке event у React?

Що таке event handler?

Як передати event handler у JSX?

Чим відрізняється:

    onClick={handleClick}

від:

    onClick={handleClick()}

?

Що таке `onClick`?

Що таке `onChange`?

Що таке `onSubmit`?

Що таке `onFocus`?

Що таке `onBlur`?

Що таке `onKeyDown`?

Що таке `onKeyUp`?

Як отримати value з input?

Як отримати checked з checkbox?

Як отримати key з keyboard event?

Що таке `event.target`?

Що таке `event.currentTarget`?

Яка між ними різниця?

Що таке event bubbling?

Що таке event propagation?

Що робить `event.preventDefault()`?

Що робить `event.stopPropagation()`?

Яка різниця між `preventDefault()` та `stopPropagation()`?

Що таке SyntheticEvent?

Як типізувати `onClick` у TypeScript?

Як типізувати `onChange` для input?

Як типізувати `onSubmit`?

Як передати event handler через props?

Як передати параметр у event handler?

Чому використовується:

    onClick={() => handleClick(id)}

?

Чому form краще обробляти через `onSubmit`, а не тільки через `onClick` кнопки?

Як events пов'язані зі state?

Що відбувається після:

    setState()

у event handler?

Коли потрібно використовувати event handler, а коли `useEffect`?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке event.

Що таке event handler.

JSX event props.

`onClick`.

`onChange`.

`onSubmit`.

`onFocus`.

`onBlur`.

`onKeyDown`.

`onKeyUp`.

Function reference.

Function call.

Event object.

`event.target`.

`event.currentTarget`.

`event.preventDefault()`.

`event.stopPropagation()`.

Основи event bubbling.

Отримання input value.

Отримання checkbox value.

Передача параметрів у handler.

Основи events + state.

---

🔵 Junior

Розуміння:

    mouse events
    keyboard events
    form events
    focus events

Розуміння:

    target
    currentTarget
    bubbling
    propagation

Розуміння:

    preventDefault()
    stopPropagation()

Передача handlers через props.

TypeScript event types.

    React.MouseEvent
    React.ChangeEvent
    React.FormEvent
    React.KeyboardEvent
    React.FocusEvent

Event delegation.

Обробка form events.

Розуміння:

    event
        ↓
    handler
        ↓
    state update
        ↓
    render

Розуміння різниці між event logic та effect logic.

---

🟠 Middle

Складні event flows.

Event delegation patterns.

Reusable event handlers.

Generic components with event handlers.

Advanced TypeScript event typing.

Custom component event APIs.

Controlled components.

Complex forms.

Keyboard shortcuts.

Pointer events.

Composition events.

Drag and drop events.

Event-driven component architecture.

Розділення:

    UI event
        ↓
    handler
        ↓
    application logic

Оптимізація складних interaction flows.

---

🔴 Senior

Глибоке розуміння browser event model.

DOM event propagation.

Capturing phase.

Target phase.

Bubbling phase.

Event delegation.

React event system.

SyntheticEvent architecture.

Native DOM events.

React events vs native events.

Complex interaction systems.

Reusable event abstractions.

Accessibility-oriented event handling.

Keyboard interaction patterns.

Pointer and touch interactions.

Complex form interaction architecture.

Event-driven UI architecture.

Performance considerations при великій кількості handlers.

---

# Основні правила

    onClick={handleClick}
        → передати function reference

    onClick={handleClick()}
        → викликати function під час render

    onClick={() => handleClick(id)}
        → передати параметр

    event.target
        → actual event source

    event.currentTarget
        → element with current handler

    preventDefault()
        → stop default browser behavior

    stopPropagation()
        → stop event propagation

    onSubmit
        → form submission

    onChange
        → form control value change

    onKeyDown
        → key pressed

    onKeyUp
        → key released

    onFocus
        → focus received

    onBlur
        → focus lost

---

# Головне

• React events дозволяють реагувати на дії користувача.

• Event handler — функція, яка виконується у відповідь на event.

• React event props використовують `camelCase`:

    onClick
    onChange
    onSubmit
    onFocus
    onBlur

• Event handler потрібно передавати як function reference:

    onClick={handleClick}

а не викликати:

    onClick={handleClick()}

• Якщо потрібен параметр, використовується wrapper:

    onClick={() => handleClick(id)}

• Event object можна отримати як аргумент:

    function handleClick(event) {
        ...
    }

• `event.target` — фактичний source event.

• `event.currentTarget` — елемент, на якому виконується handler.

• `event.preventDefault()` скасовує стандартну поведінку браузера.

• `event.stopPropagation()` зупиняє поширення event.

• Events можуть bubbling від child до parent.

• Для form краще використовувати:

    onSubmit

а не покладатися лише на click submit button.

• Для input найчастіше використовується:

    onChange

• Для checkbox потрібно читати:

    event.target.checked

• Для text input:

    event.target.value

• Для keyboard events:

    event.key

• Events часто використовуються для зміни state:

    event
      ↓
    handler
      ↓
    setState
      ↓
    render
      ↓
    updated UI

• Event handler можна передавати через props:

    <Child onSave={handleSave} />

• Це дозволяє child-компоненту повідомляти parent про user interaction.

• У TypeScript потрібно розуміти основні event types:

    React.MouseEvent
    React.ChangeEvent
    React.FormEvent
    React.KeyboardEvent
    React.FocusEvent

• `preventDefault()` і `stopPropagation()` вирішують різні задачі.

• Event logic зазвичай відповідає на питання:

    "Що робити, коли користувач щось зробив?"

• State відповідає на питання:

    "Що зараз зберігає компонент?"

• Типовий React interaction flow:

    USER ACTION
         ↓
       EVENT
         ↓
    EVENT HANDLER
         ↓
    STATE / LOGIC
         ↓
      RE-RENDER
         ↓
        UI

• Подальше вивчення:

    01-events
        ↓
    02-state
        ↓
    03-state-updates
        ↓
    04-controlled-components
        ↓
    05-forms
        ↓
    06-form-validation

Це поступово переводить React від простих user interactions до повноцінних інтерактивних форм та application logic.