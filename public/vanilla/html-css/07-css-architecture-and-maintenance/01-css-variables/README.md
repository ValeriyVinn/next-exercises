# 01. CSS Variables

CSS Variables (змінні CSS) — це механізм CSS, який дозволяє зберігати значення та повторно використовувати їх у різних частинах таблиці стилів.

CSS Variables використовуються, коли потрібно:

- зберігати кольори проєкту в одному місці;
- повторно використовувати значення відступів, розмірів і шрифтів;
- підтримувати єдиний дизайн сайту;
- швидко змінювати оформлення всього проєкту;
- створювати світлу та темну теми;
- передавати значення між батьківськими та дочірніми елементами;
- змінювати стилі залежно від media queries;
- передавати значення з JavaScript у CSS;
- спростити підтримку великих CSS-файлів.

Основні поняття CSS Variables:

    custom properties
    --variable-name
    var()
    :root
    inheritance
    cascade
    fallback value
    scope
    local variables
    global variables
    dynamic values
    theming
    CSSOM
    JavaScript integration

---

### Ключові поняття

✔ CSS Variables  
✔ CSS Custom Properties  
✔ custom property  
✔ `--variable-name`  
✔ `var()`  
✔ `:root`  
✔ `html`  
✔ global variables  
✔ local variables  
✔ variable declaration  
✔ variable usage  
✔ fallback value  
✔ inheritance  
✔ cascade  
✔ specificity  
✔ scope  
✔ computed value  
✔ design tokens  
✔ color tokens  
✔ spacing tokens  
✔ typography tokens  
✔ theme  
✔ light theme  
✔ dark theme  
✔ media queries  
✔ responsive variables  
✔ nested elements  
✔ JavaScript integration  
✔ `setProperty()`  
✔ `getPropertyValue()`  
✔ `removeProperty()`  
✔ CSSOM  
✔ maintainable CSS  

---

### Що потрібно пам'ятати

• CSS Variables також називають CSS Custom Properties.

• Назва користувацької CSS-змінної повинна починатися з двох дефісів:

    --primary-color
    --spacing-md
    --font-size-lg

• Змінна оголошується всередині CSS-правила.

• Для отримання значення змінної використовується функція `var()`.

• `:root` — зручне місце для оголошення глобальних змінних документа.

• `:root` відповідає кореневому елементу документа, яким у HTML є `html`.

• CSS-змінні успадковуються дочірніми елементами, якщо для них не визначено інше значення.

• Локальна змінна доступна в межах відповідного елемента та його нащадків.

• Якщо змінна не має доступного значення, можна використати fallback — запасне значення.

• CSS Variables можуть використовуватися для кольорів, відступів, шрифтів, ширини контейнерів, тіней та інших CSS-властивостей.

• Змінні спрощують створення тем і підтримку єдиного дизайн-системного підходу.

• CSS Variables можна змінювати через JavaScript.

• CSS Custom Properties відрізняються від змінних препроцесорів Sass: CSS-змінні існують у браузері під час виконання сторінки.

• Назви змінних мають бути зрозумілими та відображати їхнє призначення.

---

# Що таке CSS Variables

CSS Variables — це користувацькі властивості CSS, у яких можна зберігати значення для повторного використання.

Наприклад, замість повторення одного кольору в багатьох правилах:

    .button {
        background-color: #2563eb;
    }

    .link {
        color: #2563eb;
    }

    .badge {
        border-color: #2563eb;
    }

Можна створити змінну:

    :root {
        --primary-color: #2563eb;
    }

І використовувати її:

    .button {
        background-color: var(--primary-color);
    }

    .link {
        color: var(--primary-color);
    }

    .badge {
        border-color: var(--primary-color);
    }

Тепер достатньо змінити `--primary-color` в одному місці, щоб оновити всі властивості, які використовують цю змінну.

---

# Custom Properties

Custom Properties — це спеціальні користувацькі властивості CSS.

Їхні назви починаються з двох дефісів:

    --primary-color
    --secondary-color
    --text-color
    --background-color
    --spacing-sm
    --spacing-md
    --spacing-lg

Наприклад:

    :root {
        --primary-color: blue;
        --text-color: #222;
        --spacing-md: 16px;
    }

Тут оголошено три CSS-змінні.

    --primary-color
        ↓
    blue

    --text-color
        ↓
    #222

    --spacing-md
        ↓
    16px

Важливо: оголошення змінної саме по собі не змінює оформлення елемента. Значення починає впливати на оформлення, коли його використовують у CSS-властивості.

---

# Синтаксис CSS Variables

Загальний синтаксис:

    selector {
        --variable-name: value;
    }

Використання:

    selector {
        property: var(--variable-name);
    }

Наприклад:

    :root {
        --primary-color: #2563eb;
        --border-radius: 8px;
    }

    .button {
        background-color: var(--primary-color);
        border-radius: var(--border-radius);
    }

Тут:

    --primary-color
        ↓
    #2563eb

    --border-radius
        ↓
    8px

    var(--primary-color)
        ↓
    #2563eb

    var(--border-radius)
        ↓
    8px

---

# :root

`:root` — псевдоклас, який вибирає кореневий елемент документа.

У звичайному HTML-документі це елемент `html`.

Наприклад:

    :root {
        --primary-color: #2563eb;
        --secondary-color: #64748b;
        --text-color: #1f2937;
        --background-color: #ffffff;
    }

Змінні, оголошені в `:root`, зазвичай доступні в усьому документі завдяки успадкуванню.

Наприклад:

    .button {
        background-color: var(--primary-color);
    }

    .card {
        color: var(--text-color);
        background-color: var(--background-color);
    }

    .link {
        color: var(--secondary-color);
    }

Усі три компоненти можуть використовувати змінні, оголошені в `:root`.

---

### Чому використовують :root

Без змінних:

    .button {
        background-color: #2563eb;
    }

    .link {
        color: #2563eb;
    }

    .badge {
        border-color: #2563eb;
    }

Зі змінною:

    :root {
        --primary-color: #2563eb;
    }

    .button {
        background-color: var(--primary-color);
    }

    .link {
        color: var(--primary-color);
    }

    .badge {
        border-color: var(--primary-color);
    }

Переваги:

    одне джерело значення
        ↓
    менше дублювання
        ↓
    простіше оновлення
        ↓
    легше підтримувати проєкт

---

# Глобальні змінні

Global Variables — змінні, оголошені в області, яка дозволяє використовувати їх у багатьох частинах документа.

Найчастіше для цього використовують `:root`.

Наприклад:

    :root {
        --primary-color: #2563eb;
        --text-color: #111827;
        --page-background: #f8fafc;

        --spacing-sm: 8px;
        --spacing-md: 16px;
        --spacing-lg: 24px;
    }

Використання:

    body {
        color: var(--text-color);
        background-color: var(--page-background);
    }

    .button {
        background-color: var(--primary-color);
        padding: var(--spacing-sm) var(--spacing-md);
    }

    .card {
        padding: var(--spacing-lg);
    }

Глобальні змінні особливо корисні для:

    кольорової палітри
    типографіки
    відступів
    радіусів
    тіней
    розмірів контейнерів
    параметрів теми

Важливо: глобальна доступність не означає, що змінну потрібно використовувати всюди. Створюй глобальні змінні для значень, які справді мають спільне призначення.

---

# Локальні змінні

Local Variables — змінні, оголошені всередині конкретного CSS-правила.

Вони доступні для відповідного елемента та його нащадків, якщо значення не перевизначене нижче в каскаді.

Наприклад:

    .card {
        --card-background: #ffffff;
        --card-padding: 24px;

        background-color: var(--card-background);
        padding: var(--card-padding);
    }

Ці змінні не потрібно оголошувати глобально, якщо вони потрібні лише картці та її вмісту.

Приклад:

    .card {
        --card-accent: #2563eb;

        border-left: 4px solid var(--card-accent);
    }

    .card-title {
        color: var(--card-accent);
    }

Якщо `.card-title` є нащадком `.card`, він успадкує значення `--card-accent`.

Але якщо елемент знаходиться поза `.card`, ця змінна йому недоступна через успадкування від картки.

---

# Global vs Local Variables

Глобальна змінна:

    :root {
        --primary-color: #2563eb;
    }

Локальна змінна:

    .card {
        --card-color: #16a34a;
    }

Використання:

    .button {
        background-color: var(--primary-color);
    }

    .card {
        border-color: var(--card-color);
    }

Глобальна змінна підходить для спільного значення, яке потрібне різним компонентам.

Локальна змінна підходить для значення, яке стосується конкретного компонента або його піддерева.

Основне правило:

    :root
        ↓
    спільні значення проєкту

    .component
        ↓
    локальні значення компонента

---

# Функція var()

`var()` — CSS-функція для отримання значення користувацької CSS-змінної.

Синтаксис:

    var(--variable-name)

Наприклад:

    :root {
        --primary-color: #2563eb;
    }

    .button {
        background-color: var(--primary-color);
    }

Можна використовувати змінні в різних властивостях:

    :root {
        --text-color: #111827;
        --spacing: 20px;
        --border-radius: 10px;
    }

    .card {
        color: var(--text-color);
        padding: var(--spacing);
        border-radius: var(--border-radius);
    }

Змінна не прив'язана до конкретної CSS-властивості. Важливо, щоб її значення було придатним для властивості, у якій вона використовується.

---

# Fallback Value

Fallback Value — запасне значення, яке можна передати другому аргументу `var()`.

Синтаксис:

    var(--variable-name, fallback-value)

Наприклад:

    .button {
        background-color: var(--primary-color, blue);
    }

Якщо `--primary-color` не має доступного значення, браузер використає `blue`.

Ще один приклад:

    .card {
        padding: var(--card-padding, 16px);
    }

Якщо `--card-padding` не визначено в доступній області, буде використано `16px`.

Fallback можна використовувати зі значеннями різних типів:

    .button {
        color: var(--button-text-color, white);
        padding: var(--button-padding, 12px 20px);
        border-radius: var(--button-radius, 8px);
    }

---

### Fallback для іншої змінної

Запасне значення також може посилатися на іншу змінну.

    :root {
        --primary-color: #2563eb;
        --default-color: #64748b;
    }

    .button {
        background-color: var(
            --button-color,
            var(--default-color)
        );
    }

Якщо `--button-color` не має доступного значення, буде використано `--default-color`.

Можна створювати кілька рівнів запасних значень:

    .button {
        color: var(
            --button-text-color,
            var(--text-color, black)
        );
    }

Логіка:

    --button-text-color
        ↓ якщо недоступна
    --text-color
        ↓ якщо недоступна
    black

Важливо: fallback використовується, коли значення змінної відсутнє або недоступне. Він не є універсальним способом виправлення будь-якого неправильного значення.

---

# Що відбувається, якщо змінна не визначена

Наприклад:

    .button {
        background-color: var(--undefined-color);
    }

Якщо `--undefined-color` не визначена в доступній області й немає fallback, декларація може стати невалідною на етапі обчислення значення.

Це важливо відрізняти від звичайної відсутньої CSS-властивості.

Наприклад:

    .button {
        background-color: red;
        background-color: var(--undefined-color);
    }

Друга декларація не обов'язково змусить браузер повернутися до першої. Якщо друга декларація була прийнята під час розбору CSS, але стала невалідною через значення змінної, браузер обробляє її як невалідну на computed-value time.

Для надійного результату:

    .button {
        background-color: var(--button-color, red);
    }

Або:

    :root {
        --button-color: red;
    }

---

# Inheritance

Inheritance — успадкування значень від батьківського елемента до дочірніх.

CSS Custom Properties за замовчуванням успадковуються.

Наприклад:

    .card {
        --accent-color: blue;
    }

    .card-title {
        color: var(--accent-color);
    }

HTML:

    <div class="card">
        <h2 class="card-title">Card title</h2>
    </div>

`.card-title` успадковує `--accent-color` від `.card`.

Результат:

    колір заголовка → blue

Це працює, тому що заголовок є нащадком елемента `.card`.

---

### Успадкування через кілька рівнів

    .card {
        --accent-color: purple;
    }

    .card-content {
        padding: 16px;
    }

    .card-title {
        color: var(--accent-color);
    }

HTML:

    <article class="card">
        <div class="card-content">
            <h2 class="card-title">Title</h2>
        </div>
    </article>

Значення `--accent-color` проходить від `.card` через `.card-content` до `.card-title`.

---

# Перевизначення змінних

Значення змінної можна перевизначити для окремого елемента.

Наприклад:

    :root {
        --primary-color: blue;
    }

    .button {
        background-color: var(--primary-color);
    }

    .button-danger {
        --primary-color: red;
    }

HTML:

    <button class="button">Save</button>

    <button class="button button-danger">
        Delete
    </button>

Перший елемент матиме синій фон, а другий — червоний.

Чому?

    :root
        --primary-color: blue
                ↓
    .button-danger
        --primary-color: red
                ↓
    var(--primary-color)
        ↓
    red

У межах `.button-danger` локальне значення перекриває успадковане значення з `:root`.

---

# Cascade та CSS Variables

CSS Variables працюють разом із CSS Cascade.

Якщо одна й та сама custom property оголошена кілька разів у застосовній області, браузер визначає переможця за правилами каскаду.

Наприклад:

    :root {
        --primary-color: blue;
    }

    :root {
        --primary-color: green;
    }

У звичайному випадку, за однакової важливості та специфічності, перемагає пізніше оголошення.

Результат:

    --primary-color → green

Але локальне оголошення на елементі може переважити успадковане значення незалежно від того, що батьківське правило має високу специфічність.

Наприклад:

    #app {
        --primary-color: blue;
    }

    .button {
        --primary-color: red;
    }

HTML:

    <div id="app">
        <button class="button">Click</button>
    </div>

Для кнопки значення буде `red`, тому що `.button` оголошує власну змінну безпосередньо на кнопці. Успадковане значення з `#app` не перемагає власне значення елемента.

---

# CSS Variables та звичайні CSS-властивості

Звичайна CSS-властивість:

    color: red;

CSS Custom Property:

    --text-color: red;

Використання:

    color: var(--text-color);

Різниця:

    color
        ↓
    стандартна CSS-властивість

    --text-color
        ↓
    користувацька CSS-властивість

    var(--text-color)
        ↓
    підставлення значення custom property

Custom Property зберігає значення, але не застосовує його самостійно до оформлення.

Наприклад:

    :root {
        --primary-color: blue;
    }

Цей код не робить усі елементи синіми.

Щоб застосувати значення:

    body {
        color: var(--primary-color);
    }

Тепер синій колір буде застосований до тексту `body`, а за звичайним успадкуванням — і до нащадків, якщо їхній колір не визначено окремо.

---

# Типи значень CSS Variables

CSS Custom Properties можуть зберігати різні значення, які потім використовуються у CSS.

### Кольори

    :root {
        --primary-color: #2563eb;
        --success-color: #16a34a;
        --danger-color: #dc2626;
        --text-color: #1f2937;
        --background-color: #ffffff;
    }

### Відступи

    :root {
        --spacing-xs: 4px;
        --spacing-sm: 8px;
        --spacing-md: 16px;
        --spacing-lg: 24px;
        --spacing-xl: 32px;
    }

### Типографіка

    :root {
        --font-family-base: Arial, sans-serif;
        --font-size-sm: 14px;
        --font-size-md: 16px;
        --font-size-lg: 24px;
        --font-weight-bold: 700;
    }

### Розміри

    :root {
        --container-width: 1200px;
        --sidebar-width: 280px;
        --header-height: 72px;
    }

### Радіуси

    :root {
        --radius-sm: 4px;
        --radius-md: 8px;
        --radius-lg: 16px;
        --radius-full: 999px;
    }

### Тіні

    :root {
        --shadow-sm: 0 1px 3px rgb(0 0 0 / 10%);
        --shadow-md: 0 4px 12px rgb(0 0 0 / 12%);
    }

### Інші значення

    :root {
        --transition-fast: 150ms ease;
        --transition-normal: 250ms ease;
        --layer-modal: 1000;
        --layer-tooltip: 1100;
    }

Важливо: custom property не має обов'язкового типу, якщо її не зареєстровано через `@property`. Браузер може зберігати в ній різні послідовності CSS-токенів, але підставлене значення повинно відповідати вимогам властивості, у якій його використовують.

---

# Design Tokens

Design Tokens — це стандартизовані значення дизайну, які повторно використовуються в інтерфейсі.

Наприклад:

    --color-primary
    --color-danger
    --spacing-md
    --font-size-lg
    --radius-md
    --shadow-md

CSS Variables часто використовують для реалізації design tokens.

Приклад:

    :root {
        /* Colors */
        --color-primary: #2563eb;
        --color-success: #16a34a;
        --color-danger: #dc2626;

        /* Text */
        --color-text: #1f2937;
        --color-text-muted: #64748b;

        /* Backgrounds */
        --color-background: #ffffff;
        --color-surface: #f8fafc;

        /* Spacing */
        --spacing-sm: 8px;
        --spacing-md: 16px;
        --spacing-lg: 24px;

        /* Shape */
        --radius-md: 8px;
        --radius-lg: 16px;
    }

Використання:

    .card {
        color: var(--color-text);
        background-color: var(--color-surface);
        padding: var(--spacing-lg);
        border-radius: var(--radius-lg);
    }

    .button {
        color: white;
        background-color: var(--color-primary);
        border-radius: var(--radius-md);
    }

Переваги:

    єдина система значень
        ↓
    послідовний дизайн
        ↓
    швидкі глобальні зміни
        ↓
    простіша підтримка UI

Design tokens особливо корисні у великих проєктах і дизайн-системах.

---

# Naming Convention

Naming Convention — домовленості щодо іменування змінних.

Зрозумілі назви допомагають підтримувати CSS.

Добре:

    --color-primary
    --color-text
    --spacing-md
    --font-size-lg
    --radius-card
    --shadow-modal

Менш зрозуміло:

    --blue
    --x
    --value1
    --size2

Краще називати змінні відповідно до їхнього призначення.

Наприклад:

    :root {
        --color-primary: #2563eb;
        --color-danger: #dc2626;

        --button-padding: 12px 20px;
        --button-radius: 8px;

        --card-padding: 24px;
        --card-radius: 16px;
    }

Але не потрібно створювати окрему змінну для кожного значення без потреби.

Наприклад, якщо `8px` використовується лише один раз і не має спільного дизайн-системного значення, звичайне значення може бути простішим.

---

# CSS Variables для кольорової палітри

Кольори — один із найпоширеніших способів використання CSS Variables.

Наприклад:

    :root {
        --color-primary: #2563eb;
        --color-secondary: #64748b;
        --color-success: #16a34a;
        --color-warning: #d97706;
        --color-danger: #dc2626;

        --color-text: #111827;
        --color-background: #ffffff;
        --color-border: #e5e7eb;
    }

Використання:

    body {
        color: var(--color-text);
        background-color: var(--color-background);
    }

    .button-primary {
        background-color: var(--color-primary);
    }

    .button-danger {
        background-color: var(--color-danger);
    }

    .alert-success {
        border-color: var(--color-success);
    }

    .card {
        border: 1px solid var(--color-border);
    }

Якщо дизайн зміниться, не доведеться шукати всі повторення кольорів у файлі.

---

# CSS Variables для відступів

Можна створити єдину шкалу відступів.

    :root {
        --spacing-1: 4px;
        --spacing-2: 8px;
        --spacing-3: 12px;
        --spacing-4: 16px;
        --spacing-6: 24px;
        --spacing-8: 32px;
        --spacing-12: 48px;
    }

Використання:

    .card {
        padding: var(--spacing-6);
    }

    .card-title {
        margin-bottom: var(--spacing-4);
    }

    .section {
        padding-block: var(--spacing-12);
    }

    .button {
        padding: var(--spacing-2) var(--spacing-4);
    }

Перевага — відступи утворюють узгоджену систему.

Якщо потрібно зробити інтерфейс компактнішим, значення шкали можна змінити централізовано.

---

# CSS Variables для типографіки

Можна зберігати параметри тексту.

    :root {
        --font-family-base: Arial, sans-serif;
        --font-size-sm: 14px;
        --font-size-base: 16px;
        --font-size-lg: 24px;
        --font-size-xl: 32px;

        --line-height-base: 1.5;
        --font-weight-normal: 400;
        --font-weight-bold: 700;
    }

Використання:

    body {
        font-family: var(--font-family-base);
        font-size: var(--font-size-base);
        line-height: var(--line-height-base);
        font-weight: var(--font-weight-normal);
    }

    h1 {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
    }

    .card-title {
        font-size: var(--font-size-lg);
    }

Так можна підтримувати послідовну типографіку в різних компонентах.

---

# CSS Variables для компонентів

Змінні можна використовувати для налаштування окремих UI-компонентів.

Наприклад:

    .button {
        --button-bg: #2563eb;
        --button-text: #ffffff;
        --button-padding: 12px 20px;
        --button-radius: 8px;

        color: var(--button-text);
        background-color: var(--button-bg);
        padding: var(--button-padding);
        border-radius: var(--button-radius);
        border: none;
    }

Тепер можна змінювати вигляд конкретного варіанта кнопки:

    .button-danger {
        --button-bg: #dc2626;
    }

    .button-success {
        --button-bg: #16a34a;
    }

    .button-compact {
        --button-padding: 6px 12px;
    }

HTML:

    <button class="button">
        Default
    </button>

    <button class="button button-danger">
        Delete
    </button>

    <button class="button button-success">
        Save
    </button>

    <button class="button button-compact">
        Small
    </button>

Такий підхід дає змогу створювати варіанти компонента без дублювання всіх його стилів.

---

# CSS Variables та теми

CSS Variables особливо корисні для реалізації тем.

Наприклад:

    :root {
        --color-text: #111827;
        --color-background: #ffffff;
        --color-surface: #f3f4f6;
        --color-border: #d1d5db;
    }

Це базова світла тема.

Темна тема:

    [data-theme="dark"] {
        --color-text: #f9fafb;
        --color-background: #111827;
        --color-surface: #1f2937;
        --color-border: #374151;
    }

Використання змінних у компонентах:

    body {
        color: var(--color-text);
        background-color: var(--color-background);
    }

    .card {
        background-color: var(--color-surface);
        border: 1px solid var(--color-border);
    }

HTML:

    <body data-theme="dark">
        <article class="card">
            <h2>Dark theme</h2>
        </article>
    </body>

Змінюються значення змінних, а компоненти автоматично використовують нові кольори.

---

# Як працює перемикання теми

Логіка:

    світла тема
        ↓
    значення змінних для світлої теми
        ↓
    компоненти використовують var()
        ↓
    користувач перемикає тему
        ↓
    активується темна тема
        ↓
    змінюються значення змінних
        ↓
    компоненти отримують нові кольори

Важливо: CSS відповідає за стилі, а JavaScript може змінювати атрибут `data-theme`, якщо потрібно перемикання за дією користувача.

---

# prefers-color-scheme

`prefers-color-scheme` — media feature, яка дозволяє врахувати системні налаштування світлої або темної теми користувача.

Наприклад:

    :root {
        color-scheme: light;

        --color-text: #111827;
        --color-background: #ffffff;
        --color-surface: #f3f4f6;
    }

    @media (prefers-color-scheme: dark) {
        :root {
            color-scheme: dark;

            --color-text: #f9fafb;
            --color-background: #111827;
            --color-surface: #1f2937;
        }
    }

Використання:

    body {
        color: var(--color-text);
        background-color: var(--color-background);
    }

    .card {
        background-color: var(--color-surface);
    }

Браузер використовує темну тему, коли операційна система або налаштування браузера вказують на відповідну перевагу.

`color-scheme` також повідомляє браузеру, які колірні схеми підтримує сторінка, що може впливати на стандартні елементи інтерфейсу, наприклад поля форми та смуги прокручування.

Якщо проєкт має ручне перемикання теми, потрібно продумати пріоритет між вибором користувача та системними налаштуваннями.

---

# CSS Variables та Media Queries

CSS Variables можна перевизначати в media queries.

Наприклад:

    :root {
        --container-padding: 16px;
        --section-spacing: 32px;
        --heading-size: 28px;
    }

    @media (min-width: 768px) {
        :root {
            --container-padding: 24px;
            --section-spacing: 48px;
            --heading-size: 36px;
        }
    }

    @media (min-width: 1200px) {
        :root {
            --container-padding: 32px;
            --section-spacing: 64px;
            --heading-size: 44px;
        }
    }

Використання:

    .container {
        padding-inline: var(--container-padding);
    }

    .section {
        padding-block: var(--section-spacing);
    }

    h1 {
        font-size: var(--heading-size);
    }

Так можна змінювати параметри дизайну залежно від ширини екрана.

---

# CSS Variables для responsive design

Змінні дозволяють централізовано керувати параметрами адаптивного дизайну.

Наприклад:

    :root {
        --page-gutter: 16px;
        --content-max-width: 1200px;
    }

    .container {
        width: min(
            calc(100% - 2 * var(--page-gutter)),
            var(--content-max-width)
        );
        margin-inline: auto;
    }

На ширших екранах можна збільшити зовнішні відступи:

    @media (min-width: 768px) {
        :root {
            --page-gutter: 24px;
        }
    }

    @media (min-width: 1200px) {
        :root {
            --page-gutter: 32px;
        }
    }

Важливо: змінна не робить дизайн адаптивним сама по собі. Вона лише зберігає значення, яке використовується в адаптивних правилах.

---

# CSS Variables та calc()

`calc()` дозволяє виконувати обчислення в CSS.

CSS Variables можна використовувати всередині `calc()`.

Наприклад:

    :root {
        --base-spacing: 8px;
    }

    .card {
        padding: calc(var(--base-spacing) * 2);
    }

Результат:

    8px * 2 = 16px

Ще один приклад:

    :root {
        --container-width: 1200px;
        --page-gutter: 24px;
    }

    .container {
        max-width: var(--container-width);
        padding-inline: var(--page-gutter);
    }

Приклад із динамічною шириною:

    :root {
        --sidebar-width: 280px;
        --layout-gap: 24px;
    }

    .main-content {
        width: calc(
            100% - var(--sidebar-width) - var(--layout-gap)
        );
    }

Важливо: CSS-обчислення мають відповідати правилам сумісності типів. Наприклад, для віднімання двох довжин можна використовувати `calc()`, але не можна довільно додавати несумісні одиниці вимірювання.

---

# CSS Variables та clamp()

`clamp()` задає мінімальне, бажане та максимальне значення.

CSS Variables можна використовувати як аргументи `clamp()`.

Наприклад:

    :root {
        --font-size-min: 16px;
        --font-size-fluid: 2vw;
        --font-size-max: 24px;
    }

    h1 {
        font-size: clamp(
            var(--font-size-min),
            var(--font-size-fluid),
            var(--font-size-max)
        );
    }

Логіка:

    clamp(min, preferred, max)

    min       → мінімальне значення
    preferred → бажане значення
    max       → максимальне значення

Це корисно для fluid typography та responsive spacing.

---

# CSS Variables та shorthand properties

CSS Variables можна використовувати в скорочених CSS-властивостях.

Наприклад:

    :root {
        --card-spacing: 24px;
        --border-style: 1px solid #e5e7eb;
    }

    .card {
        padding: var(--card-spacing);
        border: var(--border-style);
    }

Також:

    :root {
        --button-padding: 10px 20px;
        --button-border: 1px solid transparent;
    }

    .button {
        padding: var(--button-padding);
        border: var(--button-border);
    }

Custom Property може містити кілька значень, якщо вони утворюють коректну послідовність CSS-токенів.

Проте важливо перевіряти, чи підставлене значення відповідає синтаксису конкретної властивості.

---

# CSS Variables та прозорість кольору

Можна зберігати повний колір:

    :root {
        --primary-color: #2563eb;
    }

Але якщо потрібно створювати різні рівні прозорості, зручніше іноді зберігати RGB-компоненти:

    :root {
        --primary-rgb: 37 99 235;
    }

    .button {
        background-color: rgb(var(--primary-rgb));
    }

    .button:hover {
        background-color: rgb(var(--primary-rgb) / 80%);
    }

    .badge {
        background-color: rgb(var(--primary-rgb) / 12%);
    }

Такий підхід дозволяє використовувати один набір RGB-компонентів із різною прозорістю.

Не змішуй формати без потреби. Якщо потрібні лише звичайні кольори, повного значення кольору часто достатньо.

---

# CSS Variables та градієнти

Змінні можна використовувати в градієнтах.

Наприклад:

    :root {
        --gradient-start: #2563eb;
        --gradient-end: #7c3aed;
    }

    .hero {
        background: linear-gradient(
            135deg,
            var(--gradient-start),
            var(--gradient-end)
        );
    }

Тепер градієнт можна змінювати централізовано.

---

# CSS Variables та transitions

Змінні можна використовувати у властивостях, які анімуються або переходять між значеннями.

Наприклад:

    :root {
        --button-color: #2563eb;
    }

    .button {
        background-color: var(--button-color);
        transition: background-color 200ms ease;
    }

    .button:hover {
        --button-color: #1d4ed8;
    }

У цьому прикладі переходить між значеннями властивість `background-color`, а не сама custom property.

Важливо: звичайні CSS Custom Properties за замовчуванням не інтерполюються як типізовані значення. Для анімації самої custom property можна використовувати зареєстровані властивості через `@property`.

---

# @property

`@property` — CSS at-rule, яка дозволяє зареєструвати custom property та задати її тип, успадкування і початкове значення.

Приклад:

    @property --progress {
        syntax: "<percentage>";
        inherits: false;
        initial-value: 0%;
    }

    .progress-bar {
        --progress: 0%;

        width: 300px;
        height: 12px;
        background: #e5e7eb;
        overflow: hidden;
    }

    .progress-bar::before {
        content: "";
        display: block;
        width: var(--progress);
        height: 100%;
        background: #2563eb;
        transition: width 500ms ease;
    }

    .progress-bar.is-complete {
        --progress: 100%;
    }

Тут змінна зареєстрована як відсоток.

Основні параметри:

    syntax
        ↓
    тип значення

    inherits
        ↓
    чи успадковується властивість

    initial-value
        ↓
    початкове значення

Важливо: для деяких типів синтаксису `initial-value` має бути незалежним від контексту. Для наведеного типу `<percentage>` значення `0%` є придатним.

`@property` — тема глибшого рівня. Для звичайного використання CSS Variables достатньо знати `:root`, `--name` та `var()`.

---

# CSS Variables у HTML

CSS-змінні можна оголошувати безпосередньо в атрибуті `style`.

Наприклад:

    <div style="--card-color: tomato;">
        <h2>Card title</h2>
    </div>

CSS:

    div {
        border: 2px solid var(--card-color);
    }

Або:

    <button style="--button-color: green;">
        Save
    </button>

CSS:

    button {
        background-color: var(--button-color);
    }

Це може бути корисним для динамічних значень, які задаються конкретному елементу.

Однак для постійних стилів зазвичай краще використовувати окремий CSS-файл або класи.

---

# CSS Variables та JavaScript

JavaScript може читати та змінювати CSS Custom Properties.

Це корисно для:

    перемикання тем
    налаштування кольорів
    зміни відступів
    керування візуальними параметрами
    динамічних компонентів
    інтерактивних інтерфейсів

---

## Читання змінної через getComputedStyle()

Приклад:

    :root {
        --primary-color: #2563eb;
    }

JavaScript:

    const root = document.documentElement;

    const styles = getComputedStyle(root);

    const primaryColor = styles
        .getPropertyValue("--primary-color")
        .trim();

    console.log(primaryColor);

Результат:

    #2563eb

Пояснення:

    document.documentElement
        ↓
    елемент html

    getComputedStyle()
        ↓
    обчислені стилі елемента

    getPropertyValue()
        ↓
    отримати значення custom property

    trim()
        ↓
    прибрати зайві пробіли по краях

---

## Зміна змінної через setProperty()

CSS:

    :root {
        --primary-color: #2563eb;
    }

JavaScript:

    const root = document.documentElement;

    root.style.setProperty(
        "--primary-color",
        "#16a34a"
    );

Тепер значення змінної для кореневого елемента буде зеленим.

Використання:

    element.style.setProperty(
        "--variable-name",
        "value"
    );

Наприклад:

    root.style.setProperty("--spacing-md", "24px");

    root.style.setProperty("--font-size-lg", "28px");

    root.style.setProperty("--primary-color", "tomato");

---

## Видалення змінної через removeProperty()

Приклад:

    const root = document.documentElement;

    root.style.removeProperty("--primary-color");

Це видаляє відповідне inline-оголошення зі стилю елемента.

Важливо: якщо змінна оголошена в таблиці стилів, її значення може знову стати доступним через інше правило або успадкування.

---

# CSS Variables та JavaScript: повний приклад

HTML:

    <button id="theme-button">
        Change color
    </button>

    <div class="card">
        <h2>CSS Variables</h2>
        <p>Color changes through JavaScript.</p>
    </div>

CSS:

    :root {
        --primary-color: #2563eb;
        --text-color: #111827;
        --surface-color: #ffffff;
    }

    body {
        color: var(--text-color);
        font-family: Arial, sans-serif;
    }

    .card {
        max-width: 400px;
        padding: 24px;
        margin-top: 20px;
        border: 2px solid var(--primary-color);
        background-color: var(--surface-color);
    }

    button {
        padding: 10px 16px;
        color: white;
        background-color: var(--primary-color);
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }

JavaScript:

    const button = document.querySelector("#theme-button");

    button.addEventListener("click", () => {
        document.documentElement.style.setProperty(
            "--primary-color",
            "#16a34a"
        );
    });

Після натискання кнопки змінна `--primary-color` отримує нове значення.

Усі елементи, які використовують цю змінну, оновлюються автоматично.

---

# CSS Variables та data-атрибути

Змінні можна комбінувати з HTML-атрибутами `data-*`.

HTML:

    <div class="card" data-theme="dark">
        <h2>Dark card</h2>
    </div>

CSS:

    .card {
        --card-background: #ffffff;
        --card-text: #111827;

        color: var(--card-text);
        background-color: var(--card-background);
    }

    .card[data-theme="dark"] {
        --card-background: #1f2937;
        --card-text: #f9fafb;
    }

Перевага — тема може бути локальною для компонента.

Наприклад, одна картка може мати темне оформлення, а інша — світле.

Це зручно для компонентних інтерфейсів.

---

# CSS Variables у дизайн-системі

У великому проєкті змінні часто організовують за призначенням.

Наприклад:

    :root {
        /* Brand colors */
        --color-primary: #2563eb;
        --color-primary-hover: #1d4ed8;

        /* Text */
        --color-text-primary: #111827;
        --color-text-secondary: #64748b;

        /* Backgrounds */
        --color-bg-page: #f8fafc;
        --color-bg-surface: #ffffff;

        /* Borders */
        --color-border: #e2e8f0;

        /* Spacing */
        --spacing-xs: 4px;
        --spacing-sm: 8px;
        --spacing-md: 16px;
        --spacing-lg: 24px;
        --spacing-xl: 32px;

        /* Typography */
        --font-size-sm: 14px;
        --font-size-base: 16px;
        --font-size-lg: 20px;
        --font-size-xl: 32px;

        /* Radius */
        --radius-sm: 4px;
        --radius-md: 8px;
        --radius-lg: 16px;

        /* Shadows */
        --shadow-card: 0 4px 12px rgb(0 0 0 / 8%);
    }

Це допомагає підтримувати єдиний підхід до дизайну.

Але важливо не перетворювати `:root` на хаотичний список сотень змінних. Групуй значення, використовуй послідовні назви та видаляй змінні, які більше не потрібні.

---

# CSS Variables та архітектура CSS

CSS Variables — один із інструментів підтримуваного CSS.

Вони допомагають відокремити значення дизайну від конкретних компонентів.

Наприклад:

    :root {
        --color-primary: #2563eb;
        --spacing-md: 16px;
        --radius-md: 8px;
    }

    .button {
        background-color: var(--color-primary);
        padding: var(--spacing-md);
        border-radius: var(--radius-md);
    }

    .card {
        border-radius: var(--radius-md);
        padding: var(--spacing-md);
    }

Тут:

    design tokens
        ↓
    CSS Variables
        ↓
    components
        ↓
    consistent UI

CSS Variables не замінюють CSS-архітектуру, але роблять її більш гнучкою.

Вони добре поєднуються з:

    BEM
    CSS Modules
    component-based architecture
    design systems
    Sass
    responsive design

---

# CSS Variables vs Sass Variables

Це важлива різниця.

## CSS Variables

    :root {
        --primary-color: blue;
    }

    .button {
        background-color: var(--primary-color);
    }

CSS Variables існують у браузері та можуть змінюватися під час виконання сторінки.

Їх можна перевизначати в різних областях, використовувати в темах і змінювати через JavaScript.

## Sass Variables

    $primary-color: blue;

    .button {
        background-color: $primary-color;
    }

Sass Variables використовуються під час компіляції Sass у CSS.

Зазвичай їхні значення підставляються у згенерований CSS.

Наприклад, результат компіляції:

    .button {
        background-color: blue;
    }

## Основні відмінності

| CSS Variables | Sass Variables |
|---|---|
| Починаються з `--` | Починаються з `$` |
| Використовуються через `var()` | Використовуються без `var()` |
| Доступні в браузері під час виконання | Обробляються Sass-компілятором |
| Можуть успадковуватися | Не мають механізму CSS-успадкування |
| Можуть змінюватися через JavaScript | Самі по собі не є runtime-змінними браузера |
| Підтримують теми через перевизначення | Зазвичай формують статичні значення під час компіляції |

Головне:

    CSS Variables
        ↓
    runtime

    Sass Variables
        ↓
    compile time

Ці механізми можна використовувати разом.

Наприклад, Sass може допомагати організовувати код, а CSS Variables — керувати темами та динамічними значеннями в браузері.

---

# CSS Variables та CSS Modules

CSS Modules забезпечують локальне іменування класів, але не роблять CSS Custom Properties непотрібними.

Наприклад, у компоненті можна оголосити локальні змінні:

    .card {
        --card-padding: 24px;
        --card-radius: 12px;

        padding: var(--card-padding);
        border-radius: var(--card-radius);
    }

А глобальні design tokens можна залишити в загальному CSS-файлі:

    :root {
        --color-primary: #2563eb;
        --spacing-md: 16px;
    }

У компонентному проєкті це дозволяє поєднати:

    глобальні дизайн-токени
        +
    локальні параметри компонентів
        +
    CSS Modules

Важливо: локальність CSS Module стосується передусім класів та інших імен, які обробляє модульна система. Custom Properties залишаються звичайними CSS-властивостями з правилами каскаду та успадкування.

---

# CSS Variables та CSS Nesting

CSS Variables можна використовувати всередині вкладених CSS-правил.

Наприклад:

    :root {
        --primary-color: #2563eb;
    }

    .card {
        border: 1px solid var(--primary-color);

        & .card-title {
            color: var(--primary-color);
        }

        & .card-button {
            background-color: var(--primary-color);
        }
    }

CSS Nesting дозволяє організовувати пов'язані правила вкладено, а CSS Variables — повторно використовувати значення.

Це різні можливості, які можуть доповнювати одна одну.

---

# CSS Variables та специфічність

Специфічність важлива, коли одна й та сама custom property оголошена в кількох правилах, які застосовуються до того самого елемента.

Наприклад:

    :root {
        --primary-color: blue;
    }

    .theme {
        --primary-color: green;
    }

    #app {
        --primary-color: red;
    }

Якщо всі три селектори застосовуються безпосередньо до одного елемента, за однакової важливості перемагає оголошення з найвищою специфічністю.

Але пам'ятай: значення custom property, оголошене безпосередньо на елементі, має пріоритет над значенням, яке він лише успадковує від предка.

Приклад:

    #app {
        --primary-color: blue;
    }

    .button {
        --primary-color: red;
    }

Кнопка всередині `#app` використовуватиме `red`, якщо власне оголошення `.button` перемагає за застосовними правилами каскаду.

---

# CSS Variables та !important

Як і інші CSS-властивості, custom properties можуть брати участь у каскаді з `!important`.

Наприклад:

    :root {
        --primary-color: blue !important;
    }

    :root {
        --primary-color: red;
    }

За звичайних умов перше оголошення перемагає через `!important`.

Однак надмірне використання `!important` ускладнює підтримку CSS.

Краще будувати зрозумілу систему змінних та уникати непотрібних конфліктів.

---

# CSS Variables та initial, inherit, unset

До custom properties можна застосовувати глобальні CSS-значення.

### initial

    .card {
        --card-color: initial;
    }

Для звичайної не зареєстрованої custom property початковим значенням є спеціальне guaranteed-invalid value. Якщо потім використати цю змінну без fallback, декларація, що її споживає, може стати невалідною на етапі обчислення.

### inherit

    .card-title {
        --card-color: inherit;
    }

Змінна отримує значення від батьківського елемента.

### unset

    .card {
        --card-color: unset;
    }

Оскільки звичайні custom properties успадковуються, `unset` для них зазвичай поводиться як `inherit`.

Ці значення корисні для глибшого розуміння каскаду. У повсякденному коді частіше достатньо звичайного оголошення та перевизначення змінних.

---

# @supports та CSS Variables

`@supports` дозволяє перевірити підтримку CSS-можливості браузером.

Наприклад:

    @supports (--primary-color: blue) {
        :root {
            --primary-color: blue;
        }

        .button {
            background-color: var(--primary-color);
        }
    }

Це приклад перевірки підтримки синтаксису custom properties.

Для сучасних браузерів CSS Variables підтримуються широко, тому в більшості нових проєктів така перевірка не потрібна.

Важливо: `@supports` перевіряє підтримку можливості, а не гарантує правильність усіх значень, які можуть бути присвоєні змінній.

---

# Типові помилки

## 1. Забувати два дефіси

Неправильно:

    :root {
        primary-color: blue;
    }

Правильно:

    :root {
        --primary-color: blue;
    }

Назва custom property повинна починатися з `--`.

---

## 2. Забувати var()

Неправильно:

    .button {
        background-color: --primary-color;
    }

Правильно:

    .button {
        background-color: var(--primary-color);
    }

---

## 3. Використовувати змінну поза її областю

    .card {
        --card-color: green;
    }

    .button {
        color: var(--card-color);
    }

Якщо `.button` не є нащадком `.card` і змінна не визначена іншим доступним способом, вона буде недоступна.

Рішення:

    :root {
        --card-color: green;
    }

Або оголосити потрібну змінну в області, спільній для обох компонентів.

---

## 4. Не передбачати fallback

    .button {
        color: var(--button-text);
    }

Якщо змінна недоступна, декларація може стати невалідною на етапі обчислення.

Надійніший варіант:

    .button {
        color: var(--button-text, white);
    }

---

## 5. Неправильне значення змінної

    :root {
        --spacing: blue;
    }

    .card {
        padding: var(--spacing);
    }

Змінна існує, але її значення не відповідає синтаксису `padding`.

Fallback у такому випадку не обов'язково допоможе:

    .card {
        padding: var(--spacing, 16px);
    }

Оскільки `--spacing` має доступне значення `blue`, fallback не використовується. Після підстановки декларація `padding` буде невалідною.

Потрібно виправити джерело:

    :root {
        --spacing: 16px;
    }

---

## 6. Очікувати, що оголошення змінної змінить усі елементи

    :root {
        --primary-color: blue;
    }

Це лише оголошує змінну.

Щоб використати її:

    body {
        color: var(--primary-color);
    }

---

## 7. Надмірно створювати глобальні змінні

Не кожне значення має бути глобальним.

Якщо параметр потрібний лише одному компоненту, його можна оголосити локально:

    .tooltip {
        --tooltip-offset: 8px;

        margin-top: var(--tooltip-offset);
    }

---

## 8. Плутати CSS Variables із Sass Variables

CSS:

    --primary-color: blue;

Sass:

    $primary-color: blue;

Це різні механізми з різним призначенням.

---

## 9. Використовувати незрозумілі назви

Не дуже добре:

    --x: red;
    --v2: 16px;
    --value: 8px;

Краще:

    --color-danger: red;
    --spacing-md: 16px;
    --radius-md: 8px;

---

## 10. Створювати надто складні ланцюжки змінних

Приклад:

    :root {
        --color-a: blue;
        --color-b: var(--color-a);
        --color-c: var(--color-b);
        --color-d: var(--color-c);
    }

Такий ланцюжок може бути складним для розуміння, якщо не має чіткого призначення.

Краще зберігати зрозумілу систему токенів.

---

# Практичні приклади

## Приклад 1 — глобальна змінна кольору

    :root {
        --primary-color: #2563eb;
    }

    .button {
        background-color: var(--primary-color);
    }

---

## Приклад 2 — локальна змінна

    .card {
        --card-padding: 24px;

        padding: var(--card-padding);
    }

---

## Приклад 3 — fallback

    .button {
        color: var(--button-text-color, white);
    }

---

## Приклад 4 — зміна кольору компонента

    .button {
        --button-color: blue;

        background-color: var(--button-color);
    }

    .button-danger {
        --button-color: red;
    }

---

## Приклад 5 — шкала відступів

    :root {
        --spacing-sm: 8px;
        --spacing-md: 16px;
        --spacing-lg: 24px;
    }

    .card {
        padding: var(--spacing-lg);
    }

    .card-title {
        margin-bottom: var(--spacing-md);
    }

---

## Приклад 6 — темна тема

    :root {
        --bg-color: white;
        --text-color: #111827;
    }

    [data-theme="dark"] {
        --bg-color: #111827;
        --text-color: white;
    }

    body {
        color: var(--text-color);
        background-color: var(--bg-color);
    }

---

## Приклад 7 — responsive spacing

    :root {
        --section-padding: 24px;
    }

    @media (min-width: 768px) {
        :root {
            --section-padding: 48px;
        }
    }

    .section {
        padding-block: var(--section-padding);
    }

---

## Приклад 8 — використання calc()

    :root {
        --spacing: 8px;
    }

    .card {
        padding: calc(var(--spacing) * 3);
    }

Результат:

    24px

---

## Приклад 9 — зміна змінної через JavaScript

    document.documentElement.style.setProperty(
        "--primary-color",
        "tomato"
    );

---

## Приклад 10 — отримання значення змінної

    const styles = getComputedStyle(
        document.documentElement
    );

    const color = styles
        .getPropertyValue("--primary-color")
        .trim();

    console.log(color);

---

## Приклад 11 — design tokens для картки

    :root {
        --color-text: #111827;
        --color-surface: #ffffff;
        --color-border: #e5e7eb;

        --spacing-card: 24px;
        --radius-card: 12px;
        --shadow-card: 0 4px 12px rgb(0 0 0 / 8%);
    }

    .card {
        color: var(--color-text);
        background-color: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-card);
        padding: var(--spacing-card);
        box-shadow: var(--shadow-card);
    }

---

## Приклад 12 — перемикання теми через JavaScript

HTML:

    <button id="theme-toggle">
        Toggle theme
    </button>

CSS:

    :root {
        --color-text: #111827;
        --color-background: #ffffff;
    }

    [data-theme="dark"] {
        --color-text: #f9fafb;
        --color-background: #111827;
    }

    body {
        color: var(--color-text);
        background-color: var(--color-background);
    }

JavaScript:

    const button = document.querySelector("#theme-toggle");

    button.addEventListener("click", () => {
        const root = document.documentElement;

        const currentTheme = root.dataset.theme;

        root.dataset.theme =
            currentTheme === "dark" ? "light" : "dark";
    });

Логіка:

    click
        ↓
    прочитати поточну тему
        ↓
    вибрати іншу тему
        ↓
    змінити data-theme
        ↓
    CSS застосовує інші значення змінних

---

# Мініпроєкт — Theme Variables

Мета — створити невелику сторінку з CSS Variables, яка підтримує світлу та темну теми.

## HTML

    <!DOCTYPE html>
    <html lang="uk">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CSS Variables</title>
        <link rel="stylesheet" href="styles.css">
        <script src="script.js" defer></script>
    </head>
    <body>
        <header class="header">
            <h1 class="header__title">CSS Variables</h1>

            <button class="theme-toggle" id="theme-toggle">
                Змінити тему
            </button>
        </header>

        <main class="container">
            <article class="card">
                <h2 class="card__title">Перша картка</h2>
                <p class="card__text">
                    Ця картка використовує CSS Variables.
                </p>
                <button class="button">Докладніше</button>
            </article>

            <article class="card">
                <h2 class="card__title">Друга картка</h2>
                <p class="card__text">
                    Кольори змінюються разом із темою.
                </p>
                <button class="button">Докладніше</button>
            </article>
        </main>
    </body>
    </html>

## CSS

    :root {
        color-scheme: light;

        --color-primary: #2563eb;
        --color-text: #111827;
        --color-background: #f8fafc;
        --color-surface: #ffffff;
        --color-border: #e2e8f0;

        --spacing-sm: 8px;
        --spacing-md: 16px;
        --spacing-lg: 24px;

        --radius-md: 8px;
        --radius-lg: 16px;
    }

    :root[data-theme="dark"] {
        color-scheme: dark;

        --color-primary: #60a5fa;
        --color-text: #f9fafb;
        --color-background: #111827;
        --color-surface: #1f2937;
        --color-border: #374151;
    }

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: var(--spacing-lg);
        font-family: Arial, sans-serif;
        color: var(--color-text);
        background-color: var(--color-background);
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-lg);
    }

    .header__title {
        margin: 0;
    }

    .container {
        display: grid;
        grid-template-columns: repeat(
            auto-fit,
            minmax(min(100%, 260px), 1fr)
        );
        gap: var(--spacing-lg);
    }

    .card {
        padding: var(--spacing-lg);
        background-color: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
    }

    .card__title {
        margin-top: 0;
    }

    .card__text {
        line-height: 1.6;
    }

    .button,
    .theme-toggle {
        padding: var(--spacing-sm) var(--spacing-md);
        color: white;
        background-color: var(--color-primary);
        border: none;
        border-radius: var(--radius-md);
        cursor: pointer;
    }

    .theme-toggle {
        color: var(--color-text);
        background-color: var(--color-surface);
        border: 1px solid var(--color-border);
    }

    .button:focus-visible,
    .theme-toggle:focus-visible {
        outline: 3px solid var(--color-primary);
        outline-offset: 3px;
    }

## JavaScript

    const themeToggle = document.querySelector("#theme-toggle");

    themeToggle.addEventListener("click", () => {
        const root = document.documentElement;

        const currentTheme = root.dataset.theme;

        root.dataset.theme =
            currentTheme === "dark" ? "light" : "dark";
    });

## Що потрібно зрозуміти

    :root
        ↓
    глобальні CSS Variables

    --color-text
        ↓
    колір тексту

    --color-background
        ↓
    колір фону сторінки

    --color-surface
        ↓
    фон карток

    [data-theme="dark"]
        ↓
    перевизначення значень змінних

    JavaScript
        ↓
    змінює data-theme

    CSS
        ↓
    автоматично оновлює стилі

---

# Як перевіряти CSS Variables у DevTools

Браузерні DevTools дозволяють перевіряти оголошення та використання CSS Variables.

Основні кроки:

1. Відкрий сторінку в браузері.
2. Відкрий DevTools.
3. Вибери потрібний HTML-елемент у вкладці Elements або Inspector.
4. Переглянь його CSS-правила.
5. Знайди custom properties, які оголошені безпосередньо на елементі або успадковуються від предків.
6. Перевір значення властивостей, у яких використовуються `var()`.
7. Зміни значення змінної в DevTools і подивись, як оновлюється інтерфейс.

Наприклад:

    :root {
        --primary-color: blue;
    }

    .button {
        background-color: var(--primary-color);
    }

Зміна `--primary-color` на `red` у DevTools повинна змінити фон кнопки, якщо інші правила каскаду не впливають на результат.

DevTools допомагають знаходити:

    неправильно названі змінні
    відсутні значення
    перевизначення
    проблеми успадкування
    конфлікти каскаду
    невалідні значення після підстановки

---

# Коли використовувати CSS Variables

Використовуй CSS Variables, коли:

- одне значення повторюється в різних місцях;
- потрібна єдина палітра кольорів;
- проєкт має багато UI-компонентів;
- потрібно підтримувати світлу та темну теми;
- потрібно централізовано змінювати відступи;
- потрібно підтримувати дизайн-систему;
- потрібно налаштовувати компоненти через локальні параметри;
- потрібна взаємодія CSS із JavaScript;
- потрібне адаптивне налаштування значень через media queries.

Не обов'язково створювати змінну для кожного окремого значення.

Наприклад:

    .card {
        padding: 24px;
    }

Якщо значення використовується лише один раз і не має спільного призначення, цього може бути достатньо.

Але якщо `24px` є частиною загальної шкали відступів, краще:

    :root {
        --spacing-lg: 24px;
    }

    .card {
        padding: var(--spacing-lg);
    }

Головне — не кількість змінних, а зрозуміла та послідовна система їх використання.

---

# Питання зі співбесіди

Що таке CSS Variables?

Що таке CSS Custom Properties?

Для чого потрібні CSS Variables?

Як оголосити CSS-змінну?

Як використати CSS-змінну?

Що означає префікс `--`?

Для чого використовується `var()`?

Що таке fallback value?

Як працює `:root`?

Чому CSS Variables часто оголошують у `:root`?

Чим глобальні змінні відрізняються від локальних?

Як CSS Variables успадковуються?

Як перевизначити змінну для окремого компонента?

Як працюють CSS Variables разом із CSS Cascade?

Чи залежить вибір значення змінної від специфічності?

Чому власне значення змінної на елементі може переважити успадковане значення?

Що станеться, якщо змінна не визначена?

Чи fallback виправляє будь-яке неправильне значення змінної?

Які значення можна зберігати в CSS Variables?

Що таке design tokens?

Як організувати кольорову палітру через CSS Variables?

Як використовувати змінні для відступів?

Як використовувати змінні для типографіки?

Як створити світлу та темну теми?

Що таке `prefers-color-scheme`?

Як CSS Variables працюють у media queries?

Як використовувати змінні разом із `calc()`?

Для чого потрібна `clamp()`?

Як змінити CSS Variable через JavaScript?

Що робить `setProperty()`?

Що робить `getPropertyValue()`?

Що робить `removeProperty()`?

Що повертає `getComputedStyle()`?

Чим CSS Variables відрізняються від Sass Variables?

Як CSS Variables використовуються у CSS Modules?

Як CSS Variables допомагають підтримувати компоненти?

Що таке `@property`?

Чи можна анімувати CSS Custom Properties?

Як перевірити CSS Variables у DevTools?

Які типові помилки виникають під час роботи зі змінними?

---

# Шлях вивчення

## 🟢 Core — обов'язково знати

- Що таке CSS Variables.
- CSS Custom Properties.
- Синтаксис `--variable-name`.
- Функція `var()`.
- Оголошення змінних у `:root`.
- Використання глобальних змінних.
- Використання локальних змінних.
- Fallback values.
- Базове успадкування.
- Перевизначення змінних.
- CSS Variables для кольорів.
- CSS Variables для відступів.
- CSS Variables для шрифтів.
- CSS Variables для радіусів.
- Основні переваги для підтримки CSS.
- Різниця між CSS Variables та Sass Variables.

## 🔵 Junior

- CSS Variables та cascade.
- Специфічність під час оголошення змінних.
- Успадкування через кілька рівнів DOM.
- Локальні параметри компонентів.
- Design tokens.
- Naming conventions.
- Теми через `data-theme`.
- `prefers-color-scheme`.
- CSS Variables у media queries.
- Використання з `calc()`.
- Використання з `clamp()`.
- Читання змінних через `getComputedStyle()`.
- Зміна змінних через `setProperty()`.
- Видалення inline-значень через `removeProperty()`.
- Використання змінних у дизайн-системі.
- CSS Variables у CSS Modules.
- CSS Variables у компонентній архітектурі.
- Налагодження змінних у DevTools.

## 🟠 Middle

- Проєктування системи design tokens.
- Організація семантичних і примітивних токенів.
- Глобальні та компонентні змінні.
- Багаторівнева система тем.
- Динамічне перемикання тем.
- Керування темами через атрибути.
- Взаємодія CSS Variables із JavaScript.
- Використання змінних у складних responsive layouts.
- CSS Variables у великих компонентних системах.
- Взаємодія змінних із CSS Modules та Sass.
- Реєстрація custom properties через `@property`.
- Типізація значень через `syntax`.
- Керування успадкуванням через `inherits`.
- Анімація зареєстрованих custom properties.
- Аналіз каскаду та проблем невалідних значень.
- Підтримка єдиної системи токенів у проєкті.

## 🔴 Senior

- Глибоке розуміння CSS Cascade та computed values.
- CSS Custom Properties у складних системах тем.
- Архітектура масштабованих design tokens.
- Семантичні токени та токени конкретних платформ.
- Проєктування API компонентів через CSS Variables.
- Інтеграція токенів із дизайн-системами.
- Контроль успадкування у складних DOM-структурах.
- Діагностика циклічних залежностей custom properties.
- Взаємодія `@property`, CSSOM та анімацій.
- Підтримка сумісності та fallback-стратегій.
- Архітектурні компроміси між глобальними та локальними токенами.
- Підтримка тем у великих застосунках.
- Інтеграція дизайн-токенів у процес розробки та збірки.

---

# Міні-шпаргалка

## Оголошення

    :root {
        --primary-color: blue;
    }

## Використання

    .button {
        background-color: var(--primary-color);
    }

## Fallback

    .button {
        background-color: var(--primary-color, blue);
    }

## Локальна змінна

    .card {
        --card-padding: 24px;

        padding: var(--card-padding);
    }

## Перевизначення

    :root {
        --primary-color: blue;
    }

    .button-danger {
        --primary-color: red;
    }

## Темна тема

    :root {
        --color-text: #111827;
        --color-background: white;
    }

    [data-theme="dark"] {
        --color-text: white;
        --color-background: #111827;
    }

## Responsive variable

    :root {
        --section-spacing: 24px;
    }

    @media (min-width: 768px) {
        :root {
            --section-spacing: 48px;
        }
    }

## Обчислення

    :root {
        --spacing: 8px;
    }

    .card {
        padding: calc(var(--spacing) * 2);
    }

## Читання через JavaScript

    const styles = getComputedStyle(
        document.documentElement
    );

    const color = styles
        .getPropertyValue("--primary-color")
        .trim();

## Зміна через JavaScript

    document.documentElement.style.setProperty(
        "--primary-color",
        "red"
    );

## Видалення inline-значення

    document.documentElement.style.removeProperty(
        "--primary-color"
    );

## CSS Variables vs Sass Variables

    CSS:
        --primary-color: blue;
        color: var(--primary-color);

    Sass:
        $primary-color: blue;
        color: $primary-color;

## Основна модель

    declare
        ↓
    custom property
        ↓
    var()
        ↓
    CSS property
        ↓
    computed styles
        ↓
    rendered UI

---

# Головне

• CSS Variables — це користувацькі CSS-властивості для повторного використання значень.

• Назва змінної починається з двох дефісів:

    --primary-color

• Для отримання значення використовується `var()`:

    var(--primary-color)

• `:root` — стандартне місце для глобальних змінних.

• Змінні, оголошені в `:root`, зазвичай доступні в усьому документі через успадкування.

• Локальні змінні допомагають налаштовувати окремі компоненти.

• CSS Custom Properties за замовчуванням успадковуються.

• Власне значення змінної на елементі має перевагу над успадкованим значенням від предка.

• Fallback дозволяє задати запасне значення:

    var(--primary-color, blue)

• Fallback не виправляє значення, яке існує, але є невалідним для властивості, що його використовує.

• CSS Variables підходять для:

    colors
    spacing
    typography
    borders
    shadows
    layout
    themes
    design tokens

• CSS Variables допомагають створювати світлу й темну теми без дублювання стилів усіх компонентів.

• `prefers-color-scheme` дозволяє врахувати системні налаштування теми.

• CSS Variables можна перевизначати в media queries для адаптивного дизайну.

• `calc()` і `clamp()` можуть використовувати CSS Variables у своїх обчисленнях.

• JavaScript може читати значення через `getComputedStyle()` і `getPropertyValue()`.

• JavaScript може змінювати значення через `setProperty()`.

• `removeProperty()` видаляє відповідне inline-оголошення, а не всі можливі джерела значення змінної.

• CSS Variables відрізняються від Sass Variables тим, що працюють у браузері під час виконання сторінки.

• Design tokens — це систематизовані значення дизайну, для яких CSS Variables є зручним механізмом реалізації.

• Не потрібно створювати змінну для кожного значення без винятку. Змінні найкорисніші там, де потрібні повторне використання, узгодженість і централізоване керування.

• Основна модель роботи:

    :root
        ↓
    --design-token
        ↓
    var(--design-token)
        ↓
    component styles
        ↓
    consistent interface

• Головна мета CSS Variables — зробити стилі гнучкими, послідовними та зручними для підтримки.