# CSS Transforms

## 1. Що таке CSS Transforms

**CSS Transforms** — це механізм CSS, який дозволяє змінювати візуальне положення, розмір, форму та орієнтацію елемента без зміни його звичайного місця в document flow.

Основна властивість:

    transform

Наприклад:

    .box {
        transform: translateX(50px);
    }

Елемент візуально переміститься на `50px` вправо.

Основні типи transforms:

    translate()
    translateX()
    translateY()
    translateZ()
    translate3d()

    scale()
    scaleX()
    scaleY()
    scaleZ()
    scale3d()

    rotate()
    rotateX()
    rotateY()
    rotateZ()

    skew()
    skewX()
    skewY()

    matrix()
    matrix3d()

Також важливо знати:

    transform-origin
    perspective

---

# 2. Головна ідея `transform`

Transform змінює **візуальне представлення** елемента.

Наприклад:

    .box {
        transform: translateX(100px);
    }

Елемент буде намальований на 100px правіше.

Але його початкове місце в layout залишається тим самим.

Це важлива відмінність від:

    margin
    top
    left
    width
    height

---

# 3. Transform не змінює звичайний layout

Наприклад:

    .box {
        transform: translateX(100px);
    }

Елемент візуально переміщується.

Але сусідні елементи поводяться так, ніби він залишився на своєму початковому місці.

Ментальна модель:

    Layout position
        ↓
    початкове місце елемента

    Transform
        ↓
    visual position

Тобто:

    layout
       ↓
    transform
       ↓
    rendered result

---

# 4. Синтаксис

Загальний синтаксис:

    selector {
        transform: function(value);
    }

Наприклад:

    .box {
        transform: translateX(50px);
    }

Або:

    .box {
        transform: scale(1.2);
    }

Або:

    .box {
        transform: rotate(45deg);
    }

---

# 5. Основні групи Transform

Можна поділити transforms на кілька груп.

### Переміщення

    translate()
    translateX()
    translateY()
    translateZ()
    translate3d()

### Масштабування

    scale()
    scaleX()
    scaleY()
    scaleZ()
    scale3d()

### Обертання

    rotate()
    rotateX()
    rotateY()
    rotateZ()

### Нахил

    skew()
    skewX()
    skewY()

### Матриці

    matrix()
    matrix3d()

Для повсякденної frontend-роботи найважливіші:

    translate
    scale
    rotate
    skew

---

# 6. `translate()`

`translate()` переміщує елемент по X та Y.

Синтаксис:

    transform: translate(x, y);

Наприклад:

    .box {
        transform: translate(50px, 20px);
    }

Це означає:

    X → +50px
    Y → +20px

---

# 7. `translateX()`

Переміщення тільки по горизонталі.

    .box {
        transform: translateX(100px);
    }

Позитивне значення:

    translateX(100px)

→ вправо.

Негативне:

    translateX(-100px)

→ вліво.

---

# 8. `translateY()`

Переміщення по вертикалі.

    .box {
        transform: translateY(50px);
    }

Позитивне значення:

    translateY(50px)

→ вниз.

Негативне:

    translateY(-50px)

→ вгору.

---

# 9. Translate у відсотках

Можна використовувати `%`.

    .box {
        transform: translateX(100%);
    }

Важливо:

> Відсоток у `translate()` зазвичай обчислюється від розміру самого елемента.

Наприклад:

    width: 200px;
    transform: translateX(100%);

означає приблизно:

    +200px

---

# 10. Класичний pattern для центрування

Один із найвідоміших CSS-патернів:

    .modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

Логіка:

    top: 50%
        ↓
    лівий верхній кут modal
        ↓
    translate(-50%, -50%)
        ↓
    зміщення на половину власного розміру
        ↓
    центр

Це один із фундаментальних прикладів `transform`.

---

# 11. `translateZ()`

`translateZ()` переміщує елемент уздовж Z-axis.

Наприклад:

    .box {
        transform: translateZ(50px);
    }

Для коректного сприйняття 3D часто потрібна перспектива.

    .container {
        perspective: 800px;
    }

    .box {
        transform: translateZ(100px);
    }

---

# 12. `translate3d()`

Дозволяє задати X, Y та Z:

    .box {
        transform: translate3d(
            50px,
            20px,
            100px
        );
    }

Порядок:

    X
    Y
    Z

---

# 13. `scale()`

`scale()` змінює розмір елемента.

Синтаксис:

    transform: scale(value);

Наприклад:

    .box {
        transform: scale(1.2);
    }

`1`:

    scale(1)

→ оригінальний розмір.

Менше `1`:

    scale(0.8)

→ зменшення.

Більше `1`:

    scale(1.2)

→ збільшення.

---

# 14. `scaleX()`

Масштабування тільки по X.

    .box {
        transform: scaleX(1.5);
    }

Ширина візуально збільшується.

---

# 15. `scaleY()`

Масштабування тільки по Y.

    .box {
        transform: scaleY(1.5);
    }

Висота візуально збільшується.

---

# 16. `scale()` з двома значеннями

Можна задавати X та Y:

    .box {
        transform: scale(1.5, 0.8);
    }

Тут:

    X → 1.5
    Y → 0.8

---

# 17. `scale(0)`

Можна повністю сховати елемент візуально:

    .box {
        transform: scale(0);
    }

Це часто використовується в animations.

Наприклад:

    .menu::before {
        transform: scaleX(0);
    }

При hover:

    .menu:hover::before {
        transform: scaleX(1);
    }

---

# 18. `rotate()`

`rotate()` обертає елемент у 2D.

Наприклад:

    .box {
        transform: rotate(45deg);
    }

Позитивне значення:

    rotate(45deg)

→ обертання за годинниковою стрілкою.

Негативне:

    rotate(-45deg)

→ проти годинникової стрілки.

---

# 19. Одиниці для `rotate()`

Найчастіше використовують:

    deg

Наприклад:

    rotate(45deg)

Також існують:

    turn
    rad
    grad

Наприклад:

    rotate(0.25turn)

Це:

    90deg

---

# 20. `rotate(90deg)`

Наприклад:

    .icon {
        transform: rotate(90deg);
    }

Елемент повертається на 90 градусів.

---

# 21. `rotate(180deg)`

    .arrow {
        transform: rotate(180deg);
    }

Корисно, наприклад, для зміни напрямку стрілки.

---

# 22. `rotateX()`

`rotateX()` обертає елемент навколо X-axis.

    .card {
        transform: rotateX(45deg);
    }

Це вже 3D transform.

Для виразного ефекту потрібна перспектива:

    .container {
        perspective: 800px;
    }

    .card {
        transform: rotateX(45deg);
    }

---

# 23. `rotateY()`

Обертання навколо Y-axis:

    .card {
        transform: rotateY(45deg);
    }

Це часто використовується для:

- card flip;
- 3D navigation;
- product cards;
- visual effects.

---

# 24. `rotateZ()`

Обертання навколо Z-axis:

    .box {
        transform: rotateZ(45deg);
    }

У 2D-контексті:

    rotate()
    
і

    rotateZ()

можуть давати однаковий візуальний результат.

---

# 25. `skew()`

`skew()` нахиляє елемент по X та Y.

    .box {
        transform: skew(20deg, 10deg);
    }

Перший параметр:

    X

Другий:

    Y

---

# 26. `skewX()`

Нахил по X:

    .box {
        transform: skewX(20deg);
    }

Це може створювати ефект похилого блоку.

---

# 27. `skewY()`

Нахил по Y:

    .box {
        transform: skewY(20deg);
    }

---

# 28. Практичне використання `skew`

Наприклад, декоративна секція:

    .section {
        transform: skewY(-3deg);
    }

Але потрібно пам'ятати, що transform застосовується до всього елемента, включно з його content.

Для складніших layout effects часто краще використовувати:

    ::before
    ::after

або:

    clip-path

---

# 29. Transform можна комбінувати

Можна використовувати кілька transform functions:

    .box {
        transform:
            translateX(50px)
            rotate(20deg)
            scale(1.2);
    }

Тут застосовуються:

    translateX()
    rotate()
    scale()

---

# 30. Порядок Transform має значення

Це дуже важливо.

Наприклад:

    transform:
        translateX(100px)
        rotate(45deg);

і:

    transform:
        rotate(45deg)
        translateX(100px);

не обов'язково дають однаковий результат.

Причина:

> Transform functions застосовуються послідовно, і порядок операцій впливає на результат.

---

# 31. Приклад порядку Transform

Порівняй:

    .box {
        transform:
            translateX(100px)
            rotate(45deg);
    }

і:

    .box {
        transform:
            rotate(45deg)
            translateX(100px);
    }

У другому випадку напрямок переміщення вже залежить від трансформованої системи координат.

Тому:

> Не просто дивись на набір transforms — дивись на їх порядок.

---

# 32. `transform-origin`

`transform-origin` визначає **точку, навколо якої відбувається transform**.

За замовчуванням:

    transform-origin: center;

Тобто центр елемента.

---

# 33. `transform-origin: center`

За замовчуванням:

    .box {
        transform-origin: center;
    }

При:

    rotate(45deg)

елемент обертається навколо свого центру.

---

# 34. `transform-origin: top left`

Можна змінити точку:

    .box {
        transform-origin: top left;
        transform: rotate(45deg);
    }

Тепер елемент обертається навколо верхнього лівого кута.

---

# 35. `transform-origin` у відсотках

Наприклад:

    .box {
        transform-origin: 0% 50%;
    }

Це:

    X → left
    Y → center

Інший приклад:

    .box {
        transform-origin: 100% 50%;
    }

Це:

    X → right
    Y → center

---

# 36. `transform-origin` і hover

Наприклад:

    .link::after {
        transform-origin: left;
        transform: scaleX(0);
        transition: transform 0.3s ease;
    }

    .link:hover::after {
        transform: scaleX(1);
    }

Якщо `transform-origin: left`, лінія ніби "виростає" зліва направо.

Якщо:

    transform-origin: right;

вона з'являтиметься справа наліво.

---

# 37. `transform-origin` і rotate

Наприклад, можна створити обертання навколо краю:

    .needle {
        transform-origin: bottom center;
        transform: rotate(45deg);
    }

Це корисно для:

- стрілок;
- важелів;
- дверей;
- clock hands;
- декоративних elements.

---

# 38. Transform та document flow

Важлива властивість:

    transform

не змінює звичайний layout так само, як зміна:

    width
    height
    margin

Наприклад:

    .box {
        transform: scale(1.5);
    }

Візуально box збільшується, але layout space навколо нього не збільшується відповідно до нового візуального розміру.

---

# 39. Transform vs margin

Порівняй:

    .box {
        margin-left: 100px;
    }

і:

    .box {
        transform: translateX(100px);
    }

`margin` впливає на layout.

`transform` змінює visual rendering.

Тому для animation переміщення часто використовують:

    transform: translate(...);

а не:

    margin-left: ...;

---

# 40. Transform vs `top` / `left`

Порівняй:

    .box {
        position: relative;
        left: 100px;
    }

та:

    .box {
        transform: translateX(100px);
    }

Обидва можуть візуально перемістити елемент.

Але `transform` є стандартним вибором для багатьох UI animations.

---

# 41. Transform та animation

Один із найпоширеніших patterns:

    .button {
        transition: transform 0.2s ease;
    }

    .button:hover {
        transform: translateY(-2px);
    }

При hover button трохи піднімається.

---

# 42. Hover lift effect

    .card {
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
    }

    .card:hover {
        transform: translateY(-8px);
        box-shadow:
            0 12px 30px
            rgb(0 0 0 / 0.15);
    }

Це дуже поширений UI pattern.

---

# 43. Hover scale effect

    .card {
        transition: transform 0.3s ease;
    }

    .card:hover {
        transform: scale(1.03);
    }

Використовується для:

- cards;
- images;
- buttons;
- thumbnails.

Але scale не варто робити занадто великим.

---

# 44. Image zoom effect

HTML:

    <div class="image-wrapper">
        <img
            src="image.jpg"
            alt="Landscape"
        >
    </div>

CSS:

    .image-wrapper {
        overflow: hidden;
    }

    .image-wrapper img {
        display: block;
        transition: transform 0.4s ease;
    }

    .image-wrapper:hover img {
        transform: scale(1.08);
    }

`overflow: hidden` обрізає збільшене зображення.

---

# 45. Button press effect

    .button {
        transition: transform 0.1s ease;
    }

    .button:active {
        transform: translateY(2px);
    }

При натисканні кнопка візуально опускається.

---

# 46. Rotate icon on hover

    .icon {
        transition: transform 0.3s ease;
    }

    .button:hover .icon {
        transform: rotate(45deg);
    }

Це зручно для:

- arrows;
- plus icons;
- menu icons;
- settings icons.

---

# 47. Arrow animation

HTML:

    <a class="link" href="#">
        Learn more
        <span class="arrow">→</span>
    </a>

CSS:

    .arrow {
        display: inline-block;
        transition: transform 0.3s ease;
    }

    .link:hover .arrow {
        transform: translateX(5px);
    }

Важливо:

> Для transform на inline element іноді зручно використовувати `display: inline-block`.

---

# 48. Scale та `transform-origin`

Наприклад:

    .button {
        transform-origin: center;
    }

    .button:hover {
        transform: scale(1.05);
    }

Або:

    .button {
        transform-origin: left center;
    }

Тоді масштабування буде візуально прив'язане до лівого краю.

---

# 49. Transform і `overflow`

Якщо елемент збільшується:

    transform: scale(1.2);

він може вийти за межі контейнера.

Можна використати:

    .container {
        overflow: hidden;
    }

Наприклад для image zoom:

    .image-wrapper {
        overflow: hidden;
    }

---

# 50. 2D Transforms

Основні 2D transforms:

    translate()
    translateX()
    translateY()

    scale()
    scaleX()
    scaleY()

    rotate()

    skew()
    skewX()
    skewY()

Вони працюють у площині:

    X
    Y

Ментальна модель:

    Y
    ↑
    |
    |
    +----------→ X

---

# 51. 3D Transforms

3D transforms додають:

    Z-axis

Ментальна модель:

    Y
    ↑
    |
    |
    +----------→ X
   /
  /
 Z

Основні 3D transforms:

    translateZ()
    translate3d()

    rotateX()
    rotateY()
    rotateZ()

    scaleZ()
    scale3d()

---

# 52. `perspective`

Для 3D-ефектів важлива перспектива.

Наприклад:

    .scene {
        perspective: 800px;
    }

    .card {
        transform: rotateY(45deg);
    }

Чим менше значення:

    perspective: 400px;

тим сильнішим буде перспективний ефект.

Більше значення:

    perspective: 1200px;

дає більш "плаский" 3D ефект.

---

# 53. `perspective()` у transform

Perspective також може бути transform function:

    .card {
        transform:
            perspective(800px)
            rotateY(45deg);
    }

Не плутай:

    perspective: 800px;

і:

    transform:
        perspective(800px)
        rotateY(45deg);

Вони працюють на різних рівнях.

---

# 54. `transform-style`

Для збереження 3D-простору дочірніх елементів:

    .scene {
        transform-style: preserve-3d;
    }

Особливо важливо для складних 3D components.

---

# 55. `backface-visibility`

У 3D можна керувати тим, чи видно задню сторону елемента:

    .card {
        backface-visibility: hidden;
    }

Значення:

    visible

або:

    hidden

---

# 56. Card Flip

Один із класичних прикладів 3D transform.

HTML:

    <div class="card">
        <div class="card__front">
            Front
        </div>

        <div class="card__back">
            Back
        </div>
    </div>

CSS:

    .card {
        position: relative;
        width: 200px;
        height: 300px;
        transform-style: preserve-3d;
        transition: transform 0.6s ease;
    }

    .card:hover {
        transform: rotateY(180deg);
    }

    .card__front,
    .card__back {
        position: absolute;
        inset: 0;
        backface-visibility: hidden;
    }

    .card__back {
        transform: rotateY(180deg);
    }

---

# 57. Transform і CSS custom properties

Можна створювати reusable transforms:

    .card {
        --card-y: 0px;
        transform:
            translateY(var(--card-y));
    }

При hover:

    .card:hover {
        --card-y: -8px;
    }

Це може бути зручно в component-based CSS.

---

# 58. Transform та `calc()`

Можна комбінувати transform з CSS functions:

    .box {
        transform:
            translateX(
                calc(100% + 20px)
            );
    }

Це дозволяє створювати динамічні позиціонування.

---

# 59. Transform та CSS units

Для translate можуть використовуватися:

    px
    %
    rem
    em
    vw
    vh

Наприклад:

    transform: translateX(2rem);

Або:

    transform: translateY(-50%);

Для rotate:

    deg
    turn
    rad
    grad

Для scale:

    number

Наприклад:

    scale(1.1)

---

# 60. `translateX(100%)` vs `translateX(100px)`

Це важлива різниця.

    translateX(100px)

→ переміщення на 100px.

    translateX(100%)

→ переміщення на 100% від власного розміру по відповідній осі.

Тому:

    width: 300px;
    transform: translateX(100%);

дасть приблизно:

    300px

переміщення по X.

---

# 61. `translateY(-50%)`

Часто використовується для вертикального центрування:

    top: 50%;
    transform: translateY(-50%);

Наприклад:

    .element {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

---

# 62. Transform для центрування

Класичний варіант:

    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

Але в modern CSS для багатьох layout tasks краще спочатку розглянути:

    flexbox
    grid

Наприклад:

    .container {
        display: grid;
        place-items: center;
    }

Тобто:

> Transform — інструмент для visual positioning, а не універсальна заміна Flexbox/Grid.

---

# 63. Transform та Flexbox

Transform можна комбінувати з Flexbox.

Наприклад:

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .item:hover {
        transform: scale(1.05);
    }

Flexbox відповідає за layout.

Transform — за visual effect.

---

# 64. Transform та Grid

Аналогічно:

    .grid {
        display: grid;
        place-items: center;
    }

    .card:hover {
        transform: translateY(-5px);
    }

Grid керує layout.

Transform додає interaction effect.

---

# 65. Transform та transition

Для плавної зміни transform:

    .box {
        transition: transform 0.3s ease;
    }

    .box:hover {
        transform: translateY(-10px);
    }

Без `transition` зміна буде миттєвою.

---

# 66. Transform та keyframes

Transform дуже часто використовується в animations.

    @keyframes bounce {
        0% {
            transform: translateY(0);
        }

        50% {
            transform: translateY(-20px);
        }

        100% {
            transform: translateY(0);
        }
    }

Застосування:

    .ball {
        animation: bounce 1s infinite;
    }

---

# 67. Комбінування `transform` в animation

Наприклад:

    @keyframes card-enter {
        from {
            opacity: 0;
            transform:
                translateY(20px)
                scale(0.98);
        }

        to {
            opacity: 1;
            transform:
                translateY(0)
                scale(1);
        }
    }

Це типовий pattern для появи компонентів.

---

# 68. Не перезаписуй `transform`

Важлива помилка:

    .box {
        transform: translateX(50px);
    }

    .box:hover {
        transform: scale(1.1);
    }

При hover попередній `translateX()` зникає.

Чому?

Тому що другий `transform` замінює весь список transforms.

---

# 69. Як правильно комбінувати transforms

Потрібно записати їх разом:

    .box {
        transform:
            translateX(50px)
            scale(1.1);
    }

Або використати окремі individual transform properties, якщо це відповідає задачі:

    .box {
        translate: 50px 0;
        scale: 1.1;
    }

Сучасний CSS також має окремі properties:

    translate
    rotate
    scale

---

# 70. Individual Transform Properties

Сучасний CSS дозволяє окремо задавати:

    translate
    rotate
    scale

Наприклад:

    .box {
        translate: 50px 0;
        rotate: 10deg;
        scale: 1.1;
    }

Це відрізняється від:

    transform:
        translate(50px)
        rotate(10deg)
        scale(1.1);

Для modern CSS важливо знати, що такі individual transform properties існують.

---

# 71. `translate` property

Наприклад:

    .box {
        translate: 50px 20px;
    }

Це сучасний аналог:

    transform:
        translate(50px, 20px);

---

# 72. `rotate` property

Наприклад:

    .box {
        rotate: 45deg;
    }

Аналог:

    transform:
        rotate(45deg);

---

# 73. `scale` property

Наприклад:

    .box {
        scale: 1.2;
    }

Аналог:

    transform:
        scale(1.2);

---

# 74. Коли використовувати `transform`, а коли individual properties

Для звичайного коду:

    transform

залишається дуже важливим і універсальним.

Individual properties:

    translate
    rotate
    scale

можуть бути зручними, коли потрібно незалежно керувати окремими видами трансформацій.

Головне:

> Розуміти обидва підходи, але не змішувати їх без необхідності.

---

# 75. Transform та performance

Transform часто добре підходить для animations.

Особливо поширені:

    transform
    opacity

Наприклад:

    .element {
        transition:
            transform 0.3s ease,
            opacity 0.3s ease;
    }

У багатьох випадках це краще для анімації, ніж постійне змінювання layout-властивостей.

---

# 76. Чому `transform` часто використовують для animation

Наприклад:

    .box:hover {
        transform: translateY(-10px);
    }

замість:

    .box:hover {
        top: -10px;
    }

Transform не потребує того самого layout recalculation, що багато layout properties.

Але:

> Не потрібно автоматично додавати `will-change` до всього.

---

# 77. `will-change`

`will-change` повідомляє браузеру, що властивість, ймовірно, буде змінюватися.

Наприклад:

    .animated-element {
        will-change: transform;
    }

Але не варто використовувати його всюди.

Поганий підхід:

    * {
        will-change: transform;
    }

Краще:

> Використовувати `will-change` тільки там, де є реальна потреба та вимірюваний performance benefit.

---

# 78. Transform і `position: fixed`

Transforms можуть впливати на containing block для descendants у певних випадках.

Особливо важливо пам'ятати про transformed ancestors у складних layout scenarios.

Якщо `position: fixed` поводиться неочікувано, перевір батьківські елементи та їх:

    transform

    perspective

    filter

та інші властивості, які можуть створювати особливий containing/stacking context.

---

# 79. Transform та stacking context

Застосування:

    transform

може створювати новий stacking context.

Тому transform може впливати не тільки на геометрію, а й на порядок шарів.

Якщо виникають проблеми із:

    z-index

перевір, чи немає transformed ancestor.

---

# 80. Типові помилки

## Помилка 1 — плутати `transform` і layout

Неправильно думати:

    transform: translateX(100px);

означає зміну layout position.

Це насамперед visual transformation.

---

## Помилка 2 — перезаписувати transform

Погано:

    .box {
        transform: translateX(50px);
    }

    .box:hover {
        transform: scale(1.1);
    }

`translateX()` зникне.

Правильно:

    .box:hover {
        transform:
            translateX(50px)
            scale(1.1);
    }

---

## Помилка 3 — забути `transform-origin`

Якщо animation обертається навколо неправильного місця:

    transform-origin

може вирішити проблему.

---

## Помилка 4 — використовувати великий `scale()`

Наприклад:

    transform: scale(2);

може створити:

- overlap;
- layout issues;
- visual noise;
- overflow.

Для hover card часто достатньо:

    scale(1.02);

або:

    scale(1.03);

---

## Помилка 5 — анімувати `left` замість transform

Замість:

    left: 100px;

для visual animation часто краще:

    transform: translateX(100px);

---

## Помилка 6 — використовувати transform для layout

Не варто використовувати:

    transform: translateX(...);

як заміну:

    flexbox
    grid
    margin
    gap

якщо завдання насправді є layout-задачею.

---

## Помилка 7 — забутий `overflow`

При:

    scale()

елемент може виходити за межі контейнера.

Перевір:

    overflow

---

# 81. Transform та Accessibility

Не варто використовувати transform так, щоб:

- interactive element раптово переміщувався;
- текст ставав недоступним;
- важливий content зникав;
- keyboard focus ставав неочевидним.

Наприклад:

    .button:hover {
        transform: scale(1.5);
    }

може бути надмірним.

Краще:

    .button:hover {
        transform: translateY(-2px);
    }

---

# 82. Transform та `prefers-reduced-motion`

Для анімацій потрібно враховувати користувачів, які віддають перевагу зменшенню руху.

Наприклад:

    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms;
            animation-iteration-count: 1;
            transition-duration: 0.01ms;
        }
    }

Для конкретного компонента можна також спростити transform animation.

---

# 83. Практичний приклад — Card Hover

HTML:

    <article class="card">
        <h2>CSS</h2>
        <p>Learn transforms.</p>
    </article>

CSS:

    .card {
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
    }

    .card:hover {
        transform: translateY(-8px);
        box-shadow:
            0 12px 30px
            rgb(0 0 0 / 0.15);
    }

---

# 84. Практичний приклад — Image Zoom

HTML:

    <div class="image-wrapper">
        <img
            src="image.jpg"
            alt="Mountain"
        >
    </div>

CSS:

    .image-wrapper {
        overflow: hidden;
    }

    .image-wrapper img {
        display: block;
        transition: transform 0.4s ease;
    }

    .image-wrapper:hover img {
        transform: scale(1.08);
    }

---

# 85. Практичний приклад — Rotating Arrow

HTML:

    <button class="accordion-button">
        More
        <span class="arrow">⌄</span>
    </button>

CSS:

    .arrow {
        display: inline-block;
        transition: transform 0.3s ease;
    }

    .accordion-button:hover .arrow {
        transform: rotate(180deg);
    }

---

# 86. Практичний приклад — Sliding Element

HTML:

    <div class="panel">
        Panel
    </div>

CSS:

    .panel {
        transform: translateX(-100%);
        transition: transform 0.3s ease;
    }

    .panel.is-open {
        transform: translateX(0);
    }

Це типовий pattern для:

- sidebars;
- drawers;
- mobile navigation;
- panels.

---

# 87. Практичний приклад — Scale In

    .modal {
        transform: scale(0.95);
        opacity: 0;
        transition:
            transform 0.2s ease,
            opacity 0.2s ease;
    }

    .modal.is-open {
        transform: scale(1);
        opacity: 1;
    }

Це створює простий appearance effect.

---

# 88. Практичний приклад — Rotate Card

    .card:hover {
        transform: rotate(2deg);
    }

Для невеликого декоративного ефекту:

    rotate(1deg)

або:

    rotate(-1deg)

часто достатньо.

---

# 89. Практичний приклад — Combined Transform

    .card:hover {
        transform:
            translateY(-6px)
            rotate(1deg)
            scale(1.02);
    }

Але комбіновані ефекти потрібно використовувати помірно.

---

# 90. Практичний приклад — Transform Origin

    .menu-icon {
        transform-origin: center;
        transition: transform 0.3s ease;
    }

    .menu-icon:hover {
        transform: rotate(90deg);
    }

Для animation навколо краю:

    .needle {
        transform-origin: bottom center;
        transform: rotate(30deg);
    }

---

# 91. Практичний приклад — Modal Centering

    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

Це класичний приклад.

Але для нового layout-коду варто також знати:

    .container {
        display: grid;
        place-items: center;
    }

---

# 92. Практична вправа 1 — Translate

Створи квадрат:

    <div class="box"></div>

Зроби:

    translateX(100px)

Потім:

    translateY(50px)

Потім:

    translate(100px, 50px)

Порівняй результат.

---

# 93. Практична вправа 2 — Scale

Створи card.

При hover:

    scale(1.05)

Додай:

    transition: transform 0.3s ease;

---

# 94. Практична вправа 3 — Rotate

Створи icon.

При hover:

    rotate(45deg)

Потім зміни:

    transform-origin

і подивись, як змінюється точка обертання.

---

# 95. Практична вправа 4 — Transform Order

Порівняй:

    transform:
        translateX(100px)
        rotate(45deg);

та:

    transform:
        rotate(45deg)
        translateX(100px);

Поясни, чому результат відрізняється.

---

# 96. Практична вправа 5 — Image Zoom

Створи image card.

Використай:

    overflow: hidden;

та:

    transform: scale(1.1);

Зроби плавний zoom через:

    transition

---

# 97. Практична вправа 6 — Button Press

Створи кнопку.

При:

    :active

використай:

    transform: translateY(2px);

Мета — створити ефект фізичного натискання.

---

# 98. Практична вправа 7 — Animated Navigation

Створи sidebar.

Початково:

    transform: translateX(-100%);

При додаванні:

    .is-open

зроби:

    transform: translateX(0);

---

# 99. Практична вправа 8 — 3D Card

Створи card.

Використай:

    perspective
    rotateY()
    backface-visibility

Створи простий card flip.

---

# 100. Практична вправа 9 — Combined Transform

Створи card hover:

    translateY()
    rotate()
    scale()

Наприклад:

    transform:
        translateY(-5px)
        rotate(1deg)
        scale(1.02);

Потім спробуй пояснити роль кожної функції.

---

# 101. Практична вправа 10 — Transform vs Layout

Створи два блоки.

Для першого використай:

    margin-left

Для другого:

    transform: translateX()

Поспостерігай за тим, як поводяться сусідні елементи.

Мета:

> Побачити різницю між layout та visual transformation.

---

# 102. Що потрібно знати на рівні Core

Потрібно добре знати:

    transform

    translate()
    translateX()
    translateY()

    scale()
    scaleX()
    scaleY()

    rotate()

    skew()
    skewX()
    skewY()

    transform-origin

Також розуміти:

- що transform не є звичайною layout-властивістю;
- різницю між transform і margin;
- різницю між transform і `top/left`;
- базове використання transition.

---

# 103. Що потрібно знати на рівні Junior

Вміти використовувати transforms для:

- hover effects;
- buttons;
- cards;
- image zoom;
- navigation;
- dropdowns;
- drawers;
- modals;
- icons;
- decorative elements;
- simple animations.

Добре розуміти:

    translate
    scale
    rotate
    transform-origin
    transition
    overflow
    z-index

---

# 104. Що потрібно знати на рівні Middle

Розуміти:

- порядок transform functions;
- 2D transforms;
- 3D transforms;
- `perspective`;
- `transform-style`;
- `backface-visibility`;
- stacking contexts;
- containing blocks;
- performance;
- `will-change`;
- individual transform properties;
- accessibility;
- `prefers-reduced-motion`.

---

# 105. Що потрібно знати на рівні Senior

Потрібно розуміти transforms не тільки як CSS functions, а як частину rendering pipeline браузера.

Вміти приймати рішення:

    transform
        vs
    layout property
        vs
    flexbox
        vs
    grid
        vs
    animation
        vs
    SVG

Також потрібно враховувати:

- performance;
- compositing;
- accessibility;
- stacking contexts;
- responsive behavior;
- maintainability;
- complexity.

Головне питання:

> Чи справді тут потрібен transform, чи я використовую його для задачі, яку краще вирішити layout-системою?

---

# 106. Питання для співбесіди

### 1. Що робить `transform`?

Змінює візуальне представлення елемента: його положення, масштаб, обертання або нахил.

---

### 2. Чи змінює `transform` layout?

Застосування transform не змінює звичайний layout так само, як margin, width або height.

---

### 3. Яка різниця між `translateX()` і `translateY()`?

`translateX()` переміщує по горизонталі.

`translateY()` — по вертикалі.

---

### 4. Що робить `scale()`?

Змінює візуальний масштаб елемента.

---

### 5. Що робить `rotate()`?

Обертає елемент навколо transform origin.

---

### 6. Що робить `transform-origin`?

Визначає точку, відносно якої виконується transform.

---

### 7. Чому порядок transforms має значення?

Тому що transform functions застосовуються послідовно, і кожна наступна операція працює вже з результатом попередньої.

---

### 8. Чим `transform: translateX()` відрізняється від `margin-left`?

`margin-left` впливає на layout.

`translateX()` змінює visual position.

---

### 9. Чому transform часто використовують для animations?

Transform добре підходить для visual movement і масштабування та часто дозволяє уникати layout changes.

---

### 10. Що таке `perspective`?

Властивість, яка визначає перспективу для 3D transforms.

---

### 11. Для чого потрібен `backface-visibility`?

Для керування видимістю задньої сторони 3D-transformed element.

---

### 12. Що станеться, якщо двічі записати `transform`?

Останнє значення `transform` замінить попереднє.

Наприклад:

    .box {
        transform: translateX(50px);
        transform: scale(1.2);
    }

Результат буде тільки:

    scale(1.2)

---

### 13. Як зберегти обидві трансформації?

    .box {
        transform:
            translateX(50px)
            scale(1.2);
    }

---

# 107. Головна шпаргалка

    /* =========================
       TRANSLATE
       ========================= */

    .box {
        transform: translate(50px, 20px);
    }

    .box {
        transform: translateX(50px);
    }

    .box {
        transform: translateY(20px);
    }


    /* =========================
       SCALE
       ========================= */

    .box {
        transform: scale(1.1);
    }

    .box {
        transform: scaleX(1.2);
    }

    .box {
        transform: scaleY(0.8);
    }


    /* =========================
       ROTATE
       ========================= */

    .box {
        transform: rotate(45deg);
    }


    /* =========================
       SKEW
       ========================= */

    .box {
        transform: skew(20deg, 10deg);
    }

    .box {
        transform: skewX(20deg);
    }

    .box {
        transform: skewY(20deg);
    }


    /* =========================
       TRANSFORM ORIGIN
       ========================= */

    .box {
        transform-origin: center;
    }

    .box {
        transform-origin: top left;
    }


    /* =========================
       COMBINATION
       ========================= */

    .box {
        transform:
            translateX(50px)
            rotate(10deg)
            scale(1.1);
    }


    /* =========================
       HOVER
       ========================= */

    .box {
        transition: transform 0.3s ease;
    }

    .box:hover {
        transform: translateY(-5px);
    }


    /* =========================
       3D
       ========================= */

    .scene {
        perspective: 800px;
    }

    .card {
        transform: rotateY(45deg);
    }


    /* =========================
       BACKFACE
       ========================= */

    .card {
        backface-visibility: hidden;
    }


    /* =========================
       INDIVIDUAL PROPERTIES
       ========================= */

    .box {
        translate: 50px 0;
        rotate: 10deg;
        scale: 1.1;
    }

---

# 108. Коротка таблиця Transform

    translate()
        → переміщення X + Y

    translateX()
        → переміщення X

    translateY()
        → переміщення Y

    translateZ()
        → переміщення Z

    scale()
        → масштаб X + Y

    scaleX()
        → масштаб X

    scaleY()
        → масштаб Y

    rotate()
        → обертання

    rotateX()
        → 3D обертання навколо X

    rotateY()
        → 3D обертання навколо Y

    rotateZ()
        → обертання навколо Z

    skew()
        → нахил X + Y

    skewX()
        → нахил X

    skewY()
        → нахил Y

---

# 109. Найважливіші CSS Properties навколо Transform

    transform
    transform-origin

    perspective
    transform-style
    backface-visibility

    translate
    rotate
    scale

    transition
    animation

    overflow
    z-index
    will-change

---

# 110. Transform Workflow

Коли потрібно зробити visual movement:

    1. Визначити початковий стан
        ↓
    2. Вибрати transform
        ↓
    3. Вибрати transform-origin
        ↓
    4. Додати transition
        ↓
    5. Створити hover / active / class state
        ↓
    6. Перевірити overflow
        ↓
    7. Перевірити accessibility
        ↓
    8. Перевірити mobile
        ↓
    9. Перевірити performance

---

# 111. Що запам'ятати

1. `transform` змінює visual representation елемента.
2. `translate()` переміщує елемент.
3. `scale()` змінює його масштаб.
4. `rotate()` обертає елемент.
5. `skew()` нахиляє елемент.
6. `transform-origin` визначає точку трансформації.
7. `translateX()` працює по X-axis.
8. `translateY()` працює по Y-axis.
9. `rotateX()` і `rotateY()` використовуються для 3D.
10. `perspective` створює перспективу для 3D.
11. `transform-style: preserve-3d` допомагає зберігати 3D-простір.
12. `backface-visibility` керує видимістю задньої сторони.
13. Порядок transform functions має значення.
14. Другий `transform` перезаписує перший.
15. Transform не є заміною Flexbox або Grid.
16. Для animation часто використовують `transform` разом із `transition`.
17. `translate()` часто кращий для visual movement, ніж анімація `left` або `margin`.
18. `scale()` потрібно використовувати помірно, особливо на interactive elements.
19. `overflow` важливий для scaled або translated elements.
20. `z-index` може взаємодіяти зі stacking context, створеним transform.
21. `will-change` не потрібно використовувати без необхідності.
22. `prefers-reduced-motion` важливий для motion-heavy UI.
23. Сучасний CSS також має окремі `translate`, `rotate` та `scale`.
24. Transform найкраще використовувати для visual effects та motion, а не для вирішення layout-задач.
25. Хороший frontend developer повинен розуміти не тільки синтаксис transform, а й те, **чому саме transform є правильним інструментом для конкретної задачі**.

---

# 112. Підсумок

**CSS Transforms** дозволяють змінювати візуальне представлення елементів без необхідності змінювати їхню базову HTML-структуру.

Основні інструменти:

    translate
        ↓
    переміщення

    scale
        ↓
    масштаб

    rotate
        ↓
    обертання

    skew
        ↓
    нахил

    transform-origin
        ↓
    точка трансформації

Для 3D:

    perspective
    rotateX()
    rotateY()
    translateZ()
    transform-style
    backface-visibility

Для UI:

    transform
        +
    transition
        +
    :hover / :active / class
        ↓
    smooth interaction

Для animation найчастіше варто мислити:

    opacity
        +
    transform

А для layout:

    Flexbox
    Grid

Головний принцип:

> **Transform — це насамперед інструмент visual transformation, motion та effects, а не заміна CSS layout.**

Найважливіші transforms, які потрібно знати напам'ять:

    translate()
    translateX()
    translateY()

    scale()

    rotate()

    skew()

    transform-origin

І найважливіший практичний pattern:

    .element {
        transition: transform 0.3s ease;
    }

    .element:hover {
        transform: translateY(-5px);
    }

Це одна з базових конструкцій modern CSS UI і фундамент для подальшого вивчення `transitions` та `animations`.