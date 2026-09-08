## 05. Links and Navigation

Links and Navigation — це частина HTML, яка відповідає за створення **посилань, навігації між сторінками, переходів усередині документа, завантаження ресурсів та взаємодію користувача з вебсайтом**.

Основний HTML-елемент для посилань:

    <a>

Anchor (`<a>`) дозволяє створювати переходи:

    між сторінками;
    між різними сайтами;
    до окремих місць поточної сторінки;
    до файлів;
    до email;
    до телефонних номерів;
    до інших ресурсів.

Наприклад:

    <a href="/about">
        About
    </a>

---

### Основні поняття

✔ link  
✔ hyperlink  
✔ anchor  
✔ `<a>`  
✔ `href`  
✔ URL  
✔ absolute URL  
✔ relative URL  
✔ path  
✔ query string  
✔ fragment  
✔ internal link  
✔ external link  
✔ navigation  
✔ `<nav>`  
✔ target  
✔ `_self`  
✔ `_blank`  
✔ `rel`  
✔ `noopener`  
✔ `noreferrer`  
✔ fragment identifier  
✔ `#id`  
✔ email link  
✔ `mailto:`  
✔ telephone link  
✔ `tel:`  
✔ download link  
✔ `download`  
✔ visited link  
✔ focus  
✔ accessible link  
✔ link text  
✔ same-origin  
✔ cross-origin  
✔ URL encoding  

---

# Що потрібно пам'ятати

• Основний елемент для hyperlink — `<a>`.

• Адреса посилання задається через `href`.

• `<a>` без `href` не є звичайним навігаційним посиланням.

• Absolute URL містить повну адресу ресурсу.

• Relative URL визначається відносно поточного документа або base URL.

• `/about` — приклад root-relative URL.

• `./about` — relative path.

• `../about` — перехід до батьківського рівня.

• `#section` — fragment link.

• `<nav>` використовується для групи основних навігаційних посилань.

• `target="_blank"` відкриває ресурс у новому browsing context.

• Для зовнішніх посилань з `target="_blank"` часто використовують:

    rel="noopener"

• `rel="noreferrer"` також впливає на передачу referrer information.

• `mailto:` створює посилання для email.

• `tel:` створює посилання для телефонного номера.

• `download` може запропонувати завантаження ресурсу.

• Хороший link text повинен описувати destination або дію.

• Не варто використовувати:

    Click here
    Read more
    More

як єдиний текст посилання, якщо з контексту незрозуміло, куди воно веде.

---

# Anchor

`<a>` — anchor element.

Найпростіше посилання:

    <a href="https://example.com">
        Example
    </a>

Структура:

    <a href="URL">
        Link text
    </a>

Тут:

    <a>
        → anchor element

    href
        → destination

    Link text
        → текст посилання

---

# href

`href` означає hypertext reference.

Він визначає destination посилання.

Наприклад:

    <a href="/about">
        About
    </a>

Або:

    <a href="https://example.com">
        Example
    </a>

Без `href`:

    <a>
        About
    </a>

це вже не звичайне навігаційне посилання.

---

# Link Text

Link text — текст, який бачить користувач і на який можна натиснути.

Наприклад:

    <a href="/contact">
        Contact us
    </a>

Хороший link text:

    Contact us

Гірший:

    Click here

Link text повинен бути зрозумілим навіть тоді, коли користувач переглядає список посилань окремо від навколишнього тексту.

---

# Absolute URL

Absolute URL містить повну адресу.

Наприклад:

    <a href="https://example.com/about">
        About
    </a>

Структура:

    https://example.com/about
    └─┬─┘ └──────┬──────┘
      │           │
    protocol     host/path

Інший приклад:

    <a href="https://developer.mozilla.org/">
        MDN
    </a>

---

# Relative URL

Relative URL задається відносно поточного документа.

Наприклад:

    <a href="about.html">
        About
    </a>

Якщо поточна сторінка:

    /pages/index.html

то:

    about.html

може вести до:

    /pages/about.html

---

# Root-relative URL

URL може починатися з `/`.

Наприклад:

    <a href="/about">
        About
    </a>

Такий path починається від root сайту.

Наприклад:

    https://example.com/about

---

# Current Directory

`./` означає поточний directory.

Наприклад:

    <a href="./about.html">
        About
    </a>

Це означає:

    about.html
    у поточному directory

---

# Parent Directory

`../` означає перехід на один рівень вище.

Наприклад:

    <a href="../index.html">
        Home
    </a>

Якщо файл знаходиться:

    /pages/about/index.html

то:

    ../index.html

може вести до:

    /pages/about/index.html
             ↑
        залежно від base location

Важливо розуміти, що relative URL обчислюється від URL документа, а не просто від того, як файл фізично лежить у файловій системі.

---

# Relative Path Examples

    about.html
    ./about.html
    ../about.html
    /about
    /docs/about.html

---

# Internal Link

Internal link веде до ресурсу в межах поточного сайту.

Наприклад:

    <a href="/about">
        About
    </a>

    <a href="/contact">
        Contact
    </a>

    <a href="/blog">
        Blog
    </a>

---

# External Link

External link веде на інший сайт або інший origin.

Наприклад:

    <a href="https://example.com">
        Example
    </a>

Або:

    <a href="https://developer.mozilla.org/">
        MDN
    </a>

---

# Internal vs External

    Internal
        ↓
    /about
    /contact
    /products

    External
        ↓
    https://example.com
    https://developer.mozilla.org/

---

# Navigation

Navigation — це набір посилань, які дозволяють користувачу переміщатися між основними частинами сайту.

Наприклад:

    Home
    About
    Services
    Blog
    Contact

HTML:

    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/services">Services</a>
        <a href="/blog">Blog</a>
        <a href="/contact">Contact</a>
    </nav>

---

# nav

`<nav>` — semantic element для navigation section.

Наприклад:

    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
    </nav>

`<nav>` допомагає браузерам, assistive technologies та іншим інструментам розуміти, що цей блок містить navigation.

---

# Navigation з List

Дуже поширена структура:

    <nav>
        <ul>
            <li>
                <a href="/">Home</a>
            </li>

            <li>
                <a href="/about">About</a>
            </li>

            <li>
                <a href="/contact">Contact</a>
            </li>
        </ul>
    </nav>

Це особливо зручно для складнішої navigation structure.

---

# Navigation Example

    <header>
        <h1>My Website</h1>

        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/blog">Blog</a>
            <a href="/contact">Contact</a>
        </nav>
    </header>

---

# Link to Current Page

Посилання на root:

    <a href="/">
        Home
    </a>

Якщо користувач знаходиться на:

    https://example.com/about

то:

    /

веде на:

    https://example.com/

---

# Fragment

Fragment identifier використовується для переходу до певної частини документа.

Наприклад:

    <a href="#contact">
        Contact section
    </a>

Target element:

    <section id="contact">
        <h2>Contact</h2>
    </section>

При натисканні браузер переходить до element з:

    id="contact"

---

# Fragment Syntax

Структура:

    #id

Наприклад:

    #about
    #contact
    #features
    #pricing

HTML:

    <a href="#pricing">
        View pricing
    </a>

    <section id="pricing">
        <h2>Pricing</h2>
    </section>

---

# Page Navigation

Можна створити navigation всередині однієї сторінки.

    <nav>
        <a href="#about">About</a>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#contact">Contact</a>
    </nav>

    <main>
        <section id="about">
            <h2>About</h2>
        </section>

        <section id="features">
            <h2>Features</h2>
        </section>

        <section id="pricing">
            <h2>Pricing</h2>
        </section>

        <section id="contact">
            <h2>Contact</h2>
        </section>
    </main>

---

# id

Для fragment navigation element повинен мати відповідний `id`.

Наприклад:

    <section id="about">
        <h2>About</h2>
    </section>

Посилання:

    <a href="#about">
        About
    </a>

Логіка:

    href="#about"
          ↓
    id="about"

---

# id має бути унікальним

На сторінці `id` повинен бути унікальним.

Правильно:

    <section id="about">
        ...
    </section>

    <section id="contact">
        ...
    </section>

Не потрібно:

    <section id="about">
        ...
    </section>

    <section id="about">
        ...
    </section>

---

# Link to Top

Можна створити посилання на початок документа.

Наприклад:

    <a href="#">
        Back to top
    </a>

Або створити явний target:

    <body id="top">

        ...

        <a href="#top">
            Back to top
        </a>

Явний `id` часто робить намір зрозумілішим.

---

# Fragment з URL

Fragment може бути частиною повного URL.

Наприклад:

    https://example.com/docs#installation

Тут:

    https://example.com/docs
        → document

    #installation
        → fragment

HTML:

    <a href="https://example.com/docs#installation">
        Installation
    </a>

---

# Query String

URL може містити query parameters.

Наприклад:

    /search?q=html

HTML:

    <a href="/search?q=html">
        Search HTML
    </a>

Тут:

    /search
        → path

    ?
        → start of query

    q=html
        → query parameter

---

# Multiple Query Parameters

Наприклад:

    /products?category=books&sort=price

HTML:

    <a href="/products?category=books&sort=price">
        Books by price
    </a>

Тут:

    category=books
    sort=price

---

# Path + Query + Fragment

URL може містити всі три частини:

    /search?q=html#results

Структура:

    /search
        ↓
    path

    ?q=html
        ↓
    query

    #results
        ↓
    fragment

---

# Email Link

Для email використовують:

    mailto:

Наприклад:

    <a href="mailto:hello@example.com">
        Email us
    </a>

При натисканні браузер може відкрити email client.

---

# Email з Subject

Можна передати subject.

    <a href="mailto:hello@example.com?subject=Hello">
        Send email
    </a>

Зверніть увагу, що URL parameters повинні бути правильно encoded.

---

# Telephone Link

Для телефонного номера:

    tel:

Наприклад:

    <a href="tel:+380441234567">
        +380 44 123 45 67
    </a>

На мобільному пристрої це може відкрити інтерфейс здійснення дзвінка.

---

# Download Link

`download` повідомляє браузеру, що ресурс призначений для завантаження.

Наприклад:

    <a href="/files/document.pdf" download>
        Download PDF
    </a>

Можна запропонувати ім'я файлу:

    <a
        href="/files/document.pdf"
        download="course-notes.pdf"
    >
        Download notes
    </a>

---

# target

`target` визначає browsing context, у якому відкриється ресурс.

Наприклад:

    <a
        href="https://example.com"
        target="_blank"
    >
        Open Example
    </a>

---

# target="_self"

`_self` — стандартна поведінка.

Посилання відкривається у поточному browsing context.

    <a
        href="/about"
        target="_self"
    >
        About
    </a>

У більшості випадків `target="_self"` можна не вказувати.

Просто:

    <a href="/about">
        About
    </a>

---

# target="_blank"

`_blank` відкриває ресурс у новому browsing context.

    <a
        href="https://example.com"
        target="_blank"
    >
        Example
    </a>

Часто використовується для external resources.

---

# target="_parent"

`_parent` використовується для відкриття у parent browsing context.

Найбільш актуально це у контексті:

    iframe
    nested browsing contexts

У звичайній navigation використовується рідко.

---

# target="_top"

`_top` відкриває ресурс у верхньому browsing context.

Також найбільш релевантний для:

    iframe
    nested browsing contexts

---

# target Quick Reference

    _self
        → current context

    _blank
        → new browsing context

    _parent
        → parent context

    _top
        → top-level context

---

# rel

`rel` описує relationship між поточним документом і destination resource.

Наприклад:

    <a
        href="https://example.com"
        rel="noopener"
        target="_blank"
    >
        Example
    </a>

Існують різні relationship tokens.

Наприклад:

    noopener
    noreferrer
    nofollow
    external
    author
    help
    license
    next
    prev

---

# noopener

`noopener` пов'язаний із безпечним відкриттям нового browsing context.

Наприклад:

    <a
        href="https://example.com"
        target="_blank"
        rel="noopener"
    >
        Example
    </a>

Для сучасних браузерів поведінка `target="_blank"` щодо opener була посилена, але явне `rel="noopener"` залишається хорошим і зрозумілим способом показати намір.

---

# noreferrer

`noreferrer` означає, що browser не повинен передавати referrer information destination resource.

Наприклад:

    <a
        href="https://example.com"
        target="_blank"
        rel="noreferrer"
    >
        Example
    </a>

`noreferrer` також включає поведінку `noopener` у сучасних браузерах.

---

# noopener vs noreferrer

    noopener
        → ізолює destination від opener

    noreferrer
        → не передає referrer
        → також забезпечує noopener-поведінку

Можна зустріти:

    rel="noopener noreferrer"

---

# nofollow

`nofollow` використовується як сигнал для search engines щодо relationship із посиланням.

Наприклад:

    <a
        href="https://example.com"
        rel="nofollow"
    >
        Example
    </a>

Це не означає, що браузер не відкриє link.

Це metadata про relationship, а не browser navigation behavior.

---

# External Link

Для позначення external relationship можна використовувати:

    rel="external"

Наприклад:

    <a
        href="https://example.com"
        rel="external"
    >
        Example
    </a>

Це не змушує браузер відкривати link у новій вкладці.

---

# Link States

CSS може стилізувати різні стани посилань.

Типові стани:

    :link
    :visited
    :hover
    :focus
    :active

Наприклад:

    a:link {
        ...
    }

    a:visited {
        ...
    }

    a:hover {
        ...
    }

    a:focus {
        ...
    }

    a:active {
        ...
    }

CSS буде детально розглядатися в CSS sections.

---

# Visited

`:visited` відповідає за посилання, яке користувач уже відвідував.

HTML:

    <a href="/about">
        About
    </a>

CSS:

    a:visited {
        ...
    }

Браузери обмежують властивості, які можна змінювати через `:visited`, з міркувань privacy.

---

# Hover

`:hover` активується, коли pointer знаходиться над link.

    a:hover {
        ...
    }

---

# Focus

`:focus` важливий для keyboard navigation.

    a:focus {
        ...
    }

Користувач може переходити між links через:

    Tab

Тому focus state не слід прибирати без альтернативи.

---

# Active

`:active` відповідає моменту активної взаємодії з link.

    a:active {
        ...
    }

---

# Keyboard Navigation

Links повинні бути доступними для keyboard users.

Звичайний:

    <a href="/about">
        About
    </a>

є keyboard-accessible.

Користувач може використовувати:

    Tab
        ↓
    focus next link

    Enter
        ↓
    activate link

---

# Не імітувати link через div

Не потрібно робити:

    <div onclick="goToAbout()">
        About
    </div>

як заміну нормальному link.

Краще:

    <a href="/about">
        About
    </a>

Причини:

    keyboard support
    accessibility
    browser behavior
    semantics
    copy link
    open in new tab
    context menu

---

# Link vs Button

Це дуже важливе розрізнення.

Link:

    → переходить до іншого resource / location

Button:

    → виконує action

Наприклад:

    <a href="/profile">
        Open profile
    </a>

Це navigation.

А:

    <button type="button">
        Delete
    </button>

Це action.

---

# Navigation vs Action

    <a>
        → navigation

    <button>
        → action

Наприклад:

    <a href="/settings">
        Settings
    </a>

    <button type="button">
        Save
    </button>

---

# Disabled Links

У HTML немає стандартного `disabled` attribute для `<a>`.

Не потрібно:

    <a
        href="/profile"
        disabled
    >
        Profile
    </a>

`disabled` не робить anchor справжнім disabled control.

Якщо елемент не повинен бути доступним для navigation, потрібно правильно організувати UI та behavior.

---

# Link Without href

Можна написати:

    <a>
        About
    </a>

Але це не звичайне навігаційне посилання.

Не слід використовувати `<a>` без `href` як заміну button.

Для action використовуйте:

    <button>
        Action
    </button>

---

# Link to File

Посилання може вести на файл.

Наприклад:

    <a href="/files/report.pdf">
        Report
    </a>

Або:

    <a href="/images/photo.jpg">
        Photo
    </a>

---

# Link to Download

    <a
        href="/files/report.pdf"
        download
    >
        Download report
    </a>

---

# Link to Image

    <a href="/images/photo-large.jpg">
        <img
            src="/images/photo-small.jpg"
            alt="Landscape"
        >
    </a>

Тут image є clickable link.

---

# Link Around Image

Anchor може містити інші phrasing content.

Наприклад:

    <a href="/product">
        <img
            src="/images/product.jpg"
            alt="Product name"
        >
    </a>

---

# Text + Image Link

    <a href="/product">
        <img
            src="/images/product.jpg"
            alt=""
        >

        <span>
            Product
        </span>
    </a>

Якщо image та text ведуть до одного destination, потрібно продумати accessibility, щоб не створювати зайві повторювані links.

---

# Link with title

Можна використовувати `title`:

    <a
        href="/about"
        title="Learn more about us"
    >
        About
    </a>

Але `title` не повинен бути основним способом пояснення link.

Основна інформація повинна бути доступною в самому link text або навколишньому content.

---

# Link Text Accessibility

Погано:

    <a href="/article">
        Click here
    </a>

Краще:

    <a href="/article">
        Read the HTML article
    </a>

Ще краще, коли link text однозначно описує destination:

    <a href="/articles/html-elements">
        HTML elements reference
    </a>

---

# Navigation Accessibility

Navigation повинна мати зрозумілу структуру.

Наприклад:

    <nav aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
    </nav>

`aria-label` може бути корисним, коли на сторінці є кілька navigation regions.

---

# Multiple nav Elements

На сторінці може бути кілька navigation regions.

Наприклад:

    <nav aria-label="Main navigation">
        ...
    </nav>

    <nav aria-label="Breadcrumb">
        ...
    </nav>

Якщо navigation regions мають різне призначення, accessible names допомагають їх розрізняти.

---

# Breadcrumb Navigation

Breadcrumb показує шлях користувача в структурі сайту.

Наприклад:

    Home
      ↓
    Courses
      ↓
    HTML
      ↓
    Links

HTML:

    <nav aria-label="Breadcrumb">
        <a href="/">Home</a>
        /
        <a href="/courses">Courses</a>
        /
        <a href="/courses/html">HTML</a>
        /
        <span>Links</span>
    </nav>

---

# Previous / Next Navigation

Можна створити navigation між сторінками.

    <nav aria-label="Pagination">
        <a href="/page/1">
            Previous
        </a>

        <a href="/page/3">
            Next
        </a>
    </nav>

---

# rel="next" та rel="prev"

Історично використовували:

    rel="next"

    rel="prev"

Наприклад:

    <a
        href="/articles/page-2"
        rel="next"
    >
        Next
    </a>

Ці relationship tokens описують зв'язок між ресурсами.

---

# URL Encoding

URL має спеціальні правила encoding.

Наприклад, пробіл не повинен просто використовуватися як звичайний символ у URL.

Можна зустріти:

    %20

Наприклад:

    /search?q=hello%20world

---

# Special Characters in URL

URL може містити encoded characters:

    %20
    %2F
    %3F
    %26
    %3D

Наприклад:

    ?q=HTML%20CSS

означає query:

    q = HTML CSS

---

# Query Parameters

Query parameters часто використовуються для передачі інформації:

    /search?q=html

    /products?page=2

    /products?category=books

    /users?id=10

---

# URL Structure

Приклад:

    https://example.com/products?page=2#reviews

Структура:

    https://
        ↓
    protocol

    example.com
        ↓
    host

    /products
        ↓
    path

    ?page=2
        ↓
    query

    #reviews
        ↓
    fragment

---

# URL Anatomy

Загальна модель:

    scheme://host/path?query#fragment

Наприклад:

    https://example.com/products?page=2#reviews

    scheme
        → https

    host
        → example.com

    path
        → /products

    query
        → page=2

    fragment
        → reviews

---

# Link to Specific Section on Another Page

Можна перейти не просто на іншу сторінку, а на конкретний fragment.

    <a href="/docs/html#links">
        HTML links
    </a>

На цільовій сторінці:

    <section id="links">
        <h2>Links</h2>
    </section>

---

# Same Page + Fragment

    <a href="#contact">
        Contact
    </a>

    <section id="contact">
        <h2>Contact</h2>
    </section>

---

# External Link + target

    <a
        href="https://developer.mozilla.org/"
        target="_blank"
        rel="noopener"
    >
        MDN
    </a>

---

# Email Link

    <a href="mailto:hello@example.com">
        hello@example.com
    </a>

---

# Telephone Link

    <a href="tel:+380441234567">
        +380 44 123 45 67
    </a>

---

# Download

    <a
        href="/files/guide.pdf"
        download
    >
        Download guide
    </a>

---

# Practical Examples

### Приклад 1 — basic link

    <a href="/about">
        About
    </a>

---

### Приклад 2 — external link

    <a href="https://example.com">
        Example
    </a>

---

### Приклад 3 — external link in new tab

    <a
        href="https://example.com"
        target="_blank"
        rel="noopener"
    >
        Open Example
    </a>

---

### Приклад 4 — main navigation

    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/blog">Blog</a>
        <a href="/contact">Contact</a>
    </nav>

---

### Приклад 5 — navigation with list

    <nav aria-label="Main navigation">
        <ul>
            <li>
                <a href="/">Home</a>
            </li>

            <li>
                <a href="/about">About</a>
            </li>

            <li>
                <a href="/services">Services</a>
            </li>

            <li>
                <a href="/contact">Contact</a>
            </li>
        </ul>
    </nav>

---

### Приклад 6 — page sections

    <nav>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
    </nav>

    <main>
        <section id="about">
            <h2>About</h2>
        </section>

        <section id="services">
            <h2>Services</h2>
        </section>

        <section id="contact">
            <h2>Contact</h2>
        </section>
    </main>

---

### Приклад 7 — back to top

    <body id="top">

        ...

        <a href="#top">
            Back to top
        </a>

    </body>

---

### Приклад 8 — email

    <a href="mailto:hello@example.com">
        Send email
    </a>

---

### Приклад 9 — telephone

    <a href="tel:+380441234567">
        Call us
    </a>

---

### Приклад 10 — download

    <a
        href="/files/document.pdf"
        download
    >
        Download document
    </a>

---

### Приклад 11 — image link

    <a href="/products/product-1">
        <img
            src="/images/product-1.jpg"
            alt="Product 1"
        >
    </a>

---

### Приклад 12 — link to section on another page

    <a href="/docs/html#links">
        HTML Links
    </a>

---

### Приклад 13 — query parameter

    <a href="/search?q=html">
        Search HTML
    </a>

---

### Приклад 14 — query + fragment

    <a href="/products?category=books#reviews">
        Book reviews
    </a>

---

### Приклад 15 — complete header navigation

    <header>
        <a href="/">
            My Website
        </a>

        <nav aria-label="Main navigation">
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>

                <li>
                    <a href="/about">About</a>
                </li>

                <li>
                    <a href="/services">Services</a>
                </li>

                <li>
                    <a href="/blog">Blog</a>
                </li>

                <li>
                    <a href="/contact">Contact</a>
                </li>
            </ul>
        </nav>
    </header>

---

# Типові помилки

❌ Використовувати `<div>` замість `<a>` для navigation.

Не:

    <div onclick="location.href='/about'">
        About
    </div>

Краще:

    <a href="/about">
        About
    </a>

---

❌ Використовувати `<a>` без `href` як button.

Не:

    <a onclick="saveData()">
        Save
    </a>

Краще:

    <button type="button">
        Save
    </button>

---

❌ Використовувати `href="#"` для всіх actions.

Наприклад:

    <a href="#">
        Delete
    </a>

Якщо це action, потрібно використовувати:

    <button type="button">
        Delete
    </button>

---

❌ Писати нечіткий link text.

Не:

    <a href="/html">
        Click here
    </a>

Краще:

    <a href="/html">
        Learn HTML
    </a>

---

❌ Використовувати `<br>` для створення navigation layout.

Layout повинен контролювати CSS.

---

❌ Використовувати `target="_blank"` без розуміння наслідків.

Наприклад:

    <a
        href="https://example.com"
        target="_blank"
    >
        Example
    </a>

Для external new-context links доцільно явно використовувати:

    rel="noopener"

---

❌ Робити всі посилання `target="_blank"`.

Не кожне navigation link повинно відкривати нову вкладку.

Для звичайної navigation краще використовувати стандартну поведінку.

---

❌ Видаляти focus outline без альтернативи.

Не:

    a:focus {
        outline: none;
    }

Якщо прибираєте стандартний focus indicator, потрібно забезпечити інший добре видимий focus state.

---

❌ Дублювати один і той самий destination без потреби.

Наприклад, image та title можуть бути двома окремими links до одного destination.

У деяких випадках краще зробити один link, який містить image та text.

---

❌ Використовувати `title` як заміну link text.

Не:

    <a
        href="/article"
        title="Read the HTML article"
    >
        Click here
    </a>

Краще:

    <a href="/article">
        Read the HTML article
    </a>

---

❌ Плутати link та button.

    <a>
        → navigation

    <button>
        → action

---

# Link Patterns

## Internal

    <a href="/about">
        About
    </a>

---

## External

    <a href="https://example.com">
        Example
    </a>

---

## New context

    <a
        href="https://example.com"
        target="_blank"
        rel="noopener"
    >
        Example
    </a>

---

## Fragment

    <a href="#features">
        Features
    </a>

---

## Email

    <a href="mailto:hello@example.com">
        Email
    </a>

---

## Telephone

    <a href="tel:+380441234567">
        Call
    </a>

---

## Download

    <a
        href="/files/file.pdf"
        download
    >
        Download
    </a>

---

## Image link

    <a href="/product">
        <img
            src="/product.jpg"
            alt="Product"
        >
    </a>

---

# Navigation Patterns

## Simple Navigation

    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
    </nav>

---

## List Navigation

    <nav>
        <ul>
            <li>
                <a href="/">Home</a>
            </li>

            <li>
                <a href="/about">About</a>
            </li>

            <li>
                <a href="/contact">Contact</a>
            </li>
        </ul>
    </nav>

---

## Section Navigation

    <nav aria-label="Page navigation">
        <a href="#introduction">
            Introduction
        </a>

        <a href="#installation">
            Installation
        </a>

        <a href="#usage">
            Usage
        </a>
    </nav>

---

## Breadcrumb

    <nav aria-label="Breadcrumb">
        <a href="/">Home</a>
        /
        <a href="/courses">Courses</a>
        /
        <a href="/courses/html">HTML</a>
        /
        <span>Links</span>
    </nav>

---

## Pagination

    <nav aria-label="Pagination">
        <a href="/articles?page=1">
            Previous
        </a>

        <a href="/articles?page=3">
            Next
        </a>
    </nav>

---

# URL Cheat Sheet

    /about
        → root-relative path

    about.html
        → relative path

    ./about.html
        → current directory

    ../about.html
        → parent directory

    https://example.com/about
        → absolute URL

    #about
        → fragment

    /search?q=html
        → path + query

    /docs#links
        → path + fragment

    /search?q=html#results
        → path + query + fragment

---

# Anchor Cheat Sheet

    <a href="/about">
        About
    </a>

    → internal link

---

    <a href="https://example.com">
        Example
    </a>

    → external link

---

    <a
        href="https://example.com"
        target="_blank"
        rel="noopener"
    >
        Example
    </a>

    → open in new browsing context

---

    <a href="#contact">
        Contact
    </a>

    → same-page fragment

---

    <a href="mailto:hello@example.com">
        Email
    </a>

    → email

---

    <a href="tel:+380441234567">
        Call
    </a>

    → telephone

---

    <a
        href="/files/document.pdf"
        download
    >
        Download
    </a>

    → download

---

# Link vs Button

| Element | Основне призначення |
|---|---|
| `<a>` | Navigation |
| `<button>` | Action |

Приклад navigation:

    <a href="/profile">
        Profile
    </a>

Приклад action:

    <button type="button">
        Save
    </button>

---

# Accessibility

Хороший link повинен:

    мати зрозумілий destination;
    мати зрозумілий link text;
    бути доступним з keyboard;
    мати видимий focus state;
    використовувати правильний semantic element.

Хороший приклад:

    <a href="/courses/html">
        Learn HTML
    </a>

Поганий приклад:

    <div onclick="openPage()">
        Click here
    </div>

---

# Keyboard Navigation

Для звичайного:

    <a href="/about">
        About
    </a>

browser забезпечує keyboard interaction.

Типовий сценарій:

    Tab
      ↓
    focus
      ↓
    Enter
      ↓
    navigation

Це одна з важливих причин використовувати справжні `<a>` замість `<div>` з JavaScript.

---

# Semantic Navigation

HTML дозволяє описувати navigation semantic-елементом:

    <nav>

Наприклад:

    <nav aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
    </nav>

Це значно краще описує структуру документа, ніж:

    <div class="navigation">
        ...
    </div>

---

# Links and SEO

Посилання створюють зв'язки між документами та ресурсами.

Для пошукових систем важливі:

    meaningful link text
    logical site structure
    crawlable links
    semantic HTML
    correct URLs

Наприклад:

    <a href="/html-elements">
        HTML elements
    </a>

краще описує destination, ніж:

    <a href="/html-elements">
        Click here
    </a>

---

# Link Relationship

`rel` дозволяє описати relationship.

Наприклад:

    <a
        href="https://example.com"
        rel="external"
    >
        External resource
    </a>

Або:

    <a
        href="https://example.com"
        rel="nofollow"
    >
        External resource
    </a>

Або:

    <a
        href="/next"
        rel="next"
    >
        Next
    </a>

---

# Link Security

При відкритті external resources у новому browsing context важливо розуміти relationship між:

    opener
    destination

Наприклад:

    <a
        href="https://example.com"
        target="_blank"
        rel="noopener"
    >
        Example
    </a>

`noopener` допомагає ізолювати destination від opener relationship.

---

# Navigation Mental Model

Корисно мислити так:

    <a>
      ↓
    href
      ↓
    URL
      ↓
    browser navigation
      ↓
    destination

Наприклад:

    <a href="/about">
        About
    </a>

    href
      ↓
    /about
      ↓
    browser
      ↓
    /about page

---

# Fragment Mental Model

    <a href="#contact">
        Contact
    </a>

          ↓

    id="contact"

          ↓

    browser moves to target element

---

# URL Mental Model

    URL
    │
    ├── scheme
    │
    ├── host
    │
    ├── path
    │
    ├── query
    │
    └── fragment

Наприклад:

    https://example.com/search?q=html#results

    scheme
        https

    host
        example.com

    path
        /search

    query
        q=html

    fragment
        results

---

# Питання зі співбесіди

Що таке hyperlink?

Що таке anchor?

Для чого використовується `<a>`?

Для чого потрібен `href`?

Що таке absolute URL?

Що таке relative URL?

Що таке root-relative URL?

Що означає `./`?

Що означає `../`?

Що таке internal link?

Що таке external link?

Що таке `<nav>`?

Коли потрібно використовувати `<nav>`?

Що таке navigation?

Що таке fragment?

Для чого використовується `#id`?

Як створити link до section на тій самій сторінці?

Як створити link до section на іншій сторінці?

Що таке query parameter?

Що таке query string?

Що таке fragment identifier?

Яка структура URL?

Що робить `target="_blank"`?

Що робить `target="_self"`?

Що робить `target="_parent"`?

Що робить `target="_top"`?

Для чого використовується `rel`?

Що таке `rel="noopener"`?

Що таке `rel="noreferrer"`?

Що таке `rel="nofollow"`?

Що таке `rel="external"`?

Як створити email link?

Як створити telephone link?

Як створити download link?

Для чого потрібен `download`?

Чому link text важливий?

Що таке accessible link?

Чому не варто використовувати `<div>` замість `<a>`?

Чим `<a>` відрізняється від `<button>`?

Чому не слід використовувати `<a>` без `href` як button?

Як працює keyboard navigation для links?

Що таке `:focus`?

Що таке `:hover`?

Що таке `:visited`?

Що таке `:active`?

Чому не можна просто прибирати focus indicator?

Що таке breadcrumb navigation?

Що таке pagination?

Як створити navigation по sections сторінки?

Як створити link на файл?

Як створити link на image?

Що таке URL encoding?

Для чого використовуються `%20`, `%26`, `%3D`?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке link.

Що таке anchor.

`<a>`.

`href`.

Link text.

Internal links.

External links.

Absolute URLs.

Relative URLs.

Root-relative URLs.

Основи:

    /
    ./
    ../

`<nav>`.

Navigation.

Fragment:

    #id

Page section links.

URL structure.

Основи query parameters.

    ?key=value

Email links:

    mailto:

Telephone links:

    tel:

Download links.

    download

Основи:

    target="_self"
    target="_blank"

Основи:

    rel

Accessibility links.

Keyboard navigation.

Link vs button.

---

🔵 Junior

Розуміння:

    absolute URL
    relative URL
    root-relative URL
    fragment
    query string
    query parameter

Розуміння URL structure:

    scheme
    host
    path
    query
    fragment

Використання:

    target
    rel
    download

Розуміння:

    _self
    _blank
    _parent
    _top

Розуміння:

    noopener
    noreferrer
    nofollow

Створення:

    main navigation
    section navigation
    breadcrumb
    pagination

Accessibility:

    meaningful link text
    keyboard navigation
    focus state

Правильний вибір:

    <a>
    <button>

---

🟠 Middle

Глибше розуміння URL resolution.

Base URL.

`<base>` element.

URL parsing.

URL encoding.

Percent encoding.

Query parameters.

Fragments.

Same-origin policy.

Cross-origin navigation.

Browsing contexts.

Opener relationship.

Link types.

`rel` tokens.

Navigation security.

Download behavior.

External resource relationships.

Accessibility tree.

Accessible names.

Complex navigation structures.

Breadcrumb semantics.

Pagination patterns.

Deep linking.

Client-side routing.

SPA navigation.

History API interaction.

---

🔴 Senior

Глибоке розуміння URL Standard.

URL parsing algorithm.

URL resolution.

Origin.

Same-origin policy.

Cross-origin behavior.

Browsing context model.

Top-level browsing context.

Nested browsing contexts.

Opener / COOP relationships.

Navigation algorithm.

HTTP navigation.

Redirects.

Referrer policy.

Referrer information.

Link types.

Fetch behavior.

Download behavior.

Navigation security.

URL encoding.

Internationalized URLs.

Punycode / IDN.

Fragment navigation.

Text fragments.

Accessibility semantics.

Complex application navigation.

SPA routing architecture.

Server-side routing vs client-side routing.

History API.

Deep linking.

Canonical URLs.

Navigation performance.

Security implications of external links.

---

# Міні-шпаргалка

## Basic link

    <a href="/about">
        About
    </a>

---

## External link

    <a href="https://example.com">
        Example
    </a>

---

## New tab / context

    <a
        href="https://example.com"
        target="_blank"
        rel="noopener"
    >
        Example
    </a>

---

## Navigation

    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
    </nav>

---

## Fragment

    <a href="#contact">
        Contact
    </a>

    <section id="contact">
        <h2>Contact</h2>
    </section>

---

## Email

    <a href="mailto:hello@example.com">
        Email
    </a>

---

## Phone

    <a href="tel:+380441234567">
        Call
    </a>

---

## Download

    <a
        href="/files/file.pdf"
        download
    >
        Download
    </a>

---

## URL

    https://example.com/products?page=2#reviews

    scheme
        https

    host
        example.com

    path
        /products

    query
        page=2

    fragment
        reviews

---

## Link vs Button

    <a href="/profile">
        Profile
    </a>

    → navigation

    <button type="button">
        Save
    </button>

    → action

---

## URL paths

    /about
        → root-relative

    about.html
        → relative

    ./about.html
        → current directory

    ../about.html
        → parent directory

---

## rel

    rel="noopener"
        → opener isolation

    rel="noreferrer"
        → no referrer + noopener behavior

    rel="nofollow"
        → search engine relationship signal

    rel="external"
        → external relationship

---

# Головне:

• `<a>` — основний HTML-елемент для hyperlinks.

• `href` визначає destination.

• Link text повинен бути зрозумілим та описовим.

• Internal link веде до ресурсу в межах сайту.

• External link веде до іншого ресурсу або origin.

• Absolute URL містить повну адресу:

    https://example.com/about

• Relative URL визначається відносно поточного URL.

• Root-relative URL починається з `/`.

• `./` означає поточний relative location.

• `../` дозволяє перейти на parent level.

• `<nav>` використовується для navigation sections.

• Fragment link має вигляд:

    #section

• Fragment navigation працює через відповідний:

    id="section"

• URL може складатися з:

    scheme
    host
    path
    query
    fragment

• Query починається з:

    ?

• Fragment починається з:

    #

• Email link використовує:

    mailto:

• Telephone link використовує:

    tel:

• `download` використовується для download links.

• `target="_blank"` відкриває ресурс у новому browsing context.

• `target="_self"` використовує поточний browsing context.

• `rel` описує relationship між документом і destination.

• `rel="noopener"` допомагає ізолювати destination від opener.

• `rel="noreferrer"` не передає referrer information і також забезпечує noopener-поведінку.

• `rel="nofollow"` є сигналом щодо relationship із search engines.

• Link та button мають різне призначення:

    <a>
        → navigation

    <button>
        → action

• Не потрібно використовувати `<div>` з JavaScript замість `<a>`.

• Не потрібно використовувати `<a>` без `href` як заміну `<button>`.

• Звичайні links підтримують keyboard navigation.

• `Tab` дозволяє перейти до focusable link.

• `Enter` активує link.

• Focus state повинен залишатися видимим.

• Не потрібно використовувати `Click here`, якщо link text може бути конкретнішим.

• Хороший link text описує destination або action.

• Navigation може бути:

    main navigation
    section navigation
    breadcrumb
    pagination
    previous / next navigation

• Links можуть вести:

    до іншої сторінки;
    до іншого сайту;
    до section поточної сторінки;
    до section іншої сторінки;
    до файлу;
    до email;
    до телефону.

• Основна модель:

    <a>
      ↓
    href
      ↓
    URL
      ↓
    browser navigation
      ↓
    destination

• Основна модель fragment navigation:

    href="#contact"
          ↓
    id="contact"
          ↓
    target section

• Основний принцип:

    Link → navigation

    Button → action

• Другий важливий принцип:

    Choose link text by destination,
    not by generic instructions.

• Третій важливий принцип:

    Use semantic HTML for navigation,
    accessibility and browser behavior.