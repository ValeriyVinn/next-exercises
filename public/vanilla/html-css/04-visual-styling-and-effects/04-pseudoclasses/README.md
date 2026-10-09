# 04. Pseudoclasses

Pseudo-classes (псевдокласи) — це спеціальні CSS-селектори, які дозволяють стилізувати елемент залежно від його стану, положення, взаємодії з користувачем або структури документа.

Псевдоклас записується через одне двокрапку:

    :pseudo-class

Наприклад:

    :hover
    :focus
    :active
    :visited
    :checked
    :disabled
    :first-child
    :last-child
    :nth-child()

Псевдокласи не створюють нові HTML-елементи.

Вони дозволяють вибрати вже існуючі елементи залежно від певної умови.

Наприклад:

    button:hover {
        background: black;
        color: white;
    }

Тут:

    button
        → HTML-елемент

    :hover
        → стан елемента

    button:hover
        → button, коли користувач наводить на нього pointer

---

### Основні групи псевдокласів

    Interaction
        :hover
        :active
        :focus
        :focus-visible
        :focus-within

    Link
        :link
        :visited
        :any-link

    Form
        :checked
        :disabled
        :enabled
        :required
        :optional
        :valid
        :invalid
        :in-range
        :out-of-range
        :read-only
        :read-write
        :placeholder-shown
        :default

    Structural
        :first-child
        :last-child
        :only-child
        :nth-child()
        :nth-last-child()
        :first-of-type
        :last-of-type
        :only-of-type
        :nth-of-type()
        :nth-last-of-type()
        :empty

    Logical
        :not()
        :is()
        :where()
        :has()

    Document
        :root
        :target
        :lang()

    Other
        :fullscreen
        :modal
        :defined

---

### Ключові поняття

✔ pseudo-class  
✔ state  
✔ selector  
✔ `:hover`  
✔ `:active`  
✔ `:focus`  
✔ `:focus-visible`  
✔ `:focus-within`  
✔ `:visited`  
✔ `:link`  
✔ `:checked`  
✔ `:disabled`  
✔ `:enabled`  
✔ `:required`  
✔ `:optional`  
✔ `:valid`  
✔ `:invalid`  
✔ `:in-range`  
✔ `:out-of-range`  
✔ `:read-only`  
✔ `:read-write`  
✔ `:placeholder-shown`  
✔ `:first-child`  
✔ `:last-child`  
✔ `:only-child`  
✔ `:nth-child()`  
✔ `:nth-last-child()`  
✔ `:first-of-type`  
✔ `:last-of-type`  
✔ `:only-of-type`  
✔ `:nth-of-type()`  
✔ `:empty`  
✔ `:not()`  
✔ `:is()`  
✔ `:where()`  
✔ `:has()`  
✔ `:root`  
✔ `:target`  
✔ `:lang()`  
✔ specificity  
✔ accessibility  
✔ keyboard navigation  
✔ form states  

---

# Що потрібно пам'ятати

• Псевдоклас починається з одного двокрапки:

    :hover

• Псевдоклас описує стан, положення або властивість елемента.

• `:hover` застосовується при наведенні pointer.

• `:active` застосовується під час активації елемента.

• `:focus` застосовується, коли елемент отримує focus.

• `:focus-visible` дозволяє показувати focus indicator тоді, коли він особливо потрібен, зокрема під час keyboard navigation.

• `:focus-within` вибирає елемент, якщо він сам або один із його descendants має focus.

• `:checked` використовується для checked controls.

• `:disabled` вибирає disabled form controls.

• `:valid` та `:invalid` використовуються для перевірки стану form controls.

• `:first-child`, `:last-child`, `:nth-child()` працюють зі структурою children.

• `:first-of-type` та `:nth-of-type()` враховують тип HTML-елемента.

• `:not()` дозволяє виключити елементи з вибірки.

• `:is()` дозволяє об'єднувати альтернативні selectors.

• `:where()` схожий на `:is()`, але має нульову specificity.

• `:has()` дозволяє вибирати елемент залежно від його descendants або related elements.

• Псевдокласи можуть комбінуватися:

    button:hover:focus-visible

• Псевдокласи можуть використовуватися разом із класами:

    .button:hover

• Псевдокласи впливають на specificity selector.

---

# Pseudo-class vs Pseudo-element

Це дуже важлива різниця.

Pseudo-class:

    :

Pseudo-element:

    ::

Приклад псевдокласу:

    button:hover {
        color: red;
    }

Приклад псевдоелемента:

    button::before {
        content: "";
    }

Запам'ятати:

    :   → pseudo-class

    ::  → pseudo-element

Псевдоклас описує:

    state
    condition
    position
    relationship

Псевдоелемент представляє:

    частину елемента
    або створений CSS-вміст

---

# Interaction Pseudoclasses

Найчастіше у frontend-розробці використовуються:

    :hover
    :active
    :focus
    :focus-visible
    :focus-within

---

# :hover

`:hover` вибирає елемент, коли pointer знаходиться над ним.

Наприклад:

    button:hover {
        background-color: black;
        color: white;
    }

---

## Hover для link

    a:hover {
        color: red;
    }

---

## Hover для card

    .card:hover {
        box-shadow:
            0 8px 20px rgba(0, 0, 0, 0.15);
    }

---

## Hover для image

    .image:hover {
        opacity: 0.8;
    }

---

# :active

`:active` застосовується під час активної взаємодії з елементом.

Наприклад:

    button:active {
        transform: scale(0.98);
    }

Для кнопки цей стан виникає під час натискання.

---

# :focus

`:focus` вибирає елемент, який має focus.

Наприклад:

    input:focus {
        border-color: blue;
    }

Focus може виникнути через:

    mouse
    keyboard
    script
    інші способи взаємодії

---

# Focus

Focus особливо важливий для:

    input
    button
    textarea
    select
    links

Користувач клавіатури повинен бачити, який елемент зараз має focus.

---

# :focus-visible

`:focus-visible` дозволяє стилізувати focus indicator тоді, коли браузер визначає, що його потрібно показати.

Наприклад:

    button:focus-visible {
        outline: 2px solid blue;
        outline-offset: 3px;
    }

Це особливо корисно для keyboard navigation.

---

# :focus vs :focus-visible

` :focus `:

    button:focus {
        outline: 2px solid blue;
    }

Застосовується при focus незалежно від способу його отримання.

`:focus-visible`:

    button:focus-visible {
        outline: 2px solid blue;
    }

Дозволяє створити більш точний keyboard-friendly focus state.

---

# :focus-within

`:focus-within` вибирає елемент, якщо сам елемент або будь-який його descendant має focus.

Наприклад:

    .form-group:focus-within {
        border-color: blue;
    }

HTML:

    <div class="form-group">
        <label>Email</label>
        <input type="email">
    </div>

Коли `input` отримує focus:

    .form-group:focus-within

також стає активним.

---

# Practical :focus-within

    .search {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 8px;
    }

    .search:focus-within {
        border-color: blue;
    }

Це зручно для:

    forms
    search boxes
    input groups
    navigation components

---

# Link Pseudoclasses

Основні псевдокласи для links:

    :link
    :visited
    :hover
    :active

---

# :link

`:link` вибирає невідвідані links.

    a:link {
        color: blue;
    }

Зазвичай застосовується до `<a href="...">`.

---

# :visited

`:visited` вибирає links, які користувач уже відвідав.

    a:visited {
        color: purple;
    }

Браузери обмежують можливості стилізації `:visited` з міркувань privacy.

---

# :hover та :active для links

Наприклад:

    a:hover {
        color: red;
    }

    a:active {
        color: orange;
    }

---

# Link Order

Класична послідовність:

    :link
    :visited
    :hover
    :active

Можна запам'ятати:

    LVHA

    Link
    Visited
    Hover
    Active

У сучасному CSS конкретний порядок залежить від selector specificity та cascade, але для простих link states LVHA залишається корисним правилом.

---

# :any-link

`:any-link` вибирає link незалежно від того, чи він visited.

    a:any-link {
        text-decoration: none;
    }

Це може бути корисніше, ніж окремо:

    :link
    :visited

---

# Form Pseudoclasses

Form controls мають багато спеціальних станів.

Основні:

    :checked
    :disabled
    :enabled
    :required
    :optional
    :valid
    :invalid
    :in-range
    :out-of-range
    :read-only
    :read-write
    :placeholder-shown
    :default

---

# :checked

`:checked` вибирає checked checkbox або radio.

HTML:

    <input type="checkbox" id="agree">

CSS:

    input:checked {
        accent-color: green;
    }

---

# :checked with Label

Наприклад:

    input:checked + label {
        color: green;
    }

HTML:

    <input type="checkbox" id="agree">
    <label for="agree">
        I agree
    </label>

Коли checkbox checked:

    label
        ↓
    color: green

---

# :disabled

`:disabled` вибирає disabled form control.

HTML:

    <button disabled>
        Submit
    </button>

CSS:

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

---

# :enabled

`:enabled` вибирає enabled form controls.

    button:enabled {
        cursor: pointer;
    }

---

# :required

`:required` вибирає form controls з атрибутом `required`.

HTML:

    <input
        type="email"
        required
    >

CSS:

    input:required {
        border-left: 3px solid blue;
    }

---

# :optional

`:optional` вибирає form controls, які не мають `required`.

    input:optional {
        border-color: #aaa;
    }

---

# :valid

`:valid` вибирає елемент, значення якого відповідає його validation constraints.

Наприклад:

    input:valid {
        border-color: green;
    }

---

# :invalid

`:invalid` вибирає елемент із невалідним значенням.

    input:invalid {
        border-color: red;
    }

Наприклад:

    <input
        type="email"
        required
    >

Якщо поле містить:

    hello

воно може бути:

    :invalid

---

# :user-valid

`:user-valid` дозволяє відрізняти стан, коли користувач уже взаємодіяв із полем і значення стало валідним.

    input:user-valid {
        border-color: green;
    }

Це може допомогти уникнути показу validation styles одразу після завантаження форми.

---

# :user-invalid

Аналогічно:

    input:user-invalid {
        border-color: red;
    }

Це корисно для форм, де помилку не потрібно показувати до взаємодії користувача.

---

# :in-range

`:in-range` вибирає input, значення якого знаходиться в заданому діапазоні.

Наприклад:

    <input
        type="number"
        min="1"
        max="10"
    >

CSS:

    input:in-range {
        border-color: green;
    }

---

# :out-of-range

Якщо значення виходить за діапазон:

    input:out-of-range {
        border-color: red;
    }

---

# :read-only

`:read-only` вибирає елементи, які не можуть бути редаговані користувачем.

Наприклад:

    <input
        type="text"
        value="Readonly"
        readonly
    >

CSS:

    input:read-only {
        background: #eee;
    }

---

# :read-write

`:read-write` вибирає editable controls.

    input:read-write {
        background: white;
    }

---

# :placeholder-shown

`:placeholder-shown` застосовується, коли input показує placeholder.

HTML:

    <input
        type="email"
        placeholder="Email"
    >

CSS:

    input:placeholder-shown {
        background: #f5f5f5;
    }

Коли користувач вводить значення:

    :placeholder-shown

перестає відповідати.

---

# :default

`:default` вибирає form control, який є default control у своїй групі.

Наприклад:

    input:default {
        outline: 2px solid blue;
    }

Це може використовуватися для:

    default radio
    default option
    default button

---

# Form Validation Pattern

Простий приклад:

    input {
        border: 1px solid #aaa;
    }

    input:focus-visible {
        outline: 2px solid blue;
        outline-offset: 2px;
    }

    input:user-valid {
        border-color: green;
    }

    input:user-invalid {
        border-color: red;
    }

---

# Structural Pseudoclasses

Structural pseudo-classes дозволяють вибирати елементи залежно від їхнього положення серед siblings.

Основні:

    :first-child
    :last-child
    :only-child
    :nth-child()
    :nth-last-child()

---

# :first-child

`:first-child` вибирає елемент, який є першим child свого parent.

HTML:

    <ul>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
    </ul>

CSS:

    li:first-child {
        color: red;
    }

Буде вибрано:

    One

---

# :last-child

`:last-child` вибирає останній child.

    li:last-child {
        color: blue;
    }

Буде вибрано:

    Three

---

# :only-child

`:only-child` вибирає елемент, який є єдиним child свого parent.

HTML:

    <div>
        <p>Only paragraph</p>
    </div>

CSS:

    p:only-child {
        font-weight: bold;
    }

---

# :nth-child()

`:nth-child()` дозволяє вибирати child за його позицією.

Наприклад:

    li:nth-child(2) {
        color: red;
    }

Вибирається другий child.

---

# nth-child(odd)

Непарні позиції:

    li:nth-child(odd) {
        background: #f5f5f5;
    }

Вибираються:

    1
    3
    5
    7
    ...

---

# nth-child(even)

Парні позиції:

    li:nth-child(even) {
        background: #eee;
    }

Вибираються:

    2
    4
    6
    8
    ...

---

# nth-child(3n)

Кожен третій:

    li:nth-child(3n) {
        color: red;
    }

Вибираються:

    3
    6
    9
    12
    ...

---

# nth-child(3n + 1)

    li:nth-child(3n + 1) {
        color: blue;
    }

Вибираються:

    1
    4
    7
    10
    ...

---

# nth-child(-n + 3)

Перші три елементи:

    li:nth-child(-n + 3) {
        font-weight: bold;
    }

---

# nth-child(n + 4)

Усі елементи, починаючи з четвертого:

    li:nth-child(n + 4) {
        color: gray;
    }

---

# :nth-last-child()

Відлік ведеться з кінця.

Наприклад:

    li:nth-last-child(1) {
        color: red;
    }

Це фактично останній child.

---

# :nth-last-child(2)

    li:nth-last-child(2) {
        color: blue;
    }

Вибирає другий елемент з кінця.

---

# First Child vs First of Type

Це одна з найважливіших тем.

Розглянемо:

    <div>
        <h2>Title</h2>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
    </div>

Selector:

    p:first-child

нічого не вибере.

Чому?

Тому що перший child:

    h2

а не:

    p

---

# :first-of-type

`:first-of-type` вибирає перший елемент певного type серед siblings.

    p:first-of-type {
        color: red;
    }

У прикладі:

    <div>
        <h2>Title</h2>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
    </div>

буде вибрано:

    Paragraph 1

---

# :last-of-type

Вибирає останній елемент певного type.

    p:last-of-type {
        color: blue;
    }

---

# :only-of-type

Вибирає елемент, який є єдиним елементом свого type серед siblings.

Наприклад:

    <div>
        <h2>Title</h2>
        <p>Paragraph</p>
        <span>Text</span>
    </div>

Тут:

    p:only-of-type

відповідає `p`.

---

# :nth-of-type()

Вибирає елемент певного type за позицією серед елементів цього type.

Наприклад:

    p:nth-of-type(2) {
        color: red;
    }

Розглянемо:

    <div>
        <h2>Title</h2>
        <p>One</p>
        <span>Other</span>
        <p>Two</p>
        <p>Three</p>
    </div>

`p:nth-of-type(2)` вибере:

    Two

---

# :nth-last-of-type()

Аналогічно, але відлік відбувається з кінця.

    p:nth-last-of-type(1) {
        color: red;
    }

Це останній `p`.

---

# :empty

`:empty` вибирає елементи, які не мають children.

Наприклад:

    <div class="message"></div>

CSS:

    .message:empty {
        display: none;
    }

Важливо:

    whitespace

може впливати на те, чи вважається елемент порожнім.

---

# :root

`:root` вибирає root element документа.

Для HTML:

    :root

відповідає:

    <html>

Найчастіше використовується для CSS variables:

    :root {
        --color-primary: blue;
        --spacing-md: 16px;
    }

---

# :target

`:target` вибирає елемент, id якого відповідає fragment identifier URL.

HTML:

    <section id="about">
        About
    </section>

URL:

    page.html#about

CSS:

    #about:target {
        background: yellow;
    }

---

# :lang()

`:lang()` вибирає елементи залежно від language.

Наприклад:

    :lang(uk) {
        quotes: "«" "»";
    }

Або:

    :lang(en) {
        quotes: '"' '"';
    }

---

# Logical Pseudoclasses

Дуже важливі сучасні псевдокласи:

    :not()
    :is()
    :where()
    :has()

---

# :not()

`:not()` вибирає елементи, які НЕ відповідають selector.

Наприклад:

    button:not(.primary) {
        background: gray;
    }

Це означає:

    button
        ↓
    але не .primary

---

# :not() Example

    li:not(:last-child) {
        border-bottom: 1px solid #ddd;
    }

Це означає:

    усі li
    крім останнього

Це дуже поширений патерн.

---

# :not() Multiple Selectors

Сучасний CSS дозволяє передавати selector list:

    button:not(.primary, .secondary) {
        color: gray;
    }

Тобто:

    button
        ↓
    не .primary
    і не .secondary

---

# :is()

`:is()` дозволяє об'єднати кілька альтернативних selectors.

Замість:

    h1:hover,
    h2:hover,
    h3:hover {
        color: red;
    }

можна:

    :is(h1, h2, h3):hover {
        color: red;
    }

---

# :is() Specificity

`:is()` приймає specificity найспецифічнішого selector зі свого списку.

Наприклад:

    :is(.card, #special) {
        ...
    }

Specificity буде визначатися найбільш специфічним аргументом:

    #special

Це важливо розуміти при складному cascade.

---

# :where()

`:where()` схожий на `:is()`, але має:

    specificity = 0

Наприклад:

    :where(.card, .panel) {
        padding: 20px;
    }

Це дуже корисно для написання базових стилів, які легко перевизначити.

---

# :is() vs :where()

Головна різниця:

    :is()
        → specificity залежить від найспецифічнішого аргументу

    :where()
        → specificity = 0

---

# :has()

`:has()` дозволяє вибрати елемент залежно від того, що знаходиться всередині або пов'язано з ним.

Наприклад:

    .card:has(img) {
        border-color: blue;
    }

Це означає:

    .card
        ↓
    має img
        ↓
    застосувати styles

---

# :has() Example

HTML:

    <article class="card">
        <h2>Title</h2>
        <img src="image.jpg" alt="">
    </article>

CSS:

    .card:has(img) {
        padding: 20px;
    }

---

# :has() with Form

Наприклад:

    .form-group:has(input:invalid) {
        border-color: red;
    }

Тепер весь `.form-group` може реагувати на стан input.

---

# :has() as Parent Selector

CSS historically не мав простого parent selector.

`:has()` дозволяє реалізувати багато таких сценаріїв.

Наприклад:

    .card:has(.error) {
        border-color: red;
    }

Тобто:

    card
      ↓
    contains .error
      ↓
    style card

---

# Complex :has()

Можна комбінувати:

    .form-group:has(input:focus-visible) {
        border-color: blue;
    }

Або:

    .card:not(:has(img)) {
        padding: 24px;
    }

---

# Combining Pseudoclasses

Псевдокласи можна комбінувати.

Наприклад:

    button:hover:active {
        transform: scale(0.98);
    }

Або:

    input:focus:not(:disabled) {
        border-color: blue;
    }

---

# Multiple Conditions

Наприклад:

    input:required:invalid {
        border-color: red;
    }

Тут одночасно повинні виконуватися:

    required
    invalid

---

# Class + Pseudoclass

Найпоширеніший pattern:

    .button:hover {
        background: black;
    }

Або:

    .button:active {
        transform: scale(0.98);
    }

---

# Element + Pseudoclass

    input:focus {
        border-color: blue;
    }

---

# Attribute + Pseudoclass

    input[type="email"]:invalid {
        border-color: red;
    }

---

# Parent + :has()

    .field:has(input:invalid) {
        border-color: red;
    }

---

# Pseudoclass Specificity

Псевдоклас зазвичай має specificity, подібну до class selector.

Наприклад:

    .button
    :hover
    :focus

усі додають один class-level компонент specificity.

Тому:

    button:hover

має більшу specificity, ніж:

    button

---

# Specificity Example

    button {
        color: black;
    }

    button:hover {
        color: red;
    }

При hover:

    color: red

тому що:

    button:hover

має більшу specificity.

---

# :where() and Specificity

На відміну від звичайних pseudo-classes:

    :where(...)

має:

    specificity = 0

Наприклад:

    :where(.card) {
        padding: 20px;
    }

Може бути легко перевизначений:

    .special-card {
        padding: 40px;
    }

---

# Pseudoclasses and Cascade

Псевдокласи беруть участь у звичайному CSS cascade.

Наприклад:

    button {
        background: white;
    }

    button:hover {
        background: black;
    }

Якщо інший selector має вищу specificity, він може перемогти.

Тому важливо розуміти:

    specificity
    source order
    inheritance
    cascade

---

# Hover and Touch Devices

`:hover` особливо природний для pointer devices.

На touch devices поведінка hover може відрізнятися від desktop.

Тому важливу інформацію не варто робити доступною лише через:

    :hover

Наприклад, не слід ховати основний текст і показувати його тільки при hover.

---

# Accessibility

Псевдокласи тісно пов'язані з accessibility.

Особливо:

    :focus
    :focus-visible
    :checked
    :disabled
    :invalid

---

# Keyboard Navigation

Користувач повинен бачити focus.

Наприклад:

    a:focus-visible,
    button:focus-visible,
    input:focus-visible {
        outline: 2px solid blue;
        outline-offset: 3px;
    }

---

# Не використовувати тільки Hover

Погано:

    .tooltip {
        display: none;
    }

    .trigger:hover .tooltip {
        display: block;
    }

Якщо інформація критична для користувача, не слід покладатися лише на hover.

Для складних interactive components потрібно враховувати:

    keyboard
    focus
    pointer
    touch
    screen readers

---

# Disabled State

Disabled controls повинні мати зрозумілий стан.

Наприклад:

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

Але opacity не повинна бути єдиним способом передати disabled state, якщо contrast стає недостатнім.

---

# Form State Design

Типовий pattern:

    input {
        border: 1px solid #aaa;
    }

    input:focus-visible {
        outline: 2px solid blue;
    }

    input:user-valid {
        border-color: green;
    }

    input:user-invalid {
        border-color: red;
    }

Це створює:

    default
        ↓
    focus
        ↓
    valid / invalid

---

# Zebra Striping

`:nth-child()` часто використовується для таблиць.

    tr:nth-child(even) {
        background: #f5f5f5;
    }

Або:

    tr:nth-child(odd) {
        background: #fff;
    }

---

# List Separators

Замість:

    li {
        border-bottom: 1px solid #ddd;
    }

    li:last-child {
        border-bottom: none;
    }

можна:

    li:not(:last-child) {
        border-bottom: 1px solid #ddd;
    }

Це дуже поширений pattern.

---

# First Item

    li:first-child {
        font-weight: bold;
    }

---

# Last Item

    li:last-child {
        margin-bottom: 0;
    }

---

# Every Second Item

    li:nth-child(even) {
        background: #f5f5f5;
    }

---

# Every Third Item

    li:nth-child(3n) {
        color: red;
    }

---

# First Three Items

    li:nth-child(-n + 3) {
        font-weight: bold;
    }

---

# Items After Third

    li:nth-child(n + 4) {
        color: gray;
    }

---

# Last Three Items

Один із варіантів:

    li:nth-last-child(-n + 3) {
        font-weight: bold;
    }

---

# Form Group

Приклад із `:focus-within`:

    .form-group {
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 8px;
    }

    .form-group:focus-within {
        border-color: blue;
    }

---

# Card With Image

`:has()`:

    .card:has(img) {
        padding-top: 0;
    }

---

# Card Without Image

    .card:not(:has(img)) {
        padding: 24px;
    }

---

# Practical Examples

## Приклад 1 — hover button

    .button:hover {
        background: black;
        color: white;
    }

---

## Приклад 2 — active button

    .button:active {
        transform: scale(0.98);
    }

---

## Приклад 3 — keyboard focus

    .button:focus-visible {
        outline: 2px solid blue;
        outline-offset: 3px;
    }

---

## Приклад 4 — focus-within

    .field:focus-within {
        border-color: blue;
    }

---

## Приклад 5 — checked checkbox

    input[type="checkbox"]:checked {
        accent-color: green;
    }

---

## Приклад 6 — disabled button

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

---

## Приклад 7 — invalid input

    input:invalid {
        border-color: red;
    }

---

## Приклад 8 — valid input

    input:valid {
        border-color: green;
    }

---

## Приклад 9 — first item

    li:first-child {
        font-weight: bold;
    }

---

## Приклад 10 — last item

    li:last-child {
        margin-bottom: 0;
    }

---

## Приклад 11 — zebra list

    li:nth-child(even) {
        background: #f5f5f5;
    }

---

## Приклад 12 — every third item

    li:nth-child(3n) {
        color: red;
    }

---

## Приклад 13 — exclude last child

    li:not(:last-child) {
        border-bottom: 1px solid #ddd;
    }

---

## Приклад 14 — multiple selectors with :is()

    :is(h1, h2, h3):hover {
        color: blue;
    }

---

## Приклад 15 — zero-specificity defaults

    :where(.card, .panel) {
        padding: 20px;
    }

---

## Приклад 16 — parent reacts to child

    .card:has(img) {
        border-color: blue;
    }

---

## Приклад 17 — invalid field group

    .field:has(input:user-invalid) {
        border-color: red;
    }

---

## Приклад 18 — required invalid field

    input:required:user-invalid {
        border-color: red;
    }

---

# Типові помилки

❌ Плутати pseudo-class та pseudo-element.

Pseudo-class:

    :hover

Pseudo-element:

    ::before

---

❌ Використовувати `:first-child`, коли потрібен `:first-of-type`.

Наприклад:

    <div>
        <h2>Title</h2>
        <p>One</p>
        <p>Two</p>
    </div>

Selector:

    p:first-child

нічого не вибере.

Правильно:

    p:first-of-type

---

❌ Плутати `:nth-child()` та `:nth-of-type()`.

`:nth-child()`:

    враховує позицію серед усіх children.

`:nth-of-type()`:

    враховує позицію серед елементів конкретного type.

---

❌ Прибирати focus outline.

Погано:

    :focus {
        outline: none;
    }

без альтернативного focus indicator.

---

❌ Покладатися тільки на `:hover`.

Hover не є достатнім механізмом для:

    keyboard users
    touch users
    accessibility

---

❌ Використовувати `:hover` для критичної інформації.

Важлива інформація повинна бути доступною не лише при наведенні.

---

❌ Занадто складні `:nth-child()` формули.

Наприклад:

    :nth-child(7n + 13)

може бути складним для підтримки, якщо простіший selector вирішує задачу.

---

❌ Надмірно використовувати `:has()`.

`:has()` дуже потужний, але складні selectors можуть погіршувати читабельність.

---

❌ Надмірно використовувати `:not()`.

Наприклад:

    div:not(.a):not(.b):not(.c):not(.d)

може бути ознакою того, що HTML або CSS architecture можна спростити.

---

❌ Плутати `:disabled` з `[disabled]`.

    :disabled

перевіряє disabled state елемента.

    [disabled]

перевіряє наявність HTML attribute.

Це не завжди однакова семантика.

---

❌ Показувати validation state одразу після завантаження форми.

Наприклад:

    input:invalid {
        border-color: red;
    }

може показувати помилку ще до взаємодії користувача.

Для кращого UX часто корисні:

    :user-valid
    :user-invalid

---

# :disabled vs [disabled]

Це важлива відмінність.

Attribute selector:

    button[disabled] {
        opacity: 0.5;
    }

Pseudo-class:

    button:disabled {
        opacity: 0.5;
    }

`:disabled` описує фактичний disabled state control.

---

# :checked vs [checked]

HTML:

    <input type="checkbox" checked>

Attribute:

    [checked]

відображає наявність атрибута.

Pseudo-class:

    :checked

відображає поточний checked state.

Наприклад, checkbox може змінити state після взаємодії користувача, тоді як HTML attribute не обов'язково зміниться.

Тому для поточного стану control зазвичай використовують:

    :checked

---

# :required vs [required]

Аналогічно:

    input:required

означає, що control є required.

А:

    input[required]

перевіряє наявність attribute.

Для form state pseudo-class часто є більш семантичним вибором.

---

# Pseudoclasses та JavaScript

CSS pseudo-classes часто дозволяють реалізувати interaction без JavaScript.

Наприклад:

    .button:hover
    .button:active
    input:checked
    input:focus
    input:valid

JavaScript потрібен тоді, коли interaction потребує:

    складної логіки
    зміни data
    network requests
    state management
    dynamic DOM changes

CSS pseudo-classes не замінюють JavaScript, але дозволяють значно зменшити його використання для простих UI states.

---

# Pseudoclasses та HTML Semantics

Правильна HTML-структура робить pseudo-classes кориснішими.

Наприклад:

    <button disabled>
        Save
    </button>

дозволяє:

    button:disabled

А:

    <div class="button disabled">
        Save
    </div>

не має такої самої native form behavior.

Тому:

    semantic HTML
        ↓
    native states
        ↓
    CSS pseudoclasses

є хорошим підходом.

---

# State-Based Styling

Одна з головних ідей псевдокласів:

    element
        ↓
    state
        ↓
    visual style

Наприклад:

    button
        ↓
    :hover
        ↓
    darker background

Або:

    input
        ↓
    :invalid
        ↓
    red border

---

# Типова модель UI State

Для button:

    default
    hover
    focus-visible
    active
    disabled

CSS:

    .button {
        ...
    }

    .button:hover {
        ...
    }

    .button:focus-visible {
        ...
    }

    .button:active {
        ...
    }

    .button:disabled {
        ...
    }

---

# Типова модель Input State

    default
    focus
    valid
    invalid
    disabled
    readonly

CSS:

    input {
        ...
    }

    input:focus-visible {
        ...
    }

    input:user-valid {
        ...
    }

    input:user-invalid {
        ...
    }

    input:disabled {
        ...
    }

    input:read-only {
        ...
    }

---

# Псевдокласи та Component Design

У component-based CSS псевдокласи часто є частиною API компонента.

Наприклад:

    .button {
        ...
    }

    .button:hover {
        ...
    }

    .button:focus-visible {
        ...
    }

    .button:active {
        ...
    }

    .button:disabled {
        ...
    }

Це дозволяє компоненту мати чіткі visual states без додавання зайвих класів через JavaScript.

---

# Pseudoclasses and Design Systems

Design system може визначати states:

    default
    hover
    active
    focus
    disabled
    selected
    invalid

Наприклад:

    .button {
        background: var(--button-bg);
    }

    .button:hover {
        background: var(--button-bg-hover);
    }

    .button:active {
        background: var(--button-bg-active);
    }

    .button:focus-visible {
        outline: var(--focus-ring);
    }

    .button:disabled {
        opacity: 0.5;
    }

---

# Питання зі співбесіди

Що таке pseudo-class?

Чим pseudo-class відрізняється від pseudo-element?

Які interaction pseudo-classes ви знаєте?

Що робить `:hover`?

Що робить `:active`?

Що робить `:focus`?

Що робить `:focus-visible`?

Чим `:focus` відрізняється від `:focus-visible`?

Що робить `:focus-within`?

Що робить `:link`?

Що робить `:visited`?

Що таке LVHA?

Що робить `:checked`?

Що робить `:disabled`?

Чим `:disabled` відрізняється від `[disabled]`?

Що робить `:enabled`?

Що робить `:required`?

Що робить `:optional`?

Що робить `:valid`?

Що робить `:invalid`?

Що робить `:user-valid`?

Що робить `:user-invalid`?

Що робить `:in-range`?

Що робить `:out-of-range`?

Що робить `:read-only`?

Що робить `:read-write`?

Що робить `:placeholder-shown`?

Що робить `:first-child`?

Що робить `:last-child`?

Що робить `:only-child`?

Що робить `:nth-child()`?

Що означає:

    :nth-child(odd)

Що означає:

    :nth-child(even)

Що означає:

    :nth-child(3n)

Що означає:

    :nth-child(n + 4)

Що робить `:nth-last-child()`?

Чим `:first-child` відрізняється від `:first-of-type`?

Чим `:nth-child()` відрізняється від `:nth-of-type()`?

Що робить `:only-of-type`?

Що робить `:empty`?

Що робить `:root`?

Що робить `:target`?

Що робить `:lang()`?

Що робить `:not()`?

Що робить `:is()`?

Що робить `:where()`?

Чим `:is()` відрізняється від `:where()`?

Що робить `:has()`?

Чому `:has()` називають relational pseudo-class?

Як `:has()` може використовуватися як parent selector?

Як псевдокласи впливають на specificity?

Яка specificity у `:where()`?

Чому не варто прибирати focus outline?

Як зробити доступний focus state?

Як стилізувати disabled button?

Як стилізувати checked checkbox?

Як створити zebra table за допомогою `:nth-child()`?

Як вибрати всі елементи, крім останнього?

Як вибрати елемент, якщо всередині нього є `img`?

---

# Шлях

## 🟢 Core (обов'язково знати)

Що таке pseudo-class.

Різниця:

    pseudo-class
    pseudo-element

Основні interaction states:

    :hover
    :active
    :focus
    :focus-visible
    :focus-within

Link states:

    :link
    :visited

Form states:

    :checked
    :disabled
    :enabled
    :required
    :optional
    :valid
    :invalid

Structural:

    :first-child
    :last-child
    :nth-child()
    :first-of-type
    :last-of-type

Logical:

    :not()

Specificity.

Accessibility.

Keyboard focus.

---

## 🔵 Junior

Впевнене використання:

    :hover
    :active
    :focus-visible
    :focus-within

Form states:

    :checked
    :disabled
    :required
    :valid
    :invalid
    :placeholder-shown
    :read-only

Structural selectors:

    :first-child
    :last-child
    :nth-child()
    :nth-last-child()
    :first-of-type
    :last-of-type
    :nth-of-type()

Logical selectors:

    :not()
    :is()
    :where()

Розуміння:

    specificity
    cascade
    keyboard navigation
    form validation

Практичне використання:

    cards
    lists
    tables
    forms
    buttons
    navigation
    interactive components

---

## 🟠 Middle

Глибше розуміння:

    :has()
    :is()
    :where()
    :not()

Розуміння specificity:

    pseudo-class
    :is()
    :where()
    :has()

Advanced form states:

    :user-valid
    :user-invalid
    :in-range
    :out-of-range
    :default

Складні structural selectors.

Комбінування:

    pseudo-classes
    combinators
    attribute selectors
    classes

Створення state systems для components.

Accessibility-aware interaction design.

CSS без зайвого JavaScript для простих states.

---

## 🔴 Senior

Глибоке розуміння:

    selector matching
    specificity
    cascade
    relational selectors
    structural selectors
    form validation states

Advanced:

    :has()
    :is()
    :where()
    :not()

Архітектура component states.

Design systems.

Accessible state design.

Keyboard navigation.

Focus management.

Progressive enhancement.

Розуміння trade-offs між:

    CSS state
    HTML state
    JavaScript state

Оптимізація складних selectors.

Створення predictable selector architecture.

Мінімізація specificity conflicts.

---

# Міні-шпаргалка

## Interaction

    :hover
        → pointer над елементом

    :active
        → елемент активний / натискається

    :focus
        → елемент має focus

    :focus-visible
        → focus indicator, коли він потрібен

    :focus-within
        → сам елемент або descendant має focus

---

## Links

    :link
        → unvisited link

    :visited
        → visited link

    :hover
        → pointer interaction

    :active
        → active interaction

---

## Forms

    :checked
        → checked checkbox/radio

    :disabled
        → disabled control

    :enabled
        → enabled control

    :required
        → required control

    :optional
        → optional control

    :valid
        → valid value

    :invalid
        → invalid value

    :in-range
        → value inside range

    :out-of-range
        → value outside range

    :read-only
        → readonly control

    :read-write
        → editable control

    :placeholder-shown
        → placeholder visible

---

## Structure

    :first-child
        → first child

    :last-child
        → last child

    :only-child
        → only child

    :nth-child()
        → child by position

    :first-of-type
        → first element of type

    :last-of-type
        → last element of type

    :only-of-type
        → only element of type

    :nth-of-type()
        → element of type by position

---

## Logic

    :not()
        → exclude

    :is()
        → one of selectors

    :where()
        → one of selectors, zero specificity

    :has()
        → element based on related descendant

---

## Document

    :root
        → root element

    :target
        → URL fragment target

    :lang()
        → language

---

## nth-child

    :nth-child(odd)
        → 1, 3, 5, ...

    :nth-child(even)
        → 2, 4, 6, ...

    :nth-child(3n)
        → 3, 6, 9, ...

    :nth-child(3n + 1)
        → 1, 4, 7, ...

    :nth-child(-n + 3)
        → first 3

    :nth-child(n + 4)
        → from 4th

---

## Child vs Type

    :first-child
        → position among all children

    :first-of-type
        → position among same element type

---

## Specificity

    .class
        → class specificity

    :hover
        → pseudo-class specificity

    :focus
        → pseudo-class specificity

    :is(...)
        → specificity of most specific argument

    :where(...)
        → zero specificity

---

## Focus

    button:focus-visible {
        outline: 2px solid blue;
        outline-offset: 3px;
    }

---

## Form

    input:valid {
        border-color: green;
    }

    input:invalid {
        border-color: red;
    }

---

## Structure

    li:first-child {
        ...
    }

    li:last-child {
        ...
    }

    li:nth-child(even) {
        ...
    }

---

## Exclude

    li:not(:last-child) {
        border-bottom: 1px solid #ddd;
    }

---

## Parent based on child

    .card:has(img) {
        ...
    }

---

# Основні правила

    :hover
        → interaction

    :active
        → active state

    :focus-visible
        → keyboard-friendly focus

    :focus-within
        → descendant focus

    :checked
        → selected form control

    :disabled
        → disabled control

    :valid / :invalid
        → validation state

    :first-child / :last-child
        → position

    :nth-child()
        → position pattern

    :first-of-type / :nth-of-type()
        → position by element type

    :not()
        → exclude

    :is()
        → group selectors

    :where()
        → group selectors with zero specificity

    :has()
        → select based on related content

---

# Головне:

• Pseudo-class починається з одного двокрапки:

    :hover

• Псевдоклас описує state, condition, position або relationship елемента.

• Найважливіші interaction pseudo-classes:

    :hover
    :active
    :focus
    :focus-visible
    :focus-within

• `:hover` використовується для pointer interaction.

• `:active` описує активний стан під час взаємодії.

• `:focus` описує елемент, який має focus.

• `:focus-visible` особливо корисний для доступної keyboard navigation.

• `:focus-within` дозволяє стилізувати parent, коли focus знаходиться всередині нього.

• Основні form pseudo-classes:

    :checked
    :disabled
    :enabled
    :required
    :optional
    :valid
    :invalid
    :in-range
    :out-of-range
    :read-only
    :read-write
    :placeholder-shown

• `:checked` описує поточний checked state checkbox або radio.

• `:disabled` описує disabled state form control.

• `:valid` та `:invalid` описують validation state.

• `:user-valid` та `:user-invalid` корисні для validation UX після взаємодії користувача.

• Structural pseudo-classes дозволяють вибирати елементи за положенням:

    :first-child
    :last-child
    :nth-child()
    :first-of-type
    :last-of-type
    :nth-of-type()

• `:first-child` дивиться на позицію серед усіх children.

• `:first-of-type` дивиться на позицію серед елементів такого самого type.

• `:nth-child()` дозволяє створювати pattern-based selection:

    odd
    even
    3n
    3n + 1
    -n + 3
    n + 4

• `:not()` дозволяє виключити елементи.

• `:is()` дозволяє об'єднати кілька selectors.

• `:where()` схожий на `:is()`, але має zero specificity.

• `:has()` дозволяє стилізувати елемент залежно від пов'язаного з ним content.

• Псевдокласи беруть участь у CSS specificity та cascade.

• Для accessibility не слід покладатися лише на `:hover`.

• Focus indicator повинен залишатися видимим для keyboard users.

• Не слід бездумно використовувати:

    outline: none;

• Для сучасного focus state часто краще:

    :focus-visible

• Semantic HTML допомагає використовувати native states:

    :checked
    :disabled
    :required
    :valid
    :invalid

• CSS pseudo-classes часто дозволяють реалізувати прості UI states без JavaScript.

• Типова модель component interaction:

    default
        ↓
    hover
        ↓
    focus-visible
        ↓
    active
        ↓
    disabled

• Типова модель form:

    default
        ↓
    focus
        ↓
    valid / invalid
        ↓
    disabled / readonly

• Головна ідея псевдокласів:

    element
        ↓
    state / condition / position
        ↓
    style

• Псевдокласи — один із ключових механізмів CSS для створення інтерактивного, структурного та доступного UI.