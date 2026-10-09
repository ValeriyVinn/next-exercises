# 03. Positioning

CSS positioning (`position`) визначає, як елемент розміщується відносно звичайного потоку документа, батьківського елемента або viewport.

Positioning використовується для:

- точного розміщення елементів;
- створення overlay;
- модальних вікон;
- dropdown-меню;
- tooltip;
- fixed navigation;
- sticky header;
- бейджів та іконок поверх інших елементів;
- декоративних елементів;
- накладання (`overlap`) елементів.

Основна властивість:

    position: static | relative | absolute | fixed | sticky;

Для керування положенням використовуються:

    top
    right
    bottom
    left

А також сучасний логічний варіант:

    inset
    inset-block
    inset-inline

Для керування шарами:

    z-index


## Ключові поняття

| Властивість / значення | Що робить |
|---|---|
| `position: static` | звичайне позиціонування |
| `position: relative` | залишається у потоці, але може бути зміщений |
| `position: absolute` | вилучається з потоку |
| `position: fixed` | позиціонується відносно viewport |
| `position: sticky` | поводиться як `relative`, потім "прилипає" |
| `top` | відстань зверху |
| `right` | відстань справа |
| `bottom` | відстань знизу |
| `left` | відстань зліва |
| `inset` | скорочений запис для `top/right/bottom/left` |
| `z-index` | порядок шарів |
| `static` | елемент у normal flow |

---

# 1. Normal Flow

Перед вивченням `position` потрібно зрозуміти звичайний потік документа.

За замовчуванням:

    .box {
        position: static;
    }

Елементи розташовуються відповідно до normal flow:

    <div>Block 1</div>
    <div>Block 2</div>
    <div>Block 3</div>

Блоки розташуються один під одним.

Наприклад:

    .box {
        width: 200px;
        height: 100px;
        margin: 10px;
    }

Схематично:

    ┌──────────────┐
    │    Box 1     │
    └──────────────┘

    ┌──────────────┐
    │    Box 2     │
    └──────────────┘

    ┌──────────────┐
    │    Box 3     │
    └──────────────┘


## Що потрібно пам'ятати

`position: static` — це значення за замовчуванням.

    .box {
        position: static;
    }

При `static`:

- елемент знаходиться у normal flow;
- `top` не працює;
- `right` не працює;
- `bottom` не працює;
- `left` не працює;
- `z-index` не використовується для звичайного позиціонування такого елемента.

Наприклад:

    .box {
        position: static;
        top: 50px;
        left: 50px;
    }

`top` та `left` тут не змістять елемент.

---

# 2. position: relative

`relative` означає:

> елемент залишається у звичайному потоці, але його можна змістити відносно його початкового положення.

    .box {
        position: relative;
        top: 20px;
        left: 30px;
    }

Елемент зміститься:

- на `20px` вниз;
- на `30px` вправо.

Але його початкове місце у layout залишається зарезервованим.

---

## Relative не вилучає елемент із потоку

Наприклад:

    .box {
        position: relative;
        top: 30px;
    }

Схематично:

    Початково:

    ┌──────────────┐
    │     Box 1    │
    └──────────────┘
    ┌──────────────┐
    │     Box 2    │
    └──────────────┘

    Після зміщення Box 1:

             ┌──────────────┐
             │     Box 1    │
             └──────────────┘
    ┌──────────────┐
    │     Box 2    │
    └──────────────┘

Місце Box 1 все одно залишається у layout.

---

# 3. Relative + top / right / bottom / left

Основні властивості:

    .box {
        position: relative;

        top: 10px;
        right: 20px;
        bottom: 30px;
        left: 40px;
    }

На практиці зазвичай використовують одну або дві.

Наприклад:

    .box {
        position: relative;
        top: 10px;
        left: 20px;
    }

Це означає:

- `top: 10px` → вниз на 10px;
- `left: 20px` → вправо на 20px.

---

## Від'ємні значення

Можна використовувати від'ємні значення:

    .box {
        position: relative;
        top: -10px;
        left: -20px;
    }

Елемент:

- підніметься на `10px`;
- переміститься вліво на `20px`.

---

# 4. Relative як "якір" для absolute

Це одна з найважливіших концепцій CSS positioning.

Дуже часто:

    parent {
        position: relative;
    }

    child {
        position: absolute;
    }

`relative` на батьківському елементі створює reference point для `absolute`-дитини.

Наприклад:

    .card {
        position: relative;
    }

    .badge {
        position: absolute;
        top: 10px;
        right: 10px;
    }

HTML:

    <div class="card">
        <h2>Product</h2>
        <span class="badge">NEW</span>
    </div>

Тепер `.badge` позиціонується відносно `.card`.

Це один із найпоширеніших шаблонів у frontend.

---

# 5. position: absolute

`absolute`:

- вилучає елемент із normal flow;
- дозволяє позиціонувати його відносно певного ancestor;
- може накладатися на інші елементи.

    .box {
        position: absolute;
        top: 20px;
        left: 30px;
    }

Після цього елемент більше не займає своє звичайне місце у потоці.

---

# 6. Containing Block для absolute

Для `position: absolute` дуже важливо знати:

> Absolute-елемент позиціонується відносно свого containing block.

Найпоширеніший практичний варіант:

    .parent {
        position: relative;
    }

    .child {
        position: absolute;
        top: 0;
        right: 0;
    }

HTML:

    <div class="parent">
        <div class="child">
            Badge
        </div>
    </div>

У такому випадку `.child` буде прив'язаний до `.parent`.

---

## Найпоширеніший шаблон

    .card {
        position: relative;
    }

    .card__badge {
        position: absolute;
        top: 8px;
        right: 8px;
    }

Цей шаблон використовується для:

- badges;
- notification dots;
- close buttons;
- icons;
- overlays;
- decorative elements.

---

# 7. Absolute вилучається з потоку

Наприклад:

    .box {
        position: absolute;
        top: 0;
        left: 0;
    }

Інші елементи поводяться так, ніби цього елемента у normal flow немає.

Це головна відмінність від `relative`.

### Relative

    position: relative;

Елемент:

- залишається у потоці;
- його початкове місце зберігається;
- його можна змістити.

### Absolute

    position: absolute;

Елемент:

- вилучається з потоку;
- його початкове місце не резервується;
- він позиціонується відносно containing block.

---

# 8. Absolute + inset

Замість:

    .modal {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

можна написати:

    .modal {
        position: absolute;
        inset: 0;
    }

`inset: 0` означає:

    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

Це дуже зручний сучасний CSS-синтаксис.

---

# 9. inset

Можна задавати всі сторони:

    .box {
        position: absolute;
        inset: 10px 20px 30px 40px;
    }

Порядок такий самий, як у `margin`:

    top
    right
    bottom
    left

Можна також:

    .box {
        position: absolute;
        inset: 10px 20px;
    }

Це приблизно:

    top: 10px;
    bottom: 10px;
    left: 20px;
    right: 20px;

---

# 10. Центрування absolute-елемента

Класичний спосіб:

    .parent {
        position: relative;
    }

    .child {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

HTML:

    <div class="parent">
        <div class="child">
            Center
        </div>
    </div>

`top: 50%` та `left: 50%` ставлять верхній лівий кут у центр.

`transform` зміщує елемент назад на половину його власного розміру.

---

# 11. Absolute для overlay

Наприклад, картинка з темним overlay:

    .image {
        position: relative;
    }

    .image::after {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
    }

HTML:

    <div class="image">
        <img src="photo.jpg" alt="Photo">
    </div>

Схема:

    ┌─────────────────────────────┐
    │                             │
    │          IMAGE              │
    │                             │
    │      ┌──────────────┐       │
    │      │   OVERLAY    │       │
    │      └──────────────┘       │
    │                             │
    └─────────────────────────────┘

---

# 12. position: fixed

`fixed` позиціонує елемент відносно viewport.

    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }

Елемент залишається на одному місці під час прокручування сторінки.

Типові випадки:

- fixed header;
- fixed navigation;
- floating button;
- cookie banner;
- modal;
- "back to top" button.

---

# 13. Fixed header

    .header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
    }

Проблема:

fixed-елемент вилучений із normal flow.

Тому контент може опинитися під header.

Наприклад:

    .header {
        position: fixed;
        top: 0;
        height: 70px;
    }

    main {
        padding-top: 70px;
    }

Це компенсує висоту header.

---

# 14. Fixed і viewport

Наприклад:

    .button {
        position: fixed;
        right: 20px;
        bottom: 20px;
    }

Кнопка буде знаходитися у правому нижньому куті viewport.

Це типовий варіант:

    ┌───────────────────────────────┐
    │                               │
    │           PAGE                │
    │                               │
    │                               │
    │                       ┌─────┐ │
    │                       │  ↑  │ │
    │                       └─────┘ │
    └───────────────────────────────┘

---

# 15. position: sticky

`sticky` поєднує поведінку `relative` та "прилипання".

Наприклад:

    .header {
        position: sticky;
        top: 0;
    }

До моменту прокручування елемент поводиться приблизно як звичайний елемент.

Коли він досягає `top: 0`, він прилипає до верхньої межі scroll container.

---

# 16. Простий sticky header

    header {
        position: sticky;
        top: 0;
        z-index: 10;
    }

HTML:

    <header>
        Navigation
    </header>

    <main>
        Long content...
    </main>

Під час scroll header залишається зверху.

---

# 17. Sticky потребує threshold

Це важливо:

    position: sticky;

сам по собі недостатній.

Потрібно задати хоча б одну threshold-властивість:

    top: 0;

або:

    bottom: 0;

Наприклад:

    .sidebar {
        position: sticky;
        top: 20px;
    }

---

# 18. Sticky vs Fixed

### `fixed`

    position: fixed;
    top: 0;

Елемент:

- вилучається з normal flow;
- прив'язаний до viewport;
- залишається fixed під час scroll.

### `sticky`

    position: sticky;
    top: 0;

Елемент:

- спочатку бере участь у layout;
- прилипає при прокручуванні;
- залежить від scroll container та його меж.

---

# 19. Sticky sidebar

Дуже поширений layout:

    .layout {
        display: grid;
        grid-template-columns: 250px 1fr;
        gap: 30px;
    }

    .sidebar {
        position: sticky;
        top: 20px;
    }

HTML:

    <div class="layout">
        <aside class="sidebar">
            Navigation
        </aside>

        <main>
            Long content...
        </main>
    </div>

Sidebar може залишатися видимим під час прокручування контенту.

---

# 20. Чому sticky іноді не працює

Це одна з поширених проблем.

Причини можуть бути:

- немає `top`, `bottom` тощо;
- батьківський контейнер має проблемний `overflow`;
- недостатньо місця для sticky-елемента;
- висота scroll container не дозволяє ефекту;
- sticky знаходиться в контейнері, який обмежує його рух.

Наприклад:

    .parent {
        overflow: hidden;
    }

    .child {
        position: sticky;
        top: 0;
    }

Не варто автоматично вважати, що `sticky` буде працювати так, як на рівні viewport.

---

# 21. top / right / bottom / left

Ці властивості задають відстані для positioned elements.

Наприклад:

    .box {
        position: absolute;
        top: 20px;
        left: 30px;
    }

`top`:

    top: 20px;

означає відступ від верхньої reference edge.

`left`:

    left: 30px;

означає відступ від лівої reference edge.

---

# 22. top і bottom одночасно

Можна задати:

    .box {
        position: absolute;
        top: 20px;
        bottom: 20px;
    }

Це дозволяє розтягнути елемент між двома межами, якщо інші constraints не конфліктують.

Аналогічно:

    .box {
        position: absolute;
        left: 20px;
        right: 20px;
    }

---

# 23. Width + left + right

Наприклад:

    .box {
        position: absolute;
        left: 20px;
        right: 20px;
    }

Елемент може зайняти доступний простір між `left` та `right`.

У сучасному CSS це часто зручніше, ніж вручну рахувати:

    width: calc(100% - 40px);

---

# 24. z-index

`z-index` визначає порядок накладання елементів.

    .modal {
        position: fixed;
        z-index: 1000;
    }

Чим більший `z-index`, тим вище елемент у stacking order — але тільки в межах відповідного stacking context.

---

# 25. Простий приклад z-index

    .box-a {
        position: absolute;
        z-index: 1;
    }

    .box-b {
        position: absolute;
        z-index: 2;
    }

`box-b` буде поверх `box-a`, якщо вони належать до відповідного stacking context і інші правила не змінюють порядок.

---

# 26. z-index не є "глобальним"

Поширена помилка:

    z-index: 999999;

Не гарантує, що елемент буде поверх абсолютно всього.

Причина — `stacking context`.

Наприклад:

    .parent {
        position: relative;
        z-index: 1;
    }

    .child {
        position: absolute;
        z-index: 999999;
    }

Інший незалежний stacking context може все одно знаходитися вище.

Тому не варто вирішувати всі проблеми шарами величезними числами.

---

# 27. Stacking Context

Stacking context — це незалежний контекст накладання елементів.

Він може створюватися різними CSS-властивостями.

Наприклад:

    .element {
        position: relative;
        z-index: 1;
    }

Також stacking context можуть створювати:

- `position` + `z-index`;
- `opacity < 1`;
- `transform`;
- `filter`;
- `isolation: isolate`;
- деякі значення `contain`;
- інші сучасні CSS-механізми.

Для Junior достатньо розуміти:

> `z-index` працює не просто як глобальне число. Він працює всередині stacking contexts.

---

# 28. isolation: isolate

Іноді корисно створити окремий stacking context:

    .component {
        isolation: isolate;
    }

Це може спростити контроль `z-index` всередині компонента.

Наприклад:

    .card {
        isolation: isolate;
    }

    .card__background {
        position: absolute;
        z-index: -1;
    }

Такий підхід може бути корисним для складних UI-компонентів.

---

# 29. Positioning і display

`position` та `display` — різні поняття.

`display` визначає тип layout:

    display: block;
    display: flex;
    display: grid;

`position` визначає спосіб позиціонування:

    position: relative;
    position: absolute;
    position: fixed;
    position: sticky;

Їх можна комбінувати:

    .card {
        display: flex;
        position: relative;
    }

---

# 30. Positioning + Flexbox

Наприклад:

    .card {
        display: flex;
        position: relative;
    }

    .badge {
        position: absolute;
        top: 10px;
        right: 10px;
    }

Flexbox керує основним layout.

Absolute — позиціонує badge.

Це нормальна і дуже поширена комбінація.

---

# 31. Positioning + Grid

Наприклад:

    .hero {
        display: grid;
        position: relative;
    }

    .hero__overlay {
        position: absolute;
        inset: 0;
    }

Grid відповідає за layout, а positioning — за overlay.

Не потрібно намагатися вирішити всі задачі одним механізмом.

---

# 32. Negative values

Позиціонування може використовувати від'ємні значення.

    .badge {
        position: absolute;
        top: -10px;
        right: -10px;
    }

Це часто використовується для notification badge.

Наприклад:

    .icon {
        position: relative;
    }

    .notification {
        position: absolute;
        top: -5px;
        right: -5px;
    }

---

# 33. Percentage у positioning

Відсоткові значення можуть бути дуже корисними:

    .box {
        position: absolute;
        left: 50%;
    }

Особливо часто:

    top: 50%;
    left: 50%;

разом із:

    transform: translate(-50%, -50%);

---

# 34. Transform vs position

Для переміщення елемента можна використовувати:

    position: relative;
    left: 20px;

або:

    transform: translateX(20px);

Вони не повністю еквівалентні.

`position` змінює геометрію positioned element відповідно до правил layout/positioning.

`transform` візуально трансформує вже сформований box.

Наприклад:

    .box {
        transform: translateX(20px);
    }

Для UI-анімацій `transform` часто кращий.

---

# 35. Transform і stacking context

Важливий момент:

    .box {
        transform: translateX(0);
    }

Навіть фактично "нульовий" transform може впливати на stacking context та positioning descendant-елементів.

Тому `transform` не варто бездумно додавати до великих wrapper-елементів.

---

# 36. Absolute і розмір елемента

Якщо елемент має:

    position: absolute;

але не має:

    width

або достатньої кількості constraints, його розмір може визначатися вмістом та іншими правилами.

Наприклад:

    .badge {
        position: absolute;
        top: 10px;
        right: 10px;
    }

Badge може мати ширину за своїм текстом.

---

# 37. Absolute inset: 0

Дуже поширений патерн:

    .overlay {
        position: absolute;
        inset: 0;
    }

Це означає:

    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

Таким способом overlay займає весь containing block.

---

# 38. Full-size overlay

    .card {
        position: relative;
    }

    .overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
    }

Тепер overlay покриває весь `.card`.

---

# 39. Pointer events і overlay

Overlay може блокувати взаємодію з елементами під ним.

Наприклад:

    .overlay {
        position: absolute;
        inset: 0;
    }

Якщо overlay не повинен перехоплювати mouse events:

    .overlay {
        pointer-events: none;
    }

Це часто використовується для декоративних шарів.

---

# 40. Positioning і overflow

Positioning часто зустрічається разом з `overflow`.

Наприклад:

    .card {
        position: relative;
        overflow: hidden;
    }

    .image {
        position: absolute;
        inset: 0;
    }

`overflow: hidden` обрізає все, що виходить за межі `.card`.

Це корисно для:

- image overlays;
- rounded corners;
- decorative shapes.

Але потрібно пам'ятати:

> `overflow: hidden` може обрізати dropdown, tooltip, box-shadow або інший positioned content.

---

# 41. Positioning і border-radius

Поширений шаблон:

    .card {
        position: relative;
        overflow: hidden;
        border-radius: 16px;
    }

    .card__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

`overflow: hidden` дозволяє обрізати зображення по rounded corners.

---

# 42. Logical positioning properties

Сучасний CSS має логічні властивості.

Замість:

    top
    right
    bottom
    left

можна використовувати:

    inset-block-start
    inset-block-end
    inset-inline-start
    inset-inline-end

Наприклад:

    .box {
        position: absolute;
        inset-inline-start: 20px;
        inset-block-start: 10px;
    }

Це краще працює з різними writing modes та напрямками тексту.

---

# 43. inset-inline

Наприклад:

    .box {
        position: absolute;
        inset-inline: 20px;
    }

Це задає початкову та кінцеву inline-відстані.

У типовому `ltr` layout це приблизно відповідає:

    left: 20px;
    right: 20px;

Але logical properties не прив'язані безпосередньо до фізичних сторін.

---

# 44. inset-block

    .box {
        position: absolute;
        inset-block: 10px;
    }

У типовому horizontal writing mode це приблизно:

    top: 10px;
    bottom: 10px;

---

# 45. Static vs Relative

### Static

    .box {
        position: static;
    }

- normal flow;
- `top/left` не працюють;
- стандартна поведінка.

### Relative

    .box {
        position: relative;
        top: 10px;
    }

- normal flow;
- початкове місце зберігається;
- можна зміщувати;
- створює корисний containing block для absolute descendants.

---

# 46. Relative vs Absolute

| `relative` | `absolute` |
|---|---|
| залишається у flow | вилучається з flow |
| місце зберігається | місце не зберігається |
| зміщується від початкового положення | позиціонується від containing block |
| часто використовується як anchor | часто використовується для overlay |

---

# 47. Absolute vs Fixed

| `absolute` | `fixed` |
|---|---|
| залежить від containing block | зазвичай прив'язаний до viewport |
| вилучається з flow | вилучається з flow |
| часто всередині component | часто для глобального UI |
| badge, overlay | header, modal, floating button |

---

# 48. Fixed vs Sticky

| `fixed` | `sticky` |
|---|---|
| одразу позиціонований поза flow | спочатку бере участь у flow |
| зазвичай viewport | залежить від scroll container |
| не займає місця | місце в layout зберігається |
| header/modal/floating button | sticky header/sidebar |

---

# 49. Sticky vs Relative

`sticky` до досягнення threshold поводиться подібно до `relative`.

Наприклад:

    .title {
        position: sticky;
        top: 0;
    }

До прокручування він знаходиться у звичайному місці.

Після досягнення `top: 0` починає "прилипати".

---

# 50. Positioning і HTML semantics

`position` не змінює семантику HTML.

Наприклад:

    <button class="close-button">
        ×
    </button>

залишається `button`, навіть якщо:

    .close-button {
        position: absolute;
    }

CSS відповідає за presentation/layout.

HTML — за структуру та семантику.

---

# 51. Типовий component pattern

Один із найважливіших шаблонів frontend:

    .component {
        position: relative;
    }

    .component__element {
        position: absolute;
        inset: 0;
    }

Наприклад:

    .card {
        position: relative;
    }

    .card__overlay {
        position: absolute;
        inset: 0;
    }

Запам'ятати цей шаблон дуже корисно.

---

# 52. Modal

Спрощений modal:

    .modal {
        position: fixed;
        inset: 0;
        display: grid;
        place-items: center;
    }

Тут:

- `fixed` → modal прив'язаний до viewport;
- `inset: 0` → займає весь viewport;
- `display: grid` → центрування;
- `place-items: center` → центр.

---

# 53. Modal з overlay

    .modal {
        position: fixed;
        inset: 0;
        display: grid;
        place-items: center;
        background: rgba(0, 0, 0, 0.5);
    }

    .modal__content {
        width: min(500px, 90%);
        padding: 24px;
        background: white;
    }

Це один із типових патернів реального UI.

---

# 54. Dropdown

    .dropdown {
        position: relative;
    }

    .dropdown__menu {
        position: absolute;
        top: 100%;
        left: 0;
    }

`top: 100%` означає:

> розмістити верхню межу menu після нижньої межі reference element.

Наприклад:

    .dropdown__menu {
        position: absolute;
        top: 100%;
        left: 0;
    }

---

# 55. Dropdown + z-index

    .dropdown {
        position: relative;
    }

    .dropdown__menu {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 100;
    }

Це допомагає розмістити меню поверх сусіднього контенту.

Але якщо ancestor створює clipping або stacking context, одного `z-index` може бути недостатньо.

---

# 56. Tooltip

    .tooltip {
        position: relative;
    }

    .tooltip__content {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
    }

Це означає:

- `bottom: 100%` → над елементом;
- `left: 50%` → до центру;
- `translateX(-50%)` → центрування.

---

# 57. Badge

    .avatar {
        position: relative;
    }

    .avatar__badge {
        position: absolute;
        right: 0;
        bottom: 0;
    }

HTML:

    <div class="avatar">
        <img src="avatar.jpg" alt="User">
        <span class="avatar__badge"></span>
    </div>

---

# 58. Close button

    .modal {
        position: relative;
    }

    .modal__close {
        position: absolute;
        top: 10px;
        right: 10px;
    }

Це дуже поширений component pattern.

---

# 59. Common mistake: absolute без relative

Помилка:

    .card {
        /* position: relative; відсутній */
    }

    .badge {
        position: absolute;
        top: 10px;
        right: 10px;
    }

Потім developer дивується, чому badge позиціонується не відносно `.card`.

Краще:

    .card {
        position: relative;
    }

    .badge {
        position: absolute;
        top: 10px;
        right: 10px;
    }

---

# 60. Common mistake: використовувати absolute для всього layout

Не варто будувати всю сторінку через:

    position: absolute;

Наприклад, не потрібно позиціонувати таким способом всі картки:

    .card-1 {
        position: absolute;
        left: 20px;
    }

    .card-2 {
        position: absolute;
        left: 250px;
    }

    .card-3 {
        position: absolute;
        left: 480px;
    }

Для layout краще використовувати:

    display: flex;

або:

    display: grid;

`absolute` — інструмент точного позиціонування, а не заміна Flexbox/Grid.

---

# 61. Common mistake: margin замість positioning

Іноді розробник використовує:

    margin-left: 300px;

щоб "поставити" елемент у певне місце.

Але якщо завдання полягає у справжньому positioning, краще використовувати відповідний механізм.

Для layout:

    display: flex;
    display: grid;

Для overlay:

    position: absolute;

Для fixed UI:

    position: fixed;

Для sticky UI:

    position: sticky;

---

# 62. Common mistake: величезний z-index

Поганий підхід:

    z-index: 999999999;

Ще гірший:

    z-index: 9999999999;

Краще організувати stacking context та систему шарів.

Наприклад:

    :root {
        --z-dropdown: 100;
        --z-header: 200;
        --z-modal: 1000;
        --z-tooltip: 1100;
    }

Тоді:

    .dropdown {
        z-index: var(--z-dropdown);
    }

    .modal {
        z-index: var(--z-modal);
    }

Це значно легше підтримувати.

---

# 63. Common mistake: fixed без урахування контенту

Наприклад:

    header {
        position: fixed;
        top: 0;
        height: 80px;
    }

Але `main` не має компенсації.

Тоді перший контент може бути схований під header.

Варіант:

    main {
        padding-top: 80px;
    }

У реальному проєкті краще використовувати CSS custom property:

    :root {
        --header-height: 80px;
    }

    header {
        height: var(--header-height);
    }

    main {
        padding-top: var(--header-height);
    }

---

# 64. Common mistake: sticky без top

Помилка:

    .sidebar {
        position: sticky;
    }

Правильніше:

    .sidebar {
        position: sticky;
        top: 20px;
    }

---

# 65. Common mistake: sticky всередині неправильного container

Якщо sticky не працює, перевір:

1. Чи є `top`?
2. Який елемент є scroll container?
3. Чи немає `overflow`, який змінює поведінку?
4. Чи достатня висота батьківського контейнера?
5. Чи не закінчується контейнер раніше, ніж очікується?

---

# 66. Positioning і accessibility

CSS positioning не повинен використовуватися для приховування важливого контенту без розуміння accessibility.

Наприклад, не варто просто переміщувати текст за межі viewport:

    position: absolute;
    left: -9999px;

як універсальний спосіб приховування.

Для visually-hidden елементів використовують спеціальні accessibility-патерни, які дозволяють приховати елемент візуально, але залишити його доступним для screen readers.

---

# 67. Positioning і focus

Особливо важливо для:

- dropdown;
- modal;
- mobile menu;
- tooltip;
- popover.

Потрібно враховувати:

- keyboard navigation;
- focus;
- screen readers;
- escape;
- focus trap для modal;
- правильну семантику HTML.

CSS positioning вирішує layout, але не вирішує accessibility поведінку.

---

# 68. Positioning і responsive design

Не варто жорстко позиціонувати елементи:

    left: 527px;
    top: 183px;

якщо layout повинен адаптуватися.

Краще:

    right: 1rem;
    bottom: 1rem;

або:

    inset-inline-end: 1rem;

або використовувати:

    display: flex;

    display: grid;

Positioning повинен враховувати responsive layout.

---

# 69. Positioning і `calc()`

Можна комбінувати positioning з `calc()`:

    .sidebar {
        position: fixed;
        top: 80px;
        height: calc(100vh - 80px);
    }

Це корисно для fixed layout.

---

# 70. Positioning і viewport units

Наприклад:

    .hero {
        min-height: 100vh;
    }

Або:

    .modal {
        min-height: 100dvh;
    }

Сучасні viewport units:

    vh
    vw
    svh
    lvh
    dvh

Особливо `dvh` корисний для mobile viewport.

---

# 71. Fixed mobile UI

Наприклад:

    .mobile-nav {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
    }

Це типовий mobile navigation pattern.

Але на мобільних пристроях потрібно також враховувати safe areas.

Наприклад:

    .mobile-nav {
        padding-bottom: env(safe-area-inset-bottom);
    }

---

# 72. `bottom: 0` і safe area

Для mobile UI:

    .bottom-bar {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        padding-bottom: env(safe-area-inset-bottom);
    }

Це допомагає враховувати області екрана, зайняті системним UI на деяких пристроях.

---

# 73. Modern pattern: component positioning

Хороша структура:

    .card {
        position: relative;
    }

    .card__badge {
        position: absolute;
        inset-block-start: 1rem;
        inset-inline-end: 1rem;
    }

Це краще масштабується, ніж жорстке:

    top: 17px;
    right: 23px;

---

# 74. Modern pattern: logical properties

Замість:

    left: 0;

можна:

    inset-inline-start: 0;

Замість:

    right: 0;

можна:

    inset-inline-end: 0;

Замість:

    top: 0;

можна:

    inset-block-start: 0;

Це особливо корисно для міжнародних інтерфейсів.

---

# 75. Що потрібно пам'ятати

### `static`

Звичайний layout.

    position: static;

### `relative`

Залишається у flow.

    position: relative;

### `absolute`

Вилучається з flow.

    position: absolute;

### `fixed`

Прив'язаний до viewport / відповідного fixed positioning context.

    position: fixed;

### `sticky`

Прилипає під час scroll.

    position: sticky;
    top: 0;

---

# 76. Головна схема Positioning

Запам'ятай:

    static
        ↓
    normal flow

    relative
        ↓
    normal flow + зміщення
        ↓
    часто anchor для absolute

    absolute
        ↓
    поза normal flow
        ↓
    containing block

    fixed
        ↓
    поза normal flow
        ↓
    viewport / fixed positioning context

    sticky
        ↓
    normal flow
        ↓
    sticky threshold
        ↓
    "прилипання"

---

# 77. Коли що використовувати

| Завдання | Рішення |
|---|---|
| звичайний layout | `static` |
| трохи змістити елемент | `relative` |
| anchor для badge/overlay | `relative` |
| badge | `absolute` |
| overlay | `absolute` |
| dropdown | `absolute` |
| tooltip | `absolute` |
| close button | `absolute` |
| modal | `fixed` |
| fixed header | `fixed` |
| floating button | `fixed` |
| sticky header | `sticky` |
| sticky sidebar | `sticky` |
| основний layout | `flex` / `grid` |

---

# 78. Positioning не замінює Flexbox і Grid

Дуже важливе правило:

> Layout → Flexbox/Grid  
> Positioning → точне розташування та накладання

Наприклад:

    .cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }

    .card {
        position: relative;
    }

    .card__badge {
        position: absolute;
        top: 10px;
        right: 10px;
    }

Тут кожен інструмент виконує свою задачу.

---

# 79. Практичний приклад: Card

HTML:

    <article class="card">
        <img
            class="card__image"
            src="image.jpg"
            alt="Product"
        >

        <span class="card__badge">
            NEW
        </span>

        <h2 class="card__title">
            Product
        </h2>
    </article>

CSS:

    .card {
        position: relative;
        border-radius: 16px;
        overflow: hidden;
    }

    .card__image {
        display: block;
        width: 100%;
    }

    .card__badge {
        position: absolute;
        top: 12px;
        right: 12px;
        padding: 4px 8px;
    }

Тут:

- `.card` — anchor;
- `.card__badge` — absolute;
- `overflow: hidden` — обрізає вміст по межах card;
- `border-radius` — rounded corners.

---

# 80. Практичний приклад: Modal

HTML:

    <div class="modal">
        <div class="modal__content">
            <button class="modal__close">
                ×
            </button>

            <h2>Modal</h2>
        </div>
    </div>

CSS:

    .modal {
        position: fixed;
        inset: 0;

        display: grid;
        place-items: center;

        padding: 20px;

        background: rgb(0 0 0 / 50%);
    }

    .modal__content {
        position: relative;

        width: min(500px, 100%);
        padding: 24px;

        background: white;
    }

    .modal__close {
        position: absolute;
        top: 10px;
        right: 10px;
    }

---

# 81. Практичний приклад: Dropdown

HTML:

    <div class="dropdown">
        <button class="dropdown__button">
            Menu
        </button>

        <div class="dropdown__menu">
            <a href="#">Profile</a>
            <a href="#">Settings</a>
        </div>
    </div>

CSS:

    .dropdown {
        position: relative;
    }

    .dropdown__menu {
        position: absolute;
        top: calc(100% + 8px);
        left: 0;

        min-width: 200px;
        z-index: 100;
    }

Головна ідея:

    parent → position: relative

    menu → position: absolute

---

# 82. Практичний приклад: Sticky Sidebar

HTML:

    <div class="layout">
        <aside class="sidebar">
            Navigation
        </aside>

        <main class="content">
            Long content...
        </main>
    </div>

CSS:

    .layout {
        display: grid;
        grid-template-columns: 240px 1fr;
        gap: 32px;
    }

    .sidebar {
        position: sticky;
        top: 20px;
        align-self: start;
    }

Це один із найкорисніших практичних прикладів `sticky`.

---

# 83. Практичний приклад: Floating button

HTML:

    <button class="back-to-top">
        ↑
    </button>

CSS:

    .back-to-top {
        position: fixed;
        right: 20px;
        bottom: 20px;
    }

Кнопка залишається у viewport незалежно від scroll.

---

# 84. Практичний приклад: Image overlay

HTML:

    <div class="hero">
        <img src="hero.jpg" alt="Hero">
        <div class="hero__content">
            <h1>Welcome</h1>
        </div>
    </div>

CSS:

    .hero {
        position: relative;
    }

    .hero img {
        display: block;
        width: 100%;
    }

    .hero__content {
        position: absolute;
        inset: 0;

        display: grid;
        place-items: center;
    }

Тут:

    .hero
        ↓
    anchor

    .hero__content
        ↓
    overlay

---

# 85. Debugging Positioning

Якщо positioned element знаходиться не там, де очікується, перевір:

### 1. Який `position`?

    position: static;
    position: relative;
    position: absolute;
    position: fixed;
    position: sticky;

### 2. Який containing block?

Особливо для:

    position: absolute;

### 3. Чи є `top/left/right/bottom`?

### 4. Чи немає `transform` у parent?

### 5. Чи немає `overflow: hidden`?

### 6. Який `z-index`?

### 7. Чи не створює ancestor stacking context?

### 8. Чи не краще тут Flexbox/Grid?

---

# 86. DevTools для Positioning

У браузерних DevTools корисно перевіряти:

- computed `position`;
- `top/right/bottom/left`;
- `z-index`;
- `transform`;
- `overflow`;
- dimensions;
- parent elements;
- stacking context.

Особливо корисно тимчасово додати:

    outline: 2px solid red;

Наприклад:

    .parent {
        position: relative;
        outline: 2px solid red;
    }

    .child {
        position: absolute;
        outline: 2px solid blue;
    }

Це дозволяє побачити реальні межі елементів.

---

# 87. Типові помилки

### ❌ Використовувати absolute для всього layout

    position: absolute;

### ✅ Використовувати Flexbox/Grid

    display: flex;

або:

    display: grid;


### ❌ Забути `position: relative` у parent

    .badge {
        position: absolute;
        top: 0;
        right: 0;
    }

### ✅

    .card {
        position: relative;
    }

    .badge {
        position: absolute;
        top: 0;
        right: 0;
    }


### ❌ Величезний z-index

    z-index: 999999999;

### ✅ Продумана система stacking contexts.


### ❌ Sticky без threshold

    position: sticky;

### ✅

    position: sticky;
    top: 0;


### ❌ Fixed header без компенсації

    header {
        position: fixed;
    }

### ✅ Передбачити місце для header у layout.


### ❌ Жорсткі координати

    left: 527px;
    top: 183px;

### ✅ Responsive positioning

    right: 1rem;
    bottom: 1rem;


# Питання зі співбесіди

## 🟢 Junior

### 1. Які значення має `position`?

Основні:

    static
    relative
    absolute
    fixed
    sticky

### 2. У чому різниця між `relative` і `absolute`?

`relative` залишається у normal flow.

`absolute` вилучається з normal flow.

### 3. Для чого потрібен `position: relative`?

Для:

- зміщення елемента;
- створення reference/containing block для positioned descendants;
- побудови компонентів з absolute-елементами.

### 4. Для чого потрібен `position: absolute`?

Для точного позиціонування елемента відносно його containing block.

### 5. Що робить `position: fixed`?

Фіксує елемент відносно viewport / відповідного fixed positioning context.

### 6. Що робить `position: sticky`?

Елемент бере участь у normal flow, а при scroll прилипає до заданої межі.

### 7. Що таке `z-index`?

Властивість, яка визначає порядок накладання елементів у stacking order.

### 8. Чому `z-index: 9999` не завжди працює?

Через stacking contexts.

### 9. Що робить `inset: 0`?

Еквівалентно:

    top: 0;
    right: 0;
    bottom: 0;
    left: 0;


## 🔵 Middle

### 10. Що таке containing block?

Це область, відносно якої визначаються розміри та/або позиція деяких елементів.

Для `absolute` дуже важливо правильно визначити його containing block.

### 11. Чому `absolute` часто використовують разом із `relative`?

Тому що:

    .parent {
        position: relative;
    }

створює зручний positioning context для:

    .child {
        position: absolute;
    }

### 12. Чому sticky може не працювати?

Через:

- відсутність threshold;
- scroll container;
- `overflow`;
- недостатню висоту контейнера;
- обмеження батьківського layout.

### 13. Чим `fixed` відрізняється від `sticky`?

`fixed` одразу вилучений із normal flow і зазвичай прив'язаний до viewport.

`sticky` спочатку бере участь у layout і прилипає при scroll.

### 14. Що таке stacking context?

Незалежний контекст накладання елементів.

### 15. Чи можна комбінувати positioning з Flexbox?

Так.

Наприклад:

    .card {
        display: flex;
        position: relative;
    }

### 16. Чи можна комбінувати positioning з Grid?

Так.

Наприклад:

    .hero {
        display: grid;
        position: relative;
    }


## 🟠 Advanced / Middle+

### 17. Які CSS-властивості можуть створювати stacking context?

Серед інших:

- `position` + відповідний `z-index`;
- `opacity < 1`;
- `transform`;
- `filter`;
- `isolation`;
- деякі значення `contain`;
- інші сучасні CSS-механізми.

### 18. Що таке logical positioning?

Використання:

    inset-inline-start
    inset-inline-end
    inset-block-start
    inset-block-end

замість жорстко прив'язаних:

    left
    right
    top
    bottom

### 19. Чим `transform: translate()` відрізняється від `top/left`?

`top/left` — positioning properties.

`transform` — трансформація вже сформованого box.

Вони мають різний вплив на layout та rendering.

### 20. Чому не потрібно будувати layout через absolute positioning?

Тому що:

- layout стає крихким;
- важче підтримувати responsive design;
- складніше змінювати контент;
- координати не адаптуються;
- Flexbox/Grid вирішують layout-задачі краще.


# Шлях

## 🟢 Core — обов'язково знати

Ти повинен впевнено знати:

- `position: static`;
- `position: relative`;
- `position: absolute`;
- `position: fixed`;
- `position: sticky`;
- `top`;
- `right`;
- `bottom`;
- `left`;
- `inset`;
- `z-index`;
- normal flow;
- containing block;
- relative → absolute pattern;
- fixed header;
- sticky header;
- sticky sidebar;
- overlay;
- badge;
- dropdown;
- modal;
- tooltip;
- різницю між layout і positioning.


## 🔵 Junior

Потрібно вміти:

- створити card з badge;
- створити overlay;
- створити dropdown;
- створити modal;
- зробити fixed button;
- зробити sticky sidebar;
- використовувати `inset`;
- розуміти stacking context;
- використовувати `z-index`;
- поєднувати positioning з Flexbox;
- поєднувати positioning з Grid;
- знаходити причину, чому `absolute` позиціонується не там;
- знаходити причину, чому `sticky` не працює;
- не використовувати absolute як заміну Flexbox/Grid.


## 🟠 Middle

Потрібно розуміти:

- containing blocks;
- stacking contexts;
- logical positioning;
- `inset-inline`;
- `inset-block`;
- interaction `position` + `transform`;
- interaction `position` + `overflow`;
- responsive positioning;
- fixed UI на mobile;
- safe areas;
- складні dropdown/popover layouts;
- layering architecture;
- компонентні positioning patterns.


## 🔴 Senior

Варто глибоко розуміти:

- CSS Positioning specification;
- containing block formation;
- static / relative / absolute / fixed / sticky positioning;
- stacking contexts;
- painting order;
- stacking order;
- formatting contexts;
- overflow propagation;
- scroll containers;
- viewport та visual viewport;
- logical properties;
- writing modes;
- fragmentation;
- interaction `transform` / `filter` / `contain` / `will-change`;
- accessibility implications of overlays and modals;
- rendering and compositing;
- cross-browser behavior;
- системний дизайн layer/z-index architecture.


# Міні-шпаргалка

## Position

    position: static;
    position: relative;
    position: absolute;
    position: fixed;
    position: sticky;


## Relative

    .parent {
        position: relative;
    }

Залишається у flow.

Часто використовується як anchor.


## Absolute

    .child {
        position: absolute;
        top: 0;
        right: 0;
    }

Вилучається з flow.

Позиціонується відносно containing block.


## Fixed

    .button {
        position: fixed;
        right: 20px;
        bottom: 20px;
    }

Прив'язаний до viewport / fixed positioning context.


## Sticky

    .header {
        position: sticky;
        top: 0;
    }

Прилипає під час scroll.


## Inset

    .overlay {
        position: absolute;
        inset: 0;
    }

Те саме, що:

    top: 0;
    right: 0;
    bottom: 0;
    left: 0;


## Z-index

    .modal {
        position: fixed;
        z-index: 1000;
    }

Керує stacking order у відповідному stacking context.


## Найважливіший шаблон

    .parent {
        position: relative;
    }

    .child {
        position: absolute;
        top: 0;
        right: 0;
    }


## Overlay

    .parent {
        position: relative;
    }

    .overlay {
        position: absolute;
        inset: 0;
    }


## Center absolute element

    .element {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }


## Modal

    .modal {
        position: fixed;
        inset: 0;

        display: grid;
        place-items: center;
    }


## Sticky sidebar

    .sidebar {
        position: sticky;
        top: 20px;
    }


## Logical positioning

    .badge {
        position: absolute;
        inset-block-start: 10px;
        inset-inline-end: 10px;
    }


# Головне

Запам'ятай 5 речей:

    1. static
       → normal flow

    2. relative
       → normal flow + можна змістити
       → часто anchor для absolute

    3. absolute
       → поза normal flow
       → positioning відносно containing block

    4. fixed
       → поза normal flow
       → fixed UI / viewport

    5. sticky
       → спочатку normal flow
       → потім прилипає при scroll


І найважливіше правило практичного CSS:

    Flexbox / Grid
        ↓
    створюють layout

    Positioning
        ↓
    вирішує точне розташування,
    overlay та layering


Тобто:

    Layout → Flexbox / Grid

    Component anchor → relative

    Badge / Overlay / Dropdown → absolute

    Modal / Floating UI → fixed

    Sticky Header / Sidebar → sticky

    Layers → z-index


Якщо бачиш задачу:

    "потрібно розкласти елементи"

думай спочатку:

    Flexbox / Grid

Якщо:

    "потрібно накласти один елемент на інший"

думай:

    relative + absolute

Якщо:

    "потрібно залишити елемент на екрані"

думай:

    fixed

Якщо:

    "потрібно, щоб елемент прилинав під час прокручування"

думай:

    sticky