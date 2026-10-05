# React — Focus and Inputs

## `07-refs-and-dom/03-focus-and-inputs`

---

# 1. Що таке Focus and Inputs

**Focus and Inputs** — це практичне використання DOM refs у React для керування фокусом, виділенням тексту, позицією курсора та іншими діями з `<input>`, `<textarea>` та іншими елементами форми.

У React зазвичай не потрібно вручну шукати елемент через:

    document.querySelector()

Замість цього компонент може отримати пряме посилання на DOM-вузол через `ref`:

    const inputRef = useRef<HTMLInputElement | null>(null);

    <input ref={inputRef} />

Після монтування:

    inputRef.current

містить реальний DOM-елемент `<input>`.

Це дозволяє виконувати імперативні DOM-операції:

    inputRef.current?.focus();

---

# 2. Головна ідея

Для роботи з фокусом у React найчастіше використовується така схема:

    useRef
        ↓
    ref={inputRef}
        ↓
    inputRef.current
        ↓
    DOM element
        ↓
    focus(), blur(), select(), setSelectionRange()

Наприклад:

    import { useRef } from "react";

    export default function SearchInput() {
        const inputRef = useRef<HTMLInputElement | null>(null);

        const handleFocus = () => {
            inputRef.current?.focus();
        };

        return (
            <div>
                <input ref={inputRef} />

                <button onClick={handleFocus}>
                    Focus
                </button>
            </div>
        );
    }

---

# 3. Що таке focus

**Focus** — стан DOM-елемента, коли він є активним елементом взаємодії з клавіатурою.

Наприклад, користувач натиснув на `<input>`:

    <input />

Тепер текст, який вводиться з клавіатури, потрапляє саме в цей input.

У браузері можна перевірити активний елемент:

    document.activeElement

У React зазвичай не потрібно використовувати `document.activeElement` для звичайного керування фокусом.

Краще мати ref:

    inputRef.current?.focus();

---

# 4. `focus()`

Метод `focus()` встановлює фокус на DOM-елемент.

    inputRef.current?.focus();

Повний приклад:

    import { useRef } from "react";

    export default function Search() {
        const inputRef = useRef<HTMLInputElement | null>(null);

        return (
            <div>
                <input ref={inputRef} />

                <button onClick={() => inputRef.current?.focus()}>
                    Focus input
                </button>
            </div>
        );
    }

Після натискання кнопки input отримує фокус.

---

# 5. Чому використовується `?.`

На момент виконання коду:

    inputRef.current

може бути `null`.

Наприклад, компонент ще не змонтував DOM-елемент або елемент уже був видалений.

Тому безпечний варіант:

    inputRef.current?.focus();

означає:

> якщо `current` існує — виконай `focus()`.

Альтернативний варіант:

    if (inputRef.current) {
        inputRef.current.focus();
    }

---

# 6. `blur()`

`blur()` прибирає фокус із елемента.

    inputRef.current?.blur();

Наприклад:

    const handleBlur = () => {
        inputRef.current?.blur();
    };

---

# 7. `focus()` vs `blur()`

| Метод | Що робить |
|---|---|
| `focus()` | встановлює фокус |
| `blur()` | прибирає фокус |

Приклад:

    inputRef.current?.focus();

    inputRef.current?.blur();

---

# 8. Автоматичний focus після монтування

Одна з найпоширеніших задач — автоматично встановити фокус на input після появи компонента.

Для цього використовується `useEffect`.

    import { useEffect, useRef } from "react";

    export default function SearchInput() {
        const inputRef = useRef<HTMLInputElement | null>(null);

        useEffect(() => {
            inputRef.current?.focus();
        }, []);

        return <input ref={inputRef} />;
    }

Послідовність:

    component render
        ↓
    DOM створюється
        ↓
    ref.current отримує input
        ↓
    useEffect запускається
        ↓
    inputRef.current.focus()
        ↓
    input отримує focus

---

# 9. Чому не можна робити `focus()` прямо під час render

Неправильний підхід:

    export default function Input() {
        const inputRef = useRef<HTMLInputElement | null>(null);

        inputRef.current?.focus();

        return <input ref={inputRef} />;
    }

Проблема полягає в тому, що під час render DOM-вузол ще не обов'язково існує.

На цьому етапі:

    inputRef.current

може бути `null`.

Крім того, render у React має бути максимально чистим і декларативним.

Краще:

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

---

# 10. `useEffect` для focus

Базовий варіант:

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

Це означає:

> після першого монтування компонента встановити focus на input.

---

# 11. Focus після зміни стану

Іноді потрібно встановити focus після певної дії.

Наприклад, після відкриття пошуку:

    import { useEffect, useRef, useState } from "react";

    export default function Search() {
        const [isOpen, setIsOpen] = useState(false);
        const inputRef = useRef<HTMLInputElement | null>(null);

        useEffect(() => {
            if (isOpen) {
                inputRef.current?.focus();
            }
        }, [isOpen]);

        return (
            <div>
                <button onClick={() => setIsOpen(true)}>
                    Open search
                </button>

                {isOpen && (
                    <input ref={inputRef} />
                )}
            </div>
        );
    }

Логіка:

    isOpen = false
        ↓
    input не існує

    isOpen = true
        ↓
    input створюється
        ↓
    effect запускається
        ↓
    input отримує focus

---

# 12. Focus після появи умовного елемента

Це дуже важливий практичний випадок.

Наприклад:

    {isEditing ? (
        <input ref={inputRef} />
    ) : (
        <button onClick={() => setIsEditing(true)}>
            Edit
        </button>
    )}

Після зміни:

    setIsEditing(true);

input з'являється в DOM.

Потім effect може встановити focus:

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

---

# 13. `autoFocus`

HTML/React також має простий варіант:

    <input autoFocus />

Він може бути корисним, коли елемент повинен отримати focus одразу після монтування.

Наприклад:

    export default function Search() {
        return (
            <input
                autoFocus
                placeholder="Search..."
            />
        );
    }

---

# 14. `autoFocus` vs `useRef + focus()`

### `autoFocus`

Простий випадок:

    <input autoFocus />

### `useRef`

Коли потрібно програмно контролювати focus:

    const inputRef = useRef<HTMLInputElement | null>(null);

    inputRef.current?.focus();

Наприклад:

- focus після натискання кнопки;
- focus після відкриття модального вікна;
- focus після зміни стану;
- focus після валідації;
- focus на наступний input;
- focus після додавання елемента;
- focus при навігації з клавіатури.

---

# 15. Виділення всього тексту — `select()`

Для `<input>` можна виділити весь текст:

    inputRef.current?.select();

Приклад:

    import { useRef } from "react";

    export default function Input() {
        const inputRef = useRef<HTMLInputElement | null>(null);

        const handleSelect = () => {
            inputRef.current?.select();
        };

        return (
            <div>
                <input
                    ref={inputRef}
                    defaultValue="Hello React"
                />

                <button onClick={handleSelect}>
                    Select all
                </button>
            </div>
        );
    }

Після натискання кнопки весь текст буде виділено.

---

# 16. `select()` не означає `focus()`

`select()` виділяє текст, але для надійної роботи зазвичай елемент повинен бути доступним для взаємодії.

Можна зробити:

    inputRef.current?.focus();
    inputRef.current?.select();

---

# 17. Керування позицією курсора

DOM API дозволяє встановлювати позицію курсора.

Для `<input>` та `<textarea>` використовуються:

    setSelectionRange(start, end)

Наприклад:

    inputRef.current?.setSelectionRange(0, 5);

Це виділить символи від позиції `0` до `5`.

---

# 18. Приклад `setSelectionRange()`

    import { useRef } from "react";

    export default function Input() {
        const inputRef = useRef<HTMLInputElement | null>(null);

        const handleSelect = () => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, 5);
        };

        return (
            <div>
                <input
                    ref={inputRef}
                    defaultValue="Hello React"
                />

                <button onClick={handleSelect}>
                    Select first 5 characters
                </button>
            </div>
        );
    }

---

# 19. `selectionStart` і `selectionEnd`

У текстових input можна отримати позицію виділення:

    inputRef.current?.selectionStart;

    inputRef.current?.selectionEnd;

Наприклад:

    const start = inputRef.current?.selectionStart;
    const end = inputRef.current?.selectionEnd;

Це може бути корисним для:

- текстових редакторів;
- масок;
- форматування;
- спеціальної обробки курсора;
- keyboard shortcuts.

---

# 20. `<textarea>` і focus

Для `<textarea>` принцип абсолютно такий самий.

Тип у TypeScript:

    HTMLTextAreaElement

Приклад:

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    <textarea ref={textareaRef} />

    textareaRef.current?.focus();

---

# 21. `<textarea>` і `select()`

Можна виділити весь текст:

    textareaRef.current?.select();

Або:

    textareaRef.current?.focus();
    textareaRef.current?.setSelectionRange(0, 10);

---

# 22. Типізація input у TypeScript

Для `<input>`:

    const inputRef = useRef<HTMLInputElement | null>(null);

Для `<textarea>`:

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

Для `<button>`:

    const buttonRef = useRef<HTMLButtonElement | null>(null);

Для `<select>`:

    const selectRef = useRef<HTMLSelectElement | null>(null);

Для `<form>`:

    const formRef = useRef<HTMLFormElement | null>(null);

---

# 23. Чому тип повинен відповідати DOM-елементу

Неправильно:

    const inputRef = useRef<HTMLDivElement | null>(null);

    <input ref={inputRef} />

TypeScript повідомить про несумісність типів.

Правильно:

    const inputRef = useRef<HTMLInputElement | null>(null);

---

# 24. Focus для різних елементів

Практичне правило:

    <input>      → HTMLInputElement
    <textarea>   → HTMLTextAreaElement
    <button>     → HTMLButtonElement
    <select>     → HTMLSelectElement
    <form>       → HTMLFormElement

Приклад:

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    <button ref={buttonRef}>
        Save
    </button>

    buttonRef.current?.focus();

---

# 25. Focus на кнопку

Focus потрібен не тільки для input.

Наприклад:

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const handleFocus = () => {
        buttonRef.current?.focus();
    };

    return (
        <>
            <button ref={buttonRef}>
                Save
            </button>

            <button onClick={handleFocus}>
                Focus Save button
            </button>
        </>
    );

---

# 26. Focus на наступний input

Один input може після певної дії передати focus іншому.

    import { useRef } from "react";

    export default function Form() {
        const firstRef = useRef<HTMLInputElement | null>(null);
        const secondRef = useRef<HTMLInputElement | null>(null);

        const handleNext = () => {
            secondRef.current?.focus();
        };

        return (
            <form>
                <input ref={firstRef} />

                <button
                    type="button"
                    onClick={handleNext}
                >
                    Next
                </button>

                <input ref={secondRef} />
            </form>
        );
    }

---

# 27. Кілька input refs

Кожен DOM-елемент може мати свій ref:

    const firstNameRef = useRef<HTMLInputElement | null>(null);
    const lastNameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);

Потім:

    firstNameRef.current?.focus();

    lastNameRef.current?.focus();

    emailRef.current?.focus();

Це зручно для невеликих форм.

---

# 28. Focus flow у формі

Наприклад:

    firstName
        ↓
    lastName
        ↓
    email
        ↓
    password
        ↓
    submit

Кожен input може мати свій ref.

Але не потрібно автоматично керувати focus там, де стандартна поведінка браузера вже достатня.

---

# 29. Керування focus після помилки валідації

Це один із найкорисніших сценаріїв.

Наприклад:

    const emailRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = () => {
        if (!email) {
            emailRef.current?.focus();
            return;
        }

        // submit
    };

Таким чином користувач одразу потрапляє на поле, яке потребує виправлення.

---

# 30. Приклад форми з focus при помилці

    import { useRef, useState } from "react";

    export default function LoginForm() {
        const emailRef = useRef<HTMLInputElement | null>(null);
        const [email, setEmail] = useState("");

        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            if (!email.trim()) {
                emailRef.current?.focus();
                return;
            }

            console.log("Submit");
        };

        return (
            <form onSubmit={handleSubmit}>
                <input
                    ref={emailRef}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email"
                />

                <button type="submit">
                    Login
                </button>
            </form>
        );
    }

---

# 31. Focus і accessibility

Керування focus безпосередньо пов'язане з доступністю.

Хороший focus management допомагає користувачам:

- які використовують клавіатуру;
- які не використовують мишу;
- які використовують screen reader;
- які працюють із формами;
- які працюють із модальними вікнами.

Не слід переміщувати focus без причини.

Потрібно запитати:

> Чи допомагає ця зміна focus користувачу зрозуміти, де він зараз знаходиться?

---

# 32. Не прибирай стандартний keyboard navigation без потреби

Не потрібно без необхідності робити:

    element.blur();

або постійно примусово переводити focus.

Браузер вже має стандартну keyboard navigation.

React має допомагати користувачу, а не боротися з поведінкою браузера.

---

# 33. `tabIndex`

Для keyboard navigation може використовуватися:

    tabIndex

Наприклад:

    <button tabIndex={0}>
        Save
    </button>

Але для стандартних інтерактивних елементів:

    <button>
    <input>
    <select>
    <textarea>

зазвичай не потрібно вручну задавати `tabIndex`.

---

# 34. `tabIndex={-1}`

`tabIndex={-1}` прибирає елемент із звичайної Tab-навігації, але дозволяє програмно встановити focus.

Наприклад:

    <div
        ref={containerRef}
        tabIndex={-1}
    >
        Content
    </div>

Потім:

    containerRef.current?.focus();

Це часто використовується для focus management у складніших UI.

---

# 35. `tabIndex` — обережно

Не потрібно хаотично використовувати:

    tabIndex={1}
    tabIndex={2}
    tabIndex={3}

Позитивні значення `tabIndex` можуть створити неприродний порядок keyboard navigation.

У більшості випадків краще:

    tabIndex={0}

або:

    tabIndex={-1}

або взагалі не задавати `tabIndex`.

---

# 36. Focus і клавіша Enter

Для input можна реагувати на `Enter`.

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            console.log("Enter pressed");
        }
    };

    <input
        ref={inputRef}
        onKeyDown={handleKeyDown}
    />

---

# 37. Focus і клавіша Escape

Наприклад, закриття пошуку:

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Escape") {
            inputRef.current?.blur();
        }
    };

---

# 38. Практичний Search Input

    import { useRef } from "react";

    export default function Search() {
        const inputRef = useRef<HTMLInputElement | null>(null);

        const handleSearch = () => {
            inputRef.current?.focus();
        };

        const handleKeyDown = (
            event: React.KeyboardEvent<HTMLInputElement>
        ) => {
            if (event.key === "Escape") {
                inputRef.current?.blur();
            }
        };

        return (
            <div>
                <button onClick={handleSearch}>
                    Search
                </button>

                <input
                    ref={inputRef}
                    placeholder="Search..."
                    onKeyDown={handleKeyDown}
                />
            </div>
        );
    }

---

# 39. Focus після додавання нового елемента

Наприклад, список input:

    const [items, setItems] = useState<string[]>([]);

Після додавання нового input може виникнути потреба перевести focus на нього.

Це вже складніший сценарій, тому для динамічних списків потрібно правильно організовувати refs.

Для невеликої кількості елементів можна використовувати окремі refs.

Для динамічних списків часто використовують callback refs або `Map`.

---

# 40. Callback ref для input

Ref можна передати як функцію:

    const setInputRef = (element: HTMLInputElement | null) => {
        if (element) {
            element.focus();
        }
    };

    <input ref={setInputRef} />

Callback ref отримує:

    HTMLInputElement

коли елемент з'явився.

При видаленні React може викликати callback із:

    null

---

# 41. Callback ref для автоматичного focus

Приклад:

    export default function Input() {
        const setInputRef = (element: HTMLInputElement | null) => {
            if (element) {
                element.focus();
            }
        };

        return (
            <input
                ref={setInputRef}
                placeholder="Your name"
            />
        );
    }

Це працює, але для простого випадку часто достатньо:

    useRef + useEffect

---

# 42. `useRef` vs callback ref

### Object ref

    const inputRef = useRef<HTMLInputElement | null>(null);

    <input ref={inputRef} />

Після монтування:

    inputRef.current

### Callback ref

    const setInputRef = (element: HTMLInputElement | null) => {
        // ...
    };

    <input ref={setInputRef} />

Callback ref зручний, коли потрібно реагувати саме на момент підключення або відключення DOM-вузла.

---

# 43. Focus першого input

Поширений патерн:

    useEffect(() => {
        firstInputRef.current?.focus();
    }, []);

Наприклад, форма:

    export default function RegisterForm() {
        const nameRef = useRef<HTMLInputElement | null>(null);

        useEffect(() => {
            nameRef.current?.focus();
        }, []);

        return (
            <form>
                <input
                    ref={nameRef}
                    placeholder="Name"
                />

                <input placeholder="Email" />

                <button type="submit">
                    Register
                </button>
            </form>
        );
    }

---

# 44. Focus у модальному вікні

Типовий сценарій:

    modal opens
        ↓
    input appears
        ↓
    input gets focus

Приклад:

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

Для складних modal/dialog компонентів також потрібно думати про:

- куди повернути focus після закриття;
- keyboard navigation;
- Escape;
- focus trap;
- accessibility.

---

# 45. Повернення focus після закриття

Наприклад, є кнопка:

    const openButtonRef = useRef<HTMLButtonElement | null>(null);

Після закриття модального вікна можна повернути focus:

    openButtonRef.current?.focus();

Ідея:

    Open button
        ↓
    Modal opens
        ↓
    Modal input gets focus
        ↓
    Modal closes
        ↓
    Focus returns to Open button

Це хороший accessibility-патерн.

---

# 46. Focus trap

У модальному вікні часто потрібно, щоб Tab-навігація не виходила за межі dialog.

Це називається:

**focus trap**

Наприклад:

    Modal
    ├── Close button
    ├── Input
    └── Save button

Коли користувач натискає Tab після останнього елемента, focus повертається на перший.

Ручна реалізація focus trap може бути складною.

У реальному проєкті для складних dialog-компонентів часто використовують готові accessibility-рішення.

---

# 47. Focus management — це не тільки `focus()`

Повноцінне керування focus включає:

- встановлення focus;
- зняття focus;
- повернення focus;
- порядок Tab;
- keyboard navigation;
- Escape;
- focus trap;
- accessibility;
- повідомлення screen reader.

Тому `useRef` — це лише інструмент для доступу до DOM.

---

# 48. `document.activeElement`

Браузер дозволяє отримати поточний активний елемент:

    document.activeElement

Наприклад:

    console.log(document.activeElement);

Але в React не варто будувати всю логіку focus навколо глобального пошуку DOM.

Якщо компонент володіє елементом:

    const inputRef = useRef<HTMLInputElement | null>(null);

то краще:

    inputRef.current

---

# 49. Ref vs `document.querySelector()`

Неідеальний React-підхід:

    const input = document.querySelector("#email");

    input?.focus();

Кращий:

    const emailRef = useRef<HTMLInputElement | null>(null);

    <input id="email" ref={emailRef} />

    emailRef.current?.focus();

Причина:

**ref пов'язаний із конкретним DOM-вузлом компонента.**

`querySelector()` шукає елемент у всьому DOM.

---

# 50. Коли `querySelector()` все ж може бути потрібним

Іноді стороння бібліотека або складна інтеграція справді потребує DOM API.

Наприклад:

    const element = containerRef.current?.querySelector(".item");

Але це має бути винятком, а не стандартним способом роботи з власними React-компонентами.

---

# 51. Controlled input і ref

Важливе розділення:

    value
        ↓
    state

    focus
        ↓
    ref

Наприклад:

    const [value, setValue] = useState("");

    const inputRef = useRef<HTMLInputElement | null>(null);

    <input
        ref={inputRef}
        value={value}
        onChange={(event) => setValue(event.target.value)}
    />

Тут:

- `value` контролюється state;
- focus контролюється ref.

Це нормальне поєднання.

---

# 52. Ref не замінює state

Не потрібно робити:

    const valueRef = useRef("");

як заміну:

    const [value, setValue] = useState("");

якщо значення повинно відображатися в UI.

Зміна:

    valueRef.current = "Hello";

не викликає повторний render.

Тому:

**дані UI → state**

**імперативна DOM-взаємодія → ref**

---

# 53. Ref для focus, state для value

Хороший приклад:

    const [value, setValue] = useState("");

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleClear = () => {
        setValue("");
        inputRef.current?.focus();
    };

    return (
        <>
            <input
                ref={inputRef}
                value={value}
                onChange={(event) => setValue(event.target.value)}
            />

            <button onClick={handleClear}>
                Clear
            </button>
        </>
    );

Тут кожен інструмент використовується за призначенням.

---

# 54. Focus після очищення input

Приклад:

    const handleClear = () => {
        setValue("");
        inputRef.current?.focus();
    };

Після натискання:

    value → ""

і:

    input → focus

Це дуже поширений UX-патерн для пошукових полів.

---

# 55. Focus і `useLayoutEffect`

Іноді DOM потрібно виміряти або синхронно виконати DOM-операцію до того, як браузер намалює результат.

Для цього існує:

    useLayoutEffect

Наприклад:

    useLayoutEffect(() => {
        inputRef.current?.focus();
    }, []);

Але не потрібно автоматично використовувати `useLayoutEffect` замість `useEffect`.

Для звичайного focus часто достатньо:

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

---

# 56. `useEffect` vs `useLayoutEffect`

Спрощено:

    useEffect
        ↓
    після commit / після paint у звичайному сценарії

    useLayoutEffect
        ↓
    після DOM mutation, але до browser paint

`useLayoutEffect` корисний, коли важлива синхронність із layout.

Наприклад:

- вимірювання DOM;
- позиціонування;
- уникнення видимого стрибка layout;
- деякі складні focus/layout сценарії.

---

# 57. Focus і `requestAnimationFrame`

Іноді інтеграції зі складним DOM можуть потребувати:

    requestAnimationFrame()

Наприклад:

    requestAnimationFrame(() => {
        inputRef.current?.focus();
    });

Але це не стандартне рішення для звичайного React focus.

Спочатку використовуй:

    ref + useEffect

і лише за необхідності переходь до складніших timing-механізмів.

---

# 58. Важливий принцип: не керуй DOM без потреби

React краще описує UI декларативно:

    state
        ↓
    render
        ↓
    DOM

Ref створює імперативний escape hatch:

    React component
        ↓
    ref
        ↓
    DOM API

Тому ref слід використовувати там, де декларативного React-підходу недостатньо.

---

# 59. Коли ref для input — хороша ідея

Ref доречний для:

- `focus()`;
- `blur()`;
- `select()`;
- `setSelectionRange()`;
- читання DOM-властивостей;
- вимірювання елемента;
- інтеграції зі сторонньою DOM-бібліотекою;
- keyboard/focus management;
- media API;
- спеціальних browser API.

---

# 60. Коли ref не потрібен

Не потрібно використовувати ref тільки для читання значення input у звичайній controlled form.

Замість:

    const inputRef = useRef<HTMLInputElement | null>(null);

    const value = inputRef.current?.value;

часто краще:

    const [value, setValue] = useState("");

    <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
    />

---

# 61. Controlled input

Стандартний React-підхід:

    const [email, setEmail] = useState("");

    return (
        <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
        />
    );

React контролює значення:

    state → input value

---

# 62. Ref + controlled input

Вони прекрасно працюють разом:

    const [email, setEmail] = useState("");

    const emailRef = useRef<HTMLInputElement | null>(null);

    return (
        <input
            ref={emailRef}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
        />
    );

Тут:

    state → value

    ref → focus / DOM API

---

# 63. Uncontrolled input + ref

Ref також може читати значення uncontrolled input:

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = () => {
        const value = inputRef.current?.value;

        console.log(value);
    };

    return (
        <>
            <input ref={inputRef} />

            <button onClick={handleSubmit}>
                Submit
            </button>
        </>
    );

Це вже інший підхід до form handling.

---

# 64. Controlled vs uncontrolled

### Controlled

    state → input

Плюси:

- React знає актуальне значення;
- зручно для валідації;
- зручно для conditional UI;
- легко синхронізувати UI.

### Uncontrolled

    DOM → value

Плюси:

- менше state;
- зручно для деяких простих форм;
- ref дозволяє отримати DOM value.

Не потрібно змішувати підходи без причини.

---

# 65. Focus після submit

Іноді після успішного submit потрібно очистити input і повернути focus:

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        setValue("");
        inputRef.current?.focus();
    };

Це особливо корисно для:

- search;
- chat;
- comment forms;
- todo forms;
- швидкого введення.

---

# 66. Приклад Todo Input

    import { useRef, useState } from "react";

    export default function TodoForm() {
        const [title, setTitle] = useState("");

        const inputRef = useRef<HTMLInputElement | null>(null);

        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            if (!title.trim()) {
                inputRef.current?.focus();
                return;
            }

            console.log("Create todo:", title);

            setTitle("");
            inputRef.current?.focus();
        };

        return (
            <form onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="New todo"
                />

                <button type="submit">
                    Add
                </button>
            </form>
        );
    }

---

# 67. Focus після помилки

Наприклад:

    if (!title.trim()) {
        inputRef.current?.focus();
        return;
    }

Це краще, ніж просто показати повідомлення:

    "Please enter a title"

і залишити focus десь в іншому місці.

---

# 68. Focus management у багатокроковій формі

Наприклад:

    Step 1
        ↓
    Step 2
        ↓
    Step 3

Після переходу на наступний крок можна автоматично встановити focus на перше поле нового кроку.

    useEffect(() => {
        firstInputRef.current?.focus();
    }, [step]);

Тут `step` є dependency.

---

# 69. Основний патерн для step form

    const firstInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        firstInputRef.current?.focus();
    }, [step]);

Після:

    setStep(step + 1);

React:

    render
        ↓
    новий step
        ↓
    DOM
        ↓
    effect
        ↓
    focus first input

---

# 70. Focus і conditional rendering

Потрібно пам'ятати:

    {isOpen && <input ref={inputRef} />}

Якщо:

    isOpen === false

то:

    inputRef.current === null

Якщо:

    isOpen === true

і компонент змонтований:

    inputRef.current === HTMLInputElement

Тому перевірка стану часто необхідна.

---

# 71. `ref.current` після unmount

Коли DOM-вузол видаляється:

    inputRef.current

стає:

    null

Тому не можна припускати, що ref завжди містить елемент.

Безпечний варіант:

    inputRef.current?.focus();

---

# 72. Важливе правило

Запам'ятай:

    DOM exists
        ↓
    ref.current → DOM node

    DOM removed
        ↓
    ref.current → null

---

# 73. Не використовуй ref як DOM state

Поганий підхід:

    const isFocusedRef = useRef(false);

    inputRef.current?.focus();

    isFocusedRef.current = true;

Якщо UI повинен реагувати на focus:

    const [isFocused, setIsFocused] = useState(false);

    <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
    />

Тобто:

    UI state → state

    DOM reference → ref

---

# 74. `onFocus` та `onBlur`

React має події:

    onFocus

і:

    onBlur

Приклад:

    const [isFocused, setIsFocused] = useState(false);

    return (
        <input
            ref={inputRef}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        />
    );

Тут:

    focus event → state

    DOM node → ref

---

# 75. Ref і `onFocus` виконують різні задачі

`ref`:

    const inputRef = useRef<HTMLInputElement | null>(null);

дає доступ до DOM-вузла.

`onFocus`:

    onFocus={() => ...}

реагує на подію focus.

Вони можуть використовуватися разом.

---

# 76. Приклад focus indicator

    const [isFocused, setIsFocused] = useState(false);

    return (
        <div>
            <input
                ref={inputRef}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />

            {isFocused && (
                <p>Input is focused</p>
            )}
        </div>
    );

Тут:

    state → відображення стану

    ref → прямий доступ до DOM

---

# 77. `ref.current` не викликає render

Це критично важливо.

Якщо:

    inputRef.current = someElement;

це не означає:

    React render

Так само:

    inputRef.current?.focus();

не запускає render сам по собі.

Тому ref не підходить для даних, які повинні змінювати UI.

---

# 78. Основна різниця State vs Ref

| State | Ref |
|---|---|
| змінює UI | не змінює UI |
| викликає render | не викликає render |
| immutable-style update | mutable `.current` |
| для даних UI | для DOM/імперативних значень |
| React контролює render | програміст контролює використання |

Коротко:

    State → "що показати?"

    Ref → "з яким DOM-вузлом взаємодіяти?"

---

# 79. Типовий focus pattern

Запам'ятай цей шаблон:

    import { useEffect, useRef } from "react";

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <input ref={inputRef} />
    );

Це один із базових React DOM patterns.

---

# 80. Типовий focus після кнопки

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        inputRef.current?.focus();
    };

    return (
        <>
            <button onClick={handleClick}>
                Focus
            </button>

            <input ref={inputRef} />
        </>
    );

---

# 81. Типовий select pattern

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleSelect = () => {
        inputRef.current?.focus();
        inputRef.current?.select();
    };

    return (
        <>
            <input
                ref={inputRef}
                defaultValue="React"
            />

            <button onClick={handleSelect}>
                Select
            </button>
        </>
    );

---

# 82. Типовий focus after submit pattern

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // validation / submit

        setValue("");
        inputRef.current?.focus();
    };

Цей pattern дуже корисний у:

- Todo;
- Search;
- Chat;
- Comment;
- Admin panels;
- CMS;
- навчальних застосунках.

---

# 83. Типові помилки

## Помилка 1 — відсутність null check

Небезпечно:

    inputRef.current.focus();

Краще:

    inputRef.current?.focus();

---

## Помилка 2 — focus під час render

Погано:

    inputRef.current?.focus();

прямо в тілі компонента.

Краще:

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

---

## Помилка 3 — використання ref замість state

Погано:

    const valueRef = useRef("");

    valueRef.current = inputValue;

якщо UI повинен реагувати на `inputValue`.

Краще:

    const [value, setValue] = useState("");

---

## Помилка 4 — зайвий `querySelector`

Не потрібно:

    document.querySelector("#email")?.focus();

якщо компонент уже має:

    const emailRef = useRef<HTMLInputElement | null>(null);

---

## Помилка 5 — зайвий `useLayoutEffect`

Не потрібно автоматично використовувати:

    useLayoutEffect

для кожного focus.

Спочатку:

    useEffect

і лише якщо timing справді важливий — `useLayoutEffect`.

---

## Помилка 6 — ламання keyboard navigation

Не слід без потреби змінювати:

    tabIndex

або примусово переміщати focus.

---

# 84. Практичний приклад — Search

    import { useEffect, useRef, useState } from "react";

    export default function Search() {
        const [query, setQuery] = useState("");
        const inputRef = useRef<HTMLInputElement | null>(null);

        useEffect(() => {
            inputRef.current?.focus();
        }, []);

        const handleClear = () => {
            setQuery("");
            inputRef.current?.focus();
        };

        return (
            <div>
                <input
                    ref={inputRef}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search..."
                />

                <button onClick={handleClear}>
                    Clear
                </button>
            </div>
        );
    }

---

# 85. Практичний приклад — Login

    import { useRef, useState } from "react";

    export default function Login() {
        const emailRef = useRef<HTMLInputElement | null>(null);
        const passwordRef = useRef<HTMLInputElement | null>(null);

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            if (!email.trim()) {
                emailRef.current?.focus();
                return;
            }

            if (!password.trim()) {
                passwordRef.current?.focus();
                return;
            }

            console.log({
                email,
                password,
            });
        };

        return (
            <form onSubmit={handleSubmit}>
                <input
                    ref={emailRef}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email"
                />

                <input
                    ref={passwordRef}
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                />

                <button type="submit">
                    Login
                </button>
            </form>
        );
    }

---

# 86. Практичний приклад — focus першого помилкового поля

Можна організувати валідацію так:

    if (!email.trim()) {
        emailRef.current?.focus();
        return;
    }

    if (!password.trim()) {
        passwordRef.current?.focus();
        return;
    }

Отже focus переходить на перше поле з помилкою.

---

# 87. Практичний приклад — textarea

    import { useRef } from "react";

    export default function Comment() {
        const textareaRef = useRef<HTMLTextAreaElement | null>(null);

        const handleFocus = () => {
            textareaRef.current?.focus();
        };

        const handleSelect = () => {
            textareaRef.current?.select();
        };

        return (
            <div>
                <textarea
                    ref={textareaRef}
                    defaultValue="Write your comment..."
                />

                <button onClick={handleFocus}>
                    Focus
                </button>

                <button onClick={handleSelect}>
                    Select all
                </button>
            </div>
        );
    }

---

# 88. Практичний приклад — focus наступного поля

    import { useRef } from "react";

    export default function Form() {
        const nameRef = useRef<HTMLInputElement | null>(null);
        const emailRef = useRef<HTMLInputElement | null>(null);

        const handleNameKeyDown = (
            event: React.KeyboardEvent<HTMLInputElement>
        ) => {
            if (event.key === "Enter") {
                event.preventDefault();
                emailRef.current?.focus();
            }
        };

        return (
            <form>
                <input
                    ref={nameRef}
                    placeholder="Name"
                    onKeyDown={handleNameKeyDown}
                />

                <input
                    ref={emailRef}
                    placeholder="Email"
                />
            </form>
        );
    }

Це приклад keyboard-driven UI.

---

# 89. Практичний приклад — фокус при відкритті

    import { useEffect, useRef } from "react";

    type Props = {
        isOpen: boolean;
    };

    export default function SearchPanel({ isOpen }: Props) {
        const inputRef = useRef<HTMLInputElement | null>(null);

        useEffect(() => {
            if (isOpen) {
                inputRef.current?.focus();
            }
        }, [isOpen]);

        if (!isOpen) {
            return null;
        }

        return (
            <div>
                <input
                    ref={inputRef}
                    placeholder="Search..."
                />
            </div>
        );
    }

---

# 90. Важливий порядок роботи React

Для DOM ref потрібно мислити приблизно так:

    render
        ↓
    React creates/updates DOM
        ↓
    ref attached
        ↓
    effects run
        ↓
    browser interaction

Тому DOM ref доступний після того, як відповідний DOM-вузол був підключений.

---

# 91. Що відбувається при unmount

Було:

    inputRef.current
        ↓
    HTMLInputElement

Після видалення:

    inputRef.current
        ↓
    null

Це важливо для cleanup та conditional rendering.

---

# 92. React Strict Mode

У development-режимі `StrictMode` React може виконувати деякі lifecycle-related операції додатково, щоб допомагати знаходити помилки.

Тому не потрібно будувати логіку так, ніби callback ref або effect гарантовано виконається лише один раз у development.

Наприклад, якщо focus виконується в effect:

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

такий код повинен бути безпечним для повторного виконання.

---

# 93. Focus і React 19

У сучасному React `ref` має ще ширше використання при роботі з власними компонентами.

У React 19 функціональний компонент може приймати `ref` як prop.

Наприклад:

    type InputProps = {
        label: string;
        ref?: React.Ref<HTMLInputElement>;
    };

    function CustomInput({ label, ref }: InputProps) {
        return (
            <label>
                {label}

                <input ref={ref} />
            </label>
        );
    }

Але передача refs через власні компоненти та `useImperativeHandle` — це вже окрема тема.

---

# 94. Основна задача цього розділу

Для `03-focus-and-inputs` потрібно добре розуміти:

    useRef
        ↓
    DOM input
        ↓
    ref.current
        ↓
    imperative DOM API

Особливо:

    focus()
    blur()
    select()
    setSelectionRange()

---

# 95. Корисні DOM API для input

| API | Призначення |
|---|---|
| `focus()` | встановити focus |
| `blur()` | прибрати focus |
| `select()` | виділити весь текст |
| `setSelectionRange()` | встановити межі виділення |
| `selectionStart` | початок виділення |
| `selectionEnd` | кінець виділення |
| `value` | поточне DOM-значення |
| `disabled` | стан disabled |
| `readOnly` | стан read-only |

---

# 96. React Events для focus

Корисні події:

    onFocus

    onBlur

    onKeyDown

    onKeyUp

    onChange

Наприклад:

    <input
        ref={inputRef}
        onFocus={() => console.log("focus")}
        onBlur={() => console.log("blur")}
        onKeyDown={(event) => console.log(event.key)}
    />

---

# 97. Ref + Events

Ref:

    inputRef.current?.focus();

Event:

    onFocus={() => ...}

State:

    const [isFocused, setIsFocused] = useState(false);

Це три різні механізми:

    ref   → DOM
    event → реакція на дію користувача
    state → UI state

---

# 98. Загальна архітектура input

Хороший React input може виглядати так:

    state
      ↓
    value
      ↓
    input

    user action
      ↓
    event
      ↓
    setState
      ↓
    render

А для imperative actions:

    button/event/effect
        ↓
    ref.current
        ↓
    focus()

---

# 99. Коли focus потрібно контролювати вручну

Ручний focus особливо корисний після:

- відкриття modal;
- відкриття search;
- переходу на наступний step;
- помилки валідації;
- очищення форми;
- додавання нового input;
- створення нового todo;
- перемикання режиму `view → edit`;
- keyboard navigation.

---

# 100. `view → edit` pattern

Наприклад:

    const [isEditing, setIsEditing] = useState(false);

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

Після:

    setIsEditing(true);

input автоматично отримує focus.

Це дуже поширений pattern у:

- Todo;
- таблицях;
- CMS;
- адмін-панелях;
- inline editing.

---

# 101. Inline editing

Приклад:

    import { useEffect, useRef, useState } from "react";

    export default function EditableTitle() {
        const [isEditing, setIsEditing] = useState(false);
        const [title, setTitle] = useState("React");

        const inputRef = useRef<HTMLInputElement | null>(null);

        useEffect(() => {
            if (isEditing) {
                inputRef.current?.focus();
                inputRef.current?.select();
            }
        }, [isEditing]);

        if (!isEditing) {
            return (
                <button onClick={() => setIsEditing(true)}>
                    {title}
                </button>
            );
        }

        return (
            <input
                ref={inputRef}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        setIsEditing(false);
                    }
                }}
            />
        );
    }

Це дуже хороший практичний приклад використання:

    state + ref + effect + events

---

# 102. Що тут робить State

    isEditing

визначає:

    button
    або
    input

А:

    title

зберігає значення.

---

# 103. Що тут робить Ref

    inputRef

не зберігає title.

Він потрібен для:

    focus()

і:

    select()

Тобто:

    state → data/UI

    ref → imperative DOM

---

# 104. Що тут робить Effect

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [isEditing]);

Effect реагує на зміну:

    isEditing

і після появи input виконує DOM-операції.

---

# 105. Практична модель мислення

Коли виникає задача:

> "Мені потрібно поставити курсор у цей input."

думай:

    DOM interaction
        ↓
    ref

Коли:

> "Мені потрібно змінити значення, і UI має оновитися."

думай:

    state

Коли:

> "Мені потрібно реагувати на натискання клавіші."

думай:

    event

Коли:

> "Мені потрібно виконати дію після render/зміни state."

думай:

    effect

---

# 106. Ref vs State — найважливіше порівняння

    const [value, setValue] = useState("");

    const inputRef = useRef<HTMLInputElement | null>(null);

`value`:

    змінюється
        ↓
    render
        ↓
    UI оновлюється

`inputRef.current`:

    змінюється
        ↓
    React не робить render

---

# 107. Коротка таблиця

| Задача | Інструмент |
|---|---|
| зберегти значення input для UI | `useState` |
| встановити focus | `useRef` |
| прибрати focus | `useRef` |
| виділити текст | `useRef` |
| реагувати на focus | `onFocus` |
| реагувати на blur | `onBlur` |
| реагувати на клавішу | `onKeyDown` |
| виконати focus після mount | `useEffect + useRef` |
| виміряти DOM | `useRef` |
| оновити UI | `useState` |

---

# 108. Core / Junior / Middle / Senior

## Core

Потрібно знати:

- `useRef`;
- `ref`;
- `.current`;
- `HTMLInputElement`;
- `focus()`;
- `blur()`;
- `select()`;
- null checking;
- ref vs state.

Базовий приклад:

    const inputRef = useRef<HTMLInputElement | null>(null);

    <input ref={inputRef} />

    inputRef.current?.focus();

---

## Junior

Потрібно вміти:

- автоматично ставити focus;
- використовувати `useEffect`;
- працювати з кількома input;
- фокусувати перше поле з помилкою;
- використовувати `select()`;
- використовувати `setSelectionRange()`;
- працювати з `textarea`;
- розуміти controlled/uncontrolled input;
- розуміти accessibility basics;
- використовувати keyboard events.

---

## Middle

Потрібно розуміти:

- callback refs;
- focus management;
- conditional rendering + refs;
- modal focus;
- повернення focus;
- `tabIndex`;
- `useLayoutEffect`;
- dynamic refs;
- складні form flows;
- accessibility patterns;
- взаємодію React з DOM API.

---

## Senior

Потрібно розуміти:

- декларативний vs імперативний підхід;
- commit phase;
- timing refs/effects;
- focus management architecture;
- accessibility;
- keyboard navigation;
- focus trap;
- third-party DOM integrations;
- concurrent rendering implications;
- imperative escape hatches;
- межу між React state та browser DOM state.

---

# 109. Питання для співбесіди

### 1. Що таке DOM ref?

Посилання на конкретний DOM-вузол, яке React може записати в:

    ref.current

---

### 2. Для чого потрібен ref у input?

Для імперативних операцій:

    focus()
    blur()
    select()
    setSelectionRange()

---

### 3. Чому `ref.current` може бути `null`?

Тому що:

- елемент ще не змонтований;
- елемент уже видалений;
- ref ще не підключений.

---

### 4. Чи викликає зміна `ref.current` render?

Ні.

---

### 5. Чим ref відрізняється від state?

State впливає на render.

Ref — mutable container, зміна якого сама по собі не викликає render.

---

### 6. Як автоматично встановити focus?

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

---

### 7. Як виділити весь текст?

    inputRef.current?.select();

---

### 8. Як встановити focus після відкриття modal?

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

---

### 9. Чому не використовувати `document.querySelector()`?

Тому що ref:

- безпосередньо пов'язаний із DOM-вузлом компонента;
- не потребує глобального пошуку;
- краще відповідає React component model.

---

### 10. Як типізувати input ref?

    const inputRef = useRef<HTMLInputElement | null>(null);

---

### 11. Як типізувати textarea ref?

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

---

### 12. Чи можна використовувати ref і state разом?

Так.

Наприклад:

    state → value

    ref → focus

---

### 13. Що робити, якщо input з'являється через conditional rendering?

Використати effect, який залежить від стану:

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

---

### 14. Що таке callback ref?

Функція, яку React викликає при підключенні/відключенні DOM-вузла.

    const setRef = (element: HTMLInputElement | null) => {
        // ...
    };

    <input ref={setRef} />

---

### 15. Коли використовувати `useLayoutEffect`?

Коли DOM потрібно виміряти або синхронно змінити до browser paint і звичайного `useEffect` недостатньо.

---

# 110. Mini Cheat Sheet

## Створити ref

    const inputRef = useRef<HTMLInputElement | null>(null);

## Підключити до input

    <input ref={inputRef} />

## Focus

    inputRef.current?.focus();

## Blur

    inputRef.current?.blur();

## Select all

    inputRef.current?.select();

## Selection range

    inputRef.current?.setSelectionRange(0, 5);

## Auto focus

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

## Focus після зміни state

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

## Textarea

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

## Button

    const buttonRef = useRef<HTMLButtonElement | null>(null);

## Select

    const selectRef = useRef<HTMLSelectElement | null>(null);

---

# 111. Головна схема

    import { useEffect, useRef } from "react";

    export default function Input() {
        const inputRef = useRef<HTMLInputElement | null>(null);

        useEffect(() => {
            inputRef.current?.focus();
        }, []);

        return (
            <input
                ref={inputRef}
                placeholder="Enter text..."
            />
        );
    }

Запам'ятай:

    useRef
        ↓
    ref
        ↓
    ref.current
        ↓
    DOM element
        ↓
    focus()

---

# 112. Головні правила

1. **`useRef` може зберігати посилання на DOM-вузол.**

2. **DOM-вузол доступний через `ref.current`.**

3. **До DOM ref потрібно звертатися після того, як елемент змонтований.**

4. **Для автоматичного focus часто використовується `useEffect`.**

5. **`focus()` встановлює focus.**

6. **`blur()` прибирає focus.**

7. **`select()` виділяє текст.**

8. **`setSelectionRange()` керує межами виділення.**

9. **Зміна `ref.current` не викликає render.**

10. **State використовується для даних, які впливають на UI.**

11. **Ref використовується для imperative DOM interactions.**

12. **Не потрібно використовувати `querySelector()` там, де достатньо React ref.**

13. **Focus management повинен враховувати accessibility.**

14. **Не потрібно без причини ламати стандартну keyboard navigation.**

15. **`useRef + useEffect` — один із базових React-патернів для програмного focus.**

---

# 113. Найважливіше для запам'ятовування

Якщо потрібно **змінити UI**:

    useState

Якщо потрібно **отримати DOM-елемент**:

    useRef

Якщо потрібно **поставити focus**:

    inputRef.current?.focus();

Якщо потрібно **виділити текст**:

    inputRef.current?.select();

Якщо потрібно **встановити focus після появи елемента**:

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

Якщо потрібно **відреагувати на focus**:

    onFocus

Якщо потрібно **відреагувати на втрату focus**:

    onBlur

Якщо потрібно **відреагувати на клавішу**:

    onKeyDown

---

# 114. Головна концепція розділу

React переважно працює декларативно:

    state
        ↓
    render
        ↓
    UI

Але іноді потрібно безпосередньо взаємодіяти з DOM:

    React component
        ↓
    ref
        ↓
    DOM node
        ↓
    browser API

Для input це найчастіше:

    focus()
    blur()
    select()
    setSelectionRange()

Тому головний практичний pattern цього розділу:

    const inputRef = useRef<HTMLInputElement | null>(null);

    <input ref={inputRef} />

    inputRef.current?.focus();

**State відповідає за дані та UI.  
Ref відповідає за імперативний доступ до DOM.  
Focus management відповідає за зручну та доступну взаємодію користувача з формою.**