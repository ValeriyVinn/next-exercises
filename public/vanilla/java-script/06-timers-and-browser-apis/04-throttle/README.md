# 04. Throttle

## 📌 Що таке Throttle?

**Throttle** — це техніка, яка обмежує частоту виконання функції.

Простими словами:

> **Throttle дозволяє виконувати функцію не частіше, ніж один раз за заданий проміжок часу.**

Наприклад, подія `scroll` може виникати дуже часто:

    scroll
    scroll
    scroll
    scroll
    scroll
    scroll
    scroll
    ...

Якщо на кожну подію запускати важку функцію:

    scroll → function()
    scroll → function()
    scroll → function()
    scroll → function()
    ...

це може створити зайве навантаження.

Throttle дозволяє сказати:

> "Виконуй цю функцію максимум один раз на кожні 100 мс."

Отримаємо:

    scroll → function()
    scroll
    scroll
    scroll
    scroll
    → wait
    scroll → function()
    scroll
    scroll
    → wait
    scroll → function()

---

# 🎯 Навіщо потрібен Throttle?

Throttle особливо корисний для подій, які виникають дуже часто:

- `scroll`;
- `mousemove`;
- `pointermove`;
- `resize`;
- `drag`;
- `touchmove`;
- `wheel`;
- позиція курсора;
- відстеження прогресу scrolling;
- інтерактивні UI-елементи;
- візуальні ефекти.

Головна мета:

> **не дозволити функції виконуватися занадто часто.**

---

# 🧠 Головна ідея

Throttle встановлює часовий інтервал.

Наприклад:

    delay = 100ms

У межах цих 100 мс callback може виконатися лише один раз.

Схема:

    event
      ↓
    callback()

    event
    event
    event
      ↓
    ignore

    100ms
      ↓
    callback()

    event
    event
      ↓
    ignore

    100ms
      ↓
    callback()

Тобто:

> **Throttle не чекає завершення події. Він регулярно пропускає окремі виклики через заданий інтервал.**

---

# 🔑 Основні поняття

| Поняття | Значення |
|---|---|
| Throttle | Обмеження частоти виконання |
| `setTimeout()` | Може використовуватися для створення інтервалу |
| `clearTimeout()` | Скасування таймера |
| delay | Мінімальний інтервал між викликами |
| callback | Функція, яку потрібно обмежити |
| timestamp | Час попереднього/поточного виклику |
| leading | Виконання на початку |
| trailing | Виконання після завершення серії подій |

---

# 1. Проблема без Throttle

Наприклад:

    window.addEventListener('scroll', () => {
        console.log('scroll');
    });

Під час scrolling callback може викликатися дуже часто.

Умовно:

    scroll
    scroll
    scroll
    scroll
    scroll
    scroll
    scroll
    scroll
    scroll

Якщо всередині callback виконується складна операція, це може негативно вплинути на продуктивність.

---

# 2. Простий Throttle

Почнемо з простого варіанта:

    function throttle(callback, delay) {
        let waiting = false;

        return function (...args) {
            if (waiting) {
                return;
            }

            callback(...args);

            waiting = true;

            setTimeout(() => {
                waiting = false;
            }, delay);
        };
    }

Тепер:

    const handleScroll = throttle(() => {
        console.log('Scroll');
    }, 100);

    window.addEventListener('scroll', handleScroll);

---

# 3. Як працює простий Throttle?

Спочатку:

    waiting = false

При першій події:

    event
      ↓
    waiting === false
      ↓
    callback()
      ↓
    waiting = true
      ↓
    setTimeout()

Поки `waiting === true`:

    event
      ↓
    waiting === true
      ↓
    return

Після завершення таймера:

    waiting = false

І наступна подія знову може виконати callback.

---

# 4. Візуальна модель

Нехай:

    delay = 300ms

Події:

    0ms     event
            ↓
          callback()

    50ms    event
            ↓
          ignore

    100ms   event
            ↓
          ignore

    200ms   event
            ↓
          ignore

    300ms   event
            ↓
          callback()

    350ms   event
            ↓
          ignore

    600ms   event
            ↓
          callback()

Отже:

    багато events
          ↓
    ┌─────────────┐
    │  300ms      │
    └─────────────┘
          ↓
      callback

---

# 5. Throttle через timestamp

Існує інший підхід — використовувати час.

Наприклад:

    function throttle(callback, delay) {
        let lastTime = 0;

        return function (...args) {
            const now = Date.now();

            if (now - lastTime < delay) {
                return;
            }

            lastTime = now;

            callback(...args);
        };
    }

Тут ми запам'ятовуємо:

    lastTime

і порівнюємо його з:

    now

Якщо:

    now - lastTime >= delay

можна виконати callback.

---

# 6. Як працює timestamp-варіант?

Перший виклик:

    lastTime = 0
    now = 1000

    1000 - 0 >= 300

    → callback()

Потім:

    lastTime = 1000

Наступний виклик:

    now = 1100

    1100 - 1000 = 100

    100 < 300

    → ignore

Наступний:

    now = 1300

    1300 - 1000 = 300

    300 >= 300

    → callback()

---

# 7. Throttle через `Date.now()`

Базова реалізація:

    function throttle(callback, delay) {
        let lastTime = 0;

        return function (...args) {
            const now = Date.now();

            if (now - lastTime < delay) {
                return;
            }

            lastTime = now;

            callback(...args);
        };
    }

Це дуже простий варіант для розуміння основного принципу.

---

# 8. Throttle через `setTimeout()`

Інший базовий варіант:

    function throttle(callback, delay) {
        let waiting = false;

        return function (...args) {
            if (waiting) {
                return;
            }

            callback(...args);

            waiting = true;

            setTimeout(() => {
                waiting = false;
            }, delay);
        };
    }

Цей варіант добре показує логіку:

    можна
      ↓
    виклик
      ↓
    заборонити
      ↓
    чекати
      ↓
    знову можна

---

# 9. Throttle і аргументи

Як і debounce, throttle повинен уміти передавати аргументи.

Використовуємо:

    ...args

Наприклад:

    function logPosition(x, y) {
        console.log(x, y);
    }

    const throttledLog = throttle(logPosition, 100);

    throttledLog(100, 200);

---

# 10. Throttle для `mousemove`

Подія `mousemove` може генеруватися дуже часто.

Без throttle:

    document.addEventListener('mousemove', event => {
        console.log(event.clientX, event.clientY);
    });

З throttle:

    const handleMouseMove = throttle(event => {
        console.log(event.clientX, event.clientY);
    }, 100);

    document.addEventListener('mousemove', handleMouseMove);

Тепер callback буде виконуватися не частіше, ніж приблизно раз на 100 мс.

---

# 11. Throttle для `scroll`

Типовий приклад:

    const handleScroll = throttle(() => {
        console.log(window.scrollY);
    }, 100);

    window.addEventListener('scroll', handleScroll);

Наприклад, можна перевіряти позицію сторінки:

    const handleScroll = throttle(() => {
        if (window.scrollY > 500) {
            console.log('Show button');
        }
    }, 100);

    window.addEventListener('scroll', handleScroll);

---

# 12. Throttle для кнопки "Back to top"

Наприклад, потрібно показувати кнопку після scrolling.

HTML:

    <button id="backToTop">
        ↑
    </button>

JavaScript:

    const button = document.querySelector('#backToTop');

    const handleScroll = throttle(() => {
        button.hidden = window.scrollY < 500;
    }, 100);

    window.addEventListener('scroll', handleScroll);

Тепер перевірка позиції виконується контрольовано.

---

# 13. Throttle для `resize`

Наприклад:

    const handleResize = throttle(() => {
        console.log(
            window.innerWidth,
            window.innerHeight
        );
    }, 100);

    window.addEventListener('resize', handleResize);

Але тут важливо пам'ятати:

> Якщо потрібно виконати функцію лише після того, як користувач перестав змінювати розмір, краще використовувати Debounce.

---

# 14. Throttle для drag

Під час drag:

    pointermove
    pointermove
    pointermove
    pointermove
    pointermove
    ...

Можна обмежити частоту обробки:

    const handleMove = throttle(event => {
        console.log(
            event.clientX,
            event.clientY
        );
    }, 50);

Для плавної візуальної взаємодії часто краще розглядати `requestAnimationFrame`.

---

# 15. Throttle і `requestAnimationFrame`

Ці інструменти мають схожу мету — не робити зайву роботу, але працюють по-різному.

### Throttle

Обмежує частоту:

    максимум один раз на 100ms

### `requestAnimationFrame`

Синхронізує візуальне оновлення з браузерним кадром.

    event
      ↓
    requestAnimationFrame
      ↓
    browser frame
      ↓
    update UI

Для анімацій і плавного drag `requestAnimationFrame` часто природніше підходить, ніж throttle з фіксованим інтервалом.

---

# 16. Throttle vs Debounce

Це одна з найважливіших тем.

### Debounce

> Виконай після того, як події припинилися.

    event
    event
    event
    event
       ↓
    pause
       ↓
    callback()

### Throttle

> Виконуй не частіше заданого інтервалу.

    event
    event
    event
       ↓
    callback()

    event
    event
       ↓
    wait

    event
       ↓
    callback()

---

# 17. Головна різниця

Запам'ятай:

> **Debounce = почекай.**

> **Throttle = обмеж частоту.**

Приклад пошуку:

    user types
        ↓
    J
    Ja
    Jav
    Java
        ↓
    wait
        ↓
    search()

Тут добре підходить:

    Debounce

Приклад scrolling:

    scroll
    scroll
    scroll
    scroll
    scroll
        ↓
    callback
        ↓
    callback
        ↓
    callback

Тут може підійти:

    Throttle

---

# 18. Таблиця Debounce / Throttle

| Характеристика | Debounce | Throttle |
|---|---|---|
| Основна ідея | Чекати паузу | Обмежити частоту |
| Під час потоку подій | Чекає | Виконує періодично |
| Пошук | ✅ | Зазвичай ні |
| Autocomplete | ✅ | Зазвичай ні |
| Autosave | ✅ | Зазвичай ні |
| Scroll | Іноді | ✅ |
| Mousemove | Іноді | ✅ |
| Drag | Іноді | ✅ |
| Resize | Часто | Іноді |
| API search | ✅ | Рідше |

---

# 19. Leading

Throttle часто має поведінку:

    leading

Це означає:

> виконати callback на початку інтервалу.

Наприклад:

    event
      ↓
    callback()

Потім:

    event
    event
    event
      ↓
    ignore

Після завершення інтервалу:

    event
      ↓
    callback()

Базовий throttle через `waiting` саме так і працює.

---

# 20. Trailing

Іноді потрібно виконати останній виклик після завершення інтервалу.

Це:

    trailing

Наприклад:

    event
    event
    event
    event
       ↓
    wait
       ↓
    callback(last arguments)

Це корисно, якщо остання подія містить важливий стан.

---

# 21. Leading + Trailing

Більш повний throttle може підтримувати обидва режими:

    leading
    trailing

Тобто:

    перша подія
        ↓
    callback()

    багато подій
        ↓
    waiting

    остання подія
        ↓
    callback()

Такий throttle складніший, але він часто зустрічається в готових utility-бібліотеках.

---

# 22. Навчальна реалізація Leading + Trailing

Один із варіантів:

    function throttle(callback, delay) {
        let timer = null;
        let lastArgs = null;

        return function (...args) {
            if (!timer) {
                callback(...args);

                timer = setTimeout(() => {
                    timer = null;

                    if (lastArgs) {
                        callback(...lastArgs);
                        lastArgs = null;
                    }
                }, delay);

                return;
            }

            lastArgs = args;
        };
    }

Це вже більш складна реалізація.

Для початку важливіше зрозуміти базовий принцип, ніж запам'ятати складну реалізацію.

---

# 23. Throttle з `this`

Якщо throttle повинен зберігати контекст `this`:

    function throttle(callback, delay) {
        let waiting = false;

        return function (...args) {
            if (waiting) {
                return;
            }

            callback.apply(this, args);

            waiting = true;

            setTimeout(() => {
                waiting = false;
            }, delay);
        };
    }

Тут:

    callback.apply(this, args);

дозволяє передати:

    this
    args

---

# 24. Чому тут використовується Closure?

Маємо:

    function throttle(callback, delay) {
        let waiting = false;

        return function (...args) {
            ...
        };
    }

Повернута функція повинна пам'ятати:

    waiting
    callback
    delay

Після завершення `throttle()` ці змінні не зникають, тому що внутрішня функція має до них доступ.

Це і є:

    closure

Throttle — ще один практичний приклад замикання.

---

# 25. Throttle і `setTimeout`

Базовий throttle можна побудувати через:

    setTimeout()

Наприклад:

    function throttle(callback, delay) {
        let waiting = false;

        return function (...args) {
            if (waiting) {
                return;
            }

            callback(...args);

            waiting = true;

            setTimeout(() => {
                waiting = false;
            }, delay);
        };
    }

Тут `setTimeout()` не запускає callback після delay.

Він використовується для того, щоб **відкрити можливість нового виклику**.

Це важливий момент.

---

# 26. Debounce і Throttle використовують таймер по-різному

### Debounce

Таймер відповідає за запуск callback:

    clearTimeout(timer);

    timer = setTimeout(() => {
        callback();
    }, delay);

### Throttle

Таймер відповідає за завершення періоду блокування:

    callback();

    waiting = true;

    setTimeout(() => {
        waiting = false;
    }, delay);

Тому механізм схожий, але логіка різна.

---

# 27. Timestamp-підхід

Throttle можна реалізувати без `setTimeout()`:

    function throttle(callback, delay) {
        let lastTime = 0;

        return function (...args) {
            const now = Date.now();

            if (now - lastTime < delay) {
                return;
            }

            lastTime = now;

            callback(...args);
        };
    }

Перевага:

- дуже проста логіка;
- легко зрозуміти;
- не потрібен timer для блокування.

Особливість:

- остання подія може бути пропущена.

Тобто це фактично leading-only throttle.

---

# 28. Чому остання подія може бути важливою?

Уявімо:

    mousemove
      ↓
    position = 100

    mousemove
      ↓
    position = 150

    mousemove
      ↓
    position = 200

Якщо остання подія припала на період блокування, timestamp-throttle може її проігнорувати.

Тому в деяких задачах потрібен:

    trailing

щоб після завершення інтервалу обробити останні дані.

---

# 29. Throttle і API

Throttle також можна використовувати з API, але потрібно добре розуміти задачу.

Наприклад:

    user action
        ↓
    event
        ↓
    throttle
        ↓
    fetch()
        ↓
    API

Це може бути корисно, коли API потрібно викликати регулярно під час тривалої серії подій.

Але для пошуку:

    input
    ↓
    fetch

частіше логічніший:

    Debounce

---

# 30. Throttle і backend

Throttle на frontend може зменшити кількість HTTP-запитів.

Наприклад:

    Frontend
        ↓
    many events
        ↓
    throttle
        ↓
    fewer requests
        ↓
    Backend

Але backend не повинен покладатися на frontend throttle.

Клієнт можна обійти.

Backend повинен самостійно контролювати:

    validation
    rate limiting
    authentication
    authorization
    request limits

---

# 31. Throttle ≠ Rate Limiting

Ці поняття схожі, але не однакові.

### Throttle

Зазвичай контролює частоту виконання функції на конкретному клієнті.

    JavaScript
        ↓
    throttle
        ↓
    callback

### Rate limiting

Контролює кількість запитів на рівні сервера/API.

    Client
        ↓
    API
        ↓
    rate limit
        ↓
    server

Rate limiting є серверним механізмом контролю навантаження.

---

# 32. Throttle для `wheel`

Подія:

    wheel

може генерувати багато повідомлень.

Наприклад:

    const handleWheel = throttle(event => {
        console.log(event.deltaY);
    }, 100);

    window.addEventListener('wheel', handleWheel);

Але для складної візуальної роботи варто подумати про `requestAnimationFrame`.

---

# 33. Throttle для `pointermove`

Сучасні інтерфейси часто використовують:

    pointermove

Наприклад:

    const handlePointerMove = throttle(event => {
        console.log(
            event.clientX,
            event.clientY
        );
    }, 50);

    document.addEventListener(
        'pointermove',
        handlePointerMove
    );

---

# 34. Throttle для drag-and-drop

У drag-інтерфейсі може бути багато подій:

    pointerdown
    pointermove
    pointermove
    pointermove
    pointermove
    pointerup

Throttle може зменшити кількість обробок:

    pointermove
        ↓
    throttle
        ↓
    updatePosition()

Але якщо мета — максимально плавний рух елемента, варто розглянути:

    requestAnimationFrame

бо він спеціально призначений для синхронізації візуальних оновлень із кадрами браузера.

---

# 35. Throttle vs requestAnimationFrame

### Throttle

Наприклад:

    100ms

це приблизно:

    10 викликів/секунду

### `requestAnimationFrame`

Виклик прив'язаний до циклу візуального оновлення браузера.

На дисплеї 60Hz це приблизно:

    60 кадрів/секунду

На 120Hz:

    приблизно 120 кадрів/секунду

Але `requestAnimationFrame` не означає гарантовану частоту кадрів.

Браузер сам визначає, коли виконувати callback перед наступним repaint.

---

# 36. Який інструмент вибрати?

Запитай себе:

### Мені потрібен результат після паузи?

    → Debounce

### Мені потрібно реагувати регулярно під час потоку подій?

    → Throttle

### Мені потрібно плавно оновлювати UI?

    → requestAnimationFrame

Наприклад:

    Search
        → Debounce

    Scroll analytics
        → Throttle

    Drag animation
        → requestAnimationFrame

---

# 37. Типова помилка №1 — викликати callback кожного разу

Неправильно:

    function throttle(callback, delay) {
        return function (...args) {
            callback(...args);
        };
    }

Це взагалі не throttle.

Callback викликається на кожну подію.

---

# 38. Типова помилка №2 — створювати throttle всередині listener

Неправильно:

    window.addEventListener('scroll', event => {
        const throttled = throttle(() => {
            console.log('scroll');
        }, 100);

        throttled();
    });

Проблема така сама, як у debounce:

кожна подія створює новий throttle.

Правильно:

    const throttledScroll = throttle(() => {
        console.log('scroll');
    }, 100);

    window.addEventListener('scroll', throttledScroll);

Throttle створюється один раз.

---

# 39. Типова помилка №3 — занадто маленький delay

Наприклад:

    throttle(callback, 1);

Якщо подія виникає дуже часто, такий throttle може майже не дати потрібного ефекту.

Значення потрібно вибирати відповідно до задачі.

---

# 40. Типова помилка №4 — занадто великий delay

Наприклад:

    throttle(callback, 2000);

Тепер UI може реагувати лише раз на 2 секунди.

Для scrolling це може виглядати неприродно.

Throttle повинен відповідати UX.

---

# 41. Типова помилка №5 — використовувати Throttle замість Debounce

Наприклад, пошук:

    input
    input
    input
    input

Throttle може відправити:

    search('j')
    search('ja')
    search('jav')
    ...

через певні інтервали.

А debounce дозволяє дочекатися:

    search('javascript')

Якщо потрібен саме фінальний результат після паузи:

    Debounce

---

# 42. Типова помилка №6 — використовувати Throttle для анімації

Наприклад:

    throttle(updatePosition, 100)

Для плавної анімації 100 мс — це приблизно:

    10 оновлень/секунду

Це може виглядати ривками.

Для візуальної анімації краще розглянути:

    requestAnimationFrame()

---

# 43. Типова помилка №7 — вважати Throttle захистом API

Frontend:

    throttle(fetchData, 1000)

не означає, що API захищене від:

    bots
    scripts
    direct HTTP requests

Throttle — це механізм поведінки конкретного клієнта.

Для API потрібен серверний захист.

---

# 44. Throttle з `cancel()`

У більш повній реалізації може знадобитися можливість скасувати заплановану роботу.

Наприклад:

    throttledFunction.cancel();

Це особливо корисно для компонентів, які можуть бути видалені з UI.

У простих навчальних реалізаціях `cancel()` можна додати пізніше.

---

# 45. Практичний приклад: Scroll Progress

HTML:

    <div id="progress"></div>

JavaScript:

    const progress = document.querySelector('#progress');

    const updateProgress = throttle(() => {
        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight;

        const windowHeight =
            window.innerHeight;

        const maxScroll =
            documentHeight - windowHeight;

        const percentage =
            (scrollTop / maxScroll) * 100;

        progress.style.width = `${percentage}%`;
    }, 50);

    window.addEventListener('scroll', updateProgress);

Тут throttle обмежує частоту розрахунків.

---

# 46. Практичний приклад: Scroll Indicator

Можна зробити індикатор читання:

    scroll
      ↓
    throttle 50ms
      ↓
    calculate progress
      ↓
    update UI

Наприклад:

    const updateReadingProgress = throttle(() => {
        const scrollTop = window.scrollY;

        const scrollHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            scrollTop / scrollHeight;

        console.log(progress);
    }, 50);

    window.addEventListener(
        'scroll',
        updateReadingProgress
    );

---

# 47. Практичний приклад: Mouse Position

    const showMousePosition = throttle(event => {
        console.log(
            `X: ${event.clientX}`,
            `Y: ${event.clientY}`
        );
    }, 100);

    document.addEventListener(
        'mousemove',
        showMousePosition
    );

Тепер координати обробляються контрольовано.

---

# 48. Практичний приклад: Resize

    const updateLayout = throttle(() => {
        console.log('Update layout');

        console.log(
            window.innerWidth,
            window.innerHeight
        );
    }, 100);

    window.addEventListener(
        'resize',
        updateLayout
    );

Throttle дозволяє реагувати під час resize, але не на кожну подію.

Якщо потрібно лише дочекатися завершення resize:

    debounce(updateLayout, 300)

може бути доречнішим.

---

# 49. Практичний приклад: API під час scrolling

Наприклад, умовний tracking:

    const sendScrollPosition = throttle(() => {
        const position = window.scrollY;

        fetch('/api/analytics/scroll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                position
            })
        });
    }, 1000);

    window.addEventListener(
        'scroll',
        sendScrollPosition
    );

Тут throttle може обмежити частоту відправки telemetry/analytics.

Але в реальному застосунку ще потрібно враховувати:

- batching;
- network failures;
- cancellation;
- page lifecycle;
- server-side rate limiting.

---

# 50. Throttle і продуктивність

Throttle може допомогти:

- зменшити кількість дорогих операцій;
- зменшити кількість DOM updates;
- зменшити кількість API-запитів;
- зменшити кількість обчислень;
- зробити UI стабільнішим.

Але:

> **Throttle не робить сам callback швидшим.**

Він лише контролює, **як часто callback запускається**.

---

# 51. Throttle і DOM

Якщо всередині callback змінюється DOM:

    element.style.width = ...

або:

    element.textContent = ...

Throttle може зменшити кількість оновлень.

Але потрібно також думати про те, **що саме** змінюється.

Для анімацій часто краще використовувати:

    transform
    opacity

замість частого оновлення властивостей, які можуть викликати layout.

---

# 52. Throttle не замінює оптимізацію DOM

Наприклад:

    throttle(() => {
        // дуже важка DOM-операція
    }, 100);

це все одно може бути дорого.

Throttle лише зменшує частоту:

    1000 calls
        ↓
    10 calls

але кожен із цих 10 викликів все одно може бути дорогим.

Тому потрібно оптимізувати:

    frequency
        +
    callback
        +
    DOM operations

---

# 53. Throttle і event listener

Типовий патерн:

    const throttledHandler = throttle(
        handler,
        100
    );

    element.addEventListener(
        'scroll',
        throttledHandler
    );

Тут важливо, що в `addEventListener()` передається саме повернута throttle-функція:

    throttledHandler

а не оригінальний:

    handler

---

# 54. Видалення event listener

Якщо потрібно видалити listener:

    element.removeEventListener(
        'scroll',
        throttledHandler
    );

Тому throttle-функцію потрібно зберегти:

    const throttledHandler = throttle(
        handler,
        100
    );

Не варто створювати нову throttle-функцію при `removeEventListener()`.

---

# 55. Debounce / Throttle як Higher-Order Functions

І `debounce`, і `throttle` є прикладами:

    Higher-Order Functions

Тому що вони:

> приймають функцію як аргумент і повертають нову функцію.

Наприклад:

    const throttledHandler =
        throttle(handler, 100);

Тут:

    throttle()

отримує:

    handler

і повертає:

    throttledHandler

---

# 56. Throttle і Closure — зв'язок із JavaScript

Ця тема об'єднує кілька важливих концепцій JavaScript:

    function
        ↓
    callback
        ↓
    higher-order function
        ↓
    closure
        ↓
    timer / timestamp
        ↓
    event handling

Тому Throttle — це не просто browser utility.

Він допомагає краще зрозуміти сам JavaScript.

---

# 57. 🧩 Алгоритм Throttle

### Крок 1

Створити стан:

    let waiting = false;

### Крок 2

При події перевірити:

    if (waiting) {
        return;
    }

### Крок 3

Виконати callback:

    callback(...args);

### Крок 4

Заблокувати повторний виклик:

    waiting = true;

### Крок 5

Після delay дозволити новий:

    setTimeout(() => {
        waiting = false;
    }, delay);

Отримуємо:

    event
      ↓
    можна?
      ↓
    callback()
      ↓
    блокування
      ↓
    wait
      ↓
    можна знову

---

# 58. Коротка реалізація для запам'ятовування

    function throttle(callback, delay) {
        let waiting = false;

        return function (...args) {
            if (waiting) {
                return;
            }

            callback(...args);

            waiting = true;

            setTimeout(() => {
                waiting = false;
            }, delay);
        };
    }

Використання:

    const throttledScroll = throttle(() => {
        console.log(window.scrollY);
    }, 100);

    window.addEventListener(
        'scroll',
        throttledScroll
    );

---

# 59. Альтернативна реалізація через час

    function throttle(callback, delay) {
        let lastTime = 0;

        return function (...args) {
            const now = Date.now();

            if (now - lastTime < delay) {
                return;
            }

            lastTime = now;

            callback(...args);
        };
    }

Використовуй цей варіант для розуміння ідеї:

    current time
        -
    previous time
        =
    elapsed time

Якщо:

    elapsed >= delay

можна виконати callback.

---

# 60. 📋 Throttle Cheat Sheet

    // Basic throttle

    function throttle(callback, delay) {
        let waiting = false;

        return function (...args) {
            if (waiting) {
                return;
            }

            callback(...args);

            waiting = true;

            setTimeout(() => {
                waiting = false;
            }, delay);
        };
    }


    // Usage

    const throttledHandler = throttle(
        handler,
        100
    );

    window.addEventListener(
        'scroll',
        throttledHandler
    );


    // Timestamp version

    function throttle(callback, delay) {
        let lastTime = 0;

        return function (...args) {
            const now = Date.now();

            if (now - lastTime < delay) {
                return;
            }

            lastTime = now;

            callback(...args);
        };
    }


    // With this

    function throttle(callback, delay) {
        let waiting = false;

        return function (...args) {
            if (waiting) {
                return;
            }

            callback.apply(this, args);

            waiting = true;

            setTimeout(() => {
                waiting = false;
            }, delay);
        };
    }

---

# 61. 🆚 Три інструменти

    Debounce
        ↓
    "Почекай, поки перестануть викликати"

    Throttle
        ↓
    "Не виконуй частіше, ніж дозволено"

    requestAnimationFrame
        ↓
    "Оновлюй UI у ритмі браузерного кадру"

Приклади:

    Search
        → Debounce

    Scroll tracking
        → Throttle

    Mouse tracking
        → Throttle

    Drag animation
        → requestAnimationFrame

    Autosave
        → Debounce

---

# 62. 🎯 Питання для співбесіди

### Початковий рівень

**1. Що таке throttle?**

Техніка, яка обмежує частоту виконання функції.

---

**2. Для чого використовується throttle?**

Щоб callback не виконувався занадто часто під час високочастотних подій.

Наприклад:

    scroll
    mousemove
    resize
    pointermove
    wheel

---

**3. На чому можна побудувати throttle?**

Наприклад, на:

    setTimeout()
    Date.now()
    closure

---

**4. Чим throttle відрізняється від debounce?**

Throttle дозволяє виконувати функцію періодично під час потоку подій.

Debounce чекає, поки події припиняться.

---

**5. Що означає "leading" у throttle?**

Виконання callback на початку періоду.

---

**6. Що означає "trailing"?**

Виконання останнього запланованого виклику після завершення періоду очікування.

---

### Junior

**7. Чому throttle потрібно створювати один раз?**

Щоб він зберігав свій внутрішній стан між викликами.

---

**8. Чому throttle використовує closure?**

Щоб зберігати:

    waiting
    lastTime
    timer

між викликами повернутої функції.

---

**9. Чому throttle підходить для scroll?**

Тому що `scroll` може генерувати багато подій, а нам часто потрібно лише періодично перевіряти позицію.

---

**10. Чи підходить throttle для пошуку?**

Зазвичай для пошуку краще підходить debounce, якщо потрібно виконати пошук після завершення введення.

---

**11. Чи можна використовувати throttle для API?**

Так. Наприклад, коли потрібно обмежити частоту запитів під час потоку подій.

---

**12. Чи захищає throttle backend?**

Ні. Frontend throttle можна обійти. Backend повинен мати власні механізми контролю.

---

### Практичний Full Stack

**13. Чим throttle відрізняється від rate limiting?**

Throttle зазвичай контролює частоту виконання на клієнті.

Rate limiting контролює кількість запитів на сервері/API.

---

**14. Чим throttle відрізняється від requestAnimationFrame?**

Throttle обмежує частоту за часовим інтервалом.

`requestAnimationFrame` синхронізує візуальне оновлення з браузерним циклом кадрів.

---

**15. Що краще для плавного drag?**

Для візуального оновлення часто природніше використовувати `requestAnimationFrame`, хоча throttle може бути корисним для інших операцій, пов'язаних із drag.

---

# 63. 🏋️ Практичні вправи

### Вправа 1 — Basic Throttle

Створи:

    throttle(callback, delay)

Перевір його на:

    console.log()

та великій кількості викликів.

---

### Вправа 2 — Scroll

Створи:

    window.addEventListener('scroll', ...)

та обмеж обробку:

    throttle(..., 100)

Виводь:

    window.scrollY

---

### Вправа 3 — Mousemove

Створи throttle для:

    mousemove

Виводь:

    clientX
    clientY

---

### Вправа 4 — Resize

Створи:

    resize
        ↓
    throttle
        ↓
    updateLayout()

Порівняй результат із debounce.

---

### Вправа 5 — Scroll Progress

Створи progress bar:

    scroll
      ↓
    throttle
      ↓
    calculate %
      ↓
    update width

---

### Вправа 6 — Leading

Реалізуй throttle, який виконує callback одразу на першій події.

---

### Вправа 7 — Trailing

Розшир throttle так, щоб остання подія не губилася.

---

### Вправа 8 — Cancel

Додай:

    throttledFunction.cancel();

який дозволяє скасувати заплановану trailing-операцію.

---

### Вправа 9 — Drag

Створи draggable element.

Порівняй три підходи:

    без throttle
    throttle
    requestAnimationFrame

Подивись, як змінюється плавність і кількість викликів.

---

# 64. 🛠️ Мініпроєкт

## Scroll Tracker

Створи маленький застосунок:

    User scrolls
          ↓
    scroll event
          ↓
    throttle 100ms
          ↓
    calculate position
          ↓
    update UI

### Мінімальна функціональність

- progress bar;
- поточний відсоток scrolling;
- `scrollY`;
- throttle;
- кнопка "Back to top".

Архітектура:

    Browser
       ↓
    scroll event
       ↓
    throttle
       ↓
    JavaScript
       ↓
    DOM
       ↓
    UI

---

# 65. 🔗 Зв'язок із попередніми темами

Структура розділу:

    06-timers-and-browser-apis
        │
        ├── 01-set-timeout-set-interval
        │       ↓
        │    setTimeout()
        │    setInterval()
        │
        ├── 02-requestAnimationFrame
        │       ↓
        │    animation
        │    rendering
        │
        ├── 03-debounce
        │       ↓
        │    wait for pause
        │
        └── 04-throttle
                ↓
             limit frequency

Debounce і Throttle логічно вивчати разом.

---

# 66. 🔄 Типовий Frontend потік

Наприклад, scrolling:

    Browser
       ↓
    scroll event
       ↓
    event listener
       ↓
    throttle
       ↓
    callback
       ↓
    calculate
       ↓
    DOM update

Для пошуку:

    Browser
       ↓
    input event
       ↓
    debounce
       ↓
    fetch
       ↓
    backend
       ↓
    database

Для анімації:

    Browser
       ↓
    interaction
       ↓
    requestAnimationFrame
       ↓
    update
       ↓
    browser render

---

# 67. 📚 Короткий підсумок

**Throttle** — це техніка обмеження частоти виконання функції.

Основна ідея:

    багато подій
        ↓
    throttle
        ↓
    callback
        ↓
    wait
        ↓
    callback
        ↓
    wait
        ↓
    callback

Базова реалізація:

    function throttle(callback, delay) {
        let waiting = false;

        return function (...args) {
            if (waiting) {
                return;
            }

            callback(...args);

            waiting = true;

            setTimeout(() => {
                waiting = false;
            }, delay);
        };
    }

Головна відмінність:

    Debounce
    → виконай після паузи

    Throttle
    → виконуй не частіше заданого інтервалу

    requestAnimationFrame
    → оновлюй UI синхронно з браузерним кадром

Головна фраза:

> **Throttle обмежує частоту виконання функції під час потоку подій.**

Для Full Stack JavaScript особливо корисно бачити зв'язок:

    Browser Event
        ↓
    Throttle
        ↓
    JavaScript
        ↓
    Fetch
        ↓
    Node.js / Express / NestJS
        ↓
    API
        ↓
    PostgreSQL

Throttle — це простий приклад того, як **керування частотою подій на frontend може впливати на кількість обчислень, DOM-оновлень та HTTP-запитів**.