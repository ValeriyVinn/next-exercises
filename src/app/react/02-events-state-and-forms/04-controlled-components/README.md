# React — Controlled Components

## 04. Controlled Components

Controlled Components — це React-компоненти, у яких значення form elements (`input`, `textarea`, `select`, checkbox тощо) контролюється через React state.

Основна схема:

    state
      ↓
    value
      ↓
    input
      ↓
    user changes input
      ↓
    onChange
      ↓
    setState
      ↓
    new state
      ↓
    new render
      ↓
    value

Головна ідея:

> React state є source of truth для значення form element.

Наприклад:

    const [name, setName] = useState("");

    <input
        value={name}
        onChange={event => setName(event.target.value)}
    />

Тут:

    state → value

а зміна користувачем:

    input → onChange → setState → state

---

## Ключові поняття

- controlled component
- uncontrolled component
- `value`
- `checked`
- `onChange`
- `event.target.value`
- `event.target.checked`
- source of truth
- синхронізація input і state
- controlled text input
- controlled textarea
- controlled select
- controlled checkbox
- controlled radio buttons
- controlled form
- `value={state}`
- `onChange={handler}`
- empty string як initial value
- `null` / `undefined` та uncontrolled input
- multiple inputs
- `name` attribute
- generic change handler
- TypeScript event types
- lifting state up

---

## Що потрібно пам'ятати

1. Controlled input має `value` або `checked`, прив'язаний до state.
2. `onChange` оновлює state.
3. State є source of truth.
4. Для text input використовуємо `value`.
5. Для checkbox використовуємо `checked`.
6. Для `select` використовуємо `value`.
7. Для `textarea` у React також використовуємо `value`.
8. `event.target.value` повертає значення text input.
9. `event.target.checked` повертає boolean checkbox.
10. Не потрібно читати DOM вручну через `document.querySelector()`.
11. Controlled component завжди має передбачуване значення з React state.
12. Не слід без причини змішувати controlled і uncontrolled підходи.
13. `value={undefined}` або `value={null}` може призвести до переходу між controlled/uncontrolled станами.
14. Для text input зазвичай зручно використовувати `useState("")`.
15. Для checkbox — `useState(false)`.
16. Controlled components особливо важливі для forms і validation.

---

# 1. Що таке Controlled Component

Розглянемо звичайний HTML input:

    <input />

У браузері сам DOM зберігає його поточне значення.

У React controlled input виглядає так:

    const [name, setName] = useState("");

    <input
        value={name}
        onChange={event => setName(event.target.value)}
    />

Тепер значення input визначається React state.

Схема:

    React state
        ↓
    value
        ↓
    <input>
        ↓
    user types
        ↓
    onChange
        ↓
    setState
        ↓
    React state

---

# 2. Найпростіший Controlled Input

    import { useState } from "react";

    function NameInput() {
        const [name, setName] = useState("");

        return (
            <input
                value={name}
                onChange={event => setName(event.target.value)}
            />
        );
    }

Якщо користувач вводить:

    Valeriy

state поступово змінюється:

    ""
    ↓
    "V"
    ↓
    "Va"
    ↓
    "Val"
    ↓
    "Vale"
    ↓
    "Valer"
    ↓
    "Valeri"
    ↓
    "Valeriy"

---

# 3. Два напрямки data flow

Controlled input має два напрямки:

### State → Input

    value={name}

React передає state в input.

### Input → State

    onChange={event => setName(event.target.value)}

Користувач змінює input, а React оновлює state.

Разом:

    state
      ↓
    value
      ↓
    input
      ↓
    user input
      ↓
    onChange
      ↓
    setState
      ↓
    state

---

# 4. Source of Truth

У controlled component React state є:

> source of truth

Наприклад:

    const [email, setEmail] = useState("");

    <input
        value={email}
        onChange={event => setEmail(event.target.value)}
    />

Поточне значення:

    email

визначає:

    input.value

DOM не є основним джерелом даних.

---

# 5. Чому це називається Controlled

Input контролюється React:

    state
      ↓
    input value

Якщо змінити state:

    setName("Valeriy");

input також отримає:

    "Valeriy"

Наприклад:

    function NameInput() {
        const [name, setName] = useState("");

        function setDefaultName() {
            setName("Valeriy");
        }

        return (
            <div>
                <input
                    value={name}
                    onChange={event => setName(event.target.value)}
                />

                <button onClick={setDefaultName}>
                    Set name
                </button>
            </div>
        );
    }

Натискання кнопки змінює state:

    setName("Valeriy");

і input автоматично показує:

    Valeriy

---

# 6. Controlled vs Uncontrolled

## Controlled

React state контролює значення:

    const [name, setName] = useState("");

    <input
        value={name}
        onChange={event => setName(event.target.value)}
    />

## Uncontrolled

DOM сам зберігає значення:

    <input defaultValue="Valeriy" />

У uncontrolled input React не зберігає поточне значення в state на кожній зміні.

---

# 7. Порівняння

| Controlled | Uncontrolled |
|---|---|
| state зберігає значення | DOM зберігає значення |
| `value` | `defaultValue` |
| `checked` | `defaultChecked` |
| `onChange` оновлює state | DOM змінює значення сам |
| легко робити validation | менше React-коду |
| легко контролювати UI | часто використовуються refs |
| зручно для складних forms | зручно для простих випадків |

Для навчання React forms controlled approach є дуже важливим.

---

# 8. `value`

Для text input:

    const [name, setName] = useState("");

    <input
        value={name}
        onChange={event => setName(event.target.value)}
    />

`value` визначає поточне значення input.

---

# 9. `onChange`

`onChange` реагує на зміну значення form element.

Наприклад:

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setName(event.target.value);
    }

Потім:

    <input
        value={name}
        onChange={handleChange}
    />

---

# 10. Що таке `event.target.value`

Для text input:

    event.target.value

містить поточний текст.

Наприклад:

    <input
        value={name}
        onChange={event => {
            console.log(event.target.value);
        }}
    />

Якщо користувач ввів:

    React

отримаємо:

    "React"

---

# 11. Controlled Text Input

    import { useState } from "react";

    function UsernameInput() {
        const [username, setUsername] = useState("");

        return (
            <div>
                <label>
                    Username

                    <input
                        type="text"
                        value={username}
                        onChange={event =>
                            setUsername(event.target.value)
                        }
                    />
                </label>

                <p>
                    Username: {username}
                </p>
            </div>
        );
    }

Кожна зміна input оновлює state.

---

# 12. Controlled Password Input

    function PasswordInput() {
        const [password, setPassword] = useState("");

        return (
            <input
                type="password"
                value={password}
                onChange={event =>
                    setPassword(event.target.value)
                }
            />
        );
    }

Тип input:

    type="password"

не змінює основний принцип controlled component.

---

# 13. Controlled Email Input

    function EmailInput() {
        const [email, setEmail] = useState("");

        return (
            <input
                type="email"
                value={email}
                onChange={event =>
                    setEmail(event.target.value)
                }
            />
        );
    }

---

# 14. Controlled Number Input

    function AgeInput() {
        const [age, setAge] = useState("");

        return (
            <input
                type="number"
                value={age}
                onChange={event =>
                    setAge(event.target.value)
                }
            />
        );
    }

Важливий момент:

> `event.target.value` для HTML input повертає string.

Навіть якщо:

    type="number"

значення з input:

    event.target.value

буде:

    string

---

# 15. Number як number у state

Якщо потрібно зберігати саме `number`, можна перетворити значення:

    const [age, setAge] = useState(0);

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setAge(Number(event.target.value));
    }

Але тут виникає проблема порожнього input.

Наприклад:

    Number("")

дає:

    0

Тому для form inputs часто зручніше тимчасово зберігати введене значення як string:

    const [age, setAge] = useState("");

а перетворювати його в number під час необхідної логіки.

---

# 16. Controlled Textarea

У звичайному HTML:

    <textarea>
        Hello
    </textarea>

У React controlled textarea:

    const [message, setMessage] = useState("");

    <textarea
        value={message}
        onChange={event =>
            setMessage(event.target.value)
        }
    />

React використовує:

    value

а не children для контролю textarea.

---

# 17. Textarea

    function MessageInput() {
        const [message, setMessage] = useState("");

        return (
            <textarea
                value={message}
                onChange={event =>
                    setMessage(event.target.value)
                }
            />
        );
    }

---

# 18. Controlled Select

Для `<select>` також використовуємо `value`:

    const [country, setCountry] = useState("");

    <select
        value={country}
        onChange={event =>
            setCountry(event.target.value)
        }
    >
        <option value="">
            Select country
        </option>

        <option value="ukraine">
            Ukraine
        </option>

        <option value="poland">
            Poland
        </option>

        <option value="germany">
            Germany
        </option>
    </select>

State:

    country

контролює selected option.

---

# 19. Select і state

Якщо:

    country = "ukraine"

React покаже:

    Ukraine

Якщо:

    setCountry("poland");

select переключиться на:

    Poland

---

# 20. Controlled Checkbox

Checkbox використовує не `value`, а:

    checked

Наприклад:

    const [isAccepted, setIsAccepted] = useState(false);

    <input
        type="checkbox"
        checked={isAccepted}
        onChange={event =>
            setIsAccepted(event.target.checked)
        }
    />

---

# 21. `checked`

Для checkbox:

    event.target.checked

повертає:

    true

або:

    false

Наприклад:

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setIsAccepted(event.target.checked);
    }

---

# 22. Checkbox Toggle

    function TermsCheckbox() {
        const [isAccepted, setIsAccepted] = useState(false);

        return (
            <label>
                <input
                    type="checkbox"
                    checked={isAccepted}
                    onChange={event =>
                        setIsAccepted(event.target.checked)
                    }
                />

                I accept the terms
            </label>
        );
    }

---

# 23. Checkbox — `value` vs `checked`

Для checkbox:

❌ Не:

    value={isAccepted}

✅ А:

    checked={isAccepted}

І:

    onChange={event =>
        setIsAccepted(event.target.checked)
    }

---

# 24. Controlled Radio Buttons

Radio buttons одного logical group можуть використовувати один state:

    const [role, setRole] = useState("student");

    <label>
        <input
            type="radio"
            name="role"
            value="student"
            checked={role === "student"}
            onChange={event =>
                setRole(event.target.value)
            }
        />

        Student
    </label>

    <label>
        <input
            type="radio"
            name="role"
            value="teacher"
            checked={role === "teacher"}
            onChange={event =>
                setRole(event.target.value)
            }
        />

        Teacher
    </label>

---

# 25. Як працює Radio

State:

    role = "student"

Тоді:

    checked={role === "student"}

дає:

    true

А:

    checked={role === "teacher"}

дає:

    false

Якщо користувач вибере Teacher:

    setRole("teacher");

Після render:

    role === "student"
        false

    role === "teacher"
        true

---

# 26. Чому потрібен `name` у radio group

Для radio buttons одного набору використовують однаковий:

    name

Наприклад:

    name="role"

Це також відповідає стандартній HTML-моделі form controls.

---

# 27. Controlled input як односторонній data flow

У React data flow залишається одностороннім:

    state
      ↓
    input
      ↓
    user interaction
      ↓
    onChange
      ↓
    setState
      ↓
    state

Input не змінює React state напряму.

Event handler отримує значення і викликає setter.

---

# 28. Чому `onChange` потрібен

Якщо написати:

    const [name, setName] = useState("");

    <input value={name} />

React контролює input значенням:

    ""

Але немає механізму оновлення state після введення.

Тому input фактично буде read-only.

Потрібно:

    <input
        value={name}
        onChange={event =>
            setName(event.target.value)
        }
    />

---

# 29. Controlled input без `onChange`

Наприклад:

    <input
        value={name}
    />

Це проблема, якщо користувач повинен змінювати значення.

Правильна пара:

    value={name}

і:

    onChange={event =>
        setName(event.target.value)
    }

Mental model:

    value
        ↓
    display

    onChange
        ↓
    update state

---

# 30. Controlled input і initial value

Для text input:

    const [name, setName] = useState("");

Потім:

    <input
        value={name}
        onChange={event =>
            setName(event.target.value)
        }
    />

На початку:

    name = ""

Тобто input порожній.

---

# 31. Controlled input з initial value

    const [name, setName] = useState("Valeriy");

    <input
        value={name}
        onChange={event =>
            setName(event.target.value)
        }
    />

Input одразу показує:

    Valeriy

---

# 32. `value` vs `defaultValue`

Це важлива різниця.

### Controlled

    <input
        value={name}
        onChange={handleChange}
    />

### Uncontrolled

    <input
        defaultValue="Valeriy"
    />

`value`:

    React controls current value

`defaultValue`:

    задає initial value для DOM

---

# 33. `checked` vs `defaultChecked`

Controlled checkbox:

    <input
        type="checkbox"
        checked={isAccepted}
        onChange={handleChange}
    />

Uncontrolled checkbox:

    <input
        type="checkbox"
        defaultChecked
    />

Аналогія:

    value
        ↔
    defaultValue

    checked
        ↔
    defaultChecked

---

# 34. Controlled component і reset

Однією з переваг controlled forms є простий reset.

Наприклад:

    const [name, setName] = useState("");

    function handleReset() {
        setName("");
    }

Input:

    <input
        value={name}
        onChange={event =>
            setName(event.target.value)
        }
    />

Після:

    setName("");

input очищується.

---

# 35. Reset кількох inputs

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    function handleReset() {
        setName("");
        setEmail("");
    }

Після reset:

    name = ""
    email = ""

і відповідні inputs автоматично очищуються.

---

# 36. Controlled form

Наприклад:

    function LoginForm() {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        return (
            <form>
                <input
                    type="email"
                    value={email}
                    onChange={event =>
                        setEmail(event.target.value)
                    }
                />

                <input
                    type="password"
                    value={password}
                    onChange={event =>
                        setPassword(event.target.value)
                    }
                />
            </form>
        );
    }

Тепер React знає поточні значення обох inputs.

---

# 37. Form state

Для форми:

    email
    password

можна мати окремі state:

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

Або один object:

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

Обидва підходи можливі.

---

# 38. Multiple controlled inputs

Наприклад:

    function RegisterForm() {
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        return (
            <form>
                <input
                    value={name}
                    onChange={event =>
                        setName(event.target.value)
                    }
                />

                <input
                    value={email}
                    onChange={event =>
                        setEmail(event.target.value)
                    }
                />

                <input
                    type="password"
                    value={password}
                    onChange={event =>
                        setPassword(event.target.value)
                    }
                />
            </form>
        );
    }

---

# 39. Один object для form state

Можна:

    type FormState = {
        name: string;
        email: string;
        password: string;
    };

    const [form, setForm] = useState<FormState>({
        name: "",
        email: "",
        password: "",
    });

Тоді:

    <input
        value={form.name}
        onChange={event =>
            setForm(prev => ({
                ...prev,
                name: event.target.value,
            }))
        }
    />

---

# 40. Чому потрібен spread

Якщо:

    form = {
        name: "Valeriy",
        email: "test@example.com",
        password: "123456",
    }

і потрібно змінити тільки email:

    setForm(prev => ({
        ...prev,
        email: event.target.value,
    }));

Результат:

    {
        name: "Valeriy",
        email: "new@example.com",
        password: "123456",
    }

Інші properties зберігаються.

---

# 41. Generic change handler

Якщо всі inputs мають `name`, можна використовувати один handler.

Наприклад:

    type FormState = {
        name: string;
        email: string;
        password: string;
    };

    const [form, setForm] = useState<FormState>({
        name: "",
        email: "",
        password: "",
    });

Handler:

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, value } = event.target;

        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    }

Inputs:

    <input
        name="name"
        value={form.name}
        onChange={handleChange}
    />

    <input
        name="email"
        value={form.email}
        onChange={handleChange}
    />

    <input
        name="password"
        value={form.password}
        onChange={handleChange}
    />

---

# 42. `name` як ключ object

Наприклад:

    event.target.name

може бути:

    "email"

Тоді:

    [name]: value

означає:

    email: value

Якщо:

    name = "password"

то:

    [name]: value

створить:

    password: value

Це computed property name у JavaScript.

---

# 43. Generic handler для text inputs

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, value } = event.target;

        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    }

Цей pattern дуже часто зустрічається у React forms.

---

# 44. Generic handler для checkbox

Для checkbox потрібно використовувати:

    checked

а не:

    value

Наприклад:

    function handleCheckboxChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, checked } = event.target;

        setForm(prev => ({
            ...prev,
            [name]: checked,
        }));
    }

---

# 45. Form з checkbox

    type FormState = {
        name: string;
        isSubscribed: boolean;
    };

    const [form, setForm] = useState<FormState>({
        name: "",
        isSubscribed: false,
    });

Text input:

    <input
        name="name"
        value={form.name}
        onChange={handleChange}
    />

Checkbox:

    <input
        type="checkbox"
        name="isSubscribed"
        checked={form.isSubscribed}
        onChange={handleCheckboxChange}
    />

---

# 46. Один handler для text input і checkbox

Можна перевіряти `type`:

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, value, type, checked } = event.target;

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                : value,
        }));
    }

Тоді:

    <input
        name="name"
        value={form.name}
        onChange={handleChange}
    />

    <input
        type="checkbox"
        name="isSubscribed"
        checked={form.isSubscribed}
        onChange={handleChange}
    />

---

# 47. TypeScript event types

Для `<input>`:

    React.ChangeEvent<HTMLInputElement>

Наприклад:

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setName(event.target.value);
    }

Для `<textarea>`:

    React.ChangeEvent<HTMLTextAreaElement>

Для `<select>`:

    React.ChangeEvent<HTMLSelectElement>

---

# 48. TypeScript input handler

    function handleNameChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setName(event.target.value);
    }

---

# 49. TypeScript textarea handler

    function handleMessageChange(
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) {
        setMessage(event.target.value);
    }

---

# 50. TypeScript select handler

    function handleCountryChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        setCountry(event.target.value);
    }

---

# 51. Inline handler vs separate handler

### Inline

    <input
        value={name}
        onChange={event =>
            setName(event.target.value)
        }
    />

### Separate function

    function handleNameChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setName(event.target.value);
    }

    <input
        value={name}
        onChange={handleNameChange}
    />

Обидва варіанти правильні.

Для складнішої логіки окремий handler часто читабельніший.

---

# 52. Controlled component і validation

Controlled input особливо зручний для validation.

Наприклад:

    const [email, setEmail] = useState("");

    const isValidEmail =
        email.includes("@");

Тепер UI може залежати від state:

    <button disabled={!isValidEmail}>
        Submit
    </button>

Схема:

    input
      ↓
    state
      ↓
    validation
      ↓
    UI

---

# 53. Controlled input і conditional UI

Наприклад:

    const [password, setPassword] = useState("");

    const isLongEnough =
        password.length >= 8;

Можна показати:

    {isLongEnough && (
        <p>
            Password length is valid.
        </p>
    )}

State контролює не тільки input, а й інший UI.

---

# 54. Controlled input і derived values

Наприклад:

    const [password, setPassword] = useState("");

    const passwordLength = password.length;

`passwordLength` не обов'язково повинен бути окремим state.

Краще:

    const passwordLength = password.length;

Це derived value.

---

# 55. Controlled input і submit

Controlled form дозволяє легко отримати актуальні дані під час submit:

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        console.log({
            name,
            email,
            password,
        });
    }

Форма:

    <form onSubmit={handleSubmit}>
        ...
        <button type="submit">
            Submit
        </button>
    </form>

---

# 56. Повний приклад Login Form

    import { useState } from "react";

    function LoginForm() {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        function handleSubmit(
            event: React.FormEvent<HTMLFormElement>
        ) {
            event.preventDefault();

            console.log({
                email,
                password,
            });
        }

        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Email

                    <input
                        type="email"
                        value={email}
                        onChange={event =>
                            setEmail(event.target.value)
                        }
                    />
                </label>

                <label>
                    Password

                    <input
                        type="password"
                        value={password}
                        onChange={event =>
                            setPassword(event.target.value)
                        }
                    />
                </label>

                <button type="submit">
                    Login
                </button>
            </form>
        );
    }

---

# 57. Повний приклад Contact Form

    import { useState } from "react";

    function ContactForm() {
        const [name, setName] = useState("");
        const [message, setMessage] = useState("");

        function handleSubmit(
            event: React.FormEvent<HTMLFormElement>
        ) {
            event.preventDefault();

            console.log({
                name,
                message,
            });
        }

        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Name

                    <input
                        value={name}
                        onChange={event =>
                            setName(event.target.value)
                        }
                    />
                </label>

                <label>
                    Message

                    <textarea
                        value={message}
                        onChange={event =>
                            setMessage(event.target.value)
                        }
                    />
                </label>

                <button type="submit">
                    Send
                </button>
            </form>
        );
    }

---

# 58. Controlled Form з object state

    type ContactFormState = {
        name: string;
        email: string;
        message: string;
    };

    function ContactForm() {
        const [form, setForm] =
            useState<ContactFormState>({
                name: "",
                email: "",
                message: "",
            });

        function handleChange(
            event:
                React.ChangeEvent<
                    HTMLInputElement
                    | HTMLTextAreaElement
                >
        ) {
            const { name, value } = event.target;

            setForm(prev => ({
                ...prev,
                [name]: value,
            }));
        }

        function handleSubmit(
            event: React.FormEvent<HTMLFormElement>
        ) {
            event.preventDefault();

            console.log(form);
        }

        return (
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                />

                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                />

                <button type="submit">
                    Send
                </button>
            </form>
        );
    }

---

# 59. Controlled component і child component

State може знаходитися в parent, а controlled input — у child.

Наприклад:

    function Parent() {
        const [name, setName] = useState("");

        return (
            <NameInput
                value={name}
                onChange={setName}
            />
        );
    }

Child:

    type NameInputProps = {
        value: string;
        onChange: (value: string) => void;
    };

    function NameInput({
        value,
        onChange,
    }: NameInputProps) {
        return (
            <input
                value={value}
                onChange={event =>
                    onChange(event.target.value)
                }
            />
        );
    }

Тут parent володіє state.

Child отримує:

    value
    onChange

Це приклад lifting state up.

---

# 60. State ownership

Потрібно визначити:

> Який компонент повинен володіти state?

Якщо тільки один input використовує значення:

    input
      ↓
    local state

Якщо кілька компонентів повинні використовувати одне значення:

    parent state
        ↓
    ┌───────┴───────┐
    ↓               ↓
    Input          Other UI

Тоді state часто піднімають до спільного parent.

---

# 61. Controlled component як API

Компонент може бути спроєктований так:

    type InputProps = {
        value: string;
        onChange: (value: string) => void;
    };

    function TextInput({
        value,
        onChange,
    }: InputProps) {
        return (
            <input
                value={value}
                onChange={event =>
                    onChange(event.target.value)
                }
            />
        );
    }

Використання:

    const [name, setName] = useState("");

    <TextInput
        value={name}
        onChange={setName}
    />

Це дуже поширений pattern reusable components.

---

# 62. Controlled component і reusable UI

Наприклад:

    type SearchInputProps = {
        value: string;
        onChange: (value: string) => void;
    };

    function SearchInput({
        value,
        onChange,
    }: SearchInputProps) {
        return (
            <input
                type="search"
                value={value}
                onChange={event =>
                    onChange(event.target.value)
                }
            />
        );
    }

Parent:

    const [query, setQuery] = useState("");

    <SearchInput
        value={query}
        onChange={setQuery}
    />

Тепер parent контролює search input.

---

# 63. Controlled vs uncontrolled — коли що

### Controlled підхід

Корисний, коли потрібно:

- validation
- conditional UI
- live preview
- форматування
- залежні поля
- reset
- submit logic
- синхронізація з іншими компонентами
- складні форми
- predictable state

### Uncontrolled підхід

Може бути зручним, коли:

- форма дуже проста
- не потрібно читати значення під час кожної зміни
- значення потрібне переважно під час submit
- використовується `ref`
- потрібна інтеграція з non-React code

---

# 64. Не змішуй `value` і `defaultValue` без причини

Controlled:

    <input
        value={name}
        onChange={handleChange}
    />

Uncontrolled:

    <input
        defaultValue="Valeriy"
    />

Не потрібно використовувати обидва:

    <input
        value={name}
        defaultValue="Valeriy"
    />

Потрібно визначитися, хто контролює значення.

---

# 65. Controlled → uncontrolled

Проблемний випадок:

    const [name, setName] =
        useState<string | undefined>();

    <input
        value={name}
        onChange={event =>
            setName(event.target.value)
        }
    />

Спочатку:

    name === undefined

Пізніше:

    name === "Valeriy"

Input переходить від uncontrolled до controlled.

Це небажаний pattern.

Для text input краще:

    const [name, setName] = useState("");

---

# 66. Чому `""` зручний для text input

Для controlled text input:

    const [name, setName] = useState("");

`""` означає:

    controlled input
    ↓
    порожнє значення

Тому не потрібно:

    undefined

або:

    null

як initial value без спеціальної причини.

---

# 67. Checkbox initial state

Для checkbox:

    const [isAccepted, setIsAccepted] = useState(false);

Потім:

    checked={isAccepted}

Це природна модель:

    false
      ↓
    unchecked

    true
      ↓
    checked

---

# 68. Select initial state

Для select можна використовувати:

    const [country, setCountry] = useState("");

Наприклад:

    <select
        value={country}
        onChange={event =>
            setCountry(event.target.value)
        }
    >
        <option value="">
            Select country
        </option>

        ...
    </select>

Порожній string означає, що користувач ще нічого не вибрав.

---

# 69. Controlled input і placeholder

Placeholder не є значенням input.

Наприклад:

    <input
        value={name}
        placeholder="Enter your name"
        onChange={event =>
            setName(event.target.value)
        }
    />

`placeholder` показується, коли:

    name === ""

---

# 70. Controlled input і disabled

State може контролювати не тільки `value`, а й інші властивості.

Наприклад:

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    <button
        type="submit"
        disabled={isSubmitting}
    >
        Submit
    </button>

Це той самий принцип:

    state
      ↓
    props
      ↓
    UI

---

# 71. Controlled component і conditional rendering

Наприклад:

    const [country, setCountry] = useState("");

    <select
        value={country}
        onChange={event =>
            setCountry(event.target.value)
        }
    >
        ...
    </select>

    {country === "ukraine" && (
        <p>
            You selected Ukraine.
        </p>
    )}

Input state може контролювати іншу частину UI.

---

# 72. Controlled component і live preview

Наприклад:

    const [title, setTitle] = useState("");

    <input
        value={title}
        onChange={event =>
            setTitle(event.target.value)
        }
    />

    <h2>
        {title}
    </h2>

Користувач вводить:

    React

і preview одразу показує:

    React

Це одна з головних переваг controlled inputs.

---

# 73. Controlled component і форматування

Наприклад, можна контролювати формат значення:

    const [phone, setPhone] = useState("");

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const digits = event.target.value
            .replace(/\D/g, "");

        setPhone(digits);
    }

Input:

    <input
        value={phone}
        onChange={handleChange}
    />

React контролює, яке значення залишається в input.

---

# 74. Controlled component і validation

Наприклад:

    const [email, setEmail] = useState("");

    const isValid =
        email.includes("@");

    <input
        type="email"
        value={email}
        onChange={event =>
            setEmail(event.target.value)
        }
    />

    {!isValid && email !== "" && (
        <p>
            Invalid email
        </p>
    )}

State дає можливість перевіряти значення під час введення.

Детальна validation буде в наступній темі:

    06-form-validation

---

# 75. Controlled components і forms

Загальна архітектура:

    User
      ↓
    input
      ↓
    onChange
      ↓
    React state
      ↓
    validation / derived data
      ↓
    UI

Під час submit:

    form
      ↓
    onSubmit
      ↓
    state
      ↓
    API / business logic

---

# 76. Типова помилка — тільки `value`

❌

    <input
        value={name}
    />

Якщо input повинен редагуватися користувачем, потрібен handler:

    onChange

---

# 77. Типова помилка — тільки `onChange`

Наприклад:

    <input
        onChange={event =>
            setName(event.target.value)
        }
    />

Це може бути нормальний uncontrolled input, якщо немає `value`.

Але це вже не controlled component.

Для controlled:

    <input
        value={name}
        onChange={event =>
            setName(event.target.value)
        }
    />

---

# 78. Типова помилка — `checked` через value

❌

    <input
        type="checkbox"
        value={isAccepted}
    />

Для controlled checkbox:

✅

    <input
        type="checkbox"
        checked={isAccepted}
        onChange={event =>
            setIsAccepted(event.target.checked)
        }
    />

---

# 79. Типова помилка — `event.target.value` для checkbox

Для checkbox:

❌

    setIsAccepted(event.target.value);

Потрібно:

    setIsAccepted(event.target.checked);

Text input:

    event.target.value

Checkbox:

    event.target.checked

---

# 80. Типова помилка — неправильний initial state

Для text:

❌

    const [name, setName] =
        useState<string | undefined>();

Краще:

    const [name, setName] = useState("");

Для checkbox:

    const [isAccepted, setIsAccepted] =
        useState(false);

Для select:

    const [country, setCountry] =
        useState("");

---

# 81. Типова помилка — mutation form object

❌

    form.email = event.target.value;

Правильно:

    setForm(prev => ({
        ...prev,
        email: event.target.value,
    }));

---

# 82. Типова помилка — втрата інших properties

Погано:

    setForm({
        email: event.target.value,
    });

Якщо form має:

    {
        name: "",
        email: "",
        password: "",
    }

то після такого update:

    name
    password

будуть втрачені.

Правильно:

    setForm(prev => ({
        ...prev,
        email: event.target.value,
    }));

---

# 83. Типова помилка — дублювання state

Не потрібно:

    const [email, setEmail] = useState("");

    const [isEmailValid, setIsEmailValid] =
        useState(false);

якщо:

    isEmailValid

можна легко обчислити:

    const isEmailValid =
        email.includes("@");

Це derived value.

---

# 84. Типова помилка — state для кожної властивості UI

Не кожен UI detail повинен бути state.

Наприклад:

    const [name, setName] = useState("");

    const nameLength = name.length;

Не потрібно:

    const [nameLength, setNameLength] =
        useState(0);

якщо довжина повністю визначається `name`.

---

# 85. Controlled component — головний pattern

Запам'ятай шаблон:

    const [value, setValue] = useState("");

    <input
        value={value}
        onChange={event =>
            setValue(event.target.value)
        }
    />

Для checkbox:

    const [checked, setChecked] = useState(false);

    <input
        type="checkbox"
        checked={checked}
        onChange={event =>
            setChecked(event.target.checked)
        }
    />

---

# 86. Загальний pattern для form controls

## Input

    value={state}

    onChange={event =>
        setState(event.target.value)
    }

## Textarea

    value={state}

    onChange={event =>
        setState(event.target.value)
    }

## Select

    value={state}

    onChange={event =>
        setState(event.target.value)
    }

## Checkbox

    checked={state}

    onChange={event =>
        setState(event.target.checked)
    }

---

# 87. Controlled Components + React mental model

React:

    state
      ↓
    props
      ↓
    DOM

User:

    DOM interaction
      ↓
    event
      ↓
    handler
      ↓
    setState
      ↓
    state
      ↓
    render

Це цикл controlled component.

---

# 88. Практичний алгоритм

Коли створюєш controlled input:

### Крок 1

Створи state:

    const [value, setValue] = useState("");

### Крок 2

Передай state в `value`:

    value={value}

### Крок 3

Створи `onChange`:

    onChange={event =>
        setValue(event.target.value)
    }

### Крок 4

Перевір:

    user input
        ↓
    state
        ↓
    value

Якщо цей цикл працює — input controlled.

---

# 89. Практичний алгоритм для checkbox

### Крок 1

    const [checked, setChecked] = useState(false);

### Крок 2

    checked={checked}

### Крок 3

    onChange={event =>
        setChecked(event.target.checked)
    }

Схема:

    checked state
        ↓
    checked prop
        ↓
    checkbox
        ↓
    user click
        ↓
    event.target.checked
        ↓
    setChecked
        ↓
    state

---

# 90. Практичний алгоритм для form

Для кожного поля:

    state
      ↓
    value / checked
      ↓
    input
      ↓
    onChange
      ↓
    state

Потім:

    form
      ↓
    onSubmit
      ↓
    validation
      ↓
    API request

Це фундамент для подальшої роботи з forms.

---

# 91. Controlled vs Uncontrolled — коротко

## Controlled

    React state
        ↓
    value
        ↓
    input

Переваги:

- predictable
- легко validation
- легко reset
- легко conditional UI
- легко live preview
- легко синхронізувати з іншими компонентами

## Uncontrolled

    DOM
      ↓
    input value

React не контролює кожну зміну.

Для доступу до значення часто використовують:

    ref

---

# 92. Коли controlled підхід особливо корисний

Controlled components зручні, коли потрібно:

- перевіряти значення під час введення
- показувати помилки
- блокувати submit
- форматувати input
- робити live preview
- показувати/приховувати UI
- синхронізувати поля
- скидати форму
- передавати значення між компонентами
- відправляти дані в API
- контролювати складний form state

---

# 93. Controlled Components і наступні теми

Цей розділ створює основу для:

    05-forms
        ↓
    06-form-validation

Також controlled components використовуються разом із:

    useState
    useReducer
    Context
    custom hooks
    data fetching

---

# 94. Common Mistakes

## ❌ Input без `onChange`

    <input value={name} />

## ✅

    <input
        value={name}
        onChange={event =>
            setName(event.target.value)
        }
    />

---

## ❌ Checkbox через `value`

    <input
        type="checkbox"
        value={isChecked}
    />

## ✅

    <input
        type="checkbox"
        checked={isChecked}
        onChange={event =>
            setIsChecked(event.target.checked)
        }
    />

---

## ❌ Mutation object

    form.email = value;

## ✅

    setForm(prev => ({
        ...prev,
        email: value,
    }));

---

## ❌ Втрата properties

    setForm({
        email: value,
    });

## ✅

    setForm(prev => ({
        ...prev,
        email: value,
    }));

---

## ❌ Неправильний initial state

    const [name, setName] =
        useState<string | undefined>();

## ✅

    const [name, setName] = useState("");

---

## ❌ Derived state без необхідності

    const [name, setName] = useState("");
    const [nameLength, setNameLength] =
        useState(0);

## ✅

    const [name, setName] = useState("");

    const nameLength = name.length;

---

# 95. Питання для співбесіди

### 🟢 Junior

**1. Що таке controlled component?**

Це компонент, у якому значення form element контролюється React state.

---

**2. Як створити controlled input?**

    const [name, setName] = useState("");

    <input
        value={name}
        onChange={event =>
            setName(event.target.value)
        }
    />

---

**3. Що є source of truth у controlled input?**

React state.

---

**4. Що таке `event.target.value`?**

Поточне значення text input, яке є string.

---

**5. Що використовують для checkbox?**

    checked

і:

    event.target.checked

---

**6. Чим controlled відрізняється від uncontrolled?**

У controlled поточне значення контролює React state.

В uncontrolled поточне значення зберігається DOM.

---

### 🔵 Strong Junior

**7. Чому controlled input потребує `onChange`?**

Тому що `value` контролюється state. `onChange` отримує введене значення і оновлює state.

---

**8. Чому для text input краще `useState("")`, а не `undefined`?**

Щоб input відразу був controlled і не переходив між uncontrolled та controlled станами.

---

**9. Чим відрізняються `value` і `defaultValue`?**

`value` контролює поточне значення через React.

`defaultValue` задає початкове значення uncontrolled input.

---

**10. Чим відрізняються `checked` і `defaultChecked`?**

`checked` контролюється React state.

`defaultChecked` задає початковий стан uncontrolled checkbox.

---

**11. Чому `event.target.value` для `type="number"` є string?**

Тому що DOM input value представлений як string. Якщо потрібен number, його потрібно перетворити.

---

**12. Як зробити controlled select?**

    const [country, setCountry] = useState("");

    <select
        value={country}
        onChange={event =>
            setCountry(event.target.value)
        }
    >
        ...
    </select>

---

### 🟠 Middle

**13. Що означає source of truth?**

Це місце, де зберігається основне актуальне значення даних.

У controlled component ним є React state.

---

**14. Чому controlled components зручні для validation?**

Тому що React має актуальне значення поля під час кожного update і може використовувати його для validation та conditional rendering.

---

**15. Як зробити reusable controlled input?**

Передавати:

    value

і:

    onChange

наприклад:

    type InputProps = {
        value: string;
        onChange: (value: string) => void;
    };

---

**16. Що таке lifting state up у контексті controlled components?**

Переміщення state до спільного parent, щоб кілька компонентів могли працювати з одним джерелом даних.

---

**17. Чому не варто дублювати form state?**

Тому що різні копії одного значення можуть розсинхронізуватися.

---

**18. Як працює generic change handler?**

Через `name` input:

    const { name, value } = event.target;

    setForm(prev => ({
        ...prev,
        [name]: value,
    }));

---

# 96. Mini Cheat Sheet

## Text input

    const [value, setValue] = useState("");

    <input
        value={value}
        onChange={event =>
            setValue(event.target.value)
        }
    />

---

## Textarea

    const [message, setMessage] = useState("");

    <textarea
        value={message}
        onChange={event =>
            setMessage(event.target.value)
        }
    />

---

## Select

    const [country, setCountry] = useState("");

    <select
        value={country}
        onChange={event =>
            setCountry(event.target.value)
        }
    >
        <option value="">
            Select
        </option>

        <option value="ukraine">
            Ukraine
        </option>
    </select>

---

## Checkbox

    const [checked, setChecked] = useState(false);

    <input
        type="checkbox"
        checked={checked}
        onChange={event =>
            setChecked(event.target.checked)
        }
    />

---

## Radio

    const [role, setRole] = useState("student");

    <input
        type="radio"
        name="role"
        value="student"
        checked={role === "student"}
        onChange={event =>
            setRole(event.target.value)
        }
    />

---

## Form object

    const [form, setForm] = useState({
        name: "",
        email: "",
    });

---

## Update form field

    setForm(prev => ({
        ...prev,
        email: value,
    }));

---

## Generic handler

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, value } = event.target;

        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    }

---

# 97. Рівні знань

## 🟢 Core

Потрібно знати:

- що таке controlled component
- `value`
- `checked`
- `onChange`
- `event.target.value`
- `event.target.checked`
- controlled input
- controlled textarea
- controlled select
- controlled checkbox
- `useState`
- state як source of truth
- `value` + `onChange`
- `checked` + `onChange`

---

## 🔵 Junior

Потрібно впевнено розуміти:

- controlled vs uncontrolled
- `defaultValue`
- `defaultChecked`
- multiple inputs
- form object state
- generic change handler
- `name`
- TypeScript event types
- reset form
- submit form
- derived values
- basic validation
- lifting state up

---

## 🟠 Middle

Потрібно добре розуміти:

- state ownership
- reusable controlled components
- controlled component API
- state lifting
- form state architecture
- source of truth
- controlled/uncontrolled boundaries
- synchronization
- immutable updates
- complex forms
- validation architecture

---

## 🔴 Senior

На цьому рівні важливо розуміти:

- архітектуру form state
- reusable form abstractions
- controlled vs uncontrolled trade-offs
- performance considerations для великих forms
- state ownership
- form state libraries
- custom hooks для forms
- reducer-based form state
- field-level vs form-level state
- server/client state boundaries

---

# 98. Практичний алгоритм створення Controlled Input

Запам'ятай цей шаблон.

### Крок 1 — state

    const [value, setValue] = useState("");

### Крок 2 — value

    value={value}

### Крок 3 — onChange

    onChange={event =>
        setValue(event.target.value)
    }

### Крок 4 — перевірити цикл

    state
      ↓
    value
      ↓
    input
      ↓
    onChange
      ↓
    setState
      ↓
    state

Якщо цей цикл зрозумілий — ти зрозумів основу controlled components.

---

# 99. Практичний алгоритм для Checkbox

    const [checked, setChecked] = useState(false);

    <input
        type="checkbox"
        checked={checked}
        onChange={event =>
            setChecked(event.target.checked)
        }
    />

Запам'ятати:

    text input
        → value

    checkbox
        → checked

---

# 100. Практичний алгоритм для Form

    form state
        ↓
    controlled inputs
        ↓
    onChange
        ↓
    state
        ↓
    validation
        ↓
    onSubmit
        ↓
    API

Це фундамент майбутніх форм у React.

---

# 101. Mental Model

Найважливіша схема:

    React state
         ↓
      value
         ↓
      input
         ↓
    user types
         ↓
      onChange
         ↓
      setState
         ↓
    React state
         ↓
      render
         ↓
      value

Для checkbox:

    React state
         ↓
      checked
         ↓
     checkbox
         ↓
     user click
         ↓
      onChange
         ↓
    target.checked
         ↓
      setState
         ↓
    React state

---

# 102. Головне

> Controlled component — це form element, значення якого контролюється React state.

> Для text input використовуємо:

    value={state}

> Для checkbox використовуємо:

    checked={state}

> `onChange` отримує значення користувача і оновлює state.

> Для text input:

    event.target.value

> Для checkbox:

    event.target.checked

> React state є source of truth.

> Для text inputs зазвичай використовуємо:

    useState("")

> Для checkbox:

    useState(false)

> Не мутуй form object:

    setForm(prev => ({
        ...prev,
        email: value,
    }));

> `value` означає controlled input.

> `defaultValue` означає initial value для uncontrolled input.

> `checked` означає controlled checkbox.

> `defaultChecked` означає initial state для uncontrolled checkbox.

> Controlled components особливо важливі для:

    forms
    validation
    reset
    conditional UI
    live preview
    API requests

---

# 103. Що вивчати далі

Після controlled components наступний логічний крок:

    05-forms

Тепер уже зрозуміла базова схема:

    useState
      ↓
    controlled input
      ↓
    form state
      ↓
    onSubmit
      ↓
    form data

Після цього:

    06-form-validation

де controlled components будуть використовуватися для:

    form state
      ↓
    validation
      ↓
    error state
      ↓
    user feedback
      ↓
    submit

---

# 104. Фінальна схема React Forms

    User
      ↓
    input
      ↓
    onChange
      ↓
    React state
      ↓
    validation
      ↓
    UI

    User
      ↓
    submit
      ↓
    onSubmit
      ↓
    form state
      ↓
    validation
      ↓
    API
      ↓
    response
      ↓
    UI

Це одна з базових архітектурних моделей, яку потрібно добре розуміти перед переходом до складніших React forms.