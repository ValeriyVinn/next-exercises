# 10. HTML Best Practices

## Зміст

1. [Що таке HTML Best Practices](#1-що-таке-html-best-practices)
2. [Головний принцип](#2-головний-принцип)
3. [Правильна структура HTML-документа](#3-правильна-структура-html-документа)
4. [DOCTYPE](#4-doctype)
5. [Атрибут `lang`](#5-атрибут-lang)
6. [Правильний `<head>`](#6-правильний-head)
7. [Правильна структура `<body>`](#7-правильна-структура-body)
8. [Semantic HTML](#8-semantic-html)
9. [Правильний вибір HTML-елементів](#9-правильний-вибір-html-елементів)
10. [Heading hierarchy](#10-heading-hierarchy)
11. [Правильне використання `<div>` та `<span>`](#11-правильне-використання-div-та-span)
12. [Посилання `<a>` vs кнопка `<button>`](#12-посилання-a-vs-кнопка-button)
13. [Правильні атрибути](#13-правильні-атрибути)
14. [`id` та `class`](#14-id-та-class)
15. [Зображення та `alt`](#15-зображення-та-alt)
16. [Lazy loading та зображення](#16-lazy-loading-та-зображення)
17. [Посилання та навігація](#17-посилання-та-навігація)
18. [Форми](#18-форми)
19. [Labels та inputs](#19-labels-та-inputs)
20. [Accessibility](#20-accessibility)
21. [ARIA](#21-aria)
22. [Keyboard accessibility](#22-keyboard-accessibility)
23. [Мова та напрямок тексту](#23-мова-та-напрямок-тексту)
24. [HTML та SEO](#24-html-та-seo)
25. [HTML та CSS](#25-html-та-css)
26. [HTML та JavaScript](#26-html-та-javascript)
27. [Чистий та читабельний HTML](#27-чистий-та-читабельний-html)
28. [Indentation та formatting](#28-indentation-та-formatting)
29. [Назви класів](#29-назви-класів)
30. [Не дублюй HTML без потреби](#30-не-дублюй-html-без-потреби)
31. [Не використовуй deprecated elements](#31-не-використовуй-deprecated-elements)
32. [Не використовуй HTML для styling](#32-не-використовуй-html-для-styling)
33. [Безпечний HTML](#33-безпечний-html)
34. [Performance considerations](#34-performance-considerations)
35. [Responsive HTML](#35-responsive-html)
36. [Progressive enhancement](#36-progressive-enhancement)
37. [HTML validation](#37-html-validation)
38. [Типові помилки](#38-типові-помилки)
39. [Поганий та хороший HTML](#39-поганий-та-хороший-html)
40. [Практичний приклад](#40-практичний-приклад)
41. [Практичні завдання](#41-практичні-завдання)
42. [Checklist](#42-checklist)
43. [Рівні знань](#43-рівні-знань)
44. [Питання для співбесіди](#44-питання-для-співбесіди)
45. [Mini Cheat Sheet](#45-mini-cheat-sheet)
46. [Ментальна модель](#46-ментальна-модель)
47. [Головне, що потрібно запам'ятати](#47-головне-що-потрібно-запамятати)

---

# 1. Що таке HTML Best Practices

**HTML Best Practices** — це набір правил і рекомендацій, які допомагають писати:

- правильний;
- семантичний;
- доступний;
- читабельний;
- підтримуваний;
- безпечний;
- ефективний HTML.

Мета:

> HTML повинен правильно описувати структуру та зміст документа.

Не просто:

    "Як зробити, щоб воно виглядало?"

А:

    "Що це за контент?"
    "Який елемент найкраще його описує?"
    "Як його сприйме screen reader?"
    "Як його зрозуміє браузер?"
    "Як його буде підтримувати інший розробник?"

---

# 2. Головний принцип

Найважливіший принцип:

> **Write HTML for meaning, not for appearance.**

Тобто:

    HTML
      ↓
    structure + meaning

    CSS
      ↓
    appearance

    JavaScript
      ↓
    behavior

Наприклад, якщо це кнопка:

    <button>
        Зберегти
    </button>

Не потрібно створювати кнопку через:

    <div class="button">
        Зберегти
    </div>

А потім намагатися відтворити всю поведінку кнопки через JavaScript.

---

# 3. Правильна структура HTML-документа

Базовий документ:

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

    </html>

Це фундаментальна структура HTML-документа.

---

# 4. DOCTYPE

Починай HTML-документ із:

    <!DOCTYPE html>

`DOCTYPE` повідомляє браузеру, що документ використовує сучасний HTML-документний режим.

Правильно:

    <!DOCTYPE html>

    <html lang="uk">
        ...
    </html>

Не потрібно використовувати старі декларації DOCTYPE.

---

# 5. Атрибут `lang`

Задавай основну мову документа:

    <html lang="uk">

Для англійської:

    <html lang="en">

Якщо в документі є іншомовний фрагмент:

    <p lang="en">
        This is an English sentence.
    </p>

Це важливо для:

- accessibility;
- screen readers;
- pronunciation;
- spell checking;
- browser language processing;
- search engines.

Для українського сайту:

    <html lang="uk">

є хорошою базовою практикою.

---

# 6. Правильний `<head>`

Мінімальний корисний `<head>`:

    <head>

        <meta charset="UTF-8">

        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >

        <title>HTML Best Practices</title>

    </head>

## `charset`

    <meta charset="UTF-8">

Визначає кодування документа.

Для сучасних HTML-документів зазвичай використовується UTF-8.

## `viewport`

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

Важливий для responsive layout на мобільних пристроях.

## `title`

    <title>HTML Best Practices</title>

Назва документа важлива для:

- browser tab;
- bookmarks;
- search engines;
- accessibility.

---

# 7. Правильна структура `<body>`

Не потрібно будувати всю сторінку як набір `<div>`.

Погано:

    <body>

        <div class="header">
            ...
        </div>

        <div class="content">
            ...
        </div>

        <div class="footer">
            ...
        </div>

    </body>

Краще:

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

# 8. Semantic HTML

Використовуй елемент відповідно до його змісту.

Наприклад:

    <nav>
        ...
    </nav>

для navigation.

    <main>
        ...
    </main>

для основного контенту.

    <article>
        ...
    </article>

для незалежного контенту.

    <aside>
        ...
    </aside>

для додаткового контенту.

    <footer>
        ...
    </footer>

для footer.

Модель:

    WHAT IS IT?
        ↓
    choose semantic element

---

# 9. Правильний вибір HTML-елементів

Перед використанням елемента постав запитання:

> Яке семантичне значення має цей контент?

Наприклад:

### Заголовок

    <h1>HTML Basics</h1>

### Абзац

    <p>
        HTML is a markup language.
    </p>

### Посилання

    <a href="/about">
        About
    </a>

### Кнопка

    <button type="button">
        Save
    </button>

### Список

    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

Не вибирай елемент лише через його стандартний зовнішній вигляд.

---

# 10. Heading hierarchy

Заголовки повинні формувати логічну структуру.

Наприклад:

    <h1>HTML</h1>

    <h2>Basics</h2>

    <h3>Elements</h3>

    <h3>Attributes</h3>

    <h2>Semantic HTML</h2>

    <h3>Sections</h3>

    <h3>Articles</h3>

Заголовки не слід використовувати лише через розмір тексту.

Погано:

    <h6>
        Маленький текст
    </h6>

Якщо це не заголовок.

CSS повинен відповідати за розмір:

    <h2 class="small-heading">
        Заголовок
    </h2>

---

# 11. Правильне використання `<div>` та `<span>`

`<div>` і `<span>` — не погані елементи.

Вони потрібні, коли немає відповідного semantic element.

Наприклад:

    <div class="card">
        ...
    </div>

може бути нормальним контейнером для CSS.

`<span>`:

    <p>
        Ціна:
        <span class="price">100 грн</span>
    </p>

Але якщо контент має власну семантику, краще використати відповідний елемент.

Наприклад:

    <time datetime="2026-09-08">
        8 вересня 2026
    </time>

замість:

    <span class="date">
        8 вересня 2026
    </span>

---

# 12. Посилання `<a>` vs кнопка `<button>`

Це фундаментальне правило.

## `<a>`

Використовуй для переходу:

    <a href="/about">
        Про нас
    </a>

Тобто:

    <a>
      ↓
    navigation

## `<button>`

Використовуй для дії:

    <button type="button">
        Відкрити меню
    </button>

Тобто:

    <button>
      ↓
    action

## Запам'ятай

    LINK
      ↓
    <a>

    ACTION
      ↓
    <button>

Не:

    <div onclick="openMenu()">
        Menu
    </div>

---

# 13. Правильні атрибути

Використовуй атрибути за призначенням.

Наприклад:

    <img
        src="/images/logo.png"
        alt="Логотип сайту"
    >

    <a href="/about">
        Про нас
    </a>

    <button
        type="submit"
    >
        Зберегти
    </button>

Атрибути повинні бути:

- доречними;
- валідними;
- зрозумілими;
- необхідними.

Не додавай атрибути просто "про всяк випадок".

---

# 14. `id` та `class`

## `id`

Використовуй для унікального елемента:

    <main id="main-content">
        ...
    </main>

## `class`

Для повторюваного стилю або логічної групи:

    <article class="card">
        ...
    </article>

    <article class="card">
        ...
    </article>

Не дублюй `id`:

    <div id="card">...</div>
    <div id="card">...</div>

Краще:

    <div class="card">...</div>
    <div class="card">...</div>

---

# 15. Зображення та `alt`

Для `<img>` правильно використовуй `alt`.

Інформативне зображення:

    <img
        src="/images/church.jpg"
        alt="Храм у центрі міста"
    >

Декоративне зображення:

    <img
        src="/images/decoration.svg"
        alt=""
    >

`alt` повинен описувати **зміст або функцію** зображення, а не технічний файл.

Погано:

    <img
        src="/images/church.jpg"
        alt="image123.jpg"
    >

Краще:

    <img
        src="/images/church.jpg"
        alt="Храм у центрі міста"
    >

---

# 16. Lazy loading та зображення

Для зображень, які не потрібні одразу при завантаженні сторінки, можна використовувати:

    <img
        src="/images/article.jpg"
        alt="Опис зображення"
        loading="lazy"
    >

Але не потрібно бездумно ставити `loading="lazy"` на абсолютно все.

Для контенту, який є важливим для першого екрану, lazy loading може бути недоречним.

Модель:

    above the fold
        ↓
    potentially eager

    below the fold
        ↓
    potentially lazy

---

# 17. Посилання та навігація

Посилання повинно мати зрозумілий текст.

Погано:

    <a href="/article">
        Натисніть тут
    </a>

Краще:

    <a href="/article">
        Читати статтю про Semantic HTML
    </a>

Так користувач може зрозуміти призначення посилання навіть поза контекстом.

Для зовнішніх посилань:

    <a
        href="https://example.com"
    >
        Example
    </a>

Якщо відкриваєш посилання в новій вкладці:

    <a
        href="https://example.com"
        target="_blank"
        rel="noopener"
    >
        Example
    </a>

---

# 18. Форми

Форма повинна мати зрозумілу структуру.

    <form action="/login" method="post">

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
                Пароль
            </label>

            <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
            >
        </div>

        <button type="submit">
            Увійти
        </button>

    </form>

---

# 19. Labels та inputs

Кожне важливе поле форми повинно мати label.

Правильно:

    <label for="email">
        Email
    </label>

    <input
        id="email"
        name="email"
        type="email"
    >

`for` у `<label>` повинен відповідати `id` input.

    label[for]
          ↓
    input[id]

Альтернативний варіант:

    <label>
        Email

        <input
            name="email"
            type="email"
        >
    </label>

Це створює зв'язок між label та input без `for`/`id`.

---

# 20. Accessibility

Accessibility означає, що сайт повинен бути доступним для максимально широкого кола користувачів.

Основні практики:

- Semantic HTML;
- правильні headings;
- labels;
- alt text;
- keyboard navigation;
- focus management;
- достатній контраст через CSS;
- правильні buttons;
- правильні links;
- `lang`;
- ARIA там, де вона дійсно потрібна.

Перший принцип:

> **Use native HTML before adding custom accessibility behavior.**

---

# 21. ARIA

ARIA допомагає описувати accessibility semantics, коли native HTML недостатньо.

Наприклад:

    <button
        aria-expanded="false"
        aria-controls="menu"
    >
        Меню
    </button>

Але не потрібно робити:

    <div role="button">
        Save
    </div>

якщо можна:

    <button>
        Save
    </button>

Правило:

    Native HTML
        ↓
    first choice

    ARIA
        ↓
    when necessary

---

# 22. Keyboard accessibility

Інтерактивні елементи повинні бути доступні з клавіатури.

Добре:

    <button>
        Зберегти
    </button>

    <a href="/about">
        Про нас
    </a>

Погано:

    <div onclick="save()">
        Зберегти
    </div>

Особливо важливі:

- Tab;
- Enter;
- Space;
- Escape;
- Arrow keys у складних widgets.

Не створюй custom interactive element без необхідності.

---

# 23. Мова та напрямок тексту

Основна мова:

    <html lang="uk">

Іншомовний текст:

    <span lang="en">
        Semantic HTML
    </span>

Для right-to-left мов:

    <p dir="rtl">
        العربية
    </p>

Це особливо важливо для:

- multilingual websites;
- accessibility;
- mixed-language content.

---

# 24. HTML та SEO

HTML є важливою частиною technical SEO.

Корисні практики:

- правильний `<title>`;
- логічні headings;
- semantic HTML;
- descriptive links;
- meaningful content;
- правильний `lang`;
- `alt` для meaningful images;
- canonical та meta information за потреби;
- structured data там, де доречно.

Наприклад:

    <title>
        HTML Best Practices — Навчальний матеріал
    </title>

Краще за:

    <title>
        Page
    </title>

---

# 25. HTML та CSS

Не використовуй HTML для presentation.

Погано:

    <font color="red">
        Error
    </font>

Краще:

    <p class="error">
        Error
    </p>

    .error {
        color: red;
    }

Так само не потрібно використовувати:

    <br>
    <br>
    <br>

для створення вертикальних відступів.

Spacing повинен робити CSS:

    .section {
        margin-bottom: 2rem;
    }

---

# 26. HTML та JavaScript

HTML повинен надавати правильну структуру, а JavaScript — behavior.

Наприклад:

    <button
        id="save-button"
        type="button"
    >
        Зберегти
    </button>

JavaScript:

    const button = document.querySelector("#save-button");

    button.addEventListener("click", () => {
        saveData();
    });

Не потрібно перетворювати HTML на JavaScript-код:

    <button
        onclick="saveData()"
    >
        Зберегти
    </button>

Inline event handlers зазвичай менш зручні для підтримки великих застосунків.

---

# 27. Чистий та читабельний HTML

HTML повинен бути зрозумілим людині.

Погано:

    <main><section><h1>HTML</h1><p>Text</p></section></main>

Краще:

    <main>

        <section>

            <h1>
                HTML
            </h1>

            <p>
                Text
            </p>

        </section>

    </main>

Форматування може бути компактнішим, головне — послідовність.

---

# 28. Indentation та formatting

Використовуй послідовні відступи.

Наприклад, 4 spaces:

    <main>

        <section>

            <h1>
                HTML
            </h1>

            <p>
                Content
            </p>

        </section>

    </main>

Або 2 spaces — це також нормально.

Головне:

> **Choose one style and use it consistently.**

Не змішуй:

    2 spaces
    4 spaces
    tabs

без причини.

---

# 29. Назви класів

Назви класів повинні описувати призначення.

Добре:

    .card
    .card-title
    .product-card
    .navigation
    .button-primary

Погано:

    .red
    .big
    .thing
    .box1
    .left

Особливо погано прив'язувати клас безпосередньо до presentation:

    .red-text

Краще:

    .error-message

А CSS уже визначає:

    .error-message {
        color: red;
    }

---

# 30. Не дублюй HTML без потреби

Якщо структура повторюється багато разів, у сучасному frontend-проєкті її зазвичай перетворюють на component/template.

Наприклад, замість ручного дублювання:

    <article class="card">
        <h2>HTML</h2>
        <p>...</p>
    </article>

    <article class="card">
        <h2>CSS</h2>
        <p>...</p>
    </article>

    <article class="card">
        <h2>JavaScript</h2>
        <p>...</p>
    </article>

у React/Next.js це може бути компонент:

    <Card title="HTML" />
    <Card title="CSS" />
    <Card title="JavaScript" />

HTML Best Practices при цьому залишаються актуальними:

> Component повинен генерувати правильний semantic HTML.

---

# 31. Не використовуй deprecated elements

Не використовуй застарілі HTML-елементи та presentation-oriented підходи.

Наприклад, не потрібно:

    <font>
    <center>
    <big>

Для presentation використовуй CSS.

Замість:

    <center>
        Hello
    </center>

краще:

    <div class="center">
        Hello
    </div>

    .center {
        text-align: center;
    }

---

# 32. Не використовуй HTML для styling

HTML:

    <strong>
        Важливий текст
    </strong>

має семантичне значення.

А:

    <b>
        Візуально жирний текст
    </b>

передає переважно візуальне виділення.

Важливо розуміти різницю.

Так само:

    <em>
        Акцент
    </em>

має семантичний emphasis.

Не використовуй semantic elements лише заради їхнього стандартного вигляду.

---

# 33. Безпечний HTML

HTML може бути частиною security problem, якщо в нього вставляється неперевірений користувацький контент.

Наприклад, небезпечно безпосередньо вставляти arbitrary HTML:

    element.innerHTML = userInput;

Користувацький контент потрібно правильно обробляти та sanitizing-ити відповідно до контексту.

Безпечнішим для простого тексту є:

    element.textContent = userInput;

Ментальна модель:

    untrusted input
          ↓
    validation / sanitization
          ↓
    safe output

Особливо це важливо при роботі з:

- CMS;
- comments;
- user profiles;
- rich text editors;
- markdown;
- external content.

---

# 34. Performance considerations

HTML також впливає на performance.

Корисні практики:

- не створювати непотрібно складний DOM;
- оптимізувати images;
- використовувати lazy loading для відповідного контенту;
- правильно підключати CSS/JS;
- уникати зайвого markup;
- використовувати responsive images;
- не завантажувати непотрібні ресурси.

Наприклад:

    <img
        src="/images/photo.jpg"
        alt="Опис"
        loading="lazy"
    >

Для responsive images:

    <img
        src="/images/photo-800.jpg"
        srcset="
            /images/photo-400.jpg 400w,
            /images/photo-800.jpg 800w,
            /images/photo-1200.jpg 1200w
        "
        sizes="
            (max-width: 600px) 100vw,
            800px
        "
        alt="Опис"
    >

---

# 35. Responsive HTML

HTML повинен нормально працювати з responsive CSS.

Для мобільних пристроїв:

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

Не потрібно створювати окрему HTML-сторінку тільки для mobile, якщо responsive design може вирішити задачу.

Структура:

    HTML
      ↓
    semantic structure

    CSS
      ↓
    responsive layout

---

# 36. Progressive enhancement

**Progressive enhancement** — підхід, за якого базова функціональність працює без складних технологій, а потім покращується за допомогою CSS і JavaScript.

Наприклад, форма:

    <form action="/search" method="get">

        <label for="query">
            Пошук
        </label>

        <input
            id="query"
            name="q"
            type="search"
        >

        <button type="submit">
            Знайти
        </button>

    </form>

Навіть без JavaScript у такої форми є базова HTML-функціональність.

Потім JavaScript може додати:

- autocomplete;
- live search;
- loading states;
- filters;
- enhanced UX.

Модель:

    HTML
      ↓
    basic functionality

    CSS
      ↓
    presentation

    JavaScript
      ↓
    enhanced behavior

---

# 37. HTML validation

Корисно перевіряти HTML на помилки.

Перевіряй:

- правильність nesting;
- закриття елементів;
- атрибути;
- duplicate IDs;
- invalid markup;
- accessibility issues.

Для навчання особливо корисно регулярно запускати HTML через validator.

Але:

> Validator не визначає, чи є HTML хорошим з точки зору UX або семантики.

Валідний HTML може бути погано спроектований.

Тому:

    Validation
        +
    Semantics
        +
    Accessibility
        +
    Maintainability

---

# 38. Типові помилки

## Помилка 1 — все через `<div>`

Погано:

    <div class="header">
        <div class="nav">
            ...
        </div>
    </div>

Краще:

    <header>
        <nav>
            ...
        </nav>
    </header>

---

## Помилка 2 — `<div>` замість `<button>`

Погано:

    <div onclick="openMenu()">
        Menu
    </div>

Краще:

    <button type="button">
        Menu
    </button>

---

## Помилка 3 — `<a>` без `href`

Погано:

    <a onclick="openModal()">
        Open
    </a>

Якщо це action — краще:

    <button type="button">
        Open
    </button>

---

## Помилка 4 — відсутній `alt`

Погано:

    <img src="/photo.jpg">

Краще:

    <img
        src="/photo.jpg"
        alt="Опис фотографії"
    >

---

## Помилка 5 — неправильні labels

Погано:

    <label>
        Email
    </label>

    <input type="email">

Краще:

    <label for="email">
        Email
    </label>

    <input
        id="email"
        type="email"
    >

---

## Помилка 6 — heading для styling

Погано:

    <h6>
        Маленький текст
    </h6>

Краще:

    <p class="small-text">
        Маленький текст
    </p>

---

## Помилка 7 — `<br>` для layout

Погано:

    Text
    <br>
    <br>
    <br>
    More text

Краще використовувати CSS.

---

## Помилка 8 — дубльований `id`

Погано:

    <button id="save">Save</button>
    <button id="save">Save</button>

Краще:

    <button class="save-button">Save</button>
    <button class="save-button">Save</button>

---

## Помилка 9 — inline styles everywhere

Погано:

    <div
        style="
            color: red;
            padding: 20px;
            margin: 10px;
        "
    >
        ...
    </div>

Краще:

    <div class="message">
        ...
    </div>

---

## Помилка 10 — надмірне ARIA

Не потрібно:

    <button
        role="button"
        aria-role="button"
    >
        Save
    </button>

Native `<button>` уже має button semantics.

---

# 39. Поганий та хороший HTML

## Поганий варіант

    <div class="page">

        <div class="header">

            <div class="logo">
                My Site
            </div>

            <div class="nav">
                <div onclick="goHome()">
                    Home
                </div>

                <div onclick="goAbout()">
                    About
                </div>
            </div>

        </div>

        <div class="content">

            <div class="big-title">
                My Blog
            </div>

            <div class="post">

                <div class="post-title">
                    HTML
                </div>

                <div>
                    HTML is a markup language.
                </div>

            </div>

        </div>

    </div>

## Хороший варіант

    <body>

        <header>

            <a href="/">
                My Site
            </a>

            <nav aria-label="Main navigation">

                <ul>
                    <li>
                        <a href="/">
                            Home
                        </a>
                    </li>

                    <li>
                        <a href="/about">
                            About
                        </a>
                    </li>
                </ul>

            </nav>

        </header>

        <main>

            <h1>
                My Blog
            </h1>

            <article>

                <h2>
                    HTML
                </h2>

                <p>
                    HTML is a markup language.
                </p>

            </article>

        </main>

    </body>

---

# 40. Практичний приклад

Повноцінна semantic HTML-сторінка:

    <!DOCTYPE html>

    <html lang="uk">

        <head>

            <meta charset="UTF-8">

            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            >

            <title>
                HTML Best Practices
            </title>

            <meta
                name="description"
                content="Практичний матеріал про правильний HTML."
            >

        </head>

        <body>

            <header>

                <a href="/">
                    My Learning Site
                </a>

                <nav aria-label="Головна навігація">

                    <ul>

                        <li>
                            <a href="/">
                                Головна
                            </a>
                        </li>

                        <li>
                            <a href="/html">
                                HTML
                            </a>
                        </li>

                        <li>
                            <a href="/css">
                                CSS
                            </a>
                        </li>

                    </ul>

                </nav>

            </header>

            <main>

                <section>

                    <h1>
                        HTML Best Practices
                    </h1>

                    <p>
                        Правила написання якісного HTML.
                    </p>

                </section>

                <section>

                    <h2>
                        Основні принципи
                    </h2>

                    <article>

                        <h3>
                            Semantic HTML
                        </h3>

                        <p>
                            Використовуй елементи відповідно
                            до їхнього призначення.
                        </p>

                    </article>

                    <article>

                        <h3>
                            Accessibility
                        </h3>

                        <p>
                            Створюй HTML, доступний для
                            різних користувачів.
                        </p>

                    </article>

                </section>

                <aside>

                    <h2>
                        Корисні матеріали
                    </h2>

                    <ul>

                        <li>
                            <a href="/html-basics">
                                HTML Basics
                            </a>
                        </li>

                        <li>
                            <a href="/semantic-html">
                                Semantic HTML
                            </a>
                        </li>

                    </ul>

                </aside>

            </main>

            <footer>

                <address>

                    <a href="mailto:info@example.com">
                        info@example.com
                    </a>

                </address>

                <p>
                    © 2026 My Learning Site
                </p>

            </footer>

        </body>

    </html>

---

# 41. Практичні завдання

## Завдання 1 — Створи базовий документ

Створи HTML-документ із:

- DOCTYPE;
- `lang`;
- charset;
- viewport;
- title;
- header;
- main;
- footer.

---

## Завдання 2 — Semantic page

Створи:

    <header>
    <nav>
    <main>
    <section>
    <article>
    <aside>
    <footer>

Використовуй кожен елемент за призначенням.

---

## Завдання 3 — Blog

Створи blog page:

    <main>

        <h1>Blog</h1>

        <article>
            ...
        </article>

        <article>
            ...
        </article>

        <article>
            ...
        </article>

    </main>

Кожна стаття повинна мати:

- title;
- author;
- date;
- content.

---

## Завдання 4 — Accessible form

Створи форму login:

    Email
    Password
    Remember me
    Submit

Використовуй:

- `<form>`;
- `<label>`;
- `<input>`;
- `autocomplete`;
- `required`;
- `<button>`.

---

## Завдання 5 — Перероби `<div>`-структуру

Візьми:

    <div class="header">...</div>
    <div class="nav">...</div>
    <div class="content">...</div>
    <div class="post">...</div>
    <div class="sidebar">...</div>
    <div class="footer">...</div>

і перетвори її на Semantic HTML.

---

## Завдання 6 — Link or Button?

Визнач, що потрібно використовувати:

    "Перейти на сторінку About"
        → ?

    "Відкрити меню"
        → ?

    "Видалити товар"
        → ?

    "Перейти до документації"
        → ?

Очікувана логіка:

    navigation
        → <a>

    action
        → <button>

---

## Завдання 7 — Accessibility audit

Знайди помилки:

    <img src="photo.jpg">

    <div onclick="save()">
        Save
    </div>

    <label>
        Email
    </label>

    <input type="email">

    <h4>
        Main page title
    </h4>

Виправ їх.

---

## Завдання 8 — HTML audit

Візьми одну зі своїх старих HTML-сторінок і перевір:

- semantic structure;
- headings;
- links;
- buttons;
- images;
- forms;
- labels;
- `lang`;
- `id`;
- `class`;
- accessibility;
- unnecessary `<div>`;
- inline styles;
- deprecated elements.

---

# 42. Checklist

## Document

- [ ] Є `<!DOCTYPE html>`.
- [ ] Є `<html lang="...">`.
- [ ] Є `<meta charset="UTF-8">`.
- [ ] Є viewport.
- [ ] Є meaningful `<title>`.

## Structure

- [ ] Є логічний `<header>`.
- [ ] Навігація використовує `<nav>`.
- [ ] Основний контент знаходиться в `<main>`.
- [ ] Тематичні блоки використовують `<section>` там, де це доречно.
- [ ] Незалежний контент використовує `<article>`.
- [ ] Додатковий контент використовує `<aside>`.
- [ ] Footer використовує `<footer>`.

## Headings

- [ ] Є логічний `<h1>`.
- [ ] Заголовки мають правильну ієрархію.
- [ ] Heading не використовується тільки для styling.

## Links

- [ ] Для navigation використовується `<a>`.
- [ ] `<a>` має `href`, якщо це справжнє посилання.
- [ ] Текст link зрозумілий.
- [ ] Немає зайвих "Click here".

## Buttons

- [ ] Для actions використовується `<button>`.
- [ ] Немає `<div onclick>` для кнопок.
- [ ] `type` заданий там, де це потрібно.

## Images

- [ ] Є `alt`.
- [ ] Decorative images мають `alt=""`.
- [ ] Великі/відкладені зображення можуть використовувати `loading="lazy"`.
- [ ] Responsive images оптимізовані за потреби.

## Forms

- [ ] Поля мають labels.
- [ ] `label[for]` відповідає `input[id]`.
- [ ] Є `name`, де він потрібен.
- [ ] Використовуються правильні `type`.
- [ ] Використовується `autocomplete`, де доречно.
- [ ] Використовується `required`, де потрібно.

## Accessibility

- [ ] Semantic HTML використовується перед ARIA.
- [ ] Keyboard navigation працює.
- [ ] Focus behavior не порушений.
- [ ] `lang` заданий.
- [ ] Interactive elements є native HTML elements.

## CSS

- [ ] Немає deprecated presentation elements.
- [ ] Немає зайвих inline styles.
- [ ] `<br>` не використовується для layout.
- [ ] HTML не використовується для spacing.

## JavaScript

- [ ] Behavior не залежить від inline `onclick`.
- [ ] DOM elements мають зрозумілу структуру.
- [ ] `data-*` використовується для невеликих custom data.
- [ ] Interactive behavior не ламає accessibility.

## Quality

- [ ] HTML читабельний.
- [ ] Indentation послідовний.
- [ ] Немає duplicate IDs.
- [ ] Немає deprecated elements.
- [ ] Немає зайвої семантики.
- [ ] Немає зайвого markup.

---

# 43. Рівні знань

## 🟢 Core

Потрібно знати:

- DOCTYPE;
- `html`;
- `head`;
- `body`;
- `lang`;
- charset;
- viewport;
- title;
- semantic HTML;
- headings;
- links;
- buttons;
- images;
- forms.

---

## 🟡 Junior

Потрібно вміти:

- створювати semantic page;
- правильно використовувати `<a>` та `<button>`;
- працювати з forms;
- створювати labels;
- використовувати `alt`;
- працювати з `id` та `class`;
- писати readable HTML;
- розуміти accessibility basics;
- уникати deprecated HTML.

---

## 🟠 Middle

Потрібно розуміти:

- accessibility architecture;
- ARIA;
- keyboard navigation;
- focus management;
- semantic component structure;
- responsive images;
- performance;
- progressive enhancement;
- SEO-oriented HTML;
- HTML security considerations.

---

## 🔴 Senior

Потрібно вміти:

- проектувати HTML architecture великих застосунків;
- будувати semantic component systems;
- проектувати accessible interfaces;
- аналізувати DOM complexity;
- оптимізувати HTML performance;
- розуміти interaction HTML/CSS/JS;
- враховувати SEO;
- працювати з SSR/SSG;
- проектувати progressive enhancement;
- робити accessibility audits;
- уникати semantic overengineering.

---

# 44. Питання для співбесіди

### 1. Що таке HTML Best Practices?

Це набір правил, які допомагають писати semantic, accessible, maintainable, valid та ефективний HTML.

---

### 2. Навіщо потрібен `<!DOCTYPE html>`?

Він визначає HTML-документний режим браузера та допомагає уникати legacy quirks mode.

---

### 3. Для чого потрібен `lang`?

Для визначення мови документа, що важливо зокрема для accessibility, screen readers та мовної обробки.

---

### 4. Чому `<button>` кращий за `<div onclick>`?

Тому що `<button>` є native interactive element із вбудованою семантикою та keyboard/accessibility behavior.

---

### 5. Коли використовувати `<a>`?

Коли користувач переходить до іншого ресурсу, URL або location.

---

### 6. Коли використовувати `<button>`?

Коли користувач виконує дію в інтерфейсі.

---

### 7. Чи потрібно використовувати ARIA всюди?

Ні.

Спочатку потрібно використовувати native semantic HTML.

---

### 8. Чому важливий `alt`?

Він забезпечує текстову альтернативу зображенню для випадків, коли зображення не може бути сприйняте візуально.

---

### 9. Чи всі зображення повинні мати описовий `alt`?

Ні.

Декоративні зображення можуть мати:

    alt=""

---

### 10. Чому `<br>` не слід використовувати для layout?

Тому що `<br>` означає line break, а не spacing. Для layout потрібно використовувати CSS.

---

### 11. Чи є `<div>` поганим елементом?

Ні.

Це універсальний контейнер, який доречний, коли немає відповідного semantic element.

---

### 12. Чому не варто використовувати `<h1>`–`<h6>` для styling?

Heading elements описують структуру документа, а не розмір тексту.

---

### 13. Що таке progressive enhancement?

Підхід, коли базова функціональність забезпечується HTML, а CSS та JavaScript поступово її покращують.

---

### 14. Чому HTML validation недостатньо?

Тому що валідний HTML може залишатися:

- семантично поганим;
- недоступним;
- незручним;
- погано структурованим.

---

### 15. Чому не варто використовувати `innerHTML` з неперевіреним input?

Тому що вставка неперевіреного HTML може створити security vulnerabilities, зокрема XSS.

---

# 45. Mini Cheat Sheet

| Правило | Best Practice |
|---|---|
| Документ | `<!DOCTYPE html>` |
| Мова | `<html lang="uk">` |
| Кодування | `<meta charset="UTF-8">` |
| Mobile | viewport meta |
| Назва | meaningful `<title>` |
| Layout | semantic HTML |
| Navigation | `<nav>` |
| Main content | `<main>` |
| Section | `<section>` |
| Independent content | `<article>` |
| Sidebar | `<aside>` |
| Footer | `<footer>` |
| Navigation | `<a href="...">` |
| Action | `<button>` |
| Image | `<img alt="...">` |
| Form field | `<label>` + `<input>` |
| Unique element | `id` |
| Reusable group | `class` |
| Custom DOM data | `data-*` |
| Accessibility | native HTML first |
| Styling | CSS |
| Behavior | JavaScript |
| Spacing | CSS |
| Layout | CSS |
| User text | sanitize/escape appropriately |

---

# 46. Ментальна модель

Перед написанням HTML постав собі послідовно ці питання.

## Крок 1 — Що це?

    page
    section
    article
    navigation
    form
    button
    link
    image
    list
    table

↓

## Крок 2 — Який semantic element?

    navigation
        → <nav>

    main content
        → <main>

    article
        → <article>

    action
        → <button>

    navigation
        → <a>

↓

## Крок 3 — Які attributes потрібні?

    id
    class
    href
    src
    alt
    name
    type
    lang
    aria-*

↓

## Крок 4 — Чи доступний HTML?

    keyboard
    screen reader
    labels
    headings
    alt
    focus
    language

↓

## Крок 5 — Чи відповідає HTML своїй ролі?

    HTML
      ↓
    meaning

    CSS
      ↓
    appearance

    JavaScript
      ↓
    behavior

---

# 47. Головне, що потрібно запам'ятати

## 1. Semantic HTML — основа

Пиши:

    <article>
        ...
    </article>

а не:

    <div class="article">
        ...
    </div>

якщо контент справді є незалежною статтею.

---

## 2. HTML описує зміст

    HTML
      ↓
    WHAT

    CSS
      ↓
    HOW

    JavaScript
      ↓
    BEHAVIOR

---

## 3. `<a>` — navigation

    <a href="/about">
        About
    </a>

---

## 4. `<button>` — action

    <button type="button">
        Open menu
    </button>

---

## 5. Accessibility починається з правильного HTML

    <button>
        Save
    </button>

краще за:

    <div role="button">
        Save
    </div>

якщо немає спеціальної причини використовувати ARIA role.

---

## 6. Forms повинні мати labels

    <label for="email">
        Email
    </label>

    <input
        id="email"
        name="email"
        type="email"
    >

---

## 7. Зображення повинні мати правильний `alt`

    <img
        src="/photo.jpg"
        alt="Опис зображення"
    >

Для декоративного:

    <img
        src="/decoration.svg"
        alt=""
    >

---

## 8. Не використовуй HTML для layout

Не:

    <br>
    <br>
    <br>

Для spacing:

    CSS
      ↓
    margin / padding / gap

---

## 9. Не використовуй HTML для styling

Не:

    <font>
    <center>

Використовуй CSS.

---

## 10. Не використовуй JavaScript там, де достатньо HTML

Наприклад, navigation:

    <a href="/about">
        About
    </a>

не потребує:

    onclick="navigateTo('/about')"

---

## 11. Native HTML first

Спочатку:

    <button>
    <a>
    <input>
    <nav>
    <main>
    <form>

І лише якщо native HTML недостатньо:

    ARIA
    ↓
    additional semantics

---

## 12. HTML повинен бути читабельним

Хороший HTML повинен бути зрозумілим навіть без CSS.

Наприклад:

    <main>

        <h1>
            HTML Best Practices
        </h1>

        <section>

            <h2>
                Accessibility
            </h2>

            <article>

                <h3>
                    Semantic HTML
                </h3>

                <p>
                    Semantic elements describe
                    the meaning of content.
                </p>

            </article>

        </section>

    </main>

---

## 13. Valid HTML ≠ Good HTML

Потрібно перевіряти одразу кілька речей:

    Valid
       +
    Semantic
       +
    Accessible
       +
    Readable
       +
    Maintainable
       +
    Secure
       +
    Performant

---

## 14. Найкращий HTML — простий HTML

Не намагайся додати semantic element, ARIA attribute або wrapper лише тому, що він існує.

Правильний підхід:

    simplest correct HTML
            ↓
    semantic
            ↓
    accessible
            ↓
    maintainable

---

## 15. Фінальна формула HTML Best Practices

    DOCTYPE
       ↓
    lang
       ↓
    correct document structure
       ↓
    semantic elements
       ↓
    correct attributes
       ↓
    accessible interactions
       ↓
    readable markup
       ↓
    CSS for presentation
       ↓
    JavaScript for behavior
       ↓
    validation + testing

Головна ідея:

> **Пиши HTML так, щоб браузер, screen reader, пошукова система і інший розробник могли зрозуміти структуру документа без необхідності "вгадувати", що ти мав на увазі.**