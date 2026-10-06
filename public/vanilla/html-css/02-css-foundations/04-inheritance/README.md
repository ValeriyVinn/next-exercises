# 04. Inheritance

CSS Inheritance (успадкування) — це механізм CSS, за допомогою якого певні властивості елемента можуть автоматично отримувати значення від його parent element.

Наприклад:

    <div class="parent">
        <p>Hello</p>
    </div>

CSS:

    .parent {
        color: blue;
    }

У `<p>` немає власного:

    color

але текст буде синім, тому що `color` успадковується від parent:

    .parent
        ↓
    <p>

Успадкування є одним із фундаментальних механізмів CSS і особливо важливе для:

- `color`;
- `font-family`;
- `font-size`;
- `line-height`;
- typography;
- CSS custom properties;
- component styling;
- design systems.

---

### Ключові поняття

✔ inheritance  
✔ inherited property  
✔ non-inherited property  
✔ parent element  
✔ child element  
✔ ancestor  
✔ descendant  
✔ computed value  
✔ used value  
✔ initial value  
✔ specified value  
✔ inherited value  
✔ `inherit`  
✔ `initial`  
✔ `unset`  
✔ `revert`  
✔ `revert-layer`  
✔ `color`  
✔ `font-family`  
✔ `font-size`  
✔ `line-height`  
✔ `background`  
✔ `border`  
✔ `margin`  
✔ `padding`  
✔ `width`  
✔ CSS custom properties  
✔ `var()`  
✔ inheritance chain  
✔ inheritance override  
✔ inheritance debugging  

---

### Що потрібно пам'ятати

• Inheritance дозволяє child element отримувати значення властивості від parent.

• Не всі CSS properties успадковуються.

• Типовими inherited properties є:

    color
    font-family
    font-size
    font-style
    font-weight
    line-height
    text-align
    visibility

• Типовими non-inherited properties є:

    margin
    padding
    border
    width
    height
    background
    position
    display

• Inheritance відбувається через parent → child.

• Якщо властивість не успадковується, child не отримує її значення автоматично від parent.

• `inherit` примусово змушує властивість отримати значення від parent.

• `initial` встановлює initial value властивості.

• `unset` поводиться як:

    inherit

для inherited properties і як:

    initial

для non-inherited properties.

• `revert` повертає значення до попереднього cascade origin.

• `revert-layer` повертає значення до попереднього cascade layer.

• Inheritance не потрібно плутати з cascade.

• CSS custom properties за замовчуванням успадковуються.

• Якщо child має власне declaration, inherited value може бути замінене.

• Inheritance проходить через дерево DOM.

• Якщо parent успадкував значення від свого parent, child може успадкувати вже це значення.

• Inheritance дуже важлива для typography.

• У CSS не потрібно вручну задавати `color` та `font-family` кожному дочірньому елементу, якщо вони можуть успадковуватися.

---

# What Is Inheritance

`Inheritance` — це передача значення CSS property від parent element до child element.

Наприклад:

    <div class="parent">
        <p>Hello</p>
    </div>

CSS:

    .parent {
        color: red;
    }

`p` не має власного `color`.

Тому:

    .parent
        ↓
    p
        ↓
    color: red

---

# Parent and Child

У HTML:

    <div>
        <p>Hello</p>
    </div>

`div` — parent element для `p`.

`p` — child element для `div`.

Схематично:

    div
     │
     └── p

Якщо властивість успадковується:

    div
     │
     └── p
         ↑
         inherited value

---

# Ancestor and Descendant

Ancestor — будь-який предок елемента.

Наприклад:

    <body>
        <main>
            <section>
                <p>Hello</p>
            </section>
        </main>
    </body>

Для `<p>`:

    section → parent
    main    → ancestor
    body    → ancestor

Для inheritance найближчим джерелом зазвичай є parent.

---

# Basic Inheritance Example

HTML:

    <div class="parent">
        <p>Hello</p>
    </div>

CSS:

    .parent {
        color: blue;
    }

`color` успадковується.

Тому:

    parent
        color: blue
          ↓
    child
        color: blue

---

# Inheritance Chain

Inheritance може проходити через декілька рівнів.

HTML:

    <body>
        <main>
            <section>
                <p>Hello</p>
            </section>
        </main>
    </body>

CSS:

    body {
        color: blue;
    }

Схематично:

    body
      ↓
    main
      ↓
    section
      ↓
    p

Якщо всі елементи не мають власного `color`, значення може пройти весь ланцюг:

    color: blue

---

# Inheritance Chain Example

    body {
        color: blue;
    }

    <body>
        <main>
            <section>
                <p>Hello</p>
            </section>
        </main>
    </body>

У результаті:

    body  → blue
    main  → blue
    section → blue
    p     → blue

Тому що `color` успадковується.

---

# Inherited Properties

Inherited property — CSS property, яка за замовчуванням успадковує своє значення від parent.

Найважливіші приклади:

    color
    font-family
    font-size
    font-style
    font-weight
    line-height
    text-align
    text-transform
    letter-spacing
    visibility

---

# color

`color` є типовою inherited property.

Наприклад:

    body {
        color: #222;
    }

Усі дочірні елементи зазвичай отримають цей color, якщо не мають власного declaration.

HTML:

    <body>
        <h1>Title</h1>
        <p>Text</p>
        <button>Button</button>
    </body>

Не кожен element обов'язково виглядатиме однаково через власні browser styles, але `color` може успадковуватися.

---

# font-family

`font-family` успадковується.

Наприклад:

    body {
        font-family: Arial, sans-serif;
    }

Дочірні елементи можуть успадкувати:

    font-family: Arial, sans-serif;

Тому часто достатньо визначити базовий font на:

    body

або іншому верхньому container.

---

# font-size

`font-size` також успадковується.

Наприклад:

    body {
        font-size: 16px;
    }

Якщо child не має власного `font-size`, він успадковує значення.

---

# font-weight

Наприклад:

    body {
        font-weight: 400;
    }

Child може успадкувати:

    font-weight: 400

Якщо child встановлює:

    font-weight: 700;

він більше не використовує inherited value.

---

# line-height

`line-height` може успадковуватися.

Наприклад:

    body {
        line-height: 1.5;
    }

Дочірні елементи можуть отримати:

    line-height: 1.5

Це дуже зручно для глобальної typography system.

---

# text-align

`text-align` є inherited property.

Наприклад:

    .container {
        text-align: center;
    }

Текст у дочірніх елементах може бути центрований:

    <div class="container">
        <h1>Title</h1>
        <p>Text</p>
    </div>

Якщо child не встановлює інше значення.

---

# Non-Inherited Properties

Non-inherited property — property, яка за замовчуванням не отримує значення від parent.

Типові приклади:

    margin
    padding
    border
    width
    height
    background
    display
    position
    top
    right
    bottom
    left

---

# margin Does Not Inherit

HTML:

    <div class="parent">
        <p>Hello</p>
    </div>

CSS:

    .parent {
        margin: 50px;
    }

`p` не отримує автоматично:

    margin: 50px;

Він має власні margin rules, наприклад browser defaults можуть задавати margin для `<p>`.

---

# padding Does Not Inherit

    .parent {
        padding: 20px;
    }

Child не отримує автоматично:

    padding: 20px;

Padding належить parent, а не child.

---

# border Does Not Inherit

    .parent {
        border: 2px solid;
    }

Child не отримує цей border автоматично.

Border залишається border-ом parent.

---

# background Does Not Inherit

    .parent {
        background: black;
    }

Child не отримує автоматично:

    background: black;

Background property не є inherited property.

---

# width Does Not Inherit

    .parent {
        width: 500px;
    }

Child не отримує:

    width: 500px;

автоматично.

Child має власний layout context.

---

# height Does Not Inherit

    .parent {
        height: 300px;
    }

Child не успадковує:

    height: 300px;

автоматично.

---

# display Does Not Inherit

Наприклад:

    .parent {
        display: flex;
    }

Child не стає автоматично:

    display: flex;

`display` описує спосіб layout самого елемента.

---

# Inherited vs Non-Inherited

Зручно запам'ятати:

### Часто inherited

    color
    font-family
    font-size
    font-style
    font-weight
    line-height
    text-align
    text-transform
    letter-spacing

### Часто non-inherited

    margin
    padding
    border
    background
    width
    height
    display
    position

---

# Important Distinction

Не потрібно вчити inheritance як правило:

    "все, що стосується тексту, успадковується"

Це лише корисна приблизна модель.

Правильніше:

    кожна CSS property
        має власне inheritance behavior

Для точної роботи потрібно знати конкретну property.

---

# inherit

CSS має спеціальне значення:

    inherit

Воно примусово змушує property отримати computed value від parent.

Наприклад:

    .parent {
        color: blue;
    }

    .child {
        color: inherit;
    }

HTML:

    <div class="parent">
        <p class="child">Hello</p>
    </div>

Результат:

    blue

---

# inherit with Non-Inherited Property

`inherit` можна використовувати навіть для property, яка за замовчуванням не успадковується.

Наприклад:

    .parent {
        border-color: red;
    }

    .child {
        border-color: inherit;
    }

Тоді child отримає значення:

    border-color: red

Тобто:

    inherit

явно вмикає inheritance для конкретної declaration.

---

# inherit Example

HTML:

    <div class="parent">
        <button class="button">
            Save
        </button>
    </div>

CSS:

    .parent {
        color: blue;
    }

    .button {
        color: inherit;
    }

Button успадковує:

    color: blue

Це часто використовується для компонентів, які повинні відповідати кольору parent.

---

# Why inherit Is Useful

`inherit` корисний, коли потрібно:

    явно успадкувати значення
    ↓
    навіть якщо property normally не успадковується

Або коли потрібно зробити компонент залежним від context.

Наприклад:

    .button {
        color: inherit;
    }

---

# initial

`initial` встановлює initial value property.

Наприклад:

    p {
        color: initial;
    }

Це означає:

    використати initial value для color

Initial value визначена специфікацією CSS для конкретної property.

---

# initial vs inherit

`inherit`:

    отримати значення від parent

`initial`:

    використати initial value

Наприклад:

    .parent {
        color: red;
    }

    .child {
        color: inherit;
    }

Результат:

    red

А:

    .child {
        color: initial;
    }

встановлює initial value `color`, а не значення parent.

---

# unset

`unset` — універсальне CSS keyword.

Його поведінка залежить від того, чи property inherited.

Для inherited property:

    unset → inherit

Для non-inherited property:

    unset → initial

---

# unset Example

Для:

    color

який inherited:

    color: unset;

поводиться приблизно як:

    color: inherit;

Для:

    margin

який non-inherited:

    margin: unset;

поводиться як:

    margin: initial;

---

# inherit vs initial vs unset

Зручно запам'ятати:

    inherit
        ↓
    завжди parent

    initial
        ↓
    завжди initial value

    unset
        ↓
    inherited → inherit
    non-inherited → initial

---

# revert

`revert` повертає property до значення з попереднього рівня cascade.

Наприклад:

    button {
        all: revert;
    }

Це може дозволити повернути browser/user-agent styles замість author styles.

`revert` особливо корисний, коли потрібно відкотити власні стилі та повернути попередню cascade behavior.

---

# revert vs initial

Це дуже важлива різниця.

`initial`:

    → initial value CSS property

`revert`:

    → повернення до попереднього cascade origin

Наприклад:

    button {
        all: revert;
    }

може повернути стандартні browser styles для `<button>`.

А:

    button {
        all: initial;
    }

встановлює initial values для properties, що часто не збігаються з browser default styling.

---

# revert-layer

Сучасний CSS також має:

    revert-layer

Він повертає значення до того, що було визначено поза поточним cascade layer.

Наприклад:

    @layer base {
        .button {
            color: blue;
        }
    }

    @layer components {
        .button {
            color: red;
        }

        .button-reset {
            color: revert-layer;
        }
    }

`revert-layer` корисний у складних системах із `@layer`.

---

# Four Important Keywords

Основні global keywords:

    inherit
    initial
    unset
    revert

Сучасний CSS також має:

    revert-layer

Їхня ідея:

    inherit
        → parent

    initial
        → specification initial value

    unset
        → inherit OR initial

    revert
        → previous cascade origin

    revert-layer
        → previous cascade layer

---

# Inheritance and Cascade

Inheritance та cascade часто працюють разом.

Наприклад:

    body {
        color: blue;
    }

    p {
        color: red;
    }

HTML:

    <p>Hello</p>

Для `p` є:

    власне declaration → red
    inherited value    → blue

Власна declaration перемагає.

Результат:

    red

---

# Inherited Value vs Local Declaration

Схематично:

    parent
      ↓
    inherited value
      ↓
    child

Але якщо child має власне declaration:

    parent
      ↓
    inherited value

    child
      ↓
    local declaration

Тоді local declaration використовується.

---

# Example

    body {
        color: blue;
    }

    p {
        color: red;
    }

Для:

    <p>Hello</p>

маємо:

    body → blue
    p    → red

Результат:

    red

---

# No Declaration on Child

    body {
        color: blue;
    }

    p {
        /* no color */
    }

Тоді:

    body
      ↓
    p

і `p` може успадкувати:

    color: blue

---

# Child Override

    body {
        color: blue;
    }

    p {
        color: red;
    }

Тоді:

    body → blue
       ↓
    p → red

Child override-ить inherited value власним declaration.

---

# Deep Inheritance

HTML:

    <div class="theme">
        <section>
            <article>
                <p>Hello</p>
            </article>
        </section>
    </div>

CSS:

    .theme {
        color: purple;
    }

Можливий inheritance chain:

    .theme
       ↓
    section
       ↓
    article
       ↓
    p

У результаті:

    color: purple

---

# Breaking Inheritance

Inheritance можна перервати власним declaration.

Наприклад:

    .theme {
        color: purple;
    }

    p {
        color: black;
    }

Тепер:

    .theme → purple
       ↓
    p → black

---

# Inheritance and Typography

Inheritance особливо корисне для typography.

Наприклад:

    body {
        font-family: system-ui, sans-serif;
        color: #222;
        line-height: 1.5;
    }

Замість:

    h1 {
        font-family: system-ui, sans-serif;
    }

    h2 {
        font-family: system-ui, sans-serif;
    }

    p {
        font-family: system-ui, sans-serif;
    }

    li {
        font-family: system-ui, sans-serif;
    }

можна дозволити цим properties успадковуватися.

---

# Typography Example

    body {
        font-family: Arial, sans-serif;
        color: #222;
        line-height: 1.5;
    }

    article {
        max-width: 70ch;
    }

    h1 {
        font-size: 2rem;
    }

    p {
        margin-bottom: 1rem;
    }

Тут:

    font-family
    color
    line-height

можуть успадковуватися.

А:

    margin
    font-size

можуть бути перевизначені окремими elements.

---

# Why Inheritance Is Useful

Без inheritance довелося б повторювати:

    color
    font-family
    line-height

на великій кількості елементів.

Inheritance дозволяє створити базовий context:

    body
        ↓
    page
        ↓
    components

і автоматично передавати частину properties.

---

# Inheritance and Components

Наприклад:

    body {
        font-family: system-ui, sans-serif;
        color: #222;
    }

    .card {
        ...
    }

    .card-title {
        ...
    }

`.card-title` може успадкувати:

    font-family
    color

якщо не встановлює власні значення.

---

# Button and Inheritance

Browser buttons часто мають власні styles.

Наприклад, якщо хочемо, щоб button використовував font parent:

    button {
        font: inherit;
    }

Тут:

    font

можна явно успадкувати.

Це популярний CSS pattern.

---

# Button Example

    body {
        font-family: system-ui, sans-serif;
    }

    button {
        font: inherit;
    }

Тепер button використовує font context parent.

Це особливо корисно для design systems.

---

# Form Controls

Form controls можуть мати browser-specific styling.

Наприклад:

    button
    input
    select
    textarea

можуть не виглядати так, як звичайний текстовий content.

Тому іноді використовують:

    button,
    input,
    select,
    textarea {
        font: inherit;
    }

---

# color: inherit

Ще один поширений pattern:

    button {
        color: inherit;
    }

Це означає:

    використовувати color parent

Наприклад:

    .card {
        color: #333;
    }

    .card button {
        color: inherit;
    }

Button отримає:

    #333

---

# border-color: inherit

Можна успадковувати навіть non-inherited properties:

    .parent {
        border-color: red;
    }

    .child {
        border-color: inherit;
    }

---

# background: inherit

Також можна явно успадкувати background:

    .parent {
        background: black;
    }

    .child {
        background: inherit;
    }

Але важливо:

    background

за замовчуванням не успадковується.

Ми робимо це явно через:

    inherit

---

# margin: inherit

Технічно можна:

    .parent {
        margin: 20px;
    }

    .child {
        margin: inherit;
    }

Але це рідше потрібно.

Inheritance — це інструмент, а не правило, що все потрібно успадковувати.

---

# Inheritance Is Property-Specific

Наприклад:

    color
        → inherited

    margin
        → non-inherited

Тому:

    .parent {
        color: red;
        margin: 20px;
    }

Child:

    <p>Text</p>

може отримати:

    color: red

але не:

    margin: 20px

---

# CSS Custom Properties

CSS custom properties мають особливе значення для inheritance.

Наприклад:

    :root {
        --color-primary: blue;
    }

Custom property:

    --color-primary

за замовчуванням успадковується.

---

# Custom Property Example

    .theme {
        --color-primary: blue;
    }

    .button {
        color: var(--color-primary);
    }

HTML:

    <div class="theme">
        <button class="button">
            Save
        </button>
    </div>

Inheritance:

    .theme
        ↓
    --color-primary: blue
        ↓
    .button
        ↓
    color: blue

---

# Custom Property Chain

HTML:

    <div class="theme">
        <section>
            <button>Save</button>
        </section>
    </div>

CSS:

    .theme {
        --button-color: blue;
    }

    button {
        color: var(--button-color);
    }

Custom property може пройти через:

    .theme
       ↓
    section
       ↓
    button

---

# Override Custom Property

    .theme {
        --color: blue;
    }

    .dark {
        --color: white;
    }

Якщо `.dark` знаходиться в inheritance chain:

    --color

може мати інше значення.

---

# Custom Properties and Scope

Наприклад:

    :root {
        --color-primary: blue;
    }

    .card {
        --color-primary: green;
    }

    .card-title {
        color: var(--color-primary);
    }

Всередині `.card`:

    --color-primary → green

---

# Custom Properties and inherit

Можна явно:

    .child {
        --color: inherit;
    }

Але custom properties за замовчуванням уже inherited.

Тому зазвичай достатньо:

    .parent {
        --color: blue;
    }

    .child {
        color: var(--color);
    }

---

# Custom Properties vs Normal Properties

Normal property:

    margin
        → non-inherited

Custom property:

    --spacing
        → inherited by default

Наприклад:

    .parent {
        --spacing: 20px;
        margin: var(--spacing);
    }

Child може також бачити:

    --spacing: 20px

---

# var() and Inheritance

`var()` читає значення custom property з поточного element context.

Наприклад:

    :root {
        --color: blue;
    }

    p {
        color: var(--color);
    }

`p` використовує inherited custom property:

    --color

---

# Fallback with var()

Можна використовувати fallback:

    color: var(--color, black);

Якщо:

    --color

не визначена або недоступна в цьому context:

    black

буде fallback value.

---

# Inheritance and CSS Variables

Це одна з причин, чому CSS custom properties дуже важливі для design systems.

Наприклад:

    :root {
        --color-primary: #2563eb;
        --spacing-md: 1rem;
        --radius-md: 0.5rem;
    }

Компоненти можуть використовувати ці values через inheritance та cascade.

---

# Inheritance and Shadow DOM

У Web Components inheritance також може проходити через певні boundaries.

Наприклад, inherited properties можуть передаватися всередину shadow tree.

CSS custom properties часто використовуються як API для styling Web Components.

Наприклад:

    :host {
        color: var(--component-color, black);
    }

Це вже advanced topic, але корисно знати, що inheritance має значення і для component encapsulation.

---

# Inheritance and `all`

CSS має shorthand:

    all

Він дозволяє керувати майже всіма properties одночасно.

Наприклад:

    .reset {
        all: unset;
    }

Це означає:

    inherited properties
        → inherit

    non-inherited properties
        → initial

тобто поведінка `unset`.

---

# all: initial

    .reset {
        all: initial;
    }

Це встановлює initial values для всіх properties, до яких застосовується `all`.

Використовувати обережно, тому що це може скинути дуже багато styling.

---

# all: inherit

    .child {
        all: inherit;
    }

Це змушує properties успадковувати значення від parent.

Також використовується рідше, ніж точкове:

    color: inherit;
    font: inherit;

---

# all: unset

    .reset {
        all: unset;
    }

Це скидає properties до:

    inherit
    або
    initial

залежно від inheritance behavior конкретної property.

---

# all: revert

    .reset {
        all: revert;
    }

Це повертає properties до попереднього cascade origin.

Це може бути корисно, коли потрібно повернути browser defaults.

---

# all: revert-layer

У layer-based CSS можна використовувати:

    .reset {
        all: revert-layer;
    }

Це відкатує declarations поточного layer.

---

# Inheritance and CSS Reset

CSS reset може змінювати default styling.

Наприклад:

    * {
        box-sizing: border-box;
    }

Але:

    box-sizing

не є типовою inherited property.

Тому selector:

    *

застосовується до всіх elements.

---

# box-sizing and Inheritance

Можна також побудувати pattern:

    html {
        box-sizing: border-box;
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }

Тут:

    html
      ↓
    box-sizing: border-box
      ↓
    * → inherit

Це приклад навмисного використання inheritance для non-inherited property.

---

# Why box-sizing Pattern Works

`box-sizing` за замовчуванням не успадковується.

Але можна сказати:

    * {
        box-sizing: inherit;
    }

І:

    html {
        box-sizing: border-box;
    }

Тепер елементи отримують:

    border-box

через inheritance.

---

# Inheritance and Pseudo-elements

Pseudo-elements можуть успадковувати деякі properties від свого originating element.

Наприклад:

    .title {
        color: blue;
    }

    .title::before {
        content: "→ ";
    }

Pseudo-element може використовувати inherited `color`.

Тому стрілка може бути синьою.

---

# Inheritance and Lists

Наприклад:

    ul {
        color: blue;
    }

    li {
        ...
    }

`li` може успадкувати:

    color: blue

якщо не має власного `color`.

---

# Inheritance and Links

Посилання часто мають browser/user-agent styles.

Наприклад:

    a {
        color: blue;
    }

Якщо потрібно використовувати parent color:

    a {
        color: inherit;
    }

Тепер link може отримати color від parent.

---

# Example: Navigation

    nav {
        color: #222;
    }

    nav a {
        color: inherit;
        text-decoration: none;
    }

Тут:

    nav
      ↓
    color: #222
      ↓
    a
      ↓
    color: inherit

Це популярний pattern для navigation components.

---

# Example: Card

    .card {
        color: #222;
    }

    .card-title {
        font-size: 1.5rem;
    }

    .card-description {
        line-height: 1.5;
    }

`card-title` та `card-description` можуть успадкувати:

    color
    font-family

від `.card` або його ancestors.

---

# Example: Theme

    .theme-dark {
        color: white;
        background: black;
    }

Внутрішній content:

    <div class="theme-dark">
        <h1>Title</h1>
        <p>Description</p>
    </div>

`color` успадковується:

    theme-dark
        ↓
    h1
    p

А `background` належить самому `.theme-dark` і не передається child як inherited property.

---

# Very Important Difference

Якщо parent має:

    background: black;

child не отримує:

    background: black;

але child може мати прозорий background, через що **візуально буде видно background parent**.

Це не inheritance.

Наприклад:

    .parent {
        background: black;
    }

    .child {
        background: transparent;
    }

Візуально child знаходиться на чорному фоні parent.

Але:

    background

не успадкувався.

---

# Inheritance vs Visual Effect

Це важлива помилка.

Візуально:

    parent background
          ↓
    child appears on same background

не означає:

    child inherited background

Потрібно розрізняти:

    inheritance
        і
    layout / painting / transparency

---

# Inheritance vs Layout

Наприклад:

    .parent {
        display: flex;
    }

Child є flex item.

Але child не успадковує:

    display: flex

Він просто бере участь у layout parent.

Тобто:

    parent layout
        ↓
    affects child positioning

не означає:

    property inheritance

---

# Inheritance vs Cascade

Розглянемо:

    body {
        color: blue;
    }

    p {
        color: red;
    }

`p` має:

    inherited color → blue

але також:

    local declaration → red

Cascade/local declaration визначає результат:

    red

Тому inheritance — це один із способів отримання value, а не "вищий пріоритет".

---

# Inheritance and Specificity

Наприклад:

    body {
        color: blue;
    }

    .text {
        color: red;
    }

Для:

    <p class="text">Hello</p>

`.text` має local declaration.

Inherited value від `body` не конкурує із `.text` як звичайний selector conflict.

Local declaration використовується замість inherited value.

---

# Important Mental Model

Коли element не має власного value для inherited property:

    parent
       ↓
    inherited value
       ↓
    child

Якщо child має declaration:

    child declaration
       ↓
    використовувати власне value

---

# Initial Value

Кожна CSS property має визначене initial value.

Наприклад:

    color

має initial value:

    canvastext

у сучасному CSS definition.

Практично це не завжди означає "чорний", тому не варто механічно запам'ятовувати initial values без контексту.

Для кожної property потрібно дивитися її specification/MDN definition.

---

# Initial vs Browser Default

Це важливе розрізнення.

`initial`:

    → CSS specification initial value

Browser default:

    → user-agent stylesheet

Ці речі не обов'язково однакові.

Наприклад:

    h1 {
        all: initial;
    }

може виглядати зовсім не так, як звичайний `<h1>`.

Тому що browser stylesheet має власні rules.

---

# Browser Styles and Inheritance

Browser stylesheet може містити:

    h1 {
        display: block;
        font-size: 2em;
        margin-block-start: ...
        margin-block-end: ...
    }

Це author не задавав.

Тому під час debugging потрібно дивитися DevTools.

---

# DevTools and Inheritance

У Chrome/Firefox DevTools можна побачити inherited styles.

Наприклад:

    Styles
        ↓
    Inherited from body

або подібну секцію.

Це дозволяє побачити:

    яке значення успадковується
    від якого parent воно походить

---

# Debugging Inheritance

Якщо element має несподіваний color:

    1. Inspect element.
    2. Знайти property.
    3. Перевірити, чи property inherited.
    4. Подивитися parent.
    5. Перевірити inherited value.
    6. Перевірити local declaration.
    7. Перевірити browser/user-agent styles.
    8. Перевірити CSS variables.

---

# Practical Debugging Example

CSS:

    body {
        color: blue;
    }

    .card {
        color: red;
    }

HTML:

    <body>
        <div class="card">
            <p>Hello</p>
        </div>
    </body>

Для `p`:

    body → blue
      ↓
    .card → red
      ↓
    p → red

`p` успадковує найближче доступне значення:

    red

---

# Nested Override

    body {
        color: black;
    }

    .card {
        color: blue;
    }

    .card .warning {
        color: red;
    }

HTML:

    <body>
        <div class="card">
            <p>Normal</p>
            <p class="warning">Warning</p>
        </div>
    </body>

Результат:

    Normal  → blue
    Warning → red

---

# Inheritance Tree

Зручно уявляти:

    body
      │
      ├── header
      │     └── nav
      │           └── a
      │
      └── main
            └── article
                  ├── h1
                  └── p

Наприклад:

    body {
        color: #222;
        font-family: system-ui;
    }

Ці inherited properties можуть пройти вниз по дереву.

---

# Inheritance and Design Tokens

CSS variables часто використовуються як design tokens.

Наприклад:

    :root {
        --color-text: #222;
        --color-primary: #2563eb;
        --spacing-md: 1rem;
        --radius-md: 0.5rem;
    }

Components можуть використовувати:

    color: var(--color-text);

    padding: var(--spacing-md);

    border-radius: var(--radius-md);

Custom properties можуть бути overridden на окремому subtree.

---

# Theme Inheritance

Наприклад:

    :root {
        --color-text: #222;
        --color-background: white;
    }

    .dark {
        --color-text: white;
        --color-background: #111;
    }

HTML:

    <div class="dark">
        <p>Hello</p>
    </div>

Всередині `.dark`:

    --color-text
        → white

    --color-background
        → #111

Ці values успадковуються descendants.

---

# Theme Example

    :root {
        --color-text: #222;
        --color-background: white;
    }

    .dark {
        --color-text: white;
        --color-background: #111;
    }

    body {
        color: var(--color-text);
        background: var(--color-background);
    }

Або локально:

    .dark {
        color: var(--color-text);
        background: var(--color-background);
    }

---

# Inheritance and Responsive Design

Inheritance також працює всередині media queries.

Наприклад:

    body {
        font-size: 16px;
    }

    @media (min-width: 768px) {
        body {
            font-size: 18px;
        }
    }

Children, які успадковують `font-size`, можуть отримати нове значення автоматично.

---

# Inheritance and CSS Layers

Inheritance та cascade layers можуть працювати разом.

Наприклад:

    @layer base {
        :root {
            --color-primary: blue;
        }
    }

    @layer components {
        .card {
            --color-primary: green;
        }
    }

Внутрішні descendants `.card` можуть успадкувати:

    --color-primary: green

Cascade визначає значення на `.card`, а inheritance передає його descendants.

---

# Inheritance and Shadowing

У CSS часто говорять про override/shadowing у контексті локальних values.

Наприклад:

    .parent {
        color: blue;
    }

    .child {
        color: red;
    }

Child не "знищує" parent value.

Він просто має власне value:

    parent → blue
    child  → red

---

# Common Inheritance Patterns

## Global typography

    body {
        font-family: system-ui, sans-serif;
        color: #222;
        line-height: 1.5;
    }

---

## Button font

    button {
        font: inherit;
    }

---

## Link color

    a {
        color: inherit;
    }

---

## Component color

    .card {
        color: var(--color-text);
    }

---

## Theme variables

    .dark {
        --color-text: white;
    }

---

## Box sizing

    html {
        box-sizing: border-box;
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }

---

# Common Mistakes

❌ Думати, що всі properties успадковуються.

Наприклад:

    margin
    padding
    border
    background

не успадковуються за замовчуванням.

---

❌ Плутати inheritance з layout.

Наприклад:

    display: flex;

не робить child flex container.

---

❌ Плутати background inheritance з прозорістю.

Child може показувати background parent, але не успадковувати його.

---

❌ Думати, що `inherit` означає "initial".

Ні.

    inherit → parent
    initial → initial value

---

❌ Думати, що `unset` завжди означає inherit.

Ні.

    inherited property
        → inherit

    non-inherited property
        → initial

---

❌ Думати, що `initial` повертає browser default.

Не обов'язково.

    initial
        → CSS initial value

    revert
        → previous cascade origin

---

❌ Використовувати `all: inherit` без розуміння наслідків.

Це може успадкувати дуже багато properties та створити несподівану поведінку.

---

❌ Не перевіряти DevTools.

Якщо значення несподіване, DevTools часто одразу показує:

    inherited from ...
    user agent stylesheet
    crossed out
    source file

---

# Типові помилки

❌ Вважати:

    parent padding
        ↓
    child padding

Ні.

Padding не успадковується.

---

❌ Вважати:

    parent background
        ↓
    child background

Ні.

Background не успадковується.

---

❌ Вважати:

    parent display: flex
        ↓
    child display: flex

Ні.

Child стає flex item, але його власний `display` не стає `flex`.

---

❌ Вважати:

    parent color
        ↓
    child color

завжди.

Це справедливо лише для inherited behavior, якщо child не має власного declaration та інші cascade rules не змінюють результат.

---

❌ Використовувати `!important`, коли проблема просто в inheritance.

Спочатку потрібно зрозуміти:

    звідки прийшло value?

---

# Practical Comparison

## color

    .parent {
        color: red;
    }

    .child {
        /* color inherited */
    }

Результат:

    red

---

## margin

    .parent {
        margin: 20px;
    }

    .child {
        /* margin does not inherit */
    }

Child не отримує:

    margin: 20px

---

## padding

    .parent {
        padding: 20px;
    }

Child не отримує автоматично:

    padding: 20px

---

## font-family

    .parent {
        font-family: Arial, sans-serif;
    }

Child може отримати:

    Arial, sans-serif

---

## background

    .parent {
        background: black;
    }

Child не успадковує:

    background: black

---

# Practical Example 1 — Typography

HTML:

    <article class="article">
        <h1>CSS Inheritance</h1>
        <p>
            Inheritance allows some properties
            to flow from parent to child.
        </p>
    </article>

CSS:

    .article {
        font-family: system-ui, sans-serif;
        color: #222;
        line-height: 1.5;
    }

Тут:

    font-family
    color
    line-height

можуть успадковуватися.

---

# Practical Example 2 — Override

    .article {
        color: #222;
    }

    .article .warning {
        color: red;
    }

HTML:

    <article class="article">
        <p>Normal text</p>
        <p class="warning">Warning</p>
    </article>

Результат:

    Normal text → #222
    Warning     → red

---

# Practical Example 3 — inherit

    .card {
        color: blue;
    }

    .card button {
        color: inherit;
    }

Button отримує:

    blue

---

# Practical Example 4 — initial

    .card {
        color: blue;
    }

    .card p {
        color: initial;
    }

`p` не успадковує blue.

Він отримує:

    initial value of color

---

# Practical Example 5 — unset

    .card {
        color: blue;
    }

    .card p {
        color: unset;
    }

Оскільки `color` inherited:

    unset → inherit

Тому:

    blue

---

# Practical Example 6 — non-inherited unset

    .card {
        margin: 20px;
    }

    .card p {
        margin: unset;
    }

Оскільки `margin` non-inherited:

    unset → initial

---

# Practical Example 7 — revert

    button {
        all: revert;
    }

Це може повернути стандартне browser/user-agent styling.

Це відрізняється від:

    all: initial;

---

# Practical Example 8 — CSS Variables

    .theme {
        --color: blue;
    }

    .button {
        color: var(--color);
    }

HTML:

    <div class="theme">
        <button class="button">
            Save
        </button>
    </div>

Custom property успадковується:

    .theme
        ↓
    --color: blue
        ↓
    button
        ↓
    color: blue

---

# Practical Example 9 — Nested Theme

    .theme {
        --color: blue;
    }

    .theme.dark {
        --color: white;
    }

    .text {
        color: var(--color);
    }

HTML:

    <div class="theme">
        <p class="text">Blue</p>

        <div class="dark">
            <p class="text">White</p>
        </div>
    </div>

Всередині `.dark`:

    --color → white

Тому другий paragraph буде білим.

---

# Practical Example 10 — Box Sizing

    html {
        box-sizing: border-box;
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }

Тут:

    html
      ↓
    box-sizing: border-box
      ↓
    * → inherit

Це класичний приклад навмисного використання inheritance для non-inherited property.

---

# Interview Questions

Що таке CSS inheritance?

Що таке inherited property?

Що таке non-inherited property?

Що таке parent element?

Що таке child element?

Що таке ancestor?

Що таке descendant?

Які CSS properties зазвичай успадковуються?

Чи успадковується `color`?

Чи успадковується `font-family`?

Чи успадковується `font-size`?

Чи успадковується `line-height`?

Чи успадковується `margin`?

Чи успадковується `padding`?

Чи успадковується `border`?

Чи успадковується `background`?

Чи успадковується `width`?

Чи успадковується `display`?

Що робить `inherit`?

Що робить `initial`?

Що робить `unset`?

Чим `inherit` відрізняється від `initial`?

Чим `unset` відрізняється від `inherit`?

Що робить `revert`?

Що робить `revert-layer`?

Чим `revert` відрізняється від `initial`?

Що таке inheritance chain?

Що відбувається, якщо child має власне declaration?

Чим inheritance відрізняється від cascade?

Чим inheritance відрізняється від layout?

Чому `display: flex` не успадковується?

Чому `background` не успадковується?

Чому `color` успадковується?

Як працює inheritance CSS custom properties?

Що таке `var()`?

Як працює `all: unset`?

Як працює `all: inherit`?

Як працює `all: revert`?

Як зробити так, щоб button успадковував font?

Навіщо використовують:

    font: inherit;

Навіщо використовують:

    color: inherit;

Як DevTools показує inherited styles?

---

# Шлях

## 🟢 Core (обов'язково знати)

Що таке inheritance.

Parent.

Child.

Ancestor.

Descendant.

Inherited property.

Non-inherited property.

Знати типові inherited properties:

    color
    font-family
    font-size
    font-style
    font-weight
    line-height
    text-align

Знати типові non-inherited properties:

    margin
    padding
    border
    background
    width
    height
    display
    position

Розуміти:

    parent
        ↓
    child

Розуміти, що child може override inherited value.

Розуміти:

    inherit

Основи:

    initial
    unset

Розуміти inheritance CSS custom properties.

---

## 🔵 Junior

Вміти пояснити inheritance.

Розуміти inheritance chain.

Розуміти:

    inherited value
    local declaration
    initial value
    computed value

Розуміти різницю:

    inheritance
    cascade
    specificity
    layout

Вміти використовувати:

    color: inherit;
    font: inherit;

Розуміти:

    all: inherit
    all: initial
    all: unset
    all: revert

Розуміти різницю:

    inherit
    initial
    unset
    revert

Розуміти inheritance custom properties.

Вміти будувати theme через:

    --custom-properties

Розуміти browser default styles.

Вміти знаходити inherited styles у DevTools.

Розуміти:

    box-sizing: inherit

---

## 🟠 Middle

Глибоке розуміння inheritance model.

CSS-wide keywords:

    inherit
    initial
    unset
    revert
    revert-layer

CSS custom properties.

Custom property inheritance.

Fallback values:

    var(--color, black)

Theme inheritance.

Design tokens.

Component styling через inherited context.

Inheritance та cascade layers.

Inheritance у responsive layouts.

Inheritance у pseudo-elements.

Form controls та:

    font: inherit;
    color: inherit;

Inheritance у Web Components.

Shadow DOM.

CSS custom properties як styling API.

CSS reset strategies.

Global typography architecture.

Component isolation.

---

## 🔴 Senior

Глибоке розуміння CSS value processing.

Specified value.

Cascaded value.

Declared value.

Defaulting.

Inherited value.

Computed value.

Used value.

Actual value.

Initial value.

CSS-wide keywords.

Cascade origins.

Cascade layers.

Custom property inheritance.

Invalid at computed-value time.

CSS variables and fallback resolution.

Inheritance across shadow boundaries.

Web Components styling.

Shadow DOM.

`:host`.

`::part()`.

`::slotted()`.

Design system architecture.

Theme propagation.

Token inheritance.

Component-level styling APIs.

CSS architecture at scale.

Global vs local inheritance strategies.

Performance and maintainability considerations.

---

# Міні-шпаргалка

## Inheritance

    parent
       ↓
    child

Якщо property inherited і child не має власного value:

    parent value
        ↓
    child value

---

## Inherited

Типові:

    color
    font-family
    font-size
    font-style
    font-weight
    line-height
    text-align

---

## Non-inherited

Типові:

    margin
    padding
    border
    background
    width
    height
    display
    position

---

## inherit

    color: inherit;

Означає:

    → взяти value від parent

---

## initial

    color: initial;

Означає:

    → використати initial value property

---

## unset

    color: unset;

Для inherited property:

    unset → inherit

Для non-inherited:

    unset → initial

---

## revert

    all: revert;

Означає:

    → повернутися до попереднього cascade origin

---

## revert-layer

    all: revert-layer;

Означає:

    → повернутися до значення поза поточним cascade layer

---

## Typography

    body {
        font-family: system-ui, sans-serif;
        color: #222;
        line-height: 1.5;
    }

Ці properties можуть успадковуватися descendants.

---

## Button

    button {
        font: inherit;
        color: inherit;
    }

---

## Link

    a {
        color: inherit;
    }

---

## Custom Property

    .theme {
        --color-primary: blue;
    }

    .button {
        color: var(--color-primary);
    }

Custom property:

    --color-primary

успадковується descendants.

---

## Box Sizing

    html {
        box-sizing: border-box;
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }

---

## Inheritance Chain

    body
      ↓
    main
      ↓
    section
      ↓
    article
      ↓
    p

Inherited property може пройти через весь chain.

---

## Child Override

    body {
        color: blue;
    }

    p {
        color: red;
    }

Результат:

    p → red

---

## Parent Context

    .card {
        color: #222;
    }

    .card button {
        color: inherit;
    }

Результат:

    button → #222

---

## CSS Variables

    :root {
        --color-text: #222;
    }

    .dark {
        --color-text: white;
    }

    .text {
        color: var(--color-text);
    }

Inheritance дозволяє створювати local themes.

---

# Головне:

• Inheritance — це механізм CSS, за допомогою якого деякі properties передаються від parent до child.

• Не всі CSS properties успадковуються.

• Типові inherited properties:

    color
    font-family
    font-size
    font-style
    font-weight
    line-height
    text-align

• Типові non-inherited properties:

    margin
    padding
    border
    background
    width
    height
    display
    position

• `color` — inherited.

• `font-family` — inherited.

• `font-size` — inherited.

• `line-height` — inherited.

• `margin` — не inherited.

• `padding` — не inherited.

• `border` — не inherited.

• `background` — не inherited.

• `width` — не inherited.

• `display` — не inherited.

• Якщо child не має власного declaration для inherited property, він може отримати value від parent.

• Якщо child має власне declaration, воно визначає його value замість inherited value.

• Inheritance проходить через DOM tree:

    parent
      ↓
    child
      ↓
    descendant

• Inheritance не потрібно плутати з cascade.

• Cascade визначає переможця серед declarations.

• Inheritance визначає, звідки element може отримати value, якщо власного declaration немає.

• Inheritance не потрібно плутати з layout.

Наприклад:

    display: flex;

не успадковується, хоча child стає flex item.

• Background parent не означає, що background inherited child.

• `inherit` означає:

    → взяти value від parent

• `initial` означає:

    → взяти initial value property

• `unset` означає:

    inherited property → inherit

    non-inherited property → initial

• `revert` повертає value до попереднього cascade origin.

• `revert-layer` дозволяє повернутися за межі поточного cascade layer.

• CSS custom properties за замовчуванням успадковуються:

    --color
    --spacing
    --radius

• Custom properties особливо корисні для:

    themes
    design tokens
    component styling
    design systems

• Поширений pattern:

    button {
        font: inherit;
        color: inherit;
    }

• Поширений pattern для links:

    a {
        color: inherit;
    }

• Поширений pattern для `box-sizing`:

    html {
        box-sizing: border-box;
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }

• Inheritance дозволяє задавати typography на верхньому рівні:

    body {
        font-family: system-ui, sans-serif;
        color: #222;
        line-height: 1.5;
    }

і не повторювати ці properties для кожного child.

• Inheritance можна override-ити:

    .parent {
        color: blue;
    }

    .child {
        color: red;
    }

Результат:

    parent → blue
    child  → red

• Під час debugging потрібно дивитися, звідки прийшло value:

    local declaration
        ↓
    inherited value
        ↓
    initial value
        ↓
    browser/user-agent style

• DevTools може показати:

    inherited from ...

що дозволяє знайти джерело inherited value.

• Найважливіша модель:

    parent
       ↓
    inherited property
       ↓
    child

• Якщо child має власне declaration:

    parent
       ↓
    inherited value

    child
       ↓
    local declaration
       ↓
    local value

• Головне практичне правило:

    typography
        ↓
    inheritance

    component-specific styling
        ↓
    local declarations

    themes
        ↓
    CSS custom properties + inheritance

• Inheritance — один із ключових механізмів CSS разом із:

    cascade
    specificity
    layout
    box model

• Якщо добре розуміти inheritance, значно легше працювати з:

    typography
    themes
    CSS variables
    design systems
    component styling
    resets
    browser defaults
