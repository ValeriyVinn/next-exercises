## 01. Box Model

CSS Box Model — це модель, за якою браузер представляє кожен HTML-елемент як прямокутний блок.

Кожен елемент складається з чотирьох основних частин:

    content
    padding
    border
    margin

Схематично:

    ┌─────────────────────────────────────┐
    │              margin                 │
    │   ┌─────────────────────────────┐   │
    │   │           border            │   │
    │   │   ┌─────────────────────┐   │   │
    │   │   │       padding       │   │   │
    │   │   │   ┌─────────────┐   │   │   │
    │   │   │   │   content   │   │   │   │
    │   │   │   └─────────────┘   │   │   │
    │   │   └─────────────────────┘   │   │
    │   └─────────────────────────────┘   │
    └─────────────────────────────────────┘

Box Model є фундаментом для розуміння:

    width
    height
    padding
    border
    margin
    box-sizing
    element size
    spacing
    layout

---

### Ключові поняття

✔ CSS Box Model  
✔ content  
✔ padding  
✔ border  
✔ margin  
✔ width  
✔ height  
✔ min-width  
✔ max-width  
✔ min-height  
✔ max-height  
✔ box-sizing  
✔ `content-box`  
✔ `border-box`  
✔ horizontal padding  
✔ vertical padding  
✔ border width  
✔ border style  
✔ border radius  
✔ margin collapse  
✔ element dimensions  
✔ content area  
✔ border box  
✔ overflow  

---

### Що потрібно пам'ятати

• Кожен HTML-елемент можна розглядати як box.

• Box складається з:

    content
    padding
    border
    margin

• `content` — внутрішній вміст елемента.

• `padding` — простір між content і border.

• `border` — рамка навколо padding і content.

• `margin` — зовнішній простір навколо border.

• `width` та `height` за замовчуванням працюють з `content` area, якщо:

    box-sizing: content-box;

• При:

    box-sizing: border-box;

`width` та `height` включають:

    content
    padding
    border

• `margin` не входить у `width` або `height`.

• `padding` збільшує фактичний розмір елемента при `content-box`.

• `border` також збільшує фактичний розмір елемента при `content-box`.

• `box-sizing: border-box` часто робить розрахунок розмірів значно простішим.

---

# Box Model

Основна структура:

    margin
        ↓
    border
        ↓
    padding
        ↓
    content

Або від центру назовні:

    content
       ↓
    padding
       ↓
    border
       ↓
    margin

---

# Content

`content` — це основна область елемента.

Наприклад:

    <div class="box">
        Hello
    </div>

Текст:

    Hello

знаходиться в content area.

CSS:

    .box {
        width: 300px;
        height: 100px;
    }

За замовчуванням:

    box-sizing: content-box;

Тому:

    width: 300px

означає ширину саме content area.

---

# Width

`width` задає ширину елемента.

Наприклад:

    .box {
        width: 300px;
    }

При:

    box-sizing: content-box;

ширина content:

    300px

Якщо додати padding:

    .box {
        width: 300px;
        padding: 20px;
    }

content:

    300px

padding:

    20px + 20px

Фактична ширина без margin:

    300 + 20 + 20 = 340px

---

# Height

`height` задає висоту елемента.

Наприклад:

    .box {
        height: 200px;
    }

При:

    box-sizing: content-box;

`height` означає висоту content area.

Якщо:

    .box {
        height: 200px;
        padding: 20px;
    }

Фактична висота:

    200 + 20 + 20 = 240px

без урахування border.

---

# Padding

`padding` — внутрішній простір між content і border.

Наприклад:

    .box {
        padding: 20px;
    }

Схема:

    border
    ┌──────────────────────────┐
    │       padding            │
    │   ┌──────────────────┐   │
    │   │     content      │   │
    │   └──────────────────┘   │
    └──────────────────────────┘

Padding створює простір всередині елемента.

---

# Padding з усіх сторін

    .box {
        padding: 20px;
    }

Це означає:

    top:    20px
    right:  20px
    bottom: 20px
    left:   20px

Еквівалент:

    .box {
        padding-top: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
    }

---

# Padding з двома значеннями

    .box {
        padding: 10px 20px;
    }

Означає:

    top/bottom: 10px
    left/right: 20px

Схема:

    top
    10px

    left 20px      right 20px

    bottom
    10px

---

# Padding з трьома значеннями

    .box {
        padding: 10px 20px 30px;
    }

Означає:

    top:    10px
    right:  20px
    bottom: 30px
    left:   20px

Правило:

    top
    horizontal
    bottom

---

# Padding з чотирма значеннями

    .box {
        padding: 10px 20px 30px 40px;
    }

Порядок:

    top
    right
    bottom
    left

Запам'ятати можна як рух за годинниковою стрілкою:

    top → right → bottom → left

---

# Padding окремими властивостями

Можна задавати сторони окремо:

    .box {
        padding-top: 10px;
        padding-right: 20px;
        padding-bottom: 30px;
        padding-left: 40px;
    }

---

# Padding та percentage

Percentage у padding обчислюється від ширини containing block.

Наприклад:

    .box {
        padding: 10%;
    }

Навіть:

    padding-top

і:

    padding-bottom

у percentage пов'язані з шириною containing block.

Це важливо пам'ятати при складних layout.

---

# Border

`border` — рамка навколо content і padding.

Наприклад:

    .box {
        border: 1px solid black;
    }

Структура:

    ┌─────────────────────────────┐
    │           border            │
    │  ┌───────────────────────┐  │
    │  │       padding         │  │
    │  │  ┌─────────────────┐  │  │
    │  │  │     content     │  │  │
    │  │  └─────────────────┘  │  │
    │  └───────────────────────┘  │
    └─────────────────────────────┘

---

# Border Structure

Border має три основні характеристики:

    border-width
    border-style
    border-color

Наприклад:

    .box {
        border-width: 2px;
        border-style: solid;
        border-color: black;
    }

Або shorthand:

    .box {
        border: 2px solid black;
    }

---

# Border Width

    .box {
        border-width: 2px;
    }

Можна задавати сторони:

    .box {
        border-top-width: 1px;
        border-right-width: 2px;
        border-bottom-width: 3px;
        border-left-width: 4px;
    }

---

# Border Style

Основні значення:

    solid
    dashed
    dotted
    double
    groove
    ridge
    inset
    outset
    none
    hidden

Найчастіше використовуються:

    solid
    dashed
    dotted
    none

Наприклад:

    .box {
        border: 2px dashed black;
    }

---

# Border Color

    .box {
        border-color: black;
    }

Або:

    .box {
        border: 1px solid black;
    }

---

# Border окремих сторін

    .box {
        border-top: 1px solid black;
        border-right: 2px solid red;
        border-bottom: 1px solid blue;
        border-left: 2px solid green;
    }

---

# Border Radius

`border-radius` заокруглює кути елемента.

    .box {
        border-radius: 10px;
    }

Наприклад:

    button {
        border-radius: 8px;
    }

---

# Коло через border-radius

Якщо елемент має однакові width і height:

    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

можна отримати круглу форму.

---

# Margin

`margin` — зовнішній простір навколо елемента.

    .box {
        margin: 20px;
    }

Схема:

    ┌─────────────────────────────────┐
    │             margin              │
    │    ┌───────────────────────┐    │
    │    │        border         │    │
    │    │  ┌─────────────────┐  │    │
    │    │  │     content     │  │    │
    │    │  └─────────────────┘  │    │
    │    └───────────────────────┘    │
    └─────────────────────────────────┘

Margin створює відстань між box та іншими елементами.

---

# Margin з усіх сторін

    .box {
        margin: 20px;
    }

Означає:

    top:    20px
    right:  20px
    bottom: 20px
    left:   20px

---

# Margin з двома значеннями

    .box {
        margin: 10px 20px;
    }

Означає:

    top/bottom: 10px
    left/right: 20px

---

# Margin з трьома значеннями

    .box {
        margin: 10px 20px 30px;
    }

Означає:

    top:    10px
    right:  20px
    bottom: 30px
    left:   20px

---

# Margin з чотирма значеннями

    .box {
        margin: 10px 20px 30px 40px;
    }

Порядок:

    top
    right
    bottom
    left

---

# Margin окремими властивостями

    .box {
        margin-top: 10px;
        margin-right: 20px;
        margin-bottom: 30px;
        margin-left: 40px;
    }

---

# Margin Auto

Одне з найважливіших застосувань:

    margin-left: auto;
    margin-right: auto;

Наприклад:

    .container {
        width: 800px;
        margin-left: auto;
        margin-right: auto;
    }

Елемент центрується горизонтально, якщо для нього доступний вільний простір.

Сучасний shorthand:

    .container {
        width: 800px;
        margin: 0 auto;
    }

---

# `margin: 0 auto`

Дуже поширений патерн:

    .container {
        max-width: 1200px;
        margin: 0 auto;
    }

Означає:

    top/bottom = 0
    left/right = auto

Лівий і правий margin отримують доступний вільний простір.

---

# Auto Margin та Flexbox

У Flexbox `margin: auto` може використовуватися для розподілу вільного простору.

Наприклад:

    .nav {
        display: flex;
    }

    .login {
        margin-left: auto;
    }

Елемент `.login` переміститься максимально вправо.

Це вже частково пов'язано з Flexbox.

---

# Box Sizing

`box-sizing` визначає, як браузер розраховує width і height елемента.

Основні значення:

    content-box
    border-box

За замовчуванням:

    box-sizing: content-box;

---

# content-box

`content-box` — стандартне значення.

    .box {
        width: 300px;
        padding: 20px;
        border: 5px solid black;
        box-sizing: content-box;
    }

Тоді:

    content = 300px
    padding = 20 + 20
    border = 5 + 5

Фактична ширина:

    300 + 40 + 10 = 350px

---

# Формула content-box

При горизонтальному розрахунку:

    total width =
        content width
        + padding-left
        + padding-right
        + border-left
        + border-right

Наприклад:

    width: 300px;
    padding: 20px;
    border: 5px solid;

Отримуємо:

    300
    + 20
    + 20
    + 5
    + 5
    = 350px

Margin у цю формулу не входить.

---

# Border-box

При:

    box-sizing: border-box;

задана `width` включає:

    content
    + padding
    + border

Наприклад:

    .box {
        width: 300px;
        padding: 20px;
        border: 5px solid black;
        box-sizing: border-box;
    }

Загальна ширина:

    300px

А content width буде:

    300
    - 40
    - 10
    = 250px

---

# Формула border-box

    total width = width

А всередині:

    content width =
        width
        - padding-left
        - padding-right
        - border-left
        - border-right

Наприклад:

    width: 300px;
    padding: 20px;
    border: 5px;

Тоді:

    content =
        300
        - 20
        - 20
        - 5
        - 5

    content = 250px

---

# content-box vs border-box

Дуже важливо розрізняти.

`content-box`:

    width
        ↓
    content only

`border-box`:

    width
        ↓
    content + padding + border

---

# Universal box-sizing

Дуже поширений CSS-підхід:

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

Це означає, що всі елементи та pseudo-elements використовують:

    border-box

Цей підхід спрощує розрахунок розмірів layout.

---

# Box Model Example

HTML:

    <div class="box">
        Hello
    </div>

CSS:

    .box {
        width: 300px;
        padding: 20px;
        border: 5px solid black;
        margin: 30px;
    }

За:

    box-sizing: content-box;

отримуємо:

    content = 300px
    padding = 40px
    border = 10px

Загальна ширина box:

    350px

З урахуванням margin:

    350 + 30 + 30 = 410px

---

# Box Model з border-box

    .box {
        width: 300px;
        padding: 20px;
        border: 5px solid black;
        margin: 30px;
        box-sizing: border-box;
    }

Тоді:

    box width = 300px

З урахуванням margin:

    300 + 30 + 30 = 360px

---

# Margin не є частиною box

Важливе поняття:

    content
    padding
    border

формують сам box.

`margin` знаходиться зовні box.

Схема:

    margin
        ↓
    ┌───────────────┐
    │    border     │
    │ ┌───────────┐ │
    │ │  padding  │ │
    │ │ ┌───────┐ │ │
    │ │ │content│ │ │
    │ │ └───────┘ │ │
    │ └───────────┘ │
    └───────────────┘

---

# Element Width vs Outer Width

При:

    box-sizing: border-box;

можна відрізняти:

    width
    outer width

Наприклад:

    .box {
        width: 300px;
        margin: 20px;
    }

Сам box:

    300px

З margin:

    300 + 20 + 20 = 340px

Margin збільшує простір, який займає елемент у layout.

---

# Padding vs Margin

Це одна з найважливіших відмінностей.

`padding`:

    → простір всередині element

`margin`:

    → простір зовні element

Наприклад:

    .card {
        padding: 20px;
        margin: 20px;
    }

`padding` віддаляє content від border.

`margin` віддаляє card від сусідніх елементів.

---

# Padding vs Margin — схема

    margin
    ↓
    ┌────────────────────────┐
    │        border          │
    │   padding              │
    │   ↓                    │
    │   ┌────────────────┐   │
    │   │    content     │   │
    │   └────────────────┘   │
    └────────────────────────┘
              ↑
          padding

---

# Border vs Outline

`border` є частиною Box Model.

`outline` — ні.

Наприклад:

    .box {
        border: 2px solid black;
        outline: 2px solid red;
    }

`border` впливає на розмір box.

`outline` не займає місце в Box Model.

Outline часто використовується для:

    focus
    accessibility
    debugging

---

# Outline

Наприклад:

    button:focus {
        outline: 2px solid blue;
    }

Outline знаходиться зовні border.

Він не змінює layout так, як border.

Не слід без потреби робити:

    outline: none;

особливо для focus-станів, якщо не створено альтернативний видимий focus indicator.

---

# Min Width

`min-width` задає мінімальну ширину.

    .box {
        min-width: 300px;
    }

Елемент не повинен ставати меншим за:

    300px

---

# Max Width

`max-width` задає максимальну ширину.

    .container {
        max-width: 1200px;
    }

Елемент не повинен ставати ширшим за:

    1200px

Це дуже поширено для responsive layout.

---

# Min Height

    .box {
        min-height: 200px;
    }

Елемент може бути вищим, але не повинен бути меншим за:

    200px

---

# Max Height

    .box {
        max-height: 500px;
    }

Елемент не повинен перевищувати:

    500px

Якщо content більший, може виникнути overflow.

---

# Width vs Min-width vs Max-width

Можна комбінувати:

    .container {
        width: 100%;
        max-width: 1200px;
        min-width: 300px;
    }

Логіка:

    min-width ≤ actual width ≤ max-width

Але точна поведінка залежить від інших властивостей layout.

---

# Height та Content

Не завжди потрібно задавати `height`.

Наприклад:

    .card {
        height: 200px;
    }

Якщо content стане більшим за доступну висоту, може виникнути overflow.

Часто безпечніше використовувати:

    min-height

замість жорсткого:

    height

коли висота має залежати від content.

---

# Overflow

`overflow` визначає, що робити з content, який виходить за межі box.

Основні значення:

    visible
    hidden
    scroll
    auto
    clip

Наприклад:

    .box {
        width: 200px;
        height: 100px;
        overflow: hidden;
    }

---

# overflow: visible

За замовчуванням:

    overflow: visible;

Content може виходити за межі box.

---

# overflow: hidden

    .box {
        overflow: hidden;
    }

Content, який виходить за межі box, обрізається.

---

# overflow: scroll

    .box {
        overflow: scroll;
    }

Створюється область прокручування.

---

# overflow: auto

    .box {
        overflow: auto;
    }

Scrollbar з'являється, коли вона необхідна.

Це часто практичніший варіант:

    overflow: auto;

---

# overflow-x та overflow-y

Можна керувати напрямками окремо:

    .box {
        overflow-x: auto;
        overflow-y: hidden;
    }

Наприклад:

    overflow-x → horizontal
    overflow-y → vertical

---

# Margin Collapse

Margin collapse — особливість CSS, коли вертикальні margins блокових елементів можуть об'єднуватися.

Наприклад:

    .first {
        margin-bottom: 30px;
    }

    .second {
        margin-top: 20px;
    }

Можна очікувати:

    30 + 20 = 50px

Але в певних умовах вертикальні margins collapse.

У результаті:

    max(30px, 20px) = 30px

а не:

    50px

---

# Vertical Margin Collapse

Найчастіше це стосується:

    margin-top
    margin-bottom

звичайних block elements у normal flow.

Наприклад:

    <div class="first"></div>
    <div class="second"></div>

    .first {
        margin-bottom: 30px;
    }

    .second {
        margin-top: 20px;
    }

Між ними може бути:

    30px

а не:

    50px

---

# Margin Collapse — важливо

Margin collapse не відбувається у всіх випадках.

Наприклад, margins не collapse між flex items.

Також існують інші механізми, які можуть запобігти collapse:

    border
    padding
    inline formatting context
    flex container
    grid container
    встановлений overflow у певних випадках

На практиці важливо знати саме принцип:

    vertical margins
        ↓
    можуть collapse

---

# Parent-Child Margin Collapse

Margin може collapse між parent та first/last child у певних умовах.

Наприклад:

    <section class="section">
        <h2>Title</h2>
    </section>

    .section {
        background: lightgray;
    }

    h2 {
        margin-top: 30px;
    }

Margin першого child може візуально "вийти" за межі parent.

Це часто є причиною несподіваного простору.

---

# Як уникати проблем з Margin Collapse

Замість margin child іноді можна використовувати:

    padding

Наприклад:

    .section {
        padding-top: 30px;
    }

замість:

    .section h2 {
        margin-top: 30px;
    }

Також layout-контейнери:

    display: flex;

або:

    display: grid;

мають іншу поведінку щодо margin collapse.

---

# Negative Margin

Margin може бути від'ємним.

    .box {
        margin-top: -20px;
    }

Negative margin може переміщувати елемент ближче до іншого елемента або створювати overlap.

Використовувати потрібно обережно, тому що надмірне використання ускладнює layout.

---

# Percentage Width

Width може бути заданий у `%`.

    .container {
        width: 80%;
    }

Значення percentage зазвичай відноситься до розміру containing block.

Наприклад, якщо parent має:

    width: 1000px;

а child:

    width: 50%;

то child матиме:

    500px

---

# Percentage Height

Percentage height має більш специфічну поведінку.

Наприклад:

    .child {
        height: 50%;
    }

Для передбачуваного percentage height parent часто повинен мати визначену height.

Наприклад:

    .parent {
        height: 400px;
    }

    .child {
        height: 50%;
    }

Тоді:

    child height = 200px

---

# Box Model та `auto`

Багато CSS-властивостей можуть використовувати:

    auto

Наприклад:

    width: auto;
    height: auto;
    margin: auto;

`auto` означає, що браузер розраховує значення відповідно до layout rules.

---

# Width: auto

Для block element у normal flow:

    width: auto;

часто означає, що елемент займає доступну ширину containing block з урахуванням margin, border та padding.

Наприклад:

    .box {
        width: auto;
    }

не означає буквально:

    width = 0

Це спеціальне значення, яке залежить від layout context.

---

# Height: auto

Типове значення:

    height: auto;

означає, що висота визначається content та іншими умовами layout.

Наприклад:

    .card {
        padding: 20px;
    }

Висота card може автоматично збільшуватися разом із content.

---

# Box Model та `display`

Box Model існує для різних типів елементів, але їх поведінка залежить від:

    display

Наприклад:

    block
    inline
    inline-block
    flex
    grid

Особливо важливо пам'ятати, що `width`, `height`, `margin`, `padding` можуть поводитися по-різному для inline та block elements.

Детальніше:

    02-display-and-overflow

---

# Box Model та Inline Elements

Для inline elements:

    <span>Hello</span>

деякі властивості width/height не працюють так само, як для block elements.

Наприклад:

    span {
        width: 300px;
        height: 100px;
    }

Для звичайного inline formatting width та height не застосовуються так, як для block box.

Padding і border можуть застосовуватися, але їх вертикальна взаємодія з layout має свої особливості.

Якщо потрібен box із контрольованими width і height, часто використовують:

    display: inline-block;

---

# Inline-block

    .box {
        display: inline-block;
        width: 200px;
        height: 100px;
        padding: 20px;
    }

Тепер width і height застосовуються до box.

Inline-block поєднує деякі властивості:

    inline behavior
    +
    block-like box sizing

---

# Box Model та Flexbox

Flexbox items також є boxes.

Наприклад:

    .container {
        display: flex;
    }

    .item {
        width: 200px;
        padding: 20px;
        border: 1px solid;
    }

Box Model визначає розмір кожного flex item.

А Flexbox визначає, як ці boxes розташовуються та розподіляють простір.

---

# Box Model та Grid

Grid items також мають Box Model.

Наприклад:

    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }

    .card {
        padding: 20px;
        border: 1px solid;
    }

Grid визначає структуру layout.

Box Model визначає внутрішній розмір кожної card.

---

# Box Model та Gap

`gap` не є частиною Box Model окремого елемента.

Наприклад:

    .container {
        display: flex;
        gap: 20px;
    }

`gap` створює простір між flex/grid items.

Це відрізняється від:

    margin

Особливо це важливо у сучасному layout.

---

# Margin vs Gap

`margin` належить конкретному елементу:

    .item {
        margin-right: 20px;
    }

`gap` належить container:

    .container {
        display: flex;
        gap: 20px;
    }

Для Flexbox і Grid `gap` часто є чистішим способом створення відстані між items.

---

# Box Model та Background

Background елемента пов'язаний із box area.

Наприклад:

    .box {
        background: lightgray;
        padding: 20px;
    }

Background за замовчуванням поширюється через:

    content
    padding
    border area

але точна область контролюється через:

    background-clip

---

# background-clip

Можна визначити, де малюється background.

Основні значення:

    border-box
    padding-box
    content-box

Наприклад:

    .box {
        background-clip: padding-box;
    }

Це вже більше належить до visual styling, але корисно розуміти зв'язок із Box Model.

---

# Box Model та `box-shadow`

`box-shadow` створює візуальну тінь навколо box.

Наприклад:

    .card {
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);
    }

Тінь не додає розміру box у layout так, як padding або border.

Тобто:

    box-shadow

не збільшує:

    width
    height

і не займає layout space.

---

# Box Model та `transform`

`transform` може візуально змінити розмір або положення елемента:

    .box {
        transform: scale(1.1);
    }

Але transform не змінює звичайний layout flow так само, як зміна width або height.

Наприклад:

    transform: translateX(20px);

візуально переміщує елемент, але сусідні елементи не перераховують layout так, ніби element отримав:

    margin-left: 20px;

---

# DevTools Box Model

Browser DevTools дозволяє переглядати Box Model елемента.

У Chrome/Firefox DevTools можна побачити:

    margin
    border
    padding
    content

Це один із найважливіших інструментів для debugging CSS.

Якщо елемент має несподіваний розмір, перше, що варто перевірити:

    width
    height
    padding
    border
    margin
    box-sizing

---

# Debugging Box Model

Наприклад:

    .box {
        width: 300px;
        padding: 30px;
        border: 5px solid;
    }

Якщо box здається ширшим, ніж очікувалося, перевірити:

    box-sizing

Якщо:

    content-box

то:

    300
    + 60
    + 10
    = 370px

Якщо:

    border-box

то загальна ширина:

    300px

---

# Universal Reset

Дуже поширений базовий стиль:

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

Також часто використовують:

    html {
        box-sizing: border-box;
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }

Другий варіант дозволяє успадковувати `box-sizing`.

---

# Browser Default Margins

Деякі HTML elements мають default margin.

Наприклад:

    h1
    h2
    h3
    p
    ul
    ol
    body

Тому іноді layout має відступи, які не були явно задані у CSS.

Наприклад:

    body {
        margin: 0;
    }

Це часто використовується в CSS reset / base styles.

---

# Body та Box Model

Наприклад:

    body {
        margin: 0;
    }

прибирає стандартний зовнішній margin body.

Після цього можна самостійно контролювати layout.

---

# `box-sizing: border-box` — практичний стандарт

У сучасних проектах часто використовують:

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

Перевага:

    width: 100%;

залишається контрольованою навіть при додаванні:

    padding
    border

Наприклад:

    .input {
        width: 100%;
        padding: 12px;
        border: 1px solid;
    }

При `border-box` input не повинен перевищувати задану ширину лише через padding і border.

---

# 100% Width та Box Model

Розглянемо:

    .input {
        width: 100%;
        padding: 10px;
        border: 1px solid;
    }

При:

    box-sizing: content-box;

фактична ширина може стати більшою за parent.

При:

    box-sizing: border-box;

100% включає:

    content
    padding
    border

Це одна з практичних причин використовувати `border-box`.

---

# Практичний Card

HTML:

    <article class="card">
        <h2>Title</h2>
        <p>
            Some text.
        </p>
    </article>

CSS:

    .card {
        width: 300px;
        padding: 24px;
        border: 1px solid #ccc;
        margin: 20px;
        border-radius: 12px;
        box-sizing: border-box;
    }

Box:

    width = 300px

Всередині:

    padding = 24px
    border = 1px

Content area:

    300
    - 48
    - 2
    = 250px

---

# Практичний Container

Типовий responsive container:

    .container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        box-sizing: border-box;
    }

Тут:

    width: 100%
        ↓
    container займає доступну ширину

    max-width: 1200px
        ↓
    container не стає надто широким

    margin: 0 auto
        ↓
    центрування

    padding: 0 20px
        ↓
    внутрішній горизонтальний простір

---

# Практичний Button

    .button {
        padding: 10px 20px;
        border: 1px solid black;
        border-radius: 6px;
    }

Padding створює простір між:

    text
    і
    border

Margin можна використовувати для відстані між button та іншими elements:

    .button {
        margin-right: 10px;
    }

---

# Практичний Input

    input {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }

Це типовий практичний приклад `border-box`.

---

# Практичний Section

    .section {
        padding: 60px 20px;
    }

Тут `padding` створює внутрішній простір section.

Наприклад:

    padding-top: 60px
    padding-bottom: 60px
    padding-left: 20px
    padding-right: 20px

---

# Практичний Vertical Spacing

Замість:

    .title {
        margin-bottom: 20px;
    }

    .text {
        margin-bottom: 20px;
    }

у сучасних layout часто можна використовувати:

    .content {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

Це вже поєднання Box Model і Flexbox.

---

# Margin Collapse vs Flexbox

Normal flow:

    .item + .item {
        margin-top: 20px;
    }

може мати особливості margin collapse.

Flexbox:

    .container {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

`gap` дає більш передбачуваний простір між items.

---

# Logical Properties

Сучасний CSS також має logical properties.

Замість:

    margin-left
    margin-right

можна використовувати:

    margin-inline-start
    margin-inline-end

Замість:

    margin-top
    margin-bottom

можна:

    margin-block-start
    margin-block-end

---

# Padding Logical Properties

Наприклад:

    padding-inline: 20px;

означає простір на inline axis.

А:

    padding-block: 30px;

означає простір на block axis.

Також:

    padding-inline-start
    padding-inline-end
    padding-block-start
    padding-block-end

Logical properties особливо корисні для:

    RTL languages
    internationalization
    writing modes

---

# Margin Logical Properties

Наприклад:

    margin-inline: auto;

можна використовувати для центрування.

Замість:

    margin-left: auto;
    margin-right: auto;

---

# Border Logical Properties

Наприклад:

    border-inline-start: 1px solid black;

або:

    border-block-end: 1px solid black;

Це дозволяє писати CSS, який краще адаптується до різних writing modes.

---

# Box Model Axes

У сучасному CSS важливо розуміти:

    block axis
    inline axis

Зазвичай у стандартному horizontal writing mode:

    block axis   → vertical
    inline axis  → horizontal

Тому:

    margin-block
        ↓
    vertical spacing

    margin-inline
        ↓
    horizontal spacing

Але це залежить від writing mode.

---

# Box Model та Writing Mode

CSS Box Model не завжди потрібно мислити як:

    top
    right
    bottom
    left

У сучасному CSS можна мислити через:

    block
    inline

Наприклад:

    padding-block: 20px;
    padding-inline: 30px;

Це більш універсальний підхід.

---

# Replaced Elements

Деякі elements мають специфічну поведінку Box Model.

Наприклад:

    img
    video
    iframe
    input

Для них можуть бути важливими:

    width
    height
    object-fit
    aspect-ratio

Наприклад:

    img {
        width: 100%;
        height: auto;
    }

---

# `aspect-ratio`

`aspect-ratio` дозволяє задавати співвідношення сторін box.

Наприклад:

    .video {
        width: 100%;
        aspect-ratio: 16 / 9;
    }

Браузер може автоматично розрахувати висоту на основі ширини.

Це сучасний інструмент для роботи з розмірами.

---

# Box Model та `calc()`

CSS дозволяє використовувати математичні вирази.

Наприклад:

    .box {
        width: calc(100% - 40px);
    }

Це означає:

    parent width
    -
    40px

`calc()` часто використовується разом із Box Model та responsive layout.

---

# `clamp()`

Сучасний CSS також дозволяє:

    width: clamp(300px, 80%, 1200px);

Логіка:

    minimum
    preferred
    maximum

Тобто:

    min = 300px
    preferred = 80%
    max = 1200px

---

# CSS Custom Properties та Box Model

CSS variables можна використовувати для spacing.

Наприклад:

    :root {
        --spacing-sm: 8px;
        --spacing-md: 16px;
        --spacing-lg: 24px;
    }

    .card {
        padding: var(--spacing-lg);
        margin-bottom: var(--spacing-md);
    }

Це допомагає підтримувати consistency у проекті.

---

# Spacing System

У проекті можна створити систему відступів:

    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 24px;
    --space-6: 32px;

Наприклад:

    .card {
        padding: var(--space-5);
    }

    .section {
        padding-block: var(--space-6);
    }

Це частина CSS architecture та design systems.

---

# Типові помилки

❌ Не розуміти різницю між padding і margin.

    padding → inside
    margin  → outside

---

❌ Забувати про border у розрахунку ширини.

При:

    box-sizing: content-box;

border збільшує фактичний розмір box.

---

❌ Забувати про padding у `width: 100%`.

Наприклад:

    .input {
        width: 100%;
        padding: 20px;
    }

При `content-box` фактична ширина може бути:

    100%
    + padding

і перевищити parent.

Рішення:

    box-sizing: border-box;

---

❌ Використовувати `height` там, де content має змінну висоту.

Наприклад:

    .card {
        height: 200px;
    }

Якщо текст стане більшим, може виникнути overflow.

Часто краще:

    min-height: 200px;

---

❌ Використовувати margin для spacing у flex/grid, коли краще `gap`.

Наприклад:

    .list {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

часто простіше, ніж керувати margins окремих items.

---

❌ Не враховувати margin collapse.

Вертикальні margins у normal flow можуть поводитися не так, як очікується.

---

❌ Прибирати outline без альтернативи.

Погано:

    button:focus {
        outline: none;
    }

Це може погіршити keyboard accessibility.

---

❌ Використовувати надмірну кількість negative margins.

Наприклад:

    margin-top: -35px;

може вирішити конкретну проблему, але створити складні залежності в layout.

---

❌ Використовувати багато фіксованих width.

Наприклад:

    width: 437px;
    width: 521px;
    width: 693px;

Для responsive layout частіше краще використовувати:

    width: 100%;
    max-width: ...;
    min-width: ...;
    %
    fr
    minmax()
    clamp()

---

# Типові питання на співбесіді

Що таке CSS Box Model?

З яких частин складається Box Model?

Що таке content?

Що таке padding?

Що таке border?

Що таке margin?

Яка різниця між padding та margin?

Що входить у width при `box-sizing: content-box`?

Що входить у width при `box-sizing: border-box`?

Яке значення `box-sizing` є стандартним?

Що робить:

    box-sizing: border-box;

Як порахувати фактичну ширину елемента при `content-box`?

Чи входить margin у width елемента?

Чи входить border у width при `content-box`?

Чи входить padding у width при `content-box`?

Чим `border-box` відрізняється від `content-box`?

Що таке margin collapse?

Коли виникає margin collapse?

Що таке `margin: 0 auto`?

Як горизонтально центрувати block element?

Що робить `min-width`?

Що робить `max-width`?

Чим `height` відрізняється від `min-height`?

Що таке overflow?

Яка різниця між:

    overflow: hidden;
    overflow: auto;
    overflow: scroll;

Що таке `outline`?

Чим outline відрізняється від border?

Чи займає outline місце в layout?

Що таке `box-shadow`?

Чи збільшує box-shadow розмір елемента?

Що робить `box-sizing: border-box`?

Чому часто використовують universal:

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

Що відбувається з `width: 100%` при `content-box` та padding?

Що таке logical properties?

Що означають:

    margin-block
    margin-inline
    padding-block
    padding-inline

Що таке `aspect-ratio`?

Як Box Model працює разом із Flexbox?

Як Box Model працює разом із Grid?

Чим `gap` відрізняється від `margin`?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке CSS Box Model.

Чотири частини:

    content
    padding
    border
    margin

`width`.

`height`.

`padding`.

`border`.

`margin`.

`box-sizing`.

`content-box`.

`border-box`.

Розрахунок фактичної ширини.

Розрахунок фактичної висоти.

`margin: 0 auto`.

`min-width`.

`max-width`.

`min-height`.

`max-height`.

`overflow`.

Основи `margin collapse`.

Різниця:

    padding vs margin

Різниця:

    border vs outline

Розуміння Box Model у block elements.

---

🔵 Junior

Впевнено розуміти:

    content
    padding
    border
    margin

Розуміти shorthand:

    margin: 10px 20px 30px 40px;

    padding: 10px 20px 30px 40px;

Розуміти:

    box-sizing: border-box;

Вміти рахувати розміри box.

Розуміти:

    width
    height
    min-width
    max-width
    min-height
    max-height

Розуміти margin collapse.

Розуміти:

    overflow-x
    overflow-y

Розуміти `gap`.

Розуміти Box Model у:

    block
    inline-block
    flex
    grid

Вміти debugging Box Model через DevTools.

Вміти створити:

    container
    card
    button
    input
    section

з правильним spacing.

---

🟠 Middle

Глибше розуміти:

    formatting contexts
    margin collapse
    containing block
    intrinsic sizing
    min-content
    max-content
    fit-content

Розуміти взаємодію:

    width
    min-width
    max-width

Розуміти взаємодію:

    height
    min-height
    max-height

Розуміти percentage sizing.

Розуміти percentage padding.

Розуміти:

    box-sizing

у складних layout.

Розуміти:

    overflow
    overflow clipping
    scroll containers

Розуміти:

    gap
    margin
    padding

у Flexbox та Grid.

Використовувати:

    calc()
    min()
    max()
    clamp()

Розуміти:

    aspect-ratio

Використовувати logical properties:

    margin-block
    margin-inline
    padding-block
    padding-inline

Розуміти Box Model у responsive design.

---

🔴 Senior

Глибоке розуміння CSS sizing та layout algorithms.

Intrinsic sizing.

Extrinsic sizing.

Preferred size.

Minimum size.

Maximum size.

    min-content
    max-content
    fit-content

Розуміння:

    containing block

Розуміння formatting contexts.

Block formatting context.

Inline formatting context.

Flex formatting context.

Grid formatting context.

Розуміння margin collapsing rules.

Розуміння overflow propagation.

Scroll containers.

Clipping.

Fragmentation.

Writing modes.

Logical properties.

Internationalized layouts.

Box sizing у складних layout.

Intrinsic contribution.

Min/max constraints.

Layout performance.

Взаємодія:

    Box Model
    Flexbox
    Grid
    Positioning
    Overflow
    Responsive Design

---

# Міні-шпаргалка

## Box Model

    ┌─────────────────────────────┐
    │           margin            │
    │  ┌───────────────────────┐  │
    │  │        border         │  │
    │  │  ┌─────────────────┐  │  │
    │  │  │     padding     │  │  │
    │  │  │  ┌───────────┐  │  │  │
    │  │  │  │  content  │  │  │  │
    │  │  │  └───────────┘  │  │  │
    │  │  └─────────────────┘  │  │
    │  └───────────────────────┘  │
    └─────────────────────────────┘

---

## Content

    content

Внутрішній вміст element.

---

## Padding

    padding

Відстань:

    content
       ↓
    border

---

## Border

    border

Рамка навколо:

    content + padding

---

## Margin

    margin

Зовнішній простір навколо:

    border

---

## content-box

    box-sizing: content-box;

`width`:

    content only

Фактична ширина:

    width
    + padding
    + border

---

## border-box

    box-sizing: border-box;

`width`:

    content
    + padding
    + border

---

## Формула

### content-box

    total width =
        width
        + padding-left
        + padding-right
        + border-left
        + border-right

### border-box

    total width =
        width

---

## Padding shorthand

    padding: 20px;

    top
    right
    bottom
    left

Усі:

    20px

---

    padding: 10px 20px;

    top/bottom = 10px
    left/right = 20px

---

    padding: 10px 20px 30px;

    top = 10px
    right = 20px
    bottom = 30px
    left = 20px

---

    padding: 10px 20px 30px 40px;

    top = 10px
    right = 20px
    bottom = 30px
    left = 40px

---

## Margin shorthand

    margin: 20px;

    margin: 10px 20px;

    margin: 10px 20px 30px;

    margin: 10px 20px 30px 40px;

Порядок:

    top
    right
    bottom
    left

---

## Center

    .container {
        max-width: 1200px;
        margin: 0 auto;
    }

---

## Universal box-sizing

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

---

## Overflow

    overflow: visible;
    overflow: hidden;
    overflow: auto;
    overflow: scroll;

---

## Axes

    block axis
        ↓
    зазвичай vertical

    inline axis
        ↓
    зазвичай horizontal

---

## Logical properties

    margin-block
    margin-inline

    padding-block
    padding-inline

    border-block
    border-inline

---

## Gap

    .container {
        display: flex;
        gap: 20px;
    }

`gap`:

    → space between items

---

## Box Model vs Gap

    margin
        → належить item

    gap
        → належить container

---

## Border vs Outline

    border
        → part of Box Model
        → affects box size

    outline
        → outside Box Model
        → does not occupy layout space

---

## Box Shadow

    box-shadow

    → visual effect
    → does not occupy layout space

---

## Aspect Ratio

    .box {
        aspect-ratio: 16 / 9;
    }

---

## Responsive Container

    .container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding-inline: 20px;
        box-sizing: border-box;
    }

---

# Головне:

• CSS Box Model описує, як браузер представляє розміри HTML element.

• Основні частини:

    content
    padding
    border
    margin

• `content` — внутрішній вміст.

• `padding` — простір між content і border.

• `border` — рамка навколо content і padding.

• `margin` — зовнішній простір навколо element.

• За замовчуванням:

    box-sizing: content-box;

• При `content-box` заданий `width` стосується тільки content.

• При `border-box` заданий `width` включає:

    content
    padding
    border

• `margin` не входить у width або height box.

• `padding` та `border` можуть збільшити фактичний розмір при:

    content-box

• `box-sizing: border-box` робить розрахунок розмірів більш передбачуваним.

• Практичний глобальний шаблон:

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

• `padding` використовується для внутрішнього spacing.

• `margin` використовується для зовнішнього spacing.

• `gap` створює простір між flex/grid items.

• `margin: 0 auto` часто використовується для горизонтального центрування block container.

• Вертикальні margins у normal flow можуть collapse.

• `min-width` задає мінімальну ширину.

• `max-width` задає максимальну ширину.

• `min-height` задає мінімальну висоту.

• `max-height` задає максимальну висоту.

• `overflow` керує content, який виходить за межі box.

• `outline` не є частиною Box Model.

• `box-shadow` не займає layout space.

• `aspect-ratio` дозволяє контролювати співвідношення width/height.

• Logical properties дозволяють працювати через:

    block
    inline

замість жорсткого:

    top
    right
    bottom
    left

• Сучасний CSS layout потрібно розглядати як взаємодію:

    Box Model
        ↓
    Display
        ↓
    Normal Flow
        ↓
    Flexbox
        ↓
    Grid
        ↓
    Positioning
        ↓
    Responsive Design

• Основна модель:

    margin
       ↓
    border
       ↓
    padding
       ↓
    content

• Найважливіша практична ідея:

    padding → space inside
    margin  → space outside
    gap     → space between layout items

• Найважливіша властивість для контролю розмірів:

    box-sizing

• Для більшості сучасних проектів зручно починати з:

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

• Якщо розмір елемента здається неправильним, у DevTools насамперед перевіряй:

    width
    height
    padding
    border
    margin
    box-sizing

• Box Model — фундамент для розуміння всього CSS layout.