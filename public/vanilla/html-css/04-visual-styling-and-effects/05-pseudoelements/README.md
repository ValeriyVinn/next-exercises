# CSS Pseudo-elements

## 1. Що таке Pseudo-elements

**Pseudo-element (псевдоелемент)** — це спеціальний CSS-селектор, який дозволяє стилізувати **певну частину елемента** або створити візуальний елемент, якого немає окремим HTML-тегом.

Основний синтаксис:

    selector::pseudo-element {
        property: value;
    }

Наприклад:

    p::first-letter {
        font-size: 2rem;
    }

Тут `::first-letter` вибирає **першу літеру** тексту всередині `<p>`.

Інший приклад:

    .button::before {
        content: "→";
    }

Візуально перед текстом кнопки з'явиться стрілка, хоча окремого елемента `<span>` у HTML немає.

---

# 2. Pseudo-class vs Pseudo-element

Це одна з найважливіших відмінностей у CSS.

### Pseudo-class

Pseudo-class описує **стан або положення існуючого HTML-елемента**.

Синтаксис:

    selector:pseudo-class

Приклади:

    a:hover
    input:focus
    li:first-child
    input:invalid

Наприклад:

    button:hover {
        background-color: darkblue;
    }

`button` вже існує в HTML, а `:hover` описує його стан.

---

### Pseudo-element

Pseudo-element працює з **частиною існуючого елемента** або створює додатковий візуальний елемент.

Синтаксис:

    selector::pseudo-element

Приклади:

    p::first-letter
    p::first-line
    .card::before
    .card::after

---

### Коротко

    :hover
    :focus
    :first-child
    :checked

→ **Pseudo-class**

    ::before
    ::after
    ::first-letter
    ::first-line

→ **Pseudo-element**

Запам'ятати:

> `:` → стан / умова / позиція елемента  
> `::` → частина елемента / додатковий візуальний елемент

---

# 3. Основні Pseudo-elements

Найважливіші pseudo-elements:

    ::before
    ::after
    ::first-letter
    ::first-line
    ::selection
    ::placeholder
    ::marker
    ::file-selector-button

Також існують спеціалізовані pseudo-elements для окремих браузерних UI-компонентів.

---

# 4. `::before`

`::before` створює pseudo-element **перед вмістом елемента**.

Найчастіше використовується разом із:

    content

Приклад:

    .title::before {
        content: "★";
    }

HTML:

    <h2 class="title">Important</h2>

Результат:

    ★ Important

Важливо:

> `::before` не створює окремий HTML-елемент у DOM.

---

## 4.1. `content` є ключовою властивістю

Для `::before` та `::after` зазвичай потрібно вказувати:

    content: "";

Наприклад:

    .card::before {
        content: "";
        display: block;
    }

Навіть якщо pseudo-element не містить тексту, `content` часто задають як порожній рядок.

---

# 5. `::after`

`::after` створює pseudo-element **після вмісту елемента**.

Приклад:

    .title::after {
        content: " →";
    }

HTML:

    <h2 class="title">Next</h2>

Результат:

    Next →

---

# 6. `::before` + `::after`

Це одна з найпопулярніших комбінацій CSS.

Наприклад, можна створити декоративні лінії навколо заголовка.

HTML:

    <h2 class="title">About us</h2>

CSS:

    .title {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .title::before,
    .title::after {
        content: "";
        flex: 1;
        height: 1px;
        background-color: #ccc;
    }

Результат концептуально:

    ───────── About us ─────────

HTML залишається простим:

    <h2>About us</h2>

а декоративна частина реалізована CSS.

---

# 7. `::before` та `::after` для декоративних елементів

Pseudo-elements дуже зручні для:

- декоративних ліній;
- фонових плям;
- іконок;
- стрілок;
- badges;
- overlays;
- underline;
- декоративних рамок;
- quotation marks;
- hover effects;
- CSS shapes.

Наприклад:

    .card {
        position: relative;
    }

    .card::before {
        content: "";
        position: absolute;
        inset: 0;
        border: 2px solid transparent;
        border-radius: 1rem;
        transition: border-color 0.3s;
    }

    .card:hover::before {
        border-color: royalblue;
    }

---

# 8. `content`

`content` — головна властивість для `::before` та `::after`.

## 8.1. Текст

    .warning::before {
        content: "⚠ ";
    }

---

## 8.2. Порожній pseudo-element

    .decorative-line::before {
        content: "";
    }

Це один із найпоширеніших варіантів.

---

## 8.3. Рядок

    .external-link::after {
        content: " ↗";
    }

---

## 8.4. Значення HTML-атрибута через `attr()`

CSS може отримати значення атрибута HTML:

    .tooltip::after {
        content: attr(data-tooltip);
    }

HTML:

    <button
        class="tooltip"
        data-tooltip="Save changes"
    >
        Save
    </button>

Текст для pseudo-element береться з:

    data-tooltip

---

# 9. `::first-letter`

`::first-letter` дозволяє стилізувати **першу літеру тексту**.

Приклад:

    p::first-letter {
        font-size: 3rem;
        font-weight: 700;
    }

HTML:

    <p>
        Lorem ipsum dolor sit amet.
    </p>

Цей прийом часто використовується для:

- editorial design;
- статей;
- книг;
- журналів;
- декоративного першого символу.

---

## 9.1. Drop cap

Класичний приклад — велика перша літера:

    .article p::first-letter {
        float: left;
        font-size: 4rem;
        line-height: 0.8;
        margin-right: 0.5rem;
    }

---

# 10. `::first-line`

`::first-line` дозволяє стилізувати **перший рядок тексту**.

Приклад:

    p::first-line {
        font-weight: 700;
    }

Важливий момент:

> Які саме слова потрапляють у перший рядок, залежить від ширини контейнера, шрифту, розміру тексту та інших умов.

Тому `::first-line` не означає "перші 10 слів".

Це саме **поточний перший рядок**, який браузер сформував під час layout.

---

# 11. `::selection`

`::selection` стилізує текст, який користувач виділив мишкою або клавіатурою.

Приклад:

    ::selection {
        background-color: black;
        color: white;
    }

Або тільки для певного елемента:

    .article::selection {
        background-color: gold;
        color: black;
    }

---

## 11.1. Практичний приклад

    ::selection {
        background-color: #222;
        color: #fff;
    }

Це дозволяє зробити виділення тексту частиною загального UI-дизайну.

---

# 12. `::placeholder`

`::placeholder` стилізує placeholder текст у `<input>` або `<textarea>`.

HTML:

    <input
        type="text"
        placeholder="Enter your name"
    >

CSS:

    input::placeholder {
        color: gray;
        opacity: 1;
    }

---

## 12.1. Практичний приклад

    input::placeholder {
        color: #999;
        font-style: italic;
    }

---

# 13. `::marker`

`::marker` дозволяє стилізувати маркер списку.

HTML:

    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

CSS:

    li::marker {
        color: red;
    }

Можна змінювати, наприклад:

    li::marker {
        content: "→ ";
    }

Результат:

    → HTML
    → CSS
    → JavaScript

---

# 14. `::file-selector-button`

`::file-selector-button` дозволяє стилізувати кнопку всередині:

    <input type="file">

HTML:

    <input type="file">

CSS:

    input::file-selector-button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
    }

Це корисно для кастомізації file input.

---

# 15. Pseudo-elements з `position: absolute`

Один із найважливіших практичних патернів:

    parent {
        position: relative;
    }

    parent::before {
        content: "";
        position: absolute;
    }

Наприклад:

    .card {
        position: relative;
    }

    .card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 5px;
        height: 100%;
        background-color: royalblue;
    }

Тут pseudo-element використовується як декоративна вертикальна смуга.

---

# 16. `inset`

Замість:

    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

можна використовувати:

    inset: 0;

Наприклад:

    .card {
        position: relative;
    }

    .card::before {
        content: "";
        position: absolute;
        inset: 0;
    }

Це дуже поширений сучасний CSS-патерн.

---

# 17. Overlay через `::before`

Pseudo-elements зручно використовувати для overlay.

HTML:

    <div class="hero">
        <img src="hero.jpg" alt="Mountain landscape">
        <div class="hero__content">
            <h1>Explore</h1>
        </div>
    </div>

CSS:

    .hero {
        position: relative;
    }

    .hero::before {
        content: "";
        position: absolute;
        inset: 0;
        background: rgb(0 0 0 / 0.4);
    }

    .hero__content {
        position: relative;
        z-index: 1;
    }

Pseudo-element створює затемнення поверх зображення.

---

# 18. Decorative underline

Pseudo-element можна використовувати для кастомного underline.

HTML:

    <h2 class="title">Services</h2>

CSS:

    .title {
        position: relative;
        width: fit-content;
    }

    .title::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -0.5rem;
        width: 50%;
        height: 3px;
        background-color: royalblue;
    }

Результат:

    Services
    ─────

Це дає значно більше контролю, ніж стандартний:

    text-decoration: underline;

---

# 19. Hover animation через `::after`

Pseudo-element добре підходить для animated underline.

CSS:

    .nav-link {
        position: relative;
    }

    .nav-link::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -4px;
        width: 100%;
        height: 2px;
        background-color: currentColor;

        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.3s ease;
    }

    .nav-link:hover::after {
        transform: scaleX(1);
    }

Тут:

- `::after` створює лінію;
- `scaleX(0)` ховає її;
- `scaleX(1)` показує;
- `transition` створює анімацію.

---

# 20. `currentColor`

Pseudo-elements часто використовують:

    background-color: currentColor;

`currentColor` означає поточне значення:

    color

Наприклад:

    .link {
        color: royalblue;
    }

    .link::after {
        content: "";
        background-color: currentColor;
    }

Якщо колір `.link` зміниться, pseudo-element автоматично використовуватиме той самий колір.

---

# 21. CSS icons через Pseudo-elements

Іноді просту іконку можна створити без SVG або зображення.

Наприклад, плюс:

    .plus::before {
        content: "";
        position: absolute;
        width: 20px;
        height: 2px;
        background-color: currentColor;
    }

    .plus::after {
        content: "";
        position: absolute;
        width: 2px;
        height: 20px;
        background-color: currentColor;
    }

Два pseudo-elements утворюють:

    +

Це корисно для простих декоративних UI-елементів.

---

# 22. CSS arrow через Pseudo-element

Можна створити стрілку за допомогою border.

    .arrow::after {
        content: "";
        display: inline-block;
        width: 8px;
        height: 8px;
        border-right: 2px solid currentColor;
        border-bottom: 2px solid currentColor;
        transform: rotate(-45deg);
    }

Такий підхід часто використовується для:

- dropdown;
- accordion;
- navigation;
- buttons;
- tooltips.

---

# 23. Pseudo-elements та `z-index`

Коли pseudo-element використовується як overlay або decoration, часто потрібно контролювати шари.

Наприклад:

    .card {
        position: relative;
    }

    .card::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 0;
    }

    .card__content {
        position: relative;
        z-index: 1;
    }

Тут:

    ::before
        ↓
    background / overlay

    .card__content
        ↓
    текст / кнопки

---

# 24. Pseudo-elements та `pointer-events`

Якщо декоративний pseudo-element перекриває кнопку або посилання, він може перехоплювати взаємодію.

У таких випадках:

    .card::before {
        pointer-events: none;
    }

Тоді mouse events проходять крізь pseudo-element до елемента під ним.

Особливо корисно для:

- overlays;
- декоративних шарів;
- animated backgrounds;
- highlights.

---

# 25. Pseudo-elements та accessibility

Це дуже важливо.

Не варто використовувати `::before` або `::after` для інформації, яка є **критичною для користувача**.

Поганий підхід:

    .delete::before {
        content: "Delete account";
    }

Якщо цей текст є важливим для розуміння дії, краще мати його в HTML.

Наприклад:

    <button>
        Delete account
    </button>

Pseudo-elements найкраще підходять для:

- decoration;
- icons;
- visual indicators;
- backgrounds;
- borders;
- animations.

---

# 26. Не використовуй Pseudo-elements замість semantic HTML

Погано:

    .card::before {
        content: "Important information";
    }

якщо це повідомлення має важливе семантичне значення.

Краще:

    <p class="card__notice">
        Important information
    </p>

А CSS використовувати для оформлення:

    .card__notice {
        font-weight: 700;
    }

---

# 27. `content` не замінює HTML-контент

Pseudo-element — це переважно **presentation layer**.

HTML:

    <button>
        Save
    </button>

CSS:

    button::after {
        content: "✓";
    }

Галочка є декоративним доповненням.

Але якщо інформація принципово важлива:

    <button>
        Save changes
    </button>

краще залишити текст у HTML.

---

# 28. `::before` і `::after` не є реальними HTML-тегами

Якщо HTML:

    <div class="card">
        Hello
    </div>

CSS:

    .card::before {
        content: "Hi";
    }

не означає, що HTML перетворюється на:

    <div class="card">
        <span>Hi</span>
        Hello
    </div>

Pseudo-element — це механізм CSS rendering.

Тому не потрібно думати про нього як про звичайний HTML-елемент.

---

# 29. `display` для Pseudo-elements

Pseudo-element можна зробити:

    display: block;

або:

    display: inline-block;

або:

    display: flex;

Наприклад:

    .title::before {
        content: "";
        display: block;
        width: 100px;
        height: 2px;
    }

---

# 30. `content: none` та `content: ""`

Ці значення не слід плутати.

    content: "";

створює pseudo-element із порожнім вмістом.

А:

    content: none;

означає, що pseudo-element не генерується.

Наприклад:

    .card::before {
        content: none;
    }

---

# 31. Pseudo-elements можна комбінувати з Pseudo-classes

Наприклад:

    .button::after {
        content: "";
        transform: scaleX(0);
    }

    .button:hover::after {
        transform: scaleX(1);
    }

Тут одночасно використовуються:

    :hover
    ::after

Тобто:

    :hover
        ↓
    стан елемента

    ::after
        ↓
    pseudo-element

---

# 32. Приклад: Button Hover Effect

HTML:

    <button class="button">
        Learn more
    </button>

CSS:

    .button {
        position: relative;
        padding: 0.75rem 1.5rem;
        overflow: hidden;
        background: transparent;
        color: black;
        border: 2px solid black;
        cursor: pointer;
    }

    .button::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: black;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.3s ease;
        z-index: 0;
    }

    .button span {
        position: relative;
        z-index: 1;
    }

Якщо текст без `<span>`:

    .button {
        position: relative;
        z-index: 0;
    }

Pseudo-element можна використовувати як animated background.

---

# 33. Приклад: Card Corner Decoration

HTML:

    <article class="card">
        <h2>CSS</h2>
        <p>Learn modern CSS.</p>
    </article>

CSS:

    .card {
        position: relative;
        padding: 2rem;
        overflow: hidden;
    }

    .card::after {
        content: "";
        position: absolute;
        top: -40px;
        right: -40px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: rgb(0 0 0 / 0.05);
    }

Pseudo-element створює декоративне коло у верхньому правому куті.

---

# 34. Приклад: Quote Decoration

HTML:

    <blockquote class="quote">
        Learning CSS requires practice.
    </blockquote>

CSS:

    .quote {
        position: relative;
        padding: 2rem;
    }

    .quote::before {
        content: "“";
        position: absolute;
        top: -1rem;
        left: 0;
        font-size: 5rem;
        line-height: 1;
    }

Pseudo-element додає декоративну лапку.

---

# 35. Приклад: Status Indicator

HTML:

    <div class="status status--online">
        Online
    </div>

CSS:

    .status {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }

    .status::before {
        content: "";
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: gray;
    }

    .status--online::before {
        background-color: green;
    }

HTML залишається простим, а кружечок є декоративним індикатором.

---

# 36. Приклад: Required Field Indicator

HTML:

    <label class="required">
        Email
    </label>

CSS:

    .required::after {
        content: " *";
    }

Це простий приклад використання `::after`.

Але якщо зірочка має важливе семантичне значення для accessibility, краще продумати її подання в HTML і додатково пояснити користувачу значення required поля.

---

# 37. `::before` / `::after` і `position: absolute`

Типовий шаблон:

    .element {
        position: relative;
    }

    .element::before {
        content: "";
        position: absolute;
        inset: 0;
    }

Запам'ятати:

> `position: relative` у батьківського елемента створює reference point для `position: absolute` pseudo-element.

---

# 38. Pseudo-elements і stacking context

Якщо виникають проблеми з тим, що pseudo-element знаходиться поверх або під неправильним елементом, перевір:

- `position`;
- `z-index`;
- stacking context;
- `opacity`;
- `transform`;
- `filter`.

Наприклад:

    .card {
        position: relative;
        isolation: isolate;
    }

    .card::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -1;
    }

`isolation: isolate` може допомогти зробити керування шарами більш передбачуваним.

---

# 39. Типові помилки

## Помилка 1 — забутий `content`

Неправильно:

    .card::before {
        display: block;
    }

Надійний варіант:

    .card::before {
        content: "";
        display: block;
    }

---

## Помилка 2 — плутати `:` і `::`

Pseudo-class:

    button:hover

Pseudo-element:

    button::after

---

## Помилка 3 — використовувати pseudo-element для важливого контенту

Не варто ховати важливу інформацію тільки в:

    content: "...";

Краще розміщувати важливий текст у HTML.

---

## Помилка 4 — pseudo-element перекриває кнопку

Якщо декоративний шар знаходиться над кнопкою:

    .card::before {
        pointer-events: none;
    }

---

## Помилка 5 — забутий `position: relative`

Наприклад:

    .card::before {
        position: absolute;
        top: 0;
        left: 0;
    }

Якщо `.card` не має:

    position: relative;

pseudo-element може позиціонуватися відносно іншого containing block.

---

## Помилка 6 — неправильний `z-index`

Якщо pseudo-element перекриває текст:

    .card::before {
        z-index: 0;
    }

    .card__content {
        position: relative;
        z-index: 1;
    }

---

# 40. Коли використовувати Pseudo-elements

Використовуй `::before` / `::after`, коли потрібно створити:

- декоративну лінію;
- underline;
- background layer;
- overlay;
- icon;
- arrow;
- badge;
- status indicator;
- quotation mark;
- decorative shape;
- hover animation;
- visual effect.

---

# 41. Коли НЕ варто використовувати Pseudo-elements

Не використовуй їх як заміну HTML для:

- основного тексту;
- важливих повідомлень;
- navigation content;
- form labels;
- semantic information;
- контенту, який має бути доступним для користувача незалежно від CSS.

Правило:

> HTML — content і semantics.  
> CSS — presentation і decoration.

---

# 42. Найважливіші Pseudo-elements

Для Junior Developer достатньо дуже добре знати:

    ::before
    ::after
    ::first-letter
    ::first-line
    ::selection
    ::placeholder
    ::marker

Особливо:

    ::before
    ::after

Вони використовуються надзвичайно часто.

---

# 43. Швидка шпаргалка

    /* Перед контентом */
    .element::before {
        content: "";
    }

    /* Після контенту */
    .element::after {
        content: "";
    }

    /* Перша літера */
    p::first-letter {
        font-size: 3rem;
    }

    /* Перший рядок */
    p::first-line {
        font-weight: 700;
    }

    /* Виділений текст */
    ::selection {
        background: black;
        color: white;
    }

    /* Placeholder */
    input::placeholder {
        color: gray;
    }

    /* Marker списку */
    li::marker {
        color: red;
    }

    /* File input button */
    input::file-selector-button {
        padding: 0.5rem 1rem;
    }

---

# 44. Найважливіший практичний шаблон

Один із шаблонів, який варто запам'ятати:

    .element {
        position: relative;
    }

    .element::after {
        content: "";
        position: absolute;
        inset: 0;
    }

Далі можна змінювати:

    width
    height
    background
    border
    transform
    opacity
    transition
    z-index

і отримувати різноманітні декоративні ефекти.

---

# 45. Pseudo-elements + Transitions

Pseudo-elements часто використовуються разом із `transition`.

    .link::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        transform: scaleX(0);
        transition: transform 0.3s ease;
    }

    .link:hover::after {
        transform: scaleX(1);
    }

Це один із базових патернів modern CSS UI.

---

# 46. Pseudo-elements + Transforms

Pseudo-element може анімуватися через:

    transform: scale();
    transform: scaleX();
    transform: scaleY();
    transform: translate();
    transform: rotate();

Наприклад:

    .button::before {
        content: "";
        position: absolute;
        inset: 0;
        transform: scale(0);
        transition: transform 0.3s ease;
    }

    .button:hover::before {
        transform: scale(1);
    }

---

# 47. Pseudo-elements + Gradients

Pseudo-element можна використовувати для gradient decoration.

    .hero::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
            to bottom,
            transparent,
            rgb(0 0 0 / 0.7)
        );
    }

Це дуже поширений патерн для hero sections.

---

# 48. Pseudo-elements + CSS Variables

Pseudo-elements можуть використовувати CSS custom properties.

    .badge {
        --badge-color: royalblue;
        position: relative;
    }

    .badge::before {
        content: "";
        width: 10px;
        height: 10px;
        background-color: var(--badge-color);
        border-radius: 50%;
    }

Це дозволяє створювати reusable components.

---

# 49. Pseudo-elements у компонентному CSS

Наприклад:

    .card {
        --accent-color: royalblue;
        position: relative;
    }

    .card::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background-color: var(--accent-color);
    }

Інша картка може змінити тільки:

    --accent-color: crimson;

Сам pseudo-element при цьому залишається однаковим.

---

# 50. Важлива концепція: HTML → CSS → Rendering

Корисно мислити так:

    HTML
      ↓
    Semantic structure
      ↓
    CSS selectors
      ↓
    Pseudo-class / Pseudo-element
      ↓
    Browser rendering

Наприклад:

    <button class="button">
        Save
    </button>

CSS:

    .button:hover::after {
        content: "✓";
    }

Логіка:

    .button
        ↓
    :hover
        ↓
    ::after
        ↓
    visual result

---

# 51. Різниця між HTML element та Pseudo-element

HTML element:

    <span class="icon"></span>

Pseudo-element:

    .button::before {
        content: "→";
    }

HTML element:

- існує в HTML;
- є частиною DOM;
- має семантику;
- може містити власний контент.

Pseudo-element:

- створюється CSS;
- використовується переважно для presentation;
- не є звичайним HTML-тегом;
- дуже зручний для decoration.

---

# 52. Що потрібно знати на рівні Core

Ти повинен знати:

- що таке pseudo-element;
- різницю між `:` та `::`;
- `::before`;
- `::after`;
- `content`;
- `::first-letter`;
- `::first-line`;
- `::selection`;
- `::placeholder`;
- `::marker`;
- `position: relative`;
- `position: absolute`;
- `z-index`;
- `pointer-events`.

---

# 53. Що потрібно знати на рівні Junior

Вміти самостійно створювати:

- decorative underline;
- overlay;
- icon;
- arrow;
- badge;
- status indicator;
- animated button;
- decorative card;
- custom list marker;
- custom placeholder;
- hover effect.

Особливо добре володіти:

    ::before
    ::after
    content
    position
    transform
    transition
    z-index

---

# 54. Що потрібно знати на рівні Middle

Розуміти:

- stacking context;
- containing block;
- `z-index`;
- `pointer-events`;
- accessibility implications;
- `currentColor`;
- `attr()`;
- CSS variables;
- pseudo-elements у component architecture;
- interaction між pseudo-classes та pseudo-elements;
- performance animation patterns.

Наприклад:

    .button:hover::after

потрібно читати як:

    button
        ↓
    hover state
        ↓
    after pseudo-element

---

# 55. Що потрібно знати на рівні Senior

Розуміти, коли pseudo-element є правильним архітектурним рішенням, а коли краще:

- HTML element;
- SVG;
- CSS background;
- gradient;
- actual component;
- semantic content.

Також потрібно враховувати:

- accessibility;
- maintainability;
- browser rendering;
- stacking contexts;
- component isolation;
- design system;
- performance;
- responsive behavior.

Senior-підхід:

> Не просто "чи можу я зробити це через `::before`?", а "чи є `::before` найкращим способом представити цей елемент?"

---

# 56. Питання для співбесіди

### 1. Що таке pseudo-element?

Спеціальний CSS-селектор для стилізації частини елемента або створення додаткового presentation-oriented content.

---

### 2. Яка різниця між pseudo-class та pseudo-element?

Pseudo-class:

    :hover

описує стан або умову.

Pseudo-element:

    ::before

представляє частину елемента або додатковий візуальний елемент.

---

### 3. Для чого потрібен `content`?

Він визначає вміст pseudo-element, особливо для:

    ::before
    ::after

---

### 4. Чи можна використовувати `::before` без `content`?

Для практичної роботи з generated content потрібно задавати `content`, найчастіше:

    content: "";

---

### 5. Чи є `::before` реальним HTML-елементом?

Ні. Це CSS pseudo-element.

---

### 6. Для чого потрібні `::before` та `::after`?

Переважно для:

- decoration;
- icons;
- overlays;
- backgrounds;
- animations;
- visual indicators.

---

### 7. Чим відрізняються `::first-letter` і `::first-line`?

`::first-letter` стилізує першу літеру.

`::first-line` стилізує перший сформований браузером рядок.

---

### 8. Для чого потрібен `::selection`?

Для стилізації тексту, який користувач виділив.

---

### 9. Для чого потрібен `::placeholder`?

Для стилізації placeholder у form controls.

---

### 10. Для чого потрібен `::marker`?

Для стилізації маркера списку.

---

### 11. Чому часто використовують `position: relative` на батьківському елементі?

Щоб absolute-positioned pseudo-element позиціонувався відносно цього елемента.

---

### 12. Для чого може знадобитися `pointer-events: none`?

Щоб декоративний pseudo-element не перехоплював pointer events.

---

# 57. Практична вправа 1 — Decorative Title

Створи:

    <h1 class="title">Frontend Developer</h1>

і через `::after` зроби декоративну лінію під заголовком.

Умови:

- без додаткового `<div>`;
- використовувати `::after`;
- `position: absolute`;
- додати `transition`.

---

# 58. Практична вправа 2 — Button Animation

Створи:

    <button class="button">
        Learn more
    </button>

Через `::before` створи animated background.

При hover:

    background
        →
    зліва направо

Використати:

    ::before
    :hover
    transform
    transition

---

# 59. Практична вправа 3 — Card Decoration

Створи card:

    <article class="card">
        <h2>CSS</h2>
        <p>Modern CSS techniques.</p>
    </article>

Через `::before` або `::after` додай декоративне коло у кутку.

Не додавай додаткових HTML-елементів.

---

# 60. Практична вправа 4 — Status Indicator

Створи:

    <span class="status status--online">
        Online
    </span>

Додай зелений кружечок через:

    ::before

Не використовуй окремий `<span>` для кружечка.

---

# 61. Практична вправа 5 — Animated Link

Створи:

    <a href="#" class="link">
        Read more
    </a>

При hover повинна з'являтися нижня лінія.

Використати:

    ::after
    transform: scaleX()
    transition
    :hover

---

# 62. Практична вправа 6 — Quote

Створи:

    <blockquote class="quote">
        Practice makes progress.
    </blockquote>

Через `::before` додай велику декоративну лапку.

---

# 63. Практична вправа 7 — Custom List Marker

Створи список:

    <ul class="features">
        <li>Fast</li>
        <li>Simple</li>
        <li>Reusable</li>
    </ul>

Заміни стандартний marker через:

    ::marker

---

# 64. Практична вправа 8 — Image Overlay

Створи:

    <div class="hero">
        <img src="image.jpg" alt="Landscape">
        <div class="hero__content">
            <h1>Explore the world</h1>
        </div>
    </div>

Через `::before` створити затемнення поверх зображення.

Використати:

    position
    inset
    background
    z-index

---

# 65. Головна шпаргалка

    /* =========================
       BEFORE
       ========================= */

    .element::before {
        content: "";
    }


    /* =========================
       AFTER
       ========================= */

    .element::after {
        content: "";
    }


    /* =========================
       FIRST LETTER
       ========================= */

    p::first-letter {
        font-size: 3rem;
    }


    /* =========================
       FIRST LINE
       ========================= */

    p::first-line {
        font-weight: 700;
    }


    /* =========================
       SELECTION
       ========================= */

    ::selection {
        background: black;
        color: white;
    }


    /* =========================
       PLACEHOLDER
       ========================= */

    input::placeholder {
        color: gray;
    }


    /* =========================
       MARKER
       ========================= */

    li::marker {
        color: red;
    }


    /* =========================
       FILE BUTTON
       ========================= */

    input::file-selector-button {
        padding: 0.5rem 1rem;
    }

---

# 66. Швидке порівняння

    :hover
        ↓
    Pseudo-class
        ↓
    стан елемента

    ::before
        ↓
    Pseudo-element
        ↓
    додатковий візуальний елемент


    :focus
        ↓
    стан


    ::placeholder
        ↓
    частина UI


    :nth-child(2)
        ↓
    позиція


    ::first-letter
        ↓
    частина тексту

---

# 67. Що запам'ятати

1. `::before` створює pseudo-element перед контентом.
2. `::after` створює pseudo-element після контенту.
3. Для `::before` та `::after` зазвичай потрібен `content`.
4. `::first-letter` працює з першою літерою.
5. `::first-line` працює з першим сформованим рядком.
6. `::selection` стилізує виділення тексту.
7. `::placeholder` стилізує placeholder.
8. `::marker` стилізує marker списку.
9. `::file-selector-button` стилізує кнопку file input.
10. Pseudo-element не є звичайним HTML-елементом.
11. `:` використовується для pseudo-classes.
12. `::` використовується для pseudo-elements.
13. `::before` і `::after` дуже часто використовуються з `position: absolute`.
14. Батьківському елементу часто потрібен `position: relative`.
15. Для декоративних шарів може знадобитися `z-index`.
16. Для декоративних overlay може знадобитися `pointer-events: none`.
17. Pseudo-elements найкраще підходять для presentation і decoration.
18. Важливий semantic content краще залишати в HTML.
19. `transition` + `transform` + `::before/::after` — дуже поширений патерн для UI-анімацій.
20. Хороший CSS використовує pseudo-elements там, де вони спрощують структуру, а не ускладнюють її.

---

# 68. Головна ментальна модель

Думай про pseudo-elements так:

    HTML
      ↓
    Реальний контент
      ↓
    CSS
      ↓
    ::before / ::after
      ↓
    Декоративний або візуальний шар

А pseudo-classes:

    HTML element
      ↓
    його стан / умова
      ↓
    :hover / :focus / :checked / ...
      ↓
    зміна стилю

Найважливіше розрізнення:

    :hover
    :focus
    :checked
    :nth-child()

→ **Pseudo-classes**

    ::before
    ::after
    ::first-letter
    ::first-line
    ::selection
    ::placeholder
    ::marker

→ **Pseudo-elements**

---

# 69. Mini Cheat Sheet

    /* Decorative element */

    .card {
        position: relative;
    }

    .card::before {
        content: "";
        position: absolute;
        inset: 0;
    }


    /* Hover */

    .button:hover::after {
        transform: scaleX(1);
    }


    /* Animated underline */

    .link::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.3s ease;
    }


    /* Selected text */

    ::selection {
        background: black;
        color: white;
    }


    /* Placeholder */

    input::placeholder {
        color: gray;
    }


    /* List marker */

    li::marker {
        color: royalblue;
    }


    /* First letter */

    p::first-letter {
        font-size: 3rem;
    }


    /* Attribute content */

    .tooltip::after {
        content: attr(data-tooltip);
    }


    /* Don't block clicks */

    .overlay::before {
        pointer-events: none;
    }

---

# 70. Підсумок

**Pseudo-elements** — це потужний CSS-інструмент для створення та стилізації візуальних частин елементів без додавання зайвих HTML-тегів.

Найважливіші для практичної роботи:

    ::before
    ::after

Вони дозволяють створювати:

    decorations
    icons
    arrows
    underlines
    overlays
    badges
    status indicators
    animated backgrounds
    visual effects

Інші важливі pseudo-elements:

    ::first-letter
    ::first-line
    ::selection
    ::placeholder
    ::marker
    ::file-selector-button

Головне правило:

> **HTML відповідає за content і semantics, CSS — за presentation.**

Тому `::before` і `::after` найкраще використовувати для **декоративних та візуальних елементів**, а не для важливої інформації.

Ключова комбінація, яку варто добре засвоїти:

    .element {
        position: relative;
    }

    .element::after {
        content: "";
        position: absolute;
        inset: 0;
    }

Разом із:

    :hover
    transform
    transition
    z-index
    pointer-events

це дає основу для створення великої кількості сучасних CSS UI-ефектів.