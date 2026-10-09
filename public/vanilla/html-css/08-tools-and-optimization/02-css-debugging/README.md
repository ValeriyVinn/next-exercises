# 02. CSS Debugging — Налагодження CSS

CSS Debugging — це процес пошуку, аналізу та виправлення помилок у CSS, через які вебсторінка відображається не так, як очікується.

Під час розробки можуть виникати різні проблеми:

- CSS-властивість не застосовується;
- елемент має неправильний розмір;
- блок розташований не там, де потрібно;
- Flexbox або Grid працює не так, як очікувалося;
- елементи перекривають один одного;
- стилі конфліктують між собою;
- адаптивний layout ламається на мобільних пристроях;
- текст або зображення виходять за межі контейнера;
- псевдокласи та media queries працюють неправильно;
- браузер не завантажує потрібний CSS-файл.

Для налагодження CSS найчастіше використовують браузерні DevTools, зокрема панелі Elements, Styles, Computed і Console.

Головна мета CSS Debugging — не просто виправити зовнішній вигляд сторінки, а знайти справжню причину проблеми.

---

## Ключові поняття

✔ CSS debugging  
✔ CSS error  
✔ CSS declaration  
✔ CSS rule  
✔ Selector  
✔ Specificity  
✔ Cascade  
✔ Inheritance  
✔ Source order  
✔ Cascade layers  
✔ `!important`  
✔ Invalid CSS  
✔ Computed styles  
✔ Box Model  
✔ `box-sizing`  
✔ Layout debugging  
✔ Flexbox debugging  
✔ Grid debugging  
✔ Overflow  
✔ Positioning  
✔ Stacking context  
✔ `z-index`  
✔ Containing block  
✔ Margin collapse  
✔ Pseudo-classes  
✔ Media queries  
✔ Responsive debugging  
✔ Browser rendering  
✔ DevTools  
✔ CSS validation  
✔ Cross-browser debugging  
✔ Reproducible bug  
✔ Minimal test case  
✔ Regression testing  

---

## Що потрібно пам'ятати

• CSS Debugging — систематичний процес пошуку причини помилки та її виправлення.

• Якщо CSS-властивість не працює, спочатку перевір селектор, каскад, специфічність і правильність значення.

• Перекреслена декларація в DevTools часто означає, що для відповідної властивості використовується інше правило.

• Якщо властивість не перекреслена, але результат неочікуваний, проблема може бути пов'язана з layout, успадкуванням, containing block або іншими властивостями.

• `Computed` показує обчислені значення CSS-властивостей.

• Box Model допомагає знаходити помилки з шириною, висотою, padding, border і margin.

• Flexbox і Grid потрібно налагоджувати з урахуванням властивостей як контейнера, так і його дочірніх елементів.

• `z-index` не завжди вирішує проблему накладання елементів, оскільки важливими є stacking contexts.

• Media queries потрібно перевіряти на різних ширинах viewport, особливо біля breakpoint.

• Якщо проблема не відтворюється стабільно, потрібно спочатку визначити умови її виникнення.

• Змінюй одну властивість за раз, щоб зрозуміти, як саме вона впливає на результат.

• Тимчасові зміни в DevTools потрібно переносити у вихідні файли вручну.

• Після виправлення перевір, чи не з'явилися нові проблеми в інших частинах сторінки.

• Не додавай `!important`, випадкові відступи або довільні значення `z-index` лише для того, щоб приховати симптом проблеми.

---

# Що таке CSS Debugging

CSS Debugging — це процес діагностики CSS-коду.

Наприклад, потрібно вирівняти картку по центру контейнера.

HTML:

    <div class="container">
        <div class="card">
            Card content
        </div>
    </div>

CSS:

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card {
        width: 300px;
    }

Якщо картка не розташовується по центру, потрібно перевірити:

    1. Чи завантажився CSS-файл.
    2. Чи застосовується клас container.
    3. Чи має контейнер display: flex.
    4. Які розміри контейнера.
    5. Чи має контейнер достатню висоту.
    6. Чи не впливають інші CSS-правила.
    7. Чи немає додаткових margin або position.
    8. Чи не змінює layout JavaScript.

Важливо: `align-items: center` центрує елементи по поперечній осі Flexbox, але видимий результат залежить від напрямку flex-контейнера та його розмірів.

Тому не варто відразу змінювати кілька властивостей. Спочатку потрібно встановити причину.

---

# CSS Rule

CSS rule — правило CSS, яке складається із селектора та блоку декларацій.

Приклад:

    .card {
        width: 300px;
        padding: 20px;
        background-color: white;
    }

Тут:

    .card                 → selector
    width: 300px          → declaration
    padding: 20px         → declaration
    background-color: white → declaration

Кожна декларація містить:

    property
    value

Наприклад:

    color: red;

Тут:

    color → property
    red   → value

Під час налагодження потрібно розрізняти різні типи помилок:

    неправильний selector
    неправильна property
    неправильний value
    конфлікт правил
    неправильне розташування елемента
    неправильні розміри контейнера

Це різні проблеми, і вони потребують різних способів діагностики.

---

# Типи CSS-помилок

## 1. Syntax Error

Syntax error — синтаксична помилка в CSS.

Приклад:

    .card {
        color red;
    }

Правильно:

    .card {
        color: red;
    }

У першому прикладі пропущено двокрапку між властивістю та значенням.

Браузер зазвичай ігнорує некоректну декларацію, але може застосувати інші правильні декларації того самого правила.

---

## 2. Invalid Property

Неправильна назва CSS-властивості.

Приклад:

    .container {
        display: flex;
        justify-content: center;
        align-item: center;
    }

Помилка:

    align-item

Правильно:

    align-items

Виправлення:

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

DevTools може показувати попередження або позначати неправильну декларацію, залежно від браузера.

---

## 3. Invalid Value

Властивість існує, але значення неправильне.

Приклад:

    .title {
        font-size: largee;
    }

Правильно:

    .title {
        font-size: large;
    }

Інший приклад:

    .box {
        width: banana;
    }

Значення `banana` не є допустимим значенням `width`.

Браузер не застосує таку декларацію як звичайне валідне значення CSS.

---

## 4. Selector Mismatch

Селектор не відповідає HTML-елементу.

HTML:

    <div class="card">
        Hello
    </div>

CSS:

    .cards {
        background-color: yellow;
    }

Проблема:

    .cards ≠ .card

Правильно:

    .card {
        background-color: yellow;
    }

Під час debugging перевір:

    назву класу
    id
    вкладеність
    пробіли в селекторі
    псевдокласи
    відповідність HTML-структурі

---

## 5. Cascade Conflict

Кілька CSS-правил задають різні значення однієї властивості.

Приклад:

    p {
        color: red;
    }

    .description {
        color: blue;
    }

HTML:

    <p class="description">
        Hello
    </p>

Результат:

    color: blue

Причина — селектор класу має більшу специфічність, ніж селектор елемента.

---

## 6. Layout Error

CSS синтаксично правильний, але елемент розташований не так, як очікується.

Наприклад:

    .container {
        display: flex;
        justify-content: center;
    }

    .card {
        margin-left: 100px;
    }

Картка може здаватися зміщеною через додатковий margin.

У такому випадку проблема не обов'язково в Flexbox. Потрібно перевірити всі властивості, які впливають на розташування елемента.

---

# Алгоритм CSS Debugging

Коли елемент відображається неправильно, використовуй систематичний алгоритм.

    1. Reproduce
       Відтвори проблему.

    2. Inspect
       Вибери елемент у DevTools.

    3. Identify
       Визнач, яка властивість або поведінка неправильна.

    4. Check
       Перевір CSS-правила, каскад і Computed Styles.

    5. Hypothesize
       Сформулюй можливу причину.

    6. Test
       Зміни одну властивість і перевір результат.

    7. Fix
       Внеси виправлення у вихідний файл.

    8. Verify
       Перевір результат у потрібних умовах.

    9. Regression test
       Переконайся, що інші частини сторінки не зламалися.

Цей підхід допомагає уникати випадкових змін CSS.

---

# 1. Debugging за допомогою DevTools

DevTools — головний інструмент для налагодження CSS у браузері.

Для відкриття в Chrome або Edge на Windows зазвичай використовують:

    F12

Або:

    Ctrl + Shift + I

Щоб вибрати елемент сторінки:

    Ctrl + Shift + C

Основні панелі для CSS Debugging:

    Elements
    Styles
    Computed
    Console
    Network

---

## Elements

`Elements` допомагає перевірити:

    HTML-структуру
    класи
    id
    вкладеність
    атрибути
    псевдоелементи
    батьківські елементи

Наприклад:

    <div class="container">
        <div class="card">
            <h2 class="title">Hello</h2>
        </div>
    </div>

Якщо заголовок має неправильне форматування, перевір:

    чи існує class="title"
    чи вибрано правильний елемент
    чи є потрібний клас у DOM
    чи не змінила структуру сторінки JavaScript

---

## Styles

`Styles` показує CSS-правила, які відповідають вибраному елементу, а також правила, що впливають на нього через успадкування або інші механізми CSS.

Наприклад:

    .title {
        color: blue;
        font-size: 32px;
    }

Можна тимчасово змінити:

    color: red;

Або вимкнути декларацію:

    font-size: 32px;

Це допомагає перевірити гіпотезу до редагування вихідного файлу.

---

## Computed

`Computed` показує обчислені значення властивостей.

Наприклад:

    width: 300px
    height: 120px
    display: flex
    color: rgb(0, 0, 255)
    margin-top: 20px

Якщо в CSS записано:

    .card {
        width: 300px;
    }

але в `Computed` ширина відрізняється, потрібно з'ясувати причину.

Можливі причини:

    інше правило
    min-width або max-width
    flex sizing
    grid sizing
    box-sizing
    transform
    обмеження батьківського контейнера
    особливості обчислення відсоткових розмірів

Важливо: `getComputedStyle()` і панель `Computed` показують обчислені значення CSS, але вони не завжди безпосередньо дорівнюють остаточному видимому розміру елемента на екрані. Для фактичної геометрії можна також досліджувати розміри елемента через DevTools або `getBoundingClientRect()`.

---

# 2. Specificity Debugging

Specificity — специфічність CSS-селектора.

Коли кілька правил задають різні значення однієї властивості, специфічність допомагає визначити, яке правило матиме перевагу.

Спрощений порядок специфічності:

    inline styles
        ↓
    ID selectors
        ↓
    class / attribute / pseudo-class selectors
        ↓
    element / pseudo-element selectors

Це спрощена модель. На результат також впливають origin, importance, cascade layers, scope та source order.

---

## Приклад 1 — selector specificity

CSS:

    p {
        color: red;
    }

    .text {
        color: blue;
    }

    #intro {
        color: green;
    }

HTML:

    <p id="intro" class="text">
        Hello
    </p>

Результат:

    color: green

Причина:

    #intro має більшу специфічність,
    ніж .text і p

---

## Приклад 2 — два класи

CSS:

    .card {
        color: red;
    }

    .featured {
        color: blue;
    }

HTML:

    <div class="card featured">
        Content
    </div>

Обидва селектори мають однакову специфічність.

Якщо правила належать до однакового cascade origin, importance і layer, перевагу має правило, яке розташоване пізніше.

Приклад:

    .card {
        color: red;
    }

    .featured {
        color: blue;
    }

Результат:

    color: blue

Якщо поміняти порядок правил:

    .featured {
        color: blue;
    }

    .card {
        color: red;
    }

Результат:

    color: red

---

## Приклад 3 — не додавай !important навмання

Проблемний код:

    .button {
        background-color: blue !important;
    }

    .button:hover {
        background-color: red;
    }

Коли користувач наводить курсор, очікується червоний фон, але правило з `!important` має перевагу над звичайною декларацією.

Краще, якщо немає іншої причини використовувати `!important`:

    .button {
        background-color: blue;
    }

    .button:hover {
        background-color: red;
    }

Тепер звичайне правило `:hover` може змінювати фон.

Під час debugging спочатку знайди причину конфлікту, а не додавай `!important` до кожної декларації.

---

# 3. Debugging Inheritance

Inheritance — успадкування CSS-властивостей від батьківського елемента.

Наприклад:

    body {
        color: #333;
        font-family: Arial, sans-serif;
    }

Текст у дочірніх елементах зазвичай успадковує `color` і `font-family`, якщо інші правила не перевизначають їх.

HTML:

    <body>
        <main>
            <p>Hello world</p>
        </main>
    </body>

Якщо текст має неочікуваний колір, перевір:

    CSS батьківського елемента
    CSS самого елемента
    успадковані значення
    правила з більшою специфічністю

Важливо: не всі CSS-властивості успадковуються.

Наприклад, `color` зазвичай успадковується, а `margin` — ні.

---

# 4. Debugging Box Model

Box Model — одна з найчастіших причин несподіваних розмірів елементів.

Основні компоненти:

    content
    padding
    border
    margin

Приклад:

    .box {
        width: 300px;
        padding: 20px;
        border: 5px solid black;
    }

За `box-sizing: content-box`:

    content width = 300px
    horizontal padding = 40px
    horizontal border = 10px

Загальна ширина border box:

    300 + 40 + 10 = 350px

---

## box-sizing: border-box

Поширений підхід:

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

Тепер:

    .box {
        width: 300px;
        padding: 20px;
        border: 5px solid black;
    }

Загальна ширина border box:

    300px

Ширина content:

    300 - 40 - 10 = 250px

`margin` залишається зовнішнім відступом і не входить у `width`.

---

## Debugging margin

Приклад:

    .card {
        margin: 40px;
    }

Якщо картка здається зміщеною, перевір:

    margin-top
    margin-right
    margin-bottom
    margin-left
    margin-inline
    margin-block

Також потрібно пам'ятати про margin collapse.

---

## Margin Collapse

Margin collapse — механізм, за якого вертикальні margins певних блокових елементів можуть об'єднуватися замість простого додавання.

Приклад:

    <div class="first"></div>
    <div class="second"></div>

    .first {
        margin-bottom: 30px;
    }

    .second {
        margin-top: 20px;
    }

У типових умовах вертикального margin collapse відстань між блоками може становити:

    30px

а не:

    30px + 20px = 50px

Margin collapse залежить від структури документа та правил форматування.

Він не працює однаково в усіх ситуаціях: наприклад, Flexbox і Grid мають іншу модель розташування елементів.

Під час debugging перевір, чи не пояснюється несподіваний вертикальний відступ саме margin collapse.

---

# 5. Debugging Width і Height

Якщо елемент має неправильний розмір, перевір:

    width
    height
    min-width
    max-width
    min-height
    max-height
    padding
    border
    box-sizing
    overflow
    flex-basis
    grid-template-columns

Наприклад:

    .container {
        width: 100%;
        max-width: 1200px;
        margin-inline: auto;
    }

Це дозволяє контейнеру займати доступну ширину, але не перевищувати 1200px.

Проблемний варіант:

    .container {
        width: 1200px;
    }

На вузькому екрані такий контейнер може створювати горизонтальне прокручування.

---

## Відсоткова ширина

Приклад:

    .parent {
        width: 800px;
    }

    .child {
        width: 50%;
    }

За звичайної моделі ширини для такого блоку:

    parent width = 800px
    child width = 400px

Якщо ширина не відповідає очікуваній, перевір розмір containing block, а також `box-sizing`, padding і border.

Не всі відсоткові розміри обчислюються від ширини батьківського елемента: правила залежать від конкретної властивості.

---

# 6. Debugging Overflow

Overflow виникає, коли вміст виходить за межі доступної області елемента.

Основні значення:

    visible
    hidden
    clip
    scroll
    auto

Приклад:

    .container {
        width: 300px;
        overflow: hidden;
    }

Якщо текст або зображення більші за контейнер, частина вмісту може бути обрізана.

---

## Horizontal Overflow

Горизонтальне прокручування часто виникає через:

    фіксовану ширину
    надто широке зображення
    довгий нерозривний текст
    надто велику Grid-колонку
    елементи з flex-shrink: 0
    негативні margins
    абсолютне позиціонування
    завеликі відступи
    мінімальну ширину дочірніх елементів

Приклад:

    .container {
        width: 1200px;
    }

На мобільному viewport шириною 375px такий контейнер може виходити за межі видимої області.

Один із можливих варіантів:

    .container {
        width: 100%;
        max-width: 1200px;
        margin-inline: auto;
    }

Для зображень часто використовують:

    img {
        max-width: 100%;
        height: auto;
    }

Але не потрібно автоматично додавати `overflow-x: hidden` до всієї сторінки. Це може приховати симптом, не усунувши причину.

---

# 7. Debugging Flexbox

Flexbox використовується для розташування елементів уздовж головної та поперечної осей.

Основні властивості контейнера:

    display
    flex-direction
    flex-wrap
    justify-content
    align-items
    align-content
    gap

Основні властивості дочірніх елементів:

    flex-grow
    flex-shrink
    flex-basis
    flex
    align-self
    order

---

## Проблема 1 — align-items не працює

CSS:

    .container {
        display: flex;
        align-items: center;
    }

Якщо елементи не виглядають вертикально центрованими, перевір:

    flex-direction
    висоту контейнера
    розміри дочірніх елементів
    align-self
    інші CSS-правила

За замовчуванням `flex-direction: row`, тому `align-items` працює вздовж вертикальної поперечної осі.

Якщо встановлено:

    flex-direction: column;

то поперечна вісь стає горизонтальною.

---

## Проблема 2 — justify-content не працює

CSS:

    .container {
        display: flex;
        justify-content: center;
    }

Можливі причини неочікуваного результату:

    контейнер не є Flexbox-контейнером
    елементи займають увесь доступний простір
    дочірні елементи мають margins
    flex-grow розподіляє вільний простір
    напрямок осей не відповідає очікуванням

Перевір `display`, `flex-direction`, ширину контейнера та властивості дочірніх елементів.

---

## Проблема 3 — елементи не стискаються

Приклад:

    .item {
        flex-shrink: 0;
    }

Такі елементи не стискаються в межах звичайного алгоритму Flexbox, що може спричинити overflow.

Перевір:

    flex-shrink
    flex-basis
    min-width
    width
    white-space

У деяких випадках потрібно дозволити дочірньому елементу стискатися:

    .item {
        min-width: 0;
    }

Це часто корисно для елементів Flexbox, у яких довгий текст не дає контейнеру звузитися.

---

# 8. Debugging CSS Grid

Grid використовується для двовимірного layout.

Основні властивості:

    display
    grid-template-columns
    grid-template-rows
    grid-auto-columns
    grid-auto-rows
    grid-auto-flow
    gap
    justify-items
    align-items
    place-items
    grid-column
    grid-row

---

## Проблема 1 — колонки мають неправильну ширину

CSS:

    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }

Якщо Grid не поміщається в контейнер, перевір:

    ширину контейнера
    gap
    min-width дочірніх елементів
    довгий нерозривний контент
    фіксовані розміри колонок
    padding і border

У деяких випадках корисний шаблон:

    .grid {
        display: grid;
        grid-template-columns:
            repeat(3, minmax(0, 1fr));
        gap: 20px;
    }

`minmax(0, 1fr)` дозволяє трекам стискатися нижче автоматичного мінімального розміру, який може спричиняти переповнення.

---

## Проблема 2 — елемент займає неправильну колонку

Приклад:

    .item {
        grid-column: 1 / 3;
    }

Це розташовує елемент від першої до третьої лінії сітки, тобто він охоплює дві колонки, якщо між цими лініями є дві колонки.

Перевір:

    grid-column
    grid-row
    порядок елементів
    кількість ліній сітки
    grid-auto-flow

У DevTools можна ввімкнути Grid overlay, щоб краще побачити структуру сітки.

---

# 9. Debugging Positioning

Основні значення `position`:

    static
    relative
    absolute
    fixed
    sticky

Якщо елемент розташований не там, де очікується, перевір:

    position
    top
    right
    bottom
    left
    inset
    containing block
    transform
    margin
    overflow

---

## Absolute Positioning

HTML:

    <div class="card">
        <span class="badge">New</span>
    </div>

CSS:

    .card {
        position: relative;
    }

    .badge {
        position: absolute;
        top: 10px;
        right: 10px;
    }

Якщо `badge` розташований не там, де потрібно, перевір найближчий предок, який створює відповідний containing block.

Якщо `.card` не має `position: relative`, елемент може позиціонуватися відносно іншого предка.

---

## Fixed Positioning

CSS:

    .button {
        position: fixed;
        right: 20px;
        bottom: 20px;
    }

Зазвичай такий елемент позиціонується відносно viewport.

Проте деякі властивості предків, наприклад `transform`, можуть змінювати containing block для fixed-positioned елементів.

Якщо fixed-елемент поводиться неочікувано, перевір не лише його CSS, а й властивості предків.

---

## Sticky Positioning

CSS:

    .header {
        position: sticky;
        top: 0;
    }

Якщо `position: sticky` не працює, перевір:

    значення top або іншого inset
    висоту контейнера
    межі scroll container
    overflow предків
    напрямок прокручування
    розміри sticky-елемента

`position: sticky` не завжди прив'язується до viewport так, як `position: fixed`. Його поведінка залежить від відповідного scroll container та меж контейнера.

---

# 10. Debugging z-index

`z-index` впливає на порядок накладання елементів у відповідних контекстах.

Приклад:

    .modal {
        position: fixed;
        z-index: 1000;
    }

Якщо modal залишається позаду іншого елемента, потрібно перевірити:

    чи застосовується z-index
    чи створено stacking context
    який stacking context має предок
    чи не обмежує порядок накладання інший контекст
    чи не створює transform новий stacking context
    чи не впливають opacity або isolation

---

## Stacking Context

Stacking context — окремий контекст накладання елементів.

Його можуть створювати різні умови, зокрема:

    position разом із відповідним z-index
    position: fixed
    position: sticky
    transform, відмінний від none
    opacity менше 1
    isolation: isolate
    деякі значення contain
    деякі значення will-change

Точні умови залежать від CSS-властивості.

Приклад:

    .parent {
        position: relative;
        z-index: 1;
        transform: translateZ(0);
    }

    .child {
        position: absolute;
        z-index: 9999;
    }

Високий `z-index` дочірнього елемента не дозволяє йому автоматично перекривати елементи, які знаходяться вище в іншому stacking context.

Тому спочатку потрібно дослідити структуру контекстів накладання.

---

# 11. Debugging Pseudo-classes

Псевдокласи дозволяють застосовувати стилі залежно від стану елемента.

Приклади:

    :hover
    :active
    :focus
    :focus-visible
    :checked
    :disabled
    :valid
    :invalid
    :first-child
    :last-child
    :nth-child()

Якщо стилі не застосовуються, перевір:

    чи відповідає селектор елементу
    чи справді виконується умова псевдокласу
    чи не перекриває інше правило декларацію
    чи не впливає порядок правил
    чи правильно працює HTML-структура

---

## Debugging :hover

CSS:

    .button {
        background-color: blue;
    }

    .button:hover {
        background-color: red;
    }

Якщо фон не змінюється:

    1. Вибери кнопку в DevTools.
    2. Примусово активуй :hover.
    3. Перевір Styles.
    4. Перевір Computed.
    5. Знайди конфліктні декларації.

Так можна відрізнити проблему селектора від проблеми каскаду.

---

## Debugging :focus-visible

CSS:

    .button:focus-visible {
        outline: 3px solid orange;
        outline-offset: 3px;
    }

Перевір:

    чи отримує елемент фокус
    чи працює keyboard navigation
    чи не видаляється outline іншим правилом
    чи правильно вибрано селектор

Не прибирай видимий індикатор фокусу без доступної альтернативи.

---

# 12. Debugging Media Queries

Media queries дозволяють застосовувати CSS залежно від характеристик середовища.

Приклад:

    .container {
        padding: 32px;
    }

    @media (max-width: 600px) {
        .container {
            padding: 16px;
        }
    }

Якщо на мобільному пристрої padding не змінюється, перевір:

    фактичну ширину viewport
    media query
    правильність синтаксису
    порядок CSS-правил
    специфічність
    чи завантажився файл
    чи не перекриває декларацію інше правило

Для responsive debugging використовуй Device Toolbar.

---

## Viewport Meta Tag

Для типового адаптивного HTML-документа потрібно перевірити наявність:

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

Без правильно налаштованого viewport meta tag мобільний браузер може використовувати іншу ширину layout viewport, через що media queries поводитимуться не так, як очікується.

---

## Перевірка граничних значень

Припустимо:

    @media (max-width: 600px) {
        .card {
            padding: 12px;
        }
    }

Перевір ширини:

    1200px
    800px
    601px
    600px
    599px
    375px

Так можна знайти помилки на межі breakpoint.

У випадку однакових значень ширини потрібно враховувати, що умови `max-width` та `min-width` можуть одночасно збігатися з граничним значенням.

Якщо правила конфліктують, перевір їхню специфічність і порядок.

---

# 13. Debugging Typography

Якщо текст відображається неправильно, перевір:

    font-family
    font-size
    font-weight
    font-style
    line-height
    letter-spacing
    word-spacing
    text-align
    text-transform
    white-space
    overflow-wrap
    word-break

---

## Текст виходить за межі контейнера

CSS:

    .title {
        white-space: nowrap;
    }

Це забороняє звичайні переноси рядка, тому довгий заголовок може виходити за межі контейнера.

Можливий варіант:

    .title {
        white-space: normal;
        overflow-wrap: anywhere;
    }

Однак правильне рішення залежить від типу контенту та дизайну.

Для довгих URL або нерозривних рядків може бути потрібна окрема стратегія перенесення.

---

## Текст обрізається

Приклад:

    .description {
        height: 40px;
        overflow: hidden;
    }

Якщо текст займає більше місця, частина може бути обрізана.

Перевір:

    height
    max-height
    overflow
    line-height
    white-space
    line-clamp

Не потрібно збільшувати висоту навмання, доки не перевірено реальну причину обрізання.

---

# 14. Debugging Images

Якщо зображення виглядає неправильно, перевір:

    width
    height
    max-width
    object-fit
    object-position
    aspect-ratio
    overflow
    display
    URL ресурсу
    завантаження зображення

Приклад:

    img {
        max-width: 100%;
        height: auto;
    }

Це поширений базовий шаблон для адаптивних зображень.

---

## Зображення обрізається

CSS:

    .image {
        width: 100%;
        height: 250px;
        object-fit: cover;
    }

`object-fit: cover` заповнює область, зберігаючи пропорції зображення, але частина зображення може не потрапити у видиму область.

Якщо потрібно показати все зображення, можна перевірити:

    object-fit: contain;

У такому випадку можуть залишатися вільні області всередині контейнера.

---

# 15. Debugging CSS Custom Properties

CSS Custom Properties — змінні CSS, які зазвичай оголошуються з префіксом `--`.

Приклад:

    :root {
        --primary-color: #2563eb;
        --spacing: 16px;
    }

    .button {
        background-color: var(--primary-color);
        padding: var(--spacing);
    }

Якщо значення не застосовується, перевір:

    чи оголошена змінна
    чи доступна вона в потрібному scope
    чи правильно написана назва
    чи не перевизначено змінну
    чи не є значення невалідним для конкретної властивості

---

## Відсутня змінна

Приклад:

    .button {
        color: var(--text-color);
    }

Якщо `--text-color` не визначена в доступному scope і не задано fallback, декларація `color` може стати невалідною під час обчислення значення.

Варіант із fallback:

    .button {
        color: var(--text-color, #222);
    }

Fallback використовується, якщо змінна не має доступного значення або є недійсною для використання як custom property.

---

## Debugging Scope

CSS:

    :root {
        --primary-color: blue;
    }

    .card {
        --primary-color: green;
    }

    .button {
        color: var(--primary-color);
    }

Якщо `.button` знаходиться всередині `.card`, він може успадкувати значення `--primary-color: green`.

Якщо кнопка знаходиться поза `.card`, вона може використовувати значення з `:root`.

Під час debugging перевір не лише існування змінної, а й місце її оголошення та успадкування.

---

# 16. Debugging CSS Transitions та Animations

Якщо анімація не працює, перевір:

    transition-property
    transition-duration
    transition-delay
    transition-timing-function
    animation-name
    animation-duration
    animation-delay
    animation-iteration-count
    animation-fill-mode
    @keyframes

---

## Transition

Приклад:

    .button {
        background-color: blue;
        transition: background-color 200ms ease;
    }

    .button:hover {
        background-color: red;
    }

Якщо перехід не працює, перевір:

    чи змінюється відповідна властивість
    чи визначено transition
    чи правильно вказано властивість
    чи не встановлено duration: 0s
    чи не впливає prefers-reduced-motion

---

## Animation

Приклад:

    @keyframes fade-in {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    .card {
        animation: fade-in 500ms ease;
    }

Якщо анімація не запускається, перевір:

    назву keyframes
    animation-name
    animation-duration
    правильність синтаксису
    чи не перевизначено animation
    чи не закінчилася анімація до перевірки

Для доступності варто враховувати налаштування користувача:

    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            scroll-behavior: auto;
            animation-duration: 0.01ms;
            animation-iteration-count: 1;
            transition-duration: 0.01ms;
        }
    }

Цей приклад демонструє загальний підхід, але в реальному проєкті варто уникати надмірно широких правил і вибирати відповідні анімації конкретно для інтерфейсу.

---

# 17. Debugging CSS Grid і Flexbox через min-width

Поширена проблема в сучасних layout — елемент не хоче стискатися.

Приклад:

    .layout {
        display: flex;
        gap: 16px;
    }

    .content {
        flex: 1;
    }

    .sidebar {
        width: 250px;
    }

Якщо в `.content` є довгий текст, таблиця або інший широкий елемент, він може спричинити overflow.

Можливе виправлення:

    .content {
        flex: 1;
        min-width: 0;
    }

Для Grid:

    .layout {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 250px;
        gap: 16px;
    }

Ці рішення часто допомагають, але потрібно перевіряти конкретний контент і вимоги layout.

---

# 18. Debugging CSS Layers

Cascade layers дозволяють організовувати CSS-правила за шарами.

Приклад:

    @layer base, components, utilities;

    @layer base {
        h1 {
            color: black;
        }
    }

    @layer components {
        .title {
            color: blue;
        }
    }

    @layer utilities {
        .text-red {
            color: red;
        }
    }

Якщо колір не відповідає очікуванням, перевір:

    у якому layer знаходиться правило
    чи є правило поза шарами
    чи використовується !important
    порядок оголошення layers
    специфічність усередині відповідного шару

Важливо: для звичайних авторських декларацій правила поза шарами мають перевагу над звичайними деклараціями всередині авторських layers. Для `!important` порядок пріоритетів шарів змінюється.

Тому каскад не можна пояснювати лише специфічністю та порядком рядків.

---

# 19. Debugging Browser Compatibility

Іноді CSS працює в одному браузері, але відрізняється в іншому.

Можливі причини:

    підтримка CSS-властивості
    різні версії браузерів
    різна поведінка форм
    відмінності шрифтів
    особливості viewport
    префікси браузерних властивостей
    відмінності у rendering
    експериментальні можливості браузера

Що робити:

    1. Відтворити проблему в конкретному браузері.
    2. Перевірити версію браузера.
    3. Перевірити підтримку властивості.
    4. Створити мінімальний приклад.
    5. Перевірити CSS у DevTools.
    6. Перевірити необхідність Autoprefixer.
    7. Протестувати альтернативний підхід.
    8. Перевірити результат у цільових браузерах.

Не кожна відмінність між браузерами є помилкою CSS. Іноді це пов'язано з різними умовами rendering або підтримкою можливостей.

---

# 20. CSS Validation

CSS Validation — перевірка CSS на синтаксичні помилки та інші проблеми відповідно до правил CSS.

Валідація допомагає виявляти:

    неправильний синтаксис
    невідомі властивості
    некоректні значення
    помилки в правилах
    частину проблем із сумісністю

Але валідний CSS не обов'язково означає правильний дизайн.

Наприклад:

    .container {
        width: 1200px;
    }

Це може бути цілком валідний CSS, але для мобільного layout така ширина може бути невдалою.

Потрібно розрізняти:

    syntax correctness
    browser support
    layout correctness
    visual correctness
    accessibility
    performance

---

# 21. Мінімальний приклад для налагодження

Якщо складна сторінка поводиться неправильно, створи мінімальний відтворюваний приклад.

Це означає залишити лише HTML і CSS, необхідні для відтворення проблеми.

Наприклад, замість великого проєкту:

    <div class="container">
        <div class="card">Card</div>
    </div>

    .container {
        display: flex;
        justify-content: center;
    }

    .card {
        width: 300px;
        margin-left: 100px;
    }

У мінімальному прикладі простіше побачити, що картку зміщує `margin-left`.

Переваги:

    менше сторонніх правил
    легше відстежити каскад
    простіше знайти причину
    легше перевірити альтернативні рішення
    простіше пояснити проблему іншому розробнику

Мінімальний приклад особливо корисний для складних проблем Flexbox, Grid, псевдокласів і media queries.

---

# 22. Debugging через тимчасові контури

Один зі способів дослідити розміри елементів — тимчасово додати контур.

Приклад:

    * {
        outline: 1px solid red;
    }

Це допомагає побачити межі елементів, але потрібно пам'ятати:

- `outline` не займає місця в Box Model;
- селектор `*` застосовується до багатьох елементів і може створити візуальний шум;
- такий прийом не пояснює автоматично причину overflow;
- правило потрібно видалити після діагностики.

Іноді краще обмежити правило одним контейнером:

    .container,
    .container * {
        outline: 1px solid red;
    }

Це полегшує дослідження локальної структури.

Для точнішої перевірки використовуй Box Model і computed dimensions у DevTools.

---

# 23. Debugging із background colors

Тимчасові фонові кольори допомагають визначити межі контейнерів.

Наприклад:

    .container {
        background-color: lightblue;
    }

    .card {
        background-color: lightyellow;
    }

    .content {
        background-color: lightpink;
    }

Якщо елементи візуально накладаються або займають неочікуваний простір, тимчасові фони допомагають побачити:

    розмір контейнера
    межі дочірніх елементів
    вільний простір
    overflow
    структуру layout

Це допоміжний метод, а не заміна перевірки CSS-властивостей.

---

# 24. Debugging через Console

Console корисна, коли потрібно перевірити елемент або його обчислені стилі.

Приклад:

    const element = document.querySelector(".card");

    console.log(element);

Якщо результат:

    null

елемент не знайдено за цим селектором у поточному DOM.

Перевір назву класу, HTML-структуру та момент виконання коду.

---

## getComputedStyle()

    const element = document.querySelector(".card");

    if (element) {
        const styles = getComputedStyle(element);

        console.log(styles.display);
        console.log(styles.width);
        console.log(styles.height);
        console.log(styles.color);
    }

Це дозволяє перевірити обчислені значення CSS через JavaScript.

---

## getBoundingClientRect()

`getBoundingClientRect()` повертає розміри та координати елемента відносно viewport.

Приклад:

    const element = document.querySelector(".card");

    if (element) {
        const rect = element.getBoundingClientRect();

        console.log(rect.width);
        console.log(rect.height);
        console.log(rect.top);
        console.log(rect.left);
        console.log(rect.right);
        console.log(rect.bottom);
    }

Це корисно для дослідження:

    фактичного розташування елемента
    видимих розмірів
    переповнення
    відстані до viewport
    взаємного розташування блоків

Важливо: значення `getBoundingClientRect()` можуть враховувати CSS transforms і залежать від поточного layout та прокручування сторінки.

---

# 25. Debugging за допомогою Network

Якщо стилі взагалі не застосовуються, проблема може бути не в самих CSS-деклараціях.

Перевір:

    чи завантажується CSS-файл
    чи правильний URL
    чи немає HTTP 404
    чи немає помилки сервера
    чи не повертається неправильний вміст
    чи немає проблем із кешуванням
    чи відповідає MIME type очікуваному типу ресурсу

Приклад:

    <link rel="stylesheet" href="/styles.css">

Якщо фактичний файл розташований в іншому місці, браузер може не знайти його.

У Network перевір Request URL і HTTP status.

Не варто починати змінювати CSS-селектори, доки не підтверджено, що браузер завантажує потрібний файл.

---

# 26. Debugging Production CSS

У production build CSS може бути:

    об'єднаний
    мінімізований
    розділений на chunks
    оптимізований
    перейменований
    згенерований build-інструментом

Через це вихідний CSS може відрізнятися від того, що видно в DevTools.

Під час діагностики production-проблем перевір:

    завантаження CSS chunks
    правильність URL
    помилки Network
    відповідність build-файлів
    source maps, якщо доступні
    кешування
    порядок підключення стилів
    відмінності development і production

Якщо проблема виникає лише в production, потрібно перевіряти саме production build, а не робити висновки лише на основі локального development-середовища.

---

# 27. Cross-browser Debugging

Cross-browser debugging — перевірка та виправлення проблем у різних браузерах.

Наприклад, сторінка може виглядати по-різному в:

    Chrome
    Firefox
    Safari
    Edge

Порядок перевірки:

    1. Визначити браузер, де виникає проблема.
    2. Перевірити версію браузера.
    3. Відкрити DevTools.
    4. Перевірити завантаження CSS.
    5. Перевірити computed styles.
    6. Перевірити підтримку потрібної властивості.
    7. Створити мінімальний приклад.
    8. Вибрати сумісне рішення.
    9. Перевірити інші браузери.

Не варто відразу створювати окремі CSS-правила для кожного браузера. Спочатку потрібно визначити, чи справді проблема спричинена відмінностями підтримки.

---

# 28. CSS Debugging Checklist

Коли CSS працює неправильно, перевір послідовно.

## HTML

    [ ] Чи існує потрібний елемент?
    [ ] Чи правильні class та id?
    [ ] Чи правильна вкладеність?
    [ ] Чи не змінює DOM JavaScript?

## CSS Loading

    [ ] Чи завантажено CSS-файл?
    [ ] Чи правильний шлях до файлу?
    [ ] Чи немає помилки 404?
    [ ] Чи не використовується застарілий кешований файл?

## CSS Rules

    [ ] Чи відповідає селектор елементу?
    [ ] Чи правильна назва властивості?
    [ ] Чи правильне значення?
    [ ] Чи немає синтаксичної помилки?
    [ ] Чи не перекриває інше правило потрібну декларацію?
    [ ] Чи не впливають !important або cascade layers?

## Layout

    [ ] Чи правильний display?
    [ ] Чи правильні width і height?
    [ ] Чи правильні padding і margin?
    [ ] Чи правильний box-sizing?
    [ ] Чи немає overflow?
    [ ] Чи правильно працюють Flexbox або Grid?
    [ ] Чи правильно працює position?
    [ ] Чи не створює stacking context проблему з накладанням?

## Responsive

    [ ] Чи перевірено різні viewport?
    [ ] Чи працюють media queries?
    [ ] Чи немає горизонтального прокручування?
    [ ] Чи не використовуються невдалі фіксовані ширини?
    [ ] Чи правильно відображаються текст і зображення?

## Final Verification

    [ ] Чи знайдено першопричину?
    [ ] Чи виправлено вихідний файл?
    [ ] Чи зберігається правильний вигляд на інших екранах?
    [ ] Чи не з'явилися нові помилки?
    [ ] Чи перевірено результат повторно?

---

# Практичні приклади

## Приклад 1 — CSS-властивість не працює

HTML:

    <div class="card">
        Hello
    </div>

CSS:

    .card {
        background-color: blue;
        color: white;
        padding: 20;
    }

Проблема:

    padding: 20;

Для довжини padding потрібне допустиме значення, наприклад `20px`.

Правильно:

    .card {
        background-color: blue;
        color: white;
        padding: 20px;
    }

Алгоритм:

    1. Вибрати .card у DevTools.
    2. Перевірити Styles.
    3. Знайти неправильну декларацію.
    4. Виправити значення.
    5. Перевірити Box Model.

---

## Приклад 2 — неправильний селектор

HTML:

    <h1 class="page-title">
        Welcome
    </h1>

CSS:

    .pageTitle {
        color: blue;
    }

Проблема:

    page-title ≠ pageTitle

Правильно:

    .page-title {
        color: blue;
    }

Важливо: назви класів — це рядки, які мають точно збігатися із селекторами.

---

## Приклад 3 — конфлікт специфічності

CSS:

    h1 {
        color: red;
    }

    .title {
        color: blue;
    }

    #main-title {
        color: green;
    }

HTML:

    <h1 id="main-title" class="title">
        Welcome
    </h1>

Результат:

    color: green

Причина:

    #main-title має більшу специфічність

Завдання:

    1. Вибрати h1 у DevTools.
    2. Знайти всі три правила.
    3. Перевірити перекреслені декларації.
    4. Тимчасово вимкнути правило з id.
    5. Поспостерігати за зміною кольору.

---

## Приклад 4 — блок ширший за контейнер

CSS:

    .container {
        width: 100%;
        max-width: 800px;
        padding: 20px;
    }

За стандартного `content-box` загальна ширина може перевищити 800px, оскільки padding додається до content width.

Можливе виправлення:

    .container {
        width: 100%;
        max-width: 800px;
        padding: 20px;
        box-sizing: border-box;
    }

Або глобальний підхід:

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

Перевір результат через Computed і Box Model.

---

## Приклад 5 — Flexbox не центрує елемент

CSS:

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card {
        width: 300px;
    }

Якщо картка не розташована по центру по вертикалі, перевір висоту контейнера.

Наприклад:

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

Тепер контейнер має мінімальну висоту viewport, і вертикальне центрування стає помітним.

---

## Приклад 6 — Grid створює overflow

CSS:

    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }

Якщо одна з колонок має широкий нерозривний вміст, сітка може виходити за межі контейнера.

Спробуй:

    .grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 20px;
    }

Також перевір:

    min-width
    overflow-wrap
    ширину зображень
    фіксовані розміри дочірніх елементів

---

## Приклад 7 — z-index не працює

CSS:

    .parent {
        position: relative;
        z-index: 1;
        transform: translateZ(0);
    }

    .child {
        position: absolute;
        z-index: 9999;
    }

Якщо `.child` перекривається елементом з іншого stacking context, збільшення його `z-index` може не допомогти.

Потрібно перевірити:

    stacking context предка
    stacking context сусідніх елементів
    transform
    position
    z-index

Не збільшуй `z-index` навмання.

---

## Приклад 8 — media query не спрацьовує

CSS:

    .card {
        padding: 32px;
    }

    @media (max-width: 600px) {
        .card {
            padding: 12px;
        }
    }

Якщо padding не змінюється на мобільному екрані, перевір:

    фактичну ширину viewport
    viewport meta tag
    CSS-файл
    порядок правил
    специфічність
    інші декларації padding

Використай Device Toolbar, щоб перевірити ширину 601px, 600px і 599px.

---

## Приклад 9 — текст не переноситься

CSS:

    .title {
        white-space: nowrap;
    }

Проблема: довгий заголовок може виходити за межі контейнера.

Можливе рішення:

    .title {
        white-space: normal;
        overflow-wrap: anywhere;
    }

Після зміни перевір різні ширини viewport і переконайся, що перенесення відповідає дизайну.

---

## Приклад 10 — зображення обрізається

CSS:

    .image {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

Якщо важлива вся площа зображення, перевір:

    object-fit: contain;

Якщо важливо заповнити контейнер без порожніх областей, `cover` може бути правильним рішенням.

Вибір залежить від того, чи важливіше зберегти весь вміст зображення, чи заповнити задану область.

---

# Типові помилки під час CSS Debugging

❌ Виправляти CSS навмання.

Краще спочатку визначити, яка саме властивість спричиняє проблему.

---

❌ Додавати `!important` до кожного правила, яке не працює.

Це ускладнює каскад і може створювати нові конфлікти.

---

❌ Змінювати багато властивостей одночасно.

Якщо змінити `width`, `margin`, `position` і `display` одночасно, важко зрозуміти, яка зміна допомогла.

---

❌ Ігнорувати батьківські елементи.

Проблема може виникати через розміри або layout контейнера, а не через сам дочірній елемент.

---

❌ Використовувати фіксовані ширини без перевірки адаптивності.

Наприклад:

    width: 1200px;

може спричинити overflow на мобільних пристроях.

---

❌ Вважати, що великий `z-index` вирішує будь-яку проблему накладання.

Спочатку потрібно дослідити stacking contexts.

---

❌ Приховувати overflow без розуміння причини.

    overflow-x: hidden;

може приховати проблему, але водночас обрізати важливий контент.

---

❌ Перевіряти лише один viewport.

Потрібно тестувати різні ширини та граничні значення breakpoint.

---

❌ Вважати, що валідний CSS обов'язково має правильний вигляд.

Синтаксично правильні декларації теж можуть створювати невдалий layout.

---

❌ Не переносити виправлення у вихідний файл.

Тимчасові зміни в DevTools можуть зникнути після перезавантаження сторінки.

---

❌ Не перевіряти сторінку після виправлення.

Зміна CSS може вплинути на інші елементи або адаптивні стани.

---

# Практичний процес: від помилки до виправлення

Припустимо, картка виходить за межі мобільного екрана.

## Крок 1 — відтворити проблему

Відкрий сторінку у браузері та встанови viewport, на якому проблема виникає.

## Крок 2 — знайти елемент

Використай Inspect Element і вибери картку.

## Крок 3 — перевірити Computed

Знайди:

    width
    min-width
    max-width
    padding
    border
    margin
    box-sizing

## Крок 4 — перевірити батьківський контейнер

Досліди:

    width
    display
    grid-template-columns
    flex-basis
    gap
    overflow

## Крок 5 — сформулювати гіпотезу

Наприклад:

    Картка не стискається через min-width.

## Крок 6 — перевірити гіпотезу

Тимчасово зміни:

    min-width: 0;

Якщо результат покращився, гіпотеза може бути правильною. Але потрібно також перевірити, чи немає інших причин overflow.

## Крок 7 — виправити вихідний файл

Перенеси потрібну зміну у CSS-файл.

## Крок 8 — перевірити результат

Перевір:

    мобільний viewport
    планшетний viewport
    desktop viewport
    довгий текст
    зображення
    сусідні компоненти

Цей процес набагато надійніший, ніж додавання випадкових CSS-декларацій.

---

# Питання зі співбесіди

Що таке CSS Debugging?

Які найпоширеніші причини CSS-помилок?

Як перевірити, чому CSS-властивість не застосовується?

Що таке CSS declaration?

Що таке selector mismatch?

Що таке invalid CSS value?

Як DevTools допомагає налагоджувати CSS?

Чим Styles відрізняється від Computed?

Що означає перекреслена CSS-декларація?

Що таке CSS specificity?

Як працює CSS cascade?

Як source order впливає на результат?

Як cascade layers впливають на пріоритет CSS-правил?

Чому не варто надмірно використовувати `!important`?

Що таке CSS inheritance?

Які властивості зазвичай успадковуються?

Що таке Box Model?

Чим `content-box` відрізняється від `border-box`?

Що таке margin collapse?

Чому виникає горизонтальне прокручування?

Як знайти елемент, який виходить за межі viewport?

Як налагоджувати Flexbox?

Як налагоджувати Grid?

Для чого потрібен `min-width: 0`?

Чому `align-items` може не давати очікуваного результату?

Чому `justify-content` може не давати видимого ефекту?

Що таке containing block?

Як налагоджувати `position: absolute`?

Чому `position: sticky` може не працювати?

Що таке stacking context?

Чому великий `z-index` не завжди допомагає?

Як перевірити `:hover` через DevTools?

Як налагоджувати media queries?

Що таке viewport?

Для чого потрібен viewport meta tag?

Як перевірити проблеми з текстом і шрифтами?

Як налагоджувати CSS Custom Properties?

Як перевірити завантаження CSS-файлу?

Що таке CSS Validation?

Що таке мінімальний відтворюваний приклад?

Чому важливо перевіряти сторінку в різних браузерах?

Чим CSS Debugging відрізняється від CSS Optimization?

Як перевірити, що виправлення не спричинило регресію?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке CSS Debugging.

Як користуватися DevTools.

Inspect Element.

Elements.

Styles.

Computed.

CSS Syntax Errors.

Selector Mismatch.

CSS Specificity.

CSS Cascade.

Inheritance.

Source Order.

Box Model.

`box-sizing`.

`width` і `height`.

`padding` і `margin`.

Overflow.

Основи Flexbox Debugging.

Основи Grid Debugging.

Основи Positioning Debugging.

Основи `z-index`.

Перевірка `:hover`.

Перевірка media queries.

Responsive Debugging.

Перевірка завантаження CSS.

Систематичний пошук причин помилки.

---

## 🔵 Junior

Визначення причини конфлікту CSS-правил.

Розуміння каскаду та специфічності.

Розуміння успадкування.

Margin Collapse.

Debugging Box Model.

Debugging Flexbox.

Debugging Grid.

Debugging `min-width` і `min-height`.

Debugging Overflow.

Debugging Absolute Positioning.

Debugging Sticky Positioning.

Stacking Contexts.

Debugging псевдокласів.

Debugging CSS Custom Properties.

Debugging Typography.

Debugging Images.

Debugging Transitions та Animations.

Перевірка media queries на граничних значеннях.

Використання `getComputedStyle()`.

Використання `getBoundingClientRect()`.

CSS Validation.

Cross-browser Debugging.

Створення мінімального відтворюваного прикладу.

Regression Testing після виправлення.

---

## 🟠 Middle

Глибоке розуміння CSS Cascade.

Cascade Layers.

Складні проблеми Flexbox і Grid.

Складні stacking contexts.

Діагностика containing blocks.

Проблеми складних responsive layouts.

Debugging production CSS.

Source Maps.

Аналіз CSS, згенерованого build-інструментами.

Дослідження browser rendering.

Аналіз проблем, пов'язаних із layout та painting.

Debugging CSS у великих компонентах.

Аналіз CSS-in-JS та CSS Modules у відповідних проєктах.

Дослідження взаємодії CSS із JavaScript.

Комплексне тестування різних браузерів.

Систематизація CSS-правил після виправлення.

Виявлення першопричини замість виправлення симптомів.

---

## 🔴 Senior

Складна діагностика browser rendering.

Глибоке розуміння cascade origins, importance та layers.

Аналіз складних layout dependencies.

Debugging великих CSS codebases.

Дослідження специфічних браузерних проблем.

Аналіз rendering bottlenecks.

Комплексна діагностика production-only bugs.

Побудова стратегій regression testing.

CSS Architecture Debugging.

Діагностика складних дизайн-систем.

Автоматизація перевірок CSS.

Аналіз ризиків глобальних CSS-змін.

Створення відтворюваних bug reports.

Пріоритизація проблем за впливом на користувача.

Оцінка компромісів між сумісністю, підтримуваністю та складністю CSS.

---

# Міні-шпаргалка

## CSS не працює

    Check selector
        ↓
    Check syntax
        ↓
    Check value
        ↓
    Check cascade
        ↓
    Check computed style
        ↓
    Check layout

## Specificity

    ID selector
        ↓
    Class / attribute / pseudo-class
        ↓
    Element / pseudo-element

Це лише спрощена модель специфічності. Перед її застосуванням потрібно враховувати cascade origin, importance та layers.

## Box Model

    content
        ↓
    padding
        ↓
    border
        ↓
    margin

## Flexbox

    Container:
        display
        flex-direction
        justify-content
        align-items
        gap

    Items:
        flex
        flex-grow
        flex-shrink
        flex-basis
        align-self

## Grid

    display
    grid-template-columns
    grid-template-rows
    gap
    grid-column
    grid-row
    minmax()

## Overflow

    Check:
        width
        min-width
        padding
        border
        flex-shrink
        grid tracks
        long text
        images
        position

## Positioning

    Check:
        position
        inset
        containing block
        transform
        overflow
        stacking context

## z-index

    z-index
        ↓
    stacking context
        ↓
    stacking order

Велике значення `z-index` не гарантує, що елемент буде поверх усіх інших елементів сторінки.

## Media Queries

    Check:
        viewport
        viewport meta tag
        breakpoint
        cascade
        specificity
        source order

## CSS Variables

    Check:
        declaration
        scope
        inheritance
        spelling
        fallback
        valid value

## Основний алгоритм

    Reproduce
        ↓
    Inspect
        ↓
    Diagnose
        ↓
    Test
        ↓
    Fix
        ↓
    Verify
        ↓
    Regression test

---

# Головне

• CSS Debugging — це систематичний пошук причини неправильного відображення вебсторінки.

• Починай із відтворення проблеми та визначення конкретного елемента.

• Якщо властивість не працює, перевір селектор, синтаксис, значення, каскад і Computed Styles.

• Не плутай синтаксичні помилки з проблемами layout.

• Box Model допомагає пояснити несподівані розміри елементів.

• Flexbox і Grid потрібно налагоджувати з урахуванням властивостей контейнера та його дочірніх елементів.

• Overflow часто виникає через фіксовані розміри, мінімальні розміри, довгий контент або неправильні налаштування layout.

• Для діагностики `z-index` необхідно розуміти stacking contexts.

• Media queries потрібно перевіряти на різних ширинах viewport.

• CSS Custom Properties можуть залежати від scope та успадкування.

• Якщо CSS-файл не завантажується, потрібно спочатку перевірити Network, а не змінювати селектори навмання.

• Мінімальний відтворюваний приклад допомагає ізолювати проблему від складної структури проєкту.

• Зміни, зроблені в DevTools, потрібно переносити у вихідні файли.

• Після виправлення потрібно перевірити сторінку на різних розмірах екрана та переконатися, що не виникли нові помилки.

• Не використовуй `!important`, довільні margins, величезні `z-index` або `overflow: hidden` як універсальні засоби виправлення.

• Головний принцип налагодження:

    Не вгадуй причину.
    Спостерігай.
    Перевіряй.
    Формулюй гіпотезу.
    Тестуй одну зміну.
    Виправляй першопричину.
    Перевіряй результат.

• Хороший CSS Debugging робить код зрозумілішим, адаптивнішим і простішим у підтримці.