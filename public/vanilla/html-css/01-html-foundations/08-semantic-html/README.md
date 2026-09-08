# 08. Semantic HTML

## Зміст

1. [Що таке Semantic HTML](#1-що-таке-semantic-html)
2. [Навіщо потрібна семантика](#2-навіщо-потрібна-семантика)
3. [Семантичні та несемантичні елементи](#3-семантичні-та-несемантичні-елементи)
4. [Основні семантичні елементи сторінки](#4-основні-семантичні-елементи-сторінки)
5. [`<header>`](#5-header)
6. [`<nav>`](#6-nav)
7. [`<main>`](#7-main)
8. [`<section>`](#8-section)
9. [`<article>`](#9-article)
10. [`<aside>`](#10-aside)
11. [`<footer>`](#11-footer)
12. [`<address>`](#12-address)
13. [`<figure>` та `<figcaption>`](#13-figure-та-figcaption)
14. [`<time>`](#14-time)
15. [`<mark>`](#15-mark)
16. [`<details>` та `<summary>`](#16-details-та-summary)
17. [`<dialog>`](#17-dialog)
18. [`<search>`](#18-search)
19. [Семантична структура сторінки](#19-семантична-структура-сторінки)
20. [Вкладеність семантичних елементів](#20-вкладеність-семантичних-елементів)
21. [`<div>` vs semantic elements](#21-div-vs-semantic-elements)
22. [Semantic HTML та Accessibility](#22-semantic-html-та-accessibility)
23. [Heading hierarchy](#23-heading-hierarchy)
24. [Семантика навігації](#24-семантика-навігації)
25. [Семантика статей і контенту](#25-семантика-статей-і-контенту)
26. [Семантика сайдбарів](#26-семантика-сайдбарів)
27. [Семантика футера](#27-семантика-футера)
28. [Semantic HTML та SEO](#28-semantic-html-та-seo)
29. [Semantic HTML та CSS](#29-semantic-html-та-css)
30. [Semantic HTML та JavaScript](#30-semantic-html-та-javascript)
31. [ARIA та Semantic HTML](#31-aria-та-semantic-html)
32. [Типові помилки](#32-типові-помилки)
33. [Поганий та хороший HTML](#33-поганий-та-хороший-html)
34. [Практичні завдання](#34-практичні-завдання)
35. [Checklist](#35-checklist)
36. [Рівні знань](#36-рівні-знань)
37. [Питання для співбесіди](#37-питання-для-співбесіди)
38. [Mini Cheat Sheet](#38-mini-cheat-sheet)
39. [Ментальна модель](#39-ментальна-модель)
40. [Головне, що потрібно запам'ятати](#40-головне-що-потрібно-запамятати)

---

# 1. Що таке Semantic HTML

**Semantic HTML** — це використання HTML-елементів відповідно до їхнього змісту та призначення.

Іншими словами:

> HTML-елемент повинен описувати, що означає контент, а не лише те, як він виглядає.

Наприклад:

    <nav>
        <a href="/">Головна</a>
        <a href="/about">Про нас</a>
        <a href="/contacts">Контакти</a>
    </nav>

Тут `<nav>` прямо повідомляє:

> цей блок містить навігацію.

На відміну від:

    <div class="navigation">
        <a href="/">Головна</a>
        <a href="/about">Про нас</a>
        <a href="/contacts">Контакти</a>
    </div>

Візуально ці два варіанти можуть виглядати однаково.

Але семантично вони різні.

---

# 2. Навіщо потрібна семантика

Semantic HTML допомагає:

- браузерам;
- screen readers;
- пошуковим системам;
- розробникам;
- майбутнім підтримувачам коду;
- JavaScript;
- CSS;
- accessibility tools.

Основні переваги:

### 1. Accessibility

Семантичні елементи допомагають assistive technologies зрозуміти структуру сторінки.

### 2. SEO

Пошуковим системам легше визначити структуру та призначення контенту.

### 3. Readability

Код стає зрозумілішим для розробника.

### 4. Maintainability

Легше підтримувати великий проєкт.

### 5. Менше залежності від `class`

Замість:

    <div class="header">
    <div class="navigation">
    <div class="main-content">
    <div class="article">
    <div class="sidebar">
    <div class="footer">

можна використовувати:

    <header>
    <nav>
    <main>
    <article>
    <aside>
    <footer>

---

# 3. Семантичні та несемантичні елементи

## Semantic elements

Елементи, які мають зрозуміле змістовне призначення.

    <header>
    <nav>
    <main>
    <section>
    <article>
    <aside>
    <footer>
    <figure>
    <time>
    <address>

## Non-semantic elements

Не описують конкретне значення контенту.

    <div>
    <span>

`<div>` та `<span>` не є поганими елементами.

Вони потрібні.

Але їх варто використовувати тоді, коли відповідного семантичного елемента немає.

---

# 4. Основні семантичні елементи сторінки

Типова структура:

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

Найважливіші:

| Елемент | Призначення |
|---|---|
| `<header>` | вступна частина сторінки або секції |
| `<nav>` | навігація |
| `<main>` | головний унікальний контент сторінки |
| `<section>` | тематична секція |
| `<article>` | самостійний контент |
| `<aside>` | додатковий/побічний контент |
| `<footer>` | нижня/заключна частина |
| `<address>` | контактна інформація |
| `<figure>` | самостійний медіа-контент |
| `<figcaption>` | підпис до `<figure>` |
| `<time>` | дата або час |
| `<details>` | розгортаний контент |
| `<summary>` | заголовок `<details>` |
| `<dialog>` | діалогове вікно |
| `<search>` | область пошуку |

---

# 5. `<header>`

`<header>` — вступна частина сторінки або окремої секції.

Наприклад:

    <header>
        <h1>Мій сайт</h1>
        <p>Навчальний проєкт</p>
    </header>

Header може містити:

- логотип;
- назву;
- заголовок;
- короткий опис;
- навігацію;
- пошук;
- інші вступні елементи.

Наприклад:

    <header>
        <a href="/">
            <img src="/logo.svg" alt="Мій сайт">
        </a>

        <nav>
            <a href="/">Головна</a>
            <a href="/about">Про нас</a>
        </nav>
    </header>

## Важливо

`<header>` не обов'язково повинен бути тільки один на сторінці.

Він може бути:

    <article>

        <header>
            <h2>Назва статті</h2>
            <p>Автор: Іван</p>
        </header>

        ...

    </article>

---

# 6. `<nav>`

`<nav>` використовується для основних навігаційних посилань.

    <nav>
        <ul>
            <li><a href="/">Головна</a></li>
            <li><a href="/blog">Блог</a></li>
            <li><a href="/about">Про нас</a></li>
        </ul>
    </nav>

Не кожна група посилань повинна бути `<nav>`.

Наприклад:

    <footer>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms</a>
    </footer>

Це може бути просто група посилань у footer.

---

# 7. `<main>`

`<main>` містить **основний унікальний контент документа**.

    <body>

        <header>
            ...
        </header>

        <main>
            <h1>Мій блог</h1>

            <article>
                ...
            </article>
        </main>

        <footer>
            ...
        </footer>

    </body>

## Важливе правило

На сторінці зазвичай повинен бути **один `<main>`**.

`<main>` не повинен містити повторювані елементи сайту, такі як:

- основний header;
- глобальна навігація;
- глобальний footer.

---

# 8. `<section>`

`<section>` представляє тематичну секцію документа.

Наприклад:

    <main>

        <section>
            <h2>Наші послуги</h2>

            <p>...</p>
        </section>

        <section>
            <h2>Про компанію</h2>

            <p>...</p>
        </section>

    </main>

Зазвичай `<section>` має власний заголовок.

Добре:

    <section>
        <h2>Новини</h2>

        ...
    </section>

Менш очевидне використання:

    <section>
        <div>
            ...
        </div>
    </section>

Якщо елемент не утворює окремої тематичної секції, можливо, краще використати `<div>`.

---

# 9. `<article>`

`<article>` представляє **самостійний, незалежний фрагмент контенту**.

Наприклад:

- стаття;
- новина;
- пост;
- коментар;
- відгук;
- товар;
- форумний пост;
- картка контенту.

Приклад:

    <article>
        <h2>Що таке HTML?</h2>

        <p>
            HTML — це мова розмітки...
        </p>
    </article>

Блог:

    <section>
        <h2>Останні статті</h2>

        <article>
            <h3>HTML Basics</h3>
            <p>...</p>
        </article>

        <article>
            <h3>CSS Basics</h3>
            <p>...</p>
        </article>

    </section>

## Важлива ідея

Якщо контент можна логічно винести та використати окремо — `<article>` часто є хорошим кандидатом.

---

# 10. `<aside>`

`<aside>` представляє додатковий або побічний контент.

Наприклад:

- sidebar;
- related articles;
- додаткові посилання;
- реклама;
- related products;
- коротка довідка.

    <aside>
        <h2>Схожі статті</h2>

        <ul>
            <li><a href="/html">HTML</a></li>
            <li><a href="/css">CSS</a></li>
        </ul>
    </aside>

Типова структура:

    <main>

        <article>
            <h1>HTML Semantic Elements</h1>

            <p>Основний текст...</p>
        </article>

        <aside>
            <h2>Схожі матеріали</h2>
            ...
        </aside>

    </main>

---

# 11. `<footer>`

`<footer>` представляє нижню або заключну частину сторінки чи секції.

    <footer>
        <p>© 2026 My Website</p>

        <nav>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
        </nav>
    </footer>

Footer може містити:

- copyright;
- контактну інформацію;
- navigation;
- legal links;
- інформацію про автора.

Footer також може бути вкладеним у `<article>`:

    <article>

        <header>
            <h2>Стаття</h2>
        </header>

        <p>Текст...</p>

        <footer>
            <p>Автор: Valeriy</p>
        </footer>

    </article>

---

# 12. `<address>`

`<address>` використовується для контактної інформації.

Наприклад:

    <address>
        <p>Email: example@example.com</p>
        <p>Телефон: +380 00 000 00 00</p>
    </address>

На сторінці компанії:

    <address>
        <strong>My Company</strong><br>
        Vinnytsia, Ukraine<br>
        <a href="mailto:info@example.com">
            info@example.com
        </a>
    </address>

`<address>` не означає просто будь-яку фізичну адресу.

Його семантика пов'язана саме з **контактною інформацією**.

---

# 13. `<figure>` та `<figcaption>`

`<figure>` використовується для самостійного контенту, який може мати підпис.

Наприклад:

    <figure>
        <img
            src="/images/html-structure.png"
            alt="Структура HTML документа"
        >

        <figcaption>
            Базова структура HTML документа
        </figcaption>
    </figure>

Можна використовувати не тільки для зображень.

Наприклад:

    <figure>
        <pre>
            <code>
                const message = "Hello";
            </code>
        </pre>

        <figcaption>
            Приклад JavaScript коду
        </figcaption>
    </figure>

---

# 14. `<time>`

`<time>` представляє дату або час.

    <p>
        Стаття опублікована
        <time datetime="2026-09-08">
            8 вересня 2026
        </time>
    </p>

Дата:

    <time datetime="2026-09-08">
        8 вересня 2026
    </time>

Дата і час:

    <time datetime="2026-09-08T14:30">
        8 вересня о 14:30
    </time>

Тривалість:

    <time datetime="PT30M">
        30 хвилин
    </time>

`datetime` дає машинно-читабельне значення.

---

# 15. `<mark>`

`<mark>` використовується для виділення контенту, який має особливе значення в поточному контексті.

    <p>
        Знайдено слово
        <mark>HTML</mark>
        у тексті.
    </p>

Особливо корисно для:

- search results;
- highlighting;
- relevant text.

Наприклад:

    <p>
        Результат пошуку:
        <mark>semantic HTML</mark>
    </p>

---

# 16. `<details>` та `<summary>`

Дозволяють створювати розгортаний контент без JavaScript.

    <details>
        <summary>Що таке HTML?</summary>

        <p>
            HTML — це мова розмітки гіпертексту.
        </p>
    </details>

Можна відкрити блок за замовчуванням:

    <details open>
        <summary>Додаткова інформація</summary>

        <p>
            Цей текст відкритий одразу.
        </p>
    </details>

Корисно для:

- FAQ;
- додаткової інформації;
- довідки;
- деталей продукту;
- навчальних матеріалів.

---

# 17. `<dialog>`

`<dialog>` представляє діалогове вікно.

    <dialog open>
        <h2>Вітаємо!</h2>

        <p>
            Це діалогове вікно.
        </p>

        <button>Закрити</button>
    </dialog>

У реальному застосунку dialog зазвичай керується JavaScript.

Наприклад:

    const dialog = document.querySelector("dialog");

    dialog.showModal();

Закриття:

    dialog.close();

---

# 18. `<search>`

`<search>` використовується для області пошуку або фільтрації.

Наприклад:

    <search>
        <form action="/search">
            <label for="search">
                Пошук
            </label>

            <input
                id="search"
                name="q"
                type="search"
            >

            <button type="submit">
                Знайти
            </button>
        </form>
    </search>

Це допомагає явно позначити функціональну область пошуку.

---

# 19. Семантична структура сторінки

Типовий layout:

    <body>

        <header>
            <a href="/">
                Logo
            </a>

            <nav>
                ...
            </nav>
        </header>

        <main>

            <section>
                <h1>Головний заголовок</h1>

                <p>Вступний текст...</p>
            </section>

            <section>
                <h2>Останні статті</h2>

                <article>
                    <h3>HTML</h3>
                    <p>...</p>
                </article>

                <article>
                    <h3>CSS</h3>
                    <p>...</p>
                </article>

            </section>

            <aside>
                <h2>Корисні посилання</h2>
                ...
            </aside>

        </main>

        <footer>
            ...
        </footer>

    </body>

Ментальна модель:

    PAGE
    │
    ├── HEADER
    │   └── NAV
    │
    ├── MAIN
    │   ├── SECTION
    │   │   └── ARTICLE
    │   │
    │   ├── SECTION
    │   │   └── ARTICLE
    │   │
    │   └── ASIDE
    │
    └── FOOTER

---

# 20. Вкладеність семантичних елементів

Семантичні елементи можуть вкладатися один в одного.

Наприклад:

    <main>

        <section>

            <header>
                <h1>Новини</h1>
            </header>

            <article>

                <header>
                    <h2>Нова стаття</h2>
                    <p>Автор: Valeriy</p>
                </header>

                <p>
                    Основний текст статті...
                </p>

                <footer>
                    <time datetime="2026-09-08">
                        8 вересня 2026
                    </time>
                </footer>

            </article>

        </section>

    </main>

Це нормальна семантична структура.

---

# 21. `<div>` vs semantic elements

## `<div>`

`<div>` — універсальний контейнер без власної семантики.

    <div class="card">
        ...
    </div>

Його використовують для:

- layout;
- CSS grouping;
- JavaScript hooks;
- компонентних контейнерів;
- випадків, коли немає відповідного semantic element.

## Semantic element

    <article class="card">
        ...
    </article>

Тут HTML уже повідомляє, що це незалежний контент.

## Правило

Не:

    <div class="header">
    <div class="nav">
    <div class="main">
    <div class="footer">

Якщо відповідна семантика існує.

Краще:

    <header>
    <nav>
    <main>
    <footer>

Але:

> Не потрібно намагатися замінити кожен `<div>` на semantic element.

---

# 22. Semantic HTML та Accessibility

Semantic HTML — один із фундаментів accessibility.

Наприклад:

    <button>
        Видалити
    </button>

краще, ніж:

    <div onclick="deleteItem()">
        Видалити
    </div>

Чому?

`<button>` уже має семантику кнопки.

Assistive technology знає:

- це interactive element;
- його можна активувати;
- це button;
- він бере участь у keyboard navigation.

Так само:

    <nav>
        ...
    </nav>

краще описує навігацію, ніж:

    <div class="navigation">
        ...
    </div>

---

# 23. Heading hierarchy

Заголовки створюють ієрархію документа.

    <h1>HTML</h1>

    <h2>Semantic HTML</h2>

    <h3>Article</h3>

    <h3>Section</h3>

    <h2>Accessibility</h2>

Не потрібно вибирати `<h1>`–`<h6>` тільки через їхній візуальний розмір.

Наприклад, якщо потрібно зробити маленький заголовок — не варто використовувати `<h6>` тільки через його розмір.

Розмір задається CSS:

    <h2 class="small-heading">
        Новини
    </h2>

---

# 24. Семантика навігації

Основна навігація:

    <nav aria-label="Головна навігація">
        <ul>
            <li>
                <a href="/">Головна</a>
            </li>

            <li>
                <a href="/blog">Блог</a>
            </li>

            <li>
                <a href="/contacts">Контакти</a>
            </li>
        </ul>
    </nav>

Якщо на сторінці декілька `<nav>`, їх можна розрізняти через `aria-label`.

    <nav aria-label="Основна навігація">
        ...
    </nav>

    <nav aria-label="Навігація статті">
        ...
    </nav>

---

# 25. Семантика статей і контенту

Приклад блогу:

    <main>

        <h1>Блог</h1>

        <article>

            <header>
                <h2>Що таке Semantic HTML?</h2>

                <p>
                    Автор:
                    <span>Valeriy</span>
                </p>
            </header>

            <p>
                Semantic HTML описує зміст документа.
            </p>

            <p>
                Це важливо для accessibility та SEO.
            </p>

            <footer>
                <p>
                    Категорія: HTML
                </p>
            </footer>

        </article>

    </main>

---

# 26. Семантика сайдбарів

Типовий sidebar:

    <aside>
        <h2>Популярні статті</h2>

        <ul>
            <li>
                <a href="/html">
                    HTML Basics
                </a>
            </li>

            <li>
                <a href="/css">
                    CSS Basics
                </a>
            </li>
        </ul>
    </aside>

У layout:

    <main>

        <section>
            <h1>Основний контент</h1>
            ...
        </section>

        <aside>
            <h2>Sidebar</h2>
            ...
        </aside>

    </main>

---

# 27. Семантика футера

Приклад:

    <footer>

        <nav aria-label="Footer navigation">
            <ul>
                <li>
                    <a href="/about">Про нас</a>
                </li>

                <li>
                    <a href="/privacy">Privacy</a>
                </li>

                <li>
                    <a href="/terms">Terms</a>
                </li>
            </ul>
        </nav>

        <address>
            <a href="mailto:info@example.com">
                info@example.com
            </a>
        </address>

        <p>
            © 2026 My Website
        </p>

    </footer>

---

# 28. Semantic HTML та SEO

Semantic HTML може допомогти пошуковим системам краще розуміти структуру документа.

Наприклад:

    <article>
        <h1>Як вивчити HTML</h1>

        <p>
            HTML є основою веб-розробки.
        </p>
    </article>

краще передає структуру контенту, ніж:

    <div class="article">
        <div class="title">
            Як вивчити HTML
        </div>

        <div>
            HTML є основою веб-розробки.
        </div>
    </div>

Але:

> Semantic HTML сам по собі не гарантує високих позицій у пошуку.

SEO включає значно більше:

- якісний контент;
- title;
- meta description;
- links;
- performance;
- accessibility;
- mobile usability;
- structured data;
- technical SEO.

---

# 29. Semantic HTML та CSS

HTML відповідає переважно на питання:

> Що це?

CSS:

> Як це виглядає?

Наприклад:

    <article class="card">
        <h2>HTML</h2>
        <p>Основи HTML.</p>
    </article>

CSS:

    .card {
        padding: 1rem;
        border: 1px solid #ccc;
    }

Не потрібно використовувати HTML-елемент через його стандартний зовнішній вигляд.

Наприклад:

Не:

    <h3>Мені потрібен великий текст</h3>

Краще:

    <p class="large-text">
        Великий текст
    </p>

    .large-text {
        font-size: 2rem;
    }

---

# 30. Semantic HTML та JavaScript

Semantic HTML також допомагає JavaScript працювати з DOM логічніше.

Наприклад:

    const articles = document.querySelectorAll("article");

    articles.forEach(article => {
        console.log(article);
    });

Або:

    const navigation = document.querySelector("nav");

Семантична структура робить DOM зрозумілішим.

---

# 31. ARIA та Semantic HTML

ARIA використовується для покращення accessibility там, де HTML-семантики недостатньо.

Але важливе правило:

> Спочатку використовуй нативний HTML, а потім ARIA.

Не:

    <div role="button">
        Зберегти
    </div>

Якщо можна:

    <button>
        Зберегти
    </button>

Не:

    <div role="navigation">
        ...
    </div>

Якщо можна:

    <nav>
        ...
    </nav>

ARIA не повинна замінювати правильний HTML без необхідності.

---

# 32. Типові помилки

## Помилка 1 — все робити через `<div>`

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

## Помилка 2 — використовувати `<section>` для будь-якого контейнера

Погано:

    <section class="card">
        <span>...</span>
    </section>

Якщо це просто стилізований контейнер, краще:

    <div class="card">
        <span>...</span>
    </div>

---

## Помилка 3 — використовувати `<article>` просто як card

Не кожна card є `<article>`.

Потрібно запитати:

> Чи має цей контент самостійний зміст?

Якщо так — `<article>` може бути доречним.

---

## Помилка 4 — багато `<main>`

Не потрібно:

    <main>
        ...
    </main>

    <main>
        ...
    </main>

Для звичайної сторінки використовується один основний `<main>`.

---

## Помилка 5 — неправильна ієрархія headings

Не варто вибирати heading за розміром.

Погано:

    <h1>Мій сайт</h1>

    <h4>Наші послуги</h4>

    <h2>Про нас</h2>

Краще будувати логічну структуру:

    <h1>Мій сайт</h1>

    <h2>Наші послуги</h2>

    <h2>Про нас</h2>

---

## Помилка 6 — використовувати `<nav>` для кожної групи посилань

`<nav>` — для значущих навігаційних блоків.

---

## Помилка 7 — використовувати `<b>` замість семантичного елемента

Якщо потрібне просто візуальне виділення:

    <b>важливий текст</b>

Якщо потрібен смисловий акцент:

    <strong>важливий текст</strong>

---

# 33. Поганий та хороший HTML

## Поганий варіант

    <div class="page">

        <div class="header">
            <div class="logo">
                My Site
            </div>

            <div class="navigation">
                <a href="/">Home</a>
                <a href="/about">About</a>
            </div>
        </div>

        <div class="content">

            <div class="title">
                My Blog
            </div>

            <div class="post">
                <div class="post-title">
                    HTML
                </div>

                <div class="text">
                    HTML is a markup language.
                </div>
            </div>

        </div>

        <div class="footer">
            Copyright
        </div>

    </div>

## Семантичний варіант

    <body>

        <header>

            <a href="/">
                My Site
            </a>

            <nav>
                <a href="/">Home</a>
                <a href="/about">About</a>
            </nav>

        </header>

        <main>

            <h1>My Blog</h1>

            <article>

                <h2>HTML</h2>

                <p>
                    HTML is a markup language.
                </p>

            </article>

        </main>

        <footer>
            <p>Copyright</p>
        </footer>

    </body>

---

# 34. Практичні завдання

## Завдання 1 — Простий сайт

Створи:

- `<header>`;
- `<nav>`;
- `<main>`;
- `<footer>`.

Структура:

    <header>
        ...
    </header>

    <main>
        ...
    </main>

    <footer>
        ...
    </footer>

---

## Завдання 2 — Blog

Створи сторінку блогу:

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

- heading;
- текст;
- дату;
- автора.

---

## Завдання 3 — Article

Створи повноцінну статтю:

    <article>

        <header>
            ...
        </header>

        <section>
            ...
        </section>

        <section>
            ...
        </section>

        <footer>
            ...
        </footer>

    </article>

---

## Завдання 4 — Sidebar

Створи:

    <main>

        <article>
            ...
        </article>

        <aside>
            ...
        </aside>

    </main>

---

## Завдання 5 — Semantic landing page

Створи landing page:

    <header>
        Navigation
    </header>

    <main>

        <section>
            Hero
        </section>

        <section>
            Features
        </section>

        <section>
            Testimonials
        </section>

        <section>
            Pricing
        </section>

    </main>

    <footer>
        Footer
    </footer>

---

## Завдання 6 — Перетворення

Візьми HTML, побудований переважно з `<div>`, і перероби його на Semantic HTML.

Було:

    <div class="header">...</div>
    <div class="nav">...</div>
    <div class="main">...</div>
    <div class="article">...</div>
    <div class="sidebar">...</div>
    <div class="footer">...</div>

Має стати приблизно:

    <header>...</header>
    <nav>...</nav>
    <main>...</main>
    <article>...</article>
    <aside>...</aside>
    <footer>...</footer>

---

# 35. Checklist

Перед завершенням HTML-сторінки перевір:

### Structure

- [ ] Є `<header>`, якщо він потрібен.
- [ ] Навігація знаходиться в `<nav>`.
- [ ] Основний контент знаходиться в `<main>`.
- [ ] Тематичні частини представлені `<section>`.
- [ ] Незалежний контент представлений `<article>`.
- [ ] Додатковий контент представлений `<aside>`.
- [ ] Нижня частина сторінки представлена `<footer>`.

### Headings

- [ ] Є логічний `<h1>`.
- [ ] Заголовки мають правильну ієрархію.
- [ ] Heading не використовується лише через його розмір.

### Navigation

- [ ] Навігація використовує `<nav>`.
- [ ] Посилання використовують `<a>`.
- [ ] Кнопки використовують `<button>`.

### Content

- [ ] Дати можуть використовувати `<time>`.
- [ ] Зображення можуть використовувати `<figure>`.
- [ ] Підписи використовують `<figcaption>`.
- [ ] Контактна інформація може використовувати `<address>`.

### Accessibility

- [ ] Використовується native HTML.
- [ ] ARIA не використовується без необхідності.
- [ ] Interactive elements є справжніми `<button>`, `<a>`, `<input>` тощо.

### Code quality

- [ ] Немає зайвих `<div>`.
- [ ] Семантика зрозуміла без CSS.
- [ ] HTML описує зміст, а CSS — зовнішній вигляд.

---

# 36. Рівні знань

## 🟢 Core

Потрібно знати:

- що таке Semantic HTML;
- `<header>`;
- `<nav>`;
- `<main>`;
- `<section>`;
- `<article>`;
- `<aside>`;
- `<footer>`;
- `<div>`;
- `<span>`;
- heading hierarchy.

---

## 🟡 Junior

Потрібно розуміти:

- різницю `<section>` та `<article>`;
- коли використовувати `<div>`;
- правильну структуру сторінки;
- accessibility benefits;
- `<figure>` / `<figcaption>`;
- `<time>`;
- `<address>`;
- semantic navigation;
- basic ARIA principles.

---

## 🟠 Middle

Потрібно розуміти:

- складну семантичну структуру;
- nested semantic sections;
- accessibility;
- ARIA;
- screen reader navigation;
- semantic DOM;
- SEO implications;
- component architecture;
- reusable semantic structures.

---

## 🔴 Senior

Потрібно вміти:

- проектувати семантичну HTML-архітектуру великих застосунків;
- враховувати accessibility;
- будувати логічну document outline;
- правильно використовувати ARIA;
- аналізувати accessibility;
- створювати semantic component systems;
- балансувати semantic HTML, CSS architecture та JavaScript;
- уникати semantic overengineering.

---

# 37. Питання для співбесіди

### 1. Що таке Semantic HTML?

HTML, у якому елементи використовуються відповідно до їхнього змісту та призначення.

---

### 2. Чому Semantic HTML важливий?

Основні причини:

- accessibility;
- SEO;
- readability;
- maintainability;
- зрозуміла структура DOM.

---

### 3. Чим `<section>` відрізняється від `<div>`?

`<section>` має семантичне значення — тематична секція.

`<div>` — універсальний контейнер без власної семантики.

---

### 4. Чим `<article>` відрізняється від `<section>`?

`<article>` призначений для самостійного, незалежного контенту.

`<section>` — для тематичного розділу документа.

---

### 5. Для чого потрібен `<aside>`?

Для додаткового або побічного контенту.

---

### 6. Скільки `<main>` повинно бути на сторінці?

У типовому документі — один основний `<main>`.

---

### 7. Чи можна мати декілька `<header>`?

Так.

Наприклад, header може бути у сторінки та окремо у кожної статті.

---

### 8. Чи можна мати декілька `<footer>`?

Так.

Footer може належати як усій сторінці, так і окремому `<article>` або іншій секції.

---

### 9. Чи є `<div>` поганим HTML?

Ні.

`<div>` потрібен як універсальний контейнер, коли немає відповідного семантичного елемента.

---

### 10. Чому `<button>` кращий за `<div onclick>`?

Тому що `<button>` має вбудовану семантику, keyboard behavior та accessibility support.

---

### 11. Чи потрібно використовувати ARIA всюди?

Ні.

Спочатку потрібно використовувати правильні native HTML elements.

---

### 12. Чи покращує Semantic HTML SEO?

Може допомагати пошуковим системам краще розуміти структуру та зміст сторінки, але саме по собі не гарантує високих позицій.

---

# 38. Mini Cheat Sheet

| Елемент | Що означає |
|---|---|
| `<header>` | вступна частина |
| `<nav>` | навігація |
| `<main>` | основний контент |
| `<section>` | тематична секція |
| `<article>` | незалежний контент |
| `<aside>` | додатковий контент |
| `<footer>` | заключна частина |
| `<address>` | контактна інформація |
| `<figure>` | самостійний медіа-контент |
| `<figcaption>` | підпис |
| `<time>` | дата/час |
| `<mark>` | релевантне виділення |
| `<details>` | розгортаний блок |
| `<summary>` | заголовок details |
| `<dialog>` | діалогове вікно |
| `<search>` | область пошуку |
| `<div>` | універсальний контейнер |
| `<span>` | inline-контейнер |

---

# 39. Ментальна модель

Запам'ятай Semantic HTML через питання:

    ЩО ЦЕ?

        Header?
            → <header>

        Navigation?
            → <nav>

        Main content?
            → <main>

        Thematic section?
            → <section>

        Independent content?
            → <article>

        Additional content?
            → <aside>

        Footer?
            → <footer>

        Contact information?
            → <address>

        Figure/media?
            → <figure>

        Date/time?
            → <time>

        Expandable information?
            → <details>

        Search area?
            → <search>

        Немає відповідного semantic element?
            → <div> / <span>

Головна ідея:

    HTML = WHAT

    CSS = HOW IT LOOKS

    JavaScript = HOW IT BEHAVES

---

# 40. Головне, що потрібно запам'ятати

## 1. Semantic HTML описує зміст

    <article>
        ...
    </article>

говорить:

> це незалежний контент.

---

## 2. Не використовуй `<div>` автоматично

Спочатку запитай:

> Чи існує semantic element для цього контенту?

Якщо так — використовуй його.

Якщо ні — `<div>` цілком нормальний.

---

## 3. `<main>` — основний контент

    <main>
        ...
    </main>

---

## 4. `<nav>` — навігація

    <nav>
        ...
    </nav>

---

## 5. `<section>` — тематична секція

    <section>
        <h2>Services</h2>
        ...
    </section>

---

## 6. `<article>` — незалежний контент

    <article>
        <h2>Blog post</h2>
        ...
    </article>

---

## 7. `<aside>` — додатковий контент

    <aside>
        Related content
    </aside>

---

## 8. `<header>` та `<footer>` можуть бути локальними

Вони можуть належати не тільки всій сторінці, а й окремому `<article>` або `<section>`.

---

## 9. Semantic HTML важливий для accessibility

Нативний HTML часто вже містить необхідну семантику.

    <button>Save</button>

краще за:

    <div role="button">Save</div>

---

## 10. ARIA не замінює правильний HTML

Спочатку:

    <button>
        Save
    </button>

а не:

    <div role="button">
        Save
    </div>

---

## 11. HTML не повинен визначати дизайн

Не використовуй `<h1>`, `<h2>` тощо лише для того, щоб отримати потрібний розмір тексту.

Структуру визначає HTML.

Візуальний вигляд визначає CSS.

---

## 12. Хороший Semantic HTML можна читати як структуру документа

Наприклад:

    <body>

        <header>
            Site header
        </header>

        <main>

            <section>
                <h1>Blog</h1>

                <article>
                    <h2>HTML</h2>
                    <p>...</p>
                </article>

                <article>
                    <h2>CSS</h2>
                    <p>...</p>
                </article>
            </section>

            <aside>
                Related content
            </aside>

        </main>

        <footer>
            Site footer
        </footer>

    </body>

І це вже майже **карта документа**.

> **Semantic HTML = структура + зміст + доступність.**
