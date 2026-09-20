# 02. requestAnimationFrame

`requestAnimationFrame()` — це Browser API для планування виконання callback перед наступним перерисовуванням (repaint) сторінки.

Основне призначення:

- створення плавних JavaScript-анімацій;
- переміщення елементів;
- зміна позиції, розміру або інших властивостей;
- синхронізація JavaScript-анімації з rendering циклом браузера;
- побудова animation loops;
- створення простих canvas-анімацій;
- оптимізація frame-based UI updates.

Основний API:

    requestAnimationFrame()
    cancelAnimationFrame()

---

### Ключові поняття

✔ `requestAnimationFrame()`  
✔ `cancelAnimationFrame()`  
✔ animation frame  
✔ frame  
✔ rendering  
✔ repaint  
✔ browser rendering  
✔ animation loop  
✔ callback  
✔ timestamp  
✔ frame rate  
✔ FPS  
✔ 60 FPS  
✔ 120 FPS  
✔ refresh rate  
✔ VSync  
✔ browser paint  
✔ layout  
✔ compositing  
✔ animation state  
✔ frame ID  
✔ cancellation  
✔ delta time  
✔ elapsed time  
✔ `performance.now()`  
✔ `setTimeout()`  
✔ `setInterval()`  

---

### Що потрібно пам'ятати

• `requestAnimationFrame()` використовується переважно для browser animations.

• Callback виконується перед наступним repaint браузера.

• `requestAnimationFrame()` синхронізований із rendering циклом браузера.

• Callback отримує timestamp.

• `requestAnimationFrame()` повертає ID запланованого frame.

• `cancelAnimationFrame()` скасовує запланований callback.

• Для безперервної анімації `requestAnimationFrame()` потрібно викликати знову всередині callback.

• `requestAnimationFrame()` не потрібно викликати нескінченно безпосередньо — callback має планувати наступний frame.

• `requestAnimationFrame()` зазвичай краще підходить для анімації, ніж `setInterval()`.

• Не потрібно припускати, що кожен frame завжди відбувається рівно кожні 16.67 ms.

• На дисплеї 60 Hz браузер може прагнути до приблизно:

    60 frames / second

• На дисплеї 120 Hz можливе приблизно:

    120 frames / second

• Реальна частота залежить від браузера, пристрою, навантаження та rendering pipeline.

• `requestAnimationFrame()` може бути призупинений або обмежений, коли сторінка неактивна або вкладка знаходиться у background.

• Для правильної швидкості анімації не слід прив'язувати зміну позиції до кількості frame.

• Для frame-independent animation потрібно використовувати timestamp / delta time.

---

# requestAnimationFrame()

Синтаксис:

    requestAnimationFrame(callback);

Наприклад:

    requestAnimationFrame(() => {
        console.log("Frame");
    });

Callback буде запланований для виконання перед наступним repaint.

---

# Простий приклад

    requestAnimationFrame(() => {
        console.log("Animation frame");
    });

Callback виконається один раз.

Це важливо:

    requestAnimationFrame()
        ↓
    one frame

Для наступного frame потрібно знову викликати:

    requestAnimationFrame()

---

# requestAnimationFrame() виконується один раз

Наприклад:

    requestAnimationFrame(() => {
        console.log("Hello");
    });

Результат:

    Hello

Callback не буде автоматично повторюватися.

Для animation loop потрібно:

    requestAnimationFrame()

викликати знову.

---

# Animation Loop

Базовий animation loop:

    function animate() {
        console.log("Frame");

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

Логіка:

    animate()
       ↓
    update
       ↓
    requestAnimationFrame()
       ↓
    animate()
       ↓
    update
       ↓
    requestAnimationFrame()
       ↓
    ...

---

# Animation Loop Structure

Типова модель:

    function animate(timestamp) {
        // update state

        // render

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

Тут:

    update state
        ↓
    render
        ↓
    schedule next frame

---

# Frame

Frame — один цикл оновлення / відображення в animation loop.

Наприклад, якщо браузер працює приблизно на:

    60 FPS

то:

    60 frames ≈ 1 second

Приблизний час одного frame:

    1000 / 60
        ≈
    16.67 ms

Але це не означає, що JavaScript callback гарантовано буде виконуватися кожні 16.67 ms.

---

# FPS

FPS означає:

    Frames Per Second

Наприклад:

    60 FPS
        ↓
    приблизно 60 frames за секунду

    120 FPS
        ↓
    приблизно 120 frames за секунду

Чим вища частота оновлення, тим більше потенційних animation frames може бути доступно.

---

# Refresh Rate

Refresh rate — частота оновлення дисплея.

Наприклад:

    60 Hz
    120 Hz
    144 Hz

Вона пов'язана з кількістю доступних visual frames, але:

    refresh rate
        ≠
    гарантований FPS JavaScript

Браузер може не встигати створювати кожен frame.

---

# requestAnimationFrame та Refresh Rate

На дисплеї 60 Hz браузер може прагнути до:

    ~60 animation frames / second

На дисплеї 120 Hz:

    ~120 animation frames / second

Тому сучасна анімація не повинна бути жорстко прив'язана до:

    16.67 ms

або:

    60 FPS

---

# Timestamp

Callback `requestAnimationFrame()` отримує timestamp.

Наприклад:

    function animate(timestamp) {
        console.log(timestamp);

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

Timestamp можна використовувати для:

    elapsed time
    delta time
    animation progress
    frame-independent movement

---

# Timestamp Example

    function animate(timestamp) {
        console.log(timestamp);

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

При кожному frame timestamp змінюється.

---

# Delta Time

Delta time — час між поточним і попереднім frame.

Наприклад:

    let previousTime = 0;

    function animate(timestamp) {
        const deltaTime = timestamp - previousTime;

        previousTime = timestamp;

        console.log(deltaTime);

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

Спрощено:

    current timestamp
          -
    previous timestamp
          =
    delta time

---

# Чому потрібен delta time

Неправильний підхід:

    position += 5;

на кожному frame.

Тоді швидкість залежатиме від кількості frames.

Наприклад:

    60 FPS
        ↓
    60 updates / second

    120 FPS
        ↓
    120 updates / second

Елемент рухатиметься по-різному на різних refresh rates.

---

# Frame-Independent Animation

Краще прив'язувати рух до часу.

Наприклад:

    const speed = 100; // pixels per second

    let position = 0;
    let previousTime = 0;

    function animate(timestamp) {
        const deltaTime =
            (timestamp - previousTime) / 1000;

        previousTime = timestamp;

        position += speed * deltaTime;

        console.log(position);

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

Тепер:

    speed
        =
    pixels per second

а не:

    pixels per frame

---

# Перший Frame

На першому callback:

    previousTime = 0

тому delta може бути великим.

Часто перший timestamp використовують для initialization.

Наприклад:

    let previousTime = null;

    function animate(timestamp) {
        if (previousTime === null) {
            previousTime = timestamp;
        }

        const deltaTime =
            (timestamp - previousTime) / 1000;

        previousTime = timestamp;

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

---

# Більш простий варіант

Можна використати timestamp першого frame:

    let previousTime;

    function animate(timestamp) {
        if (previousTime === undefined) {
            previousTime = timestamp;
        }

        const deltaTime =
            (timestamp - previousTime) / 1000;

        previousTime = timestamp;

        // update

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

---

# cancelAnimationFrame()

`cancelAnimationFrame()` скасовує запланований animation frame.

Синтаксис:

    const frameId =
        requestAnimationFrame(callback);

    cancelAnimationFrame(frameId);

---

# Animation Frame ID

`requestAnimationFrame()` повертає ID.

Наприклад:

    const frameId =
        requestAnimationFrame(() => {
            console.log("Frame");
        });

Після цього можна:

    cancelAnimationFrame(frameId);

---

# Cancel Frame

    const frameId =
        requestAnimationFrame(() => {
            console.log("Hello");
        });

    cancelAnimationFrame(frameId);

Callback не буде виконаний цим запланованим frame.

---

# Stop Animation Loop

Для animation loop потрібно зберігати ID наступного frame.

Наприклад:

    let frameId;

    function animate() {
        console.log("Frame");

        frameId = requestAnimationFrame(animate);
    }

    frameId = requestAnimationFrame(animate);

Щоб зупинити:

    cancelAnimationFrame(frameId);

---

# Start / Stop Animation

Типовий патерн:

    let frameId = null;

    function animate(timestamp) {
        // animation logic

        frameId = requestAnimationFrame(animate);
    }

    function start() {
        if (frameId !== null) {
            return;
        }

        frameId = requestAnimationFrame(animate);
    }

    function stop() {
        cancelAnimationFrame(frameId);
        frameId = null;
    }

---

# Чому потрібно перевіряти frameId

Без перевірки можна випадково створити декілька animation loops.

Наприклад:

    function start() {
        requestAnimationFrame(animate);
    }

Якщо викликати:

    start();
    start();
    start();

можуть виникнути декілька loops.

Краще:

    let frameId = null;

    function start() {
        if (frameId !== null) {
            return;
        }

        frameId = requestAnimationFrame(animate);
    }

---

# Reset Animation

Animation можна перезапустити:

    function restart() {
        stop();

        // reset state

        start();
    }

Наприклад:

    let position = 0;
    let frameId = null;

    function animate(timestamp) {
        position += 1;

        frameId = requestAnimationFrame(animate);
    }

    function start() {
        if (frameId !== null) {
            return;
        }

        frameId = requestAnimationFrame(animate);
    }

    function stop() {
        cancelAnimationFrame(frameId);
        frameId = null;
    }

    function restart() {
        stop();

        position = 0;

        start();
    }

---

# DOM Animation

`requestAnimationFrame()` часто використовується для зміни DOM.

Наприклад:

    const box = document.querySelector(".box");

    let position = 0;

    function animate() {
        position += 1;

        box.style.transform =
            `translateX(${position}px)`;

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

Елемент буде рухатися вправо.

---

# DOM Animation з transform

Для простих переміщень краще часто використовувати:

    transform

Наприклад:

    box.style.transform =
        `translateX(${position}px)`;

Замість постійної зміни:

    left
    top

у багатьох випадках `transform` краще підходить для плавних visual animations.

---

# Animation Example

    const box = document.querySelector(".box");

    let position = 0;

    function animate() {
        position += 2;

        box.style.transform =
            `translateX(${position}px)`;

        if (position < 500) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);

Анімація завершиться після приблизно:

    500 px

---

# Animation з timestamp

    const box = document.querySelector(".box");

    const speed = 200;

    let position = 0;
    let previousTime;

    function animate(timestamp) {
        if (previousTime === undefined) {
            previousTime = timestamp;
        }

        const deltaTime =
            (timestamp - previousTime) / 1000;

        previousTime = timestamp;

        position += speed * deltaTime;

        box.style.transform =
            `translateX(${position}px)`;

        if (position < 500) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);

Тут:

    speed = 200 px / second

а не:

    200 px / frame

---

# Animation Progress

Для animation від:

    0
    ↓
    1

можна використовувати progress.

Наприклад:

    const duration = 2000;

    let startTime;

    function animate(timestamp) {
        if (startTime === undefined) {
            startTime = timestamp;
        }

        const elapsed =
            timestamp - startTime;

        const progress =
            Math.min(elapsed / duration, 1);

        console.log(progress);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);

Значення:

    0 → start
    1 → end

---

# Progress Example

Якщо animation триває:

    2000 ms

то:

    elapsed = 0
        → progress = 0

    elapsed = 1000
        → progress = 0.5

    elapsed = 2000
        → progress = 1

---

# Linear Animation

Наприклад, потрібно перемістити елемент:

    from = 0
    to = 500

Можна використати:

    const position =
        from + (to - from) * progress;

Повний приклад:

    const box = document.querySelector(".box");

    const from = 0;
    const to = 500;
    const duration = 2000;

    let startTime;

    function animate(timestamp) {
        if (startTime === undefined) {
            startTime = timestamp;
        }

        const elapsed =
            timestamp - startTime;

        const progress =
            Math.min(elapsed / duration, 1);

        const position =
            from + (to - from) * progress;

        box.style.transform =
            `translateX(${position}px)`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);

---

# Easing

Linear animation має рівномірну швидкість.

Але UI-анімації часто використовують easing:

    ease-in
    ease-out
    ease-in-out

Наприклад:

    const easedProgress =
        progress * progress;

Це простий приклад easing.

У CSS easing зазвичай простіше реалізовувати через:

    transition
    animation
    cubic-bezier()

JavaScript `requestAnimationFrame()` потрібен, коли animation behavior потрібно контролювати програмно.

---

# requestAnimationFrame та CSS Animation

Для стандартних UI-анімацій часто достатньо CSS:

    transition

або:

    animation

JavaScript `requestAnimationFrame()` потрібен, коли стан анімації залежить від JavaScript logic.

Наприклад:

    game loop
    canvas
    physics
    interactive animation
    scroll-driven custom effects
    dynamic calculations

---

# CSS vs requestAnimationFrame

CSS:

    transition
    animation

Добре підходить для:

    visual UI animations
    hover effects
    fades
    transforms
    simple state transitions

`requestAnimationFrame()`:

    JavaScript-controlled animation

Добре підходить для:

    dynamic movement
    canvas
    games
    physics
    complex interactive effects

Не потрібно використовувати JavaScript animation лише тому, що це можливо.

---

# requestAnimationFrame vs setTimeout

`setTimeout()`:

    setTimeout(fn, delay);

Основна ідея:

    execute after delay

`requestAnimationFrame()`:

    requestAnimationFrame(fn);

Основна ідея:

    execute before next browser repaint

Тому:

    setTimeout()
        → scheduling by time

    requestAnimationFrame()
        → scheduling by rendering frame

---

# requestAnimationFrame vs setInterval

`setInterval()`:

    setInterval(fn, 1000);

Підходить для:

    repeated timed operations

`requestAnimationFrame()`:

    requestAnimationFrame(fn);

Підходить для:

    frame-based animation

Для animation краще використовувати animation frame, а не намагатися імітувати його через:

    setInterval(fn, 16);

---

# Чому setInterval(..., 16) не є заміною

Можна написати:

    setInterval(animate, 16);

Але це не синхронізує animation із browser rendering.

Краще:

    requestAnimationFrame(animate);

Браузер може краще узгодити callback із власним rendering cycle.

---

# requestAnimationFrame та Repaint

Спрощено:

    JavaScript
        ↓
    requestAnimationFrame()
        ↓
    callback
        ↓
    browser rendering
        ↓
    paint / compositing

Тому `requestAnimationFrame()` призначений саме для роботи, пов'язаної з наступним visual update.

---

# Layout та Paint

Під час роботи браузера можуть відбуватися:

    JavaScript
       ↓
    Style
       ↓
    Layout
       ↓
    Paint
       ↓
    Composite

Конкретний rendering pipeline складніший і може відрізнятися залежно від браузера та змін.

Для практичного рівня достатньо пам'ятати:

    JS update
       ↓
    browser rendering
       ↓
    visual result

---

# Layout Thrashing

Проблемою може бути постійне чергування:

    read layout
        ↓
    write style
        ↓
    read layout
        ↓
    write style

Наприклад:

    element.style.width = "100px";

    console.log(element.offsetWidth);

    element.style.width = "200px";

    console.log(element.offsetWidth);

Часті layout reads після style writes можуть призводити до зайвої роботи браузера.

Для складної оптимізації rendering важливо розуміти:

    layout
    paint
    compositing

---

# Transform та Animation

Для visual movement часто використовують:

    transform

Наприклад:

    element.style.transform =
        "translateX(100px)";

Анімація через transform часто є кращим варіантом, ніж постійна зміна layout-властивостей.

---

# requestAnimationFrame та Canvas

`requestAnimationFrame()` дуже часто використовується разом із:

    <canvas>

Наприклад:

    const canvas =
        document.querySelector("canvas");

    const ctx = canvas.getContext("2d");

    let x = 0;

    function animate() {
        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.fillRect(x, 50, 50, 50);

        x += 2;

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

Це базова модель canvas animation loop.

---

# Canvas Animation Loop

Типова структура:

    function animate(timestamp) {
        clearCanvas();

        updateState(timestamp);

        draw();

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

Тобто:

    clear
      ↓
    update
      ↓
    draw
      ↓
    next frame

---

# Game Loop

У простих браузерних іграх animation loop може мати структуру:

    function gameLoop(timestamp) {
        update(timestamp);

        render();

        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);

Де:

    update()
        ↓
    змінює game state

    render()
        ↓
    відображає state

---

# requestAnimationFrame та Visibility

Браузери можуть зменшувати або призупиняти animation callbacks для background tabs.

Тому не потрібно покладатися на:

    requestAnimationFrame()

як на постійний clock.

Для часу гри, countdown або elapsed time потрібно використовувати timestamp або інше джерело часу.

---

# Background Tab

Наприклад:

    requestAnimationFrame(animate);

Коли користувач перемикається на іншу вкладку, browser може:

    reduce callbacks
    pause callbacks
    throttle work

Це робиться для економії:

    CPU
    battery
    resources

Тому animation loop має бути готовим до великих проміжків між frames.

---

# Delta Time та Background Tab

Якщо animation використовує:

    deltaTime

після повернення вкладки delta може бути дуже великим.

Наприклад:

    previous frame
        ↓
    tab inactive
        ↓
    several seconds
        ↓
    next frame

Тому іноді delta потрібно обмежувати.

Наприклад:

    const maxDelta = 0.1;

    const deltaTime =
        Math.min(
            (timestamp - previousTime) / 1000,
            maxDelta
        );

Це особливо корисно для:

    games
    physics
    simulations

---

# Animation Cancellation

Зупинка animation:

    let frameId;

    function animate() {
        // update

        frameId =
            requestAnimationFrame(animate);
    }

    frameId =
        requestAnimationFrame(animate);

    function stop() {
        cancelAnimationFrame(frameId);
    }

---

# Cleanup

Якщо animation більше не потрібна:

    cancelAnimationFrame(frameId);

Це особливо важливо для:

    components
    pages
    modals
    canvases
    interactive UI

---

# Component Cleanup

У framework-компонентах animation loop потрібно зупиняти, коли component більше не використовується.

Спрощено:

    let frameId;

    function start() {
        frameId =
            requestAnimationFrame(animate);
    }

    function cleanup() {
        cancelAnimationFrame(frameId);
    }

Ідея:

    mount
      ↓
    start animation
      ↓
    update frames
      ↓
    unmount
      ↓
    cancel animation

У React / Next.js конкретний cleanup залежить від lifecycle / effect logic.

---

# requestAnimationFrame та React

У React `requestAnimationFrame()` може використовуватися для animation logic, але потрібно уважно контролювати:

    effects
    refs
    cleanup
    state updates

Для високочастотної animation logic часто краще зберігати mutable animation state у:

    useRef()

а не викликати React state update на кожному frame без необхідності.

---

# Не оновлювати React state без потреби

Необов'язково робити:

    setPosition(position);

на кожному animation frame.

Це може спричиняти багато React renders.

Для DOM animation часто можна використовувати:

    ref.current.style.transform = ...

А React state залишити для:

    start / stop
    UI state
    configuration

---

# Simple DOM Animation Pattern

    const box = document.querySelector(".box");

    let frameId;
    let position = 0;

    function animate() {
        position += 2;

        box.style.transform =
            `translateX(${position}px)`;

        if (position < 500) {
            frameId =
                requestAnimationFrame(animate);
        }
    }

    frameId =
        requestAnimationFrame(animate);

---

# Animation with Start and Stop

    const box = document.querySelector(".box");

    let frameId = null;
    let position = 0;

    function animate() {
        position += 2;

        box.style.transform =
            `translateX(${position}px)`;

        frameId =
            requestAnimationFrame(animate);
    }

    function start() {
        if (frameId !== null) {
            return;
        }

        frameId =
            requestAnimationFrame(animate);
    }

    function stop() {
        cancelAnimationFrame(frameId);
        frameId = null;
    }

---

# Pause and Resume

Для pause / resume потрібно зберігати animation state.

Наприклад:

    let frameId = null;
    let position = 0;

    function animate() {
        position += 2;

        box.style.transform =
            `translateX(${position}px)`;

        frameId =
            requestAnimationFrame(animate);
    }

    function pause() {
        cancelAnimationFrame(frameId);
        frameId = null;
    }

    function resume() {
        if (frameId !== null) {
            return;
        }

        frameId =
            requestAnimationFrame(animate);
    }

Тут:

    position

не скидається при pause.

---

# Pause з timestamp

Якщо animation залежить від часу, pause / resume потребує додаткової логіки.

Не можна просто продовжити старий:

    previousTime

без урахування паузи.

Наприклад, після pause потрібно переініціалізувати:

    previousTime

щоб великий проміжок не сприймався як animation delta.

---

# Time-Based Animation

Типовий підхід:

    const duration = 1000;

    let startTime;

    function animate(timestamp) {
        if (startTime === undefined) {
            startTime = timestamp;
        }

        const elapsed =
            timestamp - startTime;

        const progress =
            Math.min(elapsed / duration, 1);

        update(progress);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);

Це дуже важливий animation pattern.

---

# Animation From 0 to 1

Модель:

    start
      ↓
    progress = 0
      ↓
    progress = 0.25
      ↓
    progress = 0.5
      ↓
    progress = 0.75
      ↓
    progress = 1
      ↓
    end

Потім progress можна перетворити на:

    position
    opacity
    scale
    rotation
    color
    any numeric value

---

# Interpolation

Linear interpolation:

    value =
        from + (to - from) * progress;

Наприклад:

    const from = 100;
    const to = 500;
    const progress = 0.5;

    const value =
        from + (to - from) * progress;

Результат:

    300

---

# Opacity Animation

Наприклад:

    const element =
        document.querySelector(".box");

    const duration = 1000;

    let startTime;

    function animate(timestamp) {
        if (startTime === undefined) {
            startTime = timestamp;
        }

        const elapsed =
            timestamp - startTime;

        const progress =
            Math.min(elapsed / duration, 1);

        element.style.opacity =
            String(1 - progress);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);

Елемент поступово переходить:

    opacity: 1
        ↓
    opacity: 0

---

# Scale Animation

    const from = 1;
    const to = 1.5;

    const scale =
        from + (to - from) * progress;

    element.style.transform =
        `scale(${scale})`;

---

# Rotation Animation

    const from = 0;
    const to = 360;

    const rotation =
        from + (to - from) * progress;

    element.style.transform =
        `rotate(${rotation}deg)`;

---

# Multiple Properties

Один animation loop може змінювати декілька властивостей.

Наприклад:

    element.style.transform =
        `translateX(${x}px) scale(${scale})`;

    element.style.opacity =
        String(opacity);

Важливо не створювати окремий animation loop для кожної властивості без необхідності.

---

# requestAnimationFrame та Performance

Animation callback має бути коротким.

На кожному frame браузер має обмежений час для роботи.

Приблизно для 60 FPS:

    1000 ms / 60
        ≈
    16.67 ms

Цей час включає не лише JavaScript.

Також потрібні ресурси для:

    style calculation
    layout
    paint
    compositing

Тому не слід виконувати важкі операції в animation loop.

---

# Heavy Work

Погано:

    function animate() {
        // expensive calculation

        // huge DOM operation

        // large array processing

        requestAnimationFrame(animate);
    }

Якщо callback займає занадто багато часу:

    FPS ↓
    animation becomes less smooth
    frames may be dropped

---

# Dropped Frames

Якщо браузер не встигає підготувати frame вчасно:

    frame missed

Це може призвести до:

    stuttering
    jank
    visual lag

Тому animation code має бути максимально ефективним.

---

# Jank

Jank — помітна нерівномірність або ривки в анімації.

Причини можуть включати:

    long JavaScript tasks
    forced layout
    excessive DOM updates
    expensive calculations
    rendering overload
    garbage collection

---

# requestAnimationFrame та Layout

Для плавної анімації важливо:

    read
    ↓
    calculate
    ↓
    write

а не безконтрольно чергувати:

    write
    ↓
    read
    ↓
    write
    ↓
    read

У складних випадках це може призвести до forced synchronous layout.

---

# Animation Architecture

Корисна модель:

    Input
      ↓
    Animation State
      ↓
    requestAnimationFrame
      ↓
    Update
      ↓
    Render
      ↓
    Browser Paint

Наприклад:

    user drags element
        ↓
    update target position
        ↓
    requestAnimationFrame
        ↓
    apply transform
        ↓
    browser renders

---

# requestAnimationFrame та Scroll

`requestAnimationFrame()` може використовуватися для custom scroll-driven effects.

Наприклад:

    let latestScrollY = 0;
    let frameId = null;

    window.addEventListener("scroll", () => {
        latestScrollY = window.scrollY;

        if (frameId === null) {
            frameId =
                requestAnimationFrame(() => {
                    update(latestScrollY);

                    frameId = null;
                });
        }
    });

Ідея:

    many scroll events
          ↓
    one visual update per frame

Для більш спеціалізованого throttling та оптимізації існують інші підходи.

---

# requestAnimationFrame та Input

Для високочастотних input events:

    mousemove
    pointermove
    scroll

можна накопичувати останній стан, а DOM оновлювати через:

    requestAnimationFrame()

Наприклад:

    let x = 0;
    let frameId = null;

    element.addEventListener("pointermove", event => {
        x = event.clientX;

        if (frameId === null) {
            frameId =
                requestAnimationFrame(() => {
                    element.style.transform =
                        `translateX(${x}px)`;

                    frameId = null;
                });
        }
    });

Це дозволяє узгодити visual update із frame rendering.

---

# requestAnimationFrame як Visual Scheduler

Корисно думати про нього як:

    "онови UI на найближчому доступному animation frame"

а не:

    "запусти функцію через N мілісекунд"

Це одна з головних відмінностей від:

    setTimeout()
    setInterval()

---

# requestAnimationFrame та setTimeout — приклад

### setTimeout

    setTimeout(() => {
        element.style.transform =
            "translateX(100px)";
    }, 1000);

Ідея:

    wait 1000 ms
        ↓
    callback

---

### requestAnimationFrame

    requestAnimationFrame(() => {
        element.style.transform =
            "translateX(100px)";
    });

Ідея:

    next animation frame
        ↓
    callback
        ↓
    rendering

---

# requestAnimationFrame та setInterval — приклад

### setInterval

    setInterval(() => {
        position += 2;
    }, 16);

Проблема:

    16 ms
        ≠
    guaranteed browser frame

---

### requestAnimationFrame

    function animate() {
        position += 2;

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

Браузер сам узгоджує callback із animation frames.

Але для правильної швидкості потрібно враховувати:

    timestamp
    deltaTime

---

# Типові помилки

❌ Використовувати `setInterval(fn, 16)` замість `requestAnimationFrame()` для animation.

Для frame-based animation краще:

    requestAnimationFrame()

---

❌ Вважати, що `requestAnimationFrame()` автоматично повторюється.

Ні.

    requestAnimationFrame(callback);

викликає callback для одного animation frame.

Для loop:

    function animate() {
        requestAnimationFrame(animate);
    }

---

❌ Забувати `cancelAnimationFrame()`.

Якщо animation більше не потрібна:

    cancelAnimationFrame(frameId);

---

❌ Створювати декілька animation loops.

Наприклад:

    function start() {
        requestAnimationFrame(animate);
    }

Багато викликів:

    start();
    start();
    start();

можуть створити кілька loops.

---

❌ Прив'язувати швидкість до кількості frames.

Неправильно:

    position += 5;

Правильніше для time-based movement:

    position += speed * deltaTime;

---

❌ Вважати 60 FPS гарантованим.

Не слід припускати:

    one frame = 16.67 ms

Реальна частота залежить від:

    refresh rate
    browser
    device
    CPU/GPU load
    rendering work

---

❌ Виконувати важкі операції в animation loop.

    function animate() {
        // expensive work
        requestAnimationFrame(animate);
    }

Це може створювати:

    jank
    dropped frames
    low FPS

---

❌ Використовувати `requestAnimationFrame()` як timer.

Для delayed action:

    setTimeout()

Для repeated timed operation:

    setInterval()

Для animation:

    requestAnimationFrame()

---

❌ Ігнорувати background tab behavior.

Animation може бути:

    paused
    throttled
    reduced

тому не можна покладатися на постійну частоту callback.

---

❌ Робити React state update на кожному frame без необхідності.

Наприклад:

    setPosition(position);

може спричиняти багато renders.

Для high-frequency mutable animation state часто краще:

    useRef()

і пряме оновлення visual property.

---

# Типовий Animation Pattern

    let frameId = null;

    function animate(timestamp) {
        update(timestamp);

        render();

        frameId =
            requestAnimationFrame(animate);
    }

    function start() {
        if (frameId !== null) {
            return;
        }

        frameId =
            requestAnimationFrame(animate);
    }

    function stop() {
        cancelAnimationFrame(frameId);
        frameId = null;
    }

---

# Типовий Time-Based Pattern

    let startTime;

    function animate(timestamp) {
        if (startTime === undefined) {
            startTime = timestamp;
        }

        const elapsed =
            timestamp - startTime;

        const progress =
            Math.min(elapsed / duration, 1);

        update(progress);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);

---

# Типовий Delta-Time Pattern

    let previousTime;

    function animate(timestamp) {
        if (previousTime === undefined) {
            previousTime = timestamp;
        }

        const deltaTime =
            (timestamp - previousTime) / 1000;

        previousTime = timestamp;

        update(deltaTime);

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

---

# Practical Examples

### Приклад 1 — один animation frame

    requestAnimationFrame(() => {
        console.log("Frame");
    });

---

### Приклад 2 — animation loop

    function animate() {
        console.log("Frame");

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

---

### Приклад 3 — cancel frame

    const frameId =
        requestAnimationFrame(() => {
            console.log("Frame");
        });

    cancelAnimationFrame(frameId);

---

### Приклад 4 — рух елемента

    const box = document.querySelector(".box");

    let x = 0;

    function animate() {
        x += 2;

        box.style.transform =
            `translateX(${x}px)`;

        if (x < 500) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);

---

### Приклад 5 — animation з timestamp

    const box = document.querySelector(".box");

    const speed = 100;

    let x = 0;
    let previousTime;

    function animate(timestamp) {
        if (previousTime === undefined) {
            previousTime = timestamp;
        }

        const deltaTime =
            (timestamp - previousTime) / 1000;

        previousTime = timestamp;

        x += speed * deltaTime;

        box.style.transform =
            `translateX(${x}px)`;

        if (x < 500) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);

---

### Приклад 6 — animation progress

    const duration = 2000;

    let startTime;

    function animate(timestamp) {
        if (startTime === undefined) {
            startTime = timestamp;
        }

        const elapsed =
            timestamp - startTime;

        const progress =
            Math.min(elapsed / duration, 1);

        console.log(progress);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);

---

### Приклад 7 — opacity

    const element =
        document.querySelector(".box");

    const duration = 1000;

    let startTime;

    function animate(timestamp) {
        if (startTime === undefined) {
            startTime = timestamp;
        }

        const progress =
            Math.min(
                (timestamp - startTime) / duration,
                1
            );

        element.style.opacity =
            String(1 - progress);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);

---

### Приклад 8 — scale

    const element =
        document.querySelector(".box");

    const duration = 1000;

    let startTime;

    function animate(timestamp) {
        if (startTime === undefined) {
            startTime = timestamp;
        }

        const progress =
            Math.min(
                (timestamp - startTime) / duration,
                1
            );

        const scale =
            1 + 0.5 * progress;

        element.style.transform =
            `scale(${scale})`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);

---

### Приклад 9 — start / stop

    let frameId = null;

    function animate() {
        console.log("Running");

        frameId =
            requestAnimationFrame(animate);
    }

    function start() {
        if (frameId !== null) {
            return;
        }

        frameId =
            requestAnimationFrame(animate);
    }

    function stop() {
        cancelAnimationFrame(frameId);
        frameId = null;
    }

---

### Приклад 10 — canvas

    const canvas =
        document.querySelector("canvas");

    const ctx =
        canvas.getContext("2d");

    let x = 0;

    function animate() {
        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.fillRect(x, 50, 50, 50);

        x += 2;

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

---

### Приклад 11 — scroll update

    let scrollY = 0;
    let frameId = null;

    window.addEventListener("scroll", () => {
        scrollY = window.scrollY;

        if (frameId !== null) {
            return;
        }

        frameId =
            requestAnimationFrame(() => {
                console.log(scrollY);

                frameId = null;
            });
    });

---

### Приклад 12 — pause / resume

    let frameId = null;
    let x = 0;

    function animate() {
        x += 2;

        box.style.transform =
            `translateX(${x}px)`;

        frameId =
            requestAnimationFrame(animate);
    }

    function start() {
        if (frameId !== null) {
            return;
        }

        frameId =
            requestAnimationFrame(animate);
    }

    function stop() {
        cancelAnimationFrame(frameId);
        frameId = null;
    }

---

# Питання зі співбесіди

Що таке `requestAnimationFrame()`?

Для чого використовується `requestAnimationFrame()`?

Чим `requestAnimationFrame()` відрізняється від `setTimeout()`?

Чим `requestAnimationFrame()` відрізняється від `setInterval()`?

Чому для animation краще використовувати `requestAnimationFrame()`?

Чи виконується `requestAnimationFrame()` один раз чи багато разів?

Як створити animation loop?

Що робить `cancelAnimationFrame()`?

Що повертає `requestAnimationFrame()`?

Що таке animation frame?

Що таке FPS?

Що означає 60 FPS?

Що таке refresh rate?

Чи гарантує 60 Hz виконання callback кожні 16.67 ms?

Що таке timestamp у `requestAnimationFrame()`?

Для чого потрібен timestamp?

Що таке delta time?

Чому animation не повинна залежати від кількості frames?

Що означає frame-independent animation?

Як зробити рух елемента незалежним від FPS?

Як розрахувати delta time?

Як створити countdown / progress animation через `requestAnimationFrame()`?

Як зупинити animation loop?

Як уникнути створення декількох animation loops?

Що таке animation cancellation?

Чому важливо робити cleanup?

Що відбувається з `requestAnimationFrame()` у background tab?

Чому animation може працювати по-різному на 60 Hz та 120 Hz?

Чому `setInterval(fn, 16)` не є повноцінною заміною `requestAnimationFrame()`?

Що таке jank?

Що таке dropped frames?

Чому важкий JavaScript-код погіршує animation performance?

Чому `transform` часто використовують для animation?

Що таке layout?

Що таке paint?

Що таке compositing?

Що таке layout thrashing?

Як `requestAnimationFrame()` використовується з Canvas?

Як створити простий game loop?

Як використовувати `requestAnimationFrame()` у React?

Чому `useRef()` може бути корисним для animation state?

Коли краще використовувати CSS animation замість JavaScript?

Коли `requestAnimationFrame()` є кращим вибором за CSS?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке `requestAnimationFrame()`.

Що таке animation frame.

Що таке callback.

Базовий animation loop.

`cancelAnimationFrame()`.

Frame ID.

Основи FPS.

Основи refresh rate.

Розуміння 60 FPS.

Розуміння, що frame rate не є гарантованим.

Timestamp.

Основи delta time.

Розуміння:

    requestAnimationFrame()
        →
    browser rendering

Різниця:

    setTimeout()
    setInterval()
    requestAnimationFrame()

---

🔵 Junior

Вміти створювати:

    animation loop
    start / stop
    pause / resume
    DOM animation
    transform animation
    progress animation
    opacity animation
    scale animation

Розуміти:

    timestamp
    delta time
    elapsed time
    FPS
    refresh rate
    frame-independent animation

Вміти:

    cancel animation
    cleanup animation
    prevent duplicate loops

Розуміти, чому:

    setInterval(fn, 16)

не є правильною заміною:

    requestAnimationFrame(fn)

Знати базове використання:

    Date.now()
    performance.now()

для time-based задач.

---

🟠 Middle

Глибше розуміти:

    browser rendering
    layout
    paint
    compositing
    animation frames

Уміти будувати:

    smooth DOM animations
    canvas animations
    game loops
    interactive animations
    scroll-driven animations
    pointer-driven animations

Розуміти:

    dropped frames
    jank
    long tasks
    layout thrashing
    forced synchronous layout

Оптимізувати:

    DOM writes
    DOM reads
    transform animations
    animation state
    frame scheduling

Розуміти:

    background tabs
    throttling
    visibility
    large deltaTime

Вміти вибирати між:

    CSS animation
    CSS transition
    requestAnimationFrame()
    setTimeout()
    setInterval()

---

🔴 Senior

Глибоке розуміння:

    browser rendering pipeline
    event loop
    task scheduling
    rendering opportunities
    compositing
    frame budget

Розуміння взаємодії:

    JavaScript
    style calculation
    layout
    paint
    compositing
    GPU

Оптимізація:

    frame budget
    long tasks
    layout thrashing
    forced reflow
    rendering performance

Розуміння:

    refresh rate
    VSync
    60 Hz
    120 Hz
    variable refresh rate

Розробка:

    animation engines
    game loops
    physics loops
    interpolation
    easing
    time-based animation
    frame-independent simulation

Глибоке розуміння:

    requestAnimationFrame
    event loop
    microtasks
    tasks
    rendering pipeline

---

# Міні-шпаргалка

## requestAnimationFrame

    requestAnimationFrame(callback);

    → schedule callback
      for the next animation frame

---

## cancelAnimationFrame

    const frameId =
        requestAnimationFrame(callback);

    cancelAnimationFrame(frameId);

    → cancel scheduled frame

---

## Animation Loop

    function animate(timestamp) {
        update(timestamp);

        render();

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

---

## Frame ID

    const frameId =
        requestAnimationFrame(animate);

    cancelAnimationFrame(frameId);

---

## Timestamp

    function animate(timestamp) {
        console.log(timestamp);

        requestAnimationFrame(animate);
    }

---

## Delta Time

    const deltaTime =
        (timestamp - previousTime) / 1000;

    → seconds since previous frame

---

## Time-Based Movement

    position += speed * deltaTime;

    → pixels per second

а не:

    position += 5;

    → pixels per frame

---

## Progress

    const progress =
        Math.min(elapsed / duration, 1);

    → 0 ... 1

---

## Interpolation

    const value =
        from + (to - from) * progress;

---

## Transform

    element.style.transform =
        `translateX(${x}px)`;

---

## Start / Stop

    let frameId = null;

    function start() {
        if (frameId !== null) {
            return;
        }

        frameId =
            requestAnimationFrame(animate);
    }

    function stop() {
        cancelAnimationFrame(frameId);
        frameId = null;
    }

---

## 60 FPS

    60 FPS
        ≈
    60 frames / second

Приблизно:

    1000 / 60
        ≈
    16.67 ms

Але це не гарантія.

---

## 120 FPS

    120 FPS
        ≈
    120 frames / second

Приблизно:

    1000 / 120
        ≈
    8.33 ms

Але реальна частота залежить від:

    device
    browser
    workload
    refresh rate

---

## requestAnimationFrame vs setTimeout

    setTimeout()
        → time-based scheduling

    requestAnimationFrame()
        → rendering-frame scheduling

---

## requestAnimationFrame vs setInterval

    setInterval()
        → repeated timed callback

    requestAnimationFrame()
        → frame-based animation callback

---

## Animation Flow

    requestAnimationFrame()
             ↓
        callback
             ↓
         update
             ↓
         render
             ↓
      next frame
             ↓
    requestAnimationFrame()

---

## Browser Rendering

    JavaScript
        ↓
    Style
        ↓
    Layout
        ↓
    Paint
        ↓
    Composite

Спрощена модель.

---

## Animation State

    input
      ↓
    state
      ↓
    update
      ↓
    render
      ↓
    next frame

---

## Основні правила

    requestAnimationFrame()
        → animation frames

    cancelAnimationFrame()
        → cancel frame

    timestamp
        → time information

    deltaTime
        → time between frames

    progress
        → 0 ... 1

    transform
        → common animation property

    setTimeout()
        → delayed action

    setInterval()
        → repeated timed action

---

# Головне:

• `requestAnimationFrame()` — Browser API для frame-based animation.

• Він дозволяє синхронізувати JavaScript animation logic із browser rendering.

• `requestAnimationFrame()` виконує callback для одного animation frame.

• Для animation loop callback має знову викликати:

    requestAnimationFrame()

• `requestAnimationFrame()` повертає frame ID.

• Запланований frame можна скасувати:

    cancelAnimationFrame(frameId)

• Callback отримує timestamp.

• Timestamp можна використовувати для:

    elapsed time
    delta time
    animation progress

• Не слід прив'язувати швидкість animation до кількості frames.

Погано:

    position += 5;

Краще:

    position += speed * deltaTime;

• Так animation стає більш незалежною від FPS.

• 60 FPS означає приблизно:

    60 frames / second

• Для 60 FPS один frame має приблизний бюджет:

    16.67 ms

але це не означає, що JavaScript callback гарантовано отримує всі 16.67 ms.

• На 120 Hz потенційний frame interval приблизно:

    8.33 ms

• `requestAnimationFrame()` не є точним timer.

• Не слід використовувати його для вимірювання часу замість timestamp або спеціалізованих time APIs.

• Для delayed action краще:

    setTimeout()

• Для periodic operation краще:

    setInterval()

• Для frame-based animation краще:

    requestAnimationFrame()

• `setInterval(fn, 16)` не є повноцінною заміною `requestAnimationFrame()`.

• Browser може throttle або pause animation callbacks у background tabs.

• Animation loop повинен правильно працювати після великих проміжків між frames.

• Важкий код у animation loop може спричинити:

    dropped frames
    jank
    low FPS

• На кожному frame потрібно уникати зайвої роботи.

• Для DOM animation часто використовують:

    transform
    opacity

• `requestAnimationFrame()` особливо корисний для:

    DOM animation
    Canvas
    games
    physics
    interactive effects
    scroll-driven effects

• CSS `transition` та `animation` часто є кращими для простих UI-анімацій.

• JavaScript `requestAnimationFrame()` потрібен тоді, коли animation behavior потребує програмного контролю.

• Типова animation architecture:

    update state
        ↓
    render
        ↓
    request next frame

• Типовий time-based animation pattern:

    timestamp
        ↓
    elapsed
        ↓
    progress
        ↓
    interpolation
        ↓
    render

• Типовий delta-time pattern:

    current timestamp
          -
    previous timestamp
          =
    delta time

• Основна ідея:

    setTimeout()
        → "коли мине час"

    setInterval()
        → "повторюй через інтервал"

    requestAnimationFrame()
        → "онови на наступному animation frame"

• Наступна тема:

    03-debounce

де `setTimeout()` буде використаний для контролю частоти виконання callback після подій користувача.