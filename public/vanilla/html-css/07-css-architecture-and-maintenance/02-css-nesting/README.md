# CSS Nesting

CSS Nesting (вкладеність CSS) — це можливість записувати CSS-правила всередині інших CSS-правил. Це дозволяє групувати стилі пов'язаних елементів, зменшувати повторення селекторів і робити CSS більш структурованим.

CSS Nesting нагадує вкладеність у Sass, але сучасний CSS підтримує нативну вкладеність без препроцесорів.

CSS Nesting використовується, коли потрібно:

- групувати стилі одного компонента;
- описувати стилі дочірніх елементів усередині батьківського селектора;
- працювати зі станами `:hover`, `:focus`, `:active`;
- описувати псевдоелементи `::before` та `::after`;
- групувати модифікатори компонентів;
- зменшувати повторення довгих селекторів;
- організовувати стилі компонентів у невеликих логічних блоках.

Основні поняття CSS Nesting:

    nested rules
    parent selector
    nesting selector (&)
    nested selectors
    pseudo-classes
    pseudo-elements
    descendant selectors
    compound selectors
    CSS specificity
    native CSS nesting
    nesting depth
    Sass nesting
    CSS maintainability

---

## Ключові поняття

✔ CSS Nesting  
✔ nested rule  
✔ parent rule  
✔ child selector  
✔ descendant selector  
✔ nesting selector `&`  
✔ `:hover`  
✔ `:focus`  
✔ `:active`  
✔ `:first-child`  
✔ `::before`  
✔ `::after`  
✔ compound selector  
✔ complex selector  
✔ CSS specificity  
✔ selector matching  
✔ nested media query  
✔ nested at-rule  
✔ CSS variables  
✔ component styles  
✔ native CSS nesting  
✔ Sass vs CSS Nesting  
✔ nesting depth  
✔ maintainable CSS  

---

## Що потрібно пам'ятати

• CSS Nesting дозволяє розміщувати CSS-правила всередині інших CSS-правил.

• Вкладені правила допомагають групувати стилі одного компонента.

• Сучасний CSS підтримує нативну вкладеність без Sass або інших препроцесорів.

• Символ `&` називається nesting selector і посилається на батьківський селектор.

• Без `&` вкладений селектор зазвичай описує нащадка батьківського елемента.

• `&:hover` означає, що той самий елемент перебуває у стані `:hover`.

• `&::before` означає псевдоелемент `::before` того самого елемента.

• `.card .title` означає елемент `.title`, який є нащадком `.card`.

• `.card.title` означає один елемент, який одночасно має класи `.card` і `.title`.

• Вкладеність не скасовує правила CSS specificity.

• Надмірна вкладеність ускладнює читання, перевизначення та підтримку стилів.

• CSS Nesting — це можливість мови CSS, а Sass — окремий CSS-препроцесор із додатковими можливостями.

• Для простих компонентів зазвичай достатньо двох-трьох логічних рівнів вкладеності.

• Складні селектори не потрібно вкладати лише заради використання CSS Nesting.

---

# CSS Nesting

## Що таке вкладеність

Звичайний CSS описує кожен селектор окремим правилом.

Наприклад:

    .card {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 12px;
    }

    .card h2 {
        margin-bottom: 10px;
    }

    .card p {
        color: #555;
    }

    .card a {
        color: blue;
    }

У цьому прикладі декілька селекторів починаються з `.card`.

За допомогою CSS Nesting можна згрупувати ці правила:

    .card {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 12px;

        h2 {
            margin-bottom: 10px;
        }

        p {
            color: #555;
        }

        a {
            color: blue;
        }
    }

Тепер стилі картки та її дочірніх елементів розташовані в одному блоці.

Браузер застосовує ці стилі до відповідних елементів так само, як і у звичайному CSS.

---

## Parent Rule

Parent Rule — правило, всередині якого розміщені інші CSS-правила.

Наприклад:

    .card {
        padding: 20px;

        p {
            color: #555;
        }
    }

Тут:

    .card → parent rule
    p     → nested rule

Батьківський селектор:

    .card

Вкладений селектор:

    p

Результуючий селектор:

    .card p

Це означає, що стилі `p` застосовуються до елементів `<p>`, які є нащадками елемента `.card`.

---

# Native CSS Nesting

Native CSS Nesting — нативна вкладеність, яка підтримується безпосередньо мовою CSS.

Наприклад:

    .button {
        padding: 12px 20px;
        background-color: royalblue;
        color: white;

        &:hover {
            background-color: navy;
        }
    }

Тут не потрібні:

    Sass
    SCSS
    Less
    CSS-in-JS

Достатньо звичайного CSS-файлу.

Важливо розрізняти:

    CSS Nesting → можливість CSS
    Sass        → CSS-препроцесор
    SCSS        → синтаксис Sass, схожий на CSS

Нативний CSS Nesting має власні правила синтаксису, тому не всі конструкції Sass можна автоматично переносити у звичайний CSS.

---

# Вкладені селектори без `&`

У CSS Nesting можна використовувати вкладені селектори без явного символу `&`.

Наприклад:

    .card {
        padding: 20px;

        p {
            color: #555;
        }
    }

Результат відповідає звичайному CSS:

    .card {
        padding: 20px;
    }

    .card p {
        color: #555;
    }

Тобто:

    .card {
        p {
            color: #555;
        }
    }

еквівалентно:

    .card p {
        color: #555;
    }

Вкладений селектор `p` шукає нащадків `.card`.

Це називається descendant selector.

---

## Descendant Selector

Descendant Selector — селектор нащадка.

Він вибирає елементи, які розташовані всередині іншого елемента на будь-якому рівні вкладеності.

Наприклад:

    .article {
        p {
            line-height: 1.6;
        }
    }

Відповідає:

    .article p {
        line-height: 1.6;
    }

HTML:

    <article class="article">
        <p>Перший абзац.</p>

        <div>
            <p>Другий абзац.</p>
        </div>
    </article>

Обидва абзаци отримають `line-height: 1.6`.

Причина: обидва є нащадками `.article`.

---

# Nesting Selector `&`

`&` — спеціальний nesting selector, який посилається на батьківський селектор.

Він потрібен, коли необхідно явно з'єднати батьківський селектор із вкладеним селектором.

Наприклад:

    .button {
        background-color: royalblue;

        &:hover {
            background-color: navy;
        }
    }

Результуючий селектор:

    .button:hover

Символ `&` замінює батьківський селектор у вкладеному правилі.

---

## `&` та псевдокласи

Псевдокласи описують особливий стан елемента або його положення в структурі документа.

Приклади:

    :hover
    :focus
    :active
    :disabled
    :checked
    :first-child
    :last-child
    :focus-visible

CSS Nesting дозволяє групувати такі стани.

Наприклад:

    .button {
        background-color: royalblue;
        color: white;

        &:hover {
            background-color: navy;
        }

        &:focus-visible {
            outline: 3px solid orange;
            outline-offset: 3px;
        }

        &:active {
            transform: scale(0.98);
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }

Результуючі селектори:

    .button:hover
    .button:focus-visible
    .button:active
    .button:disabled

Усі вони описують стани одного елемента `.button`.

---

## `&` та псевдоелементи

Псевдоелементи дозволяють стилізувати певну частину елемента або створювати декоративний вміст.

Основні псевдоелементи:

    ::before
    ::after
    ::first-letter
    ::first-line
    ::placeholder
    ::selection

Приклад:

    .badge {
        display: inline-block;
        padding: 6px 12px;
        background-color: #e8f0ff;
        color: #174ea6;

        &::before {
            content: "✓ ";
        }
    }

Результуючий селектор:

    .badge::before

HTML:

    <span class="badge">Completed</span>

Візуально:

    ✓ Completed

Для `::before` і `::after` зазвичай потрібно задавати властивість `content`, якщо псевдоелемент має створювати вміст.

---

# `&` та класи-модифікатори

CSS Nesting зручно використовувати для опису модифікаторів компонентів.

Наприклад:

    .button {
        padding: 12px 20px;
        border: none;
        border-radius: 6px;

        &.primary {
            background-color: royalblue;
            color: white;
        }

        &.secondary {
            background-color: #eee;
            color: #222;
        }

        &.danger {
            background-color: crimson;
            color: white;
        }
    }

Результуючі селектори:

    .button.primary
    .button.secondary
    .button.danger

Важливо: тут обидва класи належать одному елементу.

HTML:

    <button class="button primary">Save</button>

    <button class="button secondary">Cancel</button>

    <button class="button danger">Delete</button>

Це compound selectors — складені селектори, які вимагають, щоб один елемент відповідав кільком умовам одночасно.

---

## `&.class` vs `.class`

Порівняймо два приклади.

З `&`:

    .card {
        &.featured {
            border: 2px solid gold;
        }
    }

Результат:

    .card.featured

Без `&`:

    .card {
        .featured {
            border: 2px solid gold;
        }
    }

Результат:

    .card .featured

Різниця:

    &.featured
        → той самий елемент має обидва класи

    .featured
        → елемент .featured є нащадком .card

HTML для першого варіанта:

    <article class="card featured">
        Featured card
    </article>

HTML для другого варіанта:

    <article class="card">
        <span class="featured">Featured</span>
    </article>

Це одна з найважливіших відмінностей CSS Nesting.

---

# `&` та дочірні елементи

Розглянемо компонент картки:

    .card {
        padding: 20px;
        border: 1px solid #ddd;

        & .title {
            font-size: 24px;
        }

        & .description {
            color: #555;
        }
    }

Результуючі селектори:

    .card .title
    .card .description

У цих прикладах пробіл після `&` означає descendant relationship — зв'язок батьківського елемента з нащадком.

У простих випадках пробіл можна не записувати явно:

    .card {
        .title {
            font-size: 24px;
        }
    }

Результат:

    .card .title

Варіант із явним `&` корисний, коли потрібно чітко показати структуру складного селектора.

---

# `&` та складені селектори

Символ `&` може використовуватися для побудови складених селекторів.

Наприклад:

    .input {
        border: 1px solid #ccc;

        &.error {
            border-color: crimson;
        }

        &.success {
            border-color: seagreen;
        }

        &:focus {
            outline: 2px solid royalblue;
        }
    }

Результат:

    .input.error
    .input.success
    .input:focus

HTML:

    <input class="input error" />

    <input class="input success" />

    <input class="input" />

Перший елемент має клас `error`, другий — `success`, а третій отримує стиль фокусу лише тоді, коли перебуває у відповідному стані.

---

# Вкладені правила та CSS Specificity

CSS Specificity — специфічність селектора, яка бере участь у визначенні того, яке CSS-правило застосовується, коли кілька правил конфліктують.

CSS Nesting не скасовує правил специфічності.

Наприклад:

    .card {
        & .title {
            color: blue;
        }
    }

Результуючий селектор:

    .card .title

Його специфічність відповідає специфічності звичайного селектора `.card .title`.

У цьому випадку:

    .card → один class selector
    .title → один class selector

Специфічність:

    0-2-0

Тобто два селектори класу.

Інший приклад:

    .button {
        &:hover {
            background-color: navy;
        }
    }

Результат:

    .button:hover

Специфічність:

    0-2-0

Оскільки селектор містить:

    .button → class
    :hover  → pseudo-class

Важливо: під час роботи зі складними вкладеними селекторами специфічність потрібно оцінювати за правилами CSS, а не за кількістю рівнів вкладеності.

---

# Вкладеність і читабельність

CSS Nesting допомагає організувати код, але не означає, що всі стилі потрібно вкладати.

Невдалий приклад:

    .page {
        .content {
            .section {
                .card {
                    .header {
                        .title {
                            .icon {
                                color: red;
                            }
                        }
                    }
                }
            }
        }
    }

Такий код:

- складно читати;
- важко перевизначати;
- створює довгі селектори;
- прив'язує стилі до структури HTML;
- ускладнює повторне використання компонентів.

Краще:

    .card-title-icon {
        color: red;
    }

Або, якщо елемент належить картці:

    .card {
        .title-icon {
            color: red;
        }
    }

Практичне правило:

    Nesting → групування пов'язаних стилів
    Excessive nesting → зайва складність

Зазвичай достатньо двох-трьох логічних рівнів вкладеності.

Це рекомендація щодо читабельності, а не обмеження CSS.

---

# CSS Nesting та медіазапити

CSS дозволяє вкладати at-rules, зокрема `@media`, у правила стилів.

Наприклад:

    .card {
        padding: 24px;

        @media (max-width: 600px) {
            padding: 12px;
        }
    }

У цьому прикладі адаптивне правило згруповане зі стилями картки.

Еквівалентний звичайний CSS:

    .card {
        padding: 24px;
    }

    @media (max-width: 600px) {
        .card {
            padding: 12px;
        }
    }

За ширини viewport до `600px` включно застосовується зменшений padding.

Вкладені `@media` зручні, коли адаптивні зміни стосуються конкретного компонента.

Не потрібно вкладати всі медіазапити автоматично: іноді окрема група адаптивних правил читається краще.

---

# CSS Nesting та інші at-rules

At-rules — спеціальні конструкції CSS, що починаються із символу `@`.

Приклади:

    @media
    @supports
    @container
    @layer
    @starting-style

Деякі з них можна розміщувати всередині звичайних CSS-правил.

Наприклад:

    .card {
        display: grid;
        gap: 16px;

        @supports (display: subgrid) {
            display: subgrid;
        }
    }

Тут браузер перевіряє підтримку властивості або значення `display: subgrid`.

Якщо умова виконується, застосовується вкладене правило.

Інший приклад:

    .card {
        background-color: white;

        @media (prefers-color-scheme: dark) {
            background-color: #222;
            color: white;
        }
    }

Це дозволяє групувати стилі компонента за умовами середовища.

Використовувати потрібно лише ті at-rules, які відповідають конкретній задачі.

---

# CSS Nesting та CSS Variables

CSS Variables — це власні CSS-властивості, які часто використовуються разом із вкладеністю.

Наприклад:

    :root {
        --color-primary: royalblue;
        --color-primary-hover: navy;
        --button-radius: 6px;
    }

    .button {
        padding: 12px 20px;
        border-radius: var(--button-radius);
        background-color: var(--color-primary);
        color: white;

        &:hover {
            background-color: var(--color-primary-hover);
        }
    }

Тут:

    CSS Variables → зберігають повторно використовувані значення
    CSS Nesting   → групує пов'язані правила

Це різні можливості CSS, які добре доповнюють одна одну.

---

# CSS Nesting у компонентах

CSS Nesting особливо корисний для компонентного підходу.

Наприклад, компонент картки товару:

    .product-card {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 12px;

        .image {
            display: block;
            width: 100%;
            border-radius: 8px;
        }

        .title {
            margin: 16px 0 8px;
            font-size: 20px;
        }

        .price {
            font-weight: 700;
            color: seagreen;
        }

        .button {
            margin-top: 16px;
        }

        &:hover {
            border-color: #999;
        }
    }

HTML:

    <article class="product-card">
        <img
            class="image"
            src="product.jpg"
            alt="Product"
        />

        <h2 class="title">Product name</h2>

        <p class="price">$49</p>

        <button class="button">Buy</button>
    </article>

Результуючі селектори:

    .product-card .image
    .product-card .title
    .product-card .price
    .product-card .button
    .product-card:hover

Перевага: стилі компонента зібрані в одному місці.

Недолік: дочірні селектори залежать від класу батьківського компонента.

Якщо вкладеність стає занадто глибокою, варто розглянути простіші або більш незалежні селектори.

---

# CSS Nesting та BEM

BEM (Block Element Modifier) — методологія іменування CSS-класів.

Типова структура:

    .card
    .card__title
    .card__description
    .card--featured

BEM та CSS Nesting можна використовувати разом.

Наприклад:

    .card {
        padding: 20px;

        &__title {
            font-size: 24px;
        }

        &__description {
            color: #555;
        }

        &--featured {
            border: 2px solid gold;
        }
    }

Результуючі селектори:

    .card__title
    .card__description
    .card--featured

Тут `&__title` утворює назву класу `.card__title`, а не селектор нащадка.

Це зручний спосіб поєднати BEM і нативну вкладеність у сучасному CSS.

Однак важливо розрізняти цей підхід та звичайну вкладеність Sass: синтаксис і правила обробки можуть відрізнятися.

---

# CSS Nesting та Sass

Sass — препроцесор, який розширює CSS додатковими можливостями.

SCSS — синтаксис Sass, який зазвичай нагадує звичайний CSS.

Приклад SCSS:

    $primary: royalblue;

    .button {
        background-color: $primary;

        &:hover {
            background-color: navy;
        }
    }

У цьому прикладі використовуються:

    $primary → змінна Sass
    &        → посилання на батьківський селектор

У нативному CSS:

    :root {
        --primary: royalblue;
    }

    .button {
        background-color: var(--primary);

        &:hover {
            background-color: navy;
        }
    }

Різниця:

    Sass variables → $primary
    CSS variables  → --primary

CSS Nesting не потребує компіляції для перетворення вкладеності в окремі селектори, якщо браузер підтримує відповідний синтаксис.

Sass і надалі має інші можливості, яких немає в нативному CSS у такому самому вигляді, наприклад власні функції, міксини та програмні цикли.

---

# CSS Nesting vs Sass Nesting

| Можливість | Native CSS Nesting | Sass / SCSS |
|---|---|---|
| Вкладені селектори | Так | Так |
| Символ `&` | Так | Так |
| CSS-змінні `--name` | Так | Так, як CSS |
| Змінні препроцесора `$name` | Ні | Так |
| Mixins | Ні, не як у Sass | Так |
| Функції Sass | Ні | Так |
| Цикли препроцесора | Ні | Так |
| Компіляція вкладеності | Не потрібна для підтримуваного CSS | Потрібна для Sass |
| Використання звичайного CSS | Так | SCSS потрібно компілювати |

Важливо: нативний CSS постійно розвивається. Перед використанням нових можливостей потрібно перевіряти підтримку потрібними браузерами.

---

# Правила використання CSS Nesting

## Правило 1 — групуй пов'язані стилі

Добре:

    .alert {
        padding: 16px;
        border-radius: 8px;

        .title {
            font-weight: 700;
        }

        .message {
            margin-top: 8px;
        }
    }

Стилі одного компонента зібрані разом.

---

## Правило 2 — використовуй `&` для станів

Добре:

    .link {
        color: royalblue;

        &:hover {
            color: navy;
        }

        &:focus-visible {
            outline: 2px solid orange;
        }
    }

Це чітко показує, що стани належать одному елементу.

---

## Правило 3 — розрізняй нащадка та модифікатор

Нащадок:

    .card {
        .title {
            font-size: 24px;
        }
    }

Результат:

    .card .title

Модифікатор того самого елемента:

    .card {
        &.featured {
            border-color: gold;
        }
    }

Результат:

    .card.featured

---

## Правило 4 — не створюй надмірну вкладеність

Погано:

    .page {
        .main {
            .content {
                .section {
                    .card {
                        .title {
                            color: blue;
                        }
                    }
                }
            }
        }
    }

Краще, якщо структура компонентів це дозволяє:

    .card-title {
        color: blue;
    }

Або:

    .card {
        .title {
            color: blue;
        }
    }

---

## Правило 5 — стеж за специфічністю

Вкладеність може створювати складні селектори.

Наприклад:

    #app {
        .page {
            .card {
                .title {
                    color: red;
                }
            }
        }
    }

Результуючий селектор:

    #app .page .card .title

Він має високу специфічність через ID та класи.

Це може ускладнити перевизначення стилів.

Для підтримуваного CSS часто краще використовувати короткі, незалежні селектори.

---

## Правило 6 — не вкладати правила механічно

Не потрібно використовувати CSS Nesting лише тому, що така можливість існує.

Звичайний CSS:

    .page-title {
        font-size: 32px;
    }

може бути кращим за додаткову вкладеність, якщо групування не приносить користі.

Головна мета — не найменша кількість рядків, а зрозумілий і підтримуваний код.

---

# Практичні приклади

## Приклад 1 — проста картка

    .card {
        padding: 20px;
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 12px;

        h2 {
            margin-top: 0;
        }

        p {
            color: #555;
        }
    }

Що потрібно зрозуміти:

    .card → батьківський селектор
    h2    → вкладений селектор
    p     → вкладений селектор

Результуючі селектори:

    .card h2
    .card p

---

## Приклад 2 — кнопка зі станами

    .button {
        padding: 12px 20px;
        border: none;
        border-radius: 6px;
        background-color: royalblue;
        color: white;
        cursor: pointer;

        &:hover {
            background-color: navy;
        }

        &:active {
            transform: scale(0.98);
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }

Результуючі селектори:

    .button:hover
    .button:active
    .button:disabled

---

## Приклад 3 — поле форми

    .form-field {
        margin-bottom: 16px;

        label {
            display: block;
            margin-bottom: 6px;
        }

        input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 6px;

            &:focus {
                border-color: royalblue;
                outline: 2px solid lightblue;
            }
        }

        .error-message {
            margin-top: 6px;
            color: crimson;
        }
    }

Результуючі селектори:

    .form-field label
    .form-field input
    .form-field input:focus
    .form-field .error-message

---

## Приклад 4 — модифікатори картки

    .card {
        padding: 20px;
        border: 1px solid #ddd;

        &.featured {
            border-color: gold;
        }

        &.compact {
            padding: 10px;
        }
    }

Результуючі селектори:

    .card.featured
    .card.compact

HTML:

    <article class="card featured">
        Featured card
    </article>

    <article class="card compact">
        Compact card
    </article>

---

## Приклад 5 — BEM-компонент

    .product {
        padding: 20px;

        &__title {
            font-size: 24px;
        }

        &__price {
            font-weight: 700;
        }

        &__button {
            padding: 10px 16px;
        }

        &--sale {
            border: 2px solid crimson;
        }
    }

Результуючі селектори:

    .product__title
    .product__price
    .product__button
    .product--sale

---

## Приклад 6 — адаптивна картка

    .card {
        padding: 24px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;

        @media (max-width: 600px) {
            grid-template-columns: 1fr;
            padding: 12px;
        }
    }

На широкому екрані картка має дві колонки.

За ширини viewport до `600px` включно картка переходить на одну колонку.

---

## Приклад 7 — картка з псевдоелементом

    .notification {
        position: relative;
        padding: 16px;
        padding-left: 44px;
        background-color: #e8f0ff;

        &::before {
            content: "ℹ";
            position: absolute;
            left: 16px;
            top: 16px;
        }
    }

Результуючий селектор:

    .notification::before

Псевдоелемент використовується для декоративного значка.

---

## Приклад 8 — кілька рівнів вкладеності

    .navigation {
        display: flex;
        gap: 20px;

        .link {
            color: #333;
            text-decoration: none;

            &:hover {
                color: royalblue;
            }

            &.active {
                font-weight: 700;
            }
        }
    }

Результуючі селектори:

    .navigation .link
    .navigation .link:hover
    .navigation .link.active

Це приклад вкладеності, яка залишається відносно простою для читання.

---

# Типові помилки

## Помилка 1 — плутати `&.class` і `.class`

Неправильно для модифікатора того самого елемента:

    .card {
        .featured {
            border-color: gold;
        }
    }

Це означає:

    .card .featured

Якщо потрібні два класи на одному елементі:

    .card {
        &.featured {
            border-color: gold;
        }
    }

Результат:

    .card.featured

---

## Помилка 2 — вважати `&` обов'язковим у кожному вкладеному правилі

Непотрібно:

    .card {
        & p {
            color: #555;
        }
    }

Для простого селектора нащадка достатньо:

    .card {
        p {
            color: #555;
        }
    }

Обидва варіанти формують селектор `.card p`.

---

## Помилка 3 — надмірна вкладеність

Погано:

    .page {
        .content {
            .section {
                .card {
                    .title {
                        color: red;
                    }
                }
            }
        }
    }

Краще:

    .card-title {
        color: red;
    }

Або коротша вкладеність, якщо вона відповідає структурі компонента.

---

## Помилка 4 — плутати CSS Nesting із Sass

Sass має додаткові можливості, наприклад:

    $primary: blue;

    @mixin card-style {
        padding: 20px;
    }

Такі конструкції не стають нативним CSS лише через те, що CSS підтримує вкладені правила.

У звичайному CSS для змінних використовуються custom properties:

    :root {
        --primary: blue;
    }

---

## Помилка 5 — не перевіряти результативний селектор

Під час читання вкладеного CSS корисно подумки розгортати його.

Наприклад:

    .menu {
        .item {
            &.active {
                color: red;
            }
        }
    }

Крок 1:

    .menu .item

Крок 2:

    .menu .item.active

Результат:

    .menu .item.active

Це допомагає виявляти помилки селекторів і розуміти, які елементи отримають стилі.

---

## Помилка 6 — створювати надто специфічні селектори

Наприклад:

    #app {
        .page {
            .content {
                .card {
                    .title {
                        color: red;
                    }
                }
            }
        }
    }

Це утворює довгий селектор:

    #app .page .content .card .title

Такий селектор може бути складно перевизначити.

Краще уникати зайвих рівнів, якщо достатньо:

    .card-title {
        color: red;
    }

---

## Помилка 7 — використовувати вкладеність там, де вона не допомагає

Звичайний CSS:

    .site-logo {
        width: 120px;
    }

Не обов'язково перетворювати на:

    .header {
        .site-logo {
            width: 120px;
        }
    }

Другий варіант прив'язує стиль логотипа до `.header`, навіть якщо цей логотип може використовуватися в інших компонентах.

Вибирай структуру, яка найкраще відповідає повторному використанню та підтримці стилів.

---

# CSS Nesting та архітектура проєкту

CSS Nesting допомагає організувати стилі, але сам по собі не визначає архітектуру CSS-проєкту.

Він може використовуватися разом із:

    CSS Variables
    BEM
    CSS Modules
    component-based architecture
    design tokens
    utility classes
    media queries

Наприклад, у CSS Modules:

    /* Button.module.css */

    .button {
        padding: 12px 20px;
        background-color: royalblue;
        color: white;

        &:hover {
            background-color: navy;
        }
    }

У React-компоненті можна використовувати локальний клас із CSS Modules.

CSS Nesting відповідає за організацію вкладених правил, а CSS Modules — за ізоляцію та локальність CSS-класів у відповідному середовищі збірки.

Це різні інструменти, які можна поєднувати.

---

# Переваги CSS Nesting

• Менше повторення батьківських селекторів.

• Пов'язані стилі розміщуються поруч.

• Зручніше описувати стани компонентів.

• Легше групувати псевдокласи та псевдоелементи.

• Можна логічно організувати адаптивні правила.

• Не потрібен Sass лише заради вкладених селекторів.

• Код компонентів може стати компактнішим.

---

# Недоліки CSS Nesting

• Надмірна вкладеність погіршує читабельність.

• Вкладені селектори можуть створювати високу специфічність.

• Глибокі селектори сильніше залежать від структури HTML.

• Велика кількість вкладених правил ускладнює пошук потрібного стилю.

• Не кожен CSS-препроцесорний шаблон сумісний із нативним CSS Nesting.

• У великих проєктах потрібно дотримуватися спільних правил вкладеності.

• Потрібно враховувати підтримку синтаксису цільовими браузерами.

---

# Коли використовувати CSS Nesting

CSS Nesting добре підходить для:

    component styles
    button states
    form controls
    cards
    navigation
    pseudo-elements
    component modifiers
    responsive component styles

Наприклад:

    .button {
        background-color: royalblue;

        &:hover {
            background-color: navy;
        }
    }

CSS Nesting може бути зайвим для:

    простих незалежних селекторів;
    одноразових коротких правил;
    надмірно глибоких структур;
    стилів, які мають бути незалежними від батьківського компонента.

Основне правило:

    Використовуй Nesting для групування,
    а не для створення складної ієрархії селекторів.

---

# CSS Nesting та браузери

CSS Nesting — сучасна можливість CSS.

Перед використанням у реальному проєкті потрібно перевірити:

- чи підтримують синтаксис цільові браузери;
- чи відповідає синтаксис вимогам конкретної версії браузера;
- чи потрібна підтримка старих браузерів;
- чи налаштований процес збірки для трансформації CSS;
- чи є необхідність у PostCSS або іншому інструменті.

Для перевірки сумісності використовують:

    Can I Use
    MDN Web Docs
    Browser DevTools

Не варто автоматично вважати, що всі браузери або старі середовища підтримують усі нові можливості CSS.

---

# Практичні завдання

## Завдання 1 — картка

Створи картку з класом `.card`.

Додай вкладені правила для:

    h2
    p
    a

Вимоги:

- картка має padding `20px`;
- заголовок має нижній відступ;
- абзац має сірий текст;
- посилання має синій колір.

---

## Завдання 2 — кнопка

Створи `.button` із вкладеними станами:

    &:hover
    &:focus-visible
    &:active
    &:disabled

Вимоги:

- зміни фон при наведенні;
- додай видимий індикатор клавіатурного фокусу;
- трохи зменшуй кнопку при натисканні;
- для disabled-кнопки зміни прозорість.

---

## Завдання 3 — модифікатори

Створи компонент `.alert`.

Додай модифікатори:

    &.success
    &.warning
    &.error

Кожен модифікатор повинен мати власний колір фону та тексту.

Переконайся, що HTML-елементи мають одночасно класи `alert` і відповідний модифікатор.

---

## Завдання 4 — форма

Створи `.form-field`.

Вкладені правила:

    label
    input
    textarea
    .error-message

Для `input` додай:

    &:focus
    &.invalid

Поясни різницю між селекторами:

    .form-field input:focus
    .form-field input.invalid

---

## Завдання 5 — BEM

Створи компонент `.product`.

Додай:

    &__image
    &__title
    &__price
    &__button
    &--featured

Поясни, які результуючі селектори утворюються.

---

## Завдання 6 — адаптивність

Створи `.gallery`.

На широкому екрані використовуй три колонки.

У вкладеному `@media` для viewport до `700px` зроби дві колонки, а до `450px` — одну колонку.

Перевір результат у браузері.

---

## Завдання 7 — виправ вкладеність

Знайди помилку в такому коді:

    .card {
        .title {
            &.featured {
                color: gold;
            }
        }
    }

Відповідай на питання:

- Який результуючий селектор утворюється?
- Які елементи він вибирає?
- Чи можна застосувати його до заголовка з класами `card` і `featured`?
- Як змінити структуру, якщо модифікатор `featured` має бути на самій картці?

---

# Питання зі співбесіди

Що таке CSS Nesting?

Навіщо потрібна нативна вкладеність CSS?

Чим CSS Nesting відрізняється від Sass?

Що таке parent rule?

Що таке nested selector?

Що означає символ `&`?

Коли можна використовувати вкладені селектори без `&`?

Що означає `.card .title`?

Що означає `.card.title`?

Яка різниця між `&.active` та `.active` усередині `.card`?

Як використовувати `&` із псевдокласом `:hover`?

Як використовувати `&` із псевдоелементом `::before`?

Чи змінює CSS Nesting специфічність селектора?

Що таке descendant selector?

Що таке compound selector?

Як використовувати CSS Nesting із `@media`?

Чи можна використовувати CSS Nesting разом із CSS Variables?

Чи можна використовувати CSS Nesting разом із BEM?

Що утворює селектор `&__title` усередині `.card`?

Чому надмірна вкладеність небажана?

Як вкладеність впливає на підтримуваність CSS?

Коли краще використовувати незалежний селектор?

Як CSS Nesting працює в CSS Modules?

Як перевірити підтримку CSS Nesting браузерами?

Чи потрібно використовувати Sass лише заради вкладених селекторів?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке CSS Nesting.

Що таке parent rule та nested rule.

Основи нативної вкладеності CSS.

Вкладені селектори без `&`.

Символ `&`.

Різниця між:

    .card .title
    .card.title

Використання `&:hover`.

Використання `&:focus`.

Використання `&::before`.

Основи специфічності вкладених селекторів.

Переваги та недоліки вкладеності.

Основи CSS Nesting у компонентах.

---

## 🔵 Junior

Вкладені селектори та compound selectors.

Модифікатори компонентів.

CSS Nesting та BEM.

CSS Nesting та CSS Variables.

Вкладені `@media`.

Вкладені `@supports`.

Структурування стилів компонентів.

Розуміння результуючих селекторів.

Розуміння специфічності.

Контроль глибини вкладеності.

Вибір між незалежними та вкладеними селекторами.

CSS Nesting у CSS Modules.

Перевірка браузерної підтримки.

---

## 🟠 Middle

Архітектура CSS-компонентів.

CSS Nesting у великих проєктах.

Правила командного стилю.

Контроль специфічності.

Зменшення залежності стилів від HTML-ієрархії.

Поєднання CSS Nesting із BEM, CSS Modules та іншими методологіями.

Стратегія групування адаптивних правил.

Рефакторинг надмірно вкладеного CSS.

Підтримуваність селекторів.

Аналіз результативних селекторів.

Вибір між вкладеними правилами та плоскою структурою CSS.

Використання CSS Nesting разом із PostCSS та інструментами збірки за потреби.

---

## 🔴 Senior

Проєктування правил вкладеності для великих дизайн-систем.

Контроль специфічності в масштабних CSS-кодових базах.

Узгодження CSS Nesting із CSS Layers та архітектурою компонентів.

Стандартизація стилів команди.

Міграція із Sass на нативний CSS Nesting.

Аналіз сумісності та трансформації CSS.

Оптимізація підтримуваності CSS.

Виявлення складних залежностей між селекторами.

Розробка правил лінтингу для обмеження глибини вкладеності.

Оцінка компромісів між компактністю, незалежністю компонентів і читабельністю.

---

# Міні-шпаргалка

## Базова вкладеність

    .card {
        padding: 20px;

        p {
            color: #555;
        }
    }

Результат:

    .card p

---

## Символ `&`

    .button {
        &:hover {
            background-color: navy;
        }
    }

Результат:

    .button:hover

---

## Модифікатор

    .card {
        &.featured {
            border-color: gold;
        }
    }

Результат:

    .card.featured

---

## Нащадок

    .card {
        .title {
            font-size: 24px;
        }
    }

Результат:

    .card .title

---

## Псевдоелемент

    .badge {
        &::before {
            content: "✓";
        }
    }

Результат:

    .badge::before

---

## BEM

    .card {
        &__title {
            font-size: 24px;
        }

        &--featured {
            border-color: gold;
        }
    }

Результат:

    .card__title
    .card--featured

---

## Медіазапит

    .card {
        padding: 24px;

        @media (max-width: 600px) {
            padding: 12px;
        }
    }

---

## Специфічність

    .card .title
        → два селектори класу
        → specificity 0-2-0

    .button:hover
        → клас + псевдоклас
        → specificity 0-2-0

---

## Основні правила

    CSS Nesting → групування правил

    &           → батьківський селектор

    .card .title
        → нащадок

    .card.title
        → два класи одного елемента

    &:hover
        → стан батьківського елемента

    &::before
        → псевдоелемент батьківського елемента

    &__title
        → BEM-клас .card__title,
          якщо батьківський селектор .card

    @media
        → адаптивні стилі компонента

    excessive nesting
        → складніша підтримка CSS

---

# Головне

• CSS Nesting дозволяє вкладати CSS-правила всередину інших CSS-правил.

• Нативний CSS Nesting не потребує Sass лише для роботи з вкладеними селекторами.

• Вкладені правила допомагають групувати стилі компонентів.

• `&` посилається на батьківський селектор.

• `.card { p { ... } }` формує селектор `.card p`.

• `.card { &.featured { ... } }` формує селектор `.card.featured`.

• `.card .title` і `.card.title` мають різний зміст.

• `&:hover` описує стан того самого елемента.

• `&::before` описує псевдоелемент того самого елемента.

• CSS Nesting не скасовує правил специфічності.

• Вкладені `@media` допомагають групувати адаптивні стилі компонента.

• CSS Nesting можна поєднувати з CSS Variables, BEM і CSS Modules.

• Sass має додаткові можливості, яких не надає сама нативна вкладеність CSS.

• Надмірна вкладеність створює довгі селектори та ускладнює підтримку.

• Не потрібно вкладати незалежні стилі лише заради компактності коду.

• Перед використанням нових можливостей CSS варто перевіряти підтримку браузерами.

• Головна мета CSS Nesting — зробити стилі логічно згрупованими, читабельними та зручними для підтримки.

• Основний принцип:

    Nesting для організації стилів,
    а не для ускладнення селекторів.