# 03. Elements and Attributes

HTML elements та attributes — основні будівельні блоки HTML-документа.

Element визначає:

    що це за частина документа

Attribute визначає:

    додаткові властивості або налаштування element

Наприклад:

    <a href="/about" class="link">
        About
    </a>

Тут:

    a       → element
    href    → attribute
    "/about" → attribute value
    class   → attribute
    "link"  → attribute value
    About   → content

Основна модель:

    Element
    ├── tag
    ├── attributes
    └── content

---

# Ключові поняття

✔ element  
✔ tag  
✔ opening tag  
✔ closing tag  
✔ start tag  
✔ end tag  
✔ content  
✔ attribute  
✔ attribute name  
✔ attribute value  
✔ attribute syntax  
✔ boolean attribute  
✔ global attribute  
✔ custom data attribute  
✔ `data-*`  
✔ `id`  
✔ `class`  
✔ `style`  
✔ `title`  
✔ `lang`  
✔ `hidden`  
✔ `tabindex`  
✔ `role`  
✔ `contenteditable`  
✔ `draggable`  
✔ `spellcheck`  
✔ `dir`  
✔ `accesskey`  
✔ nesting  
✔ parent  
✔ child  
✔ sibling  
✔ void element  
✔ DOM element  
✔ semantic element  

---

# Що потрібно пам'ятати

• HTML element — основна одиниця HTML-документа.

• Tag — синтаксична конструкція, яка позначає element.

• Element може містити content.

• Element може мати attributes.

• Attribute записується в opening tag.

• Типовий синтаксис:

    attribute="value"

• Один element може мати декілька attributes.

• Attribute names зазвичай пишуться lowercase.

• Значення attributes зазвичай беруться в лапки.

• Деякі attributes є boolean attributes.

• Boolean attribute визначається самою наявністю attribute.

• `id` повинен ідентифікувати конкретний element у межах документа.

• `class` використовується для групування elements та CSS/JavaScript hooks.

• `data-*` використовується для зберігання custom data, пов'язаної з element.

• Global attributes можуть застосовуватися до багатьох HTML elements.

• Не кожен attribute можна використовувати з кожним element.

• Attributes мають різне призначення: semantics, behavior, accessibility, styling hooks, metadata тощо.

• Не слід використовувати attributes тільки для того, щоб отримати потрібний візуальний ефект, якщо для цього існує CSS.

---

# HTML Element

HTML element — структурна одиниця HTML-документа.

Наприклад:

    <p>Hello World</p>

Це один element.

Його можна представити:

    <p>
        Hello World
    </p>

Тут:

    <p>          → opening tag
    Hello World  → content
    </p>         → closing tag

---

# Tag

Tag — частина синтаксису HTML.

Наприклад:

    <p>

або:

    </p>

Element:

    <p>Hello</p>

Tag:

    <p>

та:

    </p>

---

# Opening Tag

Opening tag відкриває element.

Наприклад:

    <h1>

    <p>

    <section>

    <button>

---

# Closing Tag

Closing tag закриває element.

Наприклад:

    </h1>

    </p>

    </section>

    </button>

Closing tag має `/`.

---

# Content

Content — вміст element.

Наприклад:

    <p>
        Hello World
    </p>

Тут:

    Hello World → content

---

# Element без Content

Деякі elements не мають content.

Наприклад:

    <img
        src="photo.jpg"
        alt="Landscape"
    >

`img` є void element.

---

# Attribute

Attribute — додаткова інформація про element.

Наприклад:

    <p class="intro">
        Hello
    </p>

Тут:

    class → attribute name
    "intro" → attribute value

---

# Attribute Syntax

Основний синтаксис:

    attribute="value"

Наприклад:

    id="main"

    class="container"

    href="/about"

    src="photo.jpg"

    alt="Mountain"

---

# Attribute у Opening Tag

Attributes розміщуються в opening tag.

Наприклад:

    <a
        href="/about"
        class="link"
    >
        About
    </a>

Тут:

    a → element

    href="/about"
        → attribute

    class="link"
        → attribute

---

# Multiple Attributes

Element може мати багато attributes.

Наприклад:

    <input
        type="text"
        id="username"
        class="input"
        name="username"
        placeholder="Enter your name"
    >

Attributes:

    type
    id
    class
    name
    placeholder

---

# Attribute Order

Порядок attributes зазвичай не має значення для більшості HTML elements.

Наприклад:

    <input
        type="text"
        id="username"
        class="input"
    >

і:

    <input
        class="input"
        id="username"
        type="text"
    >

функціонально можуть бути еквівалентними.

Але consistent ordering покращує readability.

---

# Quoted Attribute Values

Рекомендований стиль:

    <input
        type="text"
        name="username"
    >

Значення attribute беруться в лапки.

Можна використовувати:

    "double quotes"

або:

    'single quotes'

Але в HTML-проєктах часто використовують double quotes:

    class="container"

---

# Empty Attribute Value

Attribute може мати порожнє значення.

Наприклад:

    <input
        value=""
    >

Тут:

    value → attribute
    ""    → empty value

Це відрізняється від boolean attribute.

---

# Boolean Attributes

Boolean attribute — attribute, де важлива сама наявність attribute.

Наприклад:

    <button disabled>
        Save
    </button>

Наявність:

    disabled

означає:

    true

---

# Boolean Attribute Examples

Поширені boolean attributes:

    disabled
    checked
    required
    readonly
    multiple
    autofocus
    hidden
    selected

Наприклад:

    <input
        type="checkbox"
        checked
    >

    <input
        type="text"
        disabled
    >

    <input
        type="email"
        required
    >

---

# Boolean Attribute Values

Наприклад:

    <input disabled>

У HTML наявність attribute означає, що attribute встановлений.

Не потрібно писати:

    disabled="true"

Хоча HTML допускає attribute value у відповідних формах, для boolean attributes важливо саме presence.

---

# id

`id` — global attribute, який ідентифікує element.

Наприклад:

    <section id="about">
        ...
    </section>

Інший element:

    <button id="save">
        Save
    </button>

---

# id та Uniqueness

У документі значення `id` повинно бути унікальним.

Добре:

    <h1 id="main-title">
        My Website
    </h1>

Не варто:

    <h1 id="title">
        First
    </h1>

    <h2 id="title">
        Second
    </h2>

Однаковий `id` створює проблеми для:

    CSS selectors
    JavaScript
    accessibility
    links
    DOM APIs

---

# id та CSS

`id` можна використовувати в CSS selector:

    #main-title {
        font-size: 2rem;
    }

Але `id` не слід використовувати як основний механізм для reusable styling.

Для повторного стилювання краще:

    class

---

# id та JavaScript

JavaScript може знаходити element за `id`.

Наприклад:

    const button = document.getElementById("save");

HTML:

    <button id="save">
        Save
    </button>

---

# id та Fragment Links

`id` можна використовувати для переходу до певної частини сторінки.

Наприклад:

    <section id="about">
        <h2>About</h2>
    </section>

Посилання:

    <a href="#about">
        About
    </a>

---

# class

`class` — global attribute для визначення одного або декількох класів element.

Наприклад:

    <div class="container">
        ...
    </div>

---

# Multiple Classes

Element може мати декілька класів.

Наприклад:

    <button
        class="button primary large"
    >
        Save
    </button>

Тут element має три classes:

    button
    primary
    large

---

# class та CSS

CSS:

    .button {
        padding: 10px;
    }

    .primary {
        font-weight: bold;
    }

---

# class та JavaScript

JavaScript може працювати з classes.

Наприклад:

    const button = document.querySelector(".button");

Можна змінювати classes:

    button.classList.add("active");

    button.classList.remove("active");

    button.classList.toggle("active");

---

# id vs class

Це одна з найважливіших відмінностей.

    id
        → identifies an element

    class
        → groups elements

Наприклад:

    <button
        id="save-button"
        class="button primary"
    >
        Save
    </button>

Тут:

    id
        → конкретний button

    class
        → reusable categories

---

# style

`style` — global attribute для inline CSS.

Наприклад:

    <p style="color: red;">
        Error
    </p>

Це працює, але для більших проєктів краще використовувати CSS:

    <p class="error">
        Error
    </p>

і:

    .error {
        color: red;
    }

---

# title

`title` — global attribute, який задає advisory information про element.

Наприклад:

    <button
        title="Save changes"
    >
        Save
    </button>

Браузер може показувати цю інформацію як tooltip.

Не слід використовувати `title` як єдиний спосіб передати важливу інформацію користувачу.

---

# lang

`lang` — global attribute для визначення мови content.

Наприклад:

    <p lang="uk">
        Привіт!
    </p>

Для всього документа:

    <html lang="uk">

Мову можна змінити для окремої частини:

    <p lang="en">
        Hello!
    </p>

---

# dir

`dir` визначає direction тексту.

Основні значення:

    ltr
    rtl
    auto

Наприклад:

    <p dir="ltr">
        Left to right
    </p>

Для right-to-left:

    <p dir="rtl">
        ...
    </p>

---

# hidden

`hidden` — boolean global attribute.

Наприклад:

    <p hidden>
        This content is hidden.
    </p>

Наявність:

    hidden

означає, що element не повинен бути представлений як звичайний rendered content.

---

# tabindex

`tabindex` впливає на keyboard focusability та порядок навігації за допомогою клавіші Tab.

Наприклад:

    <button tabindex="0">
        Save
    </button>

Негативне значення може прибрати element із послідовної Tab navigation, хоча element може залишатися programmatically focusable.

Наприклад:

    <div tabindex="-1">
        ...
    </div>

Позитивні значення `tabindex` зазвичай не рекомендуються для звичайної побудови keyboard navigation, оскільки можуть створювати складний порядок фокусу.

---

# contenteditable

`contenteditable` дозволяє зробити content редагованим користувачем.

Наприклад:

    <div contenteditable="true">
        Edit this text.
    </div>

Значення:

    true
    false

---

# draggable

`draggable` визначає, чи може element бути draggable.

Наприклад:

    <img
        src="photo.jpg"
        alt="Photo"
        draggable="true"
    >

---

# spellcheck

`spellcheck` визначає, чи може браузер перевіряти spelling для editable content.

Наприклад:

    <textarea spellcheck="true">
    </textarea>

---

# accesskey

`accesskey` задає клавішу або комбінацію для швидкого доступу до element.

Наприклад:

    <button accesskey="s">
        Save
    </button>

Поведінка access keys може залежати від браузера та операційної системи.

Не слід бездумно використовувати їх, оскільки вони можуть конфліктувати із системними або browser shortcuts.

---

# role

`role` визначає ARIA role element.

Наприклад:

    <div role="button">
        Save
    </div>

Але важливе правило:

Якщо існує native HTML element, краще використовувати його.

Замість:

    <div role="button">
        Save
    </div>

краще:

    <button>
        Save
    </button>

Native HTML element вже має відповідну semantics та behavior.

---

# data-* Attributes

HTML дозволяє створювати custom data attributes.

Синтаксис:

    data-name="value"

Наприклад:

    <button
        data-user-id="42"
        data-action="delete"
    >
        Delete
    </button>

---

# data-* Purpose

`data-*` використовується для зберігання custom data, пов'язаної з element.

Наприклад:

    <article
        data-post-id="123"
        data-category="html"
    >
        ...
    </article>

Це не заміна semantic HTML.

---

# data-* та JavaScript

JavaScript може отримати data через `dataset`.

HTML:

    <button
        data-user-id="42"
    >
        User
    </button>

JavaScript:

    const button = document.querySelector("button");

    console.log(button.dataset.userId);

Результат:

    "42"

---

# data-* Naming

HTML:

    data-user-id="42"

JavaScript:

    element.dataset.userId

Наприклад:

    data-product-id

перетворюється в:

    dataset.productId

---

# Global Attributes

Global attributes — attributes, які можуть використовуватися на великій кількості HTML elements.

Приклади:

    id
    class
    style
    title
    lang
    dir
    hidden
    tabindex
    contenteditable
    draggable
    spellcheck
    data-*

Але "global" не означає, що кожен attribute має однаковий практичний сенс для кожного element.

---

# Attribute Categories

Attributes можна умовно поділити на групи.

## Identification

    id
    class

---

## Styling

    class
    style

---

## Metadata

    title
    lang
    dir

---

## Accessibility

    role
    tabindex
    aria-*

---

## Custom Data

    data-*

---

## Behavior

Наприклад:

    disabled
    checked
    required
    readonly
    multiple

---

# Element-Specific Attributes

Не всі attributes є global.

Деякі attributes призначені для конкретних elements.

Наприклад:

    href

для:

    <a>

---

`src` використовується, зокрема, для:

    <img>
    <script>
    <iframe>

---

`alt` використовується для:

    <img>

---

`type` може використовуватися з:

    <input>
    <button>
    <script>
    <link>

але його значення та поведінка залежать від element.

---

# href

`href` визначає URL або destination для hyperlink.

Наприклад:

    <a href="/about">
        About
    </a>

Зовнішній URL:

    <a href="https://example.com">
        Example
    </a>

Fragment:

    <a href="#contact">
        Contact
    </a>

---

# src

`src` визначає source ресурсу.

Наприклад:

    <img
        src="photo.jpg"
        alt="Landscape"
    >

Для JavaScript:

    <script src="app.js"></script>

---

# alt

`alt` — alternative text для зображення.

Наприклад:

    <img
        src="mountain.jpg"
        alt="Mountain covered with snow"
    >

`alt` важливий для:

    accessibility
    cases when image cannot be displayed
    understanding image content

Для декоративного зображення:

    <img
        src="decoration.svg"
        alt=""
    >

---

# name

`name` часто використовується у form controls.

Наприклад:

    <input
        type="text"
        name="username"
    >

При відправленні form `name` допомагає визначити назву поля.

---

# value

`value` задає value для багатьох form controls.

Наприклад:

    <input
        type="text"
        name="username"
        value="John"
    >

---

# placeholder

`placeholder` показує коротку підказку в form control.

Наприклад:

    <input
        type="email"
        placeholder="Enter your email"
    >

Placeholder не повинен замінювати `<label>`.

---

# disabled

`disabled` робить підтримуваний form control disabled.

Наприклад:

    <button disabled>
        Save
    </button>

---

# required

`required` позначає form control як обов'язковий.

Наприклад:

    <input
        type="email"
        required
    >

---

# checked

`checked` встановлює checkbox або radio як checked.

Наприклад:

    <input
        type="checkbox"
        checked
    >

---

# readonly

`readonly` робить value деяких form controls недоступним для редагування користувачем.

Наприклад:

    <input
        type="text"
        value="Read only"
        readonly
    >

`readonly` та `disabled` — не одне й те саме.

---

# Attribute Selector

CSS може вибирати elements за attributes.

Наприклад:

    input[type="email"] {
        ...
    }

Або:

    button[disabled] {
        ...
    }

---

# Attribute Presence Selector

Можна перевіряти наявність attribute.

Наприклад:

    [disabled] {
        ...
    }

Вибере elements, які мають `disabled`.

---

# Attribute Value Selector

Можна вибирати конкретне значення:

    input[type="text"] {
        ...
    }

---

# HTML Entity vs Attribute

Не потрібно плутати:

    attribute

та:

    entity / character reference

Наприклад:

    <input
        title="Tom &amp; Jerry"
    >

Тут:

    title → attribute
    &amp; → character reference

---

# Nesting та Attributes

Attributes належать element, а nesting визначає структуру між elements.

Наприклад:

    <section id="about">

        <h2 class="title">
            About
        </h2>

        <p class="text">
            Some text.
        </p>

    </section>

Тут:

    section
        → parent

    h2
        → child

    p
        → child

    id="about"
        → attribute of section

    class="title"
        → attribute of h2

    class="text"
        → attribute of p

---

# Void Elements та Attributes

Void elements можуть мати attributes.

Наприклад:

    <img
        src="photo.jpg"
        alt="Landscape"
        width="800"
        height="600"
    >

Але вони не мають closing tag.

---

# Void Elements

Приклади:

    <area>
    <base>
    <br>
    <col>
    <embed>
    <hr>
    <img>
    <input>
    <link>
    <meta>
    <param>
    <source>
    <track>
    <wbr>

Наприклад:

    <br>

    <img
        src="photo.jpg"
        alt="Photo"
    >

---

# Custom Elements

Web Components дозволяють створювати custom elements.

Наприклад:

    <user-card></user-card>

Custom element names зазвичай містять hyphen:

    user-card
    product-card
    app-header

Custom elements — advanced HTML/Web Platform topic.

---

# Attribute Values та JavaScript

HTML attribute values зазвичай представлені як strings.

Наприклад:

    <button
        data-count="10"
    >
        Count
    </button>

JavaScript:

    button.dataset.count

поверне:

    "10"

а не:

    10

Якщо потрібне число:

    Number(button.dataset.count)

---

# DOM Attributes vs HTML Attributes

HTML source:

    <input
        id="username"
        class="input"
    >

Браузер створює DOM element.

JavaScript може працювати з attributes:

    const input = document.querySelector("input");

    input.getAttribute("id");

Результат:

    "username"

---

# getAttribute()

Отримання attribute:

    const link = document.querySelector("a");

    const href = link.getAttribute("href");

---

# setAttribute()

Встановлення attribute:

    const link = document.querySelector("a");

    link.setAttribute(
        "target",
        "_blank"
    );

---

# hasAttribute()

Перевірка наявності attribute:

    const input = document.querySelector("input");

    input.hasAttribute("required");

Результат:

    true
    або
    false

---

# removeAttribute()

Видалення attribute:

    input.removeAttribute("disabled");

---

# Attribute API

Основні DOM methods:

    getAttribute()
    setAttribute()
    hasAttribute()
    removeAttribute()

---

# classList

Для роботи з classes існує:

    classList

Наприклад:

    const button = document.querySelector("button");

    button.classList.add("active");

    button.classList.remove("active");

    button.classList.toggle("active");

    button.classList.contains("active");

---

# id Property

DOM element має property:

    id

Наприклад:

    const heading = document.querySelector("h1");

    heading.id = "main-title";

---

# className

DOM element має:

    className

Наприклад:

    const box = document.querySelector(".box");

    box.className = "box active";

Для часткової роботи з classes краще використовувати:

    classList

---

# dataset

Для `data-*` attributes використовується:

    dataset

HTML:

    <div
        data-user-id="42"
        data-role="admin"
    >
        User
    </div>

JavaScript:

    element.dataset.userId

    element.dataset.role

---

# Attribute Mutation

Attributes можна змінювати через JavaScript.

Наприклад:

    const image = document.querySelector("img");

    image.setAttribute(
        "alt",
        "New description"
    );

---

# Практичний приклад

    <!DOCTYPE html>

    <html lang="uk">

    <head>

        <meta charset="UTF-8">

        <title>
            Elements and Attributes
        </title>

    </head>

    <body>

        <main
            id="main-content"
            class="container"
        >

            <h1
                id="page-title"
                class="title primary"
            >
                HTML Elements
            </h1>

            <p
                class="description"
                title="Introduction"
            >
                Elements can have attributes.
            </p>

            <img
                src="photo.jpg"
                alt="Mountain landscape"
                width="800"
                height="600"
            >

            <button
                id="save"
                class="button primary"
                data-action="save"
            >
                Save
            </button>

        </main>

    </body>

    </html>

---

# Розбір практичного прикладу

    <main
        id="main-content"
        class="container"
    >

Тут:

    main
        → element

    id="main-content"
        → global attribute

    class="container"
        → global attribute

---

Наступний element:

    <h1
        id="page-title"
        class="title primary"
    >
        HTML Elements
    </h1>

Тут:

    h1
        → element

    id="page-title"
        → attribute

    class="title primary"
        → attribute

    HTML Elements
        → content

---

Image:

    <img
        src="photo.jpg"
        alt="Mountain landscape"
        width="800"
        height="600"
    >

Тут:

    src
        → source

    alt
        → alternative text

    width
        → image width

    height
        → image height

---

Button:

    <button
        id="save"
        class="button primary"
        data-action="save"
    >
        Save
    </button>

Тут:

    id
        → identifies element

    class
        → reusable classes

    data-action
        → custom data

    Save
        → content

---

# Типові помилки

❌ Неправильно ставити attribute поза opening tag.

Неправильно:

    <p>
        class="text"
        Hello
    </p>

Правильно:

    <p class="text">
        Hello
    </p>

---

❌ Забувати лапки навколо attribute value.

Не рекомендується:

    <div class=container>
        ...
    </div>

Краще:

    <div class="container">
        ...
    </div>

---

❌ Використовувати однаковий `id` для декількох elements.

Не варто:

    <p id="text">First</p>

    <p id="text">Second</p>

---

❌ Використовувати `id` для всіх стилів.

Не варто будувати CSS:

    #header
    #button
    #card
    #text
    #title

для reusable components.

Краще використовувати classes:

    .header
    .button
    .card
    .text
    .title

---

❌ Плутати `id` та `class`.

    id
        → individual identity

    class
        → reusable group/category

---

❌ Використовувати `style` для великої кількості CSS.

Наприклад:

    <div
        style="
            color: red;
            padding: 20px;
            margin: 10px;
            font-size: 20px;
        "
    >
        ...
    </div>

Для великих стилів краще:

    <div class="alert">
        ...
    </div>

---

❌ Використовувати `title` замість accessible label.

Наприклад, для form control:

    <input
        title="Email"
    >

Краще:

    <label for="email">
        Email
    </label>

    <input
        id="email"
        type="email"
        name="email"
    >

---

❌ Використовувати `<div role="button">` замість `<button>`.

Неідеально:

    <div role="button">
        Save
    </div>

Краще:

    <button>
        Save
    </button>

---

❌ Використовувати `data-*` для semantic information.

Наприклад:

    <div data-type="navigation">
        ...
    </div>

Краще:

    <nav>
        ...
    </nav>

якщо element справді є navigation.

---

❌ Використовувати неправильний attribute для element.

Наприклад, не слід механічно переносити:

    href

на elements, для яких він не має відповідної семантики.

Attributes мають конкретне призначення та застосовність.

---

# Best Practices

## Використовувати lowercase

Рекомендовано:

    <button
        class="primary"
    >
        Save
    </button>

---

## Використовувати double quotes

    class="container"

---

## Використовувати semantic elements

Замість:

    <div
        role="navigation"
    >
        ...
    </div>

краще:

    <nav>
        ...
    </nav>

---

## Використовувати native HTML

Замість:

    <div role="button">
        Save
    </div>

краще:

    <button>
        Save
    </button>

---

## Використовувати meaningful class names

Краще:

    class="product-card"

ніж:

    class="box1"

---

## Не зловживати id

`id` використовують для:

    unique identification
    fragment links
    DOM targeting
    specific relationships

Для reusable styling:

    class

---

## Не використовувати style без потреби

Краще:

    <p class="error">
        Error message
    </p>

ніж:

    <p style="color: red;">
        Error message
    </p>

---

## Використовувати data-* для custom data

Наприклад:

    <button
        data-product-id="42"
    >
        Delete
    </button>

---

## Не використовувати data-* замість semantic HTML

Якщо існує відповідний semantic element:

    <nav>
    <button>
    <article>
    <time>
    <address>

краще використовувати його.

---

# Accessibility

Attributes можуть мати велике значення для accessibility.

Важливі приклади:

    lang
    alt
    id
    for
    tabindex
    aria-*
    role

Але основне правило:

    native HTML semantics
        ↓
    first choice

    ARIA
        ↓
    when native HTML is insufficient

---

# id та label

Form control можна пов'язати з label через `for` та `id`.

Наприклад:

    <label for="email">
        Email
    </label>

    <input
        id="email"
        type="email"
        name="email"
    >

Тут:

    label[for]
        ↓
    input[id]

---

# aria-* Attributes

ARIA attributes використовуються для accessibility information.

Наприклад:

    <button
        aria-label="Close"
    >
        ×
    </button>

Але ARIA не повинна замінювати native semantics без необхідності.

---

# Attribute Naming

HTML attributes:

    lowercase

Наприклад:

    class
    id
    href
    src
    alt
    data-user-id

Не рекомендується:

    CLASS
    ID
    HREF

---

# Attribute Value Naming

Для classes часто використовують:

    kebab-case

Наприклад:

    product-card
    main-header
    navigation-link

Для `data-*`:

    data-user-id
    data-product-id
    data-action

---

# Element vs Attribute

Дуже важлива різниця.

Element:

    <a href="/about">
        About
    </a>

Тут:

    a
        → element

Attribute:

    href="/about"

Тут:

    href
        → attribute name

    "/about"
        → attribute value

---

# Element vs Tag

    <p>Hello</p>

Element:

    <p>Hello</p>

Opening tag:

    <p>

Closing tag:

    </p>

---

# Attribute vs Content

    <p class="intro">
        Hello
    </p>

Attribute:

    class="intro"

Content:

    Hello

---

# Attribute vs CSS Property

Не потрібно плутати:

    HTML attribute

та:

    CSS property

Наприклад:

    <div class="box">
        ...
    </div>

`class`:

    → HTML attribute

CSS:

    .box {
        color: red;
    }

`color`:

    → CSS property

---

# Attribute vs DOM Property

У JavaScript можна зустріти:

    HTML attribute

і:

    DOM property

Наприклад:

    <input
        id="username"
        value="John"
    >

DOM:

    input.value

Attribute:

    input.getAttribute("value")

Це пов'язані, але концептуально різні речі.

---

# Attribute Reflection

Деякі HTML attributes відображаються у відповідних DOM properties.

Наприклад:

    <input id="username">

JavaScript:

    input.id

та:

    input.getAttribute("id")

можуть показувати одне значення.

Але не всі attributes та properties поводяться однаково.

Це важливіше на глибшому рівні DOM.

---

# Практичні патерни

## Unique Element

    <button id="save-button">
        Save
    </button>

---

## Reusable Component

    <article class="card">
        ...
    </article>

---

## Multiple Classes

    <article
        class="card featured large"
    >
        ...
    </article>

---

## Link

    <a
        href="/about"
        class="navigation-link"
    >
        About
    </a>

---

## Image

    <img
        src="photo.jpg"
        alt="Mountain landscape"
    >

---

## Form Input

    <label for="username">
        Username
    </label>

    <input
        id="username"
        name="username"
        type="text"
        required
    >

---

## Boolean Attribute

    <button disabled>
        Save
    </button>

---

## Custom Data

    <button
        data-user-id="42"
        data-action="delete"
    >
        Delete
    </button>

---

# Attribute Flow

    HTML source
        ↓
    attribute
        ↓
    browser parser
        ↓
    DOM element
        ↓
    JavaScript
        ↓
    getAttribute()
    setAttribute()
    removeAttribute()

---

# Міні-шпаргалка

## Element

    <p>Hello</p>

---

## Opening tag

    <p>

---

## Closing tag

    </p>

---

## Attribute

    class="text"

---

## Attribute name

    class

---

## Attribute value

    "text"

---

## Multiple attributes

    <input
        type="text"
        id="username"
        class="input"
    >

---

## id

    <div id="main">
        ...
    </div>

    → unique identity

---

## class

    <div class="container">
        ...
    </div>

    → reusable class

---

## Multiple classes

    <div class="card featured large">
        ...
    </div>

---

## Boolean

    <button disabled>
        Save
    </button>

    → presence = enabled state

---

## data-*

    <button
        data-user-id="42"
    >
        User
    </button>

---

## style

    <p style="color: red;">
        Error
    </p>

---

## title

    <button title="Save changes">
        Save
    </button>

---

## lang

    <html lang="uk">

---

## hidden

    <div hidden>
        Hidden content
    </div>

---

## tabindex

    <button tabindex="0">
        Save
    </button>

---

## DOM attribute methods

    element.getAttribute("id")

    element.setAttribute(
        "data-state",
        "active"
    )

    element.hasAttribute("disabled")

    element.removeAttribute("disabled")

---

## classList

    element.classList.add("active")

    element.classList.remove("active")

    element.classList.toggle("active")

    element.classList.contains("active")

---

## dataset

    element.dataset.userId

---

# Основні правила

    element
        → структурна одиниця HTML

    tag
        → opening / closing syntax

    attribute
        → additional information

    attribute value
        → value associated with attribute

    id
        → unique identity

    class
        → reusable grouping

    data-*
        → custom data

    boolean attribute
        → presence represents state

    global attribute
        → usable on many elements

    element-specific attribute
        → intended for particular elements

    void element
        → no closing tag

---

# Питання зі співбесіди

Що таке HTML element?

Що таке HTML tag?

Чим element відрізняється від tag?

Що таке opening tag?

Що таке closing tag?

Що таке content?

Що таке attribute?

Що таке attribute name?

Що таке attribute value?

Де розміщуються attributes?

Чи може element мати декілька attributes?

Що таке boolean attribute?

Наведи приклади boolean attributes.

Що таке global attribute?

Наведи приклади global attributes.

Що таке element-specific attribute?

Що таке `id`?

Чому `id` повинен бути унікальним?

Для чого використовується `class`?

Чим `id` відрізняється від `class`?

Чи може element мати декілька classes?

Для чого використовується `style`?

Для чого використовується `title`?

Для чого використовується `lang`?

Для чого використовується `hidden`?

Що робить `tabindex`?

Що таке `data-*` attributes?

Навіщо використовують `data-*`?

Як отримати `data-*` attribute через JavaScript?

Що таке `dataset`?

Для чого потрібен `href`?

Для чого потрібен `src`?

Для чого потрібен `alt`?

Для чого потрібен `name`?

Для чого потрібен `value`?

Для чого потрібен `placeholder`?

Що робить `disabled`?

Що робить `required`?

Що робить `checked`?

Що робить `readonly`?

Чим `disabled` відрізняється від `readonly`?

Що таке attribute selector у CSS?

Що робить `getAttribute()`?

Що робить `setAttribute()`?

Що робить `hasAttribute()`?

Що робить `removeAttribute()`?

Що таке `classList`?

Чим `className` відрізняється від `classList`?

Що таке DOM property?

Чим HTML attribute відрізняється від DOM property?

Що таке `role`?

Коли потрібно використовувати ARIA?

Чому краще використовувати native HTML elements замість `<div role="button">`?

Що таке void element?

Чи можуть void elements мати attributes?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке element.

Що таке tag.

Opening tag.

Closing tag.

Content.

Attribute.

Attribute name.

Attribute value.

Attribute syntax.

Multiple attributes.

Boolean attributes.

Void elements.

`id`.

`class`.

Multiple classes.

`href`.

`src`.

`alt`.

`name`.

`value`.

`type`.

`placeholder`.

`disabled`.

`required`.

`checked`.

`readonly`.

Основи global attributes.

Основи `data-*`.

Основи semantic HTML.

Основи accessibility attributes.

---

# 🔵 Junior

Глибше розуміння attributes.

Global attributes.

Element-specific attributes.

Boolean attributes.

`id` та uniqueness.

`class` та reusable styling.

`data-*`.

`dataset`.

`title`.

`lang`.

`dir`.

`hidden`.

`tabindex`.

`contenteditable`.

`draggable`.

`spellcheck`.

`role`.

`aria-*`.

Attribute selectors.

`getAttribute()`.

`setAttribute()`.

`hasAttribute()`.

`removeAttribute()`.

`classList`.

`className`.

DOM attributes.

DOM properties.

Attribute vs property.

Правильне використання native HTML elements.

Accessibility та attributes.

---

# 🟠 Middle

Глибоке розуміння HTML attributes та DOM.

Attribute reflection.

Content attributes.

IDL attributes.

DOM properties.

Boolean attributes та DOM behavior.

Enumerated attributes.

Global attributes.

Custom data attributes.

Dataset API.

Attribute mutation.

MutationObserver.

ARIA attributes.

ARIA states and properties.

Native semantics.

Accessibility tree.

Form attributes.

Form-associated elements.

Constraint validation attributes.

`autocomplete`.

`inputmode`.

`pattern`.

`min`.

`max`.

`step`.

`minlength`.

`maxlength`.

`multiple`.

`accept`.

`form`.

`formaction`.

`formenctype`.

`formmethod`.

`formnovalidate`.

`formtarget`.

Advanced CSS attribute selectors.

Attribute presence.

Exact match.

Prefix match.

Suffix match.

Substring match.

Case sensitivity modifiers.

---

# 🔴 Senior

Глибоке розуміння HTML Standard.

Content attributes.

IDL attributes.

Attribute reflection.

Boolean attribute reflection.

Enumerated attributes.

DOMString properties.

Web IDL.

Custom elements.

Custom element lifecycle.

Observed attributes.

`attributeChangedCallback()`.

Web Components.

Shadow DOM.

Global attributes.

ARIA semantics.

Accessibility tree.

Native semantics vs ARIA.

Form-associated custom elements.

Custom states.

ElementInternals.

`data-*` architecture.

Attribute mutation.

MutationObserver.

DOM performance.

Attribute selectors та CSS performance.

Browser parsing.

DOM construction.

HTML conformance.

Attribute parsing rules.

Error recovery.

Browser compatibility.

HTML Living Standard.

---

# Головне

• Element — основна одиниця HTML-документа.

• Tag — синтаксична конструкція, яка відкриває або закриває element.

• Типовий element:

    <tag>content</tag>

• Attribute додає інформацію або налаштування element.

• Типовий attribute:

    name="value"

• Attributes розміщуються в opening tag.

• Один element може мати декілька attributes.

• `id` призначений для ідентифікації element.

• `id` повинен бути унікальним у документі.

• `class` призначений для групування elements.

• Один element може мати декілька classes.

• `class` часто використовується для CSS та JavaScript hooks.

• Boolean attributes визначаються своєю наявністю.

Наприклад:

    <button disabled>
        Save
    </button>

• Global attributes можуть застосовуватися до багатьох elements.

• Element-specific attributes мають конкретну область застосування.

• `href` використовується, зокрема, для links.

• `src` використовується для source ресурсів.

• `alt` задає alternative text для images.

• `data-*` використовується для custom data.

• `dataset` дозволяє працювати з `data-*` через JavaScript.

• `style` дозволяє задавати inline CSS, але його не слід без потреби використовувати замість нормальної CSS-архітектури.

• `title` може надавати advisory information, але не повинен бути єдиним способом передавання важливої інформації.

• `lang` визначає мову content.

• `hidden` є boolean global attribute.

• `tabindex` впливає на keyboard focus behavior.

• Native HTML elements бажано використовувати замість ARIA-імітацій.

Наприклад:

    <button>
        Save
    </button>

краще за:

    <div role="button">
        Save
    </div>

• Attributes можна читати та змінювати через DOM API:

    getAttribute()
    setAttribute()
    hasAttribute()
    removeAttribute()

• Для classes використовують:

    classList

• Для `data-*` використовують:

    dataset

• HTML attribute та DOM property — пов'язані, але не тотожні поняття.

• Правильний attribute повинен відповідати element та його призначенню.

---

# Найважливіша модель

    HTML Element
          │
          ├── Tag
          │
          ├── Attributes
          │     ├── id
          │     ├── class
          │     ├── data-*
          │     └── element-specific
          │
          └── Content

---

# Attribute Model

    <button
        id="save"
        class="button primary"
        data-action="save"
        disabled
    >
        Save
    </button>

    button
        ↓
    element

    id="save"
        ↓
    identity

    class="button primary"
        ↓
    reusable classes

    data-action="save"
        ↓
    custom data

    disabled
        ↓
    boolean state

    Save
        ↓
    content

---

# DOM Model

    HTML source
        ↓
    <button
        id="save"
        class="button"
    >
        Save
    </button>
        ↓
    DOM element
        ↓
    attributes
        ↓
    JavaScript

    getAttribute()
    setAttribute()
    hasAttribute()
    removeAttribute()
    classList
    dataset

---

# Element → Attribute → Behavior

    element
        ↓
    attribute
        ↓
    browser semantics
        ↓
    DOM
        ↓
    CSS / JavaScript / Accessibility

Наприклад:

    <button
        disabled
    >
        Save
    </button>

    button
        ↓
    disabled
        ↓
    disabled state
        ↓
    browser behavior
        ↓
    accessibility + interaction

---

# Запам'ятати одним блоком

    element
        → HTML building block

    tag
        → markup syntax

    attribute
        → additional information

    name="value"
        → common attribute syntax

    id
        → unique identity

    class
        → reusable grouping

    data-*
        → custom data

    boolean attribute
        → presence represents state

    global attribute
        → usable across many elements

    specific attribute
        → intended for particular elements

    getAttribute()
        → read attribute

    setAttribute()
        → set attribute

    hasAttribute()
        → check attribute

    removeAttribute()
        → remove attribute

    classList
        → manage classes

    dataset
        → manage data-* attributes

    HTML attribute
        ↔
    DOM property

    native HTML
        →
    prefer before ARIA imitation