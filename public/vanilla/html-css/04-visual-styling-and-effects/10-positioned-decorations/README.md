# Positioned Decorations


## 1. Що таке Positioned Decorations

**Positioned decorations** — це декоративні елементи, які розміщуються відносно іншого елемента за допомогою CSS positioning.

Найчастіше для цього використовуються:

    position: relative;
    position: absolute;

разом із:

    top
    right
    bottom
    left

або сучасним shorthand:

    inset

Типова схема:

    parent
        ↓
    position: relative
        ↓
    decorative child
        ↓
    position: absolute

Наприклад:

    .card {
        position: relative;
    }

    .card::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
    }

---

# 2. Навіщо потрібні Positioned Decorations

За допомогою positioned decorations можна створювати:

- декоративні кола;
- лінії;
- кути;
- blobs;
- badges;
- фонові плями;
- декоративні риски;
- підкреслення;
- corner ribbons;
- псевдоелементи;
- декоративні іконки;
- overlay effects;
- абстрактні фігури;
- декоративні елементи hero-секцій;
- картки з visual accents.

Головна ідея:

> Декорація існує для візуального оформлення, а не для основного змісту сторінки.

---

# 3. Основна ментальна модель

Запам'ятай:

    parent
        ↓
    position: relative
        ↓
    child / ::before / ::after
        ↓
    position: absolute
        ↓
    top / right / bottom / left / inset

Наприклад:

    .card {
        position: relative;
    }

    .card::before {
        content: "";
        position: absolute;
        top: 10px;
        right: 10px;
    }

---

# 4. `position: relative`

`position: relative` часто використовується для створення **positioning context**.

Сам елемент залишається у звичайному document flow.

Наприклад:

    .card {
        position: relative;
    }

Це означає:

> Дочірній `position: absolute` елемент може позиціонуватися відносно `.card`.

---

# 5. `position: absolute`

`position: absolute` виймає елемент зі звичайного document flow.

Наприклад:

    .decoration {
        position: absolute;
        top: 0;
        right: 0;
    }

Такий елемент можна точно розмістити всередині positioning context.

---

# 6. Базова пара

Найважливіший патерн:

    .card {
        position: relative;
    }

    .decoration {
        position: absolute;
        top: 10px;
        right: 10px;
    }

HTML:

    <div class="card">
        <div class="decoration"></div>

        <h2>Card title</h2>
        <p>Card content</p>
    </div>

---

# 7. Чому `relative` потрібен батьківському елементу

Без:

    position: relative;

absolute-елемент може позиціонуватися відносно іншого containing block.

Наприклад:

    .card {
        /* немає position: relative */
    }

    .decoration {
        position: absolute;
        top: 0;
        right: 0;
    }

Це може призвести до того, що decoration буде позиціонуватися не відносно `.card`.

Тому типовий патерн:

    .card {
        position: relative;
    }

---

# 8. `top`

Визначає відстань від верхнього краю containing block.

    .decoration {
        position: absolute;
        top: 20px;
    }

Результат:

    ┌─────────────────────┐
    │                     │
    │    decoration      │
    │                     │
    └─────────────────────┘

---

# 9. `right`

Визначає відстань від правого краю.

    .decoration {
        position: absolute;
        right: 20px;
    }

---

# 10. `bottom`

Визначає відстань від нижнього краю.

    .decoration {
        position: absolute;
        bottom: 20px;
    }

---

# 11. `left`

Визначає відстань від лівого краю.

    .decoration {
        position: absolute;
        left: 20px;
    }

---

# 12. `inset`

`inset` — shorthand для:

    top
    right
    bottom
    left

Наприклад:

    .element {
        position: absolute;
        inset: 0;
    }

Це еквівалентно:

    .element {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

---

# 13. `inset: 0`

Один із найважливіших патернів.

    .overlay {
        position: absolute;
        inset: 0;
    }

Елемент займає весь containing block.

Наприклад:

    .card {
        position: relative;
    }

    .overlay {
        position: absolute;
        inset: 0;
    }

---

# 14. Значення `inset`

Можна використовувати різні значення.

    inset: 10px;

Еквівалент:

    top: 10px;
    right: 10px;
    bottom: 10px;
    left: 10px;

---

# 15. Два значення `inset`

    inset: 10px 20px;

Означає:

    top: 10px;
    bottom: 10px;

    left: 20px;
    right: 20px;

---

# 16. Чотири значення `inset`

    inset: 10px 20px 30px 40px;

Порядок:

    top
    right
    bottom
    left

Тобто:

    top: 10px;
    right: 20px;
    bottom: 30px;
    left: 40px;

---

# 17. `z-index`

Для positioned decorations часто потрібно керувати шарами.

    .decoration {
        position: absolute;
        z-index: 1;
    }

Наприклад:

    .card {
        position: relative;
    }

    .card::before {
        content: "";
        position: absolute;
        z-index: 0;
    }

    .card__content {
        position: relative;
        z-index: 1;
    }

Результат:

    decoration
        ↓
    content

---

# 18. Негативний `z-index`

Можна помістити decoration позаду контенту:

    .decoration {
        position: absolute;
        z-index: -1;
    }

Але з негативним `z-index` потрібно бути обережним через stacking contexts.

Часто безпечніше:

    .card {
        position: relative;
        isolation: isolate;
    }

    .decoration {
        position: absolute;
        z-index: 0;
    }

    .card__content {
        position: relative;
        z-index: 1;
    }

---

# 19. `isolation: isolate`

`isolation: isolate` створює новий stacking context.

Наприклад:

    .card {
        position: relative;
        isolation: isolate;
    }

Це особливо корисно для декоративних елементів.

Схема:

    card
        ↓
    isolated stacking context
        ├── decoration
        └── content

---

# 20. Декорація через `::before`

Один із найпопулярніших варіантів.

    .card {
        position: relative;
    }

    .card::before {
        content: "";
        position: absolute;

        top: 0;
        left: 0;

        width: 100px;
        height: 100px;

        background: #2563eb;
        border-radius: 50%;
    }

---

# 21. Декорація через `::after`

Другий псевдоелемент:

    .card {
        position: relative;
    }

    .card::after {
        content: "";
        position: absolute;

        right: 20px;
        bottom: 20px;

        width: 50px;
        height: 50px;

        background: #f59e0b;
        border-radius: 50%;
    }

---

# 22. `content: ""`

Для `::before` і `::after` потрібно зазвичай задати:

    content: "";

Наприклад:

    .card::before {
        content: "";
        position: absolute;
    }

Без `content` псевдоелемент зазвичай не буде створений як видимий generated content.

---

# 23. Декоративне коло

    .card {
        position: relative;
        overflow: hidden;
    }

    .card::before {
        content: "";

        position: absolute;
        top: -40px;
        right: -40px;

        width: 120px;
        height: 120px;

        background: #dbeafe;
        border-radius: 50%;
    }

Це дуже поширений UI-патерн.

---

# 24. Декоративне коло в кутку

    .card {
        position: relative;
        overflow: hidden;
    }

    .card::after {
        content: "";

        position: absolute;
        right: -50px;
        bottom: -50px;

        width: 150px;
        height: 150px;

        border-radius: 50%;
        background: #bfdbfe;
    }

Від'ємні значення дозволяють частково винести decoration за межі елемента.

---

# 25. Чому використовують негативні значення

Наприклад:

    top: -30px;
    right: -30px;

Decoration зміщується за межі parent.

Схематично:

        decoration
       ┌──────────┐
       │          │
    ┌──┼──────────┼──┐
    │  │          │  │
    │  │   CARD   │  │
    │  │          │  │
    └──┴──────────┴──┘

Це створює цікаві visual effects.

---

# 26. `overflow: hidden`

Якщо decoration не повинна виходити за межі:

    .card {
        position: relative;
        overflow: hidden;
    }

Наприклад:

    .card::before {
        content: "";

        position: absolute;
        top: -50px;
        right: -50px;

        width: 150px;
        height: 150px;

        border-radius: 50%;
    }

Частина decoration буде обрізана.

---

# 27. `overflow: clip`

У сучасному CSS можна також використовувати:

    .card {
        overflow: clip;
    }

Це дозволяє обрізати overflow без створення scroll container у випадках, де це доречно.

Для базового курсу достатньо добре знати:

    overflow: hidden;

---

# 28. Декоративна лінія

Наприклад:

    .title {
        position: relative;
    }

    .title::after {
        content: "";

        position: absolute;

        left: 0;
        bottom: -8px;

        width: 60px;
        height: 3px;

        background: #2563eb;
        border-radius: 999px;
    }

---

# 29. Центрована декоративна лінія

    .title {
        position: relative;
        text-align: center;
    }

    .title::after {
        content: "";

        position: absolute;

        left: 50%;
        bottom: -10px;

        width: 60px;
        height: 3px;

        transform: translateX(-50%);

        background: #2563eb;
        border-radius: 999px;
    }

Ментальна модель:

    left: 50%
        +
    translateX(-50%)
        =
    exact center

---

# 30. Декоративний квадрат

    .card {
        position: relative;
    }

    .card::before {
        content: "";

        position: absolute;

        top: 20px;
        right: 20px;

        width: 40px;
        height: 40px;

        background: #dbeafe;
        transform: rotate(45deg);
    }

---

# 31. Декоративний ромб

Квадрат можна повернути:

    transform: rotate(45deg);

Наприклад:

    .diamond {
        width: 40px;
        height: 40px;

        transform: rotate(45deg);
    }

Візуально:

    square
        ↓
    rotate(45deg)
        ↓
    diamond

---

# 32. Декоративна рисочка

    .section {
        position: relative;
    }

    .section::before {
        content: "";

        position: absolute;

        left: 0;
        top: 0;

        width: 4px;
        height: 100%;

        background: #2563eb;
        border-radius: 999px;
    }

---

# 33. Вертикальна декоративна лінія

    .content {
        position: relative;
    }

    .content::before {
        content: "";

        position: absolute;

        left: -20px;
        top: 0;

        width: 2px;
        height: 100%;

        background: #cbd5e1;
    }

---

# 34. Декоративний badge

HTML:

    <div class="card">
        <span class="badge">New</span>

        <h2>Product</h2>
    </div>

CSS:

    .card {
        position: relative;
    }

    .badge {
        position: absolute;

        top: 16px;
        right: 16px;

        padding: 4px 8px;

        border-radius: 999px;
    }

---

# 35. Corner Badge

Badge можна прикріпити до кута:

    .card {
        position: relative;
    }

    .badge {
        position: absolute;
        top: 12px;
        right: 12px;
    }

---

# 36. Corner Ribbon

Декоративна стрічка:

    .card {
        position: relative;
        overflow: hidden;
    }

    .ribbon {
        position: absolute;

        top: 20px;
        right: -35px;

        padding: 8px 40px;

        transform: rotate(45deg);

        background: #dc2626;
        color: white;
    }

Тут поєднуються:

    position
    +
    negative offset
    +
    transform

---

# 37. Full Overlay

Для overlay:

    .card {
        position: relative;
    }

    .card::before {
        content: "";

        position: absolute;
        inset: 0;

        background: rgb(0 0 0 / 0.2);
    }

Це створює шар поверх всього card.

---

# 38. Overlay та контент

Щоб контент був поверх overlay:

    .card {
        position: relative;
        isolation: isolate;
    }

    .card::before {
        content: "";

        position: absolute;
        inset: 0;

        z-index: 0;

        background: rgb(0 0 0 / 0.2);
    }

    .card__content {
        position: relative;
        z-index: 1;
    }

---

# 39. Overlay без блокування кліків

Якщо decoration не повинна перехоплювати pointer events:

    .card::before {
        pointer-events: none;
    }

Це дуже корисно для:

- overlays;
- decorative pseudo-elements;
- gradients;
- visual effects.

---

# 40. `pointer-events: none`

Наприклад:

    .decoration {
        position: absolute;
        pointer-events: none;
    }

Тепер mouse/touch events проходять крізь decoration до елементів під нею.

---

# 41. Декоративний Background Blob

    .hero {
        position: relative;
        overflow: hidden;
    }

    .hero::before {
        content: "";

        position: absolute;

        top: -100px;
        right: -100px;

        width: 300px;
        height: 300px;

        border-radius: 50%;

        background: #dbeafe;
    }

---

# 42. Blob з `border-radius`

Можна створювати неправильні форми:

    .hero::before {
        content: "";

        position: absolute;

        width: 300px;
        height: 250px;

        border-radius:
            40% 60% 70% 30% /
            50% 40% 60% 50%;
    }

Це дозволяє створювати organic shapes.

---

# 43. Декоративний Gradient Blob

    .hero::before {
        content: "";

        position: absolute;

        top: -100px;
        right: -100px;

        width: 300px;
        height: 300px;

        border-radius: 50%;

        background:
            radial-gradient(
                circle,
                #93c5fd,
                transparent 70%
            );
    }

---

# 44. Декоративна крапка

    .section {
        position: relative;
    }

    .section::before {
        content: "";

        position: absolute;

        top: 20px;
        left: 20px;

        width: 8px;
        height: 8px;

        border-radius: 50%;
        background: #2563eb;
    }

---

# 45. Pattern з кількох крапок

Для складніших pattern можна використовувати background:

    .decorative-pattern {
        background-image:
            radial-gradient(
                circle,
                #94a3b8 1px,
                transparent 1px
            );

        background-size: 20px 20px;
    }

Або кілька псевдоелементів, якщо потрібні окремі об'єкти.

---

# 46. Декоративні кути

Можна створити corner accent:

    .card {
        position: relative;
    }

    .card::before {
        content: "";

        position: absolute;

        top: 0;
        left: 0;

        width: 30px;
        height: 30px;

        border-top: 3px solid #2563eb;
        border-left: 3px solid #2563eb;
    }

---

# 47. Декоративний правий нижній кут

    .card::after {
        content: "";

        position: absolute;

        right: 0;
        bottom: 0;

        width: 30px;
        height: 30px;

        border-right: 3px solid #2563eb;
        border-bottom: 3px solid #2563eb;
    }

---

# 48. Дві декоративні лінії

Можна використати `::before` і `::after`.

    .title {
        position: relative;
    }

    .title::before,
    .title::after {
        content: "";

        position: absolute;

        top: 50%;

        width: 40px;
        height: 2px;

        background: #cbd5e1;
    }

    .title::before {
        left: -60px;
    }

    .title::after {
        right: -60px;
    }

---

# 49. Decorative Icon Background

    .feature {
        position: relative;
    }

    .feature::before {
        content: "";

        position: absolute;

        top: 20px;
        right: 20px;

        width: 80px;
        height: 80px;

        border-radius: 50%;

        background: #eff6ff;

        z-index: 0;
    }

    .feature__icon {
        position: relative;
        z-index: 1;
    }

---

# 50. Positioning та `transform`

Дуже часто position комбінується з transform.

Наприклад центр:

    .element {
        position: absolute;

        left: 50%;
        top: 50%;

        transform:
            translate(-50%, -50%);
    }

---

# 51. Absolute Centering

Класичний патерн:

    .parent {
        position: relative;
    }

    .child {
        position: absolute;

        top: 50%;
        left: 50%;

        transform:
            translate(-50%, -50%);
    }

Схема:

    top: 50%
        +
    translateY(-50%)

    left: 50%
        +
    translateX(-50%)

---

# 52. Центрування через `inset`

Сучасний варіант:

    .child {
        position: absolute;
        inset: 0;

        width: max-content;
        height: max-content;

        margin: auto;
    }

Це може бути зручно для абсолютно позиціонованого елемента фіксованого або intrinsic size.

---

# 53. Full Size Decoration

Якщо decoration повинна займати весь parent:

    .parent {
        position: relative;
    }

    .decoration {
        position: absolute;
        inset: 0;
    }

---

# 54. Декорація за контентом

Наприклад:

    .card {
        position: relative;
        isolation: isolate;
    }

    .card::before {
        content: "";

        position: absolute;
        inset: 10px;

        z-index: -1;

        background: #eff6ff;
    }

Але для більш передбачуваної структури краще часто використовувати:

    z-index: 0;

для decoration і:

    z-index: 1;

для content.

---

# 55. Надійний Stacking Pattern

    .card {
        position: relative;
        isolation: isolate;
    }

    .card::before {
        content: "";

        position: absolute;
        inset: 0;

        z-index: 0;
    }

    .card__content {
        position: relative;
        z-index: 1;
    }

Ментальна модель:

    card
      │
      ├── decoration (z-index: 0)
      │
      └── content (z-index: 1)

---

# 56. Чому `isolation` корисний

Без isolation stacking context може взаємодіяти з елементами зовні.

З:

    isolation: isolate;

можна локалізувати layering.

Це особливо корисно для:

- cards;
- hero;
- badges;
- overlays;
- decorative pseudo-elements.

---

# 57. Decoration та `overflow`

Є два основних варіанти.

## Decoration обрізається

    .card {
        overflow: hidden;
    }

## Decoration може виходити за межі

    .card {
        overflow: visible;
    }

Вибір залежить від дизайну.

---

# 58. Декорація поза Card

Наприклад:

    .card {
        position: relative;
    }

    .card::before {
        content: "";

        position: absolute;

        top: -20px;
        right: -20px;

        width: 80px;
        height: 80px;

        border-radius: 50%;
    }

Не додавай:

    overflow: hidden;

якщо дизайн передбачає вихід decoration за межі card.

---

# 59. Декорація всередині Card

Якщо decoration повинна залишатися всередині:

    .card {
        position: relative;
        overflow: hidden;
    }

---

# 60. Responsive Decorations

Decoration повинна адаптуватися до розміру екрана.

Погано:

    width: 500px;
    height: 500px;

для маленького mobile layout.

Краще:

    width: clamp(120px, 20vw, 300px);
    height: clamp(120px, 20vw, 300px);

---

# 61. `clamp()` для decoration

Наприклад:

    .hero::before {
        width: clamp(150px, 25vw, 350px);
        height: clamp(150px, 25vw, 350px);
    }

Таким чином decoration:

    mobile
        ↓
    менша

    desktop
        ↓
    більша

---

# 62. Responsive Position

Не тільки розмір, але й position може бути responsive.

    .hero::before {
        top: -50px;
        right: -50px;
    }

На mobile:

    @media (max-width: 600px) {
        .hero::before {
            top: -30px;
            right: -30px;
        }
    }

---

# 63. CSS Variables для Position

Можна винести значення:

    .hero {
        --decor-size: 300px;
        --decor-offset: -100px;

        position: relative;
    }

    .hero::before {
        content: "";

        position: absolute;

        width: var(--decor-size);
        height: var(--decor-size);

        top: var(--decor-offset);
        right: var(--decor-offset);
    }

---

# 64. Responsive CSS Variables

    .hero {
        --decor-size: 300px;
        --decor-offset: -100px;
    }

    @media (max-width: 600px) {
        .hero {
            --decor-size: 180px;
            --decor-offset: -60px;
        }
    }

Тепер сам decoration rule не потрібно дублювати.

---

# 65. Decoration і `aspect-ratio`

Якщо форма повинна залишатися пропорційною:

    .decoration {
        width: 200px;
        aspect-ratio: 1;
    }

Для кола:

    .decoration {
        border-radius: 50%;
    }

---

# 66. Decoration з `min()` і `max()`

Наприклад:

    width: min(300px, 40vw);

або:

    width: max(100px, 10vw);

Це корисно для responsive decorative shapes.

---

# 67. Декоративний Hero

HTML:

    <section class="hero">
        <div class="hero__content">
            <h1>Learn CSS</h1>
            <p>Build modern interfaces.</p>
        </div>
    </section>

CSS:

    .hero {
        position: relative;
        overflow: hidden;
        isolation: isolate;
    }

    .hero::before {
        content: "";

        position: absolute;

        top: -100px;
        right: -100px;

        width: 300px;
        height: 300px;

        border-radius: 50%;

        background: #dbeafe;

        z-index: 0;
    }

    .hero__content {
        position: relative;
        z-index: 1;
    }

---

# 68. Дві декоративні форми

    .hero {
        position: relative;
        overflow: hidden;
        isolation: isolate;
    }

    .hero::before {
        content: "";

        position: absolute;

        top: -80px;
        right: -80px;

        width: 250px;
        height: 250px;

        border-radius: 50%;

        background: #dbeafe;
    }

    .hero::after {
        content: "";

        position: absolute;

        bottom: -100px;
        left: -100px;

        width: 300px;
        height: 300px;

        border-radius: 50%;

        background: #fef3c7;
    }

---

# 69. Decoration без HTML

Псевдоелементи:

    ::before
    ::after

дозволяють створювати decoration без додаткових HTML-елементів.

Наприклад:

    .card::before {
        content: "";
        position: absolute;
    }

Це добре підходить саме для декоративних елементів.

---

# 70. Коли не варто використовувати `::before` / `::after`

Не використовуй псевдоелемент для важливого semantic content.

Погано:

    .card::before {
        content: "Important information";
    }

Якщо ця інформація має значення для користувача або accessibility, вона повинна бути у HTML.

Краще:

    <p>Important information</p>

---

# 71. Decoration повинна бути декоративною

Хороший кандидат:

    circle
    line
    blob
    gradient
    shadow accent
    corner shape
    visual separator

Поганий кандидат:

    important text
    navigation
    essential icon
    form information
    error message

---

# 72. `aria-hidden`

Для реального декоративного HTML-елемента можна використовувати:

    <span
        class="decoration"
        aria-hidden="true"
    ></span>

Це повідомляє assistive technologies:

> Цей елемент не є частиною змісту.

Але для чисто CSS `::before` / `::after` декоративний характер уже не потрібно представляти окремим semantic HTML-вузлом.

---

# 73. `pointer-events` для decoration

Рекомендований патерн:

    .decoration {
        pointer-events: none;
    }

Особливо якщо decoration знаходиться поверх кнопки.

Наприклад:

    .hero::before {
        content: "";
        position: absolute;
        pointer-events: none;
    }

---

# 74. Decoration поверх кнопки

Якщо decoration перекриває кнопку:

    .button {
        position: relative;
        z-index: 1;
    }

    .decoration {
        position: absolute;
        pointer-events: none;
    }

Таким чином кнопка залишається інтерактивною.

---

# 75. Декоративний underline

HTML:

    <h2 class="heading">
        Learn CSS
    </h2>

CSS:

    .heading {
        position: relative;
        display: inline-block;
    }

    .heading::after {
        content: "";

        position: absolute;

        left: 0;
        bottom: -6px;

        width: 100%;
        height: 3px;

        background: #2563eb;
        border-radius: 999px;
    }

---

# 76. Animated Underline

Positioned decoration можна поєднати з transition.

    .heading {
        position: relative;
    }

    .heading::after {
        content: "";

        position: absolute;

        left: 0;
        bottom: -6px;

        width: 0;
        height: 3px;

        background: #2563eb;

        transition:
            width 200ms ease;
    }

    .heading:hover::after {
        width: 100%;
    }

---

# 77. Animated Circle

Можна поєднати decoration з animation:

    .card {
        position: relative;
        overflow: hidden;
    }

    .card::before {
        content: "";

        position: absolute;

        width: 100px;
        height: 100px;

        border-radius: 50%;

        animation:
            float 3s ease-in-out infinite;
    }

    @keyframes float {
        0% {
            transform: translateY(0);
        }

        50% {
            transform: translateY(-10px);
        }

        100% {
            transform: translateY(0);
        }
    }

---

# 78. Decoration + Transform

Дуже поширена комбінація:

    position
    +
    transform

Наприклад:

    .decoration {
        position: absolute;
        top: 20px;
        right: 20px;

        transform:
            rotate(20deg);
    }

---

# 79. Decoration + Transition

Наприклад при hover:

    .card {
        position: relative;
    }

    .card::before {
        content: "";

        position: absolute;

        width: 100px;
        height: 100px;

        border-radius: 50%;

        transform: scale(1);

        transition:
            transform 300ms ease;
    }

    .card:hover::before {
        transform: scale(1.2);
    }

---

# 80. Decoration + Gradient

Наприклад:

    .hero::before {
        content: "";

        position: absolute;

        width: 300px;
        height: 300px;

        border-radius: 50%;

        background:
            radial-gradient(
                circle,
                #93c5fd,
                transparent 70%
            );
    }

Це дозволяє створювати м'які visual accents.

---

# 81. Decoration + Blur

Для декоративних blobs:

    .hero::before {
        content: "";

        position: absolute;

        width: 300px;
        height: 300px;

        border-radius: 50%;

        background: #93c5fd;

        filter: blur(60px);
    }

Це може створити glow effect.

---

# 82. Glow Effect

    .card {
        position: relative;
        isolation: isolate;
    }

    .card::before {
        content: "";

        position: absolute;

        inset: -20px;

        background: #60a5fa;

        filter: blur(50px);

        opacity: 0.3;

        z-index: -1;
    }

Для великих або численних елементів потрібно враховувати performance.

---

# 83. Decorative Grid

Можна створити grid-like background:

    .hero {
        background-image:
            linear-gradient(
                rgb(0 0 0 / 0.05) 1px,
                transparent 1px
            ),
            linear-gradient(
                90deg,
                rgb(0 0 0 / 0.05) 1px,
                transparent 1px
            );

        background-size:
            40px 40px;
    }

Це вже не `position: absolute`, але є альтернативним способом декоративного оформлення.

---

# 84. Decoration через псевдоелемент vs background

Використовуй `background`, коли:

- decoration є частиною поверхні;
- не потрібен окремий positioning layer;
- не потрібно незалежно керувати шаром.

Використовуй `::before` / `::after`, коли:

- потрібен окремий layer;
- потрібен `position: absolute`;
- потрібно керувати `z-index`;
- потрібно анімувати decoration окремо.

---

# 85. Decoration через HTML vs Pseudo-element

### Pseudo-element

    .card::before {
        content: "";
    }

Добре для:

    decorative circle
    line
    overlay
    accent
    shape

### HTML element

    <span class="decoration"></span>

Добре, коли:

- потрібна складна структура;
- потрібні кілька незалежних decorations;
- елемент має interaction;
- потрібен JavaScript;
- потрібна складніша accessibility semantics.

---

# 86. Три способи створення decoration

## 1. Background

    .hero {
        background:
            radial-gradient(
                circle,
                #dbeafe,
                transparent 60%
            );
    }

## 2. Pseudo-element

    .hero::before {
        content: "";
        position: absolute;
    }

## 3. HTML element

    <span
        class="decoration"
        aria-hidden="true"
    ></span>

Вибір залежить від задачі.

---

# 87. Positioning Context

Важливе поняття:

**Containing block** — область, відносно якої позиціонується absolute element.

Типовий випадок:

    .parent {
        position: relative;
    }

    .child {
        position: absolute;
    }

Тоді `.child` позиціонується відносно `.parent`.

---

# 88. `position: absolute` і document flow

Absolute element:

    не займає звичайного місця
    ↓
    інші елементи його не враховують

Наприклад:

    <div class="card">
        <div class="decoration"></div>
        <p>Content</p>
    </div>

Якщо `.decoration`:

    position: absolute;

вона не резервує для себе простір у layout.

---

# 89. Чому це добре для decoration

Саме цього ми зазвичай хочемо.

Decoration:

    не повинна
        ↓
    змінювати layout

Вона повинна:

    просто лежати
        ↓
    поверх або позаду
        ↓
    основного контенту

---

# 90. Absolute vs Relative

### `relative`

    залишається у flow
    +
    створює positioning context

### `absolute`

    виходить із flow
    +
    позиціонується відносно containing block

Ментальна модель:

    relative = "я — система координат"

    absolute = "я — елемент, який
                 використовує систему координат"

---

# 91. Absolute vs Fixed

### Absolute

Позиціонується відносно containing block.

    .card {
        position: relative;
    }

    .badge {
        position: absolute;
    }

### Fixed

Позиціонується відносно viewport / відповідного fixed containing block.

    .button {
        position: fixed;
        right: 20px;
        bottom: 20px;
    }

Для локальних decorations зазвичай потрібен:

    absolute

---

# 92. Absolute vs Sticky

`sticky` використовується для елементів, які повинні залишатися видимими під час scroll.

Для decoration зазвичай:

    absolute

а не:

    sticky

---

# 93. `top/right/bottom/left` vs `inset`

Класичний синтаксис:

    top: 10px;
    right: 20px;
    bottom: 30px;
    left: 40px;

Сучасний shorthand:

    inset: 10px 20px 30px 40px;

Для читабельності:

    inset: 0;

дуже зручний для full overlay.

---

# 94. Percentage Positioning

Можна використовувати:

    top: 50%;
    left: 50%;

або:

    width: 50%;
    height: 50%;

Наприклад:

    .decoration {
        position: absolute;

        width: 20%;
        height: 20%;

        top: 10%;
        right: 5%;
    }

---

# 95. `calc()`

Можна комбінувати різні одиниці:

    right: calc(20px + 2vw);

або:

    top: calc(50% - 20px);

Це корисно для responsive positioning.

---

# 96. `clamp()` для позиціонування

Наприклад:

    right: clamp(
        -80px,
        -5vw,
        -30px
    );

Таким чином можна зробити offset responsive.

---

# 97. Container-relative Decoration

Наприклад:

    .section {
        position: relative;
    }

    .section::before {
        content: "";

        position: absolute;

        top: 20%;
        right: 5%;

        width: 100px;
        aspect-ratio: 1;

        border-radius: 50%;
    }

Decoration рухається разом із секцією, а не viewport.

---

# 98. Залежність від розміру parent

Absolute decoration може використовувати:

    width: 30%;
    height: 30%;

Тоді її розмір залежить від parent.

Це часто корисно для:

- responsive cards;
- hero sections;
- banners.

---

# 99. Decoration у Card Grid

Наприклад:

    .card {
        position: relative;
        overflow: hidden;
        isolation: isolate;
    }

    .card::before {
        content: "";

        position: absolute;

        top: -40px;
        right: -40px;

        width: 120px;
        aspect-ratio: 1;

        border-radius: 50%;

        background: #eff6ff;

        z-index: 0;
    }

    .card__content {
        position: relative;
        z-index: 1;
    }

Такий компонент можна багаторазово використовувати у grid.

---

# 100. Різні Decorations для різних Cards

Можна використовувати modifiers:

    .card--blue::before {
        background: #dbeafe;
    }

    .card--green::before {
        background: #dcfce7;
    }

    .card--yellow::before {
        background: #fef3c7;
    }

HTML:

    <article class="card card--blue">
        ...
    </article>

---

# 101. CSS Variables для Themes

Ще краще:

    .card {
        --decor-color: #dbeafe;

        position: relative;
    }

    .card::before {
        content: "";

        position: absolute;

        background: var(--decor-color);
    }

Тепер:

    .card--blue {
        --decor-color: #dbeafe;
    }

    .card--green {
        --decor-color: #dcfce7;
    }

---

# 102. Decoration як частина Design System

У design system можна мати стандартні patterns:

    .decor-circle
    .decor-line
    .decor-blob
    .decor-grid
    .decor-glow

Наприклад:

    .decor-circle {
        position: absolute;

        width: 100px;
        aspect-ratio: 1;

        border-radius: 50%;
    }

Це зменшує дублювання CSS.

---

# 103. Не створюй зайві `position: absolute`

Absolute positioning добре підходить для decoration.

Але не потрібно використовувати:

    position: absolute;

для всього layout.

Погано:

    header
        absolute

    nav
        absolute

    content
        absolute

    footer
        absolute

Для основного layout краще:

    flexbox
    grid

А absolute залишити для локальних overlays/decorations.

---

# 104. Positioned Decoration + Flexbox

Основний layout:

    .card {
        display: flex;
        flex-direction: column;
        gap: 16px;

        position: relative;
    }

Decoration:

    .card::before {
        content: "";

        position: absolute;
    }

Тобто:

    Flexbox
        ↓
    layout

    Absolute
        ↓
    decoration

---

# 105. Positioned Decoration + Grid

Аналогічно:

    .section {
        display: grid;
        grid-template-columns:
            repeat(3, 1fr);

        position: relative;
    }

Decoration:

    .section::before {
        content: "";

        position: absolute;
    }

Ментальна модель:

    Grid
        ↓
    structure

    Absolute
        ↓
    visual decoration

---

# 106. Layer Architecture

Складний компонент можна організувати так:

    .card {
        position: relative;
        isolation: isolate;
    }

    .card::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 0;
    }

    .card__image {
        position: relative;
        z-index: 1;
    }

    .card__content {
        position: relative;
        z-index: 2;
    }

    .card__badge {
        position: absolute;
        z-index: 3;
    }

Схема:

    z-index: 0
        decoration

    z-index: 1
        image

    z-index: 2
        content

    z-index: 3
        badge

---

# 107. Практичний Hero Layering

    .hero {
        position: relative;
        isolation: isolate;
    }

    .hero::before {
        content: "";

        position: absolute;
        inset: 0;

        z-index: 0;
    }

    .hero__content {
        position: relative;
        z-index: 1;
    }

    .hero__button {
        position: relative;
        z-index: 2;
    }

---

# 108. Decoration та `opacity`

Можна зробити decoration ненав'язливою:

    .decoration {
        opacity: 0.3;
    }

Але якщо псевдоелемент має opacity:

    .card::before {
        opacity: 0.3;
    }

це впливає тільки на pseudo-element, а не на весь `.card`.

Це ще одна причина використовувати окремий decorative layer.

---

# 109. Не став `opacity` на parent

Погано:

    .card {
        opacity: 0.5;
    }

Якщо потрібно зробити прозорою тільки decoration.

Краще:

    .card::before {
        opacity: 0.5;
    }

---

# 110. Decoration та CSS Filters

Можна використовувати:

    filter: blur(...);
    filter: brightness(...);
    filter: saturate(...);
    filter: contrast(...);

Наприклад:

    .hero::before {
        filter: blur(50px);
        opacity: 0.4;
    }

---

# 111. Decoration та Blend Modes

Для advanced visual effects можна використовувати:

    mix-blend-mode

Наприклад:

    .decoration {
        mix-blend-mode: multiply;
    }

Це вже advanced topic і потребує розуміння compositing.

---

# 112. Decoration та `backdrop-filter`

Для glass-like effects можна комбінувати:

    backdrop-filter: blur(10px);

Наприклад:

    .badge {
        position: absolute;

        background: rgb(255 255 255 / 0.5);

        backdrop-filter: blur(10px);
    }

---

# 113. Performance

Для великої кількості decorations потрібно враховувати:

    filter
    blur
    box-shadow
    large gradients
    animations
    multiple layers

Не потрібно створювати десятки великих blur-об'єктів без необхідності.

---

# 114. Performance-friendly Decorations

Зазвичай простіші:

    background
    border
    border-radius
    transform
    opacity

можуть бути кращим вибором, ніж складні комбінації:

    huge blur
    many shadows
    many animated layers

---

# 115. Animated Decoration Performance

Якщо decoration анімується:

краще:

    transform
    opacity

Наприклад:

    @keyframes float {
        from {
            transform: translateY(0);
        }

        to {
            transform: translateY(-20px);
        }
    }

а не постійно змінювати:

    top
    left

---

# 116. Поганий Animated Positioning

    @keyframes move {
        from {
            top: 0;
        }

        to {
            top: 50px;
        }
    }

Краще:

    @keyframes move {
        from {
            transform: translateY(0);
        }

        to {
            transform: translateY(50px);
        }
    }

---

# 117. Accessibility

Декорація не повинна:

- містити важливу інформацію;
- бути єдиним способом передати meaning;
- блокувати interaction;
- створювати надмірний motion.

Особливо для animated decorations:

    @media (prefers-reduced-motion: reduce) {
        .decoration {
            animation: none;
        }
    }

---

# 118. Decorative Motion

Якщо decoration рухається:

    .decoration {
        animation:
            float 4s ease-in-out infinite;
    }

Додай:

    @media (prefers-reduced-motion: reduce) {
        .decoration {
            animation: none;
        }
    }

---

# 119. Приклад повної Card

HTML:

    <article class="card">
        <span
            class="card__badge"
            aria-hidden="true"
        >
            New
        </span>

        <div class="card__content">
            <h2>CSS</h2>
            <p>
                Learn modern CSS.
            </p>
        </div>
    </article>

CSS:

    .card {
        position: relative;
        overflow: hidden;
        isolation: isolate;

        padding: 24px;

        border-radius: 16px;
        background: white;
    }

    .card::before {
        content: "";

        position: absolute;

        top: -50px;
        right: -50px;

        width: 150px;
        aspect-ratio: 1;

        border-radius: 50%;

        background: #dbeafe;

        z-index: 0;
    }

    .card__content {
        position: relative;
        z-index: 1;
    }

    .card__badge {
        position: absolute;

        top: 16px;
        right: 16px;

        z-index: 2;

        padding: 4px 8px;

        border-radius: 999px;

        background: #2563eb;
        color: white;
    }

---

# 120. Приклад Hero з Decorations

HTML:

    <section class="hero">
        <div class="hero__content">
            <p>CSS Course</p>
            <h1>Learn modern CSS</h1>
            <p>
                Build beautiful and responsive interfaces.
            </p>
        </div>
    </section>

CSS:

    .hero {
        position: relative;
        isolation: isolate;
        overflow: hidden;

        padding: 100px 24px;
    }

    .hero::before {
        content: "";

        position: absolute;

        top: -120px;
        right: -120px;

        width: 350px;
        aspect-ratio: 1;

        border-radius: 50%;

        background:
            radial-gradient(
                circle,
                #bfdbfe,
                transparent 70%
            );

        z-index: 0;

        pointer-events: none;
    }

    .hero::after {
        content: "";

        position: absolute;

        bottom: -150px;
        left: -150px;

        width: 400px;
        aspect-ratio: 1;

        border-radius: 50%;

        background:
            radial-gradient(
                circle,
                #fde68a,
                transparent 70%
            );

        z-index: 0;

        pointer-events: none;
    }

    .hero__content {
        position: relative;
        z-index: 1;

        max-width: 700px;
        margin-inline: auto;
    }

---

# 121. Приклад Badge + Decoration

HTML:

    <div class="product-card">
        <span class="product-card__badge">
            New
        </span>

        <h2>Product</h2>
    </div>

CSS:

    .product-card {
        position: relative;
        overflow: hidden;
        isolation: isolate;

        padding: 24px;
    }

    .product-card::before {
        content: "";

        position: absolute;

        top: -30px;
        right: -30px;

        width: 100px;
        aspect-ratio: 1;

        border-radius: 50%;

        background: #dcfce7;

        z-index: 0;
    }

    .product-card__badge {
        position: absolute;

        top: 16px;
        right: 16px;

        z-index: 2;
    }

    .product-card h2 {
        position: relative;
        z-index: 1;
    }

---

# 122. Приклад Decorative Corner

    .card {
        position: relative;
        isolation: isolate;
    }

    .card::before {
        content: "";

        position: absolute;

        top: 0;
        right: 0;

        width: 50px;
        height: 50px;

        border-top: 4px solid #2563eb;
        border-right: 4px solid #2563eb;

        border-top-right-radius: 16px;

        pointer-events: none;
    }

---

# 123. Приклад Decorative Circle Behind Heading

    .heading {
        position: relative;
        isolation: isolate;
    }

    .heading::before {
        content: "";

        position: absolute;

        top: 50%;
        left: -20px;

        width: 50px;
        aspect-ratio: 1;

        border-radius: 50%;

        background: #dbeafe;

        transform: translateY(-50%);

        z-index: -1;
    }

Для складних stacking cases краще контролювати stacking context через:

    isolation: isolate;

---

# 124. Приклад Decorative Line

    .section-title {
        position: relative;
        display: inline-block;
    }

    .section-title::after {
        content: "";

        position: absolute;

        left: 0;
        bottom: -8px;

        width: 50%;
        height: 3px;

        border-radius: 999px;

        background: #2563eb;
    }

---

# 125. Приклад Overlay Card

    .card {
        position: relative;
        isolation: isolate;
    }

    .card::before {
        content: "";

        position: absolute;
        inset: 0;

        background: rgb(0 0 0 / 0.15);

        z-index: 1;

        pointer-events: none;
    }

    .card__content {
        position: relative;
        z-index: 2;
    }

---

# 126. Приклад Decorative Image Accent

    .image-wrapper {
        position: relative;
        isolation: isolate;
    }

    .image-wrapper::before {
        content: "";

        position: absolute;

        inset: 10px;

        border: 2px solid #2563eb;

        transform:
            translate(10px, 10px);

        z-index: -1;
    }

    .image-wrapper img {
        display: block;
        position: relative;
        z-index: 1;
    }

---

# 127. Приклад Card з Hover Decoration

    .card {
        position: relative;
        overflow: hidden;
    }

    .card::before {
        content: "";

        position: absolute;

        top: -50px;
        right: -50px;

        width: 150px;
        aspect-ratio: 1;

        border-radius: 50%;

        background: #dbeafe;

        transform: scale(1);

        transition:
            transform 300ms ease;
    }

    .card:hover::before {
        transform: scale(1.3);
    }

---

# 128. Приклад Animated Floating Decoration

    .hero {
        position: relative;
        overflow: hidden;
    }

    .hero::before {
        content: "";

        position: absolute;

        top: 50px;
        right: 50px;

        width: 80px;
        aspect-ratio: 1;

        border-radius: 50%;

        background: #bfdbfe;

        animation:
            float 4s ease-in-out infinite;
    }

    @keyframes float {
        0% {
            transform: translateY(0);
        }

        50% {
            transform: translateY(-15px);
        }

        100% {
            transform: translateY(0);
        }
    }

---

# 129. Reduced Motion для Floating Decoration

    @media (prefers-reduced-motion: reduce) {
        .hero::before {
            animation: none;
        }
    }

---

# 130. Практичний алгоритм створення Decoration

Коли потрібно створити decorative element:

    1. Визначити parent
        ↓
    2. Додати position: relative
        ↓
    3. Вибрати ::before / ::after / HTML
        ↓
    4. Додати position: absolute
        ↓
    5. Визначити координати
        ↓
    6. Визначити size
        ↓
    7. Визначити visual style
        ↓
    8. Налаштувати z-index
        ↓
    9. Додати pointer-events: none
        ↓
    10. Перевірити overflow
        ↓
    11. Перевірити mobile
        ↓
    12. Перевірити accessibility

---

# 131. Debugging Positioned Decorations

Якщо decoration знаходиться не там, де потрібно, перевір:

    1. Чи має parent:
        position: relative;

    2. Чи має decoration:
        position: absolute;

    3. Який containing block?

    4. Чи не впливає:
        transform

    5. Чи правильні:
        top
        right
        bottom
        left

    6. Чи правильний:
        z-index

    7. Чи не обрізає:
        overflow

    8. Чи не створює stacking context інший елемент?

---

# 132. Debugging через outline

Тимчасово можна додати:

    .parent {
        outline: 2px solid red;
    }

    .decoration {
        outline: 2px solid blue;
    }

Це допомагає побачити реальні межі елементів.

---

# 133. Debugging `z-index`

Якщо decoration не видно:

перевір:

    z-index

    position

    stacking context

    overflow

    opacity

    visibility

    display

    background

Наприклад:

    .parent {
        position: relative;
        isolation: isolate;
    }

    .decoration {
        position: absolute;
        z-index: 0;
    }

    .content {
        position: relative;
        z-index: 1;
    }

---

# 134. Типові помилки

## Помилка 1 — Забули `position: relative`

    .card {
        /* немає position: relative */
    }

    .card::before {
        position: absolute;
        top: 0;
        right: 0;
    }

Краще:

    .card {
        position: relative;
    }

---

# 135. Помилка 2 — Decoration змінює layout

Якщо використовувати звичайний element без absolute:

    <div class="decoration"></div>

він займає місце у layout.

Для purely decorative layer часто краще:

    position: absolute;

---

# 136. Помилка 3 — Надмірний `z-index`

Погано:

    z-index: 999999;

Не потрібно вирішувати всі layering problems величезними числами.

Краще створити зрозумілу систему:

    decoration = 0
    content = 1
    badge = 2

---

# 137. Помилка 4 — Неправильний `z-index: -1`

Негативний `z-index` може відправити decoration за межі очікуваного stacking context.

Краще:

    isolation: isolate;

і:

    decoration = 0
    content = 1

---

# 138. Помилка 5 — Decoration перекриває кнопку

Проблема:

    decoration
        ↓
    pointer event
        ↓
    button не натискається

Рішення:

    pointer-events: none;

---

# 139. Помилка 6 — `overflow: hidden` обрізає decoration

Якщо decoration повинна виходити за межі:

    overflow: hidden;

може бути помилкою.

Перевір, чи потрібно:

    overflow: visible;

---

# 140. Помилка 7 — Decoration ламається на mobile

Причини:

    fixed width
    fixed height
    fixed offsets
    large negative values

Використовуй:

    %
    vw
    vh
    clamp()
    min()
    max()

де це доречно.

---

# 141. Помилка 8 — Decoration використовується для semantic content

Не поміщай важливий текст у:

    ::before
    ::after

Якщо інформація важлива — вона повинна бути у HTML.

---

# 142. Помилка 9 — Надмірна кількість decorations

Занадто багато:

    circles
    blobs
    lines
    shadows
    gradients
    animations

можуть погіршити:

    readability
    accessibility
    performance
    visual hierarchy

---

# 143. Помилка 10 — Decoration привертає більше уваги, ніж content

Головне правило:

> Decoration повинна підтримувати content, а не конкурувати з ним.

---

# 144. Практичні вправи

## Вправа 1 — Circle Decoration

Створи card:

    position: relative;

Додай:

    ::before

і зроби коло у правому верхньому куті.

---

## Вправа 2 — Two Circles

Додай:

    ::before
    ::after

Одне коло:

    top-right

Друге:

    bottom-left

---

## Вправа 3 — Decorative Line

Створи heading з лінією під ним.

Використай:

    ::after
    position: absolute

---

## Вправа 4 — Corner Decoration

Створи дві декоративні рамки:

    top-left

і:

    bottom-right

---

## Вправа 5 — Badge

Створи card із badge:

    top: 16px;
    right: 16px;

---

## Вправа 6 — Overlay

Створи image card з overlay:

    position: absolute;
    inset: 0;

---

## Вправа 7 — Hero Blob

Створи hero section.

Додай:

    великий круг
    gradient
    blur

Розмісти його за контентом.

---

## Вправа 8 — Floating Decoration

Створи круг, який:

    рухається вгору
    ↓
    рухається вниз

Використай:

    @keyframes
    transform

---

## Вправа 9 — Responsive Decoration

Створи decoration:

    desktop = 300px
    mobile = 150px

Спробуй реалізувати через:

    clamp()

---

## Вправа 10 — Decoration Layer System

Створи:

    decoration
    image
    content
    badge

і налаштуй:

    z-index

так, щоб кожен шар був на правильному місці.

---

# 145. Міні-проект

Створи landing page:

    Header
    Hero
    Features
    Cards
    CTA
    Footer

Додай decorations:

    Hero
        ├── top-right blob
        └── bottom-left blob

    Features
        └── decorative line

    Cards
        ├── corner circle
        └── badge

    CTA
        └── background glow

---

# 146. Архітектура міні-проекту

Наприклад:

    <section class="hero">
        <div class="hero__content">
            ...
        </div>
    </section>

CSS:

    .hero {
        position: relative;
        isolation: isolate;
        overflow: hidden;
    }

    .hero::before {
        content: "";
        position: absolute;
        z-index: 0;
    }

    .hero__content {
        position: relative;
        z-index: 1;
    }

Ментальна модель:

    Hero
      │
      ├── decoration
      │
      └── content

---

# 147. Що потрібно знати на рівні Core

Ти повинен розуміти:

    position: relative
    position: absolute

    top
    right
    bottom
    left

    inset

    z-index

    overflow

    ::before
    ::after

і вміти створити:

    circle
    line
    badge
    overlay
    corner decoration

---

# 148. Що потрібно знати на рівні Junior

Junior повинен уміти:

- створювати positioning context;
- використовувати `relative + absolute`;
- використовувати `inset`;
- позиціонувати псевдоелементи;
- працювати з `z-index`;
- розуміти stacking context;
- використовувати `isolation`;
- створювати decorative circles;
- створювати overlays;
- створювати badges;
- працювати з `overflow`;
- використовувати `pointer-events`;
- робити decorations responsive;
- використовувати `transform`;
- комбінувати decorations із transitions та animations.

---

# 149. Що потрібно знати на рівні Middle

Middle повинен розуміти:

- containing blocks;
- stacking contexts;
- `z-index` hierarchy;
- `isolation`;
- pseudo-elements;
- responsive positioning;
- CSS variables для decorations;
- component-level decoration architecture;
- performance;
- compositing;
- filters;
- blend modes;
- complex overlays;
- accessibility;
- motion preferences.

---

# 150. Що потрібно знати на рівні Senior

Senior повинен розуміти:

- positioning model CSS;
- containing block rules;
- stacking context creation;
- painting order;
- compositing;
- layout vs paint vs composite;
- scalable decoration systems;
- design-system visual tokens;
- responsive visual architecture;
- accessibility;
- performance profiling;
- CSS architecture;
- trade-offs між pseudo-elements, backgrounds та HTML elements.

---

# 151. Interview Questions

### 1. Навіщо `position: relative`?

Найчастіше для створення positioning context для дочірніх absolute elements.

### 2. Що робить `position: absolute`?

Виводить елемент зі звичайного document flow і дозволяє позиціонувати його відносно containing block.

### 3. Для чого `top`, `right`, `bottom`, `left`?

Для визначення позиції positioned element.

### 4. Що таке `inset`?

Shorthand для:

    top
    right
    bottom
    left

### 5. Чому для decoration часто використовують pseudo-elements?

Вони дозволяють створити декоративний шар без додавання зайвого HTML.

### 6. Для чого `z-index`?

Для керування порядком шарів.

### 7. Чому `z-index` іноді не працює як очікується?

Через stacking contexts.

### 8. Що робить `isolation: isolate`?

Створює окремий stacking context і допомагає локалізувати layering.

### 9. Для чого `pointer-events: none`?

Щоб decoration не блокувала взаємодію з елементами під нею.

### 10. Для чого `overflow: hidden`?

Щоб обрізати content/decorations, які виходять за межі parent.

### 11. Чому не варто використовувати `position: absolute` для всього layout?

Тому що основний layout краще будувати через:

    Flexbox
    Grid

Absolute positioning більше підходить для локальних overlays і decorations.

### 12. Коли використовувати `::before`, а коли HTML element?

`::before` добре підходить для purely decorative content.

HTML element краще використовувати, коли елемент має:

    semantic meaning
    interaction
    complex structure
    JavaScript behavior

### 13. Чому decoration не повинна містити важливу інформацію?

Тому що декоративний CSS не є правильним місцем для semantic content.

### 14. Як зробити decoration responsive?

Можна використовувати:

    %
    vw
    vh
    clamp()
    min()
    max()
    media queries
    CSS variables

### 15. Як зробити animation decoration продуктивнішою?

По можливості анімувати:

    transform
    opacity

замість layout properties.

---

# 152. Mini Cheat Sheet

    /* Positioning context */
    .parent {
        position: relative;
    }

    /* Decoration */
    .parent::before {
        content: "";

        position: absolute;

        top: 0;
        right: 0;
    }

    /* Full overlay */
    .overlay {
        position: absolute;
        inset: 0;
    }

    /* Center */
    .element {
        position: absolute;

        top: 50%;
        left: 50%;

        transform:
            translate(-50%, -50%);
    }

    /* Layering */
    .parent {
        position: relative;
        isolation: isolate;
    }

    .decoration {
        position: absolute;
        z-index: 0;
    }

    .content {
        position: relative;
        z-index: 1;
    }

    /* Ignore pointer events */
    .decoration {
        pointer-events: none;
    }

    /* Clip decoration */
    .parent {
        overflow: hidden;
    }

---

# 153. Найважливіші Patterns

## Pattern 1 — Local Decoration

    .parent {
        position: relative;
    }

    .parent::before {
        content: "";
        position: absolute;
    }

---

## Pattern 2 — Full Overlay

    .overlay {
        position: absolute;
        inset: 0;
    }

---

## Pattern 3 — Center

    .element {
        position: absolute;
        inset: 0;
        width: max-content;
        height: max-content;
        margin: auto;
    }

---

## Pattern 4 — Center через Transform

    .element {
        position: absolute;
        top: 50%;
        left: 50%;
        transform:
            translate(-50%, -50%);
    }

---

## Pattern 5 — Layered Decoration

    .parent {
        position: relative;
        isolation: isolate;
    }

    .decoration {
        position: absolute;
        z-index: 0;
    }

    .content {
        position: relative;
        z-index: 1;
    }

---

## Pattern 6 — Non-interactive Decoration

    .decoration {
        pointer-events: none;
    }

---

## Pattern 7 — Clipped Decoration

    .parent {
        overflow: hidden;
    }

---

# 154. Найважливіша ментальна модель

Коли бачиш задачу:

> "Мені потрібно покласти декоративне коло у правий верхній кут card."

Думай:

    card
        ↓
    position: relative
        ↓
    ::before
        ↓
    position: absolute
        ↓
    top / right
        ↓
    width / height
        ↓
    border-radius: 50%
        ↓
    z-index
        ↓
    pointer-events: none

---

# 155. Ще одна важлива модель

Для складної композиції:

    COMPONENT
        │
        ├── layout
        │     ↓
        │   Flexbox / Grid
        │
        ├── decoration
        │     ↓
        │   absolute
        │
        ├── content
        │     ↓
        │   normal flow
        │
        └── interaction
              ↓
            button / link / input

Тобто:

> **Layout — Flexbox/Grid. Decoration — positioning.**

---

# 156. Positioning + Visual Effects

Positioned decorations особливо добре комбінуються з:

    border-radius
    gradients
    box-shadow
    filter
    opacity
    transform
    transition
    animation
    z-index
    overflow

Наприклад:

    .hero::before {
        content: "";

        position: absolute;

        top: -100px;
        right: -100px;

        width: 300px;
        aspect-ratio: 1;

        border-radius: 50%;

        background:
            radial-gradient(
                circle,
                #93c5fd,
                transparent 70%
            );

        filter: blur(10px);

        opacity: 0.6;

        pointer-events: none;
    }

---

# 157. Що запам'ятати в першу чергу

Якщо потрібно запам'ятати лише 10 речей:

    1. position: relative
       → створює локальний positioning context.

    2. position: absolute
       → виводить element із normal flow.

    3. top/right/bottom/left
       → задають координати.

    4. inset
       → shorthand для чотирьох координат.

    5. ::before / ::after
       → зручні для decoration.

    6. z-index
       → керує шарами.

    7. isolation: isolate
       → створює локальний stacking context.

    8. overflow: hidden
       → обрізає decoration.

    9. pointer-events: none
       → не дозволяє decoration блокувати interaction.

    10. transform + opacity
        → хороша основа для animated decoration.

---

# 158. Головний принцип

Не думай:

    "Як мені поставити цей елемент
     через absolute?"

Думай:

    "Який елемент є container?"

        ↓

    "Чи повинна decoration
     впливати на layout?"

        ↓

    Якщо ні:
        absolute

        ↓

    "Відносно чого вона повинна
     позиціонуватися?"

        ↓

    relative parent

        ↓

    "Який layer?"

        ↓

    z-index

        ↓

    "Чи повинна вона приймати
     pointer events?"

        ↓

    Якщо ні:
        pointer-events: none

        ↓

    "Що відбувається на mobile?"

        ↓

    responsive size / position

---

# 159. Підсумок

**Positioned Decorations** — це спосіб створювати декоративні шари, які не повинні змінювати основний layout сторінки.

Основний патерн:

    .parent {
        position: relative;
    }

    .parent::before {
        content: "";

        position: absolute;

        top: 0;
        right: 0;
    }

Для складніших компонентів:

    .parent {
        position: relative;
        isolation: isolate;
    }

    .decoration {
        position: absolute;
        z-index: 0;
        pointer-events: none;
    }

    .content {
        position: relative;
        z-index: 1;
    }

Основні інструменти:

    position
    top
    right
    bottom
    left
    inset
    z-index
    isolation
    overflow
    pointer-events
    ::before
    ::after
    transform

А головне правило:

> **Flexbox і Grid будують layout. `position: absolute` створює локальні overlays та decorations.**

Правильна структура:

    Component
        │
        ├── Layout
        │     ↓
        │   Flexbox / Grid
        │
        ├── Decoration
        │     ↓
        │   absolute / pseudo-element
        │
        └── Content
              ↓
          normal flow

Після опанування цього патерну ти зможеш створювати більшість типових CSS-декорацій:

    ✓ circles
    ✓ blobs
    ✓ lines
    ✓ badges
    ✓ overlays
    ✓ corner accents
    ✓ ribbons
    ✓ glows
    ✓ decorative backgrounds
    ✓ image accents
    ✓ hero decorations
    ✓ card decorations
    ✓ animated decorative elements