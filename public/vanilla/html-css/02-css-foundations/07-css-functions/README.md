## 07. CSS Functions

CSS-функції — це спеціальні конструкції CSS, які дозволяють **обчислювати значення, комбінувати їх, працювати зі змінними, кольорами, розмірами, сітками, трансформаціями та іншими властивостями**.

Замість того щоб задавати тільки статичні значення:

    .container {
        width: 500px;
    }

можна використовувати функції:

    .container {
        width: calc(100% - 40px);
    }

CSS-функції особливо важливі для:

- адаптивного дизайну;
- математичних обчислень;
- роботи з CSS-змінними;
- responsive typography;
- Grid та Flexbox;
- роботи з кольорами;
- градієнтів;
- трансформацій;
- фільтрів;
- сучасного CSS без зайвого JavaScript.

---

# Ключові поняття

Основні CSS-функції, які потрібно знати:

| Функція | Призначення |
|---|---|
| `var()` | використання CSS-змінних |
| `calc()` | математичні обчислення |
| `min()` | вибрати найменше значення |
| `max()` | вибрати найбільше значення |
| `clamp()` | обмежити значення між min і max |
| `minmax()` | діапазон розмірів у CSS Grid |
| `repeat()` | повторення колонок/рядків у Grid |
| `fit-content()` | розмір до певної максимальної межі |
| `url()` | підключення ресурсу |
| `linear-gradient()` | лінійний градієнт |
| `radial-gradient()` | радіальний градієнт |
| `conic-gradient()` | конічний градієнт |
| `rgb()` | колір RGB |
| `hsl()` | колір HSL |
| `oklch()` | сучасний колірний простір |
| `rgba()` | RGB з альфа-каналом |
| `attr()` | отримання значення HTML-атрибута |
| `env()` | системні/environment-змінні |
| `color-mix()` | змішування кольорів |
| `transform` functions | трансформації елементів |
| `filter` functions | візуальні фільтри |

---

# Що потрібно пам'ятати

1. CSS-функція має форму:

       function(value)

2. Функції можуть приймати декілька аргументів:

       calc(100% - 40px)

3. Функції можна вкладати:

       calc(100% - max(20px, 5vw))

4. `var()` використовується для CSS custom properties.

5. `calc()` використовується для математичних обчислень.

6. `min()` вибирає найменше значення.

7. `max()` вибирає найбільше значення.

8. `clamp()` дозволяє створити мінімальне, бажане та максимальне значення.

9. `minmax()` та `repeat()` особливо важливі для CSS Grid.

10. Сучасний CSS дозволяє вирішувати багато responsive-задач без JavaScript.

---

# 1. `var()` — CSS Custom Properties

`var()` дозволяє використовувати значення CSS-змінних.

Спочатку створюємо змінну:

    :root {
        --color-primary: #2563eb;
        --color-text: #222;
        --spacing-md: 16px;
    }

Потім використовуємо її:

    .button {
        background-color: var(--color-primary);
        color: white;
        padding: var(--spacing-md);
    }

---

## CSS-змінна

CSS custom property починається з `--`:

    :root {
        --main-color: blue;
    }

Використання:

    .title {
        color: var(--main-color);
    }

---

## Значення за замовчуванням

`var()` може мати fallback:

    .title {
        color: var(--title-color, black);
    }

Якщо `--title-color` не існує, буде використано `black`.

---

## Fallback для змінної

    :root {
        --primary-color: blue;
    }

    .button {
        color: var(--secondary-color, var(--primary-color));
    }

Якщо немає `--secondary-color`, використовується `--primary-color`.

---

## CSS-змінні можна перевизначати

    :root {
        --color-primary: blue;
    }

    .dark-theme {
        --color-primary: lightblue;
    }

Тепер:

    .button {
        background-color: var(--color-primary);
    }

буде мати різний колір залежно від контексту.

---

# 2. `calc()` — математичні обчислення

`calc()` дозволяє виконувати математичні операції безпосередньо в CSS.

Синтаксис:

    calc(expression)

Наприклад:

    .container {
        width: calc(100% - 40px);
    }

Елемент займає всю ширину батьківського контейнера мінус `40px`.

---

## Додавання

    width: calc(50% + 20px);

---

## Віднімання

    width: calc(100% - 40px);

---

## Множення

Сучасний CSS підтримує:

    width: calc(100px * 2);

Результат:

    200px

---

## Ділення

    width: calc(100px / 2);

Результат:

    50px

---

## Змішування різних одиниць

Це одна з найважливіших можливостей `calc()`.

    width: calc(100% - 40px);

Не можна просто написати:

    width: 100% - 40px;

Потрібен саме `calc()`:

    width: calc(100% - 40px);

---

## `calc()` з `rem`

    .section {
        padding: calc(2rem + 10px);
    }

---

## `calc()` з viewport

    .hero {
        min-height: calc(100vh - 80px);
    }

Наприклад, якщо header має висоту `80px`, hero може займати решту viewport.

---

## `calc()` з CSS-змінними

Це дуже практичний патерн:

    :root {
        --header-height: 72px;
    }

    .main {
        min-height: calc(100vh - var(--header-height));
    }

---

## Вкладені функції

CSS-функції можна комбінувати:

    .container {
        width: calc(100% - max(20px, 5vw));
    }

---

# 3. `min()` — мінімальне значення

`min()` повертає найменше із переданих значень.

Синтаксис:

    min(value1, value2, ...)

Наприклад:

    .container {
        width: min(100%, 1200px);
    }

Це означає:

> ширина не повинна бути більшою за `1200px`, але на маленькому екрані може бути `100%`.

---

## Типовий контейнер

    .container {
        width: min(100% - 32px, 1200px);
        margin-inline: auto;
    }

Ідея:

- маленький екран → майже вся ширина;
- великий екран → максимум `1200px`.

---

## `min()` для padding

    .section {
        padding-inline: min(8vw, 120px);
    }

Padding буде responsive, але не стане більшим за `120px`.

---

# 4. `max()` — максимальне значення

`max()` повертає найбільше значення.

Синтаксис:

    max(value1, value2, ...)

Наприклад:

    .element {
        width: max(300px, 50%);
    }

Ширина ніколи не буде меншою за `300px`.

---

## Мінімальний padding

    .section {
        padding: max(20px, 4vw);
    }

На маленьких екранах буде щонайменше `20px`.

---

## `max()` і безпека контенту

Наприклад:

    .content {
        padding-inline-start: max(20px, env(safe-area-inset-left));
    }

Це може бути корисно для пристроїв із safe area.

---

# 5. `clamp()` — responsive значення

`clamp()` — одна з найважливіших сучасних CSS-функцій.

Синтаксис:

    clamp(minimum, preferred, maximum)

Наприклад:

    font-size: clamp(1.5rem, 4vw, 3rem);

Це означає:

- мінімум → `1.5rem`;
- бажане значення → `4vw`;
- максимум → `3rem`.

---

## Responsive заголовок

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

Розмір буде плавно змінюватися залежно від ширини viewport.

---

## Responsive padding

    .section {
        padding-block: clamp(40px, 8vw, 120px);
    }

---

## Responsive gap

    .grid {
        gap: clamp(16px, 3vw, 40px);
    }

---

## Responsive ширина

    .container {
        width: clamp(280px, 90%, 1200px);
    }

---

## `clamp()` як альтернатива багатьом media queries

Замість:

    h1 {
        font-size: 32px;
    }

    @media (min-width: 768px) {
        h1 {
            font-size: 48px;
        }
    }

    @media (min-width: 1200px) {
        h1 {
            font-size: 64px;
        }
    }

можна часто використати:

    h1 {
        font-size: clamp(32px, 5vw, 64px);
    }

Це не означає, що media queries більше не потрібні.

Але для плавної зміни розмірів `clamp()` часто набагато зручніший.

---

# 6. Порівняння `min()`, `max()` та `clamp()`

### `min()`

Вибирає найменше:

    width: min(100%, 1200px);

Ідея:

    не більше 1200px

---

### `max()`

Вибирає найбільше:

    width: max(300px, 50%);

Ідея:

    не менше 300px

---

### `clamp()`

Обмежує значення:

    font-size: clamp(24px, 5vw, 64px);

Ідея:

    мінімум 24px
    бажане значення 5vw
    максимум 64px

---

# 7. `minmax()` — CSS Grid

`minmax()` визначає мінімальний і максимальний розмір Grid-треку.

Синтаксис:

    minmax(min, max)

Наприклад:

    .grid {
        grid-template-columns: repeat(3, minmax(200px, 1fr));
    }

Кожна колонка:

- мінімум `200px`;
- максимум `1fr`.

---

## Адаптивний Grid

Дуже поширений патерн:

    .grid {
        display: grid;
        grid-template-columns: repeat(
            auto-fit,
            minmax(250px, 1fr)
        );
        gap: 24px;
    }

Це дозволяє браузеру автоматично визначати кількість колонок.

---

# 8. `repeat()` — повторення Grid-елементів

`repeat()` дозволяє скоротити запис Grid.

Замість:

    grid-template-columns: 1fr 1fr 1fr;

можна:

    grid-template-columns: repeat(3, 1fr);

---

## `repeat()` з `minmax()`

    grid-template-columns: repeat(
        3,
        minmax(200px, 1fr)
    );

---

## `auto-fit`

    grid-template-columns: repeat(
        auto-fit,
        minmax(250px, 1fr)
    );

`auto-fit` намагається розмістити максимально можливу кількість колонок.

---

## `auto-fill`

    grid-template-columns: repeat(
        auto-fill,
        minmax(250px, 1fr)
    );

`auto-fill` зберігає потенційні Grid-треки навіть тоді, коли вони не заповнені.

На практиці:

    auto-fit

часто використовується для responsive-карток.

---

# 9. `fit-content()`

`fit-content()` дозволяє елементу займати стільки місця, скільки потрібно контенту, але не більше певної межі.

Наприклад:

    grid-template-columns: fit-content(300px) 1fr;

Перша колонка може розширюватися за контентом, але максимум до `300px`.

---

## `fit-content()` у Grid

    .layout {
        display: grid;
        grid-template-columns: fit-content(250px) 1fr;
    }

Корисно для:

- sidebar;
- navigation;
- labels;
- коротких заголовків;
- таблиць.

---

# 10. `url()` — підключення ресурсів

`url()` використовується для посилання на зовнішній ресурс.

Наприклад:

    .hero {
        background-image: url("/images/hero.jpg");
    }

---

## Фонове зображення

    .banner {
        background-image: url("../images/banner.webp");
    }

---

## SVG

    .icon {
        background-image: url("/icons/check.svg");
    }

---

# 11. `linear-gradient()`

`linear-gradient()` створює лінійний градієнт.

Наприклад:

    .box {
        background: linear-gradient(
            to right,
            blue,
            purple
        );
    }

---

## Напрямок

    background: linear-gradient(
        to bottom,
        white,
        black
    );

---

## Кут

    background: linear-gradient(
        135deg,
        blue,
        purple
    );

---

## Кілька кольорів

    background: linear-gradient(
        90deg,
        red,
        orange,
        yellow
    );

---

## Color stops

    background: linear-gradient(
        to right,
        blue 0%,
        blue 50%,
        white 50%,
        white 100%
    );

Це дозволяє створювати чіткі переходи.

---

# 12. `radial-gradient()`

Створює радіальний градієнт від центральної точки.

    .circle {
        background: radial-gradient(
            circle,
            white,
            blue
        );
    }

---

## Приклад

    background: radial-gradient(
        circle at center,
        white,
        blue
    );

---

# 13. `conic-gradient()`

Створює конічний градієнт.

    .circle {
        background: conic-gradient(
            red,
            yellow,
            green,
            blue,
            red
        );
    }

Корисний для:

- progress indicators;
- pie charts;
- декоративних ефектів;
- кольорових коліс.

---

# 14. `rgb()`

RGB визначає колір через:

- red;
- green;
- blue.

Наприклад:

    color: rgb(255, 0, 0);

Це червоний.

---

## RGB з alpha

Сучасний синтаксис:

    color: rgb(0 0 0 / 50%);

або:

    background-color: rgb(0 0 0 / 0.5);

---

# 15. `hsl()`

HSL складається з:

- Hue — відтінок;
- Saturation — насиченість;
- Lightness — світлість.

Наприклад:

    color: hsl(220 80% 50%);

---

## HSL з прозорістю

    color: hsl(220 80% 50% / 50%);

---

# 16. `oklch()`

`oklch()` — сучасний колірний простір, який добре підходить для роботи з perceptual lightness.

Синтаксис:

    color: oklch(60% 0.2 250);

Основні компоненти:

- Lightness;
- Chroma;
- Hue.

---

## Приклад палітри

    :root {
        --blue-500: oklch(60% 0.2 250);
        --blue-700: oklch(45% 0.18 250);
    }

---

# 17. `color-mix()`

`color-mix()` дозволяє змішувати кольори.

Наприклад:

    .button:hover {
        background: color-mix(
            in srgb,
            blue 80%,
            white
        );
    }

Це дозволяє отримувати похідні кольори без ручного підбору HEX.

---

# 18. `currentColor`

`currentColor` — спеціальне значення, яке посилається на поточне значення `color`.

Наприклад:

    .icon {
        color: blue;
        border: 2px solid currentColor;
    }

Border автоматично стане синім.

---

## SVG

Особливо корисно:

    .icon {
        color: currentColor;
    }

SVG може використовувати:

    fill: currentColor;

Таким чином іконка успадковує колір тексту.

---

# 19. `attr()`

`attr()` дозволяє отримувати значення HTML-атрибута.

Наприклад:

    <button data-label="Delete"></button>

CSS:

    button::after {
        content: attr(data-label);
    }

Результатом буде текст:

    Delete

---

## Практичний приклад

HTML:

    <a href="https://example.com" data-type="external">
        Example
    </a>

CSS:

    a::after {
        content: " (" attr(data-type) ")";
    }

---

## Важливе обмеження

Традиційно `attr()` найчастіше використовувався саме з `content`.

Сучасний CSS розширює можливості `attr()`, але підтримка конкретних типів і сценаріїв залежить від браузера.

Тому для складної логіки не потрібно намагатися замінити JavaScript на `attr()`.

---

# 20. `env()`

`env()` дозволяє використовувати environment variables, які надає браузер або платформа.

Найвідоміший приклад:

    env(safe-area-inset-top)

Це особливо важливо для пристроїв із вирізами та rounded corners.

---

## Safe area

    .header {
        padding-top: env(safe-area-inset-top);
    }

Часто використовують із fallback:

    .header {
        padding-top: max(
            16px,
            env(safe-area-inset-top)
        );
    }

---

# 21. Функції `transform`

CSS `transform` використовує функції для зміни геометрії елемента.

Основні:

- `translate()`;
- `translateX()`;
- `translateY()`;
- `scale()`;
- `scaleX()`;
- `scaleY()`;
- `rotate()`;
- `skew()`;
- `matrix()`.

---

## `translate()`

    .box {
        transform: translate(20px, 10px);
    }

---

## `translateX()`

    .box {
        transform: translateX(20px);
    }

---

## `translateY()`

    .box {
        transform: translateY(-10px);
    }

---

## `scale()`

    .box {
        transform: scale(1.2);
    }

Елемент збільшується на `20%`.

---

## `rotate()`

    .box {
        transform: rotate(45deg);
    }

---

## `skew()`

    .box {
        transform: skew(10deg);
    }

---

## Комбінація

    .box {
        transform:
            translateX(20px)
            rotate(10deg)
            scale(1.1);
    }

Порядок трансформацій має значення.

---

# 22. `filter()`

CSS `filter` також використовує функції.

Основні:

- `blur()`;
- `brightness()`;
- `contrast()`;
- `grayscale()`;
- `hue-rotate()`;
- `invert()`;
- `opacity()`;
- `saturate()`;
- `sepia()`;
- `drop-shadow()`.

---

## `blur()`

    .image {
        filter: blur(5px);
    }

---

## `grayscale()`

    .image {
        filter: grayscale(100%);
    }

---

## `brightness()`

    .image {
        filter: brightness(0.7);
    }

---

## `contrast()`

    .image {
        filter: contrast(120%);
    }

---

## `drop-shadow()`

    .icon {
        filter: drop-shadow(0 4px 8px rgb(0 0 0 / 30%));
    }

---

## Комбінація filter functions

    .image {
        filter:
            grayscale(100%)
            brightness(0.8)
            contrast(120%);
    }

---

# 23. `backdrop-filter`

`backdrop-filter` застосовує фільтр до того, що знаходиться позаду елемента.

Наприклад:

    .glass {
        background: rgb(255 255 255 / 20%);
        backdrop-filter: blur(10px);
    }

Це часто використовується для glassmorphism.

---

# 24. `image-set()`

`image-set()` дозволяє браузеру вибирати відповідне зображення залежно від pixel density.

Наприклад:

    .hero {
        background-image: image-set(
            url("/images/hero.webp") 1x,
            url("/images/hero@2x.webp") 2x
        );
    }

Це може бути корисно для оптимізації зображень для різних дисплеїв.

---

# 25. `counter()` та `counters()`

CSS може створювати автоматичні лічильники.

Наприклад:

    body {
        counter-reset: section;
    }

    h2 {
        counter-increment: section;
    }

    h2::before {
        content: counter(section) ". ";
    }

Результат:

    1. Introduction
    2. HTML
    3. CSS

---

## Вкладені лічильники

`counters()` дозволяє працювати з вкладеною нумерацією.

Наприклад:

    1. HTML
      1.1 Elements
      1.2 Attributes
    2. CSS
      2.1 Selectors
      2.2 Layout

---

# 26. CSS Functions у `background`

Функції можна комбінувати.

Наприклад:

    .hero {
        background:
            linear-gradient(
                rgb(0 0 0 / 50%),
                rgb(0 0 0 / 50%)
            ),
            url("/images/hero.webp")
            center / cover
            no-repeat;
    }

Тут одночасно використовуються:

- `linear-gradient()`;
- `rgb()`;
- `url()`.

---

# 27. Вкладені CSS-функції

CSS-функції можна вкладати одна в одну.

Наприклад:

    width: calc(
        100% - max(20px, 5vw)
    );

Або:

    font-size: clamp(
        1rem,
        calc(0.8rem + 1vw),
        2rem
    );

Це дозволяє створювати складні responsive-правила.

---

# 28. CSS Functions + CSS Variables

Одна з найсильніших комбінацій:

    :root {
        --container-width: 1200px;
        --page-padding: 20px;
    }

    .container {
        width: min(
            calc(100% - var(--page-padding) * 2),
            var(--container-width)
        );

        margin-inline: auto;
    }

Тепер основні параметри централізовані.

---

# 29. CSS Functions + Responsive Design

Наприклад:

    :root {
        --space-section: clamp(
            40px,
            8vw,
            120px
        );
    }

    section {
        padding-block: var(--space-section);
    }

Ми отримуємо:

- мінімальний spacing;
- плавне збільшення;
- максимальний spacing.

---

# 30. CSS Functions + Typography

Один із найпрактичніших випадків:

    h1 {
        font-size: clamp(
            2rem,
            5vw,
            4rem
        );

        line-height: 1.1;
    }

Для body:

    body {
        font-size: clamp(
            1rem,
            1vw + 0.75rem,
            1.125rem
        );
    }

Це дозволяє створювати fluid typography.

---

# 31. CSS Functions + Container

Типовий сучасний container:

    .container {
        width: min(
            calc(100% - 32px),
            1200px
        );

        margin-inline: auto;
    }

Це означає:

    viewport width - 32px

але максимум:

    1200px

---

# 32. CSS Functions + Grid

Практичний responsive Grid:

    .cards {
        display: grid;

        grid-template-columns:
            repeat(
                auto-fit,
                minmax(250px, 1fr)
            );

        gap: clamp(
            16px,
            3vw,
            32px
        );
    }

Тут одночасно працюють:

- `repeat()`;
- `auto-fit`;
- `minmax()`;
- `clamp()`.

---

# 33. CSS Functions + `aspect-ratio`

`aspect-ratio` не є функцією, але часто використовується разом із CSS-функціями.

Наприклад:

    .card-image {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
    }

---

# 34. CSS Functions + `object-fit`

Для responsive images:

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

Разом із Grid:

    .card {
        width: min(100%, 400px);
    }

---

# 35. CSS Functions у custom properties

CSS-змінна може містити функцію:

    :root {
        --page-width: min(1200px, 100% - 32px);
    }

Потім:

    .container {
        width: var(--page-width);
    }

---

# 36. CSS Functions не завжди обчислюються одразу

CSS custom property зберігає значення:

    :root {
        --size: 20px;
    }

Потім:

    .box {
        width: calc(var(--size) * 2);
    }

Браузер підставляє змінну та обчислює результат.

---

# 37. Типова помилка з `calc()`

Неправильно:

    width: calc(100% - 20);

Потрібна одиниця:

    width: calc(100% - 20px);

---

# 38. Типова помилка з `calc()`

Неправильно:

    width: calc(100%-20px);

Краще завжди писати з пробілами навколо операторів:

    width: calc(100% - 20px);

---

# 39. Типова помилка з `var()`

Неправильно:

    color: var(--primary);

якщо:

    --primary

не визначена.

Краще передбачити fallback:

    color: var(--primary, blue);

---

# 40. Типова помилка з `clamp()`

Неправильно розуміти `clamp()` як:

    clamp(min, max, preferred)

Правильний порядок:

    clamp(minimum, preferred, maximum)

Наприклад:

    clamp(16px, 3vw, 32px);

---

# 41. Типова помилка з `min()` та `max()`

Потрібно розуміти логіку.

    width: min(100%, 1200px);

означає:

    бери менше значення.

А:

    width: max(300px, 50%);

означає:

    бери більше значення.

---

# 42. `min()` vs `max()` vs `clamp()` на практиці

### Максимальна ширина

    .container {
        width: min(100%, 1200px);
    }

### Мінімальна ширина

    .element {
        width: max(300px, 50%);
    }

### Responsive значення в діапазоні

    h1 {
        font-size: clamp(32px, 5vw, 64px);
    }

---

# 43. Функції можна комбінувати

Сучасний CSS часто використовує композицію:

    .container {
        width: min(
            calc(100% - 2rem),
            1200px
        );
    }

Ще складніше:

    .section {
        padding-inline: clamp(
            1rem,
            calc(1rem + 2vw),
            4rem
        );
    }

Або:

    .grid {
        grid-template-columns:
            repeat(
                auto-fit,
                minmax(
                    min(100%, 250px),
                    1fr
                )
            );
    }

---

# 44. CSS Functions і Media Queries

CSS functions не замінюють media queries повністю.

Наприклад, для плавного розміру:

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

Але для зміни структури layout:

    @media (min-width: 768px) {
        .navigation {
            display: flex;
        }
    }

media query може бути кращим рішенням.

---

# 45. CSS Functions і Container Queries

У сучасному CSS функції можуть використовуватися разом із container queries.

Наприклад:

    .card-grid {
        display: grid;
        grid-template-columns:
            repeat(
                auto-fit,
                minmax(200px, 1fr)
            );
    }

А layout може змінюватися залежно не від viewport, а від ширини контейнера.

Це особливо корисно для reusable components.

---

# 46. Практичний компонент Card

HTML:

    <article class="card">
        <img
            src="/images/photo.webp"
            alt="Landscape"
            class="card__image"
        >

        <div class="card__content">
            <h2 class="card__title">
                Card title
            </h2>

            <p class="card__text">
                Short description of the card.
            </p>

            <button class="card__button">
                Read more
            </button>
        </div>
    </article>

CSS:

    .card {
        width: min(100%, 400px);

        display: grid;
        grid-template-rows: auto 1fr;

        border-radius: 16px;
        overflow: hidden;

        background: white;
    }

    .card__image {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
    }

    .card__content {
        padding: clamp(
            16px,
            3vw,
            24px
        );
    }

    .card__title {
        font-size: clamp(
            1.25rem,
            3vw,
            1.75rem
        );
    }

    .card__button {
        padding:
            10px
            clamp(16px, 3vw, 24px);

        background: var(--color-primary);
        color: white;
    }

Тут використовуються:

- `min()`;
- `clamp()`;
- `var()`;
- `aspect-ratio`.

---

# 47. Практичний responsive layout

    :root {
        --container-max: 1200px;
        --page-padding: 16px;
        --section-space: clamp(
            40px,
            8vw,
            120px
        );
    }

    .container {
        width: min(
            calc(100% - var(--page-padding) * 2),
            var(--container-max)
        );

        margin-inline: auto;
    }

    .section {
        padding-block: var(--section-space);
    }

    .grid {
        display: grid;

        grid-template-columns:
            repeat(
                auto-fit,
                minmax(250px, 1fr)
            );

        gap: clamp(
            16px,
            3vw,
            32px
        );
    }

Це вже досить близько до реального production CSS.

---

# 48. Практичний design system

CSS functions добре працюють разом із design tokens:

    :root {
        --color-primary: oklch(60% 0.2 250);
        --color-text: oklch(25% 0.02 250);

        --space-sm: 8px;
        --space-md: 16px;
        --space-lg: 24px;

        --container-width: 1200px;

        --text-base: 1rem;
        --text-xl: clamp(
            1.5rem,
            3vw,
            2.5rem
        );
    }

Використання:

    body {
        color: var(--color-text);
        font-size: var(--text-base);
    }

    h1 {
        font-size: var(--text-xl);
    }

    .container {
        width: min(
            calc(100% - 32px),
            var(--container-width)
        );
    }

---

# 49. CSS Functions та accessibility

Функції повинні допомагати, а не погіршувати доступність.

Наприклад:

    h1 {
        font-size: clamp(
            2rem,
            5vw,
            4rem
        );
    }

Не потрібно використовувати надто маленьке мінімальне значення.

Потрібно перевіряти:

- читабельність;
- контраст;
- масштабування тексту;
- keyboard navigation;
- focus states;
- prefers-reduced-motion.

---

# 50. CSS Functions та `prefers-reduced-motion`

Якщо використовуються трансформації або анімації:

    .button {
        transition:
            transform 200ms ease,
            box-shadow 200ms ease;
    }

    .button:hover {
        transform: scale(1.05);
    }

Для користувачів, які зменшили рух:

    @media (prefers-reduced-motion: reduce) {
        .button {
            transition: none;
        }

        .button:hover {
            transform: none;
        }
    }

---

# 51. CSS Functions та `prefers-color-scheme`

Можна комбінувати CSS-змінні з media query:

    :root {
        --color-bg: white;
        --color-text: #222;
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --color-bg: #111;
            --color-text: white;
        }
    }

    body {
        background: var(--color-bg);
        color: var(--color-text);
    }

---

# 52. Як читати складний CSS expression

Наприклад:

    width: min(
        calc(100% - 32px),
        1200px
    );

Читаємо зсередини:

    calc(100% - 32px)

отримуємо доступну ширину.

Потім:

    min(..., 1200px)

обмежуємо її максимумом `1200px`.

---

Ще один приклад:

    font-size: clamp(
        2rem,
        5vw,
        4rem
    );

Читаємо:

    мінімум = 2rem
    бажане = 5vw
    максимум = 4rem

---

# 53. Найважливіші CSS Functions для Junior

Для Junior Developer потрібно добре знати:

    var()
    calc()
    min()
    max()
    clamp()
    url()
    rgb()
    hsl()
    linear-gradient()
    repeat()
    minmax()

Особливо:

    var()
    calc()
    min()
    max()
    clamp()

---

# 54. Що вчити після базових функцій

Після освоєння базових функцій:

### Layout

    repeat()
    minmax()
    fit-content()

### Colors

    rgb()
    hsl()
    oklch()
    color-mix()

### Responsive

    min()
    max()
    clamp()

### System UI

    env()

### Visual effects

    linear-gradient()
    radial-gradient()
    conic-gradient()
    filter()
    backdrop-filter()

### Advanced

    attr()
    counter()
    counters()
    image-set()

---

# 55. Типові помилки

## 1. Надмірне використання `calc()`

Не потрібно писати:

    width: calc(50% + 0px);

Якщо обчислення не потрібне, використовуйте просте значення.

---

## 2. Надмірно складні expressions

Погано:

    width: calc(
        min(
            max(
                calc(100% - 32px),
                300px
            ),
            1200px
        )
    );

Якщо простіший CSS вирішує задачу — використовуйте простіший CSS.

---

## 3. Плутанина `min()` та `max()`

Пам'ятайте:

    min() → найменше

    max() → найбільше

---

## 4. Неправильний порядок `clamp()`

Правильно:

    clamp(min, preferred, max)

---

## 5. Відсутність fallback

Наприклад:

    color: var(--primary);

Якщо змінна не визначена, властивість може стати невалідною.

Краще:

    color: var(--primary, blue);

---

## 6. Використання `vw` без обмежень

Погано:

    font-size: 5vw;

На дуже маленьких або дуже великих екранах текст може стати непридатним.

Краще:

    font-size: clamp(
        2rem,
        5vw,
        4rem
    );

---

## 7. Надмірна залежність від функцій

CSS functions — інструмент, а не самоціль.

Краще:

    width: min(100%, 1200px);

ніж створювати надскладний expression без необхідності.

---

# 56. DevTools і CSS Functions

Chrome/Firefox DevTools дозволяють:

- змінювати значення функцій;
- перевіряти CSS-змінні;
- бачити computed values;
- тестувати `clamp()`;
- перевіряти Grid;
- редагувати gradients;
- перевіряти кольори.

Наприклад:

    font-size: clamp(1rem, 3vw, 2rem);

У DevTools можна змінювати:

    1rem
    3vw
    2rem

і одразу бачити результат.

---

# 57. Питання зі співбесіди

### Що таке CSS function?

Функція CSS — конструкція, яка обчислює або повертає значення для CSS-властивості.

Приклад:

    width: calc(100% - 40px);

---

### Для чого використовується `var()`?

Для використання CSS custom properties:

    color: var(--primary-color);

---

### Для чого `calc()`?

Для математичних обчислень:

    width: calc(100% - 40px);

---

### Різниця між `min()` та `max()`?

`min()` повертає найменше значення.

`max()` повертає найбільше.

---

### Що робить `clamp()`?

Обмежує значення в заданому діапазоні:

    clamp(min, preferred, max)

---

### Чим `clamp()` корисний для responsive design?

Він дозволяє створювати fluid values без великої кількості breakpoint'ів.

---

### Що робить `minmax()`?

Визначає мінімальний і максимальний розмір Grid-треку:

    minmax(200px, 1fr)

---

### Для чого `repeat()`?

Для повторення Grid tracks:

    repeat(3, 1fr)

---

### Різниця між `minmax()` і `clamp()`?

`minmax()` найчастіше використовується для Grid tracks.

    grid-template-columns:
        repeat(3, minmax(200px, 1fr));

`clamp()` використовується для обмеження значення CSS-властивості:

    font-size: clamp(1rem, 3vw, 2rem);

---

### Для чого `currentColor`?

Для використання поточного значення `color`.

    border-color: currentColor;

---

### Для чого `env()`?

Для використання environment variables, наприклад safe-area:

    env(safe-area-inset-bottom)

---

### Які gradient functions ти знаєш?

    linear-gradient()
    radial-gradient()
    conic-gradient()

---

### Які transform functions ти знаєш?

    translate()
    scale()
    rotate()
    skew()

---

### Які filter functions ти знаєш?

    blur()
    brightness()
    contrast()
    grayscale()
    opacity()
    saturate()
    sepia()
    drop-shadow()

---

# 58. Шлях вивчення

## 🟢 Core

Потрібно знати:

    var()
    calc()
    min()
    max()
    clamp()

Розуміти:

- CSS custom properties;
- fallback;
- математичні операції;
- responsive values;
- fluid typography;
- responsive spacing.

---

## 🔵 Junior

Додатково:

    repeat()
    minmax()
    fit-content()
    url()
    rgb()
    hsl()
    linear-gradient()
    radial-gradient()
    transform functions
    filter functions

Вміти створити:

- responsive container;
- responsive grid;
- fluid typography;
- responsive spacing;
- картки;
- кнопки;
- hero section.

---

## 🟠 Middle

Додатково:

    oklch()
    color-mix()
    env()
    attr()
    image-set()
    backdrop-filter
    counter()
    counters()

Розуміти:

- composition CSS functions;
- design tokens;
- fluid design;
- container queries;
- modern color systems;
- responsive architecture.

---

## 🔴 Senior

Розуміти:

- CSS architecture;
- design systems;
- fluid scales;
- complex CSS expressions;
- rendering performance;
- browser support;
- progressive enhancement;
- accessibility;
- modern color spaces;
- advanced responsive layouts;
- trade-offs між CSS та JavaScript.

---

# 59. Міні-шпаргалка

## CSS Variables

    :root {
        --primary: blue;
    }

    .button {
        color: var(--primary);
    }

---

## Fallback

    color: var(--primary, blue);

---

## `calc()`

    width: calc(100% - 40px);

---

## `min()`

    width: min(100%, 1200px);

---

## `max()`

    width: max(300px, 50%);

---

## `clamp()`

    font-size: clamp(
        1rem,
        3vw,
        2rem
    );

---

## `repeat()`

    grid-template-columns:
        repeat(3, 1fr);

---

## `minmax()`

    grid-template-columns:
        repeat(
            auto-fit,
            minmax(250px, 1fr)
        );

---

## `linear-gradient()`

    background:
        linear-gradient(
            to right,
            blue,
            purple
        );

---

## `radial-gradient()`

    background:
        radial-gradient(
            circle,
            white,
            blue
        );

---

## `conic-gradient()`

    background:
        conic-gradient(
            red,
            yellow,
            green,
            red
        );

---

## `rgb()`

    color: rgb(255 0 0);

---

## `hsl()`

    color: hsl(220 80% 50%);

---

## `oklch()`

    color: oklch(60% 0.2 250);

---

## `currentColor`

    border-color: currentColor;

---

## `url()`

    background-image:
        url("/images/hero.webp");

---

## `transform`

    transform:
        translateX(20px)
        rotate(10deg)
        scale(1.1);

---

## `filter`

    filter:
        grayscale(100%)
        brightness(0.8);

---

# 60. Головне

CSS Functions перетворюють CSS із набору статичних значень на **динамічну систему обчислень і композиції**.

Найважливіша п'ятірка:

    var()
    calc()
    min()
    max()
    clamp()

Запам'ятайте логіку:

    var()
    → використовувати змінну

    calc()
    → обчислити

    min()
    → взяти менше

    max()
    → взяти більше

    clamp()
    → обмежити діапазон

Для Grid:

    repeat()
    minmax()
    fit-content()

Для кольорів:

    rgb()
    hsl()
    oklch()
    color-mix()

Для візуальних ефектів:

    linear-gradient()
    radial-gradient()
    conic-gradient()
    filter()
    backdrop-filter

Для трансформацій:

    translate()
    scale()
    rotate()
    skew()

Найпрактичніший сучасний CSS часто виглядає приблизно так:

    :root {
        --container-width: 1200px;
        --page-padding: 16px;
        --space-section: clamp(
            40px,
            8vw,
            120px
        );
    }

    .container {
        width: min(
            calc(100% - var(--page-padding) * 2),
            var(--container-width)
        );

        margin-inline: auto;
    }

    .grid {
        display: grid;

        grid-template-columns:
            repeat(
                auto-fit,
                minmax(250px, 1fr)
            );

        gap: clamp(
            16px,
            3vw,
            32px
        );
    }

    h1 {
        font-size: clamp(
            2rem,
            5vw,
            4rem
        );
    }

Тобто:

    CSS Functions
        ↓
    CSS Variables
        ↓
    Calculations
        ↓
    Responsive Values
        ↓
    Responsive Layout
        ↓
    Fluid Typography
        ↓
    Modern CSS

**Головна ідея:** не просто запам'ятати окремі функції, а навчитися **комбінувати їх для створення простого, адаптивного та підтримуваного CSS без зайвого JavaScript.**