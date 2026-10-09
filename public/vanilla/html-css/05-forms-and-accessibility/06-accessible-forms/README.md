# Accessible Forms — Доступні форми

## Зміст

1. [Що таке Accessible Form](#що-таке-accessible-form)
2. [Головний принцип](#головний-принцип)
3. [Структура доступної форми](#структура-доступної-форми)
4. [Label та Accessible Name](#label-та-accessible-name)
5. [Input та типи полів](#input-та-типи-полів)
6. [Placeholder](#placeholder)
7. [Required-поля](#required-поля)
8. [Fieldset та Legend](#fieldset-та-legend)
9. [Групи Radio та Checkbox](#групи-radio-та-checkbox)
10. [Підказки та Description](#підказки-та-description)
11. [aria-describedby](#aria-describedby)
12. [Помилки валідації](#помилки-валідації)
13. [aria-invalid](#aria-invalid)
14. [aria-required](#aria-required)
15. [Client-side та Server-side Validation](#client-side-та-server-side-validation)
16. [Коли показувати помилки](#коли-показувати-помилки)
17. [Focus Management](#focus-management)
18. [Error Summary](#error-summary)
19. [Autocomplete](#autocomplete)
20. [Button у формах](#button-у-формах)
21. [Disabled та Readonly](#disabled-та-readonly)
22. [Keyboard Accessibility](#keyboard-accessibility)
23. [Мультикрокові форми](#мультикрокові-форми)
24. [Accessible Login Form](#accessible-login-form)
25. [Accessible Registration Form](#accessible-registration-form)
26. [Accessible File Input](#accessible-file-input)
27. [Custom Form Controls](#custom-form-controls)
28. [ARIA у формах](#aria-у-формах)
29. [Live Regions та динамічні повідомлення](#live-regions-та-динамічні-повідомлення)
30. [Native Validation vs Custom Validation](#native-validation-vs-custom-validation)
31. [JavaScript та Accessible Forms](#javascript-та-accessible-forms)
32. [Progressive Enhancement](#progressive-enhancement)
33. [Типові помилки](#типові-помилки)
34. [Практичний приклад доступної форми](#практичний-приклад-доступної-форми)
35. [Як тестувати форму](#як-тестувати-форму)
36. [Checklist](#checklist)
37. [Що потрібно пам'ятати](#що-потрібно-памятати)
38. [Питання на співбесіді](#питання-на-співбесіді)
39. [Рівні знань](#рівні-знань)
40. [Mini Cheat Sheet](#mini-cheat-sheet)
41. [Головне](#головне)

---

# Що таке Accessible Form

**Accessible Form** — це HTML-форма, якою можуть користуватися різні люди незалежно від способу взаємодії з сайтом:

- мишкою;
- клавіатурою;
- screen reader;
- touch-пристроєм;
- збільшеним масштабом;
- допоміжними технологіями;
- без точного кольорового сприйняття;
- з різними фізичними або когнітивними обмеженнями.

Доступна форма повинна дозволяти користувачу:

1. зрозуміти, яке поле перед ним;
2. зрозуміти, що потрібно ввести;
3. перейти до поля клавіатурою;
4. ввести дані;
5. зрозуміти помилки;
6. виправити помилки;
7. зрозуміти результат відправлення форми.

---

# Головний принцип

Найважливіший принцип:

> **Спочатку правильний семантичний HTML, потім CSS, потім JavaScript, і лише після цього ARIA, якщо вона дійсно потрібна.**

Правильно:

    <label for="email">Email</label>
    <input id="email" type="email">

Не потрібно відразу створювати складний custom control.

Наприклад, замість:

    <div class="custom-input">
        Email
    </div>

краще використовувати:

    <label for="email">Email</label>
    <input id="email" type="email">

Нативний HTML уже містить багато accessibility-функцій.

---

# Структура доступної форми

Типова доступна форма:

    <form>
        <div>
            <label for="name">Ім'я</label>
            <input id="name" name="name" type="text">
        </div>

        <div>
            <label for="email">Email</label>
            <input id="email" name="email" type="email">
        </div>

        <button type="submit">
            Надіслати
        </button>
    </form>

Основні елементи:

- `<form>`
- `<label>`
- `<input>`
- `<textarea>`
- `<select>`
- `<fieldset>`
- `<legend>`
- `<button>`

---

# Label та Accessible Name

## Що таке label

`<label>` пояснює користувачу призначення поля.

Правильний варіант:

    <label for="email">Email</label>
    <input id="email" name="email" type="email">

`for` повинен відповідати `id`.

    for="email"
    id="email"

---

## Чому label важливий

`label`:

- пояснює призначення поля;
- допомагає screen reader;
- збільшує область кліку;
- пов'язує текст із конкретним control;
- створює доступне ім'я поля.

---

## Клік по label

Наприклад:

    <label for="username">Username</label>
    <input id="username" type="text">

Користувач може натиснути не тільки на input, а й на текст `Username`.

---

## Альтернативний спосіб

Можна вкладати input у label:

    <label>
        Username
        <input type="text" name="username">
    </label>

Це також валідний спосіб зв'язування.

Але у великих формах часто зручніше використовувати:

    <label for="username">Username</label>
    <input id="username" name="username">

---

# Accessible Name

**Accessible Name** — це ім'я, під яким accessibility technology ідентифікує елемент.

Наприклад:

    <label for="email">Email address</label>
    <input id="email" type="email">

Accessible name:

    Email address

Для кнопки:

    <button type="submit">
        Save
    </button>

Accessible name:

    Save

---

# Input та типи полів

Використовуй правильний `type`.

Замість:

    <input type="text">

для email:

    <input type="email">

Для телефону:

    <input type="tel">

Для URL:

    <input type="url">

Для числа:

    <input type="number">

Для пароля:

    <input type="password">

Для пошуку:

    <input type="search">

---

## Чому правильний type важливий

Правильний `type` допомагає:

- browser validation;
- screen reader;
- mobile keyboard;
- autocomplete;
- користувачу зрозуміти призначення поля.

Наприклад:

    <input type="email">

на мобільному пристрої може показати клавіатуру, оптимізовану для введення email.

---

# Placeholder

`placeholder` — це підказка всередині поля.

Наприклад:

    <input
        type="email"
        placeholder="you@example.com"
    >

Але `placeholder` **не повинен замінювати label**.

Погано:

    <input
        type="email"
        placeholder="Email"
    >

Краще:

    <label for="email">Email</label>

    <input
        id="email"
        name="email"
        type="email"
        placeholder="you@example.com"
    >

Тут:

- `label` — назва поля;
- `placeholder` — додаткова підказка.

---

# Required-поля

Якщо поле обов'язкове, використовуй `required`.

    <label for="email">
        Email
    </label>

    <input
        id="email"
        name="email"
        type="email"
        required
    >

Browser зможе виконати базову native validation.

---

## Візуальне позначення required

Можна додати:

    <label for="email">
        Email <span aria-hidden="true">*</span>
    </label>

    <input
        id="email"
        name="email"
        type="email"
        required
    >

Але не покладайся тільки на `*`.

Краще пояснити правило:

    <p>
        Поля, позначені *, є обов'язковими.
    </p>

---

# Fieldset та Legend

`<fieldset>` використовується для логічного групування пов'язаних form controls.

`<legend>` задає назву групи.

Наприклад:

    <fieldset>
        <legend>Спосіб оплати</legend>

        <label>
            <input
                type="radio"
                name="payment"
                value="card"
            >
            Банківська картка
        </label>

        <label>
            <input
                type="radio"
                name="payment"
                value="cash"
            >
            Готівка
        </label>
    </fieldset>

---

## Навіщо fieldset

Особливо важливий для:

- radio groups;
- checkbox groups;
- адресних груп;
- груп персональних даних;
- складних форм.

Screen reader може повідомити користувачу контекст групи.

---

# Групи Radio та Checkbox

## Radio buttons

Radio використовуються, коли потрібно вибрати **один** варіант.

    <fieldset>
        <legend>Стать</legend>

        <label>
            <input
                type="radio"
                name="gender"
                value="male"
            >
            Чоловіча
        </label>

        <label>
            <input
                type="radio"
                name="gender"
                value="female"
            >
            Жіноча
        </label>
    </fieldset>

Головне:

    name="gender"

однаковий для всіх radio buttons у групі.

---

## Checkbox

Checkbox дозволяє вибирати незалежні значення.

    <fieldset>
        <legend>Інтереси</legend>

        <label>
            <input
                type="checkbox"
                name="interest"
                value="javascript"
            >
            JavaScript
        </label>

        <label>
            <input
                type="checkbox"
                name="interest"
                value="css"
            >
            CSS
        </label>
    </fieldset>

---

# Підказки та Description

Іноді одного label недостатньо.

Наприклад:

    <label for="password">
        Password
    </label>

    <p id="password-help">
        Пароль повинен містити щонайменше 8 символів.
    </p>

    <input
        id="password"
        name="password"
        type="password"
    >

Тепер потрібно пов'язати опис із полем.

---

# aria-describedby

Для додаткового опису використовується:

    aria-describedby

Наприклад:

    <label for="password">
        Password
    </label>

    <p id="password-help">
        Мінімум 8 символів.
    </p>

    <input
        id="password"
        type="password"
        aria-describedby="password-help"
    >

`aria-describedby` повідомляє:

> цей елемент має додатковий опис, який знаходиться в іншому елементі.

---

## Кілька описів

Можна вказати декілька ID:

    <input
        id="email"
        type="email"
        aria-describedby="email-help email-error"
    >

    <p id="email-help">
        Використовуйте робочу email-адресу.
    </p>

    <p id="email-error">
        Введіть коректну email-адресу.
    </p>

---

# Помилки валідації

Помилка повинна:

1. бути зрозумілою;
2. бути пов'язана з конкретним полем;
3. пояснювати, що потрібно виправити;
4. бути доступною для screen reader;
5. не покладатися тільки на колір.

Погано:

    Email неправильний.

Краще:

    Введіть коректну email-адресу, наприклад user@example.com.

---

# aria-invalid

`aria-invalid="true"` повідомляє accessibility technology, що значення поля не відповідає очікуваному.

Наприклад:

    <label for="email">
        Email
    </label>

    <input
        id="email"
        type="email"
        aria-invalid="true"
    >

    <p id="email-error">
        Введіть коректну email-адресу.
    </p>

---

## aria-invalid + aria-describedby

Краще зв'язати поле з повідомленням:

    <label for="email">
        Email
    </label>

    <input
        id="email"
        name="email"
        type="email"
        aria-invalid="true"
        aria-describedby="email-error"
    >

    <p id="email-error">
        Введіть коректну email-адресу.
    </p>

Тепер користувач отримує:

- назву поля;
- інформацію про помилку;
- текст помилки.

---

# aria-required

Існує:

    aria-required="true"

Але для звичайного HTML input краще використовувати native:

    required

Наприклад:

    <input
        id="email"
        type="email"
        required
    >

а не:

    <input
        id="email"
        type="email"
        aria-required="true"
    >

Native HTML краще, коли він уже вирішує задачу.

---

# Client-side та Server-side Validation

## Client-side validation

Відбувається у браузері.

Наприклад:

    <input
        type="email"
        required
    >

Переваги:

- швидкий feedback;
- кращий UX;
- не потрібно одразу робити запит на сервер.

---

## Server-side validation

Відбувається на backend.

Наприклад:

    browser
        ↓
    form
        ↓
    server
        ↓
    validation
        ↓
    database

Server-side validation необхідна незалежно від client-side validation.

> Client-side validation — це UX.
>
> Server-side validation — це частина безпеки та коректності даних.

---

# Коли показувати помилки

Є декілька стратегій.

## Після submit

Користувач натискає:

    Submit

і після цього бачить помилки.

Добре для простих форм.

---

## Під час введення

Наприклад:

    password

може показувати вимоги поступово.

Але не варто агресивно показувати помилку на кожну натиснуту клавішу.

---

## При втраті focus

Наприклад:

    input
        ↓
    blur
        ↓
    validation

Це часто хороший компроміс.

---

# Focus Management

Focus дуже важливий для доступності.

Користувач повинен розуміти:

> де я зараз знаходжуся у формі?

Наприклад, після submit форми є 3 помилки.

Поганий UX:

    Submit
      ↓
    сторінка залишається без зрозумілого focus

Краще:

    Submit
      ↓
    validation
      ↓
    focus на першому invalid field

---

## Focus на першому помилковому полі

JavaScript:

    const firstInvalidField = document.querySelector(
        '[aria-invalid="true"]'
    );

    firstInvalidField?.focus();

Це дозволяє користувачу відразу почати виправлення.

---

# Error Summary

Для складної форми можна показати summary.

    <div
        role="alert"
        tabindex="-1"
    >
        <h2>Форму не вдалося відправити</h2>

        <p>
            Виправте помилки нижче.
        </p>

        <ul>
            <li>
                <a href="#email">
                    Виправте email
                </a>
            </li>

            <li>
                <a href="#password">
                    Виправте пароль
                </a>
            </li>
        </ul>
    </div>

Посилання можуть вести безпосередньо до проблемних полів.

---

# Autocomplete

`autocomplete` допомагає браузеру заповнювати відомі користувачу дані.

Наприклад:

    <label for="name">Ім'я</label>

    <input
        id="name"
        name="name"
        type="text"
        autocomplete="given-name"
    >

Прізвище:

    <input
        id="last-name"
        name="last-name"
        autocomplete="family-name"
    >

Email:

    <input
        id="email"
        name="email"
        type="email"
        autocomplete="email"
    >

Телефон:

    <input
        id="phone"
        name="phone"
        type="tel"
        autocomplete="tel"
    >

---

## Приклад address autocomplete

    <input
        id="street"
        name="street"
        autocomplete="street-address"
    >

Місто:

    <input
        id="city"
        name="city"
        autocomplete="address-level2"
    >

Postal code:

    <input
        id="postal-code"
        name="postal-code"
        autocomplete="postal-code"
    >

---

# Button у формах

Завжди визначай тип кнопки.

    <button type="submit">
        Submit
    </button>

Кнопка скидання:

    <button type="reset">
        Reset
    </button>

Звичайна кнопка:

    <button type="button">
        Cancel
    </button>

---

## Чому type важливий

Усередині `<form>`:

    <button>
        Cancel
    </button>

за замовчуванням може поводитися як submit button.

Тому краще:

    <button type="button">
        Cancel
    </button>

---

# Disabled та Readonly

Це різні стани.

## disabled

    <input
        type="text"
        disabled
    >

Disabled control:

- не редагується;
- не приймає звичайний focus;
- не відправляється разом із form data.

---

## readonly

    <input
        type="text"
        value="Vinnytsia"
        readonly
    >

Readonly:

- значення не можна змінити;
- поле залишається частиною форми;
- поле може отримувати focus.

---

## Коли використовувати

`disabled`:

> це поле зараз недоступне.

`readonly`:

> значення доступне для перегляду, але його не можна редагувати.

---

# Keyboard Accessibility

Форма повинна працювати без миші.

Основна навігація:

    Tab
    Shift + Tab
    Enter
    Space
    Arrow keys

Для стандартних HTML controls browser уже забезпечує багато необхідної поведінки.

---

## Tab order

Зазвичай порядок визначається DOM:

    Name
    ↓
    Email
    ↓
    Password
    ↓
    Submit

Порядок HTML повинен відповідати логічному порядку форми.

---

## Не використовуй позитивний tabindex без необхідності

Погано:

    <input tabindex="5">

    <input tabindex="1">

    <input tabindex="3">

Це створює складний і неприродний порядок.

Краще:

    <input>

    <input>

    <input>

і дозволити browser використовувати природний DOM order.

---

# Мультикрокові форми

Мультикрокова форма:

    Step 1
        ↓
    Step 2
        ↓
    Step 3
        ↓
    Submit

Користувач повинен розуміти:

- на якому він кроці;
- скільки кроків;
- що вже заповнено;
- що залишилося;
- як повернутися назад.

---

## Приклад структури

    <form>
        <h1>Реєстрація</h1>

        <p>
            Крок 2 із 3
        </p>

        <fieldset>
            <legend>Контактна інформація</legend>

            <label for="email">
                Email
            </label>

            <input
                id="email"
                name="email"
                type="email"
                required
            >
        </fieldset>

        <button type="button">
            Назад
        </button>

        <button type="submit">
            Далі
        </button>
    </form>

---

# Accessible Login Form

Базова доступна login form:

    <form>
        <h1>Вхід</h1>

        <div>
            <label for="email">
                Email
            </label>

            <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
            >
        </div>

        <div>
            <label for="password">
                Пароль
            </label>

            <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
            >
        </div>

        <button type="submit">
            Увійти
        </button>
    </form>

---

# Accessible Registration Form

Приклад:

    <form>
        <h1>Створити акаунт</h1>

        <div>
            <label for="name">
                Ім'я
            </label>

            <input
                id="name"
                name="name"
                type="text"
                autocomplete="given-name"
                required
            >
        </div>

        <div>
            <label for="email">
                Email
            </label>

            <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
            >
        </div>

        <div>
            <label for="password">
                Пароль
            </label>

            <p id="password-help">
                Мінімум 8 символів.
            </p>

            <input
                id="password"
                name="password"
                type="password"
                autocomplete="new-password"
                aria-describedby="password-help"
                minlength="8"
                required
            >
        </div>

        <label>
            <input
                type="checkbox"
                name="terms"
                required
            >

            Я погоджуюся з умовами використання.
        </label>

        <button type="submit">
            Зареєструватися
        </button>
    </form>

---

# Accessible File Input

Для file input також потрібен label.

    <label for="avatar">
        Завантажити фото
    </label>

    <input
        id="avatar"
        name="avatar"
        type="file"
        accept="image/*"
    >

Можна додати опис:

    <p id="avatar-help">
        PNG або JPG, максимум 5 MB.
    </p>

    <input
        id="avatar"
        type="file"
        aria-describedby="avatar-help"
    >

---

# Custom Form Controls

Custom controls створюють додаткові проблеми.

Наприклад:

    <div class="custom-select">
        Choose country
    </div>

Це не native select.

Тепер розробнику потрібно самостійно реалізувати:

- keyboard interaction;
- focus;
- accessible name;
- state;
- selected option;
- expanded state;
- screen reader behavior;
- ARIA roles;
- keyboard navigation.

---

## Краще використати native HTML

Замість custom select:

    <select id="country" name="country">
        <option value="ua">Ukraine</option>
        <option value="pl">Poland</option>
        <option value="de">Germany</option>
    </select>

Native control майже завжди простіший і надійніший.

---

# ARIA у формах

ARIA може доповнювати HTML.

Основні атрибути:

    aria-describedby
    aria-invalid
    aria-required
    aria-label
    aria-labelledby
    aria-disabled

---

## aria-label

Використовується, коли немає видимого label або коли потрібно задати accessible name.

Наприклад:

    <button
        type="button"
        aria-label="Показати пароль"
    >
        👁
    </button>

Але якщо можна використати звичайний видимий текст, краще зробити це.

---

# aria-labelledby

Дозволяє використовувати інший елемент як accessible name.

    <h2 id="billing-title">
        Платіжна інформація
    </h2>

    <section aria-labelledby="billing-title">
        ...
    </section>

Для форм це особливо корисно для складних компонентів.

---

# aria-describedby

Використовується для додаткового опису:

    <label for="username">
        Username
    </label>

    <p id="username-help">
        Введіть від 3 до 20 символів.
    </p>

    <input
        id="username"
        aria-describedby="username-help"
    >

---

# aria-invalid

Вказує, що значення не відповідає вимогам.

    <input
        id="email"
        type="email"
        aria-invalid="true"
    >

Важливо:

`aria-invalid` не виконує validation.

Вона лише описує accessibility state.

---

# Live Regions та динамічні повідомлення

Іноді JavaScript додає повідомлення після submit.

Наприклад:

    <p id="form-status">
        Дані успішно збережено.
    </p>

Для динамічних повідомлень може використовуватися:

    aria-live="polite"

Наприклад:

    <p
        id="form-status"
        aria-live="polite"
    ></p>

JavaScript:

    const status = document.querySelector("#form-status");

    status.textContent = "Дані успішно збережено.";

Screen reader може повідомити користувачу про зміну.

---

## polite vs assertive

    aria-live="polite"

означає:

> повідомити, коли це буде доречно.

    aria-live="assertive"

означає:

> повідомити якнайшвидше.

Для звичайних form status повідомлень частіше підходить:

    aria-live="polite"

Не потрібно робити всі повідомлення `assertive`.

---

# Native Validation vs Custom Validation

## Native validation

HTML:

    <input
        type="email"
        required
        minlength="5"
    >

Browser самостійно перевіряє базові правила.

---

## Custom validation

JavaScript:

    form.addEventListener("submit", (event) => {
        if (!email.value.includes("@")) {
            event.preventDefault();

            email.setAttribute(
                "aria-invalid",
                "true"
            );
        }
    });

Для складних правил custom validation може бути необхідною.

---

## Хороша стратегія

Використовуй:

    HTML native validation
            +
    JavaScript для складної логіки
            +
    server-side validation

---

# JavaScript та Accessible Forms

JavaScript не повинен ламати native behavior.

Наприклад:

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // custom logic
    });

Якщо використовуєш `preventDefault()`, переконайся, що:

- validation все одно працює;
- помилки доступні;
- focus переміщується правильно;
- status повідомляється;
- keyboard interaction працює.

---

# Приклад доступної JS-валідації

HTML:

    <form id="signup-form">
        <label for="email">
            Email
        </label>

        <input
            id="email"
            name="email"
            type="email"
            required
            aria-describedby="email-error"
        >

        <p id="email-error"></p>

        <button type="submit">
            Зареєструватися
        </button>
    </form>

JavaScript:

    const form = document.querySelector("#signup-form");
    const email = document.querySelector("#email");
    const error = document.querySelector("#email-error");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!email.value.includes("@")) {
            email.setAttribute("aria-invalid", "true");

            error.textContent =
                "Введіть коректну email-адресу.";

            email.focus();

            return;
        }

        email.setAttribute("aria-invalid", "false");

        error.textContent = "";

        // submit data
    });

---

# Progressive Enhancement

Форма повинна працювати максимально добре навіть без JavaScript, якщо це можливо.

Базова версія:

    <form action="/register" method="post">
        ...
    </form>

Потім JavaScript може додати:

- instant validation;
- AJAX/fetch;
- dynamic feedback;
- password visibility;
- autosave;
- enhanced UX.

Принцип:

    HTML
      ↓
    базова функціональність
      ↓
    CSS
      ↓
    JavaScript enhancement

---

# Типові помилки

## 1. Input без label

Погано:

    <input type="email">

Краще:

    <label for="email">
        Email
    </label>

    <input
        id="email"
        type="email"
    >

---

## 2. Placeholder замість label

Погано:

    <input
        type="text"
        placeholder="Ім'я"
    >

Краще:

    <label for="name">
        Ім'я
    </label>

    <input
        id="name"
        type="text"
        placeholder="Валерій"
    >

---

## 3. Помилка тільки червоним кольором

Погано:

    input {
        border: 2px solid red;
    }

Краще додати текст:

    <p id="email-error">
        Введіть коректну email-адресу.
    </p>

---

## 4. Icon-only button без accessible name

Погано:

    <button type="button">
        X
    </button>

Краще:

    <button
        type="button"
        aria-label="Закрити форму"
    >
        X
    </button>

---

## 5. Неправильний button type

Погано:

    <button>
        Cancel
    </button>

Краще:

    <button type="button">
        Cancel
    </button>

---

## 6. Відсутність fieldset

Для пов'язаних radio/checkbox groups краще:

    <fieldset>
        <legend>Спосіб доставки</legend>

        ...
    </fieldset>

---

## 7. Надмірне використання ARIA

Погано:

    <input
        type="text"
        role="textbox"
        aria-required="true"
    >

Якщо native HTML уже забезпечує необхідну семантику, додаткова ARIA не потрібна.

---

## 8. Видалення focus

Погано:

    * {
        outline: none;
    }

Це може зробити keyboard navigation дуже складною.

Краще:

    :focus-visible {
        outline: 2px solid currentColor;
        outline-offset: 2px;
    }

---

## 9. Неправильний порядок полів

Погано, коли візуальний порядок не відповідає DOM order.

Краще:

    HTML order
        =
    logical reading order
        =
    keyboard order

---

# Практичний приклад доступної форми

HTML:

    <!DOCTYPE html>
    <html lang="uk">
    <head>
        <meta charset="UTF-8">
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >

        <title>Реєстрація</title>

        <link rel="stylesheet" href="styles.css">
    </head>

    <body>

        <main>
            <h1>Створити акаунт</h1>

            <form
                action="/register"
                method="post"
            >

                <p>
                    Поля, позначені *,
                    є обов'язковими.
                </p>

                <div>
                    <label for="name">
                        Ім'я *
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        autocomplete="given-name"
                        required
                    >
                </div>

                <div>
                    <label for="email">
                        Email *
                    </label>

                    <p id="email-help">
                        Наприклад: user@example.com
                    </p>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        autocomplete="email"
                        aria-describedby="email-help"
                        required
                    >
                </div>

                <div>
                    <label for="password">
                        Пароль *
                    </label>

                    <p id="password-help">
                        Мінімум 8 символів.
                    </p>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="new-password"
                        minlength="8"
                        aria-describedby="password-help"
                        required
                    >
                </div>

                <fieldset>
                    <legend>
                        Спосіб зв'язку
                    </legend>

                    <label>
                        <input
                            type="radio"
                            name="contact"
                            value="email"
                            checked
                        >
                        Email
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="contact"
                            value="phone"
                        >
                        Телефон
                    </label>
                </fieldset>

                <label>
                    <input
                        type="checkbox"
                        name="terms"
                        required
                    >

                    Я погоджуюся з умовами
                    використання.
                </label>

                <button type="submit">
                    Зареєструватися
                </button>

            </form>
        </main>

    </body>
    </html>

---

# CSS для Accessible Form

Не потрібно робити accessibility тільки через CSS, але CSS повинен підтримувати usability.

    body {
        font-family: sans-serif;
        line-height: 1.5;
    }

    form {
        max-width: 500px;
    }

    form > div {
        margin-bottom: 1rem;
    }

    label {
        display: block;
        margin-bottom: 0.25rem;
        font-weight: 600;
    }

    input,
    button,
    select,
    textarea {
        font: inherit;
    }

    input,
    select,
    textarea {
        width: 100%;
        padding: 0.6rem;
    }

    button {
        padding: 0.7rem 1rem;
    }

---

# Focus styles

Ніколи не прибирай focus без заміни.

Погано:

    :focus {
        outline: none;
    }

Краще:

    :focus-visible {
        outline: 3px solid currentColor;
        outline-offset: 3px;
    }

---

# Помилки форми через CSS

Можна візуально показати invalid state:

    input[aria-invalid="true"] {
        border-width: 2px;
    }

Але не покладайся тільки на CSS.

Потрібен текст:

    <p id="email-error">
        Введіть коректну email-адресу.
    </p>

---

# Доступна структура помилки

Хороша структура:

    <label for="email">
        Email
    </label>

    <input
        id="email"
        type="email"
        aria-invalid="true"
        aria-describedby="email-error"
    >

    <p id="email-error">
        Введіть коректну email-адресу.
    </p>

Можна запам'ятати:

    Label
      ↓
    Input
      ↓
    Description / Error

---

# Error state

Типовий життєвий цикл:

    normal
      ↓
    user enters data
      ↓
    validation
      ↓
    invalid
      ↓
    aria-invalid="true"
      ↓
    error message
      ↓
    user fixes value
      ↓
    valid
      ↓
    aria-invalid="false"

---

# Success state

Не кожне поле обов'язково повинно показувати "OK".

Якщо показуєш success state, він також повинен бути зрозумілим без кольору.

Наприклад:

    Email введено правильно.

Не варто використовувати тільки:

    зелена рамка

без додаткового значення.

---

# Password visibility

Кнопка "Показати пароль" повинна бути доступною.

HTML:

    <label for="password">
        Пароль
    </label>

    <input
        id="password"
        type="password"
    >

    <button
        type="button"
        aria-label="Показати пароль"
    >
        Показати
    </button>

Після зміни стану accessible name можна змінити на:

    aria-label="Приховати пароль"

---

# Search Form

Accessible search form:

    <form
        role="search"
        action="/search"
        method="get"
    >
        <label for="search">
            Пошук
        </label>

        <input
            id="search"
            name="q"
            type="search"
        >

        <button type="submit">
            Знайти
        </button>
    </form>

`role="search"` може позначити область пошуку.

---

# Contact Form

Приклад:

    <form action="/contact" method="post">

        <h1>Зв'яжіться з нами</h1>

        <div>
            <label for="name">
                Ім'я *
            </label>

            <input
                id="name"
                name="name"
                type="text"
                autocomplete="name"
                required
            >
        </div>

        <div>
            <label for="email">
                Email *
            </label>

            <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
            >
        </div>

        <div>
            <label for="message">
                Повідомлення *
            </label>

            <textarea
                id="message"
                name="message"
                rows="6"
                required
            ></textarea>
        </div>

        <button type="submit">
            Надіслати повідомлення
        </button>

    </form>

---

# Form Labels: що потрібно запам'ятати

Для звичайного input:

    <label for="field-id">
        Label
    </label>

    <input
        id="field-id"
    >

Правило:

    label[for]
         ↓
    input[id]

Значення повинні збігатися.

---

# Label vs aria-label vs aria-labelledby

## Label

Переважний варіант:

    <label for="email">
        Email
    </label>

---

## aria-label

Коли потрібен accessible name без окремого visible label:

    <button
        aria-label="Закрити"
    >
        X
    </button>

---

## aria-labelledby

Коли accessible name береться з іншого елемента:

    <h2 id="title">
        Особисті дані
    </h2>

    <section aria-labelledby="title">
        ...
    </section>

---

# Label vs Description

Це різні речі.

## Label

Відповідає на питання:

> Що це за поле?

    Email

---

## Description

Відповідає на питання:

> Що мені потрібно зробити?

    Введіть робочу email-адресу.

---

## Error

Відповідає на питання:

> Що зараз неправильно?

    Введіть коректну email-адресу.

---

Можна представити:

    LABEL
      ↓
    що це?

    DESCRIPTION
      ↓
    як це заповнити?

    ERROR
      ↓
    що неправильно?

---

# Accessible Form Architecture

Хороша архітектура:

    <form>

        <label>
        <input>

        <label>
        <input>

        <fieldset>
            <legend>
            <radio>
            <radio>
        </fieldset>

        <label>
        <checkbox>

        <button type="submit">

    </form>

Для складнішої форми:

    form
    ├── heading
    ├── instructions
    ├── field group
    │   ├── label
    │   ├── input
    │   ├── description
    │   └── error
    │
    ├── fieldset
    │   ├── legend
    │   ├── radio
    │   └── radio
    │
    └── submit button

---

# Як думати про доступність форми

Для кожного поля постав собі 6 запитань:

1. Що це за поле?
2. Чи є у нього label?
3. Чи зрозуміло, що потрібно ввести?
4. Чи можу я дійти до нього клавіатурою?
5. Чи зрозумію я помилку?
6. Чи зможу я виправити помилку?

Якщо на всі питання відповідь "так" — форма вже значно доступніша.

---

# Як тестувати форму

## 1. Тільки клавіатурою

Не використовуй мишку.

Перевір:

    Tab
    Shift + Tab
    Enter
    Space
    Arrow keys

---

## 2. Перевір focus

Повинен бути очевидний focus indicator.

    :focus-visible {
        outline: 3px solid currentColor;
    }

---

## 3. Перевір labels

Для кожного поля:

    label
      ↓
    input

---

## 4. Перевір помилки

Навмисно введи неправильні дані.

Перевір:

- чи видно помилку;
- чи зрозумілий текст;
- чи поле позначене invalid;
- чи error пов'язаний із field;
- чи можна швидко виправити поле.

---

## 5. Перевір screen reader

Перевір, чи користувач може почути:

- назву поля;
- тип поля;
- required state;
- description;
- error;
- button name;
- status повідомлення.

---

## 6. Перевір zoom

Спробуй збільшити сторінку.

Перевір:

- чи не обрізаються поля;
- чи не перекриваються елементи;
- чи доступні кнопки;
- чи зберігається логічний порядок.

---

# Accessibility Testing Checklist

Перед завершенням форми:

- [ ] кожне поле має label;
- [ ] `for` відповідає `id`;
- [ ] використані правильні input types;
- [ ] required поля позначені `required`;
- [ ] radio groups використовують однаковий `name`;
- [ ] пов'язані radio/checkbox groups використовують `fieldset`;
- [ ] `legend` описує групу;
- [ ] placeholder не замінює label;
- [ ] додаткові підказки пов'язані через `aria-describedby`;
- [ ] помилки мають зрозумілий текст;
- [ ] invalid fields мають відповідний state;
- [ ] помилки не позначені лише кольором;
- [ ] keyboard navigation працює;
- [ ] focus видно;
- [ ] buttons мають правильний `type`;
- [ ] icon-only buttons мають accessible name;
- [ ] autocomplete використовується там, де доречно;
- [ ] form працює без зайвого JavaScript;
- [ ] server-side validation присутня;
- [ ] динамічні повідомлення доступні;
- [ ] після помилки focus керується логічно;
- [ ] форма працює зі screen reader.

---

# Що потрібно пам'ятати

## 1. Native HTML first

Спочатку:

    <label>
    <input>
    <select>
    <textarea>
    <button>
    <fieldset>
    <legend>

і лише потім ARIA.

---

## 2. Label ≠ Placeholder

`label` — назва поля.

`placeholder` — додаткова підказка.

---

## 3. Required ≠ aria-required

Для native HTML:

    required

краще за:

    aria-required="true"

---

## 4. aria-invalid ≠ validation

`aria-invalid` описує стан.

Вона сама не перевіряє дані.

---

## 5. Client validation ≠ security

Browser validation покращує UX.

Backend все одно повинен перевіряти дані.

---

## 6. Помилка повинна бути зрозумілою

Не:

    Invalid.

А:

    Введіть коректну email-адресу.

---

## 7. Focus дуже важливий

Після submit користувач повинен розуміти, де знаходиться проблема.

---

## 8. Не роби custom controls без необхідності

Native HTML часто вже вирішує:

- keyboard navigation;
- semantics;
- focus;
- accessibility;
- browser behavior.

---

# Питання на співбесіді

### 1. Що таке accessible form?

Форма, якою можуть користуватися люди з різними способами взаємодії та допоміжними технологіями.

---

### 2. Навіщо потрібен label?

Він задає зрозуміле ім'я поля, допомагає screen reader та збільшує область взаємодії.

---

### 3. Чим label відрізняється від placeholder?

`label` ідентифікує поле.

`placeholder` є лише додатковою підказкою.

---

### 4. Як зв'язати label з input?

Через:

    <label for="email">
        Email
    </label>

    <input id="email">

---

### 5. Навіщо потрібен fieldset?

Для логічного групування пов'язаних form controls.

---

### 6. Навіщо потрібен legend?

Для назви групи, створеної через `fieldset`.

---

### 7. Для чого потрібен aria-describedby?

Для зв'язування елемента з додатковим описом, підказкою або повідомленням про помилку.

---

### 8. Для чого потрібен aria-invalid?

Щоб повідомити accessibility technology, що поточне значення поля є неправильним.

---

### 9. Чи замінює aria-invalid validation?

Ні.

Вона лише описує стан поля.

---

### 10. Чим required відрізняється від aria-required?

`required` — native HTML functionality.

`aria-required` — accessibility state.

Для native form controls переважно використовувати `required`.

---

### 11. Чому placeholder не повинен замінювати label?

Тому що placeholder зникає під час введення і не є повноцінною назвою поля.

---

### 12. Що таке focus management?

Контроль того, де знаходиться keyboard focus, особливо після дій користувача або помилок.

---

### 13. Що робити після submit форми з помилками?

Показати зрозумілі помилки, пов'язати їх із відповідними полями та за потреби перевести focus на перше помилкове поле або error summary.

---

### 14. Чому потрібна server-side validation?

Тому що client-side validation може бути обійдена та не повинна вважатися механізмом безпеки.

---

### 15. Чому native controls кращі за custom controls?

Browser уже реалізує для них багато accessibility behavior.

---

### 16. Чи потрібно використовувати ARIA всюди?

Ні.

> ARIA не повинна замінювати правильний HTML.

---

# Рівні знань

## Core

Ти повинен знати:

- `<form>`;
- `<label>`;
- `<input>`;
- `<button>`;
- `for` + `id`;
- `required`;
- input types;
- placeholder;
- keyboard navigation;
- focus.

---

## Junior

Додатково:

- `fieldset`;
- `legend`;
- radio groups;
- checkbox groups;
- `autocomplete`;
- `aria-describedby`;
- `aria-invalid`;
- validation errors;
- disabled vs readonly;
- native validation;
- server-side validation.

---

## Middle

Потрібно розуміти:

- accessible name;
- accessibility tree;
- ARIA;
- focus management;
- error summary;
- live regions;
- dynamic form validation;
- screen reader behavior;
- progressive enhancement;
- custom controls;
- multi-step forms.

---

## Senior

Потрібно вміти проектувати:

- accessibility architecture;
- complex forms;
- reusable accessible components;
- custom widgets;
- keyboard interaction;
- error handling;
- focus management;
- screen reader announcements;
- form state;
- progressive enhancement;
- accessibility testing strategy.

---

# Mini Cheat Sheet

## Label

    <label for="email">
        Email
    </label>

    <input id="email">

---

## Required

    <input
        id="email"
        type="email"
        required
    >

---

## Description

    <p id="help">
        Використовуйте робочу email-адресу.
    </p>

    <input
        aria-describedby="help"
    >

---

## Error

    <input
        aria-invalid="true"
        aria-describedby="error"
    >

    <p id="error">
        Введіть коректну email-адресу.
    </p>

---

## Group

    <fieldset>
        <legend>Спосіб оплати</legend>

        <label>
            <input
                type="radio"
                name="payment"
            >
            Card
        </label>

        <label>
            <input
                type="radio"
                name="payment"
            >
            Cash
        </label>
    </fieldset>

---

## Button

    <button type="submit">
        Save
    </button>

    <button type="button">
        Cancel
    </button>

---

## Autocomplete

    <input
        type="email"
        autocomplete="email"
    >

---

## Focus

    :focus-visible {
        outline: 3px solid currentColor;
        outline-offset: 3px;
    }

---

## Status

    <p aria-live="polite">
        Дані успішно збережено.
    </p>

---

# Формула доступної форми

Можна запам'ятати так:

    SEMANTIC HTML
          +
    LABELS
          +
    CLEAR INSTRUCTIONS
          +
    KEYBOARD ACCESS
          +
    VISIBLE FOCUS
          +
    VALIDATION
          +
    ACCESSIBLE ERRORS
          +
    FOCUS MANAGEMENT
          +
    SCREEN READER SUPPORT
          =
    ACCESSIBLE FORM

---

# Головне

> **Доступна форма — це не просто форма з ARIA.**

Хороша доступна форма починається з правильного HTML:

    <form>
        <label>
        <input>
        <fieldset>
        <legend>
        <button>
    </form>

Потім додаються:

    required
    autocomplete
    aria-describedby
    aria-invalid
    focus management
    keyboard support
    validation
    error messages

Найважливіші правила:

1. **Кожне поле повинно мати зрозумілу назву.**
2. **Використовуй `<label>`, а не placeholder замість label.**
3. **Пов'язані поля групуй через `<fieldset>` + `<legend>`.**
4. **Використовуй правильні `input type`.**
5. **Обов'язкові поля позначай `required`.**
6. **Підказки та помилки пов'язуй через `aria-describedby`.**
7. **Неправильні поля можна позначати `aria-invalid="true"`.**
8. **Помилка повинна пояснювати, що саме потрібно виправити.**
9. **Не передавай інформацію тільки через колір.**
10. **Форма повинна працювати з клавіатурою.**
11. **Focus повинен бути завжди видимим.**
12. **Після помилки користувач повинен швидко знайти проблему.**
13. **Використовуй native HTML замість непотрібних custom controls.**
14. **ARIA доповнює HTML, а не замінює його.**
15. **Client-side validation не замінює server-side validation.**
16. **Динамічні повідомлення повинні бути доступними screen reader.**
17. **Accessibility потрібно перевіряти не тільки мишкою, а й клавіатурою та screen reader.**

> **Найкраща accessible form — це проста, семантична HTML-форма, яка має зрозумілі labels, логічний порядок, правильний keyboard behavior, доступні помилки та передбачуваний focus.**