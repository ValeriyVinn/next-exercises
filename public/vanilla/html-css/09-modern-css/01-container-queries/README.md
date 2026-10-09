# 01. Container Queries

Container Queries (контейнерні запити) — це сучасна можливість CSS, яка дозволяє змінювати стилі елемента залежно від розміру його контейнера, а не всього viewport (вікна браузера).

Container Queries особливо корисні для створення адаптивних компонентів, які можуть використовуватися в різних частинах сайту.

Наприклад, одна й та сама картка може відображатися:

- у вузькій колонці — вертикально;
- у широкій колонці — горизонтально;
- у sidebar — компактно;
- у великому основному блоці — з додатковими елементами.

Основна ідея:

    Media Queries
        → реагують на характеристики viewport

    Container Queries
        → реагують на характеристики контейнера

Container Queries належать до Modern CSS і доповнюють традиційний Responsive Design.

---

## Ключові поняття

✔ Container Queries
✔ Container
✔ Container context
✔ Query container
✔ `container-type`
✔ `container-name`
✔ `container`
✔ `@container`
✔ `inline-size`
✔ `size`
✔ `normal`
✔ `container-type: inline-size`
✔ `container-type: size`
✔ `container-type: normal`
✔ `container-name`
✔ Named container
✔ Anonymous container
✔ Container size
✔ Container-relative design
✔ Component-based responsive design
✔ `cqw`
✔ `cqh`
✔ `cqi`
✔ `cqb`
✔ `cqmin`
✔ `cqmax`
✔ Container query units
✔ `@media`
✔ Media Queries vs Container Queries
✔ CSS containment
✔ Intrinsic sizing
✔ Progressive enhancement
✔ Fallback
✔ Responsive components

---

## Що потрібно пам'ятати

• Container Queries дозволяють змінювати стилі залежно від розміру контейнера.

• Media Queries зазвичай використовуються для адаптації сторінки до viewport.

• Container Queries використовуються для адаптації компонентів до доступного простору.

• Щоб застосувати size-based Container Query, потрібно визначити query container за допомогою `container-type`.

• `container-type: inline-size` створює контекст запитів за розміром inline axis. У горизонтальному письмі це зазвичай ширина.

• `container-type: size` дозволяє виконувати запити за обома вимірами контейнера, але створює додаткові обмеження щодо його розмірів.

• `container-name` дозволяє назвати контейнер, щоб звертатися до нього в `@container`.

• `container` — shorthand-властивість для `container-name` і `container-type`.

• `@container` визначає правила, які застосовуються, коли контейнер відповідає заданій умові.

• Контейнер і елемент, стилі якого залежать від нього, зазвичай є різними елементами DOM.

• Якщо потрібного query container немає, відповідне правило `@container` не застосовується.

• Container Queries не замінюють Media Queries. Обидва механізми вирішують різні завдання.

• Container-relative units дозволяють задавати розміри відносно query container.

• Контейнерні запити особливо корисні для reusable components — компонентів, які повторно використовуються в різних місцях інтерфейсу.

---

# Container Queries

Container Query — це CSS-запит, який перевіряє характеристики контейнера і застосовує стилі, якщо умова виконується.

Наприклад, картка може змінити розташування зображення і тексту залежно від ширини батьківського контейнера.

    .card-container {
        container-type: inline-size;
    }

    .card {
        display: grid;
        gap: 1rem;
    }

    @container (min-width: 500px) {
        .card {
            grid-template-columns: 200px 1fr;
            align-items: center;
        }
    }

Тут:

    .card-container
        → query container

    .card
        → елемент, стилі якого змінюються

    @container (min-width: 500px)
        → умова для застосування стилів

Якщо ширина query container становить щонайменше `500px`, картка отримує двоколонкове компонування.

Якщо контейнер вужчий, картка залишається одноколонковою.

---

# Навіщо потрібні Container Queries

Розглянемо типову проблему.

На сторінці є картка товару:

    .product-card {
        display: grid;
        grid-template-columns: 1fr;
    }

Припустімо, ми хочемо зробити її горизонтальною на широких екранах.

За допомогою Media Query:

    @media (min-width: 768px) {
        .product-card {
            grid-template-columns: 200px 1fr;
        }
    }

Але картка може знаходитися не на всю ширину екрана.

Наприклад:

    Desktop viewport
        ↓
    Main content + Sidebar
        ↓
    Product card inside Main content

Навіть якщо viewport широкий, картка всередині вузької колонки може не мати достатньо місця для горизонтального компонування.

Media Query перевіряє viewport, а не ширину самої картки або її батьківського контейнера.

Container Query розв'язує цю проблему:

    .product-list {
        container-type: inline-size;
    }

    .product-card {
        display: grid;
        grid-template-columns: 1fr;
    }

    @container (min-width: 600px) {
        .product-card {
            grid-template-columns: 220px 1fr;
        }
    }

Тепер картка адаптується до ширини свого query container.

---

# Query Container

Query container — це елемент, характеристики якого можуть перевірятися через Container Queries.

Для size-based запитів контейнер створюється за допомогою властивості `container-type`.

    .container {
        container-type: inline-size;
    }

Тепер дочірні елементи можуть використовувати запити, що перевіряють inline size цього контейнера.

Важливо:

    Parent
        ↓
    Query container
        ↓
    Child component

Правило `@container` застосовується до елементів усередині відповідного контейнера, а не до самого контейнера на підставі його власного розміру.

Наприклад:

    .wrapper {
        container-type: inline-size;
    }

    .item {
        padding: 1rem;
    }

    @container (min-width: 400px) {
        .item {
            padding: 2rem;
        }
    }

Якщо ширина `.wrapper` становить щонайменше `400px`, padding дочірнього `.item` збільшується.

---

# container-type

`container-type` визначає тип контейнерного контексту.

Основні значення:

    normal
    inline-size
    size

## normal

`normal` — стандартне значення.

    .container {
        container-type: normal;
    }

За замовчуванням елемент не створює size query container для запитів на основі розмірів.

При цьому контейнер із `container-type: normal` може використовуватися для певних style queries, наприклад для перевірки custom properties, якщо відповідний синтаксис і можливості підтримуються браузером.

## inline-size

`inline-size` дозволяє виконувати запити за inline size контейнера.

    .container {
        container-type: inline-size;
    }

У звичайному горизонтальному письмі:

    inline-size
        → ширина

Це найпоширеніший варіант для адаптивних компонентів.

Приклад:

    .card-list {
        container-type: inline-size;
    }

    .card {
        display: flex;
        flex-direction: column;
    }

    @container (min-width: 600px) {
        .card {
            flex-direction: row;
        }
    }

Перевага `inline-size` полягає в тому, що висота контейнера не повинна бути зафіксована для виконання запиту за шириною.

Водночас створення такого контейнера впливає на правила intrinsic sizing, тому іноді потрібно додатково перевіряти поведінку розмірів у конкретному layout.

## size

`size` дозволяє виконувати запити за обома вимірами контейнера:

    inline-size
    block-size

У горизонтальному письмі це зазвичай ширина та висота.

    .container {
        container-type: size;
    }

Цей варіант корисний, коли потрібно перевіряти і ширину, і висоту контейнера.

Однак `container-type: size` створює size containment для обох вимірів, що може впливати на intrinsic sizing контейнера.

Тому його не варто використовувати автоматично замість `inline-size`.

## Порівняння

    normal
        → немає size query container

    inline-size
        → запити за inline size

    size
        → запити за inline size і block size

Для більшості адаптивних UI-компонентів починай із:

    container-type: inline-size;

---

# container-name

`container-name` задає ім'я контейнера.

Це корисно, коли в DOM є кілька контейнерів і потрібно звертатися до конкретного з них.

    .card-list {
        container-name: cards;
        container-type: inline-size;
    }

Тепер можна використовувати ім'я `cards`:

    @container cards (min-width: 600px) {
        .card {
            grid-template-columns: 200px 1fr;
        }
    }

Тут:

    cards
        → ім'я query container

    min-width: 600px
        → умова запиту

Назва контейнера — це ідентифікатор, а не CSS-селектор.

Правильно:

    @container cards (min-width: 600px) {
        ...
    }

Неправильно:

    @container .cards (min-width: 600px) {
        ...
    }

Якщо `container-name` не задано, контейнер може бути анонімним і використовуватися в неназваних запитах.

---

# Named Containers

Named Container — контейнер, якому задано ім'я через `container-name` або shorthand `container`.

Приклад:

    .sidebar {
        container-name: sidebar;
        container-type: inline-size;
    }

    @container sidebar (min-width: 300px) {
        .sidebar-card {
            font-size: 1.125rem;
        }
    }

Ім'я допомагає уникнути неоднозначності в складних компонуваннях.

Наприклад, на сторінці можуть бути:

    main
        → container-name: content

    aside
        → container-name: sidebar

    section
        → container-name: cards

Тоді правила можна пов'язати з відповідними контейнерами:

    @container content (min-width: 700px) {
        ...
    }

    @container sidebar (min-width: 300px) {
        ...
    }

    @container cards (min-width: 500px) {
        ...
    }

Якщо запит містить ім'я контейнера, браузер шукає відповідний контейнер серед предків елемента.

Якщо найближчий контейнер не має потрібного імені, браузер може шукати далі вгору по DOM.

---

# container — Shorthand

`container` — скорочений запис для `container-name` і `container-type`.

Наприклад:

    .card-list {
        container: cards / inline-size;
    }

Це еквівалентно:

    .card-list {
        container-name: cards;
        container-type: inline-size;
    }

Інший приклад:

    .layout {
        container: layout / inline-size;
    }

Після цього:

    @container layout (min-width: 700px) {
        ...
    }

Загальний синтаксис:

    container: <container-name> / <container-type>;

Зверни увагу: `container` не встановлює довільний breakpoint і не визначає розміри контейнера. Він лише задає ім'я та тип контейнерного контексту.

---

# @container

`@container` — at-rule, яка дозволяє застосовувати CSS-правила залежно від умов контейнера.

Базовий синтаксис:

    @container (min-width: 500px) {
        .card {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
    }

Іменований запит:

    @container cards (min-width: 500px) {
        .card {
            grid-template-columns: 1fr 1fr;
        }
    }

Можна використовувати різні умови:

    @container (min-width: 500px) {
        ...
    }

    @container (max-width: 400px) {
        ...
    }

    @container (width > 500px) {
        ...
    }

    @container (width >= 500px) {
        ...
    }

Останні два приклади використовують range syntax.

Для базового рівня корисно починати з `min-width` і `max-width`, а потім вивчати сучасний range syntax.

---

# Min-width та Max-width

Container Queries можуть використовувати умови розміру.

## min-width

Правило застосовується, коли ширина контейнера не менша за задану.

    .container {
        container-type: inline-size;
    }

    @container (min-width: 600px) {
        .card {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
    }

Логіка:

    width < 600px
        → правило не застосовується

    width >= 600px
        → правило застосовується

## max-width

Правило застосовується, коли ширина контейнера не перевищує задану межу.

    @container (max-width: 400px) {
        .card-title {
            font-size: 1rem;
        }
    }

Логіка:

    width <= 400px
        → правило застосовується

    width > 400px
        → правило не застосовується

## Range syntax

Сучасний синтаксис дозволяє записувати умови без `min-` і `max-`.

    @container (width >= 600px) {
        .card {
            grid-template-columns: 1fr 1fr;
        }
    }

Або:

    @container (width < 400px) {
        .card {
            padding: 0.75rem;
        }
    }

У range syntax оператори мають чітке математичне значення:

    >   → більше
    <   → менше
    >=  → більше або дорівнює
    <=  → менше або дорівнює

Важливо: `min-width: 600px` включає ширину `600px`, так само як `width >= 600px`.

---

# Приклад — Responsive Card

HTML:

    <div class="card-container">
        <article class="card">
            <img
                class="card-image"
                src="photo.jpg"
                alt="Mountain landscape"
            >

            <div class="card-content">
                <h2>Mountain Trip</h2>
                <p>
                    Explore beautiful mountain landscapes.
                </p>
                <a href="#">Read more</a>
            </div>
        </article>
    </div>

CSS:

    .card-container {
        container-type: inline-size;
    }

    .card {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 1rem;
    }

    .card-image {
        display: block;
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        border-radius: 0.5rem;
    }

    @container (min-width: 500px) {
        .card {
            grid-template-columns: 200px 1fr;
            align-items: center;
        }
    }

Результат:

    Вузький контейнер
        → зображення зверху
        → текст знизу

    Широкий контейнер
        → зображення зліва
        → текст справа

Головна перевага: компонент сам адаптується до доступної ширини, незалежно від того, де його розміщено.

---

# Container Queries vs Media Queries

Це одна з найважливіших тем Modern CSS.

## Media Queries

Media Query перевіряє характеристики середовища відображення, найчастіше viewport.

    @media (min-width: 768px) {
        .layout {
            grid-template-columns: 1fr 1fr;
        }
    }

Застосування:

    → адаптація загального layout сторінки
    → кількість колонок сторінки
    → навігація
    → глобальні зміни інтерфейсу

## Container Queries

Container Query перевіряє характеристики query container.

    .content {
        container-type: inline-size;
    }

    @container (min-width: 500px) {
        .card {
            grid-template-columns: 200px 1fr;
        }
    }

Застосування:

    → адаптація окремої картки
    → reusable components
    → компоненти в sidebar
    → компоненти у grid
    → віджети та панелі
    → компоненти в різних layout

## Головна різниця

    @media
        → умови viewport / media environment

    @container
        → умови відповідного контейнера

Ці механізми можуть використовуватися разом.

Наприклад:

    @media (prefers-reduced-motion: reduce) {
        .card {
            animation: none;
            transition: none;
        }
    }

    @container (min-width: 500px) {
        .card {
            grid-template-columns: 200px 1fr;
        }
    }

Перший запит реагує на налаштування користувача, другий — на ширину контейнера.

---

# Component-Based Responsive Design

Component-Based Responsive Design — це підхід, за якого компонент адаптується до власного доступного простору.

Наприклад, компонент профілю:

    .profile-container {
        container-type: inline-size;
    }

    .profile {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    @container (min-width: 450px) {
        .profile {
            flex-direction: row;
            align-items: center;
        }
    }

Цей компонент може використовуватися в різних місцях:

    Dashboard
        ↓
    Profile component

    Sidebar
        ↓
    Profile component

    Settings page
        ↓
    Profile component

Компонент не залежить від конкретного breakpoint viewport.

Він реагує на простір, який фактично має.

Це особливо важливо для:

    reusable components
    design systems
    component libraries
    dashboards
    admin panels
    cards
    widgets

---

# Container Queries у Grid

Container Queries добре поєднуються з CSS Grid.

Наприклад:

    .product-section {
        container-type: inline-size;
    }

    .product-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    @container (min-width: 600px) {
        .product-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @container (min-width: 900px) {
        .product-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

Тут кількість колонок залежить від ширини `.product-section`.

    Менше 600px
        → 1 column

    Від 600px
        → 2 columns

    Від 900px
        → 3 columns

Зверни увагу: обидва запити можуть виконуватися одночасно при ширині від `900px`. Друге правило перевизначає `grid-template-columns`, оскільки має таку саму специфічність і розташоване пізніше.

`minmax(0, 1fr)` допомагає уникати ситуацій, коли мінімальний розмір вмісту спричиняє небажане розширення grid-колонки.

---

# Container Queries у Flexbox

Container Queries можна використовувати для зміни напрямку Flexbox.

    .toolbar-container {
        container-type: inline-size;
    }

    .toolbar {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 0.75rem;
    }

    @container (min-width: 500px) {
        .toolbar {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
    }

У вузькому контейнері елементи розташовані вертикально.

У широкому контейнері елементи розташовані горизонтально.

Це корисно для:

    toolbars
    filters
    search panels
    action groups
    navigation components

---

# Container Queries для Typography

Container Queries можуть змінювати типографіку залежно від ширини контейнера.

    .article-container {
        container-type: inline-size;
    }

    .article-title {
        font-size: 1.25rem;
    }

    @container (min-width: 500px) {
        .article-title {
            font-size: 2rem;
        }
    }

У вузькому контейнері заголовок компактний.

У широкому контейнері заголовок більший.

Однак не потрібно збільшувати шрифт лише тому, що це технічно можливо.

Потрібно враховувати:

    readability
    line length
    hierarchy
    content density
    accessibility

Для плавного масштабування шрифтів також корисна функція `clamp()`, яку буде розглянуто в наступному розділі Modern CSS.

---

# Container Query Units

CSS має спеціальні одиниці вимірювання, пов'язані з розмірами query container.

Основні одиниці:

    cqw
    cqh
    cqi
    cqb
    cqmin
    cqmax

Вони дозволяють задавати розміри відносно контейнера.

## cqw

`cqw` — 1% ширини query container.

    .container {
        container-type: inline-size;
    }

    .child {
        width: 50cqw;
    }

Якщо ширина відповідного query container дорівнює `800px`, то:

    1cqw = 8px

    50cqw = 400px

## cqh

`cqh` — 1% висоти query container.

    .child {
        height: 50cqh;
    }

Ця одиниця використовує висоту відповідного query container.

## cqi

`cqi` — 1% inline size query container.

    .title {
        font-size: 5cqi;
    }

У горизонтальному письмі inline size зазвичай відповідає ширині.

`cqi` корисна для логічно орієнтованих стилів, які не прив'язані безпосередньо до фізичного напрямку ширини.

## cqb

`cqb` — 1% block size query container.

    .child {
        padding-block: 3cqb;
    }

У горизонтальному письмі block size зазвичай відповідає висоті.

## cqmin

`cqmin` — 1% від меншого з відповідних розмірів контейнера.

    .element {
        font-size: 4cqmin;
    }

## cqmax

`cqmax` — 1% від більшого з відповідних розмірів контейнера.

    .element {
        font-size: 4cqmax;
    }

## Важлива особливість

Container query units шукають відповідний query container для конкретної осі.

Якщо відповідного контейнера немає, для цих одиниць використовуються значення, пов'язані з малим viewport, а не автоматично розміри найближчого довільного батьківського елемента.

Тому перед використанням таких одиниць потрібно переконатися, що структура контейнерів відповідає задуму.

Для початкового рівня найважливіше запам'ятати:

    cqw → 1% ширини контейнера
    cqh → 1% висоти контейнера
    cqi → 1% inline size
    cqb → 1% block size
    cqmin → 1% меншого виміру
    cqmax → 1% більшого виміру

---

# Container Units vs Viewport Units

Viewport units залежать від viewport.

Наприклад:

    vw
    vh
    vi
    vb

Container query units залежать від відповідного query container.

Наприклад:

    cqw
    cqh
    cqi
    cqb

Порівняння:

    50vw
        → 50% ширини viewport

    50cqw
        → 50% ширини query container

Приклад:

    .container {
        container-type: inline-size;
    }

    .element {
        width: 50cqw;
    }

Якщо viewport широкий, але контейнер вузький, `50cqw` залишатиметься пов'язаним із шириною контейнера.

Це робить container query units корисними для компонентів, які повинні масштабуватися разом із батьківським layout.

---

# Style Queries

Container Queries можуть використовуватися не лише для перевірки розмірів.

Style Queries дозволяють перевіряти певні CSS-властивості або custom properties контейнера, якщо відповідний синтаксис підтримується браузером.

Наприклад, для перевірки custom property:

    .theme-container {
        --theme: dark;
    }

    @container style(--theme: dark) {
        .card {
            background: #222;
            color: white;
        }
    }

Тут перевіряється значення custom property `--theme` у відповідному контейнерному контексті.

Важливо розуміти, що Style Queries та Size Queries — не одне й те саме.

    Size Query
        → перевірка розміру контейнера

    Style Query
        → перевірка певного стилю контейнера

Підтримка різних можливостей Style Queries може відрізнятися залежно від браузера. Перед використанням у production перевіряй актуальну сумісність.

Для базового рівня CSS достатньо спочатку впевнено опанувати size-based Container Queries.

---

# Nested Containers

У складних інтерфейсах один контейнер може знаходитися всередині іншого.

Наприклад:

    .page {
        container-name: page;
        container-type: inline-size;
    }

    .card-list {
        container-name: cards;
        container-type: inline-size;
    }

    .card {
        padding: 1rem;
    }

Тепер можна використовувати різні іменовані запити:

    @container page (min-width: 1000px) {
        .page-title {
            font-size: 2.5rem;
        }
    }

    @container cards (min-width: 500px) {
        .card {
            padding: 2rem;
        }
    }

Важливо:

- Браузер шукає відповідний контейнер серед предків елемента.
- Ім'я дозволяє звернутися до потрібного типу контейнера.
- Контейнер не обов'язково повинен бути безпосереднім батьківським елементом.
- Правило може застосовуватися лише тоді, коли знайдено відповідний query container і умова виконується.

Nested Containers допомагають будувати незалежні адаптивні компоненти.

Але надмірна кількість контейнерів може ускладнювати розуміння layout.

---

# Container Queries та CSS Cascade

Container Queries не скасовують звичайні правила CSS Cascade.

Якщо кілька правил змінюють одну властивість, браузер враховує:

    origin
    importance
    cascade layers
    specificity
    scoping
    source order

Приклад:

    .card {
        padding: 1rem;
    }

    @container (min-width: 500px) {
        .card {
            padding: 2rem;
        }
    }

Якщо контейнер відповідає умові, друге правило застосовується.

Але якщо інше правило з вищим пріоритетом задає `padding`, результат може відрізнятися від очікуваного.

Наприклад:

    #main .card {
        padding: 0.5rem;
    }

    @container (min-width: 500px) {
        .card {
            padding: 2rem;
        }
    }

Селектор `#main .card` має вищу специфічність, тому правило всередині `@container` не обов'язково переможе.

Сам `@container` не додає специфічності селектору.

---

# Container Queries та Cascade Layers

Container Queries можна комбінувати з CSS Cascade Layers.

Наприклад:

    @layer components {
        .card {
            padding: 1rem;
        }
    }

    @layer responsive {
        @container (min-width: 500px) {
            .card {
                padding: 2rem;
            }
        }
    }

Але важливо пам'ятати: порядок cascade layers має значення.

Якщо оголошено кілька шарів, пріоритет між ними визначається правилами Cascade Layers, а не лише порядком появи правил у файлі.

Cascade Layers будуть детальніше розглядатися в розділі:

    06-css-layers

---

# Fallback та Progressive Enhancement

Progressive Enhancement — підхід, за якого базова версія інтерфейсу працює без додаткових сучасних можливостей, а підтримувані браузери отримують покращення.

Для Container Queries зручно спочатку визначити базовий layout.

    .card-container {
        padding: 1rem;
    }

    .card {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

Потім додати Container Query:

    @container (min-width: 500px) {
        .card {
            grid-template-columns: 200px 1fr;
        }
    }

Якщо браузер не підтримує Container Queries, базовий стиль залишається корисним.

Але є важливий нюанс: якщо браузер не підтримує сам `container-type`, контейнерний запит не спрацює. Тому базовий layout повинен бути достатнім для нормального відображення компонента.

За потреби можна використовувати `@supports` для перевірки підтримки CSS-властивості:

    @supports (container-type: inline-size) {
        .card-container {
            container-type: inline-size;
        }
    }

Такий fallback має сенс, якщо потрібна сумісність зі старішими браузерами.

Для більшості сучасних навчальних проєктів починай із простого базового стилю та перевіряй сумісність із цільовими браузерами.

---

# Типові помилки

## 1. Забути container-type

❌ Неправильно:

    .card-container {
        padding: 1rem;
    }

    @container (min-width: 500px) {
        .card {
            grid-template-columns: 200px 1fr;
        }
    }

Якщо немає відповідного query container, правило не спрацює.

✔ Правильно:

    .card-container {
        container-type: inline-size;
    }

    @container (min-width: 500px) {
        .card {
            grid-template-columns: 200px 1fr;
        }
    }

---

## 2. Очікувати, що @container змінить самого контейнера

❌ Неправильно розуміти це так:

    @container (min-width: 500px) {
        .card-container {
            width: 100%;
        }
    }

Контейнерний запит призначений для стилізації елементів, які знаходяться всередині відповідного query container, а не для перевірки розміру елемента щодо самого себе.

Замість цього зазвичай стилізують дочірній елемент:

    @container (min-width: 500px) {
        .card {
            grid-template-columns: 200px 1fr;
        }
    }

---

## 3. Плутати viewport і container

❌ Неправильне припущення:

    @container (min-width: 768px)
        → ширина екрана 768px

Насправді:

    @container (min-width: 768px)
        → ширина відповідного query container щонайменше 768px

Для viewport використовують Media Queries:

    @media (min-width: 768px) {
        ...
    }

---

## 4. Неправильно задавати ім'я контейнера

❌ Неправильно:

    .card-list {
        container-name: cards;
    }

    @container card-list (min-width: 500px) {
        ...
    }

Тут ім'я контейнера — `cards`, а не `card-list`.

✔ Правильно:

    .card-list {
        container: cards / inline-size;
    }

    @container cards (min-width: 500px) {
        ...
    }

---

## 5. Використовувати size без необхідності

    .container {
        container-type: size;
    }

Це не просто ширший варіант `inline-size`.

`size` створює containment для обох вимірів і може змінювати поведінку intrinsic sizing.

Для звичайних адаптивних компонентів частіше достатньо:

    container-type: inline-size;

---

## 6. Встановлювати breakpoint без тестування

Наприклад:

    @container (min-width: 768px) {
        ...
    }

Число `768px` не є обов'язковим стандартом для Container Queries.

Breakpoint повинен залежати від того, скільки простору потребує конкретний компонент.

Для однієї картки може бути достатньо `450px`, для іншої — `650px`.

---

## 7. Занадто багато Container Queries

Якщо кожен дрібний елемент має багато власних breakpoint, CSS стає складним.

Краще:

- починати з простого layout;
- додавати запити лише там, де потрібна реальна адаптація;
- використовувати зрозумілі імена контейнерів;
- не дублювати правила без необхідності;
- перевіряти поведінку компонента в різних ширинах.

---

## 8. Не враховувати мінімальні розміри вмісту

Навіть правильний Container Query не гарантує, що текст, зображення або кнопки помістяться в контейнер.

Наприклад:

    .card {
        display: grid;
        grid-template-columns: 200px 1fr;
    }

Якщо вміст другої колонки має велику мінімальну ширину, layout може переповнювати контейнер.

Один із можливих підходів:

    .card {
        display: grid;
        grid-template-columns: minmax(0, 200px) minmax(0, 1fr);
    }

Для тексту іноді потрібні додаткові правила:

    .card-content {
        min-width: 0;
        overflow-wrap: anywhere;
    }

Важливо розуміти не лише Container Queries, а й CSS Grid, Flexbox та intrinsic sizing.

---

# Practical Examples

## Приклад 1 — Картка змінює напрямок

    .card-wrapper {
        container-type: inline-size;
    }

    .card {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    @container (min-width: 500px) {
        .card {
            flex-direction: row;
        }
    }

Завдання:

    1. Створи HTML-картку.
    2. Задай ширину контейнера.
    3. Перевір вертикальний layout.
    4. Збільш ширину контейнера.
    5. Перевір горизонтальний layout.

---

## Приклад 2 — Картка зображення та тексту

    .article-container {
        container: article / inline-size;
    }

    .article-card {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .article-card img {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
    }

    @container article (min-width: 600px) {
        .article-card {
            grid-template-columns: 240px minmax(0, 1fr);
            align-items: center;
        }
    }

Завдання:

    1. Додай заголовок і опис.
    2. Задай базовий одноколонковий layout.
    3. Додай Container Query.
    4. Перевір поведінку у вузькому контейнері.
    5. Перевір поведінку у широкому контейнері.

---

## Приклад 3 — Responsive Product Grid

    .products-container {
        container: products / inline-size;
    }

    .products {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    @container products (min-width: 500px) {
        .products {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @container products (min-width: 850px) {
        .products {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

Завдання:

    1. Створи список товарів.
    2. Використай CSS Grid.
    3. Почни з однієї колонки.
    4. Додай другу колонку.
    5. Додай третю колонку.
    6. Змінюй ширину контейнера, а не лише viewport.

---

## Приклад 4 — Compact та Expanded Profile

    .profile-container {
        container: profile / inline-size;
    }

    .profile {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        padding: 1rem;
    }

    .profile-avatar {
        width: 5rem;
        aspect-ratio: 1;
        border-radius: 50%;
        object-fit: cover;
    }

    @container profile (min-width: 400px) {
        .profile {
            grid-template-columns: auto minmax(0, 1fr);
            align-items: center;
        }
    }

Завдання:

    1. Створи профіль користувача.
    2. Додай аватар.
    3. Додай ім'я та опис.
    4. Реалізуй компактний layout.
    5. Реалізуй розширений layout.

---

## Приклад 5 — Container Query Units

    .panel {
        container-type: inline-size;
    }

    .panel-title {
        font-size: 5cqi;
    }

У горизонтальному письмі `cqi` пов'язаний із inline size контейнера, тобто зазвичай із його шириною.

Завдання:

    1. Створи панель.
    2. Задай їй різну ширину.
    3. Застосуй `cqi` для заголовка.
    4. Порівняй із `vw`.
    5. Перевір поведінку заголовка в різних контейнерах.

Пам'ятай: для production-типографіки потрібно також обмежувати мінімальні й максимальні розміри шрифту, наприклад через `clamp()`.

---

## Приклад 6 — Named Containers

    .dashboard-sidebar {
        container: sidebar / inline-size;
    }

    .sidebar-widget {
        padding: 1rem;
    }

    @container sidebar (min-width: 320px) {
        .sidebar-widget {
            padding: 1.5rem;
        }
    }

Завдання:

    1. Створи dashboard.
    2. Додай sidebar.
    3. Додай віджет усередині sidebar.
    4. Назви контейнер `sidebar`.
    5. Перевір роботу іменованого запиту.

---

# Як перевіряти Container Queries у DevTools

Chrome DevTools та інші сучасні браузерні інструменти допомагають перевіряти layout і CSS.

Під час практики:

    1. Відкрий сторінку.
    2. Відкрий DevTools.
    3. Знайди query container у DOM.
    4. Перевір container-type.
    5. Перевір container-name.
    6. Змінюй ширину батьківського контейнера.
    7. Спостерігай, коли спрацьовує @container.
    8. Перевір computed styles дочірнього елемента.

Важливо тестувати два різні сценарії:

    1. Змінюється viewport.
    2. Змінюється ширина контейнера, але viewport залишається приблизно однаковим.

Другий сценарій допомагає побачити головну перевагу Container Queries.

---

# Питання зі співбесіди

Що таке Container Queries?

Навіщо потрібні Container Queries?

Чим Container Queries відрізняються від Media Queries?

Що таке query container?

Як створити query container?

Для чого потрібна властивість `container-type`?

Яка різниця між `normal`, `inline-size` і `size`?

Чому `container-type: inline-size` часто використовують для адаптивних компонентів?

Що робить `container-name`?

Що робить shorthand `container`?

Як працює `@container`?

Чи може `@container` змінити сам контейнер залежно від його власного розміру?

Чи повинен query container бути безпосереднім батьком елемента?

Як браузер знаходить відповідний named container?

Що означає `@container (min-width: 500px)`?

Чим відрізняються `min-width` та `max-width`?

Що таке range syntax у Container Queries?

Що таке container query units?

Що означають `cqw`, `cqh`, `cqi` та `cqb`?

Чим `cqw` відрізняється від `vw`?

Що таке Style Queries?

Чи замінюють Container Queries Media Queries?

Як використовувати Container Queries разом із CSS Grid?

Як використовувати Container Queries разом із Flexbox?

Що таке component-based responsive design?

Що таке progressive enhancement?

Які типові помилки виникають під час роботи з Container Queries?

Як перевірити Container Queries у DevTools?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке Container Queries.

Для чого потрібні Container Queries.

Різниця між Media Queries та Container Queries.

Query container.

`container-type`.

`container-type: inline-size`.

`container-name`.

Shorthand `container`.

`@container`.

`min-width`.

`max-width`.

Базовий responsive component.

Container Queries у CSS Grid.

Container Queries у Flexbox.

Розуміння того, що запит стилізує нащадків відповідного контейнера.

---

## 🔵 Junior

Named containers.

`container-type: size`.

Range syntax.

Container query units:

    cqw
    cqh
    cqi
    cqb
    cqmin
    cqmax

Container Queries у reusable components.

Container Queries у dashboard.

Container Queries у картках.

Container Queries для типографіки.

Nested containers.

Container Queries разом із Media Queries.

Progressive enhancement.

Fallback.

Перевірка в DevTools.

Розуміння intrinsic sizing.

Вибір breakpoint на основі компонента.

---

## 🟠 Middle

Складні адаптивні компоненти.

Nested Container Queries.

Named container strategy.

Container Queries у design systems.

Container Queries у component libraries.

Container Queries для складних dashboard layouts.

Style Queries.

Container query units у fluid design.

Container Queries разом із CSS Cascade Layers.

Container Queries разом із `clamp()`.

Intrinsic sizing та containment.

CSS architecture для контейнерних запитів.

Browser compatibility.

Progressive enhancement для сучасного CSS.

Виявлення конфліктів CSS Cascade.

---

## 🔴 Senior

Проєктування масштабованих container-aware design systems.

Архітектура reusable components.

Складні стратегії вкладених контейнерів.

Взаємодія containment і intrinsic sizing.

Глибоке розуміння CSS Containment.

Взаємодія Container Queries із Cascade, Layers та Scoping.

Оптимізація складних компонентних layout.

Стратегія сумісності браузерів.

Аналіз складних layout bugs.

Проєктування API компонентів для container-aware поведінки.

Trade-offs між:

    Media Queries
    Container Queries
    intrinsic layout
    CSS Grid
    Flexbox
    container query units
    fluid typography

---

# Міні-шпаргалка

## Створити контейнер

    .container {
        container-type: inline-size;
    }

---

## Створити іменований контейнер

    .container {
        container-name: cards;
        container-type: inline-size;
    }

Або:

    .container {
        container: cards / inline-size;
    }

---

## Простий Container Query

    @container (min-width: 500px) {
        .card {
            display: grid;
            grid-template-columns: 200px 1fr;
        }
    }

---

## Named Container Query

    @container cards (min-width: 500px) {
        .card {
            grid-template-columns: 200px 1fr;
        }
    }

---

## Container type

    normal
        → немає size query container

    inline-size
        → запити за inline size

    size
        → запити за обома вимірами

---

## Container Units

    cqw
        → 1% ширини query container

    cqh
        → 1% висоти query container

    cqi
        → 1% inline size

    cqb
        → 1% block size

    cqmin
        → 1% меншого виміру

    cqmax
        → 1% більшого виміру

---

## Media Queries vs Container Queries

    @media
        → viewport / характеристики media environment

    @container
        → відповідний query container

---

## Основна модель

    Parent element
          ↓
    container-type
          ↓
    Query container
          ↓
    @container condition
          ↓
    Child styles change

---

# Головне

• Container Queries дозволяють адаптувати компонент до розміру контейнера, а не лише до viewport.

• `container-type: inline-size` — найважливіша властивість для початкового рівня.

• `container-name` дозволяє звертатися до конкретного іменованого контейнера.

• `container` — shorthand для `container-name` і `container-type`.

• `@container` застосовує CSS-правила, якщо відповідний контейнер відповідає заданій умові.

• Контейнерний запит не призначений для зміни самого контейнера на основі його власного розміру.

• `min-width` та `max-width` дозволяють визначати межі адаптивного компонента.

• `container-type: size` має додаткові наслідки для intrinsic sizing, тому використовувати його потрібно усвідомлено.

• Container Queries особливо корисні для reusable components, карток, віджетів, dashboard та design systems.

• `cqw`, `cqh`, `cqi`, `cqb`, `cqmin` і `cqmax` — одиниці, пов'язані з розмірами query container.

• `cqw` не те саме, що `vw`: перша одиниця залежить від query container, друга — від viewport.

• Media Queries і Container Queries доповнюють одне одного.

• Для адаптації загального layout сторінки часто використовують Media Queries.

• Для адаптації окремого компонента до доступного простору часто використовують Container Queries.

• Потрібно враховувати CSS Cascade, специфічність, intrinsic sizing та можливе переповнення вмісту.

• Breakpoint потрібно вибирати на основі реальних потреб компонента, а не лише за стандартними розмірами екранів.

• Починай із простого базового layout і додавай Container Queries там, де вони справді покращують адаптивність.

• Найважливіша модель:

    container-type
          ↓
    query container
          ↓
    @container
          ↓
    condition
          ↓
    responsive component

• Container Queries — один із ключових інструментів Modern CSS для створення незалежних, повторно використовуваних та адаптивних компонентів.