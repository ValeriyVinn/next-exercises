# 05. Responsive Typography

## 📌 Що таке Responsive Typography

**Responsive Typography** — це підхід до побудови типографіки, за якого розміри тексту, висота рядка, відступи та інші параметри можуть адаптуватися до ширини viewport і контексту layout.

Головна мета:

> Текст повинен залишатися читабельним, добре масштабуватися та правильно працювати на mobile, tablet і desktop.

Responsive typography допомагає вирішити такі задачі:

- великий заголовок не повинен ламати mobile layout;
- текст повинен залишатися читабельним на маленьких екранах;
- desktop typography може бути масштабнішою;
- spacing між текстовими блоками має адаптуватися;
- heading hierarchy повинна залишатися логічною;
- довгі рядки не повинні ставати надто широкими;
- typography повинна працювати разом із responsive layout.

---

# 1. Чому Responsive Typography важлива

Без адаптивної типографіки можна отримати:

    Desktop
    ↓
    великий заголовок
    ↓
    виглядає добре

    Mobile
    ↓
    той самий великий заголовок
    ↓
    4–5 рядків
    ↓
    ламає layout

Наприклад:

    h1 {
        font-size: 64px;
    }

На desktop це може виглядати добре.

Але на mobile:

    ┌──────────────────┐
    │ Великий заголовок │
    │ розбивається на   │
    │ багато рядків     │
    └──────────────────┘

Тому typography повинна враховувати ширину viewport.

---

# 2. Основні складові Responsive Typography

До responsive typography належать:

    font-size
    line-height
    letter-spacing
    max-width
    margin
    padding
    font-weight
    font-family
    text-wrap
    clamp()
    rem
    em
    vw
    media queries

Особливо важливі:

    rem
    %
    vw
    clamp()
    min()
    max()
    media queries

---

# 3. Typography ≠ тільки `font-size`

Типографіка — це не лише розмір шрифту.

Наприклад:

    h1 {
        font-size: 48px;
        line-height: 1.1;
        letter-spacing: -0.02em;
        max-width: 15ch;
    }

Тут одночасно налаштовуються:

    font-size
        ↓
    line-height
        ↓
    letter-spacing
        ↓
    text width

Саме комбінація цих властивостей створює хорошу typography.

---

# 4. Absolute vs Relative Units

Для responsive typography важливо розуміти різницю між:

    px
    rem
    em
    %
    vw
    vh

Найчастіше для typography використовують:

    rem
    em
    vw

а для fluid typography:

    clamp()

---

# 5. `px`

Приклад:

    h1 {
        font-size: 48px;
    }

`px` — абсолютна CSS-одиниця.

Вона проста для розуміння:

    48px
    32px
    16px

Але якщо всі розміри typography жорстко задані в `px`, адаптація між viewport може бути менш гнучкою.

---

# 6. `rem`

`rem` відноситься до font-size root element.

Наприклад:

    html {
        font-size: 16px;
    }

Тоді:

    1rem  = 16px
    2rem  = 32px
    3rem  = 48px

Приклад:

    h1 {
        font-size: 3rem;
    }

Це:

    3 × 16px = 48px

---

# 7. Чому `rem` корисний

Наприклад:

    body {
        font-size: 1rem;
    }

    h1 {
        font-size: 3rem;
    }

    h2 {
        font-size: 2rem;
    }

    p {
        font-size: 1rem;
    }

Вся typography використовує спільну систему.

Якщо root font-size змінюється, масштаб може змінюватися системно.

---

# 8. `em`

`em` відноситься до computed font-size поточного контексту.

Наприклад:

    .card {
        font-size: 20px;
    }

    .card h2 {
        font-size: 1.5em;
    }

Отримаємо приблизно:

    1.5 × 20px = 30px

`em` залежить від контексту.

Тому в складній вкладеній структурі потрібно уважно стежити за inheritance.

---

# 9. `rem` vs `em`

### `rem`

Відноситься до root font-size:

    html {
        font-size: 16px;
    }

    .title {
        font-size: 2rem;
    }

    /* 32px */

### `em`

Відноситься до контексту:

    .card {
        font-size: 20px;
    }

    .title {
        font-size: 2em;
    }

    /* 40px */

Для масштабної typography system часто зручно використовувати `rem`.

---

# 10. `vw`

`vw` — 1% ширини viewport.

Наприклад:

    100vw = 100% viewport width
    50vw  = 50% viewport width
    10vw  = 10% viewport width

Можна написати:

    h1 {
        font-size: 6vw;
    }

Тоді font-size буде змінюватися разом із шириною viewport.

---

# 11. Проблема чистого `vw`

Наприклад:

    h1 {
        font-size: 8vw;
    }

На великому desktop:

    font-size
        ↓
    дуже великий

На маленькому mobile:

    font-size
        ↓
    може стати надто маленьким

Тому чистий `vw` часто не є найкращим рішенням.

Краще:

    clamp()

---

# 12. `clamp()`

`clamp()` дозволяє задати:

    minimum
    preferred
    maximum

Синтаксис:

    clamp(min, preferred, max)

Наприклад:

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

Тут:

    minimum  = 2rem
    preferred = 5vw
    maximum  = 4rem

---

# 13. Як працює `clamp()`

Приклад:

    font-size: clamp(2rem, 5vw, 4rem);

Браузер намагається використовувати:

    5vw

але не дозволяє значенню бути меншим за:

    2rem

і більшим за:

    4rem

Модель:

    minimum
       ↓
    fluid growth
       ↓
    maximum

---

# 14. Чому `clamp()` важлива для Responsive Typography

Замість:

    h1 {
        font-size: 32px;
    }

    @media (min-width: 768px) {
        h1 {
            font-size: 48px;
        }
    }

можна використовувати:

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

Тоді розмір плавно змінюється між minimum і maximum.

---

# 15. `clamp()` не означає "завжди без media queries"

Наприклад:

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

дуже зручно для fluid typography.

Але media query все ще може бути потрібна для:

- зміни layout;
- зміни max-width;
- зміни spacing;
- зміни typography step;
- особливих breakpoint cases.

Тому:

    clamp()
    +
    media queries

можуть працювати разом.

---

# 16. Responsive Heading

Базовий варіант:

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
        line-height: 1.1;
    }

Наприклад:

    Mobile
    ↓
    ~32px

    Tablet
    ↓
    fluid value

    Desktop
    ↓
    максимум 64px

---

# 17. Responsive Heading Scale

Можна побудувати систему:

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

    h2 {
        font-size: clamp(1.75rem, 4vw, 3rem);
    }

    h3 {
        font-size: clamp(1.5rem, 3vw, 2.25rem);
    }

    h4 {
        font-size: clamp(1.25rem, 2.5vw, 1.75rem);
    }

    p {
        font-size: 1rem;
    }

---

# 18. Typography Scale

Typography scale — це система співвідношень між розмірами тексту.

Наприклад:

    body      → 16px
    small     → 14px
    h4        → 20px
    h3        → 24px
    h2        → 32px
    h1        → 48px

На desktop можна мати:

    body      → 16px
    h4        → 20px
    h3        → 28px
    h2        → 40px
    h1        → 64px

Responsive typography дозволяє плавно переходити між такими scale.

---

# 19. CSS Custom Properties для Typography

Зручно створити variables:

    :root {
        --font-size-body: 1rem;
        --font-size-small: 0.875rem;

        --font-size-h4: 1.25rem;
        --font-size-h3: 1.5rem;
        --font-size-h2: 2rem;
        --font-size-h1: 3rem;
    }

Потім:

    body {
        font-size: var(--font-size-body);
    }

    h1 {
        font-size: var(--font-size-h1);
    }

---

# 20. Fluid Typography через Custom Properties

Можна:

    :root {
        --font-size-h1: clamp(2rem, 5vw, 4rem);
        --font-size-h2: clamp(1.75rem, 4vw, 3rem);
        --font-size-h3: clamp(1.5rem, 3vw, 2.25rem);
    }

І:

    h1 {
        font-size: var(--font-size-h1);
    }

    h2 {
        font-size: var(--font-size-h2);
    }

    h3 {
        font-size: var(--font-size-h3);
    }

---

# 21. Responsive Body Text

Не потрібно робити body text надто маленьким на mobile.

Наприклад:

    body {
        font-size: 1rem;
        line-height: 1.5;
    }

У більшості випадків body text може залишатися стабільним.

Responsive typography особливо потрібна для:

    headings
    hero text
    display text
    large labels

---

# 22. Body Text і `clamp()`

Можна:

    body {
        font-size: clamp(1rem, 1.2vw, 1.125rem);
    }

Але не потрібно робити body text надто fluid без необхідності.

Наприклад:

    clamp(0.7rem, 1vw, 1.2rem)

може призвести до занадто дрібного тексту на маленьких viewport.

---

# 23. Мінімальний розмір тексту

Завжди думай про minimum.

Погано:

    body {
        font-size: 1vw;
    }

На маленькому viewport:

    1vw
    ↓
    дуже маленький текст

Краще:

    body {
        font-size: clamp(1rem, 1.2vw, 1.125rem);
    }

---

# 24. `line-height`

Responsive typography — це не тільки `font-size`.

Важливий також:

    line-height

Наприклад:

    p {
        line-height: 1.6;
    }

Для headings:

    h1 {
        line-height: 1.1;
    }

---

# 25. Unitless `line-height`

Для body text часто зручно:

    body {
        line-height: 1.5;
    }

Перевага unitless value:

    line-height
    ↓
    множиться на current font-size

Наприклад:

    font-size: 16px;
    line-height: 1.5;

отримаємо:

    16 × 1.5 = 24px

---

# 26. `line-height` для headings

Для великих headings часто потрібен менший line-height:

    h1 {
        line-height: 1.1;
    }

Наприклад:

    64px × 1.1
    =
    70.4px

Для body:

    16px × 1.5
    =
    24px

Тобто:

    heading
    → tighter

    body
    → more relaxed

---

# 27. Responsive `line-height`

Можна використовувати:

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
        line-height: 1.05;
    }

Зверни увагу:

> unitless `line-height` автоматично масштабується разом із `font-size`.

Тому часто не потрібно писати:

    line-height: 64px;

---

# 28. Не використовуй фіксований `line-height` без причини

Погано:

    h1 {
        font-size: 64px;
        line-height: 64px;
    }

Якщо font-size зміниться:

    font-size: 40px;

line-height залишиться:

    64px

і typography може виглядати неправильно.

Краще:

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
        line-height: 1.1;
    }

---

# 29. `letter-spacing`

Для великих headings іноді використовують:

    h1 {
        letter-spacing: -0.02em;
    }

Для body:

    body {
        letter-spacing: normal;
    }

Не потрібно автоматично зменшувати letter-spacing у всьому тексті.

---

# 30. Responsive `letter-spacing`

Наприклад:

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
        letter-spacing: -0.02em;
    }

`em` тут відноситься до current font-size.

Тому letter-spacing також масштабується.

---

# 31. `max-width` для тексту

Одна з найважливіших технік responsive typography:

    max-width

Наприклад:

    .article p {
        max-width: 65ch;
    }

Це обмежує довжину рядка.

---

# 32. `ch`

`ch` — одиниця, приблизно пов'язана з шириною символу `0`.

Наприклад:

    p {
        max-width: 65ch;
    }

Це дозволяє контролювати ширину текстового рядка.

Для читабельності часто використовують діапазон приблизно:

    45–75 characters

Точне значення залежить від шрифту та дизайну.

---

# 33. Чому занадто довгі рядки погані

Уявімо:

    --------------------------------------------------------------
    Дуже довгий текстовий рядок який займає величезну ширину
    і користувачу складніше швидко перейти від кінця одного
    рядка до початку наступного.
    --------------------------------------------------------------

Краще:

    ------------------------------
    Текстовий рядок має
    обмежену ширину.
    ------------------------------

Тому:

    max-width: 65ch;

може значно покращити readability.

---

# 34. Responsive typography = font size + line length

Дуже важлива модель:

    Typography
       ↓
    font-size
       +
    line-height
       +
    line length
       +
    spacing

Не можна оптимізувати тільки `font-size`.

---

# 35. Responsive paragraph

    .article p {
        max-width: 65ch;
        font-size: 1rem;
        line-height: 1.6;
    }

Це часто краще, ніж:

    .article p {
        width: 100%;
    }

на дуже широкому desktop.

---

# 36. Responsive Heading Width

Для heading також можна використовувати:

    h1 {
        max-width: 20ch;
    }

Наприклад:

    .hero__title {
        max-width: 15ch;
    }

Це контролює кількість символів у рядку і може допомогти створити бажану композицію.

---

# 37. `text-wrap`

Сучасний CSS дозволяє контролювати wrapping тексту.

Наприклад:

    h1 {
        text-wrap: balance;
    }

`balance` намагається зробити рядки heading більш збалансованими.

Наприклад, замість:

    Responsive Typography
    для сучасного
    веб-дизайну

можна отримати більш збалансоване:

    Responsive Typography
    для сучасного веб-дизайну

Точний результат залежить від тексту та доступної ширини.

---

# 38. `text-wrap: pretty`

Для текстових блоків можна використовувати:

    p {
        text-wrap: pretty;
    }

Це дозволяє браузеру покращувати wrapping тексту в деяких випадках.

Для headings часто особливо корисним є:

    text-wrap: balance;

---

# 39. `text-wrap` і responsive typography

Зручно:

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
        line-height: 1.1;
        text-wrap: balance;
    }

Тут:

    clamp()
    ↓
    responsive font-size

    line-height
    ↓
    vertical rhythm

    text-wrap
    ↓
    better line composition

---

# 40. Responsive spacing

Typography включає також spacing.

Наприклад:

    h1 {
        margin-bottom: 1rem;
    }

На desktop:

    margin-bottom: 2rem;

Можна використовувати:

    margin-bottom: clamp(1rem, 2vw, 2rem);

Тоді spacing також стає fluid.

---

# 41. Fluid spacing

Наприклад:

    .section {
        padding-block: clamp(3rem, 8vw, 8rem);
    }

Тут spacing:

    minimum = 3rem
    preferred = 8vw
    maximum = 8rem

Це дозволяє адаптувати вертикальний ритм.

---

# 42. Typography + spacing system

Можна створити:

    :root {
        --space-xs: 0.5rem;
        --space-sm: 0.75rem;
        --space-md: 1rem;
        --space-lg: 1.5rem;
        --space-xl: 2rem;
    }

Або fluid values:

    :root {
        --space-section: clamp(3rem, 8vw, 8rem);
    }

---

# 43. Responsive Typography через Media Queries

Класичний підхід:

    h1 {
        font-size: 2rem;
    }

    @media (min-width: 768px) {
        h1 {
            font-size: 3rem;
        }
    }

    @media (min-width: 1200px) {
        h1 {
            font-size: 4rem;
        }
    }

Перевага:

- легко контролювати;
- зрозуміло;
- можна прив'язати typography до конкретних breakpoints.

Недолік:

- typography змінюється стрибками.

---

# 44. Fluid Typography через `clamp()`

Замість:

    h1 {
        font-size: 2rem;
    }

    @media (min-width: 768px) {
        h1 {
            font-size: 3rem;
        }
    }

    @media (min-width: 1200px) {
        h1 {
            font-size: 4rem;
        }
    }

можна:

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

Розмір змінюється плавно.

---

# 45. Hybrid Approach

На практиці часто добре працює:

    base
      +
    clamp()
      +
    media queries

Наприклад:

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
        line-height: 1.1;
        max-width: 15ch;
    }

    @media (min-width: 1200px) {
        h1 {
            max-width: 18ch;
        }
    }

Тобто:

    clamp()
    → fluid size

    media query
    → structural adjustment

---

# 46. Mobile First Typography

Mobile First:

    base styles
    ↓
    mobile
    ↓
    tablet
    ↓
    desktop

Наприклад:

    h1 {
        font-size: 2rem;
    }

    @media (min-width: 768px) {
        h1 {
            font-size: 3rem;
        }
    }

    @media (min-width: 1200px) {
        h1 {
            font-size: 4rem;
        }
    }

Цей підхід добре поєднується з responsive layout.

---

# 47. Desktop First Typography

Можна почати з desktop:

    h1 {
        font-size: 4rem;
    }

    @media (max-width: 1199px) {
        h1 {
            font-size: 3rem;
        }
    }

    @media (max-width: 767px) {
        h1 {
            font-size: 2rem;
        }
    }

Це працює, але для сучасного responsive development часто зручніше Mobile First.

---

# 48. Responsive Typography і Breakpoints

Не потрібно робити окремий breakpoint для кожного device.

Погано:

    320px
    375px
    390px
    414px
    430px
    768px
    820px
    1024px
    1280px
    1440px

Краще:

> Вибирай breakpoints тоді, коли typography або layout перестає добре працювати.

Наприклад:

    Mobile
    ↓
    Tablet
    ↓
    Desktop

---

# 49. Breakpoint повинен випливати з контенту

Не:

    "iPhone має 390px, тому breakpoint = 390px"

А:

    "Заголовок перестає нормально компонуватися
     приблизно на цій ширині"

Тоді:

    breakpoint
        ↓
    content-driven

---

# 50. Responsive Typography і Accessibility

Typography повинна залишатися доступною.

Важливо:

- достатній розмір тексту;
- достатній line-height;
- достатній contrast;
- не блокувати browser zoom;
- не робити текст надто вузьким;
- не робити headings непрочитуваними;
- враховувати користувачів із zoom;
- використовувати semantic HTML.

---

# 51. Не забороняй Zoom

Не потрібно використовувати viewport settings, які забороняють масштабування.

Погана практика:

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    >

Краще:

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

Browser zoom є важливою accessibility feature.

---

# 52. Responsive Typography і Semantic HTML

Не потрібно робити heading просто через:

    <div class="title">
        Main heading
    </div>

Краще:

    <h1>Main heading</h1>

Typography CSS:

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

Semantic structure і visual styling — різні речі.

---

# 53. Не використовуй heading тільки через його розмір

Погано:

    <h1>Section title</h1>

якщо це насправді не головний заголовок документа.

Або:

    <h4>Main page title</h4>

тільки тому, що він має потрібний розмір.

Правильніше:

    semantic HTML
        +
    CSS typography

Наприклад:

    <h1 class="hero__title">
        Responsive Design
    </h1>

    .hero__title {
        font-size: clamp(2rem, 5vw, 4rem);
    }

---

# 54. Fluid Typography Formula

Класичний патерн:

    font-size: clamp(
        minimum,
        preferred,
        maximum
    );

Наприклад:

    font-size: clamp(
        2rem,
        5vw,
        4rem
    );

Або в одному рядку:

    font-size: clamp(2rem, 5vw, 4rem);

---

# 55. Більш контрольований `clamp()`

Можна використовувати комбінацію:

    rem
    +
    vw
    +
    rem

Наприклад:

    h1 {
        font-size: clamp(2rem, 1rem + 4vw, 4rem);
    }

Тут:

    minimum
    → 2rem

    preferred
    → 1rem + 4vw

    maximum
    → 4rem

Такий підхід дає більше контролю над fluid scaling.

---

# 56. Чому не завжди достатньо `5vw`

Порівняй:

    font-size: 5vw;

і:

    font-size: clamp(2rem, 5vw, 4rem);

Перша версія не має обмежень.

Друга:

    не менше 2rem
    не більше 4rem

Тому `clamp()` часто є безпечнішим варіантом.

---

# 57. Responsive Typography Tokens

Можна створити типографічні tokens:

    :root {
        --text-sm: 0.875rem;
        --text-base: 1rem;
        --text-lg: 1.125rem;

        --text-xl: clamp(1.25rem, 2vw, 1.5rem);
        --text-2xl: clamp(1.5rem, 3vw, 2rem);
        --text-3xl: clamp(2rem, 4vw, 3rem);
        --text-4xl: clamp(2.5rem, 5vw, 4rem);
    }

Потім:

    .title {
        font-size: var(--text-4xl);
    }

---

# 58. Typography Tokens + Line Height

Можна зберігати не тільки font-size:

    :root {
        --text-body: 1rem;
        --text-h1: clamp(2rem, 5vw, 4rem);

        --leading-body: 1.6;
        --leading-heading: 1.1;
    }

Використання:

    body {
        font-size: var(--text-body);
        line-height: var(--leading-body);
    }

    h1 {
        font-size: var(--text-h1);
        line-height: var(--leading-heading);
    }

---

# 59. Typography Tokens + Spacing

Повна система:

    :root {
        --text-body: 1rem;
        --text-h1: clamp(2rem, 5vw, 4rem);

        --leading-body: 1.6;
        --leading-heading: 1.1;

        --space-sm: 0.75rem;
        --space-md: 1rem;
        --space-lg: 1.5rem;
        --space-section: clamp(3rem, 8vw, 8rem);
    }

Це вже основа маленької design system.

---

# 60. Responsive Article Typography

HTML:

    <article class="article">

        <h1>
            Responsive Typography
        </h1>

        <p>
            Responsive typography helps text remain
            readable across different screen sizes.
        </p>

        <h2>
            Why it matters
        </h2>

        <p>
            Text should remain comfortable to read
            on mobile, tablet and desktop.
        </p>

    </article>

CSS:

    .article {
        max-width: 70ch;
        margin-inline: auto;
        padding-inline: 1rem;
    }

    .article h1 {
        font-size: clamp(2rem, 5vw, 4rem);
        line-height: 1.1;
        text-wrap: balance;
    }

    .article h2 {
        font-size: clamp(1.5rem, 3vw, 2.25rem);
        line-height: 1.2;
    }

    .article p {
        font-size: 1rem;
        line-height: 1.6;
    }

---

# 61. Responsive Hero Typography

HTML:

    <section class="hero">

        <div class="hero__content">

            <h1 class="hero__title">
                Build Better Interfaces
            </h1>

            <p class="hero__description">
                Create responsive and accessible
                web experiences.
            </p>

            <a href="#" class="hero__link">
                Learn more
            </a>

        </div>

    </section>

CSS:

    .hero {
        padding-block: clamp(4rem, 10vw, 10rem);
    }

    .hero__content {
        max-width: 70rem;
        margin-inline: auto;
        padding-inline: 1rem;
    }

    .hero__title {
        max-width: 15ch;
        font-size: clamp(2.5rem, 7vw, 6rem);
        line-height: 1;
        text-wrap: balance;
    }

    .hero__description {
        max-width: 60ch;
        margin-top: 1.5rem;
        font-size: clamp(1rem, 1.5vw, 1.25rem);
        line-height: 1.6;
    }

---

# 62. Responsive Navigation Typography

Navigation text зазвичай не потребує великого fluid scaling.

Наприклад:

    .nav__link {
        font-size: 1rem;
        line-height: 1.2;
    }

На desktop можна змінити spacing:

    @media (min-width: 768px) {
        .nav__list {
            gap: 2rem;
        }
    }

Тобто responsive behavior може бути більше пов'язаний із:

    spacing
    layout
    wrapping

ніж із font-size.

---

# 63. Responsive Card Typography

HTML:

    <article class="card">

        <h2 class="card__title">
            Responsive Design
        </h2>

        <p class="card__text">
            Learn how to build interfaces
            that adapt to different screens.
        </p>

    </article>

CSS:

    .card__title {
        font-size: clamp(1.25rem, 2vw, 1.75rem);
        line-height: 1.2;
        text-wrap: balance;
    }

    .card__text {
        font-size: 1rem;
        line-height: 1.6;
    }

---

# 64. Typography Container

Іноді потрібно обмежити не тільки paragraphs, а весь text content.

Наприклад:

    .prose {
        max-width: 70ch;
    }

HTML:

    <article class="prose">

        <h1>Article title</h1>

        <p>
            Long article text...
        </p>

        <p>
            More article text...
        </p>

    </article>

Це особливо корисно для:

- blogs;
- documentation;
- README-like pages;
- articles;
- educational content.

---

# 65. Typography Container vs Layout Container

Не плутай:

    .container {
        max-width: 1200px;
    }

і:

    .prose {
        max-width: 70ch;
    }

`container` контролює layout.

`prose` контролює комфортну ширину тексту.

Наприклад:

    page
    └── container: 1200px
        └── prose: 65ch

---

# 66. Responsive Typography у двох колонках

Desktop:

    ┌──────────────┬──────────────┐
    │              │              │
    │    TEXT      │    IMAGE     │
    │              │              │
    └──────────────┴──────────────┘

Mobile:

    ┌──────────────────────────────┐
    │             IMAGE            │
    ├──────────────────────────────┤
    │             TEXT             │
    └──────────────────────────────┘

Typography може залишатися fluid:

    .title {
        font-size: clamp(2rem, 4vw, 4rem);
    }

А layout змінюється через media query.

---

# 67. Responsive Typography не повинна ламати readability

Погано:

    font-size: clamp(0.5rem, 3vw, 5rem);

Тут minimum:

    0.5rem

може бути занадто малим.

Краще визначати minimum з точки зору accessibility і usability.

Наприклад:

    font-size: clamp(1.5rem, 4vw, 3rem);

---

# 68. Responsive Typography не означає "чим більший екран — тим більший текст"

Не всі тексти повинні масштабуватися.

Наприклад:

    body
    navigation
    button labels
    metadata

можуть мати майже стабільний розмір.

Fluid scaling найбільш корисний для:

    hero headings
    display headings
    section headings
    large marketing text

---

# 69. Button Typography

Кнопки теж потребують consistency:

    .button {
        font-size: 1rem;
        line-height: 1.2;
        padding: 0.75rem 1.25rem;
    }

Не потрібно робити:

    font-size: 5vw;

для кнопки.

Responsive behavior кнопки може бути:

    font-size
    +
    padding
    +
    width
    +
    wrapping

але без надмірного scaling.

---

# 70. Navigation і wrapping

Якщо navigation links починають ламатися:

    Home | About | Products | Contact

не завжди потрібно зменшувати font-size.

Можливо, краще змінити:

    gap
    layout
    flex direction
    menu structure

Responsive typography не повинна бути способом приховати проблему layout.

---

# 71. Typography і `min()`

`min()` дозволяє вибрати менше значення.

Наприклад:

    h1 {
        font-size: min(8vw, 5rem);
    }

Це означає:

    8vw
    або
    5rem

береться менше значення.

---

# 72. Typography і `max()`

`max()` вибирає більше значення.

Наприклад:

    h1 {
        font-size: max(2rem, 5vw);
    }

Тобто font-size не буде меншим за:

    2rem

---

# 73. `clamp()` як комбінація

Концептуально:

    clamp(min, preferred, max)

можна розглядати як:

    min()
    +
    max()

але `clamp()` значно зручніший для читання.

Найчастіше:

    clamp()
    
є хорошим інструментом для fluid typography.

---

# 74. Responsive Typography і CSS Functions

Основні функції:

    clamp()
    min()
    max()
    calc()

Приклади:

    font-size: clamp(2rem, 5vw, 4rem);

    font-size: min(8vw, 5rem);

    font-size: max(2rem, 4vw);

    font-size: calc(1rem + 2vw);

---

# 75. `calc()` для Fluid Typography

Можна:

    h1 {
        font-size: calc(1.5rem + 3vw);
    }

Але:

    calc()

не має автоматичних minimum/maximum.

Тому:

    calc()

може зробити текст надто маленьким або великим.

Часто краще:

    clamp(2rem, calc(1rem + 4vw), 4rem);

---

# 76. Responsive Typography + Web Fonts

Шрифт також впливає на responsive typography.

Наприклад, два шрифти з однаковим:

    font-size: 16px;

можуть мати різну:

    x-height
    character width
    line length
    visual size

Тому після підключення web font потрібно перевіряти:

- line wrapping;
- heading width;
- paragraph width;
- line-height;
- mobile layout.

---

# 77. Font Loading і Typography

Якщо web font завантажується пізніше, браузер може спочатку показати fallback font.

Після завантаження:

    fallback font
        ↓
    web font
        ↓
    text metrics change

Це може вплинути на:

- line wrapping;
- element height;
- layout;
- CLS.

Тому font performance є частиною overall typography performance.

---

# 78. Fallback Fonts

Варто використовувати fallback:

    body {
        font-family:
            "Inter",
            system-ui,
            sans-serif;
    }

Якщо основний font недоступний:

    Inter
      ↓
    system-ui
      ↓
    sans-serif

---

# 79. `font-size-adjust`

Для advanced typography можна зустріти:

    font-size-adjust

Вона допомагає зберігати приблизно подібний perceived text size при fallback fonts.

Наприклад:

    body {
        font-size-adjust: 0.5;
    }

Це advanced feature.

Для Core/Junior достатньо розуміти:

    font-family
    +
    fallback stack
    +
    font loading

---

# 80. Responsive Typography і Browser Zoom

Користувач може збільшити сторінку:

    100%
    ↓
    125%
    ↓
    150%
    ↓
    200%

Layout і typography повинні залишатися usable.

Не можна проектувати typography тільки для:

    100% browser zoom.

---

# 81. Accessibility: не фіксуй все в `px`

Наприклад:

    body {
        font-size: 16px;
    }

не обов'язково є проблемою.

Але системне використання:

    font-size: 12px;

для всього тексту може створити проблеми.

Для масштабованих design systems часто зручно використовувати:

    rem

особливо для typography та spacing.

---

# 82. Responsive Typography і `rem`

Приклад:

    html {
        font-size: 100%;
    }

    body {
        font-size: 1rem;
    }

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

Так browser/user settings мають більше шансів працювати передбачувано.

---

# 83. Не змінюй `html { font-size }` без потреби

Популярний старий підхід:

    html {
        font-size: 62.5%;
    }

щоб:

    1rem = 10px

Наприклад:

    1.6rem = 16px

Це може бути зручно для розрахунків, але змінює root scaling і не є обов'язковим.

Сучасний простий підхід:

    html {
        font-size: 100%;
    }

і:

    1rem ≈ browser default root size

---

# 84. Responsive Typography та Container Queries

Responsive typography може залежати не тільки від viewport.

Наприклад, card може знаходитися:

    desktop page
    ↓
    narrow sidebar

Viewport широкий, але card вузька.

У такому випадку viewport media query може бути не найкращим сигналом.

Для component-level responsiveness існують:

    Container Queries

Наприклад:

    @container (min-width: 400px) {
        .card__title {
            font-size: 1.5rem;
        }
    }

Це окрема сучасна CSS-тема, але важливо знати різницю.

---

# 85. Media Queries vs Container Queries

### Media Query

Орієнтується на viewport/environment:

    @media (min-width: 768px) {
        ...
    }

### Container Query

Орієнтується на розмір container:

    @container (min-width: 400px) {
        ...
    }

Модель:

    Media Query
        ↓
    page / viewport

    Container Query
        ↓
    component / container

---

# 86. Responsive Typography Architecture

Для невеликого проекту:

    body
    h1
    h2
    h3
    p

Для design system:

    --text-xs
    --text-sm
    --text-md
    --text-lg
    --text-xl
    --text-2xl
    --text-3xl
    --text-display

Плюс:

    line-height
    letter-spacing
    spacing
    font-family
    font-weight

---

# 87. Приклад Typography System

    :root {
        --font-body:
            "Inter",
            system-ui,
            sans-serif;

        --text-sm: 0.875rem;
        --text-base: 1rem;
        --text-lg: 1.125rem;

        --text-xl: clamp(1.25rem, 2vw, 1.5rem);
        --text-2xl: clamp(1.5rem, 3vw, 2rem);
        --text-3xl: clamp(2rem, 4vw, 3rem);
        --text-display: clamp(2.5rem, 6vw, 5rem);

        --leading-body: 1.6;
        --leading-heading: 1.1;
    }

    body {
        font-family: var(--font-body);
        font-size: var(--text-base);
        line-height: var(--leading-body);
    }

    h1 {
        font-size: var(--text-display);
        line-height: var(--leading-heading);
        text-wrap: balance;
    }

---

# 88. Практичний Pattern

Для більшості сучасних проектів можна почати приблизно так:

    body {
        font-size: 1rem;
        line-height: 1.6;
    }

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
        line-height: 1.1;
        text-wrap: balance;
    }

    h2 {
        font-size: clamp(1.5rem, 3vw, 2.5rem);
        line-height: 1.2;
        text-wrap: balance;
    }

    h3 {
        font-size: clamp(1.25rem, 2vw, 1.75rem);
        line-height: 1.25;
    }

    p {
        max-width: 65ch;
    }

Це не universal rule, а хороший стартовий pattern.

---

# 89. Типові помилки

## ❌ 1. Занадто великий текст на mobile

    h1 {
        font-size: 64px;
    }

без перевірки mobile.

### Краще:

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

---

## ❌ 2. Використовувати тільки `vw`

    h1 {
        font-size: 8vw;
    }

### Проблема:

Немає minimum/maximum.

### Краще:

    h1 {
        font-size: clamp(2rem, 8vw, 5rem);
    }

---

## ❌ 3. Надто маленький minimum

    font-size: clamp(0.5rem, 2vw, 3rem);

### Проблема:

На mobile текст може бути непрочитним.

---

## ❌ 4. Фіксований `line-height` у px

    h1 {
        font-size: 48px;
        line-height: 48px;
    }

### Краще:

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
        line-height: 1.1;
    }

---

## ❌ 5. Надто довгі рядки

    .article {
        width: 100%;
    }

на широкому desktop.

### Краще:

    .article {
        max-width: 70ch;
    }

---

## ❌ 6. Використовувати `<h1>` тільки через розмір

Не потрібно вибирати heading level через visual size.

### Краще:

    <h1 class="hero__title">
        Main title
    </h1>

    .hero__title {
        font-size: clamp(2rem, 5vw, 4rem);
    }

---

## ❌ 7. Занадто багато media queries

Погано:

    @media (min-width: 375px) { ... }
    @media (min-width: 390px) { ... }
    @media (min-width: 414px) { ... }
    @media (min-width: 430px) { ... }

### Краще:

Використовувати:

    clamp()

для fluid values,

а media queries залишити для справжніх layout changes.

---

## ❌ 8. Змінювати font-size замість layout

Якщо navigation не поміщається:

    не завжди зменшуй font-size

Спочатку перевір:

    gap
    flex-wrap
    layout
    menu structure

---

## ❌ 9. Ігнорувати `max-width`

Навіть хороший font-size може погано читатися, якщо рядок занадто довгий.

---

## ❌ 10. Не тестувати browser zoom

Перевір:

    100%
    125%
    150%
    200%

---

# 90. Debugging Responsive Typography

Якщо текст виглядає погано:

### Крок 1

Перевір:

    font-size

### Крок 2

Перевір:

    line-height

### Крок 3

Перевір:

    max-width

### Крок 4

Перевір:

    letter-spacing

### Крок 5

Перевір:

    font-family

### Крок 6

Перевір:

    wrapping

### Крок 7

Перевір:

    browser zoom

### Крок 8

Перевір mobile/tablet/desktop.

---

# 91. Практичний Debugging Example

Погано:

    .hero__title {
        font-size: 64px;
        line-height: 64px;
        width: 100%;
    }

Можливі проблеми:

    font-size
    ↓
    too large on mobile

    line-height
    ↓
    too rigid

    width
    ↓
    uncontrolled line length

Покращення:

    .hero__title {
        max-width: 15ch;
        font-size: clamp(2rem, 6vw, 4rem);
        line-height: 1.1;
        text-wrap: balance;
    }

---

# 92. Responsive Typography Checklist

Перед завершенням сторінки перевір:

    [ ] body text readable on mobile
    [ ] headings do not overflow
    [ ] headings have reasonable line-height
    [ ] paragraphs have reasonable max-width
    [ ] typography scales smoothly
    [ ] minimum font sizes are reasonable
    [ ] maximum font sizes are controlled
    [ ] browser zoom works
    [ ] font fallback works
    [ ] mobile layout works
    [ ] tablet layout works
    [ ] desktop layout works
    [ ] headings remain semantically correct
    [ ] contrast is sufficient
    [ ] long words do not break layout

---

# 93. Core

На рівні Core потрібно знати:

    font-size
    line-height
    font-family
    font-weight
    letter-spacing

та одиниці:

    px
    rem
    em
    vw

Також:

    max-width
    text-wrap

---

# 94. Junior

Потрібно вміти:

    clamp()
    min()
    max()
    calc()

розуміти:

    fluid typography
    typography scale
    max-width: 65ch
    mobile-first typography
    media queries
    CSS custom properties

і створювати:

    responsive headings
    responsive paragraphs
    responsive hero typography

---

# 95. Middle

Потрібно розуміти:

    design tokens
    typography systems
    fluid spacing
    fluid type scales
    web font metrics
    fallback fonts
    CLS
    font loading
    accessibility
    container queries
    typography performance

---

# 96. Senior

Потрібно вміти проектувати:

    design system
        ↓
    typography tokens
        ↓
    responsive scale
        ↓
    font loading strategy
        ↓
    accessibility
        ↓
    performance
        ↓
    component architecture

А також розуміти:

- variable fonts;
- font subsetting;
- font-display;
- Core Web Vitals;
- container queries;
- internationalization;
- different writing systems;
- dynamic content;
- accessibility scaling.

---

# 97. Питання зі співбесіди

### 1. Що таке Responsive Typography?

Типографіка, яка адаптується до різних viewport і layout conditions, зберігаючи читабельність і hierarchy.

---

### 2. Що таке Fluid Typography?

Typography, яка плавно змінює розмір між minimum і maximum значеннями.

Наприклад:

    font-size: clamp(2rem, 5vw, 4rem);

---

### 3. Що робить `clamp()`?

Обмежує значення між:

    minimum
    preferred
    maximum

---

### 4. Чим `rem` відрізняється від `em`?

`rem` відноситься до root font-size.

`em` залежить від current context.

---

### 5. Для чого використовують `vw`?

Для значень, пов'язаних із шириною viewport.

---

### 6. Чому `clamp()` часто кращий за чистий `vw`?

Тому що він дозволяє встановити minimum і maximum.

---

### 7. Чому `line-height` важливий?

Він визначає вертикальну відстань між рядками і безпосередньо впливає на readability.

---

### 8. Чому часто використовують unitless `line-height`?

Наприклад:

    line-height: 1.5;

Він масштабується разом із font-size.

---

### 9. Для чого `max-width: 65ch`?

Для обмеження довжини текстового рядка та покращення readability.

---

### 10. Що робить `text-wrap: balance`?

Допомагає браузеру створювати більш збалансовані рядки, особливо для headings.

---

### 11. Чи потрібно робити весь текст fluid?

Ні.

Найчастіше fluid scaling найбільш корисний для великих headings/display text.

---

### 12. Чи замінює `clamp()` media queries?

Ні.

`clamp()` добре підходить для fluid values, а media queries потрібні для layout та breakpoint-specific changes.

---

### 13. Що таке typography scale?

Система взаємопов'язаних розмірів тексту:

    body
    small
    h4
    h3
    h2
    h1
    display

---

### 14. Чому потрібно обмежувати ширину paragraph?

Тому що надто довгі рядки складніше читати.

---

### 15. Що таке Mobile First Typography?

Побудова typography від mobile base styles із поступовим розширенням для більших viewport.

---

# 98. Міні-шпаргалка

## Основний responsive heading

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
        line-height: 1.1;
    }

---

## Responsive heading + wrapping

    h1 {
        max-width: 15ch;
        font-size: clamp(2rem, 5vw, 4rem);
        line-height: 1.1;
        text-wrap: balance;
    }

---

## Responsive paragraph

    p {
        max-width: 65ch;
        font-size: 1rem;
        line-height: 1.6;
    }

---

## Responsive spacing

    section {
        padding-block: clamp(3rem, 8vw, 8rem);
    }

---

## CSS variables

    :root {
        --text-base: 1rem;
        --text-h1: clamp(2rem, 5vw, 4rem);
        --leading-body: 1.6;
        --leading-heading: 1.1;
    }

---

## `rem`

    1rem
    2rem
    3rem

Відноситься до root font-size.

---

## `em`

    1em
    1.5em
    2em

Відноситься до current context.

---

## `vw`

    1vw
    5vw
    10vw

Залежить від ширини viewport.

---

## `clamp()`

    clamp(
        minimum,
        preferred,
        maximum
    )

Наприклад:

    clamp(2rem, 5vw, 4rem)

---

## `min()`

    font-size: min(8vw, 5rem);

---

## `max()`

    font-size: max(2rem, 5vw);

---

## `calc()`

    font-size: calc(1rem + 2vw);

---

## Media Query

    h1 {
        font-size: 2rem;
    }

    @media (min-width: 768px) {
        h1 {
            font-size: 3rem;
        }
    }

---

# 99. Головна модель мислення

Не думай:

    Mobile → 32px
    Tablet → 48px
    Desktop → 64px

тільки як набір breakpoint values.

Думай:

    minimum
        ↓
    fluid scaling
        ↓
    maximum

Наприклад:

    clamp(2rem, 5vw, 4rem)

---

# 100. Формула хорошої Responsive Typography

    readable font-size
            +
    appropriate line-height
            +
    controlled line length
            +
    responsive scaling
            +
    semantic HTML
            +
    accessible contrast
            +
    browser zoom support
            +
    responsive spacing
            ↓
    good typography

---

# 101. Головне

1. **Responsive Typography — це не тільки зміна `font-size`.**

2. **`rem` зручний для системної typography.**

3. **`em` залежить від контексту.**

4. **`vw` дозволяє створювати fluid values.**

5. **Чистий `vw` часто потребує minimum і maximum.**

6. **`clamp()` — один із головних інструментів Fluid Typography.**

7. **`clamp(min, preferred, max)` задає межі fluid value.**

8. **Unitless `line-height` добре працює з responsive font-size.**

9. **`max-width: 65ch` допомагає контролювати довжину текстового рядка.**

10. **`text-wrap: balance` особливо корисний для headings.**

11. **Не весь текст повинен бути fluid.**

12. **Body text часто може залишатися приблизно стабільним.**

13. **Великі headings добре підходять для `clamp()`.**

14. **Media queries потрібні не тільки для typography, а й для layout changes.**

15. **`clamp()` не замінює media queries повністю.**

16. **Typography повинна працювати з browser zoom.**

17. **Не потрібно забороняти користувачу масштабування сторінки.**

18. **Semantic HTML важливіший за visual font size.**

19. **Responsive typography повинна враховувати accessibility.**

20. **Хороша typography — це баланс між розміром тексту, line-height, шириною рядка, spacing і responsive behavior.**

---

# 102. Що потрібно вміти після цієї теми

Після вивчення `05-responsive-typography` ти повинен уміти:

    1. Використовувати rem та em
              ↓
    2. Розуміти vw
              ↓
    3. Використовувати clamp()
              ↓
    4. Створювати fluid headings
              ↓
    5. Налаштовувати responsive line-height
              ↓
    6. Контролювати ширину paragraph через ch
              ↓
    7. Використовувати text-wrap: balance
              ↓
    8. Створювати typography scale
              ↓
    9. Використовувати CSS custom properties
              ↓
    10. Поєднувати clamp() з media queries
              ↓
    11. Враховувати accessibility
              ↓
    12. Тестувати typography на mobile/tablet/desktop
              ↓
    13. Перевіряти browser zoom
              ↓
    14. Будувати послідовну responsive typography system

І головний принцип:

> **Responsive Typography — це не просто зробити шрифт меншим на mobile. Це побудувати систему тексту, яка плавно масштабується, зберігає читабельність, правильну ієрархію та працює разом із responsive layout.**