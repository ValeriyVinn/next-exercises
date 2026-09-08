# 01. HTML Basics

HTML (HyperText Markup Language) — стандартна мова розмітки, яка використовується для створення структури веб-сторінок.

HTML описує:

- структуру документа;
- заголовки;
- текст;
- посилання;
- зображення;
- списки;
- таблиці;
- форми;
- семантичні блоки;
- метадані документа.

HTML не є мовою програмування.

HTML відповідає переважно за:

    structure
    ↓
    content
    ↓
    meaning

CSS відповідає за:

    presentation
    ↓
    layout
    ↓
    appearance

JavaScript відповідає за:

    behavior
    ↓
    logic
    ↓
    interaction

---

# Ключові поняття

✔ HTML  
✔ HyperText Markup Language  
✔ markup  
✔ document  
✔ element  
✔ tag  
✔ opening tag  
✔ closing tag  
✔ start tag  
✔ end tag  
✔ attribute  
✔ value  
✔ content  
✔ nesting  
✔ parent  
✔ child  
✔ sibling  
✔ root element  
✔ document structure  
✔ semantic HTML  
✔ void element  
✔ block-level element  
✔ inline element  
✔ browser  
✔ DOM  

---

# Що потрібно пам'ятати

• HTML описує структуру та зміст веб-документа.

• HTML складається з елементів.

• Елемент зазвичай складається з opening tag, content та closing tag.

• Attribute додає додаткову інформацію або налаштовує поведінку елемента.

• HTML-документ має ієрархічну структуру.

• `<html>` є root element документа.

• `<head>` містить metadata документа.

• `<body>` містить видимий вміст сторінки.

• Браузер аналізує HTML та будує DOM.

• Не всі HTML-елементи мають closing tag.

• Такі елементи називаються void elements.

• HTML має семантичні елементи, які описують призначення контенту.

---

# HTML

HTML розшифровується як:

    HyperText Markup Language

HTML — це markup language, тобто мова розмітки.

Вона описує структуру документа за допомогою елементів.

Наприклад:

    <h1>Hello World</h1>

Браузер розуміє:

    h1 → heading
    Hello World → content

---

# Markup

Markup — спеціальна розмітка, яка описує структуру та значення контенту.

Наприклад:

    <p>Hello</p>

Тут:

    <p> → markup
    Hello → content
    </p> → markup

HTML не виконує математичні операції та не містить програмної логіки як JavaScript.

---

# HTML Element

HTML element — основна структурна одиниця HTML-документа.

Наприклад:

    <p>Hello World</p>

Увесь фрагмент:

    <p>Hello World</p>

є HTML element.

Він складається з:

    opening tag
         ↓
       content
         ↓
    closing tag

---

# Tag

Tag — конструкція HTML, яка позначає початок або кінець елемента.

Наприклад:

    <p>
    </p>

Opening tag:

    <p>

Closing tag:

    </p>

Елемент:

    <p>Hello</p>

---

# Opening Tag

Opening tag позначає початок елемента.

Наприклад:

    <h1>

    <p>

    <div>

    <section>

---

# Closing Tag

Closing tag позначає кінець елемента.

Наприклад:

    </h1>

    </p>

    </div>

    </section>

Closing tag містить `/`.

---

# Content

Content — вміст HTML-елемента.

Наприклад:

    <p>Hello World</p>

Тут:

    <p>          → opening tag
    Hello World  → content
    </p>         → closing tag

---

# Простий HTML Element

Наприклад:

    <h1>My Website</h1>

Структура:

    <h1>
       My Website
    </h1>

---

# Attribute

Attribute — додаткова інформація про HTML element.

Наприклад:

    <a href="https://example.com">Example</a>

Тут:

    href → attribute
    "https://example.com" → attribute value

---

# Attribute Syntax

Типовий синтаксис:

    attribute="value"

Наприклад:

    id="main"

    class="container"

    href="/about"

    src="image.jpg"

---

# Element з Attribute

    <p class="text">
        Hello
    </p>

Тут:

    p       → element
    class   → attribute
    "text"  → value
    Hello   → content

---

# Multiple Attributes

Елемент може мати декілька attributes.

    <input
        type="text"
        id="username"
        class="input"
        name="username"
    >

Наприклад:

    type="text"
    id="username"
    class="input"
    name="username"

---

# Boolean Attributes

Деякі attributes не потребують value.

Наприклад:

    <input disabled>

    <input required>

    <input checked>

Наявність attribute означає `true`.

Наприклад:

    <input disabled>

означає, що input disabled.

---

# Nesting

HTML elements можуть бути вкладені один в одного.

Наприклад:

    <section>
        <h2>About</h2>

        <p>
            Some text.
        </p>
    </section>

Структура:

    section
    ├── h2
    └── p

---

# Parent

Parent element — елемент, який містить інший element.

Наприклад:

    <section>
        <p>Hello</p>
    </section>

Тут:

    section → parent
    p       → child

---

# Child

Child element — елемент, який знаходиться всередині іншого element.

    <section>
        <p>Hello</p>
    </section>

Тут:

    p → child of section

---

# Sibling

Sibling elements мають одного parent.

Наприклад:

    <section>
        <h2>Title</h2>
        <p>Text</p>
        <p>More text</p>
    </section>

Структура:

    section
    ├── h2
    ├── p
    └── p

Тут:

    h2 і p → siblings
    p і p  → siblings

---

# Root Element

Root element — найвищий елемент HTML-документа.

Це:

    <html>

Типова структура:

    html
    ├── head
    └── body

---

# Basic HTML Document

Мінімальний сучасний HTML-документ:

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>My Page</title>
    </head>
    <body>

        <h1>Hello World</h1>

    </body>
    </html>

---

# <!DOCTYPE html>

`<!DOCTYPE html>` повідомляє браузеру, що документ використовує HTML5.

Він знаходиться на першому рядку документа.

    <!DOCTYPE html>

Це не HTML element.

Це document type declaration.

---

# html

`<html>` — root element HTML-документа.

Наприклад:

    <!DOCTYPE html>
    <html lang="en">

        ...

    </html>

Весь HTML-документ знаходиться всередині `<html>`.

---

# lang

Attribute `lang` визначає основну мову документа.

Наприклад:

    <html lang="en">

Для української:

    <html lang="uk">

Для американської англійської:

    <html lang="en-US">

`lang` допомагає:

    accessibility
    screen readers
    search engines
    browser tools

---

# head

`<head>` містить metadata документа.

Наприклад:

    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, initial-scale=1.0">
        <title>My Website</title>
    </head>

У `<head>` зазвичай розміщують:

    <title>
    <meta>
    <link>
    <style>
    <script>

та інші metadata/resource declarations.

---

# body

`<body>` містить основний вміст веб-сторінки.

Наприклад:

    <body>

        <h1>Hello</h1>

        <p>
            Welcome to my website.
        </p>

    </body>

У `<body>` розміщують:

    headings
    paragraphs
    links
    images
    lists
    tables
    forms
    sections
    articles
    buttons
    та інший page content

---

# title

`<title>` визначає назву документа.

Наприклад:

    <title>My Website</title>

Title зазвичай використовується:

    browser tab
    bookmarks
    search results

---

# meta charset

Для сучасних HTML-документів часто використовується:

    <meta charset="UTF-8">

UTF-8 дозволяє коректно працювати з великою кількістю символів та мов.

Наприклад:

    Українська
    English
    Deutsch
    日本語

---

# meta viewport

Для responsive pages часто використовується:

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

Він допомагає браузеру правильно визначати viewport на мобільних пристроях.

---

# Basic Page Example

    <!DOCTYPE html>
    <html lang="uk">
    <head>
        <meta charset="UTF-8">

        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >

        <title>Моя сторінка</title>
    </head>

    <body>

        <h1>Привіт!</h1>

        <p>
            Це моя перша HTML-сторінка.
        </p>

    </body>
    </html>

---

# HTML Comments

HTML підтримує comments.

Синтаксис:

    <!-- comment -->

Наприклад:

    <!-- Main heading -->

    <h1>Hello</h1>

Comment не відображається як звичайний контент сторінки.

---

# Block та Inline

Традиційно HTML-елементи поділяли на:

    block-level elements
    inline elements

Але важливо розуміти:

**поведінка елемента в layout визначається CSS**, зокрема властивістю `display`.

Типові block elements:

    <div>
    <p>
    <h1>
    <section>

Типові inline elements:

    <span>
    <a>
    <strong>
    <em>

Цей поділ важливий для розуміння HTML/CSS, але не є основним визначенням HTML element.

---

# Void Elements

Деякі HTML elements не мають content і closing tag.

Вони називаються:

    void elements

Приклади:

    <img>
    <input>
    <br>
    <hr>
    <meta>
    <link>

Наприклад:

    <img src="photo.jpg" alt="Photo">

Не потрібно писати:

    <img></img>

---

# br

`<br>` створює line break.

Наприклад:

    <p>
        Hello<br>
        World
    </p>

Результат:

    Hello
    World

Але для layout spacing зазвичай використовують CSS, а не `<br>`.

---

# hr

`<hr>` представляє тематичний поділ між частинами документа.

Наприклад:

    <h2>Introduction</h2>

    <p>Some text.</p>

    <hr>

    <h2>Next section</h2>

---

# HTML Case

HTML tag names зазвичай пишуть у lowercase.

Рекомендовано:

    <div>
    <p>
    <section>

а не:

    <DIV>
    <P>
    <SECTION>

HTML є case-insensitive щодо назв HTML elements, але lowercase є стандартним стилем написання.

---

# Whitespace

HTML зазвичай не зберігає всі пробіли та переноси рядків так, як вони записані у source code.

Наприклад:

    <p>
        Hello
        World
    </p>

браузер зазвичай відобразить текст приблизно як:

    Hello World

Відображення whitespace залежить від HTML-правил і CSS.

---

# HTML Entity

Спеціальні символи можна представляти через character references.

Наприклад:

    &lt;

означає:

    <

А:

    &gt;

означає:

    >

Ще приклад:

    &amp;

означає:

    &

---

# Text Content

Основний текст сторінки часто розміщується в semantic elements.

Наприклад:

    <h1>Main title</h1>

    <p>
        This is a paragraph.
    </p>

---

# Heading

HTML має шість рівнів headings:

    <h1>
    <h2>
    <h3>
    <h4>
    <h5>
    <h6>

Наприклад:

    <h1>Main title</h1>

    <h2>Section</h2>

    <h3>Subsection</h3>

Ієрархія:

    h1
    └── h2
        └── h3

Heading level визначає структурний рівень заголовка, а не його візуальний розмір.

Візуальний вигляд змінюється через CSS.

---

# Paragraph

`<p>` представляє paragraph.

Наприклад:

    <p>
        HTML is a markup language.
    </p>

Кілька paragraphs:

    <p>First paragraph.</p>

    <p>Second paragraph.</p>

---

# Anchor

`<a>` створює hyperlink.

Наприклад:

    <a href="https://example.com">
        Visit website
    </a>

Основний attribute:

    href

---

# Image

`<img>` вставляє зображення.

Наприклад:

    <img
        src="photo.jpg"
        alt="A landscape"
    >

Основні attributes:

    src → image source
    alt → alternative text

---

# Button

`<button>` створює кнопку.

Наприклад:

    <button>
        Submit
    </button>

Button може використовуватися для:

    actions
    form submission
    JavaScript interaction

---

# div

`<div>` — generic container.

Наприклад:

    <div>
        <h2>Title</h2>
        <p>Text</p>
    </div>

`div` не має спеціального semantic meaning.

Його часто використовують як контейнер для структури та CSS layout.

---

# span

`<span>` — generic inline container.

Наприклад:

    <p>
        Hello
        <span>World</span>
    </p>

`span` не має спеціального semantic meaning.

---

# Semantic HTML

Semantic HTML означає використання elements відповідно до їхнього призначення.

Наприклад:

    <header>
    <nav>
    <main>
    <section>
    <article>
    <aside>
    <footer>

Краще:

    <nav>
        ...
    </nav>

ніж:

    <div class="navigation">
        ...
    </div>

коли цей блок справді є navigation.

---

# HTML Semantics

HTML element може передавати meaning.

Наприклад:

    <article>
        ...
    </article>

означає самостійну частину контенту.

А:

    <nav>
        ...
    </nav>

позначає navigation section.

Семантика важлива для:

    accessibility
    SEO
    maintainability
    document structure

---

# DOM

Коли браузер завантажує HTML, він аналізує документ і створює DOM.

DOM:

    Document Object Model

Спрощено:

    HTML source
        ↓
    Browser parser
        ↓
    DOM tree
        ↓
    JavaScript / CSS / Browser

Наприклад HTML:

    <body>
        <h1>Hello</h1>
        <p>Text</p>
    </body>

можна уявити як:

    body
    ├── h1
    │   └── "Hello"
    └── p
        └── "Text"

JavaScript може працювати з DOM.

---

# HTML Tree

HTML має деревоподібну структуру.

Наприклад:

    <main>

        <section>

            <h1>Title</h1>

            <p>
                Text
            </p>

        </section>

    </main>

Структура:

    main
    └── section
        ├── h1
        └── p

---

# Parent → Child → Sibling

Наприклад:

    <main>
        <section>
            <h1>Title</h1>
            <p>Text</p>
        </section>
    </main>

Тут:

    main
      ↓
    section
      ↓
    h1
    p

Отже:

    main → parent of section
    section → child of main
    h1 → child of section
    p → child of section
    h1 і p → siblings

---

# HTML Syntax

Загальний синтаксис element:

    <tag>content</tag>

Наприклад:

    <p>Hello</p>

З attribute:

    <tag attribute="value">
        content
    </tag>

Наприклад:

    <p class="intro">
        Hello
    </p>

---

# Correct Nesting

Elements повинні бути правильно вкладені.

Правильно:

    <p>
        <strong>Hello</strong>
    </p>

Неправильно:

    <p>
        <strong>Hello</p>
    </strong>

Правило:

    відкрив останнім
        ↓
    закрий першим

---

# Multiple Elements

HTML-документ може містити багато elements.

Наприклад:

    <h1>My Website</h1>

    <p>
        Welcome.
    </p>

    <a href="/about">
        About
    </a>

---

# Formatting Source Code

HTML краще форматувати так, щоб nesting було видно.

Наприклад:

    <main>
        <section>
            <h2>About</h2>

            <p>
                Some text.
            </p>
        </section>
    </main>

Indentation допомагає бачити:

    parent
      ↓
    child
      ↓
    nested child

Indentation не створює HTML structure сама по собі.

Structure визначається HTML elements та їхнім nesting.

---

# HTML File

HTML-файли зазвичай мають extension:

    .html

Наприклад:

    index.html

    about.html

    contact.html

`index.html` часто використовується як основний entry document для статичного сайту або каталогу.

---

# index.html

Типовий файл:

    index.html

може містити:

    <!DOCTYPE html>
    <html lang="en">
    <head>
        ...
    </head>
    <body>
        ...
    </body>
    </html>

---

# Browser

HTML-документ відкривається браузером.

Типовий процес:

    HTML file
        ↓
    Browser
        ↓
    Parse HTML
        ↓
    Build DOM
        ↓
    Apply CSS
        ↓
    Execute JavaScript
        ↓
    Render page

---

# HTML + CSS + JavaScript

Основна модель frontend:

    HTML
      ↓
    structure

    CSS
      ↓
    presentation

    JavaScript
      ↓
    behavior

Наприклад:

    <button id="button">
        Click me
    </button>

HTML створює кнопку.

CSS може оформити її:

    button {
        padding: 10px;
    }

JavaScript може додати behavior:

    button.addEventListener("click", () => {
        console.log("Clicked");
    });

---

# Basic Page Example

    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">

        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >

        <title>My Website</title>
    </head>

    <body>

        <header>
            <h1>My Website</h1>
        </header>

        <main>

            <section>
                <h2>About</h2>

                <p>
                    This is my website.
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

# Практичний приклад

Створимо просту сторінку:

    <!DOCTYPE html>
    <html lang="uk">

    <head>
        <meta charset="UTF-8">

        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >

        <title>Мій сайт</title>
    </head>

    <body>

        <h1>Мій перший сайт</h1>

        <p>
            Я вивчаю HTML.
        </p>

        <a href="/about.html">
            Про мене
        </a>

    </body>

    </html>

---

# Типові помилки

❌ Забувати closing tag.

    <p>
        Hello

Для звичайного `p` потрібно:

    <p>
        Hello
    </p>

---

❌ Неправильне nesting.

    <p>
        <strong>
            Hello
    </p>
    </strong>

Правильно:

    <p>
        <strong>
            Hello
        </strong>
    </p>

---

❌ Використовувати неправильний element лише через його зовнішній вигляд.

Наприклад:

    <h1>Small text</h1>

тільки тому, що CSS робить його маленьким.

Heading визначає структуру документа, а не просто розмір шрифту.

---

❌ Використовувати `div` замість semantic element без причини.

Наприклад:

    <div class="navigation">
        ...
    </div>

Краще:

    <nav>
        ...
    </nav>

якщо це справді navigation.

---

❌ Забувати `alt` для зображень.

Неідеально:

    <img src="photo.jpg">

Краще:

    <img
        src="photo.jpg"
        alt="Mountain landscape"
    >

Якщо зображення декоративне, можна використовувати:

    alt=""

---

❌ Використовувати `<br>` для створення відступів.

Не варто:

    <p>
        First<br><br><br>
        Second
    </p>

Для spacing використовується CSS.

---

❌ Використовувати `<div>` замість `<button>` для кнопки.

Не варто:

    <div class="button">
        Save
    </div>

Краще:

    <button>
        Save
    </button>

`button` має відповідну семантику та accessibility behavior.

---

❌ Плутати tag та element.

Наприклад:

    <p>

це tag.

А:

    <p>Hello</p>

це element.

---

❌ Плутати attribute та value.

Наприклад:

    <img src="photo.jpg">

Тут:

    src → attribute
    "photo.jpg" → value

---

# HTML Best Practices

## Використовувати DOCTYPE

    <!DOCTYPE html>

---

## Вказувати lang

    <html lang="uk">

---

## Використовувати UTF-8

    <meta charset="UTF-8">

---

## Додавати viewport

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

---

## Давати сторінці title

    <title>My Website</title>

---

## Використовувати semantic HTML

Наприклад:

    <header>
    <nav>
    <main>
    <section>
    <article>
    <footer>

---

## Правильно вкладати elements

    <section>
        <h2>Title</h2>
        <p>Text</p>
    </section>

---

## Використовувати lowercase

    <section>
    <article>
    <button>

---

## Використовувати indentation

    <main>
        <section>
            <h2>Title</h2>
        </section>
    </main>

---

# Accessibility Basics

HTML повинен бути зрозумілим не тільки браузеру, а й assistive technologies.

Корисні практики:

    semantic HTML
    correct headings
    alt text
    labels for form controls
    meaningful link text
    correct button elements
    lang attribute

Наприклад:

Добре:

    <a href="/contact">
        Contact us
    </a>

Гірше:

    <a href="/contact">
        Click here
    </a>

---

# HTML Validation

HTML-код можна перевіряти валідаторами.

Мета validation:

    find syntax problems
    detect invalid structure
    detect incorrect attributes
    improve document correctness

Але:

    valid HTML
        ≠
    automatically accessible HTML
        ≠
    automatically good HTML

Валідність — лише одна частина якості HTML.

---

# HTML та DOM

Важливо розрізняти:

    HTML source
        ↓
    DOM

HTML — це source markup.

DOM — об'єктне представлення документа, створене браузером.

JavaScript працює переважно з DOM.

Наприклад:

    const heading = document.querySelector("h1");

Тут JavaScript знаходить DOM element, який відповідає `<h1>`.

---

# HTML Parsing

Спрощена модель:

    HTML source
        ↓
    tokenizer / parser
        ↓
    DOM tree
        ↓
    rendering

Браузер не просто "показує текст".

Він аналізує HTML та створює структуроване представлення документа.

---

# HTML та CSS

HTML:

    <h1>
        Hello
    </h1>

CSS:

    h1 {
        font-size: 40px;
    }

HTML визначає:

    це heading

CSS визначає:

    як він виглядає

---

# HTML та JavaScript

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

# Міні-шпаргалка

## HTML

    HyperText Markup Language

Мова розмітки для структури веб-документів.

---

## Element

    <p>Hello</p>

Увесь фрагмент є element.

---

## Opening tag

    <p>

---

## Closing tag

    </p>

---

## Content

    Hello

---

## Attribute

    <p class="text">
        Hello
    </p>

    class → attribute
    "text" → value

---

## Nesting

    <section>
        <p>
            Hello
        </p>
    </section>

---

## Parent

    section
       ↓
       p

`section` → parent.

---

## Child

`p` → child of `section`.

---

## Sibling

    <section>
        <h2>Title</h2>
        <p>Text</p>
    </section>

`h2` та `p` → siblings.

---

## Root

    <html>

---

## Document

    <!DOCTYPE html>
    <html>
        <head>
            ...
        </head>

        <body>
            ...
        </body>
    </html>

---

## head

    <head>
        ...
    </head>

Metadata та resource declarations.

---

## body

    <body>
        ...
    </body>

Основний page content.

---

## title

    <title>My Website</title>

Назва документа.

---

## charset

    <meta charset="UTF-8">

---

## viewport

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

---

## Comment

    <!-- comment -->

---

## Void element

    <img>
    <input>
    <br>
    <hr>
    <meta>
    <link>

Void elements не мають closing tag.

---

## Link

    <a href="/about">
        About
    </a>

---

## Image

    <img
        src="photo.jpg"
        alt="Photo"
    >

---

## Button

    <button>
        Save
    </button>

---

## Generic containers

    <div>
        ...
    </div>

    <span>
        ...
    </span>

---

## Semantic elements

    <header>
    <nav>
    <main>
    <section>
    <article>
    <aside>
    <footer>

---

# HTML Document Flow

    <!DOCTYPE html>
            ↓
        <html>
         ↙   ↘
      <head> <body>
                ↓
             content

---

# HTML Tree

    html
    ├── head
    │   ├── meta
    │   └── title
    │
    └── body
        ├── header
        │   └── h1
        │
        ├── main
        │   └── section
        │       ├── h2
        │       └── p
        │
        └── footer

---

# Основні правила

    HTML
        → structure + content + meaning

    element
        → complete HTML unit

    tag
        → opening / closing markup

    attribute
        → additional information

    value
        → attribute data

    parent
        → contains child

    child
        → nested inside parent

    sibling
        → elements with same parent

    <html>
        → root element

    <head>
        → metadata

    <body>
        → page content

    <!DOCTYPE html>
        → HTML document type declaration

    void element
        → no closing tag

    semantic HTML
        → meaning and structure

    DOM
        → browser's object representation of document

---

# Питання зі співбесіди

Що таке HTML?

Що означає HyperText Markup Language?

Чим HTML відрізняється від мови програмування?

Що таке markup language?

Що таке HTML element?

Що таке HTML tag?

Чим tag відрізняється від element?

Що таке opening tag?

Що таке closing tag?

Що таке content?

Що таке attribute?

Що таке attribute value?

Чи може element мати декілька attributes?

Що таке boolean attribute?

Що таке nesting?

Що таке parent element?

Що таке child element?

Що таке sibling elements?

Що таке root element?

Який root element має HTML-документ?

Для чого потрібен `<!DOCTYPE html>`?

Що знаходиться в `<head>`?

Що знаходиться в `<body>`?

Для чого потрібен `<title>`?

Для чого потрібен `charset`?

Що таке UTF-8?

Для чого потрібен viewport meta tag?

Що таке void element?

Наведи приклади void elements.

Чи має `<img>` closing tag?

Що таке semantic HTML?

Навіщо потрібен semantic HTML?

Що таке DOM?

Як браузер перетворює HTML на DOM?

Чим HTML відрізняється від CSS?

Чим HTML відрізняється від JavaScript?

Що таке `div`?

Що таке `span`?

Коли використовувати `button` замість `div`?

Що таке block-level та inline elements?

Чи визначає HTML назавжди block/inline behavior?

Що таке HTML comment?

Як правильно вкладати HTML elements?

Що станеться при неправильному nesting?

Що таке `lang` attribute?

Навіщо потрібен `alt` у `<img>`?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке HTML.

HyperText Markup Language.

Markup language.

HTML document.

HTML element.

HTML tag.

Opening tag.

Closing tag.

Content.

Attribute.

Attribute value.

HTML nesting.

Parent.

Child.

Sibling.

Root element.

`<!DOCTYPE html>`.

`<html>`.

`<head>`.

`<body>`.

`<title>`.

`<meta charset>`.

`lang`.

Базова структура HTML-документа.

Основи headings.

`<p>`.

`<a>`.

`<img>`.

`<button>`.

`<div>`.

`<span>`.

Void elements.

HTML comments.

Базовий semantic HTML.

Базове розуміння DOM.

---

# 🔵 Junior

Розуміння HTML document structure.

Правильне nesting.

Parent / child / sibling relationships.

Attributes.

Boolean attributes.

Semantic HTML.

Heading hierarchy.

`header`.

`nav`.

`main`.

`section`.

`article`.

`aside`.

`footer`.

Accessibility basics.

`alt`.

`lang`.

Meaningful links.

Correct button usage.

Block / inline concepts.

HTML entities.

Character references.

HTML validation.

HTML + CSS relationship.

HTML + JavaScript relationship.

DOM tree.

Browser parsing.

Розуміння різниці:

    HTML
    CSS
    JavaScript

---

# 🟠 Middle

Глибше розуміння HTML parsing.

DOM construction.

HTML parsing algorithm.

Content model.

Transparent content models.

Categories of HTML elements.

Flow content.

Sectioning content.

Heading content.

Phrasing content.

Embedded content.

Interactive content.

Form-associated elements.

HTML semantics.

Accessibility tree.

ARIA basics.

Native semantics.

Progressive enhancement.

HTML performance considerations.

Resource loading.

`async`.

`defer`.

Preload.

Preconnect.

Metadata.

Structured document architecture.

HTML та browser rendering pipeline.

---

# 🔴 Senior

Глибоке розуміння HTML Living Standard.

HTML parsing algorithm.

Tokenizer.

Tree construction.

DOM construction.

Content categories.

Content models.

Custom elements.

Web Components.

Shadow DOM.

HTML templates.

`<template>`.

`<slot>`.

Declarative Shadow DOM.

Accessibility tree.

Native semantics.

ARIA interaction.

Browser parsing performance.

Critical rendering path.

Resource discovery.

Preload scanner.

Speculative parsing.

HTML security considerations.

Trusted Types concepts.

Cross-document behavior.

Parsing edge cases.

Browser compatibility.

Progressive enhancement.

Graceful degradation.

SEO та semantic document architecture.

HTML performance optimization.

---

# Головне

• HTML — мова розмітки, а не мова програмування.

• HTML описує структуру, контент та семантику документа.

• Основною одиницею HTML є element.

• Element може складатися з opening tag, content та closing tag.

• Attribute додає додаткову інформацію до element.

• HTML має деревоподібну структуру.

• Elements можуть бути parent, child або sibling.

• `<html>` є root element.

• `<head>` містить metadata та resource declarations.

• `<body>` містить основний контент сторінки.

• `<!DOCTYPE html>` задає HTML document type declaration.

• `lang` визначає основну мову документа.

• `<title>` визначає title документа.

• `<meta charset="UTF-8">` задає character encoding.

• Viewport meta tag важливий для responsive pages.

• Не всі elements мають closing tag.

• Void elements не мають content та closing tag.

• `<img>`, `<input>`, `<br>`, `<hr>`, `<meta>`, `<link>` — приклади void elements.

• HTML elements повинні бути правильно вкладені.

• Semantic HTML передає meaning та покращує структуру документа.

• `div` і `span` — generic containers без власної спеціальної семантики.

• Для дій користувача краще використовувати `<button>`, а не стилізований `<div>`.

• Для navigation краще використовувати `<nav>`, якщо блок справді є navigation.

• HTML визначає structure.

• CSS визначає presentation.

• JavaScript визначає behavior.

• Браузер аналізує HTML та створює DOM.

• DOM представляє HTML-документ як дерево об'єктів.

• Accessibility значною мірою залежить від правильної семантики HTML.

• Правильний HTML — це не тільки синтаксис, а й правильне використання elements відповідно до їхнього призначення.

---

# Основна модель HTML

    HTML source
        ↓
    elements
        ↓
    nesting
        ↓
    document tree
        ↓
    DOM
        ↓
    browser rendering

---

# Frontend-модель

    ┌───────────────┐
    │     HTML      │
    │   Structure   │
    └───────┬───────┘
            ↓
    ┌───────────────┐
    │      CSS      │
    │ Presentation  │
    └───────┬───────┘
            ↓
    ┌───────────────┐
    │  JavaScript   │
    │   Behavior    │
    └───────────────┘

---

# Запам'ятати одним блоком

    HTML
    ↓
    structure + content + semantics

    element
    ↓
    <tag>content</tag>

    attribute
    ↓
    name="value"

    document
    ↓
    <!DOCTYPE html>
    <html>
    ├── <head>
    └── <body>

    HTML tree
    ↓
    parent
    ├── child
    └── child

    semantic HTML
    ↓
    meaning

    DOM
    ↓
    HTML → browser object tree

    HTML
    ↓
    structure

    CSS
    ↓
    presentation

    JavaScript
    ↓
    behavior