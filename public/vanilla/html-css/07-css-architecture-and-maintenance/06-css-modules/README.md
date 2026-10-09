# CSS Modules — модульні стилі в CSS

> **CSS Modules** — це підхід до організації CSS, за якого назви класів локальні для конкретного файлу стилів. Це допомагає уникати конфліктів між класами, розділяти стилі компонентів і підтримувати великі проєкти.

📁 `html-css/07-css-architecture-and-maintenance/06-css-modules/`

---

## 1. Що таке CSS Modules

У звичайному CSS назви класів глобальні в межах документа. Якщо два компоненти використовують клас `.title`, їхні стилі можуть конфліктувати.

**Звичайний CSS:**

    /* header.css */
    .title {
        color: navy;
    }

    /* card.css */
    .title {
        color: tomato;
    }

Обидва правила стосуються елементів із класом `title`. Результат залежатиме від каскаду CSS, специфічності та порядку підключення стилів.

CSS Modules вирішує цю проблему, створюючи локальні назви класів для кожного модуля.

    /* Header.module.css */
    .title {
        color: navy;
    }

    /* Card.module.css */
    .title {
        color: tomato;
    }

Хоча в обох файлах є клас `.title`, система збірки перетворить їх на різні назви, наприклад:

    Header_title__a1b2c
    Card_title__x7y8z

Це умовні приклади згенерованих назв. Реальні назви залежать від інструмента збірки та його налаштувань.

### Що дають CSS Modules

- Локальну область видимості класів.
- Менше конфліктів між компонентами.
- Зрозумілий зв'язок між компонентом і його стилями.
- Можливість використовувати однакові короткі назви класів у різних файлах.
- Зручну організацію стилів у React та інших підтримуваних середовищах.
- Можливість поступово розділяти великий CSS на незалежні частини.

**Важливо:** CSS Modules — це не окрема мова програмування і не новий стандарт CSS. Це механізм обробки CSS, який підтримують певні інструменти збірки та фреймворки.

---

## 2. CSS Modules і звичайний CSS

| Характеристика | Звичайний CSS | CSS Modules |
|---|---|---|
| Назви класів | Зазвичай глобальні | Локальні для модуля |
| Конфлікти класів | Можливі | Значно менш імовірні |
| Імпорт у JavaScript | Не обов'язковий | Зазвичай імпортується як об'єкт |
| Використання в HTML | Звичайний рядок класу | Назва класу береться з імпортованого об'єкта |
| Потрібна обробка | Залежить від середовища | Так, потрібна підтримка CSS Modules |
| Повторне використання стилів | Через глобальні класи та інші підходи | Через спільні модулі, змінні, композицію та інші засоби |

### Звичайний CSS

    /* styles.css */
    .button {
        background-color: royalblue;
        color: white;
    }

    /* index.html */
    <button class="button">Натисни</button>

### CSS Modules

Файл `Button.module.css`:

    .button {
        background-color: royalblue;
        color: white;
    }

У React:

    import styles from "./Button.module.css";

    export default function Button() {
        return (
            <button className={styles.button}>
                Натисни
            </button>
        );
    }

Тут `styles.button` — це властивість об'єкта, який експортує система CSS Modules.

---

## 3. Як працюють CSS Modules

Основний принцип:

1. Створюємо CSS-файл із суфіксом `.module.css`.
2. Імпортуємо його в JavaScript або TypeScript.
3. Отримуємо об'єкт із відповідностями між локальними назвами класів і згенерованими назвами.
4. Використовуємо властивості цього об'єкта в розмітці.
5. Інструмент збірки обробляє CSS і забезпечує локальність класів.

### Приклад структури

    src/
    ├── components/
    │   └── Button/
    │       ├── Button.jsx
    │       └── Button.module.css
    └── App.jsx

Файл `Button.module.css`:

    .button {
        padding: 10px 16px;
        border: none;
        border-radius: 8px;
        background-color: #2563eb;
        color: white;
        cursor: pointer;
    }

Файл `Button.jsx`:

    import styles from "./Button.module.css";

    export default function Button() {
        return <button className={styles.button}>Зберегти</button>;
    }

### Що містить `styles`

Спрощено можна уявити об'єкт так:

    {
        button: "Button_button__a1b2c"
    }

Тому вираз:

    styles.button

повертає згенеровану назву класу, а не буквальний рядок `"button"`.

**Запам'ятай:** у CSS Modules назва класу в CSS і властивість об'єкта в JavaScript відповідають одна одній.

---

## 4. Правила іменування файлів

Зазвичай використовують суфікс `.module.css`.

    Button.module.css
    Header.module.css
    Card.module.css
    Navigation.module.css
    ProductList.module.css

У проєктах із CSS Modules можуть зустрічатися також файли:

    Button.module.scss
    Card.module.sass

Вони використовують синтаксис Sass, але для їх обробки потрібна відповідна підтримка Sass у системі збірки.

### Чому важливий суфікс `.module.css`

Багато інструментів розрізняють звичайні CSS-файли та CSS Modules за назвою файлу.

    /* Звичайний CSS */
    styles.css

    /* CSS Module */
    styles.module.css

У типовому налаштуванні CSS Modules імпортують як об'єкт:

    import styles from "./styles.module.css";

Не варто вважати, що будь-який файл CSS автоматично є CSS Module. Це залежить від конфігурації проєкту.

---

## 5. Локальні класи та їх використання

### Один клас

Файл `Card.module.css`:

    .card {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 12px;
    }

Компонент:

    import styles from "./Card.module.css";

    export default function Card() {
        return (
            <article className={styles.card}>
                <h2>Назва картки</h2>
                <p>Опис картки.</p>
            </article>
        );
    }

### Кілька класів

Файл `Card.module.css`:

    .card {
        padding: 20px;
        border-radius: 12px;
    }

    .title {
        margin-bottom: 8px;
        font-size: 24px;
    }

    .description {
        color: #555;
        line-height: 1.6;
    }

Компонент:

    import styles from "./Card.module.css";

    export default function Card() {
        return (
            <article className={styles.card}>
                <h2 className={styles.title}>Назва картки</h2>
                <p className={styles.description}>
                    Опис картки.
                </p>
            </article>
        );
    }

Кожен клас імпортується через властивість об'єкта `styles`.

### Клас із дефісом

Файл `Card.module.css`:

    .card-title {
        font-size: 24px;
    }

Такий клас можна отримати через квадратні дужки:

    import styles from "./Card.module.css";

    <h2 className={styles["card-title"]}>Заголовок</h2>

Якщо назва класу містить дефіс, `styles["card-title"]` — зрозумілий спосіб звернутися до неї.

Можна також використовувати назви в camelCase, якщо відповідну поведінку налаштовано в інструменті збірки. Проте для переносимості не слід припускати, що таке перетворення завжди відбувається автоматично.

---

## 6. Кілька класів на одному елементі

У звичайному HTML можна написати:

    <button class="button primary">Зберегти</button>

У React із CSS Modules потрібно використати значення з об'єкта стилів.

### Спосіб 1. Шаблонний рядок

Файл `Button.module.css`:

    .button {
        padding: 10px 16px;
        border: none;
        border-radius: 8px;
    }

    .primary {
        background-color: royalblue;
        color: white;
    }

Компонент:

    import styles from "./Button.module.css";

    export default function Button() {
        return (
            <button className={`${styles.button} ${styles.primary}`}>
                Зберегти
            </button>
        );
    }

### Спосіб 2. Метод `join()`

    <button className={[styles.button, styles.primary].join(" ")}>
        Зберегти
    </button>

Цей спосіб зручний, коли класів декілька.

### Спосіб 3. Умовні класи

    import styles from "./Button.module.css";

    export default function Button({ disabled }) {
        return (
            <button
                className={[
                    styles.button,
                    disabled ? styles.disabled : styles.primary
                ].join(" ")}
                disabled={disabled}
            >
                Зберегти
            </button>
        );
    }

У цьому прикладі властивість `disabled` визначає, який додатковий клас застосувати.

### Важливий момент

CSS Modules не додає автоматично класи залежно від стану компонента. Логіку вибору класів пишемо в JavaScript або TypeScript.

---

## 7. Умовні класи та модифікатори

CSS Modules добре підходить для стилів компонентів із кількома станами.

Файл `Button.module.css`:

    .button {
        padding: 10px 16px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
    }

    .primary {
        background-color: royalblue;
        color: white;
    }

    .secondary {
        background-color: #e5e7eb;
        color: #111827;
    }

    .danger {
        background-color: crimson;
        color: white;
    }

Компонент:

    import styles from "./Button.module.css";

    export default function Button({ variant = "primary", children }) {
        const variantClass = {
            primary: styles.primary,
            secondary: styles.secondary,
            danger: styles.danger
        }[variant] ?? styles.primary;

        return (
            <button className={`${styles.button} ${variantClass}`}>
                {children}
            </button>
        );
    }

Використання:

    <Button variant="primary">Зберегти</Button>
    <Button variant="secondary">Скасувати</Button>
    <Button variant="danger">Видалити</Button>

Тут `variantClass` вибирає потрібний клас. Якщо передано невідомий варіант, використовується `primary`.

**Практична порада:** для невеликої кількості станів достатньо звичайних умов. Якщо умов стає багато, винеси вибір класу в окрему функцію або використай спеціалізовану бібліотеку для складання класів.

---

## 8. Динамічні класи: звичайні умови та `clsx`

Коли компонент має багато умов, шаблонні рядки можуть ставати важкими для читання.

Наприклад:

    className={`${styles.button} ${isPrimary ? styles.primary : ""} ${isLarge ? styles.large : ""}`}

Для спрощення часто використовують бібліотеку `clsx`.

### Встановлення

    npm install clsx

### Використання

    import clsx from "clsx";
    import styles from "./Button.module.css";

    export default function Button({ primary, large, disabled }) {
        return (
            <button
                className={clsx(
                    styles.button,
                    primary && styles.primary,
                    large && styles.large,
                    disabled && styles.disabled
                )}
                disabled={disabled}
            >
                Натисни
            </button>
        );
    }

CSS:

    .button {
        padding: 8px 12px;
    }

    .primary {
        background-color: royalblue;
        color: white;
    }

    .large {
        padding: 14px 22px;
        font-size: 18px;
    }

    .disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

`clsx` не є частиною CSS Modules. Це окрема JavaScript-бібліотека, яка допомагає складати рядок класів.

Для простих компонентів додаткову бібліотеку встановлювати не обов'язково.

---

## 9. Псевдокласи та псевдоелементи

CSS Modules підтримує звичайні CSS-псевдокласи та псевдоелементи.

Файл `Button.module.css`:

    .button {
        padding: 10px 16px;
        background-color: royalblue;
        color: white;
        border: none;
        border-radius: 8px;
        transition: background-color 0.2s ease;
    }

    .button:hover {
        background-color: darkblue;
    }

    .button:focus-visible {
        outline: 3px solid orange;
        outline-offset: 3px;
    }

    .button::before {
        content: "✓ ";
    }

Компонент:

    import styles from "./Button.module.css";

    export default function Button() {
        return (
            <button className={styles.button}>
                Зберегти
            </button>
        );
    }

Локальний клас `.button` застосовується до елемента, а `:hover`, `:focus-visible` і `::before` описують його стани та псевдоелемент.

**Запам'ятай:** CSS Modules не замінює синтаксис CSS. Він локалізує класи, але більшість звичайних можливостей CSS продовжують працювати.

---

## 10. Вкладені селектори

У CSS Modules можна використовувати звичайні комбінатори та вкладені правила, якщо їх підтримує обрана версія CSS або обробник.

Файл `Card.module.css`:

    .card {
        padding: 20px;
    }

    .card .title {
        margin-bottom: 8px;
    }

    .card:hover {
        box-shadow: 0 8px 20px rgb(0 0 0 / 12%);
    }

Тут `.card` і `.title` — локальні класи модуля.

Компонент:

    import styles from "./Card.module.css";

    export default function Card() {
        return (
            <article className={styles.card}>
                <h2 className={styles.title}>Заголовок</h2>
            </article>
        );
    }

### Чому не варто надмірно ускладнювати вкладеність

Надмірно довгі селектори складніше змінювати:

    .card .content .header .title {
        font-size: 24px;
    }

Часто простіше створити окремі локальні класи та застосовувати їх без зайвої вкладеності.

    .title {
        font-size: 24px;
    }

---

## 11. Глобальні стилі та CSS Modules

CSS Modules локалізує передусім імена класів, а не весь CSS без винятку.

Для базових стилів проєкту зазвичай залишають окремий глобальний файл.

Наприклад:

    src/
    ├── app/
    │   ├── globals.css
    │   └── page.jsx
    └── components/
        └── Button/
            ├── Button.jsx
            └── Button.module.css

Глобальний файл `globals.css`:

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: Arial, sans-serif;
    }

    a {
        color: inherit;
    }

Модульний файл `Button.module.css`:

    .button {
        padding: 10px 16px;
        border-radius: 8px;
        background-color: royalblue;
        color: white;
    }

Глобальні стилі визначають загальні правила проєкту, а CSS Modules — оформлення конкретного компонента.

### Коли потрібні глобальні стилі

- Скидання стандартних стилів браузера.
- Базова типографіка.
- Загальні стилі `body` та `html`.
- CSS-змінні дизайн-системи.
- Глобальні утилітарні класи, якщо проєкт їх використовує.
- Стилі сторонніх бібліотек, які очікують глобальні селектори.

Не потрібно перетворювати кожне правило на CSS Module. Глобальні та локальні стилі можуть співіснувати.

---

## 12. Глобальні селектори всередині CSS Modules

У багатьох реалізаціях CSS Modules можна явно вказати глобальний селектор за допомогою `:global(...)`.

Наприклад:

    :global(.external-widget) {
        font-family: Arial, sans-serif;
    }

Це правило призначене для глобального класу `.external-widget`, а не для локального класу, згенерованого з нього.

У деяких конфігураціях також підтримується така форма:

    .container :global(.external-widget) {
        margin-top: 16px;
    }

Тут `.container` залишається локальним, а `.external-widget` — глобальним.

Точний синтаксис та можливості залежать від реалізації CSS Modules і конфігурації інструмента збірки.

### Коли це корисно

- Для стилізації стороннього віджета.
- Для роботи з HTML, який генерує зовнішня бібліотека.
- Для інтеграції з компонентами, класи яких не контролюються твоїм кодом.

### Чого уникати

Не використовуй `:global` без потреби. Велика кількість глобальних селекторів знову створює проблему залежності стилів і підвищує ризик конфліктів.

---

## 13. CSS Modules і CSS-змінні

CSS Modules не забороняє використовувати custom properties — CSS-змінні.

Файл `Card.module.css`:

    .card {
        padding: var(--space-md);
        border-radius: var(--radius-md);
        background-color: var(--color-surface);
        color: var(--color-text);
    }

Глобальний файл `globals.css`:

    :root {
        --space-md: 16px;
        --radius-md: 12px;
        --color-surface: #ffffff;
        --color-text: #1f2937;
    }

У цьому прикладі змінні доступні глобально, а клас `.card` локальний.

### Локальні CSS-змінні

Можна оголосити змінну всередині класу компонента:

    .card {
        --card-gap: 12px;

        display: flex;
        flex-direction: column;
        gap: var(--card-gap);
    }

Така змінна доступна елементу з класом `.card` і його нащадкам через механізм успадкування custom properties.

### Коли використовувати CSS-змінні

- Кольори дизайн-системи.
- Відступи та розміри.
- Радіуси та тіні.
- Теми оформлення.
- Значення, які потрібно змінювати залежно від контексту.

CSS Modules і CSS-змінні вирішують різні завдання: перший локалізує назви класів, другі зберігають значення, які можна повторно використовувати.

---

## 14. Композиція класів: `composes`

CSS Modules у підтримуваних реалізаціях дозволяє композицію класів за допомогою `composes`.

Файл `Button.module.css`:

    .base {
        padding: 10px 16px;
        border: none;
        border-radius: 8px;
        font: inherit;
    }

    .primary {
        composes: base;
        background-color: royalblue;
        color: white;
    }

    .secondary {
        composes: base;
        background-color: #e5e7eb;
        color: #111827;
    }

Компонент:

    import styles from "./Button.module.css";

    export default function Button() {
        return (
            <>
                <button className={styles.primary}>Зберегти</button>
                <button className={styles.secondary}>Скасувати</button>
            </>
        );
    }

Класи `primary` та `secondary` повторно використовують спільний набір стилів із `base`.

### Важливі обмеження

- `composes` — це можливість CSS Modules, а не стандартна властивість CSS.
- Її підтримка залежить від конкретного обробника CSS Modules.
- Для композиції часто зручніше використовувати класи з того самого модуля.
- Не всі комбінації селекторів і композиції підтримуються однаково.
- Для простих компонентів звичайні класи та складання класів у JavaScript можуть бути зрозумілішими.

Не плутай `composes` із CSS-властивістю `composes` у стандартному браузерному CSS: це спеціальна директива інструмента обробки CSS Modules.

---

## 15. CSS Modules і адаптивний дизайн

Усі звичайні можливості адаптивного CSS доступні й у CSS Modules.

Файл `Card.module.css`:

    .card {
        width: 100%;
        padding: 16px;
        border-radius: 12px;
    }

    .title {
        font-size: 20px;
    }

    @media (min-width: 768px) {
        .card {
            padding: 24px;
        }

        .title {
            font-size: 28px;
        }
    }

    @media (min-width: 1200px) {
        .card {
            max-width: 900px;
            margin-inline: auto;
        }
    }

Важливо, що локальність класів не змінює логіку медіазапитів.

Так само можна використовувати:

- `@media`.
- `@supports`.
- Flexbox.
- CSS Grid.
- `min()`, `max()` і `clamp()`.
- Відносні одиниці `rem`, `em`, `%`, `vw`.
- Контейнерні запити, якщо їх підтримує цільовий браузер.

### Приклад із `clamp()`

    .title {
        font-size: clamp(1.5rem, 3vw, 2.5rem);
    }

Розмір шрифту змінюється залежно від ширини вікна, але не виходить за встановлені межі.

---

## 16. CSS Modules у React

React часто використовують разом із CSS Modules, оскільки стилі можна зберігати поруч із компонентом.

### Рекомендована структура

    src/
    ├── components/
    │   ├── Button/
    │   │   ├── Button.jsx
    │   │   └── Button.module.css
    │   ├── Card/
    │   │   ├── Card.jsx
    │   │   └── Card.module.css
    │   └── Header/
    │       ├── Header.jsx
    │       └── Header.module.css
    ├── App.jsx
    └── main.jsx

### Приклад компонента

Файл `Card.module.css`:

    .card {
        padding: 24px;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        background-color: white;
    }

    .title {
        margin: 0 0 12px;
        font-size: 24px;
    }

    .description {
        margin: 0;
        color: #4b5563;
        line-height: 1.6;
    }

Файл `Card.jsx`:

    import styles from "./Card.module.css";

    export default function Card({ title, description }) {
        return (
            <article className={styles.card}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
            </article>
        );
    }

Файл `App.jsx`:

    import Card from "./components/Card/Card";

    export default function App() {
        return (
            <main>
                <Card
                    title="CSS Modules"
                    description="Локальні стилі для компонентів."
                />
            </main>
        );
    }

### Перевага такого підходу

Коли потрібно змінити оформлення картки, зазвичай достатньо відкрити її власний файл `Card.module.css`.

Це спрощує навігацію в коді та зменшує ризик випадково змінити стиль іншого компонента.

---

## 17. CSS Modules у Next.js

Next.js підтримує CSS Modules для локальних стилів компонентів.

Типова структура App Router:

    src/
    └── app/
        ├── page.tsx
        ├── page.module.css
        ├── globals.css
        └── components/
            └── Button/
                ├── Button.tsx
                └── Button.module.css

Файл `page.module.css`:

    .main {
        width: min(100% - 32px, 960px);
        margin-inline: auto;
        padding-block: 40px;
    }

    .title {
        margin-bottom: 16px;
        font-size: clamp(2rem, 4vw, 3rem);
    }

Файл `page.tsx`:

    import styles from "./page.module.css";

    export default function HomePage() {
        return (
            <main className={styles.main}>
                <h1 className={styles.title}>Мій Next.js проєкт</h1>
            </main>
        );
    }

### Основні правила

- CSS Module імпортується у файл компонента.
- Для класів використовуються властивості імпортованого об'єкта.
- Глобальні базові стилі можна зберігати у `globals.css`.
- CSS Modules працює як у багатьох клієнтських компонентах, так і в Server Components.
- Сам по собі імпорт CSS Module не вимагає директиви `"use client"`.

### CSS Modules та Server Components

Якщо компонент не використовує клієнтські можливості React, він може залишатися Server Component.

Наприклад:

    import styles from "./page.module.css";

    export default function Page() {
        return (
            <main className={styles.main}>
                <h1>Сторінка</h1>
            </main>
        );
    }

Тут не потрібна директива `"use client"`, оскільки компонент не використовує стан, ефекти або обробники подій React.

---

## 18. CSS Modules і TypeScript

У TypeScript імпорт CSS Modules може вимагати декларації типів, якщо інструмент збірки не генерує їх автоматично.

У багатьох сучасних конфігураціях React і Next.js базова підтримка CSS Modules уже налаштована. Якщо TypeScript повідомляє, що модуль стилів не має відповідних типів, перевір конфігурацію свого проєкту.

### Приклад декларації

У деяких конфігураціях можна використати деклараційний файл `global.d.ts`:

    declare module "*.module.css" {
        const classes: { [key: string]: string };
        export default classes;
    }

Тоді TypeScript розуміє, що імпорт CSS Module повертає об'єкт, у якому назви класів відповідають рядковим значенням.

### Обережно з типами

Наведена декларація дозволяє звертатися до довільних ключів. Тому TypeScript може не виявити помилку в назві класу:

    import styles from "./Button.module.css";

    // Опечатка може залишитися непоміченою
    const buttonClass = styles.buton;

Для кращої перевірки можна використовувати генерацію типів CSS Modules, якщо вона доступна у твоєму інструменті збірки.

**Порада:** не додавай декларації автоматично, якщо твій фреймворк уже забезпечує підтримку CSS Modules. Спочатку перевір, чи справді TypeScript повідомляє про проблему.

---

## 19. CSS Modules і звичайні CSS-файли: як обирати

CSS Modules — не єдиний спосіб організації стилів.

| Підхід | Коли корисний |
|---|---|
| Звичайний CSS | Невеликі сайти, глобальні стилі, прості сторінки |
| CSS Modules | Компонентні стилі з локальними назвами класів |
| Sass/SCSS | Коли потрібні змінні Sass, міксини, функції та інші можливості препроцесора |
| CSS-in-JS | Коли потрібна стилізація через JavaScript і відповідна інтеграція з компонентами |
| Utility-first CSS | Коли команда використовує утилітарні класи та узгоджені правила дизайн-системи |

Ці підходи не завжди взаємовиключні. Наприклад, у проєкті можна використовувати CSS Modules для компонентів і глобальний CSS для базових стилів.

### Коли варто обрати CSS Modules

- Компонентів багато.
- Стилі потрібно ізолювати.
- Назви класів часто повторюються.
- Команда працює над різними частинами інтерфейсу.
- Хочеться зберігати стилі поруч із компонентами.
- Не потрібна окрема CSS-in-JS система.

### Коли CSS Modules не є обов'язковим

- Маленька статична сторінка.
- Один невеликий CSS-файл.
- Проєкт уже використовує іншу добре організовану систему стилів.
- Усі класи свідомо організовані як глобальні утиліти або дизайн-система.

Не потрібно застосовувати CSS Modules лише тому, що це сучасний інструмент. Обирай його тоді, коли локальність стилів справді допомагає.

---

## 20. Типові помилки

### Помилка 1. Використання рядка замість імпортованого класу

Неправильно:

    import styles from "./Button.module.css";

    export default function Button() {
        return <button className="button">Натисни</button>;
    }

Якщо клас `.button` у CSS Module локалізований, звичайний рядок `"button"` не обов'язково відповідатиме згенерованій назві.

Правильно:

    import styles from "./Button.module.css";

    export default function Button() {
        return <button className={styles.button}>Натисни</button>;
    }

### Помилка 2. Неправильна назва властивості

CSS:

    .button {
        padding: 10px;
    }

JavaScript:

    <button className={styles.btn}>Натисни</button>

Тут `styles.btn` не відповідає класу `.button`.

Правильно:

    <button className={styles.button}>Натисни</button>

### Помилка 3. Неправильний шлях імпорту

    import styles from "./Button.css";

Якщо файл називається `Button.module.css`, шлях має відповідати реальній назві файлу:

    import styles from "./Button.module.css";

### Помилка 4. Очікування, що всі селектори автоматично локальні

CSS Modules локалізує назви класів та ідентифікаторів відповідно до реалізації. Але не кожен CSS-селектор автоматично стає локальним класом.

Наприклад:

    body {
        margin: 0;
    }

Це глобальний селектор елемента, а не клас, який можна отримати через `styles.body`.

Глобальні правила доцільно зберігати в окремому глобальному файлі.

### Помилка 5. Зайве використання глобальних стилів

Якщо всі компоненти використовують глобальні класи з однаковими назвами, переваги CSS Modules частково втрачаються.

Краще локалізувати стилі компонентів, а глобальними залишати лише справді спільні правила.

### Помилка 6. Надмірна складність умовних класів

Довгі шаблонні рядки важко читати:

    className={`${styles.button} ${active ? styles.active : ""} ${large ? styles.large : ""} ${disabled ? styles.disabled : ""}`}

Якщо умов багато, розглянь масив із `join(" ")`, `clsx` або окрему функцію для складання класів.

### Помилка 7. Надмірна вкладеність

Не варто переносити всі рівні HTML-структури в довгі CSS-селектори. Краще створювати локальні класи для основних елементів компонента.

### Помилка 8. Відсутність доступного фокуса

Не видаляй обведення фокуса без альтернативи.

Погано:

    .button:focus {
        outline: none;
    }

Краще:

    .button:focus-visible {
        outline: 3px solid orange;
        outline-offset: 3px;
    }

### Помилка 9. Дублювання стилів замість повторного використання

Якщо кілька компонентів мають однакові правила, подумай, чи варто винести спільні значення в CSS-змінні або створити спільні класи.

Водночас не варто будувати надмірно складну систему абстракцій заради кількох повторень.

### Помилка 10. Припущення, що CSS Modules автоматично виправляє CSS

CSS Modules не замінює знання каскаду, специфічності, Flexbox, Grid, адаптивного дизайну або доступності. Він вирішує конкретну проблему області видимості назв.

---

## 21. Практична робота: картка користувача

Мета: створити компонент картки, використовуючи CSS Modules, і навчитися працювати з локальними класами та модифікаторами.

### Структура

    06-css-modules/
    └── 01-user-card/
        ├── index.html
        ├── styles.css
        └── script.js

Це приклад для окремої статичної HTML-сторінки. У ньому немає імпорту CSS Modules, оскільки звичайний браузер не перетворює `.module.css` на локальний об'єкт автоматично.

Для практики CSS Modules потрібне середовище збірки, наприклад Vite із React, або інший інструмент, який підтримує CSS Modules.

### Рекомендований варіант для Vite + React

Структура:

    src/
    ├── components/
    │   └── UserCard/
    │       ├── UserCard.jsx
    │       └── UserCard.module.css
    ├── App.jsx
    └── main.jsx

Файл `UserCard.module.css`:

    .card {
        max-width: 360px;
        padding: 24px;
        border: 1px solid #e5e7eb;
        border-radius: 16px;
        background-color: #ffffff;
        box-shadow: 0 4px 12px rgb(0 0 0 / 6%);
    }

    .name {
        margin: 0 0 8px;
        font-size: 24px;
    }

    .role {
        margin: 0 0 20px;
        color: #6b7280;
    }

    .button {
        padding: 10px 16px;
        border: none;
        border-radius: 8px;
        background-color: #2563eb;
        color: #ffffff;
        cursor: pointer;
    }

    .button:hover {
        background-color: #1d4ed8;
    }

    .button:focus-visible {
        outline: 3px solid #93c5fd;
        outline-offset: 3px;
    }

    .highlighted {
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgb(37 99 235 / 15%);
    }

Файл `UserCard.jsx`:

    import { useState } from "react";
    import styles from "./UserCard.module.css";

    export default function UserCard() {
        const [highlighted, setHighlighted] = useState(false);

        const cardClass = [
            styles.card,
            highlighted ? styles.highlighted : ""
        ].filter(Boolean).join(" ");

        return (
            <article className={cardClass}>
                <h2 className={styles.name}>Олена Коваль</h2>

                <p className={styles.role}>
                    Frontend Developer
                </p>

                <button
                    className={styles.button}
                    onClick={() => setHighlighted(!highlighted)}
                    aria-pressed={highlighted}
                >
                    {highlighted ? "Прибрати виділення" : "Виділити картку"}
                </button>
            </article>
        );
    }

Файл `App.jsx`:

    import UserCard from "./components/UserCard/UserCard";

    export default function App() {
        return (
            <main>
                <UserCard />
            </main>
        );
    }

### Що потрібно зрозуміти

1. `UserCard.module.css` містить стилі одного компонента.
2. `styles.card` повертає локальну назву класу.
3. `styles.highlighted` додається лише тоді, коли `highlighted === true`.
4. `useState` керує станом виділення картки.
5. Кнопка використовує локальний клас `styles.button`.
6. CSS Modules і React State вирішують різні завдання: один організовує стилі, інший керує станом інтерфейсу.

### Завдання для самостійної роботи

1. Додай клас `.avatar` для зображення користувача.
2. Додай клас `.status` для позначки «Онлайн».
3. Створи модифікатор `.compact` для компактної картки.
4. Додай проп `compact` і вмикай відповідний клас умовно.
5. Створи другий компонент із власним `Card.module.css`, у якому також є клас `.title`.
6. Переконайся, що стилі заголовків двох компонентів не конфліктують.
7. Додай адаптивний медіазапит для вузьких екранів.
8. Перевір, що кнопка працює з клавіатури та має видимий фокус.

---

## 22. Практичні вправи

### Рівень 1 — Core

**Вправа 1. Один локальний клас**

Створи `Box.module.css` із класом `.box`.

Завдання:
- Додай фон, відступи та рамку.
- Імпортуй файл у компонент.
- Використай `styles.box`.

**Вправа 2. Два компоненти з однаковими назвами класів**

Створи `Header.module.css` і `Footer.module.css`.

В обох файлах створи клас `.title`, але задай йому різні кольори.

Перевір, що заголовки стилізуються незалежно.

**Вправа 3. Кілька класів**

Створи `.button` і `.primary`.

Застосуй обидва класи до однієї кнопки.

### Рівень 2 — Junior

**Вправа 4. Умовний клас**

Створи компонент із кнопкою, яка змінює свій вигляд залежно від стану.

**Вправа 5. Компонент картки**

Створи `ProductCard.module.css` та `ProductCard.jsx`.

Додай:
- назву товару;
- опис;
- ціну;
- кнопку;
- стан «У вибраному».

**Вправа 6. Адаптивність**

Зроби так, щоб картка займала всю доступну ширину на вузькому екрані, але мала обмежену ширину на широкому.

### Рівень 3 — Middle

**Вправа 7. Багато модифікаторів**

Створи кнопку з варіантами `primary`, `secondary` і `danger`.

Реалізуй вибір класу через об'єкт відповідностей.

**Вправа 8. Глобальні та локальні стилі**

Створи `globals.css` із базовими стилями та окремі CSS Modules для двох компонентів.

Визнач, які правила справді мають бути глобальними.

**Вправа 9. Спільні значення**

Винеси кольори та відступи в CSS custom properties.

Використай їх у декількох CSS Modules.

### Рівень 4 — Senior

**Вправа 10. Архітектура стилів**

Спроєктуй структуру стилів для невеликого застосунку:

    src/
    ├── app/
    │   └── globals.css
    ├── components/
    │   ├── Button/
    │   ├── Card/
    │   ├── Header/
    │   └── Navigation/
    └── styles/
        └── tokens.css

Визнач:
- де зберігати глобальні правила;
- де зберігати дизайн-токени;
- як організувати стилі компонентів;
- як уникати зайвого дублювання;
- як забезпечити доступність;
- як підтримувати єдиний стиль оформлення.

---

## 23. Як перевірити, що CSS Modules працює

Якщо класи не застосовуються, перевір послідовно:

1. **Назву файлу.** Чи має він правильний суфікс, наприклад `Button.module.css`?
2. **Шлях імпорту.** Чи вказано правильний шлях до файлу?
3. **Назву класу.** Чи існує `.button` у CSS, якщо код використовує `styles.button`?
4. **Спосіб застосування.** У React потрібно використовувати `className`, а не `class`.
5. **Підтримку інструмента.** Чи налаштована обробка CSS Modules у проєкті?
6. **Помилки збірки.** Чи немає повідомлень про неправильний імпорт?
7. **DevTools.** Чи є елемент у DOM і які класи йому призначено?
8. **Computed Styles.** Чи не перекривають потрібні властивості інші правила?
9. **Глобальні стилі.** Чи немає конфліктних правил із вищою специфічністю?
10. **TypeScript.** Якщо помилка стосується типів, перевір декларації та налаштування генерації типів.

### Корисна звичка

Коли стиль не працює, не змінюй одразу всі CSS-правила. Спочатку перевір, чи правильний клас взагалі потрапив у DOM.

---

## 24. CSS Modules і продуктивність

CSS Modules допомагає організувати стилі, але не гарантує автоматичного прискорення сайту.

На продуктивність впливають:

- обсяг завантажуваного CSS;
- кількість і складність правил;
- повторне використання компонентів;
- робота системи збірки;
- спосіб завантаження стилів;
- рендеринг компонентів;
- вартість CSS-властивостей під час відображення;
- кешування та розділення коду.

### Що варто робити

- Видаляй невикористані стилі.
- Уникай непотрібного дублювання.
- Не створюй надто складні селектори без потреби.
- Використовуй повторно спільні значення.
- Вимірюй продуктивність перед оптимізацією.
- Перевіряй результат у браузерних інструментах розробника.

**Важливо:** CSS Modules — насамперед інструмент локальності та організації коду, а не універсальний засіб оптимізації швидкості.

---

## 25. CSS Modules: що варто пам'ятати про каскад

CSS Modules не скасовує основні правила CSS.

Навіть якщо класи локальні, продовжують діяти:

- специфічність;
- порядок оголошень;
- успадкування;
- каскадні шари;
- `!important`;
- медіазапити;
- глобальні правила;
- стандартні стилі браузера.

Наприклад:

    .button {
        color: white;
    }

    .button.primary {
        color: yellow;
    }

Якщо обидва класи застосовані до одного елемента, другий селектор має вищу специфічність і задає жовтий колір, якщо інші правила каскаду не змінюють результат.

Тобто CSS Modules допомагає ізолювати назви, але не робить стилі незалежними від каскаду.

---

## 26. CSS Modules: поширені питання на співбесіді

### 1. Що таке CSS Modules?

Це механізм локалізації CSS-класів, за якого система збірки створює унікальні назви та дозволяє використовувати їх через імпортований об'єкт.

### 2. Яку проблему вирішують CSS Modules?

Вони зменшують конфлікти між глобальними назвами класів і допомагають ізолювати стилі компонентів.

### 3. Чим CSS Modules відрізняється від звичайного CSS?

Звичайні класи зазвичай глобальні в межах документа. У CSS Modules класи локальні для конкретного модуля.

### 4. Як підключити CSS Module у React?

Наприклад:

    import styles from "./Button.module.css";

Після цього клас застосовують так:

    <button className={styles.button}>Натисни</button>

### 5. Чому не можна завжди писати `className="button"`?

Тому що клас може бути перейменований під час обробки CSS Modules. Для доступу до локального класу використовують значення з імпортованого об'єкта.

### 6. Чи замінюють CSS Modules звичайний CSS?

Ні. Вони змінюють спосіб організації та обробки назв класів, але більшість можливостей CSS залишаються доступними.

### 7. Чи можна використовувати медіазапити?

Так. CSS Modules підтримує звичайні CSS-медіазапити.

### 8. Чи можна використовувати CSS Modules із Next.js?

Так. Next.js підтримує CSS Modules, зокрема в App Router.

### 9. Чи потрібен `"use client"` для імпорту CSS Module?

Ні. Сам по собі імпорт стилів не робить компонент клієнтським.

### 10. Чи можна використовувати глобальні стилі разом із CSS Modules?

Так. Наприклад, глобальні базові стилі можна зберігати у `globals.css`, а стилі компонентів — у `.module.css`.

### 11. Що таке `composes`?

Це спеціальний механізм CSS Modules для композиції класів у підтримуваних реалізаціях.

### 12. Чи допомагають CSS Modules уникнути всіх CSS-конфліктів?

Ні. Вони локалізують назви класів, але глобальні селектори, каскад, специфічність та інші правила CSS продовжують діяти.

### 13. Чим CSS Modules відрізняється від CSS-in-JS?

CSS Modules використовує CSS-файли та обробку класів на етапі збірки. CSS-in-JS організовує стилі через JavaScript і може мати інші механізми генерації та застосування стилів.

### 14. Чи варто використовувати CSS Modules у кожному проєкті?

Ні. Вибір залежить від розміру проєкту, архітектури, інструментів та потреб команди.

---

## 27. Навчальна карта: Core → Junior → Middle → Senior

### Core — основа

Ти повинен розуміти:

- Що таке CSS Modules.
- Чим локальні класи відрізняються від глобальних.
- Навіщо потрібен суфікс `.module.css`.
- Як імпортувати стилі.
- Як використовувати `styles.className`.
- Як застосовувати декілька класів.
- Як працюють псевдокласи та медіазапити.

### Junior — практичне використання

Ти повинен уміти:

- Створювати компонент зі своїм CSS Module.
- Використовувати умовні класи.
- Організовувати локальні стилі.
- Створювати адаптивні компоненти.
- Відокремлювати глобальні стилі від компонентних.
- Використовувати CSS Modules у React.
- Працювати з CSS Modules у Next.js.

### Middle — архітектура

Ти повинен уміти:

- Проєктувати структуру стилів для великого застосунку.
- Визначати межі між глобальними та локальними стилями.
- Повторно використовувати дизайн-токени.
- Організовувати варіанти компонентів.
- Діагностувати конфлікти каскаду.
- Налаштовувати перевірку класів у TypeScript.
- Уникати надмірного дублювання та абстракцій.

### Senior — системний підхід

Ти повинен розуміти:

- Як CSS Modules інтегрується в систему збірки.
- Як працює локалізація класів.
- Які обмеження має ізоляція CSS.
- Як організувати дизайн-систему.
- Як оцінювати підтримуваність архітектури.
- Як обирати між CSS Modules, Sass, CSS-in-JS та іншими підходами.
- Як перевіряти доступність і продуктивність стилів.

---

## 28. Мінішпаргалка CSS Modules

### Імпорт

    import styles from "./Component.module.css";

### Один клас

    <div className={styles.container}>Контент</div>

### Кілька класів

    <div className={`${styles.card} ${styles.active}`}>Картка</div>

### Кілька класів через масив

    <div className={[styles.card, styles.active].join(" ")}>Картка</div>

### Умовний клас

    <div className={isActive ? styles.active : styles.inactive}>Статус</div>

### Клас із дефісом

    <h2 className={styles["card-title"]}>Заголовок</h2>

### Умовні класи з `clsx`

    import clsx from "clsx";

    <button className={clsx(styles.button, isPrimary && styles.primary)}>
        Натисни
    </button>

### Глобальні базові стилі

    /* globals.css */
    body {
        margin: 0;
        font-family: Arial, sans-serif;
    }

### CSS custom properties

    .card {
        padding: var(--space-md);
        color: var(--color-text);
    }

### Медіазапит

    .container {
        padding: 16px;
    }

    @media (min-width: 768px) {
        .container {
            padding: 24px;
        }
    }

### Фокус клавіатури

    .button:focus-visible {
        outline: 3px solid orange;
        outline-offset: 3px;
    }

### Композиція класів

    .base {
        padding: 10px 16px;
    }

    .primary {
        composes: base;
        background-color: royalblue;
        color: white;
    }

Пам'ятай: `composes` працює лише в середовищах, які підтримують відповідну функціональність CSS Modules.

---

## 29. Контрольний список

Перед тим як вважати тему засвоєною, перевір себе.

- [ ] Я можу пояснити, що таке CSS Modules.
- [ ] Я розумію різницю між глобальними та локальними класами.
- [ ] Я знаю, навіщо використовується `.module.css`.
- [ ] Я вмію імпортувати CSS Module в React.
- [ ] Я можу застосувати один або декілька класів.
- [ ] Я вмію створювати умовні класи.
- [ ] Я розумію, як працюють псевдокласи та медіазапити.
- [ ] Я вмію поєднувати глобальні стилі з локальними.
- [ ] Я можу пояснити призначення CSS custom properties.
- [ ] Я знаю, що CSS Modules не скасовує каскад і специфічність.
- [ ] Я вмію знайти помилку в назві класу або шляху імпорту.
- [ ] Я можу створити невеликий React-компонент із власним модульним файлом стилів.
- [ ] Я розумію, як CSS Modules використовується в Next.js.
- [ ] Я можу аргументовано вибрати між CSS Modules та іншими підходами до стилізації.

---

## 30. Головне, що потрібно запам'ятати

1. **CSS Modules локалізує назви класів.** Це допомагає уникати конфліктів між компонентами.
2. **`.module.css` — поширений спосіб позначити модульний CSS-файл.** Інструмент збірки повинен підтримувати CSS Modules.
3. **У React класи беруться з імпортованого об'єкта.** Наприклад, `styles.button`.
4. **CSS Modules не замінює CSS.** Flexbox, Grid, медіазапити, псевдокласи та custom properties залишаються доступними.
5. **Глобальні та локальні стилі можуть співіснувати.** Базові стилі проєкту не потрібно дублювати в кожному компоненті.
6. **Умовні класи залежать від JavaScript.** CSS Modules сам не визначає, коли потрібно застосувати певний клас.
7. **Локальність класів не скасовує каскад і специфічність.** Розуміння CSS залишається обов'язковим.
8. **CSS Modules особливо корисний у компонентних архітектурах.** Наприклад, у React та Next.js.
9. **Не потрібно ускладнювати простий проєкт без потреби.** Вибирай архітектуру відповідно до реального завдання.
10. **Найкращий спосіб засвоїти CSS Modules — створити декілька компонентів** з однаковими назвами локальних класів, умовними модифікаторами та адаптивними стилями.

> **Коротко:** CSS Modules допомагає організувати стилі за компонентами, зменшує конфлікти назв класів і робить CSS простішим для підтримки в React та Next.js проєктах.