# 01. Design Tokens

Design Tokens (токени дизайну) — це іменовані значення, які зберігають основні візуальні параметри інтерфейсу та дозволяють повторно використовувати їх у різних компонентах і сторінках.

Design tokens використовуються для зберігання:

    colors
    spacing
    typography
    border radius
    shadows
    sizes
    borders
    opacity
    transitions
    breakpoints

Замість того щоб багаторазово записувати однакові значення в CSS, можна створити токен із зрозумілим ім'ям і використовувати його в усьому інтерфейсі.

Наприклад, замість:

    .button {
        background-color: #2563eb;
    }

    .link {
        color: #2563eb;
    }

    .badge {
        border-color: #2563eb;
    }

Можна створити спільний токен:

    :root {
        --color-primary: #2563eb;
    }

І використовувати його повторно:

    .button {
        background-color: var(--color-primary);
    }

    .link {
        color: var(--color-primary);
    }

    .badge {
        border-color: var(--color-primary);
    }

Якщо основний колір потрібно змінити, достатньо змінити значення токена.

Design tokens є одним із фундаментів Design System.

---

## Ключові поняття

✔ design system  
✔ design token  
✔ token name  
✔ token value  
✔ token reference  
✔ token reuse  
✔ design consistency  
✔ single source of truth  
✔ design decisions  
✔ design variables  
✔ CSS custom properties  
✔ primitive tokens  
✔ global tokens  
✔ semantic tokens  
✔ component tokens  
✔ token hierarchy  
✔ token naming conventions  
✔ token architecture  
✔ token mapping  
✔ design-to-code  
✔ design handoff  
✔ theming  
✔ light theme  
✔ dark theme  
✔ maintainability  
✔ scalability  
✔ centralized styling  
✔ hardcoded values  
✔ token documentation  
✔ token governance  

---

## Що потрібно пам'ятати

• Design token — це іменоване значення, яке представляє певне дизайнерське рішення.

• Токени допомагають зберігати кольори, відступи, типографіку, тіні, радіуси та інші параметри інтерфейсу.

• Токен має зрозуміле ім'я та конкретне значення.

• Один токен може використовуватися в багатьох компонентах.

• Зміна токена дозволяє централізовано оновити зовнішній вигляд інтерфейсу.

• CSS custom properties — один із найпростіших способів реалізувати design tokens у CSS.

• Design tokens і CSS custom properties не є повними синонімами. Design tokens — це концепція організації дизайнерських значень, а CSS custom properties — механізм CSS для створення власних властивостей.

• Не кожне CSS-значення обов'язково потрібно перетворювати на токен.

• Токени особливо корисні для значень, які повторюються або повинні залишатися узгодженими в усьому проєкті.

• Зрозумілі назви токенів допомагають розробникам підтримувати та масштабувати інтерфейс.

• Primitive tokens зберігають базові значення, semantic tokens описують призначення значень, а component tokens можуть налаштовувати конкретні компоненти.

• Design tokens полегшують реалізацію тем, зокрема light theme і dark theme.

• Design tokens не замінюють компоненти, CSS-архітектуру, правила доступності або дизайн-систему загалом.

---

# Що таке Design System

Design System — це узгоджена система принципів, правил, компонентів, токенів і документації, яка допомагає створювати послідовні інтерфейси.

Типова Design System може містити:

    Design principles
        ↓
    Design tokens
        ↓
    Components
        ↓
    Patterns
        ↓
    Documentation
        ↓
    Guidelines

Наприклад, Design System може визначати:

    Primary color: #2563eb
    Page spacing: 24px
    Border radius: 8px
    Font family: Inter
    Button height: 44px

Ці значення використовуються під час проєктування та розробки інтерфейсу.

Важливо розуміти:

    Design tokens → зберігають значення
    Components → використовують значення
    Design System → об'єднує правила, токени, компоненти та документацію

---

# Hardcoded Values

Hardcoded value — це значення, яке безпосередньо записане в коді замість використання спільного токена.

Наприклад:

    .button {
        background-color: #2563eb;
        color: #ffffff;
        border-radius: 8px;
        padding: 12px 24px;
    }

Тут усі значення записані безпосередньо в компоненті.

Для невеликого навчального прикладу це допустимо.

Але якщо такі самі значення повторюються в десятках компонентів, їх складніше підтримувати.

Наприклад:

    .button {
        border-radius: 8px;
    }

    .card {
        border-radius: 8px;
    }

    .input {
        border-radius: 8px;
    }

Якщо дизайн-система переходить на радіус `12px`, доведеться шукати та змінювати кожне відповідне значення.

Рішення — створити токен:

    :root {
        --radius-medium: 8px;
    }

    .button {
        border-radius: var(--radius-medium);
    }

    .card {
        border-radius: var(--radius-medium);
    }

    .input {
        border-radius: var(--radius-medium);
    }

Тепер значення можна змінити централізовано.

### Чи потрібно уникати всіх hardcoded values?

Ні.

Не кожне значення повинно бути токеном.

Наприклад, унікальне значення для одноразової декоративної деталі може не потребувати окремого токена.

Токен доцільно створювати, коли значення:

    повторюється;
    має спільне семантичне призначення;
    повинно бути узгодженим;
    може змінюватися централізовано;
    використовується в багатьох компонентах;
    має підтримувати теми або варіанти дизайну.

---

# Single Source of Truth

Single Source of Truth — єдине авторитетне джерело певного значення.

У контексті design tokens це означає, що спільне дизайнерське рішення зберігається централізовано, а компоненти посилаються на нього.

Наприклад:

    :root {
        --color-primary: #2563eb;
    }

    .button {
        background-color: var(--color-primary);
    }

    .link {
        color: var(--color-primary);
    }

    .icon {
        color: var(--color-primary);
    }

Токен `--color-primary` є спільним джерелом значення основного кольору в цьому CSS-файлі.

Якщо потрібно змінити основний колір:

    :root {
        --color-primary: #7c3aed;
    }

Усі компоненти, які використовують цей токен, отримають нове значення.

Важливо:

    Один токен
        ↓
    Багато посилань
        ↓
    Узгоджений інтерфейс

Single Source of Truth не означає, що весь проєкт обов'язково має зберігатися в одному файлі. У великих системах токени можуть бути організовані в декількох файлах або інструментах, але джерело кожного спільного значення має бути зрозумілим.

---

# Token Name

Token name — назва токена, за якою розробник розуміє його призначення.

Наприклад:

    --color-primary
    --color-text
    --spacing-md
    --radius-lg
    --shadow-card

Назви мають бути:

    зрозумілими;
    послідовними;
    передбачуваними;
    достатньо короткими;
    придатними для повторного використання.

Погані приклади:

    --blue
    --thing
    --value1
    --new-color
    --margin-special

Такі назви не завжди пояснюють призначення значення.

Кращі приклади:

    --color-primary
    --color-text-muted
    --spacing-section
    --radius-card
    --shadow-dialog

Проте назва повинна відповідати реальній ролі токена.

Наприклад, `--color-blue` описує колір за зовнішнім виглядом, а `--color-primary` — за призначенням у дизайні.

Обидва підходи можуть бути корисними на різних рівнях системи.

---

# Token Value

Token value — фактичне значення, яке зберігається в токені.

Наприклад:

    :root {
        --color-primary: #2563eb;
        --spacing-md: 16px;
        --radius-md: 8px;
        --font-size-base: 16px;
    }

Тут:

    --color-primary  → #2563eb
    --spacing-md     → 16px
    --radius-md      → 8px
    --font-size-base → 16px

Значення може бути різного типу:

    Color
    Length
    Number
    Font family
    Shadow
    Time
    Composite value

Приклади:

    :root {
        --color-primary: #2563eb;
        --spacing-md: 16px;
        --opacity-muted: 0.65;
        --font-family-base: Arial, sans-serif;
        --transition-fast: 150ms;
        --shadow-card: 0 4px 12px rgb(0 0 0 / 10%);
    }

Важливо, щоб значення відповідало властивості, в якій воно використовується.

Наприклад:

    .card {
        padding: var(--spacing-md);
    }

Тут `--spacing-md` має містити значення, придатне для CSS-властивості `padding`.

---

# CSS Custom Properties

CSS custom properties — власні CSS-властивості, які зазвичай використовуються для зберігання повторно використовуваних значень.

Їхні назви починаються з двох дефісів:

    --custom-property

Наприклад:

    :root {
        --color-primary: #2563eb;
        --spacing-md: 16px;
    }

Для використання застосовується функція `var()`:

    .button {
        background-color: var(--color-primary);
        padding: var(--spacing-md);
    }

Тут:

    --color-primary → custom property
    --spacing-md    → custom property
    var()           → отримання значення властивості

### Що таке :root

`:root` — CSS-псевдоклас, який відповідає кореневому елементу документа.

У звичайному HTML-документі ним є елемент `html`.

Токени часто оголошують у `:root`, щоб вони були доступні в різних частинах документа.

    :root {
        --color-primary: #2563eb;
        --color-text: #1f2937;
        --spacing-md: 16px;
    }

Використання:

    body {
        color: var(--color-text);
    }

    .button {
        background-color: var(--color-primary);
        padding: var(--spacing-md);
    }

### Властивість var()

Синтаксис:

    var(--token-name)

Приклад:

    .card {
        background-color: var(--color-surface);
    }

Якщо токен не визначений, а fallback не вказаний, декларація може стати невалідною для цієї властивості.

Можна задати резервне значення:

    .card {
        background-color: var(--color-surface, #ffffff);
    }

Тут:

    --color-surface → основне значення
    #ffffff         → fallback

Fallback корисний, але він не повинен приховувати постійні помилки в організації токенів.

---

# Primitive Tokens

Primitive tokens — базові токени, які містять конкретні значення без прив'язки до вузького контексту використання.

Їх також називають базовими або сирими токенами.

Наприклад:

    :root {
        --blue-500: #3b82f6;
        --blue-700: #1d4ed8;
        --gray-100: #f3f4f6;
        --gray-900: #111827;

        --space-1: 4px;
        --space-2: 8px;
        --space-3: 12px;
        --space-4: 16px;
    }

Тут токени описують палітру кольорів і шкалу відступів.

Назва `--blue-500` говорить про місце кольору в палітрі.

Назва `--space-4` говорить про місце значення в шкалі відступів.

Але такі назви не пояснюють, для чого саме значення використовується.

Наприклад, `--blue-500` може бути кольором кнопки, посилання або декоративного елемента.

Primitive tokens корисні для:

    зберігання базової палітри;
    створення шкали відступів;
    організації типографіки;
    побудови semantic tokens;
    централізованого керування базовими значеннями.

---

# Global Tokens

Global tokens — загальні токени, доступні в широкому контексті дизайн-системи.

У різних командах цей термін може означати всі базові токени або всі глобально доступні токени.

Наприклад:

    :root {
        --color-primary: #2563eb;
        --color-secondary: #7c3aed;

        --spacing-sm: 8px;
        --spacing-md: 16px;
        --spacing-lg: 24px;

        --radius-sm: 4px;
        --radius-md: 8px;
        --radius-lg: 12px;
    }

Такі значення можуть використовуватися в різних компонентах.

Приклад:

    .button {
        background-color: var(--color-primary);
        padding: var(--spacing-md);
        border-radius: var(--radius-md);
    }

    .card {
        padding: var(--spacing-lg);
        border-radius: var(--radius-lg);
    }

Важливо пам'ятати, що термін `global tokens` не має одного універсального визначення для всіх дизайн-систем.

Під час вивчення конкретної системи необхідно перевіряти її документацію та домовленості щодо назв.

---

# Semantic Tokens

Semantic tokens — токени, назва яких описує призначення або роль значення в інтерфейсі.

Наприклад:

    --color-primary
    --color-text
    --color-text-muted
    --color-surface
    --color-border
    --color-success
    --color-danger

На відміну від primitive tokens, semantic tokens пояснюють, де або для чого використовується значення.

Наприклад:

    :root {
        --blue-600: #2563eb;
        --gray-900: #111827;
        --gray-100: #f3f4f6;

        --color-primary: var(--blue-600);
        --color-text: var(--gray-900);
        --color-surface: #ffffff;
        --color-border: var(--gray-100);
    }

Використання:

    .button {
        background-color: var(--color-primary);
    }

    .card {
        background-color: var(--color-surface);
        border: 1px solid var(--color-border);
    }

    body {
        color: var(--color-text);
    }

Перевага semantic tokens полягає в тому, що компонент залежить від призначення кольору, а не від конкретного відтінку.

Наприклад:

    --color-primary: var(--blue-600);

Пізніше можна змінити прив'язку:

    --color-primary: var(--blue-700);

Компоненти, які використовують `--color-primary`, не потрібно переписувати.

### Semantic tokens для станів

    :root {
        --color-success: #15803d;
        --color-warning: #a16207;
        --color-danger: #b91c1c;
        --color-info: #1d4ed8;
    }

Ці токени описують значення за їхнім призначенням.

Їх можна використовувати в повідомленнях, формах, badges та інших компонентах.

Важливо: кольори станів повинні мати достатній контраст і не передавати інформацію виключно кольором.

---

# Primitive Tokens vs Semantic Tokens

Це одна з найважливіших відмінностей у Design Systems.

Primitive tokens:

    --blue-600
    --gray-900
    --space-4
    --radius-2

Semantic tokens:

    --color-primary
    --color-text
    --spacing-content
    --radius-card

Порівняння:

| Primitive token | Semantic token |
|---|---|
| `--blue-600` | `--color-primary` |
| `--gray-900` | `--color-text` |
| `--gray-100` | `--color-border` |
| `--space-4` | `--spacing-content` |
| `--radius-2` | `--radius-card` |

Це лише приклад можливої структури, а не універсальна схема назв.

Semantic token може посилатися на primitive token:

    :root {
        --blue-600: #2563eb;
        --gray-900: #111827;
        --space-4: 16px;

        --color-primary: var(--blue-600);
        --color-text: var(--gray-900);
        --spacing-content: var(--space-4);
    }

Логіка:

    Primitive token
          ↓
    Semantic token
          ↓
    Component
          ↓
    UI

Наприклад:

    --blue-600
          ↓
    --color-primary
          ↓
    .button
          ↓
    Кнопка основної дії

Не всі дизайн-системи потребують складної багаторівневої структури.

Для маленького проєкту достатньо кількох зрозумілих токенів.

---

# Component Tokens

Component tokens — токени, які налаштовують конкретний компонент або групу компонентів.

Наприклад:

    --button-height
    --button-padding-x
    --button-radius
    --card-padding
    --input-border-color
    --dialog-shadow

Приклад:

    :root {
        --color-primary: #2563eb;
        --radius-md: 8px;
        --spacing-md: 16px;

        --button-height: 44px;
        --button-padding-x: 20px;
        --button-radius: var(--radius-md);
    }

    .button {
        min-height: var(--button-height);
        padding-inline: var(--button-padding-x);
        border-radius: var(--button-radius);
        background-color: var(--color-primary);
    }

Тут:

    --color-primary       → загальне призначення
    --radius-md           → базовий радіус
    --spacing-md          → базовий відступ
    --button-height       → параметр кнопки
    --button-padding-x    → горизонтальний відступ кнопки
    --button-radius       → радіус кнопки

Component tokens дозволяють налаштовувати компоненти без необхідності змінювати всі загальні токени.

Наприклад, якщо кнопки мають стати вищими, можна змінити:

    --button-height: 48px;

Це не обов'язково має впливати на висоту полів введення або карток.

### Коли потрібні component tokens

Вони особливо корисні, коли:

    компонент має власні параметри;
    потрібні різні варіанти компонента;
    потрібно централізовано налаштовувати його вигляд;
    загальні токени не забезпечують достатньої гнучкості.

Не варто створювати окремий токен для кожної CSS-властивості без реальної потреби.

---

# Token Hierarchy

Token hierarchy — ієрархія токенів, яка визначає зв'язки між базовими значеннями, семантичними ролями та компонентами.

Один із поширених підходів:

    Primitive tokens
          ↓
    Semantic tokens
          ↓
    Component tokens
          ↓
    UI components

Наприклад:

    :root {
        /* Primitive */
        --blue-600: #2563eb;
        --space-4: 16px;
        --radius-2: 8px;

        /* Semantic */
        --color-primary: var(--blue-600);
        --spacing-content: var(--space-4);

        /* Component */
        --button-background: var(--color-primary);
        --button-padding: var(--spacing-content);
        --button-radius: var(--radius-2);
    }

    .button {
        background-color: var(--button-background);
        padding: var(--button-padding);
        border-radius: var(--button-radius);
    }

У цій структурі:

    --blue-600
        ↓
    --color-primary
        ↓
    --button-background
        ↓
    .button

Перевага полягає в тому, що зміни можна виконувати на потрібному рівні.

Наприклад:

    Зміна палітри
        → змінює primitive token

    Зміна ролі кольору
        → змінює semantic token

    Зміна вигляду кнопки
        → змінює component token

Така ієрархія є корисним шаблоном, але не обов'язковою вимогою для кожного проєкту.

---

# Token Reference

Token reference — посилання одного токена на інший токен.

У CSS для цього часто використовується `var()`.

Наприклад:

    :root {
        --blue-600: #2563eb;
        --color-primary: var(--blue-600);
        --button-background: var(--color-primary);
    }

Тут:

    --color-primary → посилається на --blue-600
    --button-background → посилається на --color-primary

Використання:

    .button {
        background-color: var(--button-background);
    }

Перевага полягає в тому, що значення не потрібно дублювати.

Якщо змінити `--blue-600`, зміни можуть поширитися на всі токени, які прямо або опосередковано посилаються на нього.

### Навіщо потрібні посилання

Вони дозволяють:

    уникати дублювання;
    будувати ієрархію токенів;
    відокремлювати значення від призначення;
    централізовано змінювати дизайн;
    підтримувати теми;
    спрощувати обслуговування проєкту.

Важливо не створювати зайво складні ланцюжки залежностей, у яких важко зрозуміти походження значення.

---

# Design Tokens для кольорів

Кольори — один із найпоширеніших типів токенів.

Наприклад:

    :root {
        /* Primitive tokens */
        --blue-600: #2563eb;
        --gray-900: #111827;
        --gray-500: #6b7280;
        --gray-200: #e5e7eb;
        --white: #ffffff;

        /* Semantic tokens */
        --color-primary: var(--blue-600);
        --color-text: var(--gray-900);
        --color-text-muted: var(--gray-500);
        --color-border: var(--gray-200);
        --color-surface: var(--white);
    }

Використання:

    body {
        color: var(--color-text);
        background-color: var(--color-surface);
    }

    .card {
        border: 1px solid var(--color-border);
        background-color: var(--color-surface);
    }

    .muted-text {
        color: var(--color-text-muted);
    }

Переваги:

    єдина палітра;
    узгоджені кольори;
    простіше оновлення теми;
    зрозуміліша роль кожного кольору;
    менше випадкових відмінностей між компонентами.

Детальніше кольорові токени розглядаються в темі:

    03-color-tokens

---

# Design Tokens для spacing

Spacing tokens — токени, які зберігають стандартні відстані між елементами.

Наприклад:

    :root {
        --space-1: 4px;
        --space-2: 8px;
        --space-3: 12px;
        --space-4: 16px;
        --space-5: 24px;
        --space-6: 32px;
    }

Використання:

    .card {
        padding: var(--space-5);
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
    }

    .section {
        margin-block: var(--space-6);
    }

Замість довільних значень:

    13px
    17px
    23px
    31px

можна використовувати узгоджену шкалу відступів.

Це допомагає зробити інтерфейс візуально послідовним.

Детальніше:

    02-spacing-scale

---

# Design Tokens для типографіки

Typography tokens — токени, які визначають параметри тексту.

Наприклад:

    :root {
        --font-family-base: Arial, sans-serif;

        --font-size-sm: 14px;
        --font-size-md: 16px;
        --font-size-lg: 20px;
        --font-size-xl: 28px;

        --line-height-tight: 1.2;
        --line-height-normal: 1.5;

        --font-weight-regular: 400;
        --font-weight-semibold: 600;
        --font-weight-bold: 700;
    }

Використання:

    body {
        font-family: var(--font-family-base);
        font-size: var(--font-size-md);
        line-height: var(--line-height-normal);
    }

    h1 {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        line-height: var(--line-height-tight);
    }

    .caption {
        font-size: var(--font-size-sm);
    }

Typography tokens дозволяють узгодити:

    font family;
    font size;
    font weight;
    line height;
    letter spacing.

Детальніше:

    04-typography-tokens

---

# Design Tokens для Border Radius

Border radius tokens — токени, які визначають заокруглення кутів.

Наприклад:

    :root {
        --radius-sm: 4px;
        --radius-md: 8px;
        --radius-lg: 12px;
        --radius-xl: 20px;
        --radius-full: 9999px;
    }

Використання:

    .input {
        border-radius: var(--radius-sm);
    }

    .card {
        border-radius: var(--radius-lg);
    }

    .button {
        border-radius: var(--radius-md);
    }

    .avatar {
        border-radius: var(--radius-full);
    }

Спільна шкала радіусів допомагає уникати випадкових відмінностей між компонентами.

Детальніше:

    05-border-radius

---

# Design Tokens для Shadows

Shadow tokens — токени, які зберігають значення тіней.

Наприклад:

    :root {
        --shadow-sm: 0 1px 2px rgb(0 0 0 / 8%);
        --shadow-md: 0 4px 12px rgb(0 0 0 / 10%);
        --shadow-lg: 0 12px 24px rgb(0 0 0 / 12%);
    }

Використання:

    .card {
        box-shadow: var(--shadow-sm);
    }

    .dropdown {
        box-shadow: var(--shadow-md);
    }

    .dialog {
        box-shadow: var(--shadow-lg);
    }

Токени тіней допомагають створювати узгоджену візуальну ієрархію.

Детальніше:

    06-shadows

---

# Design Tokens для тем

Theming — зміна набору візуальних значень інтерфейсу відповідно до теми.

Найпоширеніший приклад:

    Light theme
    Dark theme

Semantic tokens роблять реалізацію тем простішою.

Наприклад:

    :root {
        color-scheme: light;

        --color-text: #111827;
        --color-surface: #ffffff;
        --color-border: #e5e7eb;
    }

    [data-theme="dark"] {
        color-scheme: dark;

        --color-text: #f9fafb;
        --color-surface: #111827;
        --color-border: #374151;
    }

Компоненти використовують ті самі токени:

    body {
        color: var(--color-text);
        background-color: var(--color-surface);
    }

    .card {
        border: 1px solid var(--color-border);
        background-color: var(--color-surface);
    }

Перемикання теми може виконуватися через атрибут:

    <html data-theme="dark">

Тут приклад показує лише CSS-частину. Саме перемикання атрибута має реалізовуватися окремо, наприклад за допомогою JavaScript або логіки застосунку.

Перевага:

    Компоненти
        ↓
    Semantic tokens
        ↓
    Активна тема
        ↓
    Відповідні значення

Компонентам не потрібно окремо описувати всі кольори для кожної теми.

Важливо: dark theme — це не просто інверсія всіх кольорів. Значення мають забезпечувати читабельність, достатній контраст і зрозумілу візуальну ієрархію.

---

# Design Tokens та Responsive Design

Design tokens можуть використовуватися для адаптації інтерфейсу до різних розмірів екрана.

Наприклад:

    :root {
        --page-padding: 16px;
        --section-gap: 32px;
    }

    @media (min-width: 768px) {
        :root {
            --page-padding: 24px;
            --section-gap: 48px;
        }
    }

    @media (min-width: 1200px) {
        :root {
            --page-padding: 32px;
            --section-gap: 64px;
        }
    }

Використання:

    .container {
        padding-inline: var(--page-padding);
    }

    .section {
        margin-block: var(--section-gap);
    }

Тепер значення змінюються залежно від ширини viewport.

Цей підхід корисний, коли адаптивні значення є частиною загальної системи дизайну.

Але не кожен breakpoint або responsive value обов'язково потрібно оформлювати як токен.

---

# Fluid Design Tokens

Fluid values — значення, які плавно змінюються залежно від розміру viewport або доступного простору.

Наприклад:

    :root {
        --page-padding: clamp(16px, 4vw, 48px);
        --heading-size: clamp(28px, 4vw, 48px);
    }

Використання:

    .container {
        padding-inline: var(--page-padding);
    }

    h1 {
        font-size: var(--heading-size);
    }

Функція `clamp()` приймає три параметри:

    clamp(minimum, preferred, maximum)

У прикладі:

    16px → мінімальне значення
    4vw  → бажане значення
    48px → максимальне значення

Fluid tokens можуть допомагати підтримувати адаптивний дизайн без надмірної кількості media queries.

Важливо: fluid value не завжди доречний. Для деяких параметрів краще використовувати фіксовану шкалу або змінювати значення на конкретних breakpoint.

---

# Design Tokens у Figma та CSS

У дизайн-процесі токени можуть використовуватися як у дизайн-інструментах, так і в коді.

Наприклад, у Figma можна організувати змінні:

    color/primary
    color/text
    spacing/16
    radius/card

У CSS можна створити відповідні custom properties:

    :root {
        --color-primary: #2563eb;
        --color-text: #111827;
        --spacing-16: 16px;
        --radius-card: 12px;
    }

Важливо, щоб дизайн і код використовували узгоджені значення та зрозумілі правила назв.

Проте назви, структура та механізми синхронізації можуть відрізнятися залежно від інструментів.

Design tokens допомагають організувати передачу дизайнерських рішень від дизайну до розробки.

Цей процес називають:

    Design-to-code
    Design handoff

У невеликому навчальному проєкті можна почати зі звичайного CSS-файлу.

Наприклад:

    styles/
        tokens.css
        global.css

У `tokens.css` зберігаються токени:

    :root {
        --color-primary: #2563eb;
        --color-text: #111827;
        --spacing-md: 16px;
        --radius-md: 8px;
    }

У `global.css` — базові стилі:

    body {
        color: var(--color-text);
    }

Це проста стартова структура, яку згодом можна розширити.

---

# Організація файлів Design Tokens

У невеликому проєкті можна почати з одного файлу:

    styles/
        tokens.css

Приклад:

    /* styles/tokens.css */

    :root {
        --color-primary: #2563eb;
        --color-text: #111827;
        --color-surface: #ffffff;

        --spacing-sm: 8px;
        --spacing-md: 16px;
        --spacing-lg: 24px;

        --radius-sm: 4px;
        --radius-md: 8px;

        --shadow-card: 0 4px 12px rgb(0 0 0 / 10%);
    }

Коли токенів стає більше, їх можна розділити на файли:

    styles/
        tokens/
            colors.css
            spacing.css
            typography.css
            radius.css
            shadows.css
            index.css

Файл `index.css` може об'єднувати інші файли:

    @import "./colors.css";
    @import "./spacing.css";
    @import "./typography.css";
    @import "./radius.css";
    @import "./shadows.css";

Це лише один із можливих варіантів організації.

Для невеликого сайту окремі файли можуть бути зайвими. Для великого проєкту поділ допомагає підтримувати структуру.

Важливо: якщо файли підключаються окремо, необхідно забезпечити їхнє завантаження до використання відповідних токенів.

---

# Naming Conventions

Naming conventions — правила іменування токенів.

Послідовні назви допомагають розробникам швидше знаходити потрібні значення.

Наприклад, можна використовувати такі групи:

    --color-primary
    --color-secondary
    --color-text
    --color-border

    --spacing-xs
    --spacing-sm
    --spacing-md
    --spacing-lg

    --radius-sm
    --radius-md
    --radius-lg

    --shadow-sm
    --shadow-md
    --shadow-lg

Переваги:

    передбачувані назви;
    легший пошук;
    менше дублювання;
    простіша документація;
    зрозуміліша структура.

Не варто без потреби змішувати різні стилі:

    --color-primary
    --primaryColor
    --spacing_md
    --radius-Large

Краще обрати одну домовленість і послідовно її використовувати.

Детальніше:

    08-naming-conventions

---

# Design Tokens та Consistency

Consistency — візуальна й функціональна послідовність інтерфейсу.

Design tokens допомагають підтримувати consistency у різних частинах застосунку.

Наприклад, без спільної шкали відступів можна отримати:

    Header padding: 17px
    Card padding: 23px
    Form padding: 19px
    Modal padding: 27px

Ці значення не обов'язково неправильні, але можуть створювати непослідовний вигляд.

Якщо система визначає стандартні значення:

    --spacing-sm: 8px
    --spacing-md: 16px
    --spacing-lg: 24px
    --spacing-xl: 32px

компоненти можуть використовувати спільну шкалу.

Наприклад:

    .header {
        padding: var(--spacing-md);
    }

    .card {
        padding: var(--spacing-lg);
    }

    .modal {
        padding: var(--spacing-xl);
    }

Важливо розуміти, що consistency не означає, що всі компоненти повинні мати однакові відступи.

Йдеться про послідовне використання зрозумілих правил.

---

# Design Tokens та Maintainability

Maintainability — здатність коду залишатися зрозумілим і придатним для змін.

Design tokens полегшують підтримку інтерфейсу, оскільки зменшують дублювання дизайнерських значень.

Наприклад, без токенів:

    .button {
        background-color: #2563eb;
    }

    .link {
        color: #2563eb;
    }

    .badge {
        border-color: #2563eb;
    }

З токеном:

    :root {
        --color-primary: #2563eb;
    }

    .button {
        background-color: var(--color-primary);
    }

    .link {
        color: var(--color-primary);
    }

    .badge {
        border-color: var(--color-primary);
    }

У другому випадку призначення спільного кольору видно безпосередньо з назви токена.

Проте надмірна кількість токенів також може ускладнити підтримку.

Тому важливо знаходити баланс між повторним використанням і зайвою абстракцією.

---

# Коли створювати Design Token

Варто розглянути створення токена, якщо:

    одне значення повторюється в кількох місцях;
    значення є частиною дизайн-правила;
    значення потрібно централізовано змінювати;
    значення використовується в кількох компонентах;
    значення повинно підтримувати різні теми;
    команда має дотримуватися єдиної шкали;
    значення потрібно документувати.

Наприклад:

    #2563eb

Якщо цей колір використовується в багатьох компонентах як основний колір дії, доцільно створити:

    --color-primary: #2563eb;

Інший приклад:

    border-radius: 8px;

Якщо багато компонентів мають однакове стандартне заокруглення, можна створити:

    --radius-md: 8px;

Але якщо унікальна декоративна деталь має власний радіус, який ніде більше не повторюється, окремий токен може бути непотрібним.

Головне правило:

    Створюй токен для значущого дизайнерського рішення,
    а не просто для кожного числа в CSS.

---

# Коли не потрібно створювати окремий токен

Не завжди потрібно створювати токен для:

    одноразового значення;
    тимчасового експерименту;
    локального декоративного параметра;
    значення, яке не має повторного використання;
    складної абстракції без практичної користі.

Наприклад:

    .decorative-line {
        width: 37px;
    }

Якщо це унікальна декоративна лінія і значення не є частиною системи, окремий токен може не мати сенсу.

Але якщо цей розмір є стандартом для багатьох компонентів, токен може бути корисним.

Потрібно враховувати:

    частоту повторення;
    значення для дизайну;
    можливість централізованих змін;
    складність підтримки;
    потреби масштабування.

---

# Типові помилки

## 1. Дублювати одне значення без потреби

❌ Приклад:

    .button {
        background-color: #2563eb;
    }

    .link {
        color: #2563eb;
    }

    .badge {
        border-color: #2563eb;
    }

Якщо це один і той самий дизайнерський колір, краще створити спільний токен.

    :root {
        --color-primary: #2563eb;
    }

---

## 2. Використовувати незрозумілі назви

❌ Приклад:

    :root {
        --blue1: #2563eb;
        --gray2: #111827;
        --value3: 16px;
    }

Краще:

    :root {
        --color-primary: #2563eb;
        --color-text: #111827;
        --spacing-md: 16px;
    }

Назва повинна допомагати зрозуміти призначення значення.

---

## 3. Змішувати primitive та semantic tokens

❌ Приклад:

    .button {
        background-color: var(--blue-600);
    }

Це не завжди помилка, але компонент напряму залежить від конкретного кольору палітри.

Якщо колір є основним кольором дії, краще:

    .button {
        background-color: var(--color-primary);
    }

Тепер компонент залежить від призначення кольору, а не від його конкретного відтінку.

---

## 4. Створювати занадто багато токенів

❌ Приклад:

    --button-padding-left: 19px;
    --button-padding-right: 19px;
    --button-padding-top: 11px;
    --button-padding-bottom: 11px;

Якщо компонентам потрібен однаковий горизонтальний і вертикальний відступ, можна використати простішу структуру:

    --button-padding-x: 20px;
    --button-padding-y: 12px;

    .button {
        padding: var(--button-padding-y) var(--button-padding-x);
    }

Однак окремі токени можуть бути виправданими, якщо різні сторони справді потребують незалежного налаштування.

---

## 5. Створювати токени без системи

❌ Приклад:

    --space-small: 8px;
    --spacing-md: 16px;
    --gap-large: 24px;
    --space-xl: 32px;

Назви змішують різні схеми.

Краще обрати одну послідовну конвенцію:

    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;

---

## 6. Використовувати токен не за призначенням

❌ Приклад:

    :root {
        --color-primary: #2563eb;
    }

    .card {
        padding: var(--color-primary);
    }

Тут токен кольору використовується як відступ.

Оскільки значення `#2563eb` не є допустимим значенням для `padding`, декларація буде невалідною.

Потрібно використовувати токен відповідного типу:

    :root {
        --spacing-md: 16px;
    }

    .card {
        padding: var(--spacing-md);
    }

---

## 7. Не перевіряти контраст

Токенізований колір не обов'язково є доступним.

Наприклад, світлий текст на світлому фоні може залишатися нечитабельним, навіть якщо обидва кольори оформлені як токени.

Необхідно перевіряти:

    контраст тексту;
    видимість меж компонентів;
    стани focus;
    стани disabled;
    відображення в різних темах.

---

## 8. Не враховувати теми

Якщо всі компоненти використовують безпосередньо primitive tokens, реалізація dark theme може вимагати змін у багатьох місцях.

Краще, коли компоненти використовують semantic tokens, значення яких можуть змінюватися залежно від теми.

---

## 9. Створювати складні ланцюжки посилань

Надмірна кількість рівнів може ускладнити пошук джерела значення.

Краще створювати стільки рівнів, скільки реально потрібно проєкту.

---

## 10. Вважати, що Design Tokens — це вся Design System

Design tokens є важливою частиною дизайн-системи, але вони не замінюють:

    компоненти;
    правила компонування;
    стани компонентів;
    accessibility guidelines;
    документацію;
    правила використання;
    принципи взаємодії.

---

# Практичний приклад — створюємо базові Design Tokens

Створимо невеликий набір токенів для навчального UI-проєкту.

## Крок 1. Створюємо файл

    styles/
        tokens.css

## Крок 2. Оголошуємо токени

    /* styles/tokens.css */

    :root {
        /* Primitive colors */
        --blue-600: #2563eb;
        --gray-900: #111827;
        --gray-600: #4b5563;
        --gray-200: #e5e7eb;
        --white: #ffffff;

        /* Semantic colors */
        --color-primary: var(--blue-600);
        --color-text: var(--gray-900);
        --color-text-muted: var(--gray-600);
        --color-border: var(--gray-200);
        --color-surface: var(--white);

        /* Spacing */
        --spacing-sm: 8px;
        --spacing-md: 16px;
        --spacing-lg: 24px;
        --spacing-xl: 32px;

        /* Border radius */
        --radius-sm: 4px;
        --radius-md: 8px;
        --radius-lg: 12px;

        /* Shadows */
        --shadow-card: 0 4px 12px rgb(0 0 0 / 10%);

        /* Typography */
        --font-family-base: Arial, sans-serif;
        --font-size-base: 16px;
        --line-height-base: 1.5;
    }

## Крок 3. Використовуємо токени

    /* styles/global.css */

    body {
        margin: 0;
        font-family: var(--font-family-base);
        font-size: var(--font-size-base);
        line-height: var(--line-height-base);
        color: var(--color-text);
        background-color: var(--color-surface);
    }

    .card {
        padding: var(--spacing-lg);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-card);
    }

    .card__description {
        color: var(--color-text-muted);
    }

    .button {
        padding: var(--spacing-sm) var(--spacing-md);
        border: 0;
        border-radius: var(--radius-md);
        background-color: var(--color-primary);
        color: var(--white);
        cursor: pointer;
    }

## Крок 4. Підключаємо CSS

У HTML:

    <link rel="stylesheet" href="/styles/tokens.css">
    <link rel="stylesheet" href="/styles/global.css">

Файл із токенами підключається перед основними стилями.

У сучасному застосунку порядок імпорту може відрізнятися залежно від структури CSS та інструментів збірки.

## Крок 5. Змінюємо дизайн централізовано

Припустимо, потрібно змінити основний колір.

Було:

    --blue-600: #2563eb;

Стає:

    --blue-600: #7c3aed;

Оскільки `--color-primary` посилається на `--blue-600`, кнопка автоматично отримає новий колір.

Компонент `.button` змінювати не потрібно.

## Крок 6. Перевіряємо результат

Переконайся, що:

    усі токени мають зрозумілі назви;
    значення використовуються за призначенням;
    повторювані параметри централізовані;
    компоненти використовують var();
    зміна токена впливає на потрібні компоненти;
    текст і кнопки мають достатній контраст.

Це вже базова практична реалізація design tokens.

---

# Практичний приклад — компонент Card

Уявімо, що потрібно створити картку профілю.

Без токенів:

    .profile-card {
        padding: 24px;
        background-color: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
    }

З токенами:

    .profile-card {
        padding: var(--spacing-lg);
        background-color: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-card);
    }

Переваги:

    менше дублювання;
    зрозуміліша роль значень;
    простіше змінювати дизайн;
    легше створювати нові компоненти;
    простіше підтримувати теми.

Компонент описує, які параметри йому потрібні, а токени визначають відповідні значення.

---

# Практичний приклад — Light Theme та Dark Theme

Створимо теми для навчальної сторінки.

    :root {
        color-scheme: light;

        --color-text: #111827;
        --color-surface: #ffffff;
        --color-border: #e5e7eb;
        --color-primary: #2563eb;
    }

    [data-theme="dark"] {
        color-scheme: dark;

        --color-text: #f9fafb;
        --color-surface: #111827;
        --color-border: #374151;
        --color-primary: #60a5fa;
    }

Використання:

    body {
        color: var(--color-text);
        background-color: var(--color-surface);
    }

    .card {
        color: var(--color-text);
        background-color: var(--color-surface);
        border: 1px solid var(--color-border);
    }

    .button {
        background-color: var(--color-primary);
    }

Тепер компоненти використовують спільні semantic tokens.

Для перемикання теми потрібно змінити атрибут:

    document.documentElement.dataset.theme = "dark";

Повернення до світлої теми:

    document.documentElement.dataset.theme = "light";

Це демонстраційний приклад JavaScript. У реальному застосунку перемикання теми також може враховувати збережені налаштування користувача та системні параметри.

---

# Практичний приклад — Component Tokens

Уявімо, що кнопка має власні параметри.

    :root {
        --color-primary: #2563eb;
        --color-primary-hover: #1d4ed8;

        --button-height: 44px;
        --button-padding-x: 20px;
        --button-radius: 8px;
    }

    .button {
        min-height: var(--button-height);
        padding-inline: var(--button-padding-x);
        border: 0;
        border-radius: var(--button-radius);
        background-color: var(--color-primary);
        color: #ffffff;
        cursor: pointer;
    }

    .button:hover {
        background-color: var(--color-primary-hover);
    }

Тепер можна змінювати параметри кнопки централізовано.

Наприклад:

    --button-height: 48px;
    --button-padding-x: 24px;
    --button-radius: 12px;

Такі зміни не повинні автоматично змінювати радіус карток або відступи інших компонентів.

---

# Design Tokens та доступність

Accessibility — важлива частина дизайн-системи.

Токени можуть допомагати забезпечувати послідовні правила доступності, але самі по собі не гарантують її.

Корисно передбачати токени для:

    основного тексту;
    другорядного тексту;
    фону;
    меж компонентів;
    focus ring;
    помилок;
    успішних повідомлень;
    disabled states.

Наприклад:

    :root {
        --color-text: #111827;
        --color-surface: #ffffff;
        --color-focus: #2563eb;
        --color-danger: #b91c1c;
    }

    .button:focus-visible {
        outline: 3px solid var(--color-focus);
        outline-offset: 2px;
    }

    .error-message {
        color: var(--color-danger);
    }

Потрібно перевіряти:

    контраст тексту та фону;
    видимість клавіатурного фокуса;
    читабельність у різних темах;
    зрозумілість повідомлень про помилки;
    доступність станів компонентів.

Для тексту звичайного розміру WCAG зазвичай вимагає контраст не менше 4.5:1 для рівня AA. Для великого тексту застосовується поріг 3:1. Для меж і візуальних індикаторів компонентів можуть діяти інші вимоги.

Токени мають допомагати дотримуватися цих правил, а не просто зберігати довільну палітру.

---

# Design Tokens у великих проєктах

У великих проєктах токени можуть існувати не лише у CSS.

Їх можуть зберігати в:

    Design tools
    JSON files
    TypeScript files
    CSS custom properties
    Build configuration
    Design token management tools

Наприклад, токен може бути представлений у JSON:

    {
        "color": {
            "primary": {
                "value": "#2563eb"
            }
        }
    }

Це спрощений приклад структури даних, а не універсальний формат усіх систем токенів.

У реальних проєктах структура може відповідати спеціалізованим форматам і стандартам обміну токенами.

Після цього значення можуть генеруватися або синхронізуватися з різними платформами.

Наприклад:

    Design tokens
          ↓
    Token source
          ↓
    Build process
          ↓
    CSS / JavaScript / Other platforms

Переваги такого підходу:

    повторне використання;
    автоматизація;
    узгодженість між платформами;
    централізовані оновлення;
    зменшення ручного дублювання.

Для початку вивчення UI Design достатньо розуміти концепцію і впевнено користуватися CSS custom properties.

Складні інструменти генерації токенів можна вивчати пізніше, коли вони будуть потрібні реальному проєкту.

---

# Design Tokens та TypeScript

У frontend-проєктах токени можуть використовуватися разом із TypeScript.

Проте звичайні CSS custom properties і TypeScript constants — різні механізми.

CSS:

    :root {
        --color-primary: #2563eb;
        --spacing-md: 16px;
    }

TypeScript:

    export const tokens = {
        colorPrimary: "#2563eb",
        spacingMd: "16px",
    } as const;

Використання:

    import { tokens } from "./tokens";

    const primaryColor = tokens.colorPrimary;

Цей приклад показує лише зберігання значень у TypeScript.

Якщо значення потрібно використовувати у звичайному CSS, його необхідно передати або згенерувати у форматі, доступному CSS.

У React-проєкті часто достатньо зберігати дизайн-токени в CSS, а TypeScript використовувати для логіки застосунку.

Не потрібно дублювати один і той самий набір токенів у CSS і TypeScript без чіткої причини.

---

# Типові питання на співбесіді

Що таке Design System?

Що таке Design Token?

Навіщо потрібні design tokens?

Які значення можуть зберігати токени?

Чим design tokens відрізняються від звичайних CSS-властивостей?

Що таке CSS custom properties?

Як оголосити CSS custom property?

Для чого використовується `:root`?

Для чого використовується `var()`?

Що таке fallback у `var()`?

Що таке hardcoded value?

Чому надмірне дублювання значень у CSS ускладнює підтримку?

Що означає Single Source of Truth?

Що таке primitive tokens?

Що таке semantic tokens?

Що таке component tokens?

Яка різниця між primitive та semantic tokens?

Що таке token hierarchy?

Що таке token reference?

Як токени допомагають підтримувати consistency?

Як токени допомагають змінювати дизайн централізовано?

Як design tokens допомагають реалізувати dark theme?

Чи потрібно створювати токен для кожного CSS-значення?

Коли варто створювати окремий component token?

Як організувати токени в CSS-файлах?

Які правила іменування токенів варто використовувати?

Як design tokens допомагають підтримувати доступність?

Чи гарантують токени достатній контраст?

Як можна використовувати design tokens у Figma та CSS?

Як токени можуть генеруватися для різних платформ?

---

# Шлях вивчення

## 🟢 Core — обов'язково знати

Що таке Design System.

Що таке Design Token.

Для чого потрібні design tokens.

Що таке token name.

Що таке token value.

Що таке hardcoded value.

Що таке CSS custom properties.

Як оголошувати токени через `:root`.

Як використовувати `var()`.

Як застосовувати fallback.

Як створити токени для:

    colors
    spacing
    typography
    border radius
    shadows

Як використовувати один токен у декількох компонентах.

Як змінювати значення централізовано.

Як називати токени зрозуміло та послідовно.

Чому не кожне значення CSS потрібно перетворювати на токен.

---

## 🔵 Junior — впевнене практичне використання

Розуміння різниці між:

    primitive tokens
    semantic tokens
    component tokens

Розуміння:

    global tokens
    token hierarchy
    token references
    single source of truth

Створення базового файлу `tokens.css`.

Організація токенів за категоріями.

Використання semantic tokens у компонентах.

Створення компонентів, які залежать від токенів, а не від довільних значень.

Створення light theme та dark theme.

Використання токенів у responsive design.

Використання `clamp()` для fluid values.

Розуміння зв'язку між токенами та consistency.

Базове розуміння дизайн-токенів у Figma.

Перевірка контрасту кольорів.

Розуміння компромісів між повторним використанням і надмірною абстракцією.

---

## 🟠 Middle — системний підхід

Побудова масштабованої архітектури токенів.

Розробка naming conventions для великого проєкту.

Визначення правил створення нових токенів.

Організація primitive, semantic і component tokens.

Підтримка кількох тем і брендів.

Токени для різних платформ.

Синхронізація дизайну та коду.

Автоматична генерація CSS-токенів.

Використання JSON як джерела токенів.

Інтеграція токенів у build process.

Документування призначення токенів.

Контроль за застарілими та невикористовуваними токенами.

Управління змінами без порушення сумісності компонентів.

---

## 🔴 Senior — архітектура дизайн-систем

Проєктування токенів для великих дизайн-систем.

Керування токенами для кількох брендів і продуктів.

Стандартизація обміну дизайн-токенами між інструментами.

Автоматизація трансформації токенів для різних платформ.

Версіонування токенів.

Міграція між версіями дизайн-системи.

Governance — правила управління токенами.

Процес погодження нових токенів.

Контроль за дублюванням і надмірною кількістю токенів.

Інтеграція дизайн-токенів у CI/CD.

Автоматизовані перевірки токенів.

Стратегії сумісності зі старими компонентами.

Баланс між гнучкістю, стандартизацією та складністю системи.

---

# Міні-шпаргалка

## Що таке Design Token

    Design Token
        ↓
    Іменоване дизайнерське значення
        ↓
    Повторне використання
        ↓
    Узгоджений інтерфейс

---

## CSS Custom Properties

Оголошення:

    :root {
        --color-primary: #2563eb;
        --spacing-md: 16px;
    }

Використання:

    .button {
        background-color: var(--color-primary);
        padding: var(--spacing-md);
    }

---

## Primitive Tokens

    --blue-600: #2563eb;
    --gray-900: #111827;
    --space-4: 16px;

    → базові значення

---

## Semantic Tokens

    --color-primary: var(--blue-600);
    --color-text: var(--gray-900);

    → призначення значення

---

## Component Tokens

    --button-background: var(--color-primary);
    --button-padding: 16px;

    → параметри компонента

---

## Token Hierarchy

    Primitive
        ↓
    Semantic
        ↓
    Component
        ↓
    UI

---

## Token Reference

    :root {
        --blue-600: #2563eb;
        --color-primary: var(--blue-600);
    }

    → один токен посилається на інший

---

## Theming

    :root {
        --color-surface: #ffffff;
    }

    [data-theme="dark"] {
        --color-surface: #111827;
    }

    → одне семантичне ім'я
    → різні значення для різних тем

---

## Основні правила

    Design Token → іменоване дизайнерське значення

    Token name → ім'я токена

    Token value → значення токена

    Primitive → базове значення

    Semantic → призначення значення

    Component → параметр компонента

    var() → використання CSS custom property

    :root → поширене місце оголошення глобальних токенів

    Single Source of Truth → централізоване джерело значення

    Theming → використання різних наборів значень

    Consistency → узгодженість інтерфейсу

---

# Головне

• Design tokens — це іменовані значення, які представляють дизайнерські рішення.

• Токени допомагають централізовано керувати кольорами, відступами, типографікою, радіусами, тінями та іншими параметрами.

• CSS custom properties — простий спосіб реалізувати токени в CSS.

• `:root` часто використовується для оголошення глобально доступних токенів.

• `var()` дозволяє використовувати значення токенів у CSS.

• Primitive tokens зберігають базові значення:

    --blue-600
    --gray-900
    --space-4

• Semantic tokens описують призначення значення:

    --color-primary
    --color-text
    --color-border

• Component tokens налаштовують конкретні компоненти:

    --button-height
    --button-padding-x
    --card-padding

• Один токен може використовуватися в багатьох компонентах.

• Якщо спільне дизайнерське значення змінюється, токени дозволяють оновити його централізовано.

• Зрозумілі назви токенів полегшують читання коду та підтримку проєкту.

• Не кожне CSS-значення потрібно перетворювати на токен. Токени доцільні для значущих, повторюваних або централізовано керованих дизайнерських рішень.

• Semantic tokens допомагають відокремити призначення значення від конкретного кольору або іншого базового параметра.

• Ієрархія токенів може виглядати так:

    Primitive
        ↓
    Semantic
        ↓
    Component
        ↓
    UI

• Design tokens полегшують реалізацію тем, але не гарантують автоматично правильний контраст або доступність.

• У невеликому проєкті достатньо почати з одного файлу `tokens.css`.

• У великих проєктах токени можуть зберігатися в JSON, дизайн-інструментах або спеціалізованих системах та генеруватися для різних платформ.

• Design tokens не замінюють компоненти, правила дизайну, документацію та accessibility guidelines.

• Основна мета design tokens — зробити дизайнерські рішення зрозумілими, повторно використовуваними, послідовними та простими для зміни.

---

# Наступна тема

    02-spacing-scale

У наступній темі розглядається шкала відступів: як визначати кроки spacing, вибирати стандартні значення та використовувати їх для побудови узгодженого інтерфейсу.