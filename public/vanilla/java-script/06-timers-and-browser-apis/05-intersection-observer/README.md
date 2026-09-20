# 05. Intersection Observer

## 📌 Що таке Intersection Observer?

**Intersection Observer** — це Browser API, який дозволяє відстежувати, коли елемент перетинається з видимою областю браузера або з іншим заданим контейнером.

Простими словами:

> **Intersection Observer повідомляє JavaScript, коли елемент з'явився у viewport або вийшов із нього.**

Наприклад, маємо:

    ┌─────────────────────────────┐
    │                             │
    │         VIEWPORT            │
    │                             │
    │       ┌──────────┐          │
    │       │  element │          │
    │       └──────────┘          │
    │                             │
    └─────────────────────────────┘

Коли користувач прокручує сторінку:

    scroll
      ↓
    element enters viewport
      ↓
    Intersection Observer
      ↓
    callback()

---

# 🎯 Навіщо потрібен Intersection Observer?

Найчастіше він використовується для:

- lazy loading зображень;
- lazy loading контенту;
- infinite scroll;
- animation on scroll;
- reveal animations;
- визначення видимості елемента;
- tracking visibility;
- активної навігації;
- завантаження наступної сторінки;
- відкладеного виконання важких операцій.

Наприклад:

    element outside viewport
          ↓
       nothing

    element enters viewport
          ↓
       callback()

---

# 🧠 Головна ідея

Раніше для перевірки видимості елемента можна було слухати:

    scroll

і постійно перевіряти:

    element.getBoundingClientRect()

Наприклад:

    window.addEventListener('scroll', () => {
        const rect = element.getBoundingClientRect();

        if (rect.top < window.innerHeight) {
            console.log('Visible');
        }
    });

Але такий підхід може призвести до великої кількості перевірок.

`IntersectionObserver` дозволяє сказати браузеру:

> "Слідкуй за цим елементом і повідом мене, коли його перетин із viewport зміниться."

---

# 🔑 Основні поняття

| Поняття | Значення |
|---|---|
| `IntersectionObserver` | API для спостереження за перетином елемента |
| `observe()` | Почати спостерігати за елементом |
| `unobserve()` | Припинити спостереження за елементом |
| `disconnect()` | Повністю припинити спостереження |
| `root` | Область, відносно якої визначається перетин |
| `rootMargin` | Додаткова область навколо root |
| `threshold` | Величина перетину, при якій запускається callback |
| `entry` | Інформація про конкретний спостережуваний елемент |
| `isIntersecting` | Чи перетинається елемент із root |
| `intersectionRatio` | Частка видимої області елемента |

---

# 1. Базовий синтаксис

Створюємо observer:

    const observer = new IntersectionObserver(
        callback
    );

Починаємо спостерігати:

    observer.observe(element);

Callback:

    function callback(entries) {
        console.log(entries);
    }

Повний приклад:

    const observer = new IntersectionObserver(entries => {
        console.log(entries);
    });

    observer.observe(element);

---

# 2. Простий приклад

HTML:

    <div id="box">
        Hello
    </div>

JavaScript:

    const box = document.querySelector('#box');

    const observer = new IntersectionObserver(entries => {
        console.log(entries);
    });

    observer.observe(box);

Тепер браузер повідомлятиме observer про зміни перетину `box` з viewport.

---

# 3. Callback

Callback отримує масив:

    entries

Наприклад:

    const observer = new IntersectionObserver(entries => {
        console.log(entries);
    });

`entries` — це масив об'єктів `IntersectionObserverEntry`.

Кожен `entry` описує стан конкретного елемента.

---

# 4. `entry`

Наприклад:

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            console.log(entry);
        });
    });

В `entry` можна отримати різну інформацію.

Найважливіші властивості:

    entry.target
    entry.isIntersecting
    entry.intersectionRatio
    entry.boundingClientRect
    entry.intersectionRect
    entry.rootBounds

---

# 5. `entry.target`

`target` — це елемент, за яким ми спостерігаємо.

Наприклад:

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            console.log(entry.target);
        });
    });

Якщо ми спостерігали:

    <div id="box"></div>

то:

    entry.target

буде посилатися саме на цей `div`.

---

# 6. `isIntersecting`

Одна з найважливіших властивостей:

    entry.isIntersecting

Вона має:

    true

або:

    false

Наприклад:

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Element is visible');
            } else {
                console.log('Element is not visible');
            }
        });
    });

---

# 7. Вхід у viewport

Наприклад:

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Element entered viewport');
            }
        });
    });

    observer.observe(box);

Коли елемент з'явиться в області viewport:

    isIntersecting === true

---

# 8. Вихід із viewport

Можна також реагувати на вихід:

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                console.log('Element left viewport');
            }
        });
    });

---

# 9. Вхід і вихід

Повний приклад:

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('ENTER');
            } else {
                console.log('EXIT');
            }
        });
    });

    observer.observe(box);

Таким чином можна відстежувати:

    viewport
        ↓
    element enters
        ↓
    ENTER

    element leaves
        ↓
    EXIT

---

# 10. `threshold`

За замовчуванням observer реагує на зміну перетину.

Можна контролювати поріг через:

    threshold

Наприклад:

    const observer = new IntersectionObserver(
        entries => {
            console.log(entries);
        },
        {
            threshold: 0.5
        }
    );

Це означає:

> Callback реагує, коли приблизно 50% елемента перетинається з root.

---

# 11. Значення `threshold`

`threshold` може бути:

    0
    0.25
    0.5
    0.75
    1

Наприклад:

    threshold: 0

Елемент тільки починає перетинатися.

    threshold: 0.5

Приблизно половина елемента перетинається.

    threshold: 1

Весь елемент перетинається з root.

---

# 12. `threshold: 0`

Найпростіший варіант:

    const observer = new IntersectionObserver(
        entries => {
            console.log('Intersection changed');
        },
        {
            threshold: 0
        }
    );

Це підходить для задачі:

> "Чи з'явився елемент у viewport?"

---

# 13. `threshold: 1`

Наприклад:

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.intersectionRatio === 1) {
                    console.log('Fully visible');
                }
            });
        },
        {
            threshold: 1
        }
    );

Тепер можна реагувати на повну видимість елемента.

---

# 14. Масив `threshold`

Можна передати масив:

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                console.log(entry.intersectionRatio);
            });
        },
        {
            threshold: [
                0,
                0.25,
                0.5,
                0.75,
                1
            ]
        }
    );

Тоді observer реагує на проходження різних порогів.

---

# 15. `intersectionRatio`

Властивість:

    entry.intersectionRatio

показує частку перетину.

Приблизно:

    0
    ↓
    element not visible

    0.5
    ↓
    50% visible

    1
    ↓
    100% visible

Наприклад:

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            console.log(entry.intersectionRatio);
        });
    });

---

# 16. `root`

За замовчуванням:

    root: null

означає:

> використовувати viewport браузера.

Наприклад:

    const observer = new IntersectionObserver(
        callback,
        {
            root: null
        }
    );

Це найпоширеніший варіант.

---

# 17. Intersection Observer з viewport

Типова схема:

    Browser viewport
    ┌─────────────────────┐
    │                     │
    │       element       │
    │                     │
    └─────────────────────┘
              ↑
           observer

Observer визначає перетин елемента з viewport.

---

# 18. `root` як контейнер

`root` може бути конкретним DOM-елементом.

Наприклад:

    <div id="container">
        <div id="target">
            Target
        </div>
    </div>

JavaScript:

    const container =
        document.querySelector('#container');

    const target =
        document.querySelector('#target');

    const observer = new IntersectionObserver(
        entries => {
            console.log(entries);
        },
        {
            root: container
        }
    );

    observer.observe(target);

Тепер перетин визначається відносно:

    container

а не всього viewport.

---

# 19. Коли потрібен `root`?

Наприклад, маємо scroll-контейнер:

    ┌──────────────────────────┐
    │      scroll container    │
    │                          │
    │      item                │
    │                          │
    │      item                │
    │                          │
    │      item                │
    │                          │
    └──────────────────────────┘

Можна спостерігати, коли елемент входить у видиму область саме цього контейнера.

---

# 20. `rootMargin`

`rootMargin` дозволяє змінити область спостереження.

Наприклад:

    const observer = new IntersectionObserver(
        callback,
        {
            rootMargin: '100px'
        }
    );

Це можна уявляти як:

    ┌─────────────────────────────┐
    │       + 100px               │
    │  ┌───────────────────────┐  │
    │  │       viewport        │  │
    │  │                       │  │
    │  └───────────────────────┘  │
    │       + 100px               │
    └─────────────────────────────┘

Область спостереження розширюється.

---

# 21. Навіщо потрібен `rootMargin`?

Особливо корисний для lazy loading.

Наприклад:

> "Почни завантажувати зображення ще до того, як користувач до нього дійде."

    image
      ↓
    300px before viewport
      ↓
    start loading
      ↓
    image enters viewport

Приклад:

    const observer = new IntersectionObserver(
        callback,
        {
            rootMargin: '300px'
        }
    );

---

# 22. `rootMargin` для lazy loading

Наприклад:

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                }
            });
        },
        {
            rootMargin: '300px'
        }
    );

Тепер зображення може завантажуватися заздалегідь.

---

# 23. Lazy Loading зображень

HTML:

    <img
        class="lazy"
        data-src="image.jpg"
        alt="Example"
    >

JavaScript:

    const images =
        document.querySelectorAll('.lazy');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }

            const image = entry.target;

            image.src = image.dataset.src;

            observer.unobserve(image);
        });
    });

    images.forEach(image => {
        observer.observe(image);
    });

Логіка:

    image outside viewport
          ↓
       nothing

    image enters viewport
          ↓
       image.src
          ↓
       load image
          ↓
       unobserve()

---

# 24. Навіщо `unobserve()`?

Після того як lazy-loaded image вже завантажено, немає сенсу продовжувати його спостерігати.

Тому:

    observer.unobserve(image);

означає:

> перестати спостерігати саме за цим елементом.

---

# 25. `observe()`

Починає спостереження:

    observer.observe(element);

Можна спостерігати багато елементів одним observer:

    observer.observe(element1);
    observer.observe(element2);
    observer.observe(element3);

---

# 26. Один Observer для багатьох елементів

Наприклад:

    const cards =
        document.querySelectorAll('.card');

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log(
                        'Visible:',
                        entry.target
                    );
                }
            });
        }
    );

    cards.forEach(card => {
        observer.observe(card);
    });

Один observer:

    observer

спостерігає багато:

    card
    card
    card
    card

---

# 27. `unobserve()`

Припинити спостереження за конкретним елементом:

    observer.unobserve(element);

Наприклад:

    if (entry.isIntersecting) {
        loadImage(entry.target);

        observer.unobserve(entry.target);
    }

---

# 28. `disconnect()`

Повністю зупинити observer:

    observer.disconnect();

Якщо observer спостерігає:

    element1
    element2
    element3

після:

    observer.disconnect();

спостереження припиниться для всіх елементів.

---

# 29. `unobserve()` vs `disconnect()`

| Метод | Що робить |
|---|---|
| `observe(element)` | Додає елемент до спостереження |
| `unobserve(element)` | Прибирає один елемент |
| `disconnect()` | Прибирає всі елементи |

Запам'ятати:

    observe
    → додати

    unobserve
    → прибрати один

    disconnect
    → прибрати все

---

# 30. Scroll Animation

Один із популярних сценаріїв:

    element
        ↓
    enters viewport
        ↓
    add class
        ↓
    CSS animation

HTML:

    <section class="section">
        Content
    </section>

CSS:

    .section {
        opacity: 0;
        transform: translateY(30px);
        transition: 0.6s;
    }

    .section.visible {
        opacity: 1;
        transform: translateY(0);
    }

JavaScript:

    const section =
        document.querySelector('.section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    observer.observe(section);

---

# 31. Animation only once

Якщо animation повинна відбутися тільки один раз:

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('visible');

            observer.unobserve(entry.target);
        });
    });

Це важливо.

Інакше при scrolling:

    enter
    exit
    enter
    exit
    enter
    ...

class може постійно додаватися або логіка може виконуватися багато разів.

---

# 32. Reveal Animation

Типовий патерн:

    hidden
      ↓
    enter viewport
      ↓
    visible

Наприклад:

    .card {
        opacity: 0;
        transform: translateY(20px);
    }

    .card.is-visible {
        opacity: 1;
        transform: translateY(0);
        transition:
            opacity 0.5s,
            transform 0.5s;
    }

JavaScript:

    const cards =
        document.querySelectorAll('.card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(
                    'is-visible'
                );

                observer.unobserve(entry.target);
            }
        });
    });

    cards.forEach(card => {
        observer.observe(card);
    });

---

# 33. Infinite Scroll

Intersection Observer дуже добре підходить для:

    infinite scroll

Наприклад:

    item
    item
    item
    item
    item
    sentinel
      ↓
    viewport
      ↓
    load more

Замість постійного:

    scroll
      ↓
    check position
      ↓
    scroll
      ↓
    check position

можна спостерігати за спеціальним елементом:

    sentinel

---

# 34. Sentinel

`sentinel` — це елемент-маркер.

HTML:

    <div id="list">
        ...
    </div>

    <div id="sentinel"></div>

JavaScript:

    const sentinel =
        document.querySelector('#sentinel');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadMore();
            }
        });
    });

    observer.observe(sentinel);

Коли sentinel потрапляє у viewport:

    loadMore()

---

# 35. Infinite Scroll з API

Логіка:

    user scrolls
        ↓
    sentinel enters viewport
        ↓
    Intersection Observer
        ↓
    loadMore()
        ↓
    fetch()
        ↓
    API
        ↓
    new items
        ↓
    DOM
        ↓
    sentinel moves down
        ↓
    repeat

---

# 36. Простий Infinite Scroll

    let page = 1;

    async function loadMore() {
        const response = await fetch(
            `/api/products?page=${page}`
        );

        const products = await response.json();

        renderProducts(products);

        page += 1;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadMore();
            }
        });
    });

    observer.observe(sentinel);

Для реального застосунку потрібно також контролювати:

    loading
    errors
    end of list
    duplicate requests

---

# 37. Захист від повторних запитів

Якщо `loadMore()` виконується асинхронно, sentinel може залишатися видимим.

Тому потрібно:

    let loading = false;

    async function loadMore() {
        if (loading) {
            return;
        }

        loading = true;

        try {
            const response = await fetch(
                `/api/products?page=${page}`
            );

            const products = await response.json();

            renderProducts(products);

            page += 1;
        } finally {
            loading = false;
        }
    }

---

# 38. Перевірка кінця списку

Наприклад, API може повідомляти:

    hasMore

Тоді:

    let hasMore = true;

    async function loadMore() {
        if (loading || !hasMore) {
            return;
        }

        loading = true;

        try {
            const response = await fetch(
                `/api/products?page=${page}`
            );

            const data = await response.json();

            renderProducts(data.items);

            hasMore = data.hasMore;

            page += 1;
        } finally {
            loading = false;
        }
    }

---

# 39. `rootMargin` для Infinite Scroll

Можна починати завантаження ще до того, як користувач дійде до кінця.

Наприклад:

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadMore();
                }
            });
        },
        {
            rootMargin: '500px'
        }
    );

Це означає приблизно:

> "Починай завантаження, коли sentinel ще знаходиться на відстані близько 500px від області спостереження."

---

# 40. Lazy Loading vs Infinite Scroll

Обидві задачі можуть використовувати Intersection Observer.

### Lazy loading

Спостерігаємо:

    image

Коли він наближається:

    load image

### Infinite scroll

Спостерігаємо:

    sentinel

Коли він наближається:

    load more data

---

# 41. Видимість реклами / Analytics

Intersection Observer можна використовувати для визначення видимості елемента.

Наприклад:

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Element visible');
            }
        });
    });

    observer.observe(ad);

Наприклад, можна визначати:

    banner visible
    product visible
    video visible

Для реальної аналітики додатково потрібні правила, які визначають, що саме вважати "переглядом".

---

# 42. Видимість картки товару

Наприклад:

    const products =
        document.querySelectorAll('.product');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(
                    'Product visible:',
                    entry.target.dataset.id
                );
            }
        });
    });

    products.forEach(product => {
        observer.observe(product);
    });

---

# 43. `threshold` для visibility tracking

Наприклад:

    threshold: 0.5

може використовуватися, якщо потрібно реагувати, коли приблизно половина елемента видима.

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log(
                        '50% visible'
                    );
                }
            });
        },
        {
            threshold: 0.5
        }
    );

---

# 44. Важливе уточнення про `isIntersecting`

Не слід трактувати:

    isIntersecting === true

як:

> "користувач точно прочитав елемент."

Це означає лише, що елемент перетинається з root.

Наприклад:

    element
      ↓
    1px visible

вже може означати перетин.

Якщо потрібна більша видимість, використовуй:

    threshold

---

# 45. `boundingClientRect`

`entry.boundingClientRect` містить інформацію про позицію та розмір target.

Наприклад:

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            console.log(
                entry.boundingClientRect
            );
        });
    });

Це схоже за інформацією на результат:

    element.getBoundingClientRect()

але використовується як частина Intersection Observer API.

---

# 46. `intersectionRect`

`intersectionRect` описує область, у якій target реально перетинається з root.

Наприклад:

    console.log(
        entry.intersectionRect
    );

Можна отримати інформацію про:

    top
    bottom
    left
    right
    width
    height

---

# 47. `rootBounds`

Можна отримати інформацію про root:

    console.log(
        entry.rootBounds
    );

Якщо:

    root: null

це пов'язано з viewport.

Якщо задано контейнер:

    root: container

то rootBounds описує область цього root.

---

# 48. `IntersectionObserverEntry`

Основні властивості:

    entry.target
    entry.isIntersecting
    entry.intersectionRatio
    entry.boundingClientRect
    entry.intersectionRect
    entry.rootBounds
    entry.time

Для більшості задач достатньо:

    entry.target
    entry.isIntersecting
    entry.intersectionRatio

---

# 49. Intersection Observer не є Scroll Listener

Це важливе розуміння.

Не потрібно робити:

    observer
      ↓
    scroll event
      ↓
    getBoundingClientRect()

Intersection Observer сам є спеціальним API для відстеження перетинів.

Тобто замість:

    scroll
      ↓
    manual calculation

можна використовувати:

    IntersectionObserver
      ↓
    browser determines intersection
      ↓
    callback

---

# 50. Intersection Observer і продуктивність

Одна з головних переваг:

> браузер може ефективніше керувати спостереженням за перетином, ніж код, який вручну перевіряє позицію на кожній scroll-події.

Але це не означає:

> "Intersection Observer завжди безкоштовний."

Callback теж може бути важким.

Наприклад, погано:

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            performVeryHeavyOperation();
        });
    });

Observer оптимізує механізм спостереження, але не сам код callback.

---

# 51. Intersection Observer не замінює `requestAnimationFrame`

Це різні задачі.

### Intersection Observer

Визначає:

    чи перетинається елемент з root?

### `requestAnimationFrame`

Використовується для:

    animation
    visual updates
    frame-synchronized rendering

Наприклад:

    Intersection Observer
        ↓
    element became visible
        ↓
    start animation

А сама анімація:

    requestAnimationFrame
        ↓
    update position
        ↓
    browser render

---

# 52. Intersection Observer + CSS

Дуже хороший патерн:

    Intersection Observer
        ↓
    add class
        ↓
    CSS handles animation

Наприклад:

    observer
        ↓
    .is-visible
        ↓
    CSS transition

JavaScript не повинен обов'язково вручну анімувати кожен кадр.

---

# 53. Intersection Observer + CSS Animation

HTML:

    <section class="reveal">
        Content
    </section>

CSS:

    .reveal {
        opacity: 0;
        transform: translateY(30px);
    }

    .reveal.is-visible {
        animation: reveal 0.6s ease forwards;
    }

    @keyframes reveal {
        from {
            opacity: 0;
            transform: translateY(30px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

JavaScript:

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add(
                'is-visible'
            );

            observer.unobserve(entry.target);
        });
    });

    document
        .querySelectorAll('.reveal')
        .forEach(element => {
            observer.observe(element);
        });

---

# 54. `prefers-reduced-motion`

Якщо створюються scroll animations, потрібно враховувати користувачів, які не хочуть надмірного руху.

CSS:

    @media (prefers-reduced-motion: reduce) {
        .reveal {
            opacity: 1;
            transform: none;
            animation: none;
            transition: none;
        }
    }

Це хороший практичний принцип:

> Intersection Observer може визначати момент появи елемента, а CSS вирішує, як його показувати.

---

# 55. Типова помилка №1 — забути `observe()`

Створити observer недостатньо:

    const observer = new IntersectionObserver(
        callback
    );

Потрібно:

    observer.observe(element);

Інакше observer не спостерігатиме за елементом.

---

# 56. Типова помилка №2 — спостерігати за неправильним елементом

Наприклад:

    observer.observe(container);

коли потрібно було:

    observer.observe(sentinel);

Завжди перевіряй:

    entry.target

щоб зрозуміти, який саме елемент генерує подію.

---

# 57. Типова помилка №3 — не перевіряти `isIntersecting`

Неправильно:

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            loadMore();
        });
    });

Callback може викликатися при зміні стану перетину, тому потрібно перевіряти:

    if (entry.isIntersecting) {
        loadMore();
    }

---

# 58. Типова помилка №4 — нескінченні API-запити

У infinite scroll:

    if (entry.isIntersecting) {
        loadMore();
    }

може виникнути проблема, якщо `loadMore()` ще виконується.

Потрібно:

    let loading = false;

    async function loadMore() {
        if (loading) {
            return;
        }

        loading = true;

        try {
            ...
        } finally {
            loading = false;
        }
    }

---

# 59. Типова помилка №5 — не зупиняти observer

Наприклад, lazy loading:

    if (entry.isIntersecting) {
        loadImage(entry.target);
    }

Якщо зображення більше не потрібно відстежувати:

    observer.unobserve(entry.target);

Це зменшує непотрібну роботу.

---

# 60. Типова помилка №6 — плутати `threshold` з відсотком viewport

Наприклад:

    threshold: 0.5

означає приблизно:

> 50% target має перетинатися з root.

Це не означає:

> 50% viewport.

Потрібно думати саме про:

    target
      ↕
    intersection
      ↕
    root

---

# 61. Типова помилка №7 — надмірний `threshold` array

Наприклад:

    threshold: [
        0,
        0.01,
        0.02,
        0.03,
        ...
        1
    ]

Для простої задачі це може бути зайвим.

Якщо потрібно лише:

    entered viewport

достатньо:

    threshold: 0

Якщо:

    half visible

можна використати:

    threshold: 0.5

---

# 62. Типова помилка №8 — використовувати Intersection Observer для всього

Intersection Observer потрібен для **перетину**.

Якщо потрібно:

    плавно рухати елемент
    відстежувати кожен pixel
    створювати frame-by-frame animation

краще розглянути:

    requestAnimationFrame

Якщо потрібно:

    реагувати після завершення typing

краще:

    debounce

Якщо потрібно:

    регулярно реагувати під час scroll

може підійти:

    throttle

---

# 63. Порівняння чотирьох інструментів

| Інструмент | Для чого |
|---|---|
| `setTimeout()` | Виконати після затримки |
| Debounce | Виконати після паузи в подіях |
| Throttle | Обмежити частоту викликів |
| `requestAnimationFrame` | Синхронізувати UI з кадром |
| `IntersectionObserver` | Відстежити перетин елемента |

Приклади:

    Search
        → Debounce

    Scroll handler
        → Throttle

    Animation
        → requestAnimationFrame

    Lazy loading
        → IntersectionObserver

    Infinite scroll
        → IntersectionObserver

---

# 64. Практичний приклад — Lazy Image

HTML:

    <img
        class="lazy"
        data-src="photo.jpg"
        width="400"
        height="300"
        alt="Photo"
    >

JavaScript:

    const images =
        document.querySelectorAll('.lazy');

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }

                const image = entry.target;

                image.src = image.dataset.src;

                image.removeAttribute('data-src');

                observer.unobserve(image);
            });
        },
        {
            rootMargin: '200px'
        }
    );

    images.forEach(image => {
        observer.observe(image);
    });

Логіка:

    image far away
        ↓
    no request

    image approaches viewport
        ↓
    observer

    load image
        ↓
    unobserve

---

# 65. Практичний приклад — Reveal Cards

HTML:

    <div class="card reveal">
        Card 1
    </div>

    <div class="card reveal">
        Card 2
    </div>

    <div class="card reveal">
        Card 3
    </div>

JavaScript:

    const cards =
        document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add(
                'is-visible'
            );

            observer.unobserve(entry.target);
        });
    });

    cards.forEach(card => {
        observer.observe(card);
    });

---

# 66. Практичний приклад — Infinite Scroll

HTML:

    <div id="products">
        ...
    </div>

    <div id="sentinel"></div>

JavaScript:

    const products =
        document.querySelector('#products');

    const sentinel =
        document.querySelector('#sentinel');

    let page = 1;
    let loading = false;
    let hasMore = true;

    async function loadMore() {
        if (loading || !hasMore) {
            return;
        }

        loading = true;

        try {
            const response = await fetch(
                `/api/products?page=${page}`
            );

            const data = await response.json();

            renderProducts(data.items);

            hasMore = data.hasMore;

            page += 1;
        } finally {
            loading = false;
        }
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadMore();
                }
            });
        },
        {
            rootMargin: '300px'
        }
    );

    observer.observe(sentinel);

---

# 67. Практичний приклад — Active Navigation

Intersection Observer можна використовувати для визначення того, яка секція зараз знаходиться у viewport.

HTML:

    <section id="home">
        Home
    </section>

    <section id="about">
        About
    </section>

    <section id="contact">
        Contact
    </section>

JavaScript:

    const sections =
        document.querySelectorAll('section');

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log(
                        'Active:',
                        entry.target.id
                    );
                }
            });
        },
        {
            threshold: 0.5
        }
    );

    sections.forEach(section => {
        observer.observe(section);
    });

У реальному меню потрібно додатково вирішити ситуацію, коли одночасно перетинаються кілька секцій.

---

# 68. Практичний Full Stack сценарій

Intersection Observer може бути частиною повного потоку:

    User scrolls
        ↓
    Intersection Observer
        ↓
    sentinel visible
        ↓
    fetch()
        ↓
    Node.js
        ↓
    Express / NestJS
        ↓
    PostgreSQL
        ↓
    JSON
        ↓
    render new items
        ↓
    sentinel moves down
        ↓
    repeat

Це хороший приклад реального зв'язку:

    Browser API
        ↓
    Frontend
        ↓
    HTTP
        ↓
    Backend
        ↓
    Database

---

# 69. Intersection Observer у Next.js / React

У React принцип той самий, але observer потрібно створювати в правильний момент.

Наприклад, концептуально:

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                ...
            }
        );

        if (element) {
            observer.observe(element);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

Головна ідея:

    component mount
        ↓
    create observer
        ↓
    observe element
        ↓
    component unmount
        ↓
    disconnect

---

# 70. Cleanup у React

Особливо важливо не залишати observer після видалення компонента.

Наприклад:

    useEffect(() => {
        const observer = new IntersectionObserver(
            callback
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

Cleanup:

    return () => {
        observer.disconnect();
    };

Це частина правильного управління ресурсами.

---

# 71. Intersection Observer і SSR

У Next.js потрібно пам'ятати:

    IntersectionObserver

є browser API.

Тому його не можна використовувати безпосередньо під час серверного рендерингу.

Browser-specific код повинен виконуватися на клієнті.

У React/Next.js це зазвичай означає:

    Client Component

та/або:

    useEffect()

залежно від структури компонента.

---

# 72. Intersection Observer не гарантує точний момент піксель у піксель

Це не API для:

    every pixel
    every scroll event
    exact animation timing

Його завдання:

> повідомляти про зміни intersection state.

Тому він чудово підходить для:

    lazy loading
    reveal
    infinite scroll
    visibility detection

але не для frame-by-frame animation.

---

# 73. `rootMargin` і негативні значення

Можна використовувати негативний margin.

Наприклад:

    rootMargin: '-100px'

Це зменшує область перетину.

Це може бути корисним, якщо потрібно вважати елемент видимим лише тоді, коли він знаходиться глибше всередині viewport.

---

# 74. `rootMargin` як preload zone

Дуже корисна модель:

    viewport
    ┌───────────────────┐
    │                   │
    │      visible      │
    │                   │
    └───────────────────┘

    + 300px
        ↓
    preload zone

Наприклад:

    rootMargin: '300px'

можна використовувати для:

    lazy image
    lazy component
    infinite scroll
    preload content

---

# 75. Один Observer чи багато?

Якщо потрібно спостерігати багато елементів, зазвичай можна використовувати один observer:

    const observer = new IntersectionObserver(
        callback
    );

    elements.forEach(element => {
        observer.observe(element);
    });

Замість створення:

    observer1
    observer2
    observer3
    observer4

для кожного елемента.

Один observer може спостерігати багато targets.

---

# 76. Коли створювати окремі Observer?

Окремі observer можуть бути виправдані, якщо елементи мають різні налаштування:

    threshold
    root
    rootMargin

Наприклад:

    imageObserver
    animationObserver
    visibilityObserver

Але не потрібно створювати окремий observer без причини.

---

# 77. Типовий патерн Lazy Loading

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }

                load(entry.target);

                observer.unobserve(
                    entry.target
                );
            });
        },
        {
            rootMargin: '200px'
        }
    );

    elements.forEach(element => {
        observer.observe(element);
    });

Цей патерн варто добре запам'ятати.

---

# 78. Типовий патерн Reveal

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add(
                    'visible'
                );

                observer.unobserve(
                    entry.target
                );
            });
        }
    );

    elements.forEach(element => {
        observer.observe(element);
    });

---

# 79. Типовий патерн Infinite Scroll

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadMore();
                }
            });
        },
        {
            rootMargin: '300px'
        }
    );

    observer.observe(sentinel);

Додатково:

    loading
    hasMore
    error handling

---

# 80. 🧩 Алгоритм Intersection Observer

### Крок 1

Знайти елемент:

    const element =
        document.querySelector(...);

### Крок 2

Створити observer:

    const observer =
        new IntersectionObserver(callback);

### Крок 3

Почати спостереження:

    observer.observe(element);

### Крок 4

Перевірити:

    entry.isIntersecting

### Крок 5

Виконати потрібну дію:

    load()
    animate()
    fetch()
    classList.add()

### Крок 6

Якщо більше не потрібно спостерігати:

    observer.unobserve(element);

---

# 81. 📋 Intersection Observer Cheat Sheet

    // Basic

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log(
                        'Visible:',
                        entry.target
                    );
                }
            });
        }
    );

    observer.observe(element);


    // Threshold

    const observer = new IntersectionObserver(
        callback,
        {
            threshold: 0.5
        }
    );


    // Root

    const observer = new IntersectionObserver(
        callback,
        {
            root: container
        }
    );


    // Root margin

    const observer = new IntersectionObserver(
        callback,
        {
            rootMargin: '300px'
        }
    );


    // Stop observing one element

    observer.unobserve(element);


    // Stop observing everything

    observer.disconnect();


    // Important properties

    entry.target
    entry.isIntersecting
    entry.intersectionRatio
    entry.boundingClientRect
    entry.intersectionRect
    entry.rootBounds

---

# 82. 🆚 `scroll` + `getBoundingClientRect()` vs Intersection Observer

### Старий / ручний підхід

    window.addEventListener('scroll', () => {
        const rect =
            element.getBoundingClientRect();

        if (rect.top < window.innerHeight) {
            console.log('Visible');
        }
    });

Проблеми:

- багато scroll events;
- ручні розрахунки;
- легко отримати зайву роботу;
- потрібно самостійно враховувати edge cases.

### Intersection Observer

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Visible');
                }
            });
        }
    );

    observer.observe(element);

Для задачі визначення intersection це спеціалізований API.

---

# 83. 🆚 Intersection Observer / Debounce / Throttle

### Debounce

    event
    event
    event
       ↓
    pause
       ↓
    callback

Використання:

    search
    autosave
    validation

### Throttle

    event
    event
    event
       ↓
    callback
       ↓
    wait
       ↓
    callback

Використання:

    scroll
    mousemove
    resize

### Intersection Observer

    element
       ↓
    intersection
       ↓
    callback

Використання:

    lazy loading
    infinite scroll
    visibility
    reveal

---

# 84. 🆚 Intersection Observer / requestAnimationFrame

### Intersection Observer

Відповідає на питання:

> "Чи перетинається елемент із viewport/root?"

### `requestAnimationFrame`

Відповідає на інше питання:

> "Коли браузер планує наступний візуальний кадр?"

Тому вони можуть використовуватися разом:

    Intersection Observer
        ↓
    element enters viewport
        ↓
    start animation
        ↓
    requestAnimationFrame
        ↓
    update animation

---

# 85. 🎯 Питання для співбесіди

### Початковий рівень

**1. Що таке Intersection Observer?**

Browser API для відстеження перетину елемента з viewport або іншим root.

---

**2. Для чого використовується Intersection Observer?**

Наприклад:

    lazy loading
    infinite scroll
    reveal animation
    visibility tracking

---

**3. Як почати спостерігати за елементом?**

    observer.observe(element);

---

**4. Як перестати спостерігати за одним елементом?**

    observer.unobserve(element);

---

**5. Як повністю зупинити observer?**

    observer.disconnect();

---

**6. Що таке `isIntersecting`?**

Boolean, який показує, чи перетинається target з root.

---

### Junior

**7. Що таке `threshold`?**

Поріг перетину, при якому observer повідомляє про зміну intersection.

---

**8. Що означає `threshold: 0.5`?**

Приблизно 50% target перетинається з root.

---

**9. Що таке `root`?**

Область, відносно якої визначається intersection.

---

**10. Що означає `root: null`?**

Використовується viewport.

---

**11. Для чого потрібен `rootMargin`?**

Для розширення або зменшення області спостереження.

---

**12. Навіщо `rootMargin` при lazy loading?**

Щоб почати завантаження до того, як елемент фактично з'явиться у viewport.

---

**13. Чи може один observer спостерігати багато елементів?**

Так.

    elements.forEach(element => {
        observer.observe(element);
    });

---

**14. Чим `unobserve()` відрізняється від `disconnect()`?**

`unobserve()` прибирає один target.

`disconnect()` припиняє спостереження за всіма targets.

---

### Практичний Full Stack

**15. Як реалізувати infinite scroll?**

Створити sentinel, спостерігати за ним через Intersection Observer і при його появі в області спостереження викликати API для завантаження наступної порції даних.

---

**16. Чому в infinite scroll потрібен `loading`?**

Щоб не відправляти кілька однакових запитів, поки попередній ще виконується.

---

**17. Чи замінює Intersection Observer `scroll`?**

Не повністю. Він спеціально призначений для задач intersection, але не є універсальним способом отримувати кожну scroll-подію.

---

**18. Чим Intersection Observer відрізняється від throttle?**

Throttle обмежує частоту виконання callback.

Intersection Observer визначає зміни перетину target з root.

---

**19. Чим Intersection Observer відрізняється від requestAnimationFrame?**

Intersection Observer відстежує visibility/intersection.

`requestAnimationFrame` використовується для синхронізованих із rendering візуальних оновлень.

---

**20. Чи є Intersection Observer асинхронним API?**

Callback викликається браузером у відповідь на зміни intersection, а не синхронно в момент виклику `observe()`.

---

# 86. 🏋️ Практичні вправи

### Вправа 1 — Visibility

Створи:

    <div id="box">

Визначай:

    ENTER
    EXIT

при вході та виході з viewport.

---

### Вправа 2 — Threshold

Перевір:

    threshold: 0
    threshold: 0.5
    threshold: 1

Подивись на різницю.

---

### Вправа 3 — Reveal Animation

Створи 10 блоків.

При появі у viewport:

    opacity: 0
        ↓
    opacity: 1

---

### Вправа 4 — Lazy Images

Створи список зображень:

    <img data-src="...">

Завантажуй `src` лише тоді, коли image наближається до viewport.

---

### Вправа 5 — Infinite Scroll

Створи:

    products
    +
    sentinel

Коли sentinel входить у viewport:

    fetch next page

---

### Вправа 6 — Root

Створи scrollable container:

    overflow: auto

та відстежуй елементи всередині нього.

---

### Вправа 7 — Root Margin

Порівняй:

    rootMargin: '0px'

і:

    rootMargin: '300px'

Подивись, коли запускається callback.

---

### Вправа 8 — Unobserve

Зроби reveal animation, яка запускається лише один раз.

Після першого входу:

    observer.unobserve(element);

---

### Вправа 9 — Infinite Scroll + Loading

Додай:

    loading

щоб не створювати декілька одночасних API-запитів.

---

### Вправа 10 — Full Stack

Створи:

    Browser
        ↓
    Intersection Observer
        ↓
    sentinel
        ↓
    fetch()
        ↓
    Node.js
        ↓
    PostgreSQL
        ↓
    JSON
        ↓
    render

Це вже хороший практичний Full Stack exercise.

---

# 87. 🛠️ Мініпроєкт

## Infinite Products

Створи простий каталог:

    Product 1
    Product 2
    Product 3
    ...
    sentinel

Коли користувач наближається до кінця:

    Intersection Observer
          ↓
       loadMore()
          ↓
        fetch()
          ↓
        API
          ↓
      PostgreSQL
          ↓
       products
          ↓
        render

### Мінімальна функціональність

- список товарів;
- pagination на backend;
- `sentinel`;
- Intersection Observer;
- `loading`;
- `error`;
- `hasMore`;
- наступна сторінка;
- додавання товарів у DOM.

### Frontend

    products
        ↓
    sentinel
        ↓
    IntersectionObserver
        ↓
    fetch()

### Backend

    GET /api/products?page=2

### Database

    PostgreSQL
        ↓
    SELECT
        ...
    LIMIT ...
    OFFSET ...

Це дуже хороший маленький приклад для переходу від Browser API до повного Full Stack workflow.

---

# 88. 🔗 Зв'язок із попередніми темами

Структура розділу:

    06-timers-and-browser-apis
        │
        ├── 01-set-timeout-set-interval
        │       ↓
        │    timers
        │
        ├── 02-requestAnimationFrame
        │       ↓
        │    browser rendering
        │
        ├── 03-debounce
        │       ↓
        │    wait for pause
        │
        ├── 04-throttle
        │       ↓
        │    limit frequency
        │
        └── 05-intersection-observer
                ↓
             visibility
             lazy loading
             infinite scroll

---

# 89. 🔄 Загальна карта Browser APIs

    User action
         │
         ├── input
         │     ↓
         │   Debounce
         │
         ├── scroll
         │     ↓
         │   Throttle
         │
         ├── visual animation
         │     ↓
         │   requestAnimationFrame
         │
         └── element enters viewport
               ↓
           IntersectionObserver

Це чотири різні інструменти для чотирьох різних проблем.

---

# 90. 🧠 Що потрібно запам'ятати

### Intersection Observer

    element
        ↓
    intersection
        ↓
    callback

### Основні методи

    observer.observe(element)

    observer.unobserve(element)

    observer.disconnect()

### Основні властивості

    entry.target
    entry.isIntersecting
    entry.intersectionRatio

### Основні options

    root
    rootMargin
    threshold

### Найчастіші задачі

    lazy loading
    infinite scroll
    reveal animation
    visibility tracking
    active sections

---

# 91. Головна фраза

> **Intersection Observer дозволяє ефективно реагувати на появу або зникнення елемента в області спостереження без необхідності вручну перевіряти його позицію на кожній scroll-події.**

---

# 92. 📚 Короткий підсумок

Базовий код:

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log(
                        'Element is visible'
                    );
                }
            });
        }
    );

    observer.observe(element);

Для lazy loading:

    rootMargin: '300px'

Для часткової видимості:

    threshold: 0.5

Для повної видимості:

    threshold: 1

Для scroll-контейнера:

    root: container

Для припинення спостереження:

    observer.unobserve(element);

Для повного очищення:

    observer.disconnect();

---

# 93. 🔥 Найважливіша ментальна модель

Не думай про Intersection Observer як про:

    "ще один спосіб слухати scroll".

Думай про нього як про:

    "API, яке повідомляє мене,
     коли target перетинається
     з певною областю."

Тоді стає зрозуміло:

    target
       ↓
    intersection
       ↓
    callback

І вже callback вирішує, що робити:

    intersection
        ↓
        ├── load image
        ├── load more
        ├── add class
        ├── start animation
        └── track visibility

---

# 94. 🚀 Зв'язок із Full Stack JavaScript

Intersection Observer особливо корисний для розуміння реального frontend workflow:

    Browser API
        ↓
    DOM
        ↓
    JavaScript
        ↓
    Event / Observer
        ↓
    Fetch
        ↓
    Node.js
        ↓
    Express / NestJS
        ↓
    PostgreSQL
        ↓
    JSON
        ↓
    UI

Наприклад, Infinite Scroll:

    User
      ↓
    scroll
      ↓
    sentinel enters viewport
      ↓
    IntersectionObserver
      ↓
    loadMore()
      ↓
    fetch('/api/products?page=2')
      ↓
    Node.js
      ↓
    PostgreSQL
      ↓
    products
      ↓
    JSON
      ↓
    renderProducts()
      ↓
    new sentinel position
      ↓
    repeat

Це вже не просто навчальний Browser API, а реальний патерн, який можна зустріти у сучасних вебзастосунках.