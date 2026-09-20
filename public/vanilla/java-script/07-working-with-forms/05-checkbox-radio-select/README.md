# 05. Checkbox, Radio, Select

## 📌 Що таке Checkbox, Radio та Select

`checkbox`, `radio` та `select` — це спеціальні HTML-елементи для вибору значень у формах.

Вони дозволяють користувачу:

- вибрати одну або декілька опцій;
- вибрати один варіант із групи;
- вибрати значення зі списку;
- передати вибрані значення через форму;
- отримувати ці значення через JavaScript;
- працювати з ними через `FormData`.

Основні елементи:

    <input type="checkbox">

    <input type="radio">

    <select>
        <option>...</option>
    </select>

---

# 1. Checkbox

`checkbox` використовується, коли користувач може:

- вибрати одну опцію;
- вибрати декілька незалежних опцій;
- увімкнути або вимкнути певний параметр.

### Приклад

    <label>
        <input
            type="checkbox"
            name="newsletter"
        >
        Subscribe to newsletter
    </label>

Логіка:

    checked
    → вибрано

    unchecked
    → не вибрано

---

# 2. `checked`

Властивість:

    checkbox.checked

повертає:

    true
    або
    false

### Приклад

    const checkbox = document.querySelector("#newsletter");

    console.log(checkbox.checked);

Якщо checkbox вибраний:

    true

Якщо не вибраний:

    false

---

# 3. Змінити checkbox через JavaScript

Можна встановити:

    checkbox.checked = true;

Або:

    checkbox.checked = false;

### Приклад

    const checkbox = document.querySelector("#newsletter");

    checkbox.checked = true;

Тепер checkbox вибраний.

---

# 4. Перемикання checkbox

Можна зробити toggle:

    checkbox.checked = !checkbox.checked;

Якщо було:

    false

стан стане:

    true

Якщо було:

    true

стан стане:

    false

---

# 5. Checkbox з `value`

### HTML

    <input
        type="checkbox"
        name="newsletter"
        value="yes"
    >

Тут:

    name
    → newsletter

    value
    → yes

Якщо checkbox вибраний, форма передає:

    newsletter=yes

---

# 6. Checkbox без `value`

Якщо `value` не вказати явно:

    <input
        type="checkbox"
        name="newsletter"
    >

браузер використовує стандартне значення:

    on

Тому краще явно задавати `value`, якщо це значення потрібне backend.

---

# 7. Checkbox та FormData

### HTML

    <form id="form">
        <label>
            <input
                type="checkbox"
                name="newsletter"
                value="yes"
            >
            Newsletter
        </label>

        <button type="submit">
            Submit
        </button>
    </form>

### JavaScript

    const form = document.querySelector("#form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        console.log(formData.get("newsletter"));
    });

Якщо checkbox вибраний:

    yes

Якщо не вибраний:

    null

---

# 8. Важлива особливість checkbox

Невибраний checkbox зазвичай **не потрапляє до form data**.

Наприклад:

    <input
        type="checkbox"
        name="newsletter"
        value="yes"
    >

Якщо він не вибраний:

    formData.has("newsletter");

дасть:

    false

Тому не потрібно очікувати:

    newsletter=false

автоматично.

---

# 9. Checkbox як boolean

Іноді в JavaScript нас цікавить саме:

    true
    false

Тоді краще читати:

    checkbox.checked

Наприклад:

    const isSubscribed = checkbox.checked;

    console.log(isSubscribed);

Результат:

    true

або:

    false

Це відрізняється від:

    formData.get("newsletter")

який повертає значення поля або `null`.

---

# 10. Checkbox як група

Checkbox особливо корисний для вибору декількох значень.

Наприклад, навички:

    HTML
    CSS
    JavaScript
    TypeScript

### HTML

    <label>
        <input
            type="checkbox"
            name="skill"
            value="html"
        >
        HTML
    </label>

    <label>
        <input
            type="checkbox"
            name="skill"
            value="css"
        >
        CSS
    </label>

    <label>
        <input
            type="checkbox"
            name="skill"
            value="javascript"
        >
        JavaScript
    </label>

    <label>
        <input
            type="checkbox"
            name="skill"
            value="typescript"
        >
        TypeScript
    </label>

---

# 11. Однаковий `name` для checkbox-групи

Усі checkbox однієї групи можуть мати:

    name="skill"

А значення відрізняються:

    value="html"
    value="css"
    value="javascript"
    value="typescript"

Отримаємо:

    skill → html
    skill → css
    skill → javascript
    skill → typescript

---

# 12. Checkbox + `FormData.getAll()`

Для декількох checkbox потрібно використовувати:

    formData.getAll("skill");

### Приклад

    const formData = new FormData(form);

    const skills = formData.getAll("skill");

    console.log(skills);

Якщо вибрано HTML і JavaScript:

    ["html", "javascript"]

---

# 13. `get()` vs `getAll()`

Для одного значення:

    formData.get("newsletter");

Для декількох значень:

    formData.getAll("skill");

Запам'ятати:

    get()
    → одне значення

    getAll()
    → всі значення з однаковим name

---

# 14. Отримання вибраних checkbox без FormData

Можна працювати безпосередньо з DOM.

### HTML

    <input
        type="checkbox"
        name="skill"
        value="html"
    >

    <input
        type="checkbox"
        name="skill"
        value="css"
    >

    <input
        type="checkbox"
        name="skill"
        value="javascript"
    >

### JavaScript

    const checkboxes = document.querySelectorAll(
        'input[name="skill"]'
    );

    const selectedSkills = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedSkills.push(checkbox.value);
        }
    });

    console.log(selectedSkills);

Результат:

    ["html", "javascript"]

---

# 15. Checkbox і `querySelectorAll`

Можна отримати всю групу:

    const checkboxes = document.querySelectorAll(
        'input[name="skill"]'
    );

Після цього перебрати:

    checkboxes.forEach((checkbox) => {
        console.log(checkbox.checked);
    });

---

# 16. Checkbox та `change`

Для checkbox часто використовують:

    change

### Приклад

    const checkbox = document.querySelector("#newsletter");

    checkbox.addEventListener("change", () => {
        console.log(checkbox.checked);
    });

Коли користувач перемикає checkbox:

    false → true

або:

    true → false

спрацьовує `change`.

---

# 17. Checkbox та `click`

Також можна слухати:

    click

Наприклад:

    checkbox.addEventListener("click", () => {
        console.log("Clicked");
    });

Але для логіки, яка залежить від нового стану checkbox, часто зручніше використовувати:

    change

---

# 18. Checkbox `indeterminate`

Checkbox може мати третій візуальний стан:

    indeterminate

JavaScript:

    checkbox.indeterminate = true;

Тоді checkbox може відображатися як:

    ☐
    частково вибраний

Це часто використовують для:

    parent checkbox
        ↓
    child checkboxes

Наприклад:

    Select all
    ├── HTML ✓
    ├── CSS ✓
    └── JavaScript ☐

Parent може бути:

    indeterminate

---

# 19. Radio

`radio` використовується, коли користувач повинен вибрати **один варіант із групи**.

### Приклад

    <label>
        <input
            type="radio"
            name="role"
            value="student"
        >
        Student
    </label>

    <label>
        <input
            type="radio"
            name="role"
            value="teacher"
        >
        Teacher
    </label>

---

# 20. Як створюється radio-група

Ключове правило:

> Radio-кнопки однієї групи повинні мати однаковий `name`.

Наприклад:

    name="role"

для всіх:

    student
    teacher
    director

Тоді браузер дозволяє вибрати тільки один варіант.

---

# 21. Radio з різними `name`

Якщо зробити:

    <input
        type="radio"
        name="role"
        value="student"
    >

    <input
        type="radio"
        name="type"
        value="teacher"
    >

це вже дві різні групи.

Користувач може вибрати:

    role → student

і одночасно:

    type → teacher

Тому `name` визначає групу radio.

---

# 22. `checked` у radio

Як і checkbox, radio має:

    checked

### Приклад

    const radio = document.querySelector("#student");

    console.log(radio.checked);

Результат:

    true
    або
    false

---

# 23. Radio + FormData

### HTML

    <input
        type="radio"
        name="role"
        value="student"
    >

    <input
        type="radio"
        name="role"
        value="teacher"
    >

### JavaScript

    const formData = new FormData(form);

    const role = formData.get("role");

    console.log(role);

Якщо вибрано teacher:

    teacher

---

# 24. Radio і `get()`

Для radio-групи достатньо:

    formData.get("role");

Тому що за правилами radio-групи одночасно вибраний лише один варіант.

Наприклад:

    role → student

або:

    role → teacher

---

# 25. Отримання вибраного radio через DOM

Можна використати CSS selector:

    input[name="role"]:checked

### Приклад

    const selectedRole = document.querySelector(
        'input[name="role"]:checked'
    );

Якщо нічого не вибрано:

    selectedRole
    → null

Якщо вибрано:

    teacher

то:

    selectedRole.value

дасть:

    teacher

---

# 26. Radio та `change`

Radio добре працює з:

    change

### Приклад

    const radios = document.querySelectorAll(
        'input[name="role"]'
    );

    radios.forEach((radio) => {
        radio.addEventListener("change", () => {
            console.log(radio.value);
        });
    });

Коли користувач змінює вибір, спрацьовує `change`.

---

# 27. Radio та `required`

Можна зробити radio-групу обов'язковою.

### Приклад

    <input
        type="radio"
        name="role"
        value="student"
        required
    >

    <input
        type="radio"
        name="role"
        value="teacher"
    >

Якщо жоден варіант не вибраний, форма не пройде native validation.

Для групи достатньо `required` на одному radio в групі.

---

# 28. Checkbox `required`

Checkbox також може бути обов'язковим.

Наприклад:

    <label>
        <input
            type="checkbox"
            name="terms"
            value="accepted"
            required
        >
        I accept the terms
    </label>

Користувач повинен поставити галочку.

---

# 29. Checkbox для Terms & Conditions

Типовий приклад:

    <label>
        <input
            type="checkbox"
            name="terms"
            value="accepted"
            required
        >
        I accept the Terms and Conditions
    </label>

Перед submit:

    checkbox.checked

може бути:

    true
    або
    false

А через FormData:

    formData.get("terms")

Якщо вибрано:

    accepted

Якщо не вибрано:

    null

---

# 30. Select

`<select>` використовується для вибору значення зі списку.

### Приклад

    <select name="country">
        <option value="ua">Ukraine</option>
        <option value="pl">Poland</option>
        <option value="de">Germany</option>
    </select>

Користувач бачить:

    Ukraine
    Poland
    Germany

А форма передає:

    ua
    pl
    de

---

# 31. `option`

Кожен варіант створюється через:

    <option>

Наприклад:

    <option value="ua">
        Ukraine
    </option>

Тут:

    value
    → значення

    Ukraine
    → текст, який бачить користувач

---

# 32. `value` та текст option

Наприклад:

    <option value="ua">
        Ukraine
    </option>

JavaScript:

    select.value

дасть:

    ua

а не:

    Ukraine

Це дуже важливо.

Зазвичай:

    value
    → дані для application/backend

    textContent
    → текст для користувача

---

# 33. Отримання select.value

### HTML

    <select id="country">
        <option value="ua">Ukraine</option>
        <option value="pl">Poland</option>
    </select>

### JavaScript

    const select = document.querySelector("#country");

    console.log(select.value);

Якщо вибрано Ukraine:

    ua

---

# 34. `selected`

Для option можна встановити:

    selected

### HTML

    <select name="country">
        <option value="ua">
            Ukraine
        </option>

        <option
            value="pl"
            selected
        >
            Poland
        </option>
    </select>

Початкове значення:

    pl

---

# 35. Змінити select через JavaScript

Можна написати:

    select.value = "de";

Тепер буде вибрано:

    Germany

якщо існує:

    <option value="de">
        Germany
    </option>

---

# 36. Select + FormData

### HTML

    <select name="country">
        <option value="ua">Ukraine</option>
        <option value="pl">Poland</option>
        <option value="de">Germany</option>
    </select>

### JavaScript

    const formData = new FormData(form);

    const country = formData.get("country");

    console.log(country);

Якщо вибрано Ukraine:

    ua

---

# 37. Placeholder для select

`select` не має стандартного `placeholder` так, як input.

Замість цього часто створюють першу option:

    <select name="country" required>
        <option value="">
            Choose country
        </option>

        <option value="ua">
            Ukraine
        </option>

        <option value="pl">
            Poland
        </option>
    </select>

Тут:

    value=""

означає, що реальне значення ще не вибране.

---

# 38. Select + required

Приклад:

    <select name="country" required>
        <option value="">
            Choose country
        </option>

        <option value="ua">
            Ukraine
        </option>

        <option value="pl">
            Poland
        </option>
    </select>

Якщо залишити:

    Choose country

форма не пройде validation.

---

# 39. Multiple select

`select` може дозволяти вибирати декілька значень:

    multiple

### Приклад

    <select
        name="skills"
        multiple
    >
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
    </select>

Користувач може вибрати:

    HTML
    CSS
    JavaScript

---

# 40. Multiple select + FormData

Для `multiple` select потрібно використовувати:

    getAll()

### Приклад

    const formData = new FormData(form);

    const skills = formData.getAll("skills");

    console.log(skills);

Результат:

    ["html", "css", "javascript"]

---

# 41. Multiple select + selectedOptions

У DOM можна отримати:

    select.selectedOptions

### Приклад

    const select = document.querySelector("#skills");

    console.log(select.selectedOptions);

Це колекція вибраних `<option>`.

---

# 42. Multiple select → масив

Можна перетворити вибрані options:

    const values = Array.from(
        select.selectedOptions,
        (option) => option.value
    );

    console.log(values);

Результат:

    ["html", "css", "javascript"]

---

# 43. Select та `change`

Для select найчастіше використовують:

    change

### Приклад

    select.addEventListener("change", () => {
        console.log(select.value);
    });

Користувач вибрав:

    Poland

Отримаємо:

    pl

---

# 44. Checkbox, Radio, Select — порівняння

| Element | Кількість вибраних | Основна властивість |
|---|---:|---|
| Checkbox | 0 / 1 для одного control | `checked` |
| Checkbox group | 0 / багато | `getAll()` |
| Radio group | 0 / 1 | `checked` / `:checked` |
| Select | 1 за замовчуванням | `value` |
| Multiple select | 0 / багато | `selectedOptions` / `getAll()` |

---

# 45. Checkbox vs Radio

Головна різниця:

    checkbox
    → можна вибрати декілька

    radio
    → можна вибрати один варіант із групи

Наприклад:

    Skills
    □ HTML
    □ CSS
    □ JavaScript

це checkbox.

А:

    Role
    ○ Student
    ○ Teacher
    ○ Director

це radio.

---

# 46. Radio vs Select

Обидва можуть дозволяти вибрати один варіант.

### Radio

Добре, коли варіантів небагато:

    ○ Student
    ○ Teacher
    ○ Director

### Select

Добре, коли варіантів багато:

    Country
    [ Ukraine ▼ ]

Наприклад:

    Ukraine
    Poland
    Germany
    France
    Italy
    Spain
    ...

---

# 47. Checkbox vs Select multiple

Обидва можуть дозволяти декілька значень.

### Checkbox

Всі варіанти видно:

    □ HTML
    □ CSS
    □ JavaScript
    □ TypeScript

### Multiple select

Варіанти знаходяться в одному control:

    [ HTML       ]
    [ CSS        ]
    [ JavaScript ]
    [ TypeScript ]

Вибір залежить від UX.

---

# 48. Повна форма з Checkbox

### HTML

    <form id="skillsForm">
        <fieldset>
            <legend>Skills</legend>

            <label>
                <input
                    type="checkbox"
                    name="skill"
                    value="html"
                >
                HTML
            </label>

            <label>
                <input
                    type="checkbox"
                    name="skill"
                    value="css"
                >
                CSS
            </label>

            <label>
                <input
                    type="checkbox"
                    name="skill"
                    value="javascript"
                >
                JavaScript
            </label>
        </fieldset>

        <button type="submit">
            Submit
        </button>
    </form>

---

# 49. JavaScript для Checkbox

    const form = document.querySelector("#skillsForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const skills = formData.getAll("skill");

        console.log(skills);
    });

Якщо вибрано:

    HTML
    JavaScript

результат:

    ["html", "javascript"]

---

# 50. Повна форма з Radio

### HTML

    <form id="roleForm">
        <fieldset>
            <legend>Role</legend>

            <label>
                <input
                    type="radio"
                    name="role"
                    value="student"
                    required
                >
                Student
            </label>

            <label>
                <input
                    type="radio"
                    name="role"
                    value="teacher"
                >
                Teacher
            </label>

            <label>
                <input
                    type="radio"
                    name="role"
                    value="director"
                >
                Director
            </label>
        </fieldset>

        <button type="submit">
            Submit
        </button>
    </form>

---

# 51. JavaScript для Radio

    const form = document.querySelector("#roleForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const role = formData.get("role");

        console.log(role);
    });

Якщо вибрано:

    Teacher

отримаємо:

    teacher

---

# 52. Повна форма з Select

### HTML

    <form id="countryForm">
        <label>
            Country

            <select
                name="country"
                required
            >
                <option value="">
                    Choose country
                </option>

                <option value="ua">
                    Ukraine
                </option>

                <option value="pl">
                    Poland
                </option>

                <option value="de">
                    Germany
                </option>
            </select>
        </label>

        <button type="submit">
            Submit
        </button>
    </form>

---

# 53. JavaScript для Select

    const form = document.querySelector("#countryForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const country = formData.get("country");

        console.log(country);
    });

Якщо вибрано:

    Ukraine

результат:

    ua

---

# 54. Повна форма

Тепер об'єднаємо:

    username
    role
    skills
    country

### HTML

    <form id="userForm">
        <label>
            Username

            <input
                type="text"
                name="username"
                required
            >
        </label>

        <fieldset>
            <legend>Role</legend>

            <label>
                <input
                    type="radio"
                    name="role"
                    value="student"
                    required
                >
                Student
            </label>

            <label>
                <input
                    type="radio"
                    name="role"
                    value="teacher"
                >
                Teacher
            </label>
        </fieldset>

        <fieldset>
            <legend>Skills</legend>

            <label>
                <input
                    type="checkbox"
                    name="skill"
                    value="html"
                >
                HTML
            </label>

            <label>
                <input
                    type="checkbox"
                    name="skill"
                    value="css"
                >
                CSS
            </label>

            <label>
                <input
                    type="checkbox"
                    name="skill"
                    value="javascript"
                >
                JavaScript
            </label>
        </fieldset>

        <label>
            Country

            <select
                name="country"
                required
            >
                <option value="">
                    Choose country
                </option>

                <option value="ua">
                    Ukraine
                </option>

                <option value="pl">
                    Poland
                </option>
            </select>
        </label>

        <button type="submit">
            Submit
        </button>
    </form>

---

# 55. JavaScript для повної форми

    const form = document.querySelector("#userForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const username = formData.get("username");
        const role = formData.get("role");
        const skills = formData.getAll("skill");
        const country = formData.get("country");

        console.log({
            username,
            role,
            skills,
            country
        });
    });

Наприклад:

    {
        username: "Valeriy",
        role: "teacher",
        skills: ["html", "javascript"],
        country: "ua"
    }

---

# 56. Checkbox, Radio, Select + Object

Для простих полів можна використати:

    Object.fromEntries(formData)

Але для множинних значень потрібно враховувати:

    getAll()

Наприклад:

    const formData = new FormData(form);

    const data = {
        username: formData.get("username"),
        role: formData.get("role"),
        skills: formData.getAll("skill"),
        country: formData.get("country")
    };

Це надійніший варіант, якщо форма має повторювані ключі.

---

# 57. `fieldset`

Для логічного групування form controls використовується:

    <fieldset>

### Приклад

    <fieldset>
        <legend>Role</legend>

        <label>
            <input
                type="radio"
                name="role"
                value="student"
            >
            Student
        </label>

        <label>
            <input
                type="radio"
                name="role"
                value="teacher"
            >
            Teacher
        </label>
    </fieldset>

`fieldset` не просто декоративний.

Він покращує:

- структуру форми;
- accessibility;
- логічне групування полів.

---

# 58. `legend`

Для `fieldset` рекомендується використовувати:

    <legend>

Наприклад:

    <fieldset>
        <legend>Select your skills</legend>

        ...
    </fieldset>

`legend` описує групу полів.

---

# 59. Disabled для fieldset

Можна вимкнути всю групу:

    <fieldset disabled>
        ...
    </fieldset>

Тоді controls всередині будуть disabled.

Це зручно, коли потрібно тимчасово заборонити взаємодію з групою.

---

# 60. Checkbox: залежність одного поля від іншого

Наприклад:

    <label>
        <input
            type="checkbox"
            id="hasAddress"
        >
        I have another address
    </label>

Якщо checkbox вибраний:

    address fields
    → enabled

Якщо ні:

    address fields
    → disabled

### JavaScript

    const checkbox =
        document.querySelector("#hasAddress");

    const address =
        document.querySelector("#address");

    checkbox.addEventListener("change", () => {
        address.disabled = !checkbox.checked;
    });

---

# 61. Radio як перемикач режиму

Наприклад:

    ○ Personal
    ○ Business

Залежно від вибору можна показувати різні поля.

### JavaScript

    const radios = document.querySelectorAll(
        'input[name="accountType"]'
    );

    radios.forEach((radio) => {
        radio.addEventListener("change", () => {
            console.log(radio.value);
        });
    });

---

# 62. Select як перемикач

Наприклад:

    <select id="role">
        <option value="student">
            Student
        </option>

        <option value="teacher">
            Teacher
        </option>
    </select>

JavaScript:

    const role = document.querySelector("#role");

    role.addEventListener("change", () => {
        if (role.value === "teacher") {
            console.log("Teacher mode");
        }
    });

---

# 63. Практичний приклад: educational form

Для навчального застосунку можна створити форму:

    Student
    ├── Name
    ├── Grade
    ├── Role
    ├── Subjects
    └── Country

Наприклад:

    Name
    [ Valeriy ]

    Role
    ○ Student
    ○ Teacher

    Subjects
    □ Mathematics
    □ Informatics
    □ English

    Country
    [ Ukraine ▼ ]

Після submit:

    FormData
        ↓
    username
    role
    subjects[]
    country
        ↓
    backend

---

# 64. `FormData` для checkbox-групи

Наприклад:

    <input
        type="checkbox"
        name="subject"
        value="math"
    >

    <input
        type="checkbox"
        name="subject"
        value="informatics"
    >

    <input
        type="checkbox"
        name="subject"
        value="english"
    >

Отримуємо:

    const subjects = formData.getAll("subject");

Наприклад:

    ["math", "informatics"]

---

# 65. `FormData` для radio

Наприклад:

    <input
        type="radio"
        name="role"
        value="student"
    >

    <input
        type="radio"
        name="role"
        value="teacher"
    >

Отримуємо:

    const role = formData.get("role");

Результат:

    "student"

або:

    "teacher"

---

# 66. `FormData` для select

Наприклад:

    <select name="country">
        <option value="ua">
            Ukraine
        </option>

        <option value="pl">
            Poland
        </option>
    </select>

Отримуємо:

    const country = formData.get("country");

Результат:

    "ua"

або:

    "pl"

---

# 67. Checkbox / Radio / Select — правила `name`

### Checkbox

Однаковий `name`:

    name="skill"

різні `value`:

    html
    css
    javascript

### Radio

Однаковий `name`:

    name="role"

різні `value`:

    student
    teacher
    director

### Select

Один `name`:

    name="country"

а `option` мають різні `value`:

    ua
    pl
    de

---

# 68. Checkbox / Radio / Select — що передається

### Checkbox

    checked
    → name=value

    unchecked
    → нічого

### Radio

    selected
    → name=value

    nothing selected
    → нічого

### Select

    selected option
    → name=value

### Multiple select

    selected options
    → декілька name=value

---

# 69. Часті помилки

## ❌ Помилка 1 — різні `name` для radio

Неправильно:

    <input
        type="radio"
        name="student"
        value="student"
    >

    <input
        type="radio"
        name="teacher"
        value="teacher"
    >

Це дві різні групи.

Правильно:

    <input
        type="radio"
        name="role"
        value="student"
    >

    <input
        type="radio"
        name="role"
        value="teacher"
    >

---

## ❌ Помилка 2 — використовувати `get()` для checkbox-групи

Неправильно:

    formData.get("skill");

якщо є декілька checkbox.

Правильно:

    formData.getAll("skill");

---

## ❌ Помилка 3 — очікувати `false` від unchecked checkbox

Якщо:

    <input
        type="checkbox"
        name="newsletter"
        value="yes"
    >

не вибраний, `FormData` не обов'язково містить:

    newsletter=false

Замість цього поле просто відсутнє.

Для boolean перевіряйте:

    checkbox.checked

---

## ❌ Помилка 4 — забути `value`

Наприклад:

    <input
        type="radio"
        name="role"
    >

Краще:

    <input
        type="radio"
        name="role"
        value="teacher"
    >

Backend повинен отримати зрозуміле значення.

---

## ❌ Помилка 5 — плутати текст option і value

    <option value="ua">
        Ukraine
    </option>

Передається:

    ua

а не:

    Ukraine

---

## ❌ Помилка 6 — забути `name`

Наприклад:

    <select id="country">

Якщо потрібно передати значення форми, краще:

    <select
        id="country"
        name="country"
    >

---

## ❌ Помилка 7 — використовувати `click` для всього

Для checkbox/radio/select часто природнішим є:

    change

Наприклад:

    checkbox.addEventListener("change", handler);

    radio.addEventListener("change", handler);

    select.addEventListener("change", handler);

---

## ❌ Помилка 8 — використовувати checkbox замість radio

Якщо можна вибрати лише один варіант:

    Student
    Teacher
    Director

потрібен:

    radio

а не:

    checkbox

---

## ❌ Помилка 9 — використовувати radio для множинного вибору

Якщо можна вибрати:

    HTML
    CSS
    JavaScript

потрібні:

    checkbox

а не:

    radio

---

# 70. Accessibility

Для form controls важливо використовувати:

    <label>

### Правильно

    <label>
        <input
            type="checkbox"
            name="newsletter"
        >
        Subscribe
    </label>

Клік по тексту теж перемикає checkbox.

---

# 71. `label` через `for`

Можна пов'язати label та control через `id`.

### HTML

    <input
        id="newsletter"
        type="checkbox"
        name="newsletter"
    >

    <label for="newsletter">
        Subscribe to newsletter
    </label>

Тепер label пов'язаний із checkbox.

---

# 72. Radio + label

### Правильно

    <label>
        <input
            type="radio"
            name="role"
            value="student"
        >
        Student
    </label>

Так користувачу легше натискати на текст.

---

# 73. Select + label

### Правильно

    <label for="country">
        Country
    </label>

    <select
        id="country"
        name="country"
    >
        <option value="ua">
            Ukraine
        </option>
    </select>

---

# 74. Checkbox та accessibility

Для групи checkbox корисно використовувати:

    fieldset
    +
    legend

Наприклад:

    <fieldset>
        <legend>Choose your skills</legend>

        <label>
            <input
                type="checkbox"
                name="skill"
                value="html"
            >
            HTML
        </label>

        <label>
            <input
                type="checkbox"
                name="skill"
                value="css"
            >
            CSS
        </label>
    </fieldset>

---

# 75. Radio та accessibility

Так само:

    <fieldset>
        <legend>Select your role</legend>

        <label>
            <input
                type="radio"
                name="role"
                value="student"
            >
            Student
        </label>

        <label>
            <input
                type="radio"
                name="role"
                value="teacher"
            >
            Teacher
        </label>
    </fieldset>

---

# 76. Практичний submit handler

Для форми з усіма трьома типами:

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const role = formData.get("role");

        const skills = formData.getAll("skill");

        const country = formData.get("country");

        console.log({
            role,
            skills,
            country
        });
    });

Це дуже важливий шаблон.

---

# 77. Checkbox → Boolean, FormData → Value

Це одна з корисних відмінностей.

### DOM

    checkbox.checked

дає:

    true / false

### FormData

    formData.get("newsletter")

дає:

    "yes"
    або
    null

Тому вибір залежить від задачі.

---

# 78. Перевірка checkbox перед submit

Наприклад:

    const terms = document.querySelector("#terms");

    form.addEventListener("submit", (event) => {
        if (!terms.checked) {
            event.preventDefault();

            console.log("Accept terms");
        }
    });

Але для простої обов'язкової галочки краще використовувати HTML:

    <input
        type="checkbox"
        name="terms"
        required
    >

---

# 79. Перевірка radio

Можна знайти вибраний radio:

    const selectedRole = document.querySelector(
        'input[name="role"]:checked'
    );

Якщо нічого не вибрано:

    selectedRole === null

Тому:

    if (!selectedRole) {
        console.log("Select role");
    }

Але для стандартної обов'язкової radio-групи краще:

    required

---

# 80. Перевірка select

Можна перевірити:

    if (select.value === "") {
        console.log("Select country");
    }

Або HTML:

    <select
        name="country"
        required
    >

Для стандартної перевірки краще спочатку використовувати native validation.

---

# 81. `selectedOptions`

Для звичайного select:

    select.selectedOptions

містить вибрану option.

Наприклад:

    const option = select.selectedOptions[0];

    console.log(option.value);

---

# 82. `selectedIndex`

У select є:

    selectedIndex

Наприклад:

    const index = select.selectedIndex;

    console.log(index);

Якщо вибраний перший option:

    0

Другий:

    1

Третій:

    2

---

# 83. `options`

У select є:

    select.options

Це колекція всіх `<option>`.

Наприклад:

    console.log(select.options.length);

Якщо є:

    Ukraine
    Poland
    Germany

отримаємо:

    3

---

# 84. Створення option через JavaScript

Можна створювати options програмно.

### Приклад

    const option = new Option(
        "Ukraine",
        "ua"
    );

    select.add(option);

Тепер у select з'явиться:

    Ukraine

зі значенням:

    ua

---

# 85. Динамічний select

Наприклад, список країн можна створити з масиву:

    const countries = [
        {
            value: "ua",
            label: "Ukraine"
        },
        {
            value: "pl",
            label: "Poland"
        },
        {
            value: "de",
            label: "Germany"
        }
    ];

    countries.forEach((country) => {
        const option = new Option(
            country.label,
            country.value
        );

        select.add(option);
    });

---

# 86. Checkbox + array

Checkbox-групу зручно перетворити на масив:

    const formData = new FormData(form);

    const skills = formData.getAll("skill");

Тепер:

    skills

це звичайний масив:

    ["html", "css", "javascript"]

Його можна:

    map()
    filter()
    includes()
    join()

та передавати далі в application.

---

# 87. Перевірка вибраної навички

Наприклад:

    const skills = formData.getAll("skill");

    if (skills.includes("javascript")) {
        console.log("JavaScript selected");
    }

---

# 88. Мінімальна кількість checkbox

HTML не має простого атрибута:

    minchecked="2"

для звичайної групи checkbox.

Тому можна перевірити JavaScript:

    const skills = formData.getAll("skill");

    if (skills.length < 2) {
        console.log("Select at least two skills");
    }

Це приклад custom validation.

---

# 89. Максимальна кількість checkbox

Наприклад, дозволити не більше трьох навичок:

    const skills = formData.getAll("skill");

    if (skills.length > 3) {
        console.log("Select no more than three skills");
    }

---

# 90. Повна практична форма

### HTML

    <form id="profileForm">
        <label>
            Name

            <input
                type="text"
                name="name"
                required
            >
        </label>

        <fieldset>
            <legend>Role</legend>

            <label>
                <input
                    type="radio"
                    name="role"
                    value="student"
                    required
                >
                Student
            </label>

            <label>
                <input
                    type="radio"
                    name="role"
                    value="teacher"
                >
                Teacher
            </label>
        </fieldset>

        <fieldset>
            <legend>Skills</legend>

            <label>
                <input
                    type="checkbox"
                    name="skill"
                    value="html"
                >
                HTML
            </label>

            <label>
                <input
                    type="checkbox"
                    name="skill"
                    value="css"
                >
                CSS
            </label>

            <label>
                <input
                    type="checkbox"
                    name="skill"
                    value="javascript"
                >
                JavaScript
            </label>

            <label>
                <input
                    type="checkbox"
                    name="skill"
                    value="typescript"
                >
                TypeScript
            </label>
        </fieldset>

        <label for="country">
            Country
        </label>

        <select
            id="country"
            name="country"
            required
        >
            <option value="">
                Choose country
            </option>

            <option value="ua">
                Ukraine
            </option>

            <option value="pl">
                Poland
            </option>

            <option value="de">
                Germany
            </option>
        </select>

        <button type="submit">
            Save
        </button>
    </form>

---

# 91. JavaScript для повної форми

    const form = document.querySelector("#profileForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const data = {
            name: formData.get("name"),
            role: formData.get("role"),
            skills: formData.getAll("skill"),
            country: formData.get("country")
        };

        console.log(data);
    });

Результат може бути:

    {
        name: "Valeriy",
        role: "student",
        skills: [
            "html",
            "javascript",
            "typescript"
        ],
        country: "ua"
    }

---

# 92. Checkbox / Radio / Select + Backend

У full-stack application ці дані можуть пройти:

    HTML
        ↓
    submit
        ↓
    FormData
        ↓
    validation
        ↓
    fetch()
        ↓
    backend
        ↓
    database

Наприклад:

    role
    → "student"

    skills
    → ["html", "javascript"]

    country
    → "ua"

Backend вже вирішує, як ці дані зберігати.

---

# 93. Приклад структури даних для backend

Frontend може сформувати:

    {
        name: "Valeriy",
        role: "student",
        skills: ["html", "javascript"],
        country: "ua"
    }

Backend:

    validation
        ↓
    business logic
        ↓
    database

Наприклад, `skills` може зберігатися:

    окремою таблицею
    або
    JSON/JSONB
    або
    через relation

Конкретний спосіб залежить від структури PostgreSQL database.

---

# 94. Практичні вправи

## 🟢 Рівень 1 — Checkbox

Створи форму:

    □ HTML
    □ CSS
    □ JavaScript

Після submit виведи:

    ["html", "css"]

якщо вибрані HTML та CSS.

Використай:

    FormData
    getAll()

---

## 🟢 Рівень 2 — Checkbox boolean

Створи:

    □ Subscribe to newsletter

Після зміни checkbox виводь:

    true
    false

Використай:

    checkbox.checked

---

## 🟢 Рівень 3 — Radio

Створи:

    ○ Student
    ○ Teacher
    ○ Director

Дозволь вибрати тільки один варіант.

Після submit виведи:

    student
    teacher
    director

---

## 🟢 Рівень 4 — Select

Створи:

    Country
    [ Ukraine ▼ ]

Варіанти:

    Ukraine
    Poland
    Germany

Після submit виведи `value`.

---

## 🟡 Рівень 5 — Multiple select

Створи:

    Skills

з:

    HTML
    CSS
    JavaScript
    TypeScript

Дозволь вибрати декілька.

Отримай:

    formData.getAll("skills")

---

## 🟡 Рівень 6 — Validation

Створи:

    Role
    Skills
    Country

Зроби:

    role → required
    country → required
    skills → мінімум 2 через JavaScript

---

## 🟡 Рівень 7 — Dynamic UI

Створи:

    Account type
    ○ Personal
    ○ Business

Якщо:

    Business

показуй:

    Company name

Якщо:

    Personal

ховай його.

---

## 🟠 Рівень 8 — Select dependency

Створи два select:

    Country
    City

Наприклад:

    Ukraine
        → Vinnytsia
        → Kyiv
        → Lviv

    Poland
        → Warsaw
        → Krakow

При зміні country оновлюй city.

---

## 🟠 Рівень 9 — Checkbox limit

Створи 5 checkbox.

Дозволь вибрати максимум 3.

Якщо користувач вибрав четвертий:

    або заблокуй його;

    або покажи помилку.

---

## 🔴 Рівень 10 — Educational profile

Створи повну форму:

    Name
    Email
    Role
    Grade
    Subjects
    Country
    Newsletter
    Terms

Після submit сформуй:

    {
        name,
        email,
        role,
        grade,
        subjects,
        country,
        newsletter,
        terms
    }

Після цього можна перейти до:

    FormData
        ↓
    fetch()
        ↓
    Node.js
        ↓
    PostgreSQL

---

# 95. Навчальний маршрут

### Core

Потрібно знати:

    checkbox
    radio
    select
    option

    checked
    value
    selected

    change

---

### Junior

Потрібно знати:

    name
    value
    required
    FormData
    get()
    getAll()

    checkbox.checked
    :checked

    select.value
    selectedOptions
    selectedIndex

    fieldset
    legend

---

### Junior+

Потрібно розуміти:

    multiple select
    checkbox groups
    radio groups
    custom validation
    dynamic select
    dependent fields
    disabled controls
    indeterminate checkbox
    accessibility
    label
    fieldset
    legend

---

### Middle

Розуміти:

    form controls
        ↓
    FormData
        ↓
    HTTP
        ↓
    backend parser
        ↓
    validation
        ↓
    API
        ↓
    database

Також:

    dynamic forms
    reusable form components
    accessibility
    complex validation
    async data loading
    dependent selects
    server-side validation

---

### Senior

Глибше розуміти:

    form architecture
    accessibility
    browser form semantics
    custom controls
    keyboard navigation
    screen readers
    progressive enhancement
    complex state management
    validation architecture
    API contracts
    normalized database design
    security
    authorization
    CSRF
    data integrity

---

# 96. Міні-шпаргалка

## Checkbox

    <input
        type="checkbox"
        name="skill"
        value="javascript"
    >

    checkbox.checked

    formData.getAll("skill")

    checkbox.addEventListener(
        "change",
        () => {}
    );

---

## Radio

    <input
        type="radio"
        name="role"
        value="student"
    >

    <input
        type="radio"
        name="role"
        value="teacher"
    >

    formData.get("role")

    document.querySelector(
        'input[name="role"]:checked'
    );

---

## Select

    <select name="country">
        <option value="ua">
            Ukraine
        </option>

        <option value="pl">
            Poland
        </option>
    </select>

    select.value

    formData.get("country")

---

## Multiple select

    <select
        name="skills"
        multiple
    >
        <option value="html">
            HTML
        </option>

        <option value="css">
            CSS
        </option>

        <option value="javascript">
            JavaScript
        </option>
    </select>

    formData.getAll("skills")

---

# 97. Головні правила `name`

    Checkbox group
        ↓
    same name
        +
    different values

    Radio group
        ↓
    same name
        +
    different values

    Select
        ↓
    one name
        +
    option values

Запам'ятати:

> Для radio однаковий `name` створює групу взаємовиключних варіантів.

> Для checkbox однаковий `name` дозволяє отримати декілька значень через `getAll()`.

---

# 98. Головні правила FormData

    Checkbox
    → getAll()

    Radio
    → get()

    Select
    → get()

    Multiple select
    → getAll()

Наприклад:

    const role = formData.get("role");

    const skills = formData.getAll("skill");

    const country = formData.get("country");

---

# 99. Checkbox / Radio / Select у full-stack

    CHECKBOX
        ↓
    multiple values
        ↓
    getAll()
        ↓
    backend

    RADIO
        ↓
    one value
        ↓
    get()
        ↓
    backend

    SELECT
        ↓
    one value
        ↓
    get()
        ↓
    backend

    MULTIPLE SELECT
        ↓
    multiple values
        ↓
    getAll()
        ↓
    backend

---

# 100. 🔑 Головне

> `checkbox` використовується для незалежного вибору одного або декількох варіантів.

> `radio` використовується для вибору одного варіанту з групи.

> `select` використовується для вибору значення зі списку.

> Для radio-групи всі елементи повинні мати однаковий `name`.

> Для checkbox-групи однаковий `name` дозволяє отримувати декілька значень через `getAll()`.

> `checkbox.checked` повертає `true` або `false`.

> Невибраний checkbox зазвичай не потрапляє до `FormData`.

> Для checkbox-групи використовуй:

    formData.getAll("skill");

> Для radio використовуй:

    formData.get("role");

> Для звичайного select використовуй:

    formData.get("country");

> Для multiple select використовуй:

    formData.getAll("skills");

> У `<option>` текст для користувача та `value` для application можуть бути різними.

Наприклад:

    <option value="ua">
        Ukraine
    </option>

передає:

    ua

> `required` можна використовувати для checkbox, radio та select.

> `change` — основна подія для реагування на зміну checkbox, radio та select.

> `fieldset` і `legend` допомагають логічно групувати form controls та покращують accessibility.

> `label` потрібно правильно пов'язувати з form control.

> Checkbox зручний для множинного вибору.

> Radio зручний для взаємовиключного вибору.

> Select зручний для одного значення з великого списку.

> Multiple select дозволяє вибирати декілька значень.

> Для складних правил можна поєднувати native HTML validation із JavaScript validation.

Головний практичний ланцюжок:

    CHECKBOX / RADIO / SELECT
            ↓
        FORM DATA
            ↓
        get() / getAll()
            ↓
        VALIDATION
            ↓
        FETCH
            ↓
        BACKEND
            ↓
        DATABASE

---

# 📚 Зв'язок із попередніми темами

    07-working-with-forms
    │
    ├── 01-input-data
    │       ↓
    │   отримання значень input
    │
    ├── 02-form-submit
    │       ↓
    │   submit event
    │   preventDefault()
    │
    ├── 03-formdata
    │       ↓
    │   FormData API
    │
    ├── 04-validation
    │       ↓
    │   перевірка даних
    │
    ├── 05-checkbox-radio-select    ← зараз
    │       ↓
    │   спеціальні form controls
    │
    ├── 06-file-input
    │       ↓
    │   робота з файлами
    │
    └── 07-form-project
            ↓
        повна форма

Логічний розвиток:

    INPUT
      ↓
    SUBMIT
      ↓
    FormData
      ↓
    VALIDATION
      ↓
    CHECKBOX / RADIO / SELECT
      ↓
    FILE
      ↓
    FETCH
      ↓
    BACKEND
      ↓
    DATABASE