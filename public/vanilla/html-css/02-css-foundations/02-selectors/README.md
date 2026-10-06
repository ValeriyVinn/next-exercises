# 02. CSS Selectors

CSS selector — це частина CSS rule, яка визначає, **які HTML-елементи потрібно вибрати та стилізувати**.

Наприклад:

    p {
        color: blue;
    }

Тут:

    p
      ↓
    selector

    color: blue;
      ↓
    declaration

Selector відповідає на питання:

    "До яких HTML-елементів потрібно застосувати це правило?"

Selectors — одна з найважливіших частин CSS.

Без selectors браузер не знав би, до яких елементів застосовувати declarations.

---

### Основні типи CSS Selectors

    Universal selector
    Element selector
    Class selector
    ID selector
    Attribute selector
    Selector list
    Descendant selector
    Child selector
    Adjacent sibling selector
    General sibling selector
    Pseudo-class
    Pseudo-element

---

### Ключові поняття

✔ selector  
✔ selector list  
✔ simple selector  
✔ compound selector  
✔ complex selector  
✔ universal selector  
✔ type selector  
✔ element selector  
✔ class selector  
✔ ID selector  
✔ attribute selector  
✔ descendant combinator  
✔ child combinator  
✔ adjacent sibling combinator  
✔ general sibling combinator  
✔ combinator  
✔ pseudo-class  
✔ pseudo-element  
✔ `*`  
✔ `.`  
✔ `#`  
✔ `[]`  
✔ `>`  
✔ `+`  
✔ `~`  
✔ `:`  
✔ `::`  
✔ specificity  
✔ selector matching  
✔ selector specificity  
✔ selector nesting  
✔ `:is()`  
✔ `:where()`  
✔ `:not()`  
✔ `:has()`  

---

### Що потрібно пам'ятати

• Selector визначає, які елементи вибирає CSS rule.

• Element selector вибирає HTML-елементи за назвою.

• Class selector записується через `.`.

• ID selector записується через `#`.

• Universal selector записується через `*`.

• Attribute selector записується через `[ ]`.

• Descendant combinator записується через пробіл.

• Child combinator записується через `>`.

• Adjacent sibling combinator записується через `+`.

• General sibling combinator записується через `~`.

• Pseudo-class починається з `:`.

• Pseudo-element починається з `::`.

• Selector list дозволяє застосувати одне правило до декількох selectors.

• Class selectors найчастіше використовуються для reusable styling.

• ID selectors мають високу specificity і зазвичай не є основним інструментом для reusable component styling.

• `for...in` та CSS selectors — різні поняття; selector працює на рівні CSS matching.

• Простий selector може складатися з одного компонента.

• Compound selector поєднує кілька simple selectors без combinator.

• Complex selector може містити combinators.

• Specificity визначає вагу selector під час cascade.

• `:is()`, `:where()`, `:not()` та `:has()` дозволяють створювати складніші selector patterns.

---

# Selector

CSS rule:

    selector {
        property: value;
    }

Наприклад:

    p {
        color: blue;
    }

`p` — selector.

Він вибирає всі:

    <p>

---

# Element Selector

Element selector, або type selector, вибирає елементи за назвою HTML-тега.

Наприклад:

    p {
        color: gray;
    }

Вибираються всі:

    <p>

---

### Приклад

HTML:

    <p>First paragraph</p>
    <p>Second paragraph</p>
    <div>Some content</div>

CSS:

    p {
        color: blue;
    }

Результат:

    <p>First paragraph</p>
    <p>Second paragraph</p>

отримають:

    color: blue;

`div` не буде вибраний.

---

# Інші Element Selectors

    h1 {
        ...
    }

    h2 {
        ...
    }

    button {
        ...
    }

    input {
        ...
    }

    img {
        ...
    }

    section {
        ...
    }

    article {
        ...
    }

---

# Element Selector та HTML

HTML:

    <h1>Title</h1>
    <p>Text</p>
    <button>Save</button>

CSS:

    h1 {
        color: navy;
    }

    p {
        color: gray;
    }

    button {
        background-color: blue;
    }

Кожен selector вибирає відповідний тип елемента.

---

# Universal Selector

Universal selector:

    *

означає:

    select all elements

Наприклад:

    * {
        box-sizing: border-box;
    }

Це правило застосовується до всіх елементів, до яких selector застосовується.

---

### Приклад

HTML:

    <h1>Title</h1>
    <p>Text</p>
    <div>Content</div>
    <button>Save</button>

CSS:

    * {
        box-sizing: border-box;
    }

Universal selector вибирає всі ці elements.

---

# Universal Selector з Combinator

Universal selector можна використовувати і в складніших selectors.

Наприклад:

    .card > * {
        margin: 0;
    }

Це означає:

    усі direct children .card

---

# Class Selector

Class selector позначається:

    .

Наприклад:

    .card {
        padding: 20px;
    }

HTML:

    <article class="card">
        Content
    </article>

`.card` вибирає елемент з:

    class="card"

---

# Class Selector — основний інструмент

Classes дуже часто використовуються для CSS styling.

Наприклад:

    .button {
        padding: 10px 20px;
    }

HTML:

    <button class="button">
        Save
    </button>

---

# Один Class на декількох елементах

Один class може бути використаний багато разів.

HTML:

    <button class="button">
        Save
    </button>

    <button class="button">
        Cancel
    </button>

CSS:

    .button {
        padding: 10px 20px;
    }

Обидва buttons отримають styles.

---

# Кілька Classes

HTML element може мати декілька classes.

    <button class="button button-primary">
        Save
    </button>

CSS:

    .button {
        padding: 10px 20px;
    }

    .button-primary {
        background-color: blue;
        color: white;
    }

Елемент отримує styles з обох selectors.

---

# Compound Class Selector

Можна вибрати елемент, який має одночасно кілька classes.

    .button.primary {
        background-color: blue;
    }

HTML:

    <button class="button primary">
        Save
    </button>

Цей selector означає:

    element has class="button"
    AND
    element has class="primary"

Важливо:

    .button.primary

не означає descendant.

Це один compound selector.

---

# Class Selector без пробілу

    .card.featured

означає:

    element has both classes

А:

    .card .featured

означає:

    .featured is descendant of .card

Це дуже важлива різниця.

---

# ID Selector

ID selector позначається:

    #

Наприклад:

    #header {
        background-color: black;
    }

HTML:

    <header id="header">
        ...
    </header>

---

# ID має бути унікальним

У документі `id` повинен ідентифікувати один конкретний element.

Наприклад:

    <header id="header">
        ...
    </header>

Не рекомендується використовувати той самий `id` для декількох елементів.

---

# Class vs ID

Class:

    .button {
        ...
    }

ID:

    #header {
        ...
    }

Class:

    ✔ можна використовувати багато разів
    ✔ добре підходить для reusable styles
    ✔ часто використовується в component styling

ID:

    ✔ ідентифікує конкретний element
    ✔ має вищу specificity
    ✘ не такий зручний для reusable styling

---

# Selector List

Можна застосувати одне правило до декількох selectors.

Наприклад:

    h1,
    h2,
    h3 {
        color: navy;
    }

Це selector list.

Усі три selectors отримують один declaration block.

---

# Selector List — приклад

HTML:

    <h1>Title</h1>
    <h2>Subtitle</h2>
    <h3>Section</h3>

CSS:

    h1,
    h2,
    h3 {
        font-family: Arial, sans-serif;
        color: #222;
    }

---

# Comma в Selector List

Кома:

    ,

розділяє незалежні selectors.

Наприклад:

    h1, h2, h3

означає:

    h1
    OR
    h2
    OR
    h3

Це не те саме, що:

    h1 h2 h3

---

# Descendant Selector

Descendant combinator — пробіл.

Наприклад:

    .card p {
        color: gray;
    }

Це означає:

    будь-який <p>,
    який знаходиться всередині .card

---

### HTML

    <article class="card">
        <p>Text</p>

        <div>
            <p>Nested text</p>
        </div>
    </article>

CSS:

    .card p {
        color: gray;
    }

Обидва `<p>` будуть вибрані.

Причина:

    .card
      ↓
    descendant
      ↓
    p

Глибина вкладеності не має значення.

---

# Direct Child Selector

Child combinator:

    >

Наприклад:

    .card > p {
        color: blue;
    }

Це означає:

    <p> є безпосереднім child .card

---

### HTML

    <article class="card">
        <p>Direct child</p>

        <div>
            <p>Nested paragraph</p>
        </div>
    </article>

CSS:

    .card > p {
        color: blue;
    }

Буде вибрано:

    <p>Direct child</p>

А цей:

    <div>
        <p>Nested paragraph</p>
    </div>

не буде вибраний.

---

# Descendant vs Child

Descendant:

    .card p

означає:

    будь-який p всередині .card

Child:

    .card > p

означає:

    тільки прямий child p

---

### Приклад

HTML:

    <div class="card">
        <p>One</p>

        <div>
            <p>Two</p>
        </div>
    </div>

Selector:

    .card p

вибере:

    One
    Two

Selector:

    .card > p

вибере тільки:

    One

---

# Adjacent Sibling Selector

Adjacent sibling combinator:

    +

Вибирає безпосередній наступний sibling.

Наприклад:

    h2 + p {
        margin-top: 0;
    }

Це означає:

    p
    який безпосередньо знаходиться після h2

---

### HTML

    <h2>Title</h2>
    <p>First paragraph</p>
    <p>Second paragraph</p>

CSS:

    h2 + p {
        color: blue;
    }

Буде вибрано тільки:

    First paragraph

---

# General Sibling Selector

General sibling combinator:

    ~

Вибирає всі наступні siblings, які відповідають selector.

Наприклад:

    h2 ~ p {
        color: gray;
    }

---

### HTML

    <h2>Title</h2>
    <p>First paragraph</p>
    <p>Second paragraph</p>
    <div>Other content</div>
    <p>Third paragraph</p>

CSS:

    h2 ~ p {
        color: gray;
    }

Будуть вибрані всі `<p>`, які:

    знаходяться після h2
    і є його siblings

---

# Combinators

Основні combinators:

    descendant
        " "

    child
        >

    adjacent sibling
        +

    general sibling
        ~

---

# Combinator Diagram

    A B

означає:

    B descendant of A

---

    A > B

означає:

    B direct child of A

---

    A + B

означає:

    B immediately follows A

---

    A ~ B

означає:

    B is a later sibling of A

---

# Compound Selector

Compound selector поєднує кілька simple selectors для одного element.

Наприклад:

    button.primary.large {
        ...
    }

Тут:

    button
    .primary
    .large

повинні відповідати одному element.

HTML:

    <button class="primary large">
        Save
    </button>

---

# Compound Selector — приклади

    input.required

    button.primary

    div.card.featured

    a.button.active

Наприклад:

    button.primary {
        background-color: blue;
    }

Вибираються тільки `<button>`, які мають class:

    primary

---

# Compound vs Complex Selector

Compound:

    .card.featured

Усі simple selectors відносяться до одного element.

Complex:

    .card .title

Має relationship між двома elements:

    .card
       ↓
    descendant
       ↓
    .title

---

# Complex Selector

Complex selector може містити:

    simple selectors
    combinators

Наприклад:

    .card > .content p {
        color: gray;
    }

Структура:

    .card
      ↓
      >
      ↓
    .content
      ↓
    descendant
      ↓
    p

---

# Attribute Selector

Attribute selector записується через:

    [attribute]

Наприклад:

    [disabled] {
        opacity: 0.5;
    }

Це вибирає елементи, які мають attribute:

    disabled

---

# Attribute Exists

Selector:

    [required]

означає:

    element has required attribute

HTML:

    <input required>

CSS:

    input[required] {
        border-color: red;
    }

---

# Attribute Equals

Selector:

    [type="email"]

означає:

    attribute type has exactly value "email"

HTML:

    <input type="email">

CSS:

    input[type="email"] {
        border-color: blue;
    }

---

# Attribute Equals — приклад

HTML:

    <input type="text">
    <input type="email">
    <input type="password">

CSS:

    input[type="email"] {
        background-color: lightblue;
    }

Тільки email input буде вибраний.

---

# Attribute Starts With

Оператор:

    ^=

означає:

    value starts with

Наприклад:

    a[href^="https://"] {
        color: green;
    }

Це вибирає links, `href` яких починається з:

    https://

---

# Attribute Ends With

Оператор:

    $=

означає:

    value ends with

Наприклад:

    a[href$=".pdf"] {
        color: red;
    }

Вибираються links, які закінчуються на:

    .pdf

---

# Attribute Contains

Оператор:

    *=

означає:

    value contains

Наприклад:

    a[href*="example"] {
        color: blue;
    }

Вибираються elements, де attribute value містить:

    example

---

# Attribute Word Contains

Оператор:

    ~=

означає:

    attribute value contains a whitespace-separated word

Наприклад:

    [class~="active"] {
        color: red;
    }

---

# Attribute Prefix

Оператор:

    |=

має спеціальну поведінку для language-like values.

Наприклад:

    [lang|="en"] {
        ...
    }

Може відповідати:

    lang="en"

або:

    lang="en-US"

---

# Attribute Selectors — Summary

    [attr]
        → attribute exists

    [attr="value"]
        → exact match

    [attr^="value"]
        → starts with

    [attr$="value"]
        → ends with

    [attr*="value"]
        → contains

    [attr~="value"]
        → contains word

    [attr|="value"]
        → exact or prefix followed by hyphen

---

# Attribute Selector + Element

Можна комбінувати element selector з attribute selector.

Наприклад:

    input[type="email"] {
        border-color: blue;
    }

Це точніше, ніж:

    [type="email"] {
        border-color: blue;
    }

---

# Attribute Selector + Class

Наприклад:

    input.form-control[type="email"] {
        ...
    }

Element повинен мати:

    input
    class="form-control"
    type="email"

---

# Pseudo-class

Pseudo-class починається з:

    :

Наприклад:

    :hover

    :focus

    :active

    :disabled

Pseudo-class описує особливий стан або умову для element.

---

# `:hover`

`:hover` застосовується, коли pointer знаходиться над element.

Наприклад:

    button:hover {
        background-color: blue;
        color: white;
    }

---

# `:focus`

`:focus` застосовується, коли element має focus.

Наприклад:

    input:focus {
        border-color: blue;
    }

Особливо важливо для keyboard accessibility.

---

# `:active`

`:active` описує активний стан element під час взаємодії.

Наприклад:

    button:active {
        transform: scale(0.98);
    }

---

# `:visited`

`:visited` використовується для відвіданих links.

Наприклад:

    a:visited {
        color: purple;
    }

---

# `:link`

`:link` вибирає невідвідані links.

Наприклад:

    a:link {
        color: blue;
    }

---

# `:checked`

`:checked` вибирає checked form controls.

HTML:

    <input type="checkbox">

CSS:

    input:checked {
        accent-color: blue;
    }

---

# `:disabled`

`:disabled` вибирає disabled form controls.

HTML:

    <button disabled>
        Save
    </button>

CSS:

    button:disabled {
        opacity: 0.5;
    }

---

# `:enabled`

`:enabled` вибирає enabled form controls.

    button:enabled {
        cursor: pointer;
    }

---

# `:required`

`:required` вибирає form controls з `required`.

    input:required {
        border-color: orange;
    }

---

# `:optional`

`:optional` вибирає form controls, які не є required.

    input:optional {
        background-color: white;
    }

---

# `:valid`

`:valid` вибирає element, який має valid value згідно з constraint validation.

Наприклад:

    input:valid {
        border-color: green;
    }

---

# `:invalid`

`:invalid` вибирає element з invalid value.

Наприклад:

    input:invalid {
        border-color: red;
    }

---

# `:first-child`

Вибирає element, який є першим child свого parent.

Наприклад:

    li:first-child {
        font-weight: bold;
    }

HTML:

    <ul>
        <li>First</li>
        <li>Second</li>
        <li>Third</li>
    </ul>

Буде вибрано:

    First

---

# `:last-child`

Вибирає останній child.

    li:last-child {
        font-weight: bold;
    }

Буде вибрано:

    Third

---

# `:nth-child()`

Вибирає child за позицією.

Наприклад:

    li:nth-child(2) {
        color: red;
    }

Вибирається другий child.

---

# `:nth-child(odd)`

Вибирає непарні позиції:

    li:nth-child(odd) {
        background-color: #eee;
    }

Наприклад:

    1
    3
    5
    7

---

# `:nth-child(even)`

Вибирає парні позиції:

    li:nth-child(even) {
        background-color: #eee;
    }

Наприклад:

    2
    4
    6
    8

---

# `:nth-child()` з формулою

Можна використовувати `an+b`.

Наприклад:

    li:nth-child(2n) {
        ...
    }

означає:

    2
    4
    6
    8
    ...

---

І:

    li:nth-child(2n + 1) {
        ...
    }

означає:

    1
    3
    5
    7
    ...

---

# `:first-of-type`

Вибирає перший element певного type серед siblings.

Наприклад:

    p:first-of-type {
        color: blue;
    }

---

# `:last-of-type`

Вибирає останній element певного type.

    p:last-of-type {
        color: blue;
    }

---

# `:nth-of-type()`

Вибирає element певного type за позицією серед siblings цього type.

Наприклад:

    p:nth-of-type(2) {
        color: red;
    }

---

# `:only-child`

Вибирає element, який є єдиним child свого parent.

    .card p:only-child {
        margin: 0;
    }

---

# `:empty`

Вибирає element, який не має children.

Наприклад:

    div:empty {
        display: none;
    }

---

# `:root`

`:root` вибирає root element документа.

Для HTML-документа це:

    <html>

Часто використовується для CSS custom properties:

    :root {
        --primary-color: blue;
    }

---

# `:not()`

`:not()` вибирає elements, які **не відповідають** selector.

Наприклад:

    button:not(.primary) {
        background-color: gray;
    }

Це означає:

    button
    які не мають .primary

---

# `:not()` — приклад

HTML:

    <button class="primary">Save</button>
    <button class="secondary">Cancel</button>

CSS:

    button:not(.primary) {
        opacity: 0.7;
    }

Застосовується до:

    .secondary

---

# `:is()`

`:is()` дозволяє групувати selectors.

Наприклад:

    :is(h1, h2, h3) {
        color: navy;
    }

Це зручна альтернатива довгому selector list у складних selectors.

---

# `:is()` — приклад

Замість:

    .article h1,
    .article h2,
    .article h3 {
        color: navy;
    }

можна написати:

    .article :is(h1, h2, h3) {
        color: navy;
    }

---

# `:where()`

`:where()` схожий на `:is()`, але має важливу особливість:

    specificity = 0

Наприклад:

    .article :where(h1, h2, h3) {
        color: navy;
    }

` :where()` часто корисний для базових styles, які легко override.

---

# `:is()` vs `:where()`

Обидва дозволяють групувати selectors.

Але:

    :is(...)
        → specificity залежить від найспецифічнішого selector у списку

    :where(...)
        → specificity = 0

Це важливо для cascade та CSS architecture.

---

# `:has()`

`:has()` дозволяє вибрати element залежно від його descendants або related elements.

Наприклад:

    .card:has(img) {
        ...
    }

Означає:

    .card
    який містить img

---

# `:has()` — приклад

HTML:

    <article class="card">
        <img src="photo.jpg" alt="">
        <h2>Mountain</h2>
    </article>

CSS:

    .card:has(img) {
        border: 2px solid blue;
    }

`.card` буде вибрано, тому що всередині є `img`.

---

# `:has()` — складніший приклад

    form:has(input:invalid) {
        border-color: red;
    }

Це означає:

    form
    який містить invalid input

`:has()` часто називають relational pseudo-class.

---

# Pseudo-element

Pseudo-element починається з:

    ::

Pseudo-element дозволяє стилізувати певну частину element або створювати generated content.

Приклади:

    ::before
    ::after
    ::first-letter
    ::first-line
    ::selection
    ::placeholder
    ::marker

---

# `::before`

Наприклад:

    .link::before {
        content: "→ ";
    }

HTML:

    <a class="link" href="#">
        Read more
    </a>

Результат візуально може виглядати як:

    → Read more

Для `::before` зазвичай потрібен:

    content

---

# `::after`

Наприклад:

    .link::after {
        content: " ↗";
    }

---

# `::first-letter`

Вибирає першу літеру тексту.

    p::first-letter {
        font-size: 2rem;
    }

---

# `::first-line`

Вибирає перший line тексту.

    p::first-line {
        font-weight: bold;
    }

Точна область першого line залежить від layout та available width.

---

# `::selection`

Стилізує selected text.

    ::selection {
        background-color: yellow;
        color: black;
    }

---

# `::placeholder`

Стилізує placeholder form control.

    input::placeholder {
        color: gray;
    }

---

# `::marker`

Стилізує marker списку.

    li::marker {
        color: blue;
    }

---

# Pseudo-class vs Pseudo-element

Pseudo-class:

    :

Приклади:

    :hover
    :focus
    :checked
    :first-child

Описує:

    state
    condition
    relationship

Pseudo-element:

    ::

Приклади:

    ::before
    ::after
    ::first-letter

Описує:

    part of an element
    generated content

---

# `:` vs `::`

Pseudo-class:

    button:hover

Pseudo-element:

    p::first-letter

Запам'ятати:

    :  → pseudo-class
    :: → pseudo-element

---

# Universal + Class

Можна комбінувати selectors.

Наприклад:

    *.card {
        ...
    }

Але `*` часто не потрібен:

    .card {
        ...
    }

Тому перший варіант зазвичай зайвий.

---

# Element + Class

Наприклад:

    button.primary {
        background-color: blue;
    }

Вибираються:

    <button class="primary">

але не:

    <a class="primary">

---

# Element + ID

Наприклад:

    header#main-header {
        ...
    }

Вибирається `<header>`, який має:

    id="main-header"

---

# Element + Attribute

    input[type="email"] {
        ...
    }

Вибирається:

    <input type="email">

---

# Element + Class + Attribute

Можна комбінувати:

    input.form-control[type="email"] {
        border-color: blue;
    }

---

# Multiple Classes

    .button.primary.large {
        ...
    }

Element повинен мати всі три classes:

    button
    primary
    large

Наприклад:

    <button class="button primary large">
        Save
    </button>

---

# Descendant Chain

Можна створювати довші descendant selectors:

    .page .content .card .title {
        color: blue;
    }

Це означає:

    .title
        ↓
    inside .card
        ↓
    inside .content
        ↓
    inside .page

Але занадто довгі selectors можуть ускладнювати підтримку.

---

# Child Chain

Наприклад:

    .page > .content > .card {
        ...
    }

Це вимагає exact parent-child structure.

---

# Mixed Combinators

Selectors можуть комбінувати різні combinators.

Наприклад:

    .page > .content .card > h2 {
        color: blue;
    }

Структура:

    .page
       ↓
       >
    .content
       ↓
    descendant
       ↓
    .card
       ↓
       >
    h2

---

# Selector Specificity Preview

Selectors мають різну specificity.

У спрощеному порядку:

    element
        ↓
    class / attribute / pseudo-class
        ↓
    ID

Наприклад:

    p {
        color: blue;
    }

    .text {
        color: green;
    }

    #main-text {
        color: red;
    }

Для:

    <p id="main-text" class="text">
        Hello
    </p>

найсильнішим із цих трьох selectors буде:

    #main-text

Детально specificity:

    03-specificity-and-cascade

---

# Specificity Categories

У спрощеній моделі:

    ID selectors
        ↓
    Class selectors
    Attribute selectors
    Pseudo-classes
        ↓
    Type selectors
    Pseudo-elements

Universal selector не додає звичайної specificity.

---

# Specificity Example

    #header {
        color: red;
    }

    .header {
        color: blue;
    }

    header {
        color: green;
    }

Для:

    <header id="header" class="header">

переможе:

    #header

---

# `:where()` Specificity

На відміну від звичайних pseudo-classes:

    :where(...)

має:

    specificity = 0

Наприклад:

    :where(.card .title) {
        color: gray;
    }

Це дозволяє створювати стилі, які легко перевизначити.

---

# `:is()` Specificity

`:is()` не має просто "нульової" specificity.

Його specificity визначається специфічністю найспецифічнішого selector у списку.

Наприклад:

    :is(p, .title, #main) {
        color: red;
    }

У списку є:

    p
    .title
    #main

Тому specificity `:is()` визначається найсильнішим selector у списку.

---

# `:not()` Specificity

`:not()` сама по собі не додає окрему фіксовану specificity.

Її specificity залежить від selector arguments.

Наприклад:

    button:not(.primary) {
        ...
    }

specificity враховує:

    button
    .primary

---

# Selector Matching

Browser порівнює selectors з DOM elements.

Наприклад:

    .card p {
        color: gray;
    }

Browser шукає:

    elements p

які відповідають умові:

    знаходяться всередині .card

Якщо element відповідає selector:

    declaration може бути застосована

---

# Selector Matching Example

HTML:

    <article class="card">
        <h2>Title</h2>
        <p>Description</p>
    </article>

CSS:

    .card p {
        color: gray;
    }

Browser:

    <article class="card">
        ...
            <p>
        ...
    </article>

Selector matches `<p>`.

---

# Selector Does Not Match

HTML:

    <article class="card">
        <h2>Title</h2>
    </article>

CSS:

    .card p {
        color: gray;
    }

Немає `<p>` всередині `.card`.

Отже:

    selector does not match

і declaration не застосовується до цього element.

---

# Attribute Selectors — практичний приклад

HTML:

    <input type="text">
    <input type="email">
    <input type="password">

CSS:

    input[type="email"] {
        border: 2px solid blue;
    }

Тільки:

    type="email"

отримає style.

---

# Links by Attribute

HTML:

    <a href="/about">About</a>

    <a href="https://example.com">
        External
    </a>

CSS:

    a[href^="https://"] {
        color: green;
    }

Вибирається external link.

---

# PDF Links

    a[href$=".pdf"] {
        font-weight: bold;
    }

Вибираються links, які закінчуються на:

    .pdf

---

# Disabled Controls

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

HTML:

    <button disabled>
        Save
    </button>

---

# Interactive Button

    button:hover {
        background-color: blue;
    }

    button:focus-visible {
        outline: 2px solid currentColor;
    }

    button:active {
        transform: scale(0.98);
    }

Це приклад використання різних pseudo-classes для різних states.

---

# `:focus-visible`

`:focus-visible` корисний для keyboard-accessible focus styles.

Наприклад:

    button:focus-visible {
        outline: 2px solid blue;
        outline-offset: 2px;
    }

На відміну від простого `:focus`, `:focus-visible` дозволяє браузеру визначати, коли focus indication особливо доречна для користувача.

---

# List Styling

HTML:

    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

CSS:

    li:first-child {
        font-weight: bold;
    }

    li:last-child {
        color: blue;
    }

    li:nth-child(2) {
        color: green;
    }

---

# Table-like Striping

Наприклад:

    tr:nth-child(even) {
        background-color: #f5f5f5;
    }

Це типовий pattern для zebra striping.

---

# Form Selectors

HTML:

    <form>
        <input type="text">
        <input type="email" required>
        <button type="submit">
            Send
        </button>
    </form>

CSS:

    input[type="email"] {
        border-color: blue;
    }

    input:required {
        border-color: orange;
    }

    input:valid {
        border-color: green;
    }

    button:disabled {
        opacity: 0.5;
    }

---

# `:first-child` vs `:first-of-type`

Це важлива різниця.

HTML:

    <div>
        <h2>Title</h2>
        <p>First paragraph</p>
        <p>Second paragraph</p>
    </div>

Selector:

    p:first-child

не match, тому що `<p>` не є першим child.

Першим child є:

    h2

А:

    p:first-of-type

match:

    First paragraph

тому що це перший `<p>` серед `<p>` siblings.

---

# `:nth-child()` vs `:nth-of-type()`

`:nth-child()` рахує позицію серед усіх children.

`:nth-of-type()` рахує позицію серед siblings того самого element type.

Наприклад:

    div > p:nth-child(2)

означає:

    p є другим child

А:

    div > p:nth-of-type(2)

означає:

    p є другим p серед p siblings

---

# `:only-child` vs `:only-of-type`

`:only-child`:

    element має бути єдиним child

`:only-of-type`:

    element має бути єдиним element свого type

Наприклад:

    p:only-of-type {
        ...
    }

може match `<p>`, навіть якщо поруч є:

    h2
    img
    div

---

# `:empty`

Наприклад:

    .message:empty {
        display: none;
    }

HTML:

    <div class="message"></div>

Цей element є empty.

---

# `:root`

Для HTML:

    :root {
        --color-primary: blue;
    }

Еквівалентний element selector:

    html {
        ...
    }

Але `:root` має специфічне значення як root element і часто використовується для global custom properties.

---

# Negation

Наприклад:

    input:not([type="submit"]) {
        ...
    }

Це означає:

    input
    які не мають type="submit"

---

# `:not()` з Class

    .button:not(.button-primary) {
        background-color: gray;
    }

Вибираються `.button`, які не мають `.button-primary`.

---

# `:not()` з Attribute

    input:not([disabled]) {
        ...
    }

Вибираються enabled-like inputs, які не мають `disabled` attribute.

---

# `:is()` для складних selectors

Без `:is()`:

    .card h1,
    .card h2,
    .card h3,
    .article h1,
    .article h2,
    .article h3 {
        color: navy;
    }

З `:is()`:

    :is(.card, .article) :is(h1, h2, h3) {
        color: navy;
    }

Це може зробити selector компактнішим.

Але надмірно складні selectors все одно можуть погіршувати читабельність.

---

# `:where()` для базових стилів

Наприклад:

    .article :where(h1, h2, h3) {
        margin-top: 0;
    }

Низька specificity `:where()` дозволяє легше override цей style.

---

# `:has()` для Parent-like Selection

Традиційно CSS не мав прямого способу сказати:

    "вибери parent, якщо всередині є X"

`:has()` додає таку можливість.

Наприклад:

    .card:has(.badge) {
        border-color: gold;
    }

Вибираються `.card`, які містять `.badge`.

---

# `:has()` з Direct Child

    .card:has(> img) {
        ...
    }

Означає:

    .card
    який має direct child img

---

# `:has()` з State

    form:has(input:invalid) {
        border-color: red;
    }

Означає:

    form
    який містить invalid input

---

# `:has()` та Browser Support

`:has()` є сучасною CSS можливістю.

Перед використанням у production потрібно враховувати browser compatibility.

Для сучасних проєктів перевіряти актуальну підтримку можна через browser compatibility resources та DevTools.

---

# Complex Selector Example

    .page > .content .card > h2:first-child {
        color: navy;
    }

Тут поєднано:

    class selector
    child combinator
    descendant combinator
    class selector
    child combinator
    element selector
    pseudo-class

Чим складніший selector, тим важливіше розуміти його структуру.

---

# Читання Complex Selector

Для:

    .page > .content .card > h2:first-child

можна читати справа наліво:

    h2:first-child
        ↓
    direct child of .card
        ↓
    .card descendant of .content
        ↓
    .content direct child of .page

Розуміння selectors справа наліво дуже корисне під час debugging.

---

# Практичний Component Example

HTML:

    <article class="card">
        <img class="card-image" src="photo.jpg" alt="Mountain">

        <div class="card-content">
            <h2 class="card-title">
                Mountain
            </h2>

            <p class="card-description">
                Beautiful mountain landscape.
            </p>

            <a class="card-link" href="#">
                Read more
            </a>
        </div>
    </article>

CSS:

    .card {
        padding: 20px;
    }

    .card-image {
        width: 100%;
    }

    .card-title {
        font-size: 24px;
    }

    .card-description {
        color: gray;
    }

    .card-link:hover {
        text-decoration: underline;
    }

Тут використовуються:

    .card
    .card-image
    .card-title
    .card-description
    .card-link
    :hover

---

# Practical Navigation Example

HTML:

    <nav class="navigation">
        <a href="/" class="navigation-link">
            Home
        </a>

        <a href="/about" class="navigation-link">
            About
        </a>

        <a href="/contact" class="navigation-link">
            Contact
        </a>
    </nav>

CSS:

    .navigation {
        display: flex;
    }

    .navigation-link {
        color: black;
    }

    .navigation-link + .navigation-link {
        margin-left: 20px;
    }

Тут:

    .navigation-link + .navigation-link

вибирає кожен `.navigation-link`, який має безпосередньо перед собою інший `.navigation-link`.

---

# Practical List Example

HTML:

    <ul class="menu">
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
        <li>Contact</li>
    </ul>

CSS:

    .menu li:first-child {
        font-weight: bold;
    }

    .menu li:last-child {
        color: blue;
    }

    .menu li:nth-child(even) {
        background-color: #f5f5f5;
    }

---

# Practical Form Example

HTML:

    <form class="form">
        <label>
            Email
            <input
                type="email"
                required
            >
        </label>

        <button type="submit">
            Send
        </button>
    </form>

CSS:

    .form input[type="email"] {
        border: 1px solid gray;
    }

    .form input:focus {
        border-color: blue;
    }

    .form input:invalid {
        border-color: red;
    }

    .form input:valid {
        border-color: green;
    }

    .form button:hover {
        background-color: blue;
        color: white;
    }

---

# Practical Pseudo-element Example

HTML:

    <a class="external-link" href="https://example.com">
        External website
    </a>

CSS:

    .external-link::after {
        content: " ↗";
    }

Візуально:

    External website ↗

---

# Практичний `:has()` Example

HTML:

    <article class="card">
        <span class="badge">New</span>
        <h2>CSS Selectors</h2>
    </article>

CSS:

    .card:has(.badge) {
        border: 2px solid gold;
    }

`.card` отримує border, тому що всередині є:

    .badge

---

# Selector Naming

Добрі class names:

    .card
    .card-title
    .card-content
    .button
    .button-primary
    .navigation
    .navigation-link

Гірші:

    .blue
    .big
    .thing
    .box1
    .red-text

Причина:

    style-based name
        ↓
    залежить від appearance

краще:

    semantic / role-based name
        ↓
    описує роль element

---

# Avoid Overly Specific Selectors

Наприклад:

    body main .page section.content article.card div.card-content h2.card-title {
        color: blue;
    }

Це занадто специфічний selector.

Часто краще:

    .card-title {
        color: blue;
    }

Переваги:

    ✔ простіше
    ✔ читабельніше
    ✔ легше override
    ✔ нижча specificity
    ✔ менше залежності від HTML structure

---

# Avoid Unnecessary Element Prefixes

Наприклад:

    div.card {
        ...
    }

часто можна замінити на:

    .card {
        ...
    }

Але:

    button.button

може бути корисним, якщо потрібно стилізувати саме `<button>` з певним class.

---

# Avoid Deep Selectors

Наприклад:

    .page .content .sidebar .menu ul li a {
        ...
    }

Краще часто використовувати:

    .menu-link {
        ...
    }

Глибокі selectors створюють сильну залежність CSS від HTML structure.

---

# Selector Strategy

Для component-based development часто зручно:

    component
        ↓
    element
        ↓
    modifier / state

Наприклад:

    .card
    .card-title
    .card-description
    .card-featured

Або:

    .button
    .button-primary
    .button-danger
    .button-disabled

---

# State Selectors

State часто описується pseudo-classes:

    .button:hover
    .button:focus-visible
    .button:active
    .input:invalid
    .input:disabled

Наприклад:

    .button:hover {
        background-color: darkblue;
    }

---

# Attribute vs Class

Іноді стан можна стилізувати через attribute:

    button[disabled] {
        opacity: 0.5;
    }

Або через pseudo-class:

    button:disabled {
        opacity: 0.5;
    }

Для native form states часто природніше використовувати відповідні pseudo-classes.

---

# CSS Selector Performance

Modern browsers добре оптимізують selector matching.

Не потрібно передчасно оптимізувати selectors заради мікроскопічної різниці performance.

Набагато важливіше:

    readability
    maintainability
    predictable specificity
    clear component boundaries

---

# Selector Specificity and Maintainability

Чим складніший selector, тим складніше його override.

Наприклад:

    .page .content .card .title {
        color: blue;
    }

Може бути складніше перевизначити, ніж:

    .card-title {
        color: blue;
    }

Тому краще не створювати specificity без необхідності.

---

# Типові помилки

❌ Плутати descendant та child selector.

    .card p

означає:

    будь-який descendant p

А:

    .card > p

означає:

    direct child p

---

❌ Плутати:

    .card.primary

та:

    .card .primary

Перше:

    один element
    має два classes

Друге:

    .primary знаходиться всередині .card

---

❌ Плутати `:` та `::`.

    :hover
        → pseudo-class

    ::before
        → pseudo-element

---

❌ Використовувати ID для всього.

Наприклад:

    #header
    #button
    #card
    #title

Для reusable styling краще часто використовувати classes:

    .header
    .button
    .card
    .title

---

❌ Створювати занадто довгі selectors.

Погано:

    body main .page .content .card .card-content h2.title {
        ...
    }

Краще:

    .card-title {
        ...
    }

---

❌ Надмірно використовувати `!important`.

Наприклад:

    .button {
        color: red !important;
    }

`!important` змінює cascade і може створити проблеми з override.

Краще спочатку розібратися:

    specificity
    source order
    cascade
    selector structure

---

❌ Використовувати `:nth-child()` без перевірки DOM structure.

Наприклад:

    p:nth-child(2)

не означає:

    "другий p"

Це означає:

    "p, який є другим child"

Якщо другим child є `<h2>`, selector не match.

---

❌ Плутати `:nth-child()` та `:nth-of-type()`.

    :nth-child()
        → position among all children

    :nth-of-type()
        → position among same element type

---

❌ Забувати про accessibility при `:focus`.

Наприклад, не варто бездумно прибирати focus indication:

    button:focus {
        outline: none;
    }

Keyboard users повинні мати видимий focus state.

Краще створити власний:

    button:focus-visible {
        outline: 2px solid blue;
        outline-offset: 2px;
    }

---

❌ Надмірно використовувати attribute selectors для component styling.

Наприклад:

    div[data-component="card"] {
        ...
    }

Для звичайного styling часто простіше:

    .card {
        ...
    }

Attribute selectors дуже корисні, але їх варто використовувати відповідно до задачі.

---

# Debugging Selectors

Якщо CSS rule не працює:

    1. Перевір selector.
    2. Перевір HTML structure.
    3. Перевір class / id.
    4. Перевір attribute.
    5. Перевір combinator.
    6. Перевір pseudo-class.
    7. Перевір pseudo-element.
    8. Перевір specificity.
    9. Перевір source order.
    10. Перевір DevTools.

---

# Selector Debugging Example

HTML:

    <div class="card">
        <div class="content">
            <p>Hello</p>
        </div>
    </div>

CSS:

    .card > p {
        color: blue;
    }

Стиль не працює.

Чому?

Тому що `<p>` не є direct child `.card`.

Структура:

    .card
      ↓
    .content
      ↓
    p

Правильний selector:

    .card .content p {
        color: blue;
    }

Або:

    .content p {
        color: blue;
    }

Або краще, якщо component structure це дозволяє:

    .card-description {
        color: blue;
    }

---

# Selector Debugging with DevTools

У DevTools можна:

    Inspect element
        ↓
    Styles
        ↓
    побачити selectors
        ↓
    перевірити matching
        ↓
    перевірити overridden rules
        ↓
    перевірити specificity

Якщо selector не match, правило зазвичай не з'являється серед applied styles для element.

---

# Практичний Selector Checklist

Перед написанням selector запитай:

    1. Який element потрібно стилізувати?
    2. Чи потрібен class?
    3. Чи потрібен attribute?
    4. Чи потрібен state?
    5. Чи потрібен relationship між elements?
    6. Чи потрібен descendant?
    7. Чи потрібен direct child?
    8. Чи потрібен sibling?
    9. Чи потрібен pseudo-class?
    10. Чи потрібен pseudo-element?

---

# Selector Choice

Якщо потрібно стилізувати component:

    .card

Якщо потрібно стилізувати element component:

    .card-title

Якщо потрібно стилізувати state:

    .button:hover

Якщо потрібно вибрати attribute:

    input[type="email"]

Якщо потрібен direct child:

    .card > p

Якщо потрібен descendant:

    .card p

Якщо потрібен adjacent sibling:

    h2 + p

Якщо потрібні всі наступні siblings:

    h2 ~ p

---

# Selector Hierarchy

Зручно мислити selectors як рівні.

    Simple selector
        ↓
    Compound selector
        ↓
    Complex selector
        ↓
    Selector list

Наприклад:

Simple:

    .card

Compound:

    .card.featured

Complex:

    .page > .card .title

Selector list:

    h1,
    h2,
    h3

---

# Simple Selector

Simple selector — базовий selector component.

Наприклад:

    p

    .card

    #header

    [disabled]

    :hover

    ::before

---

# Compound Selector

Поєднання simple selectors для одного element:

    button.primary

    input.required[type="email"]

    .card.featured

---

# Complex Selector

Поєднання selectors через combinators:

    .card > p

    .card .title

    h2 + p

    h2 ~ p

---

# Selector List

Кілька selectors, розділених комою:

    h1,
    h2,
    h3 {
        color: blue;
    }

---

# Практична таблиця

    Selector
    -------------------------------
    *               → all elements
    p               → all <p>
    .card           → class="card"
    #header         → id="header"
    [disabled]      → has disabled
    [type="email"]  → exact attribute value
    .card p         → descendant p
    .card > p       → direct child p
    h2 + p           → next sibling p
    h2 ~ p           → later sibling p
    :hover           → hover state
    :focus           → focus state
    :checked         → checked control
    :nth-child(2)    → second child
    :not(.active)    → not .active
    :is(...)         → grouped selector
    :where(...)      → grouped selector with zero specificity
    :has(...)        → relational condition
    ::before         → generated pseudo-element
    ::after          → generated pseudo-element

---

# Міні-шпаргалка

## Element

    p {
        ...
    }

    → всі <p>

---

## Universal

    * {
        ...
    }

    → всі elements

---

## Class

    .card {
        ...
    }

    → class="card"

---

## ID

    #header {
        ...
    }

    → id="header"

---

## Attribute

    [disabled] {
        ...
    }

    → elements with disabled attribute

---

## Exact Attribute

    input[type="email"] {
        ...
    }

    → type exactly equals "email"

---

## Descendant

    .card p {
        ...
    }

    → p inside .card

---

## Child

    .card > p {
        ...
    }

    → direct child p

---

## Adjacent Sibling

    h2 + p {
        ...
    }

    → immediately following p

---

## General Sibling

    h2 ~ p {
        ...
    }

    → later sibling p

---

## Multiple Classes

    .button.primary {
        ...
    }

    → one element with both classes

---

## Hover

    button:hover {
        ...
    }

    → hover state

---

## Focus

    input:focus {
        ...
    }

    → focused input

---

## Focus Visible

    button:focus-visible {
        ...
    }

    → focus state when focus indication is relevant

---

## First Child

    li:first-child {
        ...
    }

    → first child

---

## Last Child

    li:last-child {
        ...
    }

    → last child

---

## Nth Child

    li:nth-child(2) {
        ...
    }

    → second child

---

## Even

    li:nth-child(even) {
        ...
    }

    → 2, 4, 6, ...

---

## Odd

    li:nth-child(odd) {
        ...
    }

    → 1, 3, 5, ...

---

## Not

    button:not(.primary) {
        ...
    }

    → buttons without .primary

---

## Is

    :is(h1, h2, h3) {
        ...
    }

    → h1, h2, h3

---

## Where

    :where(h1, h2, h3) {
        ...
    }

    → grouped selectors with zero specificity

---

## Has

    .card:has(img) {
        ...
    }

    → .card containing img

---

## Pseudo-element

    p::first-letter {
        ...
    }

    → first letter

---

## Before

    .link::before {
        content: "→ ";
    }

---

## After

    .link::after {
        content: " ↗";
    }

---

# Selector Relationships

    A B

    A
      ↓
    descendant
      ↓
    B

---

    A > B

    A
      ↓
    direct child
      ↓
    B

---

    A + B

    A
      ↓
    immediately next sibling
      ↓
    B

---

    A ~ B

    A
      ↓
    later siblings
      ↓
    B

---

# Selector Symbols

    *       → universal

    .       → class

    #       → ID

    [ ]     → attribute

    >       → child

    +       → adjacent sibling

    ~       → general sibling

    :       → pseudo-class

    ::      → pseudo-element

    ,       → selector list

    space   → descendant

---

# Core Selector Model

    SELECTOR
        ↓
    matches HTML element
        ↓
    declaration applies
        ↓
    cascade resolves conflicts
        ↓
    final style

---

# Питання зі співбесіди

Що таке CSS selector?

Для чого потрібен selector?

Що таке element selector?

Що таке universal selector?

Що таке class selector?

Що таке ID selector?

Яка різниця між class та ID?

Чому classes часто використовуються для styling?

Що таке selector list?

Що робить кома між selectors?

Що таке descendant selector?

Що означає пробіл у selector?

Що таке child combinator?

Яка різниця між:

    .card p

та:

    .card > p

Що таке adjacent sibling selector?

Що таке general sibling selector?

Яка різниця між:

    h2 + p

та:

    h2 ~ p

Що таке attribute selector?

Що означає:

    [disabled]

Що означає:

    [type="email"]

Що означає:

    [href^="https://"]

Що означає:

    [href$=".pdf"]

Що означає:

    [href*="example"]

Що таке pseudo-class?

Що таке pseudo-element?

Яка різниця між `:` та `::`?

Що робить `:hover`?

Що робить `:focus`?

Що робить `:focus-visible`?

Що робить `:checked`?

Що робить `:disabled`?

Що робить `:first-child`?

Що робить `:last-child`?

Що робить `:nth-child()`?

Яка різниця між `:nth-child()` та `:nth-of-type()`?

Що робить `:not()`?

Що робить `:is()`?

Що робить `:where()`?

Яка різниця між `:is()` та `:where()`?

Що робить `:has()`?

Що таке compound selector?

Що таке complex selector?

Яка різниця між:

    .card.primary

та:

    .card .primary

Що таке selector specificity?

Які selectors мають більшу specificity?

Як selectors впливають на cascade?

Чому не варто створювати надмірно складні selectors?

Як перевірити selector у DevTools?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке selector.

Element selectors.

Universal selector.

Class selectors.

ID selectors.

Selector lists.

Attribute selectors.

Descendant selector.

Child selector.

Adjacent sibling selector.

General sibling selector.

Pseudo-classes.

Pseudo-elements.

Основні:

    :hover
    :focus
    :focus-visible
    :active
    :checked
    :disabled
    :first-child
    :last-child
    :nth-child()
    :not()

Розуміння:

    :
    ::
    .
    #
    []
    >
    +
    ~
    ,

Розуміння різниці:

    descendant
    child
    sibling

---

🔵 Junior

Compound selectors.

Complex selectors.

Attribute operators:

    =
    ^=
    $=
    *=
    ~=
    |=

Pseudo-classes:

    :first-of-type
    :last-of-type
    :nth-of-type()
    :only-child
    :only-of-type
    :empty
    :root
    :required
    :optional
    :valid
    :invalid
    :enabled

`:is()`.

`:where()`.

`:has()`.

Розуміння specificity.

Розуміння selector matching.

Уміння читати складні selectors.

Уміння debug selectors через DevTools.

Уміння уникати надмірно складних selectors.

Уміння створювати reusable class-based selectors.

---

🟠 Middle

Глибоке розуміння selector specificity.

Specificity interactions.

`:is()` specificity.

`:not()` specificity.

`:has()` specificity.

`:where()` zero specificity.

Advanced attribute selectors.

Advanced structural pseudo-classes.

Complex selector design.

CSS nesting.

Nesting та selector specificity.

Cascade layers.

Selector architecture.

Component-oriented selectors.

Low-specificity CSS.

Utility selectors.

Design-system selectors.

CSS custom properties + selectors.

Advanced relational selectors.

Progressive enhancement.

---

🔴 Senior

Глибоке розуміння CSS selector matching.

CSS parsing.

Selector matching algorithms.

Specificity architecture.

Cascade layers.

Selector performance.

Style recalculation.

Large-scale CSS architecture.

Low-specificity strategies.

Scalable component selectors.

Design systems.

CSS scoping.

Native CSS nesting.

`:scope`.

Advanced relational selectors.

Shadow DOM selector boundaries.

Shadow DOM:

    :host
    :host()
    :host-context()
    ::slotted()

CSS custom elements.

Constructable stylesheets.

CSSOM selector manipulation.

Performance trade-offs.

Maintainability of selector systems.

Specificity management at scale.

---

# Головне:

• Selector визначає, до яких HTML-елементів застосовується CSS rule.

• Базова структура:

    selector {
        property: value;
    }

• Element selector:

    p {
        ...
    }

• Universal selector:

    * {
        ...
    }

• Class selector:

    .card {
        ...
    }

• ID selector:

    #header {
        ...
    }

• Attribute selector:

    [disabled] {
        ...
    }

• Exact attribute match:

    [type="email"] {
        ...
    }

• Descendant selector:

    .card p {
        ...
    }

• Child selector:

    .card > p {
        ...
    }

• Adjacent sibling:

    h2 + p {
        ...
    }

• General sibling:

    h2 ~ p {
        ...
    }

• Compound selector:

    .button.primary {
        ...
    }

означає:

    один element
    має обидва classes

• Descendant selector:

    .button .primary

означає:

    .primary
    знаходиться всередині .button

• Pseudo-class:

    :hover
    :focus
    :checked
    :disabled

описує state або condition.

• Pseudo-element:

    ::before
    ::after
    ::first-letter

працює з частиною element або generated content.

• Основна різниця:

    :  → pseudo-class
    :: → pseudo-element

• `:nth-child()` рахує позицію серед усіх children.

• `:nth-of-type()` рахує позицію серед elements одного type.

• `:not()` виключає elements, які відповідають selector.

• `:is()` дозволяє групувати selectors.

• `:where()` дозволяє групувати selectors із zero specificity.

• `:has()` дозволяє вибирати element залежно від пов'язаних elements.

• Основні combinators:

    " " → descendant
    >  → child
    +  → adjacent sibling
    ~  → general sibling

• Основні selector symbols:

    *   → universal
    .   → class
    #   → ID
    []  → attribute
    :   → pseudo-class
    ::  → pseudo-element

• Classes найчастіше є основним інструментом для reusable component styling.

• ID selectors мають високу specificity, тому їх не варто без необхідності використовувати як основу всієї CSS architecture.

• Не варто створювати надмірно довгі selectors.

• Краще:

    .card-title

ніж:

    .page .content .card .card-content h2.title

• При debugging завжди перевіряй HTML structure разом із selector.

• Особливо важливо розрізняти:

    .card p
        → descendant

    .card > p
        → direct child

• Також важливо розрізняти:

    .card.primary
        → два classes одного element

    .card .primary
        → .primary всередині .card

• Основна модель selectors:

    simple selector
        ↓
    compound selector
        ↓
    complex selector
        ↓
    selector list

• Основна модель CSS matching:

    selector
        ↓
    matching elements
        ↓
    declarations
        ↓
    cascade
        ↓
    final styles

• Наступний логічний крок після selectors:

    03-specificity-and-cascade

де детально вивчаються:

    specificity
    cascade
    source order
    inheritance interaction
    !important
    cascade origins
    cascade layers
    selector conflicts
    resolving competing declarations