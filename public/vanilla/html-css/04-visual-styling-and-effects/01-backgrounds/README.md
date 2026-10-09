# 01. Backgrounds

CSS Backgrounds (фони) — це властивості CSS, які дозволяють задавати фоновий колір, зображення, позицію, розмір, повторення та інші візуальні характеристики фону HTML-елемента.

Фони використовуються, коли потрібно:

- задати колір фону;
- встановити фонове зображення;
- розташувати зображення у потрібному місці;
- змінити розмір background image;
- повторювати або не повторювати зображення;
- створювати фонові патерни;
- накладати кілька фонів;
- використовувати градієнти як background;
- керувати поведінкою фонового зображення;
- створювати декоративні секції та блоки;
- створювати hero-секції;
- створювати картки, банери та UI-компоненти.

Основні CSS-властивості для backgrounds:

    background
    background-color
    background-image
    background-repeat
    background-position
    background-size
    background-attachment
    background-origin
    background-clip
    background-blend-mode

Також важливими є функції та значення:

    url()
    linear-gradient()
    radial-gradient()
    cover
    contain
    center
    top
    right
    bottom
    left
    no-repeat
    repeat
    fixed
    scroll
    local

---

# Ключові поняття

✔ background  
✔ background color  
✔ background image  
✔ background layer  
✔ background position  
✔ background size  
✔ background repeat  
✔ background attachment  
✔ background origin  
✔ background clip  
✔ background shorthand  
✔ `url()`  
✔ `cover`  
✔ `contain`  
✔ `no-repeat`  
✔ `repeat`  
✔ `center`  
✔ multiple backgrounds  
✔ background layer order  
✔ viewport background  
✔ decorative background  
✔ image as background  
✔ gradient as background  
✔ background blending  

---

# Що потрібно пам'ятати

• `background-color` задає колір фону.

• `background-image` задає фонове зображення або градієнт.

• `background-repeat` визначає, чи буде background image повторюватися.

• `background-position` визначає положення background image.

• `background-size` визначає розмір background image.

• `background-attachment` визначає, як background поводиться під час прокручування.

• `background-origin` визначає область, відносно якої позиціонується background image.

• `background-clip` визначає область, у якій background буде відображатися.

• `background` — shorthand-властивість для багатьох background properties.

• `cover` масштабує зображення так, щоб воно повністю покривало область елемента.

• `contain` масштабує зображення так, щоб воно повністю помістилося всередині області.

• `no-repeat` забороняє повторення background image.

• Один елемент може мати кілька background images.

• Background layers розташовуються один над одним.

• Перше зображення в списку знаходиться поверх наступних.

• Градієнти також можуть використовуватися як background image.

---

# Background Color

`background-color` задає колір фону елемента.

Синтаксис:

    background-color: value;

Приклад:

    .box {
        background-color: lightblue;
    }

---

### HEX

    .box {
        background-color: #3498db;
    }

---

### RGB

    .box {
        background-color: rgb(52 152 219);
    }

---

### RGBA

У сучасному CSS прозорість можна задавати через `/`.

    .box {
        background-color: rgb(52 152 219 / 50%);
    }

---

### HSL

    .box {
        background-color: hsl(204 70% 53%);
    }

---

### Прозорий фон

    .box {
        background-color: transparent;
    }

`transparent` означає, що власний фон елемента прозорий.

---

# Background Image

`background-image` встановлює фонове зображення.

Синтаксис:

    background-image: url("image.jpg");

Приклад:

    .hero {
        background-image: url("images/hero.jpg");
    }

---

### HTML

    <section class="hero">
        <h1>Welcome</h1>
    </section>

### CSS

    .hero {
        background-image: url("images/hero.jpg");
    }

---

# url()

`url()` використовується для підключення ресурсу.

Наприклад:

    background-image: url("image.jpg");

Або:

    background-image: url("../images/background.png");

Або:

    background-image: url("/images/background.jpg");

---

# Relative Path

Background image часто підключається відносним шляхом.

Структура:

    project/
    ├── index.html
    ├── css/
    │   └── styles.css
    └── images/
        └── background.jpg

Якщо CSS знаходиться у `css/styles.css`:

    .hero {
        background-image: url("../images/background.jpg");
    }

`..` означає:

    перейти на один рівень вище

---

# Absolute Path

Можна використовувати абсолютний шлях:

    .hero {
        background-image: url("/images/background.jpg");
    }

У веб-проєктах потрібно розуміти, відносно якої базової адреси формується шлях.

---

# Background Repeat

`background-repeat` визначає, як background image повторюється.

Основні значення:

    repeat
    repeat-x
    repeat-y
    no-repeat
    space
    round

---

# repeat

За замовчуванням background image зазвичай повторюється.

    .box {
        background-image: url("pattern.png");
        background-repeat: repeat;
    }

Зображення повторюється:

    → → →
    → → →
    → → →

---

# no-repeat

Зображення відображається один раз.

    .box {
        background-image: url("image.jpg");
        background-repeat: no-repeat;
    }

Це дуже поширений варіант для великих background images.

---

# repeat-x

Повторення тільки по горизонталі.

    .box {
        background-repeat: repeat-x;
    }

Схематично:

    [image][image][image][image]

---

# repeat-y

Повторення тільки по вертикалі.

    .box {
        background-repeat: repeat-y;
    }

Схематично:

    [image]
    [image]
    [image]
    [image]

---

# space

`space` повторює зображення без обрізання та розподіляє вільний простір між ними.

    .box {
        background-repeat: space;
    }

---

# round

`round` масштабує background image таким чином, щоб повторення помістилися без обрізання.

    .box {
        background-repeat: round;
    }

---

# Background Position

`background-position` визначає положення background image.

Синтаксис:

    background-position: x y;

---

### Основні значення

    left
    center
    right

    top
    center
    bottom

Наприклад:

    .hero {
        background-position: center;
    }

---

# center

Найпоширеніший варіант:

    .hero {
        background-position: center;
    }

Це означає:

    horizontal → center
    vertical   → center

---

# top

    .hero {
        background-position: top;
    }

---

# bottom

    .hero {
        background-position: bottom;
    }

---

# left

    .hero {
        background-position: left;
    }

---

# right

    .hero {
        background-position: right;
    }

---

# Two Values

Можна окремо задавати горизонтальну та вертикальну позицію:

    .hero {
        background-position: center top;
    }

Тут:

    center → horizontal
    top    → vertical

---

Ще приклад:

    .hero {
        background-position: right bottom;
    }

---

# Percentage Position

Можна використовувати відсотки.

    .hero {
        background-position: 50% 50%;
    }

Це приблизно відповідає:

    center center

---

Наприклад:

    .hero {
        background-position: 0% 0%;
    }

Це:

    left top

А:

    .hero {
        background-position: 100% 100%;
    }

Це:

    right bottom

---

# Length Position

Можна використовувати одиниці CSS.

    .hero {
        background-position: 20px 30px;
    }

Тут:

    20px → horizontal offset
    30px → vertical offset

---

# Background Size

`background-size` визначає розмір background image.

Основні значення:

    auto
    cover
    contain

Також можна використовувати:

    px
    %
    rem
    vw
    vh

---

# auto

Зображення використовує свій природний розмір.

    .box {
        background-size: auto;
    }

---

# cover

`cover` масштабує background image так, щоб воно повністю покрило область елемента.

    .hero {
        background-image: url("hero.jpg");
        background-size: cover;
    }

Зображення може бути обрізане.

Це дуже важливо.

    cover
        ↓
    весь контейнер покритий
        ↓
    частина зображення може вийти за межі

---

# contain

`contain` масштабує зображення так, щоб усе зображення повністю помістилося всередині області.

    .box {
        background-image: url("image.jpg");
        background-size: contain;
    }

При цьому можуть залишитися вільні області навколо зображення.

---

# cover vs contain

`cover`:

    → контейнер повністю покритий
    → зображення може бути обрізане

`contain`:

    → усе зображення видно
    → можуть залишитися порожні області

Запам'ятати:

    cover  → cover container
    contain → contain image

---

# Custom Background Size

Можна задавати конкретний розмір.

    .box {
        background-size: 300px 200px;
    }

Тут:

    width  → 300px
    height → 200px

---

# Один параметр

    .box {
        background-size: 300px;
    }

Другий параметр автоматично стає `auto`.

---

# Percentage

    .box {
        background-size: 100% auto;
    }

Background image займає всю ширину контейнера.

---

# Background Attachment

`background-attachment` визначає, як background поводиться відносно прокручування.

Основні значення:

    scroll
    fixed
    local

---

# scroll

За замовчуванням:

    .box {
        background-attachment: scroll;
    }

Background поводиться звичайним чином під час прокручування елемента/сторінки.

---

# fixed

    .hero {
        background-attachment: fixed;
    }

Background фіксується відносно viewport.

Це може створювати ефект:

    parallax-like background

Однак поведінка `fixed` може відрізнятися залежно від браузера, контейнерів та мобільних пристроїв.

---

# local

    .box {
        background-attachment: local;
    }

Background прив'язується до області прокручування самого елемента.

Це має значення, коли сам елемент має scrolling content.

---

# Background Origin

`background-origin` визначає область, від якої background image позиціонується.

Основні значення:

    border-box
    padding-box
    content-box

За замовчуванням:

    padding-box

---

# border-box

    .box {
        background-origin: border-box;
    }

Background image позиціонується відносно border box.

---

# padding-box

    .box {
        background-origin: padding-box;
    }

Це значення за замовчуванням.

---

# content-box

    .box {
        background-origin: content-box;
    }

Background image позиціонується відносно content box.

---

# Background Clip

`background-clip` визначає область, у якій background малюється.

Основні значення:

    border-box
    padding-box
    content-box
    text

---

# border-box

    .box {
        background-clip: border-box;
    }

Background може поширюватися під border.

---

# padding-box

    .box {
        background-clip: padding-box;
    }

Background не поширюється на область border.

---

# content-box

    .box {
        background-clip: content-box;
    }

Background відображається тільки в content area.

---

# text

Background може використовуватися як текстовий колірний ефект.

Наприклад:

    .title {
        background-image: linear-gradient(
            90deg,
            red,
            blue
        );

        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
    }

Цей підхід часто використовується для gradient text.

Градієнти детальніше розглядаються у:

    02-gradients

---

# Background Shorthand

`background` — shorthand-властивість для background properties.

Наприклад:

    .hero {
        background:
            #222
            url("hero.jpg")
            center / cover
            no-repeat;
    }

Тут можна одночасно задати:

    background-color
    background-image
    background-position
    background-size
    background-repeat

---

# Простий shorthand

    .box {
        background: lightblue;
    }

Це задає:

    background-color: lightblue;

---

# Image + Position + Repeat

    .hero {
        background:
            url("hero.jpg")
            center
            no-repeat;
    }

---

# Image + Position + Size + Repeat

Важливий синтаксис:

    background:
        url("hero.jpg")
        center / cover
        no-repeat;

Зверни увагу:

    position / size

розділяються символом:

    /

Наприклад:

    center / cover

---

# Типовий Hero Background

Один із найпоширеніших шаблонів:

    .hero {
        min-height: 500px;

        background:
            url("hero.jpg")
            center / cover
            no-repeat;
    }

Це означає:

    image     → hero.jpg
    position  → center
    size      → cover
    repeat    → no-repeat

---

# Background Color + Image

Можна задавати одночасно колір і зображення.

    .hero {
        background-color: #222;
        background-image: url("hero.jpg");
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }

Колір може бути fallback, якщо зображення не завантажиться або має прозорі області.

---

# Background Image та Content

Background image не є HTML-контентом.

Наприклад:

    .hero {
        background-image: url("hero.jpg");
    }

Зображення не додається в DOM як:

    <img>

Тому background image зазвичай використовують для:

    decorative images
    visual backgrounds
    patterns
    hero backgrounds
    UI decoration

А `<img>` частіше використовується для:

    content images
    product images
    photos
    informative images

---

# Background vs img

Важлива практична різниця.

`<img>`:

    <img src="photo.jpg" alt="Mountain">

Підходить для контентного зображення.

CSS background:

    .hero {
        background-image: url("mountain.jpg");
    }

Підходить для декоративного зображення.

---

# Accessibility

Фонові зображення не мають `alt`-атрибута.

Тому не слід використовувати CSS background для важливої інформації, яку користувач повинен отримати.

Наприклад, якщо фотографія є частиною змісту сторінки:

    <img
        src="doctor.jpg"
        alt="Лікар консультує пацієнта"
    >

краще, ніж:

    .doctor {
        background-image: url("doctor.jpg");
    }

Якщо зображення лише декоративне:

    .hero {
        background-image: url("decoration.jpg");
    }

CSS background може бути правильним рішенням.

---

# Multiple Backgrounds

Один елемент може мати кілька background images.

Наприклад:

    .hero {
        background-image:
            url("foreground.png"),
            url("background.jpg");
    }

Перший background знаходиться поверх другого.

У цьому прикладі:

    foreground.png
        ↓
    background.jpg

---

# Multiple Backgrounds

Для кожного шару можна окремо задавати:

    image
    position
    size
    repeat
    attachment

Наприклад:

    .hero {
        background-image:
            url("decoration.svg"),
            url("hero.jpg");

        background-position:
            center,
            center;

        background-size:
            contain,
            cover;

        background-repeat:
            no-repeat,
            no-repeat;
    }

---

# Background Layer Order

Порядок дуже важливий.

Наприклад:

    .box {
        background-image:
            url("top.png"),
            url("middle.png"),
            url("bottom.png");
    }

Шари:

    top.png
        ↓
    middle.png
        ↓
    bottom.png

Перший background знаходиться найближче до користувача.

---

# Multiple Background Shorthand

Можна записати компактніше:

    .hero {
        background:
            url("decoration.svg") center / contain no-repeat,
            url("hero.jpg") center / cover no-repeat;
    }

Це означає:

    layer 1 → decoration.svg
    layer 2 → hero.jpg

---

# Background Layers та Color

Background color знаходиться позаду background images.

Наприклад:

    .hero {
        background:
            url("hero.png")
            center / cover
            no-repeat
            #222;
    }

---

# Background Gradients

Градієнт може використовуватися як `background-image`.

Наприклад:

    .box {
        background-image:
            linear-gradient(
                90deg,
                red,
                blue
            );
    }

Градієнти детально розглядаються у:

    02-gradients

---

# Background Image + Gradient

Дуже поширений прийом — накласти gradient поверх фотографії.

    .hero {
        background-image:
            linear-gradient(
                rgb(0 0 0 / 50%),
                rgb(0 0 0 / 50%)
            ),
            url("hero.jpg");

        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }

Структура:

    gradient
        ↓
    image

Градієнт затемнює фотографію.

---

# Dark Overlay

Типовий hero:

    .hero {
        min-height: 500px;

        background:
            linear-gradient(
                rgb(0 0 0 / 55%),
                rgb(0 0 0 / 55%)
            ),
            url("hero.jpg")
            center / cover
            no-repeat;
    }

Це допомагає зробити текст поверх фотографії більш читабельним.

---

# Gradient Overlay

Overlay не обов'язково має бути чорним.

Наприклад:

    .hero {
        background:
            linear-gradient(
                rgb(0 80 150 / 70%),
                rgb(0 0 0 / 30%)
            ),
            url("hero.jpg")
            center / cover
            no-repeat;
    }

---

# Background Pattern

CSS backgrounds можна використовувати для створення простих патернів.

Наприклад:

    .pattern {
        background-color: #f5f5f5;

        background-image:
            linear-gradient(
                45deg,
                #ddd 25%,
                transparent 25%
            );
    }

Для складніших патернів часто використовуються:

    linear-gradient()
    radial-gradient()
    repeating-linear-gradient()
    repeating-radial-gradient()

---

# Background Position + Cover

Дуже важлива комбінація:

    .hero {
        background-image: url("hero.jpg");
        background-size: cover;
        background-position: center;
    }

`cover` відповідає за масштаб.

`position` відповідає за те, яку частину зображення буде видно.

---

# Зміщення Focus Point

Наприклад, якщо важлива частина зображення знаходиться праворуч:

    .hero {
        background-image: url("person.jpg");
        background-size: cover;
        background-position: 70% center;
    }

Замість:

    center

можна використовувати:

    70% center

Це дозволяє контролювати cropping.

---

# Background Position Example

Припустимо, на фотографії людина знаходиться праворуч.

Погано:

    .hero {
        background-position: center;
    }

Краще:

    .hero {
        background-position: 75% center;
    }

Так можна зберегти важливу частину зображення у viewport.

---

# Background Size та Responsive Design

Background image повинно враховувати різні розміри екрана.

Наприклад:

    .hero {
        min-height: 400px;

        background:
            url("hero.jpg")
            center / cover
            no-repeat;
    }

На вузькому екрані частина зображення може бути обрізана.

Тому важливо перевіряти:

    desktop
    tablet
    mobile

---

# Responsive Background

Для mobile можна змінити position:

    .hero {
        background-position: center;
    }

    @media (max-width: 768px) {
        .hero {
            background-position: 65% center;
        }
    }

---

# Responsive Background Image

Іноді на різних екранах потрібні різні зображення.

Наприклад:

    .hero {
        background-image: url("hero-desktop.jpg");
    }

    @media (max-width: 768px) {
        .hero {
            background-image: url("hero-mobile.jpg");
        }
    }

Це дозволяє використовувати окремий mobile background.

---

# Background Color as Fallback

Хороша практика — задавати background color разом із background image.

    .hero {
        background-color: #222;
        background-image: url("hero.jpg");
    }

Якщо image:

    не завантажився
    ще завантажується
    має прозорі області

background color може залишатися видимим.

---

# Background Shorthand vs Longhand

Longhand:

    .hero {
        background-color: #222;
        background-image: url("hero.jpg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

Shorthand:

    .hero {
        background:
            #222
            url("hero.jpg")
            center / cover
            no-repeat;
    }

Longhand часто легше читати під час навчання.

Shorthand зручний у готовому CSS.

---

# Background Reset

Іноді потрібно скинути background.

Можна використовувати:

    .box {
        background: none;
    }

Або:

    .box {
        background: transparent;
        background-image: none;
    }

---

# background: none

Наприклад:

    .button {
        background: none;
    }

Це часто використовується для скидання стандартного background.

---

# Inherit

Background properties можуть успадковуватися явно через `inherit`.

Наприклад:

    .child {
        background-color: inherit;
    }

Але більшість background properties за замовчуванням не успадковуються.

Важливо розрізняти:

    inherited property
    explicitly inherited value

---

# Initial

Можна повернути властивість до initial value:

    .box {
        background-color: initial;
    }

---

# Unset

    .box {
        background-color: unset;
    }

`unset` означає:

    inherit
    або
    initial

залежно від того, чи є властивість inherited.

---

# Background Blend Mode

`background-blend-mode` визначає спосіб змішування background layers.

Наприклад:

    .hero {
        background-image:
            linear-gradient(
                rgb(0 80 150 / 60%),
                rgb(0 80 150 / 60%)
            ),
            url("hero.jpg");

        background-blend-mode: multiply;
    }

Основні значення:

    normal
    multiply
    screen
    overlay
    darken
    lighten
    color-dodge
    color-burn
    difference
    exclusion

Це вже більш просунутий рівень.

---

# Background Clip та Border

Наприклад:

    .box {
        border: 10px solid transparent;
        background-color: gold;
        background-clip: padding-box;
    }

Background не буде промальований під border.

Цей прийом часто використовується для декоративних borders.

---

# Background Origin vs Background Clip

Ці властивості легко переплутати.

`background-origin`:

    звідки background image позиціонується

`background-clip`:

    де background відображається

Запам'ятати:

    origin → starting area
    clip   → painting area

---

# Background Position vs Transform

Не потрібно плутати:

    background-position

та:

    transform: translate(...);

`background-position` переміщує background image всередині елемента.

`transform` переміщує сам елемент або його rendered content.

---

# Background Image vs CSS Image

`background-image` може використовувати не тільки `url()`.

Наприклад:

    .box {
        background-image:
            linear-gradient(
                red,
                blue
            );
    }

Тобто background image може бути:

    raster image
    SVG
    gradient
    multiple layers

---

# SVG Background

SVG можна використовувати як background:

    .icon {
        background-image: url("icon.svg");
    }

Також SVG може бути embedded як data URL, але це більш просунутий варіант.

---

# Background Size with SVG

SVG background також можна масштабувати:

    .icon {
        background-image: url("icon.svg");
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }

---

# Background Repeat для Pattern

Background image не обов'язково має бути великою фотографією.

Наприклад:

    .pattern {
        background-image: url("pattern.svg");
        background-repeat: repeat;
    }

Маленьке зображення може повторюватися по всій області.

---

# Decorative Background

Фон часто використовується для декоративних елементів.

Наприклад:

    .section {
        background:
            url("dots.svg")
            top right / 200px
            no-repeat;
    }

Це дозволяє додати декорацію без додавання зайвого HTML.

---

# Hero Section

Один із найпоширеніших практичних випадків:

    <section class="hero">
        <div class="hero__content">
            <h1>Learn CSS</h1>
            <p>Build modern interfaces.</p>
        </div>
    </section>

CSS:

    .hero {
        min-height: 500px;

        background:
            linear-gradient(
                rgb(0 0 0 / 45%),
                rgb(0 0 0 / 45%)
            ),
            url("hero.jpg")
            center / cover
            no-repeat;

        display: grid;
        place-items: center;
    }

---

# Card Background

Наприклад:

    .card {
        background-color: #ffffff;
    }

Або:

    .card {
        background:
            url("pattern.svg")
            top right / 120px
            no-repeat,
            #ffffff;
    }

---

# Button Background

Background може бути простим:

    .button {
        background-color: #2563eb;
    }

Або градієнтним:

    .button {
        background-image:
            linear-gradient(
                90deg,
                #2563eb,
                #7c3aed
            );
    }

Градієнти детальніше:

    02-gradients

---

# Full Page Background

Background можна застосувати до `body`:

    body {
        background-color: #f5f5f5;
    }

Або:

    body {
        background:
            url("background.jpg")
            center / cover
            no-repeat;
    }

Для складних сторінок часто краще контролювати background окремих секцій.

---

# Background на html та body

Можна задавати background:

    html {
        background-color: #222;
    }

    body {
        background-color: white;
    }

Важливо розуміти, що `html` і `body` є спеціальними елементами сторінки, тому їхня поведінка з background може мати особливості.

---

# Практичний шаблон

Для hero-секції:

    .hero {
        min-height: 600px;

        background-color: #222;

        background-image:
            url("hero.jpg");

        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }

---

# Практичний шаблон з Overlay

    .hero {
        min-height: 600px;

        background:
            linear-gradient(
                rgb(0 0 0 / 50%),
                rgb(0 0 0 / 50%)
            ),
            url("hero.jpg")
            center / cover
            no-repeat;
    }

---

# Практичний шаблон з Multiple Backgrounds

    .hero {
        min-height: 600px;

        background:
            url("decoration.svg")
                top right / 250px
                no-repeat,

            linear-gradient(
                rgb(0 0 0 / 40%),
                rgb(0 0 0 / 40%)
            ),

            url("hero.jpg")
                center / cover
                no-repeat;
    }

Шари:

    decoration
        ↓
    overlay
        ↓
    photo

---

# Типові помилки

❌ Забувати `no-repeat`.

    .hero {
        background-image: url("hero.jpg");
    }

Якщо потрібне одне зображення, краще:

    .hero {
        background-image: url("hero.jpg");
        background-repeat: no-repeat;
    }

---

❌ Використовувати `contain`, коли потрібно повністю заповнити контейнер.

Якщо потрібно:

    cover entire container

частіше потрібен:

    background-size: cover;

---

❌ Використовувати `cover`, коли важливо бачити все зображення.

Якщо потрібно повністю показати image:

    background-size: contain;

---

❌ Плутати `background-position` та `background-size`.

    background-position → де знаходиться image

    background-size → наскільки велика image

---

❌ Забувати `/` між position та size у shorthand.

Правильно:

    background:
        url("hero.jpg")
        center / cover
        no-repeat;

---

❌ Використовувати CSS background для важливого контентного зображення.

Якщо image має зміст:

    <img src="..." alt="...">

часто є кращим рішенням.

---

❌ Використовувати занадто велике background image.

Великі файли можуть:

    збільшувати page weight
    погіршувати loading performance
    збільшувати network traffic

Потрібно оптимізувати зображення.

---

❌ Не перевіряти background на mobile.

`cover` може обрізати важливу частину фотографії.

Потрібно перевіряти:

    desktop
    tablet
    mobile

---

❌ Використовувати `background-attachment: fixed` без перевірки mobile.

Поведінка може відрізнятися залежно від браузера та платформи.

---

# Background Performance

Фонові зображення впливають на performance сторінки.

Важливо:

    використовувати оптимальний формат
    стискати зображення
    не використовувати надмірно великі файли
    використовувати responsive techniques
    уникати непотрібних background images

Для фотографій часто використовуються сучасні формати:

    WebP
    AVIF

---

# Background Image та Resolution

Для великих екранів може знадобитися якісніше зображення.

Але не потрібно завантажувати величезне зображення на маленький mobile screen без потреби.

У production-проєктах можна використовувати:

    responsive images
    CSS media queries
    image optimization tools
    framework image optimization

---

# Background Loading

Background images завантажуються через CSS.

На відміну від:

    <img>

вони не є HTML image elements.

Тому background images не мають:

    alt
    width/height attributes
    semantic image meaning

---

# Background Accessibility

Для декоративних images:

    background-image

може бути хорошим рішенням.

Для meaningful images:

    <img alt="...">

часто правильніше.

Потрібно запитати себе:

    "Чи є це зображення частиною змісту?"

Якщо:

    так → <img>

Якщо:

    ні → background

---

# Background та Box Model

Background пов'язаний із box model.

Елемент має:

    content box
    padding box
    border box

Background може бути обмежений або позиціонований відносно цих областей.

Це особливо важливо для:

    background-origin
    background-clip

---

# Background Color та Border Radius

Background добре працює разом із:

    border-radius

Наприклад:

    .card {
        background-color: white;
        border-radius: 16px;
        overflow: hidden;
    }

Це часто використовується для карток із background image.

---

# Background Image та Border Radius

Наприклад:

    .card {
        border-radius: 16px;

        background:
            url("photo.jpg")
            center / cover
            no-repeat;
    }

Background буде враховувати форму елемента під час painting.

---

# Background Position Keywords

Основні keywords:

    top
    right
    bottom
    left
    center

Можна комбінувати:

    left top
    center top
    right top

    left center
    center center
    right center

    left bottom
    center bottom
    right bottom

---

# Background Repeat Keywords

Основні:

    repeat
    no-repeat
    repeat-x
    repeat-y
    space
    round

---

# Background Attachment Keywords

Основні:

    scroll
    fixed
    local

---

# Background Size Keywords

Основні:

    auto
    cover
    contain

---

# Background Origin Keywords

Основні:

    border-box
    padding-box
    content-box

---

# Background Clip Keywords

Основні:

    border-box
    padding-box
    content-box
    text

---

# Background Shorthand Structure

У спрощеному вигляді:

    background:
        [color]
        [image]
        [position]
        /
        [size]
        [repeat]
        [attachment]
        [origin]
        [clip];

Не всі частини обов'язкові.

Наприклад:

    background:
        url("hero.jpg")
        center / cover
        no-repeat;

---

# Background Property Map

    background-color
        ↓
    колір фону

    background-image
        ↓
    image / gradient

    background-repeat
        ↓
    повторення

    background-position
        ↓
    положення

    background-size
        ↓
    розмір

    background-attachment
        ↓
    поведінка при scroll

    background-origin
        ↓
    область позиціонування

    background-clip
        ↓
    область малювання

    background-blend-mode
        ↓
    blending layers

---

# Background vs Gradient

Background:

    background-image:
        url("image.jpg");

Gradient:

    background-image:
        linear-gradient(
            red,
            blue
        );

Обидва можуть бути background layers.

Наприклад:

    background-image:
        linear-gradient(
            rgb(0 0 0 / 50%),
            rgb(0 0 0 / 50%)
        ),
        url("image.jpg");

---

# Background Layers Model

Можна уявляти background як шари:

    ┌─────────────────────────────┐
    │       Layer 1              │
    │   decoration / overlay     │
    ├─────────────────────────────┤
    │       Layer 2              │
    │       image                │
    ├─────────────────────────────┤
    │       background-color     │
    └─────────────────────────────┘

Перший image у списку:

    ближче до користувача

Останній:

    ближче до background-color

---

# Практичні патерни

## Photo Background

    .hero {
        background:
            url("hero.jpg")
            center / cover
            no-repeat;
    }

---

## Photo + Overlay

    .hero {
        background:
            linear-gradient(
                rgb(0 0 0 / 50%),
                rgb(0 0 0 / 50%)
            ),
            url("hero.jpg")
            center / cover
            no-repeat;
    }

---

## Repeating Pattern

    .pattern {
        background:
            url("pattern.svg")
            repeat;
    }

---

## Top Right Decoration

    .section {
        background:
            url("decoration.svg")
            top right / 200px
            no-repeat;
    }

---

## Centered Image

    .box {
        background:
            url("image.jpg")
            center
            no-repeat;
    }

---

## Full Cover

    .box {
        background:
            url("image.jpg")
            center / cover
            no-repeat;
    }

---

## Fully Visible Image

    .box {
        background:
            url("image.jpg")
            center / contain
            no-repeat;
    }

---

# Питання зі співбесіди

Що таке CSS background?

Які основні background properties існують?

Що робить `background-color`?

Що робить `background-image`?

Що робить `background-repeat`?

Які значення має `background-repeat`?

Що робить `background-position`?

Як позиціонувати background image по центру?

Що робить `background-size`?

Що означає `background-size: cover`?

Що означає `background-size: contain`?

Яка різниця між `cover` та `contain`?

Що робить `background-attachment`?

Яка різниця між `scroll`, `fixed` та `local`?

Що робить `background-origin`?

Що робить `background-clip`?

Яка різниця між `background-origin` та `background-clip`?

Що таке background shorthand?

Як записати image + position + size + repeat одним shorthand?

Чому між `position` та `size` використовується `/`?

Чи можна мати кілька background images?

Як працюють multiple backgrounds?

Який background layer знаходиться зверху?

Чи можна використовувати gradient як background image?

Як зробити затемнення фотографії через background?

Коли використовувати `<img>`, а коли `background-image`?

Чи має CSS background `alt`?

Як зробити responsive background?

Що відбувається з image при `background-size: cover`?

Як змінити focus point background image?

Як оптимізувати background images?

---

# Шлях

## 🟢 Core (обов'язково знати)

Що таке background.

`background-color`.

`background-image`.

`background-repeat`.

`background-position`.

`background-size`.

`background`.

`url()`.

`no-repeat`.

`center`.

`cover`.

`contain`.

Background image з локального файлу.

Background image з URL.

Основи relative paths.

Background image vs `<img>`.

Background color як fallback.

Основи multiple backgrounds.

Gradient як background image.

Основи responsive backgrounds.

---

## 🔵 Junior

Розуміння:

    background-color
    background-image
    background-repeat
    background-position
    background-size
    background-attachment
    background-origin
    background-clip

Впевнене використання:

    cover
    contain
    no-repeat
    center

Background shorthand.

Multiple backgrounds.

Layer order.

Gradient overlays.

Dark overlays.

Responsive background positioning.

Background image + `border-radius`.

Background image + `overflow`.

Background accessibility.

Розуміння різниці:

    background image
    content image

Основи:

    background-blend-mode

---

## 🟠 Middle

Multiple background layers.

Complex background shorthand.

`background-origin`.

`background-clip`.

`background-clip: text`.

`background-blend-mode`.

Complex gradient overlays.

Responsive background strategies.

Mobile-specific background images.

Background image optimization.

Image formats:

    WebP
    AVIF
    SVG

Performance considerations.

Background rendering behavior.

Advanced positioning.

Combining:

    background
    gradients
    pseudo-elements
    overlays

Створення складних декоративних backgrounds без зайвого HTML.

---

## 🔴 Senior

Глибоке розуміння CSS background painting.

Background painting areas.

Interaction:

    background
    border
    padding
    content

Multiple background rendering.

Compositing.

Blending.

`background-blend-mode`.

Advanced responsive image strategies.

Performance optimization.

Critical rendering path.

Large background image cost.

Responsive asset selection.

CSS-generated visual effects.

Complex layered backgrounds.

Backgrounds vs pseudo-elements.

Backgrounds vs CSS masks.

Backgrounds vs SVG.

Архітектура складних visual effects.

---

# Міні-шпаргалка

## Background Color

    .box {
        background-color: #f5f5f5;
    }

    → колір фону

---

## Background Image

    .box {
        background-image: url("image.jpg");
    }

    → background image

---

## No Repeat

    .box {
        background-repeat: no-repeat;
    }

    → image не повторюється

---

## Center

    .box {
        background-position: center;
    }

    → image по центру

---

## Cover

    .box {
        background-size: cover;
    }

    → повністю покрити контейнер

    → image може обрізатися

---

## Contain

    .box {
        background-size: contain;
    }

    → повністю показати image

    → можуть залишитися порожні області

---

## Hero

    .hero {
        background:
            url("hero.jpg")
            center / cover
            no-repeat;
    }

---

## Overlay

    .hero {
        background:
            linear-gradient(
                rgb(0 0 0 / 50%),
                rgb(0 0 0 / 50%)
            ),
            url("hero.jpg")
            center / cover
            no-repeat;
    }

---

## Multiple Backgrounds

    .hero {
        background:
            url("decoration.svg")
                top right / 200px
                no-repeat,

            url("hero.jpg")
                center / cover
                no-repeat;
    }

---

## Position

    background-position:
        center;

    background-position:
        center top;

    background-position:
        right bottom;

    background-position:
        70% center;

---

## Repeat

    repeat
    repeat-x
    repeat-y
    no-repeat
    space
    round

---

## Attachment

    scroll
    fixed
    local

---

## Origin

    border-box
    padding-box
    content-box

---

## Clip

    border-box
    padding-box
    content-box
    text

---

## Main Difference

    background-position
        → де image знаходиться

    background-size
        → наскільки image велика

    background-repeat
        → чи повторюється image

    background-attachment
        → як image поводиться під час scroll

    background-origin
        → відносно якої області позиціонується image

    background-clip
        → де background малюється

---

# Основні правила

    background-color
        → колір

    background-image
        → image / gradient

    background-repeat
        → повторення

    background-position
        → положення

    background-size
        → розмір

    background-attachment
        → scroll behavior

    background-origin
        → positioning area

    background-clip
        → painting area

    background
        → shorthand

---

# Головне

• CSS background використовується для створення фонів та декоративних ефектів.

• `background-color` задає колір фону.

• `background-image` задає background image або gradient.

• `background-repeat` керує повторенням background image.

• `background-position` визначає положення background image.

• `background-size` визначає розмір background image.

• `background-attachment` визначає поведінку background під час прокручування.

• `background-origin` визначає область, відносно якої позиціонується background image.

• `background-clip` визначає область, у якій background малюється.

• `background` — shorthand-властивість для background properties.

• `cover` означає:

    повністю покрити контейнер

і background image може бути обрізане.

• `contain` означає:

    повністю показати image

і можуть залишитися вільні області.

• Типовий hero background:

    .hero {
        background:
            url("hero.jpg")
            center / cover
            no-repeat;
    }

• Для затемнення фотографії можна використовувати gradient layer:

    .hero {
        background:
            linear-gradient(
                rgb(0 0 0 / 50%),
                rgb(0 0 0 / 50%)
            ),
            url("hero.jpg")
            center / cover
            no-repeat;
    }

• Один елемент може мати кілька background layers.

• Перший background image у списку знаходиться поверх наступних.

• Gradient також є background image layer.

• `background-position` і `background-size` виконують різні задачі:

    position → де
    size     → наскільки великий

• `background-origin` і `background-clip` також виконують різні задачі:

    origin → звідки позиціонувати
    clip   → де малювати

• CSS background не має `alt`.

• Якщо зображення є частиною змісту сторінки, часто краще використовувати:

    <img src="..." alt="...">

• Якщо зображення декоративне, часто краще використовувати:

    background-image

• Background images потрібно перевіряти на:

    desktop
    tablet
    mobile

• Для responsive backgrounds часто потрібно коригувати:

    background-position
    background-size
    background-image

• Background images потрібно оптимізувати за розміром та форматом.

• Основна практична модель:

    background-color
          +
    background-image
          +
    position
          +
    size
          +
    repeat

• Найважливіший shorthand-шаблон:

    background:
        url("image.jpg")
        center / cover
        no-repeat;

• Найважливіша різниця:

    cover
        → заповнити контейнер

    contain
        → показати все зображення

• Для початку достатньо добре знати:

    background-color
    background-image
    background-repeat
    background-position
    background-size
    background
    cover
    contain
    no-repeat
    multiple backgrounds
    gradient overlays
    background vs <img>

Цього набору достатньо для впевненого використання CSS backgrounds у більшості звичайних frontend-задач.