# 02. Spacing Scale

Spacing Scale (шкала відступів) — це система заздалегідь визначених значень відстані, які використовуються для розташування елементів інтерфейсу та створення узгодженого простору між ними.

Spacing scale допомагає визначати:

    відступи всередині компонентів;
    відстані між елементами;
    відстані між групами елементів;
    внутрішні відступи карток;
    відстані між секціями сторінки;
    відступи контейнерів;
    відстані між полями форми;
    відстані між заголовками та текстом;
    відстані між кнопками;
    відступи для адаптивних інтерфейсів.

Замість використання довільних значень у кожному CSS-правилі можна створити узгоджену шкалу відступів.

Наприклад, без системи:

    .button {
        padding: 13px 21px;
    }

    .card {
        padding: 23px;
    }

    .form {
        gap: 17px;
    }

    .section {
        margin-bottom: 31px;
    }

Ці значення можуть працювати, але їх важче узгоджувати та підтримувати в усьому проєкті.

Зі spacing scale:

    :root {
        --spacing-1: 4px;
        --spacing-2: 8px;
        --spacing-3: 12px;
        --spacing-4: 16px;
        --spacing-5: 24px;
        --spacing-6: 32px;
    }

Використання:

    .button {
        padding: var(--spacing-3) var(--spacing-5);
    }

    .card {
        padding: var(--spacing-5);
    }

    .form {
        gap: var(--spacing-4);
    }

    .section {
        margin-bottom: var(--spacing-6);
    }

Тепер компоненти використовують спільну систему відступів.

Spacing scale є важливою частиною Design System і зазвичай реалізується через design tokens.

---

## Ключові поняття

✔ spacing  
✔ spacing scale  
✔ spacing token  
✔ spacing system  
✔ spacing unit  
✔ base unit  
✔ spacing step  
✔ spacing ratio  
✔ spacing increment  
✔ spacing rhythm  
✔ visual rhythm  
✔ consistency  
✔ whitespace  
✔ white space  
✔ padding  
✔ margin  
✔ gap  
✔ gutter  
✔ layout spacing  
✔ component spacing  
✔ section spacing  
✔ container spacing  
✔ vertical spacing  
✔ horizontal spacing  
✔ inline spacing  
✔ block spacing  
✔ nested spacing  
✔ spacing hierarchy  
✔ spacing relationship  
✔ spacing token naming  
✔ responsive spacing  
✔ fluid spacing  
✔ fixed spacing  
✔ spacing utility classes  
✔ CSS custom properties  
✔ design tokens  
✔ semantic spacing tokens  
✔ spacing documentation  

---

## Що потрібно пам'ятати

• Spacing scale — це узгоджений набір значень для відступів.

• Основна мета spacing scale — забезпечити послідовність відстаней в інтерфейсі.

• Spacing scale може бути побудована на базовому кроці, наприклад `4px`.

• Не всі spacing scales обов'язково мають використовувати однаковий крок або математичне співвідношення.

• CSS-властивість `padding` визначає внутрішній відступ елемента.

• CSS-властивість `margin` визначає зовнішній відступ елемента.

• CSS-властивість `gap` задає відстань між елементами в layout-контейнерах, наприклад Flexbox або Grid.

• Spacing tokens дозволяють повторно використовувати стандартні відстані.

• Маленькі відступи зазвичай використовуються між тісно пов'язаними елементами.

• Більші відступи допомагають візуально відокремлювати групи та секції.

• Відстані мають відповідати структурі та ієрархії інтерфейсу.

• Однакова відстань не завжди потрібна між усіма елементами.

• Spacing scale не означає, що кожен відступ повинен бути кратним одному числу без винятків.

• Для великих інтерфейсів корисно розрізняти відступи компонентів, груп і секцій.

• Responsive spacing дозволяє змінювати відступи залежно від доступного простору.

• Fluid spacing дозволяє відстаням плавно змінюватися залежно від розміру viewport.

• Spacing scale повинна спрощувати дизайн, а не створювати зайві обмеження.

---

# Що таке Spacing

Spacing — простір між елементами або навколо них.

У UI Design spacing використовується для організації структури, групування елементів і створення візуальної ієрархії.

Наприклад, картка може містити:

    Card
    ├── Image
    ├── Title
    ├── Description
    └── Button

Spacing визначає відстані:

    між Image та Title;
    між Title та Description;
    між Description та Button;
    між вмістом та межами Card;
    між Card та сусідніми компонентами.

Приклад:

    .card {
        padding: 24px;
    }

    .card__title {
        margin-bottom: 8px;
    }

    .card__description {
        margin-bottom: 16px;
    }

Тут:

    24px → простір усередині картки;
    8px  → відстань між заголовком і наступним елементом;
    16px → відстань після опису.

Spacing допомагає користувачеві зрозуміти, які елементи належать до однієї групи, а які є окремими частинами інтерфейсу.

---

# Що таке Spacing Scale

Spacing scale — обмежений набір стандартних значень відступів.

Наприклад:

    4px
    8px
    12px
    16px
    24px
    32px
    48px
    64px

Ці значення можуть використовуватися в різних компонентах.

Приклад:

    :root {
        --spacing-xs: 4px;
        --spacing-sm: 8px;
        --spacing-md: 16px;
        --spacing-lg: 24px;
        --spacing-xl: 32px;
        --spacing-2xl: 48px;
        --spacing-3xl: 64px;
    }

Використання:

    .button {
        padding: var(--spacing-sm) var(--spacing-lg);
    }

    .card {
        padding: var(--spacing-lg);
    }

    .section {
        padding-block: var(--spacing-2xl);
    }

Перевага полягає в тому, що різні компоненти використовують значення з однієї системи.

Важливо: spacing scale не повинна бути надто великою. Якщо кожен компонент має власний унікальний відступ, переваги системи зменшуються.

---

# Навіщо потрібна Spacing Scale

## 1. Consistency

Consistency — послідовність дизайну.

Якщо всі компоненти використовують узгоджену шкалу, інтерфейс виглядає ціліснішим.

Без системи:

    Card A padding: 19px
    Card B padding: 23px
    Card C padding: 21px

Зі системою:

    Card A padding: 24px
    Card B padding: 24px
    Card C padding: 24px

Однакові відступи доречні там, де компоненти мають однакову роль і структуру.

Водночас різні типи компонентів можуть використовувати різні значення.

---

## 2. Visual Hierarchy

Visual hierarchy — візуальна ієрархія.

Відстані допомагають показати важливість елементів і зв'язки між ними.

Наприклад:

    Title
       ↓ 8px
    Description
       ↓ 24px
    Related content
       ↓ 40px
    Next section

Менший відступ може вказувати на тісний зв'язок між заголовком та описом.

Більший відступ допомагає відокремити наступну групу.

Це не жорстке правило, а поширений дизайнерський прийом.

---

## 3. Maintainability

Maintainability — зручність підтримки коду.

Якщо відступи зберігаються в токенах, їх легше змінювати.

Наприклад:

    :root {
        --spacing-card: 24px;
    }

    .card {
        padding: var(--spacing-card);
    }

Якщо дизайн-система переходить на `32px`, достатньо змінити значення токена.

    :root {
        --spacing-card: 32px;
    }

Усі компоненти, що використовують цей токен, отримають новий відступ.

---

## 4. Scalability

Scalability — здатність системи розширюватися без втрати керованості.

Spacing scale дозволяє додавати нові компоненти, не вигадуючи для кожного нову систему відступів.

Наприклад:

    Button
    Card
    Input
    Modal
    Dropdown
    Navigation
    Form
    Section

Усі вони можуть використовувати спільні spacing tokens.

---

## 5. Faster Design Decisions

Spacing scale зменшує кількість рішень, які потрібно приймати під час розробки.

Замість запитання:

    Який відступ встановити?
    17px, 19px чи 22px?

Розробник обирає значення зі шкали:

    16px або 24px

Це пришвидшує роботу та допомагає підтримувати consistency.

---

# Base Unit

Base unit — базовий крок, який використовується для побудови spacing scale.

Наприклад, якщо базовий крок дорівнює `4px`, можна побудувати шкалу:

    4px
    8px
    12px
    16px
    20px
    24px
    32px
    40px
    48px

У цьому випадку багато значень кратні `4px`.

CSS:

    :root {
        --spacing-unit: 4px;

        --spacing-1: 4px;
        --spacing-2: 8px;
        --spacing-3: 12px;
        --spacing-4: 16px;
        --spacing-5: 20px;
        --spacing-6: 24px;
        --spacing-8: 32px;
        --spacing-10: 40px;
        --spacing-12: 48px;
    }

Base unit допомагає створити передбачувану систему.

### Чому часто використовують 4px

Крок `4px` дає змогу створювати достатньо дрібні відмінності між відступами.

Наприклад:

    4px  → дуже малий відступ;
    8px  → малий відступ;
    12px → проміжний відступ;
    16px → стандартний відступ;
    24px → великий відступ;
    32px → ще більший відступ.

Це поширений підхід, але не універсальна вимога.

### Чи можна використовувати base unit 8px?

Так.

Наприклад:

    8px
    16px
    24px
    32px
    40px
    48px
    64px

Така шкала може бути зручною для великих відстаней, але вона має менше дрібних кроків.

### Чи обов'язково всі значення повинні бути кратними base unit?

Ні.

Base unit допомагає побудувати систему, але окремі значення можуть відрізнятися від неї, якщо цього вимагають конкретний компонент, типографіка або особливості layout.

Головне — щоб винятки були обґрунтованими.

---

# Spacing Step

Spacing step — крок між значеннями шкали.

Наприклад:

    4px
    8px
    12px
    16px

Різниця між сусідніми значеннями становить `4px`.

Це лінійна шкала.

Інший приклад:

    4px
    8px
    16px
    32px
    64px

У цьому випадку кожне наступне значення вдвічі більше за попереднє.

Це геометрична шкала зі співвідношенням 2.

Spacing scale може бути:

    лінійною;
    геометричною;
    змішаною;
    спеціально підібраною для проєкту.

Не існує єдиної обов'язкової шкали для всіх інтерфейсів.

---

# Linear Spacing Scale

Linear spacing scale — шкала, у якій значення змінюються на однаковий крок.

Наприклад:

    4px
    8px
    12px
    16px
    20px
    24px
    28px
    32px

Різниця між сусідніми значеннями становить `4px`.

Приклад CSS:

    :root {
        --spacing-1: 4px;
        --spacing-2: 8px;
        --spacing-3: 12px;
        --spacing-4: 16px;
        --spacing-5: 20px;
        --spacing-6: 24px;
        --spacing-7: 28px;
        --spacing-8: 32px;
    }

Переваги:

    проста логіка;
    передбачувані кроки;
    легко додавати значення;
    зручно використовувати в невеликих проєктах.

Недолік: для великих відступів шкала може містити забагато значень, які рідко використовуються.

---

# Geometric Spacing Scale

Geometric spacing scale — шкала, у якій кожне наступне значення збільшується відповідно до певного співвідношення.

Наприклад:

    4px
    8px
    16px
    32px
    64px

Тут кожне значення приблизно вдвічі більше за попереднє.

Інший приклад із менш різким збільшенням:

    4px
    8px
    12px
    16px
    24px
    32px
    48px
    64px

Ця шкала є змішаною, а не строго геометричною.

Geometric scale допомагає отримати більші відстані без необхідності визначати кожен проміжний крок.

Її можна використовувати для:

    дрібних внутрішніх відступів;
    відстаней між групами;
    секцій сторінки;
    великих layout-відстаней.

Важливо вибирати співвідношення відповідно до потреб інтерфейсу, а не лише за математичним принципом.

---

# Fixed Spacing

Fixed spacing — відступи з фіксованими значеннями.

Наприклад:

    :root {
        --spacing-sm: 8px;
        --spacing-md: 16px;
        --spacing-lg: 24px;
    }

Використання:

    .card {
        padding: var(--spacing-lg);
    }

Переваги:

    передбачувані значення;
    просте керування;
    зрозуміла поведінка;
    зручність повторного використання.

Fixed spacing корисний для:

    кнопок;
    полів введення;
    іконок;
    компактних компонентів;
    стандартних відстаней між елементами.

Але однакові фіксовані відступи не завжди доречні для всіх розмірів екрана.

Наприклад, секція з `64px` вертикального padding може виглядати добре на desktop, але займати надто багато місця на вузькому мобільному екрані.

---

# Responsive Spacing

Responsive spacing — зміна відступів відповідно до розміру екрана або доступного простору.

Наприклад:

    :root {
        --page-padding: 16px;
        --section-spacing: 32px;
    }

    @media (min-width: 768px) {
        :root {
            --page-padding: 24px;
            --section-spacing: 48px;
        }
    }

    @media (min-width: 1200px) {
        :root {
            --page-padding: 32px;
            --section-spacing: 64px;
        }
    }

Використання:

    .container {
        padding-inline: var(--page-padding);
    }

    .section {
        padding-block: var(--section-spacing);
    }

На мобільних пристроях відступи менші.

На ширших екранах відступи можуть збільшуватися.

Переваги:

    краще використання доступного простору;
    менше зайвих відступів на мобільних пристроях;
    зрозуміла адаптивна поведінка;
    централізоване керування layout.

Responsive spacing не означає, що всі відступи потрібно змінювати на кожному breakpoint.

Змінюй лише ті значення, для яких адаптація справді покращує інтерфейс.

---

# Fluid Spacing

Fluid spacing — відступи, які плавно змінюються залежно від розміру viewport.

Для цього в CSS можна використовувати `clamp()`.

Синтаксис:

    clamp(minimum, preferred, maximum)

Приклад:

    :root {
        --section-spacing: clamp(32px, 5vw, 80px);
    }

Використання:

    .section {
        padding-block: var(--section-spacing);
    }

Тут:

    32px → мінімальний відступ;
    5vw  → бажане значення залежно від ширини viewport;
    80px → максимальний відступ.

Браузер обчислює значення так, щоб воно не було меншим за мінімум і більшим за максимум.

Інший приклад:

    :root {
        --page-padding: clamp(16px, 3vw, 40px);
        --card-gap: clamp(12px, 2vw, 24px);
    }

Fluid spacing може зменшити кількість media queries.

Але не кожен відступ повинен бути fluid.

Для компактних компонентів часто краще використовувати стабільні значення:

    --button-padding-y: 12px;
    --input-padding-x: 16px;

Для великих секцій можуть бути доречні fluid values:

    --section-spacing: clamp(32px, 5vw, 80px);

---

# Spacing Tokens

Spacing tokens — іменовані значення, які представляють відступи в дизайн-системі.

Наприклад:

    :root {
        --spacing-0: 0;
        --spacing-1: 4px;
        --spacing-2: 8px;
        --spacing-3: 12px;
        --spacing-4: 16px;
        --spacing-5: 24px;
        --spacing-6: 32px;
        --spacing-7: 48px;
        --spacing-8: 64px;
    }

Використання:

    .card {
        padding: var(--spacing-5);
    }

    .form {
        gap: var(--spacing-4);
    }

    .section {
        margin-block: var(--spacing-7);
    }

Переваги:

    повторне використання;
    узгоджені відступи;
    менше довільних значень;
    централізовані зміни;
    простіше документування.

### Чому токени кращі за довільні числа

Порівняй:

    .card {
        padding: 24px;
    }

І:

    .card {
        padding: var(--spacing-5);
    }

Перший варіант не обов'язково неправильний.

Але другий варіант показує, що значення походить зі спільної системи spacing.

Це особливо корисно у великих проєктах, де одні й ті самі правила використовуються в багатьох компонентах.

---

# Naming Conventions для Spacing Tokens

Naming conventions — правила іменування токенів.

Існують різні способи називати spacing tokens.

## 1. Числова шкала

    --spacing-1: 4px;
    --spacing-2: 8px;
    --spacing-3: 12px;
    --spacing-4: 16px;
    --spacing-5: 24px;

Переваги:

    компактні назви;
    зрозумілий порядок;
    легко додавати значення;
    не прив'язує назву до конкретного компонента.

Недолік: необхідно пам'ятати або переглядати значення відповідного номера.

## 2. Семантична шкала

    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;

Переваги:

    зрозумілі назви;
    легко використовувати в CSS;
    простіше читати код.

Недолік: назви `sm`, `md` та `lg` не завжди пояснюють точне співвідношення між значеннями.

## 3. Семантичні токени за призначенням

    --spacing-button-x: 20px;
    --spacing-button-y: 12px;
    --spacing-card: 24px;
    --spacing-section: 64px;

Переваги:

    назва пояснює призначення;
    можна окремо налаштовувати компоненти;
    простіше документувати спеціальні правила.

Недолік: якщо таких токенів занадто багато, система може стати надмірно складною.

### Який підхід вибрати?

Для навчального проєкту можна почати з числової або семантичної шкали:

    --spacing-1
    --spacing-2
    --spacing-3
    --spacing-4

Або:

    --spacing-sm
    --spacing-md
    --spacing-lg
    --spacing-xl

Пізніше, коли з'являться реальні компоненти, можна додати окремі семантичні токени для їхніх специфічних параметрів.

---

# Spacing Hierarchy

Spacing hierarchy — організація відстаней відповідно до структури інтерфейсу.

Умовно можна виділити кілька рівнів.

    1. Inline spacing
       Відстані між елементами в рядку.

    2. Component spacing
       Відстані всередині компонента.

    3. Group spacing
       Відстані між пов'язаними елементами або групами.

    4. Section spacing
       Відстані між великими секціями сторінки.

Приклад:

    Page
    ├── Header
    ├── Main
    │   ├── Section
    │   │   ├── Heading
    │   │   └── Card group
    │   │       ├── Card
    │   │       ├── Card
    │   │       └── Card
    │   └── Section
    └── Footer

Spacing може розподілятися так:

    Відстань між іконкою та текстом: 8px

    Відстань між заголовком і описом: 8px

    Відстань між картками: 16px

    Внутрішній padding картки: 24px

    Відстань між секціями: 48px

    Відступ навколо великих секцій: 64px

Це лише приклад.

Точні значення залежать від типографіки, щільності інтерфейсу та загального стилю дизайну.

---

# Spacing та Gestalt Proximity

Proximity — принцип близькості, згідно з яким елементи, розташовані близько один до одного, зазвичай сприймаються як пов'язані.

Spacing допомагає передавати ці зв'язки.

Наприклад:

    Product title
        ↓ 8px
    Product description
        ↓ 24px
    Related products

Менший відступ між заголовком та описом показує, що вони належать до однієї групи.

Більший відступ перед наступною групою допомагає відокремити її.

Це можна представити так:

    Малий spacing
        ↓
    Тісний зв'язок

    Великий spacing
        ↓
    Візуальне відокремлення

Це не означає, що відстань є єдиним способом передавати зв'язки.

Також використовуються:

    групування;
    межі;
    фонові кольори;
    типографіка;
    вирівнювання;
    візуальна ієрархія.

---

# Spacing та Whitespace

Whitespace — вільний простір навколо або між елементами інтерфейсу.

Також використовується термін negative space.

Whitespace не обов'язково має бути білим.

Це може бути простір будь-якого кольору фону, на якому немає візуально активних елементів.

Наприклад:

    Header

        Main heading

        Description

        Primary button


        Next section

Whitespace допомагає:

    покращувати читабельність;
    відокремлювати групи;
    зменшувати візуальне перевантаження;
    створювати ієрархію;
    спрямовувати увагу користувача.

Важливо не плутати whitespace зі spacing scale.

    Whitespace → простір у композиції

    Spacing scale → система стандартних значень відстані

Spacing scale допомагає послідовно керувати whitespace.

---

# Padding vs Margin vs Gap

Ці три CSS-механізми часто використовуються для керування відстанями.

## Padding

`padding` — внутрішній відступ між вмістом елемента та його внутрішньою межею.

    .card {
        padding: 24px;
    }

Відступ створюється всередині картки.

Типові випадки використання:

    внутрішній простір картки;
    простір усередині кнопки;
    внутрішні відступи input;
    відступи контейнера.

---

## Margin

`margin` — зовнішній відступ елемента.

    .section {
        margin-bottom: 32px;
    }

Він задає відстань за межами елемента.

Типові випадки використання:

    відстань між блоками;
    відокремлення секцій;
    локальне позиціонування елементів.

У сучасних layout-композиціях частину таких задач зручно вирішувати через `gap`, але `margin` залишається корисним.

---

## Gap

`gap` — відстань між елементами всередині Grid або Flexbox-контейнера.

    .card-list {
        display: flex;
        gap: 16px;
    }

Або:

    .card-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
    }

Переваги `gap`:

    просте керування відстанями між елементами;
    не потрібно призначати margin кожному елементу;
    зручна робота з Grid і Flexbox;
    менше спеціальних правил для останнього елемента.

### Порівняння

    padding → простір усередині елемента

    margin  → зовнішній відступ елемента

    gap     → простір між елементами layout-контейнера

---

# Spacing у Flexbox

Flexbox дозволяє розташовувати елементи в рядку або стовпці.

Spacing scale можна використовувати через `gap`.

Приклад:

    .navigation {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
    }

HTML:

    <nav class="navigation">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
    </nav>

Усі елементи матимуть однакову відстань між собою.

Для вертикального списку:

    .form-fields {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-lg);
    }

Відстань між полями форми визначається токеном.

### Різні горизонтальні та вертикальні відстані

CSS дозволяє задавати два значення `gap`:

    .navigation {
        display: flex;
        flex-wrap: wrap;
        column-gap: 24px;
        row-gap: 12px;
    }

Тут:

    column-gap → горизонтальна відстань між колонками або елементами рядка;

    row-gap → вертикальна відстань між рядками.

У Flexbox фактична вісь залежить від `flex-direction` і перенесення елементів.

---

# Spacing у CSS Grid

CSS Grid використовує `gap` для визначення відстаней між рядками та колонками.

Приклад:

    .product-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
    }

Це задає однакову відстань між рядками та колонками.

Можна визначити окремі значення:

    .product-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 24px;
        row-gap: 32px;
    }

Тут:

    column-gap: 24px → горизонтальна відстань;

    row-gap: 32px → вертикальна відстань.

З токенами:

    .product-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: var(--spacing-lg);
        row-gap: var(--spacing-xl);
    }

Так spacing scale використовується безпосередньо в layout.

---

# Spacing у компонентах

Компоненти можуть використовувати різні рівні spacing.

Наприклад, Button:

    .button {
        padding: 12px 20px;
    }

Card:

    .card {
        padding: 24px;
    }

Form:

    .form {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

Modal:

    .modal {
        padding: 32px;
    }

Ці значення можна представити через токени:

    :root {
        --spacing-sm: 8px;
        --spacing-md: 16px;
        --spacing-lg: 24px;
        --spacing-xl: 32px;

        --button-padding-y: 12px;
        --button-padding-x: 20px;
    }

    .button {
        padding: var(--button-padding-y) var(--button-padding-x);
    }

    .card {
        padding: var(--spacing-lg);
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
    }

    .modal {
        padding: var(--spacing-xl);
    }

Зверни увагу: значення `12px` і `20px` не обов'язково мають бути окремими елементами загальної spacing scale.

Їх можна залишити як спеціальні component tokens, якщо вони потрібні для конкретного компонента.

---

# Spacing для сторінки

На рівні сторінки spacing використовується для визначення:

    ширини та padding контейнера;
    відстаней між секціями;
    відстаней між заголовками та контентом;
    відступів навколо основних блоків;
    простору навколо footer;
    відстаней між великими групами елементів.

Приклад:

    :root {
        --page-padding: 24px;
        --section-spacing: 64px;
        --content-gap: 24px;
    }

    .page-container {
        width: min(100% - 48px, 1200px);
        margin-inline: auto;
    }

    .page-section {
        padding-block: var(--section-spacing);
    }

    .content-grid {
        display: grid;
        gap: var(--content-gap);
    }

У цьому прикладі `page-container` використовує горизонтальні відступи через формулу ширини.

Токен `--page-padding` оголошений, але не використаний. Щоб зробити код послідовним, можна переписати контейнер так:

    .page-container {
        width: min(
            calc(100% - 2 * var(--page-padding)),
            1200px
        );
        margin-inline: auto;
    }

Тепер `--page-padding` безпосередньо керує простором по краях.

У реальному проєкті синтаксис і структура контейнера можуть відрізнятися залежно від обраного layout-підходу.

---

# Spacing та Container

Container — елемент, який обмежує або організовує ширину контенту.

Spacing визначає відстань між контентом і краями доступного простору.

Приклад:

    :root {
        --container-padding: 16px;
        --container-max-width: 1200px;
    }

    .container {
        width: calc(100% - 2 * var(--container-padding));
        max-width: var(--container-max-width);
        margin-inline: auto;
    }

Тут:

    --container-padding → відступ від країв viewport;

    --container-max-width → максимальна ширина контейнера.

Ці параметри пов'язані, але мають різні ролі.

Spacing scale може визначати стандартні значення container padding.

Максимальна ширина контейнера зазвичай належить до системи розмірів або layout tokens.

---

# Nested Spacing

Nested spacing — відступи в елементах, які вкладені один в одного.

Наприклад:

    Page
    └── Card
        └── Card content
            ├── Heading
            ├── Description
            └── Actions

Кожен рівень може мати власні відступи.

    .card {
        padding: 24px;
    }

    .card__content {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .card__actions {
        display: flex;
        gap: 8px;
    }

Тут:

    24px → padding картки;

    12px → відстань між основними елементами вмісту;

    8px → відстань між кнопками.

Важливо не накопичувати надто багато великих відступів у вкладених контейнерах.

Наприклад, якщо картка має `24px` padding, а вкладений блок також має `24px` padding без необхідності, загальний простір може стати надмірним.

Використовуй spacing відповідно до структури компонентів.

---

# Spacing та Typography

Typography і spacing тісно пов'язані.

Відстань між текстовими елементами залежить від:

    розміру шрифту;
    line-height;
    довжини тексту;
    ієрархії заголовків;
    щільності контенту;
    ширини контейнера.

Наприклад:

    .article-title {
        margin-bottom: 8px;
    }

    .article-description {
        margin-bottom: 24px;
    }

Між заголовком та описом менша відстань, ніж між описом і наступним блоком.

Для списку:

    .article-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

Необхідно перевіряти spacing разом із реальною типографікою.

Однакове значення `16px` може виглядати по-різному залежно від розміру шрифту, line-height і візуальної щільності компонента.

---

# Spacing Density

Density — щільність розташування елементів інтерфейсу.

Умовно можна виділити:

    Compact
    Comfortable
    Spacious

## Compact

Компактний інтерфейс використовує менші відступи.

Приклад:

    :root {
        --spacing-component: 8px;
        --spacing-group: 12px;
    }

Може бути доречним для:

    таблиць;
    панелей адміністрування;
    інтерфейсів із великою кількістю даних;
    компактних списків.

## Comfortable

Помірна щільність.

    :root {
        --spacing-component: 12px;
        --spacing-group: 16px;
    }

Може бути доречною для:

    звичайних форм;
    карток;
    dashboard;
    стандартних вебзастосунків.

## Spacious

Великі відступи та більше вільного простору.

    :root {
        --spacing-component: 16px;
        --spacing-group: 24px;
    }

Може бути доречним для:

    landing pages;
    презентаційних сторінок;
    промосторінок;
    мінімалістичних інтерфейсів.

Це умовні приклади, а не стандартизовані значення.

Щільність повинна відповідати задачам користувача, кількості інформації та типу інтерфейсу.

---

# Spacing та Design Tokens

Spacing scale зазвичай реалізується через design tokens.

Наприклад:

    :root {
        --spacing-1: 4px;
        --spacing-2: 8px;
        --spacing-3: 12px;
        --spacing-4: 16px;
        --spacing-5: 24px;
        --spacing-6: 32px;
        --spacing-7: 48px;
        --spacing-8: 64px;
    }

Ці токени можуть використовуватися на різних рівнях.

    Primitive spacing tokens
          ↓
    Semantic spacing tokens
          ↓
    Component spacing tokens
          ↓
    Components and layouts

Приклад:

    :root {
        /* Base scale */
        --spacing-4: 16px;
        --spacing-5: 24px;
        --spacing-6: 32px;

        /* Semantic spacing */
        --spacing-content: var(--spacing-4);
        --spacing-card: var(--spacing-5);
        --spacing-section: var(--spacing-6);
    }

    .card {
        padding: var(--spacing-card);
    }

    .section {
        padding-block: var(--spacing-section);
    }

Тут загальна шкала відокремлена від призначення конкретних відступів.

Це може бути корисним для великих проєктів.

Для невеликого навчального проєкту можна почати з одного рівня токенів і додати семантичні назви пізніше.

---

# Практичний приклад — створюємо Spacing Scale

Створимо базову шкалу для навчального UI-проєкту.

## Крок 1. Створюємо файл

    styles/
        tokens.css

## Крок 2. Оголошуємо spacing tokens

    /* styles/tokens.css */

    :root {
        --spacing-0: 0;
        --spacing-1: 4px;
        --spacing-2: 8px;
        --spacing-3: 12px;
        --spacing-4: 16px;
        --spacing-5: 24px;
        --spacing-6: 32px;
        --spacing-7: 48px;
        --spacing-8: 64px;
    }

## Крок 3. Використовуємо шкалу

    .navigation {
        display: flex;
        gap: var(--spacing-4);
    }

    .button {
        padding: var(--spacing-3) var(--spacing-5);
    }

    .card {
        padding: var(--spacing-5);
    }

    .card-list {
        display: grid;
        gap: var(--spacing-4);
    }

    .section {
        padding-block: var(--spacing-7);
    }

## Крок 4. Перевіряємо результат

Переконайся, що:

    відступи повторно використовуються;
    компоненти мають зрозумілі відстані;
    дрібні та великі відступи відрізняються за призначенням;
    секції візуально відокремлені;
    layout залишається читабельним на різних екранах.

## Крок 5. За потреби додаємо semantic spacing tokens

    :root {
        --spacing-card: var(--spacing-5);
        --spacing-form-fields: var(--spacing-4);
        --spacing-section: var(--spacing-7);
    }

Використання:

    .card {
        padding: var(--spacing-card);
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-form-fields);
    }

    .section {
        padding-block: var(--spacing-section);
    }

Тепер значення можна змінювати відповідно до призначення.

---

# Практичний приклад — Card Grid

Створимо сітку карток.

HTML:

    <section class="section">
        <div class="container">
            <h2 class="section__title">Our services</h2>

            <div class="card-grid">
                <article class="card">
                    <h3 class="card__title">Design</h3>
                    <p class="card__description">
                        Create consistent interfaces.
                    </p>
                </article>

                <article class="card">
                    <h3 class="card__title">Development</h3>
                    <p class="card__description">
                        Build reusable components.
                    </p>
                </article>

                <article class="card">
                    <h3 class="card__title">Testing</h3>
                    <p class="card__description">
                        Check interface quality.
                    </p>
                </article>
            </div>
        </div>
    </section>

CSS:

    :root {
        --spacing-2: 8px;
        --spacing-3: 12px;
        --spacing-4: 16px;
        --spacing-5: 24px;
        --spacing-6: 32px;
        --spacing-7: 48px;

        --radius-card: 12px;
        --color-border: #e5e7eb;
        --color-surface: #ffffff;
    }

    .section {
        padding-block: var(--spacing-7);
    }

    .container {
        width: min(calc(100% - 32px), 1200px);
        margin-inline: auto;
    }

    .section__title {
        margin: 0 0 var(--spacing-5);
    }

    .card-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: var(--spacing-5);
    }

    .card {
        padding: var(--spacing-5);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-card);
        background-color: var(--color-surface);
    }

    .card__title {
        margin: 0 0 var(--spacing-3);
    }

    .card__description {
        margin: 0;
    }

У цьому прикладі:

    48px → вертикальні відступи секції;

    24px → відстань між картками;

    24px → внутрішній padding картки;

    24px → відстань після заголовка секції;

    12px → відстань між заголовком картки та описом.

Зверни увагу: однакові значення можуть використовуватися для різних цілей, якщо це відповідає системі дизайну.

---

# Практичний приклад — Responsive Spacing для Card Grid

Розширимо попередній приклад.

    .container {
        width: min(calc(100% - 32px), 1200px);
        margin-inline: auto;
    }

    .card-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--spacing-4);
    }

    .section {
        padding-block: var(--spacing-5);
    }

    @media (min-width: 600px) {
        .card-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: var(--spacing-5);
        }

        .section {
            padding-block: var(--spacing-6);
        }
    }

    @media (min-width: 1000px) {
        .card-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .section {
            padding-block: var(--spacing-7);
        }
    }

Тепер:

    Mobile → одна колонка та менші відступи;

    Tablet → дві колонки та більші відступи;

    Desktop → три колонки.

Це один із можливих варіантів responsive spacing.

Не обов'язково змінювати всі відступи на кожному breakpoint. Адаптуй лише ті, які впливають на читабельність і композицію.

---

# Практичний приклад — Fluid Section Spacing

Якщо відступ секції повинен плавно збільшуватися зі зростанням viewport, можна використати `clamp()`.

    :root {
        --section-spacing: clamp(32px, 6vw, 80px);
    }

    .section {
        padding-block: var(--section-spacing);
    }

Тут:

    32px → мінімальне значення;

    6vw → бажане значення;

    80px → максимальне значення.

Перевага полягає в тому, що відступ поступово змінюється без необхідності створювати кілька breakpoint.

Такий підхід особливо корисний для великих секцій, але не завжди потрібний для компактних компонентів.

---

# Практичний приклад — Form Spacing

Форми часто потребують послідовних відстаней між полями, labels, підказками та кнопками.

HTML:

    <form class="form">
        <div class="form__field">
            <label for="email">Email</label>
            <input id="email" type="email">
            <p class="form__hint">Enter your email address.</p>
        </div>

        <div class="form__field">
            <label for="password">Password</label>
            <input id="password" type="password">
        </div>

        <button type="submit">Sign in</button>
    </form>

CSS:

    :root {
        --spacing-1: 4px;
        --spacing-2: 8px;
        --spacing-3: 12px;
        --spacing-4: 16px;
        --spacing-5: 24px;
    }

    .form {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-5);
    }

    .form__field {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-2);
    }

    .form__hint {
        margin: 0;
        font-size: 14px;
    }

    .form input {
        padding: var(--spacing-3);
    }

У цьому прикладі:

    8px  → відстань між label, input і підказкою;

    24px → відстань між групами полів;

    12px → внутрішній padding input.

Spacing scale допомагає зробити форму послідовною та читабельною.

---

# Типові помилки

## 1. Використовувати довільні значення без системи

❌ Приклад:

    .card {
        padding: 19px;
    }

    .modal {
        padding: 27px;
    }

    .section {
        padding: 39px;
    }

Якщо такі значення не мають дизайнерського обґрунтування, краще використовувати спільну шкалу.

    .card {
        padding: var(--spacing-5);
    }

    .modal {
        padding: var(--spacing-6);
    }

    .section {
        padding: var(--spacing-7);
    }

---

## 2. Використовувати один відступ для всього

❌ Приклад:

    * {
        margin: 16px;
    }

Такий підхід створює проблеми з layout, формами, списками, контейнерами та іншими елементами.

Різні компоненти мають різні потреби у spacing.

Краще визначати відступи відповідно до структури:

    .card {
        padding: var(--spacing-5);
    }

    .form {
        gap: var(--spacing-4);
    }

    .section {
        padding-block: var(--spacing-7);
    }

---

## 3. Плутати padding і margin

❌ Приклад:

    .card {
        margin: 24px;
    }

Якщо потрібно створити простір усередині картки, `margin` не розв'язує цю задачу.

Правильно:

    .card {
        padding: 24px;
    }

Якщо потрібно відокремити картку від сусіднього елемента, може бути доречним `margin` або `gap`.

---

## 4. Використовувати margin замість gap у кожному елементі

❌ Приклад:

    .navigation a {
        margin-right: 16px;
    }

Це може вимагати додаткових правил для останнього елемента.

Якщо навігація є Flexbox-контейнером, часто простіше:

    .navigation {
        display: flex;
        gap: var(--spacing-4);
    }

`margin` при цьому не стає неправильним. Важливо вибирати механізм, який найкраще відповідає структурі layout.

---

## 5. Створювати занадто велику spacing scale

❌ Приклад:

    --spacing-1: 4px;
    --spacing-2: 5px;
    --spacing-3: 6px;
    --spacing-4: 7px;
    --spacing-5: 8px;
    --spacing-6: 9px;
    --spacing-7: 10px;

Якщо значення майже не відрізняються і не мають чіткого призначення, вибір токена стає складнішим.

Краще почати з компактної шкали та розширювати її за потреби.

---

## 6. Створювати надто малу spacing scale

Якщо є лише:

    8px
    16px

може бути складно налаштовувати дуже компактні компоненти або великі секції.

Краще передбачити кілька значень для різних масштабів інтерфейсу.

---

## 7. Вважати, що всі відступи мають бути кратними 8px

Це не обов'язкова вимога.

Наприклад:

    4px
    12px
    20px

можуть бути цілком доречними, якщо відповідають дизайн-системі.

Кратність `4px` або `8px` — це спосіб організації шкали, а не універсальне правило.

---

## 8. Використовувати великі відступи на мобільних пристроях

Великі відступи можуть займати надто багато доступного простору на вузькому екрані.

Наприклад:

    .section {
        padding-block: 80px;
    }

На мобільних пристроях це може зменшити простір для корисного контенту.

Можна використати адаптивне значення:

    .section {
        padding-block: clamp(32px, 6vw, 80px);
    }

Або змінювати значення через media queries.

---

## 9. Зменшувати spacing без урахування читабельності

Компактний інтерфейс не завжди є кращим.

Надто малі відступи можуть:

    ускладнювати читання;
    створювати візуальне перевантаження;
    погіршувати групування;
    зменшувати зручність взаємодії;
    ускладнювати користування сенсорними екранами.

Spacing потрібно перевіряти на реальних компонентах.

---

## 10. Не враховувати вкладені відступи

Якщо кілька вкладених елементів мають великий padding, загальний простір може стати надмірним.

Перевіряй композицію на рівні всієї структури, а не лише кожного елемента окремо.

---

## 11. Створювати токени без зрозумілих назв

❌ Приклад:

    --a: 8px;
    --b: 16px;
    --c: 24px;

Краще:

    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;

Або:

    --spacing-2: 8px;
    --spacing-4: 16px;
    --spacing-5: 24px;

Важлива послідовність обраної конвенції.

---

## 12. Використовувати spacing scale як жорстке обмеження

Spacing scale має спрощувати роботу, а не забороняти обґрунтовані дизайнерські рішення.

Якщо компонент справді потребує спеціального значення, його можна додати окремо.

Головне — не перетворювати винятки на неконтрольовану систему довільних чисел.

---

# Питання зі співбесіди

Що таке spacing?

Що таке spacing scale?

Навіщо потрібна spacing scale?

Що таке base unit?

Чому часто використовують крок 4px?

Чи обов'язково всі відступи повинні бути кратними 4px або 8px?

Що таке spacing token?

Що таке spacing step?

Чим linear spacing scale відрізняється від geometric spacing scale?

Що таке fixed spacing?

Що таке responsive spacing?

Що таке fluid spacing?

Як працює `clamp()`?

Чим відрізняються `padding`, `margin` і `gap`?

Коли краще використовувати `gap`?

Як застосувати spacing tokens у Flexbox?

Як застосувати spacing tokens у CSS Grid?

Як spacing впливає на visual hierarchy?

Як proximity пов'язаний із spacing?

Що таке whitespace?

Як spacing scale допомагає підтримувати consistency?

Як spacing впливає на читабельність?

Що таке spacing density?

Яка різниця між compact, comfortable і spacious layouts?

Як організувати spacing tokens у CSS?

Чим числові назви токенів відрізняються від семантичних?

Чи потрібно створювати окремий токен для кожного відступу?

Як адаптувати spacing для мобільних пристроїв?

Як spacing впливає на вкладені компоненти?

Як визначити, що spacing scale є надто великою?

Як визначити, що spacing scale є недостатньою?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке spacing.

Що таке spacing scale.

Навіщо потрібна система відступів.

Що таке base unit.

Принцип узгоджених spacing values.

Базові значення:

    4px
    8px
    12px
    16px
    24px
    32px
    48px
    64px

Розуміння:

    padding
    margin
    gap

Використання spacing tokens через CSS custom properties.

Основи візуальної ієрархії.

Відстані між заголовками, текстом та кнопками.

Розуміння того, як spacing впливає на читабельність.

Основи Flexbox gap.

Основи Grid gap.

---

## 🔵 Junior — впевнене практичне використання

Створення власної spacing scale.

Вибір base unit.

Розуміння різниці між linear та geometric scales.

Використання spacing tokens у компонентах.

Організація spacing для:

    buttons
    cards
    forms
    navigation
    modals
    sections
    containers

Використання semantic spacing tokens.

Розуміння spacing hierarchy.

Розуміння proximity та whitespace.

Створення responsive spacing.

Використання `clamp()` для fluid spacing.

Адаптація відступів для мобільних пристроїв.

Вибір між padding, margin та gap.

Уникнення зайвого дублювання значень.

Перевірка композиції вкладених компонентів.

---

## 🟠 Middle — системний підхід

Розробка spacing scale для великого проєкту.

Визначення naming conventions.

Створення semantic spacing tokens.

Створення component-specific spacing tokens.

Організація spacing за рівнями:

    inline
    component
    group
    section
    page

Підтримка кількох варіантів щільності:

    compact
    comfortable
    spacious

Визначення responsive spacing rules.

Поєднання fixed і fluid spacing.

Документування spacing guidelines.

Контроль за надмірною кількістю токенів.

Рефакторинг неузгоджених відступів.

Створення spacing utilities за потреби.

Узгодження spacing між дизайн-макетами та CSS.

---

## 🔴 Senior — архітектура дизайн-систем

Проєктування масштабованої spacing system.

Управління spacing tokens у багатокомпонентних системах.

Стандартизація spacing conventions між командами.

Розробка правил для різних продуктів і брендів.

Управління змінами spacing tokens.

Міграція між версіями spacing scale.

Інтеграція spacing tokens у design-to-code процес.

Автоматизація генерації spacing utilities.

Визначення винятків та правил їх погодження.

Оцінювання впливу змін spacing на всі компоненти.

Баланс між системністю та гнучкістю.

Оптимізація дизайн-системи без надмірної абстракції.

---

# Міні-шпаргалка

## Spacing Scale

    4px
    8px
    12px
    16px
    24px
    32px
    48px
    64px

    → узгоджена шкала відступів

---

## Base Unit

    Base unit = 4px

    1 step → 4px
    2 steps → 8px
    3 steps → 12px
    4 steps → 16px

    → один із можливих способів побудови шкали

---

## CSS Tokens

    :root {
        --spacing-1: 4px;
        --spacing-2: 8px;
        --spacing-3: 12px;
        --spacing-4: 16px;
        --spacing-5: 24px;
        --spacing-6: 32px;
    }

---

## Padding

    .card {
        padding: var(--spacing-5);
    }

    → внутрішній простір

---

## Margin

    .section {
        margin-bottom: var(--spacing-6);
    }

    → зовнішній відступ

---

## Gap

    .card-grid {
        display: grid;
        gap: var(--spacing-5);
    }

    → відстань між елементами Grid

---

## Responsive Spacing

    :root {
        --section-spacing: 32px;
    }

    @media (min-width: 768px) {
        :root {
            --section-spacing: 48px;
        }
    }

---

## Fluid Spacing

    :root {
        --section-spacing: clamp(32px, 5vw, 80px);
    }

    → плавна зміна відступу

---

## Spacing Hierarchy

    Inline
       ↓
    Component
       ↓
    Group
       ↓
    Section
       ↓
    Page

---

## Основні правила

    Spacing scale → система відступів

    Base unit → базовий крок

    Spacing token → іменоване значення відступу

    Padding → внутрішній простір

    Margin → зовнішній відступ

    Gap → відстань між елементами layout-контейнера

    Fixed spacing → фіксований відступ

    Responsive spacing → відступ залежно від viewport або layout

    Fluid spacing → плавна зміна відступу

    Whitespace → вільний простір у композиції

    Proximity → близькість пов'язаних елементів

    Consistency → послідовне використання правил

---

# Головне

• Spacing scale — це система узгоджених значень відступів.

• Вона допомагає підтримувати consistency, visual hierarchy та maintainability.

• Base unit може дорівнювати `4px`, `8px` або іншому значенню, яке відповідає потребам проєкту.

• Linear scale використовує однаковий крок між значеннями.

• Geometric scale збільшує значення за певним співвідношенням.

• Fixed spacing використовує фіксовані значення.

• Responsive spacing змінюється залежно від доступного простору або breakpoint.

• Fluid spacing може реалізовуватися через `clamp()`.

• Spacing tokens дозволяють повторно використовувати відступи в різних компонентах.

• `padding` створює внутрішній простір елемента.

• `margin` визначає зовнішній відступ.

• `gap` визначає відстань між елементами Flexbox або Grid-контейнера.

• Маленькі відступи часто використовуються між тісно пов'язаними елементами.

• Більші відступи можуть відокремлювати групи та секції.

• Spacing впливає на proximity, whitespace, читабельність і візуальну ієрархію.

• Не всі компоненти повинні використовувати однакові відступи.

• Не кожне CSS-значення потрібно перетворювати на spacing token.

• Надто велика spacing scale ускладнює вибір, а надто мала може обмежувати гнучкість.

• Responsive spacing потрібно перевіряти на реальних розмірах екрана.

• Основна мета spacing scale — зробити інтерфейс послідовним, зрозумілим і простим для підтримки.

• Хороша spacing system поєднує стандартизацію з можливістю обґрунтованих винятків.

---

# Наступна тема

    03-color-tokens

У наступній темі розглядаються color tokens: як організувати палітру кольорів, відокремити базові кольори від семантичних, створити узгоджені назви та використовувати токени кольорів у компонентах і темах інтерфейсу.