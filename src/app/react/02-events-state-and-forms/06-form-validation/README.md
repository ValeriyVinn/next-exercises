# React — Form Validation

## 06. Form Validation

Валідація форми — це перевірка введених користувачем даних перед їх обробкою або відправленням на сервер.

Типовий процес:

    User input
        ↓
    Form state
        ↓
    Validation
        ↓
    Errors?
      ↙   ↘
    yes    no
     ↓      ↓
    Show   Submit
    errors  data
             ↓
           Server
             ↓
           Result

У React валідація зазвичай будується навколо:

- `form state`
- `errors`
- `touched`
- `dirty`
- `validateField()`
- `validateForm()`
- `onChange`
- `onBlur`
- `onSubmit`

Головна ідея:

> Форма повинна не тільки зберігати дані, а й розуміти, чи є ці дані коректними.

---

# 1. Навіщо потрібна валідація

Користувач може ввести:

    ""
    "abc"
    "test"
    "test@"
    "123"
    "password"
    "   "
    "2026-99-99"

Тому перед відправленням даних потрібно перевірити:

- чи заповнене поле;
- чи правильний формат;
- чи достатня довжина;
- чи допустиме значення;
- чи збігаються пов'язані поля;
- чи відповідають дані бізнес-правилам.

Наприклад, для реєстрації:

    name:
        обов'язкове
        мінімум 2 символи

    email:
        обов'язкове
        правильний формат email

    password:
        обов'язкове
        мінімум 8 символів

    confirmPassword:
        повинно збігатися з password

---

# 2. Client-side і Server-side validation

Валідація може виконуватися на двох рівнях.

## Client-side validation

Виконується у браузері / React.

    User
      ↓
    React form
      ↓
    Validation
      ↓
    Submit

Переваги:

- швидкий feedback;
- не потрібно робити запит на сервер для кожної очевидної помилки;
- кращий UX.

Але client-side validation не є достатньою сама по собі.

---

## Server-side validation

Виконується на backend.

    React
      ↓
    HTTP request
      ↓
    Backend
      ↓
    Server validation
      ↓
    Database / business logic

Server повинен перевіряти дані незалежно від React.

Наприклад:

    React:
        email = "test@example.com"

    Backend:
        перевіряє формат email
        перевіряє унікальність email
        перевіряє права
        перевіряє бізнес-правила

### Головне правило

> Client-side validation покращує UX, а server-side validation забезпечує реальну перевірку даних.

Не можна довіряти тільки валідації React.

---

# 3. Native HTML validation

HTML вже має вбудовані механізми валідації.

Наприклад:

    <input
        type="email"
        required
    />

Браузер перевірить:

- поле не повинно бути порожнім;
- значення повинно відповідати email-формату.

---

## 3.1. `required`

    <input
        type="text"
        required
    />

Поле повинно бути заповнене.

---

## 3.2. `minLength`

    <input
        type="password"
        minLength={8}
    />

Мінімум 8 символів.

---

## 3.3. `maxLength`

    <input
        type="text"
        maxLength={50}
    />

Максимум 50 символів.

---

## 3.4. `min` і `max`

Для числових значень:

    <input
        type="number"
        min={1}
        max={100}
    />

---

## 3.5. `pattern`

Можна задати регулярний вираз:

    <input
        type="text"
        pattern="[A-Za-z]{3,}"
    />

---

# 4. Native validation vs React validation

Native HTML validation:

    <input
        type="email"
        required
        minLength={5}
    />

React validation:

    const validateEmail = (email: string): string => {
        if (!email) {
            return "Email is required";
        }

        if (!email.includes("@")) {
            return "Invalid email";
        }

        return "";
    };

Обидва підходи можуть використовуватися разом.

---

# 5. Навіщо потрібна custom validation

HTML validation добре працює для простих правил.

Але часто потрібні складніші перевірки.

Наприклад:

    password === confirmPassword

або:

    age >= 18

або:

    username не повинен бути зареєстрований

або:

    startDate < endDate

Для таких правил потрібна custom validation.

---

# 6. Простий приклад validation

    import { useState } from "react";

    type FormData = {
        email: string;
    };

    const EmailForm = () => {
        const [formData, setFormData] = useState<FormData>({
            email: "",
        });

        const [error, setError] = useState("");

        const validateEmail = (email: string): string => {
            if (!email.trim()) {
                return "Email is required";
            }

            if (!email.includes("@")) {
                return "Invalid email";
            }

            return "";
        };

        const handleSubmit = (
            event: React.FormEvent<HTMLFormElement>
        ) => {
            event.preventDefault();

            const validationError = validateEmail(formData.email);

            if (validationError) {
                setError(validationError);
                return;
            }

            setError("");

            console.log("Form submitted:", formData);
        };

        return (
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(event) =>
                        setFormData({
                            email: event.target.value,
                        })
                    }
                />

                {error && <p>{error}</p>}

                <button type="submit">
                    Submit
                </button>
            </form>
        );
    };

---

# 7. Errors state

У реальних формах зазвичай декілька полів.

Тому одного:

    const [error, setError] = useState("");

може бути недостатньо.

Краще зберігати помилки окремо для кожного поля.

    type FormErrors = {
        name?: string;
        email?: string;
        password?: string;
    };

    const [errors, setErrors] = useState<FormErrors>({});

Наприклад:

    {
        name: "Name is required",
        email: "Invalid email"
    }

---

# 8. Чому errors краще зберігати як object

Форма:

    name
    email
    password

Може мати:

    {
        name: "Name is required",
        email: "Invalid email",
        password: "Password is too short"
    }

Тепер кожне поле має власну помилку.

Наприклад:

    {errors.email && (
        <p>{errors.email}</p>
    )}

---

# 9. Типізація errors

Для TypeScript:

    type FormErrors = {
        name?: string;
        email?: string;
        password?: string;
    };

Знак `?` означає, що поле може бути відсутнім.

Наприклад:

    {}

або:

    {
        email: "Invalid email"
    }

або:

    {
        name: "Name is required",
        password: "Password is too short"
    }

---

# 10. `validateField()`

Корисно створити функцію для перевірки одного поля.

    const validateField = (
        name: keyof FormData,
        value: string
    ): string => {
        if (name === "email") {
            if (!value.trim()) {
                return "Email is required";
            }

            if (!value.includes("@")) {
                return "Invalid email";
            }
        }

        if (name === "password") {
            if (value.length < 8) {
                return "Password must contain at least 8 characters";
            }
        }

        return "";
    };

Тепер можна перевіряти конкретне поле.

---

# 11. `validateForm()`

Окрім окремого поля, зручно мати функцію перевірки всієї форми.

    const validateForm = (
        values: FormData
    ): FormErrors => {
        const errors: FormErrors = {};

        if (!values.name.trim()) {
            errors.name = "Name is required";
        }

        if (!values.email.trim()) {
            errors.email = "Email is required";
        } else if (!values.email.includes("@")) {
            errors.email = "Invalid email";
        }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 8) {
            errors.password =
                "Password must contain at least 8 characters";
        }

        return errors;
    };

---

# 12. Валідація під час submit

Найпростіший варіант:

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const validationErrors = validateForm(formData);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        console.log("Submit:", formData);
    };

Логіка:

    submit
      ↓
    validateForm()
      ↓
    errors
      ↓
    errors.length > 0 ?
       ↙       ↘
     yes        no
      ↓          ↓
    stop       submit

---

# 13. `Object.keys(errors).length`

Якщо:

    const errors = {};

то:

    Object.keys(errors).length

дорівнює:

    0

Якщо:

    const errors = {
        email: "Invalid email"
    };

то:

    Object.keys(errors).length

дорівнює:

    1

Тому:

    const isValid =
        Object.keys(errors).length === 0;

---

# 14. `isValid`

Можна отримати derived value:

    const isValid =
        Object.keys(errors).length === 0;

Це не обов'язково зберігати окремо в state.

Краще:

    const isValid =
        Object.keys(errors).length === 0;

ніж:

    const [isValid, setIsValid] = useState(true);

якщо `isValid` повністю залежить від `errors`.

### Загальне правило

> Не зберігай у state те, що можна надійно обчислити з існуючого state.

---

# 15. Коли запускати validation

Є три основні моменти:

1. `onChange`
2. `onBlur`
3. `onSubmit`

---

# 16. Validation on submit

Перевіряємо форму тільки після натискання Submit.

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const errors = validateForm(formData);

        setErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        submitForm();
    };

Перевага:

- проста логіка;
- мало validation calls.

Недолік:

- користувач може побачити помилки тільки після submit.

---

# 17. Validation on change

Можна перевіряти поле під час введення.

    const handleEmailChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;

        setFormData((prev) => ({
            ...prev,
            email: value,
        }));

        const error = validateField("email", value);

        setErrors((prev) => ({
            ...prev,
            email: error,
        }));
    };

Перевага:

- feedback майже одразу.

Недолік:

- помилка може з'явитися занадто рано.

Наприклад користувач тільки почав вводити:

    j

і вже отримує:

    Invalid email

Це не завжди хороший UX.

---

# 18. Validation on blur

`blur` відбувається, коли користувач залишає поле.

    <input
        value={formData.email}
        onChange={handleChange}
        onBlur={handleBlur}
    />

Наприклад:

    користувач вводить email
          ↓
    залишає поле
          ↓
    onBlur
          ↓
    validation
          ↓
    error

Це часто зручніший UX, ніж validation на кожен символ.

---

# 19. Що таке `touched`

`touched` означає:

> Користувач уже взаємодіяв із цим полем.

Тип:

    type TouchedFields = {
        name?: boolean;
        email?: boolean;
        password?: boolean;
    };

State:

    const [touched, setTouched] =
        useState<TouchedFields>({});

---

# 20. Оновлення `touched`

На `blur`:

    const handleBlur = (
        event: React.FocusEvent<HTMLInputElement>
    ) => {
        const { name } = event.target;

        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));
    };

Тепер:

    touched.email === true

означає, що користувач уже залишив поле email.

---

# 21. Навіщо потрібен `touched`

Без `touched`:

    errors.email

може показуватися одразу після відкриття форми.

Це часто небажано.

З `touched`:

    {touched.email && errors.email && (
        <p>{errors.email}</p>
    )}

Тобто:

    поле ще не чіпали
        ↓
    помилку не показуємо

    поле залишили
        ↓
    показуємо помилку

---

# 22. `touched` + `errors`

Типова логіка:

    {touched.email && errors.email && (
        <p>{errors.email}</p>
    )}

Це означає:

    touched.email === true
        AND
    errors.email існує

Тільки тоді показуємо повідомлення.

---

# 23. Що таке `dirty`

`dirty` означає:

> Користувач змінив початкове значення.

Наприклад:

    initial value:
    email = ""

Після введення:

    email = "test@example.com"

Поле стало dirty.

Можна визначити:

    const isDirty =
        formData.email !== initialFormData.email;

Для всієї форми:

    const isDirty =
        JSON.stringify(formData) !==
        JSON.stringify(initialFormData);

Для складних форм краще мати окрему продуману логіку порівняння.

---

# 24. `touched` vs `dirty`

Це різні поняття.

### touched

Користувач взаємодіяв із полем.

    focus → blur

### dirty

Значення змінилося.

    "" → "hello"

Можливі ситуації:

    touched = true
    dirty = false

Наприклад:

    користувач зайшов у поле
    нічого не змінив
    вийшов

---

# 25. Повна модель стану форми

Для складнішої форми можна мати:

    const [formData, setFormData] = useState<FormData>({});

    const [errors, setErrors] = useState<FormErrors>({});

    const [touched, setTouched] =
        useState<TouchedFields>({});

    const [isSubmitting, setIsSubmitting] =
        useState(false);

Логічно це:

    formData
        ↓
    values

    errors
        ↓
    validation result

    touched
        ↓
    user interaction

    isSubmitting
        ↓
    submit state

---

# 26. Приклад registration form

    type FormData = {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    };

    type FormErrors = {
        name?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
    };

    const initialFormData: FormData = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

---

# 27. Validation registration form

    const validateForm = (
        values: FormData
    ): FormErrors => {
        const errors: FormErrors = {};

        if (!values.name.trim()) {
            errors.name = "Name is required";
        } else if (values.name.trim().length < 2) {
            errors.name =
                "Name must contain at least 2 characters";
        }

        if (!values.email.trim()) {
            errors.email = "Email is required";
        } else if (!values.email.includes("@")) {
            errors.email = "Invalid email";
        }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 8) {
            errors.password =
                "Password must contain at least 8 characters";
        }

        if (!values.confirmPassword) {
            errors.confirmPassword =
                "Please confirm your password";
        } else if (
            values.password !== values.confirmPassword
        ) {
            errors.confirmPassword =
                "Passwords do not match";
        }

        return errors;
    };

---

# 28. Cross-field validation

Іноді поле не можна перевірити незалежно від інших полів.

Приклад:

    password
    confirmPassword

Правило:

    password === confirmPassword

Тому:

    validateField("confirmPassword")

повинна знати значення:

    password

Наприклад:

    if (values.password !== values.confirmPassword) {
        errors.confirmPassword =
            "Passwords do not match";
    }

Це називається cross-field validation.

---

# 29. Ще приклади cross-field validation

Наприклад:

    startDate
    endDate

Правило:

    startDate < endDate

Або:

    minimumAge
    maximumAge

Правило:

    minimumAge <= maximumAge

Або:

    password
    confirmPassword

Правило:

    password === confirmPassword

---

# 30. Нормалізація даних

Перед validation іноді потрібно нормалізувати значення.

Наприклад:

    const email = formData.email.trim();

Замість:

    "   test@example.com   "

отримуємо:

    "test@example.com"

Для імені:

    const name = formData.name.trim();

Важливо розділяти:

    raw input
        ↓
    normalization
        ↓
    validation
        ↓
    submit

---

# 31. Validation email

Простий варіант:

    const validateEmail = (email: string): string => {
        if (!email.trim()) {
            return "Email is required";
        }

        if (!email.includes("@")) {
            return "Invalid email";
        }

        return "";
    };

У реальному застосунку формат email краще не намагатися перевірити надмірно складною регуляркою.

Також пам'ятай:

> Навіть правильний формат email не означає, що адреса реально існує.

---

# 32. Validation password

Наприклад:

    const validatePassword = (
        password: string
    ): string => {
        if (!password) {
            return "Password is required";
        }

        if (password.length < 8) {
            return "Password must contain at least 8 characters";
        }

        return "";
    };

Більш складні правила можуть перевіряти:

- довжину;
- цифри;
- великі літери;
- спеціальні символи.

Але конкретні вимоги повинні відповідати правилам твого застосунку.

---

# 33. Validation required field

Загальний принцип:

    if (!value.trim()) {
        return "This field is required";
    }

Але це працює для `string`.

Для інших типів потрібна відповідна перевірка.

Наприклад:

    number

не варто перевіряти так само, як:

    string

---

# 34. Валідація числових полів

Наприклад:

    type FormData = {
        age: number | "";
    };

Перевірка:

    if (values.age === "") {
        errors.age = "Age is required";
    } else if (values.age < 18) {
        errors.age = "You must be at least 18";
    }

Зверни увагу:

    number | ""

зручно використовувати для controlled input, оскільки під час очищення `<input>` значення стає порожнім рядком.

---

# 35. Валідація select

Наприклад:

    type FormData = {
        role: string;
    };

Початкове значення:

    role: ""

Перевірка:

    if (!values.role) {
        errors.role = "Please select a role";
    }

---

# 36. Валідація checkbox

Наприклад:

    type FormData = {
        terms: boolean;
    };

Правило:

    terms === true

Перевірка:

    if (!values.terms) {
        errors.terms =
            "You must accept the terms";
    }

---

# 37. Валідація radio buttons

Наприклад:

    type FormData = {
        gender: string;
    };

Початкове:

    gender: ""

Перевірка:

    if (!values.gender) {
        errors.gender =
            "Please select an option";
    }

---

# 38. Generic change handler

Для форми з різними полями можна використовувати один handler.

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

Тепер:

    <input
        name="name"
        value={formData.name}
        onChange={handleChange}
    />

    <input
        name="email"
        value={formData.email}
        onChange={handleChange}
    />

    <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
    />

---

# 39. Особливість checkbox

Для checkbox потрібно використовувати:

    checked

а не:

    value

Наприклад:

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value, type, checked } =
            event.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));
    };

---

# 40. Validation error UI

Простий варіант:

    {errors.email && (
        <p>{errors.email}</p>
    )}

Наприклад:

    <label htmlFor="email">
        Email
    </label>

    <input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
    />

    {errors.email && (
        <p>{errors.email}</p>
    )}

---

# 41. `aria-invalid`

Для accessibility можна вказати:

    <input
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        aria-invalid={Boolean(errors.email)}
    />

Якщо є помилка:

    aria-invalid="true"

Якщо помилки немає:

    aria-invalid="false"

---

# 42. `aria-describedby`

Можна пов'язати input із повідомленням про помилку.

    <input
        id="email"
        name="email"
        aria-invalid={Boolean(errors.email)}
        aria-describedby="email-error"
    />

    {errors.email && (
        <p id="email-error">
            {errors.email}
        </p>
    )}

Тепер assistive technologies можуть зрозуміти зв'язок між полем і його помилкою.

---

# 43. Повторне використання Field component

Якщо у формі багато полів, можна створити компонент:

    type FormFieldProps = {
        label: string;
        error?: string;
        children: React.ReactNode;
    };

    const FormField = ({
        label,
        error,
        children,
    }: FormFieldProps) => {
        return (
            <div>
                <label>
                    {label}
                </label>

                {children}

                {error && (
                    <p>{error}</p>
                )}
            </div>
        );
    };

Використання:

    <FormField
        label="Email"
        error={errors.email}
    >
        <input
            name="email"
            value={formData.email}
            onChange={handleChange}
        />
    </FormField>

---

# 44. Не змішуй validation і submit logic

Погана структура:

    const handleSubmit = () => {
        // 100 рядків validation
        // API
        // loading
        // errors
        // navigation
    };

Краще:

    validateForm()
        ↓
    setErrors()
        ↓
    submitForm()
        ↓
    API

Наприклад:

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const errors = validateForm(formData);

        setErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        await submitForm();
    };

---

# 45. Validation і API

Навіть якщо client-side validation пройшла:

    validateForm()
        ↓
    valid
        ↓
    fetch()
        ↓
    server
        ↓
    server validation

Backend може повернути помилку.

Наприклад:

    {
        "message": "Email already exists"
    }

React повинен перетворити server error у відповідний UI.

---

# 46. Server-side field errors

Backend може повернути:

    {
        "errors": {
            "email": "Email already exists",
            "username": "Username is already taken"
        }
    }

Тоді frontend може зробити:

    setErrors(response.errors);

І показати:

    Email
    [ test@example.com ]

    Email already exists

---

# 47. Client error vs Server error

Важливо розрізняти:

### Client validation

    password.length < 8

### Server validation

    email already exists

### Network error

    server unavailable

Це різні ситуації.

Наприклад:

    validation error
        ↓
    виправити поле

    server business error
        ↓
    показати повідомлення

    network error
        ↓
    повторити запит / повідомити користувача

---

# 48. Async validation

Іноді validation потребує API.

Наприклад:

    username
        ↓
    API
        ↓
    username available?

Або:

    email
        ↓
    API
        ↓
    email already registered?

Це називається async validation.

Наприклад:

    const checkUsername = async (
        username: string
    ): Promise<string> => {
        const response = await fetch(
            `/api/users/check?username=${username}`
        );

        const data = await response.json();

        if (!data.available) {
            return "Username is already taken";
        }

        return "";
    };

Не потрібно робити такий запит на кожен символ без необхідності.

Для цього можуть використовуватися:

- `onBlur`;
- debounce;
- server-side validation під час submit.

---

# 49. Loading під час async validation

Якщо виконується асинхронна перевірка:

    const [isChecking, setIsChecking] =
        useState(false);

Логіка:

    setIsChecking(true);

    try {
        await checkUsername(username);
    } finally {
        setIsChecking(false);
    }

UI:

    {isChecking && (
        <p>Checking...</p>
    )}

---

# 50. Validation не повинна бути тільки UI

Не можна робити:

    if (errors.length === 0) {
        // дані гарантовано безпечні
    }

Frontend не є security boundary.

Користувач може:

- змінити JavaScript;
- відправити власний HTTP request;
- обійти React;
- використати Postman;
- використати curl;
- змінити request вручну.

Тому backend повинен повторно перевіряти дані.

---

# 51. Validation і security

Наприклад:

    password.length >= 8

може перевірятися на frontend.

Але backend також повинен мати власні правила.

Те саме стосується:

- authorization;
- permissions;
- ownership;
- allowed values;
- database constraints;
- business rules.

### Головне

> Frontend validation — це UX. Backend validation — частина захисту та коректності системи.

---

# 52. Database constraints

Частина правил може бути додатково забезпечена database.

Наприклад:

    email UNIQUE

або:

    age CHECK (age >= 18)

Це ще один рівень захисту даних.

Загальна модель:

    Browser validation
            ↓
    API validation
            ↓
    Business rules
            ↓
    Database constraints

---

# 53. Не дублюй validation без причини

Може виникнути:

    React:
        email format

    Nest:
        email format

    PostgreSQL:
        email format

Деяке дублювання є нормальним.

Але потрібно розуміти відповідальність кожного рівня.

Frontend:

    UX

Backend:

    API contract
    business rules
    security

Database:

    data integrity

---

# 54. Validation schema

Для великих форм validation logic може бути винесена в окремий модуль.

Наприклад:

    form/
    ├── form.types.ts
    ├── form.validation.ts
    └── RegisterForm.tsx

У:

    form.validation.ts

може бути:

    export const validateRegisterForm = (
        values: RegisterFormData
    ): RegisterFormErrors => {
        const errors: RegisterFormErrors = {};

        // validation

        return errors;
    };

Це дозволяє не перетворювати компонент на великий файл.

---

# 55. Чиста validation function

Хороша validation function:

    input
      ↓
    validation
      ↓
    result

Наприклад:

    const validateEmail = (
        email: string
    ): string | undefined => {
        if (!email.trim()) {
            return "Email is required";
        }

        if (!email.includes("@")) {
            return "Invalid email";
        }

        return undefined;
    };

Вона не повинна сама:

- змінювати React state;
- показувати UI;
- робити navigation;
- викликати `setErrors`.

Її завдання — перевірити дані та повернути результат.

---

# 56. Validation function без React

Це дуже корисно.

Наприклад:

    export const validateEmail = (
        email: string
    ): string | undefined => {
        if (!email.trim()) {
            return "Email is required";
        }

        if (!email.includes("@")) {
            return "Invalid email";
        }

        return undefined;
    };

Її можна використовувати:

    React component
        ↓
    validateEmail()

або в:

    tests
        ↓
    validateEmail()

---

# 57. Приклад повної простої форми

    import { useState } from "react";

    type FormData = {
        email: string;
        password: string;
    };

    type FormErrors = {
        email?: string;
        password?: string;
    };

    const initialFormData: FormData = {
        email: "",
        password: "",
    };

    const validateForm = (
        values: FormData
    ): FormErrors => {
        const errors: FormErrors = {};

        if (!values.email.trim()) {
            errors.email = "Email is required";
        } else if (!values.email.includes("@")) {
            errors.email = "Invalid email";
        }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 8) {
            errors.password =
                "Password must contain at least 8 characters";
        }

        return errors;
    };

    const LoginForm = () => {
        const [formData, setFormData] =
            useState<FormData>(initialFormData);

        const [errors, setErrors] =
            useState<FormErrors>({});

        const handleChange = (
            event: React.ChangeEvent<HTMLInputElement>
        ) => {
            const { name, value } = event.target;

            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        };

        const handleSubmit = (
            event: React.FormEvent<HTMLFormElement>
        ) => {
            event.preventDefault();

            const validationErrors =
                validateForm(formData);

            setErrors(validationErrors);

            if (
                Object.keys(validationErrors).length > 0
            ) {
                return;
            }

            console.log("Login:", formData);
        };

        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.email)}
                    />

                    {errors.email && (
                        <p>{errors.email}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.password)}
                    />

                    {errors.password && (
                        <p>{errors.password}</p>
                    )}
                </div>

                <button type="submit">
                    Login
                </button>
            </form>
        );
    };

---

# 58. Покращена модель: errors + touched

Типова форма:

    const [formData, setFormData] =
        useState<FormData>(initialFormData);

    const [errors, setErrors] =
        useState<FormErrors>({});

    const [touched, setTouched] =
        useState<TouchedFields>({});

Після `blur`:

    setTouched((prev) => ({
        ...prev,
        [name]: true,
    }));

Показуємо помилку:

    {touched.email && errors.email && (
        <p>{errors.email}</p>
    )}

---

# 59. Коли очищати помилку

Є декілька стратегій.

## Strategy 1 — після зміни поля

    користувач виправляє email
          ↓
    validation
          ↓
    error зникає

---

## Strategy 2 — при blur

    користувач залишає поле
          ↓
    validation
          ↓
    error

---

## Strategy 3 — тільки після submit

    submit
      ↓
    validation
      ↓
    errors

Вибір залежить від UX конкретної форми.

---

# 60. Не видаляй всі errors при зміні одного поля

Погано:

    setErrors({
        email: newEmailError,
    });

Якщо вже була:

    password: "Password is too short"

ця помилка зникне.

Краще:

    setErrors((prev) => ({
        ...prev,
        email: newEmailError,
    }));

Або видалити конкретне поле:

    setErrors((prev) => {
        const next = { ...prev };

        delete next.email;

        return next;
    });

---

# 61. `setState` і validation

Пам'ятай, що state update не змінює поточний render snapshot миттєво.

Наприклад:

    setFormData(newData);

    console.log(formData);

Тут `formData` може містити старе значення поточного render.

Тому краще validation виконувати над значенням, яке вже є у handler:

    const value = event.target.value;

    const error = validateEmail(value);

або над актуальним об'єктом values, який ти явно сформував.

---

# 62. Validation і derived state

Не потрібно створювати:

    const [isValid, setIsValid] =
        useState(false);

якщо:

    isValid = Object.keys(errors).length === 0

Краще:

    const isValid =
        Object.keys(errors).length === 0;

Так немає двох джерел правди.

---

# 63. Disabled Submit button

Можна зробити:

    <button
        type="submit"
        disabled={!isValid}
    >
        Submit
    </button>

Але потрібно подумати про UX.

Якщо кнопка disabled до першої взаємодії:

    користувач бачить disabled button
        ↓
    не розуміє, що саме потрібно виправити

Часто краще дозволити submit і показати помилки.

---

# 64. `disabled` vs validation

`disabled` — це UI behavior.

Validation — це correctness rule.

Навіть якщо:

    button disabled

backend все одно повинен перевірити дані.

Не можна вважати:

    disabled button

захистом.

---

# 65. Валідація під час submit як останній бар'єр

Навіть якщо validation виконується:

    onChange

або:

    onBlur

перед submit корисно ще раз виконати:

    validateForm(formData)

Тому що користувач може:

- змінити поле;
- не втратити focus;
- викликати submit;
- отримати новий стан.

Фінальна схема:

    onChange
        ↓
    optional validation

    onBlur
        ↓
    field validation

    onSubmit
        ↓
    full validation
        ↓
    API

---

# 66. Типовий flow реальної форми

    User
      ↓
    Input
      ↓
    onChange
      ↓
    formData
      ↓
    onBlur
      ↓
    field validation
      ↓
    errors
      ↓
    UI feedback
      ↓
    Submit
      ↓
    full validation
      ↓
    API
      ↓
    Server validation
      ↓
    Success / Server errors

Це одна з найважливіших моделей для розуміння form validation.

---

# 67. Accessibility

Для доступної форми:

- кожне поле має `<label>`;
- `label` пов'язаний з `input`;
- помилка пов'язана з полем;
- `aria-invalid` відображає invalid state;
- помилка не передається тільки через колір;
- повідомлення повинні бути зрозумілими.

Приклад:

    <label htmlFor="email">
        Email
    </label>

    <input
        id="email"
        name="email"
        aria-invalid={Boolean(errors.email)}
        aria-describedby={
            errors.email
                ? "email-error"
                : undefined
        }
    />

    {errors.email && (
        <p id="email-error">
            {errors.email}
        </p>
    )}

---

# 68. Погані error messages

Не дуже корисно:

    Invalid

    Error

    Wrong value

Краще:

    Email is required

    Please enter a valid email address

    Password must contain at least 8 characters

    Passwords do not match

Повідомлення повинно пояснювати:

    що неправильно
        +
    що потрібно зробити

---

# 69. Common Mistakes

## Помилка 1 — validation тільки на frontend

    React validation
        ↓
    "Все безпечно"

Неправильно.

Backend повинен перевіряти дані повторно.

---

## Помилка 2 — всі помилки в одному string

    const [error, setError] =
        useState("");

Для великої форми це незручно.

Краще:

    {
        email?: string;
        password?: string;
        name?: string;
    }

---

## Помилка 3 — показувати всі помилки одразу

Користувач відкриває форму і відразу бачить:

    Name is required
    Email is required
    Password is required

Це може бути поганим UX.

Часто краще використовувати:

    touched

---

## Помилка 4 — validation тільки onChange

Користувач вводить:

    a
    ab
    abc

і постійно бачить помилки.

Іноді `onBlur` або `onSubmit` підходить краще.

---

## Помилка 5 — змішувати validation і API

Не варто робити всю логіку в одному `handleSubmit`.

Краще:

    validateForm()
    submitForm()

---

## Помилка 6 — зберігати derived state

Погано:

    errors
    isValid

як два незалежних state, якщо:

    isValid

можна обчислити з:

    errors

---

## Помилка 7 — мутувати errors

Погано:

    errors.email = "Invalid";

React state не слід мутувати напряму.

Краще:

    setErrors((prev) => ({
        ...prev,
        email: "Invalid",
    }));

---

## Помилка 8 — використовувати `any`

Погано:

    const [errors, setErrors] =
        useState<any>({});

Краще:

    type FormErrors = {
        email?: string;
        password?: string;
    };

    const [errors, setErrors] =
        useState<FormErrors>({});

---

# 70. Архітектура простої форми

Для невеликої форми:

    LoginForm.tsx

може містити:

    FormData
    FormErrors
    validateForm
    handleChange
    handleSubmit
    JSX

Для більшої форми:

    register/
    ├── RegisterForm.tsx
    ├── register.types.ts
    ├── register.validation.ts
    └── register.api.ts

Наприклад:

    RegisterForm.tsx
        ↓
    register.validation.ts
        ↓
    register.api.ts

---

# 71. Validation як окремий шар

Корисна модель:

    UI
     ↓
    Form state
     ↓
    Validation
     ↓
    API
     ↓
    Backend

Не потрібно дозволяти UI-компоненту знати всі деталі validation/business logic.

---

# 72. Form validation vs business validation

Це не завжди одне й те саме.

Наприклад:

    email must contain "@"

це форматна validation.

А:

    email must be unique

це вже server/business rule.

А:

    user can edit only own profile

це authorization rule.

Важливо не змішувати ці поняття.

---

# 73. Міні-приклад validation pipeline

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const errors = validateForm(formData);

        setErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        try {
            await submitForm(formData);
        } catch (error) {
            console.error(error);
        }
    };

Модель:

    input
      ↓
    client validation
      ↓
    valid?
      ↓
    API
      ↓
    server validation
      ↓
    success / error

---

# 74. Що потрібно знати Junior

Ти повинен розуміти:

- що таке form validation;
- client-side vs server-side validation;
- `required`;
- `minLength`;
- `maxLength`;
- `pattern`;
- `errors`;
- `validateField`;
- `validateForm`;
- `onChange`;
- `onBlur`;
- `onSubmit`;
- `touched`;
- базову TypeScript типізацію;
- `aria-invalid`;
- `aria-describedby`.

---

# 75. Що потрібно знати Strong Junior

Потрібно розуміти:

- різницю між `touched` і `dirty`;
- field-level validation;
- form-level validation;
- cross-field validation;
- async validation;
- server-side errors;
- normalization;
- derived `isValid`;
- validation architecture;
- reusable form components;
- accessibility;
- separation of validation і submit logic.

---

# 76. Що потрібно знати Middle

Корисно розуміти:

- validation architecture;
- schema-based validation;
- reusable validation rules;
- complex forms;
- dynamic fields;
- async validation;
- debounce;
- server validation;
- API error mapping;
- form state architecture;
- reusable form abstractions;
- performance implications;
- accessibility;
- testing validation logic.

---

# 77. Interview Questions — Junior

### 1. Що таке form validation?

Перевірка введених користувачем даних на відповідність заданим правилам.

### 2. Навіщо потрібна client-side validation?

Для швидкого feedback і покращення UX.

### 3. Чи достатньо client-side validation?

Ні. Backend повинен перевіряти дані повторно.

### 4. Що таке `errors`?

State або результат validation, який містить помилки окремих полів.

### 5. Для чого `onBlur`?

Для реакції на втрату focus, наприклад для validation поля після того, як користувач його залишив.

### 6. Що таке `touched`?

Інформація про те, чи взаємодіяв користувач із полем.

---

# 78. Interview Questions — Strong Junior

### 1. Чим `touched` відрізняється від `dirty`?

`touched` означає взаємодію з полем.

`dirty` означає зміну значення.

### 2. Де краще запускати validation?

Залежить від UX:

- `onChange`;
- `onBlur`;
- `onSubmit`.

Часто використовують комбінацію.

### 3. Чому `isValid` може бути derived state?

Тому що його можна отримати з `errors`:

    const isValid =
        Object.keys(errors).length === 0;

### 4. Чому backend також повинен перевіряти дані?

Тому що frontend не є trusted environment.

### 5. Що таке cross-field validation?

Validation, яка залежить від декількох полів.

Наприклад:

    password === confirmPassword

---

# 79. Interview Questions — Middle

### 1. Як організувати validation у великому React application?

Винести:

- types;
- validation rules;
- API;
- reusable form components

у відповідні модулі.

### 2. Чим client validation відрізняється від business validation?

Client validation переважно забезпечує UX.

Business validation визначає, чи дозволена операція за правилами системи.

### 3. Чому validation functions бажано робити чистими?

Тому що їх простіше:

- тестувати;
- повторно використовувати;
- переносити;
- підтримувати.

### 4. Як обробити server-side validation errors?

Отримати structured errors від API та перетворити їх у `FormErrors`.

Наприклад:

    API
      ↓
    {
        email: "Email already exists"
    }
      ↓
    setErrors()

### 5. Чому frontend validation не є security mechanism?

Тому що користувач контролює client environment і може напряму відправити HTTP request.

---

# 80. Mini Cheat Sheet

## Form state

    const [formData, setFormData] =
        useState<FormData>(initialFormData);

## Errors

    type FormErrors = {
        email?: string;
        password?: string;
    };

    const [errors, setErrors] =
        useState<FormErrors>({});

## Touched

    const [touched, setTouched] =
        useState<TouchedFields>({});

## Validation

    const errors = validateForm(formData);

## Check validity

    const isValid =
        Object.keys(errors).length === 0;

## Submit

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const errors = validateForm(formData);

        setErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        submitForm();
    };

## Error UI

    {errors.email && (
        <p>{errors.email}</p>
    )}

## Accessibility

    <input
        aria-invalid={Boolean(errors.email)}
        aria-describedby="email-error"
    />

## Server validation

    client validation
        ↓
    API
        ↓
    server validation
        ↓
    database

---

# 81. Головна ментальна модель

Запам'ятай:

    FORM

    formData
        ↓
    validation
        ↓
    errors
        ↓
    UI feedback
        ↓
    submit
        ↓
    API
        ↓
    server validation
        ↓
    success / server errors

А для окремого поля:

    value
      ↓
    normalize
      ↓
    validate
      ↓
    error
      ↓
    UI

---

# 82. Рівні знань

## 🟢 Beginner

Знаєш:

    form
    onSubmit
    formData
    errors
    required
    validateForm

Можеш створити просту login form.

---

## 🟡 Junior

Знаєш:

    errors
    touched
    onChange
    onBlur
    onSubmit
    field validation
    form validation
    TypeScript

Можеш створити registration form.

---

## 🔵 Strong Junior

Розумієш:

    cross-field validation
    server errors
    async validation
    accessibility
    reusable fields
    validation architecture

Можеш створювати складніші форми для реального application.

---

## 🟠 Middle

Розумієш:

    validation architecture
    schema validation
    reusable abstractions
    async validation
    server validation
    API error mapping
    testing
    performance

Можеш проектувати form architecture для великого application.

---

# 83. Практичний проєкт

Зроби:

## Registration Form

Поля:

    name
    email
    password
    confirmPassword
    age
    role
    terms

Validation:

    name
        required
        min 2 characters

    email
        required
        valid format

    password
        required
        min 8 characters

    confirmPassword
        must match password

    age
        required
        >= 18

    role
        required

    terms
        must be true

---

## Етап 1

Створи:

    formData

---

## Етап 2

Створи:

    errors

---

## Етап 3

Створи:

    validateField()

---

## Етап 4

Створи:

    validateForm()

---

## Етап 5

Додай:

    touched

---

## Етап 6

Додай:

    onBlur

---

## Етап 7

Додай:

    aria-invalid
    aria-describedby

---

## Етап 8

Зроби:

    submit

тільки після успішної client validation.

---

## Етап 9

Замість `console.log` підключи API.

---

## Етап 10

Оброби:

    server validation errors

---

# 84. Підсумкова структура

Після проходження теми ти повинен бачити форму приблизно так:

    RegisterForm
    │
    ├── formData
    │
    ├── errors
    │
    ├── touched
    │
    ├── handleChange()
    │
    ├── handleBlur()
    │
    ├── validateField()
    │
    ├── validateForm()
    │
    └── handleSubmit()
            │
            ├── validation
            │
            ├── errors
            │
            └── API

---

# 85. Головне

Запам'ятай 10 речей:

1. Validation перевіряє дані форми.
2. Client-side validation покращує UX.
3. Server-side validation залишається обов'язковою.
4. `errors` зберігає помилки полів.
5. `touched` показує, чи взаємодіяв користувач із полем.
6. `dirty` показує, чи було змінено значення.
7. `validateField()` перевіряє окреме поле.
8. `validateForm()` перевіряє всю форму.
9. `isValid` часто можна отримати з `errors`, а не зберігати окремо.
10. Validation, UI та API краще тримати логічно розділеними.

Головна схема:

    USER INPUT
        ↓
    FORM STATE
        ↓
    VALIDATION
        ↓
    ERRORS
        ↓
    UI FEEDBACK
        ↓
    SUBMIT
        ↓
    API
        ↓
    SERVER VALIDATION
        ↓
    DATABASE / BUSINESS LOGIC

---

# 86. Наступний крок

Після `06-form-validation` логічно перейти до наступного рівня React forms і state management:

    React
    │
    ├── Components
    │
    ├── Props
    │
    ├── Lists
    │
    ├── Styling
    │
    ├── Events
    │
    ├── State
    │
    ├── State Updates
    │
    ├── Controlled Components
    │
    ├── Forms
    │
    └── Form Validation
             ↓
       складніші form patterns
             ↓
       reusable components
             ↓
       API / REST
             ↓
       server state

Після цієї теми важливо вже не просто вміти створити `<form>`, а розуміти повний цикл:

    data
      ↓
    state
      ↓
    validation
      ↓
    user feedback
      ↓
    submit
      ↓
    backend
      ↓
    server response
      ↓
    UI