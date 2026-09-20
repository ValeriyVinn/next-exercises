# 06. Styles у DOM

## 📌 Що таке робота зі стилями через DOM?

JavaScript може змінювати CSS-стилі HTML-елементів безпосередньо під час виконання програми.

Це дозволяє:

- змінювати колір;
- змінювати розмір;
- показувати та приховувати елементи;
- змінювати позицію;
- змінювати фон;
- встановлювати ширину та висоту;
- працювати з CSS-змінними;
- отримувати фактичні стилі елемента;
- створювати динамічний інтерфейс.

Основний об'єкт для роботи з inline-стилями:

    element.style

Наприклад:

    const title = document.querySelector("h1");

    title.style.color = "blue";
    title.style.fontSize = "32px";

---

# 1. `element.style`

Властивість `style` представляє **inline CSS-стилі** конкретного HTML-елемента.

HTML:

    <h1 id="title">Hello</h1>

JavaScript:

    const title = document.querySelector("#title");

    title.style.color = "blue";
    title.style.fontSize = "32px";

У результаті браузер фактично отримає:

    <h1 id="title" style="color: blue; font-size: 32px;">
        Hello
    </h1>

---

# 2. Читання inline-стилю

Можна отримати значення стилю:

    const title = document.querySelector("#title");

    console.log(title.style.color);

Якщо стиль встановлений через `style`:

    title.style.color = "blue";

    console.log(title.style.color);
    // "blue"

Але важливий момент:

`element.style` бачить **тільки inline-стилі**.

Наприклад:

HTML:

    <style>
        h1 {
            color: red;
        }
    </style>

    <h1 id="title">Hello</h1>

JavaScript:

    const title = document.querySelector("#title");

    console.log(title.style.color);
    // ""

Хоча елемент на екрані буде червоним.

Для отримання фактичного стилю потрібно використовувати:

    getComputedStyle()

---

# 3. Встановлення CSS-властивості

Загальний синтаксис:

    element.style.property = value;

Наприклад:

    const box = document.querySelector(".box");

    box.style.width = "200px";
    box.style.height = "100px";
    box.style.backgroundColor = "lightblue";

---

# 4. CSS-властивості в JavaScript

У CSS властивості часто записуються через `-`:

    background-color
    font-size
    margin-top
    border-radius
    z-index

У JavaScript через `style` вони записуються у **camelCase**:

    backgroundColor
    fontSize
    marginTop
    borderRadius
    zIndex

### CSS

    .box {
        background-color: red;
        font-size: 20px;
        border-radius: 10px;
    }

### JavaScript

    box.style.backgroundColor = "red";
    box.style.fontSize = "20px";
    box.style.borderRadius = "10px";

---

# 5. Основні властивості `style`

## Колір

    element.style.color = "red";

## Фон

    element.style.backgroundColor = "black";

## Шрифт

    element.style.fontSize = "24px";
    element.style.fontWeight = "700";
    element.style.fontFamily = "Arial";

## Розміри

    element.style.width = "300px";
    element.style.height = "200px";

## Відступи

    element.style.margin = "20px";
    element.style.padding = "10px";

## Окремі відступи

    element.style.marginTop = "10px";
    element.style.marginRight = "20px";
    element.style.marginBottom = "10px";
    element.style.marginLeft = "20px";

## Межа

    element.style.border = "1px solid black";
    element.style.borderRadius = "8px";

## Прозорість

    element.style.opacity = "0.5";

## Тінь

    element.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";

## Позиція

    element.style.position = "absolute";
    element.style.top = "10px";
    element.style.left = "20px";

---

# 6. Значення CSS майже завжди є рядками

Наприклад:

    element.style.width = "200px";

Не:

    element.style.width = 200;

Для багатьох CSS-властивостей потрібна одиниця вимірювання:

    element.style.width = "200px";
    element.style.width = "50%";
    element.style.width = "10rem";
    element.style.width = "100vw";

---

# 7. Властивості без одиниць

Деякі CSS-властивості можуть приймати числові значення без одиниць.

Наприклад:

    element.style.opacity = "0.5";
    element.style.zIndex = "10";
    element.style.fontWeight = "700";

Але для розмірів зазвичай потрібні одиниці:

    element.style.width = "200px";
    element.style.height = "100px";

---

# 8. `style.display`

Одна з найпоширеніших властивостей у JavaScript.

Показати елемент:

    element.style.display = "block";

Приховати:

    element.style.display = "none";

Наприклад:

    const message = document.querySelector(".message");

    message.style.display = "none";

Повернути:

    message.style.display = "block";

---

# 9. Приховування елемента

Наприклад, кнопка:

HTML:

    <button id="hideButton">Hide</button>
    <p id="message">Hello!</p>

JavaScript:

    const button = document.querySelector("#hideButton");
    const message = document.querySelector("#message");

    button.addEventListener("click", () => {
        message.style.display = "none";
    });

---

# 10. Показування елемента

    button.addEventListener("click", () => {
        message.style.display = "block";
    });

Але потрібно пам'ятати:

`display: block` не завжди є правильним значенням для повернення.

Наприклад, початковий елемент міг мати:

    display: flex;

або:

    display: grid;

або:

    display: inline-block;

Тому для UI-станів часто краще використовувати CSS-класи.

---

# 11. `style.visibility`

Можна приховати елемент за допомогою:

    element.style.visibility = "hidden";

Повернути:

    element.style.visibility = "visible";

Різниця:

    display: none;

видаляє елемент із layout.

А:

    visibility: hidden;

залишає місце елемента, але робить його невидимим.

---

# 12. `style.opacity`

Можна змінити прозорість:

    element.style.opacity = "0.5";

Повністю прозорий:

    element.style.opacity = "0";

Повністю непрозорий:

    element.style.opacity = "1";

Наприклад:

    const image = document.querySelector("img");

    image.style.opacity = "0.5";

---

# 13. Видалення inline-стилю

Щоб прибрати конкретний inline-стиль:

    element.style.color = "";

Наприклад:

    element.style.color = "red";

    element.style.color = "";

Після цього браузер знову застосує стиль із CSS або наступний стиль у cascade.

---

# 14. `style.cssText`

`cssText` дозволяє встановити декілька inline-стилів одним рядком.

    element.style.cssText = "color: red; background-color: yellow; padding: 10px;";

Наприклад:

    const box = document.querySelector(".box");

    box.style.cssText = `
        color: white;
        background-color: black;
        padding: 20px;
    `;

Але при використанні `cssText` потрібно бути обережним.

Воно може **замінити існуючі inline-стилі**.

Наприклад:

    element.style.color = "red";

    element.style.cssText = "background-color: yellow;";

Після цього попередній inline `color: red` буде втрачений.

---

# 15. `style.setProperty()`

Метод `setProperty()` дозволяє встановити CSS-властивість.

Синтаксис:

    element.style.setProperty(property, value);

Приклад:

    element.style.setProperty("color", "red");

    element.style.setProperty("background-color", "yellow");

Це особливо корисно для:

- CSS custom properties;
- CSS-властивостей із kebab-case;
- роботи з динамічними CSS-властивостями.

---

# 16. CSS-властивості через `setProperty()`

Наприклад:

    element.style.setProperty("background-color", "blue");

Замість:

    element.style.backgroundColor = "blue";

Обидва варіанти працюють.

Для звичайних властивостей найчастіше зручніше:

    element.style.backgroundColor = "blue";

---

# 17. `style.getPropertyValue()`

Отримати значення CSS-властивості:

    const color = element.style.getPropertyValue("color");

Наприклад:

    element.style.setProperty("color", "red");

    console.log(
        element.style.getPropertyValue("color")
    );

Результат:

    "red"

---

# 18. `style.removeProperty()`

Видалити inline CSS-властивість:

    element.style.removeProperty("color");

Наприклад:

    element.style.setProperty("color", "red");

    element.style.removeProperty("color");

Це аналогічно:

    element.style.color = "";

---

# 19. CSS Custom Properties

CSS дозволяє створювати власні змінні.

### CSS

    :root {
        --primary-color: blue;
        --spacing: 20px;
    }

JavaScript може змінювати їх.

    document.documentElement.style.setProperty(
        "--primary-color",
        "red"
    );

Тепер CSS-змінна має значення:

    --primary-color: red;

---

# 20. Отримання CSS-змінної

    const root = document.documentElement;

    const value = root.style.getPropertyValue("--primary-color");

Але це, як і `element.style`, стосується inline-визначення.

Для фактичного значення CSS-змінної можна використати:

    const styles = getComputedStyle(document.documentElement);

    const value = styles.getPropertyValue("--primary-color");

---

# 21. Практичний приклад CSS-змінної

CSS:

    :root {
        --main-color: blue;
    }

    .title {
        color: var(--main-color);
    }

JavaScript:

    const root = document.documentElement;

    root.style.setProperty("--main-color", "green");

Тепер `.title` використовує зелений колір.

Це дуже корисний підхід для:

- тем;
- кольорових схем;
- динамічних налаштувань;
- графіків;
- прогрес-барів;
- анімацій.

---

# 22. `getComputedStyle()`

`getComputedStyle()` дозволяє отримати **фактичні обчислені стилі** елемента.

Синтаксис:

    const styles = getComputedStyle(element);

Наприклад:

    const title = document.querySelector("h1");

    const styles = getComputedStyle(title);

    console.log(styles.color);
    console.log(styles.fontSize);

---

# 23. Чому потрібен `getComputedStyle()`?

Розглянемо CSS:

    .title {
        color: red;
        font-size: 32px;
    }

HTML:

    <h1 class="title">Hello</h1>

JavaScript:

    const title = document.querySelector(".title");

    console.log(title.style.color);
    // ""

Тому що `color` не заданий inline.

А:

    const styles = getComputedStyle(title);

    console.log(styles.color);

дасть фактичний обчислений колір.

---

# 24. `style` vs `getComputedStyle()`

## `element.style`

Працює з:

    inline styles

Наприклад:

    element.style.color = "red";

Можна:

- читати inline-стилі;
- змінювати inline-стилі;
- видаляти inline-стилі.

---

## `getComputedStyle(element)`

Працює з:

    computed styles

Тобто дозволяє побачити, який стиль браузер фактично застосував після врахування:

- CSS-файлів;
- inline-стилів;
- inheritance;
- cascade;
- CSS-змінних;
- інших правил CSS.

---

# 25. Приклад порівняння

CSS:

    .box {
        color: red;
        width: 200px;
    }

JavaScript:

    const box = document.querySelector(".box");

    console.log(box.style.color);
    // ""

    console.log(getComputedStyle(box).color);
    // "rgb(...)"

    console.log(box.style.width);
    // ""

    console.log(getComputedStyle(box).width);
    // "200px"

---

# 26. `style` не є способом читати весь CSS

Це одна з найважливіших речей.

Неправильно очікувати:

    element.style.color

і думати:

> "Який зараз колір елемента?"

Насправді питання:

> "Який `color` записаний безпосередньо в inline-style?"

Для фактичного стилю:

    getComputedStyle(element).color

---

# 27. CSS-класи чи `style`?

У DOM існують два основні підходи.

### CSS-клас

    element.classList.add("active");

### Inline style

    element.style.color = "red";

Зазвичай:

**CSS-клас → для стану та набору стилів**

**`style` → для динамічних значень**

---

# 28. Коли краще використовувати CSS-клас?

Наприклад:

- active;
- hidden;
- selected;
- error;
- success;
- dark;
- open;
- disabled.

CSS:

    .error {
        color: red;
        border: 1px solid red;
        background-color: #fff0f0;
    }

JavaScript:

    input.classList.add("error");

Це краще, ніж:

    input.style.color = "red";
    input.style.border = "1px solid red";
    input.style.backgroundColor = "#fff0f0";

---

# 29. Коли краще використовувати `style`?

Коли значення справді є динамічним.

Наприклад, ширина прогрес-бара:

    progress.style.width = `${percent}%`;

Або координати:

    box.style.left = `${x}px`;

Або позиція:

    element.style.transform = `translateX(${offset}px)`;

Або CSS-змінна:

    root.style.setProperty("--progress", `${percent}%`);

---

# 30. Практичний приклад — Progress Bar

HTML:

    <div class="progress">
        <div class="progress-bar"></div>
    </div>

CSS:

    .progress {
        width: 300px;
        height: 20px;
        background-color: lightgray;
    }

    .progress-bar {
        width: 0;
        height: 100%;
        background-color: green;
    }

JavaScript:

    const progressBar = document.querySelector(".progress-bar");

    const percent = 75;

    progressBar.style.width = `${percent}%`;

Тут `style` доречний, тому що `75%` — динамічне значення.

---

# 31. Практичний приклад — зміна розміру

    const box = document.querySelector(".box");

    let size = 100;

    size += 20;

    box.style.width = `${size}px`;
    box.style.height = `${size}px`;

---

# 32. Практичний приклад — зміна кольору

    const box = document.querySelector(".box");

    box.style.backgroundColor = "red";

Потім:

    box.style.backgroundColor = "blue";

---

# 33. Практичний приклад — зміна декількох стилів

    const card = document.querySelector(".card");

    card.style.backgroundColor = "white";
    card.style.padding = "20px";
    card.style.borderRadius = "10px";
    card.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";

Але якщо це постійний набір стилів для стану, краще створити CSS-клас:

    card.classList.add("active");

---

# 34. Практичний приклад — змінюємо стиль кнопки

HTML:

    <button id="button">Click me</button>

JavaScript:

    const button = document.querySelector("#button");

    button.addEventListener("click", () => {
        button.style.backgroundColor = "green";
        button.style.color = "white";
    });

---

# 35. Практичний приклад — Toggle стилю

Можна вручну перевірити значення:

    button.addEventListener("click", () => {
        if (button.style.backgroundColor === "green") {
            button.style.backgroundColor = "";
        } else {
            button.style.backgroundColor = "green";
        }
    });

Але для станів інтерфейсу краще:

    button.classList.toggle("active");

---

# 36. Практичний приклад — динамічний фон

HTML:

    <input id="colorInput" type="color">
    <div id="box"></div>

JavaScript:

    const colorInput = document.querySelector("#colorInput");
    const box = document.querySelector("#box");

    colorInput.addEventListener("input", () => {
        box.style.backgroundColor = colorInput.value;
    });

Тут `style` доречний, тому що колір надходить від користувача.

---

# 37. Практичний приклад — ширина від input

HTML:

    <input id="widthInput" type="number">
    <div id="box"></div>

JavaScript:

    const widthInput = document.querySelector("#widthInput");
    const box = document.querySelector("#box");

    widthInput.addEventListener("input", () => {
        box.style.width = `${widthInput.value}px`;
    });

---

# 38. Практичний приклад — отримання фактичної ширини

    const box = document.querySelector(".box");

    const styles = getComputedStyle(box);

    console.log(styles.width);

Якщо CSS:

    .box {
        width: 300px;
    }

можна отримати:

    "300px"

---

# 39. Число зі стилю

`getComputedStyle()` повертає CSS-значення як рядки.

Наприклад:

    const styles = getComputedStyle(box);

    console.log(styles.width);
    // "300px"

Якщо потрібно число:

    const width = parseFloat(styles.width);

    console.log(width);
    // 300

---

# 40. `getComputedStyle()` і реальні розміри

Можна отримати:

    const styles = getComputedStyle(element);

    console.log(styles.width);
    console.log(styles.height);
    console.log(styles.marginTop);
    console.log(styles.padding);
    console.log(styles.display);
    console.log(styles.position);

Але для геометрії елемента часто корисніші:

    element.getBoundingClientRect()

Наприклад:

    const rect = element.getBoundingClientRect();

    console.log(rect.width);
    console.log(rect.height);
    console.log(rect.top);
    console.log(rect.left);

Це вже тема геометрії та layout DOM.

---

# 41. `style` + CSS Variables

Це один із дуже корисних сучасних патернів.

CSS:

    .box {
        width: var(--box-width);
        background-color: var(--box-color);
    }

JavaScript:

    const box = document.querySelector(".box");

    box.style.setProperty("--box-width", "300px");
    box.style.setProperty("--box-color", "blue");

Перевага:

JavaScript змінює значення, а CSS відповідає за те, **як це значення використовується**.

---

# 42. Практичний приклад — CSS Variable для прогресу

CSS:

    .progress-bar {
        width: var(--progress);
        height: 20px;
        background-color: green;
    }

JavaScript:

    const progressBar = document.querySelector(".progress-bar");

    const percent = 70;

    progressBar.style.setProperty(
        "--progress",
        `${percent}%`
    );

---

# 43. Практичний приклад — Theme через CSS Variables

CSS:

    :root {
        --background: white;
        --text: black;
    }

    body {
        background-color: var(--background);
        color: var(--text);
    }

JavaScript:

    const root = document.documentElement;

    root.style.setProperty("--background", "black");
    root.style.setProperty("--text", "white");

Тепер тема змінилася.

Для повноцінної темної теми, однак, часто зручніше використовувати клас:

    document.documentElement.classList.toggle("dark");

---

# 44. Важливе правило: CSS відповідає за дизайн

Не варто переносити весь CSS у JavaScript.

Наприклад, замість:

    element.style.color = "white";
    element.style.backgroundColor = "black";
    element.style.padding = "20px";
    element.style.borderRadius = "10px";

часто краще:

CSS:

    .dark-card {
        color: white;
        background-color: black;
        padding: 20px;
        border-radius: 10px;
    }

JavaScript:

    element.classList.add("dark-card");

Так код розділяє відповідальність:

    JavaScript → логіка
    CSS → оформлення

---

# 45. Хороший практичний принцип

Запам'ятай:

    classList → стан UI

    style → конкретне динамічне значення

Наприклад:

    button.classList.toggle("active");

але:

    progressBar.style.width = `${percent}%`;

---

# 46. Часті помилки

## ❌ Помилка 1 — забули одиницю

    element.style.width = "200";

Для width потрібно:

    element.style.width = "200px";

---

## ❌ Помилка 2 — неправильне ім'я CSS-властивості

Неправильно:

    element.style.background-color = "red";

Правильно:

    element.style.backgroundColor = "red";

Або:

    element.style.setProperty("background-color", "red");

---

## ❌ Помилка 3 — очікування, що `style` читає CSS-файл

    console.log(element.style.color);

Це не гарантує отримання фактичного кольору.

Для computed style:

    console.log(getComputedStyle(element).color);

---

## ❌ Помилка 4 — використання `display = "block"` для всіх елементів

Наприклад:

    element.style.display = "block";

може зламати початковий layout.

Для станів UI краще:

    element.classList.toggle("hidden");

---

## ❌ Помилка 5 — занадто багато inline-стилів

Наприклад:

    element.style.color = "red";
    element.style.backgroundColor = "white";
    element.style.border = "1px solid red";
    element.style.padding = "10px";

Якщо це стабільний UI-стан, краще створити клас.

---

## ❌ Помилка 6 — `cssText` випадково стирає стилі

    element.style.color = "red";

    element.style.cssText = "padding: 20px;";

`color` буде видалено з inline-style.

---

# 47. `style` + `classList`

Ці два інструменти не конкурують.

Вони доповнюють один одного.

Наприклад:

    const button = document.querySelector("button");

    button.classList.add("active");

    button.style.setProperty("--progress", "75%");

Тут:

    active → стан компонента

    --progress → динамічне значення

---

# 48. Практичний UI-приклад

Уявімо кнопку завантаження.

CSS:

    .progress {
        width: 300px;
        height: 20px;
        background-color: #ddd;
    }

    .progress-bar {
        width: var(--progress);
        height: 100%;
        background-color: green;
    }

JavaScript:

    const progressBar = document.querySelector(".progress-bar");

    let progress = 0;

    const interval = setInterval(() => {
        progress += 10;

        progressBar.style.setProperty(
            "--progress",
            `${progress}%`
        );

        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 500);

Тут JavaScript керує даними:

    progress

CSS відповідає за відображення:

    width: var(--progress);

Це хороший поділ відповідальності.

---

# 49. `style` та CSS Cascade

Стилі можуть приходити з різних джерел:

    браузерні стилі
        ↓
    зовнішній CSS
        ↓
    CSS-класи
        ↓
    inline style
        ↓
    !important

Inline style має високий пріоритет у звичайному cascade.

Наприклад:

CSS:

    .title {
        color: red;
    }

JavaScript:

    title.style.color = "blue";

Елемент буде синім.

---

# 50. `!important`

Можна встановити:

    element.style.setProperty(
        "color",
        "red",
        "important"
    );

Але використовувати `!important` без необхідності не варто.

Краще правильно організувати CSS та класи.

---

# 51. Динамічні значення — хороший кандидат для `style`

Наприклад:

    const percentage = 45;

    progress.style.width = `${percentage}%`;

    const offset = 120;

    box.style.transform = `translateX(${offset}px)`;

    const rotation = 30;

    element.style.transform = `rotate(${rotation}deg)`;

У таких випадках значення змінюються під час роботи програми.

---

# 52. Патерн: Data → Style

Це дуже важливий для frontend принцип.

Наприклад:

    const score = 85;

Дані:

    score = 85

перетворюються на UI:

    progress.style.width = `${score}%`;

Інший приклад:

    const x = 150;

    box.style.left = `${x}px`;

Ще один:

    const opacity = 0.5;

    image.style.opacity = `${opacity}`;

---

# 53. Практична вправа №1 — Color Changer

Створи:

    <button id="red">Red</button>
    <button id="blue">Blue</button>

    <div id="box"></div>

При натисканні:

    Red → background red

    Blue → background blue

Спробуй реалізувати через:

    element.style.backgroundColor

---

# 54. Практична вправа №2 — Size Changer

Створи:

    <button id="increase">+</button>
    <button id="decrease">-</button>

    <div id="box"></div>

Змінюй розмір:

    100px
    120px
    140px
    160px
    ...

Використовуй:

    box.style.width
    box.style.height

---

# 55. Практична вправа №3 — Progress Bar

Створи:

    <button id="increase">Increase</button>

    <div class="progress">
        <div class="progress-bar"></div>
    </div>

Кожне натискання збільшує прогрес на:

    10%

Використовуй:

    progressBar.style.width = `${progress}%`;

---

# 56. Практична вправа №4 — CSS Variable

Створи:

    <input type="range" id="range">

    <div class="box"></div>

Коли користувач рухає slider, змінюй CSS-змінну:

    --size

Наприклад:

    box.style.setProperty(
        "--size",
        `${value}px`
    );

CSS використовує:

    width: var(--size);
    height: var(--size);

---

# 57. Практична вправа №5 — Dynamic Color

Створи:

    <input type="color" id="color">

    <div class="box"></div>

Після зміни кольору:

    box.style.backgroundColor = color.value;

---

# 58. Практична вправа №6 — Computed Style

Створи CSS:

    .box {
        width: 300px;
        height: 150px;
        background-color: blue;
    }

За допомогою JavaScript отримай:

    width
    height
    backgroundColor
    display

Використай:

    getComputedStyle()

---

# 59. Практична вправа №7 — Mini Theme

Створи:

    <button id="themeButton">
        Toggle theme
    </button>

Використай CSS-клас:

    .dark

і JavaScript:

    document.documentElement.classList.toggle("dark");

Після цього окремо спробуй реалізувати ту саму задачу через CSS Variables.

---

# 60. Практична вправа №8 — Card State

Створи картку:

    <div class="card">
        <h2>Product</h2>
        <p>Description</p>
        <button>Activate</button>
    </div>

При натисканні кнопки:

    card.classList.toggle("active");

А додатково динамічно змінюй:

    --progress

через:

    style.setProperty()

---

# 61. Що потрібно пам'ятати

### 1. Inline styles

    element.style

---

### 2. Встановити стиль

    element.style.color = "red";

---

### 3. CamelCase

CSS:

    background-color

JavaScript:

    backgroundColor

---

### 4. Видалити inline-style

    element.style.color = "";

або:

    element.style.removeProperty("color");

---

### 5. `cssText`

    element.style.cssText = "color: red;";

---

### 6. `setProperty()`

    element.style.setProperty(
        "background-color",
        "red"
    );

---

### 7. `getPropertyValue()`

    element.style.getPropertyValue("color");

---

### 8. `removeProperty()`

    element.style.removeProperty("color");

---

### 9. Computed style

    getComputedStyle(element);

---

### 10. CSS Variables

    element.style.setProperty("--color", "red");

---

### 11. CSS-класи

    element.classList.add("active");

---

### 12. Головне правило

    classList → UI state

    style → dynamic values

---

# 62. `classList` vs `style`

| Завдання | Краще використовувати |
|---|---|
| Active state | `classList` |
| Hidden state | `classList` |
| Error state | `classList` |
| Dark theme | `classList` |
| Selected item | `classList` |
| Progress 0–100% | `style` |
| Динамічна ширина | `style` |
| Динамічна позиція | `style` |
| Координати | `style` |
| Значення CSS Variable | `style.setProperty()` |
| Великий набір CSS | CSS class |
| Фактичний стиль | `getComputedStyle()` |

---

# 63. Міні-шпаргалка

    // SELECT
    const element = document.querySelector(".box");

    // SET STYLE
    element.style.color = "red";
    element.style.backgroundColor = "black";
    element.style.width = "200px";
    element.style.height = "100px";

    // REMOVE INLINE STYLE
    element.style.color = "";

    // DISPLAY
    element.style.display = "none";
    element.style.display = "block";

    // VISIBILITY
    element.style.visibility = "hidden";
    element.style.visibility = "visible";

    // OPACITY
    element.style.opacity = "0.5";

    // CSS TEXT
    element.style.cssText = "color: red; padding: 20px;";

    // SET PROPERTY
    element.style.setProperty("background-color", "red");

    // GET PROPERTY
    element.style.getPropertyValue("background-color");

    // REMOVE PROPERTY
    element.style.removeProperty("background-color");

    // CSS VARIABLE
    element.style.setProperty("--color", "blue");

    // GET CSS VARIABLE
    element.style.getPropertyValue("--color");

    // COMPUTED STYLE
    const styles = getComputedStyle(element);

    console.log(styles.color);
    console.log(styles.width);
    console.log(styles.display);

    // CSS CLASS
    element.classList.add("active");
    element.classList.remove("active");
    element.classList.toggle("active");

---

# 64. Питання для співбесіди

### Junior

**1. Що таке `element.style`?**

`element.style` дозволяє читати та змінювати inline CSS-стилі елемента.

---

**2. Як змінити колір елемента?**

    element.style.color = "red";

---

**3. Як змінити `background-color`?**

    element.style.backgroundColor = "blue";

---

**4. Чому використовується `backgroundColor`, а не `background-color`?**

Тому що JavaScript використовує camelCase для CSS-властивостей через `style`.

---

**5. Як приховати елемент?**

    element.style.display = "none";

---

**6. Як показати елемент?**

Наприклад:

    element.style.display = "block";

Але конкретне значення має відповідати потрібному layout.

---

### Middle

**7. Чим `element.style` відрізняється від `getComputedStyle()`?**

`element.style` працює з inline-стилями.

`getComputedStyle()` дозволяє отримати фактичні обчислені стилі після застосування CSS.

---

**8. Чому `element.style.color` може повернути порожній рядок, хоча елемент червоний?**

Тому що колір може бути заданий у CSS-файлі або через клас, а не inline.

Для фактичного значення:

    getComputedStyle(element).color

---

**9. Коли використовувати `classList`, а коли `style`?**

    classList → стани та набори стилів

    style → динамічні конкретні значення

---

**10. Для чого потрібен `setProperty()`?**

Для роботи з CSS-властивостями у string-формі та особливо для CSS Custom Properties.

Наприклад:

    element.style.setProperty("--progress", "70%");

---

**11. Як отримати computed width?**

    const styles = getComputedStyle(element);

    console.log(styles.width);

---

**12. Як перетворити `"300px"` на число?**

    const width = parseFloat(styles.width);

---

### Advanced

**13. Чому не варто переносити весь CSS у JavaScript?**

Тому що краще розділяти відповідальність:

    JavaScript → поведінка та логіка

    CSS → presentation та styling

---

**14. Чому CSS Variables корисні разом із JavaScript?**

JavaScript може змінювати дані, а CSS може використовувати ці дані в різних правилах.

Наприклад:

    element.style.setProperty("--progress", "70%");

CSS:

    width: var(--progress);

---

**15. Чи можна змінити CSS custom property через `style`?**

Так:

    element.style.setProperty("--color", "red");

---

**16. Чим `display: none` відрізняється від `visibility: hidden`?**

`display: none` прибирає елемент із layout.

`visibility: hidden` робить його невидимим, але місце елемента залишається.

---

# 65. Рівні володіння

## 🟢 Core

Ти повинен вміти:

    element.style.color
    element.style.backgroundColor
    element.style.width
    element.style.height
    element.style.display

Розуміти:

    inline style
    CSS class
    camelCase

---

## 🟡 Junior

Додатково:

    classList
    getComputedStyle()
    setProperty()
    removeProperty()
    cssText

Вміти створити:

- color changer;
- size changer;
- progress bar;
- show/hide;
- dynamic styles.

---

## 🟠 Middle

Розуміти:

- CSS cascade;
- computed styles;
- inline styles;
- CSS Variables;
- separation of concerns;
- `classList` vs `style`;
- динамічні UI-значення.

Вміти будувати:

    Data
      ↓
    JavaScript
      ↓
    CSS Variable / style
      ↓
    UI

---

## 🔴 Senior

Розуміти не тільки API, але й архітектуру UI:

    JavaScript
        ↓
    state
        ↓
    CSS class / CSS variable
        ↓
    CSS
        ↓
    rendered UI

Розуміти:

- cascade;
- specificity;
- inheritance;
- computed styles;
- CSS custom properties;
- layout;
- rendering;
- performance;
- separation of concerns;
- maintainability.

---

# 66. Типовий frontend-патерн

Не потрібно робити так:

    if (isError) {
        input.style.color = "red";
        input.style.border = "1px solid red";
        input.style.backgroundColor = "#fff0f0";
    }

Краще:

CSS:

    .input-error {
        color: red;
        border: 1px solid red;
        background-color: #fff0f0;
    }

JavaScript:

    input.classList.toggle("input-error", isError);

Але якщо потрібно передати динамічне значення:

    input.style.setProperty("--progress", `${progress}%`);

Це хороший баланс.

---

# 67. Головне

`element.style` — це API для роботи з **inline CSS**.

Найчастіше використовуються:

    element.style.color
    element.style.backgroundColor
    element.style.width
    element.style.height
    element.style.display
    element.style.opacity

Для CSS-властивостей із дефісами використовується camelCase:

    background-color
        ↓
    backgroundColor

Для CSS Variables:

    element.style.setProperty("--color", "red");

Для отримання фактичного стилю:

    getComputedStyle(element);

Для UI-станів частіше використовуємо:

    element.classList.add("active");

Для динамічних значень:

    element.style.width = `${percent}%`;

або:

    element.style.setProperty("--progress", `${percent}%`);

---

# 68. Коротка модель у голові

Запам'ятай цю схему:

    ┌─────────────────────────────┐
    │          CSS                │
    │  дизайн / layout / states   │
    └──────────────┬──────────────┘
                   │
                   ↓
    ┌─────────────────────────────┐
    │        classList            │
    │      UI state               │
    │  active / hidden / error    │
    └──────────────┬──────────────┘
                   │
                   ↓
    ┌─────────────────────────────┐
    │          style              │
    │   dynamic CSS values        │
    │ width / position / progress │
    └──────────────┬──────────────┘
                   │
                   ↓
    ┌─────────────────────────────┐
    │      getComputedStyle()     │
    │  фактичний computed style   │
    └─────────────────────────────┘

### Найважливіша формула

    classList → стан

    style → динамічне значення

    getComputedStyle() → фактичний результат CSS

    CSS → оформлення

Це базова модель, якою варто користуватися під час роботи зі стилями в DOM.