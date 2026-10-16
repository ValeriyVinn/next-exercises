# 08. Naming Conventions — Правила іменування в дизайн-системі

## 1. Що таке Naming Conventions?

**Naming Conventions (правила іменування)** — це узгоджені правила, за якими називають компоненти, дизайн-токени, стилі, варіанти, стани та інші елементи дизайн-системи.

Мета — зробити назви зрозумілими, послідовними та передбачуваними для дизайнерів і розробників.

Наприклад, якщо в одному проєкті кнопка називається `Primary Button`, в іншому місці `Main CTA`, а ще в іншому `Blue Button`, команді складніше зрозуміти, чи йдеться про один компонент, чи про різні.

Краще домовитися про єдину систему назв.

Основні об'єкти, для яких потрібні правила іменування:

- ✔ Design Tokens — дизайн-токени.
- ✔ Colors — кольори.
- ✔ Typography — типографічні стилі.
- ✔ Spacing — відступи.
- ✔ Border Radius — заокруглення.
- ✔ Shadows — тіні.
- ✔ Components — компоненти.
- ✔ Variants — варіанти компонентів.
- ✔ States — стани компонентів.
- ✔ Icons — іконки.
- ✔ Layouts — макети й структури сторінок.
- ✔ Files and Folders — файли та папки проєкту.

**Головна ідея:** назва повинна пояснювати призначення елемента, а не лише його зовнішній вигляд.

---

## 2. Навіщо потрібні Naming Conventions?

У невеликому проєкті здається, що можна називати елементи довільно. Але зі збільшенням кількості компонентів це створює проблеми.

Наприклад, у бібліотеці можуть з'явитися такі назви:

    Blue
    Blue-2
    PrimaryBlue
    MainButton
    ButtonMain
    Primary-Button
    Main-CTA

Без правил складно зрозуміти:

- Які елементи є дублями.
- Які назви позначають компоненти, а які — їхні варіанти.
- Які значення є дизайн-токенами.
- Як знайти потрібний елемент у Figma.
- Як пов'язати дизайн у Figma з реалізацією в CSS або React.
- Як змінювати дизайн без зайвих помилок.

Правила іменування допомагають підтримувати порядок.

Основні переваги:

- **Consistency — послідовність.** Усі учасники команди використовують однакові правила.
- **Clarity — зрозумілість.** Назва пояснює призначення елемента.
- **Discoverability — можливість знаходження.** Потрібний компонент легко знайти.
- **Scalability — масштабованість.** Система назв залишається зрозумілою зі зростанням проєкту.
- **Maintainability — зручність підтримки.** Менше плутанини під час змін.
- **Collaboration — співпраця.** Дизайнери й розробники однаково розуміють структуру системи.

---

## 3. Основні принципи іменування

### 3.1. Зрозумілість

Назва повинна пояснювати, що це за елемент і для чого він потрібний.

Не дуже вдало:

    Blue
    Big
    New
    Element-4

Краще:

    color-primary
    button-lg
    card-featured
    input-error

Назви `Big` і `New` не пояснюють, що саме змінюється. А `button-lg` чітко вказує на розмір кнопки.

### 3.2. Послідовність

Якщо вибрав певний формат назв, використовуй його всюди.

Наприклад:

    button-primary
    button-secondary
    button-danger

Не варто змішувати його з такими назвами:

    PrimaryButton
    button_secondary
    Danger-Button

Водночас різні середовища можуть мати різні стилі іменування. Наприклад, CSS-класи можуть використовувати kebab-case, а React-компоненти — PascalCase.

Важливо не змушувати всі назви виглядати однаково, а визначити послідовні правила для кожного середовища.

### 3.3. Семантичність

**Semantic Naming** — іменування за призначенням, роллю або функцією елемента.

Наприклад:

    color-text-primary
    color-surface
    color-border
    color-action-primary

Такі назви пояснюють, де і для чого використовують значення.

Натомість назви на кшталт `blue-500` або `gray-200` описують сам колір і його місце у палітрі, але не конкретне призначення.

Обидва підходи корисні, проте виконують різні завдання.

### 3.4. Стислість

Назва має бути достатньо короткою, але зрозумілою.

Занадто коротко:

    btn-p
    c2
    tx-sm

Занадто довго:

    primary-blue-button-for-main-form-submit-action

Краще:

    button-primary
    color-text-secondary
    text-sm

Не скорочуй слова лише заради зменшення кількості символів. Використовуй загальноприйняті скорочення, якщо вони зрозумілі команді.

### 3.5. Передбачуваність

Якщо людина знає назву одного токена, вона повинна приблизно розуміти, як називаються споріднені токени.

Наприклад:

    color-text-primary
    color-text-secondary
    color-text-muted

Або:

    button-sm
    button-md
    button-lg

Це значно зручніше, ніж набір не пов'язаних між собою назв.

---

## 4. Naming Conventions і дизайн-токени

Дизайн-токени — одне з головних місць, де правила іменування мають особливе значення.

**Design Token** — іменоване значення дизайну, яке можна повторно використовувати.

Наприклад:

    --color-primary
    --spacing-md
    --radius-lg
    --shadow-sm

Назва токена зазвичай складається з кількох частин:

    category-purpose-variant

Де:

- `category` — категорія значення.
- `purpose` — призначення.
- `variant` — варіант, рівень або уточнення.

Наприклад:

    color-text-primary

Розбір назви:

- `color` — категорія: колір.
- `text` — призначення: текст.
- `primary` — варіант: основний текст.

Інший приклад:

    spacing-lg

Розбір:

- `spacing` — категорія: відступи.
- `lg` — великий рівень відступу.

Це поширена модель, але не універсальний стандарт. У конкретному проєкті структура може бути іншою.

### Приклад групування токенів

    color/
      text/
        primary
        secondary
        muted
      surface/
        default
        raised
      border/
        default
        strong

    spacing/
      xs
      sm
      md
      lg
      xl

    radius/
      sm
      md
      lg
      full

Таке групування можна використовувати як концептуальну модель у Figma, документації або системі токенів.

---

## 5. Primitive і Semantic Naming

У дизайн-системах часто використовують два рівні назв: базові значення та значення, які пояснюють їхню роль.

### 5.1. Primitive Tokens

**Primitive Tokens** — базові токени, що описують конкретні значення без прив'язки до одного призначення в інтерфейсі.

Наприклад:

    color-blue-500
    color-gray-100
    color-gray-900
    spacing-4
    radius-8

Такі назви відповідають на питання:

- Який це колір?
- Який це рівень палітри?
- Яке це базове значення?

Приклад CSS:

    :root {
      --color-blue-500: #2563eb;
      --color-gray-100: #f3f4f6;
      --color-gray-900: #111827;

      --spacing-4: 16px;
      --radius-8: 8px;
    }

### 5.2. Semantic Tokens

**Semantic Tokens** — токени, які пояснюють призначення значення в інтерфейсі.

Наприклад:

    color-text-primary
    color-surface
    color-border
    color-action-primary

Вони відповідають на питання:

- Де використовується цей колір?
- Яку роль він виконує?
- Для якого елемента призначене значення?

Приклад CSS:

    :root {
      --color-blue-500: #2563eb;
      --color-gray-100: #f3f4f6;
      --color-gray-900: #111827;

      --color-action-primary: var(--color-blue-500);
      --color-text-primary: var(--color-gray-900);
      --color-surface: #ffffff;
    }

Тепер компонент може використовувати семантичну назву:

    .button-primary {
      background: var(--color-action-primary);
    }

Якщо команда вирішить змінити основний колір дії, можна змінити прив'язку токена, не перейменовуючи всі компоненти.

### 5.3. Коли використовувати кожен підхід?

| Тип | Коли корисний |
|---|---|
| Primitive | Для організації базових значень |
| Semantic | Для опису ролі значення в інтерфейсі |
| Component-specific | Для особливого значення, потрібного конкретному компоненту |

У невеликому навчальному проєкті не обов'язково одразу створювати складну багаторівневу систему. Почни з назв, які зрозумілі та відповідають реальному використанню.

---

## 6. Правила іменування кольорів

Для кольорів існує кілька поширених підходів.

### 6.1. За назвою кольору

    color-blue
    color-red
    color-green
    color-gray

Це простий підхід, але він не пояснює призначення кольору.

### 6.2. За рівнем палітри

    color-blue-100
    color-blue-300
    color-blue-500
    color-blue-700
    color-blue-900

Такий підхід зручний для палітри з кількома відтінками.

Числа зазвичай допомагають упорядкувати відтінки, але їхній точний зміст залежить від системи. Не варто автоматично вважати, що `500` завжди означає однакову яскравість у всіх палітрах.

### 6.3. За призначенням

    color-text-primary
    color-text-secondary
    color-surface
    color-surface-raised
    color-border
    color-action-primary
    color-feedback-error
    color-feedback-success

Це семантичне іменування.

### 6.4. Рекомендований підхід

У більшій дизайн-системі можна поєднувати базові кольори із семантичними токенами.

    :root {
      /* Primitive */
      --color-blue-500: #2563eb;
      --color-gray-100: #f3f4f6;
      --color-gray-900: #111827;
      --color-red-600: #dc2626;

      /* Semantic */
      --color-text-primary: var(--color-gray-900);
      --color-surface: #ffffff;
      --color-border: var(--color-gray-100);
      --color-action-primary: var(--color-blue-500);
      --color-feedback-error: var(--color-red-600);
    }

У такій системі назва `color-action-primary` залишається зрозумілою навіть тоді, коли базовий колір змінюється.

---

## 7. Правила іменування типографіки

Типографічні токени можуть описувати роль тексту або його місце в типографічній шкалі.

### 7.1. За розміром

    text-xs
    text-sm
    text-md
    text-lg
    text-xl

Це простий підхід, який зручно застосовувати в CSS.

### 7.2. За роллю

    text-heading
    text-body
    text-caption
    text-label
    text-button

Такий підхід пояснює призначення тексту.

### 7.3. Комбінований підхід

    text-heading-lg
    text-heading-md
    text-body-md
    text-body-sm
    text-caption-sm

Ці назви описують і роль, і розмір.

Приклад CSS:

    :root {
      --text-heading-lg: 2rem;
      --text-heading-md: 1.5rem;
      --text-body-md: 1rem;
      --text-body-sm: 0.875rem;
      --text-caption-sm: 0.75rem;
    }

Використання:

    .page-title {
      font-size: var(--text-heading-lg);
    }

    .article-text {
      font-size: var(--text-body-md);
    }

    .form-hint {
      font-size: var(--text-caption-sm);
    }

Пам'ятай, що розмір шрифту — лише одна частина типографічного стилю. У повній системі також можуть бути токени для міжрядкового інтервалу, насиченості, сімейства шрифтів і міжлітерного інтервалу.

---

## 8. Правила іменування відступів

Для відступів часто використовують короткі рівні або числову шкалу.

### 8.1. Іменування за розміром

    spacing-xs
    spacing-sm
    spacing-md
    spacing-lg
    spacing-xl

Це зрозумілий варіант для невеликої системи.

### 8.2. Іменування за числовою шкалою

    spacing-1
    spacing-2
    spacing-3
    spacing-4
    spacing-6
    spacing-8

Наприклад:

    :root {
      --spacing-1: 4px;
      --spacing-2: 8px;
      --spacing-3: 12px;
      --spacing-4: 16px;
      --spacing-6: 24px;
      --spacing-8: 32px;
    }

Використання:

    .card {
      padding: var(--spacing-4);
    }

    .card__content {
      margin-top: var(--spacing-3);
    }

    .section {
      padding-block: var(--spacing-8);
    }

Числові назви можуть відповідати крокам системи відступів, але конкретне співвідношення визначає сам проєкт.

Не потрібно створювати токен для кожного випадкового значення. Спочатку визнач основну шкалу, а потім додавай винятки лише за необхідності.

---

## 9. Правила іменування радіусів і тіней

### 9.1. Border Radius

Для заокруглення кутів можна використовувати:

    radius-none
    radius-sm
    radius-md
    radius-lg
    radius-full

Приклад:

    :root {
      --radius-none: 0;
      --radius-sm: 4px;
      --radius-md: 8px;
      --radius-lg: 12px;
      --radius-full: 9999px;
    }

Використання:

    .button {
      border-radius: var(--radius-md);
    }

    .avatar {
      border-radius: var(--radius-full);
    }

### 9.2. Shadows

Для тіней можна використовувати:

    shadow-none
    shadow-sm
    shadow-md
    shadow-lg
    shadow-xl

Приклад:

    :root {
      --shadow-none: none;
      --shadow-sm: 0 2px 8px rgb(0 0 0 / 10%);
      --shadow-md: 0 4px 16px rgb(0 0 0 / 12%);
      --shadow-lg: 0 8px 24px rgb(0 0 0 / 16%);
    }

Якщо потрібно підкреслити роль тіні, можна застосувати семантичні назви:

    shadow-card
    shadow-dropdown
    shadow-popover
    shadow-modal

Не потрібно одночасно використовувати надмірну кількість майже однакових назв. Вибирай підхід, який відповідає складності системи.

---

## 10. Правила іменування компонентів

Назва компонента повинна описувати його призначення.

Приклади:

    Button
    Input
    Checkbox
    RadioButton
    Select
    Card
    Modal
    Dropdown
    Tooltip
    Avatar
    Badge
    Tabs
    Alert

У Figma назви компонентів часто організовують через категорії та вкладені групи.

Наприклад:

    Button/Primary
    Button/Secondary
    Button/Danger

Або:

    Forms/Input
    Forms/Checkbox
    Forms/RadioButton

Це приклади організації бібліотеки, а не обов'язковий синтаксис.

### 10.1. Називай за призначенням, а не кольором

Не дуже вдало:

    Blue Button
    Red Button
    Big Card
    Small Input

Краще:

    Button/Primary
    Button/Danger
    Card/Featured
    Input/Compact

Чому?

Тому що колір, розмір або стиль можуть змінитися, а призначення компонента залишиться.

Наприклад, основна кнопка не обов'язково має бути синьою в кожній темі або брендовій версії.

### 10.2. Використовуй однину для окремого компонента

Зазвичай окремий компонент називають в однині:

    Button
    Card
    Input
    Avatar

Назви груп або колекцій можуть бути у множині:

    Buttons
    Cards
    Form Controls

### 10.3. Не додавай зайві слова

Якщо назва `Button` достатня, не потрібно називати компонент:

    ReusablePrimaryActionButtonComponent

Краще:

    Button/Primary

Назви мають бути зрозумілими без зайвої багатослівності.

---

## 11. Правила іменування варіантів компонентів

Варіанти описують конкретні відмінності всередині одного компонента.

Для кнопки це можуть бути:

    Button
    ├── variant
    │   ├── primary
    │   ├── secondary
    │   ├── danger
    │   └── ghost
    ├── size
    │   ├── sm
    │   ├── md
    │   └── lg
    └── state
        ├── default
        ├── hover
        ├── focus
        ├── active
        ├── disabled
        └── loading

У коді ці характеристики часто передаються через props:

    <Button variant="primary" size="md">
      Зберегти
    </Button>

    <Button variant="danger" size="sm">
      Видалити
    </Button>

### Рекомендовані правила

- ✔ Використовуй одну назву для одного й того самого поняття.
- ✔ Не змішуй назви кольорів і призначення в одній категорії без потреби.
- ✔ Використовуй зрозумілі значення.
- ✔ Відокремлюй варіант компонента від його стану.
- ✔ Не створюй окремий компонент для кожної комбінації властивостей.

Наприклад, `primary` — це варіант кнопки, а `disabled` — її стан. Це різні характеристики.

---

## 12. Naming Conventions у Figma

У Figma назви впливають на пошук, організацію бібліотеки та зрозумілість роботи з компонентами.

Рекомендована структура:

    Foundations/
      Colors
      Typography
      Spacing
      Radius
      Shadows

    Components/
      Button
      Input
      Checkbox
      Card
      Modal

    Patterns/
      Search Form
      Login Form
      Navigation Bar

    Templates/
      Dashboard
      Product Page
      Profile Page

Для компонентів можна використовувати вкладені назви:

    Button/Primary
    Button/Secondary
    Button/Danger

Для властивостей компонентів:

    Variant = Primary
    Size = Medium
    State = Default
    Icon = True

Конкретне оформлення залежить від того, як команда організувала компоненти та властивості у Figma.

### Корисні правила

1. Використовуй однакові терміни в усій бібліотеці.
2. Групуй пов'язані компоненти.
3. Уникай назв `Frame 123`, `Component 7` або `New Button`.
4. Відокремлюй компоненти від демонстраційних макетів.
5. Видаляй застарілі дублікати після перевірки їх використання.
6. Не називай компонент лише за його поточним кольором або випадковим розміром.

---

## 13. Naming Conventions у CSS

У CSS використовують кілька поширених стилів іменування.

### 13.1. kebab-case

Слова розділяють дефісами.

    .primary-button {}
    .card-title {}
    .form-input {}

Цей стиль часто використовують для CSS-класів і CSS-змінних.

Приклади змінних:

    --color-primary
    --spacing-md
    --radius-lg

### 13.2. BEM

**BEM** означає Block, Element, Modifier.

Це методологія іменування CSS-класів.

- `Block` — самостійний компонент.
- `Element` — частина компонента.
- `Modifier` — варіант компонента або його частини.

Приклад:

    .card {}
    .card__title {}
    .card__description {}
    .card--featured {}

Розбір:

- `.card` — блок.
- `.card__title` — елемент картки.
- `.card__description` — опис картки.
- `.card--featured` — модифікований варіант картки.

Інший приклад:

    .button {}
    .button__icon {}
    .button--primary {}
    .button--disabled {}

BEM допомагає зрозуміти, які класи належать одному компоненту.

Однак BEM — не єдиний можливий підхід. У React-проєктах із CSS Modules також часто використовують локальні класи компонентів без повної BEM-нотації.

### 13.3. Чому не варто змішувати стилі хаотично?

Не дуже вдало:

    .primaryButton {}
    .secondary-button {}
    .button_danger {}

Краще вибрати послідовний формат:

    .button-primary {}
    .button-secondary {}
    .button-danger {}

Або використати BEM:

    .button {}
    .button--primary {}
    .button--secondary {}
    .button--danger {}

Головне — дотримуватися вибраного правила в межах проєкту.

---

## 14. Naming Conventions у JavaScript і React

У JavaScript та React часто використовують різні правила для різних типів ідентифікаторів.

### 14.1. PascalCase

Кожне слово починається з великої літери.

Використовується для назв React-компонентів і зазвичай для типів у TypeScript.

    function UserCard() {
      return <article>User information</article>;
    }

    type ButtonProps = {
      disabled?: boolean;
    };

### 14.2. camelCase

Перше слово починається з малої літери, наступні — з великої.

Зазвичай використовується для змінних, функцій, props і звичайних значень.

    const userName = "Olena";

    function getUserName() {
      return userName;
    }

### 14.3. UPPER_SNAKE_CASE

Слова пишуться великими літерами й розділяються підкресленнями.

У JavaScript цей стиль часто використовують для глобальних констант, значення яких відомі заздалегідь і не змінюються під час роботи програми.

    const API_BASE_URL = "/api";
    const MAX_RETRY_COUNT = 3;

Це поширена домовленість, а не сувора вимога мови.

### 14.4. Приклад компонентів React

    // Button.tsx

    type ButtonVariant = "primary" | "secondary" | "danger";

    type ButtonProps = {
      variant?: ButtonVariant;
      isDisabled?: boolean;
      children: React.ReactNode;
    };

    function Button({
      variant = "primary",
      isDisabled = false,
      children,
    }: ButtonProps) {
      return (
        <button
          className={`button button--${variant}`}
          disabled={isDisabled}
        >
          {children}
        </button>
      );
    }

У цьому прикладі:

- `Button` — PascalCase.
- `ButtonVariant` — PascalCase.
- `ButtonProps` — PascalCase.
- `isDisabled` — camelCase.
- `variant` — camelCase.
- `button--primary` — CSS-клас у стилі BEM.

Зверни увагу: назви властивостей повинні бути послідовними. Для доступності кнопки в HTML зазвичай використовують стандартну властивість `disabled`, навіть якщо внутрішня назва prop у компоненті інша.

---

## 15. Правила іменування іконок

Іконки потрібно називати відповідно до їхнього значення або функції.

Не дуже вдало:

    icon-1
    icon-blue
    icon-new
    icon-23

Краще:

    search
    close
    arrow-left
    arrow-right
    chevron-down
    calendar
    user
    settings
    trash
    check
    alert-circle

Якщо іконки організовані в групи:

    Navigation/Arrow Left
    Navigation/Arrow Right
    Actions/Close
    Actions/Trash
    Status/Check
    Status/Warning

Важливо відрізняти назву іконки від її стилю або варіанта.

Наприклад:

    icon-search
    icon-search-filled

Ці назви можуть позначати різні стилі однієї іконки.

Не називай іконку `blue-search`, якщо синій колір не є невід'ємною частиною її призначення. Колір краще задавати через відповідний стиль або дизайн-токен.

---

## 16. Правила іменування станів

Стани повинні мати зрозумілі та узгоджені назви.

Поширені назви:

    default
    hover
    focus
    focus-visible
    active
    disabled
    loading
    selected
    checked
    unchecked
    error
    success
    warning
    empty

Однак не всі ці значення належать до однієї категорії.

Наприклад:

- `hover` — стан взаємодії з курсором.
- `focus` — стан фокуса.
- `disabled` — обмеження взаємодії.
- `loading` — процес виконання операції.
- `error` — стан помилки.
- `selected` — вибраний елемент.
- `empty` — стан без даних.

Тому для кожного компонента визначай лише ті стани, які мають для нього сенс.

Наприклад:

    Button
    ├── default
    ├── hover
    ├── focus
    ├── active
    ├── disabled
    └── loading

    Input
    ├── default
    ├── focus
    ├── error
    ├── disabled
    └── read-only

    Checkbox
    ├── unchecked
    ├── checked
    ├── indeterminate
    ├── focus
    └── disabled

Це приклади систематизації, а не повний обов'язковий перелік станів.

---

## 17. Правила іменування файлів і папок

У проєктах важливо домовитися про правила для назв файлів і папок.

Для JavaScript-проєктів часто використовують kebab-case для папок:

    ui-design/
      01-design-basics/
      02-layout-and-composition/
      03-color/
      04-typography/
      05-components/
      06-component-states/
      07-responsive-design/
      08-design-systems/

Цей підхід зручний для навчальних матеріалів, оскільки назви легко читати й сортувати.

### Приклади файлів

    README.md
    color-tokens.md
    button-variants.md
    component-library.md
    naming-conventions.md

Назви файлів краще робити:

- короткими;
- описовими;
- послідовними;
- без зайвих пробілів;
- без випадкових символів.

Для компонентів React часто використовують PascalCase у назвах файлів, якщо так прийнято в проєкті:

    Button.tsx
    UserCard.tsx
    NavigationBar.tsx

Універсального правила для всіх проєктів немає. Важливо дотримуватися домовленості, яка вже використовується в репозиторії.

---

## 18. Naming Conventions для адаптивних властивостей

Адаптивний дизайн може використовувати назви, які пояснюють розмір екрана або поведінку компонента.

Наприклад:

    breakpoint-sm
    breakpoint-md
    breakpoint-lg
    breakpoint-xl

Або назви, що описують призначення:

    layout-mobile
    layout-tablet
    layout-desktop

У CSS можна використовувати змінні для контрольних точок:

    :root {
      --breakpoint-sm: 640px;
      --breakpoint-md: 768px;
      --breakpoint-lg: 1024px;
      --breakpoint-xl: 1280px;
    }

Проте CSS custom properties не можна безпосередньо використовувати замість значень у звичайних умовах `@media` в усіх стандартних сценаріях. Для медіазапитів часто задають значення безпосередньо в CSS або використовують інструменти збірки.

Приклад медіазапиту:

    .card-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }

    @media (min-width: 768px) {
      .card-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

Назви контрольних точок повинні відповідати реальним правилам адаптивності проєкту, а не лише назвам популярних пристроїв.

---

## 19. Як створити власний стандарт іменування

Для невеликого проєкту достатньо короткого документа, який описує основні правила.

### Крок 1. Визнач категорії

Наприклад:

    colors
    typography
    spacing
    radius
    shadows
    components
    states

### Крок 2. Визнач структуру назв

Наприклад:

    category-purpose-variant

Приклади:

    color-text-primary
    color-action-primary
    spacing-md
    radius-lg
    shadow-sm

### Крок 3. Визнач формат для кожного середовища

Наприклад:

| Середовище | Формат | Приклад |
|---|---|---|
| CSS-змінні | kebab-case | `--color-primary` |
| CSS-класи | kebab-case або BEM | `.button--primary` |
| React-компоненти | PascalCase | `UserCard` |
| TypeScript-типи | PascalCase | `ButtonProps` |
| JavaScript-змінні | camelCase | `userName` |
| Файли Markdown | kebab-case | `color-tokens.md` |

### Крок 4. Визнач словник термінів

Вибери єдині назви для поширених понять.

Наприклад:

    primary
    secondary
    danger
    success
    warning
    disabled
    loading
    selected

Не варто для одного й того самого значення в різних місцях використовувати `main`, `primary` і `principal`, якщо між ними немає змістової різниці.

### Крок 5. Створи приклади

Документ повинен містити не лише правила, а й правильні та неправильні назви.

    Good:
      color-text-primary
      button-primary
      spacing-md

    Avoid:
      blue-text
      new-button
      spacing-thing

### Крок 6. Перевір правила на реальних компонентах

Застосуй систему до кнопки, поля введення, картки й модального вікна.

Якщо правила складно застосовувати на практиці, спростити їх може бути корисніше, ніж продовжувати додавати винятки.

---

## 20. Типові помилки в Naming Conventions

### Помилка 1. Назви за зовнішнім виглядом

Наприклад:

    blue-button
    gray-card
    big-title

Проблема: зовнішній вигляд може змінитися, а призначення елемента залишиться.

Краще:

    button-primary
    card-default
    heading-lg

### Помилка 2. Різні назви для одного поняття

Наприклад:

    primary
    main
    principal

Якщо вони позначають одне й те саме, це створює плутанину.

**Рішення:** вибери один термін і використовуй його послідовно.

### Помилка 3. Надмірно довгі назви

Наприклад:

    primary-blue-button-for-the-main-user-action

**Рішення:** використовуй короткі структуровані назви.

    button-primary

### Помилка 4. Незрозумілі скорочення

Наприклад:

    btn-pr
    txt-s
    bg-pri

Такі назви можуть бути зрозумілими автору, але незручними для інших учасників команди.

**Рішення:** використовуй скорочення лише тоді, коли вони загальноприйняті та зрозумілі.

### Помилка 5. Змішування призначення і стану

Наприклад:

    button-disabled-primary

Така назва може бути неоднозначною, якщо система не визначає порядок характеристик.

Краще розділяти їх:

    variant = primary
    state = disabled

У коді це може виглядати так:

    <Button variant="primary" disabled>
      Зберегти
    </Button>

### Помилка 6. Назви без структури

Наприклад:

    Blue
    Blue2
    BlueFinal
    BlueFinalNew

**Рішення:** використовуй категорії, призначення та шкали.

### Помилка 7. Надмірна складність

Не потрібно створювати складну систему вкладених назв для маленького навчального проєкту.

**Рішення:** починай із простих правил і розширюй їх у міру зростання системи.

---

## 21. Практичний мініпроєкт: стандарт іменування для UI Library

Мета: створити невеликий стандарт назв для бібліотеки компонентів.

### Крок 1. Створи структуру токенів

    :root {
      /* Colors */
      --color-primary: #2563eb;
      --color-secondary: #64748b;
      --color-danger: #dc2626;

      /* Spacing */
      --spacing-sm: 8px;
      --spacing-md: 16px;
      --spacing-lg: 24px;

      /* Radius */
      --radius-sm: 4px;
      --radius-md: 8px;
      --radius-lg: 12px;

      /* Shadows */
      --shadow-sm: 0 2px 8px rgb(0 0 0 / 10%);
      --shadow-md: 0 4px 16px rgb(0 0 0 / 12%);
    }

### Крок 2. Визнач назви компонентів

    Button
    Input
    Card
    Modal
    Avatar

### Крок 3. Визнач назви варіантів

    Button:
      primary
      secondary
      danger

    Card:
      default
      outlined
      elevated

    Input:
      default
      error
      disabled

### Крок 4. Визнач правила CSS

    .button {}
    .button--primary {}
    .button--secondary {}
    .button--danger {}

    .card {}
    .card--outlined {}
    .card--elevated {}

    .input {}
    .input--error {}
    .input--disabled {}

### Крок 5. Задокументуй стандарт

Створи файл:

    naming-conventions.md

Опиши в ньому:

- Формат назв дизайн-токенів.
- Формат назв компонентів.
- Формат назв варіантів і станів.
- Формат CSS-класів.
- Формат файлів і папок.
- Приклади правильних назв.
- Типові помилки.

### Крок 6. Перевір узгодженість

Переконайся, що:

- кожен токен має зрозумілу назву;
- однакові поняття називаються однаково;
- назви компонентів не залежать від випадкового кольору;
- варіанти відокремлені від станів;
- CSS-класи мають єдиний формат;
- структура зрозуміла іншому розробнику.

---

## 22. Що потрібно знати Junior UI Designer / Frontend Developer

Ти маєш розуміти:

- ✔ Що таке Naming Conventions.
- ✔ Чому назви повинні бути послідовними.
- ✔ Чим семантичне іменування відрізняється від опису зовнішнього вигляду.
- ✔ Як називати primitive та semantic tokens.
- ✔ Як іменувати кольори, типографіку, відступи, радіуси й тіні.
- ✔ Як називати компоненти та їхні варіанти.
- ✔ Чим назва компонента відрізняється від назви його стану.
- ✔ Як організовувати назви компонентів у Figma.
- ✔ Що таке kebab-case, camelCase, PascalCase та UPPER_SNAKE_CASE.
- ✔ Що таке BEM і як воно допомагає організувати CSS-класи.
- ✔ Як підтримувати послідовність між Figma, CSS і React.
- ✔ Чому не варто створювати надмірно складні назви.
- ✔ Як документувати правила іменування.

Для початку достатньо створити короткий стандарт, якого ти послідовно дотримуватимешся у власних проєктах.

---

## 23. Питання для самоперевірки

1. Що таке Naming Conventions?
2. Чому правила іменування важливі для дизайн-системи?
3. Чим семантична назва відрізняється від назви за кольором?
4. Що таке Primitive Tokens?
5. Що таке Semantic Tokens?
6. Як називати токени кольорів?
7. Як називати токени відступів?
8. Як організувати назви компонентів у Figma?
9. Чим `variant` відрізняється від `state`?
10. Що таке kebab-case?
11. Що таке camelCase?
12. Що таке PascalCase?
13. Що таке UPPER_SNAKE_CASE?
14. Що означає BEM?
15. Як узгодити назви між Figma та React?
16. Чому не варто називати компонент лише за його кольором?
17. Як зрозуміти, що система іменування стала надто складною?
18. Для чого потрібен документ `naming-conventions.md`?

---

## 24. Мінішпаргалка

| Поняття | Значення |
|---|---|
| Naming Conventions | Правила іменування |
| Semantic Naming | Іменування за призначенням |
| Primitive Token | Базовий дизайн-токен |
| Semantic Token | Токен, що описує роль значення |
| Component | Компонент інтерфейсу |
| Variant | Варіант компонента |
| State | Стан компонента |
| kebab-case | `color-text-primary` |
| camelCase | `userName` |
| PascalCase | `UserCard` |
| UPPER_SNAKE_CASE | `API_BASE_URL` |
| BEM | Block, Element, Modifier |
| CSS Custom Property | CSS-змінна, наприклад `--color-primary` |

### Приклади правильних назв

    /* Design tokens */
    --color-text-primary
    --color-action-primary
    --spacing-md
    --radius-lg
    --shadow-sm

    /* CSS classes */
    .button
    .button--primary
    .button__icon
    .card__title

    /* React components */
    Button
    UserCard
    NavigationBar

    /* JavaScript variables */
    userName
    isLoading
    selectedItem

    /* Files */
    color-tokens.md
    component-library.md
    naming-conventions.md

---

## 25. Пов'язані теми

Для цілісного розуміння дизайн-системи вивчай ці теми разом:

- `01-design-tokens` — основи дизайн-токенів.
- `02-color-tokens` — правила іменування та використання кольорів.
- `03-typography-tokens` — типографічні токени.
- `04-border-radius` — токени заокруглення.
- `05-shadows` — токени тіней.
- `06-spacing-tokens` — система відступів, якщо вона передбачена структурою курсу.
- `07-component-library` — бібліотека компонентів.
- `05-components` — типи й структура UI-компонентів.
- `06-component-states` — стани компонентів.
- `07-responsive-design` — адаптивні інтерфейси.

---

## Висновок

**Naming Conventions — це спільна мова дизайн-системи.**

Вони допомагають дизайнерам і розробникам однаково розуміти структуру токенів, компонентів, варіантів і станів.

Хороша система іменування повинна бути зрозумілою, послідовною, передбачуваною та достатньо простою для підтримки.

Починай із невеликої кількості правил, застосовуй їх на практиці й документуй рішення.

**Головне правило:** називай елементи за їхнім призначенням і дотримуйся одного підходу в межах кожного середовища — Figma, CSS, JavaScript і React.