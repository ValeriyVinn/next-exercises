# 05. Accessibility Basics

## Зміст

1. [Що таке Accessibility](#що-таке-accessibility)
2. [Чому Accessibility важлива](#чому-accessibility-важлива)
3. [Основна мета Accessibility](#основна-мета-accessibility)
4. [WCAG та рівні Accessibility](#wcag-та-рівні-accessibility)
5. [Чотири принципи WCAG](#чотири-принципи-wcag)
6. [Perceivable](#perceivable)
7. [Operable](#operable)
8. [Understandable](#understandable)
9. [Robust](#robust)
10. [Semantic HTML](#semantic-html)
11. [HTML semantics vs `<div>`](#html-semantics-vs-div)
12. [Headings](#headings)
13. [Правильна структура headings](#правильна-структура-headings)
14. [Landmarks](#landmarks)
15. [`header`](#header)
16. [`nav`](#nav)
17. [`main`](#main)
18. [`section`](#section)
19. [`article`](#article)
20. [`aside`](#aside)
21. [`footer`](#footer)
22. [Links](#links)
23. [Buttons](#buttons)
24. [Images](#images)
25. [`alt`](#alt)
26. [Decorative images](#decorative-images)
27. [Informative images](#informative-images)
28. [Forms та Accessibility](#forms-та-accessibility)
29. [Labels](#labels)
30. [Placeholder та label](#placeholder-та-label)
31. [Accessible form controls](#accessible-form-controls)
32. [Keyboard Accessibility](#keyboard-accessibility)
33. [Focus](#focus)
34. [Visible focus](#visible-focus)
35. [Tab order](#tab-order)
36. [Skip links](#skip-links)
37. [Color Accessibility](#color-accessibility)
38. [Color contrast](#color-contrast)
39. [Не використовуй тільки колір](#не-використовуй-тільки-колір)
40. [Text Accessibility](#text-accessibility)
41. [Font size](#font-size)
42. [Line height](#line-height)
43. [Responsive Accessibility](#responsive-accessibility)
44. [Zoom](#zoom)
45. [Touch targets](#touch-targets)
46. [Motion та Animation](#motion-та-animation)
47. [`prefers-reduced-motion`](#prefers-reduced-motion)
48. [Language of the document](#language-of-the-document)
49. [`lang`](#lang)
50. [Page title](#page-title)
51. [Accessible link text](#accessible-link-text)
52. [Accessible tables](#accessible-tables)
53. [Native HTML](#native-html)
54. [ARIA](#aria)
55. [Коли використовувати ARIA](#коли-використовувати-aria)
56. [Коли не потрібно використовувати ARIA](#коли-не-потрібно-використовувати-aria)
57. [`aria-label`](#aria-label)
58. [`aria-labelledby`](#aria-labelledby)
59. [`aria-describedby`](#aria-describedby)
60. [`aria-hidden`](#aria-hidden)
61. [`role`](#role)
62. [Screen readers](#screen-readers)
63. [Accessibility Tree](#accessibility-tree)
64. [Hidden content](#hidden-content)
65. [`display: none`](#display-none)
66. [`visibility: hidden`](#visibility-hidden)
67. [`hidden`](#hidden)
68. [Visually hidden content](#visually-hidden-content)
69. [Disabled vs aria-disabled](#disabled-vs-aria-disabled)
70. [Error messages](#error-messages)
71. [Dynamic content](#dynamic-content)
72. [Accessibility та JavaScript](#accessibility-та-javascript)
73. [Progressive Enhancement](#progressive-enhancement)
74. [Common Accessibility mistakes](#common-accessibility-mistakes)
75. [Практичний приклад accessible page](#практичний-приклад-accessible-page)
76. [Практичний приклад accessible navigation](#практичний-приклад-accessible-navigation)
77. [Практичний приклад accessible form](#практичний-приклад-accessible-form)
78. [Accessibility checklist](#accessibility-checklist)
79. [Що потрібно пам'ятати](#що-потрібно-памятати)
80. [Питання для співбесіди](#питання-для-співбесіди)
81. [Рівні знань](#рівні-знань)
82. [Міні-шпаргалка](#міні-шпаргалка)
83. [Головне](#головне)


# Що таке Accessibility

**Accessibility (a11y)** — це створення сайтів і web applications, якими можуть користуватися люди з різними можливостями, способами взаємодії та обмеженнями.

Позначення:

    Accessibility
        ↓
    a + 11 letters + y
        ↓
    a11y


Accessibility стосується не тільки людей із permanent disabilities.

Вона також допомагає користувачам, які:

- використовують keyboard;
- використовують screen reader;
- мають проблеми із зором;
- мають проблеми зі слухом;
- мають motor impairments;
- мають cognitive difficulties;
- використовують mobile devices;
- працюють у яскравому сонячному світлі;
- мають тимчасову травму;
- використовують повільне або нестабільне з'єднання;
- не можуть використовувати mouse.


# Чому Accessibility важлива

Accessibility — це не "додаткова функція".

Вона є частиною якісного web development.

Наприклад, якщо кнопка працює тільки через mouse:

    mouse
      ↓
    click
      ↓
    action

але не працює через keyboard:

    Tab
      ↓
    Enter
      ↓
    action

то частина користувачів не може нормально користуватися сайтом.


## Accessibility покращує UX для всіх

Багато accessibility practices корисні не тільки людям з disabilities.

Наприклад:

    semantic HTML

допомагає:

- screen readers;
- SEO;
- browser behavior;
- developers;
- maintainability.


А:

    clear labels

допомагають:

- keyboard users;
- mobile users;
- screen reader users;
- усім, хто заповнює форми.


# Основна мета Accessibility

Мета accessibility:

> Зробити інформацію та interaction доступними для максимально широкого кола користувачів.

При цьому потрібно враховувати:

    Content
    +
    Structure
    +
    Interaction
    +
    Visual design
    +
    Keyboard
    +
    Assistive technologies


# WCAG та рівні Accessibility

**WCAG** — Web Content Accessibility Guidelines.

Це міжнародний набір рекомендацій щодо accessibility web content.

Основні рівні відповідності:

    A
    AA
    AAA


У практичній web development роботі найчастіше орієнтуються на:

    WCAG Level AA


Важливо розуміти:

> Accessibility — це не тільки ARIA.

Вона охоплює:

- HTML;
- CSS;
- JavaScript;
- keyboard interaction;
- forms;
- images;
- color;
- typography;
- media;
- navigation;
- dynamic content.


# Чотири принципи WCAG

WCAG будується навколо чотирьох основних принципів:

    P
    O
    U
    R


## POUR

    P — Perceivable
    O — Operable
    U — Understandable
    R — Robust


Тобто контент повинен бути:

    Perceivable
        ↓
    Operable
        ↓
    Understandable
        ↓
    Robust


# Perceivable

**Perceivable** означає:

> Користувач повинен мати можливість сприйняти інформацію.

Приклади:

- text alternatives для images;
- captions для video;
- достатній color contrast;
- readable text;
- доступний content structure.


Наприклад:

    <img
        src="doctor.jpg"
        alt="Лікар проводить консультацію"
    >


Користувач screen reader може отримати інформацію про image.


# Operable

**Operable** означає:

> Користувач повинен мати можливість взаємодіяти з interface.

Наприклад:

- keyboard navigation;
- visible focus;
- достатній час для interaction;
- відсутність небезпечної interaction;
- accessible navigation.


Приклад:

    Tab
      ↓
    Button
      ↓
    Enter


# Understandable

**Understandable** означає:

> Контент та interface повинні бути зрозумілими та передбачуваними.

Наприклад:

- зрозумілі labels;
- логічна navigation;
- передбачувана поведінка;
- зрозумілі error messages;
- consistency.


Погано:

    Submit
    Submit
    Submit


Краще:

    Create account

    Save changes

    Delete account


# Robust

**Robust** означає:

> Контент повинен бути сумісним із різними browsers та assistive technologies.

Особливо важливі:

- valid HTML;
- semantic HTML;
- correct ARIA;
- predictable DOM;
- compatibility with screen readers.


# Semantic HTML

**Semantic HTML** — використання HTML elements відповідно до їх призначення.

Наприклад:

    <nav>
        ...
    </nav>

замість:

    <div class="navigation">
        ...
    </div>


А:

    <button>
        Save
    </button>

замість:

    <div class="button">
        Save
    </div>


Semantic HTML дає browser більше інформації про структуру документа.


# HTML semantics vs `<div>`

`<div>` — generic container.

Наприклад:

    <div>
        Content
    </div>


А semantic element описує призначення:

    <header>
        ...
    </header>

    <nav>
        ...
    </nav>

    <main>
        ...
    </main>

    <article>
        ...
    </article>

    <footer>
        ...
    </footer>


Правило:

> Якщо існує відповідний semantic element — краще використовувати його.


# Headings

HTML має headings:

    <h1>
    <h2>
    <h3>
    <h4>
    <h5>
    <h6>


Вони створюють структуру документа.

Наприклад:

    <h1>Web Development</h1>

    <h2>HTML</h2>

    <h3>Forms</h3>

    <h3>Accessibility</h3>

    <h2>CSS</h2>

    <h3>Layout</h3>


Структура:

    h1
    ├── h2
    │   ├── h3
    │   └── h3
    └── h2
        └── h3


# Правильна структура headings

Heading hierarchy повинна бути логічною.

Погано:

    <h1>Products</h1>

    <h4>Phones</h4>


Краще:

    <h1>Products</h1>

    <h2>Phones</h2>


Не потрібно вибирати `<h3>` тільки тому, що він "виглядає меншим".

Візуальний розмір задається CSS:

    h2 {
        font-size: 1.5rem;
    }


А HTML heading визначає структуру.


# Landmarks

**Landmark** — semantic region сторінки, яка допомагає assistive technologies орієнтуватися в документі.

Основні landmarks:

    header
    nav
    main
    aside
    footer


Наприклад:

    <header>
        Site header
    </header>

    <nav>
        Main navigation
    </nav>

    <main>
        Main content
    </main>

    <aside>
        Related content
    </aside>

    <footer>
        Footer
    </footer>


# header

`<header>` містить introductory content для сторінки або section.

Наприклад:

    <header>
        <h1>My Blog</h1>

        <p>
            Web development articles
        </p>
    </header>


Header може бути:

- сторінки;
- article;
- section.


# nav

`<nav>` містить navigation links.

Наприклад:

    <nav aria-label="Main navigation">

        <a href="/">
            Home
        </a>

        <a href="/about">
            About
        </a>

        <a href="/contact">
            Contact
        </a>

    </nav>


Якщо на сторінці декілька navigation regions, їм може знадобитися різне accessible naming.


# main

`<main>` містить основний content сторінки.

Наприклад:

    <main>
        <h1>Products</h1>

        <p>
            Our products...
        </p>
    </main>


Зазвичай документ має один основний `<main>`.


# section

`<section>` представляє тематичну section документа.

Наприклад:

    <section>

        <h2>Our services</h2>

        <p>
            ...
        </p>

    </section>


Section зазвичай повинна мати heading, якщо вона представляє окрему тематичну частину документа.


# article

`<article>` представляє самостійний content.

Наприклад:

    <article>

        <h2>How CSS Grid works</h2>

        <p>
            ...
        </p>

    </article>


Приклади:

- blog post;
- news article;
- forum post;
- product review;
- comment.


# aside

`<aside>` містить додатковий content, пов'язаний із основним.

Наприклад:

    <aside>

        <h2>Related articles</h2>

        <ul>
            ...
        </ul>

    </aside>


# footer

`<footer>` містить footer information.

Наприклад:

    <footer>

        <p>
            © 2026 My Website
        </p>

        <nav aria-label="Footer navigation">
            ...
        </nav>

    </footer>


# Links

Для navigation потрібно використовувати:

    <a href="/about">
        About
    </a>


Link повинен:

- бути keyboard accessible;
- мати зрозумілий accessible name;
- вести до ресурсу або location.


# Buttons

Для action потрібно використовувати:

    <button type="button">
        Save
    </button>


Button призначений для:

- відкриття modal;
- submit;
- toggle;
- action;
- menu;
- interaction.


Link і button — не одне й те саме.

    <a href="/profile">
        Profile
    </a>

означає navigation.


А:

    <button type="button">
        Open profile
    </button>

означає action.


# Images

Images можуть бути:

    informative

    decorative

    functional

    complex


Для accessibility потрібно визначити:

> Яку інформацію користувач повинен отримати від цього image?


# alt

Для informative image:

    <img
        src="doctor.jpg"
        alt="Лікар проводить консультацію"
    >


`alt` — text alternative.


Screen reader може озвучити:

    Лікар проводить консультацію


# Decorative images

Якщо image не передає змістовної інформації:

    <img
        src="decorative-line.svg"
        alt=""
    >


Порожній `alt` означає:

> Image є декоративним і не потребує текстового опису.


Не потрібно писати:

    alt="decorative image"


або:

    alt="image"


якщо це не допомагає користувачу.


# Informative images

Якщо image передає важливу інформацію:

    <img
        src="chart.png"
        alt="Продажі зросли на 25% у 2026 році"
    >


Не потрібно описувати все, що видно на image.

Потрібно передати:

> інформацію, яку користувачеві потрібно знати.


# Functional images

Якщо image знаходиться всередині link/button і виконує функцію, accessible name повинен описувати дію.

Наприклад:

    <a href="/search">

        <img
            src="search.svg"
            alt="Search"
        >

    </a>


Але часто краще:

    <button
        type="button"
        aria-label="Search"
    >
        ...
    </button>


# Forms та Accessibility

Forms — одна з найважливіших областей accessibility.

Потрібно забезпечити:

- label;
- зрозумілий control;
- keyboard access;
- focus;
- validation;
- error messages;
- instructions;
- accessible name;
- accessible description.


# Labels

Правильний form control повинен мати label.

Наприклад:

    <label for="email">
        Email
    </label>

    <input
        id="email"
        name="email"
        type="email"
    >


Зв'язок:

    label[for]
        ↓
    input[id]


# Alternative label pattern

Можна вкладати input у label:

    <label>
        Email

        <input
            name="email"
            type="email"
        >

    </label>


Обидва підходи валідні.


# Placeholder та label

Погано:

    <input
        type="email"
        placeholder="Email"
    >


Placeholder не повинен бути єдиним способом позначити поле.

Краще:

    <label for="email">
        Email
    </label>

    <input
        id="email"
        name="email"
        type="email"
        placeholder="you@example.com"
    >


Різниця:

    label

→ що це за поле.


    placeholder

→ приклад або додаткова підказка.


# Accessible form controls

Приклад:

    <div class="field">

        <label for="password">
            Password
        </label>

        <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
        >

    </div>


Тут є:

- label;
- id;
- name;
- type;
- autocomplete;
- required.


# Keyboard Accessibility

Сайт повинен бути доступним через keyboard.

Основні клавіші:

    Tab
    Shift + Tab
    Enter
    Space
    Escape
    Arrow keys


Для звичайних native controls browser уже реалізує більшу частину behavior.


# Focus

Коли користувач натискає:

    Tab


focus переходить до наступного focusable element.


Наприклад:

    Link
      ↓
    Input
      ↓
    Button
      ↓
    Select


Focus повинен бути:

- видимим;
- логічним;
- передбачуваним.


# Visible focus

Погано:

    *:focus {
        outline: none;
    }


Краще:

    :focus-visible {
        outline: 3px solid blue;
        outline-offset: 3px;
    }


Правило:

> Не прибирай focus indicator без якісної заміни.


# Tab order

Tab order повинен відповідати логіці документа.

Наприклад:

    Name
      ↓
    Email
      ↓
    Password
      ↓
    Submit


Не потрібно штучно створювати порядок через:

    tabindex="1"
    tabindex="2"
    tabindex="3"


Краще:

- правильний DOM order;
- native elements;
- `tabindex="0"` або `-1`, коли це справді потрібно.


# Skip links

Skip link дозволяє keyboard user пропустити повторювану navigation.

HTML:

    <a
        class="skip-link"
        href="#main"
    >
        Skip to main content
    </a>


    <main id="main">
        ...
    </main>


CSS:

    .skip-link {
        position: absolute;
        left: 0;
        top: -100px;
    }

    .skip-link:focus {
        top: 0;
    }


Це особливо корисно на сторінках із великою header/navigation.


# Color Accessibility

Колір — важливий, але не повинен бути єдиним способом передачі інформації.


# Color contrast

Text повинен мати достатній контраст із background.

Погано:

    світло-сірий текст
    +
    білий background


Користувачу може бути важко прочитати текст.


Краще:

    dark text
    +
    light background


Контраст особливо важливий для:

- body text;
- buttons;
- form controls;
- focus indicators;
- error messages.


# Не використовуй тільки колір

Погано:

    поле стало червоним

і більше ніякої інформації.

Користувач може не розрізняти кольори.


Краще:

    Email
    [invalid email]

    Please enter a valid email address.


Тобто:

    color
      +
    text
      +
    structure


# Text Accessibility

Текст повинен бути:

- readable;
- достатнього розміру;
- достатнього контрасту;
- добре структурований;
- responsive.


Використовуй:

    h1
    h2
    h3

для structure.


А не:

    <div class="big-text">
        Heading
    </div>


# Font size

Не потрібно робити основний текст надто маленьким.

Наприклад:

    body {
        font-size: 1rem;
    }


Краще використовувати relative units:

    rem
    em
    %


ніж будувати весь typography тільки на жорстких:

    px


# Line height

Для читабельності:

    body {
        line-height: 1.5;
    }


Занадто маленький line-height:

    line-height: 1;


може зробити великі текстові блоки складними для читання.


# Responsive Accessibility

Accessibility повинна працювати на:

    Desktop
    Tablet
    Mobile


Не можна робити:

    accessibility only for desktop


Потрібно враховувати:

- responsive layout;
- touch;
- zoom;
- text resizing;
- keyboard;
- screen readers.


# Zoom

Користувач повинен мати можливість збільшувати content.

Не потрібно штучно блокувати browser zoom.

Погана практика:

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    >


Не створюй обмеження, які без необхідності забороняють користувачеві збільшувати сторінку.


# Touch targets

Interactive controls на touch devices повинні бути достатньо великими та мати достатню відстань між собою.

Погано:

    tiny button
        +
    tiny button
        +
    tiny button


Користувачеві легко натиснути не той control.


Краще:

    достатній target
        +
    достатній spacing


Це особливо важливо для:

- buttons;
- links;
- menu items;
- form controls.


# Motion та Animation

Animation може створювати проблеми для деяких користувачів.

Наприклад:

- flashing;
- parallax;
- constant movement;
- large transitions;
- autoplay animations.


Тому бажано поважати user preference щодо reduced motion.


# prefers-reduced-motion

CSS media query:

    @media (prefers-reduced-motion: reduce) {

        * {
            animation-duration: 0.01ms;
            animation-iteration-count: 1;
            transition-duration: 0.01ms;
        }

    }


Це дозволяє зменшити motion для користувачів, які налаштували відповідну системну preference.


## Краще

Не обов'язково повністю вимикати все.

Можна:

    complex animation
        ↓
    simple transition


або:

    moving element
        ↓
    opacity change


# Language of the document

Browser та assistive technologies повинні знати мову документа.


# lang

Правильно:

    <html lang="uk">


Для англійської:

    <html lang="en">


Для українського документа:

    <!DOCTYPE html>
    <html lang="uk">
    <head>
        <meta charset="UTF-8">
        <title>Accessibility</title>
    </head>
    <body>
        ...
    </body>
    </html>


`lang` допомагає:

- screen reader;
- pronunciation;
- text processing;
- translation tools;
- browser.


# Page title

Кожна сторінка повинна мати meaningful `<title>`.

Наприклад:

    <title>
        HTML Accessibility Basics
    </title>


Погано:

    <title>
        Page
    </title>


Краще:

    <title>
        Contact Us | My Website
    </title>


Title допомагає користувачу зрозуміти, де він знаходиться.


# Accessible link text

Погано:

    <a href="/article">
        Click here
    </a>


Ще гірше, якщо на сторінці багато:

    Click here
    Click here
    Click here


Краще:

    <a href="/article">
        Read the accessibility guide
    </a>


Link text повинен мати сенс навіть у контексті списку links.


# Accessible tables

Для tabular data використовуй:

    <table>


Наприклад:

    <table>

        <caption>
            Course grades
        </caption>

        <thead>
            <tr>
                <th scope="col">
                    Student
                </th>

                <th scope="col">
                    Grade
                </th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <th scope="row">
                    Anna
                </th>

                <td>
                    95
                </td>
            </tr>
        </tbody>

    </table>


Основні елементи:

    table
    caption
    thead
    tbody
    tr
    th
    td


Для header cells корисний:

    scope="col"

або:

    scope="row"


# Native HTML

Одна з найсильніших accessibility strategies:

> Use native HTML first.


Наприклад:

Button:

    <button>
        Save
    </button>


Link:

    <a href="/about">
        About
    </a>


Checkbox:

    <input
        type="checkbox"
        id="terms"
    >

    <label for="terms">
        Accept terms
    </label>


Select:

    <select>
        <option>
            Ukraine
        </option>
    </select>


Browser вже знає semantics цих elements.


# ARIA

**ARIA** — Accessible Rich Internet Applications.

ARIA додає accessibility semantics до UI.

Наприклад:

    aria-label

    aria-labelledby

    aria-describedby

    aria-expanded

    aria-hidden

    aria-selected

    aria-disabled

    role


Але:

> ARIA не повинна використовуватися замість правильного HTML.


# Коли використовувати ARIA

ARIA корисна, коли потрібно описати:

- custom widgets;
- dynamic state;
- relationships;
- labels;
- expanded/collapsed state;
- selected state;
- live regions.


Наприклад:

    <button
        type="button"
        aria-expanded="false"
    >
        Menu
    </button>


# Коли не потрібно використовувати ARIA

Не потрібно робити:

    <div
        role="button"
        tabindex="0"
    >
        Save
    </div>


якщо можна просто:

    <button type="button">
        Save
    </button>


Native element зазвичай кращий.


# aria-label

`aria-label` задає accessible name без видимого text content.

Наприклад:

    <button
        type="button"
        aria-label="Close"
    >
        ×
    </button>


Screen reader отримає:

    Close


Це корисно для icon-only controls.


# aria-labelledby

`aria-labelledby` посилається на існуючий element, який надає accessible name.

Наприклад:

    <section
        aria-labelledby="contact-title"
    >

        <h2 id="contact-title">
            Contact us
        </h2>

        ...

    </section>


Accessible name section пов'язаний із:

    #contact-title


Це часто краще, ніж дублювати текст у `aria-label`.


# aria-describedby

`aria-describedby` використовується для додаткового опису.

Наприклад:

    <label for="password">
        Password
    </label>

    <input
        id="password"
        type="password"
        aria-describedby="password-help"
    >

    <p id="password-help">
        Minimum 8 characters.
    </p>


Тут:

    label

→ name.


    password-help

→ additional description.


# aria-hidden

`aria-hidden="true"` прибирає element із accessibility tree.

Наприклад:

    <span aria-hidden="true">
        ★
    </span>


Це може бути корисно для decorative content.


Але важливо:

> Не ховай через `aria-hidden="true"` interactive content, який повинен бути доступний користувачу.


# role

`role` визначає accessibility role.

Наприклад:

    <div role="alert">
        Something went wrong.
    </div>


Але якщо існує native element, краще використати його.

Наприклад, замість:

    <div role="button">
        Save
    </div>


краще:

    <button type="button">
        Save
    </button>


# Screen readers

**Screen reader** — assistive technology, яка перетворює інформацію interface на speech або інший формат.

Приклади:

- NVDA;
- JAWS;
- VoiceOver;
- TalkBack.


Screen reader працює не просто з "тим, що видно".

Він використовує:

    Accessibility Tree


# Accessibility Tree

Browser будує accessibility representation сторінки.

У спрощеному вигляді:

    HTML DOM
        ↓
    Browser
        ↓
    Accessibility Tree
        ↓
    Screen Reader


Наприклад:

    <button>
        Save
    </button>


може бути представлений приблизно як:

    Role: button
    Name: Save


Це одна з причин, чому semantics важливі.


# Hidden content

Є різні способи приховати content.

Наприклад:

    display: none;

    visibility: hidden;

    hidden

    aria-hidden="true"


Вони не є повністю взаємозамінними.


# display: none

Наприклад:

    .modal {
        display: none;
    }


Елемент:

- не займає layout space;
- зазвичай не доступний у accessibility tree.


Коли:

    display: block;


елемент стає видимим.


# visibility: hidden

Наприклад:

    .element {
        visibility: hidden;
    }


Елемент зазвичай:

- не видно;
- зберігає layout space.


Це відрізняється від:

    display: none;


# hidden

HTML:

    <div hidden>
        Hidden content
    </div>


Browser розглядає element як hidden.

Наприклад:

    <div id="menu" hidden>
        ...
    </div>


JavaScript:

    menu.hidden = false;


може показати його.


# Visually hidden content

Іноді потрібно, щоб text був доступний screen reader, але не був візуально видимим.

Наприклад:

    .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }


Наприклад:

    <button type="button">

        <svg aria-hidden="true">
            ...
        </svg>

        <span class="visually-hidden">
            Search
        </span>

    </button>


Це дозволяє мати icon-only UI з доступним текстом.


# Disabled vs aria-disabled

Native disabled:

    <button
        type="button"
        disabled
    >
        Save
    </button>


має native disabled semantics.


`aria-disabled`:

    <div
        role="button"
        aria-disabled="true"
        tabindex="0"
    >
        Save
    </div>


лише описує state для accessibility.

Якщо custom control має `aria-disabled`, JavaScript також повинен не дозволяти дію.


# Error messages

Accessibility form validation повинна пояснювати:

    Що сталося?
    +
    Як виправити?


Погано:

    Invalid


Краще:

    Email address is invalid.
    Enter an address such as name@example.com.


Можна пов'язати error message з input:

    <label for="email">
        Email
    </label>

    <input
        id="email"
        type="email"
        aria-describedby="email-error"
        aria-invalid="true"
    >

    <p id="email-error">
        Enter a valid email address.
    </p>


Тут:

    aria-invalid="true"

показує invalid state.


    aria-describedby

зв'язує control з поясненням.


# Dynamic content

Сучасні applications часто змінюють content без повного reload.

Наприклад:

    User clicks Save
        ↓
    AJAX request
        ↓
    Success message appears


Screen reader user повинен отримати інформацію про важливу зміну.

Для таких сценаріїв існують:

    aria-live

    role="status"

    role="alert"


Наприклад:

    <p
        role="status"
        id="status"
    >
        Saved successfully.
    </p>


# Accessibility та JavaScript

JavaScript може:

- покращити accessibility;
- або повністю її зламати.


Наприклад:

    button.addEventListener(
        "click",
        openModal
    );


може бути добре, якщо це справжній:

    <button>


А якщо:

    <div onclick="openModal()">

JavaScript уже не дає native keyboard behavior.


JavaScript повинен доповнювати HTML, а не боротися з ним.


# Progressive Enhancement

**Progressive Enhancement**:

    HTML
      ↓
    базова функціональність
      ↓
    CSS
      ↓
    visual enhancement
      ↓
    JavaScript
      ↓
    advanced interaction


Наприклад, navigation:

    <nav>
        <a href="/about">
            About
        </a>
    </nav>


вже працює без JavaScript.


JavaScript може додати:

- mobile menu;
- animation;
- dynamic behavior.


Але базова navigation не повинна без потреби залежати від JavaScript.


# Common Accessibility mistakes

## 1. Відсутній `alt`

Погано:

    <img src="doctor.jpg">


Краще:

    <img
        src="doctor.jpg"
        alt="Лікар проводить консультацію"
    >


Для decorative image:

    alt=""


# 2. Input без label

Погано:

    <input
        type="email"
        placeholder="Email"
    >


Краще:

    <label for="email">
        Email
    </label>

    <input
        id="email"
        type="email"
    >


# 3. `<div>` замість button

Погано:

    <div onclick="save()">
        Save
    </div>


Краще:

    <button type="button">
        Save
    </button>


# 4. Видалення focus

Погано:

    * {
        outline: none;
    }


Краще:

    :focus-visible {
        outline: 3px solid blue;
    }


# 5. Information тільки через color

Погано:

    red = error
    green = success


Краще:

    red + error message

    green + success message


# 6. Placeholder замість label

Погано:

    <input
        placeholder="Email"
    >


Краще:

    <label for="email">
        Email
    </label>

    <input
        id="email"
        placeholder="you@example.com"
    >


# 7. Нелогічний heading hierarchy

Погано:

    h1
    h4
    h2


Краще:

    h1
      h2
        h3
      h2


# 8. Неінформативні links

Погано:

    <a href="/article">
        Read more
    </a>


Краще:

    <a href="/article">
        Read the HTML accessibility guide
    </a>


# 9. Блокування zoom

Не потрібно штучно забороняти browser zoom.


# 10. Interaction тільки через hover

Не роби критичну функціональність доступною тільки через:

    :hover


# 11. Custom controls без keyboard

Якщо створюєш:

    custom dropdown
    custom slider
    custom menu


потрібно продумати keyboard behavior.


# 12. Надмірне використання ARIA

Погано:

    <button
        role="button"
    >
        Save
    </button>


ARIA тут не потрібна.

Краще:

    <button>
        Save
    </button>


# Практичний приклад accessible page

    <!DOCTYPE html>
    <html lang="uk">

    <head>

        <meta charset="UTF-8">

        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        >

        <title>
            Web Development Course
        </title>

    </head>

    <body>

        <a
            class="skip-link"
            href="#main"
        >
            Перейти до основного контенту
        </a>


        <header>

            <h1>
                Web Development Course
            </h1>

            <nav aria-label="Основна навігація">

                <a href="/">
                    Головна
                </a>

                <a href="/courses">
                    Курси
                </a>

                <a href="/about">
                    Про курс
                </a>

            </nav>

        </header>


        <main id="main">

            <section>

                <h2>
                    HTML
                </h2>

                <p>
                    Основи HTML та semantic markup.
                </p>

            </section>


            <section>

                <h2>
                    CSS
                </h2>

                <p>
                    Основи CSS та layout.
                </p>

            </section>

        </main>


        <footer>

            <p>
                © 2026 Web Development Course
            </p>

        </footer>

    </body>

    </html>


У цьому прикладі є:

    lang
    title
    skip link
    semantic landmarks
    headings
    semantic navigation
    meaningful link text
    main content


# Практичний приклад accessible navigation

    <header>

        <a href="/">
            <span class="visually-hidden">
                Go to homepage
            </span>

            <img
                src="/logo.svg"
                alt="My Website"
            >
        </a>


        <nav aria-label="Main navigation">

            <ul>

                <li>
                    <a href="/">
                        Home
                    </a>
                </li>

                <li>
                    <a href="/courses">
                        Courses
                    </a>
                </li>

                <li>
                    <a href="/about">
                        About
                    </a>
                </li>

                <li>
                    <a href="/contact">
                        Contact
                    </a>
                </li>

            </ul>

        </nav>

    </header>


Переваги:

- semantic `<nav>`;
- real links;
- keyboard access;
- meaningful link text;
- accessible navigation landmark.


# Практичний приклад accessible form

    <form>

        <div class="field">

            <label for="name">
                Name
            </label>

            <input
                id="name"
                name="name"
                type="text"
                autocomplete="name"
                required
            >

        </div>


        <div class="field">

            <label for="email">
                Email
            </label>

            <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                aria-describedby="email-help"
            >

            <p id="email-help">
                We will use this email
                to contact you.
            </p>

        </div>


        <div class="field">

            <label for="message">
                Message
            </label>

            <textarea
                id="message"
                name="message"
                rows="5"
            ></textarea>

        </div>


        <button type="submit">
            Send message
        </button>

    </form>


Тут використано:

    label
    id
    name
    autocomplete
    required
    aria-describedby
    semantic form controls
    native button


# Accessibility checklist

Перед завершенням HTML/CSS сторінки перевір:

## Document

    [ ] Чи є <!DOCTYPE html>?

    [ ] Чи є lang на <html>?

    [ ] Чи є meaningful <title>?

    [ ] Чи логічна структура документа?


## Semantics

    [ ] Чи використовую semantic HTML?

    [ ] Чи є один логічний main content?

    [ ] Чи правильні headings?

    [ ] Чи використовую <button> для actions?

    [ ] Чи використовую <a> для navigation?


## Images

    [ ] Чи має informative image правильний alt?

    [ ] Чи має decorative image alt=""?

    [ ] Чи зрозуміла функція image-link?


## Forms

    [ ] Чи має кожне поле label?

    [ ] Чи правильно пов'язані label та input?

    [ ] Чи зрозумілі error messages?

    [ ] Чи доступні form controls через keyboard?

    [ ] Чи зрозуміло, яке поле має помилку?


## Keyboard

    [ ] Чи працює Tab?

    [ ] Чи працює Shift + Tab?

    [ ] Чи видно focus?

    [ ] Чи логічний focus order?

    [ ] Чи працюють buttons через keyboard?

    [ ] Чи працює Escape там, де це потрібно?


## Visual

    [ ] Чи достатній color contrast?

    [ ] Чи не передається information тільки кольором?

    [ ] Чи достатній font size?

    [ ] Чи достатній line-height?

    [ ] Чи достатній touch target?


## Responsive

    [ ] Чи працює mobile layout?

    [ ] Чи можна збільшити сторінку?

    [ ] Чи не ламається layout при збільшенні text?

    [ ] Чи працює keyboard navigation?


## Motion

    [ ] Чи враховано prefers-reduced-motion?

    [ ] Чи немає небезпечного flashing?

    [ ] Чи не залежить важлива information тільки від animation?


## ARIA

    [ ] Чи справді потрібен ARIA?

    [ ] Чи можна використати native HTML?

    [ ] Чи правильний role?

    [ ] Чи правильно оновлюються ARIA states?


# Що потрібно пам'ятати

## 1. Accessibility починається з HTML

Перший крок:

    semantic HTML


а не:

    ARIA


## 2. Native HTML — найкраща основа

Використовуй:

    <button>

    <a>

    <input>

    <select>

    <textarea>

    <nav>

    <main>

    <header>

    <footer>


## 3. Keyboard — обов'язкова частина interaction

Перевіряй:

    Tab
    Shift + Tab
    Enter
    Space
    Escape
    Arrow keys


## 4. Focus повинен бути видимим

Використовуй:

    :focus-visible


## 5. Images потребують text alternative

Основний інструмент:

    alt


## 6. Forms повинні мати labels

Основний pattern:

    <label for="email">
        Email
    </label>

    <input id="email">


## 7. Не використовуй color як єдиний сигнал

Потрібно:

    color
      +
    text
      +
    structure


## 8. Heading hierarchy має значення

Структура:

    h1
      ↓
    h2
      ↓
    h3


## 9. ARIA не замінює semantic HTML

Спочатку:

    native HTML


Потім:

    ARIA

якщо справді потрібно.


## 10. Accessibility — це не тільки screen readers

Вона також стосується:

    keyboard
    +
    mouse
    +
    touch
    +
    vision
    +
    hearing
    +
    cognition
    +
    motor interaction


# Питання для співбесіди

### 1. Що таке accessibility?

Можливість використовувати web content та interface широким колом користувачів, включно з людьми, які використовують assistive technologies або мають різні обмеження.


### 2. Що означає a11y?

Скорочення:

    a + 11 letters + y

тобто:

    accessibility


### 3. Що таке WCAG?

Web Content Accessibility Guidelines — рекомендації щодо accessibility web content.


### 4. Які чотири принципи WCAG?

    Perceivable
    Operable
    Understandable
    Robust


### 5. Чому semantic HTML важливий?

Він передає browser та assistive technologies структурний та семантичний зміст документа.


### 6. Чому `<button>` кращий за `<div onclick>`?

Тому що `<button>` має native semantics, focus behavior та keyboard interaction.


### 7. Для чого потрібен `alt`?

Для text alternative до image.


### 8. Чим `alt=""` відрізняється від відсутнього alt?

`alt=""` явно повідомляє, що image декоративний.

Відсутній `alt` може означати, що автор не надав text alternative.


### 9. Чому placeholder не замінює label?

Placeholder зникає під час введення та не є повноцінною назвою form control.


### 10. Що таке keyboard accessibility?

Можливість виконувати всі необхідні interaction через keyboard без необхідності mouse.


### 11. Що таке focus indicator?

Візуальна індикація того, який елемент зараз має keyboard focus.


### 12. Що робить `:focus-visible`?

Дозволяє стилізувати focus indicator у випадках, коли браузер визначає, що його потрібно показати.


### 13. Для чого потрібен skip link?

Щоб keyboard user міг пропустити повторювану navigation та швидко перейти до main content.


### 14. Чому не можна використовувати тільки колір для error state?

Тому що частина користувачів може не розрізняти кольори або не сприймати їх як достатній сигнал.


### 15. Що таке ARIA?

Набір атрибутів та ролей для опису accessibility semantics web UI.


### 16. Чи потрібно додавати `role="button"` до `<button>`?

Ні.

`<button>` вже має native button role.


### 17. Що таке accessibility tree?

Структура, яку browser формує для представлення UI assistive technologies.


### 18. Що таке progressive enhancement?

Підхід, коли базова функціональність створюється на HTML, а CSS та JavaScript додають додаткові можливості.


### 19. Чому важливий `lang`?

Він допомагає browser та assistive technologies правильно визначати мову content.


### 20. Чому accessibility потрібно перевіряти не тільки в Chrome?

Тому що користувачі можуть використовувати різні browsers, operating systems та assistive technologies.


# Рівні знань

## 🟢 Core

Потрібно знати:

    Accessibility
    a11y
    WCAG
    semantic HTML
    alt
    label
    button
    link
    headings
    keyboard
    focus


Потрібно вміти:

- створити semantic HTML;
- зробити accessible form;
- зробити keyboard-friendly navigation;
- додати правильні `alt`;
- зберегти visible focus.


# 🟡 Junior

Потрібно розуміти:

- WCAG POUR;
- landmarks;
- accessible names;
- ARIA basics;
- screen readers;
- accessibility tree;
- color contrast;
- keyboard navigation;
- focus management;
- skip links;
- reduced motion.


Потрібно вміти:

- перевіряти сторінку клавіатурою;
- знаходити accessibility проблеми;
- правильно використовувати `aria-label`;
- використовувати `aria-describedby`;
- створювати accessible forms;
- створювати semantic navigation.


# 🟠 Middle

Потрібно розуміти:

- WCAG;
- ARIA patterns;
- complex keyboard interaction;
- dynamic content;
- focus management;
- modal accessibility;
- custom controls;
- screen reader behavior;
- SPA accessibility;
- responsive accessibility.


Потрібно вміти:

- створювати accessible components;
- перевіряти keyboard interaction;
- керувати focus;
- працювати з dynamic states;
- знаходити accessibility regressions.


# 🔴 Senior

Потрібно розуміти:

- accessibility architecture;
- design systems;
- WCAG conformance;
- ARIA Authoring Practices;
- complex widgets;
- screen reader differences;
- accessibility testing strategy;
- automated + manual testing;
- accessibility in SPA;
- progressive enhancement;
- inclusive UX.


Потрібно вміти:

- проєктувати accessibility на рівні design system;
- створювати reusable accessible components;
- визначати accessibility requirements;
- аналізувати складні interaction patterns;
- проводити accessibility review;
- запобігати accessibility regressions.


# Міні-шпаргалка

## Semantic HTML

    <header>
    <nav>
    <main>
    <section>
    <article>
    <aside>
    <footer>


## Headings

    <h1>
      <h2>
        <h3>


## Navigation

    <a href="/about">
        About
    </a>


## Action

    <button type="button">
        Save
    </button>


## Image

    <img
        src="photo.jpg"
        alt="Description"
    >


Decorative:

    <img
        src="decoration.svg"
        alt=""
    >


## Form

    <label for="email">
        Email
    </label>

    <input
        id="email"
        name="email"
        type="email"
    >


## Keyboard

    Tab
    Shift + Tab
    Enter
    Space
    Escape
    Arrow keys


## Focus

    :focus

    :focus-visible

    :focus-within


## Focus style

    :focus-visible {
        outline: 3px solid blue;
        outline-offset: 3px;
    }


## ARIA

    aria-label

    aria-labelledby

    aria-describedby

    aria-expanded

    aria-hidden

    aria-disabled

    aria-invalid


## Language

    <html lang="uk">


## Page title

    <title>
        Page title
    </title>


## Reduced motion

    @media (prefers-reduced-motion: reduce) {
        ...
    }


# Accessibility checklist — коротка версія

    [ ] Semantic HTML

    [ ] Correct lang

    [ ] Meaningful title

    [ ] Correct heading hierarchy

    [ ] Accessible navigation

    [ ] Meaningful link text

    [ ] Native buttons

    [ ] Correct image alt

    [ ] Labels for form controls

    [ ] Visible focus

    [ ] Keyboard navigation

    [ ] Logical tab order

    [ ] Skip link where appropriate

    [ ] Sufficient color contrast

    [ ] Information not conveyed by color alone

    [ ] Responsive layout

    [ ] Zoom works

    [ ] Touch targets are usable

    [ ] Reduced motion considered

    [ ] ARIA used only when necessary

    [ ] Dynamic content is accessible

    [ ] Error messages are understandable


# Головне

Accessibility — це не окремий "додатковий" шар, який потрібно додати після завершення HTML/CSS.

Правильний підхід:

    Semantic HTML
          ↓
    Accessible structure
          ↓
    Keyboard interaction
          ↓
    Visible focus
          ↓
    Accessible forms
          ↓
    Good color contrast
          ↓
    Responsive design
          ↓
    ARIA where necessary
          ↓
    Testing


Найважливіші принципи:

> Спочатку semantic HTML.

> Використовуй native elements whenever possible.

> Все важливе повинно бути доступним через keyboard.

> Focus повинен бути видимим.

> Image повинні мати правильний text alternative.

> Form controls повинні мати labels.

> Не передавай інформацію тільки через color.

> Не використовуй ARIA там, де native HTML уже вирішує проблему.

> Accessibility потрібно враховувати одночасно з HTML, CSS та JavaScript.


Мислення frontend developer:

    HTML
      ↓
    "Що це за елемент?"

    CSS
      ↓
    "Як він виглядає?"

    JavaScript
      ↓
    "Як він поводиться?"

    Accessibility
      ↓
    "Чи може ним скористатися кожен?"


У хорошому UI:

    semantic
      +
    keyboard accessible
      +
    visible focus
      +
    readable
      +
    understandable
      +
    responsive
      +
    compatible with assistive technologies


І головна практична формула:

    Native HTML
        +
    Semantic structure
        +
    Keyboard support
        +
    Visible focus
        +
    Accessible names
        +
    Good contrast
        +
    Clear feedback
        =
    Accessible UI


Accessibility — це не тільки вимога WCAG.

Це спосіб мислення при створенні interface:

> Не запитуй лише "Чи працює ця сторінка?"

Запитуй:

> "Чи може користувач побачити, зрозуміти та виконати цю дію незалежно від способу взаємодії з interface?"