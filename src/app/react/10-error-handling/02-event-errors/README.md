## 02. Event Errors

Event Errors (помилки в обробниках подій) — це помилки, які виникають під час виконання event handlers у React-компонентах.

Event handlers — це функції, які виконуються у відповідь на дії користувача:

    click
    change
    submit
    input
    focus
    blur
    keydown
    keyup
    mouse events
    pointer events

Наприклад:

    function Button() {
        function handleClick() {
            throw new Error("Something went wrong");
        }

        return (
            <button onClick={handleClick}>
                Click
            </button>
        );
    }

Помилка виникла всередині:

    handleClick()

Це event error.

---

### Ключові поняття

✔ event  
✔ event handler  
✔ event callback  
✔ event error  
✔ `onClick`  
✔ `onChange`  
✔ `onSubmit`  
✔ `onInput`  
✔ `onFocus`  
✔ `onBlur`  
✔ `onKeyDown`  
✔ `onKeyUp`  
✔ `try...catch`  
✔ `catch`  
✔ error object  
✔ error message  
✔ error state  
✔ error UI  
✔ validation error  
✔ async event handler  
✔ Promise rejection  
✔ `async/await`  
✔ `.catch()`  
✔ `preventDefault()`  
✔ error recovery  
✔ retry  
✔ user feedback  
✔ Error Boundary  
✔ error propagation  

---

### Що потрібно пам'ятати

• Event handler — це функція, яка виконується у відповідь на DOM/React event.

• Event error — помилка, яка виникла всередині event handler.

• Error Boundary автоматично не перехоплює помилки event handlers.

• Для синхронної помилки в event handler часто використовується:

    try {
        ...
    } catch (error) {
        ...
    }

• Для async event handler потрібно обробляти rejected Promise.

• Для `async/await` використовується:

    try {
        await ...
    } catch (error) {
        ...
    }

• Для Promise можна використовувати:

    .catch()

• Error handling event handler зазвичай складається з:

    event
      ↓
    handler
      ↓
    operation
      ↓
    error
      ↓
    catch
      ↓
    error UI / logging / recovery

• Не кожна помилка є crash application.

• Validation error — це часто очікуваний стан, а не exception.

• API error потрібно обробляти окремо від React rendering errors.

• Event handler може змінити state:

    setError(...)

і показати користувачу error UI.

• Для критичних unexpected errors корисно мати окремий Error Boundary, але він не замінює `try...catch` у event handler.

---

# Event

Event — це повідомлення про те, що певна дія або подія відбулася.

Наприклад:

    click
    change
    submit
    keydown

У React event передається в event handler.

Наприклад:

    function Button() {
        function handleClick(event) {
            console.log(event);
        }

        return (
            <button onClick={handleClick}>
                Click
            </button>
        );
    }

---

# Event Handler

Event handler — функція, яка реагує на event.

Наприклад:

    function handleClick() {
        console.log("Clicked");
    }

Використання:

    <button onClick={handleClick}>
        Click
    </button>

---

# Event Handler з Error

Наприклад:

    function Button() {
        function handleClick() {
            throw new Error("Click failed");
        }

        return (
            <button onClick={handleClick}>
                Click
            </button>
        );
    }

При натисканні:

    Click
      ↓
    handleClick()
      ↓
    Error

Це event error.

---

# Error Boundary та Event Errors

Це одна з найважливіших речей цієї теми.

Error Boundary:

    <ErrorBoundary>
        <Button />
    </ErrorBoundary>

не означає, що помилка всередині:

    onClick

автоматично буде перехоплена.

Наприклад:

    function Button() {
        function handleClick() {
            throw new Error("Click failed");
        }

        return (
            <button onClick={handleClick}>
                Click
            </button>
        );
    }

Error Boundary не є заміною:

    try...catch

для event handler.

---

# Правильний Error Handling

Наприклад:

    function Button() {
        function handleClick() {
            try {
                doSomething();
            } catch (error) {
                console.error(error);
            }
        }

        return (
            <button onClick={handleClick}>
                Click
            </button>
        );
    }

Схема:

    click
      ↓
    handleClick
      ↓
    try
      ↓
    operation
      ↓
    error
      ↓
    catch

---

# `try...catch`

`try...catch` дозволяє перехопити синхронну JavaScript-помилку.

Синтаксис:

    try {
        // risky code
    } catch (error) {
        // handle error
    }

У React:

    function handleClick() {
        try {
            doSomething();
        } catch (error) {
            console.error(error);
        }
    }

---

# Простий приклад

    function SaveButton() {
        function handleClick() {
            try {
                saveData();
            } catch (error) {
                console.error(error);
            }
        }

        return (
            <button onClick={handleClick}>
                Save
            </button>
        );
    }

Якщо:

    saveData()

генерує помилку, вона буде перехоплена `catch`.

---

# Error Object

У `catch` можна отримати error object.

    try {
        throw new Error("Save failed");
    } catch (error) {
        console.log(error);
    }

Наприклад:

    error.message

може містити:

    "Save failed"

---

# `error.message`

Приклад:

    function handleClick() {
        try {
            throw new Error("Unable to save");
        } catch (error) {
            console.error(error.message);
        }
    }

Результат:

    Unable to save

---

# `error.stack`

Для debugging можна подивитися stack trace.

    try {
        doSomething();
    } catch (error) {
        console.error(error.stack);
    }

`stack` допомагає зрозуміти:

    де виникла помилка
    як виконання дійшло до цієї помилки

---

# TypeScript та `unknown`

У TypeScript значення `error` у `catch` варто розглядати як `unknown`.

Наприклад:

    try {
        doSomething();
    } catch (error) {
        console.error(error);
    }

Не варто без перевірки припускати:

    error.message

Краще перевірити тип.

    try {
        doSomething();
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }

Це особливо важливо для TypeScript.

---

# Type Guard для Error

Поширений pattern:

    try {
        doSomething();
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("Unknown error", error);
        }
    }

Таким чином:

    Error
      ↓
    error.message

а для невідомого значення:

    unknown
      ↓
    fallback handling

---

# Error State

У React error часто зберігають у state.

Наприклад:

    const [error, setError] = useState<string | null>(null);

При помилці:

    setError("Something went wrong");

У UI:

    {error && (
        <p>{error}</p>
    )}

---

# Event Error + State

Повний приклад:

    function SaveButton() {
        const [error, setError] = useState<string | null>(null);

        function handleClick() {
            try {
                saveData();

                setError(null);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Something went wrong.");
                }
            }
        }

        return (
            <div>
                <button onClick={handleClick}>
                    Save
                </button>

                {error && (
                    <p>{error}</p>
                )}
            </div>
        );
    }

Логіка:

    click
      ↓
    handleClick
      ↓
    try
      ↓
    saveData()
      ↓
    success / error

---

# Error State Lifecycle

Типовий flow:

    initial
      ↓
    error = null

    user action
      ↓
    event handler
      ↓
    operation
      ↓
    success
        → error = null

    або

    error
      ↓
    error = message
      ↓
    error UI

---

# Error UI

Error UI — повідомлення або компонент, який повідомляє користувачу про проблему.

Наприклад:

    {error && (
        <p>
            Не вдалося зберегти дані.
        </p>
    )}

Або:

    {error && (
        <div>
            <h2>Помилка</h2>
            <p>{error}</p>
        </div>
    )}

---

# User-Friendly Error

Не завжди потрібно показувати користувачу technical error.

Не дуже добре:

    TypeError:
    Cannot read properties of undefined

Краще:

    Не вдалося зберегти зміни.

Для developer:

    console.error(error);

Для user:

    Не вдалося зберегти зміни.

---

# Error Message

Можна розділяти:

    technical error
        ↓
    developer

і:

    user message
        ↓
    user

Наприклад:

    catch (error) {
        console.error(error);

        setError(
            "Не вдалося зберегти зміни. Спробуйте ще раз."
        );
    }

---

# Event Error Recovery

Після помилки можна дати користувачу можливість:

    retry
    cancel
    reset
    reload
    continue

Наприклад:

    {error && (
        <div>
            <p>Не вдалося зберегти.</p>

            <button onClick={handleClick}>
                Спробувати ще раз
            </button>
        </div>
    )}

---

# Retry

Retry — повторне виконання операції після помилки.

Наприклад:

    function handleSave() {
        try {
            saveData();
        } catch (error) {
            setError("Save failed");
        }
    }

Кнопка:

    <button onClick={handleSave}>
        Try again
    </button>

Користувач повторно запускає event handler.

---

# Reset Error

Перед новою спробою часто корисно очистити стару помилку.

    function handleSave() {
        setError(null);

        try {
            saveData();
        } catch (error) {
            setError("Save failed");
        }
    }

Flow:

    old error
      ↓
    setError(null)
      ↓
    retry
      ↓
    success / new error

---

# Async Event Handler

Event handler може бути `async`.

Наприклад:

    async function handleSave() {
        await saveData();
    }

Використання:

    <button onClick={handleSave}>
        Save
    </button>

Але async operation може завершитися rejected Promise.

Тому потрібен error handling.

---

# Async + try/catch

Правильний pattern:

    async function handleSave() {
        try {
            await saveData();
        } catch (error) {
            console.error(error);
        }
    }

---

# Async Event Handler + State

Практичний приклад:

    function SaveButton() {
        const [error, setError] = useState<string | null>(null);
        const [isSaving, setIsSaving] = useState(false);

        async function handleSave() {
            setError(null);
            setIsSaving(true);

            try {
                await saveData();
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Failed to save data.");
                }
            } finally {
                setIsSaving(false);
            }
        }

        return (
            <div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? "Saving..." : "Save"}
                </button>

                {error && (
                    <p>{error}</p>
                )}
            </div>
        );
    }

Це дуже типовий React pattern.

---

# `finally`

`finally` виконується незалежно від того, чи була помилка.

    try {
        await saveData();
    } catch (error) {
        setError("Save failed");
    } finally {
        setIsSaving(false);
    }

Це зручно для:

    loading state
    disabled state
    cleanup

---

# Loading + Error + Success

Для async event часто потрібні три стани:

    loading
    error
    success

Наприклад:

    idle
      ↓
    loading
      ↓
    success

або:

    idle
      ↓
    loading
      ↓
    error

---

# State Machine Model

Проста модель:

    idle
      ↓
    submitting
      ↓
    success

або:

    idle
      ↓
    submitting
      ↓
    error
      ↓
    retry
      ↓
    submitting

Це допомагає уникати хаотичного state management.

---

# Submit Error

Форми часто мають event handler:

    onSubmit

Наприклад:

    function LoginForm() {
        function handleSubmit(event) {
            event.preventDefault();

            try {
                login();
            } catch (error) {
                console.error(error);
            }
        }

        return (
            <form onSubmit={handleSubmit}>
                ...
            </form>
        );
    }

---

# `preventDefault()`

Для form submit:

    event.preventDefault();

запобігає стандартній browser behavior.

Наприклад:

    function handleSubmit(event) {
        event.preventDefault();

        try {
            submitForm();
        } catch (error) {
            ...
        }
    }

---

# Async Form Submit

Типовий pattern:

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await submitForm();
        } catch (error) {
            ...
        }
    }

---

# Form Validation Error

Не всі помилки форми повинні створювати `Error`.

Наприклад:

    email is required

це validation error.

Можна зробити:

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

Наприклад:

    if (!email) {
        setErrors({
            ...errors,
            email: "Email is required"
        });

        return;
    }

Це normal validation flow.

---

# Validation vs Exception

Validation:

    email is empty
        ↓
    show validation message

Unexpected exception:

    unexpected runtime failure
        ↓
    catch / Error Boundary

Тобто:

    validation ≠ exception

---

# Event Error vs Validation Error

Наприклад:

    function handleSubmit(event) {
        event.preventDefault();

        if (!email) {
            setError("Email is required");
            return;
        }

        try {
            saveUser();
        } catch (error) {
            setError("Unexpected error");
        }
    }

Тут є два різні типи проблем:

    validation
        ↓
    expected user input problem

    exception
        ↓
    unexpected runtime problem

---

# Event Handler with API

Наприклад:

    async function handleDelete() {
        try {
            await deleteUser(userId);
        } catch (error) {
            setError("Unable to delete user.");
        }
    }

UI:

    <button onClick={handleDelete}>
        Delete
    </button>

---

# HTTP Error

`fetch()` не кидає exception автоматично для HTTP:

    400
    401
    403
    404
    500

Наприклад:

    const response = await fetch("/api/user");

Навіть якщо сервер повернув:

    500

Promise може бути fulfilled.

Тому потрібно перевіряти:

    response.ok

---

# `response.ok`

Наприклад:

    async function handleLoad() {
        try {
            const response = await fetch("/api/user");

            if (!response.ok) {
                throw new Error(
                    `Request failed: ${response.status}`
                );
            }

            const data = await response.json();

            setData(data);
        } catch (error) {
            setError("Failed to load user.");
        }
    }

Схема:

    fetch
      ↓
    response
      ↓
    response.ok?
      ↓
    yes → success
    no  → throw
      ↓
    catch

---

# Network Error

Network error — інша ситуація.

Наприклад:

    await fetch("/api/user");

може завершитися rejected Promise через:

    network failure
    DNS problem
    connection failure
    request abortion

Тоді:

    catch

може перехопити помилку.

---

# HTTP Error vs Network Error

Важливо розрізняти.

HTTP error:

    server responded
        ↓
    404 / 500

Network error:

    request could not complete normally
        ↓
    rejected Promise

Обидві ситуації можуть бути оброблені в:

    try/catch

але причина різна.

---

# Abort Error

Request може бути скасований.

Наприклад:

    AbortController

Якщо request aborted, можна отримати помилку, пов'язану з abort.

У складніших application потрібно розрізняти:

    real error

та:

    expected cancellation

---

# Event Error Logging

У development:

    catch (error) {
        console.error(error);
    }

У production можна використовувати:

    error monitoring
    logging service
    telemetry

Концептуально:

    catch
      ↓
    normalize error
      ↓
    log/report
      ↓
    show user-friendly UI

---

# Не логувати тільки message

Для debugging іноді корисніше передати весь error object:

    console.error(error);

а не тільки:

    console.error(error.message);

Бо повний error може містити:

    name
    message
    stack

---

# Normalize Error

У великих application різні operations можуть повертати різні error shapes.

Корисно нормалізувати error.

Наприклад:

    function getErrorMessage(error: unknown) {
        if (error instanceof Error) {
            return error.message;
        }

        return "Something went wrong.";
    }

Використання:

    try {
        await saveData();
    } catch (error) {
        setError(getErrorMessage(error));
    }

---

# Reusable Error Helper

Наприклад:

    function getErrorMessage(error: unknown): string {
        if (error instanceof Error) {
            return error.message;
        }

        return "Something went wrong.";
    }

Тепер:

    try {
        await saveData();
    } catch (error) {
        setError(getErrorMessage(error));
    }

Це особливо корисно в TypeScript.

---

# Event Error and `async`

Важлива особливість:

    async function handleClick() {
        throw new Error("Failed");
    }

Ця функція повертає:

    Promise

а не звичайний `undefined`.

Тому async errors потрібно обробляти через:

    try/catch

або:

    .catch()

---

# Promise `.catch()`

Наприклад:

    function handleClick() {
        saveData()
            .catch(error => {
                console.error(error);
            });
    }

Для async/await часто читабельніше:

    async function handleClick() {
        try {
            await saveData();
        } catch (error) {
            console.error(error);
        }
    }

---

# Async Handler Without Handling

Небажано:

    async function handleClick() {
        await saveData();
    }

Якщо:

    saveData()

rejects Promise, помилка може залишитися необробленою.

Краще:

    async function handleClick() {
        try {
            await saveData();
        } catch (error) {
            handleError(error);
        }
    }

---

# Event Error Handler

Можна винести error handling:

    function handleError(error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("Unknown error");
        }
    }

Тоді:

    async function handleSave() {
        try {
            await saveData();
        } catch (error) {
            handleError(error);
        }
    }

---

# Centralized Event Error Handling

У великих application можна мати:

    handleError(error)

який:

    logs error
    normalizes error
    maps error to user message

Наприклад:

    function handleError(error: unknown) {
        console.error(error);

        if (error instanceof Error) {
            return error.message;
        }

        return "Something went wrong.";
    }

---

# Event Error Handling Pattern

Типовий pattern:

    function handleAction() {
        setError(null);

        try {
            performAction();
        } catch (error) {
            const message = getErrorMessage(error);

            setError(message);
        }
    }

Для async:

    async function handleAction() {
        setError(null);

        try {
            await performAction();
        } catch (error) {
            const message = getErrorMessage(error);

            setError(message);
        }
    }

---

# Event Error + Loading

Для async action:

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleAction() {
        setError(null);
        setIsLoading(true);

        try {
            await performAction();
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    }

UI:

    <button
        onClick={handleAction}
        disabled={isLoading}
    >
        {isLoading ? "Loading..." : "Submit"}
    </button>

    {error && (
        <p>{error}</p>
    )}

---

# Disable During Request

Якщо action запускає async operation, часто потрібно блокувати повторне натискання.

Наприклад:

    <button
        onClick={handleSave}
        disabled={isSaving}
    >
        {isSaving ? "Saving..." : "Save"}
    </button>

Це запобігає:

    double click
        ↓
    request 1
    request 2
    request 3

---

# Double Submit

Проблема:

    user clicks
       ↓
    request starts

    user clicks again
       ↓
    second request starts

Можливі проблеми:

    duplicate operation
    duplicate payment
    duplicate record
    race condition

Тому:

    disabled={isSubmitting}

може бути важливим.

---

# Retry and Idempotency

Retry не завжди безпечний.

Наприклад:

    POST /payment

повторний request може бути небезпечним.

Тому перед автоматичним retry потрібно розуміти:

    operation semantics
    idempotency
    server behavior

Для звичайного:

    GET

retry часто простіше.

---

# User Confirmation

Для destructive action:

    Delete

можна спочатку попросити підтвердження.

Наприклад:

    async function handleDelete() {
        const confirmed = window.confirm(
            "Delete this item?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteItem();
        } catch (error) {
            setError("Delete failed.");
        }
    }

---

# Event Handler Flow

Типовий flow:

    user action
        ↓
    React event
        ↓
    event handler
        ↓
    validate
        ↓
    set loading
        ↓
    perform operation
        ↓
    success / error
        ↓
    update UI
        ↓
    cleanup

---

# Повний приклад — Save

    function SaveButton() {
        const [isSaving, setIsSaving] = useState(false);
        const [error, setError] = useState<string | null>(null);

        async function handleSave() {
            setError(null);
            setIsSaving(true);

            try {
                await saveData();
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error);

                    setError(
                        "Не вдалося зберегти дані."
                    );
                } else {
                    setError(
                        "Сталася невідома помилка."
                    );
                }
            } finally {
                setIsSaving(false);
            }
        }

        return (
            <div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? "Збереження..." : "Зберегти"}
                </button>

                {error && (
                    <p role="alert">
                        {error}
                    </p>
                )}
            </div>
        );
    }

---

# `role="alert"`

Для error messages корисно враховувати accessibility.

Наприклад:

    <p role="alert">
        Не вдалося зберегти дані.
    </p>

Це допомагає assistive technologies повідомити користувача про зміну стану.

---

# Error UI Accessibility

Error message має бути:

    visible
    understandable
    accessible

Наприклад:

    <div role="alert">
        <p>
            Не вдалося виконати операцію.
        </p>

        <button>
            Спробувати ще раз
        </button>
    </div>

---

# Focus After Error

У складніших формах після помилки може бути корисно перевести focus на error або проблемне поле.

Наприклад:

    error
      ↓
    focus
      ↓
    user understands what happened

Для цього може використовуватися:

    useRef()

Разом із DOM focus.

---

# Error Per Field

У формах error часто зберігають окремо для кожного поля.

Наприклад:

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

UI:

    {errors.email && (
        <p>{errors.email}</p>
    )}

    {errors.password && (
        <p>{errors.password}</p>
    )}

Це validation/error state, а не Error Boundary.

---

# Error Summary

Для великої форми можна мати загальний список помилок.

Наприклад:

    <div role="alert">
        <h2>Please fix the following:</h2>

        <ul>
            <li>Email is required.</li>
            <li>Password is too short.</li>
        </ul>
    </div>

---

# Event Error vs Error Boundary

Запам'ятати:

    event handler
         ↓
    try/catch

    render error
         ↓
    Error Boundary

Наприклад:

    function Component() {
        function handleClick() {
            try {
                riskyOperation();
            } catch (error) {
                ...
            }
        }

        return (
            <button onClick={handleClick}>
                Click
            </button>
        );
    }

---

# Що НЕ потрібно робити

❌ Покладатися на Error Boundary для `onClick`.

    <ErrorBoundary>
        <button onClick={handleClick}>
            Click
        </button>
    </ErrorBoundary>

Це не замінює:

    try/catch

в `handleClick`.

---

❌ Ігнорувати Promise rejection.

    async function handleClick() {
        await saveData();
    }

Краще:

    async function handleClick() {
        try {
            await saveData();
        } catch (error) {
            ...
        }
    }

---

❌ Показувати technical details користувачу.

Не варто:

    TypeError:
    Cannot read properties of undefined

Краще:

    Не вдалося виконати операцію.

---

❌ Не очищати стару помилку.

Якщо користувач натискає retry:

    setError(null);

може бути корисним перед новою спробою.

---

❌ Не блокувати повторний submit.

Для async operations:

    disabled={isLoading}

часто запобігає випадковому duplicate action.

---

❌ Використовувати exception для звичайної validation.

Наприклад:

    if (!email) {
        throw new Error("Email required");
    }

Не завжди це найкращий підхід для UI validation.

Краще:

    setErrors({
        email: "Email is required"
    });

---

# Event Error Checklist

Перед завершенням event handler варто подумати:

    Чи може operation впасти?

    Чи є try/catch?

    Чи може operation бути async?

    Чи обробляється rejected Promise?

    Чи є loading state?

    Чи є error state?

    Чи показується user-friendly message?

    Чи логувалась technical error?

    Чи можна retry?

    Чи потрібно блокувати повторний submit?

    Чи не є це просто validation error?

---

# Практичні приклади

## Приклад 1 — синхронна помилка

    function Button() {
        const [error, setError] = useState<string | null>(null);

        function handleClick() {
            setError(null);

            try {
                riskyOperation();
            } catch (error) {
                console.error(error);

                setError("Operation failed.");
            }
        }

        return (
            <div>
                <button onClick={handleClick}>
                    Run
                </button>

                {error && (
                    <p role="alert">
                        {error}
                    </p>
                )}
            </div>
        );
    }

---

## Приклад 2 — async помилка

    function SaveButton() {
        const [error, setError] = useState<string | null>(null);

        async function handleSave() {
            setError(null);

            try {
                await saveData();
            } catch (error) {
                console.error(error);

                setError("Save failed.");
            }
        }

        return (
            <div>
                <button onClick={handleSave}>
                    Save
                </button>

                {error && (
                    <p role="alert">
                        {error}
                    </p>
                )}
            </div>
        );
    }

---

## Приклад 3 — loading + error

    function SaveButton() {
        const [isSaving, setIsSaving] = useState(false);
        const [error, setError] = useState<string | null>(null);

        async function handleSave() {
            setError(null);
            setIsSaving(true);

            try {
                await saveData();
            } catch (error) {
                setError("Save failed.");
            } finally {
                setIsSaving(false);
            }
        }

        return (
            <div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? "Saving..." : "Save"}
                </button>

                {error && (
                    <p role="alert">
                        {error}
                    </p>
                )}
            </div>
        );
    }

---

## Приклад 4 — retry

    function SaveButton() {
        const [error, setError] = useState<string | null>(null);

        async function handleSave() {
            setError(null);

            try {
                await saveData();
            } catch (error) {
                setError("Save failed.");
            }
        }

        return (
            <div>
                <button onClick={handleSave}>
                    Save
                </button>

                {error && (
                    <div role="alert">
                        <p>{error}</p>

                        <button onClick={handleSave}>
                            Try again
                        </button>
                    </div>
                )}
            </div>
        );
    }

---

## Приклад 5 — form submit

    function LoginForm() {
        const [error, setError] = useState<string | null>(null);

        async function handleSubmit(event) {
            event.preventDefault();

            setError(null);

            try {
                await login();
            } catch (error) {
                setError("Login failed.");
            }
        }

        return (
            <form onSubmit={handleSubmit}>
                <button type="submit">
                    Login
                </button>

                {error && (
                    <p role="alert">
                        {error}
                    </p>
                )}
            </form>
        );
    }

---

## Приклад 6 — validation

    function handleSubmit(event) {
        event.preventDefault();

        if (!email) {
            setError("Email is required.");
            return;
        }

        if (!password) {
            setError("Password is required.");
            return;
        }

        // continue submit
    }

Тут помилка:

    expected user input

а не unexpected runtime exception.

---

## Приклад 7 — API error

    async function handleLoad() {
        setError(null);

        try {
            const response = await fetch("/api/users");

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            const data = await response.json();

            setUsers(data);
        } catch (error) {
            console.error(error);

            setError(
                "Не вдалося завантажити користувачів."
            );
        }
    }

---

## Приклад 8 — TypeScript `unknown`

    async function handleSave() {
        try {
            await saveData();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("Unknown error");
            }
        }
    }

---

## Приклад 9 — helper

    function getErrorMessage(error: unknown): string {
        if (error instanceof Error) {
            return error.message;
        }

        return "Something went wrong.";
    }

Використання:

    async function handleSave() {
        try {
            await saveData();
        } catch (error) {
            setError(getErrorMessage(error));
        }
    }

---

# Event Error Architecture

Для невеликого компонента:

    event
      ↓
    handler
      ↓
    try/catch
      ↓
    setError()
      ↓
    error UI

Для складнішого компонента:

    event
      ↓
    validation
      ↓
    loading
      ↓
    API / operation
      ↓
    success / error
      ↓
    logging
      ↓
    UI recovery

---

# Event Error Handling Strategy

Можна використовувати таку модель:

    1. Clear previous error

    setError(null);

    2. Start loading

    setIsLoading(true);

    3. Execute operation

    try {
        await operation();

    4. Handle error

    } catch (error) {
        ...

    5. Cleanup

    finally {
        setIsLoading(false);
    }

---

# Загальний шаблон

    async function handleAction() {
        setError(null);
        setIsLoading(true);

        try {
            await performAction();
        } catch (error: unknown) {
            console.error(error);

            setError(
                getErrorMessage(error)
            );
        } finally {
            setIsLoading(false);
        }
    }

Це один із найкорисніших шаблонів для запам'ятовування.

---

# Event Errors та React State

Event handler часто змінює state:

    event
      ↓
    handler
      ↓
    error
      ↓
    setError()
      ↓
    re-render
      ↓
    error UI

Наприклад:

    setError("Failed");

після цього React виконує re-render, і:

    {error && <p>{error}</p>}

стає видимим.

---

# Event Errors та Side Effects

Event handler часто запускає side effect:

    API request
    save
    delete
    upload
    navigation
    localStorage
    analytics

Такі operations можуть завершитися помилкою.

Тому event handler — природне місце для:

    try/catch

---

# Event Error and Navigation

Наприклад:

    async function handleSubmit() {
        try {
            await saveData();

            navigate("/success");
        } catch (error) {
            setError("Save failed.");
        }
    }

Важливо:

    navigate()

виконується тільки після успішної операції.

---

# Event Error and Local Storage

Навіть localStorage operation у деяких ситуаціях може завершитися помилкою.

Наприклад:

    function handleSave() {
        try {
            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );
        } catch (error) {
            setError(
                "Unable to save data locally."
            );
        }
    }

---

# Event Error and JSON

`JSON.parse()` може кинути exception.

Наприклад:

    function handleLoad() {
        try {
            const value = localStorage.getItem("user");

            const user = JSON.parse(value);
        } catch (error) {
            console.error(error);
        }
    }

Це хороший приклад звичайного JavaScript error handling всередині React event handler.

---

# Error Recovery Patterns

Основні recovery patterns:

    retry
    reset
    cancel
    reload
    navigate
    fallback action

Наприклад:

    error
      ↓
    [Try again]

або:

    error
      ↓
    [Go to Home]

---

# Retry Button

Наприклад:

    {error && (
        <button onClick={handleSave}>
            Try again
        </button>
    )}

Retry повинен повторювати operation, а не просто приховувати повідомлення.

Не дуже корисно:

    setError(null);

якщо сама operation не запускається знову.

---

# Clear vs Retry

Це різні дії.

`Clear`:

    setError(null);

тільки приховує error.

`Retry`:

    setError(null);
    performOperation();

повторює operation.

---

# Error Dismiss

Для деяких errors достатньо:

    Dismiss

Наприклад:

    <button onClick={() => setError(null)}>
        Close
    </button>

Але для operation failure часто корисніше:

    Retry

---

# Event Error Boundary Interaction

Важливо розуміти різні рівні.

    render
      ↓
    Error Boundary

    event
      ↓
    try/catch

    async event
      ↓
    try/catch

    API
      ↓
    response handling

Ці механізми можуть працювати разом.

---

# Error Handling Layers

Повна картина:

    ┌────────────────────────────┐
    │      Error Boundary        │
    │   rendering errors         │
    └─────────────┬──────────────┘
                  │
    ┌─────────────▼──────────────┐
    │       Event Handler        │
    │   try/catch / async catch  │
    └─────────────┬──────────────┘
                  │
    ┌─────────────▼──────────────┐
    │       API / Operation      │
    │   response / validation    │
    └────────────────────────────┘

---

# Питання зі співбесіди

Що таке event handler?

Що таке event error?

Чи перехоплює Error Boundary помилки `onClick`?

Чому Error Boundary не замінює `try...catch` у event handler?

Як обробити синхронну помилку в event handler?

Як обробити async error в event handler?

Як працює `try...catch`?

Що таке `finally`?

Що таке rejected Promise?

Як обробити Promise через `.catch()`?

Як обробити async function через `try/catch`?

Що таке error state?

Як показати error message у React?

Як зробити retry?

Навіщо очищати error state перед retry?

Навіщо потрібен loading state?

Чому потрібно блокувати кнопку під час async operation?

Чим validation error відрізняється від exception?

Як обробляти API errors?

Чи кидає `fetch()` exception для HTTP 404?

Що таке `response.ok`?

Чим HTTP error відрізняється від network error?

Що таке `unknown` у TypeScript `catch`?

Як перевірити, що error є `Error`?

Навіщо використовувати `error instanceof Error`?

Як показати user-friendly error?

Як логувати technical error?

Що таке error recovery?

Що таке retry?

Чим clear error відрізняється від retry?

Що таке graceful error handling?

Як обробляти помилки form submission?

Як обробляти помилки delete action?

Як запобігти double submit?

Чому async event handler повертає Promise?

Як обробити помилку з `JSON.parse()`?

Як обробляти помилку `localStorage`?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке event.

Що таке event handler.

`onClick`.

`onChange`.

`onSubmit`.

`onInput`.

Синхронні помилки.

`try...catch`.

`finally`.

Error object.

`error.message`.

Основи error state.

Fallback error UI.

User-friendly error messages.

Різниця:

    Error Boundary
    try/catch

Розуміння, що Error Boundary не перехоплює event handler errors.

---

🔵 Junior

Async event handlers.

`async/await`.

Promise rejection.

`.catch()`.

`try/catch` з `await`.

Loading state.

Error state.

Success state.

Retry.

Reset error.

Form submit errors.

API errors.

`response.ok`.

HTTP errors.

Network errors.

Validation errors.

`error instanceof Error`.

TypeScript `unknown` у `catch`.

`finally`.

Disable button during async operation.

Accessibility:

    role="alert"

User-friendly error UI.

Error logging.

---

🟠 Middle

Reusable error handling functions.

Error normalization.

Centralized error messages.

Reusable event error patterns.

Async operation state management.

Error recovery strategies.

Retry strategies.

Duplicate submission prevention.

Error classification.

Expected vs unexpected errors.

Validation vs runtime errors.

HTTP vs network errors.

Abort errors.

Error logging architecture.

Monitoring integration.

Accessibility of error states.

Focus management after errors.

Form-level errors.

Field-level errors.

Feature-level error handling.

Interaction між:

    event handlers
    API
    state
    Error Boundaries

---

🔴 Senior

Error handling architecture.

Error classification.

Expected errors.

Unexpected errors.

Recoverable errors.

Non-recoverable errors.

Retry semantics.

Idempotency.

Safe retries.

Race conditions.

Concurrent actions.

Request cancellation.

AbortController.

Error normalization.

Error propagation.

Centralized error reporting.

Observability.

Error monitoring.

Error correlation.

User-facing vs technical errors.

Resilient UI.

Failure recovery.

Distributed error handling.

UX при частковій недоступності application.

Проектування error handling strategy для великого React application.

---

# Міні-шпаргалка

## Event Error

    event
      ↓
    event handler
      ↓
    error

---

## Синхронний error

    function handleClick() {
        try {
            riskyOperation();
        } catch (error) {
            console.error(error);
        }
    }

---

## Async error

    async function handleClick() {
        try {
            await riskyOperation();
        } catch (error) {
            console.error(error);
        }
    }

---

## Promise

    riskyOperation()
        .catch(error => {
            console.error(error);
        });

---

## Error State

    const [error, setError] = useState<string | null>(null);

---

## Error UI

    {error && (
        <p role="alert">
            {error}
        </p>
    )}

---

## Loading

    const [isLoading, setIsLoading] = useState(false);

---

## Complete async pattern

    async function handleAction() {
        setError(null);
        setIsLoading(true);

        try {
            await performAction();
        } catch (error) {
            setError("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    }

---

## Retry

    <button onClick={handleAction}>
        Try again
    </button>

---

## Disable

    <button
        onClick={handleAction}
        disabled={isLoading}
    >
        Submit
    </button>

---

## TypeScript

    catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }

---

## Fetch

    try {
        const response = await fetch("/api/users");

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }

        const data = await response.json();
    } catch (error) {
        ...
    }

---

## Validation

    if (!email) {
        setError("Email is required.");
        return;
    }

Validation:

    expected user input problem

Exception:

    unexpected runtime problem

---

## Error Boundary

    <ErrorBoundary>
        <Component />
    </ErrorBoundary>

Для:

    rendering errors

Не для:

    event handler errors

---

## Основна різниця

    Rendering error
        ↓
    Error Boundary

    Event error
        ↓
    try/catch

    Async error
        ↓
    try/catch / catch()

    Validation error
        ↓
    validation state

    API error
        ↓
    error state / response handling

---

# Головне:

• Event Error — це помилка, яка виникає під час виконання event handler.

• Основні event handlers:

    onClick
    onChange
    onSubmit
    onInput
    onFocus
    onBlur
    onKeyDown
    onKeyUp

• Error Boundary не перехоплює event handler errors автоматично.

• Для синхронних operations використовують:

    try...catch

• Для async operations використовують:

    try...catch

або:

    Promise.catch()

• Для `async/await` типовий pattern:

    try {
        await operation();
    } catch (error) {
        ...
    }

• `finally` зручно використовувати для cleanup:

    setIsLoading(false);

• У TypeScript `catch` error краще розглядати як:

    unknown

• Для перевірки:

    error instanceof Error

• Для UI часто використовують:

    error state

• Типова модель:

    event
      ↓
    handler
      ↓
    operation
      ↓
    success / error
      ↓
    state
      ↓
    UI

• Error message для користувача повинна бути зрозумілою.

• Technical error краще логувати окремо:

    console.error(error);

• Validation error не обов'язково є exception.

• Наприклад:

    Email is required

це нормальний validation state.

• Несподіваний:

    TypeError
    Network failure
    unexpected runtime error

потребує іншої стратегії.

• `fetch()` не кидає exception автоматично для HTTP status:

    400
    401
    403
    404
    500

Потрібно перевіряти:

    response.ok

• Network errors можуть призводити до rejected Promise.

• Async event handler часто повинен мати:

    loading
    error
    success

стани.

• Під час async operation кнопку часто варто блокувати:

    disabled={isLoading}

• Це допомагає уникнути double submit.

• Retry повинен повторювати operation, а не тільки приховувати error.

• Clear error:

    setError(null);

тільки очищає error state.

• Retry:

    setError(null);
    performAction();

очищає error і повторює operation.

• Для user-facing errors корисно використовувати:

    role="alert"

• Error handling event handler — це окремий рівень від Error Boundary.

• Основна модель:

    Rendering
        ↓
    Error Boundary

    Event
        ↓
    try/catch

    Async Event
        ↓
    try/catch / catch()

    Validation
        ↓
    validation state

    API
        ↓
    response + error state

• Хороший event error handling повинен не тільки ловити помилку, а й визначати:

    що сталося
    що показати користувачу
    що залогувати
    чи можна повторити операцію
    чи потрібно заблокувати повторну дію

• Найважливіший практичний шаблон:

    async function handleAction() {
        setError(null);
        setIsLoading(true);

        try {
            await performAction();
        } catch (error: unknown) {
            console.error(error);

            setError(
                getErrorMessage(error)
            );
        } finally {
            setIsLoading(false);
        }
    }

• Головна ідея Event Error Handling:

    user action
        ↓
    event handler
        ↓
    validate
        ↓
    execute operation
        ↓
    catch error
        ↓
    update error state
        ↓
    show useful UI
        ↓
    allow recovery