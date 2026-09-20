# 01. setTimeout та setInterval

`setTimeout()` та `setInterval()` — це Browser APIs, які дозволяють виконувати JavaScript-код із часовою затримкою або повторювати його через певний інтервал.

Вони використовуються, коли потрібно:

- виконати код через певний час;
- виконати код один раз із затримкою;
- повторювати дію через певний інтервал;
- створити countdown;
- створити простий timer;
- оновлювати UI через певний час;
- запускати відкладені операції;
- зупиняти заплановані операції;
- керувати простими часовими сценаріями в браузері.

Основні API:

    setTimeout()
    clearTimeout()

    setInterval()
    clearInterval()

Важливо:

`setTimeout()` та `setInterval()` **не блокують JavaScript-потік**.

Вони реєструють callback для виконання в майбутньому.

---

### Ключові поняття

✔ timer  
✔ delay  
✔ timeout  
✔ interval  
✔ callback  
✔ `setTimeout()`  
✔ `clearTimeout()`  
✔ `setInterval()`  
✔ `clearInterval()`  
✔ timer ID  
✔ asynchronous behavior  
✔ event loop  
✔ task / macrotask  
✔ callback queue  
✔ minimum delay  
✔ nested timers  
✔ recursive `setTimeout()`  
✔ countdown  
✔ cancellation  
✔ scheduling  

---

### Що потрібно пам'ятати

• `setTimeout()` запускає callback **один раз** після затримки.

• `setInterval()` запускає callback **повторно** через заданий інтервал.

• Час у `setTimeout()` та `setInterval()` задається в **мілісекундах**.

• `1000 ms = 1 second`.

• `setTimeout()` не гарантує виконання callback точно через вказану кількість мілісекунд.

• Delay — це мінімальна затримка перед тим, як callback стане готовим до виконання.

• Callback виконується, коли JavaScript-потік звільниться та event loop зможе його обробити.

• `setTimeout()` повертає timer ID.

• `clearTimeout()` скасовує запланований timeout.

• `setInterval()` також повертає timer ID.

• `clearInterval()` зупиняє interval.

• `setInterval()` потрібно очищати, якщо повторення більше не потрібне.

• Таймери не створюють окремий JavaScript-потік.

• `setTimeout(fn, 0)` не означає "виконати прямо зараз".

• `setTimeout(fn, 0)` означає: поставити callback на виконання після поточного синхронного коду, коли це дозволить event loop.

• Для складніших повторюваних операцій часто краще використовувати recursive `setTimeout()` замість `setInterval()`.

---

# Timer

Timer — механізм, який дозволяє запланувати виконання JavaScript-коду на майбутнє.

Наприклад:

    setTimeout(() => {
        console.log("Hello");
    }, 2000);

Callback буде запланований із затримкою:

    2000 ms

тобто приблизно:

    2 seconds

---

# Milliseconds

JavaScript timers використовують milliseconds.

Основні значення:

    1000 ms = 1 second
    2000 ms = 2 seconds
    5000 ms = 5 seconds
    10000 ms = 10 seconds

Наприклад:

    setTimeout(() => {
        console.log("Hello");
    }, 3000);

Затримка:

    3000 ms
       ↓
    3 seconds

---

# setTimeout()

`setTimeout()` запускає callback один раз після заданої затримки.

Синтаксис:

    setTimeout(callback, delay);

Наприклад:

    setTimeout(() => {
        console.log("Hello");
    }, 2000);

Логіка:

    setTimeout()
         ↓
    wait minimum delay
         ↓
    callback
         ↓
    execute once

---

# Простий приклад

    console.log("Start");

    setTimeout(() => {
        console.log("Hello");
    }, 2000);

    console.log("End");

Результат:

    Start
    End
    Hello

`Hello` з'явиться пізніше.

Важливо:

    setTimeout()
        ↓
    не блокує наступний код

---

# Callback

Перший аргумент `setTimeout()` — callback function.

Наприклад:

    setTimeout(() => {
        console.log("Hello");
    }, 1000);

Тут:

    () => {
        console.log("Hello");
    }

це callback.

Вона буде виконана пізніше.

---

# Named Callback

Callback можна винести в окрему функцію.

    function sayHello() {
        console.log("Hello");
    }

    setTimeout(sayHello, 2000);

Це еквівалентно:

    setTimeout(() => {
        console.log("Hello");
    }, 2000);

Важлива різниця:

Правильно:

    setTimeout(sayHello, 2000);

Не так:

    setTimeout(sayHello(), 2000);

У другому випадку функція викликається **одразу**, а її результат передається в `setTimeout()`.

---

# setTimeout() та arguments

Після delay можна передати аргументи callback.

Наприклад:

    function greet(name) {
        console.log(`Hello, ${name}`);
    }

    setTimeout(greet, 1000, "John");

Результат через приблизно 1 секунду:

    Hello, John

Але часто простіше використовувати closure:

    setTimeout(() => {
        greet("John");
    }, 1000);

---

# Timer ID

`setTimeout()` повертає timer ID.

Наприклад:

    const timerId = setTimeout(() => {
        console.log("Hello");
    }, 3000);

Тут:

    timerId

містить ідентифікатор запланованого timer.

Його можна використати для скасування:

    clearTimeout(timerId);

---

# clearTimeout()

`clearTimeout()` скасовує запланований timeout.

Наприклад:

    const timerId = setTimeout(() => {
        console.log("Hello");
    }, 5000);

    clearTimeout(timerId);

Callback не буде виконаний.

Логіка:

    setTimeout()
         ↓
    timer ID
         ↓
    clearTimeout(id)
         ↓
    cancelled

---

# Скасування timeout

Наприклад:

    const button = document.querySelector("button");

    const timerId = setTimeout(() => {
        console.log("Action");
    }, 5000);

    button.addEventListener("click", () => {
        clearTimeout(timerId);
    });

Якщо користувач натисне кнопку до завершення timeout:

    timeout → cancelled

---

# setTimeout() один раз

`setTimeout()` виконується тільки один раз.

    setTimeout(() => {
        console.log("Hello");
    }, 1000);

Результат:

    Hello

І callback більше не запускається.

Якщо потрібно повторювати дію:

    setInterval()

---

# setInterval()

`setInterval()` запускає callback повторно через заданий інтервал.

Синтаксис:

    setInterval(callback, delay);

Наприклад:

    setInterval(() => {
        console.log("Hello");
    }, 1000);

Приблизно кожну секунду callback буде виконуватися знову.

Результат:

    Hello
    Hello
    Hello
    Hello
    ...

---

# setInterval() та timer ID

Як і `setTimeout()`, `setInterval()` повертає timer ID.

    const intervalId = setInterval(() => {
        console.log("Hello");
    }, 1000);

Тепер:

    intervalId

можна використати для зупинки interval.

---

# clearInterval()

`clearInterval()` зупиняє interval.

Наприклад:

    const intervalId = setInterval(() => {
        console.log("Hello");
    }, 1000);

    clearInterval(intervalId);

Після цього callback більше не буде плануватися цим interval.

---

# setInterval() зупинка через умову

Наприклад, потрібно виконати операцію 5 разів.

    let count = 0;

    const intervalId = setInterval(() => {
        count++;

        console.log(count);

        if (count === 5) {
            clearInterval(intervalId);
        }
    }, 1000);

Результат:

    1
    2
    3
    4
    5

Після цього interval зупиняється.

---

# setTimeout vs setInterval

Основна різниця:

    setTimeout()
        ↓
    execute once

    setInterval()
        ↓
    execute repeatedly

Наприклад:

    setTimeout(() => {
        console.log("Hello");
    }, 1000);

Виконається один раз.

А:

    setInterval(() => {
        console.log("Hello");
    }, 1000);

буде виконуватися повторно.

---

# clearTimeout vs clearInterval

    clearTimeout()
        ↓
    cancel timeout

    clearInterval()
        ↓
    stop interval

Приклад:

    const timeoutId = setTimeout(() => {
        console.log("Hello");
    }, 3000);

    clearTimeout(timeoutId);

---

    const intervalId = setInterval(() => {
        console.log("Hello");
    }, 1000);

    clearInterval(intervalId);

---

# Timer Flow

Спрощена модель:

    JavaScript code
          ↓
    setTimeout()
          ↓
    timer registered
          ↓
    delay
          ↓
    callback becomes ready
          ↓
    event loop
          ↓
    callback execution

Важливо:

`delay` не означає точний час виконання.

---

# setTimeout(fn, 0)

Особливо важливий випадок:

    setTimeout(() => {
        console.log("Hello");
    }, 0);

Це **не означає**:

    execute immediately

Це означає приблизно:

    execute as soon as possible
    after current synchronous work
    and when event loop allows it

Наприклад:

    console.log("A");

    setTimeout(() => {
        console.log("B");
    }, 0);

    console.log("C");

Результат:

    A
    C
    B

---

# Чому setTimeout(..., 0) не виконується одразу

JavaScript виконує поточний synchronous code.

Наприклад:

    console.log("A");

    setTimeout(() => {
        console.log("B");
    }, 0);

    console.log("C");

Спочатку:

    A
    C

Потім callback timeout може бути виконаний.

Тому:

    0 ms ≠ immediate execution

---

# Delay — це не гарантія

Наприклад:

    setTimeout(() => {
        console.log("Hello");
    }, 1000);

Не потрібно розуміти це як:

    "Hello will execute exactly after 1000 ms"

Правильніше:

    "callback will not execute
    before the timer delay has elapsed,
    and will execute when the event loop
    can process it."

Причина:

якщо JavaScript зайнятий виконанням іншого коду, callback буде чекати.

---

# Blocking Code

Наприклад:

    console.log("Start");

    setTimeout(() => {
        console.log("Timer");
    }, 1000);

    // long synchronous operation

    console.log("End");

Якщо synchronous code займає багато часу, timer callback не зможе виконатися посеред нього.

JavaScript спочатку завершує поточний synchronous execution.

---

# Event Loop

Для базового розуміння достатньо такої моделі:

    Call Stack
        ↓
    JavaScript executes code
        ↓
    timer reaches delay
        ↓
    callback becomes ready
        ↓
    task queue
        ↓
    Event Loop
        ↓
    Call Stack
        ↓
    callback executes

Глибше event loop буде розглядатися в:

    08-asynchronous-js

---

# setTimeout та Event Loop

Наприклад:

    console.log("1");

    setTimeout(() => {
        console.log("2");
    }, 0);

    console.log("3");

Порядок:

    1
    3
    2

Тому що:

    synchronous code
          ↓
    timer callback

---

# setInterval та Event Loop

`setInterval()` також не запускає callback паралельно.

Наприклад:

    setInterval(() => {
        console.log("Hello");
    }, 1000);

Callback має чекати, поки JavaScript зможе його виконати.

Тому реальний інтервал може відрізнятися від заданого.

---

# setInterval() не є точним годинником

Не слід використовувати:

    setInterval()

як точне джерело часу.

Наприклад:

    setInterval(() => {
        seconds++;
    }, 1000);

Лічильник може поступово відхилятися від реального часу через:

    event loop delays
    browser scheduling
    background tab throttling
    other JavaScript work

Для точного countdown краще обчислювати elapsed time через:

    Date.now()

або:

    performance.now()

---

# Countdown

Простий countdown:

    let seconds = 5;

    const intervalId = setInterval(() => {
        console.log(seconds);

        seconds--;

        if (seconds < 0) {
            clearInterval(intervalId);
            console.log("Done!");
        }
    }, 1000);

---

# Countdown з DOM

Наприклад:

    const output = document.querySelector("#timer");

    let seconds = 10;

    const intervalId = setInterval(() => {
        output.textContent = seconds;

        seconds--;

        if (seconds < 0) {
            clearInterval(intervalId);
            output.textContent = "Done!";
        }
    }, 1000);

У реальному UI краще також одразу показати початкове значення, а не чекати першу секунду.

---

# setTimeout як delay

`setTimeout()` можна використовувати для відкладеної дії.

Наприклад:

    button.addEventListener("click", () => {
        setTimeout(() => {
            console.log("Action completed");
        }, 2000);
    });

Логіка:

    click
      ↓
    wait
      ↓
    action

---

# Delayed UI Message

Наприклад:

    const message = document.querySelector(".message");

    setTimeout(() => {
        message.textContent = "Welcome!";
    }, 2000);

Повідомлення з'явиться приблизно через 2 секунди.

---

# Hide Element After Delay

    const message = document.querySelector(".message");

    setTimeout(() => {
        message.hidden = true;
    }, 3000);

Елемент буде прихований після затримки.

---

# Show Element After Delay

    const message = document.querySelector(".message");

    message.hidden = true;

    setTimeout(() => {
        message.hidden = false;
    }, 2000);

---

# Auto Hide Notification

Типовий UI-патерн:

    function showNotification(message) {
        const notification =
            document.querySelector(".notification");

        notification.textContent = message;
        notification.hidden = false;

        setTimeout(() => {
            notification.hidden = true;
        }, 3000);
    }

Наприклад:

    showNotification("Saved successfully");

---

# Problem: Multiple Timers

Якщо функцію викликати багато разів:

    showNotification("Message 1");
    showNotification("Message 2");
    showNotification("Message 3");

може бути створено декілька timers.

Наприклад:

    setTimeout(...)
    setTimeout(...)
    setTimeout(...)

У складніших UI потрібно зберігати timer ID та очищати попередній timer.

---

# Resettable Timeout

Корисний патерн:

    let timerId;

    function startTimer() {
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            console.log("Action");
        }, 1000);
    }

Тепер кожен новий виклик:

    startTimer();

скасовує попередній timer.

Цей патерн особливо важливий для:

    debounce
    notifications
    search input
    autosave

---

# Recursive setTimeout()

Замість:

    setInterval()

можна використовувати recursive `setTimeout()`.

Наприклад:

    function run() {
        console.log("Hello");

        setTimeout(run, 1000);
    }

    run();

Логіка:

    run()
      ↓
    work
      ↓
    setTimeout(run)
      ↓
    run()
      ↓
    work
      ↓
    ...

---

# setInterval vs Recursive setTimeout

`setInterval()`:

    setInterval(task, 1000);

Приблизно:

    timer
      ↓
    task
      ↓
    timer
      ↓
    task
      ↓
    timer
      ↓
    ...

Recursive `setTimeout()`:

    function run() {
        task();

        setTimeout(run, 1000);
    }

    run();

Логіка:

    task
      ↓
    wait
      ↓
    task
      ↓
    wait
      ↓
    task

Важлива різниця:

recursive `setTimeout()` дозволяє дочекатися завершення поточної операції перед плануванням наступного запуску.

---

# Recursive setTimeout та asynchronous operation

Наприклад:

    async function poll() {
        await fetchData();

        setTimeout(poll, 2000);
    }

    poll();

Спрощена логіка:

    fetch data
        ↓
    wait for result
        ↓
    wait 2 seconds
        ↓
    fetch data
        ↓
    ...

Такий підхід корисний для:

    polling
    API requests
    retry logic
    repeated background checks

Асинхронний JavaScript буде детальніше розглядатися в:

    08-asynchronous-js

---

# Polling

Polling — регулярна перевірка стану чогось.

Наприклад:

    function checkStatus() {
        console.log("Checking...");

        setTimeout(checkStatus, 5000);
    }

    checkStatus();

Приблизно кожні 5 секунд виконується перевірка.

У реальному застосунку polling може використовуватися для:

    server status
    job status
    notifications
    background tasks

---

# setInterval для polling

Можна написати:

    const intervalId = setInterval(() => {
        checkStatus();
    }, 5000);

    function stopPolling() {
        clearInterval(intervalId);
    }

Але якщо `checkStatus()` виконує довгу асинхронну операцію, recursive `setTimeout()` часто дає кращий контроль.

---

# Nested setTimeout()

Можна запланувати timeout всередині timeout:

    setTimeout(() => {
        console.log("First");

        setTimeout(() => {
            console.log("Second");
        }, 1000);

    }, 1000);

Результат:

    First
    Second

Між ними приблизно 1 секунда.

---

# Multiple setTimeout()

Наприклад:

    setTimeout(() => {
        console.log("A");
    }, 1000);

    setTimeout(() => {
        console.log("B");
    }, 2000);

    setTimeout(() => {
        console.log("C");
    }, 3000);

Результат:

    A
    B
    C

Це простий спосіб створити послідовність timed actions.

---

# Timer Order

Якщо два timers мають однаковий delay:

    setTimeout(() => {
        console.log("A");
    }, 1000);

    setTimeout(() => {
        console.log("B");
    }, 1000);

Зазвичай callback-и будуть оброблені в порядку, в якому вони стали готовими / були поставлені в чергу.

Результат у цьому простому випадку:

    A
    B

Але не слід використовувати timers як механізм точного real-time scheduling.

---

# Passing Functions Correctly

Правильно:

    setTimeout(showMessage, 1000);

Неправильно:

    setTimeout(showMessage(), 1000);

Чому?

    showMessage
        ↓
    function reference

А:

    showMessage()
        ↓
    function call now
        ↓
    return value

---

# Arrow Function

Найчастіший варіант:

    setTimeout(() => {
        console.log("Hello");
    }, 1000);

Arrow function використовується як callback.

---

# Timer з параметром

Наприклад:

    const name = "John";

    setTimeout(() => {
        console.log(`Hello, ${name}`);
    }, 1000);

Closure дозволяє callback отримати доступ до `name`.

---

# clearTimeout() після виконання

Наприклад:

    const timerId = setTimeout(() => {
        console.log("Hello");
    }, 1000);

Після виконання callback timer більше не потрібно очищати.

`clearTimeout()` потрібен насамперед для **скасування ще не виконаного timeout**.

---

# clearInterval() після зупинки

Після:

    clearInterval(intervalId);

цей interval більше не запускає свій callback.

Якщо потрібно запустити його знову:

    const intervalId = setInterval(...);

потрібно створити новий interval.

---

# Starting and Stopping Interval

Типовий патерн:

    let intervalId = null;

    function start() {
        if (intervalId !== null) {
            return;
        }

        intervalId = setInterval(() => {
            console.log("Running");
        }, 1000);
    }

    function stop() {
        clearInterval(intervalId);
        intervalId = null;
    }

Це дозволяє уникнути створення декількох однакових intervals.

---

# Timer State

У складніших компонентах timer часто має state:

    timerId
    running
    startTime
    elapsedTime

Наприклад:

    let timerId = null;
    let running = false;

---

# Простий Stopwatch

Спрощений приклад:

    let seconds = 0;
    let intervalId = null;

    function start() {
        if (intervalId !== null) {
            return;
        }

        intervalId = setInterval(() => {
            seconds++;

            console.log(seconds);
        }, 1000);
    }

    function stop() {
        clearInterval(intervalId);
        intervalId = null;
    }

    function reset() {
        stop();
        seconds = 0;
    }

---

# Timer Cleanup

Timer потрібно очищати, коли він більше не потрібен.

Особливо це важливо для:

    UI components
    event listeners
    modals
    pages
    long-lived applications

Наприклад:

    const intervalId = setInterval(update, 1000);

Коли component або feature більше не потрібен:

    clearInterval(intervalId);

---

# Timers та DOM

Timers часто використовуються разом із DOM.

Наприклад:

    const button = document.querySelector("button");

    button.addEventListener("click", () => {
        button.disabled = true;

        setTimeout(() => {
            button.disabled = false;
        }, 3000);
    });

Кнопка блокується на 3 секунди.

---

# Disable Button Temporarily

    function disableButton(button) {
        button.disabled = true;

        setTimeout(() => {
            button.disabled = false;
        }, 2000);
    }

---

# Delay Before Action

Наприклад:

    button.addEventListener("click", () => {
        setTimeout(() => {
            submitForm();
        }, 1000);
    });

Це може бути корисним у деяких UI-сценаріях, але для реальної форми штучну затримку не слід додавати без необхідності.

---

# setTimeout та animation

Для простих delayed animations можна використовувати:

    element.classList.add("visible");

    setTimeout(() => {
        element.classList.remove("visible");
    }, 1000);

Але для плавної frame-by-frame анімації краще використовувати:

    requestAnimationFrame()

який буде розглядатися в:

    02-requestAnimationFrame

---

# setTimeout vs requestAnimationFrame

`setTimeout()`:

    → time-based scheduling

`requestAnimationFrame()`:

    → browser rendering / animation frames

Наприклад:

    setTimeout(...)
        ↓
    execute after delay

А:

    requestAnimationFrame(...)
        ↓
    execute before browser repaint

---

# Timers та Browser Throttling

Браузер може змінювати поведінку timers залежно від стану сторінки.

Наприклад:

    inactive tab
    background page
    battery-saving modes
    browser scheduling

Тому:

    setInterval(fn, 1000)

не слід розуміти як гарантію:

    exactly every 1000 ms

Особливо важливо пам'ятати це для:

    clocks
    countdowns
    games
    animations
    background tasks

---

# Timers та точний час

Якщо потрібно показати користувачу countdown, краще не просто збільшувати counter:

    seconds++;

а обчислювати реальний elapsed time.

Наприклад:

    const startTime = Date.now();

    setInterval(() => {
        const elapsed = Date.now() - startTime;

        console.log(elapsed);
    }, 1000);

Тоді значення базується на реальному часі, а не на кількості виконань interval.

---

# Date.now() та Timer

Наприклад:

    const startTime = Date.now();
    const duration = 10_000;

    const intervalId = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = duration - elapsed;

        console.log(remaining);

        if (remaining <= 0) {
            clearInterval(intervalId);
        }
    }, 100);

Це надійніше для countdown, ніж просто:

    seconds--;

---

# performance.now()

Для вимірювання часу виконання та performance-sensitive задач можна використовувати:

    performance.now()

Наприклад:

    const start = performance.now();

    // code

    const end = performance.now();

    console.log(end - start);

`performance.now()` має високу роздільну здатність і призначений для вимірювання elapsed time.

---

# Timer ID

Timer ID потрібно зберігати, якщо timer може знадобитися для:

    cancellation
    restart
    cleanup
    pause / resume logic
    component cleanup

Наприклад:

    let timeoutId = null;

    function start() {
        timeoutId = setTimeout(() => {
            console.log("Done");
        }, 3000);
    }

    function cancel() {
        clearTimeout(timeoutId);
        timeoutId = null;
    }

---

# Reset Timer

Типовий патерн:

    let timeoutId;

    function resetTimer() {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            console.log("Action");
        }, 1000);
    }

Кожен виклик:

    resetTimer();

починає відлік заново.

Цей патерн є основою:

    debounce

---

# Debounce Preview

Debounce означає:

    wait until activity stops

Спрощений приклад:

    let timeoutId;

    input.addEventListener("input", () => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            console.log("Search");
        }, 500);
    });

Якщо користувач продовжує вводити текст:

    clearTimeout()
        ↓
    new setTimeout()
        ↓
    clearTimeout()
        ↓
    new setTimeout()
        ↓
    ...

Callback виконається після паузи.

Детально:

    03-debounce

---

# Throttle Preview

Throttle означає:

    limit execution frequency

Наприклад:

    setInterval()

може бути частиною простих rate-limiting patterns, але професійний throttle зазвичай потребує додаткової логіки.

Детально:

    04-throttle

---

# Common Pattern: Run Once Later

    let timeoutId;

    function schedule() {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            console.log("Run");
        }, 1000);
    }

---

# Common Pattern: Run Repeatedly

    const intervalId = setInterval(() => {
        console.log("Run");
    }, 1000);

---

# Common Pattern: Stop Repetition

    clearInterval(intervalId);

---

# Common Pattern: Cancel Delayed Action

    clearTimeout(timeoutId);

---

# Common Pattern: Run N Times

    let count = 0;

    const intervalId = setInterval(() => {
        count++;

        console.log(count);

        if (count >= 5) {
            clearInterval(intervalId);
        }
    }, 1000);

---

# Common Pattern: Start / Stop

    let intervalId = null;

    function start() {
        if (intervalId !== null) {
            return;
        }

        intervalId = setInterval(() => {
            console.log("Running");
        }, 1000);
    }

    function stop() {
        clearInterval(intervalId);
        intervalId = null;
    }

---

# Common Pattern: Restart

    let timeoutId = null;

    function restart() {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            console.log("Restarted");
        }, 1000);
    }

---

# Practical Examples

### Приклад 1 — повідомлення через 2 секунди

    setTimeout(() => {
        console.log("Hello");
    }, 2000);

---

### Приклад 2 — timer ID

    const timerId = setTimeout(() => {
        console.log("Hello");
    }, 3000);

---

### Приклад 3 — скасувати timeout

    const timerId = setTimeout(() => {
        console.log("Hello");
    }, 5000);

    clearTimeout(timerId);

---

### Приклад 4 — повторювати дію

    const intervalId = setInterval(() => {
        console.log("Tick");
    }, 1000);

---

### Приклад 5 — зупинити interval

    const intervalId = setInterval(() => {
        console.log("Tick");
    }, 1000);

    setTimeout(() => {
        clearInterval(intervalId);
    }, 5000);

Interval працюватиме приблизно 5 секунд.

---

### Приклад 6 — лічильник

    let count = 0;

    const intervalId = setInterval(() => {
        count++;

        console.log(count);

        if (count === 5) {
            clearInterval(intervalId);
        }
    }, 1000);

Результат:

    1
    2
    3
    4
    5

---

### Приклад 7 — setTimeout з 0 ms

    console.log("A");

    setTimeout(() => {
        console.log("B");
    }, 0);

    console.log("C");

Результат:

    A
    C
    B

---

### Приклад 8 — delayed DOM update

    const message = document.querySelector(".message");

    setTimeout(() => {
        message.textContent = "Done!";
    }, 2000);

---

### Приклад 9 — hide message

    const message = document.querySelector(".message");

    setTimeout(() => {
        message.hidden = true;
    }, 3000);

---

### Приклад 10 — button cooldown

    const button = document.querySelector("button");

    button.addEventListener("click", () => {
        button.disabled = true;

        setTimeout(() => {
            button.disabled = false;
        }, 3000);
    });

---

### Приклад 11 — resettable timeout

    let timeoutId;

    function scheduleAction() {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            console.log("Action");
        }, 1000);
    }

---

### Приклад 12 — recursive setTimeout

    function run() {
        console.log("Run");

        setTimeout(run, 1000);
    }

    run();

---

### Приклад 13 — polling

    function checkStatus() {
        console.log("Checking status...");

        setTimeout(checkStatus, 5000);
    }

    checkStatus();

---

### Приклад 14 — stopwatch

    let seconds = 0;
    let intervalId = null;

    function start() {
        if (intervalId !== null) {
            return;
        }

        intervalId = setInterval(() => {
            seconds++;

            console.log(seconds);
        }, 1000);
    }

    function stop() {
        clearInterval(intervalId);
        intervalId = null;
    }

---

### Приклад 15 — countdown

    let seconds = 5;

    const intervalId = setInterval(() => {
        console.log(seconds);

        seconds--;

        if (seconds < 0) {
            clearInterval(intervalId);
            console.log("Done!");
        }
    }, 1000);

---

# Типові помилки

❌ Думати, що `setTimeout(fn, 0)` виконується одразу.

    setTimeout(fn, 0);

Правильне розуміння:

    current synchronous code
        ↓
    event loop
        ↓
    callback

---

❌ Передавати результат функції замість callback.

Неправильно:

    setTimeout(showMessage(), 1000);

Правильно:

    setTimeout(showMessage, 1000);

або:

    setTimeout(() => {
        showMessage();
    }, 1000);

---

❌ Забувати очищати interval.

    setInterval(() => {
        console.log("Running");
    }, 1000);

Якщо цей interval більше не потрібен, його потрібно зупинити:

    clearInterval(intervalId);

---

❌ Створювати декілька intervals.

    function start() {
        setInterval(update, 1000);
    }

Якщо `start()` викликати багато разів, буде створено багато intervals.

Краще:

    let intervalId = null;

    function start() {
        if (intervalId !== null) {
            return;
        }

        intervalId = setInterval(update, 1000);
    }

---

❌ Використовувати `setInterval()` як точний годинник.

    setInterval(() => {
        seconds++;
    }, 1000);

Це не гарантує точності.

Для реального elapsed time краще використовувати:

    Date.now()

або:

    performance.now()

---

❌ Забувати про cleanup.

Якщо timer більше не потрібен:

    clearTimeout(timeoutId);

або:

    clearInterval(intervalId);

---

❌ Створювати timeout, не зберігаючи ID, коли його потрібно буде скасувати.

Замість:

    setTimeout(action, 5000);

краще:

    const timeoutId = setTimeout(action, 5000);

якщо потрібна можливість cancellation.

---

❌ Використовувати `setInterval()` для операцій, які можуть тривати довше за interval.

Наприклад:

    setInterval(async () => {
        await fetchData();
    }, 1000);

Якщо операція може тривати довго, можуть виникнути накладання запусків.

Для таких сценаріїв часто краще:

    recursive setTimeout()

---

❌ Плутати delay та execution time.

    setTimeout(fn, 1000);

означає не:

    "execute exactly at 1000 ms"

а приблизно:

    "do not execute before the delay
    and execute when the event loop can process it."

---

❌ Використовувати timers для animation loop.

Для animation краще:

    requestAnimationFrame()

---

# setTimeout vs setInterval — таблиця

| API | Виконання | Основне використання |
|---|---|---|
| `setTimeout()` | один раз | delayed action |
| `clearTimeout()` | скасування | cancel timeout |
| `setInterval()` | повторно | repeated action |
| `clearInterval()` | зупинка | stop interval |

---

# setTimeout vs recursive setTimeout

### setInterval

    setInterval(task, 1000);

Модель:

    task
      ↓
    1 sec
      ↓
    task
      ↓
    1 sec
      ↓
    task

---

### Recursive setTimeout

    function run() {
        task();

        setTimeout(run, 1000);
    }

    run();

Модель:

    task
      ↓
    wait
      ↓
    task
      ↓
    wait
      ↓
    task

Recursive `setTimeout()` дає більше контролю над моментом наступного запуску.

---

# Timer Lifecycle

Типовий життєвий цикл:

    create
      ↓
    schedule
      ↓
    wait
      ↓
    callback ready
      ↓
    callback executes
      ↓
    finished

Для interval:

    create
      ↓
    schedule
      ↓
    callback
      ↓
    repeat
      ↓
    callback
      ↓
    repeat
      ↓
    clearInterval()
      ↓
    stopped

---

# Timer Cancellation

Для timeout:

    const timeoutId = setTimeout(action, 5000);

    clearTimeout(timeoutId);

Для interval:

    const intervalId = setInterval(action, 1000);

    clearInterval(intervalId);

---

# Browser APIs

`setTimeout()` та `setInterval()` часто називають JavaScript timers, але вони надаються середовищем виконання.

У браузері timer APIs є частиною Web Platform / Browser APIs.

JavaScript engine виконує JavaScript.

Браузер надає додаткові API, зокрема:

    setTimeout()
    setInterval()
    DOM
    fetch()
    localStorage
    IntersectionObserver
    requestAnimationFrame()

Тому корисно розрізняти:

    JavaScript language
        +
    Browser APIs

---

# Timers та JavaScript Runtime

Спрощено:

    JavaScript
        ↓
    Browser Runtime
        ↓
    Browser APIs
        ↓
    Timer
        ↓
    Event Loop
        ↓
    Callback

Глибше це буде розглядатися в:

    08-asynchronous-js

---

# Практичний вибір

Використовуй:

    setTimeout()

коли потрібно:

    execute once later

---

Використовуй:

    setInterval()

коли потрібно:

    repeat regularly

і операція безпечна для повторного scheduling.

---

Використовуй:

    recursive setTimeout()

коли потрібно:

    wait
    ↓
    execute
    ↓
    schedule next execution

особливо для:

    polling
    retries
    repeated async operations

---

Використовуй:

    requestAnimationFrame()

коли потрібно:

    browser animation
    frame-based updates

---

# Питання зі співбесіди

Що таке `setTimeout()`?

Що таке `setInterval()`?

Чим `setTimeout()` відрізняється від `setInterval()`?

Що робить `clearTimeout()`?

Що робить `clearInterval()`?

Що повертає `setTimeout()`?

Що повертає `setInterval()`?

У яких одиницях задається delay?

Скільки мілісекунд у секунді?

Чи блокує `setTimeout()` виконання JavaScript?

Що відбудеться при `setTimeout(fn, 0)`?

Чому `setTimeout(fn, 0)` не виконується одразу?

Чи гарантує `setTimeout(fn, 1000)` виконання рівно через 1 секунду?

Як timers пов'язані з event loop?

Що таке callback?

Чому потрібно передавати:

    setTimeout(fn, 1000)

а не:

    setTimeout(fn(), 1000)

Як скасувати timeout?

Як зупинити interval?

Як виконати interval певну кількість разів?

Як створити countdown?

Як створити stopwatch?

Як перезапустити timeout?

Як уникнути створення декількох intervals?

Що таке recursive `setTimeout()`?

Чим recursive `setTimeout()` відрізняється від `setInterval()`?

Коли краще використовувати recursive `setTimeout()`?

Чому `setInterval()` не є точним годинником?

Як `Date.now()` можна використовувати разом із timer?

Для чого потрібен `performance.now()`?

Чому timer може виконатися пізніше, ніж заданий delay?

Що таке timer ID?

Навіщо зберігати timer ID?

Що таке timer cleanup?

Чому timers можуть бути проблемою в UI components?

Коли потрібно використовувати `requestAnimationFrame()` замість `setTimeout()`?

Що таке browser throttling?

Як background tab може впливати на timers?

Що таке polling?

Як реалізувати простий polling?

Як реалізувати debounce через `setTimeout()`?

Як реалізувати повторне планування через recursive `setTimeout()`?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке timer.

`setTimeout()`.

`setInterval()`.

`clearTimeout()`.

`clearInterval()`.

Callback.

Delay.

Milliseconds.

Timer ID.

Одноразове виконання.

Повторне виконання.

Скасування timeout.

Зупинка interval.

`setTimeout(fn, 0)`.

Основи event loop.

Розуміння, що delay не є точною гарантією часу виконання.

---

🔵 Junior

Впевнено використовувати:

    setTimeout()
    clearTimeout()
    setInterval()
    clearInterval()

Розуміти:

    callback
    timer ID
    delay
    event loop
    task queue

Створювати:

    countdown
    stopwatch
    delayed UI action
    notification timeout
    temporary button state
    repeated update

Уміти:

    cancel timeout
    stop interval
    restart timer
    prevent duplicate intervals
    cleanup timers

Розуміти різницю:

    setTimeout()
    setInterval()
    recursive setTimeout()

Розуміти базове використання:

    Date.now()
    performance.now()

---

🟠 Middle

Глибше розуміти:

    event loop
    task queue
    timer scheduling
    browser throttling
    background tabs

Уміти правильно будувати:

    polling
    retry logic
    recursive scheduling
    countdowns based on real elapsed time
    timer cleanup

Розуміти проблеми:

    overlapping intervals
    long-running callbacks
    timer drift
    multiple timers
    stale callbacks

Вміти вибирати між:

    setTimeout()
    setInterval()
    recursive setTimeout()
    requestAnimationFrame()

Розуміти timers у контексті:

    DOM
    UI state
    async operations
    component lifecycle

---

🔴 Senior

Глибоке розуміння:

    browser event loop
    task queues
    timer task scheduling
    rendering pipeline
    browser throttling
    background timer policies

Розуміння взаємодії:

    timers
    microtasks
    tasks
    rendering
    requestAnimationFrame

Розуміння:

    timer drift
    scheduling delays
    long tasks
    event loop starvation
    browser lifecycle
    page visibility

Оптимізація:

    polling strategies
    retry strategies
    scheduling
    resource cleanup
    background work

Вибір між:

    timers
    requestAnimationFrame
    requestIdleCallback
    Web Workers
    async control flow

---

# Міні-шпаргалка

## setTimeout

    setTimeout(() => {
        console.log("Hello");
    }, 1000);

    → execute once later

---

## clearTimeout

    const timeoutId = setTimeout(action, 1000);

    clearTimeout(timeoutId);

    → cancel timeout

---

## setInterval

    const intervalId = setInterval(() => {
        console.log("Tick");
    }, 1000);

    → repeat callback

---

## clearInterval

    clearInterval(intervalId);

    → stop interval

---

## Milliseconds

    1000 ms = 1 second

    5000 ms = 5 seconds

---

## Timer ID

    const timerId = setTimeout(...);

    const intervalId = setInterval(...);

---

## setTimeout 0

    setTimeout(fn, 0);

    → not immediate
    → after current synchronous code
    → when event loop can process callback

---

## setTimeout

    setTimeout(fn, delay);

    → one execution

---

## setInterval

    setInterval(fn, delay);

    → repeated execution

---

## Cancel

    clearTimeout(timeoutId);

    clearInterval(intervalId);

---

## Countdown

    let count = 5;

    const id = setInterval(() => {
        console.log(count);

        count--;

        if (count < 0) {
            clearInterval(id);
        }
    }, 1000);

---

## Recursive setTimeout

    function run() {
        task();

        setTimeout(run, 1000);
    }

    run();

    → execute
    → wait
    → execute again

---

## Resettable timeout

    let timeoutId;

    function reset() {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            console.log("Action");
        }, 1000);
    }

---

## Real elapsed time

    const start = Date.now();

    const elapsed = Date.now() - start;

    → measure actual elapsed time

---

## Timer flow

    setTimeout()
         ↓
    timer registered
         ↓
       delay
         ↓
    callback ready
         ↓
    event loop
         ↓
    callback
         ↓
    execution

---

## Основні правила

    setTimeout()
        → execute once later

    clearTimeout()
        → cancel timeout

    setInterval()
        → execute repeatedly

    clearInterval()
        → stop interval

    1000 ms
        → 1 second

    setTimeout(fn, 0)
        → not immediate

    delay
        → minimum waiting time,
          not exact execution time

    timer ID
        → needed for cancellation / cleanup

    recursive setTimeout()
        → useful for controlled repeated execution

---

# Головне:

• `setTimeout()` дозволяє виконати callback один раз після затримки.

• `setInterval()` дозволяє повторювати callback через заданий інтервал.

• `clearTimeout()` скасовує запланований timeout.

• `clearInterval()` зупиняє interval.

• Delay задається в milliseconds:

    1000 ms = 1 second

• `setTimeout()` та `setInterval()` не блокують поточний JavaScript-код.

• Timer не створює окремий JavaScript-потік.

• `setTimeout(fn, 0)` не означає негайне виконання.

• Спочатку завершується поточний synchronous code, а потім callback може бути оброблений event loop.

• Delay не є гарантією точного часу виконання.

• Якщо JavaScript-потік зайнятий, callback може виконатися пізніше.

• `setTimeout()` повертає timer ID:

    const timeoutId = setTimeout(...);

• `setInterval()` також повертає timer ID:

    const intervalId = setInterval(...);

• Якщо timer можна буде скасувати, ID потрібно зберігати.

• `setInterval()` потрібно зупиняти через:

    clearInterval(intervalId)

коли повторення більше не потрібне.

• Для UI та довгоживучих застосунків важливий timer cleanup.

• `setInterval()` не слід сприймати як точний годинник.

• Для вимірювання реального elapsed time можна використовувати:

    Date.now()

або:

    performance.now()

• Для складніших повторюваних операцій часто корисний recursive `setTimeout()`:

    function run() {
        task();

        setTimeout(run, 1000);
    }

• Recursive `setTimeout()` дозволяє планувати наступний запуск після виконання поточного кроку.

• `setTimeout()` добре підходить для:

    delayed action
    one-time action
    timeout
    temporary UI state

• `setInterval()` добре підходить для:

    repeated action
    periodic update
    simple polling

• Recursive `setTimeout()` особливо корисний для:

    polling
    retry logic
    repeated async operations

• Для frame-based animation краще використовувати:

    requestAnimationFrame()

• Timers є важливою частиною взаємодії JavaScript із Browser APIs.

• Глибоке розуміння timers потребує розуміння:

    event loop
    tasks
    callbacks
    browser scheduling

• Більш детально asynchronous behavior буде розглядатися в:

    08-asynchronous-js

• Наступний логічний крок у цьому розділі:

    02-requestAnimationFrame

де timers можна порівняти з механізмом browser rendering та animation frames.