# CSS Transitions

> `html-css/04-visual-styling-and-effects/08-transitions`

## 1. Що таке CSS Transitions

**CSS Transition** — це механізм плавної зміни CSS-властивості від одного значення до іншого протягом заданого часу.

Без transition:

    .button {
        background-color: blue;
    }

    .button:hover {
        background-color: red;
    }

При наведенні колір змінюється практично миттєво.

З transition:

    .button {
        background-color: blue;
        transition: background-color 300ms ease;
    }

    .button:hover {
        background-color: red;
    }

Тепер браузер плавно переходить:

    blue → red

за `300ms`.

---

# 2. Головна ідея Transition

Transition відповідає на питання:

> **"Як плавно перейти від одного CSS-стану до іншого?"**

Наприклад:

    normal → :hover
    normal → :focus
    normal → :active
    class A → class B
    collapsed → expanded
    opacity: 0 → opacity: 1
    transform: scale(1) → scale(1.05)

Transition **не створює новий стан**.

Він лише робить перехід між уже існуючими станами плавним.

---

# 3. Основні властивості Transition

CSS має чотири основні transition-властивості:

    transition-property
    transition-duration
    transition-timing-function
    transition-delay

Наприклад:

    .button {
        transition-property: background-color;
        transition-duration: 300ms;
        transition-timing-function: ease;
        transition-delay: 0ms;
    }

Це можна записати коротше:

    .button {
        transition: background-color 300ms ease 0ms;
    }

---

# 4. `transition-property`

Визначає, **яка CSS-властивість повинна анімуватися під час переходу**.

Приклад:

    .button {
        transition-property: background-color;
    }

    .button:hover {
        background-color: red;
    }

Тільки `background-color` буде переходити плавно.

---

## 4.1. Одна властивість

    .card {
        transition-property: transform;
    }

    .card:hover {
        transform: scale(1.05);
    }

---

## 4.2. Кілька властивостей

Властивості можна перелічувати через кому:

    .button {
        transition-property: background-color, color, transform;
    }

    .button:hover {
        background-color: black;
        color: white;
        transform: translateY(-2px);
    }

---

## 4.3. `all`

Можна написати:

    .button {
        transition-property: all;
    }

Це означає:

> Плавно переходити для всіх властивостей, які браузер може анімувати.

Наприклад:

    .button {
        transition: all 300ms ease;
    }

### Але `transition: all` не завжди рекомендується

Краще явно вказувати властивості:

    .button {
        transition:
            background-color 300ms ease,
            color 300ms ease,
            transform 300ms ease;
    }

Переваги:

- зрозуміліший код;
- менше неочікуваних анімацій;
- легше контролювати UI;
- простіше підтримувати CSS.

---

# 5. `transition-duration`

Визначає **тривалість переходу**.

    .button {
        transition-duration: 300ms;
    }

Або:

    .button {
        transition-duration: 0.3s;
    }

Обидва варіанти означають:

    300ms = 0.3s

---

## 5.1. Типові значення

    100ms
    150ms
    200ms
    300ms
    500ms
    700ms
    1s

Для більшості UI-елементів часто достатньо:

    150–300ms

---

# 6. `transition-timing-function`

Визначає **швидкість зміни протягом transition**.

Найпоширеніші значення:

    linear
    ease
    ease-in
    ease-out
    ease-in-out
    cubic-bezier()
    steps()

---

# 7. `linear`

Швидкість зміни залишається приблизно однаковою.

    .box {
        transition: transform 500ms linear;
    }

Умовно:

    START ─────────────── END
    однакова швидкість

Корисно для:

- технічних індикаторів;
- progress-подібних рухів;
- деяких циклічних ефектів.

Для звичайних кнопок `linear` часто виглядає менш природно.

---

# 8. `ease`

Стандартна плавність CSS.

    .button {
        transition: transform 300ms ease;
    }

Зміна:

    швидше в середині
    плавніше біля початку та кінця

Це хороше базове значення для UI.

---

# 9. `ease-in`

Починає повільно, потім прискорюється.

    .box {
        transition: transform 500ms ease-in;
    }

Умовно:

    повільно → швидше → швидко

---

# 10. `ease-out`

Починає швидше, потім сповільнюється.

    .box {
        transition: transform 500ms ease-out;
    }

Умовно:

    швидко → повільніше → дуже плавно

Для UI часто виглядає природно.

Наприклад:

    .button:hover {
        transform: translateY(-2px);
    }

    .button {
        transition: transform 200ms ease-out;
    }

---

# 11. `ease-in-out`

Повільно починається, прискорюється в середині та знову сповільнюється.

    .box {
        transition: transform 500ms ease-in-out;
    }

Умовно:

    повільно → швидко → повільно

---

# 12. `cubic-bezier()`

Дозволяє створити власну криву швидкості.

    .button {
        transition:
            transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
    }

Форма:

    cubic-bezier(x1, y1, x2, y2)

Наприклад:

    cubic-bezier(0.4, 0, 0.2, 1)

Дозволяє створювати більш специфічне відчуття руху.

---

# 13. `steps()`

Замість плавного переходу значення змінюється окремими кроками.

    .box {
        transition: width 1s steps(4);
    }

Це може бути корисно для:

- pixel-art ефектів;
- покадрових ефектів;
- цифрових індикаторів;
- ступінчастих змін.

---

# 14. `transition-delay`

Визначає затримку перед початком transition.

    .button {
        transition:
            transform 300ms ease
            200ms;
    }

При зміні стану:

    200ms → очікування
    300ms → transition

Разом:

    500ms

---

## 14.1. Явний запис

    .button {
        transition-property: transform;
        transition-duration: 300ms;
        transition-timing-function: ease;
        transition-delay: 200ms;
    }

---

# 15. Shorthand `transition`

Найчастіше використовують скорочений запис:

    transition:
        property
        duration
        timing-function
        delay;

Наприклад:

    .button {
        transition:
            background-color 300ms ease 0ms;
    }

---

# 16. Простий приклад

HTML:

    <button class="button">
        Наведи курсор
    </button>

CSS:

    .button {
        background-color: royalblue;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;

        transition: background-color 300ms ease;
    }

    .button:hover {
        background-color: darkblue;
    }

Результат:

    normal → blue
    hover  → darkblue

але зміна відбувається плавно.

---

# 17. Transition + `transform`

Один із найважливіших патернів сучасного UI.

    .card {
        transition: transform 200ms ease;
    }

    .card:hover {
        transform: translateY(-5px);
    }

Наприклад:

    .card {
        transition: transform 200ms ease;
    }

    .card:hover {
        transform: scale(1.03);
    }

---

# 18. Transition + `opacity`

Часто використовується для появи/зникнення елементів.

    .element {
        opacity: 1;
        transition: opacity 300ms ease;
    }

    .element:hover {
        opacity: 0.5;
    }

---

# 19. Transition + кілька властивостей

Наприклад, кнопка:

    .button {
        background-color: white;
        color: black;
        transform: translateY(0);

        transition:
            background-color 200ms ease,
            color 200ms ease,
            transform 200ms ease;
    }

    .button:hover {
        background-color: black;
        color: white;
        transform: translateY(-2px);
    }

---

# 20. Не обов'язково використовувати однакову duration

Можна задати різний час:

    .button {
        transition:
            background-color 200ms ease,
            color 200ms ease,
            transform 300ms ease-out;
    }

Це дозволяє точніше налаштовувати відчуття інтерфейсу.

---

# 21. Transition працює на зміні стану

Наприклад:

    .button {
        background-color: blue;
        transition: background-color 300ms ease;
    }

    .button:hover {
        background-color: red;
    }

Коли курсор входить:

    blue → red

Коли курсор виходить:

    red → blue

Transition працює в обидві сторони.

---

# 22. Transition не є Animation

Це важлива різниця.

## Transition

Переходить:

    A → B

Наприклад:

    normal → hover

## Animation

Може виконувати цілий сценарій:

    A → B → C → D → A

Наприклад:

    @keyframes pulse {
        0% {
            transform: scale(1);
        }

        50% {
            transform: scale(1.1);
        }

        100% {
            transform: scale(1);
        }
    }

Transition:

    стан → стан

Animation:

    сценарій → сценарій

---

# 23. Transition з `:hover`

Найпоширеніший випадок:

    .link {
        color: black;
        transition: color 200ms ease;
    }

    .link:hover {
        color: blue;
    }

---

# 24. Transition з `:focus`

Особливо важливо для форм.

    .input {
        border: 1px solid #ccc;
        transition:
            border-color 200ms ease,
            box-shadow 200ms ease;
    }

    .input:focus {
        border-color: blue;
        box-shadow: 0 0 0 3px rgba(0, 0, 255, 0.15);
        outline: none;
    }

Transition робить focus-стан плавним.

Але:

> Не прибирай `outline` без створення іншого зрозумілого focus-індикатора.

---

# 25. Transition з класами

Transition не обмежується псевдокласами.

HTML:

    <div class="menu">
        Menu
    </div>

CSS:

    .menu {
        opacity: 0;
        transform: translateY(-10px);

        transition:
            opacity 200ms ease,
            transform 200ms ease;
    }

    .menu.is-open {
        opacity: 1;
        transform: translateY(0);
    }

JavaScript може додати:

    menu.classList.add("is-open");

Тоді CSS виконає плавний перехід.

---

# 26. Transition для меню

Приклад простого dropdown:

    .dropdown {
        opacity: 0;
        transform: translateY(-8px);
        pointer-events: none;

        transition:
            opacity 200ms ease,
            transform 200ms ease;
    }

    .dropdown.is-open {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
    }

Це типовий патерн:

    opacity
    +
    transform

---

# 27. Чому `opacity + transform` часто кращі

Наприклад:

    opacity: 0;
    transform: translateY(10px);

переходить до:

    opacity: 1;
    transform: translateY(0);

Це часто краще для UI, ніж постійно змінювати:

    width
    height
    top
    left

Особливо для простих декоративних та UI-ефектів.

---

# 28. Анімовані властивості

Не всі CSS-властивості однаково добре підтримують transition.

Добре підходять:

    opacity
    transform
    color
    background-color
    border-color
    box-shadow
    filter
    width
    height
    padding
    margin

Але продуктивність і поведінка можуть відрізнятися.

---

# 29. `display` не переходить плавно

Наприклад:

    .menu {
        display: none;
        transition: opacity 300ms ease;
    }

    .menu.is-open {
        display: block;
        opacity: 1;
    }

Transition не може просто плавно виконати:

    display: none → display: block

Тому часто використовують:

    opacity
    transform
    visibility
    pointer-events

---

# 30. `opacity` не видаляє елемент із взаємодії

Важливий момент:

    opacity: 0;

робить елемент невидимим, але він може залишатися:

- у layout;
- доступним для pointer interaction;
- доступним для деяких типів взаємодії.

Тому для прихованого UI часто використовують додатково:

    pointer-events: none;

Наприклад:

    .menu {
        opacity: 0;
        pointer-events: none;

        transition: opacity 200ms ease;
    }

    .menu.is-open {
        opacity: 1;
        pointer-events: auto;
    }

---

# 31. Transition з `visibility`

Можна комбінувати:

    .tooltip {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;

        transition:
            opacity 200ms ease,
            visibility 0s linear 200ms;
    }

    .tooltip.is-visible {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;

        transition:
            opacity 200ms ease,
            visibility 0s linear 0s;
    }

Це дозволяє зробити tooltip, який:

    invisible
    ↓
    fade in
    ↓
    visible

---

# 32. Чому `height: auto` — проблема

Не можна просто розраховувати на:

    .content {
        height: 0;
        transition: height 300ms ease;
    }

    .content.open {
        height: auto;
    }

Браузер не може виконати звичайний transition:

    0px → auto

Тому для accordion часто використовують інші підходи.

---

# 33. Простий workaround через `max-height`

Наприклад:

    .content {
        max-height: 0;
        overflow: hidden;

        transition: max-height 300ms ease;
    }

    .content.open {
        max-height: 500px;
    }

Проблема:

> Треба знати достатньо велике значення `max-height`.

Наприклад:

    max-height: 500px;

Якщо контент може бути більшим — виникнуть проблеми.

---

# 34. Коли використовувати Grid для accordion

У сучасному CSS можна побудувати деякі розгортання через grid.

Наприклад, концептуально:

    .content {
        display: grid;
        grid-template-rows: 0fr;

        transition: grid-template-rows 300ms ease;
    }

    .content.open {
        grid-template-rows: 1fr;
    }

    .content-inner {
        overflow: hidden;
    }

Це один із сучасних підходів, але його потрібно застосовувати з урахуванням конкретної структури компонента.

---

# 35. Transition псевдоелементів

Transition можна використовувати з:

    ::before
    ::after

Наприклад, underline для посилання:

    .link {
        position: relative;
        color: black;
        text-decoration: none;
    }

    .link::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -4px;

        width: 0;
        height: 2px;

        background-color: currentColor;

        transition: width 200ms ease;
    }

    .link:hover::after {
        width: 100%;
    }

---

# 36. Підкреслення через `transform`

Ще один хороший підхід:

    .link::after {
        content: "";
        position: absolute;

        left: 0;
        bottom: -4px;

        width: 100%;
        height: 2px;

        background-color: currentColor;

        transform: scaleX(0);
        transform-origin: left;

        transition: transform 200ms ease;
    }

    .link:hover::after {
        transform: scaleX(1);
    }

Це часто зручно для декоративних ефектів.

---

# 37. Transition + `box-shadow`

Наприклад, card:

    .card {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        transition:
            box-shadow 250ms ease,
            transform 250ms ease;
    }

    .card:hover {
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        transform: translateY(-4px);
    }

---

# 38. Transition + border

    .input {
        border: 1px solid #ccc;

        transition: border-color 200ms ease;
    }

    .input:hover {
        border-color: #888;
    }

---

# 39. Transition + background

    .button {
        background-color: #eee;

        transition: background-color 200ms ease;
    }

    .button:hover {
        background-color: #ddd;
    }

---

# 40. Transition + color

    .link {
        color: #333;

        transition: color 200ms ease;
    }

    .link:hover {
        color: #0070f3;
    }

---

# 41. Transition + border-radius

Можна анімувати й геометричні властивості:

    .box {
        border-radius: 8px;

        transition: border-radius 300ms ease;
    }

    .box:hover {
        border-radius: 50%;
    }

Наприклад, квадрат може плавно перетворюватися на коло.

---

# 42. Transition + width

Можна:

    .box {
        width: 100px;

        transition: width 300ms ease;
    }

    .box:hover {
        width: 200px;
    }

Але зміна `width` може впливати на layout інших елементів.

Тому для руху або масштабування часто краще:

    transform: scaleX(...);

---

# 43. Transition + height

Можна:

    .box {
        height: 100px;

        transition: height 300ms ease;
    }

    .box:hover {
        height: 200px;
    }

Але зміна `height` може викликати перерахунок layout.

---

# 44. Transition + `transform` як альтернатива layout-змінам

Замість:

    width: 100px;

    width: 120px;

можна іноді використати:

    transform: scale(1);

    transform: scale(1.2);

Наприклад:

    .card {
        transition: transform 200ms ease;
    }

    .card:hover {
        transform: scale(1.05);
    }

Важливо:

> `transform` візуально змінює елемент, але не займає нове місце в layout.

---

# 45. Transition + `filter`

Можна анімувати:

    filter: brightness(...);
    filter: blur(...);
    filter: grayscale(...);

Наприклад:

    .image {
        filter: grayscale(100%);

        transition: filter 300ms ease;
    }

    .image:hover {
        filter: grayscale(0%);
    }

---

# 46. Transition + CSS Variables

CSS custom properties можуть допомогти централізувати параметри.

    :root {
        --transition-fast: 150ms;
        --transition-normal: 300ms;
        --transition-slow: 500ms;
    }

    .button {
        transition:
            background-color var(--transition-fast) ease;
    }

    .card {
        transition:
            transform var(--transition-normal) ease;
    }

---

# 47. Transition Tokens

У дизайн-системі можна створити окремі transition tokens:

    :root {
        --duration-fast: 150ms;
        --duration-normal: 250ms;
        --duration-slow: 400ms;

        --ease-standard: ease;
        --ease-out: ease-out;
        --ease-in-out: ease-in-out;
    }

Потім:

    .button {
        transition:
            transform var(--duration-fast) var(--ease-out);
    }

---

# 48. Multiple Transitions

Можна створити кілька transition:

    .card {
        transition:
            transform 250ms ease,
            box-shadow 250ms ease,
            opacity 200ms ease;
    }

Це означає:

    transform  → 250ms
    box-shadow → 250ms
    opacity    → 200ms

---

# 49. Transition у shorthand для кількох властивостей

Синтаксис:

    transition:
        transform 250ms ease,
        opacity 200ms ease;

Наприклад:

    .modal {
        opacity: 0;
        transform: scale(0.95);

        transition:
            opacity 200ms ease,
            transform 250ms ease;
    }

---

# 50. Різний delay для різних властивостей

Наприклад:

    .element {
        transition:
            opacity 200ms ease 0ms,
            transform 300ms ease 100ms;
    }

Тут:

    opacity:
        duration = 200ms
        delay = 0ms

    transform:
        duration = 300ms
        delay = 100ms

---

# 51. Interrupting Transition

Transition може бути перерваний.

Наприклад:

    .button {
        transform: scale(1);

        transition: transform 500ms ease;
    }

    .button:hover {
        transform: scale(1.2);
    }

Якщо користувач дуже швидко наведе та забере курсор:

    scale(1)
        ↓
    scale(1.2)
        ↓
    scale(1)

Браузер може змінити напрямок transition ще до завершення попереднього переходу.

---

# 52. Це важливо для UX

Переходи не повинні бути:

- надто повільними;
- надто різкими;
- надмірними;
- непередбачуваними.

Погано:

    transition: all 2s ease;

для звичайної кнопки.

Краще:

    transition: background-color 200ms ease;

---

# 53. Не анімуй усе без необхідності

Поганий підхід:

    .button {
        transition: all 1s ease;
    }

Кращий:

    .button {
        transition:
            background-color 200ms ease,
            color 200ms ease,
            transform 200ms ease;
    }

Принцип:

> Анімуй тільки те, що повинно змінюватися.

---

# 54. Transition і продуктивність

Для плавного UI особливо часто використовують:

    transform
    opacity

Наприклад:

    .element {
        opacity: 0;
        transform: translateY(10px);

        transition:
            opacity 200ms ease,
            transform 200ms ease;
    }

    .element.is-visible {
        opacity: 1;
        transform: translateY(0);
    }

Це типовий патерн для:

- dropdown;
- modal;
- tooltip;
- card;
- notification;
- mobile menu;
- появи секцій.

---

# 55. Не зловживай `will-change`

Можна зустріти:

    .element {
        will-change: transform;
    }

`will-change` повідомляє браузеру, що властивість може змінюватися.

Але не варто додавати його всюди.

Погано:

    * {
        will-change: transform;
    }

Краще використовувати тільки там, де це справді потрібно.

---

# 56. Transition та accessibility

Анімації можуть бути неприємними для користувачів, які мають підвищену чутливість до руху.

Для цього існує:

    prefers-reduced-motion

Приклад:

    @media (prefers-reduced-motion: reduce) {
        * {
            transition-duration: 0.01ms !important;
            transition-delay: 0ms !important;
        }
    }

Або краще точково вимикати непотрібні ефекти:

    @media (prefers-reduced-motion: reduce) {
        .card {
            transition: none;
        }
    }

---

# 57. Хороший accessibility-підхід

Не треба обов'язково повністю видаляти будь-який transition.

Наприклад, можна залишити:

    .button {
        transition:
            background-color 150ms ease;
    }

але прибрати великий рух:

    @media (prefers-reduced-motion: reduce) {
        .card {
            transition: none;
        }
    }

---

# 58. Transition для кнопки

Повний приклад:

    .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;

        padding: 12px 20px;

        border: none;
        border-radius: 8px;

        background-color: #2563eb;
        color: white;

        cursor: pointer;

        transition:
            background-color 200ms ease,
            transform 150ms ease,
            box-shadow 200ms ease;
    }

    .button:hover {
        background-color: #1d4ed8;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    }

    .button:active {
        transform: translateY(0);
    }

---

# 59. Transition для Card

    .card {
        padding: 24px;

        border-radius: 12px;
        background-color: white;

        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

        transition:
            transform 250ms ease,
            box-shadow 250ms ease;
    }

    .card:hover {
        transform: translateY(-4px);

        box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.12);
    }

---

# 60. Transition для Input

    .input {
        width: 100%;
        padding: 12px 14px;

        border: 1px solid #ccc;
        border-radius: 8px;

        outline: none;

        transition:
            border-color 200ms ease,
            box-shadow 200ms ease;
    }

    .input:focus {
        border-color: #2563eb;

        box-shadow:
            0 0 0 3px rgba(37, 99, 235, 0.15);
    }

---

# 61. Transition для Link

    .link {
        color: #333;
        text-decoration: none;

        transition:
            color 200ms ease;
    }

    .link:hover {
        color: #2563eb;
    }

---

# 62. Transition для зображення

    .image {
        display: block;

        transition:
            transform 300ms ease,
            filter 300ms ease;
    }

    .image:hover {
        transform: scale(1.03);
        filter: brightness(1.05);
    }

---

# 63. Transition для Mobile Menu

HTML:

    <button class="menu-button">
        Menu
    </button>

    <nav class="menu">
        ...
    </nav>

CSS:

    .menu {
        opacity: 0;
        transform: translateY(-10px);

        pointer-events: none;

        transition:
            opacity 200ms ease,
            transform 200ms ease;
    }

    .menu.is-open {
        opacity: 1;
        transform: translateY(0);

        pointer-events: auto;
    }

JavaScript:

    menuButton.addEventListener("click", () => {
        menu.classList.toggle("is-open");
    });

---

# 64. Transition для Modal

    .modal {
        opacity: 0;
        transform: scale(0.95);

        pointer-events: none;

        transition:
            opacity 200ms ease,
            transform 200ms ease;
    }

    .modal.is-open {
        opacity: 1;
        transform: scale(1);

        pointer-events: auto;
    }

Патерн:

    opacity
    +
    transform
    +
    pointer-events

---

# 65. Transition для Tooltip

    .tooltip {
        opacity: 0;
        transform: translateY(5px);

        pointer-events: none;

        transition:
            opacity 150ms ease,
            transform 150ms ease;
    }

    .trigger:hover .tooltip {
        opacity: 1;
        transform: translateY(0);

        pointer-events: auto;
    }

---

# 66. Transition і `transform-origin`

Якщо використовується transform:

    transform: scale(0);

можна контролювати точку трансформації:

    transform-origin: center;

або:

    transform-origin: top left;

Наприклад:

    .menu {
        transform-origin: top;
        transform: scaleY(0);

        transition:
            transform 200ms ease;
    }

    .menu.is-open {
        transform: scaleY(1);
    }

---

# 67. Transition + `overflow`

При створенні декоративних ефектів може знадобитися:

    overflow: hidden;

Наприклад:

    .card {
        overflow: hidden;
    }

    .card-image {
        transition: transform 300ms ease;
    }

    .card:hover .card-image {
        transform: scale(1.05);
    }

Без `overflow: hidden` зображення може візуально виходити за межі card.

---

# 68. Transition і `z-index`

Transition не завжди вирішує проблему шарів.

Якщо елементи перекриваються:

    position
    +
    z-index
    +
    stacking context

можуть бути важливішими за сам transition.

---

# 69. Transition не запускається без зміни значення

Наприклад:

    .button {
        background-color: blue;
        transition: background-color 300ms ease;
    }

Якщо новий стан теж має:

    background-color: blue;

ніякого видимого переходу не буде.

Transition потребує зміни:

    blue → red

---

# 70. Transition і CSS Custom Properties

Можна використовувати змінні для значень:

    .button {
        --button-bg: #2563eb;

        background-color: var(--button-bg);

        transition:
            background-color 200ms ease;
    }

    .button:hover {
        --button-bg: #1d4ed8;
    }

Браузер побачить зміну фактичного `background-color`.

---

# 71. Поширена помилка: transition тільки в `:hover`

Погано:

    .button:hover {
        transition: transform 300ms ease;
        transform: scale(1.05);
    }

Краще:

    .button {
        transition: transform 300ms ease;
    }

    .button:hover {
        transform: scale(1.05);
    }

Чому?

Transition описує **правило переходу**, тому його логічно розміщувати в базовому стані.

---

# 72. Поширена помилка: занадто довгий transition

Погано:

    .button {
        transition: transform 3s ease;
    }

Для звичайної кнопки це створює відчуття повільного інтерфейсу.

Краще:

    .button {
        transition: transform 150ms ease;
    }

---

# 73. Поширена помилка: `transition: all`

Проблемний варіант:

    .card {
        transition: all 500ms ease;
    }

Якщо зміниться інша CSS-властивість, яку автор не планував анімувати, вона теж може отримати transition.

Краще:

    .card {
        transition:
            transform 250ms ease,
            box-shadow 250ms ease;
    }

---

# 74. Поширена помилка: анімувати layout без необхідності

Наприклад:

    left
    top
    width
    height
    margin
    padding

можуть змінювати layout.

Для руху елемента часто краще:

    transform: translate(...);

Для появи:

    opacity

Для масштабування:

    transform: scale(...)

---

# 75. Поширена помилка: прибрати focus

Погано:

    button:focus {
        outline: none;
    }

Якщо немає альтернативного focus-стану, клавіатурна навігація стає менш зрозумілою.

Краще:

    button:focus-visible {
        outline: 3px solid #2563eb;
        outline-offset: 3px;
    }

---

# 76. Transition vs Animation

| Transition | Animation |
|---|---|
| A → B | A → B → C → D |
| Зазвичай реагує на стан | Може працювати автоматично |
| `transition` | `@keyframes` + `animation` |
| `:hover`, `:focus`, classes | Сценарій |
| Простий UI feedback | Складні рухи |
| Не має keyframes | Має keyframes |

---

# 77. Transition vs Transform

Це різні речі.

### Transform

Визначає:

> Як елемент трансформується.

Наприклад:

    transform: translateY(-4px);

### Transition

Визначає:

> Як швидко і яким чином перейти до нового значення.

Наприклад:

    transition: transform 200ms ease;

Разом:

    .card {
        transition: transform 200ms ease;
    }

    .card:hover {
        transform: translateY(-4px);
    }

---

# 78. Transition vs JavaScript

Для простих UI-переходів CSS зазвичай достатньо:

    CSS state
    +
    transition

JavaScript може лише змінювати клас:

    element.classList.toggle("is-open");

CSS відповідає за:

    opacity
    transform
    duration
    easing

Це хороший розподіл відповідальності:

    JavaScript → стан
    CSS       → візуальний перехід

---

# 79. Практичний патерн: State + Transition

HTML:

    <div class="panel">
        Content
    </div>

JavaScript:

    panel.classList.add("is-open");

CSS:

    .panel {
        opacity: 0;
        transform: translateY(10px);

        transition:
            opacity 200ms ease,
            transform 200ms ease;
    }

    .panel.is-open {
        opacity: 1;
        transform: translateY(0);
    }

Мислення:

    STATE
      ↓
    class
      ↓
    CSS
      ↓
    transition
      ↓
    visual result

---

# 80. Рекомендовані значення duration

Це не суворі правила, але хороший старт:

    100–150ms
        дуже швидкі UI-зміни

    150–250ms
        кнопки, links, hover

    200–350ms
        cards, dropdowns, tooltips

    300–500ms
        більші UI-переходи

    500ms+
        спеціальні ефекти

Головне:

> Duration повинна відповідати масштабу зміни.

---

# 81. Практичний UI-рецепт №1 — Button

    .button {
        transition:
            background-color 150ms ease,
            transform 150ms ease;
    }

    .button:hover {
        background-color: #1d4ed8;
        transform: translateY(-1px);
    }

    .button:active {
        transform: translateY(0);
    }

---

# 82. Практичний UI-рецепт №2 — Card

    .card {
        transition:
            transform 250ms ease,
            box-shadow 250ms ease;
    }

    .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    }

---

# 83. Практичний UI-рецепт №3 — Fade In

    .element {
        opacity: 0;

        transition:
            opacity 300ms ease;
    }

    .element.is-visible {
        opacity: 1;
    }

---

# 84. Практичний UI-рецепт №4 — Slide In

    .element {
        opacity: 0;
        transform: translateY(20px);

        transition:
            opacity 300ms ease,
            transform 300ms ease;
    }

    .element.is-visible {
        opacity: 1;
        transform: translateY(0);
    }

---

# 85. Практичний UI-рецепт №5 — Scale In

    .modal {
        opacity: 0;
        transform: scale(0.95);

        transition:
            opacity 200ms ease,
            transform 200ms ease;
    }

    .modal.is-open {
        opacity: 1;
        transform: scale(1);
    }

---

# 86. Практичний UI-рецепт №6 — Underline

    .link {
        position: relative;
    }

    .link::after {
        content: "";

        position: absolute;
        left: 0;
        bottom: -3px;

        width: 100%;
        height: 2px;

        background-color: currentColor;

        transform: scaleX(0);
        transform-origin: left;

        transition:
            transform 200ms ease;
    }

    .link:hover::after {
        transform: scaleX(1);
    }

---

# 87. Як думати про Transition

Перед створенням ефекту постав питання:

### 1. Що змінюється?

Наприклад:

    color
    opacity
    transform
    box-shadow

### 2. Який стан запускає зміну?

    :hover
    :focus
    :active
    .is-open
    .is-active

### 3. Скільки часу?

    150ms
    200ms
    300ms

### 4. Яка крива?

    ease
    ease-out
    ease-in-out
    cubic-bezier(...)

### 5. Чи потрібна затримка?

    delay

---

# 88. Формула Transition

Корисно запам'ятати:

    transition:
        property
        duration
        timing-function
        delay;

Наприклад:

    transition:
        transform 300ms ease 0ms;

Або:

    transition:
        opacity 200ms ease,
        transform 300ms ease-out;

---

# 89. Що потрібно знати на рівні Core

Ти повинен розуміти:

    transition
    transition-property
    transition-duration
    transition-timing-function
    transition-delay

Також:

    hover
    focus
    active
    transform
    opacity

І вміти написати:

    .button {
        transition: transform 200ms ease;
    }

    .button:hover {
        transform: translateY(-2px);
    }

---

# 90. Що потрібно знати на рівні Junior

Junior повинен вміти:

- створювати hover transitions;
- анімувати кнопки;
- анімувати links;
- робити card hover;
- використовувати `transform`;
- використовувати `opacity`;
- створювати dropdown transitions;
- створювати modal transitions;
- використовувати кілька transitions;
- розуміти `transition: all`;
- правильно працювати з focus;
- враховувати `prefers-reduced-motion`.

---

# 91. Що потрібно знати на рівні Middle

Middle повинен розуміти:

- timing functions;
- `cubic-bezier()`;
- `steps()`;
- transition interruption;
- stacking context;
- layout vs transform;
- performance;
- `opacity + transform`;
- CSS architecture для transition tokens;
- accessibility;
- складні state transitions;
- interaction design.

---

# 92. Що потрібно знати на рівні Senior

Senior повинен розуміти:

- rendering pipeline;
- layout / paint / compositing;
- performance implications;
- design-system motion tokens;
- consistency motion patterns;
- reduced-motion strategies;
- interaction choreography;
- complex component state transitions;
- browser differences;
- UX та accessibility trade-offs.

---

# 93. Практичні вправи

## Вправа 1 — Button Hover

Створи кнопку.

Вимоги:

    background-color
    color
    transform

Додай плавний hover.

---

## Вправа 2 — Card Hover

Створи card.

При hover:

    translateY(-5px)
    box-shadow

Зроби плавний transition.

---

## Вправа 3 — Image Zoom

Створи контейнер:

    .image-wrapper

Всередині:

    <img>

При hover зображення повинно:

    scale(1.05)

Контейнер:

    overflow: hidden;

---

## Вправа 4 — Animated Link

Створи link.

При hover:

    ::after
    scaleX(0 → 1)

---

## Вправа 5 — Input Focus

Створи input.

При focus:

    border-color
    box-shadow

Обидві властивості повинні переходити плавно.

---

## Вправа 6 — Dropdown

Створи:

    .dropdown

Стан:

    hidden
    open

Використай:

    opacity
    transform
    pointer-events

---

## Вправа 7 — Modal

Створи modal.

Closed:

    opacity: 0;
    transform: scale(0.95);

Open:

    opacity: 1;
    transform: scale(1);

---

## Вправа 8 — Tooltip

Створи tooltip.

Hidden:

    opacity: 0;
    transform: translateY(5px);

Visible:

    opacity: 1;
    transform: translateY(0);

---

## Вправа 9 — Accordion

Створи accordion.

Спробуй реалізувати відкриття через:

    max-height

Потім спробуй сучасний варіант із:

    grid-template-rows

---

## Вправа 10 — Reduced Motion

Для всіх створених компонентів додай:

    @media (prefers-reduced-motion: reduce)

і зменш або вимкни декоративні переходи.

---

# 94. Міні-проект

Створи невелику UI-сторінку:

    Header
    Hero
    Cards
    Buttons
    Form
    Dropdown
    Modal
    Tooltip
    Footer

Використай transitions для:

    1. Button hover
    2. Link underline
    3. Card hover
    4. Input focus
    5. Dropdown
    6. Modal
    7. Tooltip
    8. Image zoom

Правило:

> Не використовуй transition просто "для краси". Кожен transition повинен мати UX-причину.

---

# 95. Типові помилки

## Помилка 1

    transition: all 2s;

Краще:

    transition:
        transform 200ms ease;

---

## Помилка 2

Transition тільки в `:hover`:

    .button:hover {
        transition: transform 300ms ease;
    }

Краще:

    .button {
        transition: transform 300ms ease;
    }

---

## Помилка 3

Надто довгі переходи:

    transition: all 5s;

---

## Помилка 4

Анімувати `top` / `left`, коли достатньо `transform`.

---

## Помилка 5

Прибирати `outline` без альтернативного focus-стану.

---

## Помилка 6

Не враховувати:

    prefers-reduced-motion

---

## Помилка 7

Намагатися плавно перейти:

    height: 0 → height: auto;

---

# 96. Interview Questions

### 1. Що таке CSS transition?

Плавний перехід між двома значеннями CSS-властивості.

### 2. Чим transition відрізняється від animation?

Transition працює як перехід між станами, а animation може виконувати послідовність keyframes.

### 3. Які основні властивості transition?

    transition-property
    transition-duration
    transition-timing-function
    transition-delay

### 4. Що робить `transition: all`?

Застосовує transition до всіх властивостей, які можуть анімуватися.

### 5. Чому `transition: all` може бути небажаним?

Тому що можуть анімуватися властивості, які не планувалося анімувати, а CSS стає менш передбачуваним.

### 6. Що робить `transition-duration`?

Визначає тривалість переходу.

### 7. Що робить `transition-delay`?

Затримує початок переходу.

### 8. Що робить `transition-timing-function`?

Визначає криву швидкості переходу.

### 9. Чи можна transition для `display: none`?

Звичайний transition не анімує `display` так, як `opacity` або `transform`.

### 10. Чому часто використовують `opacity + transform`?

Це зручний патерн для плавної появи, зникнення та руху UI-елементів.

### 11. Чи працює transition без зміни стану?

Ні. Transition потребує зміни значення властивості.

### 12. Де краще задавати transition?

Зазвичай у базовому стані елемента, а не тільки в `:hover`.

### 13. Що таке `cubic-bezier()`?

Функція для створення власної timing curve.

### 14. Для чого `prefers-reduced-motion`?

Для врахування налаштувань користувача щодо зменшення руху.

---

# 97. Міні-шпаргалка

    /* Один transition */
    transition: transform 300ms ease;

    /* Кілька */
    transition:
        transform 300ms ease,
        opacity 200ms ease;

    /* Властивості окремо */
    transition-property: transform;
    transition-duration: 300ms;
    transition-timing-function: ease;
    transition-delay: 100ms;

    /* Hover */
    .button {
        transition: transform 200ms ease;
    }

    .button:hover {
        transform: translateY(-2px);
    }

    /* Fade */
    .element {
        opacity: 0;
        transition: opacity 200ms ease;
    }

    .element.is-visible {
        opacity: 1;
    }

    /* Slide */
    .element {
        opacity: 0;
        transform: translateY(10px);

        transition:
            opacity 200ms ease,
            transform 200ms ease;
    }

    .element.is-visible {
        opacity: 1;
        transform: translateY(0);
    }

    /* Scale */
    .modal {
        opacity: 0;
        transform: scale(0.95);

        transition:
            opacity 200ms ease,
            transform 200ms ease;
    }

    .modal.is-open {
        opacity: 1;
        transform: scale(1);
    }

---

# 98. Найважливіше запам'ятати

    transition
        ↓
    плавний перехід між станами

Основна структура:

    transition:
        property
        duration
        timing-function
        delay;

Найчастіше:

    transition:
        transform 200ms ease;

Для сучасного UI дуже корисний патерн:

    opacity
    +
    transform

Наприклад:

    .element {
        opacity: 0;
        transform: translateY(10px);

        transition:
            opacity 200ms ease,
            transform 200ms ease;
    }

    .element.is-visible {
        opacity: 1;
        transform: translateY(0);
    }

---

# 99. Головна ментальна модель

Запам'ятай:

    CSS state
        ↓
    зміна властивості
        ↓
    transition
        ↓
    duration
        ↓
    timing function
        ↓
    плавний UI

Наприклад:

    normal
        ↓
    :hover
        ↓
    transform: translateY(-2px)
        ↓
    transition: transform 200ms ease
        ↓
    плавний рух

---

# 100. Що треба вміти після цієї теми

Після вивчення `08-transitions` ти повинен уміти самостійно створювати:

    ✓ Button hover
    ✓ Link hover
    ✓ Card hover
    ✓ Input focus
    ✓ Image zoom
    ✓ Tooltip
    ✓ Dropdown
    ✓ Modal
    ✓ Fade effect
    ✓ Slide effect
    ✓ Scale effect
    ✓ Underline animation
    ✓ Multiple transitions
    ✓ Reduced-motion fallback

І головне — розуміти:

> **Transition — це не просто "додати плавність". Це спосіб керувати візуальним переходом між станами UI.**

Правильний підхід:

    JavaScript
        ↓
    змінює стан / class

    CSS
        ↓
    визначає новий стан

    transition
        ↓
    робить зміну плавною

    transform + opacity
        ↓
    часто є найкращою основою
    для плавних UI-переходів