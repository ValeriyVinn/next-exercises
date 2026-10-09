# CSS Methodologies — Методології організації CSS

> **CSS Methodologies** — це підходи та правила організації CSS-коду, які допомагають створювати зрозумілі, масштабовані та зручні для підтримки стилі.
>
> Головна мета методологій — зробити CSS передбачуваним: щоб було зрозуміло, до якого компонента належить стиль, як він взаємодіє з іншими стилями та як безпечно змінювати дизайн проєкту.

---

## 1. Навіщо потрібні CSS Methodologies

На початку навчання CSS часто складається з невеликої кількості правил:

    h1 {
        color: navy;
    }

    .button {
        background-color: blue;
    }

    .card {
        padding: 20px;
    }

У невеликому проєкті цього може бути достатньо.

Але коли проєкт зростає, з'являються десятки компонентів, сотні класів, адаптивні стилі, різні стани кнопок і форм. CSS стає складніше підтримувати.

Наприклад:

    .button {
        background-color: blue;
        color: white;
    }

    header .button {
        background-color: green;
    }

    .sidebar .button {
        background-color: orange;
    }

    .page .sidebar .button {
        background-color: purple;
    }

Тепер вигляд кнопки залежить від того, де вона розташована. Зміна одного правила може несподівано вплинути на інші сторінки.

CSS Methodologies допомагають розв'язувати такі проблеми.

### Основні цілі

- **Predictability** — передбачуваність стилів.
- **Maintainability** — простота підтримки коду.
- **Scalability** — можливість розширювати проєкт.
- **Reusability** — повторне використання компонентів.
- **Low specificity** — контроль специфічності селекторів.
- **Isolation** — зменшення небажаного впливу стилів між компонентами.
- **Consistency** — єдині правила написання CSS у всьому проєкті.

### Що потрібно запам'ятати

Методологія — це не нова CSS-властивість і не окрема технологія. Це набір домовленостей про те, **як писати, називати, групувати та підтримувати CSS-код**.

---

## 2. Основні CSS Methodologies

Найвідоміші підходи до організації CSS:

| Методологія | Основна ідея |
|---|---|
| BEM | Іменування класів за схемою Block–Element–Modifier |
| OOCSS | Розділення структури та зовнішнього вигляду, повторне використання стилів |
| SMACSS | Організація CSS за категоріями та призначенням |
| ITCSS | Розташування стилів у шарах за рівнем впливу |
| Utility-first | Створення інтерфейсу з невеликих класів-утиліт |
| Component-based CSS | Організація стилів навколо UI-компонентів |

Ці підходи не завжди взаємовиключні. У реальних проєктах часто використовують комбінації.

Наприклад:
- BEM для назв класів компонентів.
- ITCSS для організації файлів.
- CSS Custom Properties для дизайн-токенів.
- CSS Modules для ізоляції стилів React-компонентів.
- Utility-класи для невеликих допоміжних змін.

---

# 3. BEM — Block, Element, Modifier

## 3.1. Що таке BEM

**BEM** — це методологія іменування CSS-класів, назва якої утворена від трьох понять:

- **Block** — незалежний компонент інтерфейсу.
- **Element** — частина компонента, яка залежить від нього.
- **Modifier** — варіант або стан компонента чи його елемента.

BEM допомагає зрозуміти призначення класу лише за його назвою.

Наприклад, картка товару може мати таку структуру:

    <article class="product-card">
        <img
            class="product-card__image"
            src="product.jpg"
            alt="Навчальна книга"
        >

        <h2 class="product-card__title">
            Навчальна книга
        </h2>

        <p class="product-card__price">
            500 грн
        </p>

        <button class="product-card__button product-card__button--primary">
            Купити
        </button>
    </article>

Тут:
- `product-card` — Block.
- `product-card__image` — Element.
- `product-card__title` — Element.
- `product-card__price` — Element.
- `product-card__button` — Element.
- `product-card__button--primary` — Modifier.

## 3.2. Block

**Block** — самостійний компонент, який можна повторно використовувати в різних частинах сайту.

Приклади:

    .header {}
    .navigation {}
    .product-card {}
    .button {}
    .search-form {}
    .user-profile {}

Block не повинен залежати від конкретного місця розташування на сторінці.

Добре:

    .product-card {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
    }

Небажано:

    .sidebar .product-card {
        padding: 20px;
    }

Другий варіант прив'язує компонент до конкретного контейнера. Якщо картка з'явиться в іншому місці, доведеться враховувати додаткову залежність.

Важливо: контекстні селектори не заборонені, але їх не варто робити основним способом оформлення компонентів.

## 3.3. Element

**Element** — частина Block, яка не має самостійного сенсу поза цим Block у межах обраної моделі компонента.

Синтаксис:

    .block__element

Приклади:

    .product-card__title {}
    .product-card__image {}
    .product-card__description {}
    .product-card__button {}

HTML:

    <article class="product-card">
        <h2 class="product-card__title">Назва товару</h2>
        <p class="product-card__description">Опис товару</p>
    </article>

CSS:

    .product-card {
        padding: 20px;
    }

    .product-card__title {
        margin-bottom: 10px;
        font-size: 1.25rem;
    }

    .product-card__description {
        color: #555;
        line-height: 1.6;
    }

### Чи можна вкладати Element в інший Element?

У BEM назви елементів зазвичай прив'язують безпосередньо до Block.

Наприклад, замість:

    .product-card__content__title {}

краще:

    .product-card__title {}

Навіть якщо в HTML є вкладені елементи:

    <article class="product-card">
        <div class="product-card__content">
            <h2 class="product-card__title">Назва</h2>
        </div>
    </article>

У CSS:

    .product-card__content {
        padding: 16px;
    }

    .product-card__title {
        font-size: 1.25rem;
    }

Структура HTML і структура назв BEM-класів не повинні обов'язково збігатися рівень у рівень.

## 3.4. Modifier

**Modifier** — клас, який описує варіант компонента, його зовнішній вигляд або стан.

Синтаксис:

    .block--modifier
    .block__element--modifier

Приклади:

    .button--primary {}
    .button--secondary {}
    .button--large {}

    .product-card--featured {}
    .product-card__button--disabled {}

HTML:

    <button class="button button--primary">
        Зберегти
    </button>

    <button class="button button--secondary">
        Скасувати
    </button>

CSS:

    .button {
        padding: 10px 16px;
        border: none;
        border-radius: 6px;
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

Modifier зазвичай додається разом з основним класом.

Правильно:

    <button class="button button--primary">Зберегти</button>

Не варто покладатися лише на Modifier:

    <button class="button--primary">Зберегти</button>

Якщо `.button--primary` містить тільки колір, без базового `.button` кнопка може втратити спільні стилі: відступи, форму, курсор тощо.

## 3.5. BEM: приклад повного компонента

HTML:

    <article class="news-card news-card--featured">
        <img
            class="news-card__image"
            src="news.jpg"
            alt="Міський парк"
        >

        <div class="news-card__content">
            <p class="news-card__category">Місто</p>

            <h2 class="news-card__title">
                Відкриття нового парку
            </h2>

            <p class="news-card__description">
                У місті відкрили новий громадський простір.
            </p>

            <a class="news-card__link" href="/news/park">
                Читати далі
            </a>
        </div>
    </article>

CSS:

    .news-card {
        overflow: hidden;
        border: 1px solid #ddd;
        border-radius: 12px;
        background-color: white;
    }

    .news-card__image {
        display: block;
        width: 100%;
        height: 220px;
        object-fit: cover;
    }

    .news-card__content {
        padding: 20px;
    }

    .news-card__category {
        color: #1769e0;
        font-size: 0.875rem;
        font-weight: 700;
    }

    .news-card__title {
        margin-block: 8px;
        font-size: 1.5rem;
    }

    .news-card__description {
        color: #555;
        line-height: 1.6;
    }

    .news-card__link {
        display: inline-block;
        margin-top: 12px;
        color: #1769e0;
    }

    .news-card--featured {
        border-color: #1769e0;
    }

### Переваги BEM

- З назви зрозуміле призначення класу.
- Стилі компонентів легше знаходити.
- Менша потреба у складних селекторах.
- Компоненти простіше переносити між сторінками.
- Зручно працювати в команді.

### Недоліки BEM

- Назви класів можуть бути довгими.
- HTML може містити багато класів.
- Потрібна дисципліна в іменуванні.
- Для невеликих сторінок методологія іноді здається надмірною.

---

# 4. OOCSS — Object-Oriented CSS

## 4.1. Основна ідея

**OOCSS** — підхід, який розглядає повторювані частини інтерфейсу як об'єкти, що можна повторно використовувати.

Два основні принципи:

1. **Separate structure from skin** — відокремлювати структуру від зовнішнього вигляду.
2. **Separate container from content** — зменшувати залежність стилів вмісту від конкретного контейнера.

OOCSS не є суворим стандартом синтаксису. Це спосіб мислення про повторне використання CSS.

## 4.2. Відокремлення структури від зовнішнього вигляду

Невдалий приклад:

    .blue-button {
        display: inline-block;
        padding: 10px 16px;
        background-color: blue;
        color: white;
        border-radius: 6px;
    }

    .red-button {
        display: inline-block;
        padding: 10px 16px;
        background-color: red;
        color: white;
        border-radius: 6px;
    }

У двох класах повторюється структура кнопки.

Краще:

    .button {
        display: inline-block;
        padding: 10px 16px;
        border: none;
        border-radius: 6px;
        color: white;
    }

    .button--blue {
        background-color: blue;
    }

    .button--red {
        background-color: red;
    }

HTML:

    <button class="button button--blue">Зберегти</button>

    <button class="button button--red">Видалити</button>

Тут `.button` відповідає за спільну структуру, а додаткові класи — за варіанти оформлення.

## 4.3. Відокремлення контейнера від вмісту

Небажано прив'язувати однаковий заголовок до кожного конкретного контейнера:

    .sidebar h2 {
        font-size: 20px;
        color: #222;
    }

    .article h2 {
        font-size: 20px;
        color: #222;
    }

Якщо заголовки мають однакове призначення та оформлення, можна створити спільний клас:

    .section-title {
        font-size: 20px;
        color: #222;
    }

HTML:

    <aside class="sidebar">
        <h2 class="section-title">Популярне</h2>
    </aside>

    <article class="article">
        <h2 class="section-title">Останні новини</h2>
    </article>

Тепер стиль не залежить від контейнера.

### Коли корисний OOCSS

- Є багато повторюваних елементів.
- Потрібно створити набір повторно використовуваних стилів.
- Компоненти мають спільну структуру, але різний вигляд.
- Проєкт містить багато карток, кнопок, панелей і блоків.

---

# 5. SMACSS — Scalable and Modular Architecture for CSS

## 5.1. Основна ідея

**SMACSS** — методологія організації CSS за категоріями правил.

Замість того щоб зберігати всі стилі в одному великому файлі, правила групують відповідно до їхнього призначення.

Традиційно SMACSS виділяє п'ять категорій:

1. Base
2. Layout
3. Module
4. State
5. Theme

Ці категорії можуть бути представлені окремими файлами або логічними секціями.

## 5.2. Base — базові стилі

Base містить стилі HTML-елементів і загальні початкові правила.

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: Arial, sans-serif;
        line-height: 1.5;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    a {
        color: inherit;
    }

Base зазвичай не описує конкретні компоненти на кшталт карток товарів.

## 5.3. Layout — структура сторінки

Layout визначає великі структурні області сторінки:

- Header
- Main
- Sidebar
- Footer
- Основна сітка сторінки

Приклад:

    .layout {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 280px;
        gap: 24px;
    }

    .layout__main {
        min-width: 0;
    }

    .layout__sidebar {
        align-self: start;
    }

Для особливих layout-класів у SMACSS часто використовують префікс `l-`:

    .l-container {}
    .l-header {}
    .l-sidebar {}

Це домовленість, а не вимога браузера.

## 5.4. Module — незалежні компоненти

Module — повторно використовувані частини інтерфейсу.

Приклади:

    .card {}
    .navigation {}
    .search-form {}
    .product-list {}
    .modal {}

Модуль має бути відносно незалежним від місця розташування на сторінці.

## 5.5. State — стани елементів

State описує змінений стан компонента:

- Відкритий або закритий.
- Активний або неактивний.
- Прихований або видимий.
- Успішний або помилковий.

Приклад:

    .is-active {
        font-weight: 700;
    }

    .is-hidden {
        display: none;
    }

    .is-expanded {
        max-height: 500px;
    }

Або стани, прив'язані до конкретного компонента:

    .accordion__panel.is-open {
        display: block;
    }

Префікс `is-` часто використовують для класів стану, але це не обов'язкова частина SMACSS.

## 5.6. Theme — теми оформлення

Theme містить стилі, які змінюють візуальну тему сайту.

    .theme-dark {
        background-color: #181818;
        color: #f5f5f5;
    }

    .theme-light {
        background-color: #ffffff;
        color: #222222;
    }

У сучасному CSS для тем також часто застосовують Custom Properties:

    :root {
        color-scheme: light;
        --page-background: #ffffff;
        --page-text: #222222;
    }

    [data-theme="dark"] {
        color-scheme: dark;
        --page-background: #181818;
        --page-text: #f5f5f5;
    }

    body {
        background-color: var(--page-background);
        color: var(--page-text);
    }

## 5.7. Приклад організації файлів SMACSS

    styles/
    ├── base.css
    ├── layout.css
    ├── modules.css
    ├── states.css
    └── themes.css

Або за компонентами:

    styles/
    ├── base/
    │   ├── reset.css
    │   └── typography.css
    ├── layout/
    │   ├── header.css
    │   └── grid.css
    ├── modules/
    │   ├── button.css
    │   └── card.css
    ├── states/
    │   └── states.css
    └── themes/
        └── themes.css

Це лише приклади структури. SMACSS не вимагає саме таких назв файлів.

### Коли корисний SMACSS

- Стилі вже не вміщуються в один невеликий файл.
- Потрібно розділити базові правила, layout і компоненти.
- Кілька розробників працюють над однією кодовою базою.
- Потрібно впорядкувати великий проєкт без обов'язкового переходу на новий інструмент.

---

# 6. ITCSS — Inverted Triangle CSS

## 6.1. Основна ідея

**ITCSS** — методологія, яка пропонує організовувати CSS від загальних правил із широким впливом до конкретних правил із вузьким впливом.

Її часто пояснюють як перевернутий трикутник.

На початку — стилі, що впливають на значну частину сайту. Наприкінці — стилі конкретних компонентів і винятків.

Основна мета — контролювати каскад і не створювати хаотичну специфічність.

## 6.2. Типові шари ITCSS

Поширена схема:

1. Settings
2. Tools
3. Generic
4. Elements
5. Objects
6. Components
7. Utilities

Деталі можуть відрізнятися залежно від проєкту.

### Settings

Налаштування та змінні, які використовуються в різних частинах CSS.

    :root {
        --color-primary: #1769e0;
        --color-text: #222222;
        --space-md: 16px;
        --radius-md: 8px;
    }

### Tools

Допоміжні інструменти препроцесорів або системи збірки: наприклад, Sass mixins і functions.

У звичайному CSS окремий шар Tools може бути відсутнім.

### Generic

Загальні правила, reset і нормалізація.

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html {
        text-size-adjust: 100%;
    }

### Elements

Стилі HTML-елементів без класів.

    body {
        margin: 0;
        color: var(--color-text);
    }

    h1,
    h2,
    h3 {
        line-height: 1.2;
    }

### Objects

Низькорівневі структурні патерни, які можна використовувати повторно.

    .o-container {
        width: min(100% - 32px, 1200px);
        margin-inline: auto;
    }

    .o-stack > * + * {
        margin-block-start: 16px;
    }

Префікс `o-` часто використовують для позначення об'єктів.

### Components

Конкретні компоненти інтерфейсу.

    .c-card {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: var(--radius-md);
    }

    .c-button {
        padding: 10px 16px;
        border: 0;
        border-radius: var(--radius-md);
        background-color: var(--color-primary);
        color: white;
    }

Префікс `c-` може позначати компонент.

### Utilities

Маленькі класи з вузьким призначенням, які часто мають перевагу над звичайними стилями компонента.

    .u-hidden {
        display: none !important;
    }

    .u-text-center {
        text-align: center !important;
    }

Префікс `u-` часто використовують для утиліт.

`!important` не потрібен кожному utility-класу. Його застосування має бути свідомим рішенням, а не способом компенсувати погано організований каскад.

## 6.3. Приклад структури ITCSS

    styles/
    ├── 01-settings/
    │   └── variables.css
    ├── 02-tools/
    │   └── tools.css
    ├── 03-generic/
    │   └── reset.css
    ├── 04-elements/
    │   └── elements.css
    ├── 05-objects/
    │   └── container.css
    ├── 06-components/
    │   ├── button.css
    │   └── card.css
    └── 07-utilities/
        └── utilities.css

Числа в назвах папок допомагають зберігати порядок, але не є обов'язковими.

### Коли корисний ITCSS

- Проєкт має багато CSS-файлів.
- Потрібно контролювати порядок підключення стилів.
- Кілька команд працюють над спільною системою компонентів.
- Проблеми специфічності виникають через безсистемне додавання правил.

---

# 7. Utility-first CSS

## 7.1. Основна ідея

**Utility-first** — підхід, у якому інтерфейс створюється за допомогою невеликих класів, кожен з яких відповідає за одну властивість або вузьку групу властивостей.

Наприклад:

    <div class="flex gap-4 p-4">
        <h2 class="text-xl font-bold">Заголовок</h2>
        <p class="text-gray">Опис</p>
    </div>

Тут класи `flex`, `gap-4`, `p-4`, `text-xl` та інші представляють невеликі стилістичні операції.

Такий підхід популярний у Tailwind CSS, але utility-first можна реалізувати і власними CSS-класами.

## 7.2. Власні utility-класи

HTML:

    <section class="u-container u-stack">
        <h2 class="u-text-center">Наші послуги</h2>
        <p>Опис послуг компанії.</p>
    </section>

CSS:

    .u-container {
        width: min(100% - 32px, 1200px);
        margin-inline: auto;
    }

    .u-stack > * + * {
        margin-block-start: 16px;
    }

    .u-text-center {
        text-align: center;
    }

Utility-класи можна поєднувати з компонентними класами:

    <article class="card u-stack">
        <h2 class="card__title">Назва</h2>
        <p class="card__description">Опис картки.</p>
    </article>

## 7.3. Переваги utility-first

- Стилі можна комбінувати без створення окремого класу для кожного варіанта.
- Менше дублювання невеликих правил.
- Легко змінювати відступи, розташування та вирівнювання.
- У системах на кшталт Tailwind багато значень узгоджені між собою.

## 7.4. Недоліки utility-first

- HTML може містити багато класів.
- Складні компоненти можуть мати довгі списки класів.
- Без дизайн-системи можна створити надто багато довільних значень.
- Потрібно розуміти, які класи є утилітами, а які — компонентами.

Utility-first не означає, що всі стилі обов'язково потрібно записувати в HTML. Компоненти зі складною поведінкою або повторюваною структурою все одно можуть мати власні класи.

---

# 8. Component-based CSS

## 8.1. Основна ідея

**Component-based CSS** — організація стилів навколо компонентів інтерфейсу.

Замість того щоб групувати всі правила лише за HTML-тегами, стилі розділяють на логічні частини:

- Button
- Card
- Header
- Navigation
- Modal
- Form
- ProductList

Цей підхід природно поєднується з React, Vue та іншими компонентними бібліотеками.

## 8.2. Приклад структури

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

Це один із можливих варіантів організації React-проєкту, а не обов'язкова структура.

## 8.3. Звичайний компонентний CSS

    .card {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
    }

    .card__title {
        margin-top: 0;
    }

Тут стилі компонента згруповані разом. Назви класів можуть відповідати BEM або іншій домовленості.

## 8.4. CSS Modules

CSS Modules дозволяє локально обмежувати імена класів компонентом або модулем.

Файл `Card.module.css`:

    .card {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
    }

    .title {
        margin-top: 0;
    }

Файл `Card.tsx`:

    import styles from "./Card.module.css";

    type CardProps = {
        title: string;
        children: React.ReactNode;
    };

    export default function Card({ title, children }: CardProps) {
        return (
            <article className={styles.card}>
                <h2 className={styles.title}>{title}</h2>
                {children}
            </article>
        );
    }

У цьому прикладі TypeScript використовується для типізації властивостей компонента, а CSS Modules — для локальних імен класів.

Важливо розрізняти:
- **Component-based CSS** — спосіб організації стилів навколо компонентів.
- **CSS Modules** — технологія, що забезпечує локальне зіставлення CSS-класів.
- **BEM** — методологія іменування класів.
- **React** — бібліотека для побудови інтерфейсів.

Ці поняття можуть використовуватися разом.

---

# 9. Як поєднувати методології

Не потрібно обирати лише одну методологію для всіх завдань.

Наприклад, у невеликому навчальному проєкті можна використовувати:

- BEM для іменування класів.
- Component-based CSS для розташування файлів.
- CSS Custom Properties для кольорів і відступів.
- ITCSS-подібний порядок підключення базових стилів і компонентів.
- Utility-класи для вирівнювання або приховування елементів.

## 9.1. Приклад комбінованого підходу

Структура:

    styles/
    ├── base.css
    ├── variables.css
    ├── utilities.css
    └── components/
        ├── button.css
        └── product-card.css

`variables.css`:

    :root {
        --color-primary: #1769e0;
        --color-text: #222;
        --color-border: #ddd;
        --space-md: 16px;
        --radius-md: 8px;
    }

`components/product-card.css`:

    .product-card {
        padding: var(--space-md);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
    }

    .product-card__title {
        margin-block: 0 8px;
        color: var(--color-text);
    }

    .product-card__button {
        padding: 10px 16px;
        border: 0;
        border-radius: var(--radius-md);
        background-color: var(--color-primary);
        color: white;
    }

`utilities.css`:

    .u-text-center {
        text-align: center;
    }

    .u-hidden {
        display: none;
    }

HTML:

    <article class="product-card">
        <h2 class="product-card__title">Навчальна книга</h2>

        <p>Опис товару.</p>

        <button class="product-card__button">
            Купити
        </button>
    </article>

Тут:
- Custom Properties зберігають спільні значення.
- BEM описує компоненти та їхні частини.
- Структура файлів підтримує компонентний підхід.
- Utility-класи можуть застосовуватися там, де вони справді корисні.

---

# 10. Naming conventions — правила іменування

Методологія CSS часто починається з назв класів.

Порівняймо кілька підходів.

### Звичайні описові назви

    .card {}
    .card-title {}
    .card-image {}

Простий варіант для невеликих проєктів.

### BEM

    .card {}
    .card__title {}
    .card__image {}
    .card--featured {}

Підкреслення відокремлює Element, подвійний дефіс — Modifier.

### SMACSS-подібні назви

    .l-container {}
    .is-active {}
    .card {}

Префікси можуть показувати категорію правила або стан.

### ITCSS-подібні назви

    .o-container {}
    .c-card {}
    .u-hidden {}

Префікси можуть розрізняти Objects, Components і Utilities.

### Власна система

    .app-header {}
    .app-navigation {}
    .product-card {}
    .form-error {}

Це теж прийнятно, якщо назви послідовні й зрозумілі.

## 10.1. Правила хорошого іменування

1. Назва повинна описувати призначення, а не випадковий вигляд.
2. Однакові типи компонентів мають називатися послідовно.
3. Уникай надто загальних назв, які можуть конфліктувати.
4. Не прив'язуй назву компонента до місця на сторінці без потреби.
5. Не створюй новий клас для кожного незначного варіанта, якщо достатньо Modifier.
6. Не змішуй кілька систем іменування без зрозумілих правил.

Невдало:

    .red-box {}
    .big-text {}
    .left-block {}

Такі назви описують зовнішній вигляд або розташування, а не призначення.

Краще:

    .alert {}
    .page-title {}
    .sidebar {}

Але назви на кшталт `.text-center` або `.u-hidden` можуть бути доречними для utility-класів. Контекст важливий.

---

# 11. CSS Specificity та методології

**Specificity** — специфічність селектора, яка бере участь у визначенні того, яке правило застосовується, коли декларації конфліктують.

Методології часто допомагають зменшити складність селекторів і кількість конфліктів.

Наприклад, такий CSS складно підтримувати:

    body .page main .content article.card h2.title {
        color: navy;
    }

Натомість простіший варіант:

    .card__title {
        color: navy;
    }

Другий селектор легше знайти, повторно використати й перевизначити.

## 11.1. Чому важлива низька специфічність

Якщо кожне нове правило має вищу специфічність за попереднє, CSS поступово стає складнішим:

    .button {
        color: black;
    }

    .page .button {
        color: blue;
    }

    main .page .button {
        color: green;
    }

    body main .page .button {
        color: red;
    }

У результаті для наступної зміни доводиться створювати ще складніший селектор або використовувати `!important`.

Краще створити чіткі варіанти компонента:

    .button {
        color: black;
    }

    .button--primary {
        color: blue;
    }

    .button--danger {
        color: red;
    }

Варто пам'ятати, що каскад CSS залежить не лише від специфічності. Також мають значення походження правил, `!important`, каскадні шари та порядок оголошення.

## 11.2. Не використовуй ID для звичайного оформлення компонентів без потреби

Приклад:

    #main-button {
        background-color: blue;
    }

Для повторно використовуваного компонента краще:

    .button {
        background-color: blue;
    }

ID залишаються корисними для унікальних ідентифікаторів у HTML, якорів і JavaScript-взаємодій. Але класи зазвичай зручніші для багаторазових стилів.

---

# 12. Організація CSS-файлів

Методологія визначає не лише назви класів, а й те, як зберігати стилі.

## 12.1. Один CSS-файл

    project/
    ├── index.html
    └── styles.css

Підходить для:
- невеликих сторінок;
- перших навчальних завдань;
- простих демонстрацій CSS-властивостей.

Перевага — простота.

Недолік — великий файл може стати важким для навігації.

## 12.2. Поділ за типами стилів

    styles/
    ├── reset.css
    ├── base.css
    ├── layout.css
    ├── components.css
    └── utilities.css

Підходить для невеликих і середніх проєктів, де стилі природно розділяються на групи.

## 12.3. Поділ за компонентами

    styles/
    ├── base.css
    └── components/
        ├── header.css
        ├── navigation.css
        ├── button.css
        ├── card.css
        └── footer.css

Перевага — стилі компонента легко знаходити.

## 12.4. Організація за компонентами React

    src/
    ├── components/
    │   ├── Header/
    │   │   ├── Header.tsx
    │   │   └── Header.module.css
    │   ├── Button/
    │   │   ├── Button.tsx
    │   │   └── Button.module.css
    │   └── Card/
    │       ├── Card.tsx
    │       └── Card.module.css
    └── app/

Тут стилі розташовані поруч із компонентами.

Для React-проєктів такий підхід може бути зручним, але конкретна структура залежить від розміру й архітектури застосунку.

---

# 13. CSS Custom Properties і методології

CSS Custom Properties — це механізм зберігання повторно використовуваних значень.

Вони не є методологією самі по собі, але добре поєднуються з BEM, SMACSS, ITCSS і компонентним CSS.

Приклад:

    :root {
        --color-primary: #1769e0;
        --color-danger: #d32f2f;
        --color-text: #222;
        --space-sm: 8px;
        --space-md: 16px;
        --space-lg: 24px;
        --radius-md: 8px;
    }

    .button {
        padding: var(--space-sm) var(--space-md);
        border-radius: var(--radius-md);
        border: none;
    }

    .button--primary {
        background-color: var(--color-primary);
        color: white;
    }

    .button--danger {
        background-color: var(--color-danger);
        color: white;
    }

Переваги:
- кольори зберігаються в одному місці;
- відступи стають послідовними;
- зміни дизайн-системи потребують менше редагування;
- можна створювати теми.

Не варто створювати змінну для кожного випадкового значення. Найбільшу користь Custom Properties дають для спільних значень і дизайн-токенів.

---

# 14. Методології та Sass / SCSS

Sass — препроцесор CSS, який додає можливості на кшталт змінних, міксинів і вкладених правил.

Методологія та препроцесор вирішують різні завдання.

| Поняття | Що вирішує |
|---|---|
| BEM | Як називати класи |
| OOCSS | Як повторно використовувати стилі |
| SMACSS | Як групувати правила |
| ITCSS | Як організувати шари й порядок стилів |
| Sass | Як розширити можливості написання CSS |
| CSS Nesting | Як вкладати правила в сучасному CSS |
| CSS Modules | Як локально обмежувати назви класів |

Наприклад, BEM можна використовувати і зі звичайним CSS, і з Sass:

    .product-card {
        padding: 20px;

        &__title {
            font-size: 1.25rem;
        }

        &--featured {
            border: 2px solid gold;
        }
    }

Цей приклад використовує синтаксис Sass/SCSS, де `&__title` і `&--featured` формують назви класів від батьківського селектора.

**Увага:** не плутай Sass-вкладеність із нативним CSS Nesting. У звичайному сучасному CSS не можна автоматично використовувати Sass-підхід із приєднанням `&` до суфікса для створення BEM-класів.

У звичайному CSS краще записати:

    .product-card {
        padding: 20px;
    }

    .product-card__title {
        font-size: 1.25rem;
    }

    .product-card--featured {
        border: 2px solid gold;
    }

Методологія визначає організацію стилів, а синтаксис і можливості залежать від технології, яку використовує проєкт.

---

# 15. Типові помилки під час використання методологій

## Помилка 1. Змішування різних систем без правил

Наприклад:

    .card {}
    .card__title {}
    .c-card {}
    .u-blue {}
    .is-active {}

Ці класи можуть бути цілком доречними, але якщо в проєкті немає домовленостей, складно зрозуміти, яку систему використовувати для нового компонента.

**Рішення:** обери основний підхід і зафіксуй правила в README проєкту.

## Помилка 2. Надто складні селектори

    .page .content .sidebar .card .card-title {
        color: red;
    }

**Рішення:** використовуй класи компонентів і зрозуміле іменування.

    .card__title {
        color: red;
    }

## Помилка 3. Створення класів лише за кольором

    .red-button {}
    .blue-button {}
    .green-button {}

Це може ускладнити зміну оформлення та повторне використання компонента.

**Рішення:** відокремлюй базову структуру від варіанта оформлення.

    .button {}
    .button--primary {}
    .button--success {}
    .button--danger {}

## Помилка 4. Надмірне використання `!important`

    .button {
        color: blue !important;
    }

    .page .button {
        color: red !important;
    }

Такі правила ускладнюють контроль каскаду.

**Рішення:** перевір специфічність, порядок стилів і архітектуру класів. Використовуй `!important` лише там, де це справді потрібно.

## Помилка 5. Надмірне дублювання

    .button-primary {
        padding: 10px 16px;
        border-radius: 6px;
    }

    .button-secondary {
        padding: 10px 16px;
        border-radius: 6px;
    }

    .button-danger {
        padding: 10px 16px;
        border-radius: 6px;
    }

**Рішення:** винеси спільні стилі в базовий клас.

    .button {
        padding: 10px 16px;
        border-radius: 6px;
    }

    .button--primary {
        background-color: blue;
    }

    .button--secondary {
        background-color: gray;
    }

    .button--danger {
        background-color: red;
    }

## Помилка 6. Надмірна кількість дрібних файлів

Не кожен клас потребує окремого CSS-файлу.

**Рішення:** вибирай структуру відповідно до масштабу проєкту. Для невеликого навчального проєкту кілька добре організованих файлів можуть бути зручнішими, ніж десятки файлів.

## Помилка 7. Змішування структури HTML із назвами класів

Не потрібно створювати назву класу для кожного рівня вкладеності.

Небажано:

    .card__body__content__title {}

Краще:

    .card__title {}

Назва класу має відображати роль елемента, а не механічно повторювати всю HTML-ієрархію.

## Помилка 8. Використання методології заради самої методології

Не кожен проєкт потребує повної реалізації BEM, ITCSS, SMACSS і utility-first одночасно.

**Рішення:** починай із простих правил. Додавай складніші інструменти, коли з'являється реальна потреба.

---

# 16. Практичні завдання

## Завдання 1. Перепиши CSS за принципами BEM

Початковий HTML:

    <div class="card">
        <h2>Курс JavaScript</h2>
        <p>Навчальний курс для початківців.</p>
        <button>Детальніше</button>
    </div>

Початковий CSS:

    .card h2 {
        font-size: 24px;
    }

    .card p {
        color: gray;
    }

    .card button {
        background-color: blue;
        color: white;
    }

Що потрібно зробити:

1. Додати класи елементам картки.
2. Прибрати залежність стилів від тегів усередині `.card`.
3. Використати назви `card__title`, `card__description`, `card__button`.
4. Створити Modifier для виділеної картки.

Можливий результат:

    <article class="card card--featured">
        <h2 class="card__title">Курс JavaScript</h2>

        <p class="card__description">
            Навчальний курс для початківців.
        </p>

        <button class="card__button">
            Детальніше
        </button>
    </article>

    .card {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
    }

    .card__title {
        font-size: 24px;
    }

    .card__description {
        color: gray;
    }

    .card__button {
        padding: 10px 16px;
        background-color: blue;
        color: white;
    }

    .card--featured {
        border-color: gold;
    }

## Завдання 2. Застосуй OOCSS

Є три кнопки з однаковою структурою, але різним кольором.

    <button class="blue-button">Зберегти</button>
    <button class="green-button">Підтвердити</button>
    <button class="red-button">Видалити</button>

Що потрібно зробити:

1. Створи спільний клас `.button`.
2. Перенеси до нього спільні відступи, рамку й форму.
3. Створи класи варіантів `.button--primary`, `.button--success`, `.button--danger`.
4. Перевір, що кожна кнопка зберігає спільні стилі.

## Завдання 3. Організуй CSS за SMACSS

Візьми невелику сторінку, де є:
- Header;
- Sidebar;
- картки;
- кнопки;
- активний пункт навігації.

Розподіли стилі на п'ять категорій:

    base.css
    layout.css
    modules.css
    states.css
    themes.css

Не обов'язково створювати всі файли, якщо для якоїсь категорії поки немає правил. Важливіше зрозуміти призначення кожної групи.

## Завдання 4. Організуй стилі за ITCSS

Розподіли наведені правила:

- CSS reset;
- глобальна типографіка;
- CSS Custom Properties;
- контейнер сторінки;
- картка товару;
- клас приховування елемента.

Визнач, до якого шару належить кожне правило: Settings, Generic, Elements, Objects, Components або Utilities.

## Завдання 5. Створи власну мініметодологію

Для свого навчального проєкту зафіксуй:

1. Як називатимуться компоненти.
2. Як позначатимуться частини компонентів.
3. Як позначатимуться варіанти компонентів.
4. Де зберігатимуться CSS-файли.
5. Як зберігатимуться спільні кольори й відступи.
6. Коли дозволено використовувати контекстні селектори.
7. Як додаватимуться utility-класи.

Напиши короткий `CSS_CONVENTIONS.md`, щоб ці правила можна було застосовувати в наступних проєктах.

---

# 17. Питання для співбесіди

### Базовий рівень

**1. Що таке CSS Methodology?**

Набір принципів і домовленостей щодо іменування, організації та повторного використання CSS.

**2. Що означає BEM?**

Block, Element, Modifier.

**3. Чим Block відрізняється від Element?**

Block — незалежний компонент. Element — частина цього компонента.

**4. Для чого потрібен Modifier?**

Для позначення варіанта оформлення або стану компонента чи його елемента.

**5. Що таке Utility-клас?**

Невеликий клас із вузьким призначенням, наприклад для вирівнювання тексту або приховування елемента.

### Рівень Junior

**6. Навіщо уникати складних CSS-селекторів?**

Вони ускладнюють пошук правил, збільшують залежність від структури HTML і можуть створювати проблеми зі специфічністю.

**7. Чим BEM відрізняється від OOCSS?**

BEM насамперед визначає систему іменування класів. OOCSS зосереджується на відокремленні структури від зовнішнього вигляду та повторному використанні стилів.

**8. Що таке SMACSS?**

Методологія, яка групує CSS за категоріями Base, Layout, Module, State і Theme.

**9. Що таке ITCSS?**

Підхід, який організовує стилі шарами — від загальних правил до конкретних компонентів і утиліт.

**10. Чи можна використовувати BEM разом із CSS Modules?**

Так. BEM описує іменування класів, а CSS Modules забезпечує локальне зіставлення імен класів у модулі.

### Рівень Middle

**11. Чому не варто прив'язувати стилі компонента до конкретного контейнера?**

Це створює зайві залежності. Компонент стає складніше переносити та повторно використовувати.

**12. Як методологія допомагає уникнути проблем зі специфічністю?**

Вона заохочує прості селектори, чіткі назви класів і передбачувану структуру стилів.

**13. Чи можна поєднувати BEM та ITCSS?**

Так. BEM можна використовувати для назв класів, а ITCSS — для організації шарів і порядку стилів.

**14. Коли варто використовувати CSS Modules?**

Коли потрібно ізолювати назви класів між компонентами, особливо у компонентних застосунках.

**15. Чи є Utility-first альтернативою компонентному CSS?**

Не обов'язково. Utility-first може доповнювати компонентний CSS, а конкретний вибір залежить від проєкту.

### Рівень Senior

**16. Як обрати методологію для великого проєкту?**

Потрібно враховувати масштаб кодової бази, кількість розробників, технологічний стек, повторне використання компонентів, каскад і вартість підтримки.

**17. Як поступово впровадити методологію в наявний проєкт?**

Почати з узгоджених правил іменування, визначити базові стилі та компоненти, поступово рефакторити найбільш проблемні ділянки й уникати масштабної перебудови без потреби.

**18. Чому недостатньо просто перейменувати CSS-класи?**

Методологія стосується не лише назв. Вона також охоплює залежності між компонентами, повторне використання, специфічність, структуру файлів і порядок стилів.

**19. Як оцінити якість CSS-архітектури?**

За передбачуваністю змін, повторним використанням, простотою навігації, кількістю конфліктів, зрозумілістю правил і можливістю безпечно розширювати систему.

**20. Чи існує одна найкраща CSS-методологія для всіх проєктів?**

Ні. Хороша методологія відповідає потребам проєкту й допомагає команді підтримувати код без зайвої складності.

---

# 18. Навчальний шлях: Core → Junior → Middle → Senior

## Core — основи

Потрібно вміти:

- Розуміти призначення CSS-методологій.
- Відрізняти Block, Element і Modifier.
- Створювати прості BEM-компоненти.
- Уникати надто складних селекторів.
- Розрізняти компонентні стилі та utility-класи.
- Використовувати CSS Custom Properties для спільних значень.

Практика: створи картку, кнопку, форму та навігацію з послідовними назвами класів.

## Junior — самостійна організація

Потрібно вміти:

- Обирати зрозумілу структуру CSS-файлів.
- Використовувати BEM у невеликих проєктах.
- Розділяти базові стилі, layout і компоненти.
- Створювати варіанти компонентів без дублювання.
- Розуміти базові принципи OOCSS, SMACSS та ITCSS.
- Підтримувати однакові правила іменування в усьому проєкті.

Практика: створи невеликий сайт із кількома сторінками та спільними компонентами.

## Middle — масштабування

Потрібно вміти:

- Вибирати архітектуру відповідно до розміру проєкту.
- Контролювати специфічність і каскад.
- Організовувати дизайн-токени.
- Поєднувати компонентні стилі, utility-класи та CSS Modules.
- Поступово рефакторити застарілі стилі.
- Документувати правила CSS для команди.

Практика: реорганізуй CSS навчального проєкту, усунь дублювання й залежність компонентів від контейнерів.

## Senior — архітектура та команда

Потрібно вміти:

- Проєктувати масштабовану CSS-архітектуру.
- Визначати правила для великої кодової бази.
- Враховувати специфічність, каскадні шари та ізоляцію компонентів.
- Вибирати між глобальним CSS, CSS Modules та іншими способами ізоляції.
- Створювати й підтримувати дизайн-систему.
- Планувати поступову міграцію стилів без зайвих ризиків.
- Пояснювати команді причини архітектурних рішень.

---

# 19. Мінішпаргалка

| Поняття | Запам'ятай |
|---|---|
| CSS Methodology | Правила організації та підтримки CSS |
| BEM | Block, Element, Modifier |
| Block | Незалежний компонент |
| Element | Частина компонента |
| Modifier | Варіант або стан компонента |
| OOCSS | Розділення структури й зовнішнього вигляду |
| SMACSS | Групування CSS за категоріями |
| ITCSS | Організація CSS шарами від загального до конкретного |
| Utility-first | Поєднання невеликих класів-утиліт |
| Component-based CSS | Стилі організовані навколо компонентів |
| CSS Modules | Локальне зіставлення назв класів |
| Custom Properties | Повторно використовувані значення CSS |
| Specificity | Один із факторів визначення переможного правила в каскаді |

## BEM: синтаксис

    .block {}
    .block__element {}
    .block--modifier {}
    .block__element--modifier {}

Приклад:

    .button {}
    .button--primary {}
    .button--danger {}

## SMACSS: категорії

    Base
    Layout
    Module
    State
    Theme

## ITCSS: типові шари

    Settings
    Tools
    Generic
    Elements
    Objects
    Components
    Utilities

## Хороші правила організації CSS

- Один клас — зрозуміле призначення.
- Компонент не повинен без потреби залежати від контейнера.
- Спільні стилі не потрібно дублювати.
- Варіанти компонента краще описувати послідовно.
- Специфічність потрібно тримати під контролем.
- Структура файлів має відповідати масштабу проєкту.
- Методологія повинна спрощувати роботу, а не створювати зайві правила.

---

# 20. Головне, що потрібно запам'ятати

1. **CSS Methodologies — це домовленості про організацію стилів**, а не окрема CSS-технологія.
2. **BEM** допомагає послідовно називати компоненти, їхні частини та варіанти.
3. **OOCSS** заохочує відокремлювати структуру від оформлення й повторно використовувати стилі.
4. **SMACSS** групує стилі за призначенням.
5. **ITCSS** організовує стилі шарами, від загальних правил до конкретних.
6. **Utility-first** дає змогу будувати інтерфейси з невеликих класів.
7. **Component-based CSS** організовує стилі навколо UI-компонентів.
8. Ці підходи можна поєднувати, якщо правила зрозумілі й послідовні.
9. CSS Custom Properties, Sass, CSS Nesting і CSS Modules — це інструменти або можливості, які можуть доповнювати методологію.
10. Хороша CSS-архітектура допомагає не лише написати стилі, а й безпечно змінювати їх у майбутньому.

**Практичне правило для навчання:** почни з BEM, навчись створювати незалежні компоненти та уникати складних селекторів. Потім освоюй структуру файлів і принципи SMACSS та ITCSS. Для React-проєктів додатково вивчи CSS Modules і способи організації стилів поруч із компонентами.