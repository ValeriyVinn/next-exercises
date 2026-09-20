# 04. Validation

## 📌 Що таке Validation

**Validation** — це перевірка даних, які користувач вводить у форму.

Наприклад, перед відправкою форми потрібно перевірити:

- чи заповнене обов'язкове поле;
- чи має email правильний формат;
- чи достатньо довгий пароль;
- чи є число в допустимому діапазоні;
- чи збігаються два паролі;
- чи вибрано необхідну опцію;
- чи відповідає файл певним вимогам.

Типовий процес:

    User input
        ↓
    Validation
        ↓
    Valid?
      ↙   ↘
    YES    NO
     ↓      ↓
    Submit  Show error
     ↓
    Backend
     ↓
    Database

---

# 1. Два рівні validation

У full-stack застосунках потрібно розрізняти:

    Client-side validation
        ↓
    Browser / JavaScript

    Server-side validation
        ↓
    Backend

### Client-side

Перевірка виконується в браузері.

Переваги:

- швидкий feedback;
- користувач одразу бачить помилку;
- немає зайвого запиту на сервер;
- кращий UX.

### Server-side

Перевірка виконується на backend.

Вона обов'язкова, тому що:

> Даним із браузера не можна довіряти.

Користувач може відправити HTTP-запит безпосередньо на API, обійшовши frontend.

Тому:

    Frontend validation
    → UX

    Backend validation
    → захист і коректність даних

---

# 2. HTML validation

HTML уже має вбудовану систему валідації.

Наприклад:

    <input
        type="email"
        name="email"
        required
    >

Браузер перевірить:

    required
    → поле не повинно бути порожнім

    type="email"
    → значення повинно відповідати email-формату

JavaScript для найпростіших перевірок не потрібен.

---

# 3. `required`

Атрибут:

    required

робить поле обов'язковим.

### Приклад

    <input
        type="text"
        name="username"
        required
    >

Якщо користувач залишить поле порожнім, браузер не дозволить стандартну відправку форми.

---

# 4. `required` для різних полів

### Text

    <input
        type="text"
        name="username"
        required
    >

### Email

    <input
        type="email"
        name="email"
        required
    >

### Password

    <input
        type="password"
        name="password"
        required
    >

### Number

    <input
        type="number"
        name="age"
        required
    >

### Select

    <select name="country" required>
        <option value="">Choose country</option>
        <option value="ua">Ukraine</option>
        <option value="pl">Poland</option>
    </select>

---

# 5. `minlength`

Визначає мінімальну довжину текстового значення.

### Приклад

    <input
        type="text"
        name="username"
        minlength="3"
    >

Наприклад:

    "Al"
    → invalid

    "Alex"
    → valid

---

# 6. `maxlength`

Визначає максимальну довжину.

### Приклад

    <input
        type="text"
        name="username"
        maxlength="20"
    >

Якщо значення перевищує дозволену довжину, поле не проходить constraint validation.

---

# 7. `min` та `max`

Для числових значень можна встановити діапазон.

### Приклад

    <input
        type="number"
        name="age"
        min="18"
        max="100"
    >

Тоді:

    17
    → invalid

    18
    → valid

    56
    → valid

    100
    → valid

    101
    → invalid

---

# 8. `step`

`step` визначає допустимий крок числового значення.

### Приклад

    <input
        type="number"
        name="price"
        min="0"
        step="0.01"
    >

Допустимі значення:

    10
    10.01
    10.02
    10.03

---

# 9. `type="email"`

HTML може перевіряти базовий формат email.

### Приклад

    <input
        type="email"
        name="email"
    >

Наприклад:

    user@example.com
    → valid

    hello
    → invalid

Важливо:

> Перевірка браузера не означає, що email реально існує.

Browser перевіряє формат, а не існування поштової скриньки.

---

# 10. `type="url"`

Для URL:

    <input
        type="url"
        name="website"
    >

Браузер перевіряє, чи значення відповідає базовому формату URL.

Наприклад:

    https://example.com
    → valid

---

# 11. `pattern`

`pattern` дозволяє задати регулярний вираз для validation.

### Приклад

    <input
        type="text"
        name="username"
        pattern="[A-Za-z0-9]+"
    >

Тут дозволяються:

    A-Z
    a-z
    0-9

Наприклад:

    Valeriy123
    → valid

    Valeriy!
    → invalid

`pattern` використовує регулярні вирази.

Тому перед використанням потрібно розуміти:

    Regular Expressions

---

# 12. `pattern` і `title`

Можна додати підказку:

    <input
        type="text"
        name="username"
        pattern="[A-Za-z0-9]+"
        title="Only letters and numbers are allowed"
    >

`title` може допомогти пояснити користувачу вимогу.

Але для хорошого UX краще показувати власне повідомлення про помилку поруч із полем.

---

# 13. HTML validation — перший рівень

Можна створити досить багато validation без JavaScript:

    <form>
        <input
            type="text"
            name="username"
            required
            minlength="3"
            maxlength="20"
        >

        <input
            type="email"
            name="email"
            required
        >

        <input
            type="number"
            name="age"
            required
            min="18"
            max="100"
        >

        <button type="submit">
            Register
        </button>
    </form>

Браузер уже виконає базову перевірку.

---

# 14. Constraint Validation API

JavaScript має спеціальний API для роботи з HTML validation:

    Constraint Validation API

Він дозволяє:

- перевірити validity;
- запустити validation;
- отримати конкретну помилку;
- встановити власну помилку;
- перевірити окреме поле;
- перевірити всю форму.

Основні методи та властивості:

    checkValidity()
    reportValidity()
    setCustomValidity()
    validity
    validationMessage
    willValidate

---

# 15. `checkValidity()`

Метод:

    checkValidity()

перевіряє, чи проходить елемент validation.

### Приклад

    const input = document.querySelector("#username");

    if (input.checkValidity()) {
        console.log("Valid");
    } else {
        console.log("Invalid");
    }

Результат:

    true
    або
    false

---

# 16. `checkValidity()` для форми

Можна перевірити всю форму:

    const form = document.querySelector("#userForm");

    if (form.checkValidity()) {
        console.log("Form is valid");
    } else {
        console.log("Form is invalid");
    }

`checkValidity()`:

- повертає `true` або `false`;
- запускає `invalid` events для невалідних контролів;
- не показує браузерний popup-підказувач сам по собі.

---

# 17. `reportValidity()`

Метод:

    reportValidity()

перевіряє validation і дозволяє браузеру показати стандартне повідомлення про помилку.

### Приклад

    const form = document.querySelector("#userForm");

    form.reportValidity();

Якщо форма невалідна, браузер покаже стандартний UI validation.

Різниця:

    checkValidity()
    → перевірити

    reportValidity()
    → перевірити + показати стандартний feedback

---

# 18. `validity`

У кожного form control є властивість:

    validity

Вона містить інформацію про стан validation.

### Приклад

    const input = document.querySelector("#username");

    console.log(input.validity);

Це об'єкт:

    ValidityState

---

# 19. Основні властивості `ValidityState`

Найважливіші:

    valueMissing
    typeMismatch
    tooShort
    tooLong
    rangeUnderflow
    rangeOverflow
    stepMismatch
    patternMismatch
    badInput
    customError
    valid

---

# 20. `valueMissing`

Показує, що поле з `required` залишилось порожнім.

### HTML

    <input
        id="username"
        name="username"
        required
    >

### JavaScript

    const input = document.querySelector("#username");

    console.log(input.validity.valueMissing);

Якщо поле порожнє:

    true

Якщо заповнене:

    false

---

# 21. `typeMismatch`

Показує проблему з типом значення.

Наприклад:

    <input
        type="email"
        id="email"
    >

Якщо введено:

    hello

можна перевірити:

    input.validity.typeMismatch

Результат:

    true

---

# 22. `tooShort`

Перевіряє `minlength`.

### HTML

    <input
        id="username"
        minlength="3"
    >

Якщо введено:

    Al

то:

    input.validity.tooShort

може бути:

    true

---

# 23. `tooLong`

Перевіряє `maxlength`.

### HTML

    <input
        maxlength="10"
    >

Якщо значення перевищує допустиму довжину:

    input.validity.tooLong

може бути:

    true

---

# 24. `rangeUnderflow`

Перевіряє `min`.

### HTML

    <input
        type="number"
        min="18"
    >

Якщо введено:

    17

то:

    input.validity.rangeUnderflow

дасть:

    true

---

# 25. `rangeOverflow`

Перевіряє `max`.

### HTML

    <input
        type="number"
        max="100"
    >

Якщо введено:

    101

то:

    input.validity.rangeOverflow

дасть:

    true

---

# 26. `stepMismatch`

Перевіряє `step`.

### Приклад

    <input
        type="number"
        min="0"
        step="5"
    >

Допустимі значення:

    0
    5
    10
    15
    20

Наприклад:

    7

може дати:

    input.validity.stepMismatch
    → true

---

# 27. `patternMismatch`

Перевіряє `pattern`.

### HTML

    <input
        id="username"
        pattern="[A-Za-z]+"
    >

Якщо введено:

    Valeriy123

то:

    input.validity.patternMismatch

буде:

    true

---

# 28. `customError`

Показує, що для елемента встановлена власна validation error через:

    setCustomValidity()

Наприклад:

    input.setCustomValidity("Username is already taken");

Тоді:

    input.validity.customError

буде:

    true

---

# 29. `valid`

Найзручніша загальна перевірка:

    input.validity.valid

Наприклад:

    if (input.validity.valid) {
        console.log("Valid");
    }

Або:

    if (!input.validity.valid) {
        console.log("Invalid");
    }

---

# 30. `validationMessage`

Можна отримати повідомлення validation:

    const input = document.querySelector("#email");

    console.log(input.validationMessage);

Браузер може повернути повідомлення на кшталт:

    Please fill out this field.

або повідомлення про неправильний email.

Це повідомлення залежить від браузера та локалізації.

---

# 31. `setCustomValidity()`

Це один із найважливіших методів для JavaScript validation.

Синтаксис:

    input.setCustomValidity(message);

### Встановити помилку

    input.setCustomValidity("Username is already taken");

Тепер поле невалідне.

### Прибрати помилку

    input.setCustomValidity("");

Порожній рядок означає:

    custom error = none

---

# 32. Дуже важливе правило `setCustomValidity()`

Якщо встановили:

    input.setCustomValidity("Some error");

потрібно не забути скинути:

    input.setCustomValidity("");

коли помилка більше не актуальна.

Інакше поле залишиться невалідним.

---

# 33. Приклад custom validation

### HTML

    <input
        id="username"
        name="username"
        required
    >

### JavaScript

    const input = document.querySelector("#username");

    input.addEventListener("input", () => {
        if (input.value === "admin") {
            input.setCustomValidity("This username is reserved.");
        } else {
            input.setCustomValidity("");
        }
    });

Тепер:

    admin
    → invalid

    valeriy
    → valid

---

# 34. Cross-field validation

Іноді потрібно порівняти два поля.

Наприклад:

    password
    confirmPassword

HTML:

    <input
        type="password"
        id="password"
        name="password"
        required
    >

    <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        required
    >

Потрібно перевірити:

    password === confirmPassword

---

# 35. Приклад перевірки двох паролів

    const password = document.querySelector("#password");
    const confirmPassword = document.querySelector("#confirmPassword");

    confirmPassword.addEventListener("input", () => {
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity("Passwords do not match.");
        } else {
            confirmPassword.setCustomValidity("");
        }
    });

Тут використовується:

    setCustomValidity()

для validation, яке неможливо описати простим HTML-атрибутом.

---

# 36. `invalid` event

Існує подія:

    invalid

Вона виникає, коли form control не проходить constraint validation.

### Приклад

    const input = document.querySelector("#email");

    input.addEventListener("invalid", () => {
        console.log("Invalid input");
    });

---

# 37. `invalid` vs `submit`

Не плутати:

    invalid
    → конкретне поле не пройшло validation

    submit
    → форма успішно пройшла constraint validation і запускається submit event

Важлива послідовність:

    User submits form
        ↓
    Browser validation
        ↓
    INVALID?
      ↙     ↘
    YES      NO
     ↓        ↓
    invalid   submit
    event     event
     ↓        ↓
    stop     handler

Тобто при стандартному browser validation `submit` event не відбувається, якщо форма не проходить constraint validation.

---

# 38. `novalidate`

Атрибут:

    novalidate

вимикає автоматичну constraint validation форми під час стандартної submit-операції.

### Приклад

    <form
        id="userForm"
        novalidate
    >

Тепер браузер не буде блокувати submit через стандартну HTML validation.

Це часто використовують, коли validation повністю контролюється JavaScript.

---

# 39. `formNoValidate`

Для конкретної submit-кнопки можна вимкнути validation:

    <button
        type="submit"
        formnovalidate
    >
        Save draft
    </button>

Наприклад:

    <button type="submit">
        Publish
    </button>

    <button
        type="submit"
        formnovalidate
    >
        Save draft
    </button>

Логіка:

    Publish
    → validation

    Save draft
    → без browser validation

---

# 40. `willValidate`

Властивість:

    willValidate

показує, чи бере елемент участь у constraint validation.

### Приклад

    console.log(input.willValidate);

Результат:

    true
    або
    false

Наприклад, disabled control не бере участі в validation.

---

# 41. CSS: `:valid`

CSS має псевдоклас:

    :valid

Наприклад:

    input:valid {
        border: 2px solid green;
    }

Він застосовується, коли елемент проходить constraint validation.

---

# 42. CSS: `:invalid`

Псевдоклас:

    :invalid

можна використати для невалідних полів.

    input:invalid {
        border: 2px solid red;
    }

Це дозволяє створити простий visual feedback без JavaScript.

---

# 43. `:required`

Показує required-поля:

    input:required {
        border-left: 4px solid orange;
    }

---

# 44. `:optional`

Для необов'язкових полів:

    input:optional {
        opacity: 0.9;
    }

---

# 45. Практичний CSS validation

### HTML

    <input
        type="email"
        name="email"
        required
    >

### CSS

    input:valid {
        border: 2px solid green;
    }

    input:invalid {
        border: 2px solid red;
    }

Браузер автоматично змінюватиме стан залежно від validation.

---

# 46. Обережно з `:invalid`

Якщо застосувати:

    input:invalid {
        border: 2px solid red;
    }

до всієї форми, порожні `required` поля можуть бути червоними ще до того, як користувач щось вводив.

Для кращого UX часто використовують окрему логіку:

    user interacted
        ↓
    validation feedback

Тобто не обов'язково показувати помилку одразу після відкриття сторінки.

---

# 47. `:user-invalid`

Сучасні браузери також підтримують:

    :user-invalid

Він дозволяє стилізувати поле, коли воно стало невалідним у результаті взаємодії користувача.

Приклад:

    input:user-invalid {
        border: 2px solid red;
    }

Підтримка браузерами може відрізнятися, тому для production UI потрібно перевіряти browser compatibility.

---

# 48. Власні повідомлення про помилки

Замість того щоб покладатися тільки на браузерний UI, можна створити:

    <p id="emailError"></p>

та показувати власне повідомлення.

### HTML

    <label>
        Email
        <input
            id="email"
            name="email"
            type="email"
            required
        >
    </label>

    <p id="emailError"></p>

### JavaScript

    const email = document.querySelector("#email");
    const emailError = document.querySelector("#emailError");

    email.addEventListener("input", () => {
        if (email.validity.valueMissing) {
            emailError.textContent = "Email is required.";
        } else if (email.validity.typeMismatch) {
            emailError.textContent = "Enter a valid email.";
        } else {
            emailError.textContent = "";
        }
    });

---

# 49. `aria-invalid`

Для accessibility можна повідомити assistive technology, що поле невалідне:

    <input
        id="email"
        aria-invalid="true"
    >

Коли помилки немає:

    aria-invalid="false"

Або атрибут можна оновлювати JavaScript.

---

# 50. Повідомлення про помилки та accessibility

Якщо створюємо власні повідомлення:

    <p id="emailError">
        Enter a valid email.
    </p>

можна пов'язати його з полем:

    <input
        id="email"
        aria-describedby="emailError"
    >

Тоді assistive technology може зрозуміти, де знаходиться опис помилки.

---

# 51. Повний приклад HTML validation

### HTML

    <form id="registerForm">
        <label>
            Username
            <input
                type="text"
                name="username"
                required
                minlength="3"
                maxlength="20"
            >
        </label>

        <label>
            Email
            <input
                type="email"
                name="email"
                required
            >
        </label>

        <label>
            Age
            <input
                type="number"
                name="age"
                required
                min="18"
                max="100"
            >
        </label>

        <button type="submit">
            Register
        </button>
    </form>

---

# 52. HTML validation + submit

    const form = document.querySelector("#registerForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        console.log("Form is valid");
    });

Браузер спочатку виконає constraint validation.

Якщо validation пройдена:

    submit event
        ↓
    JavaScript handler

Якщо validation не пройдена:

    submit event
    ↓
    не запускається

---

# 53. Власна JavaScript validation

Іноді потрібно повністю контролювати validation.

Наприклад:

    <form
        id="registerForm"
        novalidate
    >

    ...

Тепер JavaScript може сам перевіряти дані.

### Приклад

    const form = document.querySelector("#registerForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = form.elements.username.value.trim();
        const email = form.elements.email.value.trim();

        if (!username) {
            console.log("Username is required.");
            return;
        }

        if (!email) {
            console.log("Email is required.");
            return;
        }

        console.log("Form is valid");
    });

---

# 54. HTML validation vs JavaScript validation

### HTML

    required
    minlength
    maxlength
    min
    max
    step
    pattern
    type

Плюси:

- просто;
- стандартно;
- працює без JavaScript;
- браузер уже має validation UI.

### JavaScript

Потрібен для:

- складних правил;
- перевірки кількох полів;
- custom messages;
- залежностей між полями;
- перевірки даних через API.

---

# 55. Не треба дублювати все без причини

Поганий підхід:

    HTML:
    required

    JavaScript:
    if (value === "") ...

    ще одна перевірка:
    if (!value.trim()) ...

Якщо HTML уже чудово вирішує просте правило, не обов'язково дублювати його.

Краще:

    HTML constraints
        +
    JavaScript для складної логіки

---

# 56. Коли потрібен JavaScript

Наприклад:

    username
        ↓
    перевірити формат

    password
        ↓
    мінімальна довжина

    confirmPassword
        ↓
    повинен збігатися з password

Тут:

    password === confirmPassword

не можна повністю описати простим `required` або `minlength`.

Тому потрібен JavaScript.

---

# 57. Validation через `submit`

Один із базових шаблонів:

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            return;
        }

        // form is valid
    });

Але якщо форма не має `novalidate`, браузер уже виконує constraint validation перед `submit`.

Тому в реальному коді не потрібно бездумно дублювати одну й ту саму перевірку.

---

# 58. `checkValidity()` перед fetch

Практичний сценарій:

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);

        // fetch(...)
    });

Логіка:

    submit
      ↓
    checkValidity()
      ↓
    invalid?
      ↓
    reportValidity()
      ↓
    stop

або:

    valid
      ↓
    FormData
      ↓
    fetch

---

# 59. `requestSubmit()` і validation

Якщо потрібно програмно запустити нормальний процес submit, використовується:

    form.requestSubmit();

Він поводиться подібно до натискання submit-кнопки:

    validation
        ↓
    submit event

На відміну від:

    form.submit();

який обходить constraint validation та не викликає `submit` event.

---

# 60. `form.submit()` vs `form.requestSubmit()`

### `form.submit()`

    form.submit();

Не:

    запускає submit event

і не:

    запускає constraint validation

### `form.requestSubmit()`

    form.requestSubmit();

Запускає звичайний submit-процес:

    constraint validation
        ↓
    submit event

Це важлива відмінність для JavaScript.

---

# 61. Валідація під час `input`

Можна перевіряти поле під час введення:

    input.addEventListener("input", () => {
        console.log(input.validity.valid);
    });

Подія:

    input

спрацьовує при зміні значення користувачем.

Це зручно для:

- live validation;
- показу помилок;
- password strength;
- character counter.

---

# 62. `input` vs `change` vs `submit`

Не плутати:

    input
    → значення змінюється під час введення

    change
    → значення змінилося і control завершив відповідну взаємодію

    submit
    → користувач намагається відправити форму

    invalid
    → конкретне поле не проходить constraint validation

---

# 63. Live validation

Приклад:

    const username = document.querySelector("#username");

    username.addEventListener("input", () => {
        if (username.value.length < 3) {
            console.log("Too short");
        } else {
            console.log("Valid length");
        }
    });

Користувач вводить:

    A
    ↓
    Too short

    Al
    ↓
    Too short

    Ale
    ↓
    Valid length

---

# 64. `trim()`

Для текстових полів часто потрібно прибирати пробіли:

    const username = input.value.trim();

Наприклад:

    "   Valeriy   "

перетвориться на:

    "Valeriy"

А:

    "     "

перетвориться на:

    ""

Це важливо при перевірці обов'язкових текстових полів.

---

# 65. Не використовувати лише `value.length`

Наприклад:

    if (input.value.length === 0) {
        ...
    }

Якщо користувач ввів:

    "     "

довжина не дорівнює `0`.

Тому для тексту часто краще:

    if (input.value.trim() === "") {
        ...
    }

---

# 66. Validation email

Базовий варіант:

    <input
        type="email"
        name="email"
        required
    >

Не потрібно одразу писати складний regex.

HTML уже має стандартну перевірку email-формату.

JavaScript потрібен, якщо потрібні додаткові правила.

---

# 67. Validation password

Наприклад:

    <input
        type="password"
        name="password"
        minlength="8"
        required
    >

HTML вже перевіряє:

    required
    minlength

А JavaScript може додатково перевірити:

    password === confirmPassword

або складніші правила.

---

# 68. Validation password confirmation

Типовий шаблон:

    const password = document.querySelector("#password");
    const confirmPassword = document.querySelector("#confirmPassword");

    confirmPassword.addEventListener("input", () => {
        const isMatch =
            password.value === confirmPassword.value;

        confirmPassword.setCustomValidity(
            isMatch ? "" : "Passwords do not match."
        );
    });

---

# 69. Validation числа

HTML:

    <input
        type="number"
        name="age"
        min="18"
        max="100"
        required
    >

JavaScript:

    const age = Number(input.value);

    if (age < 18) {
        console.log("Too young");
    }

Але для базового діапазону краще спочатку використати:

    min
    max

---

# 70. Validation у full-stack

Frontend:

    required
    minlength
    type="email"
    min
    max
    pattern
    custom JavaScript rules

        ↓

    API request

        ↓

Backend:

    schema validation
    type validation
    business rules
    authorization checks

        ↓

    Database

Ніколи не потрібно покладатися лише на frontend validation.

---

# 71. Приклад: username

Frontend:

    <input
        name="username"
        required
        minlength="3"
        maxlength="30"
    >

Backend повинен додатково перевірити:

    username exists?
    username allowed?
    username unique?
    username valid?
    database constraints?

Frontend:

    UX

Backend:

    actual trust boundary

---

# 72. Validation не є security

Це дуже важливо.

Навіть якщо HTML містить:

    <input
        type="number"
        min="18"
        max="100"
    >

зловмисник може вручну відправити:

    age = 5

без використання вашого HTML.

Тому backend повинен сам перевірити:

    age >= 18
    age <= 100

Frontend validation не захищає API.

---

# 73. Validation та SQL

Наприклад:

    username
    email
    age

Frontend перевіряє:

    required
    format
    length

Backend перевіряє:

    types
    business rules
    authorization

Database забезпечує:

    NOT NULL
    UNIQUE
    CHECK
    FOREIGN KEY

Отже validation може існувати на декількох рівнях:

    UI
    ↓
    Frontend
    ↓
    Backend
    ↓
    Database

---

# 74. Validation + PostgreSQL

Наприклад, backend отримав:

    age = 56

Backend повинен:

    1. отримати дані;
    2. перевірити тип;
    3. перевірити допустимий діапазон;
    4. перевірити бізнес-правила;
    5. записати в PostgreSQL.

Frontend validation не повинна бути єдиною перевіркою.

---

# 75. Повний практичний приклад

### HTML

    <form id="registerForm">
        <label>
            Username

            <input
                id="username"
                name="username"
                type="text"
                required
                minlength="3"
                maxlength="20"
            >
        </label>

        <label>
            Email

            <input
                id="email"
                name="email"
                type="email"
                required
            >
        </label>

        <label>
            Password

            <input
                id="password"
                name="password"
                type="password"
                required
                minlength="8"
            >
        </label>

        <label>
            Confirm password

            <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
            >
        </label>

        <button type="submit">
            Register
        </button>
    </form>

---

# 76. JavaScript validation

    const form = document.querySelector("#registerForm");

    const password = document.querySelector("#password");
    const confirmPassword =
        document.querySelector("#confirmPassword");

    confirmPassword.addEventListener("input", () => {
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity(
                "Passwords do not match."
            );
        } else {
            confirmPassword.setCustomValidity("");
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        console.log("Form is valid");

        for (const [name, value] of formData) {
            console.log(name, value);
        }
    });

---

# 77. Що відбувається в цьому прикладі

### Username

    required
    minlength
    maxlength

### Email

    required
    type="email"

### Password

    required
    minlength

### Confirm password

    required
    custom validation

Тобто:

    HTML constraints
        +
    JavaScript custom validation

---

# 78. Validation flow

Для звичайної форми:

    User fills form
        ↓
    User clicks Submit
        ↓
    Browser runs constraint validation
        ↓
    Is form valid?
       ↙      ↘
     NO        YES
      ↓         ↓
    invalid    submit
    feedback   event
                ↓
          JavaScript handler
                ↓
             FormData
                ↓
              fetch
                ↓
             Backend

---

# 79. Найважливіші HTML validation attributes

| Attribute | Призначення |
|---|---|
| `required` | значення обов'язкове |
| `minlength` | мінімальна довжина |
| `maxlength` | максимальна довжина |
| `min` | мінімальне число |
| `max` | максимальне число |
| `step` | допустимий крок |
| `pattern` | регулярний вираз |
| `type` | базова перевірка типу |
| `novalidate` | вимкнути native validation форми |
| `formnovalidate` | вимкнути validation для конкретного submit |

---

# 80. Найважливіші методи

    checkValidity()
    → перевірити validity

    reportValidity()
    → перевірити та показати стандартний feedback

    setCustomValidity()
    → встановити власну помилку

    requestSubmit()
    → запустити нормальний submit-процес

---

# 81. Найважливіші властивості

    validity
    → стан validation

    validationMessage
    → повідомлення про помилку

    willValidate
    → чи бере елемент участь у validation

    validity.valid
    → загальний результат

---

# 82. `ValidityState` — міні-шпаргалка

    input.validity.valueMissing
    → required + empty

    input.validity.typeMismatch
    → неправильний тип

    input.validity.tooShort
    → minlength

    input.validity.tooLong
    → maxlength

    input.validity.rangeUnderflow
    → нижче min

    input.validity.rangeOverflow
    → вище max

    input.validity.stepMismatch
    → неправильний step

    input.validity.patternMismatch
    → не відповідає pattern

    input.validity.badInput
    → browser не зміг коректно перетворити введене значення

    input.validity.customError
    → встановлена custom error

    input.validity.valid
    → все valid

---

# 83. Часті помилки

## ❌ Помилка 1 — довіряти тільки frontend validation

Неправильно:

    frontend validation
        ↓
    database

Правильно:

    frontend validation
        ↓
    backend validation
        ↓
    database

---

## ❌ Помилка 2 — складний regex для всього

Не потрібно одразу створювати складний regex для email, username тощо.

Спочатку використовуйте:

    required
    type
    minlength
    maxlength
    min
    max
    pattern

І лише потім додавайте JavaScript/regex, якщо справді потрібно.

---

## ❌ Помилка 3 — не очищати `setCustomValidity()`

Неправильно:

    input.setCustomValidity("Error");

і більше ніколи не скидати помилку.

Правильно:

    if (hasError) {
        input.setCustomValidity("Error");
    } else {
        input.setCustomValidity("");
    }

---

## ❌ Помилка 4 — плутати `checkValidity()` і `reportValidity()`

    checkValidity()
    → перевірити

    reportValidity()
    → перевірити + показати browser feedback

---

## ❌ Помилка 5 — перевіряти тільки на submit

Для складних форм користувачу часто корисніше отримати feedback раніше:

    input
    ↓
    validation
    ↓
    feedback

Але не потрібно показувати всі помилки одразу після відкриття форми.

---

## ❌ Помилка 6 — використовувати `form.submit()` замість `requestSubmit()`

Якщо потрібно запустити нормальний submit flow:

    form.requestSubmit();

а не:

    form.submit();

Бо `submit()` обходить `submit` event і constraint validation.

---

## ❌ Помилка 7 — вважати `type="number"` достатньою перевіркою

Наприклад:

    <input type="number">

не означає:

    число в допустимому бізнес-діапазоні

Якщо потрібно:

    18–100

краще:

    min="18"
    max="100"

А backend все одно повинен перевірити це повторно.

---

# 84. Практичні вправи

## 🟢 Рівень 1 — Required

Створи форму:

    username
    email
    submit

Зроби:

    username → required
    email → required

Перевір роботу native browser validation.

---

## 🟢 Рівень 2 — Email

Створи:

    <input
        type="email"
        required
    >

Перевір:

    user@example.com
    hello
    test@
    @example.com

Подивись, як браузер реагує.

---

## 🟢 Рівень 3 — Password

Створи:

    password

з:

    required
    minlength="8"

Перевір різні значення.

---

## 🟡 Рівень 4 — Age

Створи:

    age

з:

    type="number"
    min="18"
    max="100"

Перевір:

    17
    18
    56
    100
    101

---

## 🟡 Рівень 5 — Pattern

Створи username:

    required
    minlength="3"
    pattern="[A-Za-z0-9]+"

Перевір:

    Alex
    Alex123
    Alex!
    Alex 123

---

## 🟡 Рівень 6 — ValidityState

Для email виводь:

    input.validity

Потім окремо:

    valueMissing
    typeMismatch
    valid

---

## 🟠 Рівень 7 — Custom validation

Створи:

    password
    confirmPassword

Перевір через:

    setCustomValidity()

умову:

    password === confirmPassword

---

## 🟠 Рівень 8 — Custom error UI

Створи:

    input
    error message

Наприклад:

    Email is required.
    Invalid email.
    Password is too short.
    Passwords do not match.

Не використовуй тільки browser popup — зроби власний UI.

---

## 🔴 Рівень 9 — Registration form

Створи повну форму:

    username
    email
    password
    confirmPassword
    age
    submit

Використай:

    required
    minlength
    maxlength
    min
    max
    type="email"
    setCustomValidity()
    FormData

---

## 🔴 Рівень 10 — Full-stack validation

Зроби:

    HTML
        ↓
    FormData
        ↓
    fetch()
        ↓
    Node.js
        ↓
    validation
        ↓
    PostgreSQL

Frontend перевіряє UX.

Backend повторно перевіряє всі критичні дані.

---

# 85. Навчальний маршрут

### Core

Потрібно знати:

    required
    type
    minlength
    maxlength
    min
    max
    step
    pattern

---

### Junior

Потрібно знати:

    checkValidity()
    reportValidity()
    validity
    validationMessage
    setCustomValidity()
    invalid
    novalidate
    :valid
    :invalid
    input event
    custom validation

---

### Junior+

Потрібно розуміти:

    ValidityState
    valueMissing
    typeMismatch
    tooShort
    tooLong
    rangeUnderflow
    rangeOverflow
    stepMismatch
    patternMismatch
    customError
    willValidate
    requestSubmit()
    form.submit()

---

### Middle

Розуміти:

    client validation
        ↓
    API validation
        ↓
    backend validation
        ↓
    database constraints

Також:

    accessibility
    aria-invalid
    aria-describedby
    custom error UI
    cross-field validation
    async validation
    API-based validation
    error handling

---

### Senior

Глибше розуміти:

    validation architecture
    schema validation
    API contracts
    server-side validation
    database constraints
    authorization
    security boundaries
    CSRF
    XSS
    file validation
    async validation
    race conditions
    validation UX
    accessibility
    reusable validation systems

---

# 86. Міні-шпаргалка

    <input
        type="text"
        required
        minlength="3"
        maxlength="20"
    >

    <input
        type="email"
        required
    >

    <input
        type="number"
        min="18"
        max="100"
        step="1"
    >

    <input
        type="text"
        pattern="[A-Za-z0-9]+"
    >

JavaScript:

    input.checkValidity();

    input.reportValidity();

    input.validity.valid;

    input.validationMessage;

    input.setCustomValidity("Error");

    input.setCustomValidity("");

Form:

    form.checkValidity();

    form.reportValidity();

    form.requestSubmit();

CSS:

    input:valid {
        ...
    }

    input:invalid {
        ...
    }

---

# 87. Головний шаблон validation

    const form = document.querySelector("#userForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);

        // valid data
        // fetch(...)
    });

Для стандартної HTML validation частину цієї логіки можна спростити, оскільки браузер уже перевіряє форму до `submit`.

---

# 88. Головна архітектура

У простому frontend:

    HTML
    ↓
    native validation
    ↓
    JavaScript custom validation
    ↓
    FormData
    ↓
    fetch
    ↓
    Backend validation
    ↓
    Database

Не потрібно сприймати validation як одну перевірку.

Це система перевірок на різних рівнях.

---

# 89. 🔑 Головне

> `required` робить поле обов'язковим.

> `minlength` та `maxlength` контролюють довжину тексту.

> `min`, `max` та `step` контролюють числові значення.

> `type="email"` та `type="url"` дають браузеру базову перевірку формату.

> `pattern` дозволяє використовувати регулярний вираз.

> `checkValidity()` перевіряє validation.

> `reportValidity()` перевіряє validation і дозволяє браузеру показати стандартний feedback.

> `validity` містить детальний стан validation.

> `validationMessage` містить повідомлення про помилку.

> `setCustomValidity()` дозволяє створити власне правило validation.

> Щоб скасувати custom error, потрібно викликати `setCustomValidity("")`.

> `invalid` повідомляє про те, що конкретний control не пройшов validation.

> `novalidate` вимикає native constraint validation форми під час стандартної submit-операції.

> `formnovalidate` може вимкнути validation для конкретної submit-кнопки.

> `:valid` і `:invalid` дозволяють стилізувати стан полів через CSS.

> `input` зручний для live validation.

> `trim()` важливий для перевірки текстових значень, де пробіли не повинні вважатися реальним введенням.

> `requestSubmit()` запускає нормальний submit flow.

> `form.submit()` обходить `submit` event і constraint validation.

> Client-side validation покращує UX, але не є захистом.

> Backend validation обов'язкова для даних, які приходять від клієнта.

> Database constraints можуть бути ще одним рівнем гарантії цілісності даних.

Головний full-stack принцип:

    Client validation
        ↓
    UX

    Server validation
        ↓
    Trust boundary

    Database constraints
        ↓
    Data integrity

---

# 📚 Зв'язок із попередніми темами

    07-working-with-forms
    │
    ├── 01-input-data
    │       ↓
    │   отримання значень полів
    │
    ├── 02-form-submit
    │       ↓
    │   submit event
    │   preventDefault()
    │
    ├── 03-formdata
    │       ↓
    │   збір даних форми
    │
    ├── 04-validation          ← зараз
    │       ↓
    │   перевірка даних
    │
    ├── 05-checkbox-radio-select
    │       ↓
    │   спеціальні form controls
    │
    ├── 06-file-input
    │       ↓
    │   файли та upload
    │
    └── 07-form-project
            ↓
        повна форма

Логічний практичний ланцюжок:

    INPUT
      ↓
    SUBMIT
      ↓
    VALIDATION
      ↓
    FormData
      ↓
    FETCH
      ↓
    BACKEND
      ↓
    DATABASE