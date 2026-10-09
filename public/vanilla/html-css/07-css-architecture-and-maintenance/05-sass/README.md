# Sass — CSS-препроцесор

> **Sass (Syntactically Awesome Style Sheets)** — це CSS-препроцесор, який розширює можливості CSS і дозволяє писати стилі за допомогою змінних, вкладеності, міксинів, функцій, циклів та модульної системи.
>
> Sass допомагає організовувати великі CSS-проєкти, повторно використовувати код і зменшувати дублювання.
>
> Файли Sass компілюються в звичайний CSS, який браузер може обробляти.

---

## 1. Що таке Sass

Звичайний CSS:

    .card {
        padding: 20px;
        border-radius: 8px;
        background-color: #ffffff;
    }

    .button {
        padding: 20px;
        border-radius: 8px;
        background-color: #1769e0;
    }

Якщо багато компонентів використовують однакові значення, їх доводиться повторювати.

Sass дозволяє винести спільні значення в змінні:

    $spacing: 20px;
    $radius: 8px;

    .card {
        padding: $spacing;
        border-radius: $radius;
        background-color: #ffffff;
    }

    .button {
        padding: $spacing;
        border-radius: $radius;
        background-color: #1769e0;
    }

Після компіляції браузер отримує звичайний CSS:

    .card {
        padding: 20px;
        border-radius: 8px;
        background-color: #ffffff;
    }

    .button {
        padding: 20px;
        border-radius: 8px;
        background-color: #1769e0;
    }

**Головна думка:** Sass — це інструмент для написання й організації стилів. Браузер зазвичай отримує результат компіляції у форматі CSS, а не вихідний SCSS-код.

### Що дає Sass

- Змінні для повторно використовуваних значень.
- Вкладеність селекторів.
- Міксини для повторного використання груп декларацій.
- Функції для обчислень і перетворення значень.
- Поділ стилів на модулі.
- Цикли та умови для генерації повторюваних правил.
- Операції з числами, рядками, кольорами та списками.
- Можливість створювати власні інструменти для дизайн-систем.

---

# 2. Sass і SCSS: у чому різниця

Sass має два основні синтаксиси:

1. **SCSS** — Sass CSS Syntax.
2. **Indented Sass Syntax** — синтаксис із відступами.

## 2.1. SCSS

SCSS використовує фігурні дужки й крапки з комою, як звичайний CSS.

Файл: `styles.scss`

    $primary-color: #1769e0;

    .button {
        background-color: $primary-color;
        color: white;

        &:hover {
            background-color: #1256ba;
        }
    }

SCSS здебільшого сумісний із синтаксисом звичайного CSS, тому його простіше вивчати після HTML і CSS.

## 2.2. Indented Sass Syntax

У цьому синтаксисі не використовуються фігурні дужки та крапки з комою. Структуру визначають відступи.

Файл: `styles.sass`

    $primary-color: #1769e0

    .button
      background-color: $primary-color
      color: white

      &:hover
        background-color: #1256ba

Обидва варіанти належать до Sass і можуть компілюватися в CSS.

### Що вибрати

Для навчання та більшості сучасних проєктів зручно починати зі **SCSS**.

Причини:

- синтаксис схожий на CSS;
- легше переносити наявні CSS-правила;
- простіше читати змішані CSS/SCSS-проєкти;
- більшість прикладів Sass у сучасних проєктах використовують саме SCSS.

У цій шпаргалці всі приклади використовують SCSS, якщо не зазначено інше.

---

# 3. Установлення Sass

Sass — це інструмент, який потрібно запускати через середовище розробки або інший інструмент збірки.

Найпростіший спосіб для навчальних вправ — установити Sass через npm.

Перевір Node.js і npm:

    node -v
    npm -v

Якщо вони встановлені, можна запускати Sass через `npx` або встановити його в проєкт.

## 3.1. Створення навчального проєкту

Приклад структури:

    sass-practice/
    ├── index.html
    ├── package.json
    ├── scss/
    │   └── styles.scss
    └── css/
        └── styles.css

У терміналі в корені проєкту:

    npm init -y

Установи Sass як залежність розробки:

    npm install --save-dev sass

Після встановлення з'явиться папка `node_modules/` і оновиться `package.json`.

## 3.2. Компіляція SCSS у CSS

Команда:

    npx sass scss/styles.scss css/styles.css

Вона бере файл `scss/styles.scss` і створює або оновлює `css/styles.css`.

Для автоматичного перекомпілювання під час редагування:

    npx sass --watch scss/styles.scss:css/styles.css

Тепер Sass відстежуватиме зміни у вихідному файлі й оновлюватиме CSS.

Зупинити режим спостереження можна за допомогою `Ctrl + C`.

## 3.3. Підключення результату до HTML

У HTML підключається згенерований CSS:

    <link rel="stylesheet" href="css/styles.css">

Не потрібно підключати `styles.scss` безпосередньо через звичайний тег `link`.

Браузер має отримувати CSS-файл, який створив Sass.

## 3.4. Скрипти npm

У `package.json` можна додати команди:

    {
      "scripts": {
        "sass:build": "sass scss/styles.scss css/styles.css",
        "sass:watch": "sass --watch scss/styles.scss:css/styles.css"
      }
    }

Тепер можна запускати:

    npm run sass:build

Або:

    npm run sass:watch

Це зручніше, ніж щоразу вводити довгу команду.

---

# 4. Sass Variables — змінні

Змінні дозволяють зберігати значення, які повторно використовуються в різних правилах.

У Sass змінні починаються зі знака `$`.

## 4.1. Оголошення змінних

    $primary-color: #1769e0;
    $text-color: #222222;
    $font-size-base: 16px;
    $spacing-md: 16px;
    $border-radius: 8px;

Використання:

    body {
        color: $text-color;
        font-size: $font-size-base;
    }

    .button {
        padding: $spacing-md;
        border-radius: $border-radius;
        background-color: $primary-color;
    }

## 4.2. Змінні для дизайн-системи

    $colors: (
        primary: #1769e0,
        secondary: #6c757d,
        success: #198754,
        danger: #dc3545,
        text: #222222,
        background: #ffffff
    );

Це Sass Map — структура, яка зберігає пари ключ-значення.

Отримати значення можна за допомогою `map.get()`:

    @use "sass:map";

    $primary-color: map.get($colors, primary);

    .button {
        background-color: $primary-color;
    }

У сучасному Sass вбудовані модулі, зокрема `sass:map`, підключаються через `@use`.

## 4.3. Sass Variables і CSS Custom Properties

Це різні механізми.

Sass-змінна:

    $primary-color: #1769e0;

    .button {
        background-color: $primary-color;
    }

Після компіляції:

    .button {
        background-color: #1769e0;
    }

Значення Sass-змінної підставляється під час компіляції.

CSS Custom Property:

    :root {
        --primary-color: #1769e0;
    }

    .button {
        background-color: var(--primary-color);
    }

CSS Custom Properties залишаються в готовому CSS і можуть змінюватися під час роботи сторінки, наприклад через перемикання теми.

### Порівняння

| Можливість | Sass Variable | CSS Custom Property |
|---|---|---|
| Синтаксис | `$color` | `--color` |
| Коли обробляється | Під час компіляції | Під час роботи CSS у браузері |
| Залишається в CSS | Зазвичай ні | Так |
| Можна змінювати через каскад | Ні, це не CSS-властивість | Так |
| Зручно для тем | Через генерацію стилів | Так, особливо для динамічних тем |
| Можна використовувати в Sass-обчисленнях | Так | Не безпосередньо в усіх типах обчислень |

У реальних проєктах можна використовувати обидва механізми одночасно.

---

# 5. Nesting — вкладеність

Sass дозволяє вкладати правила всередині інших правил.

Звичайний CSS:

    .card {
        padding: 20px;
    }

    .card h2 {
        font-size: 24px;
    }

    .card p {
        color: #666666;
    }

SCSS:

    .card {
        padding: 20px;

        h2 {
            font-size: 24px;
        }

        p {
            color: #666666;
        }
    }

Sass компілює вкладені правила в звичайні CSS-селектори.

## 5.1. Вкладеність для компонентів

    .card {
        padding: 20px;
        border: 1px solid #dddddd;
        border-radius: 8px;

        .card__title {
            margin-bottom: 12px;
            font-size: 24px;
        }

        .card__description {
            color: #666666;
        }
    }

Результат:

    .card {
        padding: 20px;
        border: 1px solid #dddddd;
        border-radius: 8px;
    }

    .card .card__title {
        margin-bottom: 12px;
        font-size: 24px;
    }

    .card .card__description {
        color: #666666;
    }

## 5.2. Nesting Selector `&`

Символ `&` означає батьківський селектор.

    .button {
        background-color: blue;

        &:hover {
            background-color: navy;
        }

        &:focus-visible {
            outline: 2px solid orange;
        }

        &.is-active {
            background-color: green;
        }
    }

Результат:

    .button {
        background-color: blue;
    }

    .button:hover {
        background-color: navy;
    }

    .button:focus-visible {
        outline: 2px solid orange;
    }

    .button.is-active {
        background-color: green;
    }

## 5.3. Кілька варіантів компонента

    .button {
        padding: 10px 16px;
        border-radius: 8px;

        &--primary {
            background-color: #1769e0;
            color: white;
        }

        &--secondary {
            background-color: #eeeeee;
            color: #222222;
        }

        &--danger {
            background-color: #dc3545;
            color: white;
        }
    }

У Sass `&--primary` перетворюється на `.button--primary`.

Це одна з відмінностей від нативного CSS Nesting: Sass підтримує приєднання суфікса до батьківського селектора.

У звичайному CSS такий Sass-синтаксис не можна автоматично вважати сумісним.

## 5.4. Вкладеність і BEM

SCSS добре поєднується з BEM:

    .product-card {
        padding: 20px;

        &__title {
            font-size: 24px;
        }

        &__description {
            color: #666666;
        }

        &__button {
            margin-top: 16px;
        }

        &--featured {
            border: 2px solid gold;
        }
    }

Результат:

    .product-card {
        padding: 20px;
    }

    .product-card__title {
        font-size: 24px;
    }

    .product-card__description {
        color: #666666;
    }

    .product-card__button {
        margin-top: 16px;
    }

    .product-card--featured {
        border: 2px solid gold;
    }

Це зручний спосіб згрупувати стилі одного компонента.

Однак надмірна вкладеність може призвести до складних селекторів. Для великих компонентів краще дотримуватися помірної глибини вкладеності.

---

# 6. Partials — часткові файли

У великому проєкті не потрібно зберігати весь SCSS в одному файлі.

Можна розділити стилі на менші частини.

Наприклад:

    scss/
    ├── _variables.scss
    ├── _base.scss
    ├── _buttons.scss
    ├── _cards.scss
    └── styles.scss

Файли, які починаються з `_`, традиційно називають partials — частковими файлами.

Вони призначені для повторного використання в інших Sass-модулях.

## 6.1. Приклад `_variables.scss`

    $primary-color: #1769e0;
    $text-color: #222222;
    $spacing-md: 16px;
    $radius-md: 8px;

## 6.2. Приклад `_buttons.scss`

    .button {
        padding: 10px 16px;
        border: none;
        border-radius: 8px;
        cursor: pointer;

        &--primary {
            background-color: #1769e0;
            color: white;
        }
    }

## 6.3. Головний файл

Сучасний Sass рекомендує модульну систему `@use` і `@forward`, а не застарілий `@import`.

Приклад `styles.scss`:

    @use "variables";
    @use "buttons";
    @use "cards";

Sass знаходить відповідні файли, зокрема `_variables.scss`, `_buttons.scss` і `_cards.scss`.

Проте важливо розуміти: `@use` ізолює Sass-змінні, функції та міксини в модульному просторі імен. Він не просто копіює всі оголошення в глобальний Sass-простір.

У цьому прикладі CSS-правила з модулів будуть включені в результат компіляції.

---

# 7. `@use` — сучасна модульна система Sass

`@use` підключає Sass-модуль і дає доступ до його змінних, функцій і міксинів через простір імен.

## 7.1. Використання змінних через namespace

Файл `_tokens.scss`:

    $primary-color: #1769e0;
    $spacing-md: 16px;
    $radius-md: 8px;

Файл `styles.scss`:

    @use "tokens";

    .button {
        padding: tokens.$spacing-md;
        border-radius: tokens.$radius-md;
        background-color: tokens.$primary-color;
    }

Префікс `tokens.` показує, з якого модуля походить змінна.

Це зменшує ризик конфліктів між назвами.

## 7.2. Власний namespace

Можна задати коротшу назву:

    @use "tokens" as t;

    .button {
        padding: t.$spacing-md;
        border-radius: t.$radius-md;
        background-color: t.$primary-color;
    }

## 7.3. Простір імен `*`

Можна прибрати namespace:

    @use "tokens" as *;

    .button {
        padding: $spacing-md;
        border-radius: $radius-md;
        background-color: $primary-color;
    }

Але використовувати `as *` потрібно обережно, оскільки назви з різних модулів можуть конфліктувати.

Для навчання й підтримки великих проєктів явний namespace зазвичай зрозуміліший.

## 7.4. `@use` не дорівнює `@import`

Старий підхід:

    @import "variables";
    @import "buttons";

Сучасний підхід:

    @use "variables";
    @use "buttons";

`@import` у Sass застарів і не рекомендується для нових проєктів.

Важливо: CSS-правило `@import` у звичайному CSS і Sass-директива `@import` — не одне й те саме за призначенням. Тут ідеться саме про застарілий механізм Sass.

---

# 8. `@forward` — повторне експортування модулів

`@forward` дозволяє одному Sass-модулю надавати назовні елементи інших модулів.

Це корисно, коли проєкт має багато частин, але хоче надати зручну точку входу.

Структура:

    scss/
    ├── abstracts/
    │   ├── _colors.scss
    │   ├── _spacing.scss
    │   └── _index.scss
    └── styles.scss

`_colors.scss`:

    $primary: #1769e0;
    $danger: #dc3545;

`_spacing.scss`:

    $sm: 8px;
    $md: 16px;
    $lg: 24px;

`_index.scss`:

    @forward "colors";
    @forward "spacing";

Тепер `styles.scss` може звертатися до модулів через єдину точку входу:

    @use "abstracts" as a;

    .button {
        padding: a.$md;
        background-color: a.$primary;
    }

У Sass модульну структуру часто будують так, щоб `@use` застосовувався для використання функціональності, а `@forward` — для її надання іншим модулям.

---

# 9. Mixins — міксини

Міксин — це повторно використовуваний блок Sass-коду, який можна включити в різні правила.

Міксини оголошуються через `@mixin`, а використовуються через `@include`.

## 9.1. Простий міксин

    @mixin center-content {
        display: flex;
        justify-content: center;
        align-items: center;
    }

Використання:

    .hero {
        @include center-content;
        min-height: 400px;
    }

    .modal {
        @include center-content;
        min-height: 200px;
    }

## 9.2. Міксин із параметрами

    @mixin button-variant($background, $text-color) {
        background-color: $background;
        color: $text-color;
        border: none;
        border-radius: 8px;
        padding: 10px 16px;
    }

Використання:

    .button--primary {
        @include button-variant(#1769e0, white);
    }

    .button--danger {
        @include button-variant(#dc3545, white);
    }

## 9.3. Параметри зі значеннями за замовчуванням

    @mixin rounded-box($radius: 8px) {
        border-radius: $radius;
    }

Використання:

    .card {
        @include rounded-box;
    }

    .modal {
        @include rounded-box(16px);
    }

Якщо параметр не передано, Sass використовує значення за замовчуванням.

## 9.4. Міксин для адаптивності

    @mixin respond-to($breakpoint) {
        @if $breakpoint == tablet {
            @media (min-width: 768px) {
                @content;
            }
        } @else if $breakpoint == desktop {
            @media (min-width: 1024px) {
                @content;
            }
        }
    }

Використання:

    .navigation {
        display: flex;
        flex-direction: column;

        @include respond-to(tablet) {
            flex-direction: row;
        }

        @include respond-to(desktop) {
            gap: 24px;
        }
    }

Тут `@content` дозволяє передати в міксин блок стилів, який буде вставлено всередину відповідного медіазапиту.

Це приклад навчального міксина. У реальному проєкті точки перелому часто визначають централізовано, а складність міксинів обмежують.

## 9.5. Коли потрібні міксини

Міксини доречні, коли:

- група декларацій повторюється;
- потрібні параметри;
- потрібно генерувати адаптивні правила;
- є повторюваний шаблон стилізації.

Не варто створювати міксин для кожної декларації. Якщо потрібно повторно використовувати лише одне значення, змінна може бути простішою.

---

# 10. Functions — функції Sass

Функції приймають значення й повертають результат.

На відміну від міксинів, які зазвичай генерують декларації або інші CSS-правила, функції використовуються для обчислення значень.

## 10.1. Вбудовані функції

Sass підтримує функції для роботи з числами, кольорами, рядками, списками й картами.

Наприклад:

    $base-size: 16px;

    .title {
        font-size: $base-size * 2;
    }

Результат:

    .title {
        font-size: 32px;
    }

Для роботи з картами можна використати модуль `sass:map`:

    @use "sass:map";

    $colors: (
        primary: #1769e0,
        danger: #dc3545
    );

    .button {
        background-color: map.get($colors, primary);
    }

## 10.2. Власна функція

Функції оголошуються через `@function`, а результат повертається через `@return`.

    @function double-size($size) {
        @return $size * 2;
    }

Використання:

    .title {
        font-size: double-size(16px);
    }

Результат:

    .title {
        font-size: 32px;
    }

## 10.3. Функція для spacing scale

    @function spacing($multiplier) {
        @return $multiplier * 8px;
    }

    .card {
        padding: spacing(3);
    }

Результат:

    .card {
        padding: 24px;
    }

Так можна створювати власні правила для дизайн-системи.

Однак якщо прості змінні вже вирішують задачу, не потрібно створювати функцію без реальної потреби.

---

# 11. `@extend` — успадкування селекторів

`@extend` дозволяє одному селектору успадковувати правила іншого селектора.

Приклад:

    .message {
        padding: 16px;
        border-radius: 8px;
    }

    .message--success {
        @extend .message;
        background-color: #d1e7dd;
        color: #0f5132;
    }

Sass може об'єднати селектори у згенерованому CSS.

Приблизний результат:

    .message,
    .message--success {
        padding: 16px;
        border-radius: 8px;
    }

    .message--success {
        background-color: #d1e7dd;
        color: #0f5132;
    }

## 11.1. Чому з `@extend` потрібно бути обережним

`@extend` може змінювати групування селекторів і створювати складніші результати, ніж очікується.

Для повторного використання груп декларацій часто простіше використовувати міксини.

Наприклад:

    @mixin message-base {
        padding: 16px;
        border-radius: 8px;
    }

    .message {
        @include message-base;
    }

    .message--success {
        @include message-base;
        background-color: #d1e7dd;
        color: #0f5132;
    }

Міксини можуть збільшити розмір згенерованого CSS через дублювання декларацій, а `@extend` може об'єднувати селектори. Вибір залежить від конкретної задачі.

## 11.2. Placeholder Selectors

Placeholder-селектор починається з `%` і сам по собі не генерує CSS-правило.

    %message-base {
        padding: 16px;
        border-radius: 8px;
    }

    .message {
        @extend %message-base;
    }

    .message--success {
        @extend %message-base;
        background-color: #d1e7dd;
    }

Placeholder корисний для внутрішніх стилів, які потрібно поширити через `@extend`, не створюючи окремий публічний клас.

Для початкового навчання достатньо знати призначення `@extend` і розуміти, що його не варто використовувати безконтрольно.

---

# 12. Conditions — умови

Sass підтримує умовні конструкції.

Основний синтаксис:

- `@if`;
- `@else if`;
- `@else`.

Приклад:

    $theme: dark;

    .panel {
        @if $theme == dark {
            background-color: #222222;
            color: white;
        } @else {
            background-color: white;
            color: #222222;
        }
    }

Sass перевіряє умову під час компіляції та генерує відповідний CSS.

Умови корисні для створення бібліотек і дизайн-систем, але для звичайного компонента часто достатньо простого класу або CSS Custom Properties.

---

# 13. Loops — цикли

Цикли дозволяють автоматично генерувати повторювані CSS-класи.

Sass має кілька конструкцій циклів:

- `@for`;
- `@each`;
- `@while`.

## 13.1. Цикл `@for`

    @for $i from 1 through 4 {
        .u-mt-#{$i} {
            margin-top: $i * 8px;
        }
    }

Результат:

    .u-mt-1 {
        margin-top: 8px;
    }

    .u-mt-2 {
        margin-top: 16px;
    }

    .u-mt-3 {
        margin-top: 24px;
    }

    .u-mt-4 {
        margin-top: 32px;
    }

`#{$i}` — це інтерполяція, яка дозволяє вставляти значення Sass у назву селектора.

## 13.2. `through` і `to`

    @for $i from 1 through 4 {
        /* включає 1, 2, 3, 4 */
    }

    @for $i from 1 to 4 {
        /* включає 1, 2, 3 */
    }

Різниця:

- `through` включає кінцеве значення;
- `to` не включає кінцеве значення.

## 13.3. Цикл `@each`

    $colors: (
        primary: #1769e0,
        success: #198754,
        danger: #dc3545
    );

    @each $name, $color in $colors {
        .button--#{$name} {
            background-color: $color;
        }
    }

Результат:

    .button--primary {
        background-color: #1769e0;
    }

    .button--success {
        background-color: #198754;
    }

    .button--danger {
        background-color: #dc3545;
    }

## 13.4. Коли використовувати цикли

Цикли корисні для:

- utility-класів;
- варіантів кольорів;
- spacing scale;
- генерації класів дизайн-системи;
- створення повторюваних правил.

Не потрібно генерувати сотні класів, якщо вони не використовуються. Згенерований CSS теж має свою вартість.

---

# 14. Interpolation — інтерполяція

Інтерполяція дозволяє вставляти значення Sass у рядки, назви селекторів, властивостей та інші частини синтаксису.

Синтаксис:

    #{$variable}

Приклад:

    $size: 3;

    .column-#{$size} {
        width: 25%;
    }

Результат:

    .column-3 {
        width: 25%;
    }

Інтерполяція також використовується в циклах:

    @for $i from 1 through 3 {
        .u-gap-#{$i} {
            gap: $i * 8px;
        }
    }

Важливо: інтерполяція — це спосіб сформувати частину вихідного коду. Не використовуй її там, де простіше й безпечніше застосувати звичайну змінну.

---

# 15. `@use "sass:math"` — математичні операції

Для математичних обчислень Sass має модуль `sass:math`.

Приклад:

    @use "sass:math";

    $container-width: 1200px;
    $columns: 12;

    .container {
        max-width: $container-width;
    }

    .column {
        width: math.div(100%, $columns);
    }

У цьому прикладі ширина однієї колонки становить приблизно `8.33333%`.

Для ділення в сучасному Sass рекомендовано використовувати `math.div()` там, де потрібна саме математична операція ділення.

Не слід плутати Sass-обчислення з CSS `calc()`.

Sass:

    $spacing: 8px;

    .card {
        padding: $spacing * 3;
    }

CSS `calc()`:

    .card {
        width: calc(100% - 32px);
    }

Sass обчислює значення під час компіляції. `calc()` залишає обчислення браузеру, що корисно, коли потрібно поєднати різні одиниці або значення, які залежать від поточного layout.

---

# 16. Sass Maps — карти значень

Map — структура, яка зберігає пари ключ-значення.

Приклад:

    $breakpoints: (
        mobile: 480px,
        tablet: 768px,
        desktop: 1024px
    );

Отримання значення:

    @use "sass:map";

    $tablet-width: map.get($breakpoints, tablet);

Використання:

    @media (min-width: $tablet-width) {
        .navigation {
            flex-direction: row;
        }
    }

Maps особливо корисні для:

- кольорових палітр;
- breakpoint-ів;
- spacing scale;
- типографічних шкал;
- варіантів компонентів.

## 16.1. Map для кольорів

    @use "sass:map";

    $colors: (
        primary: #1769e0,
        secondary: #6c757d,
        success: #198754,
        danger: #dc3545
    );

    @each $name, $color in $colors {
        .text-#{$name} {
            color: $color;
        }
    }

Результат:

    .text-primary {
        color: #1769e0;
    }

    .text-secondary {
        color: #6c757d;
    }

    .text-success {
        color: #198754;
    }

    .text-danger {
        color: #dc3545;
    }

---

# 17. Sass і CSS Nesting: відмінності

Сучасний CSS також підтримує нативну вкладеність. Проте Sass і CSS Nesting не є повністю однаковими.

SCSS:

    .card {
        color: #222;

        &__title {
            font-size: 24px;
        }

        &:hover {
            border-color: blue;
        }
    }

Нативний CSS Nesting не підтримує Sass-подібне приєднання `&__title` як суфікса до батьківського класу.

У звичайному CSS потрібно писати:

    .card {
        color: #222;

        & .card__title {
            font-size: 24px;
        }

        &:hover {
            border-color: blue;
        }
    }

Або оголосити `.card__title` окремо.

### Порівняння

| Можливість | Sass / SCSS | Нативний CSS |
|---|---|---|
| Вкладені селектори | Так | Так |
| `$variables` | Так | Ні |
| CSS Custom Properties | Так, можна використовувати | Так |
| `&:hover` | Так | Так |
| `&__title` для BEM | Так | Ні, не як Sass-суфікс |
| Міксини | Так | Немає Sass-подібного механізму |
| Функції користувача | Так | Немає аналогічної системи Sass |
| Цикли генерації CSS | Так | Немає Sass-подібних циклів |
| Модульна система Sass | Так | Немає прямого аналога `@use` |
| Компіляція потрібна | Так | Для звичайного нативного CSS Nesting — ні |

### Що варто вибрати

Для простих стилів, компонентів і невеликих проєктів можливостей сучасного CSS може бути достатньо.

Sass стає кориснішим, якщо проєкт активно використовує міксини, функції, карти, цикли або модульну систему.

---

# 18. Рекомендована архітектура SCSS-проєкту

Для середнього проєкту можна використовувати таку структуру:

    project/
    ├── index.html
    ├── css/
    │   └── styles.css
    ├── scss/
    │   ├── abstracts/
    │   │   ├── _variables.scss
    │   │   ├── _functions.scss
    │   │   ├── _mixins.scss
    │   │   └── _index.scss
    │   ├── base/
    │   │   ├── _reset.scss
    │   │   ├── _typography.scss
    │   │   ├── _base.scss
    │   │   └── _index.scss
    │   ├── layout/
    │   │   ├── _header.scss
    │   │   ├── _footer.scss
    │   │   ├── _grid.scss
    │   │   └── _index.scss
    │   ├── components/
    │   │   ├── _button.scss
    │   │   ├── _card.scss
    │   │   ├── _form.scss
    │   │   └── _index.scss
    │   ├── utilities/
    │   │   ├── _spacing.scss
    │   │   ├── _visibility.scss
    │   │   └── _index.scss
    │   └── styles.scss
    └── package.json

### Призначення папок

| Папка | Що зберігає |
|---|---|
| `abstracts/` | Змінні, функції, міксини, карти |
| `base/` | Reset, типографіку та базові правила |
| `layout/` | Структуру сторінки та великі блоки |
| `components/` | Кнопки, картки, форми та інші компоненти |
| `utilities/` | Допоміжні класи |
| `styles.scss` | Головну точку входу для компіляції |

Це один із варіантів структури, подібний до підходів, які часто використовують у Sass-проєктах.

Не обов'язково створювати всі папки відразу. Для невеликої вправи достатньо кількох файлів.

## 18.1. Файл `_variables.scss`

    $color-primary: #1769e0;
    $color-text: #222222;
    $color-border: #dddddd;

    $spacing-sm: 8px;
    $spacing-md: 16px;
    $spacing-lg: 24px;

    $radius-md: 8px;

## 18.2. Файл `_mixins.scss`

    @mixin flex-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }

## 18.3. Файл `_button.scss`

    @use "../abstracts/variables" as v;
    @use "../abstracts/mixins" as m;

    .button {
        @include m.flex-center;

        padding: v.$spacing-sm v.$spacing-md;
        border: none;
        border-radius: v.$radius-md;
        cursor: pointer;

        &--primary {
            background-color: v.$color-primary;
            color: white;
        }
    }

## 18.4. Файл `styles.scss`

    @use "base/reset";
    @use "base/typography";
    @use "layout/header";
    @use "components/button";
    @use "components/card";

Sass скомпілює CSS-правила, імпортовані через `@use`, у вихідний файл.

Зауваж: шлях `@use "base/reset"` відповідає файлу `base/_reset.scss`, якщо така структура існує відносно головного SCSS-файлу.

---

# 19. Практичний проєкт: картка курсу на SCSS

Створимо компонент картки навчального курсу.

## 19.1. Структура

    course-card/
    ├── index.html
    ├── css/
    │   └── styles.css
    ├── scss/
    │   ├── _variables.scss
    │   ├── _card.scss
    │   └── styles.scss
    └── package.json

## 19.2. Змінні

`_variables.scss`:

    $color-primary: #1769e0;
    $color-text: #222222;
    $color-muted: #666666;
    $color-border: #dddddd;

    $spacing-sm: 8px;
    $spacing-md: 16px;
    $spacing-lg: 24px;

    $radius-md: 8px;
    $radius-lg: 16px;

## 19.3. Компонент

`_card.scss`:

    @use "variables" as v;

    .course-card {
        overflow: hidden;
        border: 1px solid v.$color-border;
        border-radius: v.$radius-lg;
        background-color: white;

        &__image {
            display: block;
            width: 100%;
            aspect-ratio: 16 / 9;
            object-fit: cover;
        }

        &__content {
            padding: v.$spacing-lg;
        }

        &__title {
            margin: 0 0 v.$spacing-sm;
            color: v.$color-text;
            font-size: 1.25rem;
        }

        &__description {
            margin: 0 0 v.$spacing-md;
            color: v.$color-muted;
        }

        &__button {
            display: inline-block;
            padding: v.$spacing-sm v.$spacing-md;
            border-radius: v.$radius-md;
            background-color: v.$color-primary;
            color: white;
            text-decoration: none;

            &:hover {
                filter: brightness(0.9);
            }

            &:focus-visible {
                outline: 3px solid v.$color-primary;
                outline-offset: 3px;
            }
        }

        &--featured {
            border-color: v.$color-primary;
        }
    }

## 19.4. Головний файл

`styles.scss`:

    @use "card";

## 19.5. HTML

`index.html`:

    <!DOCTYPE html>
    <html lang="uk">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Картка курсу</title>

        <link rel="stylesheet" href="css/styles.css">
    </head>
    <body>
        <main>
            <article class="course-card course-card--featured">
                <img
                    class="course-card__image"
                    src="images/javascript.jpg"
                    alt="Навчальний курс JavaScript"
                >

                <div class="course-card__content">
                    <h2 class="course-card__title">
                        JavaScript для початківців
                    </h2>

                    <p class="course-card__description">
                        Вивчай основи JavaScript на практичних прикладах.
                    </p>

                    <a class="course-card__button" href="#">
                        Переглянути курс
                    </a>
                </div>
            </article>
        </main>
    </body>
    </html>

## 19.6. Компіляція

У корені проєкту виконай:

    npx sass scss/styles.scss css/styles.css

Для автоматичного оновлення:

    npx sass --watch scss/styles.scss:css/styles.css

Тепер змінюй SCSS-файли й перевіряй результат у браузері.

Зверни увагу: зображення `images/javascript.jpg` має існувати за вказаним шляхом. Для самої вправи можна використати будь-яке доступне зображення.

### Що ти практикуєш

- Sass Variables;
- `@use`;
- Partials;
- Nesting;
- `&` для BEM-класів;
- псевдокласи;
- організацію компонента;
- компіляцію SCSS у CSS.

---

# 20. Sass у сучасному frontend-проєкті

У сучасних проєктах Sass можна використовувати разом із:

- HTML і звичайним CSS;
- JavaScript;
- React;
- Next.js;
- Vite;
- CSS Modules.

Наприклад, у React-компоненті можна використовувати SCSS Modules, якщо відповідне налаштування підтримується інструментами проєкту.

Приклад структури:

    src/
    ├── components/
    │   └── Button/
    │       ├── Button.tsx
    │       └── Button.module.scss
    └── app/

`Button.module.scss`:

    .button {
        padding: 10px 16px;
        border: none;
        border-radius: 8px;
        cursor: pointer;

        &--primary {
            background-color: #1769e0;
            color: white;
        }
    }

Проте для CSS Modules важливо враховувати локальне зіставлення назв класів: у JavaScript-коді звертаються до експортованих класів модуля, а не обов'язково до буквального рядка.

Також варто перевіряти, чи конкретний framework та інструмент збірки підтримує Sass без додаткового налаштування.

**Важливо:** Sass не є обов'язковою умовою для React або Next.js. Звичайний CSS, CSS Modules і Sass — різні варіанти організації стилів, які можна вибирати відповідно до потреб проєкту.

---

# 21. Sass і продуктивність

Sass сам по собі не робить сторінку автоматично швидшою.

Після компіляції браузер працює з CSS. На продуктивність впливають розмір результату, складність селекторів, кількість стилів та інші чинники.

### Що варто робити

- Не генеруй зайві класи через цикли.
- Уникай надмірної вкладеності.
- Не дублюй великі блоки декларацій без потреби.
- Видаляй невикористані стилі.
- За потреби використовуй мінімізацію CSS.
- Перевіряй розмір згенерованого CSS.
- Використовуй міксини, `@extend` та інші можливості свідомо.

### Що не варто робити

- Не вважай будь-який SCSS кращим за CSS.
- Не додавай міксини для кожного маленького набору властивостей.
- Не створюй складну систему генерації, якщо достатньо кількох змінних.
- Не використовуй глибоку вкладеність замість зрозумілих класів.

---

# 22. Типові помилки під час роботи із Sass

## Помилка 1. Підключення SCSS безпосередньо до HTML

Неправильно для звичайного браузерного підключення:

    <link rel="stylesheet" href="scss/styles.scss">

Правильно:

    <link rel="stylesheet" href="css/styles.css">

Спочатку SCSS потрібно скомпілювати в CSS.

## Помилка 2. Забули запустити компіляцію

Ти змінив `styles.scss`, але сторінка не оновилася.

Можливі причини:

- Sass не був запущений повторно;
- не працює `--watch`;
- змінюється інший файл;
- HTML підключає інший CSS-файл.

Рішення: перевір команду компіляції та шлях у `<link>`.

## Помилка 3. Неправильний шлях у `@use`

Наприклад:

    @use "variables";

Якщо Sass не знаходить файл, перевір:

- відносний шлях від поточного файлу;
- назву файлу;
- наявність `_variables.scss`;
- правильність структури папок.

## Помилка 4. Занадто глибока вкладеність

Невдалий приклад:

    .page {
        .content {
            .sidebar {
                .card {
                    .title {
                        color: navy;
                    }
                }
            }
        }
    }

Краще:

    .card__title {
        color: navy;
    }

## Помилка 5. Зловживання міксинами

Якщо міксин дублює лише одне просте значення, змінна може бути кращим рішенням.

Не створюй абстракцію лише заради самої абстракції.

## Помилка 6. Використання застарілого `@import`

Для нових Sass-проєктів використовуй `@use` та `@forward`.

## Помилка 7. Плутанина між Sass Variables і CSS Custom Properties

    $primary-color: blue;

Це Sass-змінна.

    --primary-color: blue;

Це CSS Custom Property.

Вони мають різний синтаксис і різний час обробки.

## Помилка 8. Очікування, що браузер виконає Sass-код

Браузер не виконує Sass-цикли, міксини чи `$variables`.

Ці конструкції обробляються компілятором до того, як CSS потрапляє в браузер.

## Помилка 9. Надмірне ускладнення структури

Для одного маленького компонента не потрібні десятки модулів.

Починай із простого SCSS-файлу, а потім розділяй код, коли це справді покращує підтримку.

---

# 23. Чекліст для Sass-проєкту

## Налаштування

- [ ] Sass установлений або доступний через інструмент збірки.
- [ ] SCSS компілюється в CSS.
- [ ] HTML підключає правильний CSS-файл.
- [ ] Для розробки налаштовано команду `watch` або аналогічний механізм.

## Синтаксис

- [ ] Я розумію різницю між Sass і SCSS.
- [ ] Умію оголошувати та використовувати змінні.
- [ ] Розумію вкладеність і селектор `&`.
- [ ] Можу створити міксин із параметрами.
- [ ] Розумію призначення функцій.
- [ ] Умію читати цикли й інтерполяцію.
- [ ] Розумію, для чого використовуються Sass Maps.

## Модульність

- [ ] Код поділений на логічні модулі.
- [ ] Для нових проєктів використовується `@use`.
- [ ] Я розумію роль `@forward`.
- [ ] Шляхи між файлами правильні.
- [ ] Назви модулів зрозумілі.

## Якість CSS

- [ ] Вкладеність не надто глибока.
- [ ] Немає непотрібного дублювання.
- [ ] Згенерований CSS зрозумілий і не надмірно великий.
- [ ] Компоненти залишаються незалежними.
- [ ] Спільні значення організовані послідовно.

---

# 24. Питання для співбесіди

## Базовий рівень

**1. Що таке Sass?**

Sass — це CSS-препроцесор, який додає змінні, вкладеність, міксини, функції, цикли та модульні можливості.

**2. Чим Sass відрізняється від CSS?**

Sass має додаткові конструкції, які компілюються у звичайний CSS.

**3. У чому різниця між Sass і SCSS?**

Це два синтаксиси Sass. SCSS використовує фігурні дужки й крапки з комою, а indented Sass syntax визначає структуру відступами.

**4. Що таке Sass-змінні?**

Це змінні, які починаються з `$` і зберігають значення під час компіляції.

**5. Що таке nesting?**

Це вкладення CSS-правил усередині інших правил.

## Рівень Junior

**6. Що означає `&` у SCSS?**

Це посилання на батьківський селектор. Його можна використовувати для псевдокласів, станів і BEM-суфіксів.

**7. Що таке mixin?**

Це повторно використовуваний блок Sass-коду, який включають через `@include`.

**8. Чим міксин відрізняється від функції?**

Міксин зазвичай генерує CSS-декларації або правила. Функція повертає значення для використання у виразах.

**9. Навіщо потрібні partials?**

Вони дозволяють розділяти SCSS на менші файли й повторно використовувати модулі.

**10. Як підключити Sass-файл до іншого Sass-файлу?**

У сучасному Sass для цього зазвичай використовують `@use`, а для повторного експорту — `@forward`.

## Рівень Middle

**11. Чим `@use` відрізняється від `@import`?**

`@use` є сучасною модульною системою Sass, ізольовує простори імен і допомагає уникати конфліктів. Sass-директива `@import` застаріла.

**12. Коли використовувати `@extend`, а коли міксини?**

`@extend` об'єднує селектори й дає змогу повторно використати правила. Міксини включають декларації в місце використання. Вибір залежить від бажаного результату та структури CSS.

**13. Для чого потрібні Sass Maps?**

Для зберігання пов'язаних пар ключ-значення, наприклад кольорів або breakpoint-ів.

**14. Чим Sass Variables відрізняються від CSS Custom Properties?**

Sass-змінні обробляються під час компіляції, а CSS Custom Properties залишаються у браузері й можуть змінюватися через каскад.

**15. Чи потрібен Sass у кожному сучасному проєкті?**

Ні. Сучасний CSS має багато власних можливостей. Sass потрібен тоді, коли його додаткові інструменти справді спрощують розробку.

## Рівень Senior

**16. Як організувати великий Sass-проєкт?**

Розділити код на модулі за відповідальністю, використовувати `@use` та `@forward`, визначити правила іменування й обмежити глобальні залежності.

**17. Як контролювати розмір згенерованого CSS?**

Уникати зайвої генерації через цикли, контролювати дублювання, видаляти невикористані стилі та аналізувати результат компіляції.

**18. Які ризики надмірної вкладеності?**

Складні селектори, більша зв'язаність із HTML-структурою та важче перевизначення стилів.

**19. Як поєднати Sass із дизайн-системою?**

Використовувати модулі для токенів, функції й міксини для повторюваних шаблонів, а CSS Custom Properties — там, де потрібна динамічна зміна значень у браузері.

**20. Коли варто відмовитися від Sass?**

Коли його можливості не дають суттєвої користі, а нативного CSS достатньо для зрозумілої й підтримуваної архітектури.

---

# 25. Навчальний шлях: Core → Junior → Middle → Senior

## Core — основи

Потрібно вміти:

- Розуміти, навіщо потрібен Sass.
- Розрізняти Sass і SCSS.
- Установити Sass через npm.
- Скомпілювати SCSS у CSS.
- Використовувати змінні.
- Писати прості вкладені правила.

Практика: створи картку з кнопкою, кольоровими змінними й вкладеними станами `:hover` та `:focus-visible`.

## Junior — повторне використання

Потрібно вміти:

- Використовувати `@use`.
- Розділяти код на partials.
- Створювати міксини.
- Працювати з параметрами.
- Використовувати Sass Maps.
- Створювати прості цикли.
- Не допускати надмірної вкладеності.

Практика: створи невелику бібліотеку компонентів із кнопками, картками, формами й дизайн-токенами.

## Middle — модульність

Потрібно вміти:

- Проєктувати структуру SCSS-модулів.
- Використовувати `@forward`.
- Розуміти `@extend` і його наслідки.
- Створювати функції для повторюваних обчислень.
- Генерувати utility-класи за потреби.
- Поєднувати Sass зі звичайним CSS.
- Контролювати обсяг згенерованого CSS.

Практика: реорганізуй стилі багатосторінкового сайту в модулі з єдиними токенами.

## Senior — архітектура та компроміси

Потрібно вміти:

- Визначати, коли Sass виправданий, а коли достатньо CSS.
- Проєктувати масштабовану модульну систему.
- Підтримувати дизайн-систему.
- Контролювати глобальні залежності.
- Оцінювати результати компіляції.
- Проводити рефакторинг старого Sass-коду.
- Документувати правила використання Sass у команді.

Практика: створи документ Sass Architecture Guidelines для великого frontend-проєкту.

---

# 26. Мінішпаргалка

| Конструкція | Призначення |
|---|---|
| `$variable` | Sass-змінна |
| `#{...}` | Інтерполяція |
| `&` | Батьківський селектор |
| `@mixin` | Оголошення міксина |
| `@include` | Використання міксина |
| `@function` | Оголошення функції |
| `@return` | Повернення значення з функції |
| `@if` | Умова |
| `@else` | Альтернативна гілка |
| `@for` | Цикл із лічильником |
| `@each` | Ітерація по списку або карті |
| `@while` | Цикл за умовою |
| `@extend` | Повторне використання правил через селектори |
| `%placeholder` | Placeholder-селектор |
| `@use` | Підключення Sass-модуля |
| `@forward` | Повторне експортування модуля |
| `@content` | Вставлення переданого блоку в міксин |
| `sass:map` | Модуль роботи з картами |
| `sass:math` | Модуль математичних функцій |
| `--variable` | CSS Custom Property, не Sass-змінна |

## Основні команди

Установити Sass:

    npm install --save-dev sass

Одноразова компіляція:

    npx sass scss/styles.scss css/styles.css

Автоматична компіляція:

    npx sass --watch scss/styles.scss:css/styles.css

Компіляція для production:

    npx sass --style=compressed scss/styles.scss css/styles.css

Перевірка довідки:

    npx sass --help

## Базова структура

    scss/
    ├── abstracts/
    │   ├── _variables.scss
    │   ├── _functions.scss
    │   └── _mixins.scss
    ├── base/
    │   ├── _reset.scss
    │   └── _typography.scss
    ├── components/
    │   ├── _button.scss
    │   └── _card.scss
    └── styles.scss

---

# 27. Головне, що потрібно запам'ятати

1. **Sass — це препроцесор, який розширює можливості CSS.**
2. SCSS — найзручніший синтаксис для переходу від звичайного CSS.
3. Sass компілюється у звичайний CSS, який підключається до HTML.
4. Sass-змінні починаються з `$`, а CSS Custom Properties — з `--`.
5. Вкладеність допомагає групувати стилі, але надмірна вкладеність ускладнює підтримку.
6. `&` посилається на батьківський селектор і може використовуватися для псевдокласів та BEM-суфіксів.
7. Міксини допомагають повторно використовувати групи декларацій, а функції — обчислювати значення.
8. Partials розділяють код на менші файли.
9. `@use` та `@forward` — основа сучасної модульної системи Sass.
10. `@extend` потрібно використовувати свідомо, оскільки він може змінювати структуру селекторів у згенерованому CSS.
11. Цикли та карти корисні для дизайн-систем, але зайва генерація збільшує CSS.
12. Sass не замінює продуману CSS-архітектуру.
13. Не кожен проєкт потребує Sass: сучасного CSS може бути достатньо.
14. Важливо розуміти не лише SCSS-код, а й те, який CSS він генерує.

**Практичне правило:** спочатку впевнено опануй звичайний CSS, потім вивчи Sass Variables, Nesting, `@use`, Mixins і Functions. Переходь до циклів, карт та складної модульної архітектури тоді, коли вони допомагають розв'язувати реальні задачі.