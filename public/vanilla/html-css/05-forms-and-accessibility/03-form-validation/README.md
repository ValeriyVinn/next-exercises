# 03. Form Validation

## Зміст

1. [Що таке Form Validation](#що-таке-form-validation)
2. [Навіщо потрібна валідація](#навіщо-потрібна-валідація)
3. [Client-side та Server-side validation](#client-side-та-server-side-validation)
4. [Constraint Validation API](#constraint-validation-api)
5. [Основні HTML-атрибути валідації](#основні-html-атрибути-валідації)
6. [required](#required)
7. [type](#type)
8. [min та max](#min-та-max)
9. [minlength та maxlength](#minlength-та-maxlength)
10. [pattern](#pattern)
11. [step](#step)
12. [accept](#accept)
13. [Валідація email](#валідація-email)
14. [Валідація чисел](#валідація-чисел)
15. [Валідація дат і часу](#валідація-дат-и-часу)
16. [Checkbox та Radio](#checkbox-та-radio)
17. [Select validation](#select-validation)
18. [Textarea validation](#textarea-validation)
19. [Власні повідомлення про помилки](#власні-повідомлення-про-помилки)
20. [novalidate та formnovalidate](#novalidate-та-formnovalidate)
21. [:valid та :invalid](#valid-та-invalid)
22. [:user-valid та :user-invalid](#user-valid-та-user-invalid)
23. [:required та :optional](#required-та-optional)
24. [Constraint Validation API у JavaScript](#constraint-validation-api-у-javascript)
25. [checkValidity()](#checkvalidity)
26. [reportValidity()](#reportvalidity)
27. [validity](#validity)
28. [validationMessage](#validationmessage)
29. [setCustomValidity()](#setcustomvalidity)
30. [willValidate](#willvalidate)
31. [Подія invalid](#подія-invalid)
32. [Подія submit](#подія-submit)
33. [FormData та валідація](#formdata-та-валідація)
34. [Валідація кількох полів](#валідація-кількох-полів)
35. [Залежна валідація полів](#залежна-валідація-полів)
36. [Валідація password та confirm password](#валідація-password-та-confirm-password)
37. [Валідація checkbox group](#валідація-checkbox-group)
38. [Валідація файлів](#валідація-файлів)
39. [Коли використовувати HTML, CSS та JavaScript](#коли-використовувати-html-css-та-javascript)
40. [Типові помилки](#типові-помилки)
41. [Accessibility та validation](#accessibility-та-validation)
42. [Security: validation ≠ security](#security-validation--security)
43. [Практичний приклад](#практичний-приклад)
44. [Що потрібно пам'ятати](#що-потрібно-памятати)
45. [Питання для співбесіди](#питання-для-співбесіди)
46. [Рівні знань](#рівні-знань)
47. [Міні-шпаргалка](#міні-шпаргалка)
48. [Головне](#головне)


# Що таке Form Validation

**Form Validation** — це перевірка даних, які користувач вводить у форму, перед їх відправленням або обробкою.

Наприклад, форма реєстрації може перевіряти:

- чи заповнене ім'я;
- чи має email правильний формат;
- чи достатньо довгий пароль;
- чи збігаються два паролі;
- чи знаходиться число в допустимому діапазоні;
- чи вибраний checkbox;
- чи вибраний файл правильного типу;
- чи відповідає значення заданому шаблону.

Проста форма:

    <form>
        <label for="email">Email</label>

        <input
            id="email"
            name="email"
            type="email"
            required
        >

        <button type="submit">Send</button>
    </form>

Браузер уже сам перевірить:

- чи введене значення;
- чи не порожнє поле;
- чи має значення формат email.

Це називається **native HTML validation** або **built-in constraint validation**.


# Навіщо потрібна валідація

Без валідації користувач може відправити:

    email:
    abc

або:

    age:
    -500

або:

    password:
    1

Валідація допомагає:

- запобігти очевидним помилкам;
- покращити UX;
- показати користувачу, що саме потрібно виправити;
- зменшити кількість неправильних запитів до сервера;
- забезпечити правильний формат даних.

Але важливо:

> Client-side validation не замінює Server-side validation.

Користувач може:

- вимкнути JavaScript;
- змінити HTML;
- відправити HTTP-запит вручну;
- використати DevTools;
- використати Postman;
- написати власний HTTP client.

Тому сервер завжди повинен перевіряти дані повторно.


# Client-side та Server-side validation

## Client-side validation

Відбувається у браузері.

Наприклад:

    <input
        type="email"
        required
    >

Переваги:

- швидка;
- не потребує запиту до сервера;
- хороший UX;
- браузер має готовий механізм перевірки.

Недоліки:

- не є безпекою;
- користувач може її обійти;
- не може повністю перевірити бізнес-правила сервера.


## Server-side validation

Відбувається на сервері.

Наприклад:

    if (!emailIsValid) {
        return response.status(400).json({
            error: "Invalid email"
        });
    }

Сервер повинен перевіряти:

- тип даних;
- формат;
- допустимий діапазон;
- довжину;
- бізнес-правила;
- права доступу;
- унікальність;
- зв'язки між даними.

Наприклад:

    email = "user@example.com"

може бути синтаксично правильним email, але користувач із таким email вже може існувати в database.


# Constraint Validation API

HTML має вбудований механізм валідації, який називається:

**Constraint Validation API**

Він працює разом з такими HTML-атрибутами:

    required
    min
    max
    minlength
    maxlength
    pattern
    step
    type

Наприклад:

    <input
        type="number"
        min="18"
        max="100"
        required
    >

Браузер сам перевіряє constraints.

JavaScript може отримати інформацію про результат:

    input.checkValidity();

    input.validity;

    input.validationMessage;


# Основні HTML-атрибути валідації

| Атрибут | Призначення |
|---|---|
| `required` | значення обов'язкове |
| `type` | визначає тип і базову валідацію |
| `min` | мінімальне значення |
| `max` | максимальне значення |
| `minlength` | мінімальна довжина |
| `maxlength` | максимальна довжина |
| `pattern` | регулярний вираз |
| `step` | допустимий крок |
| `accept` | допустимі типи файлів |
| `multiple` | дозволяє декілька значень |
| `novalidate` | вимикає native validation для форми |
| `formnovalidate` | вимикає validation для конкретної кнопки |

Найважливіші:

    required
    type
    min
    max
    minlength
    maxlength
    pattern
    step


# required

`required` означає:

> Користувач повинен ввести або вибрати значення.

Приклад:

    <input
        type="text"
        name="username"
        required
    >

Якщо поле порожнє, форма не буде успішно відправлена через звичайний submit.

Для email:

    <input
        type="email"
        name="email"
        required
    >

Для checkbox:

    <input
        type="checkbox"
        name="terms"
        required
    >

Тут користувач повинен поставити галочку.


## Boolean attribute

`required` — це **boolean attribute**.

Наявність атрибута означає `true`.

Наприклад:

    <input required>

Це означає:

    required = true

Навіть такий варіант:

    <input required="false">

все одно означає:

    required = true

Тому не потрібно писати:

    required="false"

Щоб вимкнути атрибут, його потрібно прибрати:

    <input>


# type

Атрибут `type` визначає тип `<input>`.

Наприклад:

    <input type="email">

Браузер знає, що значення повинно мати email-подібний формат.

Інші приклади:

    <input type="url">

    <input type="number">

    <input type="date">

    <input type="time">

    <input type="tel">

    <input type="password">

    <input type="checkbox">

    <input type="radio">

Тип може автоматично додавати певні правила валідації.

Наприклад:

    <input
        type="email"
        required
    >

має дві незалежні умови:

1. поле не повинно бути порожнім;
2. значення повинно відповідати email-формату.

`required` не перевіряє формат.

`type="email"` перевіряє формат.


# min та max

`min` і `max` задають допустимий діапазон.

Наприклад:

    <input
        type="number"
        name="age"
        min="18"
        max="100"
    >

Допустимі:

    18
    25
    50
    100

Недопустимі:

    17
    101


## min/max для дат

    <input
        type="date"
        min="2026-01-01"
        max="2026-12-31"
    >

Тепер браузер не дозволяє вибрати дату поза заданим діапазоном.


## min/max для time

    <input
        type="time"
        min="09:00"
        max="18:00"
    >


## min/max не роблять поле required

Це важливий момент.

    <input
        type="number"
        min="18"
        max="100"
    >

Поле все ще може залишатися порожнім.

Якщо значення повинно бути обов'язковим:

    <input
        type="number"
        min="18"
        max="100"
        required
    >

Тобто:

    min/max     → діапазон
    required    → обов'язковість


# minlength та maxlength

Використовуються для текстових значень.

Наприклад:

    <input
        type="text"
        minlength="3"
        maxlength="20"
    >

Значення повинно мати допустиму довжину.

Наприклад:

    ab

занадто коротке.

А:

    abc

вже може бути допустимим.


## Textarea

    <textarea
        name="message"
        minlength="10"
        maxlength="500"
    ></textarea>


## minlength не робить поле required

Наприклад:

    <input
        type="text"
        minlength="5"
    >

Якщо поле порожнє, `minlength` сам по собі не робить його обов'язковим.

Для обов'язкового поля:

    <input
        type="text"
        minlength="5"
        required
    >


# pattern

`pattern` дозволяє задати власний шаблон через регулярний вираз.

Наприклад:

    <input
        type="text"
        name="username"
        pattern="[A-Za-z0-9]{3,20}"
    >

Це означає:

- тільки латинські літери;
- цифри;
- довжина від 3 до 20 символів.

Приклад допустимого:

    user123

Недопустимого:

    user!

Якщо поле повинно бути обов'язковим:

    <input
        type="text"
        name="username"
        pattern="[A-Za-z0-9]{3,20}"
        required
    >


## pattern не робить поле required

Це:

    <input pattern="[0-9]+">

не означає:

    "поле обов'язкове"

Для цього потрібен:

    required


## Практичний приклад

Телефон у простому форматі:

    <input
        type="tel"
        name="phone"
        pattern="[0-9]{10}"
        required
    >

Очікується:

    0671234567

Але:

    067-123-4567

не відповідає такому шаблону.

У реальному проєкті формат телефону потрібно проєктувати під конкретні вимоги, а не механічно використовувати один regex для всіх країн.


# step не для всіх типів

`step` визначає допустимий крок значення.

Наприклад:

    <input
        type="number"
        min="0"
        max="100"
        step="10"
    >

Допустимі значення:

    0
    10
    20
    30
    ...
    100

А:

    15

буде недопустимим через `stepMismatch`.


## step="0.1"

Наприклад:

    <input
        type="number"
        min="0"
        max="10"
        step="0.1"
    >

Можна вводити:

    1
    1.1
    1.2
    5.7


## step="any"

    <input
        type="number"
        step="any"
    >

означає, що конкретний крок не встановлюється.


# accept

`accept` використовується переважно для `<input type="file">`.

Наприклад:

    <input
        type="file"
        accept="image/*"
    >

Браузер запропонує користувачу вибирати зображення.

Конкретні формати:

    <input
        type="file"
        accept=".jpg,.jpeg,.png"
    >

PDF:

    <input
        type="file"
        accept=".pdf"
    >

Документи:

    <input
        type="file"
        accept=".pdf,.doc,.docx"
    >


## Важливо

`accept` — це не security validation.

Користувач або клієнт може відправити файл іншого типу.

Сервер повинен повторно перевіряти:

- MIME type;
- розширення;
- розмір;
- реальний вміст файлу;
- дозволені формати.


# multiple

`multiple` дозволяє вибирати декілька значень.

Наприклад:

    <input
        type="file"
        name="photos"
        multiple
    >

Користувач може вибрати декілька файлів.

Також:

    <select
        name="skills"
        multiple
    >
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="js">JavaScript</option>
    </select>


# Валідація email

HTML має вбудовану перевірку для:

    type="email"

Приклад:

    <label for="email">Email</label>

    <input
        id="email"
        name="email"
        type="email"
        required
    >

Браузер перевіряє базовий формат email.

Наприклад:

    user@example.com

може бути допустимим.

А:

    user

не відповідає стандартній email-структурі.


## Не потрібно одразу писати складний regex

Погана ідея:

    <input
        type="email"
        pattern="дуже-складний-regex..."
    >

У більшості звичайних форм достатньо:

    <input
        type="email"
        required
    >

Складні правила можуть бути реалізовані окремо на сервері.


# Валідація чисел

Для чисел використовують:

    type="number"

Разом з:

    min
    max
    step
    required

Приклад:

    <label for="age">Age</label>

    <input
        id="age"
        name="age"
        type="number"
        min="18"
        max="100"
        step="1"
        required
    >


## Позитивне число

    <input
        type="number"
        min="0"
    >


## Діапазон

    <input
        type="number"
        min="1"
        max="10"
    >


## Гроші

Наприклад:

    <input
        type="number"
        min="0"
        step="0.01"
    >

Але для реальних фінансових операцій server-side validation все одно обов'язкова.


# Валідація дат і часу

HTML має:

    type="date"

    type="time"

    type="datetime-local"

    type="month"

    type="week"


## Дата

    <input
        type="date"
        name="birthDate"
        required
    >


## Діапазон дат

    <input
        type="date"
        name="appointment"
        min="2026-01-01"
        max="2026-12-31"
        required
    >


## Час

    <input
        type="time"
        name="startTime"
        min="09:00"
        max="18:00"
    >


# Checkbox validation

Для checkbox найчастіше використовують:

    required

Наприклад:

    <label>
        <input
            type="checkbox"
            name="terms"
            required
        >

        I agree to the terms
    </label>

Без встановленої галочки форма не пройде native validation.


## Checkbox без required

    <input
        type="checkbox"
        name="newsletter"
    >

Такий checkbox необов'язковий.


# Radio validation

Для radio buttons можна зробити групу обов'язковою.

Наприклад:

    <fieldset>
        <legend>Choose a payment method</legend>

        <label>
            <input
                type="radio"
                name="payment"
                value="card"
                required
            >
            Card
        </label>

        <label>
            <input
                type="radio"
                name="payment"
                value="cash"
            >
            Cash
        </label>
    </fieldset>

Оскільки radio buttons мають однаковий:

    name="payment"

вони є однією групою.

Якщо користувач нічого не вибере, група не пройде validation.


# Select validation

Для `<select>` часто використовують:

    required

Наприклад:

    <select
        name="country"
        required
    >
        <option value="">Choose country</option>

        <option value="ua">Ukraine</option>
        <option value="pl">Poland</option>
        <option value="de">Germany</option>
    </select>


## Чому потрібен value=""

Перший option:

    <option value="">Choose country</option>

має порожнє значення.

Якщо він залишається вибраним, `required` вважає поле незаповненим.


## Disabled placeholder

Ще один поширений варіант:

    <select
        name="country"
        required
    >
        <option
            value=""
            disabled
            selected
        >
            Choose country
        </option>

        <option value="ua">Ukraine</option>
        <option value="pl">Poland</option>
        <option value="de">Germany</option>
    </select>

Користувач не може повторно вибрати placeholder.


# Textarea validation

`textarea` підтримує:

    required
    minlength
    maxlength

Наприклад:

    <label for="message">Message</label>

    <textarea
        id="message"
        name="message"
        minlength="10"
        maxlength="500"
        required
    ></textarea>

Це означає:

- поле обов'язкове;
- мінімум 10 символів;
- максимум 500 символів.


# Власні повідомлення про помилки

Браузер має власні validation messages.

Наприклад, для:

    <input
        type="email"
        required
    >

браузер може повідомити користувачу, що потрібно ввести email.

Для простих форм цього часто достатньо.

Але в реальному UI часто потрібно показувати власні повідомлення.


## Приклад

HTML:

    <label for="email">Email</label>

    <input
        id="email"
        name="email"
        type="email"
        required
    >

    <p class="error" id="email-error"></p>


JavaScript:

    const email = document.querySelector("#email");
    const error = document.querySelector("#email-error");

    email.addEventListener("invalid", () => {
        error.textContent = email.validationMessage;
    });

Тепер текст повідомлення браузера можна використати у власному UI.


# novalidate

`novalidate` вимикає native constraint validation при стандартному submit форми.

Наприклад:

    <form novalidate>
        ...
    </form>

Це часто використовується, коли розробник хоче повністю контролювати validation через JavaScript.


## Але важливо

`novalidate` не означає:

> "дані автоматично правильні"

Воно лише означає:

> "браузер не повинен виконувати стандартну перевірку форми перед submit"


# formnovalidate

`formnovalidate` можна встановити на submit button.

Наприклад:

    <form>
        <input
            type="email"
            required
        >

        <button type="submit">
            Submit
        </button>

        <button
            type="submit"
            formnovalidate
        >
            Save draft
        </button>
    </form>

Тут:

- `Submit` запускає native validation;
- `Save draft` може відправити форму без неї.

Це корисно для:

- Save draft;
- Preview;
- temporary submission;
- адміністративних форм.


# :valid та :invalid

CSS має псевдокласи:

    :valid

і:

    :invalid

Вони дозволяють стилізувати стан елемента.


## Приклад

    input:invalid {
        border: 2px solid red;
    }

    input:valid {
        border: 2px solid green;
    }

Наприклад:

    <input
        type="email"
        required
    >

Коли поле містить некоректне значення:

    :invalid

Коли значення відповідає constraints:

    :valid


## Проблема

Якщо використовувати:

    input:invalid

без додаткової логіки, поле може виглядати червоним ще до того, як користувач щось зробив.

Тому для хорошого UX часто використовують додаткові механізми.


# :user-valid та :user-invalid

Сучасний CSS має:

    :user-valid

    :user-invalid

Вони дозволяють стилізувати поле залежно від того, чи користувач уже взаємодіяв із ним.

Приклад:

    input:user-invalid {
        border: 2px solid red;
    }

Це може дати кращий UX, ніж одразу показувати всі поля як invalid.

Але підтримку та поведінку конкретних CSS-псевдокласів потрібно враховувати для цільових браузерів.


# :required та :optional

CSS також має:

    :required

і:

    :optional

Наприклад:

    input:required {
        border-left: 3px solid blue;
    }

Це дозволяє візуально позначити обов'язкові поля.


# Constraint Validation API у JavaScript

JavaScript може працювати з native validation через:

    checkValidity()

    reportValidity()

    validity

    validationMessage

    setCustomValidity()

    willValidate


# checkValidity()

`checkValidity()` перевіряє, чи відповідає елемент своїм constraints.

Наприклад:

    const input = document.querySelector("#email");

    if (input.checkValidity()) {
        console.log("Valid");
    } else {
        console.log("Invalid");
    }

Метод повертає:

    true

або:

    false


## Для form

    const form = document.querySelector("form");

    if (form.checkValidity()) {
        console.log("Form is valid");
    }


# reportValidity()

`reportValidity()` не тільки перевіряє поле, а й просить браузер показати стандартне повідомлення про помилку.

Наприклад:

    const form = document.querySelector("form");

    form.reportValidity();

Якщо є invalid field, браузер покаже native validation UI.


## Різниця

    checkValidity()

Перевіряє:

    true / false

    reportValidity()

Перевіряє і запускає стандартне повідомлення браузера.


# validity

Властивість:

    element.validity

містить детальну інформацію про стан validation.


Наприклад:

    const input = document.querySelector("#age");

    console.log(input.validity);


Об'єкт `ValidityState` містить різні прапорці.


# Основні властивості ValidityState

| Властивість | Значення |
|---|---|
| `valueMissing` | не заповнено `required` |
| `typeMismatch` | неправильний тип |
| `patternMismatch` | не відповідає `pattern` |
| `tooLong` | занадто довге значення |
| `tooShort` | занадто коротке |
| `rangeUnderflow` | менше `min` |
| `rangeOverflow` | більше `max` |
| `stepMismatch` | неправильний `step` |
| `badInput` | браузер не може коректно розібрати введення |
| `customError` | встановлена custom validation error |
| `valid` | усі constraints виконані |


## Приклад

    const input = document.querySelector("#age");

    if (input.validity.rangeUnderflow) {
        console.log("Age is too small");
    }

Якщо:

    <input
        id="age"
        type="number"
        min="18"
    >

і користувач ввів:

    15

то:

    input.validity.rangeUnderflow

буде:

    true


# validationMessage

`validationMessage` повертає текст повідомлення про поточну помилку.

Наприклад:

    const input = document.querySelector("#email");

    console.log(input.validationMessage);

Це дозволяє використати повідомлення браузера у власному UI.


# setCustomValidity()

`setCustomValidity()` дозволяє встановити власну помилку validation.

Наприклад:

    const input = document.querySelector("#username");

    input.setCustomValidity("This username is already taken.");

Після цього поле вважається invalid.


## Дуже важливо

Якщо встановити custom error:

    input.setCustomValidity("Username is already taken.");

то validation залишиться invalid навіть тоді, коли всі HTML constraints правильні.

Щоб очистити custom error:

    input.setCustomValidity("");

Це дуже важливо.

Правильний шаблон:

    if (isInvalid) {
        input.setCustomValidity("Custom error");
    } else {
        input.setCustomValidity("");
    }


# Приклад custom validation

    const username = document.querySelector("#username");

    username.addEventListener("input", () => {
        if (username.value === "admin") {
            username.setCustomValidity(
                "This username is reserved."
            );
        } else {
            username.setCustomValidity("");
        }
    });

Тепер:

    admin

буде invalid.

А:

    valeriy

може бути valid.


# willValidate

`willValidate` показує, чи бере елемент участь у constraint validation.

Наприклад:

    const input = document.querySelector("#email");

    console.log(input.willValidate);

Для звичайного input:

    true

Для `disabled` input:

    false

Також деякі типи елементів не беруть участі у constraint validation.


# Подія invalid

Коли constraint validation знаходить помилку, може виникнути:

    invalid

Наприклад:

    const input = document.querySelector("#email");

    input.addEventListener("invalid", () => {
        console.log("Invalid input");
    });

Ця подія корисна для:

- custom error UI;
- логування;
- accessibility UI;
- додаткової обробки validation.


# Подія submit

Форма має подію:

    submit

Типовий сценарій:

    const form = document.querySelector("form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        console.log("Form submitted");
    });

Важливо розуміти порядок:

1. користувач натискає submit;
2. браузер виконує native validation;
3. якщо форма invalid — звичайний `submit` не відбувається;
4. якщо форма valid — виникає `submit`;
5. JavaScript може перехопити submit.


## Власна перевірка у submit

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        console.log("Send data");
    });

Але якщо форма використовує звичайний submit без `novalidate`, browser native validation зазвичай уже перевірить constraints до `submit`.


# FormData та валідація

Після успішної перевірки можна отримати дані форми через:

    const formData = new FormData(form);

Наприклад:

    const form = document.querySelector("#register-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            return;
        }

        const formData = new FormData(form);

        console.log(formData.get("email"));
        console.log(formData.get("username"));
    });

`FormData` зручно використовувати для:

- fetch;
- POST requests;
- file uploads;
- API communication.


# Валідація кількох полів

Приклад форми:

    <form id="register-form">

        <label for="username">
            Username
        </label>

        <input
            id="username"
            name="username"
            type="text"
            minlength="3"
            maxlength="20"
            required
        >

        <label for="email">
            Email
        </label>

        <input
            id="email"
            name="email"
            type="email"
            required
        >

        <label for="password">
            Password
        </label>

        <input
            id="password"
            name="password"
            type="password"
            minlength="8"
            required
        >

        <button type="submit">
            Register
        </button>

    </form>


JavaScript:

    const form = document.querySelector("#register-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        console.log("Form is valid");

        const formData = new FormData(form);

        console.log(formData.get("username"));
        console.log(formData.get("email"));
        console.log(formData.get("password"));
    });


# Залежна валідація полів

Іноді validation одного поля залежить від іншого.

Наприклад:

    Password

і:

    Confirm password

HTML:

    <input
        id="password"
        name="password"
        type="password"
        minlength="8"
        required
    >

    <input
        id="confirm-password"
        name="confirmPassword"
        type="password"
        required
    >


JavaScript:

    const password = document.querySelector("#password");
    const confirmPassword = document.querySelector("#confirm-password");

    function validatePasswords() {
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity(
                "Passwords do not match."
            );
        } else {
            confirmPassword.setCustomValidity("");
        }
    }

    password.addEventListener("input", validatePasswords);

    confirmPassword.addEventListener("input", validatePasswords);


Тут:

    setCustomValidity("...")

робить поле invalid.

А:

    setCustomValidity("")

повертає його до normal validation.


# Валідація password та confirm password

Повна схема:

    <form id="register-form">

        <label for="password">
            Password
        </label>

        <input
            id="password"
            name="password"
            type="password"
            minlength="8"
            required
        >

        <label for="confirm-password">
            Confirm password
        </label>

        <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            required
        >

        <button type="submit">
            Register
        </button>

    </form>


JavaScript:

    const form = document.querySelector("#register-form");

    const password = document.querySelector("#password");

    const confirmPassword =
        document.querySelector("#confirm-password");

    function validatePasswords() {
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity(
                "Passwords do not match."
            );
        } else {
            confirmPassword.setCustomValidity("");
        }
    }

    password.addEventListener("input", validatePasswords);

    confirmPassword.addEventListener("input", validatePasswords);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        console.log("Registration data is valid.");
    });


# Валідація checkbox group

Наприклад, потрібно вибрати хоча б один інтерес:

    <label>
        <input
            type="checkbox"
            name="interest"
            value="html"
        >
        HTML
    </label>

    <label>
        <input
            type="checkbox"
            name="interest"
            value="css"
        >
        CSS
    </label>

    <label>
        <input
            type="checkbox"
            name="interest"
            value="javascript"
        >
        JavaScript
    </label>

У цьому випадку `required` на одному checkbox не завжди означає саме те бізнес-правило, яке нам потрібно.

Якщо потрібно:

> "Вибери хоча б один"

краще реалізувати окрему custom validation.


JavaScript:

    const checkboxes =
        document.querySelectorAll(
            'input[name="interest"]'
        );

    function validateInterests() {
        const checked = [
            ...checkboxes
        ].some((checkbox) => checkbox.checked);

        if (!checked) {
            checkboxes[0].setCustomValidity(
                "Choose at least one interest."
            );
        } else {
            checkboxes[0].setCustomValidity("");
        }
    }

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener(
            "change",
            validateInterests
        );
    });


# Валідація файлів

Для file input можна перевіряти:

- чи вибраний файл;
- кількість файлів;
- MIME type;
- розширення;
- розмір;
- image dimensions;
- інші правила.

HTML:

    <input
        id="avatar"
        name="avatar"
        type="file"
        accept="image/png,image/jpeg"
        required
    >

`required` перевіряє, що файл вибраний.

`accept` обмежує рекомендований вибір у file picker.

Але сервер також повинен перевіряти файл.


## Перевірка розміру через JavaScript

Наприклад:

    const input = document.querySelector("#avatar");

    input.addEventListener("change", () => {
        const file = input.files[0];

        if (!file) {
            input.setCustomValidity("");
            return;
        }

        const maxSize = 2 * 1024 * 1024;

        if (file.size > maxSize) {
            input.setCustomValidity(
                "File must be smaller than 2 MB."
            );
        } else {
            input.setCustomValidity("");
        }
    });

Тут:

    2 * 1024 * 1024

дорівнює:

    2 MB


# Валідація URL

HTML:

    <input
        type="url"
        name="website"
    >

Браузер перевіряє базову структуру URL.

Наприклад:

    https://example.com

може бути valid.

А:

    example

може бути invalid для `type="url"`.


# Валідація telephone

Для телефону часто використовують:

    <input
        type="tel"
        name="phone"
    >

Але `type="tel"` сам по собі не гарантує правильний формат номера.

Він переважно допомагає:

- браузеру;
- mobile keyboard;
- UX.

Для конкретного формату можна додати:

    pattern

Наприклад:

    <input
        type="tel"
        name="phone"
        pattern="[0-9]{10}"
        required
    >

Але реальна phone validation часто складніша.


# Валідація URL, email і number

Корисно запам'ятати:

    type="email"

→ базова email validation.

    type="url"

→ базова URL validation.

    type="number"

→ numeric constraints.

    type="tel"

→ телефонний input/UX, але не повна phone validation.


# Коли використовувати HTML, CSS та JavaScript

Є три різні рівні.


## HTML

HTML відповідає за базові constraints:

    required
    type
    min
    max
    minlength
    maxlength
    pattern
    step


## CSS

CSS відповідає за presentation:

    :valid
    :invalid
    :required
    :optional
    :user-valid
    :user-invalid

Наприклад:

    input:invalid {
        border-color: red;
    }


## JavaScript

JavaScript потрібен для:

- складних правил;
- залежних полів;
- custom error messages;
- asynchronous validation;
- перевірки даних перед API request;
- взаємодії з сервером;
- складного UX.


# Просте правило

Починай з:

    HTML validation

Потім додавай:

    CSS states

І тільки якщо потрібно:

    JavaScript validation


Не потрібно писати 100 рядків JavaScript для того, що HTML вже вміє робити.

Наприклад, замість:

    if (email.value === "") {
        ...
    }

краще спочатку:

    <input
        type="email"
        required
    >


# Типові помилки

## Помилка 1 — використовувати тільки JavaScript

Погано:

    if (input.value === "") {
        alert("Required");
    }

Краще:

    <input
        required
    >

JavaScript можна додати для складнішої логіки.


# Помилка 2 — вважати client-side validation security

Неправильно:

    "У мене є required, тому користувач не може відправити порожнє поле."

Правильно:

    "required покращує client-side UX, але сервер повинен перевірити дані сам."


# Помилка 3 — забути required

Наприклад:

    <input
        type="email"
        type="email"
    >

Сам `type="email"` не означає:

    "поле обов'язкове"

Потрібно:

    <input
        type="email"
        required
    >


# Помилка 4 — складний regex для всього

Не потрібно намагатися перевірити все одним `pattern`.

Наприклад, email:

    type="email"

вже має native validation.

Краще використовувати built-in constraints там, де вони достатні.


# Помилка 5 — неправильне використання setCustomValidity

Погано:

    input.setCustomValidity("Invalid");

і більше ніколи не очистити помилку.

Тоді input залишатиметься invalid.

Правильно:

    if (error) {
        input.setCustomValidity("Invalid");
    } else {
        input.setCustomValidity("");
    }


# Помилка 6 — показувати помилку до взаємодії

Якщо кожне поле одразу має:

    :invalid

користувач може побачити червоні поля ще до того, як почав заповнювати форму.

Краще продумати:

- коли показувати error;
- після blur;
- після input;
- після submit;
- чи використовувати `:user-invalid`.


# Помилка 7 — використовувати placeholder замість label

Погано:

    <input
        type="email"
        placeholder="Email"
    >

Краще:

    <label for="email">
        Email
    </label>

    <input
        id="email"
        name="email"
        type="email"
        placeholder="you@example.com"
    >

`placeholder` — це підказка.

`label` — назва поля.


# Accessibility та validation

Validation повинна бути зрозумілою не тільки візуально.

Погано:

    поле просто стало червоним

Користувач може не зрозуміти:

    Що саме неправильно?


Краще:

    Email
    [ abc ]

    Please enter a valid email address.


## aria-describedby

Для зв'язку input з error message можна використовувати:

    <label for="email">
        Email
    </label>

    <input
        id="email"
        name="email"
        type="email"
        aria-describedby="email-error"
        required
    >

    <p id="email-error">
        Please enter a valid email.
    </p>

`aria-describedby` дозволяє assistive technology пов'язати поле з додатковим описом.


## aria-invalid

JavaScript може встановити:

    input.setAttribute(
        "aria-invalid",
        "true"
    );

Наприклад, коли поле має custom error.

Але важливо:

`aria-invalid` не замінює native validation.

Вона повідомляє accessibility technology про стан поля.


# Security: validation ≠ security

Це одне з найважливіших правил.

HTML:

    required

CSS:

    :invalid

JavaScript:

    checkValidity()

не захищають сервер від зловмисного запиту.


Користувач може відправити:

    POST /api/users

з власним payload.

Тому сервер повинен повторно перевірити:

    email
    password
    age
    files
    permissions
    business rules


## Client-side

Відповідає переважно за:

    UX
    швидкий feedback
    зменшення помилкових запитів


## Server-side

Відповідає за:

    correctness
    security
    business rules
    data integrity


# Практичний приклад

Розглянемо просту registration form.

HTML:

    <form
        id="register-form"
        action="/register"
        method="post"
    >

        <div>
            <label for="username">
                Username
            </label>

            <input
                id="username"
                name="username"
                type="text"
                minlength="3"
                maxlength="20"
                pattern="[A-Za-z0-9]+"
                autocomplete="username"
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
                Password
            </label>

            <input
                id="password"
                name="password"
                type="password"
                minlength="8"
                autocomplete="new-password"
                required
            >
        </div>

        <div>
            <label for="confirm-password">
                Confirm password
            </label>

            <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autocomplete="new-password"
                required
            >
        </div>

        <div>
            <label>
                <input
                    type="checkbox"
                    name="terms"
                    required
                >

                I agree to the terms
            </label>
        </div>

        <button type="submit">
            Register
        </button>

    </form>


JavaScript:

    const form = document.querySelector("#register-form");

    const password =
        document.querySelector("#password");

    const confirmPassword =
        document.querySelector("#confirm-password");


    function validatePasswords() {
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity(
                "Passwords do not match."
            );
        } else {
            confirmPassword.setCustomValidity("");
        }
    }


    password.addEventListener(
        "input",
        validatePasswords
    );

    confirmPassword.addEventListener(
        "input",
        validatePasswords
    );


    form.addEventListener("submit", (event) => {
        event.preventDefault();

        validatePasswords();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);

        console.log(
            Object.fromEntries(formData)
        );
    });


# Розбір практичного прикладу

Username:

    minlength="3"
    maxlength="20"
    pattern="[A-Za-z0-9]+"
    required

Email:

    type="email"
    required

Password:

    minlength="8"
    required

Confirm password:

    required

Checkbox:

    required

Password confirmation:

    setCustomValidity()

Фінальна перевірка:

    form.checkValidity()

Відображення native errors:

    form.reportValidity()

Отримання даних:

    new FormData(form)


# Validation workflow

Типовий workflow:

    User enters data
            ↓
    HTML constraints
            ↓
    Browser validation
            ↓
    :valid / :invalid
            ↓
    JavaScript custom validation
            ↓
    checkValidity()
            ↓
    FormData
            ↓
    HTTP request
            ↓
    Server-side validation
            ↓
    Database / business logic


# HTML validation vs JavaScript validation

| Задача | HTML | JavaScript |
|---|---:|---:|
| Required field | ✅ | unnecessary |
| Email format | ✅ | usually unnecessary |
| Number range | ✅ | unnecessary |
| Text length | ✅ | unnecessary |
| Regex pattern | ✅ | sometimes |
| Password confirmation | ❌ | ✅ |
| Check username availability | ❌ | ✅ |
| Check server state | ❌ | ✅ |
| Complex business rules | limited | ✅ |
| Custom UI | limited | ✅ |


# Native validation vs custom validation

## Native validation

    <input
        type="email"
        required
    >

Переваги:

- просто;
- мало коду;
- працює без JavaScript;
- accessibility-friendly;
- браузер вже має validation mechanism.


## Custom validation

    input.setCustomValidity(
        "Username already exists."
    );

Переваги:

- складні правила;
- залежності між полями;
- server-related validation;
- власні повідомлення.


Найкращий підхід:

> Використовувати native validation як основу, а JavaScript додавати поверх неї для складних правил.


# Progressive Enhancement

Хороша форма повинна по можливості мати базову функціональність без JavaScript.

Наприклад:

    <form
        action="/register"
        method="post"
    >

        <input
            type="email"
            name="email"
            required
        >

        <button type="submit">
            Register
        </button>

    </form>

Навіть якщо JavaScript не завантажиться, браузер все одно може виконати базову HTML validation і відправити форму на сервер.

Це один із принципів:

**Progressive Enhancement**.


# Validation та HTTP

Validation відбувається перед відправленням даних.

Наприклад:

    <form
        action="/api/users"
        method="post"
    >

Якщо validation успішна, браузер може відправити:

    POST /api/users

з form data.

Але сервер повинен ще раз перевірити дані.

Схема:

    Browser validation
            ↓
    HTTP request
            ↓
    Server validation
            ↓
    Business logic
            ↓
    Database


# Validation та API

У сучасному frontend application часто використовується:

    Form
      ↓
    JavaScript
      ↓
    fetch()
      ↓
    API
      ↓
    Backend validation


Наприклад:

    const formData = new FormData(form);

    const data = Object.fromEntries(formData);

    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });


Але перед цим:

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

Це дає:

    Client validation
            +
    Server validation


# Що потрібно пам'ятати

## 1. `required`

    required

означає:

> Значення повинно бути присутнім.


## 2. `type`

    type="email"

може додати native validation.


## 3. `min` / `max`

Визначають допустимий діапазон.


## 4. `minlength` / `maxlength`

Визначають допустиму довжину тексту.


## 5. `pattern`

Дозволяє перевірити значення за regex.


## 6. `step`

Визначає допустимий крок.


## 7. `accept`

Допомагає обмежити вибір файлів.


## 8. `checkValidity()`

Перевіряє validation:

    true / false


## 9. `reportValidity()`

Перевіряє validation і показує browser validation UI.


## 10. `validity`

Дає детальну інформацію про причину помилки.


## 11. `validationMessage`

Повертає повідомлення про validation error.


## 12. `setCustomValidity()`

Дозволяє створити власну validation error.


## 13. Порожній рядок очищає custom error

    input.setCustomValidity("");

дуже важливий шаблон.


## 14. CSS може показувати validation state

    :valid
    :invalid
    :required
    :optional
    :user-valid
    :user-invalid


## 15. Client validation не є security

Сервер повинен перевіряти все повторно.


# Питання для співбесіди

### 1. Що таке form validation?

Це перевірка даних форми на відповідність певним constraints перед обробкою або відправленням.


### 2. Чим `required` відрізняється від `minlength`?

`required` перевіряє наявність значення.

`minlength` перевіряє мінімальну довжину значення.


### 3. Чи робить `type="email"` поле обов'язковим?

Ні.

Потрібно:

    type="email"
    required


### 4. Для чого потрібен `pattern`?

Для перевірки значення за заданим регулярним виразом.


### 5. Чим `checkValidity()` відрізняється від `reportValidity()`?

`checkValidity()` повертає результат validation.

`reportValidity()` також запускає стандартне повідомлення браузера про помилку.


### 6. Що таке `ValidityState`?

Об'єкт, який описує конкретний стан validation поля.


### 7. Що означає `valueMissing`?

Обов'язкове поле не має значення.


### 8. Що означає `typeMismatch`?

Значення не відповідає типу поля.

Наприклад:

    <input type="email">

з некоректним email.


### 9. Що означає `patternMismatch`?

Значення не відповідає `pattern`.


### 10. Що означає `rangeUnderflow`?

Значення менше `min`.


### 11. Що означає `rangeOverflow`?

Значення більше `max`.


### 12. Що означає `stepMismatch`?

Значення не відповідає заданому `step`.


### 13. Для чого потрібен `setCustomValidity()`?

Для встановлення власної validation error.


### 14. Як очистити custom validation error?

    input.setCustomValidity("");


### 15. Чи достатньо client-side validation для security?

Ні.

Server-side validation обов'язкова.


### 16. Чим `novalidate` відрізняється від `formnovalidate`?

`novalidate` діє на всю форму.

`formnovalidate` — на конкретний submit button.


### 17. Чи потрібно перевіряти `accept` на сервері?

Так.

`accept` не є security mechanism.


### 18. Чи можна реалізувати password confirmation через HTML?

Не повністю.

Порівняння:

    password === confirmPassword

потребує JavaScript або server-side logic.


# Рівні знань

## 🟢 Core

Потрібно знати:

    required
    type
    min
    max
    minlength
    maxlength
    pattern
    step

Розуміти:

    :valid
    :invalid


## 🟡 Junior

Потрібно вміти:

- створити валідну HTML form;
- використовувати native validation;
- використовувати `required`;
- використовувати `pattern`;
- перевіряти email;
- перевіряти числа;
- працювати з checkbox/radio;
- використовувати `checkValidity()`;
- використовувати `reportValidity()`;
- читати `validity`;
- створювати custom errors через `setCustomValidity()`.


## 🟠 Middle

Потрібно розуміти:

- Constraint Validation API;
- `ValidityState`;
- custom validation;
- dependent fields;
- asynchronous validation;
- FormData;
- server-side validation;
- accessibility validation;
- progressive enhancement;
- validation UX.


## 🔴 Senior

Потрібно розуміти:

- browser constraint validation model;
- HTTP request lifecycle;
- client/server validation boundaries;
- security implications;
- data integrity;
- API validation;
- business rules;
- accessibility architecture;
- validation libraries;
- schema-based validation;
- reusable validation architecture;
- error handling між frontend і backend.


# Міні-шпаргалка

## HTML constraints

    required

    type="email"

    type="url"

    type="number"

    min="..."

    max="..."

    minlength="..."

    maxlength="..."

    pattern="..."

    step="..."

    accept="..."

    multiple


## CSS

    :valid

    :invalid

    :required

    :optional

    :user-valid

    :user-invalid


## JavaScript

    input.checkValidity()

    form.checkValidity()

    input.reportValidity()

    form.reportValidity()

    input.validity

    input.validationMessage

    input.setCustomValidity("Error")

    input.setCustomValidity("")


## ValidityState

    valueMissing

    typeMismatch

    patternMismatch

    tooLong

    tooShort

    rangeUnderflow

    rangeOverflow

    stepMismatch

    badInput

    customError

    valid


# Типовий validation pattern

    <form id="form">

        <label for="email">
            Email
        </label>

        <input
            id="email"
            name="email"
            type="email"
            required
        >

        <button type="submit">
            Submit
        </button>

    </form>


JavaScript:

    const form = document.querySelector("#form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);

        console.log(
            Object.fromEntries(formData)
        );
    });


# Головне

Form Validation у HTML починається не з JavaScript.

Спочатку потрібно використовувати можливості самого HTML:

    required
    type
    min
    max
    minlength
    maxlength
    pattern
    step
    accept

Потім CSS може відображати стан:

    :valid
    :invalid
    :required
    :optional
    :user-valid
    :user-invalid

JavaScript потрібен тоді, коли native validation недостатньо:

    checkValidity()
    reportValidity()
    validity
    validationMessage
    setCustomValidity()

Особливо важливий принцип:

    HTML
      ↓
    basic constraints

    CSS
      ↓
    visual feedback

    JavaScript
      ↓
    complex rules

    Server
      ↓
    final validation + security


І найголовніше:

> Client-side validation покращує UX, але не забезпечує безпеку.

Будь-які дані, які приходять на backend, потрібно перевіряти на сервері незалежно від того, наскільки добре вони були перевірені в браузері.

Правильне мислення:

    HTML validation
          ↓
    хороший UX
          ↓
    JavaScript validation
          ↓
    складні правила
          ↓
    HTTP request
          ↓
    Server-side validation
          ↓
    Database / business logic

**Form validation — це не просто перевірка полів. Це система контролю якості даних від моменту введення користувачем до їх збереження на сервері.**