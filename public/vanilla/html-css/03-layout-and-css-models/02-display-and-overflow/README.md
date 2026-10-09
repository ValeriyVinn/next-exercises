## 02. Display and Overflow

`display` — одна з фундаментальних CSS-властивостей, яка визначає, як елемент бере участь у layout.

Вона впливає на:

    block / inline behavior
    розміщення елемента в normal flow
    можливість задавати width / height
    поведінку margin / padding
    створення Flexbox container
    створення Grid container
    видимість елемента
    участь у layout

`overflow` визначає, що робити з content, який виходить за межі box.

Разом `display` та `overflow` є фундаментом для розуміння CSS layout.

Основні значення `display`:

    block
    inline
    inline-block
    none
    flex
    inline-flex
    grid
    inline-grid
    flow-root
    contents

Основні значення `overflow`:

    visible
    hidden
    clip
    scroll
    auto

---

### Ключові поняття

✔ `display`  
✔ block  
✔ inline  
✔ inline-block  
✔ `display: none`  
✔ `visibility`  
✔ `opacity`  
✔ flex container  
✔ grid container  
✔ normal flow  
✔ block formatting context  
✔ `display: flow-root`  
✔ `display: contents`  
✔ replaced elements  
✔ `overflow`  
✔ `overflow-x`  
✔ `overflow-y`  
✔ `visible`  
✔ `hidden`  
✔ `clip`  
✔ `scroll`  
✔ `auto`  
✔ clipping  
✔ scroll container  
✔ scrollbar  
✔ overflow axis  
✔ text overflow  
✔ `text-overflow`  
✔ `white-space`  
✔ `overflow-wrap`  
✔ `word-break`  
✔ `visibility: hidden`  
✔ `opacity: 0`  

---

### Що потрібно пам'ятати

• `display` визначає, як element бере участь у layout.

• `block` створює block-level box.

• `inline` створює inline-level box.

• `inline-block` поводиться як inline у потоці, але має block-like box.

• `display: none` повністю прибирає element із layout.

• `visibility: hidden` приховує element, але element продовжує займати місце.

• `opacity: 0` робить element прозорим, але він продовжує брати участь у layout.

• `display: flex` створює Flexbox container.

• `display: grid` створює Grid container.

• `overflow: visible` дозволяє content виходити за межі box.

• `overflow: hidden` обрізає overflow.

• `overflow: clip` обрізає overflow без створення звичайного scroll container.

• `overflow: scroll` створює механізм прокручування.

• `overflow: auto` дозволяє браузеру додати scrolling, коли це необхідно.

• `overflow-x` контролює horizontal overflow.

• `overflow-y` контролює vertical overflow.

• `overflow` особливо важливий для елементів із заданими:

    width
    height
    max-width
    max-height

• Для сучасного layout потрібно розуміти різницю між:

    display
    visibility
    opacity
    overflow

---

# Display

`display` визначає зовнішню та внутрішню поведінку box.

У спрощеному вигляді можна думати:

    display
        ↓
    як element поводиться у layout

Наприклад:

    display: block;

або:

    display: flex;

або:

    display: grid;

---

# Block

`display: block` створює block-level box.

Наприклад:

    div {
        display: block;
    }

Багато HTML elements за замовчуванням є block-level:

    div
    p
    h1
    h2
    h3
    section
    article
    header
    footer
    main

---

# Block у normal flow

Наприклад:

    <div class="box">A</div>
    <div class="box">B</div>
    <div class="box">C</div>

    .box {
        display: block;
    }

Block elements зазвичай розташовуються один під одним:

    A
    ↓
    B
    ↓
    C

---

# Block Width

Block element у normal flow зазвичай займає доступну ширину containing block.

Наприклад:

    .box {
        display: block;
        width: auto;
    }

Якщо parent має:

    width: 800px;

block element може зайняти доступний горизонтальний простір.

---

# Block Width Example

    <div class="container">
        <div class="box">Content</div>
    </div>

    .container {
        width: 800px;
    }

    .box {
        display: block;
    }

`.box` у normal flow зазвичай розтягується по доступній ширині.

---

# Block та Width

Для block element можна задавати:

    width
    min-width
    max-width
    height
    min-height
    max-height

Наприклад:

    .box {
        display: block;
        width: 300px;
        height: 200px;
    }

---

# Inline

`display: inline` створює inline-level box.

Типові inline elements:

    span
    a
    strong
    em

Наприклад:

    <p>
        Hello
        <span>world</span>
    </p>

`span` за замовчуванням:

    display: inline;

---

# Inline у normal flow

Inline elements розташовуються в текстовому рядку.

Наприклад:

    <span>One</span>
    <span>Two</span>
    <span>Three</span>

можуть розташовуватися:

    One Two Three

а не:

    One
    Two
    Three

---

# Inline та Width / Height

Для звичайного inline element:

    width
    height

не працюють так само, як для block-level box.

Наприклад:

    span {
        display: inline;
        width: 300px;
        height: 100px;
    }

Не слід очікувати звичайної block-like поведінки width та height.

Якщо потрібен box із контрольованими width/height:

    display: inline-block;

---

# Inline та Padding

Inline elements можуть мати:

    padding

Наприклад:

    span {
        padding: 10px;
    }

Але вертикальна поведінка inline box має особливості, пов'язані з line box та text formatting.

Для складних UI-компонентів часто зручніше використовувати:

    inline-block
    flex
    grid

---

# Inline-block

`inline-block` поєднує характеристики inline та block-like box.

Наприклад:

    .item {
        display: inline-block;
        width: 200px;
        height: 100px;
    }

Елементи можуть стояти в одному рядку:

    [ A ] [ B ] [ C ]

але кожен element має контрольовані:

    width
    height
    padding
    border

---

# Inline-block Example

HTML:

    <div class="item">A</div>
    <div class="item">B</div>
    <div class="item">C</div>

CSS:

    .item {
        display: inline-block;
        width: 150px;
        height: 100px;
        padding: 20px;
        border: 1px solid black;
    }

Елементи можуть розташовуватися горизонтально, якщо для них достатньо місця.

---

# Block vs Inline vs Inline-block

### Block

    display: block;

Типова поведінка:

    новий рядок
    ↓
    займає доступну ширину
    ↓
    width/height працюють

---

### Inline

    display: inline;

Типова поведінка:

    залишається у текстовому потоці
    ↓
    width/height не працюють як у block

---

### Inline-block

    display: inline-block;

Типова поведінка:

    inline positioning
    +
    block-like dimensions

---

# Порівняння

    block
        → новий рядок
        → width/height
        → block-level

    inline
        → у рядку
        → width/height не як у block
        → inline-level

    inline-block
        → у рядку
        → width/height
        → block-like box

---

# Normal Flow

Normal flow — стандартний спосіб, яким браузер розташовує elements до застосування спеціальних layout mechanisms.

У normal flow важливі:

    block formatting
    inline formatting

Наприклад:

    <div>A</div>
    <div>B</div>

Block elements:

    A
    ↓
    B

А inline:

    <span>A</span>
    <span>B</span>

можуть бути:

    A B

---

# Display: none

    .box {
        display: none;
    }

Element повністю прибирається з layout.

Наприклад:

    <div class="box">Hello</div>
    <div>World</div>

    .box {
        display: none;
    }

Результат:

    World

`Hello`:

    не видно
    +
    не займає місце

---

# display: none vs visibility: hidden

Це дуже важлива різниця.

`display: none`:

    → element не бере участі в layout
    → місце не займає

`visibility: hidden`:

    → element невидимий
    → місце зберігається

---

# visibility: hidden

    .box {
        visibility: hidden;
    }

Element:

    не видно

але його layout space:

    зберігається

Наприклад:

    [ A ]
    [   ]
    [ C ]

Якщо B має:

    visibility: hidden;

---

# visibility: visible

Стандартне значення:

    visibility: visible;

Element відображається.

---

# visibility: collapse

`visibility: collapse` має спеціальну поведінку в окремих layout contexts, особливо для table rows/columns.

На Core-рівні достатньо знати:

    visible
    hidden

А `collapse` має спеціалізоване застосування.

---

# Opacity

`opacity` контролює прозорість element.

Наприклад:

    .box {
        opacity: 0;
    }

Element стає повністю прозорим.

Але:

    layout space зберігається

---

# opacity: 0 vs display: none

`opacity: 0`:

    invisible
    +
    займає місце
    +
    може залишатися інтерактивним

`display: none`:

    invisible
    +
    не займає місце
    +
    не бере участі в layout

Тому:

    opacity: 0

не є прямою заміною:

    display: none

---

# opacity та Accessibility

Якщо element має:

    opacity: 0;

це не означає автоматично, що він недоступний для interaction або accessibility tree.

Якщо потрібно справді прибрати element з UI та layout:

    display: none;

Якщо потрібно лише візуально приховати його, потрібно окремо подумати про:

    keyboard focus
    pointer events
    accessibility

---

# Pointer Events

Можна окремо контролювати pointer interaction.

Наприклад:

    .overlay {
        opacity: 0;
        pointer-events: none;
    }

Element залишається у layout, але не реагує на pointer events.

Це часто використовується в UI transitions.

---

# Display: flex

    .container {
        display: flex;
    }

Element стає:

    flex container

Його direct children стають:

    flex items

Наприклад:

    <div class="container">
        <div>A</div>
        <div>B</div>
        <div>C</div>
    </div>

    .container {
        display: flex;
    }

За замовчуванням items розташовуються вздовж:

    main axis

яка за замовчуванням:

    horizontal

Flexbox детально розглядається в:

    04-flexbox

---

# Display: grid

    .container {
        display: grid;
    }

Element стає:

    grid container

Його direct children стають:

    grid items

Наприклад:

    .container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }

Grid детально розглядається в:

    05-grid-layout

---

# inline-flex

    .container {
        display: inline-flex;
    }

Container поводиться як inline-level box зовні, але всередині використовує Flexbox.

Тобто:

    outside → inline
    inside  → flex

---

# inline-grid

Аналогічно:

    .container {
        display: inline-grid;
    }

Зовні:

    inline

Всередині:

    grid

---

# flow-root

    .container {
        display: flow-root;
    }

Створює новий block formatting context.

Одна з практичних переваг:

    float
    ↓
    залишається всередині container

Це сучасний спосіб створити BFC без використання:

    overflow: hidden;

---

# Block Formatting Context

BFC — Block Formatting Context.

Це окремий контекст форматування, у якому block boxes layout-яться за певними правилами.

BFC може впливати на:

    float interaction
    margin collapse
    containment of floats

BFC можна створити різними способами, зокрема:

    display: flow-root;

---

# display: contents

    .wrapper {
        display: contents;
    }

Element сам не створює звичайний box у layout, але його children продовжують брати участь у layout.

Наприклад:

    <div class="wrapper">
        <div>A</div>
        <div>B</div>
    </div>

При:

    .wrapper {
        display: contents;
    }

`.wrapper` не має власного звичайного box.

Але:

    A
    B

продовжують брати участь у layout.

---

# display: contents — обережно

`display: contents` може бути корисним для layout, але не слід використовувати його без розуміння accessibility та semantic implications.

Він не означає:

    display: none;

Children залишаються.

---

# Display Modern Syntax

Сучасний CSS conceptually розділяє:

    outer display type
    +
    inner display type

Наприклад:

    display: block flow;

означає:

    outer → block
    inner → flow

А:

    display: block flex;

означає:

    outer → block
    inner → flex

У повсякденному коді часто використовуються звичні shorthand:

    display: block;
    display: flex;
    display: grid;

---

# Overflow

`overflow` визначає, що робити, коли content виходить за межі box.

Наприклад:

    .box {
        width: 200px;
        height: 100px;
        overflow: hidden;
    }

Якщо content більший:

    overflow

визначає його поведінку.

---

# Overflow Example

HTML:

    <div class="box">
        This is a very long text that does not fit
        inside the box.
    </div>

CSS:

    .box {
        width: 200px;
        height: 100px;
        border: 1px solid black;
        overflow: hidden;
    }

Частина content, яка виходить за межі:

    обрізається

---

# overflow: visible

Це типове значення:

    .box {
        overflow: visible;
    }

Content може виходити за межі box.

Наприклад:

    ┌──────────────┐
    │ content      │
    │              │
    └──────────────┘
          ↓
    content може
    виходити назовні

---

# overflow: hidden

    .box {
        overflow: hidden;
    }

Content, який виходить за межі padding box, обрізається.

Scrollbar не показується як звичайний scrolling mechanism.

---

# overflow: clip

    .box {
        overflow: clip;
    }

Content обрізається.

На відміну від `hidden`, `clip` не створює звичайний scroll container.

Це важлива сучасна відмінність.

---

# hidden vs clip

    overflow: hidden;

    → clip overflow
    → може створювати scroll container

    overflow: clip;

    → clip overflow
    → не створює звичайний scroll container

На Core-рівні головне:

    hidden → приховати overflow
    clip   → жорстко обрізати overflow без scrolling

---

# overflow: scroll

    .box {
        overflow: scroll;
    }

Element отримує scrolling mechanism.

Навіть якщо content не виходить за межі, scrollbar може бути присутнім залежно від платформи та браузера.

---

# overflow: auto

    .box {
        overflow: auto;
    }

Scrollbar з'являється, коли це необхідно.

Це дуже поширений варіант:

    overflow: auto;

---

# overflow-x

Контролює horizontal overflow.

    .box {
        overflow-x: auto;
    }

Можна використовувати для горизонтального scrolling.

Наприклад:

    .table-wrapper {
        overflow-x: auto;
    }

Це типовий responsive pattern для широких таблиць.

---

# overflow-y

Контролює vertical overflow.

    .box {
        overflow-y: auto;
    }

Наприклад:

    .modal-body {
        overflow-y: auto;
    }

---

# overflow shorthand

Можна задати одразу:

    .box {
        overflow: hidden;
    }

Або окремо:

    .box {
        overflow-x: auto;
        overflow-y: hidden;
    }

---

# Два значення overflow

Можна записати:

    overflow: auto hidden;

Перше значення:

    overflow-x

Друге:

    overflow-y

Тобто:

    overflow: x y

---

# Scroll Container

Scroll container — box, у якому content може прокручуватися.

Наприклад:

    .panel {
        height: 400px;
        overflow: auto;
    }

Якщо content більший за 400px:

    ┌─────────────┐
    │ content     │
    │ content     │
    │ content     │
    │ content     │
    └─────────────┘
          ↕
        scroll

---

# Fixed Height + Overflow

Типовий pattern:

    .panel {
        height: 300px;
        overflow-y: auto;
    }

Content може бути будь-якої довжини, але panel має обмежену висоту.

---

# Max Height + Overflow

Часто краще:

    .panel {
        max-height: 300px;
        overflow-y: auto;
    }

На відміну від:

    height: 300px;

element може бути меншим, якщо content невеликий.

---

# Overflow та Width

Наприклад:

    .box {
        width: 300px;
        overflow-x: auto;
    }

Якщо child ширший:

    .child {
        width: 800px;
    }

parent може створити horizontal scrolling.

---

# Overflow та Long Text

Довгий текст може створювати overflow.

Наприклад:

    .title {
        width: 200px;
    }

Якщо слово дуже довге, можуть знадобитися:

    overflow-wrap
    word-break

---

# overflow-wrap

`overflow-wrap` дозволяє браузеру переносити довгі слова, якщо вони інакше переповнюють box.

Наприклад:

    .text {
        overflow-wrap: break-word;
    }

або сучасніше:

    .text {
        overflow-wrap: anywhere;
    }

---

# word-break

`word-break` контролює правила переносу тексту.

Наприклад:

    .text {
        word-break: break-word;
    }

У сучасному CSS варто розуміти різницю між:

    overflow-wrap
    word-break

Для більшості звичайних випадків краще спочатку розглянути:

    overflow-wrap: anywhere;

---

# White Space

`white-space` контролює обробку пробілів та переносів рядка.

Наприклад:

    .text {
        white-space: nowrap;
    }

Текст не переноситься на новий рядок.

---

# white-space: nowrap

Часто використовується разом із:

    overflow: hidden;
    text-overflow: ellipsis;

Наприклад:

    .title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

---

# Text Overflow

`text-overflow` визначає, як показувати текст, який не поміщається.

Найвідоміше:

    text-overflow: ellipsis;

Разом із:

    white-space: nowrap;
    overflow: hidden;

отримуємо:

    This is a very long...

---

# Ellipsis

Типовий pattern:

    .title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

Наприклад:

    Very long article title that does...

Важливо:

    text-overflow: ellipsis;

сам по собі не обрізає текст.

Зазвичай потрібні:

    overflow: hidden;
    white-space: nowrap;

---

# Multiline Ellipsis

Для обмеження кількох рядків можна використовувати сучасні line-clamp механізми.

Наприклад:

    .description {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }

У сучасному CSS також існують властивості:

    line-clamp
    block-ellipsis

Підтримка та конкретна поведінка залежать від браузера.

---

# Overflow та Images

Зображення часто виходять за межі container.

Наприклад:

    .image-wrapper {
        overflow: hidden;
    }

    .image {
        width: 100%;
        display: block;
    }

Це особливо корисно для:

    border-radius
    zoom effects
    image cropping

---

# Image Crop

Наприклад:

    .image-wrapper {
        width: 300px;
        height: 200px;
        overflow: hidden;
    }

    .image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

Тут:

    overflow

контролює межі wrapper.

А:

    object-fit

контролює поведінку самого image.

---

# Overflow та Border Radius

Частий pattern:

    .card {
        border-radius: 16px;
        overflow: hidden;
    }

Це дозволяє обрізати children по rounded corners.

Наприклад:

    .card
        ↓
    border-radius
        +
    overflow: hidden

---

# Overflow та Positioning

`overflow` часто використовується разом із positioning.

Наприклад:

    .card {
        position: relative;
        overflow: hidden;
    }

    .badge {
        position: absolute;
        top: 10px;
        right: 10px;
    }

Це дозволяє контролювати, чи може positioned child виходити за межі parent.

Positioning детально:

    03-positioning

---

# Overflow та Flexbox

Flex items можуть мати особливості sizing.

Наприклад:

    .container {
        display: flex;
    }

    .item {
        min-width: 0;
    }

`min-width: 0` часто потрібен, щоб flex item дозволив content стискатися і не створював несподіваний horizontal overflow.

Це дуже важливий практичний патерн.

---

# Flex Overflow Example

Наприклад:

    .layout {
        display: flex;
    }

    .sidebar {
        width: 250px;
    }

    .content {
        flex: 1;
        min-width: 0;
    }

`min-width: 0` дозволяє `.content` стискатися в межах доступного простору.

---

# Overflow та Grid

Grid items також можуть створювати overflow.

У складних Grid layout може бути корисно:

    min-width: 0;

або використовувати:

    minmax(0, 1fr)

Наприклад:

    .grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

Це допомагає контролювати intrinsic minimum size grid tracks.

---

# Display та Accessibility

Візуально приховати element можна різними способами:

    display: none;
    visibility: hidden;
    opacity: 0;

Але вони мають різну поведінку.

Не можна вважати їх повністю взаємозамінними.

При створенні UI потрібно враховувати:

    layout
    keyboard navigation
    focus
    screen readers
    pointer interaction

---

# Display None для Mobile Menu

Типовий pattern:

    .menu {
        display: none;
    }

Коли menu відкривається:

    .menu.is-open {
        display: block;
    }

Але для анімації `display` не завжди зручний, тому можуть використовуватися:

    opacity
    visibility
    transform
    pointer-events

---

# Visibility для UI

Наприклад:

    .tooltip {
        visibility: hidden;
        opacity: 0;
    }

При активному стані:

    .tooltip.is-visible {
        visibility: visible;
        opacity: 1;
    }

Це дозволяє створити transition.

---

# Transition та Display

CSS transitions не працюють безпосередньо з:

    display

Наприклад:

    display: none;
    display: block;

не дає звичайної плавної transition.

Тому для анімації часто використовують:

    opacity
    visibility
    transform

---

# Overflow Clip та Animation

Наприклад:

    .card {
        overflow: hidden;
    }

    .image {
        transition: transform 300ms;
    }

    .card:hover .image {
        transform: scale(1.05);
    }

`overflow: hidden` не дозволяє збільшеному image виходити за межі card.

---

# Display та Pseudo-elements

Pseudo-elements:

    ::before
    ::after

також мають display behavior.

Наприклад:

    .card::before {
        content: "";
        display: block;
    }

Часто для pseudo-element використовують:

    display: block;

або:

    position: absolute;

залежно від задачі.

---

# `display: block` для Images

`img` є replaced element і за замовчуванням часто поводиться як inline-level element.

Через це може виникати невеликий простір під image, пов'язаний із baseline.

Поширений підхід:

    img {
        display: block;
    }

Це прибирає inline baseline behavior.

---

# Replaced Elements

До replaced elements належать, зокрема:

    img
    video
    iframe
    input

Їхній content та rendering контролюються браузером.

Вони мають деякі особливості щодо:

    width
    height
    intrinsic size
    aspect ratio

---

# Intrinsic Size

Деякі elements мають intrinsic dimensions.

Наприклад:

    image

може мати природні:

    width
    height

CSS може змінити ці dimensions:

    img {
        width: 100%;
        height: auto;
    }

---

# Display та Semantic HTML

CSS `display` не змінює HTML semantics.

Наприклад:

    <button class="box">Save</button>

і:

    .box {
        display: block;
    }

залишається:

    button

Зміна:

    display

не перетворює semantic element на інший HTML element.

Це важливо для accessibility.

---

# `display: none` та DOM

`display: none` не видаляє element із DOM.

Наприклад:

    <div class="box">
        Hello
    </div>

    .box {
        display: none;
    }

Element все ще існує в:

    DOM

але не бере участі у layout.

---

# Display vs Visibility vs Opacity

## display: none

    layout → no
    visible → no

---

## visibility: hidden

    layout → yes
    visible → no

---

## opacity: 0

    layout → yes
    visible → visually no

    interaction → може залишатися

---

# Overflow vs Visibility

`visibility` керує visibility самого element.

`overflow` керує content, який виходить за межі box.

Наприклад:

    visibility: hidden;

приховує element.

А:

    overflow: hidden;

обрізає content, який виходить за межі box.

Це різні задачі.

---

# Overflow vs Display None

`display: none`:

    → весь element прибрано з layout

`overflow: hidden`:

    → element залишається
    → його box існує
    → зайвий content обрізається

---

# Practical Example — Card

HTML:

    <article class="card">
        <img src="image.jpg" alt="Example">
        <div class="card__body">
            <h2>Title</h2>
            <p>Description</p>
        </div>
    </article>

CSS:

    .card {
        width: 320px;
        border-radius: 16px;
        overflow: hidden;
    }

    .card img {
        display: block;
        width: 100%;
        height: auto;
    }

Тут використовуються:

    display
    overflow
    width
    border-radius

---

# Practical Example — Scroll Panel

HTML:

    <div class="panel">
        ...
    </div>

CSS:

    .panel {
        max-height: 300px;
        overflow-y: auto;
    }

Перевага:

    content може бути різної висоти

але:

    panel не перевищує 300px

---

# Practical Example — Horizontal Table

HTML:

    <div class="table-wrapper">
        <table>
            ...
        </table>
    </div>

CSS:

    .table-wrapper {
        overflow-x: auto;
    }

Це дозволяє широкій таблиці прокручуватися горизонтально на маленькому екрані.

---

# Practical Example — Text Ellipsis

    .title {
        width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

Результат:

    Very long title that does...

---

# Practical Example — Hide Element

    .is-hidden {
        display: none;
    }

Element:

    не займає місце

---

# Practical Example — Invisible but Space Remains

    .is-hidden {
        visibility: hidden;
    }

Element:

    не видно

але:

    місце залишається

---

# Practical Example — Transparent Element

    .is-transparent {
        opacity: 0;
    }

Element:

    layout space → yes
    visual → transparent

---

# Practical Example — Flex Item Overflow

    .layout {
        display: flex;
    }

    .content {
        flex: 1;
        min-width: 0;
        overflow: auto;
    }

Це поширений pattern для dashboard/application layouts.

---

# Practical Example — Flow Root

    .container {
        display: flow-root;
    }

Це створює новий Block Formatting Context.

Може бути корисним для containment floats.

---

# Типові помилки

❌ Очікувати, що `width` та `height` працюватимуть як у block для звичайного inline element.

---

❌ Використовувати:

    display: none;

коли потрібно лише зробити element прозорим або анімувати його.

---

❌ Вважати:

    visibility: hidden;

аналогом:

    display: none;

Вони по-різному впливають на layout.

---

❌ Вважати:

    opacity: 0;

аналогом:

    display: none;

Прозорий element може залишатися інтерактивним.

---

❌ Використовувати:

    overflow: hidden;

не розуміючи, що content буде обрізаний.

---

❌ Використовувати:

    overflow: scroll;

коли потрібний scrollbar тільки при необхідності.

У такому випадку часто краще:

    overflow: auto;

---

❌ Плутати:

    overflow: hidden;

та:

    overflow: clip;

Вони мають різну scrolling behavior.

---

❌ Забувати про `min-width: 0` у flex/grid layout.

Це може призводити до несподіваного horizontal overflow.

---

❌ Використовувати `width: 100%` без урахування:

    padding
    border
    box-sizing

---

❌ Використовувати `overflow: hidden` як універсальний спосіб виправлення layout.

Він може приховати реальну проблему та обрізати потрібний content.

---

❌ Використовувати `display: inline-block` для складних layout замість Flexbox або Grid.

Для сучасних layout зазвичай краще:

    flex
    grid

---

❌ Забувати, що `display` не змінює HTML semantics.

    button

залишається button, навіть якщо:

    display: block;

---

# Питання зі співбесіди

Що робить властивість `display`?

Що таке block-level element?

Що таке inline-level element?

Яка різниця між:

    block
    inline
    inline-block

Що відбувається при:

    display: none;

Чим `display: none` відрізняється від:

    visibility: hidden;

Чим `visibility: hidden` відрізняється від:

    opacity: 0;

Що таке normal flow?

Що таке `display: flex`?

Що таке `display: grid`?

Що таке `inline-flex`?

Що таке `inline-grid`?

Що таке `display: flow-root`?

Що таке `display: contents`?

Що таке Block Formatting Context?

Що робить:

    overflow: hidden;

Що робить:

    overflow: auto;

Що робить:

    overflow: scroll;

Яка різниця між:

    overflow: hidden;
    overflow: clip;

Що роблять:

    overflow-x
    overflow-y

Що таке scroll container?

Як зробити вертикальну прокрутку?

Як зробити горизонтальну прокрутку?

Як зробити ellipsis для одного рядка?

Для чого потрібні:

    white-space
    text-overflow
    overflow

Що таке `overflow-wrap`?

Що таке `word-break`?

Чому для `img` часто використовують:

    display: block;

Чому у Flexbox може знадобитися:

    min-width: 0;

Що таке `display: contents`?

Чи видаляє `display: none` element із DOM?

Що відбувається з layout при:

    display: none;

Що відбувається з layout при:

    visibility: hidden;

Чи займає місце:

    opacity: 0;

Що таке replaced element?

Як `overflow` працює разом із `border-radius`?

Як `overflow` використовується для image cropping?

Чим `gap` відрізняється від `overflow`?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке `display`.

`block`.

`inline`.

`inline-block`.

`none`.

`flex`.

`grid`.

`normal flow`.

Різниця:

    block
    inline
    inline-block

Різниця:

    display: none
    visibility: hidden
    opacity: 0

Що таке `overflow`.

    visible
    hidden
    auto
    scroll

`overflow-x`.

`overflow-y`.

Основи:

    text-overflow
    white-space
    overflow-wrap

---

🔵 Junior

Розуміти:

    display: block
    display: inline
    display: inline-block
    display: none
    display: flex
    display: grid

Розуміти:

    normal flow

Вміти створити:

    scrollable panel
    horizontal scroll
    ellipsis
    hidden content
    image crop

Розуміти:

    overflow: visible
    overflow: hidden
    overflow: auto
    overflow: scroll

Розуміти:

    overflow-x
    overflow-y

Розуміти:

    visibility
    opacity

Розуміти:

    gap
    overflow
    margin

у контексті layout.

Розуміти базову проблему:

    flex item
    min-width: 0
    overflow

---

🟠 Middle

Глибше розуміти:

    block formatting context
    inline formatting context
    formatting contexts
    intrinsic sizing
    overflow propagation
    scroll containers
    clipping

Розуміти:

    display: flow-root
    display: contents

Розуміти:

    overflow: clip

Розуміти поведінку:

    overflow
    flexbox
    grid

Розуміти:

    min-width: 0
    min-height: 0

у складних layout.

Розуміти:

    text-overflow
    white-space
    overflow-wrap
    word-break

Розуміти multiline text truncation.

Розуміти взаємодію:

    overflow
    border-radius
    transform

Розуміти intrinsic minimum sizes.

---

🔴 Senior

Глибоке розуміння CSS formatting contexts.

Block Formatting Context.

Inline Formatting Context.

Flex Formatting Context.

Grid Formatting Context.

Розуміння:

    outer display type
    inner display type

Розуміння:

    display: block flow
    display: block flex
    display: inline flex
    display: block grid

Розуміння overflow model.

Overflow propagation.

Scroll containers.

Clipping.

Scrollport.

Overflow clip edge.

Intrinsic sizing.

Min-content contribution.

Max-content contribution.

Interaction між:

    overflow
    containment
    positioning
    transforms
    flexbox
    grid

Розуміння:

    display: contents

з точки зору layout та accessibility.

Розуміння:

    flow-root

як спосіб створення BFC.

Оптимізація складних layout та overflow behavior.

---

# Міні-шпаргалка

## display

    display: block;

    display: inline;

    display: inline-block;

    display: none;

    display: flex;

    display: inline-flex;

    display: grid;

    display: inline-grid;

    display: flow-root;

    display: contents;

---

## Block

    display: block;

    → новий рядок
    → block-level
    → width/height працюють

---

## Inline

    display: inline;

    → inline-level
    → у текстовому потоці
    → width/height не працюють як у block

---

## Inline-block

    display: inline-block;

    → inline у потоці
    → block-like dimensions

---

## None

    display: none;

    → не видно
    → не займає layout space

---

## Visibility

    visibility: hidden;

    → не видно
    → layout space зберігається

---

## Opacity

    opacity: 0;

    → прозорий
    → layout space зберігається
    → interaction може залишатися

---

## Flex

    display: flex;

    → flex container
    → direct children = flex items

---

## Grid

    display: grid;

    → grid container
    → direct children = grid items

---

## Flow root

    display: flow-root;

    → новий Block Formatting Context

---

## Overflow

    overflow: visible;

    → overflow видно

---

    overflow: hidden;

    → overflow обрізається

---

    overflow: clip;

    → overflow обрізається
    → scrolling mechanism не створюється

---

    overflow: scroll;

    → scrolling mechanism

---

    overflow: auto;

    → scrolling коли необхідно

---

## Axes

    overflow-x
        → horizontal

    overflow-y
        → vertical

---

## Ellipsis

    .title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

---

## Horizontal Scroll

    .table-wrapper {
        overflow-x: auto;
    }

---

## Vertical Scroll

    .panel {
        max-height: 300px;
        overflow-y: auto;
    }

---

## Image Crop

    .image-wrapper {
        overflow: hidden;
    }

    .image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

---

## Flex Overflow

    .layout {
        display: flex;
    }

    .content {
        flex: 1;
        min-width: 0;
    }

---

## Grid Overflow

    .grid {
        display: grid;
        grid-template-columns:
            repeat(3, minmax(0, 1fr));
    }

---

## Display vs Visibility

    display: none
        → remove from layout

    visibility: hidden
        → hide, keep space

---

## Visibility vs Opacity

    visibility: hidden
        → invisible

    opacity: 0
        → transparent

---

## Overflow vs Display

    display: none
        → element itself disappears

    overflow: hidden
        → element remains,
          overflowing content is clipped

---

# Головне:

• `display` визначає, як element бере участь у CSS layout.

• `display: block` створює block-level behavior.

• `display: inline` створює inline-level behavior.

• `display: inline-block` поєднує inline positioning із block-like dimensions.

• `display: none` повністю прибирає element із layout, але не видаляє його з DOM.

• `display: flex` створює Flexbox container.

• `display: grid` створює Grid container.

• `display: inline-flex` — inline-level flex container.

• `display: inline-grid` — inline-level grid container.

• `display: flow-root` створює новий Block Formatting Context.

• `display: contents` прибирає власний box, але залишає children у layout.

• Normal flow — стандартний спосіб розташування elements.

• `overflow` визначає поведінку content, який виходить за межі box.

• `overflow: visible` дозволяє content виходити за межі.

• `overflow: hidden` обрізає overflow.

• `overflow: clip` обрізає overflow без звичайного scroll container.

• `overflow: scroll` створює scrolling mechanism.

• `overflow: auto` дозволяє scrolling тоді, коли він необхідний.

• `overflow-x` контролює horizontal overflow.

• `overflow-y` контролює vertical overflow.

• `visibility: hidden` приховує element, але залишає його місце.

• `opacity: 0` робить element прозорим, але не прибирає його з layout.

• `display: none` та `visibility: hidden` — не одне й те саме.

• `opacity: 0` та `display: none` — не одне й те саме.

• Для одного рядка ellipsis зазвичай потрібні:

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

• Для horizontal scrolling:

    overflow-x: auto;

• Для vertical scrolling:

    overflow-y: auto;

• `overflow: hidden` часто використовується разом із:

    border-radius
    transform
    image cropping

• У Flexbox та Grid часто важливо пам'ятати:

    min-width: 0;

щоб content міг стискатися та не створював несподіваний overflow.

• `display` відповідає за участь element у layout.

• `overflow` відповідає за content, який виходить за межі box.

• Основна модель:

    display
       ↓
    box participation
       ↓
    layout
       ↓
    overflow
       ↓
    clipping / scrolling

• Для сучасного CSS layout особливо важливо розуміти взаємодію:

    display
    box model
    normal flow
    flexbox
    grid
    overflow
    positioning

• Найважливіше практичне розрізнення:

    display: none
        → немає layout space

    visibility: hidden
        → layout space є

    opacity: 0
        → layout space є,
          element прозорий

    overflow: hidden
        → element є,
          але overflowing content обрізається

• `display` і `overflow` — базові CSS-механізми, на яких будується подальше розуміння:

    Flexbox
    Grid
    Positioning
    Responsive Design
    UI components
    Scrollable interfaces