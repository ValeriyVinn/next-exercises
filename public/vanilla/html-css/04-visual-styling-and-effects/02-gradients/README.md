# 02. Gradients

CSS Gradients (градієнти) — це CSS-функції, які дозволяють створювати плавні переходи між двома або більше кольорами без використання окремого зображення.

Градієнти використовуються, коли потрібно:

- створити плавний перехід між кольорами;
- зробити фон секції;
- створити hero background;
- затемнити фотографію через overlay;
- створити декоративні елементи;
- створити градієнтні кнопки;
- створити gradient borders;
- створити gradient text;
- створити патерни;
- створити світлові ефекти;
- створити responsive backgrounds;
- комбінувати кілька gradient layers.

CSS gradient використовується переважно через:

    background-image

або:

    background

Основні типи градієнтів:

    linear-gradient()
    radial-gradient()
    conic-gradient()

Також існують повторювані градієнти:

    repeating-linear-gradient()
    repeating-radial-gradient()
    repeating-conic-gradient()

---

# Ключові поняття

✔ gradient  
✔ color stop  
✔ color transition  
✔ linear gradient  
✔ radial gradient  
✔ conic gradient  
✔ repeating gradient  
✔ gradient direction  
✔ gradient angle  
✔ gradient position  
✔ gradient shape  
✔ gradient size  
✔ color stop position  
✔ transparent  
✔ multiple gradients  
✔ gradient layer  
✔ overlay  
✔ gradient background  
✔ gradient text  
✔ gradient border  
✔ gradient pattern  
✔ hard color stop  
✔ soft color transition  

---

# Що потрібно пам'ятати

• Gradient у CSS не є окремим HTML-елементом.

• Gradient створюється CSS-функцією.

• Найчастіше gradient використовується як:

    background-image

• `linear-gradient()` створює перехід уздовж прямої.

• `radial-gradient()` створює перехід від центральної точки назовні.

• `conic-gradient()` створює перехід навколо центральної точки.

• Gradient може містити два або більше кольорів.

• Кожен колір може мати власну позицію — color stop.

• `transparent` можна використовувати для створення fade-ефектів.

• Градієнти можна комбінувати з:

    images
    colors
    multiple backgrounds
    pseudo-elements
    masks
    borders
    text

• Градієнти можуть бути repeating.

• Градієнти можуть використовуватися для декоративних патернів.

---

# Gradient як background

Найпростіший приклад:

    .box {
        background-image:
            linear-gradient(
                red,
                blue
            );
    }

В результаті колір плавно переходить:

    red
      ↓
    purple
      ↓
    blue

---

# Linear Gradient

`linear-gradient()` створює лінійний градієнт.

Синтаксис:

    linear-gradient(
        direction,
        color1,
        color2
    );

Найпростіший варіант:

    .box {
        background-image:
            linear-gradient(
                red,
                blue
            );
    }

За замовчуванням градієнт іде зверху вниз.

---

# Два кольори

    .box {
        background:
            linear-gradient(
                red,
                blue
            );
    }

Умовно:

    red
     ↓
    purple
     ↓
    blue

---

# Три кольори

Можна використовувати більше кольорів:

    .box {
        background:
            linear-gradient(
                red,
                yellow,
                blue
            );
    }

Перехід:

    red
     ↓
    yellow
     ↓
    blue

---

# Багато кольорів

    .box {
        background:
            linear-gradient(
                red,
                orange,
                yellow,
                green,
                blue,
                purple
            );
    }

Кількість color stops не обмежується двома.

---

# Direction

Напрямок можна задавати keywords.

Основні:

    to top
    to right
    to bottom
    to left

Також:

    to top right
    to top left
    to bottom right
    to bottom left

---

# to right

    .box {
        background:
            linear-gradient(
                to right,
                red,
                blue
            );
    }

Градієнт:

    red → blue

---

# to left

    .box {
        background:
            linear-gradient(
                to left,
                red,
                blue
            );
    }

---

# to top

    .box {
        background:
            linear-gradient(
                to top,
                red,
                blue
            );
    }

---

# to bottom

Це значення є типовим напрямком:

    .box {
        background:
            linear-gradient(
                to bottom,
                red,
                blue
            );
    }

---

# Diagonal Gradient

Можна використовувати два напрямки.

Наприклад:

    .box {
        background:
            linear-gradient(
                to bottom right,
                red,
                blue
            );
    }

Напрямок:

    top-left
         ↓
    bottom-right

---

# Інші diagonal directions

    to top right
    to top left
    to bottom right
    to bottom left

Наприклад:

    .box {
        background:
            linear-gradient(
                to top right,
                red,
                blue
            );
    }

---

# Gradient Angle

Замість keywords можна використовувати кут.

Наприклад:

    .box {
        background:
            linear-gradient(
                90deg,
                red,
                blue
            );
    }

`90deg` означає напрямок градієнта під кутом 90 градусів.

---

# Основні кути

Наприклад:

    0deg
    45deg
    90deg
    135deg
    180deg
    270deg
    360deg

---

# 0deg

    .box {
        background:
            linear-gradient(
                0deg,
                red,
                blue
            );
    }

---

# 90deg

    .box {
        background:
            linear-gradient(
                90deg,
                red,
                blue
            );
    }

---

# 180deg

    .box {
        background:
            linear-gradient(
                180deg,
                red,
                blue
            );
    }

---

# 45deg

    .box {
        background:
            linear-gradient(
                45deg,
                red,
                blue
            );
    }

---

# Keywords vs Degrees

Можна використовувати:

    to right

або:

    90deg

Наприклад:

    linear-gradient(
        to right,
        red,
        blue
    );

і:

    linear-gradient(
        90deg,
        red,
        blue
    );

задають горизонтальний напрямок, хоча математична інтерпретація кута в CSS має свою систему відліку.

Для практичної роботи keywords часто легше читати.

---

# Color Stops

Color stop — це колір у певній позиції градієнта.

Наприклад:

    .box {
        background:
            linear-gradient(
                red 0%,
                blue 100%
            );
    }

Тут:

    red  → 0%
    blue → 100%

---

# Color Stop Position

Можна задавати позицію кожного кольору.

    .box {
        background:
            linear-gradient(
                red 0%,
                yellow 50%,
                blue 100%
            );
    }

Структура:

    red     → 0%
    yellow  → 50%
    blue    → 100%

---

# Pixels as Color Stops

Можна використовувати довжини.

    .box {
        background:
            linear-gradient(
                red 0,
                blue 200px
            );
    }

---

# Hard Color Stop

Якщо два кольори починаються в одній позиції, можна створити різкий перехід.

Наприклад:

    .box {
        background:
            linear-gradient(
                to right,
                red 0% 50%,
                blue 50% 100%
            );
    }

Отримаємо:

    red | red | red | blue | blue | blue

без плавного переходу між кольорами.

---

# Hard Stop Example

Наприклад:

    .box {
        background:
            linear-gradient(
                90deg,
                red 0 50%,
                blue 50% 100%
            );
    }

Це можна використовувати для створення:

    stripes
    flags
    patterns
    decorative blocks

---

# Multiple Color Stops

    .box {
        background:
            linear-gradient(
                90deg,
                red 0%,
                orange 25%,
                yellow 50%,
                green 75%,
                blue 100%
            );
    }

---

# Transparent

`transparent` — спеціальне значення, яке дозволяє створювати плавний перехід до прозорості.

Наприклад:

    .fade {
        background:
            linear-gradient(
                to bottom,
                black,
                transparent
            );
    }

Це створює fade effect.

---

# Transparent Overlay

Дуже поширений випадок:

    .hero {
        background:
            linear-gradient(
                rgb(0 0 0 / 60%),
                transparent
            ),
            url("hero.jpg")
            center / cover
            no-repeat;
    }

Градієнт створює затемнення верхньої частини фотографії.

---

# Gradient Overlay

Gradient overlay — це градієнт, який накладається поверх іншого background layer.

Наприклад:

    .hero {
        background:
            linear-gradient(
                rgb(0 0 0 / 50%),
                rgb(0 0 0 / 20%)
            ),
            url("hero.jpg")
            center / cover
            no-repeat;
    }

Шари:

    gradient
        ↓
    image

---

# Radial Gradient

`radial-gradient()` створює градієнт від центральної області назовні.

Синтаксис:

    radial-gradient(
        shape,
        color1,
        color2
    );

Приклад:

    .circle {
        background:
            radial-gradient(
                red,
                blue
            );
    }

---

# Простий Radial Gradient

    .box {
        background:
            radial-gradient(
                red,
                blue
            );
    }

Умовно:

    center
      ↓
    red
      ↓
    purple
      ↓
    blue

---

# Radial Gradient з трьома кольорами

    .box {
        background:
            radial-gradient(
                white,
                orange,
                red
            );
    }

---

# Radial Gradient Position

Можна змінити центр градієнта.

Наприклад:

    .box {
        background:
            radial-gradient(
                at top left,
                white,
                blue
            );
    }

Центр:

    top left

---

# Інші Positions

Можна використовувати:

    at center
    at top
    at bottom
    at left
    at right

А також комбінації:

    at top left
    at top right
    at bottom left
    at bottom right

---

# Custom Radial Position

Можна використовувати відсотки:

    .box {
        background:
            radial-gradient(
                at 30% 20%,
                white,
                blue
            );
    }

Тут центр приблизно знаходиться:

    x → 30%
    y → 20%

---

# Radial Gradient Shape

Radial gradient може бути:

    circle
    ellipse

---

# Circle

    .box {
        background:
            radial-gradient(
                circle,
                white,
                blue
            );
    }

---

# Ellipse

    .box {
        background:
            radial-gradient(
                ellipse,
                white,
                blue
            );
    }

`ellipse` є типовою формою для `radial-gradient()`.

---

# Circle Size

Можна керувати розміром radial gradient.

Наприклад:

    .box {
        background:
            radial-gradient(
                circle 100px,
                white,
                blue
            );
    }

---

# Radial Gradient Size Keywords

Можна використовувати:

    closest-side
    farthest-side
    closest-corner
    farthest-corner

Наприклад:

    .box {
        background:
            radial-gradient(
                circle closest-side,
                white,
                blue
            );
    }

---

# closest-side

Градієнт закінчується на найближчій стороні контейнера.

    .box {
        background:
            radial-gradient(
                closest-side,
                white,
                blue
            );
    }

---

# farthest-side

Градієнт простягається до найдальшої сторони.

    .box {
        background:
            radial-gradient(
                farthest-side,
                white,
                blue
            );
    }

---

# closest-corner

Градієнт орієнтується на найближчий кут.

    .box {
        background:
            radial-gradient(
                closest-corner,
                white,
                blue
            );
    }

---

# farthest-corner

Градієнт простягається до найдальшого кута.

Це типовий спосіб поведінки radial gradient.

    .box {
        background:
            radial-gradient(
                farthest-corner,
                white,
                blue
            );
    }

---

# Conic Gradient

`conic-gradient()` створює градієнт навколо центральної точки.

На відміну від:

    linear-gradient()
    radial-gradient()

conic gradient змінює колір за кутом навколо центру.

Приклад:

    .wheel {
        background:
            conic-gradient(
                red,
                yellow,
                green,
                blue,
                red
            );
    }

---

# Conic Gradient Example

    .wheel {
        width: 200px;
        height: 200px;

        border-radius: 50%;

        background:
            conic-gradient(
                red,
                yellow,
                green,
                blue,
                red
            );
    }

Це може створити ефект кольорового кола.

---

# Conic Gradient з Degrees

Можна задавати початковий кут:

    .wheel {
        background:
            conic-gradient(
                from 45deg,
                red,
                blue
            );
    }

---

# Conic Gradient Position

Можна змінити центр:

    .wheel {
        background:
            conic-gradient(
                at 30% 40%,
                red,
                blue
            );
    }

---

# Conic Gradient Color Stops

Як і в інших gradients, можна задавати positions:

    .wheel {
        background:
            conic-gradient(
                red 0deg 90deg,
                blue 90deg 180deg,
                green 180deg 270deg,
                yellow 270deg 360deg
            );
    }

Це дозволяє створювати сегменти.

---

# Repeating Linear Gradient

`repeating-linear-gradient()` повторює linear gradient.

Наприклад:

    .stripes {
        background:
            repeating-linear-gradient(
                45deg,
                red 0 10px,
                white 10px 20px
            );
    }

Це створює повторювані смуги.

---

# Stripes

Типовий striped pattern:

    .stripes {
        background:
            repeating-linear-gradient(
                45deg,
                #222 0 10px,
                #444 10px 20px
            );
    }

---

# Repeating Radial Gradient

`repeating-radial-gradient()` повторює radial gradient.

Наприклад:

    .pattern {
        background:
            repeating-radial-gradient(
                circle,
                #222 0 10px,
                #fff 10px 20px
            );
    }

Це можна використовувати для:

    circles
    rings
    patterns
    decorative backgrounds

---

# Repeating Conic Gradient

Також існує:

    repeating-conic-gradient()

Наприклад:

    .wheel {
        background:
            repeating-conic-gradient(
                red 0deg 20deg,
                white 20deg 40deg
            );
    }

Це створює повторювані сектори навколо центру.

---

# Gradient Types

Основна класифікація:

    linear-gradient()
        ↓
    уздовж лінії

    radial-gradient()
        ↓
    від центру назовні

    conic-gradient()
        ↓
    навколо центру

---

# Repeating Gradients

    repeating-linear-gradient()
        ↓
    повторюваний linear

    repeating-radial-gradient()
        ↓
    повторюваний radial

    repeating-conic-gradient()
        ↓
    повторюваний conic

---

# Linear vs Radial vs Conic

`linear-gradient()`:

    напрямок
    ↓
    ─────────>

`radial-gradient()`:

    центр
      ↓
    ↗ ↑ ↖
    ← ● →
    ↘ ↓ ↙

`conic-gradient()`:

    навколо центру
       ↗
    ←  ●  →
       ↘

---

# Gradient Color Stops

Кожен gradient складається з color stops.

Наприклад:

    linear-gradient(
        red 0%,
        yellow 50%,
        blue 100%
    );

Тут:

    red
      ↓
    0%

    yellow
      ↓
    50%

    blue
      ↓
    100%

---

# Color Stop Without Position

Можна не задавати position:

    linear-gradient(
        red,
        blue
    );

Браузер автоматично розподіляє stops.

---

# Color Stop With Position

Можна контролювати позиції:

    linear-gradient(
        red 0%,
        blue 80%
    );

---

# Uneven Stops

Color stops не обов'язково розташовані рівномірно.

    linear-gradient(
        red 0%,
        orange 10%,
        yellow 70%,
        blue 100%
    );

Тут жовтий займає значно більшу область переходу.

---

# Multiple Stops

Наприклад:

    linear-gradient(
        to right,
        #ff0000 0%,
        #ff8800 20%,
        #ffff00 40%,
        #00ff00 60%,
        #0000ff 80%,
        #8000ff 100%
    );

---

# Gradient Transition

Між двома color stops браузер створює плавний перехід.

Наприклад:

    red 0%
    blue 100%

Браузер створює проміжні кольори.

Умовно:

    red
     ↓
    red-purple
     ↓
    purple
     ↓
    blue-purple
     ↓
    blue

---

# Hard Transition

Якщо потрібно прибрати плавний transition:

    linear-gradient(
        to right,
        red 0 50%,
        blue 50% 100%
    );

Отримаємо чітку межу:

    red | blue

---

# Gradient as UI Background

Градієнти часто використовуються для кнопок:

    .button {
        background:
            linear-gradient(
                90deg,
                #2563eb,
                #7c3aed
            );

        color: white;
    }

---

# Gradient Button

HTML:

    <button class="button">
        Get Started
    </button>

CSS:

    .button {
        padding: 12px 24px;

        border: 0;
        border-radius: 8px;

        color: white;

        background:
            linear-gradient(
                90deg,
                #2563eb,
                #7c3aed
            );
    }

---

# Gradient Text

Градієнт можна застосувати до тексту.

Наприклад:

    .title {
        background:
            linear-gradient(
                90deg,
                #2563eb,
                #7c3aed
            );

        background-clip: text;
        -webkit-background-clip: text;

        color: transparent;
    }

Логіка:

    gradient
       ↓
    clip to text
       ↓
    transparent text
       ↓
    gradient visible

---

# Gradient Border

Безпосередньо:

    border-color

не приймає gradient як звичайне значення.

Тому для gradient border часто використовують:

    background
    background-clip
    transparent border

Наприклад:

    .box {
        border: 3px solid transparent;
        border-radius: 12px;

        background:
            linear-gradient(white, white) padding-box,
            linear-gradient(
                90deg,
                blue,
                purple
            ) border-box;
    }

Тут використовуються два background layers.

---

# Gradient Border Logic

    layer 1
        ↓
    white
        ↓
    padding-box

    layer 2
        ↓
    gradient
        ↓
    border-box

А border:

    transparent

Тому gradient стає видимим у області border.

---

# Gradient Overlay on Image

Один із найважливіших практичних шаблонів:

    .hero {
        background:
            linear-gradient(
                rgb(0 0 0 / 60%),
                rgb(0 0 0 / 20%)
            ),
            url("hero.jpg")
            center / cover
            no-repeat;
    }

---

# Gradient Fade

Можна створити fade:

    .fade {
        background:
            linear-gradient(
                to bottom,
                transparent,
                black
            );
    }

---

# Image Fade

Наприклад:

    .hero {
        background:
            linear-gradient(
                to bottom,
                transparent 50%,
                rgb(0 0 0 / 90%)
            ),
            url("hero.jpg")
            center / cover
            no-repeat;
    }

Це затемнює нижню частину фотографії.

---

# Gradient Overlay для Text

Наприклад:

    .card {
        background:
            linear-gradient(
                to bottom,
                transparent 40%,
                rgb(0 0 0 / 80%)
            ),
            url("photo.jpg")
            center / cover
            no-repeat;
    }

Текст внизу картки може залишатися читабельним.

---

# Multiple Gradients

Можна використовувати кілька gradient layers.

Наприклад:

    .box {
        background:
            radial-gradient(
                circle at top left,
                rgb(255 255 255 / 30%),
                transparent 40%
            ),
            linear-gradient(
                135deg,
                #2563eb,
                #7c3aed
            );
    }

Шари:

    radial gradient
        ↓
    linear gradient

---

# Gradient + Image

Можна комбінувати:

    gradient
    +
    image

Наприклад:

    .hero {
        background:
            linear-gradient(
                rgb(0 0 0 / 40%),
                rgb(0 0 0 / 40%)
            ),
            url("hero.jpg")
            center / cover
            no-repeat;
    }

---

# Gradient + Color

Можна використовувати background color як fallback:

    .box {
        background-color: #222;

        background-image:
            linear-gradient(
                90deg,
                red,
                blue
            );
    }

---

# Gradient Patterns

Градієнти можуть створювати повторювані патерни.

Наприклад:

    .pattern {
        background:
            repeating-linear-gradient(
                45deg,
                #eee 0 10px,
                #ddd 10px 20px
            );
    }

---

# Grid Pattern

Можна створити просту сітку:

    .grid {
        background:
            linear-gradient(
                #ddd 1px,
                transparent 1px
            ),
            linear-gradient(
                90deg,
                #ddd 1px,
                transparent 1px
            );

        background-size:
            20px 20px;
    }

Перший gradient створює горизонтальні лінії.

Другий:

    vertical lines

Разом:

    grid pattern

---

# Dot Pattern

Можна створити точковий pattern через radial gradient:

    .dots {
        background:
            radial-gradient(
                #999 1px,
                transparent 1px
            );

        background-size:
            20px 20px;
    }

---

# Gradient Background Example

    .section {
        min-height: 400px;

        background:
            linear-gradient(
                135deg,
                #2563eb,
                #7c3aed
            );
    }

---

# Radial Glow

Градієнт можна використовувати як glow:

    .section {
        background:
            radial-gradient(
                circle at center,
                rgb(59 130 246 / 40%),
                transparent 60%
            ),
            #111827;
    }

---

# Decorative Glow

Наприклад:

    .hero {
        background:
            radial-gradient(
                circle at 20% 30%,
                rgb(59 130 246 / 30%),
                transparent 30%
            ),
            radial-gradient(
                circle at 80% 70%,
                rgb(168 85 247 / 25%),
                transparent 30%
            ),
            #111827;
    }

Це дозволяє створити сучасний decorative background без окремих зображень.

---

# Gradient Cards

    .card {
        background:
            linear-gradient(
                135deg,
                #ffffff,
                #f3f4f6
            );
    }

---

# Gradient Overlay with Pseudo-element

Градієнт можна винести в `::before`.

    .hero {
        position: relative;
    }

    .hero::before {
        content: "";

        position: absolute;
        inset: 0;

        background:
            linear-gradient(
                rgb(0 0 0 / 50%),
                transparent
            );
    }

Цей підхід буде особливо корисним у розділі:

    05-pseudoelements

---

# Gradient vs Pseudo-element

Можна зробити overlay без pseudo-element:

    .hero {
        background:
            linear-gradient(
                rgb(0 0 0 / 50%),
                transparent
            ),
            url("hero.jpg");
    }

Або через pseudo-element:

    .hero::before {
        content: "";

        position: absolute;
        inset: 0;

        background:
            linear-gradient(
                rgb(0 0 0 / 50%),
                transparent
            );
    }

Обидва підходи можуть бути правильними.

---

# Gradient Units

Color stop positions можуть використовувати:

    %
    px
    rem
    em
    viewport units

Наприклад:

    linear-gradient(
        to right,
        red 0%,
        blue 200px
    );

---

# Gradient Angle Units

Кути можуть задаватися через:

    deg
    grad
    rad
    turn

Найчастіше використовується:

    deg

Наприклад:

    linear-gradient(
        45deg,
        red,
        blue
    );

---

# turn

Можна використовувати `turn`.

Наприклад:

    conic-gradient(
        from 0.25turn,
        red,
        blue
    );

`1turn`:

    повний оберт

Тобто:

    1turn = 360deg

---

# rad

Кут можна задавати в radians:

    linear-gradient(
        1rad,
        red,
        blue
    );

На практиці для звичайного CSS найчастіше використовують:

    deg

---

# Gradient Function Structure

## Linear

    linear-gradient(
        direction,
        color-stop,
        color-stop
    )

---

## Radial

    radial-gradient(
        shape,
        size,
        position,
        color-stop,
        color-stop
    )

---

## Conic

    conic-gradient(
        from angle,
        position,
        color-stop,
        color-stop
    )

---

# Типові помилки

❌ Плутати gradient direction і color stop.

    direction
        → напрямок gradient

    color stop
        → колір + його позиція

---

❌ Забувати про `background-image`.

Gradient часто використовується:

    background-image:
        linear-gradient(...);

а не як окрема властивість `gradient`.

---

❌ Неправильно записувати shorthand.

Правильно:

    background:
        linear-gradient(
            90deg,
            red,
            blue
        );

---

❌ Використовувати занадто багато кольорів.

Наприклад:

    red
    orange
    yellow
    green
    cyan
    blue
    purple
    pink

може зробити дизайн візуально перевантаженим.

Краще використовувати обмежену палітру.

---

❌ Не враховувати contrast.

Наприклад:

    .hero {
        background:
            linear-gradient(
                transparent,
                transparent
            ),
            url("photo.jpg");
    }

Текст може бути погано читатися.

Краще використовувати overlay:

    linear-gradient(
        rgb(0 0 0 / 50%),
        rgb(0 0 0 / 50%)
    )

---

❌ Використовувати gradient text без розуміння `background-clip`.

Наприклад:

    .title {
        background:
            linear-gradient(...);

        color: transparent;
    }

Цього недостатньо.

Потрібно:

    background-clip: text;

---

❌ Забувати про browser compatibility для деяких старих середовищ.

Для сучасного frontend CSS основні gradient functions підтримуються широко, але специфічні ефекти потрібно перевіряти у цільових браузерах.

---

❌ Створювати складний gradient там, де достатньо простого кольору.

Не кожен UI-елемент потребує gradient.

---

# Gradient Accessibility

Gradient сам по собі не має semantic meaning.

Але він може впливати на читабельність контенту.

Особливо важливо перевіряти:

    text contrast
    button contrast
    overlay contrast
    focus states

Наприклад, якщо текст знаходиться поверх фотографії:

    image
      +
    gradient overlay
      +
    text

overlay повинен забезпечувати достатній contrast.

---

# Gradient Performance

CSS gradients зазвичай не потребують завантаження окремого image-файлу.

Наприклад:

    linear-gradient(
        90deg,
        blue,
        purple
    )

не потребує:

    gradient.jpg

Це може бути зручно для простих декоративних ефектів.

Але дуже складні background layers також можуть збільшувати rendering cost.

---

# Gradient vs Image

Gradient:

    CSS-generated
    scalable
    не потребує image file
    легко змінюється через CSS

Image:

    може містити складну фотографію
    потребує asset
    може бути важчим

Тому простий градієнт краще створювати через CSS, а не через готове gradient image.

---

# Практичні приклади

## Приклад 1 — простий linear gradient

    .box {
        background:
            linear-gradient(
                red,
                blue
            );
    }

---

## Приклад 2 — horizontal gradient

    .box {
        background:
            linear-gradient(
                to right,
                red,
                blue
            );
    }

---

## Приклад 3 — diagonal gradient

    .box {
        background:
            linear-gradient(
                135deg,
                red,
                blue
            );
    }

---

## Приклад 4 — три кольори

    .box {
        background:
            linear-gradient(
                90deg,
                red,
                yellow,
                blue
            );
    }

---

## Приклад 5 — color stops

    .box {
        background:
            linear-gradient(
                90deg,
                red 0%,
                yellow 50%,
                blue 100%
            );
    }

---

## Приклад 6 — hard stops

    .box {
        background:
            linear-gradient(
                90deg,
                red 0 50%,
                blue 50% 100%
            );
    }

---

## Приклад 7 — radial gradient

    .box {
        background:
            radial-gradient(
                circle,
                white,
                blue
            );
    }

---

## Приклад 8 — radial position

    .box {
        background:
            radial-gradient(
                circle at top left,
                white,
                blue
            );
    }

---

## Приклад 9 — conic gradient

    .box {
        background:
            conic-gradient(
                red,
                yellow,
                green,
                blue,
                red
            );
    }

---

## Приклад 10 — repeating stripes

    .box {
        background:
            repeating-linear-gradient(
                45deg,
                #222 0 10px,
                #fff 10px 20px
            );
    }

---

## Приклад 11 — dots

    .box {
        background:
            radial-gradient(
                #333 1px,
                transparent 1px
            );

        background-size:
            20px 20px;
    }

---

## Приклад 12 — grid

    .box {
        background:
            linear-gradient(
                #ddd 1px,
                transparent 1px
            ),
            linear-gradient(
                90deg,
                #ddd 1px,
                transparent 1px
            );

        background-size:
            20px 20px;
    }

---

## Приклад 13 — image overlay

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

## Приклад 14 — fade to transparent

    .hero {
        background:
            linear-gradient(
                to bottom,
                rgb(0 0 0 / 70%),
                transparent
            ),
            url("hero.jpg")
            center / cover
            no-repeat;
    }

---

## Приклад 15 — gradient text

    .title {
        background:
            linear-gradient(
                90deg,
                #2563eb,
                #7c3aed
            );

        background-clip: text;
        -webkit-background-clip: text;

        color: transparent;
    }

---

## Приклад 16 — gradient border

    .box {
        border: 3px solid transparent;
        border-radius: 12px;

        background:
            linear-gradient(white, white) padding-box,
            linear-gradient(
                90deg,
                blue,
                purple
            ) border-box;
    }

---

# Практичні шаблони

## Modern Hero

    .hero {
        min-height: 600px;

        background:
            linear-gradient(
                135deg,
                rgb(37 99 235 / 85%),
                rgb(124 58 237 / 75%)
            ),
            url("hero.jpg")
            center / cover
            no-repeat;
    }

---

## Dark Hero

    .hero {
        background:
            linear-gradient(
                rgb(0 0 0 / 65%),
                rgb(0 0 0 / 65%)
            ),
            url("hero.jpg")
            center / cover
            no-repeat;
    }

---

## Bottom Fade

    .card {
        background:
            linear-gradient(
                to bottom,
                transparent 40%,
                rgb(0 0 0 / 85%)
            ),
            url("photo.jpg")
            center / cover
            no-repeat;
    }

---

## Gradient Button

    .button {
        background:
            linear-gradient(
                90deg,
                #2563eb,
                #7c3aed
            );

        color: white;
    }

---

## Gradient Text

    .title {
        background:
            linear-gradient(
                90deg,
                #2563eb,
                #7c3aed
            );

        background-clip: text;
        -webkit-background-clip: text;

        color: transparent;
    }

---

## Glow Background

    .hero {
        background:
            radial-gradient(
                circle at 20% 20%,
                rgb(59 130 246 / 30%),
                transparent 35%
            ),
            radial-gradient(
                circle at 80% 80%,
                rgb(168 85 247 / 25%),
                transparent 35%
            ),
            #111827;
    }

---

# Питання зі співбесіди

Що таке CSS gradient?

Які типи gradients існують у CSS?

Що робить `linear-gradient()`?

Що робить `radial-gradient()`?

Що робить `conic-gradient()`?

Яка різниця між linear, radial та conic gradient?

Що таке color stop?

Як задати позицію color stop?

Що означає `to right`?

Що означає `45deg` у linear gradient?

Як створити diagonal gradient?

Як створити hard transition між кольорами?

Що таке `transparent` у gradient?

Що таке repeating gradient?

Чим `repeating-linear-gradient()` відрізняється від `linear-gradient()`?

Як створити смуги за допомогою gradient?

Як створити grid pattern за допомогою gradient?

Як створити dot pattern?

Як накласти gradient поверх background image?

Як зробити затемнення фотографії через gradient?

Як зробити fade до transparent?

Як створити gradient text?

Для чого потрібен `background-clip: text`?

Як створити gradient border?

Чи можна використовувати кілька gradients одночасно?

Як працює порядок multiple background layers?

Чи можна використовувати gradient без image-файлу?

Коли краще використати gradient, а коли image?

Як gradient впливає на accessibility?

Як gradient впливає на contrast тексту?

---

# Шлях

## 🟢 Core (обов'язково знати)

Що таке gradient.

`linear-gradient()`.

`radial-gradient()`.

Основи `conic-gradient()`.

Color stops.

Gradient direction.

Gradient angle.

    to right
    to bottom
    45deg
    90deg

Основи:

    transparent

Основи:

    repeating-linear-gradient()

Gradient як:

    background-image
    background

Multiple gradients.

Gradient overlay.

Gradient + image.

---

## 🔵 Junior

Впевнене використання:

    linear-gradient()
    radial-gradient()
    conic-gradient()

Color stop positions.

Hard color stops.

Diagonal gradients.

Gradient overlays.

Transparent gradients.

Repeating gradients.

Gradient patterns.

Gradient buttons.

Gradient text.

`background-clip: text`.

Gradient borders.

Multiple background layers.

Radial gradient positioning.

Conic gradient positioning.

Responsive gradients.

Gradient accessibility.

---

## 🟠 Middle

Complex color stops.

Complex gradient patterns.

Multiple layered gradients.

Advanced radial gradients.

    circle
    ellipse
    closest-side
    farthest-side
    closest-corner
    farthest-corner

Advanced conic gradients.

Gradient borders.

Gradient text effects.

Complex overlays.

Glow effects.

Grid patterns.

Dot patterns.

CSS-generated backgrounds.

Combining:

    gradients
    images
    pseudo-elements
    blend modes

Gradient performance.

Responsive gradient systems.

---

## 🔴 Senior

Глибоке розуміння CSS Images specification.

Gradient rendering.

Gradient interpolation.

Color interpolation.

Color spaces.

Modern CSS color functions.

Advanced color interpolation.

Complex compositing.

Multiple background layers.

Gradient performance.

Rendering cost.

Advanced CSS-generated patterns.

Gradient-based UI systems.

Complex visual effects без raster images.

Комбінація:

    gradients
    masks
    filters
    blend modes
    pseudo-elements

Design-system gradient tokens.

Accessible gradient systems.

Responsive visual systems.

---

# Міні-шпаргалка

## Linear

    linear-gradient(
        red,
        blue
    )

    → gradient уздовж лінії

---

## Linear Direction

    linear-gradient(
        to right,
        red,
        blue
    )

    → зліва направо

---

## Linear Angle

    linear-gradient(
        45deg,
        red,
        blue
    )

    → gradient під кутом

---

## Color Stops

    linear-gradient(
        red 0%,
        yellow 50%,
        blue 100%
    )

    → color + position

---

## Hard Stops

    linear-gradient(
        90deg,
        red 0 50%,
        blue 50% 100%
    )

    → різка межа

---

## Radial

    radial-gradient(
        circle,
        white,
        blue
    )

    → від центру назовні

---

## Radial Position

    radial-gradient(
        circle at top left,
        white,
        blue
    )

    → центр у top left

---

## Conic

    conic-gradient(
        red,
        yellow,
        blue
    )

    → навколо центру

---

## Repeating Linear

    repeating-linear-gradient(
        45deg,
        #222 0 10px,
        #fff 10px 20px
    )

    → повторювані смуги

---

## Repeating Radial

    repeating-radial-gradient(
        circle,
        #222 0 10px,
        #fff 10px 20px
    )

    → повторюваний radial pattern

---

## Repeating Conic

    repeating-conic-gradient(
        red 0deg 20deg,
        white 20deg 40deg
    )

    → повторювані сектори

---

## Overlay

    background:
        linear-gradient(
            rgb(0 0 0 / 50%),
            rgb(0 0 0 / 50%)
        ),
        url("hero.jpg")
        center / cover
        no-repeat;

---

## Gradient Text

    .title {
        background:
            linear-gradient(
                90deg,
                blue,
                purple
            );

        background-clip: text;
        -webkit-background-clip: text;

        color: transparent;
    }

---

## Gradient Border

    .box {
        border: 3px solid transparent;

        background:
            linear-gradient(white, white) padding-box,
            linear-gradient(
                90deg,
                blue,
                purple
            ) border-box;
    }

---

## Основні типи

    linear-gradient()
        → лінія

    radial-gradient()
        → від центру

    conic-gradient()
        → навколо центру

---

## Основні repeating functions

    repeating-linear-gradient()

    repeating-radial-gradient()

    repeating-conic-gradient()

---

# Головне

• Gradient — це CSS-generated image.

• Найчастіше gradient використовується через:

    background
    background-image

• `linear-gradient()` створює градієнт уздовж лінії.

• `radial-gradient()` створює градієнт від центральної точки.

• `conic-gradient()` створює градієнт навколо центральної точки.

• Градієнт може містити два або більше кольорів.

• Color stop визначає:

    color
    +
    position

• Напрямок linear gradient можна задавати:

    to right
    to left
    to top
    to bottom
    to bottom right
    ...

• Напрямок також можна задавати кутом:

    45deg
    90deg
    180deg

• `transparent` дозволяє створювати fade effects.

• Hard color stops дозволяють створювати різкі переходи:

    red 0 50%
    blue 50% 100%

• `repeating-linear-gradient()` зручний для:

    stripes
    patterns

• `repeating-radial-gradient()` зручний для:

    circles
    rings
    patterns

• `repeating-conic-gradient()` зручний для:

    sectors
    repeating radial-like patterns

• Multiple gradients можна накладати один на одного:

    gradient
        ↓
    gradient
        ↓
    image

• Gradient можна накладати поверх фотографії:

    linear-gradient(...),
    url("image.jpg")

• Це один із найважливіших практичних шаблонів для hero-секцій.

• Gradient можна використовувати для затемнення фотографій.

• Gradient можна використовувати для створення glow effects.

• Gradient можна використовувати для створення:

    buttons
    cards
    hero sections
    patterns
    text effects
    borders
    overlays

• Gradient text зазвичай використовує:

    background-clip: text;

і:

    color: transparent;

• Gradient border часто створюється через:

    transparent border
    +
    multiple backgrounds
    +
    background-clip

• Градієнт не потребує окремого image-файлу.

• Для простих кольорових ефектів CSS gradient часто кращий за готове зображення.

• При використанні gradient за текстом потрібно перевіряти contrast.

• Основна модель:

    gradient
        ↓
    color stops
        ↓
    positions
        ↓
    interpolation
        ↓
    visual result

• Для Core достатньо впевнено знати:

    linear-gradient()
    radial-gradient()
    conic-gradient()
    color stops
    directions
    angles
    transparent
    repeating gradients
    multiple gradients
    gradient overlays

• Найважливіший практичний шаблон:

    background:
        linear-gradient(
            rgb(0 0 0 / 50%),
            rgb(0 0 0 / 50%)
        ),
        url("hero.jpg")
        center / cover
        no-repeat;

• Головна ідея:

    linear  → напрямок
    radial  → центр
    conic   → кут навколо центру

• Градієнти — це не тільки красиві фони. Це потужний CSS-інструмент для створення UI, декоративних елементів, overlays, patterns та visual effects без додаткових графічних файлів.