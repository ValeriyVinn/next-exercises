# 07. Icons and SVG

## 📌 Що таке Icons and SVG

**SVG (Scalable Vector Graphics)** — це векторний формат для опису графіки за допомогою XML.

SVG особливо добре підходить для:

- іконок;
- логотипів;
- простих ілюстрацій;
- схем;
- графіків;
- UI-елементів;
- декоративної графіки.

Головна перевага SVG:

> SVG масштабується без втрати якості.

На відміну від растрового зображення:

    PNG
       ↓
    збільшення
       ↓
    пікселі стають помітними

SVG:

    SVG
       ↓
    збільшення
       ↓
    браузер перераховує вектор
       ↓
    якість зберігається


---

# 1. SVG як векторна графіка

Растрове зображення складається з пікселів:

    JPG
    PNG
    WebP

SVG описує геометрію:

    line
    circle
    rect
    path
    polygon

Наприклад:

    <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" />
    </svg>

Браузер сам малює коло.


---

# 2. Чому SVG важливий для frontend

SVG дуже часто використовується в UI.

Наприклад:

    Header
      ├── logo.svg
      ├── search.svg
      └── menu.svg

    Button
      ├── arrow.svg
      └── download.svg

    Form
      ├── check.svg
      └── error.svg

Тому frontend developer повинен розуміти:

- як вставити SVG;
- як змінити його розмір;
- як змінити колір;
- як зробити SVG доступним;
- коли використовувати inline SVG;
- коли використовувати `<img>`;
- що таке `viewBox`;
- що таке SVG sprite.


---

# 3. Основні способи використання SVG

SVG можна підключити кількома способами:

    1. Inline SVG
    2. <img>
    3. CSS background-image
    4. <object>
    5. <iframe>
    6. SVG sprite
    7. external SVG через <use>


Найважливіші для frontend:

    Inline SVG
    <img>
    CSS background
    SVG sprite


---

# 4. Inline SVG

SVG можна написати безпосередньо в HTML.

    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <circle
            cx="12"
            cy="12"
            r="8"
            fill="currentColor"
        />
    </svg>

Це називається:

    inline SVG


---

# 5. Переваги Inline SVG

Inline SVG дозволяє:

- керувати SVG через CSS;
- змінювати `fill`;
- змінювати `stroke`;
- використовувати `currentColor`;
- додавати accessibility attributes;
- анімувати окремі частини;
- працювати з SVG DOM.

Наприклад:

    .icon {
        width: 24px;
        height: 24px;
        color: blue;
    }

SVG:

    <svg
        class="icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <circle
            cx="12"
            cy="12"
            r="8"
            fill="currentColor"
        />
    </svg>


---

# 6. SVG через img

SVG можна використовувати як звичайне зображення:

    <img
        src="/icons/search.svg"
        alt="Пошук"
    >

Або декоративно:

    <img
        src="/icons/search.svg"
        alt=""
        aria-hidden="true"
    >


---

# 7. Переваги SVG через img

Підхід:

    <img src="/icons/logo.svg" alt="Logo">

добре підходить для:

- логотипів;
- ілюстрацій;
- standalone images;
- контентних SVG;
- SVG, який не потрібно стилізувати з CSS.

Наприклад:

    <img
        src="/images/logo.svg"
        alt="Мій сайт"
    >


---

# 8. Недолік SVG через img

Якщо SVG підключений через:

    <img src="icon.svg">

ви не можете просто звернутися з зовнішнього CSS до внутрішнього:

    path
    circle
    rect

Наприклад:

    .icon path {
        fill: red;
    }

не змінить внутрішній SVG, якщо він завантажений як зовнішній `<img>`.


---

# 9. Inline SVG vs img

| Особливість | Inline SVG | `<img>` |
|---|---|---|
| CSS control | ✅ | ❌ |
| `fill` з CSS | ✅ | ❌ |
| `stroke` з CSS | ✅ | ❌ |
| Accessibility | легко контролювати | через `alt` |
| Простота | середня | дуже проста |
| DOM-доступ | ✅ | ❌ |
| Добре для логотипу | ✅ | ✅ |
| Добре для UI icons | ✅ | залежить |
| Добре для content image | ✅ | ✅ |


---

# 10. SVG як background-image

SVG можна використовувати в CSS:

    .icon {
        width: 24px;
        height: 24px;

        background-image: url("/icons/search.svg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

HTML:

    <span class="icon" aria-hidden="true"></span>


---

# 11. Коли використовувати SVG background

Це добре для декоративних елементів:

- background patterns;
- decorative icons;
- decorative shapes;
- pseudo-elements;
- visual effects.

Наприклад:

    .card::before {
        content: "";

        width: 40px;
        height: 40px;

        background: url("/icons/star.svg")
            center / contain
            no-repeat;
    }


---

# 12. Недолік background SVG

Background image не є нормальним HTML-контентом.

Тому не варто використовувати його для важливої інформації.

Погано:

    background-image: url("/icons/warning.svg");

якщо іконка є єдиним способом повідомити:

    "Помилка"


Краще:

    HTML
       ↓
    текст "Помилка"
       +
    декоративна іконка


---

# 13. SVG як контент чи декорація

Це одне з найважливіших питань.

Потрібно визначити:

    SVG має смислове значення?
           │
        ┌──┴──┐
       Так    Ні
        │      │
        ↓      ↓
    accessible   decorative
    SVG          SVG


---

# 14. Декоративна SVG

Якщо SVG нічого нового не додає до інформації:

    <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        ...
    </svg>

`aria-hidden="true"` повідомляє assistive technology:

> цей елемент можна ігнорувати.


---

# 15. Meaningful SVG

Якщо SVG передає інформацію:

    <svg
        role="img"
        aria-labelledby="icon-title"
        viewBox="0 0 24 24"
    >
        <title id="icon-title">
            Успішно
        </title>

        ...
    </svg>

Тепер SVG має доступну назву.


---

# 16. `<title>` всередині SVG

SVG може мати:

    <title>Search</title>

Наприклад:

    <svg
        role="img"
        aria-labelledby="search-title"
        viewBox="0 0 24 24"
    >
        <title id="search-title">
            Пошук
        </title>

        <circle
            cx="11"
            cy="11"
            r="7"
        />

        <path
            d="M16 16L21 21"
        />
    </svg>


---

# 17. role="img"

Для meaningful inline SVG можна використовувати:

    role="img"

Наприклад:

    <svg
        role="img"
        aria-label="Успішно"
        viewBox="0 0 24 24"
    >
        ...
    </svg>

Але якщо іконка просто декоративна:

    aria-hidden="true"


---

# 18. SVG і accessibility

Основне правило:

### Декоративна SVG

    aria-hidden="true"

### Значуща SVG

    role="img"

    +
    
    accessible name

Наприклад:

    <title>

або:

    aria-label


---

# 19. Icon Button

Одна з найважливіших ситуацій:

    <button>
        [icon]
    </button>

Якщо кнопка містить тільки іконку, користувач screen reader повинен знати, що вона робить.

Погано:

    <button>
        <svg>...</svg>
    </button>

Краще:

    <button aria-label="Закрити">
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
        >
            ...
        </svg>
    </button>


---

# 20. Icon + Visible Text

Якщо кнопка вже має текст:

    <button>
        <svg aria-hidden="true">
            ...
        </svg>

        Завантажити
    </button>

SVG декоративна, тому:

    aria-hidden="true"

Текст:

    Завантажити

вже є accessible label.


---

# 21. SVG viewBox

`viewBox` — одна з найважливіших властивостей SVG.

Наприклад:

    <svg
        viewBox="0 0 24 24"
    >
        ...
    </svg>

Формат:

    viewBox="minX minY width height"


---

# 22. Як читати viewBox

Наприклад:

    viewBox="0 0 24 24"

означає:

    minX = 0
    minY = 0
    width = 24
    height = 24

Це внутрішня система координат SVG.


---

# 23. viewBox ≠ width/height

Наприклад:

    <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
    >

означає:

    viewport:
        48 × 48 px

    internal coordinate system:
        24 × 24


Тобто SVG масштабується.


---

# 24. Чому viewBox важливий

Без правильного `viewBox` SVG може:

- обрізатися;
- масштабуватися неправильно;
- мати зайвий простір;
- поводитися непередбачувано.

Типовий UI SVG:

    <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
    >


---

# 25. Responsive SVG

Можна не задавати жорсткий розмір у самому SVG.

Наприклад:

    <svg
        class="icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >

CSS:

    .icon {
        width: 1.5rem;
        height: 1.5rem;
    }

Тепер розмір контролюється CSS.


---

# 26. SVG width і height

Можна:

    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
    >

Або:

    <svg
        viewBox="0 0 24 24"
        class="icon"
    >

    .icon {
        width: 24px;
        height: 24px;
    }

Для component-based UI другий варіант часто зручніший.


---

# 27. preserveAspectRatio

SVG має механізм збереження пропорцій.

Наприклад:

    preserveAspectRatio="xMidYMid meet"

За замовчуванням SVG намагається зберегти пропорції.


---

# 28. fill

`fill` визначає внутрішній колір SVG-фігури.

Наприклад:

    <circle
        cx="12"
        cy="12"
        r="8"
        fill="red"
    />


---

# 29. stroke

`stroke` визначає контур.

    <circle
        cx="12"
        cy="12"
        r="8"
        fill="none"
        stroke="black"
    />

Можна мати:

    fill
    stroke


---

# 30. stroke-width

Товщина контуру:

    <circle
        cx="12"
        cy="12"
        r="8"
        fill="none"
        stroke="black"
        stroke-width="2"
    />


---

# 31. stroke-linecap

Визначає вигляд кінців лінії.

    stroke-linecap="round"

Інші значення:

    butt
    round
    square

Для UI-іконок часто використовується:

    round


---

# 32. stroke-linejoin

Визначає з'єднання ліній.

    stroke-linejoin="round"

Можливі:

    miter
    round
    bevel

Для м'яких UI-іконок часто:

    round


---

# 33. currentColor

Одна з найкорисніших можливостей SVG.

`currentColor` бере значення CSS-властивості:

    color


Наприклад:

    .icon {
        color: blue;
    }

SVG:

    <svg
        class="icon"
        viewBox="0 0 24 24"
    >
        <circle
            cx="12"
            cy="12"
            r="8"
            fill="currentColor"
        />
    </svg>


---

# 34. Чому currentColor важливий

Замість:

    fill="blue"

можна:

    fill="currentColor"

Тоді:

    .icon {
        color: red;
    }

або:

    .icon {
        color: green;
    }

SVG автоматично використовує відповідний колір.


---

# 35. SVG успадковує color

Наприклад:

    button {
        color: blue;
    }

    button svg {
        color: inherit;
    }

SVG:

    <path
        fill="currentColor"
        d="..."
    />

Тепер іконка може автоматично мати колір кнопки.


---

# 36. Практичний Icon Button

HTML:

    <button class="icon-button" aria-label="Закрити">
        <svg
            class="icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path
                d="M6 6L18 18M18 6L6 18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
            />
        </svg>
    </button>

CSS:

    .icon-button {
        color: #333;
    }

    .icon-button:hover {
        color: #000;
    }

    .icon {
        width: 24px;
        height: 24px;
    }


---

# 37. SVG path

`path` — один із головних SVG-елементів.

Наприклад:

    <path d="M5 12L19 12" />

`d` містить команди малювання.


---

# 38. Основні path-команди

Найважливіші:

    M → move to
    L → line to
    H → horizontal line
    V → vertical line
    C → cubic Bézier
    S → smooth cubic
    Q → quadratic Bézier
    T → smooth quadratic
    A → arc
    Z → close path


---

# 39. Простий path

    <svg viewBox="0 0 24 24">
        <path
            d="M5 12H19"
            stroke="currentColor"
        />
    </svg>

Це горизонтальна лінія.


---

# 40. Path з кількома командами

    <path
        d="M5 12L10 17L19 7"
        fill="none"
        stroke="currentColor"
    />

Це може бути галочка:

    ┌───────
    │
    └───────


---

# 41. SVG circle

    <circle
        cx="12"
        cy="12"
        r="8"
    />

Основні параметри:

    cx
    cy
    r


---

# 42. SVG rect

    <rect
        x="4"
        y="4"
        width="16"
        height="16"
    />

Можна зробити округлення:

    <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="4"
    />


---

# 43. SVG line

    <line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        stroke="currentColor"
    />


---

# 44. SVG polygon

    <polygon
        points="12,3 21,21 3,21"
    />

Створює багатокутник.


---

# 45. SVG групи

Для об'єднання елементів:

    <g>
        <circle ... />
        <path ... />
    </g>

До групи можна застосовувати:

    fill
    stroke
    transform
    class

Наприклад:

    <g
        fill="currentColor"
        stroke="none"
    >
        ...
    </g>


---

# 46. SVG transform

SVG підтримує трансформації:

    translate()
    scale()
    rotate()
    skewX()
    skewY()

Наприклад:

    <rect
        width="10"
        height="10"
        transform="translate(5 5)"
    />


---

# 47. SVG і CSS transform

Inline SVG можна стилізувати CSS.

    .icon {
        transform: rotate(45deg);
    }

Або:

    .icon:hover {
        transform: scale(1.1);
    }


---

# 48. SVG transition

SVG може анімуватися через CSS.

    .icon {
        transition:
            transform 200ms ease,
            color 200ms ease;
    }

    .button:hover .icon {
        transform: scale(1.1);
    }


---

# 49. SVG animation

Наприклад:

    .icon {
        transition: transform 200ms ease;
    }

    .button:hover .icon {
        transform: translateX(4px);
    }

Це часто використовується для:

    → arrows
    → chevrons
    → menu icons
    → loading indicators


---

# 50. Не анімуй все підряд

SVG animation повинна мати сенс.

Добре:

    hover
    open/close
    loading
    state change

Погано:

    постійно рухати декоративні іконки
    без UX-причини.


---

# 51. prefers-reduced-motion

Якщо SVG має анімацію:

    .icon {
        transition: transform 200ms ease;
    }

можна врахувати accessibility:

    @media (prefers-reduced-motion: reduce) {
        .icon {
            transition: none;
        }
    }


---

# 52. SVG sprite

**SVG sprite** — файл, який містить багато SVG-іконок.

Наприклад:

    icons.svg

всередині:

    <symbol id="search">
        ...
    </symbol>

    <symbol id="close">
        ...
    </symbol>

    <symbol id="menu">
        ...
    </symbol>


---

# 53. Навіщо потрібен SVG sprite

Замість десятків окремих SVG:

    search.svg
    close.svg
    menu.svg
    user.svg
    heart.svg

можна мати:

    icons.svg

Це спрощує систему іконок.


---

# 54. `<symbol>`

SVG sprite часто використовує:

    <symbol>

Наприклад:

    <symbol
        id="icon-search"
        viewBox="0 0 24 24"
    >
        <path
            d="..."
        />
    </symbol>


---

# 55. `<use>`

Щоб використати symbol:

    <svg
        class="icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <use href="#icon-search"></use>
    </svg>


---

# 56. Простий inline sprite

Можна мати:

    <svg
        xmlns="http://www.w3.org/2000/svg"
        style="display: none;"
    >
        <symbol
            id="icon-check"
            viewBox="0 0 24 24"
        >
            <path
                d="..."
            />
        </symbol>
    </svg>

Потім:

    <svg
        class="icon"
        aria-hidden="true"
    >
        <use href="#icon-check"></use>
    </svg>


---

# 57. External SVG sprite

Sprite може бути окремим файлом:

    /icons/sprite.svg

Потім:

    <svg
        class="icon"
        aria-hidden="true"
    >
        <use href="/icons/sprite.svg#icon-search"></use>
    </svg>


---

# 58. Переваги SVG sprite

- централізована система іконок;
- повторне використання;
- менше дублювання SVG-коду;
- зручно для design system;
- добре підходить для великої кількості іконок.


---

# 59. Недоліки SVG sprite

- складніша структура;
- потрібно розуміти `<symbol>` та `<use>`;
- accessibility потрібно продумати;
- зовнішні SVG можуть мати обмеження стилізації;
- debugging складніший, ніж у простого inline SVG.


---

# 60. Inline SVG vs Sprite

| Підхід | Переваги | Недоліки |
|---|---|---|
| Inline SVG | максимальний контроль | дублювання |
| Sprite | reusable icons | складніша система |
| `<img>` | дуже просто | мало CSS-контролю |
| Background | добре для decoration | не semantic content |


---

# 61. Icon Fonts

До SVG популярним способом були **icon fonts**.

Ідея:

    icon font
       ↓
    кожна іконка = glyph
       ↓
    CSS font
       ↓
    іконка


Наприклад:

    .icon {
        font-family: "IconFont";
    }


---

# 62. Чому SVG часто кращий за Icon Font

SVG дає:

- кращий контроль;
- нормальну векторну модель;
- `fill`;
- `stroke`;
- кілька кольорів;
- accessibility;
- семантичні можливості;
- кращу роботу з різними формами.

Icon fonts мають специфічні accessibility та rendering проблеми.


---

# 63. SVG vs Icon Font

| Особливість | SVG | Icon Font |
|---|---|---|
| Вектор | ✅ | ✅ |
| fill/stroke | ✅ | обмежено |
| Multi-color | ✅ | складніше |
| Accessibility | добре контролюється | проблемніше |
| CSS control | дуже хороший | хороший |
| Modern UI | ✅ | legacy/специфічні випадки |


---

# 64. SVG як `<img>` для логотипу

Логотип часто можна підключити:

    <img
        src="/images/logo.svg"
        alt="Назва сайту"
    >

Це хороше рішення, якщо не потрібно змінювати окремі SVG paths через CSS.


---

# 65. SVG logo inline

Іноді логотип потрібно стилізувати:

    <svg
        class="logo"
        viewBox="0 0 200 50"
        role="img"
        aria-labelledby="logo-title"
    >
        <title id="logo-title">
            Назва сайту
        </title>

        ...
    </svg>

Inline SVG дає більший контроль.


---

# 66. SVG для декоративного логотипу

Якщо поруч уже є текст:

    <a href="/">
        <svg aria-hidden="true">
            ...
        </svg>

        <span>Мій сайт</span>
    </a>

SVG може бути декоративною.


---

# 67. SVG і color inheritance

Дуже хороший pattern:

    .icon {
        color: inherit;
    }

SVG:

    <path
        fill="currentColor"
        d="..."
    />

Тепер:

    .button {
        color: #333;
    }

    .button:hover {
        color: #0066cc;
    }

Іконка автоматично змінює колір.


---

# 68. Multi-color SVG

Не всі SVG повинні використовувати:

    currentColor

Логотип або складна ілюстрація може мати власні кольори:

    <path fill="#111" ... />
    <path fill="#f00" ... />
    <path fill="#0a0" ... />

Для таких SVG часто краще:

    <img src="/logo.svg" alt="..." />


---

# 69. Коли currentColor не підходить

Якщо SVG має складну палітру:

    blue
    red
    yellow
    green

заміна всього на:

    currentColor

може зруйнувати дизайн.

Тому:

    UI icon → currentColor

    complex illustration → own colors


---

# 70. CSS custom properties і SVG

Можна використовувати CSS variables:

    .icon {
        --icon-color: #333;
    }

SVG:

    <path
        fill="var(--icon-color)"
        d="..."
    />

Потім:

    .danger {
        --icon-color: red;
    }


---

# 71. SVG stroke icon system

Для outline icons можна створити систему:

    .icon {
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

Тоді:

    <svg class="icon">
        ...
    </svg>


---

# 72. Fill icon system

Для solid icons:

    .icon {
        fill: currentColor;
    }

Наприклад:

    <svg
        class="icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path
            d="..."
        />
    </svg>


---

# 73. Icon sizing system

У design system можна використовувати:

    .icon-xs {
        width: 12px;
        height: 12px;
    }

    .icon-sm {
        width: 16px;
        height: 16px;
    }

    .icon-md {
        width: 20px;
        height: 20px;
    }

    .icon-lg {
        width: 24px;
        height: 24px;
    }

    .icon-xl {
        width: 32px;
        height: 32px;
    }


---

# 74. CSS variables для icon size

Ще краще:

    .icon {
        width: var(--icon-size, 24px);
        height: var(--icon-size, 24px);
    }

Тепер:

    .icon-small {
        --icon-size: 16px;
    }

    .icon-large {
        --icon-size: 32px;
    }


---

# 75. SVG aspect ratio

Іконки зазвичай мають квадратний:

    viewBox="0 0 24 24"

але не всі SVG квадратні.

Наприклад:

    logo:
        viewBox="0 0 200 50"

Тому не потрібно примусово робити всі SVG:

    width = height


---

# 76. SVG overflow

Іноді частина SVG може виходити за межі viewport.

Потрібно розуміти:

    overflow


Наприклад:

    svg {
        overflow: visible;
    }

Але не варто змінювати це без потреби.


---

# 77. SVG accessibility: головне правило

Спочатку постав питання:

> SVG передає інформацію чи тільки прикрашає?

### Якщо прикрашає:

    aria-hidden="true"

### Якщо передає інформацію:

    role="img"

    +
    
    accessible name


---

# 78. SVG у посиланні

Наприклад:

    <a href="/search">
        <svg aria-hidden="true">
            ...
        </svg>

        <span>Пошук</span>
    </a>

Текст забезпечує accessible name.


---

# 79. SVG-only link

Якщо посилання містить тільки SVG:

    <a
        href="/search"
        aria-label="Пошук"
    >
        <svg aria-hidden="true">
            ...
        </svg>
    </a>

Тут:

    aria-label="Пошук"

дає назву посиланню.


---

# 80. SVG-only button

Правильно:

    <button
        type="button"
        aria-label="Відкрити меню"
    >
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
        >
            ...
        </svg>
    </button>


---

# 81. SVG не повинен бути єдиною accessibility інформацією

Погано:

    <button>
        <svg>
            <path ... />
        </svg>
    </button>

Краще:

    <button aria-label="Видалити">
        <svg aria-hidden="true">
            <path ... />
        </svg>
    </button>


---

# 82. SVG у CSS pseudo-elements

Можна використовувати:

    .link::after {
        content: "";
        width: 16px;
        height: 16px;

        background:
            url("/icons/arrow-right.svg")
            center / contain
            no-repeat;
    }

Це хороший варіант для декоративної стрілки.


---

# 83. SVG data URI

SVG можна вбудувати прямо в CSS:

    .icon {
        background-image: url("data:image/svg+xml,...");
    }

Але такий код може бути складним для читання.

Для навчальних та підтримуваних проєктів краще не зловживати цим підходом.


---

# 84. SVG optimization

SVG-файли можуть містити зайвий код:

    metadata
    editor data
    comments
    unused attributes
    unnecessary groups
    excessive precision

Оптимізація SVG може значно зменшити його розмір.


---

# 85. SVG optimizer

Типовий підхід:

    original SVG
         ↓
    SVG optimizer
         ↓
    optimized SVG
         ↓
    production


Наприклад, інструменти на кшталт SVGO можуть оптимізувати SVG.


---

# 86. Не оптимізуй SVG без перевірки

Після оптимізації потрібно перевірити:

    [ ] форма не змінилася
    [ ] viewBox залишився правильним
    [ ] кольори не зникли
    [ ] accessibility не зламалася
    [ ] IDs не конфліктують
    [ ] sprite працює


---

# 87. SVG IDs

SVG може використовувати IDs:

    <linearGradient id="gradient">
        ...
    </linearGradient>

Інші елементи можуть посилатися на нього:

    fill="url(#gradient)"


При великій кількості inline SVG можуть виникати конфлікти ID.

Тому при складних SVG потрібно враховувати унікальність IDs.


---

# 88. SVG gradients

SVG підтримує:

    linearGradient
    radialGradient

Наприклад:

    <defs>
        <linearGradient id="gradient">
            ...
        </linearGradient>
    </defs>

Потім:

    fill="url(#gradient)"


---

# 89. SVG filters

SVG підтримує візуальні фільтри:

    blur
    shadow
    color effects

Наприклад:

    <filter id="shadow">
        ...
    </filter>

Це потужний механізм, але для простих UI-іконок часто достатньо CSS.


---

# 90. SVG clipPath

Можна обрізати графіку:

    <clipPath id="clip">
        <circle
            cx="50"
            cy="50"
            r="40"
        />
    </clipPath>

Потім:

    clip-path="url(#clip)"


---

# 91. SVG masks

SVG також підтримує:

    mask

Це корисно для складних графічних ефектів.

Але для звичайних UI-іконок:

    fill
    stroke
    currentColor

зазвичай достатньо.


---

# 92. SVG як маска CSS

SVG можна використовувати через:

    mask-image

Наприклад:

    .icon {
        width: 24px;
        height: 24px;

        background: currentColor;

        mask:
            url("/icons/star.svg")
            center / contain
            no-repeat;
    }

Це цікавий спосіб зробити SVG-подібну маску, яку можна фарбувати через `background`.


---

# 93. Коли використовувати mask

CSS mask може бути корисною для:

- monochrome icons;
- декоративних shapes;
- custom UI shapes.

Але accessibility потрібно забезпечити на HTML-рівні, тому що mask сама по собі не є semantic content.


---

# 94. SVG і responsive design

SVG добре підходить для responsive UI.

Наприклад:

    .icon {
        width: clamp(16px, 2vw, 32px);
        height: auto;
    }

Але для стандартних UI icons часто краще використовувати прості фіксовані розміри:

    16px
    20px
    24px
    32px


---

# 95. SVG і retina/high-DPI

SVG не потребує окремих:

    @1x
    @2x
    @3x

версій для resolution.

Один SVG:

    icon.svg

може відображатися чітко на:

    1x
    2x
    3x


---

# 96. SVG vs PNG для іконок

Для типових UI-іконок:

    SVG → переважно кращий вибір

тому що:

- масштабування;
- маленький розмір для простих форм;
- CSS control;
- accessibility;
- animation.


PNG краще підходить для:

- складних растрових зображень;
- фотографій;
- графіки з великою кількістю pixel-level detail.


---

# 97. SVG vs WebP

Не потрібно автоматично замінювати WebP на SVG або навпаки.

Потрібно визначити тип графіки:

    vector geometry
         ↓
       SVG

    photographic / raster
         ↓
       WebP / AVIF / JPEG


---

# 98. SVG vs CSS shapes

Прості форми можна створити CSS:

    .circle {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: currentColor;
    }

Але складну іконку:

    search
    user
    settings
    calendar

зазвичай краще представити SVG.


---

# 99. SVG чи CSS для іконки

Питання:

> Чи можна це просто намалювати CSS?

Якщо:

    circle
    line
    simple square

CSS може бути достатнім.

Якщо:

    complex path
    brand icon
    reusable icon

SVG зазвичай кращий.


---

# 100. Типова структура icon system

Для проєкту:

    public/
    └── icons/
        ├── search.svg
        ├── close.svg
        ├── menu.svg
        ├── arrow-right.svg
        └── logo.svg

Для великого проєкту:

    public/
    └── icons/
        ├── ui/
        ├── navigation/
        ├── social/
        ├── status/
        └── sprite.svg


---

# 101. Naming convention для icons

Добре:

    arrow-left.svg
    arrow-right.svg
    chevron-down.svg
    search.svg
    close.svg
    user.svg
    settings.svg


Погано:

    icon1.svg
    icon2.svg
    new-icon-final.svg
    new-icon-final-2.svg


Назва повинна описувати призначення.


---

# 102. Icon component

У component-based frontend можна мати:

    <Icon name="search" />

або:

    <SearchIcon />

Ідея:

    component
       ↓
    SVG
       ↓
    consistent API


---

# 103. Вимоги до Icon Component

Хороший icon component повинен дозволяти:

    size
    className
    aria-label
    color
    title

Наприклад концептуально:

    <SearchIcon
        size={24}
        aria-hidden="true"
    />


---

# 104. Не дублювати SVG styles

Замість:

    icon1 {
        width: 24px;
        height: 24px;
    }

    icon2 {
        width: 24px;
        height: 24px;
    }

можна мати:

    .icon {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
    }


---

# 105. flex-shrink для icons

В flex-контейнері іконка може стискатися.

Наприклад:

    .icon {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
    }

Це корисно для:

    button
    nav item
    card
    list item


---

# 106. Icon alignment

Іконки часто стоять поруч із текстом:

    [icon] Text

Можна:

    .button {
        display: inline-flex;
        align-items: center;
        gap: 8px;
    }

Це краще, ніж намагатися вирівнювати іконку через випадкові:

    margin-top
    top
    position


---

# 107. Практичний Button + Icon

HTML:

    <button class="button">
        <svg
            class="icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path
                d="M5 12H19M13 6L19 12L13 18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>

        Далі
    </button>

CSS:

    .button {
        display: inline-flex;
        align-items: center;
        gap: 8px;
    }

    .icon {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
    }


---

# 108. Icon states

Іконки можуть мати стани:

    default
    hover
    active
    disabled
    selected
    error
    success


Наприклад:

    .button {
        color: #555;
    }

    .button:hover {
        color: #111;
    }

    .button:disabled {
        color: #999;
    }


---

# 109. Не передавай стан тільки кольором

Погано:

    success → green
    error → red

без додаткової інформації.

Краще:

    icon
    +
    text
    +
    color

Наприклад:

    ✓ Успішно

    ⚠ Помилка


---

# 110. Icon contrast

Іконки повинні мати достатній контраст, якщо вони передають інформацію.

Особливо:

    status icons
    error icons
    navigation icons
    action icons


---

# 111. Decorative vs semantic — головне питання

Перед використанням SVG запитай:

    Чи зміниться зміст,
    якщо прибрати цю SVG?

Якщо:

    Ні
       ↓
    decorative
       ↓
    aria-hidden="true"

Якщо:

    Так
       ↓
    meaningful
       ↓
    accessible name


---

# 112. Типові помилки

## Помилка 1 — icon-only button без label

Погано:

    <button>
        <svg>...</svg>
    </button>

Правильно:

    <button aria-label="Закрити">
        <svg aria-hidden="true">
            ...
        </svg>
    </button>


---

## Помилка 2 — декоративна іконка читається screen reader

Якщо іконка декоративна:

    aria-hidden="true"


---

## Помилка 3 — спроба стилізувати img SVG через внутрішній CSS

Погано:

    <img
        class="icon"
        src="/icons/search.svg"
    >

    .icon path {
        fill: red;
    }

Це не стилізує внутрішній `path` зовнішнього SVG.


---

## Помилка 4 — відсутній viewBox

Наприклад:

    <svg>
        ...
    </svg>

може поводитися непередбачувано.

Краще:

    <svg viewBox="0 0 24 24">
        ...
    </svg>


---

## Помилка 5 — жорсткий fill замість currentColor

Погано:

    fill="#000000"

для універсальної UI-іконки.

Краще:

    fill="currentColor"


---

# 113. Debugging SVG

Якщо SVG не відображається:

    1. Перевірити viewBox
          ↓
    2. Перевірити width / height
          ↓
    3. Перевірити fill
          ↓
    4. Перевірити stroke
          ↓
    5. Перевірити path
          ↓
    6. Перевірити currentColor
          ↓
    7. Перевірити overflow
          ↓
    8. Перевірити URL
          ↓
    9. DevTools


---

# 114. Якщо SVG невидима

Наприклад:

    fill="currentColor"

але:

    color: transparent;

Тоді SVG може бути правильною, але невидимою.

Перевір:

    color
    fill
    stroke
    opacity
    visibility
    display


---

# 115. Якщо SVG обрізається

Перевір:

    viewBox

Наприклад:

    viewBox="0 0 24 24"

але path виходить за:

    0 ... 24

Тоді частина SVG може бути обрізана.


---

# 116. Якщо SVG має неправильний розмір

Перевір:

    width
    height
    viewBox
    preserveAspectRatio


Наприклад:

    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
    >


---

# 117. Якщо currentColor не працює

Перевір:

    fill="currentColor"

і батьківський:

    color

Наприклад:

    .button {
        color: red;
    }

    .icon path {
        fill: currentColor;
    }


---

# 118. SVG checklist

Перед використанням SVG:

    [ ] визначити: decorative чи meaningful
    [ ] правильний viewBox
    [ ] правильний aspect ratio
    [ ] правильний fill/stroke
    [ ] currentColor для UI icons
    [ ] aria-hidden для decorative SVG
    [ ] accessible name для meaningful SVG
    [ ] label для icon-only button
    [ ] оптимізувати SVG
    [ ] перевірити розмір
    [ ] перевірити responsive behavior


---

# 119. Core — що потрібно знати

На базовому рівні потрібно знати:

    SVG
    viewBox
    width
    height
    fill
    stroke
    path
    circle
    rect
    currentColor
    <img>
    inline SVG


---

# 120. Junior — що потрібно вміти

Junior повинен уміти:

- вставити SVG;
- використовувати SVG через `<img>`;
- використовувати inline SVG;
- змінювати `fill`;
- змінювати `stroke`;
- використовувати `currentColor`;
- розуміти `viewBox`;
- створити icon button;
- правильно додати `aria-label`;
- використовувати `aria-hidden`;
- відрізняти декоративну SVG від semantic SVG;
- використовувати SVG як background;
- базово працювати з SVG sprite.


---

# 121. Middle — що потрібно знати

Middle повинен розуміти:

- SVG sprite;
- `<symbol>`;
- `<use>`;
- external SVG;
- SVG optimization;
- accessibility;
- SVG animation;
- `stroke-linecap`;
- `stroke-linejoin`;
- SVG transforms;
- CSS variables;
- responsive icons;
- icon systems;
- design tokens;
- performance;
- multi-color SVG;
- `mask`.


---

# 122. Senior — що потрібно розуміти

Senior повинен мислити системою:

    icon source
         ↓
    optimization
         ↓
    delivery
         ↓
    rendering
         ↓
    styling
         ↓
    accessibility
         ↓
    component API
         ↓
    design system


Тобто іконки — це не просто:

    <svg>...</svg>

а частина frontend architecture.


---

# 123. Питання зі співбесіди

### 1. Що таке SVG?

Векторний формат графіки, який описує зображення через XML та геометричні елементи.


---

### 2. Чому SVG добре підходить для іконок?

Тому що він:

- масштабується без втрати якості;
- добре підходить для простих векторних форм;
- може стилізуватися через CSS;
- підтримує animation;
- добре інтегрується з HTML.


---

### 3. Що таке viewBox?

Внутрішня система координат SVG.

Наприклад:

    viewBox="0 0 24 24"


---

### 4. Чим відрізняється viewBox від width/height?

`viewBox` визначає внутрішню систему координат, а `width`/`height` визначають розмір viewport SVG.


---

### 5. Що таке currentColor?

Спеціальне значення, яке використовує поточне значення CSS-властивості `color`.


---

### 6. Коли використовувати aria-hidden?

Коли SVG є декоративною і не додає інформації.


---

### 7. Як зробити icon-only button доступною?

Наприклад:

    <button aria-label="Закрити">
        <svg aria-hidden="true">
            ...
        </svg>
    </button>


---

### 8. Inline SVG vs img?

Inline SVG дає значно більше контролю через CSS і DOM.

`<img>` простіший, але внутрішні SVG-елементи не стилізуються зовнішнім CSS.


---

### 9. Що таке SVG sprite?

Файл із багаторазово використовуваними SVG symbols.


---

### 10. Що робить `<use>`?

Дозволяє повторно використовувати SVG symbol.


---

### 11. SVG чи PNG для UI icon?

У більшості випадків SVG.


---

### 12. Чим SVG може бути кращий за icon font?

SVG має кращий контроль над графікою, `fill`, `stroke`, accessibility та сучасними UI-сценаріями.


---

# 124. Міні-шпаргалка

## Inline SVG

    <svg
        class="icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path
            d="..."
            fill="currentColor"
        />
    </svg>


## CSS

    .icon {
        width: 24px;
        height: 24px;
        color: #333;
    }


## Icon Button

    <button
        type="button"
        aria-label="Закрити"
    >
        <svg
            class="icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            ...
        </svg>
    </button>


## SVG image

    <img
        src="/icons/logo.svg"
        alt="Назва сайту"
    >


## Decorative image

    <img
        src="/icons/decorative.svg"
        alt=""
        aria-hidden="true"
    >


## Background

    .icon {
        background:
            url("/icons/search.svg")
            center / contain
            no-repeat;
    }


## currentColor

    .icon {
        color: red;
    }

    .icon path {
        fill: currentColor;
    }


---

# 125. Найважливіші SVG елементи

    <svg>
    <path>
    <circle>
    <rect>
    <line>
    <polygon>
    <polyline>
    <g>
    <symbol>
    <use>
    <defs>
    <title>


---

# 126. Найважливіші SVG властивості

    viewBox
    width
    height
    fill
    stroke
    stroke-width
    stroke-linecap
    stroke-linejoin
    opacity
    transform
    preserveAspectRatio


---

# 127. Найважливіші accessibility правила

    decorative SVG
        ↓
    aria-hidden="true"


    meaningful SVG
        ↓
    role="img"
        +
    accessible name


    icon-only button
        ↓
    aria-label


    icon + visible text
        ↓
    SVG → aria-hidden="true"
    text → accessible name


---

# 128. Найважливіша модель вибору

    Потрібна графіка?
          │
          ├── Фото
          │     ↓
          │   WebP / AVIF / JPEG
          │
          ├── Проста векторна іконка
          │     ↓
          │   SVG
          │
          ├── Декоративна форма
          │     ↓
          │   CSS / SVG
          │
          └── Складна ілюстрація
                ↓
              SVG / raster
              залежно від задачі


---

# 129. Найважливіша модель використання

    UI icon
       ↓
    Inline SVG
       ↓
    currentColor
       ↓
    CSS controls size/color
       ↓
    accessibility


    Logo / content image
       ↓
    <img src="...svg">
       ↓
    alt


    Decorative icon
       ↓
    background / inline SVG
       ↓
    aria-hidden


    Large icon system
       ↓
    SVG sprite
       ↓
    symbol + use


---

# 130. Головна модель мислення

SVG потрібно розглядати на чотирьох рівнях:

    1. GRAPHICS
       Як SVG малюється?

       ↓

    2. CSS
       Як змінити size / color / state?

       ↓

    3. HTML
       Як SVG інтегрована в UI?

       ↓

    4. ACCESSIBILITY
       Чи має SVG інформаційне значення?


---

# 131. Головне правило

> **SVG — це не просто картинка. Для frontend developer це повноцінний UI-інструмент.**

Потрібно вміти визначити:

    SVG чи raster?
         ↓
    inline чи <img>?
         ↓
    decorative чи meaningful?
         ↓
    fill чи stroke?
         ↓
    currentColor чи власні кольори?
         ↓
    один icon чи sprite?
         ↓
    як забезпечити accessibility?


---

# 132. Що потрібно запам'ятати

1. SVG — векторний формат графіки.

2. SVG добре підходить для UI-іконок.

3. `viewBox` визначає внутрішню систему координат.

4. `width` і `height` визначають розмір SVG viewport.

5. `fill` відповідає за внутрішній колір.

6. `stroke` відповідає за контур.

7. `currentColor` дозволяє SVG успадковувати CSS `color`.

8. Inline SVG дає великий контроль через CSS.

9. `<img src="icon.svg">` простіший, але внутрішні SVG paths не стилізуються зовнішнім CSS.

10. Decorative SVG можна приховати від assistive technology через `aria-hidden="true"`.

11. Meaningful SVG повинна мати accessible name.

12. Icon-only button повинна мати зрозумілий accessible label.

13. SVG sprite дозволяє повторно використовувати іконки.

14. `<symbol>` описує reusable SVG fragment.

15. `<use>` дозволяє його використати.

16. Для UI-іконок `currentColor` — дуже корисний pattern.

17. SVG можна анімувати через CSS.

18. Для анімацій потрібно враховувати `prefers-reduced-motion`.

19. SVG потрібно оптимізувати, але після оптимізації перевіряти результат.

20. Іконки — частина design system, а не просто набір окремих файлів.


---

# 133. Що потрібно вміти після цієї теми

Після вивчення `07-icons-and-svg` ти повинен уміти:

- пояснити, що таке SVG;
- пояснити різницю між SVG та raster image;
- використовувати inline SVG;
- використовувати SVG через `<img>`;
- використовувати SVG як CSS background;
- розуміти `viewBox`;
- використовувати `fill`;
- використовувати `stroke`;
- використовувати `currentColor`;
- створювати icon buttons;
- правильно використовувати `aria-hidden`;
- правильно використовувати `aria-label`;
- створювати accessible SVG;
- розуміти `<symbol>`;
- розуміти `<use>`;
- розуміти SVG sprite;
- створювати просту систему іконок;
- керувати розміром SVG через CSS;
- змінювати SVG у `hover` / `active` / `disabled`;
- створювати прості SVG animations;
- розуміти SVG optimization;
- debugging SVG через DevTools;
- розуміти різницю між UI icon, logo, illustration та decorative graphic.


---

# 134. Фінальна схема

    ICONS + SVG
          │
          ├── SVG
          │    ├── vector
          │    ├── viewBox
          │    ├── path
          │    ├── circle
          │    └── rect
          │
          ├── Integration
          │    ├── inline SVG
          │    ├── <img>
          │    ├── background
          │    └── sprite
          │
          ├── Styling
          │    ├── fill
          │    ├── stroke
          │    ├── currentColor
          │    └── CSS variables
          │
          ├── Accessibility
          │    ├── aria-hidden
          │    ├── aria-label
          │    ├── role="img"
          │    └── <title>
          │
          ├── Performance
          │    ├── optimization
          │    ├── sprite
          │    └── appropriate format
          │
          └── Design System
               ├── icon sizes
               ├── naming
               ├── states
               └── reusable components


---

# 135. Фінальна формула

    GOOD SVG SYSTEM

        semantic decision
              +
        correct SVG structure
              +
        correct viewBox
              +
        currentColor
              +
        accessibility
              +
        reusable icons
              +
        optimization
              +
        consistent icon API

              ↓

        predictable UI