# 03. Text & HTML у DOM

## 📌 Вступ

Після того як ми навчилися знаходити елементи в DOM і переміщатися між ними, наступний крок — **читати та змінювати їхній текст і HTML-вміст**.

У JavaScript для роботи з текстом і HTML найчастіше використовуються:

- `textContent`
- `innerText`
- `innerHTML`
- `outerHTML`

Ці властивості схожі, але мають **різне призначення**.

Основна ідея:

    element.textContent = "Новий текст";

    element.innerHTML = "<strong>Новий HTML</strong>";

---

# 1. DOM і вміст елемента

Наприклад, маємо HTML:

    <div class="card">
        <h2>JavaScript</h2>
        <p>Вивчаємо DOM</p>
    </div>

JavaScript може отримати цей елемент:

    const card = document.querySelector(".card");

Після цього ми можемо працювати з його вмістом:

    console.log(card.textContent);

або:

    console.log(card.innerHTML);

Важливо розуміти:

    textContent → працює з текстом

    innerHTML → працює з HTML-кодом усередині елемента

    outerHTML → працює з самим елементом разом із його HTML

---

# 2. `textContent`

## Що це?

`textContent` повертає або встановлює **весь текстовий вміст елемента**.

### Отримання тексту

HTML:

    <h1 class="title">Hello JavaScript</h1>

JavaScript:

    const title = document.querySelector(".title");

    console.log(title.textContent);

Результат:

    Hello JavaScript

---

## Зміна тексту

    title.textContent = "Привіт, JavaScript!";

DOM стане:

    <h1 class="title">Привіт, JavaScript!</h1>

---

# 3. `textContent` і вкладені елементи

`textContent` включає текст усіх дочірніх елементів.

HTML:

    <div class="message">
        Hello
        <strong>JavaScript</strong>
    </div>

JavaScript:

    const message = document.querySelector(".message");

    console.log(message.textContent);

Результат приблизно:

    Hello
    JavaScript

Тобто:

    message.textContent

отримує текст не тільки самого `div`, а й текст його дочірніх елементів.

---

# 4. `textContent` при встановленні значення

Якщо записати:

    message.textContent = "<strong>Hello</strong>";

JavaScript **не створить `<strong>`**.

Він вставить звичайний текст:

    <strong>Hello</strong>

На сторінці користувач побачить:

    <strong>Hello</strong>

Тобто HTML-теги будуть сприйматися як текст.

Це одна з головних відмінностей:

    element.textContent = "<strong>Hello</strong>";

    → текст

а:

    element.innerHTML = "<strong>Hello</strong>";

    → HTML

---

# 5. `textContent` і безпека

`textContent` особливо корисний, коли потрібно вставити текст, який походить від користувача.

Наприклад:

    const username = "<img src=x onerror=alert('XSS')>";

    element.textContent = username;

Текст буде вставлений як текст, а не як HTML.

Тому для звичайного відображення користувацького тексту краще використовувати:

    textContent

а не:

    innerHTML

---

# 6. `innerHTML`

## Що це?

`innerHTML` дозволяє отримати або змінити **HTML-код усередині елемента**.

HTML:

    <div class="content">
        <p>Hello</p>
    </div>

JavaScript:

    const content = document.querySelector(".content");

    console.log(content.innerHTML);

Результат може виглядати приблизно так:

    <p>Hello</p>

---

# 7. Зміна HTML через `innerHTML`

Можна вставити HTML:

    content.innerHTML = "<p>Hello JavaScript</p>";

DOM:

    <div class="content">
        <p>Hello JavaScript</p>
    </div>

Можна створити складнішу структуру:

    content.innerHTML = `
        <h2>JavaScript</h2>
        <p>Вивчаємо DOM</p>
    `;

DOM:

    <div class="content">
        <h2>JavaScript</h2>
        <p>Вивчаємо DOM</p>
    </div>

---

# 8. `innerHTML` повертає HTML, а не тільки текст

HTML:

    <div class="card">
        <h2>JavaScript</h2>
        <p>DOM API</p>
    </div>

JavaScript:

    const card = document.querySelector(".card");

    console.log(card.innerHTML);

Результат:

    <h2>JavaScript</h2>
    <p>DOM API</p>

А:

    console.log(card.textContent);

дасть тільки текст:

    JavaScript
    DOM API

---

# 9. `textContent` vs `innerHTML`

HTML:

    <div class="box">
        <strong>Hello</strong>
    </div>

### `textContent`

    const box = document.querySelector(".box");

    console.log(box.textContent);

Результат:

    Hello

### `innerHTML`

    console.log(box.innerHTML);

Результат:

    <strong>Hello</strong>

Запам'ятати:

    textContent → що користувач бачить як текст

    innerHTML → HTML-структура всередині

---

# 10. Встановлення `innerHTML`

При встановленні:

    box.innerHTML = "<strong>Hello</strong>";

браузер аналізує рядок як HTML.

У DOM з'явиться:

    <strong>Hello</strong>

Тому:

    box.innerHTML = "<strong>Hello</strong>";

не еквівалентно:

    box.textContent = "<strong>Hello</strong>";

---

# 11. HTML-шаблони через template literals

`innerHTML` часто використовують разом із template literals:

    const name = "Valeriy";

    card.innerHTML = `
        <h2>Hello, ${name}!</h2>
        <p>Welcome!</p>
    `;

Це зручно для невеликих динамічних UI-шаблонів.

---

# 12. `innerHTML` і повна заміна вмісту

Важливий момент:

    element.innerHTML = "...";

не додає HTML до існуючого вмісту.

Він **замінює весь внутрішній HTML**.

Було:

    <div class="list">
        <p>One</p>
        <p>Two</p>
    </div>

Виконуємо:

    list.innerHTML = "<p>Three</p>";

Стане:

    <div class="list">
        <p>Three</p>
    </div>

`One` і `Two` будуть видалені з DOM.

---

# 13. Додавання через `innerHTML +=`

Можна побачити такий код:

    list.innerHTML += "<p>Three</p>";

Здавалося б, це просто додає новий елемент.

Але фактично це приблизно:

    list.innerHTML = list.innerHTML + "<p>Three</p>";

Тобто браузер:

1. читає весь `innerHTML`;
2. додає новий рядок;
3. заново парсить HTML;
4. замінює внутрішній DOM.

Для простих навчальних прикладів це нормально.

Але для складного DOM це може мати важливі наслідки.

---

# 14. Важливий недолік `innerHTML +=`

Наприклад:

    list.innerHTML = `
        <button class="button">Click</button>
    `;

Можна отримати кнопку:

    const button = list.querySelector(".button");

І додати обробник:

    button.addEventListener("click", () => {
        console.log("Clicked");
    });

Після цього:

    list.innerHTML += "<p>Hello</p>";

браузер перебудує внутрішній HTML.

Старий `button` може бути замінений новим DOM-вузлом.

У результаті прив'язаний до старого вузла event listener буде втрачений.

Тому:

    innerHTML += ...

не варто розглядати як універсальний спосіб додавання елементів.

Для створення та додавання DOM-елементів пізніше ми будемо використовувати:

    createElement()
    append()
    prepend()
    before()
    after()

---

# 15. `outerHTML`

## Що це?

`outerHTML` містить:

- сам елемент;
- його атрибути;
- весь його внутрішній HTML.

Наприклад:

    <div class="card">
        <h2>JavaScript</h2>
    </div>

Маємо:

    const card = document.querySelector(".card");

    console.log(card.outerHTML);

Результат:

    <div class="card">
        <h2>JavaScript</h2>
    </div>

---

# 16. `innerHTML` vs `outerHTML`

Для:

    <div class="card">
        <h2>JavaScript</h2>
    </div>

### `innerHTML`

    card.innerHTML

Результат:

    <h2>JavaScript</h2>

### `outerHTML`

    card.outerHTML

Результат:

    <div class="card">
        <h2>JavaScript</h2>
    </div>

Тобто:

    innerHTML → тільки всередині

    outerHTML → елемент + всередині

---

# 17. Встановлення `outerHTML`

Можна не тільки читати, а й встановлювати:

    card.outerHTML = `
        <section class="new-card">
            <h2>New content</h2>
        </section>
    `;

Старий `card` буде замінений новим HTML-елементом.

Було:

    <div class="card">
        <h2>JavaScript</h2>
    </div>

Стане:

    <section class="new-card">
        <h2>New content</h2>
    </section>

Для повсякденної роботи `outerHTML` використовується значно рідше, ніж `textContent` та `innerHTML`.

---

# 18. `innerText`

## Що це?

`innerText` повертає текст, орієнтуючись на **видимий текстовий вміст** елемента.

Наприклад:

    <div>
        Hello
        <span style="display: none">Hidden</span>
        JavaScript
    </div>

`textContent` включає текст прихованого елемента:

    element.textContent

може повернути:

    Hello
    Hidden
    JavaScript

А:

    element.innerText

орієнтується на те, що реально відображається, тому:

    Hello
    JavaScript

---

# 19. `textContent` vs `innerText`

Це важлива співбесідна тема.

### `textContent`

Працює з текстовим вмістом DOM.

    element.textContent

Не орієнтується на те, чи текст візуально прихований через CSS.

### `innerText`

Орієнтується на **видимий текст** і враховує особливості рендерингу.

    element.innerText

Тому `innerText` може бути повільнішим, оскільки браузеру іноді потрібно враховувати layout/rendering.

---

# 20. Коли використовувати `textContent`

У більшості випадків, коли потрібно:

- прочитати текст;
- встановити текст;
- замінити текст;
- вставити користувацький текст;
- безпечно відобразити звичайний рядок.

Наприклад:

    const title = document.querySelector(".title");

    title.textContent = "Новий заголовок";

---

# 21. Коли використовувати `innerText`

Коли принципово важливо отримати саме **видимий текст**.

Наприклад:

    const text = element.innerText;

Це може бути корисно для:

- аналізу видимого тексту;
- UI-логіки;
- роботи з текстом, який залежить від CSS.

Але для звичайної зміни тексту краще звикнути до:

    textContent

---

# 22. Порівняння чотирьох властивостей

| Властивість | Що отримує | Що встановлює |
|---|---|---|
| `textContent` | текстовий вміст | текст |
| `innerText` | видимий текст | текст |
| `innerHTML` | HTML усередині | HTML усередині |
| `outerHTML` | елемент + HTML | замінює сам елемент |

Коротко:

    textContent
    ↓
    текст

    innerText
    ↓
    видимий текст

    innerHTML
    ↓
    HTML всередині

    outerHTML
    ↓
    весь елемент

---

# 23. `textContent` — безпечний текст

Розглянемо:

    const userInput = "<strong>Hello</strong>";

    message.textContent = userInput;

На сторінці буде показано:

    <strong>Hello</strong>

як текст.

А:

    message.innerHTML = userInput;

створить:

    <strong>Hello</strong>

як HTML-елемент.

Тому:

    textContent

є хорошим вибором для звичайних даних від користувача.

---

# 24. Небезпека `innerHTML` і XSS

Якщо вставляти неперевірені дані користувача через `innerHTML`, можна створити вразливість XSS.

Наприклад:

    const userInput = getUserInput();

    element.innerHTML = userInput;

Якщо `userInput` містить небезпечний HTML або JavaScript-контекст, це може створити проблему безпеки.

Тому правило:

> **Не вставляй неперевірені користувацькі дані через `innerHTML`.**

Для простого тексту:

    element.textContent = userInput;

Безпечніший варіант.

---

# 25. `innerHTML` не є "поганим"

Не потрібно робити висновок:

    innerHTML = погано

Правильніше:

    innerHTML = потужний інструмент

Він корисний, коли ми **самі контролюємо HTML**, який вставляємо.

Наприклад:

    const html = `
        <article class="post">
            <h2>JavaScript</h2>
            <p>DOM manipulation</p>
        </article>
    `;

    container.innerHTML = html;

Тут HTML створюємо ми, а не отримуємо безпосередньо від користувача.

---

# 26. Читання тексту з елемента

HTML:

    <h2 class="title">JavaScript DOM</h2>

JavaScript:

    const title = document.querySelector(".title");

    const text = title.textContent;

    console.log(text);

Результат:

    JavaScript DOM

---

# 27. Зміна тексту

    const title = document.querySelector(".title");

    title.textContent = "DOM Manipulation";

Це один із найчастіших DOM-патернів:

    знайти елемент
    ↓
    змінити textContent

---

# 28. Оновлення лічильника

HTML:

    <p class="counter">0</p>

JavaScript:

    const counter = document.querySelector(".counter");

    let count = 0;

    count++;

    counter.textContent = count;

На сторінці:

    1

Наступний крок:

    count++;

    counter.textContent = count;

Результат:

    2

---

# 29. Виведення результату

HTML:

    <div class="result"></div>

JavaScript:

    const result = document.querySelector(".result");

    const number = 10;
    const doubled = number * 2;

    result.textContent = doubled;

На сторінці:

    20

Це дуже типовий патерн для навчальних JavaScript-проєктів:

    data
    ↓
    JavaScript calculation
    ↓
    textContent
    ↓
    UI

---

# 30. Виведення тексту через template literals

    const name = "Valeriy";
    const age = 56;

    element.textContent = `Name: ${name}, age: ${age}`;

Результат:

    Name: Valeriy, age: 56

Якщо нам потрібен просто текст, `textContent` — хороший варіант.

---

# 31. Виведення HTML через template literals

Якщо потрібно сформувати HTML:

    const name = "Valeriy";

    element.innerHTML = `
        <h2>Hello, ${name}</h2>
        <p>Welcome!</p>
    `;

Тут `${name}` потрібно розглядати як дані, які ми вставляємо в HTML.

Якщо ці дані походять від користувача, потрібно бути обережним із XSS.

---

# 32. Перевірка HTML-вмісту

Можна подивитися, що знаходиться всередині:

    console.log(element.innerHTML);

Наприклад:

    <h2>Title</h2>
    <p>Description</p>

Це зручно під час debugging.

---

# 33. Видалення внутрішнього HTML

Щоб очистити елемент:

    element.innerHTML = "";

Наприклад:

    list.innerHTML = "";

Весь внутрішній HTML буде видалений.

HTML:

    <div class="list">
        <p>One</p>
        <p>Two</p>
        <p>Three</p>
    </div>

Після:

    list.innerHTML = "";

отримаємо:

    <div class="list"></div>

---

# 34. Очищення через `textContent`

Також можна очистити елемент:

    element.textContent = "";

Результат буде таким самим:

    <div class="list"></div>

Для простого очищення часто можна використовувати:

    element.textContent = "";

або:

    element.innerHTML = "";

Якщо ми працюємо саме з текстом — логічніше використовувати `textContent`.

---

# 35. `innerHTML` та DOM-елементи

HTML:

    <div class="container">
        <p>Hello</p>
    </div>

Після:

    container.innerHTML = "<p>New</p>";

старий `<p>` видаляється і створюється новий DOM-вузол.

Це важливо розуміти при роботі з:

- event listeners;
- посиланнями на DOM-елементи;
- складним UI;
- динамічним DOM.

---

# 36. Текст і HTML — принципова різниця

Запам'ятай цей приклад:

    element.textContent = "<h1>Hello</h1>";

Результат:

    <h1>Hello</h1>

як текст.

А:

    element.innerHTML = "<h1>Hello</h1>";

Результат:

    Hello

як заголовок `<h1>`.

Тобто:

    textContent → не парсить HTML

    innerHTML → парсить HTML

---

# 37. Робота з дочірнім HTML

HTML:

    <article class="article">
        <h2>JavaScript</h2>
        <p>DOM is interesting.</p>
    </article>

JavaScript:

    const article = document.querySelector(".article");

    console.log(article.innerHTML);

Отримуємо HTML дочірніх елементів.

Можна повністю замінити його:

    article.innerHTML = `
        <h2>TypeScript</h2>
        <p>TypeScript extends JavaScript.</p>
    `;

---

# 38. `innerHTML` для списку

HTML:

    <ul class="users"></ul>

JavaScript:

    const users = ["Anna", "John", "Kate"];

    const list = document.querySelector(".users");

    list.innerHTML = `
        <li>${users[0]}</li>
        <li>${users[1]}</li>
        <li>${users[2]}</li>
    `;

Результат:

    <ul class="users">
        <li>Anna</li>
        <li>John</li>
        <li>Kate</li>
    </ul>

Але для масивів із довільною кількістю елементів зручніше буде використовувати цикли або методи масивів.

Наприклад:

    list.innerHTML = users
        .map(user => `<li>${user}</li>`)
        .join("");

Це вже хороший приклад поєднання:

    Array methods
    +
    template literals
    +
    innerHTML

---

# 39. Практичний приклад: картка користувача

HTML:

    <div class="user-card"></div>

JavaScript:

    const user = {
        name: "Anna",
        role: "Developer"
    };

    const card = document.querySelector(".user-card");

    card.innerHTML = `
        <h2>${user.name}</h2>
        <p>${user.role}</p>
    `;

Результат:

    <div class="user-card">
        <h2>Anna</h2>
        <p>Developer</p>
    </div>

---

# 40. Практичний приклад: зміна заголовка

HTML:

    <h1 class="title">Old title</h1>

JavaScript:

    const title = document.querySelector(".title");

    title.textContent = "New title";

Це базова DOM-операція, яку потрібно вміти робити без підказок.

---

# 41. Практичний приклад: повідомлення

HTML:

    <div class="message"></div>

JavaScript:

    const message = document.querySelector(".message");

    message.textContent = "Data loaded successfully.";

---

# 42. Практичний приклад: помилка

    const error = document.querySelector(".error");

    error.textContent = "Invalid value.";

---

# 43. Практичний приклад: результат обчислення

HTML:

    <input class="number" type="number">
    <div class="result"></div>

JavaScript:

    const input = document.querySelector(".number");
    const result = document.querySelector(".result");

    const number = Number(input.value);

    result.textContent = number * 2;

Тут:

    input
    ↓
    value
    ↓
    Number()
    ↓
    calculation
    ↓
    textContent
    ↓
    UI

---

# 44. `textContent` і пробіли

При читанні `textContent` можуть бути присутні пробіли та переноси рядків із HTML.

Наприклад:

    <div>
        Hello
        <span>JavaScript</span>
    </div>

Можна отримати:

    "\n    Hello\n    JavaScript\n"

Тому іноді використовують:

    element.textContent.trim();

Наприклад:

    const text = element.textContent.trim();

`trim()` видалить пробіли та переноси рядків на початку і в кінці.

---

# 45. `textContent.trim()`

Дуже поширений патерн:

    const text = element.textContent.trim();

Наприклад:

    <p class="username">
        Valeriy
    </p>

Маємо:

    const username = document.querySelector(".username");

    console.log(username.textContent.trim());

Результат:

    Valeriy

---

# 46. `innerHTML` і пробіли

`innerHTML` повертає HTML як рядок.

Тому форматування HTML може бути частиною отриманого результату.

Наприклад:

    console.log(container.innerHTML);

може показати:

    <h2>Title</h2>
    <p>Text</p>

Не потрібно покладатися на точне форматування пробілів у `innerHTML`.

---

# 47. `textContent` vs `innerText` — головна ідея

Запам'ятай:

    textContent
    ↓
    DOM-текст

    innerText
    ↓
    видимий текст

Наприклад:

    <span style="display: none">
        Secret
    </span>

`textContent` може включити:

    Secret

`innerText` не включатиме прихований текст.

---

# 48. `innerHTML` vs `outerHTML`

Запам'ятай структуру:

    <div class="box">
        <p>Hello</p>
    </div>

### `innerHTML`

    <p>Hello</p>

### `outerHTML`

    <div class="box">
        <p>Hello</p>
    </div>

Отже:

    innerHTML = всередині

    outerHTML = сам елемент + всередині

---

# 49. Чого не варто робити

## ❌ Не використовуй `innerHTML` для звичайного тексту

Погано:

    element.innerHTML = userName;

Якщо потрібно просто показати текст:

    element.textContent = userName;

---

## ❌ Не вважай `innerHTML +=` простим append

Не варто думати:

    element.innerHTML += html;

це те саме, що:

    element.append(...);

Це різні механізми.

---

## ❌ Не забувай про заміну DOM

Після:

    element.innerHTML = "...";

старі дочірні елементи можуть бути видалені та замінені новими.

---

## ❌ Не плутай текст із HTML

    textContent → текст

    innerHTML → HTML

---

# 50. Вибір правильної властивості

## Потрібно отримати текст?

    element.textContent

## Потрібно встановити текст?

    element.textContent = "Hello";

## Потрібен саме видимий текст?

    element.innerText

## Потрібно отримати HTML усередині?

    element.innerHTML

## Потрібно встановити HTML усередині?

    element.innerHTML = "<p>Hello</p>";

## Потрібно отримати весь HTML самого елемента?

    element.outerHTML

---

# 51. Практичний алгоритм

Коли потрібно змінити інформацію на сторінці:

### Крок 1. Знайти елемент

    const element = document.querySelector(".result");

### Крок 2. Визначити, що потрібно вставити

Якщо це текст:

    "Hello"

Використовуємо:

    element.textContent = "Hello";

Якщо це HTML:

    "<strong>Hello</strong>"

Використовуємо:

    element.innerHTML = "<strong>Hello</strong>";

---

# 52. Міні-патерни

### Змінити текст

    element.textContent = "Hello";

### Прочитати текст

    const text = element.textContent;

### Прочитати видимий текст

    const text = element.innerText;

### Очистити текст

    element.textContent = "";

### Отримати HTML

    const html = element.innerHTML;

### Вставити HTML

    element.innerHTML = "<p>Hello</p>";

### Отримати весь елемент

    const html = element.outerHTML;

### Замінити весь елемент

    element.outerHTML = "<section>Hello</section>";

---

# 53. `textContent` + `trim()`

Корисний патерн для отримання чистого тексту:

    const text = element.textContent.trim();

Наприклад:

    const title = document.querySelector(".title");

    const value = title.textContent.trim();

    console.log(value);

---

# 54. `textContent` + template literal

    const name = "Anna";
    const role = "Developer";

    element.textContent = `${name} — ${role}`;

Результат:

    Anna — Developer

Це хороший варіант, коли HTML не потрібен.

---

# 55. `innerHTML` + template literal

    const name = "Anna";
    const role = "Developer";

    element.innerHTML = `
        <h2>${name}</h2>
        <p>${role}</p>
    `;

Це зручно, коли потрібно створити невеликий HTML-фрагмент.

---

# 56. Текст чи HTML?

Перед використанням властивості постав собі питання:

> **Мені потрібен текст чи HTML?**

Якщо текст:

    textContent

Якщо HTML:

    innerHTML

Наприклад:

    element.textContent = "<p>Hello</p>";

→ текст.

    element.innerHTML = "<p>Hello</p>";

→ HTML.

---

# 57. Типова структура DOM-практики

У навчальних задачах часто буде така схема:

    HTML
      ↓
    querySelector()
      ↓
    DOM element
      ↓
    textContent / innerHTML
      ↓
    зміна UI

Наприклад:

    const result = document.querySelector(".result");

    const value = 10 + 20;

    result.textContent = value;

---

# 58. Практична вправа №1 — змінити заголовок

HTML:

    <h1 class="title">JavaScript</h1>

Завдання:

Змінити заголовок на:

    DOM Manipulation

Рішення:

    const title = document.querySelector(".title");

    title.textContent = "DOM Manipulation";

---

# 59. Практична вправа №2 — змінити опис

HTML:

    <p class="description">Old description</p>

Завдання:

Змінити текст на:

    Learning DOM

Рішення:

    const description = document.querySelector(".description");

    description.textContent = "Learning DOM";

---

# 60. Практична вправа №3 — вставити HTML

HTML:

    <div class="content"></div>

Завдання:

Створити всередині:

    <h2>JavaScript</h2>
    <p>DOM API</p>

Рішення:

    const content = document.querySelector(".content");

    content.innerHTML = `
        <h2>JavaScript</h2>
        <p>DOM API</p>
    `;

---

# 61. Практична вправа №4 — очистити елемент

HTML:

    <div class="message">
        Hello
    </div>

Завдання:

Очистити його.

Рішення:

    const message = document.querySelector(".message");

    message.textContent = "";

---

# 62. Практична вправа №5 — прочитати текст

HTML:

    <h2 class="title">JavaScript DOM</h2>

Завдання:

Отримати текст у змінну.

Рішення:

    const title = document.querySelector(".title");

    const text = title.textContent;

    console.log(text);

---

# 63. Практична вправа №6 — отримати HTML

HTML:

    <div class="card">
        <h2>JavaScript</h2>
        <p>DOM</p>
    </div>

Завдання:

Отримати HTML усередині `.card`.

Рішення:

    const card = document.querySelector(".card");

    console.log(card.innerHTML);

---

# 64. Практична вправа №7 — текст без зайвих пробілів

HTML:

    <p class="name">
        Valeriy
    </p>

Рішення:

    const name = document.querySelector(".name");

    const value = name.textContent.trim();

    console.log(value);

---

# 65. Практична вправа №8 — створити повідомлення

HTML:

    <div class="result"></div>

JavaScript:

    const result = document.querySelector(".result");

    const success = true;

    if (success) {
        result.textContent = "Operation successful";
    } else {
        result.textContent = "Operation failed";
    }

---

# 66. Практична вправа №9 — створити HTML-картку

HTML:

    <div class="container"></div>

JavaScript:

    const container = document.querySelector(".container");

    const product = {
        name: "Laptop",
        price: 1000
    };

    container.innerHTML = `
        <article class="product">
            <h2>${product.name}</h2>
            <p>Price: $${product.price}</p>
        </article>
    `;

---

# 67. Практична вправа №10 — список

HTML:

    <ul class="list"></ul>

JavaScript:

    const list = document.querySelector(".list");

    const languages = [
        "JavaScript",
        "TypeScript",
        "Python"
    ];

    list.innerHTML = languages
        .map(language => `<li>${language}</li>`)
        .join("");

Це вже практичний зв'язок:

    Array.map()
    +
    template literal
    +
    join()
    +
    innerHTML

---

# 68. Типові помилки

## ❌ Помилка 1 — використання `innerHTML` замість `textContent`

    element.innerHTML = userInput;

Якщо потрібен просто текст:

    element.textContent = userInput;

---

## ❌ Помилка 2 — очікування HTML від `textContent`

    element.textContent = "<strong>Hello</strong>";

`<strong>` не стане HTML-елементом.

---

## ❌ Помилка 3 — плутати `innerHTML` і `outerHTML`

    innerHTML → вміст

    outerHTML → елемент разом із вмістом

---

## ❌ Помилка 4 — забути про повну заміну

    element.innerHTML = "<p>New</p>";

Весь попередній внутрішній HTML буде замінений.

---

## ❌ Помилка 5 — небезпечний `innerHTML`

    element.innerHTML = userInput;

Не вставляй неперевірений користувацький HTML без відповідної санітизації.

---

## ❌ Помилка 6 — очікувати, що `innerHTML +=` просто додасть DOM-вузол

    element.innerHTML += "<p>New</p>";

Це перебудова внутрішнього HTML, а не те саме, що:

    element.append(newElement);

---

# 69. Що потрібно пам'ятати

### `textContent`

    element.textContent

Отримати або змінити текстовий вміст.

---

### `innerText`

    element.innerText

Працює з видимим текстом і враховує rendering.

---

### `innerHTML`

    element.innerHTML

Отримати або змінити HTML усередині елемента.

---

### `outerHTML`

    element.outerHTML

Отримати або замінити сам елемент разом із його HTML.

---

# 70. Головне порівняння

    ┌──────────────────────────────────────┐
    │ <div class="box">                   │
    │     <strong>Hello</strong>           │
    │ </div>                               │
    └──────────────────────────────────────┘

    box.textContent
    ↓
    Hello

    box.innerText
    ↓
    Hello

    box.innerHTML
    ↓
    <strong>Hello</strong>

    box.outerHTML
    ↓
    <div class="box">
        <strong>Hello</strong>
    </div>

---

# 71. Core — що потрібно знати обов'язково

На базовому рівні потрібно впевнено знати:

- `textContent`
- `innerText`
- `innerHTML`
- `outerHTML`
- різницю між текстом і HTML;
- як змінити текст;
- як отримати текст;
- як вставити HTML;
- як очистити елемент;
- `textContent.trim()`;
- чому `innerHTML` небезпечний для неперевірених даних.

Мінімум:

    const element = document.querySelector(".element");

    element.textContent = "Hello";

    element.innerHTML = "<strong>Hello</strong>";

---

# 72. Junior — що потрібно вміти

На Junior-рівні:

- динамічно оновлювати UI;
- працювати з `textContent`;
- створювати прості HTML-шаблони через `innerHTML`;
- використовувати template literals;
- комбінувати `map()` + `innerHTML`;
- розуміти повну заміну DOM при `innerHTML = ...`;
- розуміти проблему `innerHTML +=`;
- розуміти XSS на базовому рівні;
- знати різницю `textContent` / `innerText`;
- знати різницю `innerHTML` / `outerHTML`.

---

# 73. Middle — що варто розуміти

На Middle-рівні:

- розуміти DOM parsing;
- розуміти наслідки заміни дочірніх вузлів;
- розуміти вплив `innerHTML` на event listeners;
- знати, коли краще використовувати `createElement`;
- розуміти XSS та HTML sanitization;
- розуміти різницю між DOM representation і rendered text;
- враховувати performance при масовій роботі з DOM;
- розуміти, чому `innerText` може спричиняти layout/reflow-related роботу браузера.

---

# 74. Senior — що варто знати

На Senior-рівні:

- DOM parsing;
- HTML parsing;
- DOM tree;
- rendering pipeline;
- layout;
- paint;
- reflow/recalculation;
- XSS;
- HTML sanitization;
- Trusted Types;
- `DocumentFragment`;
- ефективна побудова великого DOM;
- SSR/CSR;
- hydration;
- DOM reconciliation у React та інших UI-бібліотеках.

Для звичайного vanilla JavaScript-проєкту більшість цих тем не потрібна на старті.

---

# 75. DOM у React

У vanilla JavaScript ми часто робимо:

    const title = document.querySelector(".title");

    title.textContent = "Hello";

У React зазвичай не потрібно безпосередньо змінювати DOM.

Замість:

    element.textContent = "Hello";

ми змінюємо state:

    setTitle("Hello");

і React сам оновлює DOM.

Тому знання vanilla DOM залишається важливим, оскільки воно пояснює, **що насправді відбувається під React**.

---

# 76. Зв'язок із наступними темами

Цей розділ:

    03-text-html

логічно пов'язаний із:

    01-element-selection
        ↓
    02-dom-traversal
        ↓
    03-text-html
        ↓
    04-attributes
        ↓
    05-classes
        ↓
    06-styles
        ↓
    07-create-elements
        ↓
    08-insert-elements
        ↓
    09-remove-elements
        ↓
    10-events

Тобто ми поступово вчимося:

    знайти
      ↓
    переміститися
      ↓
    прочитати / змінити
      ↓
    змінити атрибути
      ↓
    змінити класи
      ↓
    змінити стилі
      ↓
    створити
      ↓
    вставити
      ↓
    видалити
      ↓
    реагувати на дії користувача

---

# 77. Міні-шпаргалка

## Отримати текст

    element.textContent

## Встановити текст

    element.textContent = "Hello";

## Отримати видимий текст

    element.innerText

## Встановити видимий текст

    element.innerText = "Hello";

## Отримати HTML усередині

    element.innerHTML

## Встановити HTML усередині

    element.innerHTML = "<p>Hello</p>";

## Отримати весь HTML елемента

    element.outerHTML

## Замінити весь елемент

    element.outerHTML = "<section>Hello</section>";

## Очистити

    element.textContent = "";

або:

    element.innerHTML = "";

## Прибрати зайві пробіли

    element.textContent.trim()

---

# 78. Порівняльна шпаргалка

| Завдання | Інструмент |
|---|---|
| Отримати текст | `textContent` |
| Встановити текст | `textContent = ...` |
| Отримати видимий текст | `innerText` |
| Встановити текст | `innerText = ...` |
| Отримати HTML всередині | `innerHTML` |
| Встановити HTML всередині | `innerHTML = ...` |
| Отримати весь елемент | `outerHTML` |
| Замінити весь елемент | `outerHTML = ...` |
| Очистити текст | `textContent = ""` |
| Очистити HTML | `innerHTML = ""` |
| Прибрати зовнішні пробіли | `.trim()` |

---

# 79. Питання для співбесіди

### 1. Що таке `textContent`?

Властивість для отримання або зміни текстового вмісту DOM-елемента.

---

### 2. Чим `textContent` відрізняється від `innerText`?

`textContent` працює з текстовим вмістом DOM, а `innerText` орієнтується на текст, який є видимим з урахуванням rendering/CSS.

---

### 3. Чим `textContent` відрізняється від `innerHTML`?

`textContent` працює з текстом, а `innerHTML` — з HTML-кодом.

---

### 4. Що станеться?

    element.textContent = "<strong>Hello</strong>";

Буде встановлений звичайний текст:

    <strong>Hello</strong>

---

### 5. Що станеться?

    element.innerHTML = "<strong>Hello</strong>";

Буде створений HTML-елемент `<strong>` із текстом `Hello`.

---

### 6. Що повертає `innerHTML`?

HTML-вміст усередині елемента.

---

### 7. Що повертає `outerHTML`?

HTML самого елемента разом із його внутрішнім HTML.

---

### 8. Що станеться при:

    element.innerHTML = "";

Весь внутрішній HTML буде видалений.

---

### 9. Чому небезпечно використовувати `innerHTML` з даними користувача?

Тому що вставка неперевіреного HTML може створити XSS-вразливість.

---

### 10. Що краще використовувати для звичайного тексту?

    textContent

---

### 11. Чому `innerHTML +=` може бути проблемним?

Тому що браузер може перебудувати внутрішній DOM, через що старі дочірні DOM-вузли будуть замінені новими, а прив'язані до них event listeners можуть втратитися.

---

### 12. Чим `innerHTML` відрізняється від `outerHTML`?

    innerHTML → HTML усередині елемента

    outerHTML → сам елемент + HTML усередині

---

# 80. Головне

Якщо звести весь розділ до кількох правил:

    1. Потрібен текст → textContent

    2. Потрібен саме видимий текст → innerText

    3. Потрібен HTML усередині → innerHTML

    4. Потрібен весь елемент → outerHTML

    5. Користувацький текст → textContent

    6. Не вставляй неперевірений user input через innerHTML

    7. innerHTML = "..."
       замінює весь внутрішній HTML

    8. innerHTML += "..."
       не те саме, що append()

    9. textContent.trim()
       корисний для очищення тексту від зайвих пробілів

    10. У більшості простих задач:
        textContent — для тексту
        innerHTML — для контрольованого HTML

---

# 81. Фінальна модель

Варто бачити DOM приблизно так:

    DOM ELEMENT
         │
         ├── textContent
         │      └── текстовий вміст
         │
         ├── innerText
         │      └── видимий текст
         │
         ├── innerHTML
         │      └── HTML усередині
         │
         └── outerHTML
                └── весь HTML елемента

А типовий DOM-код:

    const element = document.querySelector(".element");

    // прочитати текст
    const text = element.textContent;

    // змінити текст
    element.textContent = "Hello";

    // прочитати HTML
    const html = element.innerHTML;

    // замінити HTML
    element.innerHTML = `
        <strong>Hello</strong>
        <p>JavaScript</p>
    `;

Це базова основа роботи з вмістом DOM, на якій далі будуються **атрибути, класи, стилі, створення та вставка елементів і події**.