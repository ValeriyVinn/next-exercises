# 03. Debounce

## 📌 Що таке Debounce?

**Debounce** — це техніка, яка дозволяє виконати функцію **не одразу**, а лише після того, як подія перестала відбуватися протягом заданого часу.

Простими словами:

> **Debounce чекає, поки користувач перестане щось робити, і тільки тоді запускає функцію.**

Наприклад, користувач вводить текст у поле пошуку:

    h
    he
    hel
    hell
    hello

Без debounce функція пошуку може виконатися **5 разів**.

З debounce ми можемо сказати:

> "Почекай 300 мс після останнього введеного символу. Якщо користувач більше нічого не вводив — виконай пошук."

Тоді функція виконається лише один раз:

    hello → 300 ms → search()

---

# 🎯 Навіщо потрібен Debounce?

Debounce особливо корисний для подій, які можуть виникати дуже часто:

- `input`
- `keyup`
- `keydown`
- `resize`
- `scroll`
- `mousemove`
- пошук
- фільтрація
- автозбереження
- перевірка форми
- запити до API
- зміна розміру вікна
- live search
- autocomplete

Наприклад:

    input → input → input → input → input → ...

Замість виконання:

    search()
    search()
    search()
    search()
    search()

можна зробити:

    input → input → input → input → input
                                      ↓
                                   wait 300ms
                                      ↓
                                   search()

---

# 🧠 Головна ідея

Debounce використовує таймер.

Кожного разу, коли приходить нова подія:

1. попередній таймер скасовується;
2. створюється новий таймер;
3. якщо протягом заданого часу нової події немає — функція виконується.

Схема:

    event
      ↓
    clearTimeout()
      ↓
    setTimeout()
      ↓
    event
      ↓
    clearTimeout()
      ↓
    setTimeout()
      ↓
    event
      ↓
    clearTimeout()
      ↓
    setTimeout()
      ↓
    немає нової події
      ↓
    function()

Тобто:

> **Кожна нова подія "скидає" таймер.**

---

# 🔑 Основні поняття

| Поняття | Значення |
|---|---|
| Debounce | Відкладання виконання до завершення серії подій |
| `setTimeout()` | Створює затримку |
| `clearTimeout()` | Скасовує попередній таймер |
| delay | Час очікування |
| event | Подія, яка запускає debounce |
| callback | Функція, яку потрібно виконати |
| timer ID | Ідентифікатор таймера |

---

# 1. Простий приклад без Debounce

Уявімо поле пошуку:

    const input = document.querySelector('#search');

    input.addEventListener('input', () => {
        console.log('Search:', input.value);
    });

Якщо користувач вводить:

    JavaScript

подія `input` виникне приблизно для кожної зміни:

    J
    Ja
    Jav
    Java
    JavaS
    JavaSc
    JavaScr
    JavaScri
    JavaScrip
    JavaScript

Функція буде виконуватися багато разів.

Якщо всередині функції знаходиться API-запит, це може створити зайве навантаження.

---

# 2. Простий Debounce вручну

Почнемо з найпростішого варіанта:

    let timer;

    input.addEventListener('input', () => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            console.log('Search:', input.value);
        }, 300);
    });

Що відбувається?

Коли користувач вводить перший символ:

    input
      ↓
    setTimeout()
      ↓
    wait 300ms

Але якщо користувач вводить наступний символ раніше:

    input
      ↓
    clearTimeout()
      ↓
    setTimeout()
      ↓
    wait 300ms

Наступний символ:

    input
      ↓
    clearTimeout()
      ↓
    setTimeout()
      ↓
    wait 300ms

І так далі.

Тільки коли користувач перестає вводити текст:

    input
      ↓
    wait 300ms
      ↓
    callback()

---

# 3. `clearTimeout()` — основа Debounce

Найважливіша частина debounce:

    clearTimeout(timer);

Вона скасовує попередній таймер.

Наприклад:

    let timer;

    timer = setTimeout(() => {
        console.log('A');
    }, 300);

    clearTimeout(timer);

У результаті `A` не буде виведено, якщо таймер було скасовано до його виконання.

---

# 4. Базова функція Debounce

Зробимо універсальну функцію:

    function debounce(callback, delay) {
        let timer;

        return function (...args) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    }

Тепер можна створити debounce-функцію:

    const debouncedSearch = debounce(() => {
        console.log('Search');
    }, 300);

І використовувати її:

    input.addEventListener('input', debouncedSearch);

---

# 5. Як працює `debounce()` всередині?

Розберемо поступово.

### Крок 1. Передаємо функцію

    debounce(callback, 300);

Наприклад:

    function search() {
        console.log('Search');
    }

    const debouncedSearch = debounce(search, 300);

---

### Крок 2. Створюється змінна `timer`

    function debounce(callback, delay) {
        let timer;

        return function (...args) {
            ...
        };
    }

`timer` знаходиться всередині `debounce()`.

Це важливо.

Він зберігається завдяки **closure**.

---

### Крок 3. Повертається нова функція

    return function (...args) {
        ...
    };

Тобто:

    const debouncedSearch = debounce(search, 300);

`debouncedSearch` — це не `search`.

Це нова функція, яка контролює момент виклику `search`.

---

### Крок 4. Скасовується попередній таймер

    clearTimeout(timer);

---

### Крок 5. Створюється новий

    timer = setTimeout(() => {
        callback(...args);
    }, delay);

---

# 6. Closure у Debounce

Debounce — хороший практичний приклад **замикання (closure)**.

Маємо:

    function debounce(callback, delay) {
        let timer;

        return function (...args) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    }

Зовнішня функція завершила роботу:

    debounce(...)

Але внутрішня функція все ще має доступ до:

    timer
    callback
    delay

Тому `timer` не втрачається між викликами.

---

# 7. Передача аргументів

Debounce повинен уміти передавати аргументи у callback.

Для цього використовуємо:

    ...args

Повна реалізація:

    function debounce(callback, delay) {
        let timer;

        return function (...args) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    }

Приклад:

    function search(value) {
        console.log('Search:', value);
    }

    const debouncedSearch = debounce(search, 300);

    debouncedSearch('Java');
    debouncedSearch('JavaScript');

У результаті після затримки:

    Search: JavaScript

буде виконано останній виклик.

---

# 8. Debounce для `input`

Практичний приклад.

HTML:

    <input id="search" type="text" placeholder="Search...">

JavaScript:

    const input = document.querySelector('#search');

    function search(value) {
        console.log('Searching for:', value);
    }

    function debounce(callback, delay) {
        let timer;

        return function (...args) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    }

    const debouncedSearch = debounce(search, 300);

    input.addEventListener('input', event => {
        debouncedSearch(event.target.value);
    });

Тепер `search()` не буде викликатися після кожного символу.

---

# 9. Debounce + API

Один із найпоширеніших випадків.

Без debounce:

    input
      ↓
    fetch('/api/search?q=j')
      ↓
    input
      ↓
    fetch('/api/search?q=ja')
      ↓
    input
      ↓
    fetch('/api/search?q=jav')
      ↓
    input
      ↓
    fetch('/api/search?q=java')
      ↓
    ...

Це може створити багато непотрібних запитів.

З debounce:

    input
      ↓
    input
      ↓
    input
      ↓
    input
      ↓
    300ms без введення
      ↓
    fetch('/api/search?q=java')

Наприклад:

    async function search(value) {
        if (!value.trim()) return;

        const response = await fetch(
            `/api/search?q=${encodeURIComponent(value)}`
        );

        const data = await response.json();

        console.log(data);
    }

    const debouncedSearch = debounce(search, 300);

    input.addEventListener('input', event => {
        debouncedSearch(event.target.value);
    });

---

# 10. `encodeURIComponent()`

При роботі з пошуком значення потрібно правильно вставляти в URL.

Наприклад:

    const value = 'hello world';

    const encoded = encodeURIComponent(value);

    console.log(encoded);

Результат:

    hello%20world

Тому:

    `/api/search?q=${encodeURIComponent(value)}`

безпечніше, ніж просто:

    `/api/search?q=${value}`

---

# 11. Debounce для `resize`

Подія `resize` може виникати дуже часто.

Без debounce:

    window.addEventListener('resize', () => {
        console.log('resize');
    });

Під час зміни розміру вікна callback може виконуватися багато разів.

З debounce:

    const handleResize = debounce(() => {
        console.log('Resize finished');
    }, 300);

    window.addEventListener('resize', handleResize);

Тепер функція виконається приблизно через 300 мс після того, як користувач перестав змінювати розмір вікна.

---

# 12. Debounce для `scroll`

Наприклад:

    const handleScroll = debounce(() => {
        console.log('Scroll finished');
    }, 200);

    window.addEventListener('scroll', handleScroll);

Але важливо:

> Debounce не завжди підходить для `scroll`.

Якщо потрібно реагувати **під час самого scrolling**, часто краще використовувати `throttle`.

---

# 13. Debounce vs Throttle

Це два різні підходи.

### Debounce

> Виконай після того, як події припинилися.

    event event event event event
                              ↓
                            wait
                              ↓
                          function()

### Throttle

> Виконуй не частіше, ніж один раз за певний проміжок часу.

    event event event event event event
      ↓
    function
             ↓
           wait
             ↓
           function
                    ↓
                  wait
                    ↓
                  function

---

# 14. Коли використовувати Debounce?

Debounce добре підходить, коли важливий **останній результат**.

Наприклад:

- пошук;
- autocomplete;
- фільтрація;
- валідація після введення;
- автозбереження;
- resize;
- API-запити;
- перевірка username;
- перевірка email;
- пошук товарів.

Приклад:

    користувач вводить:

    j
    ja
    jav
    java
    javasc
    javascript

Нам найчастіше потрібен результат тільки для:

    javascript

Тому Debounce підходить.

---

# 15. Коли Debounce не підходить?

Якщо потрібно реагувати регулярно під час потоку подій.

Наприклад:

    scroll
    mousemove
    drag
    pointermove

Якщо потрібно виконувати функцію під час процесу, а не після його завершення, часто краще використати `throttle` або `requestAnimationFrame`.

---

# 16. Debounce з `this`

Універсальна реалізація повинна також зберігати контекст `this`.

Можна написати:

    function debounce(callback, delay) {
        let timer;

        return function (...args) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                callback.apply(this, args);
            }, delay);
        };
    }

Тут:

    this

відноситься до контексту виклику повернутої функції.

---

# 17. Debounce з `call`

Інший варіант:

    function debounce(callback, delay) {
        let timer;

        return function (...args) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                callback.call(this, ...args);
            }, delay);
        };
    }

Обидва варіанти дозволяють зберегти `this`.

---

# 18. Debounce з `apply`

Також можна:

    function debounce(callback, delay) {
        let timer;

        return function (...args) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                callback.apply(this, args);
            }, delay);
        };
    }

`apply()` зручний, коли аргументи вже знаходяться в масиві:

    args

---

# 19. Простий варіант для навчання

Для початку не обов'язково одразу використовувати `this`, `call` або `apply`.

Для більшості простих задач достатньо:

    function debounce(callback, delay) {
        let timer;

        return function (...args) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    }

Це хороший базовий варіант для розуміння принципу.

---

# 20. Debounce з `leading`

Існує інший варіант поведінки.

Звичайний debounce запускає callback **після** паузи.

Це називається:

    trailing

Схема:

    click
      ↓
    wait 300ms
      ↓
    callback()

Але іноді потрібно виконати функцію **одразу**, а потім ігнорувати наступні події протягом заданого часу.

Це називають:

    leading

Схема:

    click
      ↓
    callback() ← одразу

    click
    click
    click
      ↓
    ignore

---

# 21. Leading і Trailing

### Trailing

Функція виконується після завершення серії подій.

    event
    event
    event
    event
       ↓
    pause
       ↓
    callback()

### Leading

Функція виконується на початку.

    event
       ↓
    callback()

    event
    event
    event
       ↓
    ignore

Можливі також реалізації, які підтримують і `leading`, і `trailing`.

---

# 22. Простий Debounce з `leading`

Приклад навчальної реалізації:

    function debounce(callback, delay, immediate = false) {
        let timer;

        return function (...args) {
            const callNow = immediate && !timer;

            clearTimeout(timer);

            timer = setTimeout(() => {
                timer = null;

                if (!immediate) {
                    callback(...args);
                }
            }, delay);

            if (callNow) {
                callback(...args);
            }
        };
    }

Використання:

    const handleClick = debounce(() => {
        console.log('Clicked');
    }, 1000, true);

---

# 23. Debounce для кнопки

Наприклад, користувач багато разів натискає кнопку.

    const button = document.querySelector('#button');

    const handleClick = debounce(() => {
        console.log('Action');
    }, 500);

    button.addEventListener('click', handleClick);

Якщо натискання відбуваються швидко:

    click
    click
    click
    click

callback виконається після паузи.

Але для захисту від повторної відправки форми часто краще використовувати іншу логіку:

- блокування кнопки;
- стан `isSubmitting`;
- серверна ідемпотентність;
- або спеціальний debounce/throttle залежно від задачі.

Debounce — це не універсальний захист від повторної відправки даних.

---

# 24. Debounce і форма

Наприклад, перевірка username:

    const usernameInput = document.querySelector('#username');

    function checkUsername(username) {
        console.log('Checking:', username);
    }

    const debouncedCheck = debounce(checkUsername, 500);

    usernameInput.addEventListener('input', event => {
        debouncedCheck(event.target.value);
    });

Тепер сервер не отримує запит після кожного символу.

---

# 25. Debounce і автозбереження

Наприклад, textarea:

    const textarea = document.querySelector('#editor');

    function saveText(text) {
        console.log('Saving:', text);
    }

    const debouncedSave = debounce(saveText, 1000);

    textarea.addEventListener('input', event => {
        debouncedSave(event.target.value);
    });

Логіка:

    user types
        ↓
    timer reset
        ↓
    user types
        ↓
    timer reset
        ↓
    user types
        ↓
    timer reset
        ↓
    user stops
        ↓
    1000ms
        ↓
    save

Це типовий сценарій для автозбереження.

---

# 26. Проблема "старих" API-запитів

Debounce зменшує кількість запитів, але **не гарантує**, що старий запит не завершиться пізніше за новий.

Наприклад:

    request A → сервер
    request B → сервер

Може статися:

    B finished
    A finished

Якщо просто показувати кожну відповідь, старий результат `A` може перезаписати новий результат `B`.

Тому для складніших пошукових інтерфейсів може знадобитися:

    AbortController

Наприклад:

    let controller;

    async function search(value) {
        controller?.abort();

        controller = new AbortController();

        const response = await fetch(
            `/api/search?q=${encodeURIComponent(value)}`,
            {
                signal: controller.signal
            }
        );

        return response.json();
    }

Debounce і `AbortController` вирішують **різні проблеми**:

    Debounce
    → зменшує кількість запитів

    AbortController
    → дозволяє скасувати непотрібний запит

---

# 27. Debounce + AbortController

У складнішому пошуку вони можуть працювати разом:

    let controller;

    async function search(value) {
        if (!value.trim()) return;

        controller?.abort();

        controller = new AbortController();

        try {
            const response = await fetch(
                `/api/search?q=${encodeURIComponent(value)}`,
                {
                    signal: controller.signal
                }
            );

            const data = await response.json();

            console.log(data);
        } catch (error) {
            if (error.name === 'AbortError') {
                return;
            }

            console.error(error);
        }
    }

    const debouncedSearch = debounce(search, 300);

    input.addEventListener('input', event => {
        debouncedSearch(event.target.value);
    });

Тут:

    Debounce
        ↓
    не відправляє запит після кожного символу

    AbortController
        ↓
    скасовує попередній запит, якщо він більше не потрібен

---

# 28. Debounce не прискорює функцію

Важливо розуміти:

> Debounce не робить саму функцію швидшою.

Він змінює **момент і кількість її викликів**.

Без debounce:

    function()
    function()
    function()
    function()
    function()

З debounce:

    function()

Тобто debounce оптимізує частоту запуску, а не продуктивність самої функції.

---

# 29. Debounce не є асинхронністю

Debounce часто використовується разом з:

- `fetch`;
- `async/await`;
- Promise.

Але сам Debounce не є Promise і не є `async`.

Наприклад:

    function debounce(callback, delay) {
        let timer;

        return function (...args) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    }

Це звичайна функція, яка використовує:

    setTimeout()
    clearTimeout()
    closure

---

# 30. Debounce і `setTimeout`

Debounce безпосередньо побудований на таймерах.

Основний механізм:

    clearTimeout(timer);

    timer = setTimeout(() => {
        callback();
    }, delay);

Тому важливо добре розуміти попередню тему:

    01-set-timeout-set-interval

---

# 31. Debounce і `requestAnimationFrame`

`requestAnimationFrame` і debounce — різні інструменти.

### Debounce

Потрібно:

> виконати один раз після паузи.

Наприклад:

    search
    validation
    autocomplete
    autosave

### `requestAnimationFrame`

Потрібно:

> синхронізувати візуальне оновлення з браузерним кадром.

Наприклад:

    animation
    drag
    visual movement
    canvas
    interactive UI

---

# 32. Debounce і Throttle — головна різниця

| Debounce | Throttle |
|---|---|
| Чекає паузу | Обмежує частоту |
| Виконує після серії подій | Виконує регулярно під час серії |
| Добре для пошуку | Добре для scroll |
| Добре для autocomplete | Добре для mousemove |
| Добре для autosave | Добре для drag |
| Останній виклик | Регулярні виклики |

Запам'ятати можна так:

> **Debounce = "почекай".**

> **Throttle = "не так часто".**

---

# 33. Типова помилка №1 — не використовувати `clearTimeout`

Неправильно:

    function debounce(callback, delay) {
        return function (...args) {
            setTimeout(() => {
                callback(...args);
            }, delay);
        };
    }

Тут кожен виклик створює новий таймер:

    input
    → setTimeout()

    input
    → setTimeout()

    input
    → setTimeout()

У результаті callback все одно буде виконаний багато разів.

Правильно:

    function debounce(callback, delay) {
        let timer;

        return function (...args) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    }

---

# 34. Типова помилка №2 — створювати debounce всередині event listener

Неправильно:

    input.addEventListener('input', event => {
        const debouncedSearch = debounce(search, 300);

        debouncedSearch(event.target.value);
    });

Чому?

Кожна подія створює **новий debounce**.

Тобто кожен виклик отримує свій власний `timer`.

Правильно:

    const debouncedSearch = debounce(search, 300);

    input.addEventListener('input', event => {
        debouncedSearch(event.target.value);
    });

Debounce потрібно створити **один раз**, а потім багато разів викликати його повернуту функцію.

---

# 35. Типова помилка №3 — занадто великий delay

Наприклад:

    debounce(search, 5000);

Користувач перестав вводити текст і змушений чекати:

    5 секунд

Для пошуку це зазвичай відчувається повільно.

Значення delay залежить від задачі.

Наприклад:

    200ms
    300ms
    500ms
    1000ms

Не існує одного універсального значення.

---

# 36. Типова помилка №4 — використовувати Debounce всюди

Не потрібно автоматично додавати debounce до кожного `scroll`, `click` або `input`.

Потрібно спочатку запитати:

> Чи потрібен мені результат після паузи?

Якщо так:

    Debounce

Якщо потрібна регулярна реакція під час подій:

    Throttle

Якщо потрібне плавне візуальне оновлення:

    requestAnimationFrame

---

# 37. Типова помилка №5 — плутати delay з точним часом

Якщо написано:

    setTimeout(callback, 300);

це не означає:

> callback гарантовано виконається рівно через 300 мс.

Це означає приблизно:

> callback не буде виконано раніше заданої затримки, але фактичний момент виконання залежить від роботи браузера та event loop.

Тому debounce:

    debounce(search, 300)

означає приблизно:

> виконати після того, як минуло не менше 300 мс без нового виклику.

---

# 38. Повна базова реалізація

Універсальний навчальний варіант:

    function debounce(callback, delay) {
        let timer;

        return function (...args) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    }

Використання:

    function search(value) {
        console.log('Search:', value);
    }

    const debouncedSearch = debounce(search, 300);

    debouncedSearch('j');
    debouncedSearch('ja');
    debouncedSearch('jav');
    debouncedSearch('java');

Після паузи буде:

    Search: java

---

# 39. Повна версія із `this`

Більш універсальна реалізація:

    function debounce(callback, delay) {
        let timer;

        return function (...args) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                callback.apply(this, args);
            }, delay);
        };
    }

Це вже хороший варіант для розуміння того, як debounce реалізують як утиліту.

---

# 40. Очищення Debounce

Іноді корисно мати можливість примусово скасувати запланований callback.

Наприклад:

    function debounce(callback, delay) {
        let timer;

        function debounced(...args) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                callback(...args);
            }, delay);
        }

        debounced.cancel = function () {
            clearTimeout(timer);
            timer = null;
        };

        return debounced;
    }

Тепер:

    const debouncedSearch = debounce(search, 300);

можна скасувати:

    debouncedSearch.cancel();

Це корисно, наприклад, коли компонент або UI-елемент більше не потрібен.

---

# 41. Debounce з `cancel()`

Повний приклад:

    function debounce(callback, delay) {
        let timer;

        function debounced(...args) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                callback(...args);
            }, delay);
        }

        debounced.cancel = function () {
            clearTimeout(timer);
            timer = null;
        };

        return debounced;
    }

Використання:

    const debouncedSave = debounce(saveText, 1000);

    textarea.addEventListener('input', event => {
        debouncedSave(event.target.value);
    });

Якщо потрібно скасувати:

    debouncedSave.cancel();

---

# 42. Чому `timer` потрібно зберігати?

Тому що `clearTimeout()` повинен знати, який таймер скасувати.

    const timer = setTimeout(...);

    clearTimeout(timer);

У debounce:

    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(...);
    };

Тому кожен новий виклик знає про попередній таймер.

---

# 43. Візуальна модель Debounce

Уявімо `delay = 300ms`.

    0ms      input
             ↓
           timer

    100ms    input
             ↓
           cancel timer
             ↓
           new timer

    200ms    input
             ↓
           cancel timer
             ↓
           new timer

    300ms    input
             ↓
           cancel timer
             ↓
           new timer

    600ms    немає input
             ↓
           300ms пройшло
             ↓
           callback()

Головна ідея:

    нова подія
        ↓
    скасувати старий timer
        ↓
    створити новий timer

---

# 44. Debounce у React / Next.js

У React принцип залишається таким самим.

Наприклад, концептуально:

    input
      ↓
    state
      ↓
    debounce
      ↓
    API request

Але в React потрібно враховувати життєвий цикл компонентів, cleanup і залежності.

У простому JavaScript:

    const debouncedSearch = debounce(search, 300);

У React не варто бездумно створювати новий debounce при кожному render.

Для React зазвичай використовують:

- `useMemo`;
- `useCallback`;
- `useEffect`;
- cleanup;
- або готові debounce hooks/utilities.

Головний принцип при цьому не змінюється:

> **Debounce повинен зберігати свій timer між викликами.**

---

# 45. Debounce у Full Stack застосунку

Типова архітектура пошуку:

    User
      ↓
    Input
      ↓
    Debounce 300ms
      ↓
    fetch()
      ↓
    Node / Express / NestJS
      ↓
    PostgreSQL
      ↓
    Response
      ↓
    UI

Наприклад:

    "JavaScript"

замість десятка API-запитів:

    J
    Ja
    Jav
    Java
    JavaS
    ...

може призвести лише до одного запиту:

    JavaScript

Це особливо корисно при роботі з базою даних.

---

# 46. Debounce і PostgreSQL

Debounce сам по собі не оптимізує PostgreSQL.

Але він може зменшити кількість запитів:

    Frontend
        ↓
    debounce
        ↓
    API
        ↓
    PostgreSQL

Наприклад, без debounce:

    10 введених символів
        ↓
    10 HTTP requests
        ↓
    10 DB queries

З debounce:

    10 введених символів
        ↓
    1 HTTP request
        ↓
    1 DB query

Це може суттєво зменшити непотрібну роботу системи.

---

# 47. Debounce ≠ кешування

Це різні механізми.

### Debounce

Зменшує кількість викликів.

    input → debounce → request

### Cache

Дозволяє повторно використати вже отриманий результат.

    request
      ↓
    cache
      ↓
    existing result

В реальному застосунку вони можуть використовуватися разом.

---

# 48. Debounce ≠ оптимізація backend

Debounce — це оптимізація поведінки клієнта.

Але backend все одно повинен бути готовий до:

- великої кількості запитів;
- повторних запитів;
- некоректних запитів;
- rate limiting;
- валідації;
- авторизації;
- конкурентних запитів.

Не можна покладатися на debounce як на механізм безпеки.

---

# 49. Debounce і безпека

Debounce не захищає API від:

- ботів;
- спаму;
- DDoS;
- ручних HTTP-запитів;
- обхідних клієнтів.

Це лише UX/performance-техніка на frontend.

Backend повинен самостійно забезпечувати:

    validation
    authentication
    authorization
    rate limiting
    input sanitization
    database protection

---

# 50. Практичний приклад: пошук

HTML:

    <input
        id="search"
        type="search"
        placeholder="Search..."
    >

JavaScript:

    const input = document.querySelector('#search');

    function debounce(callback, delay) {
        let timer;

        return function (...args) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    }

    function search(value) {
        console.log(`Searching for: ${value}`);
    }

    const debouncedSearch = debounce(search, 300);

    input.addEventListener('input', event => {
        debouncedSearch(event.target.value);
    });

---

# 51. Практичний приклад: debounce + fetch

    const input = document.querySelector('#search');

    function debounce(callback, delay) {
        let timer;

        return function (...args) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    }

    async function search(value) {
        if (!value.trim()) {
            return;
        }

        const response = await fetch(
            `/api/search?q=${encodeURIComponent(value)}`
        );

        const data = await response.json();

        console.log(data);
    }

    const debouncedSearch = debounce(search, 300);

    input.addEventListener('input', event => {
        debouncedSearch(event.target.value);
    });

---

# 52. Практичний приклад: resize

    function updateLayout() {
        console.log('Layout updated');
    }

    const debouncedResize = debounce(updateLayout, 300);

    window.addEventListener('resize', debouncedResize);

Тепер `updateLayout()` запускається після паузи у resize-подіях.

---

# 53. Практичний приклад: autosave

    const textarea = document.querySelector('#editor');

    async function save(text) {
        console.log('Saving:', text);
    }

    const debouncedSave = debounce(save, 1000);

    textarea.addEventListener('input', event => {
        debouncedSave(event.target.value);
    });

Логіка:

    користувач пише
        ↓
    debounce
        ↓
    користувач продовжує писати
        ↓
    timer reset
        ↓
    користувач зупинився
        ↓
    1000ms
        ↓
    save()

---

# 54. Практичний приклад: фільтрація

Наприклад, користувач вводить фільтр:

    const filterInput = document.querySelector('#filter');

    function filterProducts(value) {
        console.log('Filtering:', value);
    }

    const debouncedFilter = debounce(filterProducts, 300);

    filterInput.addEventListener('input', event => {
        debouncedFilter(event.target.value);
    });

Якщо фільтрація складна або працює з сервером, debounce може бути корисним.

Для дуже простого локального масиву debounce може бути взагалі непотрібним.

---

# 55. Як вибрати `delay`?

Немає універсального значення.

Можна почати з:

    200–300ms

для швидкого пошуку.

Для більш повільних операцій:

    300–500ms

Для autosave:

    500–1500ms

Але це не правила.

Потрібно дивитися на UX конкретного застосунку.

---

# 56. Debounce і UX

Занадто маленький delay:

    50ms

може майже не зменшити кількість викликів.

Занадто великий:

    2000ms

може зробити інтерфейс повільним.

Тому debounce — це не тільки технічне питання.

Потрібно знайти баланс:

    менше requests
          +
    достатньо швидка реакція UI

---

# 57. Debounce і продуктивність

Debounce може допомогти:

- зменшити кількість API-запитів;
- зменшити кількість дорогих обчислень;
- зменшити кількість оновлень DOM;
- зменшити навантаження на сервер;
- покращити UX.

Але він не повинен використовуватися як заміна нормальній оптимізації.

Наприклад, якщо функція виконується 2 секунди, debounce не зробить її швидшою.

Потрібно оптимізувати саму функцію.

---

# 58. Коротка реалізація для запам'ятовування

    function debounce(callback, delay) {
        let timer;

        return function (...args) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    }

Запам'ятати логіку:

    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            callback(...args);
        }, delay);
    };

---

# 59. 🧩 Алгоритм Debounce

### Крок 1

Створити змінну для таймера:

    let timer;

### Крок 2

При кожному виклику скасувати старий таймер:

    clearTimeout(timer);

### Крок 3

Створити новий:

    timer = setTimeout(...);

### Крок 4

Після затримки виконати callback:

    callback(...args);

### Крок 5

Зберегти `timer` між викликами за допомогою closure.

---

# 60. 🧠 Що потрібно запам'ятати

### Debounce

    багато подій
        ↓
    скасування попереднього таймера
        ↓
    очікування
        ↓
    одна функція

### Основні інструменти

    setTimeout()
    clearTimeout()
    closure
    callback
    ...args

### Найчастіші сценарії

    input
    search
    autocomplete
    resize
    validation
    autosave
    API requests

### Головна фраза

> **Debounce виконує функцію після того, як потік подій припинився на заданий час.**

---

# 61. 📋 Debounce Cheat Sheet

    // Basic debounce

    function debounce(callback, delay) {
        let timer;

        return function (...args) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    }


    // Usage

    const debouncedSearch = debounce(search, 300);

    input.addEventListener('input', event => {
        debouncedSearch(event.target.value);
    });


    // With this

    function debounce(callback, delay) {
        let timer;

        return function (...args) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                callback.apply(this, args);
            }, delay);
        };
    }


    // Cancel

    debouncedSearch.cancel();


---

# 62. 🆚 Debounce / Throttle / requestAnimationFrame

| Інструмент | Основна ідея | Типова задача |
|---|---|---|
| Debounce | Виконати після паузи | Search |
| Throttle | Обмежити частоту | Scroll |
| `requestAnimationFrame` | Оновити UI перед кадром | Animation |

Можна запам'ятати:

    Debounce
    → "почекай"

    Throttle
    → "не частіше"

    requestAnimationFrame
    → "онови разом із кадром браузера"

---

# 63. 🎯 Питання для співбесіди

### Початковий рівень

**1. Що таке debounce?**

Техніка, яка відкладає виконання функції до моменту, коли події припиняться на заданий час.

---

**2. Для чого використовується debounce?**

Для зменшення кількості викликів функції під час частих подій.

Наприклад:

    input
    search
    resize
    autosave

---

**3. На чому базується debounce?**

На:

    setTimeout()
    clearTimeout()
    closure

---

**4. Чому потрібен `clearTimeout()`?**

Щоб скасувати попередній таймер при новій події.

---

**5. Що станеться без `clearTimeout()`?**

Кожна подія створить власний таймер, тому callback буде виконуватися багато разів.

---

### Junior

**6. Чому `timer` знаходиться всередині `debounce()`?**

Щоб завдяки closure зберігати його між викликами повернутої функції.

---

**7. Чому debounce потрібно створювати один раз?**

Щоб усі виклики використовували один і той самий `timer`.

---

**8. Чим debounce відрізняється від throttle?**

Debounce чекає паузу, а throttle обмежує частоту виконання.

---

**9. Чи є debounce асинхронністю?**

Сам debounce не є `async`/Promise-механізмом. Він використовує таймер для відкладеного виклику.

---

**10. Чи гарантує `setTimeout(..., 300)` виконання рівно через 300 мс?**

Ні. Це мінімальна затримка перед тим, як callback стане доступним для виконання.

---

### Практичний Full Stack

**11. Навіщо debounce у пошуку?**

Щоб не відправляти API-запит після кожного символу.

---

**12. Чи захищає debounce backend від великої кількості запитів?**

Ні. Це frontend-механізм. Backend все одно повинен мати власний захист.

---

**13. Чи вирішує debounce проблему старих API-відповідей?**

Не повністю. Для скасування непотрібних запитів можна використовувати `AbortController`.

---

**14. Чи можна використовувати debounce для scroll?**

Так, але він підходить лише тоді, коли потрібна реакція після завершення scrolling. Для постійної реакції під час scrolling частіше використовують throttle або `requestAnimationFrame`.

---

**15. Чому debounce використовує closure?**

Тому що потрібно зберігати `timer` між викликами функції.

---

# 64. 🏋️ Практичні вправи

### Вправа 1 — Basic Debounce

Створи:

    debounce(callback, delay)

Перевір:

    debouncedFunction();
    debouncedFunction();
    debouncedFunction();

Callback повинен виконатися один раз.

---

### Вправа 2 — Search

Створи:

    <input id="search">

При введенні тексту:

    input → debounce → console.log()

Затримка:

    300ms

---

### Вправа 3 — Resize

Створи debounce для:

    window.resize

Виводь:

    Resize finished

тільки після завершення зміни розміру.

---

### Вправа 4 — Autosave

Створи:

    <textarea>

Після припинення введення на:

    1000ms

виводь:

    Saving...

---

### Вправа 5 — API Search

Створи пошук:

    input
      ↓
    debounce 300ms
      ↓
    fetch()
      ↓
    API
      ↓
    results

---

### Вправа 6 — `cancel()`

Розшир функцію debounce так, щоб можна було:

    debouncedFunction.cancel();

скасувати запланований callback.

---

### Вправа 7 — Debounce + AbortController

Створи пошук, який:

    1. debounce API-запит;
    2. скасовує попередній fetch;
    3. показує тільки актуальний результат.

---

# 65. 🛠️ Мініпроєкт

## Live Search

Створи простий застосунок:

    Search
       ↓
    input
       ↓
    debounce 300ms
       ↓
    API
       ↓
    results

### Мінімальна функціональність

- поле пошуку;
- debounce;
- API-запит;
- список результатів;
- loading;
- error;
- empty state.

### Архітектура

    Frontend
        │
        ▼
    input
        │
        ▼
    debounce
        │
        ▼
    fetch
        │
        ▼
    Backend
        │
        ▼
    PostgreSQL
        │
        ▼
    JSON
        │
        ▼
    UI

Це вже хороший маленький Full Stack приклад використання debounce.

---

# 66. 🔗 Зв'язок з попередніми темами

Debounce спирається на:

    06-timers-and-browser-apis
        │
        ├── 01-set-timeout-set-interval
        │       ↓
        │    setTimeout()
        │    clearTimeout()
        │
        ├── 02-requestAnimationFrame
        │
        └── 03-debounce
                ↓
             closure
             timer
             events
             callback

Після debounce логічно вивчати:

    04-throttle

А потім:

    05-intersection-observer
    06-url-and-urlsearchparams

---

# 67. 📚 Короткий підсумок

**Debounce** — це спосіб контролювати часті виклики функції.

Основна ідея:

    event
      ↓
    clearTimeout()
      ↓
    setTimeout()
      ↓
    новий event?
      ↓
    так → повторити
      ↓
    ні
      ↓
    callback()

Головна реалізація:

    function debounce(callback, delay) {
        let timer;

        return function (...args) {
            clearTimeout(timer);

            timer = setTimeout(() => {
                callback(...args);
            }, delay);
        };
    }

Головне, що потрібно зрозуміти:

    Debounce
    = "не виконуй зараз"
    + "почекай"
    + "якщо подія повторилася — почни чекати знову"
    + "якщо подія припинилася — виконай callback"

Для Full Stack JavaScript особливо важливо розуміти зв'язок:

    Input
      ↓
    Debounce
      ↓
    Fetch
      ↓
    Node.js / Express / NestJS
      ↓
    PostgreSQL

Це один із простих, але дуже практичних прикладів того, як **browser API → JavaScript → HTTP → backend → database** працюють разом.