# 03. Mobile First

## 📌 Що таке Mobile First

**Mobile First** — це підхід до розробки адаптивного інтерфейсу, за якого спочатку створюється версія сайту для маленьких екранів, а потім за допомогою `@media` поступово додаються стилі для більших екранів.

Ідея проста:

    mobile → tablet → desktop → large desktop

Тобто базовий CSS пишеться для мобільного екрана, а стилі для більших екранів додаються через `min-width`.

Наприклад:

    .container {
        width: 100%;
        padding: 16px;
    }

    @media (min-width: 768px) {
        .container {
            max-width: 720px;
            margin: 0 auto;
        }
    }

    @media (min-width: 1200px) {
        .container {
            max-width: 1140px;
        }
    }

---

# 1. Навіщо потрібен Mobile First

Mobile First допомагає створювати інтерфейси, які:

- добре працюють на смартфонах;
- поступово розширюються на планшетах;
- адаптуються до desktop;
- мають менше зайвого CSS;
- легше підтримуються;
- краще працюють на пристроях з обмеженим екраном;
- змушують спочатку визначити найважливіший контент і функціональність.

Головний принцип:

> Спочатку мінімально необхідний інтерфейс, потім поступове розширення.

---

# 2. Mobile First ≠ "робити сайт тільки для телефону"

Mobile First не означає, що desktop-версія другорядна.

Це означає лише **порядок проєктування і написання CSS**:

    1. mobile
    2. tablet
    3. desktop
    4. large desktop

Наприклад, одна картка може виглядати так:

    Mobile:

    ┌───────────────────┐
    │       IMAGE       │
    ├───────────────────┤
    │ Title             │
    │ Description       │
    │ Button            │
    └───────────────────┘

    Desktop:

    ┌───────────┬─────────────────────┐
    │   IMAGE   │ Title               │
    │           │ Description         │
    │           │ Button              │
    └───────────┴─────────────────────┘

Ми не створюємо два різних компоненти.

Ми створюємо один компонент і змінюємо його layout через CSS.

---

# 3. Основний принцип Mobile First

Базові стилі повинні працювати на маленькому екрані.

Потім через `min-width` додаються стилі для більших екранів.

    .card {
        padding: 16px;
        display: block;
    }

    @media (min-width: 768px) {
        .card {
            display: flex;
            gap: 24px;
        }
    }

Тут:

- без `@media` → mobile;
- `768px+` → tablet / larger;
- desktop успадковує стилі від mobile і tablet.

---

# 4. Mobile First використовує `min-width`

Це одна з головних ознак Mobile First.

### Mobile First

    .title {
        font-size: 24px;
    }

    @media (min-width: 768px) {
        .title {
            font-size: 32px;
        }
    }

    @media (min-width: 1200px) {
        .title {
            font-size: 40px;
        }
    }

Читається:

    за замовчуванням → 24px
    від 768px → 32px
    від 1200px → 40px

---

# 5. Чому `min-width`, а не `max-width`

У Mobile First ми рухаємось від малого до великого.

Тому логіка:

    mobile
       ↓
    min-width: 768px
       ↓
    min-width: 1200px

Наприклад:

    .navigation {
        display: none;
    }

    @media (min-width: 768px) {
        .navigation {
            display: flex;
        }
    }

На mobile навігація прихована.

На ширині `768px` і більше вона стає видимою.

---

# 6. Mobile First vs Desktop First

## Mobile First

Спочатку mobile:

    .container {
        padding: 16px;
    }

    @media (min-width: 768px) {
        .container {
            padding: 24px;
        }
    }

    @media (min-width: 1200px) {
        .container {
            padding: 32px;
        }
    }

---

## Desktop First

Спочатку desktop:

    .container {
        padding: 32px;
    }

    @media (max-width: 1199px) {
        .container {
            padding: 24px;
        }
    }

    @media (max-width: 767px) {
        .container {
            padding: 16px;
        }
    }

Для сучасного responsive development часто зручно використовувати Mobile First.

---

# 7. Базовий CSS = Mobile

У Mobile First не потрібно писати:

    @media (max-width: 767px) {
        ...
    }

для кожного мобільного правила.

Мобільні стилі є **базовими**.

Правильно:

    .card {
        display: block;
        padding: 16px;
    }

    @media (min-width: 768px) {
        .card {
            display: flex;
        }
    }

Не потрібно:

    .card {
        display: flex;
        padding: 32px;
    }

    @media (max-width: 767px) {
        .card {
            display: block;
            padding: 16px;
        }
    }

---

# 8. Принцип "Progressive Enhancement"

Mobile First добре поєднується з ідеєю **Progressive Enhancement**.

Спочатку створюємо просту функціональну версію.

Потім поступово додаємо можливості:

    basic layout
          ↓
    tablet layout
          ↓
    desktop layout
          ↓
    large desktop enhancements

Наприклад:

    .cards {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
    }

    @media (min-width: 768px) {
        .cards {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 1200px) {
        .cards {
            grid-template-columns: repeat(3, 1fr);
        }
    }

Отримуємо:

    mobile  → 1 колонка
    tablet  → 2 колонки
    desktop → 3 колонки

---

# 9. Mobile First і CSS Cascade

Mobile First добре використовує каскад CSS.

Базове правило:

    .card {
        padding: 16px;
        border-radius: 8px;
    }

Пізніше ми змінюємо тільки те, що потрібно:

    @media (min-width: 768px) {
        .card {
            padding: 24px;
        }
    }

Не потрібно повторювати:

    .card {
        border-radius: 8px;
    }

якщо це значення залишається однаковим.

Тобто:

> На наступному breakpoint змінюємо тільки те, що дійсно змінюється.

---

# 10. Не дублюй CSS

❌ Надлишковий варіант:

    .card {
        padding: 16px;
        background: white;
        border-radius: 8px;
        color: #222;
    }

    @media (min-width: 768px) {
        .card {
            padding: 24px;
            background: white;
            border-radius: 8px;
            color: #222;
        }
    }

✅ Кращий варіант:

    .card {
        padding: 16px;
        background: white;
        border-radius: 8px;
        color: #222;
    }

    @media (min-width: 768px) {
        .card {
            padding: 24px;
        }
    }

---

# 11. Breakpoints у Mobile First

Breakpoint — це ширина viewport, на якій layout змінюється.

Наприклад:

    mobile
    0 ─────────────── 767px

    tablet
    768 ───────────── 1199px

    desktop
    1200px+

Можна написати:

    @media (min-width: 768px) {
        ...
    }

    @media (min-width: 1200px) {
        ...
    }

Але:

> Breakpoint не повинен вибиратися тільки тому, що існує певна модель телефону або планшета.

Краще визначати breakpoint за тим, **коли контент перестає нормально виглядати**.

---

# 12. Breakpoint від контенту

Погано:

    @media (min-width: 768px) {
        ...
    }

тільки тому, що "768 — це планшет".

Краще:

> Layout повинен змінюватися тоді, коли поточний layout перестає бути зручним.

Наприклад, маємо navigation:

    Home | About | Services | Portfolio | Contact

Якщо меню перестає поміщатися:

    Home | About | Services | Port...

тоді настав час для breakpoint.

---

# 13. Типовий набір breakpoints

У навчальних проєктах можна використовувати, наприклад:

    480px
    768px
    1024px
    1200px
    1440px

Але це не закон.

Наприклад:

    .container {
        width: 100%;
    }

    @media (min-width: 768px) {
        .container {
            max-width: 720px;
            margin: 0 auto;
        }
    }

    @media (min-width: 1200px) {
        .container {
            max-width: 1140px;
        }
    }

У реальному проєкті breakpoints повинні відповідати дизайну і контенту.

---

# 14. Не створюй занадто багато breakpoints

❌ Погано:

    @media (min-width: 375px) { ... }

    @media (min-width: 390px) { ... }

    @media (min-width: 414px) { ... }

    @media (min-width: 430px) { ... }

    @media (min-width: 480px) { ... }

    @media (min-width: 540px) { ... }

    @media (min-width: 600px) { ... }

Це може зробити CSS складним для підтримки.

Краще мати кілька логічних точок:

    base
    ↓
    768px
    ↓
    1024px
    ↓
    1200px

і додавати breakpoint тільки тоді, коли він дійсно потрібний.

---

# 15. Mobile First для контейнера

Один із найтиповіших прикладів:

    .container {
        width: 100%;
        padding-inline: 16px;
        margin-inline: auto;
    }

    @media (min-width: 768px) {
        .container {
            max-width: 720px;
            padding-inline: 24px;
        }
    }

    @media (min-width: 1200px) {
        .container {
            max-width: 1140px;
            padding-inline: 32px;
        }
    }

---

# 16. Mobile First для Grid

На mobile:

    .products {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
    }

На tablet:

    @media (min-width: 768px) {
        .products {
            grid-template-columns: repeat(2, 1fr);
        }
    }

На desktop:

    @media (min-width: 1200px) {
        .products {
            grid-template-columns: repeat(4, 1fr);
        }
    }

Результат:

    mobile  → 1
    tablet  → 2
    desktop → 4

---

# 17. Mobile First для Flexbox

Mobile:

    .header {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

Desktop:

    @media (min-width: 768px) {
        .header {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    }

Тобто:

    mobile:
    ┌─────────────┐
    │ Logo        │
    │ Navigation  │
    └─────────────┘

    desktop:
    ┌─────────────┐
    │ Logo Nav    │
    └─────────────┘

---

# 18. Mobile First для Navigation

Наприклад, mobile navigation:

    .navigation {
        display: none;
    }

    .menu-button {
        display: block;
    }

На desktop:

    @media (min-width: 768px) {
        .navigation {
            display: flex;
        }

        .menu-button {
            display: none;
        }
    }

Важливо:

CSS відповідає за presentation.

Логіка відкриття/закриття mobile menu зазвичай реалізується через JavaScript або HTML-механізми.

---

# 19. Mobile First для Sidebar

На mobile sidebar може розташовуватися під основним контентом:

    .layout {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

На desktop:

    @media (min-width: 1024px) {
        .layout {
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 32px;
        }
    }

Результат:

    mobile:

    ┌───────────────┐
    │ Main content  │
    ├───────────────┤
    │ Sidebar       │
    └───────────────┘


    desktop:

    ┌──────────────────────┬──────────┐
    │ Main content         │ Sidebar  │
    └──────────────────────┴──────────┘

---

# 20. Mobile First для typography

Базовий текст можна зробити компактнішим:

    body {
        font-size: 16px;
        line-height: 1.5;
    }

Для desktop:

    @media (min-width: 1200px) {
        body {
            font-size: 18px;
        }
    }

Для заголовків:

    h1 {
        font-size: 32px;
        line-height: 1.1;
    }

    @media (min-width: 768px) {
        h1 {
            font-size: 40px;
        }
    }

    @media (min-width: 1200px) {
        h1 {
            font-size: 48px;
        }
    }

---

# 21. Mobile First і `clamp()`

Не кожна зміна розміру повинна вимагати breakpoint.

Для плавної типографіки можна використовувати `clamp()`:

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

Тут:

    2rem → мінімальний розмір
    5vw  → бажаний динамічний розмір
    4rem → максимальний розмір

Це дозволяє частково зменшити кількість media queries.

---

# 22. Mobile First і CSS Grid `auto-fit`

Іноді Grid може адаптуватися без breakpoint:

    .cards {
        display: grid;
        grid-template-columns: repeat(
            auto-fit,
            minmax(240px, 1fr)
        );
        gap: 24px;
    }

Браузер сам визначає, скільки колонок поміститься.

Це хороший приклад того, що:

> Responsive design не завжди означає багато `@media`.

---

# 23. Mobile First і `minmax()`

Наприклад:

    .cards {
        display: grid;
        grid-template-columns:
            repeat(auto-fit, minmax(250px, 1fr));
        gap: 24px;
    }

Можна отримати приблизно:

    вузький екран → 1 колонка
    середній      → 2 колонки
    широкий       → 3+ колонки

без явних breakpoint для кожної ширини.

---

# 24. Mobile First і `min-width`

Основна конструкція:

    @media (min-width: 768px) {
        ...
    }

Означає:

> застосувати ці стилі, якщо viewport має ширину 768px або більше.

Наприклад:

    .card {
        padding: 16px;
    }

    @media (min-width: 768px) {
        .card {
            padding: 24px;
        }
    }

---

# 25. Кілька Mobile First breakpoint

Класична структура:

    /* Mobile */
    .element {
        ...
    }

    /* Tablet */
    @media (min-width: 768px) {
        .element {
            ...
        }
    }

    /* Desktop */
    @media (min-width: 1200px) {
        .element {
            ...
        }
    }

Це легко читати:

    base
      ↓
    768px
      ↓
    1200px

---

# 26. Порядок media queries

У Mobile First зручно розташовувати breakpoint від меншого до більшого:

    @media (min-width: 576px) {
        ...
    }

    @media (min-width: 768px) {
        ...
    }

    @media (min-width: 992px) {
        ...
    }

    @media (min-width: 1200px) {
        ...
    }

Це відповідає логіці:

    small → medium → large

---

# 27. Cascade і однакова специфічність

Якщо два правила мають однакову специфічність, пізніше правило може перемогти.

Наприклад:

    .title {
        color: black;
    }

    @media (min-width: 768px) {
        .title {
            color: blue;
        }
    }

Для `768px+` колір буде `blue`.

Якщо далі:

    @media (min-width: 1200px) {
        .title {
            color: green;
        }
    }

то для `1200px+`:

    green

---

# 28. Overlapping Media Queries

Media queries можуть одночасно відповідати поточній ширині.

Наприклад:

    @media (min-width: 768px) {
        .card {
            padding: 24px;
        }
    }

    @media (min-width: 1200px) {
        .card {
            padding: 32px;
        }
    }

При ширині `1400px` працюють **обидва** правила.

Спочатку:

    padding: 24px

потім:

    padding: 32px

Тому результат:

    padding: 32px

---

# 29. Mobile First дозволяє уникати зайвих reset-правил

Наприклад:

    .menu {
        display: none;
    }

    @media (min-width: 768px) {
        .menu {
            display: flex;
        }
    }

Не потрібно потім писати:

    @media (max-width: 767px) {
        .menu {
            display: none;
        }
    }

Базове правило вже описує mobile.

---

# 30. Mobile First і компоненти

Кожен компонент можна розглядати окремо:

    Card
    ├── mobile
    ├── tablet
    └── desktop

Наприклад:

    .card {
        display: block;
    }

    @media (min-width: 768px) {
        .card {
            display: flex;
        }
    }

Це простіше, ніж створювати:

    .card-mobile
    .card-tablet
    .card-desktop

---

# 31. Не створюй окремий HTML для кожного breakpoint

❌ Погано:

    <div class="mobile-card">
        ...
    </div>

    <div class="desktop-card">
        ...
    </div>

якщо різницю можна реалізувати CSS.

✅ Краще:

    <article class="card">
        <img src="image.jpg" alt="Product">
        <div class="card__content">
            <h2>Product</h2>
            <p>Description</p>
        </div>
    </article>

CSS:

    .card {
        display: block;
    }

    @media (min-width: 768px) {
        .card {
            display: flex;
        }
    }

---

# 32. Mobile First і accessibility

Responsive layout повинен залишатися доступним на всіх ширинах.

Потрібно перевіряти:

- достатній розмір тексту;
- достатній контраст;
- keyboard navigation;
- focus states;
- доступність меню;
- порядок контенту;
- zoom;
- reduced motion;
- touch target size.

Наприклад:

    button {
        min-height: 44px;
        padding: 12px 16px;
    }

Не варто робити mobile buttons занадто маленькими тільки заради економії місця.

---

# 33. Mobile First і touch

На mobile часто використовується touch input.

Тому interactive elements повинні мати достатню область натискання.

Наприклад:

    .button {
        min-height: 44px;
        padding: 12px 20px;
    }

Також не слід покладатися тільки на `:hover`.

Наприклад:

    .button:hover {
        background: black;
    }

На touch-пристроях hover може поводитися інакше.

---

# 34. Mobile First і `hover`

Для інтерфейсів, де hover має сенс, можна перевірити його наявність:

    @media (hover: hover) {
        .card:hover {
            transform: translateY(-4px);
        }
    }

Це допомагає не застосовувати hover-ефекти без необхідності до пристроїв без hover-взаємодії.

---

# 35. Mobile First і `prefers-reduced-motion`

Адаптивність стосується не тільки ширини.

Користувач може попросити операційну систему зменшити анімацію.

Наприклад:

    .card {
        transition: transform 200ms ease;
    }

    @media (prefers-reduced-motion: reduce) {
        .card {
            transition: none;
        }
    }

Для складних animation:

    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms;
            animation-iteration-count: 1;
            transition-duration: 0.01ms;
            scroll-behavior: auto;
        }
    }

Краще зменшувати саме **необов'язкову** анімацію, а не ламати функціональність інтерфейсу.

---

# 36. Mobile First і dark mode

Responsive design може враховувати також системну тему:

    :root {
        --background: #ffffff;
        --text: #222222;
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --background: #111111;
            --text: #eeeeee;
        }
    }

Потім:

    body {
        background: var(--background);
        color: var(--text);
    }

Це вже не breakpoint за шириною, але це теж media query.

---

# 37. Mobile First і print

Не забувай про друк.

Наприклад:

    @media print {
        .navigation {
            display: none;
        }

        .button {
            display: none;
        }

        body {
            color: black;
            background: white;
        }
    }

Це дозволяє створити окреме представлення сторінки для друку.

---

# 38. Mobile First і viewport

Для правильного responsive layout в HTML потрібен viewport meta tag:

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

Він повідомляє браузеру mobile-пристрою, що viewport повинен відповідати ширині пристрою.

Без нього responsive CSS може працювати не так, як очікується.

---

# 39. Повний простий приклад Mobile First

HTML:

    <section class="products">
        <article class="product">
            <h2>Product 1</h2>
            <p>Description</p>
            <button>Buy</button>
        </article>

        <article class="product">
            <h2>Product 2</h2>
            <p>Description</p>
            <button>Buy</button>
        </article>

        <article class="product">
            <h2>Product 3</h2>
            <p>Description</p>
            <button>Buy</button>
        </article>
    </section>

CSS:

    .products {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
        padding: 16px;
    }

    .product {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
    }

    @media (min-width: 768px) {
        .products {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
            max-width: 720px;
            margin-inline: auto;
        }
    }

    @media (min-width: 1200px) {
        .products {
            grid-template-columns: repeat(3, 1fr);
            max-width: 1140px;
        }
    }

Результат:

    mobile:

    ┌──────────────┐
    │ Product 1    │
    ├──────────────┤
    │ Product 2    │
    ├──────────────┤
    │ Product 3    │
    └──────────────┘


    tablet:

    ┌──────────┬──────────┐
    │ Product 1│ Product 2│
    ├──────────┼──────────┤
    │ Product 3│          │
    └──────────┴──────────┘


    desktop:

    ┌──────────┬──────────┬──────────┐
    │ Product 1│ Product 2│ Product 3│
    └──────────┴──────────┴──────────┘

---

# 40. Повний приклад Layout

HTML:

    <div class="page">
        <header class="header">
            <a href="/" class="logo">Logo</a>

            <button class="menu-button">
                Menu
            </button>

            <nav class="navigation">
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
            </nav>
        </header>

        <main class="layout">
            <section class="content">
                <h1>Page title</h1>
                <p>
                    Main content goes here.
                </p>
            </section>

            <aside class="sidebar">
                Sidebar
            </aside>
        </main>
    </div>

CSS:

    .page {
        width: 100%;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
    }

    .navigation {
        display: none;
    }

    .layout {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 16px;
    }

    .sidebar {
        padding: 16px;
        border: 1px solid #ddd;
    }

    @media (min-width: 768px) {
        .header {
            padding-inline: 24px;
        }

        .layout {
            max-width: 720px;
            margin-inline: auto;
            padding-inline: 24px;
        }
    }

    @media (min-width: 1024px) {
        .menu-button {
            display: none;
        }

        .navigation {
            display: flex;
            gap: 24px;
        }

        .layout {
            display: grid;
            grid-template-columns: 1fr 280px;
            max-width: 960px;
        }
    }

    @media (min-width: 1200px) {
        .layout {
            max-width: 1140px;
            grid-template-columns: 1fr 320px;
            gap: 40px;
        }
    }

---

# 41. Як мислити Mobile First

Перед написанням CSS постав собі питання:

### 1. Що є найважливішим контентом?

Наприклад:

    заголовок
    ↓
    основний текст
    ↓
    button

### 2. Як це виглядає на маленькому екрані?

Не намагайся одразу створити desktop layout.

### 3. Що зміниться на tablet?

Наприклад:

    1 колонка → 2 колонки

### 4. Що зміниться на desktop?

Наприклад:

    2 колонки → 3 колонки

### 5. Чи потрібен breakpoint?

Якщо CSS Grid/Flexbox може вирішити задачу без нього, breakpoint може бути зайвим.

---

# 42. Mobile First як послідовне розширення

Корисно мислити так:

    BASE
    ↓
    "Сайт працює на mobile"
    ↓
    768px
    ↓
    "Додаємо простір і layout"
    ↓
    1024px
    ↓
    "Додаємо desktop navigation / columns"
    ↓
    1200px
    ↓
    "Збільшуємо max-width / typography"

Це значно зрозуміліше, ніж:

    desktop
    ↓
    tablet override
    ↓
    mobile override
    ↓
    ще один mobile override

---

# 43. Mobile First і CSS Variables

Media queries можна використовувати для зміни custom properties.

Наприклад:

    :root {
        --spacing: 16px;
        --container-width: 100%;
    }

    @media (min-width: 768px) {
        :root {
            --spacing: 24px;
            --container-width: 720px;
        }
    }

    @media (min-width: 1200px) {
        :root {
            --spacing: 32px;
            --container-width: 1140px;
        }
    }

Потім:

    .container {
        width: 100%;
        max-width: var(--container-width);
        margin-inline: auto;
        padding-inline: var(--spacing);
    }

Це дозволяє централізовано змінювати значення.

---

# 44. Mobile First і logical properties

Для responsive CSS корисно використовувати сучасні logical properties:

    padding-inline
    padding-block
    margin-inline
    margin-block
    inline-size
    block-size

Наприклад:

    .container {
        padding-inline: 16px;
        margin-inline: auto;
    }

замість:

    .container {
        padding-left: 16px;
        padding-right: 16px;
        margin-left: auto;
        margin-right: auto;
    }

Це краще працює з різними напрямками тексту.

---

# 45. Mobile First і `width: 100%`

На mobile елемент часто повинен займати доступну ширину:

    .container {
        width: 100%;
    }

Але для desktop ми можемо обмежити максимальну ширину:

    .container {
        width: 100%;
        padding-inline: 16px;
    }

    @media (min-width: 768px) {
        .container {
            max-width: 720px;
            margin-inline: auto;
        }
    }

Не обов'язково використовувати `width: 720px`.

Краще:

    width: 100%;
    max-width: 720px;

---

# 46. `max-width` краще за жорстку ширину

❌ Погано для responsive layout:

    .container {
        width: 1200px;
    }

На маленькому екрані такий елемент може спричинити horizontal overflow.

✅ Краще:

    .container {
        width: 100%;
        max-width: 1200px;
        margin-inline: auto;
        padding-inline: 16px;
    }

---

# 47. Уникай горизонтального overflow

Типова проблема:

    .element {
        width: 1200px;
    }

на mobile.

Може з'явитися:

    ────────────────────────────────→

    горизонтальний scroll

Краще використовувати:

    width: 100%;
    max-width: 1200px;

і перевіряти:

- fixed widths;
- images;
- long text;
- tables;
- flex items;
- grid columns;
- absolutely positioned elements.

---

# 48. Responsive images у Mobile First

Базово:

    img {
        display: block;
        max-width: 100%;
        height: auto;
    }

Це допомагає зменшувати зображення разом із контейнером.

Для більш складних responsive images використовуються:

    <picture>

і:

    srcset
    sizes

Це окрема тема `04-responsive-images`.

---

# 49. Mobile First не означає "тільки CSS"

Mobile First — це підхід до responsive UI.

У реальному застосунку можуть використовуватися:

    HTML
    CSS
    JavaScript
    React
    Next.js

Наприклад, CSS визначає layout:

    mobile → menu button
    desktop → navigation

А JavaScript відповідає за:

    click menu
    open menu
    close menu
    keyboard interaction
    accessibility state

---

# 50. CSS Media Queries vs JavaScript

CSS:

    @media (min-width: 768px) {
        .sidebar {
            display: block;
        }
    }

Це правильний вибір для presentation/layout.

JavaScript може перевіряти media query:

    const mediaQuery = window.matchMedia(
        "(min-width: 768px)"
    );

    console.log(mediaQuery.matches);

JS потрібен, коли від ширини viewport залежить **поведінка**, а не тільки presentation.

Наприклад:

    CSS:
    "показати елемент"

    JS:
    "змінити поведінку компонента"

Не варто без необхідності дублювати весь responsive CSS у JavaScript.

---

# 51. Mobile First і React

У React зазвичай не потрібно робити:

    if (window.innerWidth < 768) {
        ...
    }

тільки для зміни CSS layout.

Краще:

    <div className={styles.card}>
        ...
    </div>

і CSS:

    .card {
        display: block;
    }

    @media (min-width: 768px) {
        .card {
            display: flex;
        }
    }

React відповідає за структуру і поведінку.

CSS відповідає за presentation.

---

# 52. Mobile First і Container Queries

Важливо розрізняти:

    Media Query
    ↓
    залежить переважно від viewport / environment

    Container Query
    ↓
    залежить від розміру контейнера компонента

Наприклад:

    @media (min-width: 768px) {
        ...
    }

перевіряє viewport.

А:

    @container (min-width: 500px) {
        ...
    }

дозволяє компоненту реагувати на ширину свого контейнера.

Container Queries — окрема сучасна тема CSS.

---

# 53. Mobile First не означає "мінімум CSS"

Mobile First означає:

> Базовий CSS повинен бути придатним для маленьких екранів.

Це не означає:

    "desktop стилі не важливі"

або:

    "mobile повинен мати менше функцій"

Мобільна версія повинна залишатися повноцінною.

---

# 54. Типова структура Mobile First CSS

Зручно організовувати CSS так:

    /* Base / Mobile */

    .header {
        ...
    }

    .navigation {
        ...
    }

    .content {
        ...
    }

    .card {
        ...
    }


    /* Tablet */

    @media (min-width: 768px) {
        ...
    }


    /* Desktop */

    @media (min-width: 1200px) {
        ...
    }

---

# 55. Що потрібно пам'ятати

### Правило №1

**Mobile First починається з базового CSS.**

    .card {
        ...
    }

### Правило №2

**Для розширення layout використовуй `min-width`.**

    @media (min-width: 768px) {
        ...
    }

### Правило №3

**Не використовуй breakpoint для кожного пристрою.**

Breakpoint повинен бути потрібен контенту.

### Правило №4

**Не дублюй базові стилі.**

Змінюй тільки те, що потрібно.

### Правило №5

**Використовуй Flexbox/Grid до того, як додавати зайвий breakpoint.**

### Правило №6

**Перевіряй реальний layout на різних ширинах.**

### Правило №7

**Responsive design — це не тільки width.**

Також існують:

    orientation
    hover
    pointer
    prefers-color-scheme
    prefers-reduced-motion
    print

---

# 56. Типові помилки

## ❌ 1. Mobile First із `max-width`

Написання всього CSS для desktop, а потім постійне зменшення через:

    @media (max-width: ...)

— це вже ближче до Desktop First.

---

## ❌ 2. Занадто багато breakpoint

    375px
    390px
    414px
    430px
    480px
    540px
    600px
    768px
    ...

Такий CSS важко підтримувати.

---

## ❌ 3. Breakpoint під конкретний телефон

Наприклад:

    @media (min-width: 393px) {
        ...
    }

тільки тому, що певний телефон має таку ширину.

Краще орієнтуватися на layout.

---

## ❌ 4. Fixed width

    width: 1200px;

може створити horizontal overflow.

---

## ❌ 5. Дублювання стилів

Не потрібно повторювати всі властивості на кожному breakpoint.

---

## ❌ 6. Mobile як "урізана desktop-версія"

Mobile має бути повноцінним інтерфейсом.

---

## ❌ 7. Надмірне використання JavaScript для layout

Не потрібно робити JS для того, що нормально вирішується CSS.

---

## ❌ 8. Ігнорування accessibility

Responsive layout не повинен ламати:

- keyboard navigation;
- focus;
- zoom;
- contrast;
- touch targets;
- reduced motion.

---

## ❌ 9. Забутий viewport

У HTML повинен бути:

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

---

# 57. Як тестувати Mobile First

Перевіряй щонайменше:

    320px
    375px
    390px
    480px
    768px
    1024px
    1200px
    1440px

Але не треба створювати breakpoint для кожного з цих значень.

Ці ширини використовуються для **тестування**.

---

# 58. DevTools

У браузері можна відкрити:

    DevTools
        ↓
    Device Toolbar / Responsive Mode

Потім змінювати ширину viewport.

Перевіряти:

- коли змінюється layout;
- чи немає horizontal scroll;
- чи не обрізається текст;
- чи працює navigation;
- чи достатньо місця для buttons;
- чи правильно працюють Grid/Flexbox;
- чи не виникають unexpected breakpoints.

---

# 59. Практичний алгоритм створення Mobile First сторінки

### Крок 1

Створити HTML-структуру.

    header
    main
    section
    article
    footer

### Крок 2

Створити базовий mobile layout.

    width
    padding
    margin
    typography
    display

### Крок 3

Перевірити mobile.

    320–480px

### Крок 4

Розширити layout для tablet.

    @media (min-width: 768px)

### Крок 5

Розширити layout для desktop.

    @media (min-width: 1200px)

### Крок 6

Перевірити проміжні ширини.

Наприклад:

    700px
    850px
    1100px
    1300px

### Крок 7

Перевірити accessibility.

### Крок 8

Прибрати зайві breakpoint і дублювання.

---

# 60. Практичний шаблон

Можна почати responsive stylesheet так:

    /* ========================================
       BASE / MOBILE
       ======================================== */

    .container {
        width: 100%;
        padding-inline: 16px;
        margin-inline: auto;
    }

    .layout {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .cards {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
    }


    /* ========================================
       TABLET
       ======================================== */

    @media (min-width: 768px) {

        .container {
            max-width: 720px;
            padding-inline: 24px;
        }

        .layout {
            gap: 24px;
        }

        .cards {
            grid-template-columns: repeat(2, 1fr);
        }

    }


    /* ========================================
       DESKTOP
       ======================================== */

    @media (min-width: 1200px) {

        .container {
            max-width: 1140px;
            padding-inline: 32px;
        }

        .layout {
            gap: 32px;
        }

        .cards {
            grid-template-columns: repeat(3, 1fr);
        }

    }

---

# 61. Коли Mobile First особливо корисний

Mobile First добре підходить для:

- landing pages;
- dashboards;
- blogs;
- e-commerce;
- educational platforms;
- documentation;
- corporate websites;
- SaaS applications;
- React applications;
- Next.js applications.

Особливо корисний тоді, коли значна частина користувачів працює зі смартфонів.

---

# 62. Рівні знань

## 🟢 Core

Потрібно знати:

- що таке Mobile First;
- базовий mobile CSS;
- `@media`;
- `min-width`;
- breakpoints;
- CSS cascade;
- Flexbox;
- Grid;
- responsive containers;
- `max-width: 100%`;
- viewport meta tag.

---

## 🟡 Junior

Потрібно вміти:

- створювати Mobile First layout;
- створювати кілька breakpoint;
- адаптувати navigation;
- адаптувати Grid;
- адаптувати Flexbox;
- працювати з typography;
- уникати overflow;
- тестувати різні viewport;
- використовувати DevTools;
- не дублювати CSS.

---

## 🟠 Middle

Потрібно розуміти:

- content-driven breakpoints;
- progressive enhancement;
- `clamp()`;
- `minmax()`;
- `auto-fit`;
- `auto-fill`;
- logical properties;
- accessibility;
- `prefers-reduced-motion`;
- `prefers-color-scheme`;
- `hover` / `pointer`;
- media queries vs container queries;
- responsive component architecture.

---

## 🔴 Senior

Потрібно вміти:

- проектувати responsive design system;
- визначати breakpoints на основі контенту;
- мінімізувати кількість media queries;
- будувати fluid layouts;
- комбінувати Grid/Flexbox/Container Queries;
- оптимізувати responsive images;
- враховувати accessibility;
- враховувати різні input devices;
- проектувати responsive UI architecture;
- аналізувати performance responsive interfaces.

---

# 63. Питання зі співбесіди

### 1. Що таке Mobile First?

Підхід, за якого базовий CSS створюється для маленьких екранів, а стилі для більших екранів додаються поступово.

---

### 2. Який media feature найчастіше використовується в Mobile First?

    min-width

Наприклад:

    @media (min-width: 768px) {
        ...
    }

---

### 3. Чим Mobile First відрізняється від Desktop First?

Mobile First:

    base
    ↓
    min-width
    ↓
    larger screens

Desktop First:

    base
    ↓
    max-width
    ↓
    smaller screens

---

### 4. Чи потрібно створювати breakpoint для кожного пристрою?

Ні.

Breakpoint повинен визначатися потребами layout і контенту.

---

### 5. Чому Mobile First часто зручний?

Тому що:

- базовий CSS простіший;
- layout поступово розширюється;
- менше override;
- легше контролювати cascade;
- простіше підтримувати responsive layout.

---

### 6. Чи потрібен media query для кожного responsive layout?

Ні.

Flexbox і Grid часто можуть створювати адаптивний layout без додаткових breakpoint.

---

### 7. Що таке breakpoint?

Точка, на якій layout або presentation змінюється залежно від viewport або іншої media feature.

---

### 8. Чи є `768px` стандартним breakpoint?

Ні.

Це лише популярне значення.

Правильний breakpoint залежить від дизайну і контенту.

---

### 9. Що відбувається з mobile-стилями на desktop?

Вони продовжують діяти, якщо їх не перевизначено.

Це одна з переваг каскаду Mobile First.

---

### 10. Чи можна використовувати `max-width` у Mobile First?

Так.

Mobile First не забороняє `max-width`.

Наприклад:

    .container {
        max-width: 1140px;
    }

Але для основної логіки розширення layout зазвичай використовують `min-width`.

---

# 64. Міні-шпаргалка

## Mobile First

    Base CSS
        ↓
    @media (min-width: ...)
        ↓
    @media (min-width: ...)
        ↓
    @media (min-width: ...)

---

## Основний шаблон

    .element {
        /* mobile */
    }

    @media (min-width: 768px) {
        .element {
            /* tablet */
        }
    }

    @media (min-width: 1200px) {
        .element {
            /* desktop */
        }
    }

---

## Grid

    .cards {
        display: grid;
        grid-template-columns: 1fr;
    }

    @media (min-width: 768px) {
        .cards {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 1200px) {
        .cards {
            grid-template-columns: repeat(3, 1fr);
        }
    }

---

## Flexbox

    .layout {
        display: flex;
        flex-direction: column;
    }

    @media (min-width: 768px) {
        .layout {
            flex-direction: row;
        }
    }

---

## Container

    .container {
        width: 100%;
        max-width: 1140px;
        margin-inline: auto;
        padding-inline: 16px;
    }

---

## Responsive image

    img {
        display: block;
        max-width: 100%;
        height: auto;
    }

---

## Fluid typography

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

---

## Adaptive Grid без breakpoint

    .cards {
        display: grid;
        grid-template-columns:
            repeat(auto-fit, minmax(240px, 1fr));
        gap: 24px;
    }

---

## Reduced motion

    @media (prefers-reduced-motion: reduce) {
        * {
            animation: none;
            transition: none;
        }
    }

---

## Dark mode

    @media (prefers-color-scheme: dark) {
        :root {
            --background: #111;
            --text: #fff;
        }
    }

---

## Hover

    @media (hover: hover) {
        .card:hover {
            transform: translateY(-4px);
        }
    }

---

# 65. Головна модель мислення

Не думай:

    "Я роблю mobile версію,
     потім tablet версію,
     потім desktop версію."

Краще думай:

    "Я створюю один responsive layout,
     який поступово розширюється."

Тобто:

    BASE
      ↓
    mobile
      ↓
    + tablet enhancements
      ↓
    + desktop enhancements
      ↓
    + large-screen enhancements

---

# 66. Головне

1. **Mobile First = спочатку маленький екран.**

2. **Базовий CSS пишеться для mobile.**

3. **Для більших екранів зазвичай використовуються `min-width` media queries.**

4. **Не потрібно створювати breakpoint для кожного пристрою.**

5. **Breakpoint визначається layout і контентом, а не назвою пристрою.**

6. **Не дублюй CSS — перевизначай тільки те, що змінюється.**

7. **Flexbox і Grid часто дозволяють створити responsive layout без великої кількості media queries.**

8. **`clamp()`, `minmax()`, `auto-fit` і `auto-fill` допомагають створювати fluid layouts.**

9. **Responsive design — це не тільки ширина viewport.**

10. **Враховуй accessibility, touch, hover, reduced motion і color scheme.**

11. **Не використовуй JavaScript для задач, які нормально вирішуються CSS.**

12. **Перевіряй layout на реальних проміжних ширинах, а не тільки на одному mobile і одному desktop.**

13. **Mobile First — це не "mobile only". Це стратегія побудови одного адаптивного інтерфейсу від малого до великого.**

---

# 67. Формула Mobile First

    SIMPLE BASE
         ↓
    MOBILE LAYOUT
         ↓
    min-width
         ↓
    TABLET ENHANCEMENT
         ↓
    min-width
         ↓
    DESKTOP ENHANCEMENT
         ↓
    FLUID + ACCESSIBLE UI

---

# 68. Що потрібно вміти після цієї теми

Після вивчення `03-mobile-first` ти повинен уміти самостійно створити:

    HTML
      ↓
    Base mobile CSS
      ↓
    Flexbox / Grid
      ↓
    @media (min-width: ...)
      ↓
    Tablet
      ↓
    @media (min-width: ...)
      ↓
    Desktop

І повинен розуміти головний принцип:

> **Не створюй три різні сайти для mobile, tablet і desktop. Створюй один layout, який поступово адаптується до доступного простору.**