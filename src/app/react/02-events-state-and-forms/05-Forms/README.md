# React — Forms

## 05. Forms

Forms — це спосіб отримувати, зберігати, перевіряти та відправляти дані користувача.

У React forms будуються навколо вже вивчених понять:

    state
      ↓
    controlled inputs
      ↓
    onChange
      ↓
    form state
      ↓
    onSubmit
      ↓
    validation
      ↓
    API / business logic

Основна ідея:

> React form — це UI, який збирає дані користувача та передає їх у JavaScript-логіку.

---

## Ключові поняття

- `<form>`
- `onSubmit`
- `event.preventDefault()`
- `<input>`
- `<textarea>`
- `<select>`
- checkbox
- radio buttons
- controlled components
- form state
- `value`
- `checked`
- `onChange`
- `name`
- `type`
- `button`
- `type="submit"`
- `type="button"`
- `FormEvent`
- `ChangeEvent`
- form data
- submit handler
- reset form
- initial values
- form object
- multiple fields
- generic change handler
- form state vs UI state
- validation
- error state
- API request
- loading state
- success state

---

## Що потрібно пам'ятати

1. React form використовує звичайний HTML `<form>`.
2. Для submit у React використовують `onSubmit`.
3. `event.preventDefault()` запобігає стандартному перезавантаженню сторінки.
4. Controlled inputs зберігають актуальні значення у React state.
5. Для text input використовуємо `value`.
6. Для checkbox використовуємо `checked`.
7. `onChange` оновлює form state.
8. `name` допомагає визначити, яке поле змінилося.
9. `type="submit"` запускає submit форми.
10. `type="button"` не запускає submit.
11. Дані форми можна зберігати в окремих state або в одному object.
12. Form state потрібно змінювати immutable способом.
13. Не потрібно дублювати дані, які можна отримати з іншого state.
14. Validation може відбуватися під час введення або під час submit.
15. Submit handler — місце, де form data передається в business logic або API.
16. Після submit часто потрібні `loading`, `error` і `success` стани.
17. Reset controlled form робиться через скидання React state.
18. Для складніших forms важливо чітко розділяти form state, UI state та server state.

---

# 1. Що таке Form

HTML form:

    <form>
        ...
    </form>

призначена для збору даних користувача.

Типові приклади:

- login
- registration
- search
- contact form
- profile editing
- checkout
- settings
- comments
- filters
- admin forms
- CRUD forms

У React form залишається HTML form, але її поведінкою керує JavaScript.

---

# 2. Найпростіша React Form

    function ContactForm() {
        return (
            <form>
                <input />
                <button type="submit">
                    Send
                </button>
            </form>
        );
    }

Це вже React form.

Але поки вона не має submit logic.

---

# 3. `onSubmit`

React дозволяє обробити submit:

    function ContactForm() {
        function handleSubmit(
            event: React.FormEvent<HTMLFormElement>
        ) {
            console.log("Form submitted");
        }

        return (
            <form onSubmit={handleSubmit}>
                <input />

                <button type="submit">
                    Send
                </button>
            </form>
        );
    }

Коли користувач натискає submit button:

    button
      ↓
    form submit
      ↓
    onSubmit
      ↓
    handleSubmit

---

# 4. `event.preventDefault()`

За замовчуванням HTML form може виконати стандартний browser submit.

У React зазвичай потрібно контролювати цей процес:

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        console.log("Form submitted");
    }

`preventDefault()` скасовує стандартну поведінку браузера.

Тепер React/JavaScript може сам вирішувати, що робити з даними.

---

# 5. Чому `preventDefault()` важливий

Без:

    event.preventDefault();

browser може виконати стандартну поведінку форми.

З:

    event.preventDefault();

ми отримуємо контроль:

    user submits form
          ↓
    onSubmit
          ↓
    preventDefault()
          ↓
    JavaScript logic
          ↓
    validation / API / state

---

# 6. Базова форма з input

    import { useState } from "react";

    function NameForm() {
        const [name, setName] = useState("");

        function handleSubmit(
            event: React.FormEvent<HTMLFormElement>
        ) {
            event.preventDefault();

            console.log(name);
        }

        return (
            <form onSubmit={handleSubmit}>
                <input
                    value={name}
                    onChange={event =>
                        setName(event.target.value)
                    }
                />

                <button type="submit">
                    Submit
                </button>
            </form>
        );
    }

Схема:

    input
      ↓
    state
      ↓
    submit
      ↓
    handleSubmit
      ↓
    name

---

# 7. Controlled Form

Controlled form використовує React state:

    const [name, setName] = useState("");

    <input
        value={name}
        onChange={event =>
            setName(event.target.value)
        }
    />

React знає актуальне значення input у будь-який момент.

---

# 8. Form Data Flow

Основна схема:

    User
      ↓
    input
      ↓
    onChange
      ↓
    React state
      ↓
    user clicks Submit
      ↓
    onSubmit
      ↓
    handleSubmit
      ↓
    form data
      ↓
    validation / API

Це фундаментальна mental model React forms.

---

# 9. Form з кількома полями

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

                <button type="submit">
                    Login
                </button>
            </form>
        );
    }

---

# 10. Form State

Form state — це дані, які користувач вводить у форму.

Наприклад:

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

Стан форми:

    email
    password

---

# 11. Окремий State для кожного поля

Найпростіший підхід:

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

Переваги:

- просто зрозуміти
- проста типізація
- прості handlers
- зручно для маленьких форм

Недолік:

при великій кількості полів з'являється багато state.

---

# 12. Один Object для Form State

Можна зберігати всю форму в одному object:

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

Тепер:

    form.name
    form.email
    form.password

---

# 13. Update одного поля

Якщо потрібно змінити тільки email:

    setForm(prev => ({
        ...prev,
        email: event.target.value,
    }));

Spread:

    ...prev

зберігає інші поля.

---

# 14. Чому не можна просто переприсвоїти object

❌

    form.email = event.target.value;

State не потрібно мутувати напряму.

Правильно:

    setForm(prev => ({
        ...prev,
        email: event.target.value,
    }));

---

# 15. Generic Change Handler

Для великої форми можна використовувати один handler.

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, value } = event.target;

        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    }

Тепер кожен input передає своє ім'я.

---

# 16. `name` Attribute

Наприклад:

    <input
        name="email"
        value={form.email}
        onChange={handleChange}
    />

Handler отримує:

    event.target.name

Результат:

    "email"

Тому можна використати:

    [name]: value

---

# 17. Повний Generic Form

    type FormState = {
        name: string;
        email: string;
        password: string;
    };

    function RegisterForm() {
        const [form, setForm] = useState<FormState>({
            name: "",
            email: "",
            password: "",
        });

        function handleChange(
            event: React.ChangeEvent<HTMLInputElement>
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

                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                />

                <button type="submit">
                    Register
                </button>
            </form>
        );
    }

---

# 18. Form Elements

React forms можуть використовувати:

    input
    textarea
    select
    checkbox
    radio
    button

Кожен має свої особливості.

---

# 19. Text Input

    const [name, setName] = useState("");

    <input
        type="text"
        value={name}
        onChange={event =>
            setName(event.target.value)
        }
    />

---

# 20. Email Input

    const [email, setEmail] = useState("");

    <input
        type="email"
        value={email}
        onChange={event =>
            setEmail(event.target.value)
        }
    />

---

# 21. Password Input

    const [password, setPassword] = useState("");

    <input
        type="password"
        value={password}
        onChange={event =>
            setPassword(event.target.value)
        }
    />

---

# 22. Number Input

    const [age, setAge] = useState("");

    <input
        type="number"
        value={age}
        onChange={event =>
            setAge(event.target.value)
        }
    />

Важливо:

    event.target.value

для HTML input є string.

Тому часто зручно зберігати form value як string і перетворювати його в number там, де це потрібно.

---

# 23. Textarea

    const [message, setMessage] = useState("");

    <textarea
        value={message}
        onChange={event =>
            setMessage(event.target.value)
        }
    />

---

# 24. Select

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
    </select>

---

# 25. Checkbox

Checkbox використовує:

    checked

а не `value`.

    const [isAccepted, setIsAccepted] = useState(false);

    <input
        type="checkbox"
        checked={isAccepted}
        onChange={event =>
            setIsAccepted(event.target.checked)
        }
    />

---

# 26. Radio Buttons

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

# 27. Submit Button

Основний submit button:

    <button type="submit">
        Submit
    </button>

Натискання:

    button
      ↓
    form submit
      ↓
    onSubmit

---

# 28. `type="button"`

Якщо кнопка не повинна submit-ити form:

    <button type="button">
        Cancel
    </button>

Це важливо.

У form звичайний `<button>` може поводитися як submit button, тому краще явно вказувати `type`.

---

# 29. Submit vs Button

### Submit

    <button type="submit">
        Save
    </button>

Запускає:

    onSubmit

### Regular button

    <button type="button">
        Cancel
    </button>

Не запускає submit.

---

# 30. Reset Form

Controlled form можна скинути через state.

Наприклад:

    const initialForm = {
        name: "",
        email: "",
    };

    const [form, setForm] = useState(initialForm);

Reset:

    function handleReset() {
        setForm(initialForm);
    }

Button:

    <button
        type="button"
        onClick={handleReset}
    >
        Reset
    </button>

---

# 31. Reset окремих State

Якщо state окремий:

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

Reset:

    function handleReset() {
        setName("");
        setEmail("");
    }

---

# 32. HTML `reset` vs React reset

HTML:

    <button type="reset">
        Reset
    </button>

може скинути native form controls.

Але якщо значення controlled через React state:

    value={name}

джерелом truth залишається React state.

Тому для controlled form часто зрозуміліше явно:

    setForm(initialForm);

---

# 33. `onSubmit` vs `onClick`

Краще обробляти submit на `<form>`:

    <form onSubmit={handleSubmit}>
        ...
        <button type="submit">
            Submit
        </button>
    </form>

а не робити основну submit logic тільки через:

    onClick

Чому?

`onSubmit` правильно представляє подію submit всієї форми.

Submit може відбутися не тільки через mouse click, а й через keyboard interaction.

---

# 34. Правильна структура Form

    <form onSubmit={handleSubmit}>
        <input />

        <select>
            ...
        </select>

        <textarea />

        <button type="submit">
            Submit
        </button>
    </form>

Submit logic:

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        // validation
        // API request
        // success handling
    }

---

# 35. Form Labels

Для доступності form fields потрібно використовувати `<label>`.

Наприклад:

    <label htmlFor="email">
        Email
    </label>

    <input
        id="email"
        type="email"
    />

Або:

    <label>
        Email

        <input
            type="email"
        />
    </label>

---

# 36. `htmlFor`

У JSX використовується:

    htmlFor

а не:

    for

Наприклад:

    <label htmlFor="email">
        Email
    </label>

    <input
        id="email"
        type="email"
    />

---

# 37. `name` vs `id`

Це різні атрибути.

`id`:

- пов'язує input з label
- ідентифікує DOM element

`name`:

- ідентифікує поле form
- використовується для form data
- зручно використовувати в generic handlers

Можна мати обидва:

    <input
        id="email"
        name="email"
        type="email"
    />

---

# 38. Form Field Pattern

Типовий field:

    <label htmlFor="email">
        Email
    </label>

    <input
        id="email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
    />

Тут:

    id
        → label

    name
        → form state

    value
        → current state

    onChange
        → update state

---

# 39. Form Sections

Велику форму можна логічно розділяти:

    <form>
        <fieldset>
            ...
        </fieldset>

        <fieldset>
            ...
        </fieldset>

        <button type="submit">
            Save
        </button>
    </form>

Для групування пов'язаних полів можна використовувати:

    <fieldset>

і:

    <legend>

---

# 40. `fieldset` і `legend`

    <fieldset>
        <legend>
            Personal information
        </legend>

        <input />
        <input />
    </fieldset>

Це HTML-механізм логічного групування form controls.

---

# 41. Required Fields

HTML має built-in validation:

    <input
        type="email"
        required
    />

Або:

    <input
        type="text"
        required
    />

Browser може перевірити required fields до submit.

---

# 42. `minLength` і `maxLength`

Наприклад:

    <input
        type="password"
        minLength={8}
        maxLength={64}
    />

Це native HTML constraints.

Але складніші правила validation зазвичай реалізують окремо.

---

# 43. `min` і `max`

Для number input:

    <input
        type="number"
        min={1}
        max={100}
    />

Browser може враховувати ці обмеження під час native validation.

---

# 44. `pattern`

Для text input можна задати pattern:

    <input
        type="text"
        pattern="[A-Za-z]+"
    />

Це дозволяє browser виконувати native constraint validation.

---

# 45. Native Validation vs Custom Validation

### Native HTML validation

Використовує:

    required
    minLength
    maxLength
    min
    max
    pattern
    type

### Custom React validation

Виконується JavaScript logic:

    const errors = {};

    if (!email) {
        errors.email = "Email is required";
    }

Обидва підходи можуть використовуватися разом.

---

# 46. Базова Custom Validation

    function validateForm() {
        const errors: Record<string, string> = {};

        if (!form.email) {
            errors.email = "Email is required";
        }

        if (!form.password) {
            errors.password = "Password is required";
        }

        return errors;
    }

Це базовий pattern.

Детальна validation буде окремою темою:

    06-form-validation

---

# 47. Validation перед Submit

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const errors = validateForm();

        if (Object.keys(errors).length > 0) {
            return;
        }

        console.log("Submit form");
    }

Схема:

    submit
      ↓
    preventDefault
      ↓
    validate
      ↓
    errors?
      ↓
    yes → show errors
      ↓
    no → submit data

---

# 48. Form Errors

Можна мати окремий state:

    const [errors, setErrors] =
        useState<Record<string, string>>({});

Після validation:

    setErrors({
        email: "Invalid email",
    });

UI:

    {errors.email && (
        <p>
            {errors.email}
        </p>
    )}

---

# 49. Error State

Form state:

    {
        email,
        password
    }

Error state:

    {
        email,
        password
    }

Це різні типи даних.

Не потрібно змішувати їх без необхідності.

---

# 50. Form State vs UI State

Form state:

    email
    password
    name

UI state:

    isSubmitting
    isOpen
    showPassword

Error state:

    errors

Server state:

    user
    response data

Ці категорії краще розрізняти.

---

# 51. Loading State

Під час API request:

    const [isSubmitting, setIsSubmitting] =
        useState(false);

Submit:

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setIsSubmitting(true);

        try {
            // API request
        } finally {
            setIsSubmitting(false);
        }
    }

Button:

    <button
        type="submit"
        disabled={isSubmitting}
    >
        {isSubmitting
            ? "Saving..."
            : "Save"}
    </button>

---

# 52. Submit State

Типова схема:

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

Наприклад:

    isSubmitting
    error
    success

---

# 53. Submit + API

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

            const data = await response.json();

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

Це базовий перехід:

    form
      ↓
    state
      ↓
    submit
      ↓
    fetch
      ↓
    API

---

# 54. Що відбувається під час Submit

Користувач натискає:

    Submit

React:

    onSubmit
        ↓
    preventDefault()
        ↓
    validation
        ↓
    loading
        ↓
    API request
        ↓
    response
        ↓
    success / error
        ↓
    UI

---

# 55. Submit Handler

Submit handler повинен координувати процес.

Наприклад:

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await saveData(form);
        } catch (error) {
            // handle error
        } finally {
            setIsSubmitting(false);
        }
    }

---

# 56. Не змішувати все в JSX

Погано:

    <form
        onSubmit={event => {
            event.preventDefault();

            // 50 lines of validation
            // API request
            // error handling
            // state updates
        }}
    >

Краще:

    <form onSubmit={handleSubmit}>

а logic:

    async function handleSubmit(...) {
        ...
    }

Так код легше читати і тестувати.

---

# 57. Initial Form State

Для object state зручно створити initial object:

    const initialForm = {
        name: "",
        email: "",
        password: "",
    };

Потім:

    const [form, setForm] = useState(initialForm);

Reset:

    setForm(initialForm);

Це також робить код зрозумілішим.

---

# 58. Не змінюй Initial Object

Погано:

    initialForm.email = "test@example.com";

`initialForm` повинен залишатися початковим значенням.

Правильно:

    setForm(prev => ({
        ...prev,
        email: "test@example.com",
    }));

---

# 59. Form Object TypeScript

    type RegisterForm = {
        name: string;
        email: string;
        password: string;
    };

    const initialForm: RegisterForm = {
        name: "",
        email: "",
        password: "",
    };

    const [form, setForm] =
        useState<RegisterForm>(initialForm);

---

# 60. Generic Handler TypeScript

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

# 61. Form Event TypeScript

Для submit:

    React.FormEvent<HTMLFormElement>

Наприклад:

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();
    }

---

# 62. Input Change TypeScript

Для input:

    React.ChangeEvent<HTMLInputElement>

Для textarea:

    React.ChangeEvent<HTMLTextAreaElement>

Для select:

    React.ChangeEvent<HTMLSelectElement>

---

# 63. `FormEvent` vs `ChangeEvent`

`FormEvent`:

    onSubmit

`ChangeEvent`:

    onChange

Наприклад:

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        ...
    }

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        ...
    }

---

# 64. Search Form

Forms не обов'язково означають registration.

Наприклад:

    function SearchForm() {
        const [query, setQuery] = useState("");

        function handleSubmit(
            event: React.FormEvent<HTMLFormElement>
        ) {
            event.preventDefault();

            console.log(query);
        }

        return (
            <form onSubmit={handleSubmit}>
                <input
                    type="search"
                    value={query}
                    onChange={event =>
                        setQuery(event.target.value)
                    }
                />

                <button type="submit">
                    Search
                </button>
            </form>
        );
    }

---

# 65. Contact Form

    type ContactForm = {
        name: string;
        email: string;
        message: string;
    };

    const initialForm: ContactForm = {
        name: "",
        email: "",
        message: "",
    };

    const [form, setForm] =
        useState<ContactForm>(initialForm);

Submit:

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        console.log(form);
    }

---

# 66. Login Form

    type LoginForm = {
        email: string;
        password: string;
    };

    const initialForm: LoginForm = {
        email: "",
        password: "",
    };

    const [form, setForm] =
        useState<LoginForm>(initialForm);

Submit:

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        console.log(form);
    }

---

# 67. Registration Form

Typical state:

    type RegisterForm = {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    };

    const initialForm: RegisterForm = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

Тут вже виникають додаткові правила:

    password === confirmPassword

Це вже частина form validation.

---

# 68. Dependent Fields

Деякі fields можуть залежати один від одного.

Наприклад:

    country
    city

Або:

    password
    confirmPassword

State дозволяє контролювати цю залежність.

Наприклад:

    const passwordsMatch =
        form.password ===
        form.confirmPassword;

Це derived value, а не обов'язково окремий state.

---

# 69. Derived Form Data

Не потрібно зберігати все як state.

Наприклад:

    const fullName =
        `${form.firstName} ${form.lastName}`;

`fullName` можна обчислити.

Так само:

    const passwordsMatch =
        form.password ===
        form.confirmPassword;

Це derived data.

---

# 70. Form State має бути мінімальним

Добрий принцип:

> Зберігай у state тільки дані, які потрібно зберігати між renders і які не можна легко отримати з інших даних.

Наприклад:

    email
    password

можуть бути state.

А:

    emailLength

можна обчислити:

    const emailLength = form.email.length;

---

# 71. Form State і Server State

Не потрібно плутати:

### Form state

    email
    password

### Server state

    authenticatedUser
    serverResponse

### UI state

    isSubmitting
    isModalOpen

Це різні категорії state.

---

# 72. Form + API Architecture

У типовому application:

    Form Component
          ↓
    form state
          ↓
    validation
          ↓
    submit handler
          ↓
    API function
          ↓
    backend
          ↓
    database

Наприклад:

    React
      ↓
    fetch()
      ↓
    Express / NestJS
      ↓
    PostgreSQL

Це дуже важлива модель для full-stack development.

---

# 73. Не класти API logic у кожен input

Input handler:

    onChange

повинен переважно оновлювати form state.

API request зазвичай відбувається на submit:

    onSubmit
      ↓
    API request

Не:

    onChange
      ↓
    API request

для звичайної form.

---

# 74. Коли API може викликатися на Change

Є винятки.

Наприклад:

- autocomplete
- live search
- username availability
- server-side suggestions

Тоді можливий flow:

    input
      ↓
    state
      ↓
    debounce
      ↓
    API

Але це вже спеціальна поведінка, а не стандартний form submit.

---

# 75. Form Submission і Keyboard

Якщо form правильно структурована:

    <form onSubmit={handleSubmit}>
        ...
        <button type="submit">
            Submit
        </button>
    </form>

користувач може submit-ити форму не тільки mouse click.

Тому `onSubmit` є правильним рівнем для submit logic.

---

# 76. Enter у Form

Для багатьох form controls натискання Enter може викликати submit.

Тому:

    <form onSubmit={handleSubmit}>

важливіше, ніж:

    <button onClick={handleSubmit}>

---

# 77. `onClick` vs `onSubmit`

### Погано як основна form logic

    <button
        onClick={handleSubmit}
    >
        Submit
    </button>

### Краще

    <form onSubmit={handleSubmit}>
        <button type="submit">
            Submit
        </button>
    </form>

Тепер submit behavior належить form.

---

# 78. Form Reset після успішного submit

Наприклад:

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        await saveForm(form);

        setForm(initialForm);
    }

Схема:

    submit
      ↓
    API
      ↓
    success
      ↓
    reset

Reset має відбуватися після успішної операції, якщо це відповідає UX.

---

# 79. Loading під час Submit

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setIsSubmitting(true);

        try {
            await saveForm(form);
        } finally {
            setIsSubmitting(false);
        }
    }

Button:

    <button
        type="submit"
        disabled={isSubmitting}
    >
        {isSubmitting
            ? "Saving..."
            : "Save"}
    </button>

---

# 80. Error Handling

Наприклад:

    const [error, setError] =
        useState<string | null>(null);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setError(null);

        try {
            await saveForm(form);
        } catch {
            setError("Something went wrong");
        }
    }

UI:

    {error && (
        <p>
            {error}
        </p>
    )}

---

# 81. Success State

Можна мати:

    const [isSuccess, setIsSuccess] =
        useState(false);

Після успішного submit:

    setIsSuccess(true);

UI:

    {isSuccess && (
        <p>
            Form submitted successfully.
        </p>
    )}

Але не варто зберігати state, який легко отримати з іншого state.

---

# 82. Типовий Submit Flow

Повний flow:

    User
      ↓
    fills form
      ↓
    form state
      ↓
    Submit
      ↓
    preventDefault
      ↓
    validation
      ↓
    setIsSubmitting(true)
      ↓
    API request
      ↓
    success / error
      ↓
    setIsSubmitting(false)
      ↓
    UI update

---

# 83. Full Login Example

    import { useState } from "react";

    type LoginForm = {
        email: string;
        password: string;
    };

    const initialForm: LoginForm = {
        email: "",
        password: "",
    };

    function LoginForm() {
        const [form, setForm] =
            useState<LoginForm>(initialForm);

        const [isSubmitting, setIsSubmitting] =
            useState(false);

        const [error, setError] =
            useState<string | null>(null);

        function handleChange(
            event: React.ChangeEvent<HTMLInputElement>
        ) {
            const { name, value } = event.target;

            setForm(prev => ({
                ...prev,
                [name]: value,
            }));
        }

        async function handleSubmit(
            event: React.FormEvent<HTMLFormElement>
        ) {
            event.preventDefault();

            setError(null);
            setIsSubmitting(true);

            try {
                console.log(form);

                // await login(form);
            } catch {
                setError("Login failed");
            } finally {
                setIsSubmitting(false);
            }
        }

        return (
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    Email
                </label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                />

                <label htmlFor="password">
                    Password
                </label>

                <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                />

                {error && (
                    <p>
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Logging in..."
                        : "Login"}
                </button>
            </form>
        );
    }

---

# 84. Form Component Responsibility

На базовому рівні form component може відповідати за:

- відображення fields
- form state
- change handlers
- submit handler
- basic validation
- loading state
- error display

Але зі збільшенням форми logic можна винести в:

    custom hook

або:

    form library

---

# 85. Коли Form стає складною

Великі форми можуть мати:

- десятки fields
- nested objects
- arrays
- dynamic fields
- complex validation
- async validation
- dependent fields
- file uploads
- loading
- server errors
- field errors
- touched state
- dirty state

Тоді ручне керування state може стати громіздким.

---

# 86. Form State може мати більше інформації

Крім values:

    values

можуть існувати:

    errors
    touched
    dirty
    submitting
    submitted

Наприклад концептуально:

    {
        values: {
            email: "",
            password: "",
        },

        errors: {
            email: "",
        },

        touched: {
            email: true,
        },

        isSubmitting: false
    }

Це вже складніший form state architecture.

---

# 87. `touched`

`touched` може означати:

> користувач уже взаємодіяв з полем.

Наприклад:

    touched.email = true

Тоді можна показати validation error тільки після interaction.

Це тема, яка детальніше розглядається у form validation.

---

# 88. `dirty`

`dirty` зазвичай означає:

> значення відрізняється від initial value.

Наприклад:

    initial:
        email = ""

    current:
        email = "test@example.com"

Форма стала dirty.

Це корисно для:

- Save button
- unsaved changes
- navigation warning

---

# 89. Не все потрібно реалізовувати вручну

Для простих форм достатньо:

    useState
    onChange
    onSubmit

Для складних forms можуть використовуватися спеціалізовані рішення.

Але перед використанням library потрібно добре розуміти базову React form model.

---

# 90. Controlled Components як фундамент

Forms у React базуються на:

    useState
        ↓
    controlled components
        ↓
    form state
        ↓
    onSubmit
        ↓
    validation
        ↓
    API

Тому попередня тема:

    04-controlled-components

є фундаментом цієї теми.

---

# 91. Common Mistakes

## ❌ Submit logic тільки через `onClick`

    <button onClick={handleSubmit}>
        Submit
    </button>

## ✅

    <form onSubmit={handleSubmit}>
        <button type="submit">
            Submit
        </button>
    </form>

---

## ❌ Забути `preventDefault()`

    function handleSubmit(event) {
        console.log(form);
    }

## ✅

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        console.log(form);
    }

---

## ❌ Мутувати form state

    form.email = value;

## ✅

    setForm(prev => ({
        ...prev,
        email: value,
    }));

---

## ❌ Втрачати інші поля

    setForm({
        email: value,
    });

## ✅

    setForm(prev => ({
        ...prev,
        email: value,
    }));

---

## ❌ Checkbox через `value`

    <input
        type="checkbox"
        value={form.accepted}
    />

## ✅

    <input
        type="checkbox"
        checked={form.accepted}
        onChange={handleChange}
    />

---

## ❌ Забути `type="submit"`

    <button>
        Submit
    </button>

Краще явно:

    <button type="submit">
        Submit
    </button>

---

## ❌ Cancel button без `type`

У form:

    <button onClick={handleCancel}>
        Cancel
    </button>

Краще:

    <button
        type="button"
        onClick={handleCancel}
    >
        Cancel
    </button>

---

## ❌ API request у кожному `onChange`

Зазвичай не потрібно:

    onChange
      ↓
    API request

Краще:

    onChange
      ↓
    state

    onSubmit
      ↓
    API request

---

## ❌ Зберігати derived data як state

Не потрібно без причини:

    const [fullName, setFullName] =
        useState("");

якщо:

    firstName
    lastName

вже є state.

Краще:

    const fullName =
        `${firstName} ${lastName}`;

---

# 92. Accessibility

Form потрібно робити доступною.

Основні правила:

- використовувати `<label>`
- пов'язувати label з input через `htmlFor` + `id`
- використовувати правильні input types
- не покладатися тільки на placeholder
- повідомляти про помилки
- правильно використовувати button types
- не приховувати важливу інформацію лише візуально

Приклад:

    <label htmlFor="email">
        Email
    </label>

    <input
        id="email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
    />

---

# 93. Form і HTML semantics

React не скасовує HTML.

Потрібно знати:

    form
    label
    input
    textarea
    select
    option
    button
    fieldset
    legend

React додає до них:

    state
    event handlers
    rendering
    business logic

Тому хороше знання HTML forms дуже допомагає в React.

---

# 94. Form як Component Boundary

Можна розділити:

    <LoginForm />

і:

    <TextInput />

Наприклад:

    function LoginForm() {
        const [email, setEmail] = useState("");

        return (
            <TextInput
                value={email}
                onChange={setEmail}
            />
        );
    }

Це дозволяє створювати reusable form components.

---

# 95. Reusable Form Input

    type TextInputProps = {
        id: string;
        name: string;
        label: string;
        value: string;
        onChange: (
            value: string
        ) => void;
    };

    function TextInput({
        id,
        name,
        label,
        value,
        onChange,
    }: TextInputProps) {
        return (
            <div>
                <label htmlFor={id}>
                    {label}
                </label>

                <input
                    id={id}
                    name={name}
                    value={value}
                    onChange={event =>
                        onChange(
                            event.target.value
                        )
                    }
                />
            </div>
        );
    }

---

# 96. Використання Reusable Input

    const [email, setEmail] = useState("");

    <TextInput
        id="email"
        name="email"
        label="Email"
        value={email}
        onChange={setEmail}
    />

Parent володіє state.

Child відповідає за UI input.

---

# 97. State Ownership

Потрібно запитати:

> Де повинен знаходитися form state?

Якщо state потрібен тільки form:

    Form
      ↓
    local state

Якщо state потрібен кільком components:

    Parent
      ↓
    shared state
      ↓
    Form
      ↓
    Other components

Це lifting state up.

---

# 98. Form Architecture

Для невеликої форми:

    Component
      ├── state
      ├── handlers
      ├── validation
      └── submit

Для складнішої:

    Form Component
      ↓
    Form State
      ↓
    Validation
      ↓
    Submit Logic
      ↓
    API Layer

Це дозволяє поступово масштабувати application.

---

# 99. Практичний алгоритм створення React Form

### Крок 1 — визнач fields

Наприклад:

    name
    email
    password

### Крок 2 — визнач initial state

    const initialForm = {
        name: "",
        email: "",
        password: "",
    };

### Крок 3 — створити state

    const [form, setForm] =
        useState(initialForm);

### Крок 4 — зробити inputs controlled

    value={form.name}

### Крок 5 — додати `onChange`

    onChange={handleChange}

### Крок 6 — створити submit handler

    function handleSubmit(event) {
        event.preventDefault();
        ...
    }

### Крок 7 — додати `onSubmit`

    <form onSubmit={handleSubmit}>

### Крок 8 — додати validation

    validateForm()

### Крок 9 — додати API request

    await saveForm(form);

### Крок 10 — обробити loading/error/success

    isSubmitting
    error
    success

---

# 100. Mental Model

Запам'ятай повний цикл:

    User
      ↓
    Form Control
      ↓
    onChange
      ↓
    React State
      ↓
    Render
      ↓
    Form Control

Після submit:

    User
      ↓
    Submit
      ↓
    onSubmit
      ↓
    preventDefault
      ↓
    validation
      ↓
    API
      ↓
    response
      ↓
    state
      ↓
    UI

---

# 101. Питання для співбесіди

## 🟢 Junior

**1. Як обробити submit React form?**

Через `onSubmit`:

    <form onSubmit={handleSubmit}>

---

**2. Для чого `event.preventDefault()`?**

Щоб запобігти стандартній browser поведінці submit і передати контроль JavaScript/React.

---

**3. Що таке controlled form?**

Form, значення якої контролюються React state.

---

**4. Як отримати значення text input?**

    event.target.value

---

**5. Як отримати значення checkbox?**

    event.target.checked

---

**6. Який button запускає submit?**

    <button type="submit">

---

**7. Який button не запускає submit?**

    <button type="button">

---

**8. Для чого потрібен `name`?**

Для ідентифікації form field і зручної роботи з generic handlers та form data.

---

## 🔵 Strong Junior

**9. Чому submit краще обробляти через `onSubmit`, а не `onClick` button?**

Тому що submit є поведінкою всієї form, а не тільки mouse click конкретної кнопки.

---

**10. Як зберігати кілька form fields в одному state?**

Наприклад:

    const [form, setForm] = useState({
        name: "",
        email: "",
    });

---

**11. Як змінити одне поле object state?**

    setForm(prev => ({
        ...prev,
        email: value,
    }));

---

**12. Чому не можна мутувати state object напряму?**

React state потрібно оновлювати через setter, створюючи нове значення замість прямої mutation.

---

**13. Що таке derived form data?**

Дані, які можна отримати з уже існуючого state.

Наприклад:

    const fullName =
        `${firstName} ${lastName}`;

---

**14. Як reset-нути controlled form?**

Встановити initial state:

    setForm(initialForm);

---

**15. Як зробити loading state для submit?**

    const [isSubmitting, setIsSubmitting] =
        useState(false);

---

## 🟠 Middle

**16. Як розділити form state та UI state?**

Form values:

    email
    password

UI state:

    isSubmitting
    isOpen

Error state:

    errors

Їх не обов'язково об'єднувати в один object.

---

**17. Коли варто піднімати form state до parent?**

Коли значення форми потрібні іншим components або потрібно синхронізувати кілька компонентів.

---

**18. Як організувати form з API request?**

    Form
      ↓
    state
      ↓
    validation
      ↓
    onSubmit
      ↓
    API
      ↓
    response
      ↓
    UI

---

**19. Що таке `dirty` form?**

Form, значення якої відрізняються від initial values.

---

**20. Що таке `touched` field?**

Field, з яким користувач уже взаємодіяв.

---

**21. Чому не потрібно зберігати derived values як state?**

Тому що це створює зайве джерело truth і може призвести до розсинхронізації.

---

# 102. Mini Cheat Sheet

## Basic Form

    function Form() {
        function handleSubmit(
            event: React.FormEvent<HTMLFormElement>
        ) {
            event.preventDefault();
        }

        return (
            <form onSubmit={handleSubmit}>
                ...
                <button type="submit">
                    Submit
                </button>
            </form>
        );
    }

---

## Controlled Input

    const [value, setValue] = useState("");

    <input
        value={value}
        onChange={event =>
            setValue(event.target.value)
        }
    />

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
    </select>

---

## Form Object

    const initialForm = {
        name: "",
        email: "",
    };

    const [form, setForm] =
        useState(initialForm);

---

## Update Field

    setForm(prev => ({
        ...prev,
        email: value,
    }));

---

## Generic Handler

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

## Submit

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        console.log(form);
    }

---

## Loading

    const [isSubmitting, setIsSubmitting] =
        useState(false);

---

## Error

    const [error, setError] =
        useState<string | null>(null);

---

## Reset

    setForm(initialForm);

---

# 103. Рівні знань

## 🟢 Core

Потрібно знати:

- `<form>`
- `onSubmit`
- `event.preventDefault()`
- `<input>`
- `<textarea>`
- `<select>`
- `<button>`
- `type="submit"`
- `type="button"`
- controlled inputs
- `value`
- `checked`
- `onChange`
- form state
- basic submit handler

---

## 🔵 Junior

Потрібно впевнено розуміти:

- multiple fields
- object form state
- `name`
- generic change handler
- TypeScript form events
- reset
- labels
- `htmlFor`
- `id`
- native HTML validation
- basic custom validation
- loading state
- error state
- API submit
- derived form data

---

## 🟠 Middle

Потрібно добре розуміти:

- form state architecture
- state ownership
- lifting state up
- reusable form components
- field state
- error state
- touched state
- dirty state
- async submission
- server errors
- dependent fields
- complex forms
- separation of UI/form/server state

---

## 🔴 Senior

На цьому рівні важливо розуміти:

- scalable form architecture
- reusable form abstractions
- custom hooks
- reducer-based forms
- form libraries
- complex validation architecture
- dynamic fields
- field arrays
- performance of large forms
- server/client state boundaries
- accessibility
- async validation
- optimistic UI
- error recovery

---

# 104. Практичний проєкт

Для закріплення теми можна створити:

## Login Form

Fields:

    email
    password

Функціональність:

    controlled inputs
    ↓
    submit
    ↓
    validation
    ↓
    loading
    ↓
    API
    ↓
    success / error

---

## Contact Form

Fields:

    name
    email
    message

Функціональність:

    controlled inputs
    ↓
    validation
    ↓
    submit
    ↓
    API
    ↓
    success

---

## Registration Form

Fields:

    name
    email
    password
    confirmPassword

Функціональність:

    controlled inputs
    ↓
    validation
    ↓
    password matching
    ↓
    submit
    ↓
    API

---

# 105. Головне

> React form — це HTML form + React state + event handlers.

> Submit обробляємо через:

    onSubmit

> Стандартну browser поведінку зупиняємо:

    event.preventDefault();

> Text input контролюємо через:

    value

> Checkbox контролюємо через:

    checked

> Дані вводяться через:

    onChange

> Submit button:

    type="submit"

> Кнопка, яка не повинна submit-ити:

    type="button"

> Для кількох полів можна використовувати один object:

    const [form, setForm] = useState(initialForm);

> Object state оновлюємо immutable способом:

    setForm(prev => ({
        ...prev,
        email: value,
    }));

> `name` дозволяє створювати generic change handlers.

> `id` і `htmlFor` пов'язують input з label.

> Validation повинна відбуватися до API request.

> API request зазвичай запускається в `onSubmit`.

> Під час async submit часто потрібні:

    isSubmitting
    error
    success

> Derived values не потрібно без необхідності зберігати в state.

---

# 106. Наступний крок

Після цієї теми логічно перейти до:

    06-form-validation

Тепер базовий flow уже зрозумілий:

    input
      ↓
    controlled component
      ↓
    form state
      ↓
    onSubmit
      ↓
    form data

Наступний рівень:

    form data
      ↓
    validation
      ↓
    field errors
      ↓
    form errors
      ↓
    submit / API

Це вже повноцінна модель роботи з React forms.