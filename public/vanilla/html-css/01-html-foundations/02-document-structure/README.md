# 02. Document Structure

HTML document structure — це фундаментальна структура HTML-документа, яка визначає, як браузер повинен інтерпретувати документ, де знаходяться metadata та де знаходиться основний контент сторінки.

Типова структура:

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >
        <title>My Page</title>
    </head>
    <body>

        <h1>Hello World</h1>

    </body>
    </html>

Основна модель:

    Document
    │
    ├── DOCTYPE
    │
    └── html
        ├── head
        │   ├── meta
        │   ├── title
        │   └── ...
        │
        └── body
            └── page content

---

# Ключові поняття

✔ HTML document  
✔ document structure  
✔ `<!DOCTYPE html>`  
✔ `<html>`  
✔ `<head>`  
✔ `<body>`  
✔ `lang`  
✔ metadata  
✔ character encoding  
✔ UTF-8  
✔ viewport  
✔ `<title>`  
✔ `<meta>`  
✔ `<link>`  
✔ `<style>`  
✔ `<script>`  
✔ DOM tree  
✔ document tree  
✔ root element  
✔ parent  
✔ child  
✔ sibling  
✔ nesting  
✔ source code  
✔ browser parsing  
✔ rendering  

---

# Що потрібно пам'ятати

• HTML-документ має певну ієрархічну структуру.

• `<!DOCTYPE html>` повідомляє браузеру, що документ використовує сучасний HTML.

• `<html>` є root element документа.

• `<head>` містить metadata та інформацію про документ і ресурси.

• `<body>` містить основний вміст веб-сторінки.

• `<html>` зазвичай має `lang` attribute.

• `<meta charset="UTF-8">` задає character encoding.

• `<meta name="viewport">` важливий для responsive design.

• `<title>` задає назву документа.

• `<link>` використовується, зокрема, для підключення зовнішніх ресурсів, наприклад CSS.

• `<style>` містить CSS безпосередньо в HTML-документі.

• `<script>` використовується для JavaScript.

• HTML має деревоподібну структуру.

• Браузер аналізує HTML та створює DOM.

• Правильна структура документа важлива для accessibility, SEO, maintainability та browser behavior.

---

# HTML Document

HTML document — це документ, який містить HTML markup.

Наприклад:

    <!DOCTYPE html>

    <html lang="en">

    <head>
        <title>My Website</title>
    </head>

    <body>
        <h1>Hello World</h1>
    </body>

    </html>

---

# Document Structure

Типова структура:

    <!DOCTYPE html>
    <html>
        <head>
            ...
        </head>

        <body>
            ...
        </body>
    </html>

Можна представити її як:

    document
        ↓
    html
    ├── head
    └── body

---

# <!DOCTYPE html>

`<!DOCTYPE html>` — document type declaration.

Для HTML5 використовується:

    <!DOCTYPE html>

Він розміщується на початку документа.

Наприклад:

    <!DOCTYPE html>
    <html lang="en">
        ...
    </html>

`DOCTYPE` не є HTML element.

---

# Чому потрібен DOCTYPE

DOCTYPE допомагає браузеру використовувати standards mode для відображення документа.

Без правильного DOCTYPE браузер у певних випадках може перейти в:

    quirks mode

Тому сучасний HTML-документ повинен починатися з:

    <!DOCTYPE html>

---

# html

`<html>` — root element HTML-документа.

Наприклад:

    <html lang="en">

        <head>
            ...
        </head>

        <body>
            ...
        </body>

    </html>

Усі основні частини HTML-документа знаходяться всередині `<html>`.

---

# lang

`lang` визначає основну мову документа.

Наприклад:

    <html lang="uk">

Для англійської:

    <html lang="en">

Для американської англійської:

    <html lang="en-US">

Для німецької:

    <html lang="de">

---

# Навіщо потрібен lang

`lang` важливий для:

    accessibility
    screen readers
    search engines
    browser language processing
    text pronunciation

Наприклад:

    <html lang="uk">

повідомляє user agents, що основна мова документа — українська.

---

# head

`<head>` містить metadata документа.

Наприклад:

    <head>

        <meta charset="UTF-8">

        <title>My Website</title>

    </head>

Типовий `<head>`:

    <head>

        <meta charset="UTF-8">

        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >

        <title>My Website</title>

        <link
            rel="stylesheet"
            href="styles.css"
        >

    </head>

---

# Metadata

Metadata — інформація про документ, яка не є основним видимим content сторінки.

Приклади:

    character encoding
    viewport settings
    document title
    stylesheets
    scripts
    descriptions
    resource relationships

Metadata часто знаходиться в:

    <head>

---

# body

`<body>` містить основний content документа.

Наприклад:

    <body>

        <h1>Welcome</h1>

        <p>
            This is my website.
        </p>

        <button>
            Click me
        </button>

    </body>

У `<body>` можуть знаходитися:

    headings
    paragraphs
    links
    images
    lists
    tables
    forms
    buttons
    sections
    articles
    navigation
    footer
    scripts
    та інший page content

---

# head vs body

Дуже важлива різниця:

    <head>
        → information about the document
        → metadata
        → resources
        → title
    </head>

    <body>
        → document content
        → page structure
        → visible content
        → user interface
    </body>

---

# title

`<title>` визначає title документа.

Наприклад:

    <title>My Website</title>

Title може використовуватися браузером:

    browser tab
    bookmarks
    history
    search engine results

---

# title та heading

Не потрібно плутати:

    <title>

та:

    <h1>

`<title>`:

    → title документа
    → знаходиться в <head>

`<h1>`:

    → основний heading content
    → знаходиться в <body>

Наприклад:

    <head>
        <title>About Me</title>
    </head>

    <body>
        <h1>About Me</h1>
    </body>

---

# meta

`<meta>` використовується для metadata.

Наприклад:

    <meta charset="UTF-8">

або:

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

`meta` — void element.

Він не має closing tag.

---

# Character Encoding

Character encoding визначає, як символи представляються у документі.

Для сучасних HTML-документів стандартним вибором є:

    UTF-8

Наприклад:

    <meta charset="UTF-8">

UTF-8 підтримує багато мов та символів:

    English
    Українська
    Deutsch
    Français
    日本語
    العربية

---

# UTF-8

UTF-8 — широко використовуване character encoding.

Для HTML:

    <meta charset="UTF-8">

дозволяє браузеру правильно інтерпретувати текст документа.

Наприклад:

    <p>
        Привіт, світе!
    </p>

---

# Viewport

Viewport — область, через яку користувач бачить веб-сторінку.

Для responsive pages часто використовують:

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

---

# width=device-width

Ця частина:

    width=device-width

означає, що ширина layout viewport повинна відповідати ширині пристрою.

---

# initial-scale

Ця частина:

    initial-scale=1.0

задає початковий масштаб сторінки.

Типовий варіант:

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

---

# link

`<link>` визначає relationship між поточним документом та зовнішнім ресурсом.

Найпоширеніший приклад — CSS:

    <link
        rel="stylesheet"
        href="styles.css"
    >

Тут:

    link       → element
    rel        → relationship
    stylesheet → resource relationship
    href       → resource URL

---

# CSS у document structure

Зовнішній CSS:

    <head>

        <link
            rel="stylesheet"
            href="styles.css"
        >

    </head>

Браузер завантажує stylesheet та застосовує його до документа.

---

# style

`<style>` дозволяє розмістити CSS безпосередньо в HTML-документі.

Наприклад:

    <head>

        <style>

            body {
                font-family: sans-serif;
            }

        </style>

    </head>

Для великих проєктів зазвичай використовують окремі CSS-файли або CSS-системи, залежно від архітектури застосунку.

---

# script

`<script>` використовується для JavaScript.

Наприклад:

    <script src="app.js"></script>

JavaScript може взаємодіяти з DOM:

    const title = document.querySelector("h1");

---

# script у head

Script можна розміщувати в `<head>`.

Наприклад:

    <head>

        <script src="app.js"></script>

    </head>

Але спосіб завантаження script має значення.

Часто використовують:

    defer

Наприклад:

    <script
        src="app.js"
        defer
    ></script>

---

# defer

`defer` повідомляє браузеру, що script можна завантажувати паралельно з parsing HTML, а виконати після завершення parsing документа.

Наприклад:

    <script
        src="app.js"
        defer
    ></script>

Це часто зручно для scripts, які працюють з DOM.

---

# async

`async` дозволяє script завантажуватися паралельно з parsing HTML і виконуватися одразу після завантаження.

Наприклад:

    <script
        src="analytics.js"
        async
    ></script>

`async` та `defer` мають різну поведінку.

---

# defer vs async

Спрощено:

    defer
        ↓
    download in parallel
        ↓
    execute after HTML parsing

    async
        ↓
    download in parallel
        ↓
    execute as soon as ready

Для scripts, які залежать від повного DOM і мають визначений порядок виконання, `defer` часто є зручнішим.

---

# Document Tree

HTML-документ можна представити як дерево.

Наприклад:

    <!DOCTYPE html>

    <html>

        <head>
            <title>My Page</title>
        </head>

        <body>

            <main>

                <h1>Hello</h1>

                <p>Text</p>

            </main>

        </body>

    </html>

Структура:

    html
    ├── head
    │   └── title
    │
    └── body
        └── main
            ├── h1
            └── p

---

# Parent / Child

Наприклад:

    <body>

        <main>
            <h1>Hello</h1>
        </main>

    </body>

Тут:

    body → parent of main
    main → child of body
    main → parent of h1
    h1 → child of main

---

# Siblings

Наприклад:

    <main>

        <h1>Title</h1>

        <p>Text</p>

        <p>More text</p>

    </main>

Структура:

    main
    ├── h1
    ├── p
    └── p

Тут:

    h1 і p → siblings
    p і p  → siblings

---

# Nesting

HTML elements можуть бути вкладені.

Наприклад:

    <main>

        <section>

            <h2>About</h2>

            <p>
                Some text.
            </p>

        </section>

    </main>

Структура:

    main
    └── section
        ├── h2
        └── p

---

# Correct Nesting

Правильно:

    <main>
        <section>
            <h2>Title</h2>
            <p>Text</p>
        </section>
    </main>

Неправильно:

    <main>
        <section>
            <h2>Title
        </main>
            </h2>
        </section>

Правило:

    last opened
        ↓
    first closed

---

# Indentation

Indentation допомагає бачити структуру документа.

Наприклад:

    <body>

        <main>

            <section>

                <h2>About</h2>

                <p>
                    Text
                </p>

            </section>

        </main>

    </body>

Indentation:

    не створює структуру HTML

але:

    робить nesting зрозумілим
    ↓
    покращує readability
    ↓
    полегшує maintenance

---

# HTML Comments

Comment:

    <!-- comment -->

Наприклад:

    <body>

        <!-- Main content -->

        <main>
            ...
        </main>

    </body>

Comment не відображається як звичайний content сторінки.

---

# Complete HTML Document

Типовий сучасний документ:

    <!DOCTYPE html>

    <html lang="en">

    <head>

        <meta charset="UTF-8">

        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >

        <title>My Website</title>

        <link
            rel="stylesheet"
            href="styles.css"
        >

        <script
            src="app.js"
            defer
        ></script>

    </head>

    <body>

        <header>

            <h1>My Website</h1>

        </header>

        <main>

            <section>

                <h2>About</h2>

                <p>
                    Welcome to my website.
                </p>

            </section>

        </main>

        <footer>

            <p>
                Copyright 2026
            </p>

        </footer>

    </body>

    </html>

---

# Структура повного документа

    <!DOCTYPE html>
            ↓
        <html>
        ↙      ↘
    <head>    <body>
      ↓          ↓
    metadata   content
      ↓          ↓
    title      header
    meta       main
    link       section
    script     footer

---

# Browser Parsing

Браузер отримує HTML source та аналізує його.

Спрощено:

    HTML source
        ↓
    parsing
        ↓
    document tree
        ↓
    DOM
        ↓
    CSS + JavaScript
        ↓
    rendering
        ↓
    page

---

# DOM

DOM:

    Document Object Model

Браузер створює DOM tree на основі HTML-документа.

Наприклад:

    <body>
        <h1>Hello</h1>
        <p>Text</p>
    </body>

DOM можна уявити як:

    body
    ├── h1
    │   └── "Hello"
    │
    └── p
        └── "Text"

---

# HTML Source vs DOM

HTML source:

    <p>Hello</p>

DOM:

    document
        ↓
    html
        ↓
    body
        ↓
    p
        ↓
    "Hello"

HTML source — це markup.

DOM — об'єктне представлення документа в браузері.

---

# Document Structure та CSS

HTML визначає structure:

    <main>
        <section>
            <h1>Title</h1>
        </section>
    </main>

CSS визначає presentation:

    main {
        max-width: 1200px;
    }

    section {
        padding: 2rem;
    }

---

# Document Structure та JavaScript

HTML:

    <button id="save">
        Save
    </button>

JavaScript:

    const button = document.querySelector("#save");

    button.addEventListener("click", () => {
        console.log("Saved");
    });

HTML:

    structure

JavaScript:

    behavior

---

# Semantic Document Structure

Структура документа повинна відображати meaning content.

Наприклад:

    <header>
        ...
    </header>

    <nav>
        ...
    </nav>

    <main>
        ...
    </main>

    <footer>
        ...
    </footer>

Це краще передає структуру документа, ніж використання лише generic containers:

    <div>
        ...
    </div>

    <div>
        ...
    </div>

    <div>
        ...
    </div>

---

# Main

`<main>` представляє основний контент документа.

Наприклад:

    <body>

        <header>
            ...
        </header>

        <main>

            <h1>Products</h1>

            ...

        </main>

        <footer>
            ...
        </footer>

    </body>

На сторінці зазвичай є один основний `<main>` для primary content.

---

# Header

`<header>` представляє introductory або navigational content для сторінки або певної секції.

Наприклад:

    <header>

        <h1>My Website</h1>

        <nav>
            ...
        </nav>

    </header>

---

# Footer

`<footer>` представляє footer для сторінки або секції.

Наприклад:

    <footer>

        <p>
            Copyright 2026
        </p>

    </footer>

---

# Navigation

`<nav>` використовується для navigation links.

Наприклад:

    <nav>

        <a href="/">Home</a>

        <a href="/about">About</a>

        <a href="/contact">Contact</a>

    </nav>

---

# Section

`<section>` представляє тематичну секцію документа.

Наприклад:

    <main>

        <section>

            <h2>About</h2>

            <p>
                About our company.
            </p>

        </section>

        <section>

            <h2>Services</h2>

            <p>
                Our services.
            </p>

        </section>

    </main>

---

# Article

`<article>` представляє самодостатній контент.

Наприклад:

    <article>

        <h2>HTML Basics</h2>

        <p>
            HTML is a markup language.
        </p>

    </article>

---

# Aside

`<aside>` представляє контент, який є додатковим або побічним щодо основного контенту.

Наприклад:

    <main>

        <article>
            ...
        </article>

        <aside>
            Related articles
        </aside>

    </main>

---

# Semantic Page Structure

Типова структура:

    body
    ├── header
    │   └── nav
    │
    ├── main
    │   ├── section
    │   ├── article
    │   └── aside
    │
    └── footer

---

# Типові помилки

❌ Забувати DOCTYPE.

Не рекомендується:

    <html>
        ...
    </html>

Краще:

    <!DOCTYPE html>
    <html>
        ...
    </html>

---

❌ Відсутність `lang`.

Неідеально:

    <html>

Краще:

    <html lang="uk">

---

❌ Відсутність charset.

Краще:

    <meta charset="UTF-8">

---

❌ Забувати viewport у responsive pages.

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

---

❌ Поміщати page content у `<head>`.

Неправильно:

    <head>

        <h1>Hello</h1>

    </head>

Основний page content повинен знаходитися в `<body>`.

---

❌ Поміщати metadata у `<body>` без причини.

Metadata зазвичай знаходиться в:

    <head>

---

❌ Плутати `<title>` та `<h1>`.

    <title>
        → document title

    <h1>
        → page heading

---

❌ Неправильне nesting.

Неправильно:

    <section>
        <h2>Title
    </section>
        </h2>

---

❌ Надмірне використання `<div>`.

Не варто будувати всю структуру:

    <div>
        <div>
            <div>
                ...
            </div>
        </div>
    </div>

без semantic purpose.

Краще використовувати відповідні semantic elements, коли вони підходять:

    <header>
    <nav>
    <main>
    <section>
    <article>
    <aside>
    <footer>

---

❌ Використовувати `<br>` для створення layout.

Не варто:

    <h1>
        Hello
        <br><br><br>
        World
    </h1>

Spacing та layout повинні контролюватися CSS.

---

# Best Practices

## Використовувати DOCTYPE

    <!DOCTYPE html>

---

## Вказувати мову

    <html lang="uk">

---

## Використовувати UTF-8

    <meta charset="UTF-8">

---

## Використовувати viewport

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

---

## Давати документу title

    <title>My Website</title>

---

## Підключати CSS через link

    <link
        rel="stylesheet"
        href="styles.css"
    >

---

## Використовувати defer для DOM-dependent scripts

    <script
        src="app.js"
        defer
    ></script>

---

## Використовувати semantic structure

    <header>
    <nav>
    <main>
    <section>
    <article>
    <aside>
    <footer>

---

## Дотримуватися правильного nesting

    <main>
        <section>
            <h2>Title</h2>
            <p>Text</p>
        </section>
    </main>

---

## Форматувати код

    <body>

        <main>

            <section>

                <h1>Title</h1>

                <p>
                    Text
                </p>

            </section>

        </main>

    </body>

---

# Accessibility

Правильна document structure допомагає assistive technologies розуміти сторінку.

Важливі речі:

    lang
    semantic HTML
    heading hierarchy
    meaningful landmarks
    correct document structure

Наприклад:

    <html lang="uk">

    <body>

        <header>
            ...
        </header>

        <main>
            ...
        </main>

        <footer>
            ...
        </footer>

    </body>

---

# SEO

Document structure також важлива для search engines.

Корисні елементи:

    <title>
    <h1>
    <h2>
    <main>
    <article>
    <section>
    <nav>

Правильна структура допомагає описати hierarchy та meaning документа.

---

# Практичний приклад

Створимо сторінку статті:

    <!DOCTYPE html>

    <html lang="uk">

    <head>

        <meta charset="UTF-8">

        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >

        <title>HTML Document Structure</title>

        <link
            rel="stylesheet"
            href="styles.css"
        >

    </head>

    <body>

        <header>

            <h1>HTML Course</h1>

            <nav>

                <a href="/">Home</a>

                <a href="/html">HTML</a>

                <a href="/css">CSS</a>

            </nav>

        </header>

        <main>

            <article>

                <h2>HTML Document Structure</h2>

                <p>
                    HTML documents have a hierarchical structure.
                </p>

                <section>

                    <h3>Document Head</h3>

                    <p>
                        The head contains metadata.
                    </p>

                </section>

                <section>

                    <h3>Document Body</h3>

                    <p>
                        The body contains page content.
                    </p>

                </section>

            </article>

            <aside>

                <h2>Related Topics</h2>

                <p>
                    HTML Basics
                </p>

            </aside>

        </main>

        <footer>

            <p>
                HTML Course
            </p>

        </footer>

    </body>

    </html>

---

# Структура практичного прикладу

    html
    ├── head
    │   ├── meta
    │   ├── meta
    │   ├── title
    │   └── link
    │
    └── body
        ├── header
        │   ├── h1
        │   └── nav
        │       ├── a
        │       ├── a
        │       └── a
        │
        ├── main
        │   ├── article
        │   │   ├── h2
        │   │   ├── p
        │   │   ├── section
        │   │   └── section
        │   │
        │   └── aside
        │
        └── footer

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке HTML document.

Document structure.

`<!DOCTYPE html>`.

`<html>`.

`<head>`.

`<body>`.

`lang`.

`<title>`.

`<meta>`.

`charset`.

UTF-8.

Viewport.

`<link>`.

Базове підключення CSS.

`<script>`.

Базове підключення JavaScript.

Document tree.

DOM tree.

Parent / child / sibling.

Nesting.

HTML comments.

Semantic document structure.

`header`.

`nav`.

`main`.

`section`.

`article`.

`aside`.

`footer`.

---

# 🔵 Junior

Розуміння повної HTML document structure.

Розуміння:

    DOCTYPE
    html
    head
    body

Розуміння metadata.

Character encoding.

UTF-8.

Viewport.

`title`.

`meta`.

`link`.

`style`.

`script`.

`defer`.

`async`.

Document tree.

DOM.

Semantic landmarks.

Heading hierarchy.

Accessibility basics.

SEO basics.

Правильне nesting.

Правильна indentation.

Вибір semantic elements.

Різниця:

    <title>
    <h1>

Різниця:

    <head>
    <body>

---

# 🟠 Middle

Глибше розуміння browser parsing.

HTML parsing.

DOM construction.

Document tree.

Content models.

HTML semantics.

Landmark structure.

Accessibility tree.

Heading structure.

Resource loading.

`async`.

`defer`.

Preload.

Metadata.

Rendering pipeline.

HTML + CSS loading.

HTML + JavaScript loading.

Progressive enhancement.

Semantic document architecture.

Accessibility та document structure.

SEO та document structure.

---

# 🔴 Senior

Глибоке розуміння HTML Living Standard.

HTML parsing algorithm.

Tokenizer.

Tree construction.

DOM construction.

Document conformance.

Content categories.

Content models.

Parsing errors.

Quirks mode.

Standards mode.

Browser compatibility.

Resource loading behavior.

Preload scanner.

Script execution model.

Parser-blocking scripts.

`async`.

`defer`.

Module scripts.

Dynamic scripts.

Rendering pipeline.

DOM vs accessibility tree.

Semantic structure та accessibility APIs.

Advanced document architecture.

Progressive enhancement.

Performance implications document structure.

Custom elements.

Web Components.

Shadow DOM.

---

# Питання зі співбесіди

Що таке HTML document?

Яка базова структура HTML-документа?

Для чого потрібен `<!DOCTYPE html>`?

Чи є DOCTYPE HTML element?

Що таке root element?

Який root element має HTML-документ?

Для чого потрібен `<html>`?

Для чого потрібен `lang`?

Чому важливо вказувати `lang`?

Що знаходиться в `<head>`?

Що знаходиться в `<body>`?

У чому різниця між `<head>` та `<body>`?

Що таке metadata?

Для чого потрібен `<title>`?

Де знаходиться `<title>`?

Чим `<title>` відрізняється від `<h1>`?

Для чого потрібен `<meta charset="UTF-8">`?

Що таке UTF-8?

Для чого потрібен viewport meta tag?

Що означає `width=device-width`?

Що означає `initial-scale=1.0`?

Для чого використовується `<link>`?

Як підключити CSS до HTML?

Для чого використовується `<style>`?

Для чого використовується `<script>`?

Що робить `defer`?

Що робить `async`?

Яка різниця між `async` та `defer`?

Що таке document tree?

Що таке DOM?

Як браузер створює DOM?

Що таке parent element?

Що таке child element?

Що таке sibling elements?

Що таке nesting?

Чому важливе правильне nesting?

Що таке semantic HTML?

Для чого потрібен `<main>`?

Для чого потрібен `<header>`?

Для чого потрібен `<footer>`?

Для чого потрібен `<nav>`?

Для чого потрібен `<section>`?

Для чого потрібен `<article>`?

Для чого потрібен `<aside>`?

Чому не варто будувати всю сторінку тільки з `<div>`?

Як document structure впливає на accessibility?

Як document structure впливає на SEO?

Що таке standards mode?

Що таке quirks mode?

---

# Міні-шпаргалка

## DOCTYPE

    <!DOCTYPE html>

HTML5 document type declaration.

---

## Root

    <html lang="uk">
        ...
    </html>

Root element.

---

## Head

    <head>
        <meta charset="UTF-8">
        <title>My Page</title>
    </head>

Metadata та resources.

---

## Body

    <body>
        ...
    </body>

Основний page content.

---

## Charset

    <meta charset="UTF-8">

Character encoding.

---

## Viewport

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

Responsive viewport configuration.

---

## Title

    <title>My Website</title>

Document title.

---

## CSS

    <link
        rel="stylesheet"
        href="styles.css"
    >

---

## JavaScript

    <script
        src="app.js"
        defer
    ></script>

---

## Semantic structure

    <body>

        <header>
            ...
        </header>

        <nav>
            ...
        </nav>

        <main>

            <section>
                ...
            </section>

            <article>
                ...
            </article>

            <aside>
                ...
            </aside>

        </main>

        <footer>
            ...
        </footer>

    </body>

---

# Document Flow

    <!DOCTYPE html>
            ↓
        <html>
        ↙      ↘
    <head>    <body>
      ↓          ↓
    metadata   content
                 ↓
              DOM tree
                 ↓
              rendering

---

# Основні правила

    <!DOCTYPE html>
        → document type declaration

    <html>
        → root element

    lang
        → document language

    <head>
        → metadata + resources

    <body>
        → page content

    <title>
        → document title

    <meta>
        → metadata

    charset
        → character encoding

    UTF-8
        → common character encoding

    viewport
        → mobile/responsive viewport configuration

    <link>
        → external resource relationship

    <style>
        → embedded CSS

    <script>
        → JavaScript

    defer
        → execute after parsing

    async
        → execute when ready

    DOM
        → browser object representation of document

    semantic HTML
        → meaningful document structure

---

# Головне

• HTML document має ієрархічну структуру.

• Базова структура:

    <!DOCTYPE html>
    <html>
    ├── <head>
    └── <body>

• `<!DOCTYPE html>` встановлює HTML5 document type та допомагає браузеру використовувати standards mode.

• `<html>` є root element.

• `lang` визначає основну мову документа.

• `<head>` містить metadata та resource declarations.

• `<body>` містить основний page content.

• `<title>` визначає title документа.

• `<meta charset="UTF-8">` задає character encoding.

• Viewport meta tag важливий для responsive pages.

• `<link>` часто використовується для підключення CSS.

• `<style>` містить CSS безпосередньо в документі.

• `<script>` використовується для JavaScript.

• `defer` та `async` змінюють спосіб завантаження та виконання scripts.

• HTML має tree structure.

• Parent містить child.

• Siblings мають одного parent.

• Правильне nesting є важливою частиною HTML.

• Браузер аналізує HTML та створює DOM.

• Semantic HTML допомагає описати meaning документа.

• Основні semantic landmarks:

    header
    nav
    main
    section
    article
    aside
    footer

• `<title>` і `<h1>` мають різне призначення.

• `<head>` та `<body>` мають різне призначення.

• Правильна document structure важлива для:

    accessibility
    SEO
    maintainability
    browser behavior

---

# Головна модель

    HTML document
          ↓
    <!DOCTYPE html>
          ↓
       <html>
       ↙    ↘
    <head>  <body>
      ↓       ↓
    metadata content
              ↓
        semantic structure
              ↓
           DOM tree
              ↓
       CSS + JavaScript
              ↓
          rendering