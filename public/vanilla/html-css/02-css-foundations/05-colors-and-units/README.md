## 05. Colors and Units

CSS використовує **кольори** для керування візуальним оформленням елементів, а **одиниці вимірювання** — для визначення розмірів, відступів, шрифтів, відстаней та інших величин.

Кольори найчастіше використовуються для:

- `color` — колір тексту;
- `background-color` — колір фону;
- `border-color` — колір рамки;
- `box-shadow` — колір тіні;
- `text-shadow` — колір тіні тексту;
- `outline-color` — колір outline;
- SVG-властивостей `fill` і `stroke`.

Одиниці вимірювання використовуються для:

- ширини та висоти;
- `margin` і `padding`;
- `font-size`;
- `line-height`;
- позиціонування;
- відстаней між елементами;
- адаптивного дизайну;
- розмірів, залежних від viewport або батьківського елемента.

Головна ідея:

> **Колір визначає, як елемент виглядає, а одиниця визначає, наскільки великим або віддаленим він є.**

---

### Основні групи кольорів

CSS підтримує кілька способів запису кольорів:

- keyword;
- HEX;
- RGB;
- RGBA;
- HSL;
- HSLA;
- HWB;
- `currentColor`;
- CSS custom properties;
- сучасні color spaces — `oklab`, `oklch`, `lab`, `lch`.

Приклади:

    color: red;
    color: #ff0000;
    color: rgb(255 0 0);
    color: hsl(0 100% 50%);
    color: oklch(62% 0.25 29);

---

### Основні групи одиниць

**Абсолютні:**

- `px`
- `cm`
- `mm`
- `Q`
- `in`
- `pt`
- `pc`

**Відносні до шрифту:**

- `em`
- `rem`
- `ex`
- `ch`
- `cap`
- `lh`
- `rlh`

**Відносні до viewport:**

- `vw`
- `vh`
- `vmin`
- `vmax`
- `vi`
- `vb`
- `svw`, `svh`
- `lvw`, `lvh`
- `dvw`, `dvh`

**Відносні до контейнера:**

- `cqw`
- `cqh`
- `cqi`
- `cqb`
- `cqmin`
- `cqmax`

**Безрозмірні значення:**

- `0`
- `1.5`
- `2`
- `0.75`

---

---

### Ключові поняття

- `color` — колір тексту.
- `background-color` — колір фону.
- `border-color` — колір рамки.
- `opacity` — прозорість елемента.
- `transparent` — прозорий колір.
- `currentColor` — поточне значення `color`.
- `inherit` — взяти значення від батьківського елемента.
- `px` — CSS pixel.
- `rem` — відносно `font-size` кореневого елемента.
- `em` — відносно `font-size` поточного контексту.
- `%` — відносна одиниця, залежна від конкретної властивості.
- `vw` / `vh` — відносно viewport.
- `vmin` / `vmax` — відносно меншої або більшої сторони viewport.
- `dvh` / `dvw` — dynamic viewport.
- `cqw` / `cqh` — відносно розміру container.
- `calc()` — математичні обчислення.
- `min()` — вибір найменшого значення.
- `max()` — вибір найбільшого значення.
- `clamp()` — значення між мінімумом і максимумом.

---

### Що потрібно пам'ятати

1. `px` — не те саме, що фізичний піксель екрана.
2. `rem` залежить від `font-size` кореневого елемента.
3. `em` залежить від `font-size` поточного елемента/контексту.
4. `%` не завжди означає відсоток від ширини батька — залежність визначає конкретна CSS-властивість.
5. `vw` і `vh` залежать від viewport.
6. `dvh` корисний для мобільних браузерів із динамічними панелями.
7. `0` часто можна записувати без одиниці.
8. `font-size: 0` — валідно, але це зовсім інше значення.
9. `rem` зручний для масштабування типографіки.
10. `em` корисний для компонентів, які повинні масштабуватися разом зі своїм шрифтом.
11. `currentColor` дозволяє синхронізувати колір різних властивостей.
12. `opacity` впливає на весь елемент разом із його дочірніми елементами.
13. HEX, RGB, HSL — різні способи описати колір.
14. `rgba()` як окремий синтаксис більше не обов'язковий — сучасний синтаксис `rgb()` підтримує alpha.
15. `hsl()` зручний для роботи з відтінком, насиченістю та світлістю.
16. `oklch()` добре підходить для сучасних дизайн-систем і керування perceptual lightness.
17. `calc()` дозволяє комбінувати різні одиниці.
18. `clamp()` дуже корисний для responsive typography.
19. Не потрібно використовувати `px` абсолютно всюди.
20. Для сучасного responsive CSS найчастіше комбінують `rem`, `%`, `vw`/`vh`, `clamp()`, `min()`, `max()` та container units.

---

# 1. CSS Color

Колір у CSS задається значенням, яке передається відповідній властивості.

Найпростіший приклад:

    p {
        color: blue;
    }

    .box {
        background-color: lightgray;
    }

Тут:

- `color` змінює колір тексту;
- `background-color` змінює колір фону.

---

# 2. Color Keywords

CSS має набір іменованих кольорів.

    color: red;
    color: blue;
    color: green;
    color: black;
    color: white;
    color: orange;
    color: purple;
    color: gray;

Також існують сотні стандартних CSS color keywords.

Наприклад:

    color: tomato;
    color: coral;
    color: gold;
    color: navy;
    color: teal;
    color: olive;

### Переваги

Добре читається:

    color: tomato;

### Недоліки

Має обмежену точність.

Якщо потрібен конкретний колір дизайн-системи, краще використовувати HEX, RGB, HSL або сучасні color spaces.

---

# 3. HEX

HEX — один із найпоширеніших форматів кольору в CSS.

    color: #ff0000;

Формат:

    #RRGGBB

де:

- `RR` — red;
- `GG` — green;
- `BB` — blue.

Кожна пара має значення від:

    00

до:

    FF

---

## 3.1. Основні HEX-кольори

    #ff0000  /* red */
    #00ff00  /* green */
    #0000ff  /* blue */
    #000000  /* black */
    #ffffff  /* white */

---

## 3.2. Скорочений HEX

Якщо кожна пара складається з однакових символів, можна скоротити запис.

    #ffffff

можна записати:

    #fff

А:

    #ff0000

як:

    #f00

---

## 3.3. HEX з alpha

Сучасний CSS підтримує 8-значний HEX:

    #RRGGBBAA

Наприклад:

    background-color: #00000080;

Останні два символи визначають alpha.

Приклад:

    #00000000  /* повністю прозорий */
    #00000080  /* приблизно 50% */
    #000000ff  /* повністю непрозорий */

---

# 4. RGB

RGB означає:

- Red;
- Green;
- Blue.

Класичний запис:

    color: rgb(255, 0, 0);

Сучасний синтаксис:

    color: rgb(255 0 0);

---

## 4.1. Значення RGB

Кожен канал описує інтенсивність кольору.

    rgb(255 0 0)

означає:

- red = `255`;
- green = `0`;
- blue = `0`.

Результат — червоний.

Інші приклади:

    rgb(0 255 0)
    rgb(0 0 255)
    rgb(255 255 255)
    rgb(0 0 0)

---

## 4.2. RGB з прозорістю

Сучасний синтаксис:

    background-color: rgb(0 0 0 / 50%);

Або:

    background-color: rgb(0 0 0 / 0.5);

Тут:

    / 50%

означає alpha = 50%.

---

# 5. HSL

HSL:

- Hue — відтінок;
- Saturation — насиченість;
- Lightness — світлість.

Приклад:

    color: hsl(0 100% 50%);

Це червоний.

---

## 5.1. Hue

Hue задається кутом:

    0deg
    60deg
    120deg
    180deg
    240deg
    300deg

Наприклад:

    hsl(0 100% 50%)
    hsl(120 100% 50%)
    hsl(240 100% 50%)

---

## 5.2. Saturation

Saturation визначає інтенсивність кольору.

    hsl(200 100% 50%)

Максимальна насиченість:

    100%

Без насиченості:

    0%

---

## 5.3. Lightness

Lightness:

    0%

означає чорний.

    100%

означає білий.

Наприклад:

    hsl(200 100% 50%)
    hsl(200 100% 30%)
    hsl(200 100% 70%)

Змінюючи lightness, можна створювати темніші та світліші варіанти одного відтінку.

---

# 6. HSL з Alpha

Сучасний синтаксис:

    background-color: hsl(200 100% 50% / 50%);

Або:

    background-color: hsl(200 100% 50% / 0.5);

---

# 7. HWB

HWB:

- Hue;
- Whiteness;
- Blackness.

Приклад:

    color: hwb(200 10% 20%);

HWB може бути зручним для створення відтінків через додавання білого та чорного.

---

# 8. Modern Color Spaces

Сучасний CSS підтримує додаткові колірні простори:

- `lab()`;
- `lch()`;
- `oklab()`;
- `oklch()`.

Особливо корисний:

    oklch()

Наприклад:

    color: oklch(60% 0.2 30);

Тут:

- `60%` — lightness;
- `0.2` — chroma;
- `30` — hue.

---

# 9. OKLCH

`oklch()` часто використовують у сучасних дизайн-системах.

Наприклад:

    :root {
        --primary: oklch(60% 0.2 250);
    }

Перевага — зручніше створювати палітру кольорів із передбачуваними змінами світлоти.

Наприклад:

    :root {
        --blue-300: oklch(80% 0.15 250);
        --blue-500: oklch(60% 0.20 250);
        --blue-700: oklch(40% 0.18 250);
    }

---

# 10. Transparent

`transparent` — спеціальне значення прозорого кольору.

    background-color: transparent;

Часто використовується для кнопок:

    button {
        background-color: transparent;
    }

---

# 11. Alpha та Transparency

Alpha визначає прозорість кольору.

    rgb(0 0 0 / 1)

повністю непрозорий.

    rgb(0 0 0 / 0.5)

50% прозорості.

    rgb(0 0 0 / 0)

повністю прозорий.

---

# 12. Opacity

`opacity` задає прозорість самого елемента.

    .card {
        opacity: 0.5;
    }

Значення:

    0

— повністю прозорий.

    1

— повністю непрозорий.

---

## 12.1. Opacity ≠ Alpha

Це дуже важлива різниця.

    .box {
        background-color: rgb(0 0 0 / 50%);
    }

Тут прозорий саме фон.

А:

    .box {
        opacity: 0.5;
    }

Тут прозорим стає весь елемент разом із:

- текстом;
- background;
- border;
- дочірніми елементами;
- іншими візуальними частинами.

---

# 13. currentColor

`currentColor` — спеціальне CSS-значення, яке посилається на поточне значення властивості `color`.

Приклад:

    .icon {
        color: blue;
        border: 2px solid currentColor;
    }

Рамка автоматично буде синьою.

---

## 13.1. Іконка та текст

Це особливо зручно для SVG:

    .button {
        color: #2563eb;
    }

    .button svg {
        fill: currentColor;
    }

Текст і іконка використовують один колір.

---

## 13.2. currentColor і inheritance

Оскільки `color` зазвичай успадковується:

    body {
        color: #222;
    }

    .icon {
        color: inherit;
        border-color: currentColor;
    }

Компонент може автоматично використовувати колір батьківського контексту.

---

# 14. CSS Custom Properties для кольорів

Для дизайн-систем зручно використовувати CSS variables.

    :root {
        --color-primary: #2563eb;
        --color-secondary: #64748b;
        --color-danger: #dc2626;
        --color-background: #ffffff;
        --color-text: #222222;
    }

Використання:

    body {
        color: var(--color-text);
        background-color: var(--color-background);
    }

    button {
        background-color: var(--color-primary);
    }

---

# 15. Color Tokens

У великих проєктах кольори часто організовують як design tokens.

    :root {
        --color-blue-500: #3b82f6;
        --color-blue-700: #1d4ed8;

        --color-gray-100: #f3f4f6;
        --color-gray-700: #374151;

        --color-success: #16a34a;
        --color-danger: #dc2626;
    }

Потім:

    .button-primary {
        background-color: var(--color-blue-500);
    }

    .button-primary:hover {
        background-color: var(--color-blue-700);
    }

Це набагато простіше підтримувати, ніж десятки повторюваних HEX-значень.

---

# 16. Що таке CSS Unit

CSS unit — одиниця вимірювання.

Наприклад:

    width: 300px;

Тут:

- `300` — число;
- `px` — одиниця.

Але деякі CSS-властивості приймають числа без одиниці:

    opacity: 0.5;
    line-height: 1.5;
    flex-grow: 1;
    z-index: 10;

---

# 17. 0 без одиниці

Для нульового значення одиницю зазвичай можна не писати.

    margin: 0;

замість:

    margin: 0px;

Наприклад:

    padding: 0;
    border-width: 0;
    top: 0;
    left: 0;

Це стандартний стиль запису.

---

# 18. Pixels — px

`px` — CSS pixel.

    width: 300px;
    padding: 20px;
    border: 1px solid black;

`px` дуже поширений для:

- border;
- icon size;
- small spacing;
- точних UI-значень;
- деяких fixed dimensions.

---

## 18.1. CSS px ≠ фізичний pixel

CSS pixel — логічна одиниця.

На дисплеї з високою pixel density один CSS pixel може відповідати кільком фізичним пікселям.

Тому:

    width: 100px;

не означає буквально 100 фізичних пікселів матриці.

---

# 19. Percentages — %

`%` — відносна одиниця.

Наприклад:

    .container {
        width: 80%;
    }

Елемент займає 80% відповідного reference size.

Але важливо:

> `%` залежить від конкретної CSS-властивості.

Наприклад:

    width: 50%;

зазвичай розраховується від ширини containing block.

А:

    height: 50%;

залежить від доступної/визначеної висоти containing block.

---

# 20. Percentage для Padding

Важливий нюанс:

    .box {
        padding-top: 10%;
    }

Для padding percentage історично розраховується від **ширини containing block**, а не від його висоти.

Це одна з причин, чому `%` потрібно розуміти в контексті конкретної властивості, а не сприймати просто як "відсоток від батька".

---

# 21. rem

`rem` означає:

> root em

Тобто одиниця залежить від `font-size` кореневого елемента — зазвичай `html`.

Наприклад:

    html {
        font-size: 16px;
    }

    .title {
        font-size: 2rem;
    }

Результат:

    2rem = 32px

---

# 22. rem для Typography

Наприклад:

    html {
        font-size: 16px;
    }

    h1 {
        font-size: 2rem;
    }

    h2 {
        font-size: 1.5rem;
    }

    p {
        font-size: 1rem;
    }

Отримаємо:

    h1 → 32px
    h2 → 24px
    p  → 16px

---

# 23. Чому rem зручний

Якщо базовий розмір змінити:

    html {
        font-size: 18px;
    }

то:

    1rem = 18px
    2rem = 36px
    1.5rem = 27px

Таким чином, масштабування системи стає простішим.

---

# 24. em

`em` — відносна одиниця, пов'язана з `font-size`.

Наприклад:

    .parent {
        font-size: 20px;
    }

    .child {
        font-size: 2em;
    }

Тоді:

    2em = 40px

---

# 25. em для Component Spacing

`em` особливо корисний, коли внутрішні відступи повинні масштабуватися разом із текстом.

    .button {
        font-size: 1rem;
        padding: 0.75em 1.25em;
    }

Якщо `font-size` кнопки збільшиться, padding теж збільшиться пропорційно.

---

# 26. rem vs em

### rem

Залежить від root font-size.

    padding: 1rem;

### em

Залежить від font-size відповідного контексту.

    padding: 1em;

Тому:

**rem** часто використовують для глобальної системи spacing та typography.

**em** часто використовують усередині компонентів, де розмір повинен масштабуватися разом із текстом.

---

# 27. em може накопичуватися

Це важливий нюанс.

    .parent {
        font-size: 1.2em;
    }

    .child {
        font-size: 1.2em;
    }

При глибокій вкладеності `em` може накопичувати ефект.

Наприклад:

    html → 16px
    parent → 19.2px
    child → 23.04px

Тому для глобальної типографіки `rem` часто передбачуваніший.

---

# 28. rem vs em — практичний приклад

    html {
        font-size: 16px;
    }

    .card {
        font-size: 1rem;
    }

    .card-title {
        font-size: 1.5rem;
    }

    .card-button {
        font-size: 1rem;
        padding: 0.75em 1.5em;
    }

Тут:

- typography використовує `rem`;
- внутрішній padding кнопки використовує `em`.

Це хороший практичний патерн.

---

# 29. line-height

`line-height` може використовувати безрозмірне число:

    p {
        line-height: 1.5;
    }

Це означає:

> line-height = 1.5 × font-size

Якщо:

    font-size: 16px;

то:

    line-height: 24px;

---

## 29.1. Чому unitless line-height хороший

Наприклад:

    body {
        line-height: 1.5;
    }

Якщо дочірній елемент має:

    font-size: 24px;

він отримає:

    24 × 1.5 = 36px

Тому unitless `line-height` добре масштабується.

---

# 30. line-height: px vs unitless

Не завжди добре:

    body {
        line-height: 24px;
    }

Якщо дочірній елемент:

    h1 {
        font-size: 40px;
    }

Фіксований `24px` може бути занадто малим.

Краще:

    body {
        line-height: 1.5;
    }

Тоді кожен елемент отримує line-height відповідно до свого font-size.

---

# 31. ch

`ch` приблизно відповідає ширині символу `0` поточного шрифту.

Наприклад:

    .article {
        max-width: 65ch;
    }

Це дуже корисно для читабельності тексту.

Типовий практичний патерн:

    .article {
        max-width: 65ch;
    }

Таким чином довгі рядки не розтягуються на всю ширину екрана.

---

# 32. ex

`ex` приблизно пов'язана з x-height поточного шрифту.

    font-size: 2ex;

Використовується значно рідше, ніж:

- `px`;
- `rem`;
- `em`;
- `%`;
- `ch`.

---

# 33. Viewport Units

Viewport — видима область браузера.

Основні одиниці:

    vw
    vh
    vmin
    vmax

---

# 34. vw

`1vw` = 1% ширини viewport.

Наприклад:

    width: 50vw;

означає приблизно 50% ширини viewport.

---

# 35. vh

`1vh` = 1% висоти viewport.

Наприклад:

    min-height: 100vh;

означає висоту приблизно на весь viewport.

---

# 36. vmin

`vmin` використовує меншу сторону viewport.

Наприклад:

    width: 50vmin;

На portrait:

    vmin = ширина viewport

На landscape:

    vmin = висота viewport

---

# 37. vmax

`vmax` використовує більшу сторону viewport.

    width: 50vmax;

---

# 38. Проблема 100vh на Mobile

На мобільних пристроях browser UI може змінювати доступну висоту viewport.

Тому:

    min-height: 100vh;

не завжди дає очікуваний результат.

Сучасний CSS має додаткові viewport units.

---

# 39. svh

`svh` — small viewport height.

    min-height: 100svh;

Корисно, коли потрібно орієнтуватися на найменший доступний viewport.

---

# 40. lvh

`lvh` — large viewport height.

    min-height: 100lvh;

Відповідає великому viewport, коли browser UI максимально схований.

---

# 41. dvh

`dvh` — dynamic viewport height.

    min-height: 100dvh;

Він динамічно реагує на зміни viewport.

Для сучасних fullscreen mobile layout часто корисно:

    .hero {
        min-height: 100dvh;
    }

---

# 42. Container Query Units

Сучасний CSS має одиниці, пов'язані не з viewport, а з container.

Основні:

    cqw
    cqh
    cqi
    cqb
    cqmin
    cqmax

Наприклад:

    .card-title {
        font-size: 5cqw;
    }

Розмір залежить від ширини query container.

Це особливо корисно для component-based responsive design.

---

# 43. Container Units vs Viewport Units

Viewport:

    5vw

залежить від viewport.

Container:

    5cqw

залежить від розміру container.

Це важлива концептуальна різниця.

Viewport responsive:

    screen → component

Container responsive:

    component → own container

---

# 44. Absolute Units

CSS має абсолютні одиниці:

    px
    cm
    mm
    Q
    in
    pt
    pc

Але в web development найчастіше використовують:

    px

Іноді інші одиниці можуть бути корисними для print styles.

---

# 45. calc()

`calc()` дозволяє виконувати математичні обчислення.

    width: calc(100% - 40px);

Наприклад:

    .container {
        width: calc(100% - 32px);
    }

---

# 46. calc() з різними одиницями

Одна з головних переваг `calc()` — можна комбінувати різні типи одиниць.

    width: calc(100% - 40px);

Або:

    min-height: calc(100vh - 80px);

Або:

    padding: calc(1rem + 10px);

---

# 47. calc() для Layout

Наприклад, header має висоту 80px:

    .main {
        min-height: calc(100dvh - 80px);
    }

Це дозволяє зайняти доступний простір без hardcoded height всього layout.

---

# 48. min()

`min()` повертає найменше значення.

    width: min(100%, 1200px);

Це дуже корисний pattern для контейнера.

Наприклад:

    .container {
        width: min(100% - 32px, 1200px);
        margin-inline: auto;
    }

Ідея:

- на маленькому екрані контейнер займає доступну ширину;
- на великому не перевищує `1200px`.

---

# 49. max()

`max()` повертає найбільше значення.

    width: max(300px, 50%);

Це означає:

> використовувати не менше 300px, але якщо 50% більше — використовувати 50%.

---

# 50. clamp()

`clamp()` має три аргументи:

    clamp(minimum, preferred, maximum)

Наприклад:

    font-size: clamp(1.5rem, 4vw, 3rem);

Тобто:

- мінімум = `1.5rem`;
- preferred = `4vw`;
- максимум = `3rem`.

---

# 51. clamp() для Responsive Typography

Один із найкорисніших сучасних патернів:

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

Замість великої кількості media queries розмір може плавно змінюватися разом із viewport.

---

# 52. clamp() для Spacing

Можна використовувати не тільки для шрифтів:

    .section {
        padding-block: clamp(2rem, 6vw, 6rem);
    }

---

# 53. calc() + clamp()

Можна комбінувати функції:

    font-size: clamp(1rem, calc(0.8rem + 1vw), 1.5rem);

Це дає більше контролю над fluid typography.

---

# 54. Типовий Responsive Container

Один із практичних варіантів:

    .container {
        width: min(100% - 2rem, 1200px);
        margin-inline: auto;
    }

Тут:

- `100% - 2rem` залишає бокові відступи;
- `1200px` обмежує максимальну ширину;
- `margin-inline: auto` центрує контейнер.

---

# 55. Responsive Typography

Наприклад:

    html {
        font-size: 16px;
    }

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

    h2 {
        font-size: clamp(1.5rem, 3vw, 2.5rem);
    }

    p {
        font-size: 1rem;
        line-height: 1.6;
    }

---

# 56. Fluid Spacing

Можна створити fluid spacing:

    .section {
        padding-block: clamp(2rem, 5vw, 6rem);
    }

Замість:

    @media (max-width: 768px) {
        .section {
            padding: 2rem;
        }
    }

    @media (min-width: 769px) {
        .section {
            padding: 6rem;
        }
    }

`clamp()` дозволяє отримати плавну зміну.

---

# 57. Inherit для кольорів

Оскільки `color` успадковується:

    body {
        color: #222;
    }

Дочірні елементи автоматично отримають цей колір.

Можна явно вказати:

    a {
        color: inherit;
    }

Це особливо корисно для посилань усередині компонентів.

---

# 58. CSS Color + Inheritance

Приклад:

    .card {
        color: #222;
    }

    .card-title {
        color: inherit;
    }

    .card-icon {
        color: inherit;
        fill: currentColor;
    }

Таким чином текст і SVG можуть використовувати один колір.

---

# 59. Colors та Accessibility

Колір не повинен бути єдиним способом передавання інформації.

Погано:

    .status {
        color: red;
    }

Користувач має зрозуміти значення тільки за кольором.

Краще:

    <span class="status status-error">
        Помилка: неправильний пароль
    </span>

Колір може доповнювати інформацію, але не повинен бути єдиним носієм змісту.

---

# 60. Контраст

Для тексту потрібно забезпечувати достатній контраст між:

- foreground;
- background.

Наприклад:

    color: #222;
    background-color: #fff;

зазвичай дає хороший контраст.

А:

    color: #aaa;
    background-color: #fff;

може бути недостатньо контрастним для основного тексту.

---

# 61. Не покладатися тільки на HEX

Не потрібно думати:

> "Accessibility = вибрати правильний HEX."

Потрібно перевіряти фактичний контраст конкретної пари:

    foreground + background

Наприклад:

    color: #ffffff;
    background: #2563eb;

Ця пара повинна перевірятися як готовий UI-компонент.

---

# 62. Color Scheme

CSS підтримує:

    color-scheme

Наприклад:

    :root {
        color-scheme: light dark;
    }

Це повідомляє браузеру, що сторінка підтримує світлу та темну схеми.

---

# 63. prefers-color-scheme

Можна реагувати на системну тему:

    @media (prefers-color-scheme: dark) {
        :root {
            --color-background: #111;
            --color-text: #fff;
        }
    }

Наприклад:

    :root {
        --color-background: #fff;
        --color-text: #222;
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --color-background: #111;
            --color-text: #eee;
        }
    }

---

# 64. CSS Variables для Light/Dark Theme

Практичний pattern:

    :root {
        --color-bg: #ffffff;
        --color-text: #222222;
        --color-primary: #2563eb;
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --color-bg: #111827;
            --color-text: #f9fafb;
            --color-primary: #60a5fa;
        }
    }

    body {
        color: var(--color-text);
        background-color: var(--color-bg);
    }

---

# 65. Практичний приклад: Card

HTML:

    <article class="card">
        <h2 class="card__title">CSS Colors</h2>
        <p class="card__text">
            Вивчаємо кольори та одиниці CSS.
        </p>
        <a class="card__link" href="#">
            Детальніше
        </a>
    </article>

CSS:

    .card {
        color: #222;
        background-color: #fff;
        padding: 1.5rem;
        border: 1px solid #ddd;
        border-radius: 0.75rem;
    }

    .card__title {
        font-size: 1.5rem;
        margin-bottom: 0.75rem;
    }

    .card__text {
        line-height: 1.6;
    }

    .card__link {
        color: #2563eb;
    }

---

# 66. Практичний приклад: Responsive Hero

    .hero {
        min-height: 100dvh;
        padding: clamp(2rem, 6vw, 6rem);
        display: grid;
        place-items: center;
    }

    .hero__title {
        font-size: clamp(2rem, 6vw, 5rem);
    }

    .hero__text {
        max-width: 65ch;
        font-size: clamp(1rem, 2vw, 1.25rem);
        line-height: 1.6;
    }

Тут використано:

- `dvh`;
- `clamp()`;
- `vw`;
- `ch`;
- `rem`.

---

# 67. Практичний приклад: Button

    .button {
        color: #fff;
        background-color: #2563eb;
        padding: 0.75em 1.25em;
        border: 0;
        border-radius: 0.5rem;
        font-size: 1rem;
    }

    .button:hover {
        background-color: #1d4ed8;
    }

`em` для padding дозволяє кнопці масштабуватися разом із текстом.

---

# 68. Практичний приклад: Color System

    :root {
        --color-primary: oklch(60% 0.2 250);
        --color-primary-dark: oklch(45% 0.18 250);

        --color-text: oklch(25% 0 0);
        --color-background: oklch(98% 0 0);

        --space-1: 0.25rem;
        --space-2: 0.5rem;
        --space-3: 0.75rem;
        --space-4: 1rem;
        --space-6: 1.5rem;
        --space-8: 2rem;
    }

    .button {
        color: white;
        background-color: var(--color-primary);
        padding: var(--space-3) var(--space-4);
    }

---

# 69. Практичний приклад: Container

    .container {
        width: min(100% - 2rem, 1200px);
        margin-inline: auto;
    }

Це один із найкорисніших patterns для реальних сайтів.

---

# 70. Практичний приклад: Readable Content

    .content {
        width: min(100% - 2rem, 70ch);
        margin-inline: auto;
    }

Тут:

- `100% - 2rem` — бокові відступи;
- `70ch` — обмеження ширини тексту;
- `auto` — центрування.

---

# 71. Практичний приклад: Fluid Layout

    .section {
        padding-block: clamp(2rem, 5vw, 6rem);
        padding-inline: max(1rem, 4vw);
    }

Це дозволяє:

- мати мінімальний padding;
- збільшувати його на великих екранах;
- уникати надмірних відступів.

---

# 72. CSS Unit не визначає однаково всі властивості

Дуже важливо:

> Одна й та сама одиниця може мати різний reference context залежно від властивості.

Наприклад:

    width: 50%;

і:

    font-size: 50%;

не означають одне й те саме.

Тому завжди потрібно знати:

1. яка властивість;
2. яка одиниця;
3. від чого вона обчислюється.

---

# 73. Inheritance ≠ Percentage

Не потрібно плутати:

    font-size: 1rem;

і:

    font-size: 100%;

`rem` залежить від root font-size.

`%` для `font-size` залежить від font-size батьківського елемента.

---

# 74. Inheritance ≠ em

Також:

    font-size: 1em;

не означає "успадкувати font-size".

`em` — це відносне обчислення.

А:

    font-size: inherit;

означає:

> взяти значення font-size від батька.

Це принципово різні механізми.

---

# 75. em vs inherit

Наприклад:

    .parent {
        font-size: 20px;
    }

    .child {
        font-size: 1em;
    }

`1em` розраховується відповідно до контексту font-size.

А:

    .child {
        font-size: inherit;
    }

явно бере значення батька.

---

# 76. Absolute vs Relative Units

### Абсолютні

    px
    cm
    mm
    in
    pt
    pc

### Відносні до font-size

    em
    rem
    ex
    ch
    cap
    lh
    rlh

### Відносні до viewport

    vw
    vh
    vmin
    vmax
    svw
    svh
    lvw
    lvh
    dvw
    dvh

### Відносні до container

    cqw
    cqh
    cqi
    cqb
    cqmin
    cqmax

---

# 77. Коли використовувати px

`px` добре підходить для:

- тонких border;
- icon dimensions;
- точних маленьких UI-деталей;
- fixed visual values.

Наприклад:

    border: 1px solid #ddd;

---

# 78. Коли використовувати rem

`rem` добре підходить для:

- font-size;
- spacing;
- component dimensions;
- global design system.

Наприклад:

    font-size: 1.125rem;
    padding: 1rem;
    margin-bottom: 2rem;

---

# 79. Коли використовувати em

`em` добре підходить для:

- padding кнопок;
- spacing усередині типографічних компонентів;
- розмірів, які повинні масштабуватися разом із font-size.

Наприклад:

    .button {
        font-size: 1rem;
        padding: 0.75em 1.25em;
    }

---

# 80. Коли використовувати %

`%` добре підходить для:

- ширини;
- responsive layout;
- відносних розмірів;
- fluid components.

Наприклад:

    .column {
        width: 50%;
    }

---

# 81. Коли використовувати vw / vh

Використовуй їх, коли розмір має залежати від viewport.

Наприклад:

    .hero-title {
        font-size: 5vw;
    }

Але для typography часто краще:

    font-size: clamp(2rem, 5vw, 5rem);

щоб текст не став надто маленьким або надто великим.

---

# 82. Коли використовувати ch

`ch` добре підходить для:

- текстових колонок;
- статей;
- документації;
- README-подібних сторінок;
- абзаців.

Наприклад:

    article {
        max-width: 70ch;
    }

---

# 83. Коли використовувати clamp()

`clamp()` особливо корисний для:

- responsive typography;
- spacing;
- hero sections;
- headings;
- fluid components.

Наприклад:

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

---

# 84. CSS Functions — коротко

### calc()

Математика:

    width: calc(100% - 2rem);

### min()

Найменше:

    width: min(100%, 1200px);

### max()

Найбільше:

    width: max(300px, 50%);

### clamp()

Мінімум + preferred + максимум:

    font-size: clamp(1rem, 2vw, 1.5rem);

---

# 85. Типові помилки

## 1. Використовувати тільки px

Погано:

    h1 {
        font-size: 32px;
    }

    p {
        font-size: 16px;
    }

    section {
        padding: 48px;
    }

Сам по собі `px` не є помилкою, але такий підхід часто робить responsive design менш гнучким.

Краще комбінувати:

    rem
    %
    vw
    clamp()
    ch

---

## 2. Використовувати тільки rem

Протилежна крайність також не потрібна.

Наприклад:

    width: 50rem;

може бути неприродним для responsive layout.

Для ширини часто краще:

    width: 100%;
    max-width: 1200px;

або:

    width: min(100% - 2rem, 1200px);

---

## 3. Використовувати em без розуміння контексту

Погано:

    .parent {
        font-size: 1.2em;
    }

    .child {
        font-size: 1.2em;
    }

При глибокій вкладеності значення може накопичуватися.

---

## 4. Плутати em та rem

    1em

не означає:

    1rem

`em` залежить від локального font-size context.

`rem` — від root.

---

## 5. Використовувати 100vh для всього

    height: 100vh;

На mobile це може поводитися не так, як очікується.

Для сучасних fullscreen layout часто краще:

    min-height: 100dvh;

---

## 6. Використовувати vw для всього тексту

Погано:

    body {
        font-size: 2vw;
    }

На дуже маленькому екрані текст може стати надто малим.

Краще:

    body {
        font-size: clamp(1rem, 2vw, 1.25rem);
    }

---

## 7. Використовувати opacity замість alpha background

Якщо потрібно зробити напівпрозорим тільки фон:

Погано:

    .card {
        opacity: 0.8;
    }

Краще:

    .card {
        background-color: rgb(255 255 255 / 80%);
    }

---

## 8. Використовувати колір без перевірки контрасту

Погано:

    color: #aaa;
    background: white;

Краще перевіряти реальний контраст тексту та фону.

---

## 9. Задавати кольори по всьому проєкту вручну

Погано:

    color: #2563eb;
    color: #2563eb;
    color: #2563eb;
    color: #2563eb;

Краще:

    :root {
        --color-primary: #2563eb;
    }

    .button {
        background: var(--color-primary);
    }

---

## 10. Не обмежувати ширину тексту

Погано:

    article {
        width: 100%;
    }

На широкому моніторі рядки можуть стати занадто довгими.

Краще:

    article {
        max-width: 70ch;
    }

---

# 86. CSS Color Functions — Міні-шпаргалка

    red

    #ff0000

    #f00

    rgb(255 0 0)

    rgb(255 0 0 / 50%)

    hsl(0 100% 50%)

    hsl(0 100% 50% / 50%)

    hwb(0 0% 0%)

    oklab(60% 0.1 0.1)

    oklch(60% 0.2 30)

    transparent

    currentColor

---

# 87. CSS Units — Міні-шпаргалка

    10px

    1rem

    1em

    50%

    50vw

    50vh

    50vmin

    50vmax

    50dvh

    50svh

    50lvh

    50ch

    50cqw

---

# 88. CSS Functions — Міні-шпаргалка

    calc(100% - 2rem)

    min(100%, 1200px)

    max(300px, 50%)

    clamp(1rem, 2vw, 2rem)

---

# 89. Практичний набір для Junior Developer

Для більшості frontend-проєктів достатньо добре знати:

    px
    %
    rem
    em
    vw
    vh
    ch
    calc()
    min()
    max()
    clamp()

А з кольорів:

    keyword
    HEX
    rgb()
    hsl()
    alpha
    currentColor
    CSS variables

---

# 90. Хороший сучасний CSS-підхід

Наприклад:

    :root {
        --color-primary: oklch(60% 0.2 250);
        --color-text: #222;
        --color-background: #fff;
    }

    body {
        color: var(--color-text);
        background-color: var(--color-background);
        font-size: 1rem;
        line-height: 1.6;
    }

    .container {
        width: min(100% - 2rem, 1200px);
        margin-inline: auto;
    }

    .hero {
        min-height: 100dvh;
        padding-block: clamp(3rem, 8vw, 8rem);
    }

    .hero__title {
        font-size: clamp(2rem, 6vw, 5rem);
    }

    .hero__text {
        max-width: 65ch;
    }

Цей невеликий приклад демонструє одразу:

- CSS variables;
- сучасні colors;
- `rem`;
- `min()`;
- `%`;
- `dvh`;
- `clamp()`;
- `vw`;
- `ch`.

---

# 91. Colors + Units у реальному компоненті

    .card {
        --card-bg: #ffffff;
        --card-text: #1f2937;
        --card-border: #e5e7eb;

        color: var(--card-text);
        background-color: var(--card-bg);

        width: min(100%, 24rem);
        padding: clamp(1rem, 3vw, 2rem);

        border: 1px solid var(--card-border);
        border-radius: 0.75rem;
    }

    .card__title {
        font-size: clamp(1.25rem, 3vw, 1.75rem);
        line-height: 1.2;
    }

    .card__text {
        max-width: 65ch;
        line-height: 1.6;
    }

---

# 92. Питання зі співбесіди

### 1. Які способи задання кольору в CSS ви знаєте?

Основні:

    keyword
    HEX
    rgb()
    hsl()
    hwb()
    lab()
    lch()
    oklab()
    oklch()

---

### 2. Що таке HEX?

HEX — шістнадцятковий запис RGB-кольору.

    #RRGGBB

Наприклад:

    #ff0000

---

### 3. Що таке RGB?

RGB описує колір через:

- red;
- green;
- blue.

Наприклад:

    rgb(255 0 0)

---

### 4. Що таке HSL?

HSL описує:

- hue;
- saturation;
- lightness.

Наприклад:

    hsl(200 100% 50%)

---

### 5. Що таке alpha?

Alpha визначає прозорість кольору.

Наприклад:

    rgb(0 0 0 / 50%)

---

### 6. Чим opacity відрізняється від alpha?

Alpha можна застосувати до конкретного кольору:

    background: rgb(0 0 0 / 50%);

`opacity` впливає на весь елемент і його вміст:

    opacity: 0.5;

---

### 7. Що таке rem?

`rem` — одиниця, відносна до `font-size` root element.

---

### 8. Що таке em?

`em` — відносна одиниця, пов'язана з `font-size` відповідного контексту.

---

### 9. Чим rem відрізняється від em?

    rem → root font-size
    em  → local/current font-size context

---

### 10. Що таке vw?

`1vw` — 1% ширини viewport.

---

### 11. Що таке vh?

`1vh` — 1% висоти viewport.

---

### 12. Що таке dvh?

`dvh` — dynamic viewport height.

Особливо корисний для сучасних mobile layout.

---

### 13. Що таке ch?

`ch` приблизно відповідає ширині символу `0` поточного шрифту.

Часто використовується для обмеження ширини тексту:

    max-width: 65ch;

---

### 14. Що робить calc()?

Дозволяє виконувати математичні обчислення:

    width: calc(100% - 2rem);

---

### 15. Що робить clamp()?

Обмежує значення:

    clamp(min, preferred, max)

Наприклад:

    font-size: clamp(1rem, 2vw, 2rem);

---

### 16. Для чого min()?

Вибирає найменше значення.

    width: min(100%, 1200px);

---

### 17. Для чого max()?

Вибирає найбільше значення.

    width: max(300px, 50%);

---

### 18. Що таке currentColor?

`currentColor` посилається на поточне значення `color`.

---

### 19. Чому `100vh` може бути проблемним на mobile?

Через динамічні browser UI panels.

Для сучасних fullscreen layouts може бути доречним:

    min-height: 100dvh;

---

### 20. Які одиниці ви б використали для responsive typography?

Наприклад:

    font-size: clamp(1rem, 2vw, 1.5rem);

---

### 21. Чому max-width: 65ch корисний для тексту?

Він обмежує довжину рядка та покращує читабельність.

---

### 22. Чому не варто використовувати тільки px?

Тому що responsive layout та масштабування часто потребують відносних одиниць:

    %
    rem
    em
    vw
    vh
    ch
    clamp()

---

### 23. Що таке CSS custom property?

Наприклад:

    :root {
        --color-primary: #2563eb;
    }

Використання:

    color: var(--color-primary);

---

### 24. Які кольори краще використовувати в design system?

Залежить від проєкту, але зручно централізувати кольори через CSS variables:

    :root {
        --color-primary: ...;
        --color-background: ...;
        --color-text: ...;
        --color-danger: ...;
    }

---

# 93. Типовий набір одиниць для проєкту

Для навчального та реального frontend-проєкту можна почати з такого набору:

### Layout

    %
    rem
    px
    min()
    max()
    calc()

### Typography

    rem
    em
    ch
    clamp()

### Fullscreen sections

    dvh
    svh
    vh

### Responsive

    %
    vw
    rem
    clamp()

### Container-based responsive

    cqw
    cqh

Не потрібно використовувати всі одиниці в кожному проєкті.

---

# 94. Практичний алгоритм вибору одиниці

Коли потрібно задати значення, подумай:

### 1. Значення має бути точним?

Використовуй:

    px

### 2. Значення має масштабуватися разом із root?

Використовуй:

    rem

### 3. Значення має масштабуватися разом із локальним текстом?

Розглянь:

    em

### 4. Значення залежить від ширини контейнера?

Розглянь:

    %
    cqw

### 5. Значення залежить від viewport?

Розглянь:

    vw
    vh
    dvh
    svh
    lvh

### 6. Значення має бути плавним?

Розглянь:

    clamp()

### 7. Значення має бути обмежене?

Розглянь:

    min()
    max()
    clamp()

### 8. Це довгий текст?

Розглянь:

    ch

---

# 95. Міні-шпаргалка

### Colors

    color: red;

    color: #ff0000;

    color: rgb(255 0 0);

    color: rgb(255 0 0 / 50%);

    color: hsl(0 100% 50%);

    color: hsl(0 100% 50% / 50%);

    color: oklch(60% 0.2 30);

    color: transparent;

    color: currentColor;

---

### CSS Variables

    :root {
        --color-primary: #2563eb;
        --color-text: #222;
        --color-background: #fff;
    }

    .button {
        color: var(--color-text);
        background: var(--color-primary);
    }

---

### Common Units

    px
    %
    rem
    em
    vw
    vh
    dvh
    svh
    lvh
    ch
    cqw

---

### Functions

    calc()

    min()

    max()

    clamp()

---

### Common Patterns

    width: min(100% - 2rem, 1200px);

    max-width: 65ch;

    min-height: 100dvh;

    font-size: clamp(2rem, 5vw, 4rem);

    padding: clamp(1rem, 4vw, 4rem);

    margin-inline: auto;

---

# 96. Що потрібно знати на рівні Core

🟢 **Core**

Ти повинен розуміти:

- що таке CSS color;
- `color`;
- `background-color`;
- `border-color`;
- HEX;
- RGB;
- HSL;
- alpha;
- `transparent`;
- `px`;
- `%`;
- `rem`;
- `em`;
- `vw`;
- `vh`;
- різницю між `rem` та `em`;
- що таке viewport;
- що таке CSS variable;
- `var()`;
- `calc()`.

Приклад:

    :root {
        --primary: #2563eb;
    }

    .box {
        color: white;
        background-color: var(--primary);
        padding: 1rem;
        width: 100%;
    }

---

# 97. Що потрібно знати на рівні Junior

🔵 **Junior**

Додатково:

- `currentColor`;
- alpha;
- `opacity`;
- `ch`;
- `vmin`;
- `vmax`;
- `dvh`;
- `svh`;
- `lvh`;
- `min()`;
- `max()`;
- `clamp()`;
- responsive typography;
- fluid spacing;
- color tokens;
- contrast;
- dark mode;
- `prefers-color-scheme`;
- правильний вибір `rem` / `em` / `%` / `px`.

Повинен уміти написати:

    .container {
        width: min(100% - 2rem, 1200px);
        margin-inline: auto;
    }

    h1 {
        font-size: clamp(2rem, 5vw, 4rem);
    }

    .content {
        max-width: 65ch;
    }

---

# 98. Що потрібно знати на рівні Middle

🟠 **Middle**

Додатково:

- modern color spaces;
- `oklab()`;
- `oklch()`;
- системи color tokens;
- fluid design;
- responsive typography;
- CSS functions;
- viewport units;
- dynamic viewport;
- container query units;
- design systems;
- accessibility contrast;
- light/dark themes;
- semantic color naming;
- масштабовані spacing systems.

Повинен розуміти, чому:

    --blue-500

може бути менш зручним у design system, ніж:

    --color-primary

якщо компонентам не потрібно знати конкретний hue.

---

# 99. Що потрібно знати на рівні Senior

🔴 **Senior**

Додатково:

- color spaces;
- perceptual color;
- `oklch`;
- advanced design tokens;
- theming architecture;
- CSS custom properties architecture;
- container-relative design;
- fluid design systems;
- accessibility;
- color contrast;
- forced colors;
- browser differences;
- viewport behavior на mobile;
- cascade layers;
- системний dark mode;
- масштабування UI;
- interoperability між компонентами.

Senior повинен думати не тільки:

> "Який колір поставити?"

а:

> "Як організувати систему кольорів, щоб вона масштабувалася на десятки компонентів, теми, accessibility та майбутній redesign?"

---

# 100. Головне: Colors and Units

> **Не існує однієї "правильної" одиниці CSS для всього.**

Хороший frontend developer вибирає одиницю відповідно до задачі.

### Для точних маленьких значень:

    px

### Для глобального масштабування:

    rem

### Для локального масштабування компонента:

    em

### Для fluid layout:

    %

### Для viewport:

    vw
    vh
    dvh

### Для читабельності тексту:

    ch

### Для fluid typography:

    clamp()

### Для математичних обчислень:

    calc()

### Для обмеження ширини:

    min()
    max()

### Для кольорів:

    HEX
    rgb()
    hsl()
    oklch()

### Для системи кольорів:

    CSS Custom Properties

### Для успадкованого кольору:

    currentColor

---

# 101. Фінальний практичний приклад

Ось невеликий компонент, який використовує більшість важливих концепцій цієї теми:

    :root {
        --color-primary: oklch(60% 0.2 250);
        --color-primary-dark: oklch(45% 0.18 250);

        --color-text: #1f2937;
        --color-background: #ffffff;
        --color-border: #e5e7eb;
    }

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        color: var(--color-text);
        background-color: var(--color-background);
        font-size: 1rem;
        line-height: 1.6;
    }

    .container {
        width: min(100% - 2rem, 1200px);
        margin-inline: auto;
    }

    .hero {
        min-height: 100dvh;
        padding-block: clamp(3rem, 8vw, 8rem);
        display: grid;
        place-items: center;
    }

    .hero__content {
        max-width: 70ch;
        text-align: center;
    }

    .hero__title {
        margin: 0;
        font-size: clamp(2rem, 6vw, 5rem);
        line-height: 1.05;
    }

    .hero__text {
        margin-top: 1.5rem;
        font-size: clamp(1rem, 2vw, 1.25rem);
    }

    .button {
        display: inline-block;
        margin-top: 2rem;
        padding: 0.75em 1.25em;

        color: white;
        background-color: var(--color-primary);

        border: 1px solid var(--color-primary);
        border-radius: 0.5rem;

        text-decoration: none;
    }

    .button:hover {
        background-color: var(--color-primary-dark);
    }

---

# 102. Головна модель мислення

Коли бачиш CSS:

    font-size: clamp(1rem, 2vw, 1.5rem);

думай:

    мінімум → 1rem
    бажане → 2vw
    максимум → 1.5rem

Коли бачиш:

    width: min(100% - 2rem, 1200px);

думай:

    доступна ширина → 100% - 2rem
    максимальна ширина → 1200px

Коли бачиш:

    max-width: 65ch;

думай:

    ширина тексту → приблизно 65 символів

Коли бачиш:

    min-height: 100dvh;

думай:

    висота → динамічний viewport

Коли бачиш:

    color: currentColor;

думай:

    використовуй поточний color

Коли бачиш:

    background: rgb(0 0 0 / 50%);

думай:

    чорний колір + 50% alpha

Коли бачиш:

    padding: 1rem;

думай:

    spacing залежить від root font-size

Коли бачиш:

    padding: 1em;

думай:

    spacing масштабується разом із font-size компонента

---

## Головне:

> **Colors and Units — це не просто список синтаксису CSS.**

Треба навчитися розуміти **від чого залежить значення**.

Для кожної величини став собі три питання:

1. **Що я вимірюю?**
2. **Від чого це значення повинно залежати?**
3. **Чи повинно воно бути fixed, relative або fluid?**

Тоді вибір стає логічним:

    fixed      → px
    root-based → rem
    local      → em
    parent     → %
    viewport   → vw / vh / dvh
    container  → cqw / cqh
    text       → ch
    fluid      → clamp()
    calculation → calc()
    limit      → min() / max()

А для кольорів:

    simple color     → keyword
    exact color      → HEX
    channels         → rgb()
    hue/lightness    → hsl()
    modern palette   → oklch()
    transparency    → alpha
    inherited color  → currentColor
    design system    → CSS variables