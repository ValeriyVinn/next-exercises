# 08. Template Literals

## Визначення

**Template literals** — сучасний синтаксис JavaScript для створення рядків за допомогою зворотних лапок:

    `...`

Головні можливості:

- вставка змінних у рядок;
- вставка виразів;
- створення багаторядкових рядків;
- зручне форматування тексту;
- використання функцій та методів усередині `${...}`;
- створення HTML-шаблонів;
- формування URL, повідомлень, SQL-подібних рядків тощо.

Основний синтаксис:

    `Hello, ${name}!`

---

# 1. Зворотні лапки

Template literal записується не через:

    "Hello"

і не через:

    'Hello'

а через:

    `Hello`

Наприклад:

    const message = `Hello, world!`;

    console.log(message);
    // "Hello, world!"

Символ:

    `

називається **backtick**.

---

# 2. Навіщо потрібні Template Literals

До появи template literals часто використовували конкатенацію:

    const name = "Valeriy";
    const age = 56;

    const message = "My name is " + name + " and I am " + age + " years old.";

Це працює, але код швидко стає незручним.

З template literals:

    const name = "Valeriy";
    const age = 56;

    const message = `My name is ${name} and I am ${age} years old.`;

Це:

- коротше;
- читабельніше;
- простіше розширювати.

---

# 3. `${...}` — interpolation

Головна можливість template literals — **interpolation**.

Синтаксис:

    `${expression}`

Наприклад:

    const name = "Valeriy";

    const message = `Hello, ${name}!`;

    console.log(message);
    // "Hello, Valeriy!"

JavaScript обчислює вираз усередині:

    ${name}

і вставляє результат у рядок.

---

# 4. Вставка змінної

    const language = "JavaScript";

    const message = `I am learning ${language}.`;

    console.log(message);
    // "I am learning JavaScript."

---

# 5. Вставка кількох змінних

    const firstName = "Valeriy";
    const lastName = "Svystun";

    const fullName = `${firstName} ${lastName}`;

    console.log(fullName);
    // "Valeriy Svystun"

---

# 6. Вставка чисел

    const a = 10;
    const b = 20;

    const message = `The result is ${a + b}.`;

    console.log(message);
    // "The result is 30."

---

# 7. `${...}` містить вираз, а не тільки змінну

Це дуже важливо.

Всередині `${...}` можна записувати **будь-який JavaScript expression**, який повертає значення.

Наприклад:

    const a = 10;
    const b = 20;

    console.log(`Sum: ${a + b}`);
    // "Sum: 30"

---

# 8. Арифметичні вирази

    const price = 100;
    const quantity = 3;

    const message = `Total: ${price * quantity}`;

    console.log(message);
    // "Total: 300"

---

# 9. Логічні вирази

    const age = 56;

    const message = `Adult: ${age >= 18}`;

    console.log(message);
    // "Adult: true"

---

# 10. Тернарний оператор

Template literals дуже зручно використовувати разом із ternary operator.

    const age = 56;

    const message = `Status: ${age >= 18 ? "adult" : "minor"}`;

    console.log(message);
    // "Status: adult"

Ще приклад:

    const isOnline = true;

    const status = `User is ${isOnline ? "online" : "offline"}.`;

---

# 11. Виклик функції

У `${...}` можна викликати функцію.

    function getGreeting(name) {
        return `Hello, ${name}!`;
    }

    const message = `${getGreeting("Valeriy")}`;

    console.log(message);
    // "Hello, Valeriy!"

Або без зайвого зовнішнього `${}`:

    const message = getGreeting("Valeriy");

---

# 12. Виклик методу

    const name = "javascript";

    const message = `Language: ${name.toUpperCase()}`;

    console.log(message);
    // "Language: JAVASCRIPT"

---

# 13. `trim()` всередині interpolation

    const input = "   JavaScript   ";

    const message = `Language: ${input.trim()}`;

    console.log(message);
    // "Language: JavaScript"

---

# 14. `split()` + `join()` всередині template literal

    const skills = ["JavaScript", "React", "Node.js"];

    const message = `Skills: ${skills.join(", ")}`;

    console.log(message);
    // "Skills: JavaScript, React, Node.js"

---

# 15. Використання властивостей об'єкта

    const user = {
        name: "Valeriy",
        age: 56
    };

    const message = `Name: ${user.name}, Age: ${user.age}`;

    console.log(message);
    // "Name: Valeriy, Age: 56"

---

# 16. Destructuring + Template Literals

    const user = {
        firstName: "Valeriy",
        lastName: "Svystun"
    };

    const { firstName, lastName } = user;

    const message = `${firstName} ${lastName}`;

    console.log(message);
    // "Valeriy Svystun"

---

# 17. Багаторядкові рядки

Одна з головних переваг template literals — багаторядковий текст.

    const message = `Hello!
    Welcome to JavaScript.
    Have a nice day!`;

    console.log(message);

Результат:

    Hello!
    Welcome to JavaScript.
    Have a nice day!

Зі звичайними рядками довелося б використовувати `\n`:

    const message = "Hello!\nWelcome to JavaScript.\nHave a nice day!";

Template literals значно читабельніші.

---

# 18. Перенесення рядка зберігається

У template literal реальний перенос рядка стає частиною результату.

    const text = `Hello
    World`;

Результат містить newline між `Hello` та `World`.

Це важливо під час формування:

- текстових повідомлень;
- HTML;
- SQL;
- Markdown;
- email templates;
- конфігураційних текстів.

---

# 19. `\n` всередині Template Literal

Можна використовувати і escape sequence:

    const message = `Hello\nWorld`;

    console.log(message);

Результат:

    Hello
    World

Але для справжніх багаторядкових шаблонів часто зручніше просто зробити перенос у самому template literal.

---

# 20. Escape characters

Template literals підтримують escape sequences.

Наприклад:

    const text = `Line 1\nLine 2`;

    console.log(text);

Можна використовувати:

    \n
    → newline

    \t
    → tab

    \\
    → backslash

---

# 21. Як вставити backtick

Оскільки template literal використовує:

    `

для самого backtick потрібно escape:

    const text = `This is a backtick: \``;

    console.log(text);
    // This is a backtick: `

---

# 22. Як вставити `${...}` буквально

Якщо потрібно показати `${name}` як звичайний текст, можна використати escape:

    const text = `Use \${name} to insert a variable.`;

    console.log(text);
    // Use ${name} to insert a variable.

---

# 23. Template Literal як HTML-шаблон

Одна з практичних можливостей — формування HTML-рядка.

    const name = "Valeriy";

    const html = `
        <article>
            <h2>${name}</h2>
            <p>JavaScript Developer</p>
        </article>
    `;

    console.log(html);

Це особливо знайомий патерн для vanilla JavaScript.

---

# 24. HTML з даних

    const user = {
        name: "Valeriy",
        role: "Developer"
    };

    const html = `
        <article>
            <h2>${user.name}</h2>
            <p>${user.role}</p>
        </article>
    `;

---

# 25. Template Literals + DOM

Наприклад:

    const title = "Hello";
    const text = "Welcome to JavaScript";

    const container = document.querySelector("#app");

    container.innerHTML = `
        <h1>${title}</h1>
        <p>${text}</p>
    `;

Template literal зручно використовувати для побудови HTML.

> Але `innerHTML` з неперевіреними даними користувача може створити XSS-ризик. Не вставляй довільний user input в HTML без відповідної обробки.

---

# 26. Template Literals + `map()`

Дуже важливий frontend-патерн:

    const users = [
        { name: "Anna" },
        { name: "John" },
        { name: "Mike" }
    ];

    const html = users
        .map(user => `
            <li>${user.name}</li>
        `)
        .join("");

    console.log(html);

Результатом буде один HTML-рядок:

    <li>Anna</li>
    <li>John</li>
    <li>Mike</li>

---

# 27. Template Literals + `map()` + DOM

    const users = [
        { name: "Anna" },
        { name: "John" },
        { name: "Mike" }
    ];

    const list = document.querySelector("#users");

    list.innerHTML = users
        .map(user => `
            <li>${user.name}</li>
        `)
        .join("");

Це типовий vanilla JavaScript підхід до рендерингу списків.

У React/Nex​t.js JSX виконує подібну задачу іншим способом.

---

# 28. Template Literals + умовний HTML

Можна використовувати ternary:

    const user = {
        name: "Valeriy",
        isAdmin: true
    };

    const html = `
        <div>
            <h2>${user.name}</h2>
            ${user.isAdmin ? "<span>Admin</span>" : ""}
        </div>
    `;

---

# 29. Template Literals + функція

    function createUserCard(user) {
        return `
            <article class="user-card">
                <h2>${user.name}</h2>
                <p>${user.email}</p>
            </article>
        `;
    }

    const user = {
        name: "Valeriy",
        email: "user@example.com"
    };

    const html = createUserCard(user);

---

# 30. Формування повідомлень

Template literals дуже зручні для повідомлень.

    const name = "Valeriy";
    const count = 5;

    const message = `
        Hello, ${name}!
        You have ${count} new messages.
    `;

---

# 31. Формування URL

    const userId = 123;

    const url = `/users/${userId}`;

    console.log(url);
    // "/users/123"

Це один із найчастіших випадків використання template literals у frontend/backend JavaScript.

---

# 32. Формування API URL

    const userId = 123;

    const url = `/api/users/${userId}/posts`;

    console.log(url);
    // "/api/users/123/posts"

---

# 33. Template Literals + fetch

Наприклад:

    const userId = 123;

    fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });

У реальному Next.js/N​ode.js коді template literals часто використовуються для динамічних URL.

---

# 34. Формування CSS class

    const isActive = true;

    const className = `button ${isActive ? "active" : ""}`;

    console.log(className);
    // "button active"

Але часто потрібно уникати зайвих пробілів:

    const className = [
        "button",
        isActive ? "active" : ""
    ]
        .filter(Boolean)
        .join(" ");

---

# 35. Формування тексту з масиву

    const skills = ["JavaScript", "React", "Node.js"];

    const message = `My skills: ${skills.join(", ")}.`;

    console.log(message);
    // "My skills: JavaScript, React, Node.js."

---

# 36. Формування SQL-подібного тексту

Template literals дозволяють записувати багаторядкові запити:

    const query = `
        SELECT id, name, email
        FROM users
        WHERE id = $1;
    `;

Це зручно для читання SQL у Node.js.

> Значення користувача не слід вставляти безпосередньо в SQL через `${...}`. Для PostgreSQL використовуй параметризовані запити.

Небезпечно:

    const id = userInput;

    const query = `
        SELECT *
        FROM users
        WHERE id = ${id};
    `;

Правильний підхід залежить від драйвера, але загальна ідея:

    SQL → параметри окремо

Наприклад у PostgreSQL-підході:

    const query = `
        SELECT *
        FROM users
        WHERE id = $1;
    `;

    const values = [id];

---

# 37. Template Literals у Node.js

Наприклад, формування повідомлення сервера:

    const user = "Valeriy";
    const action = "login";

    const message = `[AUTH] User ${user} performed ${action}`;

    console.log(message);

---

# 38. Template Literals у логуванні

    const method = "GET";
    const url = "/api/users";
    const status = 200;

    console.log(`${method} ${url} → ${status}`);

Результат:

    GET /api/users → 200

---

# 39. Template Literals і об'єкти

Безпосередньо:

    const user = {
        name: "Valeriy"
    };

    console.log(`${user}`);

Результат:

    [object Object]

Це важливо.

Template literal автоматично перетворює значення на рядок.

Для об'єкта краще:

    console.log(`${JSON.stringify(user)}`);

Результат:

    {"name":"Valeriy"}

---

# 40. Template Literals і масиви

Масиви поводяться інакше:

    const items = ["HTML", "CSS", "JavaScript"];

    console.log(`${items}`);

Результат:

    HTML,CSS,JavaScript

Але для контролю формату краще:

    console.log(`${items.join(", ")}`);

Результат:

    HTML, CSS, JavaScript

---

# 41. `null` та `undefined`

Template literal перетворює їх на відповідні рядкові значення:

    const value = null;

    console.log(`Value: ${value}`);
    // "Value: null"

І:

    const value = undefined;

    console.log(`Value: ${value}`);
    // "Value: undefined"

Тому якщо потрібно показувати користувачу красивий текст, іноді потрібна додаткова перевірка.

---

# 42. Boolean

    const isAdmin = true;

    console.log(`Admin: ${isAdmin}`);

    // "Admin: true"

Для UI часто краще:

    const isAdmin = true;

    const message = `Role: ${isAdmin ? "Administrator" : "User"}`;

---

# 43. Числа та форматування

    const price = 1234.5;

    const message = `Price: ${price}`;

    console.log(message);
    // "Price: 1234.5"

Для локалізованого форматування краще використовувати `Intl.NumberFormat`:

    const price = 1234.5;

    const formatted = new Intl.NumberFormat("uk-UA", {
        style: "currency",
        currency: "UAH"
    }).format(price);

    const message = `Price: ${formatted}`;

---

# 44. Template Literals не є шаблонним двигуном

Template literals дозволяють вставляти JavaScript expressions:

    `Hello, ${name}`

Але це не означає, що вони автоматично є повноцінним template engine.

Для великих UI-шаблонів використовуються:

- React;
- Next.js;
- Vue;
- Angular;
- серверні template engines;
- інші спеціалізовані рішення.

Template literals — базовий JavaScript-механізм.

---

# 45. Tagged Template Literals

Більш просунута можливість — **tagged templates**.

Синтаксис:

    tag`Hello ${name}!`;

Тут template literal передається функції `tag`.

Приклад:

    function tag(strings, value) {
        console.log(strings);
        console.log(value);

        return "result";
    }

    const name = "Valeriy";

    const result = tag`Hello ${name}!`;

---

# 46. Як працює tagged template

Для:

    tag`Hello ${name}!`

JavaScript передає в `tag`:

- масив статичних частин;
- значення expressions.

Спрощено:

    strings
    → ["Hello ", "!"]

    value
    → "Valeriy"

Функція може створити власний результат.

---

# 47. Простий tagged template

    function upper(strings, ...values) {
        return strings.reduce((result, string, index) => {
            return result + string + (values[index] ?? "");
        }, "").toUpperCase();
    }

    const name = "Valeriy";

    const result = upper`Hello, ${name}!`;

    console.log(result);
    // "HELLO, VALERIY!"

Це вже advanced feature.

---

# 48. Tagged Templates — навіщо вони потрібні

Вони можуть використовуватися для:

- спеціального форматування;
- створення DSL;
- SQL-бібліотек;
- CSS-in-JS;
- безпечного escaping;
- інтернаціоналізації;
- спеціальної обробки шаблонів.

Для Junior достатньо розуміти сам принцип.

---

# 49. Template Literals vs конкатенація

### Конкатенація

    const name = "Valeriy";
    const age = 56;

    const message =
        "My name is " + name + " and I am " + age + ".";

### Template literal

    const message = `My name is ${name} and I am ${age}.`;

Template literals зазвичай читаються краще.

---

# 50. Template Literals vs `+`

Template literals особливо вигідні, коли:

- багато змінних;
- складний текст;
- кілька рядків;
- HTML;
- URL;
- повідомлення;
- форматування.

Для дуже простого об'єднання:

    const fullName = firstName + " " + lastName;

теж немає проблем.

Але:

    const fullName = `${firstName} ${lastName}`;

часто читається природніше.

---

# 51. Template Literals vs `join()`

Якщо дані вже в масиві:

    const skills = ["JS", "React", "Node"];

краще:

    skills.join(", ");

Template literal:

    `${skills}`

дасть:

    "JS,React,Node"

Тому для масивів `join()` дозволяє явно контролювати separator.

---

# 52. Template Literals vs `replace()`

Це різні інструменти.

`replace()`:

    text.replace("old", "new");

→ змінює частину вже існуючого рядка.

Template literal:

    `Hello, ${name}!`

→ створює новий рядок із динамічними значеннями.

---

# 53. Template Literals + попередні теми

Ця тема логічно об'єднує багато попередніх знань:

    String
       ↓
    properties / access
       ↓
    search
       ↓
    slice
       ↓
    case / whitespace
       ↓
    replace
       ↓
    split / join
       ↓
    template literals
       ↓
    RegExp

Наприклад:

    const input = "  JavaScript, React, Node.js  ";

    const skills = input
        .trim()
        .split(",")
        .map(item => item.trim());

    const message = `Skills: ${skills.join(", ")}.`;

    console.log(message);
    // "Skills: JavaScript, React, Node.js."

---

# 54. Практичний frontend-приклад

Є дані:

    const product = {
        name: "Laptop",
        price: 25000,
        currency: "UAH"
    };

Створюємо картку:

    const html = `
        <article class="product">
            <h2>${product.name}</h2>
            <p>${product.price} ${product.currency}</p>
        </article>
    `;

Template literal дозволяє зберігати HTML приблизно в тому вигляді, в якому він буде відображатися.

---

# 55. Практичний backend-приклад

Формування повідомлення:

    const user = {
        name: "Valeriy",
        id: 123
    };

    const message = `
        User ${user.name}
        with ID ${user.id}
        successfully logged in.
    `;

Це може бути корисно для логів або повідомлень.

---

# 56. Практичний API-приклад

    const userId = 123;
    const postId = 456;

    const endpoint = `/api/users/${userId}/posts/${postId}`;

    console.log(endpoint);
    // "/api/users/123/posts/456"

Це типовий приклад для frontend/full-stack JavaScript.

---

# 57. Практичний приклад: dynamic message

    const username = "Valeriy";
    const unreadMessages = 3;

    const message = `
        Hello, ${username}!
        You have ${unreadMessages} unread messages.
    `;

---

# 58. Практичний приклад: список

    const items = ["HTML", "CSS", "JavaScript"];

    const html = `
        <ul>
            ${items
                .map(item => `<li>${item}</li>`)
                .join("")}
        </ul>
    `;

Це дуже важливий патерн для vanilla JavaScript.

---

# 59. Читабельність template literals

Порівняй:

    const html = "<ul>" +
        "<li>" + name + "</li>" +
        "<li>" + email + "</li>" +
        "</ul>";

і:

    const html = `
        <ul>
            <li>${name}</li>
            <li>${email}</li>
        </ul>
    `;

Другий варіант значно легше читати.

---

# 60. Типова помилка №1 — забути `${}`

Неправильно:

    const name = "Valeriy";

    const message = "Hello, ${name}";

Результат:

    Hello, ${name}

Тому що `"..."` — звичайний рядок.

Правильно:

    const message = `Hello, ${name}`;

Результат:

    Hello, Valeriy

---

# 61. Типова помилка №2 — переплутати `'` і `` ` ``

Неправильно:

    const name = "Valeriy";

    const message = 'Hello, ${name}';

Правильно:

    const message = `Hello, ${name}`;

---

# 62. Типова помилка №3 — зайвий `${}`

Можна:

    const message = `Hello, ${name}!`;

Але не потрібно:

    const message = `${"Hello, "}${name}!`;

Пиши простіше:

    `Hello, ${name}!`

---

# 63. Типова помилка №4 — вставляти складну логіку

Технічно можна:

    const message = `
        User: ${users
            .filter(user => user.active)
            .map(user => user.name)
            .join(", ")}
    `;

Але якщо expression стає дуже великим, краще підготувати дані окремо:

    const activeUsers = users
        .filter(user => user.active)
        .map(user => user.name)
        .join(", ");

    const message = `Active users: ${activeUsers}`;

Так код легше читати та тестувати.

---

# 64. Типова помилка №5 — небезпечний HTML

Небезпечно:

    const userInput = "<img src=x onerror=alert('XSS')>";

    element.innerHTML = `
        <div>${userInput}</div>
    `;

Якщо значення походить від користувача, його не можна бездумно вставляти через `innerHTML`.

Безпечний підхід залежить від задачі, але часто можна використовувати:

    element.textContent = userInput;

або відповідний framework/API, який виконує escaping.

---

# 65. Типова помилка №6 — SQL Injection

Небезпечно будувати SQL так:

    const username = userInput;

    const query = `
        SELECT *
        FROM users
        WHERE username = '${username}';
    `;

Template literals тут технічно працюють, але це може створити SQL injection.

Правильний підхід:

    SQL + параметри

Наприклад:

    const query = `
        SELECT *
        FROM users
        WHERE username = $1;
    `;

    const values = [username];

Параметризовані запити — стандартний підхід для роботи з PostgreSQL.

---

# 66. Типова помилка №7 — небажані переноси та пробіли

Наприклад:

    const text = `
        Hello
        World
    `;

У результаті будуть присутні переноси та пробіли.

Якщо формат має бути точним, це потрібно враховувати.

Іноді краще:

    const text = `Hello World`;

або явно нормалізувати результат.

---

# 67. Template Literals і whitespace

Пам'ятай:

> Template literal зберігає whitespace.

Тому indentation у:

    const html = `
        <div>
            <p>Hello</p>
        </div>
    `;

є частиною отриманого рядка.

Для HTML це зазвичай не проблема, але для:

- JSON;
- SQL;
- текстових форматів;
- тестів;
- точних порівнянь

це може мати значення.

---

# 68. Міні-шпаргалка

## Простий template literal

    const message = `Hello`;

---

## Змінна

    const message = `Hello, ${name}!`;

---

## Вираз

    const result = `Total: ${price * quantity}`;

---

## Тернарний оператор

    const result = `${isOnline ? "Online" : "Offline"}`;

---

## Метод

    const result = `Name: ${name.toUpperCase()}`;

---

## Функція

    const result = `Result: ${calculate()}`;

---

## Об'єкт

    const result = `User: ${user.name}`;

---

## Масив

    const result = `Skills: ${skills.join(", ")}`;

---

## Багаторядковий рядок

    const text = `
        Line 1
        Line 2
        Line 3
    `;

---

## Динамічний URL

    const url = `/users/${userId}`;

---

## HTML

    const html = `
        <h1>${title}</h1>
        <p>${description}</p>
    `;

---

## Escape `${}`

    const text = `\${name}`;

---

## Escape backtick

    const text = `Use \`backticks\``;

---

# 69. Практичні вправи

## Вправа 1 — привітання

Створи:

    const name = "Valeriy";

За допомогою template literal отримай:

    "Hello, Valeriy!"

---

## Вправа 2 — повне ім'я

Дано:

    const firstName = "Valeriy";
    const lastName = "Svystun";

Отримати:

    "Valeriy Svystun"

---

## Вправа 3 — арифметика

Дано:

    const a = 10;
    const b = 20;

Створити:

    "10 + 20 = 30"

---

## Вправа 4 — тернарний оператор

Дано:

    const isOnline = true;

Отримати:

    "User is online"

або:

    "User is offline"

---

## Вправа 5 — масив

Дано:

    const skills = ["JavaScript", "React", "Node.js"];

Отримати:

    "Skills: JavaScript, React, Node.js"

---

## Вправа 6 — URL

Дано:

    const userId = 123;

Отримати:

    "/api/users/123"

---

## Вправа 7 — багаторядковий текст

Створи повідомлення:

    Hello, Valeriy!

    Welcome to JavaScript.
    Keep learning!

використовуючи один template literal.

---

## Вправа 8 — HTML

Дано:

    const title = "JavaScript";
    const description = "Programming language";

Створити:

    <article>
        <h2>JavaScript</h2>
        <p>Programming language</p>
    </article>

---

## Вправа 9 — список

Дано:

    const skills = ["HTML", "CSS", "JavaScript"];

Створити HTML:

    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

---

## Вправа 10 — pipeline

Дано:

    const input = " JavaScript, React, Node.js ";

Потрібно:

1. прибрати пробіли з країв;
2. розділити за комою;
3. прибрати пробіли навколо елементів;
4. зібрати назад через `", "`;
5. вставити результат у повідомлення.

Очікувано:

    "My skills: JavaScript, React, Node.js"

---

# 70. Interview Questions

### 1. Що таке Template Literal?

Це синтаксис JavaScript для створення рядків за допомогою backticks:

    `Hello, ${name}`

---

### 2. Які основні переваги Template Literals?

- interpolation;
- багаторядкові рядки;
- зручне форматування;
- embedding expressions;
- зручне формування HTML, URL та повідомлень.

---

### 3. Що означає `${...}`?

Це interpolation expression.

JavaScript обчислює вираз і вставляє його результат у рядок.

---

### 4. Чи можна використовувати вирази всередині `${...}`?

Так.

    `${10 + 20}`

Результат:

    "30"

---

### 5. Чи можна викликати функцію?

Так:

    `${getUserName()}`

---

### 6. Чи можна використовувати ternary operator?

Так:

    `${isActive ? "active" : "inactive"}`

---

### 7. Чи підтримують Template Literals багаторядковий текст?

Так.

    const text = `
        Line 1
        Line 2
    `;

---

### 8. Чим Template Literal відрізняється від звичайного рядка?

Template Literal використовує backticks і підтримує interpolation та природні багаторядкові рядки.

---

### 9. Що буде при використанні `${name}` у звичайних лапках?

Наприклад:

    "Hello, ${name}"

`${name}` не буде обчислено. Воно залишиться звичайним текстом.

---

### 10. Чи змінює Template Literal змінні?

Ні.

Він створює новий рядок на основі значень.

---

### 11. Що буде при вставці об'єкта?

Наприклад:

    `${user}`

зазвичай дасть:

    "[object Object]"

Для серіалізації можна використовувати:

    `${JSON.stringify(user)}`

---

### 12. Що таке Tagged Template Literal?

Це template literal, переданий спеціальній функції:

    tag`Hello ${name}`

Функція може самостійно обробити статичні частини та expressions.

---

### 13. Чи безпечно використовувати Template Literals для SQL?

Сам template literal не є механізмом захисту від SQL injection.

Потрібно використовувати параметризовані запити.

---

### 14. Чи безпечно вставляти user input у `innerHTML` через `${...}`?

Ні, без додаткової обробки це може створити XSS-ризик.

---

# 71. Learning Path

## 🟢 Core — обов'язково

Знати:

- backticks;
- `${...}`;
- interpolation;
- змінні;
- expressions;
- багаторядкові рядки;
- escape sequences.

Базовий шаблон:

    const message = `Hello, ${name}!`;

---

## 🟡 Junior

Вміти використовувати:

- `${...}` з виразами;
- ternary;
- methods;
- functions;
- objects;
- arrays + `join()`;
- dynamic URLs;
- HTML templates;
- `map()` + template literals;
- `split()` + `join()` + template literals.

Наприклад:

    const html = users
        .map(user => `
            <li>${user.name}</li>
        `)
        .join("");

---

## 🟠 Middle

Розуміти:

- tagged template literals;
- interpolation expressions;
- whitespace;
- escaping;
- HTML injection;
- SQL injection;
- template generation;
- separation of data and presentation;
- складні template pipelines.

---

## 🔴 Senior

Вміти оцінювати:

- безпеку динамічних шаблонів;
- XSS;
- SQL injection;
- escaping;
- performance;
- складність генерації великих шаблонів;
- необхідність framework/template engine;
- tagged templates;
- i18n;
- separation of concerns.

---

# 72. Зв'язок із Full Stack JavaScript

Template literals зустрічаються практично всюди.

## Frontend

    const url = `/api/users/${userId}`;

    const html = `
        <h2>${title}</h2>
        <p>${description}</p>
    `;

## React / Next.js

У JSX використовується схожа концепція JavaScript expressions:

    const className = `button ${isActive ? "active" : ""}`;

## Node.js

    const message = `User ${userId} logged in`;

## PostgreSQL / backend

SQL можна записувати багаторядково:

    const query = `
        SELECT id, name
        FROM users
        WHERE id = $1;
    `;

А параметри передавати окремо.

---

# 73. Головні висновки

1. Template Literals використовують backticks: `` `...` ``.
2. `${...}` дозволяє вставляти JavaScript expressions.
3. Можна вставляти змінні, арифметику, функції, методи та ternary.
4. Template literals підтримують природні багаторядкові рядки.
5. Вони часто зручніші за конкатенацію через `+`.
6. Вони добре працюють разом із `map()`, `join()`, `trim()`, `replace()` та іншими string methods.
7. Вони часто використовуються для dynamic URLs.
8. У vanilla JavaScript вони зручні для генерації HTML.
9. Template literals самі по собі не забезпечують безпеку HTML або SQL.
10. `innerHTML` + неперевірений user input може створити XSS.
11. SQL через `${userInput}` може створити SQL injection.
12. Для SQL використовуй параметризовані запити.
13. Tagged Template Literals — advanced feature, яку варто знати на рівні розуміння.
14. Головна ідея: **Template Literal = рядок + динамічні JavaScript expressions**.

---

# 🧠 Що має залишитися в голові

    `Hello, world!`

    → звичайний template literal


    const name = "Valeriy";

    `Hello, ${name}!`

    → interpolation


    `${10 + 20}`

    → expression


    `${user.name}`

    → property


    `${name.toUpperCase()}`

    → method


    `${isActive ? "active" : "inactive"}`

    → ternary


    `
        Line 1
        Line 2
        Line 3
    `

    → multiline string


    `/api/users/${userId}`

    → dynamic URL


    `
        <h2>${title}</h2>
        <p>${description}</p>
    `

    → dynamic HTML


    users
        .map(user => `<li>${user.name}</li>`)
        .join("")

    → Array → HTML string


    Template Literal
        ↓
    `${expression}`
        ↓
    JavaScript обчислює expression
        ↓
    результат вставляється в String

---

# 🔑 Формула теми

    Template Literal
        =
    backticks
        +
    interpolation
        +
    expressions
        +
    multiline strings

    `Hello, ${name}!`

    ↓

    String
        +
    dynamic data
        +
    readable syntax