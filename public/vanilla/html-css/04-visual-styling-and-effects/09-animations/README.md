# CSS Animations

> `html-css/04-visual-styling-and-effects/09-animations`

## 1. Що таке CSS Animations

**CSS Animation** — це механізм створення автоматичних, багатокрокових змін CSS-властивостей за допомогою `@keyframes`.

На відміну від `transition`, animation може містити цілий сценарій:

    START → STEP 1 → STEP 2 → STEP 3 → END

Наприклад:

    0%   → transform: translateX(0)
    50%  → transform: translateX(100px)
    100% → transform: translateX(0)

CSS самостійно виконає цей сценарій.

---

# 2. Transition vs Animation

Це одна з найважливіших відмінностей.

## Transition

Transition зазвичай описує:

    A → B

Наприклад:

    normal → :hover

    .button {
        transition: transform 200ms ease;
    }

    .button:hover {
        transform: translateY(-2px);
    }

---

## Animation

Animation може описати:

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

---

# 3. Основна структура Animation

CSS animation складається з двох частин:

    1. @keyframes
    2. animation-властивості

Наприклад:

    @keyframes move {
        from {
            transform: translateX(0);
        }

        to {
            transform: translateX(100px);
        }
    }

    .box {
        animation: move 1s ease;
    }

Ментальна модель:

    @keyframes
        ↓
    описують сценарій

    animation
        ↓
    запускає сценарій

---

# 4. `@keyframes`

`@keyframes` визначає, що повинно відбуватися під час animation.

Синтаксис:

    @keyframes animation-name {
        from {
            property: value;
        }

        to {
            property: value;
        }
    }

Наприклад:

    @keyframes move {
        from {
            transform: translateX(0);
        }

        to {
            transform: translateX(200px);
        }
    }

---

# 5. `from` і `to`

Найпростіший варіант:

    @keyframes fade {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

Запуск:

    .element {
        animation: fade 500ms ease;
    }

Тут:

    from = 0%
    to   = 100%

---

# 6. Відсотки в `@keyframes`

Можна задавати кілька етапів:

    @keyframes move {
        0% {
            transform: translateX(0);
        }

        50% {
            transform: translateX(100px);
        }

        100% {
            transform: translateX(0);
        }
    }

Це означає:

    0%   → початок
    50%  → середина
    100% → кінець

---

# 7. Більше Keyframes

Можна створити багато етапів:

    @keyframes complex-move {
        0% {
            transform: translateX(0);
        }

        25% {
            transform: translateX(100px);
        }

        50% {
            transform: translateX(100px) translateY(100px);
        }

        75% {
            transform: translateX(0) translateY(100px);
        }

        100% {
            transform: translateX(0) translateY(0);
        }
    }

Браузер автоматично інтерполює значення між keyframes.

---

# 8. `animation-name`

Визначає ім'я animation.

Наприклад:

    @keyframes fade {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    .element {
        animation-name: fade;
    }

Самого `animation-name` недостатньо.

Потрібно також вказати duration:

    .element {
        animation-name: fade;
        animation-duration: 500ms;
    }

---

# 9. `animation-duration`

Визначає тривалість одного циклу animation.

    .element {
        animation-duration: 1s;
    }

Або:

    .element {
        animation-duration: 500ms;
    }

Наприклад:

    200ms
    300ms
    500ms
    1s
    2s

---

# 10. `animation-timing-function`

Визначає швидкість animation.

Основні значення:

    linear
    ease
    ease-in
    ease-out
    ease-in-out
    cubic-bezier()
    steps()

Наприклад:

    .box {
        animation:
            move 1s ease-in-out;
    }

---

# 11. `linear`

Animation виконується з приблизно однаковою швидкістю.

    @keyframes move {
        from {
            transform: translateX(0);
        }

        to {
            transform: translateX(300px);
        }
    }

    .box {
        animation: move 1s linear;
    }

Корисно для:

- loader;
- progress;
- обертання;
- технічних індикаторів.

---

# 12. `ease`

Стандартна плавність.

    .box {
        animation: move 1s ease;
    }

Початок і кінець руху плавніші.

---

# 13. `ease-in`

Повільно починає animation і поступово прискорюється.

    .box {
        animation: move 1s ease-in;
    }

---

# 14. `ease-out`

Починає швидше та поступово сповільнюється.

    .box {
        animation: move 1s ease-out;
    }

Добре підходить для:

- появи елементів;
- переміщення;
- UI feedback.

---

# 15. `ease-in-out`

Плавний початок і плавний кінець.

    .box {
        animation: move 1s ease-in-out;
    }

---

# 16. `cubic-bezier()`

Дозволяє створити власну timing curve.

    .box {
        animation:
            move 800ms cubic-bezier(0.4, 0, 0.2, 1);
    }

Формат:

    cubic-bezier(x1, y1, x2, y2)

---

# 17. `steps()`

Animation може виконуватися окремими кроками.

    .box {
        animation:
            move 1s steps(4);
    }

Це корисно для:

- pixel-art;
- frame-by-frame ефектів;
- цифрових індикаторів;
- typing effects;
- sprite animation.

---

# 18. `animation-delay`

Визначає затримку перед початком animation.

    .element {
        animation:
            fade 500ms ease 300ms;
    }

Спочатку:

    300ms → очікування

Потім:

    500ms → animation

---

# 19. Важлива особливість negative delay

Можна використовувати від'ємний delay:

    .element {
        animation-delay: -500ms;
    }

Це означає, що animation ніби вже почалася до того, як елемент був показаний.

Особливо корисно для:

- staggered animations;
- синхронізації;
- циклічних animation;
- різних фаз однакової animation.

---

# 20. `animation-iteration-count`

Визначає кількість повторень.

Один раз:

    .box {
        animation-iteration-count: 1;
    }

Три рази:

    .box {
        animation-iteration-count: 3;
    }

Безкінечно:

    .box {
        animation-iteration-count: infinite;
    }

---

# 21. `infinite`

Наприклад loader:

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .loader {
        animation:
            spin 1s linear infinite;
    }

---

# 22. `animation-direction`

Визначає напрямок animation.

Основні значення:

    normal
    reverse
    alternate
    alternate-reverse

---

# 23. `normal`

Animation виконується:

    0% → 100%

Наприклад:

    .box {
        animation-direction: normal;
    }

---

# 24. `reverse`

Animation виконується:

    100% → 0%

Наприклад:

    .box {
        animation-direction: reverse;
    }

---

# 25. `alternate`

Animation чергує напрямки:

    0% → 100%
    100% → 0%
    0% → 100%
    ...

Наприклад:

    .box {
        animation-direction: alternate;
        animation-iteration-count: infinite;
    }

Це дуже корисно для плавних повторюваних рухів.

---

# 26. `alternate-reverse`

Починає зворотним напрямком:

    100% → 0%
    0% → 100%
    100% → 0%

---

# 27. `animation-fill-mode`

Визначає, які стилі animation застосовуються:

- до початку;
- після завершення.

Основні значення:

    none
    forwards
    backwards
    both

---

# 28. `none`

Стандартна поведінка.

    .element {
        animation-fill-mode: none;
    }

Після завершення animation елемент повертається до звичайного CSS-стану.

---

# 29. `forwards`

Після завершення animation елемент зберігає стилі останнього keyframe.

Наприклад:

    @keyframes fade {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    .element {
        animation:
            fade 500ms ease forwards;
    }

Після animation:

    opacity: 1

залишається.

---

# 30. `backwards`

Застосовує початковий keyframe під час `animation-delay`.

Наприклад:

    @keyframes slide {
        from {
            transform: translateY(20px);
        }

        to {
            transform: translateY(0);
        }
    }

    .element {
        animation:
            slide 500ms ease 1s backwards;
    }

Поки діє delay:

    from → translateY(20px)

---

# 31. `both`

Поєднує:

    backwards
    +
    forwards

Наприклад:

    .element {
        animation-fill-mode: both;
    }

Це часто зручно для animation із delay.

---

# 32. `animation-play-state`

Дозволяє запустити або поставити animation на паузу.

Значення:

    running
    paused

Наприклад:

    .loader {
        animation:
            spin 1s linear infinite;
    }

    .loader:hover {
        animation-play-state: paused;
    }

---

# 33. `running`

Animation працює:

    animation-play-state: running;

Це стандартний стан.

---

# 34. `paused`

Animation зупиняється:

    .element {
        animation-play-state: paused;
    }

При цьому animation не скидається.

Вона продовжить рух з того місця, де була поставлена на паузу.

---

# 35. `animation` shorthand

Усі основні параметри можна об'єднати.

Загальна форма:

    animation:
        name
        duration
        timing-function
        delay
        iteration-count
        direction
        fill-mode
        play-state;

Наприклад:

    .box {
        animation:
            move
            1s
            ease-in-out
            200ms
            2
            alternate
            forwards
            running;
    }

Не обов'язково використовувати всі параметри.

---

# 36. Найчастіший shorthand

Наприклад:

    .box {
        animation:
            move 1s ease-in-out;
    }

Або:

    .box {
        animation:
            fade 300ms ease forwards;
    }

Або:

    .loader {
        animation:
            spin 1s linear infinite;
    }

---

# 37. Простий Fade In

    @keyframes fade-in {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    .element {
        animation:
            fade-in 500ms ease forwards;
    }

---

# 38. Slide In

    @keyframes slide-in {
        from {
            opacity: 0;
            transform: translateY(20px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .element {
        animation:
            slide-in 500ms ease forwards;
    }

Це один із найкорисніших UI-патернів.

---

# 39. Slide From Left

    @keyframes slide-from-left {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }

        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .element {
        animation:
            slide-from-left 500ms ease-out forwards;
    }

---

# 40. Slide From Right

    @keyframes slide-from-right {
        from {
            opacity: 0;
            transform: translateX(30px);
        }

        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .element {
        animation:
            slide-from-right 500ms ease-out forwards;
    }

---

# 41. Scale In

    @keyframes scale-in {
        from {
            opacity: 0;
            transform: scale(0.9);
        }

        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    .modal {
        animation:
            scale-in 250ms ease-out forwards;
    }

---

# 42. Pulse

    @keyframes pulse {
        0% {
            transform: scale(1);
        }

        50% {
            transform: scale(1.05);
        }

        100% {
            transform: scale(1);
        }
    }

    .element {
        animation:
            pulse 1.5s ease-in-out infinite;
    }

---

# 43. Bounce

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

    .ball {
        animation:
            bounce 800ms ease-in-out infinite;
    }

---

# 44. Spin

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }

    .loader {
        animation:
            spin 1s linear infinite;
    }

---

# 45. Shake

    @keyframes shake {
        0% {
            transform: translateX(0);
        }

        25% {
            transform: translateX(-5px);
        }

        50% {
            transform: translateX(5px);
        }

        75% {
            transform: translateX(-5px);
        }

        100% {
            transform: translateX(0);
        }
    }

    .error {
        animation:
            shake 300ms ease-in-out;
    }

Корисно для:

- помилки форми;
- invalid input;
- notification.

---

# 46. Wiggle

    @keyframes wiggle {
        0% {
            transform: rotate(0);
        }

        25% {
            transform: rotate(-3deg);
        }

        50% {
            transform: rotate(3deg);
        }

        75% {
            transform: rotate(-3deg);
        }

        100% {
            transform: rotate(0);
        }
    }

---

# 47. Attention Animation

Можна створити короткий ефект привертання уваги:

    @keyframes attention {
        0% {
            transform: scale(1);
        }

        20% {
            transform: scale(1.05);
        }

        40% {
            transform: scale(1);
        }

        60% {
            transform: scale(1.05);
        }

        100% {
            transform: scale(1);
        }
    }

    .notification {
        animation:
            attention 1s ease-in-out;
    }

---

# 48. Loading Dots

HTML:

    <div class="loader">
        <span></span>
        <span></span>
        <span></span>
    </div>

CSS:

    @keyframes dot-pulse {
        0%,
        100% {
            opacity: 0.3;
            transform: scale(0.8);
        }

        50% {
            opacity: 1;
            transform: scale(1);
        }
    }

    .loader span {
        animation:
            dot-pulse 1s ease-in-out infinite;
    }

---

# 49. Staggered Animation

Можна зробити так, щоб елементи з'являлися по черзі.

HTML:

    <ul class="list">
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
    </ul>

CSS:

    @keyframes item-in {
        from {
            opacity: 0;
            transform: translateY(10px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .list li {
        animation:
            item-in 400ms ease forwards;
    }

    .list li:nth-child(1) {
        animation-delay: 0ms;
    }

    .list li:nth-child(2) {
        animation-delay: 100ms;
    }

    .list li:nth-child(3) {
        animation-delay: 200ms;
    }

---

# 50. Stagger через CSS Variable

Замість великої кількості правил:

    .list li {
        animation:
            item-in 400ms ease forwards;

        animation-delay:
            calc(var(--index) * 100ms);
    }

HTML:

    <li style="--index: 0">One</li>
    <li style="--index: 1">Two</li>
    <li style="--index: 2">Three</li>

Цей підхід зручний для компонентів і динамічних списків.

---

# 51. Multiple Animations

На одному елементі можна запускати кілька animations.

Наприклад:

    @keyframes move {
        from {
            transform: translateX(0);
        }

        to {
            transform: translateX(100px);
        }
    }

    @keyframes fade {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    .box {
        animation:
            move 1s ease,
            fade 500ms ease;
    }

---

# 52. Важлива проблема Multiple Animations

Якщо дві animations змінюють одну й ту саму властивість:

    transform

вони можуть конфліктувати.

Наприклад:

    @keyframes move {
        to {
            transform: translateX(100px);
        }
    }

    @keyframes scale {
        to {
            transform: scale(1.2);
        }
    }

    .box {
        animation:
            move 1s,
            scale 1s;
    }

Обидві animations намагаються керувати:

    transform

Тому краще продумати структуру.

---

# 53. Wrapper Pattern для Multiple Animations

Можна розділити відповідальність між елементами.

HTML:

    <div class="move">
        <div class="scale">
            Content
        </div>
    </div>

CSS:

    .move {
        animation:
            move 1s ease;
    }

    .scale {
        animation:
            scale 1s ease;
    }

Тепер кожна animation працює зі своїм елементом.

---

# 54. Animation з `background`

Можна анімувати background properties.

Наприклад:

    @keyframes background-shift {
        from {
            background-position: 0 0;
        }

        to {
            background-position: 200px 0;
        }
    }

    .background {
        animation:
            background-shift 5s linear infinite;
    }

Але складні background-анімації можуть бути дорожчими за прості `transform` та `opacity`.

---

# 55. Animation `box-shadow`

Можна:

    @keyframes shadow-pulse {
        0% {
            box-shadow: 0 0 0 rgba(0, 0, 0, 0);
        }

        50% {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        100% {
            box-shadow: 0 0 0 rgba(0, 0, 0, 0);
        }
    }

Але для великої кількості елементів потрібно враховувати продуктивність.

---

# 56. Animation `filter`

Можна анімувати:

    filter

Наприклад:

    @keyframes blur-in {
        from {
            opacity: 0;
            filter: blur(10px);
        }

        to {
            opacity: 1;
            filter: blur(0);
        }
    }

    .element {
        animation:
            blur-in 500ms ease forwards;
    }

---

# 57. Animation `border-radius`

Наприклад:

    @keyframes morph {
        0% {
            border-radius: 10px;
        }

        50% {
            border-radius: 50%;
        }

        100% {
            border-radius: 10px;
        }
    }

    .shape {
        animation:
            morph 2s ease-in-out infinite;
    }

---

# 58. Animation `transform`

`transform` є однією з найкорисніших властивостей для animations.

Можна використовувати:

    translate()
    translateX()
    translateY()
    scale()
    rotate()
    skew()

Наприклад:

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

# 59. Animation `opacity`

`opacity` дуже часто використовується для:

    fade-in
    fade-out
    notification
    modal
    tooltip
    loading
    reveal

Наприклад:

    @keyframes fade {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

---

# 60. Animation `transform + opacity`

Це один із найкорисніших патернів.

    @keyframes reveal {
        from {
            opacity: 0;
            transform: translateY(20px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .section {
        animation:
            reveal 500ms ease-out forwards;
    }

---

# 61. Animation і `transform-origin`

Можна змінювати точку трансформації:

    .element {
        transform-origin: center;
    }

Або:

    .element {
        transform-origin: top left;
    }

Наприклад:

    @keyframes open {
        from {
            transform: scaleY(0);
        }

        to {
            transform: scaleY(1);
        }
    }

    .menu {
        transform-origin: top;
        animation:
            open 300ms ease-out;
    }

---

# 62. Animation і `perspective`

Для 3D-ефектів можна використовувати:

    perspective
    rotateX()
    rotateY()
    rotateZ()

Наприклад:

    .scene {
        perspective: 800px;
    }

    @keyframes flip {
        from {
            transform: rotateY(0);
        }

        to {
            transform: rotateY(180deg);
        }
    }

    .card {
        animation:
            flip 1s ease;
    }

---

# 63. Animation і `backface-visibility`

Для 3D card effects:

    .card {
        backface-visibility: hidden;
    }

Це дозволяє приховувати задню сторону елемента під час 3D-повороту.

---

# 64. Animation-fill-mode у реальних UI

Наприклад, reveal:

    @keyframes reveal {
        from {
            opacity: 0;
            transform: translateY(20px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .card {
        animation:
            reveal 500ms ease forwards;
    }

Без `forwards` після завершення animation елемент може повернутися до початкових CSS-значень.

---

# 65. `forwards` та стан компонента

`forwards` корисний, коли animation повинна завершити елемент у новому візуальному стані.

Наприклад:

    hidden
        ↓
    animation
        ↓
    visible

Але важливо розуміти:

> `animation-fill-mode: forwards` не змінює справжній application state.

Він лише утримує стиль останнього keyframe.

---

# 66. Animation і JavaScript

JavaScript може запускати animation через додавання класу.

HTML:

    <button id="button">
        Animate
    </button>

    <div id="box"></div>

CSS:

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

    .is-animated {
        animation:
            bounce 500ms ease;
    }

JavaScript:

    button.addEventListener("click", () => {
        box.classList.add("is-animated");
    });

---

# 67. Повторний запуск Animation

Якщо клас уже існує:

    box.classList.add("is-animated");

повторне додавання того самого класу не обов'язково перезапустить animation.

Можна спочатку видалити клас:

    box.classList.remove("is-animated");

Потім додати його знову:

    box.classList.add("is-animated");

Але браузеру іноді потрібен момент для обробки зміни.

У складніших випадках можна використовувати:

    animationend

---

# 68. `animationend`

Браузер генерує подію після завершення animation.

JavaScript:

    box.addEventListener("animationend", () => {
        console.log("Animation finished");
    });

Це корисно для:

- очищення класів;
- зміни стану;
- запуску наступної дії;
- послідовних animations.

---

# 69. `animationstart`

Можна відслідкувати початок:

    box.addEventListener("animationstart", () => {
        console.log("Animation started");
    });

---

# 70. `animationiteration`

Викликається після кожного завершеного циклу, якщо animation повторюється.

    box.addEventListener("animationiteration", () => {
        console.log("Iteration finished");
    });

Особливо корисно для:

    infinite animations

---

# 71. Animation Event Flow

Для animation можна мислити так:

    animationstart
        ↓
    animation running
        ↓
    animationiteration
        ↓
    animationiteration
        ↓
    animationend

Не кожна animation матиме всі ці події.

---

# 72. CSS Animation без JavaScript

Багато animations взагалі не потребують JS.

Наприклад loader:

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .loader {
        animation:
            spin 1s linear infinite;
    }

Це повністю CSS-рішення.

---

# 73. Коли використовувати CSS Animation

CSS Animation добре підходить для:

- loaders;
- декоративних ефектів;
- attention effects;
- появи елементів;
- повторюваних рухів;
- floating effects;
- pulse;
- spinner;
- visual feedback;
- простих UI sequences.

---

# 74. Коли краще використовувати JavaScript

JavaScript потрібен, коли animation залежить від складної логіки:

    application state
    user interaction
    scroll position
    data
    asynchronous events
    complex sequencing

Наприклад:

    API response
        ↓
    JS змінює class
        ↓
    CSS запускає animation

---

# 75. CSS Animation та Scroll

Простий підхід:

    JavaScript
        ↓
    перевіряє scroll
        ↓
    додає .is-visible
        ↓
    CSS animation

Наприклад:

    .section {
        opacity: 0;
    }

    .section.is-visible {
        animation:
            reveal 500ms ease forwards;
    }

Для сучасних CSS існують також scroll-driven animation APIs, але це вже окрема сучасна тема.

---

# 76. CSS Animation та Loading

Класичний loader:

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .loader {
        width: 32px;
        height: 32px;

        border: 4px solid #ddd;
        border-top-color: #2563eb;
        border-radius: 50%;

        animation:
            spin 800ms linear infinite;
    }

---

# 77. CSS Animation та Skeleton

Skeleton loading:

    @keyframes skeleton {
        from {
            background-position: -200px 0;
        }

        to {
            background-position: 200px 0;
        }
    }

    .skeleton {
        background:
            linear-gradient(
                90deg,
                #eee,
                #f5f5f5,
                #eee
            );

        background-size: 200px 100%;

        animation:
            skeleton 1.2s linear infinite;
    }

---

# 78. CSS Animation та Notification

Наприклад:

    @keyframes notification-in {
        from {
            opacity: 0;
            transform: translateX(30px);
        }

        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .notification {
        animation:
            notification-in 300ms ease-out forwards;
    }

---

# 79. CSS Animation та Error State

Наприклад:

    @keyframes error-shake {
        0%,
        100% {
            transform: translateX(0);
        }

        25% {
            transform: translateX(-5px);
        }

        75% {
            transform: translateX(5px);
        }
    }

    .input.is-invalid {
        animation:
            error-shake 300ms ease-in-out;
    }

Animation використовується тут як короткий feedback.

---

# 80. CSS Animation та Attention

Наприклад notification badge:

    @keyframes badge-pulse {
        0% {
            transform: scale(1);
        }

        50% {
            transform: scale(1.15);
        }

        100% {
            transform: scale(1);
        }
    }

    .badge {
        animation:
            badge-pulse 1s ease-in-out 2;
    }

---

# 81. Animation та `display`

Як і у випадку transition, не варто розраховувати на звичайну анімацію:

    display: none → display: block

Для багатьох UI-ефектів краще використовувати:

    opacity
    transform
    visibility

Наприклад:

    .modal {
        opacity: 0;
        transform: scale(0.95);
        visibility: hidden;
    }

    .modal.is-open {
        opacity: 1;
        transform: scale(1);
        visibility: visible;
    }

Animation може відповідати за візуальну появу, а JS — за стан.

---

# 82. Animation і `visibility`

Для UI-компонентів часто комбінують:

    opacity
    +
    visibility
    +
    pointer-events

Наприклад:

    .tooltip {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;

        animation: none;
    }

Коли tooltip активний:

    .tooltip.is-visible {
        visibility: visible;
        pointer-events: auto;

        animation:
            tooltip-in 200ms ease forwards;
    }

---

# 83. Animation і `pointer-events`

Невидимий елемент:

    opacity: 0;

може залишатися інтерактивним.

Тому іноді:

    pointer-events: none;

використовується разом із:

    opacity: 0;

Наприклад:

    .menu {
        opacity: 0;
        pointer-events: none;
    }

    .menu.is-open {
        opacity: 1;
        pointer-events: auto;
    }

---

# 84. Animation і accessibility

Animation повинна враховувати користувачів із налаштуванням:

    prefers-reduced-motion

Наприклад:

    @media (prefers-reduced-motion: reduce) {
        .element {
            animation: none;
        }
    }

Це особливо важливо для:

- infinite animations;
- великих переміщень;
- zoom effects;
- rotation;
- parallax-like effects.

---

# 85. Зменшення руху

Не завжди потрібно повністю вимикати animation.

Наприклад, замість великого руху:

    transform: translateY(100px);

можна залишити мінімальний ефект або повністю його прибрати.

Приклад:

    @media (prefers-reduced-motion: reduce) {
        .element {
            animation: none;
        }
    }

---

# 86. Infinite Animation і Accessibility

Безкінечна animation:

    animation:
        pulse 1s infinite;

може бути проблемною, якщо вона:

- дуже швидка;
- постійно рухається;
- привертає надмірну увагу;
- створює дискомфорт.

Тому для декоративних animations краще перевіряти:

    prefers-reduced-motion

---

# 87. Animation Performance

Для плавних animations особливо корисні:

    transform
    opacity

Наприклад:

    @keyframes slide {
        from {
            opacity: 0;
            transform: translateY(20px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

---

# 88. Layout Properties

Обережніше потрібно ставитися до animations, які змінюють layout:

    width
    height
    top
    left
    margin
    padding

Вони можуть спричиняти додаткову роботу браузера.

Якщо можна вирішити задачу через:

    transform

часто це буде кращим варіантом.

---

# 89. `transform` замість `top`

Неідеальний варіант:

    @keyframes move {
        from {
            top: 0;
        }

        to {
            top: 100px;
        }
    }

Часто краще:

    @keyframes move {
        from {
            transform: translateY(0);
        }

        to {
            transform: translateY(100px);
        }
    }

---

# 90. `will-change`

Іноді можна зустріти:

    .element {
        will-change: transform;
    }

Це підказка браузеру щодо майбутньої зміни.

Але не потрібно застосовувати:

    will-change

до всіх елементів.

Погано:

    * {
        will-change: transform;
    }

Краще використовувати точково і лише там, де це реально виправдано.

---

# 91. Animation та stacking context

Деякі властивості, наприклад:

    transform
    opacity

можуть впливати на stacking context.

Тому при складних UI-анімаціях потрібно пам'ятати про:

    position
    z-index
    stacking context

---

# 92. Animation та `overflow`

Для руху дочірнього елемента часто використовують:

    overflow: hidden;

Наприклад:

    .card {
        overflow: hidden;
    }

    .card img {
        animation:
            zoom 5s ease-in-out infinite alternate;
    }

---

# 93. Animation з `object-fit`

Для зображень:

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

Разом із:

    transform: scale(...);

можна створити плавний zoom effect.

---

# 94. Animation з `transform-origin`

Наприклад zoom:

    .image {
        transform-origin: center;
    }

Або:

    .image {
        transform-origin: center center;
    }

Для відкривання меню:

    .menu {
        transform-origin: top;
    }

---

# 95. Animation і `animation-delay` для stagger

Класичний патерн:

    .item:nth-child(1) {
        animation-delay: 0ms;
    }

    .item:nth-child(2) {
        animation-delay: 100ms;
    }

    .item:nth-child(3) {
        animation-delay: 200ms;
    }

Результат:

    item 1
        ↓
    item 2
        ↓
    item 3

---

# 96. Animation та CSS Custom Properties

Можна використовувати CSS variables:

    :root {
        --duration-fast: 150ms;
        --duration-normal: 300ms;
    }

    .button {
        animation:
            pulse var(--duration-normal) ease;
    }

---

# 97. Design System Animation Tokens

У більшій системі можна визначити:

    :root {
        --motion-fast: 150ms;
        --motion-normal: 250ms;
        --motion-slow: 400ms;

        --ease-standard: ease;
        --ease-out: ease-out;
        --ease-in-out: ease-in-out;
    }

Потім:

    .notification {
        animation:
            notification-in
            var(--motion-normal)
            var(--ease-out);
    }

---

# 98. Animation Names

Імена animation повинні описувати дію:

Добре:

    fade-in
    slide-in
    slide-from-left
    scale-in
    spin
    pulse
    shake
    bounce
    notification-in

Гірше:

    animation1
    test
    effect
    move2

---

# 99. Організація `@keyframes`

Для невеликого проекту:

    @keyframes fade-in {
        ...
    }

    @keyframes slide-in {
        ...
    }

У більшому проекті animation можна централізувати:

    animations.css

Наприклад:

    animations/
        fade.css
        slide.css
        scale.css
        spin.css

Головна мета:

> Не дублювати однакові animation у різних компонентах.

---

# 100. Компонентний підхід

Наприклад:

    .modal {
        animation:
            modal-in 250ms ease-out;
    }

    .tooltip {
        animation:
            tooltip-in 150ms ease-out;
    }

    .notification {
        animation:
            notification-in 300ms ease-out;
    }

Кожен компонент має власну семантичну animation.

---

# 101. Не роби всі animations однаковими

Необов'язково використовувати:

    1s ease

для всього.

Кнопка:

    150ms

Tooltip:

    150–200ms

Modal:

    200–300ms

Велика декоративна animation:

    500ms–2s

Loader:

    infinite

---

# 102. Animation повинна мати UX-причину

Хороші причини:

    показати зміну стану
    показати loading
    привернути увагу
    пояснити переміщення
    показати появу
    показати результат дії

Погана причина:

    "Бо сторінка виглядає порожньою."

Animation не повинна заважати користувачу.

---

# 103. Animation для Hero

Наприклад:

    @keyframes hero-in {
        from {
            opacity: 0;
            transform: translateY(30px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .hero__content {
        animation:
            hero-in 600ms ease-out forwards;
    }

---

# 104. Hero з послідовною появою

HTML:

    <section class="hero">
        <h1>Learn CSS</h1>
        <p>Build modern interfaces.</p>
        <a href="#">Start learning</a>
    </section>

CSS:

    @keyframes hero-item-in {
        from {
            opacity: 0;
            transform: translateY(20px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .hero h1 {
        animation:
            hero-item-in 500ms ease-out 0ms both;
    }

    .hero p {
        animation:
            hero-item-in 500ms ease-out 100ms both;
    }

    .hero a {
        animation:
            hero-item-in 500ms ease-out 200ms both;
    }

---

# 105. Animation та `both`

У попередньому прикладі:

    animation-fill-mode: both;

або shorthand:

    animation:
        hero-item-in
        500ms
        ease-out
        100ms
        both;

Це дозволяє:

    delay
        ↓
    застосувати початковий keyframe

і після animation:

    end
        ↓
    зберегти кінцевий keyframe

---

# 106. Повна структура Animation

Корисно знати всі основні властивості:

    animation-name
    animation-duration
    animation-timing-function
    animation-delay
    animation-iteration-count
    animation-direction
    animation-fill-mode
    animation-play-state

Також існує shorthand:

    animation

---

# 107. Cheat Sheet

    /* Keyframes */
    @keyframes fade-in {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    /* Animation */
    .element {
        animation:
            fade-in 500ms ease;
    }

    /* Duration */
    animation-duration: 500ms;

    /* Delay */
    animation-delay: 200ms;

    /* Repeat */
    animation-iteration-count: 3;

    /* Infinite */
    animation-iteration-count: infinite;

    /* Direction */
    animation-direction: alternate;

    /* Fill */
    animation-fill-mode: forwards;

    /* Play state */
    animation-play-state: paused;

    /* Multiple animations */
    animation:
        fade-in 500ms ease,
        move 1s ease;

---

# 108. Найкорисніші Animation Recipes

## Fade

    @keyframes fade {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

---

## Slide

    @keyframes slide {
        from {
            opacity: 0;
            transform: translateY(20px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

---

## Scale

    @keyframes scale {
        from {
            opacity: 0;
            transform: scale(0.9);
        }

        to {
            opacity: 1;
            transform: scale(1);
        }
    }

---

## Spin

    @keyframes spin {
        from {
            transform: rotate(0);
        }

        to {
            transform: rotate(360deg);
        }
    }

---

## Pulse

    @keyframes pulse {
        0% {
            transform: scale(1);
        }

        50% {
            transform: scale(1.05);
        }

        100% {
            transform: scale(1);
        }
    }

---

## Shake

    @keyframes shake {
        0%,
        100% {
            transform: translateX(0);
        }

        25% {
            transform: translateX(-5px);
        }

        75% {
            transform: translateX(5px);
        }
    }

---

# 109. Типові помилки

## Помилка 1 — Забули duration

    .element {
        animation-name: fade;
    }

Краще:

    .element {
        animation:
            fade 500ms ease;
    }

---

## Помилка 2 — Забули `@keyframes`

    .element {
        animation:
            fade 500ms;
    }

Але немає:

    @keyframes fade {
        ...
    }

Animation не має сценарію.

---

## Помилка 3 — Забули `forwards`

Якщо елемент повинен залишитися у фінальному стані:

    animation:
        fade-in 500ms ease forwards;

---

## Помилка 4 — Надмірне використання `infinite`

Не кожен елемент повинен рухатися постійно.

---

## Помилка 5 — Надто довга animation

Наприклад:

    animation:
        fade-in 10s ease;

Для звичайного UI це найчастіше занадто довго.

---

## Помилка 6 — Конфлікт `transform`

Дві animations одночасно змінюють:

    transform

Потрібно або об'єднати transform в одну animation, або використати wrapper.

---

## Помилка 7 — Ігнорування accessibility

Не варто забувати:

    prefers-reduced-motion

---

## Помилка 8 — Анімація заради анімації

Animation повинна допомагати користувачу зрозуміти:

    що сталося
    де щось з'явилося
    що змінилося
    що система працює

---

# 110. Практичні вправи

## Вправа 1 — Fade In

Створи:

    @keyframes fade-in

Елемент повинен переходити:

    opacity: 0
        ↓
    opacity: 1

---

## Вправа 2 — Slide In

Створи animation:

    translateY(30px)
        ↓
    translateY(0)

одночасно:

    opacity: 0
        ↓
    opacity: 1

---

## Вправа 3 — Spinner

Створи loader, який:

    rotate(0)
        ↓
    rotate(360deg)

і повторюється:

    infinite

---

## Вправа 4 — Pulse

Створи кнопку або badge:

    scale(1)
        ↓
    scale(1.1)
        ↓
    scale(1)

---

## Вправа 5 — Shake

Створи input з класом:

    .is-invalid

При появі класу input повинен коротко струситися.

---

## Вправа 6 — Bounce

Створи м'яч:

    translateY(0)
        ↓
    translateY(-50px)
        ↓
    translateY(0)

Animation повинна повторюватися.

---

## Вправа 7 — Stagger

Створи список із 5 елементів.

Кожен елемент повинен з'явитися:

    opacity: 0 → 1
    translateY(20px) → 0

із затримкою:

    0ms
    100ms
    200ms
    300ms
    400ms

---

## Вправа 8 — Modal

Створи modal animation:

    opacity: 0 → 1
    scale(0.95) → scale(1)

---

## Вправа 9 — Notification

Створи notification, яка з'являється:

    translateX(30px)
        ↓
    translateX(0)

---

## Вправа 10 — Pause

Створи infinite animation.

При hover:

    animation-play-state: paused;

---

## Вправа 11 — Multiple Animations

Створи елемент, який одночасно:

    fade-in

і:

    move

Спробуй зробити це через дві animations.

---

## Вправа 12 — Wrapper

Створи wrapper для елемента.

Зовнішній елемент:

    translateX

Внутрішній:

    scale

Таким чином уникни конфлікту двох `transform`.

---

## Вправа 13 — Reduced Motion

Додай:

    @media (prefers-reduced-motion: reduce)

і вимкни декоративні animations.

---

# 111. Міні-проект

Створи невелику сторінку:

    Header
    Hero
    Cards
    Features
    Notification
    Loading
    Modal
    Footer

Додай animations:

    Header
        ↓
    slide-down

    Hero
        ↓
    fade + slide

    Cards
        ↓
    stagger

    Button
        ↓
    pulse

    Loader
        ↓
    spin

    Notification
        ↓
    slide-in

    Modal
        ↓
    scale-in

---

# 112. Що потрібно знати на рівні Core

Ти повинен розуміти:

    @keyframes
    from
    to
    0%
    50%
    100%

та:

    animation
    animation-name
    animation-duration
    animation-timing-function
    animation-delay
    animation-iteration-count
    animation-direction
    animation-fill-mode
    animation-play-state

І вміти створити:

    fade
    slide
    scale
    spin

---

# 113. Що потрібно знати на рівні Junior

Junior повинен уміти:

- створювати `@keyframes`;
- використовувати shorthand `animation`;
- створювати loaders;
- створювати fade/slide/scale effects;
- використовувати `infinite`;
- використовувати `forwards`;
- використовувати `alternate`;
- робити stagger;
- використовувати `animation-delay`;
- використовувати `animation-play-state`;
- працювати з `animationend`;
- враховувати `prefers-reduced-motion`;
- розуміти різницю між transition та animation.

---

# 114. Що потрібно знати на рівні Middle

Middle повинен розуміти:

- складні keyframe sequences;
- multiple animations;
- animation composition;
- `steps()`;
- `cubic-bezier()`;
- stagger patterns;
- negative delays;
- performance;
- rendering/compositing;
- accessibility;
- animation architecture;
- motion design;
- interaction choreography.

---

# 115. Що потрібно знати на рівні Senior

Senior повинен розуміти:

- rendering pipeline;
- layout / paint / composite;
- GPU/compositing considerations;
- complex animation systems;
- design-system motion tokens;
- reusable motion patterns;
- reduced-motion architecture;
- animation performance profiling;
- CSS vs JavaScript animation trade-offs;
- scroll-driven animations;
- Web Animations API;
- accessibility;
- UX implications of motion.

---

# 116. Interview Questions

### 1. Що таке CSS Animation?

Механізм автоматичної зміни CSS-властивостей за сценарієм, описаним у `@keyframes`.

### 2. Що таке `@keyframes`?

Правило, яке описує етапи animation.

### 3. Чим `from/to` відрізняються від `0%/100%`?

По суті:

    from = 0%
    to = 100%

### 4. Для чого потрібен `animation-duration`?

Для визначення тривалості одного циклу.

### 5. Що робить `animation-delay`?

Відкладає початок animation.

### 6. Що робить `animation-iteration-count`?

Визначає кількість повторень.

### 7. Що робить `infinite`?

Запускає animation безкінечно.

### 8. Що робить `animation-direction`?

Визначає напрямок відтворення animation.

### 9. Що робить `alternate`?

Чергує:

    forward
    reverse
    forward
    reverse

### 10. Що робить `animation-fill-mode: forwards`?

Зберігає стилі останнього keyframe після завершення animation.

### 11. Для чого `animation-play-state`?

Для:

    running
    paused

### 12. Що таке `steps()`?

Timing function, яка розбиває animation на дискретні кроки.

### 13. Чому `transform` часто використовують для animation?

Тому що він добре підходить для плавних рухів і часто дозволяє уникати непотрібних layout-змін.

### 14. Що робить `animationend`?

Викликається після завершення animation.

### 15. Чим animation відрізняється від transition?

Transition описує перехід між станами, а animation може містити багато keyframes і запускатися без зміни `:hover` або іншого стану.

### 16. Як врахувати accessibility?

Використовувати:

    @media (prefers-reduced-motion: reduce)

---

# 117. Transition vs Animation — коротко

    TRANSITION

    state A
        ↓
    transition
        ↓
    state B

    ANIMATION

    keyframe 0%
        ↓
    keyframe 25%
        ↓
    keyframe 50%
        ↓
    keyframe 75%
        ↓
    keyframe 100%

---

# 118. Ментальна модель Animation

Запам'ятай:

    @keyframes
        ↓
    сценарій

    animation-name
        ↓
    яке правило?

    animation-duration
        ↓
    скільки часу?

    animation-timing-function
        ↓
    як рухається?

    animation-delay
        ↓
    коли почати?

    animation-iteration-count
        ↓
    скільки разів?

    animation-direction
        ↓
    у якому напрямку?

    animation-fill-mode
        ↓
    що робити до/після?

    animation-play-state
        ↓
    running / paused

---

# 119. Найважливіша формула

    @keyframes
        +
    animation
        =
    CSS Animation

Наприклад:

    @keyframes fade-in {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    .element {
        animation:
            fade-in 500ms ease forwards;
    }

---

# 120. Найважливіше запам'ятати

CSS Animation дозволяє описати **цілий сценарій руху**, а не тільки перехід між двома станами.

Основні інструменти:

    @keyframes
    animation-name
    animation-duration
    animation-timing-function
    animation-delay
    animation-iteration-count
    animation-direction
    animation-fill-mode
    animation-play-state
    animation

Найпрактичніші animation:

    fade-in
    slide-in
    scale-in
    spin
    pulse
    bounce
    shake

Для сучасного UI особливо корисно поєднання:

    opacity
    +
    transform

Наприклад:

    @keyframes reveal {
        from {
            opacity: 0;
            transform: translateY(20px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .element {
        animation:
            reveal 500ms ease-out forwards;
    }

---

# 121. Головна ментальна модель

    USER / APP STATE
            ↓
        CSS class
            ↓
        @keyframes
            ↓
        animation
            ↓
    duration + timing
            ↓
      visual movement
            ↓
        UI feedback

Наприклад:

    JavaScript
        ↓
    .is-visible
        ↓
    animation: reveal
        ↓
    opacity: 0 → 1
    translateY(20px) → 0
        ↓
    користувач бачить появу елемента

---

# 122. Підсумок

Після вивчення `09-animations` ти повинен уміти самостійно створювати:

    ✓ Fade In
    ✓ Fade Out
    ✓ Slide In
    ✓ Slide From Left
    ✓ Slide From Right
    ✓ Scale In
    ✓ Spin
    ✓ Pulse
    ✓ Bounce
    ✓ Shake
    ✓ Loading Spinner
    ✓ Skeleton Loading
    ✓ Notification Animation
    ✓ Modal Animation
    ✓ Tooltip Animation
    ✓ Staggered List
    ✓ Infinite Animation
    ✓ Multiple Animations
    ✓ Pause / Resume
    ✓ Animation Events
    ✓ Reduced Motion

І головне:

> **CSS Animation — це спосіб описати послідовність візуальних станів через `@keyframes` і автоматично відтворити цей сценарій.**

Правильне мислення:

    @keyframes
        ↓
    "ЩО повинно відбуватися?"

    animation-duration
        ↓
    "СКІЛЬКИ це триває?"

    animation-timing-function
        ↓
    "ЯК рухається?"

    animation-delay
        ↓
    "КОЛИ починається?"

    iteration-count
        ↓
    "СКІЛЬКИ РАЗІВ?"

    direction
        ↓
    "У ЯКОМУ НАПРЯМКУ?"

    fill-mode
        ↓
    "ЩО ЗАЛИШИТИ після?"

    play-state
        ↓
    "RUNNING чи PAUSED?"

    prefers-reduced-motion
        ↓
    "ЧИ КОМФОРТНО це користувачу?"