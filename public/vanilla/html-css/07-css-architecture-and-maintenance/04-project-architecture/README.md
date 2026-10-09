# CSS Project Architecture — Архітектура CSS-проєкту

> **CSS Project Architecture** — це організація CSS-коду, файлів, компонентів, дизайн-токенів і правил стилізації так, щоб проєкт залишався зрозумілим, масштабованим і зручним для підтримки.
>
> Головна мета архітектури CSS — зробити так, щоб можна було безпечно додавати нові компоненти, змінювати дизайн і виправляти помилки, не порушуючи стилі інших частин сайту.

---

## 1. Що таке CSS Project Architecture

У невеликому проєкті достатньо одного HTML-файлу та одного CSS-файлу:

    project/
    ├── index.html
    └── styles.css

Але коли проєкт зростає, з'являються:

- кілька HTML-сторінок;
- десятки компонентів;
- адаптивні стилі;
- форми та інтерактивні елементи;
- світла й темна теми;
- повторювані кольори, відступи та розміри;
- глобальні стилі й стилі окремих компонентів.

Якщо всі правила безсистемно додавати в один файл, CSS поступово стає складним для підтримки.

Наприклад:

    /* styles.css */

    h1 {
        font-size: 32px;
    }

    .button {
        background-color: blue;
    }

    .sidebar h2 {
        color: gray;
    }

    .page .content .card h2 {
        font-size: 24px;
    }

    .button {
        background-color: green;
    }

Проблеми такого підходу:

- правила розкидані по файлу;
- один клас може оголошуватися в різних місцях;
- складно зрозуміти, які стилі є глобальними;
- компоненти можуть залежати від структури HTML;
- зміни одного правила можуть мати небажані наслідки.

Архітектура CSS допомагає визначити правила, за якими організовується весь стильовий код.

### Основні цілі

| Ціль | Що означає |
|---|---|
| Maintainability | Простота підтримки CSS |
| Scalability | Можливість розширювати проєкт |
| Reusability | Повторне використання стилів |
| Modularity | Поділ коду на незалежні частини |
| Consistency | Єдині правила оформлення |
| Predictability | Передбачуваний результат змін |
| Low coupling | Мінімум непотрібних залежностей |
| Separation of concerns | Розділення різних завдань між частинами коду |

**Головна думка:** хороша CSS-архітектура — це не найбільша кількість файлів, а зрозуміла система, у якій легко знайти, змінити та повторно використати потрібні стилі.

---

# 2. Основні принципи CSS-архітектури

## 2.1. Separation of concerns — розділення відповідальності

Кожна частина проєкту повинна мати зрозуміле призначення.

Наприклад:

- `reset.css` — базове скидання стилів браузера;
- `base.css` — загальні стилі сторінки;
- `tokens.css` — спільні дизайн-значення;
- `layout.css` — структура сторінки;
- `button.css` — стилі кнопок;
- `card.css` — стилі карток;
- `utilities.css` — допоміжні класи.

Приклад структури:

    styles/
    ├── reset.css
    ├── tokens.css
    ├── base.css
    ├── layout.css
    ├── components/
    │   ├── button.css
    │   └── card.css
    └── utilities.css

Кожен файл відповідає за певну групу правил.

Не потрібно створювати окремий файл для кожної властивості або кожного маленького класу. Розділення має спрощувати навігацію.

## 2.2. Modularity — модульність

Модуль — це частина стилів, яку можна розглядати окремо від інших частин проєкту.

Наприклад, кнопка:

    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 10px 16px;
        border: none;
        border-radius: 8px;
        font: inherit;
        cursor: pointer;
    }

    .button--primary {
        background-color: #1769e0;
        color: white;
    }

    .button--secondary {
        background-color: #e5e7eb;
        color: #222;
    }

Кнопка має спільну структуру й окремі варіанти оформлення.

Її можна використати на різних сторінках, не створюючи новий набір стилів для кожного місця використання.

## 2.3. Reusability — повторне використання

Якщо кілька компонентів використовують однакові значення, їх можна винести в CSS Custom Properties.

Без змінних:

    .button {
        border-radius: 8px;
    }

    .card {
        border-radius: 8px;
    }

    .modal {
        border-radius: 8px;
    }

Зі змінною:

    :root {
        --radius-md: 8px;
    }

    .button {
        border-radius: var(--radius-md);
    }

    .card {
        border-radius: var(--radius-md);
    }

    .modal {
        border-radius: var(--radius-md);
    }

Якщо потрібно змінити стандартний радіус, достатньо змінити одне значення.

## 2.4. Low coupling — слабка зв'язаність

Компонент не повинен без потреби залежати від того, де саме він розміщений.

Небажаний варіант:

    .sidebar .card h2 {
        color: navy;
    }

Тут стиль заголовка картки залежить від `.sidebar`, `.card` і HTML-тега `h2`.

Краще:

    .card__title {
        color: navy;
    }

Тепер клас заголовка не залежить від конкретного контейнера.

Контекстні селектори можуть бути потрібними, але не варто будувати всю архітектуру на складних ланцюжках залежностей.

## 2.5. Consistency — послідовність

Якщо в одному компоненті використовується BEM, а в іншому без пояснення з'являються випадкові назви, підтримувати проєкт складніше.

Наприклад, обери послідовний спосіб:

    .product-card {}
    .product-card__title {}
    .product-card__button {}
    .product-card--featured {}

Або іншу систему, але використовуй її послідовно.

## 2.6. Predictability — передбачуваність

Розробник повинен розуміти, де знайти потрібне правило і які частини інтерфейсу воно змінить.

Для цього важливо:

- обмежувати глобальні стилі;
- контролювати специфічність;
- не дублювати класи без потреби;
- визначати порядок підключення CSS;
- відокремлювати стилі компонентів від стилів сторінки.

---

# 3. Вибір структури CSS-проєкту

Універсальної структури для всіх проєктів не існує. Організація залежить від кількості сторінок, компонентів, розробників і технологій.

## 3.1. Варіант A — один CSS-файл

    project/
    ├── index.html
    ├── styles.css
    └── script.js

Підходить для:

- перших навчальних вправ;
- невеликих односторінкових сайтів;
- демонстрацій окремих CSS-властивостей;
- маленьких прототипів.

Переваги:

- легко знайти всі стилі;
- не потрібно організовувати імпорти;
- проста структура.

Недоліки:

- файл може швидко збільшуватися;
- складніше розділяти відповідальність;
- дублювання та конфлікти важче контролювати.

**Рекомендація:** для маленьких навчальних завдань одного файлу цілком достатньо.

## 3.2. Варіант B — поділ за призначенням

    project/
    ├── index.html
    ├── styles/
    │   ├── reset.css
    │   ├── tokens.css
    │   ├── base.css
    │   ├── layout.css
    │   ├── components.css
    │   └── utilities.css
    └── script.js

Тут стилі поділяються за роллю.

| Файл | Призначення |
|---|---|
| `reset.css` | Початкове скидання стилів |
| `tokens.css` | Кольори, відступи, розміри, інші спільні значення |
| `base.css` | Загальні стилі HTML-елементів |
| `layout.css` | Структура сторінки |
| `components.css` | Повторно використовувані компоненти |
| `utilities.css` | Допоміжні класи |

Це зручний варіант для невеликого або середнього проєкту.

## 3.3. Варіант C — окремі файли компонентів

    project/
    ├── index.html
    ├── styles/
    │   ├── reset.css
    │   ├── tokens.css
    │   ├── base.css
    │   ├── layout.css
    │   ├── components/
    │   │   ├── button.css
    │   │   ├── card.css
    │   │   ├── navigation.css
    │   │   ├── form.css
    │   │   └── modal.css
    │   └── utilities.css
    └── script.js

Цей варіант полегшує пошук стилів, коли компонентів стає багато.

Водночас окремий файл для кожного компонента не є обов'язковим. Якщо проєкт маленький, кілька груп компонентів можуть залишатися в одному файлі.

## 3.4. Варіант D — стилі поруч із компонентами

У компонентних застосунках, наприклад React, CSS може зберігатися поруч із кодом компонента.

    src/
    ├── components/
    │   ├── Button/
    │   │   ├── Button.tsx
    │   │   └── Button.module.css
    │   ├── Card/
    │   │   ├── Card.tsx
    │   │   └── Card.module.css
    │   └── Header/
    │       ├── Header.tsx
    │       └── Header.module.css
    └── app/

Переваги:

- код компонента та його стилі легко знаходити;
- простіше змінювати компонент;
- локальні стилі не потрібно шукати в одному глобальному файлі;
- зручно повторно використовувати компоненти.

Це приклад компонентної архітектури, а не обов'язкова структура кожного React-проєкту.

---

# 4. Рекомендована архітектура для Vanilla HTML/CSS/JS

Для навчальних проєктів без React і без складної системи збірки можна використовувати просту структуру.

    project/
    ├── index.html
    ├── styles/
    │   ├── reset.css
    │   ├── tokens.css
    │   ├── base.css
    │   ├── layout.css
    │   ├── components/
    │   │   ├── button.css
    │   │   ├── card.css
    │   │   └── form.css
    │   └── utilities.css
    ├── scripts/
    │   └── main.js
    └── assets/
        ├── images/
        └── icons/

### Призначення папок

- `styles/` — CSS-код.
- `components/` — стилі повторно використовуваних компонентів.
- `scripts/` — JavaScript-код.
- `assets/images/` — зображення.
- `assets/icons/` — іконки та графічні ресурси.

Підключення кількох CSS-файлів у `index.html`:

    <!DOCTYPE html>
    <html lang="uk">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Навчальний проєкт</title>

        <link rel="stylesheet" href="styles/reset.css">
        <link rel="stylesheet" href="styles/tokens.css">
        <link rel="stylesheet" href="styles/base.css">
        <link rel="stylesheet" href="styles/layout.css">
        <link rel="stylesheet" href="styles/components/button.css">
        <link rel="stylesheet" href="styles/components/card.css">
        <link rel="stylesheet" href="styles/utilities.css">

        <script src="scripts/main.js" defer></script>
    </head>
    <body>
        <main class="page">
            <h1 class="page__title">Мій проєкт</h1>

            <article class="card">
                <h2 class="card__title">Перша картка</h2>
                <p class="card__description">
                    Приклад повторно використовуваного компонента.
                </p>

                <button class="button button--primary">
                    Докладніше
                </button>
            </article>
        </main>
    </body>
    </html>

### Важливо про порядок підключення

Порядок має значення, якщо правила конкурують за однакових умов каскаду.

Зазвичай зручно починати з:

1. Reset або normalize.
2. Дизайн-токенів.
3. Базових стилів.
4. Layout.
5. Компонентів.
6. Utilities.

Це поширена домовленість, а не єдиний правильний порядок для всіх проєктів.

Якщо використовується `@layer`, каскадні шари також впливають на пріоритет правил.

---

# 5. Reset, Base, Layout, Components, Utilities

Ці категорії допомагають розділяти стилі за відповідальністю.

## 5.1. Reset

Reset задає передбачувану початкову поведінку елементів.

Приклад `reset.css`:

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html {
        -webkit-text-size-adjust: 100%;
        text-size-adjust: 100%;
    }

    body,
    h1,
    h2,
    h3,
    p {
        margin: 0;
    }

    img,
    picture,
    video,
    canvas,
    svg {
        display: block;
        max-width: 100%;
    }

    button,
    input,
    select,
    textarea {
        font: inherit;
    }

Це помірний приклад reset. Не потрібно бездумно скидати всі властивості: важливо зберігати корисну поведінку браузера та доступність.

## 5.2. Tokens

Дизайн-токени — це повторно використовувані значення, які описують спільні параметри дизайну.

Приклад `tokens.css`:

    :root {
        /* Colors */
        --color-primary: #1769e0;
        --color-primary-hover: #1256ba;
        --color-text: #222222;
        --color-muted: #666666;
        --color-background: #ffffff;
        --color-border: #dddddd;

        /* Spacing */
        --space-xs: 4px;
        --space-sm: 8px;
        --space-md: 16px;
        --space-lg: 24px;
        --space-xl: 32px;

        /* Typography */
        --font-body: Arial, sans-serif;
        --font-size-sm: 0.875rem;
        --font-size-md: 1rem;
        --font-size-lg: 1.25rem;

        /* Shape */
        --radius-sm: 4px;
        --radius-md: 8px;
        --radius-lg: 16px;

        /* Layout */
        --container-width: 1200px;
    }

Використання:

    .card {
        padding: var(--space-lg);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background-color: var(--color-background);
    }

Перевага: спільні значення визначаються в одному місці.

## 5.3. Base

Base містить загальні стилі сторінки та HTML-елементів.

Приклад `base.css`:

    body {
        font-family: var(--font-body);
        font-size: var(--font-size-md);
        line-height: 1.5;
        color: var(--color-text);
        background-color: var(--color-background);
    }

    a {
        color: var(--color-primary);
    }

    h1,
    h2,
    h3 {
        line-height: 1.2;
    }

    p {
        margin-block-end: var(--space-md);
    }

Base не повинен перетворюватися на місце для всіх стилів усіх компонентів.

## 5.4. Layout

Layout визначає великі структурні області сторінки.

Приклад `layout.css`:

    .container {
        width: min(100% - 32px, var(--container-width));
        margin-inline: auto;
    }

    .page {
        min-height: 100vh;
    }

    .page__content {
        padding-block: var(--space-xl);
    }

    .content-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 280px;
        gap: var(--space-lg);
    }

Layout відповідає за структуру, а не за кожну дрібницю зовнішнього вигляду компонента.

## 5.5. Components

Компоненти — повторно використовувані частини інтерфейсу.

Приклад `components/button.css`:

    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-sm);
        padding: 10px 16px;
        border: 1px solid transparent;
        border-radius: var(--radius-md);
        font: inherit;
        font-weight: 600;
        text-decoration: none;
        cursor: pointer;
        transition:
            background-color 150ms ease,
            color 150ms ease;
    }

    .button--primary {
        background-color: var(--color-primary);
        color: white;
    }

    .button--primary:hover {
        background-color: var(--color-primary-hover);
    }

    .button--secondary {
        border-color: var(--color-border);
        background-color: transparent;
        color: var(--color-text);
    }

Компонент має спільну основу й зрозумілі варіанти.

## 5.6. Utilities

Utilities — невеликі класи для конкретних допоміжних завдань.

Приклад `utilities.css`:

    .u-text-center {
        text-align: center;
    }

    .u-hidden {
        display: none;
    }

    .u-mt-md {
        margin-top: var(--space-md);
    }

    .u-full-width {
        width: 100%;
    }

Не потрібно перетворювати utilities на безмежний набір випадкових класів. Краще підтримувати невелику, узгоджену систему.

---

# 6. Глобальні стилі та локальні стилі

Одна з найважливіших архітектурних задач — визначити, які правила діють у всьому проєкті, а які належать конкретному компоненту.

## 6.1. Глобальні стилі

Глобальні стилі можуть включати:

- box-sizing;
- базову типографіку;
- фон сторінки;
- загальні правила для зображень;
- дизайн-токени;
- базову поведінку посилань.

Приклад:

    :root {
        --color-text: #222;
        --color-primary: #1769e0;
    }

    body {
        color: var(--color-text);
    }

    img {
        max-width: 100%;
        height: auto;
    }

## 6.2. Локальні стилі компонента

Компонентні стилі повинні описувати конкретний компонент.

    .profile-card {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 12px;
    }

    .profile-card__avatar {
        width: 80px;
        aspect-ratio: 1;
        border-radius: 50%;
        object-fit: cover;
    }

    .profile-card__name {
        margin-top: 12px;
        font-size: 1.25rem;
    }

Ці правила не повинні змінювати всі зображення чи всі заголовки на сайті.

## 6.3. Чому не варто стилізувати всі елементи через глобальні селектори

Наприклад:

    h2 {
        margin-bottom: 20px;
        color: navy;
    }

Таке правило може впливати на заголовки карток, модальних вікон, форм і сторінок.

Глобальні селектори для базових правил цілком нормальні. Але специфічне оформлення краще задавати через класи компонентів.

Наприклад:

    .page-title {
        margin-bottom: 24px;
        color: navy;
    }

    .card__title {
        margin-bottom: 12px;
        color: #222;
    }

**Правило:** глобальні стилі задають основу, а компоненти — конкретне оформлення.

---

# 7. CSS Methodologies та архітектура

Методологія і архітектура пов'язані, але це не одне й те саме.

- **Методологія** описує принципи та правила написання CSS.
- **Архітектура** визначає, як ці правила застосовуються до структури конкретного проєкту.

| Підхід | Основне призначення |
|---|---|
| BEM | Іменування класів |
| OOCSS | Повторне використання та розділення структури й оформлення |
| SMACSS | Організація правил за категоріями |
| ITCSS | Організація шарів CSS |
| Component-based CSS | Організація стилів навколо компонентів |
| Utility-first | Побудова інтерфейсу з невеликих класів |
| CSS Modules | Локальне зіставлення назв класів |

Наприклад, можна одночасно використовувати:

- BEM для назв класів;
- компонентну структуру папок;
- CSS Custom Properties для токенів;
- ITCSS-подібний порядок стилів;
- utility-класи для невеликих допоміжних операцій.

Це нормально, якщо правила узгоджені.

---

# 8. Керування специфічністю

**Specificity** — один із факторів, який визначає, яке CSS-правило застосовується, коли декларації конфліктують.

Проблемна архітектура часто має надмірно складні селектори:

    body .page main .content .card h2 {
        color: navy;
    }

    body .page main .content .card h2.title {
        color: green;
    }

    #app .page main .content .card h2.title {
        color: red;
    }

Щоб змінити колір заголовка, доводиться створювати все складніші селектори.

Краще використовувати зрозумілі класи:

    .card__title {
        color: navy;
    }

    .card__title--highlighted {
        color: green;
    }

## 8.1. Практичні правила

- Уникай зайвих рівнів вкладеності селекторів.
- Не використовуй ID як основний інструмент стилізації повторно використовуваних компонентів.
- Не додавай `!important` автоматично.
- Не перевизначай один і той самий клас у багатьох несумісних місцях.
- Використовуй зрозумілі варіанти компонентів.
- За потреби застосовуй CSS Cascade Layers.

## 8.2. Cascade Layers

CSS Cascade Layers дозволяють явно визначити порядок шарів стилів.

Приклад:

    @layer reset, base, layout, components, utilities;

    @layer reset {
        *,
        *::before,
        *::after {
            box-sizing: border-box;
        }
    }

    @layer base {
        body {
            margin: 0;
            font-family: Arial, sans-serif;
        }
    }

    @layer components {
        .button {
            padding: 10px 16px;
            border-radius: 8px;
        }
    }

    @layer utilities {
        .u-text-center {
            text-align: center;
        }
    }

Порядок шарів потрібно проєктувати свідомо. Для звичайних декларацій правила пізніших шарів мають перевагу над правилами раніших шарів у межах відповідного походження й важливості.

Важливо: каскадні шари — не те саме, що ITCSS. ITCSS — методологія організації стилів, а `@layer` — вбудований механізм CSS.

---

# 9. BEM у структурі проєкту

BEM добре поєднується з архітектурою, де кожен компонент має власні стилі.

Структура:

    styles/
    ├── base.css
    └── components/
        ├── button.css
        ├── card.css
        └── navigation.css

Приклад `card.css`:

    .card {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
    }

    .card__title {
        margin-bottom: 12px;
        font-size: 1.25rem;
    }

    .card__description {
        color: #666;
    }

    .card__footer {
        margin-top: 16px;
    }

    .card--featured {
        border-color: gold;
    }

HTML:

    <article class="card card--featured">
        <h2 class="card__title">Назва картки</h2>

        <p class="card__description">
            Короткий опис компонента.
        </p>

        <footer class="card__footer">
            <button class="button button--primary">
                Докладніше
            </button>
        </footer>
    </article>

Перевага: коли потрібно змінити картку, можна почати з `card.css`, а не шукати правила по всьому проєкту.

---

# 10. CSS Architecture для багатосторінкового сайту

Коли сайт має багато сторінок, потрібно визначити, що є спільним, а що — унікальним.

Наприклад, сайт освітнього закладу:

- Головна сторінка.
- Сторінка новин.
- Сторінка конкретної новини.
- Сторінка курсів.
- Сторінка контактів.

Спільні компоненти:

- Header;
- Navigation;
- Footer;
- Button;
- Card;
- Form.

Унікальні елементи:

- Hero-блок головної сторінки;
- Галерея;
- Список новин;
- Деталі курсу.

Приклад структури:

    project/
    ├── index.html
    ├── news.html
    ├── courses.html
    ├── contacts.html
    ├── styles/
    │   ├── reset.css
    │   ├── tokens.css
    │   ├── base.css
    │   ├── layout.css
    │   ├── components/
    │   │   ├── header.css
    │   │   ├── navigation.css
    │   │   ├── footer.css
    │   │   ├── button.css
    │   │   └── card.css
    │   └── pages/
    │       ├── home.css
    │       ├── news.css
    │       └── courses.css
    └── scripts/
        └── main.js

Це лише один із можливих варіантів.

### Загальні правила

- Спільні компоненти повинні бути доступні різним сторінкам.
- Унікальні стилі сторінки не варто без потреби переносити в глобальний CSS.
- Повторювані блоки потрібно оформлювати як компоненти.
- Не створюй окремий компонент лише через те, що два елементи мають однаковий колір.

---

# 11. Responsive Design в архітектурі CSS

Адаптивність не повинна перетворюватися на хаотичний набір медіазапитів у різних місцях.

Наприклад, якщо основна сітка змінюється на вузьких екранах, її адаптивні правила логічно зберігати разом із layout.

    .content-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 280px;
        gap: 24px;
    }

    @media (max-width: 800px) {
        .content-grid {
            grid-template-columns: 1fr;
        }
    }

Якщо адаптивність стосується конкретного компонента, правила можна розміщувати поруч із ним.

    .product-card {
        display: grid;
        grid-template-columns: 160px minmax(0, 1fr);
        gap: 16px;
    }

    @media (max-width: 600px) {
        .product-card {
            grid-template-columns: 1fr;
        }
    }

## 11.1. Mobile-first

Mobile-first означає, що базові стилі спочатку описують вузький екран, а потім додають зміни для ширших екранів.

    .navigation {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    @media (min-width: 768px) {
        .navigation {
            flex-direction: row;
            align-items: center;
        }
    }

Переваги:

- прості базові стилі;
- адаптивні зміни додаються поступово;
- менше потреби перевизначати великі блоки CSS.

Mobile-first — поширений підхід, але не обов'язкова вимога для кожного проєкту.

## 11.2. Не створюй окремий файл для кожного breakpoint

Зазвичай не потрібно організовувати стилі так:

    styles/
    ├── desktop.css
    ├── tablet.css
    └── mobile.css

Такий поділ може змусити розробника шукати один компонент у кількох файлах.

Часто зручніше зберігати адаптивні правила поруч із компонентом або відповідним layout.

Окремі адаптивні файли можуть бути доречними в конкретній архітектурі, але це не універсальне правило.

---

# 12. Теми оформлення та дизайн-токени

Архітектура повинна спрощувати не лише підтримку компонентів, а й зміну теми сайту.

Приклад:

    :root {
        color-scheme: light;

        --color-background: #ffffff;
        --color-surface: #f5f5f5;
        --color-text: #222222;
        --color-border: #dddddd;
    }

    [data-theme="dark"] {
        color-scheme: dark;

        --color-background: #181818;
        --color-surface: #242424;
        --color-text: #f5f5f5;
        --color-border: #444444;
    }

Компонент:

    .card {
        padding: 20px;
        border: 1px solid var(--color-border);
        border-radius: 8px;
        background-color: var(--color-surface);
        color: var(--color-text);
    }

Сторінка:

    body {
        background-color: var(--color-background);
        color: var(--color-text);
    }

Тепер тема змінюється через набір змінних, а не через дублювання стилів кожного компонента.

Важливо: `color-scheme` впливає на системні елементи браузера, але саме по собі не замінює власні кольори та стилі компонентів.

---

# 13. CSS Nesting і архітектура

CSS Nesting дозволяє вкладати одні правила CSS в інші. Це може допомогти групувати стилі одного компонента.

Приклад:

    .card {
        padding: 20px;
        border: 1px solid #ddd;

        & .card__title {
            font-size: 1.25rem;
        }

        &:hover {
            border-color: #1769e0;
        }
    }

Але вкладеність не повинна робити селектори надмірно складними.

Небажаний приклад:

    .page {
        .content {
            .sidebar {
                .card {
                    .card__title {
                        color: navy;
                    }
                }
            }
        }
    }

Такий CSS тісно пов'язує компонент із конкретною структурою сторінки.

Краще:

    .card__title {
        color: navy;
    }

### Рекомендації

- Використовуй вкладеність для логічно пов'язаних правил.
- Не створюй надто глибоких рівнів вкладеності.
- Не використовуй структуру HTML як єдиний спосіб ідентифікувати компонент.
- Перевіряй, щоб компонентні стилі залишалися зрозумілими та незалежними.

CSS Nesting — це можливість синтаксису, а не заміна архітектури.

---

# 14. Коли варто використовувати Sass

Sass — препроцесор, який додає можливості для написання CSS, наприклад змінні, міксини, функції та вкладені правила.

Sass може бути корисним, коли:

- потрібні повторно використовувані міксини;
- проєкт має складну систему генерації стилів;
- уже існує кодова база на SCSS;
- команда використовує Sass у своїй дизайн-системі.

Але Sass не замінює архітектуру.

Можна написати погано організований CSS на Sass, так само як можна створити добре організований проєкт зі звичайним CSS.

Сучасний CSS уже має Custom Properties, Cascade Layers, Nesting та інші можливості, тому не кожному навчальному проєкту потрібен препроцесор.

---

# 15. CSS Architecture та інструменти збірки

У невеликому проєкті можна підключати кілька CSS-файлів безпосередньо через HTML.

У великих проєктах часто використовують інструменти збірки, які можуть:

- об'єднувати CSS-файли;
- мінімізувати код;
- обробляти Sass;
- додавати сумісні префікси;
- оптимізувати ресурси;
- підтримувати CSS Modules.

Приклади інструментів:

- Vite;
- webpack;
- PostCSS;
- Sass.

Ці інструменти вирішують завдання обробки та доставки коду. Вони не визначають автоматично, яка архітектура CSS буде найкращою.

Наприклад, Vite не вимагає використовувати BEM, ITCSS або CSS Modules. Це архітектурне рішення розробника.

---

# 16. Типові архітектурні помилки

## Помилка 1. Один великий CSS-файл без структури

Проблема:

    styles.css

У ньому перемішані reset, типографіка, layout, компоненти, адаптивність і тимчасові виправлення.

Рішення: розділи правила за призначенням, коли файл починає заважати навігації.

## Помилка 2. Надмірна кількість файлів

Проблема:

    styles/
    ├── title.css
    ├── subtitle.css
    ├── paragraph.css
    ├── paragraph-small.css
    ├── paragraph-large.css
    └── paragraph-blue.css

Якщо для кожного дрібного стилю створюється окремий файл, структура стає складнішою за сам код.

Рішення: об'єднуй пов'язані правила, якщо це спрощує підтримку.

## Помилка 3. Залежність компонентів від HTML-ієрархії

Проблема:

    .page main .sidebar article.card h2 {
        color: navy;
    }

Рішення:

    .card__title {
        color: navy;
    }

## Помилка 4. Дублювання дизайн-значень

Проблема:

    .button {
        border-radius: 8px;
    }

    .card {
        border-radius: 8px;
    }

    .modal {
        border-radius: 8px;
    }

Рішення:

    :root {
        --radius-md: 8px;
    }

    .button,
    .card,
    .modal {
        border-radius: var(--radius-md);
    }

Це спрощений приклад спільної декларації. У великих системах компоненти можуть використовувати різні токени залежно від ролі.

## Помилка 5. Змішування глобальних і локальних стилів

Проблема:

    h2 {
        color: navy;
    }

    .card h2 {
        color: green;
    }

    .page h2 {
        color: red;
    }

Рішення: визнач глобальну типографіку, а спеціальні варіанти оформи через класи компонентів.

## Помилка 6. Постійне додавання перевизначень

Проблема:

    .button {
        color: black;
    }

    .button {
        color: blue;
    }

    .button {
        color: green;
    }

Рішення: переглядай початкові правила й об'єднуй декларації, а варіанти оформлення визначай явно.

## Помилка 7. Використання `!important` для кожної проблеми

Рішення: спочатку перевір каскад, специфічність, порядок підключення та шари CSS.

## Помилка 8. Передчасне ускладнення архітектури

Не потрібно впроваджувати складну систему папок, Sass, CSS Modules і десятки методологій у маленькій вправі.

Рішення: починай із найпростішої структури, яка відповідає реальним потребам проєкту.

## Помилка 9. Відсутність домовленостей у команді

Навіть хороша структура може стати хаотичною, якщо кожен розробник використовує власні назви й підходи.

Рішення: зафіксуй правила іменування, організації файлів і використання токенів у документації проєкту.

---

# 17. Практичний проєкт: організація CSS для навчального сайту

Уявімо, що потрібно створити сайт навчальних курсів.

Компоненти:

- Header;
- Navigation;
- Hero;
- CourseCard;
- Button;
- Footer.

## 17.1. Структура проєкту

    course-site/
    ├── index.html
    ├── styles/
    │   ├── reset.css
    │   ├── tokens.css
    │   ├── base.css
    │   ├── layout.css
    │   ├── components/
    │   │   ├── header.css
    │   │   ├── button.css
    │   │   ├── hero.css
    │   │   ├── course-card.css
    │   │   └── footer.css
    │   └── utilities.css
    ├── scripts/
    │   └── main.js
    └── assets/
        └── images/

## 17.2. Токени

`tokens.css`:

    :root {
        --color-primary: #1769e0;
        --color-text: #222;
        --color-muted: #666;
        --color-border: #ddd;
        --color-background: #fff;

        --space-sm: 8px;
        --space-md: 16px;
        --space-lg: 24px;
        --space-xl: 40px;

        --radius-md: 8px;
        --radius-lg: 16px;

        --container-width: 1100px;
    }

## 17.3. Базові стилі

`base.css`:

    body {
        margin: 0;
        font-family: Arial, sans-serif;
        line-height: 1.5;
        color: var(--color-text);
        background-color: var(--color-background);
    }

    img {
        display: block;
        max-width: 100%;
        height: auto;
    }

## 17.4. Layout

`layout.css`:

    .container {
        width: min(100% - 32px, var(--container-width));
        margin-inline: auto;
    }

    .section {
        padding-block: var(--space-xl);
    }

    .course-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: var(--space-lg);
    }

    @media (max-width: 800px) {
        .course-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (max-width: 560px) {
        .course-grid {
            grid-template-columns: 1fr;
        }
    }

## 17.5. Кнопка

`components/button.css`:

    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 10px 16px;
        border: 0;
        border-radius: var(--radius-md);
        font: inherit;
        font-weight: 600;
        text-decoration: none;
        cursor: pointer;
    }

    .button--primary {
        background-color: var(--color-primary);
        color: white;
    }

## 17.6. Картка курсу

`components/course-card.css`:

    .course-card {
        overflow: hidden;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        background-color: white;
    }

    .course-card__image {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
    }

    .course-card__content {
        padding: var(--space-md);
    }

    .course-card__title {
        margin-top: 0;
        font-size: 1.25rem;
    }

    .course-card__description {
        color: var(--color-muted);
    }

## 17.7. HTML

`index.html`:

    <!DOCTYPE html>
    <html lang="uk">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Навчальні курси</title>

        <link rel="stylesheet" href="styles/reset.css">
        <link rel="stylesheet" href="styles/tokens.css">
        <link rel="stylesheet" href="styles/base.css">
        <link rel="stylesheet" href="styles/layout.css">
        <link rel="stylesheet" href="styles/components/button.css">
        <link rel="stylesheet" href="styles/components/course-card.css">
    </head>
    <body>
        <main>
            <section class="section">
                <div class="container">
                    <h1>Навчальні курси</h1>

                    <div class="course-grid">
                        <article class="course-card">
                            <img
                                class="course-card__image"
                                src="assets/images/javascript.jpg"
                                alt="Навчання JavaScript"
                            >

                            <div class="course-card__content">
                                <h2 class="course-card__title">
                                    JavaScript
                                </h2>

                                <p class="course-card__description">
                                    Основи програмування для початківців.
                                </p>

                                <a
                                    class="button button--primary"
                                    href="/courses/javascript"
                                >
                                    Переглянути курс
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </main>
    </body>
    </html>

### Що показує цей приклад

1. Спільні значення зберігаються в `tokens.css`.
2. Загальні правила винесені в `base.css`.
3. Сітка сторінки розташована в `layout.css`.
4. Стилі кнопки та картки розділені на окремі компоненти.
5. Назви класів картки використовують BEM-подібний підхід.
6. Адаптивні правила розташовані поруч із сіткою, яку вони змінюють.

У реальному проєкті шляхи до сторінок, зображень і структура файлів можуть бути іншими.

---

# 18. Чекліст для перевірки CSS-архітектури

Використовуй цей список після створення або рефакторингу проєкту.

## Організація файлів

- [ ] Я розумію призначення кожного CSS-файлу.
- [ ] Усі стилі не звалені в один безладний файл.
- [ ] Немає надмірної кількості дрібних файлів.
- [ ] Стилі компонентів можна швидко знайти.
- [ ] Порядок підключення стилів зрозумілий.

## Іменування

- [ ] Назви класів зрозумілі.
- [ ] Однакова система іменування використовується послідовно.
- [ ] Стилі компонентів не залежать без потреби від структури HTML.
- [ ] Варіанти компонентів оформлені послідовно.

## Повторне використання

- [ ] Спільні кольори зберігаються в токенах.
- [ ] Спільні відступи й радіуси не дублюються без потреби.
- [ ] Повторювані елементи оформлені як компоненти.
- [ ] Компоненти можна використовувати в різних частинах сторінки.

## Каскад і специфічність

- [ ] Селектори не мають зайвої вкладеності.
- [ ] Немає безконтрольного використання `!important`.
- [ ] Однакові класи не перевизначаються хаотично.
- [ ] Я розумію, звідки береться остаточний стиль елемента.

## Адаптивність

- [ ] Layout адаптується до різних ширин екрана.
- [ ] Адаптивні правила розташовані логічно.
- [ ] Немає непотрібного дублювання стилів для різних пристроїв.
- [ ] Компоненти залишаються придатними до повторного використання.

## Підтримка

- [ ] Новий розробник може зрозуміти структуру проєкту.
- [ ] Є зрозумілі правила додавання нових компонентів.
- [ ] Архітектура не складніша за сам проєкт.
- [ ] Зміна одного компонента не спричиняє несподіваних змін в інших місцях.

---

# 19. Питання для співбесіди

## Базовий рівень

**1. Що таке CSS Project Architecture?**

Це організація CSS-коду, файлів, компонентів, токенів і правил стилізації для зручної підтримки проєкту.

**2. Навіщо розділяти CSS на файли?**

Щоб групувати правила за призначенням, полегшувати пошук стилів і зменшувати хаос у великому коді.

**3. Що таке модульність CSS?**

Це підхід, за якого стилі поділені на логічні частини, наприклад компоненти, які можна розглядати й підтримувати окремо.

**4. Що таке дизайн-токени?**

Це повторно використовувані значення дизайну: кольори, відступи, радіуси, типографіка та інші параметри.

**5. Чим глобальні стилі відрізняються від компонентних?**

Глобальні стилі задають загальні правила для сторінки, а компонентні — оформлення конкретного UI-компонента.

## Рівень Junior

**6. Яку структуру CSS вибрати для невеликого проєкту?**

Можна почати з одного CSS-файлу. Коли код зростає, варто розділити його на базові стилі, layout, компоненти та utilities.

**7. Чому небажано використовувати надто складні селектори?**

Вони створюють залежність від HTML-структури, ускладнюють перевизначення стилів і підвищують ризик конфліктів.

**8. Що таке CSS Custom Properties і яку роль вони відіграють в архітектурі?**

Це змінні CSS, які дозволяють зберігати й повторно використовувати значення, наприклад кольори та відступи.

**9. Де краще зберігати адаптивні стилі?**

Часто — поруч із компонентом або layout, якого вони стосуються. Головне — зберігати послідовну структуру.

**10. Чи обов'язково створювати окремий файл для кожного компонента?**

Ні. Це залежить від масштабу проєкту та зручності підтримки.

## Рівень Middle

**11. Як зменшити зв'язаність CSS-компонентів?**

Використовувати незалежні класи, обмежувати складні контекстні селектори та уникати залежності компонентів від конкретних контейнерів.

**12. Як підтримувати дизайн-систему в CSS?**

Використовувати спільні токени, повторно використовувані компоненти, правила іменування та документацію.

**13. Чим ITCSS відрізняється від CSS Cascade Layers?**

ITCSS — методологія організації CSS. Cascade Layers — механізм CSS для керування пріоритетом правил між шарами.

**14. Чи можна поєднувати BEM і CSS Modules?**

Так. BEM визначає спосіб іменування класів, а CSS Modules забезпечує локальне зіставлення класів у модулі.

**15. Коли варто рефакторити CSS-архітектуру?**

Коли дублювання, конфлікти, складні селектори або структура файлів починають уповільнювати розробку та збільшувати ризик помилок.

## Рівень Senior

**16. Як спроєктувати CSS-архітектуру для великого проєкту?**

Потрібно визначити межі компонентів, систему токенів, правила іменування, порядок стилів, стратегію ізоляції та правила підтримки.

**17. Як безпечно змінювати CSS-архітектуру наявного проєкту?**

Поступово: визначити проблемні місця, додати правила, рефакторити окремі частини, перевіряти регресії та уникати непотрібних масштабних переписувань.

**18. Як зрозуміти, що CSS-архітектура стала надто складною?**

Якщо для простих змін доводиться шукати правила в багатьох файлах, додавати складні селектори або створювати численні винятки, архітектуру варто переглянути.

**19. Чи завжди компонентні стилі кращі за глобальні?**

Ні. Глобальні стилі потрібні для базових правил, reset і типографіки. Компонентні стилі доречні для конкретних UI-компонентів.

**20. Яка найкраща CSS-архітектура?**

Та, що відповідає масштабу проєкту, дозволяє передбачувано змінювати стилі й не створює зайвої складності.

---

# 20. Навчальний шлях: Core → Junior → Middle → Senior

## Core — основи

Потрібно вміти:

- Розуміти, що таке CSS-архітектура.
- Відрізняти глобальні стилі від компонентних.
- Розділяти базові стилі та layout.
- Використовувати CSS Custom Properties.
- Створювати повторно використовувані компоненти.
- Розуміти роль іменування класів.

Практика: створи сторінку з карткою, кнопкою, навігацією та формою.

## Junior — самостійна організація

Потрібно вміти:

- Вибирати структуру файлів для невеликого проєкту.
- Використовувати BEM або іншу послідовну систему іменування.
- Виносити спільні значення в токени.
- Контролювати специфічність селекторів.
- Організовувати адаптивні стилі.
- Повторно використовувати компоненти на різних сторінках.

Практика: створи багатосторінковий сайт із загальними компонентами Header, Navigation, Card і Footer.

## Middle — масштабування

Потрібно вміти:

- Підтримувати дизайн-систему.
- Організовувати CSS для великої кількості компонентів.
- Поєднувати методології та інструменти без зайвої складності.
- Керувати каскадом і специфічністю.
- Поступово рефакторити CSS.
- Документувати архітектурні рішення.

Практика: переглянь наявний проєкт, усунь дублювання й розділи CSS на логічні модулі.

## Senior — системне проєктування

Потрібно вміти:

- Визначати архітектурні правила для команди.
- Проєктувати систему токенів і компонентів.
- Обирати між глобальним CSS, CSS Modules та іншими підходами.
- Планувати міграцію застарілих стилів.
- Оцінювати компроміси між модульністю та складністю.
- Підтримувати довгострокову передбачуваність CSS-коду.

Практика: розроби короткий документ CSS Architecture Guidelines для великого проєкту.

---

# 21. Мінішпаргалка

| Поняття | Що запам'ятати |
|---|---|
| CSS Architecture | Загальна організація CSS у проєкті |
| Separation of concerns | Розділення відповідальності |
| Modularity | Поділ на логічні частини |
| Reusability | Повторне використання |
| Low coupling | Мінімум зайвих залежностей |
| Reset | Початкові правила для передбачуваної поведінки |
| Base | Загальні стилі сторінки |
| Tokens | Спільні значення дизайну |
| Layout | Структура сторінки |
| Components | Повторно використовувані UI-елементи |
| Utilities | Допоміжні класи |
| BEM | Система іменування класів |
| CSS Modules | Локальне зіставлення класів |
| Cascade Layers | Механізм керування пріоритетом між шарами CSS |
| Responsive CSS | Стилі для різних розмірів екрана |

## Типова структура невеликого проєкту

    project/
    ├── index.html
    ├── styles/
    │   ├── reset.css
    │   ├── tokens.css
    │   ├── base.css
    │   ├── layout.css
    │   ├── components/
    │   │   ├── button.css
    │   │   └── card.css
    │   └── utilities.css
    └── scripts/
        └── main.js

## Основні принципи

- Глобальні стилі — для загальних правил.
- Компонентні стилі — для конкретних компонентів.
- Токени — для повторно використовуваних значень.
- Прості селектори — для передбачуваного каскаду.
- Послідовні назви — для зручної навігації.
- Адаптивні правила — поруч із компонентом або layout, якого вони стосуються.
- Структура файлів — відповідно до масштабу проєкту.

---

# 22. Головне, що потрібно запам'ятати

1. **CSS-архітектура визначає, як організований увесь стильовий код проєкту.**
2. Не існує єдиної структури папок, яка підходить для кожного проєкту.
3. Для маленьких вправ достатньо одного CSS-файлу; зі зростанням проєкту стилі можна поступово розділяти.
4. Reset, Base, Tokens, Layout, Components та Utilities мають різні завдання.
5. Глобальні стилі повинні залишатися обмеженими й передбачуваними.
6. Компоненти потрібно робити максимально незалежними від конкретного місця на сторінці.
7. CSS Custom Properties допомагають підтримувати спільні значення й теми оформлення.
8. BEM, ITCSS, SMACSS та інші методології можна поєднувати, якщо правила послідовні.
9. CSS Modules, Sass, Cascade Layers і CSS Nesting — інструменти, які можуть доповнювати архітектуру, але не замінюють її.
10. Не варто ускладнювати структуру раніше, ніж виникає реальна потреба.
11. Хороша архітектура зменшує дублювання, полегшує пошук стилів і робить зміни безпечнішими.
12. Архітектура повинна допомагати розробляти проєкт, а не змушувати витрачати більше часу на обслуговування самої структури.

**Практичне правило:** почни з `reset.css`, `tokens.css`, `base.css`, `layout.css` і стилів компонентів. Використовуй послідовні назви класів, контролюй специфічність і додавай нові рівні організації лише тоді, коли вони справді полегшують підтримку проєкту.