# CSS Custom Properties — користувацькі властивості CSS

CSS Custom Properties (користувацькі властивості CSS) — це механізм зберігання значень у змінних, які можна повторно використовувати в CSS.

Вони дозволяють зберігати кольори, відступи, розміри шрифтів, ширину контейнерів, тіні та інші значення в одному місці, а потім використовувати їх у різних правилах стилізації.

Custom Properties допомагають створювати гнучкі стилі, спрощують підтримку коду та є основою для побудови дизайн-систем.

## 1. Навіщо потрібні CSS Custom Properties

Без користувацьких властивостей однакові значення доводиться повторювати в багатьох місцях.

    .button {
        background-color: #2563eb;
        color: white;
        padding: 12px 24px;
    }

    .link {
        color: #2563eb;
    }

    .card {
        border: 1px solid #2563eb;
    }

Якщо потрібно змінити основний колір сайту, доведеться шукати всі місця, де він використовується.

З CSS Custom Properties:

    :root {
        --color-primary: #2563eb;
        --color-text-light: white;
        --spacing-md: 12px;
        --spacing-lg: 24px;
    }

    .button {
        background-color: var(--color-primary);
        color: var(--color-text-light);
        padding: var(--spacing-md) var(--spacing-lg);
    }

    .link {
        color: var(--color-primary);
    }

    .card {
        border: 1px solid var(--color-primary);
    }

Тепер основний колір можна змінити в одному місці.

### Основні переваги

- Повторне використання значень.
- Централізоване керування стилями.
- Просте створення тем оформлення.
- Зручна адаптація інтерфейсу.
- Менше дублювання коду.
- Легша підтримка великих проєктів.
- Можливість змінювати значення залежно від контексту.
- Взаємодія з JavaScript через CSSOM.

## 2. Синтаксис CSS Custom Properties

Користувацька властивість CSS починається з двох дефісів `--`.

Загальний синтаксис:

    селектор {
        --назва-властивості: значення;
    }

Використання значення:

    селектор {
        звичайна-властивість: var(--назва-властивості);
    }

Приклад:

    :root {
        --main-color: royalblue;
    }

    h1 {
        color: var(--main-color);
    }

### Правила найменування

Назва користувацької властивості:

- Починається з `--`.
- Може містити літери, цифри, дефіси та підкреслення.
- Не повинна збігатися з іншою назвою, якщо потрібне окреме значення.
- Чутлива до регістру: `--main-color` і `--Main-Color` — різні властивості.

Приклад:

    :root {
        --color-primary: royalblue;
        --font-size-heading: 2rem;
        --spacing_1: 8px;
        --mainColor: tomato;
    }

    h1 {
        color: var(--color-primary);
        font-size: var(--font-size-heading);
    }

Рекомендація: використовуй зрозумілі назви, які описують призначення значення.

    --color-primary
    --color-background
    --font-size-body
    --spacing-md
    --border-radius-card

Не варто створювати назви, значення яких незрозуміле з контексту:

    --x: blue;
    --a: 12px;
    --value: 20px;

## 3. Псевдоклас `:root`

`:root` — псевдоклас, який вибирає кореневий елемент документа. У звичайному HTML-документі це елемент `<html>`.

Найчастіше глобальні CSS Custom Properties оголошують саме в `:root`.

    :root {
        --color-primary: #2563eb;
        --color-secondary: #7c3aed;
        --color-text: #1f2937;
        --color-background: #f9fafb;

        --spacing-sm: 8px;
        --spacing-md: 16px;
        --spacing-lg: 24px;

        --radius-md: 8px;
        --radius-lg: 16px;
    }

Використання:

    body {
        color: var(--color-text);
        background-color: var(--color-background);
    }

    .button {
        background-color: var(--color-primary);
        border-radius: var(--radius-md);
        padding: var(--spacing-sm) var(--spacing-lg);
    }

### Чому саме `:root`, а не `body`?

Обидва варіанти можуть працювати для багатьох звичайних HTML-сторінок:

    body {
        --color-primary: royalblue;
    }

Але `:root` має вищу специфічність, ніж селектор `body`, і дозволяє оголосити властивості на кореневому елементі документа.

Це зручне місце для глобальних значень, які мають бути доступні всім нащадкам.

Важливо: CSS Custom Properties успадковуються. Тому значення, оголошені в `:root`, зазвичай доступні всім елементам сторінки, якщо їх не перевизначено.

## 4. Функція `var()`

Функція `var()` використовується для отримання значення CSS Custom Property.

Синтаксис:

    var(--назва-властивості)

Приклад:

    :root {
        --text-color: #333;
        --background-color: #fff;
    }

    body {
        color: var(--text-color);
        background-color: var(--background-color);
    }

### Використання в різних властивостях

    :root {
        --primary-color: #2563eb;
        --spacing: 16px;
        --radius: 12px;
        --shadow: 0 4px 12px rgb(0 0 0 / 10%);
    }

    .card {
        color: var(--primary-color);
        padding: var(--spacing);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
    }

Значення користувацької властивості не обмежується одним типом даних. Воно може містити кольори, розміри, списки значень, частини значень та інші допустимі CSS-токени.

    :root {
        --main-color: tomato;
        --page-width: 1200px;
        --font-stack: Arial, Helvetica, sans-serif;
        --transition: 200ms ease-in-out;
        --card-border: 1px solid #ddd;
    }

    body {
        font-family: var(--font-stack);
    }

    .container {
        max-width: var(--page-width);
    }

    .card {
        border: var(--card-border);
        transition: transform var(--transition);
    }

## 5. Значення за замовчуванням у `var()`

Якщо користувацька властивість не має доступного значення, у `var()` можна вказати запасне значення — fallback.

Синтаксис:

    var(--назва-властивості, запасне-значення)

Приклад:

    .button {
        background-color: var(--button-color, royalblue);
    }

Якщо `--button-color` не визначено або її значення недоступне, використовується `royalblue`.

### Приклад із кількома властивостями

    .card {
        color: var(--text-color, #222);
        background-color: var(--card-background, white);
        padding: var(--card-padding, 16px);
        border-radius: var(--card-radius, 8px);
    }

### Fallback для іншої користувацької властивості

    :root {
        --color-primary: royalblue;
        --button-color: var(--color-primary, blue);
    }

    .button {
        background-color: var(--button-color, gray);
    }

Якщо `--color-primary` має доступне значення, воно використовується для `--button-color`. Якщо значення недоступне, спрацює запасне `blue`.

Якщо ж `--button-color` самостійно перевизначено, використовується його нове значення.

### Важлива відмінність

Fallback спрацьовує, коли властивість не визначена або її значення не може бути використане через певні проблеми, наприклад циклічне посилання.

Але fallback не перевіряє, чи підходить значення для конкретної CSS-властивості.

Приклад:

    :root {
        --size: tomato;
    }

    .box {
        width: var(--size, 100px);
    }

Тут `--size` визначено, тому fallback `100px` не використовується. Проте `tomato` не є допустимим значенням `width`, і декларація `width` стає невалідною на етапі обчислення значення.

Отже, запасне значення — не універсальна перевірка правильності CSS.

## 6. Успадкування CSS Custom Properties

За замовчуванням користувацькі властивості успадковуються від батьківського елемента до нащадків.

    .parent {
        --text-color: darkblue;
    }

    .child {
        color: var(--text-color);
    }

HTML:

    <div class="parent">
        <p class="child">Текст усередині батьківського елемента</p>
    </div>

Елемент `.child` використовує `--text-color`, успадкований від `.parent`.

### Перевизначення нащадком

    .parent {
        --text-color: darkblue;
    }

    .child {
        --text-color: darkred;
        color: var(--text-color);
    }

Текст `.child` буде темно-червоним, оскільки власне значення має пріоритет над успадкованим.

### Локальні змінні

Не обов'язково оголошувати кожну змінну в `:root`.

    .card {
        --card-accent: #0f766e;
        border-left: 4px solid var(--card-accent);
    }

    .card-title {
        color: var(--card-accent);
    }

У цьому випадку `--card-accent` доступна елементу `.card` та його нащадкам.

Локальне оголошення допомагає уникати зайвих глобальних змінних і групувати стилі за компонентами.

## 7. Каскад і перевизначення значень

CSS Custom Properties беруть участь у каскаді CSS. Якщо одна властивість оголошена кілька разів для одного елемента, браузер визначає переможця за звичайними правилами каскаду.

    :root {
        --color-primary: blue;
    }

    .button {
        --color-primary: green;
        background-color: var(--color-primary);
    }

    .button.special {
        --color-primary: red;
    }

Для елемента з класами `button special` значення буде червоним.

HTML:

    <button class="button">Звичайна кнопка</button>
    <button class="button special">Особлива кнопка</button>

Перша кнопка матиме зелений фон, друга — червоний.

### Основні правила

- Локальне значення може перекрити успадковане глобальне значення.
- Специфічність селекторів впливає на вибір декларації.
- За однакових умов важливу роль відіграє порядок оголошень.
- `!important` також впливає на каскад, але не повинен бути стандартним способом керування змінними.
- Звичайні правила CSS продовжують працювати: Custom Properties не скасовують каскад.

## 8. Використання `calc()` із Custom Properties

CSS Custom Properties можна використовувати всередині математичних виразів `calc()`.

    :root {
        --spacing-unit: 8px;
    }

    .card {
        padding: calc(var(--spacing-unit) * 2);
        margin-bottom: calc(var(--spacing-unit) * 3);
    }

Результат:

- `padding`: 16px.
- `margin-bottom`: 24px.

### Масштабування відступів

    :root {
        --space-unit: 4px;
    }

    .section {
        padding: calc(var(--space-unit) * 6);
    }

    .card {
        padding: calc(var(--space-unit) * 4);
    }

    .button {
        padding: calc(var(--space-unit) * 2);
    }

Зміна `--space-unit` дозволяє змінювати масштаб відступів у всьому інтерфейсі.

### Обчислення ширини

    :root {
        --container-width: 1200px;
        --page-gutter: 24px;
    }

    .container {
        width: calc(var(--container-width) - 2 * var(--page-gutter));
        margin-inline: auto;
    }

У складніших виразах стеж за одиницями вимірювання та допустимими типами значень.

## 9. Створення системи відступів

Один із найпоширеніших способів використання Custom Properties — створення шкали відступів.

    :root {
        --space-1: 4px;
        --space-2: 8px;
        --space-3: 12px;
        --space-4: 16px;
        --space-5: 24px;
        --space-6: 32px;
        --space-7: 48px;
        --space-8: 64px;
    }

Використання:

    .card {
        padding: var(--space-5);
    }

    .card-title {
        margin-bottom: var(--space-3);
    }

    .section {
        padding-block: var(--space-8);
    }

    .button {
        padding: var(--space-2) var(--space-4);
    }

Перевага: відступи на сайті стають послідовними, а не випадковими.

У реальному проєкті шкалу варто узгодити з дизайном і потребами компонентів.

## 10. Кольорові токени

Custom Properties часто використовують для визначення кольорової палітри.

    :root {
        --color-primary: #2563eb;
        --color-primary-hover: #1d4ed8;

        --color-secondary: #7c3aed;
        --color-success: #15803d;
        --color-warning: #b45309;
        --color-danger: #b91c1c;

        --color-text: #1f2937;
        --color-text-muted: #6b7280;

        --color-background: #ffffff;
        --color-surface: #f3f4f6;
        --color-border: #d1d5db;
    }

    body {
        color: var(--color-text);
        background-color: var(--color-background);
    }

    .card {
        background-color: var(--color-surface);
        border: 1px solid var(--color-border);
    }

    .button {
        color: white;
        background-color: var(--color-primary);
    }

    .button:hover {
        background-color: var(--color-primary-hover);
    }

### Чому це називають дизайн-токенами?

Дизайн-токен — це іменоване значення, яке представляє рішення дизайн-системи: колір, відступ, типографіку, тінь, радіус тощо.

CSS Custom Properties — один із поширених способів реалізації таких токенів у браузері.

## 11. Теми оформлення: світла й темна

Змінні дозволяють змінювати тему, не переписуючи стилі кожного компонента.

    :root {
        color-scheme: light;

        --color-text: #1f2937;
        --color-background: #ffffff;
        --color-surface: #f3f4f6;
        --color-border: #d1d5db;
    }

    [data-theme="dark"] {
        color-scheme: dark;

        --color-text: #f9fafb;
        --color-background: #111827;
        --color-surface: #1f2937;
        --color-border: #374151;
    }

    body {
        color: var(--color-text);
        background-color: var(--color-background);
    }

    .card {
        background-color: var(--color-surface);
        border: 1px solid var(--color-border);
    }

HTML для світлої теми:

    <html lang="uk" data-theme="light">

HTML для темної теми:

    <html lang="uk" data-theme="dark">

Зміна атрибута `data-theme` на кореневому елементі перемикає значення користувацьких властивостей.

### Автоматичне врахування системної теми

Можна використати медіазапит `prefers-color-scheme`.

    :root {
        color-scheme: light dark;

        --color-text: #1f2937;
        --color-background: #ffffff;
        --color-surface: #f3f4f6;
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --color-text: #f9fafb;
            --color-background: #111827;
            --color-surface: #1f2937;
        }
    }

Браузер застосовуватиме темну палітру, коли користувач налаштував темну системну тему.

Важливо: якщо ти створюєш окремий механізм перемикання теми, потрібно визначити пріоритет між вибором користувача та системними налаштуваннями.

## 12. Адаптивний дизайн із Custom Properties

Користувацькі властивості можна перевизначати в медіазапитах.

    :root {
        --page-padding: 16px;
        --section-spacing: 40px;
        --heading-size: 2rem;
    }

    .container {
        padding-inline: var(--page-padding);
    }

    .section {
        padding-block: var(--section-spacing);
    }

    h1 {
        font-size: var(--heading-size);
    }

    @media (min-width: 768px) {
        :root {
            --page-padding: 24px;
            --section-spacing: 64px;
            --heading-size: 2.5rem;
        }
    }

    @media (min-width: 1200px) {
        :root {
            --page-padding: 32px;
            --section-spacing: 80px;
            --heading-size: 3rem;
        }
    }

Тепер адаптивна поведінка задається через зміну значень, а не через повторне написання всіх стилів компонентів.

### Змінні всередині конкретного компонента

    .card {
        --card-padding: 16px;
        padding: var(--card-padding);
    }

    @media (min-width: 768px) {
        .card {
            --card-padding: 24px;
        }
    }

Такий підхід особливо корисний, коли адаптивні параметри стосуються лише одного компонента.

## 13. CSS Custom Properties та функції `min()`, `max()`, `clamp()`

Змінні добре поєднуються з математичними CSS-функціями.

### `clamp()`

`clamp()` задає мінімальне, бажане та максимальне значення.

    :root {
        --heading-min: 2rem;
        --heading-fluid: 5vw;
        --heading-max: 3.5rem;
    }

    h1 {
        font-size: clamp(
            var(--heading-min),
            var(--heading-fluid),
            var(--heading-max)
        );
    }

Розмір заголовка змінюється залежно від ширини вікна, але не виходить за встановлені межі.

### `min()`

    :root {
        --container-max: 1200px;
        --page-gutter: 24px;
    }

    .container {
        width: min(
            calc(100% - 2 * var(--page-gutter)),
            var(--container-max)
        );
        margin-inline: auto;
    }

Контейнер займає доступну ширину з урахуванням відступів, але не стає ширшим за максимальне значення.

### `max()`

    :root {
        --minimum-gap: 16px;
    }

    .layout {
        gap: max(2vw, var(--minimum-gap));
    }

Відстань між елементами буде не меншою за `--minimum-gap`.

## 14. CSS Custom Properties у компонентах

Змінні зручні для налаштування повторно використовуваних компонентів.

    :root {
        --button-radius: 8px;
        --button-padding-block: 10px;
        --button-padding-inline: 20px;
        --button-background: #2563eb;
        --button-text: #ffffff;
    }

    .button {
        padding:
            var(--button-padding-block)
            var(--button-padding-inline);

        border: none;
        border-radius: var(--button-radius);

        color: var(--button-text);
        background-color: var(--button-background);

        cursor: pointer;
    }

### Варіанти компонента

    .button {
        --button-background: #2563eb;
        --button-text: #ffffff;

        color: var(--button-text);
        background-color: var(--button-background);
    }

    .button--secondary {
        --button-background: #e5e7eb;
        --button-text: #1f2937;
    }

    .button--danger {
        --button-background: #b91c1c;
        --button-text: #ffffff;
    }

HTML:

    <button class="button">Основна дія</button>

    <button class="button button--secondary">
        Другорядна дія
    </button>

    <button class="button button--danger">
        Видалити
    </button>

Кожен варіант змінює параметри компонента через локальні Custom Properties.

Цей підхід допомагає уникати дублювання основного CSS.

## 15. CSS Custom Properties та JavaScript

JavaScript може читати й змінювати значення CSS Custom Properties.

### Зчитування глобальної змінної

CSS:

    :root {
        --color-primary: royalblue;
    }

JavaScript:

    const root = document.documentElement;

    const styles = getComputedStyle(root);

    const primaryColor = styles
        .getPropertyValue("--color-primary")
        .trim();

    console.log(primaryColor);

`getComputedStyle()` повертає обчислені стилі елемента. `getPropertyValue()` читає значення властивості.

Метод `trim()` прибирає зайві пробіли на початку й наприкінці рядка.

### Зміна глобальної змінної

    document.documentElement.style.setProperty(
        "--color-primary",
        "tomato"
    );

Це встановлює inline-значення користувацької властивості на кореневому елементі.

Якщо така властивість уже задана через CSS, inline-декларація за звичайних умов матиме перевагу над неважливими деклараціями з таблиць стилів.

### Динамічний розмір

CSS:

    :root {
        --card-width: 300px;
    }

    .card {
        width: var(--card-width);
    }

JavaScript:

    const root = document.documentElement;

    root.style.setProperty("--card-width", "400px");

Тепер ширина картки зміниться на 400px.

### Видалення inline-значення

    document.documentElement.style.removeProperty(
        "--color-primary"
    );

Це видаляє inline-декларацію, але не обов'язково повністю прибирає властивість: вона може бути визначена в іншому CSS-правилі.

### Зміна теми через JavaScript

HTML:

    <button id="theme-toggle" type="button">
        Увімкнути темну тему
    </button>

    <main class="card">
        <h1>Моя картка</h1>
        <p>Приклад використання теми.</p>
    </main>

CSS:

    :root {
        --color-text: #1f2937;
        --color-background: #ffffff;
        --color-surface: #f3f4f6;
    }

    [data-theme="dark"] {
        --color-text: #f9fafb;
        --color-background: #111827;
        --color-surface: #1f2937;
    }

    body {
        color: var(--color-text);
        background-color: var(--color-background);
    }

    .card {
        padding: 24px;
        background-color: var(--color-surface);
    }

JavaScript:

    const themeToggle = document.querySelector("#theme-toggle");

    themeToggle.addEventListener("click", () => {
        const root = document.documentElement;

        const currentTheme = root.dataset.theme;

        const nextTheme = currentTheme === "dark" ? "light" : "dark";

        root.dataset.theme = nextTheme;
    });

Класи або атрибути теми часто зручніші за безпосередню зміну десятків CSS Custom Properties із JavaScript.

## 16. Зареєстровані користувацькі властивості: `@property`

За замовчуванням CSS Custom Properties зберігають значення як послідовність токенів CSS. Браузер не перевіряє наперед, чи є таке значення кольором, числом або довжиною.

Директива `@property` дозволяє зареєструвати користувацьку властивість і визначити її тип, успадкування та початкове значення.

    @property --progress {
        syntax: "<number>";
        inherits: false;
        initial-value: 0;
    }

    .progress-bar {
        --progress: 0.75;

        transform: scaleX(var(--progress));
        transform-origin: left;
    }

### Основні параметри `@property`

- `syntax` — описує допустимий тип значення.
- `inherits` — визначає, чи успадковується властивість.
- `initial-value` — задає початкове значення.

Приклади синтаксису:

    @property --custom-color {
        syntax: "<color>";
        inherits: true;
        initial-value: teal;
    }

    @property --custom-size {
        syntax: "<length>";
        inherits: false;
        initial-value: 10px;
    }

    @property --custom-number {
        syntax: "<number>";
        inherits: false;
        initial-value: 1;
    }

Зареєстровані властивості корисні, коли потрібні типізовані значення або плавна анімація користувацької властивості.

### Анімація зареєстрованої властивості

    @property --circle-size {
        syntax: "<length>";
        inherits: false;
        initial-value: 40px;
    }

    .circle {
        width: var(--circle-size);
        height: var(--circle-size);
        border-radius: 50%;
        background-color: royalblue;

        animation: grow 1s ease-in-out infinite alternate;
    }

    @keyframes grow {
        from {
            --circle-size: 40px;
        }

        to {
            --circle-size: 120px;
        }
    }

Реєстрація повідомляє браузеру, що `--circle-size` є довжиною. Це дає змогу інтерполювати значення під час анімації.

Без реєстрації звичайні Custom Properties, як правило, не інтерполюються як типізовані значення.

## 17. CSS Custom Properties та звичайні CSS-змінні

Важливо розрізняти користувацькі властивості CSS і змінні препроцесорів.

### CSS Custom Properties

    :root {
        --main-color: royalblue;
    }

    .button {
        background-color: var(--main-color);
    }

Особливості:

- Працюють у браузері.
- Можуть змінюватися під час виконання сторінки.
- Успадковуються за замовчуванням.
- Беруть участь у каскаді CSS.
- Можуть змінюватися через JavaScript.
- Можуть залежати від медіазапитів, класів і атрибутів.

### Змінні Sass

Приклад синтаксису Sass:

    $main-color: royalblue;

    .button {
        background-color: $main-color;
    }

Sass — це препроцесор. Його змінні зазвичай обробляються під час компіляції SCSS у CSS.

Після компіляції браузер отримує готові значення, а не Sass-змінні.

### Порівняння

| Можливість | CSS Custom Properties | Sass-змінні |
|---|---|---|
| Працюють у браузері | Так | Ні, самостійно |
| Зміна під час виконання | Так | Ні, не як Sass-змінна |
| Успадкування | За замовчуванням так | Ні |
| Участь у каскаді | Так | Ні після компіляції |
| Доступ через JavaScript | Так | Ні, не напряму |
| Використання в темах | Так | Потребує іншого механізму |
| Обчислення під час компіляції | Не основне призначення | Так |

CSS Custom Properties та Sass-змінні можуть співіснувати в одному проєкті, оскільки вирішують різні завдання.

## 18. Типові помилки

### Помилка 1. Забути два дефіси

Неправильно:

    :root {
        color-primary: blue;
    }

Правильно:

    :root {
        --color-primary: blue;
    }

`color-primary` не є користувацькою властивістю, оскільки не починається з `--`.

### Помилка 2. Забути `var()`

Неправильно:

    :root {
        --main-color: blue;
    }

    h1 {
        color: --main-color;
    }

Правильно:

    h1 {
        color: var(--main-color);
    }

### Помилка 3. Очікувати, що невизначена змінна автоматично матиме значення

    .card {
        background-color: var(--card-background);
    }

Якщо `--card-background` недоступна, ця декларація не матиме придатного значення.

Краще:

    .card {
        background-color: var(--card-background, white);
    }

Або визначити властивість у відповідному контексті.

### Помилка 4. Плутати fallback із перевіркою типу

    :root {
        --card-width: red;
    }

    .card {
        width: var(--card-width, 300px);
    }

Fallback не допоможе, оскільки `--card-width` визначено. Значення `red` непридатне для `width`.

Потрібно виправити саме оголошення:

    :root {
        --card-width: 300px;
    }

### Помилка 5. Занадто багато глобальних змінних

Не варто оголошувати в `:root` кожне одноразове значення.

Надмірно:

    :root {
        --card-title-margin-top: 7px;
        --special-banner-icon-offset: 13px;
        --one-button-extra-padding: 11px;
    }

Якщо значення використовується лише всередині одного компонента, можна оголосити його локально або використати звичайну CSS-властивість.

### Помилка 6. Непослідовні назви

Не рекомендується:

    :root {
        --blue: #2563eb;
        --main-color: #2563eb;
        --primary: #2563eb;
    }

Якщо всі три значення означають одне й те саме, виникає плутанина.

Краще:

    :root {
        --color-primary: #2563eb;
    }

### Помилка 7. Циклічні посилання

Неправильно:

    :root {
        --color-a: var(--color-b);
        --color-b: var(--color-a);
    }

Властивості залежать одна від одної, утворюючи цикл. Такі значення не можуть бути обчислені коректно.

Правильно — визначати незалежне базове значення:

    :root {
        --color-primary: #2563eb;
        --color-button: var(--color-primary);
    }

### Помилка 8. Вважати Custom Properties автоматично типізованими

    :root {
        --spacing: tomato;
    }

    .card {
        padding: var(--spacing);
    }

Значення `tomato` не підходить для `padding`. Звичайна Custom Property не перевіряє тип наперед.

Потрібно зберігати відповідні значення або за потреби застосовувати `@property`.

### Помилка 9. Змінювати багато властивостей вручну через JavaScript

Якщо для теми потрібно змінити десятки кольорів, краще переключати атрибут або клас теми, а не встановлювати кожну змінну окремо.

    document.documentElement.dataset.theme = "dark";

CSS сам застосує відповідні значення.

## 19. Практичні рекомендації

1. Використовуй `:root` для глобальних токенів дизайн-системи.
2. Давай змінним назви за призначенням: `--color-primary`, а не `--blue`.
3. Створи узгоджені шкали кольорів, відступів, радіусів і типографіки.
4. Залишай локальні параметри всередині компонентів, якщо вони не потрібні глобально.
5. Використовуй `var()` із fallback там, де запасне значення справді має сенс.
6. Не вважай fallback автоматичною перевіркою правильності значення.
7. Для тем застосовуй класи або атрибути, наприклад `[data-theme="dark"]`.
8. Поєднуй Custom Properties із `calc()`, `clamp()`, `min()` та `max()`.
9. Використовуй JavaScript для зміни значень лише тоді, коли потрібна динамічна поведінка.
10. Не перетворюй усі CSS-значення на змінні без потреби.
11. Використовуй `@property`, коли потрібні типізація або інтерполяція значень під час анімації.
12. Перевіряй контрастність кольорів для доступності, особливо в темній темі.
13. Не забувай, що Custom Properties беруть участь у каскаді та успадкуванні.
14. Зберігай зрозумілу структуру файлів і документацію для токенів.

## 20. Приклад невеликої дизайн-системи

Цей приклад поєднує кольори, типографіку, відступи, радіуси, тіні, теми та компонентні змінні.

HTML:

    <!DOCTYPE html>
    <html lang="uk" data-theme="light">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CSS Custom Properties</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <header class="header">
            <div class="container header__inner">
                <a class="logo" href="#">MyProject</a>

                <button
                    class="button button--secondary"
                    id="theme-toggle"
                    type="button"
                >
                    Змінити тему
                </button>
            </div>
        </header>

        <main class="container">
            <section class="hero">
                <h1 class="hero__title">Моя дизайн-система</h1>

                <p class="hero__description">
                    Приклад використання CSS Custom Properties.
                </p>

                <button class="button" type="button">
                    Основна дія
                </button>
            </section>

            <section class="cards">
                <article class="card">
                    <h2 class="card__title">Картка 1</h2>
                    <p>Кольори й відступи керуються змінними.</p>
                </article>

                <article class="card">
                    <h2 class="card__title">Картка 2</h2>
                    <p>Компоненти використовують спільні токени.</p>
                </article>
            </section>
        </main>

        <script src="script.js"></script>
    </body>
    </html>

CSS (`styles.css`):

    :root {
        color-scheme: light;

        /* Кольори */
        --color-primary: #2563eb;
        --color-primary-hover: #1d4ed8;
        --color-text: #1f2937;
        --color-text-muted: #6b7280;
        --color-background: #ffffff;
        --color-surface: #f3f4f6;
        --color-border: #d1d5db;

        /* Типографіка */
        --font-family-base: Arial, Helvetica, sans-serif;
        --font-size-base: 1rem;
        --font-size-heading: clamp(2rem, 5vw, 3rem);
        --line-height-base: 1.6;

        /* Відступи */
        --space-1: 4px;
        --space-2: 8px;
        --space-3: 12px;
        --space-4: 16px;
        --space-5: 24px;
        --space-6: 32px;
        --space-7: 48px;

        /* Оформлення */
        --radius-md: 8px;
        --radius-lg: 16px;
        --shadow-card: 0 4px 16px rgb(0 0 0 / 8%);

        /* Компоненти */
        --button-padding-block: 10px;
        --button-padding-inline: 20px;
    }

    [data-theme="dark"] {
        color-scheme: dark;

        --color-text: #f9fafb;
        --color-text-muted: #d1d5db;
        --color-background: #111827;
        --color-surface: #1f2937;
        --color-border: #374151;

        --shadow-card: 0 4px 16px rgb(0 0 0 / 25%);
    }

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: var(--font-family-base);
        font-size: var(--font-size-base);
        line-height: var(--line-height-base);
        color: var(--color-text);
        background-color: var(--color-background);
    }

    .container {
        width: min(100% - 32px, 1100px);
        margin-inline: auto;
    }

    .header {
        border-bottom: 1px solid var(--color-border);
    }

    .header__inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-4);
        padding-block: var(--space-4);
    }

    .logo {
        color: var(--color-primary);
        font-size: 1.25rem;
        font-weight: 700;
        text-decoration: none;
    }

    .hero {
        padding-block: var(--space-7);
    }

    .hero__title {
        margin-block: 0 var(--space-3);
        font-size: var(--font-size-heading);
        line-height: 1.15;
    }

    .hero__description {
        max-width: 60ch;
        margin-block: 0 var(--space-5);
        color: var(--color-text-muted);
    }

    .button {
        padding: var(--button-padding-block) var(--button-padding-inline);
        border: 1px solid transparent;
        border-radius: var(--radius-md);

        color: white;
        background-color: var(--color-primary);

        font: inherit;
        cursor: pointer;

        transition:
            background-color 200ms ease,
            transform 200ms ease;
    }

    .button:hover {
        background-color: var(--color-primary-hover);
    }

    .button:focus-visible {
        outline: 3px solid var(--color-primary);
        outline-offset: 3px;
    }

    .button--secondary {
        color: var(--color-text);
        background-color: var(--color-surface);
        border-color: var(--color-border);
    }

    .button--secondary:hover {
        background-color: var(--color-border);
    }

    .cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
        gap: var(--space-5);
        padding-block-end: var(--space-7);
    }

    .card {
        padding: var(--space-5);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        background-color: var(--color-surface);
        box-shadow: var(--shadow-card);
    }

    .card__title {
        margin-block: 0 var(--space-3);
    }

JavaScript (`script.js`):

    const themeToggle = document.querySelector("#theme-toggle");
    const root = document.documentElement;

    themeToggle.addEventListener("click", () => {
        const currentTheme = root.dataset.theme;

        root.dataset.theme = currentTheme === "dark" ? "light" : "dark";
    });

### Що демонструє цей приклад?

- Глобальні токени оголошено в `:root`.
- Темна тема перевизначає тільки потрібні значення.
- Компоненти використовують `var()` замість дублювання кольорів і відступів.
- `clamp()` створює адаптивний розмір заголовка.
- `min()` обмежує ширину контейнера.
- `margin-inline` і `padding-block` використовують логічні властивості.
- JavaScript перемикає тему через атрибут `data-theme`.
- CSS автоматично застосовує відповідні значення після перемикання теми.

## 21. Що потрібно знати на різних рівнях

### Core — основа

Ти повинен уміти:

- Пояснити, що таке CSS Custom Properties.
- Створити змінну з `--`.
- Використати змінну через `var()`.
- Оголосити глобальні змінні в `:root`.
- Пояснити успадкування.
- Змінити значення змінної в локальному селекторі.
- Використати fallback у `var()`.

### Junior — практичне застосування

Ти повинен уміти:

- Створити палітру кольорів і шкалу відступів.
- Застосувати змінні для кнопок, карток і контейнерів.
- Перевизначити значення в медіазапиті.
- Створити світлу й темну теми.
- Пояснити каскад і локальне перевизначення.
- Використати `calc()` разом із Custom Properties.
- Прочитати та змінити значення через JavaScript.
- Знайти причину невалідного значення, переданого через `var()`.

### Middle — архітектура

Ти повинен розуміти:

- Як організувати токени дизайн-системи.
- Як розділити глобальні та компонентні змінні.
- Як узгодити теми й адаптивні значення.
- Коли використовувати Custom Properties, а коли звичайні декларації.
- Як працює `@property`.
- Як уникати циклічних залежностей.
- Як проєктувати компоненти з налаштовуваними параметрами.
- Як документувати токени та підтримувати їхню послідовність.

### Senior — поглиблене розуміння

Корисно знати:

- Деталі каскаду, успадкування та обчислення значень.
- Поведінку зареєстрованих властивостей.
- Обмеження анімації незареєстрованих Custom Properties.
- Інтеграцію токенів із дизайн-системами та процесом розробки.
- Стратегії сумісності тем із системними налаштуваннями й налаштуваннями користувача.
- Як підтримувати зрозумілу архітектуру стилів у великих проєктах.

## 22. Запитання для співбесіди

1. Що таке CSS Custom Properties?
2. Чим Custom Properties відрізняються від Sass-змінних?
3. Для чого використовують `:root`?
4. Як оголосити та використати користувацьку властивість?
5. Як працює `var()`?
6. Для чого потрібне запасне значення у `var()`?
7. Чи перевіряє fallback, чи підходить значення для конкретної CSS-властивості?
8. Чи успадковуються Custom Properties?
9. Як локально перевизначити глобальну змінну?
10. Як каскад CSS впливає на користувацькі властивості?
11. Як використовувати Custom Properties із `calc()`?
12. Як реалізувати темну тему за допомогою CSS-змінних?
13. Як змінити CSS Custom Property через JavaScript?
14. Як прочитати значення Custom Property у JavaScript?
15. Для чого використовують `@property`?
16. Чому не варто перетворювати кожне значення CSS на змінну?
17. Як організувати токени кольорів і відступів?
18. Що станеться, якщо Custom Property містить значення, непридатне для конкретної CSS-властивості?
19. Що таке циклічні посилання між користувацькими властивостями?
20. Чому Custom Properties корисні для створення компонентів?

## 23. Мінішпаргалка

| Завдання | Синтаксис |
|---|---|
| Оголосити змінну | `--main-color: blue;` |
| Використати змінну | `color: var(--main-color);` |
| Задати fallback | `color: var(--main-color, blue);` |
| Глобальні змінні | `:root { ... }` |
| Локальна змінна | `.card { --accent: teal; }` |
| Обчислення | `width: calc(var(--size) * 2);` |
| Адаптивне значення | `font-size: clamp(1rem, 4vw, 3rem);` |
| Перевизначення теми | `[data-theme="dark"] { ... }` |
| Читання через JS | `getComputedStyle(element).getPropertyValue("--name")` |
| Запис через JS | `element.style.setProperty("--name", "value")` |
| Видалення inline-значення | `element.style.removeProperty("--name")` |
| Реєстрація властивості | `@property --name { ... }` |

## 24. Головне, що потрібно запам'ятати

1. CSS Custom Properties — це користувацькі властивості CSS, які дозволяють повторно використовувати значення.
2. Назва користувацької властивості починається з `--`.
3. Для отримання значення використовують `var()`.
4. Глобальні значення зазвичай оголошують у `:root`.
5. За замовчуванням Custom Properties успадковуються та беруть участь у каскаді.
6. Властивості можна перевизначати для окремих компонентів, тем і медіазапитів.
7. Fallback у `var()` не є перевіркою типу значення.
8. Custom Properties добре працюють разом із `calc()`, `clamp()`, `min()` і `max()`.
9. JavaScript може читати та змінювати їхні значення.
10. `@property` дає змогу реєструвати властивості з визначеним синтаксисом, успадкуванням і початковим значенням.
11. CSS Custom Properties — важливий інструмент для тем, компонентів і дизайн-систем.
12. Найкраща практика — створювати зрозумілу систему змінних, а не перетворювати на змінну кожне CSS-значення.

**Основна ідея:** CSS Custom Properties дозволяють керувати значеннями стилів централізовано, послідовно й динамічно. Вони перетворюють набір окремих CSS-декларацій на систему, яку простіше адаптувати, розширювати та підтримувати.