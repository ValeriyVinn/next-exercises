# CSS Decorative Elements

## 1. Що таке Decorative Elements

**Decorative elements (декоративні елементи)** — це візуальні частини інтерфейсу, які покращують дизайн, структуру та сприйняття сторінки, але не є основним semantic content.

До декоративних елементів належать:

- лінії;
- фонові плями;
- кола;
- геометричні фігури;
- декоративні рамки;
- underline;
- accent blocks;
- badges;
- dots;
- patterns;
- overlays;
- decorative icons;
- separators;
- background shapes;
- highlights;
- visual markers.

Для їх створення CSS може використовувати:

- `::before`;
- `::after`;
- `background`;
- `background-image`;
- `linear-gradient()`;
- `radial-gradient()`;
- `border`;
- `border-radius`;
- `box-shadow`;
- `outline`;
- `transform`;
- `opacity`;
- `position`;
- `z-index`;
- CSS variables.

---

# 2. Основна ідея

Декоративний елемент зазвичай:

    HTML content
        ↓
    CSS decoration
        ↓
    visual result

Наприклад:

    <h1 class="title">
        Frontend Developer
    </h1>

CSS:

    .title::after {
        content: "";
        display: block;
        width: 80px;
        height: 4px;
        margin-top: 0.5rem;
        background-color: royalblue;
    }

HTML містить тільки заголовок.

CSS додає декоративну лінію.

---

# 3. Decoration vs Content

Це одна з найважливіших концепцій.

## Content

Це інформація, яка має значення для користувача:

    <h1>Frontend Developer</h1>

    <p>
        Learn HTML and CSS.
    </p>

    <button>
        Submit
    </button>

## Decoration

Це елемент, який допомагає візуально оформити content:

    ::before
    ::after

    background

    border

    shadow

    gradient

Наприклад:

    .title::after {
        content: "";
        width: 4rem;
        height: 3px;
        background: royalblue;
    }

Головне правило:

> **HTML відповідає за content і semantics, CSS — за presentation і decoration.**

---

# 4. Основні способи створення декоративних елементів

Найчастіше використовуються:

    1. ::before
    2. ::after
    3. background
    4. gradients
    5. borders
    6. box-shadow
    7. outline
    8. border-radius
    9. transforms
    10. absolute positioning

На практиці вони часто комбінуються.

---

# 5. `::before` як декоративний елемент

Наприклад, вертикальна accent line:

    .card {
        position: relative;
    }

    .card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background-color: royalblue;
    }

HTML:

    <article class="card">
        <h2>CSS</h2>
        <p>Modern CSS.</p>
    </article>

HTML залишається semantic.

Декоративна смуга створюється CSS.

---

# 6. `::after` для underline

Один із найпоширеніших патернів:

    .title {
        position: relative;
        width: fit-content;
    }

    .title::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -0.5rem;
        width: 60%;
        height: 3px;
        background-color: currentColor;
    }

HTML:

    <h2 class="title">
        About us
    </h2>

---

# 7. Decorative divider

Можна створити горизонтальний separator:

    .divider {
        position: relative;
        text-align: center;
    }

    .divider::before,
    .divider::after {
        content: "";
        display: inline-block;
        width: 80px;
        height: 1px;
        vertical-align: middle;
        background-color: #ccc;
    }

HTML:

    <div class="divider">
        OR
    </div>

Результат концептуально:

    ───────── OR ─────────

---

# 8. Decorative circle

Коло можна створити без HTML-елемента:

    .card {
        position: relative;
        overflow: hidden;
    }

    .card::before {
        content: "";
        position: absolute;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background-color: rgb(65 105 225 / 0.1);
        top: -80px;
        right: -80px;
    }

Основні властивості:

    width
    height
    border-radius
    position
    background

---

# 9. Decorative square

Квадрат:

    .card::after {
        content: "";
        position: absolute;
        width: 80px;
        height: 80px;
        background-color: rgb(65 105 225 / 0.1);
        transform: rotate(45deg);
    }

Комбінація:

    square
        +
    rotate()
        ↓
    diamond shape

---

# 10. Decorative diamond

Для diamond shape:

    .diamond::before {
        content: "";
        position: absolute;
        width: 40px;
        height: 40px;
        background-color: royalblue;
        transform: rotate(45deg);
    }

Не потрібен окремий HTML-елемент.

---

# 11. Decorative dot

Крапка:

    .item {
        position: relative;
        padding-left: 1.5rem;
    }

    .item::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0.6em;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: royalblue;
    }

Це можна використовувати як custom marker.

---

# 12. Decorative status indicator

HTML:

    <div class="status">
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
        background-color: green;
    }

Результат:

    ● Online

---

# 13. Decorative badge

HTML:

    <article class="card">
        <h2>CSS Grid</h2>
    </article>

CSS:

    .card {
        position: relative;
    }

    .card::before {
        content: "NEW";
        position: absolute;
        top: 1rem;
        right: 1rem;
        padding: 0.25rem 0.5rem;
        border-radius: 999px;
        background-color: crimson;
        color: white;
        font-size: 0.75rem;
        font-weight: 700;
    }

Pseudo-element створює badge.

---

# 14. `border` як декоративний елемент

Не всі decorative elements потребують pseudo-elements.

Наприклад:

    .card {
        border: 2px solid #ddd;
        border-radius: 1rem;
    }

Border сам по собі може бути частиною visual design.

---

# 15. Accent border

Можна використовувати одну сторону border:

    .card {
        border-left: 4px solid royalblue;
    }

Або:

    .card {
        border-top: 4px solid royalblue;
    }

Це простий і часто кращий варіант, ніж створювати `::before`.

Правило:

> Не використовуй pseudo-element, якщо звичайний CSS property вирішує задачу простіше.

---

# 16. `border-radius` для декоративних форм

`border-radius` дозволяє створювати:

- кола;
- rounded rectangles;
- pills;
- blobs;
- soft corners.

Коло:

    .circle {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

Pill:

    .badge {
        border-radius: 999px;
    }

---

# 17. `box-shadow` як декоративний елемент

Shadow може бути не тільки тінню.

Його можна використовувати для створення декоративних шарів.

Наприклад:

    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: royalblue;
        box-shadow:
            20px 0 0 royalblue,
            40px 0 0 royalblue;
    }

Один елемент може візуально створити кілька крапок.

---

# 18. Multiple box-shadows

Можна створити декоративний pattern:

    .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: royalblue;

        box-shadow:
            20px 0 royalblue,
            40px 0 royalblue,
            0 20px royalblue,
            20px 20px royalblue,
            40px 20px royalblue;
    }

Це дозволяє створювати прості CSS patterns.

---

# 19. `outline` як декоративний шар

`outline` відрізняється від `border`.

Наприклад:

    .card {
        outline: 2px solid royalblue;
        outline-offset: 6px;
    }

`outline-offset` дозволяє відсунути outline від елемента.

---

# 20. `outline-offset`

Приклад:

    .button {
        outline: 2px solid transparent;
        outline-offset: 4px;
    }

При focus:

    .button:focus-visible {
        outline-color: royalblue;
    }

Це також корисний accessibility-патерн.

---

# 21. Background як декоративний елемент

Background може створювати декоративні шари без додаткових елементів.

Наприклад:

    .hero {
        background:
            radial-gradient(
                circle at top right,
                rgb(65 105 225 / 0.2),
                transparent 40%
            );
    }

Тут decorative shape створюється самим background.

---

# 22. Multiple backgrounds

CSS дозволяє використовувати декілька backgrounds:

    .hero {
        background:
            radial-gradient(
                circle at top right,
                rgb(65 105 225 / 0.2),
                transparent 30%
            ),
            radial-gradient(
                circle at bottom left,
                rgb(220 20 60 / 0.1),
                transparent 35%
            ),
            white;
    }

Один елемент може мати кілька декоративних шарів.

---

# 23. Decorative gradient

Gradient може бути декоративним фоном:

    .section {
        background:
            linear-gradient(
                135deg,
                #f5f7ff,
                #ffffff
            );
    }

Або:

    .card {
        background:
            radial-gradient(
                circle at top right,
                rgb(65 105 225 / 0.15),
                transparent 35%
            );
    }

---

# 24. Gradient stripe

Можна створити декоративну смугу:

    .title::after {
        content: "";
        display: block;
        width: 100px;
        height: 4px;
        margin-top: 0.5rem;
        background:
            linear-gradient(
                to right,
                royalblue,
                crimson
            );
    }

---

# 25. Decorative overlay

Overlay часто використовується поверх image.

HTML:

    <div class="hero">
        <img
            src="hero.jpg"
            alt="Mountain landscape"
        >

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

---

# 26. Gradient Overlay

Замість звичайного кольорового overlay можна використовувати gradient:

    .hero::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
            linear-gradient(
                to bottom,
                transparent,
                rgb(0 0 0 / 0.8)
            );
    }

Це особливо корисно для:

- hero sections;
- cards;
- image galleries;
- article previews.

---

# 27. Decorative blobs

Blob — органічна нерегулярна форма.

Простий варіант:

    .blob {
        width: 300px;
        height: 300px;
        border-radius:
            60% 40% 30% 70%
            / 60% 30% 70% 40%;
    }

З background:

    .blob {
        background-color: rgb(65 105 225 / 0.2);
    }

Комбінація різних значень `border-radius` дозволяє створювати organic shapes.

---

# 28. Decorative shape with `clip-path`

`clip-path` дозволяє створювати геометричні форми.

Трикутник:

    .triangle {
        width: 100px;
        height: 100px;
        background-color: royalblue;

        clip-path: polygon(
            50% 0,
            100% 100%,
            0 100%
        );
    }

Це корисно для:

- triangles;
- polygons;
- badges;
- decorative blocks;
- modern UI shapes.

---

# 29. `clip-path` як декоративний інструмент

Наприклад:

    .hero::after {
        content: "";
        position: absolute;
        inset: auto 0 0;
        height: 120px;
        background-color: white;

        clip-path: polygon(
            0 70%,
            100% 0,
            100% 100%,
            0 100%
        );
    }

Це дозволяє створити нестандартний перехід між секціями.

---

# 30. Decorative section divider

Секції можна візуально розділяти без `<hr>`:

    .section {
        position: relative;
    }

    .section::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 80%;
        height: 1px;
        transform: translateX(-50%);
        background-color: #ddd;
    }

---

# 31. Decorative corner

Можна створити декоративний кут:

    .card {
        position: relative;
        overflow: hidden;
    }

    .card::after {
        content: "";
        position: absolute;
        top: -50px;
        right: -50px;
        width: 100px;
        height: 100px;
        background-color: royalblue;
        transform: rotate(45deg);
    }

---

# 32. Decorative corner with gradient

    .card::after {
        content: "";
        position: absolute;
        top: -60px;
        right: -60px;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background:
            linear-gradient(
                135deg,
                royalblue,
                transparent
            );
    }

---

# 33. Decorative glow

Glow можна створити через `box-shadow`.

    .glow {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: royalblue;

        box-shadow:
            0 0 30px
            rgb(65 105 225 / 0.5);
    }

Або через pseudo-element:

    .card {
        position: relative;
    }

    .card::before {
        content: "";
        position: absolute;
        inset: -50px;
        border-radius: 50%;
        background-color: rgb(65 105 225 / 0.15);
        filter: blur(40px);
    }

---

# 34. Decorative shadow layer

Можна створити декоративну "тінь" через pseudo-element:

    .card {
        position: relative;
        z-index: 0;
    }

    .card::after {
        content: "";
        position: absolute;
        inset: 10px;
        z-index: -1;
        background-color: #ddd;
        transform: translateY(12px);
        border-radius: inherit;
    }

Це створює control над shadow layer.

---

# 35. `filter: blur()`

Blur можна використовувати для декоративного glow:

    .background-glow {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background-color: royalblue;
        filter: blur(60px);
        opacity: 0.3;
    }

Такі елементи часто використовуються в modern landing pages.

---

# 36. Decorative background shapes

Комбінація:

    position
    border-radius
    background
    filter
    opacity
    transform

дозволяє створювати декоративний background:

    .hero {
        position: relative;
        overflow: hidden;
    }

    .hero::before {
        content: "";
        position: absolute;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background-color: rgb(65 105 225 / 0.15);
        filter: blur(20px);
        top: -100px;
        right: -100px;
    }

---

# 37. Decorative dots pattern

CSS gradients можна використовувати для створення pattern:

    .pattern {
        background-image:
            radial-gradient(
                circle,
                #999 1px,
                transparent 1px
            );

        background-size: 20px 20px;
    }

Це створює repeating dot pattern.

---

# 38. Grid pattern

Можна створити grid:

    .grid-pattern {
        background-image:
            linear-gradient(
                #ddd 1px,
                transparent 1px
            ),
            linear-gradient(
                90deg,
                #ddd 1px,
                transparent 1px
            );

        background-size: 40px 40px;
    }

Це корисно для:

- hero backgrounds;
- dashboards;
- design portfolios;
- technical websites.

---

# 39. Stripe pattern

Можна створити diagonal stripes:

    .stripes {
        background:
            repeating-linear-gradient(
                45deg,
                #eee 0,
                #eee 10px,
                #fff 10px,
                #fff 20px
            );
    }

---

# 40. Decorative text highlight

Pseudo-element можна використовувати для highlight під текстом:

    .highlight {
        position: relative;
        z-index: 0;
    }

    .highlight::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 40%;
        background-color: gold;
        z-index: -1;
    }

HTML:

    <span class="highlight">
        important
    </span>

---

# 41. Animated highlight

Highlight можна анімувати:

    .highlight::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0;
        height: 40%;
        background-color: gold;
        transition: width 0.3s ease;
        z-index: -1;
    }

    .highlight:hover::after {
        width: 100%;
    }

---

# 42. Decorative underline animation

HTML:

    <a class="link" href="#">
        Learn CSS
    </a>

CSS:

    .link {
        position: relative;
    }

    .link::after {
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

    .link:hover::after {
        transform: scaleX(1);
    }

Це один із базових patterns modern UI.

---

# 43. Decorative icon

Проста іконка може бути створена через pseudo-element:

    .external-link::after {
        content: "↗";
        margin-left: 0.25rem;
    }

HTML:

    <a class="external-link" href="#">
        Documentation
    </a>

Для складних іконок краще розглянути SVG або icon library.

---

# 44. Decorative arrow

CSS arrow:

    .arrow::after {
        content: "";
        display: inline-block;
        width: 8px;
        height: 8px;
        margin-left: 0.5rem;
        border-right: 2px solid currentColor;
        border-bottom: 2px solid currentColor;
        transform: rotate(-45deg);
    }

---

# 45. Decorative plus icon

Можна створити плюс через два pseudo-elements:

    .plus {
        position: relative;
        width: 24px;
        height: 24px;
    }

    .plus::before,
    .plus::after {
        content: "";
        position: absolute;
        background-color: currentColor;
    }

    .plus::before {
        width: 100%;
        height: 2px;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
    }

    .plus::after {
        width: 2px;
        height: 100%;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
    }

---

# 46. Decorative close icon

Аналогічно можна створити `×`:

    .close {
        position: relative;
        width: 24px;
        height: 24px;
    }

    .close::before,
    .close::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: currentColor;
    }

    .close::before {
        transform: rotate(45deg);
    }

    .close::after {
        transform: rotate(-45deg);
    }

---

# 47. Decorative quotation marks

    .quote {
        position: relative;
        padding-left: 3rem;
    }

    .quote::before {
        content: "“";
        position: absolute;
        left: 0;
        top: -0.5rem;
        font-size: 4rem;
        line-height: 1;
    }

---

# 48. Decorative number

Наприклад, номер секції:

    .section {
        position: relative;
    }

    .section::before {
        content: "01";
        position: absolute;
        top: 0;
        left: 0;
        font-size: 4rem;
        font-weight: 700;
        opacity: 0.1;
    }

Це часто використовується в editorial та portfolio design.

---

# 49. Використання `attr()` для декоративного content

HTML:

    <div
        class="card"
        data-number="01"
    >
        <h2>Introduction</h2>
    </div>

CSS:

    .card::before {
        content: attr(data-number);
        font-size: 3rem;
        font-weight: 700;
        opacity: 0.1;
    }

`attr()` дозволяє отримати значення HTML-атрибута.

---

# 50. CSS Variables для decoration

Зручно створювати reusable decoration через custom properties:

    .card {
        --accent: royalblue;
        position: relative;
    }

    .card::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background-color: var(--accent);
    }

Інша картка:

    .card--danger {
        --accent: crimson;
    }

Той самий CSS працює з іншим accent color.

---

# 51. `currentColor` для reusable decoration

Замість:

    background-color: royalblue;

можна використовувати:

    background-color: currentColor;

Наприклад:

    .link {
        color: royalblue;
    }

    .link::after {
        background-color: currentColor;
    }

Якщо зміниться:

    color

то автоматично зміниться і декоративна лінія.

---

# 52. Decorative element з `opacity`

Opacity дозволяє зробити decoration менш помітною:

    .card::before {
        content: "";
        opacity: 0.1;
    }

Наприклад:

    .section::before {
        content: "CSS";
        font-size: 10rem;
        font-weight: 700;
        opacity: 0.05;
    }

Це може створювати background typography effect.

---

# 53. Decorative typography

Великі напівпрозорі літери:

    .section {
        position: relative;
    }

    .section::before {
        content: "01";
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 10rem;
        font-weight: 900;
        opacity: 0.05;
        pointer-events: none;
    }

Важливо:

    pointer-events: none;

щоб decoration не заважала взаємодії.

---

# 54. `overflow: hidden`

Якщо декоративна форма виходить за межі контейнера:

    .card {
        overflow: hidden;
    }

Наприклад:

    .card::before {
        content: "";
        position: absolute;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        top: -100px;
        right: -100px;
    }

`overflow: hidden` обрізає частину, яка виходить за межі card.

---

# 55. `overflow: clip`

У сучасному CSS для clipping також можна використовувати:

    overflow: clip;

Наприклад:

    .hero {
        overflow: clip;
    }

Це може бути доречним для purely decorative overflow, коли не потрібен scroll container.

---

# 56. `isolation: isolate`

Коли декоративні pseudo-elements використовують негативний `z-index`, може бути корисним:

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

`isolation: isolate` створює окремий stacking context.

---

# 57. Decorative element + `pointer-events`

Декоративний шар не повинен блокувати UI:

    .hero::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
    }

Це особливо важливо для:

- links;
- buttons;
- cards;
- overlays;
- interactive components.

---

# 58. Decorative element + `transform`

Transforms дозволяють створювати багато простих форм:

    rotate()
    scale()
    translate()
    skew()

Наприклад:

    .decor::before {
        content: "";
        transform: rotate(45deg);
    }

Або:

    .decor::after {
        content: "";
        transform: scale(1.2);
    }

---

# 59. Decorative element + transition

Decoration можна анімувати:

    .card::before {
        content: "";
        transform: scale(0);
        transition: transform 0.3s ease;
    }

    .card:hover::before {
        transform: scale(1);
    }

---

# 60. Decorative element + `transform-origin`

Для контролю точки анімації:

    .link::after {
        transform-origin: left;
        transform: scaleX(0);
    }

    .link:hover::after {
        transform: scaleX(1);
    }

Можна використовувати:

    left
    center
    right

або координати:

    0% 50%
    100% 50%

---

# 61. Decorative element + `prefers-reduced-motion`

Якщо decoration має animation, потрібно враховувати accessibility.

Наприклад:

    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms;
            animation-iteration-count: 1;
            transition-duration: 0.01ms;
        }
    }

Особливо важливо для складних декоративних animations.

---

# 62. Не кожна decoration повинна бути `::before`

Наприклад, якщо достатньо:

    border-left: 4px solid royalblue;

не потрібно створювати:

    ::before

Якщо достатньо:

    background: linear-gradient(...);

не потрібно створювати додатковий `<div>`.

Якщо потрібна складна semantic icon:

    SVG

може бути кращим рішенням.

---

# 63. Коли використовувати `::before` / `::after`

Використовуй їх, коли:

- потрібен додатковий visual layer;
- decoration повинна бути прив'язана до компонента;
- не хочеться додавати зайвий HTML;
- потрібна animation;
- потрібен overlay;
- потрібна accent shape;
- потрібна decorative icon.

---

# 64. Коли використовувати `background`

Background кращий, коли:

- decoration є частиною фону;
- потрібен gradient;
- потрібен pattern;
- потрібні multiple backgrounds;
- не потрібно окремого positioning layer.

Наприклад:

    .hero {
        background:
            radial-gradient(
                circle at top right,
                rgb(65 105 225 / 0.2),
                transparent 30%
            );
    }

---

# 65. Коли використовувати окремий HTML-елемент

Окремий HTML element краще використовувати, коли об'єкт:

- має semantic meaning;
- є interactive;
- має власний content;
- повинен бути доступним;
- бере участь у layout;
- складно керується через pseudo-element.

Наприклад:

    <button class="menu-button">
        <span class="menu-button__icon"></span>
        Menu
    </button>

Якщо icon має складну структуру або accessibility significance, окремий element/SVG може бути кращим.

---

# 66. Decoration та Accessibility

Декоративний елемент не повинен створювати перешкоди для користувача.

Корисні прийоми:

    pointer-events: none;

    aria-hidden="true"

Але `aria-hidden` застосовується до **HTML-елементів**, а не до самого CSS pseudo-element.

Для decorative HTML icon:

    <span aria-hidden="true">
        ★
    </span>

Для CSS decoration достатньо правильно організувати presentation layer.

---

# 67. Не ховай важливий текст у `content`

Погано:

    .error::before {
        content: "Invalid email address";
    }

Краще:

    <p class="error">
        Invalid email address
    </p>

Тоді текст є частиною HTML content і може бути правильно оброблений accessibility tools.

---

# 68. Декоративні елементи та responsive design

Decoration повинна адаптуватися до розміру viewport.

Наприклад:

    .hero::before {
        width: 300px;
        height: 300px;
    }

На mobile:

    @media (max-width: 600px) {
        .hero::before {
            width: 180px;
            height: 180px;
        }
    }

Не дозволяй декоративним елементам:

- перекривати content;
- створювати horizontal overflow;
- робити текст нечитабельним;
- блокувати interaction.

---

# 69. Decorative elements і horizontal overflow

Поширена проблема:

    .hero::before {
        position: absolute;
        width: 500px;
        height: 500px;
        right: -300px;
    }

Decoration може створити horizontal overflow.

Перевір:

    overflow-x: hidden;

Але краще спочатку зрозуміти причину overflow і правильно контролювати декоративний шар.

---

# 70. Типові помилки

## Помилка 1 — занадто багато decoration

Проблема:

    decoration
    decoration
    decoration
    decoration
    decoration

Результат:

- visual noise;
- складніша підтримка;
- погіршення readability.

Правило:

> Decoration повинна підтримувати content, а не конкурувати з ним.

---

## Помилка 2 — decoration перекриває content

Потрібно перевірити:

    z-index
    position
    pointer-events

---

## Помилка 3 — зайвий HTML

Погано:

    <div class="card">
        <div class="card__decoration"></div>
        <h2>Title</h2>
    </div>

Якщо decoration не має semantic meaning, можливо, краще:

    .card::before

---

## Помилка 4 — pseudo-element використовується для semantic content

Не варто робити:

    content: "Important information";

як основний інформаційний текст.

---

## Помилка 5 — забутий `position: relative`

Якщо використовуєш:

    position: absolute;

перевір containing block.

Часто потрібно:

    .parent {
        position: relative;
    }

---

## Помилка 6 — decoration блокує interaction

Використовуй:

    pointer-events: none;

для purely decorative overlays, якщо вони не повинні приймати pointer events.

---

# 71. Патерн: Card Decoration

Базовий reusable pattern:

    .card {
        position: relative;
        overflow: hidden;
    }

    .card::before {
        content: "";
        position: absolute;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        top: -100px;
        right: -100px;
        background-color: rgb(65 105 225 / 0.1);
        pointer-events: none;
    }

---

# 72. Патерн: Accent Line

    .card {
        position: relative;
        padding-left: 1.5rem;
    }

    .card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        border-radius: 999px;
        background-color: royalblue;
    }

---

# 73. Патерн: Animated Underline

    .link {
        position: relative;
    }

    .link::after {
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

    .link:hover::after {
        transform: scaleX(1);
    }

---

# 74. Патерн: Background Glow

    .section {
        position: relative;
        overflow: hidden;
    }

    .section::before {
        content: "";
        position: absolute;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background-color: rgb(65 105 225 / 0.15);
        filter: blur(50px);
        top: -100px;
        right: -100px;
        pointer-events: none;
    }

---

# 75. Патерн: Hero Overlay

    .hero {
        position: relative;
    }

    .hero::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
            linear-gradient(
                to bottom,
                transparent,
                rgb(0 0 0 / 0.75)
            );
        pointer-events: none;
    }

    .hero__content {
        position: relative;
        z-index: 1;
    }

---

# 76. Патерн: Decorative Number

    .section {
        position: relative;
    }

    .section::before {
        content: attr(data-number);
        position: absolute;
        top: 0;
        right: 0;
        font-size: 8rem;
        font-weight: 900;
        line-height: 1;
        opacity: 0.05;
        pointer-events: none;
    }

HTML:

    <section
        class="section"
        data-number="01"
    >
        <h2>Introduction</h2>
    </section>

---

# 77. Патерн: Gradient Border

Один із способів створення gradient border:

    .card {
        border: 2px solid transparent;
        background:
            linear-gradient(white, white) padding-box,
            linear-gradient(
                135deg,
                royalblue,
                crimson
            ) border-box;
        border-radius: 1rem;
    }

Тут використовуються два background layers:

    padding-box
    border-box

---

# 78. Патерн: Double Border

Через pseudo-element:

    .card {
        position: relative;
        border: 1px solid #ddd;
    }

    .card::before {
        content: "";
        position: absolute;
        inset: 6px;
        border: 1px solid #ddd;
        pointer-events: none;
    }

Це створює подвійний декоративний border.

---

# 79. Патерн: Corner Brackets

Декоративні corner brackets можна створювати через два pseudo-elements:

    .frame {
        position: relative;
    }

    .frame::before {
        content: "";
        position: absolute;
        inset: 0;
        border-top: 2px solid currentColor;
        border-left: 2px solid currentColor;
        pointer-events: none;
    }

    .frame::after {
        content: "";
        position: absolute;
        inset: 0;
        border-right: 2px solid currentColor;
        border-bottom: 2px solid currentColor;
        pointer-events: none;
    }

---

# 80. Підхід до побудови Decorative Element

Коли потрібно створити decoration, можна мислити послідовно:

### Крок 1 — визначити тип

Це:

    line
    circle
    square
    overlay
    glow
    pattern
    icon
    border
    shadow

### Крок 2 — вибрати інструмент

    border
    background
    gradient
    ::before
    ::after
    box-shadow
    clip-path

### Крок 3 — визначити positioning

    static
    relative
    absolute

### Крок 4 — визначити форму

    width
    height
    border-radius
    clip-path
    transform

### Крок 5 — визначити visual style

    background
    color
    opacity
    box-shadow
    filter

### Крок 6 — перевірити interaction

    pointer-events
    z-index

### Крок 7 — перевірити responsive

    mobile
    tablet
    desktop

---

# 81. Як вибрати правильний CSS-інструмент

Можна використовувати таку ментальну таблицю:

    Лінія
        → border / pseudo-element

    Фон
        → background / gradient

    Коло
        → border-radius

    Glow
        → box-shadow / filter

    Overlay
        → pseudo-element / gradient

    Pattern
        → repeating-gradient

    Геометрична форма
        → clip-path / transform

    Маленька іконка
        → pseudo-element / SVG

    Semantic icon
        → HTML / SVG

    Важливий текст
        → HTML

---

# 82. Що потрібно знати на рівні Core

Потрібно розуміти:

- що таке decorative element;
- різницю між content і decoration;
- `::before`;
- `::after`;
- `background`;
- `border`;
- `border-radius`;
- `box-shadow`;
- `opacity`;
- `position`;
- `transform`.

---

# 83. Що потрібно знати на рівні Junior

Вміти самостійно створювати:

- underline;
- accent line;
- decorative circle;
- badge;
- dot;
- overlay;
- gradient decoration;
- card decoration;
- image overlay;
- custom arrow;
- simple CSS icon;
- decorative section divider;
- animated decoration.

Також добре розуміти:

    z-index
    pointer-events
    overflow
    currentColor
    CSS variables

---

# 84. Що потрібно знати на рівні Middle

Розуміти:

- stacking contexts;
- `isolation`;
- `clip-path`;
- multiple backgrounds;
- gradient patterns;
- reusable decorative patterns;
- responsive decorations;
- accessibility;
- animation performance;
- `prefers-reduced-motion`;
- component architecture.

Вміти вирішити:

> Чи потрібен тут pseudo-element, background, SVG або справжній HTML element?

---

# 85. Що потрібно знати на рівні Senior

Senior повинен оцінювати decoration не тільки з точки зору "як зробити", але й:

- чи потрібна вона;
- чи не заважає accessibility;
- чи не створює layout problems;
- чи не створює overflow;
- чи не ускладнює component;
- чи reusable рішення;
- чи зрозумілий CSS;
- чи не створює зайвих stacking contexts;
- чи не впливає негативно на performance.

Головний принцип:

> **Найкраща decoration — та, яка покращує UI, але залишається майже непомітною з точки зору структури коду.**

---

# 86. Питання для співбесіди

### 1. Що таке decorative element?

Візуальний елемент інтерфейсу, який покращує presentation, але не є основним semantic content.

---

### 2. Які CSS-інструменти можна використовувати для decoration?

Наприклад:

    ::before
    ::after
    background
    gradients
    border
    box-shadow
    outline
    transform
    clip-path

---

### 3. Коли використовувати pseudo-element?

Коли потрібен додатковий visual layer, який не має власного semantic meaning.

---

### 4. Коли краще використати background?

Коли decoration є частиною фону компонента і не потребує окремого positioning layer.

---

### 5. Чому не потрібно створювати HTML для кожної decoration?

Тому що decorative content не повинен без необхідності ускладнювати semantic structure.

---

### 6. Чому decoration може блокувати кнопку?

Тому що positioned element або pseudo-element може знаходитися поверх кнопки та приймати pointer events.

Рішення:

    pointer-events: none;

---

### 7. Для чого потрібен `z-index`?

Для керування порядком розташування елементів у stacking context.

---

### 8. Для чого потрібен `overflow: hidden`?

Для обрізання частини декоративного елемента, яка виходить за межі контейнера.

---

### 9. Що таке `currentColor`?

Значення поточного `color` елемента.

---

### 10. Чому важливо не використовувати decoration для semantic content?

Тому що CSS presentation не повинен замінювати semantic HTML та важливу інформацію.

---

# 87. Практична вправа 1 — Card Decoration

Створи card:

    <article class="card">
        <h2>HTML</h2>
        <p>Structure of the web.</p>
    </article>

Додай через `::before`:

- круг;
- позиціонування у верхньому правому куті;
- частковий вихід за межі card;
- `overflow: hidden`.

---

# 88. Практична вправа 2 — Decorative Title

Створи:

    <h1 class="title">
        CSS Architecture
    </h1>

Через `::after` додай:

- accent line;
- ширину `80px`;
- висоту `4px`;
- rounded corners.

---

# 89. Практична вправа 3 — Hero Overlay

Створи hero з image та text.

Через `::before` зроби:

    transparent
        ↓
    dark gradient

Так, щоб текст залишався поверх overlay.

---

# 90. Практична вправа 4 — Background Pattern

Створи section з dotted background через:

    radial-gradient()

Не використовуй:

    <div class="dot"></div>

для кожної крапки.

---

# 91. Практична вправа 5 — Animated Decoration

Створи button:

    <button class="button">
        Learn more
    </button>

При hover декоративний background повинен:

    scaleX(0)
        ↓
    scaleX(1)

Використай:

    ::before
    transform
    transition
    transform-origin

---

# 92. Практична вправа 6 — Decorative Number

Створи:

    <section
        class="section"
        data-number="01"
    >
        <h2>HTML Foundations</h2>
    </section>

Через:

    content: attr(data-number);

створи велику напівпрозору цифру на фоні.

---

# 93. Практична вправа 7 — CSS Shape

Створи декоративний triangle через:

    clip-path: polygon(...);

Не використовуй SVG.

---

# 94. Практична вправа 8 — Glow

Створи decorative glow:

    width
    height
    border-radius
    background
    filter: blur()
    opacity

Потім помісти його в hero section через `::before`.

---

# 95. Практична вправа 9 — Grid Background

Створи background grid через два:

    linear-gradient()

Один gradient повинен створювати вертикальні лінії.

Другий — горизонтальні.

---

# 96. Практична вправа 10 — Design System Decoration

Створи reusable component:

    .decorative-line

і через CSS variables дозволь змінювати:

    --color
    --width
    --height

Наприклад:

    .decorative-line {
        --color: royalblue;
        --width: 80px;
        --height: 4px;

        width: var(--width);
        height: var(--height);
        background-color: var(--color);
    }

---

# 97. Mini Cheat Sheet

    /* Pseudo-element */

    .element::before {
        content: "";
    }

    .element::after {
        content: "";
    }


    /* Absolute decoration */

    .element {
        position: relative;
    }

    .element::before {
        content: "";
        position: absolute;
        inset: 0;
    }


    /* Circle */

    .circle {
        border-radius: 50%;
    }


    /* Pill */

    .badge {
        border-radius: 999px;
    }


    /* Accent line */

    .title::after {
        content: "";
        display: block;
        width: 80px;
        height: 4px;
        background-color: currentColor;
    }


    /* Overlay */

    .hero::before {
        content: "";
        position: absolute;
        inset: 0;
        background: rgb(0 0 0 / 0.4);
    }


    /* Glow */

    .glow {
        border-radius: 50%;
        filter: blur(50px);
        opacity: 0.3;
    }


    /* Don't block clicks */

    .decoration {
        pointer-events: none;
    }


    /* Clip decoration */

    .container {
        overflow: hidden;
    }


    /* CSS shape */

    .triangle {
        clip-path: polygon(
            50% 0,
            100% 100%,
            0 100%
        );
    }


    /* Current color */

    .element::after {
        background-color: currentColor;
    }


    /* CSS variable */

    .element {
        --accent: royalblue;
    }

    .element::before {
        background-color: var(--accent);
    }

---

# 98. Головна ментальна модель

Коли бачиш дизайн-макет і потрібно реалізувати decorative element, подумай:

    Що це?
        ↓
    line / circle / glow / pattern / overlay
        ↓
    Чи має воно semantic meaning?
        ↓
    НІ
        ↓
    CSS decoration
        ↓
    Вибір інструмента
        ↓
    border / background / gradient /
    pseudo-element / shadow / clip-path
        ↓
    positioning
        ↓
    responsive
        ↓
    accessibility
        ↓
    interaction
        ↓
    готовий component

---

# 99. Що запам'ятати

1. Decorative element — це presentation, а не основний content.
2. Не потрібно створювати HTML element для кожної decoration.
3. `::before` і `::after` — основні інструменти для додаткових visual layers.
4. `background` добре підходить для background decoration.
5. `gradient` дозволяє створювати складні фони без додаткового HTML.
6. `border` часто є найпростішим способом створити line або frame.
7. `border-radius` дозволяє створювати circles і rounded shapes.
8. `box-shadow` можна використовувати не тільки як shadow, а й як decoration.
9. `clip-path` дозволяє створювати геометричні форми.
10. `transform` дозволяє обертати, масштабувати та переміщати decoration.
11. `opacity` дозволяє зробити decoration ненав'язливою.
12. `filter: blur()` корисний для glow effects.
13. `position: relative` часто потрібен батьківському елементу.
14. `position: absolute` зручний для independent decorative layers.
15. `z-index` керує порядком шарів.
16. `pointer-events: none` допомагає зробити decoration non-interactive.
17. `overflow: hidden` або `overflow: clip` може обрізати decoration.
18. `currentColor` робить decoration залежною від кольору компонента.
19. CSS variables роблять decoration reusable.
20. Decoration не повинна погіршувати accessibility.
21. Важливий content повинен залишатися в HTML.
22. Не потрібно використовувати pseudo-element, якщо простіший `border` або `background` вирішує задачу.
23. Decoration повинна адаптуватися до mobile.
24. Decoration не повинна створювати небажаний horizontal overflow.
25. Хороший decorative CSS покращує дизайн, але не ускладнює структуру.

---

# 100. Підсумок

**Decorative Elements** — це практичне застосування багатьох можливостей CSS для створення сучасного UI без зайвого HTML.

Основні інструменти:

    ::before
    ::after
    background
    gradients
    border
    border-radius
    box-shadow
    outline
    transform
    clip-path
    opacity
    filter
    position
    z-index

Найважливіші комбінації:

    ::before
        +
    position: absolute
        +
    background
        +
    transform

та:

    ::after
        +
    transition
        +
    transform
        +
    :hover

А для сучасних декоративних backgrounds:

    linear-gradient()
    radial-gradient()
    repeating-linear-gradient()

Головний принцип:

> **Спочатку semantic HTML, потім CSS presentation.**

Якщо елемент є лише decoration — CSS є природним місцем для його реалізації.

Якщо елемент містить важливу інформацію, має semantic meaning або повинен бути interactive — краще використовувати реальний HTML element або SVG.

У результаті хороший CSS дозволяє створювати складний і сучасний visual design, залишаючи HTML простим, semantic та зрозумілим.