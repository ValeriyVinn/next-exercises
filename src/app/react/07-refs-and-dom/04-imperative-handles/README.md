# React — Imperative Handles

## `07-refs-and-dom/04-imperative-handles`

---

# 1. Що таке Imperative Handles

**Imperative Handle** — це механізм React, який дозволяє компоненту відкрити батьківському компоненту обмежений набір імперативних методів через `ref`.

Замість того щоб батьківський компонент отримував весь DOM-вузол:

    Parent
        ↓
    ref
        ↓
    Child DOM

можна відкрити тільки конкретний API:

    Parent
        ↓
    ref
        ↓
    Child imperative API
        ├── focus()
        ├── clear()
        └── select()

Основний інструмент:

    useImperativeHandle()

---

# 2. Головна ідея

Звичайний DOM ref:

    const inputRef = useRef<HTMLInputElement | null>(null);

    <input ref={inputRef} />

Батьківський компонент отримує сам DOM-вузол:

    inputRef.current

А `useImperativeHandle()` дозволяє компоненту сказати:

> "Не давай батьку весь внутрішній DOM. Дай йому тільки ці методи."

Наприклад:

    {
        focus: () => {
            inputRef.current?.focus();
        },

        clear: () => {
            inputRef.current?.value = "";
        }
    }

---

# 3. Навіщо потрібен `useImperativeHandle`

Без `useImperativeHandle` батьківський компонент може отримати прямий доступ до DOM-вузла дочірнього компонента.

Це іноді занадто багато.

Наприклад:

    Parent
        ↓
    ref.current
        ↓
    <input>

Тоді Parent потенційно може працювати з усім DOM API input.

З `useImperativeHandle`:

    Parent
        ↓
    ref.current
        ↓
    {
        focus(),
        clear()
    }

Тобто компонент сам визначає свій **imperative API**.

---

# 4. Що означає "imperative"

Є два основних стилі програмування UI.

## Declarative

Ми описуємо:

> Що повинно бути показано.

Наприклад:

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {isOpen && <Modal />}
        </>
    );

Ми говоримо React:

    isOpen === true
        ↓
    показати Modal

---

## Imperative

Ми говоримо:

> Зроби конкретну дію.

Наприклад:

    inputRef.current?.focus();

або:

    modalRef.current?.open();

або:

    playerRef.current?.play();

---

# 5. Declarative vs Imperative

### Declarative

    state
        ↓
    render
        ↓
    UI

### Imperative

    ref
        ↓
    method()
        ↓
    action

У React основним підходом є **declarative UI**.

Imperative APIs використовуються як спеціальний escape hatch, коли декларативного підходу недостатньо або він стає незручним.

---

# 6. `useImperativeHandle`

Базовий синтаксис:

    useImperativeHandle(
        ref,
        () => {
            return {
                // methods
            };
        }
    );

Найчастіше використовується разом із:

    useRef()

і:

    ref

---

# 7. Найпростіший приклад

Уявімо компонент:

    function CustomInput() {
        return (
            <input />
        );
    }

Потрібно дозволити батьку викликати:

    focus()

Тоді компонент може відкрити метод:

    focus()

---

# 8. Custom Input з imperative API

У сучасному React компонент може приймати `ref` як prop.

    import {
        useImperativeHandle,
        useRef,
    } from "react";

    type InputHandle = {
        focus: () => void;
    };

    type CustomInputProps = {
        ref?: React.Ref<InputHandle>;
    };

    function CustomInput({ ref }: CustomInputProps) {
        const inputRef = useRef<HTMLInputElement | null>(null);

        useImperativeHandle(ref, () => ({
            focus() {
                inputRef.current?.focus();
            },
        }));

        return (
            <input ref={inputRef} />
        );
    }

Батьківський компонент:

    function Parent() {
        const inputRef = useRef<InputHandle | null>(null);

        const handleFocus = () => {
            inputRef.current?.focus();
        };

        return (
            <>
                <CustomInput ref={inputRef} />

                <button onClick={handleFocus}>
                    Focus input
                </button>
            </>
        );
    }

Тепер Parent не отримує сам `<input>`.

Він отримує:

    {
        focus()
    }

---

# 9. Важлива модель

Внутрішньо:

    CustomInput
        ↓
    inputRef
        ↓
    HTMLInputElement

Назовні:

    Parent
        ↓
    customInputRef
        ↓
    InputHandle
        ↓
    focus()

Тобто:

    internal DOM
        ≠
    public imperative API

---

# 10. Що таке Handle

**Handle** — це об'єкт, який компонент відкриває через `ref`.

Наприклад:

    type InputHandle = {
        focus: () => void;
        clear: () => void;
        select: () => void;
    };

Це і є API компонента.

Батько бачить:

    inputRef.current?.focus();

    inputRef.current?.clear();

    inputRef.current?.select();

Але не бачить внутрішню реалізацію.

---

# 11. Handle як публічний API

Дуже корисно мислити про handle як про API класу або сервісу.

Наприклад:

    type DialogHandle = {
        open: () => void;
        close: () => void;
    };

або:

    type VideoPlayerHandle = {
        play: () => void;
        pause: () => void;
    };

або:

    type InputHandle = {
        focus: () => void;
        clear: () => void;
    };

Компонент має:

    internal implementation

і:

    public API

---

# 12. `useImperativeHandle` не створює DOM ref

Це дуже важливо.

`useRef`:

    const inputRef = useRef<HTMLInputElement | null>(null);

отримує DOM-вузол.

`useImperativeHandle`:

    useImperativeHandle(ref, () => ({
        focus() {
            inputRef.current?.focus();
        },
    }));

створює публічний API для зовнішнього ref.

Тобто вони виконують різні задачі.

---

# 13. Дві refs

У типовому компоненті може бути дві refs:

    Parent ref
        ↓
    public handle

і:

    inputRef
        ↓
    internal DOM node

Наприклад:

    const inputRef = useRef<HTMLInputElement | null>(null);

    useImperativeHandle(ref, () => ({
        focus() {
            inputRef.current?.focus();
        },
    }));

Схема:

    Parent
      │
      │ ref
      ↓
    CustomInput
      │
      │ internal ref
      ↓
    <input>

---

# 14. Чому не просто передати DOM ref

Можна зробити:

    <input ref={ref} />

Але тоді Parent отримує безпосередньо DOM-вузол.

Наприклад:

    ref.current?.focus();

    ref.current?.select();

    ref.current?.setSelectionRange(0, 5);

І компонент не контролює, які можливості використовує Parent.

З imperative handle можна відкрити тільки потрібні методи.

---

# 15. Encapsulation

`useImperativeHandle` дозволяє краще приховати внутрішню реалізацію компонента.

Наприклад:

    type SearchInputHandle = {
        focus: () => void;
        clear: () => void;
    };

Parent бачить тільки:

    focus()
    clear()

А всередині компонента може бути:

    inputRef

    state

    validation

    formatting

    selection logic

    DOM API

Parent не повинен знати ці деталі.

---

# 16. Приклад `focus()` + `clear()`

    import {
        useImperativeHandle,
        useRef,
    } from "react";

    type SearchInputHandle = {
        focus: () => void;
        clear: () => void;
    };

    type SearchInputProps = {
        ref?: React.Ref<SearchInputHandle>;
    };

    function SearchInput({ ref }: SearchInputProps) {
        const inputRef = useRef<HTMLInputElement | null>(null);

        useImperativeHandle(ref, () => ({
            focus() {
                inputRef.current?.focus();
            },

            clear() {
                if (inputRef.current) {
                    inputRef.current.value = "";
                }
            },
        }));

        return (
            <input
                ref={inputRef}
                placeholder="Search..."
            />
        );
    }

---

# 17. Parent використовує API

    function Parent() {
        const searchRef = useRef<SearchInputHandle | null>(null);

        return (
            <>
                <SearchInput ref={searchRef} />

                <button
                    onClick={() => searchRef.current?.focus()}
                >
                    Focus
                </button>

                <button
                    onClick={() => searchRef.current?.clear()}
                >
                    Clear
                </button>
            </>
        );
    }

Parent не знає, як SearchInput реалізує:

    focus()

    clear()

Він просто використовує API.

---

# 18. Imperative Handle — це не state management

`useImperativeHandle` не призначений для передачі даних між компонентами.

Не потрібно використовувати його як заміну:

    props

або:

    state

Наприклад, погана ідея:

    useImperativeHandle(ref, () => ({
        getUserName() {
            return userName;
        },
    }));

як основний спосіб передачі даних від Child до Parent.

Для звичайних даних використовуй:

    props

    state

    context

---

# 19. Коли imperative handle доречний

Він особливо доречний для дій:

- `focus()`;
- `blur()`;
- `clear()`;
- `reset()`;
- `select()`;
- `open()`;
- `close()`;
- `play()`;
- `pause()`;
- `scrollTo()`;
- `scrollIntoView()`;
- `validate()`;
- спеціальних imperative browser APIs.

---

# 20. Коли imperative handle не потрібен

Не потрібно робити handle для звичайного UI state.

Наприклад, замість:

    modalRef.current?.setOpen(true);

краще:

    const [isOpen, setIsOpen] = useState(false);

    setIsOpen(true);

І:

    {isOpen && <Modal />}

Це декларативний React-підхід.

---

# 21. Declarative modal vs imperative modal

## Declarative

    const [isOpen, setIsOpen] = useState(false);

    <button onClick={() => setIsOpen(true)}>
        Open
    </button>

    {isOpen && (
        <Modal />
    )}

Це зазвичай хороший React-підхід.

---

## Imperative

    modalRef.current?.open();

Це може бути корисним у спеціальних компонентах, але не повинно автоматично замінювати state.

---

# 22. Правило

Якщо питання звучить:

> "Що має бути на екрані?"

думай:

    state + props

Якщо питання:

> "Зроби конкретну дію з уже існуючим компонентом."

може бути доречним:

    ref + imperative handle

---

# 23. `useImperativeHandle` з `forwardRef`

У старішому та дуже поширеному React-коді можна зустріти:

    forwardRef()

Разом:

    forwardRef()

і:

    useImperativeHandle()

Це традиційний pattern до React 19.

---

# 24. Традиційний React 18 pattern

Приклад:

    import {
        forwardRef,
        useImperativeHandle,
        useRef,
    } from "react";

    type InputHandle = {
        focus: () => void;
    };

    const CustomInput = forwardRef<InputHandle, {}>(
        function CustomInput(_, ref) {
            const inputRef = useRef<HTMLInputElement | null>(null);

            useImperativeHandle(ref, () => ({
                focus() {
                    inputRef.current?.focus();
                },
            }));

            return (
                <input ref={inputRef} />
            );
        }
    );

Parent:

    function Parent() {
        const inputRef = useRef<InputHandle | null>(null);

        return (
            <>
                <CustomInput ref={inputRef} />

                <button
                    onClick={() => inputRef.current?.focus()}
                >
                    Focus
                </button>
            </>
        );
    }

---

# 25. React 19 і `ref` як prop

У React 19 `ref` може передаватися function component як звичайний prop.

Тому сучасний код може виглядати без:

    forwardRef()

Наприклад:

    type InputHandle = {
        focus: () => void;
    };

    type CustomInputProps = {
        ref?: React.Ref<InputHandle>;
    };

    function CustomInput({ ref }: CustomInputProps) {
        const inputRef = useRef<HTMLInputElement | null>(null);

        useImperativeHandle(ref, () => ({
            focus() {
                inputRef.current?.focus();
            },
        }));

        return (
            <input ref={inputRef} />
        );
    }

Це сучасний підхід.

---

# 26. Що потрібно знати про `forwardRef`

Якщо ти працюєш із сучасним React:

    React 19+

потрібно знати, що `ref` можна передавати як prop.

Але в реальних проєктах ти все одно зустрічатимеш:

    forwardRef()

особливо у:

- старих кодових базах;
- бібліотеках;
- React 18-проєктах;
- legacy components.

Тому обидва підходи потрібно вміти читати.

---

# 27. Типізація imperative handle

Найкраще явно описати API:

    type InputHandle = {
        focus: () => void;
        clear: () => void;
        select: () => void;
    };

Тоді:

    const inputRef = useRef<InputHandle | null>(null);

TypeScript буде знати:

    inputRef.current?.focus();

    inputRef.current?.clear();

    inputRef.current?.select();

---

# 28. TypeScript — перевага imperative handle

Якщо спробувати:

    inputRef.current?.something();

TypeScript повідомить про помилку, якщо:

    something

не входить до:

    InputHandle

Тобто TypeScript допомагає контролювати публічний API компонента.

---

# 29. Handle з кількома методами

    type InputHandle = {
        focus: () => void;
        clear: () => void;
        select: () => void;
        blur: () => void;
    };

Реалізація:

    useImperativeHandle(ref, () => ({
        focus() {
            inputRef.current?.focus();
        },

        clear() {
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        },

        select() {
            inputRef.current?.select();
        },

        blur() {
            inputRef.current?.blur();
        },
    }));

---

# 30. Handle не повинен бути надто великим

Поганий API:

    type InputHandle = {
        focus: () => void;
        blur: () => void;
        clear: () => void;
        select: () => void;
        setValue: (value: string) => void;
        getValue: () => string;
        setPlaceholder: (value: string) => void;
        getElement: () => HTMLInputElement | null;
        setClassName: (value: string) => void;
        ...
    };

Чим більше imperative API, тим більше компонент стає схожим на DOM wrapper.

Краще:

    type InputHandle = {
        focus: () => void;
        clear: () => void;
    };

---

# 31. Principle of Minimal Imperative API

Хороший imperative handle повинен бути:

- маленьким;
- зрозумілим;
- стабільним;
- спеціалізованим;
- орієнтованим на дії;
- приховувати внутрішню реалізацію.

Наприклад:

    type DialogHandle = {
        open: () => void;
        close: () => void;
    };

краще, ніж відкривати весь DOM.

---

# 32. Handle як abstraction layer

Уявімо складний компонент:

    RichTextEditor

Всередині:

    textarea
    toolbar
    selection
    browser APIs
    formatting
    DOM operations

Parent не повинен знати всю цю структуру.

Замість цього:

    type EditorHandle = {
        focus: () => void;
        clear: () => void;
        getText: () => string;
    };

Parent працює тільки з API.

Це abstraction layer.

---

# 33. Приклад RichText Editor API

    type EditorHandle = {
        focus: () => void;
        clear: () => void;
        getText: () => string;
    };

Тоді Parent:

    editorRef.current?.focus();

    editorRef.current?.clear();

    const text = editorRef.current?.getText();

Компонент сам вирішує, як реалізувати ці операції.

---

# 34. `reset()` як imperative action

Іноді компонент має складний внутрішній стан.

Наприклад:

    type FormHandle = {
        reset: () => void;
    };

Parent може сказати:

    formRef.current?.reset();

А сам компонент може всередині виконати:

    setName("");
    setEmail("");
    setErrors({});
    inputRef.current?.focus();

Це може бути доречним, якщо Form є складним самостійним компонентом.

---

# 35. Але коли `reset` краще зробити через props

Якщо Parent контролює state форми, краще:

    setForm({
        name: "",
        email: "",
    });

Тобто imperative handle не повинен автоматично використовуватися для будь-якого `reset()`.

---

# 36. Основне правило архітектури

Спочатку запитай:

> Чи можна вирішити це через props/state?

Якщо так:

    props/state

часто буде кращим рішенням.

Якщо задача є справді imperative:

    focus
    scroll
    play
    pause
    select
    open
    close
    reset

тоді:

    ref + imperative handle

може бути доречним.

---

# 37. `useImperativeHandle` і DOM ref

Розглянемо повний ланцюжок.

    Parent
        │
        │ ref
        ↓
    Child
        │
        │ useImperativeHandle
        ↓
    Public handle
        │
        ↓
    Internal ref
        │
        ↓
    DOM node

Наприклад:

    Parent
        ↓
    inputRef.current.focus()
        ↓
    handle.focus()
        ↓
    internalInputRef.current.focus()
        ↓
    <input>.focus()

---

# 38. Приклад із двома рівнями

    type InputHandle = {
        focus: () => void;
    };

    function CustomInput({ ref }: {
        ref?: React.Ref<InputHandle>;
    }) {
        const inputRef = useRef<HTMLInputElement | null>(null);

        useImperativeHandle(ref, () => ({
            focus() {
                inputRef.current?.focus();
            },
        }));

        return (
            <input ref={inputRef} />
        );
    }

Parent:

    const inputRef = useRef<InputHandle | null>(null);

    <CustomInput ref={inputRef} />

    inputRef.current?.focus();

---

# 39. Що Parent НЕ отримує

Parent не отримує:

    HTMLInputElement

Він отримує:

    InputHandle

Тобто:

    inputRef.current?.focus();

може працювати.

Але:

    inputRef.current?.value

не буде доступним, якщо `value` не включено до `InputHandle`.

Це і є encapsulation.

---

# 40. Чому це добре

Компонент може змінити внутрішню реалізацію.

Сьогодні:

    <input />

Завтра:

    <div>
        <input />
        <button />
    </div>

А public API може залишитися:

    focus()

Parent не потрібно змінювати.

---

# 41. Public API vs implementation

Це важливий architectural concept.

### Implementation

    const inputRef = useRef(...);

    <input ref={inputRef} />

### Public API

    {
        focus() {
            inputRef.current?.focus();
        }
    }

Parent працює тільки з:

    focus()

Це зменшує coupling.

---

# 42. Imperative handles і component boundaries

Imperative handle особливо корисний на межі:

    Parent
        ↕
    reusable component

Наприклад:

    DatePicker
    Modal
    Dialog
    VideoPlayer
    RichTextEditor
    CustomInput
    FileUploader

Ці компоненти можуть мати невеликий imperative API.

---

# 43. Приклад `VideoPlayer`

    type VideoPlayerHandle = {
        play: () => void;
        pause: () => void;
    };

Компонент:

    function VideoPlayer({ ref }: {
        ref?: React.Ref<VideoPlayerHandle>;
    }) {
        const videoRef = useRef<HTMLVideoElement | null>(null);

        useImperativeHandle(ref, () => ({
            play() {
                void videoRef.current?.play();
            },

            pause() {
                videoRef.current?.pause();
            },
        }));

        return (
            <video
                ref={videoRef}
                src="/video.mp4"
            />
        );
    }

Parent:

    const playerRef = useRef<VideoPlayerHandle | null>(null);

    <button onClick={() => playerRef.current?.play()}>
        Play
    </button>

    <button onClick={() => playerRef.current?.pause()}>
        Pause
    </button>

    <VideoPlayer ref={playerRef} />

---

# 44. Чому `play()` може бути async

У браузері:

    HTMLMediaElement.play()

може повертати:

    Promise<void>

Тому іноді потрібно:

    async play() {
        await videoRef.current?.play();
    }

або:

    play() {
        return videoRef.current?.play();
    }

Це показує, що imperative handle може відкривати не тільки прості synchronous methods.

---

# 45. Приклад `Dialog`

    type DialogHandle = {
        focus: () => void;
    };

Компонент:

    function Dialog({ ref }: {
        ref?: React.Ref<DialogHandle>;
    }) {
        const closeButtonRef = useRef<HTMLButtonElement | null>(null);

        useImperativeHandle(ref, () => ({
            focus() {
                closeButtonRef.current?.focus();
            },
        }));

        return (
            <div role="dialog">
                <button ref={closeButtonRef}>
                    Close
                </button>
            </div>
        );
    }

Це показує, що handle може абстрагувати внутрішню DOM-структуру.

---

# 46. `open()` і `close()` — обережно

Можна створити:

    type DialogHandle = {
        open: () => void;
        close: () => void;
    };

Але тут потрібно уважно подумати про architecture.

Якщо visibility контролюється Parent:

    const [isOpen, setIsOpen] = useState(false);

то декларативний підхід часто кращий.

Imperative:

    dialogRef.current?.open();

може бути корисним для спеціальних reusable components, але не повинен автоматично бути першим вибором.

---

# 47. Imperative API не повинен замінювати props

Погано:

    modalRef.current?.setTitle("Hello");

Краще:

    <Modal title="Hello" />

Props описують:

> Яким має бути компонент.

Imperative methods описують:

> Яку дію потрібно виконати.

---

# 48. Props vs Imperative Handle

| Props | Imperative Handle |
|---|---|
| описують configuration/data | описують actions |
| declarative | imperative |
| Parent → Child | Parent → action on Child |
| `title="Hello"` | `focus()` |
| `isOpen={true}` | `open()` |
| `value={value}` | `clear()` |

---

# 49. Не роби getter API без необхідності

Можна зробити:

    type Handle = {
        getValue: () => string;
    };

Але якщо значення є важливою частиною application state, часто краще:

    state

або:

    callback

Наприклад:

    onChange(value)

замість:

    ref.current?.getValue()

---

# 50. Imperative handle і callback

Іноді краще:

    <CustomInput
        value={value}
        onChange={setValue}
    />

ніж:

    inputRef.current?.getValue();

Тобто:

    data flow → props/callbacks

    actions → imperative handle

Це хороше правило для проектування компонентів.

---

# 51. `useImperativeHandle` з dependencies

Синтаксис:

    useImperativeHandle(
        ref,
        () => ({
            focus() {
                inputRef.current?.focus();
            },
        }),
        []
    );

Третій аргумент:

    dependencies

визначає, коли handle потрібно перестворити.

---

# 52. Приклад із dependency

    const [value, setValue] = useState("");

    useImperativeHandle(
        ref,
        () => ({
            logValue() {
                console.log(value);
            },
        }),
        [value]
    );

Коли:

    value

змінюється, handle оновлюється.

---

# 53. Closure у imperative handle

Потрібно пам'ятати про JavaScript closures.

Наприклад:

    const [value, setValue] = useState("");

    useImperativeHandle(
        ref,
        () => ({
            getValue() {
                return value;
            },
        }),
        [value]
    );

Метод:

    getValue()

бачить відповідне значення `value` завдяки closure.

---

# 54. Чому dependencies важливі

Якщо метод handle використовує state або props:

    useImperativeHandle(
        ref,
        () => ({
            getValue() {
                return value;
            },
        }),
        [value]
    );

`value` має бути dependency.

Інакше можна отримати stale value.

---

# 55. `ref.current` всередині handle

Інший варіант:

    useImperativeHandle(ref, () => ({
        focus() {
            inputRef.current?.focus();
        },
    }));

Тут метод працює з ref:

    inputRef.current

і зазвичай не потребує dependency на сам DOM-вузол.

---

# 56. Не створюй зайві dependencies

Наприклад:

    useImperativeHandle(
        ref,
        () => ({
            focus() {
                inputRef.current?.focus();
            },
        }),
        []
    );

Для такого handle порожній dependency array може бути цілком доречним.

Головне — розуміти, які значення використовує closure.

---

# 57. Handle і `null`

Parent ref типізують:

    const inputRef = useRef<InputHandle | null>(null);

Тому виклик:

    inputRef.current?.focus();

безпечний.

До mount:

    inputRef.current === null

Після attach:

    inputRef.current === InputHandle

Після unmount:

    inputRef.current === null

---

# 58. Життєвий цикл handle

Приблизно:

    Parent render
        ↓
    Child render
        ↓
    Child creates handle
        ↓
    React attaches ref
        ↓
    Parent can call methods

При unmount:

    Child removed
        ↓
    ref becomes null

---

# 59. Imperative handle і render

Не потрібно викликати:

    ref.current?.focus();

під час render.

Handle призначений для imperative actions:

- event handlers;
- effects;
- callbacks;
- інших контрольованих imperative flows.

---

# 60. Неправильний підхід

Погано:

    function Parent() {
        const inputRef = useRef<InputHandle | null>(null);

        inputRef.current?.focus();

        return <CustomInput ref={inputRef} />;
    }

Під час render handle може ще не існувати.

Краще:

    function Parent() {
        const inputRef = useRef<InputHandle | null>(null);

        useEffect(() => {
            inputRef.current?.focus();
        }, []);

        return <CustomInput ref={inputRef} />;
    }

---

# 61. Imperative handle + `useEffect`

Це нормальний pattern:

    useEffect(() => {
        childRef.current?.focus();
    }, []);

Але потрібно подумати, чи справді Parent повинен керувати focus.

Іноді Child сам може зробити:

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

Тоді imperative handle взагалі не потрібен.

---

# 62. Не створюй handle без зовнішньої потреби

Якщо Child сам знає, що йому потрібно зробити:

    focus()

він може зробити це сам.

Imperative handle потрібен тоді, коли:

    Parent
        ↓
    повинен запустити action
        ↓
    Child

---

# 63. Хороший use case

Наприклад, Parent має keyboard shortcut:

    Ctrl + K

і хоче активувати SearchInput:

    searchRef.current?.focus();

Тут imperative handle логічний.

---

# 64. Приклад Search shortcut

    function SearchPage() {
        const searchRef = useRef<SearchInputHandle | null>(null);

        useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (
                    event.ctrlKey &&
                    event.key.toLowerCase() === "k"
                ) {
                    event.preventDefault();
                    searchRef.current?.focus();
                }
            };

            window.addEventListener("keydown", handleKeyDown);

            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }, []);

        return (
            <SearchInput ref={searchRef} />
        );
    }

Це хороший приклад imperative API.

---

# 65. Imperative handle і reusable components

Особливо корисний для reusable components.

Наприклад:

    components/
    ├── CustomInput.tsx
    ├── Modal.tsx
    ├── DatePicker.tsx
    ├── VideoPlayer.tsx
    └── RichTextEditor.tsx

Кожен може мати невеликий public imperative API.

---

# 66. Custom Input API

    type InputHandle = {
        focus: () => void;
        clear: () => void;
    };

---

# 67. Modal API

Якщо architecture справді потребує imperative API:

    type ModalHandle = {
        open: () => void;
        close: () => void;
    };

---

# 68. DatePicker API

Наприклад:

    type DatePickerHandle = {
        focus: () => void;
        open: () => void;
    };

---

# 69. VideoPlayer API

    type VideoPlayerHandle = {
        play: () => void;
        pause: () => void;
        mute: () => void;
    };

---

# 70. RichTextEditor API

    type EditorHandle = {
        focus: () => void;
        clear: () => void;
        selectAll: () => void;
    };

---

# 71. Загальна модель reusable component

    public API
        ↓
    imperative handle
        ↓
    internal implementation

Parent не повинен знати:

    internal DOM structure

    internal state

    internal refs

    internal helper functions

Parent повинен знати:

    public methods

---

# 72. Encapsulation

Хороший компонент приховує:

    implementation details

і відкриває:

    stable API

Наприклад:

    focus()
    clear()

Це схоже на public methods класу.

---

# 73. Не перетворюй компонент на клас

`useImperativeHandle` може нагадувати:

    class Component {
        focus() {}
        clear() {}
    }

Але React function component залишається function component.

Imperative handle — це лише механізм контролю доступу через ref.

---

# 74. Imperative handle — escape hatch

У React часто використовується поняття:

**escape hatch**

Це означає механізм, який дозволяє вийти за межі стандартного декларативного підходу.

До таких інструментів належать:

    useRef
    useEffect
    useLayoutEffect
    useImperativeHandle

Їх потрібно використовувати обґрунтовано.

---

# 75. Основна небезпека

Якщо всю логіку компонента зробити imperative:

    ref.current.open()
    ref.current.close()
    ref.current.setValue()
    ref.current.setError()
    ref.current.setLoading()
    ref.current.setDisabled()

то компонент стає складнішим.

Замість цього часто краще:

    props
    state
    callbacks

Imperative API має бути маленьким.

---

# 76. Declarative first

Хороше правило React:

> Спочатку спробуй вирішити задачу декларативно.

Наприклад:

    <Modal isOpen={isOpen} />

краще за:

    modalRef.current?.open();

якщо Parent уже керує `isOpen`.

Але:

    inputRef.current?.focus();

цілком природний imperative action.

---

# 77. Imperative actions

Особливо природні imperative actions:

    focus()
    blur()
    select()
    scrollIntoView()
    play()
    pause()

Ці API вже є imperative browser APIs.

React не потрібно змушувати перетворювати кожну таку дію на state.

---

# 78. Приклад scroll API

    type SectionHandle = {
        scrollIntoView: () => void;
    };

Компонент:

    function Section({ ref }: {
        ref?: React.Ref<SectionHandle>;
    }) {
        const sectionRef = useRef<HTMLElement | null>(null);

        useImperativeHandle(ref, () => ({
            scrollIntoView() {
                sectionRef.current?.scrollIntoView({
                    behavior: "smooth",
                });
            },
        }));

        return (
            <section ref={sectionRef}>
                Content
            </section>
        );
    }

Parent:

    sectionRef.current?.scrollIntoView();

---

# 79. Чому це краще за передачу DOM ref

Parent не знає:

    sectionRef

і не знає, чи використовується:

    <section>

    <div>

    <article>

Він знає тільки:

    scrollIntoView()

Це abstraction.

---

# 80. Imperative handle як контракт

TypeScript interface:

    type SectionHandle = {
        scrollIntoView: () => void;
    };

є контрактом між:

    Parent

і:

    Child

Parent очікує цей API.

Child зобов'язаний його реалізувати.

---

# 81. Контракт можна розширювати

Наприклад:

    type InputHandle = {
        focus: () => void;
        clear: () => void;
    };

Пізніше:

    type InputHandle = {
        focus: () => void;
        clear: () => void;
        select: () => void;
    };

Але кожне розширення API збільшує public surface компонента.

Тому не додавай методи без реальної потреби.

---

# 82. Хороший API

Добре:

    type SearchInputHandle = {
        focus: () => void;
        clear: () => void;
    };

Погано:

    type SearchInputHandle = {
        getElement: () => HTMLInputElement;
        setValue: (value: string) => void;
        getValue: () => string;
        setStyle: (style: string) => void;
        setClassName: (value: string) => void;
        focus: () => void;
        clear: () => void;
    };

Другий варіант надто сильно відкриває implementation details.

---

# 83. `getElement()` — зазвичай погана абстракція

Можна зробити:

    type Handle = {
        getElement: () => HTMLInputElement | null;
    };

Але тоді Parent отримує доступ до внутрішнього DOM і може почати обходити public API.

Замість:

    getElement()

краще відкрити конкретну дію:

    focus()

    select()

    clear()

---

# 84. Imperative API повинен бути intention-based

Краще:

    focus()

ніж:

    getInputElement()

Краще:

    clear()

ніж:

    getInputElement().value = ""

Краще:

    scrollToSelected()

ніж:

    getContainer().scrollTop = ...

API повинен описувати **намір**, а не внутрішню реалізацію.

---

# 85. Це важливий architectural principle

### Погано

    "Дай мені DOM, я сам щось із ним зроблю."

### Краще

    "Зроби для мене конкретну дію."

Тобто:

    imperative handle = controlled imperative API

---

# 86. Imperative Handle і accessibility

Imperative API може бути корисним для accessibility.

Наприклад:

    focus()

дозволяє повернути focus на правильний елемент.

Але component API повинен гарантувати логічну keyboard navigation.

Наприклад:

    dialogRef.current?.focus();

не повинен бути єдиною accessibility-логікою dialog.

---

# 87. Imperative handle у forms

Можна створити:

    type FormHandle = {
        focusFirstError: () => void;
        reset: () => void;
    };

Parent:

    formRef.current?.focusFirstError();

Це може бути зручно для складного reusable form component.

Але якщо Parent контролює всю form state, часто краще використовувати callbacks/state.

---

# 88. Приклад Form Handle

    type FormHandle = {
        focusFirstError: () => void;
    };

Усередині:

    useImperativeHandle(ref, () => ({
        focusFirstError() {
            if (!name.trim()) {
                nameRef.current?.focus();
                return;
            }

            if (!email.trim()) {
                emailRef.current?.focus();
                return;
            }
        },
    }));

Parent:

    formRef.current?.focusFirstError();

Тут Parent не знає, яке саме поле потрібно сфокусувати.

---

# 89. Це хороша інкапсуляція

Parent каже:

    focusFirstError()

Child вирішує:

    яке поле?

    чому?

    у якому порядку?

    який DOM API використати?

Це правильний розподіл відповідальності.

---

# 90. Parent не повинен знати внутрішній DOM

Якщо Parent робить:

    childRef.current?.querySelector(...)

це вже ознака поганої абстракції.

Краще:

    childRef.current?.focusFirstError();

---

# 91. `useImperativeHandle` і performance

Не потрібно використовувати його всюди "для performance".

`useImperativeHandle` — це не performance optimization.

Його головна мета:

    expose imperative API

а не:

    make component faster

---

# 92. Не використовуй imperative handle як state optimization

Погана мотивація:

> "Я не хочу render, тому зроблю все через ref."

Це може призвести до складної та несинхронної архітектури.

React render існує саме для того, щоб UI відображав state.

---

# 93. Ref mutation vs UI update

Наприклад:

    inputRef.current!.value = "Hello";

DOM зміниться.

Але React state:

    value

може залишитися іншим.

Це може створити розсинхронізацію.

Тому прямі DOM mutations потрібно використовувати обережно.

---

# 94. Особливо важливо для controlled input

Якщо input:

    value={value}

контролюється React state, не варто без потреби робити:

    inputRef.current!.value = "Hello";

Тому що React може повернути DOM до значення:

    value

Краще:

    setValue("Hello");

---

# 95. Imperative handle не означає "можна мутувати все"

Handle може містити:

    focus()

    clear()

Але реалізація `clear()` повинна враховувати architecture компонента.

Якщо input controlled:

    clear() {
        setValue("");
    }

а не просто:

    inputRef.current!.value = "";

---

# 96. Правильний controlled custom input

    type InputHandle = {
        focus: () => void;
        clear: () => void;
    };

    function CustomInput({
        ref,
        value,
        onChange,
    }: {
        ref?: React.Ref<InputHandle>;
        value: string;
        onChange: (value: string) => void;
    }) {
        const inputRef = useRef<HTMLInputElement | null>(null);

        useImperativeHandle(ref, () => ({
            focus() {
                inputRef.current?.focus();
            },

            clear() {
                onChange("");
            },
        }), [onChange]);

        return (
            <input
                ref={inputRef}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
        );
    }

Тут:

    value → props

    change → callback

    focus → imperative handle

Це дуже хороший розподіл відповідальності.

---

# 97. Що відбувається при `clear()`

Parent викликає:

    inputRef.current?.clear();

Child:

    onChange("");

Parent:

    setValue("");

React:

    render

Input:

    value === ""

Тобто imperative action запускає **звичайний declarative state flow**.

Це кращий підхід, ніж пряме мутування DOM controlled input.

---

# 98. Дуже важлива модель

Imperative handle не обов'язково означає:

    mutate DOM

Він може означати:

    imperative command
        ↓
    declarative state update

Наприклад:

    clear()
        ↓
    onChange("")
        ↓
    setValue("")
        ↓
    render

---

# 99. Command API

Imperative handle можна розглядати як набір команд:

    focus()
    clear()
    reset()
    scrollToTop()
    selectAll()

Parent каже:

> Виконай команду.

Child сам вирішує, як її реалізувати.

---

# 100. Component API Design

Хороший imperative handle:

    small
    typed
    intention-based
    encapsulated
    stable

Поганий:

    large
    DOM-oriented
    implementation-dependent
    uncontrolled
    state-replacing

---

# 101. Core / Junior / Middle / Senior

## Core

Потрібно знати:

- що таке `useImperativeHandle`;
- навіщо він потрібен;
- що таке imperative API;
- як працює `ref`;
- різницю між ref і state;
- базову типізацію handle.

Базова модель:

    Parent
        ↓
    ref
        ↓
    Child handle
        ↓
    method()

---

## Junior

Потрібно вміти:

- створити `InputHandle`;
- відкрити `focus()`;
- відкрити `clear()`;
- типізувати `React.Ref<T>`;
- використовувати `useImperativeHandle`;
- розуміти `forwardRef`;
- знати React 19 ref-as-prop;
- не використовувати handle для звичайного state.

---

## Middle

Потрібно розуміти:

- encapsulation;
- public component API;
- controlled vs uncontrolled components;
- dependencies;
- closures;
- callback-based alternatives;
- imperative vs declarative architecture;
- focus management;
- reusable component design.

---

## Senior

Потрібно розуміти:

- imperative handles як escape hatch;
- API design;
- coupling;
- abstraction boundaries;
- command-oriented APIs;
- accessibility;
- React rendering model;
- commit/ref semantics;
- interaction із browser APIs;
- коли imperative API виправданий;
- коли imperative API є architectural smell.

---

# 102. Питання для співбесіди

### 1. Що робить `useImperativeHandle`?

Дозволяє визначити значення, яке буде доступне через зовнішній `ref`.

---

### 2. Для чого він використовується?

Для створення обмеженого imperative API компонента.

---

### 3. Чим `useImperativeHandle` відрізняється від `useRef`?

`useRef` створює mutable ref container.

`useImperativeHandle` визначає, що буде доступно через переданий зовнішній ref.

---

### 4. Навіщо ховати DOM за imperative handle?

Для encapsulation.

Parent отримує конкретні дії, а не внутрішній DOM.

---

### 5. Чи можна передати весь DOM ref?

Так.

Але це може створити сильніше coupling між Parent і внутрішньою реалізацією Child.

---

### 6. Що таке handle?

Об'єкт із методами, який компонент відкриває через ref.

Наприклад:

    type InputHandle = {
        focus: () => void;
        clear: () => void;
    };

---

### 7. Чи потрібно використовувати `useImperativeHandle` для кожного custom component?

Ні.

Тільки коли компонент справді потребує зовнішнього imperative API.

---

### 8. Чи замінює `useImperativeHandle` props?

Ні.

Props — для data/configuration.

Imperative handle — для commands/actions.

---

### 9. Чи замінює він state?

Ні.

State використовується для даних, які впливають на UI.

---

### 10. Що таке `forwardRef`?

Механізм, який традиційно використовувався для передачі ref через function component.

У React 19 `ref` можна передавати як prop, тому `forwardRef` більше не є необхідним для цього сценарію.

---

### 11. Чому imperative API повинен бути маленьким?

Щоб:

- зменшити coupling;
- приховати implementation details;
- спростити використання;
- зберегти API стабільним.

---

### 12. Коли краще props/state?

Коли задача описує:

    data
    configuration
    UI state

---

### 13. Коли доречний imperative handle?

Коли Parent повинен запустити конкретну дію:

    focus()
    clear()
    reset()
    play()
    pause()
    scrollTo()

---

### 14. Чи є `useImperativeHandle` способом зробити React "не reactive"?

Ні.

Це лише escape hatch для imperative interactions.

---

# 103. Mini Cheat Sheet

## Тип handle

    type InputHandle = {
        focus: () => void;
        clear: () => void;
    };

## Ref у Parent

    const inputRef = useRef<InputHandle | null>(null);

## Передача ref

    <CustomInput ref={inputRef} />

## Imperative API

    useImperativeHandle(ref, () => ({
        focus() {
            inputRef.current?.focus();
        },

        clear() {
            // ...
        },
    }));

## Виклик

    inputRef.current?.focus();

    inputRef.current?.clear();

---

# 104. Сучасний React pattern

    type InputHandle = {
        focus: () => void;
    };

    type Props = {
        ref?: React.Ref<InputHandle>;
    };

    function CustomInput({ ref }: Props) {
        const inputRef = useRef<HTMLInputElement | null>(null);

        useImperativeHandle(ref, () => ({
            focus() {
                inputRef.current?.focus();
            },
        }));

        return (
            <input ref={inputRef} />
        );
    }

Parent:

    const inputRef = useRef<InputHandle | null>(null);

    <CustomInput ref={inputRef} />

    inputRef.current?.focus();

---

# 105. Традиційний pattern

Для старого/React 18-коду:

    const CustomInput = forwardRef<InputHandle, Props>(
        function CustomInput(props, ref) {
            const inputRef = useRef<HTMLInputElement | null>(null);

            useImperativeHandle(ref, () => ({
                focus() {
                    inputRef.current?.focus();
                },
            }));

            return (
                <input ref={inputRef} />
            );
        }
    );

Потрібно знати обидва варіанти, тому що обидва зустрічаються в реальних проєктах.

---

# 106. Найважливіше правило архітектури

Не починай із:

    useImperativeHandle()

Починай із питання:

> Чи можна вирішити задачу через props/state?

Якщо так — часто це кращий варіант.

Якщо потрібна конкретна imperative action:

    focus()
    clear()
    reset()
    play()
    pause()
    scrollTo()

тоді розглядай:

    ref + useImperativeHandle

---

# 107. Головна схема

    Parent
       │
       │ ref
       ↓
    Child
       │
       │ useImperativeHandle
       ↓
    Public Handle
       │
       ↓
    Internal logic
       │
       ↓
    DOM / state / browser API

Наприклад:

    Parent
       ↓
    inputRef.current?.focus()
       ↓
    Child handle.focus()
       ↓
    inputRef.current?.focus()
       ↓
    DOM input

---

# 108. Головні правила

1. **`useImperativeHandle` створює контрольований imperative API компонента.**

2. **Handle — це об'єкт із методами, доступний через `ref`.**

3. **Не потрібно відкривати весь DOM, якщо достатньо кількох методів.**

4. **Imperative handle допомагає приховати implementation details.**

5. **Public API повинен бути маленьким.**

6. **Props використовуються для data/configuration.**

7. **State використовується для UI state.**

8. **Imperative handle використовується для actions.**

9. **`focus()`, `blur()`, `select()`, `play()`, `pause()` — природні imperative operations.**

10. **Не використовуй imperative handle як заміну state management.**

11. **Не використовуй його для звичайного Parent → Child data flow.**

12. **Не відкривай `getElement()` без реальної потреби.**

13. **Віддавай перевагу intention-based API.**

14. **У TypeScript завжди описуй handle окремим типом.**

15. **Пам'ятай про React 19: `ref` може передаватися як prop.**

16. **`forwardRef` потрібно знати для legacy/React 18-коду.**

17. **Спочатку думай declaratively, а imperative API використовуй як escape hatch.**

---

# 109. Головне порівняння

## Declarative

    <Modal isOpen={isOpen} />

означає:

> Modal відкритий, коли `isOpen === true`.

## Imperative

    modalRef.current?.open();

означає:

> Виконай команду `open()`.

---

# 110. Найважливіше для запам'ятовування

Якщо потрібно передати **дані**:

    props

Якщо потрібно зберігати **UI state**:

    useState

Якщо потрібен **DOM reference**:

    useRef

Якщо Parent повинен виконати **конкретну дію всередині Child**:

    useImperativeHandle

Якщо потрібно відкрити:

    focus()

    clear()

    reset()

    play()

    pause()

    scrollIntoView()

можна створити:

    Handle

---

# 111. Фінальний практичний приклад

    import {
        useImperativeHandle,
        useRef,
    } from "react";

    type SearchInputHandle = {
        focus: () => void;
        clear: () => void;
        select: () => void;
    };

    type SearchInputProps = {
        value: string;
        onChange: (value: string) => void;
        ref?: React.Ref<SearchInputHandle>;
    };

    function SearchInput({
        value,
        onChange,
        ref,
    }: SearchInputProps) {
        const inputRef = useRef<HTMLInputElement | null>(null);

        useImperativeHandle(ref, () => ({
            focus() {
                inputRef.current?.focus();
            },

            clear() {
                onChange("");
            },

            select() {
                inputRef.current?.select();
            },
        }), [onChange]);

        return (
            <input
                ref={inputRef}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Search..."
            />
        );
    }

Parent:

    import { useRef, useState } from "react";

    export default function SearchPage() {
        const [query, setQuery] = useState("");

        const searchRef = useRef<SearchInputHandle | null>(null);

        return (
            <div>
                <SearchInput
                    ref={searchRef}
                    value={query}
                    onChange={setQuery}
                />

                <button
                    onClick={() => searchRef.current?.focus()}
                >
                    Focus
                </button>

                <button
                    onClick={() => searchRef.current?.select()}
                >
                    Select
                </button>

                <button
                    onClick={() => searchRef.current?.clear()}
                >
                    Clear
                </button>
            </div>
        );
    }

У цьому прикладі добре видно правильний розподіл:

    value
        ↓
    props

    onChange
        ↓
    declarative data flow

    focus()
    select()
    clear()
        ↓
    imperative API

    inputRef
        ↓
    internal DOM reference

---

# 112. Головна концепція розділу

`useImperativeHandle` — це не спосіб зробити весь React imperative.

Це спосіб створити **маленький, контрольований imperative API** для компонента.

Головна модель:

    React component
        │
        ├── props → data/configuration
        │
        ├── state → UI state
        │
        ├── ref → internal DOM/reference
        │
        └── imperative handle → public actions

Найважливіша ідея:

> **Не відкривай Parent внутрішню реалізацію компонента. Відкривай тільки ті дії, які Parent справді повинен мати можливість виконати.**

Тобто замість:

    Parent
        ↓
    "Дай мені твій DOM"

краще:

    Parent
        ↓
    "Будь ласка, сфокусуйся."

і компонент сам вирішує:

    focus()
        ↓
    internal ref
        ↓
    DOM API

Саме це і є сутність **Imperative Handles**.